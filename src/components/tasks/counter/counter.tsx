import { useState, useEffect } from "react";
import Button from "../../shared/button/button";
import { Title, Subtitle, Value } from "../../shared/text/styles";
import { Container, Wrapper } from "../../shared/container/styles";

const Counter = () => {
  const [count, setCount] = useState<number>(0);
  useEffect(() => {
    console.log("rendered counter");
  });
  return (
    <Container>
      <Title>Counter</Title>
      <Subtitle>Hit the count button to start counting!</Subtitle>
      <Wrapper direction="column">
        <Value>{count}</Value>
        <Button
          onClick={() => {
            setCount((prevCount) => prevCount + 1);
          }}
          text="Count"
          type="button"
        />
      </Wrapper>
    </Container>
  );
};
export default Counter;
