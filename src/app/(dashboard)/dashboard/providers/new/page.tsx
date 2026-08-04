import ProviderOnboardingWizard from "../components/onboarding/ProviderOnboardingWizard";

// "Add Provider" / onboarding route. The buttons in providers/page.tsx and the
// dashboard widgets navigate here (#5427). This used to be a redirect stub that
// bounced back to /dashboard/providers, so the wizard silently never opened and
// the fully-built ProviderOnboardingWizard stayed orphaned. Render it directly —
// auth is enforced centrally by the (dashboard) DashboardLayout, same as the
// sibling [id] and index routes, so no per-page guard is needed here.
export default function NewProviderPage() {
  return <ProviderOnboardingWizard />;
}
