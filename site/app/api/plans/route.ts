import { proxyJson } from "@/lib/omniroute";

export async function GET() {
  return proxyJson("/api/saas/public/plans");
}
