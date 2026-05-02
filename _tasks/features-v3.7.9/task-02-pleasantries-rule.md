# Task 02 — Add Pleasantries Removal Rule

> **Priority**: P0 — Critical
> **Effort**: 15 min
> **Dependencies**: None
> **Branch**: `release/v3.7.9`

---

## Problem

The original Caveman SKILL.md (line 21) explicitly drops:

> pleasantries (sure/certainly/of course/happy to)

The original `caveman-shrink/compress.js` (lines 29–31) defines:

```javascript
const PLEASANTRIES = new RegExp(
  '\\b(?:please|kindly|thank you|thanks|sure|certainly|of course|happy to|i\'?d be happy)\\b[,.]?\\s*',
  'gi'
);
```

**OmniRoute's current coverage:**
- `excessive_gratitude` rule covers: `Thank you so much`, `Thanks in advance`, `I really appreciate`
- These are **gratitude expressions**, NOT conversational pleasantries
- The model-generated pleasantries (`Sure!`, `Certainly!`, `Of course!`, `Happy to help!`)
  are completely missed

These pleasantries are the #1 source of wasted output tokens when models respond with
verbose openings like `"Sure! I'd be happy to help with that."`.

---

## Solution

Add a new `pleasantries` rule to `cavemanRules.ts` that targets the conversational
pleasantries the model typically generates. Apply to `all` contexts but particularly
effective on `assistant` role messages.

---

## Implementation

### File: `open-sse/services/compression/cavemanRules.ts`

Add the following rule in Category 1 (Filler Removal), after the existing `excessive_gratitude` rule (around line 72):

```typescript
{
  name: "pleasantries",
  pattern:
    /\b(?:sure|certainly|of course|happy to|glad to help|I'd be happy to|I'd be glad to|no problem|you're welcome|absolutely)\b[,!.;]?\s*/gi,
  replacement: "",
  context: "all",
},
```

**Why these specific words?**
- `sure` / `certainly` / `of course` — direct from Caveman SKILL.md
- `happy to` / `glad to help` — direct from Caveman SKILL.md
- `I'd be happy to` / `I'd be glad to` — direct from caveman-shrink compress.js
- `no problem` / `you're welcome` / `absolutely` — common LLM pleasantry variants
- Trailing `[,!.;]?\s*` — cleans up punctuation left behind after removal

**Context `all`** instead of `assistant` because:
1. Users sometimes include pleasantries in system prompts ("Sure, use TypeScript")
2. Multi-turn conversations may have assistant messages re-injected as user context
3. The pattern is safe — these words rarely carry semantic meaning in any context

### File: `tests/unit/compression/caveman-rules.test.ts`

Add test cases:

```typescript
describe("pleasantries rule", () => {
  it("should remove 'Sure!' from start of response", () => {
    const result = applyRulesToText(
      "Sure! The issue is in the middleware.",
      rules
    );
    assert.strictEqual(result.text, "The issue is in the middleware.");
    assert(result.appliedRules.includes("pleasantries"));
  });

  it("should remove 'Certainly,' with comma", () => {
    const result = applyRulesToText(
      "Certainly, I can help with that.",
      rules
    );
    assert.strictEqual(result.text, "I can help with that.");
  });

  it("should remove 'Of course' from middle of sentence", () => {
    const result = applyRulesToText(
      "Yes, of course that's the right approach.",
      rules
    );
    assert.strictEqual(result.text, "Yes, that's the right approach.");
  });

  it("should remove 'Happy to' from start", () => {
    const result = applyRulesToText(
      "Happy to help! Here's the fix.",
      rules
    );
    assert.strictEqual(result.text, "Here's the fix.");
  });

  it("should remove 'I'd be happy to'", () => {
    const result = applyRulesToText(
      "I'd be happy to explain the architecture.",
      rules
    );
    assert.strictEqual(result.text, "explain the architecture.");
  });

  it("should remove 'Absolutely'", () => {
    const result = applyRulesToText(
      "Absolutely! That's the correct pattern.",
      rules
    );
    assert.strictEqual(result.text, "That's the correct pattern.");
  });

  it("should handle multiple pleasantries in one string", () => {
    const result = applyRulesToText(
      "Sure, of course I can help. Certainly the fix is simple.",
      rules
    );
    assert.strictEqual(result.text, "I can help. the fix is simple.");
  });
});
```

---

## Interaction with Existing Rules

The `excessive_gratitude` rule covers a **different** word set (thank-you expressions).
These two rules are complementary:

| Rule | Covers |
|---|---|
| `excessive_gratitude` | "Thank you so much", "Thanks in advance", "I really appreciate" |
| `pleasantries` (new) | "Sure", "Certainly", "Of course", "Happy to", "Absolutely" |

No overlap. Both should fire independently.

---

## Verification

```bash
node --import tsx/esm --test tests/unit/compression/caveman-rules.test.ts
node --import tsx/esm --test tests/golden-set/compression-quality.test.ts
```

Expected outcome:
- All existing tests pass
- New pleasantries tests pass
- Assistant-role messages in golden set show measurable savings increase

---

## Commit

```
feat(compression): add pleasantries removal rule

Adds removal of conversational pleasantries (sure/certainly/of course/
happy to/absolutely) that models prepend to responses. Complements the
existing excessive_gratitude rule which covers thank-you expressions.

Ref: Caveman SKILL.md L21, compress.js L29-31
```

---

## Rollback

Remove the `pleasantries` rule object from the `CAVEMAN_RULES` array. No other files
are affected.
