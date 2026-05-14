import ErrorPageScaffold from "@/shared/components/ErrorPageScaffold";

export default function UnauthorizedPage() {
  return (
    <ErrorPageScaffold
      code="401"
      icon="lock"
      title="Let's get you signed in"
      description="You'll need to be signed in to see this — it only takes a moment."
      suggestions={[
        "Sign in again and retry whatever you were doing.",
        "Calling the API? Make sure your Bearer token is included and still valid.",
        "If you rotated the token recently, update your client with the new one.",
      ]}
      primaryAction={{ href: "/login", label: "Go to Login" }}
      secondaryAction={{ href: "/dashboard/api-manager", label: "Manage API Keys" }}
    />
  );
}
