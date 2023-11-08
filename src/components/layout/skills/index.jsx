import { data } from "./data";
import { styled, keyframes } from "styled-components";

const Skills = () => {
  return (
    <Section
      id="skills"
      data-aos="fade-in"
      data-aos-easing="ease-in-out"
      data-aos-mirror="true"
    >
      <Title>Minhas Habilidades</Title>

      <SkillsList>
        {data.map((item) => (
          <StyledLi key={item.id}>
            <Img
              src={item.image}
              alt={item.name}
              title={item.name}
              color={item.color}
            />
            <StyledP>{item.name}</StyledP>
          </StyledLi>
        ))}
      </SkillsList>
    </Section>
  );
};

const Section = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 480px) {
    text-align: center;
  }
`;

const StyledP = styled.p`
  font-size: var(--small-font-size);
  color: var(--quaternary-color);
  text-align: center;
  margin-top: 1rem;
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

const SkillsList = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8rem;
  width: 90rem;
  flex-wrap: wrap;
  list-style: none;
  margin-bottom: 19.6rem;
  animation: ${FloatAnimation} 5s ease infinite;
  @media (max-width: 480px) {
    width: 35rem;
  }
`;

const StyledLi = styled.li``;

const Img = styled.img`
  width: 100px;
  height: 100px;

  transition: 0.5s;

  border-radius: 22px;
  &:hover {
    transform: scale(1.1);
    background-color: ${(props) => props.color};

    border-color: ${(props) => props.color};

    box-shadow: 0 0 25px ${(props) => props.color};

    box-shadow: 0 0 5px ${(props) => props.color},
      0 0 25px ${(props) => props.color}, 0 0 50px ${(props) => props.color},
      0 0 100px ${(props) => props.color};
  }
`;

const Title = styled.h1`
  font-size: var(--large-font-size);
  text-transform: uppercase;
  margin-bottom: 12.6rem;
  color: var(--quaternary-color);
`;

export { Skills };
