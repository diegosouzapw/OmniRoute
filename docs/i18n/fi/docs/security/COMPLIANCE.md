# Compliance & Audit (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../security/COMPLIANCE.md) · 🇪🇹 [am](../../../am/docs/security/COMPLIANCE.md) · 🇸🇦 [ar](../../../ar/docs/security/COMPLIANCE.md) · 🇦🇿 [az](../../../az/docs/security/COMPLIANCE.md) · 🇧🇬 [bg](../../../bg/docs/security/COMPLIANCE.md) · 🇧🇩 [bn](../../../bn/docs/security/COMPLIANCE.md) · 🇧🇦 [bs](../../../bs/docs/security/COMPLIANCE.md) · 🇨🇿 [cs](../../../cs/docs/security/COMPLIANCE.md) · 🇩🇰 [da](../../../da/docs/security/COMPLIANCE.md) · 🇩🇪 [de](../../../de/docs/security/COMPLIANCE.md) · 🇬🇷 [el](../../../el/docs/security/COMPLIANCE.md) · 🇪🇸 [es](../../../es/docs/security/COMPLIANCE.md) · 🇪🇪 [et](../../../et/docs/security/COMPLIANCE.md) · 🇮🇷 [fa](../../../fa/docs/security/COMPLIANCE.md) · 🇫🇷 [fr](../../../fr/docs/security/COMPLIANCE.md) · 🇮🇪 [ga](../../../ga/docs/security/COMPLIANCE.md) · 🇮🇳 [gu](../../../gu/docs/security/COMPLIANCE.md) · 🇳🇬 [ha](../../../ha/docs/security/COMPLIANCE.md) · 🇮🇱 [he](../../../he/docs/security/COMPLIANCE.md) · 🇮🇳 [hi](../../../hi/docs/security/COMPLIANCE.md) · 🇭🇷 [hr](../../../hr/docs/security/COMPLIANCE.md) · 🇭🇺 [hu](../../../hu/docs/security/COMPLIANCE.md) · 🇦🇲 [hy](../../../hy/docs/security/COMPLIANCE.md) · 🇮🇩 [id](../../../id/docs/security/COMPLIANCE.md) · 🇳🇬 [ig](../../../ig/docs/security/COMPLIANCE.md) · 🇮🇹 [it](../../../it/docs/security/COMPLIANCE.md) · 🇯🇵 [ja](../../../ja/docs/security/COMPLIANCE.md) · 🇬🇪 [ka](../../../ka/docs/security/COMPLIANCE.md) · 🇰🇭 [km](../../../km/docs/security/COMPLIANCE.md) · 🇮🇳 [kn](../../../kn/docs/security/COMPLIANCE.md) · 🇰🇷 [ko](../../../ko/docs/security/COMPLIANCE.md) · 🇱🇹 [lt](../../../lt/docs/security/COMPLIANCE.md) · 🇱🇻 [lv](../../../lv/docs/security/COMPLIANCE.md) · 🇮🇳 [ml](../../../ml/docs/security/COMPLIANCE.md) · 🇮🇳 [mr](../../../mr/docs/security/COMPLIANCE.md) · 🇲🇾 [ms](../../../ms/docs/security/COMPLIANCE.md) · 🇲🇹 [mt](../../../mt/docs/security/COMPLIANCE.md) · 🇲🇲 [my](../../../my/docs/security/COMPLIANCE.md) · 🇳🇵 [ne](../../../ne/docs/security/COMPLIANCE.md) · 🇳🇱 [nl](../../../nl/docs/security/COMPLIANCE.md) · 🇳🇴 [no](../../../no/docs/security/COMPLIANCE.md) · 🇮🇳 [or](../../../or/docs/security/COMPLIANCE.md) · 🇮🇳 [pa](../../../pa/docs/security/COMPLIANCE.md) · 🇵🇭 [phi](../../../phi/docs/security/COMPLIANCE.md) · 🇵🇱 [pl](../../../pl/docs/security/COMPLIANCE.md) · 🇵🇹 [pt](../../../pt/docs/security/COMPLIANCE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/COMPLIANCE.md) · 🇷🇴 [ro](../../../ro/docs/security/COMPLIANCE.md) · 🇷🇺 [ru](../../../ru/docs/security/COMPLIANCE.md) · 🇱🇰 [si](../../../si/docs/security/COMPLIANCE.md) · 🇸🇰 [sk](../../../sk/docs/security/COMPLIANCE.md) · 🇸🇮 [sl](../../../sl/docs/security/COMPLIANCE.md) · 🇷🇸 [sr](../../../sr/docs/security/COMPLIANCE.md) · 🇸🇪 [sv](../../../sv/docs/security/COMPLIANCE.md) · 🇰🇪 [sw](../../../sw/docs/security/COMPLIANCE.md) · 🇮🇳 [ta](../../../ta/docs/security/COMPLIANCE.md) · 🇮🇳 [te](../../../te/docs/security/COMPLIANCE.md) · 🇹🇭 [th](../../../th/docs/security/COMPLIANCE.md) · 🇹🇷 [tr](../../../tr/docs/security/COMPLIANCE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/COMPLIANCE.md) · 🇵🇰 [ur](../../../ur/docs/security/COMPLIANCE.md) · 🇺🇿 [uz](../../../uz/docs/security/COMPLIANCE.md) · 🇻🇳 [vi](../../../vi/docs/security/COMPLIANCE.md) · 🇳🇬 [yo](../../../yo/docs/security/COMPLIANCE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/COMPLIANCE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/COMPLIANCE.md)

