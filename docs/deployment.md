## 🧪 Per-Client Shell Design

This project is currently in the “shell” phase, meaning it’s structured to be copied and deployed per client.

Each deployed container will:

- Be manually deployed with its own `.env.local`
- Use the same codebase + Docker setup
- Have tenant-specific values injected at build time

> Future phases will automate this via a deployment script or multi-tenant architecture.
