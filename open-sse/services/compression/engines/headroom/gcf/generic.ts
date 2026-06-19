/**
 * Generic encoder: converts any JS value into GCF generic profile.
 * Vendored from gcf-typescript — generic profile only.
 * https://github.com/blackwell-systems/gcf-typescript
 *
 * SPDX-License-Identifier: MIT
 */
import { formatScalar, formatKey } from "./scalar.ts";

function indent(depth: number): string {
  return "  ".repeat(depth);
}

export function encodeGeneric(data: unknown): string {
  let out = "GCF profile=generic\n";
  out += encodeRootValue(data);
  return out;
}

function encodeRootValue(v: unknown): string {
  if (v === null || v === undefined) return "=-\n";
  if (Array.isArray(v)) return encodeRootArray(v);
  if (typeof v === "object") return encodeObject(v as Record<string, unknown>, 0);
  return `=${formatScalar(v, 0)}\n`;
}

function encodeObject(obj: Record<string, unknown>, depth: number): string {
  const prefix = indent(depth);
  let out = "";
  for (const key of Object.keys(obj)) {
    const value = obj[key];
    const fk = formatKey(key);
    if (Array.isArray(value)) {
      out += encodeNamedArray(fk, value, depth);
    } else if (typeof value === "object" && value !== null) {
      out += `${prefix}## ${fk}\n`;
      out += encodeObject(value as Record<string, unknown>, depth + 1);
    } else {
      out += `${prefix}${fk}=${formatScalar(value, 0)}\n`;
    }
  }
  return out;
}

function encodeRootArray(arr: unknown[]): string {
  if (arr.length === 0) return "## [0]\n";
  if (allPrimitives(arr)) {
    const vals = arr.map((v) => formatScalar(v, 0x2c));
    return `## [${arr.length}]: ${vals.join(",")}\n`;
  }
  const fields = tabularFields(arr);
  if (fields) return encodeTabular("## ", arr, fields, 0);
  return encodeExpanded("## ", arr, 0);
}

