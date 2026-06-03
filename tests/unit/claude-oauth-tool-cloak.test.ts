/**
 * Native Claude OAuth tool cloak + schema sanitizer.
 *
 * Anthropic's first-party Messages API rejects native-Claude-OAuth requests
 * that carry (a) invalid tool input_schemas (truncation placeholders / non-array
 * keywords) or (b) tool names it fingerprints as a third-party agent harness —
 * both surfaced as a misleading `400 out of extra usage` placeholder. These
 * tests cover the request-side sanitizer + name cloak; the response side is
 * reversed via the existing per-request _toolNameMap.
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  cloakThirdPartyToolNames,
  needsThirdPartyCloak,
} from "../../open-sse/services/claudeCodeToolRemapper.ts";
import {
  sanitizeClaudeToolSchema,
  sanitizeClaudeToolSchemas,
} from "../../open-sse/translator/helpers/schemaCoercion.ts";

type AnyRecord = Record<string, unknown>;
const schemaOf = (tools: unknown, i = 0): AnyRecord =>
  ((tools as AnyRecord[])[i].input_schema as AnyRecord);

describe("sanitizeClaudeToolSchemas", () => {
  it("drops a non-array enum placeholder", () => {
    const tools = [
      { name: "x", input_schema: { type: "object", properties: { m: { type: "string", enum: "[MaxDepth]" } } } },
    ];
    const props = (schemaOf(sanitizeClaudeToolSchemas(tools)).properties as AnyRecord).m as AnyRecord;
    assert.equal("enum" in props, false);
  });

  it("coerces an index-keyed object enum into an array", () => {
    const s = sanitizeClaudeToolSchema({
      type: "object",
      properties: { a: { type: "string", enum: { "0": "x", "1": "y" } } },
    }) as AnyRecord;
    assert.deepEqual(((s.properties as AnyRecord).a as AnyRecord).enum, ["x", "y"]);
  });

  it("replaces a placeholder property value with a permissive schema", () => {
    const s = sanitizeClaudeToolSchema({ type: "object", properties: { a: "[MaxDepth]" } }) as AnyRecord;
    assert.deepEqual((s.properties as AnyRecord).a, {});
  });

  it("leaves a valid schema intact", () => {
    const input = { type: "object", properties: { a: { type: "string" } }, required: ["a"] };
    assert.deepEqual(sanitizeClaudeToolSchema(input), input);
  });
});

describe("cloakThirdPartyToolNames", () => {
  it("aliases a blacklisted name and tracks the reverse map", () => {
    const body: AnyRecord = { tools: [{ name: "mixture_of_agents" }] };
    cloakThirdPartyToolNames(body);
    assert.equal((body.tools as AnyRecord[])[0].name, "MixtureOfAgents");
    assert.equal((body._toolNameMap as Map<string, string>).get("MixtureOfAgents"), "mixture_of_agents");
  });

  it("maps known harness names to Claude Code canonical names", () => {
    const body: AnyRecord = { tools: [{ name: "read_file" }, { name: "write_file" }, { name: "terminal" }] };
    cloakThirdPartyToolNames(body);
    assert.deepEqual((body.tools as AnyRecord[]).map((t) => t.name), ["Read", "Write", "Bash"]);
  });

  it("PascalCases unmapped snake_case names", () => {
    const body: AnyRecord = { tools: [{ name: "honcho_profile" }, { name: "lcm_expand_query" }] };
    cloakThirdPartyToolNames(body);
    assert.deepEqual((body.tools as AnyRecord[]).map((t) => t.name), ["HonchoProfile", "LcmExpandQuery"]);
  });

  it("leaves genuine Claude Code tool names untouched", () => {
    const body: AnyRecord = { tools: [{ name: "Bash" }, { name: "Read" }, { name: "TodoWrite" }] };
    cloakThirdPartyToolNames(body);
    assert.deepEqual((body.tools as AnyRecord[]).map((t) => t.name), ["Bash", "Read", "TodoWrite"]);
    assert.equal((body._toolNameMap as Map<string, string> | undefined)?.size ?? 0, 0);
  });

  it("dedupes canonical-name collisions", () => {
    const body: AnyRecord = { tools: [{ name: "search_files" }, { name: "grep_search" }] };
    cloakThirdPartyToolNames(body);
    assert.deepEqual((body.tools as AnyRecord[]).map((t) => t.name), ["Grep", "Grep2"]);
  });

  it("remaps tool_use blocks in message history consistently", () => {
    const body: AnyRecord = {
      tools: [{ name: "mixture_of_agents" }],
      messages: [{ role: "assistant", content: [{ type: "tool_use", name: "mixture_of_agents" }] }],
    };
    cloakThirdPartyToolNames(body);
    const block = ((body.messages as AnyRecord[])[0].content as AnyRecord[])[0];
    assert.equal(block.name, "MixtureOfAgents");
  });

  it("does not leak _toolNameMap into the serialized request body", () => {
    const body: AnyRecord = { tools: [{ name: "mixture_of_agents" }] };
    cloakThirdPartyToolNames(body);
    assert.equal(JSON.stringify(body).includes("_toolNameMap"), false);
  });

  it("needsThirdPartyCloak only flags non-Claude-Code names", () => {
    assert.equal(needsThirdPartyCloak("Bash"), false);
    assert.equal(needsThirdPartyCloak("TodoWrite"), false);
    assert.equal(needsThirdPartyCloak("read_file"), true);
    assert.equal(needsThirdPartyCloak("mixture_of_agents"), true);
  });
});

describe("sanitizeClaudeToolSchemas — boolean schema preservation", () => {
  it("preserves additionalProperties: false (canonical lock-down)", () => {
    const s = sanitizeClaudeToolSchema({
      type: "object",
      properties: { a: { type: "string" } },
      additionalProperties: false,
    }) as AnyRecord;
    assert.equal(s.additionalProperties, false);
  });

  it("preserves additionalProperties: true", () => {
    const s = sanitizeClaudeToolSchema({
      type: "object",
      additionalProperties: true,
    }) as AnyRecord;
    assert.equal(s.additionalProperties, true);
  });

  it("preserves boolean property schemas under properties", () => {
    const s = sanitizeClaudeToolSchema({
      type: "object",
      properties: { allowed: true, denied: false },
    }) as AnyRecord;
    const props = s.properties as AnyRecord;
    assert.equal(props.allowed, true);
    assert.equal(props.denied, false);
  });

  it("preserves boolean unevaluatedProperties", () => {
    const s = sanitizeClaudeToolSchema({
      type: "object",
      unevaluatedProperties: false,
    }) as AnyRecord;
    assert.equal(s.unevaluatedProperties, false);
  });

  it("still replaces a placeholder string in a slot key with permissive {}", () => {
    const s = sanitizeClaudeToolSchema({
      type: "object",
      additionalProperties: "[MaxDepth]",
    }) as AnyRecord;
    assert.deepEqual(s.additionalProperties, {});
  });
});

describe("cloakThirdPartyToolNames — defensive null guards", () => {
  it("tolerates null/undefined entries in tools[]", () => {
    const body: AnyRecord = {
      tools: [null, { name: "read_file" }, undefined, { name: "Bash" }],
    };
    cloakThirdPartyToolNames(body);
    const names = (body.tools as Array<AnyRecord | null | undefined>).map((t) => t?.name);
    assert.deepEqual(names, [undefined, "Read", undefined, "Bash"]);
  });

  it("tolerates null/undefined entries in messages[]", () => {
    const body: AnyRecord = {
      tools: [{ name: "read_file" }],
      messages: [
        null,
        { role: "assistant", content: [{ type: "tool_use", name: "read_file" }] },
        undefined,
      ],
    };
    cloakThirdPartyToolNames(body);
    const block = (
      (body.messages as Array<AnyRecord>)[1].content as Array<AnyRecord>
    )[0];
    assert.equal(block.name, "Read");
  });
});

describe("cloakThirdPartyToolNames — non-mutating + skip option", () => {
  it("does not mutate the caller's input tool objects", () => {
    const original: AnyRecord = { name: "read_file" };
    const body: AnyRecord = { tools: [original] };
    cloakThirdPartyToolNames(body);
    assert.equal(original.name, "read_file"); // input object untouched
    assert.equal((body.tools as AnyRecord[])[0].name, "Read"); // body.tools reassigned with a clone
  });

  it("does not mutate the caller's input message blocks", () => {
    const block: AnyRecord = { type: "tool_use", name: "read_file" };
    const body: AnyRecord = {
      tools: [{ name: "read_file" }],
      messages: [{ role: "assistant", content: [block] }],
    };
    cloakThirdPartyToolNames(body);
    assert.equal(block.name, "read_file"); // input block untouched
    const out = ((body.messages as AnyRecord[])[0].content as AnyRecord[])[0];
    assert.equal(out.name, "Read");
  });

  it("leaves names matched by the skip predicate untouched", () => {
    const body: AnyRecord = { tools: [{ name: "mcp_call" }, { name: "read_file" }] };
    cloakThirdPartyToolNames(body, { skip: (n) => n.startsWith("mcp_") });
    assert.deepEqual((body.tools as AnyRecord[]).map((t) => t.name), ["mcp_call", "Read"]);
  });
});

describe("review fixes — schema sanitizer scalar / default / numeric", () => {
  it("keeps a placeholder in a scalar annotation keyword as a scalar (not {})", () => {
    const s = sanitizeClaudeToolSchema({
      type: "object",
      description: "[Object]",
      properties: { a: { type: "string", description: "[Truncated]" } },
    }) as AnyRecord;
    assert.equal(s.description, "[Object]");
    assert.equal(((s.properties as AnyRecord).a as AnyRecord).description, "[Truncated]");
  });

  it("preserves the valid `default` keyword on the Claude path", () => {
    const s = sanitizeClaudeToolSchema({
      type: "object",
      properties: { mode: { type: "string", default: "replace" }, all: { type: "boolean", default: false } },
    }) as AnyRecord;
    const p = s.properties as AnyRecord;
    assert.equal((p.mode as AnyRecord).default, "replace");
    assert.equal((p.all as AnyRecord).default, false);
  });

  it("coerces numeric-string constraints inside contains (not only items)", () => {
    const s = sanitizeClaudeToolSchema({
      type: "array",
      contains: { type: "object", properties: { n: { type: "integer", minimum: "5" } } },
    }) as AnyRecord;
    const n = ((s.contains as AnyRecord).properties as AnyRecord).n as AnyRecord;
    assert.equal(n.minimum, 5);
  });

  it("still coerces a placeholder to {} in a real subschema slot", () => {
    const s = sanitizeClaudeToolSchema({ type: "object", additionalProperties: "[MaxDepth]" }) as AnyRecord;
    assert.deepEqual(s.additionalProperties, {});
  });
});

describe("review fixes — established aliases + kill-switch", () => {
  it("uses the established Claude Code aliases on the cloak path", () => {
    const body: AnyRecord = {
      tools: [{ name: "subagents" }, { name: "session_status" }, { name: "webfetch" }, { name: "todowrite" }],
    };
    cloakThirdPartyToolNames(body);
    assert.deepEqual(
      (body.tools as AnyRecord[]).map((t) => t.name),
      ["SubDispatch", "CheckStatus", "WebFetch", "TodoWrite"]
    );
  });

  it("CLAUDE_DISABLE_TOOL_NAME_CLOAK=true disables the cloak at the function level", () => {
    const prev = process.env.CLAUDE_DISABLE_TOOL_NAME_CLOAK;
    process.env.CLAUDE_DISABLE_TOOL_NAME_CLOAK = "true";
    try {
      const body: AnyRecord = { tools: [{ name: "mixture_of_agents" }] };
      const map = cloakThirdPartyToolNames(body);
      assert.equal((body.tools as AnyRecord[])[0].name, "mixture_of_agents");
      assert.equal(map.size, 0);
    } finally {
      if (prev === undefined) delete process.env.CLAUDE_DISABLE_TOOL_NAME_CLOAK;
      else process.env.CLAUDE_DISABLE_TOOL_NAME_CLOAK = prev;
    }
  });
});
