# Evaluations (Evals) (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EVALS.md) · 🇪🇹 [am](../../../am/docs/frameworks/EVALS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EVALS.md) · 🇦🇿 [az](../../../az/docs/frameworks/EVALS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EVALS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EVALS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EVALS.md) · 🇩🇰 [da](../../../da/docs/frameworks/EVALS.md) · 🇩🇪 [de](../../../de/docs/frameworks/EVALS.md) · 🇬🇷 [el](../../../el/docs/frameworks/EVALS.md) · 🇪🇸 [es](../../../es/docs/frameworks/EVALS.md) · 🇪🇪 [et](../../../et/docs/frameworks/EVALS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EVALS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EVALS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EVALS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EVALS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EVALS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EVALS.md) · 🇮🇱 [he](../../../he/docs/frameworks/EVALS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EVALS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EVALS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EVALS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EVALS.md) · 🇮🇩 [id](../../../id/docs/frameworks/EVALS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EVALS.md) · 🇮🇹 [it](../../../it/docs/frameworks/EVALS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EVALS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EVALS.md) · 🇰🇭 [km](../../../km/docs/frameworks/EVALS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EVALS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EVALS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EVALS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EVALS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EVALS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EVALS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EVALS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EVALS.md) · 🇲🇲 [my](../../../my/docs/frameworks/EVALS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EVALS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EVALS.md) · 🇳🇴 [no](../../../no/docs/frameworks/EVALS.md) · 🇮🇳 [or](../../../or/docs/frameworks/EVALS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EVALS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EVALS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EVALS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EVALS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EVALS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EVALS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EVALS.md) · 🇱🇰 [si](../../../si/docs/frameworks/EVALS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EVALS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EVALS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EVALS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EVALS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EVALS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EVALS.md) · 🇮🇳 [te](../../../te/docs/frameworks/EVALS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EVALS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EVALS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EVALS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EVALS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EVALS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EVALS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EVALS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EVALS.md)

---

