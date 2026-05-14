import ErrorPageScaffold from "@/shared/components/ErrorPageScaffold";

export default function ServiceUnavailablePage() {
  return (
    <ErrorPageScaffold
      code="503"
      icon="build_circle"
      title="Just a moment — we're catching up"
      description="We're temporarily slowed down by maintenance or a degraded dependency. Should be back shortly."
      suggestions={[
        "Give it a moment, then try again.",
        "Check the maintenance notes or system status for the latest.",
        "Latency-sensitive workflow? Fallback providers can keep things moving.",
      ]}
      primaryAction={{ href: "/maintenance", label: "Maintenance Details" }}
      secondaryAction={{ href: "/status", label: "System Status" }}
    />
  );
}
