---
title: "Internal API Routes Reference"
version: 3.8.16
lastUpdated: 2026-06-08
---

# Internal API Routes Reference

> **TL;DR**: Beyond the public `/v1/*` OpenAI-compatible routes, OmniRoute exposes **~488 internal routes** for management, settings, webhooks, CLI tools, and admin operations. This is the reference.

**Source:** `src/app/api/**/route.ts` (~53 route.ts files, 488 total routes with dynamic segments)

**Related:**

- [API_REFERENCE.md](./API_REFERENCE.md) — public `/v1/*` routes
- [BACKUP_RESTORE.md](../ops/BACKUP_RESTORE.md) — `/api/db-backups` routes

---

## Auth Levels

Internal routes use 3 auth levels:

| Level          | Header                                       | Use case                            |
| -------------- | -------------------------------------------- | ----------------------------------- |
| **Public**     | None (or `Authorization: Bearer <user-key>`) | Most routes — user API key required |
| **Management** | `Authorization: Bearer $MANAGEMENT_KEY`      | Admin/operations (backup, settings) |
| **Service**    | `X-Service-Token: $SERVICE_TOKEN`            | Internal service-to-service         |

Management routes return `403` if the key lacks the `admin` scope.

---

## Admin & Database Routes

### Backup & Restore

| Method | Path                        | Description                    |
| ------ | --------------------------- | ------------------------------ |
| GET    | `/api/db-backups`           | List auto-backups + status     |
| PUT    | `/api/db-backups`           | Create new backup              |
| POST   | `/api/db-backups`           | Restore from backup            |
| GET    | `/api/db-backups/export`    | Export as JSON                 |
| POST   | `/api/db-backups/import`    | Import from JSON               |
| GET    | `/api/db-backups/exportAll` | Export all data (unrestricted) |

### Database Health

| Method | Path             | Description                        |
| ------ | ---------------- | ---------------------------------- |
| GET    | `/api/db/health` | DB integrity + FK + artifact check |

### Database Settings

| Method | Path                                   | Description                   |
| ------ | -------------------------------------- | ----------------------------- |
| GET    | `/api/settings/database`               | Database config + stats       |
| POST   | `/api/settings/database/refresh-stats` | Refresh DB statistics         |
| POST   | `/api/settings/database/vacuum`        | Run `VACUUM` to reclaim space |

### Pricing

| Method | Path                    | Description          |
| ------ | ----------------------- | -------------------- |
| GET    | `/api/pricing`          | Pricing config       |
| GET    | `/api/pricing/defaults` | Default pricing      |
| GET    | `/api/pricing/models`   | Model pricing        |
| POST   | `/api/pricing/sync`     | Trigger pricing sync |

### Cache

| Method | Path                          | Description                    |
| ------ | ----------------------------- | ------------------------------ |
| GET    | `/api/settings/cache-config`  | Cache config                   |
| GET    | `/api/settings/cache-metrics` | Cache metrics                  |
| GET    | `/api/cache/stats`            | Hit/miss/eviction by namespace |

See [API_REFERENCE.md](./API_REFERENCE.md) for full schema details.

---

## Settings Routes (`/api/settings/*`)

### Per-Scope Settings

| Method | Path            | Description  |
| ------ | --------------- | ------------ |
| GET    | `/api/settings` | All settings |

### Compression

| Method | Path                                    | Description             |
| ------ | --------------------------------------- | ----------------------- |
| GET    | `/api/settings/compression`             | Compression config      |
| PATCH  | `/api/settings/compression`             | Update config           |
| GET    | `/api/settings/compression/combos`      | List compression combos |
| POST   | `/api/settings/compression/combos`      | Create combo            |
| PATCH  | `/api/settings/compression/combos/[id]` | Update combo            |
| DELETE | `/api/settings/compression/combos/[id]` | Delete combo            |

See [WEBHOOKS.md](../frameworks/WEBHOOKS.md) for webhook CRUD, delivery logs, and supported events.

---

## Skills Routes (`/api/skills/*`)

