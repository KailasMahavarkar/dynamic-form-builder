import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CodeBlock from "../codeblock";
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { borderCVA } from '../codeblock.cva';

const allProps = {
    status: "valid",
    text: '{"key": "value"}',
    onChange: vi.fn(),
    dataTestId: 'json-editor',
}

describe('CodeBlock Component Tests', () => {
    const mockOnChange = vi.fn();

    // Test if the component renders correctly
    test('renders correctly with given props', () => {
        render(
            <CodeBlock
                status="valid"
                text='{"key": "value"}'
                onChange={mockOnChange}
            />
        );

        // Check if the text content is rendered
        expect(screen.getByDisplayValue('{"key": "value"}')).toBeInTheDocument();
    });

    // Test if the component renders with different statuses
    test('applies correct styles based on status prop', () => {
        const dti = `codeblock-${allProps.dataTestId}`;
        const block = render(
            <CodeBlock
                status="valid"
                text='{"key": "value"}'
                onChange={mockOnChange}
                dataTestId={allProps.dataTestId}
            />
        );


        const appliedClasses = borderCVA({
            status: "valid",
            className: "rounded-t-lg",
        })


        expect(block.getByTestId(dti).className === appliedClasses).toBeTruthy();
    });

    // Test if onChange is called correctly
    test('calls onChange handler when text is changed', () => {
        render(
            <CodeBlock
                status="maybe"
                text='{"key": "value"}'
                onChange={mockOnChange}
            />
        );
        const codeEditor = screen.getByRole('textbox');
        fireEvent.change(codeEditor, { target: { value: '{"key": "new value"}' } });
        expect(mockOnChange).toHaveBeenCalledTimes(1);
    });

    // Test if the placeholder is correctly rendered
    test('displays placeholder text when text is empty', () => {
        render(
            <CodeBlock
                status="invalid"
                text=""
                onChange={mockOnChange}
            />
        );

        const codeEditor = screen.getByRole('textbox');
        expect(codeEditor).toHaveAttribute('placeholder', 'Enter your JSON here');
    });
});
