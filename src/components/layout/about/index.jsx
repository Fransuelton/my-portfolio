import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons";
import { styled, keyframes } from "styled-components";
import artImage from "../../../assets/images/art.png";

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
        <StyledImg src={artImage} alt="" />
        <StyledDiv>
          <Description>
            Atualmente, estou matriculado no curso técnico de Redes de
            Computadores no IMD/UFRN. Possuo habilidades em HTML, CSS,
            JavaScript, React e diversas outras bibliotecas e frameworks
            relacionados ao desenvolvimento front-end. Estou constantemente em
            busca de aprimorar minhas habilidades e aprender novas tecnologias.
            Meu objetivo a longo prazo é me tornar um desenvolvedor full-stack e
            estou preparado para contribuir em projetos desafiadores.
          </Description>

          <StyledButton
            href="https://drive.google.com/file/d/1WDVqY-55Wc1rAFuuAMqoz7sPUMu3kYdy/view"
            target="_blank"
          >
            <StyledIcon icon={faFileArrowDown} />
            Download CV
          </StyledButton>
          
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
  width: 60rem;
  @media (max-width: 480px) {
    align-items: center;
    width: 35rem;
  }
`;

const Description = styled.p`
  font-size: var(--small-font-size);
  color: var(--quaternary-color);
  font-weight: 400;
  margin-bottom: 3rem;

  @media (max-width: 480px) {
    font-size: 1.6rem;
    width: 35rem;
  }
`;

const StyledButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 22rem;
  height: 6rem;
  padding: 1.6rem 3.2rem;
  border-radius: 8px;
  background-color: var(--secondary-color);
  font-size: 1.5rem;
  color: var(--quaternary-color);
  font-weight: 700;
  transition: 0.5s;
  border: 1px solid #fff;
  text-decoration: none;

  &:hover {
    background-color: var(--tertiary-color);
    border-color: var(--tertiary-color);
  }
`;

const StyledIcon = styled(FontAwesomeIcon)`
  margin-right: 1rem;
  font-size: 3rem;
`;

export { About };
