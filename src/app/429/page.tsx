import ErrorPageScaffold from "@/shared/components/ErrorPageScaffold";

export default function TooManyRequestsPage() {
  return (
    <ErrorPageScaffold
      code="429"
      icon="hourglass_top"
      title="Too Many Requests"
      description="Rate limits were exceeded for this client, key, or provider."
      suggestions={[
        "Wait for cooldown and retry after the suggested interval.",
        "Switch to a combo with fallback providers.",
        "Tune provider resilience/rate-limit profiles in settings.",
      ]}
      primaryAction={{
        href: "/dashboard/settings?tab=resilience",
        label: "Open Resilience Settings",
      }}
      secondaryAction={{ href: "/dashboard/combos", label: "Open Combos" }}
    />
  );
}
