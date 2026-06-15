---
title: "Egress IP Family Policy (IPv4/IPv6)"
version: 3.8.24
lastUpdated: 2026-06-13
---

# Egress IP Family Policy (IPv4/IPv6)

> **Pin outbound traffic to a single IP family — `auto`, `ipv4`, or `ipv6` — per proxy, so an IPv6-only egress never silently leaks back to IPv4.**

> **Source of truth:** `open-sse/utils/proxyFamily.ts`, `open-sse/utils/proxyDispatcher.ts`, `open-sse/utils/proxyFetch.ts`, `open-sse/utils/socksConnectorWithFamily.ts`, `open-sse/utils/proxyFamilyResolve.ts`, `src/shared/validation/schemas.ts`, `src/lib/db/proxies.ts`, `src/lib/db/upstreamProxy.ts`, `src/lib/db/migrations/099_proxy_family.sql`

OmniRoute lets each proxy carry an **address-family egress directive**. By default the OS picks IPv4 or IPv6 (dual-stack, "Happy Eyeballs"). When you set the directive to `ipv4` or `ipv6`, OmniRoute pins every connection through that proxy to the chosen family and **fails closed** rather than falling back to the other family.

This page documents what the directive is, why it exists, where you configure it, and how the runtime resolves it.

---

## Table of Contents

