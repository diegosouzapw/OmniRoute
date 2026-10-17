/**
 * Auditable parameter policy for URI and Clash sources.
 *
 * Every key lands in exactly one bucket, checked in this order:
 * - wire-affecting keys reject the node whole (they would change the bytes
 *   on the wire without a projection here) with `wire-param:<key>`;
 * - value-gated keys are decorative only with their neutral value
 *   (`encryption=none`, `headerType=none`, `alterId: 0`, …) and wire-affecting
 *   with any other value;
 * - consumed keys have a projection in the canonical form (`sni`, `fp`,
 *   `ws-opts`, `reality-opts`, …);
 * - proven decorative keys render with their names reported in `dropped`;
 * - anything else rejects by default with `unknown-param:<key>`.
 * Clash option blocks (`ws-opts`, `grpc-opts`, `reality-opts`) are audited
 * key by key the same way. Never throws: query strings and Clash objects are
 * operator-supplied feed data.
 */

type Audit = { dropped: string[]; detail?: string };
type ValueGate = (value: unknown) => boolean;

function lowered(value: unknown): string {
  return String(value ?? "")
    .toLowerCase()
    .trim();
}

const isEmptyOrNone: ValueGate = (value) => {
  const text = lowered(value);
  return text === "" || text === "none";
};
const isNone: ValueGate = (value) => lowered(value) === "none";
const isZero: ValueGate = (value) => {
  const text = lowered(value);
  return text === "" || text === "0";
};
const isAutoCipher: ValueGate = (value) => {
  const text = lowered(value);
  return text === "" || text === "auto";
};

// ── URI query strings ────────────────────────────────────────────────────

/** Query keys the table consumes when present. */
export const CONSUMED_URI_KEYS: ReadonlySet<string> = new Set([
  "type",
  "security",
  "flow",
  "sni",
  "servername",
  "fp",
  "pbk",
  "sid",
  "insecure",
  "allowinsecure",
  "path",
  "host",
  "servicename",
  "service",
]);

/** Wire-affecting URI keys with no projection: reject the node whole. */
export const WIRE_URI_KEYS: ReadonlySet<string> = new Set([
  "obfs",
  "obfs-password",
  "alpn",
  "packetencoding",
  "xudp",
  "mux",
  "smux",
  "fragment",
  "ech",
  "utls",
  "client-fingerprint",
  "skip-cert-verify",
  "plugin",
  "pluginopts",
  "salamander",
  "seed",
  "congestion-control",
  "cc",
  "up",
  "down",
  "upmbps",
  "downmbps",
  "disablemtudiscovery",
  "heartbeatinterval",
  "keepalive",
  "maxstreams",
  "quic",
  "extra",
]);

/** URI keys that are decorative only with their neutral value. */
export const VALUE_GATED_URI_KEYS: ReadonlyMap<string, ValueGate> = new Map([
  ["encryption", isNone],
  ["headertype", isEmptyOrNone],
  ["header", isEmptyOrNone],
  // gRPC `mode`: `gun` is the default mode both cores use.
  ["mode", (value: unknown) => lowered(value) === "" || lowered(value) === "gun"],
]);

/** Proven decorative URI keys: render, report in `dropped`. */
export const DECORATIVE_URI_KEYS: ReadonlySet<string> = new Set([
  "remark",
  "remarks",
  "name",
  "tag",
  "testurl",
  "urltestinterval",
]);

export function normalizeQueryKey(raw: string): string {
  return raw.toLowerCase().trim().replace(/_/g, "-");
}

interface KeyPolicy {
  consumed: ReadonlySet<string>;
  wire: ReadonlySet<string>;
  gated: ReadonlyMap<string, ValueGate>;
  decorative: ReadonlySet<string>;
}

/**
 * Classify every key of one source. `entries` pairs the original key (kept
 * for messages) with its value; `normalize` folds case and separators. The
 * first offending key in sorted order wins so the detail is deterministic.
 */
