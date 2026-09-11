// Gemini helper functions for translator

import { safeParseJSON } from "./jsonUtil.ts";

type JsonRecord = Record<string, unknown>;

// Unsupported JSON Schema constraints that should be removed for Antigravity.
// `additionalProperties` is handled separately so `true` can be preserved.
export const GEMINI_UNSUPPORTED_SCHEMA_KEYS = new Set([
  // Basic constraints (not supported by Gemini API)
  "minLength",
  "maxLength",
  "exclusiveMinimum",
  "exclusiveMaximum",
  // `multipleOf` is not part of the Gemini/antigravity OpenAPI 3.0 schema subset;
  // leaving it in function_declarations triggers a hard upstream 400
  // ("Unknown name \"multipleOf\""). `minimum`/`maximum` ARE accepted and kept.
  "multipleOf",
  // OpenAI "strict" tool-calling mode embeds `strict: true/false` directly inside
  // a function's `parameters` schema (RubyLLM and other OpenAI-convention clients
  // do this by default). Gemini's function_declarations schema doesn't recognize
  // it and 400s the same way ("Unknown name \"strict\" ... Cannot find field").
  "strict",
  // Codex's multi-agent collaboration tools (spawn_agent / send_message /
  // followup_task) mark their `message` parameter schema with a non-standard
  // `encrypted: true` annotation (JsonSchema::with_encrypted). Gemini's
  // function_declarations schema doesn't recognize it and 400s the same way
  // ("Unknown name \"encrypted\" ... Cannot find field").
  "encrypted",
  // NOTE: `pattern` is intentionally NOT in this set. Antigravity (Gemini-derived
  // surface) accepts `pattern` on string constraints, and glob/grep/file-search
  // tools depend on it to express their argument regex. Removing it produced
  // upstream 400s and wrong-tool semantics (decolua/9router#1368).
  "minItems",
  "maxItems",
  "format",
  // Claude rejects these in VALIDATED mode
  "default",
  "examples",
  // JSON Schema meta keywords
  "$schema",
  "$id",
  "$anchor",
  "$dynamicRef",
  "$dynamicAnchor",
  "$vocabulary",
  "$comment",
  "$defs",
  "definitions",
  "const",
  "$ref",
  "ref",
  // Object validation keywords (not supported)
  "propertyNames",
  "patternProperties",
  "unevaluatedProperties",
  "unevaluatedItems",
  "contains",
  "minContains",
  "maxContains",
  // #9617: array uniqueness keyword — agentic-CLI tool schemas (JSON-Schema
  // generators) set this routinely and Gemini's schema parser has no field for
  // it, rejecting the whole request with "Unknown name \"uniqueItems\"".
  // Upstream 9router already strips it alongside `contains` for the same error.
  "uniqueItems",
  // Complex schema keywords (handled by flattenAnyOfOneOf/mergeAllOf)
  "anyOf",
  "oneOf",
  "allOf",
  "not",
  // Dependency keywords (not supported)
  "dependencies",
  "dependentSchemas",
  "dependentRequired",
  // Other unsupported keywords
  "title",
  "if",
  "then",
  "else",
  "contentMediaType",
  "contentEncoding",
  "contentSchema",
  "readOnly",
  "writeOnly",
  // Non-standard schema fields (not recognized by Gemini API)
  "deprecated",
  "optional",
  // VS Code / JSON Language Service extensions injected by GitHub Copilot tools (#1175)
  "enumDescriptions",
  "markdownDescription",
  "markdownEnumDescriptions",
  "enumItemLabels",
  "tags",
  // UI/Styling properties (from Cursor tools - NOT JSON Schema standard)
  "cornerRadius",
  "fillColor",
  "fontFamily",
  "fontSize",
  "fontWeight",
  "gap",
  "padding",
  "strokeColor",
  "strokeThickness",
  "textColor",
]);

