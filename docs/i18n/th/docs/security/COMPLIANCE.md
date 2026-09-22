# Compliance & Audit (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../security/COMPLIANCE.md) · 🇪🇹 [am](../../../am/docs/security/COMPLIANCE.md) · 🇸🇦 [ar](../../../ar/docs/security/COMPLIANCE.md) · 🇦🇿 [az](../../../az/docs/security/COMPLIANCE.md) · 🇧🇬 [bg](../../../bg/docs/security/COMPLIANCE.md) · 🇧🇩 [bn](../../../bn/docs/security/COMPLIANCE.md) · 🇨🇿 [cs](../../../cs/docs/security/COMPLIANCE.md) · 🇩🇰 [da](../../../da/docs/security/COMPLIANCE.md) · 🇩🇪 [de](../../../de/docs/security/COMPLIANCE.md) · 🇬🇷 [el](../../../el/docs/security/COMPLIANCE.md) · 🇪🇸 [es](../../../es/docs/security/COMPLIANCE.md) · 🇪🇪 [et](../../../et/docs/security/COMPLIANCE.md) · 🇮🇷 [fa](../../../fa/docs/security/COMPLIANCE.md) · 🇫🇮 [fi](../../../fi/docs/security/COMPLIANCE.md) · 🇫🇷 [fr](../../../fr/docs/security/COMPLIANCE.md) · 🇮🇪 [ga](../../../ga/docs/security/COMPLIANCE.md) · 🇮🇳 [gu](../../../gu/docs/security/COMPLIANCE.md) · 🇳🇬 [ha](../../../ha/docs/security/COMPLIANCE.md) · 🇮🇱 [he](../../../he/docs/security/COMPLIANCE.md) · 🇮🇳 [hi](../../../hi/docs/security/COMPLIANCE.md) · 🇭🇷 [hr](../../../hr/docs/security/COMPLIANCE.md) · 🇭🇺 [hu](../../../hu/docs/security/COMPLIANCE.md) · 🇦🇲 [hy](../../../hy/docs/security/COMPLIANCE.md) · 🇮🇩 [id](../../../id/docs/security/COMPLIANCE.md) · 🇳🇬 [ig](../../../ig/docs/security/COMPLIANCE.md) · 🇮🇹 [it](../../../it/docs/security/COMPLIANCE.md) · 🇯🇵 [ja](../../../ja/docs/security/COMPLIANCE.md) · 🇬🇪 [ka](../../../ka/docs/security/COMPLIANCE.md) · 🇰🇭 [km](../../../km/docs/security/COMPLIANCE.md) · 🇮🇳 [kn](../../../kn/docs/security/COMPLIANCE.md) · 🇰🇷 [ko](../../../ko/docs/security/COMPLIANCE.md) · 🇱🇹 [lt](../../../lt/docs/security/COMPLIANCE.md) · 🇱🇻 [lv](../../../lv/docs/security/COMPLIANCE.md) · 🇮🇳 [ml](../../../ml/docs/security/COMPLIANCE.md) · 🇮🇳 [mr](../../../mr/docs/security/COMPLIANCE.md) · 🇲🇾 [ms](../../../ms/docs/security/COMPLIANCE.md) · 🇲🇹 [mt](../../../mt/docs/security/COMPLIANCE.md) · 🇲🇲 [my](../../../my/docs/security/COMPLIANCE.md) · 🇳🇵 [ne](../../../ne/docs/security/COMPLIANCE.md) · 🇳🇱 [nl](../../../nl/docs/security/COMPLIANCE.md) · 🇳🇴 [no](../../../no/docs/security/COMPLIANCE.md) · 🇮🇳 [or](../../../or/docs/security/COMPLIANCE.md) · 🇮🇳 [pa](../../../pa/docs/security/COMPLIANCE.md) · 🇵🇭 [phi](../../../phi/docs/security/COMPLIANCE.md) · 🇵🇱 [pl](../../../pl/docs/security/COMPLIANCE.md) · 🇵🇹 [pt](../../../pt/docs/security/COMPLIANCE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/COMPLIANCE.md) · 🇷🇴 [ro](../../../ro/docs/security/COMPLIANCE.md) · 🇷🇺 [ru](../../../ru/docs/security/COMPLIANCE.md) · 🇱🇰 [si](../../../si/docs/security/COMPLIANCE.md) · 🇸🇰 [sk](../../../sk/docs/security/COMPLIANCE.md) · 🇸🇮 [sl](../../../sl/docs/security/COMPLIANCE.md) · 🇷🇸 [sr](../../../sr/docs/security/COMPLIANCE.md) · 🇸🇪 [sv](../../../sv/docs/security/COMPLIANCE.md) · 🇰🇪 [sw](../../../sw/docs/security/COMPLIANCE.md) · 🇮🇳 [ta](../../../ta/docs/security/COMPLIANCE.md) · 🇮🇳 [te](../../../te/docs/security/COMPLIANCE.md) · 🇹🇷 [tr](../../../tr/docs/security/COMPLIANCE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/COMPLIANCE.md) · 🇵🇰 [ur](../../../ur/docs/security/COMPLIANCE.md) · 🇺🇿 [uz](../../../uz/docs/security/COMPLIANCE.md) · 🇻🇳 [vi](../../../vi/docs/security/COMPLIANCE.md) · 🇳🇬 [yo](../../../yo/docs/security/COMPLIANCE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/COMPLIANCE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/COMPLIANCE.md)

