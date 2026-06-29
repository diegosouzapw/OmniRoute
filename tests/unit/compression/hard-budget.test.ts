import test from "node:test";
import assert from "node:assert/strict";
import { applyHardBudget } from "../../../open-sse/services/compression/hardBudget.ts";
import { countTextTokens } from "../../../src/shared/utils/tiktokenCounter.ts";
import { applyStackedCompression } from "../../../open-sse/services/compression/strategySelector.ts";

// ~400-token prose fixture (longer sentences to ensure measurable token count)
const PROSE = [
  "The quick brown fox jumps over the lazy dog and runs through the forest.",
  "Artificial intelligence systems can process large amounts of information efficiently.",
  "Machine learning models require substantial computational resources for training.",
  "Error: something went wrong in the processing pipeline at line 42.",
  "Natural language processing enables computers to understand human language semantically.",
  "Deep learning architectures consist of multiple interconnected layers of neurons.",
  "The database contains approximately 1234567 records from the past fiscal year.",
  "Transformer models have revolutionized the field of natural language understanding.",
  "Reinforcement learning allows agents to learn optimal policies through experience.",
  "The gradient descent algorithm iteratively minimizes the loss function during training.",
  "Convolutional neural networks excel at image recognition and classification tasks.",
  "Transfer learning leverages pre-trained models to accelerate new task learning.",
  "Data preprocessing steps include normalization, tokenization, and feature extraction.",
  "Hyperparameter tuning is essential for optimizing model performance and generalization.",
  "The attention mechanism allows models to focus on relevant input sequence parts.",
  "Batch normalization stabilizes training by normalizing activations within mini-batches.",
  "Dropout regularization helps prevent overfitting in deep neural network architectures.",
  "The validation set monitors model performance and guides hyperparameter selection.",
  "Cross-entropy loss measures the difference between predicted and actual probability distributions.",
  "Stochastic gradient descent updates model parameters using randomly sampled mini-batches.",
].join("\n");

function makeBody(content: string) {
  return {
    messages: [
      { role: "user", content },
    ],
  };
}

test("targetTokens: cuts body to ≤ targetTokens", () => {
  const body = makeBody(PROSE);
  const proseTokens = countTextTokens(PROSE);
  assert.ok(proseTokens > 200, `Fixture too small: ${proseTokens} tokens`);

  const result = applyHardBudget(body, { targetTokens: 200 });
  assert.ok(result.compressed, "should be compressed");

  const msgs = result.body.messages as Array<{ content: string }>;
  const outTokens = countTextTokens(msgs.map((m) => m.content).join(" "));
  assert.ok(
    outTokens <= 200,
    `Output tokens ${outTokens} exceed targetTokens 200`
  );
});

test("targetTokens: preserves highest-saliency sentences", () => {
  const body = makeBody(PROSE);
  const result = applyHardBudget(body, { targetTokens: 200 });
  const msgs = result.body.messages as Array<{ content: string }>;
  const out = msgs.map((m) => m.content).join("\n");
  // The error line must be preserved (FORCE_PRESERVE_RE: "Error:")
  assert.ok(out.includes("Error:"), "Error: line must be preserved");
});

test("targetRatio:0.5 halves the token count", () => {
  const body = makeBody(PROSE);
  const proseTokens = countTextTokens(PROSE);

  const result = applyHardBudget(body, { targetRatio: 0.5 });
  const msgs = result.body.messages as Array<{ content: string }>;
  const outTokens = countTextTokens(msgs.map((m) => m.content).join(" "));

  assert.ok(result.compressed, "should be compressed");
  assert.ok(
    outTokens <= Math.ceil(proseTokens * 0.5),
    `Output tokens ${outTokens} exceed ratio target ${Math.ceil(proseTokens * 0.5)}`
  );
});

test("no target → byte-identical no-op", () => {
  const body = makeBody(PROSE);
  const result = applyHardBudget(body, {});
  assert.equal(result.compressed, false);
  assert.equal(JSON.stringify(result.body), JSON.stringify(body));
  assert.equal(result.stats, null);
});

test("already-under-target → no-op", () => {
  const short = "Hello world.";
  const body = makeBody(short);
  const result = applyHardBudget(body, { targetTokens: 1000 });
  assert.equal(result.compressed, false);
  assert.equal(JSON.stringify(result.body), JSON.stringify(body));
});

