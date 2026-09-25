import { buildCliConfigurationExample } from "./cliConfigurationExample";

interface Operation {
  path: string;
  method: string;
}

function dashboardExample({ path, method }: Operation): string[] {
  if (path === "/api/auth/login" && method === "POST") {
    return [
      `curl -X POST https://localhost:20128${path} \\`,
      '  -H "Content-Type: application/json" \\',
      "  -c cookie.jar \\",
      '  -d \'{"password":"<management-password>"}\'',
    ];
  }
  if (method === "GET") {
    return [`curl https://localhost:20128${path} \\`, "  -b cookie.jar"];
  }
  const hasJsonBody = ["POST", "PUT", "PATCH"].includes(method);
  return [
    "CSRF_TOKEN=$(curl -s https://localhost:20128/api/auth/csrf -b cookie.jar | jq -r .token)",
    `curl -X ${method} https://localhost:20128${path} \\`,
    "  -b cookie.jar \\",
    `  -H "x-omniroute-csrf: $CSRF_TOKEN"${hasJsonBody ? " \\" : ""}`,
    ...(hasJsonBody ? ['  -H "Content-Type: application/json" \\', "  -d '{}'"] : []),
  ];
}

function bearerExample({ path, method }: Operation): string[] {
  const curlMethod = method === "GET" ? "" : `-X ${method} `;
  const hasJsonBody = ["POST", "PUT", "PATCH"].includes(method);
  return [
    `curl ${curlMethod}https://localhost:20128${path} \\`,
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
