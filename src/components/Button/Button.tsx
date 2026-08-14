import "./Button.css";

type ButtonProps = {
  text: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

function Button({
  text,
  variant = "primary",
  onClick,
  type = "button",
}: ButtonProps) {
  return (
    <button type={type} className={`btn ${variant}`} onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
