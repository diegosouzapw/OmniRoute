/**
 * GCF generic-profile encoder (encodeGeneric).
 * Vendored from gcf-typescript — generic profile only. Current with GCF spec v3.2
 * (nested object flattening) and the [N]: inline-array quoting fix.
 * https://github.com/blackwell-systems/gcf-typescript
 *
 * SPDX-License-Identifier: MIT
 */
import { formatScalar, formatKey, ATTACHMENT } from "./scalar.ts";

function indent(depth: number): string {
  return "  ".repeat(depth);
}

/** Options for controlling generic encoding behavior. */
export interface GenericOptions {
  /** When true, disables promotion of fixed-shape nested objects to path
   *  columns (e.g. "customer>name"). Nested objects use attachment syntax
   *  instead. Open-weight models currently comprehend the expanded form
   *  better; this gap is expected to close. */
  noFlatten?: boolean;
}

export function encodeGeneric(data: unknown, opts?: GenericOptions): string {
  let out = "GCF profile=generic\n";
  out += encodeRootValue(data, opts);
  return out;
}

function encodeRootValue(v: unknown, opts?: GenericOptions): string {
  if (v === null || v === undefined) return "=-\n";
  if (Array.isArray(v)) return encodeRootArray(v, opts);
  if (typeof v === "object") return encodeObject(v as Record<string, unknown>, 0, opts);
  return `=${formatScalar(v, 0)}\n`;
}

function encodeObject(obj: Record<string, unknown>, depth: number, opts?: GenericOptions): string {
  const prefix = indent(depth);
  let out = "";
  for (const key of Object.keys(obj)) {
    const value = obj[key];
    const fk = formatKey(key);
    if (Array.isArray(value)) {
      out += encodeNamedArray(fk, value, depth, opts);
    } else if (typeof value === "object" && value !== null) {
      out += `${prefix}## ${fk}\n`;
      out += encodeObject(value as Record<string, unknown>, depth + 1, opts);
    } else {
      out += `${prefix}${fk}=${formatScalar(value, 0)}\n`;
    }
  }
  return out;
}

function encodeRootArray(arr: unknown[], opts?: GenericOptions): string {
  if (arr.length === 0) return "## [0]\n";
  if (allPrimitives(arr)) {
    const vals = arr.map((v) => formatScalar(v, 0x2c));
    return `## [${arr.length}]: ${vals.join(",")}\n`;
  }
  const fields = tabularFields(arr);
  if (fields) return encodeTabular("## ", arr, fields, 0, opts);
  return encodeExpanded("## ", arr, 0, opts);
}

function encodeNamedArray(
  name: string,
  arr: unknown[],
  depth: number,
  opts?: GenericOptions
): string {
  const prefix = indent(depth);
  if (arr.length === 0) return `${prefix}## ${name} [0]\n`;
  if (allPrimitives(arr)) {
    const vals = arr.map((v) => formatScalar(v, 0x2c));
    return `${prefix}${name}[${arr.length}]: ${vals.join(",")}\n`;
  }
  const fields = tabularFields(arr);
  if (fields) return encodeTabular(`${prefix}## ${name} `, arr, fields, depth, opts);
  return encodeExpanded(`${prefix}## ${name} `, arr, depth, opts);
}

function tabularFields(arr: unknown[]): string[] | null {
  if (arr.length === 0) return null;
  const fieldOrder: string[] = [];
  const seen = new Set<string>();
  for (const item of arr) {
    if (typeof item !== "object" || item === null || Array.isArray(item)) return null;
    for (const k of Object.keys(item as Record<string, unknown>)) {
      if (!seen.has(k)) {
        fieldOrder.push(k);
        seen.add(k);
      }
    }
  }
  return fieldOrder.length > 0 ? fieldOrder : null;
}

