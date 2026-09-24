# Webhooks (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **แหล่งข้อมูลอ้างอิงหลัก:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`
> **อัปเดตล่าสุด:** 2026-06-28 — v3.8.40

OmniRoute สามารถส่ง HTTP webhook เมื่อเกิดเหตุการณ์บนแพลตฟอร์มได้ ใช้ webhook เหล่านี้เพื่อผสานการทำงานกับ
Slack, PagerDuty, Datadog, บริการแจ้งเตือนภายใน หรือปลายทาง HTTP ใดๆ

ตัวส่งจะลงนามการส่งแต่ละครั้งด้วย HMAC-SHA256 ลองส่งใหม่เมื่อเกิด
ความล้มเหลวชั่วคราว ติดตามสถานะการส่งของแต่ละ webhook และปิดใช้งานปลายทางโดยอัตโนมัติเมื่อ
เกิดความล้มเหลวอย่างต่อเนื่อง

## เหตุการณ์ที่รองรับ

ประเภท `WebhookEvent` (`src/lib/webhooks/eventDescriptions.ts` ซึ่งใช้โดย `src/lib/webhookDispatcher.ts`) ปัจจุบันกำหนดรูปแบบเหตุการณ์ไว้ทั้งหมดสี่รายการ:

| เหตุการณ์           | เริ่มทำงานเมื่อ                                                    |
| ------------------- | ------------------------------------------------------------------ |
| `request.completed` | คำขอที่ส่งผ่านพร็อกซีเสร็จสมบูรณ์โดยสำเร็จ                         |
| `request.failed`    | คำขอที่ส่งผ่านพร็อกซีล้มเหลวหลังจากลองใหม่/ใช้ทางเลือกสำรองทั้งหมด |
| `quota.exceeded`    | คีย์ API ใช้งบประมาณ/โควตาถึงเกณฑ์ที่กำหนด                         |
| `test.ping`         | เหตุการณ์จำลองที่ใช้โดย endpoint สำหรับทดสอบ                       |

การสมัครรับเหตุการณ์รองรับค่าตรงตัว `"*"` เพื่อรับทุกเหตุการณ์ ชื่อเหตุการณ์ที่ไม่รู้จัก
ใน `events` จะถูกละเว้นในขณะส่ง

> หมายเหตุ: API ของตัวส่งได้รับการเชื่อมต่อแล้ว แต่จุดเรียกใช้งานจริงสำหรับเหตุการณ์
> บางรายการที่ไม่ใช่ `test.ping` ยังอยู่ระหว่างการเพิ่มเข้ามา ตรวจสอบ `grep dispatchEvent` เพื่อดูว่า
> เส้นทางใดเรียกใช้ตัวส่งอยู่ในรีลีสของคุณในปัจจุบัน

## สถาปัตยกรรม

