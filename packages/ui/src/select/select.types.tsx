import { SelectHTMLAttributes } from "react";

export type SelectSizeType = "sm" | "md" | "lg" | "xl";
export type SelectIntentType = "primary" | "secondary" | "warning" | "danger";
export type SelectRoundedType = "sm" | "md" | "lg" | "xl" | "full";


export type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> & {
    options?: { value: string; label: string }[];
    size?: SelectSizeType;
    intent?: SelectIntentType;
    rounded?: SelectRoundedType;
    hasFullWidth?: boolean;
    dataTestId?: string;
};
