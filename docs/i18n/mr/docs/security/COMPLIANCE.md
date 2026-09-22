# Compliance & Audit (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../security/COMPLIANCE.md) · 🇪🇹 [am](../../../am/docs/security/COMPLIANCE.md) · 🇸🇦 [ar](../../../ar/docs/security/COMPLIANCE.md) · 🇦🇿 [az](../../../az/docs/security/COMPLIANCE.md) · 🇧🇬 [bg](../../../bg/docs/security/COMPLIANCE.md) · 🇧🇩 [bn](../../../bn/docs/security/COMPLIANCE.md) · 🇧🇦 [bs](../../../bs/docs/security/COMPLIANCE.md) · 🇨🇿 [cs](../../../cs/docs/security/COMPLIANCE.md) · 🇩🇰 [da](../../../da/docs/security/COMPLIANCE.md) · 🇩🇪 [de](../../../de/docs/security/COMPLIANCE.md) · 🇬🇷 [el](../../../el/docs/security/COMPLIANCE.md) · 🇪🇸 [es](../../../es/docs/security/COMPLIANCE.md) · 🇪🇪 [et](../../../et/docs/security/COMPLIANCE.md) · 🇮🇷 [fa](../../../fa/docs/security/COMPLIANCE.md) · 🇫🇮 [fi](../../../fi/docs/security/COMPLIANCE.md) · 🇫🇷 [fr](../../../fr/docs/security/COMPLIANCE.md) · 🇮🇪 [ga](../../../ga/docs/security/COMPLIANCE.md) · 🇮🇳 [gu](../../../gu/docs/security/COMPLIANCE.md) · 🇳🇬 [ha](../../../ha/docs/security/COMPLIANCE.md) · 🇮🇱 [he](../../../he/docs/security/COMPLIANCE.md) · 🇮🇳 [hi](../../../hi/docs/security/COMPLIANCE.md) · 🇭🇷 [hr](../../../hr/docs/security/COMPLIANCE.md) · 🇭🇺 [hu](../../../hu/docs/security/COMPLIANCE.md) · 🇦🇲 [hy](../../../hy/docs/security/COMPLIANCE.md) · 🇮🇩 [id](../../../id/docs/security/COMPLIANCE.md) · 🇳🇬 [ig](../../../ig/docs/security/COMPLIANCE.md) · 🇮🇹 [it](../../../it/docs/security/COMPLIANCE.md) · 🇯🇵 [ja](../../../ja/docs/security/COMPLIANCE.md) · 🇬🇪 [ka](../../../ka/docs/security/COMPLIANCE.md) · 🇰🇭 [km](../../../km/docs/security/COMPLIANCE.md) · 🇮🇳 [kn](../../../kn/docs/security/COMPLIANCE.md) · 🇰🇷 [ko](../../../ko/docs/security/COMPLIANCE.md) · 🇱🇹 [lt](../../../lt/docs/security/COMPLIANCE.md) · 🇱🇻 [lv](../../../lv/docs/security/COMPLIANCE.md) · 🇮🇳 [ml](../../../ml/docs/security/COMPLIANCE.md) · 🇲🇾 [ms](../../../ms/docs/security/COMPLIANCE.md) · 🇲🇹 [mt](../../../mt/docs/security/COMPLIANCE.md) · 🇲🇲 [my](../../../my/docs/security/COMPLIANCE.md) · 🇳🇵 [ne](../../../ne/docs/security/COMPLIANCE.md) · 🇳🇱 [nl](../../../nl/docs/security/COMPLIANCE.md) · 🇳🇴 [no](../../../no/docs/security/COMPLIANCE.md) · 🇮🇳 [or](../../../or/docs/security/COMPLIANCE.md) · 🇮🇳 [pa](../../../pa/docs/security/COMPLIANCE.md) · 🇵🇭 [phi](../../../phi/docs/security/COMPLIANCE.md) · 🇵🇱 [pl](../../../pl/docs/security/COMPLIANCE.md) · 🇵🇹 [pt](../../../pt/docs/security/COMPLIANCE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/COMPLIANCE.md) · 🇷🇴 [ro](../../../ro/docs/security/COMPLIANCE.md) · 🇷🇺 [ru](../../../ru/docs/security/COMPLIANCE.md) · 🇱🇰 [si](../../../si/docs/security/COMPLIANCE.md) · 🇸🇰 [sk](../../../sk/docs/security/COMPLIANCE.md) · 🇸🇮 [sl](../../../sl/docs/security/COMPLIANCE.md) · 🇷🇸 [sr](../../../sr/docs/security/COMPLIANCE.md) · 🇸🇪 [sv](../../../sv/docs/security/COMPLIANCE.md) · 🇰🇪 [sw](../../../sw/docs/security/COMPLIANCE.md) · 🇮🇳 [ta](../../../ta/docs/security/COMPLIANCE.md) · 🇮🇳 [te](../../../te/docs/security/COMPLIANCE.md) · 🇹🇭 [th](../../../th/docs/security/COMPLIANCE.md) · 🇹🇷 [tr](../../../tr/docs/security/COMPLIANCE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/COMPLIANCE.md) · 🇵🇰 [ur](../../../ur/docs/security/COMPLIANCE.md) · 🇺🇿 [uz](../../../uz/docs/security/COMPLIANCE.md) · 🇻🇳 [vi](../../../vi/docs/security/COMPLIANCE.md) · 🇳🇬 [yo](../../../yo/docs/security/COMPLIANCE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/COMPLIANCE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/COMPLIANCE.md)

