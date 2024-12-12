# Dynamic Form Builder (React)

This is a simple dynamic form builder that allows you to create forms with different types of fields. The form builder is built using React and Typescript and Uses Tailwind CSS for styling.

## Project Structure 

```
.
├── apps
│   ├── builder (main app for rendering UI of form builder)
│   │   └── src
│   │       ├── component
│   │       │   ├── Accordion.tsx
│   │       │   └── DynamicFormBuilder.tsx
│   │       ├── docs
│   │       │   ├── .storybook
│   │       │   ├── main.js
│   │       │   └── preview.ts
│   │       ├── context
│   │       │   └── form.context.tsx
│   │       ├── App.tsx
│   │       └── main.tsx
│   └── docs
│       └── stories
│           ├── button.stories.tsx
│           └── input.stories.tsx
└── packages
    ├── config-tailwind (shared config for tailwind)
    ├── eslint-config (shared config for eslint)
    ├── schema-validator (custom validator to validate form schema)
    └── ui
        ├── css/global.css
        └── src
            └── [component-name]/
                ├── [component-name].cva.tsx (for class variance authority styles)
                ├── [component-name].types.ts (type definations for component)
                ├── [component-name].tsx (component)
                └── index.tsx (unified exporter for component)
```

# Installation

1. Clone the repository

```bash
git clone https://github.com/KailasMahavarkar/form-builder.git
```

2. Install the dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

4. Open the browser and navigate to `http://localhost:5173`

--------

