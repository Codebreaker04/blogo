import type React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    'bg-white text-black hover:bg-gray-50 border border-gray-300  rounded-md shadow-sm',
  secondary: 'bg-gray-900 text-white hover:bg-gray-800 shadow-sm rounded-md',
  danger: 'bg-red-600 text-white hover:bg-red-700 rounded-md, shadow-sm',
  ghost:
    'bg-transparent text-gray-900 border border-gray-300 hover:bg-gray-50 rounded-md shadow-sm',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm rounded-md',
  md: 'px-4 py-2 text-base rounded-lg',
  lg: 'px-5 py-3 text-lg rounded-xl',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: ButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center font-medium cursor-pointer focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors';

  const classes = cn(
    baseClasses,
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    className
  );

  return (
    <button className={classes} {...rest}>
      {children ?? 'Button'}
    </button>
  );
}

