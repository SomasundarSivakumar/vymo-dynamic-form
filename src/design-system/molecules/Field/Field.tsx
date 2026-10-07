import React from 'react';
import { AlertCircle } from 'lucide-react';
import styles from './Field.module.css';

export interface FieldProps {
  id: string;
  label?: string;
  isRequired?: boolean;
  hint?: string;
  error?: string;
  hideLabel?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Field: React.FC<FieldProps> = ({
  id,
  label,
  isRequired = false,
  hint,
  error,
  hideLabel = false,
  children,
  className = '',
}) => {
  return (
    <div className={`${styles.field} ${className}`}>
      {label && !hideLabel && (
        <div className={styles.labelWrapper}>
          <label htmlFor={id} className={styles.label}>
            {label}
            {isRequired && <span className={styles.requiredAsterisk} aria-hidden="true">*</span>}
          </label>
        </div>
      )}
      <div className={styles.controlWrapper}>{children}</div>
      {hint && !error && <p className={styles.hint}>{hint}</p>}
      {error && (
        <div className={styles.error} id={`${id}-error`} role="alert">
          <AlertCircle size={14} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
