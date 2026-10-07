# Compliance & Audit (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../security/COMPLIANCE.md) · 🇪🇹 [am](../../../am/docs/security/COMPLIANCE.md) · 🇸🇦 [ar](../../../ar/docs/security/COMPLIANCE.md) · 🇦🇿 [az](../../../az/docs/security/COMPLIANCE.md) · 🇧🇬 [bg](../../../bg/docs/security/COMPLIANCE.md) · 🇧🇩 [bn](../../../bn/docs/security/COMPLIANCE.md) · 🇧🇦 [bs](../../../bs/docs/security/COMPLIANCE.md) · 🇨🇿 [cs](../../../cs/docs/security/COMPLIANCE.md) · 🇩🇰 [da](../../../da/docs/security/COMPLIANCE.md) · 🇩🇪 [de](../../../de/docs/security/COMPLIANCE.md) · 🇬🇷 [el](../../../el/docs/security/COMPLIANCE.md) · 🇪🇸 [es](../../../es/docs/security/COMPLIANCE.md) · 🇮🇷 [fa](../../../fa/docs/security/COMPLIANCE.md) · 🇫🇮 [fi](../../../fi/docs/security/COMPLIANCE.md) · 🇫🇷 [fr](../../../fr/docs/security/COMPLIANCE.md) · 🇮🇪 [ga](../../../ga/docs/security/COMPLIANCE.md) · 🇮🇳 [gu](../../../gu/docs/security/COMPLIANCE.md) · 🇳🇬 [ha](../../../ha/docs/security/COMPLIANCE.md) · 🇮🇱 [he](../../../he/docs/security/COMPLIANCE.md) · 🇮🇳 [hi](../../../hi/docs/security/COMPLIANCE.md) · 🇭🇷 [hr](../../../hr/docs/security/COMPLIANCE.md) · 🇭🇺 [hu](../../../hu/docs/security/COMPLIANCE.md) · 🇦🇲 [hy](../../../hy/docs/security/COMPLIANCE.md) · 🇮🇩 [id](../../../id/docs/security/COMPLIANCE.md) · 🇳🇬 [ig](../../../ig/docs/security/COMPLIANCE.md) · 🇮🇹 [it](../../../it/docs/security/COMPLIANCE.md) · 🇯🇵 [ja](../../../ja/docs/security/COMPLIANCE.md) · 🇬🇪 [ka](../../../ka/docs/security/COMPLIANCE.md) · 🇰🇭 [km](../../../km/docs/security/COMPLIANCE.md) · 🇮🇳 [kn](../../../kn/docs/security/COMPLIANCE.md) · 🇰🇷 [ko](../../../ko/docs/security/COMPLIANCE.md) · 🇱🇹 [lt](../../../lt/docs/security/COMPLIANCE.md) · 🇱🇻 [lv](../../../lv/docs/security/COMPLIANCE.md) · 🇮🇳 [ml](../../../ml/docs/security/COMPLIANCE.md) · 🇮🇳 [mr](../../../mr/docs/security/COMPLIANCE.md) · 🇲🇾 [ms](../../../ms/docs/security/COMPLIANCE.md) · 🇲🇹 [mt](../../../mt/docs/security/COMPLIANCE.md) · 🇲🇲 [my](../../../my/docs/security/COMPLIANCE.md) · 🇳🇵 [ne](../../../ne/docs/security/COMPLIANCE.md) · 🇳🇱 [nl](../../../nl/docs/security/COMPLIANCE.md) · 🇳🇴 [no](../../../no/docs/security/COMPLIANCE.md) · 🇮🇳 [or](../../../or/docs/security/COMPLIANCE.md) · 🇮🇳 [pa](../../../pa/docs/security/COMPLIANCE.md) · 🇵🇭 [phi](../../../phi/docs/security/COMPLIANCE.md) · 🇵🇱 [pl](../../../pl/docs/security/COMPLIANCE.md) · 🇵🇹 [pt](../../../pt/docs/security/COMPLIANCE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/COMPLIANCE.md) · 🇷🇴 [ro](../../../ro/docs/security/COMPLIANCE.md) · 🇷🇺 [ru](../../../ru/docs/security/COMPLIANCE.md) · 🇱🇰 [si](../../../si/docs/security/COMPLIANCE.md) · 🇸🇰 [sk](../../../sk/docs/security/COMPLIANCE.md) · 🇸🇮 [sl](../../../sl/docs/security/COMPLIANCE.md) · 🇷🇸 [sr](../../../sr/docs/security/COMPLIANCE.md) · 🇸🇪 [sv](../../../sv/docs/security/COMPLIANCE.md) · 🇰🇪 [sw](../../../sw/docs/security/COMPLIANCE.md) · 🇮🇳 [ta](../../../ta/docs/security/COMPLIANCE.md) · 🇮🇳 [te](../../../te/docs/security/COMPLIANCE.md) · 🇹🇭 [th](../../../th/docs/security/COMPLIANCE.md) · 🇹🇷 [tr](../../../tr/docs/security/COMPLIANCE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/COMPLIANCE.md) · 🇵🇰 [ur](../../../ur/docs/security/COMPLIANCE.md) · 🇺🇿 [uz](../../../uz/docs/security/COMPLIANCE.md) · 🇻🇳 [vi](../../../vi/docs/security/COMPLIANCE.md) · 🇳🇬 [yo](../../../yo/docs/security/COMPLIANCE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/COMPLIANCE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/COMPLIANCE.md)

