import { useEffect } from "react";
import Counter from "./components/tasks/counter/counter";
import TemperatureConverter from "./components/tasks/temperatureConverter/temperatureConverter";

function App() {
  useEffect(() => {
    console.log("rendered app");
  });
  return (
    <div>
      <Counter />
      <TemperatureConverter />
    </div>
  );
}

export default App;
