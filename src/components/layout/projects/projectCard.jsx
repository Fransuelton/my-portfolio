import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const ProjectCard = ({
  name,
  description,
  image,
  deployUrl,
  repositoryUrl,
  techIcons = [],
  buttonText,
}) => {
  return (
    <CardContainer>
      <img src={image} alt={name} title={name} />
      <InfoContainer>
        <div>
          <ProjectName>{name}</ProjectName>
          <StackIcons>
            {techIcons.map((Icon, index) => (
              <Icon key={index} />
            ))}
          </StackIcons>
        </div>
        <ProjectDescription>{description}</ProjectDescription>
      </InfoContainer>
      <LinkContainer>
        <a href={repositoryUrl}>
          <FontAwesomeIcon icon={faGithub} /> Repositório
        </a>
        <a href={deployUrl}>
          <FontAwesomeIcon icon={faGlobe} />
          {buttonText}
        </a>
      </LinkContainer>
    </CardContainer>
  );
};

ProjectCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  deployUrl: PropTypes.string,
  repositoryUrl: PropTypes.string,
  techIcons: PropTypes.arrayOf(PropTypes.elementType),
  buttonText: PropTypes.string,
};

ProjectCard.defaultProps = {
  deployUrl: "#",
  repositoryUrl: "#",
};

const StackIcons = styled.div`
  color: #ffffff;
  font-size: 2.4rem;
  display: flex;
  gap: 1rem;

  svg {
    transition: transform 0.2s;
  }

  svg:hover {
    transform: scale(1.1);
  }
`;

const CardContainer = styled.article`
  background-color: #202024;
  padding: 2rem;
  border-radius: 1.6rem;
  width: 39rem;
  height: 50rem;
  display: flex;
  flex-direction: column;

  img {
    width: 100%;
    height: 20rem;
    object-fit: cover;
    border-radius: 1.2rem;
    transition: transform 0.3s ease-in-out;

    &:hover {
      transform: scale(1.05);
    }
  }

  @media (max-width: 480px) {
    width: 100%;
    height: auto;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin-top: 1.5rem;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const ProjectName = styled.h2`
  font-size: 2.4rem;
  font-weight: 500;
  color: var(--quaternary-color);
`;

const ProjectDescription = styled.p`
  font-size: 1.6rem;
  color: #ffffff;
  margin-bottom: 1.5rem;
`;

const LinkContainer = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.6rem;
  align-items: flex-end;
  margin-top: auto;

  a {
    font-weight: 500;
    text-decoration: none;
    padding: 1.6rem 2.4rem;
    border-radius: 0.8rem;
    color: #ffffff;
    display: flex;
    align-items: center;
    gap: 0.8rem;
    background-color: #181818;
    transition: 0.3s ease-in-out;
  }

  a:last-child {
    background-color: var(--tertiary-color);
    border-color: var(--tertiary-color);
  }
`;

export { ProjectCard };
