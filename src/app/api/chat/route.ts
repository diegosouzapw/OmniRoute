import { getOmniRouteApiUrl } from "@/lib/site/omniroute";

export async function POST(request: Request) {
  const body = await request.json();
  const apiKey = typeof body.apiKey === "string" ? body.apiKey : process.env.OMNIROUTE_DEMO_API_KEY;
  const model = typeof body.model === "string" && body.model.trim() ? body.model : "global";
  const message = typeof body.message === "string" ? body.message : "Ola";

  if (!apiKey) {
    return Response.json({
      demo: true,
      content:
        "Demo pronta. Configure OMNIROUTE_DEMO_API_KEY para o chat publico falar com a plataforma em tempo real.",
    });
  }

  const upstream = await fetch(`${getOmniRouteApiUrl()}/v1/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "user", content: message }],
      stream: false,
    }),
  });

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
