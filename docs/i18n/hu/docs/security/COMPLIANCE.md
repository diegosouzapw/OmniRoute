# Compliance & Audit (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../security/COMPLIANCE.md) · 🇪🇹 [am](../../../am/docs/security/COMPLIANCE.md) · 🇸🇦 [ar](../../../ar/docs/security/COMPLIANCE.md) · 🇦🇿 [az](../../../az/docs/security/COMPLIANCE.md) · 🇧🇬 [bg](../../../bg/docs/security/COMPLIANCE.md) · 🇧🇩 [bn](../../../bn/docs/security/COMPLIANCE.md) · 🇨🇿 [cs](../../../cs/docs/security/COMPLIANCE.md) · 🇩🇰 [da](../../../da/docs/security/COMPLIANCE.md) · 🇩🇪 [de](../../../de/docs/security/COMPLIANCE.md) · 🇬🇷 [el](../../../el/docs/security/COMPLIANCE.md) · 🇪🇸 [es](../../../es/docs/security/COMPLIANCE.md) · 🇪🇪 [et](../../../et/docs/security/COMPLIANCE.md) · 🇮🇷 [fa](../../../fa/docs/security/COMPLIANCE.md) · 🇫🇮 [fi](../../../fi/docs/security/COMPLIANCE.md) · 🇫🇷 [fr](../../../fr/docs/security/COMPLIANCE.md) · 🇮🇪 [ga](../../../ga/docs/security/COMPLIANCE.md) · 🇮🇳 [gu](../../../gu/docs/security/COMPLIANCE.md) · 🇳🇬 [ha](../../../ha/docs/security/COMPLIANCE.md) · 🇮🇱 [he](../../../he/docs/security/COMPLIANCE.md) · 🇮🇳 [hi](../../../hi/docs/security/COMPLIANCE.md) · 🇭🇷 [hr](../../../hr/docs/security/COMPLIANCE.md) · 🇦🇲 [hy](../../../hy/docs/security/COMPLIANCE.md) · 🇮🇩 [id](../../../id/docs/security/COMPLIANCE.md) · 🇳🇬 [ig](../../../ig/docs/security/COMPLIANCE.md) · 🇮🇹 [it](../../../it/docs/security/COMPLIANCE.md) · 🇯🇵 [ja](../../../ja/docs/security/COMPLIANCE.md) · 🇬🇪 [ka](../../../ka/docs/security/COMPLIANCE.md) · 🇰🇭 [km](../../../km/docs/security/COMPLIANCE.md) · 🇮🇳 [kn](../../../kn/docs/security/COMPLIANCE.md) · 🇰🇷 [ko](../../../ko/docs/security/COMPLIANCE.md) · 🇱🇹 [lt](../../../lt/docs/security/COMPLIANCE.md) · 🇱🇻 [lv](../../../lv/docs/security/COMPLIANCE.md) · 🇮🇳 [ml](../../../ml/docs/security/COMPLIANCE.md) · 🇮🇳 [mr](../../../mr/docs/security/COMPLIANCE.md) · 🇲🇾 [ms](../../../ms/docs/security/COMPLIANCE.md) · 🇲🇹 [mt](../../../mt/docs/security/COMPLIANCE.md) · 🇲🇲 [my](../../../my/docs/security/COMPLIANCE.md) · 🇳🇵 [ne](../../../ne/docs/security/COMPLIANCE.md) · 🇳🇱 [nl](../../../nl/docs/security/COMPLIANCE.md) · 🇳🇴 [no](../../../no/docs/security/COMPLIANCE.md) · 🇮🇳 [or](../../../or/docs/security/COMPLIANCE.md) · 🇮🇳 [pa](../../../pa/docs/security/COMPLIANCE.md) · 🇵🇭 [phi](../../../phi/docs/security/COMPLIANCE.md) · 🇵🇱 [pl](../../../pl/docs/security/COMPLIANCE.md) · 🇵🇹 [pt](../../../pt/docs/security/COMPLIANCE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/COMPLIANCE.md) · 🇷🇴 [ro](../../../ro/docs/security/COMPLIANCE.md) · 🇷🇺 [ru](../../../ru/docs/security/COMPLIANCE.md) · 🇱🇰 [si](../../../si/docs/security/COMPLIANCE.md) · 🇸🇰 [sk](../../../sk/docs/security/COMPLIANCE.md) · 🇸🇮 [sl](../../../sl/docs/security/COMPLIANCE.md) · 🇷🇸 [sr](../../../sr/docs/security/COMPLIANCE.md) · 🇸🇪 [sv](../../../sv/docs/security/COMPLIANCE.md) · 🇰🇪 [sw](../../../sw/docs/security/COMPLIANCE.md) · 🇮🇳 [ta](../../../ta/docs/security/COMPLIANCE.md) · 🇮🇳 [te](../../../te/docs/security/COMPLIANCE.md) · 🇹🇭 [th](../../../th/docs/security/COMPLIANCE.md) · 🇹🇷 [tr](../../../tr/docs/security/COMPLIANCE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/COMPLIANCE.md) · 🇵🇰 [ur](../../../ur/docs/security/COMPLIANCE.md) · 🇺🇿 [uz](../../../uz/docs/security/COMPLIANCE.md) · 🇻🇳 [vi](../../../vi/docs/security/COMPLIANCE.md) · 🇳🇬 [yo](../../../yo/docs/security/COMPLIANCE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/COMPLIANCE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/COMPLIANCE.md)

