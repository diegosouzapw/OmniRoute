import { decrypt } from "../encryption";
import type {
  JsonRecord,
  ProxyScope,
  ProxyRegistryRecord,
  ProxyAssignmentRecord,
  ProxyPayload,
} from "./types";

export function toRecord(value: unknown): JsonRecord {
  return value && typeof value === "object" ? (value as JsonRecord) : {};
}

export function mapProxyRow(row: unknown): ProxyRegistryRecord {
  const r = toRecord(row);
  return {
    id: typeof r.id === "string" ? r.id : "",
    name: typeof r.name === "string" ? r.name : "",
    type: typeof r.type === "string" ? r.type : "http",
    host: typeof r.host === "string" ? r.host : "",
    port: Number(r.port) || 0,
    username: typeof r.username === "string" ? r.username : "",
    password: typeof r.password === "string" ? r.password : "",
    region: typeof r.region === "string" ? r.region : null,
    notes: typeof r.notes === "string" ? r.notes : null,
    status: typeof r.status === "string" ? r.status : "active",
    source: typeof r.source === "string" ? r.source : "manual",
    family: typeof r.family === "string" ? r.family : "auto",
    createdAt: typeof r.created_at === "string" ? r.created_at : "",
    updatedAt: typeof r.updated_at === "string" ? r.updated_at : "",
  };
}

export function mapAssignmentRow(row: unknown): ProxyAssignmentRecord {
  const r = toRecord(row);
  const scope = (typeof r.scope === "string" ? r.scope : "global") as ProxyScope;
  const rawScopeId = typeof r.scope_id === "string" ? r.scope_id : null;
  return {
    id: Number(r.id) || 0,
    proxyId: typeof r.proxy_id === "string" ? r.proxy_id : "",
    scope,
    scopeId: scope === "global" && rawScopeId === "__global__" ? null : rawScopeId,
    createdAt: typeof r.created_at === "string" ? r.created_at : "",
    updatedAt: typeof r.updated_at === "string" ? r.updated_at : "",
  };
}

// Edge-relay proxy types. Mirrors RELAY_TYPES in open-sse/utils/proxyDispatcher.
// Duplicated here (not imported) to keep src/lib/db/ free of open-sse runtime
// imports; if a third relay backend lands, update BOTH sets.
const RELAY_PROXY_TYPES = new Set(["vercel", "deno", "cloudflare"]);

export function isRelayProxyType(type: unknown): boolean {
  return typeof type === "string" && RELAY_PROXY_TYPES.has(type);
}

export function extractRelayAuth(notes: unknown): string | undefined {
  if (typeof notes !== "string") return undefined;
  try {
    const parsed = JSON.parse(notes) as {
      relayAuth?: string;
      relayAuthEnc?: string;
    };
    // Prefer the encrypted form when both are present (legacy plaintext rows
    // are still readable until migrated). decrypt() is a no-op when encryption
    // is disabled, matching the existing convention for webhook secrets.
    if (parsed.relayAuthEnc) {
      const dec = decrypt(parsed.relayAuthEnc);
      if (dec) return dec;
    }
    return parsed.relayAuth || undefined;
  } catch {
    return undefined;
  }
}

export function toRegistryProxyResolution(row: unknown, level: ProxyScope, levelId: string | null) {
  const record = toRecord(row);
  const relayAuth = isRelayProxyType(record.type) ? extractRelayAuth(record.notes) : undefined;
  return {
    proxy: {
      type: record.type,
      host: record.host,
      port: record.port,
      username: record.username,
      password: record.password,
      family: typeof record.family === "string" ? record.family : "auto",
      ...(relayAuth !== undefined ? { relayAuth } : {}),
    },
    level,
    levelId,
    source: "registry",
  };
}

export function normalizeScope(scope: string): ProxyScope {
  const value = String(scope || "").toLowerCase();
  if (value === "key") return "account";
  if (value === "provider") return "provider";
  if (value === "account") return "account";
  if (value === "combo") return "combo";
  return "global";
}

export function normalizeAssignmentScopeId(scope: ProxyScope, scopeId?: string | null) {
  return scope === "global" ? "__global__" : scopeId || null;
}

export function toLegacyProxyLevel(scope: ProxyScope) {
  return scope === "account" ? "key" : scope;
}

export function coerceProxyPayload(value: unknown, fallbackName: string): ProxyPayload | null {
  if (!value) return null;

  if (typeof value === "string") {
    try {
      const parsed = new URL(value);
      return {
        name: fallbackName,
        type: parsed.protocol.replace(":", "") || "http",
        host: parsed.hostname,
        port: Number(parsed.port || (parsed.protocol === "https:" ? "443" : "8080")),
        username: parsed.username ? decodeURIComponent(parsed.username) : "",
        password: parsed.password ? decodeURIComponent(parsed.password) : "",
        status: "active",
      };
    } catch {
      return null;
    }
  }

  if (typeof value !== "object" || Array.isArray(value)) return null;
  const record = toRecord(value);
  const host = typeof record.host === "string" ? record.host.trim() : "";
  if (!host) return null;
  const port = Number(record.port) || 8080;

  return {
    name: fallbackName,
    type: typeof record.type === "string" ? record.type : "http",
    host,
    port,
    username: typeof record.username === "string" ? record.username : "",
    password: typeof record.password === "string" ? record.password : "",
    status: "active",
  };
}

export function redactProxySecrets(proxy: ProxyRegistryRecord): ProxyRegistryRecord {
  let redactedNotes = proxy.notes;
  if (isRelayProxyType(proxy.type) && proxy.notes) {
    try {
      const parsed = JSON.parse(proxy.notes);
      if (parsed && typeof parsed === "object") {
        const next: Record<string, unknown> = { ...parsed };
        let touched = false;
        if ("relayAuth" in next) {
          next.relayAuth = "***";
          touched = true;
        }
        if ("relayAuthEnc" in next) {
          next.relayAuthEnc = "***";
          touched = true;
        }
        if (touched) {
          redactedNotes = JSON.stringify(next);
        }
      }
    } catch {
      // Non-JSON notes pass through unchanged
    }
  }
  return {
    ...proxy,
    username: proxy.username ? "***" : "",
    password: proxy.password ? "***" : "",
    notes: redactedNotes,
  };
}
