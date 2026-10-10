import { NextResponse } from "next/server";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { requestSupervisedShutdown } from "@/lib/system/supervisedShutdown";

export async function POST(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const response = NextResponse.json({ success: true, message: "Shutting down..." });

  setTimeout(() => {
    if (requestSupervisedShutdown() === "supervisor") return;
    process.kill(process.pid, "SIGTERM");
  }, 500);

  return response;
}
