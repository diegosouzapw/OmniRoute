/**
 * Guard for the macOS updater manifest merge (gap 31) — a bug that is LIVE in v3.8.48:
 * an Intel Mac downloads the ARM dmg.
 *
 * electron-builder runs once per macOS job and each run emits its own `latest-mac.yml` listing
 * only its own dmg — measured at 338 and 350 bytes, different content, identical filename.
 * `actions/download-artifact` with `merge-multiple: true` resolves that collision by ARRIVAL
 * ORDER, so one silently overwrites the other; arm64 won in the published v3.8.48.
 *
 * Why that breaks Intel, from electron-updater's own code
 * (electron-updater/out/providers/Provider.js):
 *
 *     files.find(it => [...].some(n => n.includes(process.arch))) ?? files.shift()
 *
 * The Intel dmg is `OmniRoute-X.Y.Z.dmg` — no arch suffix. On Intel `process.arch` is `"x64"`,
 * nothing matches, and the fallback takes the FIRST entry.
 *
 * So ORDER is the fix, not tidiness, and that is what most of these tests pin: the un-suffixed
 * entry must be first, because it is the only one reachable through that fallback.
 */
import test from "node:test";
import assert from "node:assert/strict";

// @ts-expect-error — plain .mjs release script, no type declarations by design
import {
  hasArchSuffix,
  mergeManifests,
  parseManifest,
  renderManifest,
} from "../../scripts/release/merge-mac-update-manifest.mjs";

// Verbatim shape of what the two jobs produced for v3.8.49.
const INTEL = `version: 3.8.49
files:
  - url: OmniRoute-3.8.49.dmg
    sha512: FSRnh09fSyOSeB7VXXe==
    size: 392717602
path: OmniRoute-3.8.49.dmg
sha512: FSRnh09fSyOSeB7VXXe==
releaseDate: '2026-07-30T01:07:13.268Z'
`;

const ARM = `version: 3.8.49
files:
  - url: OmniRoute-3.8.49-arm64.dmg
    sha512: 2eVsFVsY0JiCKgNkNYg==
    size: 390627465
path: OmniRoute-3.8.49-arm64.dmg
sha512: 2eVsFVsY0JiCKgNkNYg==
releaseDate: '2026-07-30T01:22:47.282Z'
`;

test("parses electron-builder's manifest shape", () => {
  const m = parseManifest(INTEL);
  assert.equal(m.version, "3.8.49");
  assert.equal(m.files.length, 1);
  assert.equal(m.files[0].url, "OmniRoute-3.8.49.dmg");
  assert.equal(m.files[0].size, "392717602");
  assert.equal(m.path, "OmniRoute-3.8.49.dmg");
  assert.match(m.releaseDate, /^2026-07-30T01:07/);
});

test("the un-suffixed (Intel) entry is FIRST — this is the entire fix", () => {
  // Fed in the order that lost in production: arm64 first.
  const merged = mergeManifests([parseManifest(ARM), parseManifest(INTEL)]);
  assert.equal(merged.files.length, 2);
  assert.equal(
    merged.files[0].url,
    "OmniRoute-3.8.49.dmg",
    "electron-updater's `?? shift()` fallback takes files[0]; only the un-suffixed build " +
      "depends on it, so it must be there"
  );
  assert.equal(merged.files[1].url, "OmniRoute-3.8.49-arm64.dmg");
});

test("order is stable regardless of input order", () => {
  const a = mergeManifests([parseManifest(INTEL), parseManifest(ARM)]);
  const b = mergeManifests([parseManifest(ARM), parseManifest(INTEL)]);
  assert.deepEqual(
    a.files.map((f: { url: string }) => f.url),
    b.files.map((f: { url: string }) => f.url),
    "arrival order is exactly what broke v3.8.48 — the merge must not inherit it"
  );
});

test("the legacy top-level fields agree with the first entry", () => {
  // Older clients read `path`/`sha512` instead of `files[]`; disagreement sends them to the
  // wrong download.
  const merged = mergeManifests([parseManifest(ARM), parseManifest(INTEL)]);
  assert.equal(merged.path, merged.files[0].url);
  assert.equal(merged.sha512, merged.files[0].sha512);
});

test("checksums and sizes travel untouched", () => {
  const merged = mergeManifests([parseManifest(INTEL), parseManifest(ARM)]);
  const byUrl = Object.fromEntries(merged.files.map((f: { url: string }) => [f.url, f]));
  assert.equal(byUrl["OmniRoute-3.8.49.dmg"].sha512, "FSRnh09fSyOSeB7VXXe==");
  assert.equal(byUrl["OmniRoute-3.8.49-arm64.dmg"].size, "390627465");
});

test("the newest releaseDate wins", () => {
  const merged = mergeManifests([parseManifest(INTEL), parseManifest(ARM)]);
  assert.match(merged.releaseDate, /01:22:47/, "arm64 built later");
});

test("duplicate URLs collapse", () => {
  const merged = mergeManifests([parseManifest(INTEL), parseManifest(INTEL)]);
  assert.equal(merged.files.length, 1);
});

test("mixed-version inputs are refused, not merged", () => {
  // Artifacts from two different builds in one release-assets dir means something is wrong
  // upstream; a manifest stitched from both would point at files that were never published
  // together.
  const merged = mergeManifests([parseManifest(INTEL), parseManifest(ARM.replace("3.8.49", "3.8.48"))]);
  assert.ok(merged.versionConflict, "the caller must be able to refuse");
  assert.deepEqual(merged.versionConflict.sort(), ["3.8.48", "3.8.49"]);
});

test("no usable input yields null rather than an empty manifest", () => {
  assert.equal(mergeManifests([]), null);
  assert.equal(mergeManifests([{ files: [] }]), null);
  assert.equal(mergeManifests(undefined), null);
});

test("hasArchSuffix recognizes only real arch markers", () => {
  assert.equal(hasArchSuffix("OmniRoute-3.8.49-arm64.dmg"), true);
  assert.equal(hasArchSuffix("OmniRoute-3.8.49-x64.dmg"), true);
  assert.equal(hasArchSuffix("OmniRoute-3.8.49-universal.dmg"), true);
  assert.equal(hasArchSuffix("OmniRoute-3.8.49.dmg"), false);
  // "arm64" must be a suffix segment, not any substring of the name.
  assert.equal(hasArchSuffix("OmniRoute-arm64beta-3.8.49.dmg"), false);
});

test("the rendered manifest round-trips", () => {
  const merged = mergeManifests([parseManifest(ARM), parseManifest(INTEL)]);
  const reparsed = parseManifest(renderManifest(merged));
  assert.equal(reparsed.files.length, 2);
  assert.equal(reparsed.files[0].url, "OmniRoute-3.8.49.dmg", "order survives serialization");
  assert.equal(reparsed.version, "3.8.49");
  assert.equal(reparsed.path, "OmniRoute-3.8.49.dmg");
});
