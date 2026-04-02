# Gemini Available Models from API Sync — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Gemini "Available Models" should be populated from the Google API on API key save, unioned across multiple API keys, instead of using the hardcoded registry list.

**Architecture:** New DB namespace `syncedAvailableModels` stores API-synced models per provider. For Gemini, the dashboard reads from this instead of the hardcoded registry. On API key save, sync is triggered automatically. Multiple API keys' models are unioned by ID.

**Tech Stack:** TypeScript, Next.js API routes, SQLite key-value store, React dashboard.

---

## File Structure

| File | Action | Responsibility |
|------|--------|---------------|
| `src/lib/db/models.ts` | Modify | Add `syncedAvailableModels` CRUD functions |
| `src/lib/localDb.ts` | Modify | Re-export new functions |
| `src/app/api/providers/route.ts` | Modify | Auto-trigger sync on Gemini API key save |
| `src/app/api/providers/[id]/sync-models/route.ts` | Modify | Gemini writes to new namespace with union logic |
| `src/app/(dashboard)/dashboard/providers/[id]/page.tsx` | Modify | Gemini reads from synced models for Available Models, hides Custom Models |
| `src/app/api/v1/models/catalog.ts` | Modify | Read from synced models for Gemini |
| `src/app/api/v1beta/models/route.ts` | Modify | Read from synced models for Gemini |

---

### Task 1: Add `syncedAvailableModels` DB functions

**Files:**
- Modify: `src/lib/db/models.ts` (add after the custom models section, ~line 500)
- Modify: `src/lib/localDb.ts` (add re-exports)

- [ ] **Step 1: Add DB functions to `src/lib/db/models.ts`**

Add the following after the custom models section (after `removeCustomModel`, around line 500):

```typescript
// ──────────────── Synced Available Models ────────────────

export interface SyncedAvailableModel {
  id: string;
  name: string;
  source: "api-sync";
  supportedEndpoints?: string[];
  inputTokenLimit?: number;
  outputTokenLimit?: number;
  description?: string;
  supportsThinking?: boolean;
}

/**
 * Get synced available models for a provider.
 */
export async function getSyncedAvailableModels(providerId: string): Promise<SyncedAvailableModel[]> {
  const db = getDbInstance();
  const row = db
    .prepare("SELECT value FROM key_value WHERE namespace = 'syncedAvailableModels' AND key = ?")
    .get(providerId);
  const value = getKeyValue(row).value;
  return value ? JSON.parse(value) : [];
}

/**
 * Get all synced available models across all providers.
 */
export async function getAllSyncedAvailableModels(): Promise<Record<string, SyncedAvailableModel[]>> {
  const db = getDbInstance();
  const rows = db
    .prepare("SELECT key, value FROM key_value WHERE namespace = 'syncedAvailableModels'")
    .all();
  const result: Record<string, SyncedAvailableModel[]> = {};
  for (const row of rows) {
    const { key, value } = getKeyValue(row);
    if (!key || value === null) continue;
    result[key] = JSON.parse(value);
  }
  return result;
}

/**
 * Union new models into the existing synced available models for a provider.
 * Models are matched by ID. New models are added; existing models get their
 * metadata updated from the new data.
 */
export async function unionSyncedAvailableModels(
  providerId: string,
  newModels: SyncedAvailableModel[]
): Promise<SyncedAvailableModel[]> {
  const existing = await getSyncedAvailableModels(providerId);
  const map = new Map<string, SyncedAvailableModel>();
  for (const m of existing) {
    if (m.id) map.set(m.id, m);
  }
  for (const m of newModels) {
    if (m.id) map.set(m.id, m);
  }
  const merged = Array.from(map.values());
  const db = getDbInstance();
  db.prepare(
    "INSERT OR REPLACE INTO key_value (namespace, key, value) VALUES ('syncedAvailableModels', ?, ?)"
  ).run(providerId, JSON.stringify(merged));
  backupDbFile("pre-write");
  return merged;
}
```

- [ ] **Step 2: Add re-exports to `src/lib/localDb.ts`**

Add these to the import block from `"./db/models"` (around line 40-55) — add the new exports to the existing import statement:

```
  getSyncedAvailableModels,
  getAllSyncedAvailableModels,
  unionSyncedAvailableModels,
```

And add a type re-export near the other type re-exports:

```typescript
export type { SyncedAvailableModel } from "./db/models";
```

- [ ] **Step 3: Build to verify no type errors**

Run: `npx tsc --noEmit --pretty 2>&1 | grep -i "models\.ts\|localDb" | head -10`
Expected: No errors related to modified files.

- [ ] **Step 4: Commit**

```bash
git add src/lib/db/models.ts src/lib/localDb.ts
git commit -m "feat(db): add syncedAvailableModels namespace and CRUD functions"
```

