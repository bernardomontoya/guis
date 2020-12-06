interface InputProps {
  type: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
}

const Input = ({ value, type, onChange, placeholder, label }: InputProps) => {
  return (
    <div>
      {label ? <label>{label}</label> : null}
      <input
        value={value}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
