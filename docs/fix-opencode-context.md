# Fix: OpenCode combo context window detection

## Bug

OpenCode v1's `opencode.json` requires an explicit `limit.context` (and
`limit.output`) for every model. Without these fields, OpenCode's heuristic
kicks in and reports a wrong context window.

The OmniRoute `/v1/models` catalog is the single source of truth for context
windows. The bug was that some combos were published to the catalog WITHOUT
a computed `context_length`, so any OpenCode client pulling the catalog got
no answer for them.

## Root cause

The "Opencode FREE Omni" combo references four `opencode/<model>` targets
(`big-pickle`, `deepseek-v4-flash-free`, `minimax-m3-free`,
`nemotron-3-super-free`). The catalog's `buildComboCatalogMetadata` computes
the combo's `context_length` as the **minimum of its targets' known
contexts**, but every target's lookup was returning `null`.

The lookup chain in `getCanonicalModelMetadata`:

1. `getSyncedCapability("opencode", "big-pickle")` → returns `null` because
   the DB row is stored under `provider = "opencode-zen"`, not `"opencode"`.
2. `getRegistryModel("opencode", "big-pickle")` → returns `null` because
   `PROVIDER_MODELS["opencode"]` (and `["oc"]`) don't have static entries
   for these models.
3. `getModelSpec("big-pickle")` → returns `null` (no static spec).

All three lookups fail → metadata is `null` → combo has no context.

Why was the DB row under `"opencode-zen"` and not `"opencode"`?
`MODELS_DEV_PROVIDER_MAP["opencode"]` was `["opencode-zen"]` only — a
historical one-way mapping. New syncs continued to write under the alias
side of the pair, while the catalog & combo targets use the canonical id
side.

## Fix (3 layers, in this order)

### 1. `src/lib/modelsDevSync.ts` — symmetric `mapProviderId` mapping

```ts
// Before:
opencode: ["opencode-zen"],
"opencode-go": ["opencode-go"],

// After:
opencode: ["opencode", "opencode-zen"],
"opencode-go": ["opencode-go", "opencode-zen"],
```

Now models.dev data lands under BOTH the canonical id and the historical
alias, so any future sync keeps the lookup paths in sync.

### 2. `src/lib/modelsDevSync.ts` — alias-aware fallback in `getSyncedCapability`

The runtime fix that takes effect **immediately**, without waiting for a
re-sync. Existing DB rows under `"opencode-zen"` are now found when
callers pass `"opencode"` (or vice-versa).

```ts
const SYNCED_CAPABILITY_FALLBACK_ALIASES: Record<string, string[]> = {
  opencode: ["opencode-zen"],
  "opencode-zen": ["opencode"],
  "opencode-go": ["opencode-zen"],
};
```

### 3. `src/lib/cli-helper/config-generator/opencode.ts` — drop the hardcoded 128K fallback

The previous band-aid hardcoded `FALLBACK_CONTEXT_LENGTH = 128_000` for
models whose context was unknown. That's wrong: combos like "Opencode
FREE Omni" should report **200K** (the min of their 200K targets), not
the universal 128K default.

The generator now:

- Uses the catalog as the **single source of truth** for `limit.context`.
- Emits the model **without** `limit.context` if the catalog has no entry
  — OpenCode's own heuristic applies and the user can fix the upstream.
- **Throws** if the catalog fetch fails outright — the CLI catches and
  surfaces the error. We never silently write a stale opencode.json.

## Deployment steps (for the operator)

1. Pull the latest from the branch:
   `git fetch && git checkout fix/opencode-context-window`
2. Rebuild OmniRoute: `npm run build`
3. Restart the OmniRoute server (kill the running process and re-run).
4. Trigger a models.dev sync from the Settings → Models.dev panel
   (or POST `/api/settings/models-dev` with `{"action": "sync"}`).
5. Re-run the opencode.json generator (the CLI command or the
   `scripts/regen-opencode-config.ts` script).

After step 5, `Opencode FREE Omni`'s `limit.context` will be **200000**
and every other combo will reflect its targets' min context.

## Verification

After the rebuild, hit `GET /v1/models` and inspect the response:

```bash
curl -s http://localhost:20128/v1/models \
  -H "Authorization: Bearer $API_KEY" \
  | jq '.data[] | select(.id == "Opencode FREE Omni") | .context_length'
# → 200000
```
