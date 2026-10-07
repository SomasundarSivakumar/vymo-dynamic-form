import { FieldType, GridSpan, type FieldConfig } from '../../design-system';

export const leadFormConfig: FieldConfig[] = [
  {
    name: 'fullName',
    type: FieldType.Text,
    label: 'Full name',
    placeholder: 'Jane Doe',
    validations: {
      required: 'Full name is required',
    },
    gridSpan: GridSpan.Half,
  },
  {
    name: 'email',
    type: FieldType.Email,
    label: 'Email address',
    placeholder: 'jane@example.com',
    validations: {
      required: 'Email is required',
      email: 'Please enter a valid email address',
    },
    gridSpan: GridSpan.Half,
  },
  {
    name: 'leadType',
    type: FieldType.Select,
    label: 'Lead type',
    options: [
      { label: 'Individual', value: 'Individual' },
      { label: 'Company', value: 'Company' },
    ],
    validations: {
      required: 'Please select a lead type',
    },
    gridSpan: GridSpan.Half,
  },
  {
    name: 'companyName',
    type: FieldType.Text,
    label: 'Company name',
    placeholder: 'Acme Corp',
    visibleCondition: (values) => values['leadType'] === 'Company',
    validations: {
      required: 'Company name is required for company leads',
    },
    gridSpan: GridSpan.Half,
  },
  {
    name: 'phone',
    type: FieldType.Text,
    label: 'Phone number',
    placeholder: '1234567890',
    hint: 'Enter exactly 10 digits without spaces or dashes',
    validations: {
      required: 'Phone number is required',
      phoneDigits: 'Phone number must be exactly 10 digits',
    },
    gridSpan: GridSpan.Half,
  },
  {
    name: 'notes',
    type: FieldType.Textarea,
    label: 'Additional notes',
    placeholder: 'Tell us more about your needs...',
    validations: {
      maxLength: {
        value: 200,
        message: 'Notes cannot exceed 200 characters',
      },
    },
    gridSpan: GridSpan.Full,
  },
  {
    name: 'consent',
    type: FieldType.Checkbox,
    label: 'I agree to the privacy policy and terms of service',
    validations: {
      required: 'You must agree to the terms',
    },
    gridSpan: GridSpan.Full,
  },
];