---

> **แหล่งข้อมูลอ้างอิงหลัก:** `src/lib/compliance/`, `src/app/api/compliance/`
> **อัปเดตล่าสุด:** 2026-06-28 — v3.8.40

OmniRoute บันทึกการดำเนินการของผู้ดูแลระบบ เหตุการณ์การยืนยันตัวตน การเปลี่ยนแปลงวงจรชีวิตของข้อมูลประจำตัวผู้ให้บริการ และการเรียกใช้เครื่องมือ MCP ลงในตารางตรวจสอบที่ใช้ SQLite เป็นฐาน หน้านี้อธิบายว่ามีการบันทึกข้อมูลใดบ้าง ข้อมูลถูกจัดเก็บไว้ที่ใด เก็บรักษาไว้นานเพียงใด คีย์ API สามารถเลือกไม่เข้าร่วมได้อย่างไร และวิธีสืบค้นข้อมูล

การใช้งานอยู่ใน `src/lib/compliance/index.ts` (T-43 — "การควบคุมการปฏิบัติตามข้อกำหนด") และ `src/lib/compliance/providerAudit.ts` การเขียนบันทึกการตรวจสอบจะไม่โยนข้อผิดพลาด โดยเมื่อเกิดความล้มเหลวใดๆ การเรียกจะถูกละเว้นโดยไม่มีการแจ้งเตือน เพื่อไม่ให้การบันทึกการตรวจสอบขัดขวางโฟลว์คำขอหลัก

## ข้อมูลที่ถูกบันทึก

### เหตุการณ์ตรวจสอบของผู้ดูแลระบบ (`audit_log`)

ทุกการเรียก `logAuditEvent({ action, actor, target, details, ... })` จะสร้างข้อมูลหนึ่งแถว สตริงการดำเนินการใช้รูปแบบ `domain.verb` (หรือ `domain.verb.outcome`) ประเภทการดำเนินการที่ยืนยันว่ามีอยู่ในซอร์สโค้ด ได้แก่:

| การดำเนินการ                         | แหล่งที่มา                              |
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

แต่ละรายการจะบันทึก `action`, `actor` (ค่าเริ่มต้นคือ `"system"`), `target`, `details`/`metadata` (JSON), `ip_address`, `resource_type`, `status`, `request_id` และ `timestamp` คีย์ที่มีข้อมูลละเอียดอ่อน (`apiKey`, `accessToken`, `refreshToken`, `password`, รายการใดๆ ที่ตรงกับ `*token`/`*secret`/`*apikey` เป็นต้น) จะถูกปกปิดแบบเรียกซ้ำเป็น `"[redacted]"` ก่อนเขียนข้อมูลลงในแถว

### การเรียกใช้เครื่องมือ MCP (`mcp_tool_audit`)

ทุกการเรียกใช้เครื่องมือ MCP จะเขียนข้อมูลหนึ่งแถวผ่าน `open-sse/mcp-server/audit.ts` สคีมา (จาก `src/lib/db/migrations/002_mcp_a2a_tables.sql`):

