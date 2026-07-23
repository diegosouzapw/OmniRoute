import { sanitizeVscodeRequest } from "@/app/api/v1/vscode/contextSanitizer";

// Path-token endpoints carry the API key in the URL (by design, for Ollama/VS Code clients that
// cannot send an Authorization header). URLs leak via access logs, proxies, and browser history,
// so we alert the operator once per process when such an endpoint is exercised (Seg4 hardening).
let hasWarnedTokenInUrl = false;

export const __vscodeRawInternals = {
  resetTokenInUrlWarning() {
    hasWarnedTokenInUrl = false;
  },
};

function warnTokenInUrlOnce() {
  if (hasWarnedTokenInUrl) return;
  hasWarnedTokenInUrl = true;
  console.warn(
    "[VSCODE][SECURITY] A path-token endpoint (/api/v1/vscode/raw/[token] or /api/v1/vscode/[token]) " +
      "was used. The API key travels in the request URL and can leak via access logs, proxies, and " +
      "browser history. Prefer the Authorization header where the client supports it."
  );
}

function inferTokenFromVscodePath(request: Request) {
  try {
    const url = new URL(request.url, "http://localhost");
    const segments = url.pathname
      .split("/")
      .map((segment) => segment.trim())
      .filter(Boolean);

    const vscodeIndex = segments.indexOf("vscode");
    if (vscodeIndex === -1) return null;

    const candidate = segments[vscodeIndex + 1];
    if (!candidate || candidate === "raw" || candidate === "combos") {
      const nestedCandidate = segments[vscodeIndex + 2];
      return nestedCandidate ? decodeURIComponent(nestedCandidate) : null;
    }

    return decodeURIComponent(candidate);
  } catch {
    return null;
  }
}

export function withPathTokenApiKey(request: Request, token?: string) {
  const resolvedToken = token || inferTokenFromVscodePath(request);
  if (!resolvedToken) return request;

  warnTokenInUrlOnce();

  const headers = new Headers(request.headers);

  if (!headers.has("x-api-key")) {
    headers.set("x-api-key", resolvedToken);
  }

  if (!headers.has("authorization")) {
    headers.set("authorization", `Bearer ${resolvedToken}`);
  }

  const method = request.method;
  const init: RequestInit & { duplex?: "half" } = {
    method,
    headers,
  };

  if (method !== "GET" && method !== "HEAD") {
    init.body = request.body;
    init.duplex = "half";
  }

  return new Request(request.url, init);
}

export async function withSanitizedPathTokenApiKey(request: Request, token?: string) {
  return sanitizeVscodeRequest(withPathTokenApiKey(request, token));
}
