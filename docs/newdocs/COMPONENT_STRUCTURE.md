# Component Structure

This document outlines the organized structure of our UI components in the STR Copilot platform.

## Overview

We build our user interface using a component-based approach. Every part of the UI (chat interface, agent cards, document uploader, etc.) is a separate, self-contained piece. This approach enhances maintainability, testability, and allows for parallel development.

## Component Folder Organization

Our components are organized into logical folders based on their functionality and purpose:

- `/components/layout` - Global layout components
  - Sidebar.tsx - Main navigation sidebar
  - NavigationBar.tsx - Top navigation bar with page title and user controls
  - DashboardLayout.tsx - Main application layout wrapper
  - PageTitleBar.tsx - Page title with optional breadcrumbs
  - ThemeToggle.tsx - Theme switching control (light/dark)

- `/components/chat` - Chat-related components
  - Chatbot.tsx - Main chat interface

- `/components/agents` - Agent-related components
  - AgentCard.tsx - Card displaying agent information
  - AgentList.tsx - List of available agents
  - AgentTriggerButton.tsx - Button to trigger agent actions

- `/components/documents` - Document-related components
  - DocumentList.tsx - List and management of uploaded documents
  - DocumentUploader.tsx - Document upload interface

- `/components/ui` - Reusable UI components
  - MetricsBox.tsx - Individual metric display
  - MetricsGrid.tsx - Grid layout for multiple metrics

- `/components/dashboard` - Dashboard-specific components
  - WorkSummary.tsx - Summary of agent work
  - PendingReviewTable.tsx - Table of items pending review

- `/components/performance` - Performance metrics and logging components
  - PerformanceReview.tsx - Performance metrics visualization
  - TaskLog.tsx - Log of completed tasks

- `/components/client` - Client-related layout components
  - ClientLayout.tsx - Layout specific to client views

- `/components/misc` - Miscellaneous utilities
  - McpInitScript.tsx - Initialization script for MCP

## Benefits of This Structure

This organized folder structure provides several advantages:

1. **Clear separation of concerns** - Components are grouped by their purpose
2. **Improved discoverability** - Developers can quickly find the components they need
3. **Better code organization** - As the application grows, components stay organized
4. **Self-documenting import paths** - Imports like `@/components/layout/Sidebar` clearly indicate component purpose
5. **Easier maintenance** - Related components are kept together
6. **Simplified refactoring** - Changes to related components can be made together

## Usage Guidelines

When creating new components, consider:

1. **Placement** - Which category best fits your component's purpose
2. **Naming** - Use clear, descriptive names that indicate functionality
3. **Isolation** - Components should be self-contained with minimal dependencies
4. **Reusability** - Design components for reuse when appropriate

## Import Examples

```tsx
// Importing layout components
import Sidebar from '@/components/layout/Sidebar';
import NavigationBar from '@/components/layout/NavigationBar';

// Importing chat components
import Chatbot from '@/components/chat/Chatbot';

// Importing UI components
import MetricsBox from '@/components/ui/MetricsBox';
```

This structure helps us keep the codebase manageable and allows developers to work on individual pieces without affecting other parts of the application.