### CRUD

| Method | Path                              | Description                         |
| ------ | --------------------------------- | ----------------------------------- |
| GET    | `/api/skills`                     | List installed skills               |
| POST   | `/api/skills/install`             | Install from marketplace            |
| DELETE | `/api/skills/[id]`                | Uninstall                           |
| GET    | `/api/skills/[id]`                | Get skill details                   |
| GET    | `/api/skills/executions`          | Execution history                   |
| GET    | `/api/skills/marketplace`         | Browse skill marketplace            |
| POST   | `/api/skills/marketplace/install` | Install from marketplace (alt path) |

See [SKILLS.md](../frameworks/SKILLS.md) for skill framework details.

---

## Agent Skills Routes (`/api/agent-skills/*`)

| Method | Path                             | Description         |
| ------ | -------------------------------- | ------------------- |
| GET    | `/api/agent-skills`              | List agent skills   |
| POST   | `/api/agent-skills`              | Create custom skill |
| GET    | `/api/agent-skills/[id]`         | Get skill manifest  |
| PATCH  | `/api/agent-skills/[id]`         | Update skill        |
| DELETE | `/api/agent-skills/[id]`         | Delete skill        |
| POST   | `/api/agent-skills/[id]/execute` | Run skill           |
| GET    | `/api/agent-skills/[id]/history` | Execution history   |
| POST   | `/api/agent-skills/[id]/test`    | Test mode (dry run) |

See [AGENT-SKILLS.md](../frameworks/AGENT-SKILLS.md).

---

## Memory Routes (`/api/memory/*`)

| Method | Path               | Description   |
| ------ | ------------------ | ------------- |
| GET    | `/api/memory`      | List memories |
| POST   | `/api/memory`      | Create memory |
| GET    | `/api/memory/[id]` | Get memory    |
| PATCH  | `/api/memory/[id]` | Update memory |
| DELETE | `/api/memory/[id]` | Delete memory |

See [MEMORY.md](../frameworks/MEMORY.md).

---

---

## ACP Routes (`/api/acp/*`)

| GET | `/api/acp/agents` | List available CLI agents + their installation status |
| POST | `/api/acp/agents` | Register a custom ACP agent |
| DELETE | `/api/acp/agents` | Delete a custom ACP agent |

> ACP sessions are **in-memory** (managed by `src/lib/acp/manager.ts`), not exposed over HTTP. No `/api/acp/sessions/*` or `/api/acp/spawn` endpoints exist.

See [ACP.md](../frameworks/ACP.md) and [ACP_INTEGRATION.md](../frameworks/ACP_INTEGRATION.md).

---

## Cloud Agent Routes (`/api/v1/agents/*`)

Cloud agent task management is at `/api/v1/agents/`, not `/api/cloud/*`.

| Method | Path                         | Description                                                    |
| ------ | ---------------------------- | -------------------------------------------------------------- |
| GET    | `/api/v1/agents/tasks`       | List cloud agent tasks (filter: provider, status, limit ≤ 500) |
| POST   | `/api/v1/agents/tasks`       | Create task (dispatch to upstream provider + persist)          |
| GET    | `/api/v1/agents/tasks/[id]`  | Get task + lazy-sync status from upstream                      |
| POST   | `/api/v1/agents/tasks/[id]`  | Action: `approve` / `message` / `cancel`                       |
| DELETE | `/api/v1/agents/tasks/[id]`  | Delete task by ID                                              |
| GET    | `/api/v1/agents/credentials` | List cloud agent credentials (metadata only)                   |

> The `/api/cloud/*` routes are **limited to auth, credentials/update, models/alias, model/resolve only**.
> These are internal helper endpoints, not the main Cloud Agent API.

See [CLOUD_AGENT.md](../frameworks/CLOUD_AGENT.md).

---

## Files API (`/api/files/*`)

See [FILES_API.md](./FILES_API.md) (when published).

| Method | Path                      | Description           |
| ------ | ------------------------- | --------------------- |
| GET    | `/api/files`              | List files            |
| GET    | `/api/files/[id]/content` | Download file content |