| คอลัมน์          | หมายเหตุ                                   |
| ---------------- | ------------------------------------------ |
| `id`             | เพิ่มค่าโดยอัตโนมัติ                       |
| `tool_name`      | ตัวระบุเครื่องมือ MCP                      |
| `input_hash`     | sha256 ของอินพุต (ไม่มีการจัดเก็บเพย์โหลด) |
| `output_summary` | สรุปแบบย่อที่ถูกตัดให้สั้น                 |
| `duration_ms`    | เวลาที่ผ่านไปจริง                          |
| `api_key_id`     | ผู้เรียก (อนุญาตให้เป็นค่าว่าง)            |
| `success`        | `1` / `0`                                  |
| `error_code`     | รหัสข้อผิดพลาดสุดท้ายเมื่อเกิดความล้มเหลว  |
| `created_at`     | การประทับเวลา ISO                          |

### บันทึกคำขอ / การใช้งาน

ข้อมูลเหล่านี้เป็นเทเลเมทรีด้านการดำเนินงาน (ไม่ใช่การตรวจสอบของผู้ดูแลระบบโดยตรง) แต่ใช้กระบวนการเก็บรักษาข้อมูลเดียวกัน:

- `usage_history` — สรุปการใช้งานต่อคำขอ
- `call_logs` — บันทึกแบบเต็มต่อคำขอ (อยู่ภายใต้ขีดจำกัดจำนวนแถว โปรดดูด้านล่าง)
- `proxy_logs` — บันทึกทราฟฟิกพร็อกซี (อยู่ภายใต้ขีดจำกัดจำนวนแถว)
- `request_detail_logs` — บันทึกรายละเอียดคำขอแบบเดิม (ยังคงถูกล้างข้อมูลหากมีอยู่)

## สคีมาพื้นที่จัดเก็บข้อมูล

`audit_log` จะถูกสร้างแบบล่าช้าโดย `ensureAuditLogSchema()` เมื่อมีการใช้งานครั้งแรก:

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

ดัชนีจะถูกสร้างขึ้นบน `timestamp`, `action`, `actor`, `resource_type`,
`status` และ `request_id` คอลัมน์ที่ขาดหายไปในฐานข้อมูลรุ่นเก่าจะถูกเพิ่มผ่าน
`ALTER TABLE` ตามความจำเป็น

## การเก็บรักษาและการล้างข้อมูล

ระบบรองรับระยะเวลาการเก็บรักษาแยกกันสองแบบ:

| ตัวแปรสภาพแวดล้อม           | ค่าเริ่มต้น | ใช้กับ                                                            |
| --------------------------- | ----------- | ----------------------------------------------------------------- |
| `APP_LOG_RETENTION_DAYS`    | `7`         | `audit_log`, `mcp_tool_audit`                                     |
| `CALL_LOG_RETENTION_DAYS`   | `7`         | `usage_history`, `call_logs`, `proxy_logs`, `request_detail_logs` |
| `CALL_LOGS_TABLE_MAX_ROWS`  | `100000`    | การตัดแต่งจำนวนแถวสูงสุดสำหรับ `call_logs`                        |
| `PROXY_LOGS_TABLE_MAX_ROWS` | `100000`    | การตัดแต่งจำนวนแถวสูงสุดสำหรับ `proxy_logs`                       |

`cleanupExpiredLogs()` จะดำเนินการตามนโยบายการเก็บรักษา โดยจะถูกเรียกใช้เมื่อเซิร์ฟเวอร์เริ่มทำงาน
จาก `src/instrumentation-node.ts` การทำงานแต่ละครั้งจะบันทึกเหตุการณ์การตรวจสอบ
`compliance.cleanup` พร้อมจำนวนรายการที่ลบแยกตามตาราง การตัดแต่งบันทึกพร็อกซี/การเรียก
จะดำเนินการเป็นชุด (`BATCH_SIZE = 5000`) เพื่อหลีกเลี่ยงการล็อกการเขียนเป็นเวลานาน

การล้างประวัติคำขอด้วยตนเองจะแยกออกจากนโยบายการเก็บรักษา หน้า Request Logs
จะเรียก `POST /api/settings/purge-request-history` ซึ่งจะลบ `call_logs`,
`request_detail_logs` แบบเดิม และอาร์ติแฟกต์คำขอภายในเครื่องที่อยู่ภายใต้
`${DATA_DIR}/call_logs/`

ค่าเริ่มต้นกำหนดไว้ใน `src/lib/logEnv.ts`
(`DEFAULT_APP_LOG_RETENTION_DAYS = 7`, `DEFAULT_CALL_LOG_RETENTION_DAYS = 7`)

