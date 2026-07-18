---
title: "Free Proxies API"
version: 3.8.43
lastUpdated: 2026-07-11
---

# Free Proxies API

OmniRoute ships a curated pool of free proxies in the `free_proxies` table,
synced from external providers (1proxy, proxifly, iplocate, webshare). The
dashboard surfaces these under **Settings → Free Proxies**. This document
covers the server-side filtering, sorting, counting, and sync-error reporting
that the list route exposes.

## List route — `GET /api/settings/free-proxies`

Returns a filtered, sorted, paginated slice plus a total count. Filtering and
counting happen in SQL, so the UI can show the real total (e.g. `Total: 0`)
without loading every row into memory.

### Query parameters

| Param             | Type                               | Default   | Meaning                                                                                        |
| ----------------- | ---------------------------------- | --------- | ---------------------------------------------------------------------------------------------- |
| `search`          | string                             | `""`      | Case-sensitive `LIKE` on the host (and source) column.                                         |
| `protocol`        | string                             | `""`      | `type` filter: `http` / `https` / `socks4` / `socks5`. Empty = all.                            |
| `country`         | string                             | `""`      | `countryCode` filter (ISO-2). Empty = all.                                                     |
| `minQuality`      | number                             | `0`       | Only rows with `qualityScore >= minQuality`. `0` = no floor.                                   |
| `disabledSources` | string                             | `""`      | Comma-separated source ids to exclude (e.g. `proxifly,webshare`).                              |
| `sortBy`          | `quality` \| `latency` \| `recent` | `quality` | `quality` = score desc; `latency` = latency asc (nulls last); `recent` = `lastValidated` desc. |
| `offset`          | number                             | `0`       | Pagination start.                                                                              |
| `limit`           | number                             | `50`      | Page size (capped server-side).                                                                |

### Response

```json
{
  "success": true,
  "data": {
    "proxies": [/* FreeProxyRecord[] */],
    "total": 137,
    "hasMore": true
  },
  "stats": {
    "total": 137,
    "inPool": 12,
    "avgQuality": 64.2,
    "bySource": [{ "source": "1proxy", "count": 90 }],
    "lastSyncAt": "2026-07-11T09:30:00.000Z"
  },
  "syncErrors": {
    "proxifly": ["HTTP 429 from upstream"],
    "webshare": ["network timeout"]
  }
}
```

`total` reflects the filtered total **before** pagination, so the UI can render
`Total: N` and `hasMore` independently. `syncErrors` is keyed by source id and
populated only for sources that failed their last sync — a `Total: 0` result is
never silent.

## Add-to-pool — `POST /api/settings/free-proxies/[id]/add-to-pool`

Promotes a free proxy into the managed `proxy_registry` pool. Validates the
upstream first; on success returns the new pool proxy id and measured latency.

## Sync — `POST /api/settings/free-proxies/sync`

Re-pulls all enabled sources (or the subset in `{ "sources": [...] }`). Each
source syncs independently; a failing source is recorded in `syncErrors` and the
others still complete, so partial syncs never wipe prior good data.

## Stats — `GET /api/settings/free-proxies/stats`

Returns the `total / inPool / avgQuality / bySource / lastSyncAt` aggregate
without the row payload — used by the dashboard header widgets.
