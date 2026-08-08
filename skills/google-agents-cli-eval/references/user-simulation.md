# User Simulation for Dynamic Evaluation

> File paths below reference the scaffolded layout. Adjust for your project structure if not using `/google-agents-cli-scaffold`.

## When to Use

Use user simulation when fixed prompts are impractical — the agent may ask for information in different orders or respond in unexpected ways. Instead of hand-recording every user/agent turn, let `agents-cli eval dataset synthesize` ask the Vertex AI evaluation service to generate **user scenarios** for your agent and then play each scenario against an LLM-backed user simulator. The resulting traces (with full `agent_data.turns` populated) drop straight into `agents-cli eval grade`.

A user scenario is a `starting_prompt` (the user's opening message) plus a free-text `conversation_plan` (how the simulated user should behave for the rest of the conversation). You don't author these yourself in the agents-cli flow — `eval dataset synthesize` generates them from your agent's tools and instructions.

> **For deterministic, hand-authored eval cases** (e.g., regression coverage), use the recorded-turns format instead: write `agent_data.turns` directly in your dataset and run `agents-cli eval generate` to play it back. See `references/dataset_schema.md`. `agents-cli eval generate` requires either a top-level `prompt` or `agent_data` on every case; it does **not** play hand-authored `user_scenario` cases.

---

## Running `eval dataset synthesize`

```bash
# Synthesize 3 scenarios (default), simulate them, write traces to artifacts/traces/traces_<ts>.json
agents-cli eval dataset synthesize

# Steer scenario generation with an instruction and environment context
agents-cli eval dataset synthesize \
  -n 5 \
  --max-turns 8 \
  --instruction "Customer asking about refunds" \
  --environment-context "E-commerce support; orders are visible by order_id"

# Use a custom model for scenario generation (default: service default)
agents-cli eval dataset synthesize --model gemini-2.5-pro
```

CLI flags exposed by `agents-cli eval dataset synthesize`:

| Flag                     | What it controls                                                                                                                                                                                       |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `-n / --count`           | Number of scenarios to generate (default 3)                                                                                                                                                            |
| `--instruction`          | Natural-language steering for scenario generation                                                                                                                                                      |
| `--environment-context`  | World context the simulator can rely on (e.g., available data)                                                                                                                                         |
| `--model`                | Model used for **scenario generation** (server-side; not the simulated user model)                                                                                                                     |
| `--max-turns`            | Cap on user↔agent turns per scenario (default 5)                                                                                                                                                       |
| `-o / --output`          | Output path; defaults to `artifacts/traces/traces_<ts>.json`                                                                                                                                           |
| `--project` / `--region` | GCP project / region overrides. `synthesize` defaults to the `global` eval endpoint (ignores the manifest `region`); pass `--region` only for data residency — the service rejects an unsupported one. |

**Simulator internals are NOT user-configurable from agents-cli.** The LLM-backed user simulator that plays the user side runs inside `_synthesize_runner.py` with hardcoded ADK defaults (`gemini-2.5-flash` for the user voice, default thinking config, no `custom_instructions`). Only `--max-turns` reaches it (as `LlmBackedUserSimulatorConfig.max_allowed_invocations`). There is no `eval_config.yaml` key, no `--simulator-model` flag, and no way to override `custom_instructions` or `model_configuration` short of editing `_synthesize_runner.py` directly.

---

## What `synthesize` writes

A single JSON `EvaluationDataset` file at the output path. Each case has:

- `eval_case_id` — server-generated UUID
- `user_scenario` — the generated `{starting_prompt, conversation_plan}` (preserved for traceability)
- `agent_data.turns` — the full simulated conversation: user events, agent responses, tool calls, tool responses

Because `agent_data.turns` is fully populated, the file is already a graded-ready trace. Skip `eval generate` and go straight to `eval grade`:

```bash
agents-cli eval dataset synthesize
agents-cli eval grade   # reads artifacts/traces/ by default
```

If `synthesize` fails for some scenarios, the failing cases land in the output with empty `agent_data.turns` and a stderr warning; the rest still pass through to `eval grade`.

---

## Compatible Metrics

Simulated conversations have no ground-truth response, so only reference-free metrics work:

| Metric                          | Why it works                                                     |
| ------------------------------- | ---------------------------------------------------------------- |
| `hallucination`                 | Reference-free; checks claims against tool output                |
| `safety`                        | Reference-free; static-rubric policy check                       |
| `final_response_reference_free` | Reference-free by design                                         |
| `tool_use_quality`              | Adaptive rubric — no expected trajectory needed                  |
| `multi_turn_task_success`       | Adaptive rubric judges whether the simulated user's goal was met |
| `multi_turn_trajectory_quality` | Adaptive rubric on agent reasoning across turns                  |
| `multi_turn_tool_use_quality`   | Adaptive rubric on tool calls across turns                       |

Reference-required metrics (e.g., `final_response_match`) cannot be used: simulated conversations have no ground-truth response to match against.

Example `tests/eval/eval_config.yaml` for grading synthesized traces:

```yaml
metrics_to_run:
  - hallucination
  - safety
  - multi_turn_task_success
```

Run with:

```bash
agents-cli eval grade --config tests/eval/eval_config.yaml
```

The `eval_config.yaml` file is read by `eval grade` only — `eval dataset synthesize` ignores it.

---

## Notes

- **Scenario quality depends entirely on agent metadata.** `generate_conversation_scenarios` reads your agent's instructions and tool descriptions to generate plausible user behaviors. Vague tool descriptions produce vague scenarios. Tighten tool docstrings before running synthesize on a new agent.
- **`--max-turns` is a hard cap.** The simulated user can stop earlier (when its goal is met or it gives up); `--max-turns` only prevents runaway loops.
- **Re-running synthesize generates new scenarios.** There is no seed flag — each invocation produces fresh scenarios. For repeatable regression coverage, write `agent_data.turns` directly (see `references/dataset_schema.md`) instead of relying on `synthesize`.
