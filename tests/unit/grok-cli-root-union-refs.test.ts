import test from "node:test";
import assert from "node:assert/strict";

const { GrokCliExecutor } = await import("@omniroute/open-sse/executors/grok-cli");

// Grok Build validates every function tool's `parameters` root before sampling and refuses
// the whole request with
//   400 [invalid_client_tool_schema] <tool>: tool parameter root must be an object type
//   (root schema is an anyOf/oneOf union with a non-object branch)
// when a root anyOf/oneOf branch is not an inline object schema. Codex desktop's
// `automation_update` tool declares its modes as `$ref` branches into `$defs`, so every
// request carrying the tool catalog failed on grok-cli.
//
// Probed against Grok Build: `$ref`-only and `{type:"null"}` root branches are refused; a
// root union of inline object branches is accepted, but it only yields correct arguments
// when the root is a bare union — next to a root `type: "object"` Grok emits junk values
// such as `{"id":true,"mode":true}`. Nested `$ref`s (inside properties) resolve fine.

type JsonRecord = Record<string, unknown>;

const DEFS: JsonRecord = {
  __schema0: {
    type: "object",
    properties: { id: { $ref: "#/$defs/__schema1" }, mode: { type: "string", enum: ["view"] } },
    required: ["mode", "id"],
    additionalProperties: false,
  },
  __schema1: { $ref: "#/$defs/__schema2" },
  __schema2: { type: "string" },
  __schema3: {
    type: "object",
    properties: { name: { type: "string" }, mode: { type: "string", enum: ["create"] } },
    required: ["mode", "name"],
    additionalProperties: false,
  },
};

function transformTools(tools: unknown[]): JsonRecord[] {
  const executor = new GrokCliExecutor();
  const out = executor.transformRequest(
    "grok-4.6",
    { model: "grok-4.6", input: [{ role: "user", content: "hi" }], tools },
    true,
    {} as never
  ) as JsonRecord;
  return out.tools as JsonRecord[];
}

function fnTool(name: string, parameters: unknown): JsonRecord {
  return { type: "function", name, description: `${name} tool`, parameters };
}

test("grok-cli inlines $ref branches into a bare root oneOf (Codex desktop automation_update)", () => {
  const parameters = {
    type: "object",
    properties: {},
    oneOf: [{ $ref: "#/$defs/__schema0" }, { $ref: "#/$defs/__schema3" }],
    $defs: DEFS,
  };
  const [tool] = transformTools([fnTool("automation_update", parameters)]);

  // The discriminated union survives: each mode keeps its own enum and required fields.
  // `$defs` stays so the nested `$ref` inside the inlined branch still resolves.
  assert.deepEqual(tool.parameters, { oneOf: [DEFS.__schema0, DEFS.__schema3], $defs: DEFS });
  assert.equal(tool.name, "automation_update");
  assert.equal(tool.description, "automation_update tool");
});

test("grok-cli expands a branch that is itself a union into root object branches", () => {
  // Real automation_update shape: some modes are `$ref`s to another oneOf of `$ref`s.
  const update = {
    type: "object",
    properties: { id: { type: "string" }, mode: { type: "string", enum: ["update"] } },
    required: ["mode", "id"],
  };
  const defs = {
    ...DEFS,
    createModes: { oneOf: [{ $ref: "#/$defs/__schema3" }, { $ref: "#/$defs/draft" }] },
    draft: { type: "object", properties: { mode: { type: "string", enum: ["draft"] } } },
  };
  const parameters = {
    type: "object",
    properties: {},
    oneOf: [
      { $ref: "#/$defs/__schema0" },
      { $ref: "#/$defs/createModes" },
      { anyOf: [update, { type: "null" }] },
    ],
    $defs: defs,
  };
  const [tool] = transformTools([fnTool("automation_update", parameters)]);

  assert.deepEqual(tool.parameters, {
    oneOf: [DEFS.__schema0, DEFS.__schema3, defs.draft, update],
    $defs: defs,
  });
});

