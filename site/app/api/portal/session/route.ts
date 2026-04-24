import { cookies } from "next/headers";
import { proxyJson } from "@/lib/omniroute";
import { getPortalCookieName, verifyPortalSession } from "@/lib/portalSession";

export async function GET() {
  const store = await cookies();
  const token = store.get(getPortalCookieName())?.value;
  if (!token) {
    return Response.json(
      { error: "Sua sessao nao esta ativa no momento. Entre novamente para continuar." },
      { status: 401 }
    );
  }

  try {
    const session = await verifyPortalSession(token);
    const upstream = await proxyJson("/api/saas/portal/me", {
      method: "POST",
      body: JSON.stringify({
        email: session.email,
        apiKey: session.apiKey,
      }),
    });
    const payload = await upstream.json();
    if (!upstream.ok) {
      store.delete(getPortalCookieName());
      return Response.json(payload, { status: upstream.status });
    }
    return Response.json({
      ...payload,
      auth: {
        email: session.email,
        customerId: session.customerId,
      },
    });
  } catch {
    store.delete(getPortalCookieName());
    return Response.json(
      { error: "Sua sessao expirou por seguranca. Entre novamente para continuar." },
      { status: 401 }
    );
  }
}