export const UNSUPPORTED_SCHEMA_CONSTRAINTS = [...GEMINI_UNSUPPORTED_SCHEMA_KEYS];

// Default safety settings for the standard Gemini API surface.
//
// HARM_CATEGORY_CIVIC_INTEGRITY is intentionally NOT included here (#8231): the
// dynamic validation on some models/endpoints rejects it with a hard 400
// (`safety_settings[N]: element predicate failed`), taking down every request
// through that model. The Antigravity/Cloud Code surface already worked around
// this for #5003 (see ANTIGRAVITY_UNSUPPORTED_SAFETY_CATEGORIES in
// open-sse/executors/antigravity.ts) — this drops the same category from the
// standard-path default so behavior is consistent across Gemini surfaces. A
// caller that explicitly supplies safetySettings (including one that itself
// requests CIVIC_INTEGRITY) is still honored as-is — only this unconditional
// default is scoped down.
export const DEFAULT_SAFETY_SETTINGS = [
  { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "OFF" },
  { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "OFF" },
  { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "OFF" },
  { category: "HARM_CATEGORY_HARASSMENT", threshold: "OFF" },
];

function normalizeAudioMimeType(format: unknown): string {
  const normalized =
    typeof format === "string" && format.trim() ? format.trim().toLowerCase() : "wav";
  if (normalized === "mp3") {
    return "audio/mpeg";
  }
  return `audio/${normalized}`;
}

