# Compliance & Audit (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../security/COMPLIANCE.md) · 🇪🇹 [am](../../../am/docs/security/COMPLIANCE.md) · 🇸🇦 [ar](../../../ar/docs/security/COMPLIANCE.md) · 🇦🇿 [az](../../../az/docs/security/COMPLIANCE.md) · 🇧🇬 [bg](../../../bg/docs/security/COMPLIANCE.md) · 🇧🇩 [bn](../../../bn/docs/security/COMPLIANCE.md) · 🇩🇰 [da](../../../da/docs/security/COMPLIANCE.md) · 🇩🇪 [de](../../../de/docs/security/COMPLIANCE.md) · 🇬🇷 [el](../../../el/docs/security/COMPLIANCE.md) · 🇪🇸 [es](../../../es/docs/security/COMPLIANCE.md) · 🇪🇪 [et](../../../et/docs/security/COMPLIANCE.md) · 🇮🇷 [fa](../../../fa/docs/security/COMPLIANCE.md) · 🇫🇮 [fi](../../../fi/docs/security/COMPLIANCE.md) · 🇫🇷 [fr](../../../fr/docs/security/COMPLIANCE.md) · 🇮🇪 [ga](../../../ga/docs/security/COMPLIANCE.md) · 🇮🇳 [gu](../../../gu/docs/security/COMPLIANCE.md) · 🇳🇬 [ha](../../../ha/docs/security/COMPLIANCE.md) · 🇮🇱 [he](../../../he/docs/security/COMPLIANCE.md) · 🇮🇳 [hi](../../../hi/docs/security/COMPLIANCE.md) · 🇭🇷 [hr](../../../hr/docs/security/COMPLIANCE.md) · 🇭🇺 [hu](../../../hu/docs/security/COMPLIANCE.md) · 🇦🇲 [hy](../../../hy/docs/security/COMPLIANCE.md) · 🇮🇩 [id](../../../id/docs/security/COMPLIANCE.md) · 🇳🇬 [ig](../../../ig/docs/security/COMPLIANCE.md) · 🇮🇹 [it](../../../it/docs/security/COMPLIANCE.md) · 🇯🇵 [ja](../../../ja/docs/security/COMPLIANCE.md) · 🇬🇪 [ka](../../../ka/docs/security/COMPLIANCE.md) · 🇰🇭 [km](../../../km/docs/security/COMPLIANCE.md) · 🇮🇳 [kn](../../../kn/docs/security/COMPLIANCE.md) · 🇰🇷 [ko](../../../ko/docs/security/COMPLIANCE.md) · 🇱🇹 [lt](../../../lt/docs/security/COMPLIANCE.md) · 🇱🇻 [lv](../../../lv/docs/security/COMPLIANCE.md) · 🇮🇳 [ml](../../../ml/docs/security/COMPLIANCE.md) · 🇮🇳 [mr](../../../mr/docs/security/COMPLIANCE.md) · 🇲🇾 [ms](../../../ms/docs/security/COMPLIANCE.md) · 🇲🇹 [mt](../../../mt/docs/security/COMPLIANCE.md) · 🇲🇲 [my](../../../my/docs/security/COMPLIANCE.md) · 🇳🇵 [ne](../../../ne/docs/security/COMPLIANCE.md) · 🇳🇱 [nl](../../../nl/docs/security/COMPLIANCE.md) · 🇳🇴 [no](../../../no/docs/security/COMPLIANCE.md) · 🇮🇳 [or](../../../or/docs/security/COMPLIANCE.md) · 🇮🇳 [pa](../../../pa/docs/security/COMPLIANCE.md) · 🇵🇭 [phi](../../../phi/docs/security/COMPLIANCE.md) · 🇵🇱 [pl](../../../pl/docs/security/COMPLIANCE.md) · 🇵🇹 [pt](../../../pt/docs/security/COMPLIANCE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/COMPLIANCE.md) · 🇷🇴 [ro](../../../ro/docs/security/COMPLIANCE.md) · 🇷🇺 [ru](../../../ru/docs/security/COMPLIANCE.md) · 🇱🇰 [si](../../../si/docs/security/COMPLIANCE.md) · 🇸🇰 [sk](../../../sk/docs/security/COMPLIANCE.md) · 🇸🇮 [sl](../../../sl/docs/security/COMPLIANCE.md) · 🇷🇸 [sr](../../../sr/docs/security/COMPLIANCE.md) · 🇸🇪 [sv](../../../sv/docs/security/COMPLIANCE.md) · 🇰🇪 [sw](../../../sw/docs/security/COMPLIANCE.md) · 🇮🇳 [ta](../../../ta/docs/security/COMPLIANCE.md) · 🇮🇳 [te](../../../te/docs/security/COMPLIANCE.md) · 🇹🇭 [th](../../../th/docs/security/COMPLIANCE.md) · 🇹🇷 [tr](../../../tr/docs/security/COMPLIANCE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/COMPLIANCE.md) · 🇵🇰 [ur](../../../ur/docs/security/COMPLIANCE.md) · 🇺🇿 [uz](../../../uz/docs/security/COMPLIANCE.md) · 🇻🇳 [vi](../../../vi/docs/security/COMPLIANCE.md) · 🇳🇬 [yo](../../../yo/docs/security/COMPLIANCE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/COMPLIANCE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/COMPLIANCE.md)

