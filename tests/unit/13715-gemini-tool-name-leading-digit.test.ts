import test from "node:test";
import assert from "node:assert/strict";

const { buildGeminiTools, sanitizeGeminiToolName } =
  await import("../../open-sse/translator/helpers/geminiToolsSanitizer.ts");
const { buildChangedToolNameMap } =
  await import("../../open-sse/translator/request/openai-to-gemini/helpers.ts");

// ── Gemini rejects a function name that does not start with a letter (#13715) ──
//
// Google validates every `functionDeclarations[].name` against one grammar and
// fails the WHOLE GenerateContentRequest when any single one is invalid, so six
// `1c_*` tools in a 109-tool MCP catalog made every request 400 -- including
// requests that would never call them. The sanitizer removed invalid characters
// and stripped leading underscores, which left a leading DIGIT untouched, and
// stripped away the one prefix a user could have added by hand.

const fn = (name: string) => ({
  type: "function",
  function: { name, description: "probe", parameters: { type: "object", properties: {} } },
});

const declaredNames = (tools: unknown[], toolNameMap: Map<string, string>) =>
  (buildGeminiTools(tools, { toolNameMap }) ?? []).flatMap(
    (tool) => tool.functionDeclarations?.map((declaration) => declaration.name) ?? []
  );

test("#13715 a declared name never starts with a digit", () => {
  const toolNameMap = new Map<string, string>();
  const names = declaredNames(
    [fn("1c_probe"), fn("1c_ssl_mcp_plugin_reload"), fn("123"), fn("_1c_probe")],
    toolNameMap
  );

  for (const name of names) {
    assert.match(name, /^[A-Za-z_]/, `"${name}" must start with a letter or an underscore`);
  }
  assert.deepEqual(names.slice(0, 3), ["t1c_probe", "t1c_ssl_mcp_plugin_reload", "t123"]);
  // `_1c_probe` and `1c_probe` are two different client tools that normalize to
  // the same name, so the fourth is a real collision and the existing hashed
  // path separates them rather than one overwriting the other's mapping.
  assert.notEqual(names[3], names[0]);
  assert.match(names[3]!, /^t1c_probe_/);
});

test("#13715 a leading underscore is not a workaround, because it is stripped first", () => {
  // The measured row from the report: the client sending `_1c_probe` got the
  // same 400, because the strip turned it back into `1c_probe`. It must now
  // reach Google as a letter-first name like every other spelling.
  const toolNameMap = new Map<string, string>();
  assert.equal(sanitizeGeminiToolName("_1c_probe", { toolNameMap }), "t1c_probe");
});

test("#13715 the client's own spelling comes back on the reverse map", () => {
  // The half that makes the rename invisible to the caller: the sanitized name
  // now differs from the client's, so the map carries the original and the
  // response translator restores it when the model calls the tool.
  const toolNameMap = new Map<string, string>();
  sanitizeGeminiToolName("1c_ssl_mcp_plugin_reload", { toolNameMap });

  const reverse = buildChangedToolNameMap(toolNameMap);
  assert.equal(reverse?.get("t1c_ssl_mcp_plugin_reload"), "1c_ssl_mcp_plugin_reload");
});

test("#13715 a name that already starts with a letter is untouched", () => {
  // The accept control. Prefixing unconditionally would rename every tool in
  // every catalog and put the whole fleet through the reverse map for nothing.
  const toolNameMap = new Map<string, string>();
  for (const name of ["c1_probe", "_abc", "Bash", "ssl.probe", "ssl-probe"]) {
    const sanitized = sanitizeGeminiToolName(name, { toolNameMap });
    assert.doesNotMatch(sanitized, /^t(?=[0-9])/, `"${name}" must not gain a prefix`);
  }
  assert.equal(sanitizeGeminiToolName("c1_probe", { toolNameMap: new Map() }), "c1_probe");
});

test("#13715 an over-long digit-first name keeps the guarantee through the hash path", () => {
  // The hashed name is built FROM the normalized one, so a fix applied at the
  // call site instead of inside the normalizer would hold for short names and
  // silently fail for long ones, which is the shape a 109-tool catalog has.
  const toolNameMap = new Map<string, string>();
  const long = `1c_${"x".repeat(80)}`;
  const sanitized = sanitizeGeminiToolName(long, { toolNameMap });

  assert.ok(sanitized.length <= 64, `"${sanitized}" exceeds the 64 character cap`);
  assert.match(sanitized, /^[A-Za-z_]/);
  assert.equal(toolNameMap.get(sanitized), long);
});

test("#13715 two digit-first names that collide still resolve to distinct declarations", () => {
  // The prefix runs before the collision check, so the existing hashed-name path
  // still separates them rather than one tool overwriting the other's mapping.
  const toolNameMap = new Map<string, string>();
  const first = sanitizeGeminiToolName("1c:probe", { toolNameMap, stripNamespace: false });
  const second = sanitizeGeminiToolName("1c_probe", { toolNameMap, stripNamespace: false });

  assert.notEqual(first, second);
  assert.match(first, /^[A-Za-z_]/);
  assert.match(second, /^[A-Za-z_]/);
  assert.equal(toolNameMap.get(first), "1c:probe");
  assert.equal(toolNameMap.get(second), "1c_probe");
});
