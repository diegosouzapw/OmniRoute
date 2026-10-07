# Database Schema & Operations Guide (ಕನ್ನಡ)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **ಸಂಕ್ಷಿಪ್ತವಾಗಿ**: OmniRoute ತನ್ನ ಪ್ರಾಥಮಿಕ ಸಂಗ್ರಹವಾಗಿ **WAL ಜರ್ನಲಿಂಗ್ನೊಂದಿಗೆ SQLite** ಅನ್ನು ಬಳಸುತ್ತದೆ ಮತ್ತು ಸೂಕ್ಷ್ಮ ಕ್ಷೇತ್ರಗಳಿಗೆ ನಿಷ್ಕ್ರಿಯ ಸ್ಥಿತಿಯಲ್ಲಿ **AES-256-GCM** ಎನ್ಕ್ರಿಪ್ಶನ್ ಒದಗಿಸುತ್ತದೆ. ಈ ಮಾರ್ಗದರ್ಶಿಯು ಸ್ಕೀಮಾ, ಮೈಗ್ರೇಶನ್ಗಳು, ಬ್ಯಾಕಪ್/ಮರುಪಡೆಯುವಿಕೆ ಮತ್ತು ಕಾರ್ಯಾಚರಣೆಯ ರನ್ಬುಕ್ಗಳನ್ನು ಒಳಗೊಂಡಿದೆ.

**ಮೂಲಗಳು:**

- `src/lib/db/core.ts` — ಸಿಂಗಲ್ಟನ್ + SCHEMA_SQL (17 ಮೂಲ ಕೋಷ್ಟಕಗಳು)
- `src/lib/db/migrationRunner.ts` — ಆವೃತ್ತಿಗೊಳಿಸಿದ ಮೈಗ್ರೇಶನ್ಗಳು
- `src/lib/db/migrations/` — 167 ಆವೃತ್ತಿಗೊಳಿಸಿದ SQL ಫೈಲ್ಗಳು
- `src/lib/db/encryption.ts` — ಎನ್ಕ್ರಿಪ್ಶನ್ ಸಹಾಯಕಗಳು
- `src/lib/db/backup.ts` — ಬ್ಯಾಕಪ್ ರಫ್ತು/ಆಮದು
- `src/lib/db/healthCheck.ts` — ಆರೋಗ್ಯ ಸ್ಥಿತಿಯ ರೋಗನಿರ್ಣಯಗಳು

---

## SQLite ಏಕೆ?

ಹಲವಾರು ಕಾರಣಗಳಿಂದ OmniRoute, PostgreSQL/MySQL ಬದಲಿಗೆ SQLite ಅನ್ನು ಆಯ್ಕೆ ಮಾಡಿಕೊಂಡಿದೆ:

| ಅಂಶ              | SQLite                                       | PostgreSQL                              |
| ---------------- | -------------------------------------------- | --------------------------------------- |
| **ನಿಯೋಜನೆ**      | ಎಂಬೆಡೆಡ್ — ಪ್ರತ್ಯೇಕ ಸರ್ವರ್ ಅಗತ್ಯವಿಲ್ಲ        | ಸರ್ವರ್ ಸೆಟಪ್ ಅಗತ್ಯವಿದೆ                  |
| **ಎನ್ಕ್ರಿಪ್ಶನ್** | ಅಪ್ಲಿಕೇಶನ್-ಪದರದ (AES-256-GCM)                | ಅಂತರ್ನಿರ್ಮಿತ TDE                        |
| **ಕಾರ್ಯಕ್ಷಮತೆ**  | ಸಣ್ಣ/ಮಧ್ಯಮ ಕಾರ್ಯಭಾರಗಳಿಗೆ ವೇಗವಾಗಿದೆ           | ಬೃಹತ್ ಸಮಕಾಲೀನ ಬರವಣಿಗೆಗಳಿಗೆ ಉತ್ತಮವಾಗಿದೆ  |
| **ಸಮಕಾಲೀನತೆ**    | WAL ಮೋಡ್ ಸಮಕಾಲೀನ ಓದುವಿಕೆಗಳನ್ನು ಅನುಮತಿಸುತ್ತದೆ | ಸಂಪೂರ್ಣ MVCC                            |
| **ಬ್ಯಾಕಪ್**      | ಏಕ-ಫೈಲ್ ನಕಲು                                 | `pg_dump` ಅಥವಾ ಫೈಲ್ಸಿಸ್ಟಮ್ ಸ್ನ್ಯಾಪ್ಶಾಟ್ |
| **ಬಳಕೆಯ ಸಂದರ್ಭ** | ಪ್ರತಿ-ಬಳಕೆದಾರ ಸ್ಥಾಪನೆ, ಎಂಬೆಡೆಡ್              | ಬಹು-ಟೆನೆಂಟ್ SaaS                        |

**ಏಕ-ಬಳಕೆದಾರ, ಏಕ-ಇನ್ಸ್ಟೆನ್ಸ್** ನಿಯೋಜನೆಗಳಿಗೆ (OmniRoute ನ ಪ್ರಾಥಮಿಕ ಬಳಕೆಯ ಸಂದರ್ಭ), SQLite ಸರಳವೂ ವೇಗವೂ ಆಗಿದೆ.

### WAL ಜರ್ನಲಿಂಗ್

`core.ts` ಡೇಟಾಬೇಸ್ ಅನ್ನು **WAL (Write-Ahead Logging) ಮೋಡ್ನಲ್ಲಿ** ತೆರೆಯುತ್ತದೆ:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

ಬರವಣಿಗೆಗಳ ಸಮಯದಲ್ಲಿ **ಸಮಕಾಲೀನ ಓದುವಿಕೆಗಳನ್ನು** WAL ಅನುಮತಿಸುತ್ತದೆ — ವಿನಂತಿಗಳು ದಾಖಲಾಗುತ್ತಿರುವಾಗಲೇ ಪ್ರಶ್ನೆಗಳನ್ನು ನಡೆಸುವ ಡ್ಯಾಶ್ಬೋರ್ಡ್ಗೆ ಇದು ಮುಖ್ಯವಾಗಿದೆ.

ಡೀಫಾಲ್ಟ್ ಕ್ಯಾಶ್ ಗಾತ್ರವು **65,536 KiB (64 MiB)** ಆಗಿದೆ. ಋಣಾತ್ಮಕ
`cache_size` ಅನ್ನು KiB ನಲ್ಲಿನ ಅಂದಾಜು ಮೇಲಿನ ಮಿತಿಯಾಗಿ SQLite ಪರಿಗಣಿಸುತ್ತದೆ ಮತ್ತು ಅಗತ್ಯಕ್ಕೆ ತಕ್ಕಂತೆ ಪುಟಗಳನ್ನು ಹಂಚಿಕೆ ಮಾಡುತ್ತದೆ.
**ಸೆಟ್ಟಿಂಗ್ಗಳು > ಸಿಸ್ಟಮ್ ಮತ್ತು ಸಂಗ್ರಹಣೆ > ಕ್ಯಾಶ್ ಗಾತ್ರ** **1 ರಿಂದ
1,000,000 KiB** ವರೆಗಿನ ಪೂರ್ಣಾಂಕ ಮೌಲ್ಯಗಳನ್ನು ಸ್ವೀಕರಿಸುತ್ತದೆ; ಸೆಟ್ಟಿಂಗ್ ಅನ್ನು ಉಳಿಸಿದಾಗ ಅದು ಚಾಲ್ತಿಯಲ್ಲಿರುವ ಡೇಟಾಬೇಸ್ ಸಂಪರ್ಕಕ್ಕೆ ಅನ್ವಯವಾಗುತ್ತದೆ,
ಮತ್ತು ಪ್ರಾರಂಭದ ಸಮಯದಲ್ಲಿ OmniRoute ಉಳಿಸಲಾದ ಮೌಲ್ಯವನ್ನು ಮರುಸ್ಥಾಪಿಸುತ್ತದೆ.

---