---

> **Zdroj pravdy:** `src/lib/compliance/`, `src/app/api/compliance/`
> **Poslední aktualizace:** 2026-06-28 — v3.8.40

OmniRoute zaznamenává administrativní akce, události ověřování, změny životního cyklu přihlašovacích údajů poskytovatelů a volání nástrojů MCP do auditních tabulek využívajících SQLite. Tato stránka popisuje, co se zaznamenává, kde jsou data uložena, jak dlouho se uchovávají, jak mohou klíče API zvolit výjimku a jak data dotazovat.

Implementace se nachází v `src/lib/compliance/index.ts` (T-43 — „Kontroly souladu“) a `src/lib/compliance/providerAudit.ts`. Zápisy auditu nikdy nevyvolávají výjimky: při jakémkoli selhání je volání bez upozornění potlačeno, aby protokolování auditu nemohlo narušit hlavní tok požadavku.

## Co se zaznamenává

### Události administrativního auditu (`audit_log`)

Každé volání `logAuditEvent({ action, actor, target, details, ... })` vytvoří jeden řádek. Řetězce akcí se řídí vzorem `domain.verb` (nebo `domain.verb.outcome`). Mezi typy akcí potvrzené ve zdrojovém stromu patří:

| Akce                                 | Zdroj                                   |
| ------------------------------------ | --------------------------------------- |
| `auth.login.success`                 | `src/app/api/auth/login/route.ts`       |
| `auth.login.failed`                  | `src/app/api/auth/login/route.ts`       |
| `auth.login.locked`                  | `src/app/api/auth/login/route.ts`       |
| `auth.login.error`                   | `src/app/api/auth/login/route.ts`       |
| `auth.login.misconfigured`           | `src/app/api/auth/login/route.ts`       |
| `auth.login.setup_required`          | `src/app/api/auth/login/route.ts`       |
| `auth.logout.success`                | `src/app/api/auth/logout/route.ts`      |
| `provider.credentials.created`       | `src/app/api/providers/route.ts`        |
| `provider.credentials.updated`       | `src/app/api/providers/[id]/route.ts`   |
| `provider.credentials.revoked`       | `src/app/api/providers/[id]/route.ts`   |
| `provider.credentials.batch_revoked` | `src/app/api/providers/route.ts`        |
| `sync.token.created`                 | `src/app/api/sync/tokens/route.ts`      |
| `sync.token.revoked`                 | `src/app/api/sync/tokens/[id]/route.ts` |
| `compliance.cleanup`                 | `src/lib/compliance/index.ts`           |

Každý záznam obsahuje `action`, `actor` (výchozí hodnota je `"system"`), `target`, `details`/`metadata` (JSON), `ip_address`, `resource_type`, `status`, `request_id` a `timestamp`. Citlivé klíče (`apiKey`, `accessToken`, `refreshToken`, `password`, cokoli odpovídajícího `*token`/`*secret`/`*apikey` atd.) jsou před zápisem řádku rekurzivně nahrazeny hodnotou `"[redacted]"`.

### Volání nástrojů MCP (`mcp_tool_audit`)

Každé volání nástroje MCP zapíše řádek prostřednictvím `open-sse/mcp-server/audit.ts`. Schéma (ze souboru `src/lib/db/migrations/002_mcp_a2a_tables.sql`):

| Sloupec          | Poznámky                                 |
| ---------------- | ---------------------------------------- |
| `id`             | automaticky navyšovaná hodnota           |
| `tool_name`      | identifikátor nástroje MCP               |
| `input_hash`     | sha256 vstupu (datový obsah se neukládá) |
| `output_summary` | krátké, zkrácené shrnutí                 |
| `duration_ms`    | uplynulý reálný čas                      |
| `api_key_id`     | volající (může mít hodnotu null)         |
| `success`        | `1` / `0`                                |
| `error_code`     | konečný chybový kód při selhání          |
| `created_at`     | časové razítko ISO                       |

### Protokoly požadavků / využití

