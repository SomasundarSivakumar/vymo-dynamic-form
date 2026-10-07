import React from 'react';
import styles from './TextInput.module.css';

export enum TextInputType {
  Text = 'text',
  Email = 'email',
  Tel = 'tel',
  Password = 'password',
}

export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
  type?: TextInputType;
  suffixIcon?: React.ReactNode;
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ hasError = false, type = TextInputType.Text, suffixIcon, className = '', ...props }, ref) => {
    const classNames = [
      styles.input,
      hasError ? styles.hasError : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={styles.container}>
        <input
          ref={ref}
          type={type}
          className={classNames}
          aria-invalid={hasError}
          {...props}
        />
        {suffixIcon && <span className={styles.iconWrapper}>{suffixIcon}</span>}
      </div>
    );
  }
);

TextInput.displayName = 'TextInput';
