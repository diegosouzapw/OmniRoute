# Homologation Suite (`npm run homolog`) (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/HOMOLOGATION.md) · 🇪🇹 [am](../../../am/docs/ops/HOMOLOGATION.md) · 🇸🇦 [ar](../../../ar/docs/ops/HOMOLOGATION.md) · 🇦🇿 [az](../../../az/docs/ops/HOMOLOGATION.md) · 🇧🇬 [bg](../../../bg/docs/ops/HOMOLOGATION.md) · 🇧🇩 [bn](../../../bn/docs/ops/HOMOLOGATION.md) · 🇨🇿 [cs](../../../cs/docs/ops/HOMOLOGATION.md) · 🇩🇰 [da](../../../da/docs/ops/HOMOLOGATION.md) · 🇩🇪 [de](../../../de/docs/ops/HOMOLOGATION.md) · 🇬🇷 [el](../../../el/docs/ops/HOMOLOGATION.md) · 🇪🇸 [es](../../../es/docs/ops/HOMOLOGATION.md) · 🇪🇪 [et](../../../et/docs/ops/HOMOLOGATION.md) · 🇮🇷 [fa](../../../fa/docs/ops/HOMOLOGATION.md) · 🇫🇮 [fi](../../../fi/docs/ops/HOMOLOGATION.md) · 🇫🇷 [fr](../../../fr/docs/ops/HOMOLOGATION.md) · 🇮🇪 [ga](../../../ga/docs/ops/HOMOLOGATION.md) · 🇮🇳 [gu](../../../gu/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ha](../../../ha/docs/ops/HOMOLOGATION.md) · 🇮🇱 [he](../../../he/docs/ops/HOMOLOGATION.md) · 🇮🇳 [hi](../../../hi/docs/ops/HOMOLOGATION.md) · 🇭🇷 [hr](../../../hr/docs/ops/HOMOLOGATION.md) · 🇭🇺 [hu](../../../hu/docs/ops/HOMOLOGATION.md) · 🇦🇲 [hy](../../../hy/docs/ops/HOMOLOGATION.md) · 🇮🇩 [id](../../../id/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ig](../../../ig/docs/ops/HOMOLOGATION.md) · 🇮🇹 [it](../../../it/docs/ops/HOMOLOGATION.md) · 🇯🇵 [ja](../../../ja/docs/ops/HOMOLOGATION.md) · 🇬🇪 [ka](../../../ka/docs/ops/HOMOLOGATION.md) · 🇰🇭 [km](../../../km/docs/ops/HOMOLOGATION.md) · 🇮🇳 [kn](../../../kn/docs/ops/HOMOLOGATION.md) · 🇰🇷 [ko](../../../ko/docs/ops/HOMOLOGATION.md) · 🇱🇹 [lt](../../../lt/docs/ops/HOMOLOGATION.md) · 🇱🇻 [lv](../../../lv/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ml](../../../ml/docs/ops/HOMOLOGATION.md) · 🇮🇳 [mr](../../../mr/docs/ops/HOMOLOGATION.md) · 🇲🇾 [ms](../../../ms/docs/ops/HOMOLOGATION.md) · 🇲🇹 [mt](../../../mt/docs/ops/HOMOLOGATION.md) · 🇲🇲 [my](../../../my/docs/ops/HOMOLOGATION.md) · 🇳🇵 [ne](../../../ne/docs/ops/HOMOLOGATION.md) · 🇳🇱 [nl](../../../nl/docs/ops/HOMOLOGATION.md) · 🇳🇴 [no](../../../no/docs/ops/HOMOLOGATION.md) · 🇮🇳 [or](../../../or/docs/ops/HOMOLOGATION.md) · 🇮🇳 [pa](../../../pa/docs/ops/HOMOLOGATION.md) · 🇵🇭 [phi](../../../phi/docs/ops/HOMOLOGATION.md) · 🇵🇱 [pl](../../../pl/docs/ops/HOMOLOGATION.md) · 🇵🇹 [pt](../../../pt/docs/ops/HOMOLOGATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/HOMOLOGATION.md) · 🇷🇴 [ro](../../../ro/docs/ops/HOMOLOGATION.md) · 🇷🇺 [ru](../../../ru/docs/ops/HOMOLOGATION.md) · 🇱🇰 [si](../../../si/docs/ops/HOMOLOGATION.md) · 🇸🇰 [sk](../../../sk/docs/ops/HOMOLOGATION.md) · 🇸🇮 [sl](../../../sl/docs/ops/HOMOLOGATION.md) · 🇷🇸 [sr](../../../sr/docs/ops/HOMOLOGATION.md) · 🇸🇪 [sv](../../../sv/docs/ops/HOMOLOGATION.md) · 🇰🇪 [sw](../../../sw/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ta](../../../ta/docs/ops/HOMOLOGATION.md) · 🇮🇳 [te](../../../te/docs/ops/HOMOLOGATION.md) · 🇹🇷 [tr](../../../tr/docs/ops/HOMOLOGATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/HOMOLOGATION.md) · 🇵🇰 [ur](../../../ur/docs/ops/HOMOLOGATION.md) · 🇺🇿 [uz](../../../uz/docs/ops/HOMOLOGATION.md) · 🇻🇳 [vi](../../../vi/docs/ops/HOMOLOGATION.md) · 🇳🇬 [yo](../../../yo/docs/ops/HOMOLOGATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/HOMOLOGATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/HOMOLOGATION.md)

