import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import Select from '../select';
import { SelectIntentType, SelectProps, SelectRoundedType, SelectSizeType } from '../select.types';
import { vi } from 'vitest';
import selectCVA from '../select.cva';
import { twMerge } from 'tailwind-merge';

const allProps = {
    options: [
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
        { label: 'Option 3', value: '3' }
    ],
    intent: 'primary' as SelectIntentType,
    rounded: 'md' as SelectRoundedType,
    hasFullWidth: false,
    disabled: false,
    value: '1',
    onChange: () => { },
    dataTestId: 'test',
};

describe("Select Component Tests", () => {
    // Check if the component renders without crashing
    test("renders with options", () => {
        render(<Select {...allProps} />);
        expect(screen.queryByText("Option 1")).toBeInTheDocument();
        expect(screen.queryByText("Option 2")).toBeInTheDocument();
        expect(screen.queryByText("Option 3")).toBeInTheDocument();
    });

    // Check if the component renders with the selected value
    test("renders with selected value", () => {
        render(<Select {...allProps} />);
        const selectElement = screen.getByRole('combobox') as HTMLSelectElement;
        expect(selectElement.value).toBe('1');
    });


    // Check if the disabled state is correctly applied
    test("renders disabled select", () => {
        const disabledProps = {
            ...allProps,
            disabled: true
        };

        render(<Select {...disabledProps} />);
        const selectElement = screen.getByRole('combobox') as HTMLSelectElement;
        expect(selectElement).toBeDisabled();
    });

    // Check if the className is applied correctly
    test("applies custom className", () => {
        const customProps = {
            ...allProps,
            className: 'custom-select-class'
        };

        render(<Select {...customProps} />);
        const selectElement = screen.getByRole('combobox');
        expect(selectElement).toHaveClass('custom-select-class');
    });

    // Check if the component renders with different sizes
    test("renders with different sizes", () => {
        const sizeProps = {
            ...allProps,
            size: 'lg' as SelectSizeType
        };

        render(<Select {...sizeProps} />);

        const selectClasses = screen.getByTestId(`select-${allProps.dataTestId}`).className.split(' ').sort();

        const cvaClasses = twMerge(
            selectCVA({
                ...allProps,
                size: 'lg'
            })
        )

        // check if every cva class is present in the select element
        // meaning that the size is correctly applied
        cvaClasses.split(' ').forEach((cvaClass) => {
            expect(selectClasses).toContain(cvaClass);
        });

    });

    // Check if the component renders with full width
    test("renders with full width", () => {
        const fullWidthProps = {
            ...allProps,
            hasFullWidth: true
        };

        render(<Select {...fullWidthProps} />);
        const selectElement = screen.getByRole('combobox');
        expect(selectElement).toHaveClass('w-full');
    });

    // Check if the component renders with the correct intent
    test("renders with correct intent", () => {

        render(
            <Select
                {...allProps}
                intent="warning"
            />
        );

        const selectClasses = screen.getByTestId(`select-${allProps.dataTestId}`).className.split(' ').sort();

        const cvaClasses = twMerge(
            selectCVA({
                ...allProps,
                intent: 'warning'
            })
        )

        // check if every cva class is present in the select element
        // meaning that the intent is correctly applied
        cvaClasses.split(' ').forEach((cvaClass) => {
            expect(selectClasses).toContain(cvaClass);
        });
    });
});
