# AgentRouter Setup Guide (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/AGENTROUTER.md) · 🇪🇹 [am](../../../am/docs/providers/AGENTROUTER.md) · 🇸🇦 [ar](../../../ar/docs/providers/AGENTROUTER.md) · 🇦🇿 [az](../../../az/docs/providers/AGENTROUTER.md) · 🇧🇬 [bg](../../../bg/docs/providers/AGENTROUTER.md) · 🇧🇩 [bn](../../../bn/docs/providers/AGENTROUTER.md) · 🇨🇿 [cs](../../../cs/docs/providers/AGENTROUTER.md) · 🇩🇰 [da](../../../da/docs/providers/AGENTROUTER.md) · 🇩🇪 [de](../../../de/docs/providers/AGENTROUTER.md) · 🇬🇷 [el](../../../el/docs/providers/AGENTROUTER.md) · 🇪🇸 [es](../../../es/docs/providers/AGENTROUTER.md) · 🇪🇪 [et](../../../et/docs/providers/AGENTROUTER.md) · 🇮🇷 [fa](../../../fa/docs/providers/AGENTROUTER.md) · 🇫🇮 [fi](../../../fi/docs/providers/AGENTROUTER.md) · 🇫🇷 [fr](../../../fr/docs/providers/AGENTROUTER.md) · 🇮🇪 [ga](../../../ga/docs/providers/AGENTROUTER.md) · 🇮🇳 [gu](../../../gu/docs/providers/AGENTROUTER.md) · 🇳🇬 [ha](../../../ha/docs/providers/AGENTROUTER.md) · 🇮🇱 [he](../../../he/docs/providers/AGENTROUTER.md) · 🇮🇳 [hi](../../../hi/docs/providers/AGENTROUTER.md) · 🇭🇷 [hr](../../../hr/docs/providers/AGENTROUTER.md) · 🇭🇺 [hu](../../../hu/docs/providers/AGENTROUTER.md) · 🇦🇲 [hy](../../../hy/docs/providers/AGENTROUTER.md) · 🇮🇩 [id](../../../id/docs/providers/AGENTROUTER.md) · 🇳🇬 [ig](../../../ig/docs/providers/AGENTROUTER.md) · 🇮🇹 [it](../../../it/docs/providers/AGENTROUTER.md) · 🇯🇵 [ja](../../../ja/docs/providers/AGENTROUTER.md) · 🇬🇪 [ka](../../../ka/docs/providers/AGENTROUTER.md) · 🇰🇭 [km](../../../km/docs/providers/AGENTROUTER.md) · 🇮🇳 [kn](../../../kn/docs/providers/AGENTROUTER.md) · 🇰🇷 [ko](../../../ko/docs/providers/AGENTROUTER.md) · 🇱🇹 [lt](../../../lt/docs/providers/AGENTROUTER.md) · 🇱🇻 [lv](../../../lv/docs/providers/AGENTROUTER.md) · 🇮🇳 [ml](../../../ml/docs/providers/AGENTROUTER.md) · 🇮🇳 [mr](../../../mr/docs/providers/AGENTROUTER.md) · 🇲🇾 [ms](../../../ms/docs/providers/AGENTROUTER.md) · 🇲🇹 [mt](../../../mt/docs/providers/AGENTROUTER.md) · 🇲🇲 [my](../../../my/docs/providers/AGENTROUTER.md) · 🇳🇵 [ne](../../../ne/docs/providers/AGENTROUTER.md) · 🇳🇱 [nl](../../../nl/docs/providers/AGENTROUTER.md) · 🇳🇴 [no](../../../no/docs/providers/AGENTROUTER.md) · 🇮🇳 [or](../../../or/docs/providers/AGENTROUTER.md) · 🇮🇳 [pa](../../../pa/docs/providers/AGENTROUTER.md) · 🇵🇭 [phi](../../../phi/docs/providers/AGENTROUTER.md) · 🇵🇱 [pl](../../../pl/docs/providers/AGENTROUTER.md) · 🇵🇹 [pt](../../../pt/docs/providers/AGENTROUTER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/AGENTROUTER.md) · 🇷🇴 [ro](../../../ro/docs/providers/AGENTROUTER.md) · 🇷🇺 [ru](../../../ru/docs/providers/AGENTROUTER.md) · 🇱🇰 [si](../../../si/docs/providers/AGENTROUTER.md) · 🇸🇰 [sk](../../../sk/docs/providers/AGENTROUTER.md) · 🇸🇮 [sl](../../../sl/docs/providers/AGENTROUTER.md) · 🇷🇸 [sr](../../../sr/docs/providers/AGENTROUTER.md) · 🇸🇪 [sv](../../../sv/docs/providers/AGENTROUTER.md) · 🇰🇪 [sw](../../../sw/docs/providers/AGENTROUTER.md) · 🇮🇳 [ta](../../../ta/docs/providers/AGENTROUTER.md) · 🇮🇳 [te](../../../te/docs/providers/AGENTROUTER.md) · 🇹🇷 [tr](../../../tr/docs/providers/AGENTROUTER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/AGENTROUTER.md) · 🇵🇰 [ur](../../../ur/docs/providers/AGENTROUTER.md) · 🇺🇿 [uz](../../../uz/docs/providers/AGENTROUTER.md) · 🇻🇳 [vi](../../../vi/docs/providers/AGENTROUTER.md) · 🇳🇬 [yo](../../../yo/docs/providers/AGENTROUTER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/AGENTROUTER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/AGENTROUTER.md)

