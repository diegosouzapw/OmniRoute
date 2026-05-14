import ErrorPageScaffold from "@/shared/components/ErrorPageScaffold";

export default function BadGatewayPage() {
  return (
    <ErrorPageScaffold
      code="502"
      icon="hub"
      title="An upstream provider tripped up"
      description="One of your upstream providers sent back something we couldn't use. Let's try a different route."
      suggestions={[
        "Retry with a different provider or combo and see if it clears up.",
        "Sanity-check provider credentials and that the model is still available.",
        "If you're translating between formats, the Translator can show you what came back.",
      ]}
      primaryAction={{ href: "/dashboard/providers", label: "Open Providers" }}
      secondaryAction={{ href: "/dashboard/translator", label: "Open Translator" }}
    />
  );
}
