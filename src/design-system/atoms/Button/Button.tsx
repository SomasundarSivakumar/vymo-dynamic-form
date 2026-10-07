import React from 'react';
import styles from './Button.module.css';

export enum ButtonVariant {
  Primary = 'primary',
  Secondary = 'secondary',
  Outline = 'outline',
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  isLoading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = ButtonVariant.Primary,
  fullWidth = false,
  isLoading = false,
  icon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const classNames = [
    styles.button,
    styles[variant],
    fullWidth ? styles.fullWidth : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={classNames}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className={styles.spinner} aria-hidden="true" />
      ) : icon ? (
        <span className={styles.icon}>{icon}</span>
      ) : null}
      <span>{children}</span>
    </button>
  );
};
