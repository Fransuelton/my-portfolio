import { useState } from "react";
import { ui } from "../../i18n/ui";

type Lang = "pt" | "en" | "es";
type Status = "idle" | "loading" | "success" | "error";
type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

interface Props {
  lang: Lang;
}

const API_URL = (import.meta.env.PUBLIC_API_URL as string | undefined) ?? "http://localhost:3001";

export default function ContactForm({ lang }: Props) {
  const t = (key: string): string =>
    (ui[lang] as Record<string, string>)[key] ??
    (ui["pt"] as Record<string, string>)[key] ??
    key;

  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [message,  setMessage]  = useState("");
  const [botField, setBotField] = useState("");
  const [status,   setStatus]   = useState<Status>("idle");
  const [errors,   setErrors]   = useState<FieldErrors>({});
  const [apiError, setApiError] = useState("");

  const validate = (): boolean => {
    const errs: FieldErrors = {};
    if (name.trim().length < 2)    errs.name    = "min 2 chars";
    if (!/^\S+@\S+\.\S+$/.test(email)) errs.email = "invalid";
    if (message.trim().length < 10) errs.message = "min 10 chars";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("loading");
    setApiError("");

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:      name.trim(),
          email:     email.trim(),
          message:   message.trim(),
          bot_field: botField,
        }),
      });

      if (res.ok) {
        setStatus("success");
        setName(""); setEmail(""); setMessage("");
      } else if (res.status === 429) {
        setApiError("Muitas tentativas. Aguarde 15 min.");
        setStatus("error");
      } else {
        const body = await res.json().catch(() => ({}));
        setApiError((body as { error?: string }).error ?? t("contact.form.error"));
        setStatus("error");
      }
    } catch {
      setApiError(t("contact.form.error"));
      setStatus("error");
    }
  };

  const field = (err?: string) =>
    `w-full px-4 py-3 rounded-xl border text-sm font-sans outline-none transition-colors ` +
    `bg-card text-text placeholder:text-muted ` +
    (err
      ? "border-red-500/60 focus:border-red-400 focus:ring-1 focus:ring-red-400/20"
      : "border-border focus:border-accent focus:ring-1 focus:ring-accent/20");

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-10 text-center">
        <div className="w-14 h-14 rounded-full flex items-center justify-center text-accent" style={{ background: "var(--accent-glow)" }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
        </div>
        <p className="font-mono font-semibold text-text">{t("contact.form.success")}</p>
        <button
          onClick={() => setStatus("idle")}
          className="font-mono text-sm text-muted hover:text-accent transition-colors"
        >
          ← Enviar outra
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3">
      {/* Honeypot — hidden from humans */}
      <input
        type="text"
        name="bot_field"
        value={botField}
        onChange={(e) => setBotField(e.target.value)}
        aria-hidden="true"
        tabIndex={-1}
        autoComplete="off"
        style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}
      />

      {/* Name */}
      <div>
        <label htmlFor="cf-name" className="sr-only">{t("contact.form.name")}</label>
        <input
          id="cf-name"
          type="text"
          placeholder={t("contact.form.name")}
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-required="true"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "cf-name-err" : undefined}
          className={field(errors.name)}
          disabled={status === "loading"}
        />
        {errors.name && (
          <p id="cf-name-err" role="alert" className="font-mono text-xs text-red-400 mt-1.5">
            * {t("contact.form.name")} obrigatório (mín. 2 caracteres)
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="cf-email" className="sr-only">{t("contact.form.email")}</label>
        <input
          id="cf-email"
          type="email"
          placeholder={t("contact.form.email")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "cf-email-err" : undefined}
          className={field(errors.email)}
          disabled={status === "loading"}
          autoComplete="email"
        />
        {errors.email && (
          <p id="cf-email-err" role="alert" className="font-mono text-xs text-red-400 mt-1.5">
            * E-mail inválido
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="cf-message" className="sr-only">{t("contact.form.message")}</label>
        <textarea
          id="cf-message"
          placeholder={t("contact.form.message")}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "cf-msg-err" : undefined}
          className={`${field(errors.message)} resize-none`}
          disabled={status === "loading"}
        />
        <div className="flex items-start justify-between mt-1.5">
          {errors.message ? (
            <p id="cf-msg-err" role="alert" className="font-mono text-xs text-red-400">
              * Mínimo 10 caracteres
            </p>
          ) : (
            <span />
          )}
          <span className={`font-mono text-xs tabular-nums ${message.length > 900 ? "text-red-400" : "text-muted"}`}>
            {message.length}/1000
          </span>
        </div>
      </div>

      {/* API error */}
      {status === "error" && apiError && (
        <p role="alert" className="font-mono text-xs text-red-400">
          ✗ {apiError}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-mono text-sm font-semibold bg-accent text-[#0a0a0a] hover:bg-accent-dim disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
      >
        {status === "loading" ? (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="animate-spin" aria-hidden="true"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
            {t("contact.form.sending")}
          </>
        ) : (
          t("contact.form.submit")
        )}
      </button>
    </form>
  );
}
