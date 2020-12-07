import styled from "styled-components";

type WrapperProps = {
  direction?: string;
  justify?: string;
  align?: string;
  top?: string;
  bottom?: string;
  right?: string;
};

export const Container = styled.div`
  padding: 2rem;
  background: white;
  border-radius: 4px;
  box-shadow: 0 2px 11px 5px #00000008;
  margin-bottom: 2.4rem;
`;

export const Wrapper = styled.div<WrapperProps>`
  display: flex;
  margin-top: ${({ top }) => (top === "medium" ? "2rem" : "0")};
  margin-bottom: ${({ bottom }) => (bottom === "small" ? "1.2rem" : "0")};
  margin-right: ${({ right }) => (right === "small" ? "1.2rem" : "0")};
  flex-direction: ${({ direction }) =>
    direction === "column" ? "column" : "row"};
  align-items: ${({ align }) => (align === "start" ? "flex-start" : "center")};
  justify-content: ${({ justify }) =>
    justify === "start" ? "flex-start" : "center"}; ;
`;
