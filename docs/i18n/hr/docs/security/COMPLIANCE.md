# Compliance & Audit (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../security/COMPLIANCE.md) · 🇪🇹 [am](../../../am/docs/security/COMPLIANCE.md) · 🇸🇦 [ar](../../../ar/docs/security/COMPLIANCE.md) · 🇦🇿 [az](../../../az/docs/security/COMPLIANCE.md) · 🇧🇬 [bg](../../../bg/docs/security/COMPLIANCE.md) · 🇧🇩 [bn](../../../bn/docs/security/COMPLIANCE.md) · 🇨🇿 [cs](../../../cs/docs/security/COMPLIANCE.md) · 🇩🇰 [da](../../../da/docs/security/COMPLIANCE.md) · 🇩🇪 [de](../../../de/docs/security/COMPLIANCE.md) · 🇬🇷 [el](../../../el/docs/security/COMPLIANCE.md) · 🇪🇸 [es](../../../es/docs/security/COMPLIANCE.md) · 🇪🇪 [et](../../../et/docs/security/COMPLIANCE.md) · 🇮🇷 [fa](../../../fa/docs/security/COMPLIANCE.md) · 🇫🇮 [fi](../../../fi/docs/security/COMPLIANCE.md) · 🇫🇷 [fr](../../../fr/docs/security/COMPLIANCE.md) · 🇮🇪 [ga](../../../ga/docs/security/COMPLIANCE.md) · 🇮🇳 [gu](../../../gu/docs/security/COMPLIANCE.md) · 🇳🇬 [ha](../../../ha/docs/security/COMPLIANCE.md) · 🇮🇱 [he](../../../he/docs/security/COMPLIANCE.md) · 🇮🇳 [hi](../../../hi/docs/security/COMPLIANCE.md) · 🇭🇺 [hu](../../../hu/docs/security/COMPLIANCE.md) · 🇦🇲 [hy](../../../hy/docs/security/COMPLIANCE.md) · 🇮🇩 [id](../../../id/docs/security/COMPLIANCE.md) · 🇳🇬 [ig](../../../ig/docs/security/COMPLIANCE.md) · 🇮🇹 [it](../../../it/docs/security/COMPLIANCE.md) · 🇯🇵 [ja](../../../ja/docs/security/COMPLIANCE.md) · 🇬🇪 [ka](../../../ka/docs/security/COMPLIANCE.md) · 🇰🇭 [km](../../../km/docs/security/COMPLIANCE.md) · 🇮🇳 [kn](../../../kn/docs/security/COMPLIANCE.md) · 🇰🇷 [ko](../../../ko/docs/security/COMPLIANCE.md) · 🇱🇹 [lt](../../../lt/docs/security/COMPLIANCE.md) · 🇱🇻 [lv](../../../lv/docs/security/COMPLIANCE.md) · 🇮🇳 [ml](../../../ml/docs/security/COMPLIANCE.md) · 🇮🇳 [mr](../../../mr/docs/security/COMPLIANCE.md) · 🇲🇾 [ms](../../../ms/docs/security/COMPLIANCE.md) · 🇲🇹 [mt](../../../mt/docs/security/COMPLIANCE.md) · 🇲🇲 [my](../../../my/docs/security/COMPLIANCE.md) · 🇳🇵 [ne](../../../ne/docs/security/COMPLIANCE.md) · 🇳🇱 [nl](../../../nl/docs/security/COMPLIANCE.md) · 🇳🇴 [no](../../../no/docs/security/COMPLIANCE.md) · 🇮🇳 [or](../../../or/docs/security/COMPLIANCE.md) · 🇮🇳 [pa](../../../pa/docs/security/COMPLIANCE.md) · 🇵🇭 [phi](../../../phi/docs/security/COMPLIANCE.md) · 🇵🇱 [pl](../../../pl/docs/security/COMPLIANCE.md) · 🇵🇹 [pt](../../../pt/docs/security/COMPLIANCE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/COMPLIANCE.md) · 🇷🇴 [ro](../../../ro/docs/security/COMPLIANCE.md) · 🇷🇺 [ru](../../../ru/docs/security/COMPLIANCE.md) · 🇱🇰 [si](../../../si/docs/security/COMPLIANCE.md) · 🇸🇰 [sk](../../../sk/docs/security/COMPLIANCE.md) · 🇸🇮 [sl](../../../sl/docs/security/COMPLIANCE.md) · 🇷🇸 [sr](../../../sr/docs/security/COMPLIANCE.md) · 🇸🇪 [sv](../../../sv/docs/security/COMPLIANCE.md) · 🇰🇪 [sw](../../../sw/docs/security/COMPLIANCE.md) · 🇮🇳 [ta](../../../ta/docs/security/COMPLIANCE.md) · 🇮🇳 [te](../../../te/docs/security/COMPLIANCE.md) · 🇹🇭 [th](../../../th/docs/security/COMPLIANCE.md) · 🇹🇷 [tr](../../../tr/docs/security/COMPLIANCE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/COMPLIANCE.md) · 🇵🇰 [ur](../../../ur/docs/security/COMPLIANCE.md) · 🇺🇿 [uz](../../../uz/docs/security/COMPLIANCE.md) · 🇻🇳 [vi](../../../vi/docs/security/COMPLIANCE.md) · 🇳🇬 [yo](../../../yo/docs/security/COMPLIANCE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/COMPLIANCE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/COMPLIANCE.md)

