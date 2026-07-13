# Performance Audit: OmniRoute v3.8.48 (commit `57b1b66fb`)

> Generated 2026-07-13 from 5 parallel audit agents analyzing `src/`, `open-sse/`, and `src/app/api/`.

---

## How to Read

| Label | Effort | Impact | Worth |
|---|---|---|---|
| 🔴 P0 | < 2h | 5-50x improvement | Do immediately |
| 🟠 P1 | 2-8h | 2-10x improvement | Sprint candidate |
| 🟡 P2 | 1-3d | 10-30% improvement | Backlog |
| 🔵 P3 | < 2h | < 5% | Nice-to-have |

---

## 🔴 P0 — Critical (fix ASAP)

### P0.1 recharts eager loading → 9.4MB bundle bloat

| File | Lines | Issue |
|---|---|---|
| `src/app/(dashboard)/dashboard/costs/CostOverviewTab.tsx` | 12 | `import { PieChart, LineChart, BarChart, ... } from "recharts"` di module level |
| `src/app/(dashboard)/dashboard/analytics/ProviderUtilizationTab.tsx` | 6 | Sama — recharts + full d3 tree (9.4MB) |
| `src/app/(dashboard)/dashboard/costs/quota-share/components/BurnRateChart.tsx` | 9 | 6 `dynamic()` terpisah → 6 lazy chunk overhead |

**Fix:**
- CostOverviewTab, ProviderUtilizationTab → `dynamic(() => import('./CostCharts'), {ssr: false})`
- BurnRateChart → gabung 6 `dynamic()` jadi 1 wrapper
- StatsTab.tsx sudah buktikan pattern ini works — copy saja

**Impact:** ~9MB bundle size turun per page load. User lihat cost/analytics page 2-5x lebih cepat.

---

### P0.2 DB full-table SELECT tanpa LIMIT

**9 DB list functions tidak punya native pagination:**

| Function | File | Query |
|---|---|---|
| `getCombos()` | `src/lib/db/combos.ts:94` | `SELECT * FROM combos` |
| `getComboNameSet()` | `src/lib/db/combos.ts:36` | `SELECT name FROM combos` (for `Set()`) |
| `getApiKeys()` | `src/lib/db/apiKeys.ts` | `SELECT * FROM api_keys ORDER BY created_at` |
| `getProviderConnections()` | `src/lib/db/providers.ts:44` | `SELECT * FROM provider_connections ORDER BY priority` |
| `getProviderNodes()` | `src/lib/db/providerNodes.ts` | No limit |
| `getWebhooks()` | `src/lib/db/webhooks.ts` | No limit |
| `listPlaygroundPresets()` | — | No limit |
| `listProxies()` | — | No limit |
| `listPools()` | `src/lib/db/quotaPools.ts:237` | No limit + N+1 |

**Plus:** 10+ API route handlers di `src/app/api/` terima `offset`/`limit` params tapi cuma **client-side slice** — data FULL tetap dikirim via response.

**Fix:**
1. Setiap DB function: tambah `LIMIT ? OFFSET ?` parameter
2. API yang perlu total: `SELECT count(*)` paralel atau di query sama
3. Routes verified already paginated (jangan touch): `cache/entries`, `settings/free-proxies`
4. Routes partial-paginated (tambah offset/total): `files`, `batches`, `webhooks/[id]/deliveries`

**Impact:** Mencegah transfer ribuan baris yang tidak perlu per request. Vital untuk scaling.

---

### P0.3 N+1 di quotaPools

**`getPoolsByGroup()` (quotaPools.ts:225):**
```
SELECT * FROM quota_pools WHERE group_id = ?    → 1 query
  → SELECT * FROM quota_allocations WHERE pool_id = ?  → N queries
  → SELECT * FROM quota_pool_connections WHERE pool_id = ? → N queries
Total: 1 + 2N queries
```

**`listPools()` (quotaPools.ts:237):** Sama — untuk semua pool.

**Fix:** JOIN `quota_pools LEFT JOIN quota_allocations LEFT JOIN quota_pool_connections` dalam 1 query. Group rows di app code.

**Impact:** 50+ queries per page load → 1 query.

---

## 🟠 P1 — High

### P1.1 Inline closure allocation di hot-path SSE (stream.ts)

| Line | Masalah | Fix |
|---|---|---|
| 1259 | `hasActiveDeltaValue` — closure baru + `Object.values().some()` per-chunk | Hoist ke factory scope |
| 1157 | `buffer.split('\n')` — alokasi string array baru per Uint8Array chunk | Track last newline index |
| 182 | `appendBoundedText` — `current + next` full concat per-token | Slide window setelah limit |
| 1952,1954,1156 | `Date.now()` dipanggil 3× per transform() | `const now = Date.now()` sekali |
| 433 (streamHelpers.ts) | `cleanPerfMetrics` — spread copy `{...data}` per-chunk | Mutate in-place bila perf_metrics null |

**Impact:** ~5-15% CPU reduction di streaming pipeline. Setiap micro-optimization here matters karena dipanggil per-token.

---

### P1.2 Missing React.memo di dashboard components

| File | Lines | Masalah |
|---|---|---|
| `combos/page.tsx` | 4652 | 25 fn components, **zero React.memo**, 31 `.map()`, 13 inline components |
| `usage/components/EvalsTab.tsx` | 2147 | No memo, large table render |
| `usage/components/LogsTab.tsx` | 1587 | No memo |
| `ApiManagerPageClient.tsx` | 3116 | 1 memo, 21 `.map()`, 9 useMemo — 12 list renders unprotected |

**Fix:** Wrap inline components di `React.memo`. Extract list item components ke file sendiri (bukan define inline). Tambah `useMemo` untuk computed data di list renders.

