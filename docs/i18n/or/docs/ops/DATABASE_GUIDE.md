# Database Schema & Operations Guide (ଓଡ଼ିଆ)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **ସଂକ୍ଷେପରେ**: OmniRoute ଏହାର ପ୍ରାଥମିକ ଷ୍ଟୋର୍ ଭାବରେ **WAL ଜର୍ଣ୍ଣାଲିଂ ସହିତ SQLite** ବ୍ୟବହାର କରେ ଏବଂ ସଂବେଦନଶୀଳ ଫିଲ୍ଡଗୁଡ଼ିକ ପାଇଁ ସ୍ଥିର ଅବସ୍ଥାରେ **AES-256-GCM** ଏନ୍କ୍ରିପ୍ସନ୍ ବ୍ୟବହାର କରେ। ଏହି ମାର୍ଗଦର୍ଶିକାରେ ସ୍କିମା, ମାଇଗ୍ରେସନ୍, ବ୍ୟାକଅପ୍/ପୁନରୁଦ୍ଧାର ଏବଂ ପରିଚାଳନାଗତ ରନ୍ବୁକ୍ଗୁଡ଼ିକ ଅନ୍ତର୍ଭୁକ୍ତ।

**ଉତ୍ସଗୁଡ଼ିକ:**

- `src/lib/db/core.ts` — ସିଙ୍ଗଲଟନ୍ + SCHEMA_SQL (17ଟି ମୂଳ ଟେବୁଲ୍)
- `src/lib/db/migrationRunner.ts` — ସଂସ୍କରଣଭିତ୍ତିକ ମାଇଗ୍ରେସନ୍
- `src/lib/db/migrations/` — 167ଟି ସଂସ୍କରଣଭିତ୍ତିକ SQL ଫାଇଲ୍
- `src/lib/db/encryption.ts` — ଏନ୍କ୍ରିପ୍ସନ୍ ସହାୟକଗୁଡ଼ିକ
- `src/lib/db/backup.ts` — ବ୍ୟାକଅପ୍ ରପ୍ତାନି/ଆମଦାନି
- `src/lib/db/healthCheck.ts` — ସ୍ୱାସ୍ଥ୍ୟ ନିଦାନ

---

## SQLite କାହିଁକି?

OmniRoute ବିଭିନ୍ନ କାରଣରୁ PostgreSQL/MySQL ପରିବର୍ତ୍ତେ SQLite ବାଛିଛି:

| ବିଷୟ                | SQLite                                | PostgreSQL                              |
| ------------------- | ------------------------------------- | --------------------------------------- |
| **ନିୟୋଜନ**          | ଏମ୍ବେଡେଡ୍ — ପୃଥକ ସର୍ଭର୍ ଆବଶ୍ୟକ ନୁହେଁ  | ସର୍ଭର୍ ସେଟଅପ୍ ଆବଶ୍ୟକ                    |
| **ଏନ୍କ୍ରିପ୍ସନ୍**    | ଆପ୍ଲିକେସନ୍ ସ୍ତରୀୟ (AES-256-GCM)       | ଅନ୍ତର୍ନିର୍ମିତ TDE                       |
| **କାର୍ଯ୍ୟଦକ୍ଷତା**   | କ୍ଷୁଦ୍ର/ମଧ୍ୟମ କାର୍ଯ୍ୟଭାର ପାଇଁ ଦ୍ରୁତତର | ଅତ୍ୟଧିକ ସମକାଳୀନ ଲେଖନ ପାଇଁ ଉତ୍ତମ         |
| **ସମକାଳୀନତା**       | WAL ମୋଡ୍ ସମକାଳୀନ ପଠନକୁ ଅନୁମତି ଦିଏ     | ପୂର୍ଣ୍ଣ MVCC                            |
| **ବ୍ୟାକଅପ୍**        | ଏକକ-ଫାଇଲ୍ କପି                         | `pg_dump` କିମ୍ବା ଫାଇଲ୍ସିଷ୍ଟମ୍ ସ୍ନାପ୍ସଟ୍ |
| **ବ୍ୟବହାର କ୍ଷେତ୍ର** | ପ୍ରତି-ବ୍ୟବହାରକାରୀ ଇନ୍ଷ୍ଟଲ୍, ଏମ୍ବେଡେଡ୍ | ମଲ୍ଟି-ଟେନାଣ୍ଟ SaaS                      |

**ଏକକ-ବ୍ୟବହାରକାରୀ, ଏକକ-ଇନ୍ଷ୍ଟାନ୍ସ** ନିୟୋଜନଗୁଡ଼ିକ ପାଇଁ (OmniRouteର ପ୍ରାଥମିକ ବ୍ୟବହାର କ୍ଷେତ୍ର), SQLite ଅଧିକ ସରଳ ଏବଂ ଦ୍ରୁତ।

### WAL ଜର୍ଣ୍ଣାଲିଂ

`core.ts` ଡାଟାବେସ୍କୁ **WAL (Write-Ahead Logging) ମୋଡ୍**ରେ ଖୋଲେ:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL ଲେଖନ ସମୟରେ **ସମକାଳୀନ ପଠନ**କୁ ଅନୁମତି ଦିଏ — ଅନୁରୋଧଗୁଡ଼ିକ ରେକର୍ଡ ହେଉଥିବା ସମୟରେ କ୍ୱେରି କରୁଥିବା ଡ୍ୟାସ୍ବୋର୍ଡ ପାଇଁ ଏହା ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ।

ଡିଫଲ୍ଟ କ୍ୟାଶ୍ ଆକାର ହେଉଛି **65,536 KiB (64 MiB)**। SQLite ଏକ ଋଣାତ୍ମକ
`cache_size`କୁ KiBରେ ଆନୁମାନିକ ସର୍ବୋଚ୍ଚ ସୀମା ଭାବରେ ବ୍ୟାଖ୍ୟା କରେ ଏବଂ ଆବଶ୍ୟକତାନୁସାରେ ପେଜ୍ ଆବଣ୍ଟନ କରେ।
**Settings > System & Storage > Cache Size**ରେ **1ରୁ
1,000,000 KiB** ପର୍ଯ୍ୟନ୍ତ ପୂର୍ଣ୍ଣସଂଖ୍ୟା ମୂଲ୍ୟ ଗ୍ରହଣ କରାଯାଏ; ସେଟିଂ ସଂରକ୍ଷଣ କଲେ ଏହା ସକ୍ରିୟ ଡାଟାବେସ୍ ସଂଯୋଗରେ ପ୍ରୟୋଗ ହୁଏ,
ଏବଂ ଆରମ୍ଭ ସମୟରେ OmniRoute ସଂରକ୍ଷିତ ମୂଲ୍ୟକୁ ପୁନଃସ୍ଥାପନ କରେ।

---

## ଡାଟାବେସ୍ର ଅବସ୍ଥାନ

SQLite ଫାଇଲ୍ଟି ନିମ୍ନ ସ୍ଥାନରେ ସଂରକ୍ଷିତ ହୁଏ:

| OS      | ପଥ                                                            |
| ------- | ------------------------------------------------------------- |
| Linux   | `~/.omniroute/storage.sqlite`                                 |
| macOS   | `~/.omniroute/storage.sqlite`                                 |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                     |
| Docker  | `/app/data/storage.sqlite` (`DATA_DIR` ମାଧ୍ୟମରେ ବିନ୍ୟାସଯୋଗ୍ୟ) |