## ಡೇಟಾಬೇಸ್ ಸ್ಥಳ

SQLite ಫೈಲ್ ಅನ್ನು ಇಲ್ಲಿ ಸಂಗ್ರಹಿಸಲಾಗುತ್ತದೆ:

| OS      | ಪಥ                                                              |
| ------- | --------------------------------------------------------------- |
| Linux   | `~/.omniroute/storage.sqlite`                                   |
| macOS   | `~/.omniroute/storage.sqlite`                                   |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                       |
| Docker  | `/app/data/storage.sqlite` (`DATA_DIR` ಮೂಲಕ ಕಾನ್ಫಿಗರ್ ಮಾಡಬಹುದು) |

ಜೊತೆಗಿರುವ ಫೈಲ್ಗಳು:

- `storage.sqlite-wal` — ರೈಟ್-ಅಹೆಡ್ ಲಾಗ್
- `storage.sqlite-shm` — ಹಂಚಿಕೆಯ ಮೆಮೊರಿ ಫೈಲ್
- `call_logs/` — ವಿನಂತಿ ಪೇಲೋಡ್ ಆರ್ಟಿಫ್ಯಾಕ್ಟ್ಗಳು (ಸಕ್ರಿಯಗೊಳಿಸಿದ್ದರೆ)

**ಸ್ಥಳವನ್ನು ಅತಿಕ್ರಮಿಸಿ:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## ಡೊಮೇನ್ ಮಾಡ್ಯೂಲ್ ಆರ್ಕಿಟೆಕ್ಚರ್

OmniRoute ನ ಡೇಟಾಬೇಸ್ `src/lib/db/` ನಲ್ಲಿ **110 ಉನ್ನತ-ಹಂತದ TypeScript ಮಾಡ್ಯೂಲ್ಗಳನ್ನು** ಹೊಂದಿದೆ. ಪ್ರತಿಯೊಂದು ಡೊಮೇನ್ ಮಾಡ್ಯೂಲ್:

- ಒಂದು ಅಥವಾ ಹೆಚ್ಚು ನಿರ್ದಿಷ್ಟ ಟೇಬಲ್ಗಳ ಮಾಲೀಕತ್ವವನ್ನು ಹೊಂದಿರುತ್ತದೆ
- ಟೈಪ್ ಮಾಡಲಾದ CRUD ಫಂಕ್ಷನ್ಗಳನ್ನು ರಫ್ತು ಮಾಡುತ್ತದೆ
- ಮತ್ತೊಂದು ಮಾಡ್ಯೂಲ್ನ ಟೇಬಲ್ಗಳನ್ನು ಎಂದಿಗೂ ಬಳಸುವುದಿಲ್ಲ
- DB ಅನ್ನು ಪ್ರವೇಶಿಸಲು `core.ts` ನಿಂದ `getDbInstance()` ಅನ್ನು ಬಳಸುತ್ತದೆ

### 110 ಉನ್ನತ-ಹಂತದ DB ಮಾಡ್ಯೂಲ್ಗಳು

OmniRoute, `src/lib/db/` ನಲ್ಲಿ **110 ಉನ್ನತ-ಹಂತದ TypeScript ಫೈಲ್ಗಳನ್ನು** ಹೊಂದಿದೆ. ಪ್ರಮುಖ ಮಾಡ್ಯೂಲ್ಗಳ ಕೆಲವು ಉದಾಹರಣೆಗಳನ್ನು ಕೆಳಗೆ ನೀಡಲಾಗಿದೆ; ಸಂಪೂರ್ಣ ಪಟ್ಟಿಗಾಗಿ ಡೈರೆಕ್ಟರಿ ಪಟ್ಟಿಯನ್ನು ನೋಡಿ:

| ಮಾಡ್ಯೂಲ್                | ಟೇಬಲ್ಗಳು                                                       | ಜವಾಬ್ದಾರಿ                                                                             |
| ----------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | OAuth/API ಕೀ ಪ್ರೊವೈಡರ್ ನೋಂದಣಿ ಮತ್ತು ರುಜುವಾತುಗಳು                                       |
| `models.ts`             | `key_value` (ಮಾಡೆಲ್ ಡೇಟಾ)                                      | ಮಾಡೆಲ್ ವ್ಯಾಖ್ಯಾನಗಳು, ಸಾಮರ್ಥ್ಯಗಳು, ಬೆಲೆ ನಿಗದಿ                                          |
| `combos.ts`             | `combos`                                                       | ಕಾಂಬೊ ರೂಟಿಂಗ್ ಕಾನ್ಫಿಗ್ಗಳು ಮತ್ತು ಕ್ರಮಗೊಳಿಸುವಿಕೆ                                        |
| `apiKeys.ts`            | `api_keys`                                                     | API ಕೀ ಜೀವನಚಕ್ರ, ಸ್ಕೋಪ್ಗಳು, ಕೋಟಾ ಟ್ರ್ಯಾಕಿಂಗ್                                          |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | ಸಿಸ್ಟಂ ಕಾನ್ಫಿಗರೇಶನ್ ಮತ್ತು ಹಂಚಿಕೆಯ KV ಸ್ಟೋರ್                                           |
| `backup.ts`             | —                                                              | ಬ್ಯಾಕಪ್ ರಫ್ತು/ಆಮದು ಕಾರ್ಯಾಚರಣೆಗಳು                                                      |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | ಪ್ರಾಕ್ಸಿ ಕಾನ್ಫಿಗ್ಗಳು ಮತ್ತು ರೂಟಿಂಗ್ ನಿಯಮಗಳು                                            |
| `prompts.ts`            | `prompt_templates`                                             | ಮರುಬಳಕೆ ಮಾಡಬಹುದಾದ ಪ್ರಾಂಪ್ಟ್ ಟೆಂಪ್ಲೇಟ್ಗಳು, ಆವೃತ್ತಿ ನಿರ್ವಹಣೆ                            |
| `webhooks.ts`           | `webhooks`                                                     | ಈವೆಂಟ್-ಚಾಲಿತ ವೆಬ್ಹುಕ್ ಚಂದಾದಾರಿಕೆಗಳು ಮತ್ತು ಲಾಗ್ಗಳು                                     |
| `detailedLogs.ts`       | `request_detail_logs`                                          | ಪ್ರತಿ ವಿನಂತಿಯ ಆಡಿಟ್ ಲಾಗಿಂಗ್ (ಐಚ್ಛಿಕ, ಹೆಚ್ಚಿನ ಪ್ರಮಾಣ)                                  |
| `domainState.ts`        | `domain_*` (5 ಟೇಬಲ್ಗಳು)                                        | ಡೊಮೇನ್ ಬಜೆಟ್ಗಳು, ಸರ್ಕ್ಯೂಟ್ ಬ್ರೇಕರ್ಗಳು, ಲಾಕ್ಔಟ್ಗಳು, ಫಾಲ್ಬ್ಯಾಕ್ ಸರಪಳಿಗಳು, ವೆಚ್ಚದ ಇತಿಹಾಸ |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | MCP/A2A ಗಾಗಿ ಶ್ವೇತಪಟ್ಟಿ ಮಾಡಲಾದ API ಕೀಗಳು                                              |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | ಐತಿಹಾಸಿಕ ಕೋಟಾ ಬಳಕೆ                                                                    |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | ಮಾಡೆಲ್ಗಳನ್ನು ಕಾಂಬೊ ಡೀಫಾಲ್ಟ್ಗಳಿಗೆ ಮ್ಯಾಪ್ ಮಾಡುವುದು                                      |
| `cliToolState.ts`       | `cli_tool_state`                                               | CLI-ನಿರ್ದಿಷ್ಟ ಸ್ಥಿರ ಸ್ಥಿತಿ                                                            |
| `encryption.ts`         | —                                                              | ಫೀಲ್ಡ್ಗಳನ್ನು ಎನ್ಕ್ರಿಪ್ಟ್/ಡೀಕ್ರಿಪ್ಟ್ ಮಾಡಲು ಸಹಾಯಕಗಳು                                    |
| `readCache.ts`          | —                                                              | ಹೆಚ್ಚು ರೀಡ್ ಕಾರ್ಯಾಚರಣೆಗಳಿಗಾಗಿ ಇನ್-ಮೆಮೊರಿ ಕ್ಯಾಶ್                                       |
| `secrets.ts`            | `key_value` (ಎನ್ಕ್ರಿಪ್ಟ್ ಮಾಡಲಾದ ನಮೂದುಗಳು)                      | ಎನ್ಕ್ರಿಪ್ಟ್ ಮಾಡಲಾದ ರಹಸ್ಯಗಳ ಸಂಗ್ರಹಣೆ                                                   |
| `stateReset.ts`         | —                                                              | ಪರೀಕ್ಷೆಗಾಗಿ DB ಸ್ಥಿತಿಯನ್ನು ಅಳಿಸುವುದು/ಮರುಹೊಂದಿಸುವುದು                                   |
| `contextHandoffs.ts`    | `context_handoffs`                                             | ಏಜೆಂಟ್ ಹ್ಯಾಂಡ್ಆಫ್ಗಾಗಿ ಸೆಷನ್ ಸಂದರ್ಭ                                                    |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | ಬಳಕೆಯ ಟ್ರ್ಯಾಕಿಂಗ್                                                                     |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | ಕಂಪ್ರೆಷನ್ ಕಾನ್ಫಿಗ್                                                                    |