---

> **Totuuden lähde:** `src/lib/compliance/`, `src/app/api/compliance/`
> **Viimeksi päivitetty:** 2026-06-28 — v3.8.40

OmniRoute tallentaa hallinnolliset toimet, todennustapahtumat, palveluntarjoajien tunnistetietojen elinkaaren muutokset ja MCP-työkalukutsut SQLite-pohjaisiin auditointitauluihin. Tällä sivulla käsitellään, mitä lokitetaan, missä tiedot sijaitsevat, kuinka kauan niitä säilytetään, miten API-avaimet voivat kieltäytyä lokituksesta ja miten tietoja voi hakea.

Toteutus sijaitsee tiedostoissa `src/lib/compliance/index.ts` (T-43 — "Compliance Controls") ja `src/lib/compliance/providerAudit.ts`. Auditointikirjaukset eivät koskaan heitä poikkeusta: virheen ilmetessä kutsu ohitetaan hiljaisesti, jotta auditointilokitus ei voi häiritä varsinaisen pyynnön käsittelyä.

## Mitä lokitetaan

### Hallinnolliset auditointitapahtumat (`audit_log`)

Jokainen `logAuditEvent({ action, actor, target, details, ... })`-kutsu tuottaa yhden rivin. Toimintomerkkijonot noudattavat mallia `domain.verb` (tai `domain.verb.outcome`). Lähdekoodista vahvistettuja toimintotyyppejä ovat:

| Toiminto                             | Lähde                                   |
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

Jokainen merkintä tallentaa kentät `action`, `actor` (oletusarvo on `"system"`), `target`, `details`/`metadata` (JSON), `ip_address`, `resource_type`, `status`, `request_id` ja `timestamp`. Arkaluonteiset avaimet (`apiKey`, `accessToken`, `refreshToken`, `password`, kaikki kaavaa `*token`/`*secret`/`*apikey` vastaavat avaimet jne.) peitetään rekursiivisesti arvolla `"[redacted]"` ennen rivin kirjoittamista.

### MCP-työkalukutsut (`mcp_tool_audit`)

Jokainen MCP-työkalukutsu kirjoittaa rivin tiedoston `open-sse/mcp-server/audit.ts` kautta. Skeema (tiedostosta `src/lib/db/migrations/002_mcp_a2a_tables.sql`):

| Sarake           | Huomautukset                                     |
| ---------------- | ------------------------------------------------ |
| `id`             | automaattisesti kasvava                          |
| `tool_name`      | MCP-työkalun tunniste                            |
| `input_hash`     | syötteen sha256 (hyötykuormaa ei säilytetä)      |
| `output_summary` | lyhyt, katkaistu yhteenveto                      |
| `duration_ms`    | kulunut todellinen aika                          |
| `api_key_id`     | kutsuja (voi olla tyhjä)                         |
| `success`        | `1` / `0`                                        |
| `error_code`     | lopullinen virhekoodi epäonnistumisen yhteydessä |
| `created_at`     | ISO-aikaleima                                    |

### Pyyntö- ja käyttölokit

Nämä ovat operatiivista telemetriaa (eivät varsinaisesti hallinnollista auditointia), mutta niihin sovelletaan samaa säilytysprosessia:

- `usage_history` — pyyntökohtainen käyttökooste
- `call_logs` — täydellinen pyyntökohtainen loki (rivimäärärajoituksen alainen, katso jäljempänä)
- `proxy_logs` — välityspalvelinliikenteen loki (rivimäärärajoituksen alainen)
- `request_detail_logs` — vanha yksityiskohtainen pyyntöloki (karsitaan edelleen, jos se on olemassa)

## Tallennusskeema

`audit_log` luodaan tarvittaessa laiskasti `ensureAuditLogSchema()`-funktion ensimmäisellä käyttökerralla:

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