---

> **Izvor istine:** `src/lib/compliance/`, `src/app/api/compliance/`
> **Posljednje ažuriranje:** 2026-06-28 — v3.8.40

OmniRoute bilježi administrativne radnje, događaje autentifikacije, promjene životnog ciklusa vjerodajnica pružatelja i pozive MCP alata u revizijske tablice koje se pohranjuju u SQLiteu. Ova stranica opisuje što se bilježi, gdje se podaci nalaze, koliko se dugo čuvaju, kako API ključevi mogu isključiti bilježenje i kako postavljati upite nad podacima.

Implementacija se nalazi u `src/lib/compliance/index.ts` (T-43 — „Kontrole usklađenosti”) i `src/lib/compliance/providerAudit.ts`. Revizijski zapisi nikada ne uzrokuju iznimke: pri bilo kakvom neuspjehu poziv se tiho zanemaruje kako revizijsko bilježenje ne bi moglo prekinuti glavni tijek zahtjeva.

## Što se bilježi

### Administrativni revizijski događaji (`audit_log`)

Svaki poziv funkcije `logAuditEvent({ action, actor, target, details, ... })` stvara jedan redak. Nizovi radnji slijede obrazac `domain.verb` (ili `domain.verb.outcome`). Potvrđene vrste radnji u izvornom stablu uključuju:

| Radnja                               | Izvor                                   |
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

Svaki unos obuhvaća `action`, `actor` (zadana vrijednost je `"system"`), `target`, `details`/`metadata` (JSON), `ip_address`, `resource_type`, `status`, `request_id` i `timestamp`. Osjetljivi ključevi (`apiKey`, `accessToken`, `refreshToken`, `password`, svi ključevi koji odgovaraju uzorcima `*token`/`*secret`/`*apikey` itd.) rekurzivno se redigiraju u `"[redacted]"` prije zapisivanja retka.

### Pozivi MCP alata (`mcp_tool_audit`)

Svaki poziv MCP alata zapisuje redak putem datoteke `open-sse/mcp-server/audit.ts`. Shema (iz `src/lib/db/migrations/002_mcp_a2a_tables.sql`):

| Stupac           | Napomene                                 |
| ---------------- | ---------------------------------------- |
| `id`             | automatsko povećavanje                   |
| `tool_name`      | identifikator MCP alata                  |
| `input_hash`     | sha256 ulaza (sadržaj se ne pohranjuje)  |
| `output_summary` | kratak, skraćen sažetak                  |
| `duration_ms`    | proteklo stvarno vrijeme                 |
| `api_key_id`     | pozivatelj (može biti null)              |
| `success`        | `1` / `0`                                |
| `error_code`     | završni kôd pogreške u slučaju neuspjeha |
| `created_at`     | ISO vremenska oznaka                     |

### Zapisi zahtjeva / upotrebe

Riječ je o operativnoj telemetriji (ne strogo o administrativnoj reviziji), ali koristi isti proces zadržavanja:

- `usage_history` — zbirni podaci o upotrebi po zahtjevu
- `call_logs` — potpuni zapis po zahtjevu (podliježe ograničenju broja redaka; pogledajte u nastavku)
- `proxy_logs` — zapis prometa proxy poslužitelja (podliježe ograničenju broja redaka)
- `request_detail_logs` — naslijeđeni detaljni zapis zahtjeva (i dalje se uklanja ako postoji)

