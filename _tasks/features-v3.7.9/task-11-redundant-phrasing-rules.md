# Task 11 — Add "make sure to" / Redundant Phrasing Rules

> **Priority**: P2 | **Effort**: 15 min | **Dependencies**: None | **Branch**: `release/v3.7.9`

---

## Problem

Original caveman-compress SKILL.md (line 45–46) lists redundant phrasing removals:

> - Redundant phrasing: "in order to" → "to", "make sure to" → "ensure", "the reason is because" → "because"
> - Connective fluff: "however", "furthermore", "additionally", "in addition"

OmniRoute covers `"in order to" → "to"` (via `purpose_phrases` rule) and connective fluff (via `verbose_connectors`), but misses:

- `"make sure to"` → `"ensure"`
- `"the reason is because"` → `"because"`
- `"due to the fact that"` → `"because"`
- `"in the event that"` → `"if"`
- `"at this point in time"` → `"now"`
- `"on a daily basis"` → `"daily"`
- `"is able to"` → `"can"`
- `"in spite of the fact that"` → `"despite"`

---

## Solution

Add a `redundant_phrasing` rule with a replacement function that maps verbose phrases to concise alternatives.

## File: `open-sse/services/compression/cavemanRules.ts`

Add in Category 3 (Structural Compression), after `purpose_phrases` (around line 170):

```typescript
{
  name: "redundant_phrasing",
  pattern:
    /\b(?:make sure to|the reason is because|due to the fact that|in the event that|at this point in time|on a daily basis|is able to|in spite of the fact that|as a matter of fact|for all intents and purposes|it is important to note that|it should be noted that|in the process of|with regard to|with respect to|in reference to)\b/gi,
  replacement: (match: string): string => {
    const map: Record<string, string> = {
      "make sure to": "ensure",
      "the reason is because": "because",
      "due to the fact that": "because",
      "in the event that": "if",
      "at this point in time": "now",
      "on a daily basis": "daily",
      "is able to": "can",
      "in spite of the fact that": "despite",
      "as a matter of fact": "",
      "for all intents and purposes": "",
      "it is important to note that": "",
      "it should be noted that": "",
      "in the process of": "while",
      "with regard to": "about",
      "with respect to": "about",
      "in reference to": "about",
    };
    return map[match.toLowerCase()] ?? match;
  },
  context: "all",
},
```

## Tests: `tests/unit/compression/caveman-rules.test.ts`

```typescript
describe("redundant_phrasing rule", () => {
  it("should replace 'make sure to' with 'ensure'", () => {
    const result = applyRulesToText("Make sure to run the tests", rules);
    assert.strictEqual(result.text, "ensure run the tests");
  });

  it("should replace 'due to the fact that' with 'because'", () => {
    const result = applyRulesToText("Failed due to the fact that the key expired", rules);
    assert.strictEqual(result.text, "Failed because the key expired");
  });

  it("should replace 'is able to' with 'can'", () => {
    const result = applyRulesToText("The server is able to handle 1000 requests", rules);
    assert.strictEqual(result.text, "The server can handle 1000 requests");
  });

  it("should remove 'it is important to note that'", () => {
    const result = applyRulesToText("It is important to note that caching is enabled", rules);
    assert.strictEqual(result.text, "caching is enabled");
  });

  it("should replace 'with regard to' with 'about'", () => {
    const result = applyRulesToText("With regard to the deployment process", rules);
    assert.strictEqual(result.text, "about the deployment process");
  });
});
```

## Verification

```bash
node --import tsx/esm --test tests/unit/compression/caveman-rules.test.ts
```

## Commit

```
feat(compression): add redundant phrasing simplification rules

Maps 16 verbose English phrases to concise alternatives: "make sure to"
→ "ensure", "due to the fact that" → "because", "is able to" → "can",
etc. Ports remaining patterns from caveman-compress SKILL.md L45-46.

Ref: caveman-compress SKILL.md L45-46
```

## Rollback

Remove the `redundant_phrasing` rule object from `CAVEMAN_RULES`.
