# Compliance & Audit (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../security/COMPLIANCE.md) · 🇪🇹 [am](../../../am/docs/security/COMPLIANCE.md) · 🇸🇦 [ar](../../../ar/docs/security/COMPLIANCE.md) · 🇦🇿 [az](../../../az/docs/security/COMPLIANCE.md) · 🇧🇬 [bg](../../../bg/docs/security/COMPLIANCE.md) · 🇧🇩 [bn](../../../bn/docs/security/COMPLIANCE.md) · 🇧🇦 [bs](../../../bs/docs/security/COMPLIANCE.md) · 🇨🇿 [cs](../../../cs/docs/security/COMPLIANCE.md) · 🇩🇰 [da](../../../da/docs/security/COMPLIANCE.md) · 🇩🇪 [de](../../../de/docs/security/COMPLIANCE.md) · 🇬🇷 [el](../../../el/docs/security/COMPLIANCE.md) · 🇪🇸 [es](../../../es/docs/security/COMPLIANCE.md) · 🇪🇪 [et](../../../et/docs/security/COMPLIANCE.md) · 🇮🇷 [fa](../../../fa/docs/security/COMPLIANCE.md) · 🇫🇮 [fi](../../../fi/docs/security/COMPLIANCE.md) · 🇫🇷 [fr](../../../fr/docs/security/COMPLIANCE.md) · 🇮🇪 [ga](../../../ga/docs/security/COMPLIANCE.md) · 🇮🇳 [gu](../../../gu/docs/security/COMPLIANCE.md) · 🇳🇬 [ha](../../../ha/docs/security/COMPLIANCE.md) · 🇮🇱 [he](../../../he/docs/security/COMPLIANCE.md) · 🇭🇷 [hr](../../../hr/docs/security/COMPLIANCE.md) · 🇭🇺 [hu](../../../hu/docs/security/COMPLIANCE.md) · 🇦🇲 [hy](../../../hy/docs/security/COMPLIANCE.md) · 🇮🇩 [id](../../../id/docs/security/COMPLIANCE.md) · 🇳🇬 [ig](../../../ig/docs/security/COMPLIANCE.md) · 🇮🇹 [it](../../../it/docs/security/COMPLIANCE.md) · 🇯🇵 [ja](../../../ja/docs/security/COMPLIANCE.md) · 🇬🇪 [ka](../../../ka/docs/security/COMPLIANCE.md) · 🇰🇭 [km](../../../km/docs/security/COMPLIANCE.md) · 🇮🇳 [kn](../../../kn/docs/security/COMPLIANCE.md) · 🇰🇷 [ko](../../../ko/docs/security/COMPLIANCE.md) · 🇱🇹 [lt](../../../lt/docs/security/COMPLIANCE.md) · 🇱🇻 [lv](../../../lv/docs/security/COMPLIANCE.md) · 🇮🇳 [ml](../../../ml/docs/security/COMPLIANCE.md) · 🇮🇳 [mr](../../../mr/docs/security/COMPLIANCE.md) · 🇲🇾 [ms](../../../ms/docs/security/COMPLIANCE.md) · 🇲🇹 [mt](../../../mt/docs/security/COMPLIANCE.md) · 🇲🇲 [my](../../../my/docs/security/COMPLIANCE.md) · 🇳🇵 [ne](../../../ne/docs/security/COMPLIANCE.md) · 🇳🇱 [nl](../../../nl/docs/security/COMPLIANCE.md) · 🇳🇴 [no](../../../no/docs/security/COMPLIANCE.md) · 🇮🇳 [or](../../../or/docs/security/COMPLIANCE.md) · 🇮🇳 [pa](../../../pa/docs/security/COMPLIANCE.md) · 🇵🇭 [phi](../../../phi/docs/security/COMPLIANCE.md) · 🇵🇱 [pl](../../../pl/docs/security/COMPLIANCE.md) · 🇵🇹 [pt](../../../pt/docs/security/COMPLIANCE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/COMPLIANCE.md) · 🇷🇴 [ro](../../../ro/docs/security/COMPLIANCE.md) · 🇷🇺 [ru](../../../ru/docs/security/COMPLIANCE.md) · 🇱🇰 [si](../../../si/docs/security/COMPLIANCE.md) · 🇸🇰 [sk](../../../sk/docs/security/COMPLIANCE.md) · 🇸🇮 [sl](../../../sl/docs/security/COMPLIANCE.md) · 🇷🇸 [sr](../../../sr/docs/security/COMPLIANCE.md) · 🇸🇪 [sv](../../../sv/docs/security/COMPLIANCE.md) · 🇰🇪 [sw](../../../sw/docs/security/COMPLIANCE.md) · 🇮🇳 [ta](../../../ta/docs/security/COMPLIANCE.md) · 🇮🇳 [te](../../../te/docs/security/COMPLIANCE.md) · 🇹🇭 [th](../../../th/docs/security/COMPLIANCE.md) · 🇹🇷 [tr](../../../tr/docs/security/COMPLIANCE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/COMPLIANCE.md) · 🇵🇰 [ur](../../../ur/docs/security/COMPLIANCE.md) · 🇺🇿 [uz](../../../uz/docs/security/COMPLIANCE.md) · 🇻🇳 [vi](../../../vi/docs/security/COMPLIANCE.md) · 🇳🇬 [yo](../../../yo/docs/security/COMPLIANCE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/COMPLIANCE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/COMPLIANCE.md)

