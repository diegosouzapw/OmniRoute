export function isResponsesEndpointPath(endpointPath?: string | null): boolean {
  let normalizedEndpoint = String(endpointPath || "");
  while (normalizedEndpoint.endsWith("/")) normalizedEndpoint = normalizedEndpoint.slice(0, -1);
  return normalizedEndpoint.split("/").includes("responses");
}
