/**
 * tabular.ts — dependency-free columnar encoder/decoder for homogeneous JSON arrays.
 *
 * Format design (lossless, GP5' inspired):
 *
 *   ```omni-tabular
 *   [N rows]
 *   __kinds__,s,n,n,b          ← type hints row (hidden metadata)
 *   col1,col2,col3,col4        ← header row
 *   "\"val1\"",42,99,true      ← data rows (strings JSON-encoded to avoid multi-line issues)
 *   ...
 *   ```
 *
 * Cell encoding rules (CSV-style, lossless):
 *   - Strings: JSON.stringify-ed (so newlines → \\n, quotes → \\", etc.), then
 *     encodeCell-quoted if the JSON repr contains comma, quote, newline, or leading/trailing space.
 *   - Numbers / booleans / null: written as their unambiguous string representation.
 *   - Objects or arrays (nested): JSON.stringify-ed (same as strings for encoding), then quoted.
 *
 * Decode rules:
 *   - Kind `s`: cell value is a JSON string literal → JSON.parse restores original string.
 *   - Kind `n`: Number(cell).
 *   - Kind `b`: cell === "true".
 *   - Kind `null`: null.
 *   - Kind `j`: JSON.parse restores original object/array.
 *
 * All special characters (newlines, commas, quotes, tabs) inside string/json cells are
 * safely contained inside the JSON representation, which is then CSV-quoted. The line
 * split in the decoder always operates on the outer structure, which is free of raw
 * newlines. This is the key losslessness guarantee.
 *
 * Note: TOON (@toon-format/toon, ~24.6k★) could be a future drop-in encoder here for
 * potentially better compression on heterogeneous shapes; this plain columnar encoder is
 * used instead to avoid npm dependencies (supply-chain safety).
 */

export const TABULAR_FENCE_OPEN = "```omni-tabular";
export const TABULAR_FENCE_CLOSE = "```";
export const TABULAR_MARKER_RE = /```omni-tabular\n(\[[\d]+ rows\]\n[\s\S]*?)\n```/g;

/** Cell type hints stored in the second metadata row. */
type CellKind = "s" | "n" | "b" | "null" | "j"; // string / number / boolean / null / json-object-or-array

export function kindOf(val: unknown): CellKind {
  if (val === null) return "null";
  if (typeof val === "number") return "n";
  if (typeof val === "boolean") return "b";
  if (typeof val === "object") return "j"; // object or array
  return "s";
}

/**
 * Encode a raw string as a CSV cell.
 * Wraps in `"` and doubles any internal `"` characters (RFC 4180).
 * Used for strings that might contain commas, quotes, or spaces.
 */
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

/**
 * Parse one CSV row (a single line) into cells.
 * Handles RFC 4180 quoting with `""` escaping.
 * Lines are guaranteed to not contain unescaped newlines (all newlines are inside
 * JSON-escaped strings, so the CSV layer never sees a real newline within a cell).
 */
export function parseCsvRow(line: string): string[] {
  const cells: string[] = [];
  let i = 0;
  const len = line.length;

  while (i < len) {
    if (line[i] === '"') {
      // Quoted cell: consume up to the closing unescaped quote
      let cell = "";
      i++; // skip opening quote
      while (i < len) {
        if (line[i] === '"') {
          if (i + 1 < len && line[i + 1] === '"') {
            cell += '"';
            i += 2;
          } else {
            i++; // skip closing quote
            break;
          }
        } else {
          cell += line[i++];
        }
      }
      cells.push(cell);
      // Skip trailing comma
      if (i < len && line[i] === ",") {
        i++;
        // Trailing comma at end of line → empty cell
        if (i === len) cells.push("");
      }
    } else {
      // Unquoted cell: read until comma or end
      const start = i;
      while (i < len && line[i] !== ",") i++;
      cells.push(line.slice(start, i));
      if (i < len) {
        i++; // skip comma
        // Trailing comma at end of line → empty cell
        if (i === len) cells.push("");
      }
    }
  }

  return cells;
}

/**
 * Encode a homogeneous array of objects to a compact columnar block (without fence).
 *
 * The block format is:
 *   [N rows]
 *   __kinds__,<kind0>,<kind1>,...
 *   <key0>,<key1>,...
 *   <row0-cell0>,<row0-cell1>,...
 *   ...
 */
export function encodeTabularBlock(arr: Record<string, unknown>[]): string {
  if (arr.length === 0) return "";

  // Collect union of all keys (first-seen order)
  const keysSet = new Set<string>();
  for (const row of arr) {
    for (const k of Object.keys(row)) keysSet.add(k);
  }
  const keys = Array.from(keysSet);
  const n = arr.length;

  // Determine kinds from first row (homogeneous array → kinds are uniform)
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
        // kind "s" or "j": JSON.stringify the value, then CSV-quote the result.
        // JSON.stringify a string gives '"the string with \\n escaped"'
        // JSON.stringify an object/array gives the full JSON representation.
        // Both are safe to CSV-quote (no raw newlines in the serialized output).
        return encodeCell(JSON.stringify(val));
      })
      .join(",");
  });

  return `[${n} rows]\n${kindsRow}\n${headerRow}\n${dataRows.join("\n")}`;
}

/**
 * Decode a columnar block back to the original array.
 * Input is the raw block content (without the fence markers).
 */
export function decodeTabularBlock(block: string): Record<string, unknown>[] {
  const lines = block.split("\n");
  if (lines.length < 3) return [];

  // Line 0: [N rows]
  const countLine = lines[0];
  const countMatch = countLine.match(/^\[(\d+) rows\]$/);
  if (!countMatch) return [];
  const n = parseInt(countMatch[1], 10);

  // Line 1: kinds row
  const kindsLine = lines[1];
  if (!kindsLine.startsWith("__kinds__,")) return [];
  const kindsRaw = parseCsvRow(kindsLine.slice("__kinds__,".length));
  const kinds = kindsRaw as CellKind[];

  // Line 2: header row
  const headerLine = lines[2];
  const keys = parseCsvRow(headerLine);

  // Lines 3..3+n-1: data rows
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
        // kind "s" or "j": cell is a JSON-encoded value → JSON.parse restores it.
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
 * Wrap a tabular block content in the omni-tabular fence.
 */
export function wrapTabular(blockContent: string): string {
  return `${TABULAR_FENCE_OPEN}\n${blockContent}\n${TABULAR_FENCE_CLOSE}`;
}

/**
 * Public API — encode an array to a fenced tabular string.
 */
export function encodeTabular(arr: Record<string, unknown>[]): string {
  return wrapTabular(encodeTabularBlock(arr));
}

/**
 * Public API — decode a fenced tabular string back to an array.
 */
export function decodeTabular(text: string): Record<string, unknown>[] {
  // Strip fence markers if present
  let inner = text;
  if (inner.startsWith(TABULAR_FENCE_OPEN + "\n")) {
    inner = inner.slice(TABULAR_FENCE_OPEN.length + 1);
  }
  if (inner.endsWith("\n" + TABULAR_FENCE_CLOSE)) {
    inner = inner.slice(0, inner.length - TABULAR_FENCE_CLOSE.length - 1);
  } else if (inner.endsWith(TABULAR_FENCE_CLOSE)) {
    inner = inner.slice(0, inner.length - TABULAR_FENCE_CLOSE.length);
  }
  return decodeTabularBlock(inner);
}
