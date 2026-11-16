import type { APIRoute } from "astro";
import { z } from "zod";
import { ui, defaultLang } from "../../i18n/ui";

export const prerender = false;

/** Cloudflare rate limit binding — see `ratelimits` in wrangler.jsonc. */
interface RateLimiter {
  limit(options: { key: string }): Promise<{ success: boolean }>;
}

interface CloudflareEnv {
  RESEND_API_KEY: string;
  EMAIL_FROM: string;
  EMAIL_TO: string;
  CONTACT_RATE_LIMIT?: RateLimiter;
}

type Lang = keyof typeof ui;

/** Field errors carry a translation key; the message is resolved per request. */
const schema = z.object({
  name: z
    .string()
    .min(2, "contact.form.err.name")
    .max(100, "contact.form.err.name")
    .regex(/^[\p{L}\s'-]+$/u, "contact.form.err.name"),
  email: z
    .string()
    .email("contact.form.err.email")
    .max(255, "contact.form.err.email"),
  message: z
    .string()
    .min(10, "contact.form.err.message")
    .max(1000, "contact.form.err.message"),
  lang: z.enum(["pt", "en", "es"]).optional(),
  bot_field: z.string().max(0).optional(),
});

const translate = (lang: Lang, key: string): string =>
  (ui[lang] as Record<string, string>)[key] ??
  (ui[defaultLang] as Record<string, string>)[key] ??
  key;

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function notificationHtml(name: string, email: string, message: string) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><style>
  body{font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;background:#0e0f11;color:#f4f4f2;margin:0;padding:32px}
  .card{background:#18191c;border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:32px;max-width:560px;margin:auto}
  .label{font-size:11px;color:#8a8b8e;text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px}
  .value{font-size:15px;color:#f4f4f2;margin:0 0 20px}
  .msg{background:#18191c;border-left:3px solid #5fa7ff;padding:16px;border-radius:0 8px 8px 0;white-space:pre-wrap;font-size:15px;line-height:1.7}
  .accent{color:#5fa7ff}
</style></head>
<body><div class="card">
  <h2><span class="accent">›</span> nova mensagem do portfólio</h2>
  <div class="label">Nome</div>
  <p class="value">${esc(name)}</p>
  <div class="label">E-mail</div>
  <p class="value"><a href="mailto:${esc(email)}" style="color:#5fa7ff">${esc(email)}</a></p>
  <div class="label">Mensagem</div>
  <div class="msg">${esc(message)}</div>
</div></body></html>`;
}

function confirmationHtml(name: string, lang: Lang) {
  const t = (key: string) => translate(lang, key);
  const htmlLang = lang === "en" ? "en" : lang === "es" ? "es" : "pt-BR";
  return `<!DOCTYPE html>
<html lang="${htmlLang}">
<head><meta charset="UTF-8"><style>
  body{font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;background:#0e0f11;color:#f4f4f2;margin:0;padding:32px}
  .card{background:#18191c;border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:32px;max-width:560px;margin:auto}
  .accent{color:#5fa7ff}
  p{line-height:1.7;color:#b4b5b8}
  .footer{margin-top:32px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.07);font-size:13px;color:#8a8b8e}
</style></head>
<body><div class="card">
  <h2>${esc(t("email.confirm.hi"))}, ${esc(name)}! <span class="accent">✓</span></h2>
  <p>${esc(t("email.confirm.body"))}</p>
  <p>${esc(t("email.confirm.socials"))}</p>
  <p>
    <a href="https://github.com/Fransuelton" style="color:#5fa7ff;margin-right:16px">GitHub</a>
    <a href="https://linkedin.com/in/fransuelton" style="color:#5fa7ff">LinkedIn</a>
  </p>
  <div class="footer">Fransuelton Francisco — fransuelton.dev</div>
</div></body></html>`;
}

async function sendEmail(apiKey: string, payload: Record<string, unknown>) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(JSON.stringify(err));
  }
}

export const POST: APIRoute = async (context) => {
  const env = context.locals.runtime?.env as CloudflareEnv | undefined;

  let raw: unknown;
  try {
    raw = await context.request.json();
  } catch {
    return json({ error: "Invalid JSON." }, 400);
  }

  // Resolve the language up front so every error below is localized.
  const rawLang = (raw as { lang?: unknown } | null)?.lang;
  const lang: Lang = rawLang === "en" || rawLang === "es" ? rawLang : defaultLang;
  const t = (key: string) => translate(lang, key);

  if (!env?.RESEND_API_KEY) {
    return json({ error: t("contact.form.err.config") }, 503);
  }

  // Per-IP throttle: each accepted request sends two emails on our Resend quota.
  if (env.CONTACT_RATE_LIMIT) {
    const ip = context.request.headers.get("CF-Connecting-IP") ?? "unknown";
    const { success } = await env.CONTACT_RATE_LIMIT.limit({ key: ip });
    if (!success) return json({ error: t("contact.form.err.rate") }, 429);
  } else {
    console.warn(
      "[contact] CONTACT_RATE_LIMIT binding missing — endpoint is unthrottled."
    );
  }

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const firstKey = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0];
    return json(
      { error: firstKey ? t(firstKey) : t("contact.form.error") },
      422
    );
  }

  const { name, email, message, bot_field } = parsed.data;

  if (bot_field) return json({ ok: true });

  try {
    await Promise.all([
      sendEmail(env.RESEND_API_KEY, {
        from: env.EMAIL_FROM,
        to: [env.EMAIL_TO],
        reply_to: email,
        subject: `[Portfolio] Nova mensagem de ${name}`,
        html: notificationHtml(name, email, message),
      }),
      sendEmail(env.RESEND_API_KEY, {
        from: env.EMAIL_FROM,
        to: [email],
        subject: t("email.confirm.subject"),
        html: confirmationHtml(name, lang),
      }),
    ]);
  } catch (err) {
    console.error("[contact] Resend error:", err);
    return json({ error: t("contact.form.error") }, 502);
  }

  return json({ ok: true });
};
