# Monitoring & Observability Guide (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **สรุปสั้นๆ**: OmniRoute มาพร้อมระบบตรวจสอบสถานภาพในตัว ระบบขับเคลื่อนอัตโนมัติสำหรับผู้ให้บริการ การติดตามโควตา และฮุกสำหรับการสังเกตการณ์ คู่มือนี้ครอบคลุมแดชบอร์ด การแจ้งเตือน และการแก้ไขปัญหา

**แหล่งข้อมูล:**

- `src/lib/monitoring/observability.ts` — สแนปช็อตการสังเกตการณ์
- `src/lib/monitoring/comboHealthAutopilot.ts` — ระบบขับเคลื่อนอัตโนมัติสำหรับสถานภาพของคอมโบ
- `src/lib/monitoring/providerHealthAutopilot.ts` — ระบบขับเคลื่อนอัตโนมัติสำหรับผู้ให้บริการ
- `src/lib/monitoring/providerHealthMatrix.ts` — เมทริกซ์สถานภาพของผู้ให้บริการ
- `src/lib/localHealthCheck.ts` — การตรวจสอบสถานภาพภายในเครื่อง
- `src/lib/tokenHealthCheck.ts` — สถานภาพการรีเฟรชโทเค็น
- `src/lib/proxyHealth.ts` — แคชสถานภาพพร็อกซี (อธิบายไว้ใน PROXY_GUIDE.md)

---

## ภาพรวม

OmniRoute มี **การตรวจสอบ 3 ชั้น**:

