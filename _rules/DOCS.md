# Prompt: Full-Stack Codebase Documentation (AI- & Human-Readable)

> Reusable prompt template. Works on any full-stack repo (web app, mobile backend,
> monorepo, etc.) regardless of language or framework. Paste it into a chat with
> the codebase attached/accessible, fill in the bracketed context, and run.

---

## How to use this prompt

1. Open the target repository (or attach/upload it) in the assistant's working environment.
2. Fill in the **Context** section below if you have specifics; otherwise let the assistant infer them from the code.
3. Send the whole prompt as-is.

---

## Prompt

You are acting as a **senior software architect and technical writer**. Your task is to analyze this full-stack codebase end-to-end and produce a complete, multi-level documentation set — a deep-reference `docs/` folder, human-facing `README.md` files, agent-facing `AGENTS.md` files, and a root `llms.txt` index — written so that it is equally useful to **AI/LLM agents** (for future code generation, refactors, and Q&A) and to **human engineers** (for onboarding and reference).

### Context (fill in if known, otherwise infer from the repo)

- Project name: `[PROJECT_NAME]`
- Primary purpose / domain: `[e.g., e-commerce platform, internal admin tool, SaaS product]`
- Tech stack (if known): `[frontend framework, backend framework, database, infra]`
- Target audience for docs: `[new engineers / AI coding agents / both — default: both]`
- Anything explicitly out of scope: `[optional]`

If any of the above is not provided, infer it directly from the codebase (package manifests, config files, folder structure, README, CI/CD configs) and state your inferred assumptions at the top of the relevant doc.

### Objectives

1. **Understand the system holistically** before writing anything:
   - Identify all major components: frontend(s), backend service(s), databases, queues, third-party integrations, infra/deployment config.
   - Identify the architectural pattern in use (e.g., monolith, microservices, modular monolith, layered/clean architecture, hexagonal, event-driven) and whether it's applied consistently.
   - Trace how data flows from UI → API → business logic → persistence → back to UI for the 2–3 most important use cases.

2. **Document business flows**:
   - What problem does this system solve, and for whom?
   - Core domain entities and their relationships (a simple ER or domain model description is enough — text or Mermaid diagram).
   - Key business rules, invariants, and edge cases enforced in code (not just the happy path).
   - State machines / lifecycle of important entities (e.g., order status, user account status), if present.

3. **Document user flows**:
   - Map each primary user journey from entry point to outcome (e.g., sign up → onboarding → core action → result).
   - Note differences in flow per user role/persona if roles exist (admin vs. end user, etc.).
   - Call out where the user-facing flow diverges from or depends on backend/business logic.

4. **Document the interface layer**:
   - UI: key screens/pages/components, navigation structure, shared design system or component library if any.
   - API: endpoints or RPC/GraphQL operations, request/response contracts, auth requirements, versioning approach.
   - Any public SDK, CLI, or webhook surface exposed by the system.

5. **Evaluate and recommend architecture improvements** — do not just describe, also critique:
   - Identify violations of modularity (tight coupling, circular dependencies, leaky abstractions, god classes/files).
   - Identify missing or inconsistent layering (e.g., business logic in controllers/components instead of a service layer).
   - Propose a target **modular structure** that follows established best practices for this stack (e.g., separation of concerns, dependency inversion, clear boundaries between domain/application/infrastructure layers, consistent naming and folder conventions).
   - Apply relevant **system design principles**: scalability, fault tolerance, single responsibility, low coupling/high cohesion, testability, security boundaries, observability (logging/metrics/tracing), and clear API contracts.
   - Where you recommend a change, justify it briefly (the tradeoff, not just the opinion) and mark it clearly as a **recommendation**, distinct from documentation of current behavior. Do not present opinions on debatable architectural tradeoffs as settled fact — note alternatives where genuinely contested.

### Output requirements

Produce documentation at **four distinct levels**, each with a distinct job. Do not collapse them into one file — they serve different readers and different moments (humans skimming a folder, AI agents loading minimal context, AI agents loading full context).

#### Level 1 — `docs/` folder: the deep reference

Create a `docs/` folder at the repository root (or use the existing one) with **separate, focused markdown files**. Suggested structure (adapt to what's actually relevant — skip or merge files that don't apply):

```
docs/
├── 00-overview.md              # What the system is, who it's for, tech stack summary
├── 01-architecture.md          # Components, architecture pattern, diagrams, data flow
├── 02-business-flows.md        # Domain model, business rules, entity lifecycles
├── 03-user-flows.md            # User journeys per persona/role
├── 04-api-reference.md         # Endpoints/operations, contracts, auth
├── 05-ui-components.md         # Frontend structure, key screens, design system
├── 06-data-model.md            # Database schema / entities / relationships
├── 07-modularity-recommendations.md  # Gaps found + proposed modular structure
└── 08-glossary.md              # Domain & technical terms, kept current
```

