import { markCommandCodeAuthSessionReceived } from "@/lib/db/commandCodeAuth";

import {
  callbackCorsHeaders,
  commandCodeCallbackSchema,
  MAX_CALLBACK_BODY_BYTES,
  noStoreJson,
  readJsonBodyWithLimit,
  rejectDisallowedCallbackOrigin,
  stateHashFromState,
} from "../shared";

export async function OPTIONS(request: Request) {
  return new Response(null, { status: 204, headers: callbackCorsHeaders(request) });
}

export async function POST(request: Request) {
  const originError = rejectDisallowedCallbackOrigin(request);
  if (originError) return originError;

  let body: unknown;
  try {
    body = await readJsonBodyWithLimit(request, MAX_CALLBACK_BODY_BYTES);
  } catch (error) {
    const isTooLarge = error instanceof Error && error.message === "BODY_TOO_LARGE";
    return noStoreJson(
      { success: false, error: isTooLarge ? "Request body too large" : "Invalid JSON body" },
      { status: isTooLarge ? 413 : 400, headers: callbackCorsHeaders(request) }
    );
  }

  const parsed = commandCodeCallbackSchema.safeParse(body);
  if (!parsed.success) {
    return noStoreJson(
      { success: false, error: "Invalid callback payload" },
      { status: 400, headers: callbackCorsHeaders(request) }
    );
  }

  const session = markCommandCodeAuthSessionReceived({
    stateHash: stateHashFromState(parsed.data.state),
    apiKey: parsed.data.apiKey,
    metadata: {
      userId: parsed.data.userId,
      userName: parsed.data.userName,
      keyName: parsed.data.keyName,
    },
  });

  if (!session || session.status !== "received") {
    return noStoreJson(
      { success: false, error: "Invalid or expired state" },
      { status: 400, headers: callbackCorsHeaders(request) }
    );
  }

  return noStoreJson(
    {
      success: true,
      ok: true,
      status: session.status,
      expiresAt: session.expiresAt,
      metadata: session.metadata,
    },
    { headers: callbackCorsHeaders(request) }
  );
}
