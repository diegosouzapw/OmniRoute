# Database Schema & Operations Guide (ਪੰਜਾਬੀ)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **ਸੰਖੇਪ**: OmniRoute ਆਪਣੇ ਮੁੱਖ ਸਟੋਰ ਵਜੋਂ **WAL ਜਰਨਲਿੰਗ ਵਾਲੇ SQLite** ਦੀ ਵਰਤੋਂ ਕਰਦਾ ਹੈ ਅਤੇ ਸੰਵੇਦਨਸ਼ੀਲ ਫ਼ੀਲਡਾਂ ਲਈ ਸਟੋਰ ਕੀਤੇ ਡਾਟੇ ਨੂੰ **AES-256-GCM** ਨਾਲ ਇਨਕ੍ਰਿਪਟ ਕਰਦਾ ਹੈ। ਇਹ ਗਾਈਡ ਸਕੀਮਾ, ਮਾਈਗ੍ਰੇਸ਼ਨਾਂ, ਬੈਕਅੱਪ/ਰਿਕਵਰੀ ਅਤੇ ਕਾਰਜਕਾਰੀ ਰਨਬੁੱਕਾਂ ਨੂੰ ਕਵਰ ਕਰਦੀ ਹੈ।

**ਸਰੋਤ:**

- `src/lib/db/core.ts` — ਸਿੰਗਲਟਨ + SCHEMA_SQL (17 ਮੂਲ ਟੇਬਲਾਂ)
- `src/lib/db/migrationRunner.ts` — ਵਰਜ਼ਨ ਕੀਤੀਆਂ ਮਾਈਗ੍ਰੇਸ਼ਨਾਂ
- `src/lib/db/migrations/` — 167 ਵਰਜ਼ਨ ਕੀਤੀਆਂ SQL ਫ਼ਾਈਲਾਂ
- `src/lib/db/encryption.ts` — ਇਨਕ੍ਰਿਪਸ਼ਨ ਸਹਾਇਕ
- `src/lib/db/backup.ts` — ਬੈਕਅੱਪ ਐਕਸਪੋਰਟ/ਇੰਪੋਰਟ
- `src/lib/db/healthCheck.ts` — ਸਿਹਤ ਨਿਦਾਨ

---

## SQLite ਕਿਉਂ?

OmniRoute ਨੇ ਕਈ ਕਾਰਨਾਂ ਕਰਕੇ PostgreSQL/MySQL ਦੀ ਥਾਂ SQLite ਨੂੰ ਚੁਣਿਆ:

| ਕਾਰਕ               | SQLite                                | PostgreSQL                         |
| ------------------ | ------------------------------------- | ---------------------------------- |
| **ਡਿਪਲੌਇਮੈਂਟ**     | ਏਮਬੈੱਡਡ — ਵੱਖਰੇ ਸਰਵਰ ਦੀ ਲੋੜ ਨਹੀਂ      | ਸਰਵਰ ਸੈੱਟਅੱਪ ਦੀ ਲੋੜ                |
| **ਇਨਕ੍ਰਿਪਸ਼ਨ**     | ਐਪਲੀਕੇਸ਼ਨ-ਲੇਅਰ (AES-256-GCM)          | ਬਿਲਟ-ਇਨ TDE                        |
| **ਕਾਰਗੁਜ਼ਾਰੀ**     | ਛੋਟੇ/ਦਰਮਿਆਨੇ ਵਰਕਲੋਡਾਂ ਲਈ ਵਧੇਰੇ ਤੇਜ਼   | ਬਹੁਤ ਵੱਡੀਆਂ ਸਮਕਾਲੀ ਰਾਈਟਾਂ ਲਈ ਬਿਹਤਰ |
| **ਸਮਕਾਲੀਤਾ**       | WAL ਮੋਡ ਸਮਕਾਲੀ ਰੀਡਾਂ ਦੀ ਆਗਿਆ ਦਿੰਦਾ ਹੈ | ਪੂਰਾ MVCC                          |
| **ਬੈਕਅੱਪ**         | ਇੱਕੋ ਫ਼ਾਈਲ ਦੀ ਕਾਪੀ                    | `pg_dump` ਜਾਂ ਫ਼ਾਈਲਸਿਸਟਮ ਸਨੈਪਸ਼ਾਟ  |
| **ਵਰਤੋਂ ਦਾ ਮਾਮਲਾ** | ਪ੍ਰਤੀ-ਉਪਭੋਗਤਾ ਇੰਸਟਾਲ, ਏਮਬੈੱਡਡ         | ਮਲਟੀ-ਟੈਨੈਂਟ SaaS                   |

**ਇੱਕ-ਉਪਭੋਗਤਾ, ਇੱਕ-ਇੰਸਟੈਂਸ** ਡਿਪਲੌਇਮੈਂਟਾਂ (OmniRoute ਦੀ ਮੁੱਖ ਵਰਤੋਂ) ਲਈ SQLite ਵਧੇਰੇ ਸਰਲ ਅਤੇ ਤੇਜ਼ ਹੈ।

### WAL ਜਰਨਲਿੰਗ

`core.ts` ਡਾਟਾਬੇਸ ਨੂੰ **WAL (Write-Ahead Logging) ਮੋਡ** ਵਿੱਚ ਖੋਲ੍ਹਦਾ ਹੈ:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL ਰਾਈਟਾਂ ਦੌਰਾਨ **ਸਮਕਾਲੀ ਰੀਡਾਂ** ਦੀ ਆਗਿਆ ਦਿੰਦਾ ਹੈ — ਇਹ ਡੈਸ਼ਬੋਰਡ ਲਈ ਮਹੱਤਵਪੂਰਨ ਹੈ, ਜੋ ਬੇਨਤੀਆਂ ਰਿਕਾਰਡ ਕੀਤੇ ਜਾਣ ਦੌਰਾਨ ਕਵੇਰੀਆਂ ਚਲਾਉਂਦਾ ਹੈ।

ਡਿਫੌਲਟ ਕੈਸ਼ ਆਕਾਰ **65,536 KiB (64 MiB)** ਹੈ। SQLite ਰਿਣਾਤਮਕ
`cache_size` ਨੂੰ KiB ਵਿੱਚ ਇੱਕ ਅਨੁਮਾਨਿਤ ਉੱਪਰੀ ਸੀਮਾ ਵਜੋਂ ਸਮਝਦਾ ਹੈ ਅਤੇ ਲੋੜ ਅਨੁਸਾਰ ਪੇਜ ਨਿਰਧਾਰਤ ਕਰਦਾ ਹੈ।
**ਸੈਟਿੰਗਾਂ > ਸਿਸਟਮ ਅਤੇ ਸਟੋਰੇਜ > ਕੈਸ਼ ਆਕਾਰ** **1 ਤੋਂ
1,000,000 KiB** ਤੱਕ ਦੇ ਪੂਰਨ ਅੰਕ ਸਵੀਕਾਰ ਕਰਦਾ ਹੈ; ਸੈਟਿੰਗ ਨੂੰ ਸੇਵ ਕਰਨ ਨਾਲ ਇਹ ਚਾਲੂ ਡਾਟਾਬੇਸ ਕਨੈਕਸ਼ਨ ਉੱਤੇ ਲਾਗੂ ਹੋ ਜਾਂਦੀ ਹੈ,
ਅਤੇ OmniRoute ਸਟਾਰਟਅੱਪ ਵੇਲੇ ਸੰਭਾਲੇ ਹੋਏ ਮੁੱਲ ਨੂੰ ਮੁੜ ਬਹਾਲ ਕਰਦਾ ਹੈ।

---

## ਡਾਟਾਬੇਸ ਦਾ ਟਿਕਾਣਾ

SQLite ਫ਼ਾਈਲ ਇੱਥੇ ਸਟੋਰ ਕੀਤੀ ਜਾਂਦੀ ਹੈ:

| OS      | ਪਾਥ                                                           |
| ------- | ------------------------------------------------------------- |
| Linux   | `~/.omniroute/storage.sqlite`                                 |
| macOS   | `~/.omniroute/storage.sqlite`                                 |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                     |
| Docker  | `/app/data/storage.sqlite` (`DATA_DIR` ਰਾਹੀਂ ਕਨਫ਼ਿਗਰ ਕਰਨ ਯੋਗ) |

