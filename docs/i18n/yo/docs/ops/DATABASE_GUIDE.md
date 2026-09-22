# Database Schema & Operations Guide (Yorùbá)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **Ní ṣókí**: OmniRoute ń lo **SQLite pẹ̀lú ìkọ̀wé àkọsílẹ̀ WAL** gẹ́gẹ́ bí ibi ìpamọ́ àkọ́kọ́ rẹ̀, pẹ̀lú ìfipamọ́ **AES-256-GCM** fún àwọn ààyè ìsọfúnni tó ṣe pàtàkì nígbà tí wọ́n wà ní ìpamọ́. Ìtọ́sọ́nà yìí ṣàlàyé ètò schema, àwọn ìṣíkiri, àfẹ́yìntì/ìmúpadàbọ̀sípò, àti àwọn ìtọ́sọ́nà iṣẹ́.

**Àwọn orísun:**

- `src/lib/db/core.ts` — ẹyọ kan ṣoṣo + SCHEMA_SQL (àwọn tábìlì ìpìlẹ̀ 17)
- `src/lib/db/migrationRunner.ts` — àwọn ìṣíkiri tó ní nọ́ńbà ẹ̀yà
- `src/lib/db/migrations/` — àwọn fáìlì SQL 167 tó ní nọ́ńbà ẹ̀yà
- `src/lib/db/encryption.ts` — àwọn ohun èlò ìrànlọ́wọ́ ìfipamọ́
- `src/lib/db/backup.ts` — ìkójáde/ìkó wọlé àfẹ́yìntì
- `src/lib/db/healthCheck.ts` — àyẹ̀wò ìlera

---

## Kí nìdí tí a fi yan SQLite?

OmniRoute yan SQLite dípò PostgreSQL/MySQL fún ọ̀pọ̀ ìdí:

| Kókó         | SQLite                              | PostgreSQL                            |
| ------------ | ----------------------------------- | ------------------------------------- |
| **Ìmúṣiṣẹ́**  | Ó wà nínú ètò — kò nílò olupin ọ̀tọ̀  | Ó nílò ìṣètò olupin                   |
| **Ìfipamọ́**  | Ní ipele ohun èlò (AES-256-GCM)     | TDE tó wà nínú rẹ̀                     |
| **Ìṣiṣẹ́**    | Yára fún ẹrù iṣẹ́ kékeré/alábọ̀ọ́dé    | Dára jù fún ọ̀pọ̀lọpọ̀ ìkọ̀wé lẹ́ẹ̀kan náà  |
| **Ìṣiṣẹ́pọ̀**  | Ipò WAL ń gba kíkà lẹ́ẹ̀kan náà láàyè | MVCC kíkún                            |
| **Àfẹ́yìntì** | Ìdàkọ fáìlì kan ṣoṣo                | `pg_dump` tàbí àwòrán-ìpamọ́ ètò fáìlì |
| **Ìlò**      | Fífìdí rẹ̀ múlẹ̀ fún aṣàmúlò kọ̀ọ̀kan   | SaaS olùgbé-ọ̀pọ̀                       |

Fún àwọn ìmúṣiṣẹ́ **aṣàmúlò kan, instance kan** (èyí tí ó jẹ́ ìlò pàtàkì OmniRoute), SQLite rọrùn sí i, ó sì yára sí i.

### Ìkọ̀wé Àkọsílẹ̀ WAL

`core.ts` ṣí ibi ìpamọ́ dátà náà pẹ̀lú **ipò WAL (Write-Ahead Logging)**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL ń gba **kíkà lẹ́ẹ̀kan náà** láàyè nígbà ìkọ̀wé — èyí ṣe pàtàkì fún dashboard, tó ń ṣe ìbéèrè nígbà tí a ń ṣe àkọsílẹ̀ àwọn ìbéèrè.

Ìwọ̀n cache àkọ́kọ́ jẹ́ **65,536 KiB (64 MiB)**. SQLite ń túmọ̀
`cache_size` tí ó jẹ́ òdì gẹ́gẹ́ bí ààlà òkè ìsúnmọ́ ní KiB, ó sì ń pín àwọn ojú-ewé bí a ṣe nílò wọn.
**Ètò > Ètò àti Ìpamọ́ > Ìwọ̀n Cache** ń gba àwọn iye odidi láti **1 sí
1,000,000 KiB**; fífi ètò náà pamọ́ máa lò ó fún ìsopọ̀ ibi ìpamọ́ dátà tó ń ṣiṣẹ́,
OmniRoute sì máa mú iye tí a ti fi pamọ́ padà nígbà ìbẹ̀rẹ̀.

