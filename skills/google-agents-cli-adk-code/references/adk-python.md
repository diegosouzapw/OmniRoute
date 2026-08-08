# ADK Python Cheatsheet

## 1. Core Concepts & Project Structure

### Essential Primitives

- **`Agent`**: The core intelligent unit. Can be `LlmAgent` (LLM-driven) or `BaseAgent` (custom/workflow).
- **`Tool`**: Callable function providing external capabilities (`FunctionTool`, `AgentTool`, etc.).
- **`Session`**: A stateful conversation thread with history (`events`) and short-term memory (`state`).
- **`State`**: Key-value dictionary within a `Session` for transient conversation data.
- **`Runner`**: The execution engine; orchestrates agent activity and event flow.
- **`Event`**: Atomic unit of communication; carries content and side-effect `actions`.

### Standard Project Layout

```
your_project_root/
├── <agent_name>/ or app/    # Agent code directory
│   ├── __init__.py
│   ├── agent.py            # Contains root_agent definition
│   ├── tools.py            # Custom tool functions
│   └── .env                # Environment variables
├── tests/
│   ├── eval/
│   │   ├── eval_config.yaml    # Eval criteria and thresholds
│   │   └── datasets/           # Eval datasets (JSON)
│   ├── integration/
│   └── unit/
└── pyproject.toml or requirements.txt
```

---

## 2. Agent Definitions (`LlmAgent`)

### Basic Setup

```python
from google.adk.agents import Agent

def get_weather(city: str) -> dict:
    """Returns weather for a city."""
    return {"status": "success", "weather": "sunny", "temp": 72}

my_agent = Agent(
    name="weather_agent",
    model="gemini-flash-latest",
    instruction="You help users check the weather. Use the get_weather tool.",
    description="Provides weather information.",  # Important for multi-agent delegation
    tools=[get_weather]
)
```

### Key Configuration Options

```python
from google.genai import types as genai_types
from google.adk.agents import Agent

agent = Agent(
    name="my_agent",
    model="gemini-flash-latest",
    instruction="Your instructions here. Use {state_key} for dynamic injection.",
    description="Description for delegation.",

    # LLM generation parameters
    generate_content_config=genai_types.GenerateContentConfig(
        temperature=0.2,
        max_output_tokens=1024,
    ),

    # Save final output to state
    output_key="agent_response",

    # Control history sent to LLM
    include_contents='default',  # 'default' or 'none'

    # Delegation control
    disallow_transfer_to_parent=False,
    disallow_transfer_to_peers=False,

    # Sub-agents for delegation
    sub_agents=[specialist_agent],

    # Tools
    tools=[my_tool],

    # Callbacks
    before_agent_callback=my_callback,
    after_agent_callback=my_callback,
    before_model_callback=my_callback,
    after_model_callback=my_callback,
    before_tool_callback=my_callback,
    after_tool_callback=my_callback,
)
```

### Structured Output with Pydantic

> **Warning**: Using `output_schema` disables tool calling and delegation.

```python
from pydantic import BaseModel, Field
from typing import Literal

class Evaluation(BaseModel):
    grade: Literal["pass", "fail"] = Field(description="The evaluation result.")
    comment: str = Field(description="Explanation of the grade.")

evaluator = Agent(
    name="evaluator",
    model="gemini-flash-latest",
    instruction="Evaluate the input and provide structured feedback.",
    output_schema=Evaluation,
    output_key="evaluation_result",
)
```

### Instruction Best Practices

```python
# Use dynamic state injection with {state_key} placeholders
instruction = """
You are a {role} assistant.
User preferences: {user_preferences}

Rules:
- Always use tools when available
- Never make up information
"""
```

---

## 3. Orchestration with Workflow Agents

Workflow agents provide deterministic control flow without LLM orchestration.

> These are `BaseAgent`-family composites (`SequentialAgent`, `ParallelAgent`, `LoopAgent`). For the new graph-based Workflow API introduced in ADK 2.0, see `references/adk-workflows.md`.

### SequentialAgent

Executes sub-agents in order. State changes propagate to subsequent agents.