---

> **Tõeallikas:** `src/lib/compliance/`, `src/app/api/compliance/`
> **Viimati uuendatud:** 2026-06-28 — v3.8.40

OmniRoute salvestab haldustoimingud, autentimissündmused, teenusepakkuja
mandaatide elutsükli muudatused ja MCP-tööriistade väljakutsed SQLite'il
põhinevatesse audititabelitesse. Sellel lehel kirjeldatakse, mida logitakse,
kus andmeid hoitakse, kui kaua neid säilitatakse, kuidas API-võtmed saavad
logimisest loobuda ja kuidas andmeid pärida.

Teostus asub failides `src/lib/compliance/index.ts` (T-43 — „Vastavuskontrollid”)
ja `src/lib/compliance/providerAudit.ts`. Auditi kirjutustoimingud ei väljasta
kunagi erindit: mis tahes tõrke korral neelatakse väljakutse vaikselt alla, et
auditi logimine ei saaks katkestada peamist päringuvoogu.

## Mida logitakse

### Haldusauditi sündmused (`audit_log`)

Iga kutse `logAuditEvent({ action, actor, target, details, ... })` loob ühe rea.
Toimingustringid järgivad mustrit `domain.verb` (või `domain.verb.outcome`).
Lähtekoodis kinnitatud toimingutüübid on järgmised:

| Toiming                              | Allikas                                 |
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

Iga kirje talletab väljad `action`, `actor` (vaikeväärtus on `"system"`),
`target`, `details`/`metadata` (JSON), `ip_address`, `resource_type`, `status`,
`request_id` ja `timestamp`. Tundlikud võtmed (`apiKey`, `accessToken`,
`refreshToken`, `password`, kõik mustritele `*token`/`*secret`/`*apikey`
vastavad võtmed jne) redigeeritakse enne rea kirjutamist rekursiivselt
väärtuseks `"[redacted]"`.

### MCP-tööriistade kutsed (`mcp_tool_audit`)

Iga MCP-tööriista väljakutse kirjutab faili `open-sse/mcp-server/audit.ts`
kaudu ühe rea. Skeem (failist
`src/lib/db/migrations/002_mcp_a2a_tables.sql`):

| Veerg            | Märkused                                     |
| ---------------- | -------------------------------------------- |
| `id`             | automaatselt suurenev                        |
| `tool_name`      | MCP-tööriista identifikaator                 |
| `input_hash`     | sisendi sha256 (sisendandmeid ei salvestata) |
| `output_summary` | lühike, kärbitud kokkuvõte                   |
| `duration_ms`    | tegelik kulunud aeg                          |
| `api_key_id`     | väljakutsuja (võib olla null)                |
| `success`        | `1` / `0`                                    |
| `error_code`     | tõrke korral lõplik veakood                  |
| `created_at`     | ISO ajatempel                                |

### Päringu- ja kasutuslogid

Need on käitamise telemeetria (mitte rangelt haldusaudit), kuid kasutavad sama
säilituskonveierit:

- `usage_history` — päringupõhine kasutuse koondandmestik
- `call_logs` — täielik päringupõhine logi (ridade ülempiiriga, vt allpool)
- `proxy_logs` — puhverserveri liikluse logi (ridade ülempiiriga)
- `request_detail_logs` — pärandlahenduse üksikasjalik päringulogi (kärbitakse endiselt, kui see on olemas)

## Salvestusskeem

