interface InputProps {
  type: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
  placeholder,
  label,
  id,
  disabled,
  error,
  max,
  min,
}: InputProps) => {
  return (
    <div>
      {label ? <label htmlFor={id}>{label}</label> : null}
      <input
        id={id}
        value={value}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        max={max}
        min={min}
      />
      {error ? <span>Error!</span> : null}
    </div>
  );
};

export default Input;
