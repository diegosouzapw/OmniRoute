/**
 * Root-union repair for Grok Build (grok-cli) function tool schemas.
 *
 * Grok Build validates each function tool's `parameters` root before sampling
 * and refuses the whole request with `400 [invalid_client_tool_schema] <tool>:
 * tool parameter root must be an object type (root schema is an anyOf/oneOf
 * union with a non-object branch)` when a root `anyOf` / `oneOf` branch is not
 * an inline object schema. A branch that is only a `$ref` into `$defs` counts
 * as non-object, and so does `{ type: "null" }` ("root cannot be nullable").
 * Codex desktop's `automation_update` tool declares its modes exactly as
 * `$ref` branches, so every request carrying the tool catalog fails.
 *
 * Probing Grok Build also showed that a root union is only decoded correctly
 * when the root is a bare union: next to a root `type: "object"` /
 * `properties` it accepts the schema but emits junk arguments such as
 * `{"id":true,"mode":true}`. Merging the branches into one object is no better
 * for discriminated unions: the first branch's `mode` enum hides the others.
 *
 * So the union is kept and reshaped: local `$ref` branches are inlined (each
 * target once, keywords next to the `$ref` combined with it), a branch that is
 * itself only a union (e.g. a `$ref` to another `oneOf` of `$ref`s) is
 * expanded into its own branches, branches that can never describe an object
 * argument are dropped, typeless object branches are pinned to `type:
 * "object"`, and the root's shared `properties` / `required` /
 * `additionalProperties` move into every branch before the root object
 * keywords are removed. A union left with no branch is removed instead.
 * `$defs` stays at the root (nested `$ref`s resolve against it) and unions
 * inside `properties` / `$defs` are never touched. Schemas with a local `$ref`
 * outside `$defs` / `definitions`, or that would need more than 64 root
 * branches, are forwarded unchanged.
 */

type JsonRecord = Record<string, unknown>;

interface SharedShape {
  properties: JsonRecord;
  required: string[];
  additionalProperties: unknown;
}

const ROOT_UNION_KEYWORDS = ["anyOf", "oneOf"] as const;
// Root object keywords that stop Grok from decoding a root union's branches.
const ROOT_OBJECT_KEYWORDS = ["type", "properties", "required", "additionalProperties"];
// Keywords a pure union branch may carry next to its anyOf/oneOf.
const UNION_ANNOTATION_KEYWORDS = new Set(["type", "title", "description", "$comment"]);
// A typeless branch stands for an object argument only with object keywords (or none at all).
const OBJECT_KEYWORDS = [
  "properties",
  "required",
  "additionalProperties",
  "patternProperties",
  "propertyNames",
  "minProperties",
  "maxProperties",
];
const ANNOTATION_KEYWORDS = new Set(["title", "description", "$comment", "examples", "default"]);
// Reshaping removes the root object keywords and re-indexes the union, so only refs into
// these containers survive it.
const DEFINITION_REF_PREFIXES = ["#/$defs/", "#/definitions/"];
const MAX_REF_HOPS = 32;
const MAX_UNION_DEPTH = 8;
const MAX_ROOT_BRANCHES = 64;

function isRecord(value: unknown): value is JsonRecord {
  return !!value && typeof value === "object" && !Array.isArray(value);
}