---

การตรวจสอบ E2E บนสภาพแวดล้อมจริงของการ deploy OmniRoute ที่ทำงานอยู่บน VPS สำหรับ homologation
(`HOMOLOG_BASE_URL` เช่น `http://192.168.0.15:20128`) คำสั่งเดียวใช้แทนรายการตรวจสอบ STOP #2
ของ release ที่เคยต้องดำเนินการด้วยตนเอง ด้วยการรันแบบอัตโนมัติที่สร้างหลักฐานประกอบ

## สิ่งที่ครอบคลุม

| เลเยอร์                  | สิ่งที่ตรวจสอบ                                                                                                                                                                                            | การนำไปใช้งาน                                                                 |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| L0 — สุขภาพ/ความสอดคล้อง | `/api/monitoring/health` ตอบกลับด้วย `200` พร้อม `status: "healthy"` และเวอร์ชันที่คาดไว้                                                                                                                 | `scripts/homolog/lib/parity.mjs`                                              |
| L1a — คีย์ชั่วคราว       | เข้าสู่ระบบในฐานะผู้ดูแลระบบ → `POST /api/keys` สร้าง API key แบบจำกัดขอบเขตสำหรับการรัน และเพิกถอน (`DELETE /api/keys/:id`) ในบล็อก `finally` ไม่ว่าผลลัพธ์จะเป็นอย่างไร                                 | `scripts/homolog/lib/adminClient.mjs`                                         |
| L1b — พื้นผิว API        | แค็ตตาล็อก `/v1/models`, chat completion แบบไม่สตรีมจริงหนึ่งครั้ง (โมเดลสำคัญต่อ tier, `max_tokens: 5`), การตอบกลับ `401` สำหรับคีย์ที่ไม่ถูกต้อง และ `/api/monitoring/health` แบบสาธารณะ                | `tests/homolog/api/core.http` (httpYac)                                       |
| L1c — การสตรีม SSE       | chat completion แบบสตรีมจริง โดยยืนยัน `text/event-stream`, content delta อย่างน้อยหนึ่งรายการ และตัวสิ้นสุด `[DONE]`                                                                                     | `scripts/homolog/lib/sseCheck.mjs`                                            |
| L2 — ผู้ให้บริการจริง    | คำขอแชตต้นทุนต่ำสุดหนึ่งรายการต่อผู้ให้บริการสำคัญแต่ละรายที่ปรากฏในแค็ตตาล็อก `/v1/models` จริง โดยสร้างขึ้นทันทีผ่าน promptfoo                                                                          | `scripts/homolog/gen-promptfoo.mjs` + `scripts/homolog/lib/providerTiers.mjs` |
| L4a — การยืนยันตัวตน UI  | เข้าสู่ระบบหนึ่งครั้งผ่านฟอร์มเข้าสู่ระบบจริง และนำเซสชัน (`storageState`) กลับมาใช้ซ้ำทั่วทั้งเลเยอร์ UI                                                                                                 | `tests/homolog/ui/auth.setup.ts`                                              |
| L4b — route ของ UI       | ทุก `page.tsx` แบบ static ภายใต้ `src/app/(dashboard)/dashboard` (ค้นหาจากระบบไฟล์ โดยข้าม route แบบ dynamic `[param]`) โหลดได้โดยไม่มีข้อผิดพลาด HTTP, ข้อผิดพลาดของหน้า หรือ error boundary ของ Next.js | `tests/homolog/ui/routes.spec.ts`                                             |
| L4c — โฟลว์สำคัญของ UI   | สร้าง API key ผ่าน UI ของแดชบอร์ดและเพิกถอนอีกครั้ง (ไม่ทิ้งข้อมูลตกค้างไว้บน VPS)                                                                                                                        | `tests/homolog/ui/api-key-flow.spec.ts`                                       |
| L5 — รายงานรวม           | รวม httpYac (ผ่าน `junit-to-ctrf`), อะแดปเตอร์ promptfoo→CTRF และตัวรายงาน CTRF ของ Playwright เข้าเป็นไฟล์ `homolog-ctrf.json` หนึ่งไฟล์ พร้อม `homolog-report/summary.md` ที่มนุษย์อ่านเข้าใจได้        | `scripts/homolog/run.mjs`                                                     |