---

> **प्रामाणिक स्रोत:** `src/lib/compliance/`, `src/app/api/compliance/`
> **अंतिम अपडेट:** 2026-06-28 — v3.8.40

OmniRoute प्रशासनिक कार्रवाइयों, प्रमाणीकरण घटनाओं, प्रदाता क्रेडेंशियल जीवनचक्र परिवर्तनों और MCP टूल आह्वानों को SQLite-समर्थित ऑडिट तालिकाओं में दर्ज करता है। यह पृष्ठ बताता है कि क्या लॉग किया जाता है, वह कहाँ रहता है, उसे कितने समय तक बनाए रखा जाता है, API कुंजियाँ इससे बाहर रहने का विकल्प कैसे चुन सकती हैं और डेटा को कैसे क्वेरी किया जा सकता है।

कार्यान्वयन `src/lib/compliance/index.ts` (T-43 — "अनुपालन नियंत्रण") और `src/lib/compliance/providerAudit.ts` में मौजूद है। ऑडिट लेखन कभी अपवाद नहीं फेंकता: किसी भी विफलता पर कॉल को बिना किसी सूचना के रोक दिया जाता है, ताकि ऑडिट लॉगिंग मुख्य अनुरोध प्रवाह को बाधित न कर सके।

## क्या लॉग किया जाता है

### प्रशासनिक ऑडिट घटनाएँ (`audit_log`)

`logAuditEvent({ action, actor, target, details, ... })` की प्रत्येक कॉल एक पंक्ति बनाती है। कार्रवाई स्ट्रिंग `domain.verb` (या `domain.verb.outcome`) पैटर्न का पालन करती हैं। स्रोत-वृक्ष में पुष्टि किए गए कार्रवाई प्रकारों में ये शामिल हैं:

| कार्रवाई                             | स्रोत                                   |
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

प्रत्येक प्रविष्टि `action`, `actor` (डिफ़ॉल्ट रूप से `"system"`), `target`, `details`/`metadata` (JSON), `ip_address`, `resource_type`, `status`, `request_id` और `timestamp` को दर्ज करती है। संवेदनशील कुंजियों (`apiKey`, `accessToken`, `refreshToken`, `password`, `*token`/`*secret`/`*apikey` से मेल खाने वाली कोई भी कुंजी आदि) को पंक्ति लिखे जाने से पहले पुनरावर्ती रूप से संशोधित करके `"[redacted]"` कर दिया जाता है।

### MCP टूल कॉल (`mcp_tool_audit`)

प्रत्येक MCP टूल आह्वान `open-sse/mcp-server/audit.ts` के माध्यम से एक पंक्ति लिखता है। स्कीमा (`src/lib/db/migrations/002_mcp_a2a_tables.sql` से):

