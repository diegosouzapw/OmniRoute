# SvelteKit Migration Plan

## Migration Pattern (from analysis)

### Architecture Shift

The Next.js app is a monolithic `"use client"` React SPA where dashboard pages call Next.js API routes (`/api/dashboard/*`) which proxy to the upstream OmniRoute proxy. The SvelteKit app uses a **BFF (Backend For Frontend)** pattern: a separate Hono service (`apps/bff`, port 4322) provides simplified dashboard APIs, and the SvelteKit frontend calls it directly via `bffApiUrl()`.

**Key architectural differences:**

| Concern | Next.js | SvelteKit |
|---------|---------|-----------|
| Data fetching | `useEffect` + `fetch("/api/...")` | `onMount` + `fetch(bffApiUrl("/api/dashboard/..."))` |
| State management | `useState` + Zustand stores | Svelte 5 `$state` runes (no Zustand) |
| Routing | `/(dashboard)/dashboard/` route groups | `/dashboard/` flat routes |
| i18n | `next-intl` (`useTranslations`) | `$lib/i18n` (`t()`) |
| Components | `@/shared/components` (Card, Button, Badge, etc.) | `$lib/components/ui/` (Card.svelte, Button.svelte) |
| Layouts | React layout with providers | SvelteKit `+layout.svelte` |
| Forms | Controlled inputs with `useState` | `bind:value` with `onsubmit` |
| Auth | Next.js middleware + JWT | `hooks.server.ts` cookie-based bucket routing |

### Data Fetching Pattern (3 variants)

**1. Simple fetch (most pages):**
```svelte
<script lang="ts">
  import { bffApiUrl } from '$lib/bff-origin';
  import { onMount } from 'svelte';

  let data = $state<Type[]>([]);
  let loading = $state(true);
  let error = $state<string | null>(null);

  onMount(async () => {
    try {
      const res = await fetch(bffApiUrl('/api/dashboard/endpoint'), { credentials: 'include' });
      if (res.ok) data = (await res.json()).field ?? [];
      else error = `BFF returned ${res.status}`;
    } catch (err) {
      error = `BFF unreachable: ${(err as Error).message}`;
    } finally {
      loading = false;
    }
  });
</script>
```

**2. tRPC client (used in providers page):**
```svelte
<script lang="ts">
  import { trpc } from '$lib/trpc/client';
  let items = $state([]);
  onMount(async () => { items = await trpc.providers.list.query(); });
</script>
```

**3. SSE streaming (health page):**
```svelte
<script lang="ts">
  import { bffApiUrl } from '$lib/bff-origin';
  import { onMount, onDestroy } from 'svelte';
  let events = $state<Event[]>([]);
  let eventSource: EventSource | null = null;
  onMount(() => { eventSource = new EventSource(bffApiUrl('/api/dashboard/health/stream')); ... });
  onDestroy(() => { eventSource?.close(); });
</script>
```

### Component Translation Guide

| React/Next.js | SvelteKit equivalent |
|---------------|---------------------|
| `<Card>` from `@/shared/components` | `<Card>` from `$lib/components/ui/Card.svelte` |
| `<Button>` from `@/shared/components` | `<Button>` from `$lib/components/ui/Button.svelte` |
| `useState(initialValue)` | `let x = $state(initialValue)` |
| `useEffect(() => { ... }, [])` | `$effect(() => { ... })` or `onMount(() => { ... })` |
| `const derived = useMemo(() => expr, [deps])` | `const derived = $derived(expr)` |
| `useTranslations("namespace")` | `t('key')` from `$lib/i18n` |
| `{items.map(i => <Comp key={i.id} />)}` | `{#each items as i (i.id)}<Comp />{/each}` |
| `{condition && <Comp />}` | `{#if condition}<Comp />{/if}` |
| `{loading ? <Skeleton /> : <Content />}` | `{#if loading}<p>Loading...<\/p>{:else}<Content />{/if}` |
| `className="..."` | `class="..."` (same, Tailwind) |
| `onClick={handler}` | `onclick={handler}` |
| `onChange={handler}` | `onchange={handler}` |
| `value={state} onChange={e => setState(e.target.value)}` | `bind:value={state}` |

