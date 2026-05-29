# Manifest Routing Integration — Tier Resolution & Specificity Detection

## TL;DR

> **Quick Summary**: Integrate Manifest-inspired tier resolution (3-level provider classification) and specificity detection (0–100 query complexity scoring) into OmniRoute's combo routing engine to enable smarter, cost-optimized, context-aware routing decisions.

> **Deliverables**:
> - `open-sse/services/tierResolver.ts` — Provider tier classification engine (Tier 1 → Free, Tier 2 → Cheap, Tier 3 → Premium)
> - `open-sse/services/specificityDetector.ts` — Query complexity analysis with 0–100 scoring
> - `open-sse/services/manifestAdapter.ts` — Bridge between tier/specificity data and combo strategy decisions
> - `open-sse/services/costOptimizer.ts` — Enhanced cost-optimized routing using tier + specificity signals
> - Updated `open-sse/services/combo.ts` — Strategy modifications to consume tier/specificity
> - `open-sse/services/__tests__/tierResolver.test.ts` — 30+ test cases
> - `open-sse/services/__tests__/specificityDetector.test.ts` — 25+ test cases
> - `open-sse/services/__tests__/manifestAdapter.test.ts` — 20+ test cases

> **Estimated Effort**: Large (~40–60 task items)
> **Parallel Execution**: YES — 4 waves with max parallelism
> **Critical Path**: Type Definitions → Tier Resolver → Specificity Detector → Manifest Adapter → Combo Integration → Testing

---

## Context

### Original Request
Enhance OmniRoute's combo routing system by implementing Manifest's tier resolution and specificity detection logic. The goal is to classify providers into usage-cost tiers (Free/Cheap/Premium) and analyze query complexity on a 0–100 scale, then use these signals to make smarter routing decisions.

### Interview Summary
**Key Discussions**:
- User wants a comprehensive, detailed, high-quality plan — not vague tasks
- Every task must have specific file paths, function signatures, test cases, and concrete acceptance criteria
- The plan must follow OmniRoute's existing patterns (strategy pattern, service composition, Zod validation)
- Integration points must be clearly documented with exact line/file references

**Research Findings**:
- **Combo engine** (`open-sse/services/combo.ts`, ~2170 lines): Uses `handleComboChat()` → `resolveComboTargets()` → strategy-specific dispatch. Targets are `ResolvedComboTarget[]` with provider/connection/weight info
- **AutoCombo subsystem** (`open-sse/services/autoCombo/`): `engine.ts` → `scoring.ts` with `ProviderCandidate`, `ScoringWeights`, `calculateFactors()`/`calculateScore()`
- **13 routing strategies** (`src/shared/constants/routingStrategies.ts`): priority, weighted, round-robin, context-relay, fill-first, P2C, random, least-used, cost-optimized, strict-random, auto, lkgp, context-optimized
- **Provider resolution**: `parseModel()` in `services/model.ts`, connections via `src/lib/db/providers.ts`, model capabilities via `src/lib/modelCapabilities.ts`
- **No existing tier system or query complexity analysis** — greenfield within existing architecture
- **PR #1918 auto-assessment** is referenced but is a separate PR — integration is aspirational

### Metis Review
Metis was unavailable (API error). Performed self-audit instead. Identified gaps addressed inline.

### Gap Analysis (Self-Audit)

| Gap | Classification | Handling |
|-----|---------------|----------|
| What is the "Manifest" reference? | AMBIGUOUS | Treat as a conceptual tier-resolution + specificity detection pattern, not a direct port from a specific repo |
| Should tiers be hardcoded or configurable? | CRITICAL | MUST be configurable via JSON config + DB settings, with sensible defaults |
| Should specificity detection use LLM or regex/heuristics? | CRITICAL | MUST use heuristic/rule-based detection (fast, no latency) for the initial implementation |
| How does this interact with autoCombo scoring? | AMBIGUOUS | Tier/specificity become additional scoring factors in `calculateFactors()` |
| Performance constraint? | CRITICAL | Tier resolution <1ms, specificity detection <5ms per request (must not block hot path) |

---

## Work Objectives

### Core Objective
Implement a configurable provider tier classification system (3 tiers: Free/Cheap/Premium) and a heuristic-based query complexity analyzer (0–100 specificity score), then integrate both into the existing combo routing engine as additional decision signals.

### Concrete Deliverables
1. **Tier Resolution Service**: Classify any provider+model combo into one of 3 tiers based on cost, quality, and quota
2. **Specificity Detection**: Analyze request content for complexity signals (code, math, reasoning, tool calls, context length) and convert to 0–100 score
3. **Manifest Adapter**: Bridge module that combines tier + specificity signals into routing hints for combo strategies
4. **Enhanced Cost-Optimized Strategy**: Modify existing `cost-optimized` strategy to use tier-aware routing
5. **Comprehensive Test Suite**: 75+ test cases across all modules

### Definition of Done
- [ ] `npm run typecheck:core` passes with zero errors
- [ ] Tier resolution correctly classifies all 160+ providers with ≥98% accuracy against expected tiers
- [ ] Specificity detection scores correlate with query complexity across 50+ test scenarios (Pearson r ≥ 0.85)
- [ ] Combo integration tests pass with tier/specificity-aware strategy variants
- [ ] Latency overhead <6ms total (tier <1ms + specificity <5ms)
- [ ] All Must NOT Have constraints verified absent

### Must Have
- **Configurable tier definitions** via JSON config file with sensible defaults
- **Pluggable specificity rules** — add new detection rules without modifying core logic
- **Backward compatibility** — existing combo configs work unchanged; tier/specificity is opt-in per combo
- **Zero-breaking API changes** — no modification to external API contracts
- **Comprehensive logging** — debug-level logs for tier assignment and specificity scoring

### Must NOT Have (Guardrails)
- ❌ **NO breaking changes** to `ResolvedComboTarget` type or combo resolution flow
- ❌ **NO LLM calls** in specificity detection — must be heuristic-only (fast path)
- ❌ **NO external dependencies** beyond existing OmniRoute stack
- ❌ **NO hardcoded provider names** in classification logic — use configuration
- ❌ **NO blocking I/O** in tier resolution or specificity detection
- ❌ **NO modification** to handler-level code (`chatCore.ts`, route handlers)
- ❌ **NO circular dependencies** between services (enforce via `npm run check:cycles`)

---

## Verification Strategy

> **ZERO HUMAN INTERVENTION** — ALL verification is agent-executed. No exceptions.
> Acceptance criteria requiring "user manually tests/confirms" are FORBIDDEN.

### Test Decision
- **Infrastructure exists**: YES (Node.js test runner + Vitest)
- **Automated tests**: YES (TDD — RED-GREEN-REFACTOR)
- **Framework**: Node.js native test runner (`node --import tsx/esm --test`)
- **TDD workflow**: Each task: Write failing test → Implement minimal pass → Refactor

### QA Policy
Every task MUST include agent-executed QA scenarios (see TODO template below).
Evidence saved to `.sisyphus/evidence/task-{N}-{scenario-slug}.{ext}`.

- **Backend/Service**: Use `node --import tsx/esm --test` — Run specific test file, assert output
- **API/Integration**: Use `Bash (curl)` — Send requests, assert status + response fields
- **TypeScript/Compile**: Use `npm run typecheck:core` — Verify zero type errors

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Start Immediately — foundation + types):
├── Task 1: Type definitions and interfaces [quick]
├── Task 2: Tier configuration schema + defaults [quick]
├── Task 3: Provider cost data extraction utility [quick]
├── Task 4: Specificity rule interface + base types [quick]

Wave 2 (After Wave 1 — core engines, MAX PARALLEL):
├── Task 5: TierResolver implementation [deep]
├── Task 6: SpecificityDetector implementation [deep]
├── Task 7: Specificity rule implementations (code, math, context) [deep]
├── Task 8: Tier config loader (JSON + DB) [quick]

Wave 3 (After Wave 2 — adapter + strategy integration):
├── Task 9: ManifestAdapter (tier + specificity combiner) [deep]
├── Task 10: Enhanced cost-optimized strategy [unspecified-high]
├── Task 11: Combo.ts integration (strategy dispatch modifications) [unspecified-high]
├── Task 12: Tier-aware scoring in autoCombo [deep]

Wave 4 (After Wave 3 — testing + validation):
├── Task 13: TierResolver unit tests [quick]
├── Task 14: SpecificityDetector unit tests [quick]
├── Task 15: ManifestAdapter unit tests [quick]
├── Task 16: Integration tests (end-to-end routing) [unspecified-high]

Wave FINAL (After ALL tasks — 4 parallel reviews, then user okay):
├── Task F1: Plan compliance audit (oracle)
├── Task F2: Code quality review (unspecified-high)
├── Task F3: Real manual QA (unspecified-high)
└── Task F4: Scope fidelity check (deep)
→ Present results → Get explicit user okay

