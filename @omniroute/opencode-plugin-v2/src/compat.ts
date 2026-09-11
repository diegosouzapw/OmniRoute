function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isTransformHolder(value: unknown): value is { transform: unknown } {
  return isObject(value) && "transform" in value;
}

/**
 * The catalog domain is the one this plugin cannot work without. The
 * integration domain carries the credential flow and the `aisdk` domain the
 * tool-schema cleaning: a host missing either still gets its catalog, so
 * neither is asserted here — each is probed where it is used.
 */
export function assertContext(ctx: unknown): void {
  if (!isObject(ctx)) {
    throw new Error("[omniroute-v2] contract breach: ctx must be an object");
  }
  if (!isTransformHolder(ctx.catalog) || typeof ctx.catalog.transform !== "function") {
    throw new Error("[omniroute-v2] contract breach: ctx.catalog.transform must be a function");
  }
  if (!isObject(ctx.options)) {
    throw new Error("[omniroute-v2] contract breach: ctx.options must be an object");
  }
}

/**
 * Catalog contract spoken by the running host.
 *
 * opencode v2 is a moving target: the catalog contract changed between the
 * binary that ships today and the SDK types this package pins. Rather than
 * keying off a version list (which goes stale on the next release), the
 * contract is discovered at runtime from the object the host seeds into the
 * draft.
 *
 * - `legacy-package` — the seed carries a top-level `package` and no `api`
 *   block. Observed on `@opencode-ai/cli` 0.0.0-beta-17823, whose
 *   `Provider.Info.empty` is `{id, name, activation, package}`.
 * - `sdk-api` — the seed carries an `api` block. This is the contract of the
 *   pinned `@opencode-ai/plugin`/`@opencode-ai/sdk` types.
 * - `unknown` — neither or both. The caller publishes the superset.
 */
export type HostContract = "legacy-package" | "sdk-api" | "unknown";

export function detectHostContract(seed: unknown): HostContract {
  if (!isObject(seed)) return "unknown";
  const hasApi = "api" in seed;
  const hasPackage = "package" in seed;
  if (hasApi && !hasPackage) return "sdk-api";
  if (hasPackage && !hasApi) return "legacy-package";
  return "unknown";
}

/**
 * Whether to publish the legacy top-level fields (`package`, `settings`,
 * `headers`, `variants[].settings`) next to the `api`-block fields.
 *
 * A host proven to speak the legacy contract gets them because it needs them;
 * an unrecognised host gets them because the superset is the safer default
 * (both field sets have been observed to survive an unknown-key write). A host
 * that speaks the `api` contract does not, so a future strict schema cannot
 * reject the write on an excess property.
 */
export function emitsLegacyFields(contract: HostContract): boolean {
  return contract !== "sdk-api";
}
