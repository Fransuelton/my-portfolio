import { styled, keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../../styles/variables.css";
import {
  faLinkedin,
  faGithub,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";

const Main = () => {
  return (
    <StyledSection>
      <StyledContainer>
        <InfoContainer>
          <Title>Fransuelton Francisco</Title>
          <VacantTitle>Desenvolvedor Front-end</VacantTitle>

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
        </InfoContainer>

        <Img
          src="https://media.licdn.com/dms/image/D4D03AQExZn0MhTuSdw/profile-displayphoto-shrink_800_800/0/1684527210427?e=1701302400&v=beta&t=ZjCDwADXa2o4GDco0UTCqBNvXaO-J8RbYr_o34wdlMA"
          alt="Foto principal"
          title="Foto de Perfil"
        />
      </StyledContainer>
    </StyledSection>
  );
};

const typingAnimation = keyframes`
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
`;

const blinkCaretAnimation = keyframes`
  from, to {
    border-color: transparent;
  }
  50% {
    border-color: white;
  }
`;

const FloatAnimation = keyframes`
  0%{
    transform: translate(0px);
  }
  50%{
    transform: translateY(-10px)
  }
  100%{
    transform: translateY(0px)
  }
`;

const StyledSection = styled.section`
  display: grid;
  place-items: center;
  margin: 14rem 5rem;

  @media (max-width: 500px) {
    display: flex;
    justify-content: center;
  }
`;

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10rem;

  @media (max-width: 500px) {
    flex-direction: column;
  }
`;

const InfoContainer = styled.div`
  @media (max-width: 500px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const Title = styled.h1`
  font-size: var(--large-font-size);
  font-weight: 700;
  text-transform: uppercase;
  color: var(--quaternary-color);

  @media (max-width: 500px) {
    font-size: var(--medium-font-size);
  }
`;

const VacantTitle = styled.p`
  font-size: var(--medium-font-size);
  color: var(--tertiary-color);
  text-transform: uppercase;
  font-weight: 700;
  margin: 1.6rem 0 4rem 0;
  overflow: hidden;
  border-right: 0.15em solid;
  white-space: nowrap;
  letter-spacing: 0.15em;

  animation: ${typingAnimation} 3.5s steps(30, end),
    ${blinkCaretAnimation} 0.75s step-end infinite;

  @media (max-width: 500px) {
    font-size: var(--small-font-size);
    letter-spacing: 0;
  }
`;

const Img = styled.img`
  border-radius: 50%;
  width: 350px;
  height: 350px;
  object-fit: cover;

  animation: ${FloatAnimation} 10s ease-out infinite;

  @media (max-width: 500px) {
    width: 33rem;
    height: 33rem;
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

const SocialIconsList = styled.ul`
  display: flex;
  gap: 2rem;

  @media (max-width: 480px) {
    justify-content: center;
  }
`;

export { Main };
