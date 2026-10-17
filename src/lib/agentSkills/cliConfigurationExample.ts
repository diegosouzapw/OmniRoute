/** Examples for the configuration API keep credentials out of URLs and apply dry-run-only. */
import { DEFAULT_OMNIROUTE_BASE_URL } from "@/shared/utils/resolveOmniRouteBaseUrl";

export function buildCliConfigurationExample(
  operation: {
    path: string;
    method: string;
  },
  // Callers pass the base URL explicitly so generated output is a pure function of
  // its inputs. Reading process.env here made committed SKILL.md files depend on the
  // machine that generated them — see apiOperationExample.ts for the full rationale.
  baseUrl: string = DEFAULT_OMNIROUTE_BASE_URL
): string[] | undefined {
  const { path, method } = operation;
  if (path !== "/api/cli-tools/config" && path !== "/api/cli-tools/apply") return;
  if (method === "GET" && path === "/api/cli-tools/config") {
    return [
      `curl ${baseUrl}${path} \\`,
      '  -H "Authorization: Bearer $OMNIROUTE_TOKEN" \\',
      '  -H "x-omniroute-config-api-key: <configuration-api-key>"',
    ];
  }
  if (method !== "POST") return;
  const body = {
    toolId: "claude",
    apiKey: "<configuration-api-key>",
    ...(path.endsWith("/apply") ? { dryRun: true } : {}),
  };
  return [
    `curl -X POST ${baseUrl}${path} \\`,
    '  -H "Authorization: Bearer $OMNIROUTE_TOKEN" \\',
    '  -H "Content-Type: application/json" \\',
    `  -d '${JSON.stringify(body)}'`,
  ];
}
