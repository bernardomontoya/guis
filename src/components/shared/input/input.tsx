interface InputProps {
  type: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
  id?: string;
  disabled?: boolean;
  error?: boolean;
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
      />
      {error ? <span>Error!</span> : null}
    </div>
  );
};

export default Input;