ସହଯୋଗୀ ଫାଇଲ୍ଗୁଡ଼ିକ:

- `storage.sqlite-wal` — ରାଇଟ୍-ଏହେଡ୍ ଲଗ୍
- `storage.sqlite-shm` — ସହଭାଗୀ ମେମୋରି ଫାଇଲ୍
- `call_logs/` — ଅନୁରୋଧ ପେଲୋଡ୍ ଆର୍ଟିଫ୍ୟାକ୍ଟଗୁଡ଼ିକ (ସକ୍ଷମ ଥିଲେ)

**ଅବସ୍ଥାନକୁ ଓଭର୍ରାଇଡ୍ କରନ୍ତୁ:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## ଡୋମେନ୍ ମଡ୍ୟୁଲ୍ ଆର୍କିଟେକ୍ଚର୍

OmniRouteର ଡାଟାବେସ୍ରେ `src/lib/db/` ମଧ୍ୟରେ **110ଟି ଶୀର୍ଷ-ସ୍ତରୀୟ TypeScript ମଡ୍ୟୁଲ୍** ଅଛି। ପ୍ରତ୍ୟେକ ଡୋମେନ୍ ମଡ୍ୟୁଲ୍:

- ଗୋଟିଏ କିମ୍ବା ଅଧିକ ନିର୍ଦ୍ଦିଷ୍ଟ ଟେବୁଲ୍ର ଦାୟିତ୍ୱ ନିଏ
- ଟାଇପ୍ଯୁକ୍ତ CRUD ଫଙ୍କସନ୍ଗୁଡ଼ିକୁ ଏକ୍ସପୋର୍ଟ କରେ
- ଅନ୍ୟ କୌଣସି ମଡ୍ୟୁଲ୍ର ଟେବୁଲ୍କୁ କେବେ ମଧ୍ୟ ସ୍ପର୍ଶ କରେ ନାହିଁ
- DBକୁ ଆକ୍ସେସ୍ କରିବା ପାଇଁ `core.ts`ରୁ `getDbInstance()` ବ୍ୟବହାର କରେ

### 110ଟି ଶୀର୍ଷ-ସ୍ତରୀୟ DB ମଡ୍ୟୁଲ୍

OmniRouteର `src/lib/db/` ମଧ୍ୟରେ **110ଟି ଶୀର୍ଷ-ସ୍ତରୀୟ TypeScript ଫାଇଲ୍** ଅଛି। ନିମ୍ନରେ ମୁଖ୍ୟ ମଡ୍ୟୁଲ୍ଗୁଡ଼ିକର ଏକ ନମୁନା ଦିଆଯାଇଛି; ସମ୍ପୂର୍ଣ୍ଣ ତାଲିକା ପାଇଁ ଡିରେକ୍ଟୋରୀ ତାଲିକା ଦେଖନ୍ତୁ:

| ମଡ୍ୟୁଲ୍                 | ଟେବୁଲ୍                                                         | ଦାୟିତ୍ୱ                                                                  |
| ----------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `providers.ts`          | `provider_connections`                                         | OAuth/API କୀ ପ୍ରଦାତା ପଞ୍ଜୀକରଣ ଏବଂ ପରିଚୟପତ୍ର                              |
| `models.ts`             | `key_value` (ମଡେଲ୍ ଡାଟା)                                       | ମଡେଲ୍ ସଂଜ୍ଞା, କ୍ଷମତା ଏବଂ ମୂଲ୍ୟ ନିର୍ଦ୍ଧାରଣ                                |
| `combos.ts`             | `combos`                                                       | କମ୍ବୋ ରାଉଟିଂ ବିନ୍ୟାସ ଏବଂ କ୍ରମ                                            |
| `apiKeys.ts`            | `api_keys`                                                     | API କୀ ଜୀବନଚକ୍ର, ସ୍କୋପ୍ ଏବଂ କୋଟା ଟ୍ରାକିଂ                                 |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | ସିଷ୍ଟମ୍ ବିନ୍ୟାସ ଏବଂ ସହଭାଗୀ KV ଷ୍ଟୋର୍                                     |
| `backup.ts`             | —                                                              | ବ୍ୟାକଅପ୍ ଏକ୍ସପୋର୍ଟ/ଇମ୍ପୋର୍ଟ କାର୍ଯ୍ୟ                                      |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | ପ୍ରକ୍ସି ବିନ୍ୟାସ ଏବଂ ରାଉଟିଂ ନିୟମ                                          |
| `prompts.ts`            | `prompt_templates`                                             | ପୁନଃବ୍ୟବହାରଯୋଗ୍ୟ ପ୍ରମ୍ପ୍ଟ ଟେମ୍ପଲେଟ୍ ଏବଂ ସଂସ୍କରଣ ପରିଚାଳନା                 |
| `webhooks.ts`           | `webhooks`                                                     | ଇଭେଣ୍ଟ-ଚାଳିତ webhook ସବ୍ସ୍କ୍ରିପ୍ସନ୍ ଏବଂ ଲଗ୍                              |
| `detailedLogs.ts`       | `request_detail_logs`                                          | ପ୍ରତି-ଅନୁରୋଧ ଅଡିଟ୍ ଲଗିଂ (ଇଚ୍ଛାଧୀନ, ଅଧିକ ପରିମାଣ)                          |
| `domainState.ts`        | `domain_*` (5ଟି ଟେବୁଲ୍)                                        | ଡୋମେନ୍ ବଜେଟ୍, ସର୍କିଟ୍ ବ୍ରେକର୍, ଲକ୍ଆଉଟ୍, ଫଲ୍ବ୍ୟାକ୍ ଚେନ୍ ଏବଂ ଖର୍ଚ୍ଚ ଇତିହାସ |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | MCP/A2A ପାଇଁ ଅନୁମୋଦିତ API କୀ                                             |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | ଐତିହାସିକ କୋଟା ବ୍ୟବହାର                                                    |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | ମଡେଲ୍ଗୁଡ଼ିକୁ ଡିଫଲ୍ଟ କମ୍ବୋ ସହିତ ମ୍ୟାପ୍ କରିବା                              |
| `cliToolState.ts`       | `cli_tool_state`                                               | CLI-ନିର୍ଦ୍ଦିଷ୍ଟ ସ୍ଥାୟୀ ଅବସ୍ଥା                                            |
| `encryption.ts`         | —                                                              | ଫିଲ୍ଡଗୁଡ଼ିକୁ ଏନ୍କ୍ରିପ୍ଟ/ଡିକ୍ରିପ୍ଟ କରିବା ପାଇଁ ସହାୟକ                       |
| `readCache.ts`          | —                                                              | ଅଧିକ ପଠନ-କେନ୍ଦ୍ରିତ କାର୍ଯ୍ୟ ପାଇଁ ଇନ୍-ମେମୋରୀ କ୍ୟାଶ୍                        |
| `secrets.ts`            | `key_value` (ଏନ୍କ୍ରିପ୍ଟ କରାଯାଇଥିବା ଏଣ୍ଟ୍ରି)                    | ଏନ୍କ୍ରିପ୍ଟ କରାଯାଇଥିବା ଗୁପ୍ତ ତଥ୍ୟର ଷ୍ଟୋରେଜ୍                               |
| `stateReset.ts`         | —                                                              | ପରୀକ୍ଷଣ ପାଇଁ DB ଅବସ୍ଥା ପୋଛିବା/ରିସେଟ୍ କରିବା                               |
| `contextHandoffs.ts`    | `context_handoffs`                                             | ଏଜେଣ୍ଟ ହ୍ୟାଣ୍ଡଅଫ୍ ପାଇଁ ସେସନ୍ ପ୍ରସଙ୍ଗ                                     |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | ବ୍ୟବହାର ଟ୍ରାକିଂ                                                          |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | କମ୍ପ୍ରେସନ୍ ବିନ୍ୟାସ                                                       |

