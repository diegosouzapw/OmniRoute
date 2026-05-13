// Gemini helper functions for translator

type JsonRecord = Record<string, unknown>;

// Unsupported JSON Schema constraints that should be removed for Antigravity.
// `additionalProperties` is handled separately so `true` can be preserved.
export const GEMINI_UNSUPPORTED_SCHEMA_KEYS = new Set([
  // Basic constraints (not supported by Gemini API)
  "minLength",
  "maxLength",
  "exclusiveMinimum",
  "exclusiveMaximum",
  "pattern",
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

// Default safety settings
export const DEFAULT_SAFETY_SETTINGS = [
  { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "OFF" },
  { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "OFF" },
  { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "OFF" },
  { category: "HARM_CATEGORY_HARASSMENT", threshold: "OFF" },
  { category: "HARM_CATEGORY_CIVIC_INTEGRITY", threshold: "OFF" },
];

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

        // 3. Handle raw data strings (e.g. {"type": "file", "data": "JVBER...", "mime_type": "..."})
        const file = toRecord(rec.file);
        const doc = toRecord(rec.document);
        const rawDataStr = rec.data || file?.data || doc?.data;
        const mimeTypeFallback =
          rec.mime_type ||
          rec.media_type ||
          file?.mime_type ||
          doc?.mime_type ||
          "application/octet-stream";
        if (typeof rawDataStr === "string" && !rawDataStr.startsWith("http")) {
          const rawData = rawDataStr.replace(/^data:[a-zA-Z0-9/+-]+;base64,/, "");
          parts.push({
            inlineData: {
              mimeType: String(mimeTypeFallback),
              data: rawData,
            },
          });
          continue;
        }

        // 4. Standard OpenAI Data URIs
        const imageUrl = toRecord(rec.image_url);
        const fileUrl = toRecord(rec.file_url);
        const fileObj = toRecord(rec.file);
        const docObj = toRecord(rec.document);
        const fileData = imageUrl?.url || fileUrl?.url || fileObj?.url || docObj?.url;
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

// Try parse JSON safely
export function tryParseJSON(str: unknown): unknown {
  if (typeof str !== "string") return str;
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
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
  } else {
    const record = obj as JsonRecord;
    // Delete unsupported keys at current level
    for (const key of Object.keys(record)) {
      if (keywords.has(key) || key.startsWith("x-")) {
        delete record[key];
      }
    }
    // Recurse into remaining values
    for (const value of Object.values(record)) {
      if (value && typeof value === "object") {
        removeUnsupportedKeywords(value, keywords);
      }
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
export function cleanJSONSchemaForAntigravity(schema: unknown): unknown {
  if (!schema || typeof schema !== "object") return schema;

  const root = cloneSchemaValue(schema);
  let cleaned = inlineLocalSchemaRefs(root, root);

  // Phase 1: Convert and prepare
  convertConstToEnum(cleaned);
  convertEnumValuesToStrings(cleaned);

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

  return cleaned;
}
