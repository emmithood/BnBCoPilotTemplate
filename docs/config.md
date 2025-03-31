# STR AI Dashboard Configuration

## Overview

This document outlines the configuration system for the STR AI Dashboard, a single-tenant application that can be deployed as a Docker container per client. This structure facilitates easy customization for different clients without code changes.

## Configuration Structure

The primary configuration file is located at:

```
/src/lib/config.ts
```

This TypeScript file exports a configuration object that includes all customizable aspects of the application, including:

- App branding (name, version)
- Navigation items
- Agent configurations
- Metrics defaults
- Template agent mock data
- Chat configuration

## Deployment Strategy

For each client deployment, the following steps should be taken:

1. Update the configuration file with client-specific data
2. Build the Docker container with the customized configuration
3. Deploy the container to the client's environment

## Key Configuration Options

### App Branding

```typescript
appName: string        // The application name shown in navbar and UI
appVersion: string     // Version number shown in sidebar
```

### Navigation

```typescript
navigation: {
  items: Array<{
    name: string,     // Display name in navigation
    path: string,     // URL path
  }>;
}
```

### Agents Configuration

```typescript
agents: {
  defaultProperty: string,
  properties: Array<{
    id: string,
    name: string,
  }>,
  templates: Array<{
    title: string,
    slug: string,
    description: string,
    tasks: string[],
  }>,
  list: Array<{
    name: string,
    slug: string,
    description: string,
  }>
}
```

### Metrics Default Values

```typescript
metrics: {
  tasksCompleted: {
    title: string,
    value: number,
    change: { value: string, isPositive: boolean },
    description: string,
  },
  timeSaved: {
    title: string,
    value: number,
    suffix: string,
    change: { value: string, isPositive: boolean },
    description: string,
  },
  accuracy: {
    title: string,
    value: string,
    change: { value: string, isPositive: boolean },
    description: string,
  }
}
```

### Template Agent Data

```typescript
templateAgent: {
  workSummary: string,
  pendingItems: Array<{
    id: string,
    title: string,
    type: string,
    createdAt: string,
    status: string,
  }>,
  taskLog: Array<{
    id: string,
    name: string,
    status: string,
    timestamp: string,
    duration?: string,
    details?: string,
  }>
}
```

### Chat Configuration

```typescript
chat: {
  welcomeMessage: string,   // Initial message shown in chat
  brandName: string,        // Brand name shown in chat avatar
  docTrainingNotice: string // Notice about document training
}
```

## Example Client Configuration

To customize for a specific client:

1. Copy the existing `src/lib/config.ts` file
2. Update the values to match the client's branding and requirements
3. Include the file in the Docker build process

Example client configuration:

```typescript
const config: AppConfig = {
  appName: "CLIENT PROPERTY ASSISTANT",
  appVersion: "1.0.2",
  
  // Navigation (typically unchanged)
  navigation: { ... },
  
  // Client-specific properties
  agents: {
    properties: [
      { id: "prop-1", name: "Client Property A" },
      { id: "prop-2", name: "Client Property B" },
      ...
    ],
    ...
  },
  
  // Client branding in chat
  chat: {
    welcomeMessage: `# Welcome to CLIENT PROPERTY ASSISTANT! 👋\n\n...`,
    brandName: "CPA",
    ...
  },
};
```

## Notes on Docker Deployment

The Docker container should be built with the client-specific configuration file. The Docker build process should:

1. Copy the client-specific config file to the correct location
2. Build the application with this configuration
3. Result in a container that is fully customized for the client

This approach maintains a clean separation between code and configuration, allowing for easy updates and maintenance.