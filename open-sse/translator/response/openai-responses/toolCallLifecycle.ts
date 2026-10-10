import { appendToolCallNameDelta, resolveDeclaredToolName } from "../../../utils/toolCallName.ts";
import { resolveRequestToolIdentity } from "./requestToolIdentity.ts";

type ToolMetadata = {
  customToolNames?: Iterable<string> | null;
  toolSchemas?: ReadonlyMap<string, unknown> | null;
  requestToolIdentityMap?: unknown;
};
type SelectedTool = { name: string; namespace?: string; custom: boolean };

/** Per-response decisions: defer partial/unknown names, then freeze the published
 * identity and type. The caller buffers arguments and resets a replaced call ID. */
export class ToolCallLifecycle {
  private readonly metadata: ToolMetadata & { customToolNames: Set<string> };
  private readonly declaredNames: Set<string>;
  private readonly wireSpellings: Set<string>;
  private readonly selected = new Map<string, SelectedTool>();
  private readonly identities = new Map<string, { namespace: string; name: string }>();
  private readonly aliases = new Map<string, Set<string>>();

  constructor(
    metadata: ToolMetadata,
    private readonly nativeApplyPatch = false
  ) {
    this.metadata = { ...metadata, customToolNames: new Set(metadata.customToolNames || []) };
    const ledger = this.metadata.requestToolIdentityMap;
    const identities =
      ledger instanceof Map
        ? [...ledger.keys()]
        : ledger && typeof ledger === "object"
          ? Object.keys(ledger)
          : [];
    this.declaredNames = new Set([
      ...(this.metadata.customToolNames || []),
      ...(metadata.toolSchemas?.keys() || []),
      ...identities,
    ]);
    const entries = ledger instanceof Map ? [...ledger] : Object.entries(ledger || {});
    for (const [wireName, value] of entries) this.addIdentity(wireName, value);
    this.wireSpellings = new Set([...this.declaredNames, ...this.aliases.keys()]);
    for (const name of this.declaredNames) {
      if (this.identities.has(name)) continue;
      const separator = name.lastIndexOf("__");
      if (separator > 0) {
        this.wireSpellings.add(name.slice(separator + 2));
        this.wireSpellings.add(`${name.slice(0, separator)}.${name.slice(separator + 2)}`);
      }
    }
  }

  private addIdentity(wireName: unknown, value: unknown): void {
    if (
      typeof wireName !== "string" ||
      !wireName ||
      !value ||
      typeof value !== "object" ||
      Array.isArray(value)
    )
      return;
    const { namespace, name } = value as Record<string, unknown>;
    if (typeof namespace !== "string" || !namespace || typeof name !== "string" || !name) return;
    this.identities.set(wireName, { namespace, name });
    for (const alias of [name, `${namespace}.${name}`]) {
      const names = this.aliases.get(alias) ?? new Set<string>();
      names.add(wireName);
      this.aliases.set(alias, names);
    }
  }

  private declaredName(name: string): string | null {
    // Literal declarations (including flat dotted names) win over ledger aliases.
    if (this.declaredNames.has(name)) return name;
    const aliases = this.aliases.get(name);
    if (aliases) return aliases.size === 1 ? [...aliases][0] : null;
    return resolveDeclaredToolName(this.declaredNames, name, this.metadata.toolSchemas?.keys());
  }

  appendName(index: string | number, previous: string, incoming: unknown): string {
    if (this.selected.has(String(index))) return previous;
    return appendToolCallNameDelta(previous, incoming, this.wireSpellings);
  }

  reset(index: string | number): void {
    this.selected.delete(String(index));
  }

  get(index: string | number): SelectedTool | undefined {
    return this.selected.get(String(index));
  }

  select(index: string | number, name: string, terminal = false): SelectedTool | null {
    const published = this.get(index);
    if (published) return published;
    const declared = this.declaredName(name);
    const nativePatch =
      this.nativeApplyPatch &&
      /^(apply_patch|applypatch)$/i.test(name) &&
      !this.metadata.toolSchemas?.has(name);
    // Even an exact name may still be a prefix of a longer declaration. Wait for
    // the terminal boundary rather than guess which declared call was intended.
    const isPrefix = [...this.wireSpellings].some(
      (candidate) => candidate !== name && candidate.startsWith(name)
    );
    if (!terminal && ((!declared && !nativePatch) || isPrefix)) return null;
    const selection = this.resolveSelection(name, declared, nativePatch);

    this.selected.set(String(index), selection);
    return selection;
  }
  private resolveSelection(
    name: string,
    declared: string | null,
    nativePatch: boolean
  ): SelectedTool {
    const custom = nativePatch || Boolean(declared && this.metadata.customToolNames.has(declared));
    // Read original identities from ledger values: a >64-character wire key is
    // hash-truncated and cannot be split to recover its namespace or leaf.
    const literalFlat = this.metadata.toolSchemas?.has(name) && !this.identities.has(name);
    const identity =
      !literalFlat && (declared || this.declaredNames.size === 0)
        ? (this.identities.get(declared) ??
          resolveRequestToolIdentity(this.metadata.requestToolIdentityMap, name, {
            explicitNames: this.metadata.toolSchemas?.keys(),
          }))
        : null;
    return {
      name: identity?.name ?? name,
      ...(identity ? { namespace: identity.namespace } : {}),
      custom,
    };
  }
}

const lifecycles = new WeakMap<object, ToolCallLifecycle>();

/** Translator state arrives from initState and acquires request metadata before
 * its first tool delta. Keep lifecycle bookkeeping private to that response. */
export function translatorToolCallLifecycle(state: ToolMetadata): ToolCallLifecycle {
  let lifecycle = lifecycles.get(state);
  if (!lifecycle) {
    lifecycle = new ToolCallLifecycle(state, true);
    lifecycles.set(state, lifecycle);
  }
  return lifecycle;
}