ਸਹਾਇਕ ਫ਼ਾਈਲਾਂ:

- `storage.sqlite-wal` — ਰਾਈਟ-ਅਹੈੱਡ ਲੌਗ
- `storage.sqlite-shm` — ਸਾਂਝੀ ਮੈਮੋਰੀ ਫ਼ਾਈਲ
- `call_logs/` — ਬੇਨਤੀ ਪੇਲੋਡ ਆਰਟੀਫੈਕਟ (ਜੇ ਸਮਰੱਥ ਕੀਤਾ ਹੋਵੇ)

**ਟਿਕਾਣਾ ਓਵਰਰਾਈਡ ਕਰੋ:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## ਡੋਮੇਨ ਮੋਡੀਊਲ ਆਰਕੀਟੈਕਚਰ

OmniRoute ਦੇ ਡੇਟਾਬੇਸ ਵਿੱਚ `src/lib/db/` ਅੰਦਰ **110 ਸਿਖਰ-ਪੱਧਰੀ TypeScript ਮੋਡੀਊਲ** ਹਨ। ਹਰ ਡੋਮੇਨ ਮੋਡੀਊਲ:

- ਇੱਕ ਜਾਂ ਵੱਧ ਖ਼ਾਸ ਟੇਬਲਾਂ ਦਾ ਮਾਲਕ ਹੁੰਦਾ ਹੈ
- ਟਾਈਪ ਕੀਤੇ CRUD ਫੰਕਸ਼ਨ ਐਕਸਪੋਰਟ ਕਰਦਾ ਹੈ
- ਕਦੇ ਵੀ ਕਿਸੇ ਹੋਰ ਮੋਡੀਊਲ ਦੀਆਂ ਟੇਬਲਾਂ ਨੂੰ ਨਹੀਂ ਛੂੰਹਦਾ
- DB ਤੱਕ ਪਹੁੰਚ ਕਰਨ ਲਈ `core.ts` ਤੋਂ `getDbInstance()` ਦੀ ਵਰਤੋਂ ਕਰਦਾ ਹੈ

### 110 ਸਿਖਰ-ਪੱਧਰੀ DB ਮੋਡੀਊਲ

OmniRoute ਵਿੱਚ `src/lib/db/` ਅੰਦਰ **110 ਸਿਖਰ-ਪੱਧਰੀ TypeScript ਫ਼ਾਈਲਾਂ** ਹਨ। ਹੇਠਾਂ ਮੁੱਖ ਮੋਡੀਊਲਾਂ ਵਿੱਚੋਂ ਕੁਝ ਦਾ ਨਮੂਨਾ ਦਿੱਤਾ ਗਿਆ ਹੈ; ਪੂਰੀ ਸੂਚੀ ਲਈ ਡਾਇਰੈਕਟਰੀ ਸੂਚੀ ਵੇਖੋ:

| ਮੋਡੀਊਲ                  | ਟੇਬਲਾਂ                                                         | ਜ਼ਿੰਮੇਵਾਰੀ                                                    |
| ----------------------- | -------------------------------------------------------------- | ------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | OAuth/API ਕੁੰਜੀ ਪ੍ਰਦਾਤਾ ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਅਤੇ ਪ੍ਰਮਾਣ-ਪੱਤਰ           |
| `models.ts`             | `key_value` (ਮਾਡਲ ਡੇਟਾ)                                        | ਮਾਡਲ ਪਰਿਭਾਸ਼ਾਵਾਂ, ਸਮਰੱਥਾਵਾਂ, ਕੀਮਤ-ਨਿਰਧਾਰਨ                     |
| `combos.ts`             | `combos`                                                       | ਕੌਂਬੋ ਰਾਊਟਿੰਗ ਸੰਰਚਨਾਵਾਂ ਅਤੇ ਕ੍ਰਮ                              |
| `apiKeys.ts`            | `api_keys`                                                     | API ਕੁੰਜੀ ਜੀਵਨ-ਚੱਕਰ, ਸਕੋਪ ਅਤੇ ਕੋਟਾ ਟ੍ਰੈਕਿੰਗ                   |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | ਸਿਸਟਮ ਸੰਰਚਨਾ ਅਤੇ ਸਾਂਝਾ KV ਸਟੋਰ                                |
| `backup.ts`             | —                                                              | ਬੈਕਅੱਪ ਐਕਸਪੋਰਟ/ਇੰਪੋਰਟ ਕਾਰਵਾਈਆਂ                                |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | ਪ੍ਰੌਕਸੀ ਸੰਰਚਨਾਵਾਂ ਅਤੇ ਰਾਊਟਿੰਗ ਨਿਯਮ                            |
| `prompts.ts`            | `prompt_templates`                                             | ਮੁੜ ਵਰਤੋਂਯੋਗ ਪ੍ਰੌਮਪਟ ਟੈਂਪਲੇਟ ਅਤੇ ਵਰਜ਼ਨਿੰਗ                     |
| `webhooks.ts`           | `webhooks`                                                     | ਘਟਨਾ-ਚਾਲਿਤ ਵੈੱਬਹੁੱਕ ਸਬਸਕ੍ਰਿਪਸ਼ਨਾਂ ਅਤੇ ਲੌਗ                     |
| `detailedLogs.ts`       | `request_detail_logs`                                          | ਪ੍ਰਤੀ-ਬੇਨਤੀ ਆਡਿਟ ਲੌਗਿੰਗ (ਵਿਕਲਪਿਕ, ਵੱਡੀ ਮਾਤਰਾ)                 |
| `domainState.ts`        | `domain_*` (5 ਟੇਬਲਾਂ)                                          | ਡੋਮੇਨ ਬਜਟ, ਸਰਕਿਟ ਬ੍ਰੇਕਰ, ਲੌਕਆਊਟ, ਫਾਲਬੈਕ ਚੇਨਾਂ ਅਤੇ ਲਾਗਤ ਇਤਿਹਾਸ |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | MCP/A2A ਲਈ ਮਨਜ਼ੂਰਸ਼ੁਦਾ API ਕੁੰਜੀਆਂ                            |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | ਇਤਿਹਾਸਕ ਕੋਟਾ ਵਰਤੋਂ                                            |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | ਮਾਡਲਾਂ ਨੂੰ ਡਿਫਾਲਟ ਕੌਂਬੋ ਨਾਲ ਮੈਪ ਕਰਨਾ                          |
| `cliToolState.ts`       | `cli_tool_state`                                               | CLI-ਵਿਸ਼ੇਸ਼ ਸਥਾਈ ਸਥਿਤੀ                                        |
| `encryption.ts`         | —                                                              | ਫ਼ੀਲਡਾਂ ਨੂੰ ਐਨਕ੍ਰਿਪਟ/ਡੀਕ੍ਰਿਪਟ ਕਰਨ ਲਈ ਸਹਾਇਕ                    |
| `readCache.ts`          | —                                                              | ਵੱਧ ਪੜ੍ਹੀਆਂ ਜਾਣ ਵਾਲੀਆਂ ਕਾਰਵਾਈਆਂ ਲਈ ਇਨ-ਮੈਮਰੀ ਕੈਸ਼              |
| `secrets.ts`            | `key_value` (ਐਨਕ੍ਰਿਪਟ ਕੀਤੀਆਂ ਐਂਟਰੀਆਂ)                          | ਐਨਕ੍ਰਿਪਟ ਕੀਤੇ ਗੁਪਤ ਮੁੱਲਾਂ ਦੀ ਸਟੋਰੇਜ                           |
| `stateReset.ts`         | —                                                              | ਟੈਸਟਿੰਗ ਲਈ DB ਸਥਿਤੀ ਨੂੰ ਮਿਟਾਉਣਾ/ਰੀਸੈੱਟ ਕਰਨਾ                   |
| `contextHandoffs.ts`    | `context_handoffs`                                             | ਏਜੰਟ ਹੈਂਡਆਫ਼ ਲਈ ਸੈਸ਼ਨ ਸੰਦਰਭ                                   |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | ਵਰਤੋਂ ਟ੍ਰੈਕਿੰਗ                                                |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | ਕੰਪ੍ਰੈਸ਼ਨ ਸੰਰਚਨਾ                                              |

