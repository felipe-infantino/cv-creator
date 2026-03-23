@AGENTS.md

# CV Creator

## Project Goal
A resume/CV creator web app with **no backend and no database**. All data is persisted in the browser's **localStorage**. The app is built with **Next.js 16**.

## Architecture Constraints
- **No backend**: The app runs entirely client-side. No API routes, no server actions that mutate external state.
- **No database**: All resume data (personal info, experience, education, skills, etc.) is stored in `localStorage`.
- **Next.js 16**: Follow the framework's conventions and check `node_modules/next/dist/docs/` for any breaking changes before writing code.

## Key Principles
- All state management should read from and write to `localStorage`.
- The app should work offline once loaded.
- Export/download functionality (e.g., PDF) should happen entirely client-side.
