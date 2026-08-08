# ADK Workflow API Cheatsheet

> Requires `google-adk >= 2.0.0`. Python only.
> Requires **Python >= 3.11**. The `Workflow` class itself does not support Live Streaming (`Runner.run_live`) — the graph engine needs strict control over event emission. Use a plain `Agent` for live/bidi flows. ADK 2.0 itself still ships `Runner.run_live` and `LiveRequestQueue`.

**Official docs:** [Workflows overview](https://adk.dev/workflows/index.md) ·
[Graph routes](https://adk.dev/graphs/routes/index.md) ·
[Collaboration](https://adk.dev/workflows/collaboration/index.md) ·
[Data handling](https://adk.dev/graphs/data-handling/index.md) ·
[Dynamic workflows](https://adk.dev/graphs/dynamic/index.md) ·
[Human-in-the-loop](https://adk.dev/graphs/human-input/index.md)

## 1. Core Concepts

A `Workflow` is a graph-based agent: nodes do work, edges define flow, `START` is the entry point.

```python
from google.adk.workflow import Workflow

def greet(node_input: str) -> str:
  return f"Hello, {node_input}!"

root_agent = Workflow(
    name="greeter",
    edges=[('START', greet)],
)
```

Three building blocks: **Nodes** (functions, LLM agents, tools), **Edges** (connections with optional route conditions), **START** (built-in entry receiving user input).

### Workflow Constructor

```python
root_agent = Workflow(
    name="my_workflow",
    edges=[...],                # Edge definitions (or use graph= instead)
    description="",             # Agent description
    input_schema=None,          # Pydantic model for input validation
    output_schema=None,         # Pydantic model for the workflow's output
    state_schema=None,          # Pydantic model for state validation
    rerun_on_resume=True,       # Rerun workflow on resume (default: True)
    max_concurrency=None,       # Limit parallel node execution (None = no limit)
    retry_config=None,          # Default RetryConfig applied to nodes
    timeout=None,               # Whole-workflow timeout in seconds
    wait_for_output=False,      # Wait for dynamically scheduled child output
)
```

---

## 2. Node Types

Any "NodeLike" is accepted in edges and auto-wrapped:

| Python Object       | Wrapped As                  | Default `rerun_on_resume` |
| ------------------- | --------------------------- | ------------------------- |
| Function/callable   | `FunctionNode`              | `False`                   |
| `LlmAgent`          | Internal `_LlmAgentWrapper` | `True`                    |
| Other `BaseAgent`   | Internal `AgentNode`        | `False`                   |
| `BaseTool`          | Internal `_ToolNode`        | `False`                   |
| `BaseNode` subclass | Used as-is                  | Per subclass              |

> **Auto-wrapping is the recommended approach.** Place functions, agents, and tools directly in edges — the framework wraps them automatically. You do not need to import or use internal wrapper classes directly.

---

## 3. Function Nodes

Most common node type. Parameter resolution:

| Parameter      | Source                       |
| -------------- | ---------------------------- |
| `ctx`          | Workflow `Context` object    |
| `node_input`   | Output from predecessor node |
| Any other name | `ctx.state[param_name]`      |

```python
from google.adk.agents.context import Context

def process(ctx: Context, node_input: Any, user_name: str) -> str:
  # node_input = predecessor output; user_name = ctx.state['user_name']
  # START outputs types.Content (not str) unless input_schema is set
  return f"{user_name}: {node_input}"
```

### Return Types

- **Value** -> wrapped in `Event(output=value)`, triggers downstream
- **`None`** -> no event emitted, no downstream trigger
- **`Event`** -> used directly (for routing or state updates)
- **Generator** -> yield multiple events; only the last with `output` triggers downstream

```python
from google.adk.events.event import Event

def classify(node_input: str):
  if "urgent" in node_input:
    return Event(output=node_input, route="urgent")
  return Event(output=node_input, route="normal", state={"processed": True})
```

### Auto Type Conversion

FunctionNode auto-converts `dict` inputs to Pydantic models based on type hints. Works for `list[Model]` and `dict[str, Model]` too.

### `node_input` Type by Predecessor

| Predecessor                          | `node_input` Type                             |
| ------------------------------------ | --------------------------------------------- |
| Function returning `str`/`dict`      | `str`/`dict`                                  |
| Function returning `Event(output=X)` | type of `X`                                   |
| `LlmAgent` (no `output_schema`)      | `types.Content`                               |
| `LlmAgent` (with `output_schema`)    | `dict`                                        |
| `JoinNode`                           | `dict[str, Any]` (keyed by predecessor names) |
| `ParallelWorker`                     | `list`                                        |
| `START` (no `input_schema`)          | `types.Content`                               |
| `START` (with `input_schema`)        | parsed schema type                            |

### @node Decorator & Explicit FunctionNode

```python
from google.adk.workflow import node, FunctionNode, RetryConfig

@node
def my_func(node_input: str) -> str:
  return node_input

@node(name="custom", rerun_on_resume=True)
async def my_async(node_input: str) -> str:
  return node_input

# Explicit FunctionNode for full control (func is keyword-only)
fn = FunctionNode(
    func=my_func,
    retry_config=RetryConfig(max_attempts=3),
    timeout=30.0,                          # Seconds before timeout
    parameter_binding='state',             # 'state' (default) or 'node_input'
    auth_config=None,                      # Requires rerun_on_resume=True
    state_schema=None,                     # Pydantic model for state validation
)
```

---

## 4. Edge Patterns

```python
# Sequential chain
edges = [('START', a), (a, b), (b, c)]

# Conditional routing (node returns Event with route=)
edges = [
    ('START', classifier),
    (classifier, success_handler, "success"),
    (classifier, error_handler, "error"),
    (classifier, fallback_handler, '__DEFAULT__'),  # Fallback route
]

# Fan-out (parallel branches)
edges = [('START', (branch_a, branch_b, branch_c))]

# Fan-in with JoinNode
from google.adk.workflow import JoinNode
join = JoinNode(name="merge")
edges = [((branch_a, branch_b), join), (join, final)]
# JoinNode output: {"branch_a": output_a, "branch_b": output_b}

# Looping (must have at least one routed edge — unconditional cycles rejected)
edges = [
    ('START', process),
    (process, check),
    (check, process, "continue"),
    (check, finish, "exit"),
]
```

Route values: `str`, `bool`, `int`. Multi-route fan-out: `return Event(output=x, route=["a", "b"])`. Edge matching multiple routes: `(node, target, ["route_x", "route_y"])`.

---

## 5. LLM Agent Nodes

Use `google.adk.agents.LlmAgent` in workflow edges — auto-wrapped internally, emits `Event(output=...)` for downstream data passing.

```python
from google.adk.agents import LlmAgent
from pydantic import BaseModel

class DraftOutput(BaseModel):
  title: str
  content: str

writer = LlmAgent(
    name="writer",
    model="gemini-flash-latest",
    instruction="Write a draft based on the user's request.",
    output_schema=DraftOutput,  # Always set for structured output
    output_key="draft",         # Also store in state['draft']
)

agent = Workflow(
    name="pipeline",
    edges=[('START', writer), (writer, process_draft)],
)
```

**Always use `output_schema`** (Pydantic model) on LLM agents in workflows. Without it, output is `types.Content` which may cause type errors in downstream function nodes or serialization failures with JoinNode/database sessions.

---

## 6. Parallel Processing

### ParallelWorker — process list items concurrently

```python
from google.adk.workflow import node

@node(parallel_worker=True)
def process_item(node_input: int) -> int:
  return node_input * 2

# Input: [1, 2, 3] -> Output: [2, 4, 6]
agent = Workflow(
    name="parallel",
    edges=[('START', split_input), (split_input, process_item), (process_item, collect)],
)
```

Workers named `{parent_name}@{index}`. Input must be a list. Output is a list in same order.

### Fan-Out / Fan-In — diamond pattern

```python
from google.adk.workflow import JoinNode
join = JoinNode(name="merge")
edges = [
    ('START', splitter),
    (splitter, (branch_a, branch_b)),
    ((branch_a, branch_b), join),
    (join, combiner),  # combiner receives {"branch_a": ..., "branch_b": ...}
]
```

---

## 7. Human-in-the-Loop (HITL)

HITL is a general ADK feature (app-level `ResumabilityConfig`, the `request_input` tool, `resume_inputs`) — see `adk-python.md` "Human-in-the-Loop". Inside a workflow it works per node: a node yields `RequestInput` and reads replies from `ctx.resume_inputs` (keyed by `interrupt_id`).

```python
from google.adk.events.request_input import RequestInput

async def multi_step(ctx: Context, node_input: str):
  if not ctx.resume_inputs:
    yield RequestInput(interrupt_id="ask_name", message="Name?")
    return
  if "ask_email" not in ctx.resume_inputs:
    yield RequestInput(interrupt_id="ask_email", message="Email?")
    return
  yield Event(output={"name": ctx.resume_inputs["ask_name"],
                      "email": ctx.resume_inputs["ask_email"]})
```

**Node resume behavior:** `rerun_on_resume=False` (default FunctionNode) → the user's response becomes the node output; `rerun_on_resume=True` (default LlmAgent) → the node reruns with `ctx.resume_inputs` populated. **In loops:** use a unique `interrupt_id` per iteration (e.g. `f'review_{count}'`) to avoid infinite restarts.

---

## 8. State & Events

### Context Properties

```python
from google.adk.agents.context import Context

def my_node(ctx: Context, node_input: str) -> str:
  ctx.state.get("key", "default")   # Read state
  ctx.session.id                     # Session ID
  ctx.node_path                      # "Workflow/node_name"
  ctx.node                           # Current node
  ctx.run_id                         # Current execution ID
  ctx.attempt_count                  # 1 on first attempt (1-based)
  ctx.resume_inputs                  # HITL resume data (dict keyed by interrupt_id)
  ctx.interrupt_ids                  # Active interrupt IDs
  ctx.output                         # Node's result value (settable)
  ctx.route                          # Routing value (settable)
  return "result"
```

### Dynamic Node Scheduling

```python
async def orchestrator(ctx: Context, node_input: list) -> list:
  results = []
  for i, item in enumerate(node_input):
    result = await ctx.run_node(process_item, node_input=item)
    results.append(result)
  return results
```

`ctx.run_node()` requires `rerun_on_resume=True` on the calling node. Use `use_as_output=True` to delegate the node's output to the dynamic child.

### Event Fields

| Field     | Type                   | Description                                                  |
| --------- | ---------------------- | ------------------------------------------------------------ |
| `output`  | `Any`                  | Output data for downstream nodes (must be JSON-serializable) |
| `route`   | `str\|bool\|int\|list` | Routing signal for conditional edges (sets `actions.route`)  |
| `state`   | `dict`                 | State delta to apply (sets `actions.state_delta`)            |
| `content` | `types.Content`        | Content for web UI display                                   |
| `message` | `ContentUnion`         | Alias for content (auto-converted)                           |

### State: Prefer Event over ctx.state

```python
# Preferred — persisted in event history, replayable
def save(node_input: str):
  return Event(output=node_input, state={"key": node_input})

# Avoid — side effect, may be lost on replay
def save(ctx: Context, node_input: str) -> str:
  ctx.state["key"] = node_input
  return node_input
```

### Data Serialization Rules

- `Event.output` must be JSON-serializable. BaseModel returns auto-converted via `model_dump()`.
- `output_key` stores dicts (not BaseModel instances) — `validate_schema()` -> `model_dump()`.
- `ctx.state.get(key)` returns a dict. Use `MyModel(**data)` to reconstruct typed access.

---

## 9. Retry Configuration

```python
from google.adk.workflow import FunctionNode, RetryConfig

node = FunctionNode(
    func=flaky_call,           # func is keyword-only
    retry_config=RetryConfig(
        max_attempts=5,        # Default: None (treated as 5); 1 = no retry
        initial_delay=1.0,     # Seconds before first retry
        max_delay=60.0,        # Max seconds between retries
        backoff_factor=2.0,    # Delay multiplier per attempt
        jitter=1.0,            # Randomness factor (0.0 = none)
        exceptions=None,       # Exception types to retry (None = all)
    ),
)
```

Delay formula: `min(initial_delay * backoff_factor^attempt, max_delay) * (1 + random(0, jitter))`

---

## 10. Testing

> **Note:** The testing utilities below (`testing_utils`, `InMemoryRunner`) are internal to the ADK repository. They are not part of the public `google-adk` package. For your own tests, use `App` + `InMemoryRunner` from `google.adk.runners` or write a custom test harness.

```python
import pytest
from google.adk.workflow import Workflow
from google.adk.apps import App
from google.adk.runners import InMemoryRunner
from google.genai import types

@pytest.mark.asyncio
async def test_workflow():
  def step(node_input: str) -> str:
    return "done"

  agent = Workflow(name="test", edges=[('START', step)])
  app = App(name="test_app", root_agent=agent)
  runner = InMemoryRunner(app=app)

  session = await runner.session_service.create_session(
      app_name="test_app", user_id="test_user"
  )
  async for event in runner.run_async(
      user_id="test_user",
      session_id=session.id,
      new_message=types.Content(role="user", parts=[types.Part.from_text(text="hello")]),
  ):
    if event.output is not None:
      assert event.output == "done"
```

---

## 11. Import Paths

### Workflow Core

| Component             | Import                                             |
| --------------------- | -------------------------------------------------- |
| `Workflow`            | `from google.adk.workflow import Workflow`         |
| `Edge`                | `from google.adk.workflow import Edge`             |
| `FunctionNode`        | `from google.adk.workflow import FunctionNode`     |
| `JoinNode`            | `from google.adk.workflow import JoinNode`         |
| `BaseNode`, `START`   | `from google.adk.workflow import BaseNode, START`  |
| `Node` (subclassable) | `from google.adk.workflow import Node`             |
| `@node` decorator     | `from google.adk.workflow import node`             |
| `RetryConfig`         | `from google.adk.workflow import RetryConfig`      |
| `NodeTimeoutError`    | `from google.adk.workflow import NodeTimeoutError` |
| `DEFAULT_ROUTE`       | `from google.adk.workflow import DEFAULT_ROUTE`    |

### Workflow Nodes (auto-wrapped)

Nodes are auto-wrapped when placed in edges. You do not need to import wrapper classes.

| Python Object        | How to Use                                                         |
| -------------------- | ------------------------------------------------------------------ |
| `LlmAgent`           | `from google.adk.agents import LlmAgent` — place directly in edges |
| Function/callable    | Use as-is or wrap with `@node` decorator for options               |
| `BaseTool`           | Place directly in edges                                            |
| `BaseAgent` subclass | Place directly in edges                                            |

### Events & Context

| Component      | Import                                                     |
| -------------- | ---------------------------------------------------------- |
| `Event`        | `from google.adk.events.event import Event`                |
| `RequestInput` | `from google.adk.events.request_input import RequestInput` |
| `Context`      | `from google.adk.agents.context import Context`            |

### LLM Agent

| Component  | Import                                   |
| ---------- | ---------------------------------------- |
| `LlmAgent` | `from google.adk.agents import LlmAgent` |

### App & Resumability

| Component            | Import                                           |
| -------------------- | ------------------------------------------------ |
| `App`                | `from google.adk.apps import App`                |
| `ResumabilityConfig` | `from google.adk.apps import ResumabilityConfig` |

---

## 12. Best Practices

### Use Pydantic Models, Not Raw Dicts

Always define `BaseModel` classes for node I/O, LLM `output_schema`, and structured data:

```python
# Wrong: raw dicts
def lookup(node_input: dict[str, Any]) -> dict[str, Any]:
  return {"cost": 500}

# Correct: typed schemas
class FlightInfo(BaseModel):
  cost: int
  details: str

def lookup(node_input: Itinerary) -> FlightInfo:
  return FlightInfo(cost=500, details="Economy")
```

### Emit Content Events for Web UI

`event.output` is internal — only `event.content` renders in the ADK web UI:

```python
from google.genai import types

def final_output(node_input: str):
  yield Event(content=types.Content(role='model', parts=[types.Part.from_text(text=node_input)]))
  yield Event(output=node_input)
```

LLM agents emit content events automatically. Add them explicitly for function nodes with user-facing results.

### Agent Directory Convention

```
my_workflow/
  __init__.py    # from . import agent
  agent.py       # root_agent = Workflow(...)
```

### Advanced Patterns

- **Nested workflows**: A `Workflow` can be used as a node in another workflow
- **Dynamic node scheduling**: Use `await ctx.run_node(func, node_input=item)` at runtime (requires `rerun_on_resume=True`)
- **Custom Node subclass**: Subclass `Node`, implement `run_node_impl(*, ctx, node_input)` -> `AsyncGenerator`. Supports `parallel_worker=True` flag.
- **Custom BaseNode**: Subclass `BaseNode`, implement `_run_impl(*, ctx, node_input)` -> `AsyncGenerator`

### Graph Validation Rules

1. START must exist and have no incoming edges
2. All non-START nodes must be reachable
3. No duplicate node names or edges
4. At most one `__DEFAULT__` route per node
5. No unconditional cycles (cycles need at least one routed edge)

---

## Further Reading

- [Workflows overview](https://adk.dev/workflows/index.md)
- [Graph routes & conditional edges](https://adk.dev/graphs/routes/index.md)
- [Agent collaboration & task mode](https://adk.dev/workflows/collaboration/index.md)
- [Data handling & state](https://adk.dev/graphs/data-handling/index.md)
- [Dynamic workflows](https://adk.dev/graphs/dynamic/index.md)
- [Human-in-the-loop](https://adk.dev/graphs/human-input/index.md)
- [App class (workflow container)](https://adk.dev/apps/index.md)