Each file must:
- Start with a one-paragraph summary of its scope.
- Use clear headings, tables, and **Mermaid diagrams** (sequence, flowchart, ER, or state diagrams) wherever a visual would clarify flow or structure faster than prose.
- Be self-contained enough that an AI agent reading only that file (plus the root `AGENTS.md`) can act correctly without needing the entire codebase in context.
- Avoid duplicating content across files — link between them instead.

#### Level 2 — `README.md` files: human entry points, multi-level

Every README is for a **human** orienting themselves at that location. Keep them short (skimmable in under 2 minutes) and link outward to `docs/` for depth — never duplicate deep content into a README.

- **Root `README.md`**: project name and one-line purpose, tech stack badges/list, quick start (install/run/test commands), link to `docs/README.md` (the docs index) for everything else, license/contributing pointers if applicable.
- **Per-module/package `README.md`** (e.g., `apps/web/README.md`, `services/payments/README.md`, `packages/ui/README.md`): what this module is responsible for, how it talks to its neighbors (one sentence + link to `docs/01-architecture.md`), how to run/test it in isolation, any module-specific gotchas.
- Only add a module-level README where a human would actually land and need orientation (a service, an app, a shared package) — not for every leaf folder.
- Add `docs/README.md` as the index for the `docs/` folder itself: one line per doc file describing what's in it, plus a "start here" reading order for new humans vs. for AI agents.

#### Level 3 — `AGENTS.md` files: machine-actionable instructions, multi-level

`AGENTS.md` is for **AI coding agents** acting on the repo, not for explaining the system. It states rules, conventions, and constraints an agent must follow when generating or editing code at that scope. It is not a copy of the README and not a copy of the docs.

- **Root `AGENTS.md`**: project-wide conventions an agent must always follow — coding style/lint rules, commit/branching conventions, test requirements before a change is considered done, directory layout map (one line per top-level folder, what belongs there), how to run the full test suite and build, links to the most relevant `docs/` files for context, and any hard constraints (e.g., "never edit generated files in `*/generated/`", "all new endpoints require an integration test").
- **Per-module `AGENTS.md`** (same locations as module READMEs, only where conventions genuinely differ from root): module-specific patterns an agent must follow there (e.g., "this package uses functional core/imperative shell — keep `core/` free of I/O", "API handlers here must validate input with the schema in `schemas/` before touching the DB"), local commands to run tests/build for just this module, and known pitfalls specific to this module's code.
- Only create a module-level `AGENTS.md` when that module has rules that diverge from the root file. If a module has nothing special, don't create one — the agent should fall back to root `AGENTS.md`.
- Write `AGENTS.md` as imperative rules and checklists, not narrative prose. An agent should be able to extract "do this / never do that" without inference.

#### Level 4 — `llms.txt`: the machine-readable map

Create a single `llms.txt` at the repository root, following the emerging llms.txt convention: a concise, plain-markdown index designed for an LLM to ingest quickly to decide what to read next, without crawling the whole repo.

- Structure: an H1 with the project name, a one-paragraph blockquote summary, then H2 sections grouping links (e.g., `## Docs`, `## Modules`, `## API`), each as a markdown link list with a short one-line description per link — pointing to the `docs/` files, key `AGENTS.md` files, and key `README.md` files.
- Keep it link-and-description only — no inline explanations of how the system works; that content belongs in `docs/`. `llms.txt` is a table of contents, not a summary.
- If the repo is large enough that even `docs/` files are long, optionally note which files have a corresponding expanded version (the llms.txt convention's `llms-full.txt` pattern) — only add this if genuinely useful at this codebase's size.

#### Cross-cutting rules for all levels

- Write in **clear, precise, unambiguous English**. Prefer short paragraphs and lists over dense prose. Define any domain-specific term on first use or link to the glossary.
- Keep a clean separation between:
  - **What exists today** (factual documentation of current code), and
  - **What is recommended** (your architectural suggestions), clearly labeled as such.
- Never duplicate the same explanation across `docs/`, `README.md`, `AGENTS.md`, and `llms.txt` — each has one job (depth, human orientation, agent rules, navigation index respectively); link, don't repeat.
- Keep all of these in sync: if architecture changes, the diagram in `docs/01-architecture.md`, the one-liner in the relevant `README.md`, any affected rule in `AGENTS.md`, and the link description in `llms.txt` should all still be accurate.

### Process

1. First, explore the repository structure and identify entry points, configuration, dependency manifests, and natural module/package boundaries (these determine where multi-level README/AGENTS files are needed).
2. Build a mental model of the architecture and data flow before writing any file.
3. Draft `docs/00-overview.md` and `docs/01-architecture.md` first, since other files will reference them.
4. Fill in the remaining `docs/` files, cross-linking as you go.
5. Write `docs/07-modularity-recommendations.md` and `docs/README.md` as the docs index.
6. Write the root `README.md` and root `AGENTS.md`, then add module-level versions only where they add real, non-duplicate value.
7. Write `llms.txt` last, once every file it needs to link to actually exists.
8. At the end, summarize (outside the files, in your reply) what you found, what's solid, the full list of files created, and the top 3–5 highest-impact improvements you'd prioritize first.

