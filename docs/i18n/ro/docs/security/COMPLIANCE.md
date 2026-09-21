# Compliance & Audit (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../security/COMPLIANCE.md) · 🇪🇹 [am](../../../am/docs/security/COMPLIANCE.md) · 🇸🇦 [ar](../../../ar/docs/security/COMPLIANCE.md) · 🇦🇿 [az](../../../az/docs/security/COMPLIANCE.md) · 🇧🇬 [bg](../../../bg/docs/security/COMPLIANCE.md) · 🇧🇩 [bn](../../../bn/docs/security/COMPLIANCE.md) · 🇨🇿 [cs](../../../cs/docs/security/COMPLIANCE.md) · 🇩🇰 [da](../../../da/docs/security/COMPLIANCE.md) · 🇩🇪 [de](../../../de/docs/security/COMPLIANCE.md) · 🇬🇷 [el](../../../el/docs/security/COMPLIANCE.md) · 🇪🇸 [es](../../../es/docs/security/COMPLIANCE.md) · 🇪🇪 [et](../../../et/docs/security/COMPLIANCE.md) · 🇮🇷 [fa](../../../fa/docs/security/COMPLIANCE.md) · 🇫🇮 [fi](../../../fi/docs/security/COMPLIANCE.md) · 🇫🇷 [fr](../../../fr/docs/security/COMPLIANCE.md) · 🇮🇪 [ga](../../../ga/docs/security/COMPLIANCE.md) · 🇮🇳 [gu](../../../gu/docs/security/COMPLIANCE.md) · 🇳🇬 [ha](../../../ha/docs/security/COMPLIANCE.md) · 🇮🇱 [he](../../../he/docs/security/COMPLIANCE.md) · 🇮🇳 [hi](../../../hi/docs/security/COMPLIANCE.md) · 🇭🇷 [hr](../../../hr/docs/security/COMPLIANCE.md) · 🇭🇺 [hu](../../../hu/docs/security/COMPLIANCE.md) · 🇦🇲 [hy](../../../hy/docs/security/COMPLIANCE.md) · 🇮🇩 [id](../../../id/docs/security/COMPLIANCE.md) · 🇳🇬 [ig](../../../ig/docs/security/COMPLIANCE.md) · 🇮🇹 [it](../../../it/docs/security/COMPLIANCE.md) · 🇯🇵 [ja](../../../ja/docs/security/COMPLIANCE.md) · 🇬🇪 [ka](../../../ka/docs/security/COMPLIANCE.md) · 🇰🇭 [km](../../../km/docs/security/COMPLIANCE.md) · 🇮🇳 [kn](../../../kn/docs/security/COMPLIANCE.md) · 🇰🇷 [ko](../../../ko/docs/security/COMPLIANCE.md) · 🇱🇹 [lt](../../../lt/docs/security/COMPLIANCE.md) · 🇱🇻 [lv](../../../lv/docs/security/COMPLIANCE.md) · 🇮🇳 [ml](../../../ml/docs/security/COMPLIANCE.md) · 🇮🇳 [mr](../../../mr/docs/security/COMPLIANCE.md) · 🇲🇾 [ms](../../../ms/docs/security/COMPLIANCE.md) · 🇲🇹 [mt](../../../mt/docs/security/COMPLIANCE.md) · 🇲🇲 [my](../../../my/docs/security/COMPLIANCE.md) · 🇳🇵 [ne](../../../ne/docs/security/COMPLIANCE.md) · 🇳🇱 [nl](../../../nl/docs/security/COMPLIANCE.md) · 🇳🇴 [no](../../../no/docs/security/COMPLIANCE.md) · 🇮🇳 [or](../../../or/docs/security/COMPLIANCE.md) · 🇮🇳 [pa](../../../pa/docs/security/COMPLIANCE.md) · 🇵🇭 [phi](../../../phi/docs/security/COMPLIANCE.md) · 🇵🇱 [pl](../../../pl/docs/security/COMPLIANCE.md) · 🇵🇹 [pt](../../../pt/docs/security/COMPLIANCE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/COMPLIANCE.md) · 🇷🇺 [ru](../../../ru/docs/security/COMPLIANCE.md) · 🇱🇰 [si](../../../si/docs/security/COMPLIANCE.md) · 🇸🇰 [sk](../../../sk/docs/security/COMPLIANCE.md) · 🇸🇮 [sl](../../../sl/docs/security/COMPLIANCE.md) · 🇷🇸 [sr](../../../sr/docs/security/COMPLIANCE.md) · 🇸🇪 [sv](../../../sv/docs/security/COMPLIANCE.md) · 🇰🇪 [sw](../../../sw/docs/security/COMPLIANCE.md) · 🇮🇳 [ta](../../../ta/docs/security/COMPLIANCE.md) · 🇮🇳 [te](../../../te/docs/security/COMPLIANCE.md) · 🇹🇭 [th](../../../th/docs/security/COMPLIANCE.md) · 🇹🇷 [tr](../../../tr/docs/security/COMPLIANCE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/COMPLIANCE.md) · 🇵🇰 [ur](../../../ur/docs/security/COMPLIANCE.md) · 🇺🇿 [uz](../../../uz/docs/security/COMPLIANCE.md) · 🇻🇳 [vi](../../../vi/docs/security/COMPLIANCE.md) · 🇳🇬 [yo](../../../yo/docs/security/COMPLIANCE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/COMPLIANCE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/COMPLIANCE.md)

