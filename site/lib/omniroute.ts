const DEFAULT_OMNIROUTE_API_URL = "http://127.0.0.1:20128";

export function getOmniRouteApiUrl() {
  return (process.env.OMNIROUTE_API_URL || DEFAULT_OMNIROUTE_API_URL).replace(/\/$/, "");
}

export function getPublicBaseUrl() {
  return (process.env.OMNIROUTE_PUBLIC_BASE_URL || "https://ai.ramelseg.com.br/v1").replace(
    /\/$/,
    ""
  );
}

export async function proxyJson(path: string, init?: RequestInit) {
  const response = await fetch(`${getOmniRouteApiUrl()}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    cache: "no-store",
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : {};
  return Response.json(data, { status: response.status });
}
