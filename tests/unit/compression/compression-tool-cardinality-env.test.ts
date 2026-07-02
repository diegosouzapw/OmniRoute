import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  readMcpToolProfileFromEnv,
  reduceToolManifest,
} from "../../../open-sse/mcp-server/toolCardinality.ts";

// F4.3 wiring: the MCP server now consults an opt-in tool profile (MCP_TOOL_DENY / MCP_TOOL_ALLOW)
// and disables denied tools so they are not announced to the model (token savings). Default (no
// env) is a no-op — every tool stays registered.
describe("MCP tool profile from env (cardinality opt-in)", () => {
  it("returns null when no deny/allow env is set (no-op)", () => {
    assert.equal(readMcpToolProfileFromEnv({}), null);
    assert.equal(readMcpToolProfileFromEnv({ MCP_TOOL_DENY: "", MCP_TOOL_ALLOW: "  " }), null);
  });

  it("parses MCP_TOOL_DENY / MCP_TOOL_ALLOW into a profile (trimmed, empties dropped)", () => {
    const p = readMcpToolProfileFromEnv({ MCP_TOOL_DENY: "a, b ,c", MCP_TOOL_ALLOW: "x ," });
    assert.deepEqual(p?.denyTools, ["a", "b", "c"]);
    assert.deepEqual(p?.allowTools, ["x"]);
  });

  it("the deny gate drops a denied tool and keeps others (single-entry manifest decision)", () => {
    const profile = readMcpToolProfileFromEnv({ MCP_TOOL_DENY: "noisy_tool" });
    assert.ok(profile);
    assert.equal(reduceToolManifest([{ name: "noisy_tool", scopes: [] }], profile).length, 0);
    assert.equal(reduceToolManifest([{ name: "useful_tool", scopes: [] }], profile).length, 1);
  });

  it("allow-list mode keeps only the listed tools", () => {
    const profile = readMcpToolProfileFromEnv({ MCP_TOOL_ALLOW: "keep_me" });
    assert.ok(profile);
    assert.equal(reduceToolManifest([{ name: "keep_me", scopes: [] }], profile).length, 1);
    assert.equal(reduceToolManifest([{ name: "other", scopes: [] }], profile).length, 0);
  });
});