- [What It Is](#what-it-is)
- [Why It Exists](#why-it-exists)
- [The Three Values](#the-three-values)
- [How to Configure It](#how-to-configure-it)
- [How `auto` Resolves](#how-auto-resolves)
- [How `ipv4` / `ipv6` Are Enforced](#how-ipv4--ipv6-are-enforced)
- [SOCKS5 Compatibility](#socks5-compatibility)
- [Fail-Closed Behavior](#fail-closed-behavior)
- [Data Model](#data-model)
- [Related Documentation](#related-documentation)

---

## What It Is

Every proxy in the registry has a `family` field with three possible values, validated by a Zod enum:

```ts
// src/shared/validation/schemas.ts
family: z.enum(["auto", "ipv4", "ipv6"]).optional().default("auto"),
```

The field defaults to `"auto"`, which preserves the prior dual-stack behavior. Setting it to `ipv4` or `ipv6` pins the connect family for that proxy.

The directive is normalized everywhere through a single helper so any unknown value collapses to `auto`:

```ts
// open-sse/utils/proxyFamily.ts
export type ProxyFamily = "auto" | "ipv4" | "ipv6";

export function parseProxyFamily(value: unknown): ProxyFamily {
  return value === "ipv4" || value === "ipv6" ? value : "auto";
}
```

---

## Why It Exists

Introduced in PR [#3777](https://github.com/diegosouzapw/OmniRoute/pull/3777). The motivating problems:

| Problem                                         | What the directive fixes                                                                                                                                                                                                                                                                                                            |
| ----------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **IPv6-only egress leaking to IPv4**            | When a proxy host has both A and AAAA records (or the OS prefers IPv4), Happy Eyeballs can dial out over IPv4 even when you intend an IPv6-only path. Pinning `ipv6` removes that leak.                                                                                                                                             |
| **Shared-egress anomaly revocation**            | Rotating providers (codex/openai) revoke tokens when many accounts egress through the **same** IP at high volume. Controlling the egress family is part of keeping accounts on distinct, predictable egress paths (see [`src/lib/proxyEgress.ts`](../../src/lib/proxyEgress.ts) for the egress-IP diagnostics that pair with this). |
| **Deterministic egress for compliance/testing** | When you must guarantee traffic leaves over a specific family, `auto` is not enough.                                                                                                                                                                                                                                                |

The directive is intentionally **per-proxy**, not global — different proxies in your pool can have different policies.

---

## The Three Values

| Value  | UI label            | Behavior                                                                                                                                                    |
| ------ | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto` | `Auto (dual-stack)` | OS picks the family. For an IP-literal proxy host, the family is intrinsic to the literal; for a hostname, both families are eligible. This is the default. |
| `ipv4` | `IPv4 only`         | Pins the connection to IPv4. Fails closed if the proxy host has no IPv4 (A) record.                                                                         |
| `ipv6` | `IPv6 only`         | Pins the connection to IPv6. Fails closed if the proxy host has no IPv6 (AAAA) record.                                                                      |

UI strings live in `src/i18n/messages/en.json` (`labelFamily`, `familyAuto`, `familyIpv4`, `familyIpv6`, `familyHint`).

---

## How to Configure It

### Dashboard

The selector is in the proxy form of the **Proxy Pool** tab:

1. Open **Dashboard → Settings → Proxy → Proxy Pool**
2. Add or edit a proxy
3. Set the **IP family** dropdown to `Auto (dual-stack)`, `IPv4 only`, or `IPv6 only`
4. Save

The control is rendered by `ProxyRegistryManager.tsx` (mounted in `proxy/ProxyPoolTab.tsx`).

### API

The `family` field is part of the proxy registry create/update payloads, validated by `createProxyRegistrySchema` / `updateProxyRegistrySchema` (`src/shared/validation/schemas.ts`) and handled by `POST` / `PATCH /api/v1/management/proxies`:

```bash
# Create an IPv6-only proxy
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "IPv6 egress",
    "type": "socks5",
    "host": "proxy.example.com",
    "port": 1080,
    "family": "ipv6"
  }'

# Change an existing proxy to IPv4-only
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{ "id": "proxy-uuid-here", "family": "ipv4" }'
```

The same field is also accepted by the inline proxy config object used for upstream-proxy entries (`upstream_proxy_config.family`, see [Data Model](#data-model)).

For the rest of the proxy CRUD/assignment API, see [PROXY_GUIDE.md](../ops/PROXY_GUIDE.md).

---

## How `auto` Resolves

When `family` is `auto`, OmniRoute does **not** append any directive — the proxy URL is used as-is and the connect family is determined intrinsically.

At URL-build time (`proxyConfigToUrl` / `normalizeProxyUrl` in `open-sse/utils/proxyDispatcher.ts`), an `auto` proxy yields a plain URL with no marker:

```ts
// open-sse/utils/proxyDispatcher.ts
const fam = parseProxyFamily(config.family);
const normalized = normalizeProxyUrl(proxyUrlStr, "context proxy", { allowSocks5 });
return fam === "auto" ? normalized : `${normalized}?family=${fam}`;
```

At dispatch time (`resolveDispatcherFamily`), `auto` resolves to the intrinsic family of an IP-literal host, or `null` (let the OS decide) for a hostname:

```ts
// open-sse/utils/proxyDispatcher.ts
function resolveDispatcherFamily(parsed: URL): 4 | 6 | null {
  const directive = parseProxyFamily(parsed.searchParams.get("family") ?? undefined);
  const literal = detectIpLiteralFamily(parsed.hostname);
  if (directive === "auto") return literal; // null for a hostname → OS picks
  // ...
}
```

So:

- `auto` + IP-literal host (`192.0.2.1` / `[2001:db8::1]`) → family of that literal.
- `auto` + hostname → `null` → standard dual-stack OS resolution.

---

## How `ipv4` / `ipv6` Are Enforced

A non-`auto` directive travels as a single synthetic query marker — `?family=ipv4` or `?family=ipv6` — appended once to the normalized proxy URL. `normalizeProxyUrl` is careful to strip and re-append this marker exactly once so it never corrupts port parsing.

When the dispatcher is built, the marker is read and converted to a concrete connect family. If the host is an IP literal of the **opposite** family, OmniRoute throws (contradiction is fail-closed):

```ts
// open-sse/utils/proxyDispatcher.ts
const want = directive === "ipv6" ? 6 : 4;
if (literal !== null && literal !== want) {
  throw new Error(
    `[ProxyDispatcher] Proxy family directive ${directive} contradicts ${literal === 6 ? "IPv6" : "IPv4"} literal host`
  );
}
```

The concrete family is then pinned on the connector:

- **HTTP/HTTPS proxies** (`ProxyAgent`): `proxyTls: { family, autoSelectFamily: false }` — disables Happy Eyeballs so the chosen family is the only one dialed.
- **SOCKS5 proxies**: a custom connector threads `socket_options: { family, autoSelectFamily: false }` into the SOCKS client (see [SOCKS5 Compatibility](#socks5-compatibility)).

---

## SOCKS5 Compatibility

The family pin works with SOCKS5 proxies, but stock `fetch-socks` does not expose the socket options needed to pin the family of the proxy hop. OmniRoute ships its own connector for that:

```ts
// open-sse/utils/socksConnectorWithFamily.ts
export function buildSocksFamilySocketOptions(family: 4 | 6 | null): Record<string, unknown> {
  if (family === 6) return { family: 6, autoSelectFamily: false };
  if (family === 4) return { family: 4, autoSelectFamily: false };
  return {};
}
```

`createProxyDispatcher` chooses the connector based on whether a family is pinned:

- `family === null` (i.e. `auto` over a hostname) → stock `socksDispatcher` from `fetch-socks`.
- `family === 4 | 6` → `createSocksDispatcherWithFamily`, which threads `socket_options` into `SocksClient.createConnection` so Happy Eyeballs cannot pick IPv4 for an IPv6-only egress policy.

SOCKS5 support itself is on by default (opt-out via `ENABLE_SOCKS5_PROXY=false`); see [PROXY_GUIDE.md → Environment Variables](../ops/PROXY_GUIDE.md#environment-variables).

---

## Fail-Closed Behavior

The whole point of the directive is to **refuse** rather than silently fall back to the wrong family. Two guards enforce this:

1. **Literal contradiction** — a directive that contradicts an IP-literal host throws at dispatcher build time (`resolveDispatcherFamily`, shown above).

2. **Hostname pre-flight DNS check** — for a hostname proxy with a pinned family, `proxyFetch.ts` verifies the hostname actually has a record in the required family **before** egressing, via `assertHostnameSupportsFamily`:

   ```ts
   // open-sse/utils/proxyFamilyResolve.ts
   const hasFamily = records.some((r) => r.family === family);
   if (!hasFamily) {
     throw new Error(
       `[ProxyFamily] Proxy host ${host} has no ${family === 6 ? "IPv6 (AAAA)" : "IPv4 (A)"} record; ` +
         `refusing ${family === 6 ? "IPv6" : "IPv4"}-only egress (fail-closed)`
     );
   }
   ```

   On failure, `proxyFetch.ts` tags the error with `code = "PROXY_FAMILY_UNAVAILABLE"` and `statusCode = 503`. A DNS resolution failure is likewise treated as fail-closed (refuse to egress).

IP-literal hosts are a no-op for the DNS pre-flight — their family is intrinsic and needs no lookup.

---

## Data Model

The `family` column was added by migration `099_proxy_family.sql` to **two** tables:

```sql
-- src/lib/db/migrations/099_proxy_family.sql
ALTER TABLE proxy_registry ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
ALTER TABLE upstream_proxy_config ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
```

- `proxy_registry.family` — the per-proxy directive for registry entries (`src/lib/db/proxies.ts`). Resolution queries select `family` alongside the other proxy columns, and a missing/non-string value is coerced to `"auto"`.
- `upstream_proxy_config.family` — the directive for upstream-proxy entries (`src/lib/db/upstreamProxy.ts`), with the same `"auto"` default.

When a resolved proxy object carries a non-`auto` `family`, `proxyConfigToUrl` appends the `?family=` marker so the pin survives all the way to the dispatcher.

---

## Related Documentation

> 📖 **Related documentation:**
>
> - [Proxy Guide](../ops/PROXY_GUIDE.md) — full proxy system: registry CRUD, 4-level resolution, rotation, health checking, API reference
> - [Stealth Guide](./STEALTH_GUIDE.md) — TLS fingerprint and CLI fingerprint layers that ride on top of the proxy
> - [Route Guard Tiers](./ROUTE_GUARD_TIERS.md) — loopback enforcement for local-only routes
