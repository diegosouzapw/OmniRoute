import { cookies } from "next/headers";
import { getPortalCookieName } from "@/lib/portalSession";

export async function POST() {
  const store = await cookies();
  store.delete(getPortalCookieName());
  return Response.json({ ok: true });
}
