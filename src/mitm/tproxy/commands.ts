/**
 * Fase 3 / Epic A — TPROXY transparent capture mode (Linux): command builder.
 *
 * This is the spike artifact for Gap 2: a 5th capture mode that intercepts TCP
 * transparently via Linux TPROXY + policy routing, WITHOUT spoofing `/etc/hosts`
 * or mutating OS-wide system-proxy settings (so it is headless-friendly and
 * auto-flushed on reboot). The kernel listener (IP_TRANSPARENT socket) and the
 * live execution wiring are gated on a real-Linux/VPS validation (Hard Rule
 * #18) and are intentionally NOT in this module.
 *
 * What lives here is pure + unit-testable: the exact `iptables` / `ip` commands
 * for apply and revert, with the invariant that **revert is the precise inverse
 * of apply, in reverse order** — a crash must never leave a mangle rule behind
 * (the very invariant Fase 1 / `repairMitm()` establishes). When the Epic is
 * built, `setup.ts` will run these via `execFile` (arrays, never a shell string
 * — Hard Rule #13) and `repairMitm()` will additionally flush them.
 *
 * Reference design (deep-research, confidence high):
 *   iptables -t mangle -A PREROUTING -p tcp --dport 443 \
 *     -j TPROXY --tproxy-mark 1 --on-port 8443
 *   ip rule add fwmark 1 lookup 100
 *   ip route add local default dev lo table 100
 */

export interface TproxyConfig {
  /** Destination TCP port to transparently intercept (e.g. 443). */
  dport: number;
  /** Firewall mark applied by TPROXY and matched by the ip rule (e.g. 1). */
  mark: number;
  /** Local port the IP_TRANSPARENT listener binds (e.g. 8443). */
  onPort: number;
  /** Policy-routing table id holding the `local default` route (e.g. 100). */
  routeTable: number;
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
 * string, or null when the config is sane. (Cheap guard so the future execFile
 * path never shells out malformed numbers.)
 */
export function validateTproxyConfig(cfg: TproxyConfig): string | null {
  if (!isPort(cfg.dport)) return `dport must be a valid TCP port (1-65535), got ${cfg.dport}`;
  if (!isPort(cfg.onPort)) return `onPort must be a valid TCP port (1-65535), got ${cfg.onPort}`;
  if (!Number.isInteger(cfg.mark) || cfg.mark < 1) return `mark must be a positive integer, got ${cfg.mark}`;
  if (!Number.isInteger(cfg.routeTable) || cfg.routeTable < 1) {
    return `routeTable must be a positive integer, got ${cfg.routeTable}`;
  }
  return null;
}

/** The mangle PREROUTING rule spec, shared so -A and -D match exactly. */
function tproxyRuleSpec(cfg: TproxyConfig): string[] {
  return [
    "-t", "mangle",
    "PREROUTING",
    "-p", "tcp",
    "--dport", String(cfg.dport),
    "-j", "TPROXY",
    "--tproxy-mark", String(cfg.mark),
    "--on-port", String(cfg.onPort),
  ];
}

function iptables(op: "-A" | "-D", cfg: TproxyConfig): TproxyCommand {
  const [table, tableName, chain, ...rest] = tproxyRuleSpec(cfg);
  // Reassemble as: -t mangle <op> PREROUTING ...rest
  return { bin: "iptables", args: [table, tableName, op, chain, ...rest] };
}

/** Commands to enable TPROXY interception, in apply order. */
export function buildTproxyApplyCommands(cfg: TproxyConfig): TproxyCommand[] {
  return [
    iptables("-A", cfg),
    { bin: "ip", args: ["rule", "add", "fwmark", String(cfg.mark), "lookup", String(cfg.routeTable)] },
    { bin: "ip", args: ["route", "add", "local", "default", "dev", "lo", "table", String(cfg.routeTable)] },
  ];
}

/** Commands to undo TPROXY interception — exact inverse of apply, reverse order. */
export function buildTproxyRevertCommands(cfg: TproxyConfig): TproxyCommand[] {
  return [
    { bin: "ip", args: ["route", "del", "local", "default", "dev", "lo", "table", String(cfg.routeTable)] },
    { bin: "ip", args: ["rule", "del", "fwmark", String(cfg.mark), "lookup", String(cfg.routeTable)] },
    iptables("-D", cfg),
  ];
}
