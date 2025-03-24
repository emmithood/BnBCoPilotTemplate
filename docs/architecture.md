# Architecture Overview

This document explains the structure, components, and flow of the MVP AI SaaS platform for short-term rental (STR) automation.

---

## 🧱 High-Level Structure

The application is divided into two key services:

1. **AI Chatbot** – An assistant powered by RAG (retrieval-augmented generation) using Supabase + pgvector and Azure OpenAI.
2. **AI Agents** – Task-specific automation bots (e.g., rewrite listing, summarize reviews) triggered via button clicks and executed via N8N webhooks.

---

## 🗂️ Folder Structure (Next.js 15 App Router)

/src ├── app/ │ ├── api/ │ │ ├── chat/route.ts # Chatbot backend route │ │ └── agent/[agent]/route.ts # Dynamic agent route (e.g., listing-rewrite, owner-report) │ └── page.tsx # Main client dashboard │ ├── components/ │ ├── Chatbot.tsx # React chatbot UI component │ ├── AgentTriggerButton.tsx # Reusable trigger button component │ └── AgentList.tsx # Renders list of available agents + buttons │ └── lib/ # Shared utilities (Supabase client, fetchers, etc.)

yaml
Copy
Edit

---

## 🔌 Backend Overview

| File / Endpoint                     | Description                                                                 |
|------------------------------------|-----------------------------------------------------------------------------|
| `/api/chat/route.ts`               | Handles RAG chatbot queries via Supabase + OpenAI                          |
| `/api/agent/[agent]/route.ts`      | Sends requests to corresponding N8N webhook and returns output             |
| Supabase                           | Stores embedded documents for chatbot + agent execution logs               |
| pgvector (via Supabase)           | Enables semantic search for chatbot RAG                                    |
| N8N                                | External automation logic (e.g., summarize reviews, write listing)         |
| Azure OpenAI                       | Provides LLM completions for both chatbot and N8N-invoked agents           |

---

## 🧠 Flow Diagrams

### 🔷 Chatbot Flow
User input → Embed query → Search pgvector → Inject docs into prompt → Azure OpenAI completion → Return response

shell
Copy
Edit

### 🟢 Agent Flow
User clicks Agent Button → Sends payload to /api/agent/[agent] → POST to N8N webhook → Returns AI-generated result → Display in UI & log to Supabase

yaml
Copy
Edit

---

## 🧩 Agent API Route Behavior

Each agent has its own dynamic route in `/api/agent/[agent]/route.ts`, which:

- Reads the agent name from the URL (e.g., `listing-rewrite`)
- Pulls the matching webhook URL from a config file or constants
- Sends a POST request with the request body
- Returns the result from N8N
- Logs execution details to the `agent_logs` table in Supabase

---

## ⚙️ Frontend Interaction

- All agents are rendered in a list (`AgentList.tsx`)
- Each agent has a trigger button (`AgentTriggerButton.tsx`)
- Chatbot UI lives in its own component (`Chatbot.tsx`)
- API interactions use `fetch()` with JSON payloads

---

## 🔐 Auth & Multitenancy

> ❌ No auth is used in Phase 1  
> ❌ Each client has a separate Docker container (manual deployment)  
> ✅ Multi-tenant support will be added in Phase 2

---

## 📌 Summary

- The codebase is cleanly divided between chatbot logic and agent execution.
- Each component is decoupled for scalability and individual testing.
- Claude Code should refer to this architecture when generating or modifying files.
