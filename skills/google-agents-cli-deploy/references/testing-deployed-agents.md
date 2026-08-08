# Testing Your Deployed Agent

## Quick Test (Recommended)

The fastest way to test any deployed agent is the `run --url` command — it handles authentication, session creation, and streaming automatically:

```bash
# A2A protocol
agents-cli run --url https://my-agent-abc123.run.app --mode a2a "Hello, what can you do?"

# ADK streaming API
agents-cli run --url https://my-agent-abc123.run.app --mode adk "Hello, what can you do?"

# Agent Runtime (auto-detected from URL — works with either mode)
agents-cli run --url https://LOCATION-aiplatform.googleapis.com/v1/projects/PROJECT/locations/LOCATION/reasoningEngines/ID --mode adk "Hello!"

# Custom auth header (overrides auto-detected credentials)
agents-cli run --url https://my-agent.run.app --mode a2a -H "Authorization: Bearer my-token" "Hello!"
```

The `--mode` flag is required with `--url`: use `adk` for the ADK streaming API (`/run_sse`, or `:streamQuery` for Agent Runtime) or `a2a` for the A2A protocol. Agent Runtime URLs are detected automatically. Add `-v` for full JSON event payloads.

> On Agent Runtime, Agent Engine exposes the whole container under an `/api/...` HTTP passthrough (`https://{location}-aiplatform.googleapis.com/reasoningEngines/v1/{resource}/api/<path>`), so the container's own routes — `/run_sse`, `/a2a/{app_name}`, etc. — are also reachable there. (This is separate from the reasoning_engine adapter, which serves only `/api/reasoning_engine` + `/api/stream_reasoning_engine` for the native `:streamQuery` contract.)

Auth is auto-detected via Google Cloud credentials. Use `--header` / `-H` to override.

For more control (scripting, direct curl), see the target-specific sections below.

---

## Agent Runtime Deployment

Beyond the `run --url` quick test above, you can query the deployment directly.

**Option 1: Python Script**

```python
import json
import vertexai

with open("deployment_metadata.json") as f:
    engine_id = json.load(f)["remote_agent_runtime_id"]

client = vertexai.Client(location="us-east1")
agent = client.agent_engines.get(name=engine_id)

async for event in agent.async_stream_query(message="Hello!", user_id="test"):
    print(event)
```

**Option 2: Playground**

```bash
agents-cli playground
```

## Cloud Run Deployment

> **Auth required by default.** Cloud Run deploys with `--no-allow-unauthenticated`, so all requests need an `Authorization: Bearer` header with an identity token. Getting a 403? You're likely missing this header. To allow public access, redeploy with `--allow-unauthenticated`.

```bash
SERVICE_URL="https://SERVICE_NAME-PROJECT_NUMBER.REGION.run.app"
AUTH="Authorization: Bearer $(gcloud auth print-identity-token)"

# Test health endpoint
curl -H "$AUTH" "$SERVICE_URL/"

# Step 1: Create a session (required before sending messages)
curl -X POST "$SERVICE_URL/apps/app/users/test-user/sessions" \
  -H "Content-Type: application/json" \
  -H "$AUTH" \
  -d '{}'
# → returns JSON with "id" — use this as SESSION_ID below

# Step 2: Send a message via SSE streaming
curl -X POST "$SERVICE_URL/run_sse" \
  -H "Content-Type: application/json" \
  -H "$AUTH" \
  -d '{
    "app_name": "app",
    "user_id": "test-user",
    "session_id": "SESSION_ID",
    "new_message": {"role": "user", "parts": [{"text": "Hello!"}]}
  }'
```

> **Common mistake:** Using `{"message": "Hello!", "user_id": "...", "session_id": "..."}` returns `422 Field required`. The ADK HTTP server expects the `new_message` / `parts` schema shown above, and the session must already exist.

## GKE Deployment

GKE LoadBalancer services are **internal by default**. See `references/gke.md` for curl examples and endpoint details.

## Load Tests

See `tests/load_test/README.md` for configuration, default settings, and CI/CD integration details. Load tests run automatically during the staging CD pipeline stage.
