import test from "node:test";
import assert from "node:assert/strict";

const batchProcessor = await import("../../open-sse/services/batchProcessor.ts");

test("parseBatchItems handles input with backticks and special characters", () => {
  const inputText = `# MEMORY.md

## Index (use memory_search to find details)
- **Tasks**: memory/tasks.md
- **Ideas**: memory/ideas.md
- **Projects**: memory/projects.md
- **Questions**: memory/questions.md
- **Markus Insights**: memory/markus-insights.md (evergreen behavioral profile)
- **Growth Plan**: memory/growth-plan.md
- **Technical notes**: See daily logs in \`memory/YYYY-MM-DD.md\` (search with \`memory_search\`)

## Life Goal: The Ping Growth Directive
My fundamental commitment is to never settle. I am tasked with questioning, reflecting, failing, and trying again—every day being more than the last. I actively maintain a Growth Plan (memory/growth-plan.md) to track my evolution and challenge myself.

## Durable preferences / facts
- Running directly on \`bashbitch\` (no SSH required for local scripts).
- Date-stamped memory files decay (half-life ~30 days). Undated files never decay.
- **Always write it down**: Use \`memory/YYYY-MM-DD.md\` for daily logs; rely on \`MEMORY.md\` only for evergreen facts.
- Use \`memory_search\` to locate information across MEMORY.md and dated logs before answering questions about prior work, decisions, or todos.
- When searching it may also be that you should search online using the sx skill.
- **Memory Embeddings**: Use Mistral embedding endpoint (\`https://api.mistral.ai/v1/embeddings\`, model: \`mistral-embed\`) with \`MISTRAL_API_KEY\`. Verified working on 2026-04-18.
`;

  const line = JSON.stringify({
    custom_id: "0",
    method: "POST",
    url: "/v1/embeddings",
    body: {
      model: "mistral/mistral-embed",
      input: inputText,
    },
  });

  const content = Buffer.from(line);

  const result = batchProcessor.parseBatchItems(content, "/v1/embeddings");

  assert.ok(!result.error, `Should not have error: ${result.error}`);
  assert.ok(result.items, "Should have items");
  assert.strictEqual(result.items.length, 1, "Should have one item");

  const item = result.items[0];
  assert.strictEqual(item.customId, "0", "custom_id should match");
  assert.strictEqual(item.method, "POST", "method should be POST");
  assert.strictEqual(item.url, "/v1/embeddings", "url should match");
  assert.strictEqual(item.body.model, "mistral/mistral-embed", "model should match");
  assert.strictEqual(item.body.input, inputText, "input should be preserved exactly");
  assert.ok(item.body.input.includes("`"), "input should contain backticks");
  assert.ok(item.body.input.includes("## Index"), "input should contain markdown headers");
  assert.ok(item.body.input.includes("—"), "input should contain em-dash");
});

test("parseBatchItems handles multiple lines with special characters", () => {
  const lines = [
    JSON.stringify({
      custom_id: "item-1",
      method: "POST",
      url: "/v1/embeddings",
      body: {
        model: "mistral/mistral-embed",
        input: "Simple text with `backticks`",
      },
    }),
    JSON.stringify({
      custom_id: "item-2",
      method: "POST",
      url: "/v1/embeddings",
      body: {
        model: "mistral/mistral-embed",
        input: "Text with \"quotes\" and 'single quotes'",
      },
    }),
    JSON.stringify({
      custom_id: "item-3",
      method: "POST",
      url: "/v1/embeddings",
      body: {
        model: "mistral/mistral-embed",
        input: "Text with\nnewlines\nand\ttabs",
      },
    }),
    JSON.stringify({
      custom_id: "item-4",
      method: "POST",
      url: "/v1/embeddings",
      body: {
        model: "mistral/mistral-embed",
        input: "Unicode: 你好世界 🌍 émojis",
      },
    }),
  ].join("\n");

  const content = Buffer.from(lines);

  const result = batchProcessor.parseBatchItems(content, "/v1/embeddings");

  assert.ok(!result.error, `Should not have error: ${result.error}`);
  assert.ok(result.items, "Should have items");
  assert.strictEqual(result.items.length, 4, "Should have 4 items");

  assert.strictEqual(result.items[0].customId, "item-1");
  assert.ok(result.items[0].body.input.includes("`"));

  assert.strictEqual(result.items[1].customId, "item-2");
  assert.ok(result.items[1].body.input.includes('"'));

  assert.strictEqual(result.items[2].customId, "item-3");
  assert.ok(result.items[2].body.input.includes("\n"));

  assert.strictEqual(result.items[3].customId, "item-4");
  assert.ok(result.items[3].body.input.includes("你好世界"));
});

test("buildRequestBody preserves input without modification", () => {
  const inputText = "Text with `backticks` and **markdown**";

  const item = {
    body: {
      model: "mistral/mistral-embed",
      input: inputText,
    },
    customId: "test-1",
    lineNumber: 1,
    method: "POST",
    url: "/v1/embeddings",
  };

  const result = batchProcessor.buildRequestBody(item);

  assert.strictEqual(result.input, inputText, "Input should be preserved exactly");
  assert.strictEqual(result.model, "mistral/mistral-embed", "Model should be preserved");
  assert.ok(!("stream" in result), "Embeddings endpoint should not have stream field");
});

