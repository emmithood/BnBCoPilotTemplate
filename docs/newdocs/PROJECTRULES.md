## Project Overview

*   **Type:** cursor_project_rules
*   **Description:** STR AI Dashboard is an AI-powered automation platform designed for short-term rental property management using specialized AI Agents and an AI Chatbot. Built as an MVP, the dashboard is deployed in a single-tenant mode (one Docker container per client) without user authentication.
*   **Primary Goal:** Automate repetitive tasks, improve operational efficiency, and provide property managers with actionable insights.

## Project Structure

### Framework-Specific Routing

*   **Directory Rules:**

    *   [next.js 15.2.3]: App Router required using `app/[route]/page.tsx` conventions.
    *   Example 1: "Next.js 15.2.3 (App Router)" → `app/[route]/page.tsx` structure
    *   Example 2: "Next.js (Pages Router)" → `pages/[route].tsx` pattern (not applicable in this project)
    *   Example 3: "React Router 6" → `src/routes/` with `createBrowserRouter` (for other frameworks)

### Core Directories

*   **Versioned Structure:**

    *   [app/api]: Next.js 15 API routes with Route Handlers managing AI agents, chatbot interactions, and document management.
    *   Example 1: `app/api` → "Next.js 15 API routes for AI agents, chatbot endpoints, and document operations"
    *   Example 2: `src/views` → "For other frameworks (not used in this project)"

### Key Files

*   **Stack-Versioned Patterns:**

    *   [app/dashboard/layout.tsx]: Next.js 15 root layout implementing a modern, responsive dashboard UI.
    *   Example 1: `app/dashboard/layout.tsx` → "Next.js 15 root layout with ChatGPT-style interface"
    *   Example 2: `pages/_app.js` → "Used in Next.js Pages Router customization (not applicable here)"

## Tech Stack Rules

*   **Version Enforcement:**

    *   [next@15.2.3]: App Router required; avoid using `getInitialProps` and the legacy pages directory.
    *   Example: "next@15.2.3": "Ensure all routing is handled through the `app/` directory."

## PRD Compliance

*   **Non-Negotiable:**

    *   "The MVP should be a single-tenant system deployed as a separate Docker container per client without user authentication" : Adhere to the single-tenant Docker deployment model.
    *   "Detailed logging of AI agent executions in Supabase" : All dynamic API routes must log execution details for traceability.

## App Flow Integration

*   **Stack-Aligned Flow:**

    *   Example: "Next.js 15 AI Chat Flow" → `app/api/chat/route.ts` handles chatbot interactions using server actions.
    *   Example: "Next.js 15 AI Agent Flow" → `app/api/agent/[agent]/route.ts` routes requests dynamically to external N8N webhooks.

## Best Practices

*   next.js 15.2.3

    *   Use the App Router with nested directories to achieve modular route management.
    *   Leverage server actions for data fetching and streamlined component rendering.
    *   Maintain a clear separation between API routes and UI components.

*   react 19

    *   Prioritize functional components and React hooks for state management.
    *   Keep component logic modular and reusable across the application.
    *   Optimize performance with memoization and code-splitting techniques.

*   typescript 5

    *   Enable strict type checking to enhance code reliability.
    *   Define clear interfaces and types for API responses, components, and utility functions.
    *   Utilize TypeScript’s utility types to enforce consistent type safety.

*   tailwind css v4

    *   Adopt a utility-first approach for rapid UI development.
    *   Configure purging to remove unused styles in production builds.
    *   Use responsive utility classes to ensure optimal display across various devices.

*   lucide react icons

    *   Import only the necessary icons to reduce bundle size.
    *   Use icons as React components for consistent styling and scalability.
    *   Maintain uniform icon styling across the dashboard.

*   node.js 18+

    *   Use stable LTS versions to ensure a reliable runtime environment.
    *   Handle asynchronous operations with async/await for clarity and error management.
    *   Implement robust error handling and logging to aid in debugging.

*   supabase js v2 & pgvector

    *   Initialize and reuse the Supabase client securely across modules.
    *   Encapsulate database interactions within dedicated service layers.
    *   Optimize vector operations and enforce secure query practices.

*   azure openai sdk v4

    *   Manage API requests with proper error and timeout handling.
    *   Secure API keys using environment variables, never hardcoding them.
    *   Follow Azure OpenAI documentation to optimize performance and reliability.

*   n8n

    *   Validate and sanitize webhook payloads prior to dispatch.
    *   Implement comprehensive error handling for external workflow integrations.
    *   Log all webhook executions for auditing and traceability purposes.

*   axios

    *   Configure a global Axios instance for consistent HTTP request handling.
    *   Use interceptors to manage error logging and transform responses if needed.
    *   Cancel requests appropriately to optimize network performance.

*   docker

    *   Implement multi-stage builds to produce optimized container images.
    *   Use environment variable files (.env) to manage sensitive configuration details.
    *   Document container configurations and deployment procedures thoroughly.

*   class-variance-authority, clsx, tailwind-merge

    *   Manage CSS class names consistently to avoid conflicts.
    *   Adhere to modular styling practices for component-level CSS management.
    *   Merge conflicting class names contextually to reduce redundancy.

*   tw-animate-css

    *   Utilize predefined animation classes for user feedback during loading states and transitions.
    *   Customize animation timings and easing to enhance user experience without compromising performance.
    *   Ensure animations are accessible and do not interfere with usability.

*   dotenv

    *   Load environment variables from secure .env files to safeguard sensitive keys.
    *   Prevent hardcoding of credentials in the codebase.
    *   Validate all essential environment variables at application startup.

*   V0, Cursor, Claude 3.7 Sonnet, Claude 3.5 Sonnet, GPT 4o, GPT o1, chatgpt

    *   Follow best practices for integrating AI-powered tools and maintain updated API usage.
    *   Keep API keys secure and avoid exposing sensitive information.
    *   Leverage real-time suggestions and modular component building for enhanced development efficiency.

## Rules

*   Derive folder/file patterns directly from tech stack document versions.
*   If Next.js 15 App Router is used: Enforce the use of the `app/` directory with nested route folders.
*   If Pages Router is selected: Use a flat `pages/*.tsx` structure (not applicable here).
*   Mirror this logic for other frameworks such as React Router, SvelteKit, etc.
*   Never mix version patterns (e.g., do not include a `pages/` directory in an App Router project).
 