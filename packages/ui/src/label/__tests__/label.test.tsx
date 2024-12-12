import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import Label from '../label';
import { labelCVA } from '../label.cva';

const allProps = {
    children: "Label Text",
    placement: "left" as "left" | "right",
    required: true,
    htmlFor: "inputId",
    className: "custom-class"
};

describe("Label Component Tests", () => {
    // Check if the component renders without crashing
    test("renders with children text", () => {
        render(<Label {...allProps} />);
        expect(screen.queryByText("Label Text")).toBeInTheDocument();
    });

    // Check if the label is rendered with the 'required' star
    test("renders with required asterisk", () => {
        render(<Label {...allProps} />);
        expect(screen.queryByText("*")).toBeInTheDocument();
        expect(screen.queryByText("Label Text")).toBeInTheDocument();
    });

    // Check if the component renders with 'htmlFor' attribute
    test("renders with htmlFor attribute", () => {
        render(<Label {...allProps} />);
        const labelElement = screen.getByText("Label Text");
        expect(labelElement).toHaveAttribute("for", "inputId");
    });

    // Check if the component renders with correct class names based on variant
    test("renders with correct class names for 'placement' prop", () => {
        render(<Label {...allProps} />);
        const labelClasses = screen.getByText("Label Text").className;
        const expectedClasses = labelCVA({ placement: "left", className: allProps.className });
        expect(labelClasses).toMatch(expectedClasses);
    });

    // Check if the component renders with additional className passed via props
    test("renders with additional className", () => {
        render(<Label {...allProps} />);
        const labelElement = screen.getByText("Label Text");
        expect(labelElement).toHaveClass("custom-class");
    });

    // Check if the component renders with correct styles when variant prop is passed
    test("renders with correct variant styles", () => {
        render(<Label {...allProps} />);
        const labelClasses = screen.getByText("Label Text").className;
        const expectedClasses = labelCVA({ placement: allProps.placement, className: allProps.className });
        expect(labelClasses).toMatch(expectedClasses);
    });
});