test("never drops a line matching FORCE_PRESERVE_RE (Error:, number, https://)", () => {
  const sensitive = [
    "Error: critical failure occurred",
    "The quick brown fox jumps over the lazy dog and runs.",
    "Amount: 99999",
    "Irrelevant filler text here.",
    "Another line of boring unimportant low-signal content.",
    "https://example.com/api/endpoint",
    "More filler words to pad the token count here.",
    "And yet more words that are clearly not important at all.",
  ].join("\n");

  const body = makeBody(sensitive);
  const totalTokens = countTextTokens(sensitive);
  // Force aggressive cut to half
  const result = applyHardBudget(body, { targetTokens: Math.floor(totalTokens * 0.4) });

  const out = (result.body.messages as Array<{ content: string }>).map((m) => m.content).join("\n");
  assert.ok(out.includes("Error:"), "Error: line must survive");
  assert.ok(out.includes("99999"), "Number line must survive");
  assert.ok(out.includes("https://"), "URL line must survive");
});

test("determinism: same input always produces same output", () => {
  const body = makeBody(PROSE);
  const r1 = applyHardBudget(body, { targetTokens: 200 });
  const r2 = applyHardBudget(body, { targetTokens: 200 });
  assert.equal(JSON.stringify(r1.body), JSON.stringify(r2.body));
});

test("targetTokens wins when both targetTokens and targetRatio are set", () => {
  const body = makeBody(PROSE);
  const proseTokens = countTextTokens(PROSE);

  // targetTokens=200 vs targetRatio=0.9 → targetTokens (200) should win
  const result = applyHardBudget(body, { targetTokens: 200, targetRatio: 0.9 });
  const msgs = result.body.messages as Array<{ content: string }>;
  const outTokens = countTextTokens(msgs.map((m) => m.content).join(" "));
  // If ratio=0.9 won, output would be ~90% of original; targetTokens=200 is more aggressive
  const ratioTarget = Math.ceil(proseTokens * 0.9);
  assert.ok(
    outTokens <= 200,
    `targetTokens should win: outTokens=${outTokens} should be ≤200, not ≤${ratioTarget}`
  );
});

test("techniquesUsed includes hard-budget", () => {
  const body = makeBody(PROSE);
  const result = applyHardBudget(body, { targetTokens: 200 });
  assert.ok(result.stats !== null, "stats should be present");
  assert.ok(
    result.stats!.techniquesUsed.includes("hard-budget"),
    `techniquesUsed should include 'hard-budget', got: ${result.stats!.techniquesUsed}`
  );
});

// --- Review fix #1: digit-less sensitive lines must be preserved ---

// Filler made of very common words → low saliency → first to be dropped
// unless a unit is explicitly preserve-guarded. This forces the regex to
// be the thing that protects the sensitive line (not its saliency score).
const LOW_SIGNAL_FILLER = [
  "the and the for and the with the and to the of the in the on the by the.",
  "to the for the and the of the with the and the in the on the and the by.",
  "and the of the to the for the with the in the on the and the by the the.",
  "for the and the to the of the with the and the on the in the by the the.",
  "of the to the and the for the with the on the and the in the by the the.",
  "in the and the to the for the of the with the by the and the on the the.",
];

// Target=1 forces EVERY droppable unit out; only preserve-guarded units can
// survive. This makes the regex (not the saliency score) the thing under test.
test("review#1: never drops a stack-trace at-frame line (digit-less)", () => {
  const lines = ["at processTicksAndRemainders foo bar baz qux", ...LOW_SIGNAL_FILLER].join("\n");
  const body = makeBody(lines);
  const result = applyHardBudget(body, { targetTokens: 1 });
  const out = (result.body.messages as Array<{ content: string }>).map((m) => m.content).join("\n");
  assert.ok(out.includes("at processTicksAndRemainders"), "at-frame must survive target=1");
});

test("review#1: never drops a KEY=value credential line (digit-less)", () => {
  const lines = ["SECRET_KEY=abc the the the the the", ...LOW_SIGNAL_FILLER].join("\n");
  const body = makeBody(lines);
  const result = applyHardBudget(body, { targetTokens: 1 });
  const out = (result.body.messages as Array<{ content: string }>).map((m) => m.content).join("\n");
  assert.ok(out.includes("SECRET_KEY=abc"), "KEY=value must survive target=1");
});

test("review#1: never drops a multi-slash path line (digit-less)", () => {
  const lines = ["/usr/local/lib/foo the the the the the", ...LOW_SIGNAL_FILLER].join("\n");
  const body = makeBody(lines);
  const result = applyHardBudget(body, { targetTokens: 1 });
  const out = (result.body.messages as Array<{ content: string }>).map((m) => m.content).join("\n");
  assert.ok(out.includes("/usr/local/lib/foo"), "multi-slash path must survive target=1");
});

