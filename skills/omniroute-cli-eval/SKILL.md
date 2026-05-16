---
name: omniroute-cli-eval
description: Run and manage OmniRoute eval suites from the CLI — create suites, run benchmarks, watch live results, view scorecards, and compare model performance. Use when the user wants to benchmark models, validate quality regressions, or automate LLM evals in CI.
---

# OmniRoute — CLI Evals

Requires the `omniroute` CLI. See [CLI entry-point skill](https://raw.githubusercontent.com/diegosouzapw/OmniRoute/main/skills/omniroute-cli/SKILL.md) for install + global flags.

## What are evals?

Evals are automated test suites that score LLM outputs against expected answers or rubrics. OmniRoute stores suites and run results in its local database.

## Eval suites

```bash
omniroute eval suites list                       # List all eval suites
omniroute eval suites list --json                # JSON output

omniroute eval suites get <suiteId>              # Full suite definition
```

### Create a suite

```bash
omniroute eval suites create \
  --name "code-quality" \
  --rubric "exact-match" \
  --samples-file ./samples.jsonl                 # JSONL: {input, expected_output}
```

Rubric options: `exact-match`, `contains`, `llm-judge`, `regex`.

`--samples-file` format (one JSON object per line):

```jsonl
{"input": "What is 2+2?", "expected_output": "4"}
{"input": "Translate 'hello' to Spanish", "expected_output": "hola"}
```

## Run an eval

```bash
omniroute eval suites run <suiteId> \
  --model claude-sonnet-4-6                      # Run suite against a specific model

omniroute eval suites run <suiteId> \
  --model gpt-4o \
  --watch                                        # Live TUI progress (EvalWatch)
```

The run is asynchronous. Use `--watch` for a live terminal dashboard or poll manually:

```bash
RUN_ID=$(omniroute eval suites run <suiteId> --model claude-sonnet-4-6 --output json | jq -r '.id')
omniroute eval get $RUN_ID
```

## Manage runs

```bash
omniroute eval list                              # List all eval runs
omniroute eval list --json

omniroute eval get <runId>                       # Run details (status, model, score)
omniroute eval results <runId>                   # Per-sample results
omniroute eval scorecard <runId>                 # Full scorecard with pass/fail per sample
omniroute eval cancel <runId>                    # Cancel a running eval
```

## Scorecard output

```bash
omniroute eval scorecard <runId> --output json
```

Response fields per sample:

```json
{
  "id": "sample-1",
  "score": 0.95,
  "passed": true,
  "input": "What is 2+2?",
  "output": "4",
  "expected": "4"
}
```

## Comparing models

Run the same suite against multiple models and compare:

```bash
for MODEL in claude-sonnet-4-6 gpt-4o gemini-2.0-flash; do
  omniroute eval suites run $SUITE_ID --model $MODEL --output json | jq '{model: .model, score: .score}'
done
```

## CI integration

```bash
# Run and fail CI if score drops below threshold
SCORE=$(omniroute eval suites run $SUITE_ID --model claude-sonnet-4-6 --output json | jq -r '.score')
python3 -c "import sys; score=float('$SCORE'); sys.exit(0 if score >= 0.90 else 1)"
```

## Errors

- `suites create` fails with `invalid rubric` → use one of: `exact-match`, `contains`, `llm-judge`, `regex`
- `suites run` returns `model not found` → verify model ID with `omniroute models --search <name>`
- `eval get` shows `status: failed` → check `omniroute logs --search eval` for error details
- `scorecard` returns empty results → the run may still be `running`; poll `omniroute eval get <runId>` until `status` is `completed`
