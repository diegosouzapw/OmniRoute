type JsonRecord = Record<string, unknown>;

export class ComboInvariantError extends Error {}

const FAMILY_PATTERNS: ReadonlyArray<[string, RegExp]> = [
  ["gpt", /^gpt(?:-|$)/i],
  ["claude", /^claude(?:-|$)/i],
  ["gemini", /^gemini(?:-|$)/i],
  ["glm", /^glm(?:-|$)/i],
  ["kimi", /^kimi(?:-|$)/i],
  ["llama", /^llama(?:-|$)/i],
  ["minimax", /^minimax(?:-|$)/i],
  ["mistral", /^(?:mistral|mixtral)(?:-|$)/i],
];

function strings(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function modelFamily(model: string): string | null {
  const bare = model.slice(model.lastIndexOf("/") + 1);
  return FAMILY_PATTERNS.find(([, pattern]) => pattern.test(bare))?.[0] ?? null;
}

export function validateComboInvariant(combo: JsonRecord): void {
  const invariant =
    combo.invariant && typeof combo.invariant === "object" && !Array.isArray(combo.invariant)
      ? (combo.invariant as JsonRecord)
      : {};
  const providers = new Set([
    ...strings(combo.allowedProviders),
    ...strings(invariant.allowedProviders),
  ]);
  const families = new Set([
    ...strings(combo.allowedModelFamilies),
    ...strings(invariant.allowedModelFamilies),
  ]);
  if (providers.size === 0 && families.size === 0) return;

  const targets = Array.isArray(combo.models) ? combo.models : [];
  targets.forEach((value, index) => {
    if (!value || typeof value !== "object" || Array.isArray(value)) return;
    const target = value as JsonRecord;
    if (target.kind === "combo-ref") return;
    const model = typeof target.model === "string" ? target.model : "";
    const provider =
      typeof target.providerId === "string"
        ? target.providerId
        : typeof target.provider === "string"
          ? target.provider
          : model.includes("/")
            ? model.slice(0, model.indexOf("/"))
            : "";
    const family = modelFamily(model);
    if (
      (providers.size > 0 && !providers.has(provider)) ||
      (families.size > 0 && (!family || !families.has(family)))
    ) {
      const targetName = model.includes("/") ? model : `${provider}/${model}`;
      throw new ComboInvariantError(
        `Combo "${String(combo.name ?? "unnamed")}" target ${index + 1} (${targetName}) violates its invariant`
      );
    }
  });
}
