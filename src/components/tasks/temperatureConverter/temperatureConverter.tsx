import { useState, useEffect } from "react";
import Input from "../../shared/input/input";
import { Title, Subtitle, Value } from "../../shared/text/styles";
import { Container, Wrapper } from "../../shared/container/styles";

const TemperatureConverter = () => {
  useEffect(() => {
    console.log("rendered TemperatureConverter");
  });
  const [celsius, setCelcius] = useState<number | string>("");
  const [fahrenheit, setFahrenheit] = useState<number | string>("");

  const convertTemperature = (
    e: React.ChangeEvent<HTMLInputElement>,
    to: string
  ) => {
    const value = e.target.value;
    const number = Number(value);
    if (to === "celsius") {
      if (value) {
        const calculatedCelsius = number * (9 / 5) + 32;
        setCelcius(Number(calculatedCelsius.toFixed(2)));
      }
      setFahrenheit(value ? number : value);
    } else {
      if (value) {
        const calculatedFarenheit = (number - 32) * (5 / 9);
        setFahrenheit(Number(calculatedFarenheit.toFixed(2)));
      }
      setCelcius(value ? number : value);
    }
  };

  return (
    <Container>
      <Title>Temperature converter</Title>
      <Subtitle>
        Type a celsius or a fahrenheit temperature and check the conversion in
        the opposite field
      </Subtitle>
      <Wrapper direction="row" top="medium">
        <Input
          id="celsius-temperature"
          label="Celsius"
          type="number"
          value={celsius}
          onChange={(e) => {
            convertTemperature(e, "fahrenheit");
          }}
        />
        <Value single>=</Value>
        <Input
          id="fahrenheit-temperature"
          label="Fahrenheit"
          type="number"
          value={fahrenheit}
          onChange={(e) => {
            convertTemperature(e, "celsius");
          }}
        />
      </Wrapper>
    </Container>
  );
};

export default TemperatureConverter;
