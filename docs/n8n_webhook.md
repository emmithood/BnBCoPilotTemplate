# N8N Webhook Configuration

Each AI Agent maps to a unique N8N workflow that runs the task logic (e.g. generate report, analyze reviews).

---

## 📮 Webhook Call Flow

1. API route `/api/agent/[agent]` receives input
2. POSTs the body to the N8N URL (per-agent)
3. Returns N8N response to frontend
4. Logs everything to Supabase

---

## 🛠️ Example Mapping

| Agent Slug        | N8N Webhook URL                               |
|-------------------|-----------------------------------------------|
| `listing-rewrite` | `https://n8n.myserver.com/webhook/listing1`  |
| `review-insights` | `https://n8n.myserver.com/webhook/reviews1`  |
| `owner-report`    | `https://n8n.myserver.com/webhook/owner1`    |

---

## 📤 Webhook Payload Convention

```json
{
  "property_id": "abc123",
  "additional_notes": "Include pool amenities",
  "agent": "listing-rewrite"
}