import { ButtonHTMLAttributes } from 'react';

export const Button = (restProps: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <button {...restProps} className='button'></button>;
};
