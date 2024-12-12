import DynamicFormBuilder from "./components/DynamicFormBuilder";
import { useState } from 'react';

// @ts-expect-error - This is a custom css file
import "@repo/ui/styles"
import FormContext from './context/form.context';
import { IFormSchema } from '@repo/schema-validator';
import SchemaDocs from './docs/schema.docs';

const config: IFormSchema = {
    title: "Dynamic Form Example",
    fields: [
        {
            id: "username",
            type: "text",
            label: "Username",
            key: "username",
            validation: {
                required: true,
                minLength: 3,
                maxLength: 20
            },
        },
        {
            id: "gender",
            type: "select",
            label: "Gender",
            key: "gender",
            children: [
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
            ],
            validation: {
                required: true
            },
        },
        {
            id: 'occupation',
            type: 'radio',
            key: 'occupation',
            label: 'Occupation',
            children: [
                { label: 'Employed', value: 'employed' },
                { label: 'Student', value: 'student' },
                { label: 'Business', value: 'business' }
            ],
            multiple: true
        }
    ],
}


function App() {
    const [formState, setFormState] = useState<Record<string, string>>({});
    const [schemaText, setSchemaText] = useState<string>(JSON.stringify(config, null, 4));
    const [parsedSchema, setParsedSchema] = useState<IFormSchema>(config);

    return (
        <FormContext.Provider
            value={{
                formState,
                setFormState,
                schemaText,
                setSchemaText,
                parsedSchema,
                setParsedSchema
            }}
        >
            <DynamicFormBuilder
                onSubmit={(data) => {
                    console.log(data);
                }}
            />

            <div className="flex items-center justify-center  ">
                <SchemaDocs />
            </div>
        </FormContext.Provider>
    )

}

export default App