---

### Task 2: Update sync-models route for Gemini union logic

**Files:**
- Modify: `src/app/api/providers/[id]/sync-models/route.ts`

- [ ] **Step 1: Add import and update the sync logic for Gemini**

Add this import near the top of the file, alongside the existing `getCustomModels` import:

```typescript
import { unionSyncedAvailableModels } from "@/lib/db/models";
```

Then, after the existing sync completes (after line ~196 where `replaced` is assigned), add Gemini-specific logic. Find the block starting with `const replaced = await replaceCustomModels(logProvider, models);` and add after it:

```typescript
    // For Gemini: also write to syncedAvailableModels (unioned across API keys)
    if (logProvider === "gemini") {
      try {
        const syncedModels = models.map((m: any) => ({
          id: m.id,
          name: m.name || m.id,
          source: "api-sync" as const,
          ...(m.supportedEndpoints ? { supportedEndpoints: m.supportedEndpoints } : {}),
          ...(typeof m.inputTokenLimit === "number" ? { inputTokenLimit: m.inputTokenLimit } : {}),
          ...(typeof m.outputTokenLimit === "number" ? { outputTokenLimit: m.outputTokenLimit } : {}),
          ...(typeof m.description === "string" ? { description: m.description } : {}),
          ...(m.supportsThinking === true ? { supportsThinking: true } : {}),
        }));
        await unionSyncedAvailableModels(logProvider, syncedModels);
      } catch (e) {
        console.error("Failed to union synced available models for gemini:", e);
      }
    }
```

- [ ] **Step 2: Build to verify no type errors**

Run: `npx tsc --noEmit --pretty 2>&1 | grep "sync-models" | head -5`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/api/providers/[id]/sync-models/route.ts
git commit -m "feat(sync): write Gemini models to syncedAvailableModels with union logic"
```

---

### Task 3: Auto-trigger sync on Gemini API key save

**Files:**
- Modify: `src/app/api/providers/route.ts`

- [ ] **Step 1: Add auto-sync trigger after Gemini connection creation**

In the POST handler, after `const newConnection = await createProviderConnection(...)` (line ~129) and before `const result: Record<string, any> = { ...newConnection };` (line ~143), add:

```typescript
    // Auto-trigger model sync for Gemini when API key is saved
    if (provider === "gemini" && newConnection?.id) {
      try {
        const origin = new URL(request.url).origin;
        fetch(`${origin}/api/providers/${newConnection.id}/sync-models`, {
          method: "POST",
          headers: {
            ...buildModelSyncInternalHeaders(),
            cookie: request.headers.get("cookie") || "",
          },
        }).catch((e) => console.error("Auto-sync failed for gemini:", e));
      } catch (e) {
        // Non-blocking — don't fail the connection save
        console.error("Failed to trigger auto-sync for gemini:", e);
      }
    }
```

Add this import at the top of the file:

```typescript
import { buildModelSyncInternalHeaders } from "@/shared/services/modelSyncScheduler";
```

- [ ] **Step 2: Build to verify no type errors**

Run: `npx tsc --noEmit --pretty 2>&1 | grep "providers/route" | head -5`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/api/providers/route.ts
git commit -m "feat(gemini): auto-trigger model sync when API key is saved"
```

---

### Task 4: Dashboard reads from synced available models for Gemini

**Files:**
- Modify: `src/app/(dashboard)/dashboard/providers/[id]/page.tsx`

This is the most complex task. Two changes:
1. For Gemini, "Available Models" reads from `syncedAvailableModels` instead of the hardcoded registry
2. Hide "Custom Models" section for Gemini (since all synced models go to Available Models)

- [ ] **Step 1: Add state and fetch for synced available models**

Find the `modelMeta` state declaration (around line 834). Add a new state after it:

```typescript
  const [syncedAvailableModels, setSyncedAvailableModels] = useState<any[]>([]);
```

Find the `fetchProviderModelMeta` callback (around line 897). Add a fetch for synced models inside it, after the existing `setModelMeta(...)` call. The full updated function:

```typescript
  const fetchProviderModelMeta = useCallback(async () => {
    if (isSearchProvider) return;
    try {
      const res = await fetch(`/api/provider-models?provider=${encodeURIComponent(providerId)}`, {
        cache: "no-store",
      });
      if (!res.ok) return;
      const data = await res.json();
      setModelMeta({
        customModels: data.models || [],
        modelCompatOverrides: data.modelCompatOverrides || [],
      });
      // Fetch synced available models for Gemini
      if (providerId === "gemini") {
        try {
          const syncRes = await fetch("/api/synced-available-models?provider=gemini", {
            cache: "no-store",
          });
          if (syncRes.ok) {
            const syncData = await syncRes.json();
            setSyncedAvailableModels(syncData.models || []);
          }
        } catch {
          // Non-critical
        }
      }
    } catch (e) {
      console.error("fetchProviderModelMeta", e);
    }
  }, [providerId, isSearchProvider]);
```

