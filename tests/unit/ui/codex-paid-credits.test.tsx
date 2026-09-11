import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("next-intl", () => ({
  useLocale: () => "en",
  useTranslations: () => (key: string) => key,
}));

import QuotaCardExpanded from "../../../src/app/(dashboard)/dashboard/usage/components/ProviderLimits/parts/QuotaCardExpanded";

const credits = { hasCredits: true, unlimited: false, overageLimitReached: false, balance: null };

function renderCredits(paidCredits = credits) {
  return renderToStaticMarkup(
    <QuotaCardExpanded
      providerId="codex"
      quotas={[{ name: "session", used: 100, total: 100, remainingPercentage: 0 }]}
      paidCredits={paidCredits}
      loading={false}
      error={null}
      hasStaleData={false}
      canEditCutoff={true}
      hasCutoffOverrides={false}
      onRefresh={() => {}}
      onOpenCutoff={() => {}}
      onOpenCost={() => {}}
    />
  );
}

describe("Codex paid credit display", () => {
  it("shows availability separately from an exhausted subscription without inventing a balance", () => {
    const html = renderCredits();
    expect(html).toContain("codexPaidCreditsLabel");
    expect(html).toContain("codexPaidCreditsAvailable");
    expect(html).toContain("0%");
  });

  it("shows the spending limit instead of claiming credits remain usable", () => {
    const html = renderCredits({ ...credits, overageLimitReached: true });
    expect(html).toContain("codexPaidCreditsUnavailable");
    expect(html).not.toContain("codexPaidCreditsAvailable");
  });
});