test("review#1: plain prose ending in a period is still droppable", () => {
  // Regression guard for the deviation: end-of-sentence period must NOT match.
  const proseLine = "This is plain prose here.";
  assert.equal(
    /\d|https?:\/\/|(?:Error|Exception|TypeError|RangeError|SyntaxError|ReferenceError|Traceback):|```|^\s*at\s|\/[\w.-]+\/|[A-Za-z_]\w*=\S/i.test(
      proseLine
    ),
    false,
    "plain prose with a trailing period must remain droppable"
  );
});

// --- Review fix #2: aggregate target distributed across messages ---

test("review#2: aggregate target keeps TOTAL ≤ target across multiple messages", () => {
  // 4 messages of distinct, splittable droppable prose (multi-line so each
  // message can be cut independently). Pre-fix, the full target was passed to
  // EACH message, letting the total come back ~N× over budget.
  const block = (tag: string) =>
    [
      `The ${tag} alpha system processes large amounts of information efficiently every day.`,
      `The ${tag} beta module requires substantial computational resources for routine training.`,
      `The ${tag} gamma layer enables programs to understand structured language semantically here.`,
      `The ${tag} delta network consists of multiple interconnected processing components today.`,
      `The ${tag} epsilon routine accelerates new task learning through transfer of prior knowledge.`,
      `The ${tag} zeta pipeline stabilizes throughput by normalizing activations within batches.`,
    ].join("\n");
  const body = {
    messages: [
      { role: "user", content: block("one") },
      { role: "assistant", content: block("two") },
      { role: "user", content: block("three") },
      { role: "assistant", content: block("four") },
    ],
  };
  const target = 200;
  const totalBefore = (body.messages as Array<{ content: string }>).reduce(
    (s, m) => s + countTextTokens(m.content),
    0
  );
  assert.ok(totalBefore > target, `Fixture too small: ${totalBefore} tokens`);

  const result = applyHardBudget(body, { targetTokens: target });
  const msgs = result.body.messages as Array<{ content: string }>;
  const total = msgs.reduce((s, m) => s + countTextTokens(m.content), 0);
  assert.ok(result.compressed, "should be compressed");
  assert.ok(
    total <= target,
    `aggregate TOTAL ${total} must stay ≤ target ${target}`
  );
});

// --- Review fix #3: signal a warning when target is impossible ---

test("review#3: warns when preserved content exceeds budget", () => {
  // Every line is preserve-guarded (numbers), so the target cannot be reached.
  const lines = [
    "Value 11111 is here",
    "Value 22222 is here",
    "Value 33333 is here",
    "Value 44444 is here",
    "Value 55555 is here",
    "Value 66666 is here",
  ].join("\n");
  const body = makeBody(lines);
  const totalTokens = countTextTokens(lines);
  const result = applyHardBudget(body, { targetTokens: Math.floor(totalTokens * 0.3) });
  assert.ok(result.stats !== null, "stats should be present");
  const warnings = result.stats!.validationWarnings ?? [];
  assert.ok(
    warnings.some((w) => w.includes("hard-budget") && w.includes("could not reach target")),
    `expected a hard-budget warning, got: ${JSON.stringify(warnings)}`
  );
});

test("integration: applyStackedCompression with config.targetTokens cuts at end of pipeline", () => {
  const body = makeBody(PROSE);
  const proseTokens = countTextTokens(PROSE);
  assert.ok(proseTokens > 150, `Fixture too small: ${proseTokens} tokens`);

  const config = {
    enabled: true,
    defaultMode: "stacked" as const,
    autoTriggerMode: "lite" as const,
    autoTriggerTokens: 0,
    cacheMinutes: 5,
    preserveSystemPrompt: true,
    comboOverrides: {},
    compressionComboId: null,
    stackedPipeline: [{ engine: "caveman" as const, intensity: "lite" as const }],
    engines: {},
    activeComboId: null,
    targetTokens: 150,
  };

  const result = applyStackedCompression(body, config.stackedPipeline, { config });
  const msgs = result.body.messages as Array<{ content: string }>;
  const outTokens = countTextTokens(msgs.map((m) => m.content).join(" "));
  assert.ok(
    outTokens <= 150,
    `Integration: output tokens ${outTokens} exceed targetTokens 150`
  );
  assert.ok(result.compressed, "Integration: result should be compressed");

  const techniques = result.stats?.techniquesUsed ?? [];
  assert.ok(
    techniques.includes("hard-budget"),
    `Integration: techniquesUsed should include 'hard-budget', got: ${techniques}`
  );
});