---

## Ibi tí Ibi Ìpamọ́ Dátà Wà

Fáìlì SQLite náà wà ní:

| OS      | Ọ̀nà                                                         |
| ------- | ----------------------------------------------------------- |
| Linux   | `~/.omniroute/storage.sqlite`                               |
| macOS   | `~/.omniroute/storage.sqlite`                               |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                   |
| Docker  | `/app/data/storage.sqlite` (a lè ṣètò rẹ̀ nípasẹ̀ `DATA_DIR`) |

Àwọn fáìlì alábàákẹ́gbẹ́:

- `storage.sqlite-wal` — àkọsílẹ̀ ìkọ̀wé ṣáájú
- `storage.sqlite-shm` — fáìlì ìrántí alájọpín
- `call_logs/` — àwọn ohun èlò payload ìbéèrè (tí a bá mú un ṣiṣẹ́)

**Yí ibi náà padà:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Àgbékalẹ̀ Modulu Ìkápá

Básì dátà OmniRoute ní **àwọn modulu TypeScript ipele-òkè 110** nínú `src/lib/db/`. Modulu ìkápá kọ̀ọ̀kan:

- Ní tábìlì pàtó kan tàbí jù bẹ́ẹ̀ lọ
- Ṣe àgbéjáde àwọn iṣẹ́ CRUD tí a ti sọ irú wọn
- Kì í fọwọ́ kan àwọn tábìlì modulu mìíràn láéláé
- Lo `getDbInstance()` láti inú `core.ts` láti ráyè sí DB

### Àwọn Modulu DB Ipele-Òkè 110 Náà

OmniRoute ní **àwọn fáìlì TypeScript ipele-òkè 110** nínú `src/lib/db/`. Ní ìsàlẹ̀ ni àpẹẹrẹ díẹ̀ lára àwọn modulu pàtàkì; wo àkójọ àpótí-fáìlì fún àkójọ pípé:

| Modulu                  | Àwọn Tábìlì                                                    | Ojúṣe                                                                                |
| ----------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `providers.ts`          | `provider_connections`                                         | Ìforúkọsílẹ̀ olùpèsè OAuth/API key àti àwọn ìwé-ẹ̀rí ìwọlé                             |
| `models.ts`             | `key_value` (dátà model)                                       | Àwọn ìtumọ̀ model, agbára, àti ìṣirò owó                                              |
| `combos.ts`             | `combos`                                                       | Àwọn àtòjọ ìṣàkóso ipa ọ̀nà combo àti bí a ṣe tò wọ́n                                  |
| `apiKeys.ts`            | `api_keys`                                                     | Ìgbésí-ayé API key, àwọn scope, àti ìtọ́pinpin quota                                  |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Ìṣètò ètò àti ibi ìpamọ́ KV tí a jọ ń lò                                              |
| `backup.ts`             | —                                                              | Àwọn iṣẹ́ àgbéjáde/àgbéwọlé afẹ́yinti                                                  |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Àwọn àtòjọ ìṣètò proxy àti àwọn òfin ìdarí ipa ọ̀nà                                   |
| `prompts.ts`            | `prompt_templates`                                             | Àwọn àwòṣe prompt tí a lè tún lò àti ìṣàkóso ẹ̀yà                                     |
| `webhooks.ts`           | `webhooks`                                                     | Àwọn ìforúkọsílẹ̀ webhook tí ìṣẹ̀lẹ̀ ń darí àti àwọn àkọsílẹ̀ wọn                        |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Ìkọ̀wé àyẹ̀wò fún ìbéèrè kọ̀ọ̀kan (àṣàyàn, ìwọ̀n gíga)                                    |
| `domainState.ts`        | `domain_*` (tábìlì 5)                                          | Àwọn ìnáwó ìkápá, circuit breakers, lockouts, àwọn fallback chains, àti ìtàn iye owó |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | Àwọn API key tí a fọwọ́ sí fún MCP/A2A                                                |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Ìtàn lílo quota                                                                      |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | So àwọn model pọ̀ mọ́ àwọn àiyipada combo                                              |
| `cliToolState.ts`       | `cli_tool_state`                                               | Ipò pípẹ́ tó jẹ́ ti CLI                                                                |
| `encryption.ts`         | —                                                              | Àwọn olùrànlọ́wọ́ fún fífi ìpamọ́ sí àwọn field àti yíyọ ọ́ kúrò                         |
| `readCache.ts`          | —                                                              | Cache inú-memory fún àwọn iṣẹ́ kíkà lọ́pọ̀lọpọ̀                                          |
| `secrets.ts`            | `key_value` (àwọn àkọọlẹ̀ tí a fi ìpamọ́ sí)                     | Ìpamọ́ àwọn àṣírí tí a ti fi ìpamọ́ sí                                                 |
| `stateReset.ts`         | —                                                              | Pa/tún ipò DB ṣe fún ìdánwò                                                          |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Àyíká session fún fífi iṣẹ́ lé agent lọ́wọ́                                             |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Ìtọ́pinpin lílo                                                                       |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Ìṣètò compression                                                                    |

