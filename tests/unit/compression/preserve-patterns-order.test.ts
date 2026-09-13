/**
 * Tests for #13457: cavemanConfig.preservePatterns must not be silently
 * skipped when a user region contains built-in preserved constructs.
 *
 * Before the fix, built-in patterns (inline code, headings, URLs, etc.)
 * ran first and replaced inline constructs within the user's region with
 * sentinel placeholders. When the user pattern then tried to match the
 * region, the sentinel was present and replacePattern silently skipped it.
 *
 * The fix: user patterns run BEFORE built-in patterns, so user regions
 * are captured as a whole before built-in patterns fragment them.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { extractPreservedBlocks } from "../../open-sse/services/compression/preservation.ts";

test("user pattern captures region containing inline code", () => {
  const PAT = /<system-reminder>[\s\S]*?<\/system-reminder>/.source;
  const text = `<system-reminder>
# Deploy rules
- The backup files \`.app-prev-*\` must never be deleted.
- Run \`npm test\` before \`npm run build\`.
</system-reminder>

Please deploy the fix.`;

  const { text: tombstoned, blocks } = extractPreservedBlocks(text, {
    preservePatterns: [PAT],
  });

  // The entire <system-reminder> block should be captured as one user pattern
  const userBlock = blocks.find((b) => b.kind === "custom");
  assert.ok(userBlock, "User pattern should capture the <system-reminder> block");
  assert.ok(
    userBlock!.content.includes(".app-prev-*"),
    "Preserved block must contain the full region including inline code"
  );
  assert.ok(
    userBlock!.content.includes("`npm test`"),
    "Preserved block must contain inline code within the region"
  );
  assert.ok(
    userBlock!.content.includes("# Deploy rules"),
    "Preserved block must contain the heading"
  );

  // The surrounding prose should remain
  assert.ok(
    tombstoned.includes("Please deploy the fix"),
    "Non-instruction text should remain"
  );

  // No nested built-in blocks should have been extracted from within the user region
  const builtInBlocks = blocks.filter(
    (b) => b.kind !== "custom" && b.kind !== "system_instruction"
  );
  for (const block of builtInBlocks) {
    assert.ok(
      !block.content.includes(".app-prev-*"),
      `Built-in block kind=${block.kind} should not extract content from within user region`
    );
  }
});

test("user pattern captures region containing URL", () => {
  const PAT = /<system-reminder>[\s\S]*?<\/system-reminder>/.source;
  const text = `<system-reminder>
Docs: https://example.com/runbook
Always read the docs first.
</system-reminder>

Deploy now.`;

  const { text: tombstoned, blocks } = extractPreservedBlocks(text, {
    preservePatterns: [PAT],
  });

  const userBlock = blocks.find((b) => b.kind === "custom");
  assert.ok(userBlock, "User pattern should capture the block");
  assert.ok(
    userBlock!.content.includes("https://example.com/runbook"),
    "URL inside user region must not be extracted as a separate built-in"
  );

  // Verify URL is not a separate built-in block
  const urlBlocks = blocks.filter((b) => b.kind === "url");
  for (const block of urlBlocks) {
    assert.ok(
      !block.content.includes("example.com/runbook"),
      "URL should be inside user block, not a separate built-in"
    );
  }
});

test("user pattern captures region containing CONST_CASE identifiers", () => {
  const PAT = /<system-reminder>[\s\S]*?<\/system-reminder>/.source;
  const text = `<system-reminder>
Never set MAX_RETRIES to 0.
Always check the ENVIRONMENT variable.
</system-reminder>

Proceed.`;

  const { text: tombstoned, blocks } = extractPreservedBlocks(text, {
    preservePatterns: [PAT],
  });

  const userBlock = blocks.find((b) => b.kind === "custom");
  assert.ok(userBlock, "User pattern should capture the block");
  assert.ok(
    userBlock!.content.includes("MAX_RETRIES"),
    "CONST_CASE inside user region must not be extracted"
  );
  assert.ok(
    userBlock!.content.includes("ENVIRONMENT"),
    "CONST_CASE inside user region must not be extracted"
  );
});

test("without user patterns, built-in patterns still work normally", () => {
  const text = `Here is some \`inline code\` and a https://example.com URL.`;

  const { blocks } = extractPreservedBlocks(text);

  const inlineCode = blocks.find((b) => b.kind === "inline_code");
  assert.ok(inlineCode, "Inline code should be preserved by built-in");

  const url = blocks.find((b) => b.kind === "url");
  assert.ok(url, "URL should be preserved by built-in");
});

test("user pattern and built-in patterns coexist when region has no overlap", () => {
  const PAT = /<system-reminder>[\s\S]*?<\/system-reminder>/.source;
  const text = `Check the \`npm test\` command.

<system-reminder>
Never delete production data.
</system-reminder>

Deploy now.`;

  const { text: tombstoned, blocks } = extractPreservedBlocks(text, {
    preservePatterns: [PAT],
  });

  // User block captured
  const userBlock = blocks.find((b) => b.kind === "custom");
  assert.ok(userBlock, "User pattern should capture the system-reminder block");
  assert.ok(
    userBlock!.content.includes("Never delete production data"),
    "User block contains full instruction"
  );

  // Built-in inline code captured (outside the user region)
  const inlineCode = blocks.find((b) => b.kind === "inline_code");
  assert.ok(inlineCode, "Built-in inline code should be captured outside user region");
});
