import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const ContactForm = () => {
  return (
    <StyledForm>
      <StyledInput id="name" type="text" name="name" placeholder="Nome" />

      <StyledInput id="email" type="email" name="email" placeholder="E-mail" />

      <StyledTextArea id="message" name="message" placeholder="Sua Mensagem" />

      <StyledButton type="submit">
        Enviar Mensagem
        <FontAwesomeIcon icon={faArrowRight} />
      </StyledButton>
    </StyledForm>
  );
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1.6rem;
`;

const StyledInput = styled.input`
  height: 5rem;
  width: 100%;
  padding: 1.2rem 1.6rem;
  border-radius: 0.8rem;
  outline: none;
  background-color: #181818;
  border: none;
  color: var(--quaternary-color);
  font-size: 1.6rem;

  &::placeholder {
    color: #fff;
    font-size: 1.6rem;
  }
`;

const StyledTextArea = styled.textarea`
  height: 14rem;
  padding: 1.2rem 1.6rem;
  border-radius: 0.8rem;
  border: none;
  outline: none;
  background-color: var(--primary-color);
  border: none;
  resize: none;
  color: var(--quaternary-color);
  font-size: 1.6rem;

  &::placeholder {
    color: #fff;
    font-size: 1.6rem;
  }
`;

const StyledButton = styled.button`
  align-self: flex-start;
  cursor: pointer;
  width: 20rem;
  height: 5rem;
  padding: 1rem;
  border-radius: 0.8rem;
  background-color: var(--tertiary-color);
  border: none;
  font-size: 1.6rem;
  color: var(--quaternary-color);
  transition: 0.5s;
  font-weight: 500;
  margin-top: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;

  &:hover {
    background-color: #fff;
    color: var(--tertiary-color);
    border-color: #fff;
  }

  @media (max-width: 480px) {
    align-self: center;
  }
`;

export { ContactForm };
