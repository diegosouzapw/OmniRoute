/**
 * tabular.ts — GCF-powered encoder + backward-compatible omni-tabular decoder.
 *
 * Encoding now uses GCF (Graph Compact Format) generic profile, which handles:
 *   - Homogeneous AND heterogeneous arrays of objects
 *   - Mixed-type columns (nullable, number/string mix)
 *   - Nested objects and arrays (first-class, not JSON-stringified)
 *   - Tabular layout with inline schemas for repeated structures
 *
 * Decoding supports BOTH formats for backward compatibility:
 *   - ```gcf-generic ... ``` (new GCF format)
 *   - ```omni-tabular ... ``` (legacy format, still decoded correctly)
 *
 * The legacy omni-tabular encoder is preserved as encodeTabularBlockLegacy
 * for backward-compat decoding and benchmark comparison.
 */

import { encodeGeneric, decodeGeneric } from "./gcf/index.ts";

// ─── fence markers ───────────────────────────────────────────────────────────

/** New GCF fence marker. */
export const GCF_FENCE_OPEN = "```gcf-generic";
export const GCF_FENCE_CLOSE = "```";

/** Legacy fence markers (kept for backward-compat decoding). */
export const TABULAR_FENCE_OPEN = "```omni-tabular";
export const TABULAR_FENCE_CLOSE = "```";
export const TABULAR_MARKER_RE = /```(?:gcf-generic|omni-tabular)\n([\s\S]*?)\n```/g;

// ─── legacy types (for backward-compat decoder) ─────────────────────────────

type CellKind = "s" | "n" | "b" | "null" | "j";

export function kindOf(val: unknown): CellKind {
  if (val === null) return "null";
  if (typeof val === "number") return "n";
  if (typeof val === "boolean") return "b";
  if (typeof val === "object") return "j";
  return "s";
}

// ─── GCF encoder (replaces old encodeTabularBlock) ───────────────────────────

/**
 * Encode an array of objects using GCF generic profile.
 * Returns the GCF text (without fence markers).
 */
export function encodeGcfBlock(arr: Record<string, unknown>[]): string {
  return encodeGeneric(arr);
}

/**
 * Wrap a GCF block in the gcf-generic fence.
 */
export function wrapGcf(blockContent: string): string {
  return `${GCF_FENCE_OPEN}\n${blockContent}\n${GCF_FENCE_CLOSE}`;
}

/**
 * Public API — encode an array to a fenced GCF string.
 * This is the new default encoder (replaces encodeTabular for new content).
 */
export function encodeTabular(arr: Record<string, unknown>[]): string {
  return wrapGcf(encodeGcfBlock(arr));
}

/**
 * Alias kept for SmartCrusher: encode block content (without fence).
 * Now delegates to GCF.
 */
export function encodeTabularBlock(arr: Record<string, unknown>[]): string {
  return encodeGcfBlock(arr);
}

/**
 * Wrap content in fence markers. Now uses GCF fence.
 */
export function wrapTabular(blockContent: string): string {
  return wrapGcf(blockContent);
}

// ─── legacy omni-tabular encoder (preserved for tests/benchmarks) ────────────

