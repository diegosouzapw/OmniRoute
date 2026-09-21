/**
 * #12137 — explicit GitHub combo members vs live synced catalog.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { catalogContainsModel } from "../../src/lib/db/models/activeSyncedCatalog.ts";
import {
  comboCheckProvider,
  ghComboGate,
} from "../../src/sse/handlers/chat/githubLiveCatalogFilter.ts";

test("fail-open when the GitHub catalog is not authoritative yet", () => {
  assert.equal(
    catalogContainsModel(
      {
        authoritative: false,
        models: [{ id: "claude-sonnet-5", name: "Claude Sonnet 5", source: "imported" }],
      },
      "claude-sonnet-5"
    ),
    null
  );
});

test("rejects explicit members missing from an authoritative GitHub catalog", () => {
  assert.equal(
    catalogContainsModel(
      {
        authoritative: true,
        models: [{ id: "claude-sonnet-5", name: "Claude Sonnet 5", source: "imported" }],
      },
      "github/claude-fable-5"
    ),
    false
  );
});

test("accepts prefixed and bare ids that are in the live catalog", () => {
  const catalog = {
    authoritative: true,
    models: [{ id: "claude-sonnet-5", name: "Claude Sonnet 5", source: "imported" }],
  };
  assert.equal(catalogContainsModel(catalog, "claude-sonnet-5"), true);
  assert.equal(catalogContainsModel(catalog, "github/claude-sonnet-5"), true);
});

test("comboCheckProvider applies the prefix-override guard", () => {
  assert.equal(comboCheckProvider("github/claude-sonnet-5", { provider: "github" }), "github");
  assert.equal(
    comboCheckProvider("github/claude-sonnet-5", { provider: "github" }, "github"),
    "github"
  );
  assert.equal(
    comboCheckProvider("xiaomi/mimo-v2-flash", { provider: "xiaomi" }, "opengate"),
    "opengate"
  );
  assert.equal(comboCheckProvider("gh/claude-sonnet-5", { provider: "github" }, "gh"), "github");
});

test("ghComboGate allows undetermined providers and fail-opens unsynced catalogs", async () => {
  const scope = {};
  const unsynced = async () => ({
    authoritative: false,
    models: [{ id: "claude-sonnet-5", name: "Claude Sonnet 5", source: "imported" as const }],
  });
  assert.equal(await ghComboGate(scope, "", "claude-sonnet-5", unsynced), true);
  assert.equal(await ghComboGate(scope, "openai", "gpt-4", unsynced), null);
  assert.equal(await ghComboGate(scope, "github", "claude-sonnet-5", unsynced), null);
});

test("ghComboGate skips GitHub members missing from an authoritative catalog", async () => {
  const scope = {};
  let loads = 0;
  const load = async () => {
    loads += 1;
    return {
      authoritative: true,
      models: [{ id: "claude-sonnet-5", name: "Claude Sonnet 5", source: "imported" as const }],
    };
  };
  assert.equal(await ghComboGate(scope, "github", "claude-fable-5", load), false);
  assert.equal(await ghComboGate(scope, "github", "claude-sonnet-5", load), null);
  assert.equal(await ghComboGate(scope, "github", "github/claude-sonnet-5", load), null);
  assert.equal(loads, 1, "catalog fetch is memoized per request scope");
  assert.equal(await ghComboGate({}, "gh", "claude-fable-5", load), false);
});
