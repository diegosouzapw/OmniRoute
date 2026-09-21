# Database Schema & Operations Guide (മലയാളം)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **ചുരുക്കത്തിൽ**: OmniRoute അതിന്റെ പ്രാഥമിക സ്റ്റോറായി **WAL ജേർണലിങ്ങോടുകൂടിയ SQLite** ഉപയോഗിക്കുന്നു; സെൻസിറ്റീവ് ഫീൽഡുകൾ സംഭരിച്ചിരിക്കുമ്പോൾ **AES-256-GCM** എൻക്രിപ്ഷൻ പ്രയോഗിക്കുന്നു. സ്കീമ, മൈഗ്രേഷനുകൾ, ബാക്കപ്പ്/റിക്കവറി, പ്രവർത്തന റൺബുക്കുകൾ എന്നിവ ഈ ഗൈഡ് ഉൾക്കൊള്ളുന്നു.

**ഉറവിടങ്ങൾ:**

- `src/lib/db/core.ts` — സിംഗിൾടൺ + SCHEMA_SQL (17 അടിസ്ഥാന പട്ടികകൾ)
- `src/lib/db/migrationRunner.ts` — പതിപ്പ് അടിസ്ഥാനമാക്കിയുള്ള മൈഗ്രേഷനുകൾ
- `src/lib/db/migrations/` — പതിപ്പ് നൽകിയ 167 SQL ഫയലുകൾ
- `src/lib/db/encryption.ts` — എൻക്രിപ്ഷൻ സഹായികൾ
- `src/lib/db/backup.ts` — ബാക്കപ്പ് എക്സ്പോർട്ട്/ഇംപോർട്ട്
- `src/lib/db/healthCheck.ts` — ആരോഗ്യനില നിർണ്ണയം

---

## എന്തുകൊണ്ട് SQLite?

നിരവധി കാരണങ്ങളാൽ PostgreSQL/MySQL-നേക്കാൾ SQLite ആണ് OmniRoute തിരഞ്ഞെടുത്തത്:

| ഘടകം               | SQLite                                    | PostgreSQL                                      |
| ------------------ | ----------------------------------------- | ----------------------------------------------- |
| **വിന്യാസം**       | എംബെഡഡ് — പ്രത്യേക സെർവർ ആവശ്യമില്ല       | സെർവർ സജ്ജീകരണം ആവശ്യമാണ്                       |
| **എൻക്രിപ്ഷൻ**     | ആപ്ലിക്കേഷൻ-തലം (AES-256-GCM)             | ബിൽറ്റ്-ഇൻ TDE                                  |
| **പ്രകടനം**        | ചെറുതും ഇടത്തരവുമായ വർക്ക്ലോഡുകൾക്ക് വേഗത | വലിയ തോതിലുള്ള സമകാലിക റൈറ്റുകൾക്ക് മികച്ചത്    |
| **സമകാലികത**       | WAL മോഡ് സമകാലിക റീഡുകൾ അനുവദിക്കുന്നു    | സമ്പൂർണ്ണ MVCC                                  |
| **ബാക്കപ്പ്**      | ഒറ്റ ഫയലിന്റെ പകർപ്പ്                     | `pg_dump` അല്ലെങ്കിൽ ഫയൽസിസ്റ്റം സ്നാപ്പ്ഷോട്ട് |
| **ഉപയോഗ സാഹചര്യം** | ഓരോ ഉപയോക്താവിനുമുള്ള ഇൻസ്റ്റാൾ, എംബെഡഡ്  | മൾട്ടി-ടെനന്റ് SaaS                             |

**ഒറ്റ ഉപയോക്താവ്, ഒറ്റ ഇൻസ്റ്റൻസ്** വിന്യാസങ്ങൾക്ക് (OmniRoute-ന്റെ പ്രാഥമിക ഉപയോഗ സാഹചര്യം), SQLite കൂടുതൽ ലളിതവും വേഗതയേറിയതുമാണ്.

### WAL ജേർണലിങ്

`core.ts` ഡാറ്റാബേസ് **WAL (Write-Ahead Logging) മോഡിൽ** തുറക്കുന്നു:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

റൈറ്റുകൾ നടക്കുമ്പോൾ **സമകാലിക റീഡുകൾ** WAL അനുവദിക്കുന്നു — അഭ്യർത്ഥനകൾ രേഖപ്പെടുത്തുന്നതിനിടെ ക്വറികൾ നടത്തുന്ന ഡാഷ്ബോർഡിന് ഇത് പ്രധാനമാണ്.

ഡിഫോൾട്ട് കാഷ് വലുപ്പം **65,536 KiB (64 MiB)** ആണ്. നെഗറ്റീവ്
`cache_size`-നെ KiB-യിലുള്ള ഏകദേശ ഉയർന്ന പരിധിയായി SQLite വ്യാഖ്യാനിക്കുകയും ആവശ്യാനുസരണം പേജുകൾ അനുവദിക്കുകയും ചെയ്യുന്നു.
**ക്രമീകരണങ്ങൾ > സിസ്റ്റവും സംഭരണവും > കാഷ് വലുപ്പം** എന്നതിൽ **1 മുതൽ
1,000,000 KiB** വരെയുള്ള പൂർണ്ണസംഖ്യാ മൂല്യങ്ങൾ സ്വീകരിക്കുന്നു; ക്രമീകരണം സംരക്ഷിക്കുമ്പോൾ അത് നിലവിൽ പ്രവർത്തിക്കുന്ന ഡാറ്റാബേസ് കണക്ഷനിൽ പ്രയോഗിക്കപ്പെടുന്നു,
കൂടാതെ സ്റ്റാർട്ടപ്പിൽ നിലനിർത്തിയ മൂല്യം OmniRoute പുനഃസ്ഥാപിക്കുന്നു.

---

## ഡാറ്റാബേസ് സ്ഥാനം

SQLite ഫയൽ ഇവിടെ സംഭരിച്ചിരിക്കുന്നു:

