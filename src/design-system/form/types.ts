export enum GridSpan {
  Full = 'full',
  Half = 'half',
}

export enum FieldType {
  Text = 'text',
  Email = 'email',
  Select = 'select',
  Textarea = 'textarea',
  Checkbox = 'checkbox',
}

export interface SelectOption {
  label: string;
  value: string;
}

export type FieldValue = string | boolean | undefined;

export interface ValidationRules {
  required?: boolean | string;
  email?: boolean | string;
  phoneDigits?: boolean | string;
  maxLength?: number | { value: number; message: string };
  custom?: (value: FieldValue, formValues: FormValues) => string | null | undefined;
}

export interface FieldConfig {
  name: string;
  type: FieldType;
  label: string;
  placeholder?: string;
  hint?: string;
  options?: SelectOption[];
  validations?: ValidationRules;
  visibleCondition?: (values: FormValues) => boolean;
  gridSpan?: GridSpan;
  defaultValue?: FieldValue;
}

export type FormValues = Record<string, FieldValue>;
export type FormErrors = Record<string, string>;
export type FormTouched = Record<string, boolean>;

export interface FormProps {
  config: FieldConfig[];
  values: FormValues;
  errors: FormErrors;
  touched: FormTouched;
  onChange: (name: string, value: FieldValue) => void;
  onBlur: (name: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  submitLabel?: string;
  isSubmitting?: boolean;
}
