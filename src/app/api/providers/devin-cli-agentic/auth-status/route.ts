import { getDevinAgenticAuthStatus } from "@/lib/providers/devinAgenticAuthStatus";

export const runtime = "nodejs";

/** GET /api/providers/devin-cli-agentic/auth-status */
export async function GET() {
  const status = await getDevinAgenticAuthStatus();
  return Response.json({ status }, { headers: { "Cache-Control": "no-store" } });
}
