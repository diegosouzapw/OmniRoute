import { buildCliConfigurationExample } from "./cliConfigurationExample";
import { resolveOmniRouteBaseUrl } from "@/shared/utils/resolveOmniRouteBaseUrl";

interface Operation {
  path: string;
  method: string;
}

function dashboardExample({ path, method }: Operation): string[] {
  const baseUrl = resolveOmniRouteBaseUrl();
  if (path === "/api/auth/login" && method === "POST") {
    return [
      `curl -X POST ${baseUrl}${path} \\`,
      '  -H "Content-Type: application/json" \\',
      "  -c cookie.jar \\",
      '  -d \'{"password":"<management-password>"}\'',
    ];
  }
  if (method === "GET") {
    return [`curl ${baseUrl}${path} \\`, "  -b cookie.jar"];
  }
  const hasJsonBody = ["POST", "PUT", "PATCH"].includes(method);
  return [
    `CSRF_TOKEN=$(curl -s ${baseUrl}/api/auth/csrf -b cookie.jar | jq -r .token)`,
    `curl -X ${method} ${baseUrl}${path} \\`,
    "  -b cookie.jar \\",
    `  -H "x-omniroute-csrf: $CSRF_TOKEN"${hasJsonBody ? " \\" : ""}`,
    ...(hasJsonBody ? ['  -H "Content-Type: application/json" \\', "  -d '{}'"] : []),
  ];
}

function bearerExample({ path, method }: Operation): string[] {
  const baseUrl = resolveOmniRouteBaseUrl();
  const curlMethod = method === "GET" ? "" : `-X ${method} `;
  if (path === "/api/v1/video-bridge/drilldown" && ["GET", "DELETE"].includes(method)) {
    return [
      "# Set OMNIROUTE_VIDEO_HANDLE to one handle from the chat response's",
      "# x-omniroute-video-drilldown header, obtained with the same API key.",
      `curl --get ${curlMethod}${baseUrl}${path} \\`,
      '  -H "Authorization: Bearer $OMNIROUTE_TOKEN" \\',
      '  --data-urlencode "handle=$OMNIROUTE_VIDEO_HANDLE"',
    ];
  }
  const hasJsonBody = ["POST", "PUT", "PATCH"].includes(method);
  return [
    `curl ${curlMethod}${baseUrl}${path} \\`,
    `  -H "Authorization: Bearer $OMNIROUTE_TOKEN"${hasJsonBody ? " \\" : ""}`,
    ...(hasJsonBody ? ['  -H "Content-Type: application/json" \\', "  -d '{}'"] : []),
  ];
}

/** Preserve the authentication model while supplying a valid configuration example. */
export function buildApiOperationExample(
  operation: Operation,
  dashboardSession: boolean
): string[] {
  return (
    buildCliConfigurationExample(operation) ??
    (dashboardSession ? dashboardExample(operation) : bearerExample(operation))
  );
}