### ਮੋਡੀਊਲ ਸੀਮਾਵਾਂ

ਇੱਕ ਮੁੱਖ ਆਰਕੀਟੈਕਚਰ ਨਿਯਮ: **ਮੋਡੀਊਲ ਇੱਕ-ਦੂਜੇ ਦੀਆਂ ਟੇਬਲਾਂ ਤੱਕ ਸਿੱਧੀ ਪਹੁੰਚ ਨਹੀਂ ਕਰਦੇ**। ਕਿਸੇ ਹੋਰ ਮੋਡੀਊਲ ਦੇ ਡੇਟਾ ਨਾਲ ਕੰਮ ਕਰਨ ਲਈ, ਉਸ ਮੋਡੀਊਲ ਤੋਂ ਫੰਕਸ਼ਨ ਇੰਪੋਰਟ ਕਰੋ।

```ts
// ❌ ਗ਼ਲਤ: ਕਿਸੇ ਹੋਰ ਮੋਡੀਊਲ ਤੋਂ ਸਿੱਧੀ SQL
db.prepare("SELECT * FROM provider_connections").all();

// ✅ ਸਹੀ: providers ਮੋਡੀਊਲ ਦੇ ਫੰਕਸ਼ਨ ਦੀ ਵਰਤੋਂ ਕਰੋ
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

ਇਹ ਨਿਯਮ ਕੋਡ ਸਮੀਖਿਆ ਰਾਹੀਂ ਲਾਗੂ ਕੀਤਾ ਜਾਂਦਾ ਹੈ—ਕੋਈ ਸਥਿਰ ਜਾਂਚ ਨਹੀਂ ਹੈ, ਪਰ ਉਲੰਘਣਾਵਾਂ ਨੂੰ ਚਿੰਨ੍ਹਿਤ ਕੀਤਾ ਜਾਂਦਾ ਹੈ।

---

## ਬੇਸ ਸਕੀਮਾ (17 ਟੇਬਲਾਂ)

`core.ts`, `SCHEMA_SQL` ਵਿੱਚ 17 ਬੇਸ ਟੇਬਲਾਂ ਨੂੰ ਪਰਿਭਾਸ਼ਿਤ ਕਰਦੀ ਹੈ। ਇਹ ਮਾਈਗ੍ਰੇਸ਼ਨ `001_initial_schema.sql` ਦੁਆਰਾ ਬਣਾਈਆਂ ਜਾਂਦੀਆਂ ਹਨ ਅਤੇ ਮੁੱਖ ਸਕੀਮਾ ਦਾ ਆਧਾਰ ਬਣਦੀਆਂ ਹਨ।

### ਮੁੱਖ ਟੇਬਲਾਂ (ਸ਼ੁਰੂਆਤੀ ਮਾਈਗ੍ਰੇਸ਼ਨ ਵਿੱਚ ਬਣਾਈਆਂ ਗਈਆਂ)

| ਟੇਬਲ                       | ਉਦੇਸ਼                                  | ਮੁੱਖ ਕਾਲਮ                                                               |
| -------------------------- | -------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | ਪ੍ਰੋਵਾਈਡਰ ਕ੍ਰੈਡੈਂਸ਼ੀਅਲ (ਇਨਕ੍ਰਿਪਟ ਕੀਤੇ) | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | ਪ੍ਰੋਵਾਈਡਰ ਨੋਡ ਰਾਊਟਿੰਗ ਜਾਣਕਾਰੀ          | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | ਆਮ KV ਸਟੋਰ                             | `namespace`, `key`, `value`                                             |
| `combos`                   | ਰਾਊਟਿੰਗ ਕੰਬੋ ਪਰਿਭਾਸ਼ਾਵਾਂ               | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | ਗੇਟਵੇ ਲਈ API ਕੁੰਜੀਆਂ                   | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | ਡਾਟਾਬੇਸ ਮੈਟਾਡੇਟਾ                       | `key`, `value`                                                          |
| `usage_history`            | ਬੇਨਤੀ ਵਰਤੋਂ ਦੇ ਰਿਕਾਰਡ                  | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | ਬੇਨਤੀ ਪੇਲੋਡ ਅਤੇ ਜਵਾਬ                   | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | ਪ੍ਰੌਕਸੀ ਬੇਨਤੀ ਲੌਗ                      | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | ਮਾਡਲ-ਤੋਂ-ਪ੍ਰੋਵਾਈਡਰ ਚੇਨਾਂ               | `model`, `chain`                                                        |
| `domain_budgets`           | ਪ੍ਰਤੀ-ਡੋਮੇਨ ਖਰਚ ਬਜਟ                    | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | ਬਜਟ ਰੀਸੈੱਟ ਇਤਿਹਾਸ                      | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | ਪ੍ਰਤੀ-ਡੋਮੇਨ ਲਾਗਤ ਟ੍ਰੈਕਿੰਗ              | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | ਡੋਮੇਨ ਰੇਟ-ਲਿਮਿਟ ਸਥਿਤੀ                  | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | ਪ੍ਰਤੀ ਡੋਮੇਨ ਸਰਕਿਟ ਬ੍ਰੇਕਰ ਸਥਿਤੀ         | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | LLM ਜਵਾਬ ਕੈਸ਼                          | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | ਇਤਿਹਾਸਕ ਕੋਟਾ ਸਨੈਪਸ਼ਾਟ                  | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### ਵਾਧੂ ਟੇਬਲਾਂ (ਬਾਅਦ ਦੀਆਂ ਮਾਈਗ੍ਰੇਸ਼ਨਾਂ ਦੁਆਰਾ ਜੋੜੀਆਂ ਗਈਆਂ)

ਅਗਲੀਆਂ ਮਾਈਗ੍ਰੇਸ਼ਨਾਂ ਹੇਠ ਲਿਖੀਆਂ ਟੇਬਲਾਂ ਜੋੜਦੀਆਂ ਹਨ:

- `cli_tool_state` (ਮਾਈਗ੍ਰੇਸ਼ਨ 011) — CLI ਟੂਲ ਦੀ ਸਥਿਤੀ
- `mcp_*` ਟੇਬਲਾਂ — MCP ਸਰਵਰ ਆਡਿਟ
- `a2a_*` ਟੇਬਲਾਂ — A2A ਟਾਸਕ ਸਥਿਤੀ
- `usage_*` ਟੇਬਲਾਂ — ਵਰਤੋਂ ਟ੍ਰੈਕਿੰਗ
- `plugin_*` ਟੇਬਲਾਂ — ਪਲੱਗਇਨ ਸਿਸਟਮ
- `skill_executions` — ਸਕਿਲ ਐਗਜ਼ੀਕਿਊਸ਼ਨ ਇਤਿਹਾਸ
- `memory_*` ਟੇਬਲਾਂ — ਮੈਮੋਰੀ ਸਿਸਟਮ
- `compression_*` ਟੇਬਲਾਂ — ਕੰਪ੍ਰੈਸ਼ਨ ਸਿਸਟਮ
- `webhook_*` ਟੇਬਲਾਂ — ਵੈੱਬਹੁੱਕ ਡਿਲਿਵਰੀ ਲੌਗ
- `acp_*` ਟੇਬਲਾਂ — ਏਜੰਟ ਕਲਾਇੰਟ ਪ੍ਰੋਟੋਕੋਲ
- `oneproxy_*` ਟੇਬਲਾਂ — 1proxy ਮਾਰਕੀਟਪਲੇਸ
- `proxy_assignments` — ਪ੍ਰੌਕਸੀ ਸਕੋਪ ਬਾਈਂਡਿੰਗਾਂ
- `detailed_call_artifacts` — ਕਾਲ ਲੌਗ ਆਰਟੀਫੈਕਟਸ ਮੈਟਾਡੇਟਾ
- `quota_alert_history` — ਕੋਟਾ ਅਲਰਟ ਆਡਿਟ
- `command_code_auth_sessions` — Command Code OAuth ਸੈਸ਼ਨ

~30+ ਟੇਬਲਾਂ ਦੀ ਪੂਰੀ ਸੂਚੀ `src/lib/db/migrations/` ਵਿੱਚ ਹੈ।

---

## ਮਾਈਗ੍ਰੇਸ਼ਨਾਂ

OmniRoute `src/lib/db/migrations/` ਵਿੱਚ **ਵਰਜਨਬੱਧ, ਆਈਡੈਂਪੋਟੈਂਟ ਮਾਈਗ੍ਰੇਸ਼ਨਾਂ** ਦੀ ਵਰਤੋਂ ਕਰਦਾ ਹੈ। ਹਰ ਮਾਈਗ੍ਰੇਸ਼ਨ `NNN_description.sql` ਨਾਮ ਵਾਲੀ ਇੱਕੋ SQL ਫ਼ਾਈਲ ਹੁੰਦੀ ਹੈ।

### ਮਾਈਗ੍ਰੇਸ਼ਨ ਦਾ ਨਾਮਕਰਨ

```
001_initial_schema.sql
002_mcp_a2a_tables.sql
003_provider_node_custom_paths.sql
...
021_combo_call_log_targets.sql
```

### ਮਾਈਗ੍ਰੇਸ਼ਨਾਂ ਕਿਵੇਂ ਚੱਲਦੀਆਂ ਹਨ

ਸਟਾਰਟਅੱਪ ਵੇਲੇ, `migrationRunner.ts`:

1. ਜੇ `_omniroute_migrations` ਟੇਬਲ ਮੌਜੂਦ ਨਹੀਂ ਹੈ, ਤਾਂ ਇਸਨੂੰ ਬਣਾਉਂਦਾ ਹੈ
2. ਪਹਿਲਾਂ ਤੋਂ ਲਾਗੂ ਕੀਤੀਆਂ ਮਾਈਗ੍ਰੇਸ਼ਨਾਂ ਲਈ ਕਵੇਰੀ ਕਰਦਾ ਹੈ
3. ਸਾਰੀਆਂ ਨਵੀਆਂ ਮਾਈਗ੍ਰੇਸ਼ਨਾਂ ਨੂੰ ਕ੍ਰਮ ਅਨੁਸਾਰ ਲਾਗੂ ਕਰਦਾ ਹੈ, ਹਰ ਇੱਕ ਨੂੰ ਇੱਕ ਟ੍ਰਾਂਜ਼ੈਕਸ਼ਨ ਵਿੱਚ
4. ਹਰ ਲਾਗੂ ਕੀਤੀ ਮਾਈਗ੍ਰੇਸ਼ਨ ਨੂੰ ਟਾਈਮਸਟੈਂਪ ਸਮੇਤ ਦਰਜ ਕਰਦਾ ਹੈ

```ts
// src/lib/db/migrationRunner.ts (ਸਰਲ ਰੂਪ)
export async function runMigrations(db: SqliteDatabase, migrationsDir: string) {
  const applied = getAppliedMigrations(db);
  const available = readMigrationFiles(migrationsDir);

  for (const migration of available) {
    if (applied.includes(migration.id)) continue;
    db.transaction(() => {
      db.exec(migration.sql);
      recordAppliedMigration(db, migration.id);
    })();
  }
}
```

### ਆਈਡੈਂਪੋਟੈਂਸੀ

ਮਾਈਗ੍ਰੇਸ਼ਨਾਂ **ਆਈਡੈਂਪੋਟੈਂਟ** ਹੋਣੀਆਂ ਚਾਹੀਦੀਆਂ ਹਨ — ਉਨ੍ਹਾਂ ਨੂੰ ਦੋ ਵਾਰ ਚਲਾਉਣ ਨਾਲ ਕੋਈ ਪ੍ਰਭਾਵ ਨਹੀਂ ਪੈਣਾ ਚਾਹੀਦਾ:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

`IF NOT EXISTS`, `IF EXISTS`, ਅਤੇ `OR IGNORE` / `OR REPLACE` ਕਲੌਜ਼ਾਂ ਦੀ ਖੁੱਲ੍ਹ ਕੇ ਵਰਤੋਂ ਕਰੋ।

### ਨਵੀਂ ਮਾਈਗ੍ਰੇਸ਼ਨ ਜੋੜਨਾ

1. **ਅਗਲਾ ਨੰਬਰ ਪਛਾਣੋ**: `ls src/lib/db/migrations/ | tail -1`
2. **ਫ਼ਾਈਲ ਬਣਾਓ**: `NNN_my_change.sql`
3. **ਸੁਰੱਖਿਅਤ DDL ਵਰਤੋ**: `CREATE TABLE IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
4. **ਡਾਟਾ ਧਿਆਨ ਨਾਲ ਬੈਕਫ਼ਿਲ ਕਰੋ**: ਮੌਜੂਦਾ ਰੋਜ਼ ਨੂੰ ਸੰਭਾਲਣ ਲਈ `UPDATE ... WHERE ...` ਵਰਤੋ
5. **ਇੱਕ ਕਾਪੀ ਉੱਤੇ ਟੈਸਟ ਕਰੋ**: ਬਿਨਾਂ ਟੈਸਟ ਕੀਤੀਆਂ ਮਾਈਗ੍ਰੇਸ਼ਨਾਂ ਨੂੰ ਕਦੇ ਵੀ ਪ੍ਰੋਡਕਸ਼ਨ ਉੱਤੇ ਨਾ ਚਲਾਓ