---

> **सत्याचा अधिकृत स्रोत:** `src/lib/compliance/`, `src/app/api/compliance/`
> **शेवटचे अद्यतन:** 2026-06-28 — v3.8.40

OmniRoute प्रशासकीय कृती, प्रमाणीकरण इव्हेंट, प्रदाता क्रेडेन्शियलच्या जीवनचक्रातील बदल आणि MCP साधनांची आवाहने SQLite-समर्थित ऑडिट तक्त्यांमध्ये नोंदवते. काय लॉग केले जाते, ते कुठे साठवले जाते, किती काळ राखून ठेवले जाते, API कीज लॉगिंगमधून कशा वगळल्या जाऊ शकतात आणि डेटाची क्वेरी कशी करावी, हे या पृष्ठावर स्पष्ट केले आहे.

अंमलबजावणी `src/lib/compliance/index.ts` (T-43 — "अनुपालन नियंत्रणे") आणि `src/lib/compliance/providerAudit.ts` मध्ये आहे. ऑडिट लेखन कधीही अपवाद निर्माण करत नाही: कोणतेही अपयश आल्यास कॉल कोणतीही सूचना न देता दुर्लक्षित केला जातो, जेणेकरून ऑडिट लॉगिंगमुळे मुख्य विनंती प्रवाहात अडथळा येऊ नये.

## काय लॉग केले जाते

### प्रशासकीय ऑडिट इव्हेंट (`audit_log`)

`logAuditEvent({ action, actor, target, details, ... })` ला केलेला प्रत्येक कॉल एक पंक्ती तयार करतो. कृती स्ट्रिंग `domain.verb` (किंवा `domain.verb.outcome`) नमुन्याचे अनुसरण करतात. कोडबेसमध्ये निश्चित केलेल्या कृती प्रकारांमध्ये पुढील प्रकार समाविष्ट आहेत:

| कृती                                 | स्रोत                                   |
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

प्रत्येक नोंदीमध्ये `action`, `actor` (डीफॉल्ट मूल्य `"system"`), `target`, `details`/`metadata` (JSON), `ip_address`, `resource_type`, `status`, `request_id` आणि `timestamp` नोंदवले जातात. पंक्ती लिहिण्यापूर्वी संवेदनशील कीज (`apiKey`, `accessToken`, `refreshToken`, `password`, `*token`/`*secret`/`*apikey` शी जुळणारी कोणतीही की इत्यादी) पुनरावर्ती पद्धतीने `"[redacted]"` म्हणून लपवल्या जातात.

### MCP साधन कॉल (`mcp_tool_audit`)

प्रत्येक MCP साधन आवाहन `open-sse/mcp-server/audit.ts` द्वारे एक पंक्ती लिहिते. स्कीमा (`src/lib/db/migrations/002_mcp_a2a_tables.sql` मधून):

