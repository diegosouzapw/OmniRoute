import type { RenderResult, CommandDetectionResult } from "./types.ts";
import { NO_RENDER } from "./types.ts";

const MAX_TABLE_ROWS = 200;
const MAX_COLUMNS = 5;
// Priority column names to prefer when choosing which columns to display
const PRIORITY_KEYS = ["name", "id", "status", "type", "kind"];

/**
 * RTK semantic renderer for structured JSON array output (aws, kubectl, etc.).
 *
 * Only renders if:
 *  - Input parses as JSON (or contains a JSON array substring)
 *  - Result is an array of ≥2 homogeneous objects (same dominant scalar keys)
 *
 * Output: minimal TSV-like table (header + rows). Large arrays (>200 items)
 * are capped with a trailing "… (+K more)" line.
 *
 * All other shapes ⇒ no-op (conservative).
 */
export function renderStructuredTable(
  text: string,
  _detection: CommandDetectionResult,
): RenderResult {
  const parsed = tryParse(text.trim());
  if (!parsed) return NO_RENDER(text);

  // Must be an array of ≥2 objects
  if (!Array.isArray(parsed) || parsed.length < 2) return NO_RENDER(text);

  const items = parsed as unknown[];
  // Every item must be a non-null, non-array object
  if (!items.every((item) => item !== null && typeof item === "object" && !Array.isArray(item))) {
    return NO_RENDER(text);
  }

  const objects = items as Record<string, unknown>[];

  // Collect scalar keys across all objects, count occurrences
  const keyCount: Record<string, number> = {};
  for (const obj of objects) {
    for (const [k, v] of Object.entries(obj)) {
      if (v === null || typeof v !== "object") {
        keyCount[k] = (keyCount[k] ?? 0) + 1;
      }
    }
  }

  if (Object.keys(keyCount).length === 0) return NO_RENDER(text);

  // Choose columns: prioritize PRIORITY_KEYS, then by frequency, cap at MAX_COLUMNS
  const threshold = Math.floor(objects.length / 2);
  const candidateKeys = Object.entries(keyCount)
    .filter(([, count]) => count >= threshold)
    .map(([k]) => k);

  const priorityChosen = PRIORITY_KEYS.filter((k) => candidateKeys.includes(k));
  const rest = candidateKeys
    .filter((k) => !PRIORITY_KEYS.includes(k))
    .sort((a, b) => (keyCount[b] ?? 0) - (keyCount[a] ?? 0));

  const columns = [...priorityChosen, ...rest].slice(0, MAX_COLUMNS);
  if (columns.length === 0) return NO_RENDER(text);

  // Build table
  const rows = objects.slice(0, MAX_TABLE_ROWS);
  const extra = objects.length > MAX_TABLE_ROWS ? objects.length - MAX_TABLE_ROWS : 0;

  const header = columns.join("\t");
  const body = rows
    .map((obj) => columns.map((k) => String(obj[k] ?? "")).join("\t"))
    .join("\n");

  const out = extra > 0 ? `${header}\n${body}\n… (+${extra} more)` : `${header}\n${body}`;

  return { text: out, changed: true, renderer: "structured-table" };
}

function tryParse(text: string): unknown {
  // Direct parse
  try {
    return JSON.parse(text);
  } catch {
    // Try to find the largest [...] substring
    const start = text.indexOf("[");
    const end = text.lastIndexOf("]");
    if (start !== -1 && end > start) {
      try {
        return JSON.parse(text.slice(start, end + 1));
      } catch {
        return null;
      }
    }
    return null;
  }
}