---

> **Hiteles forrás:** `src/lib/compliance/`, `src/app/api/compliance/`
> **Legutóbbi frissítés:** 2026-06-28 — v3.8.40

Az OmniRoute SQLite-alapú auditálási táblákban rögzíti az adminisztratív műveleteket, a hitelesítési eseményeket, a szolgáltatói hitelesítő adatok életciklusának változásait és az MCP-eszközök meghívásait. Ez az oldal bemutatja, hogy mi kerül naplózásra, hol találhatók az adatok, mennyi ideig őrzi meg őket a rendszer, hogyan tiltható le a naplózás API-kulcsonként, valamint hogyan kérdezhetők le az adatok.

A megvalósítás a `src/lib/compliance/index.ts` (T-43 — „Megfelelőségi
vezérlők”) és a `src/lib/compliance/providerAudit.ts` fájlokban található. Az auditbejegyzések írása soha nem dob kivételt: hiba esetén a rendszer csendben figyelmen kívül hagyja a hívást, így az auditnaplózás nem szakíthatja meg a fő kérésfeldolgozási folyamatot.

## Mi kerül naplózásra

### Adminisztratív auditesemények (`audit_log`)

A `logAuditEvent({ action, actor, target, details, ... })` minden egyes hívása
egy sort hoz létre. A műveleti karakterláncok a `domain.verb` (vagy `domain.verb.outcome`)
mintát követik. A forráskódban megerősített művelettípusok többek között:

| Művelet                              | Forrás                                  |
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

Minden bejegyzés rögzíti az `action`, `actor` (alapértelmezés szerint `"system"`), `target`,
`details`/`metadata` (JSON), `ip_address`, `resource_type`, `status`,
`request_id` és `timestamp` mezőket. Az érzékeny kulcsok (`apiKey`, `accessToken`,
`refreshToken`, `password`, valamint minden, a `*token`/`*secret`/`*apikey`
mintára illeszkedő kulcs stb.) rekurzívan `"[redacted]"` értékre cserélődnek a sor beírása előtt.

### MCP-eszközhívások (`mcp_tool_audit`)

Minden MCP-eszközmeghívás egy sort ír az
`open-sse/mcp-server/audit.ts` fájlon keresztül. A séma (a
`src/lib/db/migrations/002_mcp_a2a_tables.sql` alapján):

| Oszlop           | Megjegyzés                                        |
| ---------------- | ------------------------------------------------- |
| `id`             | automatikusan növekvő érték                       |
| `tool_name`      | MCP-eszközazonosító                               |
| `input_hash`     | a bemenet sha256 kivonata (a hasznos adat nélkül) |
| `output_summary` | rövid, csonkolt összefoglaló                      |
| `duration_ms`    | eltelt idő                                        |
| `api_key_id`     | hívó (lehet null)                                 |
| `success`        | `1` / `0`                                         |
| `error_code`     | sikertelenség esetén a végső hibakód              |
| `created_at`     | ISO-időbélyeg                                     |

### Kérés- és használati naplók

Ezek működési telemetriai adatok (nem szigorúan véve adminisztratív auditadatok), de ugyanazt a megőrzési folyamatot használják:

- `usage_history` — kérésenként összesített használati adatok
- `call_logs` — teljes, kérésenkénti napló (sorszámkorlátozással; lásd alább)
- `proxy_logs` — proxyforgalmi napló (sorszámkorlátozással)
- `request_detail_logs` — örökölt részletes kérésnapló (ha létezik, továbbra is ritkításra kerül)

## Tárolási séma

Az `audit_log` táblát az `ensureAuditLogSchema()` az első használatkor, késleltetetten hozza létre:

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