```
┌──────────────────────────────────────────────────────────────┐
│  ชั้นที่ 1: สถานภาพระบบ (ระดับเซิร์ฟเวอร์)                       │
│  ├─ localHealthCheck.ts — DB, พอร์ต, การพึ่งพาแบบเนทีฟ           │
│  ├─ db/healthCheck.ts — ความสมบูรณ์, FK, อาร์ติแฟกต์ที่ไม่มีเจ้าของ │
│  └─ แดชบอร์ด: /dashboard/health                               │
├──────────────────────────────────────────────────────────────┤
│  ชั้นที่ 2: สถานภาพผู้ให้บริการ (ความยืดหยุ่นรายผู้ให้บริการ)          │
│  ├─ providerHealthAutopilot.ts — เซอร์กิตเบรกเกอร์, ช่วงพัก       │
│  ├─ providerHealthMatrix.ts — คะแนนสถานภาพตามผู้ให้บริการ/โมเดล  │
│  └─ แดชบอร์ด: /dashboard/providers                            │
├──────────────────────────────────────────────────────────────┤
│  ชั้นที่ 3: การสังเกตการณ์แบบเรียลไทม์ (สแนปช็อตขณะรันไทม์)          │
│  ├─ observability.ts — เซอร์กิตเบรกเกอร์, เซสชัน, โควตา            │
│  ├─ tokenHealthCheck.ts — สถานภาพการรีเฟรชโทเค็น OAuth         │
│  └─ เครื่องมือ MCP: omniroute_get_health, omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## หน้าแดชบอร์ด

### `/dashboard/health` (สถานภาพระบบ)

แดชบอร์ดสถานภาพระดับบนสุดแสดงข้อมูลดังต่อไปนี้:

| ส่วน                 | ข้อมูลที่แสดง                                                  |
| -------------------- | -------------------------------------------------------------- |
| **สถานะเซิร์ฟเวอร์** | ระยะเวลาทำงาน, เวอร์ชัน, พอร์ต, การเชื่อมต่อที่ใช้งานอยู่      |
| **ฐานข้อมูล**        | การเชื่อมต่อ, ความสมบูรณ์, ขนาด WAL, การย้ายข้อมูลล่าสุด       |
| **สรุปผู้ให้บริการ** | จำนวนที่ใช้งานอยู่, จำนวนที่มีสถานภาพดี, จำนวนเบรกเกอร์ที่เปิด |
| **ตัวตรวจสอบโควตา**  | เซสชันที่ใช้งานอยู่, การแจ้งเตือน, โควตาที่หมดแล้ว             |
| **ข้อผิดพลาดล่าสุด** | ข้อผิดพลาด 10 รายการล่าสุดพร้อมสแต็กเทรซ                       |
| **การใช้ทรัพยากร**   | หน่วยความจำ, CPU, ตัวบ่งชี้แรงกดดันของฮีป                      |

### `/dashboard/providers` (สถานภาพผู้ให้บริการ)

แดชบอร์ดรายผู้ให้บริการ:

| คอลัมน์      | คำอธิบาย                                                 |
| ------------ | -------------------------------------------------------- |
| ผู้ให้บริการ | ID ผู้ให้บริการ + ชื่อที่ใช้แสดง                         |
| สถานภาพ      | สถานะสีเขียว/เหลือง/แดง                                  |
| เซอร์กิต     | สถานะเปิด/ปิด/เปิดครึ่งหนึ่ง                             |
| การเชื่อมต่อ | จำนวนการเชื่อมต่อ, การรีเฟรชล่าสุด                       |
| โมเดล        | โมเดลที่พร้อมใช้งาน, สถานภาพของแต่ละโมเดล                |
| ค่าใช้จ่าย   | ค่าใช้จ่ายของวันนี้, แนวโน้มในช่วง 7 วัน                 |
| ข้อผิดพลาด   | จำนวนข้อผิดพลาดใน 24 ชั่วโมงล่าสุด, คลาสข้อผิดพลาดสูงสุด |

คลิกผู้ให้บริการเพื่อดู:

- คำขอล่าสุดพร้อมรายละเอียดเวลาแฝง
- คะแนนสถานภาพของแต่ละการเชื่อมต่อ
- การล็อกเอาต์ของแต่ละโมเดล
- คำแนะนำจากระบบขับเคลื่อนอัตโนมัติ

### `/dashboard/quota` (การติดตามโควตา)

สำหรับ API key แต่ละรายการ:

- การใช้งานปัจจุบันเทียบกับขีดจำกัด (แถบความคืบหน้า)
- แนวโน้มโควตา (แผนภูมิ 30 วัน)
- เวลารีเซ็ตครั้งถัดไป
- ประวัติการแจ้งเตือน

### `/dashboard/combos` (สถานภาพคอมโบ)

สำหรับแต่ละคอมโบ:

- กลยุทธ์ + เป้าหมาย
- สถานภาพของแต่ละเป้าหมาย
- เหตุการณ์สำรองล่าสุด
- อัตราความสำเร็จ (24 ชั่วโมง, 7 วัน, 30 วัน)

---

## API ตรวจสอบสถานะ

OmniRoute เปิดให้ใช้งาน HTTP endpoint สำหรับตรวจสอบสถานะ **สอง** แบบ ซึ่งไม่สามารถใช้แทนกันได้สำหรับระบบ orchestrator

| พาธ                          | วัตถุประสงค์                                                         | ภาระ                                     | ใช้สำหรับ                                                                  |
| ---------------------------- | -------------------------------------------------------------------- | ---------------------------------------- | -------------------------------------------------------------------------- |
| `GET /healthz`               | สถานะการทำงาน/ความพร้อมตามวงจรชีวิต (`ok` / `starting` / `stopping`) | ต่ำมาก (ตรวจเฉพาะแฟล็กของเฟส)            | **readiness** ของ Kubernetes; **liveness** แบบผ่อนปรนหากจำเป็นต้องใช้ HTTP |
| `GET /api/monitoring/health` | สรุปเชิงลึกของระบบและผู้ให้บริการ (DB, heap, จำนวนแค็ตตาล็อก, …)     | สูง (งาน DB แบบซิงโครนัส / งานมอนิเตอร์) | แดชบอร์ด, การตรวจสอบเชิงลึกแบบ blackbox, healthcheck ในตัวของ Docker       |

> **หมายเหตุ:** เมทริกซ์สถานะของผู้ให้บริการ, ปัญหาของ autopilot, ตัวตรวจสอบโควตา, สถานะโทเค็น และรายละเอียด latency ที่มากกว่าจาก `/api/monitoring/health` สามารถเข้าถึงได้ผ่าน **เครื่องมือ MCP** `observability_snapshot` หรือหน้า **แดชบอร์ด** — ไม่มี REST route เฉพาะสำหรับข้อมูลเหล่านั้น

ทั้งสอง route ทำงานบน **Node event loop เดียวกัน** กับการจัดการคำขอ พาธที่ใช้ CPU สูง (เช่น งานแค็ตตาล็อกขนาดใหญ่ของ `GET /v1/models`, การบีบอัด long-context / การนับโทเค็น) อาจทำให้ตัวจัดการ HTTP **ทั้งหมด** ล่าช้า รวมถึง `/healthz` ด้วย event loop ไม่ว่าง ≠ โปรเซสหยุดทำงาน ควรแก้ไขงานที่กินทรัพยากรก่อน การปรับแต่ง probe ช่วยเพียงลดการยุติโปรเซสที่ผิดพลาดเท่านั้น

### Probe แบบน้ำหนักเบาสำหรับ orchestrator

```bash
GET /healthz
# หรือ HEAD /healthz
```

- **200** + body `ok` เมื่อเฟสวงจรชีวิตของเซิร์ฟเวอร์พร้อมใช้งาน
- **503** + `starting` / `stopping` ระหว่างการเริ่มต้นหรือการปิดระบบ
- การใช้งานจริง: `src/app/healthz/route.ts` (ไม่มีการ ping DB)

### สถานะระบบ (เชิงลึก)

```bash
GET /api/monitoring/health
```

การตอบกลับ:

```json
{
  "status": "healthy",
  "version": "3.8.16",
  "uptime": 123456,
  "checks": {
    "database": { "status": "pass", "latency_ms": 2 },
    "writeable": { "status": "pass" },
    "integrity": { "status": "pass", "result": "ok" },
    "foreign_keys": { "status": "pass", "violations": 0 },
    "heap_pressure": { "status": "pass", "usage_mb": 142, "threshold_mb": 512 },
    "active_sessions": 12,
    "providers": {
      "total": 7,
      "healthy": 6,
      "degraded": 1,
      "down": 0
    }
  }
}
```

#### `credentialHealth`: แคชของ probe เทียบกับ `test_status` ของ SQLite

`GET /api/monitoring/health` → `credentialHealth` คือ **เกจแคชของ probe ในหน่วยความจำ**
ไม่ใช่ข้อมูลสดที่ดึงมาทั้งหมดจาก `provider_connections.test_status` หลังจาก #12532
พาธคำขอจะอ่านเฉพาะ `getCachedCredentialHealthSummary()` เท่านั้น โดย probe เบื้องหลัง
จะรีเฟรชแคชนอก event loop

| เลเยอร์                          | ตำแหน่ง                                                               | ความหมาย                                                                                                                                                                                                                                      |
| -------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| เกจแคชของ probe                  | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | ผลการตรวจสอบสถานะข้อมูลประจำตัวล่าสุดที่ยังคงอยู่ในหน่วยความจำของโปรเซส `source` จะเป็น `probe-cache` เสมอ                                                                                                                                    |
| รายละเอียดการเชื่อมต่อที่ล้มเหลว | `credentialHealth.failedConnections`                                  | ปรากฏ **เฉพาะเมื่อ `failed > 0`** รายการแบบจำกัดจำนวนของแถวในแคชที่มี `status=error` (`connectionId`, `status`, `lastError` / `lastErrorType` ที่ผ่านการกรองข้อมูลละเอียดอ่อนแล้ว) ระบบจะตั้งค่า `failedOmitted` เมื่อรายการถูกตัดตามขีดจำกัด |
| สถานะคงค้างของ SQLite            | `credentialHealth.staleDbNonOkCount`                                  | จำนวนแถวการเชื่อมต่อที่ **ใช้งานอยู่** (`is_active=1`) ซึ่งมี `test_status` ที่บันทึกคงอยู่เป็นสถานะ non-ok ที่รู้จัก (`error`, `expired`, `credits_exhausted`, `banned`, `deactivated`, `unavailable`)                                       |

ข้อมูลทั้งสองเลเยอร์อาจไม่ตรงกันได้โดยตั้งใจ:

- เกจมีค่า `failed=0` ขณะที่ `staleDbNonOkCount>0` — SQLite ยังคงมี
  `test_status` แบบคงค้าง (ตัวอย่างเช่น `expired` หรือ `credits_exhausted`) ซึ่งสแนปช็อต
  แคชของ probe ล่าสุดไม่นับเป็น `status=error`
- เกจมีค่า `failed>0` ขณะที่ SQLite แสดงว่าปกติ — probe ล่าสุดล้มเหลวและผลถูก
  แคชไว้ แต่แถวใน DB ยังไม่ได้รับการอัปเดต หรือถูกล้างในภายหลัง

อย่าแจ้งเตือนโดยอาศัยเพียง `provider_connections.test_status` เมื่อดึงข้อมูลจาก
endpoint นี้ ใช้ `failed` + `failedConnections` สำหรับความล้มเหลวของ probe แบบสด และใช้
`staleDbNonOkCount` เมื่อต้องการจำนวนสถานะแบบคงค้างที่บันทึกไว้

### คำแนะนำสำหรับ probe ของ Kubernetes

OmniRoute เป็น **โปรเซส Node เดี่ยว** (มี event loop หนึ่งตัว) `HEALTHCHECK` มาตรฐานของ Docker จะเรียกใช้ `/healthz` ซึ่งมีน้ำหนักเบา ส่วน `/api/monitoring/health` **หนักเกินไป** สำหรับช่วงเวลาการตรวจสอบ liveness ของ kubelet

| โพรบ              | เป้าหมายที่แนะนำ                                                                | หมายเหตุ                                                                                                                                                                                                                                                                                                                                                   |
| ----------------- | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **การเริ่มต้น**   | HTTP `GET /healthz` พร้อม `failureThreshold` ที่ยาว (หรือ `startPeriod` ที่มาก) | การเริ่มต้นแบบ cold start + การย้ายข้อมูล SQLite อาจใช้เวลานานกว่าสองสามวินาที                                                                                                                                                                                                                                                                             |
| **ความพร้อม**     | HTTP `GET /healthz`                                                             | สถานะวงจรชีวิต `ok` / `starting` / `stopping` (200 เทียบกับ 503) ยังคงสลับสถานะไปมาได้หากลูปถูกบล็อกด้วย CPU การได้รับ **200 หลังจากผ่านไปหลายวินาทีไม่ได้หมายความว่าระบบทำงานปกติ** (#10303) — แต่หมายความว่า event loop ไม่ได้รับเวลาประมวลผลก่อนที่ตัวจัดการขนาด 3 ไบต์จะทำงาน                                                                          |
| **การคงอยู่**     | HTTP `GET /livez` **หรือ TCP** บนพอร์ตบริการหลัก (`PORT` ค่าเริ่มต้น `20128`)   | `/livez` ตรวจสอบเพียงว่าโปรเซสยังทำงานอยู่ (ตอบกลับ 200 เสมอหากตัวจัดการทำงาน) แต่ยังคงใช้ event loop ร่วมกัน — ไม่ว่าง ≠ หยุดทำงาน และไม่ได้ตรวจจับภาวะ event-loop starvation (#10303) ได้ดีกว่า TCP ควรเลือกใช้ **TCP** หากโพรบ HTTP หมดเวลาภายใต้โหลดจากแค็ตตาล็อก/การบีบอัด และไม่ว่าเลือกวิธีใด **อย่า** ยุติพ็อดเมื่อ event loop หยุดชะงักช่วงสั้น ๆ |
| **สุขภาพเชิงลึก** | `GET /api/monitoring/health` จากตัวตรวจสอบภายนอก                                | ไม่เหมาะสำหรับ `livenessProbe` / `readinessProbe` ที่ตรวจถี่ของ kubelet                                                                                                                                                                                                                                                                                    |

ตัวอย่างโครงสร้าง (ปรับค่าเกณฑ์ให้เหมาะกับ cold start และโหลดจากการบีบอัดของคุณ):

```yaml
ports:
  - name: http
    containerPort: 20128
