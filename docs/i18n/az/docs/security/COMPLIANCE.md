# Compliance & Audit (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../security/COMPLIANCE.md) · 🇪🇹 [am](../../../am/docs/security/COMPLIANCE.md) · 🇸🇦 [ar](../../../ar/docs/security/COMPLIANCE.md) · 🇧🇬 [bg](../../../bg/docs/security/COMPLIANCE.md) · 🇧🇩 [bn](../../../bn/docs/security/COMPLIANCE.md) · 🇧🇦 [bs](../../../bs/docs/security/COMPLIANCE.md) · 🇨🇿 [cs](../../../cs/docs/security/COMPLIANCE.md) · 🇩🇰 [da](../../../da/docs/security/COMPLIANCE.md) · 🇩🇪 [de](../../../de/docs/security/COMPLIANCE.md) · 🇬🇷 [el](../../../el/docs/security/COMPLIANCE.md) · 🇪🇸 [es](../../../es/docs/security/COMPLIANCE.md) · 🇪🇪 [et](../../../et/docs/security/COMPLIANCE.md) · 🇮🇷 [fa](../../../fa/docs/security/COMPLIANCE.md) · 🇫🇮 [fi](../../../fi/docs/security/COMPLIANCE.md) · 🇫🇷 [fr](../../../fr/docs/security/COMPLIANCE.md) · 🇮🇪 [ga](../../../ga/docs/security/COMPLIANCE.md) · 🇮🇳 [gu](../../../gu/docs/security/COMPLIANCE.md) · 🇳🇬 [ha](../../../ha/docs/security/COMPLIANCE.md) · 🇮🇱 [he](../../../he/docs/security/COMPLIANCE.md) · 🇮🇳 [hi](../../../hi/docs/security/COMPLIANCE.md) · 🇭🇷 [hr](../../../hr/docs/security/COMPLIANCE.md) · 🇭🇺 [hu](../../../hu/docs/security/COMPLIANCE.md) · 🇦🇲 [hy](../../../hy/docs/security/COMPLIANCE.md) · 🇮🇩 [id](../../../id/docs/security/COMPLIANCE.md) · 🇳🇬 [ig](../../../ig/docs/security/COMPLIANCE.md) · 🇮🇹 [it](../../../it/docs/security/COMPLIANCE.md) · 🇯🇵 [ja](../../../ja/docs/security/COMPLIANCE.md) · 🇬🇪 [ka](../../../ka/docs/security/COMPLIANCE.md) · 🇰🇭 [km](../../../km/docs/security/COMPLIANCE.md) · 🇮🇳 [kn](../../../kn/docs/security/COMPLIANCE.md) · 🇰🇷 [ko](../../../ko/docs/security/COMPLIANCE.md) · 🇱🇹 [lt](../../../lt/docs/security/COMPLIANCE.md) · 🇱🇻 [lv](../../../lv/docs/security/COMPLIANCE.md) · 🇮🇳 [ml](../../../ml/docs/security/COMPLIANCE.md) · 🇮🇳 [mr](../../../mr/docs/security/COMPLIANCE.md) · 🇲🇾 [ms](../../../ms/docs/security/COMPLIANCE.md) · 🇲🇹 [mt](../../../mt/docs/security/COMPLIANCE.md) · 🇲🇲 [my](../../../my/docs/security/COMPLIANCE.md) · 🇳🇵 [ne](../../../ne/docs/security/COMPLIANCE.md) · 🇳🇱 [nl](../../../nl/docs/security/COMPLIANCE.md) · 🇳🇴 [no](../../../no/docs/security/COMPLIANCE.md) · 🇮🇳 [or](../../../or/docs/security/COMPLIANCE.md) · 🇮🇳 [pa](../../../pa/docs/security/COMPLIANCE.md) · 🇵🇭 [phi](../../../phi/docs/security/COMPLIANCE.md) · 🇵🇱 [pl](../../../pl/docs/security/COMPLIANCE.md) · 🇵🇹 [pt](../../../pt/docs/security/COMPLIANCE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/COMPLIANCE.md) · 🇷🇴 [ro](../../../ro/docs/security/COMPLIANCE.md) · 🇷🇺 [ru](../../../ru/docs/security/COMPLIANCE.md) · 🇱🇰 [si](../../../si/docs/security/COMPLIANCE.md) · 🇸🇰 [sk](../../../sk/docs/security/COMPLIANCE.md) · 🇸🇮 [sl](../../../sl/docs/security/COMPLIANCE.md) · 🇷🇸 [sr](../../../sr/docs/security/COMPLIANCE.md) · 🇸🇪 [sv](../../../sv/docs/security/COMPLIANCE.md) · 🇰🇪 [sw](../../../sw/docs/security/COMPLIANCE.md) · 🇮🇳 [ta](../../../ta/docs/security/COMPLIANCE.md) · 🇮🇳 [te](../../../te/docs/security/COMPLIANCE.md) · 🇹🇭 [th](../../../th/docs/security/COMPLIANCE.md) · 🇹🇷 [tr](../../../tr/docs/security/COMPLIANCE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/COMPLIANCE.md) · 🇵🇰 [ur](../../../ur/docs/security/COMPLIANCE.md) · 🇺🇿 [uz](../../../uz/docs/security/COMPLIANCE.md) · 🇻🇳 [vi](../../../vi/docs/security/COMPLIANCE.md) · 🇳🇬 [yo](../../../yo/docs/security/COMPLIANCE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/COMPLIANCE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/COMPLIANCE.md)

