# RFC: Auto-Assessment & Self-Healing Combo Engine

## Summary

Omniroute's combo system currently requires manual configuration: users must know which providers and models are actually working, then manually wire them into combo chains. When providers fail (rate limits, auth errors, model deprecation), combos silently degrade — routing to dead endpoints that timeout or return errors. There is no automated way to:

1. **Discover** which provider/model pairs actually respond to chat completions
2. **Categorize** models by capability (coding, reasoning, vision, speed, etc.)
3. **Self-heal** combos by removing dead models and promoting working ones
4. **Auto-generate** sensible combo configurations from available providers

This proposes an **Auto-Assessment Engine** that continuously tests, categorizes, and self-heals combo configurations — making omniroute truly "plug and play" for non-technical users.

---

## Problem Statement

### What we encountered (real production incident)

While configuring omniroute for production use, we discovered:

- **44 combos had models from providers that returned "`Invalid model`" errors** — `kiro/claude-opus-4.6`, `kiro/claude-sonnet-4.6`, `gh/claude-sonnet-4.5` all fail with 400/404
- **No automated way to know which models actually work** — the `/v1/models` endpoint lists 1,236 models, but `/v1/chat/completions` fails for most of them
- **Weight-based routing sends traffic to dead models** — a model weighted at 30% that returns errors wastes 30% of requests
- **Manual diagnosis took hours** — we had to curl each model individually, categorize results, then update the SQLite DB
- **Provider `test_status` field exists but isn't used for routing** — `provider_connections` has `test_status` (active/banned/expired/credits_exhausted) but the combo resolver ignores it

### Current flow (broken)

```
User adds providers → Manually creates combos → Manually assigns models → ???
                                                                   ↓
                                                          Some models work,
                                                          some return errors,
                                                          some timeout...
                                                          BUT routing doesn't know!
```

### Proposed flow (self-healing)

```
User adds providers → Auto-Assessment runs → Working models discovered
                                        ↓
                              Capability categorization
                                        ↓
                     Combos auto-generated/updated with working models
                                        ↓
                     Continuous health monitoring keeps combos healthy
```

---

## Architecture

### New Components

```
┌─────────────────────────────────────────────────────────┐
│                    Auto-Assessment Engine                │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  Assessor    │  │ Categorizer  │  │  Self-Healer │  │
│  │              │  │              │  │              │  │
│  │ • Probe all  │  │ • Classify   │  │ • Remove    │  │
│  │   models     │  │   models by  │  │   dead       │  │
│  │ • Measure    │  │   capability  │  │   models     │  │
│  │   latency    │  │ • Assign     │  │ • Promote   │  │
│  │ • Track      │  │   tier tags  │  │   working    │  │
│  │   success    │  │ • Build       │  │   models    │  │
│  │   rates      │  │   fitness    │  │ • Re-weight  │  │
│  │              │  │   scores      │  │   combos     │  │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  │
│         │                 │                  │          │
│         ▼                 ▼                  ▼          │
│  ┌──────────────────────────────────────────────────┐  │
│  │              Assessment Database                  │  │
│  │                                                   │  │
│  │  model_assessments:                               │  │
│  │    model_id | provider | status | latency_p50     │  │
│  │    latency_p95 | success_rate | last_tested      │  │
│  │    error_type | tier | categories[] | fitness     │  │
│  │    context_window | output_tokens | vision | tbc  │  │
│  │                                                   │  │
│  │  assessment_runs:                                 │  │
│  │    run_id | started_at | completed_at             │  │
│  │    models_tested | models_passed | models_failed  │  │
│  │                                                   │  │
│  │  combo_health:                                    │  │
│  │    combo_id | healthy_models | dead_models        │  │
│  │    last_auto_fix | auto_fix_count                 │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
└──────────────────────────────┬──────────────────────────┘
                               │
                               ▼
              Existing combo system (weighted-fallback, priority, etc.)
              + Enhanced comboResolver that skips dead models
```

---

## Detailed Design

### 1. Assessor — `src/domain/assessor.ts`

**Purpose**: Probe every provider/model pair with a lightweight chat completion to determine if it works and measure performance.