## Shema pohrane

`audit_log` se stvara odgođeno funkcijom `ensureAuditLogSchema()` pri prvoj upotrebi:

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

Indeksi se stvaraju za `timestamp`, `action`, `actor`, `resource_type`,
`status` i `request_id`. Stupci koji nedostaju u starijim bazama podataka dodaju se prema
potrebi putem naredbe `ALTER TABLE`.

## Zadržavanje i čišćenje

Primjenjuju se dva zasebna razdoblja zadržavanja:

| Varijabla okruženja         | Zadano   | Primjenjuje se na                                                 |
| --------------------------- | -------- | ----------------------------------------------------------------- |
| `APP_LOG_RETENTION_DAYS`    | `7`      | `audit_log`, `mcp_tool_audit`                                     |
| `CALL_LOG_RETENTION_DAYS`   | `7`      | `usage_history`, `call_logs`, `proxy_logs`, `request_detail_logs` |
| `CALL_LOGS_TABLE_MAX_ROWS`  | `100000` | Ograničavanje broja redaka za `call_logs`                         |
| `PROXY_LOGS_TABLE_MAX_ROWS` | `100000` | Ograničavanje broja redaka za `proxy_logs`                        |

`cleanupExpiredLogs()` izvršava postupak zadržavanja. Poziva se pri pokretanju poslužitelja
iz `src/instrumentation-node.ts`. Svako izvršavanje bilježi revizijski događaj
`compliance.cleanup` s brojem izbrisanih zapisa po tablici. Ograničavanje zapisnika proxyja/poziva
izvodi se u serijama (`BATCH_SIZE = 5000`) kako bi se izbjegla dugotrajna zaključavanja za pisanje.

Ručno čišćenje povijesti zahtjeva odvojeno je od zadržavanja. Stranica Zapisnici zahtjeva
poziva `POST /api/settings/purge-request-history`, čime se brišu `call_logs`,
naslijeđeni `request_detail_logs` i lokalni artefakti zahtjeva u
`${DATA_DIR}/call_logs/`.

Zadane vrijednosti definirane su u `src/lib/logEnv.ts`
(`DEFAULT_APP_LOG_RETENTION_DAYS = 7`, `DEFAULT_CALL_LOG_RETENTION_DAYS = 7`).

## Isključivanje putem `noLog` (po API ključu)

API ključevi mogu se označiti tako da se promet njihovih nizvodnih poziva ne bilježi. Oznaka
se nalazi u tablici `api_keys` (`no_log INTEGER DEFAULT 0`) i zrcali se
u skupu u memoriji radi brzih provjera na kritičnom putu.

```bash
# Stvorite ključ bez bilježenja (potrebna je upravljačka autentifikacija)
curl -X POST http://localhost:20128/api/keys \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"name": "Privacy key", "noLog": true}'
```

Pomoćne funkcije (`src/lib/compliance/index.ts`):

- `setNoLog(apiKeyId, true|false)` — uključuje ili isključuje unos u memoriji
- `isNoLog(apiKeyId)` — provjerava se na putu zahtjeva; ako nema rezultata, koristi se očitanje
  `api_keys.no_log` iz predmemorije u trajanju od 30 s
- `NO_LOG_API_KEY_IDS` (varijabla okruženja, vrijednosti odvojene zarezima) — unaprijed se učitava u skup u memoriji
  pri pokretanju; korisno kada stupac ne možete izravno mijenjati

Administrativni revizijski događaji (prijava, promjene pružatelja usluga, pozivi MCP alata itd.)
**nisu** obuhvaćeni postavkom `noLog` — isključuje se samo bilježenje prometa
po zahtjevu.

## REST API

| Krajnja točka               | Metoda | Opis                                                     | Autorizacija |
| --------------------------- | ------ | -------------------------------------------------------- | ------------ |
| `/api/compliance/audit-log` | `GET`  | Paginirani administratorski revizijski zapisi s filtrima | management   |
| `/api/mcp/audit`            | `GET`  | Paginirani revizijski zapisi MCP alata                   | (open-sse)   |
| `/api/mcp/audit/stats`      | `GET`  | Agregirana statistika MCP revizije                       | (open-sse)   |

Trenutačno se ne isporučuje krajnja točka za izvoz u CSV — izvezite podatke s nadzorne ploče ili izravno pošaljite upit
SQLite bazi podataka.