### ମଡ୍ୟୁଲ୍ ସୀମା

ଏକ ମୁଖ୍ୟ ଆର୍କିଟେକ୍ଚରାଲ୍ ନିୟମ: **ମଡ୍ୟୁଲ୍ଗୁଡ଼ିକ ପରସ୍ପରର ଟେବୁଲ୍କୁ ସିଧାସଳଖ ଆକ୍ସେସ୍ କରନ୍ତି ନାହିଁ**। ଅନ୍ୟ ଏକ ମଡ୍ୟୁଲ୍ର ଡାଟା ସହିତ କାମ କରିବା ପାଇଁ, ସେହି ମଡ୍ୟୁଲ୍ରୁ ଫଙ୍କସନ୍ଟି ଇମ୍ପୋର୍ଟ କରନ୍ତୁ।

```ts
// ❌ ଭୁଲ୍: ଅନ୍ୟ ଏକ ମଡ୍ୟୁଲ୍ରୁ ସିଧାସଳଖ SQL
db.prepare("SELECT * FROM provider_connections").all();

// ✅ ଠିକ୍: providers ମଡ୍ୟୁଲ୍ର ଫଙ୍କସନ୍ ବ୍ୟବହାର କରନ୍ତୁ
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

ଏହି ନିୟମ କୋଡ୍ ସମୀକ୍ଷା ମାଧ୍ୟମରେ ପ୍ରବର୍ତ୍ତନ କରାଯାଏ — ଏଥିପାଇଁ କୌଣସି ସ୍ଥିର ଯାଞ୍ଚ ନାହିଁ, କିନ୍ତୁ ଉଲ୍ଲଂଘନଗୁଡ଼ିକୁ ଚିହ୍ନିତ କରାଯାଏ।

---

## ମୂଳ ସ୍କିମା (17ଟି ଟେବୁଲ୍)

`core.ts`, `SCHEMA_SQL` ମଧ୍ୟରେ 17ଟି ମୂଳ ଟେବୁଲ୍କୁ ପରିଭାଷିତ କରେ। ଏଗୁଡ଼ିକ migration `001_initial_schema.sql` ଦ୍ୱାରା ସୃଷ୍ଟି ହୁଏ ଏବଂ ମୁଖ୍ୟ ସ୍କିମା ଗଠନ କରେ।

### ମୁଖ୍ୟ ଟେବୁଲ୍ଗୁଡ଼ିକ (ପ୍ରାରମ୍ଭିକ migrationରେ ସୃଷ୍ଟି)

| ଟେବୁଲ୍                     | ଉଦ୍ଦେଶ୍ୟ                                     | ପ୍ରମୁଖ କଲମ୍                                                             |
| -------------------------- | -------------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | ପ୍ରଦାତାଙ୍କ ପରିଚୟପତ୍ର (ଏନ୍କ୍ରିପ୍ଟ କରାଯାଇଥିବା) | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | ପ୍ରଦାତା ନୋଡ୍ର ରାଉଟିଂ ସୂଚନା                   | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | ସାଧାରଣ KV ଷ୍ଟୋର୍                             | `namespace`, `key`, `value`                                             |
| `combos`                   | ରାଉଟିଂ କମ୍ବୋର ପରିଭାଷା                        | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | ଗେଟୱେ ପାଇଁ API କୀଗୁଡ଼ିକ                      | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | ଡାଟାବେସ୍ ମେଟାଡାଟା                            | `key`, `value`                                                          |
| `usage_history`            | ଅନୁରୋଧ ବ୍ୟବହାର ରେକର୍ଡ                        | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | ଅନୁରୋଧ ପେଲୋଡ୍ ଏବଂ ପ୍ରତିକ୍ରିୟା                | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | ପ୍ରକ୍ସି ଅନୁରୋଧ ଲଗ୍                           | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | ମଡେଲ୍ରୁ ପ୍ରଦାତା ପର୍ଯ୍ୟନ୍ତ ଶୃଙ୍ଖଳ             | `model`, `chain`                                                        |
| `domain_budgets`           | ପ୍ରତି ଡୋମେନ୍ର ଖର୍ଚ୍ଚ ବଜେଟ୍                   | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | ବଜେଟ୍ ପୁନଃସେଟ୍ ଇତିହାସ                        | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | ପ୍ରତି ଡୋମେନ୍ର ଖର୍ଚ୍ଚ ଟ୍ରାକିଂ                 | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | ଡୋମେନ୍ ହାର-ସୀମା ସ୍ଥିତି                       | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | ପ୍ରତି ଡୋମେନ୍ର ସର୍କିଟ୍ ବ୍ରେକର୍ ସ୍ଥିତି         | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | LLM ପ୍ରତିକ୍ରିୟା କ୍ୟାଶ୍                       | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | ଐତିହାସିକ କୋଟା ସ୍ନାପ୍ସଟ୍                      | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### ଅତିରିକ୍ତ ଟେବୁଲ୍ଗୁଡ଼ିକ (ପରବର୍ତ୍ତୀ migrationଗୁଡ଼ିକ ଦ୍ୱାରା ଯୋଡ଼ାଯାଇଛି)

ପରବର୍ତ୍ତୀ migrationଗୁଡ଼ିକ ନିମ୍ନଲିଖିତ ଟେବୁଲ୍ଗୁଡ଼ିକୁ ଯୋଡ଼ନ୍ତି:

- `cli_tool_state` (migration 011) — CLI ଟୁଲ୍ର ସ୍ଥିତି
- `mcp_*` ଟେବୁଲ୍ଗୁଡ଼ିକ — MCP ସର୍ଭର୍ ଅଡିଟ୍
- `a2a_*` ଟେବୁଲ୍ଗୁଡ଼ିକ — A2A କାର୍ଯ୍ୟ ସ୍ଥିତି
- `usage_*` ଟେବୁଲ୍ଗୁଡ଼ିକ — ବ୍ୟବହାର ଟ୍ରାକିଂ
- `plugin_*` ଟେବୁଲ୍ଗୁଡ଼ିକ — ପ୍ଲଗ୍ଇନ୍ ସିଷ୍ଟମ୍
- `skill_executions` — ଦକ୍ଷତା ନିଷ୍ପାଦନ ଇତିହାସ
- `memory_*` ଟେବୁଲ୍ଗୁଡ଼ିକ — ମେମୋରି ସିଷ୍ଟମ୍
- `compression_*` ଟେବୁଲ୍ଗୁଡ଼ିକ — କମ୍ପ୍ରେସନ୍ ସିଷ୍ଟମ୍
- `webhook_*` ଟେବୁଲ୍ଗୁଡ଼ିକ — ୱେବ୍ହୁକ୍ ବିତରଣ ଲଗ୍
- `acp_*` ଟେବୁଲ୍ଗୁଡ଼ିକ — Agent Client Protocol
- `oneproxy_*` ଟେବୁଲ୍ଗୁଡ଼ିକ — 1proxy ମାର୍କେଟ୍ପ୍ଲେସ୍
- `proxy_assignments` — ପ୍ରକ୍ସି ସ୍କୋପ୍ ବାଇଣ୍ଡିଂ
- `detailed_call_artifacts` — କଲ୍ ଲଗ୍ ଆର୍ଟିଫ୍ୟାକ୍ଟ ମେଟାଡାଟା
- `quota_alert_history` — କୋଟା ସତର୍କତା ଅଡିଟ୍
- `command_code_auth_sessions` — Command Code OAuth ସେସନ୍ଗୁଡ଼ିକ

~30+ ଟେବୁଲ୍ର ସମ୍ପୂର୍ଣ୍ଣ ତାଲିକା `src/lib/db/migrations/`ରେ ରହିଛି।

---

## ମାଇଗ୍ରେସନ୍ଗୁଡ଼ିକ

OmniRoute `src/lib/db/migrations/` ମଧ୍ୟରେ **ସଂସ୍କରଣଯୁକ୍ତ, ଆଇଡେମ୍ପୋଟେଣ୍ଟ ମାଇଗ୍ରେସନ୍** ବ୍ୟବହାର କରେ। ପ୍ରତ୍ୟେକ ମାଇଗ୍ରେସନ୍ ହେଉଛି `NNN_description.sql` ନାମକ ଗୋଟିଏ SQL ଫାଇଲ୍।

### ମାଇଗ୍ରେସନ୍ ନାମକରଣ

```
001_initial_schema.sql
002_mcp_a2a_tables.sql
003_provider_node_custom_paths.sql
...
021_combo_call_log_targets.sql
```

### ମାଇଗ୍ରେସନ୍ଗୁଡ଼ିକ କିପରି ଚାଲେ

ଆରମ୍ଭ ସମୟରେ, `migrationRunner.ts`:

1. ଉପସ୍ଥିତ ନଥିଲେ `_omniroute_migrations` ଟେବୁଲ୍ ସୃଷ୍ଟି କରେ
2. ପୂର୍ବରୁ ପ୍ରୟୋଗ ହୋଇଥିବା ମାଇଗ୍ରେସନ୍ଗୁଡ଼ିକ ପାଇଁ କ୍ୱେରୀ କରେ
3. କ୍ରମାନୁସାରେ ପ୍ରତ୍ୟେକ ନୂଆ ମାଇଗ୍ରେସନ୍କୁ ଗୋଟିଏ ଟ୍ରାଞ୍ଜାକ୍ସନ୍ରେ ପ୍ରୟୋଗ କରେ
4. ପ୍ରତ୍ୟେକ ପ୍ରୟୋଗ ହୋଇଥିବା ମାଇଗ୍ରେସନ୍କୁ ଟାଇମ୍ଷ୍ଟାମ୍ପ ସହିତ ରେକର୍ଡ କରେ

```ts
// src/lib/db/migrationRunner.ts (ସରଳୀକୃତ)
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

