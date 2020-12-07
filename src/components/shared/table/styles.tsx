import styled from "styled-components";

export const Header = styled.div`
  background: #ccc;
  color: #282828;
  padding: 4px;
  text-align: center;
`;

export const Input = styled.input`
  padding: 0 4px;
  :not(:focus) {
    text-align: right;
  }
  :focus {
    border: 1px solid #1581ba;
    background-color: #e7f2f8;
  }
`;
