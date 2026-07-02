import ErrorPageScaffold from "@/shared/components/ErrorPageScaffold";

export default function UnauthorizedPage() {
  return (
    <ErrorPageScaffold
      code="401"
      icon="lock"
      title="Unauthorized"
      description="Authentication is required to access this resource."
      suggestions={[
        "Sign in again and retry the operation.",
        "For API calls, confirm the Bearer token is present and valid.",
        "If the token was recently rotated, update your client credentials.",
      ]}
      primaryAction={{ href: "/login", label: "Go to Login" }}
      secondaryAction={{ href: "/dashboard/api-manager", label: "Manage API Keys" }}
    />
  );
}
