import { cookies } from "next/headers";
import { proxyJson } from "@/lib/omniroute";
import { getPortalCookieName, signPortalSession } from "@/lib/portalSession";

export async function POST(request: Request) {
  const upstream = await proxyJson("/api/saas/portal/login", {
    method: "POST",
    body: await request.text(),
  });
  const payload = await upstream.json();

  if (!upstream.ok) {
    return Response.json(payload, { status: upstream.status });
  }

  const token = await signPortalSession({
    email: payload?.auth?.email || "",
    apiKey: payload?.auth?.apiKey || "",
    customerId: payload?.auth?.customerId || "",
  });
  const store = await cookies();
  store.set(getPortalCookieName(), token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return Response.json(payload);
}