ਉਦਾਹਰਨ:

```sql
-- 022_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **ਪਿੱਛੇ ਵੱਲ ਅਸੰਗਤ ਤਬਦੀਲੀਆਂ** (ਜਿਵੇਂ ਕਿ ਕਾਲਮ ਹਟਾਉਣਾ) ਔਖੀਆਂ ਹੁੰਦੀਆਂ ਹਨ। OmniRoute ਡਾਊਨਗ੍ਰੇਡ ਦਾ ਸਮਰਥਨ ਨਹੀਂ ਕਰਦਾ — ਇੱਕ ਵਾਰ ਮਾਈਗ੍ਰੇਸ਼ਨ ਲਾਗੂ ਹੋ ਜਾਣ ਤੋਂ ਬਾਅਦ, ਸਕੀਮਾ ਤਬਦੀਲੀ ਸਥਾਈ ਹੁੰਦੀ ਹੈ। ਇਸ ਅਨੁਸਾਰ ਯੋਜਨਾ ਬਣਾਓ।

---

## ਸਟੋਰੇਜ ਵਿੱਚ ਇਨਕ੍ਰਿਪਸ਼ਨ

ਸੰਵੇਦਨਸ਼ੀਲ ਫ਼ੀਲਡਾਂ (API ਕੁੰਜੀਆਂ, OAuth ਟੋਕਨ, ਕਨੈਕਸ਼ਨ ਸਟ੍ਰਿੰਗਾਂ) ਨੂੰ ਸਟੋਰੇਜ ਵਿੱਚ **AES-256-GCM** ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਇਨਕ੍ਰਿਪਟ ਕੀਤਾ ਜਾਂਦਾ ਹੈ।

### ਇਹ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ

```ts
// src/lib/db/encryption.ts (ਸਰਲ ਰੂਪ)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### ਇਹ ਕਿੱਥੇ ਵਰਤਿਆ ਜਾਂਦਾ ਹੈ

