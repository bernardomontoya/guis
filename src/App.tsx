import { useEffect } from "react";
import Counter from "./components/tasks/counter/counter";
import TemperatureConverter from "./components/tasks/temperatureConverter/temperatureConverter";
import FlightBooker from "./components/tasks/flightBooker/flightBooker";
import Timer from "./components/tasks/timer/timer";
import CRUD from "./components/tasks/crud/crud";
import CircleDrawer from "./components/tasks/circleDrawer/circleDrawer";
import Cells from "./components/tasks/cells/cells";

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
      <CircleDrawer />
      <Cells />
    </div>
  );
}

export default App;
