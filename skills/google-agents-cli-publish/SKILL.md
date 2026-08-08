---
name: google-agents-cli-publish
description: >
  This skill should be used when the user wants to "publish an agent",
  "publish my ADK agent", "register an agent with Gemini Enterprise",
  "publish to Gemini Enterprise", or needs guidance on the agents-cli
  publish gemini-enterprise command.
  Also use when the user wants to "manage agents in Agent Registry" or
  "list/update/delete registered agents".
  Covers ADK vs A2A registration modes, programmatic and interactive usage,
  flag reference, auto-detection from deployment metadata, Agent Registry
  fleet management, and troubleshooting.
  Part of the Google ADK (Agent Development Kit) skills suite.
  Do NOT use for deployment (use google-agents-cli-deploy).
metadata:
  author: Google
  license: Apache-2.0
  version: 0.6.0
  requires:
    bins:
      - agents-cli
    install: "uv tool install google-agents-cli"
---

# Gemini Enterprise Registration

> **Requires:** A deployed agent. For Agent Runtime, `deployment_metadata.json` (created by `agents-cli deploy`) enables auto-detection. For Cloud Run or GKE, provide the agent card URL and flags directly.

## Prerequisites

1. **Agent must be deployed** — the agent must be running and reachable
2. **Gemini Enterprise app must exist** — Create one in Google Cloud Console → Gemini Enterprise → Apps before registering
3. **`deployment_metadata.json`** (Agent Runtime only) — Created automatically by `agents-cli deploy`; contains the agent runtime ID, deployment target, the A2A flag, and the agent directory

## Required Permissions for A2A on Cloud Run

- **`roles/run.servicesInvoker`** granted to the Discovery Engine service account (`service-<PROJECT_NUMBER>@gcp-sa-discoveryengine.iam.gserviceaccount.com`) on the Cloud Run service.

---

## Registration Modes

### A2A Registration (default)

Every scaffolded agent serves the Agent-to-Agent protocol, so A2A is the default on **every** deployment target — Agent Runtime included. Pass the agent card URL and the command fetches the card and registers it; display name and description default to the card's `name`/`description`.

```bash
# A2A on Agent Runtime (card served through the /api passthrough)
agents-cli publish gemini-enterprise \
  --agent-card-url "https://us-east1-aiplatform.googleapis.com/reasoningEngines/v1/projects/123456/locations/us-east1/reasoningEngines/789/api/a2a/app/.well-known/agent-card.json" \
  --gemini-enterprise-app-id projects/123456/locations/global/collections/default_collection/engines/my-app

# A2A on Cloud Run / GKE
agents-cli publish gemini-enterprise \
  --agent-card-url https://my-service-abc123.us-east1.run.app/a2a/app/.well-known/agent-card.json \
  --gemini-enterprise-app-id projects/123456/locations/global/collections/default_collection/engines/my-app
```

