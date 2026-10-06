/**
 * Gemini rejects several standard JSON-Schema keywords in tool declarations
 * and answers `400 INVALID_ARGUMENT` for the whole request when it meets one.
 * The keywords carry no meaning Gemini would honour anyway, so stripping them
 * costs nothing and is what keeps a tool-calling chain alive.
 */
/**
 * Keywords Gemini rejects outright. `$ref` is deliberately NOT here: it
 * cannot be stripped without turning the schema into "accept anything", so
 * tools carrying one are forwarded untouched (see below). `ref` is not a
 * JSON Schema keyword at all, and stripping it by name destroys a legitimate
 * tool parameter called `ref` — a walker that cannot tell a keyword from a
 * property name mangles the schema it was meant to repair.
 */
const REJECTED_KEYWORDS = new Set(["$schema", "additionalProperties"]);

/** Keys whose value is itself a schema. */
const SCHEMA_VALUE_KEYS = [
  "items",
  "additionalItems",
  "contains",
  "not",
  "if",
  "then",
  "else",
  "propertyNames",
  "contentSchema",
  "unevaluatedItems",
  "unevaluatedProperties",
];
/** Keys whose value maps arbitrary NAMES to schemas — never keyword space. */
const SCHEMA_MAP_KEYS = [
  "properties",
  "patternProperties",
  "$defs",
  "definitions",
  "dependentSchemas",
  "dependencies",
];
/** Keys whose value is a list of schemas. */
const SCHEMA_LIST_KEYS = ["allOf", "anyOf", "oneOf", "prefixItems"];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** True when any schema in the tree carries a `$ref` we cannot resolve. */
function hasUnresolvableRef(node: unknown): boolean {
  if (Array.isArray(node)) return node.some(hasUnresolvableRef);
  if (!isRecord(node)) return false;
  if ("$ref" in node) return true;
  for (const key of SCHEMA_VALUE_KEYS) if (hasUnresolvableRef(node[key])) return true;
  // (arrays are handled by the Array branch at the top of this function)
  for (const key of SCHEMA_LIST_KEYS) if (hasUnresolvableRef(node[key])) return true;
  for (const key of SCHEMA_MAP_KEYS) {
    const map = node[key];
    if (isRecord(map) && Object.values(map).some(hasUnresolvableRef)) return true;
  }
  return false;
}

/**
 * Strip the rejected keywords in place, walking only the positions where a
 * schema can appear. Property names are never treated as keywords, so a tool
 * whose parameter happens to be called `additionalProperties` keeps it.
 * Returns whether anything was removed.
 */
function stripAtSchemaPositions(node: Record<string, unknown>): boolean {
  let changed = false;
  for (const keyword of REJECTED_KEYWORDS) {
    if (keyword in node) {
      delete node[keyword];
      changed = true;
    }
  }
  for (const key of SCHEMA_VALUE_KEYS) {
    const child = node[key];
    if (isRecord(child)) {
      changed = stripAtSchemaPositions(child) || changed;
      continue;
    }
    // `items` also takes the tuple form: an array of schemas, one per position.
    if (Array.isArray(child)) {
      for (const item of child) {
        if (isRecord(item)) changed = stripAtSchemaPositions(item) || changed;
      }
    }
  }
  for (const key of SCHEMA_LIST_KEYS) {
    const list = node[key];
    if (Array.isArray(list)) {
      for (const child of list) {
        if (isRecord(child)) changed = stripAtSchemaPositions(child) || changed;
      }
    }
  }
  for (const key of SCHEMA_MAP_KEYS) {
    const map = node[key];
    if (!isRecord(map)) continue;
    for (const child of Object.values(map)) {
      if (isRecord(child)) changed = stripAtSchemaPositions(child) || changed;
    }
  }
  return changed;
}

/**
 * Families Google actually ships, anchored on the last path segment. A plain
 * substring test also claims `gemini-compatible-proxy` and `my-gemini-wrapper`
 * — and since the sanitiser removes keywords, a false positive is not free.
 */
const GEMINI_MODEL_ID =
  /^gemini(?:[-_.](?:\d|pro|flash|ultra|nano|exp|thinking|embedding|live|imagen)|$)/i;

/**
 * True for the routing forms a Gemini model reaches a gateway under — bare
 * (`gemini-2.5-flash`), canonical (`models/gemini-1.5-pro`) and prefixed
 * (`google-vertex/gemini-2.0`).
 */
export function isGeminiModelId(modelId: unknown): boolean {
  if (typeof modelId !== "string") return false;
  const segment = modelId.split("/").pop() ?? "";
  return GEMINI_MODEL_ID.test(segment);
}

/** The subset of an AI SDK tool declaration this module reads. */
export interface ToolWithInputSchema {
  readonly type?: string;
  readonly inputSchema?: unknown;
  readonly [key: string]: unknown;
}

/**
 * Return a copy of `tools` whose input schemas are free of the keywords Gemini
 * rejects, or `undefined` when there was nothing to strip — which lets the
 * caller forward the original array and skip the clone entirely.
 *
 * Tools this module cannot read (provider-defined tools, entries without an
 * object schema) are carried through unchanged rather than dropped: a tool the
 * sanitiser does not understand is still a tool the model needs.
 */
export function sanitizeToolInputSchemas<T extends ToolWithInputSchema>(
  tools: readonly T[] | undefined
): T[] | undefined {
  if (tools === undefined || tools.length === 0) return undefined;
  let changed = false;
  const out = tools.map((tool) => {
    if (!isRecord(tool.inputSchema)) return tool;
    // A schema carrying something uncloneable is not worth failing a request
    // over: forward the tool untouched and let the model answer.
    // A `$ref` cannot be stripped without turning the schema into "anything
    // goes", and cannot be resolved here. Forward the tool untouched and let
    // the gateway answer rather than silently widen what the model may send.
    if (hasUnresolvableRef(tool.inputSchema)) return tool;
    let schema: Record<string, unknown>;
    try {
      schema = structuredClone(tool.inputSchema) as Record<string, unknown>;
    } catch {
      return tool;
    }
    if (!stripAtSchemaPositions(schema)) return tool;
    changed = true;
    return { ...tool, inputSchema: schema };
  });
  return changed ? out : undefined;
}
