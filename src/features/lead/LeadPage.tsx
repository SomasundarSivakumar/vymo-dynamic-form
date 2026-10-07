import React, { useState, useCallback } from 'react';
import { CheckCircle } from 'lucide-react';
import styles from './LeadPage.module.css';
import { leadFormConfig } from './config';
import { validateForm } from './validation';
import type { FormValues, FormErrors, FormTouched, FieldValue } from '../../design-system';
import { DynamicForm, Button, ButtonVariant } from '../../design-system';

export const LeadPage: React.FC = () => {
  const [values, setValues] = useState<FormValues>({
    leadType: 'Individual',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<FormTouched>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormValues | null>(null);

  const handleChange = useCallback((name: string, value: FieldValue) => {
    setValues((prev) => {
      const nextValues = { ...prev, [name]: value };
      if (name === 'leadType' && value === 'Individual') {
        nextValues.companyName = '';
      }

      setErrors(validateForm(leadFormConfig, nextValues));
      return nextValues;
    });
  }, []);

  const handleBlur = useCallback((name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(() => validateForm(leadFormConfig, values));
  }, [values]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const allTouched: FormTouched = {};
    leadFormConfig.forEach((field) => {
      if (!field.visibleCondition || field.visibleCondition(values)) {
        allTouched[field.name] = true;
      }
    });
    setTouched(allTouched);

    const validationErrors = validateForm(leadFormConfig, values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const cleanData: FormValues = {};
    leadFormConfig.forEach((field) => {
      if (!field.visibleCondition || field.visibleCondition(values)) {
        cleanData[field.name] = values[field.name];
      }
    });

    console.log('Lead Captured:', cleanData);
    setSubmittedData(cleanData);
    setIsSubmitting(false);
  };

  const handleReset = () => {
    setValues({ leadType: 'Individual' });
    setErrors({});
    setTouched({});
    setSubmittedData(null);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>Contact Sales</h1>
          <p className={styles.description}>
            We'd love to hear from you. Please fill out the form below and we'll be in touch.
          </p>
        </div>

        <div className={styles.content}>
          {submittedData ? (
            <div className={styles.successPanel}>
              <div className={styles.successIcon}>
                <CheckCircle size={32} />
              </div>
              <h2 className={styles.successTitle}>Thank you!</h2>
              <p className={styles.description} style={{ marginBottom: '24px' }}>
                Your lead has been successfully captured.
              </p>
              <pre className={styles.jsonData}>
                {JSON.stringify(submittedData, null, 2)}
              </pre>
              <Button onClick={handleReset} variant={ButtonVariant.Secondary}>
                Submit Another
              </Button>
            </div>
          ) : (
            <DynamicForm
              config={leadFormConfig}
              values={values}
              errors={errors}
              touched={touched}
              onChange={handleChange}
              onBlur={handleBlur}
              onSubmit={handleSubmit}
              submitLabel="Send Message"
              isSubmitting={isSubmitting}
            />
          )}
        </div>
      </div>
    </div>
  );
};