### ଆଇଡେମ୍ପୋଟେନ୍ସି

ମାଇଗ୍ରେସନ୍ଗୁଡ଼ିକ **ଆଇଡେମ୍ପୋଟେଣ୍ଟ** ହେବା ଆବଶ୍ୟକ — ସେଗୁଡ଼ିକୁ ଦୁଇଥର ଚଲାଇଲେ କୌଣସି କାର୍ଯ୍ୟ ହେବା ଉଚିତ୍ ନୁହେଁ:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

`IF NOT EXISTS`, `IF EXISTS`, ଏବଂ `OR IGNORE` / `OR REPLACE` କ୍ଲଜ୍ଗୁଡ଼ିକୁ ଉଦାର ଭାବରେ ବ୍ୟବହାର କରନ୍ତୁ।

### ଏକ ନୂଆ ମାଇଗ୍ରେସନ୍ ଯୋଡ଼ିବା

1. **ପରବର୍ତ୍ତୀ ସଂଖ୍ୟା ଚିହ୍ନଟ କରନ୍ତୁ**: `ls src/lib/db/migrations/ | tail -1`
2. **ଫାଇଲ୍ ସୃଷ୍ଟି କରନ୍ତୁ**: `NNN_my_change.sql`
3. **ନିରାପଦ DDL ବ୍ୟବହାର କରନ୍ତୁ**: `CREATE TABLE IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
4. **ସାବଧାନତାର ସହ ଡାଟା ବ୍ୟାକ୍ଫିଲ୍ କରନ୍ତୁ**: ବିଦ୍ୟମାନ ଧାଡ଼ିଗୁଡ଼ିକୁ ପରିଚାଳନା କରିବା ପାଇଁ `UPDATE ... WHERE ...` ବ୍ୟବହାର କରନ୍ତୁ
5. **ଏକ କପିରେ ପରୀକ୍ଷା କରନ୍ତୁ**: ପ୍ରଡକ୍ସନ୍ରେ କେବେ ମଧ୍ୟ ପରୀକ୍ଷା ହୋଇନଥିବା ମାଇଗ୍ରେସନ୍ ଚଲାନ୍ତୁ ନାହିଁ

ଉଦାହରଣ:

```sql
-- 022_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **ପୂର୍ବ ସଂସ୍କରଣ ସହ ଅସଙ୍ଗତ ପରିବର୍ତ୍ତନଗୁଡ଼ିକ** (ଯଥା, କଲମ୍ ଅପସାରଣ କରିବା) ଜଟିଳ। OmniRoute ଡାଉନ୍ଗ୍ରେଡ୍ ସମର୍ଥନ କରେ ନାହିଁ — ଥରେ ଏକ ମାଇଗ୍ରେସନ୍ ପ୍ରୟୋଗ ହେଲେ, ସ୍କିମା ପରିବର୍ତ୍ତନଟି ସ୍ଥାୟୀ ହୋଇଯାଏ। ସେହି ଅନୁଯାୟୀ ଯୋଜନା କରନ୍ତୁ।

---

## ସଂରକ୍ଷିତ ଅବସ୍ଥାରେ ଏନ୍କ୍ରିପ୍ସନ୍

ସମ୍ବେଦନଶୀଳ ଫିଲ୍ଡଗୁଡ଼ିକ (API କୀ, OAuth ଟୋକନ୍, କନେକ୍ସନ୍ ଷ୍ଟ୍ରିଙ୍ଗ୍) ସଂରକ୍ଷିତ ଅବସ୍ଥାରେ **AES-256-GCM** ବ୍ୟବହାର କରି ଏନ୍କ୍ରିପ୍ଟ କରାଯାଏ।

### ଏହା କିପରି କାମ କରେ

