# AI Agents

Agents are task-specific AI workers that are triggered via buttons in the UI. Each one connects to an external N8N workflow via a webhook.

---

## 🔧 Agent Interface

Each API route in `/api/agent/[agent]/route.ts`:

- Accepts a JSON POST body
- Sends the body to a predefined N8N webhook
- Returns the response from N8N to the frontend
- Logs the payload + result to `agent_logs`

---

## 📋 Registered Agents (Phase 1)

| Agent Name        | Slug             | Task Description                                      |
|------------------|------------------|--------------------------------------------------------|
| Listing Rewriter | `listing-rewrite`| Rewrite a listing with new amenities and tone         |
| Review Analyzer  | `review-insights`| Summarize themes from recent guest reviews            |
| Owner Reporter   | `owner-report`   | Generate an owner-facing performance summary          |
