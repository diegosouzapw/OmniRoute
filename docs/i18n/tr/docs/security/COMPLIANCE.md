# Compliance & Audit (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../security/COMPLIANCE.md) · 🇪🇹 [am](../../../am/docs/security/COMPLIANCE.md) · 🇸🇦 [ar](../../../ar/docs/security/COMPLIANCE.md) · 🇦🇿 [az](../../../az/docs/security/COMPLIANCE.md) · 🇧🇬 [bg](../../../bg/docs/security/COMPLIANCE.md) · 🇧🇩 [bn](../../../bn/docs/security/COMPLIANCE.md) · 🇨🇿 [cs](../../../cs/docs/security/COMPLIANCE.md) · 🇩🇰 [da](../../../da/docs/security/COMPLIANCE.md) · 🇩🇪 [de](../../../de/docs/security/COMPLIANCE.md) · 🇬🇷 [el](../../../el/docs/security/COMPLIANCE.md) · 🇪🇸 [es](../../../es/docs/security/COMPLIANCE.md) · 🇪🇪 [et](../../../et/docs/security/COMPLIANCE.md) · 🇮🇷 [fa](../../../fa/docs/security/COMPLIANCE.md) · 🇫🇮 [fi](../../../fi/docs/security/COMPLIANCE.md) · 🇫🇷 [fr](../../../fr/docs/security/COMPLIANCE.md) · 🇮🇪 [ga](../../../ga/docs/security/COMPLIANCE.md) · 🇮🇳 [gu](../../../gu/docs/security/COMPLIANCE.md) · 🇳🇬 [ha](../../../ha/docs/security/COMPLIANCE.md) · 🇮🇱 [he](../../../he/docs/security/COMPLIANCE.md) · 🇮🇳 [hi](../../../hi/docs/security/COMPLIANCE.md) · 🇭🇷 [hr](../../../hr/docs/security/COMPLIANCE.md) · 🇭🇺 [hu](../../../hu/docs/security/COMPLIANCE.md) · 🇦🇲 [hy](../../../hy/docs/security/COMPLIANCE.md) · 🇮🇩 [id](../../../id/docs/security/COMPLIANCE.md) · 🇳🇬 [ig](../../../ig/docs/security/COMPLIANCE.md) · 🇮🇹 [it](../../../it/docs/security/COMPLIANCE.md) · 🇯🇵 [ja](../../../ja/docs/security/COMPLIANCE.md) · 🇬🇪 [ka](../../../ka/docs/security/COMPLIANCE.md) · 🇰🇭 [km](../../../km/docs/security/COMPLIANCE.md) · 🇮🇳 [kn](../../../kn/docs/security/COMPLIANCE.md) · 🇰🇷 [ko](../../../ko/docs/security/COMPLIANCE.md) · 🇱🇹 [lt](../../../lt/docs/security/COMPLIANCE.md) · 🇱🇻 [lv](../../../lv/docs/security/COMPLIANCE.md) · 🇮🇳 [ml](../../../ml/docs/security/COMPLIANCE.md) · 🇮🇳 [mr](../../../mr/docs/security/COMPLIANCE.md) · 🇲🇾 [ms](../../../ms/docs/security/COMPLIANCE.md) · 🇲🇹 [mt](../../../mt/docs/security/COMPLIANCE.md) · 🇲🇲 [my](../../../my/docs/security/COMPLIANCE.md) · 🇳🇵 [ne](../../../ne/docs/security/COMPLIANCE.md) · 🇳🇱 [nl](../../../nl/docs/security/COMPLIANCE.md) · 🇳🇴 [no](../../../no/docs/security/COMPLIANCE.md) · 🇮🇳 [or](../../../or/docs/security/COMPLIANCE.md) · 🇮🇳 [pa](../../../pa/docs/security/COMPLIANCE.md) · 🇵🇭 [phi](../../../phi/docs/security/COMPLIANCE.md) · 🇵🇱 [pl](../../../pl/docs/security/COMPLIANCE.md) · 🇵🇹 [pt](../../../pt/docs/security/COMPLIANCE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/COMPLIANCE.md) · 🇷🇴 [ro](../../../ro/docs/security/COMPLIANCE.md) · 🇷🇺 [ru](../../../ru/docs/security/COMPLIANCE.md) · 🇱🇰 [si](../../../si/docs/security/COMPLIANCE.md) · 🇸🇰 [sk](../../../sk/docs/security/COMPLIANCE.md) · 🇸🇮 [sl](../../../sl/docs/security/COMPLIANCE.md) · 🇷🇸 [sr](../../../sr/docs/security/COMPLIANCE.md) · 🇸🇪 [sv](../../../sv/docs/security/COMPLIANCE.md) · 🇰🇪 [sw](../../../sw/docs/security/COMPLIANCE.md) · 🇮🇳 [ta](../../../ta/docs/security/COMPLIANCE.md) · 🇮🇳 [te](../../../te/docs/security/COMPLIANCE.md) · 🇹🇭 [th](../../../th/docs/security/COMPLIANCE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/COMPLIANCE.md) · 🇵🇰 [ur](../../../ur/docs/security/COMPLIANCE.md) · 🇺🇿 [uz](../../../uz/docs/security/COMPLIANCE.md) · 🇻🇳 [vi](../../../vi/docs/security/COMPLIANCE.md) · 🇳🇬 [yo](../../../yo/docs/security/COMPLIANCE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/COMPLIANCE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/COMPLIANCE.md)

