import test from "node:test";
import assert from "node:assert/strict";
import { relevanceEngine } from "../../../open-sse/services/compression/engines/relevance/index.ts";

function makeBody(userContent: string, priorContent?: string): Record<string, unknown> {
  const messages: Array<{ role: string; content: string }> = [];
  if (priorContent) {
    messages.push({ role: "assistant", content: priorContent });
  }
  messages.push({ role: "user", content: userContent });
  return { messages };
}

const LONG_CONTENT =
  "Please note that I want to say something. " +
  "The database connection requires a host parameter and a port number. " +
  "Indeed it is very important to understand this. " +
  "The port defaults to 5432 for PostgreSQL. " +
  "In conclusion I hope this helps you.";

test("apply keeps relevant sentences and drops irrelevant prose", () => {
  const body = {
    messages: [
      { role: "user", content: "How do I configure the PostgreSQL database connection?" },
      { role: "assistant", content: LONG_CONTENT },
      {
        role: "user",
        content:
          "What is the port? " +
          "Also tell me about host parameters. " +
          "Unrelated: what color is the sky? " +
          "PostgreSQL port is 5432. " +
          "The sky is blue on a clear day. " +
          "Connection requires host and port settings.",
      },
    ],
  };
  const result = relevanceEngine.apply(body, {
    stepConfig: { enabled: true, budgetPercent: 0.5, overlapThreshold: 0.05 },
  });
  assert.equal(result.compressed, true);
  const messages = result.body.messages as Array<{ content: string }>;
  const lastContent = messages[messages.length - 1].content;
  assert.match(lastContent, /port/i);
});

test("no-op when there is no user message in messages", () => {
  const body = {
    messages: [{ role: "assistant", content: "Some long assistant reply here with many words." }],
  };
  const result = relevanceEngine.apply(body, {
    stepConfig: { enabled: true, budgetPercent: 0.5 },
  });
  assert.equal(result.compressed, false);
  assert.deepEqual(result.body, body);
});

test("no-op when last user message has only one sentence", () => {
  const body = {
    messages: [
      { role: "user", content: "Just one sentence here." },
    ],
  };
  const result = relevanceEngine.apply(body, {
    stepConfig: { enabled: true, budgetPercent: 0.5 },
  });
  assert.equal(result.compressed, false);
});

test("fail-open on malformed input — returns original body", () => {
  const body = { messages: "not an array" };
  const result = relevanceEngine.apply(body, {
    stepConfig: { enabled: true },
  });
  assert.equal(result.compressed, false);
  assert.deepEqual(result.body, body);
});

test("determinism: same input produces same output", () => {
  const body = {
    messages: [
      { role: "user", content: "How does the retry mechanism work for failed requests?" },
      {
        role: "user",
        content:
          "The retry mechanism triggers after a timeout. " +
          "Exponential backoff is applied between retries. " +
          "Please note this is very important. " +
          "The maximum retry count is configurable. " +
          "Indeed this is something to consider carefully.",
      },
    ],
  };
  const opts = { stepConfig: { enabled: true, budgetPercent: 0.5, overlapThreshold: 0.05 } };
  const r1 = relevanceEngine.apply(body, opts);
  const r2 = relevanceEngine.apply(body, opts);
  assert.deepEqual(r1.body, r2.body);
  assert.equal(r1.compressed, r2.compressed);
});

test("sentences matching FORCE_PRESERVE_RE are never dropped", () => {
  const body = {
    messages: [
      { role: "user", content: "What happened?" },
      {
        role: "user",
        content:
          "This sentence is completely unrelated to the query. " +
          "Error: connection refused at port 5432. " +
          "Another unrelated sentence about random things. " +
          "Yet another irrelevant sentence with no matching tokens.",
      },
    ],
  };
  const result = relevanceEngine.apply(body, {
    stepConfig: { enabled: true, budgetPercent: 0.3, overlapThreshold: 0.0 },
  });
  if (result.compressed) {
    const messages = result.body.messages as Array<{ content: string }>;
    const lastContent = messages[messages.length - 1].content;
    assert.match(lastContent, /Error: connection refused/);
  }
});