```typescript
interface ModelAssessment {
  modelId: string;
  providerId: string;
  status: "working" | "broken" | "rate_limited" | "timeout" | "auth_error" | "unknown";

  // Performance metrics
  latencyP50: number; // milliseconds
  latencyP95: number; // milliseconds
  successRate: number; // 0..1 over last N probes

  // Capability detection
  supportsVision: boolean;
  supportsToolCall: boolean;
  supportsStreaming: boolean;
  maxContextWindow: number;
  maxOutputTokens: number;
  categories: ModelCategory[]; // 'coding' | 'reasoning' | 'chat' | 'fast' | 'vision' | 'reasoning_deep'
  tier: "premium" | "balanced" | "fast" | "free";

  // Metadata
  lastTested: string; // ISO timestamp
  lastError: string | null;
  consecutiveFails: number;
  probeCount: number;
}

type ModelCategory =
  | "coding" // Good at code generation, debugging, refactoring
  | "reasoning" // Strong logical reasoning, math, analysis
  | "reasoning_deep" // Extended thinking, complex multi-step reasoning
  | "chat" // Good conversational ability
  | "fast" // Sub-2s response time
  | "vision" // Image input support
  | "tool_call" // Function/tool calling support
  | "structured_output"; // JSON mode / structured output
```

**Assessment Probes** — three tiers of testing:

| Probe        | Prompt                                     | Max Tokens | Purpose                                        |
| ------------ | ------------------------------------------ | ---------- | ---------------------------------------------- |
| **Quick**    | `"ok"`                                     | 1          | Does it respond at all?                        |
| **Standard** | `"Write a function that adds two numbers"` | 50         | Coding, tool call, structured output detection |
| **Deep**     | Vision input + multi-turn                  | 100        | Vision, streaming, context window              |

**Scheduling**:

- Full assessment on startup (or first provider addition)
- Quick probe every 5 minutes for working models
- Standard probe every 30 minutes
- Deep probe every 6 hours (or on demand)
- Immediate probe after any model returns an error
- Exponential backoff: 1 min → 5 min → 15 min → 30 min for consistently failing models

### 2. Categorizer — `src/domain/categorizer.ts`

**Purpose**: Classify each working model into capability categories and assign fitness scores per category.

**Category Detection Logic**:

```typescript
function categorizeModel(assessment: ModelAssessment): ModelCategory[] {
  const categories: ModelCategory[] = [];

  // Speed classification
  if (assessment.latencyP50 < 2000) categories.push("fast");

  // Capability from probe responses
  if (assessment.supportsToolCall) categories.push("tool_call");
  if (assessment.supportsVision) categories.push("vision");
  if (assessment.supportsStreaming) categories.push("structured_output"); // if supports JSON mode

  // Tier-based reasoning classification
  if (assessment.tier === "premium") {
    categories.push("reasoning_deep", "coding", "reasoning");
  } else if (assessment.tier === "balanced") {
    categories.push("coding", "reasoning");
  } else if (assessment.tier === "fast") {
    categories.push("chat");
  }

  return categories;
}
```

**Fitness Scores** (0..1 per category):

| Category         | Scoring Formula                                                      |
| ---------------- | -------------------------------------------------------------------- |
| `coding`         | `0.4 * successRate + 0.3 * (1 - latencyP95/10000) + 0.3 * tierScore` |
| `reasoning`      | `0.5 * tierScore + 0.3 * successRate + 0.2 * (1 - latencyP95/15000)` |
| `reasoning_deep` | `0.7 * tierScore + 0.3 * successRate` (only premium tier eligible)   |
| `chat`           | `0.4 * successRate + 0.4 * (1 - latencyP95/5000) + 0.2 * tierScore`  |
| `fast`           | `0.6 * (1 - latencyP50/3000) + 0.3 * successRate + 0.1 * costInv`    |
| `vision`         | `0.5 * successRate + 0.3 * (1 - latencyP95/15000) + 0.2 * tierScore` |

### 3. Self-Healer — `src/domain/selfHealer.ts`

**Purpose**: Automatically update combo model lists based on assessment results.

**Auto-Heal Rules**:

```
IF model.status == 'broken' OR model.consecutiveFails >= 3:
    REMOVE model from all combos
    LOG "Auto-heal: removed {model} from {combo} (status: {status}, fails: {n})"

IF model.status == 'rate_limited' OR model.status == 'timeout':
    REDUCE model weight by 50% (minimum weight: 5)
    LOG "Auto-heal: reduced weight of {model} in {combo} (status: {status})"

IF combo has 0 working models:
    FIND best working model for combo's category
    ADD to combo with weight 100
    LOG "Auto-heal: emergency added {model} to {combo} (was empty)"

IF combo has fewer than 3 working models:
    FIND additional working models in same category
    ADD with proportional weights
    LOG "Auto-heal: expanded {combo} with {n} models"

IF model.status transitions from 'broken' → 'working':
    RESTORE original weight (or proportional weight)
    LOG "Auto-heal: restored {model} in {combo}"
```

**Auto-Generation of Combos**:

When a new provider is added, or on first startup, auto-generate standard combos:

```typescript
const AUTO_COMBOS = [
  { name: "auto/best-coding", categories: ["coding"], tier: ["premium", "balanced"] },
  { name: "auto/best-reasoning", categories: ["reasoning_deep"], tier: ["premium"] },
  { name: "auto/best-fast", categories: ["fast"], tier: ["fast", "balanced"] },
  { name: "auto/best-vision", categories: ["vision"], tier: ["premium", "balanced"] },
  { name: "auto/best-chat", categories: ["chat"], tier: ["balanced", "premium"] },
  { name: "auto/coding", categories: ["coding"], tier: ["balanced", "fast", "premium"] },
  { name: "auto/fast", categories: ["fast"], tier: ["fast"] },
  { name: "auto/pro-coding", categories: ["coding"], tier: ["premium"] },
  { name: "auto/pro-reasoning", categories: ["reasoning_deep"], tier: ["premium"] },
  { name: "auto/pro-vision", categories: ["vision"], tier: ["premium"] },
  { name: "auto/pro-chat", categories: ["chat"], tier: ["premium"] },
  { name: "auto/pro-fast", categories: ["fast"], tier: ["fast"] },
];
```

### 4. Database Schema

```sql
-- New tables for assessment engine

CREATE TABLE IF NOT EXISTS model_assessments (
  id TEXT PRIMARY KEY,
  model_id TEXT NOT NULL,
  provider_id TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'unknown',  -- working|broken|rate_limited|timeout|auth_error|unknown
  latency_p50 INTEGER,                      -- milliseconds
  latency_p95 INTEGER,                       -- milliseconds
  success_rate REAL DEFAULT 0,               -- 0..1
  supports_vision INTEGER DEFAULT 0,
  supports_tool_call INTEGER DEFAULT 0,
  supports_streaming INTEGER DEFAULT 0,
  supports_structured_output INTEGER DEFAULT 0,
  max_context_window INTEGER,
  max_output_tokens INTEGER,
  categories TEXT DEFAULT '[]',              -- JSON array of ModelCategory
  fitness_scores TEXT DEFAULT '{}',          -- JSON object: {category: score}
  tier TEXT DEFAULT 'balanced',              -- premium|balanced|fast|free
  last_tested TEXT,
  last_error TEXT,
  consecutive_fails INTEGER DEFAULT 0,
  probe_count INTEGER DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(model_id, provider_id)
);

CREATE TABLE IF NOT EXISTS assessment_runs (
  id TEXT PRIMARY KEY,
  started_at TEXT NOT NULL,
  completed_at TEXT,
  models_tested INTEGER DEFAULT 0,
  models_passed INTEGER DEFAULT 0,
  models_failed INTEGER DEFAULT 0,
  models_rate_limited INTEGER DEFAULT 0,
  duration_ms INTEGER,
  trigger TEXT DEFAULT 'scheduled',  -- scheduled|on_demand|on_provider_change|on_error
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS combo_health (
  combo_id TEXT PRIMARY KEY,
  healthy_model_count INTEGER DEFAULT 0,
  dead_model_count INTEGER DEFAULT 0,
  total_model_count INTEGER DEFAULT 0,
  last_auto_fix TEXT,
  auto_fix_count INTEGER DEFAULT 0,
  health_score REAL DEFAULT 0,      -- 0..1, weighted by model health
  updated_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (combo_id) REFERENCES combos(id)
);

CREATE INDEX IF NOT EXISTS idx_model_assessments_status ON model_assessments(status);
CREATE INDEX IF NOT EXISTS idx_model_assessments_provider ON model_assessments(provider_id);
CREATE INDEX IF NOT EXISTS idx_model_assessments_tier ON model_assessments(tier);
CREATE INDEX IF NOT EXISTS idx_combo_health_health_score ON combo_health(health_score);
```

