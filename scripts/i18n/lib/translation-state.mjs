import { promises as fs, existsSync } from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const sha256 = (buf) => crypto.createHash("sha256").update(buf).digest("hex");

/**
 * Builds a `.i18n-state.json` document from what is on disk, without any
 * translation call. Used to re-bootstrap incremental drift detection after the
 * state file was lost (deleted in v3.8.10) — every existing mirror is adopted
 * as "in sync with the current source". Every entry of one run carries the
 * same `updated_at` (`now`, ISO-8601 — computed once per call unless injected).
 */
export async function adoptState({
  root,
  sources,
  locales,
  targetPathFor,
  now = new Date().toISOString(),
}) {
  const state = { sources: {} };
  for (const rel of sources) {
    const sourceHash = sha256(await fs.readFile(path.join(root, rel)));
    const entry = { source_hash: sourceHash, locales: {} };
    for (const locale of locales) {
      const target = targetPathFor(rel, locale);
      if (!existsSync(target)) continue;
      entry.locales[locale] = {
        source_hash: sourceHash,
        target_hash: sha256(await fs.readFile(target)),
        updated_at: now,
      };
    }
    state.sources[rel] = entry;
  }
  return state;
}

const cloneLocales = (locales) =>
  Object.fromEntries(Object.entries(locales ?? {}).map(([locale, info]) => [locale, { ...info }]));

/**
 * Folds an adopt run into an existing state document and returns a new one.
 * Every source the run covered gets its `source_hash` refreshed and its adopted
 * locales replaced; locales the run did not adopt — and whole sources it did
 * not cover — are kept exactly as recorded, so a filtered
 * `--adopt --locale=… / --files=…` never discards the rest of the state. An
 * untouched locale keeps its own (possibly stale) `source_hash`, which is what
 * makes `i18n:run` still retranslate it when the source moved on.
 * Pure: neither input is mutated, and the result does not alias them.
 */
export function mergeAdoptedState(existing, adopted) {
  const merged = { ...existing, sources: {} };
  for (const [rel, entry] of Object.entries(existing?.sources ?? {})) {
    merged.sources[rel] = { ...entry, locales: cloneLocales(entry.locales) };
  }
  for (const [rel, entry] of Object.entries(adopted?.sources ?? {})) {
    const current = merged.sources[rel];
    merged.sources[rel] = {
      ...(current ?? {}),
      source_hash: entry.source_hash,
      locales: { ...(current?.locales ?? {}), ...cloneLocales(entry.locales) },
    };
  }
  return merged;
}

/**
 * Refreshes ONLY the mirror hashes of an existing state document: every
 * recorded `sources[rel].locales[locale]` whose target file exists on disk gets
 * its `target_hash` recomputed from the bytes on disk and its `updated_at`
 * restamped, while BOTH the top-level and the per-locale `source_hash` stay
 * exactly as recorded. Entries whose target is missing are copied verbatim, and
 * no source file is read at all.
 *
 * Existence reason: a mechanical rewrite of the mirrors (`i18n:sync-bars`
 * regenerating every 🌐 bar) makes each of them "target changed" for
 * `i18n:check` although not one translation went stale. Re-adopting with
 * `adoptState` would silence that noise but ALSO re-hash the sources, masking
 * the genuine source drift the same check must keep reporting — hence this
 * narrower operation.
 *
 * Pure: `state` is not mutated and the result does not alias it.
 */
export async function refreshTargetHashes({
  state,
  root,
  targetPathFor,
  now = new Date().toISOString(),
}) {
  const next = { ...state, sources: {} };
  for (const [rel, entry] of Object.entries(state?.sources ?? {})) {
    const locales = {};
    for (const [locale, info] of Object.entries(entry?.locales ?? {})) {
      const target = path.resolve(root, targetPathFor(rel, locale));
      locales[locale] = existsSync(target)
        ? { ...info, target_hash: sha256(await fs.readFile(target)), updated_at: now }
        : { ...info };
    }
    next.sources[rel] = { ...entry, locales };
  }
  return next;
}
