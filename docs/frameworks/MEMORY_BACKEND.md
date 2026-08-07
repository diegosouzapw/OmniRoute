---
title: "MemoryBackend Provider Pattern"
version: 3.8.49
lastUpdated: 2026-07-28
---

# MemoryBackend Provider Pattern

> **Source of truth:** `src/lib/memory/backend.ts`, `src/lib/memory/genericBackend.ts`, `src/lib/memory/manager.ts`
> **Tests:** `src/lib/memory/__tests__/generic-backend.test.ts`

The MemoryBackend provider pattern introduces a **pluggable backend abstraction layer** over the existing memory engine. Instead of being tied to a single storage implementation, the memory system now supports multiple backends (SQLite, Obsidian, Notion, custom HTTP backends) with configurable primary/fallback routing.

## Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    API Routes                             │
│            (src/app/api/memory/route.ts)                  │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│                   MemoryManager                           │
│           Singleton orchestrator (manager.ts)             │
│                                                          │
│  Primary ──► Backend A  (e.g. SQLite)                    │
│  Fallback ─► Backend B  (e.g. Obsidian)                  │
│             Backend C  (e.g. Notion via GenericBackend)   │
└──────────────────────┬───────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌──────────────────┐
│ SQLite     │ │ Obsidian   │ │ GenericMemory    │
│ Backend    │ │ Backend    │ │ Backend (HTTP)   │
└────────────┘ └────────────┘ └──────────────────┘
```

### Core Interface (`backend.ts`)

Every backend must implement the `MemoryBackend` interface:

```typescript
interface MemoryBackend {
  readonly id: string;
  readonly displayName: string;

  // CRUD
  create(input: CreateMemoryInput): Promise<Memory>;
  get(id: string): Promise<Memory | null>;
  update(id: string, updates: Partial<...>): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  list(filter: MemoryFilter): Promise<{ data: Memory[]; total: number; byType: Record<string, number> }>;

  // Search
  search(config: SearchConfig): Promise<Memory[]>;

  // Health
  health(): Promise<HealthCheckResult>;

  // Lifecycle (optional)
  initialize?(): Promise<void>;
  shutdown?(): Promise<void>;
}
```

### MemoryManager (`manager.ts`)

Singleton orchestrator that:

- **Registers** backends via `register(backend)` — called at boot from `index.ts`
- **Configures** primary + fallback via `configure(primary, fallbacks)`
- **Routes** CRUD/search to the primary, with fallback chain on failure
- **Health checks** all backends periodically

**Fallback behavior:**

| Operation | Primary              | Fallbacks               |
| --------- | -------------------- | ----------------------- |
| `create`  | ✅ Primary only      | ❌                      |
| `get`     | ✅ Try primary first | ✅ Fallback if null     |
| `update`  | ✅ Primary only      | ✅ Fire-and-forget sync |
| `delete`  | ✅ Primary only      | ✅ Fire-and-forget sync |
| `list`    | ✅ Primary only      | ❌                      |
| `search`  | ✅ Primary first     | ✅ Fallback on error    |

### GenericMemoryBackend (`genericBackend.ts`)

A generic HTTP connector that adapts any REST API into a MemoryBackend. Useful for:

- **Notion** — connect via Notion API
- **Obsidian** — connect via Obsidian Local REST API
- **Custom backends** — any service that exposes a RESTful memory API

**Configuration:**

```typescript
interface GenericBackendConfig {
  baseUrl: string;           // Base URL of the backend API
  apiKey?: string;           // Bearer token for auth
  headers?: Record<string, string>;  // Custom HTTP headers
  timeout?: number;          // Request timeout (default: 30000ms)
  backendType?: string;      // For logging

  // Endpoint overrides (defaults use REST conventions)
  endpoints?: {
    search?: string;   // default: "/memories/search"
    create?: string;   // default: "/memories"
    list?: string;     // default: "/memories"
    get?: string;      // default: "/memories/{id}"
    update?: string;   // default: "/memories/{id}"
    delete?: string;   // default: "/memories/{id}"
    health?: string;   // default: "/health"
  };

