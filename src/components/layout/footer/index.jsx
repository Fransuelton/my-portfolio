import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const Footer = () => {
  return (
    <footer>
      <Container>
        <CopyrightText>
          © 2023-2025 Fransuelton. <span>Todos os direitos reservados.</span>
        </CopyrightText>

        <a href="#">
          <FontAwesomeIcon icon={faArrowUp} />
        </a>
      </Container>
    </footer>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0;

  a {
    font-size: 2.4rem;
    padding: 1rem 1.6rem;
    background-color: #202024;
    border-radius: 0.8rem;
  }

  span {
    font-weight: 500;
    display: block;
  }
`;

const CopyrightText = styled.p`
  font-size: 1.6rem;
  color: #ffffff;
`;

export { Footer };