### ಮಾಡ್ಯೂಲ್ ಗಡಿಗಳು

ಒಂದು ಪ್ರಮುಖ ಆರ್ಕಿಟೆಕ್ಚರಲ್ ನಿಯಮ: **ಮಾಡ್ಯೂಲ್ಗಳು ಪರಸ್ಪರರ ಟೇಬಲ್ಗಳನ್ನು ನೇರವಾಗಿ ಪ್ರವೇಶಿಸುವುದಿಲ್ಲ**. ಮತ್ತೊಂದು ಮಾಡ್ಯೂಲ್ನ ಡೇಟಾದೊಂದಿಗೆ ಕೆಲಸ ಮಾಡಲು, ಆ ಮಾಡ್ಯೂಲ್ನಿಂದ ಫಂಕ್ಷನ್ ಅನ್ನು ಆಮದು ಮಾಡಿ.

```ts
// ❌ ತಪ್ಪು: ಮತ್ತೊಂದು ಮಾಡ್ಯೂಲ್ನಿಂದ ನೇರ SQL
db.prepare("SELECT * FROM provider_connections").all();

// ✅ ಸರಿ: providers ಮಾಡ್ಯೂಲ್ನ ಫಂಕ್ಷನ್ ಅನ್ನು ಬಳಸಿ
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

ಈ ನಿಯಮವನ್ನು ಕೋಡ್ ಪರಿಶೀಲನೆಯ ಮೂಲಕ ಜಾರಿಗೊಳಿಸಲಾಗುತ್ತದೆ — ಯಾವುದೇ ಸ್ಥಿರ ಪರಿಶೀಲನೆ ಇಲ್ಲ, ಆದರೆ ಉಲ್ಲಂಘನೆಗಳನ್ನು ಗುರುತಿಸಲಾಗುತ್ತದೆ.

---

## ಮೂಲ ಸ್ಕೀಮಾ (17 ಟೇಬಲ್ಗಳು)

`core.ts`, `SCHEMA_SQL` ನಲ್ಲಿ 17 ಮೂಲ ಟೇಬಲ್ಗಳನ್ನು ವ್ಯಾಖ್ಯಾನಿಸುತ್ತದೆ. ಇವುಗಳನ್ನು `001_initial_schema.sql` ಮೈಗ್ರೇಶನ್ ರಚಿಸುತ್ತದೆ ಮತ್ತು ಇವು ಕೋರ್ ಸ್ಕೀಮಾವನ್ನು ರೂಪಿಸುತ್ತವೆ.

### ಕೋರ್ ಟೇಬಲ್ಗಳು (ಆರಂಭಿಕ ಮೈಗ್ರೇಶನ್ನಲ್ಲಿ ರಚಿಸಲಾಗಿದೆ)

| ಟೇಬಲ್                      | ಉದ್ದೇಶ                                            | ಪ್ರಮುಖ ಕಾಲಮ್ಗಳು                                                         |
| -------------------------- | ------------------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | ಪ್ರೊವೈಡರ್ ದೃಢೀಕರಣ ವಿವರಗಳು (ಎನ್ಕ್ರಿಪ್ಟ್ ಮಾಡಲಾಗಿದೆ) | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | ಪ್ರೊವೈಡರ್ ನೋಡ್ ರೂಟಿಂಗ್ ಮಾಹಿತಿ                     | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | ಸಾಮಾನ್ಯ KV ಸಂಗ್ರಹ                                 | `namespace`, `key`, `value`                                             |
| `combos`                   | ರೂಟಿಂಗ್ ಕಾಂಬೊ ವ್ಯಾಖ್ಯಾನಗಳು                        | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | ಗೇಟ್ವೇಗಾಗಿ API ಕೀಗಳು                              | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | ಡೇಟಾಬೇಸ್ ಮೆಟಾಡೇಟಾ                                 | `key`, `value`                                                          |
| `usage_history`            | ವಿನಂತಿ ಬಳಕೆಯ ದಾಖಲೆಗಳು                             | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | ವಿನಂತಿಯ ಪೇಲೋಡ್ಗಳು ಮತ್ತು ಪ್ರತಿಕ್ರಿಯೆಗಳು            | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | ಪ್ರಾಕ್ಸಿ ವಿನಂತಿ ಲಾಗ್ಗಳು                           | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | ಮಾಡೆಲ್ನಿಂದ ಪ್ರೊವೈಡರ್ಗೆ ಚೈನ್ಗಳು                    | `model`, `chain`                                                        |
| `domain_budgets`           | ಪ್ರತಿ-ಡೊಮೇನ್ ವೆಚ್ಚದ ಬಜೆಟ್ಗಳು                      | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | ಬಜೆಟ್ ಮರುಹೊಂದಿಕೆ ಇತಿಹಾಸ                           | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | ಪ್ರತಿ-ಡೊಮೇನ್ ವೆಚ್ಚ ಟ್ರ್ಯಾಕಿಂಗ್                    | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | ಡೊಮೇನ್ ದರ-ಮಿತಿ ಸ್ಥಿತಿ                             | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | ಪ್ರತಿ ಡೊಮೇನ್ಗೆ ಸರ್ಕ್ಯೂಟ್ ಬ್ರೇಕರ್ ಸ್ಥಿತಿ           | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | LLM ಪ್ರತಿಕ್ರಿಯೆ ಕ್ಯಾಶ್                            | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | ಐತಿಹಾಸಿಕ ಕೋಟಾ ಸ್ನ್ಯಾಪ್ಶಾಟ್ಗಳು                     | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### ಹೆಚ್ಚುವರಿ ಟೇಬಲ್ಗಳು (ನಂತರದ ಮೈಗ್ರೇಶನ್ಗಳಿಂದ ಸೇರಿಸಲಾದವು)

ನಂತರದ ಮೈಗ್ರೇಶನ್ಗಳು ಈ ಕೆಳಗಿನ ಟೇಬಲ್ಗಳನ್ನು ಸೇರಿಸುತ್ತವೆ:

- `cli_tool_state` (ಮೈಗ್ರೇಶನ್ 011) — CLI ಟೂಲ್ ಸ್ಥಿತಿ
- `mcp_*` ಟೇಬಲ್ಗಳು — MCP ಸರ್ವರ್ ಆಡಿಟ್
- `a2a_*` ಟೇಬಲ್ಗಳು — A2A ಕಾರ್ಯ ಸ್ಥಿತಿ
- `usage_*` ಟೇಬಲ್ಗಳು — ಬಳಕೆ ಟ್ರ್ಯಾಕಿಂಗ್
- `plugin_*` ಟೇಬಲ್ಗಳು — ಪ್ಲಗಿನ್ ಸಿಸ್ಟಮ್
- `skill_executions` — ಕೌಶಲ್ಯ ಕಾರ್ಯಗತಗೊಳಿಸುವಿಕೆಯ ಇತಿಹಾಸ
- `memory_*` ಟೇಬಲ್ಗಳು — ಮೆಮೊರಿ ಸಿಸ್ಟಮ್
- `compression_*` ಟೇಬಲ್ಗಳು — ಕಂಪ್ರೆಷನ್ ಸಿಸ್ಟಮ್
- `webhook_*` ಟೇಬಲ್ಗಳು — ವೆಬ್ಹುಕ್ ವಿತರಣಾ ಲಾಗ್
- `acp_*` ಟೇಬಲ್ಗಳು — ಏಜೆಂಟ್ ಕ್ಲೈಂಟ್ ಪ್ರೋಟೋಕಾಲ್
- `oneproxy_*` ಟೇಬಲ್ಗಳು — 1proxy ಮಾರುಕಟ್ಟೆ
- `proxy_assignments` — ಪ್ರಾಕ್ಸಿ ವ್ಯಾಪ್ತಿ ಬೈಂಡಿಂಗ್ಗಳು
- `detailed_call_artifacts` — ಕಾಲ್ ಲಾಗ್ ಆರ್ಟಿಫ್ಯಾಕ್ಟ್ಗಳ ಮೆಟಾಡೇಟಾ
- `quota_alert_history` — ಕೋಟಾ ಎಚ್ಚರಿಕೆ ಆಡಿಟ್
- `command_code_auth_sessions` — Command Code OAuth ಸೆಷನ್ಗಳು

~30+ ಟೇಬಲ್ಗಳ ಸಂಪೂರ್ಣ ಪಟ್ಟಿ `src/lib/db/migrations/` ನಲ್ಲಿದೆ.

---

## ಮೈಗ್ರೇಶನ್ಗಳು

OmniRoute, `src/lib/db/migrations/` ನಲ್ಲಿ **ಆವೃತ್ತೀಕರಿಸಿದ, ಐಡೆಂಪೋಟೆಂಟ್ ಮೈಗ್ರೇಶನ್ಗಳನ್ನು** ಬಳಸುತ್ತದೆ. ಪ್ರತಿಯೊಂದು ಮೈಗ್ರೇಶನ್ `NNN_description.sql` ಎಂದು ಹೆಸರಿಸಲಾದ ಒಂದೇ SQL ಫೈಲ್ ಆಗಿರುತ್ತದೆ.

### ಮೈಗ್ರೇಶನ್ ಹೆಸರಿಸುವಿಕೆ

```
001_initial_schema.sql
002_mcp_a2a_tables.sql
003_provider_node_custom_paths.sql
...
021_combo_call_log_targets.sql
```

### ಮೈಗ್ರೇಶನ್ಗಳು ಹೇಗೆ ರನ್ ಆಗುತ್ತವೆ

ಪ್ರಾರಂಭದ ವೇಳೆ, `migrationRunner.ts`:

1. `_omniroute_migrations` ಟೇಬಲ್ ಅಸ್ತಿತ್ವದಲ್ಲಿಲ್ಲದಿದ್ದರೆ ಅದನ್ನು ರಚಿಸುತ್ತದೆ
2. ಈಗಾಗಲೇ ಅನ್ವಯಿಸಲಾದ ಮೈಗ್ರೇಶನ್ಗಳನ್ನು ಕ್ವೆರಿ ಮಾಡುತ್ತದೆ
3. ಯಾವುದೇ ಹೊಸ ಮೈಗ್ರೇಶನ್ಗಳನ್ನು ಕ್ರಮವಾಗಿ ಅನ್ವಯಿಸುತ್ತದೆ, ಪ್ರತಿಯೊಂದನ್ನೂ ಒಂದು ಟ್ರಾನ್ಸಾಕ್ಷನ್ನಲ್ಲಿ ನಡೆಸುತ್ತದೆ
4. ಅನ್ವಯಿಸಲಾದ ಪ್ರತಿಯೊಂದು ಮೈಗ್ರೇಶನ್ ಅನ್ನು ಟೈಮ್ಸ್ಟ್ಯಾಂಪ್ನೊಂದಿಗೆ ದಾಖಲಿಸುತ್ತದೆ

```ts
// src/lib/db/migrationRunner.ts (ಸರಳೀಕೃತ)
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

