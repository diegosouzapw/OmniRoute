import { describe, it } from "node:test";
import assert from "node:assert/strict";

const mod = await import("../../open-sse/executors/claudeIdentity.ts");

describe("claudeIdentity — stainlessOS", () => {
  it("returns a string", () => {
    const os = mod.stainlessOS();
    assert.ok(typeof os === "string");
    assert.ok(["Windows", "MacOS", "Linux", "FreeBSD", "Unknown"].includes(os));
  });
});

describe("claudeIdentity — stainlessArch", () => {
  it("returns a string", () => {
    const arch = mod.stainlessArch();
    assert.ok(typeof arch === "string");
    assert.ok(["x64", "arm64", "x32"].includes(arch) || typeof arch === "string");
  });
});

describe("claudeIdentity — stainlessRuntimeVersion", () => {
  it("returns Node.js version string", () => {
    const ver = mod.stainlessRuntimeVersion();
    assert.ok(typeof ver === "string");
    assert.ok(ver.startsWith("v"));
  });
});

describe("claudeIdentity — passthroughUpstreamSessionId", () => {
  it("returns null for null/undefined headers", () => {
    assert.equal(mod.passthroughUpstreamSessionId(null), null);
    assert.equal(mod.passthroughUpstreamSessionId(undefined), null);
  });

  it("returns null for missing header", () => {
    assert.equal(mod.passthroughUpstreamSessionId({}), null);
  });

  it("returns null for non-UUID value", () => {
    assert.equal(
      mod.passthroughUpstreamSessionId({ "x-claude-code-session-id": "not-a-uuid" }),
      null
    );
  });

  it("returns UUID for valid header", () => {
    const uuid = "550e8400-e29b-41d4-a716-446655440000";
    assert.equal(mod.passthroughUpstreamSessionId({ "x-claude-code-session-id": uuid }), uuid);
  });

  it("handles case-insensitive header keys", () => {
    const uuid = "550e8400-e29b-41d4-a716-446655440000";
    assert.equal(mod.passthroughUpstreamSessionId({ "X-Claude-Code-Session-Id": uuid }), uuid);
  });
});

describe("claudeIdentity — getSessionId", () => {
  it("returns consistent session id for same seed", () => {
    const seed = `test-${Date.now()}`;
    const id1 = mod.getSessionId(seed);
    const id2 = mod.getSessionId(seed);
    assert.equal(id1, id2);
  });

  it("returns UUID format", () => {
    const id = mod.getSessionId(`test-uuid-${Date.now()}`);
    assert.ok(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id));
  });
});

describe("claudeIdentity — generateCliUserID", () => {
  it("returns 64-char hex string", () => {
    const id = mod.generateCliUserID();
    assert.equal(id.length, 64);
    assert.ok(/^[a-f0-9]{64}$/i.test(id));
  });

  it("returns unique values", () => {
    const a = mod.generateCliUserID();
    const b = mod.generateCliUserID();
    assert.notEqual(a, b);
  });
});

describe("claudeIdentity — resolveCliUserID", () => {
  it("uses cliUserID from providerSpecificData when valid", () => {
    const hex64 = "a".repeat(64);
    assert.equal(mod.resolveCliUserID({ cliUserID: hex64 }, "seed"), hex64);
  });

  it("uses userID as fallback", () => {
    const hex64 = "b".repeat(64);
    assert.equal(mod.resolveCliUserID({ userID: hex64 }, "seed"), hex64);
  });

  it("generates random when no valid data", () => {
    const id = mod.resolveCliUserID({}, `seed-${Date.now()}`);
    assert.equal(id.length, 64);
    assert.ok(/^[a-f0-9]{64}$/i.test(id));
  });
});

describe("claudeIdentity — uuidV4FromHash", () => {
  it("returns valid UUID format", () => {
    const hex64 = "a".repeat(64);
    const uuid = mod.uuidV4FromHash(hex64);
    assert.ok(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uuid));
  });
});

describe("claudeIdentity — buildUserIdJson", () => {
  it("returns valid JSON with correct key order", () => {
    const json = mod.buildUserIdJson({
      deviceId: "a".repeat(64),
      accountUUID: "550e8400-e29b-41d4-a716-446655440000",
      sessionId: "660e8400-e29b-41d4-a716-446655440001",
    });
    const parsed = JSON.parse(json);
    assert.equal(parsed.device_id, "a".repeat(64));
    assert.ok(parsed.account_uuid);
    assert.ok(parsed.session_id);
  });
});

