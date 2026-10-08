# Compliance & Audit (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../security/COMPLIANCE.md) · 🇪🇹 [am](../../../am/docs/security/COMPLIANCE.md) · 🇸🇦 [ar](../../../ar/docs/security/COMPLIANCE.md) · 🇦🇿 [az](../../../az/docs/security/COMPLIANCE.md) · 🇧🇬 [bg](../../../bg/docs/security/COMPLIANCE.md) · 🇧🇩 [bn](../../../bn/docs/security/COMPLIANCE.md) · 🇧🇦 [bs](../../../bs/docs/security/COMPLIANCE.md) · 🇨🇿 [cs](../../../cs/docs/security/COMPLIANCE.md) · 🇩🇰 [da](../../../da/docs/security/COMPLIANCE.md) · 🇩🇪 [de](../../../de/docs/security/COMPLIANCE.md) · 🇬🇷 [el](../../../el/docs/security/COMPLIANCE.md) · 🇪🇸 [es](../../../es/docs/security/COMPLIANCE.md) · 🇪🇪 [et](../../../et/docs/security/COMPLIANCE.md) · 🇮🇷 [fa](../../../fa/docs/security/COMPLIANCE.md) · 🇫🇮 [fi](../../../fi/docs/security/COMPLIANCE.md) · 🇫🇷 [fr](../../../fr/docs/security/COMPLIANCE.md) · 🇮🇪 [ga](../../../ga/docs/security/COMPLIANCE.md) · 🇮🇳 [gu](../../../gu/docs/security/COMPLIANCE.md) · 🇳🇬 [ha](../../../ha/docs/security/COMPLIANCE.md) · 🇮🇱 [he](../../../he/docs/security/COMPLIANCE.md) · 🇮🇳 [hi](../../../hi/docs/security/COMPLIANCE.md) · 🇭🇷 [hr](../../../hr/docs/security/COMPLIANCE.md) · 🇭🇺 [hu](../../../hu/docs/security/COMPLIANCE.md) · 🇦🇲 [hy](../../../hy/docs/security/COMPLIANCE.md) · 🇮🇩 [id](../../../id/docs/security/COMPLIANCE.md) · 🇳🇬 [ig](../../../ig/docs/security/COMPLIANCE.md) · 🇮🇹 [it](../../../it/docs/security/COMPLIANCE.md) · 🇯🇵 [ja](../../../ja/docs/security/COMPLIANCE.md) · 🇬🇪 [ka](../../../ka/docs/security/COMPLIANCE.md) · 🇰🇭 [km](../../../km/docs/security/COMPLIANCE.md) · 🇮🇳 [kn](../../../kn/docs/security/COMPLIANCE.md) · 🇰🇷 [ko](../../../ko/docs/security/COMPLIANCE.md) · 🇱🇹 [lt](../../../lt/docs/security/COMPLIANCE.md) · 🇱🇻 [lv](../../../lv/docs/security/COMPLIANCE.md) · 🇮🇳 [ml](../../../ml/docs/security/COMPLIANCE.md) · 🇮🇳 [mr](../../../mr/docs/security/COMPLIANCE.md) · 🇲🇾 [ms](../../../ms/docs/security/COMPLIANCE.md) · 🇲🇹 [mt](../../../mt/docs/security/COMPLIANCE.md) · 🇲🇲 [my](../../../my/docs/security/COMPLIANCE.md) · 🇳🇵 [ne](../../../ne/docs/security/COMPLIANCE.md) · 🇳🇱 [nl](../../../nl/docs/security/COMPLIANCE.md) · 🇳🇴 [no](../../../no/docs/security/COMPLIANCE.md) · 🇮🇳 [or](../../../or/docs/security/COMPLIANCE.md) · 🇮🇳 [pa](../../../pa/docs/security/COMPLIANCE.md) · 🇵🇭 [phi](../../../phi/docs/security/COMPLIANCE.md) · 🇵🇱 [pl](../../../pl/docs/security/COMPLIANCE.md) · 🇵🇹 [pt](../../../pt/docs/security/COMPLIANCE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/COMPLIANCE.md) · 🇷🇴 [ro](../../../ro/docs/security/COMPLIANCE.md) · 🇷🇺 [ru](../../../ru/docs/security/COMPLIANCE.md) · 🇱🇰 [si](../../../si/docs/security/COMPLIANCE.md) · 🇸🇮 [sl](../../../sl/docs/security/COMPLIANCE.md) · 🇷🇸 [sr](../../../sr/docs/security/COMPLIANCE.md) · 🇸🇪 [sv](../../../sv/docs/security/COMPLIANCE.md) · 🇰🇪 [sw](../../../sw/docs/security/COMPLIANCE.md) · 🇮🇳 [ta](../../../ta/docs/security/COMPLIANCE.md) · 🇮🇳 [te](../../../te/docs/security/COMPLIANCE.md) · 🇹🇭 [th](../../../th/docs/security/COMPLIANCE.md) · 🇹🇷 [tr](../../../tr/docs/security/COMPLIANCE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/COMPLIANCE.md) · 🇵🇰 [ur](../../../ur/docs/security/COMPLIANCE.md) · 🇺🇿 [uz](../../../uz/docs/security/COMPLIANCE.md) · 🇻🇳 [vi](../../../vi/docs/security/COMPLIANCE.md) · 🇳🇬 [yo](../../../yo/docs/security/COMPLIANCE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/COMPLIANCE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/COMPLIANCE.md)

