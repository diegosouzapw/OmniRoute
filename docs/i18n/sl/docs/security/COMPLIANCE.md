# Compliance & Audit (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../security/COMPLIANCE.md) · 🇪🇹 [am](../../../am/docs/security/COMPLIANCE.md) · 🇸🇦 [ar](../../../ar/docs/security/COMPLIANCE.md) · 🇦🇿 [az](../../../az/docs/security/COMPLIANCE.md) · 🇧🇬 [bg](../../../bg/docs/security/COMPLIANCE.md) · 🇧🇩 [bn](../../../bn/docs/security/COMPLIANCE.md) · 🇨🇿 [cs](../../../cs/docs/security/COMPLIANCE.md) · 🇩🇰 [da](../../../da/docs/security/COMPLIANCE.md) · 🇩🇪 [de](../../../de/docs/security/COMPLIANCE.md) · 🇬🇷 [el](../../../el/docs/security/COMPLIANCE.md) · 🇪🇸 [es](../../../es/docs/security/COMPLIANCE.md) · 🇪🇪 [et](../../../et/docs/security/COMPLIANCE.md) · 🇮🇷 [fa](../../../fa/docs/security/COMPLIANCE.md) · 🇫🇮 [fi](../../../fi/docs/security/COMPLIANCE.md) · 🇫🇷 [fr](../../../fr/docs/security/COMPLIANCE.md) · 🇮🇪 [ga](../../../ga/docs/security/COMPLIANCE.md) · 🇮🇳 [gu](../../../gu/docs/security/COMPLIANCE.md) · 🇳🇬 [ha](../../../ha/docs/security/COMPLIANCE.md) · 🇮🇱 [he](../../../he/docs/security/COMPLIANCE.md) · 🇮🇳 [hi](../../../hi/docs/security/COMPLIANCE.md) · 🇭🇷 [hr](../../../hr/docs/security/COMPLIANCE.md) · 🇭🇺 [hu](../../../hu/docs/security/COMPLIANCE.md) · 🇦🇲 [hy](../../../hy/docs/security/COMPLIANCE.md) · 🇮🇩 [id](../../../id/docs/security/COMPLIANCE.md) · 🇳🇬 [ig](../../../ig/docs/security/COMPLIANCE.md) · 🇮🇹 [it](../../../it/docs/security/COMPLIANCE.md) · 🇯🇵 [ja](../../../ja/docs/security/COMPLIANCE.md) · 🇬🇪 [ka](../../../ka/docs/security/COMPLIANCE.md) · 🇰🇭 [km](../../../km/docs/security/COMPLIANCE.md) · 🇮🇳 [kn](../../../kn/docs/security/COMPLIANCE.md) · 🇰🇷 [ko](../../../ko/docs/security/COMPLIANCE.md) · 🇱🇹 [lt](../../../lt/docs/security/COMPLIANCE.md) · 🇱🇻 [lv](../../../lv/docs/security/COMPLIANCE.md) · 🇮🇳 [ml](../../../ml/docs/security/COMPLIANCE.md) · 🇮🇳 [mr](../../../mr/docs/security/COMPLIANCE.md) · 🇲🇾 [ms](../../../ms/docs/security/COMPLIANCE.md) · 🇲🇹 [mt](../../../mt/docs/security/COMPLIANCE.md) · 🇲🇲 [my](../../../my/docs/security/COMPLIANCE.md) · 🇳🇵 [ne](../../../ne/docs/security/COMPLIANCE.md) · 🇳🇱 [nl](../../../nl/docs/security/COMPLIANCE.md) · 🇳🇴 [no](../../../no/docs/security/COMPLIANCE.md) · 🇮🇳 [or](../../../or/docs/security/COMPLIANCE.md) · 🇮🇳 [pa](../../../pa/docs/security/COMPLIANCE.md) · 🇵🇭 [phi](../../../phi/docs/security/COMPLIANCE.md) · 🇵🇱 [pl](../../../pl/docs/security/COMPLIANCE.md) · 🇵🇹 [pt](../../../pt/docs/security/COMPLIANCE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/COMPLIANCE.md) · 🇷🇴 [ro](../../../ro/docs/security/COMPLIANCE.md) · 🇷🇺 [ru](../../../ru/docs/security/COMPLIANCE.md) · 🇱🇰 [si](../../../si/docs/security/COMPLIANCE.md) · 🇸🇰 [sk](../../../sk/docs/security/COMPLIANCE.md) · 🇷🇸 [sr](../../../sr/docs/security/COMPLIANCE.md) · 🇸🇪 [sv](../../../sv/docs/security/COMPLIANCE.md) · 🇰🇪 [sw](../../../sw/docs/security/COMPLIANCE.md) · 🇮🇳 [ta](../../../ta/docs/security/COMPLIANCE.md) · 🇮🇳 [te](../../../te/docs/security/COMPLIANCE.md) · 🇹🇭 [th](../../../th/docs/security/COMPLIANCE.md) · 🇹🇷 [tr](../../../tr/docs/security/COMPLIANCE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/COMPLIANCE.md) · 🇵🇰 [ur](../../../ur/docs/security/COMPLIANCE.md) · 🇺🇿 [uz](../../../uz/docs/security/COMPLIANCE.md) · 🇻🇳 [vi](../../../vi/docs/security/COMPLIANCE.md) · 🇳🇬 [yo](../../../yo/docs/security/COMPLIANCE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/COMPLIANCE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/COMPLIANCE.md)

