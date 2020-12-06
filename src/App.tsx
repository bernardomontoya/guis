import { useEffect } from "react";
import Counter from "./components/tasks/counter/counter";
import TemperatureConverter from "./components/tasks/temperatureConverter/temperatureConverter";
import FlightBooker from "./components/tasks/flightBooker/flightBooker";
import Timer from "./components/tasks/timer/timer";
import CRUD from "./components/tasks/crud/crud";

function App() {
  useEffect(() => {
    console.log("rendered app");
  });
  return (
    <div>
      <Counter />
      <TemperatureConverter />
      <FlightBooker />
      <Timer />
      <CRUD />
    </div>
  );
}

export default App;