// Convert OpenAI content to Gemini parts
export function convertOpenAIContentToParts(content: unknown): JsonRecord[] {
  const parts: JsonRecord[] = [];

  if (typeof content === "string") {
    parts.push({ text: content });
  } else if (Array.isArray(content)) {
    for (const item of content) {
      const rec = toRecord(item);
      if (rec.type === "text") {
        parts.push({ text: rec.text });
      } else if (rec.type === "input_audio" || rec.type === "audio") {
        const audio = toRecord(rec.input_audio || rec.audio);
        if (typeof audio.data === "string" && audio.data) {
          parts.push({
            inlineData: {
              mimeType: normalizeAudioMimeType(audio.format),
              data: audio.data.replace(/^data:[a-zA-Z0-9/+-]+;base64,/, ""),
            },
          });
        }
      } else if (rec.type === "audio_url") {
        // OpenAI-style audio_url (data: URI). Mirrors the image_url data-URL
        // parser below but produces an audio inlineData part (#913).
        const audioUrl = toRecord(rec.audio_url);
        const url = typeof audioUrl.url === "string" ? audioUrl.url : "";
        if (url.startsWith("data:")) {
          const commaIndex = url.indexOf(",");
          if (commaIndex !== -1) {
            const mimePart = url.substring(5, commaIndex); // skip "data:"
            const data = url.substring(commaIndex + 1);
            const mimeType = mimePart.split(";")[0] || "audio/wav";
            parts.push({ inlineData: { mimeType, data } });
          }
        }
      } else {
        // 1. Handle Gemini native inline_data injected into OpenAI arrays (e.g. Cherry Studio)
        const geminiInline = toRecord(rec.inline_data || rec.inlineData);
        if (geminiInline?.data) {
          parts.push({
            inlineData: {
              mimeType: String(
                geminiInline.mime_type || geminiInline.mimeType || "application/pdf"
              ),
              data: String(geminiInline.data).replace(/^data:[a-zA-Z0-9/+-]+;base64,/, ""),
            },
          });
          continue;
        }

        // 2. Handle Claude-style source blocks commonly used by AI clients
        const source = toRecord(rec.source);
        if (source?.type === "base64" && source?.data) {
          parts.push({
            inlineData: {
              mimeType: String(source.media_type || "application/pdf"),
              data: String(source.data).replace(/^data:[a-zA-Z0-9/+-]+;base64,/, ""),
            },
          });
          continue;
        }

        // 3. Handle raw data strings (e.g. {"type": "file", "data": "JVBER...", "mime_type": "..."}).
        //    Also accept the Responses-API shape {"type":"input_file","file_data":"JVBER...","filename":...}
        //    AND the OpenAI Chat Completions shape
        //    {"type":"file","file":{"filename":...,"file_data":"data:<mime>;base64,..."}} so PDFs and
        //    videos reach Gemini instead of being silently dropped (#2515). Gemini reads
        //    application/pdf and video/* natively via inlineData, exactly like images.
        const file = toRecord(rec.file);
        const doc = toRecord(rec.document);
        const rawDataStr =
          rec.data || rec.file_data || file?.data || file?.file_data || doc?.data || doc?.file_data;
        if (typeof rawDataStr === "string" && !rawDataStr.startsWith("http")) {
          // Prefer the mime embedded in the data: URI (e.g. application/pdf, video/mp4) so
          // documents and videos are not mislabeled as the fallback; the fallback applies
          // only to bare base64 that carries no data: prefix.
          let mimeType =
            rec.mime_type ||
            rec.media_type ||
            file?.mime_type ||
            doc?.mime_type ||
            "application/pdf";
          if (rawDataStr.startsWith("data:")) {
            const commaIndex = rawDataStr.indexOf(",");
            if (commaIndex !== -1) {
              const parsedMime = rawDataStr.substring(5, commaIndex).split(";")[0];
              if (parsedMime) mimeType = parsedMime;
            }
          }
          const rawData = rawDataStr.replace(/^data:[a-zA-Z0-9/+-]+;base64,/, "");
          parts.push({
            inlineData: {
              mimeType: String(mimeType),
              data: rawData,
            },
          });
          continue;
        }

        // 4. Standard OpenAI Data URIs
        const imageUrl = toRecord(rec.image_url);
        const imageObj = toRecord(rec.image);
        const fileUrl = toRecord(rec.file_url);
        const fileObj = toRecord(rec.file);
        const docObj = toRecord(rec.document);
        // `file_url` is a top-level string on the Responses-API input_file shape (#2515).
        // `rec.image` (with nested {url}) is emitted by some MCP tool wrappers and
        // translation layers as an alternative to `rec.image_url` (#2807).
        const fileData =
          (typeof rec.file_url === "string" ? rec.file_url : undefined) ||
          // AI SDK-style image part: { type: "image", image: "data:...;base64,..." } (#1330)
          (typeof rec.image === "string" ? rec.image : undefined) ||
          imageUrl?.url ||
          imageObj?.url ||
          fileUrl?.url ||
          fileObj?.url ||
          docObj?.url;
        if (typeof fileData === "string" && fileData.startsWith("data:")) {
          const commaIndex = fileData.indexOf(",");
          if (commaIndex !== -1) {
            const mimePart = fileData.substring(5, commaIndex); // skip "data:"
            const data = fileData.substring(commaIndex + 1);
            const mimeType = mimePart.split(";")[0];

            parts.push({
              inlineData: { mimeType, data },
            });
          }
        } else if (typeof fileData === "string" && /^https?:\/\//i.test(fileData)) {
          // Remote URLs cannot be embedded as inlineData (which requires base64),
          // but Gemini's Part schema natively accepts `fileData: { fileUri }` for
          // HTTP/HTTPS sources — the model fetches the asset itself. Pass the URL
          // through instead of dropping it (#2807; ported from upstream PR #344).
          // The MIME type is intentionally `image/*` because we do not block on
          // a HEAD request to sniff it; Gemini infers the concrete type on fetch.
          parts.push({
            fileData: { fileUri: fileData, mimeType: "image/*" },
          });
        }
      }
    }
  }

  return parts;
}

// Extract text content from OpenAI content
export function extractTextContent(content: unknown): string {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content
      .map((item) => toRecord(item))
      .filter((c) => c.type === "text")
      .map((c) => (typeof c.text === "string" ? c.text : ""))
      .join("");
  }
  return "";
}