/** Check if a field is eligible for inline schema: all rows have same flat object shape with 3+ keys. */
function inlineSchemaFields(arr: unknown[], fieldName: string): string[] | null {
  // First row must have the field.
  const first = arr[0] as Record<string, unknown> | undefined;
  if (!first || !Object.prototype.hasOwnProperty.call(first, fieldName)) return null;
  const firstVal = first[fieldName];
  if (
    firstVal === null ||
    firstVal === undefined ||
    typeof firstVal !== "object" ||
    Array.isArray(firstVal)
  )
    return null;

  let canonicalKeys: string[] | null = null;
  for (const item of arr) {
    const obj = item as Record<string, unknown>;
    if (!Object.prototype.hasOwnProperty.call(obj, fieldName) || obj[fieldName] === null || obj[fieldName] === undefined) continue;
    const v = obj[fieldName];
    if (typeof v !== "object" || Array.isArray(v)) return null;
    const keys = Object.keys(v as Record<string, unknown>);
    // All values must be scalars.
    for (const k of keys) {
      const val = (v as Record<string, unknown>)[k];
      if (val !== null && val !== undefined && typeof val === "object") return null;
    }
    if (!canonicalKeys) {
      canonicalKeys = keys;
    } else {
      if (keys.length !== canonicalKeys.length) return null;
      for (let i = 0; i < keys.length; i++) {
        if (keys[i] !== canonicalKeys[i]) return null;
      }
    }
  }
  if (!canonicalKeys || canonicalKeys.length < 3) return null;
  return canonicalKeys;
}

/** Check if array attachment has same tabular schema across all rows (first row must have it). All values must be scalars. */
function sharedArraySchema(arr: unknown[], fieldName: string): string[] | null {
  const first = arr[0] as Record<string, unknown> | undefined;
  if (!first || !Object.prototype.hasOwnProperty.call(first, fieldName)) return null;
  const firstVal = first[fieldName];
  if (!Array.isArray(firstVal)) return null;

  let canonicalFields: string[] | null = null;
  for (const item of arr) {
    const obj = item as Record<string, unknown>;
    if (!Object.prototype.hasOwnProperty.call(obj, fieldName) || obj[fieldName] === null || obj[fieldName] === undefined) continue;
    const v = obj[fieldName];
    if (!Array.isArray(v)) return null;
    const fields = tabularFields(v);
    if (!fields) return null;
    // All values must be scalars.
    for (const arrItem of v) {
      if (typeof arrItem !== "object" || arrItem === null) return null;
      for (const val of Object.values(arrItem as Record<string, unknown>)) {
        if (val !== null && val !== undefined && typeof val === "object") return null;
      }
    }
    if (!canonicalFields) {
      canonicalFields = fields;
    } else {
      if (fields.length !== canonicalFields.length) return null;
      for (let i = 0; i < fields.length; i++) {
        if (fields[i] !== canonicalFields[i]) return null;
      }
    }
  }
  return canonicalFields;
}

// ── Nested object flattening (v3.2) ──────────────────────────────────────

interface FlatLeaf {
  path: string; // ">" separated path (e.g. "customer>name")
  keys: string[]; // key chain to traverse from row object
}

// Keys that would pollute Object.prototype if used as a flatten path segment.
// An object carrying one of these is never flattened; it round-trips whole.
function isUnsafeKey(k: string): boolean {
  return k === "__proto__" || k === "constructor" || k === "prototype";
}