### ಐಡೆಂಪೋಟೆನ್ಸಿ

ಮೈಗ್ರೇಶನ್ಗಳು **ಐಡೆಂಪೋಟೆಂಟ್** ಆಗಿರಬೇಕು — ಅವುಗಳನ್ನು ಎರಡು ಬಾರಿ ರನ್ ಮಾಡಿದರೂ ಯಾವುದೇ ಹೆಚ್ಚುವರಿ ಪರಿಣಾಮ ಉಂಟಾಗಬಾರದು:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

`IF NOT EXISTS`, `IF EXISTS`, ಮತ್ತು `OR IGNORE` / `OR REPLACE` ಕ್ಲಾಸ್ಗಳನ್ನು ಧಾರಾಳವಾಗಿ ಬಳಸಿ.

### ಹೊಸ ಮೈಗ್ರೇಶನ್ ಸೇರಿಸುವುದು

1. **ಮುಂದಿನ ಸಂಖ್ಯೆಯನ್ನು ಗುರುತಿಸಿ**: `ls src/lib/db/migrations/ | tail -1`
2. **ಫೈಲ್ ರಚಿಸಿ**: `NNN_my_change.sql`
3. **ಸುರಕ್ಷಿತ DDL ಬಳಸಿ**: `CREATE TABLE IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
4. **ಡೇಟಾವನ್ನು ಎಚ್ಚರಿಕೆಯಿಂದ ಬ್ಯಾಕ್ಫಿಲ್ ಮಾಡಿ**: ಅಸ್ತಿತ್ವದಲ್ಲಿರುವ ಸಾಲುಗಳನ್ನು ನಿರ್ವಹಿಸಲು `UPDATE ... WHERE ...` ಬಳಸಿ
5. **ಪ್ರತಿಯೊಂದರ ಮೇಲೆ ಪರೀಕ್ಷಿಸಿ**: ಪರೀಕ್ಷಿಸದ ಮೈಗ್ರೇಶನ್ಗಳನ್ನು ಪ್ರೊಡಕ್ಷನ್ನಲ್ಲಿ ಎಂದಿಗೂ ರನ್ ಮಾಡಬೇಡಿ

ಉದಾಹರಣೆ:

```sql
-- 022_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **ಹಿಂದಿನ ಆವೃತ್ತಿಗಳೊಂದಿಗೆ ಹೊಂದಾಣಿಕೆಯಾಗದ ಬದಲಾವಣೆಗಳನ್ನು** (ಉದಾ., ಕಾಲಮ್ಗಳನ್ನು ತೆಗೆದುಹಾಕುವುದು) ನಿರ್ವಹಿಸುವುದು ಸಂಕೀರ್ಣವಾಗಿದೆ. OmniRoute ಡೌನ್ಗ್ರೇಡ್ ಅನ್ನು ಬೆಂಬಲಿಸುವುದಿಲ್ಲ — ಒಮ್ಮೆ ಮೈಗ್ರೇಶನ್ ಅನ್ವಯಿಸಿದ ನಂತರ, ಸ್ಕೀಮಾ ಬದಲಾವಣೆ ಶಾಶ್ವತವಾಗಿರುತ್ತದೆ. ಅದಕ್ಕೆ ಅನುಗುಣವಾಗಿ ಯೋಜಿಸಿ.

---

## ಸಂಗ್ರಹಿತ ಡೇಟಾದ ಎನ್ಕ್ರಿಪ್ಶನ್

