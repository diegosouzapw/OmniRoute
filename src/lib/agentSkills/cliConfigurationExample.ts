/** Examples for the configuration API keep credentials out of URLs and apply dry-run-only. */
export function buildCliConfigurationExample(operation: {
  path: string;
  method: string;
}): string[] | undefined {
  const { path, method } = operation;
  if (path !== "/api/cli-tools/config" && path !== "/api/cli-tools/apply") return;
  if (method === "GET" && path === "/api/cli-tools/config") {
    return [
      `curl https://localhost:20128${path} \\`,
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
    `curl -X POST https://localhost:20128${path} \\`,
    '  -H "Authorization: Bearer $OMNIROUTE_TOKEN" \\',
    '  -H "Content-Type: application/json" \\',
    `  -d '${JSON.stringify(body)}'`,
  ];
}
