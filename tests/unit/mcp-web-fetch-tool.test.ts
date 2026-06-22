import test from "node:test";
import assert from "node:assert/strict";

import {
  webFetchInput,
  webFetchOutput,
  webFetchTool,
  MCP_TOOLS,
  MCP_TOOL_MAP,
} from "../../open-sse/mcp-server/schemas/tools.ts";
import { MCP_TOOL_SCOPES } from "../../src/shared/constants/mcpScopes.ts";

// ── Tool definition shape ──

test("webFetchTool has the required McpToolDefinition shape", () => {
  assert.equal(webFetchTool.name, "omniroute_web_fetch");
  assert.equal(typeof webFetchTool.description, "string");
  assert.ok(webFetchTool.description.length > 0);
  assert.ok(webFetchTool.inputSchema != null);
  assert.ok(webFetchTool.outputSchema != null);
  assert.equal(typeof webFetchTool.inputSchema.parse, "function");
  assert.deepEqual(webFetchTool.scopes, ["execute:search"]);
  assert.equal(webFetchTool.auditLevel, "basic");
  assert.equal(webFetchTool.phase, 1);
  assert.ok(webFetchTool.sourceEndpoints.includes("/v1/web/fetch"));
});

test("webFetchTool is registered in MCP_TOOLS and MCP_TOOL_MAP", () => {
  const toolNames = MCP_TOOLS.map((t) => t.name);
  assert.ok(
    toolNames.includes("omniroute_web_fetch"),
    "webFetchTool must be in MCP_TOOLS array"
  );
  assert.ok(
    "omniroute_web_fetch" in MCP_TOOL_MAP,
    "webFetchTool must be in MCP_TOOL_MAP"
  );
});

// ── Scope mapping ──

test("omniroute_web_fetch is mapped in MCP_TOOL_SCOPES with execute:search", () => {
  const scopes = MCP_TOOL_SCOPES["omniroute_web_fetch"];
  assert.ok(scopes != null, "omniroute_web_fetch must have a scope mapping");
  assert.ok(
    scopes.includes("execute:search"),
    "omniroute_web_fetch must require execute:search scope"
  );
});

// ── Input schema validation ──

test("webFetchInput accepts a valid minimal request (URL only)", () => {
  const parsed = webFetchInput.parse({ url: "https://example.com" });
  assert.equal(parsed.url, "https://example.com");
  assert.equal(parsed.format, "markdown"); // default
  assert.equal(parsed.include_metadata, false); // default
});

test("webFetchInput accepts all optional fields", () => {
  const parsed = webFetchInput.parse({
    url: "https://example.com",
    provider: "firecrawl",
    format: "html",
    include_metadata: true,
    depth: 1,
    wait_for_selector: "#content",
  });
  assert.equal(parsed.provider, "firecrawl");
  assert.equal(parsed.format, "html");
  assert.equal(parsed.include_metadata, true);
  assert.equal(parsed.depth, 1);
  assert.equal(parsed.wait_for_selector, "#content");
});

test("webFetchInput rejects missing URL", () => {
  assert.throws(
    () => webFetchInput.parse({}),
    /URL is required/,
    "Missing url should fail validation"
  );
});

test("webFetchInput rejects empty URL", () => {
  assert.throws(
    () => webFetchInput.parse({ url: "" }),
    /URL is required/,
    "Empty url should fail validation"
  );
});

test("webFetchInput rejects depth > 2 (matches WebFetchRequest type constraint)", () => {
  assert.throws(
    () => webFetchInput.parse({ url: "https://example.com", depth: 3 }),
    "depth > 2 should fail validation to match the 0 | 1 | 2 type in WebFetchRequest"
  );
});

test("webFetchInput accepts depth values 0, 1, 2", () => {
  for (const depth of [0, 1, 2]) {
    const parsed = webFetchInput.parse({ url: "https://example.com", depth });
    assert.equal(parsed.depth, depth);
  }
});

test("webFetchInput rejects invalid provider", () => {
  assert.throws(
    () => webFetchInput.parse({ url: "https://example.com", provider: "unknown-provider" }),
    "Unknown provider should fail validation"
  );
});

test("webFetchInput rejects invalid format", () => {
  assert.throws(
    () => webFetchInput.parse({ url: "https://example.com", format: "xml" }),
    "Invalid format should fail validation"
  );
});

// ── Output schema validation ──

test("webFetchOutput validates a typical scrape response", () => {
  const result = webFetchOutput.parse({
    provider: "firecrawl",
    url: "https://example.com",
    content: "# Example Domain\n\nThis domain is for use in documentation examples.",
    links: ["https://iana.org/domains/example"],
    metadata: { title: "Example Domain", description: "Example site" },
    screenshot_url: null,
  });
  assert.equal(result.provider, "firecrawl");
  assert.equal(result.links.length, 1);
  assert.equal(result.metadata?.title, "Example Domain");
});

test("webFetchOutput validates a response with null metadata", () => {
  const result = webFetchOutput.parse({
    provider: "jina-reader",
    url: "https://example.com",
    content: "Some content",
    links: [],
    metadata: null,
    screenshot_url: null,
  });
  assert.equal(result.metadata, null);
});
