import React, { useState } from 'react'
import Select from "@repo/ui/select";
import Input from "@repo/ui/input";
import type { IFormSchema, FieldConfig } from '@repo/schema-validator';

const DynamicForm = ({
    config,
    onSubmit
}: {
    config: IFormSchema,
    onSubmit: (data: Record<string, string>) => void
}) => {
    const [formState, setFormState] = useState<Record<string, string>>({});

    const handleInputChange = (key: string, value: string) => {
        setFormState((prevData) => ({ ...prevData, [key]: value }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formState);
    }

    const renderSingleConfig = (element: FieldConfig) => {
        switch (element.type) {
            case 'text':
                return (
                    <Input
                        intent="danger"
                        value={formState[element.key]}
                        onChange={(e) => handleInputChange(element.key, e.target.value)}
                    />
                )
            case 'select':
                return (
                    <Select
                        options={element.children}
                        value={formState[element.key]}
                        onChange={(e) => handleInputChange(element.key, e.target.value)}
                    />
                )
            default:
                return null
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                {
                    config.fields.map((currentConfig: FieldConfig) => {
                        return renderSingleConfig(currentConfig);
                    })
                }
                <button type='submit'>
                    submit form
                </button>
            </form>
        </>
    )
}



export default DynamicForm