### Àwọn Ààlà Modulu

Òfin àgbékalẹ̀ pàtàkì kan ni pé: **àwọn modulu kì í ráyè sí tábìlì ara wọn ní tààrà**. Láti ṣiṣẹ́ pẹ̀lú dátà modulu mìíràn, ṣe àgbéwọlé iṣẹ́ náà láti inú modulu yẹn.

```ts
// ❌ ÀÌTỌ́: SQL tààrà láti inú modulu mìíràn
db.prepare("SELECT * FROM provider_connections").all();

// ✅ Ó TỌ́: lo iṣẹ́ modulu providers
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Àyẹ̀wò kóòdù ló ń mú kí a tẹ̀ lé òfin yìí — kò sí àyẹ̀wò static, ṣùgbọ́n a máa ń ṣàmì sí àwọn ìrúfin.

---

## Àwòrán Ìpilẹ̀ (tábìlì 17)

`core.ts` ṣàlàyé àwọn tábìlì ìpilẹ̀ 17 inú `SCHEMA_SQL`. Ìṣípayá `001_initial_schema.sql` ló ṣẹ̀dá wọn, wọ́n sì jẹ́ àwòrán pàtàkì.

### Àwọn Tábìlì Pàtàkì (tí a ṣẹ̀dá nínú ìṣípayá àkọ́kọ́)

| Tábìlì                     | Ìdí rẹ̀                                  | Àwọn ọ̀wọ̀n pàtàkì                                                        |
| -------------------------- | --------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | Àwọn ẹ̀rí ìdánimọ̀ olùpèsè (tí a paroko)  | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Àlàyé ìdarí node olùpèsè                | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Ibi ìpamọ́ KV gbogbogbòò                 | `namespace`, `key`, `value`                                             |
| `combos`                   | Àwọn ìtumọ̀ àkójọpọ̀ ìdarí                | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | Àwọn kọ́kọ́rọ́ API fún gateway             | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Metadata ibi ìpamọ́ dátà                 | `key`, `value`                                                          |
| `usage_history`            | Àwọn àkọsílẹ̀ lílò ìbéèrè                | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Àkóónú ìbéèrè àti àwọn ìdáhùn           | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Àwọn àkọsílẹ̀ ìbéèrè proxy               | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Àwọn ẹ̀wọ̀n láti model sí olùpèsè         | `model`, `chain`                                                        |
| `domain_budgets`           | Àwọn ìnáwó tí a yàn fún domain kọ̀ọ̀kan   | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Ìtàn àtúntò ìnáwó                       | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Títọpinpin iye owó fún domain kọ̀ọ̀kan    | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Ipò òpin-oṣùwọ̀n domain                  | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Ipò olùdáwọ́lé circuit fún domain kọ̀ọ̀kan | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | Cache ìdáhùn LLM                        | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Àwọn àwòrán quota ìtàn                  | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Àwọn Tábìlì Àfikún (tí àwọn ìṣípayá tó tẹ̀lé fi kún un)

Àwọn ìṣípayá tó tẹ̀lé fi àwọn tábìlì bíi wọ̀nyí kún un:

- `cli_tool_state` (ìṣípayá 011) — ipò irinṣẹ́ CLI
- àwọn tábìlì `mcp_*` — àyẹ̀wò olupin MCP
- àwọn tábìlì `a2a_*` — ipò iṣẹ́ A2A
- àwọn tábìlì `usage_*` — títọpinpin lílò
- àwọn tábìlì `plugin_*` — ètò plugin
- `skill_executions` — ìtàn ìṣiṣẹ́ ọgbọ́n
- àwọn tábìlì `memory_*` — ètò ìrántí
- àwọn tábìlì `compression_*` — ètò ìpọ́pọ̀
- àwọn tábìlì `webhook_*` — àkọsílẹ̀ ìfiránṣẹ́ webhook
- àwọn tábìlì `acp_*` — Ìlànà Oníbàárà Agent
- àwọn tábìlì `oneproxy_*` — ọjà 1proxy
- `proxy_assignments` — àwọn ìsopọ̀ ààlà proxy
- `detailed_call_artifacts` — metadata àwọn artifact àkọsílẹ̀ ìpè
- `quota_alert_history` — àyẹ̀wò ìkìlọ̀ quota
- `command_code_auth_sessions` — àwọn session OAuth Command Code

Àkójọ kíkún àwọn tábìlì tó tó ~30+ wà nínú `src/lib/db/migrations/`.

---

## Àwọn Ìṣíkiri

OmniRoute ń lo **àwọn ìṣíkiri aláwọ̀n-ẹ̀yà, tí ó sì lè ṣiṣẹ́ léraléra láìsí àbájáde àfikún** nínú `src/lib/db/migrations/`. Ìṣíkiri kọ̀ọ̀kan jẹ́ fáìlì SQL kan ṣoṣo tí a sọ lórúkọ ní ìlànà `NNN_description.sql`.

### Bí A Ṣe Ń Sọ Àwọn Ìṣíkiri Lórúkọ

```
001_initial_schema.sql
002_mcp_a2a_tables.sql
003_provider_node_custom_paths.sql
...
021_combo_call_log_targets.sql
```

### Bí Àwọn Ìṣíkiri Ṣe Ń Ṣiṣẹ́

Nígbà ìbẹ̀rẹ̀, `migrationRunner.ts`:

1. Ṣẹ̀dá tábìlì `_omniroute_migrations` tí kò bá sí
2. Ṣàyẹ̀wò àwọn ìṣíkiri tí a ti lò tẹ́lẹ̀
3. Lo gbogbo ìṣíkiri tuntun ní ìtòlẹ́sẹẹsẹ, ọ̀kọ̀ọ̀kan nínú ìdúnàádúrà kan
4. Ṣàkọsílẹ̀ ìṣíkiri kọ̀ọ̀kan tí a lò pẹ̀lú àmì-àkókò

```ts
// src/lib/db/migrationRunner.ts (ní ṣókí)
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

