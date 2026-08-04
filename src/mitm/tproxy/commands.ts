/**
 * Fase 3 / Epic A — TPROXY transparent capture mode (Linux): command builder.
 *
 * A 5th capture mode that intercepts TCP transparently via Linux TPROXY + policy
 * routing, WITHOUT spoofing `/etc/hosts` or mutating OS-wide system-proxy
 * settings (headless-friendly, auto-flushed on reboot).
 *
 * ⚠️ OUTPUT-based recipe (validated e2e on the VPS, kernel 6.8.0): the MITM use
 * case is LOCAL outbound traffic (IDE agents on the same host), which TPROXY in
 * PREROUTING does NOT see — PREROUTING only sees *forwarded* traffic. So we mark
 * new local outbound connections in the `mangle OUTPUT` chain, an `ip rule`
 * reroutes the marked packets to local delivery (`lo`), and on re-entry the
 * `mangle PREROUTING` TPROXY target assigns them to the IP_TRANSPARENT listener.
 * (An earlier PREROUTING-only recipe was proven not to intercept local traffic.)
 *
 * Validated recipe (test port 9999, fwmark 0x2333 — isolated from prod 443/80):
 *   iptables -t mangle -A OUTPUT -p tcp --dport N [-m mark ! --mark BYPASS] -j MARK --set-mark M
 *   ip rule add fwmark M lookup T
 *   ip route add local 0.0.0.0/0 dev lo table T
 *   iptables -t mangle -A PREROUTING -p tcp --dport N -m mark --mark M -j TPROXY --on-port L --tproxy-mark M
 * Result: client CONNECTED, listener saw orig-dest preserved (198.51.100.7:9999).
 *
 * Pure + unit-testable: the exact `iptables`/`ip` commands for apply and revert,
 * with the invariant that **revert is the precise inverse of apply, in reverse
 * order** — a crash must never leave a mangle rule behind (the Fase 1 /
 * `repairMitm()` invariant). `setup.ts` runs these via `execFile` (arrays, never
 * a shell string — Hard Rule #13).
 *
 * `bypassMark` (anti-loop): the SO_MARK the proxy sets on its OWN upstream
 * connections; the OUTPUT rule excludes it so the proxy's forwarded traffic is
 * not re-intercepted (infinite loop). When omitted, no exclusion is emitted
 * (fine for a metadata-only listener that never forwards).
 */

export interface TproxyConfig {
  /** Destination TCP port to transparently intercept (e.g. 443). */
  dport: number;
  /** Firewall mark set on OUTPUT and matched by the ip rule + PREROUTING (e.g. 0x2333). */
  mark: number;
  /** Local port the IP_TRANSPARENT listener binds (e.g. 8443). */
  onPort: number;
  /** Policy-routing table id holding the `local 0.0.0.0/0` route (e.g. 233). */
  routeTable: number;
  /** SO_MARK the proxy sets on its own upstream conns; excluded in OUTPUT (anti-loop). */
  bypassMark?: number;
}

/** A single command to run via `execFile(bin, args)` — never a shell string. */
export interface TproxyCommand {
  bin: string;
  args: string[];
}

function isPort(n: number): boolean {
  return Number.isInteger(n) && n >= 1 && n <= 65535;
}

/**
 * Validate a config before any command is built/run. Returns an error message
 * string, or null when the config is sane.
 */
export function validateTproxyConfig(cfg: TproxyConfig): string | null {
  if (!isPort(cfg.dport)) return `dport must be a valid TCP port (1-65535), got ${cfg.dport}`;
  if (!isPort(cfg.onPort)) return `onPort must be a valid TCP port (1-65535), got ${cfg.onPort}`;
  if (!Number.isInteger(cfg.mark) || cfg.mark < 1) return `mark must be a positive integer, got ${cfg.mark}`;
  if (!Number.isInteger(cfg.routeTable) || cfg.routeTable < 1) {
    return `routeTable must be a positive integer, got ${cfg.routeTable}`;
  }
  if (cfg.bypassMark !== undefined) {
    if (!Number.isInteger(cfg.bypassMark) || cfg.bypassMark < 1) {
      return `bypassMark must be a positive integer when set, got ${cfg.bypassMark}`;
    }
    if (cfg.bypassMark === cfg.mark) return "bypassMark must differ from mark (anti-loop)";
  }
  return null;
}

/** OUTPUT mangle rule spec (mark new local outbound conns), shared so -A/-D match. */
function outputRuleSpec(cfg: TproxyConfig): string[] {
  const spec = ["-t", "mangle", "OUTPUT", "-p", "tcp", "--dport", String(cfg.dport)];
  if (cfg.bypassMark !== undefined) {
    spec.push("-m", "mark", "!", "--mark", String(cfg.bypassMark));
  }
  spec.push("-j", "MARK", "--set-mark", String(cfg.mark));
  return spec;
}

/** PREROUTING mangle TPROXY rule spec (assign marked, rerouted packets to the listener). */
function preroutingRuleSpec(cfg: TproxyConfig): string[] {
  return [
    "-t", "mangle", "PREROUTING",
    "-p", "tcp", "--dport", String(cfg.dport),
    "-m", "mark", "--mark", String(cfg.mark),
    "-j", "TPROXY", "--on-port", String(cfg.onPort), "--tproxy-mark", String(cfg.mark),
  ];
}

/** Build an iptables command from a `[-t table, CHAIN, ...rest]` spec + the op flag. */
function iptables(op: "-A" | "-D", spec: string[]): TproxyCommand {
  const [t, table, chain, ...rest] = spec;
  return { bin: "iptables", args: [t, table, op, chain, ...rest] };
}

/** Commands to enable TPROXY interception of local outbound traffic, in apply order. */
export function buildTproxyApplyCommands(cfg: TproxyConfig): TproxyCommand[] {
  return [
    { bin: "ip", args: ["rule", "add", "fwmark", String(cfg.mark), "lookup", String(cfg.routeTable)] },
    { bin: "ip", args: ["route", "add", "local", "0.0.0.0/0", "dev", "lo", "table", String(cfg.routeTable)] },
    iptables("-A", outputRuleSpec(cfg)),
    iptables("-A", preroutingRuleSpec(cfg)),
  ];
}

/** Commands to undo TPROXY interception — exact inverse of apply, reverse order. */
export function buildTproxyRevertCommands(cfg: TproxyConfig): TproxyCommand[] {
  return [
    iptables("-D", preroutingRuleSpec(cfg)),
    iptables("-D", outputRuleSpec(cfg)),
    { bin: "ip", args: ["route", "del", "local", "0.0.0.0/0", "dev", "lo", "table", String(cfg.routeTable)] },
    { bin: "ip", args: ["rule", "del", "fwmark", String(cfg.mark), "lookup", String(cfg.routeTable)] },
  ];
}