| स्तंभ            | टिप्पणियाँ                                |
| ---------------- | ----------------------------------------- |
| `id`             | स्वतः-वृद्धि                              |
| `tool_name`      | MCP टूल पहचानकर्ता                        |
| `input_hash`     | इनपुट का sha256 (कोई पेलोड संग्रहीत नहीं) |
| `output_summary` | संक्षिप्त, काटा गया सारांश                |
| `duration_ms`    | बीता हुआ वास्तविक समय                     |
| `api_key_id`     | कॉलकर्ता (नल हो सकता है)                  |
| `success`        | `1` / `0`                                 |
| `error_code`     | विफलता पर अंतिम त्रुटि कोड                |
| `created_at`     | ISO टाइमस्टैम्प                           |

### अनुरोध / उपयोग लॉग

ये परिचालन टेलीमेट्री हैं (कड़ाई से प्रशासनिक ऑडिट नहीं), लेकिन समान अवधारण पाइपलाइन साझा करते हैं:

- `usage_history` — प्रति-अनुरोध उपयोग समेकन
- `call_logs` — पूर्ण प्रति-अनुरोध लॉग (पंक्ति-सीमा के अधीन, नीचे देखें)
- `proxy_logs` — प्रॉक्सी ट्रैफ़िक लॉग (पंक्ति-सीमा के अधीन)
- `request_detail_logs` — पुराना विस्तृत अनुरोध लॉग (मौजूद होने पर अभी भी हटाया जाता है)

## स्टोरेज स्कीमा

पहली बार उपयोग किए जाने पर `audit_log` को `ensureAuditLogSchema()` द्वारा विलंबित रूप से बनाया जाता है:

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

इंडेक्स `timestamp`, `action`, `actor`, `resource_type`,
`status`, और `request_id` पर बनाए जाते हैं। लेगेसी DBs में अनुपलब्ध कॉलम
आवश्यकतानुसार `ALTER TABLE` के माध्यम से जोड़े जाते हैं।

## प्रतिधारण और क्लीनअप

दो अलग-अलग प्रतिधारण अवधियों का पालन किया जाता है:

| पर्यावरण चर                 | डिफ़ॉल्ट | इन पर लागू होता है                                                |
| --------------------------- | -------- | ----------------------------------------------------------------- |
| `APP_LOG_RETENTION_DAYS`    | `7`      | `audit_log`, `mcp_tool_audit`                                     |
| `CALL_LOG_RETENTION_DAYS`   | `7`      | `usage_history`, `call_logs`, `proxy_logs`, `request_detail_logs` |
| `CALL_LOGS_TABLE_MAX_ROWS`  | `100000` | `call_logs` के लिए पंक्ति-सीमा ट्रिमिंग                           |
| `PROXY_LOGS_TABLE_MAX_ROWS` | `100000` | `proxy_logs` के लिए पंक्ति-सीमा ट्रिमिंग                          |

`cleanupExpiredLogs()` प्रतिधारण प्रक्रिया चलाता है। इसे सर्वर शुरू होने पर
`src/instrumentation-node.ts` से लागू किया जाता है। प्रत्येक रन में प्रति-टेबल
हटाई गई पंक्तियों की संख्या के साथ एक `compliance.cleanup` ऑडिट ईवेंट लॉग किया
जाता है। लंबे राइट लॉक से बचने के लिए प्रॉक्सी/कॉल लॉग ट्रिमिंग बैचों में
(`BATCH_SIZE = 5000`) की जाती है।

मैन्युअल अनुरोध-इतिहास क्लीनअप प्रतिधारण से अलग है। Request Logs
पृष्ठ `POST /api/settings/purge-request-history` को कॉल करता है, जो `call_logs`,
लेगेसी `request_detail_logs`, और `${DATA_DIR}/call_logs/` के अंतर्गत स्थानीय
अनुरोध आर्टिफ़ैक्ट हटाता है।

