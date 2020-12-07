import { Input as InputStyled, Label } from "./styles";
import { Wrapper } from "../../shared/container/styles";

interface InputProps {
  type: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMouseUp?: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
  placeholder?: string;
  label?: string;
  id?: string;
  disabled?: boolean;
  error?: boolean;
  min?: number;
  max?: number;
}

const Input = ({
  value,
  type,
  onChange,
  onMouseUp,
  placeholder,
  label,
  id,
  disabled,
  error,
  max,
  min,
}: InputProps) => {
  return (
    <Wrapper direction="column" align="start">
      {label ? <Label htmlFor={id}>{label}</Label> : null}
      <InputStyled
        id={id}
        value={value}
        type={type}
        onChange={onChange}
        onMouseUp={onMouseUp}
        placeholder={placeholder}
        disabled={disabled}
        max={max}
        min={min}
      />
      {error ? <span>Error!</span> : null}
    </Wrapper>
  );
};

export default Input;
