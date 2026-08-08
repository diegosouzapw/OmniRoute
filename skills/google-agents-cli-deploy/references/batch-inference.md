# Batch Inference (Cloud Run)

Invoke an ADK agent as a BigQuery Remote Function for batch inference over table rows. This requires a custom `POST /` endpoint since BQ cannot use URL paths.

> For event-driven triggers (Pub/Sub, Eventarc), use ADK's native `trigger_sources` — see `/google-agents-cli-adk-code`.

## BigQuery Remote Function

BQ sends `{"calls": [["row1"], ...], "caller": "..."}`, expects `{"replies": ["...", ...]}` in same order. BQ **cannot use URL paths** — register at `POST /`.

```python
import asyncio, json, uuid
from fastapi import Request
from google.adk.runners import Runner
from google.adk.sessions import InMemorySessionService
from google.genai import types
from my_agent.agent import root_agent

APP_NAME = "my_agent"
_trigger_session_service = InMemorySessionService()
_trigger_runner = Runner(
    agent=root_agent, app_name=APP_NAME, session_service=_trigger_session_service,
)

async def _run_agent(message_text: str, user_id: str = "trigger") -> list:
    session = await _trigger_session_service.create_session(
        app_name=APP_NAME, user_id=user_id, session_id=str(uuid.uuid4())
    )
    events = []
    async for event in _trigger_runner.run_async(
        user_id=user_id, session_id=session.id,
        new_message=types.Content(role="user", parts=[types.Part(text=message_text)]),
    ):
        events.append(event)
    return events

@app.post("/")
async def trigger_bq(request: Request):
    body = await request.json()
    calls: list = body.get("calls", [])
    user_id = body.get("caller") or body.get("sessionUser") or "bq"

    async def _process_row(row_args: list) -> str:
        text = row_args[0] if (len(row_args) == 1 and isinstance(row_args[0], str)) \
               else json.dumps(row_args)
        try:
            events = await _run_agent(text, user_id=user_id)
            return json.dumps([e.model_dump(mode="json") for e in events])
        except Exception as e:
            return f"Error: {e}"

    replies = await asyncio.gather(*[_process_row(row) for row in calls])
    return {"replies": list(replies)}
```

**BQ remote function Terraform:**

```hcl
resource "google_bigquery_routine" "my_fn" {
  routine_type    = "SCALAR_FUNCTION"
  language        = "SQL"
  definition_body = ""
  arguments {
    name          = "message"
    argument_kind = "FIXED_TYPE"
    data_type     = jsonencode({ typeKind = "STRING" })
  }
  return_type = jsonencode({ typeKind = "STRING" })
  remote_function_options {
    endpoint   = google_cloud_run_v2_service.app.uri  # root URL only
    connection = google_bigquery_connection.my_conn.name
  }
}
```