ไม่มีการใช้ LLM ในการ replay — นี่คือชุดการทดสอบ regression แบบกำหนดผลลัพธ์แน่นอน
ไม่ใช่ eval โดย AI จะเข้ามามีบทบาทเฉพาะในงานบำรุงรักษาในอนาคตเท่านั้น (ดู Roadmap ด้านล่าง)

## ข้อกำหนดเบื้องต้น

1. คัดลอก `.env.homolog.example` ไปเป็น `.env.homolog` (ถูกละเว้นโดย git — ห้าม commit ไฟล์นี้โดยเด็ดขาด) และกรอกข้อมูลต่อไปนี้:
   - `HOMOLOG_BASE_URL` — ระบบที่ติดตั้งใช้งานเป้าหมาย เช่น `http://192.168.0.15:20128`
   - `HOMOLOG_ADMIN_PASSWORD` — รหัสผ่านสำหรับจัดการแดชบอร์ดของระบบที่ติดตั้งใช้งานนั้น
   - `HOMOLOG_CRITICAL_PROVIDERS` — คำนำหน้าของผู้ให้บริการที่คั่นด้วยจุลภาค ซึ่งจะได้รับ
     คำขอแชตจริงสำหรับการทดสอบ smoke (เช่น `openai,anthropic,gemini,codex,grok,glm,deepseek,openrouter`)
   - `HOMOLOG_API_KEY` — ปล่อยว่างไว้สำหรับการรันตามปกติ ชุดทดสอบจะสร้างและเพิกถอนคีย์
     ชั่วคราวของตัวเอง ให้กำหนดค่านี้เฉพาะเมื่อต้องการดีบักเลเยอร์เดียวแบบแยกส่วนเท่านั้น
2. รัน `npm install` ใน repo (การพึ่งพาของชุดทดสอบ ได้แก่ `httpyac`, `promptfoo`,
   `playwright-ctrf-json-reporter`, `junit-to-ctrf`, `ctrf` ซึ่งเป็น devDependencies ตามปกติ)
3. รัน `npx playwright install` หากยังไม่มีไบนารีของเบราว์เซอร์

## วิธีรัน

```bash
npm run homolog
```

หากต้องการตรวจสอบกับระบบที่ติดตั้งใช้งานซึ่งมีเวอร์ชันไม่ตรงกับ `package.json` ในเครื่อง
(เช่น เครื่อง homologation ที่ยังคงใช้แพตช์รีลีสก่อนหน้า) ให้กำหนดเวอร์ชันที่คาดหวัง
อย่างชัดเจน:

```bash
HOMOLOG_EXPECT_VERSION=3.8.47 npm run homolog
```

การรันจะจบด้วยสถานะที่ไม่ใช่ศูนย์หากเลเยอร์ใดล้มเหลว และจะพยายามเพิกถอนคีย์ API ชั่วคราว
ที่สร้างขึ้นเสมอ แม้จะเกิดความล้มเหลวก็ตาม (บล็อก `finally` ใน `scripts/homolog/run.mjs`)

## การอ่านรายงาน

เอาต์พุตทั้งหมดจะอยู่ใน `homolog-report/` (ถูกละเว้นโดย git):

- `summary.md` — ตารางเดียวกับที่พิมพ์ไปยัง stdout โดยมีหนึ่งแถวต่อหนึ่งเลเยอร์ (✅/❌ + รายละเอียด)
- `homolog-ctrf.json` — รายงาน CTRF แบบรวม (ผสานผลลัพธ์จาก API/SSE, provider-smoke และ
  UI) — นี่คืออาร์ติแฟกต์ที่ต้องแนบกับรายการตรวจสอบ STOP #2 ของรีลีส
- `httpyac-junit.xml`, `api-ctrf.json`, `providers-ctrf.json`, `ui-ctrf.json` — รายงาน
  ดิบ/รายงานขั้นกลางของแต่ละเลเยอร์