// Try parse JSON safely (null fallback on parse error; re-export keeps legacy API).
export function tryParseJSON(str: unknown): unknown {
  return safeParseJSON(str, null);
}

// Generate request ID
export function generateRequestId() {
  return `agent-${crypto.randomUUID()}`;
}

// Generate session ID
export function generateSessionId() {
  const arr = new BigUint64Array(1);
  globalThis.crypto.getRandomValues(arr);
  const num = arr[0] % 9000000000000000000n;
  return `-${num.toString()}`;
}

function cloneSchemaValue(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map((item) => cloneSchemaValue(item));
  }
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, nestedValue]) => [key, cloneSchemaValue(nestedValue)])
    );
  }
  return value;
}

function toRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as JsonRecord) : {};
}

// Maps of schemas — the container itself is not a bare property map (#12269).
const SCHEMA_MAP_KEYS = new Set([
  "properties",
  "$defs",
  "definitions",
  "patternProperties",
  "dependentSchemas",
]);

const SCHEMA_NODE_KEYS = new Set([
  "additionalItems",
  "additionalProperties",
  "contentSchema",
  "contains",
  "default",
  "dependencies",
  "dependentRequired",
  "dependentSchemas",
  "discriminator",
  "else",
  "example",
  "examples",
  "externalDocs",
  "if",
  "patternProperties",
  "propertyNames",
  "then",
  "unevaluatedItems",
  "unevaluatedProperties",
  "xml",
]);

function isSchemaNode(record: JsonRecord): boolean {
  if (Object.keys(record).some((key) => key.startsWith("x-") || SCHEMA_NODE_KEYS.has(key))) {
    return true;
  }
  if (typeof record.type === "string" || Array.isArray(record.type)) return true;
  if (record.properties !== undefined || Array.isArray(record.required)) return true;
  if (record.items !== undefined || record.prefixItems !== undefined) return true;
  if (record.anyOf !== undefined || record.oneOf !== undefined || record.allOf !== undefined) {
    return true;
  }
  if (record.not !== undefined || record.$ref !== undefined || record.enum !== undefined) {
    return true;
  }
  return record.const !== undefined;
}

function isBarePropertyMap(record: JsonRecord): boolean {
  const keys = Object.keys(record);
  if (keys.length === 0 || isSchemaNode(record)) return false;
  return keys.every((key) => {
    const value = record[key];
    return Boolean(value) && typeof value === "object" && !Array.isArray(value);
  });
}

function promoteBooleanRequired(record: JsonRecord): void {
  const properties = toRecord(record.properties);
  if (Object.keys(properties).length === 0) return;

  const required = Array.isArray(record.required)
    ? record.required.filter((field): field is string => typeof field === "string")
    : [];

  for (const [name, schema] of Object.entries(properties)) {
    if (!schema || typeof schema !== "object" || Array.isArray(schema)) continue;
    const child = schema as JsonRecord;
    if (child.required === true) {
      if (!required.includes(name)) required.push(name);
    }
    if ("required" in child && !Array.isArray(child.required)) {
      delete child.required;
    }
  }

  if (required.length > 0) {
    record.required = required;
  } else if (!Array.isArray(record.required)) {
    delete record.required;
  }
}

// Pre-pass for Cloud Code (#12269): boolean `required` on a property and nested
// bare property maps both survive the later phases and 400 Gemini's proto.
// Mirrors CLIProxyAPI normalizeMalformedSchemaObjects.
function normalizeMalformedSchemaObjects(obj: unknown, parentKey?: string): void {
  if (!obj || typeof obj !== "object") return;

  if (Array.isArray(obj)) {
    for (const item of obj) {
      normalizeMalformedSchemaObjects(item, parentKey);
    }
    return;
  }

  const record = obj as JsonRecord;
  if (parentKey === undefined || !SCHEMA_MAP_KEYS.has(parentKey)) {
    if (isBarePropertyMap(record)) {
      const props = { ...record };
      for (const key of Object.keys(record)) {
        delete record[key];
      }
      record.type = "object";
      record.properties = props;
    }
  }

  promoteBooleanRequired(record);

  for (const [key, value] of Object.entries(record)) {
    if (value && typeof value === "object") {
      normalizeMalformedSchemaObjects(value, key);
    }
  }
}