| OS      | പാത                                                       |
| ------- | --------------------------------------------------------- |
| Linux   | `~/.omniroute/storage.sqlite`                             |
| macOS   | `~/.omniroute/storage.sqlite`                             |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                 |
| Docker  | `/app/data/storage.sqlite` (`DATA_DIR` വഴി ക്രമീകരിക്കാം) |

അനുബന്ധ ഫയലുകൾ:

- `storage.sqlite-wal` — റൈറ്റ്-അഹെഡ് ലോഗ്
- `storage.sqlite-shm` — പങ്കിട്ട മെമ്മറി ഫയൽ
- `call_logs/` — അഭ്യർത്ഥന പേലോഡ് ആർട്ടിഫാക്റ്റുകൾ (പ്രവർത്തനക്ഷമമാക്കിയിട്ടുണ്ടെങ്കിൽ)

**സ്ഥാനം ഓവർറൈഡ് ചെയ്യുക:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## ഡൊമെയ്ൻ മൊഡ്യൂൾ ആർക്കിടെക്ചർ

OmniRoute-ന്റെ ഡാറ്റാബേസിൽ `src/lib/db/` എന്നതിൽ **110 ടോപ്പ്-ലെവൽ TypeScript മൊഡ്യൂളുകൾ** ഉണ്ട്. ഓരോ ഡൊമെയ്ൻ മൊഡ്യൂളും:

- ഒന്നോ അതിലധികമോ നിർദ്ദിഷ്ട ടേബിളുകളുടെ ഉടമസ്ഥത വഹിക്കുന്നു
- ടൈപ്പ് ചെയ്ത CRUD ഫങ്ഷനുകൾ എക്സ്പോർട്ട് ചെയ്യുന്നു
- മറ്റൊരു മൊഡ്യൂളിന്റെ ടേബിളുകൾ ഒരിക്കലും നേരിട്ട് ഉപയോഗിക്കുന്നില്ല
- DB ആക്സസ് ചെയ്യാൻ `core.ts`-ൽ നിന്നുള്ള `getDbInstance()` ഉപയോഗിക്കുന്നു

### 110 ടോപ്പ്-ലെവൽ DB മൊഡ്യൂളുകൾ

OmniRoute-ന് `src/lib/db/` എന്നതിൽ **110 ടോപ്പ്-ലെവൽ TypeScript ഫയലുകൾ** ഉണ്ട്. പ്രധാന മൊഡ്യൂളുകളിൽ ചിലതിന്റെ ഉദാഹരണങ്ങൾ താഴെ നൽകിയിരിക്കുന്നു; പൂർണ്ണമായ പട്ടികയ്ക്കായി ഡയറക്ടറി ലിസ്റ്റിംഗ് കാണുക:

| മൊഡ്യൂൾ                 | ടേബിളുകൾ                                                       | ഉത്തരവാദിത്തം                                                                             |
| ----------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | OAuth/API കീ പ്രൊവൈഡർ രജിസ്ട്രേഷനും ക്രെഡൻഷ്യലുകളും                                       |
| `models.ts`             | `key_value` (മോഡൽ ഡാറ്റ)                                       | മോഡൽ നിർവചനങ്ങൾ, ശേഷികൾ, വിലനിർണ്ണയം                                                      |
| `combos.ts`             | `combos`                                                       | കോംബോ റൂട്ടിംഗ് കോൺഫിഗറേഷനുകളും ക്രമീകരണവും                                               |
| `apiKeys.ts`            | `api_keys`                                                     | API കീ ലൈഫ്സൈക്കിൾ, സ്കോപ്പുകൾ, ക്വോട്ട ട്രാക്കിംഗ്                                       |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | സിസ്റ്റം കോൺഫിഗറേഷനും പങ്കിട്ട KV സ്റ്റോറും                                               |
| `backup.ts`             | —                                                              | ബാക്കപ്പ് എക്സ്പോർട്ട്/ഇംപോർട്ട് പ്രവർത്തനങ്ങൾ                                            |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | പ്രോക്സി കോൺഫിഗറേഷനുകളും റൂട്ടിംഗ് നിയമങ്ങളും                                             |
| `prompts.ts`            | `prompt_templates`                                             | പുനരുപയോഗിക്കാവുന്ന പ്രോംപ്റ്റ് ടെംപ്ലേറ്റുകളും പതിപ്പ് നിയന്ത്രണവും                      |
| `webhooks.ts`           | `webhooks`                                                     | ഇവന്റ് അധിഷ്ഠിത വെബ്ഹുക്ക് സബ്സ്ക്രിപ്ഷനുകളും ലോഗുകളും                                    |
| `detailedLogs.ts`       | `request_detail_logs`                                          | ഓരോ അഭ്യർത്ഥനയ്ക്കുമുള്ള ഓഡിറ്റ് ലോഗിംഗ് (ഐച്ഛികം, ഉയർന്ന വോള്യം)                         |
| `domainState.ts`        | `domain_*` (5 ടേബിളുകൾ)                                        | ഡൊമെയ്ൻ ബജറ്റുകൾ, സർക്യൂട്ട് ബ്രേക്കറുകൾ, ലോക്കൗട്ടുകൾ, ഫാൾബാക്ക് ചെയിനുകൾ, ചെലവ് ചരിത്രം |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | MCP/A2A-യ്ക്കായി വൈറ്റ്ലിസ്റ്റ് ചെയ്ത API കീകൾ                                            |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | ചരിത്രപരമായ ക്വോട്ട ഉപയോഗം                                                                |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | മോഡലുകളെ കോംബോ ഡിഫോൾട്ടുകളിലേക്ക് മാപ്പ് ചെയ്യുന്നു                                       |
| `cliToolState.ts`       | `cli_tool_state`                                               | CLI-നിർദ്ദിഷ്ട സ്ഥിരാവസ്ഥ                                                                 |
| `encryption.ts`         | —                                                              | ഫീൽഡുകൾ എൻക്രിപ്റ്റ്/ഡീക്രിപ്റ്റ് ചെയ്യുന്നതിനുള്ള സഹായക ഫങ്ഷനുകൾ                         |
| `readCache.ts`          | —                                                              | കൂടുതൽ റീഡ് പ്രവർത്തനങ്ങൾക്കുള്ള ഇൻ-മെമ്മറി കാഷ്                                          |
| `secrets.ts`            | `key_value` (എൻക്രിപ്റ്റ് ചെയ്ത എൻട്രികൾ)                      | എൻക്രിപ്റ്റ് ചെയ്ത രഹസ്യങ്ങളുടെ സംഭരണം                                                    |
| `stateReset.ts`         | —                                                              | പരിശോധനയ്ക്കായി DB അവസ്ഥ മായ്ക്കുക/റീസെറ്റ് ചെയ്യുക                                       |
| `contextHandoffs.ts`    | `context_handoffs`                                             | ഏജന്റ് ഹാൻഡ്ഓഫിനുള്ള സെഷൻ കോൺടെക്സ്റ്റ്                                                   |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | ഉപയോഗ ട്രാക്കിംഗ്                                                                         |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | കംപ്രഷൻ കോൺഫിഗറേഷൻ                                                                        |

