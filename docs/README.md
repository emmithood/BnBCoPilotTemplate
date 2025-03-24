# STR AI Automation Platform – MVP

This project is an MVP for a short-term rental (STR) automation dashboard. The platform enables property managers to “hire” AI agents that perform various operational tasks such as:

- Rewriting property listings
- Analyzing guest reviews
- Generating owner reports

In addition, each dashboard includes an AI-powered chatbot trained on internal documentation to assist with property management queries.

---

## 🔧 Phase 1 Scope

This MVP is focused on:
- Single-tenant, manually deployed dashboards (one Docker container per client)
- No user authentication or roles
- AI Agents triggered by buttons (one-click actions)
- Basic UI using TailwindCSS + React 19
- Supabase + pgvector for retrieval-augmented generation (RAG)
- Azure OpenAI for both agents and chatbot completions
- N8N workflows used as automation backends

---

## 🧱 Tech Stack

- **Next.js 15.2.3** (App Router)
- **React 19**, **TypeScript 5**
- **TailwindCSS v4**
- **Supabase JS v2** with pgvector
- **Azure OpenAI (`openai` SDK v4)**
- **N8N** (external webhooks for agent automation)
- **Docker** (manual deployment per client)
