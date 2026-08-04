export type CodexWireApi = "chat" | "responses";

function normalizeUrlPath(pathname: string, wireApi: CodexWireApi): string {
  let path = pathname.replace(/\/+$/g, "");

  if (wireApi === "responses") {
    path = path.replace(/\/responses(?:\/.*)?$/i, "");
  }

  path = path.replace(/\/v1$/i, "").replace(/\/api$/i, "");
  const v1Path = `${path}/v1`.replace(/\/{2,}/g, "/");
  return v1Path.startsWith("/") ? v1Path : `/${v1Path}`;
}

export function normalizeCodexBaseUrl(baseUrl: string, wireApi: CodexWireApi = "chat"): string {
  const trimmed = baseUrl.trim().replace(/\/+$/g, "");
  if (!trimmed) return trimmed;

  try {
    const parsed = new URL(trimmed);
    parsed.search = "";
    parsed.hash = "";
    parsed.pathname = normalizeUrlPath(parsed.pathname, wireApi);
    return parsed.toString().replace(/\/+$/g, "");
  } catch {
    let normalized = trimmed;
    if (wireApi === "responses") {
      normalized = normalized.replace(/\/responses(?:\/.*)?$/i, "");
    }
    return normalized.replace(/\/v1$/i, "").replace(/\/api$/i, "") + "/v1";
  }
}
