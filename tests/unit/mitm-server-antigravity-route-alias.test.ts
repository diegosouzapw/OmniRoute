import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const routeAlias = require("../../src/mitm/_internal/routeAlias.cjs");
const aliasConfigShim = require("../../src/mitm/_internal/aliasConfig.cjs");

test("MITM routing prefers mitmRouteAlias before executor mitmAlias", () => {
  const rows = {
    mitmRouteAlias: JSON.stringify({
      "gemini-3-flash-agent": {
        model: "openai/gpt-route",
        reasoningEffort: " HIGH ",
      },
    }),
    mitmAlias: JSON.stringify({
      "gemini-3-flash-agent": {
        model: "openai/gpt-executor",
        reasoningEffort: "low",
      },
    }),
  };

  const override = routeAlias.resolveMappedOverride("gemini-3-flash-agent", {
    fs: { existsSync: () => false },
    dbFile: "/unused/db.json",
    getSqliteDb: () => ({
      prepare(sql) {
        assert.equal(
          sql,
          "SELECT value FROM key_value WHERE namespace = ? AND key = 'antigravity'"
        );
        return {
          get(namespace) {
            return rows[namespace] ? { value: rows[namespace] } : undefined;
          },
        };
      },
    }),
    aliasConfigShim,
  });

  assert.deepEqual(override, {
    model: "openai/gpt-route",
    reasoningEffort: "high",
  });
});

test("MITM routing falls back to mitmAlias when mitmRouteAlias has no model override", () => {
  const rows = {
    mitmRouteAlias: JSON.stringify({}),
    mitmAlias: JSON.stringify({
      "gemini-3-flash-agent": "openai/gpt-legacy",
    }),
  };

  const override = routeAlias.resolveMappedOverride("gemini-3-flash-agent", {
    fs: { existsSync: () => false },
    dbFile: "/unused/db.json",
    getSqliteDb: () => ({
      prepare() {
        return {
          get(namespace) {
            return rows[namespace] ? { value: rows[namespace] } : undefined;
          },
        };
      },
    }),
    aliasConfigShim,
  });

  assert.deepEqual(override, { model: "openai/gpt-legacy" });
});

test("MITM routing resolves legacy JSON aliases from the route namespace first", () => {
  const legacyDb = {
    mitmRouteAlias: {
      antigravity: {
        "gemini-3-flash-agent": { reasoningEffort: "max" },
      },
    },
    mitmAlias: {
      antigravity: {
        "gemini-3-flash-agent": "openai/gpt-executor",
      },
    },
  };

  const override = routeAlias.resolveMappedOverride("gemini-3-flash-agent", {
    fs: {
      existsSync: () => true,
      readFileSync: () => JSON.stringify(legacyDb),
    },
    dbFile: "/legacy/db.json",
    getSqliteDb: () => null,
    aliasConfigShim,
  });

  assert.deepEqual(override, { reasoningEffort: "xhigh" });
});

test("MITM routing returns null when neither namespace has a usable override", () => {
  const override = routeAlias.resolveMappedOverride("gemini-3-flash-agent", {
    fs: { existsSync: () => false },
    dbFile: "/unused/db.json",
    getSqliteDb: () => null,
    aliasConfigShim,
  });

  assert.equal(override, null);
});