### മൊഡ്യൂൾ അതിരുകൾ

ഒരു പ്രധാന ആർക്കിടെക്ചറൽ നിയമം: **മൊഡ്യൂളുകൾ പരസ്പരം മറ്റൊന്നിന്റെ ടേബിളുകൾ നേരിട്ട് ആക്സസ് ചെയ്യരുത്**. മറ്റൊരു മൊഡ്യൂളിന്റെ ഡാറ്റ ഉപയോഗിച്ച് പ്രവർത്തിക്കാൻ, ആ മൊഡ്യൂളിൽ നിന്നുള്ള ഫങ്ഷൻ ഇംപോർട്ട് ചെയ്യുക.

```ts
// ❌ തെറ്റ്: മറ്റൊരു മൊഡ്യൂളിൽ നിന്നുള്ള നേരിട്ടുള്ള SQL
db.prepare("SELECT * FROM provider_connections").all();

// ✅ ശരി: providers മൊഡ്യൂളിലെ ഫങ്ഷൻ ഉപയോഗിക്കുക
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

ഈ നിയമം കോഡ് റിവ്യൂവിലൂടെ നടപ്പാക്കുന്നു — സ്റ്റാറ്റിക് പരിശോധനയില്ല, എന്നാൽ ലംഘനങ്ങൾ ഫ്ലാഗ് ചെയ്യപ്പെടും.

---

## അടിസ്ഥാന സ്കീമ (17 പട്ടികകൾ)

`core.ts`, `SCHEMA_SQL`-ൽ 17 അടിസ്ഥാന പട്ടികകൾ നിർവചിക്കുന്നു. ഇവ `001_initial_schema.sql` മൈഗ്രേഷൻ വഴി സൃഷ്ടിക്കപ്പെടുകയും കോർ സ്കീമ രൂപപ്പെടുത്തുകയും ചെയ്യുന്നു.

### കോർ പട്ടികകൾ (പ്രാരംഭ മൈഗ്രേഷനിൽ സൃഷ്ടിച്ചവ)

| പട്ടിക                     | ഉദ്ദേശ്യം                                     | പ്രധാന കോളങ്ങൾ                                                          |
| -------------------------- | --------------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | പ്രൊവൈഡർ ക്രെഡൻഷ്യലുകൾ (എൻക്രിപ്റ്റ് ചെയ്തത്) | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | പ്രൊവൈഡർ നോഡ് റൂട്ടിംഗ് വിവരങ്ങൾ              | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | പൊതുവായ KV സ്റ്റോർ                            | `namespace`, `key`, `value`                                             |
| `combos`                   | റൂട്ടിംഗ് കോംബോ നിർവചനങ്ങൾ                    | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | ഗേറ്റ്വേയ്ക്കുള്ള API കീകൾ                    | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | ഡാറ്റാബേസ് മെറ്റാഡാറ്റ                        | `key`, `value`                                                          |
| `usage_history`            | അഭ്യർത്ഥന ഉപയോഗ രേഖകൾ                         | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | അഭ്യർത്ഥന പേലോഡുകളും പ്രതികരണങ്ങളും           | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | പ്രോക്സി അഭ്യർത്ഥന ലോഗുകൾ                     | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | മോഡലിൽനിന്ന് പ്രൊവൈഡറിലേക്കുള്ള ശൃംഖലകൾ       | `model`, `chain`                                                        |
| `domain_budgets`           | ഓരോ ഡൊമെയ്നിനുമുള്ള ചെലവ് ബജറ്റുകൾ            | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | ബജറ്റ് പുനഃസജ്ജീകരണ ചരിത്രം                   | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | ഓരോ ഡൊമെയ്നിന്റെയും ചെലവ് ട്രാക്കിംഗ്         | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | ഡൊമെയ്ൻ നിരക്ക്-പരിധി നില                     | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | ഓരോ ഡൊമെയ്നിന്റെയും സർക്യൂട്ട് ബ്രേക്കർ നില   | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | LLM പ്രതികരണ കാഷ്                             | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | ചരിത്രപരമായ ക്വോട്ട സ്നാപ്പ്ഷോട്ടുകൾ          | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### അധിക പട്ടികകൾ (പിന്നീടുള്ള മൈഗ്രേഷനുകൾ ചേർത്തവ)

തുടർന്നുള്ള മൈഗ്രേഷനുകൾ ഇനിപ്പറയുന്നവ പോലുള്ള പട്ടികകൾ ചേർക്കുന്നു:

- `cli_tool_state` (മൈഗ്രേഷൻ 011) — CLI ടൂൾ നില
- `mcp_*` പട്ടികകൾ — MCP സർവർ ഓഡിറ്റ്
- `a2a_*` പട്ടികകൾ — A2A ടാസ്ക് നില
- `usage_*` പട്ടികകൾ — ഉപയോഗ ട്രാക്കിംഗ്
- `plugin_*` പട്ടികകൾ — പ്ലഗിൻ സിസ്റ്റം
- `skill_executions` — സ്കിൽ എക്സിക്യൂഷൻ ചരിത്രം
- `memory_*` പട്ടികകൾ — മെമ്മറി സിസ്റ്റം
- `compression_*` പട്ടികകൾ — കംപ്രഷൻ സിസ്റ്റം
- `webhook_*` പട്ടികകൾ — വെബ്ഹുക്ക് ഡെലിവറി ലോഗ്
- `acp_*` പട്ടികകൾ — Agent Client Protocol
- `oneproxy_*` പട്ടികകൾ — 1proxy മാർക്കറ്റ്പ്ലേസ്
- `proxy_assignments` — പ്രോക്സി സ്കോപ്പ് ബൈൻഡിംഗുകൾ
- `detailed_call_artifacts` — കോൾ ലോഗ് ആർട്ടിഫാക്റ്റുകളുടെ മെറ്റാഡാറ്റ
- `quota_alert_history` — ക്വോട്ട അലേർട്ട് ഓഡിറ്റ്
- `command_code_auth_sessions` — Command Code OAuth സെഷനുകൾ

ഏകദേശം 30-ലധികം പട്ടികകളുടെ പൂർണ്ണ പട്ടിക `src/lib/db/migrations/`-ലുണ്ട്.

---

## മൈഗ്രേഷനുകൾ

OmniRoute, `src/lib/db/migrations/`-ൽ **പതിപ്പുകളുള്ള, ഐഡംപൊട്ടന്റ് മൈഗ്രേഷനുകൾ** ഉപയോഗിക്കുന്നു. ഓരോ മൈഗ്രേഷനും `NNN_description.sql` എന്ന് പേരിട്ടിരിക്കുന്ന ഒരൊറ്റ SQL ഫയലാണ്.

### മൈഗ്രേഷൻ നാമകരണം

```
001_initial_schema.sql
002_mcp_a2a_tables.sql
003_provider_node_custom_paths.sql
...
021_combo_call_log_targets.sql
```

### മൈഗ്രേഷനുകൾ പ്രവർത്തിക്കുന്ന വിധം

ആരംഭിക്കുമ്പോൾ, `migrationRunner.ts`:

1. `_omniroute_migrations` പട്ടിക നിലവിലില്ലെങ്കിൽ അത് സൃഷ്ടിക്കുന്നു
2. ഇതിനകം പ്രയോഗിച്ച മൈഗ്രേഷനുകൾക്കായി ക്വറി ചെയ്യുന്നു
3. ഓരോന്നും ഓരോ ട്രാൻസാക്ഷനിലായി, പുതിയ മൈഗ്രേഷനുകൾ ക്രമത്തിൽ പ്രയോഗിക്കുന്നു
4. പ്രയോഗിച്ച ഓരോ മൈഗ്രേഷനും ടൈംസ്റ്റാമ്പ് സഹിതം രേഖപ്പെടുത്തുന്നു

```ts
// src/lib/db/migrationRunner.ts (ലളിതമാക്കിയത്)
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

