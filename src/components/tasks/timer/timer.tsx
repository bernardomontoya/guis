import { useState, useEffect } from "react";
import Meter from "../../shared/meter/meter";
import Input from "../../shared/input/input";
import { Title, Subtitle, Value } from "../../shared/text/styles";
import { Container, Wrapper } from "../../shared/container/styles";

const Timer = () => {
  useEffect(() => {
    console.log("rendered Timer");
  });

  const initialDuration = 20;

  const [time, setTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(initialDuration);

  useEffect(() => {
    const setTick = () => {
      if (time <= duration) {
        setTime((olderTime) => olderTime + 0.1);
      } else {
        clearInterval(interval);
      }
    };
    const interval = setInterval(setTick, 100);
    return () => clearInterval(interval);
  }, [time, duration]);

  return (
    <Container>
      <Title>Timer</Title>
      <Subtitle>
        Move the slider to either add or remove time to the total duration of
        the timer
      </Subtitle>
      <Wrapper direction="column" top="medium">
        <Meter
          label="Elapsed time"
          id="elapsed-time-meter"
          min={0}
          max={duration}
          value={time >= duration ? duration : time}
        />
        <Value>{time >= duration ? duration : time.toFixed(2)}s</Value>
        <Input
          value={duration}
          max={initialDuration * 2}
          min={0}
          type="range"
          onChange={(e) => {
            const value = Number(e.target.value);
            setDuration(value);
          }}
        />
      </Wrapper>
    </Container>
  );
};

export default Timer;
