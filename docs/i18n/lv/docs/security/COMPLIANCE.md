# Compliance & Audit (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../security/COMPLIANCE.md) · 🇪🇹 [am](../../../am/docs/security/COMPLIANCE.md) · 🇸🇦 [ar](../../../ar/docs/security/COMPLIANCE.md) · 🇦🇿 [az](../../../az/docs/security/COMPLIANCE.md) · 🇧🇬 [bg](../../../bg/docs/security/COMPLIANCE.md) · 🇧🇩 [bn](../../../bn/docs/security/COMPLIANCE.md) · 🇨🇿 [cs](../../../cs/docs/security/COMPLIANCE.md) · 🇩🇰 [da](../../../da/docs/security/COMPLIANCE.md) · 🇩🇪 [de](../../../de/docs/security/COMPLIANCE.md) · 🇬🇷 [el](../../../el/docs/security/COMPLIANCE.md) · 🇪🇸 [es](../../../es/docs/security/COMPLIANCE.md) · 🇪🇪 [et](../../../et/docs/security/COMPLIANCE.md) · 🇮🇷 [fa](../../../fa/docs/security/COMPLIANCE.md) · 🇫🇮 [fi](../../../fi/docs/security/COMPLIANCE.md) · 🇫🇷 [fr](../../../fr/docs/security/COMPLIANCE.md) · 🇮🇪 [ga](../../../ga/docs/security/COMPLIANCE.md) · 🇮🇳 [gu](../../../gu/docs/security/COMPLIANCE.md) · 🇳🇬 [ha](../../../ha/docs/security/COMPLIANCE.md) · 🇮🇱 [he](../../../he/docs/security/COMPLIANCE.md) · 🇮🇳 [hi](../../../hi/docs/security/COMPLIANCE.md) · 🇭🇷 [hr](../../../hr/docs/security/COMPLIANCE.md) · 🇭🇺 [hu](../../../hu/docs/security/COMPLIANCE.md) · 🇦🇲 [hy](../../../hy/docs/security/COMPLIANCE.md) · 🇮🇩 [id](../../../id/docs/security/COMPLIANCE.md) · 🇳🇬 [ig](../../../ig/docs/security/COMPLIANCE.md) · 🇮🇹 [it](../../../it/docs/security/COMPLIANCE.md) · 🇯🇵 [ja](../../../ja/docs/security/COMPLIANCE.md) · 🇬🇪 [ka](../../../ka/docs/security/COMPLIANCE.md) · 🇰🇭 [km](../../../km/docs/security/COMPLIANCE.md) · 🇮🇳 [kn](../../../kn/docs/security/COMPLIANCE.md) · 🇰🇷 [ko](../../../ko/docs/security/COMPLIANCE.md) · 🇱🇹 [lt](../../../lt/docs/security/COMPLIANCE.md) · 🇮🇳 [ml](../../../ml/docs/security/COMPLIANCE.md) · 🇮🇳 [mr](../../../mr/docs/security/COMPLIANCE.md) · 🇲🇾 [ms](../../../ms/docs/security/COMPLIANCE.md) · 🇲🇹 [mt](../../../mt/docs/security/COMPLIANCE.md) · 🇲🇲 [my](../../../my/docs/security/COMPLIANCE.md) · 🇳🇵 [ne](../../../ne/docs/security/COMPLIANCE.md) · 🇳🇱 [nl](../../../nl/docs/security/COMPLIANCE.md) · 🇳🇴 [no](../../../no/docs/security/COMPLIANCE.md) · 🇮🇳 [or](../../../or/docs/security/COMPLIANCE.md) · 🇮🇳 [pa](../../../pa/docs/security/COMPLIANCE.md) · 🇵🇭 [phi](../../../phi/docs/security/COMPLIANCE.md) · 🇵🇱 [pl](../../../pl/docs/security/COMPLIANCE.md) · 🇵🇹 [pt](../../../pt/docs/security/COMPLIANCE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/COMPLIANCE.md) · 🇷🇴 [ro](../../../ro/docs/security/COMPLIANCE.md) · 🇷🇺 [ru](../../../ru/docs/security/COMPLIANCE.md) · 🇱🇰 [si](../../../si/docs/security/COMPLIANCE.md) · 🇸🇰 [sk](../../../sk/docs/security/COMPLIANCE.md) · 🇸🇮 [sl](../../../sl/docs/security/COMPLIANCE.md) · 🇷🇸 [sr](../../../sr/docs/security/COMPLIANCE.md) · 🇸🇪 [sv](../../../sv/docs/security/COMPLIANCE.md) · 🇰🇪 [sw](../../../sw/docs/security/COMPLIANCE.md) · 🇮🇳 [ta](../../../ta/docs/security/COMPLIANCE.md) · 🇮🇳 [te](../../../te/docs/security/COMPLIANCE.md) · 🇹🇭 [th](../../../th/docs/security/COMPLIANCE.md) · 🇹🇷 [tr](../../../tr/docs/security/COMPLIANCE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/COMPLIANCE.md) · 🇵🇰 [ur](../../../ur/docs/security/COMPLIANCE.md) · 🇺🇿 [uz](../../../uz/docs/security/COMPLIANCE.md) · 🇻🇳 [vi](../../../vi/docs/security/COMPLIANCE.md) · 🇳🇬 [yo](../../../yo/docs/security/COMPLIANCE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/COMPLIANCE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/COMPLIANCE.md)