---

> **Doğruluk kaynağı:** `src/lib/compliance/`, `src/app/api/compliance/`
> **Son güncelleme:** 2026-06-28 — v3.8.40

OmniRoute; yönetim işlemlerini, kimlik doğrulama olaylarını, sağlayıcı kimlik bilgilerinin yaşam döngüsündeki değişiklikleri ve MCP aracı çağrılarını SQLite destekli denetim tablolarına kaydeder. Bu sayfa; nelerin günlüğe kaydedildiğini, verilerin nerede tutulduğunu, ne kadar süreyle saklandığını, API anahtarlarının günlük kaydından nasıl hariç tutulabileceğini ve verilerin nasıl sorgulanacağını açıklar.

Uygulama `src/lib/compliance/index.ts` (T-43 — "Uyumluluk Denetimleri") ve `src/lib/compliance/providerAudit.ts` içinde yer alır. Denetim yazma işlemleri hiçbir zaman hata fırlatmaz: herhangi bir hata durumunda çağrı sessizce yutulur; böylece denetim günlüğü, ana istek akışını bozamaz.

## Günlüğe Kaydedilenler

### Yönetimsel denetim olayları (`audit_log`)

Her `logAuditEvent({ action, actor, target, details, ... })` çağrısı bir satır oluşturur. Eylem dizeleri `domain.verb` (veya `domain.verb.outcome`) kalıbını izler. Kaynak ağacında doğrulanmış eylem türleri şunlardır:

| Eylem                                | Kaynak                                  |
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

Her kayıt `action`, `actor` (varsayılan olarak `"system"`), `target`, `details`/`metadata` (JSON), `ip_address`, `resource_type`, `status`, `request_id` ve `timestamp` alanlarını içerir. Hassas anahtarlar (`apiKey`, `accessToken`, `refreshToken`, `password`, `*token`/`*secret`/`*apikey` ile eşleşen her şey vb.), satır yazılmadan önce özyinelemeli olarak `"[redacted]"` değeriyle sansürlenir.

### MCP aracı çağrıları (`mcp_tool_audit`)

Her MCP aracı çağrısı, `open-sse/mcp-server/audit.ts` üzerinden bir satır yazar. Şema (`src/lib/db/migrations/002_mcp_a2a_tables.sql` dosyasından):

| Sütun            | Notlar                                 |
| ---------------- | -------------------------------------- |
| `id`             | otomatik artan                         |
| `tool_name`      | MCP aracı tanımlayıcısı                |
| `input_hash`     | girdinin sha256 özeti (yük depolanmaz) |
| `output_summary` | kısa, kesilmiş özet                    |
| `duration_ms`    | geçen gerçek süre                      |
| `api_key_id`     | çağıran taraf (null olabilir)          |
| `success`        | `1` / `0`                              |
| `error_code`     | hata durumundaki nihai hata kodu       |
| `created_at`     | ISO zaman damgası                      |

### İstek / kullanım günlükleri

Bunlar operasyonel telemetri verileridir (tam anlamıyla yönetimsel denetim değildir), ancak aynı saklama işlem hattını paylaşırlar:

- `usage_history` — istek başına toplu kullanım
- `call_logs` — istek başına tam günlük (satır sınırına tabidir; aşağıya bakın)
- `proxy_logs` — proxy trafiği günlüğü (satır sınırına tabidir)
- `request_detail_logs` — eski ayrıntılı istek günlüğü (mevcutsa hâlâ budanır)

## Depolama Şeması

`audit_log`, ilk kullanımda `ensureAuditLogSchema()` tarafından gerektiğinde oluşturulur:

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