डिफ़ॉल्ट मान `src/lib/logEnv.ts` में परिभाषित हैं
(`DEFAULT_APP_LOG_RETENTION_DAYS = 7`, `DEFAULT_CALL_LOG_RETENTION_DAYS = 7`)।

## `noLog` ऑप्ट-आउट (प्रति API कुंजी)

API कुंजियों को फ़्लैग किया जा सकता है, ताकि उनका डाउनस्ट्रीम कॉल ट्रैफ़िक लॉग
न किया जाए। यह फ़्लैग `api_keys` टेबल (`no_log INTEGER DEFAULT 0`) में रहता है
और हॉट-पाथ लुकअप के लिए इन-मेमोरी सेट में प्रतिबिंबित किया जाता है।

```bash
# no-log कुंजी बनाएँ (प्रबंधन प्रमाणीकरण आवश्यक है)
curl -X POST http://localhost:20128/api/keys \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"name": "Privacy key", "noLog": true}'
```

सहायक फ़ंक्शन (`src/lib/compliance/index.ts`):

- `setNoLog(apiKeyId, true|false)` — इन-मेमोरी प्रविष्टि को टॉगल करता है
- `isNoLog(apiKeyId)` — अनुरोध पथ पर जाँचा जाता है; अन्यथा `api_keys.no_log`
  से 30 सेकंड की कैश की गई रीड का उपयोग करता है
- `NO_LOG_API_KEY_IDS` (पर्यावरण चर, कॉमा से अलग किए गए) — बूट के समय
  इन-मेमोरी सेट में पहले से लोड किए जाते हैं; तब उपयोगी है जब आप कॉलम को
  सीधे टॉगल नहीं कर सकते

प्रशासनिक ऑडिट ईवेंट (लॉगिन, प्रदाता परिवर्तन, MCP टूल कॉल आदि)
`noLog` से **प्रभावित नहीं** होते हैं — केवल प्रति-अनुरोध ट्रैफ़िक लॉगिंग से
ऑप्ट-आउट किया जाता है।

## REST API

| एंडपॉइंट                    | विधि  | विवरण                                             | प्रमाणीकरण |
| --------------------------- | ----- | ------------------------------------------------- | ---------- |
| `/api/compliance/audit-log` | `GET` | फ़िल्टर के साथ पृष्ठांकित एडमिन ऑडिट प्रविष्टियाँ | प्रबंधन    |
| `/api/mcp/audit`            | `GET` | पृष्ठांकित MCP टूल ऑडिट प्रविष्टियाँ              | (open-sse) |
| `/api/mcp/audit/stats`      | `GET` | समेकित MCP ऑडिट आँकड़े                            | (open-sse) |

वर्तमान में कोई CSV एक्सपोर्ट एंडपॉइंट उपलब्ध नहीं है — डैशबोर्ड से एक्सपोर्ट करें या
सीधे SQLite डेटाबेस को क्वेरी करें।

### `/api/compliance/audit-log` को क्वेरी करना

समर्थित क्वेरी पैरामीटर (सभी वैकल्पिक हैं; सभी टेक्स्ट फ़िल्टर के लिए
`LIKE %value%` मिलान का उपयोग करते हैं):

- `action`, `actor`, `target`, `resourceType` (या `resource_type`),
  `status`, `requestId` (या `request_id`)
- `from` / `since`, `to` / `until` — ISO टाइमस्टैम्प
- `limit` (डिफ़ॉल्ट `50`, न्यूनतम `1`, अधिकतम `500`)
- `offset` (डिफ़ॉल्ट `0`, अधिकतम `10_000`)

प्रतिक्रिया एक JSON ऐरे है। पृष्ठांकन मेटाडेटा हेडर में लौटाया जाता है:
`x-total-count`, `x-page-limit`, `x-page-offset`।

```bash
curl "http://localhost:20128/api/compliance/audit-log?action=provider.credentials&from=2026-05-01" \
  -H "Cookie: auth_token=..."
```

## डैशबोर्ड

डैशबोर्ड पर ऑडिट डेटा **`/dashboard/audit`**
(`src/app/(dashboard)/dashboard/audit/page.tsx`) पर उपलब्ध है। पेज में दो टैब हैं:

- **अनुपालन** (`ComplianceTab.tsx`) — `/api/compliance/audit-log` से एडमिन
  ऑडिट इवेंट। इवेंट प्रकार, गंभीरता (जानकारी / चेतावनी / गंभीर, जो action +
  status से प्राप्त होती है) और तारीख़ की सीमा के आधार पर फ़िल्टर करता है। गंभीरता की गणना
  action/status स्ट्रिंग से क्लाइंट-साइड पर की जाती है।
- **MCP** (`McpAuditTab.tsx`) — `/api/mcp/audit` से MCP टूल ऑडिट, जिसमें
  टूल नाम और सफलता/विफलता के आधार पर फ़िल्टर उपलब्ध हैं।

दोनों टैब क्रमशः `50` (अनुपालन) और `25` (MCP) के पेज आकार के साथ पृष्ठांकन करते हैं।

## प्रोवाइडर क्रेडेंशियल हेल्पर

`src/lib/compliance/providerAudit.ts` ऐसे संरचना-निर्माण हेल्पर प्रदान करता है जिनका उपयोग
प्रोवाइडर-प्रबंधन रूट द्वारा क्रेडेंशियल इवेंट उत्सर्जित करते समय किया जाता है:

- `summarizeProviderConnectionForAudit(connection)` — कनेक्शन स्नैपशॉट को
  `details` में लिखे जाने से पहले `apiKey`, `accessToken`, `refreshToken`,
  `idToken` और `providerSpecificData.consoleApiKey` को हटा देता है।
- `getProviderAuditTarget(connection)` — `target` फ़ील्ड के लिए एक स्थिर
  `"<provider>:<name|id>"` स्ट्रिंग बनाता है।
- `extractProviderWarnings(...payloads)` — नीति/सुरक्षा चेतावनियों
  (`[sanitizer]`, `prompt injection detected`, `content has been filtered`,
  `safety filter`, `policy violation`) के लिए प्रोवाइडर प्रतिक्रियाओं को स्कैन करता है और
  अधिकतम 5 मिलान सामने लाता है, जिनमें से प्रत्येक को 400 वर्णों तक सीमित किया जाता है।

## सर्वोत्तम अभ्यास

- PII (कानूनी, चिकित्सा आदि) संभालने वाली API कुंजियों को `noLog: true` से चिह्नित करें।
- अपनी अवधारण नीति पूरी करने के लिए `APP_LOG_RETENTION_DAYS` /
  `CALL_LOG_RETENTION_DAYS` को समायोजित करें। 7-दिन के डिफ़ॉल्ट रूढ़िवादी हैं।
- अपने अनुपालन कार्यक्रम द्वारा आवश्यक आवृत्ति पर ऑडिट तालिका को प्लेटफ़ॉर्म से बाहर
  (`sqlite3 dump`) एक्सपोर्ट करें — कोई अंतर्निहित संग्रहण सुविधा मौजूद नहीं है।
- ब्रूट-फ़ोर्स पहचान के लिए `auth.login.failed` और `auth.login.locked` की
  संख्याओं को ट्रैक करें।
- नए एडमिन एंडपॉइंट जोड़ते समय, एक स्थिर `domain.verb.outcome` action स्ट्रिंग के साथ
  `logAuditEvent({ ... })` को कॉल करें और अनुरोध संदर्भ को
  `getAuditRequestContext(request)` के माध्यम से पास करें, ताकि IP और
  `requestId` स्वतः कैप्चर हो जाएँ।

## यह भी देखें

- [`docs/security/GUARDRAILS.md`](./GUARDRAILS.md) — PII मास्किंग, प्रॉम्प्ट इंजेक्शन
- [`docs/frameworks/MCP-SERVER.md`](../frameworks/MCP-SERVER.md) — MCP टूल कैटलॉग और स्कोप
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md) — पर्यावरण वेरिएबल का संपूर्ण संदर्भ
- स्रोत: `src/lib/compliance/`, `src/app/api/compliance/`,
  `src/app/api/mcp/audit/`, `src/lib/logEnv.ts`