### Key Pattern: "Thin Shell" Pages

Most migrated SvelteKit pages are **thin shells** (~40-120 LOC) that:
1. Fetch data from BFF on mount
2. Render a simple table or card layout
3. Provide basic CRUD actions (create, delete, edit)
4. Handle loading/error states with conditional rendering

This is a major simplification from Next.js pages which often include:
- Complex component composition with sub-components
- Client-side state management with Zustand
- i18n translations for every label
- Advanced features (charts, real-time updates, drag-and-drop)

---

## Shared Infrastructure

### What's already built in SvelteKit:

| Module | Path | Purpose |
|--------|------|---------|
| BFF origin helper (browser) | `src/lib/bff-origin.ts` | Constructs BFF URLs, supports `window.__OMNIROUTE_BFF_URL__` |
| BFF origin helper (server) | `src/lib/server/bff.ts` | Server-side BFF URL from `BFF_ORIGIN` env var |
| tRPC client | `src/lib/trpc/client.ts` | Typed tRPC client connecting to BFF `/api/trpc` |
| Hono API client | `src/lib/api/client.ts` | `hc` client + `apiGet<T>()` helper |
| Theme store | `src/lib/stores/theme.svelte.ts` | Svelte 5 rune-based theme state |
| Logger | `src/lib/observability/logger.ts` | Structured logging |
| Web Vitals | `src/lib/observability/web-vitals.ts` | Performance monitoring |
| Unavailable message | `src/lib/observability/unavailable.ts` | Standard "data unavailable" message helper |
| i18n | `src/lib/i18n/` | 20+ language JSON files + `t()` function |
| UI: Card | `src/lib/components/ui/Card.svelte` | Basic card component |
| UI: Button | `src/lib/components/ui/Button.svelte` | Basic button with variants |
| UI: CommandPalette | `src/lib/components/foundation/CommandPalette.svelte` | Cmd+K palette |
| Combos components | `src/lib/components/combos/` | FlowEditor, RuleEditor, node components |
| Auth routing | `src/hooks.server.ts` | Cookie-based bucket routing, `?web=svelte`/`?web=next` force |
| Root layout | `src/routes/+layout.svelte` | Nav bar, i18n, web vitals, CommandPalette |
| Login page | `src/routes/login/+page.svelte` | OAuth login |
| Callback page | `src/routes/callback/+page.svelte` | OAuth callback |

### BFF Dashboard API Surface (from `apps/bff/src/routes/dashboard.ts`):

The BFF currently provides these dashboard endpoints (most return mock/placeholder data):

- `GET/POST /providers` - List/create providers
- `GET /usage` - Usage data
- `GET /combos`, `POST /combos` - Combo management
- `GET /security` - Security status
- `GET/POST /keys`, `POST /keys/:id/revoke` - API key management
- `GET/POST /settings` - App settings
- `GET /cost` - Cost data
- `GET /billing`, `GET /billing/invoices` - Billing info
- `GET /logs` - Log entries
- `GET /mcp` - MCP server list
- `GET /a2a` - Agent-to-agent list
- `GET /skills` - Skills list
- `GET /memory` - Memory entries
- `GET /cache` - Cache stats
- `GET /batch` - Batch jobs
- `GET /webhooks` - Webhook list
- `GET /audit`, `POST /audit/export` - Audit events
- `GET /compression/stats`, `POST /compression/ab` - Compression
- `GET/POST /playground/models`, `POST /playground/stream` - Playground
- `GET/PUT /router` - Router config
- `GET /observability/*` - Observability data
- `GET /diagnostics/full` - Diagnostics
- `GET/PUT /flags/:key` - Feature flags
- `GET /profile`, `PUT /profile` - User profile
- `GET /sessions`, `DELETE /sessions/:id` - Session management
- `POST /keys-rotation` - Key rotation
- `GET/PUT /sso`, `POST /sso/test` - SSO config
- `GET/PUT /notifications`, `POST /notifications/test` - Notifications
- `GET /quotas`, `PUT /quotas` - Quota management
- `GET /rules`, `PUT /rules` - Routing rules
- `GET /performance` - Performance data
- `GET /health/stream` - SSE health stream

