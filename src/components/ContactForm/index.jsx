import { useForm, ValidationError } from "@formspree/react";
import { styled } from "styled-components";

const ContactForm = () => {
  const [state, handleSubmit] = useForm("xleylddd");
  if (state.succeeded) {
    return <SucessMessage>Sua Mensagem foi enviada com sucesso!</SucessMessage>;
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <StyledInput id="name" type="text" name="name" placeholder="Nome *" />

      <StyledInput
        id="email"
        type="email"
        name="email"
        placeholder="E-mail *"
      />

      <ValidationError prefix="Email" field="email" errors={state.errors} />

      <StyledTextArea id="message" name="message" placeholder="Mensagem *" />

      <ValidationError prefix="Message" field="message" errors={state.errors} />

      <StyledButton type="submit" disabled={state.submitting}>
        Enviar Mensagem
      </StyledButton>

    </StyledForm>
  );
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 45rem;
  gap: 1.5rem;

  @media (max-width: 480px) {
    width: 35rem;
  }
`;

const StyledInput = styled.input`
  height: 5rem;
  padding: 1rem;
  border-radius: 0.8rem;
  outline: none;
  background-color: var(--primary-color);
  border: 1px solid #fff;
  color: var(--quaternary-color);
  font-size: 1.7rem;

  &::placeholder {
    color: #fff;
    font-size: 1.7rem;
  }
`;

const StyledTextArea = styled.textarea`
  height: 14rem;
  padding: 1rem;
  border-radius: 0.8rem;
  border: none;
  outline: none;
  background-color: var(--primary-color);
  border: 1px solid #fff;
  resize: none;
  color: var(--quaternary-color);
  font-size: 1.7rem;

  &::placeholder {
    color: #fff;
    font-size: 1.7rem;
  }
`;

const StyledButton = styled.button`
  align-self: flex-end;
  cursor: pointer;
  width: 20rem;
  height: 5rem;
  padding: 1rem;
  border-radius: 0.8rem;
  background-color: var(--primary-color);
  border: 1px solid #fff;
  font-size: 1.6rem;
  color: var(--quaternary-color);
  transition: 0.5s;
  font-weight: 700;

  &:hover {
    background-color: var(--tertiary-color);
    border-color: var(--tertiary-color);
  }

  @media (max-width: 480px) {
    align-self: center;
  }
`;

const SucessMessage = styled.p`
  font-size: 2rem;
  color: var(--quaternary-color);
  text-align: center;
  width: 45rem;

  @media (max-width: 480px) {
    font-size: 1.6rem;
  }
`;

export { ContactForm };