function decodeJsonPointerSegment(segment: unknown): string {
  return String(segment).replace(/~1/g, "/").replace(/~0/g, "~");
}

function resolveLocalReference(root: unknown, ref: unknown): unknown | null {
  if (typeof ref !== "string" || !ref.startsWith("#/")) return null;

  let current: unknown = root;
  const segments = ref
    .slice(2)
    .split("/")
    .filter(Boolean)
    .map((segment) => decodeJsonPointerSegment(segment));

  for (const segment of segments) {
    const currentRecord = toRecord(current);
    if (!(segment in currentRecord)) {
      return null;
    }
    current = currentRecord[segment];
  }

  return current;
}

function inlineLocalSchemaRefs(
  node: unknown,
  root: unknown,
  activeRefs: Set<string> = new Set<string>()
): unknown {
  if (Array.isArray(node)) {
    return node.map((item) => inlineLocalSchemaRefs(item, root, activeRefs));
  }

  if (!node || typeof node !== "object") {
    return node;
  }

  const record: JsonRecord = { ...toRecord(node) };
  const ref = typeof record.$ref === "string" ? record.$ref : "";
  if (ref.startsWith("#/$defs/") || ref.startsWith("#/definitions/")) {
    const rest = { ...record };
    delete rest.$ref;

    if (activeRefs.has(ref)) {
      return inlineLocalSchemaRefs(rest, root, activeRefs);
    }

    const resolved = resolveLocalReference(root, ref);
    if (!resolved || typeof resolved !== "object") {
      return inlineLocalSchemaRefs(rest, root, activeRefs);
    }

    activeRefs.add(ref);
    const merged = {
      ...toRecord(inlineLocalSchemaRefs(cloneSchemaValue(resolved), root, activeRefs)),
      ...rest,
    };
    activeRefs.delete(ref);
    return inlineLocalSchemaRefs(merged, root, activeRefs);
  }

  return Object.fromEntries(
    Object.entries(record).map(([key, value]) => [
      key,
      inlineLocalSchemaRefs(value, root, activeRefs),
    ])
  );
}

// Helper: Remove unsupported keywords recursively from object/array
function removeUnsupportedKeywords(obj: unknown, keywords: Set<string>): void {
  if (!obj || typeof obj !== "object") return;

  if (Array.isArray(obj)) {
    for (const item of obj) {
      removeUnsupportedKeywords(item, keywords);
    }
    return;
  }

  const record = obj as JsonRecord;
  // Delete unsupported *constraint* keywords at the current schema level.
  for (const key of Object.keys(record)) {
    if (keywords.has(key) || key.startsWith("x-")) {
      delete record[key];
    }
  }
  // Recurse into remaining values. `properties` is a map keyed by arbitrary,
  // user-defined property NAMES — a tool may legitimately declare a property
  // called `pattern`, `enum`, `minLength`, etc. Descend into each property's
  // subschema, but never run keyword-deletion against the property names
  // themselves, or glob/grep-style tools lose their `pattern` argument (#1368).
  for (const [key, value] of Object.entries(record)) {
    if (!value || typeof value !== "object") continue;
    if (key === "properties" && !Array.isArray(value)) {
      for (const subSchema of Object.values(value as JsonRecord)) {
        removeUnsupportedKeywords(subSchema, keywords);
      }
    } else {
      removeUnsupportedKeywords(value, keywords);
    }
  }
}