---

## Migration Priority Queue

### HIGH PRIORITY - Core functionality (Batch 1-2)

| # | Page | Next.js LOC | Complexity | BFF Endpoint Exists | Dependencies |
|---|------|-------------|------------|--------------------|--------------| 
| 1 | `/dashboard/analytics` | 155 | Medium | No (needs BFF) | Sub-pages: combo-health, compression, evals, search, utilization |
| 2 | `/dashboard/context` + 11 sub-pages | 36 + ~400 est. | High | No (needs BFF) | context/settings, context/combos, context/ultra, etc. |
| 3 | `/dashboard/costs` + budget/pricing/quota-share | Redirect | Medium | No (needs BFF) | `/dashboard/cost` exists but different structure |
| 4 | `/dashboard/settings` + 10 sub-pages | 31 (redirect) | Medium | Partial (settings/general exists) | settings/advanced, settings/ai, settings/appearance, etc. |
| 5 | `/dashboard/plugins` + config page | 265+154 | Medium | No (needs BFF) | plugins/[name]/config |
| 6 | `/dashboard/providers/[id]` + new + services | 433 (parent) | High | Partial | providers/new, providers/services |
| 7 | `/dashboard/combos/[id]` + live + playground | 4691 (parent) | Very High | Partial | combos/live, combos/playground |
| 8 | `/dashboard/discovery` | ~100 est. | Low | No (needs BFF) | — |
| 9 | `/dashboard/free-provider-rankings` | 297 | Medium | No (needs BFF) | — |
| 10 | `/dashboard/free-tiers` | 11 | Low | No (needs BFF) | — |

### MEDIUM PRIORITY - Supporting features (Batch 3-4)

| # | Page | Next.js LOC | Complexity | BFF Endpoint Exists | Dependencies |
|---|------|-------------|------------|--------------------|--------------|
| 11 | `/dashboard/cloud-agents` | 930 | High | No (needs BFF) | — |
| 12 | `/dashboard/acp-agents` | 378 | Medium | No (needs BFF) | — |
| 13 | `/dashboard/cli-agents` + [id] | ~200 est. | Medium | No (needs BFF) | Dynamic route |
| 14 | `/dashboard/cli-code` + [id] | ~200 est. | Medium | No (needs BFF) | Dynamic route |
| 15 | `/dashboard/tokens` | 604 | Medium | No (needs BFF) | — |
| 16 | `/dashboard/onboarding` | 543 | Medium | No (needs BFF) | — |
| 17 | `/dashboard/provider-stats` | 534 | Medium | No (needs BFF) | — |
| 18 | `/dashboard/media-providers` + [kind] + [id] | 97+72 est. | Medium | No (needs BFF) | Dynamic routes |
| 19 | `/dashboard/omni-skills` | ~100 est. | Low | No (needs BFF) | — |
| 20 | `/dashboard/search-tools` | ~100 est. | Low | No (needs BFF) | — |
| 21 | `/dashboard/leaderboard` | 212 | Low | No (needs BFF) | — |
| 22 | `/dashboard/gamification/admin` | 79 | Low | No (needs BFF) | — |
| 23 | `/dashboard/auto-combo` | ~100 est. | Low | No (needs BFF) | — |
| 24 | `/dashboard/translator` | 14 | Trivial | No (needs BFF) | — |
| 25 | `/dashboard/limits` | ~50 est. | Low | No (needs BFF) | — |
| 26 | `/dashboard/quota` | 34 | Low | No (needs BFF) | — |