```python
from google.adk.agents import SequentialAgent, Agent

summarizer = Agent(
    name="summarizer",
    model="gemini-flash-latest",
    instruction="Summarize the input.",
    output_key="summary"
)

question_gen = Agent(
    name="question_generator",
    model="gemini-flash-latest",
    instruction="Generate questions based on: {summary}"
)

pipeline = SequentialAgent(
    name="pipeline",
    sub_agents=[summarizer, question_gen],
)
```

### ParallelAgent

Executes sub-agents concurrently. Use distinct `output_key`s to avoid race conditions.

```python
from google.adk.agents import ParallelAgent, SequentialAgent, Agent

fetch_a = Agent(name="fetch_a", ..., output_key="data_a")
fetch_b = Agent(name="fetch_b", ..., output_key="data_b")

merger = Agent(
    name="merger",
    instruction="Combine data_a: {data_a} and data_b: {data_b}"
)

pipeline = SequentialAgent(
    name="full_pipeline",
    sub_agents=[
        ParallelAgent(name="fetchers", sub_agents=[fetch_a, fetch_b]),
        merger
    ]
)
```

### LoopAgent

Repeats sub-agents until `max_iterations` or an event with `escalate=True`.

```python
from google.adk.agents import LoopAgent

refinement_loop = LoopAgent(
    name="refinement_loop",
    sub_agents=[evaluator, refiner, escalation_checker],
    max_iterations=5,
)
```

For a production LoopAgent with EscalationChecker, BuiltInPlanner, and grounding citations, see `/google-agents-cli-workflow` Phase 1.

---

## 4. Multi-Agent Systems & Communication

### Communication Methods

1.  **Shared State**: Agents read/write `session.state`. Use `output_key` for convenience.

2.  **LLM Delegation**: Agent transfers control to a sub-agent based on reasoning.

    ```python
    coordinator = Agent(
        name="coordinator",
        instruction="Route to sales_agent for sales, support_agent for help.",
        sub_agents=[sales_agent, support_agent],
    )
    ```

3.  **AgentTool**: Invoke another agent as a tool (parent stays in control).

    ```python
    from google.adk.tools import AgentTool

    root = Agent(
        name="root",
        tools=[AgentTool(specialist_agent)],
    )
    ```

4.  **Task Delegation (ADK 2.0)**: Set `mode` on a sub-agent for structured, schema-typed delegation — the coordinator gets a `request_task_{name}` tool; the sub-agent returns typed output via the auto-injected `finish_task` tool.
    ```python
    from pydantic import BaseModel

    class ResearchOutput(BaseModel):
        summary: str

    researcher = Agent(
        name="researcher",
        model="gemini-flash-latest",
        mode="task",                        # 'chat' (default) | 'task' | 'single_turn'
        output_schema=ResearchOutput,
        description="Researches a topic.",  # required for delegation
        instruction="Research the topic, then call finish_task.",
    )
    coordinator = Agent(name="coordinator", model="gemini-flash-latest", sub_agents=[researcher])
    ```
    Modes: `task` (multi-turn, structured I/O) · `single_turn` (autonomous, no user turn). Sub-agents need a `description`; default I/O schemas (`goal`/`background` in, `result` out) are used if none set. Disabled inside graph `Workflow`s.

---

## 5. Building Custom Agents (`BaseAgent`)

For custom orchestration logic beyond workflow agents.

```python
from google.adk.agents import BaseAgent
from google.adk.agents.invocation_context import InvocationContext
from google.adk.events import Event, EventActions
from typing import AsyncGenerator

class ConditionalRouter(BaseAgent):
    async def _run_async_impl(
        self, ctx: InvocationContext
    ) -> AsyncGenerator[Event, None]:
        # Read state
        user_type = ctx.session.state.get("user_type", "regular")

        # Custom routing logic
        if user_type == "premium":
            agent = self.premium_agent
        else:
            agent = self.regular_agent

        # Run selected agent
        async for event in agent.run_async(ctx):
            yield event

class EscalationChecker(BaseAgent):
    """Stops a LoopAgent when condition is met."""
    async def _run_async_impl(
        self, ctx: InvocationContext
    ) -> AsyncGenerator[Event, None]:
        result = ctx.session.state.get("evaluation")
        if result and result.get("grade") == "pass":
            yield Event(author=self.name, actions=EventActions(escalate=True))
        else:
            yield Event(author=self.name)
```