| स्तंभ            | नोंदी                                  |
| ---------------- | -------------------------------------- |
| `id`             | स्वयं-वर्धित                           |
| `tool_name`      | MCP साधन अभिज्ञापक                     |
| `input_hash`     | इनपुटचा sha256 (पेलोड साठवला जात नाही) |
| `output_summary` | लहान, संक्षिप्त केलेला सारांश          |
| `duration_ms`    | प्रत्यक्ष लागलेला वेळ                  |
| `api_key_id`     | कॉल करणारा (रिक्त असू शकतो)            |
| `success`        | `1` / `0`                              |
| `error_code`     | अपयश आल्यास अंतिम त्रुटी कोड           |
| `created_at`     | ISO टाइमस्टॅम्प                        |

### विनंती / वापर लॉग

हे कार्यान्वयनविषयक टेलिमेट्री आहे (काटेकोरपणे प्रशासकीय ऑडिट नाही), परंतु त्यासाठीही समान धारणा पाइपलाइन वापरली जाते:

- `usage_history` — प्रत्येक विनंतीनुसार वापराचा एकत्रित सारांश
- `call_logs` — प्रत्येक विनंतीचा संपूर्ण लॉग (पंक्ती-मर्यादेच्या अधीन, खाली पहा)
- `proxy_logs` — प्रॉक्सी ट्रॅफिक लॉग (पंक्ती-मर्यादेच्या अधीन)
- `request_detail_logs` — जुना तपशीलवार विनंती लॉग (अस्तित्वात असल्यास अजूनही छाटला जातो)

## संचयन स्कीमा

पहिल्यांदा वापरल्यावर `ensureAuditLogSchema()` द्वारे `audit_log` आवश्यकतेनुसार तयार केले जाते:

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

`timestamp`, `action`, `actor`, `resource_type`, `status`, आणि `request_id` यांवर इंडेक्स तयार केले जातात. जुन्या DBs मध्ये नसलेले स्तंभ आवश्यकतेनुसार `ALTER TABLE` द्वारे जोडले जातात.

## धारणा आणि साफसफाई

दोन स्वतंत्र धारणा कालावधींचे पालन केले जाते:

| पर्यावरण चल                 | डीफॉल्ट  | यांना लागू                                                        |
| --------------------------- | -------- | ----------------------------------------------------------------- |
| `APP_LOG_RETENTION_DAYS`    | `7`      | `audit_log`, `mcp_tool_audit`                                     |
| `CALL_LOG_RETENTION_DAYS`   | `7`      | `usage_history`, `call_logs`, `proxy_logs`, `request_detail_logs` |
| `CALL_LOGS_TABLE_MAX_ROWS`  | `100000` | `call_logs` साठी पंक्ती-मर्यादा छाटणी                             |
| `PROXY_LOGS_TABLE_MAX_ROWS` | `100000` | `proxy_logs` साठी पंक्ती-मर्यादा छाटणी                            |

`cleanupExpiredLogs()` धारणा प्रक्रिया चालवते. सर्व्हर सुरू होताना `src/instrumentation-node.ts` मधून ती आवाहन केली जाते. प्रत्येक रनमध्ये प्रत्येक टेबलासाठी हटवलेल्या नोंदींच्या संख्येसह `compliance.cleanup` ऑडिट इव्हेंट लॉग केला जातो. दीर्घकाळ टिकणारे लेखन लॉक टाळण्यासाठी प्रॉक्सी/कॉल लॉगची छाटणी बॅचमध्ये (`BATCH_SIZE = 5000`) केली जाते.

मॅन्युअल विनंती-इतिहास साफसफाई ही धारणा प्रक्रियेपासून स्वतंत्र आहे. Request Logs पृष्ठ `POST /api/settings/purge-request-history` ला कॉल करते, ज्यामुळे `call_logs`, जुने `request_detail_logs`, आणि `${DATA_DIR}/call_logs/` अंतर्गत स्थानिक विनंती आर्टिफॅक्ट्स हटवले जातात.

