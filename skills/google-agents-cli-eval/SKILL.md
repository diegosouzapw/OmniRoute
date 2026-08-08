---
name: google-agents-cli-eval
description: >
  This skill should be used when the user wants to "run an evaluation",
  "evaluate my ADK agent", "write an eval dataset", "analyze eval failures",
  "compare eval results", "optimize agent", or needs guidance on the Agent Platform
  eval methodology and the Quality Flywheel.
  Covers eval metrics, dataset schema, LLM-as-judge scoring, and common failure causes.
  Do NOT use for API code patterns (use google-agents-cli-adk-code), deployment
  (use google-agents-cli-deploy), or project scaffolding (use google-agents-cli-scaffold).
metadata:
  author: Google
  license: Apache-2.0
  version: 0.6.0
  requires:
    bins:
      - agents-cli
    install: "uv tool install google-agents-cli"
---

# Agent Evaluation Guide

> **Requires:** `agents-cli` (`uv tool install google-agents-cli`) — [install uv](https://docs.astral.sh/uv/getting-started/installation/index.md) first if needed.

> **Scaffolded project?** If you used `/google-agents-cli-scaffold`, you already have `agents-cli eval run` (chains `generate` + `grade`), `tests/eval/datasets/`, and `tests/eval/eval_config.yaml`. Start with executing `eval run` and iterate from there.

## Reference Files

| File | Contents |
|------|----------|
| `references/dataset_schema.md` | Canonical EvaluationDataset schema — all field types, JSON examples for single-turn / multi-turn / multi-agent, common mistakes |
| `references/metrics-guide.md` | Complete metrics reference — all built-in metrics, match types, custom metrics, judge model config |
| `references/user-simulation.md` | Dynamic conversation testing — `eval dataset synthesize` flags, what scenarios are, compatible metrics |
| `references/builtin-tools-eval.md` | google_search and model-internal tools — trajectory behavior, metric compatibility |
| `references/multimodal-eval.md` | Multimodal inputs — eval dataset schema, built-in metric limitations, custom evaluator pattern |

---

## The Quality Flywheel

Improving agent quality is iterative. The 5 stages below describe the loop. Each stage has a Default path (you, the coding agent, do the work directly) and an Opt-in CLI command that delegates to the Agent Platform Eval Service for better quality and scale.

### 1. Prepare Data

**Default:** Use or edit the scaffolded `tests/eval/datasets/basic-dataset.json` to define single-turn eval inputs. Start with 1–2 cases.

**Opt-in:** `agents-cli eval dataset synthesize` — runs e2e user simulation against your live agent to synthesize multi-turn eval datasets. Prefer when testing multi-turn conversations but lacking data. Output includes traces, so you can skip Stage 2 and go directly to `eval grade`.

### 2. Run Inference

`agents-cli eval generate` — executes the agent over the dataset and writes traces to `artifacts/traces/`. Run this when you wrote the dataset by hand in Stage 1 (default path). **Skip this stage if you used `eval dataset synthesize`** — that command already produced traces.

### 3. Grade Traces (always run)

`agents-cli eval grade` — scores the traces and writes `results_<ts>.{json,html}` to `artifacts/grade_results/`. No opt-in alternative; this is the core. Always run, regardless of how Stages 1 and 2 produced the traces.

> **Shortcut:** `agents-cli eval run` chains Stages 2 + 3 in one command using the default `artifacts/traces/` directory between them. Use it for the common path; drop back to the two-step form when you need a custom traces location or want to grade an existing traces file.

### 4. Analyze Failures

**Default:** Open the latest `artifacts/grade_results/results_<ts>.html` (or `.json`) and identify failed metrics — see *What to fix when scores fail* below for the fix table.

**Opt-in:** `agents-cli eval analyze` — runs LLM-based failure clustering and root-cause analysis over the grade results. Prefer when you have 10+ failing cases and want categorized failure modes instead of case-by-case reading.

### 5. Optimize & Code Fix

**Default:** Edit the agent — adjust prompts, tool descriptions, instructions, or eval dataset based on the failure analysis. See *What to fix when scores fail* below for the failure → fix mapping.

**Opt-in:** `agents-cli eval optimize` — runs ADK GEPA prompt optimization against a target metric. Suitable for prompt-only failures. The optimized prompt appears in the command output; capture it and apply it to the agent. For the full per-iteration trace, set `print_detailed_results: true` in your optimization config file.

> **Long-running and expensive.** GEPA optimization makes many LLM calls and can take a long time. Do not run it unless the user explicitly asks for prompt optimization. When you do run it, iterate as far as possible with manual fixes first, then run a **single** final `eval optimize` — never loop on this command.

### Running the loop

Iterate stages 2 → 3 → 4 → 5 → 2 (or 1 → 3 → 4 → 5 → 1 if using `synthesize`). After each fix, run `agents-cli eval compare <prev_results>.json <new_results>.json` to confirm the target metric improved without regressing others. Expect 5–10+ iterations per case before it passes — this is normal. Only after a case passes should you expand coverage with more eval cases.

When doing 5+ iterations, maintain a task list of which cases are fixed, which are still failing, and what fixes you've tried. Prevents re-attempting the same fix.

### Shortcuts That Waste Time

Recognize these rationalizations and push back — they always cost more time than they save:

| Shortcut | Why it fails |
|----------|-------------|
| "I'll tune the eval thresholds down to make it pass" | Lowering thresholds hides real failures. If the agent can't meet the bar, fix the agent — don't move the bar. |
| "This eval case is flaky, I'll skip it" | Flaky evals reveal non-determinism in your agent. Fix with `temperature=0`, rubric-based metrics, or more specific instructions — don't delete the signal. |
| "I just need to fix the eval dataset, not the agent" | If you're always adjusting expected outputs, your agent has a behavior problem. Fix the instructions or tool logic first. |

## Choosing the Right Metrics

Pick built-in metrics by what you want to measure. Multi-turn metrics evaluate the full conversation; single-turn metrics evaluate one prompt-response pair (with intermediate tool calls). When no built-in fits, write a custom metric (see *Evaluation Configuration Schema* below).

| Goal | Recommended built-in metrics |
|------|------------------------------|
| **Did the agent achieve the user's goal?** (catch-all for multi-turn agents) | `multi_turn_task_success` |
| **Was the agent's reasoning path logical and efficient?** | `multi_turn_trajectory_quality` |
| **Quality of tool / function calling across turns** | `multi_turn_tool_use_quality` |
| **Final response quality** (no ground-truth reference needed) | `final_response_quality` |
| **Factual grounding** (catch hallucinated claims, e.g., RAG agents) | `hallucination` |
| **Safety policy compliance** | `safety` |
| **Domain-specific check no built-in covers** | Write a custom `LLMMetric` (LLM-judge) or `CodeExecutionMetric` (deterministic Python). See *Evaluation Configuration Schema* below. |

Run `agents-cli eval metric list` to see all available built-ins. For full metric definitions and rubric details, see the [Agent Platform metric docs](https://cloud.google.com/gemini-enterprise-agent-platform/optimize/evaluation/manage-metrics) and `references/metrics-guide.md`.

---

## What to fix when scores fail

After `agents-cli eval grade` completes, inspect the latest `artifacts/grade_results/results_<timestamp>.json` (or open the `.html` file) for per-case scores and judge rationales — that's the input to every fix decision below.

| Failure | What to change |
|---------|---------------|
| `multi_turn_task_success` low | The agent isn't completing the user's goal — fix orchestration, missing tool calls, premature termination, or wrong tool selection |
| `multi_turn_trajectory_quality` low | The agent reaches the goal inefficiently or takes wrong steps — refine planning prompts, tighten instruction order, or remove redundant tool calls |
| `multi_turn_tool_use_quality` low | Fix tool descriptions, parameter docstrings, or agent instructions for tool selection |
| `final_response_quality` low | Read the auto-generated rubric verdicts; refine agent instructions to address the worst-scoring criterion (often clarity, completeness, or instruction-following) |
| `hallucination` low | Tighten agent instructions to stay grounded in tool output; verify the tool actually returned the data the agent claimed |
| `safety` low | Add safety guardrails to instructions; review the violating content category in the rubric verdict |
| Agent calls wrong tools | Fix tool descriptions, agent instructions, or `tool_config` |
| Agent calls extra tools | Add strict stop instructions, or switch to `multi_turn_tool_use_quality` |

After applying a fix, rerun `agents-cli eval generate && agents-cli eval grade` and use `agents-cli eval compare <prev_results>.json <new_results>.json` to confirm the fix improved the target metric without regressing others.

---

## Eval Commands

All `agents-cli eval` subcommands support `--help` for the authoritative flag list and defaults — run `agents-cli eval <subcommand> --help` (or `agents-cli eval dataset <subcommand> --help`) when in doubt. The examples below show the most common invocations; flags can change between releases.

### `eval generate`

Runs an agent over an evaluation dataset and writes traces to disk.

```bash
# Basic — uses tests/eval/datasets/, writes to artifacts/traces/
agents-cli eval generate

# Advanced — custom dataset and output dir
agents-cli eval generate --dataset tests/eval/datasets/custom.json -o ./custom_traces/
```

### `eval grade`

Scores generated traces against built-in or custom metrics. Writes timestamped `results_<YYYYMMDD_HHMMSS>.json` (consumed by `eval compare`) and `.html` (open in a browser) into the output dir, and prints a summary table to the console.

```bash
# Basic — defaults: traces from artifacts/traces/, results to artifacts/grade_results/,
# metrics from tests/eval/eval_config.yaml's metrics_to_run
agents-cli eval grade

# Advanced 1 — grade traces from a non-default location (the canonical
# pairing for `eval generate --output custom_traces/`)
agents-cli eval grade --traces custom_traces/

# Advanced 2 — pick built-in metrics, custom output dir
agents-cli eval grade --metrics tool_use_quality,safety --output ./out/

# Advanced 3 — load metrics to run from a config file (YAML or JSON) on a specified trace file.
agents-cli eval grade --traces ./artifacts/traces/trace_1.json --config tests/eval/eval_config.yaml
```

See *Evaluation Configuration Schema* below for the config file format.

### `eval compare`

Diffs two `results_*.json` files produced by `eval grade`. Run it after a fix to confirm the target metric improved without regressing others.

```bash
agents-cli eval compare baseline.json candidate.json
```

### `eval metric list`

Lists the built-in metric names usable with `eval grade --metrics`.

```bash
agents-cli eval metric list
```

### `eval analyze`

Runs LLM-based failure clustering and root-cause analysis over a `results_*.json` produced by `eval grade`. Use when you have 10+ failing cases and want categorized failure modes instead of reading the HTML case-by-case. Supported `--metric` values: `multi_turn_task_success`, `multi_turn_tool_use_quality`.

```bash
# Basic — analyze a results file with default settings
agents-cli eval analyze --eval-result artifacts/grade_results/results_<ts>.json

# Advanced — restrict to a specific metric and cap loss clusters
agents-cli eval analyze \
  --eval-result artifacts/grade_results/results_<ts>.json \
  --metric multi_turn_tool_use_quality \
  --top-k 5 \
  --output artifacts/analysis_<ts>.json
```

### `eval dataset synthesize`

Generates user scenarios server-side from your agent's tools and instructions, then plays each scenario against an LLM-backed user simulator. The output is a graded-ready trace file with full `agent_data.turns` populated — feed it directly to `eval grade` (skip `eval generate`).

```bash
# Basic — generate 3 default scenarios (up to 5 turns each) into artifacts/traces/
# (where eval grade reads from by default, so synthesize → grade works without flags)
agents-cli eval dataset synthesize

# Advanced — guide scenario generation with optional instruction and environment context
agents-cli eval dataset synthesize \
  -n 5 \
  --instruction "Customer asking about refunds" \
  --environment-context "E-commerce support" \
  --max-turns 8 \
  -o tests/eval/datasets/refund_scenarios.json
```

For scenario semantics, the full `eval dataset synthesize` flag table, and which simulator internals are not user-configurable, see `references/user-simulation.md`.

### `eval optimize`

Runs ADK GEPA prompt optimization against a target metric. Suitable after `eval grade` identifies prompt-only failures (wording, not tool/orchestration logic). `--dataset` and `--target-metric` override values in `--config` when both are passed. **Long-running and expensive — see Stage 5 of the Quality Flywheel for usage guidance.**

```bash
# Basic — optimize against a single metric on a dataset
agents-cli eval optimize --dataset tests/eval/datasets/basic-dataset.json --target-metric final_response_quality

# Advanced — drive multi-metric / multi-dataset optimization from a config file
agents-cli eval optimize --config tests/eval/optimization_config.json
```

### `eval submit` / `eval results` (cloud-side)

The managed, asynchronous counterpart to the local path, for large or CI-driven runs: `eval submit` hands the dataset and metrics to the Agent Platform Eval Service, and `eval results` polls and downloads the scores. Pass `--resource-name <agent>` to also run inference server-side (managed `generate` + `grade`); omit it to grade an existing trace (managed `grade`).

```bash
# Grade an existing trace server-side; returns a run resource name to poll
agents-cli eval submit --dataset tests/eval/datasets/basic-dataset.json --dest gs://my-bucket
# Add --resource-name projects/<p>/locations/<l>/reasoningEngines/<id> to run inference too

agents-cli eval results --run-id <run-resource-name>
```

---

## Evaluation Dataset Format

An `EvaluationDataset` is a JSON file with an `eval_cases` array. Cases come in two shapes depending on how they're used:

- **Inference input** (what you give to `eval generate`) — a user prompt or a partial conversation ending in a user prompt. The agent runs and produces traces.
- **Grading input** (what you give to `eval grade`) — a complete trace including the agent's responses and tool calls. Normally produced by `eval generate` or `eval dataset synthesize`; you don't write these by hand.

See `references/dataset_schema.md` for the full canonical schema, all field types, and common mistakes.

### Inference input format

Two shapes are supported.

**(a) Simple single-turn prompt** — what the scaffolded `tests/eval/datasets/basic-dataset.json` uses. The agent runs from scratch.

```json
{
  "eval_cases": [
    {
      "eval_case_id": "greeting",
      "prompt": {
        "role": "user",
        "parts": [{"text": "Hello, what can you help me with?"}]
      }
    },
    {
      "eval_case_id": "weather_query",
      "prompt": {
        "role": "user",
        "parts": [{"text": "What's the weather like in San Francisco?"}]
      }
    }
  ]
}
```

**(b) Multi-turn continuation via `agent_data`** — partial conversation, last turn ends with a user message. Use to continue an existing conversation; the agent's next response is what gets evaluated.

```json
{
  "eval_cases": [
    {
      "eval_case_id": "booking_followup",
      "agent_data": {
        "agents": {
          "flight_booking_agent": {
            "agent_id": "flight_booking_agent",
            "instruction": "You are a helpful flight booking assistant."
          }
        },
        "turns": [
          {
            "turn_index": 0,
            "events": [
              {"author": "user", "content": {"parts": [{"text": "I want to book a flight to Paris."}]}},
              {"author": "flight_booking_agent", "content": {"parts": [{"text": "I found a flight for $800. Do you want to book it?"}]}}
            ]
          },
          {
            "turn_index": 1,
            "events": [
              {"author": "user", "content": {"parts": [{"text": "Yes, please book it."}]}}
            ]
          }
        ]
      }
    }
  ]
}
```

### Grading input format (traces)

Complete trace — agent responses, tool calls, and tool responses all present. Normally produced by `eval generate` or `eval dataset synthesize`; shown here so you can recognize the shape when debugging.

```json
{
  "eval_cases": [
    {
      "eval_case_id": "weather_query",
      "agent_data": {
        "agents": {
          "weather_agent": {
            "agent_id": "weather_agent",
            "instruction": "You are a helpful weather assistant."
          }
        },
        "turns": [
          {
            "turn_index": 0,
            "events": [
              {"author": "user", "content": {"parts": [{"text": "What's the weather in San Francisco?"}]}},
              {"author": "weather_agent", "content": {"parts": [{"function_call": {"name": "get_weather", "args": {"city": "San Francisco"}}}]}},
              {"author": "weather_agent", "content": {"parts": [{"function_response": {"name": "get_weather", "response": {"temp_f": 62, "conditions": "foggy"}}}]}},
              {"author": "weather_agent", "content": {"parts": [{"text": "It's currently 62°F and foggy in San Francisco."}]}}
            ]
          }
        ]
      }
    }
  ]
}
```

**Key conventions:** authors are `"user"`, agent IDs from the `agents` map, or `"tool"`; tool calls use `function_call` parts and tool results use `function_response` parts. See `references/dataset_schema.md` for multi-agent examples and the full type reference.

---

## Evaluation Configuration Schema

`agents-cli eval grade --config <path>` accepts a single configuration file in either **YAML** (`.yaml` / `.yml`) or **JSON** (`.json`). The file declares two parts:

- `metrics_to_run` — the **selection list** of metric names to execute on this run. Names resolve to built-in metrics first, then to entries in `custom_metrics`.
- `custom_metrics` — a **definition pool** of custom metrics available to this project. Defining a metric here does **not** run it; it must also appear in `metrics_to_run` (or be passed via `--metrics name1,name2` on the CLI, which is equivalent to overriding `metrics_to_run` for that invocation).

**Minimal example (YAML preferred — human-readable, no JSON escaping for prompts and Python):**

```yaml
metrics_to_run:
  - multi_turn_task_success     # built-in
  - example_llm_metric          # selected from custom_metrics pool below
  - agent_turn_count            # selected from custom_metrics pool below

custom_metrics:
  - name: example_llm_metric
    prompt_template: |
      Rate the agent's response 1-5 for helpfulness and accuracy.
      Prompt: {prompt}
      Final response: {response}
      Full trace (for tool-call and reasoning context): {agent_data}
      Return JSON: {"score": <1|2|3|4|5>, "explanation": "<reason>"}

  - name: agent_turn_count
    custom_function: |
      def evaluate(instance):
          turns = (instance.get("agent_data") or {}).get("turns", [])
          return {'score': len(turns)}
```

JSON is also accepted (same field names, with `prompt_template` and `custom_function` as escaped strings) — but **always prefer YAML** for human-readable configs.

Each entry in `custom_metrics` is dispatched by field: presence of `custom_function` makes it a `CodeExecutionMetric` (deterministic Python); otherwise it's an `LLMMetric` (LLM-as-judge with `prompt_template`). Run `agents-cli eval metric list` to see available built-ins. For full custom-metric field reference (judge model options, sampling counts), see `references/metrics-guide.md`.

**Agent trace field model.** For datasets produced by `agents-cli eval generate` (or `eval dataset synthesize`), each eval case exposes three standard fields to a metric:

- `{prompt}` — the user message (or first user turn).
- `{response}` — the agent's final text response, extracted from the last text-bearing event. In `custom_function` callbacks this is `instance['response']` with shape `{"role": "model", "parts": [{"text": "..."}]}`.
- `{agent_data}` — the full structured `turns`/`events` trace, useful when the judge needs to reason about tool calls or intermediate reasoning.

`{reference}` and `{context}` resolve only when the eval case has `reference` / `context` fields populated (e.g., golden-answer datasets); they are not populated by `eval generate` / `eval dataset synthesize`.

Code-based metrics default to **local in-process execution** (no GCP project or region required, but the `evaluate(instance)` function runs with the CLI's privileges). Set `execution: "remote"` on the metric to run it server-side in Vertex AI's `CodeExecutionMetric` sandbox instead — that path requires a configured GCP project + region.

---


## Common Gotchas

### Use Rubric-Based Tool Evaluation instead of Hardcoded Sequences

Evaluating agent tool usage using strict sequence matching is fragile because agents may call helper tools (like searches or geocoding) in different orders or perform extra proactive steps.

Instead, use **`multi_turn_tool_use_quality`** / **`multi_turn_trajectory_quality`**. These metrics automatically generate content-based and intent-based adaptive rubrics, assessing technical correctness and technical sequence logic semantically using an LLM judge rather than forcing a rigid match.

### App name must match directory name

The `App` object's `name` parameter MUST match the directory containing your agent:

```python
# CORRECT - matches the "app" directory
app = App(root_agent=root_agent, name="app")

# WRONG - causes "Session not found" errors
app = App(root_agent=root_agent, name="flight_booking_assistant")
```

### Cross-session memory can't be tested in eval

Each eval case runs in its own fresh in-memory session (`eval generate` creates a new `InMemorySessionService` and session id per case). Multi-turn *within* a case works via `agent_data.turns`, but behavior that depends on a *separate prior session* — e.g. Memory Bank recall across sessions — can't be exercised by eval. Validate cross-session continuity with pytest integration tests instead.

### Vertex eval region

`eval grade`, `eval submit`, and `eval dataset synthesize` **default to the `global` endpoint** — they don't inherit the manifest `region` (the eval services support only a subset of regions). `eval analyze` is `global`-only; `eval generate` runs locally and follows the project region. So you normally don't configure anything for eval.

Override per run with `--region <REGION>` (e.g. data residency); the service rejects an unsupported one:

```
400 FAILED_PRECONDITION: Unsupported region for Vertex Evaluation Service: <region>
```

**No eval region fits your data-residency rules?** Fall back to **local custom metrics** — a `custom_metrics` entry with a `custom_function` (`execution: local`, the default) grades in-process with no GCP region required. You lose the managed built-in metrics, but your `custom_function` can still call an LLM judge in a compliant region itself — so LLM-as-judge grading stays available anywhere.

### The `before_agent_callback` Pattern (State Initialization)

Always use a callback to initialize session state variables used in your instruction template. This prevents `KeyError` crashes on the first turn:

```python
async def initialize_state(callback_context: CallbackContext) -> None:
    state = callback_context.state
    if "user_preferences" not in state:
        state["user_preferences"] = {}

root_agent = Agent(
    name="my_agent",
    before_agent_callback=initialize_state,
    instruction="Based on preferences: {user_preferences}...",
)
```

### Model thinking mode may bypass tools

Models with "thinking" enabled may skip tool calls. Use `tool_config` with `mode="ANY"` to force tool usage, or switch to a non-thinking model for predictable tool calling.

---

## Common Eval Failure Causes

| Symptom | Cause | Fix |
|---------|-------|-----|
| Agent mentions data not in tool output | Hallucination | Tighten agent instructions; add `hallucination` metric |
| "Session not found" error | App name mismatch | Ensure App `name` matches directory name |
| Score fluctuates between runs | Non-deterministic model | Set `temperature=0` or use rubric-based eval with multiple samples |
| `tool_use_quality` score low | Wrong tool selected or invalid arguments passed | Refine tool descriptions, instructions, or parameter documentation |
| LLM judge ignores image/audio in eval | `get_text_from_content()` skips non-text parts | Use custom metric with vision-capable judge (see `references/multimodal-eval.md`) |

---

## Debugging Example

User says: "tool_use_quality is low, what's wrong?"

1. Open the latest `artifacts/grade_results/results_<timestamp>.html` (or read the `.json`) and find the rubric verdicts the adaptive metric generated for the failing case.
2. Verify whether the agent selected the wrong tool, or called it with wrong arguments — the trace lives in `artifacts/traces/`.
3. Refine the tool's parameters, Python docstring description, or the agent's tool selection instructions to guide the model better.
4. Rerun `agents-cli eval generate && agents-cli eval grade`.
5. `agents-cli eval compare <prev>.json <new>.json` to confirm the score improved.

---

## Proving Your Work

Don't assert that eval passes — show the evidence. Concrete output prevents false confidence and catches issues early.

- **After running eval:** Paste the scores table output so the user can see exactly what passed and failed.
- **After fixing a failure:** Show before/after scores for the specific case you fixed, and confirm no other cases regressed.
- **Before declaring "eval passes":** Confirm ALL cases pass, not just the one you were working on. Run `agents-cli eval generate` and `agents-cli eval grade` one final time.
- **Before moving to deploy:** Show the final `agents-cli eval grade` output with all cases above threshold. This is the gate — no exceptions.

---

## Related Skills

- `/google-agents-cli-workflow` — Development workflow and the spec-driven build-evaluate-deploy lifecycle
- `/google-agents-cli-adk-code` — ADK Python API quick reference for writing agent code
- `/google-agents-cli-scaffold` — Project creation and enhancement with `agents-cli scaffold create` / `scaffold enhance`
- `/google-agents-cli-deploy` — Deployment targets, CI/CD pipelines, and production workflows
- `/google-agents-cli-observability` — Cloud Trace, logging, and monitoring for debugging agent behavior
