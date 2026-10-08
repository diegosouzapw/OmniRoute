# Compliance & Audit (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../security/COMPLIANCE.md) · 🇪🇹 [am](../../../am/docs/security/COMPLIANCE.md) · 🇸🇦 [ar](../../../ar/docs/security/COMPLIANCE.md) · 🇦🇿 [az](../../../az/docs/security/COMPLIANCE.md) · 🇧🇬 [bg](../../../bg/docs/security/COMPLIANCE.md) · 🇧🇩 [bn](../../../bn/docs/security/COMPLIANCE.md) · 🇧🇦 [bs](../../../bs/docs/security/COMPLIANCE.md) · 🇨🇿 [cs](../../../cs/docs/security/COMPLIANCE.md) · 🇩🇰 [da](../../../da/docs/security/COMPLIANCE.md) · 🇩🇪 [de](../../../de/docs/security/COMPLIANCE.md) · 🇬🇷 [el](../../../el/docs/security/COMPLIANCE.md) · 🇪🇸 [es](../../../es/docs/security/COMPLIANCE.md) · 🇪🇪 [et](../../../et/docs/security/COMPLIANCE.md) · 🇮🇷 [fa](../../../fa/docs/security/COMPLIANCE.md) · 🇫🇮 [fi](../../../fi/docs/security/COMPLIANCE.md) · 🇫🇷 [fr](../../../fr/docs/security/COMPLIANCE.md) · 🇮🇪 [ga](../../../ga/docs/security/COMPLIANCE.md) · 🇮🇳 [gu](../../../gu/docs/security/COMPLIANCE.md) · 🇳🇬 [ha](../../../ha/docs/security/COMPLIANCE.md) · 🇮🇱 [he](../../../he/docs/security/COMPLIANCE.md) · 🇮🇳 [hi](../../../hi/docs/security/COMPLIANCE.md) · 🇭🇷 [hr](../../../hr/docs/security/COMPLIANCE.md) · 🇭🇺 [hu](../../../hu/docs/security/COMPLIANCE.md) · 🇦🇲 [hy](../../../hy/docs/security/COMPLIANCE.md) · 🇮🇩 [id](../../../id/docs/security/COMPLIANCE.md) · 🇳🇬 [ig](../../../ig/docs/security/COMPLIANCE.md) · 🇮🇹 [it](../../../it/docs/security/COMPLIANCE.md) · 🇯🇵 [ja](../../../ja/docs/security/COMPLIANCE.md) · 🇬🇪 [ka](../../../ka/docs/security/COMPLIANCE.md) · 🇰🇭 [km](../../../km/docs/security/COMPLIANCE.md) · 🇮🇳 [kn](../../../kn/docs/security/COMPLIANCE.md) · 🇰🇷 [ko](../../../ko/docs/security/COMPLIANCE.md) · 🇱🇻 [lv](../../../lv/docs/security/COMPLIANCE.md) · 🇮🇳 [ml](../../../ml/docs/security/COMPLIANCE.md) · 🇮🇳 [mr](../../../mr/docs/security/COMPLIANCE.md) · 🇲🇾 [ms](../../../ms/docs/security/COMPLIANCE.md) · 🇲🇹 [mt](../../../mt/docs/security/COMPLIANCE.md) · 🇲🇲 [my](../../../my/docs/security/COMPLIANCE.md) · 🇳🇵 [ne](../../../ne/docs/security/COMPLIANCE.md) · 🇳🇱 [nl](../../../nl/docs/security/COMPLIANCE.md) · 🇳🇴 [no](../../../no/docs/security/COMPLIANCE.md) · 🇮🇳 [or](../../../or/docs/security/COMPLIANCE.md) · 🇮🇳 [pa](../../../pa/docs/security/COMPLIANCE.md) · 🇵🇭 [phi](../../../phi/docs/security/COMPLIANCE.md) · 🇵🇱 [pl](../../../pl/docs/security/COMPLIANCE.md) · 🇵🇹 [pt](../../../pt/docs/security/COMPLIANCE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/COMPLIANCE.md) · 🇷🇴 [ro](../../../ro/docs/security/COMPLIANCE.md) · 🇷🇺 [ru](../../../ru/docs/security/COMPLIANCE.md) · 🇱🇰 [si](../../../si/docs/security/COMPLIANCE.md) · 🇸🇰 [sk](../../../sk/docs/security/COMPLIANCE.md) · 🇸🇮 [sl](../../../sl/docs/security/COMPLIANCE.md) · 🇷🇸 [sr](../../../sr/docs/security/COMPLIANCE.md) · 🇸🇪 [sv](../../../sv/docs/security/COMPLIANCE.md) · 🇰🇪 [sw](../../../sw/docs/security/COMPLIANCE.md) · 🇮🇳 [ta](../../../ta/docs/security/COMPLIANCE.md) · 🇮🇳 [te](../../../te/docs/security/COMPLIANCE.md) · 🇹🇭 [th](../../../th/docs/security/COMPLIANCE.md) · 🇹🇷 [tr](../../../tr/docs/security/COMPLIANCE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/COMPLIANCE.md) · 🇵🇰 [ur](../../../ur/docs/security/COMPLIANCE.md) · 🇺🇿 [uz](../../../uz/docs/security/COMPLIANCE.md) · 🇻🇳 [vi](../../../vi/docs/security/COMPLIANCE.md) · 🇳🇬 [yo](../../../yo/docs/security/COMPLIANCE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/COMPLIANCE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/COMPLIANCE.md)