---

> **Zdroj pravdy:** `src/lib/compliance/`, `src/app/api/compliance/`
> **Posledná aktualizácia:** 2026-06-28 — v3.8.40

OmniRoute zaznamenáva administratívne akcie, udalosti autentifikácie, zmeny životného cyklu prihlasovacích údajov poskytovateľov a volania nástrojov MCP do auditných tabuliek podporovaných databázou SQLite. Táto stránka opisuje, čo sa zaznamenáva, kde sa údaje nachádzajú, ako dlho sa uchovávajú, ako môžu kľúče API zrušiť účasť na zaznamenávaní a ako údaje vyhľadávať.

Implementácia sa nachádza v `src/lib/compliance/index.ts` (T-43 — „Kontrolné mechanizmy súladu“) a `src/lib/compliance/providerAudit.ts`. Zápisy auditu nikdy nevyvolávajú výnimky: pri akomkoľvek zlyhaní sa volanie potichu ignoruje, aby auditné zaznamenávanie nemohlo narušiť hlavný tok požiadavky.

## Čo sa zaznamenáva

### Administratívne auditné udalosti (`audit_log`)

Každé volanie `logAuditEvent({ action, actor, target, details, ... })` vytvorí jeden riadok. Reťazce akcií používajú vzor `domain.verb` (alebo `domain.verb.outcome`). Typy akcií potvrdené v zdrojovom strome zahŕňajú:

| Akcia                                | Zdroj                                   |
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

Každý záznam obsahuje `action`, `actor` (predvolená hodnota je `"system"`), `target`, `details`/`metadata` (JSON), `ip_address`, `resource_type`, `status`, `request_id` a `timestamp`. Citlivé kľúče (`apiKey`, `accessToken`, `refreshToken`, `password`, čokoľvek zodpovedajúce vzorom `*token`/`*secret`/`*apikey` atď.) sa pred zápisom riadka rekurzívne redigujú na `"[redacted]"`.

### Volania nástrojov MCP (`mcp_tool_audit`)

Každé vyvolanie nástroja MCP zapíše riadok prostredníctvom `open-sse/mcp-server/audit.ts`. Schéma (zo súboru `src/lib/db/migrations/002_mcp_a2a_tables.sql`):

| Stĺpec           | Poznámky                                    |
| ---------------- | ------------------------------------------- |
| `id`             | automaticky sa zvyšujúca hodnota            |
| `tool_name`      | identifikátor nástroja MCP                  |
| `input_hash`     | sha256 vstupu (užitočné dáta sa neukladajú) |
| `output_summary` | krátke, skrátené zhrnutie                   |
| `duration_ms`    | uplynutý čas                                |
| `api_key_id`     | volajúci (môže byť null)                    |
| `success`        | `1` / `0`                                   |
| `error_code`     | konečný kód chyby pri zlyhaní               |
| `created_at`     | časová pečiatka ISO                         |

### Protokoly požiadaviek/používania

Ide o prevádzkovú telemetriu (nie výlučne o administratívny audit), ktorá však využíva rovnaký proces uchovávania:

- `usage_history` — súhrn používania pre jednotlivé požiadavky
- `call_logs` — úplný protokol jednotlivých požiadaviek (podlieha limitu počtu riadkov, pozri nižšie)
- `proxy_logs` — protokol prevádzky proxy (podlieha limitu počtu riadkov)
- `request_detail_logs` — starší podrobný protokol požiadaviek (ak existuje, naďalej sa premazáva)

