# STR AI Dashboard

AI-powered automation for short-term rental property management.

## Overview

This platform provides:

1. **AI Agents**: Task-specific automation bots for common STR management tasks
2. **AI Chatbot**: Knowledge base assistant for internal documentation and SOPs

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Azure OpenAI account
- N8N instance for agent workflows

### Setup

1. Clone this repository
2. Copy `.env.template` to `.env.local` and fill in your values
3. Install dependencies:

```bash
npm install
```

4. Run the development server:

```bash
npm run dev
```

### Development with MCP Fetch

When running on localhost, the app will automatically use the MCP fetch tool if available. If not available, it will gracefully fallback to regular fetch. This functionality is implemented in:

- `/src/lib/fetch.ts` - Enhanced fetch utility
- `/src/app/layout.tsx` - MCP initialization script
- `/src/lib/mcp-init.ts` - TypeScript types for MCP

## Project Structure

- `/src/app/api/agent/[agent]/route.ts` - Dynamic API routes for agent execution
- `/src/app/api/chat/route.ts` - API route for chatbot interaction
- `/src/components/AgentList.tsx` - List of available agents
- `/src/components/AgentTriggerButton.tsx` - Button to trigger agent execution
- `/src/lib/n8n.ts` - Utility for N8N webhook execution
- `/src/lib/supabase.ts` - Supabase client initialization
- `/src/lib/fetch.ts` - Enhanced fetch utility with MCP support

## Deployment

This application is designed to be deployed as a Docker container with client-specific environment variables. See `/docs/deployment.md` for details.

## License

Proprietary - All rights reserved.