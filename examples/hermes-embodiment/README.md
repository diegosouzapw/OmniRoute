# Hermes embodiment — spawning bodies from an OmniRoute spawn plan

**Bodies for brains.** OmniRoute's `/v1/router/execution` returns a
`spawn_plan` when the ladder escalates to an agent: N specialist bodies
(Hermes Bot Mode bots = profiles), each with a pinned brain (model), a
toolset, a mission, and a wave — plus a judge that synthesizes. This
directory is the Hermes-side half: it consumes the plan and drives
**native Bot Mode surface only** (no Hermes core patches, guide §21).

## The native mapping (what Bot Mode does itself)

| Plan field | Native capability (Desktop ≥ v0.20.3) |
|---|---|
| `bodies[].name` / `.description` | `hermes profile create <name> --description "…"` |
| `bodies[].model` | New Agent → **Advanced → Model & provider pin** (unset = inherit launch profile) |
| `bodies[].tools` / `.skills` | Edit Profile → per-toolset / per-skill / per-MCP enablement |
| `bodies[].memory_bank` | Hindsight `bank_id` — shared mission bank for the swarm |
| `coordination.mode: group_room` | Group chat: **2–6 bots, ≤3 rounds, ≤10 msgs/turn**, @name pulls, @user "needs you" |
| `coordination.mode: inbox_handoffs` | `hermes -p <bot> chat --in ~ -c "Bot Chat" -Q -q "…"` (per-invocation delivery) |
| `sustained` | `hermes cron` — routine namespaced `[bot:<name>] <routine>` |
| `report` | `POST /v1/router/outcomes` (B16.1 — the closed loop) |

## Prerequisites

- Hermes Desktop ≥ v0.20.3 with Bot Mode on (default) — `hermes --version`
- OmniRoute added in Hermes as an OpenAI-compatible provider (its models
  then appear in the Model & provider pin picker)
- `jq` + `curl` on the machine running Hermes

## Usage

```bash
# 1. Get a plan (OmniRoute answers "who/what + how many bodies?")
curl -s -X POST "$OMNIROUTE_URL/v1/router/execution" \
  -H "Authorization: Bearer $OMNIROUTE_KEY" -H 'Content-Type: application/json' \
  -d '{"prompt": "survey 15 competing agent harnesses and verify their routing claims", "parallelizable": true}' \
  | jq '.spawn_plan' > plan.json

# 2. Dry-run (default): print exactly what would run
bash spawn-from-plan.sh plan.json

# 3. Execute: create the bot profiles + dispatch missions
bash spawn-from-plan.sh plan.json --apply

# 4. Group rooms: open the roster group in Desktop → group header →
#    "Open chat" — rooms are UI-native; the script tells you the roster.

# 5. When the mission lands, close the loop:
bash spawn-from-plan.sh plan.json --report \
  OMNIROUTE_URL=https://… OMNIROUTE_KEY=… sources_found=14 sources_verified=12 \
  quality_score=0.91 latency_ms=38000 success=true
```

## Model pins

The plan pins each body's brain (`bodies[].model` — provider-qualified,
e.g. `openrouter/openai/gpt-5.4` for the judge). Pins are applied through
native surfaces, in order of preference:

1. **Template clone** (fully scriptable): keep one pre-pinned profile per
   role and edit `bodies[].clone_from` in plan.json —
   `hermes profile create <name> --clone-from <template> --description "…"`.
2. **Desktop**: New Agent → Advanced → Model & provider pin.
3. **In-session**: `/model <id> --global` inside the bot's chat persists
   the profile default.

`model: null` in the plan means "inherit the launch profile" — native
default, no action needed.

## Standing rules (CORE.md)

- **Advisory**: the plan never spawns anything by itself — you (or your
  Hermes policy) decide. `--apply` is the explicit human decision.
- **Swarm is exceptional**: a spawn_plan only exists when the ladder
  escalated to agent; most tasks finish at Level 0–1 with zero bodies.
- **OmniRoute never executes bodies** — bodies run in YOUR runtime; the
  router advises and consumes outcomes.