```
ผู้เรียก (ตัวจัดการ, บริการ, ตัวตรวจสอบ)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> กรองตาม webhook.events
    -> สำหรับแต่ละรายการที่ตรงกัน (ทำงานพร้อมกัน):
       deliverWebhook(url, payload, secret)
         สร้าง payload { event, timestamp, data }
         ลงนาม body ด้วย HMAC-SHA256 (หากมี secret)
         ส่ง POST โดยมี timeout 10 วินาที
         ลองใหม่สูงสุด 3 ครั้งเมื่อเกิดข้อผิดพลาด 5xx / ข้อผิดพลาดเครือข่าย
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

การส่งเป็นแบบเริ่มแล้วไม่รอผลสำหรับผู้เรียก: `Promise.allSettled` จะกลืน
ข้อผิดพลาดของแต่ละ webhook เพื่อให้ตัวรับที่มีปัญหาหนึ่งตัวไม่สามารถบล็อกตัวรับอื่นๆ ได้

## การลงนามด้วย HMAC

เมื่อ webhook มี `secret` OmniRoute จะลงนาม body แบบ JSON และส่ง:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> ชื่อ header ใช้คำนำหน้า `X-Webhook-*` (ไม่ใช่ `X-OmniRoute-*`) ค่าลายเซ็น
> อยู่ในรูปแบบ `sha256=<hex>` — ให้ตรวจสอบคำนำหน้าทั้งหมดด้วย

หากเรียก `createWebhook` โดยไม่มี secret โมดูล DB จะสร้าง secret ให้
(`whsec_<48 hex>`) ดังนั้น webhook ทั้งหมดจะถูกลงนามโดยค่าเริ่มต้น

### การตรวจสอบที่ฝั่งตัวรับ

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

ตรวจสอบกับเนื้อหาคำขอ **ดิบ** เสมอ ก่อนแปลง JSON ใดๆ

## นโยบายการลองใหม่และความล้มเหลว

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- กำหนดเวลาหมดอายุ 10 วินาทีต่อการลองแต่ละครั้ง (`AbortController`)
- HTTP 2xx ถือว่าสำเร็จ
- HTTP 3xx/4xx ถือเป็นสถานะสุดท้ายที่ไม่สามารถลองใหม่ได้ — บันทึกว่าส่งแล้ว
  โดยกำหนด `success = res.ok`
- HTTP 5xx และข้อผิดพลาดของเครือข่ายจะถูกลองใหม่โดยใช้ระยะหน่วงแบบทวีคูณ:
  `2^attempt * 1000 ms` (1s, 2s, 4s)
- หลังจากลองครบ `maxRetries` ครั้งแล้ว การส่งจะถูกบันทึกว่าล้มเหลว
- การส่งแต่ละครั้งจะอัปเดต `last_triggered_at`, `last_status` และรีเซ็ต
  หรือเพิ่มค่า `failure_count`
- ตัวกระจายงานจะเรียก `disableWebhooksWithHighFailures(10)` หลังจากการกระจายงานแต่ละครั้ง
  ดังนั้น webhook ใดก็ตามที่มี `failure_count >= 10` จะถูกปิดใช้งานโดยอัตโนมัติ

## ฐานข้อมูล

ตาราง `webhooks` (migration `011_webhooks.sql`):

| คอลัมน์             | ชนิดข้อมูล | หมายเหตุ                                        |
| ------------------- | ---------- | ----------------------------------------------- |
| `id`                | TEXT PK    | UUID                                            |
| `url`               | TEXT       | URL ปลายทาง                                     |
| `events`            | TEXT       | อาร์เรย์ JSON; ค่าเริ่มต้น `["*"]`              |
| `secret`            | TEXT       | ข้อมูลลับ HMAC (สร้างอัตโนมัติหากไม่ได้ระบุ)    |
| `enabled`           | INT        | 0/1; ค่าเริ่มต้นเป็น 1                          |
| `description`       | TEXT       | ป้ายกำกับที่มนุษย์อ่านได้ซึ่งไม่บังคับ          |
| `created_at`        | TEXT       | `datetime('now')`                               |
| `last_triggered_at` | TEXT       | อัปเดตทุกครั้งที่พยายามส่ง                      |
| `last_status`       | INT        | สถานะ HTTP ของการลองครั้งล่าสุด (0 = เครือข่าย) |
| `failure_count`     | INT        | รีเซ็ตเป็น 0 เมื่อสำเร็จ, +1 เมื่อล้มเหลว       |

ประวัติการส่งจะถูกจัดเก็บถาวรในตาราง `webhook_deliveries` โดยเฉพาะ
(migration `069_webhook_deliveries.sql`, เขียนผ่าน
`src/lib/db/webhookDeliveries.ts::insertDelivery` ทุกครั้งที่พยายามส่ง) นอกเหนือจาก
ตัวนับแบบรวมในแถว `webhooks` ข้อมูลเมตาประเภท (Slack / Discord /
Telegram / ตัวแปลง payload แบบกำหนดเอง) ถูกเพิ่มโดย `070_webhooks_kind_metadata.sql`

## REST API

endpoint ทั้งหมดต้องใช้การยืนยันตัวตนสำหรับการจัดการ (`requireManagementAuth`)

| Endpoint                        | Method | คำอธิบาย                                  |
| ------------------------------- | ------ | ----------------------------------------- |
| `/api/webhooks`                 | GET    | แสดงรายการ webhook (ปกปิดข้อมูลลับ)       |
| `/api/webhooks`                 | POST   | สร้าง webhook                             |
| `/api/webhooks/[id]`            | GET    | รายละเอียด webhook (ข้อมูลลับแบบเต็ม)     |
| `/api/webhooks/[id]`            | PUT    | อัปเดตฟิลด์                               |
| `/api/webhooks/[id]`            | DELETE | ลบ                                        |
| `/api/webhooks/[id]/test`       | POST   | ส่ง `test.ping` (ไม่ลองใหม่)              |
| `/api/webhooks/[id]/deliveries` | GET    | การพยายามส่งล่าสุดของ webhook หนึ่งรายการ |
| `/api/webhooks/validate-url`    | POST   | ตรวจสอบ URL ล่วงหน้า (การป้องกัน SSRF)    |

`GET /api/webhooks` จะปกปิดข้อมูลลับเป็น `<first 10 chars>...` เพื่อหลีกเลี่ยงการรั่วไหล
บนหน้ารายการ ให้ใช้ GET ของ `[id]` เมื่อต้องการข้อมูลลับจริงๆ

### สร้าง webhook

```bash
curl -X POST http://localhost:20128/api/webhooks \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://hooks.slack.com/services/...",
    "secret": "whsec_my_shared_secret",
    "events": ["quota.exceeded", "request.failed"],
    "description": "การแจ้งเตือน Slack"
  }'
