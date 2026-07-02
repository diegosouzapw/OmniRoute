import ErrorPageScaffold from "@/shared/components/ErrorPageScaffold";

export default function ForbiddenStatusPage() {
  return (
    <ErrorPageScaffold
      code="403"
      icon="gpp_bad"
      title="Forbidden"
      description="Your request was understood, but access is denied by policy."
      suggestions={[
        "Check IP allowlist/blocklist rules in settings.",
        "Verify model and budget policies assigned to your API key.",
        "Ask an administrator to grant the required permission scope.",
      ]}
      primaryAction={{ href: "/forbidden", label: "Open Access Help" }}
      secondaryAction={{
        href: "/dashboard/settings?tab=security",
        label: "Open Security Settings",
      }}
    />
  );
}
