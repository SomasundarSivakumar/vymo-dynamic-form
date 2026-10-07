import React from 'react';
import styles from './DynamicForm.module.css';
import type { FormProps, FieldConfig, FieldValue } from './types';
import { FieldType, GridSpan } from './types';
import { Field } from '../molecules/Field/Field';
import { TextInput, TextInputType, Select, Textarea, Checkbox, Button } from '../atoms';

interface FieldItemProps {
  field: FieldConfig;
  value: FieldValue;
  error?: string;
  isTouched: boolean;
  disabled: boolean;
  onChange: (name: string, value: FieldValue) => void;
  onBlur: (name: string) => void;
}

function FieldItem({ field, value, error, isTouched, disabled, onChange, onBlur }: FieldItemProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    const val = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    onChange(field.name, val);
  }

  function handleBlur() {
    onBlur(field.name);
  }

  const hasError = !!(isTouched && error);

  const commonProps = {
    id: field.name,
    name: field.name,
    value: (value as string) ?? '',
    onChange: handleChange,
    onBlur: handleBlur,
    hasError,
    disabled,
  };

  let control: React.ReactNode = null;

  switch (field.type) {
    case FieldType.Text:
    case FieldType.Email:
      control = (
        <TextInput
          {...commonProps}
          type={field.type === FieldType.Email ? TextInputType.Email : TextInputType.Text}
          placeholder={field.placeholder}
        />
      );
      break;
    case FieldType.Select:
      control = (
        <Select
          {...commonProps}
          options={field.options || []}
          placeholder={field.placeholder}
        />
      );
      break;
    case FieldType.Textarea:
      control = (
        <Textarea
          {...commonProps}
          placeholder={field.placeholder}
          maxLength={typeof field.validations?.maxLength === 'number' ? field.validations.maxLength : field.validations?.maxLength?.value}
        />
      );
      break;
    case FieldType.Checkbox:
      control = (
        <Checkbox
          {...commonProps}
          checked={!!value}
          label={field.label}
        />
      );
      break;
  }

  const isRequired = !!field.validations?.required;
  const spanClass = field.gridSpan === GridSpan.Full ? styles.spanFull : styles.spanHalf;

  return (
    <div className={spanClass}>
      <Field
        id={field.name}
        label={field.type === FieldType.Checkbox ? undefined : field.label}
        hideLabel={field.type === FieldType.Checkbox}
        isRequired={isRequired && field.type !== FieldType.Checkbox}
        hint={field.hint}
        error={isTouched && error ? error : undefined}
      >
        {control}
      </Field>
    </div>
  );
}

export function DynamicForm({
  config,
  values,
  errors,
  touched,
  onChange,
  onBlur,
  onSubmit,
  submitLabel = 'Submit',
  isSubmitting = false,
}: FormProps) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    onSubmit(e);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.grid}>
        {config.filter(function isVisible(field) {
          return !field.visibleCondition || field.visibleCondition(values);
        }).map(function renderField(field) {
          return (
            <FieldItem
              key={field.name}
              field={field}
              value={values[field.name]}
              error={errors[field.name]}
              isTouched={!!touched[field.name]}
              disabled={isSubmitting}
              onChange={onChange}
              onBlur={onBlur}
            />
          );
        })}
      </div>
      <div className={styles.actions}>
        <Button type="submit" isLoading={isSubmitting}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}