### Slanje upita na `/api/compliance/audit-log`

Podržani parametri upita (svi su neobavezni, a svi tekstni filtri koriste podudaranje
`LIKE %value%`):

- `action`, `actor`, `target`, `resourceType` (ili `resource_type`),
  `status`, `requestId` (ili `request_id`)
- `from` / `since`, `to` / `until` — ISO vremenske oznake
- `limit` (zadano `50`, min. `1`, maks. `500`)
- `offset` (zadano `0`, maks. `10_000`)

Odgovor je JSON polje. Metapodaci paginacije vraćaju se u zaglavljima:
`x-total-count`, `x-page-limit`, `x-page-offset`.

```bash
curl "http://localhost:20128/api/compliance/audit-log?action=provider.credentials&from=2026-05-01" \
  -H "Cookie: auth_token=..."
```

## Nadzorna ploča

Nadzorna ploča prikazuje revizijske podatke na **`/dashboard/audit`**
(`src/app/(dashboard)/dashboard/audit/page.tsx`). Stranica ima dvije kartice:

- **Usklađenost** (`ComplianceTab.tsx`) — administratorski revizijski događaji iz
  `/api/compliance/audit-log`. Filtriranje prema vrsti događaja, ozbiljnosti (informativno / upozorenje
  / kritično, izvedeno iz radnje i statusa) i rasponu datuma. Ozbiljnost se
  izračunava na klijentskoj strani iz nizova radnje/statusa.
- **MCP** (`McpAuditTab.tsx`) — revizija MCP alata iz `/api/mcp/audit`, s
  filtrima prema nazivu alata i uspjehu/neuspjehu.

Obje kartice koriste paginaciju s veličinama stranica od `50` (usklađenost) i `25` (MCP).

## Pomoćne funkcije za vjerodajnice pružatelja usluga

`src/lib/compliance/providerAudit.ts` pruža pomoćne funkcije za oblikovanje podataka koje koriste
rute za upravljanje pružateljima usluga pri generiranju događaja povezanih s vjerodajnicama:

- `summarizeProviderConnectionForAudit(connection)` — uklanja `apiKey`,
  `accessToken`, `refreshToken`, `idToken` i
  `providerSpecificData.consoleApiKey` prije nego što se snimka veze
  zapiše u `details`.
- `getProviderAuditTarget(connection)` — sastavlja stabilan niz
  `"<provider>:<name|id>"` za polje `target`.
- `extractProviderWarnings(...payloads)` — pretražuje odgovore pružatelja usluga radi
  upozorenja o pravilima/sigurnosti (`[sanitizer]`, `prompt injection detected`,
  `content has been filtered`, `safety filter`, `policy violation`) i
  izdvaja do 5 pogodaka, pri čemu se svaki skraćuje na 400 znakova.

## Najbolje prakse

- Označite API ključeve koji obrađuju osobne podatke (pravne, medicinske itd.) s `noLog: true`.
- Prilagodite `APP_LOG_RETENTION_DAYS` / `CALL_LOG_RETENTION_DAYS` svojoj
  politici zadržavanja. Zadane vrijednosti od 7 dana konzervativne su.
- Izvozite revizijsku tablicu izvan platforme (`sqlite3 dump`) učestalošću
  koju zahtijeva vaš program usklađenosti — ugrađeno arhiviranje ne postoji.
- Pratite broj događaja `auth.login.failed` i `auth.login.locked` radi otkrivanja
  napada grubom silom.
- Pri dodavanju novih administratorskih krajnjih točaka pozovite `logAuditEvent({ ... })` sa stabilnim
  nizom radnje `domain.verb.outcome` i proslijedite kontekst zahtjeva putem
  `getAuditRequestContext(request)` kako bi se IP adresa i `requestId` automatski
  zabilježili.

## Vidi također

- [`docs/security/GUARDRAILS.md`](./GUARDRAILS.md) — maskiranje osobnih podataka, ubrizgavanje upita
- [`docs/frameworks/MCP-SERVER.md`](../frameworks/MCP-SERVER.md) — katalog MCP alata i opsezi
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md) — potpuni pregled varijabli okruženja
- Izvor: `src/lib/compliance/`, `src/app/api/compliance/`,
  `src/app/api/mcp/audit/`, `src/lib/logEnv.ts`