function analyzeFlattenable(
  arr: unknown[],
  fieldName: string,
  parentPath: string
): FlatLeaf[] | null {
  // Field names containing ">" cannot be flattened (would create ambiguous paths).
  if (fieldName.includes(">")) return null;
  let canonicalShape: Record<string, "scalar" | "nested"> | null = null;

  for (const item of arr) {
    const obj = item as Record<string, unknown>;
    if (!Object.prototype.hasOwnProperty.call(obj, fieldName) || obj[fieldName] === undefined) continue;
    if (obj[fieldName] === null) {
      // A nested (non-top-level) null cannot be flattened losslessly: its leaves would
      // encode as absent ("~") and unflatten back to a missing key, not null. Bail to
      // the whole-object (attachment) path. A top-level null is fine: it emits "-" and
      // reconstructs via the all-null rule, so just skip the row from shape analysis.
      if (parentPath !== "") return null;
      continue;
    }
    const v = obj[fieldName];
    if (typeof v !== "object" || Array.isArray(v)) return null;

    const keys = Object.keys(v as Record<string, unknown>);

    if (!canonicalShape) {
      // Null-prototype map so `k in canonicalShape` below only sees own keys
      // (a field literally named "toString"/"constructor" must not match the
      // Object.prototype chain), and reject prototype-pollution keys outright.
      canonicalShape = Object.create(null) as Record<string, "scalar" | "nested">;
      for (const k of keys) {
        if (k.includes(">") || isUnsafeKey(k)) return null;
        const val = (v as Record<string, unknown>)[k];
        if (val !== null && val !== undefined && typeof val === "object" && !Array.isArray(val)) {
          canonicalShape[k] = "nested";
        } else if (Array.isArray(val)) {
          return null;
        } else {
          canonicalShape[k] = "scalar";
        }
      }
    } else {
      if (keys.length !== Object.keys(canonicalShape).length) return null;
      for (const k of keys) {
        if (!Object.prototype.hasOwnProperty.call(canonicalShape, k)) return null;
        const val = (v as Record<string, unknown>)[k];
        const expected = canonicalShape[k];
        if (expected === "scalar") {
          if (val !== null && val !== undefined && typeof val === "object") return null;
        } else if (expected === "nested") {
          if (val !== null && val !== undefined) {
            if (typeof val !== "object" || Array.isArray(val)) return null;
          }
        }
      }
    }
  }

  if (!canonicalShape) return null;

  const currentPath = parentPath ? parentPath + ">" + fieldName : fieldName;
  const parentKeys = parentPath ? [...parentPath.split(">"), fieldName] : [fieldName];

  const leaves: FlatLeaf[] = [];
  for (const k of Object.keys(canonicalShape)) {
    if (canonicalShape[k] === "scalar") {
      leaves.push({ path: currentPath + ">" + k, keys: [...parentKeys, k] });
    } else {
      const subArr = arr.map((item) => {
        const obj = item as Record<string, unknown>;
        if (!Object.prototype.hasOwnProperty.call(obj, fieldName) || obj[fieldName] === null || obj[fieldName] === undefined)
          return {};
        return obj[fieldName];
      });
      const subLeaves = analyzeFlattenable(subArr as unknown[], k, currentPath);
      if (!subLeaves || subLeaves.length === 0) return null;
      leaves.push(...subLeaves);
    }
  }

  // Guard: reject if any row has non-null object with all-null leaves.
  if (leaves.length > 0) {
    for (const item of arr) {
      const obj = item as Record<string, unknown>;
      if (!Object.prototype.hasOwnProperty.call(obj, fieldName) || obj[fieldName] === null || obj[fieldName] === undefined) continue;
      const allNull = leaves.every((leaf) => {
        const val = resolveKeyChain(item, leaf.keys);
        return val.exists && val.value === null;
      });
      if (allNull) return null;
    }
  }

  return leaves;
}

function resolveKeyChain(item: unknown, keys: string[]): { value: unknown; exists: boolean } {
  if (keys.length === 0) return { value: undefined, exists: false };
  const obj = item as Record<string, unknown>;
  if (typeof obj !== "object" || obj === null) return { value: undefined, exists: false };
  if (!Object.prototype.hasOwnProperty.call(obj, keys[0])) return { value: undefined, exists: false };
  let current: unknown = obj[keys[0]];
  if (current === null || current === undefined) return { value: current, exists: true };
  for (let i = 1; i < keys.length; i++) {
    if (typeof current !== "object" || current === null) return { value: undefined, exists: false };
    const c = current as Record<string, unknown>;
    if (!Object.prototype.hasOwnProperty.call(c, keys[i])) return { value: undefined, exists: false };
    current = c[keys[i]];
  }
  return { value: current, exists: true };
}

// ── End flattening helpers ───────────────────────────────────────────────

