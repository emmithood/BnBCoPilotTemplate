
---

## 📄 9. `CLAUDE.md`

```md
# Claude Code Instructions

These are project-specific guidelines for using Claude Code effectively.

---

## ✅ Do:

- Use environment variables from `CONFIG.md` (never hardcode keys)
- Infer types and schema from `DB_SCHEMA.md`
- Follow file patterns from `ARCHITECTURE.md`
- Use Azure OpenAI via `openai` SDK (v4)
- Send webhook payloads as described in `N8N_WEBHOOK.md`

---

## 🚫 Don’t:

- Expose or paste API keys
- Invent database tables or columns
- Overwrite other agent logic without notice

---

## 🧪 Claude Code Tasks You Can Perform

- Create new `/api/agent/[agent]` routes
- Build agent UI buttons in `AgentList.tsx`
- Refactor shared utilities for N8N calling
- Write and update Docker deployment files (see `DEPLOYMENT.md`)

---

## 📤 Claude Best Practice

Start each prompt with:

> “I’ve uploaded the context files. Please follow `CLAUDE.md` and update/create the following files...”
