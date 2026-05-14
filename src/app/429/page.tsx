import ErrorPageScaffold from "@/shared/components/ErrorPageScaffold";

export default function TooManyRequestsPage() {
  return (
    <ErrorPageScaffold
      code="429"
      icon="hourglass_top"
      title="Whoa, slow down a sec"
      description="You've hit a rate limit on this client, key, or provider. Take a breath — we'll keep your spot."
      suggestions={[
        "Wait for the cooldown to pass, then give it another try.",
        "Set up a combo with fallback providers so you're not dependent on just one.",
        "Tune the resilience and rate-limit profiles in settings to match your traffic.",
      ]}
      primaryAction={{
        href: "/dashboard/settings?tab=resilience",
        label: "Open Resilience Settings",
      }}
      secondaryAction={{ href: "/dashboard/combos", label: "Open Combos" }}
    />
  );
}
