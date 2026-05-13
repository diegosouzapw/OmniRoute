import { requireManagementAuth } from "@/lib/api/requireManagementAuth";
import { getCommandCodeAuthSessionSafeStatus } from "@/lib/db/commandCodeAuth";

import { commandCodeStateSchema, noStoreJson, stateHashFromState } from "../shared";

async function readState(request: Request): Promise<string | null> {
  const urlState = new URL(request.url).searchParams.get("state");
  if (urlState) return urlState;
  try {
    const parsed = commandCodeStateSchema.safeParse(await request.json());
    return parsed.success ? parsed.data.state : null;
  } catch {
    return null;
  }
}

async function handle(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  const state = await readState(request);
  const parsed = commandCodeStateSchema.safeParse({ state });
  if (!parsed.success) return noStoreJson({ error: "Invalid state" }, { status: 400 });

  const session = getCommandCodeAuthSessionSafeStatus(stateHashFromState(parsed.data.state));
  if (!session) return noStoreJson({ status: "not_found" }, { status: 404 });

  return noStoreJson({
    status: session.status,
    metadata: session.metadata,
    expiresAt: session.expiresAt,
    receivedAt: session.receivedAt,
    appliedAt: session.appliedAt,
  });
}

export const GET = handle;
export const POST = handle;