## การเลือกไม่บันทึกด้วย `noLog` (ต่อคีย์ API)

คีย์ API สามารถถูกทำเครื่องหมายเพื่อไม่ให้บันทึกทราฟฟิกการเรียกปลายทางของคีย์นั้นได้
แฟล็กนี้อยู่ในตาราง `api_keys` (`no_log INTEGER DEFAULT 0`) และถูกทำสำเนา
ไปยังเซตในหน่วยความจำเพื่อใช้ค้นหาในเส้นทางที่ต้องการประสิทธิภาพสูง

```bash
# สร้างคีย์ที่ไม่บันทึกข้อมูล (ต้องมีสิทธิ์การจัดการ)
curl -X POST http://localhost:20128/api/keys \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"name": "Privacy key", "noLog": true}'
```

ฟังก์ชันช่วยเหลือ (`src/lib/compliance/index.ts`):

- `setNoLog(apiKeyId, true|false)` — เปิดหรือปิดรายการในหน่วยความจำ
- `isNoLog(apiKeyId)` — ตรวจสอบในเส้นทางคำขอ และหากไม่พบจะย้อนกลับไปอ่านจาก
  `api_keys.no_log` โดยแคชไว้เป็นเวลา 30 วินาที
- `NO_LOG_API_KEY_IDS` (ตัวแปรสภาพแวดล้อม คั่นด้วยจุลภาค) — โหลดล่วงหน้าเข้าสู่เซตในหน่วยความจำ
  เมื่อเริ่มระบบ มีประโยชน์เมื่อคุณไม่สามารถสลับค่าคอลัมน์ได้โดยตรง

เหตุการณ์การตรวจสอบด้านการดูแลระบบ (การเข้าสู่ระบบ การเปลี่ยนแปลงผู้ให้บริการ การเรียกเครื่องมือ MCP ฯลฯ)
**ไม่ได้** รับผลกระทบจาก `noLog` — มีเพียงการบันทึกทราฟฟิกต่อคำขอเท่านั้น
ที่ถูกเลือกไม่ให้บันทึก

## REST API

| Endpoint                    | Method | Description                                                 | Auth       |
| --------------------------- | ------ | ----------------------------------------------------------- | ---------- |
| `/api/compliance/audit-log` | `GET`  | รายการบันทึกการตรวจสอบของผู้ดูแลระบบแบบแบ่งหน้าพร้อมตัวกรอง | การจัดการ  |
| `/api/mcp/audit`            | `GET`  | รายการบันทึกการตรวจสอบเครื่องมือ MCP แบบแบ่งหน้า            | (open-sse) |
| `/api/mcp/audit/stats`      | `GET`  | สถิติการตรวจสอบ MCP แบบรวม                                  | (open-sse) |

ปัจจุบันยังไม่มี endpoint สำหรับส่งออก CSV — ให้ส่งออกจากแดชบอร์ดหรือสืบค้น
ฐานข้อมูล SQLite โดยตรง

### การสืบค้น `/api/compliance/audit-log`

พารามิเตอร์การสืบค้นที่รองรับ (ทั้งหมดเป็นทางเลือก และตัวกรองข้อความทั้งหมดใช้
การจับคู่แบบ `LIKE %value%`):

- `action`, `actor`, `target`, `resourceType` (หรือ `resource_type`),
  `status`, `requestId` (หรือ `request_id`)
- `from` / `since`, `to` / `until` — การประทับเวลาแบบ ISO
- `limit` (ค่าเริ่มต้น `50`, ต่ำสุด `1`, สูงสุด `500`)
- `offset` (ค่าเริ่มต้น `0`, สูงสุด `10_000`)

การตอบกลับเป็นอาร์เรย์ JSON โดยข้อมูลเมตาของการแบ่งหน้าจะถูกส่งกลับมาในส่วนหัว:
`x-total-count`, `x-page-limit`, `x-page-offset`

```bash
curl "http://localhost:20128/api/compliance/audit-log?action=provider.credentials&from=2026-05-01" \
  -H "Cookie: auth_token=..."
```

## แดชบอร์ด

แดชบอร์ดแสดงข้อมูลการตรวจสอบที่ **`/dashboard/audit`**
(`src/app/(dashboard)/dashboard/audit/page.tsx`) โดยหน้าดังกล่าวมีสองแท็บ:

