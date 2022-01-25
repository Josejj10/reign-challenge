import { ButtonHTMLAttributes } from "react";
import "./Button.css";

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

const Button = ({ onClick, text }: IButtonProps) => {
  return (
    <button className="Button" onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