function encodeTabular(
  headerPrefix: string,
  arr: unknown[],
  fields: string[],
  depth: number,
  opts?: GenericOptions
): string {
  const prefix = indent(depth);

  // Phase 0: Analyze fields for flattening.
  const flattenMap = new Map<string, FlatLeaf[]>();
  if (!opts?.noFlatten) {
    for (const f of fields) {
      const leaves = analyzeFlattenable(arr, f, "");
      if (leaves && leaves.length > 0) {
        flattenMap.set(f, leaves);
      }
    }
  }

  // Fields whose names contain ">" must not appear as tabular columns
  // because the decoder would interpret them as flattened path columns.
  // Track them for per-row attachment emission (spec rule 7.4.6.1.4).
  const gtFields = new Set<string>();
  for (const f of fields) {
    if (!flattenMap.has(f) && f.includes(">")) {
      gtFields.add(f);
    }
  }

  // Build expanded column list.
  type ColType = "flat" | "original";
  interface FlatColumn {
    headerName: string;
    colType: ColType;
    field: string;
    keys: string[];
  }
  const columns: FlatColumn[] = [];
  for (const f of fields) {
    if (gtFields.has(f)) continue;
    const leaves = flattenMap.get(f);
    if (leaves) {
      for (const leaf of leaves) {
        columns.push({
          headerName: formatKey(leaf.path),
          colType: "flat",
          field: f,
          keys: leaf.keys,
        });
      }
    } else {
      columns.push({ headerName: formatKey(f), colType: "original", field: f, keys: [] });
    }
  }

  // If all fields were excluded (all contain ">"), fall back to expanded.
  if (columns.length === 0) {
    return encodeExpanded(headerPrefix, arr, depth, opts);
  }

  // Pre-compute inline schemas and shared array schemas (skip flattened fields).
  const inlineSchemas = new Map<string, string[]>();
  const sharedArrSchemas = new Map<string, string[]>();
  for (const f of fields) {
    if (flattenMap.has(f)) continue;
    const ifs = inlineSchemaFields(arr, f);
    if (ifs) inlineSchemas.set(f, ifs);
    const sas = sharedArraySchema(arr, f);
    if (sas) sharedArrSchemas.set(f, sas);
  }

  const headerFields = columns.map((c) => c.headerName);
  let out = `${headerPrefix}[${arr.length}]{${headerFields.join(",")}}\n`;

  for (let i = 0; i < arr.length; i++) {
    const obj = arr[i] as Record<string, unknown>;
    const cells: string[] = [];
    const attachments: {
      name: string;
      value: unknown;
      inline: boolean;
      inlineFields?: string[];
    }[] = [];
    let rowHasAttachment = false;

    for (const col of columns) {
      if (col.colType === "flat") {
        // Resolve value via key chain.
        if (!Object.prototype.hasOwnProperty.call(obj, col.keys[0])) {
          cells.push("~");
        } else {
          // Check if top-level field is null.
          const topVal = obj[col.keys[0]];
          if (topVal === null || topVal === undefined) {
            cells.push(topVal === null ? "-" : "~");
          } else {
            const resolved = resolveKeyChain(obj, col.keys);
            if (!resolved.exists) {
              cells.push("~");
            } else if (resolved.value === null || resolved.value === undefined) {
              cells.push("-");
            } else {
              cells.push(formatScalar(resolved.value, 0x7c));
            }
          }
        }
        continue;
      }

      // Original (non-flattened) field.
      const f = col.field;
      if (!Object.prototype.hasOwnProperty.call(obj, f)) {
        cells.push("~");
        continue;
      }
      const v = obj[f];
      if (v === null || v === undefined) {
        cells.push("-");
        continue;
      }
      if (typeof v === "object") {
        const ifs = inlineSchemas.get(f);
        if (ifs && !Array.isArray(v)) {
          if (i === 0) {
            const fmtIF = ifs.map((k) => formatKey(k));
            cells.push(`^{${fmtIF.join(",")}}`);
          } else {
            cells.push("^");
          }
          attachments.push({ name: f, value: v, inline: true, inlineFields: ifs });
        } else {
          cells.push("^");
          attachments.push({ name: f, value: v, inline: false });
        }
        rowHasAttachment = true;
      } else {
        cells.push(formatScalar(v, 0x7c));
      }
    }

    // Emit fields with ">" in their names as per-row attachments.
    for (const f of fields) {
      if (!gtFields.has(f)) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, f)) continue;
      rowHasAttachment = true;
      attachments.push({ name: f, value: obj[f], inline: false });
    }

    const row = cells.join("|");
    if (rowHasAttachment) {
      out += `${prefix}@${i} ${row}\n`;
    } else {
      out += `${prefix}${row}\n`;
    }

    for (const att of attachments) {
      const fk = formatKey(att.name);
      if (att.inline && att.inlineFields) {
        // Inline: single pipe-delimited row, no prefix, no indent.
        const vals = att.inlineFields.map((inf) => {
          const val = (att.value as Record<string, unknown>)[inf];
          if (val === undefined) return "~";
          return formatScalar(val, 0x7c);
        });
        out += `${prefix}${vals.join("|")}\n`;
      } else if (Array.isArray(att.value)) {
        // Shared array schema: omit {fields} on subsequent rows.
        const sas = sharedArrSchemas.get(att.name);
        if (sas && i > 0) {
          out += encodeAttachmentArrayShared(
            prefix,
            fk,
            att.value as unknown[],
            depth + 2,
            sas,
            opts
          );
        } else {
          out += encodeAttachmentArray(prefix, fk, att.value as unknown[], depth + 2, opts);
        }
      } else if (typeof att.value === "object" && att.value !== null) {
        out += `${prefix}.${fk} {}\n`;
        out += encodeObject(att.value as Record<string, unknown>, depth + 2, opts);
      } else {
        // Scalar attachment (e.g. field names containing ">").
        if (att.value === null || att.value === undefined) {
          out += `${prefix}.${fk} =-\n`;
        } else {
          out += `${prefix}.${fk} =${formatScalar(att.value, 0)}\n`;
        }
      }
    }
  }
  return out;
}

