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

function safeParseJson(text: string) {
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    return null;
  }
}

export async function proxyJson(path: string, init?: RequestInit) {
  try {
    const response = await fetch(`${getOmniRouteApiUrl()}${path}`, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(init?.headers || {}),
      },
      cache: "no-store",
    });

    const text = await response.text();
    const data = safeParseJson(text);
    if (data !== null) {
      return Response.json(data, { status: response.status });
    }

    return Response.json(
      {
        error:
          "Nao foi possivel interpretar a resposta do servidor principal. Tente novamente em instantes.",
      },
      { status: 502 }
    );
  } catch {
    return Response.json(
      {
        error:
          "Nao foi possivel conectar a landing ao servidor principal agora. Tente novamente em instantes.",
      },
      { status: 502 }
    );
  }
}