- [ ] **Step 2: Create API endpoint for synced available models**

Create file: `src/app/api/synced-available-models/route.ts`

```typescript
import { getSyncedAvailableModels, getAllSyncedAvailableModels } from "@/lib/db/models";
import { isAuthenticated } from "@/shared/utils/apiAuth";

/**
 * GET /api/synced-available-models?provider=<id>
 * List synced available models for a provider (or all providers).
 */
export async function GET(request: Request) {
  try {
    if (!(await isAuthenticated(request))) {
      return Response.json(
        { error: { message: "Authentication required", type: "invalid_api_key" } },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const provider = searchParams.get("provider");

    if (provider) {
      const models = await getSyncedAvailableModels(provider);
      return Response.json({ models });
    }

    const allModels = await getAllSyncedAvailableModels();
    return Response.json(allModels);
  } catch {
    return Response.json(
      { error: { message: "Failed to fetch synced available models", type: "server_error" } },
      { status: 500 }
    );
  }
}
```

- [ ] **Step 3: Update "Available Models" rendering for Gemini**

Find the line `const models = getModelsByProviderId(providerId);` (line 876). After it, add logic to override for Gemini:

```typescript
  const registryModels = getModelsByProviderId(providerId);
  // For Gemini: use synced API models if available, otherwise fall back to registry
  const models = providerId === "gemini" && syncedAvailableModels.length > 0
    ? syncedAvailableModels
    : registryModels;
```

Note: `models` is currently declared with `const`. Replace the original `const models = getModelsByProviderId(providerId);` with this two-liner.

- [ ] **Step 4: Hide "Custom Models" section for Gemini**

Find the Custom Models rendering block (around line 2434):

```typescript
          {/* Custom Models — available for providers without managed available-model metadata */}
          {!isManagedAvailableModelsProvider && (
            <CustomModelsSection
```

Change the condition to also exclude Gemini:

```typescript
          {/* Custom Models — available for providers without managed available-model metadata */}
          {!isManagedAvailableModelsProvider && providerId !== "gemini" && (
            <CustomModelsSection
```

- [ ] **Step 5: Build to verify no type errors**

Run: `npx tsc --noEmit --pretty 2>&1 | grep -i "page.tsx\|synced-available" | head -10`
Expected: No errors related to modified files.

- [ ] **Step 6: Commit**

```bash
git add src/app/(dashboard)/dashboard/providers/\[id\]/page.tsx src/app/api/synced-available-models/route.ts
git commit -m "feat(dashboard): Gemini Available Models reads from API sync, hide Custom Models"
```

---

### Task 5: Update catalog and v1beta to read from synced models

**Files:**
- Modify: `src/app/api/v1/models/catalog.ts`
- Modify: `src/app/api/v1beta/models/route.ts`

- [ ] **Step 1: Update catalog to read synced models for Gemini**

In `src/app/api/v1/models/catalog.ts`, add import at the top:

```typescript
import { getSyncedAvailableModels } from "@/lib/db/models";
```

In the custom models section (where we previously added `context_length`), find the Gemini-specific models in the built-in section. The built-in models come from `PROVIDER_MODELS` which includes the hardcoded registry. For Gemini, we need to replace those with synced models.

Find the built-in models loop (around line 241-295):

```typescript
    for (const [alias, providerModels] of Object.entries(PROVIDER_MODELS)) {
```

Inside this loop, after the line `const defaultContextLength = registryEntry?.defaultContextLength;` (line 255), add a check for Gemini to skip the hardcoded models and use synced ones instead:

```typescript
        // Skip hardcoded Gemini models if synced models are available
        if (alias === "gemini") {
          try {
            const syncedModels = await getSyncedAvailableModels("gemini");
            if (syncedModels.length > 0) {
              for (const sm of syncedModels) {
                const aliasId = `gemini/${sm.id}`;
                if (getModelIsHidden("gemini", sm.id)) continue;
                models.push({
                  id: aliasId,
                  object: "model",
                  created: timestamp,
                  owned_by: "gemini",
                  permission: [],
                  root: sm.id,
                  parent: null,
                  ...(sm.inputTokenLimit ? { context_length: sm.inputTokenLimit } : {}),
                });
              }
              continue; // Skip hardcoded models for this provider
            }
          } catch {
            // Fall through to hardcoded models
          }
        }
```

- [ ] **Step 2: Update v1beta to prefer synced models for Gemini**