Indexek jönnek létre a `timestamp`, `action`, `actor`, `resource_type`,
`status` és `request_id` oszlopokon. A régebbi adatbázisokból hiányzó oszlopokat
szükség esetén az `ALTER TABLE` használatával adja hozzá a rendszer.

## Megőrzés és tisztítás

Két különálló megőrzési időszak van érvényben:

| Környezeti változó          | Alapértelmezés | Erre vonatkozik                                                   |
| --------------------------- | -------------- | ----------------------------------------------------------------- |
| `APP_LOG_RETENTION_DAYS`    | `7`            | `audit_log`, `mcp_tool_audit`                                     |
| `CALL_LOG_RETENTION_DAYS`   | `7`            | `usage_history`, `call_logs`, `proxy_logs`, `request_detail_logs` |
| `CALL_LOGS_TABLE_MAX_ROWS`  | `100000`       | Sorlimiten alapuló ritkítás a `call_logs` táblánál                |
| `PROXY_LOGS_TABLE_MAX_ROWS` | `100000`       | Sorlimiten alapuló ritkítás a `proxy_logs` táblánál               |

A megőrzési tisztítást a `cleanupExpiredLogs()` hajtja végre. A rendszer a
kiszolgáló indulásakor, a `src/instrumentation-node.ts` fájlból hívja meg.
Minden futtatás egy `compliance.cleanup` auditálási eseményt naplóz, amely
táblánként tartalmazza a törölt elemek számát. A proxy- és hívásnaplók ritkítása
kötegekben (`BATCH_SIZE = 5000`) történik a hosszú írási zárolások elkerülése
érdekében.

A kéréstörténet kézi tisztítása elkülönül a megőrzési folyamattól. A
Kérésnaplók oldal a `POST /api/settings/purge-request-history` végpontot hívja
meg, amely törli a `call_logs` táblát, a régi `request_detail_logs` táblát,
valamint a `${DATA_DIR}/call_logs/` alatt található helyi kérési
melléktermékeket.

Az alapértelmezések a `src/lib/logEnv.ts` fájlban vannak meghatározva
(`DEFAULT_APP_LOG_RETENTION_DAYS = 7`, `DEFAULT_CALL_LOG_RETENTION_DAYS = 7`).

## `noLog` naplózásletiltás (API-kulcsonként)

Az API-kulcsok megjelölhetők úgy, hogy a rendszer ne naplózza az általuk
indított továbbított hívások forgalmát. A jelző az `api_keys` táblában
található (`no_log INTEGER DEFAULT 0`), és a gyors elérés érdekében egy
memóriában tárolt halmazba is tükröződik.

```bash
# Naplózás nélküli kulcs létrehozása (kezelői hitelesítés szükséges)
curl -X POST http://localhost:20128/api/keys \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"name": "Privacy key", "noLog": true}'
```

Segédfüggvények (`src/lib/compliance/index.ts`):

- `setNoLog(apiKeyId, true|false)` — a memóriában tárolt bejegyzés be- vagy
  kikapcsolása
- `isNoLog(apiKeyId)` — a kérés feldolgozási útvonalán kerül ellenőrzésre;
  szükség esetén az `api_keys.no_log` értékének 30 másodpercig gyorsítótárazott
  kiolvasására tér át
- `NO_LOG_API_KEY_IDS` (környezeti változó, vesszővel elválasztva) — induláskor
  előre betöltődik a memóriában tárolt halmazba; akkor hasznos, ha az oszlop
  közvetlenül nem módosítható

Az adminisztratív auditálási eseményeket (bejelentkezés, szolgáltatói
módosítások, MCP-eszközhívások stb.) a `noLog` **nem** érinti — a letiltás
kizárólag a kérésenkénti forgalom naplózására vonatkozik.

## REST API

| Végpont                     | Metódus | Leírás                                               | Hitelesítés |
| --------------------------- | ------- | ---------------------------------------------------- | ----------- |
| `/api/compliance/audit-log` | `GET`   | Lapozható adminisztrátori auditbejegyzések szűrőkkel | management  |
| `/api/mcp/audit`            | `GET`   | Lapozható MCP-eszköz-auditbejegyzések                | (open-sse)  |
| `/api/mcp/audit/stats`      | `GET`   | Összesített MCP-auditstatisztikák                    | (open-sse)  |

Jelenleg nem áll rendelkezésre CSV-exportálási végpont — exportáljon az irányítópultról, vagy kérdezze le
közvetlenül az SQLite-adatbázist.

### A `/api/compliance/audit-log` lekérdezése