---

> **Patikimas šaltinis:** `src/lib/compliance/`, `src/app/api/compliance/`
> **Paskutinį kartą atnaujinta:** 2026-06-28 — v3.8.40

„OmniRoute“ registruoja administracinius veiksmus, autentifikavimo įvykius, teikėjų
prisijungimo duomenų gyvavimo ciklo pakeitimus ir MCP įrankių iškvietimus „SQLite“
pagrįstose audito lentelėse. Šiame puslapyje aprašoma, kas registruojama, kur
saugomi duomenys, kiek laiko jie išlaikomi, kaip API raktams galima išjungti
registravimą ir kaip vykdyti duomenų užklausas.

Realizacija yra failuose `src/lib/compliance/index.ts` (T-43 — „Atitikties
valdikliai“) ir `src/lib/compliance/providerAudit.ts`. Audito įrašymo operacijos
niekada negeneruoja išimčių: įvykus bet kokiai klaidai, iškvietimas tyliai
ignoruojamas, kad audito registravimas negalėtų sutrikdyti pagrindinės užklausos
eigos.

## Kas registruojama

### Administracinio audito įvykiai (`audit_log`)

Kiekvienas `logAuditEvent({ action, actor, target, details, ... })` iškvietimas
sukuria vieną eilutę. Veiksmų eilutės atitinka `domain.verb` (arba
`domain.verb.outcome`) šabloną. Kode patvirtinti veiksmų tipai:

| Veiksmas                             | Šaltinis                                |
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

Kiekviename įraše užfiksuojami `action`, `actor` (numatytoji reikšmė —
`"system"`), `target`, `details` / `metadata` (JSON), `ip_address`,
`resource_type`, `status`, `request_id` ir `timestamp`. Neskelbtini raktai
(`apiKey`, `accessToken`, `refreshToken`, `password`, visi raktai, atitinkantys
`*token` / `*secret` / `*apikey` ir kt.) prieš įrašant eilutę rekursyviai
pakeičiami reikšme `"[redacted]"`.

### MCP įrankių iškvietimai (`mcp_tool_audit`)

Kiekvienas MCP įrankio iškvietimas per `open-sse/mcp-server/audit.ts` įrašo
vieną eilutę. Schema (iš `src/lib/db/migrations/002_mcp_a2a_tables.sql`):

| Stulpelis        | Pastabos                                       |
| ---------------- | ---------------------------------------------- |
| `id`             | automatiškai didinama reikšmė                  |
| `tool_name`      | MCP įrankio identifikatorius                   |
| `input_hash`     | įvesties sha256 (naudingoji apkrova nesaugoma) |
| `output_summary` | trumpa, sutrumpinta santrauka                  |
| `duration_ms`    | faktinė trukmė                                 |
| `api_key_id`     | iškvietėjas (gali būti „null“)                 |
| `success`        | `1` / `0`                                      |
| `error_code`     | galutinis klaidos kodas nesėkmės atveju        |
| `created_at`     | ISO laiko žyma                                 |

### Užklausų / naudojimo žurnalai

Tai yra veikimo telemetrija (ne tik administracinis auditas), tačiau jai taikomas
tas pats saugojimo trukmės procesas:

- `usage_history` — kiekvienos užklausos naudojimo suvestinė
- `call_logs` — išsamus kiekvienos užklausos žurnalas (taikomas eilučių limitas, žr. toliau)
- `proxy_logs` — tarpinio serverio srauto žurnalas (taikomas eilučių limitas)
- `request_detail_logs` — senasis išsamus užklausų žurnalas (jei yra, jis vis tiek išvalomas)

## Saugyklos schema

`audit_log` pirmą kartą naudojant sukuriama atidėtai, pasitelkiant `ensureAuditLogSchema()`:

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

