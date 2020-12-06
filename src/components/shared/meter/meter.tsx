interface MeterProps {
  label?: string;
  id?: string;
  min: number;
  max: number;
  value: number;
}

const Meter = ({ label, id, min, max, value }: MeterProps) => {
  return (
    <div>
      {label ? <label htmlFor={id}>{label}</label> : null}
      <meter id={id} min={min} max={max} value={value} />
    </div>
  );
};

export default Meter;
