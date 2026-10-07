import React from 'react';
import { Check } from 'lucide-react';
import styles from './Checkbox.module.css';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
  hasError?: boolean;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, hasError = false, checked = false, disabled = false, className = '', onChange, ...props }, ref) => {
    return (
      <label
        className={`${styles.wrapper} ${disabled ? styles.disabled : ''} ${
          hasError ? styles.hasError : ''
        } ${className}`}
      >
        <input
          ref={ref}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          className={styles.hiddenInput}
          aria-invalid={hasError}
          onChange={onChange}
          {...props}
        />
        <span className={styles.box} aria-hidden="true">
          {checked && <Check size={14} strokeWidth={3} />}
        </span>
        {label && <span className={styles.labelText}>{label}</span>}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';
