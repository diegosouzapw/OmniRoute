import { test } from "node:test";
import assert from "node:assert/strict";

// Regression guard for the Cursor `Subagent` tool call carrying the cloud-only
// optional field `cloud_base_branch` as an empty string. Cursor rejects the call
// ("cloud_base_branch may only be specified when environment equals cloud") when a
// local subagent tool call includes the field at all. The Responses->Chat translator
// strips empty-string/empty-array optional fields, but that cleanup was scoped to
// Claude Code's `Read` tool only; it must also cover Cursor's `Subagent` tool.
// Ported from decolua/9router#2446.

const LEAF = "../../open-sse/translator/response/openai-responses/pureHelpers.ts";

test("Subagent tool: strips empty-string cloud_base_branch, keeps populated fields", async () => {
  const { stripEmptyOptionalToolArgs } = await import(LEAF);
  const raw = JSON.stringify({
    description: "subagent connectivity test",
    prompt: "hello",
    readonly: true,
    subagent_type: "generalPurpose",
    file_attachments: [],
    environment: "local",
    cloud_base_branch: "",
    interrupt: false,
    run_in_background: false,
  });

  const cleaned = JSON.parse(stripEmptyOptionalToolArgs(raw, "Subagent"));

  // The offending empty optional field must be gone.
  assert.equal("cloud_base_branch" in cleaned, false);
  // Empty array optional also dropped (same rule as Read).
  assert.equal("file_attachments" in cleaned, false);
  // Populated / meaningful fields preserved — including falsy booleans.
  assert.equal(cleaned.description, "subagent connectivity test");
  assert.equal(cleaned.prompt, "hello");
  assert.equal(cleaned.readonly, true);
  assert.equal(cleaned.subagent_type, "generalPurpose");
  assert.equal(cleaned.environment, "local");
  assert.equal(cleaned.interrupt, false);
  assert.equal(cleaned.run_in_background, false);
});

test("Read tool cleanup remains intact (no regression)", async () => {
  const { stripEmptyOptionalToolArgs } = await import(LEAF);
  const raw = JSON.stringify({ file_path: "/a.ts", pages: "" });
  const cleaned = JSON.parse(stripEmptyOptionalToolArgs(raw, "Read"));
  assert.equal("pages" in cleaned, false);
  assert.equal(cleaned.file_path, "/a.ts");
});

test("arbitrary tools keep empty strings/arrays (unchanged pass-through)", async () => {
  const { stripEmptyOptionalToolArgs } = await import(LEAF);
  const raw = JSON.stringify({ query: "", tags: [] });
  // Not on the allowlist -> returned verbatim.
  assert.equal(stripEmptyOptionalToolArgs(raw, "SomeOtherTool"), raw);
});
