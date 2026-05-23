import { getApiKeys } from "@/lib/localDb";
import { getOmniRouteApiUrl } from "@/lib/site/omniroute";

function isUsableKey(row: any): boolean {
  if (!row || typeof row.key !== "string" || !row.key.trim()) return false;
  if (row.isActive === false || row.isBanned === true) return false;
  if (row.revokedAt) return false;
  if (row.expiresAt) {
    const expiresAt = new Date(row.expiresAt).getTime();
    if (!Number.isNaN(expiresAt) && expiresAt <= Date.now()) return false;
  }
  return true;
}

export async function POST(request: Request) {
  const body = await request.json();
  let apiKey =
    typeof body.apiKey === "string" && body.apiKey.trim()
      ? body.apiKey.trim()
      : process.env.OMNIROUTE_DEMO_API_KEY;

  const model = typeof body.model === "string" && body.model.trim() ? body.model : "global";
  const message = typeof body.message === "string" ? body.message : "Ola";

  if (!apiKey) {
    try {
      const keys = await getApiKeys();
      const usable = Array.isArray(keys) ? keys.find(isUsableKey) : null;
      if (usable?.key) apiKey = usable.key;
    } catch {
      // ignore fallback lookup errors; handled below
    }
  }

  if (!apiKey) {
    return Response.json({
      demo: true,
      content:
        "Nenhuma API key ativa encontrada. Configure OMNIROUTE_DEMO_API_KEY ou ative uma API key no painel.",
    });
  }

  const payload = JSON.stringify({
    model,
    messages: [{ role: "user", content: message }],
    stream: false,
  });
  const headers = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };

  const configuredBase = getOmniRouteApiUrl().replace(/\/+$/, "");
  const localBase = new URL(request.url).origin;
  const primaryUrl = `${configuredBase}/v1/chat/completions`;
  const secondaryUrl = `${localBase}/api/v1/chat/completions`;

  let upstream: Response;
  try {
    upstream = await fetch(primaryUrl, {
      method: "POST",
      headers,
      body: payload,
    });
  } catch {
    upstream = await fetch(secondaryUrl, {
      method: "POST",
      headers,
      body: payload,
    });
  }

  const text = await upstream.text();
  let data: any = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { error: text };
  }

  if (!upstream.ok) {
    return Response.json(data, { status: upstream.status });
  }

  return Response.json({
    content: data?.choices?.[0]?.message?.content || data?.output_text || "Sem retorno textual.",
    raw: data,
  });
}
