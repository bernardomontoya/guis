interface InputProps {
  type: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
  id?: string;
}

const Input = ({
  value,
  type,
  onChange,
  placeholder,
  label,
  id,
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
      />
    </div>
  );
};

export default Input;