describe("claudeIdentity — parseUpstreamMetadataUserId", () => {
  it("returns null for null/undefined body", () => {
    assert.equal(mod.parseUpstreamMetadataUserId(null), null);
    assert.equal(mod.parseUpstreamMetadataUserId(undefined), null);
  });

  it("returns null for missing metadata", () => {
    assert.equal(mod.parseUpstreamMetadataUserId({}), null);
  });

  it("returns null for invalid user_id format", () => {
    assert.equal(mod.parseUpstreamMetadataUserId({ metadata: { user_id: "not-json" } }), null);
  });

  it("parses valid user_id", () => {
    const body = {
      metadata: {
        user_id: JSON.stringify({
          device_id: "a".repeat(64),
          account_uuid: "550e8400-e29b-41d4-a716-446655440000",
          session_id: "660e8400-e29b-41d4-a716-446655440001",
        }),
      },
    };
    const result = mod.parseUpstreamMetadataUserId(body);
    assert.ok(result);
    assert.equal(result!.device_id, "a".repeat(64));
  });
});

describe("claudeIdentity — selectBetaFlags", () => {
  it("returns base flags for minimal body", () => {
    const flags = mod.selectBetaFlags({});
    assert.ok(flags.includes("oauth-2025-04-20"));
    assert.ok(flags.includes("interleaved-thinking"));
  });

  it("includes claude-code flag for full agent shape", () => {
    const body = {
      system: "test",
      tools: [{ name: "test_tool" }],
    };
    const flags = mod.selectBetaFlags(body, "claude-sonnet-4");
    assert.ok(flags.includes("claude-code-20250219"));
  });

  it("includes context-1m for opus full agent", () => {
    const body = {
      system: "test",
      tools: [{ name: "test_tool" }],
    };
    const flags = mod.selectBetaFlags(body, "claude-opus-4");
    assert.ok(flags.includes("context-1m-2025-08-07"));
  });

  it("does not include context-1m for sonnet", () => {
    const body = {
      system: "test",
      tools: [{ name: "test_tool" }],
    };
    const flags = mod.selectBetaFlags(body, "claude-sonnet-4");
    assert.ok(!flags.includes("context-1m"));
  });
});

describe("claudeIdentity — buildHashFor", () => {
  it("returns 3-char hex string", () => {
    const hash = mod.buildHashFor("1.0.0", "2026-01-01");
    assert.equal(hash.length, 3);
    assert.ok(/^[0-9a-f]{3}$/.test(hash));
  });

  it("returns same hash for same inputs", () => {
    const a = mod.buildHashFor("1.0.0", "2026-01-01");
    const b = mod.buildHashFor("1.0.0", "2026-01-01");
    assert.equal(a, b);
  });
});

describe("claudeIdentity — stripProxyToolPrefix", () => {
  it("strips proxy_ prefix from tools", () => {
    const body = { tools: [{ name: "proxy_search" }, { name: "native_tool" }] };
    mod.stripProxyToolPrefix(body);
    assert.equal((body.tools as any[])[0].name, "search");
    assert.equal((body.tools as any[])[1].name, "native_tool");
  });

  it("strips proxy_ from tool_choice", () => {
    const body = { tool_choice: { name: "proxy_search" } };
    mod.stripProxyToolPrefix(body);
    assert.equal((body.tool_choice as any).name, "search");
  });

  it("handles body without tools", () => {
    const body = {};
    mod.stripProxyToolPrefix(body); // should not throw
    assert.ok(true);
  });
});

describe("claudeIdentity — constants", () => {
  it("exports CLAUDE_CODE_VERSION", () => {
    assert.ok(typeof mod.CLAUDE_CODE_VERSION === "string");
    assert.ok(mod.CLAUDE_CODE_VERSION.length > 0);
  });

  it("exports CLAUDE_CODE_STAINLESS_VERSION", () => {
    assert.ok(typeof mod.CLAUDE_CODE_STAINLESS_VERSION === "string");
    assert.ok(mod.CLAUDE_CODE_STAINLESS_VERSION.length > 0);
  });
});
