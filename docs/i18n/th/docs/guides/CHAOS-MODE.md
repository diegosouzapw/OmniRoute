# Chaos Mode (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **แดชบอร์ด:** **Chaos Mode** (แถบด้านข้าง) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (เซสชันแดชบอร์ด) · `POST /api/skills/collect/chaos` (คีย์ API)  
> **ซอร์ส:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Chaos Mode ส่ง **งานหนึ่งงานไปยังผู้ให้บริการหลายรายพร้อมกัน** — ผู้ให้บริการแต่ละรายที่เข้าร่วมจะส่งอินสแตนซ์โมเดลหนึ่งรายการ และคุณจะได้รับคำตอบทั้งหมดเรียงแสดงเคียงข้างกัน (หรือเชื่อมต่อเป็นลำดับ) นี่คือพื้นผิวการทำงานแบบหลายโมเดล ไม่ใช่กลยุทธ์การกำหนดเส้นทาง: ทราฟฟิก `/v1/chat/completions` ตามปกติของคุณจะไม่ได้รับผลกระทบจากโหมดนี้

**การแยกความแตกต่าง — มีสามสิ่งที่ใช้คำว่า "chaos" ในชื่อ:**

| สิ่ง                   | คืออะไร                                                                                                                       | เอกสารอ้างอิง                                |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Chaos Mode**         | หน้าแดชบอร์ด + API ที่อธิบายไว้ที่นี่: กระจายงานหนึ่งงานไปยังผู้ให้บริการหลายราย (แบบขนานหรือทำงานร่วมกัน)                    | คู่มือนี้                                    |
| `auto/chaos`           | รหัสโมเดล Auto-Combo ที่มีค่าน้ำหนักการให้คะแนนแบบฉีดข้อผิดพลาด สำหรับการทดสอบความทนทาน ไม่ต้องกำหนดค่าใดๆ                    | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| การกำหนดค่าคอมโบ Chaos | คอมโบที่บันทึกถาวรซึ่งมี `config.chaos.enabled` จะกระจายงานไปยังกลุ่มโมเดล พร้อมโมเดลผู้ตัดสินซึ่งเป็นตัวเลือก (API เท่านั้น) | `open-sse/services/autoCombo/chaosEngine.ts` |

## การตั้งค่า

1. เปิด **แดชบอร์ด → Chaos Mode** (`/dashboard/chaos`)
2. **เปิดใช้งาน** — Chaos Mode ถูกจัดส่งมาโดย **ปิดใช้งานเป็นค่าเริ่มต้น** (`enabled: false` ใน
   `src/lib/chaos/chaosConfig.ts`) ขณะปิดใช้งาน `POST /api/chaos/run` จะตอบกลับด้วย
   `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."`
3. เลือกผู้เข้าร่วมและค่าเริ่มต้น (บันทึกถาวรแยกตามอินสแตนซ์ผ่านที่เก็บการตั้งค่า):

   | ฟิลด์               | ความหมาย                                                                                | ค่าเริ่มต้น / ขีดจำกัด                                      |
   | ------------------- | --------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
   | `enabled`           | สวิตช์หลัก                                                                              | `false`                                                     |
   | `defaultMode`       | `parallel` หรือ `collaborative` (ดูด้านล่าง)                                            | `parallel`                                                  |
   | `providerOverrides` | การเข้าร่วมแยกตามผู้ให้บริการ (`providerId`, `modelId` ซึ่งระบุหรือไม่ก็ได้, `enabled`) | ว่างเปล่า = ผู้ให้บริการที่ใช้งานอยู่ทุกราย, สูงสุด 200 ราย |
   | `systemPrompt`      | แทนที่พรอมต์ระบบ Chaos ในตัว                                                            | ระบุหรือไม่ก็ได้, สูงสุด 10 000 อักขระ                      |
   | `timeoutMs`         | เวลาสูงสุดต่อการเรียกโมเดล                                                              | `120000` (5 000–600 000)                                    |
   | `maxTokens`         | `max_tokens` ต่อการเรียกโมเดล                                                           | `4096` (256–128 000)                                        |

