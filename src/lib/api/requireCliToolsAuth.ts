import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function requireCliToolsAuth(request: Request): Promise<Response | null> {
  return requireManagementAuth(request);
}