### ഐഡംപൊട്ടൻസി

മൈഗ്രേഷനുകൾ **ഐഡംപൊട്ടന്റ്** ആയിരിക്കണം — അവ രണ്ടുതവണ പ്രവർത്തിപ്പിച്ചാലും രണ്ടാമത്തെ തവണ യാതൊരു മാറ്റവും ഉണ്ടാകരുത്:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

`IF NOT EXISTS`, `IF EXISTS`, `OR IGNORE` / `OR REPLACE` ക്ലോസുകൾ ആവശ്യാനുസരണം ധാരാളമായി ഉപയോഗിക്കുക.

### ഒരു പുതിയ മൈഗ്രേഷൻ ചേർക്കൽ

1. **അടുത്ത നമ്പർ കണ്ടെത്തുക**: `ls src/lib/db/migrations/ | tail -1`
2. **ഫയൽ സൃഷ്ടിക്കുക**: `NNN_my_change.sql`
3. **സുരക്ഷിതമായ DDL ഉപയോഗിക്കുക**: `CREATE TABLE IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
4. **ഡാറ്റ ശ്രദ്ധാപൂർവം ബാക്ക്ഫിൽ ചെയ്യുക**: നിലവിലുള്ള വരികൾ കൈകാര്യം ചെയ്യാൻ `UPDATE ... WHERE ...` ഉപയോഗിക്കുക
5. **ഒരു പകർപ്പിൽ പരീക്ഷിക്കുക**: പരീക്ഷിക്കാത്ത മൈഗ്രേഷനുകൾ ഒരിക്കലും പ്രൊഡക്ഷനിൽ പ്രവർത്തിപ്പിക്കരുത്

ഉദാഹരണം:

```sql
-- 022_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **പിന്നോട്ടുള്ള അനുയോജ്യതയില്ലാത്ത മാറ്റങ്ങൾ** (ഉദാ., കോളങ്ങൾ നീക്കംചെയ്യൽ) സങ്കീർണ്ണമാണ്. OmniRoute ഡൗൺഗ്രേഡ് പിന്തുണയ്ക്കുന്നില്ല — ഒരു മൈഗ്രേഷൻ പ്രയോഗിച്ചുകഴിഞ്ഞാൽ, സ്കീമയിലെ മാറ്റം സ്ഥിരമായിരിക്കും. അതനുസരിച്ച് ആസൂത്രണം ചെയ്യുക.

---

## സംഭരണത്തിലുള്ള എൻക്രിപ്ഷൻ

