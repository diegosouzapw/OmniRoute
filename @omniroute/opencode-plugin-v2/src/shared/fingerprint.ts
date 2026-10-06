import { createHash } from "node:crypto";

/**
 * Fingerprint the CONTENT of a catalog snapshot (not endpoint/credential
 * identity) so lazy refresh can reload-after-publish only when something
 * actually changed.
 *
 * sha256 over sorted `id + "|" + (release_date ?? "")` lines for models
 * plus sorted combo ids, joined with `\n`. Order-insensitive: two
 * snapshots with the same entries in different order hash identically.
 */
export function catalogContentFingerprint(
  models: { id: string; release_date?: string }[],
  combos: { id: string }[],
  autoCombos: { id: string }[] = []
): string {
  const modelLines = models
    .map((m) => `${m.id}|${m.release_date ?? ""}`)
    .sort()
    .join("\n");
  const comboLines = combos
    .map((c) => c.id)
    .sort()
    .join("\n");
  const autoLines = autoCombos
    .map((c) => c.id)
    .sort()
    .join("\n");
  return createHash("sha256").update(`${modelLines}\n${comboLines}\n${autoLines}`).digest("hex");
}

/**
 * Digest of the optional tier (auto-combos, provider connections, enrichment).
 * The catalog fingerprint covers model and combo ids only, so an overlay that
 * moves — a renamed model, a provider going unusable — leaves it unchanged.
 * Reloading on every refresh instead would ask the host to rebuild its catalog
 * once per TTL window for nothing.
 */
export function optionalTierFingerprint(
  autoCombos: { id: string }[],
  providers: {
    id?: string;
    name?: string;
    testStatus?: string;
    isActive?: boolean;
    providerDisplayName?: string;
  }[],
  enrichment:
    | Map<
        string,
        {
          name?: string;
          freeType?: string;
          providerDisplayName?: string;
          monthlyTokens?: number;
          creditTokens?: number;
          pricing?: Record<string, number | undefined>;
        }
      >
    | undefined,
  combos: { id: string; name?: string; models?: unknown[] }[] = []
): string {
  const parts: string[] = [];
  // Membership matters: a combo keeping its id while losing a member is a
  // different combo to anyone picking it.
  parts.push(
    combos
      .map((c) => c.id + "|" + (c.name ?? "") + "|" + String(c.models?.length ?? 0))
      .sort()
      .join(",")
  );
  parts.push(
    autoCombos
      .map((c) => c.id)
      .sort()
      .join(",")
  );
  // A provider going quiet or getting renamed is as visible to the user as a
  // price move: its activity flag and display name belong in the digest.
  parts.push(
    providers
      .map(
        (p) =>
          (p.id ?? p.name ?? "") +
          ":" +
          (p.testStatus ?? "") +
          ":" +
          String(p.isActive ?? "") +
          ":" +
          (p.providerDisplayName ?? "")
      )
      .sort()
      .join(",")
  );
  if (enrichment !== undefined) {
    const rows: string[] = [];
    for (const [key, entry] of enrichment) {
      // Pricing is part of what the user sees, so a price move must reach
      // the picker without waiting for an id to change.
      const price = entry.pricing
        ? Object.entries(entry.pricing)
            .map(([k, v]) => k + "=" + String(v ?? ""))
            .sort()
            .join(";")
        : "";
      rows.push(
        key +
          "|" +
          (entry.name ?? "") +
          "|" +
          (entry.freeType ?? "") +
          "|" +
          (entry.providerDisplayName ?? "") +
          "|" +
          String(entry.monthlyTokens ?? "") +
          ";" +
          String(entry.creditTokens ?? "") +
          "|" +
          price
      );
    }
    rows.sort();
    parts.push(String(enrichment.size));
    parts.push(rows.join("\n"));
  }
  return createHash("sha256").update(parts.join(" ")).digest("hex");
}