test("techniquesUsed contains relevance-extract when compression occurred", () => {
  const body = {
    messages: [
      { role: "user", content: "Explain database indexing." },
      {
        role: "user",
        content:
          "Database indexes speed up queries on large tables. " +
          "Unrelated random words about nothing important here. " +
          "Indexes are created with CREATE INDEX in SQL. " +
          "Please note that this sentence is filler content only.",
      },
    ],
  };
  const result = relevanceEngine.apply(body, {
    stepConfig: { enabled: true, budgetPercent: 0.5, overlapThreshold: 0.05 },
  });
  if (result.compressed && result.stats) {
    assert.ok(
      result.stats.techniquesUsed.includes("relevance-extract"),
      `expected relevance-extract in techniquesUsed, got: ${result.stats.techniquesUsed}`
    );
  }
});

test("preserves original sentence order after greedy selection", () => {
  const body = {
    messages: [
      { role: "user", content: "Tell me about cats and dogs." },
      {
        role: "user",
        content:
          "Cats are independent animals. " +
          "Completely irrelevant filler sentence here today. " +
          "Dogs are loyal companions. " +
          "Another filler sentence with random content. " +
          "Cats and dogs are popular pets worldwide.",
      },
    ],
  };
  const result = relevanceEngine.apply(body, {
    stepConfig: { enabled: true, budgetPercent: 0.6, overlapThreshold: 0.05 },
  });
  if (result.compressed) {
    const messages = result.body.messages as Array<{ content: string }>;
    const lastContent = messages[messages.length - 1].content;
    const catIdx = lastContent.indexOf("Cats are independent");
    const dogIdx = lastContent.indexOf("Dogs are loyal");
    if (catIdx !== -1 && dogIdx !== -1) {
      assert.ok(catIdx < dogIdx, "original order (cats before dogs) should be preserved");
    }
  }
});

test("array content (multimodal) is handled without crash", () => {
  const body = {
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "What is the database host?" },
        ],
      },
    ],
  };
  assert.doesNotThrow(() => {
    relevanceEngine.apply(body, { stepConfig: { enabled: true } });
  });
});

test("engine metadata is correct", () => {
  assert.equal(relevanceEngine.id, "relevance");
  assert.equal(relevanceEngine.stackPriority, 18);
  assert.ok(Array.isArray(relevanceEngine.targets));
  assert.ok(relevanceEngine.getConfigSchema().length > 0);
});

// ── Issue 1: overlapThreshold must actually drop zero-overlap sentences ──────
test("zero-overlap sentences below overlapThreshold are dropped even with budget room", () => {
  // Context user message with 5 relevant + 5 zero-overlap sentences. Generous
  // budget (0.9) so budget alone would keep everything; overlapThreshold must
  // still drop the zero-overlap ones.
  const relevant = "alpha beta gamma delta epsilon configuration database query.";
  const zero = "zzqqxx vvbbnn mmllkk poiuyt qwerty.";
  const context =
    `${relevant} ${zero} ${relevant} ${zero} ${relevant} ` +
    `${zero} ${relevant} ${zero} ${relevant} ${zero}`;
  const body = {
    messages: [
      { role: "user", content: context },
      { role: "user", content: "alpha beta gamma delta epsilon configuration database query" },
    ],
  };
  const result = relevanceEngine.apply(body, {
    stepConfig: { enabled: true, budgetPercent: 0.9, overlapThreshold: 0.1 },
  });
  assert.equal(result.compressed, true);
  const messages = result.body.messages as Array<{ content: string }>;
  // The dropped message is the CONTEXT (index 0), not the query (Issue 5).
  const compressed = messages[0].content;
  assert.ok(
    !compressed.includes("zzqqxx"),
    `zero-overlap sentence should be dropped, got: ${compressed}`
  );
  assert.ok(compressed.includes("alpha beta gamma"), "relevant sentence should survive");
});

// ── Issue 2: multimodal with multiple text blocks must not be corrupted ──────
test("multimodal content with multiple text blocks is returned unchanged", () => {
  const body = {
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "Sentence A about cats. Another A sentence here." },
          { type: "image_url", image_url: { url: "data:image/png;base64,xxx" } },
          { type: "text", text: "Sentence B about dogs. Another B sentence here." },
        ],
      },
      { role: "user", content: "cats dogs animals query text" },
    ],
  };
  const result = relevanceEngine.apply(body, {
    stepConfig: { enabled: true, budgetPercent: 0.2, overlapThreshold: 0.0 },
  });
  const messages = result.body.messages as Array<{
    content: Array<{ type: string; text?: string }>;
  }>;
  const blocks = messages[0].content;
  // Neither text block may be overwritten with the other's (joined) content.
  assert.equal(blocks[0].text, "Sentence A about cats. Another A sentence here.");
  assert.equal(blocks[2].text, "Sentence B about dogs. Another B sentence here.");
});