---

> **Patiesības avots:** `src/lib/compliance/`, `src/app/api/compliance/`
> **Pēdējoreiz atjaunināts:** 2026-06-28 — v3.8.40

OmniRoute reģistrē administratīvās darbības, autentifikācijas notikumus, pakalpojumu
sniedzēju akreditācijas datu dzīves cikla izmaiņas un MCP rīku izsaukumus SQLite
audita tabulās. Šajā lapā ir aprakstīts, kas tiek reģistrēts, kur dati atrodas, cik ilgi tie
tiek glabāti, kā API atslēgām var atteikties no reģistrēšanas un kā veikt datu vaicājumus.

Implementācija atrodas failos `src/lib/compliance/index.ts` (T-43 — „Atbilstības
kontroles”) un `src/lib/compliance/providerAudit.ts`. Audita ierakstīšana nekad neizraisa izņēmumu:
jebkuras kļūmes gadījumā izsaukums tiek klusi ignorēts, lai audita reģistrēšana nevarētu pārtraukt
galveno pieprasījuma plūsmu.

## Kas tiek reģistrēts

### Administratīvā audita notikumi (`audit_log`)

Katrs `logAuditEvent({ action, actor, target, details, ... })` izsaukums izveido
vienu rindu. Darbību virknes atbilst `domain.verb` (vai `domain.verb.outcome`)
formātam. Avota kokā apstiprinātie darbību tipi ietver:

| Darbība                              | Avots                                   |
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

Katrā ierakstā tiek saglabāti `action`, `actor` (noklusējuma vērtība ir `"system"`), `target`,
`details`/`metadata` (JSON), `ip_address`, `resource_type`, `status`,
`request_id` un `timestamp`. Sensitīvās atslēgas (`apiKey`, `accessToken`,
`refreshToken`, `password`, viss, kas atbilst `*token`/`*secret`/`*apikey`,
u.c.) pirms rindas ierakstīšanas tiek rekursīvi aizstātas ar `"[redacted]"`.

### MCP rīku izsaukumi (`mcp_tool_audit`)

Katrs MCP rīka izsaukums ieraksta rindu, izmantojot
`open-sse/mcp-server/audit.ts`. Shēma (no
`src/lib/db/migrations/002_mcp_a2a_tables.sql`):

| Kolonna          | Piezīmes                                          |
| ---------------- | ------------------------------------------------- |
| `id`             | automātiski pieaugoša vērtība                     |
| `tool_name`      | MCP rīka identifikators                           |
| `input_hash`     | ievades sha256 (lietderīgā slodze netiek glabāta) |
| `output_summary` | īss, saīsināts kopsavilkums                       |
| `duration_ms`    | kopējais izpildes laiks                           |
| `api_key_id`     | izsaucējs (var būt nulle)                         |
| `success`        | `1` / `0`                                         |
| `error_code`     | beigu kļūdas kods neveiksmes gadījumā             |
| `created_at`     | ISO laikspiedols                                  |

### Pieprasījumu / lietojuma žurnāli

Šī ir darbības telemetrija (nevis tikai administratīvais audits), taču tai tiek izmantots tas pats
glabāšanas termiņa pārvaldības process:

- `usage_history` — apkopots lietojums katram pieprasījumam
- `call_logs` — pilns žurnāls katram pieprasījumam (uz to attiecas rindu skaita ierobežojums; skatiet tālāk)
- `proxy_logs` — starpniekservera datplūsmas žurnāls (uz to attiecas rindu skaita ierobežojums)
- `request_detail_logs` — mantotais detalizētais pieprasījumu žurnāls (joprojām tiek tīrīts, ja pastāv)

## Krātuves shēma

`audit_log` tiek izveidota atlikti, pirmajā `ensureAuditLogSchema()` lietošanas reizē:

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