function auditEntries(
  entries: Array<[string, unknown]>,
  normalize: (key: string) => string,
  policy: KeyPolicy
): Audit {
  const wire: string[] = [];
  const unknown: string[] = [];
  const dropped: string[] = [];
  for (const [key, value] of entries) {
    const norm = normalize(key);
    const gate = policy.gated.get(norm);
    if (gate) {
      if (gate(value)) dropped.push(key);
      else wire.push(key);
    } else if (policy.wire.has(norm)) wire.push(key);
    else if (policy.decorative.has(norm)) dropped.push(key);
    else if (!policy.consumed.has(norm)) unknown.push(key);
  }
  if (wire.length > 0) return { dropped: [], detail: `wire-param:${wire.sort()[0]}` };
  if (unknown.length > 0) return { dropped: [], detail: `unknown-param:${unknown.sort()[0]}` };
  return { dropped: dropped.sort() };
}

const URI_POLICY: KeyPolicy = {
  consumed: CONSUMED_URI_KEYS,
  wire: WIRE_URI_KEYS,
  gated: VALUE_GATED_URI_KEYS,
  decorative: DECORATIVE_URI_KEYS,
};

export function auditUriParams(params: URLSearchParams): Audit {
  const seen = new Map<string, unknown>();
  for (const [key, value] of params.entries()) if (!seen.has(key)) seen.set(key, value);
  return auditEntries([...seen.entries()], normalizeQueryKey, URI_POLICY);
}

// ── Decoded vmess blobs ──────────────────────────────────────────────────

/** Keys the projection reads from a decoded `vmess://base64(json)` blob. */
export const VMESS_CONSUMED_KEYS: ReadonlySet<string> = new Set([
  "add",
  "port",
  "id",
  "uuid",
  "net",
  "tls",
  "sni",
  "host",
  "path",
]);

/** Wire-affecting extras with no projection in a decoded vmess blob. */
export const VMESS_WIRE_KEYS: ReadonlySet<string> = new Set([
  "obfs",
  "obfs-password",
  "alpn",
  "packetencoding",
  "xudp",
  "mux",
  "fragment",
  "ech",
  "utls",
  "seed",
  "cc",
  "quic",
]);

/** Proven decorative keys in a decoded vmess blob (reported in `dropped`). */
export const VMESS_DECORATIVE_KEYS: ReadonlySet<string> = new Set(["v", "ps", "remark", "remarks"]);

/**
 * vmess `type` is the header/camouflage type of the stream: `none` (or empty)
 * is the plain stream, anything else (`http` on tcp, `srtp`/`wechat-video`
 * on kcp, …) changes the bytes on the wire. On gRPC it carries the mode,
 * where `gun` is the default both cores use.
 */
function vmessStreamTypeGate(net: unknown): ValueGate {
  return lowered(net) === "grpc"
    ? (value) => isEmptyOrNone(value) || lowered(value) === "gun"
    : isEmptyOrNone;
}

export function auditDecodedVmess(parsed: Record<string, unknown>): Audit {
  const gated = new Map<string, ValueGate>([
    ["scy", isAutoCipher],
    ["security", isAutoCipher],
    ["aid", isZero],
    ["alterid", isZero],
    ["encryption", isEmptyOrNone],
    ["type", vmessStreamTypeGate(parsed.net)],
  ]);
  return auditEntries(Object.entries(parsed), (key) => key.toLowerCase().trim(), {
    consumed: VMESS_CONSUMED_KEYS,
    wire: VMESS_WIRE_KEYS,
    gated,
    decorative: VMESS_DECORATIVE_KEYS,
  });
}

// ── Clash objects ────────────────────────────────────────────────────────

/** Clash object fields the table consumes when present. */
export const CONSUMED_OBJECT_KEYS: ReadonlySet<string> = new Set([
  "type",
  "server",
  "port",
  "server-port",
  "password",
  "uuid",
  "cipher",
  "method",
  "network",
  "transport",
  "security",
  "tls",
  "sni",
  "servername",
  "client-fingerprint",
  "skip-cert-verify",
  "insecure",
  "path",
  "ws-path",
  "host",
  "servicename",
  "service-name",
  "flow",
  "ws-opts",
  "grpc-opts",
  "reality-opts",
]);

