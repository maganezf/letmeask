import { ButtonHTMLAttributes } from 'react';

export const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <button {...props} className="button"></button>;
};