സെൻസിറ്റീവ് ഫീൽഡുകൾ (API കീകൾ, OAuth ടോക്കണുകൾ, കണക്ഷൻ സ്ട്രിങ്ങുകൾ) സംഭരണത്തിലിരിക്കുമ്പോൾ **AES-256-GCM** ഉപയോഗിച്ച് എൻക്രിപ്റ്റ് ചെയ്യുന്നു.

### ഇത് പ്രവർത്തിക്കുന്ന വിധം

```ts
// src/lib/db/encryption.ts (ലളിതമാക്കിയത്)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### ഇത് ഉപയോഗിക്കുന്ന ഇടങ്ങൾ

- `provider_connections.api_key` — ആപ്ലിക്കേഷൻ തലത്തിൽ എൻക്രിപ്റ്റ് ചെയ്യുന്നു
- `provider_connections.access_token`, `refresh_token`, `id_token` — ആപ്ലിക്കേഷൻ തലത്തിൽ എൻക്രിപ്റ്റ് ചെയ്യുന്നു
- `namespace = "secrets"` ഉള്ള `key_value` എൻട്രികൾ — ആപ്ലിക്കേഷൻ തലത്തിൽ എൻക്രിപ്റ്റ് ചെയ്യുന്നു
- `proxy_registry.auth` — നിലവിലുണ്ടെങ്കിൽ, ആപ്ലിക്കേഷൻ തലത്തിൽ എൻക്രിപ്റ്റ് ചെയ്യുന്നു

### എൻക്രിപ്ഷൻ കീ

എൻക്രിപ്ഷൻ കീ ഒരു **പാസ്ഫ്രെയ്സിൽ** നിന്നും (`STORAGE_ENCRYPTION_KEY` എൻവയോൺമെന്റ് വേരിയബിൾ വഴി സജ്ജമാക്കുന്നത്) ഒരു **സാൾട്ടിൽ** നിന്നും (DB-യിൽ സംഭരിക്കുന്നത്) ഡെറൈവ് ചെയ്യുന്നു. ഡാറ്റ ഡീക്രിപ്റ്റ് ചെയ്യാൻ രണ്ടും ആവശ്യമാണ്.

```bash
# സുരക്ഷിതമായ ഒരു പാസ്ഫ്രെയ്സ് സൃഷ്ടിക്കുക
openssl rand -hex 32

# .env-ൽ സജ്ജമാക്കുക
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **നിർണായകം**: എൻക്രിപ്ഷൻ കീ നഷ്ടപ്പെടുന്നത് എൻക്രിപ്റ്റ് ചെയ്ത എല്ലാ ഡാറ്റയിലേക്കുമുള്ള പ്രവേശനം നഷ്ടപ്പെടുന്നതിന് തുല്യമാണ്. **ഡാറ്റാബേസിൽനിന്ന് വേറിട്ട് കീയുടെ ബാക്കപ്പ് എടുക്കുക**.

### എൻക്രിപ്റ്റ് ചെയ്യാത്തവ

പ്രകടനക്ഷമത കണക്കിലെടുത്ത്, ഇനിപ്പറയുന്നവ പ്ലെയിൻടെക്സ്റ്റിലാണ് സംഭരിക്കുന്നത്:

- പ്രൊവൈഡറിന്റെ പ്രദർശന നാമങ്ങൾ
- മോഡൽ നിർവചനങ്ങൾ (ഇതിനകം പൊതുവായി ലഭ്യമാണ്)
- റൂട്ടിങ് നിയമങ്ങൾ
- ഉപയോഗ രേഖകൾ (PII ഇല്ല)

---

## എൻക്രിപ്ഷൻ സംബന്ധിച്ച മുന്നറിയിപ്പുകൾ (v3.8.16+)

രണ്ട് എൻക്രിപ്ഷൻ സ്കീമുകൾ സുതാര്യമായി കൈകാര്യം ചെയ്യാൻ OmniRoute **`migrateLegacyEncryptedString()`** ഉപയോഗിക്കുന്നു:

- **ലെഗസി** (v3.5.0-ന് മുമ്പ്): XOR അടിസ്ഥാനമാക്കിയുള്ള "എൻക്രിപ്ഷൻ" (യഥാർത്ഥ ക്രിപ്റ്റോഗ്രഫിയല്ല)
- **നിലവിലുള്ളത്**: ശരിയായ IV-യും ഓത്ത് ടാഗും ഉള്ള AES-256-GCM

മൈഗ്രേഷൻ ഹെൽപ്പർ ലെഗസി ഫോർമാറ്റ് കണ്ടെത്തുകയും ആദ്യമായി വായിക്കുമ്പോൾ പുതിയ സ്കീം ഉപയോഗിച്ച് വീണ്ടും എൻക്രിപ്റ്റ് ചെയ്യുകയും ചെയ്യുന്നു. ക്രെഡൻഷ്യലുകൾ നഷ്ടപ്പെടാതെ ഒരു പഴയ ഡാറ്റാബേസ് അപ്ഗ്രേഡ് ചെയ്യാൻ ഇതിലൂടെ കഴിയും.

---

## റീഡ് കാഷ്

പതിവായി വായിക്കുന്ന ഡാറ്റയ്ക്കായി (മോഡലുകൾ, പ്രൊവൈഡറുകൾ, ക്രമീകരണങ്ങൾ), `readCache.ts` ഒരു **ഇൻ-മെമ്മറി കാഷ്** നൽകുന്നു:

```ts
// സ്റ്റാർട്ടപ്പിൽ കാഷ് ചെയ്യുന്നു, എഴുതുമ്പോൾ അസാധുവാക്കുന്നു
const providers = await getCachedProviders(); // വേഗതയേറിയത്, ഇൻ-മെമ്മറി
const fresh = await listProviders(); // വേഗത കുറഞ്ഞത്, DB ആക്സസ് ചെയ്യുന്നു
```

