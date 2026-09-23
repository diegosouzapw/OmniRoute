// Extracted from proxyFetch.ts (frozen file-size baseline — #14309) so the
// transport-error diagnostics built there can be redacted without growing
// the frozen file.
//
// #10032 keeps the underlying transport failure reason in the propagated
// error for diagnosability, but the raw message can embed a full proxy URL
// — including userinfo credentials — which must never bubble into response
// bodies (#9837, Hard Rule #12).

/**
 * Redact proxy URLs (and any bare `user:pass@host` credential tokens) from an
 * upstream transport-error message before it is surfaced.
 */
export function redactProxyDetailsInMessage(message: string): string {
  return message
    .replace(/\b(?:https?|socks[45][ah]?|socks):\/\/\S+/gi, "[redacted-proxy]")
    .replace(/\b[^\s:@/]+:[^\s@/]*@\S+/g, "[redacted-proxy]");
}

/**
 * Builds the `.proxyFetchDetail` diagnosis for proxyFetch.ts's direct-path
 * (pooled undici dispatcher + native fetch fallback) branches, redacted the
 * same way as the proxy-path message (see redactProxyDetailsInMessage above).
 */
export function describeFallbackFailure(dispatcherCause: string, nativeDetail: string): string {
  return redactProxyDetailsInMessage(`dispatcher=[${dispatcherCause}] native=[${nativeDetail}]`);
}