ಸೂಕ್ಷ್ಮ ಫೀಲ್ಡ್ಗಳನ್ನು (API ಕೀಗಳು, OAuth ಟೋಕನ್ಗಳು, ಕನೆಕ್ಷನ್ ಸ್ಟ್ರಿಂಗ್ಗಳು) **AES-256-GCM** ಬಳಸಿ ಸಂಗ್ರಹಿತ ಸ್ಥಿತಿಯಲ್ಲಿ ಎನ್ಕ್ರಿಪ್ಟ್ ಮಾಡಲಾಗುತ್ತದೆ.

### ಇದು ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ

```ts
// src/lib/db/encryption.ts (ಸರಳೀಕೃತ)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### ಇದನ್ನು ಎಲ್ಲಿ ಬಳಸಲಾಗುತ್ತದೆ

- `provider_connections.api_key` — ಅಪ್ಲಿಕೇಶನ್ ಮಟ್ಟದಲ್ಲಿ ಎನ್ಕ್ರಿಪ್ಟ್ ಮಾಡಲಾಗಿದೆ
- `provider_connections.access_token`, `refresh_token`, `id_token` — ಅಪ್ಲಿಕೇಶನ್ ಮಟ್ಟದಲ್ಲಿ ಎನ್ಕ್ರಿಪ್ಟ್ ಮಾಡಲಾಗಿದೆ
- `namespace = "secrets"` ಹೊಂದಿರುವ `key_value` ನಮೂದುಗಳು — ಅಪ್ಲಿಕೇಶನ್ ಮಟ್ಟದಲ್ಲಿ ಎನ್ಕ್ರಿಪ್ಟ್ ಮಾಡಲಾಗಿದೆ
- `proxy_registry.auth` — ಅಪ್ಲಿಕೇಶನ್ ಮಟ್ಟದಲ್ಲಿ ಎನ್ಕ್ರಿಪ್ಟ್ ಮಾಡಲಾಗಿದೆ (ಇದ್ದರೆ)

### ಎನ್ಕ್ರಿಪ್ಶನ್ ಕೀ

ಎನ್ಕ್ರಿಪ್ಶನ್ ಕೀಯನ್ನು ಒಂದು **ಪಾಸ್ಫ್ರೇಸ್** (`STORAGE_ENCRYPTION_KEY` ಎನ್ವಿರಾನ್ಮೆಂಟ್ ವೇರಿಯಬಲ್ ಮೂಲಕ ಹೊಂದಿಸಲಾಗಿದೆ) ಮತ್ತು ಒಂದು **ಸಾಲ್ಟ್** (DB ಯಲ್ಲಿ ಸಂಗ್ರಹಿಸಲಾಗಿದೆ) ನಿಂದ ಪಡೆಯಲಾಗುತ್ತದೆ. ಡೇಟಾವನ್ನು ಡೀಕ್ರಿಪ್ಟ್ ಮಾಡಲು ಇವೆರಡೂ ಅಗತ್ಯವಿವೆ.

```bash
# ಸುರಕ್ಷಿತ ಪಾಸ್ಫ್ರೇಸ್ ರಚಿಸಿ
openssl rand -hex 32

# .env ನಲ್ಲಿ ಹೊಂದಿಸಿ
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **ಅತ್ಯಂತ ಮುಖ್ಯ**: ಎನ್ಕ್ರಿಪ್ಶನ್ ಕೀ ಕಳೆದುಹೋದರೆ, ಎಲ್ಲಾ ಎನ್ಕ್ರಿಪ್ಟ್ ಮಾಡಿದ ಡೇಟಾಗೆ ಪ್ರವೇಶವನ್ನು ಕಳೆದುಕೊಳ್ಳುತ್ತೀರಿ. **ಕೀಯನ್ನು ಡೇಟಾಬೇಸ್ನಿಂದ ಪ್ರತ್ಯೇಕವಾಗಿ ಬ್ಯಾಕಪ್ ಮಾಡಿ**.

### ಎನ್ಕ್ರಿಪ್ಟ್ ಮಾಡದಿರುವುದು ಯಾವುದು

ಕಾರ್ಯಕ್ಷಮತೆಯ ಕಾರಣಗಳಿಂದ, ಕೆಳಗಿನವುಗಳನ್ನು ಪ್ಲೇನ್ಟೆಕ್ಸ್ಟ್ನಲ್ಲಿ ಸಂಗ್ರಹಿಸಲಾಗುತ್ತದೆ:

- ಪ್ರೊವೈಡರ್ ಪ್ರದರ್ಶನ ಹೆಸರುಗಳು
- ಮಾಡೆಲ್ ವ್ಯಾಖ್ಯಾನಗಳು (ಈಗಾಗಲೇ ಸಾರ್ವಜನಿಕವಾಗಿವೆ)
- ರೂಟಿಂಗ್ ನಿಯಮಗಳು
- ಬಳಕೆಯ ದಾಖಲೆಗಳು (ಯಾವುದೇ PII ಇಲ್ಲ)

---

## ಎನ್ಕ್ರಿಪ್ಶನ್ ಮುನ್ನೆಚ್ಚರಿಕೆಗಳು (v3.8.16+)

ಎರಡು ಎನ್ಕ್ರಿಪ್ಶನ್ ವಿಧಾನಗಳನ್ನು ಪಾರದರ್ಶಕವಾಗಿ ನಿರ್ವಹಿಸಲು OmniRoute **`migrateLegacyEncryptedString()`** ಅನ್ನು ಬಳಸುತ್ತದೆ:

- **ಹಳೆಯದು** (v3.5.0 ಕ್ಕಿಂತ ಮೊದಲು): XOR-ಆಧಾರಿತ "ಎನ್ಕ್ರಿಪ್ಶನ್" (ನೈಜ ಕ್ರಿಪ್ಟೋಗ್ರಫಿ ಅಲ್ಲ)
- **ಪ್ರಸ್ತುತ**: ಸೂಕ್ತ IV ಮತ್ತು ದೃಢೀಕರಣ ಟ್ಯಾಗ್ನೊಂದಿಗೆ AES-256-GCM

ವಲಸೆ ಸಹಾಯಕವು ಹಳೆಯ ಸ್ವರೂಪವನ್ನು ಪತ್ತೆಹಚ್ಚಿ, ಮೊದಲ ಬಾರಿ ಓದುವಾಗ ಹೊಸ ವಿಧಾನದಿಂದ ಮರು-ಎನ್ಕ್ರಿಪ್ಟ್ ಮಾಡುತ್ತದೆ. ಇದರರ್ಥ ರುಜುವಾತುಗಳನ್ನು ಕಳೆದುಕೊಳ್ಳದೆ ನೀವು ಹಳೆಯ ಡೇಟಾಬೇಸ್ ಅನ್ನು ಅಪ್ಗ್ರೇಡ್ ಮಾಡಬಹುದು.

---

## ಓದುವಿಕೆ ಕ್ಯಾಶ್

ಆಗಾಗ್ಗೆ ಓದಲಾಗುವ ಡೇಟಾಕ್ಕಾಗಿ (ಮಾದರಿಗಳು, ಪೂರೈಕೆದಾರರು, ಸೆಟ್ಟಿಂಗ್ಗಳು), `readCache.ts` ಒಂದು **ಇನ್-ಮೆಮೊರಿ ಕ್ಯಾಶ್** ಅನ್ನು ಒದಗಿಸುತ್ತದೆ:

```ts
// ಪ್ರಾರಂಭದ ಸಮಯದಲ್ಲಿ ಕ್ಯಾಶ್ ಮಾಡಲಾಗುತ್ತದೆ, ಬರೆಯುವಾಗ ಅಮಾನ್ಯಗೊಳಿಸಲಾಗುತ್ತದೆ
const providers = await getCachedProviders(); // ವೇಗವಾದ, ಇನ್-ಮೆಮೊರಿ
const fresh = await listProviders(); // ನಿಧಾನವಾದ, DB ಅನ್ನು ಪ್ರವೇಶಿಸುತ್ತದೆ
```

