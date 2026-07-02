import ErrorPageScaffold from "@/shared/components/ErrorPageScaffold";

export default function BadGatewayPage() {
  return (
    <ErrorPageScaffold
      code="502"
      icon="hub"
      title="Bad Gateway"
      description="Upstream provider or gateway integration returned an invalid response."
      suggestions={[
        "Retry with another provider or active combo route.",
        "Check provider credentials and model availability.",
        "Inspect translator output if format conversion is involved.",
      ]}
      primaryAction={{ href: "/dashboard/providers", label: "Open Providers" }}
      secondaryAction={{ href: "/dashboard/translator", label: "Open Translator" }}
    />
  );
}
