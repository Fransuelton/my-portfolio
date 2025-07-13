import { styled, keyframes } from "styled-components";

const Main = () => {
  return (
    <StyledSection>
      <StyledContainer>
        <InfoContainer>
          <Title>Fransuelton Francisco</Title>
          <VacantTitle>Desenvolvedor Fullstack</VacantTitle>
        </InfoContainer>
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
  height: 100vh;

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
  text-align: center;
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
  margin: 0 auto;
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

export { Main };