```ts
// src/lib/db/encryption.ts (ସରଳୀକୃତ)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### ଏହା କେଉଁଠି ବ୍ୟବହୃତ ହୁଏ

- `provider_connections.api_key` — ଆପ୍ଲିକେସନ୍ ସ୍ତରରେ ଏନ୍କ୍ରିପ୍ଟ କରାଯାଏ
- `provider_connections.access_token`, `refresh_token`, `id_token` — ଆପ୍ଲିକେସନ୍ ସ୍ତରରେ ଏନ୍କ୍ରିପ୍ଟ କରାଯାଏ
- `namespace = "secrets"` ଥିବା `key_value` ଏଣ୍ଟ୍ରିଗୁଡ଼ିକ — ଆପ୍ଲିକେସନ୍ ସ୍ତରରେ ଏନ୍କ୍ରିପ୍ଟ କରାଯାଏ
- `proxy_registry.auth` — ଉପସ୍ଥିତ ଥିଲେ ଆପ୍ଲିକେସନ୍ ସ୍ତରରେ ଏନ୍କ୍ରିପ୍ଟ କରାଯାଏ

### ଏନ୍କ୍ରିପ୍ସନ୍ କୀ

ଏନ୍କ୍ରିପ୍ସନ୍ କୀ ଏକ **ପାସ୍ଫ୍ରେଜ୍** (`STORAGE_ENCRYPTION_KEY` env var ମାଧ୍ୟମରେ ସେଟ୍ କରାଯାଏ) ଏବଂ ଏକ **ସଲ୍ଟ** (DB ରେ ସଂରକ୍ଷିତ) ଠାରୁ ଉତ୍ପନ୍ନ କରାଯାଏ। ଡାଟା ଡିକ୍ରିପ୍ଟ କରିବା ପାଇଁ ଉଭୟ ଆବଶ୍ୟକ।

```bash
# ଏକ ସୁରକ୍ଷିତ ପାସ୍ଫ୍ରେଜ୍ ସୃଷ୍ଟି କରନ୍ତୁ
openssl rand -hex 32

# .env ରେ ସେଟ୍ କରନ୍ତୁ
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ**: ଏନ୍କ୍ରିପ୍ସନ୍ କୀ ହରାଇବାର ଅର୍ଥ ହେଉଛି ସମସ୍ତ ଏନ୍କ୍ରିପ୍ଟ ହୋଇଥିବା ଡାଟାକୁ ପ୍ରବେଶ ହରାଇବା। **ଡାଟାବେସ୍ଠାରୁ ଅଲଗା ଭାବରେ କୀର ବ୍ୟାକ୍ଅପ୍ ରଖନ୍ତୁ**।

### କେଉଁଗୁଡ଼ିକ ଏନ୍କ୍ରିପ୍ଟ ହୁଏ ନାହିଁ

କାର୍ଯ୍ୟଦକ୍ଷତାଜନିତ କାରଣରୁ, ନିମ୍ନଲିଖିତଗୁଡ଼ିକୁ ପ୍ଲେନ୍ଟେକ୍ସ୍ଟରେ ସଂରକ୍ଷଣ କରାଯାଏ:

- ପ୍ରଦାନକାରୀଙ୍କ ପ୍ରଦର୍ଶିତ ନାମ
- ମଡେଲ୍ ସଂଜ୍ଞାଗୁଡ଼ିକ (ପୂର୍ବରୁ ସାର୍ବଜନୀନ)
- ରାଉଟିଂ ନିୟମଗୁଡ଼ିକ
- ବ୍ୟବହାର ରେକର୍ଡଗୁଡ଼ିକ (କୌଣସି PII ନାହିଁ)

---

## ଏନ୍କ୍ରିପ୍ସନ୍ ସତର୍କତା (v3.8.16+)

ଦୁଇଟି ଏନ୍କ୍ରିପ୍ସନ୍ ପଦ୍ଧତିକୁ ସ୍ୱଚ୍ଛ ଭାବରେ ପରିଚାଳନା କରିବା ପାଇଁ OmniRoute **`migrateLegacyEncryptedString()`** ବ୍ୟବହାର କରେ:

- **ପୁରୁଣା** (v3.5.0 ପୂର୍ବରୁ): XOR-ଆଧାରିତ "ଏନ୍କ୍ରିପ୍ସନ୍" (ପ୍ରକୃତ କ୍ରିପ୍ଟୋଗ୍ରାଫି ନୁହେଁ)
- **ବର୍ତ୍ତମାନର**: ଉପଯୁକ୍ତ IV ଏବଂ ଅଥେଣ୍ଟିକେସନ୍ ଟ୍ୟାଗ୍ ସହିତ AES-256-GCM

ମାଇଗ୍ରେସନ୍ ସହାୟକ ପୁରୁଣା ଫର୍ମାଟ୍କୁ ଚିହ୍ନଟ କରେ ଏବଂ ପ୍ରଥମ ଥର ପଢ଼ିବା ସମୟରେ ନୂତନ ପଦ୍ଧତିରେ ପୁନଃ-ଏନ୍କ୍ରିପ୍ଟ କରେ। ଏହାର ଅର୍ଥ, କ୍ରେଡେନ୍ସିଆଲ୍ ନ ହରାଇ ଆପଣ ଏକ ପୁରୁଣା ଡାଟାବେସ୍କୁ ଅପ୍ଗ୍ରେଡ୍ କରିପାରିବେ।

---

## ରିଡ୍ କ୍ୟାଶ୍

ବାରମ୍ବାର ପଢ଼ାଯାଉଥିବା ଡାଟା (ମଡେଲ୍, ପ୍ରଦାତା, ସେଟିଂସ୍) ପାଇଁ, `readCache.ts` ଏକ **ଇନ୍-ମେମୋରି କ୍ୟାଶ୍** ପ୍ରଦାନ କରେ:

```ts
// ଷ୍ଟାର୍ଟଅପ୍ ସମୟରେ କ୍ୟାଶ୍ ହୁଏ, ଲେଖିବାବେଳେ ଅବୈଧ କରାଯାଏ
const providers = await getCachedProviders(); // ଦ୍ରୁତ, ଇନ୍-ମେମୋରି
const fresh = await listProviders(); // ଧୀର, DB ଆକ୍ସେସ୍ କରେ
```

| କ୍ୟାଶ୍ ହୋଇଥିବା ଏଣ୍ଟିଟି | କ୍ୟାଶ୍ କୀ      | TTL                |
| ---------------------- | -------------- | ------------------ |
| `models`               | `models:v1`    | ଲେଖାଯିବା ପର୍ଯ୍ୟନ୍ତ |
| `provider_connections` | `providers:v1` | ଲେଖାଯିବା ପର୍ଯ୍ୟନ୍ତ |
| `settings`             | `settings:v1`  | ଲେଖାଯିବା ପର୍ଯ୍ୟନ୍ତ |
| `combos`               | `combos:v1`    | ଲେଖାଯିବା ପର୍ଯ୍ୟନ୍ତ |

ସମ୍ପୃକ୍ତ ଟେବୁଲ୍ରେ ପ୍ରତ୍ୟେକ ଲେଖା ସମୟରେ କ୍ୟାଶ୍କୁ ଅବୈଧ କରାଯାଏ।

---

