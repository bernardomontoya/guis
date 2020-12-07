import { Button as StyledButton } from "./styles";

interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  text: string;
  type: "button" | "submit" | "reset";
  disabled?: boolean;
  right?: string;
}

const Button = ({ onClick, text, type, disabled, right }: ButtonProps) => {
  return (
    <StyledButton
      onClick={onClick}
      type={type}
      disabled={disabled}
      right={right}
    >
      {text}
    </StyledButton>
  );
};

export default Button;
