# Task 03 — Add Leader Removal Rule (`I'll / Let me / You can / We will`)

> **Priority**: P0 — Critical
> **Effort**: 15 min
> **Dependencies**: None
> **Branch**: `release/v3.7.9`

---

## Problem

The original `caveman-shrink/compress.js` (lines 39–42) defines leader removal:

```javascript
const LEADERS = new RegExp(
  '^(?:i\'?ll|i will|i can|i\'?d|you can|we will|we can|let me|let\'?s)\\s+',
  'gim'
);
```

These are sentence-opening words that add zero information but consume tokens. They are
extremely common in LLM responses:

- `"I'll fix the auth middleware."` → `"Fix the auth middleware."`
- `"Let me explain the issue."` → `"Explain the issue."`
- `"You can use useMemo here."` → `"Use useMemo here."`

**OmniRoute's current coverage:**

| Rule | Context | What it covers |
|---|---|---|
| `filler_phrases` | `user` only | `I want to`, `I need to`, `I'd like to`, `I'm looking for` |
| `self_reference` | `user` only | `I am trying to`, `I am working on`, `I have been` |
| `verbose_requests` | `user` only | `I was wondering if you could`, `Would it be possible to` |

**Gaps:**
1. All existing rules are `user`-context only — they don't touch `assistant` messages
2. None cover the leader patterns from Caveman-shrink (`I'll`, `Let me`, `You can`, `We will`)
3. `I can`, `I'd`, `Let's`, `We can` are completely absent

---

## Solution

Add a new `leader_phrases` rule that matches sentence-opening leader phrases across **all**
contexts. Use `^` with `gim` flags so it only matches at the start of a line, not in the
middle of sentences where these words might carry meaning.

---

## Implementation

### File: `open-sse/services/compression/cavemanRules.ts`

Add the following rule in Category 1 (Filler Removal), after the existing `self_reference`
rule (around line 66):

```typescript
{
  name: "leader_phrases",
  pattern: /^(?:I'll|I will|I can|I'd|You can|We will|We can|Let me|Let's)\s+/gim,
  replacement: "",
  context: "all",
},
```

**Design decisions:**
- `^` anchor with `m` (multiline) flag: Only matches at the start of a line. This prevents
  removing "I can" from mid-sentence contexts like `"The reason I can do this is..."`.
- `context: "all"`: Unlike existing user-only rules, leaders appear heavily in `assistant`
  responses. The biggest savings come from model-generated text.
- No case-insensitive flag needed: The patterns are spelled with exact casing (`I'll`, not
  `i'll`). LLMs always capitalize these at sentence start. Adding `i` flag would risk
  removing lowercase variants in mid-sentence positions.

**Wait — case sensitivity concern:** Actually, on re-examination, the original Caveman uses
`gim` (case-insensitive + multiline). Some multi-turn messages may have lowercase leaders
if previous compression already modified case. To be safe, use `gim`:

```typescript
{
  name: "leader_phrases",
  pattern: /^(?:i'?ll|i will|i can|i'?d|you can|we will|we can|let me|let'?s)\s+/gim,
  replacement: "",
  context: "all",
},
```

This exactly matches caveman-shrink's `LEADERS` regex.

### File: `tests/unit/compression/caveman-rules.test.ts`

Add test cases:

```typescript
describe("leader_phrases rule", () => {
  it("should remove \"I'll\" from line start", () => {
    const result = applyRulesToText("I'll fix the auth middleware.", rules);
    assert.strictEqual(result.text, "fix the auth middleware.");
    assert(result.appliedRules.includes("leader_phrases"));
  });

  it("should remove \"Let me\" from line start", () => {
    const result = applyRulesToText("Let me explain the issue.", rules);
    assert.strictEqual(result.text, "explain the issue.");
  });

  it("should remove \"You can\" from line start", () => {
    const result = applyRulesToText("You can use useMemo here.", rules);
    assert.strictEqual(result.text, "use useMemo here.");
  });

  it("should remove \"We will\" from line start", () => {
    const result = applyRulesToText("We will implement the fix.", rules);
    assert.strictEqual(result.text, "implement the fix.");
  });

  it("should remove \"Let's\" from line start", () => {
    const result = applyRulesToText("Let's refactor this component.", rules);
    assert.strictEqual(result.text, "refactor this component.");
  });

  it("should remove \"I can\" from line start", () => {
    const result = applyRulesToText("I can help with that.\nI'll check the logs.", rules);
    assert.strictEqual(result.text, "help with that.\ncheck the logs.");
  });

  it("should NOT remove leaders from mid-sentence", () => {
    const result = applyRulesToText(
      "The reason I can do this is because of caching.",
      rules
    );
    assert.strictEqual(
      result.text,
      "The reason I can do this is because of caching."
    );
  });

  it("should handle multiline with mixed leaders", () => {
    const result = applyRulesToText(
      "I'll update the config.\nYou can test it locally.\nLet me know if it works.",
      rules
    );
    assert.strictEqual(
      result.text,
      "update the config.\ntest it locally.\nknow if it works."
    );
  });
});
```

---

## Interaction with Existing Rules

| Rule | Context | Overlap |
|---|---|---|
| `filler_phrases` | user | No overlap — covers `I want to`, `I need to` (different patterns) |
| `self_reference` | user | No overlap — covers `I am trying to`, `I am working on` |
| `verbose_requests` | user | No overlap — covers `I was wondering if you could` |
| `leader_phrases` (new) | all | Covers `I'll`, `I can`, `Let me`, `You can`, `We will` |

The existing rules remain user-only for their specific phrases. The new rule adds the
Caveman-shrink leader set across all contexts. No conflict.

---

## Verification

```bash
node --import tsx/esm --test tests/unit/compression/caveman-rules.test.ts
node --import tsx/esm --test tests/golden-set/compression-quality.test.ts
```

Expected outcome:
- All existing tests pass
- New leader tests pass
- Assistant messages in golden set show significant savings (leaders are extremely common
  in model-generated text)

---

## Commit

```
feat(compression): add leader phrase removal (I'll/Let me/You can/We will)

Ports caveman-shrink's LEADERS regex to remove sentence-opening leader
phrases across all message roles. These phrases (I'll, Let me, You can,
We will, Let's, I can, etc.) add zero semantic value but are extremely
common in LLM responses.

Ref: caveman-shrink compress.js L39-42
```

---

## Rollback

Remove the `leader_phrases` rule object from the `CAVEMAN_RULES` array.
