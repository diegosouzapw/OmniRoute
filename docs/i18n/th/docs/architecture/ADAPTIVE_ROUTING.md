# Adaptive Routing: Routing Events, Quality Feedback & Explainability (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ADAPTIVE_ROUTING.md) · 🇪🇹 [am](../../../am/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇿 [az](../../../az/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇦 [bs](../../../bs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇰 [da](../../../da/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇪 [de](../../../de/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇷 [el](../../../el/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇸 [es](../../../es/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇪 [et](../../../et/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇱 [he](../../../he/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇩 [id](../../../id/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇹 [it](../../../it/docs/architecture/ADAPTIVE_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇭 [km](../../../km/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇲 [my](../../../my/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇴 [no](../../../no/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [or](../../../or/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇰 [si](../../../si/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [te](../../../te/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ADAPTIVE_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ADAPTIVE_ROUTING.md)

---

เอกสารนี้อธิบายพื้นฐานการกำหนดเส้นทางแบบปรับตัวตามฟีดแบ็กที่เพิ่มเข้ามาใน
OmniRoute โดยตั้งใจให้มีขอบเขตเล็ก: เพิ่มช่องทางผลลัพธ์การกำหนดเส้นทางแบบมีชนิดข้อมูล
สัญญาณคุณภาพออนไลน์ที่ส่งข้อมูลเข้าสู่ตัวให้คะแนน auto-combo ที่มีอยู่เดิม
ตัวส่งออก OpenTelemetry ที่เลือกเปิดใช้ได้ และ endpoint สำหรับการอธิบายการตัดสินใจ ทั้งนี้ **ไม่ได้**
แทนที่สแตกด้านความยืดหยุ่นที่มีอยู่เดิม (circuit breaker, connection cooldown,
model lockout, health matrix, autopilot) — แต่ทำงานเสริมกัน

## 1. บริบททางสถาปัตยกรรม

OmniRoute เป็น data plane ที่มี **เส้นทางหลักของคำขอ** และ **control/intelligence
plane** เส้นทางหลักต้องยังคงรวดเร็ว ใช้หน่วยความจำอย่างมีประสิทธิภาพ ทำงานแบบอะซิงโครนัส
มีความยืดหยุ่น และคาดการณ์ได้ ส่วนการประเมิน การให้คะแนนคุณภาพ การทดลอง และการวิเคราะห์
ข้อมูลย้อนหลังอยู่ใน control plane

```
AI Agent / IDE
      │
      ▼
┌─────────────────────┐
│    OmniRoute        │   data plane (รวดเร็ว, ซิงโครนัส, อยู่ในหน่วยความจำ)
│  routing / failover │
│  health / guardrail │
│  cache / streaming  │
└──────────┬──────────┘
           │ RoutingEvent (ส่งแล้วไม่รอผล, ~0.2µs)
           ▼
┌─────────────────────┐
│  Feedback sinks     │   control plane (อะซิงโครนัส, ทำงานแบบ best-effort)
│  quality tracker    │
│  OTel exporter      │
│  explain store      │
└──────────┬──────────┘
           ▼  คะแนนคุณภาพ
      auto-combo scorer
```

### สิ่งที่มีอยู่แล้ว (ตรวจสอบแล้วและไม่ทำซ้ำ)

| แนวคิด                                    | การติดตั้งใช้งานที่มีอยู่เดิม                                                                          |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| ความพร้อมใช้งาน (ส่งทราฟฟิกได้หรือไม่?)   | Circuit breaker (CLOSED/DEGRADED/OPEN/HALF_OPEN, จัดเก็บถาวรใน DB), connection cooldown, model lockout |
| การรายงานสถานะสุขภาพ                      | `providerHealthMatrix.ts`, `providerHealthAutopilot.ts`                                                |
| Shadow traffic                            | `open-sse/services/combo/shadowRouting.ts`                                                             |
| Guardrails                                | `src/lib/guardrails/` (hook ก่อน/หลัง)                                                                 |
| Exact cache                               | `src/lib/semanticCache.ts` (อิงตาม signature)                                                          |
| Evaluators / การกำหนดเส้นทางตาม eval      | `src/lib/evals/`, `open-sse/services/evalRouting.ts`                                                   |
| ความสามารถในการอธิบายการตัดสินใจของ Combo | `open-sse/services/combo/decisionTrace.ts`                                                             |
| เหตุการณ์แบบเรียลไทม์ของแดชบอร์ด          | `src/lib/events/eventBus.ts` (ช่องทางการแจ้งเตือน UI, payload ชนิด `unknown`, ประวัติ 100 รายการ)      |

