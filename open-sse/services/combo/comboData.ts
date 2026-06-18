/**
 * Shared combo data-normalization helpers extracted from combo.ts.
 *
 * Tiny side-effect-free guards/normalizers that several combo submodules depend
 * on (shadow routing, combo structure resolution) plus combo.ts itself. Moving
 * them to this leaf module out of the combo.ts god-file (Quality Gate v2 /
 * Fase 9) lets the submodules import them without reaching back into the barrel
 * (no cycles). Logic unchanged; combo.ts imports them back for compatibility.
 */

export function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}
