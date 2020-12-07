import styled from "styled-components";

type InputProps = {
  type?: string;
};

export const Input = styled.input<InputProps>`
  padding: ${({ type }) => (type !== "range" ? "0.5rem 0.6rem" : "0")};
  padding: ;
  font-size: 1rem;
  font-weight: 500;
  border: 1px solid #d4d4d4;
  border-radius: 4px;
  width: 185px;
`;

export const Label = styled.label`
  font-size: 0.8rem;
  text-align: left;
  margin-bottom: 0.4rem;
  color: #5d5d5d;
`;