เลเยอร์ routing-event **ไม่ใช่** การนำ `eventBus` มาติดตั้งใช้งานใหม่: bus ดังกล่าวเป็น
ช่องทางการแจ้งเตือนแบบเรียลไทม์ของแดชบอร์ด (มีชนิดข้อมูลสำหรับ _ชื่อเหตุการณ์_,
payload ไม่เปิดเผยโครงสร้าง และมีผู้ใช้ข้อมูลเป็น UI) ส่วน `RoutingEvent` เป็นโครงสร้าง
_ผลลัพธ์_ แบบมีชนิดข้อมูล (เวลาแฝง/โทเค็น/ต้นทุน/ผลลัพธ์/เหตุผลการสิ้นสุด) ซึ่งถูกใช้โดย
feedback sink ของ control plane (quality tracker, OTel exporter, explain store)

### สิ่งที่ขาดหายไป (เพิ่มเข้ามาที่นี่)

1. **เหตุการณ์ผลลัพธ์การกำหนดเส้นทางแบบมีชนิดข้อมูล + sink abstraction** (`RoutingEvent` /
   `RoutingEventSink`) โดย `decisionTrace` จำกัดขอบเขตอยู่ที่ combo และอยู่ในหน่วยความจำเท่านั้น
   ส่วน `comboMetrics` เป็นตัวนับสะสม และ `call_logs` เป็นการจัดเก็บถาวรแบบอะซิงโครนัสในรูปแบบดิบ
   ไม่มีสิ่งใดเป็นช่องทางผลลัพธ์แบบมีชนิดข้อมูลและอิงตาม sink ที่ quality tracker, OTel
   exporter หรือตัวประเมินแบบ Future-AGI สามารถสมัครรับข้อมูลได้
2. **สัญญาณคุณภาพออนไลน์** (EWMA) สำหรับคุณภาพของผลลัพธ์ — ก่อนหน้านี้ตัวให้คะแนน
   ใช้เพียงความเหมาะสมกับงานแบบคงที่และอัตราการผ่าน eval ที่เลือกเปิดใช้เป็นตัวแทนของ "คุณภาพ"
3. **ตัวส่งออก OTel แบบไม่พึ่งพา dependency ซึ่งเลือกเปิดใช้ได้** โดยใช้หลักเกณฑ์เชิงความหมายของ GenAI
4. **endpoint สำหรับการอธิบายการตัดสินใจ** ที่ส่งคืนการตัดสินใจกำหนดเส้นทางจริง + สถานะคุณภาพ

## 2. อีเวนต์การกำหนดเส้นทาง (รากฐานของฟีดแบ็ก)

ไฟล์: `open-sse/services/routing/events.ts`, `.../index.ts`

`RoutingEvent` มีเฉพาะเมทาดาทาการกำหนดเส้นทาง:

```ts
interface RoutingEvent {
  requestId: string;
  provider: string;
  model: string;
  strategy: string; // "auto" | "priority" | "direct" | ...
  latencyMs: number;
  ttftMs: number | null;
  inputTokens: number | null;
  outputTokens: number | null;
  cost: number | null;
  retries: number;
  fallbackUsed: boolean;
  outcome: RoutingOutcome; // ยูเนียนที่จำกัดด้วย allowlist
  status: number | null;
  finishReason: string | null;
  connectionId: string | null;
  ts: number;
}
```

`RoutingEventSink` เป็น trait ใน TypeScript ที่มีลักษณะแบบ `Send+Sync`:

```ts
interface RoutingEventSink {
  readonly name: string;
  record(event: RoutingEvent): void; // ต้องเป็น O(1) และไม่มี I/O แบบซิงโครนัส
}
```

