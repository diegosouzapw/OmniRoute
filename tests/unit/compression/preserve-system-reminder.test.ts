/**
 * Tests for #13453: preserve <system-reminder> blocks from lossy compression.
 *
 * Agentic coding CLIs (Claude Code, Codex, etc.) inject project instructions
 * into user-role messages wrapped in <system-reminder>…</system-reminder> envelopes.
 * Lossy compression engines (ultra, aggressive, caveman, etc.) were rewriting
 * these instruction blocks as prose, dropping negations and breaking XML tags.
 *
 * The fix adds <system-reminder> to the preservation patterns so they survive
 * compression byte-identical.
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { extractPreservedBlocks } from "../../open-sse/services/compression/preservation.ts";

const INSTRUCTION_BLOCK = `<system-reminder>
Project instructions (auto-injected by the coding agent CLI, role=user):

# Deploy rules

- NEVER run \`rm -rf\` on the target host. Always ask first.
- Do not push to \`main\` directly; open a PR.
- The backup files \`.app-prev-*\` must never be deleted.
- Never store the SSH password on disk.
- Always run \`npm test\` before \`npm run build\`.
- Do NOT edit files under \`/etc\` by hand.

## Restart procedure

\`\`\`bash
systemctl --user restart app.service
curl -sf http://127.0.0.1:20128/health
\`\`\`

Docs: https://example.com/runbook
</system-reminder>`;

test("extractPreservedBlocks captures <system-reminder> blocks verbatim", () => {
  const userMessage = `Here is my request:\n${INSTRUCTION_BLOCK}\n\nPlease deploy the fix.`;

  const { text: tombstoned, blocks } = extractPreservedBlocks(userMessage);

  // The instruction block should be tombstoned (replaced with placeholder)
  assert.ok(
    !tombstoned.includes("NEVER run"),
    "Original instruction text should be replaced with a placeholder"
  );
  assert.ok(
    tombstoned.includes("Here is my request"),
    "Non-instruction text should remain"
  );
  assert.ok(
    tombstoned.includes("Please deploy the fix"),
    "Trailing text should remain"
  );

  // The preserved block should contain the full instruction text
  const instructionBlock = blocks.find((b) => b.kind === "system_instruction");
  assert.ok(instructionBlock, "Should find a preserved system_instruction block");
  assert.ok(
    instructionBlock!.content.includes("NEVER run"),
    "Preserved block should contain the full instruction text"
  );
  assert.ok(
    instructionBlock!.content.includes("<system-reminder>"),
    "Preserved block should include the opening tag"
  );
  assert.ok(
    instructionBlock!.content.includes("</system-reminder>"),
    "Preserved block should include the closing tag"
  );
});

test("extractPreservedBlocks captures <instructions> blocks", () => {
  const text = `Before\n<instructions>\nDo NOT touch production.\n</instructions>\nAfter`;

  const { text: tombstoned, blocks } = extractPreservedBlocks(text);

  const instructionBlock = blocks.find((b) => b.kind === "system_instruction");
  assert.ok(instructionBlock, "Should find a preserved system_instruction block");
  assert.ok(
    instructionBlock!.content.includes("Do NOT touch production"),
    "Preserved block should contain instruction text"
  );
  assert.ok(
    !tombstoned.includes("Do NOT touch production"),
    "Instruction text should be tombstoned"
  );
});

test("extractPreservedBlocks captures <project-instructions> blocks", () => {
  const text = `Before\n<project-instructions>\nNEVER delete the database.\n</project-instructions>\nAfter`;

  const { text: tombstoned, blocks } = extractPreservedBlocks(text);

  const instructionBlock = blocks.find((b) => b.kind === "system_instruction");
  assert.ok(instructionBlock, "Should find a preserved system_instruction block");
  assert.ok(
    instructionBlock!.content.includes("NEVER delete the database"),
    "Preserved block should contain instruction text"
  );
});

test("non-instruction text outside <system-reminder> is still compressible", () => {
  const text = `Normal prose that can be compressed.\n<system-reminder>Do NOT do X</system-reminder>\nMore normal prose.`;

  const { text: tombstoned } = extractPreservedBlocks(text);

  // The prose around the instruction block should still be tombstoned
  // (i.e. the prose can be compressed, but the instruction block is protected)
  assert.ok(
    tombstoned.includes("Normal prose that can be compressed"),
    "Non-instruction prose should remain in the tombstoned text"
  );
  assert.ok(
    tombstoned.includes("More normal prose"),
    "Trailing prose should remain"
  );
  assert.ok(
    !tombstoned.includes("Do NOT do X"),
    "Instruction text should be replaced with placeholder"
  );
});
