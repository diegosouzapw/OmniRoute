# UPGRADE.md — the self-upgrade playbook (written for an agent to execute)

> **Purpose**: hand this file to Hermes (or any agent) and it can install,
> upgrade, verify, and wire up this fork without further instructions.
> Every step has a command, an expected result, and a failure rule.
> **Failure rule: if a verification fails, STOP and report — never improvise
> around a red gate.** Design intent lives in `CORE.md`; the per-build
> changelog lives in `FORK.md` (§5a–§5t); this file is the procedure.

---

## 0. Operator quickstart — the prompt to give Hermes

```
Read UPGRADE.md in the OmniRoute repo
(github.com/Ansh-Kar/OmniRoute, branch fork/parallel-execution).
Perform Option A (fresh install) — or Option B if an OmniRoute instance
already exists here. Run EVERY verification gate in §7 and report each
result. If any gate fails, stop and report; do not improvise.
Then perform §8 to wire yourself (Hermes) to OmniRoute and verify §8.6.
```

Hermes will ask for command approvals as it goes (its security model) —
approve the commands that match this file. Anything this file does not
specify is outside the mission.

## 1. What you are installing (30-second context)

A fork of OmniRoute (upstream `diegosouzapw/OmniRoute`, base `f9a1cc8`)
turned into an **agent harness**: Hermes is the executive, OmniRoute is
the model federation + advisory router, Bots are client-side specialists.
34 commits on the branch; the 28-patch artifact series (regenerable as
`git format-patch f9a1cc8..fork/parallel-execution`):