---

> **Vir resnice:** `src/lib/compliance/`, `src/app/api/compliance/`
> **Zadnja posodobitev:** 2026-06-28 — v3.8.40

OmniRoute beleži skrbniška dejanja, dogodke preverjanja pristnosti, spremembe življenjskega cikla poverilnic ponudnikov in klice orodij MCP v revizijske tabele, podprte s SQLite. Ta stran opisuje, kaj se beleži, kje so podatki shranjeni, kako dolgo se hranijo, kako lahko ključi API onemogočijo beleženje in kako poizvedovati po podatkih.

Implementacija je v `src/lib/compliance/index.ts` (T-43 — »Nadzor skladnosti«) in `src/lib/compliance/providerAudit.ts`. Revizijski zapisi nikoli ne sprožijo izjeme: ob kakršni koli napaki je klic tiho prezrt, zato revizijsko beleženje ne more prekiniti glavnega toka zahteve.

## Kaj se beleži

### Skrbniški revizijski dogodki (`audit_log`)

Vsak klic `logAuditEvent({ action, actor, target, details, ... })` ustvari eno vrstico. Nizi dejanj sledijo vzorcu `domain.verb` (ali `domain.verb.outcome`). Potrjene vrste dejanj v izvornem drevesu vključujejo:

| Dejanje                              | Vir                                     |
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

Vsak vnos zajema `action`, `actor` (privzeto `"system"`), `target`, `details`/`metadata` (JSON), `ip_address`, `resource_type`, `status`, `request_id` in `timestamp`. Občutljivi ključi (`apiKey`, `accessToken`, `refreshToken`, `password`, vse, kar se ujema z `*token`/`*secret`/`*apikey`, itd.) se pred zapisom vrstice rekurzivno zakrijejo z `"[redacted]"`.

### Klici orodij MCP (`mcp_tool_audit`)

Vsak klic orodja MCP zapiše vrstico prek `open-sse/mcp-server/audit.ts`. Shema (iz `src/lib/db/migrations/002_mcp_a2a_tables.sql`):

| Stolpec          | Opombe                                |
| ---------------- | ------------------------------------- |
| `id`             | samodejno povečanje                   |
| `tool_name`      | identifikator orodja MCP              |
| `input_hash`     | sha256 vhoda (vsebina se ne shrani)   |
| `output_summary` | kratek, skrajšan povzetek             |
| `duration_ms`    | pretečeni čas                         |
| `api_key_id`     | klicatelj (lahko je ničelna vrednost) |
| `success`        | `1` / `0`                             |
| `error_code`     | končna koda napake ob neuspehu        |
| `created_at`     | časovni žig ISO                       |

### Dnevniki zahtev/uporabe

To so operativni telemetrijski podatki (in ne izključno skrbniška revizija), vendar uporabljajo isti postopek hrambe:

- `usage_history` — zbirni podatki o uporabi za posamezno zahtevo
- `call_logs` — celoten dnevniški zapis posamezne zahteve (velja omejitev števila vrstic, glejte spodaj)
- `proxy_logs` — dnevnik prometa posredniškega strežnika (velja omejitev števila vrstic)
- `request_detail_logs` — starejši podrobni dnevnik zahtev (še vedno se obrezuje, če je prisoten)

## Shema shranjevanja

