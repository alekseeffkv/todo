import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import './button.less';

type ButtonProps = {
  children: ReactNode;
  buttonProps: ButtonHTMLAttributes<HTMLButtonElement>;
};

const Button: FC<ButtonProps> = ({ children, buttonProps }) => (
  <button className="button" {...buttonProps}>
    {children}
  </button>
);

export default Button;