startupProbe:
  httpGet:
    path: /healthz
    port: http
  failureThreshold: 30
  periodSeconds: 5
readinessProbe:
  httpGet:
    path: /healthz
    port: http
  periodSeconds: 5
  timeoutSeconds: 2
  failureThreshold: 6
livenessProbe:
  httpGet:
    path: /livez
    port: http
  periodSeconds: 10
  timeoutSeconds: 3
  failureThreshold: 6
  # เมื่อ event loop หยุดชะงัก HTTP /livez อาจยังคงหมดเวลาได้ TCP คือ
  # ทางเลือกที่ระมัดระวังกว่า:
  # tcpSocket:
  #   port: http
```

**อย่า** กำหนดให้ **liveness** ของ kubelet ชี้ไปยัง `/api/monitoring/health` พาธดังกล่าวทำงานกับฐานข้อมูล/การตรวจสอบจริง และจะรายงานผลบวกเท็จภายใต้โหลด

เรื่องที่เกี่ยวข้อง: [#10052](https://github.com/diegosouzapw/OmniRoute/issues/10052) (โพรบขณะที่ event loop ไม่ว่าง), [#9685](https://github.com/diegosouzapw/OmniRoute/issues/9685) / [#10055](https://github.com/diegosouzapw/OmniRoute/pull/10055) (การคำนวณราคาแค็ตตาล็อกใช้ทรัพยากรมาก), [#10117](https://github.com/diegosouzapw/OmniRoute/issues/10117) (การนับโทเค็นสำหรับการบีบอัดใช้ทรัพยากรมาก)

### watchdog ของ systemd (event loop ค้าง)

บนโฮสต์ systemd นั้น OmniRoute จะแจ้งตัวจัดการบริการเมื่อพร้อมทำงานและส่งสัญญาณ ping อย่างต่อเนื่อง ดังนั้นเซิร์ฟเวอร์ที่มี event loop ค้างจะถูกยุติและเริ่มใหม่ แทนที่จะยังคงทำงานแต่ไม่ตอบสนอง สัญญาณ ping มาจาก event loop ของเซิร์ฟเวอร์เอง เมื่อ event loop ถูกบล็อก สัญญาณจะหยุดลง และ systemd จะเริ่มบริการใหม่เมื่อเวลาผ่านไปครบ `WatchdogSec` โดยไม่ได้รับสัญญาณใด ๆ

[`omniroute autostart enable`](../../bin/cli/tray/autostart.mjs) เขียนยูนิตผู้ใช้ที่มีการตั้งค่านี้ให้อยู่แล้ว ยูนิตที่คุณเขียนเอง (ค่าเริ่มต้นคือ `Type=simple`) จะไม่มี watchdog ดังนั้นให้เพิ่มบรรทัดเหล่านี้ลงในส่วน `[Service]`:

```ini
[Service]
Type=notify
NotifyAccess=all
WatchdogSec=180
TimeoutStartSec=300
```

ยูนิตที่สร้างขึ้นจะตั้งค่า `Restart=on-failure` ดังนั้นให้เพิ่มบรรทัดดังกล่าวด้วย — หากไม่มีบรรทัดนี้ watchdog จะเพียงยุติบริการที่ค้างแทนที่จะเริ่มบริการใหม่

- `Type=notify`: บริการจะถือว่า "เริ่มทำงานแล้ว" เมื่อเซิร์ฟเวอร์ส่ง `READY=1` ไม่ใช่เมื่อโปรเซส fork โดย `TimeoutStartSec` จะจำกัดระยะเวลาการเริ่มต้นที่ล่าช้า
- `NotifyAccess=all`: สัญญาณ ping ถูกส่งโดยโปรเซสเซิร์ฟเวอร์ ซึ่งเป็นโปรเซสลูกของตัวควบคุม `omniroute serve`
- `WatchdogSec`: สัญญาณ ping จะถูกส่งทุก 60 วินาที ดังนั้นให้ใช้ค่า **120 ขึ้นไป** ค่าที่น้อยกว่านี้จะทำให้เซิร์ฟเวอร์ที่ทำงานปกติถูกเริ่มใหม่
- เรียกใช้ `omniroute serve` ในโหมด foreground ตัวเลือก `--daemon` จะแยกเซิร์ฟเวอร์ออกจาก cgroup ของยูนิต และการจับมือผ่านการแจ้งเตือนจะไม่มีวันเสร็จสมบูรณ์

ตรวจสอบว่าทำงานอยู่หลังจากเริ่มใหม่:

```bash
systemctl --user show omniroute -p WatchdogUSec -p WatchdogTimestamp
```

`WatchdogUSec` แสดงระยะเวลาหน่วงที่กำหนดค่าไว้ และ `WatchdogTimestamp` จะเลื่อนไปข้างหน้าทุกนาที การเริ่มใหม่ที่เกิดจาก watchdog จะถูกบันทึกเป็น `Result=watchdog` หากต้องการปิดสัญญาณ ping โดยคงยูนิตไว้ตามเดิม ให้ตั้งค่า `OMNIROUTE_DISABLE_SD_NOTIFY=1` หากไม่มี `NOTIFY_SOCKET` (เทอร์มินัล, Docker, Electron, Windows) จะไม่มีการส่งข้อมูลใด ๆ

watchdog ตรวจสอบเพียงว่า event loop ยังทำงานต่อไป เซิร์ฟเวอร์ที่ทำงานช้าแต่ยังคงประมวลผลอยู่จะไม่ถูกเริ่มใหม่

### งานในพาธคำขอที่เลือกใช้ได้ (หน่วยความจำ, ทักษะ, การรีเฟรชโทเค็น)

การแยกหน่วยความจำ การแทรกทักษะ และการรีเฟรชโทเค็น OAuth ใช้ **ลูปเหตุการณ์หลักของ Node** ร่วมกับ `/healthz` ฟีเจอร์เหล่านี้เป็นฟีเจอร์ที่เปิดหรือปิดได้จากแดชบอร์ด (`memoryEnabled`, `skillsEnabled`) ไม่ใช่พูลของเวิร์กเกอร์ ดูที่ [สภาพแวดล้อม — ต้นทุนของลูปเหตุการณ์](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349)

### สถานะของผู้ให้บริการ

> **ไม่มี REST endpoint** ข้อมูลสถานะของผู้ให้บริการเข้าถึงได้ผ่านเครื่องมือ MCP `observability_snapshot` หรือหน้าแดชบอร์ด `/dashboard/providers`

### รายละเอียดผู้ให้บริการ

> **ไม่มี REST endpoint** รายละเอียดของผู้ให้บริการแต่ละรายเข้าถึงได้ผ่านหน้าแดชบอร์ด `/dashboard/providers`

---

## ระบบควบคุมสถานะผู้ให้บริการอัตโนมัติ

โมดูล `providerHealthAutopilot.ts` เป็น **ระบบฟื้นฟูตัวเอง** ที่:

1. ตรวจพบปัญหาของผู้ให้บริการ (วงจรเปิด ช่วงพักการเชื่อมต่อ การระงับการใช้งาน และคำเตือนโควตา)
2. สร้าง **การดำเนินการที่แนะนำ** เพื่อแก้ไขปัญหาเหล่านั้น
3. เลือก **ดำเนินการโดยอัตโนมัติ** สำหรับการดำเนินการที่มีความเสี่ยงต่ำได้

### ประเภทปัญหาที่ตรวจพบ

| ประเภทปัญหา                  | ระดับความรุนแรง | ตัวอย่างเงื่อนไข                               |
| ---------------------------- | --------------- | ---------------------------------------------- |
| `provider_circuit_open`      | วิกฤต           | ตัวตัดวงจรเปิดหลังจากล้มเหลว 5 ครั้ง           |
| `provider_circuit_half_open` | คำเตือน         | วงจรกำลังทดสอบการกู้คืน                        |
| `connection_cooldown`        | คำเตือน         | การเชื่อมต่ออยู่ในช่วงพักหลังได้รับ 429        |
| `stale_connection_error`     | คำเตือน         | การรีเฟรชล่าสุดล้มเหลวเมื่อกว่า 30 นาทีที่แล้ว |
| `terminal_connection_error`  | วิกฤต           | OAuth ถูกเพิกถอน หรือคีย์ไม่ถูกต้อง            |
| `inactive_connection`        | ข้อมูล          | การเชื่อมต่อถูกปิดใช้งานในการตั้งค่า           |
| `model_lockout`              | คำเตือน         | โมเดลที่ระบุถูกกักกัน                          |
| `quota_monitor_warning`      | คำเตือน         | ใช้โควตาไปแล้ว 80% ขึ้นไป                      |

### ประเภทการดำเนินการที่สร้างขึ้น

| การดำเนินการ                   | ความเสี่ยง | คำอธิบาย                                |
| ------------------------------ | ---------- | --------------------------------------- |
| `clear_provider_breaker`       | ปานกลาง    | รีเซ็ตตัวตัดวงจรกลับเป็นสถานะปิด        |
| `clear_connection_cooldown`    | ต่ำ        | ยกเลิกช่วงพักของการเชื่อมต่อ            |
| `clear_stale_connection_error` | ต่ำ        | ล้างแฟล็กข้อผิดพลาดที่ค้างอยู่          |
| `clear_model_lockout`          | ต่ำ        | เปิดใช้งานโมเดลที่ถูกกักกันอีกครั้ง     |
| `reactivate_connection`        | ปานกลาง    | เปิดใช้งานการเชื่อมต่อที่ถูกปิดอีกครั้ง |
| `deactivate_connection`        | สูง        | ปิดใช้งานการเชื่อมต่อที่มีปัญหา         |

### API

> **ไม่มี REST endpoint** ปัญหาที่ระบบควบคุมอัตโนมัติตรวจพบสามารถเข้าถึงได้ผ่านเครื่องมือ MCP `observability_snapshot` หรือแดชบอร์ด ระบบควบคุมอัตโนมัติทำงานอยู่ภายใน โดยกำหนดค่าพฤติกรรมผ่านฐานข้อมูลการตั้งค่า (ฟิลด์ `autopilotMode` ของแต่ละการเชื่อมต่อ) ไม่ใช่ตัวแปรสภาพแวดล้อม — การใช้ `grep -rn` เพื่อค้นหาตัวแปรสภาพแวดล้อมสำหรับโหมดระบบควบคุมอัตโนมัติจะไม่พบผลลัพธ์ใดๆ

### โหมดระบบควบคุมอัตโนมัติ

ระบบควบคุมอัตโนมัติทำงานใน **โหมดดำเนินการด้วยตนเอง** โดยค่าเริ่มต้น โดยจะตรวจพบปัญหาและสร้างการดำเนินการที่แนะนำ แต่จะไม่นำไปใช้โดยอัตโนมัติ สามารถนำการดำเนินการไปใช้ผ่านแดชบอร์ดได้

---

## ระบบควบคุมสถานะคอมโบอัตโนมัติ

`comboHealthAutopilot.ts` เป็นระบบที่เทียบเท่ากับระบบควบคุมผู้ให้บริการอัตโนมัติ แต่ทำงาน **เฉพาะสำหรับคอมโบ** โดยระบบจะ:

- ตรวจพบคอมโบที่มีสถานะผิดปกติ
- แนะนำการจัดลำดับเป้าหมายใหม่
- แนะนำให้ปิดใช้งานเป้าหมายที่เสียหาย
- ลบเป้าหมายที่ใช้งานไม่ได้ออกโดยอัตโนมัติหลังจากล้มเหลว N ครั้ง

### ตัวอย่างปัญหาของคอมโบ

```
คอมโบ "always-on" (กลยุทธ์ตามลำดับความสำคัญ)
├─ เป้าหมาย 1: openai/gpt-5 (ปกติ)
├─ เป้าหมาย 2: anthropic/claude-opus-4-6 (⚠️ โมเดลถูกระงับจนถึง 14:00)
└─ เป้าหมาย 3: kiro/claude-sonnet-4-5 (ปกติ)

