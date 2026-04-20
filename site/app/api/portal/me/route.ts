import { proxyJson } from "@/lib/omniroute";

export async function POST(request: Request) {
  return proxyJson("/api/saas/portal/me", {
    method: "POST",
    body: await request.text(),
  });
}
