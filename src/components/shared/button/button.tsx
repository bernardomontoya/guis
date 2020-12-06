interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  text: string;
  type: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Button = ({ onClick, text, type, disabled }: ButtonProps) => {
  return (
    <button onClick={onClick} type={type} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