- `promptfooconfig.yaml`, `provider-misses.json` — การกำหนดค่า promptfoo ที่สร้างขึ้นสำหรับ
  การรันปัจจุบัน และผู้ให้บริการสำคัญใดๆ ที่ไม่พบในแค็ตตาล็อกจริง

หาก L0 ล้มเหลว ระบบจะยุติทันที (ไม่มีการสร้างคีย์ชั่วคราว) เนื่องจากเวอร์ชัน/สถานะความพร้อม
ที่ไม่ตรงกันหมายความว่าเลเยอร์ถัดไปทั้งหมดจะกำลังตรวจสอบระบบที่ติดตั้งใช้งานผิดตัว

## การกำหนด baseline ใหม่เมื่อ UI เปลี่ยนแปลงโดยชอบ

L4b (การทดสอบ smoke ของเส้นทาง) และ L4c (โฟลว์ UI สำหรับคีย์ API) ขับเคลื่อนด้วยตัวระบุตำแหน่ง DOM จริง ไม่ใช่
snapshot ดังนั้นการเปลี่ยนแปลง UI ที่ชอบด้วยเหตุผลส่วนใหญ่จึงไม่จำเป็นต้องอัปเดตชุดทดสอบ เมื่อการเปลี่ยนแปลง
ทำให้ตัวระบุตำแหน่งใช้งานไม่ได้จริง (เช่น เปลี่ยนชื่อป้ายกำกับปุ่มหรือย้ายหน้าการตั้งค่า):

1. ยืนยันตัวระบุตำแหน่งกับซอร์สปัจจุบันอีกครั้ง (ข้อกำหนดการทดสอบมีการระบุไว้แล้วว่า
   ตัวระบุตำแหน่งแต่ละรายการได้รับการยืนยันกับไฟล์/บรรทัดใด — ให้ทำตามรูปแบบเดิม อย่าคาดเดา)
2. อัปเดตข้อกำหนดการทดสอบใน `tests/homolog/ui/`
3. รัน `npm run homolog` อีกครั้ง (หรือรันเฉพาะข้อกำหนดการทดสอบ Playwright ที่ได้รับผลกระทบ) กับ VPS เพื่อ
   ยืนยันการแก้ไข จากนั้นจึง commit

ชุดทดสอบนี้ไม่มี baseline เชิงภาพ/พิกเซล (F1) — โปรดดู Roadmap สำหรับรายการดังกล่าว

## Roadmap (F2 / F3)

การออกแบบและแผนเปิดใช้งานเป็นระยะอยู่ในข้อกำหนดการวางแผนภายใน
`_tasks/superpowers/specs/2026-07-13-homolog-e2e-suite-design.md` (ไม่มีลิงก์ — เป็นอาร์ติแฟกต์
ภายใน `_tasks/` และไม่ใช่ส่วนหนึ่งของเอกสารที่ติดตามใน repo นี้) สรุปดังนี้:

- **F2** — การบันทึกขั้นตอนการใช้งานแบบเต็ม → Playwright Test Agents (`planner`/`generator`)
  แปลงเป็นข้อกำหนดโฟลว์ (สร้าง combo, ทดสอบผู้ให้บริการ, แก้ไขการตั้งค่า, เครื่องมือ MCP) +
  baseline สำหรับ visual regression (Lost Pixel) พร้อมมาสก์ปิดข้อมูลที่เปลี่ยนแปลงได้ (เมตริก,
  timestamp, log) + รูทีนบำรุงรักษา `healer` สำหรับแต่ละรีลีส
- **F3** — ความครอบคลุมด้านความทนทาน/สัญญา/การเชื่อมต่อ: toxiproxy + ผู้ให้บริการปลอมที่เข้ากันได้กับ OpenAI
  บน devbox, combo `homolog-resilience` บน VPS ที่ชี้ไปยังบริการดังกล่าว
  (ฉีด timeout → ตรวจยืนยัน fallback + การเปิด/ปิด circuit breaker ผ่าน
  `/api/monitoring/health`); การทดสอบสัญญาด้วย Schemathesis แบบมีเงื่อนไขกับ
  `docs/openapi.yaml` (ค่า `--max-examples` ต่ำ, seed คงที่, เฉพาะ endpoint ที่ไม่ใช่ LLM); และ
  การเชื่อม `npm run homolog` + `summary.md` ของคำสั่งดังกล่าวเข้ากับขั้นตอน STOP #2 ของ `/generate-release`
