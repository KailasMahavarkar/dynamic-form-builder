type TextFieldType = {
    id: string;
    type: 'text';
    label: string;
    key: string;
    pattern?: string;
    validation?: ValidatorConfig;
};

type DropDownFieldType = {
    id: string;
    type: 'select';
    label: string;
    key: string;
    children: { value: string; label: string }[];
    validation?: ValidatorConfig;
};

type RadioFieldType = {
    id: string;
    type: 'radio';
    label: string;
    key: string;
    children: { value: string; label: string }[];
    multiple: boolean;
    validation?: ValidatorConfig;
};

export type FieldConfig = TextFieldType | DropDownFieldType | RadioFieldType;

export type ValidatorConfig = {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    pattern?: string;
};

export interface IFormSchema {
    title: string;
    fields: FieldConfig[];
}
