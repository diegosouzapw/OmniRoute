import { proxyJson } from "@/lib/omniroute";

export async function POST(request: Request) {
  return proxyJson("/api/saas/public/signup", {
    method: "POST",
    body: await request.text(),
  });
}
