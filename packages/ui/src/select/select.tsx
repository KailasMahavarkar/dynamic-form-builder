import React from "react";
import selectCVA from "./select.cva";
import type { SelectProps } from "./select.types";
import { makeDTI } from "../utils";

const Select: React.FC<SelectProps> = ({
    children,
    options = [],
    size = "md",
    intent = "primary",
    rounded = "md",
    hasFullWidth = false,
    disabled = false,
    dataTestId = "",
    ...props
}) => {
    const dti = makeDTI("select", dataTestId);

    return (
        <select
            className={selectCVA({
                disabled,
                size: size,
                intent,
                rounded,
                hasFullWidth,
            })}
            disabled={disabled}
            data-test-id={dti()}
            {...props}
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
            {children}
        </select>
    );
};

export default Select;
