import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { data } from "./data";
import styled from "styled-components";

const Projects = () => {
  const [slidePerView, setSlidePerView] = useState(2);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 720) {
        setSlidePerView(1);
      } else {
        setSlidePerView(2);
      }
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Container
      id="projects"
      data-aos="fade-in"
      data-aos-easing="ease-in-out"
      data-aos-mirror="true"
    >
      <InfoContainer>
        <h1>Meus Projetos</h1>
        <p>
          Neste espaço, apresento uma seleção de projetos que desenvolvi,
          demonstrando proficiência na utilização de tecnologias de frontend.
        </p>
      </InfoContainer>

      <Swiper
        slidesPerView={slidePerView}
        navigation
      >
        {data.map((item) => (
          <SwiperSlide key={item.id}>
            <Image src={item.image} alt={item.name} />
            <StyledDiv>
              <ProjectName>{item.name}</ProjectName>
              <Description>{item.description}</Description>
              <LinkContainer>
                <a href={item.deploy}>Deploy</a>
                <a href={item.github}>Repositório</a>
              </LinkContainer>
            </StyledDiv>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};

const Container = styled.section`
  text-align: center;
  margin-bottom: 22rem;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  @media (max-width: 480px) {
    text-align: center;
    justify-content: center;
    align-items: center;
  }
`;

const LinkContainer = styled.div`
  display: flex;
  gap: 3rem;
  font-size: 1.6rem;
`;

const Description = styled.p`
  font-size: 1.6rem;
  color: #f7f7f7;
  width: 50rem;

  @media (max-width: 480px) {
    width: 35rem;
    text-align: center;
  }
`;

const Image = styled.img`
  border-radius: 2rem;

  @media (max-width: 480px) {
    border-radius: 1rem;
    width: 30rem;
  }
`;

const ProjectName = styled.h2`
  font-size: var(--small-font-size);
  color: var(--quaternary-color);
  margin: 1rem 0;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  color: var(--quaternary-color);
  margin: 5rem;

  h1 {
    font-size: var(--large-font-size);
    margin-bottom: 1rem;
    text-transform: uppercase;
  }

  p {
    font-size: 1.6rem;
    color: #f7f7f7;
    width: 60rem;
  }

  @media (max-width: 480px) {
    text-align: center;
    align-items: center;

    h1 {
      font-size: var(--medium-font-size);
    }
    p {
      width: 35rem;
    }
  }
`;

export { Projects };