### Ṣíṣiṣẹ́ Léraléra Láìsí Àbájáde Àfikún

Àwọn ìṣíkiri gbọ́dọ̀ **lè ṣiṣẹ́ léraléra láìsí àbájáde àfikún** — ṣíṣe wọn lẹ́ẹ̀mejì kò gbọ́dọ̀ fa ìyípadà kankan:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Lo àwọn gbólóhùn `IF NOT EXISTS`, `IF EXISTS`, àti `OR IGNORE` / `OR REPLACE` lọ́pọ̀lọpọ̀.

### Fífi Ìṣíkiri Tuntun Kún Un

1. **Ṣe ìdánimọ̀ nọ́ńbà tó kàn**: `ls src/lib/db/migrations/ | tail -1`
2. **Ṣẹ̀dá fáìlì náà**: `NNN_my_change.sql`
3. **Lo DDL tó ní ààbò**: `CREATE TABLE IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
4. **Fi dátà àtijọ́ kún un pẹ̀lú ìṣọ́ra**: lo `UPDATE ... WHERE ...` láti bójú tó àwọn ìlà tó ti wà
5. **Dán an wò lórí ẹ̀dà kan**: má ṣe ṣiṣẹ́ àwọn ìṣíkiri tí a kò tíì dán wò lórí production láé

Àpẹẹrẹ:

```sql
-- 022_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Àwọn ìyípadà tí kò bá ẹ̀yà àtijọ́ mu** (fún àpẹẹrẹ, yíyọ àwọn column kúrò) nira. OmniRoute KÒ ṣe àtìlẹ́yìn fún downgrade — ní kété tí a bá lo ìṣíkiri kan, ìyípadà schema náà máa dúró títí láé. Ṣètò ní ìbámu pẹ̀lú èyí.

