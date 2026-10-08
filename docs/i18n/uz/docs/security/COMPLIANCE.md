# Compliance & Audit (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../security/COMPLIANCE.md) · 🇪🇹 [am](../../../am/docs/security/COMPLIANCE.md) · 🇸🇦 [ar](../../../ar/docs/security/COMPLIANCE.md) · 🇦🇿 [az](../../../az/docs/security/COMPLIANCE.md) · 🇧🇬 [bg](../../../bg/docs/security/COMPLIANCE.md) · 🇧🇩 [bn](../../../bn/docs/security/COMPLIANCE.md) · 🇧🇦 [bs](../../../bs/docs/security/COMPLIANCE.md) · 🇨🇿 [cs](../../../cs/docs/security/COMPLIANCE.md) · 🇩🇰 [da](../../../da/docs/security/COMPLIANCE.md) · 🇩🇪 [de](../../../de/docs/security/COMPLIANCE.md) · 🇬🇷 [el](../../../el/docs/security/COMPLIANCE.md) · 🇪🇸 [es](../../../es/docs/security/COMPLIANCE.md) · 🇪🇪 [et](../../../et/docs/security/COMPLIANCE.md) · 🇮🇷 [fa](../../../fa/docs/security/COMPLIANCE.md) · 🇫🇮 [fi](../../../fi/docs/security/COMPLIANCE.md) · 🇫🇷 [fr](../../../fr/docs/security/COMPLIANCE.md) · 🇮🇪 [ga](../../../ga/docs/security/COMPLIANCE.md) · 🇮🇳 [gu](../../../gu/docs/security/COMPLIANCE.md) · 🇳🇬 [ha](../../../ha/docs/security/COMPLIANCE.md) · 🇮🇱 [he](../../../he/docs/security/COMPLIANCE.md) · 🇮🇳 [hi](../../../hi/docs/security/COMPLIANCE.md) · 🇭🇷 [hr](../../../hr/docs/security/COMPLIANCE.md) · 🇭🇺 [hu](../../../hu/docs/security/COMPLIANCE.md) · 🇦🇲 [hy](../../../hy/docs/security/COMPLIANCE.md) · 🇮🇩 [id](../../../id/docs/security/COMPLIANCE.md) · 🇳🇬 [ig](../../../ig/docs/security/COMPLIANCE.md) · 🇮🇹 [it](../../../it/docs/security/COMPLIANCE.md) · 🇯🇵 [ja](../../../ja/docs/security/COMPLIANCE.md) · 🇬🇪 [ka](../../../ka/docs/security/COMPLIANCE.md) · 🇰🇭 [km](../../../km/docs/security/COMPLIANCE.md) · 🇮🇳 [kn](../../../kn/docs/security/COMPLIANCE.md) · 🇰🇷 [ko](../../../ko/docs/security/COMPLIANCE.md) · 🇱🇹 [lt](../../../lt/docs/security/COMPLIANCE.md) · 🇱🇻 [lv](../../../lv/docs/security/COMPLIANCE.md) · 🇮🇳 [ml](../../../ml/docs/security/COMPLIANCE.md) · 🇮🇳 [mr](../../../mr/docs/security/COMPLIANCE.md) · 🇲🇾 [ms](../../../ms/docs/security/COMPLIANCE.md) · 🇲🇹 [mt](../../../mt/docs/security/COMPLIANCE.md) · 🇲🇲 [my](../../../my/docs/security/COMPLIANCE.md) · 🇳🇵 [ne](../../../ne/docs/security/COMPLIANCE.md) · 🇳🇱 [nl](../../../nl/docs/security/COMPLIANCE.md) · 🇳🇴 [no](../../../no/docs/security/COMPLIANCE.md) · 🇮🇳 [or](../../../or/docs/security/COMPLIANCE.md) · 🇮🇳 [pa](../../../pa/docs/security/COMPLIANCE.md) · 🇵🇭 [phi](../../../phi/docs/security/COMPLIANCE.md) · 🇵🇱 [pl](../../../pl/docs/security/COMPLIANCE.md) · 🇵🇹 [pt](../../../pt/docs/security/COMPLIANCE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/COMPLIANCE.md) · 🇷🇴 [ro](../../../ro/docs/security/COMPLIANCE.md) · 🇷🇺 [ru](../../../ru/docs/security/COMPLIANCE.md) · 🇱🇰 [si](../../../si/docs/security/COMPLIANCE.md) · 🇸🇰 [sk](../../../sk/docs/security/COMPLIANCE.md) · 🇸🇮 [sl](../../../sl/docs/security/COMPLIANCE.md) · 🇷🇸 [sr](../../../sr/docs/security/COMPLIANCE.md) · 🇸🇪 [sv](../../../sv/docs/security/COMPLIANCE.md) · 🇰🇪 [sw](../../../sw/docs/security/COMPLIANCE.md) · 🇮🇳 [ta](../../../ta/docs/security/COMPLIANCE.md) · 🇮🇳 [te](../../../te/docs/security/COMPLIANCE.md) · 🇹🇭 [th](../../../th/docs/security/COMPLIANCE.md) · 🇹🇷 [tr](../../../tr/docs/security/COMPLIANCE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/COMPLIANCE.md) · 🇵🇰 [ur](../../../ur/docs/security/COMPLIANCE.md) · 🇻🇳 [vi](../../../vi/docs/security/COMPLIANCE.md) · 🇳🇬 [yo](../../../yo/docs/security/COMPLIANCE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/COMPLIANCE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/COMPLIANCE.md)

