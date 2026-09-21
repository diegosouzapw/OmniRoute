# Compliance & Audit (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../security/COMPLIANCE.md) · 🇪🇹 [am](../../../am/docs/security/COMPLIANCE.md) · 🇸🇦 [ar](../../../ar/docs/security/COMPLIANCE.md) · 🇦🇿 [az](../../../az/docs/security/COMPLIANCE.md) · 🇧🇬 [bg](../../../bg/docs/security/COMPLIANCE.md) · 🇧🇩 [bn](../../../bn/docs/security/COMPLIANCE.md) · 🇨🇿 [cs](../../../cs/docs/security/COMPLIANCE.md) · 🇩🇰 [da](../../../da/docs/security/COMPLIANCE.md) · 🇩🇪 [de](../../../de/docs/security/COMPLIANCE.md) · 🇬🇷 [el](../../../el/docs/security/COMPLIANCE.md) · 🇪🇸 [es](../../../es/docs/security/COMPLIANCE.md) · 🇪🇪 [et](../../../et/docs/security/COMPLIANCE.md) · 🇮🇷 [fa](../../../fa/docs/security/COMPLIANCE.md) · 🇫🇮 [fi](../../../fi/docs/security/COMPLIANCE.md) · 🇫🇷 [fr](../../../fr/docs/security/COMPLIANCE.md) · 🇮🇪 [ga](../../../ga/docs/security/COMPLIANCE.md) · 🇮🇳 [gu](../../../gu/docs/security/COMPLIANCE.md) · 🇳🇬 [ha](../../../ha/docs/security/COMPLIANCE.md) · 🇮🇱 [he](../../../he/docs/security/COMPLIANCE.md) · 🇮🇳 [hi](../../../hi/docs/security/COMPLIANCE.md) · 🇭🇷 [hr](../../../hr/docs/security/COMPLIANCE.md) · 🇭🇺 [hu](../../../hu/docs/security/COMPLIANCE.md) · 🇦🇲 [hy](../../../hy/docs/security/COMPLIANCE.md) · 🇮🇩 [id](../../../id/docs/security/COMPLIANCE.md) · 🇳🇬 [ig](../../../ig/docs/security/COMPLIANCE.md) · 🇮🇹 [it](../../../it/docs/security/COMPLIANCE.md) · 🇯🇵 [ja](../../../ja/docs/security/COMPLIANCE.md) · 🇬🇪 [ka](../../../ka/docs/security/COMPLIANCE.md) · 🇰🇭 [km](../../../km/docs/security/COMPLIANCE.md) · 🇮🇳 [kn](../../../kn/docs/security/COMPLIANCE.md) · 🇰🇷 [ko](../../../ko/docs/security/COMPLIANCE.md) · 🇱🇹 [lt](../../../lt/docs/security/COMPLIANCE.md) · 🇱🇻 [lv](../../../lv/docs/security/COMPLIANCE.md) · 🇮🇳 [ml](../../../ml/docs/security/COMPLIANCE.md) · 🇮🇳 [mr](../../../mr/docs/security/COMPLIANCE.md) · 🇲🇾 [ms](../../../ms/docs/security/COMPLIANCE.md) · 🇲🇹 [mt](../../../mt/docs/security/COMPLIANCE.md) · 🇲🇲 [my](../../../my/docs/security/COMPLIANCE.md) · 🇳🇱 [nl](../../../nl/docs/security/COMPLIANCE.md) · 🇳🇴 [no](../../../no/docs/security/COMPLIANCE.md) · 🇮🇳 [or](../../../or/docs/security/COMPLIANCE.md) · 🇮🇳 [pa](../../../pa/docs/security/COMPLIANCE.md) · 🇵🇭 [phi](../../../phi/docs/security/COMPLIANCE.md) · 🇵🇱 [pl](../../../pl/docs/security/COMPLIANCE.md) · 🇵🇹 [pt](../../../pt/docs/security/COMPLIANCE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/COMPLIANCE.md) · 🇷🇴 [ro](../../../ro/docs/security/COMPLIANCE.md) · 🇷🇺 [ru](../../../ru/docs/security/COMPLIANCE.md) · 🇱🇰 [si](../../../si/docs/security/COMPLIANCE.md) · 🇸🇰 [sk](../../../sk/docs/security/COMPLIANCE.md) · 🇸🇮 [sl](../../../sl/docs/security/COMPLIANCE.md) · 🇷🇸 [sr](../../../sr/docs/security/COMPLIANCE.md) · 🇸🇪 [sv](../../../sv/docs/security/COMPLIANCE.md) · 🇰🇪 [sw](../../../sw/docs/security/COMPLIANCE.md) · 🇮🇳 [ta](../../../ta/docs/security/COMPLIANCE.md) · 🇮🇳 [te](../../../te/docs/security/COMPLIANCE.md) · 🇹🇭 [th](../../../th/docs/security/COMPLIANCE.md) · 🇹🇷 [tr](../../../tr/docs/security/COMPLIANCE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/COMPLIANCE.md) · 🇵🇰 [ur](../../../ur/docs/security/COMPLIANCE.md) · 🇺🇿 [uz](../../../uz/docs/security/COMPLIANCE.md) · 🇻🇳 [vi](../../../vi/docs/security/COMPLIANCE.md) · 🇳🇬 [yo](../../../yo/docs/security/COMPLIANCE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/COMPLIANCE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/COMPLIANCE.md)

