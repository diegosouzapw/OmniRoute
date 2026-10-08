# Compliance & Audit (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../security/COMPLIANCE.md) · 🇪🇹 [am](../../../am/docs/security/COMPLIANCE.md) · 🇸🇦 [ar](../../../ar/docs/security/COMPLIANCE.md) · 🇦🇿 [az](../../../az/docs/security/COMPLIANCE.md) · 🇧🇬 [bg](../../../bg/docs/security/COMPLIANCE.md) · 🇧🇦 [bs](../../../bs/docs/security/COMPLIANCE.md) · 🇨🇿 [cs](../../../cs/docs/security/COMPLIANCE.md) · 🇩🇰 [da](../../../da/docs/security/COMPLIANCE.md) · 🇩🇪 [de](../../../de/docs/security/COMPLIANCE.md) · 🇬🇷 [el](../../../el/docs/security/COMPLIANCE.md) · 🇪🇸 [es](../../../es/docs/security/COMPLIANCE.md) · 🇪🇪 [et](../../../et/docs/security/COMPLIANCE.md) · 🇮🇷 [fa](../../../fa/docs/security/COMPLIANCE.md) · 🇫🇮 [fi](../../../fi/docs/security/COMPLIANCE.md) · 🇫🇷 [fr](../../../fr/docs/security/COMPLIANCE.md) · 🇮🇪 [ga](../../../ga/docs/security/COMPLIANCE.md) · 🇮🇳 [gu](../../../gu/docs/security/COMPLIANCE.md) · 🇳🇬 [ha](../../../ha/docs/security/COMPLIANCE.md) · 🇮🇱 [he](../../../he/docs/security/COMPLIANCE.md) · 🇮🇳 [hi](../../../hi/docs/security/COMPLIANCE.md) · 🇭🇷 [hr](../../../hr/docs/security/COMPLIANCE.md) · 🇭🇺 [hu](../../../hu/docs/security/COMPLIANCE.md) · 🇦🇲 [hy](../../../hy/docs/security/COMPLIANCE.md) · 🇮🇩 [id](../../../id/docs/security/COMPLIANCE.md) · 🇳🇬 [ig](../../../ig/docs/security/COMPLIANCE.md) · 🇮🇹 [it](../../../it/docs/security/COMPLIANCE.md) · 🇯🇵 [ja](../../../ja/docs/security/COMPLIANCE.md) · 🇬🇪 [ka](../../../ka/docs/security/COMPLIANCE.md) · 🇰🇭 [km](../../../km/docs/security/COMPLIANCE.md) · 🇮🇳 [kn](../../../kn/docs/security/COMPLIANCE.md) · 🇰🇷 [ko](../../../ko/docs/security/COMPLIANCE.md) · 🇱🇹 [lt](../../../lt/docs/security/COMPLIANCE.md) · 🇱🇻 [lv](../../../lv/docs/security/COMPLIANCE.md) · 🇮🇳 [ml](../../../ml/docs/security/COMPLIANCE.md) · 🇮🇳 [mr](../../../mr/docs/security/COMPLIANCE.md) · 🇲🇾 [ms](../../../ms/docs/security/COMPLIANCE.md) · 🇲🇹 [mt](../../../mt/docs/security/COMPLIANCE.md) · 🇲🇲 [my](../../../my/docs/security/COMPLIANCE.md) · 🇳🇵 [ne](../../../ne/docs/security/COMPLIANCE.md) · 🇳🇱 [nl](../../../nl/docs/security/COMPLIANCE.md) · 🇳🇴 [no](../../../no/docs/security/COMPLIANCE.md) · 🇮🇳 [or](../../../or/docs/security/COMPLIANCE.md) · 🇮🇳 [pa](../../../pa/docs/security/COMPLIANCE.md) · 🇵🇭 [phi](../../../phi/docs/security/COMPLIANCE.md) · 🇵🇱 [pl](../../../pl/docs/security/COMPLIANCE.md) · 🇵🇹 [pt](../../../pt/docs/security/COMPLIANCE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/COMPLIANCE.md) · 🇷🇴 [ro](../../../ro/docs/security/COMPLIANCE.md) · 🇷🇺 [ru](../../../ru/docs/security/COMPLIANCE.md) · 🇱🇰 [si](../../../si/docs/security/COMPLIANCE.md) · 🇸🇰 [sk](../../../sk/docs/security/COMPLIANCE.md) · 🇸🇮 [sl](../../../sl/docs/security/COMPLIANCE.md) · 🇷🇸 [sr](../../../sr/docs/security/COMPLIANCE.md) · 🇸🇪 [sv](../../../sv/docs/security/COMPLIANCE.md) · 🇰🇪 [sw](../../../sw/docs/security/COMPLIANCE.md) · 🇮🇳 [ta](../../../ta/docs/security/COMPLIANCE.md) · 🇮🇳 [te](../../../te/docs/security/COMPLIANCE.md) · 🇹🇭 [th](../../../th/docs/security/COMPLIANCE.md) · 🇹🇷 [tr](../../../tr/docs/security/COMPLIANCE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/COMPLIANCE.md) · 🇵🇰 [ur](../../../ur/docs/security/COMPLIANCE.md) · 🇺🇿 [uz](../../../uz/docs/security/COMPLIANCE.md) · 🇻🇳 [vi](../../../vi/docs/security/COMPLIANCE.md) · 🇳🇬 [yo](../../../yo/docs/security/COMPLIANCE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/COMPLIANCE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/COMPLIANCE.md)

