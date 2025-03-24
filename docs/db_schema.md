# Supabase Database Schema (Phase 1)

This schema supports both the chatbot and agent execution logging.

---

## 📊 Tables

### `documents`
Stores embedded internal documents (SOPs, policies) for chatbot RAG.

| Column         | Type       | Description                        |
|----------------|------------|------------------------------------|
| id             | UUID       | Primary key                        |
| title          | TEXT       | Title of the document              |
| content        | TEXT       | Raw document content               |
| embedding      | VECTOR     | pgvector-processed embeddings      |
| created_at     | TIMESTAMP  | Upload timestamp                   |

---

### `agent_logs`
Logs each time an AI agent is triggered.

| Column         | Type       | Description                        |
|----------------|------------|------------------------------------|
| id             | UUID       | Primary key                        |
| agent_name     | TEXT       | Slug name of the triggered agent   |
| payload        | JSONB      | Request payload sent to N8N        |
| response       | JSONB      | Response from N8N / Azure OpenAI   |
| success        | BOOLEAN    | Whether the run succeeded          |
| created_at     | TIMESTAMP  | When the agent was triggered       |
