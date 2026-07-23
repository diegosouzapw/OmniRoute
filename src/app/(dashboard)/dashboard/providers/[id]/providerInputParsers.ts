// Pure input parsers for provider connection forms — extracted as a leaf module
// (no React/UI imports) so server-safe consumers like
// connectionProviderSpecificData.ts (and its node:test suite) can import them
// without dragging providerPageHelpers' UI import graph (@lobehub/icons ESM build
// crashes Node's CJS require in the CI unit shard — 2026-07-18).

export function parseRoutingTagsInput(value: string): string[] | undefined {
  const tags = Array.from(
    new Set(
      value
        .split(",")
        .map((tag) => tag.trim().toLowerCase())
        .filter(Boolean)
    )
  );
  return tags.length > 0 ? tags : undefined;
}

export function parseExcludedModelsInput(value: string): string[] | undefined {
  const patterns = Array.from(
    new Set(
      value
        .split(",")
        .map((pattern) => pattern.trim())
        .filter(Boolean)
    )
  );
  return patterns.length > 0 ? patterns : undefined;
}
