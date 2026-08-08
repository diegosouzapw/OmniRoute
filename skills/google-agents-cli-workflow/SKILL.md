---
name: google-agents-cli-workflow
description: >
  This skill should be used when the user wants to "develop an agent",
  "build an agent using ADK", "run the agent locally", "debug agent code",
  "test an agent", "deploy an agent", "publish an agent", "monitor an agent",
  or needs the ADK (Agent Development Kit) development lifecycle and coding
  guidelines. Entrypoint for building ADK agents.
  Always active — provides the full workflow (scaffold, build, evaluate,
  deploy, publish, observe), code preservation rules, model selection
  guidance, and troubleshooting steps for ADK or any agent development.
metadata:
  author: Google
  license: Apache-2.0
  version: 0.6.0
  requires:
    bins:
      - agents-cli
    install: "uv tool install google-agents-cli"
---

# ADK Development Workflow & Guidelines

> **STOP — Do NOT write code yet.** If no project exists, scaffold first with `agents-cli scaffold create <name>`. If the user already has code, use `agents-cli scaffold enhance .` to add the agents-cli structure. Run `agents-cli info` to check if a project already exists. Skipping this leads to missing eval boilerplate, CI/CD config, and project conventions.

**agents-cli** is a CLI and skills toolkit for building, evaluating, and deploying agents on Google Cloud using the [Agent Development Kit (ADK)](https://adk.dev/). It works with any coding agent — Gemini CLI, Claude Code, Codex, or others. Install with `uvx google-agents-cli setup`.


> Requires: google-agents-cli ~= 0.6.0
> If version is behind, run: uv tool install "google-agents-cli~=0.6.0"

> Check version: agents-cli info
> [Install uv](https://docs.astral.sh/uv/getting-started/installation/index.md) first if needed.

## Session Continuity & Skill Cross-References

Re-read the relevant skill **before** each phase — not after you've already started and hit a problem. Context compaction may have dropped earlier skill content. If skills are not available, run `uvx google-agents-cli setup` to install them.

| Phase | Skill | When to load |
|-------|-------|--------------|
| 0 — Understand | — | No skill needed — read `.agents-cli-spec.md` if present, else clarify goals with the user |
| 1 — Study samples | — | Check Notable Samples table below — clone and study matching samples before scaffolding |
| 2 — Scaffold | `/google-agents-cli-scaffold` | Before creating or enhancing a project |
| 3 — Build | `/google-agents-cli-adk-code` | Before writing agent code — API patterns, tools, callbacks, state |
| 4 — Evaluate | `/google-agents-cli-eval` | Before running any eval — dataset schema, metrics, eval-fix loop |
| 5 — Deploy | `/google-agents-cli-deploy` | Before deploying — target selection, troubleshooting 403/timeouts |
| 6 — Publish | `/google-agents-cli-publish` | After deploying, if registering with Gemini Enterprise (optional) |
| 7 — Observe | `/google-agents-cli-observability` | After deploying — traces, logging, monitoring setup |

---

## Setup

If `agents-cli` is not installed:
```bash
uv tool install google-agents-cli
```

### `uv` command not found

Install `uv` following the [official installation guide](https://docs.astral.sh/uv/getting-started/installation/index.md).

### Product name mapping

The platform formerly known as "Vertex AI" is now **Gemini Enterprise Agent Platform** (short: **Agent Platform**). Users may refer to products by different names. Map them to the correct CLI values:

| User may say | CLI value |
|-------------|-----------|
| Agent Engine, Vertex AI Agent Engine, Agent Runtime | `--deployment-target agent_runtime` |
| Vertex AI Search, Agent Search | `--datastore agent_platform_search` |
| Vertex AI Vector Search, Vector Search | `--datastore agent_platform_vector_search` |
| Agent Engine sessions, Agent Platform Sessions | `--session-type agent_platform_sessions` |

The `vertexai` Python SDK package name is unchanged.

---

## Phase 0: Understand

Before writing or scaffolding anything, understand what you're building.

If `.agents-cli-spec.md` exists in the current directory, read it — it is your primary source of truth. Otherwise:

Do NOT proceed to planning, scaffolding, or coding. Ask the user the questions below and wait for their answers. You MUST have the user's answers before moving on. Do not assume, research, or fill in the blanks yourself. The user's intent drives everything — skipping this step leads to wasted work.

**Always ask:**

1. **What problem will the agent solve?** — Core purpose and capabilities
2. **External APIs or data sources needed?** — Tools, integrations, auth requirements
3. **Safety constraints?** — What the agent must NOT do, guardrails
4. **Deployment preference?** — Prototype first (recommended) or full deployment? If deploying: Agent Runtime, Cloud Run, or GKE?

**Ask based on context:**

- If **retrieval or search over data** mentioned (RAG, semantic search, vector search, embeddings, similarity search, data ingestion) → **Datastore?** Options: `agent_platform_vector_search` (embeddings, similarity search) or `agent_platform_search` (document search, search engine).
- If agent should be **available to other agents** → **A2A protocol** is built into every Python ADK agent; no separate choice needed — just scaffold normally.
- If **full deployment** chosen → **CI/CD runner?** GitHub Actions (default) or Google Cloud Build?
- If agent should **remember user preferences or facts across sessions** → **Memory Bank?** Long-term memory across conversations. See `/google-agents-cli-adk-code`.
- If **Cloud Run** or **GKE** chosen → **Session storage?** In-memory (default), Cloud SQL (persistent), or Agent Platform Sessions (managed).
- If **deployment with CI/CD** chosen → **Git repository?** Does one already exist, or should one be created? If creating, public or private?

Once you have the user's answers, write the spec to `.agents-cli-spec.md` in the current directory and get the user's approval. See `/google-agents-cli-scaffold` for how these choices map to CLI flags. At minimum include these sections — expand with more detail if the user wants a thorough spec:

```markdown
# Agent Spec

## Overview
Describe the agent's purpose and how it works.

## Example Use Cases
Concrete examples with expected inputs and outputs.

## Tools Required
Each tool with its purpose, API details, and authentication needs.

## Constraints & Safety Rules
Specific rules — not just generic statements.

## Success Criteria
Measurable outcomes for evaluation.

## Reference Samples
Check the Notable Samples in Phase 1 — list any that match this use case.
```

Optional sections for more detailed specs: **Edge Cases to Handle**, **Architecture & Sub-Agents**, **Data Sources & Auth**, **Non-Functional Requirements**.

Once you have a clear understanding, proceed to **Phase 1**.

## Phase 1: Study Reference Samples

Ask yourself: is there a sample that can help me design this and cut time? Scan the keywords below. Multiple samples can match — clone and study all that are relevant.

```bash
# Clone a sample to study — read the key files, understand the patterns, then apply
# them to your own scaffolded project. Do NOT use `adk@<sample>` scaffolding.
git clone --filter=tree:0 --sparse https://github.com/google/adk-samples /tmp/adk-samples 2>/dev/null; \
cd /tmp/adk-samples && git sparse-checkout add python/agents/<sample-name>
```

- **`ambient-expense-agent`** — Agent that runs on a schedule or reacts to events, with no interactive user.
  Keywords: scheduled, cron, daily, pubsub, event-driven, alerts, email, ambient
  Key files: `expense_agent/fast_api_app.py`, `expense_agent/agent.py`, `expense_agent/config.py`, `terraform/`
- **`adk-ae-oauth`** — Agent with OAuth 2.0 user consent, deployed to Agent Runtime with Gemini Enterprise.
  Keywords: OAuth, authentication, user consent, Google Drive, Agent Runtime, Gemini Enterprise
  Key files: `README.md`, `adk_ae_oauth/tools.py`, `adk_ae_oauth/auths.py`
- **`genmedia-for-commerce`** — Full-stack agent with React UI, MCP tools, media/image handling, and Gemini Enterprise registration.
  Keywords: MCP, media, video generation, Veo, virtual try-on, retail, full-stack, React, Gemini Enterprise
  Key files: `genmedia4commerce/agent.py`, `genmedia4commerce/agent_utils.py`, `genmedia4commerce/fast_api_app.py`
- **`deep-search`** — Research agent that iterates until quality is met, with source citations.
  Keywords: research, citations, iterative, grounding, multi-agent, human-in-the-loop, web search, report
  Key files: `app/agent.py`, `app/config.py`
- **`safety-plugins`** — Reusable safety guardrails that plug into any agent runner.
  Keywords: safety, guardrails, model armor, filters
  Key files: `safety_plugins/plugins/model_armor.py`, `safety_plugins/plugins/agent_as_a_judge.py`, `safety_plugins/main.py`
- **`data-science`** — Agent that executes code in a managed sandbox for data analysis.
  Keywords: SQL, BigQuery, code execution, sandbox
  Key files: `data_science/sub_agents/analytics/agent.py`
- **`memory-bank`** — Conversational agent with cross-session memory via Memory Bank (Cloud Run and Agent Runtime).
  Keywords: memory, cross-session, recall, context, remember, Memory Bank
  Key files: `app/agent.py`, `app/fast_api_app.py`

If no sample matches, proceed to Phase 2. But first — are you sure? Re-read the user's request and compare it against the keywords above. Skipping a matching sample means rebuilding patterns that already exist.

> **IMPORTANT — Exit criteria:** After studying a sample, ask yourself: can I apply anything from this sample to help me deliver the design? Note what you'll reuse before moving on. Do NOT proceed until you've answered this.

> **This list is useful at any phase** — revisit it when you hit deployment, publishing, or infrastructure questions. A sample's Terraform or registration pattern may be exactly what you need later.

## Phase 2: Scaffold (if needed)

Use `/google-agents-cli-scaffold` to create a new project or import an existing one into the agents-cli format (adding deployment, CI/CD, infrastructure). It covers architecture choices (deployment target, agent type, session storage) and project creation or enhancement.

Skip this phase if the project was already created or enhanced by agents-cli — run `agents-cli info` from the project root to check.

## Phase 3: Build and Implement

Implement the agent logic:

1. Write/modify code in the agent directory (check `GEMINI.md` / `CLAUDE.md` for directory name)
2. **Quick smoke test**: Use `agents-cli run "your prompt"` to verify the agent works after changes — this is the fastest way to check behavior without leaving the terminal
3. Iterate on the implementation based on user feedback

If the user asks for interactive testing, suggest `agents-cli playground` — it opens a web-based playground for manual conversation with the agent.

For ADK API patterns and code examples, use `/google-agents-cli-adk-code`.

> **NEVER write pytest tests that assert on LLM output content** (e.g., checking for keywords in responses, verifying persona, validating tone). LLM outputs are non-deterministic — these tests are flaky by nature and belong in eval, not pytest. Use `agents-cli run` for quick checks and `agents-cli eval generate` followed by `agents-cli eval grade` for systematic validation.

## Phase 3.5: Provision Datastore (RAG projects only)

For `agentic_rag` projects, provision the datastore before testing: `agents-cli infra datastore`, then `agents-cli data-ingestion`. Use `infra datastore` — **not** `infra single-project` (same datastore provisioning but faster, skips unrelated Terraform).

## Phase 4: Evaluate

**This is the most important phase.** Evaluation validates agent behavior end-to-end.

**MANDATORY:** Activate `/google-agents-cli-eval` before running evaluation.
It contains the dataset schema, config format, and critical gotchas. Do NOT skip this.

**Do NOT skip this phase.** After building the agent, you MUST proceed to evaluation.

**`uv run pytest` vs `agents-cli eval` — know the difference:**
- **`uv run pytest`** — Tests *code correctness*: imports work, functions return expected types, API contracts hold. Does NOT test whether the agent behaves well.
- **`agents-cli eval`** — Tests *agent behavior*: response quality, tool usage, persona consistency, safety compliance. This is what validates your agent actually works.
- **`agents-cli run "prompt"`** — Quick one-off smoke test during development. If testing multiple prompts use the `--start-server` option to persist the local server, which reduces overhead for repeated calls and allows resuming local sessions via `--session-id`. Use this for fast iteration, not pytest.

**NEVER write pytest tests that check LLM response content** (e.g., asserting pirate keywords appear, checking if the agent mentions allergies). LLM outputs are non-deterministic. Use eval with LLM-as-judge criteria instead.

1. **Start small**: Begin with 1-2 sample eval cases, not a full suite
2. Run evaluations: `agents-cli eval run` (chains `generate` + `grade`). For debugging or custom trace locations, use the two-step form: `agents-cli eval generate` then `agents-cli eval grade`.
3. Discuss results with the user
4. Fix issues and iterate on the core cases first
5. Only after core cases pass, add edge cases and new scenarios
6. Repeat until quality thresholds are met

**Expect 5-10+ iterations here.**

## Phase 5: Deploy

Once evaluation thresholds are met:

1. Check if the project has a deployment target configured — run `agents-cli info` to see current config
2. If the project is a prototype (no deployment target), add deployment support first:
   ```bash
   agents-cli scaffold enhance . --deployment-target <target>
   ```
   See `/google-agents-cli-deploy` for the deployment target decision matrix (Agent Runtime vs Cloud Run vs GKE).
3. Deploy when ready: `agents-cli deploy`

**IMPORTANT**: Never deploy without explicit human approval.

## Phase 6: Publish (optional)

Not all agents require this — currently supporting Gemini Enterprise. See `/google-agents-cli-publish` for registration modes, flags, and troubleshooting.

## Phase 7: Observe

After deploying, use observability tools to monitor agent behavior in production. See `/google-agents-cli-observability` for Cloud Trace, prompt-response logging, BigQuery Analytics, and third-party integrations.

---

# Operational Guidelines for Coding Agents

## Common Shortcuts to Resist

Agents routinely skip steps with plausible-sounding excuses. Recognize these and push back:

| Shortcut | Why it fails |
|----------|-------------|
| "The user's request is clear enough, no need to clarify" | You're guessing at requirements. Phase 0 exists to confirm intent before scaffolding — even one question can prevent a full rework. |
| "The agent responded correctly in `agents-cli run`, so eval isn't needed" | One prompt is not a test suite. Eval catches regressions, edge cases, and tool trajectory issues that a single run never will. |
| "I'll use a newer/better model" | The scaffolded model was chosen deliberately. Changing it without being asked violates code preservation (Principle 1) and often breaks things — wrong location, deprecated version, or 404. Your training data is likely out of date — rely on the skills and the model listing command, not your knowledge of model names. |
| "I can skip the scaffold and set up manually" | Manual setup misses eval boilerplate, CI/CD config, and project configuration manifest conventions. Use `agents-cli create` even for quick experiments. |

## Principle 1: Code Preservation & Isolation

Code modifications require surgical precision — alter only the code segments directly targeted by the user's request and strictly preserve all surrounding and unrelated code.

**Mandatory Pre-Execution Verification:**

Before finalizing any code replacement, verify the following:

1. **Target Identification:** Clearly define the exact lines or expressions to change, based *solely* on the user's explicit instructions.
2. **Preservation Check:** Confirm that all code, configuration values (e.g., `model`, `version`, `api_key`), comments, and formatting *outside* the identified target remain identical.

**Example:**

- **User Request:** "Change the agent's instruction to be a recipe suggester."
- **Incorrect (VIOLATION):**
  ```python
  root_agent = Agent(
      name="recipe_suggester",
      model="gemini-1.5-flash",  # UNINTENDED - model was not requested to change
      instruction="You are a recipe suggester."
  )
  ```
- **Correct (COMPLIANT):**
  ```python
  root_agent = Agent(
      name="recipe_suggester",  # OK, related to new purpose
      model="gemini-flash-latest",  # PRESERVED
      instruction="You are a recipe suggester."  # OK, the direct target
  )
  ```

## Principle 2: Execution Best Practices

- **Model Selection — CRITICAL:**
  - **NEVER change the model unless explicitly asked.**
  - When creating NEW agents (not modifying existing), use the latest Gemini model. List available models to pick the newest one:
    ```bash
    # Use 'global' or any supported region (e.g. 'us-east1')
    uv run --with google-genai python -c "
    from google import genai
    client = genai.Client(vertexai=True, location='global')
    for m in client.models.list(): print(m.name)
    "
    ```
  - Do NOT use older models unless explicitly requested. For model docs, fetch `https://adk.dev/agents/models/google-gemini/index.md`. See also [stable model versions](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/model-versions).

- **Running Python Commands:**
  - Always use `uv` to execute Python commands (e.g., `uv run python script.py`)
  - Run `uv sync` before executing scripts

- **Breaking Infinite Loops:**
  - **Stop immediately** if you see the same error 3+ times in a row
  - **RED FLAGS**: Lock IDs incrementing, names appending v5→v6→v7, "I'll try one more time" repeatedly
  - **State conflicts** (Error 409): Use `terraform import` instead of retrying creation
  - **When stuck**: Run underlying commands directly (e.g., `terraform` CLI)

- **Troubleshooting:**
  - Check `/google-agents-cli-adk-code` first — it covers most common patterns
  - Use WebFetch on URLs from the ADK docs index (`curl https://adk.dev/llms.txt`) for deep dives
  - When encountering persistent errors, a targeted web search often finds solutions faster
  - **CLI command failures:** run `agents-cli <command> --help` — the output ends with a `Source:` line pointing to the exact source file implementing that command. Read it to understand the logic and diagnose failures. Use `agents-cli info` to get the full CLI install path if you need to browse across multiple files.

### Systematic Debugging

When something breaks, follow this sequence — don't skip steps or shotgun fixes:

1. **Reproduce** — Run the exact command that failed. Save the full error output. If you can't reproduce it, you can't fix it.
2. **Localize** — Narrow the cause: is it the agent code, a tool, the config, or the environment? Use `agents-cli run "prompt"` to isolate agent behavior from deployment issues. Add `-v` (`--verbose`) to print the full JSON event payloads — useful for inspecting tool calls, intermediate steps, and silent failures.
3. **Fix one thing** — Change one variable at a time. If you change the instruction AND the tool AND the config simultaneously, you won't know what fixed it (or what broke something else).
4. **Verify** — Rerun the exact reproduction command. Don't assume the fix worked.
5. **Guard** — If it was a non-obvious bug, add an eval case to catch regressions.

**Stop-the-line rule:** If a change breaks something that was working, stop feature work and fix the regression first. Don't push forward hoping to circle back — regressions compound.

- **Environment Variables:**
  - `.env` files and env var assignments (e.g., `GOOGLE_CLOUD_PROJECT`, `GOOGLE_CLOUD_LOCATION`) are typically required for the agent to function — never remove or modify them unless the user explicitly asks
  - If a `.env` file exists in the project root, treat it as essential configuration
  - For secrets and API keys, prefer GCP Secret Manager over plain `.env` entries — see `/google-agents-cli-deploy` for secret management guidance

---

## Using a Temporary Scaffold as Reference

When you need specific infrastructure files (Terraform, CI/CD, Dockerfile) but don't want to modify the current project, use `/google-agents-cli-scaffold` to create a temporary project in `/tmp/` and copy over what you need.

---

## Reference Files

| File | Contents |
|------|----------|
| `references/internals.md` | Underlying tools and commands that `agents-cli` wraps (adk, pytest, ruff, uvicorn) |

## Development Commands

Run `agents-cli --help` or `agents-cli <command> --help` for the authoritative flag list. Per-phase usage lives in the phase sections above and the per-phase sub-skills.

| Phase | Commands |
|---|---|
| Setup | `setup` (install skills) · `update` (refresh skills) |
| Scaffold | `scaffold create <name>` · `scaffold enhance .` · `scaffold upgrade` |
| Develop | `playground` (web UI) · `run "prompt"` (one-shot; `-v` = JSON events) · `lint` · `install` |
| Evaluate | `eval dataset synthesize` · `eval generate` · `eval grade` · `eval compare` · `eval analyze` · `eval optimize` · `eval metric list` · `eval submit`/`eval results` (cloud) |
| Deploy | `deploy` (needs approval) · `infra single-project` · `infra cicd` · `publish gemini-enterprise` |
| Info / Auth | `info` · `login --interactive` · `login --status` |

`agents-cli info` prints the **CLI install path** (read it to inspect CLI internals/templates) plus, inside a scaffolded project, the project config.

---

## Skills Version

> **Troubleshooting hint:** If skills seem outdated or incomplete, reinstall:
> ```
> agents-cli setup --skip-auth
> ```
> Only do this when you suspect stale skills are causing problems.

---

## Related Skills

- `/google-agents-cli-scaffold` — Project creation, requirements gathering, and enhancement
- `/google-agents-cli-adk-code` — ADK Python API quick reference and production sample agents
- `/google-agents-cli-eval` — Evaluation methodology, dataset schema, and the eval-fix loop
- `/google-agents-cli-deploy` — Deployment targets, CI/CD pipelines, and production workflows
- `/google-agents-cli-publish` — Gemini Enterprise registration
- `/google-agents-cli-observability` — Cloud Trace, logging, BigQuery Analytics, and third-party integrations

