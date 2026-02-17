// Gemini helper functions for translator

// Unsupported JSON Schema constraints that should be removed for Antigravity
// Reference: CLIProxyAPI/internal/util/gemini_schema.go (removeUnsupportedKeywords)
export const UNSUPPORTED_SCHEMA_CONSTRAINTS = [
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
  "$defs",
  "definitions",
  "const",
  "$ref",
  // Object validation keywords (not supported)
  "additionalProperties",
  "propertyNames",
  "patternProperties",
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
];

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
      } else if (item.type === "image_url" && item.image_url?.url?.startsWith("data:")) {
        const url = item.image_url.url;
        const commaIndex = url.indexOf(",");
        if (commaIndex !== -1) {
          const mimePart = url.substring(5, commaIndex); // skip "data:"
          const data = url.substring(commaIndex + 1);
          const mimeType = mimePart.split(";")[0];

          parts.push({
            inlineData: { mime_type: mimeType, data: data },
          });
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
  return `-${Math.floor(Math.random() * 9000000000000000000)}`;
}

// Generate project ID
export function generateProjectId() {
  const adjectives = ["useful", "bright", "swift", "calm", "bold"];
  const nouns = ["fuze", "wave", "spark", "flow", "core"];
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${adj}-${noun}-${crypto.randomUUID().slice(0, 5)}`;
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
    for (const keyword of keywords) {
      if (keyword in obj) {
        delete obj[keyword];
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
function convertEnumValuesToStrings(obj) {
  if (!obj || typeof obj !== "object") return;

  if (obj.enum && Array.isArray(obj.enum)) {
    obj.enum = obj.enum.map((v) => String(v));
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
    const merged = {};

    for (const item of obj.allOf) {
      if (item.properties) {
        // @ts-ignore
        if (!merged.properties) merged.properties = {};
        // @ts-ignore
        Object.assign(merged.properties, item.properties);
      }
      if (item.required && Array.isArray(item.required)) {
        // @ts-ignore
        if (!merged.required) merged.required = [];
        for (const req of item.required) {
          // @ts-ignore
          if (!merged.required.includes(req)) {
            // @ts-ignore
            merged.required.push(req);
          }
        }
      }
    }

    delete obj.allOf;
    // @ts-ignore
    if (merged.properties) obj.properties = { ...obj.properties, ...merged.properties };
    // @ts-ignore
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

  // Mutate directly (schema is only used once per request)
  let cleaned = schema;

  // Phase 1: Convert and prepare
  convertConstToEnum(cleaned);
  convertEnumValuesToStrings(cleaned);

  // Phase 2: Flatten complex structures
  mergeAllOf(cleaned);
  flattenAnyOfOneOf(cleaned);
  flattenTypeArrays(cleaned);

  // Phase 3: Remove all unsupported keywords at ALL levels (including inside arrays)
  removeUnsupportedKeywords(cleaned, UNSUPPORTED_SCHEMA_CONSTRAINTS);

  // Phase 4: Cleanup required fields recursively
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

  // Phase 5: Add placeholder for empty object schemas (Antigravity requirement)
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