| Patches | What |
|---|---|
| 0001–0004 | Infrastructure: model tag index, parallel-agent admission + **transport patch (PR #4288)**, fork manifesto/guide, swarm combo strategy |
| 0005 | **B1** — task classifier + capability aliases |
| 0006–0007 | Guides 1 & 2 absorbed (orchestration + Hermes abstraction specs) |
| 0008 | **B2** — Hermes contract, plan vocabulary |
| 0009 | **B3** — orchestrator core, waves (dependency-ordered parallelism) |
| 0010 | **B3.5** — swarm mode, blackboard, A2A judge |
| 0011 | **B4** — Hermes combos, NIM hardening |
| 0012 | **B5** — allocator + drift + leases |
| 0013 | **B6** — cost budgets (`max_total_tokens`) |
| 0014 | **B7** — multimodal dispatch |
| 0015 | **B8** — cross-cutting hardening (compression, canaries, auto) |
| 0016 | **B9** — provider breaker (0.2×) |
| 0017 | Docs: FORK/USAGE/JOURNEY |
| 0018 | **B10** — objective orchestration (objectives/spawn/wait) |
| 0019 | **B11** — lenient bias guard (0.85) + guides verbatim |
| 0020 | **B12** — capability registry: unifiedScore, tiers, full fallback |
| 0021 | **B13** — advisory candidates + versioned registry + refresh |
| 0022 | **B14** — embeddings classification (provider `/v1/embeddings`) |
| 0023 | **B15** — decision layer: taxonomy, delegation gate, routing cache |
| 0024 | **B16** — three registries + `/v1/router/execution` + `/v1/route` |
| 0025 | **B16.1** — Hermes outcome callback (`/v1/router/outcomes`) + guide |
| 0026–0027 | `CORE.md` design constitution + provider-identity rule |
| 0028 | **B16.2** — spawn plan (embodiment on native Bot Mode) |

## 2. Preflight (run these first; report the results)

```bash
node --version          # EXPECT: >=22.22.2 <23  OR  >=24 <27 (package.json engines)
git --version           # EXPECT: any recent
npm --version           # EXPECT: >=10
df -h .                 # EXPECT: >=2 GB free (deps + build)
```

If node is outside the engine range, install a compliant Node first
(`https://nodejs.org/dist/`). Do not proceed on Node 20 or lower.

## 3. Option A — fresh install

```bash
# A1. Clone the fork directly (the branch IS the applied state)
git clone -b fork/parallel-execution https://github.com/Ansh-Kar/OmniRoute.git
cd OmniRoute
git log --oneline -1    # EXPECT: 7945f02 (or newer — see FORK.md for latest)

# A2. Dependencies
npm ci                  # or: pnpm install --frozen-lockfile (lockfile present)
                        # EXPECT: exits 0. On peer-dep friction: --legacy-peer-deps

# A3. Environment
cp .env.example .env 2>/dev/null || true   # if present; otherwise create:
#   Required minimum: API key secret + admin key. See docs/guides/USAGE.md §1.
#   DATA_DIR defaults alongside the repo — no setup needed for a first run.

# A4. Verify (§7 gates) BEFORE first start
npx tsc -p tsconfig.harness-check.json        # EXPECT: 0 errors
npm run check:openapi-coverage                 # EXPECT: PASS ≥99% (714/719)

# A5. Run
npm run dev             # dev server (or: npm run build && npm run start)
```

Smoke test (§7.4) next. Default port in docs: **20128** (check your env).

## 4. Option B — upgrade an existing fork deployment

```bash
cd <your-omniroute-checkout>
git status --short      # EXPECT: clean. If not: stash or commit first.
git remote -v           # EXPECT: origin → Ansh-Kar/OmniRoute (or add it:
                        #   git remote add fork https://github.com/Ansh-Kar/OmniRoute.git)
git fetch fork fork/parallel-execution
git log --oneline -1    # note current HEAD (your rollback point)
git merge --ff-only fork/fork/parallel-execution
                        # EXPECT: fast-forward. If it refuses, you have local
                        # commits → STOP and use Option C (rebase) instead.
npm ci                  # deps may have changed between builds
```

Then §7 gates, then restart the service (`npm run build && npm run start`,
or your process manager). No destructive DB migrations exist in the fork;
`DATA_DIR` content survives upgrades untouched.

## 5. Option C — rebase onto a newer upstream (or local commits present)

The fork is maintained as a **patch series on top of upstream base
`f9a1cc8`** (`release/v3.8.51`). To move to a newer upstream:

```bash
git clone --branch release/v3.8.51 https://github.com/diegosouzapw/OmniRoute.git fresh
cd fresh && git checkout -b fork/parallel-execution
git remote add fork https://github.com/Ansh-Kar/OmniRoute.git
git fetch fork fork/parallel-execution
git format-patch f9a1cc8..fork/fork/parallel-execution -o ../patches/
git am -3 ../patches/*.patch     # 3-way merge; EXPECT: applies clean or
                                 # resolves in files listed in changed-files/
```

Rebase rules: keep every commit's scope to its changed-files list; the
transport patch (PR #4288) MUST survive; `docs/openapi.yaml` insertions go
before `components:`; both openapi copies are checked by §7.3 (docs/ is
canonical). After resolving: full §7 gates.

## 6. Selective application (single builds)

Builds are cumulative — apply in order. To take only through B15, for
example: apply patches up to and including 0016 (see §1 numbering), or
from the repo: `git cherry-pick <first-sha>^..<last-sha>` on the fork
branch. Selective installs skip later endpoints — §7.4 smoke tests must
be limited to the endpoints your cut actually contains.

## 7. Verification gates (run after ANY change — no exceptions)

```bash
# 7.1 Types (scoped, fast)
npx tsc -p tsconfig.harness-check.json
#   EXPECT: 0 errors (42 files as of 7945f02)

# 7.2 Scoped suite (fast) + full sweep (pre-push)
npm test -- tests/unit/services/harness-b16.test.ts
#   EXPECT: 18/18 — or raw:
DISABLE_SQLITE_AUTO_BACKUP=true node --max-old-space-size=2400 \
  --import tsx/esm --import ./open-sse/utils/setupPolyfill.ts \
  --import ./tests/_setup/isolateDataDir.ts --test --test-concurrency=4 \
  --test-force-exit tests/unit/services/harness-b16.test.ts
DISABLE_SQLITE_AUTO_BACKUP=true node --max-old-space-size=2400 \
  --import tsx/esm --import ./open-sse/utils/setupPolyfill.ts \
  --import ./tests/_setup/isolateDataDir.ts --test --test-concurrency=4 \
  --test-force-exit tests/unit/services/*.test.ts
#   EXPECT: 558/558 pass (full services sweep as of 7945f02)

# 7.3 API coverage
npm run check:openapi-coverage
#   EXPECT: PASS — 99.3% (714/719)

# 7.4 Smoke tests (needs the server running + an API key)
curl -s localhost:20128/v1/route -X POST -H "Authorization: Bearer $KEY" \
  -H 'Content-Type: application/json' -d '{"task":"read this screenshot"}' \
  | jq '.primary'          # EXPECT: a model id, non-null
curl -s -X POST localhost:20128/v1/router/execution \
  -H "Authorization: Bearer $KEY" -H 'Content-Type: application/json' \
  -d '{"prompt":"survey 15 competitors and verify claims","parallelizable":true}' \
  | jq '.decision.path, (.spawn_plan.body_count // "none")'
#   EXPECT: "agent" and a body_count (4 for deep+parallelizable)
curl -s -X POST localhost:20128/v1/router/outcomes \
  -H "Authorization: Bearer $KEY" -H 'Content-Type: application/json' \
  -d '{"workflow":"smoke","sources_found":1,"success":true}' | jq .ok
#   EXPECT: true
```

Gate order matters: types → scoped suite → full sweep → coverage → smoke.
All green = upgrade complete. Any red = STOP, report the exact output.

## 8. Hermes-side wiring (client side — after OmniRoute is up)

**8.1 Add OmniRoute as a provider.** Hermes supports OpenAI-compatible
endpoints: baseURL `http://<omniroute-host>:20128/v1`, your OmniRoute API
key. All OmniRoute models appear (ids are `provider/model` qualified).

**8.2 Provider identity check (the §7 rule).**

```bash
curl -s localhost:20128/v1/models -H "Authorization: Bearer $KEY" \
  | jq -r '.data[].owned_by' | sort -u
#   EXPECT: your CONNECTION providers (e.g. openrouter, kiro)
#   WRONG: openai/anthropic (vendor labels) → fix in OmniRoute Settings:
#   the connection's provider TYPE must be the aggregator (openrouter/kiro),
#   not the vendor. CORE.md §7: provider = the connection, never the vendor.
```

**8.3 Execution policy.** Add to the executive profile's SOUL.md (or system
prompt) — verbatim from `docs/guides/AGENT_TOOL_GUIDE.md`:

> Tools are preferred for short, direct operations. Agents are preferred
> for extended, parallelizable, specialized, or multi-step operations.
> Models are selected based on task-specific capability evidence.
> Self-execution is preferred when expected quality is sufficient and
> delegation cost is not justified.

**8.4 Delegation query (cheap, Level-1).** Before delegating, POST
`/v1/route` `{task}` → `{primary, secondary, fallback, confidence}`.

**8.5 Bodies (Level-3 swarms).** When `/v1/router/execution` returns
`spawn_plan`, run `examples/hermes-embodiment/spawn-from-plan.sh plan.json`
(dry-run first; `--apply` creates the Bot profiles and dispatches missions;
`--report` closes the loop). Model pins via clone templates or Desktop
New Agent → Advanced → Model & provider pin.

**8.6 Verify the wiring.**

```bash
hermes profile list                      # bodies from any spawn exist here
curl -s "localhost:20128/v1/router/outcomes?workflow=smoke" \
  -H "Authorization: Bearer $KEY" | jq '.history | length'
#   EXPECT: ≥1 (the §7.4 smoke outcome round-tripped)
```

Then ask Hermes something needing fresh information — its answer should
route via `/v1/route` (Level 1) without spawning bodies (Level 0–1 is the
default; swarms stay exceptional).

## 9. Rollback

```bash
git log --oneline -5                     # find the pre-upgrade HEAD noted in B/step 1
git reset --hard <that-sha> && npm ci    # restart the service
```

Nothing in the fork writes destructively outside the repo: `DATA_DIR`
databases keep their data; Hermes-side wiring (§8) is independent of the
OmniRoute version and keeps working — only newer endpoints disappear.

## 10. Known traps (read before improvising)

- **Node engine is enforced** — Node ≤20 fails cryptically. Use 22.x (≥22.22.2) or 24+.
- **Shallow clones lie about history**: HEAD renders as one giant commit
  and older SHAs are "unknown revisions." Use a full clone for §5/§6.
- **`type: "research"` does not mean fresh information** — the ladder keys
  on `type: "search"` or explicit `requires_fresh_information`.
- **Provider labels come from provider TYPE** (openrouter/kiro), never
  from the model name. Vendor-prefixed model ids (`openrouter/openai/gpt-x`)
  are namespaces, not providers.
- **openapi edits**: `docs/openapi.yaml` is canonical (the checker reads
  it); `public/openapi.yaml` is a separate file — harness paths go in
  docs/ only. Insert new paths before `components:`.
- **Tests** must not use `@/` path aliases; harness suites are
  `tests/unit/services/harness-bN.test.ts`.
- **PR #4288** (transport concurrency patch) must survive every rebase.
- **Admission limits stay ≥ 2** (owner constraint).
- If a sandbox `/work` directory loses ownership: `sudo mkdir -p /work &&
  sudo chown user:user /work`, then re-run the environment setup script.

## 11. Playbook maintenance

Update this file in the same commit as any change that alters: install
steps, gate numbers (§7 expected counts), the endpoint surface (§7.4), or
the wiring surface (§8). The expected gate numbers below the commands are
the contract — a PR that changes them without updating this file is
incomplete.

State at last amendment: `7945f02` · 34 commits · gates: b16 18/18 ·
services 558/558 · tsc 0 @ 42 files · openapi 714/719 (99.3%).