---

> **Həqiqət mənbəyi:** `src/lib/compliance/`, `src/app/api/compliance/`
> **Son yenilənmə:** 2026-06-28 — v3.8.40

OmniRoute inzibati əməliyyatları, autentifikasiya hadisələrini, provayder
etimadnamələrinin həyat dövrü dəyişikliklərini və MCP aləti çağırışlarını SQLite əsaslı audit
cədvəllərinə qeyd edir. Bu səhifədə nələrin jurnala yazıldığı, onların harada saxlandığı, nə qədər müddət
qorunduğu, API açarlarının bu qeydəalmadan necə imtina edə biləcəyi və verilənlərin necə sorğulana biləcəyi izah olunur.

İmplementasiya `src/lib/compliance/index.ts` (T-43 — "Uyğunluq
Nəzarətləri") və `src/lib/compliance/providerAudit.ts` fayllarında yerləşir. Audit yazıları heç vaxt xəta atmır:
hər hansı nasazlıq baş verdikdə çağırış səssizcə dayandırılır ki, audit jurnalına yazma
əsas sorğu axınını poza bilməsin.

## Nələr Jurnala Yazılır

### İnzibati audit hadisələri (`audit_log`)

`logAuditEvent({ action, actor, target, details, ... })` funksiyasına edilən hər çağırış
bir sətir yaradır. Əməliyyat sətirləri `domain.verb` (və ya `domain.verb.outcome`)
şablonuna uyğundur. Mənbə ağacında təsdiqlənmiş əməliyyat növlərinə aşağıdakılar daxildir:

| Əməliyyat                            | Mənbə                                   |
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

Hər qeyd `action`, `actor` (standart olaraq `"system"`), `target`,
`details`/`metadata` (JSON), `ip_address`, `resource_type`, `status`,
`request_id` və `timestamp` sahələrini əhatə edir. Həssas açarlar (`apiKey`, `accessToken`,
`refreshToken`, `password`, `*token`/`*secret`/`*apikey` şablonlarına uyğun gələn hər şey
və s.) sətir yazılmazdan əvvəl rekursiv şəkildə `"[redacted]"` ilə əvəzlənir.

### MCP aləti çağırışları (`mcp_tool_audit`)

Hər MCP aləti çağırışı
`open-sse/mcp-server/audit.ts` vasitəsilə bir sətir yazır. Sxem
(`src/lib/db/migrations/002_mcp_a2a_tables.sql` faylından):

| Sütun            | Qeydlər                                     |
| ---------------- | ------------------------------------------- |
| `id`             | avtomatik artım                             |
| `tool_name`      | MCP alət identifikatoru                     |
| `input_hash`     | girişin sha256 heşi (faydalı yük saxlanmır) |
| `output_summary` | qısa, ixtisar edilmiş xülasə                |
| `duration_ms`    | ümumi icra müddəti                          |
| `api_key_id`     | çağıran tərəf (null ola bilər)              |
| `success`        | `1` / `0`                                   |
| `error_code`     | uğursuzluq zamanı yekun xəta kodu           |
| `created_at`     | ISO zaman damğası                           |

### Sorğu / istifadə jurnalları

Bunlar əməliyyat telemetriyasıdır (ciddi mənada inzibati audit deyil), lakin eyni
saxlama müddəti konveyerindən istifadə edir:

- `usage_history` — hər sorğu üzrə ümumiləşdirilmiş istifadə məlumatı
- `call_logs` — hər sorğu üzrə tam jurnal (sətir limitinə tabedir, aşağıya baxın)
- `proxy_logs` — proksi trafiki jurnalı (sətir limitinə tabedir)
- `request_detail_logs` — köhnəlmiş təfərrüatlı sorğu jurnalı (mövcud olarsa, yenə də təmizlənir)

## Saxlama Sxemi

`audit_log` ilk istifadə zamanı `ensureAuditLogSchema()` tərəfindən təxirə salınmış şəkildə yaradılır:

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

İndekslər `timestamp`, `action`, `actor`, `resource_type`, `status` və `request_id` sütunları üzrə yaradılır. Köhnə verilənlər bazalarında çatışmayan sütunlar tələb olunduqda `ALTER TABLE` vasitəsilə əlavə edilir.

## Saxlanma Müddəti və Təmizləmə

İki ayrı saxlanma müddəti tətbiq olunur:

| Mühit dəyişəni              | Standart | Tətbiq olunduğu cədvəllər                                         |
| --------------------------- | -------- | ----------------------------------------------------------------- |
| `APP_LOG_RETENTION_DAYS`    | `7`      | `audit_log`, `mcp_tool_audit`                                     |
| `CALL_LOG_RETENTION_DAYS`   | `7`      | `usage_history`, `call_logs`, `proxy_logs`, `request_detail_logs` |
| `CALL_LOGS_TABLE_MAX_ROWS`  | `100000` | `call_logs` üçün sətir sayına əsaslanan ixtisar                   |
| `PROXY_LOGS_TABLE_MAX_ROWS` | `100000` | `proxy_logs` üçün sətir sayına əsaslanan ixtisar                  |

`cleanupExpiredLogs()` saxlanma müddətinə əsaslanan təmizləməni həyata keçirir. O, server işə salınarkən `src/instrumentation-node.ts` faylından çağırılır. Hər icra zamanı cədvəl üzrə silinən sətirlərin sayını ehtiva edən `compliance.cleanup` audit hadisəsi qeydə alınır. Uzunmüddətli yazma kilidlərinin qarşısını almaq üçün proksi/zəng jurnallarının ixtisarı paketlərlə (`BATCH_SIZE = 5000`) həyata keçirilir.

Sorğu tarixçəsinin əl ilə təmizlənməsi saxlanma müddətinə əsaslanan təmizləmədən ayrıdır. Request Logs səhifəsi `POST /api/settings/purge-request-history` sorğusunu göndərir; bu sorğu `call_logs`, köhnə `request_detail_logs` cədvəllərini və `${DATA_DIR}/call_logs/` daxilindəki lokal sorğu artefaktlarını silir.

Standart dəyərlər `src/lib/logEnv.ts` faylında müəyyən edilib (`DEFAULT_APP_LOG_RETENTION_DAYS = 7`, `DEFAULT_CALL_LOG_RETENTION_DAYS = 7`).

## `noLog` ilə İmtina (hər API açarı üzrə)

API açarları, onların aşağı axın zəng trafiki qeydə alınmayacaq şəkildə işarələnə bilər. Bu bayraq `api_keys` cədvəlində saxlanılır (`no_log INTEGER DEFAULT 0`) və sürətli icra yollarındakı axtarışlar üçün yaddaşdaxili çoxluqda əks etdirilir.

```bash
# Jurnallaşdırılmayan açar yaradın (idarəetmə autentifikasiyası tələb olunur)
curl -X POST http://localhost:20128/api/keys \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"name": "Privacy key", "noLog": true}'
```

Köməkçi funksiyalar (`src/lib/compliance/index.ts`):

- `setNoLog(apiKeyId, true|false)` — yaddaşdaxili qeydi aktiv və ya deaktiv edir
- `isNoLog(apiKeyId)` — sorğu emalı yolunda yoxlanılır; uyğun qeyd tapılmadıqda `api_keys.no_log` cədvəlindən 30 saniyəlik keşlənmiş oxumadan istifadə edir
- `NO_LOG_API_KEY_IDS` (mühit dəyişəni, vergüllə ayrılmış) — sistem işə salınarkən yaddaşdaxili çoxluğa əvvəlcədən yüklənir; sütunun dəyərini birbaşa dəyişə bilmədiyiniz hallarda faydalıdır

İnzibati audit hadisələri (giriş, provayder dəyişiklikləri, MCP alət çağırışları və s.) `noLog` parametrindən **təsirlənmir** — imtina yalnız hər sorğu üzrə trafik jurnalının aparılmasına aiddir.

## REST API

| Son nöqtə                   | Metod | Təsvir                                           | Avtorizasiya |
| --------------------------- | ----- | ------------------------------------------------ | ------------ |
| `/api/compliance/audit-log` | `GET` | Filtrlərlə səhifələnmiş inzibatçı audit qeydləri | idarəetmə    |
| `/api/mcp/audit`            | `GET` | Səhifələnmiş MCP aləti audit qeydləri            | (open-sse)   |
| `/api/mcp/audit/stats`      | `GET` | Ümumiləşdirilmiş MCP audit statistikası          | (open-sse)   |

Hazırda CSV ixracı üçün son nöqtə təqdim edilmir — idarəetmə panelindən ixrac edin və ya
birbaşa SQLite verilənlər bazasına sorğu göndərin.

### `/api/compliance/audit-log` sorğusu

Dəstəklənən sorğu parametrləri (hamısı istəyə bağlıdır, mətn filtrlərinin hamısı
`LIKE %value%` uyğunlaşdırmasından istifadə edir):

- `action`, `actor`, `target`, `resourceType` (və ya `resource_type`),
  `status`, `requestId` (və ya `request_id`)
- `from` / `since`, `to` / `until` — ISO zaman nişanları
- `limit` (standart `50`, minimum `1`, maksimum `500`)
- `offset` (standart `0`, maksimum `10_000`)

Cavab JSON massividir. Səhifələmə metadatası başlıqlarda qaytarılır:
`x-total-count`, `x-page-limit`, `x-page-offset`.

```bash
curl "http://localhost:20128/api/compliance/audit-log?action=provider.credentials&from=2026-05-01" \
  -H "Cookie: auth_token=..."
```

## İdarəetmə paneli

İdarəetmə paneli audit məlumatlarını **`/dashboard/audit`** ünvanında təqdim edir
(`src/app/(dashboard)/dashboard/audit/page.tsx`). Səhifədə iki tab var:

- **Uyğunluq** (`ComplianceTab.tsx`) — `/api/compliance/audit-log` mənbəyindən
  inzibatçı audit hadisələri. Hadisə növünə, ciddilik səviyyəsinə (məlumat / xəbərdarlıq
  / kritik, əməl + status əsasında müəyyən edilir) və tarix aralığına görə filtrləyir. Ciddilik səviyyəsi
  müştəri tərəfində əməl/status sətirlərindən hesablanır.
- **MCP** (`McpAuditTab.tsx`) — `/api/mcp/audit` mənbəyindən MCP aləti auditi;
  alət adına və uğurlu/uğursuz olmasına görə filtrlərlə.

Hər iki tab müvafiq olaraq `50` (uyğunluq) və `25` (MCP) səhifə ölçüləri ilə səhifələnir.

## Provayder etimadnaməsi üçün köməkçi funksiyalar

`src/lib/compliance/providerAudit.ts` provayder idarəetmə marşrutlarının
etimadnamə hadisələri yaratdığı zaman istifadə etdiyi formalaşdırma köməkçilərini təqdim edir:

- `summarizeProviderConnectionForAudit(connection)` — bağlantı şəklinin
  `details` sahəsinə yazılmasından əvvəl `apiKey`, `accessToken`, `refreshToken`, `idToken` və
  `providerSpecificData.consoleApiKey` məlumatlarını çıxarır.
- `getProviderAuditTarget(connection)` — `target` sahəsi üçün stabil
  `"<provider>:<name|id>"` sətri yaradır.
- `extractProviderWarnings(...payloads)` — provayder cavablarında
  siyasət/təhlükəsizlik xəbərdarlıqlarını (`[sanitizer]`, `prompt injection detected`,
  `content has been filtered`, `safety filter`, `policy violation`) axtarır və
  hər biri 400 simvoladək qısaldılmış maksimum 5 uyğunluğu təqdim edir.

## Ən yaxşı təcrübələr

- Şəxsi identifikasiya məlumatlarını (hüquqi, tibbi və s.) emal edən API açarlarını `noLog: true` ilə işarələyin.
- Saxlama siyasətinizə uyğun olması üçün `APP_LOG_RETENTION_DAYS` / `CALL_LOG_RETENTION_DAYS`
  dəyərlərini tənzimləyin. Standart 7 günlük müddət konservativdir.
- Uyğunluq proqramınızın tələb etdiyi tezlikdə audit cədvəlini platformadan kənara
  (`sqlite3 dump`) ixrac edin — daxili arxivləşdirmə mövcud deyil.
- Kobud güc hücumlarını aşkar etmək üçün `auth.login.failed` və `auth.login.locked`
  saylarını izləyin.
- Yeni inzibatçı son nöqtələri əlavə edərkən stabil `domain.verb.outcome`
  əməl sətri ilə `logAuditEvent({ ... })` funksiyasını çağırın və IP ilə `requestId`
  dəyərlərinin avtomatik qeydə alınması üçün sorğu kontekstini
  `getAuditRequestContext(request)` vasitəsilə ötürün.

## Həmçinin baxın

- [`docs/security/GUARDRAILS.md`](./GUARDRAILS.md) — PII maskalanması, prompt inyeksiyası
- [`docs/frameworks/MCP-SERVER.md`](../frameworks/MCP-SERVER.md) — MCP alət kataloqu və əhatə dairələri
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md) — mühit dəyişənləri üzrə tam arayış
- Mənbə: `src/lib/compliance/`, `src/app/api/compliance/`,
  `src/app/api/mcp/audit/`, `src/lib/logEnv.ts`
