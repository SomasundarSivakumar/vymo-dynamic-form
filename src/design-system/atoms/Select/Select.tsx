import React from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './Select.module.css';
import type { SelectOption } from '../../form/types';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  hasError?: boolean;
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, hasError = false, placeholder = 'Select an option', className = '', value, ...props }, ref) => {
    const classNames = [
      styles.select,
      hasError ? styles.hasError : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={styles.container}>
        <select
          ref={ref}
          className={classNames}
          aria-invalid={hasError}
          value={value ?? ''}
          {...props}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className={styles.arrowWrapper}>
          <ChevronDown size={16} />
        </span>
      </div>
    );
  }
);

Select.displayName = 'Select';
