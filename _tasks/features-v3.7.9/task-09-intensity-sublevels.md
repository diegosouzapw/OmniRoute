# Task 09 — Add Intensity Sub-Levels to Standard Mode

> **Priority**: P2 | **Effort**: 60 min | **Dependencies**: Tasks 01–03 | **Branch**: `release/v3.7.9`

---

## Problem

Original Caveman has 3 intensity levels within its mode (lite/full/ultra), each with distinct behavior:

| Level | Articles | Filler | Fragments | Abbreviations |
|---|---|---|---|---|
| **lite** | Keep | Remove | Keep full sentences | No |
| **full** | Remove | Remove | OK | No |
| **ultra** | Remove | Remove | OK | Yes (DB/auth/config/req/res/fn/impl) |

OmniRoute's `standard` mode always applies the same 30-rule set — there's no way to select intensity within the caveman engine. The 5 CompressionModes (`off/lite/standard/aggressive/ultra`) map to different pipeline stages, NOT Caveman intensity levels.

---

## Solution

Add a `CavemanIntensity` type (`lite | full | ultra`) to `CavemanConfig`, and filter rules by intensity when applying. The existing `CompressionMode` stays unchanged — intensity is a sub-parameter of `standard` mode.

## File: `open-sse/services/compression/types.ts`

```typescript
export type CavemanIntensity = "lite" | "full" | "ultra";

export interface CavemanConfig {
  enabled: boolean;
  compressRoles: ("user" | "assistant" | "system")[];
  skipRules: string[];
  minMessageLength: number;
  preservePatterns: string[];
  intensity: CavemanIntensity; // NEW
}

export const DEFAULT_CAVEMAN_CONFIG: CavemanConfig = {
  enabled: true,
  compressRoles: ["user"],
  skipRules: [],
  minMessageLength: 50,
  preservePatterns: [],
  intensity: "full", // NEW — default to classic caveman
};
```

## File: `open-sse/services/compression/cavemanRules.ts`

Add an `intensity` field to each `CavemanRule` and a filter function:

```typescript
export interface CavemanRule {
  name: string;
  pattern: RegExp;
  replacement: string | ((match: string, ...groups: string[]) => string);
  context: "all" | "user" | "system" | "assistant";
  intensity: CavemanIntensity[]; // Which levels include this rule
  preservePatterns?: RegExp[];
}
```

Map each rule to its intensity levels:

| Rule Category | lite | full | ultra |
|---|---|---|---|
| `articles` | ❌ | ✅ | ✅ |
| `filler_adverbs` | ✅ | ✅ | ✅ |
| `pleasantries` | ✅ | ✅ | ✅ |
| `hedging` | ✅ | ✅ | ✅ |
| `leader_phrases` | ❌ | ✅ | ✅ |
| `verbose_connectors` | ✅ | ✅ | ✅ |
| `emphasis_removal` | ❌ | ✅ | ✅ |
| `transition_removal` | ❌ | ✅ | ✅ |
| All other rules | ✅ | ✅ | ✅ |

Add a new filter function:

```typescript
export function getRulesForIntensity(
  context: string,
  intensity: CavemanIntensity
): CavemanRule[] {
  return CAVEMAN_RULES.filter(
    (rule) =>
      (rule.context === "all" || rule.context === context) &&
      rule.intensity.includes(intensity)
  );
}
```

## File: `open-sse/services/compression/caveman.ts`

Update `cavemanCompress()` to use intensity-filtered rules:

```typescript
// Replace line 114:
// const rules = getRulesForContext(msg.role).filter(...)
const rules = getRulesForIntensity(msg.role, config.intensity).filter(
  (rule) => !config.skipRules.includes(rule.name)
);
```

## Ultra-specific: Add abbreviation rules

For `ultra` intensity only, add abbreviation rules:

```typescript
{
  name: "ultra_abbreviations",
  pattern: /\b(?:database|authentication|configuration|request|response|function|implementation)\b/gi,
  replacement: (match: string): string => {
    const map: Record<string, string> = {
      "database": "DB", "authentication": "auth", "configuration": "config",
      "request": "req", "response": "res", "function": "fn", "implementation": "impl",
    };
    return map[match.toLowerCase()] ?? match;
  },
  context: "all",
  intensity: ["ultra"],
},
```

## Tests: `tests/unit/compression/caveman-engine.test.ts`

```typescript
describe("intensity levels", () => {
  it("lite: should remove filler but keep articles", () => {
    const body = { messages: [{ role: "user", content: "I basically need the configuration file" }] };
    const result = cavemanCompress(body, { intensity: "lite" });
    const text = (result.body as any).messages[0].content;
    assert(text.includes("the")); // articles preserved
    assert(!text.includes("basically")); // filler removed
  });

  it("full: should remove articles and filler", () => {
    const body = { messages: [{ role: "user", content: "Check the configuration file" }] };
    const result = cavemanCompress(body, { intensity: "full" });
    const text = (result.body as any).messages[0].content;
    assert(!text.includes("the ")); // articles removed
  });

  it("ultra: should abbreviate technical terms", () => {
    const body = { messages: [{ role: "user", content: "Fix the database authentication" }] };
    const result = cavemanCompress(body, { intensity: "ultra" });
    const text = (result.body as any).messages[0].content;
    assert(text.includes("DB") || text.includes("auth"));
  });
});
```

## Verification

```bash
node --import tsx/esm --test tests/unit/compression/caveman-engine.test.ts
node --import tsx/esm --test tests/unit/compression/caveman-rules.test.ts
```

## Commit

```
feat(compression): add caveman intensity sub-levels (lite/full/ultra)

Maps Caveman's 3 English intensity levels into the standard compression
mode. Lite keeps articles + full sentences, full is classic caveman,
ultra abbreviates technical terms (DB/auth/config/req/res/fn/impl).

Ref: Caveman SKILL.md L28-37 (Intensity table)
```

## Rollback

Remove the `intensity` field from `CavemanConfig` and `CavemanRule`, revert `getRulesForIntensity` to `getRulesForContext`, remove ultra abbreviation rules.

## 2026-05-02 Expansion Addendum

This task covers **input rule intensity** inside `standard` mode only. It must not be
treated as full Caveman parity by itself.

Full upstream Caveman parity also needs Task 14 (`cavemanOutputMode`), because upstream
Caveman primarily reduces generated output tokens through a system/skill instruction.
Keep these concepts separate:

- `CavemanIntensity`: how strongly OmniRoute rewrites input/context text.
- `CavemanOutputMode`: whether OmniRoute asks the upstream model to answer tersely.