## Schéma úložiska

Tabuľka `audit_log` sa vytvára lenivo pomocou `ensureAuditLogSchema()` pri prvom použití:

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

Indexy sa vytvárajú pre `timestamp`, `action`, `actor`, `resource_type`,
`status` a `request_id`. Chýbajúce stĺpce v starších databázach sa podľa
potreby pridávajú pomocou `ALTER TABLE`.

## Uchovávanie a čistenie

Dodržiavajú sa dve samostatné obdobia uchovávania:

| Premenná prostredia         | Predvolená hodnota | Vzťahuje sa na                                                    |
| --------------------------- | ------------------ | ----------------------------------------------------------------- |
| `APP_LOG_RETENTION_DAYS`    | `7`                | `audit_log`, `mcp_tool_audit`                                     |
| `CALL_LOG_RETENTION_DAYS`   | `7`                | `usage_history`, `call_logs`, `proxy_logs`, `request_detail_logs` |
| `CALL_LOGS_TABLE_MAX_ROWS`  | `100000`           | Obmedzenie počtu riadkov v `call_logs`                            |
| `PROXY_LOGS_TABLE_MAX_ROWS` | `100000`           | Obmedzenie počtu riadkov v `proxy_logs`                           |

Funkcia `cleanupExpiredLogs()` spúšťa proces uplatnenia pravidiel uchovávania. Volá sa pri spustení servera
zo súboru `src/instrumentation-node.ts`. Každé spustenie zaznamená
udalosť auditu `compliance.cleanup` s počtom odstránených záznamov pre každú tabuľku. Skracovanie protokolov proxy/volaní
prebieha po dávkach (`BATCH_SIZE = 5000`), aby sa predišlo dlhým zámkom zápisu.

Ručné čistenie histórie požiadaviek je oddelené od uchovávania. Stránka Protokoly požiadaviek
volá `POST /api/settings/purge-request-history`, čím odstráni `call_logs`,
staršie `request_detail_logs` a lokálne artefakty požiadaviek v
`${DATA_DIR}/call_logs/`.

Predvolené hodnoty sú definované v `src/lib/logEnv.ts`
(`DEFAULT_APP_LOG_RETENTION_DAYS = 7`, `DEFAULT_CALL_LOG_RETENTION_DAYS = 7`).

## Vyradenie pomocou `noLog` (pre každý kľúč API)

Kľúče API možno označiť tak, aby sa ich následná prevádzka volaní nezaznamenávala. Tento
príznak sa nachádza v tabuľke `api_keys` (`no_log INTEGER DEFAULT 0`) a je zrkadlený
do množiny v pamäti na rýchle vyhľadávanie.

```bash
# Vytvorenie kľúča bez protokolovania (vyžaduje sa autentifikácia správcu)
curl -X POST http://localhost:20128/api/keys \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"name": "Privacy key", "noLog": true}'
```

Pomocné funkcie (`src/lib/compliance/index.ts`):

- `setNoLog(apiKeyId, true|false)` — prepína položku v pamäti
- `isNoLog(apiKeyId)` — kontroluje sa na ceste požiadavky; ako záložný mechanizmus používa načítanie z `api_keys.no_log`
  ukladané do vyrovnávacej pamäte na 30 s
- `NO_LOG_API_KEY_IDS` (premenná prostredia, hodnoty oddelené čiarkami) — pri spustení sa predbežne načíta do množiny
  v pamäti; užitočné, keď stĺpec nemôžete prepínať priamo

Udalosti administratívneho auditu (prihlásenie, zmeny poskytovateľa, volania nástrojov MCP atď.)
**nie sú** ovplyvnené nastavením `noLog` — vyradené je iba protokolovanie prevádzky
jednotlivých požiadaviek.

## REST API

| Koncový bod                 | Metóda | Popis                                         | Autorizácia |
| --------------------------- | ------ | --------------------------------------------- | ----------- |
| `/api/compliance/audit-log` | `GET`  | Stránkované záznamy auditu správcu s filtrami | management  |
| `/api/mcp/audit`            | `GET`  | Stránkované záznamy auditu nástrojov MCP      | (open-sse)  |
| `/api/mcp/audit/stats`      | `GET`  | Agregované štatistiky auditu MCP              | (open-sse)  |