hot path เรียก `emitRoutingEvent(event)` หนึ่งครั้งต่อคำขอที่เสร็จสมบูรณ์
(callback เมื่อการสตรีมเสร็จสิ้น, เส้นทางความสำเร็จแบบไม่สตรีม และเส้นทางความล้มเหลว
จาก 200 ที่มีรูปแบบไม่ถูกต้องใน `handleChatCore`) การกระจายอีเวนต์เป็นแบบ fan-out
ซิงโครนัสไปยัง sink ที่ลงทะเบียนไว้ แต่แต่ละ sink จะเพียงนำข้อมูลเข้าคิว/อัปเดตสถานะ
ในหน่วยความจำเท่านั้น **ไม่มีการเขียนฐานข้อมูลแบบซิงโครนัส และไม่มี I/O เครือข่าย
บน hot path**

sink เริ่มต้น:

- `MemoryRoutingEventStore` — ring buffer แบบจำกัดขนาด (500) เรียงรายการใหม่สุดก่อน
  สำหรับ endpoint อธิบาย
- consumer ของ `QualityTracker` — อัปเดตค่าประมาณคุณภาพแบบ EWMA
- `OtlpHttpsEventSink` — เป็นทางเลือก เปิดใช้งานเฉพาะเมื่อตั้งค่า
  `OMNIROUTE_OTEL_ENDPOINT` (หรือ `OTEL_EXPORTER_OTLP_ENDPOINT`)

### โอเวอร์เฮดที่วัดได้ (การเปรียบเทียบตามจริง)

`npm run bench:routing-events` บนเวิร์กสเตชันนี้ (100k รอบ; การดำเนินการระดับต่ำกว่า µs
วัดเป็นค่า µs/op แบบรวม เนื่องจากเปอร์เซ็นไทล์ต่อการดำเนินการต่ำกว่าความละเอียดของตัวจับเวลา
`performance.now()`):

| สถานการณ์                           | µs/op  | ops/s  |
| ----------------------------------- | ------ | ------ |
| ค่าพื้นฐาน (เฉพาะการให้คะแนน)       | ~0.045 | ~22 M  |
| ค่าพื้นฐาน + RoutingEvent (2 sinks) | ~0.168 | ~5.9 M |
| ค่าพื้นฐาน + อีเวนต์ + OTel enqueue | ~0.163 | ~6.1 M |
| พร้อมกัน (8 burst ที่สลับกัน)       | ~0.18  | —      |

ส่วนต่างของการกระจายอีเวนต์เมื่อเทียบกับการให้คะแนนพื้นฐานอยู่ที่ประมาณ ~0.12 µs/คำขอ;
sink ของ OTel ทำเพียงการนำเข้าคิว (การ push ลง buffer แบบ O(1)) จึงไม่เพิ่มค่าใช้จ่าย
ในระดับที่วัดได้ ตัวเลขเหล่านี้ขึ้นอยู่กับเครื่องและเป็นค่าเชิงเปรียบเทียบ — ไม่ใช่การรับประกัน
สำหรับระบบที่ใช้งานจริง ตัวเลข "~0.2 µs" ของ v1 เป็นค่าประมาณแบบรวม; วิธีการนี้แยก
ค่าพื้นฐานของการให้คะแนนออกจากต้นทุนการกระจายอีเวนต์

## 3. สัญญาณคุณภาพ (สถานะผู้ให้บริการที่ขับเคลื่อนด้วยฟีดแบ็ก)

ไฟล์: `open-sse/services/routing/quality.ts`

v2 แยกคุณภาพด้าน **การดำเนินงาน** ออกจากด้าน **ความหมาย**:

- **การดำเนินงาน** — ได้มาจาก hot path ของการกำหนดเส้นทาง (HTTP 4xx/5xx,
  การเชื่อมต่อล้มเหลว, 429, การตอบกลับที่มีรูปแบบไม่ถูกต้อง, การสตรีมถูกขัดจังหวะ,
  `finish_reason=length`, ความสำเร็จที่ไม่มีเอาต์พุต, EWMA ของ latency/TTFT)
  สถานะ 200 จะไม่ถูกนับเป็นคุณภาพด้านความหมาย
- **ความหมาย** — คุณค่าที่แท้จริงของเอาต์พุตที่สร้างขึ้น จะถูกสร้างโดย evaluator ผ่าน
  `setSemanticQuality()` เท่านั้น โดยจะเป็น `null` จนกว่าจะมี evaluator กำหนดค่าให้
  และจะไม่รั่วไหลเข้าไปในคะแนนด้านการดำเนินงาน

