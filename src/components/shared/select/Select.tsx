type Option = {
  value: string;
  text: string;
};

interface SelectProps {
  options: Option[];
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select = ({ value, options, name, onChange }: SelectProps) => {
  return (
    <select name={name} value={value} onChange={onChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.text}
        </option>
      ))}
    </select>
  );
};

export default Select;