डीफॉल्ट मूल्ये `src/lib/logEnv.ts` मध्ये परिभाषित केली आहेत (`DEFAULT_APP_LOG_RETENTION_DAYS = 7`, `DEFAULT_CALL_LOG_RETENTION_DAYS = 7`).

## `noLog` ऑप्ट-आउट (प्रत्येक API कीसाठी)

API कींना फ्लॅग केले जाऊ शकते, ज्यामुळे त्यांची डाउनस्ट्रीम कॉल ट्रॅफिक लॉग केली जात नाही. हा फ्लॅग `api_keys` टेबलमध्ये (`no_log INTEGER DEFAULT 0`) असतो आणि हॉट-पाथ लुकअपसाठी इन-मेमरी सेटमध्ये प्रतिबिंबित केला जातो.

```bash
# नो-लॉग की तयार करा (व्यवस्थापन प्रमाणीकरण आवश्यक)
curl -X POST http://localhost:20128/api/keys \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"name": "Privacy key", "noLog": true}'
```

सहाय्यक (`src/lib/compliance/index.ts`):

- `setNoLog(apiKeyId, true|false)` — इन-मेमरी नोंद टॉगल करते
- `isNoLog(apiKeyId)` — विनंती पथावर तपासले जाते; ते `api_keys.no_log` मधून 30 s कॅश केलेल्या वाचनावर फॉलबॅक करते
- `NO_LOG_API_KEY_IDS` (env, स्वल्पविरामाने विभक्त) — बूटच्या वेळी इन-मेमरी सेटमध्ये प्रीलोड केले जाते; तुम्ही स्तंभ थेट टॉगल करू शकत नसल्यास उपयुक्त

प्रशासकीय ऑडिट इव्हेंट्स (लॉगिन, प्रदाता बदल, MCP टूल कॉल्स इत्यादी) `noLog` मुळे **प्रभावित होत नाहीत** — केवळ प्रत्येक-विनंती ट्रॅफिक लॉगिंगमधून ऑप्ट-आउट केले जाते.

## REST API

| एंडपॉइंट                    | पद्धत | वर्णन                                      | प्रमाणीकरण |
| --------------------------- | ----- | ------------------------------------------ | ---------- |
| `/api/compliance/audit-log` | `GET` | फिल्टर्ससह पृष्ठांकित प्रशासकीय ऑडिट नोंदी | व्यवस्थापन |
| `/api/mcp/audit`            | `GET` | पृष्ठांकित MCP साधन ऑडिट नोंदी             | (open-sse) |
| `/api/mcp/audit/stats`      | `GET` | एकत्रित MCP ऑडिट आकडेवारी                  | (open-sse) |

सध्या कोणताही CSV निर्यात एंडपॉइंट उपलब्ध नाही — डॅशबोर्डमधून निर्यात करा किंवा
SQLite डेटाबेसवर थेट क्वेरी करा.

### `/api/compliance/audit-log` ची क्वेरी करणे

समर्थित क्वेरी पॅरामीटर्स (सर्व ऐच्छिक, मजकूर फिल्टर्ससाठी सर्व
`LIKE %value%` जुळणी वापरतात):

- `action`, `actor`, `target`, `resourceType` (किंवा `resource_type`),
  `status`, `requestId` (किंवा `request_id`)
- `from` / `since`, `to` / `until` — ISO टाइमस्टॅम्प्स
- `limit` (डीफॉल्ट `50`, किमान `1`, कमाल `500`)
- `offset` (डीफॉल्ट `0`, कमाल `10_000`)

प्रतिसाद हा JSON अॅरे असतो. पृष्ठांकन मेटाडेटा हेडर्समध्ये परत केला जातो:
`x-total-count`, `x-page-limit`, `x-page-offset`.

```bash
curl "http://localhost:20128/api/compliance/audit-log?action=provider.credentials&from=2026-05-01" \
  -H "Cookie: auth_token=..."
```

## डॅशबोर्ड

डॅशबोर्डमध्ये ऑडिट डेटा **`/dashboard/audit`** येथे उपलब्ध आहे
(`src/app/(dashboard)/dashboard/audit/page.tsx`). पृष्ठावर दोन टॅब आहेत:

