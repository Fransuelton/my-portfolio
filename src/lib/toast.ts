export type ToastType = "success" | "error" | "info";

declare global {
  interface Window {
    toast?: (message: string, type?: ToastType, duration?: number) => void;
  }
}

let container: HTMLElement | null = null;

function getContainer(): HTMLElement {
  if (!container || !document.body.contains(container)) {
    const existing = document.getElementById("toast-region");
    if (existing) { container = existing; return existing; }
    container = document.createElement("div");
    container.id = "toast-region";
    container.setAttribute("aria-live", "polite");
    container.setAttribute("aria-atomic", "false");
    document.body.appendChild(container);
  }
  return container;
}

const ICONS: Record<ToastType, string> = {
  success: '<polyline points="20 6 9 17 4 12"/>',
  error:   '<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>',
  info:    '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>',
};

const ICON_COLORS: Record<ToastType, string> = {
  success: "var(--accent)",
  error:   "#f87171",
  info:    "var(--muted)",
};

export function toast(message: string, type: ToastType = "info", duration = 0): void {
  const ms = duration || (type === "error" ? 4500 : 3000);
  const c = getContainer();

  const el = document.createElement("div");
  el.className = "toast-item";
  el.setAttribute("role", "status");

  const iconEl = document.createElement("span");
  iconEl.style.cssText = "display:flex;flex-shrink:0;";
  iconEl.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="${ICON_COLORS[type]}" stroke-width="2.5" aria-hidden="true">${ICONS[type]}</svg>`;

  const textEl = document.createElement("span");
  textEl.textContent = message;

  el.appendChild(iconEl);
  el.appendChild(textEl);
  c.appendChild(el);

  requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add("toast-visible")));

  const dismiss = () => {
    el.classList.remove("toast-visible");
    el.addEventListener("transitionend", () => el.remove(), { once: true });
  };

  const timer = setTimeout(dismiss, ms);
  el.addEventListener("click", () => { clearTimeout(timer); dismiss(); }, { once: true });
}

export function initToast(): void {
  window.toast = toast;
}
