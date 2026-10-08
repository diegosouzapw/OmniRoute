const STATE_REQUEST_TIMEOUT_MS = 15_000;

export type TraeAuthorizeStateResult =
  { ok: true; state: string } | { ok: false; message: string | null };

/**
 * Asks the server for the one-time state the Trae login is tied to. On failure `message`
 * is what the server said (or the HTTP status), and null when the request itself failed
 * or timed out, so the caller can fall back to its own wording.
 */
export async function requestTraeAuthorizeState(
  fetchImpl: typeof fetch = fetch
): Promise<TraeAuthorizeStateResult> {
  try {
    const res = await fetchImpl("/api/oauth/trae/authorize-state", {
      method: "POST",
      signal: AbortSignal.timeout(STATE_REQUEST_TIMEOUT_MS),
    });
    const data = await res.json().catch(() => null);
    if (res.ok && typeof data?.state === "string") return { ok: true, state: data.state };
    const serverMessage =
      typeof data?.error?.message === "string"
        ? data.error.message
        : typeof data?.error === "string"
          ? data.error
          : null;
    return { ok: false, message: serverMessage || `HTTP ${res.status}` };
  } catch {
    return { ok: false, message: null };
  }
}
