---
title: "Proxy Payload Traffic"
description: "What OmniRoute's persistent proxy traffic counters measure and where coverage is incomplete."
---

# Proxy Payload Traffic

Settings → Proxy → Proxy pool includes **OmniRoute payload traffic**. Refresh the panel to read
persistent totals. `GET /api/settings/proxies/traffic` uses the existing management authentication
policy and returns uncached metrics; it does not reset or modify counters.

## What is measured

- **Submitted upload** is the size of the body supplied to each raw fetch/TLS invocation, in bytes.
  Strings use UTF-8; ArrayBuffer and views use their actual byte length, Blob its size, and
  URLSearchParams its encoded body size. This is not proof that an upstream socket sent the body.
- **Consumed download** is the response body bytes pulled by OmniRoute's downstream reader. No
  response is cloned or eagerly drained for metering. Cancelled or errored streams retain only the
  consumed prefix. Error HTTP responses count when their bodies are consumed.
- **Attempts** include each explicit transport send and retry in the proxy-aware fetch layer.
  Send failures have unknown upload delivery. **Known uploads / attempts** and **Complete downloads
  / attempts** expose coverage; incomplete or unknown data is not silently represented as a complete
  zero. Cancellation and download-error counts are shown separately.

These are **application payload bytes**, not network/wire traffic, bandwidth billing, provider token
usage or vendor charges. Headers, TCP/TLS handshakes, framing and retransmissions are excluded.
Fetch may decompress the response; consumed payload can therefore differ from Content-Length and
from compressed network bytes.

## Attribution and totals

Registry proxies use their stable ID, including after credential changes. Separate registry IDs do
not merge merely because they share host/port. Legacy/environment proxies use a private salted
credential-tuple digest: separate accounts/passwords stay separate and raw proxy credentials never
enter traffic metrics. A removed registry entry retains its lifetime counters under a removed label.

**Proxy subtotal** includes registry and legacy proxies only. **Overall** includes every observed
route, including separately labeled **Direct (not proxied)** and **Unattributed dispatcher** traffic.
An explicitly supplied dispatcher whose proxy identity is unavailable stays unattributed rather than
being guessed from an ambient context. NO_PROXY, local bypass and explicit-direct routing count as
direct; automatic fallback proxy sends use the actual fallback identity.

## Coverage and persistence limits

- Streaming uploads, FormData boundaries and Request bodies cannot be measured here without changing
  consumption behavior; they increment attempts but not known-upload bytes. No Content-Length guess
  is used. The known-upload denominator exposes missing coverage.
- Downloads not read to EOF remain incomplete, including an unread response. A caller abort or cancel
  records incomplete cancellation; stream read errors preserve their original error and prefix count.
- Redirects and retries hidden inside a fetch implementation are not distinct invocations at this
  seam. Transports that bypass this fetch layer (for example independent WebSocket/browser transports)
  are not measured. The panel is not complete machine-wide traffic accounting.
- Totals are additive in `proxy_payload_traffic`, created by migration 206, and survive process
  restart. Previously applied traffic migration 207 is reconciled to 206 without changing counters;
  an unrelated migration already recorded at 206 stops reconciliation rather than overwriting history.
  Totals start when this version begins observing traffic; historical traffic is not inferred.
  Each observed response chunk persists immediately. A database failure emits a credential-free
  warning and marks runtime persistence coverage incomplete; requests continue unaffected.

The API returns only route IDs/digests, current registry display names and numeric counters. It stores
no upstream payloads, target URLs or proxy credentials. Existing diagnostic logging remains unchanged.

## Verification

Synthetic tests cover Unicode/binary body sizes, unsupported upload coverage, lazy pulling, partial
cancellation, read/send failures, explicit retries, route identity, additive SQLite updates, restart
and management-auth ordering. They make no real proxy/provider requests. Integrated CI and rendered
panel verification are still required before release; fake transports do not certify vendor billing
or actual network transmission.
