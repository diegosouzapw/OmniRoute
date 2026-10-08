# Cursor Image Generation (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR_IMAGE.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR_IMAGE.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR_IMAGE.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR_IMAGE.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR_IMAGE.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR_IMAGE.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR_IMAGE.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR_IMAGE.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR_IMAGE.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR_IMAGE.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR_IMAGE.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR_IMAGE.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR_IMAGE.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR_IMAGE.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR_IMAGE.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR_IMAGE.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR_IMAGE.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR_IMAGE.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR_IMAGE.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR_IMAGE.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR_IMAGE.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR_IMAGE.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR_IMAGE.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR_IMAGE.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR_IMAGE.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR_IMAGE.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR_IMAGE.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR_IMAGE.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR_IMAGE.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR_IMAGE.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR_IMAGE.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR_IMAGE.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR_IMAGE.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR_IMAGE.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR_IMAGE.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR_IMAGE.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR_IMAGE.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR_IMAGE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR_IMAGE.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR_IMAGE.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR_IMAGE.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR_IMAGE.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR_IMAGE.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR_IMAGE.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR_IMAGE.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR_IMAGE.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR_IMAGE.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR_IMAGE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR_IMAGE.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR_IMAGE.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR_IMAGE.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR_IMAGE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR_IMAGE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR_IMAGE.md)

---

OmniRoute เปิดให้ใช้ **การสร้างรูปภาพ** ของแผน Cursor ผ่าน `POST /v1/images/generations` โดยใช้รหัสผู้ให้บริการเดียวกับแชต: `cursor` (นามแฝง `cu`)

| ฟิลด์                  | ค่า                                                                                   |
| ---------------------- | ------------------------------------------------------------------------------------- |
| รหัส `IMAGE_PROVIDERS` | `cursor`                                                                              |
| รูปแบบ                 | `cursor-agent-image`                                                                  |
| การยืนยันตัวตน         | การเชื่อมต่อ OAuth / API key เดียวกับแชต (`provider_connections.provider = "cursor"`) |
| โมเดล                  | `cursor/auto`, `cursor/composer-2`, `cursor/composer-2.5`                             |

## เหตุผลที่ใช้ Agent CLI

แชต Cursor ใน OmniRoute ใช้ `agent.v1.AgentService/Run` (protobuf) เส้นทางดังกล่าว **ปฏิเสธ** เครื่องมือไคลเอ็นต์ในตัว (shell, write, …) การสร้างรูปภาพเป็นเครื่องมือเฉพาะของ Cursor ที่ดำเนินการโดย **`agent` CLI** กับ seat ดังนั้นตัวจัดการรูปภาพจึงเรียกใช้ `agent` พร้อมพรอมต์ที่ล็อกไว้และพื้นที่ทำงานชั่วคราวแยกสำหรับแต่ละคำขอ (มีโครงสร้างเดียวกับบริดจ์ seat ของชุมชน) จากนั้นส่งคืน `b64_json` ที่เข้ากันได้กับ OpenAI

## ข้อจำกัดการเข้าถึง (กฎตายตัว #15 + #17)

นี่เป็นรูปแบบเดียวของ `IMAGE_PROVIDERS` ที่เรียกใช้โพรเซสลูก (ไบนารี `agent`)
เนื่องจาก `POST /v1/images/generations` ใช้ร่วมกับผู้ให้บริการรูปภาพอื่นอีกประมาณ 40 รายที่ไม่เรียกใช้โพรเซส
และผู้เรียกจากระยะไกลสามารถใช้งานได้อย่างถูกต้อง เส้นทางทั้งหมดจึง **ไม่**
ถูกจัดประเภทเป็น `LOCAL_ONLY` — แต่ `handleCursorAgentImageGeneration` จะบังคับใช้
เกตของตนเองโดยอาศัยผลการตัดสิน `AUTHZ_HEADER_PEER_LOCALITY` ที่เชื่อถือได้ ซึ่งไปป์ไลน์ authz ประทับ
ลงในทุกคำขอ (อ้างอิงจากเพียร์ TCP จริง ไม่ใช่ส่วนหัว `Host` ที่ปลอมแปลงได้): เฉพาะ
ผู้เรียกแบบ `loopback` และ `lan` เท่านั้นที่เข้าถึงการเรียกใช้โพรเซสได้ ส่วนผู้เรียกอื่นทั้งหมด (รวมถึงกรณีที่ API key
รั่วไหลและถูกนำไปใช้ซ้ำผ่านทันเนลสาธารณะ) จะได้รับ `403` ก่อนที่จะมีการค้นหาข้อมูลประจำตัวหรือ
เรียกใช้โพรเซสใดๆ โปรดดู `src/server/authz/policies/management.ts` สำหรับนโยบายเดียวกัน
ที่ใช้กับระดับ `LOCAL_ONLY` ส่วนที่เหลือ