test("multimodal content with a single text block compresses that block in place", () => {
  const body = {
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text:
              "The database host is configured in settings. " +
              "Completely unrelated filler about random topics here. " +
              "The database port defaults to five four three two.",
          },
        ],
      },
      { role: "user", content: "database host port configuration settings" },
    ],
  };
  const result = relevanceEngine.apply(body, {
    stepConfig: { enabled: true, budgetPercent: 0.6, overlapThreshold: 0.05 },
  });
  if (result.compressed) {
    const messages = result.body.messages as Array<{
      content: Array<{ type: string; text?: string }>;
    }>;
    const text = messages[0].content[0].text ?? "";
    assert.match(text, /database/i);
  }
});

// ── Issue 3: force-preserved content must not starve high-relevance sentences ─
test("force-preserved sentences are free and do not starve top-relevance sentence", () => {
  // Many force-preserved sentences (contain digits/Error: → FORCE_PRESERVE_RE)
  // would fill a tiny budget; the single highest-relevance non-force sentence
  // must still be kept.
  const forced =
    "Error: code 100. Error: code 200. Error: code 300. Error: code 400. Error: code 500.";
  const relevant = "The quantum entanglement relevance signal token here.";
  const filler = "Totally unrelated padding sentence with nothing useful.";
  const context = `${forced} ${relevant} ${filler}`;
  const body = {
    messages: [
      { role: "user", content: context },
      { role: "user", content: "quantum entanglement relevance signal token" },
    ],
  };
  const result = relevanceEngine.apply(body, {
    stepConfig: { enabled: true, budgetPercent: 0.05, overlapThreshold: 0.01 },
  });
  assert.equal(result.compressed, true);
  const messages = result.body.messages as Array<{ content: string }>;
  const compressed = messages[0].content;
  assert.ok(
    compressed.includes("quantum entanglement relevance signal"),
    `top-relevance sentence must survive despite forced content, got: ${compressed}`
  );
  // Forced content also survives.
  assert.ok(compressed.includes("Error: code 100"));
});

// ── Issue 4: whitespace / paragraph breaks must be preserved ─────────────────
test("paragraph breaks (double newline) survive between kept sentences", () => {
  const context =
    "The database connection requires a host parameter.\n\n" +
    "Unrelated filler sentence about random nothing.\n\n" +
    "The connection also requires a port number setting.";
  const body = {
    messages: [
      { role: "user", content: context },
      { role: "user", content: "database connection host port setting" },
    ],
  };
  const result = relevanceEngine.apply(body, {
    stepConfig: { enabled: true, budgetPercent: 0.7, overlapThreshold: 0.05 },
  });
  if (result.compressed) {
    const messages = result.body.messages as Array<{ content: string }>;
    const compressed = messages[0].content;
    assert.match(compressed, /\n\n/, `expected paragraph break to survive, got: ${compressed}`);
  }
});

// ── Issue 5 (REJECTED after review): we deliberately do NOT skip the query message.
// The query is a string snapshot taken before compression, so compressing the last user
// message against it is not circular; and that message commonly carries the pasted context
// the engine is meant to trim ("docs longos colados"). When the query IS the whole message,
// every sentence overlaps it fully → high score → kept → a natural no-op, so no special-case
// is needed. This test asserts the last user message is NOT force-skipped: a context-only
// last message with a distinct prior query message is still eligible for compression.
test("the last/only user message is NOT special-cased / skipped (eligible for compression)", () => {
  // A single user message (it IS the query). With a tight budget it must still be processed
  // and trimmed — proving there is no index-based early-skip of the query message.
  const sentence = "alpha beta gamma delta epsilon configuration database query parameters here.";
  const body = {
    messages: [{ role: "user", content: Array(8).fill(sentence).join(" ") }],
  };
  const result = relevanceEngine.apply(body, {
    stepConfig: { enabled: true, budgetPercent: 0.3, overlapThreshold: 0.0 },
  });
  assert.equal(result.compressed, true, "the last/only user message must be eligible for compression");
  const out = (result.body.messages as Array<{ content: string }>)[0].content;
  assert.ok(out.length < Array(8).fill(sentence).join(" ").length, "tight budget trims the message");
});
