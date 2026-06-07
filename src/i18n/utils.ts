import { ui, defaultLang } from "./ui";
import type { TranslationKey } from "./ui";

export type Lang = keyof typeof ui;

export const langs: Record<Lang, string> = {
  pt: "Português",
  en: "English",
  es: "Español",
};

export function getLangFromUrl(url: URL): Lang {
  const [, maybeLocale] = url.pathname.split("/");
  if (maybeLocale in ui) return maybeLocale as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: TranslationKey): string {
    return (ui[lang] as Record<string, string>)[key] ?? (ui[defaultLang] as Record<string, string>)[key] ?? key;
  };
}

export function getLocalePath(lang: Lang, path = ""): string {
  const base = lang === defaultLang ? "" : `/${lang}`;
  return `${base}/${path}`.replace(/\/{2,}/g, "/");
}

export function getAlternateUrls(
  site: string,
  pagePath: Record<Lang, string>
): Array<{ lang: string; url: string }> {
  const hreflangMap: Record<Lang, string> = { pt: "pt-BR", en: "en-US", es: "es-ES" };
  return (Object.keys(pagePath) as Lang[]).map((lang) => ({
    lang: hreflangMap[lang],
    url: `${site}${pagePath[lang]}`,
  }));
}
