Agents the client might use:

- Review Analyzer → N8N webhook
- Listing Description Rewriter → N8N webhook
- Owner Report Generator → N8N webhook
Each button in the dashboard sends a POST request to a corresponding N8N webhook.

Chatbot:
- UI with a chat input and a conversation window
- Message goes to a backend endpoint
- Backend does a vector search from Supabase (RAG), retrieves top 3 matching docs, injects into the Azure OpenAI prompt

The system prompt for Azure should be:
“You are an expert assistant trained to support a short-term rental property management company. Use the knowledge base to provide accurate answers.”

All environment variables should be injected from a `.env.local` file.