---

> **Sursa de referință:** `src/lib/compliance/`, `src/app/api/compliance/`
> **Ultima actualizare:** 2026-06-28 — v3.8.40

OmniRoute înregistrează acțiunile administrative, evenimentele de autentificare, modificările ciclului de viață al credențialelor furnizorilor și invocările instrumentelor MCP în tabele de audit susținute de SQLite. Această pagină prezintă ce se înregistrează, unde sunt stocate datele, cât timp sunt păstrate, cum pot cheile API să dezactiveze înregistrarea și cum pot fi interogate datele.

Implementarea se află în `src/lib/compliance/index.ts` (T-43 — „Controale de conformitate”) și `src/lib/compliance/providerAudit.ts`. Operațiunile de scriere în jurnalul de audit nu generează niciodată excepții: în cazul oricărei erori, apelul este ignorat în mod silențios, astfel încât jurnalizarea de audit să nu poată întrerupe fluxul principal al cererii.

## Ce se înregistrează

### Evenimente de audit administrativ (`audit_log`)

Fiecare apel către `logAuditEvent({ action, actor, target, details, ... })` produce un rând. Șirurile de acțiuni urmează un model `domain.verb` (sau `domain.verb.outcome`). Tipurile de acțiuni confirmate în arborele sursă includ:

| Acțiune                              | Sursă                                   |
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

Fiecare intrare înregistrează `action`, `actor` (valoarea implicită este `"system"`), `target`, `details`/`metadata` (JSON), `ip_address`, `resource_type`, `status`, `request_id` și `timestamp`. Cheile sensibile (`apiKey`, `accessToken`, `refreshToken`, `password`, orice corespunde modelelor `*token`/`*secret`/`*apikey` etc.) sunt redactate recursiv ca `"[redacted]"` înainte ca rândul să fie scris.

### Apeluri ale instrumentelor MCP (`mcp_tool_audit`)

Fiecare invocare a unui instrument MCP scrie un rând prin `open-sse/mcp-server/audit.ts`. Schema (din `src/lib/db/migrations/002_mcp_a2a_tables.sql`):

| Coloană          | Note                                                         |
| ---------------- | ------------------------------------------------------------ |
| `id`             | incrementare automată                                        |
| `tool_name`      | identificatorul instrumentului MCP                           |
| `input_hash`     | sha256 al datelor de intrare (sarcina utilă nu este stocată) |
| `output_summary` | rezumat scurt, trunchiat                                     |
| `duration_ms`    | timp scurs                                                   |
| `api_key_id`     | apelantul (poate fi nul)                                     |
| `success`        | `1` / `0`                                                    |
| `error_code`     | codul erorii terminale în caz de eșec                        |
| `created_at`     | marcaj temporal ISO                                          |

### Jurnale de cereri/utilizare

Acestea reprezintă telemetrie operațională (nu strict audit administrativ), dar folosesc același mecanism de retenție:

- `usage_history` — agregarea utilizării pentru fiecare cerere
- `call_logs` — jurnal complet pentru fiecare cerere (supus unei limite de rânduri; consultați mai jos)
- `proxy_logs` — jurnalul traficului proxy (supus unei limite de rânduri)
- `request_detail_logs` — jurnal detaliat moștenit al cererilor (este în continuare curățat dacă există)