---

## Batches API (`/api/batches/*`)

See [BATCHES_API.md](./BATCHES_API.md) (when published).

| Method | Path                | Description  |
| ------ | ------------------- | ------------ |
| GET    | `/api/batches`      | List batches |
| GET    | `/api/batches/[id]` | Batch detail |

---

## Monitoring Routes (`/api/monitoring/*`)

| Method | Path                     | Description            |
| ------ | ------------------------ | ---------------------- |
| GET    | `/api/monitoring/health` | System health snapshot |

See [MONITORING_GUIDE.md](../ops/MONITORING_GUIDE.md) for full details.

## Compression Routes (`/api/compression/*`)

> **Note:** Compression endpoints live under `/api/settings/compression/*` (documented in [Settings > Compression](#compression) above) and at `/api/compression/*`. The previously documented `/api/context/caveman` and `/api/context/rtk` routes were fabricated and do not exist.

## Compliance Routes (`/api/compliance/*`)

| Method | Path                        | Description       |
| ------ | --------------------------- | ----------------- |
| GET    | `/api/compliance/audit-log` | Audit log entries |

See [COMPLIANCE.md](../security/COMPLIANCE.md).

---

## A2A Routes (`/api/a2a/*`)

| Method | Path                         | Description           |
| ------ | ---------------------------- | --------------------- |
| POST   | `/api/a2a`                   | JSON-RPC 2.0 endpoint |
| GET    | `/api/a2a/status`            | A2A status            |
| GET    | `/api/a2a/tasks`             | List A2A tasks        |
| GET    | `/api/a2a/tasks/[id]`        | Task detail           |
| POST   | `/api/a2a/tasks/[id]/cancel` | Cancel task           |

See [A2A-SERVER.md](../frameworks/A2A-SERVER.md).

---

## MCP Server Routes

See [MCP-SERVER.md](../frameworks/MCP-SERVER.md) — 3 transports, 30+ tools, 13 scopes.

| Method | Path                    | Description               |
| ------ | ----------------------- | ------------------------- |
| POST   | `/api/mcp/stream`       | Streamable HTTP transport |
| GET    | `/api/mcp/sse`          | SSE transport             |
| GET    | `/.well-known/mcp.json` | Server metadata           |

---

## Usage Routes

---

## Common Patterns

### Pagination

All list endpoints support `?limit=N&offset=M`:

```bash
GET /api/plugins?limit=50&offset=100
```

Response includes:

```json
{
  "items": [...],
  "total": 1234,
  "limit": 50,
  "offset": 100
}
```

### Filtering

Most list endpoints accept filter params:

```bash
GET /api/usage?provider=openai&range=7d&apiKeyId=key-123
GET /api/webhooks?event=request.completed&enabled=true
```

### Error Format

Errors return a consistent shape:

```json
{
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "Plugin 'foo' not found",
    "details": { "id": "foo" }
  }
}
```

Common codes:

- `400` — `VALIDATION_ERROR`
- `401` — `UNAUTHORIZED`
- `403` — `FORBIDDEN` (insufficient scope)
- `404` — `RESOURCE_NOT_FOUND`
- `409` — `CONFLICT` (duplicate, etc.)
- `429` — `RATE_LIMITED`
- `500` — `INTERNAL_ERROR`
- `503` — `SERVICE_UNAVAILABLE`

### Rate Limiting

Internal routes are rate-limited per-API-key:

- Default: 100 requests / 60s / key
- Configurable per-key in `apiKeys` table
- Returns `429` with `Retry-After` header

---

## See Also

- [API_REFERENCE.md](./API_REFERENCE.md) — public routes
- [BACKUP_RESTORE.md](../ops/BACKUP_RESTORE.md) — backup API
- [DATABASE_GUIDE.md](../ops/DATABASE_GUIDE.md) — DB operations
- [MONITORING_GUIDE.md](../ops/MONITORING_GUIDE.md) — monitoring API
- Source: `src/app/api/**/route.ts`
