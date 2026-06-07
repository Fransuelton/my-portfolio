import { Resend } from "resend";
import type { ContactInput } from "./schema";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM   = process.env.EMAIL_FROM ?? "Portfolio <noreply@fransuelton.dev>";
const TO     = process.env.EMAIL_TO   ?? "";

export async function sendContactEmails(data: ContactInput) {
  await Promise.all([
    resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: data.email,
      subject: `[Portfolio] Nova mensagem de ${data.name}`,
      html: notificationHtml(data),
    }),
    resend.emails.send({
      from: FROM,
      to: data.email,
      subject: "Recebi sua mensagem! — Fransuelton Francisco",
      html: confirmationHtml(data),
    }),
  ]);
}

function notificationHtml({ name, email, message }: ContactInput): string {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><style>
  body{font-family:system-ui,sans-serif;background:#0a0a0a;color:#e4e4e7;margin:0;padding:32px}
  .card{background:#1a1a1a;border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:32px;max-width:560px;margin:auto}
  .label{font-size:11px;color:#71717a;text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px}
  .value{font-size:15px;color:#e4e4e7;margin:0 0 20px}
  .msg{background:#111;border-left:3px solid #00ff88;padding:16px;border-radius:0 8px 8px 0;white-space:pre-wrap;font-size:15px}
  .accent{color:#00ff88}
</style></head>
<body><div class="card">
  <h2><span class="accent">$</span> nova mensagem do portfólio</h2>
  <div class="label">Nome</div><p class="value">${esc(name)}</p>
  <div class="label">E-mail</div><p class="value"><a href="mailto:${esc(email)}" style="color:#00ff88">${esc(email)}</a></p>
  <div class="label">Mensagem</div>
  <div class="msg">${esc(message)}</div>
</div></body></html>`;
}

function confirmationHtml({ name }: ContactInput): string {
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
  <h2>Oi, ${esc(name)}! <span class="accent">👋</span></h2>
  <p>Recebi sua mensagem e responderei o mais breve possível, geralmente em até 24 h.</p>
  <p>Enquanto isso, sinta-se à vontade para me encontrar nas redes sociais:</p>
  <p>
    <a href="https://github.com/Fransuelton" style="color:#00ff88;margin-right:16px">GitHub</a>
    <a href="https://linkedin.com/in/fransuelton" style="color:#00ff88">LinkedIn</a>
  </p>
  <div class="footer">Fransuelton Francisco — fransuelton.dev</div>
</div></body></html>`;
}

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