Tabela `audit_log` se ob prvi uporabi ustvari po potrebi s funkcijo `ensureAuditLogSchema()`:

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

Indeksi se ustvarijo za stolpce `timestamp`, `action`, `actor`, `resource_type`,
`status` in `request_id`. Manjkajoči stolpci v starejših podatkovnih zbirkah se
po potrebi dodajo z ukazom `ALTER TABLE`.

## Hramba in čiščenje

Upoštevata se dve ločeni obdobji hrambe:

| Okoljska spremenljivka      | Privzeto | Velja za                                                          |
| --------------------------- | -------- | ----------------------------------------------------------------- |
| `APP_LOG_RETENTION_DAYS`    | `7`      | `audit_log`, `mcp_tool_audit`                                     |
| `CALL_LOG_RETENTION_DAYS`   | `7`      | `usage_history`, `call_logs`, `proxy_logs`, `request_detail_logs` |
| `CALL_LOGS_TABLE_MAX_ROWS`  | `100000` | Omejitev števila vrstic v `call_logs`                             |
| `PROXY_LOGS_TABLE_MAX_ROWS` | `100000` | Omejitev števila vrstic v `proxy_logs`                            |

Funkcija `cleanupExpiredLogs()` izvede čiščenje glede na obdobje hrambe. Ob
zagonu strežnika jo pokliče datoteka `src/instrumentation-node.ts`. Vsako
izvajanje zabeleži revizijski dogodek `compliance.cleanup` s številom izbrisanih
zapisov za posamezno tabelo. Obrezovanje dnevnikov posredniškega strežnika in
klicev poteka v paketih (`BATCH_SIZE = 5000`), da se preprečijo dolgotrajni
zaklepi za pisanje.

Ročno čiščenje zgodovine zahtev je ločeno od samodejnega čiščenja glede na
obdobje hrambe. Stran Dnevniki zahtev pokliče
`POST /api/settings/purge-request-history`, ki izbriše `call_logs`, starejšo
tabelo `request_detail_logs` in lokalne artefakte zahtev v
`${DATA_DIR}/call_logs/`.

Privzete vrednosti so določene v `src/lib/logEnv.ts`
(`DEFAULT_APP_LOG_RETENTION_DAYS = 7`, `DEFAULT_CALL_LOG_RETENTION_DAYS = 7`).

## Izključitev `noLog` (za posamezen ključ API)

Ključe API je mogoče označiti tako, da se promet njihovih nadaljnjih klicev ne
beleži. Oznaka je shranjena v tabeli `api_keys` (`no_log INTEGER DEFAULT 0`) in
se zrcali v množico v pomnilniku za hitre poizvedbe na kritični poti.

```bash
# Ustvarite ključ brez beleženja (zahtevano je skrbniško preverjanje pristnosti)
curl -X POST http://localhost:20128/api/keys \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"name": "Privacy key", "noLog": true}'
```

Pomožne funkcije (`src/lib/compliance/index.ts`):

- `setNoLog(apiKeyId, true|false)` — vklopi ali izklopi vnos v pomnilniku
- `isNoLog(apiKeyId)` — preveri se na poti zahteve; če vnos ni na voljo, uporabi
  predpomnjeno branje vrednosti `api_keys.no_log` z veljavnostjo 30 s
- `NO_LOG_API_KEY_IDS` (okoljska spremenljivka, vrednosti ločene z vejicami) —
  ob zagonu se vnaprej naloži v množico v pomnilniku; uporabno, kadar stolpca ne
  morete spreminjati neposredno

`noLog` **ne** vpliva na skrbniške revizijske dogodke (prijave, spremembe
ponudnikov, klice orodij MCP itd.) — izključiti je mogoče le beleženje prometa
posameznih zahtev.

## REST API

| Končna točka                | Metoda | Opis                                           | Avtentikacija |
| --------------------------- | ------ | ---------------------------------------------- | ------------- |
| `/api/compliance/audit-log` | `GET`  | Ostranjeni skrbniški revizijski vnosi s filtri | management    |
| `/api/mcp/audit`            | `GET`  | Ostranjeni revizijski vnosi orodij MCP         | (open-sse)    |
| `/api/mcp/audit/stats`      | `GET`  | Združeni statistični podatki revizije MCP      | (open-sse)    |

Končna točka za izvoz CSV trenutno ni vključena — podatke izvozite z nadzorne plošče ali pa neposredno poizvedujte po zbirki podatkov SQLite.

