import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Input from "@repo/ui/input"; // Adjust the import path based on your actual repo structure

const meta: Meta<typeof Input> = {
    component: Input,
    argTypes: {
        intent: {
            control: { type: "select" },
            options: ["primary", "secondary", "warning", "danger"],
        },
        placeholder: {
            control: { type: "text" },
        },
        size: {
            control: { type: "select" },
            options: ["sm", "md", "lg", "xl"],
        },
        type: {
            control: { type: "select" },
            options: ["text", "password", "email", "number"],
        },
        defaultValue: {
            control: { type: "text" },
        },
        disabled: {
            control: { type: "boolean" },
        },
        rounded: {
            control: { type: "select" },
            options: ["sm", "md", "lg", "xl", "full"],
        },
        hasFullWidth: {
            control: { type: "boolean" },
        }
    },
};

export default meta;

type Story = StoryObj<typeof Input>;

const DefaultStoryExample = (props: any) => {
    const [value, setValue] = useState("");
    return (
        <Input
            onChange={(e) => setValue(e.target.value)}
            value={value}
            {...props}
        />
    );
}

export const DefaultStory: Story = {
    render: (props) => (
        <DefaultStoryExample {...props} />
    ),
    args: {},
};