Indeksai sukuriami stulpeliams `timestamp`, `action`, `actor`, `resource_type`,
`status` ir `request_id`. Trūkstami senesnių DB stulpeliai prireikus pridedami
naudojant `ALTER TABLE`.

## Saugojimas ir valymas

Taikomi du atskiri saugojimo laikotarpiai:

| Aplinkos kintamasis         | Numatytoji reikšmė | Taikoma                                                           |
| --------------------------- | ------------------ | ----------------------------------------------------------------- |
| `APP_LOG_RETENTION_DAYS`    | `7`                | `audit_log`, `mcp_tool_audit`                                     |
| `CALL_LOG_RETENTION_DAYS`   | `7`                | `usage_history`, `call_logs`, `proxy_logs`, `request_detail_logs` |
| `CALL_LOGS_TABLE_MAX_ROWS`  | `100000`           | `call_logs` eilučių skaičiaus ribojimas                           |
| `PROXY_LOGS_TABLE_MAX_ROWS` | `100000`           | `proxy_logs` eilučių skaičiaus ribojimas                          |

`cleanupExpiredLogs()` vykdo saugojimo laikotarpio patikrą. Ji iškviečiama
paleidžiant serverį iš `src/instrumentation-node.ts`. Kiekvieno vykdymo metu
užregistruojamas `compliance.cleanup` audito įvykis, nurodant kiekvienoje
lentelėje ištrintų įrašų skaičių. Tarpinių serverių ir iškvietimų žurnalų
apkarpymas atliekamas paketais (`BATCH_SIZE = 5000`), kad būtų išvengta
ilgalaikio rašymo blokavimo.

Rankinis užklausų istorijos valymas atliekamas atskirai nuo saugojimo laikotarpio
valdymo. Užklausų žurnalų puslapis iškviečia
`POST /api/settings/purge-request-history`, kuris ištrina `call_logs`, senesnę
`request_detail_logs` lentelę ir vietinius užklausų artefaktus, esančius
`${DATA_DIR}/call_logs/`.

Numatytosios reikšmės apibrėžtos faile `src/lib/logEnv.ts`
(`DEFAULT_APP_LOG_RETENTION_DAYS = 7`, `DEFAULT_CALL_LOG_RETENTION_DAYS = 7`).

## `noLog` atsisakymas (kiekvienam API raktui)

API raktai gali būti pažymėti taip, kad jų siunčiamų iškvietimų srautas nebūtų
registruojamas. Žyma saugoma lentelėje `api_keys` (`no_log INTEGER DEFAULT 0`),
o jos reikšmė taip pat įtraukiama į atmintyje saugomą rinkinį, skirtą sparčiai
paieškai dažnai naudojamame vykdymo kelyje.

```bash
# Sukurti raktą, kurio veiksmai neregistruojami (reikalingas valdymo autentifikavimas)
curl -X POST http://localhost:20128/api/keys \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"name": "Privacy key", "noLog": true}'
```

Pagalbinės funkcijos (`src/lib/compliance/index.ts`):

- `setNoLog(apiKeyId, true|false)` — įjungia arba išjungia įrašą atmintyje
- `isNoLog(apiKeyId)` — tikrinama užklausos apdorojimo kelyje; jei įrašo nėra,
  naudojama 30 sek. podėlyje saugoma reikšmė, nuskaityta iš `api_keys.no_log`
- `NO_LOG_API_KEY_IDS` (aplinkos kintamasis, reikšmės atskirtos kableliais) —
  paleidžiant iš anksto įkeliama į atmintyje saugomą rinkinį; naudinga, kai
  negalite tiesiogiai keisti stulpelio reikšmės

Administraciniai audito įvykiai (prisijungimas, teikėjų pakeitimai, MCP įrankių
iškvietimai ir kt.) **nėra** paveikiami `noLog` — atsisakoma tik atskirų
užklausų srauto registravimo.

## REST API

| Galinis taškas              | Metodas | Aprašas                                                           | Autentifikavimas |
| --------------------------- | ------- | ----------------------------------------------------------------- | ---------------- |
| `/api/compliance/audit-log` | `GET`   | Puslapiais pateikiami administratoriaus audito įrašai su filtrais | management       |
| `/api/mcp/audit`            | `GET`   | Puslapiais pateikiami MCP įrankių audito įrašai                   | (open-sse)       |
| `/api/mcp/audit/stats`      | `GET`   | Apibendrinta MCP audito statistika                                | (open-sse)       |

Šiuo metu CSV eksportavimo galinis taškas nepateikiamas — eksportuokite iš valdymo skydelio arba tiesiogiai vykdykite užklausas
SQLite duomenų bazėje.

