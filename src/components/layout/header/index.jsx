import { styled } from "styled-components";

const Header = () => {
  return (
    <StyledHeader>
      <HeaderContainer>
        <a href="#">
          <Img src="/logo.svg" alt="Fransuelton's portfolio logo" />
        </a>

        <StyledNav>
          <StyledInput type="checkbox" id="menu-hamburguer" />
          <StyledLabel htmlFor="menu-hamburguer">
            <Menu>
              <span></span>
            </Menu>
          </StyledLabel>

          <StyledUl>
            <li>
              <StyledA href="#about">Sobre</StyledA>
            </li>
            <li>
              <StyledA href="#services">Serviços</StyledA>
            </li>
            <li>
              <StyledA href="#projects">Projetos</StyledA>
            </li>
            <li>
              <StyledA href="#contact">Contato</StyledA>
            </li>
            <li>
              <StyledLink href="https://api.whatsapp.com/send?phone=558499778995">
                Solicitar Orçamento
              </StyledLink>
            </li>
          </StyledUl>
        </StyledNav>
      </HeaderContainer>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 2;

  /* From https://css.glass */
  background: rgba(24, 24, 24, 0.48);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border-radius: 1.6rem;
`;

const HeaderContainer = styled.div`
  display: flex;
  padding: 1rem;
  justify-content: space-between;
  align-items: center;
`;

const Img = styled.img`
  width: 6rem;
  height: 6rem;
  transition: 0.3s;

  &:hover {
    opacity: 0.8;
  }
`;

const StyledInput = styled.input`
  display: none;

  &:checked ~ label span {
    transform: rotate(45deg);
  }

  &:checked ~ label span:before {
    transform: rotate(90deg);
    top: 0;
  }

  &:checked ~ label span:after {
    transform: rotate(90deg);
    bottom: 0;
  }

  @media (max-width: 850px) {
    &:checked ~ ul {
      display: block;
    }
  }
`;

const StyledNav = styled.nav`
  font-size: 2rem;
  font-weight: 300;
  transition: 0.3s;

  @media (max-width: 850px) {
    position: absolute;
    top: 2rem;
    right: 0;
    z-index: 2;
  }
`;

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
`;

const Menu = styled.div`
  display: none;
  width: 6rem;
  height: 6rem;
  align-self: flex-end;

  span {
    background-color: #fff;
    position: relative;
    display: block;
    width: 3rem;
    height: 0.2rem;
    top: 2.9rem;
    left: 1.5rem;
    transition: 0.5s ease-in-out;
  }

  span:before,
  span:after {
    background-color: #fff;
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    transition: 0.2s ease-in-out;
  }

  span:before {
    top: -1rem;
  }

  span:after {
    bottom: -1rem;
  }

  @media (max-width: 850px) {
    display: block;
  }
`;

const StyledUl = styled.ul`
  display: flex;
  gap: 3rem;

  @media (max-width: 850px) {
    display: none;
    width: 28rem;
    height: 100vh;
    padding: 2rem;
    background-color: #181818;
  }
`;

const StyledLink = styled.a`
  background-color: var(--tertiary-color);
  padding: 1rem 3rem;
  border-radius: 1rem;
  font-size: var(--small-font-size);
  transition: background-color 0.3s ease-in-out, border-color 0.3s ease-in-out;
  text-decoration: none;
  text-transform: capitalize;
  font-weight: 500;

  &:hover {
    background-color: #fff;
    color: var(--tertiary-color);
    border-color: #fff;
  }

  @media (max-width: 850px) {
    padding: 2rem;
    display: block;
    text-align: center;
  }
`;

const StyledA = styled.a`
  color: #fff;
  text-decoration: none;
  transition: background-size 0.3s ease-in-out, color 0.3s ease-in-out;
  text-transform: capitalize;

  &:hover {
    color: var(--tertiary-color);
  }

  @media (max-width: 850px) {
    text-align: center;
    margin-bottom: 3rem;
    display: block;
  }
`;

export { Header };
