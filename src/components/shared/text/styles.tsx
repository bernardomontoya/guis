import styled from "styled-components";

type ValueProps = {
  single?: boolean;
};

export const Title = styled.h2`
  font-size: 1.6rem;
  font-weight: 500;
`;

export const Subtitle = styled.p`
  font-size: 0.9rem;
  font-weight: 300;
  margin-bottom: 0;
`;

export const Value = styled.p<ValueProps>`
  font-size: 1.25rem;
  font-weight: 500;
  margin: ${({ single }) => (single ? "1rem 1rem 0" : "revert")};
`;
