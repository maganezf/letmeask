import { ButtonHTMLAttributes } from 'react';
import './styles.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isOutlined?: boolean;
}

export const Button = ({ isOutlined = false, ...restProps }: ButtonProps) => {
  return (
    <button {...restProps} className={`button ${isOutlined && 'outlined'}`} />
  );
};
