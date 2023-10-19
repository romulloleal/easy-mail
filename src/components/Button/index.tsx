import { ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: 'danger' | 'info' | 'confirm' | 'warning' | 'primary';
  variant?: 'contained' | 'outlined' | 'text';
  size?: 'small' | 'medium' | 'large';
};

export const Button = ({
  variant = 'outlined',
  color = 'primary',
  size = 'medium',
  className,
  disabled,
  ...rest
}: ButtonProps) => {
  return (
    <button
      {...rest}
      disabled={disabled}
      className={twMerge(
        `rounded-md
        uppercase
        text-${color}
        ${size === 'small' && 'h-7 text-sm'}
        ${size === 'medium' && 'h-9'}
        ${size === 'large' && 'h-11 text-lg'}
        ${variant !== 'text' && 'px-4'}
        ${variant === 'contained' && `bg-${color} text-white`}
        ${variant === 'outlined' && `border border-${color}`}
        ${disabled && 'bg-secondary text-gray-400'}`,
        className,
      )}
    ></button>
  );
};