| കാഷ് ചെയ്ത എന്റിറ്റി   | കാഷ് കീ        | TTL           |
| ---------------------- | -------------- | ------------- |
| `models`               | `models:v1`    | എഴുതുന്നതുവരെ |
| `provider_connections` | `providers:v1` | എഴുതുന്നതുവരെ |
| `settings`             | `settings:v1`  | എഴുതുന്നതുവരെ |
| `combos`               | `combos:v1`    | എഴുതുന്നതുവരെ |

അനുബന്ധ പട്ടികയിലേക്ക് ഓരോ തവണ എഴുതുമ്പോഴും കാഷ് അസാധുവാക്കപ്പെടുന്നു.

---

## ബാക്കപ്പും വീണ്ടെടുക്കലും

### മാനുവൽ ബാക്കപ്പ്

```bash
# ഒരു ലോക്കൽ ബാക്കപ്പ് സൃഷ്ടിക്കാൻ CLI ഉപയോഗിക്കുക
omniroute backup create --name pre-migration

# അല്ലെങ്കിൽ API വഴി
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

ബാക്കപ്പ് ഫയലിൽ ഉൾപ്പെടുന്നവ:

- എല്ലാ DB പട്ടികകളും (JSON ആയി സീരിയലൈസ് ചെയ്തത്)
- കോൾ ലോഗ് ആർട്ടിഫാക്റ്റുകൾ (base64-എൻകോഡ് ചെയ്തത്, ഐച്ഛികം)
- ക്രമീകരണങ്ങൾ + സീക്രട്ടുകൾ (എൻക്രിപ്റ്റ് ചെയ്തത്)
- പ്ലഗിൻ കോൺഫിഗറേഷൻ

### പുനഃസ്ഥാപിക്കൽ

```bash
# CLI വഴി
omniroute restore pre-migration

# API വഴി
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **മുന്നറിയിപ്പ്**: പുനഃസ്ഥാപിക്കൽ മുഴുവൻ DB-യും ഓവർറൈറ്റ് ചെയ്യും. ആദ്യം എല്ലാ ക്ലയന്റുകളും നിർത്തുക.

### ഓട്ടോമേറ്റഡ് ബാക്കപ്പുകൾ

```bash
# CLI വഴി ഓട്ടോമേറ്റഡ് പ്രതിദിന ബാക്കപ്പുകൾ പ്രവർത്തനക്ഷമമാക്കുക
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

ഓരോ 30 സെക്കൻഡിലും പ്രവർത്തിക്കുന്ന ഒരു പശ്ചാത്തല ജോബ് സെർവർ ഭാഗത്ത് ഷെഡ്യൂൾ നിർവഹിക്കുകയും
(ഡിഫോൾട്ട്) ലോക്കൽ സെർവർ സമയത്തിന് അനുസരിച്ച് cron എക്സ്പ്രഷൻ വിലയിരുത്തുകയും ചെയ്യുന്നു.

| വേരിയബിൾ                                    | ഡിഫോൾട്ട് | വിവരണം                                                                                                                                       |
| ------------------------------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`   | ms-ലുള്ള ടിക്ക് ഇടവേള (കുറഞ്ഞത് `5000`). പൊരുത്തപ്പെടുന്ന cron മിനിറ്റിനുള്ളിൽ വിശ്വസനീയമായി പ്രവർത്തിക്കാൻ ഇത് 60 s-നേക്കാൾ കുറവായിരിക്കണം. |

### SQLite ഹോട്ട് ബാക്കപ്പ്

പ്രവർത്തിച്ചുകൊണ്ടിരിക്കുന്ന ഒരു DB-യുടെ സീറോ-ഡൗൺടൈം ബാക്കപ്പിനായി:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

ഇത് SQLite-ന്റെ ഓൺലൈൻ ബാക്കപ്പ് API ഉപയോഗിക്കുന്നു — OmniRoute പ്രവർത്തിച്ചുകൊണ്ടിരിക്കുമ്പോൾ ഇത് സുരക്ഷിതമായി പ്രവർത്തിപ്പിക്കാം.

---

## പ്രകടന ട്യൂണിംഗ്

### WAL മോഡ്

WAL ഡിഫോൾട്ടായി പ്രവർത്തനക്ഷമമാണ്. ഉയർന്ന റൈറ്റ് വർക്ക്ലോഡുകൾക്കായി, ഇനിപ്പറയുന്നവ പരിഗണിക്കുക:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- ഓരോ 1000 പേജുകളിലും ചെക്ക്പോയിന്റ് ചെയ്യുക
PRAGMA journal_size_limit = 67108864;  -- 64MB WAL പരിധി
```

### ഇൻഡെക്സുകൾ

പ്രകടനത്തിനുള്ള പ്രധാന ഇൻഡെക്സുകൾ (മൈഗ്രേഷനുകൾ സ്വയമേവ സൃഷ്ടിക്കുന്നവ):

- `idx_models_provider` — പ്രൊവൈഡർ അടിസ്ഥാനമാക്കിയുള്ള മോഡൽ ലുക്കപ്പുകൾ
- `idx_combo_targets_combo_id` — കോംബോ ടാർഗറ്റ് വിപുലീകരണം
- `idx_usage_history_api_key_timestamp` — ഉപയോഗ അനലിറ്റിക്സ്
- `idx_quota_snapshots_api_key_window` — ക്വോട്ട ട്രാക്കിംഗ്
- `idx_call_logs_timestamp` — കോൾ ലോഗ് ക്വെറികൾ

ഒരു പുതിയ ഇൻഡെക്സ് ചേർക്കാൻ, ഒരു മൈഗ്രേഷൻ സൃഷ്ടിക്കുക:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### മെമ്മറി-മാപ്പ്ഡ് I/O

വളരെ വലിയ ഡാറ്റാബേസുകൾക്കായി (>10GB), SQLite pragma വഴി മെമ്മറി മാപ്പിംഗ് ക്രമീകരിക്കാം:

```sql
-- SQLite pragma വഴി സജ്ജീകരിക്കുക (core.ts-ലോ runtime-ലോ ക്രമീകരിക്കുക)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### കോംപാക്ഷൻ

