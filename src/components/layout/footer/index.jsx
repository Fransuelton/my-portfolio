import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faGithub,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import styled from "styled-components";

const Footer = () => {
  return (
    <StyledFooter>
      <Container>
        <CopyrightText>
          Copyright © 2023 Fransuelton. Todos os direitos reservados.
        </CopyrightText>

        <nav>
          <StyledUl>
            <li>
              <a href="">
                <StyledIcon icon={faLinkedin} inverse />
              </a>
            </li>
            <li>
              <a href="">
                <StyledIcon icon={faGithub} inverse />
              </a>
            </li>
            <li>
              <a href="">
                <StyledIcon icon={faWhatsapp} inverse />
              </a>
            </li>
          </StyledUl>
        </nav>
      </Container>
    </StyledFooter>
  );
};

const StyledFooter = styled.footer`
  background-color: var(--secondary-color);
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  background-color: rgba(17, 25, 40, 0.75);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.125);
`;

const Container = styled.div`
  padding: 2rem 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 480px) {
    flex-direction: column-reverse;
    gap: 2rem;
  }
`;

const StyledUl = styled.ul`
  display: flex;
  gap: 2rem;
`;

const CopyrightText = styled.p`
  font-size: 1.6rem;
  color: var(--quaternary-color);
  @media (max-width: 480px) {
    font-size: 1rem;
    margin-bottom: 1rem;
  }
`;

const StyledIcon = styled(FontAwesomeIcon)`
  width: 3rem;
  height: 3rem;
  transition: 0.5s;

  &:hover {
    transform: scale(1.2);
  }
`;

export { Footer };
