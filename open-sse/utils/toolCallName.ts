/**
 * Tool-call NAME handling for the Responses translators: streamed name
 * accumulation and declared-name resolution.
 *
 * Two independent defects are covered here.
 *
 * 1. Accumulation. A provider may split a tool call's `function.name` across
 *    several streaming deltas (`{name:"functions__"}`, `{name:"exec"}`) and some
 *    providers repeat the whole name in a later delta. The translators used to
 *    keep only ONE delta — `state.funcNames[idx] = funcName` (last non-empty
 *    wins) on the translate paths and `if (!existing.function.name)` (first
 *    wins) on the passthrough path — so a split name silently became a fragment
 *    ("exec"), or a prefix ("functions__"). Arguments already had
 *    `appendToolCallArgumentDelta`; names had no equivalent.
 *
 * 2. Resolution. Everything downstream keys on the DECLARED wire name: a
 *    Responses `type:"namespace"` tool group is flattened to `${ns}__${leaf}`
 *    (`functions__exec`, #8295), and both the custom/freeform classification
 *    (`customToolNames.has(name)`) and the `{namespace, name}` identity restore
 *    (`resolveRequestToolIdentity`) compare against that spelling. A provider
 *    that drops the namespace prefix — or a fragment captured by defect 1 —
 *    therefore missed BOTH, and Codex received a plain `function_call` with no
 *    `namespace` for a freeform tool it declared as `functions.exec`, which its
 *    freeform dispatcher rejects.
 *
 * Resolution order is exact (`functions__exec`) -> dotted (`functions.exec`) ->
 * unique bare leaf (`exec`). The bare-leaf step only fires when exactly one
 * declared name carries that leaf, and never when the bare name is itself an
 * explicitly declared tool (a flat `type:"function"` declaration must keep its
 * own identity, per the apply_patch carve-out in the response translator).
 */

/** Strip a `{namespace, name}` pair down to its leaf (the part after the last `__`). */
function leafOf(name: string): string {
  const separator = name.lastIndexOf("__");
  return separator >= 0 ? name.slice(separator + 2) : name;
}

function toNameSet(values: Iterable<string> | null | undefined): Set<string> {
  const set = new Set<string>();
  if (!values) return set;
  for (const value of values) {
    if (typeof value === "string" && value) set.add(value);
  }
  return set;
}

/**
 * Accumulate a streamed `function.name` delta.
 *
 * Handles the four shapes seen in production: first delta, full-name repeat,
 * progressive re-send (`functions__` then `functions__exec`), re-sent suffix
 * fragment (`functions__exec` then `exec`), and a genuine split
 * (`functions__` + `exec`).
 */
export function appendToolCallNameDelta(current: unknown, incoming: unknown): string {
  const previous = typeof current === "string" ? current.trim() : "";
  const delta = typeof incoming === "string" ? incoming.trim() : "";
  if (!delta) return previous;
  if (!previous) return delta;
  if (delta === previous) return previous;
  // Progressive accumulation: a provider re-sending the longer spelling.
  if (delta.startsWith(previous)) return delta;
  // A provider re-sending a fragment we already hold.
  if (previous.endsWith(delta)) return previous;
  return previous + delta;
}

/**
 * Resolve an incoming tool name against a set of DECLARED wire names.
 *
 * @param declaredNames   Declared spellings (`customToolNames`, identity-map keys…).
 * @param wireName        The name as it arrived on the Chat wire.
 * @param explicitNames   Names explicitly declared as flat tools by the client.
 *                        A bare name present here is never expanded to a
 *                        namespaced sibling.
 * @returns The matching declared name, or null when there is no match or the
 *          bare-leaf match is ambiguous (two namespaces sharing one leaf).
 */
export function resolveDeclaredToolName(
  declaredNames: Iterable<string> | null | undefined,
  wireName: unknown,
  explicitNames?: Iterable<string> | null
): string | null {
  const name = typeof wireName === "string" ? wireName.trim() : "";
  if (!name) return null;
  const declared = toNameSet(declaredNames);
  if (declared.size === 0) return null;

  // 1) Exact — the declared spelling itself (qualified `ns__leaf` or flat).
  if (declared.has(name)) return name;

  // 2) Dotted alias — some model-side parsers render `ns__leaf` as `ns.leaf`
  //    (mirrors resolveRequestToolIdentity's dotted lookup).
  const dot = name.lastIndexOf(".");
  if (dot > 0 && dot < name.length - 1) {
    const flattened = `${name.slice(0, dot)}__${name.slice(dot + 1)}`;
    if (declared.has(flattened)) return flattened;
  }

  // 3) Bare leaf — the provider dropped the namespace prefix. Only an
  //    unambiguous match may win, and an explicit flat declaration blocks it.
  if (name.includes("__")) return null;
  if (toNameSet(explicitNames).has(name)) return null;
  const leafMatches: string[] = [];
  for (const candidate of declared) {
    if (leafOf(candidate) === name) leafMatches.push(candidate);
  }
  return leafMatches.length === 1 ? leafMatches[0] : null;
}

/**
 * True when the client's request declared `toolName` as a custom/freeform tool,
 * accepting the qualified, dotted and unique-bare spellings.
 *
 * `declaredFunctionSchemas` is the request's flat tool schema map
 * (`extractToolSchemaMap`); a flat declaration of the same bare name keeps its
 * own identity and is never folded into a namespaced custom sibling.
 */
export function matchesCustomToolDeclaration(options: {
  customToolNames?: Iterable<string> | null;
  declaredFunctionSchemas?: unknown;
  toolName: unknown;
}): boolean {
  const { customToolNames, declaredFunctionSchemas, toolName } = options;
  if (!customToolNames) return false;
  const explicitNames =
    declaredFunctionSchemas instanceof Map
      ? declaredFunctionSchemas.keys()
      : declaredFunctionSchemas &&
          typeof (declaredFunctionSchemas as { keys?: unknown }).keys === "function"
        ? (declaredFunctionSchemas as Map<string, unknown>).keys()
        : null;
  return resolveDeclaredToolName(customToolNames, toolName, explicitNames) !== null;
}