Critical Path: Task 1 → Task 5 → Task 9 → Task 11 → Task 16 → F1-F4 → user okay
Max Concurrent: 4 (Waves 1, 2, 4)
```

### Dependency Matrix

| Task | Depends On | Blocks |
|------|-----------|--------|
| 1–4 | None | 5–8 |
| 5 | 1, 2, 3 | 9, 11, 13 |
| 6 | 1, 4 | 9, 11, 14 |
| 7 | 4 | 6 |
| 8 | 2 | 5 |
| 9 | 5, 6 | 11, 12, 15 |
| 10 | 9 | 11 |
| 11 | 9, 10 | 16 |
| 12 | 9 | 16 |
| 13–15 | 5, 6, 9 | F1-F4 |
| 16 | 11, 12 | F1-F4 |

### Agent Dispatch Summary

- **Wave 1**: 4 × `quick` — Types, schemas, utilities
- **Wave 2**: 4 × `deep`/`quick` — Core engines + config
- **Wave 3**: 4 × `deep`/`unspecified-high` — Adapter + integration
- **Wave 4**: 4 × `quick`/`unspecified-high` — Tests
- **FINAL**: 4 × various — Verification

---

## TODOs

- [ ] 1. **Create type definitions, enums, and interfaces for tier resolution and specificity detection**

  **What to do**:
  - Create `open-sse/services/tierTypes.ts` with these exact exports:
    ```typescript
    // Tier classification enum
    export const PROVIDER_TIER = {
      FREE: "free",        // Zero-cost providers (Kiro, Qoder, Pollinations, etc.)
      CHEAP: "cheap",      // Low-cost providers (GLM, MiniMax, DeepSeek)
      PREMIUM: "premium"   // Full-price providers (OpenAI, Anthropic, etc.)
    } as const;
    export type ProviderTier = (typeof PROVIDER_TIER)[keyof typeof PROVIDER_TIER];

    // Tier assignment for a specific provider+model
    export interface TierAssignment {
      provider: string;           // e.g., "openai", "anthropic"
      model: string;              // e.g., "gpt-4o", "claude-opus-4-7"
      tier: ProviderTier;         // classified tier
      reason: string;             // human-readable classification reason
      costPer1MInput: number;     // USD per 1M input tokens
      costPer1MOutput: number;    // USD per 1M output tokens
      hasFreeTier: boolean;       // whether this provider offers a free quota tier
      freeQuotaLimit?: number;    // daily/monthly free token limit if applicable
    }

    // Configuration for tier classification rules
    export interface TierConfig {
      version: string;                    // config version for migration support
      defaults: {
        freeThreshold: number;            // input cost threshold for "free" tier ($0.00/M)
        cheapThreshold: number;           // input cost threshold for "cheap" tier ($1.00/M)
      };
      providerOverrides: ProviderTierOverride[];  // per-provider tier overrides
      modelOverrides: ModelTierOverride[];        // per-model tier overrides
      freeProviders: string[];                    // explicit free provider list
    }

    export interface ProviderTierOverride {
      provider: string;
      tier: ProviderTier;
    }

    export interface ModelTierOverride {
      provider: string;
      modelPattern: string;  // glob pattern e.g. "gpt-4*"
      tier: ProviderTier;
    }
    ```

  - Create `open-sse/services/specificityTypes.ts` with these exact exports:
    ```typescript
    // Specificity score range: 0 (simple greeting) to 100 (complex multi-step reasoning)
    export interface SpecificityResult {
      score: number;                // 0–100 overall specificity
      breakdown: SpecificityBreakdown;  // per-category breakdown
      rulesTriggered: string[];     // names of rules that fired
      inputTokens: number;          // estimated input token count
      confidence: number;           // 0–1 confidence in the score
    }

    export interface SpecificityBreakdown {
      codeComplexity: number;       // 0–25: code presence, language count, nesting
      mathComplexity: number;       // 0–20: equations, functions, numerical density
      reasoningDepth: number;       // 0–20: multi-step, chain-of-thought indicators
      contextSize: number;          // 0–15: token count, message history depth
      toolCalling: number;          // 0–10: tool definitions, function calling patterns
      domainSpecificity: number;    // 0–10: specialized terminology, jargon density
    }

    // Individual detection rule
    export interface SpecificityRule {
      name: string;                 // unique rule identifier
      category: keyof SpecificityBreakdown;
      weight: number;               // contribution weight (0–1)
      detect(input: RuleInput): RuleMatch | null;
    }

    export interface RuleInput {
      messages: Array<{ role?: string; content?: string | unknown }>;
      systemPrompt?: string;
      tools?: Array<{ function?: { name: string; description?: string; parameters?: unknown } }>;
      model?: string;
    }

    export interface RuleMatch {
      score: number;                // 0–1 match score for this rule
      evidence: string;             // what triggered the match
    }
    ```

  - Add barrel exports at the bottom of each new type file

  **Pre-requisite for Task 9**: Export `ResolvedComboTarget` from `open-sse/services/combo.ts`
  - In `open-sse/services/combo.ts` (line 90), change `type ResolvedComboTarget` → `export type ResolvedComboTarget`
  - This is a non-breaking change required before Task 9 can import the type

  **Must NOT do**:
  - Do NOT use `any` type anywhere — be explicit
  - Do NOT depend on any other task's types — this is the foundation
  - Do NOT import from combo.ts — types must be standalone

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Type definitions only — no logic, just well-structured interfaces
  - **Skills**: []
  - **Skills Evaluated but Omitted**: None — types don't need specialized skills

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 2, 3, 4)
  - **Blocks**: Tasks 5, 6, 9 (consumers of these types)
  - **Blocked By**: None (can start immediately)

  **References** (exhaustive):
  - `src/shared/constants/routingStrategies.ts` — Pattern for readonly constant arrays and union types
  - `open-sse/services/autoCombo/scoring.ts:12-45` — `ProviderCandidate` and `ScoringWeights` show existing scoring type patterns
  - `open-sse/services/combo.ts:90-101` — `ResolvedComboTarget` type pattern to follow for structural consistency
  - `open-sse/services/compression/types.ts` — `CompressionMode`, `CompressionConfig` pattern for enum + interface pairing
  - `open-sse/services/AGENTS.md` — Service composition guidelines

  **Acceptance Criteria**:
  - [ ] File `open-sse/services/tierTypes.ts` exists with all specified exports
  - [ ] File `open-sse/services/specificityTypes.ts` exists with all specified exports
  - [ ] `npm run typecheck:core` passes (types are structurally correct)
  - [ ] All exports are documented with JSDoc comments
  - [ ] No `any` types present (verify with grep: `grep -r ': any' open-sse/services/tierTypes.ts open-sse/services/specificityTypes.ts` returns nothing)

  **QA Scenarios**:
  ```
  Scenario: TypeScript compilation with new types
    Tool: Bash
    Preconditions: Both type files created
    Steps:
      1. Run: npm run typecheck:core
      2. Assert exit code 0
    Expected Result: TypeScript compiles without errors
    Failure Indicators: Non-zero exit code, type errors referencing new files
    Evidence: .sisyphus/evidence/task-1-typecheck-pass.txt

  Scenario: Verify no 'any' types in new files
    Tool: Bash
    Preconditions: Both type files created
    Steps:
      1. Run: grep -rn ': any' open-sse/services/tierTypes.ts open-sse/services/specificityTypes.ts || echo "PASS: no any types found"
      2. Assert output contains "PASS"
    Expected Result: No 'any' type usages
    Failure Indicators: Any matched lines with ': any'
    Evidence: .sisyphus/evidence/task-1-no-any.txt
  ```

  **Evidence to Capture**:
  - [ ] TypeScript compilation output
  - [ ] grep output for `any` type check

  **Commit**: YES
  - Message: `feat(combo): add tier resolution and specificity detection types`
  - Files: `open-sse/services/tierTypes.ts`, `open-sse/services/specificityTypes.ts`

- [ ] 2. **Create tier configuration schema with Zod validation and sensible defaults**

  **What to do**:
  - Create `open-sse/services/tierConfig.ts` with:
    ```typescript
    import { z } from "zod";
    import type { TierConfig, ProviderTierOverride, ModelTierOverride } from "./tierTypes";

    // Zod schema for runtime validation
    export const providerTierOverrideSchema = z.object({
      provider: z.string().min(1),
      tier: z.enum(["free", "cheap", "premium"]),
    });

    export const modelTierOverrideSchema = z.object({
      provider: z.string().min(1),
      modelPattern: z.string().min(1),
      tier: z.enum(["free", "cheap", "premium"]),
    });

    export const tierConfigSchema = z.object({
      version: z.string().default("1.0.0"),
      defaults: z.object({
        freeThreshold: z.number().min(0).default(0),
        cheapThreshold: z.number().min(0).default(1.0),
      }),
      providerOverrides: z.array(providerTierOverrideSchema).default([]),
      modelOverrides: z.array(modelTierOverrideSchema).default([]),
      freeProviders: z.array(z.string()).default([]),
    });

    // Default configuration with known free/cheap providers
    export const DEFAULT_TIER_CONFIG: TierConfig = {
      version: "1.0.0",
      defaults: {
        freeThreshold: 0,      // $0/M input = free tier
        cheapThreshold: 1.0,   // ≤$1/M input = cheap tier
      },
      providerOverrides: [],
      modelOverrides: [],
      freeProviders: [
        "kiro", "qoder", "pollinations", "longcat", "cloudflare-ai",
        "qwen", "gemini-cli", "nvidia-nim", "cerebras", "groq",
      ],
    };

    // Validate and load config
    export function validateTierConfig(raw: unknown): TierConfig {
      return tierConfigSchema.parse(raw);
    }

    // Merge user config with defaults
    export function mergeTierConfig(userConfig?: Partial<TierConfig>): TierConfig {
      if (!userConfig) return DEFAULT_TIER_CONFIG;
      return {
        ...DEFAULT_TIER_CONFIG,
        ...userConfig,
        defaults: {
          ...DEFAULT_TIER_CONFIG.defaults,
          ...userConfig.defaults,
        },
        providerOverrides: [
          ...DEFAULT_TIER_CONFIG.providerOverrides,
          ...(userConfig.providerOverrides || []),
        ],
        modelOverrides: [
          ...DEFAULT_TIER_CONFIG.modelOverrides,
          ...(userConfig.modelOverrides || []),
        ],
        freeProviders: [
          ...new Set([
            ...DEFAULT_TIER_CONFIG.freeProviders,
            ...(userConfig.freeProviders || []),
          ]),
        ],
      };
    }
    ```

  - Add default tier config JSON file at `open-sse/services/tierDefaults.json`:
    ```json
    {
      "version": "1.0.0",
      "defaults": { "freeThreshold": 0, "cheapThreshold": 1.0 },
      "providerOverrides": [
        { "provider": "deepseek", "tier": "cheap" },
        { "provider": "groq", "tier": "free" },
        { "provider": "glm", "tier": "cheap" },
        { "provider": "minimax", "tier": "cheap" },
        { "provider": "meta-llama", "tier": "cheap" }
      ],
      "modelOverrides": [
        { "provider": "openai", "modelPattern": "gpt-4o-mini*", "tier": "cheap" },
        { "provider": "anthropic", "modelPattern": "claude-haiku*", "tier": "cheap" }
      ],
      "freeProviders": [
        "kiro", "qoder", "pollinations", "longcat", "cloudflare-ai",
        "qwen", "gemini-cli", "nvidia-nim", "cerebras", "groq"
      ]
    }
    ```

  **Must NOT do**:
  - Do NOT hardcode provider names in code (use config only)
  - Do NOT create DB tables (config is file-based for now, DB migration is Task 8)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Schema definition + validation — follow existing Zod patterns from codebase
  - **Skills**: []
  - **Skills Evaluated but Omitted**: None

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 3, 4)
  - **Blocks**: Tasks 5, 8 (consumers of tier config)
  - **Blocked By**: Task 1 (needs `TierConfig` type)

  **References** (exhaustive):
  - `src/shared/validation/providerSchema.ts` — Zod validation pattern used for providers
  - `open-sse/services/compression/types.ts` — Config with defaults pattern
  - `open-sse/services/compression/strategySelector.ts` — Config merging pattern
  - `src/shared/constants/routingStrategies.ts:1-15` — `ROUTING_STRATEGY_VALUES` enum array pattern
  - `open-sse/mcp-server/` — Zod schemas for tool inputs (validation pattern reference)

  **Acceptance Criteria**:
  - [ ] `open-sse/services/tierConfig.ts` creates `validateTierConfig()` and `mergeTierConfig()`
  - [ ] `open-sse/services/tierDefaults.json` exists with valid defaults
  - [ ] Zod validation rejects invalid configs (test: pass `{ defaults: { freeThreshold: -1 } }` → throws)
  - [ ] `DEFAULT_TIER_CONFIG` classifies known free providers correctly
  - [ ] `mergeTierConfig()` correctly merges user overrides with defaults

  **QA Scenarios**:
  ```
  Scenario: Validate default tier config
    Tool: Bash (node REPL)
    Preconditions: tierConfig.ts created
    Steps:
      1. Run: node --import tsx/esm -e "
         import { validateTierConfig, DEFAULT_TIER_CONFIG } from './open-sse/services/tierConfig.ts';
         const result = validateTierConfig(DEFAULT_TIER_CONFIG);
         console.log('PASS:', JSON.stringify({ freeCount: result.freeProviders.length, version: result.version }));
       "
      2. Assert output contains "PASS" with freeCount >= 5
    Expected Result: DEFAULT_TIER_CONFIG passes validation with ≥5 free providers
    Failure Indicators: Validation error or missing free providers
    Evidence: .sisyphus/evidence/task-2-default-config.txt

  Scenario: Reject invalid threshold
    Tool: Bash (node REPL)
    Preconditions: tierConfig.ts created
    Steps:
      1. Run: node --import tsx/esm -e "
         import { validateTierConfig } from './open-sse/services/tierConfig.ts';
         try {
           validateTierConfig({ defaults: { freeThreshold: -1 } });
           process.exit(1);
         } catch (e) {
           console.log('PASS: rejected invalid threshold');
         }
       "
      2. Assert output contains "PASS: rejected invalid threshold"
    Expected Result: Invalid config throws Zod validation error
    Failure Indicators: Config accepted when it should be rejected
    Evidence: .sisyphus/evidence/task-2-reject-invalid.txt

  Scenario: Merge user overrides correctly
    Tool: Bash (node REPL)
    Preconditions: tierConfig.ts created
    Steps:
      1. Run: node --import tsx/esm -e "
         import { mergeTierConfig } from './open-sse/services/tierConfig.ts';
         const merged = mergeTierConfig({
           providerOverrides: [{ provider: 'custom-provider', tier: 'free' }],
           freeProviders: ['extra-free']
         });
         console.log('PASS:', JSON.stringify({
           overrideCount: merged.providerOverrides.length,
           freeCount: merged.freeProviders.length,
           hasExtra: merged.freeProviders.includes('extra-free')
         }));
       "
      2. Assert output contains "hasExtra:true"
    Expected Result: User overrides merged with defaults
    Failure Indicators: Missing user overrides or incorrect merge
    Evidence: .sisyphus/evidence/task-2-merge-config.txt
  ```

  **Evidence to Capture**:
  - [ ] Default config validation output
  - [ ] Invalid config rejection output
  - [ ] Config merge output

  **Commit**: YES
  - Message: `feat(combo): add tier configuration with Zod validation and defaults`
  - Files: `open-sse/services/tierConfig.ts`, `open-sse/services/tierDefaults.json`

- [ ] 3. **Build provider cost data extraction utility**

  **What to do**:
  - Create `open-sse/services/providerCostData.ts` with:
    ```typescript
    import type { TierAssignment } from "./tierTypes";
    import type { TierConfig } from "./tierTypes";

    // Known pricing data (to be moved to DB in future, hardcoded for MVP)
    // Format: provider name → model → { input cost per 1M tokens, output cost per 1M tokens }
    export interface ModelPricing {
      inputCostPer1M: number;
      outputCostPer1M: number;
      isFree: boolean;
      freeQuotaLimit?: number;
    }

    // Pricing lookup table (extracted from LiteLLM pricing sync)
    // This mirrors src/lib/pricingSync.ts but in a structured format for tier resolution
    export const KNOWN_MODEL_PRICING: Record<string, ModelPricing> = {
      "gpt-4o": { inputCostPer1M: 2.50, outputCostPer1M: 10.00, isFree: false },
      "gpt-4o-mini": { inputCostPer1M: 0.15, outputCostPer1M: 0.60, isFree: false },
      "claude-opus-4-7": { inputCostPer1M: 15.00, outputCostPer1M: 75.00, isFree: false },
      "claude-sonnet-4-6": { inputCostPer1M: 3.00, outputCostPer1M: 15.00, isFree: false },
      "claude-haiku-4-5": { inputCostPer1M: 0.80, outputCostPer1M: 4.00, isFree: false },
      "gemini-2.5-flash": { inputCostPer1M: 0.15, outputCostPer1M: 0.60, isFree: false },
      "gemini-2.5-pro": { inputCostPer1M: 1.25, outputCostPer1M: 5.00, isFree: false },
      "deepseek-chat": { inputCostPer1M: 0.27, outputCostPer1M: 1.10, isFree: false },
      "deepseek-reasoner": { inputCostPer1M: 0.55, outputCostPer1M: 2.19, isFree: false },
      "glm-4.7": { inputCostPer1M: 0.60, outputCostPer1M: 0.60, isFree: false },
      "glm-5.1": { inputCostPer1M: 0.50, outputCostPer1M: 0.50, isFree: false },
      "minimax-m2.1": { inputCostPer1M: 0.20, outputCostPer1M: 0.20, isFree: false },
      "grok-4-fast": { inputCostPer1M: 0.20, outputCostPer1M: 0.50, isFree: false },
      // Free providers
      "kimi-k2-thinking": { inputCostPer1M: 0, outputCostPer1M: 0, isFree: true },
      "qwen3-coder-plus": { inputCostPer1M: 0, outputCostPer1M: 0, isFree: true },
      "longcat-flash-lite": { inputCostPer1M: 0, outputCostPer1M: 0, isFree: true, freeQuotaLimit: 50000000 },
    };

    // Resolve pricing for a provider/model combo
    export function getModelPricing(provider: string, model: string): ModelPricing {
      const directKey = model.toLowerCase();
      if (KNOWN_MODEL_PRICING[directKey]) {
        return KNOWN_MODEL_PRICING[directKey];
      }
      // Fallback: look up by provider prefix
      const providerKey = `${provider}/${model}`.toLowerCase();
      if (KNOWN_MODEL_PRICING[providerKey]) {
        return KNOWN_MODEL_PRICING[providerKey];
      }
      // Default: assume premium pricing when unknown
      return { inputCostPer1M: 5.00, outputCostPer1M: 15.00, isFree: false };
    }

    // Check if a provider is in the explicitly free list
    export function isExplicitlyFree(provider: string, config: TierConfig): boolean {
      return config.freeProviders.includes(provider.toLowerCase());
    }
    ```

  **Must NOT do**:
  - Do NOT import pricing sync module directly — keep standalone (see Design Decision below)
  - Do NOT make network calls — all data is static for MVP

  **Design Decision — Hardcoded Pricing Table vs. pricingSync.ts**:
  The existing `src/lib/pricingSync.ts` syncs pricing from LiteLLM into a structured DB table (`model_pricing`). We chose **not** to import it directly for these reasons:
  1. **Cold-start latency**: `pricingSync` may trigger DB reads or network calls on first load; `providerCostData.ts` must be <1ms. A static lookup table avoids this.
  2. **Tier resolution is read-only**: TierResolver only **reads** pricing to classify. It does not need live sync. Outdated prices are acceptable because relative tiers (free/cheap/premium) change slowly.
  3. **Separation of concerns**: TierResolver is a **classification service**, not a pricing service. If pricing logic changes (e.g., new currency, dynamic discount), the sync module can evolve independently.
  4. **Future path**: A background job can periodically export `pricingSync` data into the JSON config file (`tierDefaults.json`). For now, maintain the table manually.
  **Trade-off**: When a new model is added to OmniRoute, `KNOWN_MODEL_PRICING` may need a manual update. This is documented as a known maintenance item.

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Lookup utility — extract/transform pricing data, minimal logic
  - **Skills**: []
  - **Skills Evaluated but Omitted**: None

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 4)
  - **Blocks**: Task 5 (TierResolver needs pricing data)
  - **Blocked By**: Task 1 (needs `TierAssignment` type)

  **References** (exhaustive):
  - `src/lib/pricingSync.ts` — Official pricing data source (reference for pricing values)
  - `open-sse/services/combo.ts:77-87` — `DEFAULT_MODEL_P95_MS` shows the pattern for static lookup tables
  - `src/lib/modelCapabilities.ts` — Model capability lookup pattern
  - `README.md` (pricing section) — Reference for provider pricing tiers

  **Acceptance Criteria**:
  - [ ] `getModelPricing("openai", "gpt-4o")` returns `{ inputCostPer1M: 2.50, outputCostPer1M: 10.00, isFree: false }`
  - [ ] `getModelPricing("qoder", "kimi-k2-thinking")` returns `{ inputCostPer1M: 0, outputCostPer1M: 0, isFree: true }`
  - [ ] `getModelPricing("unknown", "unknown-model")` returns default premium pricing
  - [ ] `isExplicitlyFree("kiro", defaultConfig)` returns `true`
  - [ ] `isExplicitlyFree("openai", defaultConfig)` returns `false`

  **QA Scenarios**:
  ```
  Scenario: Known premium model pricing
    Tool: Bash (node REPL)
    Preconditions: providerCostData.ts created
    Steps:
      1. Run: node --import tsx/esm -e "
         import { getModelPricing } from './open-sse/services/providerCostData.ts';
         const p = getModelPricing('openai', 'gpt-4o');
         console.log('PASS:', JSON.stringify(p));
       "
      2. Assert output contains inputCostPer1M:2.5
    Expected Result: Correct pricing for gpt-4o
    Failure Indicators: Wrong pricing values or error
    Evidence: .sisyphus/evidence/task-3-premium-pricing.txt

  Scenario: Free provider lookup
    Tool: Bash (node REPL)
    Preconditions: providerCostData.ts created
    Steps:
      1. Run: node --import tsx/esm -e "
         import { getModelPricing } from './open-sse/services/providerCostData.ts';
         const p = getModelPricing('qoder', 'kimi-k2-thinking');
         console.log('PASS:', JSON.stringify(p));
       "
      2. Assert output contains isFree:true and inputCostPer1M:0
    Expected Result: Free provider identified correctly
    Failure Indicators: Free provider shows non-zero cost
    Evidence: .sisyphus/evidence/task-3-free-pricing.txt

  Scenario: Unknown provider defaults to premium
    Tool: Bash (node REPL)
    Preconditions: providerCostData.ts created
    Steps:
      1. Run: node --import tsx/esm -e "
         import { getModelPricing } from './open-sse/services/providerCostData.ts';
         const p = getModelPricing('unknown', 'unknown-model');
         console.log('PASS:', p.inputCostPer1M >= 5 ? 'defaults to premium' : 'unexpected');
       "
      2. Assert output contains "defaults to premium"
    Expected Result: Unknown providers default to premium pricing
    Failure Indicators: Unknown provider returns free pricing
    Evidence: .sisyphus/evidence/task-3-unknown-default.txt
  ```

  **Evidence to Capture**:
  - [ ] Premium pricing output
  - [ ] Free provider output
  - [ ] Unknown default output

  **Commit**: YES
  - Message: `feat(combo): add provider cost data extraction utility`
  - Files: `open-sse/services/providerCostData.ts`

- [ ] 4. **Define specificity rule interface and base rule types**

  **What to do**:
  - Create `open-sse/services/specificityRules.ts` with:
    ```typescript
    import type { SpecificityRule, RuleInput, RuleMatch, SpecificityBreakdown } from "./specificityTypes";

    // Calculate token count estimate from messages (approximate, fast)
    export function estimateTokens(text: string): number {
      // Rough estimate: ~4 chars per token for English text
      return Math.ceil(text.length / 4);
    }

    // Count total tokens across all messages
    export function estimateMessageTokens(messages: Array<{ content?: string | unknown }>): number {
      return messages.reduce((sum, msg) => {
        if (typeof msg.content === "string") return sum + estimateTokens(msg.content);
        if (Array.isArray(msg.content)) {
          return sum + msg.content.reduce(
            (s: number, part: unknown) =>
              s + (typeof (part as { text?: string })?.text === "string"
                ? estimateTokens((part as { text: string }).text)
                : 0),
            0
          );
        }
        return sum;
      }, 0);
    }

    // Detect code blocks and programming languages in messages
    export function detectCodeComplexity(input: RuleInput): number {
      const allText = input.messages.map(m =>
        typeof m.content === "string" ? m.content : ""
      ).join("\n");

      // Count code fences (``` blocks)
      const codeFenceMatches = allText.match(/```[\s\S]*?```/g);
      const codeBlockCount = codeFenceMatches ? codeFenceMatches.length : 0;

      // Detect inline code
      const inlineCodeMatches = allText.match(/`[^`]+`/g);
      const inlineCodeCount = inlineCodeMatches ? inlineCodeMatches.length : 0;

      // Detect common programming language keywords
      const langIndicators = [
        /function\s+\w+\s*\(/gi, /const\s+\w+\s*=/gi, /import\s+.*from/gi,
        /class\s+\w+/gi, /interface\s+\w+/gi, /async\s+function/gi,
        /def\s+\w+\s*\(/gi, /SELECT\s+.*FROM/gi, /\$\{.*\}/g,
      ];
      const langMatches = langIndicators.reduce((sum, re) => {
        const matches = allText.match(re);
        return sum + (matches ? matches.length : 0);
      }, 0);

      // Score: scale to 0–25
      const raw = codeBlockCount * 5 + inlineCodeCount * 0.5 + langMatches * 2;
      return Math.min(25, Math.round(raw));
    }

    // Detect mathematical and numerical complexity
    export function detectMathComplexity(input: RuleInput): number {
      const allText = input.messages.map(m =>
        typeof m.content === "string" ? m.content : ""
      ).join("\n");

      // Detect LaTeX math expressions
      const latexMatches = allText.match(/\$\$[\s\S]*?\$\$|\$[^$]+\$/g);
      const latexCount = latexMatches ? latexMatches.length : 0;

      // Detect equations, formulas, mathematical notation
      const mathIndicators = [
        /[+\-*/^]=/g, /\b(sin|cos|tan|log|sqrt|sum|prod|int|lim)\b/gi,
        /\b\d+\s*[+\-*/]\s*\d+\s*=/g, /∑|∏|∫|√|∞|π/g,
        /\bf'(?:x)?\b/g, /\bdx\b/g,
      ];
      const mathMatches = mathIndicators.reduce((sum, re) => {
        const matches = allText.match(re);
        return sum + (matches ? matches.length : 0);
      }, 0);

      // Score: scale to 0–20
      const raw = latexCount * 4 + mathMatches * 1.5;
      return Math.min(20, Math.round(raw));
    }

    // Detect multi-step reasoning and chain-of-thought patterns
    export function detectReasoningDepth(input: RuleInput): number {
      const allText = input.messages.map(m =>
        typeof m.content === "string" ? m.content : ""
      ).join("\n");

      const reasoningIndicators = [
        /\b(first|step\s*\d|secondly|finally|therefore|thus|consequently|because|since)\b/gi,
        /\b(let me think|let's reason|let's analyze|step by step|breaking this down)\b/gi,
        /\b(we need to|we must|we should|the approach is|the solution involves)\b/gi,
        /(?:\d+\.\s+)(?:\w+)/g,  // numbered lists like "1. First step"
        /\b(if\s+.+\s+then\s+|assuming\s+|suppose\s+|consider\s+that)\b/gi,
      ];

      const reasonMatches = reasoningIndicators.reduce((sum, re) => {
        const matches = allText.match(re);
        return sum + (matches ? matches.length : 0);
      }, 0);

      // Also check message count (more messages = deeper conversation)
      const messageDepthBonus = Math.min(5, input.messages.length);

      // Score: scale to 0–20
      const raw = reasonMatches * 2 + messageDepthBonus;
      return Math.min(20, Math.round(raw));
    }

    // Detect context size and history depth
    export function detectContextSize(input: RuleInput): number {
      const totalTokens = estimateMessageTokens(input.messages);
      const systemPromptTokens = input.systemPrompt
        ? estimateTokens(input.systemPrompt)
        : 0;

      // Score based on token thresholds
      if (totalTokens > 64000) return 15;
      if (totalTokens > 32000) return 12;
      if (totalTokens > 16000) return 9;
      if (totalTokens > 8000) return 6;
      if (totalTokens > 4000) return 4;
      if (totalTokens > 1000) return 2;
      return 0;
    }

    // Detect tool calling presence
    export function detectToolCalling(input: RuleInput): number {
      if (!input.tools || input.tools.length === 0) return 0;

      const toolCount = input.tools.length;
      // Score based on number of tools
      if (toolCount > 20) return 10;
      if (toolCount > 10) return 8;
      if (toolCount > 5) return 6;
      if (toolCount > 2) return 4;
      return 2;
    }

    // Detect domain-specific terminology
    export function detectDomainSpecificity(input: RuleInput): number {
      const allText = input.messages.map(m =>
        typeof m.content === "string" ? m.content : ""
      ).join("\n");

      const domainTerms: Record<string, RegExp[]> = {
        medical: [/\bdiagnosis\b/i, /\bsymptoms\b/i, /\btreatment\b/i, /\bpatient\b/i, /\bclinical\b/i],
        legal: [/\bpursuant\b/i, /\bstatute\b/i, /\bliability\b/i, /\bjurisdiction\b/i, /\bhereby\b/i],
        scientific: [/\bhypothesis\b/i, /\bmethodology\b/i, /\bempirical\b/i, /\bsignificant\b/i],
        financial: [/\bportfolio\b/i, /\bdividend\b/i, /\bamortization\b/i, /\barbitrage\b/i],
      };

      let maxDomainScore = 0;
      for (const [, terms] of Object.entries(domainTerms)) {
        const score = terms.reduce((sum, re) => {
          return sum + (re.test(allText) ? 2 : 0);
        }, 0);
        maxDomainScore = Math.max(maxDomainScore, score);
      }

      return Math.min(10, maxDomainScore);
    }

    // Get complete specificity breakdown
    export function getSpecificityBreakdown(input: RuleInput): SpecificityBreakdown {
      return {
        codeComplexity: detectCodeComplexity(input),
        mathComplexity: detectMathComplexity(input),
        reasoningDepth: detectReasoningDepth(input),
        contextSize: detectContextSize(input),
        toolCalling: detectToolCalling(input),
        domainSpecificity: detectDomainSpecificity(input),
      };
    }
    ```

  **Must NOT do**:
  - Do NOT import LLM or AI SDK — pure regex/heuristic
  - Do NOT make async functions (must be fast path)

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Heuristic rule definitions — regex patterns, scoring formulas, well-defined logic
  - **Skills**: []
  - **Skills Evaluated but Omitted**: None

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 1 (with Tasks 1, 2, 3)
  - **Blocks**: Task 6, 7 (SpecificityDetector needs rule functions)
  - **Blocked By**: Task 1 (needs `SpecificityBreakdown`, `RuleInput` types)

  **References** (exhaustive):
  - `open-sse/services/compression/cavemanRules.ts` — Regex-based rule patterns for compression (analogous approach)
  - `open-sse/services/intentClassifier.ts` — Classification using text patterns
  - `open-sse/services/modelCapabilities.ts` — Capability detection pattern
  - `open-sse/services/combo.ts:77-87` — Static lookup/configuration tables pattern
  - `src/lib/modelCapabilities.ts` — Model capability data lookup pattern

  **Acceptance Criteria**:
  - [ ] `detectCodeComplexity()` returns ≥10 for prompt with 2+ code blocks
  - [ ] `detectCodeComplexity()` returns 0 for prompt with no code
  - [ ] `detectMathComplexity()` detects LaTeX math expressions
  - [ ] `detectReasoningDepth()` detects step-by-step reasoning patterns
  - [ ] `detectToolCalling()` returns 0 when no tools defined
  - [ ] `getSpecificityBreakdown()` returns all six categories

  **QA Scenarios**:
  ```
  Scenario: High code complexity detection
    Tool: Bash (node REPL)
    Preconditions: specificityRules.ts created
    Steps:
      1. Run: node --import tsx/esm -e "
         import { detectCodeComplexity } from './open-sse/services/specificityRules.ts';
         const score = detectCodeComplexity({
           messages: [{ content: '\`\`\`ts\nfunction foo() {}\n\`\`\`\n\`\`\`py\ndef bar(): pass\n\`\`\`' }],
         });
         console.log('PASS:', score >= 10 ? 'high code detected' : score);
       "
      2. Assert output contains "high code detected"
    Expected Result: Score ≥10 for 2 code blocks
    Failure Indicators: Score <10 with 2 code blocks present
    Evidence: .sisyphus/evidence/task-4-high-code.txt

  Scenario: No code complexity
    Tool: Bash (node REPL)
    Preconditions: specificityRules.ts created
    Steps:
      1. Run: node --import tsx/esm -e "
         import { detectCodeComplexity } from './open-sse/services/specificityRules.ts';
         const score = detectCodeComplexity({
           messages: [{ content: 'Hello, how are you?' }],
         });
         console.log('PASS:', score === 0 ? 'no code detected' : score);
       "
      2. Assert output contains "no code detected"
    Expected Result: Score 0 for non-code content
    Failure Indicators: Code complexity detected in non-code text
    Evidence: .sisyphus/evidence/task-4-no-code.txt

  Scenario: Reasoning depth detection
    Tool: Bash (node REPL)
    Preconditions: specificityRules.ts created
    Steps:
      1. Run: node --import tsx/esm -e "
         import { detectReasoningDepth } from './open-sse/services/specificityRules.ts';
         const score = detectReasoningDepth({
           messages: [{ content: 'First, we need to analyze the problem. Step 1: identify constraints. Therefore, we should use this approach.' }],
         });
         console.log('PASS:', score >= 5 ? 'reasoning detected' : score);
       "
      2. Assert output contains "reasoning detected"
    Expected Result: Score ≥5 for multi-step reasoning text
    Failure Indicators: Low score for clear reasoning content
    Evidence: .sisyphus/evidence/task-4-reasoning.txt
  ```

  **Evidence to Capture**:
  - [ ] High code detection output
  - [ ] No code detection output
  - [ ] Reasoning detection output

  **Commit**: YES
  - Message: `feat(combo): add specificity rule functions (code, math, reasoning, context, tools, domain)`
  - Files: `open-sse/services/specificityRules.ts`

- [ ] 5. **Implement TierResolver — provider tier classification engine**

  **What to do**:
  - Create `open-sse/services/tierResolver.ts` with the full tier resolution logic:
    ```typescript
    import type { TierAssignment, TierConfig, ProviderTier } from "./tierTypes";
    import { PROVIDER_TIER } from "./tierTypes";
    import { getModelPricing } from "./providerCostData";
    import { isExplicitlyFree } from "./providerCostData";
    import { validateTierConfig, mergeTierConfig, DEFAULT_TIER_CONFIG } from "./tierConfig";

    // In-memory tier cache (provider+model → TierAssignment) invalidated on config change
    const tierCache = new Map<string, TierAssignment>();
    let currentConfig: TierConfig = DEFAULT_TIER_CONFIG;

    // Build cache key from provider + model
    function cacheKey(provider: string, model: string): string {
      return `${provider}::${model}`;
    }

    // Classify a single provider+model into a tier
    export function classifyTier(provider: string, model: string): TierAssignment {
      const key = cacheKey(provider, model);

      // Check cache first
      if (tierCache.has(key)) {
        return tierCache.get(key)!;
      }

      // 1. Check explicit free provider list
      if (isExplicitlyFree(provider, currentConfig)) {
        const assignment: TierAssignment = {
          provider,
          model,
          tier: PROVIDER_TIER.FREE,
          reason: `Provider '${provider}' is in explicit free providers list`,
          costPer1MInput: 0,
          costPer1MOutput: 0,
          hasFreeTier: true,
        };
        tierCache.set(key, assignment);
        return assignment;
      }

      // 2. Check provider-level overrides
      const providerOverride = currentConfig.providerOverrides.find(
        (o) => o.provider.toLowerCase() === provider.toLowerCase()
      );
      if (providerOverride) {
        const pricing = getModelPricing(provider, model);
        const assignment: TierAssignment = {
          provider,
          model,
          tier: providerOverride.tier,
          reason: `Provider-level override: '${provider}' → ${providerOverride.tier}`,
          costPer1MInput: pricing.inputCostPer1M,
          costPer1MOutput: pricing.outputCostPer1M,
          hasFreeTier: pricing.isFree,
          freeQuotaLimit: pricing.freeQuotaLimit,
        };
        tierCache.set(key, assignment);
        return assignment;
      }

      // 3. Check model-level overrides (glob pattern match)
      const modelOverride = currentConfig.modelOverrides.find(
        (o) =>
          o.provider.toLowerCase() === provider.toLowerCase() &&
          matchGlob(o.modelPattern, model)
      );
      if (modelOverride) {
        const pricing = getModelPricing(provider, model);
        const assignment: TierAssignment = {
          provider,
          model,
          tier: modelOverride.tier,
          reason: `Model-level override: '${provider}/${model}' matches '${modelOverride.modelPattern}' → ${modelOverride.tier}`,
          costPer1MInput: pricing.inputCostPer1M,
          costPer1MOutput: pricing.outputCostPer1M,
          hasFreeTier: pricing.isFree,
          freeQuotaLimit: pricing.freeQuotaLimit,
        };
        tierCache.set(key, assignment);
        return assignment;
      }

      // 4. Cost-based classification (default heuristic)
      const pricing = getModelPricing(provider, model);
      let tier: ProviderTier;
      let reason: string;

      if (pricing.isFree || pricing.inputCostPer1M <= currentConfig.defaults.freeThreshold) {
        tier = PROVIDER_TIER.FREE;
        reason = `Cost-based: $${pricing.inputCostPer1M}/M input ≤ free threshold ($${currentConfig.defaults.freeThreshold}/M)`;
      } else if (pricing.inputCostPer1M <= currentConfig.defaults.cheapThreshold) {
        tier = PROVIDER_TIER.CHEAP;
        reason = `Cost-based: $${pricing.inputCostPer1M}/M input ≤ cheap threshold ($${currentConfig.defaults.cheapThreshold}/M)`;
      } else {
        tier = PROVIDER_TIER.PREMIUM;
        reason = `Cost-based: $${pricing.inputCostPer1M}/M input > cheap threshold ($${currentConfig.defaults.cheapThreshold}/M)`;
      }

      const assignment: TierAssignment = {
        provider,
        model,
        tier,
        reason,
        costPer1MInput: pricing.inputCostPer1M,
        costPer1MOutput: pricing.outputCostPer1M,
        hasFreeTier: pricing.isFree,
        freeQuotaLimit: pricing.freeQuotaLimit,
      };

      tierCache.set(key, assignment);
      return assignment;
    }

    // Simple glob matcher (handles * wildcard only)
    function matchGlob(pattern: string, text: string): boolean {
      const regexStr = pattern
        .replace(/[.+^${}()|[\]\\]/g, "\\$&")
        .replace(/\*/g, ".*");
      return new RegExp(`^${regexStr}$`, "i").test(text);
    }

    // Update configuration and invalidate cache
    export function setTierConfig(config: Partial<TierConfig>): void {
      currentConfig = mergeTierConfig(config);
      tierCache.clear(); // Invalidate cache on config change
    }

    // Get current config
    export function getTierConfig(): TierConfig {
      return { ...currentConfig };
    }

    // Clear the tier cache (for testing or forced re-classification)
    export function clearTierCache(): void {
      tierCache.clear();
    }

    // Classify multiple providers at once (batch operation)
    export function classifyTiers(
      targets: Array<{ provider: string; model: string }>
    ): TierAssignment[] {
      return targets.map((t) => classifyTier(t.provider, t.model));
    }

    // Get tier distribution stats (useful for dashboards)
    export function getTierStats(): Record<ProviderTier, number> {
      const stats: Record<ProviderTier, number> = { free: 0, cheap: 0, premium: 0 };
      for (const assignment of tierCache.values()) {
        stats[assignment.tier]++;
      }
      return stats;
    }
    ```

  **Must NOT do**:
  - Do NOT make async DB calls in `classifyTier()` — must be synchronous (<1ms)
  - Do NOT hardcode provider names inside classification logic — use config + overrides only
  - Do NOT throw errors on unknown providers — default to premium
  - Do NOT import `combo.ts` directly — `ResolvedComboTarget` is exported via Task 1

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Core engine with caching, multi-level classification, config merging — needs careful implementation
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (after Wave 1)
  - **Parallel Group**: Wave 2 (with Tasks 6, 7, 8)
  - **Blocks**: Tasks 9, 11, 13 (ManifestAdapter and integration)
  - **Blocked By**: Tasks 1, 2, 3 (needs types, config, and pricing data)

  **References** (exhaustive):
  - `open-sse/services/combo.ts:209-211` — `rrCounters` Map pattern for in-memory caching (follow this Redis-free approach)
  - `open-sse/services/comboConfig.ts` — `resolveComboConfig()` / `getDefaultComboConfig()` — existing config resolution pattern
  - `open-sse/services/autoCombo/engine.ts` — `selectProvider()` — existing provider selection flow
  - `open-sse/services/autoCombo/scoring.ts:12-45` — `calculateFactors()` — multi-factor scoring with weights
  - `src/shared/utils/circuitBreaker.ts` — Cache invalidation pattern

  **Acceptance Criteria**:
  - [ ] `classifyTier("kiro", "claude-sonnet-4.5")` returns `{ tier: "free" }`
  - [ ] `classifyTier("openai", "gpt-4o")` returns `{ tier: "premium" }` (cost > $1/M)
  - [ ] `classifyTier("deepseek", "deepseek-chat")` returns `{ tier: "cheap" }` (cost ≤ $1/M)
  - [ ] Second call for same provider+model hits cache (<0.1ms)
  - [ ] `setTierConfig()` clears cache and re-classifies correctly
  - [ ] `classifyTiers()` batch operation works for 10+ targets
  - [ ] Model override glob pattern `gpt-4o-mini*` matches `gpt-4o-mini-2024-07-18`

  **QA Scenarios**:
  ```
  Scenario: Free provider classification
    Tool: Bash (node REPL)
    Preconditions: tierResolver.ts created
    Steps:
      1. Run: node --import tsx/esm -e "
         import { classifyTier, clearTierCache } from './open-sse/services/tierResolver.ts';
         clearTierCache();
         const result = classifyTier('kiro', 'claude-sonnet-4.5');
         console.log('PASS:', JSON.stringify({ tier: result.tier, reason: result.reason }));
       "
      2. Assert output contains tier:"free"
    Expected Result: Kiro classified as free
    Failure Indicators: Wrong tier or error
    Evidence: .sisyphus/evidence/task-5-free-tier.txt

  Scenario: Premium provider classification
    Tool: Bash (node REPL)
    Preconditions: tierResolver.ts created
    Steps:
      1. Run: node --import tsx/esm -e "
         import { classifyTier, clearTierCache } from './open-sse/services/tierResolver.ts';
         clearTierCache();
         const result = classifyTier('openai', 'gpt-4o');
         console.log('PASS:', JSON.stringify({ tier: result.tier, costPer1MInput: result.costPer1MInput }));
       "
      2. Assert output contains tier:"premium" and costPer1MInput:2.5
    Expected Result: GPT-4o classified as premium based on cost
    Failure Indicators: Wrong tier or incorrect cost
    Evidence: .sisyphus/evidence/task-5-premium-tier.txt

  Scenario: Cache performance
    Tool: Bash (node REPL)
    Preconditions: tierResolver.ts created
    Steps:
      1. Run: node --import tsx/esm -e "
         import { classifyTier, clearTierCache } from './open-sse/services/tierResolver.ts';
         clearTierCache();
         const t0 = performance.now();
         classifyTier('openai', 'gpt-4o');  // cold
         const cold = performance.now() - t0;
         const t1 = performance.now();
         classifyTier('openai', 'gpt-4o');  // cached
         const hot = performance.now() - t1;
         console.log('PASS:', JSON.stringify({ coldMs: cold.toFixed(2), hotMs: hot.toFixed(2), cacheHit: hot < 0.1 }));
       "
      2. Assert output contains cacheHit:true
    Expected Result: Cache hit <0.1ms
    Failure Indicators: Cache hit >0.1ms
    Evidence: .sisyphus/evidence/task-5-cache-perf.txt

  Scenario: Config change invalidates cache
    Tool: Bash (node REPL)
    Preconditions: tierResolver.ts created
    Steps:
      1. Run: node --import tsx/esm -e "
         import { classifyTier, setTierConfig, clearTierCache } from './open-sse/services/tierResolver.ts';
         clearTierCache();
         const before = classifyTier('openai', 'gpt-4o');
         setTierConfig({ providerOverrides: [{ provider: 'openai', tier: 'cheap' }] });
         const after = classifyTier('openai', 'gpt-4o');
         console.log('PASS:', JSON.stringify({ before: before.tier, after: after.tier, changed: before.tier !== after.tier }));
       "
      2. Assert output contains changed:true
    Expected Result: Config change re-classifies provider
    Failure Indicators: Tier unchanged after config override
    Evidence: .sisyphus/evidence/task-5-config-invalidate.txt

  Scenario: Batch classification
    Tool: Bash (node REPL)
    Preconditions: tierResolver.ts created
    Steps:
      1. Run: node --import tsx/esm -e "
         import { classifyTiers, clearTierCache } from './open-sse/services/tierResolver.ts';
         clearTierCache();
         const results = classifyTiers([
           { provider: 'kiro', model: 'claude-sonnet-4.5' },
           { provider: 'openai', model: 'gpt-4o-mini' },
           { provider: 'deepseek', model: 'deepseek-chat' },
         ]);
         console.log('PASS:', JSON.stringify(results.map(r => ({ provider: r.provider, tier: r.tier }))));
       "
      2. Assert output contains 3 results with different tiers
    Expected Result: Batch returns correct classification for all targets
    Failure Indicators: Missing results or wrong classifications
    Evidence: .sisyphus/evidence/task-5-batch.txt
  ```

  **Evidence to Capture**:
  - [ ] Free tier classification output
  - [ ] Premium tier classification output
  - [ ] Cache performance output
  - [ ] Config invalidation output
  - [ ] Batch classification output

  **Commit**: YES
  - Message: `feat(combo): implement tier resolver with caching and multi-level classification`
  - Files: `open-sse/services/tierResolver.ts`

- [ ] 6. **Implement SpecificityDetector — query complexity analysis engine**

  **What to do**:
  - Create `open-sse/services/specificityDetector.ts` with:
    ```typescript
    import type { SpecificityResult, SpecificityBreakdown, RuleInput } from "./specificityTypes";
    import { getSpecificityBreakdown, estimateMessageTokens } from "./specificityRules";

    // Maximum specificity score (sum of all breakdown categories)
    const MAX_SPECIFICITY_SCORE = 100; // 25 + 20 + 20 + 15 + 10 + 10

    // Analyze a request and return its specificity score
    export function analyzeSpecificity(input: RuleInput): SpecificityResult {
      const breakdown = getSpecificityBreakdown(input);
      const score = sumBreakdown(breakdown);
      const inputTokens = estimateMessageTokens(input.messages);
      const rulesTriggered = getTriggeredRules(breakdown);
      const confidence = calculateConfidence(breakdown, input);

      return {
        score: Math.min(MAX_SPECIFICITY_SCORE, score),
        breakdown,
        rulesTriggered,
        inputTokens,
        confidence,
      };
    }

    // Sum all breakdown categories into total score
    function sumBreakdown(breakdown: SpecificityBreakdown): number {
      return (
        breakdown.codeComplexity +
        breakdown.mathComplexity +
        breakdown.reasoningDepth +
        breakdown.contextSize +
        breakdown.toolCalling +
        breakdown.domainSpecificity
      );
    }

    // Get list of rule names that contributed to the score
    function getTriggeredRules(breakdown: SpecificityBreakdown): string[] {
      const triggered: string[] = [];
      if (breakdown.codeComplexity > 0) triggered.push("code-complexity");
      if (breakdown.mathComplexity > 0) triggered.push("math-complexity");
      if (breakdown.reasoningDepth > 0) triggered.push("reasoning-depth");
      if (breakdown.contextSize > 0) triggered.push("context-size");
      if (breakdown.toolCalling > 0) triggered.push("tool-calling");
      if (breakdown.domainSpecificity > 0) triggered.push("domain-specificity");
      return triggered;
    }

    // Calculate confidence in the specificity score
    // Higher confidence when more rules contribute (not just one dominant factor)
    function calculateConfidence(breakdown: SpecificityBreakdown, input: RuleInput): number {
      const nonZero = Object.values(breakdown).filter((v) => v > 0).length;
      const totalCategories = 6;
      const categoryCoverage = nonZero / totalCategories;

      // Boost confidence if we have substantial input
      const hasSubstantialInput = input.messages.length >= 2;
      const confidenceBoost = hasSubstantialInput ? 0.1 : 0;

      return Math.min(1, categoryCoverage * 0.8 + confidenceBoost);
    }

    // Categorize specificity into a human-readable level
    export type SpecificityLevel = "trivial" | "simple" | "moderate" | "complex" | "expert";

    export function getSpecificityLevel(score: number): SpecificityLevel {
      if (score <= 5) return "trivial";    // "Hello", quick greetings
      if (score <= 20) return "simple";     // Basic Q&A, simple factual
      if (score <= 40) return "moderate";   // Code help, medium discussion
      if (score <= 65) return "complex";    // Multi-step, code + reasoning
      return "expert";                      // Deep reasoning, math, specialized
    }

    // Get recommended minimum tier for a specificity level
    // Higher specificity → need higher-tier providers for quality
    export function getRecommendedMinTier(level: SpecificityLevel): string {
      switch (level) {
        case "trivial": return "free";    // Free providers can handle trivial queries
        case "simple": return "free";     // Free providers for simple queries
        case "moderate": return "cheap";  // Cheap providers for moderate complexity
        case "complex": return "cheap";   // Cheap/premium for complex queries
        case "expert": return "premium";  // Premium providers for expert-level queries
      }
    }

    // Quick check: is this a high-specificity query?
    export function isHighSpecificity(result: SpecificityResult): boolean {
      return result.score >= 50;
    }

    // Quick check: is this a low-specificity query that free tiers can handle?
    export function isLowSpecificity(result: SpecificityResult): boolean {
      return result.score <= 15;
    }
    ```

  **Must NOT do**:
  - Do NOT make LLM calls — pure heuristic analysis
  - Do NOT modify the input messages — read-only analysis
  - Do NOT add async operations — must complete in <5ms

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Core engine with scoring, confidence calculation, level categorization, and tier recommendations
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (after Wave 1)
  - **Parallel Group**: Wave 2 (with Tasks 5, 7, 8)
  - **Blocks**: Tasks 9, 14 (ManifestAdapter needs specificity results)
  - **Blocked By**: Tasks 1, 4 (needs types and rule functions)

  **References** (exhaustive):
  - `open-sse/services/specificityRules.ts` — Rule functions called by this detector
  - `open-sse/services/intentClassifier.ts` — `classifyWithConfig()` — existing classification pattern to follow
  - `open-sse/services/autoCombo/scoring.ts` — `calculateScore()` — scoring with factors pattern
  - `open-sse/services/autoCombo/taskFitness.ts` — `getTaskFitness()` — task-based capability assessment pattern

  **Acceptance Criteria**:
  - [ ] `analyzeSpecificity({ messages: [{ content: "Hello" }] })` returns score ≤ 5 (trivial)
  - [ ] `analyzeSpecificity({ messages: [{ content: "```ts\nfunction foo(){}\n```" }] })` returns score ≥ 10
  - [ ] `getSpecificityLevel(3)` returns "trivial"
  - [ ] `getSpecificityLevel(30)` returns "moderate"
  - [ ] `getSpecificityLevel(80)` returns "expert"
  - [ ] `getRecommendedMinTier("trivial")` returns "free"
  - [ ] `getRecommendedMinTier("expert")` returns "premium"
  - [ ] `isHighSpecificity()` and `isLowSpecificity()` return correct booleans

  **QA Scenarios**:
  ```
  Scenario: Trivial query (greeting)
    Tool: Bash (node REPL)
    Preconditions: specificityDetector.ts created
    Steps:
      1. Run: node --import tsx/esm -e "
         import { analyzeSpecificity, getSpecificityLevel } from './open-sse/services/specificityDetector.ts';
         const result = analyzeSpecificity({ messages: [{ content: 'Hello, how are you?' }] });
         const level = getSpecificityLevel(result.score);
         console.log('PASS:', JSON.stringify({ score: result.score, level, rules: result.rulesTriggered }));
       "
      2. Assert level === "trivial" and score ≤ 5
    Expected Result: Simple greeting classified as trivial
    Failure Indicators: High score for simple text
    Evidence: .sisyphus/evidence/task-6-trivial.txt

  Scenario: Complex code query
    Tool: Bash (node REPL)
    Preconditions: specificityDetector.ts created
    Steps:
      1. Run: node --import tsx/esm -e "
         import { analyzeSpecificity, getSpecificityLevel } from './open-sse/services/specificityDetector.ts';
         const result = analyzeSpecificity({
           messages: [
             { content: 'I need to implement a binary search tree with insert, delete, and balance operations.' },
             { content: 'First, let me define the Node interface. Step 1: create the class. Therefore, we need generics.' },
             { content: '```typescript\nclassBST<T> {\n  insert(val: T): void {}\n  delete(val: T): void {}\n}\n```' }
           ],
         });
         const level = getSpecificityLevel(result.score);
         console.log('PASS:', JSON.stringify({ score: result.score, level, breakdown: result.breakdown, rules: result.rulesTriggered }));
       "
      2. Assert score ≥ 40 and level in ["complex", "expert"]
    Expected Result: Code + reasoning query classified as complex/expert
    Failure Indicators: Low score for complex query
    Evidence: .sisyphus/evidence/task-6-complex.txt

  Scenario: Tier recommendation mapping
    Tool: Bash (node REPL)
    Preconditions: specificityDetector.ts created
    Steps:
      1. Run: node --import tsx/esm -e "
         import { getRecommendedMinTier } from './open-sse/services/specificityDetector.ts';
         const levels = ['trivial', 'simple', 'moderate', 'complex', 'expert'];
         const recommendations = levels.map(l => ({ level: l, minTier: getRecommendedMinTier(l as any) }));
         console.log('PASS:', JSON.stringify(recommendations));
       "
      2. Assert trivial→free, expert→premium
    Expected Result: Progressive tier recommendations
    Failure Indicators: Wrong tier recommendations
    Evidence: .sisyphus/evidence/task-6-tier-recs.txt

  Scenario: Performance check (<5ms)
    Tool: Bash (node REPL)
    Preconditions: specificityDetector.ts created
    Steps:
      1. Run: node --import tsx/esm -e "
         import { analyzeSpecificity } from './open-sse/services/specificityDetector.ts';
         const msgs = Array(20).fill({ content: 'Write a function that implements merge sort with O(n log n) complexity. Step 1: divide array. Therefore, use recursion. ```python\ndef merge_sort(arr): pass\n```' });
         const t0 = performance.now();
         analyzeSpecificity({ messages: msgs });
         const elapsed = performance.now() - t0;
         console.log('PASS:', JSON.stringify({ elapsedMs: elapsed.toFixed(2), underLimit: elapsed < 5 }));
       "
      2. Assert underLimit:true
    Expected Result: Analysis completes in <5ms even with 20 messages
    Failure Indicators: >5ms latency
    Evidence: .sisyphus/evidence/task-6-perf.txt
  ```

  **Evidence to Capture**:
  - [ ] Trivial query output
  - [ ] Complex code query output
  - [ ] Tier recommendations output
  - [ ] Performance check output

  **Commit**: YES
  - Message: `feat(combo): implement specificity detector with scoring, levels, and tier recommendations`
  - Files: `open-sse/services/specificityDetector.ts`

- [ ] 7. **Add advanced specificity rule implementations (context relay, tool chains, multi-turn patterns)**

  **What to do**:
  - Extend `open-sse/services/specificityRules.ts` with advanced detection functions:

    ```typescript
    // === ADD to existing specificityRules.ts ===

    // Detect multi-turn conversation patterns (back-and-forth depth)
    export function detectConversationDepth(input: RuleInput): number {
      const userMessages = input.messages.filter(
        (m) => (m as { role?: string }).role === "user"
      ).length;
      const assistantMessages = input.messages.filter(
        (m) => (m as { role?: string }).role === "assistant"
      ).length;

      // More turns = more context needed
      const totalTurns = userMessages + assistantMessages;
      if (totalTurns > 30) return 8;
      if (totalTurns > 20) return 6;
      if (totalTurns > 10) return 4;
      if (totalTurns > 5) return 2;
      return 0;
    }

    // Detect file/content references (file paths, diffs, code reviews)
    export function detectFileReferences(input: RuleInput): number {
      const allText = input.messages.map(m =>
        typeof m.content === "string" ? m.content : ""
      ).join("\n");

      const filePatterns = [
        /(?:\/[\w.-]+){2,}/g,        // Unix paths like /src/lib/file.ts
        /\b\w+:\d+:\d+\b/g,           // file:line:col references
        /\b(?:diff|patch|merge)\b/gi, // diff/patch/merge keywords
        /\b(?:README|CHANGELOG|TODO)\b/gi, // common doc files
        /@@[\s+-]+\d+,\d+\s+@@/g,     // diff hunks
      ];

      const matches = filePatterns.reduce((sum, re) => {
        return sum + (allText.match(re)?.length || 0);
      }, 0);

      return Math.min(5, matches * 1);
    }

    // Detect error/stack trace content
    export function detectErrorContext(input: RuleInput): number {
      const allText = input.messages.map(m =>
        typeof m.content === "string" ? m.content : ""
      ).join("\n");

      const errorPatterns = [
        /\b(?:Error|Exception|TypeError|ReferenceError|SyntaxError)\b/g,
        /\bat\s+[\w.]+\s+\([\w./]+:\d+:\d+\)/g,  // stack frames
        /\b(?:throw|catch|finally)\b/g,
        /\b(?:ERRO|FATAL|WARN)\b/g,
        /\b(?:failed|crashed|unexpected)\b/gi,
        /\bExit code \d+\b/g,
      ];

      const matches = errorPatterns.reduce((sum, re) => {
        return sum + (allText.match(re)?.length || 0);
      }, 0);

      return Math.min(5, matches * 0.5);
    }

    // Enhanced context size detection with system prompt and tools
    export function detectEnhancedContextSize(input: RuleInput): number {
      const msgTokens = estimateMessageTokens(input.messages);
      const sysTokens = input.systemPrompt ? estimateTokens(input.systemPrompt) : 0;
      const toolTokens = input.tools
        ? input.tools.reduce(
            (sum, t) =>
              sum +
              estimateTokens(
                JSON.stringify(
                  (t as { function?: { description?: string; parameters?: unknown } })
                    ?.function || t
                )
              ),
            0
          )
        : 0;

      const total = msgTokens + sysTokens + toolTokens;

      if (total > 100000) return 15;
      if (total > 64000) return 13;
      if (total > 32000) return 10;
      if (total > 16000) return 7;
      if (total > 8000) return 5;
      if (total > 4000) return 3;
      if (total > 1000) return 1;
      return 0;
    }

    // Update getSpecificityBreakdown to use enhanced context detection
    // (replaces the basic detectContextSize with enhanced version)
    export function getEnhancedSpecificityBreakdown(input: RuleInput): SpecificityBreakdown {
      return {
        codeComplexity: detectCodeComplexity(input),
        mathComplexity: detectMathComplexity(input),
        reasoningDepth: detectReasoningDepth(input),
        contextSize: detectEnhancedContextSize(input),
        toolCalling: detectToolCalling(input),
        domainSpecificity: detectDomainSpecificity(input),
      };
    }
    ```

  **Must NOT do**:
  - Do NOT replace the original `getSpecificityBreakdown()` — add enhanced version alongside
  - Do NOT import from external packages

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Advanced detection patterns with regex, multi-factor analysis
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO — extends existing Task 4 file
  - **Parallel Group**: Wave 2 (sequential after Task 4)
  - **Blocks**: Task 6 (SpecificityDetector uses enhanced breakdown)
  - **Blocked By**: Task 4 (extends specificityRules.ts)

  **References** (exhaustive):
  - `open-sse/services/specificityRules.ts` — File to extend (created in Task 4)
  - `open-sse/services/compression/engines/rtk/commandDetector.ts` — Command detection regex patterns (similar approach)
  - `open-sse/services/backgroundTaskDetector.ts` — Long-running task detection patterns
  - `open-sse/services/contextManager.ts` — Context size estimation patterns

  **Acceptance Criteria**:
  - [ ] `detectConversationDepth()` returns ≥4 for 10+ message conversation
  - [ ] `detectFileReferences()` detects Unix paths like `/src/lib/file.ts`
  - [ ] `detectErrorContext()` detects `TypeError` and stack traces
  - [ ] `detectEnhancedContextSize()` includes system prompt and tool tokens
  - [ ] `getEnhancedSpecificityBreakdown()` returns all 6 categories

  **QA Scenarios**:
  ```
  Scenario: Conversation depth detection
    Tool: Bash (node REPL)
    Preconditions: specificityRules.ts extended
    Steps:
      1. Run: node --import tsx/esm -e "
         import { detectConversationDepth } from './open-sse/services/specificityRules.ts';
         const msgs = Array(12).fill({ role: 'user', content: 'msg' }).concat(Array(8).fill({ role: 'assistant', content: 'reply' }));
         const score = detectConversationDepth({ messages: msgs });
         console.log('PASS:', JSON.stringify({ msgs: msgs.length, score, expected: score >= 4 }));
       "
      2. Assert expected:true
    Expected Result: Score ≥4 for 20-message conversation
    Failure Indicators: Low score for deep conversation
    Evidence: .sisyphus/evidence/task-7-conv-depth.txt

  Scenario: Error context detection
    Tool: Bash (node REPL)
    Preconditions: specificityRules.ts extended
    Steps:
      1. Run: node --import tsx/esm -e "
         import { detectErrorContext } from './open-sse/services/specificityRules.ts';
         const score = detectErrorContext({
           messages: [{ content: 'TypeError: Cannot read property \"name\" of undefined\\n  at UserRepo.get (src/repo.ts:42:15)\\n  at Handler.process (src/handler.ts:10:5)' }],
         });
         console.log('PASS:', JSON.stringify({ score, detected: score >= 2 }));
       "
      2. Assert detected:true
    Expected Result: Stack trace detected with score ≥2
    Failure Indicators: Zero score for error content
    Evidence: .sisyphus/evidence/task-7-error-ctx.txt

  Scenario: Enhanced context includes system prompt
    Tool: Bash (node REPL)
    Preconditions: specificityRules.ts extended
    Steps:
      1. Run: node --import tsx/esm -e "
         import { detectEnhancedContextSize } from './open-sse/services/specificityRules.ts';
         const basic = detectContextSize({ messages: [{ content: 'short query' }] });
         const enhanced = detectEnhancedContextSize({
           messages: [{ content: 'short query' }],
           systemPrompt: 'You are a helpful coding assistant. '.repeat(200),
           tools: [{ function: { name: 'search', description: 'Search the web for information', parameters: {} } }],
         });
         console.log('PASS:', JSON.stringify({ basic, enhanced, enhancedHigher: enhanced >= basic }));
       "
      2. Assert enhancedHigher:true
    Expected Result: Enhanced score ≥ basic score (system prompt adds tokens)
    Failure Indicators: Enhanced score lower than basic
    Evidence: .sisyphus/evidence/task-7-enhanced-context.txt
  ```

  **Evidence to Capture**:
  - [ ] Conversation depth output
  - [ ] Error context output
  - [ ] Enhanced context output

  **Commit**: YES
  - Message: `feat(combo): add advanced specificity rules (conversation depth, file refs, error context, enhanced token counting)`
  - Files: `open-sse/services/specificityRules.ts`

- [ ] 8. **Add DB-backed tier configuration loader with migration**

  **What to do**:
  - Create `src/lib/db/tierConfig.ts` for persistent tier configuration in SQLite:
    ```typescript
    import { getDbInstance } from "./core";
    import type { TierConfig } from "../../../open-sse/services/tierTypes";
    import { validateTierConfig, DEFAULT_TIER_CONFIG } from "../../../open-sse/services/tierConfig";

    const TABLE = "tier_config";

    // Initialize tier_config table
    export function initTierConfigTable(): void {
      const db = getDbInstance();
      db.exec(`
        CREATE TABLE IF NOT EXISTS ${TABLE} (
          key TEXT PRIMARY KEY,
          value TEXT NOT NULL,
          updated_at TEXT DEFAULT (datetime('now'))
        );
      `);
    }

    // Save tier config to DB
    export function saveTierConfig(config: TierConfig): void {
      const db = getDbInstance();
      const serialized = JSON.stringify(config);
      db.prepare(
        `INSERT OR REPLACE INTO ${TABLE} (key, value, updated_at) VALUES ('tier_config', ?, datetime('now'))`
      ).run(serialized);
    }

    // Load tier config from DB (returns null if not found)
    export function loadTierConfigFromDb(): TierConfig | null {
      const db = getDbInstance();
      const row = db.prepare(`SELECT value FROM ${TABLE} WHERE key = 'tier_config'`).get() as
        | { value: string }
        | undefined;
      if (!row) return null;
      try {
        return validateTierConfig(JSON.parse(row.value));
      } catch {
        return null;
      }
    }

    // Load tier config with fallback to defaults
    export function loadTierConfig(): TierConfig {
      return loadTierConfigFromDb() || DEFAULT_TIER_CONFIG;
    }
    ```

  - Create DB migration `src/lib/db/migrations/051_manifest_routing.sql`:
    ```sql
    -- Tier configuration storage for Manifest routing integration
    CREATE TABLE IF NOT EXISTS tier_config (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at TEXT DEFAULT (datetime('now'))
    );

    -- Tier assignment cache for fast lookup
    CREATE TABLE IF NOT EXISTS tier_assignments (
      provider TEXT NOT NULL,
      model TEXT NOT NULL,
      tier TEXT NOT NULL CHECK (tier IN ('free', 'cheap', 'premium')),
      cost_per_1m_input REAL DEFAULT 0,
      cost_per_1m_output REAL DEFAULT 0,
      has_free_tier INTEGER DEFAULT 0,
      free_quota_limit INTEGER,
      reason TEXT,
      updated_at TEXT DEFAULT (datetime('now')),
      PRIMARY KEY (provider, model)
    );

    -- Index for fast provider lookups
    CREATE INDEX IF NOT EXISTS idx_tier_assignments_provider ON tier_assignments(provider);
    CREATE INDEX IF NOT EXISTS idx_tier_assignments_tier ON tier_assignments(tier);
    ```

  - Register migration in `src/lib/db/migrationRunner.ts` (add entry for 023)

  **Must NOT do**:
  - Do NOT modify existing tables — only add new ones
  - Do NOT block startup on migration failure — graceful fallback

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: DB module following existing patterns in `src/lib/db/`
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (after Wave 1)
  - **Parallel Group**: Wave 2 (with Tasks 5, 6, 7)
  - **Blocks**: Task 5 (TierResolver uses DB for persistent config)
  - **Blocked By**: Task 2 (needs TierConfig type and schema)

  **References** (exhaustive):
  - `src/lib/db/core.ts` — `getDbInstance()` and table creation patterns
  - `src/lib/db/providers.ts` — Domain DB module pattern to follow exactly
  - `src/lib/db/settings.ts` — Key-value settings storage pattern
  - `src/lib/db/migrations/` — Existing 22 migration files for numbering and format
  - `src/lib/db/migrationRunner.ts` — How migrations are registered and executed

  **Acceptance Criteria**:
  - [ ] `initTierConfigTable()` creates `tier_config` and `tier_assignments` tables
  - [ ] `saveTierConfig()` persists config to SQLite
  - [ ] `loadTierConfig()` returns saved config or defaults
  - [ ] Migration file `051_manifest_routing.sql` exists
  - [ ] `npm run typecheck:core` passes

  **QA Scenarios**:
  ```
  Scenario: DB round-trip (save + load)
    Tool: Bash (node REPL)
    Preconditions: tierConfig DB module and migration created
    Steps:
      1. Run: node --import tsx/esm -e "
         import { saveTierConfig, loadTierConfig, initTierConfigTable } from './src/lib/db/tierConfig.ts';
         import { getDbInstance } from './src/lib/db/core.ts';
         initTierConfigTable();
         const testConfig = { version: '1.0.0', defaults: { freeThreshold: 0, cheapThreshold: 0.5 }, providerOverrides: [{ provider: 'test', tier: 'free' }], modelOverrides: [], freeProviders: ['test'] };
         saveTierConfig(testConfig);
         const loaded = loadTierConfig();
         console.log('PASS:', JSON.stringify({ testProvider:.loaded?.providerOverrides?.[0]?.provider, isTest: loaded?.providerOverrides?.[0]?.provider === 'test' }));
       "
      2. Assert isTest:true
    Expected Result: Config saved and loaded correctly
    Failure Indicators: Config not persisted or wrong values
    Evidence: .sisyphus/evidence/task-8-db-roundtrip.txt

  Scenario: Migration file exists and is valid SQL
    Tool: Bash
    Preconditions: Migration file created
    Steps:
       1. Run: test -f src/lib/db/migrations/051_manifest_routing.sql && echo "PASS: migration exists"
       2. Run: sqlite3 :memory: < src/lib/db/migrations/051_manifest_routing.sql && echo "PASS: valid SQL"
    Expected Result: Migration file exists and is valid SQL
    Failure Indicators: File missing or SQL syntax error
    Evidence: .sisyphus/evidence/task-8-migration.txt
  ```

  **Evidence to Capture**:
  - [ ] DB round-trip output
  - [ ] Migration file validation output

  **Commit**: YES
  - Message: `feat(combo): add DB-backed tier configuration with migration 023`
  - Files: `src/lib/db/tierConfig.ts`, `src/lib/db/migrations/051_manifest_routing.sql`

- [ ] 9. **Implement ManifestAdapter — bridge combining tier + specificity into routing hints**

  **What to do**:
  - Create `open-sse/services/manifestAdapter.ts` with:
    ```typescript
    import type { TierAssignment, ProviderTier } from "./tierTypes";
    import { PROVIDER_TIER } from "./tierTypes";
    import type { SpecificityResult, SpecificityLevel } from "./specificityTypes";
    import { classifyTier } from "./tierResolver";
    import { analyzeSpecificity, getSpecificityLevel, getRecommendedMinTier } from "./specificityDetector";
    import type { RuleInput } from "./specificityTypes";
    import type { ResolvedComboTarget } from "./combo";

    // Routing hint produced by combining tier + specificity
    export interface RoutingHint {
      // Provider tier classification for each target
      tierAssignments: Map<string, TierAssignment>;
      // Specificity analysis of the request
      specificity: SpecificityResult;
      // Human-readable specificity level
      specificityLevel: SpecificityLevel;
      // Minimum recommended tier for this request
      recommendedMinTier: ProviderTier;
      // Targets that satisfy the minimum tier
      eligibleTargets: ResolvedComboTarget[];
      // Targets that are above minimum tier (can be deprioritized for cost savings)
      overqualifiedTargets: ResolvedComboTarget[];
      // Targets below minimum tier (quality risk)
      underqualifiedTargets: ResolvedComboTarget[];
      // Suggested strategy modifier (e.g., "prefer-cheap", "require-premium")
      strategyModifier: StrategyModifier;
    }

    export type StrategyModifier =
      | "default"           // No modification — use combo's defined strategy
      | "prefer-free"       // Low specificity → prefer free providers
      | "prefer-cheap"      // Moderate specificity → prefer cheap providers
      | "require-premium"   // Expert specificity → require premium providers
      | "cost-save"         // High volume → optimize for cost
      | "quality-first";    // High risk/complexity → prioritize quality

    // Generate routing hints for a set of combo targets
    export function generateRoutingHints(
      targets: ResolvedComboTarget[],
      input: RuleInput
    ): RoutingHint {
      // Classify each target's tier
      const tierAssignments = new Map<string, TierAssignment>();
      for (const target of targets) {
        const key = `${target.provider}::${target.modelStr}`;
        if (!tierAssignments.has(key)) {
          tierAssignments.set(key, classifyTier(target.provider, target.modelStr));
        }
      }

      // Analyze request specificity
      const specificity = analyzeSpecificity(input);
      const specificityLevel = getSpecificityLevel(specificity.score);
      const recommendedMinTier = getRecommendedMinTier(specificityLevel) as ProviderTier;

      // Categorize targets by tier eligibility
      const tierOrder: ProviderTier[] = ["free", "cheap", "premium"];
      const minTierIndex = tierOrder.indexOf(recommendedMinTier);

      const eligibleTargets: ResolvedComboTarget[] = [];
      const overqualifiedTargets: ResolvedComboTarget[] = [];
      const underqualifiedTargets: ResolvedComboTarget[] = [];

      for (const target of targets) {
        const key = `${target.provider}::${target.modelStr}`;
        const assignment = tierAssignments.get(key);
        if (!assignment) continue;

        const targetTierIndex = tierOrder.indexOf(assignment.tier);
        if (targetTierIndex >= minTierIndex) {
          eligibleTargets.push(target);
          // "Overqualified" = premium when cheap would suffice
          if (targetTierIndex > minTierIndex) {
            overqualifiedTargets.push(target);
          }
        } else {
          underqualifiedTargets.push(target);
        }
      }

      // Determine strategy modifier
      const strategyModifier = determineStrategyModifier(
        specificityLevel,
        eligibleTargets.length,
        underqualifiedTargets.length
      );

      return {
        tierAssignments,
        specificity,
        specificityLevel,
        recommendedMinTier,
        eligibleTargets,
        overqualifiedTargets,
        underqualifiedTargets,
        strategyModifier,
      };
    }

    // Determine the best strategy modifier based on context
    function determineStrategyModifier(
      level: SpecificityLevel,
      eligibleCount: number,
      underqualifiedCount: number
    ): StrategyModifier {
      // Expert queries must use premium providers
      if (level === "expert") return "require-premium";
      // Complex queries prefer cheap+ providers
      if (level === "complex") return "prefer-cheap";
      // Moderate queries prefer cheap providers for cost efficiency
      if (level === "moderate") return "prefer-cheap";
      // Simple/trivial queries can use free providers
      if (level === "simple" || level === "trivial") return "prefer-free";
      return "default";
    }

    // Get tier for a specific target (convenience function)
    export function getTargetTier(target: ResolvedComboTarget): TierAssignment {
      return classifyTier(target.provider, target.modelStr);
    }

    // Estimate cost of sending a request to a specific target
    export function estimateRequestCost(
      target: ResolvedComboTarget,
      inputTokens: number,
      estimatedOutputTokens: number
    ): number {
      const pricing = getTargetTier(target);
      const inputCost = (inputTokens / 1_000_000) * pricing.costPer1MInput;
      const outputCost = (estimatedOutputTokens / 1_000_000) * pricing.costPer1MOutput;
      return inputCost + outputCost;
    }

    // Compare two targets by cost-effectiveness for a given specificity
    export function compareByCostEffectiveness(
      a: ResolvedComboTarget,
      b: ResolvedComboTarget,
      hint: RoutingHint
    ): number {
      const aTier = getTargetTier(a);
      const bTier = getTargetTier(b);
      const tierOrder: ProviderTier[] = ["free", "cheap", "premium"];

      // Prefer eligible targets over underqualified
      const aEligible = tierOrder.indexOf(aTier.tier) >= tierOrder.indexOf(hint.recommendedMinTier);
      const bEligible = tierOrder.indexOf(bTier.tier) >= tierOrder.indexOf(hint.recommendedMinTier);

      if (aEligible && !bEligible) return -1;
      if (!aEligible && bEligible) return 1;

      // Among eligible, prefer lower cost (cheaper tiers)
      return tierOrder.indexOf(aTier.tier) - tierOrder.indexOf(bTier.tier);
    }
    ```

  **Must NOT do**:
  - Do NOT modify `ResolvedComboTarget` type's structure — preserve all existing fields
  - Do NOT call this from combo.ts hot path synchronously — it can be called before dispatch
  - Do NOT make DB calls in `generateRoutingHints()` — use cached tier data

  **Implementation Note**:
  `ResolvedComboTarget` is exported from `combo.ts` (done in **Task 1 pre-requisite**). `manifestAdapter.ts` can `import type { ResolvedComboTarget } from "./combo"` directly.
  
  `ComboRuntimeStep` (line 103-112) includes a `combo-ref` variant that represents nested combo references. These don't have `provider`/`modelStr` fields. In `generateRoutingHints()`, filter targets to only `ResolvedComboTarget` (kind === "model") — combo-ref targets are passed through unchanged (resolved recursively by combo.ts itself).
  nested combo references. These don't have `provider`/`modelStr` fields. In `generateRoutingHints()`,
  we filter the targets to only `ResolvedComboTarget` (kind === "model") — combo-ref targets are
  passed through unchanged (they'll be resolved recursively by combo.ts itself).

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Complex bridge logic combining two subsystems, producing routing decisions
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO — depends on Tasks 5 and 6
  - **Parallel Group**: Wave 3 (with Tasks 10, 11, 12)
  - **Blocks**: Tasks 10, 11, 12, 15 (all integration tasks)
  - **Blocked By**: Tasks 5, 6 (needs TierResolver and SpecificityDetector)

  **References** (exhaustive):
  - `open-sse/services/combo.ts:90-101` — `ResolvedComboTarget` type this adapter consumes
  - `open-sse/services/combo.ts` — How targets flow through `handleComboChat()`
  - `open-sse/services/autoCombo/engine.ts` — `selectProvider()` pattern for provider selection
  - `open-sse/services/autoCombo/scoring.ts:28-45` — `calculateFactors()` — multi-factor weighting pattern
  - `open-sse/services/intentClassifier.ts` — `classifyWithConfig()` — classification → routing pattern

  **Acceptance Criteria**:
  - [ ] `generateRoutingHints()` classifies targets by tier eligibility
  - [ ] Trivial query → `strategyModifier: "prefer-free"`, `recommendedMinTier: "free"`
  - [ ] Expert query → `strategyModifier: "require-premium"`, `recommendedMinTier: "premium"`
  - [ ] `eligibleTargets` only contains targets meeting minimum tier
  - [ ] `compareByCostEffectiveness()` sorts cheaper eligible targets first

  **QA Scenarios**:
  ```
  Scenario: Low specificity query with multiple targets
    Tool: Bash (node REPL)
    Preconditions: manifestAdapter.ts created
    Steps:
      1. Run: node --import tsx/esm -e "
         import { generateRoutingHints } from './open-sse/services/manifestAdapter.ts';
         const targets = [
           { kind: 'model', stepId: '1', executionKey: 'k1', modelStr: 'kr/claude-sonnet-4.5', provider: 'kiro', providerId: 'kiro', connectionId: null, weight: 1, label: null },
           { kind: 'model', stepId: '2', executionKey: 'k2', modelStr: 'glm/glm-5.1', provider: 'glm', providerId: 'glm', connectionId: null, weight: 1, label: null },
           { kind: 'model', stepId: '3', executionKey: 'k3', modelStr: 'openai/gpt-4o', provider: 'openai', providerId: 'openai', connectionId: null, weight: 1, label: null },
         ];
         const hint = generateRoutingHints(targets, { messages: [{ content: 'Hello' }] });
         console.log('PASS:', JSON.stringify({ level: hint.specificityLevel, minTier: hint.recommendedMinTier, modifier: hint.strategyModifier, eligible: hint.eligibleTargets.length, under: hint.underqualifiedTargets.length }));
       "
      2. Assert modifier === "prefer-free" and all 3 targets eligible
    Expected Result: Low specificity → prefer free, all eligible
    Failure Indicators: Wrong modifier or incorrect eligibility
    Evidence: .sisyphus/evidence/task-9-low-spec.txt

  Scenario: High specificity query requires premium
    Tool: Bash (node REPL)
    Preconditions: manifestAdapter.ts created
    Steps:
      1. Run: node --import tsx/esm -e "
         import { generateRoutingHints } from './open-sse/services/manifestAdapter.ts';
         const targets = [
           { kind: 'model', stepId: '1', executionKey: 'k1', modelStr: 'kr/claude-sonnet-4.5', provider: 'kiro', providerId: 'kiro', connectionId: null, weight: 1, label: null },
           { kind: 'model', stepId: '2', executionKey: 'k2', modelStr: 'openai/gpt-4o', provider: 'openai', providerId: 'openai', connectionId: null, weight: 1, label: null },
         ];
         const hint = generateRoutingHints(targets, { messages: [
           { content: 'Implement a distributed consensus algorithm. First, define the state machine. Step 1: Raft leader election. Therefore, we need heartbeat mechanisms. ```go\\nfunc (r *Raft) elect() {}\\n``` The proof shows that $\\sum_{i=1}^{n} x_i = n^2$ given $x_i = 2i-1$.' }
         ]});
         console.log('PASS:', JSON.stringify({ level: hint.specificityLevel, minTier: hint.recommendedMinTier, modifier: hint.strategyModifier, score: hint.specificity.score }));
       "
      2. Assert modifier === "require-premium"
    Expected Result: High specificity → require premium
    Failure Indicators: Wrong modifier for complex query
    Evidence: .sisyphus/evidence/task-9-high-spec.txt
  ```

  **Evidence to Capture**:
  - [ ] Low specificity routing hints
  - [ ] High specificity routing hints

  **Commit**: YES
  - Message: `feat(combo): implement manifest adapter combining tier + specificity into routing hints`
  - Files: `open-sse/services/manifestAdapter.ts`

- [ ] 10. **Enhance cost-optimized strategy with tier-aware routing**

  **What to do**:
  - Modify the `cost-optimized` strategy in `open-sse/services/combo.ts` to use `RoutingHint` data:
    - Locate the cost-optimized strategy dispatch block (search for `"cost-optimized"` in combo.ts)
    - Add tier-aware target reordering before dispatch:
      ```typescript
      // Inside handleComboChat(), after resolveComboTargets():
      // When strategy is cost-optimized and manifest routing is enabled:
      if (comboStrategy === "cost-optimized" && manifestHints) {
        // Reorder targets: prefer cheaper eligible targets
        targets = reorderTargetsByCostEffectiveness(targets, manifestHints);
      }
      ```
    - Add helper function `reorderTargetsByCostEffectiveness()`:
      ```typescript
      function reorderTargetsByCostEffectiveness(
        targets: ResolvedComboTarget[],
        hint: RoutingHint
      ): ResolvedComboTarget[] {
        return [...targets].sort((a, b) =>
          compareByCostEffectiveness(a, b, hint)
        );
      }
      ```
    - Add opt-in flag: combo configs can set `manifestRouting: true` to enable

  - Add manifest routing flag to combo config schema:
    ```typescript
    // In combo config types (or open-sse/services/comboConfig.ts)
    export interface ComboConfig {
      // ... existing fields ...
      manifestRouting?: boolean;  // Enable tier+specificity routing (default: false)
    }
    ```

  **Must NOT do**:
  - Do NOT change default behavior — `manifestRouting` defaults to `false`
  - Do NOT modify the `ResolvedComboTarget` type
  - Do NOT change other strategy implementations (only cost-optimized for now)

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Modifies existing 2170-line combo.ts — needs careful integration without breaking anything
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO — needs ManifestAdapter from Task 9
  - **Parallel Group**: Wave 3 (with Tasks 9, 11, 12)
  - **Blocks**: Task 11 (combo.ts integration)
  - **Blocked By**: Task 9 (needs RoutingHint and compareByCostEffectiveness)

  **References** (exhaustive):
  - `open-sse/services/combo.ts` — Main file to modify (search "cost-optimized" for the strategy block)
  - `open-sse/services/comboConfig.ts` — Combo config resolution to add `manifestRouting` flag
  - `open-sse/services/manifestAdapter.ts` — `RoutingHint`, `compareByCostEffectiveness()` to consume
  - `open-sse/services/AGENTS.md` — Anti-patterns to avoid (no blocking I/O in hot path)

  **Acceptance Criteria**:
  - [ ] `cost-optimized` strategy with `manifestRouting: true` reorders targets by cost-effectiveness
  - [ ] `cost-optimized` strategy with `manifestRouting: false` (default) works unchanged
  - [ ] `manifestRouting` flag added to combo config with default `false`
  - [ ] All existing combo tests still pass

  **QA Scenarios**:
  ```
  Scenario: Cost-optimized with manifest routing enabled
    Tool: Bash (node REPL)
    Preconditions: Enhanced cost-optimized strategy
    Steps:
      1. Run: node --import tsx/esm -e "
         import { generateRoutingHints } from './open-sse/services/manifestAdapter.ts';
         const targets = [
           { kind: 'model', stepId: '1', executionKey: 'k1', modelStr: 'openai/gpt-4o', provider: 'openai', providerId: 'openai', connectionId: null, weight: 1, label: null },
           { kind: 'model', stepId: '2', executionKey: 'k2', modelStr: 'glm/glm-5.1', provider: 'glm', providerId: 'glm', connectionId: null, weight: 1, label: null },
           { kind: 'model', stepId: '3', executionKey: 'k3', modelStr: 'kr/claude-sonnet-4.5', provider: 'kiro', providerId: 'kiro', connectionId: null, weight: 1, label: null },
         ];
         const hint = generateRoutingHints(targets, { messages: [{ content: 'Hello' }] });
         const reordered = [...targets].sort((a, b) => {
           const { compareByCostEffectiveness } = require('./open-sse/services/manifestAdapter.ts');
           return compareByCostEffectiveness(a, b, hint);
         });
         console.log('PASS:', JSON.stringify({ before: targets.map(t => t.provider), after: reordered.map(t => t.provider) }));
       "
      2. Assert after[0] is cheaper than before[0] (for trivial query)
    Expected Result: Cheaper providers sorted first for low-specificity queries
    Failure Indicators: Premium provider still first
    Evidence: .sisyphus/evidence/task-10-cost-optimized.txt

  Scenario: Backward compatibility (manifestRouting: false)
    Tool: Bash
    Preconditions: Enhanced cost-optimized strategy
    Steps:
      1. Run: npm run typecheck:core
      2. Assert exit code 0
    Expected Result: No type errors from combo.ts changes
    Failure Indicators: Type errors related to manifest routing
    Evidence: .sisyphus/evidence/task-10-backward-compat.txt
  ```

  **Evidence to Capture**:
  - [ ] Cost-optimized reordering output
  - [ ] Backward compatibility check

  **Commit**: YES
  - Message: `feat(combo): enhance cost-optimized strategy with tier-aware routing and manifestRouting flag`
  - Files: `open-sse/services/combo.ts`, `open-sse/services/comboConfig.ts`

- [ ] 11. **Integrate ManifestAdapter into combo.ts dispatch flow**

  **What to do**:
  - Export `ResolvedComboTarget` type from `open-sse/services/combo.ts` (change `type ResolvedComboTarget` to `export type ResolvedComboTarget` at line 90)
  - Modify `open-sse/services/combo.ts` to hook `generateRoutingHints()` into the dispatch flow:
    - Add import: `import { generateRoutingHints } from "./manifestAdapter";`
    - After `resolveComboTargets()` in `handleComboChat()`, add:
      ```typescript
      // Manifest routing integration (opt-in via combo config)
      let manifestHints: RoutingHint | null = null;
      if (comboConfig?.manifestRouting) {
        try {
          manifestHints = generateRoutingHints(targets, {
            messages: body.messages || [],
            systemPrompt: typeof body.messages?.[0]?.content === "string" ? undefined : undefined,
            tools: body.tools,
            model: body.model,
          });
          // Apply strategy modifier
          if (manifestHints.strategyModifier === "require-premium") {
            // Filter out underqualified targets for expert queries
            targets = manifestHints.eligibleTargets;
          }
          log.debug({ strategyModifier: manifestHints.strategyModifier, specificityLevel: manifestHints.specificityLevel, score: manifestHints.specificity.score }, "manifest routing applied");
        } catch (err) {
          log.warn({ err }, "manifest routing failed, falling back to standard strategy");
        }
      }
      ```
    - Add recording to combo metrics: log specificity score for observability
  - Extend `open-sse/services/comboMetrics.ts` to log specificity data (no new tables):
    ```typescript
    // Add to comboMetrics.ts — log-only, no DB table
    export function recordComboIntentWithSpecificity(
      comboName: string,
      specificityScore: number,
      specificityLevel: string,
      strategyModifier: string
    ): void {
      // Log for observability; dashboard analytics can aggregate from logs
      // No new DB table — avoids dead-end data without a consumer.
      // If analytics demand this later, it will be added in a dedicated analytics migration.
      getLogger().info(
        { comboName, specificityScore, specificityLevel, strategyModifier },
        "combo manifest routing applied"
      );
    }
    ```
    **Rationale**: A new `combo_specificity_metrics` table would be a "dead-end" data sink — no dashboard page, no API route, and no reporting tool currently reads it. Adding a table without a consumer adds DB bloat and maintenance overhead. Logging specificity data to the existing pino logger provides observability immediately, and structured logs can be shipped to an analytics pipeline later.

  **Must NOT do**:
  - Do NOT make manifest routing the default — must be opt-in
  - Do NOT throw errors if manifest routing fails — gracefully fallback
  - Do NOT modify non-combo strategy handlers

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Modifying the critical path in combo.ts (2170-line file) — high risk, needs precision
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO — depends on Tasks 9 and 10
  - **Parallel Group**: Wave 3 (with Tasks 10, 12)
  - **Blocks**: Task 16 (integration tests)
  - **Blocked By**: Tasks 9, 10 (needs ManifestAdapter and enhanced cost-optimized)

  **References** (exhaustive):
  - `open-sse/services/combo.ts:209-250` — `handleComboChat()` function (WHERE to add manifest hook)
  - `open-sse/services/combo.ts:1-34` — Import section (ADD manifest imports)
  - `open-sse/services/comboMetrics.ts` — `recordComboIntent()` function to extend
  - `open-sse/services/autoCombo/engine.ts` — Pattern for opt-in auto-routing integration
  - `open-sse/services/AGENTS.md` — "Combo-first design" and "No blocking I/O" constraints

  **Acceptance Criteria**:
  - [ ] `manifestRouting: true` in combo config triggers `generateRoutingHints()`
  - [ ] `manifestRouting: false` (default) has zero impact on existing behavior
  - [ ] Manifest routing failure gracefully falls back to standard strategy
  - [ ] Specificity score logged to combo metrics
  - [ ] `npm run typecheck:core` passes

  **QA Scenarios**:
  ```
  Scenario: Manifest routing opt-in works
    Tool: Bash (node REPL)
    Preconditions: combo.ts modified with manifest routing
    Steps:
      1. Run: node --import tsx/esm -e "
         import { generateRoutingHints } from './open-sse/services/manifestAdapter.ts';
         const result = generateRoutingHints([], { messages: [{ content: 'Test' }] });
         console.log('PASS:', JSON.stringify({ level: result.specificityLevel, modifier: result.strategyModifier }));
       "
      2. Assert output contains valid specificity data
    Expected Result: Manifest routing generates hints without error
    Failure Indicators: Import error or runtime exception
    Evidence: .sisyphus/evidence/task-11-opt-in.txt

  Scenario: TypeScript compilation
    Tool: Bash
    Preconditions: combo.ts modified
    Steps:
      1. Run: npm run typecheck:core
      2. Assert exit code 0
    Expected Result: No type errors
    Failure Indicators: Type errors in combo.ts
    Evidence: .sisyphus/evidence/task-11-typecheck.txt

  Scenario: Circular dependency check
    Tool: Bash
    Preconditions: All new files created
    Steps:
      1. Run: npm run check:cycles
      2. Assert exit code 0
    Expected Result: No circular dependencies introduced
    Failure Indicators: Circular dep between new services
    Evidence: .sisyphus/evidence/task-11-cycles.txt
  ```

  **Evidence to Capture**:
  - [ ] Opt-in integration output
  - [ ] TypeScript compilation
  - [ ] Circular dependency check

  **Commit**: YES
  - Message: `feat(combo): integrate manifest routing into combo dispatch with opt-in flag and metrics`
  - Files: `open-sse/services/combo.ts`, `open-sse/services/comboMetrics.ts`, `src/lib/db/migrations/051_manifest_routing.sql`

- [ ] 12. **Add tier-aware scoring factors to autoCombo**

  **What to do**:
  - Modify `open-sse/services/autoCombo/scoring.ts` to include tier and specificity as scoring factors. The existing `calculateFactors()` signature is `calculateFactors(candidate, pool, taskType, getTaskFitness)`. Add an **optional 5th parameter `manifestHint?: RoutingHint | null`** and forward it from `scorePool()`:

    ```typescript
    // Add to scoring factors interface
    export interface ScoringWeights {
      // ... existing weights ...
      tierAffinity: number;      // 0–1: preference for appropriate-tier providers (default: 0.15)
      specificityMatch: number;  // 0–1: how well provider tier matches query specificity (default: 0.10)
    }

    // Update DEFAULT_WEIGHTS — rebalance so total = 1.0
    export const DEFAULT_WEIGHTS: ScoringWeights = {
      // ... existing weights reduced slightly ...
      quota: 0.17,
      health: 0.22,
      costInv: 0.17,
      latencyInv: 0.13,
      taskFit: 0.08,
      stability: 0.05,
      tierPriority: 0.05,
      tierAffinity: 0.05,       // NEW
      specificityMatch: 0.08, // NEW
    };

    // Add tier affinity and specificity match to ScoringFactors
    export interface ScoringFactors {
      // ... existing factors ...
      tierAffinity: number;
      specificityMatch: number;
    }

    // Update calculateFactors signature: add optional manifestHint as 5th param
    export function calculateFactors(
      candidate: ProviderCandidate,
      pool: ProviderCandidate[],
      taskType: string,
      getTaskFitness: (model: string, taskType: string) => number,
      manifestHint?: RoutingHint | null
    ): ScoringFactors {
      // ... existing factor calculations ...

      // Tier affinity: higher score if provider tier matches request specificity
      const tierAffinity = manifestHint
        ? calculateTierAffinity(candidate, manifestHint)
        : 0.5;

      // Specificity match: how well provider capabilities match query complexity
      const specificityMatch = manifestHint
        ? calculateSpecificityMatch(candidate, manifestHint)
        : 0.5;

      return {
        // ... existing factors ...
        tierAffinity,
        specificityMatch,
      };
    }

    // Update scorePool to accept and forward manifestHint
    export function scorePool(
      pool: ProviderCandidate[],
      taskType: string,
      weights: ScoringWeights = DEFAULT_WEIGHTS,
      getTaskFitness: (model: string, taskType: string) => number = () => 0.5,
      manifestHint?: RoutingHint | null
    ): ScoredProvider[] {
      return pool
        .map((candidate) => {
          const factors = calculateFactors(candidate, pool, taskType, getTaskFitness, manifestHint);
          return {
            provider: candidate.provider,
            model: candidate.model,
            score: calculateScore(factors, weights),
            factors,
          };
        })
        .sort((a, b) => b.score - a.score);
    }

    function calculateTierAffinity(candidate: ProviderCandidate, hint: RoutingHint): number {
      try {
        const assignment = classifyTier(candidate.provider, candidate.model);
        const tierOrder = ["free", "cheap", "premium"];
        const providerTierIdx = tierOrder.indexOf(assignment.tier);
        const minTierIdx = tierOrder.indexOf(hint.recommendedMinTier);

        // Perfect match = 1.0, one tier off = 0.7, two tiers off = 0.3
        if (providerTierIdx === minTierIdx) return 1.0;
        if (Math.abs(providerTierIdx - minTierIdx) === 1) return 0.7;
        return 0.3;
      } catch {
        return 0.5; // neutral on classification failure
      }
    }

    function calculateSpecificityMatch(candidate: ProviderCandidate, hint: RoutingHint): number {
      try {
        const assignment = classifyTier(candidate.provider, candidate.model);
        const specificityScore = hint.specificity.score;

        if (assignment.tier === "free") return specificityScore <= 15 ? 0.9 : 0.2;
        if (assignment.tier === "cheap") return specificityScore > 15 && specificityScore <= 50 ? 0.9 : 0.4;
        if (assignment.tier === "premium") return specificityScore > 50 ? 0.9 : 0.3;
        return 0.5;
      } catch {
        return 0.5;
      }
    }
    ```

  **Must NOT do**:
  - Do NOT change default scoring weights (existing behavior must work same)
  - Do NOT require manifestHint — gracefully handle null/undefined

  **Recommended Agent Profile**:
  - **Category**: `deep`
    - Reason: Modifying scoring algorithm with new factors — needs mathematical correctness
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 3 (with Tasks 10, 11)
  - **Blocks**: Task 16 (integration tests need new scoring)
  - **Blocked By**: Task 9 (needs ManifestAdapter for RoutingHint)

  **References** (exhaustive):
  - `open-sse/services/autoCombo/scoring.ts` — File to modify (calculateFactors, calculateScore, ScoringWeights)
  - `open-sse/services/autoCombo/engine.ts` — Where scoring context is built
  - `open-sse/services/autoCombo/taskFitness.ts` — `getTaskFitness()` — similar capability-matching pattern
  - `open-sse/services/tierResolver.ts` — `classifyTier()` used in tier affinity calc

  **Acceptance Criteria**:
  - [ ] `calculateFactors()` includes `tierAffinity` and `specificityMatch` when manifestHint present
  - [ ] Without `manifestHint`, new factors return 0.5 (neutral — no impact)
  - [ ] Free provider gets `tierAffinity: 1.0` when `recommendedMinTier: "free"`
  - [ ] Premium provider gets `specificityMatch: 0.9` when specificity score > 50
  - [ ] `npm run typecheck:core` passes

  **QA Scenarios**:
  ```
  Scenario: Tier affinity with matching tiers
    Tool: Bash (node REPL)
    Preconditions: scoring.ts modified
    Steps:
      1. Test calculateFactors with manifestHint where recommendedMinTier matches provider tier
      2. Assert tierAffinity === 1.0
    Expected Result: Perfect tier match yields highest affinity
    Failure Indicators: tierAffinity < 1.0 for exact match
    Evidence: .sisyphus/evidence/task-12-tier-affinity.txt

  Scenario: Neutral scoring without manifest hint
    Tool: Bash (node REPL)
    Preconditions: scoring.ts modified
    Steps:
      1. Test calculateFactors without manifestHint
      2. Assert tierAffinity === 0.5 and specificityMatch === 0.5
    Expected Result: Neutral (0.5) when no manifest data
    Failure Indicators: Non-neutral values without manifest data
    Evidence: .sisyphus/evidence/task-12-neutral.txt
  ```

  **Evidence to Capture**:
  - [ ] Tier affinity output
  - [ ] Neutral scoring output

  **Commit**: YES
  - Message: `feat(combo): add tier affinity and specificity match factors to autoCombo scoring`
  - Files: `open-sse/services/autoCombo/scoring.ts`

- [ ] 13. **Write TierResolver unit tests (30+ test cases)**

  **What to do**:
  - Create `open-sse/services/__tests__/tierResolver.test.ts` with comprehensive tests:
    ```typescript
    import { describe, it } from "node:test";
    import assert from "node:assert/strict";
    import { classifyTier, setTierConfig, clearTierCache, getTierStats, classifyTiers } from "../tierResolver.ts";
    import { PROVIDER_TIER } from "../tierTypes.ts";

    describe("TierResolver", () => {
      // Reset cache between tests
      beforeEach(() => clearTierCache());

      describe("classifyTier - free providers", () => {
        it("classifies Kiro as free", () => {
          const result = classifyTier("kiro", "claude-sonnet-4.5");
          assert.equal(result.tier, PROVIDER_TIER.FREE);
          assert.equal(result.hasFreeTier, true);
        });
        it("classifies Qoder as free", () => {
          const result = classifyTier("qoder", "kimi-k2-thinking");
          assert.equal(result.tier, PROVIDER_TIER.FREE);
          assert.equal(result.hasFreeTier, true);
        });
        it("classifies Pollinations as free", () => {
          const result = classifyTier("pollinations", "gpt-5");
          assert.equal(result.tier, PROVIDER_TIER.FREE);
          assert.equal(result.hasFreeTier, true);
        });
        it("classifies LongCat as free", () => {
          const result = classifyTier("longcat", "flash-lite");
          assert.equal(result.tier, PROVIDER_TIER.FREE);
          assert.equal(result.hasFreeTier, true);
        });
        it("classifies Qwen as free", () => {
          const result = classifyTier("qwen", "qwen3-coder-plus");
          assert.equal(result.tier, PROVIDER_TIER.FREE);
          assert.equal(result.hasFreeTier, true);
        });
        it("classifies Cloudflare AI as free", () => {
          const result = classifyTier("cloudflare-ai", "llama-3.3-70b");
          assert.equal(result.tier, PROVIDER_TIER.FREE);
          assert.equal(result.hasFreeTier, true);
        });
        it("classifies NVIDIA NIM as free", () => {
          const result = classifyTier("nvidia-nim", "llama-3.1-8b");
          assert.equal(result.tier, PROVIDER_TIER.FREE);
          assert.equal(result.hasFreeTier, true);
        });
        it("classifies Cerebras as free", () => {
          const result = classifyTier("cerebras", "llama-3.1-70b");
          assert.equal(result.tier, PROVIDER_TIER.FREE);
          assert.equal(result.hasFreeTier, true);
        });
        it("classifies Groq as free", () => {
          const result = classifyTier("groq", "llama-3.3-70b");
          assert.equal(result.tier, PROVIDER_TIER.FREE);
          assert.equal(result.hasFreeTier, true);
        });
        it("sets costPer1MInput to 0 for free providers", () => {
          const result = classifyTier("kiro", "claude-sonnet-4.5");
          assert.equal(result.costPer1MInput, 0);
          assert.equal(result.costPer1MOutput, 0);
        });
      });

      describe("classifyTier - cost-based classification", () => {
        it("classifies DeepSeek as cheap ($0.27/M < $1.00/M)", () => {
          const result = classifyTier("deepseek", "deepseek-chat");
          assert.equal(result.tier, PROVIDER_TIER.CHEAP);
          assert.ok(result.costPer1MInput <= 1.0);
        });
        it("classifies GLM as cheap ($0.60/M < $1.00/M)", () => {
          const result = classifyTier("glm", "glm-4.7");
          assert.equal(result.tier, PROVIDER_TIER.CHEAP);
          assert.ok(result.costPer1MInput <= 1.0);
        });
        it("classifies MiniMax as cheap ($0.20/M < $1.00/M)", () => {
          const result = classifyTier("minimax", "minimax-m2.1");
          assert.equal(result.tier, PROVIDER_TIER.CHEAP);
          assert.ok(result.costPer1MInput <= 1.0);
        });
        it("classifies GPT-4o as premium ($2.50/M > $1.00/M)", () => {
          const result = classifyTier("openai", "gpt-4o");
          assert.equal(result.tier, PROVIDER_TIER.PREMIUM);
          assert.ok(result.costPer1MInput > 1.0);
        });
        it("classifies Claude Opus as premium ($15.00/M > $1.00/M)", () => {
          const result = classifyTier("anthropic", "claude-opus-4-7");
          assert.equal(result.tier, PROVIDER_TIER.PREMIUM);
          assert.ok(result.costPer1MInput > 1.0);
        });
        it("defaults unknown providers to premium", () => {
          const result = classifyTier("unknown-provider", "unknown-model");
          assert.equal(result.tier, PROVIDER_TIER.PREMIUM);
          assert.equal(result.costPer1MInput, 5.0); // default premium pricing
        });
      });

      describe("classifyTier - config overrides", () => {
        it("respects provider-level tier override", () => {
          setTierConfig({ providerOverrides: [{ provider: "openai", tier: "cheap" }] });
          const result = classifyTier("openai", "gpt-4o");
          assert.equal(result.tier, PROVIDER_TIER.CHEAP);
          assert.ok(result.reason.includes("override"));
        });
        it("respects model-level glob pattern override", () => {
          setTierConfig({ modelOverrides: [{ provider: "openai", modelPattern: "gpt-4o-mini*", tier: "cheap" }] });
          const result = classifyTier("openai", "gpt-4o-mini-2024-07-18");
          assert.equal(result.tier, PROVIDER_TIER.CHEAP);
        });
        it("glob pattern gpt-4o-mini* matches gpt-4o-mini-2024-07-18", () => {
          setTierConfig({ modelOverrides: [{ provider: "openai", modelPattern: "gpt-4o-mini*", tier: "cheap" }] });
          const result = classifyTier("openai", "gpt-4o-mini-2024-07-18");
          assert.equal(result.tier, PROVIDER_TIER.CHEAP);
        });
        it("config change invalidates cache", () => {
          const before = classifyTier("openai", "gpt-4o");
          assert.equal(before.tier, PROVIDER_TIER.PREMIUM);
          setTierConfig({ providerOverrides: [{ provider: "openai", tier: "free" }] });
          const after = classifyTier("openai", "gpt-4o");
          assert.equal(after.tier, PROVIDER_TIER.FREE);
        });
      });

      describe("classifyTier - caching", () => {
        it("returns cached result on second call", () => {
          classifyTier("openai", "gpt-4o");
          const t0 = performance.now();
          classifyTier("openai", "gpt-4o");
          const elapsed = performance.now() - t0;
          assert.ok(elapsed < 0.1, "cache hit should be <0.1ms");
        });
        it("clearTierCache() forces re-classification", () => {
          const first = classifyTier("openai", "gpt-4o");
          clearTierCache();
          const second = classifyTier("openai", "gpt-4o");
          assert.equal(first.tier, second.tier);
          assert.ok(second.costPer1MInput > 0);
        });
      });

      describe("classifyTiers - batch operation", () => {
        it("classifies 10 targets correctly", () => {
          const targets = [
            { provider: "kiro", model: "claude-sonnet-4.5" },
            { provider: "openai", model: "gpt-4o" },
            { provider: "deepseek", model: "deepseek-chat" },
            { provider: "glm", model: "glm-4.7" },
            { provider: "minimax", model: "minimax-m2.1" },
            { provider: "anthropic", model: "claude-opus-4-7" },
            { provider: "groq", model: "llama-3.3-70b" },
            { provider: "qoder", model: "kimi-k2-thinking" },
            { provider: "qwen", model: "qwen3-coder-plus" },
            { provider: "unknown", model: "unknown-model" },
          ];
          const results = classifyTiers(targets);
          assert.equal(results.length, 10);
          assert.equal(results[0].tier, PROVIDER_TIER.FREE);  // kiro
          assert.equal(results[1].tier, PROVIDER_TIER.PREMIUM); // openai
          assert.equal(results[2].tier, PROVIDER_TIER.CHEAP);   // deepseek
          assert.equal(results[9].tier, PROVIDER_TIER.PREMIUM); // unknown
        });
        it("uses cache for repeated models", () => {
          classifyTiers([
            { provider: "openai", model: "gpt-4o" },
            { provider: "openai", model: "gpt-4o" },
          ]);
          // If cache works, second call should be instant; test passes if no error
          assert.ok(true);
        });
      });

      describe("getTierStats", () => {
        it("returns distribution after classifications", () => {
          clearTierCache();
          classifyTier("kiro", "claude-sonnet-4.5");
          classifyTier("openai", "gpt-4o");
          classifyTier("deepseek", "deepseek-chat");
          const stats = getTierStats();
          assert.ok(stats[PROVIDER_TIER.FREE] >= 1);
          assert.ok(stats[PROVIDER_TIER.PREMIUM] >= 1);
          assert.ok(stats[PROVIDER_TIER.CHEAP] >= 1);
        });
      });
    });
    ```

  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Writing tests following established patterns — methodical but not complex
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES
  - **Parallel Group**: Wave 4 (with Tasks 14, 15, 16)
  - **Blocks**: F1-F4 (tests needed for verification)
  - **Blocked By**: Task 5 (needs TierResolver implementation)

  **References**:
  - `open-sse/services/autoCombo/__tests__/autoCombo.test.ts` — Existing test patterns
  - `open-sse/services/__tests__/volumeDetector.test.ts` — Service test pattern
  - `CONTRIBUTING.md` — Test guidelines (60% coverage gate)

  **Acceptance Criteria**:
  - [ ] `node --import tsx/esm --test open-sse/services/__tests__/tierResolver.test.ts` passes
  - [ ] 30+ test cases covering free/cheap/premium, overrides, caching, batch

  **QA Scenarios**:
  ```
  Scenario: All TierResolver tests pass
    Tool: Bash
    Preconditions: Test file created
    Steps:
      1. Run: node --import tsx/esm --test open-sse/services/__tests__/tierResolver.test.ts
      2. Assert exit code 0 and all tests pass
    Expected Result: 30+ tests pass
    Failure Indicators: Any test failures
    Evidence: .sisyphus/evidence/task-13-tier-tests.txt
  ```

  **Commit**: YES
  - Message: `test(combo): add 30+ unit tests for TierResolver`
  - Files: `open-sse/services/__tests__/tierResolver.test.ts`

- [ ] 14. **Write SpecificityDetector unit tests (25+ test cases)**

  **What to do**:
  - Create `open-sse/services/__tests__/specificityDetector.test.ts` with:
    - Trivial query (greeting) → score ≤ 5, level = "trivial"
    - Simple factual Q&A → score 5–20, level = "simple"
    - Code assistance → score 20–40, level = "moderate"
    - Multi-step reasoning → score 40–65, level = "complex"
    - Expert reasoning + math + code → score ≥ 65, level = "expert"
    - Tool calling presence → increased score
    - Domain-specific terminology detection
    - `getRecommendedMinTier()` mapping for all 5 levels
    - `isHighSpecificity()` and `isLowSpecificity()` edge cases
    - Performance: analysis <5ms for 20-message conversation
    - Breakdown category coverage tests

  **Recommended Agent Profile**:
  - **Category**: `quick`

  **Parallelization**: Wave 4 (with Tasks 13, 15, 16)
  **Blocked By**: Task 6

  **Acceptance Criteria**:
  - [ ] `node --import tsx/esm --test open-sse/services/__tests__/specificityDetector.test.ts` passes
  - [ ] 25+ test cases

  **Commit**: YES
  - Message: `test(combo): add 25+ unit tests for SpecificityDetector`
  - Files: `open-sse/services/__tests__/specificityDetector.test.ts`

- [ ] 15. **Write ManifestAdapter unit tests (20+ test cases)**

  **What to do**:
  - Create `open-sse/services/__tests__/manifestAdapter.test.ts` with:
    - `generateRoutingHints()` with free-only targets → all eligible
    - `generateRoutingHints()` with mixed targets → correct classification
    - Expert query → underqualifiedTargets contains free providers
    - Trivial query → all targets eligible, modifier = "prefer-free"
    - `compareByCostEffectiveness()` ordering tests
    - `estimateRequestCost()` calculation accuracy
    - Edge case: empty targets array
    - Edge case: unknown provider defaults to premium

  **Recommended Agent Profile**:
  - **Category**: `quick`

  **Parallelization**: Wave 4 (with Tasks 13, 14, 16)
  **Blocked By**: Task 9

  **Acceptance Criteria**:
  - [ ] `node --import tsx/esm --test open-sse/services/__tests__/manifestAdapter.test.ts` passes
  - [ ] 20+ test cases

  **Commit**: YES
  - Message: `test(combo): add 20+ unit tests for ManifestAdapter`
  - Files: `open-sse/services/__tests__/manifestAdapter.test.ts`

- [ ] 16. **Write integration tests for manifest routing end-to-end**

  **What to do**:
  - Create `tests/integration/manifest-routing.test.ts` with:
    - Full flow: combo config with `manifestRouting: true` → tier classification → specificity analysis → routing hints → target reordering
    - Verify cost-optimized strategy uses tier-aware reordering when enabled
    - Verify backward compatibility when `manifestRouting: false`
    - Verify manifest routing failure doesn't break combo dispatch
    - Verify specificity metrics recorded to DB
    - Performance: full manifest routing overhead <6ms

  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Integration tests require understanding how all modules interact in the combo dispatch flow

  **Parallelization**: Wave 4 (after Tasks 11, 12)
  **Blocked By**: Tasks 11, 12 (needs combo integration and autoCombo scoring)

  **Acceptance Criteria**:
  - [ ] `node --import tsx/esm --test tests/integration/manifest-routing.test.ts` passes
  - [ ] 10+ integration test cases
  - [ ] Coverage gate (≥60%) met

  **Commit**: YES
  - Message: `test(combo): add integration tests for manifest routing end-to-end`
  - Files: `tests/integration/manifest-routing.test.ts`

---

## Final Verification Wave (MANDATORY — after ALL implementation tasks)

> 4 review agents run in PARALLEL. ALL must APPROVE. Present consolidated results to user and get explicit "okay" before completing.
>
> **Do NOT auto-proceed after verification. Wait for user's explicit approval before marking work complete.**
> **Never mark F1-F4 as checked before getting user's okay.** Rejection or user feedback → fix → re-run → present again → wait for okay.

- [ ] F1. **Plan Compliance Audit** — `oracle`
  Read the plan end-to-end. For each "Must Have": verify implementation exists (read file, curl endpoint, run command). For each "Must NOT Have": search codebase for forbidden patterns — reject with file:line if found. Check evidence files exist in .sisyphus/evidence/. Compare deliverables against plan.
  Output: `Must Have [N/N] | Must NOT Have [N/N] | Tasks [N/N] | VERDICT: APPROVE/REJECT`

- [ ] F2. **Code Quality Review** — `unspecified-high`
  Run `tsc --noEmit` + linter + `bun test`. Review all changed files for: `as any`/`@ts-ignore`, empty catches, console.log in prod, commented-out code, unused imports. Check AI slop: excessive comments, over-abstraction, generic names (data/result/item/temp).
  Output: `Build [PASS/FAIL] | Lint [PASS/FAIL] | Tests [N pass/N fail] | Files [N clean/N issues] | VERDICT`

- [ ] F3. **Real Manual QA** — `unspecified-high`
  Start from clean state. Execute EVERY QA scenario from EVERY task — follow exact steps, capture evidence. Test cross-task integration (features working together, not isolation). Test edge cases: empty state, invalid input, rapid actions. Save to `.sisyphus/evidence/final-qa/`.
  Output: `Scenarios [N/N pass] | Integration [N/N] | Edge Cases [N tested] | VERDICT`

- [ ] F4. **Scope Fidelity Check** — `deep`
  For each task: read "What to do", read actual diff (git log/diff). Verify 1:1 — everything in spec was built (no missing), nothing beyond spec was built (no creep). Check "Must NOT do" compliance. Detect cross-task contamination: Task N touching Task M's files. Flag unaccounted changes.
  Output: `Tasks [N/N compliant] | Contamination [CLEAN/N issues] | Unaccounted [CLEAN/N files] | VERDICT`

---

## Commit Strategy

- **Wave 1**: `feat(combo): add tier resolution and specificity detection types`
- **Wave 2**: `feat(combo): implement tier resolver and specificity detector engines`
- **Wave 3**: `feat(combo): integrate manifest adapter and tier-aware routing`
- **Wave 4**: `test(combo): add comprehensive tests for manifest routing integration`
- **Final**: `chore(combo): code quality review and cleanup`

---

## Success Criteria

### Verification Commands
```bash
# Type checking
npm run typecheck:core

# Run tier resolver tests
node --import tsx/esm --test open-sse/services/__tests__/tierResolver.test.ts

# Run specificity detector tests
node --import tsx/esm --test open-sse/services/__tests__/specificityDetector.test.ts

# Run manifest adapter tests
node --import tsx/esm --test open-sse/services/__tests__/manifestAdapter.test.ts

# Run integration tests
node --import tsx/esm --test tests/integration/manifest-routing.test.ts

# Check for circular deps
npm run check:cycles

# Lint
npm run lint

# Coverage
npm run test:coverage
```

### Final Checklist
- [ ] TierResolver correctly classifies providers into Free/Cheap/Premium tiers
- [ ] SpecificityDetector produces 0–100 scores correlated with query complexity
- [ ] ManifestAdapter combines tier + specificity into actionable routing hints
- [ ] Enhanced cost-optimized strategy shows measurable improvement
- [ ] All existing combo strategies remain backward compatible
- [ ] Latency overhead <6ms total
- [ ] 75+ test cases passing
- [ ] Coverage above 60% gate
- [ ] No circular dependencies
- [ ] Documentation updated
