# Chatbot RAG System

The chatbot uses retrieval-augmented generation (RAG) to answer questions based on uploaded SOPs, internal guides, and process documentation.

---

## 🧠 Retrieval Workflow

1. User asks a question via chat UI.
2. Backend embeds query and finds top 3 `documents` matches via pgvector.
3. Matched content is inserted into system prompt.
4. Azure OpenAI (GPT-4-turbo) generates a response.

---

## 🧾 Prompt Format

```ts
SYSTEM PROMPT:
You are a helpful assistant for a property manager. Use ONLY the context below to answer.

Context:
{{document_chunks}}

User: {{query}}
