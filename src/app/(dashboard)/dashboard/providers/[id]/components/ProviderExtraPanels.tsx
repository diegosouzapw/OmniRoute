"use client";

// Groups the provider detail page's "extra" sections — playground + param
// filters — behind a single import/render call from ProviderDetailPageClient.tsx.
// Extracted so the frozen host file stays within the file-size ratchet
// (#6649 review follow-up: keeps ProviderDetailPageClient.tsx at its ≤784 cap).

import ProviderPlaygroundPanel from "./ProviderPlaygroundPanel";
import ProviderParamFilterSection from "./ProviderParamFilterSection";
import ProviderInterceptionSection from "./ProviderInterceptionSection";

export default function ProviderExtraPanels({ providerId }: { providerId: string }) {
  return (
    <>
      {/* Playground panel — rendered for providers that declare serviceKinds */}
      <ProviderPlaygroundPanel providerId={providerId} />

      {/* Param filters — denylist/allowlist config per provider/model (#6625) */}
      <ProviderParamFilterSection providerId={providerId} />

      {/* Web search/fetch tool interception toggles (#3384/#7339) */}
      <ProviderInterceptionSection providerId={providerId} />
    </>
  );
}
