import ErrorPageScaffold from "@/shared/components/ErrorPageScaffold";

export default function InternalServerErrorPage() {
  return (
    <ErrorPageScaffold
      code="500"
      icon="warning"
      title="Internal Server Error"
      description="An unexpected server-side error occurred while processing your request."
      suggestions={[
        "Retry once in a few seconds.",
        "Check health telemetry and server logs for correlated request IDs.",
        "If persistent, report the issue with timestamp and request context.",
      ]}
      primaryAction={{ href: "/dashboard/health", label: "Open Health Dashboard" }}
      secondaryAction={{ href: "/dashboard/logs", label: "Open Logs" }}
    />
  );
}