สถานะต่อคู่ (provider, model) (EWMA + ตัวนับแบบจำกัดขนาด):

- `successEwma` — EWMA (α=0.2) ของความสำเร็จของผลลัพธ์
- `latencyEwma` / `ttftEwma` — EWMA ของ latency (α=0.1)
- `samples`, `anomalies`, `rateLimited`, `semantic`, `semanticConfidence`
- `recencyMs` — ระยะเวลานับตั้งแต่มีการสังเกตโมเดลครั้งล่าสุด

### การคำนึงถึงความเชื่อมั่น / จำนวนตัวอย่าง

`confidence = clamp01(samples / 50)` และคะแนนที่ส่งคืนให้ scorer จะถูกผสมเข้าหา
ค่ากึ่งกลางที่เป็นกลาง:

```
score = 0.5 + confidence * (operational - 0.5)
```

ผลที่ตามมา (ยืนยันด้วยการทดสอบ):

- ผู้ให้บริการที่ยังไม่มีข้อมูล (0 ตัวอย่าง) ได้คะแนน **0.5** — ไม่ถูกลงโทษอย่างไม่เป็นธรรม
  แต่ก็ไม่สามารถมีคะแนนเหนือกว่าผู้ให้บริการที่มีข้อมูลสังเกตการณ์ที่ดีนับพันรายการ
- ผู้ให้บริการที่โชคดีประสบความสำเร็จ 7 ครั้งจะถูกดึงคะแนนเข้าหา 0.5
  (ไม่สามารถขึ้นนำได้จากการกำหนดค่าเริ่มต้นในเชิงบวก)
- ผู้ให้บริการที่มีตัวอย่าง 50+ รายการจะลู่เข้าสู่คะแนนด้านการดำเนินงานจริง
- การเสื่อมถอยและการฟื้นตัวเป็นแบบค่อยเป็นค่อยไป (EWMA) และความล้มเหลวเพียงครั้งเดียว
  จะไม่ทำลายสถานะของผู้ให้บริการที่มีประสิทธิภาพดี

`ProviderQuality` เปิดเผย `{ operational, semantic, confidence, samples, anomalies,
rateLimited, successEwma, latencyEwmaMs, ttftEwmaMs, recencyMs }`

ข้อมูลนี้จะถูกป้อนให้กับ scorer ของ auto-combo ในฐานะปัจจัยการให้คะแนน `quality`:

- `ScoringFactors.quality` / `ScoringWeights.quality` ใน
  `open-sse/services/autoCombo/scoring.ts`
- `DEFAULT_WEIGHTS`: `health` 0.1905 → 0.1605, `quality` 0.03 ผลรวมยังคงเป็น 1.0
- `buildAutoCandidates` กำหนดค่า `candidate.quality` จาก tracker; candidate
  ที่ไม่มีข้อมูลจะใช้ค่าเริ่มต้นเป็นค่ากลาง **0.5** (candidate ที่ยังไม่มีข้อมูลจะไม่ถูกเพิ่ม
  หรือลดคะแนน)

วงจรป้อนกลับแบบปิด:

```
RoutingEvent → QualityTracker → getQualityScore → ปัจจัยคุณภาพของ auto-combo
      ↑                                                    │
      └────── ผลลัพธ์ของคำขอ (handleChatCore) ←────────────┘
```

### การคัดออกแบบเด็ดขาดเทียบกับการลดคะแนนแบบนุ่มนวล

สัญญาณคุณภาพเป็นเพียง **ค่ากำหนดความต้องการแบบปรับตัวอย่างนุ่มนวล** เท่านั้น
การคัดออกแบบเด็ดขาดยังคงอยู่ใน resilience stack ที่มีอยู่ ได้แก่ circuit breaker
สถานะ OPEN, โควตาหมด, การยืนยันตัวตนล้มเหลว, การล็อกโมเดล — สิ่งเหล่านี้ไม่ได้รับ
ผลกระทบจากคะแนนคุณภาพ ผู้ให้บริการที่คะแนนคุณภาพลดลงชั่วคราวจะถูกลดลำดับ
ความสำคัญ แต่จะไม่ถูกปิดใช้งานแบบเด็ดขาด

## 3b. การจับเวลาสตรีมแบบมาตรฐาน (TTFT / ITL)

ไฟล์: `open-sse/utils/streamTiming.ts`