### Užklausos į `/api/compliance/audit-log`

Palaikomi užklausos parametrai (visi neprivalomi, visuose tekstiniuose filtruose naudojama
`LIKE %value%` atitiktis):

- `action`, `actor`, `target`, `resourceType` (arba `resource_type`),
  `status`, `requestId` (arba `request_id`)
- `from` / `since`, `to` / `until` — ISO laiko žymos
- `limit` (numatytoji reikšmė `50`, mažiausia `1`, didžiausia `500`)
- `offset` (numatytoji reikšmė `0`, didžiausia `10_000`)

Atsakymas yra JSON masyvas. Puslapiavimo metaduomenys grąžinami antraštėse:
`x-total-count`, `x-page-limit`, `x-page-offset`.

```bash
curl "http://localhost:20128/api/compliance/audit-log?action=provider.credentials&from=2026-05-01" \
  -H "Cookie: auth_token=..."
```

## Valdymo skydelis

Valdymo skydelyje audito duomenys pasiekiami adresu **`/dashboard/audit`**
(`src/app/(dashboard)/dashboard/audit/page.tsx`). Puslapyje yra du skirtukai:

- **Atitiktis** (`ComplianceTab.tsx`) — administratoriaus audito įvykiai iš
  `/api/compliance/audit-log`. Filtruojama pagal įvykio tipą, svarbos lygį (informacinis / įspėjimas
  / kritinis, nustatomas pagal veiksmą ir būseną) bei datų intervalą. Svarbos lygis
  kliento pusėje apskaičiuojamas pagal veiksmo ir būsenos eilutes.
- **MCP** (`McpAuditTab.tsx`) — MCP įrankių auditas iš `/api/mcp/audit`, su
  filtrais pagal įrankio pavadinimą ir sėkmę / nesėkmę.

Abiejuose skirtukuose naudojamas puslapiavimas, kurio puslapio dydis yra `50` (atitikties)
ir `25` (MCP).

## Teikėjo prisijungimo duomenų pagalbinės funkcijos

`src/lib/compliance/providerAudit.ts` pateikia duomenų formavimo pagalbines funkcijas, kurias naudoja
teikėjų valdymo maršrutai, kai registruoja prisijungimo duomenų įvykius:

- `summarizeProviderConnectionForAudit(connection)` — pašalina `apiKey`,
  `accessToken`, `refreshToken`, `idToken` ir
  `providerSpecificData.consoleApiKey` prieš įrašant ryšio momentinę kopiją į
  `details`.
- `getProviderAuditTarget(connection)` — suformuoja stabilią
  `"<provider>:<name|id>"` eilutę laukui `target`.
- `extractProviderWarnings(...payloads)` — teikėjo atsakymuose ieško
  politikos / saugos įspėjimų (`[sanitizer]`, `prompt injection detected`,
  `content has been filtered`, `safety filter`, `policy violation`) ir
  pateikia iki 5 atitikmenų, kiekvieną sutrumpindama iki 400 simbolių.

## Geriausios praktikos

- API raktus, naudojamus asmens duomenims (teisiniams, medicininiams ir kt.) tvarkyti, pažymėkite `noLog: true`.
- Sureguliuokite `APP_LOG_RETENTION_DAYS` / `CALL_LOG_RETENTION_DAYS`, kad jie atitiktų jūsų
  saugojimo politiką. Numatytoji 7 dienų trukmė yra konservatyvi.
- Eksportuokite audito lentelę už platformos ribų (`sqlite3 dump`) tokiu dažnumu,
  kokio reikalauja jūsų atitikties programa — integruoto archyvavimo nėra.
- Stebėkite `auth.login.failed` ir `auth.login.locked` skaičius, kad aptiktumėte
  grubios jėgos atakas.
- Pridėdami naujus administratoriaus galinius taškus, iškvieskite `logAuditEvent({ ... })` su stabilia
  `domain.verb.outcome` veiksmo eilute ir perduokite užklausos kontekstą per
  `getAuditRequestContext(request)`, kad IP ir `requestId` būtų užfiksuoti
  automatiškai.

## Taip pat žr.

- [`docs/security/GUARDRAILS.md`](./GUARDRAILS.md) — asmens identifikavimo informacijos (PII) maskavimas, raginimų injekcija
- [`docs/frameworks/MCP-SERVER.md`](../frameworks/MCP-SERVER.md) — MCP įrankių katalogas ir aprėptys
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md) — išsamus aplinkos kintamųjų žinynas
- Šaltinis: `src/lib/compliance/`, `src/app/api/compliance/`,
  `src/app/api/mcp/audit/`, `src/lib/logEnv.ts`
