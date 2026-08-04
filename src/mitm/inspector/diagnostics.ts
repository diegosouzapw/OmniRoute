/**
 * Capture-pipeline self-test (Gap 12).
 *
 * MITM/AgentBridge setups fail silently in several independent ways — the cert
 * is not trusted, the hosts are not spoofed, the server is down or unreachable
 * on its port — and the user gets nothing actionable, just an empty capture
 * list. `summarizeDiagnostics()` is the pure core: given each check's boolean
 * result it produces a single `healthy` verdict plus a per-failure hint telling
 * the user exactly what to fix. The route layer runs the effectful checks
 * (getMitmStatus, checkCertInstalled, a TCP probe, checkDNSEntry) and feeds the
 * booleans in here.
 */

export interface DiagnosticInput {
  serverRunning: boolean;
  serverReachable: boolean;
  certExists: boolean;
  certTrusted: boolean;
  dnsConfigured: boolean;
}

export interface DiagnosticCheck {
  name: string;
  ok: boolean;
  /** Actionable remediation when `ok` is false; null when the check passes. */
  hint: string | null;
}

export interface DiagnosticReport {
  healthy: boolean;
  checks: DiagnosticCheck[];
}

function check(name: string, ok: boolean, failHint: string): DiagnosticCheck {
  return { name, ok, hint: ok ? null : failHint };
}

export function summarizeDiagnostics(input: DiagnosticInput): DiagnosticReport {
  const checks: DiagnosticCheck[] = [
    check(
      "server-running",
      input.serverRunning,
      "The MITM server is not running. Start it from the AgentBridge tab."
    ),
    check(
      "server-reachable",
      input.serverReachable,
      "The MITM server is not accepting connections on its port. Check that the port is free and that you have privileges to bind it."
    ),
    check(
      "cert-exists",
      input.certExists,
      "No MITM certificate has been generated yet. Generate one from the AgentBridge tab."
    ),
    check(
      "cert-trusted",
      input.certTrusted,
      "The MITM root CA is not trusted by the OS store, so TLS interception will fail. Trust the certificate from the AgentBridge tab."
    ),
    check(
      "dns-configured",
      input.dnsConfigured,
      "Target hostnames are not spoofed in /etc/hosts, so traffic never reaches the proxy. Enable DNS for the agent(s) you want to capture."
    ),
  ];
  return { healthy: checks.every((c) => c.ok), checks };
}
