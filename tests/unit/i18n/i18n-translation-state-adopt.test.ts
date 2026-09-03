/**
 * `adoptState` (scripts/i18n/lib/translation-state.mjs) rebuilds the
 * `.i18n-state.json` document from what is already on disk — hashing sources
 * and existing mirrors, never calling a translation backend — so incremental
 * drift detection (`npm run i18n:check`) can be re-bootstrapped after the state
 * file was lost. `mergeAdoptedState` folds such a run into an existing state so
 * a filtered `--adopt --locale=… / --files=…` never discards the entries it did
 * not touch. `run-translation.mjs --adopt` is a thin wrapper around both.
 * `refreshTargetHashes` is the narrower `--adopt --targets-only` operation: it
 * re-hashes the mirrors on disk while keeping every `source_hash`, so a
 * mechanical mirror rewrite stops reading as `target changed` without masking
 * the genuine source drift `i18n:check` must still report.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import {
  adoptState,
  mergeAdoptedState,
  refreshTargetHashes,
} from "../../../scripts/i18n/lib/translation-state.mjs";

type LocaleState = { source_hash: string; target_hash: string; updated_at: string };
type SourceState = { source_hash: string; locales: Record<string, LocaleState> };
type AdoptedState = { sources: Record<string, SourceState> };

const RUN_TRANSLATION = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../../scripts/i18n/run-translation.mjs"
);

const sha = (s: string) => createHash("sha256").update(s).digest("hex");

async function withTempRoot(fn: (root: string) => Promise<void>): Promise<void> {
  const root = mkdtempSync(path.join(tmpdir(), "i18n-adopt-"));
  try {
    await fn(root);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

const mirrorPathFor = (root: string) => (rel: string, locale: string) =>
  path.join(root, "docs", "i18n", locale, rel);

test("adoptState hashes every existing source/target pair and skips missing targets", async () => {
  await withTempRoot(async (root) => {
    writeFileSync(path.join(root, "README.md"), "# A\n");
    mkdirSync(path.join(root, "docs", "i18n", "es"), { recursive: true });
    writeFileSync(path.join(root, "docs", "i18n", "es", "README.md"), "# A (Español)\n");

    const state = (await adoptState({
      root,
      sources: ["README.md"],
      locales: ["es", "de"],
      targetPathFor: mirrorPathFor(root),
    })) as AdoptedState;

    assert.equal(state.sources["README.md"].source_hash, sha("# A\n"));
    assert.equal(state.sources["README.md"].locales.es.target_hash, sha("# A (Español)\n"));
    assert.equal(state.sources["README.md"].locales.es.source_hash, sha("# A\n"));
    assert.equal(state.sources["README.md"].locales.de, undefined);
  });
});

test("adoptState records every source (nested paths too), keeps `locales` empty without mirrors, and stamps one ISO timestamp per run", async () => {
  await withTempRoot(async (root) => {
    mkdirSync(path.join(root, "docs", "guides"), { recursive: true });
    writeFileSync(path.join(root, "README.md"), "# A\n");
    writeFileSync(path.join(root, "docs", "guides", "GUIDE.md"), "# Guide\n");
    for (const locale of ["fr", "de"]) {
      mkdirSync(path.join(root, "docs", "i18n", locale, "docs", "guides"), { recursive: true });
      writeFileSync(
        path.join(root, "docs", "i18n", locale, "docs", "guides", "GUIDE.md"),
        `# Guide (${locale})\n`
      );
    }

    const asked: string[] = [];
    const before = Date.now();
    const state = (await adoptState({
      root,
      sources: ["README.md", "docs/guides/GUIDE.md"],
      locales: ["fr", "de"],
      targetPathFor: (rel: string, locale: string) => {
        asked.push(`${rel} → ${locale}`);
        return mirrorPathFor(root)(rel, locale);
      },
    })) as AdoptedState;

    assert.deepEqual(Object.keys(state.sources), ["README.md", "docs/guides/GUIDE.md"]);
    // A source without any mirror on disk is still recorded, with nothing adopted.
    assert.deepEqual(state.sources["README.md"], { source_hash: sha("# A\n"), locales: {} });

    const guide = state.sources["docs/guides/GUIDE.md"];
    assert.equal(guide.source_hash, sha("# Guide\n"));
    assert.deepEqual(Object.keys(guide.locales), ["fr", "de"]);
    assert.equal(guide.locales.fr.source_hash, sha("# Guide\n"));
    assert.equal(guide.locales.fr.target_hash, sha("# Guide (fr)\n"));
    assert.equal(guide.locales.de.target_hash, sha("# Guide (de)\n"));

    const stamp = Date.parse(guide.locales.fr.updated_at);
    assert.equal(new Date(stamp).toISOString(), guide.locales.fr.updated_at);
    assert.ok(stamp >= before && stamp <= Date.now(), "updated_at is the adoption time");
    // All entries of one adopt run share a single `updated_at`.
    assert.equal(guide.locales.de.updated_at, guide.locales.fr.updated_at);

    // Every (source, locale) pair is resolved through the caller's path mapper.
    assert.deepEqual(asked, [
      "README.md → fr",
      "README.md → de",
      "docs/guides/GUIDE.md → fr",
      "docs/guides/GUIDE.md → de",
    ]);
  });
});

test("adoptState stamps every adopted entry with the single `now` of the run", async () => {
  await withTempRoot(async (root) => {
    writeFileSync(path.join(root, "A.md"), "# A\n");
    writeFileSync(path.join(root, "B.md"), "# B\n");
    for (const locale of ["es", "fr"]) {
      mkdirSync(path.join(root, "docs", "i18n", locale), { recursive: true });
      writeFileSync(path.join(root, "docs", "i18n", locale, "A.md"), `# A (${locale})\n`);
      writeFileSync(path.join(root, "docs", "i18n", locale, "B.md"), `# B (${locale})\n`);
    }

    const now = "2026-09-02T12:00:00.000Z";
    const state = (await adoptState({
      root,
      sources: ["A.md", "B.md"],
      locales: ["es", "fr"],
      targetPathFor: mirrorPathFor(root),
      now,
    })) as AdoptedState;

    const stamps = Object.values(state.sources).flatMap((source) =>
      Object.values(source.locales).map((info) => info.updated_at)
    );
    assert.equal(stamps.length, 4);
    assert.deepEqual([...new Set(stamps)], [now]);
  });
});

test("adoptState rejects instead of silently skipping a listed source that is missing on disk", async () => {
  await withTempRoot(async (root) => {
    await assert.rejects(
      adoptState({
        root,
        sources: ["MISSING.md"],
        locales: ["es"],
        targetPathFor: mirrorPathFor(root),
      }),
      { code: "ENOENT" }
    );
  });
});

// ----- mergeAdoptedState ---------------------------------------------------

const OLD = "2026-01-01T00:00:00.000Z";
const NEW = "2026-09-02T00:00:00.000Z";

const entry = (source: string, target: string, updated_at: string): LocaleState => ({
  source_hash: sha(source),
  target_hash: sha(target),
  updated_at,
});

// Two sources × two locales, the shape a full adopt run leaves behind.
const twoByTwo = (): AdoptedState => ({
  sources: {
    "README.md": {
      source_hash: sha("# A\n"),
      locales: {
        es: entry("# A\n", "# A (es)\n", OLD),
        de: entry("# A\n", "# A (de)\n", OLD),
      },
    },
    "docs/GUIDE.md": {
      source_hash: sha("# G\n"),
      locales: {
        es: entry("# G\n", "# G (es)\n", OLD),
        de: entry("# G\n", "# G (de)\n", OLD),
      },
    },
  },
});

test("mergeAdoptedState keeps the three entries a filtered adopt did not touch and replaces the adopted one", () => {
  const existing = twoByTwo();
  // `--adopt --files=README.md --locale=es` after README.md changed on disk.
  const adopted: AdoptedState = {
    sources: {
      "README.md": {
        source_hash: sha("# A v2\n"),
        locales: { es: entry("# A v2\n", "# A v2 (es)\n", NEW) },
      },
    },
  };
  const existingSnapshot = structuredClone(existing);
  const adoptedSnapshot = structuredClone(adopted);

  const merged = mergeAdoptedState(existing, adopted) as AdoptedState;

  // The adopted pair is replaced and its source hash refreshed…
  assert.equal(merged.sources["README.md"].source_hash, sha("# A v2\n"));
  assert.deepEqual(merged.sources["README.md"].locales.es, adopted.sources["README.md"].locales.es);
  // …while the three untouched entries survive as recorded. The stale per-locale
  // `source_hash` of README.md/de is exactly what makes `i18n:run` still
  // retranslate it later — a merge must not "adopt" what it did not hash.
  assert.deepEqual(
    merged.sources["README.md"].locales.de,
    existing.sources["README.md"].locales.de
  );
  assert.deepEqual(merged.sources["docs/GUIDE.md"], existing.sources["docs/GUIDE.md"]);
  assert.deepEqual(Object.keys(merged.sources), ["README.md", "docs/GUIDE.md"]);
  assert.deepEqual(Object.keys(merged.sources["README.md"].locales), ["es", "de"]);

  // Pure: neither input is mutated, and the result does not alias them.
  assert.deepEqual(existing, existingSnapshot);
  assert.deepEqual(adopted, adoptedSnapshot);
  merged.sources["docs/GUIDE.md"].locales.de.updated_at = "mutated";
  merged.sources["README.md"].locales.es.updated_at = "mutated";
  merged.sources["README.md"].locales.zz = entry("x", "y", NEW);
  assert.deepEqual(existing, existingSnapshot);
  assert.deepEqual(adopted, adoptedSnapshot);
});

test("mergeAdoptedState into an empty state yields the adopted document", () => {
  const adopted = twoByTwo();
  const adoptedSnapshot = structuredClone(adopted);

  const merged = mergeAdoptedState({ sources: {} }, adopted) as AdoptedState;

  assert.deepEqual(merged, adopted);
  assert.notEqual(merged, adopted);
  assert.notEqual(merged.sources["README.md"].locales.es, adopted.sources["README.md"].locales.es);
  assert.deepEqual(adopted, adoptedSnapshot);
});

test("mergeAdoptedState preserves a source the adopt run did not cover", () => {
  const existing = twoByTwo();
  // `--adopt --files=docs/GUIDE.md --locale=de`: README.md is not in the run at all.
  const adopted: AdoptedState = {
    sources: {
      "docs/GUIDE.md": {
        source_hash: sha("# G\n"),
        locales: { de: entry("# G\n", "# G (de) v2\n", NEW) },
      },
    },
  };

  const merged = mergeAdoptedState(existing, adopted) as AdoptedState;

  assert.deepEqual(merged.sources["README.md"], existing.sources["README.md"]);
  assert.deepEqual(
    merged.sources["docs/GUIDE.md"].locales.es,
    existing.sources["docs/GUIDE.md"].locales.es
  );
  assert.deepEqual(
    merged.sources["docs/GUIDE.md"].locales.de,
    adopted.sources["docs/GUIDE.md"].locales.de
  );
});

test("run-translation.mjs --help advertises --adopt as a no-API-call state rebuild", () => {
  const out = execFileSync(process.execPath, [RUN_TRANSLATION, "--help"], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
  assert.match(out, /--adopt\s+Rebuild \.i18n-state\.json from the files on disk \(no API calls\)/);
});

// ----- refreshTargetHashes -------------------------------------------------

test("refreshTargetHashes re-hashes a changed mirror and restamps it, keeping both source hashes", async () => {
  await withTempRoot(async (root) => {
    mkdirSync(path.join(root, "docs", "i18n", "es"), { recursive: true });
    // The mirror on disk moved on (a 🌐 bar rewrite); the source did NOT.
    writeFileSync(path.join(root, "docs", "i18n", "es", "README.md"), "# A (es) v2\n");
    const state: AdoptedState = {
      sources: {
        "README.md": {
          source_hash: sha("# A\n"),
          locales: { es: entry("# A\n", "# A (es)\n", OLD) },
        },
      },
    };

    const next = (await refreshTargetHashes({
      state,
      root,
      targetPathFor: mirrorPathFor(root),
      now: NEW,
    })) as AdoptedState;

    const es = next.sources["README.md"].locales.es;
    assert.equal(es.target_hash, sha("# A (es) v2\n"));
    assert.equal(es.updated_at, NEW);
    // The two source hashes are what `i18n:check` compares against the sources:
    // re-hashing them here would silence the genuine drift this must preserve.
    assert.equal(es.source_hash, sha("# A\n"));
    assert.equal(next.sources["README.md"].source_hash, sha("# A\n"));
  });
});

test("refreshTargetHashes leaves an entry whose target file is missing exactly as recorded", async () => {
  await withTempRoot(async (root) => {
    mkdirSync(path.join(root, "docs", "i18n", "es"), { recursive: true });
    writeFileSync(path.join(root, "docs", "i18n", "es", "README.md"), "# A (es)\n");
    const state: AdoptedState = {
      sources: {
        "README.md": {
          source_hash: sha("# A\n"),
          // `de` has a recorded entry but no file on disk (mirror deleted).
          locales: {
            es: entry("# A\n", "# A (es)\n", OLD),
            de: entry("# A\n", "# A (de)\n", OLD),
          },
        },
      },
    };

    const next = (await refreshTargetHashes({
      state,
      root,
      targetPathFor: mirrorPathFor(root),
      now: NEW,
    })) as AdoptedState;

    assert.deepEqual(next.sources["README.md"].locales.de, state.sources["README.md"].locales.de);
    // …and the present one is still refreshed (same bytes → same hash, new stamp).
    assert.equal(next.sources["README.md"].locales.es.target_hash, sha("# A (es)\n"));
    assert.equal(next.sources["README.md"].locales.es.updated_at, NEW);
  });
});

test("refreshTargetHashes is pure — the input state is neither mutated nor aliased", async () => {
  await withTempRoot(async (root) => {
    for (const locale of ["es", "de"]) {
      mkdirSync(path.join(root, "docs", "i18n", locale), { recursive: true });
      writeFileSync(path.join(root, "docs", "i18n", locale, "README.md"), `# A (${locale}) v2\n`);
    }
    const state = twoByTwo();
    // docs/GUIDE.md has no mirror on disk at all — the untouched half.
    const snapshot = structuredClone(state);

    const next = (await refreshTargetHashes({
      state,
      root,
      targetPathFor: mirrorPathFor(root),
      now: NEW,
    })) as AdoptedState;

    assert.deepEqual(state, snapshot);
    next.sources["README.md"].locales.es.updated_at = "mutated";
    next.sources["README.md"].source_hash = "mutated";
    next.sources["docs/GUIDE.md"].locales.de.target_hash = "mutated";
    next.sources["README.md"].locales.zz = entry("x", "y", NEW);
    assert.deepEqual(state, snapshot);
  });
});

test("run-translation.mjs --help advertises --targets-only as a mirror-only re-hash", () => {
  const out = execFileSync(process.execPath, [RUN_TRANSLATION, "--help"], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"],
  });
  assert.match(
    out,
    /--targets-only\s+With --adopt: re-hash only the mirrors, keeping every source_hash/
  );
});