---

> **প্রামাণিক উৎস:** `src/lib/compliance/`, `src/app/api/compliance/`
> **সর্বশেষ হালনাগাদ:** 2026-06-28 — v3.8.40

OmniRoute প্রশাসনিক কার্যক্রম, প্রমাণীকরণ ইভেন্ট, প্রোভাইডার
ক্রেডেনশিয়ালের জীবনচক্রের পরিবর্তন এবং MCP টুল আহ্বান SQLite-সমর্থিত অডিট
টেবিলে রেকর্ড করে। কী কী লগ করা হয়, সেগুলো কোথায় থাকে, কত দিন
সংরক্ষিত হয়, API কী কীভাবে অপ্ট-আউট করতে পারে এবং ডেটা কীভাবে কোয়েরি করতে হয়—এই পৃষ্ঠায় তা আলোচনা করা হয়েছে।

ইমপ্লিমেন্টেশনটি `src/lib/compliance/index.ts` (T-43 — "কমপ্লায়েন্স
নিয়ন্ত্রণ") এবং `src/lib/compliance/providerAudit.ts`-এ রয়েছে। অডিট রাইট কখনো exception throw করে না:
কোনো ব্যর্থতা ঘটলে কলটি নীরবে উপেক্ষা করা হয়, যাতে অডিট লগিং
মূল রিকোয়েস্ট প্রবাহে বিঘ্ন ঘটাতে না পারে।

## কী কী লগ করা হয়

### প্রশাসনিক অডিট ইভেন্ট (`audit_log`)

`logAuditEvent({ action, actor, target, details, ... })`-এ করা প্রতিটি কল
একটি করে সারি তৈরি করে। অ্যাকশন স্ট্রিংগুলো `domain.verb` (অথবা `domain.verb.outcome`)
প্যাটার্ন অনুসরণ করে। কোডবেসে নিশ্চিত হওয়া অ্যাকশন টাইপগুলোর মধ্যে রয়েছে:

| অ্যাকশন                              | উৎস                                     |
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

প্রতিটি এন্ট্রিতে `action`, `actor` (ডিফল্ট মান `"system"`), `target`,
`details`/`metadata` (JSON), `ip_address`, `resource_type`, `status`,
`request_id` এবং `timestamp` সংরক্ষিত হয়। সংবেদনশীল কী (`apiKey`, `accessToken`,
`refreshToken`, `password`, `*token`/`*secret`/`*apikey`-এর সঙ্গে মেলে এমন যেকোনো কিছু,
ইত্যাদি) সারিটি লেখার আগে রিকার্সিভভাবে `"[redacted]"` দিয়ে আড়াল করা হয়।

### MCP টুল কল (`mcp_tool_audit`)

প্রতিটি MCP টুল আহ্বান
`open-sse/mcp-server/audit.ts`-এর মাধ্যমে একটি সারি লেখে। স্কিমা (
`src/lib/db/migrations/002_mcp_a2a_tables.sql` থেকে):

| কলাম             | টীকা                                        |
| ---------------- | ------------------------------------------- |
| `id`             | স্বয়ংক্রিয়ভাবে ক্রমবর্ধমান                |
| `tool_name`      | MCP টুল শনাক্তকারী                          |
| `input_hash`     | ইনপুটের sha256 (কোনো পেলোড সংরক্ষিত হয় না) |
| `output_summary` | সংক্ষিপ্ত, ছাঁটাই করা সারাংশ                |
| `duration_ms`    | মোট অতিবাহিত সময়                           |
| `api_key_id`     | কলকারী (nullable)                           |
| `success`        | `1` / `0`                                   |
| `error_code`     | ব্যর্থতার ক্ষেত্রে চূড়ান্ত এরর কোড         |
| `created_at`     | ISO টাইমস্ট্যাম্প                           |

### রিকোয়েস্ট / ব্যবহার লগ

এগুলো অপারেশনাল টেলিমেট্রি (কঠোর অর্থে প্রশাসনিক অডিট নয়), তবে একই
রিটেনশন পাইপলাইন ব্যবহার করে:

- `usage_history` — প্রতি রিকোয়েস্টের ব্যবহারের সমষ্টি
- `call_logs` — প্রতি রিকোয়েস্টের পূর্ণ লগ (সারির সীমা প্রযোজ্য, নিচে দেখুন)
- `proxy_logs` — প্রক্সি ট্রাফিক লগ (সারির সীমা প্রযোজ্য)
- `request_detail_logs` — পুরোনো বিস্তারিত রিকোয়েস্ট লগ (উপস্থিত থাকলে এখনও ছাঁটাই করা হয়)

## স্টোরেজ স্কিমা

প্রথমবার ব্যবহারের সময় `ensureAuditLogSchema()` দ্বারা `audit_log` অলসভাবে তৈরি করা হয়:

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

`timestamp`, `action`, `actor`, `resource_type`, `status` এবং `request_id`-এর ওপর ইনডেক্স তৈরি করা হয়। পুরোনো DB-তে অনুপস্থিত কলামগুলো প্রয়োজন অনুযায়ী `ALTER TABLE`-এর মাধ্যমে যোগ করা হয়।

## সংরক্ষণকাল ও পরিষ্কারকরণ

দুটি পৃথক সংরক্ষণকাল অনুসরণ করা হয়:

| পরিবেশ ভেরিয়েবল            | ডিফল্ট   | যেগুলোর ক্ষেত্রে প্রযোজ্য                                         |
| --------------------------- | -------- | ----------------------------------------------------------------- |
| `APP_LOG_RETENTION_DAYS`    | `7`      | `audit_log`, `mcp_tool_audit`                                     |
| `CALL_LOG_RETENTION_DAYS`   | `7`      | `usage_history`, `call_logs`, `proxy_logs`, `request_detail_logs` |
| `CALL_LOGS_TABLE_MAX_ROWS`  | `100000` | `call_logs`-এর জন্য সারি-সীমাভিত্তিক ছাঁটাই                       |
| `PROXY_LOGS_TABLE_MAX_ROWS` | `100000` | `proxy_logs`-এর জন্য সারি-সীমাভিত্তিক ছাঁটাই                      |

`cleanupExpiredLogs()` সংরক্ষণকাল-ভিত্তিক পরিষ্কারকরণ চালায়। সার্ভার চালু হওয়ার সময় `src/instrumentation-node.ts` থেকে এটি আহ্বান করা হয়। প্রতিবার চালানোর সময় প্রতিটি টেবিলের মুছে ফেলা সারির সংখ্যা-সহ একটি `compliance.cleanup` অডিট ইভেন্ট লগ করা হয়। দীর্ঘস্থায়ী রাইট লক এড়াতে প্রক্সি/কল লগের ছাঁটাই ব্যাচে (`BATCH_SIZE = 5000`) করা হয়।

ম্যানুয়াল রিকোয়েস্ট-ইতিহাস পরিষ্কারকরণ সংরক্ষণকাল-ভিত্তিক পরিষ্কারকরণ থেকে আলাদা। Request Logs পেজটি `POST /api/settings/purge-request-history` কল করে, যা `call_logs`, পুরোনো `request_detail_logs` এবং `${DATA_DIR}/call_logs/`-এর অধীনে থাকা স্থানীয় রিকোয়েস্ট আর্টিফ্যাক্ট মুছে দেয়।

ডিফল্টগুলো `src/lib/logEnv.ts`-এ সংজ্ঞায়িত আছে (`DEFAULT_APP_LOG_RETENTION_DAYS = 7`, `DEFAULT_CALL_LOG_RETENTION_DAYS = 7`)।

## `noLog` অপ্ট-আউট (প্রতি API কী)

API কীগুলোকে এমনভাবে চিহ্নিত করা যায়, যাতে সেগুলোর ডাউনস্ট্রিম কল ট্রাফিক লগ করা না হয়। ফ্ল্যাগটি `api_keys` টেবিলে (`no_log INTEGER DEFAULT 0`) থাকে এবং দ্রুত-পথের লুকআপের জন্য একটি ইন-মেমরি সেটেও প্রতিফলিত হয়।

```bash
# একটি নো-লগ কী তৈরি করুন (ম্যানেজমেন্ট অথেন্টিকেশন আবশ্যক)
curl -X POST http://localhost:20128/api/keys \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"name": "Privacy key", "noLog": true}'
```

সহায়ক ফাংশনসমূহ (`src/lib/compliance/index.ts`):

- `setNoLog(apiKeyId, true|false)` — ইন-মেমরি এন্ট্রি টগল করে
- `isNoLog(apiKeyId)` — রিকোয়েস্ট পাথে পরীক্ষা করা হয়; না পাওয়া গেলে `api_keys.no_log` থেকে ৩০ সেকেন্ডের জন্য ক্যাশ করা রিড ব্যবহার করে
- `NO_LOG_API_KEY_IDS` (env, কমা দিয়ে পৃথক করা) — বুটের সময় ইন-মেমরি সেটে আগে থেকেই লোড করা হয়; কলামটি সরাসরি টগল করা সম্ভব না হলে এটি উপযোগী

প্রশাসনিক অডিট ইভেন্টগুলো (লগইন, প্রোভাইডার পরিবর্তন, MCP টুল কল ইত্যাদি) `noLog` দ্বারা **প্রভাবিত হয় না** — কেবল প্রতি-রিকোয়েস্ট ট্রাফিক লগিং থেকে অপ্ট-আউট করা হয়।

## REST API

| এন্ডপয়েন্ট                 | মেথড  | বিবরণ                                     | অথ         |
| --------------------------- | ----- | ----------------------------------------- | ---------- |
| `/api/compliance/audit-log` | `GET` | ফিল্টারসহ পেজিনেটেড অ্যাডমিন অডিট এন্ট্রি | management |
| `/api/mcp/audit`            | `GET` | পেজিনেটেড MCP টুল অডিট এন্ট্রি            | (open-sse) |
| `/api/mcp/audit/stats`      | `GET` | সমষ্টিগত MCP অডিট পরিসংখ্যান              | (open-sse) |

বর্তমানে কোনো CSV এক্সপোর্ট এন্ডপয়েন্ট সরবরাহ করা হয় না — ড্যাশবোর্ড থেকে এক্সপোর্ট করুন অথবা
সরাসরি SQLite ডেটাবেসে কোয়েরি করুন।

### `/api/compliance/audit-log` কোয়েরি করা

সমর্থিত কোয়েরি প্যারামিটারসমূহ (সবগুলো ঐচ্ছিক এবং টেক্সট ফিল্টারের জন্য
সবগুলোতেই `LIKE %value%` ম্যাচিং ব্যবহৃত হয়):

- `action`, `actor`, `target`, `resourceType` (অথবা `resource_type`),
  `status`, `requestId` (অথবা `request_id`)
- `from` / `since`, `to` / `until` — ISO টাইমস্ট্যাম্প
- `limit` (ডিফল্ট `50`, সর্বনিম্ন `1`, সর্বোচ্চ `500`)
- `offset` (ডিফল্ট `0`, সর্বোচ্চ `10_000`)

রেসপন্সটি একটি JSON অ্যারে। পেজিনেশন মেটাডেটা হেডারে ফেরত দেওয়া হয়:
`x-total-count`, `x-page-limit`, `x-page-offset`।

```bash
curl "http://localhost:20128/api/compliance/audit-log?action=provider.credentials&from=2026-05-01" \
  -H "Cookie: auth_token=..."
```

## ড্যাশবোর্ড

ড্যাশবোর্ডে অডিট ডেটা **`/dashboard/audit`**-এ উপলভ্য
(`src/app/(dashboard)/dashboard/audit/page.tsx`)। পেজটিতে দুটি ট্যাব রয়েছে:

- **কমপ্লায়েন্স** (`ComplianceTab.tsx`) — `/api/compliance/audit-log` থেকে
  অ্যাডমিন অডিট ইভেন্ট। ইভেন্টের ধরন, তীব্রতা (তথ্য / সতর্কতা
  / গুরুতর, যা অ্যাকশন + স্ট্যাটাস থেকে নির্ধারিত) এবং তারিখের পরিসর অনুযায়ী ফিল্টার করে। তীব্রতা
  অ্যাকশন/স্ট্যাটাস স্ট্রিং থেকে ক্লায়েন্ট-সাইডে গণনা করা হয়।
- **MCP** (`McpAuditTab.tsx`) — `/api/mcp/audit` থেকে MCP টুল অডিট, যেখানে
  টুলের নাম এবং সফলতা/ব্যর্থতা অনুযায়ী ফিল্টার রয়েছে।

উভয় ট্যাব যথাক্রমে `50` (কমপ্লায়েন্স) এবং `25` (MCP) পেজ সাইজ ব্যবহার করে পেজিনেশন করে।

## প্রোভাইডার ক্রেডেনশিয়াল সহায়ক

`src/lib/compliance/providerAudit.ts`-এ এমন শেপিং সহায়ক রয়েছে, যেগুলো
প্রোভাইডার-ম্যানেজমেন্ট রুটগুলো ক্রেডেনশিয়াল ইভেন্ট নির্গত করার সময় ব্যবহার করে:

- `summarizeProviderConnectionForAudit(connection)` — কানেকশন স্ন্যাপশটটি
  `details`-এ লেখার আগে `apiKey`,
  `accessToken`, `refreshToken`, `idToken` এবং
  `providerSpecificData.consoleApiKey` বাদ দেয়।
- `getProviderAuditTarget(connection)` — `target` ফিল্ডের জন্য একটি স্থিতিশীল
  `"<provider>:<name|id>"` স্ট্রিং তৈরি করে।
- `extractProviderWarnings(...payloads)` — প্রোভাইডার রেসপন্সে
  নীতি/নিরাপত্তা-সংক্রান্ত সতর্কতা (`[sanitizer]`, `prompt injection detected`,
  `content has been filtered`, `safety filter`, `policy violation`) স্ক্যান করে এবং
  সর্বোচ্চ ৫টি হিট দেখায়, যার প্রতিটিকে ৪০০ অক্ষরে সীমিত করা হয়।

## সর্বোত্তম অনুশীলন

- PII (আইনি, চিকিৎসা-সংক্রান্ত ইত্যাদি) পরিচালনাকারী API কী-গুলোকে `noLog: true` দিয়ে চিহ্নিত করুন।
- আপনার রিটেনশন নীতি পূরণের জন্য `APP_LOG_RETENTION_DAYS` / `CALL_LOG_RETENTION_DAYS`
  সমন্বয় করুন। ৭ দিনের ডিফল্ট মানগুলো সংরক্ষণশীল।
- আপনার কমপ্লায়েন্স প্রোগ্রামের প্রয়োজনীয় সময়সূচি অনুযায়ী অডিট টেবিলটি
  প্ল্যাটফর্মের বাইরে এক্সপোর্ট করুন (`sqlite3 dump`) — কোনো বিল্ট-ইন আর্কাইভ ব্যবস্থা নেই।
- ব্রুট-ফোর্স শনাক্তকরণের জন্য `auth.login.failed` এবং `auth.login.locked`-এর সংখ্যা
  ট্র্যাক করুন।
- নতুন অ্যাডমিন এন্ডপয়েন্ট যোগ করার সময়, একটি স্থিতিশীল
  `domain.verb.outcome` অ্যাকশন স্ট্রিংসহ `logAuditEvent({ ... })` কল করুন এবং
  `getAuditRequestContext(request)`-এর মাধ্যমে রিকোয়েস্ট কনটেক্সট পাস করুন, যাতে IP ও `requestId`
  স্বয়ংক্রিয়ভাবে ধারণ করা হয়।

## আরও দেখুন

- [`docs/security/GUARDRAILS.md`](./GUARDRAILS.md) — PII মাস্কিং, প্রম্পট ইনজেকশন
- [`docs/frameworks/MCP-SERVER.md`](../frameworks/MCP-SERVER.md) — MCP টুল ক্যাটালগ এবং স্কোপসমূহ
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md) — পরিবেশ ভেরিয়েবলের সম্পূর্ণ রেফারেন্স
- সোর্স: `src/lib/compliance/`, `src/app/api/compliance/`,
  `src/app/api/mcp/audit/`, `src/lib/logEnv.ts`
