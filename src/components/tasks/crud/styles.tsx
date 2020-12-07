import styled from "styled-components";

export const List = styled.div`
  display: flex;
  flex-direction: column;
  width: 185px;
  span {
    padding: 0.6rem;
    background: #efefef;
    width: 100%;
    border-radius: 4px;
    font-size: 0.9rem;
    margin-bottom: 0.4rem;
    cursor: pointer;
    transition: 0.2s color ease;
    &:hover {
      background: #dcdcdc;
    }
  }
`;
