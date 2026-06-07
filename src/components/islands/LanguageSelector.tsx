import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

type Lang = "pt" | "en" | "es";
type Alternate = { lang: string; url: string };

const BCP47: Record<Lang, string> = { pt: "pt-BR", en: "en-US", es: "es-ES" };

const LABELS: Record<Lang, { code: string; full: string }> = {
  pt: { code: "PT", full: "Português" },
  en: { code: "EN", full: "English" },
  es: { code: "ES", full: "Español" },
};

const LANGS: Lang[] = ["pt", "en", "es"];

export default function LanguageSelector() {
  const [current, setCurrent] = useState<Lang>("pt");
  const [alternates, setAlternates] = useState<Alternate[]>([]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const body = document.body;
    const lang = body.dataset.lang as Lang;
    const alts: Alternate[] = JSON.parse(body.dataset.alternates ?? "[]");
    if (lang) setCurrent(lang);
    if (alts.length) setAlternates(alts);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const urlFor = (target: Lang): string =>
    alternates.find((a) => a.lang === BCP47[target])?.url ?? "/";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={`Language: ${LABELS[current].full}`}
        className="flex items-center gap-1 px-2.5 py-2 rounded-lg border border-border text-muted hover:text-accent hover:border-accent transition-colors font-mono text-xs"
      >
        {LABELS[current].code}
        <ChevronDown
          size={11}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label="Select language"
          className="absolute right-0 top-full mt-1 bg-surface border border-border rounded-xl py-1 min-w-[130px] shadow-xl z-50"
        >
          {LANGS.map((lang) => (
            <li key={lang} role="option" aria-selected={lang === current}>
              <a
                href={urlFor(lang)}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-2.5 px-3 py-2 font-mono text-sm hover:bg-card transition-colors ${
                  lang === current ? "text-accent" : "text-muted hover:text-text"
                }`}
              >
                <span className="font-semibold text-xs w-5">{LABELS[lang].code}</span>
                <span className="text-xs">{LABELS[lang].full}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
