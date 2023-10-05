import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faGithub,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { styled, keyframes } from "styled-components";

const About = () => {
  return (
    <Section
      id="about"
      data-aos="fade-in"
      data-aos-easing="ease-in-out"
      data-aos-mirror="true"
    >
      <Title>Sobre mim</Title>

      <AboutContainer>
        <StyledImg src="/art.png" alt="" />
        <StyledDiv>
          <Description>
            Sou um desenvolvedor frontend focado e determinado, atualmente
            cursando técnico em redes de computadores pelo IMD/UFRN. Tenho
            expertise em HTML, CSS, JavaScript, React dentre outras bibliotecas
            e frameworks, além de estar sempre buscando aprimorar minhas
            habilidades. Meu objetivo é me tornar um desenvolvedor fullstack.
            Estou pronto para contribuir em projetos desafiadores.
          </Description>

          <SocialIconsList>
            <li>
              <a href="https://www.linkedin.com/in/fransuelton/">
                <StyledIcon icon={faLinkedin} inverse />
              </a>
            </li>
            <li>
              <a href="https://github.com/Fransuelton">
                <StyledGithubIcon icon={faGithub} inverse />
              </a>
            </li>
            <li>
              <a href="https://api.whatsapp.com/send?phone=558499778995">
                <StyledWhatsappIcon icon={faWhatsapp} inverse />
              </a>
            </li>
          </SocialIconsList>
        </StyledDiv>
      </AboutContainer>
    </Section>
  );
};

const FloatAnimation = keyframes`
  0%{
    transform: translate(0px);
  }
  50%{
    transform: translateY(-20px)
  }
  100%{
    transform: translateY(0px)
  }
`;

const StyledImg = styled.img`
  animation: ${FloatAnimation} 5s ease infinite;

  @media (max-width: 480px) {
    width: 35rem;
    height: 35rem;
  }
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 17.2rem 15.9rem;

  @media (max-width: 480px) {
    text-align: center;
    margin: 17.2rem 0;
  }
`;

const Title = styled.h1`
  color: var(--quaternary-color);
  font-size: var(--large-font-size);
  margin-bottom: 8rem;
  text-transform: uppercase;
`;

const AboutContainer = styled.div`
  display: flex;
  gap: 6rem;
  text-align: center;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
  }
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50rem;
  @media (max-width: 480px) {
    align-items: center;
    width: 35rem;
  }
`;

const Description = styled.p`
  font-size: var(--small-font-size);
  color: var(--quaternary-color);
  font-weight: 400;
  height: 30rem;

  @media (max-width: 480px) {
    font-size: 1.6rem;
    width: 35rem;
  }
`;

const SocialIconsList = styled.ul`
  display: flex;
  gap: 2rem;

  @media (max-width: 480px) {
    justify-content: center;
  }
`;

const StyledIcon = styled(FontAwesomeIcon)`
  width: 3.5rem;
  height: 3.5rem;
  border: 1px solid var(--quaternary-color);
  padding: 1rem;
  border-radius: 50%;

  transition: 0.5s;

  &:hover {
    background-color: rgb(4%, 40%, 76%);

    border-color: rgb(4%, 40%, 76%);
    border-radius: 20%;

    box-shadow: 0 0 25px rgb(4%, 40%, 76%);

    box-shadow: 0 0 5px rgb(4%, 40%, 76%), 0 0 25px rgb(4%, 40%, 76%),
      0 0 50px rgb(4%, 40%, 76%), 0 0 100px rgb(4%, 40%, 76%);
  }
`;

const StyledWhatsappIcon = styled(FontAwesomeIcon)`
  width: 3.5rem;
  height: 3.5rem;
  border: 1px solid var(--quaternary-color);
  padding: 1rem;

  border-radius: 50%;

  transition: 0.5s;

  &:hover {
    background-color: rgb(0%, 90%, 46%);

    border-color: rgb(0%, 90%, 46%);
    border-radius: 20%;

    box-shadow: 0 0 25px rgb(0%, 90%, 46%);

    box-shadow: 0 0 5px rgb(0%, 90%, 46%), 0 0 25px rgb(0%, 90%, 46%),
      0 0 50px rgb(0%, 90%, 46%), 0 0 100px rgb(0%, 90%, 46%);
  }
`;

const StyledGithubIcon = styled(FontAwesomeIcon)`
  width: 3.5rem;
  height: 3.5rem;
  border: 1px solid var(--quaternary-color);
  padding: 1rem;
  border-radius: 50%;

  transition: 0.5s;

  &:hover {
    border-radius: 20%;
  }
`;

export { About };
