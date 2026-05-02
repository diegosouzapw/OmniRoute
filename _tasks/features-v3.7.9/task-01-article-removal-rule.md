# Task 01 — Add Article Removal Rule (`a/an/the`)

> **Priority**: P0 — Critical
> **Effort**: 15 min
> **Dependencies**: None
> **Branch**: `release/v3.7.9`

---

## Problem

The original Caveman project identifies article removal (`a`, `an`, `the`) as the **single
biggest source of token savings** in English text. Articles account for approximately 5–8%
of all tokens in typical English prose but carry zero semantic information for LLMs.

The original `caveman-compress/scripts/compress.js` (line 44) defines:

```javascript
const ARTICLES = /\b(?:a|an|the)\s+(?=[a-z])/gi;
```

The original `caveman/SKILL.md` (line 21) explicitly lists:

> Drop: articles (a/an/the)

**OmniRoute's `cavemanRules.ts` has 30 rules across 4 categories but does NOT include
article removal at all.** This is the single largest compression gap.

---

## Solution

Add a new rule to the `CAVEMAN_RULES` array in `cavemanRules.ts`. The rule must:

1. Match `a`, `an`, `the` as whole words followed by whitespace and a lowercase letter
2. Replace with empty string (removing the article + trailing space)
3. Apply to `all` contexts (user, assistant, system)
4. **NOT** remove articles before proper nouns, uppercase words, or code tokens

---

## Implementation

### File: `open-sse/services/compression/cavemanRules.ts`

Add the following rule as the **first rule** in Category 1 (Filler Removal), before `polite_framing`:

```typescript
{
  name: "articles",
  pattern: /\b(?:a|an|the)\s+(?=[a-z])/gi,
  replacement: "",
  context: "all",
},
```

**Why `(?=[a-z])` lookahead?** This ensures articles are only removed when followed by a
lowercase letter. This prevents removing "the" before:
- Proper nouns: `the OpenAI API` → keeps "the" because `O` is uppercase
- Code tokens: `the `useMemo` hook` → keeps "the" because backtick follows
- Numbers: `the 404 error` → keeps "the" because `4` is not `[a-z]`

This exactly matches the behavior of caveman-shrink's `compress.js` line 44.

### File: `tests/unit/compression/caveman-rules.test.ts`

Add test cases:

```typescript
describe("articles rule", () => {
  it("should remove 'the' before lowercase words", () => {
    const result = applyRulesToText("Check the configuration file", rules);
    assert.strictEqual(result.text, "Check configuration file");
    assert(result.appliedRules.includes("articles"));
  });

  it("should remove 'a' before lowercase words", () => {
    const result = applyRulesToText("Create a new connection", rules);
    assert.strictEqual(result.text, "Create new connection");
  });

  it("should remove 'an' before lowercase words", () => {
    const result = applyRulesToText("This is an error in the code", rules);
    assert.strictEqual(result.text, "This is error in code");
  });

  it("should NOT remove articles before uppercase words", () => {
    const result = applyRulesToText("Use the OpenAI API", rules);
    assert.strictEqual(result.text, "Use the OpenAI API");
  });

  it("should NOT remove articles before numbers", () => {
    const result = applyRulesToText("Returns the 404 error", rules);
    assert.strictEqual(result.text, "Returns the 404 error");
  });

  it("should handle multiple articles in one string", () => {
    const result = applyRulesToText(
      "The user sends a request to the server and gets an error",
      rules
    );
    // "The" before "user" (lowercase u) → removed
    // "a" before "request" → removed
    // "the" before "server" → removed
    // "an" before "error" → removed
    assert.strictEqual(result.text, "user sends request to server and gets error");
  });
});
```

---

## Verification

```bash
# Run the specific test file
node --import tsx/esm --test tests/unit/compression/caveman-rules.test.ts

# Run the golden-set quality tests to ensure no regression
node --import tsx/esm --test tests/golden-set/compression-quality.test.ts

# Run the savings regression tests to confirm improvement
node --import tsx/esm --test tests/golden-set/compression-savings.test.ts
```

Expected outcome:
- All existing tests pass (no regression)
- New article tests pass
- Savings percentage on golden-set benchmarks increases by ~5–8%

---

## Commit

```
feat(compression): add article removal rule (a/an/the)

Closes the single biggest compression gap vs. upstream Caveman.
Articles (a/an/the) account for ~5-8% of English tokens but carry
zero semantic value for LLMs. Uses lookahead to preserve articles
before proper nouns, numbers, and code tokens.

Ref: Caveman SKILL.md L21, compress.js L44
```

---

## Rollback

Remove the `articles` rule object from the `CAVEMAN_RULES` array. No other files are
affected. The rule is entirely additive.
