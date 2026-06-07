import type { APIRoute } from "astro";
import { z } from "zod";

export const prerender = false;

interface CloudflareEnv {
  RESEND_API_KEY: string;
  EMAIL_FROM: string;
  EMAIL_TO: string;
}

const schema = z.object({
  name: z
    .string()
    .min(2, "Nome muito curto")
    .max(100, "Nome muito longo")
    .regex(/^[\p{L}\s'-]+$/u, "Nome inválido"),
  email: z.string().email("E-mail inválido").max(255, "E-mail muito longo"),
  message: z
    .string()
    .min(10, "Mensagem muito curta")
    .max(1000, "Mensagem muito longa"),
  bot_field: z.string().max(0).optional(),
});

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
  body{font-family:system-ui,sans-serif;background:#0a0a0a;color:#e4e4e7;margin:0;padding:32px}
  .card{background:#1a1a1a;border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:32px;max-width:560px;margin:auto}
  .label{font-size:11px;color:#71717a;text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px}
  .value{font-size:15px;color:#e4e4e7;margin:0 0 20px}
  .msg{background:#111;border-left:3px solid #00ff88;padding:16px;border-radius:0 8px 8px 0;white-space:pre-wrap;font-size:15px;line-height:1.7}
  .accent{color:#00ff88}
</style></head>
<body><div class="card">
  <h2><span class="accent">$</span> nova mensagem do portfólio</h2>
  <div class="label">Nome</div>
  <p class="value">${esc(name)}</p>
  <div class="label">E-mail</div>
  <p class="value"><a href="mailto:${esc(email)}" style="color:#00ff88">${esc(email)}</a></p>
  <div class="label">Mensagem</div>
  <div class="msg">${esc(message)}</div>
</div></body></html>`;
}

function confirmationHtml(name: string) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><style>
  body{font-family:system-ui,sans-serif;background:#0a0a0a;color:#e4e4e7;margin:0;padding:32px}
  .card{background:#1a1a1a;border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:32px;max-width:560px;margin:auto}
  .accent{color:#00ff88}
  p{line-height:1.7;color:#a1a1aa}
  .footer{margin-top:32px;padding-top:20px;border-top:1px solid rgba(255,255,255,0.07);font-size:13px;color:#52525b}
</style></head>
<body><div class="card">
  <h2>Oi, ${esc(name)}! <span class="accent">✓</span></h2>
  <p>Recebi sua mensagem e responderei o mais breve possível, geralmente em até 24 h.</p>
  <p>Enquanto isso, fique à vontade para me encontrar nas redes:</p>
  <p>
    <a href="https://github.com/Fransuelton" style="color:#00ff88;margin-right:16px">GitHub</a>
    <a href="https://linkedin.com/in/fransuelton" style="color:#00ff88">LinkedIn</a>
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

  if (!env?.RESEND_API_KEY) {
    return json({ error: "Serviço de e-mail não configurado." }, 503);
  }

  let raw: unknown;
  try {
    raw = await context.request.json();
  } catch {
    return json({ error: "Invalid JSON." }, 400);
  }

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const first = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0];
    return json({ error: first ?? "Dados inválidos." }, 422);
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
        subject: "Recebi sua mensagem! — Fransuelton Francisco",
        html: confirmationHtml(name),
      }),
    ]);
  } catch (err) {
    console.error("[contact] Resend error:", err);
    return json({ error: "Falha ao enviar. Tente novamente." }, 502);
  }

  return json({ ok: true });
};