`createStreamTiming()` เป็นจุดเชื่อมต่อเดียวสำหรับการเก็บข้อมูลเครื่องมือวัดผลในเส้นทางสตรีมมิง
โดยเชื่อมเข้ากับ `createSSEStream` (`open-sse/utils/stream.ts`):

- `markByte()` — ได้รับชังก์แรกจากต้นทาง
- `markForward()` — ส่งต่อชังก์แรกไปยังไคลเอนต์ (ใช้สำหรับ TTFT)
- `markInterrupted()` — สตรีมหมดเวลา/ถูกยกเลิก/เกิดข้อผิดพลาดก่อนจบอย่างสมบูรณ์
- `ttft()` = เวลาแฝงจนถึงชังก์ SSE แรกที่ถูกส่งต่อ **ค่านี้ไม่ใช่ TTFT ระดับโทเค็น** —
  ชังก์ SSE หนึ่งชังก์อาจมีโทเค็นศูนย์/หนึ่ง/หลายโทเค็น โดยมีการจัดทำเอกสารไว้อย่างชัดเจน
- `avgItlMs()` = ค่าเฉลี่ยของช่วงห่างระหว่างชังก์ (ค่าประมาณเวลาแฝงระดับชังก์สำหรับ ITL)

TTFT/ITL/สถานะถูกขัดจังหวะจะถูกส่งไปยัง `RoutingEvent` (`ttftMs`, `itlMs`) และ
ส่งออกเป็นแอตทริบิวต์ของสแปน GenAI/OmniRoute โดย OTel sink

## 4. ความสามารถในการสังเกตการณ์ด้วย OpenTelemetry / GenAI

ไฟล์: `open-sse/services/routing/otel.ts`

- ตัวส่งออก OTLP/HTTP JSON ที่ไม่ต้องพึ่งพา dependency (ใช้ `fetch` แบบโกลบอล โดยไม่ใช้
  `@opentelemetry/*` SDK)
- สแปนเป็นไปตามข้อกำหนดเชิงความหมายของ GenAI (`gen_ai.provider.name`,
  `gen_ai.request.model`, `gen_ai.usage.input_tokens/output_tokens`,
  `gen_ai.completion.finish_reason`, `gen_ai.system`) รวมถึงแอตทริบิวต์การกำหนดเส้นทางของ OmniRoute
  (ผลลัพธ์ สถานะ TTFT การลองใหม่ และการใช้เส้นทางสำรอง)
- `record()` เพียงนำข้อมูลเข้าไปไว้ในบัฟเฟอร์ที่มีขนาดจำกัด (O(1)); ตัวจับเวลาที่ทำงานเบื้องหลัง
  จะฟลัชข้อมูลแบบอะซิงโครนัสผ่าน `POST {endpoint}/v1/traces` เมื่อมีโหลดเกินขีดจำกัด
  ระบบจะทิ้งเหตุการณ์ที่เก่าที่สุด (ตัวนับ `dropped`) — โดยไม่สร้างแรงดันย้อนกลับต่อ
  data plane
- **ปิดใช้งานเว้นแต่จะมีการกำหนดค่า** ต้องตั้งค่า `OMNIROUTE_OTEL_ENDPOINT` (หรือ
  `OTEL_EXPORTER_OTLP_ENDPOINT`); มิฉะนั้น sink จะไม่ถูกลงทะเบียน
  และจะไม่มีโค้ด OTel ใดทำงาน

## 5. ความสามารถในการอธิบาย

- `GET /v1/explain/routing` ส่งคืน `RoutingEvent` ล่าสุด (การตัดสินใจจริง
  โดยเรียงจากใหม่ที่สุดก่อน) และสแนปช็อตคุณภาพแยกตามผู้ให้บริการ/โมเดล
- การยืนยันตัวตนทำงานแบบเดียวกับ `/v1/combos` (Bearer API key หรือเซสชันแดชบอร์ด;
  อนุญาตให้เข้าถึงแบบไม่ระบุตัวตนในการติดตั้งใช้งานภายในเครื่องแบบผู้ใช้คนเดียวที่ตั้งค่า
  `REQUIRE_API_KEY=false`)
- ร่องรอยระดับ combo ต่อการเรียกใช้งานยังคงเข้าถึงได้ผ่าน
  `decisionTrace.ts` ที่มีอยู่ (ส่วนหัว `X-OmniRoute-Combo-Trace`)