`audit_log` luuakse esmakordsel kasutamisel funktsiooni `ensureAuditLogSchema()` abil viivitusega:

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

Indeksid luuakse veergudele `timestamp`, `action`, `actor`, `resource_type`,
`status` ja `request_id`. Pärandandmebaasides puuduvad veerud lisatakse vajaduse korral
käsuga `ALTER TABLE`.

## Säilitamine ja puhastamine

Arvestatakse kahe eraldi säilitusperioodiga:

| Keskkonnamuutuja            | Vaikeväärtus | Rakendub järgmistele                                              |
| --------------------------- | ------------ | ----------------------------------------------------------------- |
| `APP_LOG_RETENTION_DAYS`    | `7`          | `audit_log`, `mcp_tool_audit`                                     |
| `CALL_LOG_RETENTION_DAYS`   | `7`          | `usage_history`, `call_logs`, `proxy_logs`, `request_detail_logs` |
| `CALL_LOGS_TABLE_MAX_ROWS`  | `100000`     | Tabeli `call_logs` kärpimine ridade ülempiirini                   |
| `PROXY_LOGS_TABLE_MAX_ROWS` | `100000`     | Tabeli `proxy_logs` kärpimine ridade ülempiirini                  |

`cleanupExpiredLogs()` käivitab säilitusreeglite rakendamise. See kutsutakse serveri käivitamisel välja
failist `src/instrumentation-node.ts`. Iga käivitus logib
auditisündmuse `compliance.cleanup` koos iga tabeli kustutatud ridade arvuga. Puhverserveri- ja kõnelogide
kärpimine toimub pakkidena (`BATCH_SIZE = 5000`), et vältida pikaajalisi kirjutuslukke.

Päringuajaloo käsitsi puhastamine on säilitusreeglitest eraldiseisev. Päringulogide
leht kutsub välja `POST /api/settings/purge-request-history`, mis kustutab tabelid `call_logs`,
pärandtabeli `request_detail_logs` ja kohalikud päringuartefaktid asukohas
`${DATA_DIR}/call_logs/`.

Vaikeväärtused on määratletud failis `src/lib/logEnv.ts`
(`DEFAULT_APP_LOG_RETENTION_DAYS = 7`, `DEFAULT_CALL_LOG_RETENTION_DAYS = 7`).

## Logimisest loobumine `noLog` abil (API-võtme kohta)

API-võtmeid saab märgistada nii, et nende kaudu tehtud edasisi kutseid ei logita.
Lipp asub tabelis `api_keys` (`no_log INTEGER DEFAULT 0`) ja see kopeeritakse
kiireks päringute töötlemiseks mälus asuvasse hulka.

```bash
# Logimiseta võtme loomine (nõutav on halduse autentimine)
curl -X POST http://localhost:20128/api/keys \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"name": "Privacy key", "noLog": true}'
```

Abifunktsioonid (`src/lib/compliance/index.ts`):

- `setNoLog(apiKeyId, true|false)` — lülitab mälus oleva kirje sisse või välja
- `isNoLog(apiKeyId)` — kontrollitakse päringu töötlemisel; kui kirjet pole, kasutatakse 30 sekundiks
  vahemällu salvestatud väärtust väljast `api_keys.no_log`
- `NO_LOG_API_KEY_IDS` (keskkonnamuutuja, komadega eraldatud) — laaditakse käivitamisel eelnevalt mälus
  asuvasse hulka; kasulik juhul, kui veergu ei saa otse muuta

`noLog` **ei** mõjuta administratiivseid auditisündmusi (sisselogimine, teenusepakkuja muudatused, MCP-tööriistade kutsed jne) — loobumine
kehtib ainult päringupõhise liikluse logimisele.

## REST API

| Lõpp-punkt                  | Meetod | Kirjeldus                                                 | Autentimine |
| --------------------------- | ------ | --------------------------------------------------------- | ----------- |
| `/api/compliance/audit-log` | `GET`  | Filtritega lehekülgjaotusega administraatori auditikirjed | management  |
| `/api/mcp/audit`            | `GET`  | Lehekülgjaotusega MCP tööriista auditikirjed              | (open-sse)  |
| `/api/mcp/audit/stats`      | `GET`  | Koondatud MCP auditistatistika                            | (open-sse)  |

Praegu CSV-eksportimise lõpp-punkti ei pakuta — eksportige andmed töölaualt või tehke päring
otse SQLite'i andmebaasi.