Indeksit luodaan sarakkeille `timestamp`, `action`, `actor`, `resource_type`,
`status` ja `request_id`. Vanhoista tietokannoista puuttuvat sarakkeet lisätään
tarvittaessa `ALTER TABLE` -komennolla.

## Säilytys ja siivous

Käytössä on kaksi erillistä säilytysaikaa:

| Ympäristömuuttuja           | Oletus   | Koskee                                                            |
| --------------------------- | -------- | ----------------------------------------------------------------- |
| `APP_LOG_RETENTION_DAYS`    | `7`      | `audit_log`, `mcp_tool_audit`                                     |
| `CALL_LOG_RETENTION_DAYS`   | `7`      | `usage_history`, `call_logs`, `proxy_logs`, `request_detail_logs` |
| `CALL_LOGS_TABLE_MAX_ROWS`  | `100000` | `call_logs`-taulun rivimäärän rajoitus                            |
| `PROXY_LOGS_TABLE_MAX_ROWS` | `100000` | `proxy_logs`-taulun rivimäärän rajoitus                           |

`cleanupExpiredLogs()` suorittaa säilytysajan mukaisen siivouksen. Se kutsutaan
palvelimen käynnistyessä tiedostosta `src/instrumentation-node.ts`. Jokainen
suorituskerta kirjaa `compliance.cleanup`-tarkastuslokitapahtuman, joka sisältää
taulukohtaiset poistettujen rivien määrät. Välityspalvelin- ja kutsulokien
rajaaminen tehdään erissä (`BATCH_SIZE = 5000`) pitkien kirjoituslukitusten
välttämiseksi.

Pyyntöhistorian manuaalinen siivous on erillinen säilytysaikaan perustuvasta
siivouksesta. Pyyntölokisivu kutsuu päätepistettä
`POST /api/settings/purge-request-history`, joka poistaa `call_logs`-taulun,
vanhan `request_detail_logs`-taulun sekä paikalliset pyyntöartefaktit hakemistosta
`${DATA_DIR}/call_logs/`.

Oletusarvot määritellään tiedostossa `src/lib/logEnv.ts`
(`DEFAULT_APP_LOG_RETENTION_DAYS = 7`, `DEFAULT_CALL_LOG_RETENTION_DAYS = 7`).

## `noLog`-poissulkeminen (API-avainkohtainen)

API-avaimet voidaan merkitä niin, ettei niiden jatkokutsuliikennettä kirjata
lokiin. Merkintä sijaitsee `api_keys`-taulussa (`no_log INTEGER DEFAULT 0`) ja
peilataan muistissa olevaan joukkoon nopeita hakupolun tarkistuksia varten.

```bash
# Luo lokiin kirjaamaton avain (hallinnan todennus vaaditaan)
curl -X POST http://localhost:20128/api/keys \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"name": "Privacy key", "noLog": true}'
```

Apufunktiot (`src/lib/compliance/index.ts`):

- `setNoLog(apiKeyId, true|false)` — ottaa muistissa olevan merkinnän käyttöön tai poistaa sen käytöstä
- `isNoLog(apiKeyId)` — tarkistetaan pyyntöpolulla; käyttää vararatkaisuna
  `api_keys.no_log`-arvon 30 sekunniksi välimuistiin tallennettua lukua
- `NO_LOG_API_KEY_IDS` (ympäristömuuttuja, pilkuilla eroteltu) — ladataan
  muistissa olevaan joukkoon käynnistyksen yhteydessä; hyödyllinen, kun
  sarakkeen arvoa ei voi muuttaa suoraan

`noLog` **ei** vaikuta hallinnollisiin tarkastuslokitapahtumiin (kirjautumiset,
palveluntarjoajien muutokset, MCP-työkalukutsut jne.) — ainoastaan
pyyntökohtainen liikenteen lokikirjaus jätetään pois.

## REST API

| Päätepiste                  | Menetelmä | Kuvaus                                                       | Todennus   |
| --------------------------- | --------- | ------------------------------------------------------------ | ---------- |
| `/api/compliance/audit-log` | `GET`     | Sivutettu järjestelmänvalvojan auditointiloki suodattimineen | management |
| `/api/mcp/audit`            | `GET`     | Sivutetut MCP-työkalujen auditointimerkinnät                 | (open-sse) |
| `/api/mcp/audit/stats`      | `GET`     | Koostetut MCP-auditointitilastot                             | (open-sse) |

CSV-vientipäätepistettä ei tällä hetkellä toimiteta — vie tiedot hallintapaneelista tai tee kysely
suoraan SQLite-tietokantaan.

### Päätepisteen `/api/compliance/audit-log` käyttäminen