Jedná se o provozní telemetrii (nikoli striktně o administrativní audit), ale používá stejný proces uchovávání:

- `usage_history` — agregované využití pro každý požadavek
- `call_logs` — úplný protokol jednotlivých požadavků (podléhá omezení počtu řádků, viz níže)
- `proxy_logs` — protokol provozu proxy (podléhá omezení počtu řádků)
- `request_detail_logs` — starší podrobný protokol požadavků (pokud existuje, stále se pročišťuje)

## Schéma úložiště

Tabulka `audit_log` je při prvním použití vytvořena funkcí `ensureAuditLogSchema()`:

```sql
CREATE TABLE IF NOT EXISTS audit_log (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  timestamp     TEXT NOT NULL DEFAULT (datetime('now')),
  action        TEXT NOT NULL,
  actor         TEXT NOT NULL DEFAULT 'system',
  target        TEXT,
  details       TEXT,
  ip_address    TEXT,
  resource_type TEXT,
  status        TEXT,
  request_id    TEXT,
  metadata      TEXT
);
```

Indexy jsou vytvořeny pro sloupce `timestamp`, `action`, `actor`, `resource_type`,
`status` a `request_id`. Chybějící sloupce ve starších databázích jsou podle
potřeby přidány pomocí příkazu `ALTER TABLE`.

## Uchovávání a čištění

Jsou dodržována dvě samostatná období uchovávání:

| Proměnná prostředí          | Výchozí hodnota | Vztahuje se na                                                    |
| --------------------------- | --------------- | ----------------------------------------------------------------- |
| `APP_LOG_RETENTION_DAYS`    | `7`             | `audit_log`, `mcp_tool_audit`                                     |
| `CALL_LOG_RETENTION_DAYS`   | `7`             | `usage_history`, `call_logs`, `proxy_logs`, `request_detail_logs` |
| `CALL_LOGS_TABLE_MAX_ROWS`  | `100000`        | Omezení počtu řádků pro `call_logs`                               |
| `PROXY_LOGS_TABLE_MAX_ROWS` | `100000`        | Omezení počtu řádků pro `proxy_logs`                              |

Funkce `cleanupExpiredLogs()` spouští proces čištění podle pravidel uchovávání.
Je volána při spuštění serveru ze souboru `src/instrumentation-node.ts`. Každé
spuštění zaznamená auditní událost `compliance.cleanup` s počty odstraněných
záznamů pro jednotlivé tabulky. Omezování protokolů proxy a volání se provádí
v dávkách (`BATCH_SIZE = 5000`), aby se předešlo dlouhodobému uzamčení zápisu.

Ruční čištění historie požadavků je oddělené od automatického uchovávání.
Stránka Protokoly požadavků volá `POST /api/settings/purge-request-history`,
které odstraní záznamy z `call_logs`, starší tabulky `request_detail_logs`
a místní artefakty požadavků v `${DATA_DIR}/call_logs/`.

Výchozí hodnoty jsou definovány v `src/lib/logEnv.ts`
(`DEFAULT_APP_LOG_RETENTION_DAYS = 7`, `DEFAULT_CALL_LOG_RETENTION_DAYS = 7`).

## Odhlášení z protokolování pomocí `noLog` (pro jednotlivé API klíče)

API klíče lze označit tak, aby se provoz jejich následných volání
neprotokoloval. Příznak je uložen v tabulce `api_keys`
(`no_log INTEGER DEFAULT 0`) a zrcadlen do sady v paměti pro rychlé
vyhledávání na kritické cestě.

```bash
# Vytvoření klíče bez protokolování (vyžaduje autentizaci pro správu)
curl -X POST http://localhost:20128/api/keys \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"name": "Privacy key", "noLog": true}'
```

Pomocné funkce (`src/lib/compliance/index.ts`):

- `setNoLog(apiKeyId, true|false)` — přepíná záznam v paměti
- `isNoLog(apiKeyId)` — kontroluje se na cestě požadavku; pokud záznam není
  nalezen, použije se čtení z `api_keys.no_log` uložené do mezipaměti na 30 s
- `NO_LOG_API_KEY_IDS` (proměnná prostředí, hodnoty oddělené čárkami) — při
  spuštění se předem načte do sady v paměti; je užitečná, pokud sloupec nelze
  přepínat přímo

Administrativní auditní události (přihlášení, změny poskytovatelů, volání
nástrojů MCP atd.) nejsou nastavením `noLog` **ovlivněny** — odhlášení se
vztahuje pouze na protokolování provozu jednotlivých požadavků.

## REST API

