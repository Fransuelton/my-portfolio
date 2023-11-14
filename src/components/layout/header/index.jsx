import { styled } from "styled-components";

const Header = () => {
  return (
    <StyledHeader>
      <HeaderContainer>
        <a href="#">
          <Img src="/logo.svg" alt="Logo estilizada da letra F" />
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
              <StyledA href="#about">Sobre mim</StyledA>
            </li>
            <li>
              <StyledA href="#skills">Habilidades</StyledA>
            </li>
            <li>
              <StyledA href="#projects">Meus projetos</StyledA>
            </li>
            <li>
              <StyledLink href="#contact">Entre em Contato</StyledLink>
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
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  background-color: rgba(17, 25, 40, 0.75);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.125);
`;

const HeaderContainer = styled.div`
  display: flex;
  padding: 1rem 4rem;
  justify-content: space-between;
  align-items: center;
`;

const Img = styled.img`
  width: 6rem;
  height: 6rem;
  transition: 0.3s;
  margin-right: 2rem;

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
  font-size: var(--small-font-size);
  font-weight: 300;
  transition: 0.3s;

  @media (max-width: 850px) {
    position: absolute;
    top: 1rem;
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
    height: 32rem;
    padding: 2rem;
    background-color: #121823;
    border-radius: 12px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.125);
  }
`;

const StyledLink = styled.a`
  background-color: var(--tertiary-color);
  padding: 1rem 3rem;
  border-radius: 1rem;
  font-size: var(--small-font-size);
  transition: 0.5s;
  transition-property: box-shadow;
  box-shadow: 0 0 25px rgb(0, 140, 255);
  text-decoration: none;
  text-transform: capitalize;

  &:hover {
    box-shadow: 0 0 5px rgb(0, 140, 255), 0 0 25px rgb(0, 140, 255),
      0 0 50px rgb(0, 140, 255), 0 0 100px rgb(0, 140, 255);
  }

  @media (max-width: 850px) {
    padding: 2rem;
    display: block;
    text-align: center;
  }
`;

const StyledA = styled.a`
  background: linear-gradient(currentColor 0 0) bottom left/
    var(--underline-width, 0%) 0.1em no-repeat;
  color: #fff;
  display: inline-block;
  text-decoration: none;
  transition: background-size 0.5s ease-in-out, color 0.5s ease-in-out;
  text-transform: capitalize;

  &:hover {
    --underline-width: 100%;
    color: var(--tertiary-color);
  }

  @media (max-width: 850px) {
    text-align: center;
    margin-bottom: 3rem;
    display: block;
  }
`;

export { Header };