- ความปลอดภัย: เหตุการณ์มีเฉพาะเมทาดาทาการกำหนดเส้นทางเท่านั้น ไม่มีพรอมต์/เนื้อหา/ข้อมูลประจำตัว

## 6. การผสานรวมระนาบการประเมิน (ความพร้อมสำหรับ Future AGI)

OmniRoute ถือว่า Future AGI (หรือตัวประเมินใดๆ) เป็น **แบ็กเอนด์ด้านปัญญา/การประเมินที่อาจนำมาใช้
ไม่ใช่ dependency** โดยมีจุดเชื่อมต่อดังนี้:

- `RoutingEventSink` สามารถส่งต่อเหตุการณ์ไปยังตัวประเมินแบบอะซิงโครนัส
- `MemoryRoutingEventStore` และสแนปช็อตคุณภาพมอบสตรีมการตัดสินใจดิบให้แก่ตัวประเมิน
- `Evaluator` ในอนาคต (แบบกำหนดผลลัพธ์ตายตัว ตัวตัดสินภายในเครื่อง HTTP หรือ WASM) จะใช้
  เหตุการณ์/ร่องรอยและส่งคืน `QualityScore` ที่ป้อนเข้าสู่เส้นทาง
  `getQualityScore`/ปัจจัยคุณภาพเดียวกัน
- การกำหนดเส้นทางที่ขับเคลื่อนด้วยการประเมินซึ่งมีอยู่แล้ว (`open-sse/services/evalRouting.ts`)
  จะจัดลำดับเป้าหมาย combo ใหม่ตามอัตราการผ่านของ `eval_runs` เมื่อเปิดใช้งาน

ไม่มีการประเมินใดทำงานแบบซิงโครนัสบนเส้นทางคำขอ และเกตเวย์สามารถทำงานได้อย่างสมบูรณ์
แม้ไม่มีตัวประเมิน

## 7. การทบทวนสถาปัตยกรรมขั้นสุดท้าย

1. **สิ่งใดยังคงอยู่บนเส้นทางร้อนแบบซิงโครนัส?** การกำหนดเส้นทาง/การให้คะแนน การตรวจสอบ
   guardrail เบื้องต้น การค้นหาแคช และการกระจาย `emitRoutingEvent` หนึ่งครั้ง (~0.12 µs
   เมื่อเทียบกับการให้คะแนนพื้นฐาน) ไปยัง sink ในหน่วยความจำ
2. **สิ่งใดถูกย้ายไปประมวลผลแบบอะซิงโครนัส?** การส่งออก OTel (ตัวจับเวลา + fetch),
   การคงอยู่ของ `call_logs`/ข้อมูลการใช้งาน การเขียน semantic cache ส่วนข้อมูลคุณภาพอยู่ในหน่วยความจำ
   และเป็น O(1) (ไม่จำเป็นต้องทำแบบอะซิงโครนัส)
3. **ผลลัพธ์การกำหนดเส้นทางกลายเป็นข้อมูลป้อนกลับได้อย่างไร?** `handleChatCore` ปล่อย
   `RoutingEvent` → `QualityTracker` อัปเดตสถานะ EWMA → `getQualityScore`
   ป้อนข้อมูลให้กับปัจจัย `quality` ของ auto-combo
4. **คุณภาพมีอิทธิพลต่อการกำหนดเส้นทางในอนาคตอย่างไร?** คะแนนคุณภาพที่ต่ำจะลด
   คะแนนถ่วงน้ำหนักของผู้ให้บริการ/โมเดลนั้นใน `scoreAutoTargets` ทำให้โมเดลที่มีประสิทธิภาพลดลง
   ค่อยๆ ได้รับความสำคัญน้อยลง และกลับมามีความสำคัญอีกครั้งเมื่อ EWMA ดีขึ้น
5. **Future AGI สามารถผสานรวมโดยไม่กลายเป็น dependency ได้อย่างไร?** ผ่านอินเทอร์เฟซ
   `RoutingEventSink` / อะแดปเตอร์ `Evaluator` ในอนาคต — ไม่มี dependency ที่ฮาร์ดโค้ดไว้
