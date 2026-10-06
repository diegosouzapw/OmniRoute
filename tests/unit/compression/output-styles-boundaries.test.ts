/**
 * Tests for the per-style `boundaries` hook (Defect 2) and the ponytail/less-code
 * safety carve-out (Defect 1).
 *
 * Verifies:
 *   - ponytail and less-code declare the ponytail safety carve-out as their
 *     boundary, in English and in every language their i18n map covers
 *   - applyOutputStyles() emits SHARED_BOUNDARIES plus the per-style carve-out
 *     for such styles (single style and multi-style), never losing the shared
 *     clause
 *   - the legacy terse-prose-alone injection stays byte-identical (D-A5)
 *   - boundary emission is deterministic (prompt-cache stability, D-A4)
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import {
  applyOutputStyles,
  OUTPUT_STYLE_MARKER,
  type OutputStyleSelectionEntry,
} from "../../../open-sse/services/compression/outputStyles/apply.ts";
import {
  outputStyleMeta,
  SAFETY_BOUNDARIES,
} from "../../../open-sse/services/compression/outputStyles/catalog.ts";
import { SHARED_BOUNDARIES } from "../../../open-sse/services/compression/outputMode.ts";

const sel = (...entries: Array<[string, "lite" | "full" | "ultra"]>): OutputStyleSelectionEntry[] =>
  entries.map(([id, level]) => ({ id, level }));

const CARVE_OUT_ANCHOR = "input validation at trust boundaries";

test("SAFETY_BOUNDARIES is a distinct carve-out clause", () => {
  assert.notEqual(SAFETY_BOUNDARIES, SHARED_BOUNDARIES);
  assert.ok(SAFETY_BOUNDARIES.includes(CARVE_OUT_ANCHOR));
  assert.ok(SAFETY_BOUNDARIES.includes("security measures"));
  assert.ok(SAFETY_BOUNDARIES.includes("accessibility basics"));
});

test("ponytail and less-code declare the safety carve-out as their boundary", () => {
  for (const id of ["ponytail", "less-code"]) {
    const meta = outputStyleMeta(id);
    assert.equal(meta.boundaries, SAFETY_BOUNDARIES, `${id}.boundaries is the carve-out`);
    assert.ok(meta.boundariesI18n, `${id} ships localized boundaries`);
  }
});

test("every i18n language of a boundary-carrying style has a localized boundary", () => {
  // A localized instruction must never get an English-only boundary appended.
  for (const id of ["ponytail", "less-code"]) {
    const meta = outputStyleMeta(id);
    for (const lang of Object.keys(meta.i18n ?? {})) {
      const localized = meta.boundariesI18n?.[lang];
      assert.ok(localized, `${id} is missing boundariesI18n["${lang}"]`);
      assert.notEqual(localized, SAFETY_BOUNDARIES, `${id}.${lang} boundary must be translated`);
      assert.ok(localized.length > 0);
    }
  }
});

test("localized boundaries are written in their own language, not copied English", () => {
  const anchors: Record<string, RegExp> = {
    "pt-BR": /validação/,
    vi: /xác thực/,
    ja: /バリデーション|信頼境界/,
    id: /validasi/,
    es: /validación/,
    de: /Eingabevalidierung/,
    fr: /validation/,
    it: /validazione/,
    ru: /[А-Яа-яЁё]/,
    zh: /[一-鿿]/,
  };
  for (const id of ["ponytail", "less-code"]) {
    for (const [lang, anchor] of Object.entries(anchors)) {
      const localized = outputStyleMeta(id).boundariesI18n?.[lang];
      assert.ok(localized, `${id} missing boundariesI18n["${lang}"]`);
      assert.ok(anchor.test(localized), `${id}.${lang} boundary fails its language anchor`);
    }
  }
});

function injected(
  body: Parameters<typeof applyOutputStyles>[0],
  selection: OutputStyleSelectionEntry[],
  language = "en"
): string {
  const r = applyOutputStyles(body, selection, language);
  assert.equal(r.applied, true);
  // #13383: the instruction now lands in a top-level `system` field (or a
  // trailing system message), never a synthetic messages[0]. Gather every text
  // surface and return from the marker on, so callers assert on the injected
  // instruction alone (and the terse-prose byte-identity check stays exact).
  const parts: string[] = [];
  const system = (r.body as { system?: unknown }).system;
  if (typeof system === "string") parts.push(system);
  else if (Array.isArray(system)) {
    for (const block of system) {
      const text = (block as { text?: unknown } | null)?.text;
      if (typeof text === "string") parts.push(text);
    }
  }
  for (const message of r.body.messages ?? []) {
    if (typeof (message as { content?: unknown }).content === "string") {
      parts.push((message as { content: string }).content);
    }
  }
  const joined = parts.join("\n");
  const markerAt = joined.indexOf(OUTPUT_STYLE_MARKER);
  return markerAt >= 0 ? joined.slice(markerAt) : joined;
}

test("per-style boundary is appended alongside SHARED_BOUNDARIES (single style)", () => {
  const text = injected(
    { messages: [{ role: "user", content: "Refactor this module." }] },
    sel(["ponytail", "full"])
  );
  assert.ok(text.includes(OUTPUT_STYLE_MARKER));
  assert.ok(text.includes(CARVE_OUT_ANCHOR), "carve-out boundary appended");
  // Code-shaping styles must NOT lose the shared clause (#13938 review): the
  // carve-out ADDS to SHARED_BOUNDARIES rather than replacing it, so
  // "keep code blocks, file paths, commands, errors, URLs exact" survives.
  assert.ok(text.includes(SHARED_BOUNDARIES), "SHARED_BOUNDARIES must still be present");
  assert.ok(
    text.indexOf(SHARED_BOUNDARIES) < text.indexOf(CARVE_OUT_ANCHOR),
    "SHARED_BOUNDARIES is the base clause, carve-out follows"
  );
  // Exactly one boundary block after the instruction body.
  assert.equal((text.match(new RegExp(escapeRe(CARVE_OUT_ANCHOR), "g")) ?? []).length, 1);
});

test("less-code emits the carve-out plus the shared clause (levels no longer double-append)", () => {
  const text = injected(
    { messages: [{ role: "user", content: "Refactor this module." }] },
    sel(["less-code", "ultra"])
  );
  assert.ok(text.includes(CARVE_OUT_ANCHOR));
  assert.ok(text.includes(SHARED_BOUNDARIES));
  assert.equal((text.match(new RegExp(escapeRe(SHARED_BOUNDARIES), "g")) ?? []).length, 1);
});

test("localized boundary is emitted for a localized selection", () => {
  const text = injected(
    { messages: [{ role: "user", content: "Refatore este módulo." }] },
    sel(["ponytail", "full"]),
    "pt-BR"
  );
  assert.ok(text.includes("validação de entrada em limites de confiança"));
  assert.ok(
    !text.includes(CARVE_OUT_ANCHOR),
    "English carve-out must not leak into pt-BR injection"
  );
});

test("multi-style: carve-out style + non-boundary style emits both clauses in catalog order", () => {
  // SHARED_BOUNDARIES is always the base; the carve-out follows in catalog order.
  const text = injected(
    { messages: [{ role: "user", content: "Refactor this module." }] },
    sel(["less-code", "full"], ["terse-prose", "full"])
  );
  const sharedAt = text.indexOf(SHARED_BOUNDARIES);
  const carveAt = text.indexOf(CARVE_OUT_ANCHOR);
  assert.ok(sharedAt >= 0 && carveAt >= 0, "both boundary clauses present");
  assert.ok(sharedAt < carveAt, "shared base clause precedes the carve-out");
  assert.equal((text.match(new RegExp(escapeRe(SHARED_BOUNDARIES), "g")) ?? []).length, 1);
});

test("multi-style: two carve-out styles deduplicate to a single carve-out clause", () => {
  const text = injected(
    { messages: [{ role: "user", content: "Refactor this module." }] },
    sel(["ponytail", "full"], ["less-code", "full"])
  );
  assert.equal((text.match(new RegExp(escapeRe(CARVE_OUT_ANCHOR), "g")) ?? []).length, 1);
  assert.equal((text.match(new RegExp(escapeRe(SHARED_BOUNDARIES), "g")) ?? []).length, 1);
});

test("terse-prose alone stays byte-identical to the legacy caveman injection (D-A5)", () => {
  const text = injected(
    { messages: [{ role: "user", content: "Summarize this API response." }] },
    sel(["terse-prose", "full"])
  );
  const legacy = `Respond terse like smart caveman. Drop articles (a/an/the), filler (just/really/basically/actually/simply), pleasantries, hedging. Fragments OK. Short synonyms (big not extensive, fix not implement). Keep all technical substance, code, errors, URLs, identifiers exact. ${SHARED_BOUNDARIES}`;
  assert.equal(text, `${OUTPUT_STYLE_MARKER}\n${legacy}`);
});

test("boundary emission is deterministic (same selection + language → byte-identical)", () => {
  const make = () =>
    injected(
      { messages: [{ role: "user", content: "do a thing" }] },
      sel(["terse-prose", "full"], ["ponytail", "lite"])
    );
  assert.equal(make(), make());
});

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
