import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { ui } from "../../i18n/ui";

type Lang = "pt" | "en" | "es";
type FormState = {
  name: string;
  type: string;
  description: string;
  deadline: string;
  budget: string;
};
type FormErrors = Partial<Record<keyof FormState, true>>;

const WHATSAPP = "558499778995";

export default function BriefingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [lang, setLang] = useState<Lang>("pt");
  const [form, setForm] = useState<FormState>({
    name: "", type: "", description: "", deadline: "", budget: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  const t = (key: string): string =>
    (ui[lang] as Record<string, string>)[key] ??
    (ui["pt"] as Record<string, string>)[key] ??
    key;

  useEffect(() => {
    const bodyLang = document.body.dataset.lang as Lang;
    if (bodyLang) setLang(bodyLang);
  }, []);

  // Attach click listeners to every [data-briefing-trigger] element
  useEffect(() => {
    const handleClick = (e: Event) => {
      e.preventDefault();
      const el = e.currentTarget as HTMLElement;
      const idx = el.dataset.serviceIndex;
      if (idx !== undefined) {
        const opts = t("modal.project.options").split(",");
        setForm((p) => ({ ...p, type: opts[parseInt(idx, 10)] ?? "" }));
      } else {
        setForm((p) => ({ ...p, type: "" }));
      }
      setErrors({});
      setIsOpen(true);
    };

    const triggers = document.querySelectorAll("[data-briefing-trigger]");
    triggers.forEach((el) => el.addEventListener("click", handleClick));
    return () => {
      triggers.forEach((el) => el.removeEventListener("click", handleClick));
    };
  }, [lang]);

  // Focus trap + ESC + scroll lock
  useEffect(() => {
    if (!isOpen) return;

    setTimeout(() => firstInputRef.current?.focus(), 50);
    document.body.style.overflow = "hidden";

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { close(); return; }
      if (e.key !== "Tab" || !modalRef.current) return;

      const focusable = Array.from(
        modalRef.current.querySelectorAll<HTMLElement>(
          "button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])"
        )
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const close = () => {
    setIsOpen(false);
    setForm({ name: "", type: "", description: "", deadline: "", budget: "" });
    setErrors({});
  };

  const validate = (): boolean => {
    const errs: FormErrors = {};
    if (!form.name.trim()) errs.name = true;
    if (!form.type) errs.type = true;
    if (form.description.trim().length < 10) errs.description = true;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    let msg = t("modal.whatsapp.prefix") + form.name.trim();
    msg += t("modal.whatsapp.type") + form.type;
    msg += t("modal.whatsapp.desc") + form.description.trim();
    if (form.deadline.trim()) msg += t("modal.whatsapp.deadline") + form.deadline.trim();
    if (form.budget.trim()) msg += t("modal.whatsapp.budget") + form.budget.trim();

    window.open(
      `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`,
      "_blank",
      "noopener,noreferrer"
    );
    close();
  };

  const field = (hasError?: boolean) =>
    `w-full px-4 py-3 rounded-xl border text-sm font-sans outline-none transition-colors ` +
    `bg-card text-text placeholder:text-muted ` +
    (hasError
      ? "border-red-500/60 focus:border-red-400 focus:ring-1 focus:ring-red-400/20"
      : "border-border focus:border-accent focus:ring-1 focus:ring-accent/20");

  const options = t("modal.project.options").split(",");

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="briefing-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.78)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
    >
      <div
        ref={modalRef}
        className="bg-surface border border-border rounded-2xl p-6 w-full max-w-md max-h-[92dvh] overflow-y-auto shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 id="briefing-title" className="font-mono font-bold text-text text-lg">
            <span className="text-accent">$</span>{" "}{t("modal.title")}
          </h2>
          <button
            onClick={close}
            aria-label="Fechar"
            className="flex items-center justify-center w-8 h-8 rounded-lg text-muted hover:text-text hover:bg-card transition-colors"
          >
            <X size={15} />
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          {/* Name */}
          <div>
            <input
              ref={firstInputRef}
              type="text"
              placeholder={t("modal.name")}
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              aria-required="true"
              aria-invalid={!!errors.name}
              className={field(errors.name)}
            />
            {errors.name && (
              <p role="alert" className="text-red-400 font-mono text-xs mt-1.5">
                * Campo obrigatório
              </p>
            )}
          </div>

          {/* Service type */}
          <div className="relative">
            <select
              value={form.type}
              onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))}
              aria-required="true"
              aria-invalid={!!errors.type}
              className={`${field(errors.type)} appearance-none pr-8 cursor-pointer`}
            >
              <option value="" disabled>{t("modal.project.type")}</option>
              {options.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            {/* Custom chevron */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
              aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
            {errors.type && (
              <p role="alert" className="text-red-400 font-mono text-xs mt-1.5">
                * Campo obrigatório
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <textarea
              placeholder={t("modal.description")}
              value={form.description}
              onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
              rows={3}
              aria-required="true"
              aria-invalid={!!errors.description}
              className={`${field(errors.description)} resize-none`}
            />
            {errors.description && (
              <p role="alert" className="text-red-400 font-mono text-xs mt-1.5">
                * Mínimo 10 caracteres
              </p>
            )}
          </div>

          {/* Deadline (optional) */}
          <input
            type="text"
            placeholder={t("modal.deadline")}
            value={form.deadline}
            onChange={(e) => setForm((p) => ({ ...p, deadline: e.target.value }))}
            className={field()}
          />

          {/* Budget (optional) */}
          <input
            type="text"
            placeholder={t("modal.budget")}
            value={form.budget}
            onChange={(e) => setForm((p) => ({ ...p, budget: e.target.value }))}
            className={field()}
          />

          {/* Submit */}
          <button
            type="submit"
            className="flex items-center justify-center gap-2.5 w-full px-6 py-3 rounded-xl font-mono text-sm font-semibold bg-accent text-[#0a0a0a] hover:bg-accent-dim transition-all duration-200 mt-1"
          >
            {/* WhatsApp brand icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {t("modal.submit")}
          </button>
        </form>
      </div>
    </div>
  );
}