4. เรียกใช้ **การทดสอบจากหน้าโดยตรง** — แผงผลลัพธ์จะแสดงคำตอบ สถานะ และระยะเวลาของผู้ให้บริการแต่ละราย

## โหมดการทำงาน

- **`parallel`** — ทุกโมเดลได้รับงานเดียวกันพร้อมกัน คุณจะได้รับคำตอบทั้งหมดแยกจากกัน
- **`collaborative`** — โมเดลทำงาน **เป็นลำดับต่อเนื่อง**: แต่ละโมเดลจะเห็นผลลัพธ์ของโมเดลก่อนหน้า และถูกขอให้ปรับปรุง ขยายความ วิจารณ์ หรือเสนอทางเลือก ฟิลด์ `summary` ของการตอบกลับจะนำผลลัพธ์ที่สำเร็จมาต่อกันตามลำดับการทำงาน (การทำงานแบบขนานไม่มี `summary`)

## API

### `POST /api/chaos/run` — เซสชันแดชบอร์ด

ตรวจสอบสิทธิ์ด้วยคุกกี้ (เซสชันการจัดการ — ดู
[MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md)); ใช้โดยหน้าแดชบอร์ด

```jsonc
// เนื้อหาคำขอ
{
  "task": "Compare approaches to X", // จำเป็น
  "providers": ["glm", "kimi"], // ตัวกรองที่ระบุหรือไม่ก็ได้
  "mode": "parallel", // ระบุหรือไม่ก็ได้ — แทนที่ defaultMode
  "systemPrompt": "…", // ค่าที่ใช้แทนซึ่งระบุหรือไม่ก็ได้
  "maxTokens": 4096, // ค่าที่ใช้แทนซึ่งระบุหรือไม่ก็ได้
}
```

### `POST /api/skills/collect/chaos` — คีย์ API

รูปแบบ Bearer token สำหรับผู้เรียกใช้จากภายนอก คีย์ต้องมี **สิทธิ์ Chaos Mode**
(`chaosModeEnabled`) ซึ่ง **ปิดอยู่โดยค่าเริ่มต้น** — เปิดใช้งานแยกสำหรับแต่ละคีย์ใน
**แดชบอร์ด → ตัวจัดการ API → แก้ไขคีย์ → สิทธิ์ → Chaos Mode** ใช้เนื้อหาคำขอเหมือนกับข้างต้น

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

ปลายทางทั้งสองรายการส่งคืนข้อมูลที่มีโครงสร้างเดียวกัน:

```jsonc
{
  "task": "…",
  "mode": "parallel",
  "startedAt": "2026-09-01T00:00:00.000Z",
  "totalProviders": 3,
  "totalResults": 3,
  "models": [
    {
      "providerId": "glm",
      "providerName": "GLM",
      "modelId": "glm-4.7",
      "status": "success",
      "content": "…",
      "durationMs": 3210,
    },
  ],
  "summary": "…", // เฉพาะโหมด collaborative
}
```

## การแก้ไขปัญหา

- **`400 Chaos Mode is not enabled`** — ดูขั้นตอนที่ 2 ด้านบน: สวิตช์ส่วนกลางปิดอยู่
- **คีย์ API ถูกปฏิเสธบน `/api/skills/collect/chaos`** — คีย์ไม่มีสิทธิ์ `chaosModeEnabled` แยกตามคีย์ (ปิดอยู่โดยค่าเริ่มต้น นี่คือการตั้งค่า ไม่ใช่ข้อผิดพลาด)
- **ผู้ให้บริการที่คุณคาดไว้ไม่ปรากฏในผลลัพธ์** — ตรวจสอบ `providerOverrides` บนหน้า Chaos Mode (การกำหนดค่าแทนที่ซึ่งปิดใช้งานจะตัดผู้ให้บริการรายนั้นออก) และตรวจสอบว่าการเชื่อมต่อผู้ให้บริการเปิดใช้งานอยู่หรือไม่
