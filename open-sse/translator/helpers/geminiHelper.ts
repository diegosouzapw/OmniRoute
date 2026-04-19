// Gemini helper functions for translator

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
export function convertOpenAIContentToParts(content) {
  const parts = [];

  if (typeof content === "string") {
    parts.push({ text: content });
  } else if (Array.isArray(content)) {
    for (const item of content) {
      if (item.type === "text") {
        parts.push({ text: item.text });
      } else {
        // 1. Handle Gemini native inline_data injected into OpenAI arrays (e.g. Cherry Studio)
        const geminiInline = item.inline_data || item.inlineData;
        if (geminiInline?.data) {
          parts.push({
            inlineData: {
              mimeType: geminiInline.mime_type || geminiInline.mimeType || "application/pdf",
              data: geminiInline.data.replace(/^data:[a-zA-Z0-9/+-]+;base64,/, ""),
            },
          });
          continue;
        }

        // 2. Handle Claude-style source blocks commonly used by AI clients
        if (item.source?.type === "base64" && item.source?.data) {
          parts.push({
            inlineData: {
              mimeType: item.source.media_type || "application/pdf",
              data: item.source.data.replace(/^data:[a-zA-Z0-9/+-]+;base64,/, ""),
            },
          });
          continue;
        }

        // 3. Handle raw data strings (e.g. {"type": "file", "data": "JVBER...", "mime_type": "..."})
        const rawDataStr = item.data || item.file?.data || item.document?.data;
        const mimeTypeFallback =
          item.mime_type ||
          item.media_type ||
          item.file?.mime_type ||
          item.document?.mime_type ||
          "application/octet-stream";
        if (typeof rawDataStr === "string" && !rawDataStr.startsWith("http")) {
          const rawData = rawDataStr.replace(/^data:[a-zA-Z0-9/+-]+;base64,/, "");
          parts.push({
            inlineData: {
              mimeType: mimeTypeFallback,
              data: rawData,
            },
          });
          continue;
        }

        // 4. Standard OpenAI Data URIs
        const fileData =
          item.image_url?.url || item.file_url?.url || item.file?.url || item.document?.url;
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
export function extractTextContent(content) {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) {
    return content
      .filter((c) => c.type === "text")
      .map((c) => c.text)
      .join("");
  }
  return "";
}

// Try parse JSON safely
export function tryParseJSON(str) {
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

function cloneSchemaValue(value) {
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

function toRecord(value) {
  return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}

function decodeJsonPointerSegment(segment) {
  return String(segment).replace(/~1/g, "/").replace(/~0/g, "~");
}

function resolveLocalReference(root, ref) {
  if (typeof ref !== "string" || !ref.startsWith("#/")) return null;

  let current = root;
  const segments = ref
    .slice(2)
    .split("/")
    .filter(Boolean)
    .map((segment) => decodeJsonPointerSegment(segment));

  for (const segment of segments) {
    if (!current || typeof current !== "object" || !(segment in current)) {
      return null;
    }
    current = current[segment];
  }

  return current;
}

function inlineLocalSchemaRefs(node, root, activeRefs = new Set()) {
  if (Array.isArray(node)) {
    return node.map((item) => inlineLocalSchemaRefs(item, root, activeRefs));
  }

  if (!node || typeof node !== "object") {
    return node;
  }

  const record = { ...node };
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
function removeUnsupportedKeywords(obj, keywords) {
  if (!obj || typeof obj !== "object") return;

  if (Array.isArray(obj)) {
    for (const item of obj) {
      removeUnsupportedKeywords(item, keywords);
    }
  } else {
    // Delete unsupported keys at current level
    for (const key of Object.keys(obj)) {
      if (keywords.has(key) || key.startsWith("x-")) {
        delete obj[key];
      }
    }
    // Recurse into remaining values
    for (const value of Object.values(obj)) {
      if (value && typeof value === "object") {
        removeUnsupportedKeywords(value, keywords);
      }
    }
  }
}

function normalizeAdditionalProperties(obj) {
  if (!obj || typeof obj !== "object") return;

  if (Array.isArray(obj)) {
    for (const item of obj) {
      normalizeAdditionalProperties(item);
    }
    return;
  }

  // Gemini API does not support `additionalProperties` at all in function_declarations
  // schemas (returns 400 "Unknown name"). Since Gemini defaults to allowing additional
  // properties anyway, stripping it unconditionally is safe and prevents errors (#1421).
  if ("additionalProperties" in obj) {
    delete obj.additionalProperties;
  }

  for (const value of Object.values(obj)) {
    if (value && typeof value === "object") {
      normalizeAdditionalProperties(value);
    }
  }
}

// Convert const to enum
function convertConstToEnum(obj) {
  if (!obj || typeof obj !== "object") return;

  if (obj.const !== undefined && !obj.enum) {
    obj.enum = [obj.const];
    delete obj.const;
  }

  for (const value of Object.values(obj)) {
    if (value && typeof value === "object") {
      convertConstToEnum(value);
    }
  }
}

// Convert enum values to strings (Gemini requires string enum values)
// For integer types, remove enum entirely as Gemini doesn't support it
function convertEnumValuesToStrings(obj) {
  if (!obj || typeof obj !== "object") return;

  if (obj.enum && Array.isArray(obj.enum)) {
    // Gemini only supports enum for string types, not integer
    if (obj.type === "integer" || obj.type === "number") {
      delete obj.enum;
    } else {
      obj.enum = obj.enum.map((v) => String(v));
      if (!obj.type) {
        obj.type = "string";
      }
    }
  }

  for (const value of Object.values(obj)) {
    if (value && typeof value === "object") {
      convertEnumValuesToStrings(value);
    }
  }
}

// Merge allOf schemas
function mergeAllOf(obj) {
  if (!obj || typeof obj !== "object") return;

  if (obj.allOf && Array.isArray(obj.allOf)) {
    const merged: { properties?: Record<string, unknown>; required?: string[] } = {};

    for (const item of obj.allOf) {
      if (item.properties) {
        if (!merged.properties) merged.properties = {};
        Object.assign(merged.properties, item.properties);
      }
      if (item.required && Array.isArray(item.required)) {
        if (!merged.required) merged.required = [];
        for (const req of item.required) {
          if (!merged.required.includes(req)) {
            merged.required.push(req);
          }
        }
      }
    }

    delete obj.allOf;
    if (merged.properties) obj.properties = { ...obj.properties, ...merged.properties };
    if (merged.required) obj.required = [...(obj.required || []), ...merged.required];
  }

  for (const value of Object.values(obj)) {
    if (value && typeof value === "object") {
      mergeAllOf(value);
    }
  }
}

// Select best schema from anyOf/oneOf
function selectBest(items) {
  let bestIdx = 0;
  let bestScore = -1;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
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
function flattenAnyOfOneOf(obj) {
  if (!obj || typeof obj !== "object") return;

  if (obj.anyOf && Array.isArray(obj.anyOf) && obj.anyOf.length > 0) {
    const nonNullSchemas = obj.anyOf.filter((s) => s && s.type !== "null");
    if (nonNullSchemas.length > 0) {
      const bestIdx = selectBest(nonNullSchemas);
      const selected = nonNullSchemas[bestIdx];
      delete obj.anyOf;
      Object.assign(obj, selected);
    }
  }

  if (obj.oneOf && Array.isArray(obj.oneOf) && obj.oneOf.length > 0) {
    const nonNullSchemas = obj.oneOf.filter((s) => s && s.type !== "null");
    if (nonNullSchemas.length > 0) {
      const bestIdx = selectBest(nonNullSchemas);
      const selected = nonNullSchemas[bestIdx];
      delete obj.oneOf;
      Object.assign(obj, selected);
    }
  }

  for (const value of Object.values(obj)) {
    if (value && typeof value === "object") {
      flattenAnyOfOneOf(value);
    }
  }
}

// Flatten type arrays
function flattenTypeArrays(obj) {
  if (!obj || typeof obj !== "object") return;

  if (obj.type && Array.isArray(obj.type)) {
    const nonNullTypes = obj.type.filter((t) => t !== "null");
    obj.type = nonNullTypes.length > 0 ? nonNullTypes[0] : "string";
  }

  for (const value of Object.values(obj)) {
    if (value && typeof value === "object") {
      flattenTypeArrays(value);
    }
  }
}

// Clean JSON Schema for Antigravity API compatibility - removes unsupported keywords recursively
// Reference: CLIProxyAPI/internal/util/gemini_schema.go
export function cleanJSONSchemaForAntigravity(schema) {
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
  function cleanupRequired(obj) {
    if (!obj || typeof obj !== "object") return;

    if (obj.required && Array.isArray(obj.required) && obj.properties) {
      const validRequired = obj.required.filter((field) =>
        Object.prototype.hasOwnProperty.call(obj.properties, field)
      );
      if (validRequired.length === 0) {
        delete obj.required;
      } else {
        obj.required = validRequired;
      }
    }

    // Recurse into nested objects
    for (const value of Object.values(obj)) {
      if (value && typeof value === "object") {
        cleanupRequired(value);
      }
    }
  }

  cleanupRequired(cleaned);

  // Phase 6: Add placeholder for empty object schemas (Antigravity requirement).
  function addPlaceholders(obj) {
    if (!obj || typeof obj !== "object") return;

    if (obj.type === "object") {
      if (!obj.properties || Object.keys(obj.properties).length === 0) {
        obj.properties = {
          reason: {
            type: "string",
            description: "Brief explanation of why you are calling this tool",
          },
        };
        obj.required = ["reason"];
      }
    }

    // Recurse into nested objects
    for (const value of Object.values(obj)) {
      if (value && typeof value === "object") {
        addPlaceholders(value);
      }
    }
  }

  addPlaceholders(cleaned);

  return cleaned;
}
