import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import Radio from '../radio';
import { vi } from 'vitest';

// Define allProps with some default values
const allProps = {
    options: [
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
        { label: 'Option 3', value: '3' }
    ],
    selectedValues: ['1'],
    onChange: () => { },
    multiSelect: false,
    className: "custom-radio",
    size: "md" as "md",
    disabled: false,
    dataTestId: 'radio-test',
};

describe("Radio Component Tests", () => {
    // Check if the component renders without crashing
    test("renders with options", () => {
        render(<Radio {...allProps} />);
        expect(screen.queryByText("Option 1")).toBeInTheDocument();
        expect(screen.queryByText("Option 2")).toBeInTheDocument();
        expect(screen.queryByText("Option 3")).toBeInTheDocument();
    });

    // Check if the selected value is rendered correctly
    test("renders with selected value", () => {
        render(<Radio {...allProps} />);
        const radioOption1 = screen.getByLabelText("Option 1") as HTMLInputElement;
        expect(radioOption1.checked).toBe(true);
    });

    // Check if the onChange handler is called when an option is selected
    test("calls onChange when an option is clicked", () => {
        const mockFn = vi.fn()
        render(
            <Radio
                {...allProps}
                onChange={mockFn}
            />
        );

        fireEvent.click(screen.getByLabelText("Option 2"));
        expect(mockFn).toHaveBeenCalledWith(['2']);
        expect(mockFn).toHaveBeenCalledTimes(1);

        // negative test
        expect(mockFn).not.toHaveBeenCalledWith(['1']);
    });

    // Check if multiSelect is working as expected (when multiSelect is true)
    test("multiSelect allows multiple values", () => {
        const multiSelectProps = {
            ...allProps,
            multiSelect: true,
            selectedValues: ['1', '2']
        };

        render(<Radio {...multiSelectProps} />);
        const checkboxes = screen.getAllByRole('checkbox')

        expect(checkboxes[0]).toBeChecked();
        expect(checkboxes[1]).toBeChecked();
        expect(checkboxes[2]).not.toBeChecked();
    });

    // Check if the disabled state is correctly applied
    test("renders disabled option", () => {
        const disabledProps = {
            ...allProps,
            disabled: true
        };

        render(<Radio {...disabledProps} />);
        const radioOption1 = screen.getByLabelText("Option 1") as HTMLInputElement;
        const radioOption2 = screen.getByLabelText("Option 2") as HTMLInputElement;

        expect(radioOption1).toBeDisabled();
        expect(radioOption2).toBeDisabled();
    });


    // Check if the correct input type (radio or checkbox) is rendered based on multiSelect
    test("renders radio or checkbox based on multiSelect", () => {
        render(<Radio {...allProps} />);
        const radioInput = screen.getByLabelText("Option 1") as HTMLInputElement;

        // fire and check if the input type is radio
        fireEvent.click(radioInput);

        expect(radioInput.type).toBe("radio");

    });

    // Check if radio button remains unchecked when no selected value matches
    test("renders unchecked radio when no selected value matches", () => {
        const unselectedProps = {
            ...allProps,
            selectedValues: [] // No selected values
        };

        render(<Radio {...unselectedProps} />);
        const radioOption1 = screen.getByLabelText("Option 1") as HTMLInputElement;
        expect(radioOption1.checked).toBe(false);
    });
});