`timestamp`, `action`, `actor`, `resource_type`, `status` ve `request_id` üzerinde indeksler oluşturulur. Eski veritabanlarında eksik olan sütunlar, gerektiğinde `ALTER TABLE` aracılığıyla eklenir.

## Saklama ve Temizleme

İki ayrı saklama süresine uyulur:

| Ortam değişkeni             | Varsayılan | Uygulandığı yerler                                                |
| --------------------------- | ---------- | ----------------------------------------------------------------- |
| `APP_LOG_RETENTION_DAYS`    | `7`        | `audit_log`, `mcp_tool_audit`                                     |
| `CALL_LOG_RETENTION_DAYS`   | `7`        | `usage_history`, `call_logs`, `proxy_logs`, `request_detail_logs` |
| `CALL_LOGS_TABLE_MAX_ROWS`  | `100000`   | `call_logs` için satır sınırı budaması                            |
| `PROXY_LOGS_TABLE_MAX_ROWS` | `100000`   | `proxy_logs` için satır sınırı budaması                           |

`cleanupExpiredLogs()` saklama işlemini çalıştırır. Sunucu başlatılırken `src/instrumentation-node.ts` üzerinden çağrılır. Her çalıştırma, tablo başına silme sayılarını içeren bir `compliance.cleanup` denetim olayı kaydeder. Uzun süreli yazma kilitlerinden kaçınmak için proxy/çağrı günlüğü budama işlemi gruplar hâlinde (`BATCH_SIZE = 5000`) gerçekleştirilir.

Manuel istek geçmişi temizleme işlemi, saklama işleminden ayrıdır. Request Logs sayfası, `call_logs`, eski `request_detail_logs` kayıtlarını ve `${DATA_DIR}/call_logs/` altındaki yerel istek eserlerini silen `POST /api/settings/purge-request-history` uç noktasını çağırır.

Varsayılanlar `src/lib/logEnv.ts` içinde tanımlanmıştır (`DEFAULT_APP_LOG_RETENTION_DAYS = 7`, `DEFAULT_CALL_LOG_RETENTION_DAYS = 7`).

## `noLog` Kaydı Tutmama Seçeneği (API anahtarı başına)

API anahtarları, bunların aşağı akış çağrı trafiğinin günlüğe kaydedilmemesi için işaretlenebilir. Bu işaret `api_keys` tablosunda (`no_log INTEGER DEFAULT 0`) bulunur ve sık kullanılan kod yollarındaki aramalar için bellek içi bir kümeye yansıtılır.

```bash
# Günlük kaydı tutulmayan bir anahtar oluşturun (yönetim kimlik doğrulaması gereklidir)
curl -X POST http://localhost:20128/api/keys \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"name": "Privacy key", "noLog": true}'
```

Yardımcılar (`src/lib/compliance/index.ts`):

- `setNoLog(apiKeyId, true|false)` — bellek içi girdiyi etkinleştirir veya devre dışı bırakır
- `isNoLog(apiKeyId)` — istek yolunda kontrol edilir; sonuç bulunamazsa `api_keys.no_log` üzerinden 30 saniye önbelleğe alınan okumaya geri döner
- `NO_LOG_API_KEY_IDS` (ortam değişkeni, virgülle ayrılmış) — başlatma sırasında bellek içi kümeye önceden yüklenir; sütunu doğrudan değiştiremediğiniz durumlarda kullanışlıdır

Yönetimsel denetim olayları (oturum açma, sağlayıcı değişiklikleri, MCP araç çağrıları vb.) `noLog` ayarından **etkilenmez** — yalnızca istek başına trafik günlüğü kaydının tutulmaması sağlanır.

## REST API

| Uç Nokta                    | Yöntem | Açıklama                                                  | Kimlik Doğrulama |
| --------------------------- | ------ | --------------------------------------------------------- | ---------------- |
| `/api/compliance/audit-log` | `GET`  | Filtrelenmiş, sayfalandırılmış yönetici denetim kayıtları | yönetim          |
| `/api/mcp/audit`            | `GET`  | Sayfalandırılmış MCP aracı denetim kayıtları              | (open-sse)       |
| `/api/mcp/audit/stats`      | `GET`  | Toplu MCP denetim istatistikleri                          | (open-sse)       |

Şu anda herhangi bir CSV dışa aktarma uç noktası sunulmuyor — verileri kontrol panelinden dışa aktarın veya doğrudan SQLite veritabanını sorgulayın.