---

> **Haqiqiy manba:** `src/lib/compliance/`, `src/app/api/compliance/`
> **Oxirgi yangilanish:** 2026-06-28 — v3.8.40

OmniRoute maʼmuriy amallar, autentifikatsiya hodisalari, provayder hisob maʼlumotlarining hayotiy siklidagi oʻzgarishlar va MCP vositasi chaqiruvlarini SQLite asosidagi audit jadvallariga yozib boradi. Ushbu sahifada nimalar jurnalga yozilishi, ular qayerda saqlanishi, qancha vaqt saqlab turilishi, API kalitlari jurnalga yozilishdan qanday voz kechishi va maʼlumotlarni qanday soʻrash mumkinligi bayon etiladi.

Amalga oshirish kodi `src/lib/compliance/index.ts` (T-43 — "Muvofiqlik nazorati") va `src/lib/compliance/providerAudit.ts` fayllarida joylashgan. Audit yozuvlari hech qachon istisno chiqarmaydi: har qanday nosozlik yuz berganda chaqiruv jimgina eʼtiborsiz qoldiriladi, shuning uchun audit jurnaliga yozish asosiy soʻrov oqimini buzmaydi.

## Nimalar jurnalga yoziladi

### Maʼmuriy audit hodisalari (`audit_log`)

`logAuditEvent({ action, actor, target, details, ... })` funksiyasining har bir chaqiruvi bitta qator hosil qiladi. Amal satrlari `domain.verb` (yoki `domain.verb.outcome`) andozasiga amal qiladi. Kod bazasida tasdiqlangan amal turlariga quyidagilar kiradi:

| Amal                                 | Manba                                   |
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

Har bir yozuv `action`, `actor` (standart qiymati `"system"`), `target`, `details`/`metadata` (JSON), `ip_address`, `resource_type`, `status`, `request_id` va `timestamp` qiymatlarini qayd etadi. Maxfiy kalitlar (`apiKey`, `accessToken`, `refreshToken`, `password`, `*token`/`*secret`/`*apikey` andozalariga mos keladigan barcha kalitlar va hokazo) qator yozilishidan oldin rekursiv ravishda `"[redacted]"` qiymati bilan berkitiladi.

### MCP vositasi chaqiruvlari (`mcp_tool_audit`)