### LOW PRIORITY - Static/error/utility pages (Batch 5)

| # | Page | Next.js LOC | Complexity | BFF Endpoint Exists | Dependencies |
|---|------|-------------|------------|--------------------|--------------|
| 27 | `/dashboard/api-endpoints` | ~100 est. | Low | No (needs BFF) | — |
| 28 | `/dashboard/api-manager` | ~100 est. | Low | No (needs BFF) | — |
| 29 | `/dashboard/endpoint` | ~80 est. | Low | No (needs BFF) | — |
| 30 | `/dashboard/activity` | ~100 est. | Low | No (needs BFF) | — |
| 31 | `/dashboard/agent-skills` | ~100 est. | Low | No (needs BFF) | — |
| 32 | `/dashboard/logs/activity` + console + proxy + timeline | 30 est. | Low | Partial (logs exists) | Sub-routes |
| 33 | `/dashboard/batch/files` | 77 | Low | No (needs BFF) | — |
| 34 | `/dashboard/cache/media` | ~50 est. | Low | No (needs BFF) | — |
| 35 | `/dashboard/compression/exclusions` + live + studio | ~150 est. | Low | Partial (compression exists) | Sub-routes |
| 36 | `/dashboard/system/mitm-proxy` + 1proxy + proxy | 40 est. | Low | No (needs BFF) | — |
| 37 | `/dashboard/tools/agent-bridge` + traffic-inspector | 66 est. | Low | No (needs BFF) | — |
| 38 | `/dashboard/chaos` | 12 | Trivial | No (needs BFF) | — |
| 39 | `/dashboard/relay` | 11 | Trivial | No (needs BFF) | — |
| 40 | `/dashboard/changelog` | 33 | Trivial | No (needs BFF) | — |
| 41 | `/dashboard/audit/a2a` + mcp | ~100 est. | Low | Partial (audit exists) | Sub-routes |
| 42 | `/dashboard/home` | — | Low | N/A | Redirect or shell |

### NON-DASHBOARD PAGES (Batch 6)

| # | Page | Next.js LOC | Complexity | Notes |
|---|------|-------------|------------|-------|
| 43 | `/landing` | 130 | Low | Marketing page |
| 44 | `/docs` + `[...slug]` + api-explorer | 136+119 est. | Medium | Documentation system |
| 45 | `/privacy` | 164 | Low | Static legal page |
| 46 | `/terms` | 93 | Low | Static legal page |
| 47 | `/forgot-password` | 195 | Low | Auth flow |
| 48 | `/maintenance` | 54 | Trivial | Status page |
| 49 | `/offline` | 64 | Trivial | Status page |
| 50 | `/status` | 156 | Low | Health check page |
| 51 | `/forbidden` | 45 | Trivial | Error page |
| 52 | Error pages: 400, 401, 403, 408, 429, 500, 502, 503 | ~100 total | Trivial | Standard error pages |
| 53 | `/connect/codex/[token]` | ~50 est. | Low | Deep link handler |
| 54 | `/auth/callback` | ~30 est. | Low | OAuth variant |

---

## Batch Plan

### Batch 1: Quick Wins + BFF Foundation (2-3 days)

**Goal:** Expand BFF API surface and migrate simple, high-value pages.

**BFF work:**
- Add endpoints for: analytics overview, settings sub-pages, costs, provider-stats, discovery, leaderboard, free-tiers, free-provider-rankings
- Add SSE streams for: logs/timeline, compression/live

