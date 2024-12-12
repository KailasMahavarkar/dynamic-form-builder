import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import React from "react";
import Input from "../input";
import inputCVA from "../input.cva";
import { twMerge } from "tailwind-merge";


const allProps = {
    intent: "primary" as "primary",
    size: "md" as "md",
    disabled: false,
    rounded: "md" as "md",
    hasFullWidth: false,
    type: "text" as "text",
    placeholder: "Enter text",
    value: "",
    dataTestId: "test",
};



describe("Input Component Tests", () => {
    // Check if the component renders without crashing
    test("renders with default props", () => {
        render(<Input placeholder="Enter text" />);

        const inputElement = screen.getByPlaceholderText("Enter text");
        expect(inputElement).toBeInTheDocument();
        expect(inputElement).not.toBeDisabled();
    });

    // Check if the component renders with all props
    test("renders with all props", () => {
        render(<Input {...allProps} value="Test value" />);

        const inputElement = screen.getByPlaceholderText(allProps.placeholder);
        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toHaveValue("Test value");
        expect(inputElement).not.toBeDisabled();
    });

    // Check if the component applies the correct class names
    test("applies the correct classes based on props", () => {
        const { container } = render(<Input {...allProps} />);
        const mergedClasses = twMerge(inputCVA(allProps));
        const inputElement = container.querySelector("input");
        expect(inputElement).toHaveClass(...mergedClasses.split(" "));
    });

    // Check if the component renders disabled state
    test("renders disabled state", () => {
        render(<Input {...allProps} disabled />);

        const inputElement = screen.getByPlaceholderText(allProps.placeholder);
        expect(inputElement).toBeDisabled();
    });

    // Check if the component renders with full width
    test("renders with full width", () => {
        render(<Input {...allProps} hasFullWidth />);

        const inputElement = screen.getByPlaceholderText(allProps.placeholder);
        expect(inputElement).toHaveClass("w-full");
    });

    // Check if the component renders with intent
    test("renders with intent", () => {
        render(<Input {...allProps} intent="secondary" />);

        const inputElement = screen.getByPlaceholderText(allProps.placeholder);
        const mergedClasses = twMerge(inputCVA({ ...allProps, intent: "secondary" }));
        expect(inputElement).toHaveClass(...mergedClasses.split(" "));
    });

    // Check if the component renders with size
    test("renders with size", () => {
        render(<Input {...allProps} size="lg" />);

        const inputElement = screen.getByPlaceholderText(allProps.placeholder);
        const mergedClasses = twMerge(inputCVA({ ...allProps, size: "lg" }));
        expect(inputElement).toHaveClass(...mergedClasses.split(" "));
    });

    // Check if the component renders with rounded corners
    test("renders with rounded corners", () => {
        render(<Input {...allProps} rounded="lg" />);

        const inputElement = screen.getByPlaceholderText(allProps.placeholder);
        const mergedClasses = twMerge(inputCVA({ ...allProps, rounded: "lg" }));
        expect(inputElement).toHaveClass(...mergedClasses.split(" "));
    });

    // Check if the component renders with a custom dataTestId
    test("renders with dataTestId", () => {
        render(<Input {...allProps} />);

        const inputElement = screen.getByTestId("input-test");
        expect(inputElement).toBeInTheDocument();
    });
});