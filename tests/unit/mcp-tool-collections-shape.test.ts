import test from "node:test";
import assert from "node:assert/strict";

// The MCP server (open-sse/mcp-server/server.ts) registers the memory, skill,
// and compression tool collections with:
//
//   Object.values(<collection>).forEach((toolDef) => {
//     server.registerTool(toolDef.name, { description, inputSchema }, ...);
//     ... const parsedArgs = toolDef.inputSchema.parse(args ?? {});
//     ... const result = await toolDef.handler(parsedArgs);
//     withScopeEnforcement(toolDef.name, handler, toolDef.scopes);
//   });
//
// The forEach callbacks were previously annotated `(toolDef: any)`, which hid
// the structural contract from the type system. After removing that `any`, the
// loop relies on every entry exposing { name, description, inputSchema.parse,
// handler, scopes }. These tests pin that contract so a future tool entry that
// drops a field fails loudly here instead of breaking MCP registration at
// runtime.

// Dynamic imports for ESM + tsx compatibility (mirrors agentSkillTools-mcp.test.ts)
const { memoryTools } = await import("../../open-sse/mcp-server/tools/memoryTools.ts");
const { skillTools } = await import("../../open-sse/mcp-server/tools/skillTools.ts");
const { compressionTools } = await import("../../open-sse/mcp-server/tools/compressionTools.ts");

type McpToolDef = {
  name: string;
  description: string;
  inputSchema: { parse: (input: unknown) => unknown };
  handler: (...args: unknown[]) => unknown;
  scopes: string[];
};

const COLLECTIONS: Record<string, Record<string, McpToolDef>> = {
  memoryTools: memoryTools as unknown as Record<string, McpToolDef>,
  skillTools: skillTools as unknown as Record<string, McpToolDef>,
  compressionTools: compressionTools as unknown as Record<string, McpToolDef>,
};

for (const [collectionName, collection] of Object.entries(COLLECTIONS)) {
  test(`${collectionName} is a non-empty object of tool definitions`, () => {
    assert.equal(typeof collection, "object");
    assert.ok(collection != null);
    assert.ok(
      Object.keys(collection).length > 0,
      `${collectionName} should expose at least one tool`
    );
  });

  test(`every ${collectionName} entry has the shape the server registration loop requires`, () => {
    for (const toolDef of Object.values(collection)) {
      assert.ok(
        typeof toolDef.name === "string" && toolDef.name.length > 0,
        `${collectionName}: a tool is missing a name`
      );
      assert.ok(
        typeof toolDef.description === "string" && toolDef.description.length > 0,
        `${toolDef.name}: description missing`
      );
      // inputSchema must be a zod-like schema — the loop calls .parse(args ?? {})
      assert.ok(toolDef.inputSchema != null, `${toolDef.name}: inputSchema missing`);
      assert.equal(
        typeof toolDef.inputSchema.parse,
        "function",
        `${toolDef.name}: inputSchema.parse must be callable`
      );
      // handler must be callable — the loop awaits toolDef.handler(parsedArgs)
      assert.equal(typeof toolDef.handler, "function", `${toolDef.name}: handler must be a function`);
      // scopes feeds the 3-arg withScopeEnforcement(name, handler, scopes)
      assert.ok(
        Array.isArray(toolDef.scopes) && toolDef.scopes.length > 0,
        `${toolDef.name}: scopes must be a non-empty array`
      );
      assert.ok(
        toolDef.scopes.every((scope) => typeof scope === "string" && scope.length > 0),
        `${toolDef.name}: every scope must be a non-empty string`
      );
    }
  });

  test(`every ${collectionName} entry name matches its map key`, () => {
    for (const [key, toolDef] of Object.entries(collection)) {
      assert.equal(
        toolDef.name,
        key,
        `${collectionName}: map key "${key}" must equal tool name "${toolDef.name}"`
      );
    }
  });
}