Har bir MCP vositasi chaqiruvi `open-sse/mcp-server/audit.ts` orqali bitta qator yozadi. Sxema (`src/lib/db/migrations/002_mcp_a2a_tables.sql` faylidan):

| Ustun            | Izohlar                                                    |
| ---------------- | ---------------------------------------------------------- |
| `id`             | avtomatik oshiriladi                                       |
| `tool_name`      | MCP vositasi identifikatori                                |
| `input_hash`     | kirish maʼlumotlarining sha256 xeshi (yuklama saqlanmaydi) |
| `output_summary` | qisqa, kesilgan xulosa                                     |
| `duration_ms`    | oʻtgan haqiqiy vaqt                                        |
| `api_key_id`     | chaqiruvchi (null boʻlishi mumkin)                         |
| `success`        | `1` / `0`                                                  |
| `error_code`     | nosozlik yuz bergandagi yakuniy xato kodi                  |
| `created_at`     | ISO vaqt belgisi                                           |

### Soʻrov / foydalanish jurnallari

Bular operatsion telemetriya maʼlumotlari (qatʼiy maʼnoda maʼmuriy audit emas), ammo ular ayni saqlash muddati konveyeridan foydalanadi:

- `usage_history` — har bir soʻrov boʻyicha jamlangan foydalanish maʼlumotlari
- `call_logs` — har bir soʻrovning toʻliq jurnali (qatorlar soni chekloviga bogʻliq, quyiga qarang)
- `proxy_logs` — proksi trafik jurnali (qatorlar soni chekloviga bogʻliq)
- `request_detail_logs` — eski batafsil soʻrovlar jurnali (mavjud boʻlsa, hali ham tozalanadi)

## Saqlash sxemasi

`audit_log` birinchi marta ishlatilganda `ensureAuditLogSchema()` tomonidan kechiktirilgan tarzda yaratiladi:

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

Indekslar `timestamp`, `action`, `actor`, `resource_type`, `status` va
`request_id` ustunlarida yaratiladi. Eski maʼlumotlar bazalarida mavjud bo‘lmagan ustunlar zaruratga ko‘ra
`ALTER TABLE` orqali qo‘shiladi.

## Saqlash muddati va tozalash

Ikkita alohida saqlash muddati qo‘llanadi:

| Muhit o‘zgaruvchisi         | Standart qiymat | Qo‘llaniladigan jadvallar                                         |
| --------------------------- | --------------- | ----------------------------------------------------------------- |
| `APP_LOG_RETENTION_DAYS`    | `7`             | `audit_log`, `mcp_tool_audit`                                     |
| `CALL_LOG_RETENTION_DAYS`   | `7`             | `usage_history`, `call_logs`, `proxy_logs`, `request_detail_logs` |
| `CALL_LOGS_TABLE_MAX_ROWS`  | `100000`        | `call_logs` uchun qatorlar sonini cheklash                        |
| `PROXY_LOGS_TABLE_MAX_ROWS` | `100000`        | `proxy_logs` uchun qatorlar sonini cheklash                       |

`cleanupExpiredLogs()` saqlash muddati bo‘yicha tozalash jarayonini ishga tushiradi. U server ishga tushganda
`src/instrumentation-node.ts` orqali chaqiriladi. Har bir ishga tushirishda
har bir jadval bo‘yicha o‘chirilgan qatorlar soni bilan `compliance.cleanup` audit hodisasi
qayd etiladi. Uzoq yozish bloklanishlarining oldini olish uchun proksi/chaqiruv
jurnallarini qisqartirish paketlarga bo‘lib bajariladi (`BATCH_SIZE = 5000`).

So‘rovlar tarixini qo‘lda tozalash saqlash muddati bo‘yicha tozalashdan alohida amalga oshiriladi. Request Logs
sahifasi `POST /api/settings/purge-request-history` so‘rovini yuboradi; bu `call_logs`,
eski `request_detail_logs` hamda `${DATA_DIR}/call_logs/` ichidagi mahalliy
so‘rov artefaktlarini o‘chiradi.