**Impact:** Rerender thrash di halaman yang paling sering dipakai users. setiap filter/sort → cascade rerender semua item.

---

## 🟡 P2 — Medium

### P2.1 Unbatched bulk DELETE di cleanup

| Function | Table | Masalah |
|---|---|---|
| `cleanupQuotaSnapshots()` | `quota_snapshots` | `DELETE FROM table WHERE ts < ?` — big transaction |
| `cleanupCallLogs()` | `call_logs` | Sama |
| `cleanupUsageHistory()` | `usage_history` | Sama |

**Fix:** `DELETE FROM table WHERE ts < ? LIMIT 1000` dalam loop + await antara batch.

**Impact:** Prevent WAL bloat + table lock. retention cleanup bisa freeze app for minutes.

---

### P2.2 SSE line parsing — 5x pattern matching per baris

Di `stream.ts` hot path: setiap SSE line dicek dengan `startsWith()` atau `RegExp.test()` berulang (lines 1184, 1190, 1205, 1220, 1225).

**Fix:** Switch on `trimmed[0]` — dispatch ke branch:
- `e` → event
- `d` → data  
- `:` → comment
- `i` → id
- `r` → retry

**Impact:** 5 regex checks → 1 char lookup per baris.

### P2.3 `stripAnsiCodes()` di setiap SSE line (streamHelpers.ts:120)

Setiap line dicek regex untuk ANSI escape, bahkan untuk provider yang tidak pernah emit ANSI.

**Fix:** Provider-level flag untuk skip ANSI stripping, atau cek `\x1b` byte dulu sebelum regex.

### P2.4 Large files >2000 lines (prioritas split)

| Lines | File | Split Potential | Alasan |
|---|---|---|---|
| 3210 | `open-sse/services/combo.ts` | **HIGH** | Per-provider combo extractable |
| 3192 | `open-sse/executors/chatgpt-web.ts` | **HIGH** | PoW, token, prompt builder separable |
| 2879 | `open-sse/handlers/imageGeneration.ts` | **HIGH** | Already has providers/ submodule |
| 2795 | `open-sse/utils/stream.ts` | **HIGH** | Chunk types, engine types extractable |
| 1833 | `open-sse/services/accountFallback.ts` | **HIGH** | Per-provider fallback logic |
| 4652 | `src/app/.../combos/page.tsx` | **HIGH** | Reuse API pagination → kurang baris |
| 4498 | `open-sse/handlers/chatCore.ts` | LOW | Already broken into chatCore/* subdir |

**Total >500 line files in repo:** 24 di `open-sse/`, 30+ di `src/`. **Min 5 files** dengan split potential HIGH.

### P2.5 Missing DB indexes

| Function | File | Query | Index Needed |
|---|---|---|---|
| `cleanupCallLogs()` | cleanup.ts | `DELETE FROM call_logs WHERE created_at < ?` | `idx_call_logs_created_at` |
| `cleanupUsageHistory()` | cleanup.ts | `DELETE FROM usage_history WHERE created_at < ?` | `idx_usage_history_created_at` |
| `cleanupQuotaSnapshots()` | cleanup.ts | `DELETE FROM quota_snapshots WHERE created_at < ?` | `idx_quota_snapshots_created_at` |
| `getPoolsByGroup()` | quotaPools.ts | `SELECT * FROM quota_pools WHERE group_id = ?` | `idx_quota_pools_group_id` |

---

## 🔵 P3 — Low (nice-to-have)

### P3.1 `getDatabaseStats()` — 2N+1 queries (stats.ts:41)

Query `sqlite_master` lalu per table 2 query. Fix dengan correlated subqueries dalam 1 query.

### P3.2 `emitSyntheticResponsesReasoningSummary` (stream.ts:1052)

Closure yang alokasi 2-3 objek + JSON.stringify per event. Guard dengan fast boolean check `payload.item?.type !== 'reasoning'`.

### P3.3 Date.now() multiple calls di non-stream path

Found di beberapa file — cache ke `const now = Date.now()`.

---

## Summary by Area

| Area | P0 | P1 | P2 | P3 | Total |
|---|---|---|---|---|---|
| DB queries | 2 | 0 | 2 | 1 | 5 |
| Bundle/browser | 1 | 2 | 0 | 0 | 3 |
| SSE streaming | 0 | 1 | 2 | 1 | 4 |
| Missing pagination | 1 | 0 | 0 | 0 | 1 |
| Large files (DX) | 0 | 0 | 1 | 0 | 1 |
| **Total** | **4** | **3** | **5** | **2** | **14** |

---

## Quick Wins (dikerjakan dalam 1 hari)

1. **recharts dynamic()** — 3 files, pattern sudah proven
2. **quotaPools N+1 JOIN** — 3 function, 1 pola fix
3. **SELECT tanpa LIMIT** — 9 DB functions, 1 pattern fix
4. **cleanup DELETE batching** — 3 functions, 1 pola fix
5. **Date.now() caching** — grep `Date.now()` → cache
6. **SSE hasActiveDeltaValue hoist** — 1 function, move scope

Ke-6 ini bisa parallel oleh 2-3 developer dalam 1 hari.

---

## Rollback Plan

Semua perubahan adalah **read-side** (tidak mengubah schema atau write path):
- DB: tambah `LIMIT/OFFSET` params — old caller tanpa params = behavior sama
- JOIN: hapus `getAllocations`/`getConnectionIds` call — test dengan quotaPools test
- Bundle: `dynamic()` import — SSR false → tidak perlu rollback khusus
- Cleanup: batch DELETE → tambah loop, test dengan small dataset dulu

Rollback = revert commit. Tidak ada data migration required.