test("grok-cli moves shared root properties and required into every branch", () => {
  const view = { type: "object", properties: { mode: { enum: ["view"] } }, required: ["mode"] };
  const create = {
    type: "object",
    properties: { mode: { enum: ["create"] }, workspace: { type: "integer" } },
    required: ["mode", "workspace"],
  };
  const parameters = {
    type: "object",
    description: "Manage an item",
    properties: { workspace: { type: "string" }, dryRun: { type: "boolean" } },
    required: ["workspace"],
    additionalProperties: false,
    anyOf: [view, create],
  };
  const [tool] = transformTools([fnTool("shared", parameters)]);

  assert.deepEqual(tool.parameters, {
    description: "Manage an item",
    anyOf: [
      {
        type: "object",
        properties: {
          workspace: { type: "string" },
          dryRun: { type: "boolean" },
          mode: { enum: ["view"] },
        },
        required: ["workspace", "mode"],
        additionalProperties: false,
      },
      {
        type: "object",
        // The branch's own definition of a shared property wins.
        properties: {
          workspace: { type: "integer" },
          dryRun: { type: "boolean" },
          mode: { enum: ["create"] },
        },
        required: ["workspace", "mode"],
        additionalProperties: false,
      },
    ],
  });
});

test("grok-cli stops expanding a self-referencing union", () => {
  const parameters = {
    oneOf: [DEFS.__schema3, { $ref: "#/$defs/loop" }],
    $defs: { loop: { oneOf: [{ $ref: "#/$defs/loop" }] } },
  };
  const [tool] = transformTools([fnTool("loop", parameters)]);

  assert.deepEqual((tool.parameters as JsonRecord).oneOf, [DEFS.__schema3]);
});

test("grok-cli follows a chain of local $refs and keeps sibling keywords of the branch", () => {
  const parameters = {
    anyOf: [{ $ref: "#/definitions/alias", description: "create mode" }],
    definitions: { alias: { $ref: "#/definitions/create" }, create: DEFS.__schema3 },
  };
  const [tool] = transformTools([fnTool("chained", parameters)]);

  assert.deepEqual((tool.parameters as JsonRecord).anyOf, [
    { ...(DEFS.__schema3 as JsonRecord), description: "create mode" },
  ]);
});

test("grok-cli drops branches that can never be an object argument", () => {
  const parameters = { anyOf: [DEFS.__schema3, { type: "null" }, { type: "string" }] };
  const [tool] = transformTools([fnTool("nullable", parameters)]);

  assert.deepEqual(tool.parameters, { anyOf: [DEFS.__schema3] });
});

test("grok-cli pins typeless and object|null branches to type object", () => {
  const parameters = {
    oneOf: [
      { properties: { a: { type: "string" } }, required: ["a"] },
      { type: ["object", "null"], properties: { b: { type: "number" } } },
    ],
  };
  const [tool] = transformTools([fnTool("typeless", parameters)]);

  assert.deepEqual((tool.parameters as JsonRecord).oneOf, [
    { type: "object", properties: { a: { type: "string" } }, required: ["a"] },
    { type: "object", properties: { b: { type: "number" } } },
  ]);
});

test("grok-cli removes a root union whose branches cannot be resolved (external, missing, cyclic)", () => {
  const parameters = {
    properties: { keep: { type: "string" } },
    required: ["keep"],
    oneOf: [
      { $ref: "https://example.com/schema.json" },
      { $ref: "#/$defs/missing" },
      { $ref: "#/$defs/loopA" },
    ],
    $defs: { loopA: { $ref: "#/$defs/loopB" }, loopB: { $ref: "#/$defs/loopA" } },
  };
  const [tool] = transformTools([fnTool("unresolvable", parameters)]);

  assert.deepEqual(tool.parameters, {
    type: "object",
    properties: { keep: { type: "string" } },
    required: ["keep"],
    $defs: parameters.$defs,
  });
});

test("grok-cli leaves bare unions, nested unions and non-function tools untouched", () => {
  const nested = {
    type: "object",
    properties: { choice: { oneOf: [{ $ref: "#/$defs/__schema2" }, { type: "null" }] } },
    $defs: DEFS,
  };
  const bareUnion = { oneOf: [DEFS.__schema0, DEFS.__schema3], $defs: DEFS };
  const tools = [fnTool("nested", nested), fnTool("bare_union", bareUnion), { type: "web_search" }];
  const snapshot = structuredClone(tools);

  const out = transformTools(tools);

  assert.deepEqual(out, snapshot);
  assert.equal(out[0].parameters, nested, "unchanged schemas keep their identity");
  assert.equal(out[1].parameters, bareUnion, "unchanged schemas keep their identity");
});

test("grok-cli does not mutate the caller's body (combo fallback reuses it)", () => {
  const parameters = {
    type: "object",
    properties: { shared: { type: "string" } },
    oneOf: [{ $ref: "#/$defs/__schema0" }],
    $defs: DEFS,
  };
  const tools = [fnTool("automation_update", parameters)];
  const snapshot = structuredClone(tools);

  transformTools(tools);

  assert.deepEqual(tools, snapshot);
});