---

## Ìfipamọ́ Pẹ̀lú Ìparọ́rọ́

Àwọn field tó ṣe pàtàkì (API keys, OAuth tokens, connection strings) ni a ń parọ́ nígbà tí a bá fi wọ́n pamọ́ ní lílo **AES-256-GCM**.

### Bí Ó Ṣe Ń Ṣiṣẹ́

```ts
// src/lib/db/encryption.ts (ní ṣókí)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Ibi Tí A Ti Ń Lò Ó

- `provider_connections.api_key` — a parọ́ rẹ̀ ní ìpele application
- `provider_connections.access_token`, `refresh_token`, `id_token` — a parọ́ wọn ní ìpele application
- Àwọn àkọsílẹ̀ `key_value` tí `namespace = "secrets"` — a parọ́ wọn ní ìpele application
- `proxy_registry.auth` — a parọ́ rẹ̀ ní ìpele application (tí ó bá wà)

### Kọ́kọ́rọ́ Ìparọ́rọ́

A ń ṣe àgbékalẹ̀ kọ́kọ́rọ́ ìparọ́rọ́ láti inú **passphrase** kan (tí a ṣètò nípasẹ̀ env var `STORAGE_ENCRYPTION_KEY`) àti **salt** kan (tí a fi pamọ́ sínú DB). A nílò àwọn méjèèjì láti tú ìparọ́rọ́ dátà.

```bash
# Ṣe àgbéjáde passphrase tó ní ààbò
openssl rand -hex 32

# Ṣètò rẹ̀ nínú .env
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **Ó ṣe pàtàkì gan-an**: Pípàdánù kọ́kọ́rọ́ ìparọ́rọ́ túmọ̀ sí pípàdánù àǹfààní láti ráyè sí gbogbo dátà tí a parọ́. **Ṣe àfẹ́yìntì kọ́kọ́rọ́ náà ní ọ̀tọ̀ sí database**.

### Ohun Tí A KÒ Parọ́

Nítorí ìṣiṣẹ́ kíákíá, àwọn wọ̀nyí ni a ń fi pamọ́ gẹ́gẹ́ bí plaintext:

- Àwọn orúkọ àfihàn provider
- Àwọn àlàyé model (tí ó ti wà fún gbogbo ènìyàn tẹ́lẹ̀)
- Àwọn òfin routing
- Àwọn àkọsílẹ̀ lílò (kò ní PII)

---

## Àwọn Ìkìlọ̀ Nípa Ìfipamọ́ Pẹ̀lú Ìṣàkọ́lé (v3.8.16+)

OmniRoute ń lo **`migrateLegacyEncryptedString()`** láti bójú tó àwọn ọ̀nà ìṣàkọ́lé méjì láìsí ìdíwọ́:

- **Ti àtijọ́** (ṣáájú v3.5.0): “ìṣàkọ́lé” tó dá lórí XOR (kì í ṣe ìṣàkọ́lé gidi)
- **Tìsinsìnyí**: AES-256-GCM pẹ̀lú IV àti àmì ìfàṣẹ̀sí tó péye

Olùrànlọ́wọ́ ìṣíkiri náà máa ń ṣàwárí ọ̀nà àtijọ́, yóò sì tún un ṣe ìṣàkọ́lé pẹ̀lú ọ̀nà tuntun nígbà tí a bá kọ́kọ́ kà á. Èyí túmọ̀ sí pé o lè ṣe ìgbésókè ibi ìpamọ́ dátà àtijọ́ láìpàdánù àwọn ẹ̀rí ìdánimọ̀.

---

## Kaṣe Kíkà

Fún dátà tí a máa ń kà léraléra (àwọn àwòṣe, àwọn olupèsè, àwọn ètò), `readCache.ts` pèsè **kaṣe inú ìrántí**:

```ts
// A fi sínú kaṣe nígbà ìbẹ̀rẹ̀, a sì sọ ọ́ di asán nígbà ìkọ̀wé
const providers = await getCachedProviders(); // Yára, inú ìrántí
const fresh = await listProviders(); // Lọ́ra, ó ń wọ DB
```

| Ohun tó wà nínú kaṣe   | Kọ́kọ́rọ́ kaṣe    | TTL           |
| ---------------------- | -------------- | ------------- |
| `models`               | `models:v1`    | Títí di ìkọ̀wé |
| `provider_connections` | `providers:v1` | Títí di ìkọ̀wé |
| `settings`             | `settings:v1`  | Títí di ìkọ̀wé |
| `combos`               | `combos:v1`    | Títí di ìkọ̀wé |