**Page migrations (15 pages):**
- `/dashboard/costs` + budget + pricing + quota-share (4 pages, ~100 LOC each)
- `/dashboard/discovery` (1 page, ~80 LOC)
- `/dashboard/leaderboard` (1 page, ~80 LOC)
- `/dashboard/free-provider-rankings` (1 page, ~120 LOC)
- `/dashboard/free-tiers` (1 page, ~30 LOC)
- `/dashboard/limits` (1 page, ~40 LOC)
- `/dashboard/quota` (1 page, ~40 LOC)
- `/dashboard/translator` (1 page, ~30 LOC)
- `/dashboard/changelog` (1 page, ~40 LOC)
- `/dashboard/chaos` (1 page, ~30 LOC)
- `/dashboard/relay` (1 page, ~30 LOC)

**Estimated LOC:** ~700 new SvelteKit LOC

### Batch 2: Settings & Config Hub (3-4 days)

**Goal:** Complete the settings ecosystem and config pages.

**BFF work:**
- Add endpoints for: settings/* sub-pages, plugins, plugin config, flags admin

**Page migrations (14 pages):**
- `/dashboard/settings` + 9 sub-pages (10 pages, ~60-80 LOC each)
- `/dashboard/plugins` + [name]/config (2 pages, ~100 LOC each)
- `/dashboard/flags` + admin (2 pages, ~60 LOC each)

**Estimated LOC:** ~900 new SvelteKit LOC

### Batch 3: Analytics & Observability (4-5 days)

**Goal:** Complete the analytics dashboard with all sub-tabs.

**BFF work:**
- Add endpoints for: analytics/* sub-pages, observability details, compression/* sub-pages, logs/* sub-pages

**Page migrations (14 pages):**
- `/dashboard/analytics` + 5 sub-pages (6 pages, ~80-100 LOC each)
- `/dashboard/compression/exclusions` + live + studio (3 pages, ~60 LOC each)
- `/dashboard/logs/activity` + console + proxy + timeline (4 pages, ~50 LOC each)
- `/dashboard/activity` (1 page, ~60 LOC)

**Estimated LOC:** ~900 new SvelteKit LOC

### Batch 4: Provider & Agent Ecosystem (5-6 days)

**Goal:** Complete provider management, agent pages, and media providers.

**BFF work:**
- Add endpoints for: providers/[id], providers/new, providers/services, cloud-agents, acp-agents, cli-agents, cli-code, media-providers, onboarding, tokens, provider-stats, agent-skills, omni-skills, search-tools, auto-combo, gamification/admin

**Page migrations (22 pages):**
- `/dashboard/providers/[id]` + new + services (3 pages, ~100-200 LOC each)
- `/dashboard/cloud-agents` (1 page, ~200 LOC)
- `/dashboard/acp-agents` (1 page, ~120 LOC)
- `/dashboard/cli-agents` + [id] (2 pages, ~80 LOC each)
- `/dashboard/cli-code` + [id] (2 pages, ~80 LOC each)
- `/dashboard/media-providers` + [kind] + [id] (3 pages, ~80 LOC each)
- `/dashboard/onboarding` (1 page, ~120 LOC)
- `/dashboard/tokens` (1 page, ~100 LOC)
- `/dashboard/provider-stats` (1 page, ~100 LOC)
- `/dashboard/agent-skills` (1 page, ~60 LOC)
- `/dashboard/omni-skills` (1 page, ~60 LOC)
- `/dashboard/search-tools` (1 page, ~60 LOC)
- `/dashboard/auto-combo` (1 page, ~60 LOC)
- `/dashboard/gamification/admin` (1 page, ~50 LOC)

**Estimated LOC:** ~1,700 new SvelteKit LOC

### Batch 5: Context & Combo Deep Dive (5-7 days)

**Goal:** Migrate the most complex pages (context system and combo builder).

**BFF work:**
- Add endpoints for: context/* sub-pages, combos/[id], combos/live, combos/playground

**Page migrations (16 pages):**
- `/dashboard/context` + 11 sub-pages (12 pages, ~60-100 LOC each)
- `/dashboard/combos/[id]` + live + playground (3 pages, ~100-300 LOC each)

**Estimated LOC:** ~1,800 new SvelteKit LOC

### Batch 6: System, Tools & Static Pages (2-3 days)

**Goal:** Complete system pages, tools, and static/error pages.

**BFF work:**
- Add endpoints for: system/*, tools/*, api-endpoints, api-manager, endpoint

**Page migrations (20 pages):**
- `/dashboard/system/mitm-proxy` + 1proxy + proxy (3 pages, ~40 LOC each)
- `/dashboard/tools/agent-bridge` + traffic-inspector (2 pages, ~50 LOC each)
- `/dashboard/api-endpoints` (1 page, ~60 LOC)
- `/dashboard/api-manager` (1 page, ~60 LOC)
- `/dashboard/endpoint` (1 page, ~50 LOC)
- `/dashboard/batch/files` (1 page, ~50 LOC)
- `/dashboard/cache/media` (1 page, ~40 LOC)
- `/dashboard/audit/a2a` + mcp (2 pages, ~50 LOC each)
- `/dashboard/home` (1 page, ~30 LOC)

**Estimated LOC:** ~600 new SvelteKit LOC

### Batch 7: Non-Dashboard Pages (2-3 days)

**Goal:** Migrate static pages, auth pages, error pages, and docs.

**Page migrations (14 pages):**
- `/landing` (1 page, ~80 LOC)
- `/docs` + `[...slug]` + api-explorer (3 pages, ~100 LOC each)
- `/privacy` + `/terms` (2 pages, ~80 LOC each)
- `/forgot-password` (1 page, ~80 LOC)
- `/maintenance` + `/offline` + `/status` (3 pages, ~40 LOC each)
- `/forbidden` + error pages 400/401/403/408/429/500/502/503 (9 pages, ~20 LOC each)
- `/connect/codex/[token]` (1 page, ~30 LOC)

**Estimated LOC:** ~600 new SvelteKit LOC

---

## Estimated Effort

| Metric | Value |
|--------|-------|
| Total pages to migrate | 92 dashboard + 24 non-dashboard = **116 pages** |
| Pages already in both stacks | 18 (matching by path) |
| SvelteKit-only pages (new) | 37 (billing, cost, diagnostics, flags, etc.) |
| Total estimated new SvelteKit LOC | **~7,200 LOC** |
| BFF endpoints to add | ~40 new endpoints |
| Estimated time (solo dev) | **23-31 days** |
| Estimated time (2 devs) | **12-16 days** |
| Estimated time (3 devs) | **8-11 days** |

### Complexity Distribution

| Complexity | Pages | % | Est. LOC |
|------------|-------|---|----------|
| Trivial (< 30 LOC) | 18 | 16% | ~400 |
| Low (30-80 LOC) | 45 | 39% | ~2,400 |
| Medium (80-150 LOC) | 35 | 30% | ~3,200 |
| High (150-300 LOC) | 12 | 10% | ~1,200 |
| Very High (300+ LOC) | 1 | 1% | ~0* |
| **Total** | **116** | | **~7,200** |

*The combo page (4691 LOC) will be heavily decomposed during migration.

### Risk Areas

1. **Combo builder** (`combos/page.tsx` at 4,691 LOC): Requires significant decomposition. The SvelteKit version should extract sub-components into `$lib/components/combos/` (already partially started with FlowEditor, RuleEditor, node components).

2. **Context system** (12 sub-pages): Complex configuration UI with many interdependent settings. BFF endpoints need careful design.

3. **Provider management** (1,923 LOC): Large page with many features (model sync, import/export, compatibility checking, display modes). The SvelteKit version should be split into focused sub-components.

4. **i18n**: Next.js uses `next-intl` with namespace-based translations. SvelteKit has `$lib/i18n` but many page-specific translation keys need to be added.

5. **Auth**: The current SvelteKit auth is cookie-based bucket routing only. Full auth (JWT validation, session management) may need to be implemented for production use.
