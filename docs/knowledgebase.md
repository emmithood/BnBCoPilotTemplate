# Chatbot Knowledgebase Content

The chatbot pulls from an embedded `documents` table for all RAG queries. Content includes SOPs, FAQs, and owner/guest policies.

---

## 🧾 Example Documents

- `guest_refund_policy.md`
- `cleaning_team_sop.pdf`
- `property_checklist.xlsx` (converted to text)
- `how_to_use_lockbox.docx`

---

## 🧠 Embedding Strategy

1. Document is split into ~300-token chunks
2. Each chunk is embedded using `openai.Embedding.create()`
3. Chunks stored in `documents` table with vector

---

## 📚 Data Update Notes

- New documents should be uploaded and re-embedded
- Avoid duplicating document titles
- Use Markdown where possible for clarity