## ବ୍ୟାକଅପ୍ ଏବଂ ପୁନରୁଦ୍ଧାର

### ମାନୁଆଲ୍ ବ୍ୟାକଅପ୍

```bash
# ଏକ ଲୋକାଲ୍ ବ୍ୟାକଅପ୍ ସୃଷ୍ଟି କରିବା ପାଇଁ CLI ବ୍ୟବହାର କରନ୍ତୁ
omniroute backup create --name pre-migration

# କିମ୍ବା API ମାଧ୍ୟମରେ
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

ବ୍ୟାକଅପ୍ ଫାଇଲ୍ରେ ଅନ୍ତର୍ଭୁକ୍ତ:

- ସମସ୍ତ DB ଟେବୁଲ୍ (JSON ଭାବରେ ସିରିଆଲାଇଜ୍ କରାଯାଇଛି)
- କଲ୍ ଲଗ୍ ଆର୍ଟିଫ୍ୟାକ୍ଟ (base64-ଏନ୍କୋଡ୍ କରାଯାଇଛି, ଇଚ୍ଛାଧୀନ)
- ସେଟିଂସ୍ + ସିକ୍ରେଟ୍ସ୍ (ଏନ୍କ୍ରିପ୍ଟ କରାଯାଇଛି)
- ପ୍ଲଗଇନ୍ କନଫିଗରେସନ୍

### ପୁନରୁଦ୍ଧାର

```bash
# CLI ମାଧ୍ୟମରେ
omniroute restore pre-migration

# API ମାଧ୍ୟମରେ
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **ସତର୍କତା**: ପୁନରୁଦ୍ଧାର ସମ୍ପୂର୍ଣ୍ଣ DBକୁ ଓଭରରାଇଟ୍ କରେ। ପ୍ରଥମେ ସମସ୍ତ କ୍ଲାଏଣ୍ଟକୁ ବନ୍ଦ କରନ୍ତୁ।

### ସ୍ୱୟଂଚାଳିତ ବ୍ୟାକଅପ୍

```bash
# CLI ମାଧ୍ୟମରେ ସ୍ୱୟଂଚାଳିତ ଦୈନିକ ବ୍ୟାକଅପ୍ ସକ୍ଷମ କରନ୍ତୁ
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

ଏହି ସମୟସୂଚୀ ସର୍ଭର୍ ପାର୍ଶ୍ୱରେ ଏକ ବ୍ୟାକ୍ଗ୍ରାଉଣ୍ଡ୍ ଜବ୍ ଦ୍ୱାରା କାର୍ଯ୍ୟକାରୀ ହୁଏ, ଯାହା ପ୍ରତି 30 ସେକେଣ୍ଡରେ
(ଡିଫଲ୍ଟ) ଟିକ୍ କରେ ଏବଂ ଲୋକାଲ୍ ସର୍ଭର୍ ସମୟ ଅନୁସାରେ cron ଏକ୍ସପ୍ରେସନ୍କୁ ମୂଲ୍ୟାଙ୍କନ କରେ।

| ଭେରିଏବଲ୍                                    | ଡିଫଲ୍ଟ  | ବର୍ଣ୍ଣନା                                                                                                                        |
| ------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000` | msରେ ଟିକ୍ ଅନ୍ତରାଳ (ସର୍ବନିମ୍ନ `5000`)। ମେଳ ଖାଉଥିବା cron ମିନିଟ୍ ମଧ୍ୟରେ ନିର୍ଭରଯୋଗ୍ୟ ଭାବେ ପହଞ୍ଚିବା ପାଇଁ ଏହା 60 sରୁ କମ୍ ହେବା ଆବଶ୍ୟକ। |

### SQLite ହଟ୍ ବ୍ୟାକଅପ୍

ଚାଲୁଥିବା DBର ଶୂନ୍ୟ-ଡାଉନ୍ଟାଇମ୍ ବ୍ୟାକଅପ୍ ପାଇଁ:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

ଏହା SQLiteର ଅନଲାଇନ୍ ବ୍ୟାକଅପ୍ API ବ୍ୟବହାର କରେ — OmniRoute ଚାଲୁଥିବା ସମୟରେ ମଧ୍ୟ ଏହାକୁ ଚଲାଇବା ସୁରକ୍ଷିତ।

---

## କାର୍ଯ୍ୟଦକ୍ଷତା ଟ୍ୟୁନିଂ

### WAL ମୋଡ୍

WAL ଡିଫଲ୍ଟ ଭାବେ ସକ୍ଷମ ଅଛି। ଅଧିକ ରାଇଟ୍ ଥିବା ୱାର୍କଲୋଡ୍ଗୁଡ଼ିକ ପାଇଁ, ନିମ୍ନଲିଖିତ ବିଚାର କରନ୍ତୁ:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- ପ୍ରତି 1000 ପୃଷ୍ଠାରେ ଚେକ୍ପଏଣ୍ଟ
PRAGMA journal_size_limit = 67108864;  -- 64MB WAL ସୀମା
```

### ଇଣ୍ଡେକ୍ସଗୁଡ଼ିକ

କାର୍ଯ୍ୟଦକ୍ଷତା ପାଇଁ ପ୍ରମୁଖ ଇଣ୍ଡେକ୍ସଗୁଡ଼ିକ (ମାଇଗ୍ରେସନ୍ ଦ୍ୱାରା ସ୍ୱୟଂଚାଳିତ ଭାବେ ସୃଷ୍ଟି ହୁଏ):

- `idx_models_provider` — ପ୍ରଦାନକାରୀ ଅନୁସାରେ ମଡେଲ୍ ସନ୍ଧାନ
- `idx_combo_targets_combo_id` — କମ୍ବୋ ଟାର୍ଗେଟ୍ ବିସ୍ତାର
- `idx_usage_history_api_key_timestamp` — ବ୍ୟବହାର ବିଶ୍ଳେଷଣ
- `idx_quota_snapshots_api_key_window` — କୋଟା ଟ୍ରାକିଂ
- `idx_call_logs_timestamp` — କଲ୍ ଲଗ୍ କ୍ୱେରିଗୁଡ଼ିକ

ଏକ ନୂଆ ଇଣ୍ଡେକ୍ସ ଯୋଡ଼ିବା ପାଇଁ, ଏକ ମାଇଗ୍ରେସନ୍ ସୃଷ୍ଟି କରନ୍ତୁ:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### ମେମୋରି-ମ୍ୟାପ୍ଡ I/O

ଅତ୍ୟନ୍ତ ବଡ଼ ଡାଟାବେସ୍ଗୁଡ଼ିକ (>10GB) ପାଇଁ, SQLite pragma ମାଧ୍ୟମରେ ମେମୋରି ମ୍ୟାପିଂ ସମନ୍ୱୟ କରାଯାଇପାରିବ:

```sql
-- SQLite pragma ମାଧ୍ୟମରେ ସେଟ୍ କରନ୍ତୁ (core.ts କିମ୍ବା ରନ୍ଟାଇମ୍ରେ ସମନ୍ୱୟ କରନ୍ତୁ)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### କମ୍ପାକ୍ସନ୍