function encodeAttachmentArray(
  attPrefix: string,
  fk: string,
  arr: unknown[],
  depth: number,
  opts?: GenericOptions
): string {
  if (arr.length === 0) return `${attPrefix}.${fk} [0]\n`;
  if (allPrimitives(arr)) {
    const vals = arr.map((v) => formatScalar(v, 0x2c));
    return `${attPrefix}.${fk} [${arr.length}]: ${vals.join(",")}\n`;
  }
  const fields = tabularFields(arr);
  if (fields) return encodeTabular(`${attPrefix}.${fk} `, arr, fields, depth, opts);
  return encodeExpanded(`${attPrefix}.${fk} `, arr, depth, opts);
}

function encodeAttachmentArrayShared(
  attPrefix: string,
  fk: string,
  arr: unknown[],
  depth: number,
  sharedFields: string[],
  opts?: GenericOptions
): string {
  if (arr.length === 0) return `${attPrefix}.${fk} [0]\n`;
  if (allPrimitives(arr)) {
    const vals = arr.map((v) => formatScalar(v, 0x2c));
    return `${attPrefix}.${fk} [${arr.length}]: ${vals.join(",")}\n`;
  }
  // Verify fields match shared schema.
  const fields = tabularFields(arr);
  if (
    fields &&
    fields.length === sharedFields.length &&
    fields.every((f, i) => f === sharedFields[i])
  ) {
    // Omit {fields}, use shared schema.
    const prefix = indent(depth);
    let out = `${attPrefix}.${fk} [${arr.length}]\n`;
    for (const item of arr) {
      const obj = item as Record<string, unknown>;
      const cells = sharedFields.map((f) => {
        if (!Object.prototype.hasOwnProperty.call(obj, f)) return "~";
        if (obj[f] === null || obj[f] === undefined) return "-";
        return formatScalar(obj[f], 0x7c);
      });
      out += `${prefix}${cells.join("|")}\n`;
    }
    return out;
  }
  // Fields don't match: fall back to full encoding.
  return encodeAttachmentArray(attPrefix, fk, arr, depth, opts);
}

function encodeExpanded(
  headerPrefix: string,
  arr: unknown[],
  depth: number,
  opts?: GenericOptions
): string {
  const prefix = indent(depth);
  let out = `${headerPrefix}[${arr.length}]\n`;
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (Array.isArray(item)) {
      out += encodeExpandedArrayItem(prefix, i, item, depth, opts);
    } else if (typeof item === "object" && item !== null) {
      out += `${prefix}@${i} {}\n`;
      out += encodeObject(item as Record<string, unknown>, depth + 1, opts);
    } else {
      out += `${prefix}@${i} =${formatScalar(item, 0)}\n`;
    }
  }
  return out;
}

function encodeExpandedArrayItem(
  prefix: string,
  idx: number,
  arr: unknown[],
  depth: number,
  opts?: GenericOptions
): string {
  if (arr.length === 0) return `${prefix}@${idx} [0]\n`;
  if (allPrimitives(arr)) {
    const vals = arr.map((v) => formatScalar(v, 0x2c));
    return `${prefix}@${idx} [${arr.length}]: ${vals.join(",")}\n`;
  }
  const fields = tabularFields(arr);
  if (fields) return encodeTabular(`${prefix}@${idx} `, arr, fields, depth + 1, opts);
  return encodeExpanded(`${prefix}@${idx} `, arr, depth + 1, opts);
}

function allPrimitives(arr: unknown[]): boolean {
  return arr.every((v) => typeof v !== "object" || v === null);
}