6. **เกิดอะไรขึ้นเมื่อตัวประเมินไม่พร้อมใช้งาน?** การกำหนดเส้นทางไม่ได้รับผลกระทบ;
   คุณภาพจะใช้ค่ากลาง (1.0) สำหรับโมเดลที่ยังไม่มีสัญญาณที่สังเกตได้
7. **เกิดอะไรขึ้นเมื่อระบบเทเลเมทรีไม่พร้อมใช้งาน?** OTel sink จะไม่ถูกลงทะเบียน;
   ส่วนที่เหลือของเลเยอร์การกำหนดเส้นทางยังคงทำงานโดยไม่มีการเปลี่ยนแปลง
8. **เกิดอะไรขึ้นเมื่อมีโหลดเกินขีดจำกัด?** บัฟเฟอร์ OTel จะทิ้งเหตุการณ์ที่เก่าที่สุด;
   ข้อมูลคุณภาพและ ring buffer ถูกจำกัดขนาดไว้โดยการออกแบบ; ไม่มีแรงดันย้อนกลับ
9. **สถานะผู้ให้บริการฟื้นตัวหลังประสิทธิภาพลดลงได้อย่างไร?** EWMA จะลู่เข้าหาค่าที่เหมาะสมอีกครั้ง
   เมื่อมีผลสำเร็จสะสมมากขึ้น; warmup ทำให้โมเดลที่ยังไม่มีข้อมูลคงค่าเป็นกลาง; circuit breaker
   จะฟื้นตัวอย่างอิสระผ่านการทดสอบสถานะ HALF_OPEN
10. **ฟีเจอร์ใดที่เสนอไว้แต่จงใจไม่ได้พัฒนา และเพราะเหตุใด?**
    - ทราฟฟิกเงา / การทดลอง — มีการพัฒนาไว้แล้ว
      (`combo/shadowRouting.ts`); จึงไม่สร้างใหม่
    - Guardrails — มีการพัฒนาไว้แล้ว (`src/lib/guardrails/`); จึงไม่ทำซ้ำ
    - Semantic cache — มีการพัฒนาไว้แล้ว (`src/lib/semanticCache.ts`); จึงไม่ทำซ้ำ
    - แพลตฟอร์มจัดการการทดลองแบบเต็มรูปแบบ เครื่องมือชุดข้อมูล แพลตฟอร์มเพิ่มประสิทธิภาพพรอมต์
      vector DB หรือโครงสร้างพื้นฐาน OTel ภายนอกที่บังคับใช้ — อยู่นอกขอบเขตของ
      data plane แบบกระชับ
    - โครงสร้าง `RoutingEvent` ภาษา Rust — data plane ใช้ TypeScript; ชนิดข้อมูล TS
      คือสิ่งที่ปรับใช้ให้เทียบเท่ากัน

## 8. เอกสารอ้างอิงการกำหนดค่า

| ตัวแปร                        | ค่าเริ่มต้น   | ผลลัพธ์                                                                              |
| ----------------------------- | ------------- | ------------------------------------------------------------------------------------ |
| `OMNIROUTE_OTEL_ENDPOINT`     | ไม่ได้ตั้งค่า | เมื่อตั้งค่า จะเปิดใช้งานตัวส่งออกการติดตาม OTLP/HTTP (เช่น `http://collector:4318`) |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | ไม่ได้ตั้งค่า | นามแฝงสำรองสำหรับปลายทาง OTLP                                                        |
| `OTEL_SERVICE_NAME`           | `omniroute`   | แอตทริบิวต์ทรัพยากร `service.name`                                                   |

## 9. การทดสอบ

- `tests/unit/routing-events.test.ts` — การปรับเหตุการณ์ให้อยู่ในรูปแบบมาตรฐาน การจำแนก
  สถานะ บัฟเฟอร์วงแหวนแบบจำกัดขนาด การกระจายไปยัง sink หลายตัว + การแยกความผิดพลาด
- `tests/unit/routing-quality.test.ts` — ช่วงอุ่นเครื่อง EWMA การกู้คืนจากความล้มเหลว/ความสำเร็จ
  บทลงโทษจากความผิดปกติ การจัดการ 429 แบบชั่วคราว snapshot และ reset
- `tests/unit/routing-scoring-quality.test.ts` — ความถูกต้องของน้ำหนัก ค่าเริ่มต้นแบบเป็นกลาง
  การจัดอันดับตามปัจจัยด้านคุณภาพ
