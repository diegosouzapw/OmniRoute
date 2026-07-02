import ErrorPageScaffold from "@/shared/components/ErrorPageScaffold";

export default function BadRequestPage() {
  return (
    <ErrorPageScaffold
      code="400"
      icon="rule"
      title="Bad Request"
      description="The request payload is invalid or incomplete."
      suggestions={[
        "Review required fields and payload format before retrying.",
        "If you are using the API, validate the JSON schema locally.",
        "If this keeps happening, open the request in Translator Playground to inspect the payload.",
      ]}
      primaryAction={{ href: "/docs", label: "Open Documentation" }}
      secondaryAction={{ href: "/dashboard/translator", label: "Open Translator" }}
    />
  );
}
