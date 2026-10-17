import { buildCliConfigurationExample } from "./cliConfigurationExample";
import { DEFAULT_OMNIROUTE_BASE_URL } from "@/shared/utils/resolveOmniRouteBaseUrl";

interface Operation {
  path: string;
  method: string;
}

function dashboardExample({ path, method }: Operation, baseUrl: string): string[] {
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

function bearerExample({ path, method }: Operation, baseUrl: string): string[] {
  const curlMethod = method === "GET" ? "" : `-X ${method} `;
  const hasJsonBody = ["POST", "PUT", "PATCH"].includes(method);
  return [
    `curl ${curlMethod}${baseUrl}${path} \\`,
    `  -H "Authorization: Bearer $OMNIROUTE_TOKEN"${hasJsonBody ? " \\" : ""}`,
    ...(hasJsonBody ? ['  -H "Content-Type: application/json" \\', "  -d '{}'"] : []),
  ];
}

/**
 * Preserve the authentication model while supplying a valid configuration example.
 *
 * `baseUrl` is an explicit input, not something resolved from `process.env` in here.
 * The only consumer is the SKILL.md generator, whose output is committed to the repo
 * and then diff-gated by `check:agent-skills-sync`. Resolving the environment at this
 * depth made that committed artifact a function of whoever last ran the generator:
 * anyone with `PORT`/`BASE_URL`/`OMNIROUTE_BASE_URL` set wrote their own host into the
 * files, and CI — which sets none of them — then reported drift. Callers that genuinely
 * want the configured host pass `resolveOmniRouteBaseUrl()` themselves; the default
 * stays canonical so regeneration is reproducible on any machine.
 */
export function buildApiOperationExample(
  operation: Operation,
  dashboardSession: boolean,
  baseUrl: string = DEFAULT_OMNIROUTE_BASE_URL
): string[] {
  return (
    buildCliConfigurationExample(operation, baseUrl) ??
    (dashboardSession ? dashboardExample(operation, baseUrl) : bearerExample(operation, baseUrl))
  );
}