- `provider_connections.api_key` — ਐਪਲੀਕੇਸ਼ਨ ਪੱਧਰ ਉੱਤੇ ਇਨਕ੍ਰਿਪਟ ਕੀਤਾ ਜਾਂਦਾ ਹੈ
- `provider_connections.access_token`, `refresh_token`, `id_token` — ਐਪਲੀਕੇਸ਼ਨ ਪੱਧਰ ਉੱਤੇ ਇਨਕ੍ਰਿਪਟ ਕੀਤੇ ਜਾਂਦੇ ਹਨ
- `namespace = "secrets"` ਵਾਲੀਆਂ `key_value` ਐਂਟਰੀਆਂ — ਐਪਲੀਕੇਸ਼ਨ ਪੱਧਰ ਉੱਤੇ ਇਨਕ੍ਰਿਪਟ ਕੀਤੀਆਂ ਜਾਂਦੀਆਂ ਹਨ
- `proxy_registry.auth` — ਐਪਲੀਕੇਸ਼ਨ ਪੱਧਰ ਉੱਤੇ ਇਨਕ੍ਰਿਪਟ ਕੀਤਾ ਜਾਂਦਾ ਹੈ (ਜੇ ਮੌਜੂਦ ਹੋਵੇ)

### ਇਨਕ੍ਰਿਪਸ਼ਨ ਕੁੰਜੀ

ਇਨਕ੍ਰਿਪਸ਼ਨ ਕੁੰਜੀ ਇੱਕ **ਪਾਸਫਰੇਜ਼** (`STORAGE_ENCRYPTION_KEY` env var ਰਾਹੀਂ ਸੈੱਟ ਕੀਤਾ ਜਾਂਦਾ ਹੈ) ਅਤੇ ਇੱਕ **ਸਾਲਟ** (DB ਵਿੱਚ ਸਟੋਰ ਕੀਤਾ ਜਾਂਦਾ ਹੈ) ਤੋਂ ਬਣਾਈ ਜਾਂਦੀ ਹੈ। ਡਾਟਾ ਡਿਕ੍ਰਿਪਟ ਕਰਨ ਲਈ ਦੋਵੇਂ ਲੋੜੀਂਦੇ ਹਨ।

```bash
# ਇੱਕ ਸੁਰੱਖਿਅਤ ਪਾਸਫਰੇਜ਼ ਬਣਾਓ
openssl rand -hex 32

# .env ਵਿੱਚ ਸੈੱਟ ਕਰੋ
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **ਬਹੁਤ ਮਹੱਤਵਪੂਰਨ**: ਇਨਕ੍ਰਿਪਸ਼ਨ ਕੁੰਜੀ ਗੁਆਉਣ ਦਾ ਮਤਲਬ ਹੈ ਸਾਰੇ ਇਨਕ੍ਰਿਪਟ ਕੀਤੇ ਡਾਟੇ ਤੱਕ ਪਹੁੰਚ ਗੁਆਉਣਾ। **ਕੁੰਜੀ ਦਾ ਬੈਕਅੱਪ ਡਾਟਾਬੇਸ ਤੋਂ ਵੱਖਰੇ ਤੌਰ ਉੱਤੇ ਲਓ**।

### ਕੀ ਇਨਕ੍ਰਿਪਟ ਨਹੀਂ ਕੀਤਾ ਜਾਂਦਾ

ਕਾਰਗੁਜ਼ਾਰੀ ਦੇ ਕਾਰਨਾਂ ਕਰਕੇ, ਹੇਠ ਲਿਖੀਆਂ ਚੀਜ਼ਾਂ ਨੂੰ ਪਲੇਨਟੈਕਸਟ ਵਿੱਚ ਸਟੋਰ ਕੀਤਾ ਜਾਂਦਾ ਹੈ:

- ਪ੍ਰੋਵਾਈਡਰ ਦੇ ਡਿਸਪਲੇ ਨਾਮ
- ਮਾਡਲ ਪਰਿਭਾਸ਼ਾਵਾਂ (ਪਹਿਲਾਂ ਹੀ ਜਨਤਕ)
- ਰਾਊਟਿੰਗ ਨਿਯਮ
- ਵਰਤੋਂ ਦੇ ਰਿਕਾਰਡ (ਕੋਈ PII ਨਹੀਂ)

---

## ਇਨਕ੍ਰਿਪਸ਼ਨ ਸੰਬੰਧੀ ਸਾਵਧਾਨੀਆਂ (v3.8.16+)

OmniRoute ਦੋ ਇਨਕ੍ਰਿਪਸ਼ਨ ਸਕੀਮਾਂ ਨੂੰ ਪਾਰਦਰਸ਼ੀ ਢੰਗ ਨਾਲ ਸੰਭਾਲਣ ਲਈ **`migrateLegacyEncryptedString()`** ਵਰਤਦਾ ਹੈ:

- **ਪੁਰਾਣੀ** (v3.5.0 ਤੋਂ ਪਹਿਲਾਂ): XOR-ਅਧਾਰਿਤ "ਇਨਕ੍ਰਿਪਸ਼ਨ" (ਅਸਲ ਕ੍ਰਿਪਟੋਗ੍ਰਾਫੀ ਨਹੀਂ)
- **ਮੌਜੂਦਾ**: ਉਚਿਤ IV ਅਤੇ ਪ੍ਰਮਾਣਿਕਤਾ ਟੈਗ ਨਾਲ AES-256-GCM

ਮਾਈਗ੍ਰੇਸ਼ਨ ਸਹਾਇਕ ਪੁਰਾਣੇ ਫਾਰਮੈਟ ਦੀ ਪਛਾਣ ਕਰਦਾ ਹੈ ਅਤੇ ਪਹਿਲੀ ਵਾਰ ਪੜ੍ਹੇ ਜਾਣ 'ਤੇ ਨਵੀਂ ਸਕੀਮ ਨਾਲ ਮੁੜ ਇਨਕ੍ਰਿਪਟ ਕਰਦਾ ਹੈ। ਇਸਦਾ ਅਰਥ ਹੈ ਕਿ ਤੁਸੀਂ ਕ੍ਰਿਡੈਂਸ਼ਲ ਗੁਆਏ ਬਿਨਾਂ ਪੁਰਾਣੇ ਡਾਟਾਬੇਸ ਨੂੰ ਅੱਪਗ੍ਰੇਡ ਕਰ ਸਕਦੇ ਹੋ।

---

## ਰੀਡ ਕੈਸ਼

ਅਕਸਰ ਪੜ੍ਹੇ ਜਾਣ ਵਾਲੇ ਡਾਟੇ (ਮਾਡਲਾਂ, ਪ੍ਰਦਾਤਾਵਾਂ, ਸੈਟਿੰਗਾਂ) ਲਈ, `readCache.ts` ਇੱਕ **ਇਨ-ਮੈਮੋਰੀ ਕੈਸ਼** ਪ੍ਰਦਾਨ ਕਰਦੀ ਹੈ:

```ts
// ਸਟਾਰਟਅੱਪ ਵੇਲੇ ਕੈਸ਼ ਕੀਤਾ ਜਾਂਦਾ ਹੈ, ਲਿਖਣ 'ਤੇ ਅਵੈਧ ਕੀਤਾ ਜਾਂਦਾ ਹੈ
const providers = await getCachedProviders(); // ਤੇਜ਼, ਇਨ-ਮੈਮੋਰੀ
const fresh = await listProviders(); // ਹੌਲੀ, DB ਤੱਕ ਪਹੁੰਚ ਕਰਦਾ ਹੈ
```

| ਕੈਸ਼ ਕੀਤੀ ਇਕਾਈ         | ਕੈਸ਼ ਕੁੰਜੀ     | TTL      |
| ---------------------- | -------------- | -------- |
| `models`               | `models:v1`    | ਲਿਖਣ ਤੱਕ |
| `provider_connections` | `providers:v1` | ਲਿਖਣ ਤੱਕ |
| `settings`             | `settings:v1`  | ਲਿਖਣ ਤੱਕ |
| `combos`               | `combos:v1`    | ਲਿਖਣ ਤੱਕ |

ਸੰਬੰਧਿਤ ਟੇਬਲ ਵਿੱਚ ਹਰ ਵਾਰ ਲਿਖਣ 'ਤੇ ਕੈਸ਼ ਅਵੈਧ ਕਰ ਦਿੱਤਾ ਜਾਂਦਾ ਹੈ।

---

## ਬੈਕਅੱਪ ਅਤੇ ਰਿਕਵਰੀ

### ਮੈਨੂਅਲ ਬੈਕਅੱਪ

```bash
# ਸਥਾਨਕ ਬੈਕਅੱਪ ਬਣਾਉਣ ਲਈ CLI ਦੀ ਵਰਤੋਂ ਕਰੋ
omniroute backup create --name pre-migration