## Schema de stocare

`audit_log` este creat în mod întârziat de `ensureAuditLogSchema()` la prima utilizare:

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

Sunt creați indecși pentru `timestamp`, `action`, `actor`, `resource_type`,
`status` și `request_id`. Coloanele lipsă din bazele de date vechi sunt adăugate
la nevoie prin `ALTER TABLE`.

## Păstrare și curățare

Sunt respectate două perioade de păstrare distincte:

| Variabilă de mediu          | Valoare implicită | Se aplică pentru                                                  |
| --------------------------- | ----------------- | ----------------------------------------------------------------- |
| `APP_LOG_RETENTION_DAYS`    | `7`               | `audit_log`, `mcp_tool_audit`                                     |
| `CALL_LOG_RETENTION_DAYS`   | `7`               | `usage_history`, `call_logs`, `proxy_logs`, `request_detail_logs` |
| `CALL_LOGS_TABLE_MAX_ROWS`  | `100000`          | Limitarea numărului de rânduri pentru `call_logs`                 |
| `PROXY_LOGS_TABLE_MAX_ROWS` | `100000`          | Limitarea numărului de rânduri pentru `proxy_logs`                |

`cleanupExpiredLogs()` execută procesul de aplicare a perioadei de păstrare. Este apelată la pornirea serverului
din `src/instrumentation-node.ts`. Fiecare execuție înregistrează un eveniment de audit
`compliance.cleanup` cu numărul de ștergeri pentru fiecare tabel. Reducerea jurnalelor proxy/apeluri
se face în loturi (`BATCH_SIZE = 5000`) pentru a evita blocările îndelungate la scriere.

Curățarea manuală a istoricului solicitărilor este separată de procesul de păstrare. Pagina Jurnale de solicitări
apelează `POST /api/settings/purge-request-history`, care șterge `call_logs`,
vechiul tabel `request_detail_logs` și artefactele locale ale solicitărilor din
`${DATA_DIR}/call_logs/`.

Valorile implicite sunt definite în `src/lib/logEnv.ts`
(`DEFAULT_APP_LOG_RETENTION_DAYS = 7`, `DEFAULT_CALL_LOG_RETENTION_DAYS = 7`).

## Dezactivarea jurnalizării prin `noLog` (pentru fiecare cheie API)

Cheile API pot fi marcate astfel încât traficul apelurilor lor ulterioare să nu fie jurnalizat. Indicatorul
se află în tabelul `api_keys` (`no_log INTEGER DEFAULT 0`) și este oglindit
într-un set din memorie pentru căutări rapide pe traseul critic.

```bash
# Creați o cheie fără jurnalizare (este necesară autentificarea pentru administrare)
curl -X POST http://localhost:20128/api/keys \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"name": "Privacy key", "noLog": true}'
```

Funcții auxiliare (`src/lib/compliance/index.ts`):

- `setNoLog(apiKeyId, true|false)` — activează sau dezactivează intrarea din memorie
- `isNoLog(apiKeyId)` — verificată pe traseul solicitării; în caz contrar, utilizează o citire
  din `api_keys.no_log` memorată în cache timp de 30 s
- `NO_LOG_API_KEY_IDS` (variabilă de mediu, valori separate prin virgulă) — preîncărcate în setul din memorie
  la pornire; utilă atunci când nu puteți modifica direct coloana

Evenimentele administrative de audit (autentificări, modificări ale furnizorilor, apeluri ale instrumentelor MCP etc.)
**nu** sunt afectate de `noLog` — opțiunea dezactivează numai jurnalizarea traficului
pentru fiecare solicitare.

## API REST

| Endpoint                    | Metodă | Descriere                                               | Autentificare |
| --------------------------- | ------ | ------------------------------------------------------- | ------------- |
| `/api/compliance/audit-log` | `GET`  | Înregistrări paginate de audit administrativ, cu filtre | management    |
| `/api/mcp/audit`            | `GET`  | Înregistrări paginate de audit al instrumentelor MCP    | (open-sse)    |
| `/api/mcp/audit/stats`      | `GET`  | Statistici agregate de audit MCP                        | (open-sse)    |

