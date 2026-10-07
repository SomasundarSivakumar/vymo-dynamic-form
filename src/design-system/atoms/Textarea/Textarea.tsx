import React from 'react';
import styles from './Textarea.module.css';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
  showCharCount?: boolean;
  maxLength?: number;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ hasError = false, showCharCount = true, maxLength, value, className = '', ...props }, ref) => {
    const classNames = [
      styles.textarea,
      hasError ? styles.hasError : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const currentLength = typeof value === 'string' ? value.length : 0;
    const isNearLimit = maxLength ? currentLength > maxLength * 0.85 : false;
    const isExceeded = maxLength ? currentLength > maxLength : false;

    return (
      <div className={styles.container}>
        <textarea
          ref={ref}
          className={classNames}
          aria-invalid={hasError}
          maxLength={maxLength}
          value={value ?? ''}
          {...props}
        />
        {showCharCount && maxLength && (
          <div className={styles.footer}>
            <span
              className={`${styles.charCounter} ${
                isExceeded
                  ? styles.charLimitExceeded
                  : isNearLimit
                  ? styles.charLimitNear
                  : ''
              }`}
            >
              {currentLength} / {maxLength}
            </span>
          </div>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
