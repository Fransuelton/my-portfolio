interface Env {
  RESEND_API_KEY: string;
  EMAIL_FROM: string;
  EMAIL_TO: string;
}

interface Body {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  bot_field?: unknown;
}

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export const onRequest = async ({
  request,
  env,
}: {
  request: Request;
  env: Env;
}) => {
  if (request.method !== "POST")
    return new Response("Method Not Allowed", { status: 405 });

  // Parse body
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return json({ error: "Invalid JSON." }, 400);
  }

  const { name, email, message, bot_field } = body;

  // Honeypot — silently discard bots
  if (bot_field) return json({ ok: true });

  // Validate
  if (typeof name !== "string" || name.trim().length < 2)
    return json({ error: "Nome inválido." }, 422);
  if (typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email))
    return json({ error: "E-mail inválido." }, 422);
  if (typeof message !== "string" || message.trim().length < 10)
    return json({ error: "Mensagem muito curta (mín. 10 caracteres)." }, 422);

  const n = name.trim().slice(0, 100);
  const e = email.trim().slice(0, 200);
  const m = message.trim().slice(0, 4000);

  // Send via Resend
  const resendRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.EMAIL_FROM,
      to: [env.EMAIL_TO],
      reply_to: e,
      subject: `Novo contato: ${n}`,
      html: `
        <div style="font-family:monospace;max-width:560px;margin:0 auto;padding:24px;
                    background:#080808;color:#e4e4e7;border-radius:12px;
                    border:1px solid rgba(255,255,255,0.08)">
          <p style="color:#00ff88;font-size:11px;margin:0 0 16px;
                    text-transform:uppercase;letter-spacing:.1em">
            $ novo contato · fransuelton.dev
          </p>
          <h2 style="color:#e4e4e7;margin:0 0 4px;font-size:18px">
            ${escapeHtml(n)}
          </h2>
          <p style="color:#71717a;margin:0 0 20px;font-size:13px">
            ${escapeHtml(e)}
          </p>
          <div style="border-left:2px solid rgba(0,255,136,0.4);padding-left:16px">
            <p style="color:#e4e4e7;line-height:1.7;margin:0;white-space:pre-wrap">
              ${escapeHtml(m)}
            </p>
          </div>
        </div>
      `,
    }),
  });

  if (!resendRes.ok) {
    const err = await resendRes.json().catch(() => ({}));
    console.error("[contact] Resend error:", err);
    return json({ error: "Falha ao enviar. Tente novamente." }, 502);
  }

  return json({ ok: true });
};