function encodeCell(raw: string): string {
  const needsQuoting =
    raw.includes(",") ||
    raw.includes('"') ||
    raw.includes("\n") ||
    raw.includes("\r") ||
    raw.startsWith(" ") ||
    raw.endsWith(" ");
  if (!needsQuoting) return raw;
  return '"' + raw.replace(/"/g, '""') + '"';
}

export function parseCsvRow(line: string): string[] {
  const cells: string[] = [];
  let i = 0;
  const len = line.length;

  while (i < len) {
    if (line[i] === '"') {
      let cell = "";
      i++;
      while (i < len) {
        if (line[i] === '"') {
          if (i + 1 < len && line[i + 1] === '"') {
            cell += '"';
            i += 2;
          } else {
            i++;
            break;
          }
        } else {
          cell += line[i++];
        }
      }
      cells.push(cell);
      if (i < len && line[i] === ",") {
        i++;
        if (i === len) cells.push("");
      }
    } else {
      const start = i;
      while (i < len && line[i] !== ",") i++;
      cells.push(line.slice(start, i));
      if (i < len) {
        i++;
        if (i === len) cells.push("");
      }
    }
  }

  return cells;
}

/**
 * Legacy encoder — preserved for backward-compat testing and benchmarks.
 */
export function encodeTabularBlockLegacy(arr: Record<string, unknown>[]): string {
  if (arr.length === 0) return "";

  const keysSet = new Set<string>();
  for (const row of arr) {
    for (const k of Object.keys(row)) keysSet.add(k);
  }
  const keys = Array.from(keysSet);
  const n = arr.length;

  const kinds: CellKind[] = keys.map((k) => kindOf(arr[0][k]));

  const kindsRow = "__kinds__," + kinds.join(",");
  const headerRow = keys.map(encodeCell).join(",");

  const dataRows = arr.map((row) => {
    return keys
      .map((k) => {
        const val = row[k];
        const kind = kindOf(val);
        if (kind === "null") return "null";
        if (kind === "n") return String(val);
        if (kind === "b") return String(val);
        return encodeCell(JSON.stringify(val));
      })
      .join(",");
  });

  return `[${n} rows]\n${kindsRow}\n${headerRow}\n${dataRows.join("\n")}`;
}

// ─── dual-format decoder ─────────────────────────────────────────────────────

/**
 * Decode a legacy omni-tabular block back to the original array.
 */
export function decodeTabularBlockLegacy(block: string): Record<string, unknown>[] {
  const lines = block.split("\n");
  if (lines.length < 3) return [];

  const countLine = lines[0];
  const countMatch = countLine.match(/^\[(\d+) rows\]$/);
  if (!countMatch) return [];
  const n = parseInt(countMatch[1], 10);

  const kindsLine = lines[1];
  if (!kindsLine.startsWith("__kinds__,")) return [];
  const kindsRaw = parseCsvRow(kindsLine.slice("__kinds__,".length));
  const kinds = kindsRaw as CellKind[];

  const headerLine = lines[2];
  const keys = parseCsvRow(headerLine);

  const result: Record<string, unknown>[] = [];
  for (let i = 0; i < n; i++) {
    const rowLine = lines[3 + i];
    if (rowLine === undefined) break;
    const cells = parseCsvRow(rowLine);
    const obj: Record<string, unknown> = {};
    for (let j = 0; j < keys.length; j++) {
      const key = keys[j];
      const cell = cells[j] ?? "";
      const kind = kinds[j];
      if (kind === "null") {
        obj[key] = null;
      } else if (kind === "n") {
        obj[key] = Number(cell);
      } else if (kind === "b") {
        obj[key] = cell === "true";
      } else {
        try {
          obj[key] = JSON.parse(cell);
        } catch {
          obj[key] = cell;
        }
      }
    }
    result.push(obj);
  }

  return result;
}

/**
 * Public API — decode a fenced block (either GCF or legacy omni-tabular).
 * Auto-detects format from the fence marker.
 */
export function decodeTabular(text: string): Record<string, unknown>[] {
  // Detect format from fence marker.
  if (text.startsWith(GCF_FENCE_OPEN + "\n") || text.startsWith("GCF ")) {
    // GCF format: strip fence if present, decode via GCF decoder.
    let inner = text;
    const hadFence = inner.startsWith(GCF_FENCE_OPEN + "\n");
    if (hadFence) {
      inner = inner.slice(GCF_FENCE_OPEN.length + 1);
      if (inner.endsWith("\n" + GCF_FENCE_CLOSE)) {
        inner = inner.slice(0, inner.length - GCF_FENCE_CLOSE.length - 1);
      } else if (inner.endsWith(GCF_FENCE_CLOSE)) {
        inner = inner.slice(0, inner.length - GCF_FENCE_CLOSE.length);
      }
    }
    const result = decodeGeneric(inner);
    // decodeGeneric returns the decoded value; for arrays, return directly.
    if (Array.isArray(result)) return result as Record<string, unknown>[];
    // If it decoded to a single object, wrap it.
    return [result as Record<string, unknown>];
  }

  // Legacy omni-tabular format.
  let inner = text;
  if (inner.startsWith(TABULAR_FENCE_OPEN + "\n")) {
    inner = inner.slice(TABULAR_FENCE_OPEN.length + 1);
  }
  if (inner.endsWith("\n" + TABULAR_FENCE_CLOSE)) {
    inner = inner.slice(0, inner.length - TABULAR_FENCE_CLOSE.length - 1);
  } else if (inner.endsWith(TABULAR_FENCE_CLOSE)) {
    inner = inner.slice(0, inner.length - TABULAR_FENCE_CLOSE.length);
  }
  return decodeTabularBlockLegacy(inner);
}
