import { proxyJson } from "@/lib/site/omniroute";

export async function GET() {
  return proxyJson("/api/saas/public/plans");
}