| ಕ್ಯಾಶ್ ಮಾಡಲಾದ ಘಟಕ      | ಕ್ಯಾಶ್ ಕೀ      | TTL         |
| ---------------------- | -------------- | ----------- |
| `models`               | `models:v1`    | ಬರೆಯುವವರೆಗೆ |
| `provider_connections` | `providers:v1` | ಬರೆಯುವವರೆಗೆ |
| `settings`             | `settings:v1`  | ಬರೆಯುವವರೆಗೆ |
| `combos`               | `combos:v1`    | ಬರೆಯುವವರೆಗೆ |

ಅನುಗುಣವಾದ ಕೋಷ್ಟಕಕ್ಕೆ ಪ್ರತಿ ಬಾರಿ ಬರೆಯುವಾಗ ಕ್ಯಾಶ್ ಅನ್ನು ಅಮಾನ್ಯಗೊಳಿಸಲಾಗುತ್ತದೆ.

---

## ಬ್ಯಾಕಪ್ ಮತ್ತು ಮರುಪಡೆಯುವಿಕೆ

### ಹಸ್ತಚಾಲಿತ ಬ್ಯಾಕಪ್

```bash
# ಸ್ಥಳೀಯ ಬ್ಯಾಕಪ್ ರಚಿಸಲು CLI ಬಳಸಿ
omniroute backup create --name pre-migration

# ಅಥವಾ API ಮೂಲಕ
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

ಬ್ಯಾಕಪ್ ಫೈಲ್ ಇವುಗಳನ್ನು ಒಳಗೊಂಡಿರುತ್ತದೆ:

- ಎಲ್ಲಾ DB ಕೋಷ್ಟಕಗಳು (JSON ಗೆ ಸೀರಿಯಲೈಸ್ ಮಾಡಲಾದವು)
- ಕರೆ ಲಾಗ್ ಆರ್ಟಿಫ್ಯಾಕ್ಟ್ಗಳು (base64-ಎನ್ಕೋಡ್ ಮಾಡಲಾದವು, ಐಚ್ಛಿಕ)
- ಸೆಟ್ಟಿಂಗ್ಗಳು + ರಹಸ್ಯಗಳು (ಎನ್ಕ್ರಿಪ್ಟ್ ಮಾಡಲಾದವು)
- ಪ್ಲಗಿನ್ ಸಂರಚನೆ

### ಮರುಸ್ಥಾಪನೆ

```bash
# CLI ಮೂಲಕ
omniroute restore pre-migration

# API ಮೂಲಕ
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **ಎಚ್ಚರಿಕೆ**: ಮರುಸ್ಥಾಪನೆಯು ಸಂಪೂರ್ಣ DB ಅನ್ನು ತಿದ್ದಿಬರೆಯುತ್ತದೆ. ಮೊದಲು ಎಲ್ಲಾ ಕ್ಲೈಂಟ್ಗಳನ್ನು ನಿಲ್ಲಿಸಿ.

### ಸ್ವಯಂಚಾಲಿತ ಬ್ಯಾಕಪ್ಗಳು

```bash
# CLI ಮೂಲಕ ಸ್ವಯಂಚಾಲಿತ ದೈನಂದಿನ ಬ್ಯಾಕಪ್ಗಳನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಿ
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

ವೇಳಾಪಟ್ಟಿಯನ್ನು ಸರ್ವರ್ನಲ್ಲಿನ ಹಿನ್ನೆಲೆ ಜಾಬ್ ಕಾರ್ಯಗತಗೊಳಿಸುತ್ತದೆ; ಅದು ಪ್ರತಿ 30 ಸೆಕೆಂಡಿಗೆ
(ಡೀಫಾಲ್ಟ್) ಟಿಕ್ ಆಗುತ್ತದೆ ಮತ್ತು ಸ್ಥಳೀಯ ಸರ್ವರ್ ಸಮಯದ ವಿರುದ್ಧ cron ಎಕ್ಸ್ಪ್ರೆಶನ್ ಅನ್ನು ಮೌಲ್ಯಮಾಪನ ಮಾಡುತ್ತದೆ.

| ವೇರಿಯಬಲ್                                    | ಡೀಫಾಲ್ಟ್ | ವಿವರಣೆ                                                                                                               |
| ------------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`  | ms ನಲ್ಲಿ ಟಿಕ್ ಮಧ್ಯಂತರ (ಕನಿಷ್ಠ `5000`). ಹೊಂದಿಕೆಯಾಗುವ cron ನಿಮಿಷದೊಳಗೆ ವಿಶ್ವಾಸಾರ್ಹವಾಗಿ ಬರಲು ಇದು 60 s ಗಿಂತ ಕಡಿಮೆ ಇರಬೇಕು. |

### SQLite ಹಾಟ್ ಬ್ಯಾಕಪ್

ಚಾಲನೆಯಲ್ಲಿರುವ DB ಯನ್ನು ಯಾವುದೇ ಡೌನ್ಟೈಮ್ ಇಲ್ಲದೆ ಬ್ಯಾಕಪ್ ಮಾಡಲು:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

ಇದು SQLite ನ ಆನ್ಲೈನ್ ಬ್ಯಾಕಪ್ API ಅನ್ನು ಬಳಸುತ್ತದೆ — OmniRoute ಚಾಲನೆಯಲ್ಲಿರುವಾಗಲೂ ಇದನ್ನು ಸುರಕ್ಷಿತವಾಗಿ ಚಲಾಯಿಸಬಹುದು.

---

## ಕಾರ್ಯಕ್ಷಮತೆ ಟ್ಯೂನಿಂಗ್

### WAL ಮೋಡ್

WAL ಅನ್ನು ಪೂರ್ವನಿಯೋಜಿತವಾಗಿ ಸಕ್ರಿಯಗೊಳಿಸಲಾಗಿದೆ. ಹೆಚ್ಚಿನ ಬರವಣಿಗೆ ಕಾರ್ಯಭಾರಗಳಿಗಾಗಿ, ಇದನ್ನು ಪರಿಗಣಿಸಿ:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- ಪ್ರತಿ 1000 ಪುಟಗಳಿಗೆ ಚೆಕ್ಪಾಯಿಂಟ್ ಮಾಡಿ
PRAGMA journal_size_limit = 67108864;  -- 64MB WAL ಮಿತಿ
```

### ಸೂಚ್ಯಂಕಗಳು

ಕಾರ್ಯಕ್ಷಮತೆಗಾಗಿ ಪ್ರಮುಖ ಸೂಚ್ಯಂಕಗಳು (ಮೈಗ್ರೇಶನ್ಗಳಿಂದ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ರಚಿಸಲಾಗುತ್ತದೆ):

- `idx_models_provider` — ಪೂರೈಕೆದಾರರ ಆಧಾರದ ಮೇಲೆ ಮಾಡೆಲ್ ಹುಡುಕಾಟಗಳು
- `idx_combo_targets_combo_id` — ಕಾಂಬೊ ಗುರಿ ವಿಸ್ತರಣೆ
- `idx_usage_history_api_key_timestamp` — ಬಳಕೆ ವಿಶ್ಲೇಷಣೆ
- `idx_quota_snapshots_api_key_window` — ಕೋಟಾ ಟ್ರ್ಯಾಕಿಂಗ್
- `idx_call_logs_timestamp` — ಕರೆ ಲಾಗ್ ಪ್ರಶ್ನೆಗಳು

ಹೊಸ ಸೂಚ್ಯಂಕವನ್ನು ಸೇರಿಸಲು, ಮೈಗ್ರೇಶನ್ ರಚಿಸಿ:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### ಮೆಮೊರಿ-ಮ್ಯಾಪ್ ಮಾಡಿದ I/O

ಬಹಳ ದೊಡ್ಡ ಡೇಟಾಬೇಸ್ಗಳಿಗೆ (>10GB), SQLite pragma ಮೂಲಕ ಮೆಮೊರಿ ಮ್ಯಾಪಿಂಗ್ ಅನ್ನು ಹೊಂದಿಸಬಹುದು:

```sql
-- SQLite pragma ಮೂಲಕ ಹೊಂದಿಸಿ (core.ts ಅಥವಾ runtime ನಲ್ಲಿ ಸರಿಹೊಂದಿಸಿ)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### ಸಂಕೋಚನ