---

> **आधिकारिक स्रोत:** `src/lib/compliance/`, `src/app/api/compliance/`
> **पछिल्लो अद्यावधिक:** 2026-06-28 — v3.8.40

OmniRoute ले प्रशासनिक कार्यहरू, प्रमाणीकरण घटनाहरू, प्रदायकका
क्रेडेन्सियलको जीवनचक्रमा भएका परिवर्तनहरू, र MCP उपकरण आह्वानहरूलाई SQLite-समर्थित अडिट
तालिकाहरूमा अभिलेख गर्छ। यस पृष्ठले के लग गरिन्छ, त्यो कहाँ रहन्छ, कति समयसम्म
राखिन्छ, API कुञ्जीहरूले कसरी अप्ट आउट गर्न सक्छन्, र डेटा कसरी क्वेरी गर्ने भन्ने समेट्छ।

कार्यान्वयन `src/lib/compliance/index.ts` (T-43 — "अनुपालन
नियन्त्रणहरू") र `src/lib/compliance/providerAudit.ts` मा छ। अडिट लेखनले कहिल्यै त्रुटि फ्याँक्दैन:
कुनै पनि विफलतामा कललाई मौन रूपमा बेवास्ता गरिन्छ, जसले गर्दा अडिट लगिङले
मुख्य अनुरोध प्रवाहलाई अवरुद्ध गर्न सक्दैन।

## के-के लग गरिन्छ

### प्रशासनिक अडिट घटनाहरू (`audit_log`)

`logAuditEvent({ action, actor, target, details, ... })` मा गरिएको प्रत्येक कलले
एउटा पङ्क्ति सिर्जना गर्छ। कार्य स्ट्रिङहरूले `domain.verb` (वा `domain.verb.outcome`)
ढाँचा पालना गर्छन्। स्रोत ट्रीमा पुष्टि गरिएका कार्य प्रकारहरूमा निम्न समावेश छन्:

| कार्य                                | स्रोत                                   |
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

प्रत्येक प्रविष्टिले `action`, `actor` (पूर्वनिर्धारित रूपमा `"system"`), `target`,
`details`/`metadata` (JSON), `ip_address`, `resource_type`, `status`,
`request_id`, र `timestamp` कैद गर्छ। संवेदनशील कुञ्जीहरू (`apiKey`, `accessToken`,
`refreshToken`, `password`, `*token`/`*secret`/`*apikey` सँग मेल खाने कुनै पनि कुरा,
आदि) लाई पङ्क्ति लेखिनुअघि पुनरावर्ती रूपमा `"[redacted]"` द्वारा लुकाइन्छ।

### MCP उपकरण कलहरू (`mcp_tool_audit`)

प्रत्येक MCP उपकरण आह्वानले
`open-sse/mcp-server/audit.ts` मार्फत एउटा पङ्क्ति लेख्छ। स्किमा
(`src/lib/db/migrations/002_mcp_a2a_tables.sql` बाट):

| स्तम्भ           | टिप्पणी                               |
| ---------------- | ------------------------------------- |
| `id`             | स्वतः वृद्धि                          |
| `tool_name`      | MCP उपकरण पहिचानकर्ता                 |
| `input_hash`     | इनपुटको sha256 (पेलोड भण्डारण हुँदैन) |
| `output_summary` | छोटो, काटिएको सारांश                  |
| `duration_ms`    | वास्तविक बितेको समय                   |
| `api_key_id`     | कलकर्ता (nullable)                    |
| `success`        | `1` / `0`                             |
| `error_code`     | विफलतामा अन्तिम त्रुटि कोड            |
| `created_at`     | ISO टाइमस्ट्याम्प                     |

### अनुरोध / प्रयोग लगहरू

यी सञ्चालनसम्बन्धी टेलिमेट्री हुन् (कडाइका साथ प्रशासनिक अडिट होइनन्), तर यिनले उही
अवधारण पाइपलाइन साझा गर्छन्:

- `usage_history` — प्रत्येक अनुरोधको प्रयोग रोल-अप
- `call_logs` — प्रत्येक अनुरोधको पूर्ण लग (पङ्क्ति सीमाको अधीनमा, तल हेर्नुहोस्)
- `proxy_logs` — प्रोक्सी ट्राफिक लग (पङ्क्ति सीमाको अधीनमा)
- `request_detail_logs` — पुरानो विस्तृत अनुरोध लग (उपस्थित भएमा अझै पनि काटछाँट गरिन्छ)

## भण्डारण स्किमा

`audit_log` पहिलो पटक प्रयोग गर्दा `ensureAuditLogSchema()` द्वारा आवश्यकताअनुसार सिर्जना गरिन्छ:

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

`timestamp`, `action`, `actor`, `resource_type`, `status`, र `request_id` मा अनुक्रमणिकाहरू सिर्जना गरिन्छ। पुराना DB हरूमा छुटेका स्तम्भहरू आवश्यकताअनुसार `ALTER TABLE` मार्फत थपिन्छन्।

## अवधारण अवधि र सफाइ

दुई छुट्टाछुट्टै अवधारण समयावधिहरू पालना गरिन्छन्:

| वातावरण चर                  | पूर्वनिर्धारित | यसमा लागू हुन्छ                                                   |
| --------------------------- | -------------- | ----------------------------------------------------------------- |
| `APP_LOG_RETENTION_DAYS`    | `7`            | `audit_log`, `mcp_tool_audit`                                     |
| `CALL_LOG_RETENTION_DAYS`   | `7`            | `usage_history`, `call_logs`, `proxy_logs`, `request_detail_logs` |
| `CALL_LOGS_TABLE_MAX_ROWS`  | `100000`       | `call_logs` का लागि पङ्क्ति-सीमा कटौती                            |
| `PROXY_LOGS_TABLE_MAX_ROWS` | `100000`       | `proxy_logs` का लागि पङ्क्ति-सीमा कटौती                           |

`cleanupExpiredLogs()` ले अवधारण प्रक्रिया चलाउँछ। यसलाई सर्भर सुरु हुँदा `src/instrumentation-node.ts` बाट आह्वान गरिन्छ। प्रत्येक सञ्चालनले प्रति-तालिका मेटाइएका सङ्ख्यासहितको `compliance.cleanup` अडिट घटना लग गर्छ। लामो लेखन लकबाट बच्न प्रोक्सी/कल लग कटौतीलाई ब्याचमा (`BATCH_SIZE = 5000`) गरिन्छ।

म्यानुअल अनुरोध-इतिहास सफाइ अवधारण प्रक्रियाभन्दा अलग छ। अनुरोध लग पृष्ठले `POST /api/settings/purge-request-history` कल गर्छ, जसले `call_logs`, पुरानो `request_detail_logs`, र `${DATA_DIR}/call_logs/` अन्तर्गतका स्थानीय अनुरोध आर्टिफ्याक्टहरू मेटाउँछ।

पूर्वनिर्धारित मानहरू `src/lib/logEnv.ts` मा परिभाषित छन् (`DEFAULT_APP_LOG_RETENTION_DAYS = 7`, `DEFAULT_CALL_LOG_RETENTION_DAYS = 7`)।

## `noLog` अप्ट-आउट (प्रति API कुञ्जी)

API कुञ्जीहरूलाई तिनको डाउनस्ट्रिम कल ट्राफिक लग नहुने गरी चिन्ह लगाउन सकिन्छ। यो फ्ल्याग `api_keys` तालिकामा (`no_log INTEGER DEFAULT 0`) रहन्छ र द्रुत-पथ लुकअपका लागि इन-मेमोरी सेटमा प्रतिबिम्बित गरिन्छ।

```bash
# लग नगरिने कुञ्जी सिर्जना गर्नुहोस् (व्यवस्थापन प्रमाणीकरण आवश्यक)
curl -X POST http://localhost:20128/api/keys \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"name": "Privacy key", "noLog": true}'
```

सहायकहरू (`src/lib/compliance/index.ts`):

- `setNoLog(apiKeyId, true|false)` — इन-मेमोरी प्रविष्टि टगल गर्छ
- `isNoLog(apiKeyId)` — अनुरोध पथमा जाँच गरिन्छ; जाँच असफल भएमा `api_keys.no_log` बाट 30 सेकेन्डका लागि क्यास गरिएको रिड प्रयोग गर्छ
- `NO_LOG_API_KEY_IDS` (वातावरण चर, अल्पविरामद्वारा छुट्याइएको) — बुट हुँदा इन-मेमोरी सेटमा पहिले नै लोड गरिन्छ; स्तम्भलाई प्रत्यक्ष टगल गर्न नसक्दा उपयोगी हुन्छ

प्रशासनिक अडिट घटनाहरू (लगइन, प्रदायक परिवर्तनहरू, MCP उपकरण कलहरू, आदि) `noLog` बाट **प्रभावित हुँदैनन्** — केवल प्रति-अनुरोध ट्राफिक लगिङबाट मात्र अप्ट-आउट गरिन्छ।

## REST API

| अन्त्यबिन्दु                | विधि  | विवरण                                                 | प्रमाणीकरण |
| --------------------------- | ----- | ----------------------------------------------------- | ---------- |
| `/api/compliance/audit-log` | `GET` | फिल्टरहरूसहित पृष्ठाङ्कित प्रशासकीय अडिट प्रविष्टिहरू | management |
| `/api/mcp/audit`            | `GET` | पृष्ठाङ्कित MCP उपकरण अडिट प्रविष्टिहरू               | (open-sse) |
| `/api/mcp/audit/stats`      | `GET` | समग्र MCP अडिट तथ्याङ्क                               | (open-sse) |

हाल कुनै CSV निर्यात अन्त्यबिन्दु उपलब्ध गराइएको छैन — ड्यासबोर्डबाट निर्यात गर्नुहोस् वा
SQLite डेटाबेसमा सीधै क्वेरी गर्नुहोस्।

### `/api/compliance/audit-log` मा क्वेरी गर्ने

समर्थित क्वेरी प्यारामिटरहरू (सबै ऐच्छिक छन्, सबैले पाठ फिल्टरका लागि
`LIKE %value%` मिलान प्रयोग गर्छन्):

- `action`, `actor`, `target`, `resourceType` (वा `resource_type`),
  `status`, `requestId` (वा `request_id`)
- `from` / `since`, `to` / `until` — ISO टाइमस्ट्याम्पहरू
- `limit` (पूर्वनिर्धारित `50`, न्यूनतम `1`, अधिकतम `500`)
- `offset` (पूर्वनिर्धारित `0`, अधिकतम `10_000`)

प्रतिक्रिया एउटा JSON एरे हो। पृष्ठाङ्कन मेटाडेटा हेडरहरूमा फिर्ता गरिन्छ:
`x-total-count`, `x-page-limit`, `x-page-offset`।

```bash
curl "http://localhost:20128/api/compliance/audit-log?action=provider.credentials&from=2026-05-01" \
  -H "Cookie: auth_token=..."
```

## ड्यासबोर्ड

ड्यासबोर्डले **`/dashboard/audit`** मा अडिट डेटा उपलब्ध गराउँछ
(`src/app/(dashboard)/dashboard/audit/page.tsx`)। यस पृष्ठमा दुईवटा ट्याब छन्:

- **अनुपालन** (`ComplianceTab.tsx`) — `/api/compliance/audit-log` बाट प्रशासकीय अडिट घटनाहरू।
  घटना प्रकार, गम्भीरता (जानकारी / चेतावनी / गम्भीर, action + status बाट
  व्युत्पन्न), र मिति दायराअनुसार फिल्टर गर्छ। गम्भीरता action/status स्ट्रिङहरूबाट
  क्लाइन्ट-साइडमा गणना गरिन्छ।
- **MCP** (`McpAuditTab.tsx`) — `/api/mcp/audit` बाट MCP उपकरण अडिट,
  उपकरणको नाम र सफलता/असफलताअनुसार फिल्टरहरूसहित।

दुवै ट्याबले क्रमशः `50` (अनुपालन) र `25` (MCP) का पृष्ठ आकारहरू प्रयोग गरेर पृष्ठाङ्कन गर्छन्।

## प्रदायक क्रेडेन्सियल सहायकहरू

`src/lib/compliance/providerAudit.ts` ले प्रदायक-व्यवस्थापन रुटहरूले
क्रेडेन्सियल घटनाहरू उत्सर्जन गर्दा प्रयोग गर्ने आकार निर्धारण सहायकहरू प्रदान गर्छ:

- `summarizeProviderConnectionForAudit(connection)` — जडान स्न्यापसट
  `details` मा लेखिनुअघि `apiKey`, `accessToken`, `refreshToken`, `idToken`, र
  `providerSpecificData.consoleApiKey` हटाउँछ।
- `getProviderAuditTarget(connection)` — `target` फिल्डका लागि स्थिर
  `"<provider>:<name|id>"` स्ट्रिङ बनाउँछ।
- `extractProviderWarnings(...payloads)` — प्रदायकका प्रतिक्रियाहरूमा
  नीति/सुरक्षा चेतावनीहरू (`[sanitizer]`, `prompt injection detected`,
  `content has been filtered`, `safety filter`, `policy violation`) खोज्छ र
  बढीमा 5 वटा मिलान देखाउँछ, प्रत्येकलाई 400 अक्षरमा छोट्याइएको हुन्छ।

## उत्कृष्ट अभ्यासहरू

- PII (कानुनी, चिकित्सा आदि) सम्हाल्ने API कुञ्जीहरूलाई `noLog: true` द्वारा चिन्ह लगाउनुहोस्।
- आफ्नो अवधारण नीतिअनुसार `APP_LOG_RETENTION_DAYS` / `CALL_LOG_RETENTION_DAYS`
  समायोजन गर्नुहोस्। पूर्वनिर्धारित 7-दिने अवधि सतर्कतापूर्वक राखिएको हो।
- तपाईंको अनुपालन कार्यक्रमले मागेको अन्तरालमा अडिट तालिकालाई प्लेटफर्मबाहिर
  (`sqlite3 dump`) निर्यात गर्नुहोस् — कुनै अन्तर्निर्मित अभिलेखीकरण उपलब्ध छैन।
- ब्रुट-फोर्स पत्ता लगाउन `auth.login.failed` र `auth.login.locked` का सङ्ख्याहरू
  ट्र्याक गर्नुहोस्।
- नयाँ प्रशासकीय अन्त्यबिन्दुहरू थप्दा, स्थिर `domain.verb.outcome` action स्ट्रिङसहित
  `logAuditEvent({ ... })` कल गर्नुहोस् र `getAuditRequestContext(request)` मार्फत
  अनुरोध सन्दर्भ पठाउनुहोस्, ताकि IP र `requestId` स्वचालित रूपमा सङ्कलन होऊन्।

## यो पनि हेर्नुहोस्

- [`docs/security/GUARDRAILS.md`](./GUARDRAILS.md) — PII मास्किङ, प्रम्प्ट इन्जेक्सन
- [`docs/frameworks/MCP-SERVER.md`](../frameworks/MCP-SERVER.md) — MCP उपकरण सूची र स्कोपहरू
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md) — वातावरण चलसम्बन्धी पूर्ण सन्दर्भ
- स्रोत: `src/lib/compliance/`, `src/app/api/compliance/`,
  `src/app/api/mcp/audit/`, `src/lib/logEnv.ts`