Standart qiymatlar `src/lib/logEnv.ts` faylida belgilangan
(`DEFAULT_APP_LOG_RETENTION_DAYS = 7`, `DEFAULT_CALL_LOG_RETENTION_DAYS = 7`).

## `noLog` orqali rad etish (har bir API kaliti uchun)

API kalitlari ularning quyi oqimdagi chaqiruv trafigi jurnalga yozilmasligi uchun belgilanishi mumkin.
Belgi `api_keys` jadvalida (`no_log INTEGER DEFAULT 0`) saqlanadi va tezkor yo‘ldagi
qidiruvlar uchun xotiradagi to‘plamga aks ettiriladi.

```bash
# Jurnalga yozilmaydigan kalit yarating (boshqaruv autentifikatsiyasi talab qilinadi)
curl -X POST http://localhost:20128/api/keys \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"name": "Privacy key", "noLog": true}'
```

Yordamchi funksiyalar (`src/lib/compliance/index.ts`):

- `setNoLog(apiKeyId, true|false)` — xotiradagi yozuvni yoqish yoki o‘chirish
- `isNoLog(apiKeyId)` — so‘rov yo‘lida tekshiriladi; mavjud bo‘lmasa, `api_keys.no_log` dan
  30 soniyaga keshlangan o‘qishdan foydalanadi
- `NO_LOG_API_KEY_IDS` (muhit o‘zgaruvchisi, vergul bilan ajratilgan) — ishga tushishda xotiradagi
  to‘plamga oldindan yuklanadi; ustunni bevosita o‘zgartira olmaganingizda foydali

Maʼmuriy audit hodisalariga (tizimga kirish, provayder o‘zgarishlari, MCP vositasi chaqiruvlari va boshqalar)
`noLog` **taʼsir qilmaydi** — faqat har bir so‘rovga tegishli trafikni jurnalga yozish
rad etiladi.

## REST API

| Endpoint                    | Metod | Tavsif                                                  | Autentifikatsiya |
| --------------------------- | ----- | ------------------------------------------------------- | ---------------- |
| `/api/compliance/audit-log` | `GET` | Filtrlangan, sahifalangan administrator audit yozuvlari | management       |
| `/api/mcp/audit`            | `GET` | Sahifalangan MCP vositasi audit yozuvlari               | (open-sse)       |
| `/api/mcp/audit/stats`      | `GET` | Umumlashtirilgan MCP audit statistikasi                 | (open-sse)       |

Hozirda CSV formatida eksport qilish endpointi taqdim etilmaydi — boshqaruv panelidan eksport qiling yoki
SQLite maʼlumotlar bazasiga toʻgʻridan-toʻgʻri soʻrov yuboring.

### `/api/compliance/audit-log` endpointiga soʻrov yuborish

Qoʻllab-quvvatlanadigan soʻrov parametrlari (barchasi ixtiyoriy, matn
filtrlarining barchasi `LIKE %value%` moslashtirishidan foydalanadi):

- `action`, `actor`, `target`, `resourceType` (yoki `resource_type`),
  `status`, `requestId` (yoki `request_id`)
- `from` / `since`, `to` / `until` — ISO vaqt belgilari
- `limit` (standart qiymat `50`, minimum `1`, maksimum `500`)
- `offset` (standart qiymat `0`, maksimum `10_000`)

Javob JSON massivi hisoblanadi. Sahifalash metamaʼlumotlari sarlavhalarda qaytariladi:
`x-total-count`, `x-page-limit`, `x-page-offset`.

```bash
curl "http://localhost:20128/api/compliance/audit-log?action=provider.credentials&from=2026-05-01" \
  -H "Cookie: auth_token=..."
```

## Boshqaruv paneli