---

## 6. Models Configuration

### Google Gemini (Default)

```python
# AI Studio (dev)
# Set: GOOGLE_API_KEY, GOOGLE_GENAI_USE_VERTEXAI=False

# Vertex AI (prod)
# Set: GOOGLE_CLOUD_PROJECT, GOOGLE_CLOUD_LOCATION, GOOGLE_GENAI_USE_VERTEXAI=True

agent = Agent(model="gemini-flash-latest", ...)
```

### Other Models via LiteLLM

```python
from google.adk.models.lite_llm import LiteLlm

agent = Agent(model=LiteLlm(model="openai/gpt-4o"), ...)
agent = Agent(model=LiteLlm(model="anthropic/claude-sonnet-4-20250514"), ...)
agent = Agent(model=LiteLlm(model="ollama_chat/llama3:instruct"), ...)
```

### Vertex AI Native Models

```python
from google.adk.models import Gemini

# Vertex AI hosted Gemini (set GOOGLE_GENAI_USE_VERTEXAI=True)
agent = Agent(model=Gemini(model="gemini-flash-latest"), ...)
```

Provider guides: [Anthropic](https://adk.dev/agents/models/anthropic/index.md), [Ollama](https://adk.dev/agents/models/ollama/index.md), [vLLM](https://adk.dev/agents/models/vllm/index.md), [LiteLLM](https://adk.dev/agents/models/litellm/index.md)

---

## 7. Tools: The Agent's Capabilities

### Function Tool Basics

```python
from google.adk.tools import ToolContext

def search_database(
    query: str,
    limit: int,
    tool_context: ToolContext  # Optional, for state access
) -> dict:
    """Searches the database for records matching the query.

    Args:
        query: The search query string.
        limit: Maximum number of results to return.

    Returns:
        dict with 'status' and 'results' keys.
    """
    # Access state if needed
    user_id = tool_context.state.get("user_id")

    # Tool logic here
    results = db.search(query, limit=limit, user=user_id)

    return {"status": "success", "results": results}
```

**Tool Rules:**

- Use clear docstrings (sent to LLM)
- Type hints required, NO default values
- Return a dict (JSON-serializable)
- Don't mention `tool_context` in docstring

### ToolContext Capabilities

```python
async def my_tool(query: str, tool_context: ToolContext) -> dict:
    # Read/write state
    tool_context.state["key"] = "value"

    # Trigger escalation (stops LoopAgent)
    tool_context.actions.escalate = True

    # Artifacts — see Artifacts section below for full API
    await tool_context.save_artifact("file.txt", part)

    # Memory search
    results = await tool_context.search_memory("query")

    return {"status": "success"}
```

### Built-in Tools

```python
from google.adk.tools import google_search
from google.adk.tools import VertexAiSearchTool
from google.adk.tools.load_web_page import load_web_page
from google.adk.code_executors import BuiltInCodeExecutor

# Google Search grounding
agent = Agent(tools=[google_search], ...)

# Agent Platform Search grounding (your own data)
agent = Agent(tools=[VertexAiSearchTool(data_store_id="projects/P/locations/L/collections/default_collection/dataStores/DS")], ...)

# Web page loading
agent = Agent(tools=[load_web_page], ...)

# Code execution (model-internal)
agent = Agent(code_executor=BuiltInCodeExecutor(), ...)

# Managed sandbox (Vertex AI Code Interpreter) — see /google-agents-cli-workflow Phase 1
# from google.adk.code_executors import VertexAiCodeExecutor
# agent = Agent(code_executor=VertexAiCodeExecutor(optimize_data_file=True, stateful=True), ...)

```

> **`google_search` is model-internal grounding, not a regular tool.** Mixing it with FunctionTools disables Automatic Function Calling (AFC) for all tools. If you need search alongside custom tools, consider a sub-agent architecture or a custom search function — see the [deep-search sample](https://github.com/google/adk-samples/tree/main/python/agents/deep-search) for a working pattern. For eval implications, see the eval guide's `builtin-tools-eval` reference.

### Tool Confirmation

```python
from google.adk.tools import FunctionTool

# Simple confirmation
sensitive_tool = FunctionTool(delete_record, require_confirmation=True)

# Conditional confirmation
def needs_approval(amount: float, **kwargs) -> bool:
    return amount > 1000

transfer_tool = FunctionTool(transfer_money, require_confirmation=needs_approval)
```

### Human-in-the-Loop (pause & resume)

Pause a run to ask the user something, then resume. This is a general runtime feature (not workflow-specific). Enable resumption at the app level:

```python
from google.adk.apps import App, ResumabilityConfig

app = App(name="my_app", root_agent=root_agent,
          resumability_config=ResumabilityConfig(is_resumable=True))
```

- **Let the model ask:** add the built-in `request_input` tool (`from google.adk.tools import request_input`) to `tools=` — the model calls it when it needs clarification.
- **Approval gate inside a tool:** `tool_context.request_confirmation(hint="Approve this transfer?")`, or `FunctionTool(fn, require_confirmation=...)` (above).
- **Custom long-running tool:** wrap a function with `LongRunningFunctionTool(fn)` to pause until an external result arrives.

The user's reply is read from `ctx.resume_inputs` (available on `ToolContext` and `CallbackContext`). Inside graph workflows the same mechanism is node-based — see `adk-workflows.md` §7.

### Tool Authentication

| Auth Type           | Pattern                                                                                                                       |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| API Key             | `token_to_scheme_credential("apikey", "query", "apikey", "KEY")` → `auth_scheme, auth_credential`                             |
| Service Account     | `service_account_dict_to_scheme_credential(config, scopes=[...])` → `auth_scheme, auth_credential`                            |
| OAuth2 / OIDC       | `AuthCredential(auth_type=AuthCredentialTypes.OAUTH2, oauth2=OAuth2Auth(client_id=..., client_secret=...))`                   |
| Custom FunctionTool | `tool_context.request_credential(AuthConfig(...))` to initiate, `tool_context.get_auth_response(AuthConfig(...))` to retrieve |

Helpers: `from google.adk.tools.openapi_tool.auth.auth_helpers import token_to_scheme_credential, service_account_dict_to_scheme_credential`. Pass `auth_scheme` + `auth_credential` to `OpenAPIToolset(...)`. [Full docs](https://adk.dev/tools-custom/authentication/)

### OpenAPI Tools

```python
from google.adk.tools.openapi_tool.openapi_spec_parser.openapi_toolset import OpenAPIToolset

toolset = OpenAPIToolset(spec_str=open("openapi.json").read(), spec_str_type="json")
agent = Agent(name="api_agent", tools=[toolset], ...)
```

Pass `auth_scheme` + `auth_credential` from the auth helpers above for authenticated APIs. Tool names derive from `operationId` (snake_case, max 60 chars). [Full docs](https://adk.dev/tools-custom/openapi-tools/index.md)

### MCP Tools

Connect to MCP servers to use external tools. Use `StdioConnectionParams` for local dev, `SseConnectionParams` for production.

```python
from google.adk.tools.mcp_tool import McpToolset
from google.adk.tools.mcp_tool.mcp_session_manager import StdioConnectionParams, SseConnectionParams
from mcp import StdioServerParameters

# Local MCP server via stdio
agent = Agent(
    name="my_agent",
    tools=[
        McpToolset(
            connection_params=StdioConnectionParams(
                server_params=StdioServerParameters(
                    command="npx",
                    args=["-y", "@modelcontextprotocol/server-filesystem", "/absolute/path"],
                ),
            ),
            tool_filter=["list_directory", "read_file"],  # optional: restrict exposed tools
        )
    ],
    ...
)

# Remote MCP server via SSE (production)
McpToolset(
    connection_params=SseConnectionParams(url="https://mcp.example.com/sse"),
)
```

**Gotchas:**

- Paths must be absolute, not relative.
- Agent definition must be synchronous (not async) for deployment.
- Node.js/npx required for npm-based MCP servers — add to Dockerfile if containerizing.

---

## 8. Context, State, and Memory

| Need                                                          | Solution                                                                                                            |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Within one conversation (task data, form state)               | Session state — see [State Prefixes](#state-prefixes) and [Session Service Options](#session-service-options) below |
| Across conversations (remember interactions, learn over time) | Memory Bank — see [Memory](#memory-long-term-knowledge) below                                                       |

### State Prefixes

```python
# Session-specific (default)
state["booking_step"] = 2

# User-persistent (across sessions)
state["user:preferred_language"] = "en"

# App-wide (all users)
state["app:total_queries"] = 1000

# Temporary (current invocation only)
state["temp:intermediate_result"] = data
```

### Session Service Options

```python
from google.adk.sessions import InMemorySessionService
# For dev: InMemorySessionService()
# For prod: VertexAiSessionService(), DatabaseSessionService()
```

### Session Rewind

Roll back a session to the state before a specific invocation (useful for debugging or user-initiated undo):

```python
from google.adk.runners import InMemoryRunner

runner = InMemoryRunner(agent=root_agent, app_name="my_app")

# Rewind to state before a given invocation
await runner.rewind_async(
    user_id=user_id,
    session_id=session.id,
    rewind_before_invocation_id=invocation_id,  # exclusive: state before this call
)
```

> **Note**: Restores session-level state and artifacts only; app/user-scoped state is unaffected.

### Artifacts (File Storage)

Store and retrieve binary data (PDFs, images, audio) scoped to session or user:

```python
from google.adk.artifacts import InMemoryArtifactService, GcsArtifactService
from google.genai import types

# Configure runner with artifact service
runner = Runner(
    agent=root_agent,
    app_name="app",
    session_service=session_service,
    artifact_service=InMemoryArtifactService(),  # or GcsArtifactService(bucket_name="my-bucket")
)

# In a tool or callback:
async def save_file(data: bytes, tool_context: ToolContext) -> dict:
    part = types.Part(inline_data=types.Blob(mime_type="application/pdf", data=data))
    version = await tool_context.save_artifact("report.pdf", part)       # session-scoped
    await tool_context.save_artifact("user:profile.png", part)           # user-scoped
    artifact = await tool_context.load_artifact("report.pdf")            # latest version
    artifact_v0 = await tool_context.load_artifact("report.pdf", version=0)
    names = await tool_context.list_artifacts()
    return {"status": "saved", "version": version}
```

**Namespace prefixes:** plain name = session-scoped · `"user:"` = persistent across sessions

### Memory (Long-term Knowledge)

#### InMemoryMemoryService (Dev)

In-memory implementation for local development. Memories don't persist across restarts.

```python
from google.adk.memory import InMemoryMemoryService

memory_service = InMemoryMemoryService()
# Add session to memory after conversation
await memory_service.add_session_to_memory(session)
# Search later
results = await memory_service.search_memory(app_name=app_name, user_id=user_id, query="query")
```

#### Memory Bank (Long-term Memory)

Managed cross-session memory that persists user preferences, remembers facts across sessions, and learns from conversations over time. See the [`memory-bank` sample](https://github.com/google/adk-samples/tree/main/python/agents/memory-bank) for a complete implementation.

```python
from google.adk.agents.callback_context import CallbackContext
from google.adk.tools.preload_memory_tool import PreloadMemoryTool

# PreloadMemoryTool retrieves memories at the start of each turn and injects
# them into the system instruction. Alternative: LoadMemoryTool() — the model
# calls it on-demand when it decides memories are needed.
root_agent = Agent(
    ...,
    tools=[PreloadMemoryTool()],
    after_agent_callback=generate_memories_callback,
)

# Alternative: callback_context.add_events_to_memory(events=...) to send only
# a subset of events, which is better for incremental processing.
async def generate_memories_callback(callback_context: CallbackContext):
    """Sends the session's events to Memory Bank for memory generation."""
    await callback_context.add_session_to_memory()
    return None
```

### Context Caching

Cache large context windows (system prompt + docs) to reduce latency and cost. Transparent to agent code.

```python
from google.adk.apps import App
from google.adk.agents.context_cache_config import ContextCacheConfig

app = App(
    name="my_app",
    root_agent=root_agent,
    context_cache_config=ContextCacheConfig(
        min_tokens=2048,     # only cache if context exceeds this
        ttl_seconds=1800,    # cache lifetime (default 1800)
        cache_intervals=10,  # re-cache every N invocations
    ),
)
```

### Context Compaction

Prevent context overflow on long sessions by summarizing older events in a sliding window:

```python
from google.adk.apps import App
from google.adk.apps.app import EventsCompactionConfig
from google.adk.apps.llm_event_summarizer import LlmEventSummarizer
from google.adk.models import Gemini

app = App(
    name="my_app",
    root_agent=root_agent,
    events_compaction_config=EventsCompactionConfig(
        compaction_interval=20,  # summarize every 20 events
        overlap_size=3,          # include last 3 events in next window for continuity
        # Optional: custom summarizer model
        summarizer=LlmEventSummarizer(llm=Gemini(model="gemini-flash-latest")),
    ),
)
```

### App Name

The `App(name=...)` parameter **must match the agent directory name** (default: `app`). A mismatch causes "Session not found" errors during evaluation because the runner infers the app name from the directory path.

```python
# CORRECT — matches the "app" directory
app = App(name="app", root_agent=root_agent)

# WRONG — causes eval failures
app = App(name="my_custom_agent", root_agent=root_agent)
```

---

## 9. Callbacks

### Callback Types

```python
from google.adk.agents.callback_context import CallbackContext
from google.adk.models.llm_request import LlmRequest
from google.adk.models.llm_response import LlmResponse
from google.adk.tools import BaseTool, ToolContext
from google.genai import types as genai_types

# Callbacks are invoked by keyword — parameter names must match exactly.

# Agent lifecycle
async def before_agent_callback(callback_context: CallbackContext) -> None:
    callback_context.state["started"] = True

async def after_agent_callback(callback_context: CallbackContext) -> genai_types.Content | None:
    # Return None to continue, or Content to override
    return None

# Model interaction
async def before_model_callback(callback_context: CallbackContext, llm_request: LlmRequest) -> LlmResponse | None:
    # Return None to continue, or LlmResponse to skip model call
    return None

async def after_model_callback(callback_context: CallbackContext, llm_response: LlmResponse) -> LlmResponse | None:
    # Return None to continue, or modified LlmResponse
    return None

# Tool execution
async def before_tool_callback(tool: BaseTool, args: dict, tool_context: ToolContext) -> dict | None:
    # Return None to continue, or dict to skip tool and use as result
    return None

async def after_tool_callback(tool: BaseTool, args: dict, tool_context: ToolContext, tool_response: dict) -> dict | None:
    # Return None to continue, or modified dict
    return None
```

### Common Pattern

```python
# Initialize state before agent runs
async def init_state(callback_context: CallbackContext) -> None:
    if "preferences" not in callback_context.state:
        callback_context.state["preferences"] = {}

agent = Agent(before_agent_callback=init_state, ...)
```

---

## 10. Plugins

Global callback hooks across all agents/tools/LLMs. Use for cross-cutting concerns (logging, guardrails); use callbacks for per-agent logic.

```python
from google.adk.plugins.base_plugin import BasePlugin
from google.adk.apps import App

class MyPlugin(BasePlugin):
    async def before_model_callback(self, *, callback_context, llm_request):
        return None  # return None to observe, return value to intervene

# Register via App — plugins run BEFORE agent-level callbacks
app = App(name="my_app", root_agent=root_agent, plugins=[MyPlugin()])
runner = Runner(app=app, session_service=...)
```

Built-in plugins: `ReflectAndRetryToolPlugin` (retry failed tools), `BigQueryAgentAnalyticsPlugin` (log to BQ), `ContextFilterPlugin` (reduce context size), `GlobalInstructionPlugin` (shared system prompt), `SaveFilesAsArtifactsPlugin`, `LoggingPlugin`, `DebugLoggingPlugin`, `MultimodalToolResultsPlugin`.

Hooks: `before/after_agent_callback`, `before/after_model_callback`, `before/after_tool_callback`, `on_model_error_callback`, `on_tool_error_callback`, `on_user_message_callback`, `before/after_run_callback`, `on_event_callback`. [Full docs](https://adk.dev/plugins/index.md)

### Safety Guardrails

Use `before_model_callback` to filter input or `after_model_callback` to filter output. Return `None` to pass through, or return a modified `LlmResponse` to block/replace. Evaluate with the `safety` metric. [Full docs](https://adk.dev/safety/index.md)

---

## 11. A2A Protocol

Requires `pip install google-adk[a2a]`.

```python
# Expose an agent as an A2A service
# Prefer scaffolding over manual code — scaffold a normal `adk` agent; A2A is built in (see /google-agents-cli-scaffold)
from google.adk.a2a.utils.agent_to_a2a import to_a2a
from a2a.types import AgentCard
to_a2a(root_agent, port=8001)

# Consume a remote A2A agent
from google.adk.agents.remote_a2a_agent import RemoteA2aAgent, AGENT_CARD_WELL_KNOWN_PATH
remote = RemoteA2aAgent(
    name="remote_agent",
    description="...",
    agent_card=f"http://remote-host:8001{AGENT_CARD_WELL_KNOWN_PATH}",
)
```

### A2UI

Agents can return declarative UI via [a2ui](https://github.com/google/A2UI) (cards, forms, charts; rendered client-side over A2A) instead of plain text. Public preview; current release v0.9.1 (v1.0 release candidate). Docs: https://github.com/google/A2UI/tree/main/docs · ADK guide: https://adk.dev/integrations/a2ui/index.md

```python
# pip install a2ui-agent-sdk
from a2ui.core.schema.manager import A2uiSchemaManager
from a2ui.basic_catalog.provider import BasicCatalog
from a2ui.a2a import create_a2ui_part, parse_response_to_parts

# 1. Build the system prompt from a component catalog
manager = A2uiSchemaManager(...)        # loads catalog(s) + few-shot examples
instruction = manager.generate_system_prompt(...)

# 2. Use it as the agent instruction
root_agent = Agent(name="ui_agent", model="gemini-flash-latest", instruction=instruction)

# 3. Validate the model's JSON output, then wrap as an A2A DataPart
#    (MIME application/a2ui+json) via a2ui.a2a before streaming to the client.
```

Runnable samples: https://github.com/google/A2UI/tree/main/samples/agent/adk

---

## 12. Event-Driven / Ambient Agents

Ambient agents process events (Pub/Sub, Eventarc, schedules) autonomously. ADK provides built-in trigger endpoints that handle payload decoding, session creation, concurrency, and retries.

> **Deployment:** `trigger_sources` registers `/apps/{app}/trigger/*` on the standard FastAPI app, so it works on **all** targets. On **Cloud Run** / **GKE** the endpoints are public HTTP routes you point a Pub/Sub push subscription or Eventarc trigger at. On **Agent Runtime** the same routes are reachable through Agent Engine's `/api` passthrough (`https://{location}-aiplatform.googleapis.com/reasoningEngines/v1/{resource}/api/apps/{app}/trigger/pubsub`). The scaffolded `fast_api_app.py` does not pass `trigger_sources` by default — add it to enable these endpoints.

```python
from google.adk.cli.fast_api import get_fast_api_app

app = get_fast_api_app(
    agents_dir=AGENTS_DIR,
    web=False,
    trigger_sources=["pubsub", "eventarc"],  # enables /apps/{app}/trigger/pubsub and /apps/{app}/trigger/eventarc
)
```

```bash
# CLI equivalent for local dev
adk api_server --trigger_sources "pubsub,eventarc" path/to/your/agent
```

Trigger endpoints handle: base64 decoding, CloudEvent parsing, per-event session creation (UUID), concurrency semaphore, and exponential backoff on transient errors.

| Setting                    | Default | Environment Variable           |
| -------------------------- | ------- | ------------------------------ |
| Max concurrent invocations | 10      | `ADK_TRIGGER_MAX_CONCURRENT`   |
| Max retry attempts         | 3       | `ADK_TRIGGER_MAX_RETRIES`      |
| Base backoff delay         | 1.0s    | `ADK_TRIGGER_RETRY_BASE_DELAY` |
| Max backoff delay          | 30.0s   | `ADK_TRIGGER_RETRY_MAX_DELAY`  |

Sessions are ephemeral by default (`InMemorySessionService`); use `DatabaseSessionService` for audit trails. Pub/Sub and Eventarc have a 10-minute processing limit. For non-GCP sources, use `adk api_server --auto_create_session` with the `/run` endpoint instead.

**Scheduled / cron execution:** Use Cloud Scheduler to publish to a Pub/Sub topic on a cron schedule, then connect the topic to the agent's `/apps/{app}/trigger/pubsub` endpoint. This is how you implement "run daily at 8 PM" — no custom scheduling code needed.

Since ambient agents have no interactive user, route outputs via structured logging (JSON stdout → Cloud Logging → Cloud Monitoring alerts), Pub/Sub, or tool-based integrations (email, Jira, Slack).

**Before implementing an ambient agent, clone and study the production sample** — it covers trigger wiring, middleware, structured logging, and Terraform. See the Notable Samples table in `/google-agents-cli-workflow` Phase 1. [Full docs](https://adk.dev/runtime/ambient-agents/).

---

## Quick Reference

### Running Agents Programmatically

```python
from google.adk.runners import Runner
from google.adk.sessions import InMemorySessionService
from google.genai import types

session_service = InMemorySessionService()
await session_service.create_session(app_name="app", user_id="user", session_id="s1")
runner = Runner(agent=my_agent, app_name="app", session_service=session_service)

async for event in runner.run_async(
    user_id="user", session_id="s1",
    new_message=types.Content(role="user", parts=[types.Part.from_text(text="Hello!")]),
):
    if event.is_final_response():
        print(event.content.parts[0].text)
```

### ADK Built-in Tool Imports (Precision Required)

```python
# CORRECT - imports the tool instance
from google.adk.tools.load_web_page import load_web_page

# WRONG - imports the module, not the tool
from google.adk.tools import load_web_page
```

Pass the imported tool directly to `tools=[load_web_page]`, not `tools=[load_web_page.load_web_page]`.

### Factory Functions for Sub-agents

Use factory functions (not module-level instances) to avoid "agent already has a parent" errors. Always **call** the factory — passing the function reference fails with `ValidationError: Input should be a valid dictionary or instance of BaseAgent`.

```python
def create_researcher():
    return Agent(name="researcher", ...)

root_agent = SequentialAgent(
    sub_agents=[create_researcher(), create_analyst()],  # call the functions!
    ...
)
```

Data flows between sequential sub-agents via conversation history and `output_key` state.

### Further Reading

- [ADK Documentation](https://adk.dev/llms.txt)
- [ADK Samples](https://github.com/google/adk-samples)
- `/google-agents-cli-workflow` Phase 1 — curated production patterns (VertexAiCodeExecutor, BuiltInPlanner, grounding metadata, rate limiting, state capture)

---

## Inspecting ADK Source Code

When you need to look up ADK internals, inspect the installed package directly:

```bash
# Find the ADK package location (use "uv run python" if using uv)
python -c "import google.adk; print(google.adk.__path__[0])"
```

### ADK Package Directory Map

```
google/adk/
├── agents/           # Agent types (LlmAgent, BaseAgent, SequentialAgent, etc.)
├── tools/            # Tool implementations (FunctionTool, google_search, etc.)
├── sessions/         # Session services (InMemory, Database, VertexAI)
├── memory/           # Memory services
├── runners.py        # Runner and execution engine
├── events/           # Event types and actions
├── models/           # Model integrations (Gemini, LiteLLM, etc.)
├── code_executors/   # Code execution (BuiltInCodeExecutor, etc.)
├── evaluation/       # Eval framework (criteria, evaluators, etc.)
├── cli/              # ADK CLI internals (used by agents-cli playground, eval, etc.)
├── flows/            # LLM flow implementations
├── artifacts/        # Artifact services
└── auth/             # Authentication helpers
```

Use Glob/Grep/Read on the installed package to find exact implementations, method signatures, and configuration options.

For the full ADK documentation index, use `curl https://adk.dev/llms.txt`.
