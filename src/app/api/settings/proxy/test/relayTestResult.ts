// #5716 — shape the relay proxy-test response. Pure (no DB / network / Next
// imports) so it is unit-testable in isolation. When the relay *responds* with a
// non-200 (e.g. 401 from an auth-token mismatch), the old inline response set
// `success: false` but carried no `error` field, so the dashboard rendered a bare
// "failed" with no diagnostic and nothing was logged server-side.

export interface RelayTestResult {
  success: boolean;
  publicIp: string | null;
  latencyMs: number;
  proxyUrl: string;
  error?: string;
}

export function buildRelayTestResult(input: {
  statusCode: number;
  publicIp: string | null;
  latencyMs: number;
  relayUrl: string;
  relayAuthPresent: boolean;
}): RelayTestResult {
  const { statusCode, publicIp, latencyMs, relayUrl, relayAuthPresent } = input;
  const success = statusCode === 200;
  const result: RelayTestResult = { success, publicIp, latencyMs, proxyUrl: relayUrl };
  if (!success) {
    let error = `Relay returned HTTP ${statusCode}`;
    if (statusCode === 401 || statusCode === 403) {
      error += relayAuthPresent
        ? " — the relay rejected the auth token; redeploy the relay so its token matches, or check STORAGE_ENCRYPTION_KEY"
        : " — no relay auth token was found; redeploy the relay, or check for a STORAGE_ENCRYPTION_KEY rotation";
    }
    result.error = error;
  }
  return result;
}
