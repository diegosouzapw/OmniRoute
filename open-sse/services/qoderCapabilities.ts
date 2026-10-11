type QoderCredentials = {
  apiKey?: unknown;
  accessToken?: unknown;
  refreshToken?: unknown;
};

/** Match the executor's credential precedence, including the optional host PAT. */
export function resolveQoderAuthToken(credentials: QoderCredentials): string {
  for (const key of ["apiKey", "accessToken", "refreshToken"] as const) {
    const token = credentials[key];
    if (typeof token === "string" && token.trim()) return token.trim();
  }
  return String(process.env.QODER_PERSONAL_ACCESS_TOKEN || "").trim();
}

export function qoderSupportsCallerTools(credentials: QoderCredentials): boolean {
  return !resolveQoderAuthToken(credentials).startsWith("pt-");
}

export function hasQoderCallerTools(body: unknown): boolean {
  if (!body || typeof body !== "object") return false;
  const request = body as Record<string, unknown>;
  return [request.tools, request.functions].some(
    (tools) => Array.isArray(tools) && tools.length > 0
  );
}