Indeksi tiek izveidoti laukiem `timestamp`, `action`, `actor`, `resource_type`,
`status` un `request_id`. Trūkstošās kolonnas mantotajās datubāzēs pēc
nepieciešamības tiek pievienotas, izmantojot `ALTER TABLE`.

## Saglabāšana un tīrīšana

Tiek ievēroti divi atsevišķi saglabāšanas periodi:

| Vides mainīgais             | Noklusējums | Attiecas uz                                                       |
| --------------------------- | ----------- | ----------------------------------------------------------------- |
| `APP_LOG_RETENTION_DAYS`    | `7`         | `audit_log`, `mcp_tool_audit`                                     |
| `CALL_LOG_RETENTION_DAYS`   | `7`         | `usage_history`, `call_logs`, `proxy_logs`, `request_detail_logs` |
| `CALL_LOGS_TABLE_MAX_ROWS`  | `100000`    | `call_logs` rindu skaita ierobežošana                             |
| `PROXY_LOGS_TABLE_MAX_ROWS` | `100000`    | `proxy_logs` rindu skaita ierobežošana                            |

`cleanupExpiredLogs()` izpilda saglabāšanas perioda pārbaudi. Tā tiek izsaukta
servera startēšanas laikā no `src/instrumentation-node.ts`. Katrā izpildes reizē
tiek reģistrēts `compliance.cleanup` audita notikums ar katrā tabulā izdzēsto
ierakstu skaitu. Starpniekservera un izsaukumu žurnālu ierobežošana tiek veikta
pa partijām (`BATCH_SIZE = 5000`), lai izvairītos no ilgstošas rakstīšanas
bloķēšanas.

Manuālā pieprasījumu vēstures tīrīšana ir nodalīta no saglabāšanas perioda
tīrīšanas. Pieprasījumu žurnālu lapa izsauc
`POST /api/settings/purge-request-history`, kas dzēš `call_logs`, mantotos
`request_detail_logs` un lokālos pieprasījumu artefaktus mapē
`${DATA_DIR}/call_logs/`.

Noklusējuma vērtības ir definētas failā `src/lib/logEnv.ts`
(`DEFAULT_APP_LOG_RETENTION_DAYS = 7`, `DEFAULT_CALL_LOG_RETENTION_DAYS = 7`).

## `noLog` atteikšanās opcija (katrai API atslēgai)

API atslēgas var atzīmēt tā, lai to pakārtoto izsaukumu datplūsma netiktu
reģistrēta. Šis karogs atrodas tabulā `api_keys` (`no_log INTEGER DEFAULT 0`)
un tiek atspoguļots atmiņā glabātā kopā ātrai piekļuvei kritiskajā izpildes
ceļā.

```bash
# Izveido atslēgu bez žurnalēšanas (nepieciešama pārvaldības autentifikācija)
curl -X POST http://localhost:20128/api/keys \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"name": "Privacy key", "noLog": true}'
```

Palīgfunkcijas (`src/lib/compliance/index.ts`):

- `setNoLog(apiKeyId, true|false)` — pārslēdz ierakstu atmiņā
- `isNoLog(apiKeyId)` — tiek pārbaudīta pieprasījuma izpildes ceļā; ja ieraksta
  nav, izmanto 30 s kešotu nolasījumu no `api_keys.no_log`
- `NO_LOG_API_KEY_IDS` (vides mainīgais, vērtības atdalītas ar komatiem) —
  sistēmas palaišanas laikā tiek iepriekš ielādēts atmiņā glabātajā kopā;
  noder, ja kolonnu nevar pārslēgt tieši

`noLog` **neietekmē** administratīvos audita notikumus (pieteikšanos,
pakalpojumu sniedzēju izmaiņas, MCP rīku izsaukumus u.c.) — atteikšanās attiecas
tikai uz katra pieprasījuma datplūsmas žurnalēšanu.

## REST API

| Galapunkts                  | Metode | Apraksts                                                   | Autorizācija |
| --------------------------- | ------ | ---------------------------------------------------------- | ------------ |
| `/api/compliance/audit-log` | `GET`  | Lapots administratora audita ierakstu saraksts ar filtriem | management   |
| `/api/mcp/audit`            | `GET`  | Lapots MCP rīku audita ierakstu saraksts                   | (open-sse)   |
| `/api/mcp/audit/stats`      | `GET`  | Apkopota MCP audita statistika                             | (open-sse)   |

Pašlaik CSV eksportēšanas galapunkts netiek nodrošināts — eksportējiet datus no informācijas paneļa vai vaicājiet
SQLite datubāzi tieši.