A máa ń sọ kaṣe di asán ní gbogbo ìgbà tí a bá kọ ohun kan sínú tábìlì tó bá a mu.

---

## Ìṣàfipamọ́ àti Ìmúpadàbọ̀sípò

### Ìṣàfipamọ́ Ọwọ́

```bash
# Lo CLI láti ṣẹ̀dá ìṣàfipamọ́ agbègbè kan
omniroute backup create --name pre-migration

# Tàbí nípasẹ̀ API
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

Fáìlì ìṣàfipamọ́ náà ní àwọn wọ̀nyí:

- Gbogbo àwọn tábìlì DB (tí a ṣe àtẹ̀jáde wọn sí JSON)
- Àwọn ohun èlò àkọsílẹ̀ ìpè (tí a ṣe àkóòdù wọn sí base64, àṣàyàn)
- Àwọn ètò + àwọn àṣírí (tí a ṣe ìṣàkọ́lé wọn)
- Ìṣètò plugin

### Ìmúpadàbọ̀sípò

```bash
# Nípasẹ̀ CLI
omniroute restore pre-migration

# Nípasẹ̀ API
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Ìkìlọ̀**: Ìmúpadàbọ̀sípò máa kọ lé gbogbo DB lórí. Dá gbogbo àwọn client dúró lákọ̀ọ́kọ́.

### Àwọn Ìṣàfipamọ́ Aládàáṣiṣẹ́

```bash
# Mú àwọn ìṣàfipamọ́ ojoojúmọ́ aládàáṣiṣẹ́ ṣiṣẹ́ nípasẹ̀ CLI
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

Iṣẹ́ abẹ́lẹ̀ kan ló ń mú ìṣètò àkókò náà ṣiṣẹ́ ní ẹ̀gbẹ́ server, ó sì ń ṣiṣẹ́ lẹ́ẹ̀kan ní gbogbo ìṣẹ́jú-àáyá 30
(àtìlẹ́yìn), tí ó sì ń ṣe àyẹ̀wò gbólóhùn cron pẹ̀lú àkókò agbègbè server.

| Àyípadà                                     | Àtìlẹ́yìn | Àpèjúwe                                                                                                               |
| ------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`  | Àárín àkókò ìṣiṣẹ́ ní ms (ó kéré jù `5000`). Ó gbọ́dọ̀ kéré ju 60 s lọ láti lè dé inú ìṣẹ́jú cron tó bá mu lọ́nà ìgbẹ́kẹ̀lé. |

### Ìṣàfipamọ́ Gbígbóná SQLite

Fún ìṣàfipamọ́ DB tó ń ṣiṣẹ́ láìsí ìdádúró iṣẹ́:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Èyí ń lo API ìṣàfipamọ́ orí ayélujára ti SQLite — ó ní ààbò láti ṣiṣẹ́ nígbà tí OmniRoute ń ṣiṣẹ́.

---

## Ṣíṣe Àtúnṣe Ìṣiṣẹ́

### Ìpo WAL

WAL ti ṣiṣẹ́ ní àìfọwọ́yí. Fún iṣẹ́ tí ó ní ìkọ̀wé púpọ̀, ronú nípa:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Ṣe checkpoint ní gbogbo ojú-ìwé 1000
PRAGMA journal_size_limit = 67108864;  -- Ààlà WAL 64MB
```

### Àwọn Atọ́ka

Àwọn atọ́ka pàtàkì fún ìṣiṣẹ́ (tí àwọn migration dá ní àìfọwọ́yí):

- `idx_models_provider` — wíwá àwọn model nípasẹ̀ provider
- `idx_combo_targets_combo_id` — ìfẹ̀síwájú àwọn target combo
- `idx_usage_history_api_key_timestamp` — ìtúpalẹ̀ lílò
- `idx_quota_snapshots_api_key_window` — títọpinpin quota
- `idx_call_logs_timestamp` — àwọn ìbéèrè àkọsílẹ̀ ìpè

Láti ṣàfikún atọ́ka tuntun, ṣẹ̀dá migration kan:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### I/O Tí A Ṣe Àwòrán Rẹ̀ Sórí Ìrántí

Fún àwọn database tí ó tóbi gan-an (>10GB), a lè ṣàtúnṣe memory mapping nípasẹ̀ pragma SQLite:

```sql
-- Ṣètò nípasẹ̀ pragma SQLite (ṣàtúnṣe nínú core.ts tàbí runtime)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### Ìfúnpọ̀