- **การปฏิบัติตามข้อกำหนด** (`ComplianceTab.tsx`) — เหตุการณ์การตรวจสอบของผู้ดูแลระบบจาก
  `/api/compliance/audit-log` กรองตามประเภทเหตุการณ์ ระดับความรุนแรง (ข้อมูล / คำเตือน
  / วิกฤต ซึ่งอนุมานจาก action + status) และช่วงวันที่ โดยระดับความรุนแรงจะ
  คำนวณฝั่งไคลเอนต์จากสตริง action/status
- **MCP** (`McpAuditTab.tsx`) — การตรวจสอบเครื่องมือ MCP จาก `/api/mcp/audit` พร้อม
  ตัวกรองตามชื่อเครื่องมือและสถานะสำเร็จ/ล้มเหลว

ทั้งสองแท็บแบ่งหน้าโดยใช้ขนาดหน้าที่ `50` (การปฏิบัติตามข้อกำหนด) และ `25` (MCP)

## ตัวช่วยสำหรับข้อมูลรับรองของผู้ให้บริการ

`src/lib/compliance/providerAudit.ts` มีตัวช่วยในการจัดรูปแบบข้อมูลซึ่งใช้โดย
route สำหรับการจัดการผู้ให้บริการเมื่อมีการส่งเหตุการณ์เกี่ยวกับข้อมูลรับรอง:

- `summarizeProviderConnectionForAudit(connection)` — ลบ `apiKey`,
  `accessToken`, `refreshToken`, `idToken` และ
  `providerSpecificData.consoleApiKey` ออกก่อนเขียนสแนปช็อตการเชื่อมต่อลงใน
  `details`
- `getProviderAuditTarget(connection)` — ประกอบสตริง
  `"<provider>:<name|id>"` ที่คงที่สำหรับฟิลด์ `target`
- `extractProviderWarnings(...payloads)` — สแกนการตอบกลับของผู้ให้บริการเพื่อหา
  คำเตือนด้านนโยบาย/ความปลอดภัย (`[sanitizer]`, `prompt injection detected`,
  `content has been filtered`, `safety filter`, `policy violation`) และ
  แสดงผลการตรวจพบสูงสุด 5 รายการ โดยแต่ละรายการจะถูกตัดให้เหลือ 400 อักขระ

## แนวทางปฏิบัติที่ดีที่สุด

- ทำเครื่องหมาย API key ที่จัดการ PII (ข้อมูลทางกฎหมาย การแพทย์ ฯลฯ) ด้วย `noLog: true`
- ปรับแต่ง `APP_LOG_RETENTION_DAYS` / `CALL_LOG_RETENTION_DAYS` ให้ตรงกับ
  นโยบายการเก็บรักษาข้อมูลของคุณ โดยค่าเริ่มต้น 7 วันเป็นค่าที่รัดกุม
- ส่งออกตารางการตรวจสอบไปไว้นอกแพลตฟอร์ม (`sqlite3 dump`) ตามรอบเวลาใดก็ตาม
  ที่โปรแกรมการปฏิบัติตามข้อกำหนดของคุณกำหนด — ไม่มีระบบจัดเก็บถาวรในตัว
- ติดตามจำนวน `auth.login.failed` และ `auth.login.locked` เพื่อตรวจจับ
  การโจมตีแบบ brute-force
- เมื่อเพิ่ม endpoint สำหรับผู้ดูแลระบบใหม่ ให้เรียก `logAuditEvent({ ... })` ด้วยสตริง action
  แบบ `domain.verb.outcome` ที่คงที่ และส่งบริบทของคำขอผ่าน
  `getAuditRequestContext(request)` เพื่อให้บันทึก IP และ `requestId`
  โดยอัตโนมัติ

## ดูเพิ่มเติม

- [`docs/security/GUARDRAILS.md`](./GUARDRAILS.md) — การปกปิด PII, การแทรกพรอมต์
- [`docs/frameworks/MCP-SERVER.md`](../frameworks/MCP-SERVER.md) — แค็ตตาล็อกเครื่องมือและขอบเขตของ MCP
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md) — เอกสารอ้างอิงตัวแปรสภาพแวดล้อมฉบับเต็ม
- ซอร์ส: `src/lib/compliance/`, `src/app/api/compliance/`,
  `src/app/api/mcp/audit/`, `src/lib/logEnv.ts`
