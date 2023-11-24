import html from "../../../assets/images/icons/html.png";
import css from "../../../assets/images/icons/css.png";
import javascript from "../../../assets/images/icons/javascript.png";
import react from "../../../assets/images/icons/react.png";
import git from "../../../assets/images/icons/git.png";
import jest from "../../../assets/images/icons/jest.png";
import typescript from "../../../assets/images/icons/typescript.png";
import tailwindcss from "../../../assets/images/icons/tailwindcss.png";
import figma from "../../../assets/images/icons/figma.png";

const data = [
  {
    id: 1,
    name: "HTML5",
    image: html,
    description:
      "HTML5 é uma tecnologia fundamental para a criação de páginas e aplicativos da web. Ele fornece a estrutura e o conteúdo dos sites, permitindo a exibição de texto, imagens e multimídia.",
    color: "#E14E1D",
  },
  {
    id: 2,
    name: "CSS3",
    image: css,
    description:
      "CSS3 é uma linguagem de estilo usada para projetar e formatar o layout e a aparência de páginas da web. Ele aprimora a apresentação visual de elementos HTML.",
    color: "#0277BD",
  },
  {
    id: 3,
    name: "JavaScript",
    image: javascript,
    description:
      "JavaScript é uma linguagem de programação versátil que adiciona interatividade e comportamento dinâmico a sites. Ele permite a criação de scripts no lado do cliente e a interação com elementos da web.",
    color: "#F0DB4F",
  },
  {
    id: 4,
    name: "React",
    image: react,
    description:
      "React é uma biblioteca JavaScript popular para a construção de interfaces de usuário. Ele permite que os desenvolvedores criem componentes de UI reutilizáveis e gerenciem o estado de aplicativos da web de forma eficiente.",
    color: "#00D6FD",
  },
  {
    id: 5,
    name: "Git",
    image: git,
    description:
      "Git é um sistema de controle de versão distribuído usado para rastrear alterações no código-fonte durante o desenvolvimento de software. Ele ajuda equipes a colaborar, gerenciar código e manter o histórico do projeto.",
    color: "#F03C2E",
  },
  {
    id: 6,
    name: "Jest",
    image: jest,
    description:
      "Jest é um framework de teste JavaScript amplamente usado para escrever testes unitários e de integração. Ele simplifica o processo de testar o código, garantindo sua confiabilidade.",
    color: "#99424F",
  },
  {
    id: 7,
    name: "TypeScript",
    image: typescript,
    description:
      "TypeScript é um superset tipado estático do JavaScript que aprimora a qualidade do código e a produtividade do desenvolvedor, adicionando verificação de tipos à linguagem. É frequentemente usado em aplicativos de grande escala.",
    color: "#007ACB",
  },
  {
    id: 8,
    name: "Tailwind CSS",
    image: tailwindcss,
    description:
      'Tailwind CSS é um framework de CSS "utility-first" que simplifica o processo de estilização de aplicativos da web. Ele fornece um conjunto de classes predefinidas para criar designs responsivos e personalizáveis.',
    color: "#38BDF8",
  },
  {
    id: 9,
    name: "Figma",
    image: figma,
    description:
      "Figma é uma ferramenta de design e prototipagem colaborativa usada por designers e equipes para criar interfaces de usuário e protótipos interativos. Ele permite colaboração em tempo real e iteração de design.",
    color: "#2468E1",
  },
];

export { data };