Àwọn instance OmniRoute tí ń ṣiṣẹ́ fún ìgbà pípẹ́ máa ń jèrè láti `VACUUM` lẹ́ẹ̀kọ̀ọ̀kan:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Ṣiṣe é lóṣooṣù ní àwọn àkókò tí traffic bá kéré. (Ìpo WAL dín àìní rẹ̀ kù, ṣùgbọ́n kò mú un kúrò pátápátá.)

---

## Àyẹ̀wò Ìlera

`src/lib/db/healthCheck.ts` ń pèsè **àwọn àyẹ̀wò ìlera ní ìpele DB**:

Àwọn verb méjèèjì nílò ìfàṣẹsí (`401` bí kò bá rí bẹ́ẹ̀). `GET` ń ṣe àyẹ̀wò nìkan; `POST` ń ṣe
àyẹ̀wò kan náà pẹ̀lú `autoRepair` tí a ti mú ṣiṣẹ́.

```bash
GET  /api/db/health   # ṣe àyẹ̀wò
POST /api/db/health   # ṣe àyẹ̀wò + túnṣe
```

Ìdáhùn náà ni `DbHealthCheckResult` tí `runDbHealthCheck()` dá
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "Àwọn ìnáwó domain tọ́ka sí àwọn API key tí kò sí mọ́.",
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

| Pápá              | Ìtumọ̀                                                                                                                                             |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | `true` nígbà tí `issues` bá ṣófo. `driver` kò ní ipa lórí rẹ̀ rárá.                                                                                |
| `issues[].type`   | Ọ̀kan lára `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                        |
| `repairedCount`   | Àwọn ìlà tí a túnṣe nígbà ìṣiṣẹ́ yìí; ó máa ń jẹ́ `0` nígbà gbogbo tí `autoRepair` bá jẹ́ false.                                                     |
| `backupCreated`   | Bóyá a ṣe backup kí àtúnṣe tó bẹ̀rẹ̀.                                                                                                               |
| `checkedAt`       | Timestamp ISO tí ìṣiṣẹ́ náà àti àkọsílẹ̀ àtúnṣe èyíkéyìí tí ó kọ pín papọ̀.                                                                          |
| `driver.name`     | Driver SQLite tí ń ṣiṣẹ́ fún database tí a yẹ̀wò.                                                                                                   |
| `driver.degraded` | `true` nígbà tí àwọn ìkọ̀wé kò bá ní ìdúróṣinṣin láti inú fáìlì database — fallback WASM `sql.js` (ìfipamọ́ gbogbo fáìlì) tàbí database inú ìrántí. |

MCP tool `omniroute_db_health_check` náà ń dá payload kan náà padà.

Ṣiṣe `PRAGMA integrity_check` láti ṣàwárí ìbàjẹ́:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Ó yẹ kí ó tẹ̀ jáde: ok
```

Tí ó bá dá ohunkóhun mìíràn padà yàtọ̀ sí `ok`, **dá lílo database náà dúró lẹ́sẹ̀kẹsẹ̀** kí o sì mú un padà láti inú backup.

---

## Ìmúpadàbọ̀sípò Lẹ́yìn Àjálù

### Ìṣẹ̀lẹ̀ 1: Fáìlì WAL Sọnù

Fáìlì `-wal` kò sí, ṣùgbọ́n `-shm` àti DB àkọ́kọ́ ṣì wà ní pípé:

```bash
# Yóò mú ara rẹ̀ padà bọ̀ sípò nígbà tí a bá tún ṣí i
omniroute
```

Tí SQLite kò bá lè mú ara rẹ̀ padà bọ̀ sípò:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Ìṣẹ̀lẹ̀ 2: Fáìlì DB Àkọ́kọ́ Bàjẹ́

Mú un padà láti inú àfẹ́yìntì:

```bash
omniroute sync pull --merge   # tàbí: omniroute backup restore <backup-id>
```

### Ìṣẹ̀lẹ̀ 3: Kọ́kọ́rọ́ Ìfipamọ́ Sọnù

