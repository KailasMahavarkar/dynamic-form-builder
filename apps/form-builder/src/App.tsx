import { IFormSchema } from '@repo/schema-validator';
import './App.css'
import DynamicForm from './components/FormWrapper'
import "@repo/ui/styles";

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
    ],
}

function App() {
    return (
        <>
            <DynamicForm
                config={config}
                onSubmit={(formData) => {
                    console.log(JSON.stringify(formData, null, 2))
                }}
            />
        </>
    )
}

export default App