ದೀರ್ಘಕಾಲ ಚಾಲನೆಯಲ್ಲಿರುವ OmniRoute ನಿದರ್ಶನಗಳು ಸಾಂದರ್ಭಿಕ `VACUUM` ನಿಂದ ಪ್ರಯೋಜನ ಪಡೆಯುತ್ತವೆ:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

ಕಡಿಮೆ ಟ್ರಾಫಿಕ್ ಇರುವ ಅವಧಿಯಲ್ಲಿ ತಿಂಗಳಿಗೊಮ್ಮೆ ಚಲಾಯಿಸಿ. (WAL ಮೋಡ್ ಇದರ ಅಗತ್ಯವನ್ನು ಕಡಿಮೆ ಮಾಡುತ್ತದೆ, ಆದರೆ ಸಂಪೂರ್ಣವಾಗಿ ನಿವಾರಿಸುವುದಿಲ್ಲ.)

---

## ಆರೋಗ್ಯ ಪರಿಶೀಲನೆ

`src/lib/db/healthCheck.ts` **DB-ಮಟ್ಟದ ಆರೋಗ್ಯ ತಪಾಸಣೆಗಳನ್ನು** ಒದಗಿಸುತ್ತದೆ:

ಎರಡೂ ಕ್ರಿಯಾಪದಗಳಿಗೆ ದೃಢೀಕರಣದ ಅಗತ್ಯವಿದೆ (ಇಲ್ಲದಿದ್ದರೆ `401`). `GET` ಕೇವಲ ರೋಗನಿರ್ಣಯ ಮಾಡುತ್ತದೆ; `POST`,
`autoRepair` ಸಕ್ರಿಯಗೊಳಿಸಿ ಅದೇ ಪರಿಶೀಲನೆಯನ್ನು ಚಲಾಯಿಸುತ್ತದೆ.

```bash
GET  /api/db/health   # ರೋಗನಿರ್ಣಯ
POST /api/db/health   # ರೋಗನಿರ್ಣಯ + ದುರಸ್ತಿ
```

ಪ್ರತಿಕ್ರಿಯೆಯು `runDbHealthCheck()` ಉತ್ಪಾದಿಸಿದ `DbHealthCheckResult` ಆಗಿದೆ
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "Domain budgets referenced API keys that no longer exist.",
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

| ಕ್ಷೇತ್ರ           | ಅರ್ಥ                                                                                                                                        |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | `issues` ಖಾಲಿಯಾಗಿದ್ದಾಗ `true`. `driver` ಎಂದಿಗೂ ಇದರ ಮೇಲೆ ಪ್ರಭಾವ ಬೀರುವುದಿಲ್ಲ.                                                                 |
| `issues[].type`   | `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state` ಇವುಗಳಲ್ಲಿ ಒಂದು.                                             |
| `repairedCount`   | ಈ ಚಾಲನೆಯ ಸಮಯದಲ್ಲಿ ದುರಸ್ತಿಗೊಳಿಸಲಾದ ಸಾಲುಗಳು; `autoRepair` false ಆಗಿರುವಾಗ ಯಾವಾಗಲೂ `0`.                                                         |
| `backupCreated`   | ದುರಸ್ತಿ ಮಾಡುವ ಮೊದಲು ಬ್ಯಾಕಪ್ ತೆಗೆದುಕೊಳ್ಳಲಾಗಿದೆಯೇ ಎಂಬುದು.                                                                                     |
| `checkedAt`       | ಚಾಲನೆ ಮತ್ತು ಅದು ಬರೆಯುವ ಯಾವುದೇ ದುರಸ್ತಿ ಟಿಪ್ಪಣಿ ಹಂಚಿಕೊಳ್ಳುವ ISO ಕಾಲಮುದ್ರೆ.                                                                    |
| `driver.name`     | ಪರಿಶೀಲಿಸಲಾದ ಡೇಟಾಬೇಸ್ಗೆ ಸೇವೆ ಒದಗಿಸುವ SQLite ಡ್ರೈವರ್.                                                                                         |
| `driver.degraded` | ಬರವಣಿಗೆಗಳು ಡೇಟಾಬೇಸ್ ಫೈಲ್ನಿಂದ ಸ್ಥಿರವಾಗಿ ಬೆಂಬಲಿತವಾಗಿಲ್ಲದಾಗ `true` — `sql.js` WASM ಫಾಲ್ಬ್ಯಾಕ್ (ಸಂಪೂರ್ಣ-ಫೈಲ್ ಸ್ಥಿರತೆ) ಅಥವಾ ಇನ್-ಮೆಮೊರಿ ಡೇಟಾಬೇಸ್. |

ಅದೇ ಪೇಲೋಡ್ ಅನ್ನು `omniroute_db_health_check` MCP ಉಪಕರಣವು ಹಿಂತಿರುಗಿಸುತ್ತದೆ.

ದೋಷಪೂರಿತತೆಯನ್ನು ಪತ್ತೆಹಚ್ಚಲು `PRAGMA integrity_check` ಅನ್ನು ಚಲಾಯಿಸಿ:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# ಇದನ್ನು ಮುದ್ರಿಸಬೇಕು: ok
```

ಇದು `ok` ಹೊರತುಪಡಿಸಿ ಬೇರೆ ಯಾವುದನ್ನಾದರೂ ಹಿಂತಿರುಗಿಸಿದರೆ, **ಡೇಟಾಬೇಸ್ ಬಳಸುವುದನ್ನು ತಕ್ಷಣ ನಿಲ್ಲಿಸಿ** ಮತ್ತು ಬ್ಯಾಕಪ್ನಿಂದ ಮರುಸ್ಥಾಪಿಸಿ.

---

## ವಿಪತ್ತು ಮರುಪಡೆಯುವಿಕೆ

### ಸನ್ನಿವೇಶ 1: WAL ಫೈಲ್ ಕಳೆದುಹೋಗಿದೆ

`-wal` ಫೈಲ್ ಕಾಣೆಯಾಗಿದೆ, ಆದರೆ `-shm` ಮತ್ತು ಮುಖ್ಯ DB ಸುಸ್ಥಿತಿಯಲ್ಲಿವೆ:

```bash
# ಮುಂದಿನ ಬಾರಿ ತೆರೆದಾಗ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಮರುಪಡೆಯುತ್ತದೆ
omniroute
```

SQLite ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಮರುಪಡೆಯಲು ಸಾಧ್ಯವಾಗದಿದ್ದರೆ:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### ಸನ್ನಿವೇಶ 2: ಮುಖ್ಯ DB ಫೈಲ್ ಹಾನಿಗೊಂಡಿದೆ

ಬ್ಯಾಕಪ್ನಿಂದ ಮರುಸ್ಥಾಪಿಸಿ:

```bash
omniroute sync pull --merge   # ಅಥವಾ: omniroute backup restore <backup-id>
```

### ಸನ್ನಿವೇಶ 3: ಎನ್ಕ್ರಿಪ್ಶನ್ ಕೀ ಕಳೆದುಹೋಗಿದೆ

ಕೀ ಇಲ್ಲದೆ **ಮರುಪಡೆಯಲು ಸಾಧ್ಯವಿಲ್ಲ**. ಎನ್ಕ್ರಿಪ್ಟ್ ಮಾಡಿದ ಕ್ಷೇತ್ರಗಳನ್ನು ಓದಲು ಸಾಧ್ಯವಿಲ್ಲ. ಹೊಸ ರುಜುವಾತುಗಳೊಂದಿಗೆ ಎಲ್ಲಾ ಪೂರೈಕೆದಾರರನ್ನು ಹಸ್ತಚಾಲಿತವಾಗಿ ಮರುಸೇರಿಸಿ.

> **ಉಪಶಮನ**: ಎನ್ಕ್ರಿಪ್ಶನ್ ಕೀಯನ್ನು ಯಾವಾಗಲೂ ಪ್ರತ್ಯೇಕವಾಗಿ ಬ್ಯಾಕಪ್ ಮಾಡಿ, ಆದ್ಯತೆಯಾಗಿ ಪಾಸ್ವರ್ಡ್ ಮ್ಯಾನೇಜರ್ ಅಥವಾ KMS ನಲ್ಲಿ ಇರಿಸಿ.

### ಸನ್ನಿವೇಶ 4: ಡಿಸ್ಕ್ ತುಂಬಿದೆ

SQLite `SQLITE_FULL` ದೋಷಗಳನ್ನು ಹಿಂದಿರುಗಿಸುತ್ತದೆ. ಡಿಸ್ಕ್ ಸ್ಥಳವನ್ನು ಖಾಲಿ ಮಾಡಿ, ನಂತರ:

```bash
# ಸ್ಥಳವನ್ನು ಖಾಲಿ ಮಾಡಲು WAL ಚೆಕ್ಪಾಯಿಂಟ್ ಮಾಡಿ
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## ಸಾಮಾನ್ಯ ಕಾರ್ಯಾಚರಣೆಗಳು

