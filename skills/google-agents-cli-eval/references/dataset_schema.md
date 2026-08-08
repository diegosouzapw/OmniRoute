# Evaluation Dataset Schema

Canonical formats for evaluation datasets in the Agent Platform Evaluation
SDK. The summary below covers the type tree as of the version this skill
targets — for the live, authoritative definitions see the public SDK source:
[`types/evals.py`](https://github.com/googleapis/python-aiplatform/blob/main/vertexai/_genai/types/evals.py)
and [`types/common.py`](https://github.com/googleapis/python-aiplatform/blob/main/vertexai/_genai/types/common.py).

## Core Types

```
EvaluationDataset
└── eval_cases: list[EvalCase]       # List of evaluation cases

EvalCase
├── prompt: Content                          # Single-turn: the user query
├── responses: list[ResponseCandidate]       # Single-turn: model response(s); list to support multi-candidate eval
├── reference: ResponseCandidate             # Ground truth (for reference-based metrics)
├── agent_data: AgentData                    # Multi-turn: full conversation trajectory
├── rubric_groups: dict[str, RubricGroup]    # Per-case rubrics; key is referenced from LLMMetric.rubric_group_name
└── (extra fields allowed)                   # Custom fields for custom metrics

ResponseCandidate
└── response: Content                # The actual Content (role + parts)

AgentData
├── agents: dict[str, AgentConfig]   # Agent definitions
└── turns: list[ConversationTurn]    # Ordered conversation turns

ConversationTurn
├── turn_index: int                  # 0-based turn number
└── events: list[AgentEvent]         # Events within this turn

AgentEvent
├── author: str                      # "user", agent_id, or "tool"
└── content: Content                 # Content with role and parts
```

> **Note on `responses` and `reference`.** Both wrap a `Content` inside a `ResponseCandidate` object. So a single-turn case writes `"responses": [{"response": {"role": "model", "parts": [...]}}]` and `"reference": {"response": {"role": "model", "parts": [...]}}` — NOT a bare `Content`. `prompt` and `agent_data.turns[].events[].content` are bare `Content` (not wrapped).

## Single-Turn Dataset

For simple prompt-response evaluation (e.g., QA, summarization).

```json
{
  "eval_cases": [
    {
      "eval_case_id": "capital_of_france",
      "prompt": {
        "role": "user",
        "parts": [{ "text": "What is the capital of France?" }]
      },
      "responses": [
        {
          "response": {
            "role": "model",
            "parts": [{ "text": "The capital of France is Paris." }]
          }
        }
      ],
      "reference": {
        "response": {
          "role": "model",
          "parts": [{ "text": "Paris" }]
        }
      }
    },
    {
      "eval_case_id": "summarize_article",
      "prompt": {
        "role": "user",
        "parts": [{ "text": "Summarize this article: ..." }]
      },
      "responses": [
        {
          "response": {
            "role": "model",
            "parts": [{ "text": "The article discusses..." }]
          }
        }
      ]
    }
  ]
}
```

### Required fields by metric type

| Metric category          | Required fields                             |
| ------------------------ | ------------------------------------------- |
| Predefined (single-turn) | `prompt`, `responses`                       |
| Computation-based        | `responses`, `reference`                    |
| Translation              | `prompt` (source), `responses`, `reference` |
| Custom LLM/code          | Fields referenced in your template/function |

## Multi-Turn / Multi-Agent Dataset

For evaluating multi-turn agent conversations, including systems with
multiple collaborating agents and tool calls. The `agents` map declares
all participating agents; `turns` is the chronological conversation,
where each `event` author is `"user"`, an agent ID from the `agents`
map, or `"tool"`.

```json
{
  "eval_cases": [
    {
      "eval_case_id": "flight_booking_via_specialist",
      "agent_data": {
        "agents": {
          "router": {
            "agent_id": "router",
            "agent_type": "RouterAgent",
            "instruction": "Route requests to the appropriate specialist."
          },
          "flight_bot": {
            "agent_id": "flight_bot",
            "agent_type": "SpecialistAgent",
            "instruction": "Search and book flights.",
            "tools": [
              {
                "function_declarations": [
                  {
                    "name": "search_flights",
                    "description": "Search flights by destination",
                    "parameters": {
                      "type": "OBJECT",
                      "properties": {
                        "destination": { "type": "STRING" }
                      }
                    }
                  }
                ]
              }
            ]
          }
        },
        "turns": [
          {
            "turn_index": 0,
            "events": [
              {
                "author": "user",
                "content": {
                  "parts": [{ "text": "Book a flight to NYC" }]
                }
              },
              {
                "author": "router",
                "content": {
                  "parts": [{ "text": "Routing to flight_bot." }]
                }
              }
            ]
          },
          {
            "turn_index": 1,
            "events": [
              {
                "author": "flight_bot",
                "content": {
                  "parts": [
                    {
                      "function_call": {
                        "name": "search_flights",
                        "args": { "destination": "NYC" }
                      }
                    }
                  ]
                }
              },
              {
                "author": "flight_bot",
                "content": {
                  "parts": [
                    {
                      "function_response": {
                        "name": "search_flights",
                        "response": { "flights": [{ "id": "AA123", "price": 320 }] }
                      }
                    }
                  ]
                }
              },
              {
                "author": "flight_bot",
                "content": {
                  "parts": [{ "text": "Found AA123 to NYC for $320." }]
                }
              }
            ]
          }
        ]
      }
    }
  ]
}
```

For a single-agent multi-turn case, omit the extra agent definitions
and use one entry in `agents`.

## Per-Case Rubrics (`rubric_groups`)

`EvalCase.rubric_groups` is a dict of named rubric groups attached to a specific eval case. Use this when you want a rubric-based `LLMMetric` to evaluate against case-specific criteria rather than a globally-defined rubric. The metric references a group by name via `LLMMetric.rubric_group_name`; the **name on the metric must match a key under `rubric_groups`** in the matching `EvalCase`.

```json
{
  "eval_cases": [
    {
      "eval_case_id": "booking_confirmation",
      "prompt": { "role": "user", "parts": [{ "text": "Book my flight to Paris." }] },
      "rubric_groups": {
        "booking_rubrics": {
          "rubrics": [
            {
              "rubric_id": "confirmation_check",
              "content": {
                "property": {
                  "description": "The model must confirm the booking and provide a reference number."
                }
              }
            },
            {
              "rubric_id": "no_speculation",
              "content": {
                "property": {
                  "description": "The response must not speculate about prices or availability beyond what tools returned."
                }
              }
            }
          ]
        }
      }
    }
  ]
}
```

In `eval_config.yaml`, an `LLMMetric` then references the group by name:

```yaml
custom_metrics:
  - name: booking_quality
    rubric_group_name: booking_rubrics # must match the key above
    prompt_template: |
      ...
```

If `rubric_group_name` is omitted on the metric, the metric runs without per-case rubrics. If the name is set but doesn't match any key in the case's `rubric_groups`, the rubrics for that case are simply not applied (no error).

## Common Mistakes

| Mistake                                      | Fix                                       |
| -------------------------------------------- | ----------------------------------------- |
| Using `role="assistant"`                     | Use `role="model"` (Vertex convention)    |
| Missing `turn_index`                         | Always set sequential 0-based indices     |
| Tool response without `function_response`    | Wrap in a `function_response` part        |
| Using `prompt` field for multi-turn          | Use `agent_data` with the full trajectory |
| Mixing `prompt` and `agent_data` in one case | Use one or the other per `EvalCase`       |