/** Wire-affecting Clash fields with no projection: reject the node whole. */
export const WIRE_OBJECT_KEYS: ReadonlySet<string> = new Set([
  "obfs",
  "obfs-password",
  "alpn",
  "packet-encoding",
  "xudp",
  "mux",
  "smux",
  "fragment",
  "ech",
  "ech-opts",
  "utls",
  // Clash `fingerprint` pins the server certificate (not the uTLS profile).
  "fingerprint",
  "plugin",
  "plugin-opts",
  "salamander",
  "seed",
  "congestion-control",
  "cc",
  "up",
  "down",
  "ports",
  "hop-interval",
  "h2-opts",
  "http-opts",
  "ip-version",
  "dialer-proxy",
  "interface-name",
  "routing-mark",
  "tfo",
  "mptcp",
  "udp-over-tcp",
]);

/** Clash fields that are decorative only with their neutral value. */
export const VALUE_GATED_OBJECT_KEYS: ReadonlyMap<string, ValueGate> = new Map([
  ["encryption", isEmptyOrNone],
  ["headertype", isEmptyOrNone],
  ["header", isEmptyOrNone],
  ["alterid", isZero],
]);

/**
 * Proven decorative Clash fields: render, report in `dropped`. `udp` only
 * advertises UDP relay support, which both cores enable by default for the
 * supported protocols.
 */
export const DECORATIVE_OBJECT_KEYS: ReadonlySet<string> = new Set(["name", "udp"]);

/** Sub-keys each Clash option block may carry; anything else is wire-affecting. */
const OPTION_BLOCK_KEYS: Record<string, ReadonlySet<string>> = {
  "ws-opts": new Set(["path", "headers"]),
  "grpc-opts": new Set(["grpc-service-name"]),
  "reality-opts": new Set(["public-key", "short-id"]),
};

export function normalizeObjectKey(raw: string): string {
  return raw.toLowerCase().trim().replace(/_/g, "-");
}

const OBJECT_POLICY: KeyPolicy = {
  consumed: CONSUMED_OBJECT_KEYS,
  wire: WIRE_OBJECT_KEYS,
  gated: VALUE_GATED_OBJECT_KEYS,
  decorative: DECORATIVE_OBJECT_KEYS,
};

function offendingHeaders(block: string, headers: unknown): string[] {
  if (!headers || typeof headers !== "object") return [`${block}.headers`];
  return Object.keys(headers)
    .filter((header) => header.toLowerCase() !== "host")
    .map((header) => `${block}.headers.${header}`);
}

/** Offending sub-keys of one option block (`ws-opts.max-early-data`, …). */
function offendingSubKeys(block: string, raw: unknown, allowed: ReadonlySet<string>): string[] {
  if (typeof raw !== "object" || Array.isArray(raw)) return [block];
  const offending: string[] = [];
  for (const [sub, subValue] of Object.entries(raw as Record<string, unknown>)) {
    if (!allowed.has(sub)) offending.push(`${block}.${sub}`);
    else if (sub === "headers") offending.push(...offendingHeaders(block, subValue));
  }
  return offending;
}

function auditOptionBlocks(value: Record<string, unknown>): string | null {
  const offending: string[] = [];
  for (const [key, raw] of Object.entries(value)) {
    const allowed = OPTION_BLOCK_KEYS[normalizeObjectKey(key)];
    if (!allowed || raw === undefined || raw === null) continue;
    offending.push(...offendingSubKeys(key, raw, allowed));
  }
  return offending.length > 0 ? `wire-param:${offending.sort()[0]}` : null;
}

export function auditObjectParams(value: Record<string, unknown>): Audit {
  const audit = auditEntries(Object.entries(value), normalizeObjectKey, OBJECT_POLICY);
  if (audit.detail) return audit;
  const nested = auditOptionBlocks(value);
  return nested ? { dropped: [], detail: nested } : audit;
}

/** Clash vmess `cipher`: only `auto` has a projection (the cores' default). */
export function clashCipherDetail(value: unknown): string | null {
  return isAutoCipher(value) ? null : "wire-param:cipher";
}