### 5. API Endpoints

```bash
# Trigger assessment (blocking or background)
POST /api/assess/models
  Body: { "scope": "all" | "provider:<id>" | "model:<id>", "tier": "quick" | "standard" | "deep" }
  Response: { "run_id": "...", "status": "started" }

# Get assessment results
GET /api/assess/results
  Query: ?status=working|broken|rate_limited&provider=kiro&category=coding
  Response: { "models": [...] }

# Get combo health dashboard
GET /api/assess/combo-health
  Response: { "combos": [{ "id": "...", "name": "...", "healthy_models": 5, "dead_models": 2, "health_score": 0.71 }] }

# Auto-fix all combos
POST /api/assess/auto-fix
  Response: { "fixed_combos": 3, "removed_models": ["ollamacloud/glm-5.1", "..."], "added_models": [...] }

# Auto-generate combos from assessments
POST /api/assess/auto-generate
  Response: { "generated_combos": ["auto/best-coding", "..."], "models_per_combo": { "auto/best-coding": 5 } }

# Get assessment run history
GET /api/assess/runs
  Response: { "runs": [...] }
```

### 6. Integration with Existing comboResolver

The existing `comboResolver.ts` already handles `priority`, `weighted`, `round-robin`, `random`, and `least-used` strategies. The enhancement:

```typescript
// In comboResolver.ts — add health-aware filtering
export function resolveComboModel(combo, context = {}) {
  const models = combo.models || [];
  if (models.length === 0) {
    throw new Error(`Combo "${combo.name}" has no models configured`);
  }

  const normalized = models
    .map((entry) => ({
      model: getComboStepTarget(entry) || "",
      weight: getComboStepWeight(entry) || 1,
    }))
    .filter((entry) => entry.model);

  // NEW: Filter out models known to be broken/rate_limited
  const healthy = normalized.filter((entry) => {
    const assessment = getAssessment(entry.model);
    if (!assessment) return true; // Unknown → allow (haven't tested yet)
    return assessment.status === "working" || assessment.status === "unknown";
  });

  // If all models are unhealthy, fall back to full list (better to try than to fail)
  const pool = healthy.length > 0 ? healthy : normalized;

  const strategy = combo.strategy || "priority";
  // ... existing resolution logic using `pool` instead of `normalized`
}
```

### 7. Integration with Existing Auto-Combo Scoring (`open-sse/services/autoCombo/scoring.ts`)

The existing scoring function already uses 6 factors + tier. The assessment engine enriches these:

| Existing Factor     | Current Source           | Enhanced Source                           |
| ------------------- | ------------------------ | ----------------------------------------- |
| Quota (0.20)        | Provider connection data | Same + assessment success_rate            |
| Health (0.25)       | Circuit breaker state    | Same + assessment status (working/broken) |
| CostInv (0.20)      | Static cost data         | Same + live cost measurement              |
| LatencyInv (0.15)   | P95 latency from logs    | Same + assessment probe latency           |
| TaskFit (0.10)      | Static fitness table     | **NEW: from assessment categories**       |
| Stability (0.05)    | Latency stddev           | Same + assessment consecutive_fails       |
| TierPriority (0.05) | Account tier             | Same                                      |

The key enhancement: `taskFit` currently uses a **static** fitness lookup (`taskFitness.ts`). With assessments, we derive fitness from **live probe results** — a model that actually passes coding probes gets a high `coding` fitness, not just because its name contains "coder".

### 8. Dashboard UI (Future PR)

The assessment state should be visible in the omniroute dashboard:

- **Model Health Grid**: table showing each provider/model with colored status indicators
- **Combo Health Summary**: per-combo health score with expandable model details
- **Assessment History**: timeline of assessment runs with pass/fail counts
- **Auto-Fix Log**: history of automatic combo modifications

---

## Migration Path

### Phase 1: Assessment Engine (This PR)

- New `model_assessments`, `assessment_runs`, `combo_health` tables
- Assessor service with quick/standard/deep probes
- Categorizer with fitness scoring
- Self-healer with auto-fix rules
- REST API endpoints
- Integration with comboResolver to skip broken models

### Phase 2: Auto-Generation (Follow-up PR)

