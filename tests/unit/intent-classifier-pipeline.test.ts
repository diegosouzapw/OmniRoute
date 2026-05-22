import test from "node:test";
import assert from "node:assert/strict";

const {
  classifyPromptIntent,
  classifyWithConfig,
  DEFAULT_INTENT_CONFIG,
  MATH_KEYWORDS,
  CREATIVE_KEYWORDS,
  CODE_KEYWORDS,
  REASONING_KEYWORDS,
  SIMPLE_KEYWORDS,
} = await import("../../open-sse/services/intentClassifier.ts");

// --- Math type detection ---

test("classifyPromptIntent detects math prompts", () => {
  assert.equal(classifyPromptIntent("calculate the integral of x^2"), "math");
  assert.equal(classifyPromptIntent("solve this equation: 2x + 3 = 7"), "math");
  assert.equal(classifyPromptIntent("what is the formula for area of a circle"), "math");
  assert.equal(classifyPromptIntent("find the derivative of sin(x)"), "math");
  assert.equal(classifyPromptIntent("compute the matrix multiplication"), "math");
  assert.equal(classifyPromptIntent("polynomial factorization"), "math");
});

test("classifyPromptIntent detects math in other languages", () => {
  assert.equal(classifyPromptIntent("calcular a integral de x^2"), "math"); // PT-BR
  assert.equal(classifyPromptIntent("resolver esta ecuación"), "math"); // ES
  assert.equal(classifyPromptIntent("求解这个方程"), "math"); // ZH
  assert.equal(classifyPromptIntent("この方程式を解いて"), "math"); // JA
  assert.equal(classifyPromptIntent("вычислить интеграл"), "math"); // RU
  assert.equal(classifyPromptIntent("gleichung lösen"), "math"); // DE
  assert.equal(classifyPromptIntent("이 방정식을 풀어"), "math"); // KO
  assert.equal(classifyPromptIntent("حل هذه المعادلة"), "math"); // AR
});

// --- Creative type detection ---

test("classifyPromptIntent detects creative prompts", () => {
  assert.equal(classifyPromptIntent("tell a story about a dragon"), "creative");
  assert.equal(classifyPromptIntent("compose a poem about the ocean"), "creative");
  assert.equal(classifyPromptIntent("brainstorm ideas for a blog post"), "creative");
  assert.equal(classifyPromptIntent("help me with fiction writing"), "creative");
  assert.equal(classifyPromptIntent("craft marketing copy for a product"), "creative");
  assert.equal(classifyPromptIntent("draft a screenplay for a short film"), "creative");
  assert.equal(classifyPromptIntent("compose lyrics for a love song"), "creative");
});

test("classifyPromptIntent detects creative in other languages", () => {
  assert.equal(classifyPromptIntent("escrever uma história"), "creative"); // PT-BR
  assert.equal(classifyPromptIntent("escribir un poema"), "creative"); // ES
  assert.equal(classifyPromptIntent("写一个故事"), "creative"); // ZH
  assert.equal(classifyPromptIntent("物語を書いて"), "creative"); // JA
  assert.equal(classifyPromptIntent("написать рассказ"), "creative"); // RU
  assert.equal(classifyPromptIntent("eine geschichte schreiben"), "creative"); // DE
  assert.equal(classifyPromptIntent("이야기를 써 줘"), "creative"); // KO
  assert.equal(classifyPromptIntent("اكتب قصة"), "creative"); // AR
});

// --- Priority ordering: code > math > reasoning > creative > simple > medium ---

test("code takes priority over math", () => {
  assert.equal(classifyPromptIntent("write a function to calculate the integral"), "code");
  assert.equal(classifyPromptIntent("implement a solve equation algorithm"), "code");
});

test("math takes priority over reasoning", () => {
  assert.equal(classifyPromptIntent("calculate and prove this theorem"), "math");
  assert.equal(classifyPromptIntent("solve the equation step by step"), "math");
});

test("reasoning takes priority over creative", () => {
  assert.equal(classifyPromptIntent("prove and analyze this story logically"), "reasoning");
  assert.equal(classifyPromptIntent("derive the reasoning for a creative hypothesis"), "reasoning");
});

