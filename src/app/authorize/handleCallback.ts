import { createProviderConnection } from "@/models";
import { consumeTraeLoginState } from "@/lib/oauth/traeLoginState";
import { parseTraeCallbackQuery } from "./parseCallback";

// A failure carries the login trace id back so the dashboard modal, which only accepts
// messages for the login it started, can show why the login failed.
export type TraeCallbackResult =
  | { success: true; connectionId: string; loginTraceId: string }
  | { success: false; error: string; loginTraceId?: string };

/**
 * Turns the Trae loopback callback into a provider connection. The callback carries
 * the whole credential set in its query string and this route is reachable without a
 * session, so it is only honoured for a login state the dashboard requested first.
 */
export async function handleTraeCallback(query: URLSearchParams): Promise<TraeCallbackResult> {
  const loginTraceId = query.get("loginTraceID") ?? undefined;

  const parsed = parseTraeCallbackQuery(query);
  if (parsed.ok === false) return { success: false, error: parsed.error, loginTraceId };

  // The state is used up before the write so two concurrent callbacks cannot both save.
  if (!consumeTraeLoginState(loginTraceId)) {
    return { success: false, error: "Unknown or expired login request", loginTraceId };
  }

  const connection = await createProviderConnection(parsed.record);
  const connectionId = connection?.id;
  if (typeof connectionId !== "string") {
    return { success: false, error: "Could not save the connection", loginTraceId };
  }
  return { success: true, connectionId, loginTraceId: loginTraceId as string };
}
