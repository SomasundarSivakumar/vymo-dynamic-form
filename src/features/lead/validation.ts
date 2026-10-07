import type { FieldConfig, FormValues, FormErrors } from '../../design-system';

export const validateForm = (config: FieldConfig[], values: FormValues): FormErrors => {
  const errors: FormErrors = {};

  config.forEach((field) => {
    if (field.visibleCondition && !field.visibleCondition(values)) {
      return;
    }

    const value = values[field.name];
    const rules = field.validations;

    if (!rules) return;

    if (rules.required) {
      const isMissing =
        value === undefined ||
        value === null ||
        (typeof value === 'string' && value.trim() === '') ||
        (field.type === 'checkbox' && value !== true);

      if (isMissing) {
        errors[field.name] = typeof rules.required === 'string' ? rules.required : 'This field is required';
        return;
      }
    }

    if (rules.email && value && typeof value === 'string') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errors[field.name] = typeof rules.email === 'string' ? rules.email : 'Invalid email address';
        return;
      }
    }

    if (rules.phoneDigits && value && typeof value === 'string') {
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(value)) {
        errors[field.name] = typeof rules.phoneDigits === 'string' ? rules.phoneDigits : 'Must be 10 digits';
        return;
      }
    }

    if (rules.maxLength && value) {
      const maxLengthValue = typeof rules.maxLength === 'number' ? rules.maxLength : rules.maxLength.value;
      const maxLengthMessage =
        typeof rules.maxLength === 'object' ? rules.maxLength.message : `Maximum length is ${maxLengthValue}`;

      if (typeof value === 'string' && value.length > maxLengthValue) {
        errors[field.name] = maxLengthMessage;
        return;
      }
    }

    if (rules.custom) {
      const customError = rules.custom(value, values);
      if (customError) {
        errors[field.name] = customError;
        return;
      }
    }
  });

  return errors;
};