test("creative takes priority over simple", () => {
  assert.equal(classifyPromptIntent("compose a story about what is love"), "creative");
  assert.equal(classifyPromptIntent("creative list of blog ideas"), "creative");
});

// --- Short/empty prompts → simple ---

test("short prompts with simple keywords classify as simple", () => {
  assert.equal(classifyPromptIntent("what is gravity"), "simple");
  assert.equal(classifyPromptIntent("what is photosynthesis"), "simple");
  assert.equal(classifyPromptIntent("hello how are you"), "simple");
  assert.equal(classifyPromptIntent("translate hello to french"), "simple");
});

test("empty or whitespace-only prompts classify as medium", () => {
  assert.equal(classifyPromptIntent(""), "medium");
  assert.equal(classifyPromptIntent("   "), "medium");
});

test("long prompts skip simple classification", () => {
  const longPrompt =
    "what is the meaning of life and how should we approach the existential questions that have puzzled philosophers for centuries and continue to challenge our understanding of consciousness and purpose in the universe today and beyond into the future of humanity and what does it mean to be alive in this vast cosmos filled with stars and galaxies and mysteries that we may never fully comprehend no matter how hard we try to understand them through science and reason alone without any help from technology or artificial intelligence or other advanced tools we might develop in the coming decades and centuries ahead of us as a species trying to survive and thrive";
  assert.equal(classifyPromptIntent(longPrompt), "medium");
});

// --- classifyWithConfig with extra keywords ---

test("classifyWithConfig detects math with extraMathKeywords", () => {
  const config = { ...DEFAULT_INTENT_CONFIG, extraMathKeywords: ["trigonometry", "logarithm"] };
  assert.equal(classifyWithConfig("compute the trigonometry values", config), "math");
  assert.equal(classifyWithConfig("find the logarithm of 100", config), "math");
});

test("classifyWithConfig detects creative with extraCreativeKeywords", () => {
  const config = { ...DEFAULT_INTENT_CONFIG, extraCreativeKeywords: ["sonnet", "haiku"] };
  assert.equal(classifyWithConfig("craft a sonnet about spring", config), "creative");
  assert.equal(classifyWithConfig("tell a haiku about rain", config), "creative");
});

test("classifyWithConfig returns medium when disabled", () => {
  const config = { ...DEFAULT_INTENT_CONFIG, enabled: false };
  assert.equal(classifyWithConfig("calculate the integral of x", config), "medium");
  assert.equal(classifyWithConfig("write a poem about love", config), "medium");
});

test("classifyWithConfig respects simpleMaxWords override", () => {
  const config = { ...DEFAULT_INTENT_CONFIG, simpleMaxWords: 10 };
  const shortPrompt = "what is the meaning of this word";
  assert.equal(classifyWithConfig(shortPrompt, config), "simple");
  // Longer prompts with simple keywords should not match when below threshold
  const longerPrompt =
    "what is the significance of the american revolution and how did it shape modern democracy in ways that continue to influence politics today across the world and across generations of people who value freedom and self-governance";
  assert.equal(classifyWithConfig(longerPrompt, config), "medium");
});

// --- Keyword arrays are exported and non-empty ---

test("MATH_KEYWORDS is a non-empty readonly array", () => {
  assert.ok(Array.isArray(MATH_KEYWORDS));
  assert.ok(MATH_KEYWORDS.length > 0);
  assert.ok(MATH_KEYWORDS.includes("calculate"));
  assert.ok(MATH_KEYWORDS.includes("equation"));
});

test("CREATIVE_KEYWORDS is a non-empty readonly array", () => {
  assert.ok(Array.isArray(CREATIVE_KEYWORDS));
  assert.ok(CREATIVE_KEYWORDS.length > 0);
  assert.ok(CREATIVE_KEYWORDS.includes("story"));
  assert.ok(CREATIVE_KEYWORDS.includes("poem"));
});

test("existing keyword arrays are still present", () => {
  assert.ok(CODE_KEYWORDS.length > 0);
  assert.ok(REASONING_KEYWORDS.length > 0);
  assert.ok(SIMPLE_KEYWORDS.length > 0);
});
