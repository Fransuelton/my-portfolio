import { useState, useEffect } from "react";
import { Moon, Sun, Monitor } from "lucide-react";

type Theme = "dark" | "light" | "system";

const CYCLE: Theme[] = ["dark", "light", "system"];

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("system");

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    setTheme(stored === "dark" || stored === "light" ? stored : "system");
  }, []);

  const apply = (next: Theme) => {
    const doApply = () => {
      if (next === "system") {
        localStorage.removeItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light");
      } else {
        localStorage.setItem("theme", next);
        document.documentElement.setAttribute("data-theme", next);
      }
    };
    if ("startViewTransition" in document) {
      (document as Document & { startViewTransition: (cb: () => void) => void })
        .startViewTransition(doApply);
    } else {
      doApply();
    }
    setTheme(next);
  };

  const cycle = () => apply(CYCLE[(CYCLE.indexOf(theme) + 1) % CYCLE.length]);

  const LABELS: Record<Theme, string> = { dark: "Dark", light: "Light", system: "System" };

  return (
    <button
      onClick={cycle}
      aria-label={`Theme: ${LABELS[theme]}. Click to switch.`}
      title={LABELS[theme]}
      className="flex items-center justify-center w-9 h-9 rounded-lg border border-border text-muted hover:text-accent hover:border-accent transition-colors"
    >
      {theme === "dark"   && <Moon    size={15} />}
      {theme === "light"  && <Sun     size={15} />}
      {theme === "system" && <Monitor size={15} />}
    </button>
  );
}
