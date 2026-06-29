import ProviderOnboardingWizard from "../components/onboarding/ProviderOnboardingWizard";

// `/dashboard/providers/new` is the dedicated onboarding-wizard route the
// "Provider Onboarding Wizard" buttons navigate to. It previously redirected
// straight back to `/dashboard/providers`, so the (fully-built) wizard never
// opened and the button appeared to do nothing (#5427). Render the wizard here;
// it self-contains its own steps and navigates back to the providers list on
// cancel/finish.
export default function NewProviderPage() {
  return <ProviderOnboardingWizard />;
}