| Koncový bod                 | Metoda | Popis                                      | Autorizace |
| --------------------------- | ------ | ------------------------------------------ | ---------- |
| `/api/compliance/audit-log` | `GET`  | Stránkované položky auditu správy s filtry | management |
| `/api/mcp/audit`            | `GET`  | Stránkované položky auditu nástrojů MCP    | (open-sse) |
| `/api/mcp/audit/stats`      | `GET`  | Agregované statistiky auditu MCP           | (open-sse) |

V současnosti není k dispozici žádný koncový bod pro export do CSV — exportujte data z řídicího panelu nebo se dotazujte
přímo na databázi SQLite.

### Dotazování na `/api/compliance/audit-log`

Podporované parametry dotazu (všechny jsou volitelné, všechny textové filtry
používají porovnávání `LIKE %value%`):

- `action`, `actor`, `target`, `resourceType` (nebo `resource_type`),
  `status`, `requestId` (nebo `request_id`)
- `from` / `since`, `to` / `until` — časová razítka ISO
- `limit` (výchozí hodnota `50`, minimum `1`, maximum `500`)
- `offset` (výchozí hodnota `0`, maximum `10_000`)

Odpovědí je pole JSON. Metadata stránkování jsou vrácena v hlavičkách:
`x-total-count`, `x-page-limit`, `x-page-offset`.

```bash
curl "http://localhost:20128/api/compliance/audit-log?action=provider.credentials&from=2026-05-01" \
  -H "Cookie: auth_token=..."
```

## Řídicí panel

Řídicí panel zpřístupňuje data auditu na adrese **`/dashboard/audit`**
(`src/app/(dashboard)/dashboard/audit/page.tsx`). Stránka obsahuje dvě karty:

- **Soulad s předpisy** (`ComplianceTab.tsx`) — události auditu správy z
  `/api/compliance/audit-log`. Filtrování podle typu události, závažnosti (informační / varování
  / kritická, odvozená z akce a stavu) a rozsahu dat. Závažnost se
  vypočítává na straně klienta z řetězců akce a stavu.
- **MCP** (`McpAuditTab.tsx`) — audit nástrojů MCP z `/api/mcp/audit` s
  filtry podle názvu nástroje a úspěchu či selhání.

Obě karty používají stránkování s velikostí stránky `50` (soulad s předpisy) a `25` (MCP).

## Pomocné funkce pro přihlašovací údaje poskytovatelů

`src/lib/compliance/providerAudit.ts` poskytuje pomocné funkce pro formátování dat, které používají
trasy pro správu poskytovatelů při zaznamenávání událostí přihlašovacích údajů:

- `summarizeProviderConnectionForAudit(connection)` — odstraní `apiKey`,
  `accessToken`, `refreshToken`, `idToken` a
  `providerSpecificData.consoleApiKey` před zapsáním snímku připojení do
  `details`.
- `getProviderAuditTarget(connection)` — sestaví stabilní řetězec
  `"<provider>:<name|id>"` pro pole `target`.
- `extractProviderWarnings(...payloads)` — prohledává odpovědi poskytovatelů a hledá
  varování týkající se zásad či bezpečnosti (`[sanitizer]`, `prompt injection detected`,
  `content has been filtered`, `safety filter`, `policy violation`) a
  vrátí až 5 nálezů, každý zkrácený na 400 znaků.

## Doporučené postupy

- Označte API klíče zpracovávající osobní údaje (právní, zdravotní apod.) pomocí `noLog: true`.
- Upravte `APP_LOG_RETENTION_DAYS` / `CALL_LOG_RETENTION_DAYS` tak, aby odpovídaly vašim
  zásadám uchovávání dat. Výchozí hodnota 7 dnů je konzervativní.
- Exportujte tabulku auditu mimo platformu (`sqlite3 dump`) v intervalu,
  který vyžaduje váš program souladu s předpisy — vestavěná archivace neexistuje.
- Sledujte počty `auth.login.failed` a `auth.login.locked` za účelem detekce
  útoků hrubou silou.
- Při přidávání nových koncových bodů správy volejte `logAuditEvent({ ... })` se stabilním
  řetězcem akce `domain.verb.outcome` a předejte kontext požadavku pomocí
  `getAuditRequestContext(request)`, aby se IP adresa a `requestId` zachytily
  automaticky.

## Viz také

- [`docs/security/GUARDRAILS.md`](./GUARDRAILS.md) — maskování PII, prompt injection
- [`docs/frameworks/MCP-SERVER.md`](../frameworks/MCP-SERVER.md) — katalog nástrojů MCP a rozsahy oprávnění
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md) — úplný přehled proměnných prostředí
- Zdroj: `src/lib/compliance/`, `src/app/api/compliance/`,
  `src/app/api/mcp/audit/`, `src/lib/logEnv.ts`
