import { useEffect } from "react";
import Counter from "./components/tasks/counter/counter";
import TemperatureConverter from "./components/tasks/temperatureConverter/temperatureConverter";
import FlightBooker from "./components/tasks/flightBooker/flightBooker";

function App() {
  useEffect(() => {
    console.log("rendered app");
  });
  return (
    <div>
      <Counter />
      <TemperatureConverter />
      <FlightBooker />
    </div>
  );
}

export default App;
