import styled from "styled-components";

type ButtonProps = {
  disabled?: boolean;
  right?: string;
};

export const Button = styled.button<ButtonProps>`
  border-radius: 4px;
  background: blue;
  background: #630fff;
  cursor: pointer;
  border: none;
  color: white;
  padding: 0.8rem 1rem;
  font-size: 0.9rem;
  font-weight: 600;
  transition: 0.2s all ease;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  margin-right: ${({ right }) => (right === "small" ? "1rem" : "0")};
  &:hover {
    background: #4c00da;
  }
`;
