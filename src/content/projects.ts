export type Lang = "pt" | "en" | "es";

export interface Project {
  slug: string;
  name: string;
  descriptions: Record<Lang, string>;
  image: string;
  deployUrl?: string;
  repositoryUrl: string;
  tech: string[];
  deployLabel?: string;
  featured: boolean;
}

export const featuredProjects: Project[] = [
  {
    slug: "devlinks",
    name: "DevLinks",
    descriptions: {
      pt: "Árvore de links personalizável inspirada no LinkTree, desenvolvida com Vue.js + TypeScript. Permite adicionar botões para redes sociais, portfólio e contatos com design responsivo.",
      en: "A customizable link tree inspired by LinkTree, built with Vue.js + TypeScript. Add buttons for social networks, portfolio, and contacts with a fully responsive design.",
      es: "Árbol de enlaces personalizable inspirado en LinkTree, desarrollado con Vue.js + TypeScript. Agrega botones para redes sociales, portafolio y contactos con diseño responsivo.",
    },
    image: "https://github.com/Fransuelton/devlinks/raw/main/.github/project.jpg",
    deployUrl: "https://fransuelton.dev/links/",
    repositoryUrl: "https://github.com/Fransuelton/devlinks",
    tech: ["Vue.js", "TypeScript", "Vite"],
    deployLabel: "Demo",
    featured: true,
  },
  {
    slug: "auth-js",
    name: "AuthJS",
    descriptions: {
      pt: "Sistema de autenticação completo com Node.js, JWT, MongoDB e verificação de e-mail. Inclui login seguro, rotas protegidas e proteção contra força bruta.",
      en: "Complete authentication system with Node.js, JWT, MongoDB, and email verification. Includes secure login, protected routes, and brute-force attack mitigation.",
      es: "Sistema de autenticación completo con Node.js, JWT, MongoDB y verificación de email. Incluye login seguro, rutas protegidas y protección contra fuerza bruta.",
    },
    image: "/images/cover-authjs.webp",
    deployUrl: "https://auth-js-gmtn.onrender.com",
    repositoryUrl: "https://github.com/Fransuelton/auth-js",
    tech: ["Node.js", "Express", "MongoDB", "JWT"],
    deployLabel: "API",
    featured: true,
  },
  {
    slug: "user-profile",
    name: "Perfil de Usuário",
    descriptions: {
      pt: "Aplicação fullstack moderna com Laravel e Vue.js desenvolvida como desafio técnico. CRUD completo com upload de imagem, validações robustas e testes automatizados.",
      en: "Modern fullstack app with Laravel and Vue.js built as a technical challenge. Full CRUD with image upload, robust validations, and automated tests.",
      es: "Aplicación fullstack moderna con Laravel y Vue.js desarrollada como desafío técnico. CRUD completo con carga de imágenes, validaciones robustas y pruebas automatizadas.",
    },
    image: "https://github.com/Fransuelton/test-sync360/blob/main/.github/readme/screenshots/profile-desktop.png?raw=true",
    deployUrl: "https://test-sync360.vercel.app/",
    repositoryUrl: "https://github.com/Fransuelton/test-sync360",
    tech: ["Laravel", "PHP", "MySQL", "Vue.js"],
    deployLabel: "Demo",
    featured: true,
  },
];

/** GitHub repo names to exclude from the /projetos page (already featured on home) */
export const FEATURED_REPO_SLUGS = ["devlinks", "auth-js", "test-sync360"];