---

[AgentRouter](https://agentrouter.org) เป็นรีเลย์ที่เข้ากันได้กับ Anthropic ซึ่งนำ Claude และโมเดลอื่นๆ มาจำหน่ายต่อ โดยมักมีราคาต่ำกว่าการใช้ Anthropic API โดยตรง รีเลย์นี้ได้รับการออกแบบให้ใช้แทน `ANTHROPIC_BASE_URL` สำหรับไคลเอนต์ Claude Code อย่างเป็นทางการได้ทันที ดังนั้นจึงยอมรับเฉพาะทราฟฟิกที่ตรงกับรูปแบบการสื่อสารของ Claude Code เท่านั้น (เช่น User-Agent เฉพาะ, แฟล็ก `anthropic-beta`, ส่วนหัวของ Stainless SDK เป็นต้น)

## เริ่มต้นอย่างรวดเร็ว — ใช้ผู้ให้บริการ `agentrouter` แบบเนทีฟ (แนะนำ)

สำหรับผู้ใช้ส่วนใหญ่ **ไม่จำเป็นต้องตั้งค่าเป็นพิเศษ** OmniRoute มาพร้อมกับผู้ให้บริการ `agentrouter` ในตัว ซึ่งมีรูปแบบการสื่อสารของ Claude Code ครบถ้วนอยู่แล้ว (ดู
`open-sse/config/providerRegistry.ts` → `agentrouter`) วิธีใช้งาน:

1. เปิด **Dashboard → Providers → Add Provider**
2. เลือก **AgentRouter** จากรายการ
3. วางคีย์ API `sk-...` ของคุณแล้วบันทึก

เพียงเท่านี้ — ไม่ต้องใช้ตัวแปรสภาพแวดล้อมหรือประเภทผู้ให้บริการแบบกำหนดเอง โมเดลที่มีมาให้ในตัวประกอบด้วย `claude-opus-4-6`, `claude-haiku-4-5-20251001`, `glm-5.1` และ
`deepseek-v3.2`

ส่วนที่เหลือของคู่มือนี้ครอบคลุม **แนวทางขั้นสูง**: การใช้ประเภทผู้ให้บริการ
`anthropic-compatible-cc-*` ใช้แนวทางนี้เมื่อคุณต้องการควบคุมรูปแบบการสื่อสารได้มากขึ้น เช่น เมื่อต้องเชื่อมต่อกับรีเลย์รูปแบบเดียวกับ AgentRouter อื่นๆ ที่ยังไม่มีอยู่ในรีจิสทรีผู้ให้บริการแบบเนทีฟ หรือเมื่อต้องการแทนที่ URL ฐาน พาธแชต หรือชุดส่วนหัว

---

## ขั้นสูง: การเชื่อมต่อผ่านประเภทผู้ให้บริการที่เข้ากันได้กับ Claude Code

OmniRoute ยังรองรับ AgentRouter (และรีเลย์ที่คล้ายกัน) ผ่านประเภทผู้ให้บริการที่ **เข้ากันได้กับ Claude Code** (`anthropic-compatible-cc-*`) ซึ่งสื่อสารด้วย Anthropic Messages API โดยใช้รูปแบบการสื่อสารที่ถูกต้อง ผู้ให้บริการ `openai-compatible-chat` ทั่วไปที่ชี้ไปยัง `https://agentrouter.org` จะ **ไม่** ทำงาน — WAF ต้นทางจะปฏิเสธคำขอที่ดูไม่เหมือนมาจาก Claude Code

---

## ข้อกำหนดเบื้องต้น

- บัญชี AgentRouter และคีย์ API ผู้สมัครใหม่จะได้รับเครดิตฟรีผ่านลิงก์พันธมิตรใน [README](../README.md) ของโปรเจกต์
- OmniRoute ต้องทำงานโดยเปิดใช้งานแฟล็กฟีเจอร์ `ENABLE_CC_COMPATIBLE_PROVIDER`
  (ดูด้านล่าง)

## 1. เปิดใช้งานประเภทผู้ให้บริการที่เข้ากันได้กับ CC

ประเภทผู้ให้บริการที่เข้ากันได้กับ Claude Code ถูกควบคุมด้วยแฟล็กฟีเจอร์ เนื่องจากส่งทราฟฟิกที่เลียนแบบไคลเอนต์ Claude Code อย่างเป็นทางการอย่างใกล้เคียง เปิดใช้งานโดยตั้งค่าตัวแปรสภาพแวดล้อมก่อนเริ่ม OmniRoute:

```bash
ENABLE_CC_COMPATIBLE_PROVIDER=true
```

ตัวอย่าง Docker:

```bash
docker run -d --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e ENABLE_CC_COMPATIBLE_PROVIDER=true \
  diegosouzapw/omniroute:latest
```

หลังจากรีสตาร์ต แดชบอร์ดจะแสดงตัวเลือก **Add Claude Code Compatible** เพิ่มเติมจากขั้นตอนการตั้งค่าที่เข้ากันได้กับ OpenAI และ Anthropic ซึ่งมีอยู่แล้ว

## 2. สร้างผู้ให้บริการในแดชบอร์ด

1. เปิด **Dashboard → Providers → Add Provider**
2. เลือก **Add Claude Code Compatible** (จะแสดงเฉพาะเมื่อตั้งค่าแฟล็กด้านบนแล้ว)
3. กรอกข้อมูลในช่องต่างๆ:

| ช่องข้อมูล | ค่า                                                          |
| ---------- | ------------------------------------------------------------ |
| ชื่อ       | `AgentRouter` (หรือป้ายกำกับใดๆ)                             |
| คำนำหน้า   | `agentrouter` (นามแฝงที่อ่านง่ายซึ่งแสดงในบันทึกและแดชบอร์ด) |
| URL ฐาน    | `https://agentrouter.org`                                    |
| พาธแชต     | `/v1/messages?beta=true` (ค่าเริ่มต้น — ไม่ต้องเปลี่ยนแปลง)  |

> ตัวระบุโมเดลแบบมาตรฐานยังคงใช้ ID โหนดผู้ให้บริการแบบเต็ม
> (`anthropic-compatible-cc-{uuid}/{model}`) ส่วน **คำนำหน้า** เป็นเพียงนามแฝงสำหรับการแสดงผล ซึ่งได้รับการแก้ค่าโดย `src/lib/usage/callLogs.ts` เพื่อให้ผลลัพธ์ในบันทึกอ่านง่ายขึ้น

4. (ไม่บังคับ) วางคีย์ API ของคุณในช่อง **Validate** แล้วคลิก **Check** เพื่อยืนยันการเชื่อมต่อก่อนบันทึก
5. คลิก **Add**

เมื่อสร้างแล้ว ให้เปิดผู้ให้บริการและเพิ่ม **Connection** โดยใช้คีย์ API ของ AgentRouter (`sk-...`) ค่า `test_status` ของการเชื่อมต่อควรเปลี่ยนเป็น `active`

## 3. ใช้งานผ่านคอมโบหรือโดยตรง

อ้างอิงโมเดลโดยใช้คำนำหน้าของผู้ให้บริการเป็นเนมสเปซ:

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agentrouter/claude-opus-4-6",
    "messages": [{"role": "user", "content": "hello"}],
    "max_tokens": 100
  }'
