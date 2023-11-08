import { ContactForm } from "../../ContactForm";
import { styled } from "styled-components";

const Contact = () => {
  return (
    <StyledSection
      id="contact"
      data-aos="fade-in"
      data-aos-easing="ease-in-out"
      data-aos-mirror="true"
    >
      <StyledDiv>
        <StyledH1>Me envie uma Mensagem!</StyledH1>
        <Description>
          Estou aberto a oportunidades e parcerias emocionantes. Seja para
          colaborar em projetos, discutir ideias ou apenas trocar experiências,
          estou à disposição. Vamos iniciar uma conversa e explorar as
          possibilidades juntos.
        </Description>
      </StyledDiv>
      <ContactForm />
    </StyledSection>
  );
};

const StyledSection = styled.section`
  display: flex;
  justify-content: space-evenly;
  margin: 0 4rem 17rem;
  color: var(--quaternary-color);

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin: 0 0 17rem;
  }
`;

const StyledH1 = styled.h1`
  font-size: 3.2rem;
  margin-bottom: 2rem;
`;

const StyledDiv = styled.div`
  @media (max-width: 480px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const Description = styled.p`
  font-size: 2rem;
  width: 60rem;

  @media (max-width: 480px) {
    width: 35rem;
    text-align: center;
    font-size: 1.6rem;
    margin-bottom: 2rem;
  }
`;

export { Contact };