### ಟೇಬಲ್ ಪರಿಶೀಲಿಸಿ

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### ಎಲ್ಲಾ ಟೇಬಲ್ಗಳಲ್ಲಿನ ಸಾಲುಗಳನ್ನು ಎಣಿಸಿ

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### ಎಲ್ಲಾ ಡೇಟಾವನ್ನು ಮರುಹೊಂದಿಸಿ (ಅಳಿಸಿ)

```bash
# ಮೊದಲು OmniRoute ಅನ್ನು ನಿಲ್ಲಿಸಿ
omniroute stop

# DB ಫೈಲ್ ಅಳಿಸಿ
rm ~/.omniroute/storage.sqlite*

# ಮರುಪ್ರಾರಂಭಿಸಿ (ಖಾಲಿ DB ಅನ್ನು ಮರುಸೃಷ್ಟಿಸುತ್ತದೆ)
omniroute
```

**ಆಯ್ದ** ಮರುಹೊಂದಿಸುವಿಕೆಗಾಗಿ (ಪೂರೈಕೆದಾರರನ್ನು ಉಳಿಸಿಕೊಂಡು, ಬಳಕೆಯ ಡೇಟಾವನ್ನು ಅಳಿಸಿ):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### ಒಂದೇ ಟೇಬಲ್ ಅನ್ನು ರಫ್ತು ಮಾಡಿ

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## ಸಮಸ್ಯೆ ನಿವಾರಣೆ

### "ಡೇಟಾಬೇಸ್ ಲಾಕ್ ಆಗಿದೆ"

ಮತ್ತೊಂದು ಪ್ರಕ್ರಿಯೆಯು ಬರವಣಿಗೆ ಲಾಕ್ ಅನ್ನು ಹಿಡಿದಿಟ್ಟುಕೊಂಡಿದೆ. ಈ ಕೆಳಗಿನವುಗಳಲ್ಲಿ ಒಂದನ್ನು ಮಾಡಿ:

- ಮತ್ತೊಂದು ಪ್ರಕ್ರಿಯೆ ಪೂರ್ಣಗೊಳ್ಳುವವರೆಗೆ ಕಾಯಿರಿ (`lsof | grep storage.sqlite` ಪರಿಶೀಲಿಸಿ)
- ಮತ್ತೊಂದು ಪ್ರಕ್ರಿಯೆಯನ್ನು ಕೊನೆಗೊಳಿಸಿ
- ಸಮಸ್ಯೆ ಮುಂದುವರಿದರೆ, OmniRoute ಅನ್ನು ಮರುಪ್ರಾರಂಭಿಸಿ

### "ಫಾರಿನ್ ಕೀ ನಿರ್ಬಂಧ ವಿಫಲವಾಗಿದೆ"

ಡೊಮೇನ್ ಮಾಡ್ಯೂಲ್ ಒಂದು ಉಲ್ಲೇಖಾತ್ಮಕ ಸಮಗ್ರತೆಯನ್ನು ಉಲ್ಲಂಘಿಸುತ್ತಿದೆ. ಇವುಗಳನ್ನು ಪರಿಶೀಲಿಸಿ:

- ಅವಲಂಬಿತ ಟೇಬಲ್ಗಳಲ್ಲಿನ ಅನಾಥ ಸಾಲುಗಳು
- ಪ್ರಸಾರವಾಗದ ಕ್ಯಾಸ್ಕೇಡಿಂಗ್ ಅಳಿಸುವಿಕೆಗಳು
- ಫಾರಿನ್ ಕೀಯನ್ನು ಬದಲಾಯಿಸಿದ ಇತ್ತೀಚಿನ ಮೈಗ್ರೇಶನ್

ಉಲ್ಲಂಘನೆಗಳನ್ನು ಕಂಡುಹಿಡಿಯಲು `PRAGMA foreign_key_check;` ಅನ್ನು ಚಲಾಯಿಸಿ.

### "ಮೆಮೊರಿ ಖಾಲಿಯಾಗಿದೆ"

SQLite ನ ಮೆಮೊರಿ-ಮ್ಯಾಪ್ ಮಾಡಿದ I/O, OS ಮಿತಿಯನ್ನು ಮೀರುತ್ತಿದೆ. SQLite pragma ಮೂಲಕ ಅದನ್ನು ಕಡಿಮೆ ಮಾಡಿ:

```sql
PRAGMA mmap_size = 134217728;  -- 256MB ಬದಲಿಗೆ 128MB
```

ಅಥವಾ ನಿಷ್ಕ್ರಿಯಗೊಳಿಸಿ:

```sql
PRAGMA mmap_size = 0;
```

### "ಮೈಗ್ರೇಶನ್ ಮಧ್ಯದಲ್ಲೇ ವಿಫಲವಾಗಿದೆ"

ಮೈಗ್ರೇಶನ್ ಒಂದು ಟ್ರಾನ್ಸಾಕ್ಷನ್ನಲ್ಲಿ ಚಲಿಸಿದ್ದರಿಂದ, ಅದು ರೋಲ್ಬ್ಯಾಕ್ ಆಗಿರಬೇಕು. ಹಾಗಾಗದಿದ್ದರೆ:

1. **OmniRoute ಅನ್ನು ನಿಲ್ಲಿಸಿ** (ಮುಂದಿನ ಪ್ರಯತ್ನಗಳನ್ನು ತಡೆಯಿರಿ)
2. `sqlite3` ಮೂಲಕ **DB ಸ್ಥಿತಿಯನ್ನು ಪರಿಶೀಲಿಸಿ**
3. ಅಪೂರ್ಣ ಮೈಗ್ರೇಶನ್ ಅನ್ನು **ಹಸ್ತಚಾಲಿತವಾಗಿ ಸರಿಪಡಿಸಿ**
4. OmniRoute ಅನ್ನು **ಮರುಚಲಾಯಿಸಿ** (ಮೈಗ್ರೇಶನ್ ಅನ್ನು ಪುನಃ ಪ್ರಯತ್ನಿಸಲಾಗುತ್ತದೆ)

ಇದನ್ನು ತಡೆಯಲು, ಯಾವಾಗಲೂ ಮೊದಲು ನಕಲಿನ ಮೇಲೆ ಮೈಗ್ರೇಶನ್ಗಳನ್ನು ಪರೀಕ್ಷಿಸಿ.

---

## ಇದನ್ನೂ ನೋಡಿ

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — ಬಳಕೆಯ ಟೇಬಲ್ಗಳು
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — ಆರೋಗ್ಯ ಮೇಲ್ವಿಚಾರಣೆ
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — ಬಿಡುಗಡೆ ಪ್ರಕ್ರಿಯೆ
- ಮೂಲ: `src/lib/db/` (80+ ಫೈಲ್ಗಳು, ~25K LOC)