V súčasnosti sa neposkytuje žiadny koncový bod na export do CSV — exportujte údaje z ovládacieho panela alebo sa priamo dopytujte
databázy SQLite.

### Dopytovanie `/api/compliance/audit-log`

Podporované parametre dopytu (všetky sú voliteľné, všetky používajú porovnávanie `LIKE %value%`
pre textové filtre):

- `action`, `actor`, `target`, `resourceType` (alebo `resource_type`),
  `status`, `requestId` (alebo `request_id`)
- `from` / `since`, `to` / `until` — časové pečiatky ISO
- `limit` (predvolene `50`, min. `1`, max. `500`)
- `offset` (predvolene `0`, max. `10_000`)

Odpoveďou je pole JSON. Metadáta stránkovania sa vracajú v hlavičkách:
`x-total-count`, `x-page-limit`, `x-page-offset`.

```bash
curl "http://localhost:20128/api/compliance/audit-log?action=provider.credentials&from=2026-05-01" \
  -H "Cookie: auth_token=..."
```

## Ovládací panel

Ovládací panel sprístupňuje údaje auditu na adrese **`/dashboard/audit`**
(`src/app/(dashboard)/dashboard/audit/page.tsx`). Stránka obsahuje dve karty:

- **Súlad** (`ComplianceTab.tsx`) — udalosti auditu správcu z
  `/api/compliance/audit-log`. Filtrovanie podľa typu udalosti, závažnosti (informačná / varovanie
  / kritická, odvodená od akcie a stavu) a rozsahu dátumov. Závažnosť sa
  vypočítava na strane klienta z reťazcov akcie a stavu.
- **MCP** (`McpAuditTab.tsx`) — audit nástrojov MCP z `/api/mcp/audit` s
  filtrami podľa názvu nástroja a úspechu/neúspechu.

Obe karty používajú stránkovanie s veľkosťou stránky `50` (súlad) a `25` (MCP).

## Pomocné funkcie pre prihlasovacie údaje poskytovateľa

`src/lib/compliance/providerAudit.ts` poskytuje pomocné funkcie na formátovanie, ktoré používajú
trasy správy poskytovateľov pri generovaní udalostí prihlasovacích údajov:

- `summarizeProviderConnectionForAudit(connection)` — odstráni `apiKey`,
  `accessToken`, `refreshToken`, `idToken` a
  `providerSpecificData.consoleApiKey` pred zapísaním snímky pripojenia
  do `details`.
- `getProviderAuditTarget(connection)` — zostaví stabilný reťazec
  `"<provider>:<name|id>"` pre pole `target`.
- `extractProviderWarnings(...payloads)` — prehľadáva odpovede poskytovateľov a hľadá
  varovania týkajúce sa zásad/bezpečnosti (`[sanitizer]`, `prompt injection detected`,
  `content has been filtered`, `safety filter`, `policy violation`) a
  poskytne najviac 5 nálezov, pričom každý skráti na 400 znakov.

## Osvedčené postupy

- Kľúče API spracúvajúce osobné identifikačné údaje (právne, zdravotné atď.) označte pomocou `noLog: true`.
- Nastavte `APP_LOG_RETENTION_DAYS` / `CALL_LOG_RETENTION_DAYS` tak, aby zodpovedali vašim
  zásadám uchovávania. Predvolené hodnoty 7 dní sú konzervatívne.
- Exportujte tabuľku auditu mimo platformy (`sqlite3 dump`) v intervaloch,
  ktoré vyžaduje váš program súladu — vstavaná archivácia nie je k dispozícii.
- Sledujte počty `auth.login.failed` a `auth.login.locked` na detekciu
  útokov hrubou silou.
- Pri pridávaní nových koncových bodov správcu volajte `logAuditEvent({ ... })` so stabilným
  reťazcom akcie `domain.verb.outcome` a odovzdajte kontext požiadavky prostredníctvom
  `getAuditRequestContext(request)`, aby sa IP adresa a `requestId` zachytili
  automaticky.

## Pozri tiež

- [`docs/security/GUARDRAILS.md`](./GUARDRAILS.md) — maskovanie PII, vkladanie škodlivých promptov
- [`docs/frameworks/MCP-SERVER.md`](../frameworks/MCP-SERVER.md) — katalóg nástrojov MCP a rozsahy
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md) — úplný prehľad premenných prostredia
- Zdroj: `src/lib/compliance/`, `src/app/api/compliance/`,
  `src/app/api/mcp/audit/`, `src/lib/logEnv.ts`