### `/api/compliance/audit-log` Sorgulama

Desteklenen sorgu parametreleri (tümü isteğe bağlıdır; metin filtrelerinin tümü `LIKE %value%` eşleştirmesini kullanır):

- `action`, `actor`, `target`, `resourceType` (veya `resource_type`),
  `status`, `requestId` (veya `request_id`)
- `from` / `since`, `to` / `until` — ISO zaman damgaları
- `limit` (varsayılan `50`, minimum `1`, maksimum `500`)
- `offset` (varsayılan `0`, maksimum `10_000`)

Yanıt bir JSON dizisidir. Sayfalandırma meta verileri üst bilgilerde döndürülür:
`x-total-count`, `x-page-limit`, `x-page-offset`.

```bash
curl "http://localhost:20128/api/compliance/audit-log?action=provider.credentials&from=2026-05-01" \
  -H "Cookie: auth_token=..."
```

## Kontrol Paneli

Kontrol paneli, denetim verilerini **`/dashboard/audit`**
(`src/app/(dashboard)/dashboard/audit/page.tsx`) konumunda sunar. Sayfada iki sekme bulunur:

- **Uyumluluk** (`ComplianceTab.tsx`) — `/api/compliance/audit-log` kaynağından gelen yönetici denetim olayları. Olay türüne, önem derecesine (bilgi / uyarı / kritik; eylem + durumdan türetilir) ve tarih aralığına göre filtreleme yapar. Önem derecesi, eylem/durum dizelerinden istemci tarafında hesaplanır.
- **MCP** (`McpAuditTab.tsx`) — `/api/mcp/audit` kaynağından gelen MCP aracı denetimi; araç adına ve başarı/başarısızlık durumuna göre filtreleme içerir.

Her iki sekme de sırasıyla `50` (uyumluluk) ve `25` (MCP) sayfa boyutlarıyla sayfalandırılır.

## Sağlayıcı Kimlik Bilgisi Yardımcıları

`src/lib/compliance/providerAudit.ts`, sağlayıcı yönetimi rotalarının kimlik bilgisi olayları oluştururken kullandığı biçimlendirme yardımcılarını sağlar:

- `summarizeProviderConnectionForAudit(connection)` — bağlantı anlık görüntüsü `details` alanına yazılmadan önce `apiKey`, `accessToken`, `refreshToken`, `idToken` ve `providerSpecificData.consoleApiKey` alanlarını kaldırır.
- `getProviderAuditTarget(connection)` — `target` alanı için kararlı bir `"<provider>:<name|id>"` dizesi oluşturur.
- `extractProviderWarnings(...payloads)` — sağlayıcı yanıtlarını politika/güvenlik uyarıları (`[sanitizer]`, `prompt injection detected`, `content has been filtered`, `safety filter`, `policy violation`) için tarar ve her biri 400 karakterle sınırlandırılmış en fazla 5 eşleşmeyi sunar.

## En İyi Uygulamalar

- Kişisel olarak tanımlanabilir bilgileri (hukuki, tıbbi vb.) işleyen API anahtarlarını `noLog: true` ile işaretleyin.
- Saklama politikanızı karşılamak için `APP_LOG_RETENTION_DAYS` / `CALL_LOG_RETENTION_DAYS` değerlerini ayarlayın. Varsayılan 7 günlük süreler ihtiyatlıdır.
- Uyumluluk programınızın gerektirdiği sıklıkta denetim tablosunu platform dışına (`sqlite3 dump`) aktarın — yerleşik arşivleme özelliği yoktur.
- Kaba kuvvet saldırılarını tespit etmek için `auth.login.failed` ve `auth.login.locked` sayılarını izleyin.
- Yeni yönetici uç noktaları eklerken kararlı bir `domain.verb.outcome` eylem dizesiyle `logAuditEvent({ ... })` çağrısını yapın ve IP ile `requestId` değerlerinin otomatik olarak yakalanması için istek bağlamını `getAuditRequestContext(request)` aracılığıyla iletin.

## Ayrıca Bakınız

- [`docs/security/GUARDRAILS.md`](./GUARDRAILS.md) — PII maskeleme, istem enjeksiyonu
- [`docs/frameworks/MCP-SERVER.md`](../frameworks/MCP-SERVER.md) — MCP araç kataloğu ve kapsamları
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md) — tam ortam değişkeni referansı
- Kaynak: `src/lib/compliance/`, `src/app/api/compliance/`,
  `src/app/api/mcp/audit/`, `src/lib/logEnv.ts`