function normalizeAdditionalProperties(obj: unknown): void {
  if (!obj || typeof obj !== "object") return;

  if (Array.isArray(obj)) {
    for (const item of obj) {
      normalizeAdditionalProperties(item);
    }
    return;
  }

  const record = obj as JsonRecord;

  // Gemini API does not support `additionalProperties` at all in function_declarations
  // schemas (returns 400 "Unknown name"). Since Gemini defaults to allowing additional
  // properties anyway, stripping it unconditionally is safe and prevents errors (#1421).
  if ("additionalProperties" in record) {
    delete record.additionalProperties;
  }

  for (const value of Object.values(record)) {
    if (value && typeof value === "object") {
      normalizeAdditionalProperties(value);
    }
  }
}

// Convert const to enum
function convertConstToEnum(obj: unknown): void {
  if (!obj || typeof obj !== "object") return;

  const record = obj as JsonRecord;
  if (record.const !== undefined && !record.enum) {
    record.enum = [record.const];
    delete record.const;
  }

  for (const value of Object.values(record)) {
    if (value && typeof value === "object") {
      convertConstToEnum(value);
    }
  }
}

// Convert enum values to strings (Gemini requires string enum values)
// For integer types, remove enum entirely as Gemini doesn't support it
function convertEnumValuesToStrings(obj: unknown): void {
  if (!obj || typeof obj !== "object") return;

  const record = obj as JsonRecord;
  if (record.enum && Array.isArray(record.enum)) {
    // Gemini only supports enum for string types, not integer
    if (record.type === "integer" || record.type === "number") {
      delete record.enum;
    } else {
      record.enum = record.enum.map((v: unknown) => String(v));
      if (!record.type) {
        record.type = "string";
      }
    }
  }

  for (const value of Object.values(record)) {
    if (value && typeof value === "object") {
      convertEnumValuesToStrings(value);
    }
  }
}

// Merge allOf schemas
function mergeAllOf(obj: unknown): void {
  if (!obj || typeof obj !== "object") return;

  const record = obj as JsonRecord;
  if (record.allOf && Array.isArray(record.allOf)) {
    const merged: { properties?: JsonRecord; required?: string[] } = {};

    for (const item of record.allOf) {
      const itemRecord = toRecord(item);
      const itemProperties = toRecord(itemRecord.properties);
      if (Object.keys(itemProperties).length > 0) {
        if (!merged.properties) merged.properties = {};
        Object.assign(merged.properties, itemProperties);
      }
      if (itemRecord.required && Array.isArray(itemRecord.required)) {
        if (!merged.required) merged.required = [];
        for (const req of itemRecord.required) {
          if (typeof req === "string" && !merged.required.includes(req)) {
            merged.required.push(req);
          }
        }
      }
    }

    delete record.allOf;
    if (merged.properties)
      record.properties = { ...toRecord(record.properties), ...merged.properties };
    if (merged.required) {
      const required = Array.isArray(record.required)
        ? record.required.filter((item): item is string => typeof item === "string")
        : [];
      record.required = [...required, ...merged.required];
    }
  }

  for (const value of Object.values(record)) {
    if (value && typeof value === "object") {
      mergeAllOf(value);
    }
  }
}

// Select best schema from anyOf/oneOf
function selectBest(items: unknown[]): number {
  let bestIdx = 0;
  let bestScore = -1;

  for (let i = 0; i < items.length; i++) {
    const item = toRecord(items[i]);
    let score = 0;
    const type = item.type;

    if (type === "object" || item.properties) {
      score = 3;
    } else if (type === "array" || item.items) {
      score = 2;
    } else if (type && type !== "null") {
      score = 1;
    }

    if (score > bestScore) {
      bestScore = score;
      bestIdx = i;
    }
  }

  return bestIdx;
}