In `src/app/api/v1beta/models/route.ts`, update the custom models section to also check synced models. Find the custom models loop and before it, add synced models for Gemini:

After the built-in models loop, add:

```typescript
    // Gemini: replace hardcoded entries with synced models when available
    try {
      const syncedGeminiModels = await getSyncedAvailableModels("gemini");
      if (syncedGeminiModels.length > 0) {
        // Remove hardcoded gemini entries
        const geminiStart = models.findIndex((m: any) =>
          typeof m.name === "string" && m.name.startsWith("models/gemini/")
        );
        if (geminiStart !== -1) {
          let geminiEnd = geminiStart;
          while (geminiEnd < models.length && (models[geminiEnd] as any).name?.startsWith("models/gemini/")) {
            geminiEnd++;
          }
          models.splice(geminiStart, geminiEnd - geminiStart);
        }
        // Add synced models
        for (const m of syncedGeminiModels) {
          models.push({
            name: `models/gemini/${m.id}`,
            displayName: m.name || m.id,
            ...(typeof m.description === "string" ? { description: m.description } : {}),
            supportedGenerationMethods: ["generateContent"],
            inputTokenLimit: typeof m.inputTokenLimit === "number" ? m.inputTokenLimit : 128000,
            outputTokenLimit: typeof m.outputTokenLimit === "number" ? m.outputTokenLimit : 8192,
            ...(m.supportsThinking === true ? { thinking: true } : {}),
          });
        }
      }
    } catch {
      // Non-critical
    }
```

- [ ] **Step 3: Build to verify no type errors**

Run: `npx tsc --noEmit --pretty 2>&1 | grep -i "catalog\|v1beta" | head -10`
Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add src/app/api/v1/models/catalog.ts src/app/api/v1beta/models/route.ts
git commit -m "feat(api): catalog and v1beta read from synced Gemini models"
```

---

### Task 6: Build, smoke test, and cleanup

- [ ] **Step 1: Full production build**

Run: `npm run build 2>&1 | tail -10`
Expected: Build succeeds with no errors.

- [ ] **Step 2: Restart the production server**

```bash
fuser -k 20130/tcp 2>/dev/null; sleep 2
PORT=20130 DASHBOARD_PORT=20130 npm run start &
sleep 5
curl -s -o /dev/null -w "%{http_code}" http://localhost:20130
```
Expected: Server responds.

- [ ] **Step 3: Trigger sync and verify Available Models**

Login and trigger a model sync for the Gemini connection:

```bash
curl -s -c /tmp/test-cookies.txt http://localhost:20130/api/auth/login -H "Content-Type: application/json" -d '{"password":"CHANGEME"}'
# Find the gemini connection ID
CONN_ID=$(curl -s -b /tmp/test-cookies.txt http://localhost:20130/api/providers | python3 -c "import json,sys; conns=json.load(sys.stdin).get('connections',[]); gemini=[c for c in conns if c.get('provider')=='gemini']; print(gemini[0]['id'] if gemini else '')")
echo "Connection: $CONN_ID"
# Trigger sync
curl -s -b /tmp/test-cookies.txt -X POST "http://localhost:20130/api/providers/$CONN_ID/sync-models" | python3 -c "import json,sys; d=json.load(sys.stdin); print(f'Synced: {d.get(\"syncedModels\",0)} models')"
```

Then verify the synced available models endpoint:

```bash
curl -s -b /tmp/test-cookies.txt "http://localhost:20130/api/synced-available-models?provider=gemini" | python3 -c "
import json,sys
data = json.load(sys.stdin)
models = data.get('models',[])
print(f'Synced available models: {len(models)}')
for m in models[:3]:
    print(f'  {m[\"id\"]}: endpoints={m.get(\"supportedEndpoints\")}, input={m.get(\"inputTokenLimit\")}')
"
```

- [ ] **Step 4: Verify v1beta shows real limits**

```bash
curl -s -b /tmp/test-cookies.txt http://localhost:20130/api/v1beta/models | python3 -c "
import json,sys
data = json.load(sys.stdin)
models = data.get('models',[])
gemini = [m for m in models if 'gemini/' in m.get('name','')]
print(f'Gemini models in v1beta: {len(gemini)}')
real = [m for m in gemini if m.get('inputTokenLimit') != 128000]
print(f'With real limits: {len(real)}')
for m in real[:3]:
    print(f'  {m[\"name\"]}: input={m[\"inputTokenLimit\"]}, output={m[\"outputTokenLimit\"]}')
"
```

Expected: Gemini models show real token limits from the API, not hardcoded 128000/8192.

- [ ] **Step 5: Commit any fixes**

```bash
git add -A
git commit -m "fix: smoke test fixes"
```