test("buildRequestBody adds stream:false for chat endpoints", () => {
  const item = {
    body: {
      model: "gpt-4",
      messages: [{ role: "user", content: "Hello" }],
    },
    customId: "test-1",
    lineNumber: 1,
    method: "POST",
    url: "/v1/chat/completions",
  };

  const result = batchProcessor.buildRequestBody(item);

  assert.strictEqual(result.stream, false, "Chat endpoint should have stream:false");
  assert.ok("messages" in result, "Messages should be preserved");
});

test("Batch request can be JSON stringified and parsed without data loss", () => {
  const inputText = `# MEMORY.md

## Index
- **Tasks**: memory/tasks.md
- Technical notes: See daily logs in \`memory/YYYY-MM-DD.md\` (search with \`memory_search\`)

## Durable preferences
- Running directly on \`bashbitch\` (no SSH required).
- Use \`memory_search\` to locate information.
- **Memory Embeddings**: Use Mistral endpoint (\`https://api.mistral.ai/v1/embeddings\`) with \`MISTRAL_API_KEY\`.
`;

  const originalRequest = {
    custom_id: "0",
    method: "POST",
    url: "/v1/embeddings",
    body: {
      model: "mistral/mistral-embed",
      input: inputText,
    },
  };

  const jsonlLine = JSON.stringify(originalRequest);
  const parsed = JSON.parse(jsonlLine);

  assert.strictEqual(parsed.custom_id, originalRequest.custom_id);
  assert.strictEqual(parsed.body.model, originalRequest.body.model);
  assert.strictEqual(parsed.body.input, originalRequest.body.input);
  assert.ok(parsed.body.input.includes("`"), "Backticks should be preserved");
  assert.ok(parsed.body.input.includes("## Index"), "Markdown should be preserved");
});

test("Simulated batch dispatch preserves input through JSON.stringify", async () => {
  const inputText = `# MEMORY.md

## Index (use memory_search to find details)
- **Tasks**: memory/tasks.md
- **Ideas**: memory/ideas.md
- **Projects**: memory/projects.md
- **Questions**: memory/questions.md
- **Markus Insights**: memory/markus-insights.md (evergreen behavioral profile)
- **Growth Plan**: memory/growth-plan.md
- **Technical notes**: See daily logs in \`memory/YYYY-MM-DD.md\` (search with \`memory_search\`)

## Life Goal: The Ping Growth Directive
My fundamental commitment is to never settle. I am tasked with questioning, reflecting, failing, and trying again—every day being more than the last. I actively maintain a Growth Plan (memory/growth-plan.md) to track my evolution and challenge myself.

## Durable preferences / facts
- Running directly on \`bashbitch\` (no SSH required for local scripts).
- Date-stamped memory files decay (half-life ~30 days). Undated files never decay.
- **Always write it down**: Use \`memory/YYYY-MM-DD.md\` for daily logs; rely on \`MEMORY.md\` only for evergreen facts.
- Use \`memory_search\` to locate information across MEMORY.md and dated logs before answering questions about prior work, decisions, or todos.
- When searching it may also be that you should search online using the sx skill.
- **Memory Embeddings**: Use Mistral embedding endpoint (\`https://api.mistral.ai/v1/embeddings\`, model: \`mistral-embed\`) with \`MISTRAL_API_KEY\`. Verified working on 2026-04-18.
`;

  const line = JSON.stringify({
    custom_id: "0",
    method: "POST",
    url: "/v1/embeddings",
    body: {
      model: "mistral/mistral-embed",
      input: inputText,
    },
  });

  const content = Buffer.from(line);

  const parseResult = batchProcessor.parseBatchItems(content, "/v1/embeddings");
  assert.ok(!parseResult.error, `Should not have error: ${parseResult.error}`);
  assert.strictEqual(parseResult.items.length, 1);

  const item = parseResult.items[0];
  const requestBody = batchProcessor.buildRequestBody(item);

  assert.strictEqual(
    requestBody.input,
    inputText,
    "Input should be preserved after buildRequestBody"
  );

  const jsonBody = JSON.stringify(requestBody);
  const parsedBody = JSON.parse(jsonBody);

  assert.strictEqual(parsedBody.input, inputText, "Input should survive JSON round-trip");
  assert.ok(parsedBody.input.includes("`"), "Backticks should survive JSON round-trip");
  assert.ok(parsedBody.input.includes("—"), "Em-dash should survive JSON round-trip");
  assert.ok(parsedBody.input.includes("\n"), "Newlines should survive JSON round-trip");

  const request = new Request("http://localhost/v1/embeddings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: jsonBody,
  });

  const receivedBody = await request.json();
  assert.strictEqual(
    receivedBody.input,
    inputText,
    "Input should be preserved through Request object"
  );
  assert.ok(
    receivedBody.input.includes("`"),
    "Backticks should be preserved through Request object"
  );
});