ଦୀର୍ଘ ସମୟ ଧରି ଚାଲୁଥିବା OmniRoute ଇନ୍ଷ୍ଟାନ୍ସଗୁଡ଼ିକ ସମୟେ ସମୟେ `VACUUM` ଚଲାଇବା ଦ୍ୱାରା ଲାଭବାନ ହୁଅନ୍ତି:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

କମ୍ ଟ୍ରାଫିକ୍ ଥିବା ସମୟରେ ମାସିକ ଭାବେ ଏହାକୁ ଚଲାନ୍ତୁ। (WAL ମୋଡ୍ ଏହାର ଆବଶ୍ୟକତା କମାଏ, କିନ୍ତୁ ସମ୍ପୂର୍ଣ୍ଣ ଭାବେ ଦୂର କରେ ନାହିଁ।)

---

## ସ୍ୱାସ୍ଥ୍ୟ ଯାଞ୍ଚ

`src/lib/db/healthCheck.ts` **DB-ସ୍ତରୀୟ ସ୍ୱାସ୍ଥ୍ୟ ନିଦାନ** ପ୍ରଦାନ କରେ:

ଉଭୟ କ୍ରିୟା ପାଇଁ ପ୍ରାମାଣିକରଣ ଆବଶ୍ୟକ (ଅନ୍ୟଥା `401`)। `GET` କେବଳ ନିଦାନ କରେ; `POST`, `autoRepair` ସକ୍ଷମ ଥିବା ଅବସ୍ଥାରେ ସମାନ ଯାଞ୍ଚ ଚଲାଏ।

```bash
GET  /api/db/health   # ନିଦାନ କରନ୍ତୁ
POST /api/db/health   # ନିଦାନ + ମରାମତି
```

ପ୍ରତିକ୍ରିୟାଟି `runDbHealthCheck()` ଦ୍ୱାରା ଉତ୍ପାଦିତ `DbHealthCheckResult`
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "ଡୋମେନ୍ ବଜେଟ୍ଗୁଡ଼ିକ ଆଉ ଅବସ୍ଥିତ ନଥିବା API କୀଗୁଡ଼ିକୁ ସନ୍ଦର୍ଭ କରିଥିଲେ।",
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

| ଫିଲ୍ଡ             | ଅର୍ଥ                                                                                                                                                     |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | `issues` ଖାଲି ଥିଲେ `true`। `driver` ଏହାକୁ କେବେ ମଧ୍ୟ ପ୍ରଭାବିତ କରେ ନାହିଁ।                                                                                  |
| `issues[].type`   | `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state` ମଧ୍ୟରୁ ଗୋଟିଏ।                                                            |
| `repairedCount`   | ଏହି ଚାଳନ ସମୟରେ ମରାମତି ହୋଇଥିବା ଧାଡ଼ିଗୁଡ଼ିକ; `autoRepair` false ଥିଲେ ସର୍ବଦା `0`।                                                                           |
| `backupCreated`   | ମରାମତି ପୂର୍ବରୁ ଏକ ବ୍ୟାକ୍ଅପ୍ ନିଆଯାଇଥିଲା କି ନାହିଁ।                                                                                                         |
| `checkedAt`       | ଚାଳନ ଏବଂ ଏହା ଲେଖୁଥିବା ଯେକୌଣସି ମରାମତି ଟିପ୍ପଣୀ ପାଇଁ ସାଧାରଣ ISO ଟାଇମ୍ଷ୍ଟାମ୍ପ।                                                                               |
| `driver.name`     | ଯାଞ୍ଚ କରାଯାଇଥିବା ଡାଟାବେସ୍କୁ ସେବା ପ୍ରଦାନ କରୁଥିବା SQLite ଡ୍ରାଇଭର୍।                                                                                         |
| `driver.degraded` | ରାଇଟ୍ଗୁଡ଼ିକ ଡାଟାବେସ୍ ଫାଇଲ୍ ଦ୍ୱାରା ସ୍ଥାୟୀ ଭାବେ ସମର୍ଥିତ ନଥିଲେ `true` — `sql.js` WASM ଫଲ୍ବ୍ୟାକ୍ (ସମ୍ପୂର୍ଣ୍ଣ-ଫାଇଲ୍ ସ୍ଥାୟୀକରଣ) କିମ୍ବା ଏକ ଇନ୍-ମେମୋରି ଡାଟାବେସ୍। |

ସମାନ ପେଲୋଡ୍ `omniroute_db_health_check` MCP ଟୁଲ୍ ଦ୍ୱାରା ଫେରାଯାଏ।

କରପ୍ସନ୍ ଚିହ୍ନଟ କରିବା ପାଇଁ `PRAGMA integrity_check` ଚଲାନ୍ତୁ:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# ଏହା ପ୍ରିଣ୍ଟ୍ ହେବା ଉଚିତ: ok
```

ଯଦି ଏହା `ok` ବ୍ୟତୀତ ଅନ୍ୟ କିଛି ଫେରାଏ, **ତୁରନ୍ତ ଡାଟାବେସ୍ ବ୍ୟବହାର ବନ୍ଦ କରନ୍ତୁ** ଏବଂ ବ୍ୟାକ୍ଅପ୍ରୁ ପୁନଃସ୍ଥାପନ କରନ୍ତୁ।

---

## ବିପର୍ଯ୍ୟୟ ପରବର୍ତ୍ତୀ ପୁନରୁଦ୍ଧାର

### ପରିସ୍ଥିତି 1: WAL ଫାଇଲ୍ ହଜିଯାଇଛି

`-wal` ଫାଇଲ୍ ହଜିଯାଇଛି, କିନ୍ତୁ `-shm` ଏବଂ ମୁଖ୍ୟ DB ଅକ୍ଷୁଣ୍ଣ ଅଛି:

```bash
# ପରବର୍ତ୍ତୀ ଥର ଖୋଲିବା ସମୟରେ ସ୍ୱୟଂଚାଳିତ ଭାବେ ପୁନରୁଦ୍ଧାର ହୁଏ
omniroute
```

ଯଦି SQLite ସ୍ୱୟଂଚାଳିତ ଭାବେ ପୁନରୁଦ୍ଧାର କରିପାରେ ନାହିଁ:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### ପରିସ୍ଥିତି 2: ମୁଖ୍ୟ DB ଫାଇଲ୍ ଦୂଷିତ ହୋଇଛି

ବ୍ୟାକଅପ୍ରୁ ପୁନଃସ୍ଥାପନ କରନ୍ତୁ:

```bash
omniroute sync pull --merge   # କିମ୍ବା: omniroute backup restore <backup-id>
```

### ପରିସ୍ଥିତି 3: ଏନ୍କ୍ରିପ୍ସନ୍ କୀ ହଜିଯାଇଛି

କୀ ବିନା **ପୁନରୁଦ୍ଧାର ସମ୍ଭବ ନୁହେଁ**। ଏନ୍କ୍ରିପ୍ଟ ହୋଇଥିବା ଫିଲ୍ଡଗୁଡ଼ିକ ପଠନଯୋଗ୍ୟ ନୁହେଁ। ନୂତନ ପରିଚୟପତ୍ର ସହ ସମସ୍ତ ପ୍ରଦାନକାରୀଙ୍କୁ ମାନୁଆଲ୍ ଭାବେ ପୁନଃ ଯୋଡ଼ନ୍ତୁ।

> **ପ୍ରତିକାର**: ଏନ୍କ୍ରିପ୍ସନ୍ କୀକୁ ସର୍ବଦା ପୃଥକ ଭାବେ ବ୍ୟାକଅପ୍ କରନ୍ତୁ, ଆଦର୍ଶ ଭାବେ ଏକ ପାସ୍ୱାର୍ଡ ମ୍ୟାନେଜର୍ କିମ୍ବା KMSରେ।

### ପରିସ୍ଥିତି 4: ଡିସ୍କ ପୂର୍ଣ୍ଣ

SQLite `SQLITE_FULL` ତ୍ରୁଟି ଫେରାଇବ। ଡିସ୍କ ସ୍ଥାନ ଖାଲି କରନ୍ତୁ, ତା’ପରେ:

```bash
# ସ୍ଥାନ ଖାଲି କରିବା ପାଇଁ WAL ଚେକ୍ପଏଣ୍ଟ କରନ୍ତୁ
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## ସାଧାରଣ କାର୍ଯ୍ୟଗୁଡ଼ିକ

