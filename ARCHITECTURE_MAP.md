# Architecture Map: OmniRoute

## High-Level Request Flow

```
User Request
  ↓
OmniRoute (Next.js / Server / Proxy)
  ↓
Routing Engine (Capability Analysis, Candidate Filtering, Strategy Resolution)
  ↓
Combo System (Task Fitness, Scoring, Multi-step execution)
  ↓
vivanta-ollama / Provider Adapters
  ↓
Ollama / External Providers
  ↓
Local Models
```

## Core Modules (`src/` & `open-sse/`)

- **`src/server/` / `src/app/`**: API endpoints, middleware, server initialization.
- **`src/models/` / `src/domain/`**: Model registry, capabilities, routing strategies.
- **`open-sse/services/`**: Combo management, task-aware routing, autoStrategy, scoring.
- **`src/lib/db/`**: SQLite storage, migrations, context handoffs.
