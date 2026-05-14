import ErrorPageScaffold from "@/shared/components/ErrorPageScaffold";

export default function RequestTimeoutPage() {
  return (
    <ErrorPageScaffold
      code="408"
      icon="timer_off"
      title="That took longer than expected"
      description="The request didn't finish coming through in time. A quick retry usually does the trick."
      suggestions={[
        "Try again with a slightly smaller payload.",
        "Check your network — VPN or proxy latency can sneak up on you.",
        "For long-running calls, streaming or splitting the request keeps things flowing.",
      ]}
      primaryAction={{ href: "/dashboard/endpoint", label: "Open Endpoint Guide" }}
      secondaryAction={{ href: "/status", label: "Check Network Status" }}
    />
  );
}
