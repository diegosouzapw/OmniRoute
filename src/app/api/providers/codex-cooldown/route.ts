import { NextResponse } from "next/server";
import { z } from "zod";
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { clearCodexAccountCooldown } from "@/lib/db/providers/codexAccountRecovery";
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

const schema = z.object({ connectionId: z.string().trim().min(1).max(256) }).strict();

export async function POST(request: Request) {
  const authError = await requireManagementAuth(request, { alwaysRequireAuth: true });
  if (authError) return authError;
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success)
    return NextResponse.json({ error: "Invalid connectionId." }, { status: 400 });
  try {
    const result = await clearCodexAccountCooldown(parsed.data.connectionId);
    if (!result) return NextResponse.json({ error: "Codex account not found." }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: sanitizeErrorMessage(error) }, { status: 500 });
  }
}
