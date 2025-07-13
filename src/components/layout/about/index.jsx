import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import { styled } from "styled-components";

const About = () => {
  return (
    <Section
      id="about"
      data-aos="fade-in"
      data-aos-easing="ease-in-out"
      data-aos-mirror="true"
    >
      <AboutContainer>
        <StyledImg
          src="https://avatars.githubusercontent.com/u/107893416?v=4"
          alt="Foto profissional de Fransuelton, Desenvolvedor Fullstack"
        />
        <div>
          <StyledTitle>
            Desenvolvedor Fullstack com foco em Back-End.
          </StyledTitle>
          <Description>
            Crio APIs robustas, sistemas personalizados e landing pages de alta
            performance, sempre com foco em escalabilidade e qualidade de
            código. Tenho experiência prática com JavaScript, React, Node.js e
            MySQL. Atualmente curso Engenharia de Software e possuo formação
            técnica em Redes de Computadores. Estou em constante evolução,
            desenvolvendo tanto minhas habilidades técnicas quanto
            comportamentais, e estou sempre pronto para encarar novos desafios
            que impulsionem meu crescimento profissional.
          </Description>

          <StyledButton
            href="https://drive.google.com/file/d/1y-HLnC2XmD5PPHmWULrOWNi-zAJfXmXZ/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
          >
            <StyledIcon icon={faFilePdf} />
            Acessar CV
          </StyledButton>
        </div>
      </AboutContainer>
    </Section>
  );
};

const Section = styled.section`
  text-align: left;
  background-color: #202024;
  border-radius: 1.6rem;
  margin-bottom: 20rem;
  padding: 2rem;
`;

const AboutContainer = styled.div`
  display: flex;
  gap: 4rem;
  align-items: center;
  justify-content: center;
  text-align: left;
  width: 80%;
  margin: 0 auto;

  @media (max-width: 480px) {
    flex-direction: column;
    text-align: center;
    align-items: center;
    gap: 2rem;
    width: 100%;
  }
`;

const StyledImg = styled.img`
  width: 30rem;
  height: 30rem;
`;

const StyledTitle = styled.p`
  font-size: 1.8rem;
  font-weight: 300;
  color: #ffffff;
  margin-bottom: 2rem;
  align-self: flex-start;
`;

const Description = styled.p`
  font-size: 1.6rem;
  color: #c6c6c6;
  margin-bottom: 3rem;
  text-align: left;
  line-height: 1.6;
  font-weight: 400;

  @media (max-width: 480px) {
    text-align: center;
  }
`;

const StyledButton = styled.a`
  display: flex;
  align-items: center;
  align-self: flex-start;
  justify-content: center;
  cursor: pointer;
  width: 22rem;
  height: 6rem;
  padding: 1.6rem 3.2rem;
  border-radius: 8px;
  background-color: var(--tertiary-color);
  font-size: 1.5rem;
  color: var(--quaternary-color);
  transition: 0.5s;
  border: none;
  font-weight: 500;
  text-decoration: none;

  &:hover {
    background-color: #fff;
    color: var(--tertiary-color);
    border-color: #fff;
  }

  @media (max-width: 480px) {
    width: 100%;
    justify-content: center;
    align-items: center;
  }
`;

const StyledIcon = styled(FontAwesomeIcon)`
  margin-right: 1rem;
  font-size: 3rem;
`;

export { About };