# ਜਾਂ API ਰਾਹੀਂ
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

ਬੈਕਅੱਪ ਫਾਈਲ ਵਿੱਚ ਇਹ ਸ਼ਾਮਲ ਹੁੰਦਾ ਹੈ:

- ਸਾਰੀਆਂ DB ਟੇਬਲਾਂ (JSON ਵਿੱਚ ਸੀਰੀਅਲਾਈਜ਼ ਕੀਤੀਆਂ)
- ਕਾਲ ਲੌਗ ਆਰਟੀਫੈਕਟ (base64-ਇਨਕੋਡ ਕੀਤੇ, ਵਿਕਲਪਿਕ)
- ਸੈਟਿੰਗਾਂ + ਸੀਕ੍ਰੇਟ (ਇਨਕ੍ਰਿਪਟ ਕੀਤੇ)
- ਪਲੱਗਇਨ ਕੌਂਫਿਗਰੇਸ਼ਨ

### ਰੀਸਟੋਰ

```bash
# CLI ਰਾਹੀਂ
omniroute restore pre-migration

# API ਰਾਹੀਂ
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **ਚੇਤਾਵਨੀ**: ਰੀਸਟੋਰ ਪੂਰੇ DB ਨੂੰ ਓਵਰਰਾਈਟ ਕਰ ਦਿੰਦਾ ਹੈ। ਪਹਿਲਾਂ ਸਾਰੇ ਕਲਾਇੰਟ ਬੰਦ ਕਰੋ।

### ਸਵੈਚਾਲਿਤ ਬੈਕਅੱਪ

```bash
# CLI ਰਾਹੀਂ ਸਵੈਚਾਲਿਤ ਰੋਜ਼ਾਨਾ ਬੈਕਅੱਪ ਸਮਰੱਥ ਕਰੋ
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

ਸ਼ੈਡਿਊਲ ਨੂੰ ਸਰਵਰ-ਸਾਈਡ 'ਤੇ ਇੱਕ ਬੈਕਗ੍ਰਾਊਂਡ ਜੌਬ ਦੁਆਰਾ ਚਲਾਇਆ ਜਾਂਦਾ ਹੈ, ਜੋ ਹਰ 30 ਸਕਿੰਟ
(ਡਿਫਾਲਟ) ਬਾਅਦ ਟਿਕ ਕਰਦੀ ਹੈ ਅਤੇ ਸਥਾਨਕ ਸਰਵਰ ਸਮੇਂ ਦੇ ਮੁਕਾਬਲੇ cron ਐਕਸਪ੍ਰੈਸ਼ਨ ਦਾ ਮੁਲਾਂਕਣ ਕਰਦੀ ਹੈ।

| ਵੇਰੀਏਬਲ                                     | ਡਿਫਾਲਟ  | ਵਰਣਨ                                                                                                                       |
| ------------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000` | ms ਵਿੱਚ ਟਿਕ ਅੰਤਰਾਲ (ਘੱਟੋ-ਘੱਟ `5000`)। ਮੇਲ ਖਾਂਦੇ cron ਮਿੰਟ ਦੇ ਅੰਦਰ ਭਰੋਸੇਯੋਗ ਢੰਗ ਨਾਲ ਆਉਣ ਲਈ ਇਹ 60 s ਤੋਂ ਛੋਟਾ ਹੋਣਾ ਚਾਹੀਦਾ ਹੈ। |

### SQLite ਹੌਟ ਬੈਕਅੱਪ

ਚੱਲ ਰਹੇ DB ਦਾ ਬਿਨਾਂ ਡਾਊਨਟਾਈਮ ਬੈਕਅੱਪ ਲੈਣ ਲਈ:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

ਇਹ SQLite ਦੀ ਔਨਲਾਈਨ ਬੈਕਅੱਪ API ਵਰਤਦਾ ਹੈ — OmniRoute ਦੇ ਚੱਲਦੇ ਸਮੇਂ ਇਸਨੂੰ ਚਲਾਉਣਾ ਸੁਰੱਖਿਅਤ ਹੈ।

---

## ਕਾਰਗੁਜ਼ਾਰੀ ਟਿਊਨਿੰਗ

### WAL ਮੋਡ

WAL ਮੂਲ ਰੂਪ ਵਿੱਚ ਸਮਰੱਥ ਹੁੰਦਾ ਹੈ। ਵੱਧ ਲਿਖਤ ਵਾਲੇ ਵਰਕਲੋਡਾਂ ਲਈ, ਇਹਨਾਂ ਬਾਰੇ ਵਿਚਾਰ ਕਰੋ:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- ਹਰ 1000 ਪੰਨਿਆਂ ਬਾਅਦ ਚੈੱਕਪੌਇੰਟ
PRAGMA journal_size_limit = 67108864;  -- 64MB WAL ਸੀਮਾ
```

### ਇੰਡੈਕਸ

ਕਾਰਗੁਜ਼ਾਰੀ ਲਈ ਮੁੱਖ ਇੰਡੈਕਸ (ਮਾਈਗ੍ਰੇਸ਼ਨਾਂ ਦੁਆਰਾ ਆਪਣੇ-ਆਪ ਬਣਾਏ ਜਾਂਦੇ ਹਨ):

- `idx_models_provider` — ਪ੍ਰਦਾਤਾ ਮੁਤਾਬਕ ਮਾਡਲ ਲੁੱਕਅੱਪ
- `idx_combo_targets_combo_id` — ਕੰਬੋ ਟਾਰਗੇਟ ਵਿਸਤਾਰ
- `idx_usage_history_api_key_timestamp` — ਵਰਤੋਂ ਵਿਸ਼ਲੇਸ਼ਣ
- `idx_quota_snapshots_api_key_window` — ਕੋਟਾ ਟ੍ਰੈਕਿੰਗ
- `idx_call_logs_timestamp` — ਕਾਲ ਲੌਗ ਕਵੇਰੀਆਂ

ਨਵਾਂ ਇੰਡੈਕਸ ਜੋੜਨ ਲਈ, ਇੱਕ ਮਾਈਗ੍ਰੇਸ਼ਨ ਬਣਾਓ:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### ਮੈਮੋਰੀ-ਮੈਪਡ I/O

ਬਹੁਤ ਵੱਡੇ ਡਾਟਾਬੇਸਾਂ (>10GB) ਲਈ, ਮੈਮੋਰੀ ਮੈਪਿੰਗ ਨੂੰ SQLite pragma ਰਾਹੀਂ ਵਿਵਸਥਿਤ ਕੀਤਾ ਜਾ ਸਕਦਾ ਹੈ:

```sql
-- SQLite pragma ਰਾਹੀਂ ਸੈੱਟ ਕਰੋ (core.ts ਜਾਂ ਰਨਟਾਈਮ ਵਿੱਚ ਵਿਵਸਥਿਤ ਕਰੋ)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### ਸੰਕੁਚਨ

ਲੰਬੇ ਸਮੇਂ ਤੱਕ ਚੱਲਣ ਵਾਲੇ OmniRoute ਇੰਸਟੈਂਸਾਂ ਨੂੰ ਕਦੇ-ਕਦਾਈਂ `VACUUM` ਤੋਂ ਲਾਭ ਹੁੰਦਾ ਹੈ:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

ਘੱਟ ਟ੍ਰੈਫ਼ਿਕ ਵਾਲੀਆਂ ਮਿਆਦਾਂ ਦੌਰਾਨ ਇਸਨੂੰ ਮਹੀਨਾਵਾਰ ਚਲਾਓ। (WAL ਮੋਡ ਇਸਦੀ ਲੋੜ ਘਟਾਉਂਦਾ ਹੈ, ਪਰ ਇਸਨੂੰ ਪੂਰੀ ਤਰ੍ਹਾਂ ਖਤਮ ਨਹੀਂ ਕਰਦਾ।)

---

## ਸਿਹਤ ਜਾਂਚ

`src/lib/db/healthCheck.ts` **DB-ਪੱਧਰੀ ਸਿਹਤ ਨਿਦਾਨ** ਪ੍ਰਦਾਨ ਕਰਦਾ ਹੈ:

ਦੋਵਾਂ ਕਿਰਿਆਵਾਂ ਲਈ ਪ੍ਰਮਾਣੀਕਰਨ ਲੋੜੀਂਦਾ ਹੈ (ਨਹੀਂ ਤਾਂ `401`)। `GET` ਸਿਰਫ਼ ਨਿਦਾਨ ਕਰਦਾ ਹੈ; `POST`
ਉਹੀ ਜਾਂਚ `autoRepair` ਸਮਰੱਥ ਕਰਕੇ ਚਲਾਉਂਦਾ ਹੈ।

```bash
GET  /api/db/health   # ਨਿਦਾਨ ਕਰੋ
POST /api/db/health   # ਨਿਦਾਨ + ਮੁਰੰਮਤ
```

ਜਵਾਬ `runDbHealthCheck()` ਦੁਆਰਾ ਤਿਆਰ ਕੀਤਾ `DbHealthCheckResult` ਹੈ
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "ਡੋਮੇਨ ਬਜਟਾਂ ਨੇ ਉਹਨਾਂ API ਕੁੰਜੀਆਂ ਦਾ ਹਵਾਲਾ ਦਿੱਤਾ ਜੋ ਹੁਣ ਮੌਜੂਦ ਨਹੀਂ ਹਨ।",
      "count": 2
    }
  ],
  "repairedCount": 0,
  "backupCreated": false,
  "autoRepair": false,
  "checkedAt": "2026-08-18T09:00:00.000Z",
  "driver": { "name": "better-sqlite3", "degraded": false }
}
```

| ਫ਼ੀਲਡ             | ਅਰਥ                                                                                                                                                 |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | ਜਦੋਂ `issues` ਖਾਲੀ ਹੋਵੇ ਤਾਂ `true`। `driver` ਇਸਨੂੰ ਕਦੇ ਪ੍ਰਭਾਵਿਤ ਨਹੀਂ ਕਰਦਾ।                                                                          |
| `issues[].type`   | `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state` ਵਿੱਚੋਂ ਇੱਕ।                                                         |
| `repairedCount`   | ਇਸ ਰਨ ਦੌਰਾਨ ਮੁਰੰਮਤ ਕੀਤੀਆਂ ਕਤਾਰਾਂ; ਜਦੋਂ `autoRepair` false ਹੋਵੇ ਤਾਂ ਹਮੇਸ਼ਾ `0`।                                                                      |
| `backupCreated`   | ਕੀ ਮੁਰੰਮਤ ਤੋਂ ਪਹਿਲਾਂ ਬੈਕਅੱਪ ਲਿਆ ਗਿਆ ਸੀ।                                                                                                             |
| `checkedAt`       | ਰਨ ਅਤੇ ਇਸ ਦੁਆਰਾ ਲਿਖੇ ਗਏ ਕਿਸੇ ਵੀ ਮੁਰੰਮਤ ਨੋਟ ਵੱਲੋਂ ਸਾਂਝਾ ਕੀਤਾ ISO ਟਾਈਮਸਟੈਂਪ।                                                                          |
| `driver.name`     | ਜਾਂਚੇ ਗਏ ਡਾਟਾਬੇਸ ਨੂੰ ਸੇਵਾ ਦੇਣ ਵਾਲਾ SQLite ਡਰਾਈਵਰ।                                                                                                   |
| `driver.degraded` | ਜਦੋਂ ਲਿਖਤਾਂ ਨੂੰ ਡਾਟਾਬੇਸ ਫ਼ਾਈਲ ਦੁਆਰਾ ਟਿਕਾਊ ਢੰਗ ਨਾਲ ਬੈਕ ਨਹੀਂ ਕੀਤਾ ਜਾਂਦਾ ਤਾਂ `true` — `sql.js` WASM ਫ਼ਾਲਬੈਕ (ਪੂਰੀ-ਫ਼ਾਈਲ ਸਥਾਇਤਾ) ਜਾਂ ਇਨ-ਮੈਮੋਰੀ ਡਾਟਾਬੇਸ। |

ਇਹੀ ਪੇਲੋਡ `omniroute_db_health_check` MCP ਟੂਲ ਦੁਆਰਾ ਵਾਪਸ ਕੀਤਾ ਜਾਂਦਾ ਹੈ।

ਖਰਾਬੀ ਦਾ ਪਤਾ ਲਗਾਉਣ ਲਈ `PRAGMA integrity_check` ਚਲਾਓ:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# ਇਹ ਪ੍ਰਿੰਟ ਹੋਣਾ ਚਾਹੀਦਾ ਹੈ: ok
```

ਜੇ ਇਹ `ok` ਤੋਂ ਇਲਾਵਾ ਕੁਝ ਵੀ ਵਾਪਸ ਕਰਦਾ ਹੈ, ਤਾਂ **ਡਾਟਾਬੇਸ ਦੀ ਵਰਤੋਂ ਤੁਰੰਤ ਬੰਦ ਕਰੋ** ਅਤੇ ਬੈਕਅੱਪ ਤੋਂ ਰੀਸਟੋਰ ਕਰੋ।

---

## ਆਫ਼ਤ ਤੋਂ ਮੁੜ-ਪ੍ਰਾਪਤੀ

### ਦ੍ਰਿਸ਼ 1: WAL ਫ਼ਾਈਲ ਗੁੰਮ ਹੋ ਗਈ

`-wal` ਫ਼ਾਈਲ ਗੁੰਮ ਹੈ, ਪਰ `-shm` ਅਤੇ ਮੁੱਖ DB ਸਹੀ-ਸਲਾਮਤ ਹਨ:

```bash
# ਅਗਲੀ ਵਾਰ ਖੋਲ੍ਹਣ 'ਤੇ ਆਪਣੇ-ਆਪ ਮੁੜ-ਪ੍ਰਾਪਤ ਹੋ ਜਾਂਦੀ ਹੈ
omniroute
```

ਜੇ SQLite ਆਪਣੇ-ਆਪ ਮੁੜ-ਪ੍ਰਾਪਤ ਨਹੀਂ ਕਰ ਸਕਦਾ:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### ਦ੍ਰਿਸ਼ 2: ਮੁੱਖ DB ਫ਼ਾਈਲ ਖ਼ਰਾਬ ਹੋ ਗਈ

ਬੈਕਅੱਪ ਤੋਂ ਬਹਾਲ ਕਰੋ:

```bash
omniroute sync pull --merge   # ਜਾਂ: omniroute backup restore <backup-id>
```

### ਦ੍ਰਿਸ਼ 3: ਇਨਕ੍ਰਿਪਸ਼ਨ ਕੁੰਜੀ ਗੁੰਮ ਹੋ ਗਈ

ਕੁੰਜੀ ਤੋਂ ਬਿਨਾਂ **ਮੁੜ-ਪ੍ਰਾਪਤੀ ਸੰਭਵ ਨਹੀਂ ਹੈ**। ਇਨਕ੍ਰਿਪਟ ਕੀਤੇ ਖੇਤਰ ਪੜ੍ਹੇ ਨਹੀਂ ਜਾ ਸਕਦੇ। ਨਵੇਂ ਪ੍ਰਮਾਣ-ਪੱਤਰਾਂ ਨਾਲ ਸਾਰੇ ਪ੍ਰਦਾਤਾ ਹੱਥੀਂ ਦੁਬਾਰਾ ਸ਼ਾਮਲ ਕਰੋ।

> **ਜੋਖਮ ਘਟਾਉਣ ਦਾ ਉਪਾਅ**: ਇਨਕ੍ਰਿਪਸ਼ਨ ਕੁੰਜੀ ਦਾ ਬੈਕਅੱਪ ਹਮੇਸ਼ਾ ਵੱਖਰੇ ਤੌਰ 'ਤੇ ਰੱਖੋ, ਤਰਜੀਹੀ ਤੌਰ 'ਤੇ ਕਿਸੇ ਪਾਸਵਰਡ ਮੈਨੇਜਰ ਜਾਂ KMS ਵਿੱਚ।

### ਦ੍ਰਿਸ਼ 4: ਡਿਸਕ ਭਰ ਗਈ

SQLite `SQLITE_FULL` ਤਰੁੱਟੀਆਂ ਵਾਪਸ ਕਰੇਗਾ। ਡਿਸਕ ਦੀ ਜਗ੍ਹਾ ਖਾਲੀ ਕਰੋ, ਫਿਰ:

```bash
# ਜਗ੍ਹਾ ਖਾਲੀ ਕਰਨ ਲਈ WAL ਦਾ ਚੈੱਕਪੁਆਇੰਟ ਬਣਾਓ
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## ਆਮ ਕਾਰਵਾਈਆਂ