```

รหัสโมเดลมาตรฐาน `anthropic-compatible-cc-{uuid}/claude-opus-4-6` ก็ใช้งานได้เช่นกัน
และเป็นรหัสที่ปรากฏในฐานข้อมูลและการกำหนดค่าคอมโบ

หรือเพิ่มโมเดลนี้ลงในคอมโบเพื่อการกำหนดเส้นทาง การสำรองเมื่อเกิดข้อผิดพลาด และการจัดการโควตา
เช่นเดียวกับผู้ให้บริการรายอื่น

---

## รายละเอียด Wire Image

เพื่อใช้อ้างอิง บริดจ์ที่เข้ากันได้กับ cc จะส่งข้อมูลต่อไปนี้ในแต่ละคำขอไปยังต้นทาง
(ดู `open-sse/services/claudeCodeCompatible.ts`):

| ส่วนหัว                                      | ค่า                                                                                            |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `Authorization`                              | `Bearer <api-key>`                                                                             |
| `User-Agent`                                 | `claude-cli/2.1.258 (external, sdk-cli)`                                                       |
| `anthropic-version`                          | `2023-06-01`                                                                                   |
| `anthropic-beta`                             | `claude-code-20250219,interleaved-thinking-2025-05-14,effort-2025-11-24`                       |
| ตัวสลับเบต้า redact-thinking ต่อการเชื่อมต่อ | เพิ่ม `redact-thinking-2026-02-12` สำหรับต้นทางที่กำหนดให้ต้องใช้สตรีมการคิดแบบปกปิดโดยเฉพาะ   |
| ตัวสลับการคิดแบบสรุปต่อการเชื่อมต่อ          | เพิ่ม `display: "summarized"` ลงในคำขอการคิดของ CC Compatible ที่ยังไม่ได้ตั้งค่าโหมดการแสดงผล |
| `anthropic-dangerous-direct-browser-access`  | `true`                                                                                         |
| `x-app`                                      | `cli`                                                                                          |
| `X-Stainless-*`                              | ส่วนหัวต่าง ๆ ของ Stainless SDK (ภาษา เวอร์ชันแพ็กเกจ ระบบปฏิบัติการ สถาปัตยกรรม ฯลฯ)          |

ข้อมูลเหล่านี้ทำให้คำขอสามารถผ่าน WAF / รายการอนุญาตไคลเอนต์ของต้นทางได้

---

## การแก้ไขปัญหา

**`{"error":{"message":"unauthorized client detected, ..."}}`** — คำขอของคุณ
ไม่ตรงกับ Wire Image ของ Claude Code กรณีนี้เกิดขึ้นเมื่อผู้ให้บริการได้รับการกำหนดค่า
เป็น `openai-compatible-chat` แทน `anthropic-compatible-cc` หรือเมื่อไม่ได้ตั้งค่าแฟล็ก
`ENABLE_CC_COMPATIBLE_PROVIDER=true` ตอนเริ่มต้นระบบ

**`{"error":{"message":"无效的令牌","type":"new_api_error"}}` (HTTP 401)** —
"โทเค็นไม่ถูกต้อง" Wire Image ถูกต้อง แต่คีย์ API ถูกปฏิเสธ ให้สร้าง
คีย์ใหม่ในแดชบอร์ด AgentRouter และอัปเดตการเชื่อมต่อ

**`{"error":{"code":"content-blocked","type":"agent_router_api_error"}}`
(HTTP 400)** — ฮุกตรวจสอบเนื้อหาของ AgentRouter ปฏิเสธเนื้อหาคำขอ หรือ
แพ็กเกจของคีย์ไม่อนุญาตให้ใช้โมเดลที่ร้องขอ ลองใช้พรอมต์หรือโมเดลอื่น
โปรดติดต่อฝ่ายสนับสนุนของ AgentRouter หากพรอมต์ที่ไม่มีอันตรายยังคงถูกบล็อกอย่างต่อเนื่อง

**`[400]: content-blocked` เฉพาะในบางโมเดล** — แพ็กเกจ AgentRouter ส่วนใหญ่
อนุญาตเฉพาะโมเดลบางส่วนเท่านั้น (เช่น `claude-opus-4-6`) รหัสโมเดลอื่นจะส่งคืน
`unauthorized_client_error` แม้ว่าคีย์จะถูกต้องก็ตาม ตรวจสอบในแดชบอร์ด AgentRouter ว่า
แพ็กเกจของคุณครอบคลุมโมเดลใดบ้าง

**`Invalid JSON response from provider (reset after Ns)` จากบันทึกของ omniroute** —
ต้นทางส่งคืนเนื้อหาที่ไม่ใช่ JSON (โดยทั่วไปคือหน้าข้อผิดพลาด HTML จาก WAF)
ซึ่งมักหมายความว่าคำขอไม่เคยไปถึงแบ็กเอนด์ของ AgentRouter — ตรวจสอบอีกครั้งว่า
รหัสผู้ให้บริการขึ้นต้นด้วย `anthropic-compatible-cc-` (สังเกตขีดกลางต่อท้าย —
ดู `CLAUDE_CODE_COMPATIBLE_PREFIX` ใน `open-sse/services/claudeCodeCompatible.ts`)
และเปิดใช้งานแฟล็กฟีเจอร์แล้ว

**`unauthorized client detected` / หน้าข้อผิดพลาด HTML แม้ว่าจะมีผู้ให้บริการ
AgentRouter อยู่แล้ว** — เป็นไปได้ว่าคุณมีผู้ให้บริการ AgentRouter **มากกว่าหนึ่งราย**
และคำขอของคุณกำลังถูกส่งไปยังรายที่ไม่ถูกต้อง หากมีผู้ให้บริการ
`anthropic-compatible-*` (ที่ไม่ใช่ `cc`) หรือ `openai-compatible-chat-*` ซึ่งสร้างด้วยตนเอง
และหลงเหลืออยู่โดยใช้คำนำหน้า `agentrouter` ผู้ให้บริการดังกล่าวอาจเป็นเจ้าของรหัสโมเดล
`agentrouter/<model>` (และคอมโบอาจอ้างอิงด้วยรหัสโหนด) ทำให้ทราฟฟิกถูกส่งไปยังผู้ให้บริการนั้น —
ซึ่งส่ง User-Agent ทั่วไปและถูกปฏิเสธ — แทนผู้ให้บริการ `agentrouter`
ในตัวที่มาพร้อมกับ Wire Image ที่ถูกต้องอยู่แล้ว ตรวจสอบว่าโมเดลถูกจับคู่ไปยังที่ใดจริง ๆ
ในบันทึกของ omniroute (แท็ก `ROUTING` จะแสดง
`agentrouter/<model> → <providerId>/<model>`); หาก `<providerId>` ไม่ใช่
`agentrouter` ให้รวมการใช้งานไว้ที่ผู้ให้บริการเนทีฟ: กำหนดให้คอมโบชี้ไปยัง
`agentrouter/<model>` (providerId `agentrouter`) และลบผู้ให้บริการแบบเข้ากันได้ที่ซ้ำกัน
ผู้ให้บริการเนทีฟไม่จำเป็นต้องมีการกำหนดค่า Wire Image หรือ
`customUserAgent`

---

## ดูเพิ่มเติม

- [`docs/providers/CLAUDE_WEB.md`](./CLAUDE_WEB.md) — หมายเหตุเกี่ยวกับการผสานรวมผู้ให้บริการ Claude Web
- [`docs/reference/FREE_TIERS.md`](../reference/FREE_TIERS.md) — แค็ตตาล็อกผู้ให้บริการ
  ระดับฟรี
- [`open-sse/services/claudeCodeCompatible.ts`](../../open-sse/services/claudeCodeCompatible.ts)
  — การติดตั้งใช้งาน Wire image