### Poizvedovanje po `/api/compliance/audit-log`

Podprti parametri poizvedbe (vsi so neobvezni, vsi besedilni filtri pa uporabljajo ujemanje `LIKE %value%`):

- `action`, `actor`, `target`, `resourceType` (ali `resource_type`),
  `status`, `requestId` (ali `request_id`)
- `from` / `since`, `to` / `until` — časovni žigi ISO
- `limit` (privzeto `50`, najmanj `1`, največ `500`)
- `offset` (privzeto `0`, največ `10_000`)

Odgovor je polje JSON. Metapodatki o ostranjevanju so vrnjeni v glavah:
`x-total-count`, `x-page-limit`, `x-page-offset`.

```bash
curl "http://localhost:20128/api/compliance/audit-log?action=provider.credentials&from=2026-05-01" \
  -H "Cookie: auth_token=..."
```

## Nadzorna plošča

Nadzorna plošča prikazuje revizijske podatke na naslovu **`/dashboard/audit`**
(`src/app/(dashboard)/dashboard/audit/page.tsx`). Stran ima dva zavihka:

- **Skladnost** (`ComplianceTab.tsx`) — skrbniški revizijski dogodki iz
  `/api/compliance/audit-log`. Filtriranje po vrsti dogodka, resnosti (informativno / opozorilo
  / kritično, izpeljano iz dejanja in stanja) ter časovnem obdobju. Resnost se
  izračuna na strani odjemalca iz nizov dejanja in stanja.
- **MCP** (`McpAuditTab.tsx`) — revizija orodij MCP iz `/api/mcp/audit` s
  filtri po imenu orodja in uspehu/neuspehu.

Oba zavihka uporabljata ostranjevanje z velikostjo strani `50` (skladnost) oziroma `25` (MCP).

## Pomožne funkcije za poverilnice ponudnikov

`src/lib/compliance/providerAudit.ts` zagotavlja pomožne funkcije za oblikovanje podatkov, ki jih
upravljavske poti ponudnikov uporabljajo pri oddajanju dogodkov poverilnic:

- `summarizeProviderConnectionForAudit(connection)` — odstrani `apiKey`,
  `accessToken`, `refreshToken`, `idToken` in
  `providerSpecificData.consoleApiKey`, preden se posnetek povezave zapiše v
  `details`.
- `getProviderAuditTarget(connection)` — sestavi stabilen niz
  `"<provider>:<name|id>"` za polje `target`.
- `extractProviderWarnings(...payloads)` — pregleda odgovore ponudnikov in poišče
  opozorila glede pravilnikov/varnosti (`[sanitizer]`, `prompt injection detected`,
  `content has been filtered`, `safety filter`, `policy violation`) ter
  izpostavi največ 5 zadetkov, pri čemer je vsak skrajšan na 400 znakov.

## Najboljše prakse

- Ključe API, ki obdelujejo osebno določljive podatke (pravne, zdravstvene itd.), označite z `noLog: true`.
- Nastavite `APP_LOG_RETENTION_DAYS` / `CALL_LOG_RETENTION_DAYS` skladno s svojo
  politiko hrambe. Privzeto 7-dnevno obdobje je konservativno.
- Revizijsko tabelo izvozite zunaj platforme (`sqlite3 dump`) tako pogosto,
  kot zahteva vaš program skladnosti — vgrajeno arhiviranje ne obstaja.
- Spremljajte število dogodkov `auth.login.failed` in `auth.login.locked` za
  odkrivanje napadov z grobo silo.
- Pri dodajanju novih skrbniških končnih točk pokličite `logAuditEvent({ ... })` s stabilnim
  nizom dejanja `domain.verb.outcome` ter posredujte kontekst zahteve prek
  `getAuditRequestContext(request)`, da se naslov IP in `requestId` zajameta
  samodejno.

## Glejte tudi

- [`docs/security/GUARDRAILS.md`](./GUARDRAILS.md) — maskiranje osebno določljivih podatkov (PII), vrivanje pozivov
- [`docs/frameworks/MCP-SERVER.md`](../frameworks/MCP-SERVER.md) — katalog orodij MCP in obsegi
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md) — celoten pregled spremenljivk okolja
- Izvorna koda: `src/lib/compliance/`, `src/app/api/compliance/`,
  `src/app/api/mcp/audit/`, `src/lib/logEnv.ts`
