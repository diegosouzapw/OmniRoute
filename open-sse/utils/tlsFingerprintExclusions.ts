/**
 * Providers/hosts excluded from Chrome TLS impersonation (#13445, restored in #14062).
 * Cloudflare answers the spoofed Groq fingerprint with 1010 browser_signature_banned, so Groq
 * stays on the plain dispatcher even when TLS_FINGERPRINT_PROVIDERS lists it.
 */
function isGroqTlsFingerprintHost(url: string | null | undefined): boolean {
  if (!url) return false;
  try {
    const host = new URL(url).hostname.toLowerCase();
    return host === "api.groq.com" || host.endsWith(".groq.com");
  } catch {
    return /(?:^|[./])api\.groq\.com(?:[:/?]|$)/i.test(String(url));
  }
}

function isGroqTlsFingerprintExcluded(
  provider: string | null | undefined,
  url?: string | null
): boolean {
  return provider?.trim().toLowerCase() === "groq" || isGroqTlsFingerprintHost(url);
}

export function tlsFingerprintProviderAllowed(
  provider: string | null | undefined,
  proxied: boolean,
  url?: string | null
): boolean {
  if (isGroqTlsFingerprintExcluded(provider, url)) return false;
  const configured = process.env.TLS_FINGERPRINT_PROVIDERS?.trim();
  // Preserve the legacy direct-only opt-in. The new proxied transport requires
  // an explicit allowlist so enabling TLS cannot silently change proxy traffic.
  if (!configured) return !proxied;
  if (!provider) return false;
  const normalizedProvider = provider.trim().toLowerCase();
  return configured
    .split(",")
    .some((candidate) => candidate.trim().toLowerCase() === normalizedProvider);
}
