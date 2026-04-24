import { proxyJson } from "@/lib/site/omniroute";

export async function POST(request: Request) {
  return proxyJson("/api/saas/checkout/confirm", {
    method: "POST",
    body: await request.text(),
  });
}
