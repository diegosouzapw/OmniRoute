---
title: "Cost & Spend Tracking"
version: 3.8.24
lastUpdated: 2026-06-13
---

# Cost & Spend Tracking

How OmniRoute estimates, records, and reports the cost of every request — and why the
dashboard number is a **savings tracker**, not a bill.

See also: [User Guide](./USER_GUIDE.md) · [Features Gallery](./FEATURES.md)

---

## What it is (and what it is not)

OmniRoute attributes a per-request USD cost to every completion by multiplying token
counts by a model's pricing rates. These numbers power the **Costs** dashboard, the
`omniroute cost` / `omniroute usage` CLI, CSV/JSON exports, and per-API-key budgets.

> **The dashboard "cost" is a savings tracker, not a bill.** OmniRoute never charges you
> — it routes your requests to providers you have already connected (your own
> subscriptions, free tiers, and API keys). A "$290 total cost" accrued entirely on free
> models means roughly **$290 you did _not_ pay** a paid API. The figure is an _estimate_
> of what the same traffic would have cost at standard list prices, so you can see where
> your usage is concentrated and how much routing to cheaper/free providers is saving you.

This framing is stated directly in the project [README](../../README.md) ("the dashboard
'cost' is a savings tracker, not a bill").

Because the number is an estimate:

- It depends on the pricing table OmniRoute has for each model. A model with no pricing
  entry contributes `0` cost (it shows as a "Legacy / Free" row in the explorer).
- Free-tier and subscription traffic still accrues an _estimated_ cost — that is the
  amount you are saving, not an amount owed.

---

## How costs are estimated

### The pricing source

Costs come from a pricing table resolved in this precedence order
([`src/lib/pricingSync.ts`](../../src/lib/pricingSync.ts)):

1. **User overrides** — prices you set in the dashboard / via `PATCH /api/pricing`.
2. **Synced external pricing** — fetched from LiteLLM's public
   `model_prices_and_context_window.json` when sync is enabled (stored in a separate
   `pricing_synced` namespace so it never clobbers your overrides).
3. **Hardcoded defaults** — shipped with OmniRoute.

External pricing sync is **opt-in**, disabled by default. Relevant env vars
(see [`.env.example`](../../.env.example)):

| Env var                 | Default   | Purpose                                                          |
| ----------------------- | --------- | ---------------------------------------------------------------- |
| `PRICING_SYNC_ENABLED`  | `false`   | Enable the background LiteLLM pricing sync at startup.           |
| `PRICING_SYNC_INTERVAL` | `86400`   | Sync interval in **seconds** (default daily).                    |
| `PRICING_SYNC_SOURCES`  | `litellm` | Comma-separated source list (only `litellm` is supported today). |

### The cost formula

Cost is computed per request from token counts and per-million-token rates in
[`src/lib/usage/costCalculator.ts`](../../src/lib/usage/costCalculator.ts)
(`computeCostFromPricing` / `calculateCost`):

- **Input tokens** (minus cache reads and cache-creation tokens) × `input` rate.
- **Cache-read tokens** × `cached` rate (falls back to the input rate).
- **Cache-creation tokens** × `cache_creation` rate (falls back to the input rate).
- **Output tokens** × `output` rate.
- **Reasoning tokens** × `reasoning` rate (falls back to the output rate).

All rates are interpreted as USD per 1,000,000 tokens. A Codex "fast"/"priority" or
"flex" service tier applies a cost multiplier (`getCodexFastCostMultiplier`) — e.g. flex
is billed at a 50% token discount, surfaced as **flex savings** in the dashboard.

Model names are normalized first (provider-path prefixes such as `openai/` or
`accounts/fireworks/models/` are stripped) so historical rows still match a price.

### How spend is recorded

- The per-request cost is computed after the response and recorded fire-and-forget so it
  never adds latency to the client. Shared-quota consumption is scheduled on the next
  event-loop tick via [`src/lib/quota/spendRecorder.ts`](../../src/lib/quota/spendRecorder.ts).
- API-key spend is buffered and flushed in batches by the
  [`SpendBatchWriter`](../../src/lib/spend/batchWriter.ts) (default 60s flush interval,
  1,000-entry buffer). Tunable via:

  | Env var                             | Default | Purpose                            |
  | ----------------------------------- | ------- | ---------------------------------- |
  | `OMNIROUTE_SPEND_FLUSH_INTERVAL_MS` | `60000` | Flush interval in milliseconds.    |
  | `OMNIROUTE_SPEND_MAX_BUFFER_SIZE`   | `1000`  | Max buffered entries before flush. |

The dashboard's cost figures are **not** read from a stored per-row dollar amount — they
are recomputed on the fly from token counts and the current pricing table each time the
analytics endpoint runs. That means correcting a wrong price (and re-syncing) updates
historical cost estimates retroactively.

---

## Dashboard: the Costs page

The **Costs** page lives at `/dashboard/costs`
(`src/app/(dashboard)/dashboard/costs/`).
Its main view is the **Cost Overview** tab
(`src/app/(dashboard)/dashboard/costs/CostOverviewTab.tsx`),
which loads everything from `GET /api/usage/analytics`.

What it shows:

- **Spend tiles** — estimated spend for _Today (1d)_, _7d_, _30d_, and the selected
  window. Range selector: `7d`, `30d`, `90d`, `all`.
- **Headline metrics** — requests in window, active providers, active models, average
  cost per request.
- **Cost Explorer** — a sortable/filterable table grouped by **provider**, **model**,
  **API key**, **account**, or **service tier**, with cost, requests, tokens, avg
  cost/request, and share-of-total %.
- **Token usage** — total / input / output tokens and input:output ratio.
- **Routing efficiency** — fallback count, fallback rate, and requested-model coverage.
- **Monthly forecast** — projects month-end spend from the recent daily average.
- **Period comparison** — % change between the first and second half of the window.
- **Charts** — daily cost trend, provider share (pie), top providers, top models, cost
  by API key, cost by account, weekly usage pattern, and an activity heatmap.
- **Export** — download the current window as **CSV** or **JSON** (the buttons appear
  once there is non-zero cost data).

When there is no priced traffic, rows render as a "Legacy / Free" label instead of `$0`,
reflecting the savings-tracker model.

### Related Costs sub-pages

The Costs area also hosts (all under `/dashboard/costs/`):

- **Pricing** (`/dashboard/costs/pricing`) — view and override per-model prices (renders
  the shared Pricing tab).
- **Budget** (`/dashboard/costs/budget`) — set per-scope spend limits (renders the shared
  Budget tab).
- **Quota Share** (`/dashboard/costs/quota-share`) — shared-quota pools and burn-rate
  views.

---

## API endpoints

All of these require management auth (loopback/JWT, via `requireManagementAuth`) unless
noted.

### Usage & cost analytics

| Method | Endpoint                 | Purpose                                                                                                                                                  |
| ------ | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/usage/analytics`   | Full cost/usage analytics: summary, daily trend, by provider/model/API key/account/tier. Query: `range`, `startDate`, `endDate`, `apiKeyIds`, `presets`. |
| `GET`  | `/api/usage/utilization` | Per-provider quota utilization over time. Query: `range` (`1h`/`24h`/`7d`/`30d`), `provider`.                                                            |
| `GET`  | `/api/usage/history`     | Raw usage history rows.                                                                                                                                  |
| `GET`  | `/api/usage/call-logs`   | Per-request call logs (model, tokens, cost, latency, status).                                                                                            |
| `GET`  | `/api/usage/quota`       | Provider quota status.                                                                                                                                   |
| `GET`  | `/api/usage/proxy-logs`  | Proxy request logs.                                                                                                                                      |

### Budgets

| Method | Endpoint                 | Purpose                                                                        |
| ------ | ------------------------ | ------------------------------------------------------------------------------ |
| `GET`  | `/api/usage/budget`      | Cost summary + budget check for one API key (`apiKeyId` query param required). |
| `POST` | `/api/usage/budget`      | Set daily/weekly/monthly USD limits + warning threshold for an API key.        |
| `GET`  | `/api/usage/budget/bulk` | Bulk budget summaries across API keys.                                         |

> The budget API is scoped per **API key** (`apiKeyId`). Limits returned by
> `GET /api/usage/budget` include `dailyLimitUsd`, `weeklyLimitUsd`, `monthlyLimitUsd`,
> a `warningThreshold`, and the running totals (`totalCostToday`, `totalCostMonth`, …).

### Pricing

| Method   | Endpoint                | Purpose                                                                                         |
| -------- | ----------------------- | ----------------------------------------------------------------------------------------------- |
| `GET`    | `/api/pricing`          | Current merged pricing (user + synced + defaults). `?includeSources=1` to see source per entry. |
| `PATCH`  | `/api/pricing`          | Override pricing for `{ provider: { model: { input, output, cached, … } } }`.                   |
| `DELETE` | `/api/pricing`          | Reset pricing to defaults (optionally scoped by `?provider=&model=`).                           |
| `GET`    | `/api/pricing/defaults` | Show default per-1M fallback rates.                                                             |
| `GET`    | `/api/pricing/models`   | Pricing keyed by model.                                                                         |
| `POST`   | `/api/pricing/sync`     | Trigger a manual sync from external sources (LiteLLM).                                          |
| `GET`    | `/api/pricing/sync`     | Current sync status.                                                                            |
| `DELETE` | `/api/pricing/sync`     | Clear all synced pricing data.                                                                  |

### Other cost-relevant endpoints

| Method | Endpoint                      | Purpose                                                                 |
| ------ | ----------------------------- | ----------------------------------------------------------------------- |
| `GET`  | `/api/free-tier/summary`      | Free-model token totals, used-this-month, and remaining free allowance. |
| `GET`  | `/api/quota/pools/[id]/usage` | Usage for a shared-quota pool.                                          |

---

## CLI

OmniRoute's CLI exposes cost, usage, and pricing commands (registered in
[`bin/cli/commands/registry.mjs`](../../bin/cli/commands/registry.mjs)).

### `omniroute cost`

A cost report aggregated from `/api/usage/analytics`.

```bash
omniroute cost                          # last 30d, grouped by provider
omniroute cost --period 7d              # last 7 days
omniroute cost --group-by model         # group by provider | model | combo | api-key | day
omniroute cost --since 2026-06-01 --until 2026-06-13
omniroute cost --api-key <key> --limit 50
```

Columns: group, requests, tokens in/out, cost (USD), and % of total. A grand total line
is printed at the end (suppressed with `--quiet` or `--output json`).

### `omniroute usage`

```bash
omniroute usage analytics --period 30d [--provider <id>]   # per-provider cost summary
omniroute usage logs [--limit 100] [--follow] [--api-key <k>] [--search <q>]
omniroute usage quota [--provider <id>] [--check]
omniroute usage utilization [--api-key <k>]
omniroute usage history [--limit 100]
omniroute usage proxy-logs [--limit 100]

# Budgets
omniroute usage budget list
omniroute usage budget get [scope]
omniroute usage budget set <amount> [--scope global] [--period monthly]
omniroute usage budget reset [scope]
```

### `omniroute pricing`

```bash
omniroute pricing list [--provider <p>] [--model <m>] [--limit 200]
omniroute pricing get <model>
omniroute pricing sync [--provider <p>] [--force]   # POST /api/pricing/sync
omniroute pricing diff [--model <m>]
omniroute pricing defaults show
omniroute pricing defaults set [--input <p>] [--output <p>] [--cache-read <p>] [--cache-write <p>]
```

> `pricing defaults show` reads `GET /api/pricing/defaults`. To edit individual model
> prices instead, use the **Pricing** dashboard page or `PATCH /api/pricing`.

---

## Troubleshooting

- **All costs show $0 / "Legacy / Free".** The models in use have no pricing entry.
  Enable external sync (`PRICING_SYNC_ENABLED=true`) and run `omniroute pricing sync`, or
  set prices manually via the Pricing page / `PATCH /api/pricing`.
- **A historical model is mispriced.** Fix the price (override or re-sync) — cost is
  recomputed from token counts on every analytics read, so estimates update retroactively.
- **Spend lags behind real time.** Per-key spend is batched; lower
  `OMNIROUTE_SPEND_FLUSH_INTERVAL_MS` if you need fresher numbers.

---

For where this fits in the broader dashboard, see the [User Guide](./USER_GUIDE.md) and
the [Features Gallery](./FEATURES.md).