// Flatten anyOf/oneOf
function flattenAnyOfOneOf(obj: unknown): void {
  if (!obj || typeof obj !== "object") return;

  const record = obj as JsonRecord;
  if (record.anyOf && Array.isArray(record.anyOf) && record.anyOf.length > 0) {
    const nonNullSchemas = record.anyOf.filter((s) => s && toRecord(s).type !== "null");
    if (nonNullSchemas.length > 0) {
      const bestIdx = selectBest(nonNullSchemas);
      const selected = nonNullSchemas[bestIdx];
      delete record.anyOf;
      Object.assign(record, toRecord(selected));
    }
  }

  if (record.oneOf && Array.isArray(record.oneOf) && record.oneOf.length > 0) {
    const nonNullSchemas = record.oneOf.filter((s) => s && toRecord(s).type !== "null");
    if (nonNullSchemas.length > 0) {
      const bestIdx = selectBest(nonNullSchemas);
      const selected = nonNullSchemas[bestIdx];
      delete record.oneOf;
      Object.assign(record, toRecord(selected));
    }
  }

  for (const value of Object.values(record)) {
    if (value && typeof value === "object") {
      flattenAnyOfOneOf(value);
    }
  }
}

// Flatten type arrays
function flattenTypeArrays(obj: unknown): void {
  if (!obj || typeof obj !== "object") return;

  const record = obj as JsonRecord;
  if (record.type && Array.isArray(record.type)) {
    const nonNullTypes = record.type.filter((t) => t !== "null");
    record.type = nonNullTypes.length > 0 ? nonNullTypes[0] : "string";
  }

  for (const value of Object.values(record)) {
    if (value && typeof value === "object") {
      flattenTypeArrays(value);
    }
  }
}

// Clean JSON Schema for Antigravity API compatibility - removes unsupported keywords recursively
// Reference: CLIProxyAPI/internal/util/gemini_schema.go
/**
 * JSON Schema spells a nullable field as a union — `type: ["string","null"]`,
 * or an anyOf/oneOf with a `{"type":"null"}` branch. Gemini's Schema proto has
 * no unions and spells it as a sibling key, `nullable: true`. Record that
 * before Phase 2 flattens the union and destroys the evidence (#12308).
 *
 * Response schemas only (opt-in below). For a tool parameter, flattening to a
 * concrete type is correct — Gemini wants one, and the caller decides what an
 * absent argument means. For a response schema the union is the only thing
 * telling the model that "nothing" is a legal answer; without it a model with
 * nothing to say returns the string "null" or fabricates a value, and either
 * reaches the client as schema-conformant data.
 *
 * `nullable` survives the rest of the pipeline for free: it is absent from
 * GEMINI_UNSUPPORTED_SCHEMA_KEYS, and flattenAnyOfOneOf merges the surviving
 * branch with Object.assign, which cannot clobber a key the branch lacks.
 */
function preserveNullable(obj: unknown): void {
  if (!obj || typeof obj !== "object") return;

  const record = obj as JsonRecord;
  const hasNullBranch = (list: unknown): boolean =>
    Array.isArray(list) && list.some((s) => s && toRecord(s).type === "null");

  if (
    (Array.isArray(record.type) && record.type.includes("null")) ||
    hasNullBranch(record.anyOf) ||
    hasNullBranch(record.oneOf)
  ) {
    record.nullable = true;
  }

  for (const value of Object.values(record)) {
    if (value && typeof value === "object") {
      preserveNullable(value);
    }
  }
}

