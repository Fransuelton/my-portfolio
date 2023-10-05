import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowDown } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import PropTypes from "prop-types";

const Button = ({ label }) => {
  return (
    <StyledButton>
      <StyledIcon icon={faFileArrowDown} />
      {label}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  cursor: pointer;
  width: 20rem;
  height: 6rem;
  padding: 1.6rem 3.2rem;
  margin-top: 2rem;
  border-radius: 8px;
  background-color: var(--secondary-color);
  font-size: 1.5rem;
  color: var(--quaternary-color);
  font-weight: 700;
  transition: 0.5s ease-in-out;
  transition-property: box-shadow;
  border: 1px solid var(--tertiary-color);

  &:hover {
    box-shadow: 0 0 5px var(--tertiary-color), 0 0 25px var(--tertiary-color),
      0 0 50px var(--tertiary-color), 0 0 100px var(--tertiary-color);
    background-color: var(--tertiary-color);
  }
`;

const StyledIcon = styled(FontAwesomeIcon)`
  margin-right: 1rem;
`;

Button.propTypes = {
  label: PropTypes.string.isRequired,
};

export { Button };
