import ErrorPageScaffold from "@/shared/components/ErrorPageScaffold";

export default function ServiceUnavailablePage() {
  return (
    <ErrorPageScaffold
      code="503"
      icon="build_circle"
      title="Service Unavailable"
      description="The service is temporarily unavailable due to maintenance or degraded dependencies."
      suggestions={[
        "Wait a moment and retry.",
        "Check maintenance notices and system status.",
        "Use fallback providers if your workflow is latency-sensitive.",
      ]}
      primaryAction={{ href: "/maintenance", label: "Maintenance Details" }}
      secondaryAction={{ href: "/status", label: "System Status" }}
    />
  );
}