ദീർഘകാലം പ്രവർത്തിക്കുന്ന OmniRoute ഇൻസ്റ്റൻസുകൾക്ക് ഇടയ്ക്കിടെ `VACUUM` പ്രവർത്തിപ്പിക്കുന്നത് പ്രയോജനകരമാണ്:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

കുറഞ്ഞ ട്രാഫിക്കുള്ള സമയത്ത് മാസത്തിലൊരിക്കൽ പ്രവർത്തിപ്പിക്കുക. (WAL മോഡ് ഇതിന്റെ ആവശ്യകത കുറയ്ക്കുന്നുവെങ്കിലും പൂർണ്ണമായും ഇല്ലാതാക്കുന്നില്ല.)

---

## ഹെൽത്ത് ചെക്ക്

`src/lib/db/healthCheck.ts` **ഡാറ്റാബേസ്-തല ഹെൽത്ത് ഡയഗ്നോസ്റ്റിക്സ്** നൽകുന്നു:

രണ്ട് വെർബുകൾക്കും ഓതന്റിക്കേഷൻ ആവശ്യമാണ് (അല്ലെങ്കിൽ `401`). `GET` ഡയഗ്നോസ് ചെയ്യുക മാത്രം ചെയ്യുന്നു; `POST`, `autoRepair` പ്രവർത്തനക്ഷമമാക്കി അതേ പരിശോധന നടത്തുന്നു.

```bash
GET  /api/db/health   # ഡയഗ്നോസ് ചെയ്യുക
POST /api/db/health   # ഡയഗ്നോസ് ചെയ്യുക + നന്നാക്കുക
```

പ്രതികരണം `runDbHealthCheck()` സൃഷ്ടിക്കുന്ന `DbHealthCheckResult` ആണ്
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "ഇപ്പോൾ നിലവിലില്ലാത്ത API കീകളെയാണ് ഡൊമെയ്ൻ ബജറ്റുകൾ പരാമർശിച്ചത്.",
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

| ഫീൽഡ്             | അർത്ഥം                                                                                                                                                       |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `isHealthy`       | `issues` ശൂന്യമാകുമ്പോൾ `true`. `driver` ഇതിനെ ഒരിക്കലും സ്വാധീനിക്കില്ല.                                                                                    |
| `issues[].type`   | `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state` എന്നിവയിൽ ഒന്ന്.                                                             |
| `repairedCount`   | ഈ റണ്ണിൽ നന്നാക്കിയ വരികൾ; `autoRepair` false ആയിരിക്കുമ്പോൾ എല്ലായ്പ്പോഴും `0`.                                                                             |
| `backupCreated`   | നന്നാക്കുന്നതിന് മുമ്പ് ഒരു ബാക്കപ്പ് എടുത്തോ എന്നത്.                                                                                                        |
| `checkedAt`       | റണ്ണിനും അത് എഴുതുന്ന ഏതൊരു റിപ്പയർ കുറിപ്പിനും പൊതുവായ ISO ടൈംസ്റ്റാമ്പ്.                                                                                   |
| `driver.name`     | പരിശോധിച്ച ഡാറ്റാബേസിന് സേവനം നൽകുന്ന SQLite ഡ്രൈവർ.                                                                                                         |
| `driver.degraded` | റൈറ്റുകൾ ഡാറ്റാബേസ് ഫയലിൽ സ്ഥിരമായി ബാക്ക് ചെയ്യപ്പെടാത്തപ്പോൾ `true` — `sql.js` WASM ഫാൾബാക്ക് (മുഴുവൻ-ഫയൽ പെർസിസ്റ്റൻസ്) അല്ലെങ്കിൽ ഇൻ-മെമ്മറി ഡാറ്റാബേസ്. |

ഇതേ പേലോഡ് `omniroute_db_health_check` MCP ടൂളും തിരികെ നൽകുന്നു.

കറപ്ഷൻ കണ്ടെത്താൻ `PRAGMA integrity_check` പ്രവർത്തിപ്പിക്കുക:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# ഇങ്ങനെ പ്രിന്റ് ചെയ്യണം: ok
```

ഇത് `ok` അല്ലാതെ മറ്റെന്തെങ്കിലും തിരികെ നൽകുന്നുവെങ്കിൽ, **ഡാറ്റാബേസ് ഉപയോഗിക്കുന്നത് ഉടൻ നിർത്തുക**, തുടർന്ന് ബാക്കപ്പിൽ നിന്ന് പുനഃസ്ഥാപിക്കുക.

---

## ദുരന്ത പുനഃസ്ഥാപനം

### സാഹചര്യം 1: WAL ഫയൽ നഷ്ടപ്പെട്ടു

`-wal` ഫയൽ നഷ്ടപ്പെട്ടെങ്കിലും `-shm` ഫയലും പ്രധാന DB-യും കേടുപാടില്ലാതെ നിലനിൽക്കുന്നു:

```bash
# അടുത്ത തവണ തുറക്കുമ്പോൾ സ്വയമേവ പുനഃസ്ഥാപിക്കുന്നു
omniroute
```

SQLite-ന് സ്വയമേവ പുനഃസ്ഥാപിക്കാൻ കഴിയുന്നില്ലെങ്കിൽ:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### സാഹചര്യം 2: പ്രധാന DB ഫയൽ കേടായി

ബാക്കപ്പിൽ നിന്ന് പുനഃസ്ഥാപിക്കുക:

```bash
omniroute sync pull --merge   # അല്ലെങ്കിൽ: omniroute backup restore <backup-id>
```

### സാഹചര്യം 3: എൻക്രിപ്ഷൻ കീ നഷ്ടപ്പെട്ടു

കീ ഇല്ലാതെ **പുനഃസ്ഥാപിക്കൽ സാധ്യമല്ല**. എൻക്രിപ്റ്റ് ചെയ്ത ഫീൽഡുകൾ വായിക്കാനാകില്ല. പുതിയ ക്രെഡൻഷ്യലുകൾ ഉപയോഗിച്ച് എല്ലാ പ്രൊവൈഡറുകളെയും മാനുവലായി വീണ്ടും ചേർക്കുക.

> **പ്രതിരോധ നടപടി**: എൻക്രിപ്ഷൻ കീ എപ്പോഴും പ്രത്യേകം ബാക്കപ്പ് ചെയ്യുക; പാസ്വേഡ് മാനേജറിലോ KMS-ലോ സൂക്ഷിക്കുന്നതാണ് ഉചിതം.

### സാഹചര്യം 4: ഡിസ്ക് നിറഞ്ഞു

SQLite `SQLITE_FULL` പിശകുകൾ നൽകും. ഡിസ്കിൽ ഇടം ഒഴിവാക്കിയ ശേഷം:

```bash
# ഇടം ഒഴിവാക്കാൻ WAL ചെക്ക്പോയിന്റ് ചെയ്യുക
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## സാധാരണ പ്രവർത്തനങ്ങൾ

