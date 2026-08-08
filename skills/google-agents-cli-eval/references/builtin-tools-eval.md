# Evaluating Agents with `google_search` and Built-in Tools

## google_search Behavior (IMPORTANT)

`google_search` is NOT a regular tool — it's a **model-internal grounding feature**.

**Key behavior:**

- Custom tools (`save_preferences`, `save_feedback`) → appear as `function_call` in trajectory
- `google_search` → NEVER appears in trajectory (happens inside the model)

**How google_search works internally:**

```python
llm_request.config.tools.append(
    types.Tool(google_search=types.GoogleSearch())  # Injected into model config
)
```

Search results come back as `grounding_metadata`, not function call/response events. But the evaluator STILL detects it at the session level:

```json
{
  "error_code": "UNEXPECTED_TOOL_CALL",
  "error_message": "Unexpected tool call: google_search"
}
```

This causes `multi_turn_tool_use_quality` to fail for agents whose **only** tool is `google_search` — the evaluator flags an unexpected tool call it can never see in the trace. For agents that also call function tools, the metric still scores those function-tool calls (see metric compatibility below).

**Metric compatibility for `google_search` agents:**

| Metric                        | Usable? | Why                                                                                                                                                                           |
| ----------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `multi_turn_tool_use_quality` | NO      | Always fails due to unexpected google_search (the `google_search` invocation is detected by the evaluator but never appears as a `function_call` / `function_response` event) |
| `final_response_quality`      | YES     | Adaptive rubric-based evaluation; works without a reference answer                                                                                                            |
| `final_response_match`        | NO      | Search results vary across runs, so the agent's response rarely matches a fixed reference                                                                                     |

**Dataset best practices for `google_search` agents:**

```json
{
  "eval_cases": [
    {
      "eval_case_id": "news_digest_test",
      "prompt": {
        "role": "user",
        "parts": [{ "text": "Give me my news digest." }]
      }
      // NO trajectory criteria for google_search - it won't appear in the trace anyway
    }
  ]
}
```

For agents that mix `google_search` with custom function tools, grade the custom tool usage with `multi_turn_tool_use_quality` — it judges the tool calls in the generated trace, so you don't hand-author expected calls. Optionally add a `reference` response for reference-based matching:

```json
{
  "eval_case_id": "news_digest_feedback",
  "prompt": {
    "role": "user",
    "parts": [{ "text": "Great, save my positive feedback." }]
  },
  "reference": {
    "response": {
      "role": "model",
      "parts": [{ "text": "Feedback saved!" }]
    }
  }
}
```

The `google_search` invocation still won't appear in the trace, so `multi_turn_tool_use_quality` only assesses the function-tool calls (e.g., `save_feedback`).

**Config for `google_search` agents (`eval_config.yaml`):**

```yaml
metrics_to_run:
  - final_response_quality
```

The built-in `final_response_quality` is sufficient for most `google_search` agents; it auto-generates a content-based rubric. Define a custom override in `custom_metrics` only if you need project-specific judge instructions — see SKILL.md's _Evaluation Configuration Schema_ for the override pattern.

**Bottom line:** `google_search` is a model feature, not a function tool. You cannot test it with trajectory matching. Use `final_response_quality` to verify the agent produces grounded, cited responses.

---

## ADK Built-in Tools: Trajectory Behavior Reference

**Model-Internal Tools (DON'T appear in trajectory):**

| Tool                      | In Trajectory? | Eval Strategy |
| ------------------------- | -------------- | ------------- |
| `google_search`           | No             | Rubric-based  |
| `google_search_retrieval` | No             | Rubric-based  |
| `BuiltInCodeExecutor`     | No             | Check output  |
| `VertexAiSearchTool`      | No             | Rubric-based  |
| `url_context`             | No             | Rubric-based  |

These inject into `llm_request.config.tools` as model capabilities:

```python
types.Tool(google_search=types.GoogleSearch())
types.Tool(code_execution=types.ToolCodeExecution())
types.Tool(retrieval=types.Retrieval(...))
```

**Function-Based Tools (DO appear in trajectory):**

| Tool            | In Trajectory? | Eval Strategy                       |
| --------------- | -------------- | ----------------------------------- |
| `load_web_page` | Yes            | `multi_turn_tool_use_quality` works |
| Custom tools    | Yes            | `multi_turn_tool_use_quality` works |
| AgentTool       | Yes            | `multi_turn_tool_use_quality` works |

These generate `function_call` and `function_response` events:

```python
types.Tool(function_declarations=[...])
```

**Quick Reference — Can I use `multi_turn_tool_use_quality`?**

- `google_search` → NO (model-internal)
- `code_executor` → NO (model-internal)
- `VertexAiSearchTool` → NO (model-internal)
- `url_context` → NO (model-internal)
- `load_web_page` → YES (FunctionTool)
- Custom functions → YES (FunctionTool)

**When mixing both types** (e.g., `google_search` + `save_preferences`):

1. Rely on `final_response_quality` for overall quality, OR
2. Keep `multi_turn_tool_use_quality` — it assesses the function-tool calls that do appear in the trace, accepting that the `google_search` step is invisible to it

**Rule of Thumb:**

- If a tool provides grounding/retrieval/execution capabilities built into Gemini → model-internal, won't appear in trajectory
- If it's a Python function you can call → appears in trajectory

### Model thinking mode may bypass tools

Models with "thinking" enabled may decide they have sufficient information and skip tool calls. Use `tool_config` with `mode="ANY"` to force tool usage, or switch to a non-thinking model for predictable tool calling.

### Mock mode for external APIs

When your agent calls external APIs, add mock mode so evals can run without real credentials:

```python
def call_external_api(query: str) -> dict:
    api_key = os.environ.get("EXTERNAL_API_KEY", "")
    if not api_key or api_key == "dummy_key":
        return {"status": "success", "data": "mock_response"}
    # Real API call here
```
