/**
 * Regression test for #4100 — Home "Update Available" banner no longer appears.
 *
 * Root cause: `GET /api/system/version` derived `latest` ONLY from `npm info` via the
 * `npm` CLI binary, returning null on ANY error (binary missing in Docker/desktop,
 * registry unreachable) → updateAvailable=false → banner silently never renders.
 * Secondary: `isNewer()`'s `v.split(".").map(Number)` collapsed to false on `v`-prefixed
 * or pre-release version strings (NaN comparisons).
 *
 * These assertions fail against the old inline semantics (no module, fragile isNewer,
 * no npm-binary-free fallback) and pass once `src/lib/system/versionCheck.ts` exists.
 */
import test from "node:test";
import assert from "node:assert/strict";
import {
  normalizeVersion,
  isNewer,
  resolveLatestVersion,
  getLatestVersionFromGitHub,
} from "@/lib/system/versionCheck";

test("normalizeVersion strips v-prefix, pre-release/build, returns numeric tuple", () => {
  assert.deepEqual(normalizeVersion("3.8.28"), [3, 8, 28]);
  assert.deepEqual(normalizeVersion("v3.8.28"), [3, 8, 28]);
  assert.deepEqual(normalizeVersion("3.8.28-rc.1"), [3, 8, 28]);
  assert.deepEqual(normalizeVersion("3.8.28+build.5"), [3, 8, 28]);
  assert.equal(normalizeVersion(""), null);
  assert.equal(normalizeVersion("not-a-version"), null);
});

test("isNewer: basic ordering and null safety", () => {
  assert.equal(isNewer("3.8.29", "3.8.28"), true);
  assert.equal(isNewer("3.8.28", "3.8.28"), false);
  assert.equal(isNewer("3.8.27", "3.8.28"), false);
  assert.equal(isNewer(null, "3.8.28"), false);
});

test("isNewer: v-prefixed latest is handled (#4100 — old code returned false via NaN)", () => {
  assert.equal(isNewer("v3.8.29", "3.8.28"), true);
});

test("isNewer: pre-release suffix is handled (#4100 — old code returned false via NaN)", () => {
  assert.equal(isNewer("3.8.29-rc.1", "3.8.28"), true);
});

test("isNewer: multi-digit minor ordering", () => {
  assert.equal(isNewer("3.10.0", "3.9.9"), true);
  assert.equal(isNewer("3.9.9", "3.10.0"), false);
});

test("resolveLatestVersion falls back to the registry when the npm CLI path fails (#4100)", async () => {
  const latest = await resolveLatestVersion({
    npmCli: async () => null, // npm binary missing / registry unreachable via CLI
    registry: async () => "3.8.29", // npm-binary-free HTTP fallback succeeds
  });
  assert.equal(latest, "3.8.29");
});

test("resolveLatestVersion prefers the npm CLI when it succeeds", async () => {
  let registryCalled = false;
  const latest = await resolveLatestVersion({
    npmCli: async () => "3.8.30",
    registry: async () => {
      registryCalled = true;
      return "3.8.29";
    },
  });
  assert.equal(latest, "3.8.30");
  assert.equal(registryCalled, false);
});

test("resolveLatestVersion falls back to GitHub when npm CLI and registry both fail (#4100 — npm blocked, GitHub reachable)", async () => {
  let githubCalled = false;
  const latest = await resolveLatestVersion({
    npmCli: async () => null,
    registry: async () => null,
    github: async () => {
      githubCalled = true;
      return "v3.8.39"; // GitHub releases tag_name — v-prefix tolerated downstream
    },
  });
  assert.equal(latest, "v3.8.39");
  assert.equal(githubCalled, true);
});

test("resolveLatestVersion does NOT hit GitHub when the registry already answered", async () => {
  let githubCalled = false;
  const latest = await resolveLatestVersion({
    npmCli: async () => null,
    registry: async () => "3.8.39",
    github: async () => {
      githubCalled = true;
      return "v3.8.40";
    },
  });
  assert.equal(latest, "3.8.39");
  assert.equal(githubCalled, false);
});

test("resolveLatestVersion returns null only when ALL three sources fail (no silent crash)", async () => {
  const latest = await resolveLatestVersion({
    npmCli: async () => null,
    registry: async () => null,
    github: async () => null,
  });
  assert.equal(latest, null);
});

test("getLatestVersionFromGitHub parses tag_name from the releases API", async () => {
  const fakeFetch = (async () =>
    new Response(JSON.stringify({ tag_name: "v3.8.39" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })) as unknown as typeof fetch;
  assert.equal(await getLatestVersionFromGitHub(fakeFetch), "v3.8.39");
});

test("getLatestVersionFromGitHub returns null on a non-OK response", async () => {
  const fakeFetch = (async () =>
    new Response("rate limited", { status: 403 })) as unknown as typeof fetch;
  assert.equal(await getLatestVersionFromGitHub(fakeFetch), null);
});
