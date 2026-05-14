import ErrorPageScaffold from "@/shared/components/ErrorPageScaffold";

export default function ForbiddenStatusPage() {
  return (
    <ErrorPageScaffold
      code="403"
      icon="gpp_bad"
      title="This one's locked"
      description="We see what you're asking for, but a policy is keeping you out. Here's how to get unblocked."
      suggestions={[
        "Peek at your IP allowlist/blocklist rules in settings.",
        "Check the model and budget policies tied to your API key.",
        "If you need broader access, an admin can grant the right permission scope.",
      ]}
      primaryAction={{ href: "/forbidden", label: "Open Access Help" }}
      secondaryAction={{
        href: "/dashboard/settings?tab=security",
        label: "Open Security Settings",
      }}
    />
  );
}