Boshqaruv panelida audit maʼlumotlari **`/dashboard/audit`** manzilida mavjud
(`src/app/(dashboard)/dashboard/audit/page.tsx`). Sahifada ikkita ichki varaq mavjud:

- **Muvofiqlik** (`ComplianceTab.tsx`) — `/api/compliance/audit-log` dan
  administrator audit hodisalari. Hodisa turi, jiddiylik darajasi (axborot / ogohlantirish
  / jiddiy; amal + holatdan kelib chiqadi) va sana oraligʻi boʻyicha filtrlaydi. Jiddiylik
  darajasi amal/holat satrlari asosida mijoz tomonida hisoblanadi.
- **MCP** (`McpAuditTab.tsx`) — `/api/mcp/audit` dan MCP vositasi auditi,
  vosita nomi va muvaffaqiyat/muvaffaqiyatsizlik boʻyicha filtrlar bilan.

Ikkala ichki varaq ham sahifalaydi: sahifa oʻlchami muvofiqlik uchun `50`, MCP uchun esa `25`.

## Provayder hisob maʼlumotlari yordamchi funksiyalari

`src/lib/compliance/providerAudit.ts` provayderlarni boshqarish yoʻnalishlari
hisob maʼlumotlari hodisalarini chiqarishda foydalanadigan shakllantirish yordamchi funksiyalarini taqdim etadi:

- `summarizeProviderConnectionForAudit(connection)` — ulanish surati
  `details` maydoniga yozilishidan oldin `apiKey`, `accessToken`, `refreshToken`, `idToken` va
  `providerSpecificData.consoleApiKey` maydonlarini olib tashlaydi.
- `getProviderAuditTarget(connection)` — `target` maydoni uchun barqaror
  `"<provider>:<name|id>"` satrini tuzadi.
- `extractProviderWarnings(...payloads)` — provayder javoblaridan
  siyosat/xavfsizlik ogohlantirishlarini (`[sanitizer]`, `prompt injection detected`,
  `content has been filtered`, `safety filter`, `policy violation`) qidiradi va
  koʻpi bilan 5 ta moslikni chiqaradi; har biri 400 belgigacha qisqartiriladi.

## Eng yaxshi amaliyotlar

- PII (huquqiy, tibbiy va hokazo maʼlumotlar) bilan ishlaydigan API kalitlarini `noLog: true` bilan belgilang.
- Saqlash siyosatingizga mos kelishi uchun `APP_LOG_RETENTION_DAYS` /
  `CALL_LOG_RETENTION_DAYS` qiymatlarini sozlang. Standart 7 kunlik qiymatlar konservativ hisoblanadi.
- Audit jadvalini platformadan tashqariga (`sqlite3 dump`) muvofiqlik
  dasturingiz talab qiladigan davriylikda eksport qiling — ichki arxivlash imkoniyati mavjud emas.
- Qoʻpol kuch usulidagi hujumlarni aniqlash uchun `auth.login.failed` va
  `auth.login.locked` sonlarini kuzatib boring.
- Yangi administrator endpointlarini qoʻshishda barqaror
  `domain.verb.outcome` amal satri bilan `logAuditEvent({ ... })` funksiyasini chaqiring va IP hamda
  `requestId` avtomatik ravishda yozib olinishi uchun soʻrov kontekstini
  `getAuditRequestContext(request)` orqali uzating.

## Shuningdek qarang

- [`docs/security/GUARDRAILS.md`](./GUARDRAILS.md) — PII niqoblash, prompt inyeksiyasi
- [`docs/frameworks/MCP-SERVER.md`](../frameworks/MCP-SERVER.md) — MCP vositalari katalogi va qamrov doiralari
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md) — muhit o‘zgaruvchilarining to‘liq ma’lumotnomasi
- Manba: `src/lib/compliance/`, `src/app/api/compliance/`,
  `src/app/api/mcp/audit/`, `src/lib/logEnv.ts`