function encodeNamedArray(name: string, arr: unknown[], depth: number): string {
  const prefix = indent(depth);
  if (arr.length === 0) return `${prefix}## ${name} [0]\n`;
  if (allPrimitives(arr)) {
    const vals = arr.map((v) => formatScalar(v, 0x2c));
    return `${prefix}${name}[${arr.length}]: ${vals.join(",")}\n`;
  }
  const fields = tabularFields(arr);
  if (fields) return encodeTabular(`${prefix}## ${name} `, arr, fields, depth);
  return encodeExpanded(`${prefix}## ${name} `, arr, depth);
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
  const first = arr[0] as Record<string, unknown> | undefined;
  if (!first || !(fieldName in first)) return null;
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
    if (!(fieldName in obj) || obj[fieldName] === null || obj[fieldName] === undefined) continue;
    const v = obj[fieldName];
    if (typeof v !== "object" || Array.isArray(v)) return null;
    const keys = Object.keys(v as Record<string, unknown>);
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

/** Check if array attachment has same tabular schema across all rows. */
function sharedArraySchema(arr: unknown[], fieldName: string): string[] | null {
  const first = arr[0] as Record<string, unknown> | undefined;
  if (!first || !(fieldName in first)) return null;
  const firstVal = first[fieldName];
  if (!Array.isArray(firstVal)) return null;

  let canonicalFields: string[] | null = null;
  for (const item of arr) {
    const obj = item as Record<string, unknown>;
    if (!(fieldName in obj) || obj[fieldName] === null || obj[fieldName] === undefined) continue;
    const v = obj[fieldName];
    if (!Array.isArray(v)) return null;
    const fields = tabularFields(v);
    if (!fields) return null;
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

function encodeTabular(
  headerPrefix: string,
  arr: unknown[],
  fields: string[],
  depth: number
): string {
  const prefix = indent(depth);

  const inlineSchemas = new Map<string, string[]>();
  const sharedArrSchemas = new Map<string, string[]>();
  for (const f of fields) {
    const ifs = inlineSchemaFields(arr, f);
    if (ifs) inlineSchemas.set(f, ifs);
    const sas = sharedArraySchema(arr, f);
    if (sas) sharedArrSchemas.set(f, sas);
  }

  const fmtFields = fields.map((f) => formatKey(f));
  let out = `${headerPrefix}[${arr.length}]{${fmtFields.join(",")}}\n`;

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

    for (const f of fields) {
      if (!(f in obj)) {
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

    const row = cells.join("|");
    if (rowHasAttachment) {
      out += `${prefix}@${i} ${row}\n`;
    } else {
      out += `${prefix}${row}\n`;
    }

    for (const att of attachments) {
      const fk = formatKey(att.name);
      if (att.inline && att.inlineFields) {
        const vals = att.inlineFields.map((inf) => {
          const val = (att.value as Record<string, unknown>)[inf];
          if (val === undefined) return "~";
          return formatScalar(val, 0x7c);
        });
        out += `${prefix}${vals.join("|")}\n`;
      } else if (Array.isArray(att.value)) {
        const sas = sharedArrSchemas.get(att.name);
        if (sas && i > 0) {
          out += encodeAttachmentArrayShared(prefix, fk, att.value as unknown[], depth + 2, sas);
        } else {
          out += encodeAttachmentArray(prefix, fk, att.value as unknown[], depth + 2);
        }
      } else {
        out += `${prefix}.${fk} {}\n`;
        out += encodeObject(att.value as Record<string, unknown>, depth + 2);
      }
    }
  }
  return out;
}

function encodeAttachmentArray(
  attPrefix: string,
  fk: string,
  arr: unknown[],
  depth: number
): string {
  if (arr.length === 0) return `${attPrefix}.${fk} [0]\n`;
  if (allPrimitives(arr)) {
    const vals = arr.map((v) => formatScalar(v, 0x2c));
    return `${attPrefix}.${fk} [${arr.length}]: ${vals.join(",")}\n`;
  }
  const fields = tabularFields(arr);
  if (fields) return encodeTabular(`${attPrefix}.${fk} `, arr, fields, depth);
  return encodeExpanded(`${attPrefix}.${fk} `, arr, depth);
}

function encodeAttachmentArrayShared(
  attPrefix: string,
  fk: string,
  arr: unknown[],
  depth: number,
  sharedFields: string[]
): string {
  if (arr.length === 0) return `${attPrefix}.${fk} [0]\n`;
  if (allPrimitives(arr)) {
    const vals = arr.map((v) => formatScalar(v, 0x2c));
    return `${attPrefix}.${fk} [${arr.length}]: ${vals.join(",")}\n`;
  }
  const fields = tabularFields(arr);
  if (
    fields &&
    fields.length === sharedFields.length &&
    fields.every((f, i) => f === sharedFields[i])
  ) {
    const prefix = indent(depth);
    let out = `${attPrefix}.${fk} [${arr.length}]\n`;
    for (const item of arr) {
      const obj = item as Record<string, unknown>;
      const cells = sharedFields.map((f) => {
        if (!(f in obj)) return "~";
        if (obj[f] === null || obj[f] === undefined) return "-";
        return formatScalar(obj[f], 0x7c);
      });
      out += `${prefix}${cells.join("|")}\n`;
    }
    return out;
  }
  return encodeAttachmentArray(attPrefix, fk, arr, depth);
}

function encodeExpanded(headerPrefix: string, arr: unknown[], depth: number): string {
  const prefix = indent(depth);
  let out = `${headerPrefix}[${arr.length}]\n`;
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (Array.isArray(item)) {
      out += encodeExpandedArrayItem(prefix, i, item, depth);
    } else if (typeof item === "object" && item !== null) {
      out += `${prefix}@${i} {}\n`;
      out += encodeObject(item as Record<string, unknown>, depth + 1);
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
  depth: number
): string {
  if (arr.length === 0) return `${prefix}@${idx} [0]\n`;
  if (allPrimitives(arr)) {
    const vals = arr.map((v) => formatScalar(v, 0x2c));
    return `${prefix}@${idx} [${arr.length}]: ${vals.join(",")}\n`;
  }
  const fields = tabularFields(arr);
  if (fields) return encodeTabular(`${prefix}@${idx} `, arr, fields, depth + 1);
  return encodeExpanded(`${prefix}@${idx} `, arr, depth + 1);
}

function allPrimitives(arr: unknown[]): boolean {
  return arr.every((v) => typeof v !== "object" || v === null);
}