```

หากไม่ได้ระบุ `secret` เซิร์ฟเวอร์จะสร้างข้อมูลลับ `whsec_<hex>` และส่งคืน
ในผลลัพธ์การตอบกลับ

### ทดสอบ webhook

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

ส่งคืน `{ delivered, status, error }` โดยจะไม่มีการลองใหม่ — มีประโยชน์สำหรับ
การตรวจสอบอย่างรวดเร็วว่าฝั่งผู้รับยอมรับ payload และลายเซ็นหรือไม่

## แดชบอร์ด

หน้าแดชบอร์ดที่ `/dashboard/webhooks` (ดู
`src/app/(dashboard)/dashboard/webhooks/page.tsx`) มีความสามารถดังต่อไปนี้:

- สร้าง/แก้ไข webhook พร้อมตัวเลือกเหตุการณ์
- ตัวบ่งชี้สถานะ (ทำงาน / ไม่ทำงาน / เกิดข้อผิดพลาด) โดยอิงจาก `enabled`,
  `failure_count` และ `last_status`
- ทดสอบการส่งได้ในคลิกเดียว
- สลับเปิด/ปิดด้วยตนเอง

## ตัวอย่าง Payload

### request.completed

```json
{
  "event": "request.completed",
  "timestamp": "2026-05-13T20:30:00.123Z",
  "data": {
    "trace_id": "...",
    "api_key_id": "...",
    "provider": "openai",
    "model": "gpt-5",
    "status": 200,
    "tokens_in": 142,
    "tokens_out": 350,
    "cost_usd": 0.0042
  }
}
```

### test.ping

```json
{
  "event": "test.ping",
  "timestamp": "2026-05-13T20:32:00.000Z",
  "data": {
    "message": "Test webhook delivery from OmniRoute",
    "webhookId": "<uuid>"
  }
}
```

รูปแบบฟิลด์สำหรับเหตุการณ์ที่ไม่ใช่ `test.ping` ถูกกำหนดโดยตำแหน่งการเรียกใช้ที่ส่ง
เหตุการณ์เหล่านั้น ให้ถือว่าออบเจ็กต์ `data` รองรับการเปลี่ยนแปลงในอนาคต (เพิ่มฟิลด์ได้ แต่อย่าพึ่งพา
การไม่มีอยู่ของฟิลด์)

## แนวทางปฏิบัติที่ดีที่สุด

- **ตรวจสอบลายเซ็นของการส่งทุกครั้ง** เทียบกับเนื้อหาดิบของคำขอ — เพื่อป้องกัน
  POST ปลอมจากผู้ที่คาดเดา URL ของ webhook ของคุณได้
- **ตอบกลับด้วย 2xx ภายในประมาณ 5 วินาที** — ตัวจัดส่งจะหมดเวลาที่ 10 วินาที ตัวรับที่ช้า
  จะใช้โควตาการลองส่งซ้ำและทำให้ `failure_count` เพิ่มขึ้น
- **ทำให้ตัวจัดการเป็น idempotent** — การลองส่งซ้ำและความหมายของการส่งแบบอย่างน้อยหนึ่งครั้ง
  หมายความว่าอาจเกิดข้อมูลซ้ำได้
- **สมัครรับเหตุการณ์ให้น้อยที่สุด** — ระบุเฉพาะเหตุการณ์ที่คุณใช้งานจริงเท่านั้น `"*"` จะ
  เพิ่มภาระให้กับตัวรับที่คุณไม่ได้ควบคุม
- **เฝ้าดู `failure_count`** — endpoint จะถูกปิดใช้งานโดยอัตโนมัติเมื่อเกิดข้อผิดพลาดติดต่อกัน 10 ครั้ง
  รีเซ็ตโดยเรียก `PUT /api/webhooks/[id]` พร้อม `enabled: true`
  หลังจากแก้ไขตัวรับแล้ว
- **หมุนเวียน secret เป็นระยะ** — ใช้ `PUT` เพื่อกำหนด `secret` ใหม่ นำค่าใหม่ไปใช้
  ที่ตัวรับ และยืนยันผ่าน endpoint สำหรับการทดสอบ

## ดูเพิ่มเติม

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — ขอบเขตทั้งหมดของ API สำหรับการจัดการ
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — ความหมายของ circuit breaker / cooldown
  ที่อยู่เบื้องหลังข้อผิดพลาดของ provider ซึ่งแสดงผ่าน `request.failed`
- ซอร์ส: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
