import { getCliproxyAccountHealth } from "@/lib/services/cliproxyAccountHealth";
import { isAuthenticated } from "@/shared/utils/apiAuth";

export const dynamic = "force-dynamic";

export async function GET(request: Request): Promise<Response> {
  if (!(await isAuthenticated(request))) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  return Response.json(await getCliproxyAccountHealth(), {
    headers: { "Cache-Control": "no-store" },
  });
}