În prezent, nu este furnizat niciun endpoint pentru export CSV — exportați din panoul de control sau interogați
direct baza de date SQLite.

### Interogarea `/api/compliance/audit-log`

Parametri de interogare acceptați (toți sunt opționali, iar filtrele de text folosesc
potrivirea `LIKE %value%`):

- `action`, `actor`, `target`, `resourceType` (sau `resource_type`),
  `status`, `requestId` (sau `request_id`)
- `from` / `since`, `to` / `until` — marcaje temporale ISO
- `limit` (implicit `50`, minim `1`, maxim `500`)
- `offset` (implicit `0`, maxim `10_000`)

Răspunsul este un tablou JSON. Metadatele de paginare sunt returnate în antete:
`x-total-count`, `x-page-limit`, `x-page-offset`.

```bash
curl "http://localhost:20128/api/compliance/audit-log?action=provider.credentials&from=2026-05-01" \
  -H "Cookie: auth_token=..."
```

## Panou de control

Panoul de control expune datele de audit la **`/dashboard/audit`**
(`src/app/(dashboard)/dashboard/audit/page.tsx`). Pagina are două file:

- **Conformitate** (`ComplianceTab.tsx`) — evenimente de audit administrativ de la
  `/api/compliance/audit-log`. Filtrează după tipul evenimentului, severitate (informativă / avertizare
  / critică, derivată din acțiune + stare) și interval de date. Severitatea este
  calculată în partea de client pe baza șirurilor de acțiune/stare.
- **MCP** (`McpAuditTab.tsx`) — auditul instrumentelor MCP de la `/api/mcp/audit`, cu
  filtre după numele instrumentului și succes/eșec.

Ambele file folosesc paginarea, cu dimensiuni ale paginii de `50` (conformitate) și `25` (MCP).

## Funcții auxiliare pentru acreditările furnizorilor

`src/lib/compliance/providerAudit.ts` furnizează funcții auxiliare de structurare utilizate de rutele de
gestionare a furnizorilor atunci când acestea emit evenimente privind acreditările:

- `summarizeProviderConnectionForAudit(connection)` — elimină `apiKey`,
  `accessToken`, `refreshToken`, `idToken` și
  `providerSpecificData.consoleApiKey` înainte ca instantaneul conexiunii să fie
  scris în `details`.
- `getProviderAuditTarget(connection)` — compune un șir stabil
  `"<provider>:<name|id>"` pentru câmpul `target`.
- `extractProviderWarnings(...payloads)` — scanează răspunsurile furnizorilor pentru
  avertismente privind politicile/siguranța (`[sanitizer]`, `prompt injection detected`,
  `content has been filtered`, `safety filter`, `policy violation`) și
  returnează cel mult 5 rezultate, fiecare trunchiat la 400 de caractere.

## Bune practici

- Marcați cheile API care gestionează date cu caracter personal (juridice, medicale etc.) cu `noLog: true`.
- Ajustați `APP_LOG_RETENTION_DAYS` / `CALL_LOG_RETENTION_DAYS` pentru a respecta
  politica dvs. de păstrare. Valorile implicite de 7 zile sunt conservatoare.
- Exportați tabelul de audit în afara platformei (`sqlite3 dump`) cu frecvența
  impusă de programul dvs. de conformitate — nu există nicio funcționalitate de arhivare încorporată.
- Monitorizați numărul de evenimente `auth.login.failed` și `auth.login.locked` pentru
  detectarea atacurilor prin forță brută.
- Când adăugați endpointuri administrative noi, apelați `logAuditEvent({ ... })` cu un șir de acțiune stabil
  `domain.verb.outcome` și transmiteți contextul cererii prin
  `getAuditRequestContext(request)`, astfel încât adresa IP și `requestId` să fie capturate
  automat.

## Consultați și

- [`docs/security/GUARDRAILS.md`](./GUARDRAILS.md) — mascarea PII, injectarea prompturilor
- [`docs/frameworks/MCP-SERVER.md`](../frameworks/MCP-SERVER.md) — catalogul instrumentelor MCP și domeniile de aplicare
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md) — referința completă a variabilelor de mediu
- Sursă: `src/lib/compliance/`, `src/app/api/compliance/`,
  `src/app/api/mcp/audit/`, `src/lib/logEnv.ts`