## เกตควบคุมภาวะพร้อมกันอยู่ในระดับโมดูล (ข้อจำกัดสำหรับอินสแตนซ์เดียว)

`CURSOR_IMG_MAX_CONCURRENT` ถูกบังคับใช้ด้วยตัวนับ/คิวในหน่วยความจำที่มีขอบเขตอยู่ภายใน
อินสแตนซ์ของโมดูล Node (`open-sse/handlers/imageGeneration/providers/cursorAgentImage.ts`)
โดยสามารถจำกัดจำนวนการเรียกใช้ `agent` พร้อมกันภายในโพรเซส OmniRoute เดียวได้อย่างถูกต้อง แต่
**ไม่** ประสานงานระหว่างหลายโพรเซส/อินสแตนซ์ที่ใช้ Cursor seat เดียวกัน
(เช่น การติดตั้งใช้งานแบบหลายเรพลิกา) — แต่ละอินสแตนซ์บังคับใช้ขีดจำกัดของตนเองโดยอิสระ
สำหรับการติดตั้งใช้งานแบบอินสแตนซ์เดียว (ค่าเริ่มต้น) ขีดจำกัดนี้จะแม่นยำ ส่วนการติดตั้งใช้งาน
ที่ปรับขนาดในแนวนอนควรกำหนด `CURSOR_IMG_MAX_CONCURRENT` ของแต่ละอินสแตนซ์อย่างระมัดระวัง หรือกำหนดเส้นทาง
ทราฟฟิกรูปภาพ Cursor ไปยังอินสแตนซ์เดียว

## ข้อกำหนด

1. บัญชี Cursor ที่เชื่อมต่อแล้วในแดชบอร์ด (OAuth หรือ API key แบบ `crsr_…`)
2. ไบนารี Cursor Agent ที่โพรเซส OmniRoute สามารถเข้าถึงได้:
   - env `CURSOR_AGENT_BIN=/path/to/agent` หรือ
   - `~/.local/bin/agent` หรือ
   - `providerSpecificData.agentBin` ในการเชื่อมต่อ Cursor

การปรับแต่งเพิ่มเติม:

| Env                         | ค่าเริ่มต้น             | ความหมาย                                       |
| --------------------------- | ----------------------- | ---------------------------------------------- |
| `CURSOR_IMG_TIMEOUT_MS`     | `210000`                | เวลาตามนาฬิกาสำหรับแต่ละรูปภาพ                 |
| `CURSOR_IMG_MAX_CONCURRENT` | `2`                     | เกตควบคุมภาวะพร้อมกันสำหรับ seat ที่ใช้ร่วมกัน |
| `CURSOR_IMG_MODEL`          | (โมเดลจากคำขอ / `auto`) | แทนที่ `--model` ของ CLI                       |

## ตัวอย่าง

```bash
curl -sS https://<host>/v1/images/generations \
  -H "Authorization: Bearer <omni-api-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"cursor/auto","prompt":"a lantern in fog","size":"1024x1024"}'
```

โดยทั่วไปการสร้างจะใช้เวลา 1–2 นาที แนะนำให้ใช้เส้นทางเครือข่ายภายใน เนื่องจากพร็อกซีส่วนขอบที่มีระยะหมดเวลาประมาณ 100 วินาทีจะล้มเหลว

## LiteLLM

ลงทะเบียนโมเดลรูปภาพโดยใช้ `mode: image_generation`, `api_base: http://omniroute:20128/v1` และ `model: openai/cursor/auto` (หรือ `cursor/auto` โดยไม่มีคำนำหน้า ทั้งนี้ขึ้นอยู่กับเวอร์ชัน LiteLLM ของคุณ)
