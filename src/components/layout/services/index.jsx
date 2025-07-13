import { Monitor, Server, Wrench } from "lucide-react";

const Services = () => {
  return (
    <StyledSection
      id="services"
      data-aos="fade-in"
      data-aos-easing="ease-in-out"
      data-aos-mirror="true"
    >
      <StyledHeader>
        <Title>Serviços</Title>
        <p>Soluções sob medida para negócios digitais.</p>
      </StyledHeader>

      <ServicesContainer>
        <ServiceCard>
          <Monitor color="white" size={48} />
          <h3>Desenvolvimento Web</h3>
          <p>
            Criação de sites, landing pages e aplicações web responsivas, com
            foco em desempenho, acessibilidade e experiência do usuário.
          </p>
        </ServiceCard>
        <ServiceCard>
          <Server color="white" size={48} />
          <h3>APIs RESTful e Sistemas</h3>
          <p>
            Desenvolvimento de APIs robustas, seguras e escaláveis utilizando
            Node.js, MySQL e boas práticas de arquitetura back-end.
          </p>
        </ServiceCard>
        <ServiceCard>
          <Wrench color="white" size={48} />
          <h3>Manutenção e melhorias</h3>
          <p>
            Refatoração de código, correção de bugs e implementação de melhorias
            em sistemas existentes para garantir estabilidade e performance
            contínua.
          </p>
        </ServiceCard>
      </ServicesContainer>
    </StyledSection>
  );
};

import styled from "styled-components";

const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: flex-start;
  color: #ffffff;
  margin-bottom: 3rem;
  width: 100%;

  p {
    font-size: 1.6rem;
  }
`;

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--quaternary-color);
  margin-bottom: 20rem;
  @media (max-width: 500px) {
    text-align: center;
  }
`;

const Title = styled.h1`
  font-size: 3.6rem;
  font-weight: 700;
  text-transform: capitalize;
  color: #ffffff;
  margin-bottom: 1rem;
`;

const ServicesContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
  width: 100%;
`;

const ServiceCard = styled.div`
  border-radius: 1.6rem;
  padding: 2rem;
  width: 30rem;
  height: 36rem;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out, border-color 0.3s ease-in-out;
  border: 0.1rem solid rgba(255, 255, 255, 0.125);

  h3 {
    font-size: 2.4rem;
    color: #ffffff;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.6rem;
    color: var(--quaternary-color);
  }

  &:hover {
    border: 0.1rem solid #008cff;
    transition: transform 0.3s ease-in-out, border-color 0.3s ease-in-out;
    transform: translateY(-0.5rem);
  }
`;

export default Services;