Pass `--display-name` / `--description` to override the card defaults. On Agent Runtime, `--agent-card-url` can be omitted when `deployment_metadata.json` is present — see [Auto-Detection from Metadata](#auto-detection-from-metadata).

> **OAuth authorization is not supported yet for A2A on Agent Runtime.** If your agent needs an OAuth authorization (`--authorization-id`), register it as ADK instead (`--registration-type adk`) — Gemini Enterprise invokes it natively via `:streamQuery`, which does support authorizations.

### ADK Registration

Opt in with `--registration-type adk` for Agent Runtime agents you want Gemini Enterprise to invoke natively via `:streamQuery` instead of over A2A — also the path to use when the agent needs an OAuth authorization (`--authorization-id`), which A2A on Agent Runtime does not yet support. The agent is registered directly via its reasoning engine resource name.

```bash
agents-cli publish gemini-enterprise \
  --registration-type adk \
  --agent-runtime-id projects/123456/locations/us-east1/reasoningEngines/789 \
  --gemini-enterprise-app-id projects/123456/locations/global/collections/default_collection/engines/my-app \
  --display-name "My Agent" \
  --description "Handles customer queries" \
  --tool-description "Answers questions about products"
```

---

## Programmatic Mode (CI/CD)

The command is non-interactive by default — pass all required values via flags or environment variables. This makes it safe for CI/CD pipelines.

### Via flags

```bash
agents-cli publish gemini-enterprise \
  --agent-runtime-id "$AGENT_RUNTIME_ID" \
  --gemini-enterprise-app-id "$GEMINI_ENTERPRISE_APP_ID" \
  --display-name "Production Agent" \
  --registration-type adk
```

### Via environment variables

Most flags have an env var alternative (`--metadata-file`, `--interactive`, and `--list` do not):

```bash
export AGENT_RUNTIME_ID="projects/123456/locations/us-east1/reasoningEngines/789"
export GEMINI_ENTERPRISE_APP_ID="projects/123456/locations/global/collections/default_collection/engines/my-app"
export GEMINI_DISPLAY_NAME="Production Agent"
export GEMINI_DESCRIPTION="Handles customer queries"

agents-cli publish gemini-enterprise
```

---

## Interactive Mode (`--interactive`)

Pass `--interactive` (or `-i`) to be guided through any missing values with interactive prompts. The command will list available Gemini Enterprise apps, offer to auto-detect the agent runtime ID from metadata, and prompt for display name and description.

```bash
agents-cli publish gemini-enterprise --interactive
```

---

## Complete Flag Reference

| Flag | Env Var | Description |
|------|---------|-------------|
| `--agent-runtime-id` | `AGENT_RUNTIME_ID` | Agent Runtime resource name (auto-detected from `deployment_metadata.json`) |
| `--gemini-enterprise-app-id` | `ID` or `GEMINI_ENTERPRISE_APP_ID` | Gemini Enterprise app full resource name |
| `--display-name` | `GEMINI_DISPLAY_NAME` | Display name in Gemini Enterprise |
| `--description` | `GEMINI_DESCRIPTION` | Agent description |
| `--tool-description` | `GEMINI_TOOL_DESCRIPTION` | Tool description (ADK mode only, defaults to description) |
| `--registration-type` | `REGISTRATION_TYPE` | `adk` or `a2a` (defaults to `a2a` for scaffolded agents if not set) |
| `--agent-card-url` | `AGENT_CARD_URL` | Agent card URL for A2A registration |
| `--deployment-target` | `DEPLOYMENT_TARGET` | `agent_runtime`, `cloud_run`, or `gke` (affects A2A auth method) |
| `--project-id` | `GOOGLE_CLOUD_PROJECT` | GCP project ID for billing |
| `--project-number` | `PROJECT_NUMBER` | GCP project number (used for Gemini Enterprise lookup) |
| `--authorization-id` | `GEMINI_AUTHORIZATION_ID` | OAuth authorization resource name |
| `--metadata-file` | — | Path to deployment metadata (default: `deployment_metadata.json`) |
| `--interactive` / `-i` | — | Enable interactive prompts |
| `--list` | — | List Gemini Enterprise apps in the current project and exit |

---

## Auto-Detection from Metadata

When `deployment_metadata.json` exists, the command automatically:

- Reads the **agent runtime ID** (`remote_agent_runtime_id`)
- Determines the **registration type**: defaults to **A2A** on every deployment target, since every scaffolded agent serves A2A. Opt into native ADK invocation (`:streamQuery`) with `--registration-type adk` on Agent Runtime.
- Constructs the **agent card URL** for A2A registrations on Agent Runtime. The card is served through the Agent Engine `/api` passthrough, so the URL is `https://{location}-aiplatform.googleapis.com/reasoningEngines/v1/{resource}/api/a2a/{agent_directory}/.well-known/agent-card.json` — built from `remote_agent_runtime_id` and `agent_directory` in `deployment_metadata.json` (re-deploy if the metadata predates `agent_directory`).
- Determines the **deployment target** for authentication

This means that for the simplest case (an A2A agent on Agent Runtime), you only need to provide the Gemini Enterprise app ID:

```bash
agents-cli publish gemini-enterprise \
  --gemini-enterprise-app-id projects/123456/locations/global/collections/default_collection/engines/my-app
```

---

## SDK Compatibility

Agent Runtime deployments may encounter "Session not found" errors with `google-cloud-aiplatform` versions <= 1.128.0. In interactive mode (`--interactive`), the command checks the SDK version from `uv.lock` and offers to upgrade. In programmatic mode, ensure your SDK is up to date before registering.

---

## Managing Agents in Agent Registry

Agent Registry (Preview) is the Google Cloud fleet-wide record of your agents.
Agents deployed to a managed runtime (Agent Runtime on Gemini Enterprise
Agent Platform) are **auto-registered** — no extra step after `agents-cli deploy`.
Manage them with `gcloud` (requires `roles/agentregistry.editor`):

```bash
# List / filter
gcloud alpha agent-registry agents list --project PROJECT --location LOCATION
gcloud alpha agent-registry agents list --filter="displayName:my-agent"

# Inspect
gcloud alpha agent-registry agents describe AGENT_NAME

# Update endpoint/metadata — edit the Service resource, not the Agent
gcloud alpha agent-registry services update AGENT_NAME \
  --display-name "..." --description "..." \
  --interfaces "url=ENDPOINT_URL,protocol=HTTP_JSON"

# Remove: delete the underlying runtime agent (auto-registered) OR, for
# manually registered agents, delete the Service resource
gcloud alpha agent-registry services delete AGENT_NAME
```

Docs: https://docs.cloud.google.com/agent-registry/manage-agents

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Session not found" after registration | SDK version issue — upgrade `google-cloud-aiplatform` (see SDK Compatibility above), redeploy, then re-register |
| `--registration-type is required` | Non-interactive mode needs `--registration-type` when no `deployment_metadata.json` exists |
| "Gemini Enterprise App ID is required" | Provide `--gemini-enterprise-app-id` or set the `ID` / `GEMINI_ENTERPRISE_APP_ID` env var |
| Re-publishing the same agent | Registration is idempotent — re-running updates the existing registration in place instead of creating a duplicate |
| HTTP 403 on registration | Check that your account has Discovery Engine Editor permissions on the Gemini Enterprise project |
| "Could not fetch agent card" | Verify the agent is running and the URL is correct; for Cloud Run, ensure `gcloud auth login` is done |

---

## Related Skills

- `/google-agents-cli-deploy` — Deployment targets, CI/CD pipelines, and production workflows
- `/google-agents-cli-workflow` — Development workflow, coding guidelines, and operational rules
- `/google-agents-cli-scaffold` — Project creation and enhancement with `agents-cli scaffold create` / `scaffold enhance`