**Kò sí ọ̀nà láti mú un padà bọ̀ sípò** láìsí kọ́kọ́rọ́ náà. A kò lè ka àwọn ààyè tí a ti fi ìfipamọ́ bo. Fi gbogbo àwọn olùpèsè kún un pẹ̀lú ọwọ́ nípa lílo àwọn ẹ̀rí ìwọlé tuntun.

> **Ìdínkù Ewu**: Máa ṣe àfẹ́yìntì kọ́kọ́rọ́ ìfipamọ́ lọ́tọ̀ ní gbogbo ìgbà, ó dára jù lọ láti fi pamọ́ sínú olùṣàkóso ọ̀rọ̀ aṣínà tàbí KMS.

### Ìṣẹ̀lẹ̀ 4: Dísíkì Kún

SQLite yóò dá àwọn àṣìṣe `SQLITE_FULL` padà. Tú ààyè sílẹ̀ lórí dísíkì, lẹ́yìn náà:

```bash
# Ṣe àyè ìdádúró WAL láti tú ààyè sílẹ̀
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Àwọn Ìṣiṣẹ́ Tí Ó Wọ́pọ̀

### Ṣàyẹ̀wò Tábìlì Kan

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Ka Iye Àwọn Ìlà Nínú Gbogbo Tábìlì

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Tún Gbogbo Dátà Ṣètò (Pa Wọ́n Rẹ́)

```bash
# Kọ́kọ́ dá OmniRoute dúró
omniroute stop

# Pa fáìlì DB rẹ́
rm ~/.omniroute/storage.sqlite*

# Tún un bẹ̀rẹ̀ (yóò tún DB òfo ṣẹ̀dá)
omniroute
```

Fún àtúntò **èyí tí a yàn** (pa àwọn olùpèsè mọ́, pa dátà lílò rẹ́):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Gbé Tábìlì Kan Jáde

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Yíyanjú Ìṣòro

### "Database is locked"

Ìlànà mìíràn ń di títẹ̀sílẹ̀ mọ́. Ṣe ọ̀kan nínú àwọn wọ̀nyí:

- Dúró kí ìlànà kejì parí (ṣàyẹ̀wò `lsof | grep storage.sqlite`)
- Dá ìlànà kejì náà dúró
- Tí ìṣòro náà bá ń bá a lọ, tún OmniRoute bẹ̀rẹ̀

### "Foreign key constraint failed"

Módùùlù dóméènì kan ń rú ìṣọ̀kan àwọn ìtọ́kasí. Ṣàyẹ̀wò:

- Àwọn ìlà tí kò ní òbí nínú àwọn tábìlì tó gbára lé wọn
- Àwọn ìparẹ́ alásẹ̀sẹ̀ tí kò tàn dé ibi tó yẹ
- Ìṣíkiri tuntun tó yí kọ́kọ́rọ́ òkèèrè kan padà

Ṣiṣe `PRAGMA foreign_key_check;` láti rí àwọn ìrúfin náà.

### "Out of memory"

I/O tí SQLite so mọ́ ìrántí ti kọjá òpin OS. Dín in kù nípasẹ̀ pragma SQLite:

```sql
PRAGMA mmap_size = 134217728;  -- 128MB dípò 256MB
```

Tàbí pa á:

```sql
PRAGMA mmap_size = 0;
```

### "Migration failed mid-way"

Ìṣíkiri náà ṣiṣẹ́ nínú ìdúnàdúrà, nítorí náà ó yẹ kí ó ti yí àwọn àyípadà padà. Tí kò bá ṣe bẹ́ẹ̀:

1. **Dá OmniRoute dúró** (láti dènà àwọn ìgbìyànjú míì)
2. **Ṣàyẹ̀wò ipò DB** pẹ̀lú `sqlite3`
3. **Ṣàtúnṣe ìṣíkiri aláìpé náà pẹ̀lú ọwọ́**
4. **Tún OmniRoute ṣiṣẹ́** (a ó tún gbìyànjú ìṣíkiri náà)

Láti dènà èyí, máa kọ́kọ́ dán àwọn ìṣíkiri wò lórí ẹ̀dà kan ní gbogbo ìgbà.

---

## Tún Wo

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — àwọn tábìlì lílò
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — àbójútó ìlera
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — ìṣàn ìtújáde
- Orísun: `src/lib/db/` (fáìlì 80+, ~25K LOC)