test("grok-cli expands shared $ref targets once instead of k^depth times (review)", () => {
  // 6 levels of `oneOf` with 6 `$ref`s each would naively expand to 6^6 root branches.
  const defs: JsonRecord = { leaf: DEFS.__schema3 };
  for (let level = 5; level >= 0; level--) {
    const next = level === 5 ? "leaf" : `L${level + 1}`;
    defs[`L${level}`] = { oneOf: Array.from({ length: 6 }, () => ({ $ref: `#/$defs/${next}` })) };
  }
  const parameters = {
    type: "object",
    properties: {},
    oneOf: [{ $ref: "#/$defs/L0" }],
    $defs: defs,
  };

  const started = Date.now();
  const [tool] = transformTools([fnTool("explosive", parameters)]);

  assert.ok(Date.now() - started < 1000, "normalization must stay cheap");
  assert.deepEqual((tool.parameters as JsonRecord).oneOf, [DEFS.__schema3]);
});

test("grok-cli leaves a union unchanged when it would exceed 64 root branches", () => {
  const defs: JsonRecord = {};
  const branches = Array.from({ length: 65 }, (_, i) => {
    defs[`mode${i}`] = { type: "object", properties: { mode: { enum: [`m${i}`] } } };
    return { $ref: `#/$defs/mode${i}` };
  });
  const parameters = { type: "object", properties: {}, oneOf: branches, $defs: defs };
  const [tool] = transformTools([fnTool("wide", parameters)]);

  assert.equal(tool.parameters, parameters);
});

test("grok-cli expands each $ref target once even when several branches share it", () => {
  const parameters = {
    oneOf: [{ $ref: "#/$defs/modes" }, { $ref: "#/$defs/modes" }],
    $defs: { modes: { oneOf: [{ $ref: "#/$defs/view" }] }, view: DEFS.__schema3 },
  };
  const [tool] = transformTools([fnTool("shared_target", parameters)]);

  assert.deepEqual((tool.parameters as JsonRecord).oneOf, [DEFS.__schema3]);
});

test("grok-cli leaves schemas alone whose refs point outside $defs/definitions", () => {
  // Reshaping removes the root `properties` and re-indexes the union branches, so a ref
  // into either (zod-to-json-schema `$refStrategy: "root"` emits these) would dangle.
  const parameters = {
    type: "object",
    properties: { t: { type: "string" } },
    anyOf: [{ properties: { u: { $ref: "#/properties/t" } } }, { $ref: "#/anyOf/0" }],
  };
  const [tool] = transformTools([fnTool("root_refs", parameters)]);

  assert.equal(tool.parameters, parameters);
});

test("grok-cli combines object keywords next to a $ref with the target's", () => {
  const parameters = {
    oneOf: [
      {
        $ref: "#/$defs/base",
        description: "extended",
        properties: { extra: { type: "string" } },
        required: ["extra"],
      },
    ],
    $defs: {
      base: {
        type: "object",
        description: "base",
        properties: { id: { type: "string" } },
        required: ["id"],
      },
    },
  };
  const [tool] = transformTools([fnTool("siblings", parameters)]);

  assert.deepEqual((tool.parameters as JsonRecord).oneOf, [
    {
      type: "object",
      description: "extended",
      properties: { id: { type: "string" }, extra: { type: "string" } },
      required: ["id", "extra"],
    },
  ]);
});

test("grok-cli carries a root additionalProperties:false into branches that lack one", () => {
  const open = { type: "object", properties: { a: { type: "string" } } };
  const loose = {
    type: "object",
    properties: { b: { type: "string" } },
    additionalProperties: true,
  };
  const parameters = { type: "object", additionalProperties: false, anyOf: [open, loose] };
  const [tool] = transformTools([fnTool("strict", parameters)]);

  assert.deepEqual(tool.parameters, { anyOf: [{ ...open, additionalProperties: false }, loose] });
});

test("grok-cli drops typeless branches that cannot describe an object", () => {
  const parameters = { oneOf: [DEFS.__schema3, { const: "x" }, { enum: [null] }, {}] };
  const [tool] = transformTools([fnTool("consts", parameters)]);

  assert.deepEqual((tool.parameters as JsonRecord).oneOf, [DEFS.__schema3, { type: "object" }]);
});