> **แหล่งข้อมูลที่เชื่อถือได้:** `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
> **อัปเดตล่าสุด:** 2026-06-28 — v3.8.40

OmniRoute มาพร้อมเฟรมเวิร์กการประเมินแบบทั่วไปที่คุณสามารถใช้เพื่อวัดประสิทธิภาพของการกำหนดค่าการกำหนดเส้นทาง ผู้ให้บริการ/โมเดลแบบเดี่ยว หรือชุดการทดสอบ "golden set" ที่รวมมาให้
ใช้เฟรมเวิร์กนี้เพื่อตรวจสอบการเปลี่ยนแปลงการกำหนดเส้นทาง ตรวจสอบความถูกต้องของผู้ให้บริการรายใหม่ และควบคุมการเผยแพร่
ก่อนนำไปใช้กับทราฟฟิกจริงในระบบงานที่ใช้งานจริง

เฟรมเวิร์กนี้ประกอบด้วย:

- ตัวรันแบบเพียว (`src/lib/evals/evalRunner.ts`) ซึ่งลงทะเบียนชุดการทดสอบในตัวไว้ในหน่วยความจำ
  ประเมินผลลัพธ์เทียบกับเกณฑ์ที่คาดหวัง และรวบรวมตารางคะแนน
- เลเยอร์การจัดเก็บข้อมูลถาวร (`src/lib/db/evals.ts`) สำหรับชุดการทดสอบแบบกำหนดเอง (ที่ผู้ใช้กำหนด)
  และประวัติการรันใน SQLite
- เลเยอร์การประสานงาน (`src/lib/evals/runtime.ts`) ซึ่งเรียกใช้งานแต่ละกรณี
  โดยส่งคำขอจริงไปยัง `POST /v1/chat/completions` บันทึกเวลาแฝง
  และผลลัพธ์ ตลอดจนจัดเก็บข้อมูลการรัน
- เอ็นด์พอยต์ REST ภายใต้ `/api/evals/*` (สำหรับการตรวจสอบสิทธิ์ระดับการจัดการเท่านั้น)
- หน้าจอแดชบอร์ดที่ `Dashboard → Usage → Evals` (`EvalsTab.tsx`)

## แนวคิด

### ชุดการทดสอบ

ชุดการทดสอบคือกลุ่มกรณีทดสอบที่มีชื่อ พร้อม `description` และกรณีทดสอบอย่างน้อยหนึ่งกรณี
ชุดการทดสอบมาจากสองแหล่ง:

| แหล่งที่มา | กำหนดไว้ที่ใด                                 | แก้ไขได้ขณะรันไทม์หรือไม่? |
| ---------- | --------------------------------------------- | -------------------------- |
| `built-in` | ลงทะเบียนผ่าน `registerSuite()` ขณะบูต        | ไม่ได้ (กำหนดด้วยโค้ด)     |
| `custom`   | จัดเก็บใน SQLite `eval_suites` + `eval_cases` | ได้ (ผ่าน API/UI)          |

ชุดการทดสอบในตัวที่มีอยู่ในปัจจุบัน (ดู `src/lib/evals/evalRunner.ts`):

- `golden-set` — กรณีพื้นฐาน 10 กรณี ครอบคลุมการทักทาย/คณิตศาสตร์/การแปล/ความปลอดภัย
- `coding-proficiency` — Python/JS/SQL/TS/การตรวจจับข้อบกพร่อง
- `reasoning-logic` — ตรรกศาสตร์เชิงพยางค์ โจทย์ปัญหา และการจดจำรูปแบบ
- `multilingual` — การแปลและการตรวจจับภาษา
- `safety-guardrails` — PII, jailbreak, การปฏิเสธ และการตระหนักถึงอคติ
- `instruction-following` — JSON เท่านั้น รายการลำดับเลข และข้อจำกัดด้านภาษา
- `codex-comparison` — งานเขียนโค้ดแบบเปรียบเทียบกันโดยตรงที่ออกแบบมาสำหรับโหมดเปรียบเทียบ

### กรณีทดสอบ

แต่ละกรณีมีข้อมูลดังต่อไปนี้:

| ฟิลด์      | คำอธิบาย                                                      |
| ---------- | ------------------------------------------------------------- |
| `id`       | ตัวระบุแบบคงที่ (ใช้เป็นคีย์สำหรับผลลัพธ์และเมตริก)           |
| `name`     | ป้ายกำกับที่มนุษย์อ่านเข้าใจได้                               |
| `model`    | โมเดลเริ่มต้นเมื่อการรันใช้เป้าหมาย `suite-default`           |
| `input`    | `{ messages, max_tokens? }` — ส่งไปยัง `/v1/chat/completions` |
| `expected` | `{ strategy, value }` — เกณฑ์การให้คะแนน (ดูด้านล่าง)         |
| `tags`     | ป้ายกำกับที่ไม่บังคับ (เช่น `safety`, `pii`, `jailbreak`)     |

### เป้าหมาย

ชุดการทดสอบเดียวกันสามารถรันกับเป้าหมายที่แตกต่างกันได้ สคีมาของเป้าหมายคือ
`evalTargetSchema` ใน `src/shared/validation/schemas.ts`:

| ประเภทเป้าหมาย  | `id`      | ลักษณะการทำงาน                                                 |
| --------------- | --------- | -------------------------------------------------------------- |
| `suite-default` | `null`    | แต่ละกรณีใช้ฟิลด์ `model` ในตัวของตนเอง                        |
| `model`         | ชื่อโมเดล | บังคับให้ทุกกรณีผ่านโมเดลโดยตรงเพียงโมเดลเดียว (เช่น `gpt-4o`) |
| `combo`         | ชื่อคอมโบ | รันทุกกรณีผ่านคอมโบเดียว (ทดสอบกลไกการกำหนดเส้นทาง)            |

สำหรับ `model` และ `combo` จำเป็นต้องระบุฟิลด์ `id` (บังคับใช้โดย Zod
`superRefine`) เมื่อระบุ `compareTarget` เป้าหมายทั้งสองต้องแตกต่างกัน —
ตัวรันจะจัดเก็บการรันทั้งสองภายใต้ `runGroupId` เดียวกันเพื่อการเปรียบเทียบ A/B

## เกณฑ์การให้คะแนน

นำไปใช้งานใน `evaluateCase()` (evalRunner.ts):

| กลยุทธ์    | ผ่านเมื่อ…                                                           |
| ---------- | -------------------------------------------------------------------- |
| `exact`    | `actualOutput === expected.value`                                    |
| `contains` | `actualOutput.toLowerCase().includes(expected.value.toLowerCase())`  |
| `regex`    | `new RegExp(expected.value).test(actualOutput)` เป็นค่าจริง          |
| `custom`   | `expected.fn(actualOutput, evalCase)` คืนค่าเป็นจริง (เฉพาะแบบในตัว) |

**หมายเหตุ:** การให้คะแนนด้วยฟังก์ชันแบบกำหนดเองสงวนไว้สำหรับชุดทดสอบที่กำหนดไว้ในโค้ด (แบบในตัว)
เนื่องจากฟังก์ชันไม่สามารถทำซีเรียลไลซ์ผ่าน API ได้
`evalCaseBuilderSchema` ยอมรับเฉพาะ `contains | exact | regex` สำหรับ
ชุดทดสอบที่ผู้ใช้สร้างขึ้น

ปัจจุบันยังไม่มีตัวให้คะแนนแบบใช้ LLM เป็นผู้ตัดสินหรือแบบวัดความคล้ายคลึงด้วย embedding ซึ่ง
สามารถเพิ่มเป็นส่วนขยายใน `evaluateCase()` ได้อย่างลงตัว

## สคีมาฐานข้อมูล

มีสามตาราง (ไมเกรชัน `030_create_eval_runs.sql` และ
`031_create_eval_suites.sql`):

| ตาราง         | วัตถุประสงค์                                                                                                               |
| ------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `eval_suites` | เมทาดาทาของชุดทดสอบแบบกำหนดเอง (`id`, `name`, `description`)                                                               |
| `eval_cases`  | กรณีทดสอบต่อชุดทดสอบ — `input_json`, `expected_*`, `tags_json`                                                             |
| `eval_runs`   | ประวัติการรัน — `pass_rate`, `total`, `passed`, `failed`, `avg_latency_ms`, `summary_json`, `results_json`, `outputs_json` |

ชุดทดสอบในตัว **ไม่ได้** ถูกจัดเก็บไว้ในฐานข้อมูล แต่จะอยู่ในหน่วยความจำและ
ถูกลงทะเบียนใหม่ทุกครั้งที่มีการนำเข้า `evalRunner.ts`

## REST API

ทุก endpoint ต้องใช้การยืนยันตัวตนสำหรับการจัดการ (`requireManagementAuth`) โดยไม่ได้
เป็นส่วนหนึ่งของพื้นผิวพร็อกซีสาธารณะ

| Endpoint                      | เมธอด    | คำอธิบาย                                                         |
| ----------------------------- | -------- | ---------------------------------------------------------------- |
| `/api/evals`                  | `GET`    | แสดงรายการชุดทดสอบ + การรันล่าสุด + ตารางคะแนน + เป้าหมาย + คีย์ |
| `/api/evals`                  | `POST`   | รันชุดทดสอบ (เดี่ยวหรือเปรียบเทียบ) — สคีมา `evalRunSuiteSchema` |
| `/api/evals/{suiteId}`        | `GET`    | ดึงข้อมูลชุดทดสอบหนึ่งชุด (แบบในตัวหรือแบบกำหนดเอง)              |
| `/api/evals/suites`           | `POST`   | สร้างชุดทดสอบแบบกำหนดเอง — สคีมา `evalSuiteSaveSchema`           |
| `/api/evals/suites/{suiteId}` | `GET`    | ดึงข้อมูลชุดทดสอบแบบกำหนดเอง                                     |
| `/api/evals/suites/{suiteId}` | `PUT`    | แทนที่ชุดทดสอบแบบกำหนดเอง (กรณีทดสอบจะถูกแทรกใหม่)               |
| `/api/evals/suites/{suiteId}` | `DELETE` | ลบชุดทดสอบแบบกำหนดเองและกรณีทดสอบของชุดนั้น                      |

### การรันชุดทดสอบ

```bash
curl -X POST http://localhost:20128/api/evals \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "suiteId": "golden-set",
    "target": { "type": "combo", "id": "my-combo" },
    "apiKeyId": "optional-api-key-uuid"
  }'
```

ฟิลด์ที่ไม่บังคับ:

- `outputs` — `Record<caseId, string>` ของเอาต์พุตที่คำนวณไว้ล่วงหน้า เมื่อระบุฟิลด์นี้
  ตัวรันจะ **ข้ามการส่งคำขอ** และให้คะแนนเฉพาะเอาต์พุตที่แคชไว้เท่านั้น (มีประโยชน์สำหรับ
  การประเมินผลแบบออฟไลน์)
- `compareTarget` — เป้าหมายที่สองสำหรับรันแบบขนาน โดยทั้งสองการรันจะใช้
  `runGroupId` ที่สร้างขึ้นร่วมกันเพื่อดูผลแบบเทียบกันโดยตรง
- `apiKeyId` — API key ภายในที่ใช้ยืนยันตัวตนของคำขอ
  `/v1/chat/completions` ที่ส่งออกไป จำเป็นเมื่อเปิดใช้งาน `REQUIRE_API_KEY`

### การสร้างชุดทดสอบแบบกำหนดเอง

```bash
curl -X POST http://localhost:20128/api/evals/suites \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Production smoke",
    "description": "Quick sanity check before deploy",
    "cases": [
      {
        "name": "JSON shape",
        "model": "gpt-4o",
        "input": { "messages": [{ "role": "user", "content": "Reply with {\"ok\": true}" }] },
        "expected": { "strategy": "regex", "value": "\"ok\"\\s*:\\s*true" }
      }
    ]
  }'
```

## ไปป์ไลน์การส่งต่อ

`runEvalSuiteAgainstTarget()` (`src/lib/evals/runtime.ts`):

1. แก้ไขและระบุชุดการทดสอบที่จะใช้ (แบบในตัวหรือกำหนดเอง)
2. สำหรับแต่ละกรณี สร้าง `Request` ไปยัง `/v1/chat/completions` โดยใช้
   `messages` ของกรณีนั้น, `model` ที่ระบุแล้ว, `stream: false` และ `max_tokens: 512`
   (หรือค่าที่กรณีนั้นกำหนดทับไว้)
3. เรียกใช้ตัวจัดการแชตโดยตรง (ภายในโปรเซส — ไม่มีการส่งคำขอ HTTP เพิ่มเติม)
4. บันทึกเวลาแฝงและแยกข้อความจาก `choices[0].message.content`
   หรือเพย์โหลด `output[]` ของ Responses API
5. ให้คะแนนเอาต์พุตทั้งหมดผ่าน `runSuite()` จากนั้นจัดเก็บด้วย `saveEvalRun()`

กรณีต่างๆ จะทำงานแบบ **ตามลำดับ** ปัจจุบันยังไม่มีแฟล็กสำหรับการทำงานพร้อมกัน

## แดชบอร์ด

UI อยู่ที่ `Dashboard → Usage → Evals`
(`src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`) จากที่นี่ คุณสามารถ:

- เรียกดูชุดการทดสอบแบบในตัวและแบบกำหนดเอง พร้อมดูตัวอย่างทีละกรณี
- สร้าง/แก้ไข/ลบชุดการทดสอบแบบกำหนดเองด้วยตัวสร้างกรณี
- เลือกเป้าหมาย (ค่าเริ่มต้นของชุดการทดสอบ / โมเดล / คอมโบ), เลือก
  `compareTarget` ตัวที่สองได้หากต้องการ, เลือก API key ได้หากต้องการ แล้วสั่งทำงานตามต้องการ
- ตรวจสอบประวัติการทำงาน, สถานะผ่าน/ไม่ผ่านของแต่ละกรณี, เวลาแฝง และเอาต์พุตที่บันทึกไว้
- ดูตารางคะแนนต่อเนื่องที่รวบรวมจากการทำงานล่าสุดในแต่ละขอบเขต
  `(suite, target)`

## ความสัมพันธ์กับ RFC ของการประเมินอัตโนมัติ

ระบบย่อยสำหรับการประเมินที่แยกต่างหากและมีขอบเขตแคบกว่าอยู่ที่ `src/domain/assessment/`
(ดูเพิ่มเติมที่ [AUTO-COMBO.md](../routing/AUTO-COMBO.md) สำหรับกลไกการให้คะแนนแบบใช้งานจริง)
ระบบย่อยนี้มุ่งเน้นไปที่กลไก Auto Combo — โดยให้คะแนนผู้ให้บริการและ
โมเดลโดยอัตโนมัติ เพื่อให้คอมโบสามารถฟื้นฟูตัวเองได้เมื่อระบบต้นทางล้มเหลว ระบบนี้ใช้ตัวดำเนินการ,
ตัวจัดหมวดหมู่ และตรรกะการให้คะแนนของตัวเอง

เฟรมเวิร์ก Evals ที่อธิบายไว้ในเอกสารนี้คือ **พื้นผิวการทดสอบอเนกประสงค์
ที่มีขอบเขตกว้างกว่า** ควรใช้สำหรับชุดการทดสอบการถดถอยทั่วไป, การเปรียบเทียบ A/B
และการทดสอบแบบ smoke test รายรีลีส ใช้ระบบย่อย Auto-Assessment เมื่อคุณต้องการ
ให้สถานะความพร้อมใช้งานแบบเรียลไทม์ของผู้ให้บริการมีอิทธิพลต่อการตัดสินใจด้านการกำหนดเส้นทาง

## การผสานรวมกับ CI

ปัจจุบันยังไม่มีสคริปต์ npm สำหรับ `eval:ci` โดยเฉพาะ หากคุณต้องการ
กำหนดให้ผลการประเมินเป็นเงื่อนไขในการรีลีส มีสองแนวทาง:

- **เส้นทาง HTTP**: เปิดใช้งานเซิร์ฟเวอร์, ส่งคำขอ `POST /api/evals` พร้อม
  `suiteId` + `target` ที่ทราบค่า และตรวจสอบว่า `runs[].summary.passRate >= N` ใน
  การตอบกลับ
- **เส้นทางภายในโปรเซส**: นำเข้า `runEvalSuiteAgainstTarget()` จาก
  `@/lib/evals/runtime` ในสคริปต์, เรียกใช้กับฐานข้อมูลทดสอบ และตรวจสอบ
  `PersistedEvalRun.summary` ที่ส่งคืน

การทดสอบที่ครอบคลุมเส้นทางและประวัติอยู่ที่
`tests/unit/evals-route.test.ts` และ `tests/unit/evals-history.test.ts`

## จุดสำหรับขยายความสามารถ

การเปลี่ยนแปลงที่พบบ่อยและตำแหน่งที่ต้องแก้ไข:

- **กลยุทธ์การให้คะแนนใหม่** — ขยายบล็อก `switch (evalCase.expected.strategy)`
  ใน `evaluateCase()` (`evalRunner.ts`) และขยาย `EvalCaseStrategy` ใน
  `src/lib/db/evals.ts` รวมถึง `evalCaseBuilderSchema` ใน `schemas.ts`
- **ชุดการทดสอบในตัวใหม่** — กำหนดอ็อบเจ็กต์ชุดการทดสอบและเรียก `registerSuite()` ที่
  ส่วนท้ายของ `evalRunner.ts` โดย `listSuites()` จะค้นพบชุดดังกล่าวโดยอัตโนมัติ
- **ทำงานพร้อมกัน** — เปลี่ยนลูป `for` แบบตามลำดับใน
  `runEvalSuiteAgainstTarget()` ให้เป็น `Promise.all` แบบจำกัดจำนวนงาน (ปัจจุบันยังไม่มี
  การควบคุมการทำงานพร้อมกัน)
- **กรณีการสตรีม/การเรียกใช้เครื่องมือ** — ปัจจุบันตัวดำเนินการบังคับใช้ `stream: false`
  การประเมินที่รองรับการสตรีมหรือรับรู้การเรียกใช้เครื่องมือจะต้องแก้ไข `runtime.ts`
  (บันทึกและรวมส่วนข้อมูล SSE ก่อนให้คะแนน)

## ดูเพิ่มเติม

- [USER_GUIDE.md](../guides/USER_GUIDE.md) — คู่มือแนะนำการใช้งานผลิตภัณฑ์โดยรวม
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — เอกสารอ้างอิงไปป์ไลน์คำขอ
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — กลไกการให้คะแนน Auto Combo (รันไทม์ที่ใช้งานจริง)
- ซอร์สโค้ด: `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
- UI: `src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`