export function cleanJSONSchemaForAntigravity(
  schema: unknown,
  options: { preserveNullable?: boolean } = {}
): unknown {
  if (!schema || typeof schema !== "object") return schema;

  const root = cloneSchemaValue(schema);
  let cleaned = inlineLocalSchemaRefs(root, root);

  // Phase 0: #12269 malformed skill/tool schemas (boolean required, bare maps).
  normalizeMalformedSchemaObjects(cleaned);

  // Phase 1: Convert and prepare
  convertConstToEnum(cleaned);
  convertEnumValuesToStrings(cleaned);

  // Phase 1b: response schemas only — record nullability while the union
  // still exists; afterwards there is nothing left to detect (#12308).
  if (options.preserveNullable) preserveNullable(cleaned);

  // Phase 2: Flatten complex structures
  mergeAllOf(cleaned);
  flattenAnyOfOneOf(cleaned);
  flattenTypeArrays(cleaned);

  // Phase 3: Preserve the only supported additionalProperties shape before keyword cleanup.
  normalizeAdditionalProperties(cleaned);

  // Phase 4: Remove all unsupported keywords at ALL levels (including inside arrays).
  removeUnsupportedKeywords(cleaned, GEMINI_UNSUPPORTED_SCHEMA_KEYS);

  // Phase 5: Cleanup required fields recursively.
  function cleanupRequired(obj: unknown): void {
    if (!obj || typeof obj !== "object") return;

    const record = obj as JsonRecord;
    if (record.required && Array.isArray(record.required) && record.properties) {
      const properties = toRecord(record.properties);
      const validRequired = record.required.filter(
        (field) =>
          typeof field === "string" && Object.prototype.hasOwnProperty.call(properties, field)
      );
      if (validRequired.length === 0) {
        delete record.required;
      } else {
        record.required = validRequired;
      }
    }

    // Recurse into nested objects
    for (const value of Object.values(record)) {
      if (value && typeof value === "object") {
        cleanupRequired(value);
      }
    }
  }

  cleanupRequired(cleaned);

  // Phase 6: Add placeholder for empty object schemas (Antigravity requirement).
  function addPlaceholders(obj: unknown): void {
    if (!obj || typeof obj !== "object") return;

    const record = obj as JsonRecord;
    if (record.type === "object") {
      if (!record.properties || Object.keys(toRecord(record.properties)).length === 0) {
        record.properties = {
          reason: {
            type: "string",
            description: "Brief explanation of why you are calling this tool",
          },
        };
        record.required = ["reason"];
      }
    }

    // Recurse into nested objects
    for (const value of Object.values(record)) {
      if (value && typeof value === "object") {
        addPlaceholders(value);
      }
    }
  }

  addPlaceholders(cleaned);

  // Phase 7: Recursive type:"object" injection for nested schemas (#9268).
  // Gemini/Vertex requires every node with properties/required to have an explicit
  // `type: "object"`. Some clients (e.g. Composio-exported tools) emit nested
  // schemas with `properties` but no `type`, causing a Gemini 400. Follow the
  // `removeUnsupportedKeywords()`/`addPlaceholders()` visitor pattern.
  function injectObjectType(obj: unknown): void {
    if (!obj || typeof obj !== "object") return;

    if (Array.isArray(obj)) {
      for (const item of obj) {
        injectObjectType(item);
      }
      return;
    }

    const record = obj as JsonRecord;
    if (!record.type && (record.properties !== undefined || record.required !== undefined)) {
      record.type = "object";
    }

    // Recurse into remaining values.
    for (const value of Object.values(record)) {
      if (value && typeof value === "object") {
        injectObjectType(value);
      }
    }
  }

  injectObjectType(cleaned);

  // Phase 8: Ensure array types have an items schema (#10578).
  // Gemini strictly requires array parameters to define their `items` schema.
  // If an MCP tool defines an array but forgets the items, inject a safe default.
  function ensureArrayItems(obj: unknown): void {
    if (!obj || typeof obj !== "object") return;

    if (Array.isArray(obj)) {
      for (const item of obj) {
        ensureArrayItems(item);
      }
      return;
    }

    const record = obj as JsonRecord;
    if (record.type === "array" && !record.items) {
      record.items = { type: "string" };
    }

    // Recurse into remaining values.
    for (const value of Object.values(record)) {
      if (value && typeof value === "object") {
        ensureArrayItems(value);
      }
    }
  }

  ensureArrayItems(cleaned);

  return cleaned;
}
