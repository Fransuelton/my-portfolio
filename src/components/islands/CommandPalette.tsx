import { useState, useEffect, useRef, useMemo } from "react";
import { Moon, Sun, Monitor, Globe, Hash, Search, Terminal } from "lucide-react";
import { ui } from "../../i18n/ui";

type Lang = "pt" | "en" | "es";
type Theme = "dark" | "light" | "system";
type Alternate = { lang: string; url: string };

interface Item {
  id: string;
  label: string;
  sublabel?: string;
  group: string;
  icon: React.ReactNode;
  action: () => void;
  keywords: string[];
  hidden?: boolean;
}

const BCP47: Record<Lang, string> = { pt: "pt-BR", en: "en-US", es: "es-ES" };

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lang, setLang] = useState<Lang>("pt");
  const [currentTheme, setCurrentTheme] = useState<Theme>("system");
  const [alternates, setAlternates] = useState<Alternate[]>([]);
  const [easterEgg, setEasterEgg] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<Element | null>(null);
  const isOpenRef = useRef(false);
  isOpenRef.current = isOpen;

  const t = (key: string) =>
    (ui[lang] as Record<string, string>)[key] ??
    (ui["pt"] as Record<string, string>)[key] ??
    key;

  // Sync from DOM
  useEffect(() => {
    const bodyLang = document.body.dataset.lang as Lang;
    if (bodyLang) setLang(bodyLang);
    setAlternates(JSON.parse(document.body.dataset.alternates ?? "[]"));
  }, []);

  // Re-sync theme when palette opens
  useEffect(() => {
    if (!isOpen) return;
    const stored = localStorage.getItem("theme");
    setCurrentTheme(stored === "dark" || stored === "light" ? stored : "system");
  }, [isOpen]);

  // Listen for header button
  useEffect(() => {
    const open = () => setIsOpen(true);
    document.addEventListener("open-command-palette", open);
    return () => document.removeEventListener("open-command-palette", open);
  }, []);

  // ⌘K / Ctrl+K + Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((o) => !o);
      } else if (e.key === "Escape" && isOpenRef.current) {
        setIsOpen(false);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  // Focus + scroll lock
  useEffect(() => {
    if (isOpen) {
      triggerRef.current = document.activeElement;
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 30);
    } else {
      document.body.style.overflow = "";
      setQuery("");
      setEasterEgg(false);
      setSelectedIndex(0);
      setTimeout(() => (triggerRef.current as HTMLElement)?.focus?.(), 0);
    }
  }, [isOpen]);

  // Auto-dismiss easter egg
  useEffect(() => {
    if (!easterEgg) return;
    const id = setTimeout(() => setIsOpen(false), 1800);
    return () => clearTimeout(id);
  }, [easterEgg]);

  // Items — rebuilt when lang / theme / alternates change
  const items = useMemo((): Item[] => {
    const dismiss = () => setIsOpen(false);

    const goTo = (id: string) => {
      dismiss();
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        } else {
          const base = lang === "en" ? "/en/" : lang === "es" ? "/es/" : "/";
          window.location.href = `${base}#${id}`;
        }
      }, 80);
    };

    const setTheme = (next: Theme) => {
      if (next === "system") {
        localStorage.removeItem("theme");
        const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
      } else {
        localStorage.setItem("theme", next);
        document.documentElement.setAttribute("data-theme", next);
      }
      setCurrentTheme(next);
      dismiss();
    };

    const goLang = (target: Lang) => {
      const url = alternates.find((a) => a.lang === BCP47[target])?.url;
      if (url) { dismiss(); setTimeout(() => { window.location.href = url; }, 80); }
    };

    const navGroup  = (ui[lang] as Record<string, string>)["cmd.group.nav"]  ?? "Navegação";
    const prefGroup = (ui[lang] as Record<string, string>)["cmd.group.pref"] ?? "Preferências";
    const langGroup = (ui[lang] as Record<string, string>)["cmd.group.lang"] ?? "Idioma";

    const tl = (key: string) => (ui[lang] as Record<string, string>)[key] ?? key;

    return [
      // Navigation
      { id: "about",    group: navGroup, label: tl("nav.about"),    icon: <Hash size={13} />, action: () => goTo("about"),    keywords: ["about","sobre","me","perfil"] },
      { id: "services", group: navGroup, label: tl("nav.services"), icon: <Hash size={13} />, action: () => goTo("services"), keywords: ["services","serviços","servicios","work","trabalho"] },
      { id: "projects", group: navGroup, label: tl("nav.projects"), icon: <Hash size={13} />, action: () => goTo("projects"), keywords: ["projects","projetos","proyectos","github","code"] },
      { id: "contact",  group: navGroup, label: tl("nav.contact"),  icon: <Hash size={13} />, action: () => goTo("contact"),  keywords: ["contact","contato","contacto","email","message"] },
      // Theme
      { id: "dark",   group: prefGroup, label: tl("theme.dark"),   sublabel: currentTheme === "dark"   ? "✓" : undefined, icon: <Moon size={13} />,    action: () => setTheme("dark"),   keywords: ["dark","escuro","oscuro","theme","tema","noite"] },
      { id: "light",  group: prefGroup, label: tl("theme.light"),  sublabel: currentTheme === "light"  ? "✓" : undefined, icon: <Sun size={13} />,     action: () => setTheme("light"),  keywords: ["light","claro","theme","tema","dia"] },
      { id: "system", group: prefGroup, label: tl("theme.system"), sublabel: currentTheme === "system" ? "✓" : undefined, icon: <Monitor size={13} />, action: () => setTheme("system"), keywords: ["system","auto","sistema","theme","tema"] },
      // Language
      { id: "lang-pt", group: langGroup, label: "Português", sublabel: lang === "pt" ? "✓" : undefined, icon: <Globe size={13} />, action: () => goLang("pt"), keywords: ["pt","português","portuguese","brazil","brasil"] },
      { id: "lang-en", group: langGroup, label: "English",   sublabel: lang === "en" ? "✓" : undefined, icon: <Globe size={13} />, action: () => goLang("en"), keywords: ["en","english","inglês","inglés"] },
      { id: "lang-es", group: langGroup, label: "Español",   sublabel: lang === "es" ? "✓" : undefined, icon: <Globe size={13} />, action: () => goLang("es"), keywords: ["es","español","spanish","espanhol"] },
      // Easter egg — only visible when query matches
      { id: "sudo", group: "root@portfolio:~$", label: "sudo rm -rf /", icon: <Terminal size={13} />, action: () => setEasterEgg(true), keywords: ["sudo","rm","rf","delete","destroy","hack","root"], hidden: true },
    ];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang, currentTheme, alternates]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return items.filter((i) => !i.hidden);
    return items.filter((i) =>
      i.label.toLowerCase().includes(q) ||
      i.keywords.some((k) => k.includes(q))
    );
  }, [items, query]);

  // Reset index when results change
  useEffect(() => { setSelectedIndex(0); }, [filtered]);

  // Scroll active item into view
  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-idx="${selectedIndex}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      filtered[selectedIndex].action();
    }
  };

  const groups = useMemo(() => {
    const map = new Map<string, Item[]>();
    for (const item of filtered) {
      if (!map.has(item.group)) map.set(item.group, []);
      map.get(item.group)!.push(item);
    }
    return map;
  }, [filtered]);

  if (!isOpen) return null;

  let flatIdx = 0;

  return (
    <div
      className="palette-backdrop fixed inset-0 z-[9800] flex items-start justify-center pt-[12vh] px-4"
      style={{ background: "rgba(0,0,0,0.72)", backdropFilter: "blur(4px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) setIsOpen(false); }}
      role="dialog"
      aria-modal="true"
      aria-label={t("cmd.open")}
    >
      <div className="palette-panel w-full max-w-xl overflow-hidden rounded-2xl border border-border shadow-2xl" style={{ background: "var(--surface)" }}>

        {easterEgg ? (
          <div className="p-8 text-center font-mono">
            <p className="text-red-400 text-sm mb-2">Permission denied.</p>
            <p className="text-xs" style={{ color: "var(--muted)" }}>
              This is a portfolio, not a server 🔒
            </p>
          </div>
        ) : (
          <>
            {/* Search */}
            <div className="flex items-center gap-3 px-4 py-3.5" style={{ borderBottom: "1px solid var(--border)" }}>
              <Search size={15} style={{ color: "var(--muted)" }} className="shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t("cmd.placeholder")}
                className="flex-1 bg-transparent text-sm font-mono outline-none"
                style={{ color: "var(--text)" }}
                autoComplete="off"
                spellCheck={false}
                aria-label={t("cmd.placeholder")}
                aria-autocomplete="list"
              />
              <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded font-mono text-[10px]" style={{ border: "1px solid var(--border)", color: "var(--muted)" }}>
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div ref={listRef} role="listbox" className="max-h-[17rem] overflow-y-auto py-1.5">
              {filtered.length === 0 ? (
                <p className="px-4 py-7 text-center text-sm font-mono" style={{ color: "var(--muted)" }}>
                  {t("cmd.no-results")}
                </p>
              ) : (
                Array.from(groups.entries()).map(([group, groupItems]) => (
                  <div key={group}>
                    <p className="px-4 pt-3 pb-1 text-[10px] font-mono uppercase tracking-widest select-none" style={{ color: "var(--muted)" }}>
                      {group}
                    </p>
                    {groupItems.map((item) => {
                      const idx = flatIdx++;
                      const active = idx === selectedIndex;
                      return (
                        <button
                          key={item.id}
                          role="option"
                          aria-selected={active}
                          data-idx={idx}
                          onClick={() => item.action()}
                          onMouseEnter={() => setSelectedIndex(idx)}
                          className="w-full flex items-center gap-3 px-3 py-2.5 mx-1 rounded-lg text-sm text-left transition-colors"
                          style={{
                            width: "calc(100% - 8px)",
                            background: active ? "var(--card)" : "transparent",
                            color: active ? "var(--text)" : "var(--muted)",
                          }}
                        >
                          <span style={{ color: active ? "var(--accent)" : "var(--muted)" }} className="shrink-0">
                            {item.icon}
                          </span>
                          <span className="font-mono flex-1">{item.label}</span>
                          {item.sublabel && (
                            <span className="font-mono text-xs" style={{ color: "var(--accent)" }}>
                              {item.sublabel}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div
              className="flex items-center gap-4 px-4 py-2 text-[10px] font-mono"
              style={{ borderTop: "1px solid var(--border)", color: "var(--muted)" }}
            >
              <span>
                <kbd className="px-1 py-0.5 rounded" style={{ border: "1px solid var(--border)" }}>↑↓</kbd>
                {" "}{t("cmd.hint.nav")}
              </span>
              <span>
                <kbd className="px-1 py-0.5 rounded" style={{ border: "1px solid var(--border)" }}>↵</kbd>
                {" "}{t("cmd.hint.select")}
              </span>
              <span>
                <kbd className="px-1 py-0.5 rounded" style={{ border: "1px solid var(--border)" }}>esc</kbd>
                {" "}{t("cmd.hint.close")}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