การดำเนินการที่แนะนำ: จัดลำดับใหม่ — ย้าย kiro ไว้เหนือ anthropic จนกว่าการระงับจะสิ้นสุด
```

---

## ตัวตรวจสอบโควตา

`observability.ts` เปิดเผย **ตัวตรวจสอบโควตาแยกตามเซสชัน** สำหรับผู้ให้บริการแบบสมัครสมาชิก (Claude Code, Codex, GitHub Copilot):

```ts
interface QuotaMonitorSnapshot {
  sessionId: string;
  provider: string;
  accountId: string;
  status: "starting" | "idle" | "healthy" | "warning" | "exhausted" | "error";
  lastQuotaPercent: number | null; // 0-100
  lastQuotaUsed: number | null;
  lastQuotaTotal: number | null;
  lastResetAt: string | null;
  nextPollAt: string | null;
  totalPolls: number;
  totalAlerts: number;
  consecutiveFailures: number;
}
```

### ความหมายของสถานะ

| สถานะ       | เมื่อใด                  | การดำเนินการของ UI                                      |
| ----------- | ------------------------ | ------------------------------------------------------- |
| `starting`  | กำลังสำรวจข้อมูลครั้งแรก | แสดงตัวหมุน                                             |
| `idle`      | ไม่มีกิจกรรมล่าสุด       | ซ่อนจากแดชบอร์ด                                         |
| `healthy`   | มีโควตาเหลือมากกว่า 50%  | แสดงจุดสีเขียว                                          |
| `warning`   | มีโควตาเหลือน้อยกว่า 50% | แสดงการแจ้งเตือนสีเหลือง                                |
| `exhausted` | โควตาเท่ากับ 0%          | แสดงบล็อกสีแดง และกำหนดเส้นทางไปยังผู้ให้บริการรายถัดไป |
| `error`     | การสำรวจข้อมูลล้มเหลว    | แสดงจุดสีแดง และลองอีกครั้งในเร็วๆ นี้                  |

### API

> **ไม่มี REST endpoint** ข้อมูลตัวตรวจสอบโควตาสามารถเข้าถึงได้ผ่านเครื่องมือ MCP `observability_snapshot` หรือแดชบอร์ด

---

## สแนปช็อตความสามารถในการสังเกตการณ์

เครื่องมือ MCP `observability_snapshot` ส่งคืน **สแนปช็อตระบบที่สมบูรณ์** สำหรับเอเจนต์ AI:

```json
{
  "circuitBreakers": [
    {
      "name": "openai",
      "state": "closed",
      "failureCount": 0,
      "lastFailureTime": null,
      "retryAfterMs": null
    }
  ],
  "sessions": [
    {
      "sessionId": "sess-123",
      "createdAt": 1234567890,
      "lastActive": 1234567999,
      "requestCount": 42,
      "connectionId": "conn-456",
      "ageMs": 109
    }
  ],
  "quotaMonitors": {/* ดูด้านบน */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

เอเจนต์ใช้ข้อมูลนี้เพื่อ **ตัดสินใจเกี่ยวกับการกำหนดเส้นทาง** — ตัวอย่างเช่น "หากวงจรของ openai เปิดอยู่ ให้กำหนดเส้นทางไปยัง anthropic ก่อน"

---

## การตรวจสอบสถานะโทเค็น

ผู้ให้บริการ OAuth (Claude Code, GitHub Copilot, Cursor) จำเป็นต้อง **รีเฟรชโทเค็นเป็นระยะ** `src/lib/tokenHealthCheck.ts` เรียกใช้ตัวกำหนดตารางเวลาที่ทำงานอยู่เบื้องหลัง:

- **รอบการตรวจสอบ**: ทุก 60 วินาที (ตรวจสอบตาม `TICK_MS = 60 * 1000` ที่ `src/lib/tokenHealthCheck.ts:30`)
- **ช่วงเวลาตรวจสอบสถานะต่อการเชื่อมต่อ**: ค่าเริ่มต้นคือ 60 นาที (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`); สามารถกำหนดค่าได้ผ่านฐานข้อมูลการตั้งค่า
- **การรีเฟรชล่วงหน้าเมื่อพบ 401**: จัดการโดย interceptor ของแต่ละการเชื่อมต่อ

### สถานะโทเค็น

```ts
interface TokenHealth {
  connectionId: string;
  provider: string;
  status: "valid" | "expiring_soon" | "expired" | "refresh_failed";
  expiresAt: string;
  lastRefresh: string;
  nextRefresh: string;
  consecutiveFailures: number;
}
```

### การกำหนดค่า

การกำหนดค่าการตรวจสอบสถานะโทเค็นได้รับการจัดการภายในโดย `tokenHealthCheck.ts`

### สถานะโทเค็น

> **ไม่มี REST endpoint** ข้อมูลสถานะโทเค็นพร้อมใช้งานผ่านแดชบอร์ดหรือเครื่องมือ MCP `observability_snapshot`

---

## การแจ้งเตือน

### ช่องทางในตัว

OmniRoute รองรับ **ช่องทางการแจ้งเตือน 3 ช่องทาง**:

| ช่องทาง          | การตั้งค่า         | กรณีการใช้งาน                        |
| ---------------- | ------------------ | ------------------------------------ |
| แบนเนอร์แดชบอร์ด | เปิดใช้งานตลอดเวลา | การแจ้งเตือนภายในแอป                 |
| Webhook          | กำหนดค่า URL       | Slack, Discord, PagerDuty            |
| บันทึกเหตุการณ์  | ค่าเริ่มต้น        | สำหรับการรวมบันทึกเหตุการณ์จากภายนอก |

### การกำหนดค่า Webhook

> **หมายเหตุ:** การกำหนดค่าการแจ้งเตือนผ่าน Webhook จัดการผ่านหน้าการตั้งค่าของแดชบอร์ด โปรดดู UI การตั้งค่าสำหรับ URL ของ Webhook การกรองเหตุการณ์ และการปรับแต่ง payload

### ประเภทการแจ้งเตือน

| การแจ้งเตือน                 | เมื่อ                                                   | ระดับความรุนแรงเริ่มต้น |
| ---------------------------- | ------------------------------------------------------- | ----------------------- |
| `provider_circuit_open`      | วงจรเปิด                                                | วิกฤต                   |
| `provider_circuit_half_open` | วงจรกำลังทดสอบการกู้คืน                                 | ข้อมูล                  |
| `quota_warning`              | โควตาอยู่ที่ 80% ขึ้นไป                                 | คำเตือน                 |
| `quota_exhausted`            | โควตาอยู่ที่ 100%                                       | วิกฤต                   |
| `token_refresh_failed`       | การรีเฟรชล้มเหลวติดต่อกัน 3 ครั้งขึ้นไป                 | คำเตือน                 |
| `token_expired`              | โทเค็นเลยเวลาหมดอายุแล้ว                                | วิกฤต                   |
| `combo_target_unhealthy`     | เป้าหมายแบบ Combo อยู่ในช่วงพักเป็นเวลา 1 ชั่วโมงขึ้นไป | คำเตือน                 |
| `db_integrity_warning`       | การละเมิด FK > 0                                        | คำเตือน                 |
| `heap_pressure`              | การใช้งานฮีป > 80% ของเกณฑ์                             | คำเตือน                 |

---

## เมตริกประสิทธิภาพ

### เมตริกที่ติดตาม

| เมตริก                  | ประเภท    | แหล่งที่มา                      |
| ----------------------- | --------- | ------------------------------- |
| `request_count`         | ตัวนับ    | `services/usage.ts`             |
| `request_latency_ms`    | ฮิสโตแกรม | `services/usage.ts`             |
| `tokens_consumed`       | ตัวนับ    | `services/usage.ts`             |
| `cost_usd`              | ตัวนับ    | `services/usage.ts`             |
| `provider_errors`       | ตัวนับ    | `services/errorClassifier.ts`   |
| `circuit_state_changes` | ตัวนับ    | `services/resilience.ts`        |
| `cache_hits`            | ตัวนับ    | `services/signatureCache.ts`    |
| `compression_savings`   | ฮิสโตแกรม | `services/compression/stats.ts` |
| `quota_used`            | เกจ       | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | เกจ       | `observability.ts`              |

### เปอร์เซ็นไทล์ของเวลาแฝง (p50/p95/p99)

> **ไม่มี REST endpoint** ข้อมูลเปอร์เซ็นไทล์ของเวลาแฝงมีให้ใช้งานผ่านหน้าแดชบอร์ด `/dashboard/health` โดยมีแผนรองรับการส่งออกไปยัง Prometheus/OpenTelemetry ใน v3.9

### การส่งออกไปยัง Prometheus / OpenTelemetry (ระยะที่ 2)

มีแผนสำหรับ v3.9: รองรับการส่งออกโดยตรงไปยัง Prometheus, OpenTelemetry และ Datadog

ในระหว่างนี้ ให้ดึงข้อมูลจาก `/api/monitoring/health` ด้วยระบบตรวจสอบที่ทำงานผ่าน HTTP ใดก็ได้ (Prometheus blackbox exporter, Datadog HTTP check เป็นต้น)

---

## แนวทางการตั้งค่าการแจ้งเตือน

### Slack

> **หมายเหตุ:** การแจ้งเตือนผ่าน Webhook กำหนดค่าได้จากหน้า Settings ของแดชบอร์ด — ไม่มีตัวแปรสภาพแวดล้อมสำหรับ Webhook โดยเฉพาะ (`grep -rn` ไม่พบผลลัพธ์) โปรดดู UI ของ Settings สำหรับ URL ของ Webhook, การกรองเหตุการณ์ และการปรับแต่งเพย์โหลด

### Discord

> การแจ้งเตือนผ่าน Webhook ใช้ขั้นตอนใน UI ของ Settings แบบเดียวกับ Slack โดย Discord รองรับโครงสร้างเพย์โหลด JSON แบบเดียวกัน

### PagerDuty

> การแจ้งเตือนผ่าน Webhook ใช้ขั้นตอนใน UI ของ Settings แบบเดียวกัน โดยคีย์การกำหนดเส้นทางของ PagerDuty Events API v2 จะกำหนดค่าใน UI ของ Settings

### Webhook แบบกำหนดเอง (JSON)

> สามารถใช้ HTTP endpoint ใดก็ได้ที่รองรับ POST พร้อมเนื้อหา JSON โดยกำหนดค่า URL ใน UI ของ Settings

---

## การกำหนดค่าแดชบอร์ด

### ปรับแต่งแดชบอร์ดสถานะระบบ

สร้างไฟล์ `~/.omniroute/dashboard.json`:

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### ปักหมุดผู้ให้บริการไว้ด้านบน

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## การแก้ไขปัญหา

### "ผู้ให้บริการแจ้งว่าสถานะปกติ แต่คำขอล้มเหลว"

1. ตรวจสอบ **ปัญหาของ autopilot** — โมเดลอาจถูกล็อกไม่ให้ใช้งาน
2. ดู **ข้อผิดพลาดล่าสุด** สำหรับคลาสข้อผิดพลาดที่ระบุ
3. ลองใช้ **การทดสอบการเชื่อมต่อ** ในการ์ดของผู้ให้บริการ
4. ตรวจสอบว่าผู้ให้บริการ **ถูกจำกัดอัตราที่ต้นทาง** หรือไม่ (ไม่สามารถมองเห็นได้จากระบบภายใน)

### "โควตาแสดงว่าสถานะปกติ แต่พบ 429"

- 429 หมายความว่าผู้ให้บริการระบุว่าคุณใช้โควตาหมดแล้ว
- การติดตามโควตาของ OmniRoute อาจเป็นข้อมูล **ล้าสมัย** — ข้อมูลจากผู้ให้บริการต้นทางถือเป็นข้อมูลจริง
- ข้อมูลโควตาจะรีเฟรชโดยอัตโนมัติผ่านตัวตรวจสอบโควตาภายใน

### "Combo ล้มเหลว แต่เป้าหมายทั้งหมดดูเหมือนมีสถานะปกติ"

- ตรวจสอบแดชบอร์ด **สถานะของ combo** เพื่อดูปัญหาการจัดลำดับเป้าหมาย
- ดู **เหตุการณ์ fallback** — combo อาจลองใช้ตัวเลือกทั้งหมดเร็วเกินไป
- ตรวจสอบว่า **กลยุทธ์** ตรงกับกรณีการใช้งานของคุณ (priority เทียบกับ round-robin เทียบกับ auto)

### "การตรวจสอบสถานะฐานข้อมูลล้มเหลว"

- เรียกใช้ `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"`
- หากได้ผลลัพธ์เป็น "ok" — เป็นการแจ้งเตือนผิดพลาด เนื่องจากการตรวจสอบสถานะเข้มงวดเกินไป
- หากได้ผลลัพธ์อื่น — **หยุด OmniRoute** และทำตาม[คู่มือการกู้คืนจากความเสียหาย](./DATABASE_GUIDE.md#disaster-recovery)

### "แรงกดดันต่อฮีปหน่วยความจำอยู่ในระดับวิกฤต"

```bash
# ตรวจสอบฮีปปัจจุบัน
node -e "console.log(process.memoryUsage())"

# เรียกใช้ GC ด้วยตนเอง (หากใช้ --expose-gc)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# ลดจำนวนคำขอที่ทำงานพร้อมกัน (กำหนดค่าผ่านหน้า Settings ของแดชบอร์ด ไม่ใช่ตัวแปรสภาพแวดล้อม)
# ไม่มีตัวแปรสภาพแวดล้อม `MAX_CONCURRENT_REQUESTS` — ให้กำหนดค่าใน Settings → Concurrency
```

---

## ดูเพิ่มเติม

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — การติดตามการใช้งานและค่าใช้จ่าย
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — สคีมาฐานข้อมูลและสถานะการทำงาน
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — สถานะการทำงานของพร็อกซี (แคชแยกต่างหาก)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — สถาปัตยกรรมระบบ
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — รายละเอียดวงจรตัดไฟ
- ซอร์ส: `src/lib/monitoring/` (4 ไฟล์, 2121 บรรทัดโค้ด)
