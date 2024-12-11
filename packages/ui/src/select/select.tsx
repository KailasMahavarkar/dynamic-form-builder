import React, { SelectHTMLAttributes } from 'react'

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
    options?: { value: string; label: string }[]
}

const Select: React.FC<SelectProps> = ({
    children,
    options,
    value,
    defaultValue,
    ...props
}) => {
    return (
        <select {...props}>
            {options?.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
            {children}
        </select>
    )
}

export default Select