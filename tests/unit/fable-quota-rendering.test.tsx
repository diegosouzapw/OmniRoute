import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { expect, it, vi } from "vitest";
import { parseQuotaData } from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits/quotaParsing";
import QuotaCardExpanded from "@/app/(dashboard)/dashboard/usage/components/ProviderLimits/parts/QuotaCardExpanded";

vi.mock("next-intl", () => ({
  useLocale: () => "en-US",
  useTranslations: () => Object.assign((key: string) => key, { has: () => false }),
}));

it("renders an exhausted Fable meter beside the independent shared windows", () => {
  const window = (used: number) => ({
    used,
    total: 100,
    remaining: 100 - used,
    remainingPercentage: 100 - used,
    resetAt: "2099-09-10T16:00:00Z",
    unlimited: false,
  });
  const quotas = parseQuotaData("claude", {
    quotas: { "session (5h)": window(12), "weekly (7d)": window(34) },
    modelQuotas: { "weekly fable (7d)": window(100) },
  });
  const html = renderToStaticMarkup(
    <QuotaCardExpanded
      quotas={quotas}
      providerId="claude"
      loading={false}
      error={null}
      hasStaleData={false}
      onRefresh={() => {}}
      onOpenCutoff={() => {}}
      onOpenCost={() => {}}
      canEditCutoff={false}
      hasCutoffOverrides={false}
    />
  );
  const root = document.createElement("div");
  root.innerHTML = html;
  expect(root.querySelector('[title="weekly fable (7d)"]')?.textContent).toContain("Weekly Fable");
  expect(root.querySelector('[title="weekly fable (7d)"]')?.textContent).toContain("0% left");
  expect(root.querySelector('[title="session (5h)"]')?.textContent).toContain("88% left");
  expect(root.querySelector('[title="weekly (7d)"]')?.textContent).toContain("66% left");
});