### Vaicājumi `/api/compliance/audit-log`

Atbalstītie vaicājuma parametri (visi nav obligāti; teksta filtriem tiek izmantota
atbilstības meklēšana `LIKE %value%`):

- `action`, `actor`, `target`, `resourceType` (vai `resource_type`),
  `status`, `requestId` (vai `request_id`)
- `from` / `since`, `to` / `until` — ISO laikspiedoli
- `limit` (noklusējums `50`, minimums `1`, maksimums `500`)
- `offset` (noklusējums `0`, maksimums `10_000`)

Atbilde ir JSON masīvs. Lapošanas metadati tiek atgriezti galvenēs:
`x-total-count`, `x-page-limit`, `x-page-offset`.

```bash
curl "http://localhost:20128/api/compliance/audit-log?action=provider.credentials&from=2026-05-01" \
  -H "Cookie: auth_token=..."
```

## Informācijas panelis

Informācijas panelī audita dati ir pieejami adresē **`/dashboard/audit`**
(`src/app/(dashboard)/dashboard/audit/page.tsx`). Lapā ir divas cilnes:

- **Atbilstība** (`ComplianceTab.tsx`) — administratora audita notikumi no
  `/api/compliance/audit-log`. Filtrēšana pēc notikuma veida, nopietnības pakāpes (informatīvs / brīdinājums
  / kritisks, atvasināts no darbības un statusa) un datumu diapazona. Nopietnības pakāpe tiek
  aprēķināta klienta pusē no darbības/statusa virknēm.
- **MCP** (`McpAuditTab.tsx`) — MCP rīku audits no `/api/mcp/audit` ar
  filtrēšanu pēc rīka nosaukuma un izdošanās/neizdošanās.

Abās cilnēs tiek izmantota lapošana ar lapu izmēriem `50` (atbilstība) un `25` (MCP).

## Pakalpojumu sniedzēju akreditācijas datu palīgfunkcijas

`src/lib/compliance/providerAudit.ts` nodrošina datu strukturēšanas palīgfunkcijas, ko izmanto
pakalpojumu sniedzēju pārvaldības maršruti, kad tie ģenerē akreditācijas datu notikumus:

- `summarizeProviderConnectionForAudit(connection)` — noņem `apiKey`,
  `accessToken`, `refreshToken`, `idToken` un
  `providerSpecificData.consoleApiKey`, pirms savienojuma momentuzņēmums tiek
  ierakstīts laukā `details`.
- `getProviderAuditTarget(connection)` — izveido stabilu
  `"<provider>:<name|id>"` virkni laukam `target`.
- `extractProviderWarnings(...payloads)` — pārbauda pakalpojumu sniedzēju atbildes, meklējot
  politikas/drošības brīdinājumus (`[sanitizer]`, `prompt injection detected`,
  `content has been filtered`, `safety filter`, `policy violation`), un
  atgriež ne vairāk kā 5 atbilstības, katru saīsinot līdz 400 rakstzīmēm.

## Ieteicamā prakse

- API atslēgām, kas apstrādā personu identificējošu informāciju (juridisku, medicīnisku u.c.), iestatiet `noLog: true`.
- Pielāgojiet `APP_LOG_RETENTION_DAYS` / `CALL_LOG_RETENTION_DAYS`, lai nodrošinātu atbilstību savai
  datu glabāšanas politikai. Noklusējuma 7 dienu periods ir konservatīvs.
- Eksportējiet audita tabulu ārpus platformas (`sqlite3 dump`) tādā biežumā,
  kādu pieprasa jūsu atbilstības programma — iebūvēta arhivēšana nav pieejama.
- Uzraugiet `auth.login.failed` un `auth.login.locked` skaitu, lai
  noteiktu pārlases uzbrukumus.
- Pievienojot jaunus administratora galapunktus, izsauciet `logAuditEvent({ ... })` ar stabilu
  `domain.verb.outcome` darbības virkni un nododiet pieprasījuma kontekstu, izmantojot
  `getAuditRequestContext(request)`, lai IP adrese un `requestId` tiktu reģistrēti
  automātiski.

## Skatiet arī

- [`docs/security/GUARDRAILS.md`](./GUARDRAILS.md) — PII maskēšana, uzvedņu injekcija
- [`docs/frameworks/MCP-SERVER.md`](../frameworks/MCP-SERVER.md) — MCP rīku katalogs un tvērumi
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md) — pilna vides mainīgo atsauce
- Avots: `src/lib/compliance/`, `src/app/api/compliance/`,
  `src/app/api/mcp/audit/`, `src/lib/logEnv.ts`