- Auto-generate combos from assessed models
- Smart combo naming and categorization
- Cross-provider fallback chains
- Dashboard UI for assessment results

### Phase 3: Continuous Learning (Follow-up PR)

- Feeds assessment results back into auto-combo scoring weights
- Adapts fitness scores based on real request outcomes
- A/B testing across providers to find optimal routing
- Automatic mode pack switching (ship-fast during peak, cost-saver off-peak)

---

## Implementation Files

| File                                     | Purpose                                  | New/Modified |
| ---------------------------------------- | ---------------------------------------- | ------------ |
| `src/domain/assessor.ts`                 | Probe engine (quick/standard/deep)       | **NEW**      |
| `src/domain/categorizer.ts`              | Model categorization & fitness           | **NEW**      |
| `src/domain/selfHealer.ts`               | Auto-fix combos, remove dead models      | **NEW**      |
| `src/domain/comboResolver.ts`            | Add health-aware filtering               | **MODIFIED** |
| `src/domain/types.ts`                    | Add ModelAssessment, ModelCategory types | **MODIFIED** |
| `src/lib/db/assessments.ts`              | DB access for assessment tables          | **NEW**      |
| `open-sse/services/autoCombo/scoring.ts` | Use assessment data for taskFit          | **MODIFIED** |
| `src/app/api/assess/route.ts`            | REST API routes                          | **NEW**      |
| `scripts/assess-models.mjs`              | CLI script for on-demand assessment      | **NEW**      |
| `scripts/migrate-assessments.mjs`        | DB migration script                      | **NEW**      |

---

## Testing Plan

### Unit Tests

- Assessor probe logic (mock provider responses)
- Categorizer fitness score calculations
- Self-healer rules (remove, reduce, restore, emergency add)
- comboResolver integration (skip broken models)

### Integration Tests

- Full assessment cycle: add provider → probe models → categorize → auto-fix combos
- Health-aware routing: broken model skipped, restored model re-included
- Assessment run persistence and recovery

### Manual Testing (our experience as reference)

```bash
# Our actual test sequence that should be automated:
# 1. Start omniroute with 406 provider connections (51 providers)
# 2. Discover only 8 models actually work from 2 providers (kiro, ollamacloud)
# 3. Manually update 44 combos with working models only
# 4. Verify all 15 key combos pass end-to-end
# 5. Set up auto-sync cron for model list updates

# With auto-assessment, this entire process should be:
# 1. Start omniroute
# 2. Run: curl -X POST http://localhost:20128/api/assess/models -d '{"scope":"all"}'
# 3. Wait for assessment to complete
# 4. Run: curl -X POST http://localhost:20128/api/assess/auto-fix
# 5. All combos are now healthy
```

---

## Success Metrics

| Metric                           | Current (Manual)                  | Target (Auto-Assessment)        |
| -------------------------------- | --------------------------------- | ------------------------------- |
| Time to configure working combos | 2-4 hours                         | < 5 minutes                     |
| Dead model detection             | Manual curl testing               | Automatic, continuous           |
| Combo health visibility          | None                              | Dashboard + API                 |
| Provider failure recovery        | Manual DB updates                 | Auto-heal within 5 minutes      |
| New provider onboarding          | Manual combo editing              | Auto-discover + auto-categorize |
| Model deprecation handling       | Manual detection (users complain) | Proactive removal + alerting    |

---

## Backwards Compatibility

- All new tables are additive — no schema changes to existing tables
- comboResolver filtering is opt-in via config flag (default: enabled)
- Existing combo configurations are preserved — self-healer only modifies them, doesn't replace
- Assessment can be disabled with `OMNIRoute_DISABLE_ASSESSMENT=1` env var
- All API endpoints are new — no existing endpoints changed

---

## Open Questions

1. **Probe cost**: Who pays for assessment probes? Should we limit to free-tier models or use a separate assessment budget?
2. **Assessment frequency**: How often should deep probes run? Current proposal: 6h, but some users may want more/less frequent.
3. **Auto-fix aggression**: Should self-healer remove models immediately on first failure, or wait for N consecutive failures?
4. **Cross-provider model equivalence**: Should `kiro/claude-sonnet-4.5` and `gh/claude-sonnet-4.5` be treated as the same model for combo purposes?
5. **Assessment during startup**: Should assessment block startup or run in background?
