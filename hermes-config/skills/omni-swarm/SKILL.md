# omni-swarm — dynamic specialist swarm over OmniRoute

Run subtasks as a team: independent ones simultaneously, dependent ones in
sequential waves, workers picked per-subtask from live OmniRoute data
(capability match + local workload ledger). Synthesize at the end.

## 0. Bounds (non-negotiable)

- Max **8 parallel workers** (swarm.ts `maxConcurrency`; fork increases from 4 to 8 for wider swarms on fat hosts). More splits must become sequential waves.
- One MoE-panel invocation per task max (`moe` profile / `moa:omniroute-moe`).
- Never re-fire a slot that just failed with rate-limit/quota/dead-model.
  Fall back to `omniroute-duo` (2 proven refs) or a single best model instead.
- Trivial single-step tasks: do NOT swarm. L0 self-execution stays default.
- Cross-task diversity enforced: different tasks → different models from catalog when candidates allow (tag index `distinctModels: true, diverseProviders: true`).

## 1. Decompose

Split the goal into subtasks with explicit deps:
`A, B independent → wave 1 together; C needs A+B → wave 2`.
Sequential dependencies MUST be waves, never parallel.

## 2. List capable agents (live)

```bash
curl -s --max-time 20 http://localhost:20128/v1/models \
  -H "Authorization: Bearer $HERMES_CUSTOM_LOCALHOST_20128_API_KEY" \
| python3 -c "import json,sys; [print(m['id']) for m in json.load(sys.stdin).get('data',[])]"
```

If OmniRoute is unreachable, stop: do not guess model IDs, do the task yourself.

## 3. Rank by capability + past workload

Read the ledger `~/.hermes/omni-swarm/ledger.json`
(`{model: {ok, fail, ema_ms, last}}`; missing file = no history, proceed):

- Capability match by model-ID signals (first filter):
  code: `coder`, `claude`, `deepseek`, `qwen`, `kimi`, `nemotron`, `codestral`
  reasoning: `reasoning`, `super`, `opus`, `qwq`, `r1`, `think`
  chat/fast: `haiku`, `flash`, `lite`, `nano`, `gemma`, `mini`
  vision: `vision`, `vl`, `multimodal` (plus `claude`/`gemini` families)
  image-gen: `flux`, `stability-ai`, `segmind`, `lmarena` (image-generation providers)
- Prefer ledger `ok/(ok+fail)` high and `ema_ms` low; skip models failing
  recently (quota-dead). Skip `-low/-medium/-high` effort-suffixed Kiro IDs
  (rejected by Kiro's live catalog) and image/search/grounding IDs (not chat).
- Spread workers across providers (never stack all 8 on one account).
- Provider diversity is enforced at the **provider token** level, not model-ID level:
  - Hub prefixes (`nvidia`, `hf`, `huggingface`, `together`, `fireworks`, `azure`, `bedrock`) use two path segments: `nvidia/moonshotai` and `nvidia/deepseek-ai` are **distinct providers** — picking one blocks the other in the same swarm.
  - All other prefixes use only the first segment: `kiro`, `lma`, `kr`, `zc`, etc. So `kiro/claude-haiku-4.5` and `kr/claude-haiku-4.5` are **different providers** even though both proxy Anthropic upstream — they are allowed to coexist.
  - "Provider" means the OmniRoute account/gateway, not the upstream model vendor.
- Dynamic model spawning: models resolved per-task from live OmniRoute catalog
  via `POST /v1/router/candidates` with capability filter (chat/reasoning/vision/image-gen).
  Tag specs (`fromTags`) re-resolve on every dispatch against the model tag index,
  ensuring cross-task diversity.
- Subtasks specify `capability: "vision"` or `fromTags: { category: "image-gen" }`
  for image generation; other capabilities use `chat`, `coder`, or `reasoning`.

## 4. Execute

Independent subtasks → one headless call each, launched together:

```bash
hermes chat --oneshot -m <model-id> -q "<self-contained subtask prompt>" &
# ... launch all wave members, then:
wait
```

Dependent wave → run only after its deps return, embedding their outputs
in the next prompt (`Context from <dep>: ...`).

Durable/multi-hour DAGs → `hermes kanban swarm --worker default:"<t1>" \
  --worker default:"<t2>" --verifier default --synthesizer default "<goal>"`
(use `--synthesizer moe` only for the final hard synthesis).

## 5. Record outcomes (past workload for next time)

After every swarm, append results to the ledger (stdlib only):

```bash
python3 <<'EOF'
import json, time, os
p = os.path.expanduser("~/.hermes/omni-swarm/ledger.json")
try: ledger = json.load(open(p))
except Exception: ledger = {}
# results: list of {"model": m, "ok": bool, "ms": int}
for r in RESULTS:
    e = ledger.setdefault(r["model"], {"ok": 0, "fail": 0, "ema_ms": 5000})
    e["ok" if r["ok"] else "fail"] += 1
    e["ema_ms"] = round(0.7 * e["ema_ms"] + 0.3 * r["ms"])
    e["last"] = int(time.time())
os.makedirs(os.path.dirname(p), exist_ok=True)
json.dump(ledger, open(p, "w"), indent=1)
EOF
```

Replace RESULTS with the actual per-worker outcomes before running.

## 6. Synthesize

Judge each part (correct? complete? right format?). Retry a below-bar part
once with a sharper prompt (different model if it failed), max 2 retries,
then synthesize the final answer and attribute delegated work.
