import { styled, keyframes } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
              <a href="https://www.linkedin.com/in/fransuelton/" aria-label="Visite meu perfil no LinkedIn">
                <StyledIcon
                  icon={faLinkedin}
                  hovercolor="rgb(4%, 40%, 76%)"
                  inverse
                />
              </a>
            </li>
            <li>
              <a href="https://github.com/Fransuelton" aria-label="Visite meu perfil no GitHub">
                <StyledIcon
                  icon={faGithub}
                  hovercolor="rgb(36, 41, 46)"
                  inverse
                />
              </a>
            </li>
            <li>
              <a href="https://api.whatsapp.com/send?phone=558499778995" aria-label="Visite meu perfil no WhatsApp">
                <StyledIcon
                  icon={faWhatsapp}
                  hovercolor="rgb(0%, 90%, 46%)"
                  inverse
                />
              </a>
            </li>
          </SocialIconsList>
        </InfoContainer>

        <Img
          src="https://media.licdn.com/dms/image/D4D03AQEk2Bf43_zSiw/profile-displayphoto-shrink_800_800/0/1701164167273?e=1713398400&v=beta&t=DYbA_kgcORSFOKjj1XW4nt4Kb5z0bRDBj6_QZLoaACk"
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
  border-radius: 30%;

  transition: 0.5s ease-in-out;

  &:hover {
    background-color: ${(props) => props.hovercolor};

    border-color: ${(props) => props.hovercolor};
    border-radius: 20%;

    box-shadow: 0 0 25px ${(props) => props.hovercolor};

    box-shadow: 0 0 5px ${(props) => props.hovercolor},
      0 0 25px ${(props) => props.hovercolor},
      0 0 50px ${(props) => props.hovercolor},
      0 0 100px ${(props) => props.hovercolor};
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