function stringList(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

function typeAllowsObject(type: unknown): boolean {
  return (
    type === undefined || type === "object" || (Array.isArray(type) && type.includes("object"))
  );
}

/** Whether a local `$ref` anywhere in the schema points outside `$defs` / `definitions`. */
function hasRootRelativeRef(node: unknown): boolean {
  if (Array.isArray(node)) return node.some(hasRootRelativeRef);
  if (!isRecord(node)) return false;
  const ref = node.$ref;
  if (
    typeof ref === "string" &&
    ref.startsWith("#") &&
    !DEFINITION_REF_PREFIXES.some((prefix) => ref.startsWith(prefix))
  ) {
    return true;
  }
  return Object.values(node).some(hasRootRelativeRef);
}

/** Resolve a local JSON pointer (`#/$defs/Name`) against the schema root. */
function resolveLocalRef(root: JsonRecord, ref: string): unknown {
  if (!ref.startsWith("#/")) return undefined;
  let node: unknown = root;
  for (const segment of ref.slice(2).split("/")) {
    const key = segment.replace(/~1/g, "/").replace(/~0/g, "~");
    if (!isRecord(node) || !Object.prototype.hasOwnProperty.call(node, key)) return undefined;
    node = node[key];
  }
  return node;
}

/**
 * Apply the keywords next to a `$ref` together with the target (JSON Schema
 * 2019+): `properties` and `required` combine, annotations next to the `$ref` win.
 */
function mergeRefSiblings(target: JsonRecord, siblings: JsonRecord): JsonRecord {
  const merged: JsonRecord = { ...target, ...siblings };
  if (isRecord(target.properties) && isRecord(siblings.properties)) {
    merged.properties = { ...target.properties, ...siblings.properties };
  }
  const required = [...new Set([...stringList(target.required), ...stringList(siblings.required)])];
  if (required.length > 0) merged.required = required;
  return merged;
}

/**
 * Inline a branch's chain of local `$ref`s. Every ref is expanded at most once
 * per root union (`expanded`), which bounds the work by the number of
 * definitions and doubles as cycle detection. Returns null for an external,
 * missing, cyclic or already expanded reference.
 */
function dereferenceBranch(
  root: JsonRecord,
  branch: JsonRecord,
  expanded: Set<string>
): JsonRecord | null {
  let current = branch;
  let hops = 0;
  while (typeof current.$ref === "string") {
    const ref = current.$ref;
    if (expanded.has(ref) || ++hops > MAX_REF_HOPS) return null;
    expanded.add(ref);
    const target = resolveLocalRef(root, ref);
    if (!isRecord(target)) return null;
    const { $ref: _ref, ...siblings } = current;
    current = mergeRefSiblings(target, siblings);
  }
  return current;
}

/**
 * Pin a branch to `type: "object"`, or return null when it can never match a
 * tool call's arguments (which are always a JSON object).
 */
function asObjectBranch(branch: JsonRecord): JsonRecord | null {
  const { type } = branch;
  if (type === "object") return branch;
  if (Array.isArray(type) && type.includes("object")) return { ...branch, type: "object" };
  if (type !== undefined) return null;
  const describesObject =
    OBJECT_KEYWORDS.some((keyword) => keyword in branch) ||
    Object.keys(branch).every((keyword) => ANNOTATION_KEYWORDS.has(keyword));
  return describesObject ? { ...branch, type: "object" } : null;
}

/** The branches of a schema that is nothing but an object-compatible anyOf/oneOf. */
function pureUnionBranches(schema: JsonRecord): unknown[] | null {
  const keyword = ROOT_UNION_KEYWORDS.find((key) => Array.isArray(schema[key]));
  if (!keyword || !typeAllowsObject(schema.type)) return null;
  const pure = Object.keys(schema).every(
    (key) => key === keyword || UNION_ANNOTATION_KEYWORDS.has(key)
  );
  return pure ? (schema[keyword] as unknown[]) : null;
}

/** Append the inline object schemas a root union branch stands for to `out`. */
function collectObjectBranches(
  root: JsonRecord,
  branch: unknown,
  depth: number,
  expanded: Set<string>,
  out: JsonRecord[]
): void {
  if (out.length > MAX_ROOT_BRANCHES) return;
  const resolved = isRecord(branch) ? dereferenceBranch(root, branch, expanded) : null;
  if (!resolved) return;
  const nested = pureUnionBranches(resolved);
  if (!nested) {
    const objectBranch = asObjectBranch(resolved);
    if (objectBranch) out.push(objectBranch);
    return;
  }
  if (depth >= MAX_UNION_DEPTH) return;
  for (const child of nested) collectObjectBranches(root, child, depth + 1, expanded, out);
}

/** Add the root's shared object keywords to one branch (the branch's own win). */
function withSharedShape(branch: JsonRecord, shared: SharedShape): JsonRecord {
  const hasProperties = Object.keys(shared.properties).length > 0;
  const addAdditional =
    shared.additionalProperties !== undefined && branch.additionalProperties === undefined;
  if (!hasProperties && shared.required.length === 0 && !addAdditional) return branch;
  const next: JsonRecord = { ...branch };
  if (hasProperties) {
    next.properties = {
      ...shared.properties,
      ...(isRecord(branch.properties) ? branch.properties : {}),
    };
  }
  if (shared.required.length > 0) {
    next.required = [...new Set([...shared.required, ...stringList(branch.required)])];
  }
  if (addAdditional) next.additionalProperties = shared.additionalProperties;
  return next;
}

function normalizeRootUnions(schema: JsonRecord): JsonRecord {
  const keywords = ROOT_UNION_KEYWORDS.filter((keyword) => Array.isArray(schema[keyword]));
  if (keywords.length === 0 || hasRootRelativeRef(schema)) return schema;

  const shared: SharedShape = {
    properties: isRecord(schema.properties) ? schema.properties : {},
    required: stringList(schema.required),
    additionalProperties: schema.additionalProperties,
  };
  let changed = ROOT_OBJECT_KEYWORDS.some((keyword) => keyword in schema);
  const next: JsonRecord = { ...schema };
  for (const keyword of keywords) {
    const branches = schema[keyword] as unknown[];
    const collected: JsonRecord[] = [];
    const expanded = new Set<string>();
    for (const branch of branches) collectObjectBranches(schema, branch, 0, expanded, collected);
    // Too wide to reshape safely: leave the schema as the client sent it.
    if (collected.length > MAX_ROOT_BRANCHES) return schema;
    const kept = collected.map((branch) => withSharedShape(branch, shared));
    if (kept.length !== branches.length || kept.some((b, i) => b !== branches[i])) changed = true;
    if (kept.length > 0) next[keyword] = kept;
    else delete next[keyword];
  }
  if (!changed) return schema;

  if (ROOT_UNION_KEYWORDS.some((keyword) => keyword in next)) {
    for (const keyword of ROOT_OBJECT_KEYWORDS) delete next[keyword];
  } else {
    next.type = "object";
    if (!isRecord(next.properties)) next.properties = {};
  }
  return next;
}

/**
 * Return `tools` with every function tool's root `anyOf` / `oneOf` rewritten
 * into the shape Grok Build accepts. The input array and its tools are never
 * mutated (combo fallback re-dispatches the same body to other providers), and
 * the original array is returned when nothing needed a change.
 */
export function normalizeGrokBuildToolSchemas(tools: unknown[]): unknown[] {
  let changed = false;
  const next = tools.map((tool) => {
    if (!isRecord(tool) || tool.type !== "function" || !isRecord(tool.parameters)) return tool;
    const parameters = normalizeRootUnions(tool.parameters);
    if (parameters === tool.parameters) return tool;
    changed = true;
    return { ...tool, parameters };
  });
  return changed ? next : tools;
}
