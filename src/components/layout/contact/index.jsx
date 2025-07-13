import { ContactForm } from "./ContactForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faGithub,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { styled } from "styled-components";
import { useState } from "react";

const Contact = () => {
  const [copied, setCopied] = useState(false);

  const textToCopy = "contato@fransuelton.dev";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Error copying text: ", err);
    }
  };

  return (
    <StyledSection
      id="contact"
      data-aos="fade-in"
      data-aos-easing="ease-in-out"
      data-aos-mirror="true"
    >
      <InfoWrapper>
        <StyledH1>Vamos Conversar?</StyledH1>
        <Description>
          Estou sempre aberto a novas oportunidades, colaborações e desafios
          interessantes. Se você tem um projeto em mente, quer discutir uma
          ideia ou simplesmente trocar experiências sobre desenvolvimento, Me
          envie um email{" "}
          <span>
            {copied ? "Email copiado!         " : "contato@fransuelton.dev "}
            <FontAwesomeIcon
              icon={faCopy}
              onClick={handleCopy}
              style={{ cursor: "pointer", color: "#ffffff", fontSize: "2rem" }}
              title="Copiar email"
            />
          </span>
        </Description>
        <nav>
          <StyledUl>
            <li>
              <a
                href="https://www.linkedin.com/in/fransuelton/"
                aria-label="Visite meu perfil no LinkedIn"
              >
                <StyledIcon icon={faLinkedin} inverse />
              </a>
            </li>
            <li>
              <a
                href="https://github.com/Fransuelton"
                aria-label="Visite meu perfil no GitHub"
              >
                <StyledIcon icon={faGithub} inverse />
              </a>
            </li>
            <li>
              <a
                href="https://api.whatsapp.com/send?phone=558499778995"
                aria-label="Visite meu perfil no WhatsApp"
              >
                <StyledIcon icon={faWhatsapp} inverse />
              </a>
            </li>
          </StyledUl>
        </nav>
      </InfoWrapper>

      <ContactForm />
    </StyledSection>
  );
};

const StyledSection = styled.section`
  display: flex;
  justify-content: space-between;
  background-color: #202024;
  border-radius: 1.6rem;
  padding: 2rem;
  gap: 4rem;
  margin-bottom: 20rem;

  color: var(--quaternary-color);

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;

const StyledUl = styled.ul`
  display: flex;
  gap: 2rem;
`;

const StyledIcon = styled(FontAwesomeIcon)`
  width: 3rem;
  height: 3rem;
  transition: 0.3s;
  background-color: #181818;
  padding: 0.8rem;
  border-radius: 0.8rem;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #008cff;
  }
`;

const StyledH1 = styled.h1`
  font-size: 3.2rem;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  gap: 4rem;

  @media (max-width: 480px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: 100%;
  }
`;

const Description = styled.p`
  font-size: 1.6rem;
  line-height: 2.5rem;

  span {
    border-radius: 0.8rem;
    transition: 0.3s;
    color: #008cff;
  }

  @media (max-width: 480px) {
    width: 35rem;
    text-align: center;
    font-size: 1.6rem;
    margin-bottom: 2rem;
  }
`;

export { Contact };
