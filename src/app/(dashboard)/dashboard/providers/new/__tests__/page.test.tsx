// @vitest-environment jsdom
//
// Regression test for #5427 — the "Provider Onboarding Wizard" button silently
// fails. The button does `router.push("/dashboard/providers/new")`, but
// `new/page.tsx` was a server-component redirect stub
// (`redirect("/dashboard/providers")`), so the URL bounced straight back with a
// NEXT_REDIRECT 307 and the fully-built <ProviderOnboardingWizard> (rendered
// nowhere in the app) never opened.
//
// This guard asserts the route renders the wizard instead of redirecting.
import { describe, it, expect, vi } from "vitest";

import NewProviderPage from "../page";
import ProviderOnboardingWizard from "../../components/onboarding/ProviderOnboardingWizard";

// The wizard uses these hooks at render time; mocked so importing/constructing
// the element tree never reaches real Next.js navigation / i18n context.
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), back: vi.fn() }),
  usePathname: () => "/dashboard/providers/new",
  redirect: vi.fn(() => {
    throw new Error("NEXT_REDIRECT");
  }),
}));

vi.mock("next-intl", () => ({
  useTranslations: () => (key: string) => key,
}));

describe("/dashboard/providers/new route (#5427)", () => {
  it("renders the onboarding wizard instead of redirecting back", () => {
    // The old stub called redirect() and threw NEXT_REDIRECT here.
    const element = NewProviderPage();
    expect(element).toBeTruthy();
    expect(element.type).toBe(ProviderOnboardingWizard);
  });
});
