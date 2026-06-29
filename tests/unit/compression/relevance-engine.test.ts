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
