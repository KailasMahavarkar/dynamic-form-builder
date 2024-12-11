import { IFormSchema } from './types/type';
import {
    isLengthValid,
    patternValidator,
} from './utils/index';

function validateSchema(schema: IFormSchema, data: Record<string, any>) {
    const errors: { message: string; field: string; }[] = [];

    schema.fields.forEach((field) => {
        const value = data[field.key];
        const { validation } = field;

        if (!validation) return;

        // Required validation
        if (validation.required && (value === undefined || value === "")) {
            errors.push({
                message: `${field.label} is required.`,
                field: field.key,
            });
        }

        // Text field length validation
        if (field.type === "text") {
            if (
                validation.minLength &&
                !isLengthValid(value, validation.minLength, validation.maxLength ?? Infinity)
            ) {
                errors.push({
                    message: `${field.label} must be between ${validation.minLength} and ${validation.maxLength} characters.`,
                    field: field.key,
                });
            }
        }

        // Select field validation
        if (field.type === "select") {
            const validOptions = field.children?.map((child) => child.value);
            if (value && !validOptions?.includes(value)) {
                errors.push({
                    message: `${field.label} is invalid.`,
                    field: field.key,
                });
            }
        }

        // Pattern validation (for text fields with regex)
        if (validation.pattern && !patternValidator(value, validation.pattern)) {
            errors.push({
                message: `${field.label} is invalid.`,
                field: field.key,
            });
        }
    });

    return errors;
}

export { validateSchema }
export type { IFormSchema, FieldConfig, ValidatorConfig } from './types/type'