- **अनुपालन** (`ComplianceTab.tsx`) — `/api/compliance/audit-log` मधील
  प्रशासकीय ऑडिट इव्हेंट्स. इव्हेंट प्रकार, तीव्रता (माहिती / चेतावणी
  / गंभीर, action + status वरून व्युत्पन्न) आणि दिनांक श्रेणीनुसार फिल्टर करते. तीव्रता
  action/status स्ट्रिंग्सवरून क्लायंट-साइडवर मोजली जाते.
- **MCP** (`McpAuditTab.tsx`) — `/api/mcp/audit` मधील MCP साधन ऑडिट,
  साधनाचे नाव आणि यश/अपयश यानुसार फिल्टर्ससह.

दोन्ही टॅब अनुक्रमे `50` (अनुपालन) आणि `25` (MCP) या पृष्ठ आकारांसह पृष्ठांकन करतात.

## प्रोव्हायडर क्रेडेन्शियल सहाय्यक

`src/lib/compliance/providerAudit.ts` मध्ये प्रोव्हायडर-व्यवस्थापन रूट्सद्वारे
क्रेडेन्शियल इव्हेंट्स उत्सर्जित करताना वापरले जाणारे आकार-निर्धारण सहाय्यक उपलब्ध आहेत:

- `summarizeProviderConnectionForAudit(connection)` — कनेक्शन स्नॅपशॉट
  `details` मध्ये लिहिण्यापूर्वी `apiKey`, `accessToken`, `refreshToken`, `idToken` आणि
  `providerSpecificData.consoleApiKey` काढून टाकते.
- `getProviderAuditTarget(connection)` — `target` फील्डसाठी स्थिर
  `"<provider>:<name|id>"` स्ट्रिंग तयार करते.
- `extractProviderWarnings(...payloads)` — प्रोव्हायडर प्रतिसादांमध्ये
  धोरण/सुरक्षा चेतावण्यांसाठी (`[sanitizer]`, `prompt injection detected`,
  `content has been filtered`, `safety filter`, `policy violation`) स्कॅन करते आणि
  जास्तीत जास्त 5 जुळण्या दर्शवते, ज्यांपैकी प्रत्येक 400 वर्णांपर्यंत संक्षिप्त केलेली असते.

## सर्वोत्तम पद्धती

- PII (कायदेशीर, वैद्यकीय इ.) हाताळणाऱ्या API कीजना `noLog: true` ने चिन्हांकित करा.
- आपल्या धारणा धोरणाची पूर्तता करण्यासाठी `APP_LOG_RETENTION_DAYS` /
  `CALL_LOG_RETENTION_DAYS` समायोजित करा. 7 दिवसांची डीफॉल्ट मूल्ये सावधगिरीची आहेत.
- आपल्या अनुपालन कार्यक्रमासाठी आवश्यक असलेल्या वारंवारतेनुसार ऑडिट टेबल
  प्लॅटफॉर्मबाहेर (`sqlite3 dump`) निर्यात करा — कोणतेही अंगभूत संग्रहण उपलब्ध नाही.
- ब्रूट-फोर्स शोधण्यासाठी `auth.login.failed` आणि `auth.login.locked`
  यांच्या संख्येचा मागोवा घ्या.
- नवीन प्रशासकीय एंडपॉइंट्स जोडताना, स्थिर `domain.verb.outcome` action स्ट्रिंगसह
  `logAuditEvent({ ... })` कॉल करा आणि विनंतीचा संदर्भ
  `getAuditRequestContext(request)` द्वारे द्या, जेणेकरून IP आणि `requestId`
  स्वयंचलितपणे कॅप्चर केले जातील.

## हे देखील पहा

- [`docs/security/GUARDRAILS.md`](./GUARDRAILS.md) — PII मास्किंग, प्रॉम्प्ट इंजेक्शन
- [`docs/frameworks/MCP-SERVER.md`](../frameworks/MCP-SERVER.md) — MCP साधन सूची आणि व्याप्ती
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md) — पर्यावरणीय चलांचा संपूर्ण संदर्भ
- स्रोत: `src/lib/compliance/`, `src/app/api/compliance/`,
  `src/app/api/mcp/audit/`, `src/lib/logEnv.ts`