### ଏକ ଟେବୁଲ୍ ଯାଞ୍ଚ କରନ୍ତୁ

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### ସମସ୍ତ ଟେବୁଲ୍ରେ ଧାଡ଼ି ସଂଖ୍ୟା ଗଣନା କରନ୍ତୁ

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### ସମସ୍ତ ତଥ୍ୟ ରିସେଟ୍ (ମୋଛି) କରନ୍ତୁ

```bash
# ପ୍ରଥମେ OmniRoute ବନ୍ଦ କରନ୍ତୁ
omniroute stop

# DB ଫାଇଲ୍ ବିଲୋପ କରନ୍ତୁ
rm ~/.omniroute/storage.sqlite*

# ପୁନରାରମ୍ଭ କରନ୍ତୁ (ଖାଲି DB ପୁନଃ ସୃଷ୍ଟି ହେବ)
omniroute
```

ଏକ **ଚୟନାତ୍ମକ** ରିସେଟ୍ ପାଇଁ (ପ୍ରଦାନକାରୀଙ୍କୁ ରଖି, ବ୍ୟବହାର ତଥ୍ୟ ମୋଛନ୍ତୁ):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### ଗୋଟିଏ ଟେବୁଲ୍ ରପ୍ତାନି କରନ୍ତୁ

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## ସମସ୍ୟା ନିବାରଣ

### "ଡାଟାବେସ୍ ଲକ୍ ହୋଇଛି"

ଅନ୍ୟ ଏକ ପ୍ରକ୍ରିୟା ରାଇଟ୍ ଲକ୍ ଧରି ରଖିଛି। ନିମ୍ନଲିଖିତ ମଧ୍ୟରୁ ଗୋଟିଏ କରନ୍ତୁ:

- ଅନ୍ୟ ପ୍ରକ୍ରିୟା ସମାପ୍ତ ହେବା ପର୍ଯ୍ୟନ୍ତ ଅପେକ୍ଷା କରନ୍ତୁ (`lsof | grep storage.sqlite` ଯାଞ୍ଚ କରନ୍ତୁ)
- ଅନ୍ୟ ପ୍ରକ୍ରିୟାକୁ ବନ୍ଦ କରନ୍ତୁ
- ସମସ୍ୟା ଜାରି ରହିଲେ, OmniRoute ପୁନରାରମ୍ଭ କରନ୍ତୁ

### "ଫରେନ୍ କୀ ସୀମାବଦ୍ଧତା ବିଫଳ ହୋଇଛି"

ଏକ ଡୋମେନ୍ ମଡ୍ୟୁଲ୍ ରେଫରେନ୍ସିଆଲ୍ ଇଣ୍ଟେଗ୍ରିଟି ଉଲ୍ଲଂଘନ କରୁଛି। ଯାଞ୍ଚ କରନ୍ତୁ:

- ନିର୍ଭରଶୀଳ ଟେବୁଲ୍ଗୁଡ଼ିକରେ ଅନାଥ ଧାଡ଼ି
- ପ୍ରସାରିତ ହୋଇନଥିବା କ୍ୟାସ୍କେଡିଂ ବିଲୋପ
- ଏକ ଫରେନ୍ କୀ ପରିବର୍ତ୍ତନ କରିଥିବା ସାମ୍ପ୍ରତିକ ମାଇଗ୍ରେସନ୍

ଉଲ୍ଲଂଘନଗୁଡ଼ିକ ଖୋଜିବା ପାଇଁ `PRAGMA foreign_key_check;` ଚଲାନ୍ତୁ।

### "ମେମୋରି ଶେଷ ହୋଇଛି"

SQLiteର ମେମୋରି-ମ୍ୟାପ୍ଡ୍ I/O, OS ସୀମା ଅତିକ୍ରମ କରୁଛି। SQLite pragma ମାଧ୍ୟମରେ ଏହାକୁ ହ୍ରାସ କରନ୍ତୁ:

```sql
PRAGMA mmap_size = 134217728;  -- 256MB ପରିବର୍ତ୍ତେ 128MB
```

କିମ୍ବା ଅକ୍ଷମ କରନ୍ତୁ:

```sql
PRAGMA mmap_size = 0;
```

### "ମାଇଗ୍ରେସନ୍ ମଝିରେ ବିଫଳ ହୋଇଛି"

ମାଇଗ୍ରେସନ୍ଟି ଏକ ଟ୍ରାଞ୍ଜାକ୍ସନ୍ରେ ଚାଲିଥିଲା, ତେଣୁ ଏହା ରୋଲ୍ବ୍ୟାକ୍ ହୋଇଥିବା ଉଚିତ। ଯଦି ହୋଇନାହିଁ:

1. **OmniRoute ବନ୍ଦ କରନ୍ତୁ** (ପରବର୍ତ୍ତୀ ପ୍ରୟାସଗୁଡ଼ିକୁ ରୋକନ୍ତୁ)
2. `sqlite3` ସହିତ **DBର ସ୍ଥିତି ଯାଞ୍ଚ କରନ୍ତୁ**
3. ଆଂଶିକ ମାଇଗ୍ରେସନ୍କୁ **ମାନୁଆଲ୍ ଭାବେ ଠିକ୍ କରନ୍ତୁ**
4. OmniRouteକୁ **ପୁନଃ ଚଲାନ୍ତୁ** (ମାଇଗ୍ରେସନ୍ ପୁଣି ପ୍ରୟାସ କରାଯିବ)

ଏହାକୁ ରୋକିବା ପାଇଁ, ସର୍ବଦା ପ୍ରଥମେ ଏକ କପିରେ ମାଇଗ୍ରେସନ୍ ପରୀକ୍ଷା କରନ୍ତୁ।

---

## ଏହା ମଧ୍ୟ ଦେଖନ୍ତୁ

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — ବ୍ୟବହାର ଟେବୁଲ୍ଗୁଡ଼ିକ
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — ସ୍ୱାସ୍ଥ୍ୟ ନିରୀକ୍ଷଣ
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — ରିଲିଜ୍ ପ୍ରବାହ
- ଉତ୍ସ: `src/lib/db/` (80+ ଫାଇଲ୍, ~25K LOC)
