/**
 * Regression test for the _claudeCodeRequiresLowercaseToolNames flag leak
 * that caused HTTP 400 "Extra inputs are not permitted" from Anthropic.
 *
 * The flag had no readers in the codebase but was assigned to the outgoing
 * request body. Anthropic's strict schema validation rejected the unknown
 * field. This test guards against re-introduction.
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { remapToolNamesInRequest } from "../../open-sse/services/claudeCodeToolRemapper.ts";

describe("remapToolNamesInRequest — flag-leak regression", () => {
  it("does NOT add _claudeCodeRequiresLowercaseToolNames when all tools are lowercase", () => {
    const body: Record<string, unknown> = {
      tools: [{ name: "bash" }, { name: "read" }, { name: "edit" }],
    };
    remapToolNamesInRequest(body);
    assert.equal(
      "_claudeCodeRequiresLowercaseToolNames" in body,
      false,
      "Flag must not leak into outgoing request body"
    );
  });

  it("returns true when only lowercase tools are present", () => {
    const body: Record<string, unknown> = { tools: [{ name: "bash" }] };
    assert.equal(remapToolNamesInRequest(body), true);
  });

  it("returns false when only TitleCase tools are present", () => {
    const body: Record<string, unknown> = { tools: [{ name: "Bash" }] };
    assert.equal(remapToolNamesInRequest(body), false);
  });

  it("returns false when mixed-case tools are present", () => {
    const body: Record<string, unknown> = {
      tools: [{ name: "bash" }, { name: "Read" }],
    };
    assert.equal(remapToolNamesInRequest(body), false);
  });

  it("does NOT add flag in any of the above cases", () => {
    for (const tools of [
      [{ name: "bash" }],
      [{ name: "Bash" }],
      [{ name: "bash" }, { name: "Read" }],
      [],
    ]) {
      const body: Record<string, unknown> = { tools };
      remapToolNamesInRequest(body);
      assert.equal(
        "_claudeCodeRequiresLowercaseToolNames" in body,
        false,
        `Flag leaked for tools=${JSON.stringify(tools)}`
      );
    }
  });
});
