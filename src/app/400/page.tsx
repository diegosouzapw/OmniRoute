import ErrorPageScaffold from "@/shared/components/ErrorPageScaffold";

export default function BadRequestPage() {
  return (
    <ErrorPageScaffold
      code="400"
      icon="rule"
      title="We couldn't read that request"
      description="Looks like part of the request is missing or in the wrong shape — let's figure out what."
      suggestions={[
        "Double-check the required fields and payload format, then give it another go.",
        "Using the API? Validating the JSON locally usually surfaces the culprit.",
        "If this keeps coming up, the Translator Playground is great for inspecting payloads.",
      ]}
      primaryAction={{ href: "/docs", label: "Open Documentation" }}
      secondaryAction={{ href: "/dashboard/translator", label: "Open Translator" }}
    />
  );
}