Tuetut kyselyparametrit (kaikki valinnaisia; kaikissa tekstisuodattimissa käytetään
`LIKE %value%` -täsmäytystä):

- `action`, `actor`, `target`, `resourceType` (tai `resource_type`),
  `status`, `requestId` (tai `request_id`)
- `from` / `since`, `to` / `until` — ISO-aikaleimat
- `limit` (oletus `50`, vähintään `1`, enintään `500`)
- `offset` (oletus `0`, enintään `10_000`)

Vastaus on JSON-taulukko. Sivutuksen metatiedot palautetaan otsakkeissa:
`x-total-count`, `x-page-limit`, `x-page-offset`.

```bash
curl "http://localhost:20128/api/compliance/audit-log?action=provider.credentials&from=2026-05-01" \
  -H "Cookie: auth_token=..."
```

## Hallintapaneeli

Hallintapaneeli näyttää auditointitiedot osoitteessa **`/dashboard/audit`**
(`src/app/(dashboard)/dashboard/audit/page.tsx`). Sivulla on kaksi välilehteä:

- **Vaatimustenmukaisuus** (`ComplianceTab.tsx`) — järjestelmänvalvojan auditointitapahtumat
  päätepisteestä `/api/compliance/audit-log`. Suodatus tapahtumatyypin, vakavuuden (info / warning
  / critical, johdettu toiminnosta ja tilasta) ja päivämäärävälin mukaan. Vakavuus
  lasketaan asiakaspuolella toiminto- ja tilamerkkijonoista.
- **MCP** (`McpAuditTab.tsx`) — MCP-työkalujen auditointitiedot päätepisteestä `/api/mcp/audit`;
  suodatus työkalun nimen ja onnistumisen/epäonnistumisen mukaan.

Molemmat välilehdet käyttävät sivutusta, jonka sivukoot ovat `50` (vaatimustenmukaisuus) ja `25` (MCP).

## Palveluntarjoajan tunnistetietojen apufunktiot

`src/lib/compliance/providerAudit.ts` sisältää tietojen muotoilun apufunktiot, joita
palveluntarjoajien hallintareitit käyttävät luodessaan tunnistetietotapahtumia:

- `summarizeProviderConnectionForAudit(connection)` — poistaa kentät `apiKey`,
  `accessToken`, `refreshToken`, `idToken` ja
  `providerSpecificData.consoleApiKey` ennen kuin yhteyden tilannevedos
  kirjoitetaan `details`-kenttään.
- `getProviderAuditTarget(connection)` — muodostaa vakaan
  `"<provider>:<name|id>"`-merkkijonon `target`-kenttää varten.
- `extractProviderWarnings(...payloads)` — etsii palveluntarjoajien vastauksista
  käytäntö- ja turvallisuusvaroituksia (`[sanitizer]`, `prompt injection detected`,
  `content has been filtered`, `safety filter`, `policy violation`) ja
  palauttaa enintään 5 osumaa, joista kukin lyhennetään 400 merkkiin.

## Parhaat käytännöt

- Merkitse henkilötietoja (oikeudellisia, lääketieteellisiä jne.) käsittelevät API-avaimet asetuksella `noLog: true`.
- Säädä arvoja `APP_LOG_RETENTION_DAYS` / `CALL_LOG_RETENTION_DAYS` säilytyskäytäntösi
  mukaisiksi. Seitsemän päivän oletusarvot ovat varovaisia.
- Vie auditointitaulu alustan ulkopuolelle (`sqlite3 dump`) vaatimustenmukaisuusohjelmasi
  edellyttämän aikataulun mukaisesti — sisäänrakennettua arkistointia ei ole.
- Seuraa tapahtumien `auth.login.failed` ja `auth.login.locked` määriä
  raakaa voimaa käyttävien hyökkäysten havaitsemiseksi.
- Kun lisäät uusia järjestelmänvalvojan päätepisteitä, kutsu funktiota `logAuditEvent({ ... })` käyttäen vakaata
  `domain.verb.outcome`-toimintomerkkijonoa ja välitä pyynnön konteksti funktion
  `getAuditRequestContext(request)` kautta, jotta IP-osoite ja `requestId` tallennetaan
  automaattisesti.

## Katso myös

- [`docs/security/GUARDRAILS.md`](./GUARDRAILS.md) — henkilötietojen peittäminen, prompt-injektio
- [`docs/frameworks/MCP-SERVER.md`](../frameworks/MCP-SERVER.md) — MCP-työkaluluettelo ja käyttöoikeusalueet
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md) — täydellinen ympäristömuuttujien viite
- Lähdekoodi: `src/lib/compliance/`, `src/app/api/compliance/`,
  `src/app/api/mcp/audit/`, `src/lib/logEnv.ts`
