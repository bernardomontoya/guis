import { useState, useEffect } from "react";
import Button from "../../shared/button/button";

const Counter = () => {
  const [count, setCount] = useState<number>(0);
  useEffect(() => {
    console.log("rendered counter");
  });
  return (
    <div>
      <span>{count}</span>
      <Button
        onClick={() => {
          setCount((prevCount) => prevCount + 1);
        }}
        text="Count"
        type="button"
      />
    </div>
  );
};
export default Counter;
