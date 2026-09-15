import test from "node:test";
import assert from "node:assert/strict";

const { sanitizeGeminiToolName, buildGeminiTools } =
  await import("../../open-sse/translator/helpers/geminiToolsSanitizer.ts");

// ── Gemini tool names must start with a letter or underscore (#13715) ──

const GEMINI_NAME_PATTERN = /^[a-zA-Z_][a-zA-Z0-9_]*$/;

test("sanitizeGeminiToolName: a tool name starting with a digit gets an underscore prefix (#13715)", () => {
  const sanitized = sanitizeGeminiToolName("1c_ssl_mcp_plugin_reload");

  assert.match(
    sanitized,
    GEMINI_NAME_PATTERN,
    "Gemini rejects 'Invalid function name. Must start with a letter or an underscore' for the whole request"
  );
  assert.equal(sanitized, "_1c_ssl_mcp_plugin_reload");
});

test("sanitizeGeminiToolName: an all-digit name is prefixed rather than dropped (#13715)", () => {
  assert.equal(sanitizeGeminiToolName("123"), "_123");
});

test("sanitizeGeminiToolName: already-valid names are untouched (#13715)", () => {
  for (const name of ["bash", "Bash", "read_file", "a1", "MCP_tool"]) {
    assert.equal(sanitizeGeminiToolName(name), name);
  }
});

test("sanitizeGeminiToolName: a digit-led name that also needs character replacement keeps both fixes (#13715)", () => {
  const sanitized = sanitizeGeminiToolName("1c.tool-name");

  assert.match(sanitized, GEMINI_NAME_PATTERN);
  assert.equal(sanitized, "_1c_tool_name");
});

test("sanitizeGeminiToolName: digit-led names stay unique and round-trip through toolNameMap (#13715)", () => {
  const toolNameMap = new Map<string, string>();
  const options = { toolNameMap };

  sanitizeGeminiToolName("1c_ssl_mcp_plugin_reload", options);
  sanitizeGeminiToolName("1c_ssl_mcp_plugin_reload", options);

  assert.equal(toolNameMap.size, 1, "repeat calls reuse the existing mapping");
  assert.equal(toolNameMap.get("_1c_ssl_mcp_plugin_reload"), "1c_ssl_mcp_plugin_reload");
});

test("sanitizeGeminiToolName: the underscore prefix keeps the name inside the 64-char Gemini limit (#13715)", () => {
  const longDigitLed = `1${"a".repeat(63)}`;
  const sanitized = sanitizeGeminiToolName(longDigitLed);

  assert.ok(
    sanitized.length <= 64,
    `Gemini caps function names at 64 chars, got ${sanitized.length}`
  );
  assert.match(sanitized, GEMINI_NAME_PATTERN);
});

test("buildGeminiTools: a digit-led declaration is accepted and mapped back to its original name (#13715)", () => {
  const toolNameMap = new Map<string, string>();
  const tools = buildGeminiTools(
    [
      {
        type: "function",
        function: {
          name: "1c_ssl_mcp_plugin_reload",
          description: "Reload the 1C MCP plugin",
          parameters: { type: "object", properties: {} },
        },
      },
    ],
    { toolNameMap }
  );

  const name = tools?.[0]?.functionDeclarations?.[0]?.name;
  assert.ok(name, "the declaration survives sanitization");
  assert.match(name, GEMINI_NAME_PATTERN);
  assert.equal(toolNameMap.get(name), "1c_ssl_mcp_plugin_reload");
});
