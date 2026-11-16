import { OGImageRoute } from "astro-og-canvas";
import { ui, defaultLang } from "../../i18n/ui";

type Lang = keyof typeof ui;

interface OGPage {
  lang: Lang;
  titleKey: string;
  descKey: string;
}

const LANGS: Lang[] = ["pt", "en", "es"];

/**
 * One image per page × language, e.g. `/og/pt-home.png`, `/og/en-projects.png`.
 * Generated at build time by canvaskit — nothing ships to the client.
 */
const pages: Record<string, OGPage> = {};
for (const lang of LANGS) {
  pages[`${lang}-home`] = {
    lang,
    titleKey: "seo.title",
    descKey: "seo.description",
  };
  pages[`${lang}-projects`] = {
    lang,
    titleKey: "seo.projects.title",
    descKey: "seo.projects.description",
  };
}

const MONO = "JetBrains Mono";

export const { getStaticPaths, GET } = await OGImageRoute({
  pages,
  getImageOptions: (_path, page) => {
    const t = (key: string) =>
      (ui[page.lang] as Record<string, string>)[key] ??
      (ui[defaultLang] as Record<string, string>)[key] ??
      key;

    return {
      title: t(page.titleKey),
      description: t(page.descKey),
      // Mirrors aplicacoes/og-compartilhamento from the brand kit:
      // symbol top-left on solid Tinta (#0E0F11), no accent stripe.
      logo: { path: "./src/assets/brand/symbol-dark.png", size: [112] },
      bgGradient: [[14, 15, 17]],
      padding: 80,
      font: {
        title: {
          color: [244, 244, 242],
          size: 56,
          weight: "Bold",
          lineHeight: 1.2,
          families: [MONO],
        },
        description: {
          color: [138, 139, 142],
          size: 28,
          lineHeight: 1.5,
          families: [MONO],
        },
      },
      fonts: [
        "./src/fonts/JetBrainsMono-Bold.ttf",
        "./src/fonts/JetBrainsMono-Regular.ttf",
      ],
      format: "PNG",
    };
  },
});