  // Query parameter name mappings
  queryParams?: {
    query?/apiKeyId?/limit?/offset?/strategy?/maxTokens?/type?/sessionId?/orderBy?/orderDir?/options?
  };

  // Path parameter name mappings
  pathParams?: {
    id?/memoryId?
  };
}
```

**Known backends** are pre-configured in `KNOWN_BACKENDS`:

```typescript
createKnownBackend("obsidian"); // → GenericMemoryBackend pointed at localhost:27123
createKnownBackend("notion"); // → GenericMemoryBackend pointed at api.notion.com/v1
```

### Built-in Backends

#### SQLiteBackend (`sqliteBackend.ts`)

The default primary backend. Wraps the existing SQLite-based memory store using `src/lib/memory/store.ts`. Automatically registered at boot.

```typescript
import { sqliteBackend } from "./sqliteBackend";
memoryManager.register(sqliteBackend);
```

#### ObsidianBackend (`obsidianBackend.ts`)

Wraps the existing Obsidian integration (`src/lib/memory/obsidianBackend.ts`). Connects to an Obsidian vault via the Obsidian Local REST API.

## Settings

Memory backend settings are stored in the app settings table and managed via `src/lib/memory/settings.ts`:

| Setting           | Env/Config Key           | Default    | Description                  |
| ----------------- | ------------------------ | ---------- | ---------------------------- |
| Primary backend   | `memoryPrimaryBackend`   | `"sqlite"` | ID of the primary backend    |
| Fallback backends | `memoryFallbackBackends` | `[]`       | Ordered fallback backend IDs |
| Backend configs   | `memoryBackendConfigs`   | `{}`       | Per-backend config overrides |

Settings are normalized via `normalizeMemorySettings()` and cached at `getMemorySettings()`.

## Initialization Flow

```
App bootstrap
  → index.ts imports (side-effect): registers SQLiteBackend
  → initMemoryBackends() called from app lifecycle:
      1. Load settings (getMemorySettings)
      2. Configure primary + fallback
      3. Initialize all backends (health check)
      4. Ready for requests
```

## Adding a New Backend

1. **Implement `MemoryBackend`** interface in `src/lib/memory/<name>Backend.ts`
2. **Export** from `src/lib/memory/index.ts`
3. **Register** with `memoryManager.register(yourBackend)` at boot
4. **Configure** via settings: set `memoryPrimaryBackend` to your backend ID
5. **Test** with `src/lib/memory/__tests__/generic-backend.test.ts` as reference

### Example: Brain Backend

```typescript
import { createGenericMemoryBackend } from "./genericBackend";

const brainBackend = createGenericMemoryBackend("brain", "BK-Brain", {
  baseUrl: process.env.BRAIN_API_URL || "http://localhost:9099",
  apiKey: process.env.BRAIN_API_KEY,
  endpoints: {
    search: "/api/memory/search",
    create: "/api/memory",
    health: "/api/health",
  },
});

memoryManager.register(brainBackend);
```

## Verification

### Unit tests

```bash
npx vitest run src/lib/memory/__tests__/generic-backend.test.ts --reporter=verbose
```

Expected output: **26 tests, all passing** covering:

- Constructor (2)
- Health check (4) — success, failure 500, network error, latency
- Initialize (2) — success, failure
- Create (2) — default endpoint, custom endpoint
- Get (4) — success, 404 → null, non-404 throw, custom path params
- Update (2) — success, 404 → false
- Delete (2) — success, 404 → false
- List (2) — query params, custom param names
- Search (3) — query params, custom endpoint, options serialization
- Auth headers (2) — Bearer token, custom headers
- Factory (1)

### Type check

```bash
npm run typecheck:core
```

Expected: **0 errors**.
