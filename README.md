# Dynamic Lead Form & Design System

This is a React and TypeScript project featuring a custom-built Design System and a Dynamic Lead Capture Form. It uses Vite for fast development and CSS Modules for isolated styling. No external UI libraries are used.

## 🚀 How to Install and Run

Follow these steps to get the project running on your local machine:

1. **Prerequisites**: Ensure you have [Node.js](https://nodejs.org/) installed.
2. **Install Dependencies**: Open your terminal, navigate to the root directory of this project, and run:
   ```bash
   npm install
   ```
3. **Start the Development Server**: Once dependencies are installed, start the Vite development server by running:
   ```bash
   npm run dev
   ```
4. **View the App**: Open your browser and navigate to `http://localhost:5173` (or the URL shown in your terminal).

## ⚙️ How It Works

The architecture of this project strictly separates generic presentation UI (the Design System) from business logic (the Lead Feature).

### 1. The Design System (`src/design-system/`)
This folder contains all the reusable UI building blocks. It is completely decoupled from business logic.
- **Tokens**: `tokens/tokens.css` defines the core visual language (colors, spacing, etc.) using CSS variables.
- **Atoms**: Pure, low-level React components like `TextInput`, `Select`, `Textarea`, `Checkbox`, and `Button`. These components strictly use TypeScript `enum` types (e.g., `TextInputType`, `ButtonVariant`) for highly type-safe props.
- **Molecules**: The `Field` component wraps atoms with labels, hints, and error messages.
- **DynamicForm Engine**: The `DynamicForm.tsx` component takes a JSON-like configuration array and automatically renders the appropriate form fields, handling state changes and blur events cleanly without relying on inline functions.

### 2. The Lead Feature (`src/features/lead/`)
This folder contains the actual business logic for the application.
- **Form Configuration**: `config.ts` defines the structure of the lead form. It specifies which `FieldType` enum to use, grid span layouts (`GridSpan`), visibility conditions, and validation rules.
- **Validation**: `validation.ts` is a pure function that evaluates the user's input against the rules defined in the config.
- **LeadPage**: `LeadPage.tsx` acts as the orchestrator. It manages the form's state, handles validation loops, and submits the final data.