### ഒരു പട്ടിക പരിശോധിക്കുക

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### എല്ലാ പട്ടികകളിലെയും വരികളുടെ എണ്ണം കണക്കാക്കുക

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### എല്ലാ ഡാറ്റയും റീസെറ്റ് ചെയ്യുക (മായ്ക്കുക)

```bash
# ആദ്യം OmniRoute നിർത്തുക
omniroute stop

# DB ഫയൽ ഇല്ലാതാക്കുക
rm ~/.omniroute/storage.sqlite*

# പുനരാരംഭിക്കുക (ശൂന്യമായ DB വീണ്ടും സൃഷ്ടിക്കും)
omniroute
```

**തിരഞ്ഞെടുത്തുള്ള** റീസെറ്റിനായി (പ്രൊവൈഡറുകളെ നിലനിർത്തി ഉപയോഗ ഡാറ്റ മായ്ക്കുക):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### ഒറ്റ പട്ടിക എക്സ്പോർട്ട് ചെയ്യുക

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## പ്രശ്നപരിഹാരം

### "ഡാറ്റാബേസ് ലോക്ക് ചെയ്തിരിക്കുന്നു"

മറ്റൊരു പ്രോസസ് ഒരു റൈറ്റ് ലോക്ക് കൈവശം വച്ചിരിക്കുന്നു. ഇനിപ്പറയുന്നവയിൽ ഒന്ന് ചെയ്യുക:

- മറ്റേ പ്രോസസ് പൂർത്തിയാകുന്നതുവരെ കാത്തിരിക്കുക (`lsof | grep storage.sqlite` പരിശോധിക്കുക)
- മറ്റേ പ്രോസസ് അവസാനിപ്പിക്കുക
- പ്രശ്നം തുടരുകയാണെങ്കിൽ OmniRoute പുനരാരംഭിക്കുക

### "ഫോറിൻ കീ നിയന്ത്രണം പരാജയപ്പെട്ടു"

ഒരു ഡൊമെയ്ൻ മൊഡ്യൂൾ റഫറൻഷ്യൽ ഇന്റഗ്രിറ്റി ലംഘിക്കുന്നു. ഇനിപ്പറയുന്നവ പരിശോധിക്കുക:

- ആശ്രിത പട്ടികകളിലെ അനാഥ വരികൾ
- പ്രചരിക്കാതിരുന്ന കാസ്കേഡിംഗ് ഡിലീറ്റുകൾ
- ഫോറിൻ കീ മാറ്റിയ സമീപകാല മൈഗ്രേഷൻ

ലംഘനങ്ങൾ കണ്ടെത്താൻ `PRAGMA foreign_key_check;` പ്രവർത്തിപ്പിക്കുക.

### "മെമ്മറി തീർന്നു"

SQLite-ന്റെ മെമ്മറി-മാപ്പ്ഡ് I/O, OS പരിധി കവിയുന്നു. SQLite pragma ഉപയോഗിച്ച് കുറയ്ക്കുക:

```sql
PRAGMA mmap_size = 134217728;  -- 256MB-ന് പകരം 128MB
```

അല്ലെങ്കിൽ പ്രവർത്തനരഹിതമാക്കുക:

```sql
PRAGMA mmap_size = 0;
```

### "മൈഗ്രേഷൻ പാതിവഴിയിൽ പരാജയപ്പെട്ടു"

മൈഗ്രേഷൻ ഒരു ട്രാൻസാക്ഷനിലാണ് പ്രവർത്തിച്ചത്, അതിനാൽ അത് റോൾ ബാക്ക് ചെയ്തിരിക്കണം. അങ്ങനെ സംഭവിച്ചില്ലെങ്കിൽ:

1. **OmniRoute നിർത്തുക** (കൂടുതൽ ശ്രമങ്ങൾ തടയുക)
2. `sqlite3` ഉപയോഗിച്ച് **DB-യുടെ അവസ്ഥ പരിശോധിക്കുക**
3. ഭാഗികമായ മൈഗ്രേഷൻ **മാനുവലായി പരിഹരിക്കുക**
4. OmniRoute **വീണ്ടും പ്രവർത്തിപ്പിക്കുക** (മൈഗ്രേഷൻ വീണ്ടും ശ്രമിക്കും)

ഇത് തടയാൻ, മൈഗ്രേഷനുകൾ എപ്പോഴും ആദ്യം ഒരു പകർപ്പിൽ പരീക്ഷിക്കുക.

---

## ഇതും കാണുക

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — ഉപയോഗ പട്ടികകൾ
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — ആരോഗ്യനില നിരീക്ഷണം
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — റിലീസ് പ്രവാഹം
- ഉറവിടം: `src/lib/db/` (80+ ഫയലുകൾ, ~25K കോഡ് വരികൾ)
