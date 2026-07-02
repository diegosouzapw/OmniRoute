import ErrorPageScaffold from "@/shared/components/ErrorPageScaffold";

export default function RequestTimeoutPage() {
  return (
    <ErrorPageScaffold
      code="408"
      icon="timer_off"
      title="Request Timeout"
      description="The server did not receive a complete request in time."
      suggestions={[
        "Retry the request with a smaller payload.",
        "Check your network stability and VPN/proxy latency.",
        "For long operations, enable streaming or split the request.",
      ]}
      primaryAction={{ href: "/dashboard/endpoint", label: "Open Endpoint Guide" }}
      secondaryAction={{ href: "/status", label: "Check Network Status" }}
    />
  );
}
