import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { ProjectCard } from "./projectCard.jsx";
import {
  SiExpress,
  SiJsonwebtokens,
  SiNodedotjs,
  SiVite,
  SiTypescript,
  SiMysql,
  SiLaravel,
  SiMongodb,
  SiPhp,
  SiVuedotjs,
  SiJavascript,
} from "react-icons/si";

const Projects = () => {
  return (
    <StyledSection
      id="projects"
      data-aos="fade-in"
      data-aos-easing="ease-in-out"
      data-aos-mirror="true"
    >
      <StyledHeader>
        <div>
          <h1>Projetos em Destaque</h1>
          <p>Meus principais projetos Frontend, Backend e Fullstack.</p>
        </div>

        <a
          href="https://github.com/Fransuelton?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver todos os projetos
          <FontAwesomeIcon icon={faArrowRight} />
        </a>
      </StyledHeader>

      <ProjectsWrapper>
        <ProjectCard
          image="https://github.com/Fransuelton/devlinks/raw/main/.github/project.jpg"
          name="DevLiks"
          description="Árvore de links personalizável inspirada no LinkTree, desenvolvida com Vue.js + TypeScript. Permite adicionar botões para redes sociais, portfólio e contatos com fácil manutenção e design responsivo."
          deployUrl="https://fransuelton.dev/links/"
          repositoryUrl="https://github.com/Fransuelton/devlinks"
          techIcons={[SiVuedotjs, SiTypescript, SiJavascript, SiVite]}
          buttonText="Deploy"
        />
        <ProjectCard
          image="../../../../src/assets/images/cover-authjs.webp"
          name="AuthJS"
          description="Sistema de autenticação completo com Node.js, JWT, MongoDB e verificação de e-mail. Inclui login seguro, rotas protegidas e medidas contra ataques de força bruta."
          deployUrl="https://auth-js-gmtn.onrender.com"
          repositoryUrl="https://github.com/Fransuelton/auth-js"
          techIcons={[SiNodedotjs, SiExpress, SiMongodb, SiJsonwebtokens]}
          buttonText="API Deploy"
        />

        <ProjectCard
          image="https://github.com/Fransuelton/test-sync360/blob/main/.github/readme/screenshots/profile-desktop.png?raw=true"
          name="Perfil de Usuário"
          description="Aplicação fullstack moderna com Laravel e Vue.js desenvolvida como desafio técnico. Sistema completo de perfis com CRUD, upload de imagem, validações robustas, arquitetura escalável e testes automatizados."
          deployUrl="https://test-sync360.vercel.app/"
          repositoryUrl="https://github.com/Fransuelton/test-sync360"
          techIcons={[SiLaravel, SiPhp, SiMysql, SiVuedotjs]}
          buttonText="Deploy"
        />
      </ProjectsWrapper>
    </StyledSection>
  );
};

const StyledSection = styled.section`
  margin-bottom: 20rem;
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ffffff;

  h1 {
    font-size: 3.6rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.6rem;
    color: #ffffff;
  }

  a {
    font-size: 1.6rem;
    font-weight: 500;
    text-decoration: none;
    border: 0.1rem solid #ffffff;
    padding: 1.6rem 2.4rem;
    border-radius: 0.5rem;
    color: #ffffff;
    transition: background-color 0.3s ease-in-out, border-color 0.3s ease-in-out;
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }

  a:hover {
    background-color: var(--tertiary-color);
    border-color: var(--tertiary-color);
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    align-items: center;
    gap: 2rem;

    h1 {
      font-size: 2.4rem;
    }
  }
`;

const ProjectsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: space-around;
  align-items: flex-start;
  margin-top: 3rem;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`;

export { Projects };
