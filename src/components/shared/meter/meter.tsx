import { Wrapper } from "../../shared/container/styles";
import { Meter as MeterStyled } from "./styles";
interface MeterProps {
  label?: string;
  id?: string;
  min: number;
  max: number;
  value: number;
}

const Meter = ({ label, id, min, max, value }: MeterProps) => {
  return (
    <Wrapper direction="column">
      {label ? <label htmlFor={id}>{label}</label> : null}
      <MeterStyled id={id} min={min} max={max} value={value} />
    </Wrapper>
  );
};

export default Meter;