### ਕਿਸੇ ਟੇਬਲ ਦੀ ਜਾਂਚ ਕਰੋ

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### ਸਾਰੇ ਟੇਬਲਾਂ ਵਿੱਚ ਕਤਾਰਾਂ ਦੀ ਗਿਣਤੀ ਕਰੋ

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### ਸਾਰਾ ਡੇਟਾ ਰੀਸੈੱਟ (ਮਿਟਾਓ) ਕਰੋ

```bash
# ਪਹਿਲਾਂ OmniRoute ਨੂੰ ਰੋਕੋ
omniroute stop

# DB ਫ਼ਾਈਲ ਮਿਟਾਓ
rm ~/.omniroute/storage.sqlite*

# ਮੁੜ ਚਾਲੂ ਕਰੋ (ਖਾਲੀ DB ਦੁਬਾਰਾ ਬਣਾਇਆ ਜਾਵੇਗਾ)
omniroute
```

**ਚੋਣਵੀਂ** ਰੀਸੈੱਟ ਲਈ (ਪ੍ਰਦਾਤਿਆਂ ਨੂੰ ਰੱਖੋ, ਵਰਤੋਂ ਦਾ ਡੇਟਾ ਮਿਟਾਓ):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### ਇੱਕ ਟੇਬਲ ਐਕਸਪੋਰਟ ਕਰੋ

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## ਸਮੱਸਿਆ-ਨਿਵਾਰਣ

### "ਡੇਟਾਬੇਸ ਲੌਕ ਹੈ"

ਕਿਸੇ ਹੋਰ ਪ੍ਰਕਿਰਿਆ ਨੇ ਲਿਖਣ ਵਾਲਾ ਲੌਕ ਫੜਿਆ ਹੋਇਆ ਹੈ। ਇਨ੍ਹਾਂ ਵਿੱਚੋਂ ਕੋਈ ਇੱਕ ਕਾਰਵਾਈ ਕਰੋ:

- ਦੂਜੀ ਪ੍ਰਕਿਰਿਆ ਦੇ ਪੂਰਾ ਹੋਣ ਦੀ ਉਡੀਕ ਕਰੋ (`lsof | grep storage.sqlite` ਨਾਲ ਜਾਂਚੋ)
- ਦੂਜੀ ਪ੍ਰਕਿਰਿਆ ਨੂੰ ਸਮਾਪਤ ਕਰੋ
- ਜੇ ਸਮੱਸਿਆ ਜਾਰੀ ਰਹਿੰਦੀ ਹੈ, ਤਾਂ OmniRoute ਨੂੰ ਮੁੜ ਚਾਲੂ ਕਰੋ

### "ਫ਼ੌਰਨ ਕੁੰਜੀ ਪਾਬੰਦੀ ਅਸਫਲ ਰਹੀ"

ਕੋਈ ਡੋਮੇਨ ਮੋਡੀਊਲ ਸੰਦਰਭਕ ਅਖੰਡਤਾ ਦੀ ਉਲੰਘਣਾ ਕਰ ਰਿਹਾ ਹੈ। ਜਾਂਚ ਕਰੋ:

- ਨਿਰਭਰ ਟੇਬਲਾਂ ਵਿੱਚ ਬਿਨਾਂ ਸੰਬੰਧ ਵਾਲੀਆਂ ਕਤਾਰਾਂ
- ਕੈਸਕੇਡਿੰਗ ਮਿਟਾਉਣ ਦੀਆਂ ਕਾਰਵਾਈਆਂ ਜੋ ਅੱਗੇ ਲਾਗੂ ਨਹੀਂ ਹੋਈਆਂ
- ਹਾਲੀਆ ਮਾਈਗ੍ਰੇਸ਼ਨ ਜਿਸ ਨੇ ਕਿਸੇ ਫ਼ੌਰਨ ਕੁੰਜੀ ਨੂੰ ਬਦਲਿਆ ਹੈ

ਉਲੰਘਣਾਵਾਂ ਲੱਭਣ ਲਈ `PRAGMA foreign_key_check;` ਚਲਾਓ।

### "ਮੈਮੋਰੀ ਖ਼ਤਮ ਹੋ ਗਈ"

SQLite ਦਾ ਮੈਮੋਰੀ-ਮੈਪਡ I/O, OS ਦੀ ਸੀਮਾ ਤੋਂ ਵੱਧ ਰਿਹਾ ਹੈ। SQLite pragma ਰਾਹੀਂ ਇਸਨੂੰ ਘਟਾਓ:

```sql
PRAGMA mmap_size = 134217728;  -- 256MB ਦੀ ਬਜਾਏ 128MB
```

ਜਾਂ ਇਸਨੂੰ ਅਸਮਰੱਥ ਕਰੋ:

```sql
PRAGMA mmap_size = 0;
```

### "ਮਾਈਗ੍ਰੇਸ਼ਨ ਅੱਧ ਵਿਚਕਾਰ ਅਸਫਲ ਹੋ ਗਈ"

ਮਾਈਗ੍ਰੇਸ਼ਨ ਇੱਕ ਟ੍ਰਾਂਜ਼ੈਕਸ਼ਨ ਵਿੱਚ ਚੱਲੀ ਸੀ, ਇਸ ਲਈ ਇਸਨੂੰ ਰੋਲ ਬੈਕ ਹੋ ਜਾਣਾ ਚਾਹੀਦਾ ਸੀ। ਜੇ ਅਜਿਹਾ ਨਹੀਂ ਹੋਇਆ:

1. **OmniRoute ਨੂੰ ਰੋਕੋ** (ਹੋਰ ਕੋਸ਼ਿਸ਼ਾਂ ਨੂੰ ਰੋਕਣ ਲਈ)
2. `sqlite3` ਨਾਲ **DB ਦੀ ਸਥਿਤੀ ਜਾਂਚੋ**
3. ਅਧੂਰੀ ਮਾਈਗ੍ਰੇਸ਼ਨ ਨੂੰ **ਹੱਥੀਂ ਠੀਕ ਕਰੋ**
4. OmniRoute ਨੂੰ **ਦੁਬਾਰਾ ਚਲਾਓ** (ਮਾਈਗ੍ਰੇਸ਼ਨ ਦੀ ਮੁੜ ਕੋਸ਼ਿਸ਼ ਕੀਤੀ ਜਾਵੇਗੀ)

ਇਸਨੂੰ ਰੋਕਣ ਲਈ, ਮਾਈਗ੍ਰੇਸ਼ਨਾਂ ਦੀ ਜਾਂਚ ਹਮੇਸ਼ਾ ਪਹਿਲਾਂ ਇੱਕ ਕਾਪੀ 'ਤੇ ਕਰੋ।

---

## ਇਹ ਵੀ ਵੇਖੋ

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — ਵਰਤੋਂ ਵਾਲੇ ਟੇਬਲ
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — ਸਥਿਤੀ ਦੀ ਨਿਗਰਾਨੀ
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — ਰਿਲੀਜ਼ ਪ੍ਰਵਾਹ
- ਸਰੋਤ: `src/lib/db/` (80+ ਫ਼ਾਈਲਾਂ, ~25K ਕੋਡ ਲਾਈਨਾਂ)
