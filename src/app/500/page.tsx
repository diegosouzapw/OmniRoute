import ErrorPageScaffold from "@/shared/components/ErrorPageScaffold";

export default function InternalServerErrorPage() {
  return (
    <ErrorPageScaffold
      code="500"
      icon="warning"
      title="Something broke on our end"
      description="Not your fault — we hit an unexpected snag while processing your request."
      suggestions={[
        "Give it a few seconds and try again — most blips clear up on their own.",
        "Health telemetry and logs can help you trace the request ID if you're curious.",
        "If it keeps happening, report it with the timestamp so we can dig in.",
      ]}
      primaryAction={{ href: "/dashboard/health", label: "Open Health Dashboard" }}
      secondaryAction={{ href: "/dashboard/logs", label: "Open Logs" }}
    />
  );
}