### Päringud lõpp-punktile `/api/compliance/audit-log`

Toetatud päringuparameetrid (kõik on valikulised; kõik tekstifiltrid kasutavad
vastendamist `LIKE %value%`):

- `action`, `actor`, `target`, `resourceType` (või `resource_type`),
  `status`, `requestId` (või `request_id`)
- `from` / `since`, `to` / `until` — ISO ajatemplid
- `limit` (vaikimisi `50`, min `1`, max `500`)
- `offset` (vaikimisi `0`, max `10_000`)

Vastus on JSON-massiiv. Lehekülgjaotuse metaandmed tagastatakse päistes:
`x-total-count`, `x-page-limit`, `x-page-offset`.

```bash
curl "http://localhost:20128/api/compliance/audit-log?action=provider.credentials&from=2026-05-01" \
  -H "Cookie: auth_token=..."
```

## Töölaud

Töölaual on auditiandmed saadaval aadressil **`/dashboard/audit`**
(`src/app/(dashboard)/dashboard/audit/page.tsx`). Lehel on kaks vahekaarti:

- **Vastavus** (`ComplianceTab.tsx`) — administraatori auditisündmused lõpp-punktist
  `/api/compliance/audit-log`. Filtreerimine sündmuse tüübi, raskusastme (teave / hoiatus
  / kriitiline, tuletatud toimingust + olekust) ja kuupäevavahemiku järgi. Raskusaste
  arvutatakse kliendi poolel toimingu- ja olekusõnede põhjal.
- **MCP** (`McpAuditTab.tsx`) — MCP tööriista audit lõpp-punktist `/api/mcp/audit`, koos
  filtritega tööriista nime ja õnnestumise/ebaõnnestumise järgi.

Mõlemad vahekaardid kasutavad lehekülgjaotust lehesuurustega `50` (vastavus) ja `25` (MCP).

## Pakkuja identimisteabe abifunktsioonid

`src/lib/compliance/providerAudit.ts` pakub vormindamise abifunktsioone, mida
pakkujate haldamise marsruudid kasutavad identimisteabe sündmuste väljastamisel:

- `summarizeProviderConnectionForAudit(connection)` — eemaldab väljad `apiKey`,
  `accessToken`, `refreshToken`, `idToken` ja
  `providerSpecificData.consoleApiKey`, enne kui ühenduse hetktõmmis kirjutatakse
  väljale `details`.
- `getProviderAuditTarget(connection)` — koostab välja `target` jaoks stabiilse
  sõne `"<provider>:<name|id>"`.
- `extractProviderWarnings(...payloads)` — otsib pakkuja vastustest
  poliitika-/ohutushoiatusi (`[sanitizer]`, `prompt injection detected`,
  `content has been filtered`, `safety filter`, `policy violation`) ja
  tagastab kuni 5 vastet, millest igaüks kärbitakse 400 märgini.

## Parimad tavad

- Märgistage isikuandmeid töötlevad API-võtmed (õigus-, meditsiiniandmed jne) seadega `noLog: true`.
- Kohandage `APP_LOG_RETENTION_DAYS` / `CALL_LOG_RETENTION_DAYS` vastavalt oma
  säilitamispoliitikale. Vaikimisi 7-päevane periood on konservatiivne.
- Eksportige audititabel platvormiväliselt (`sqlite3 dump`) teie vastavusprogrammis
  nõutud sagedusega — sisseehitatud arhiveerimisvõimalust pole.
- Jälgige `auth.login.failed` ja `auth.login.locked` arve jõurünnete
  tuvastamiseks.
- Uute administraatori lõpp-punktide lisamisel kutsuge välja `logAuditEvent({ ... })` stabiilse
  toimingusõnega `domain.verb.outcome` ning edastage päringu kontekst funktsiooni
  `getAuditRequestContext(request)` kaudu, et IP ja `requestId` jäädvustataks
  automaatselt.

## Vaata ka

- [`docs/security/GUARDRAILS.md`](./GUARDRAILS.md) — isikut tuvastavate andmete (PII) maskeerimine, viibasüst
- [`docs/frameworks/MCP-SERVER.md`](../frameworks/MCP-SERVER.md) — MCP tööriistakataloog ja ulatused
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md) — keskkonnamuutujate täielik viide
- Lähtekood: `src/lib/compliance/`, `src/app/api/compliance/`,
  `src/app/api/mcp/audit/`, `src/lib/logEnv.ts`
