import { proxyJson } from "@/lib/omniroute";

export async function POST(request: Request) {
  return proxyJson("/api/saas/checkout/start", {
    method: "POST",
    body: await request.text(),
  });
}