Támogatott lekérdezési paraméterek (mind opcionális; a szöveges szűrők mind
`LIKE %value%` szerinti egyezést használnak):

- `action`, `actor`, `target`, `resourceType` (vagy `resource_type`),
  `status`, `requestId` (vagy `request_id`)
- `from` / `since`, `to` / `until` — ISO-időbélyegek
- `limit` (alapértelmezett: `50`, minimum: `1`, maximum: `500`)
- `offset` (alapértelmezett: `0`, maximum: `10_000`)

A válasz egy JSON-tömb. A lapozási metaadatokat a fejlécek tartalmazzák:
`x-total-count`, `x-page-limit`, `x-page-offset`.

```bash
curl "http://localhost:20128/api/compliance/audit-log?action=provider.credentials&from=2026-05-01" \
  -H "Cookie: auth_token=..."
```

## Irányítópult

Az auditadatok az irányítópulton a **`/dashboard/audit`** oldalon érhetők el
(`src/app/(dashboard)/dashboard/audit/page.tsx`). Az oldal két lapot tartalmaz:

- **Megfelelőség** (`ComplianceTab.tsx`) — adminisztrátori auditesemények a
  `/api/compliance/audit-log` végpontról. Szűrés eseménytípus, súlyosság (információ / figyelmeztetés
  / kritikus, az action + status alapján származtatva) és dátumtartomány szerint. A súlyosságot
  a kliensoldal számítja ki az action/status karakterláncokból.
- **MCP** (`McpAuditTab.tsx`) — MCP-eszközaudit a `/api/mcp/audit` végpontról,
  eszköznév és sikeres/sikertelen állapot szerinti szűrőkkel.

Mindkét lap lapozást használ; az oldalméret `50` (megfelelőség), illetve `25` (MCP).

## Szolgáltatói hitelesítőadat-segédfüggvények

A `src/lib/compliance/providerAudit.ts` olyan adatátalakító segédfüggvényeket biztosít, amelyeket a
szolgáltatókezelési útvonalak használnak hitelesítőadat-események kibocsátásakor:

- `summarizeProviderConnectionForAudit(connection)` — eltávolítja az `apiKey`,
  `accessToken`, `refreshToken`, `idToken` és
  `providerSpecificData.consoleApiKey` mezőket, mielőtt a kapcsolat pillanatképe
  bekerülne a `details` mezőbe.
- `getProviderAuditTarget(connection)` — stabil
  `"<provider>:<name|id>"` karakterláncot állít össze a `target` mező számára.
- `extractProviderWarnings(...payloads)` — átvizsgálja a szolgáltatói válaszokat
  szabályzati/biztonsági figyelmeztetések (`[sanitizer]`, `prompt injection detected`,
  `content has been filtered`, `safety filter`, `policy violation`) után, és
  legfeljebb 5 találatot ad vissza, mindegyiket 400 karakterre csonkolva.

## Bevált gyakorlatok

- A személyazonosításra alkalmas adatokat (jogi, egészségügyi stb.) kezelő API-kulcsokat jelölje meg `noLog: true` értékkel.
- Állítsa be az `APP_LOG_RETENTION_DAYS` / `CALL_LOG_RETENTION_DAYS` értékét a
  megőrzési szabályzatnak megfelelően. Az alapértelmezett 7 nap konzervatív beállítás.
- Exportálja az audittáblát a platformon kívülre (`sqlite3 dump`) a megfelelőségi
  program által előírt gyakorisággal — beépített archiválás nem áll rendelkezésre.
- Kövesse nyomon az `auth.login.failed` és `auth.login.locked` események számát a nyers erővel végrehajtott
  támadások észleléséhez.
- Új adminisztrátori végpontok hozzáadásakor hívja meg a `logAuditEvent({ ... })` függvényt egy stabil
  `domain.verb.outcome` műveleti karakterlánccal, és adja át a kérés kontextusát a
  `getAuditRequestContext(request)` segítségével, hogy az IP-cím és a `requestId`
  automatikusan rögzítésre kerüljön.

## Lásd még

- [`docs/security/GUARDRAILS.md`](./GUARDRAILS.md) — személyazonosításra alkalmas adatok maszkolása, promptinjektálás
- [`docs/frameworks/MCP-SERVER.md`](../frameworks/MCP-SERVER.md) — MCP-eszközkatalógus és hatókörök
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md) — környezeti változók teljes körű referenciája
- Forrás: `src/lib/compliance/`, `src/app/api/compliance/`,
  `src/app/api/mcp/audit/`, `src/lib/logEnv.ts`