- `tests/unit/routing-otel.test.ts` — เงื่อนไขการเปิดใช้งาน payload ของ span สำหรับ GenAI การ
  flush แบบอะซิงโครนัส และการทิ้งข้อมูลเมื่อโอเวอร์โหลด
- `tests/unit/routing-events-concurrency.test.ts` — เหตุการณ์หลายพันรายการ การคงขอบเขตขนาดของ
  บัฟเฟอร์วงแหวน การแยก sink ที่ throw ข้อผิดพลาด burst แบบอะซิงโครนัสที่สลับกัน
  และการ reset ระหว่างการแทรกข้อมูล
- `tests/unit/routing-adaptive-e2e.test.ts` — ลูปแบบต้นทางถึงปลายทางที่ให้ผลลัพธ์แน่นอนผ่าน
  ตัวให้คะแนน `scoreAutoTargets` จริง: ปกติ → เสื่อมลง → ฟื้นตัว → สะดุดชั่วคราว รวมถึง
  สถานการณ์ cold-start และผู้ให้บริการที่ยัง cold แต่โชคดี
- `tests/unit/stream-timing.test.ts` — TTFT (ชิ้นข้อมูลแรกที่ถูกส่งต่อ), ITL,
  ไบต์แรกเทียบกับการส่งต่อครั้งแรก การหยุดชะงัก และความปลอดภัยเมื่อชิ้นข้อมูลผิดรูปแบบ/ว่างเปล่า

## 10. สถานะปัญหาที่มีอยู่ก่อนแล้ว (Phase 18)

| ปัญหา                                                  | สถานะ                           | หมายเหตุ                                                                                                                                                                                                                                                                                  |
| ------------------------------------------------------ | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| การส่งออก `omniglyph` ไม่ตรงกัน                        | **แก้ไขแล้ว (ด้านสภาพแวดล้อม)** | `node_modules` ไม่ซิงค์กับ `package-lock.json` (ติดตั้ง 1.3.1 แต่ล็อกไว้ที่ 1.4.0) การเรียกใช้ `npm install omniglyph@1.4.0` คืนค่าเวอร์ชันที่ล็อกไว้ ทำให้ข้อผิดพลาดด้านชนิดข้อมูลลดลงเหลือ 0 โดยไม่มีการเปลี่ยนแปลงไฟล์ manifest                                                        |
| การทดสอบ `getKnownContextOverflow` ที่ล้าสมัย          | **ทราบแล้ว — ยังไม่ได้แก้ไข**   | `combo-context-overflow-compression-probe.test.ts` นำเข้าฟังก์ชันที่ไม่มีอยู่ใน `open-sse/services/combo.ts` อีกต่อไป (มีเพียงความคิดเห็นที่อ้างถึงฟังก์ชันนี้) การแก้ไขจำเป็นต้องนำฟังก์ชันกลับมาใช้ใหม่หรือเขียนการทดสอบเหล่านั้นใหม่ ซึ่งเป็นการเปลี่ยนแปลงสถาปัตยกรรมที่ไม่เกี่ยวข้อง |
| การแยก DB ของ `combo-runtime-unit-concurrency.test.ts` | **ทราบแล้ว — ยังไม่ได้แก้ไข**   | assertion สำหรับการแยก SQLite ของ test harness ล้มเหลวเมื่อเรียกใช้โดยตรง และล้มเหลวในลักษณะเดียวกันบน base branch                                                                                                                                                                        |
| ความคลาดเคลื่อนของ i18n `llm.txt`                      | **ทราบแล้ว — ยังไม่ได้แก้ไข**   | `docs/i18n/*/llm.txt` แตกต่างจากไฟล์ที่ root ซึ่งเป็นปัญหาที่มีอยู่ก่อนแล้วและขัดขวาง gate ของ pre-commit สำหรับการซิงค์เอกสาร                                                                                                                                                            |

ปัญหาด้านสภาพแวดล้อมและปัญหาด้านโค้ดถูกแยกออกจากกันอย่างชัดเจน โดยไม่มีการซ่อน
ความล้มเหลวที่ไม่เกี่ยวข้องไว้เบื้องหลังตัวกรองการทดสอบที่ถูกเปลี่ยนแปลง
