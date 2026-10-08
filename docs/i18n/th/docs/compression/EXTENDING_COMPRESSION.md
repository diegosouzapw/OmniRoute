# Extending the Compression Pipeline (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/EXTENDING_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇦 [bs](../../../bs/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/EXTENDING_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/EXTENDING_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/EXTENDING_COMPRESSION.md)

---

> **สรุปสั้น ๆ**: เอนจินการบีบอัดของ OmniRoute สามารถ **เสียบต่อได้** — คุณสามารถลงทะเบียนเอนจินแบบกำหนดเอง จัดส่งแพ็กภาษาสำหรับภาษาใหม่ และประกอบไปป์ไลน์แบบซ้อนกันได้ คู่มือนี้จะแสดงวิธีดำเนินการ

**คู่มือที่เกี่ยวข้อง:**

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — ภาพรวมทั้งหมดของไปป์ไลน์
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — รีจิสทรีเอนจินและเอนจินที่มีมาให้ในตัว
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — เอนจิน RTK และตัวกรองแบบกำหนดเอง
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — เอกสารอ้างอิงรูปแบบแพ็กกฎ

---

## ภาพรวม

ระบบการบีบอัดมี **จุดขยาย 3 จุด**:

| จุดขยาย               | กรณีการใช้งาน                                                | ระดับความยาก |
| --------------------- | ------------------------------------------------------------ | ------------ |
| **เอนจินแบบกำหนดเอง** | เพิ่มอัลกอริทึมการบีบอัดใหม่ทั้งหมด (เช่น ตัวสรุปเฉพาะโดเมน) | ขั้นสูง      |
| **แพ็กภาษา**          | เพิ่มการรองรับภาษาธรรมชาติใหม่ (เช่น ภาษาฮินดี ภาษาอาหรับ)   | ปานกลาง      |
| **ไปป์ไลน์แบบซ้อน**   | ประกอบเอนจินที่มีอยู่ตามลำดับที่กำหนดเอง                     | เริ่มต้น     |

```
┌─────────────────────────────────────────────────────────────┐
│                    กลยุทธ์การบีบอัด                         │
│                                                              │
│   ข้อความนำเข้า ──▶ getEffectiveMode() ──▶ โหมด             │
│                                              │               │
│                      ┌───────────────────────┼──────────┐    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   "rtk"    "lite"   "standard" "stacked"    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   เอนจิน    เอนจิน    เอนจิน    engines[]  │
│                   RTK       Lite      Caveman   เชื่อมต่อกัน │
│                      │         │         │         │    │    │
│                      └─────────┴─────────┴─────────┘    │    │
│                                      │                    │
│                                      ▼                    │
│                              เอาต์พุตที่บีบอัดแล้ว          │
└─────────────────────────────────────────────────────────────┘

ตัวเลือกกลยุทธ์ทำงานตามโหมด: แต่ละคำขอจะเลือกเพียงหนึ่งโหมด
(rtk / lite / standard / aggressive / ultra / stacked / off)
มีเพียงโหมด "stacked" เท่านั้นที่เชื่อมต่อเอนจินหลายตัวตามลำดับ
โหมดเริ่มต้นที่ทริกเกอร์โดยอัตโนมัติคือ "lite" (ไม่ใช่สายลำดับความสำคัญ 3 ระดับ)
```

---

## การเขียนเอนจินการบีบอัดแบบกำหนดเอง

อินเทอร์เฟซของเอนจิน (`open-sse/services/compression/engines/types.ts`) คือสัญญาที่ทุกเอนจินต้องปฏิบัติตาม โดยมีเมธอดที่จำเป็น 5 เมธอด

### อินเทอร์เฟซ `CompressionEngine`

```ts
interface CompressionEngine {
  id: string; // ID เอนจินที่ไม่ซ้ำกัน
  name: string; // ชื่อที่ใช้แสดง
  description: string; // คำอธิบายแบบสั้น
  icon: string; // ไอคอน (อีโมจิหรือ URL)
  targets: CompressionEngineTarget[]; // ["messages", "tool_results", "code_blocks"]
  stackable: boolean; // สามารถใช้ในไปป์ไลน์แบบซ้อนได้หรือไม่
  stackPriority: number; // ลำดับในไปป์ไลน์แบบซ้อน (ค่าต่ำกว่า = ทำงานก่อน)
  metadata: CompressionEngineMetadata;

  apply(body, options?): CompressionResult;
  compress(body, config?): CompressionResult;
  getConfigSchema(): EngineConfigField[];
  validateConfig(config): EngineValidationResult;
}
```

### ตัวอย่างขั้นต่ำ: เอนจิน Whitespace

เอนจินที่เรียบง่ายที่สุด — ลบช่องว่างส่วนเกินออกจากข้อความ

````ts
import type { CompressionEngine } from "omniroute/compression/engines/types";
import { registerCompressionEngine } from "omniroute/compression/engines/registry";

function preserveCodeBlocks(text: string): string {
  // แยกตามเครื่องหมายบล็อกโค้ดและคงช่องว่างภายในบล็อกไว้
  const parts = text.split(/(```[\s\S]*?```)/);
  return parts
    .map((part) => {
      if (part.startsWith("```")) {
        return part; // อย่าแก้ไขบล็อกโค้ด
      }
      return part.replace(/\n{3,}/g, "\n\n"); // ใช้กับข้อความร้อยแก้วเท่านั้น
    })
    .join("");
}

const whitespaceEngine: CompressionEngine = {
  id: "whitespace",
  name: "ตัวลบช่องว่าง",
  description: "ลบช่องว่างและบรรทัดว่างส่วนเกิน",
  icon: "📝",
  targets: ["messages", "tool_results"],
  stackable: true,
  stackPriority: 100, // ทำงานหลัง caveman/rtk

  metadata: {
    id: "whitespace",
    name: "ตัวลบช่องว่าง",
    description: "ลบช่องว่างและบรรทัดว่างส่วนเกิน",
    inputScope: "messages",
    targetLatencyMs: 5,
    supportsPreview: true,
    stable: true,
  },

  apply(body, options) {
    return this.compress(body, options?.config);
  },

  compress(body, config = {}) {
    let originalLength = 0;
    let compressedLength = 0;

    // วนผ่านอาร์เรย์ข้อความ — รองรับทั้งเนื้อหาแบบสตริงและหลายส่วน
    const compressedBody = (body.messages || []).map((msg) => {
      if (typeof msg.content === "string") {
        originalLength += msg.content.length;
        let compressed = msg.content
          .replace(/[ \t]+/g, " ")
          .replace(/\n{3,}/g, "\n\n")
          .replace(/^\s+|\s+$/gm, "");
        compressedLength += compressed.length;
        return { ...msg, content: compressed };
      }
      // เนื้อหาแบบหลายส่วน: วนผ่านแต่ละส่วนและบีบอัดเฉพาะส่วนข้อความ
      if (Array.isArray(msg.content)) {
        const newParts = msg.content.map((part) => {
          if (part.type === "text" && typeof part.text === "string") {
            originalLength += part.text.length;
            let compressed = part.text
              .replace(/[ \t]+/g, " ")
              .replace(/\n{3,}/g, "\n\n")
              .replace(/^\s+|\s+$/gm, "");
            compressedLength += compressed.length;
            return { ...part, text: compressed };
          }
          return part; // คง image_url, tool_use และอื่นๆ ไว้
        });
        return { ...msg, content: newParts };
      }
      return msg;
    });

    return {
      body: { ...body, messages: compressedBody },
      stats: {
        originalTokens: Math.ceil(originalLength / 4),
        compressedTokens: Math.ceil(compressedLength / 4),
        savingsPercent: originalLength > 0 ? 100 * (1 - compressedLength / originalLength) : 0,
        techniques: ["whitespace-collapse"],
        engineId: "whitespace",
      },
    };
  },

  getConfigSchema() {
    return [
      {
        key: "preserveCodeBlocks",
        type: "boolean",
        label: "คงบล็อกโค้ดไว้",
        defaultValue: true,
        description: "อย่าแก้ไขช่องว่างภายในบล็อก ```code```",
      },
    ];
  },

  validateConfig(config) {
    if (config.preserveCodeBlocks !== undefined && typeof config.preserveCodeBlocks !== "boolean") {
      return { valid: false, errors: ["preserveCodeBlocks ต้องเป็นค่าบูลีน"] };
    }
    return { valid: true, errors: [] };
  },
};

// ลงทะเบียนแบบส่วนกลาง
registerCompressionEngine(whitespaceEngine);
````

### ตำแหน่งสำหรับวางเอนจินแบบกำหนดเอง

```
~/.omniroute/compression/engines/my-engine.ts    # ระดับผู้ใช้
<project>/compression-engines/my-engine.ts        # ระดับโปรเจกต์ (โหลดเมื่อเริ่มต้น)
```

หรือโหลดจากปลั๊กอินผ่านโค้ด:

```ts
// ภายในปลั๊กอินของคุณ
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "@omniroute/open-sse/services/compression/engines/registry";
import { myEngine } from "./engines/my-engine";

export default definePlugin({
  name: "my-compression-plugin",
  // SDK ของปลั๊กอินเปิดให้ใช้ฮุก onRequest / onResponse / onError ให้ลงทะเบียน
  // เอนจินเมื่อโหลดโมดูลปลั๊กอิน (หรือใน onRequest ครั้งแรก) และยกเลิกการลงทะเบียน
  // จากขั้นตอนการปิดใช้งานของคุณเอง
  onRequest: async (ctx) => {
    registerCompressionEngine(myEngine);
  },
});

// เมื่อปิดใช้งาน:
// unregisterCompressionEngine("my-engine");
```

### การทดสอบเอนจินของคุณ

ลงทะเบียนเอนจินของคุณในปลั๊กอินหรือฟังก์ชันเริ่มต้น เมื่อลงทะเบียนแล้ว เอนจินจะพร้อมใช้งาน
ในตัวเลือกกลยุทธ์ผ่าน `id` ของเอนจิน ทดสอบการผสานการทำงานโดยประกอบเอนจินไว้ในไปป์ไลน์แบบซ้อน:

---

## การสร้างชุดภาษา

การบีบอัดแบบ Caveman ใช้ **ชุดกฎเฉพาะภาษา** เพื่อจัดการคำฟุ่มเฟือย การใช้ถ้อยคำแบบไม่มั่นใจ และรูปแบบการเขียนที่เยิ่นเย้อในภาษาธรรมชาติแต่ละภาษา OmniRoute มาพร้อมกับ **ชุดภาษา 6 ชุด** ได้แก่ `en`, `es`, `fr`, `de`, `ja`, `pt-BR`

### โครงสร้างชุดภาษา

ชุดภาษาคือไดเรกทอรีของ **ไฟล์ JSON** ภายใต้ `open-sse/services/compression/rules/<language>/`:

```
open-sse/services/compression/rules/
├── en/
│   ├── filler.json          # คำทักทาย ถ้อยคำแบบไม่มั่นใจ และถ้อยคำสุภาพ
│   ├── context.json         # กฎสำหรับลดบริบท
│   ├── dedup.json           # กฎการขจัดข้อมูลซ้ำ
│   ├── structural.json      # เครื่องหมายวรรคตอนและการจัดรูปแบบ
│   └── ultra.json           # กฎการบีบอัดเชิงรุก
├── es/  (โครงสร้างเดียวกัน)
├── fr/  (โครงสร้างเดียวกัน)
├── de/  (โครงสร้างเดียวกัน)
├── ja/  (โครงสร้างเดียวกัน)
└── pt-BR/ (โครงสร้างเดียวกัน)
```

### โครงสร้างของกฎ

แต่ละกฎมีโครงสร้างดังนี้ (จาก `open-sse/services/compression/ruleLoader.ts`):

```ts
interface FileRule {
  name: string; // ชื่อที่มนุษย์อ่านเข้าใจได้ (kebab-case)
  pattern: string; // รูปแบบนิพจน์ทั่วไปของ JavaScript
  replacement?: string; // สิ่งที่จะใช้แทนข้อความที่ตรงกัน
  replacementMap?: Record<string, string>; // หรือแมปคีย์→ข้อความแทนที่
  flags?: string; // แฟล็กของนิพจน์ทั่วไป (โดยทั่วไปคือ "gi")
  context?: "all" | "user" | "system" | "assistant";
  category?: "filler" | "context" | "structural" | "dedup" | "terse" | "ultra";
  minIntensity?: "lite" | "full" | "ultra"; // ข้ามกฎนี้หากระดับความเข้มต่ำกว่าค่านี้
  description?: string; // เอกสารประกอบ
}
```

### ตัวอย่าง: การเพิ่มกฎคำฟุ่มเฟือยสำหรับภาษาฮินดี

```json
{
  "language": "hi",
  "category": "filler",
  "rules": [
    {
      "name": "polite_opener",
      "pattern": "\\b(?:नमस्ते|नमस्कार|आदरणीय)\\b[,!\\s]*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "lite",
      "description": "Strip polite openers like 'नमस्ते'"
    },
    {
      "name": "filler_actually",
      "pattern": "\\b(?:असल में|वास्तव में|दरअसल)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "lite",
      "description": "Strip 'actually' fillers"
    },
    {
      "name": "verbose_plea",
      "pattern": "\\b(?:कृपया|कृपया आप|अनुरोध है कि आप)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "full",
      "description": "Strip 'please' in Hindi"
    }
  ]
}
```

### การตรวจสอบความถูกต้อง

ชุดกฎจะได้รับการตรวจสอบกับ `_schema.json` เมื่อโหลด ชุดที่มีโครงสร้างไม่ถูกต้องจะโหลดไม่สำเร็จและบันทึกข้อผิดพลาดลงในบันทึก:

```
RULE_LOADER: pack "hi/filler.json" failed validation:
  - rules.0.pattern: Invalid regex
  - rules.1.context: must be one of [all, user, system, assistant]
```

การตรวจสอบความถูกต้องจะทำงานโดยอัตโนมัติเมื่อมีการโหลดชุด (โดยตรวจสอบกับ `_schema.json`); ชุดที่ไม่ถูกต้องจะถูกปฏิเสธและข้อผิดพลาดข้างต้นจะถูกบันทึก ไม่มีสคริปต์ `npm run` แยกต่างหากสำหรับตรวจสอบความถูกต้องของชุด — ให้โหลดชุด (เช่น เริ่มเซิร์ฟเวอร์หรือเรียกใช้เส้นทางการบีบอัด) แล้วตรวจดูบันทึก

### การโหลดชุดภาษาแบบกำหนดเอง

```ts
import { loadRulePack } from "omniroute/compression/ruleLoader";

await loadRulePack("./my-custom-rules/hi/filler.json");
```

หรือวางไว้ในตำแหน่งที่ระบบรู้จัก:

```
~/.omniroute/compression/rules/hi/filler.json  # ระดับผู้ใช้
<project>/.compression/rules/hi/filler.json   # ระดับโปรเจกต์
```

### แนวทางปฏิบัติที่ดีที่สุดสำหรับชุดภาษา

1. **เริ่มต้นด้วย `filler`** — กฎเหล่านี้ให้ผลลัพธ์มากที่สุด
2. **ใช้ `minIntensity`** เพื่อควบคุมการใช้กฎเชิงรุก — ช่วยป้องกันการบีบอัดมากเกินไป
3. **รวมกรณีทดสอบไว้ด้วย** — เพิ่มอาร์เรย์ `tests[]` ใน JSON เพื่อตรวจสอบลักษณะการทำงาน
4. **ลำดับมีความสำคัญ** — กฎที่อยู่ก่อนจะถูกนำไปใช้ก่อน ให้วางกฎที่ให้ผลกระทบสูงไว้ก่อน
5. **ใช้ `replacement` อย่างระมัดระวัง** — โดยทั่วไปสตริงว่างคือค่าที่ถูกต้อง และต้องไม่เพิ่มเนื้อหาใหม่

### กลยุทธ์การแปล

เมื่อปรับชุดกฎให้รองรับภาษาใหม่:

1. **แปลชื่อกฎ** — ชื่อเหล่านี้จะปรากฏในเอาต์พุตการดีบัก
2. **ปรับรูปแบบนิพจน์ทั่วไป** — การแปลโดยตรงมักใช้ไม่ได้ผล (ขอบเขตคำแตกต่างกัน)
3. **ทดสอบกับบทสนทนาจริง** — ชุดกฎควรปลอดภัยเมื่อนำไปใช้กับอินพุตจริง
4. **ทำให้สอดคล้องกับธรรมเนียมทางวัฒนธรรม** — ตัวอย่างเช่น ชุดภาษาญี่ปุ่นมีคำฟุ่มเฟือยเชิงยกย่องมากกว่าภาษาอังกฤษ

---

## ไปป์ไลน์แบบซ้อน

**ไปป์ไลน์แบบซ้อน** จะเรียกใช้เอนจินหลายตัวตามลำดับ โดยส่งเอาต์พุตของแต่ละเอนจินไปยังเอนจินถัดไป นี่คือวิธีการทำงานภายในของ `mode: stacked`

### วิธีการทำงานของการซ้อน

```
อินพุต (10,000 โทเค็น)
        │
        ▼
   ┌──────────┐
   │  เอนจิน  │  ลำดับความสำคัญ 10
   │  A       │  ──▶ เอาต์พุต: 6,000 โทเค็น (-40%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  เอนจิน  │  ลำดับความสำคัญ 50
   │  B       │  ──▶ เอาต์พุต: 2,400 โทเค็น (-60%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  เอนจิน  │  ลำดับความสำคัญ 100
   │  C       │  ──▶ เอาต์พุต: 1,200 โทเค็น (-80%)
   └────┬─────┘
        │
        ▼
เอาต์พุตสุดท้าย (1,200 โทเค็น, ประหยัดรวม ~88%)
```

เมื่อเลือก `mode: "stacked"` เอนจินจะทำงานตามลำดับที่ระบุไว้ในอาร์เรย์ `pipeline`
เอาต์พุตของเอนจิน N จะกลายเป็นอินพุตของเอนจิน N+1

### โหมดการบีบอัด

OmniRoute จะเลือก **หนึ่งโหมดต่อคำขอ** โดยอิงจากการกำหนดค่า เกณฑ์การทริกเกอร์อัตโนมัติ และการตั้งค่าแทนที่ของคอมโบ
โหมดที่ใช้งานได้กำหนดไว้ใน `open-sse/services/compression/types.ts` (ชนิด `CompressionMode`):

| โหมด         | เอนจิน               | กรณีใช้งาน                                                                                                                                                                                                              |
| ------------ | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `off`        | ไม่มี                | ปิดใช้งานการบีบอัดทั้งหมด                                                                                                                                                                                               |
| `rtk`        | RTK เท่านั้น         | เซสชันที่มีเอาต์พุตคำสั่งจำนวนมาก (ประหยัด 80% ขึ้นไป)                                                                                                                                                                  |
| `lite`       | Lite เท่านั้น        | การบีบอัดแบบระมัดระวัง (รวดเร็ว ปลอดภัย)                                                                                                                                                                                |
| `standard`   | Caveman              | การบีบอัดข้อความร้อยแก้วด้วยแพ็กภาษา                                                                                                                                                                                    |
| `aggressive` | Caveman + Aggressive | การบีบอัดข้อความร้อยแก้วเชิงรุก + การประมวลผลขั้นสุดท้ายเชิงรุก                                                                                                                                                         |
| `ultra`      | Ultra                | การบีบอัดสูงสุด (มีการสูญเสียข้อมูล ใช้เป็นทางเลือกสุดท้าย) สามารถเลือกกำหนดเส้นทางผ่านเอนจิน SLM **LLMLingua-2** ได้เมื่อตั้งค่า `ultra.modelPath` (หากโมเดลไม่พร้อมใช้งาน ระบบจะเปิดให้ทำงานต่อโดยใช้เส้นทางแบบอิงกฎ) |
| `stacked`    | ไปป์ไลน์แบบกำหนดเอง  | ประกอบเอนจินตามลำดับใดก็ได้ (ดูด้านล่าง)                                                                                                                                                                                |

> นอกเหนือจากเอนจินของโหมดข้างต้นแล้ว รีจิสทรียังมาพร้อมกับเอนจินเฉพาะทางที่สามารถนำมาซ้อนกันได้ —
> **CCR**, **headroom**, **ionizer** และ **session-dedup** — ซึ่งมีเอกสารอธิบายอยู่ใน
> [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md#additional-built-in-engines)

การเลือกโหมดจะกำหนดโดย `getEffectiveMode()` ใน `open-sse/services/compression/strategySelector.ts`:

1. หากปิดใช้งานการบีบอัด: `"off"`
2. หากมีการตั้งค่าแทนที่ของคอมโบ: ใช้ค่าที่ตั้งไว้แทน
3. หากเกินเกณฑ์การทริกเกอร์อัตโนมัติ: ใช้ `autoTriggerMode` (ค่าเริ่มต้น: `"lite"`)
4. มิฉะนั้น: ใช้ `defaultMode`

### ไปป์ไลน์แบบซ้อนเริ่มต้น

เมื่อกำหนด `mode: "stacked"` อย่างชัดเจน ไปป์ไลน์เริ่มต้นจะประกอบด้วย:

1. **RTK** — ตัดสิ่งรบกวนจากเอาต์พุตคำสั่ง (ประหยัด ~80% สำหรับเอาต์พุตเทอร์มินัล)
2. **Caveman** — ลบคำฟุ่มเฟือย ทำให้ข้อความร้อยแก้วกระชับขึ้น (~46% ของข้อความที่เหลือ)
3. **Lite** — ประมวลผลช่องว่างและกำจัดข้อมูลซ้ำเป็นขั้นตอนสุดท้าย

องค์ประกอบนี้ช่วยให้ **ประหยัดได้ 78-95%** ในเซสชันที่มีการใช้เครื่องมือจำนวนมาก

### การกำหนดค่าไปป์ไลน์แบบซ้อน

ในการกำหนดค่าคอมโบ:

```json
{
  "compression": {
    "mode": "stacked",
    "pipeline": [
      { "engine": "rtk", "config": { "intensity": "aggressive" } },
      { "engine": "caveman", "config": { "intensity": "full" } },
      { "engine": "lite", "config": {} }
    ]
  }
}
```

คุณสามารถละเว้นเอนจิน เพิ่มเอนจินแบบกำหนดเอง หรือจัดลำดับใหม่ได้

### การส่งต่อสถานะ

เอนจินสามารถอ่านข้อมูลเมตาจากบริบทของคำขอ (ใน `options`) ได้:

```ts
compress(body, config) {
  // อ่านข้อมูลเมตาจากเอนจินก่อนหน้า
  const original = options?.compressionComboId;  // "my-coding-combo"
  // ...
}
```

ข้อมูลเมตาเป็นแบบ **อ่านอย่างเดียว** — เอนจินไม่สามารถแก้ไขบริบทของคำขอได้ โดยแก้ไขได้เฉพาะเอาต์พุตเนื้อหาของตนเองเท่านั้น

### ข้อควรระวังเกี่ยวกับลำดับการทำงาน

| ลำดับเอนจิน                                    | ผลลัพธ์                                                                       |
| ---------------------------------------------- | ----------------------------------------------------------------------------- |
| RTK → Caveman → Lite                           | **แนะนำ** (ตัดสิ่งรบกวนก่อน ตามด้วยภาษา แล้วจึงจัดการช่องว่าง)                |
| Lite → RTK → Caveman                           | ไม่ดี — Lite ตัดช่องว่างออกจากเอาต์พุตดิบ ทำให้การจับคู่รูปแบบของ RTK ล้มเหลว |
| Caveman → RTK                                  | ไม่ดี — Caveman อาจเขียนข้อความใหม่ในลักษณะที่ RTK ไม่รู้จัก                  |
| ลำดับใดก็ได้ที่มี `tool_results` เป็นอันดับแรก | ดีกว่า — เอาต์พุตของเครื่องมือเป็นเนื้อหาที่มีสิ่งรบกวนมากที่สุด              |

### กรณีที่ไม่ควรซ้อน

การซ้อนไม่ได้ดีกว่าเสมอไป:

- **ข้อความทั่วไป** (ไม่มีเอาต์พุตของเครื่องมือ) — ใช้ Caveman หรือ Lite เพียงตัวเดียวก็เพียงพอ
- **ให้ความสำคัญกับต้นทุน** — แต่ละเอนจินเพิ่มเวลาแฝง ~5-50ms
- **เครื่องมือเฉพาะ** — โดยทั่วไป RTK เพียงตัวเดียวก็เพียงพอสำหรับเอาต์พุตของเชลล์

### การสร้างไปป์ไลน์แบบกำหนดเอง

ไม่มีรีจิสทรีสำหรับไปป์ไลน์ที่มีชื่อ ไปป์ไลน์แบบซ้อนเป็นเพียง **อาร์เรย์ของขั้นตอนแบบอินไลน์**
ที่ส่งไปยัง `applyStackedCompression()` (ส่งออกจาก
`@omniroute/open-sse/services/compression/strategySelector`):

```ts
import { applyStackedCompression } from "@omniroute/open-sse/services/compression/strategySelector";

const result = applyStackedCompression(body, [
  { engine: "rtk", intensity: "aggressive" },
  { engine: "caveman", intensity: "full" },
]);
```

เมื่อคุณไม่ได้ส่งไปป์ไลน์ ระบบจะใช้ค่าเริ่มต้นเป็น `rtk(standard) → caveman(full)`

หากต้องการควบคุมผ่านการกำหนดค่า ให้ตั้งค่า `mode: "stacked"` และระบุอาร์เรย์ของขั้นตอนไว้ภายใต้
`stackedPipeline` (อ่านจาก `config.stackedPipeline`):

```json
{
  "compression": {
    "mode": "stacked",
    "stackedPipeline": [
      { "engine": "rtk", "intensity": "aggressive" },
      { "engine": "caveman", "intensity": "full" }
    ]
  }
}
```

---

## นโยบายการซิงค์กับต้นทาง

เอนจินการบีบอัดของ OmniRoute ให้เครดิตแก่โครงการต้นทางหลายโครงการใน README
("ได้รับแรงบันดาลใจจาก RTK, Caveman, LLMLingua-2, Troglodita") คำถามที่ผู้มีส่วนร่วม
มักถามคือ: **เมื่อ RTK ต้นทางเพิ่มตัวกรองเครื่องมือใหม่ หรือ Caveman เพิ่มชุดกฎ
สิ่งเหล่านั้นจะมาถึง OmniRoute ได้อย่างไร?** ส่วนนี้คือคำตอบอย่างเป็นทางการ

### สำเนาที่รวมมากับโครงการเทียบกับการนำไปใช้งานแบบอิสระ

| เอนจิน                       | ความสัมพันธ์กับต้นทาง                                                                                                                                           | ตำแหน่ง                                                             |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **RTK**                      | **การนำไปใช้งานใหม่แบบอิสระ** (ได้รับแรงบันดาลใจ ไม่ใช่สำเนา)                                                                                                   | `open-sse/services/compression/engines/rtk/`                        |
| **Caveman**                  | **การนำไปใช้งานใหม่แบบอิสระ** (ได้รับแรงบันดาลใจ)                                                                                                               | `open-sse/services/compression/engines/cavemanAdapter.ts`           |
| **Headroom**                 | ส่วนใหญ่เป็นส่วนภายใน มีเพียงตัวแปลงสัญญาณ `gcf/` เท่านั้นที่ **รวมมาจากต้นทางอย่างแท้จริง** จาก `gcf-typescript` (MIT, มีเครื่องหมาย SPDX, เฉพาะโปรไฟล์ทั่วไป) | `open-sse/services/compression/engines/headroom/gcf/`               |
| **LLMLingua-2 / Troglodita** | ได้รับแรงบันดาลใจจากต้นทาง (เป็นแนวทางให้กับเอนจิน `llmlingua` + `session-dedup`)                                                                               | `open-sse/services/compression/engines/llmlingua/`, `session-dedup` |

ประเด็นสำคัญ: **RTK และ Caveman เป็นการนำ_แนวคิด\_ (กฎตัวกรอง ชุดกฎ)
ไปใช้งานด้วย TypeScript แบบคลีนรูม ไม่ใช่ซอร์สทรีที่รวมมาจากต้นทาง** ไม่มี
สำเนาต้นทางให้ `git pull` — ซึ่งเป็นเหตุผลที่ README ใช้คำว่า
"ได้รับแรงบันดาลใจจาก" แทนที่จะเป็น "รวมมาด้วย"

### วิธีผสานการปรับปรุงจากต้นทาง

**ไม่มีการติดตามรุ่นของต้นทางโดยอัตโนมัติ และไม่มีป้ายกำกับ `compression-sync`**
ซึ่งเป็นการออกแบบโดยตั้งใจ เนื่องจากเอนจินเหล่านี้เป็นการนำไปใช้งานใหม่
ตัวกรองของ RTK หรือชุดกฎของ Caveman จากต้นทางจึงไม่ได้ถูกผสานเข้ามาเป็นโค้ด
แต่จะถูก **ถ่ายทอดใหม่เป็นกฎ/ตัวกรองใหม่ในรูปแบบของ OmniRoute เอง** (ดู
[COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md)) และรวมเข้ามาเป็นครั้งคราว
ผ่าน PR ตามปกติ จุดต่อขยายข้างต้น (เอนจินแบบกำหนดเอง ชุดภาษา ตัวกรอง RTK)
คือวิธีที่ได้รับอนุญาตสำหรับการมีส่วนร่วม

ตัวอย่างล่าสุดของกระบวนการนี้:

- ตัวกรอง RTK สำหรับเอาต์พุตการบิลด์ของ Gradle และ `dotnet` (v3.8.42)
- ตัวกรอง RTK สำหรับ kubectl / docker-build / composer / gh (#2824)
- ชุดภาษาอินโดนีเซียของ Caveman (#3975) รวมถึงชุดภาษาเยอรมัน / ฝรั่งเศส / ญี่ปุ่น / จีน

### Headroom (พร็อกซีบีบอัดอินพุต)

Headroom เป็น **ส่วนภายในทั้งหมด** — ประกอบด้วยสแนปช็อตตัวแปลงสัญญาณ `gcf`
ที่รวมมากับโครงการและตรึงเวอร์ชันไว้ พร้อมด้วยเลเยอร์ `smartcrusher` / `toon` /
`tabular` ของ OmniRoute เอง ไม่มีต้นทางที่ใช้งานอยู่ให้ติดตามนอกเหนือจากสำเนา
ที่รวมมากับโครงการ การอัปเดต `gcf` จะดำเนินการรีเฟรชด้วยตนเองเมื่อตัวแปลงสัญญาณ
เปลี่ยนแปลง และตรวจสอบความถูกต้องอีกครั้งเทียบกับเกตงบประมาณการบีบอัด
(`check:compression-budget`)

### การเสนอการปรับปรุงที่ได้รับแรงบันดาลใจจากต้นทาง

1. **อย่ารวมโค้ดจากต้นทาง** — ให้ถ่ายทอดกฎ/ตัวกรองจากต้นทางใหม่ในรูปแบบของ OmniRoute
2. เพิ่มผ่านจุดต่อขยายที่ตรงกันด้านล่าง (ชุดภาษา ตัวกรอง RTK หรือ
   เอนจินแบบกำหนดเอง)
3. อ้างอิงโครงการต้นทางในคำอธิบาย PR (เพื่อให้เครดิต) แทนการ
   คัดลอกซอร์สที่อยู่ภายใต้สัญญาอนุญาต
4. เพิ่มการทดสอบและยืนยันว่าเกต `check:compression-budget` ยังคงผ่าน

---

## การเพิ่มรูปแบบเอาต์พุต

รูปแบบเอาต์พุต (ดู[ตารางแค็ตตาล็อกในคู่มือ](./COMPRESSION_GUIDE.md#output-styles-catalog))
เป็นส่วนฝั่งการตอบกลับที่ทำงานคู่กับเอนจินอินพุต กล่าวคือ แทนที่จะบีบอัดสิ่งที่คุณ
ส่ง รูปแบบเหล่านี้จะสั่งให้โมเดลสร้างเอาต์พุตที่มีต้นทุนต่ำลง รีจิสทรีคือ
`OUTPUT_STYLE_CATALOG` ใน `open-sse/services/compression/outputStyles/catalog.ts` และ
**รายการเดียวในแค็ตตาล็อกคือฟีเจอร์ทั้งหมด**: ตัวแทรก แผงการตั้งค่าแดชบอร์ด
การจัดเก็บถาวร และเทเลเมทรี ล้วนไล่รายการจากแค็ตตาล็อก — ไม่มีรายการอื่นที่ต้องอัปเดต

1. **เพิ่มหนึ่งรายการลงใน `OUTPUT_STYLE_CATALOG`** โดยมี `id`, `label`, `description` และ
   `levels` ภาษาอังกฤษทั้งสามระดับ (`lite`, `full`, `ultra`) ทุกระดับต้องลงท้ายด้วย
   `${SHARED_BOUNDARIES}` เพื่อให้โค้ด พาธ คำสั่ง ข้อผิดพลาด และ URL คงเดิมทุกประการ
   ข้อความคำสั่งต้องเป็นแบบ **คงที่และกำหนดผลลัพธ์ได้แน่นอน** สำหรับแต่ละ
   `(id, level, language)` — อนุญาตให้แทรกค่าได้เฉพาะ `${SHARED_BOUNDARIES}` เท่านั้น
2. **แปลรายการดังกล่าว** ต้องมีบล็อก `pt-BR` อย่างน้อยภายใต้ `i18n`; `ponytail` และ
   `i-have-adhd` (en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi) เป็นโครงสร้างอ้างอิง รูปแบบที่ตั้งใจ
   ให้รองรับเพียงภาษาเดียวจะกำหนด `locale` แทน (เช่น `terse-cjk` → `zh`) และจะ
   แสดงเป็นตัวเลือกเฉพาะภายใต้โลเคลนั้น
3. **อัปเดตตัวตรวจสอบเมทริกซ์** — เพิ่มภาษาของรูปแบบลงใน `BASELINE_LANGUAGES` ใน
   `tests/unit/compression/output-styles-i18n-matrix.test.ts` เกตจะทำให้รูปแบบใหม่
   ที่ไม่ได้ถูกจำกัดด้วยโลเคลและไม่มีคำแปลที่กำหนดล้มเหลว เว้นแต่จะมีรายการ
   `KNOWN_ENGLISH_ONLY` ที่ระบุอย่างชัดเจนพร้อมอ้างอิงประเด็นสำหรับติดตาม
4. **เพิ่มการทดสอบเฉพาะรูปแบบ** โดยใช้
   `tests/unit/compression/i-have-adhd-catalog.test.ts` เป็นต้นแบบ: ตรวจสอบโครงสร้างแค็ตตาล็อก
   ข้อกำหนดเรื่องขอบเขตในแต่ละระดับ และจุดยืนยันว่าคำแปลแต่ละรายการเขียนด้วยภาษา
   ของตนเองแทนที่จะคัดลอกภาษาอังกฤษ
5. **การระบุแหล่งที่มา**: หากรูปแบบดัดแปลงมาจากโปรเจกต์ต้นทาง ให้ระบุเครดิตไว้ใน
   คอมเมนต์แหล่งที่มาของรายการนั้น (เช่น `i-have-adhd` → ayghri/i-have-adhd, MIT) — ใช้
   กฎเดียวกับ "การเสนอการปรับปรุงที่ได้รับแรงบันดาลใจจากต้นทาง" ด้านบน

ไม่จำเป็นต้องเปลี่ยนแปลง UI, สคีมา หรือเทเลเมทรี — ส่วนเหล่านั้นเรนเดอร์จากแค็ตตาล็อก

---

## แนวทางปฏิบัติที่ดีที่สุด

### การพัฒนาเอนจิน

1. **นำ `validateConfig` ไปใช้เสมอ** — เอนจินที่ไม่มีการตรวจสอบความถูกต้องจะทำให้เกิดความล้มเหลวโดยไม่มีการแจ้งเตือน
2. **กำหนด `targetLatencyMs` ตามความเป็นจริง** — ตัวเลือกกลยุทธ์ใช้ค่านี้เพื่อเลือกเอนจิน
3. **ใช้ `getConfigSchema` สำหรับแดชบอร์ด** — ห้ามซ่อนการกำหนดค่าจากผู้ใช้
4. **รองรับ `stackable: true` หากเอนจินของคุณไม่มีผลข้างเคียง** — เอนจินที่มีผลข้างเคียงไม่ควรซ้อนกัน
5. **เขียนการทดสอบแบบอินไลน์** — เอนจินควรตรวจสอบยืนยันได้ภายใน <1s

### การพัฒนาแพ็กภาษา

1. **เริ่มต้นด้วยระดับความเข้มข้น `lite`** — กฎของคุณควรปลอดภัยเมื่อใช้การตั้งค่าต่ำสุด
2. **ใช้ `context` เพื่อจำกัดขอบเขตกฎ** — กฎที่ใช้กับ `user` เท่านั้นจะไม่ส่งผลต่อพรอมต์ระบบโดยไม่ตั้งใจ
3. **หลีกเลี่ยงการจับคู่คีย์ JSON** — `\\bword\\b` สามารถจับคู่ภายใน JSON และทำให้ข้อมูลที่มีโครงสร้างเสียหายได้
4. **ทดสอบด้วยกรณีขอบ** — อินพุตว่าง ยูนิโคด ข้อความ RTL และอีโมจิ
5. **ใช้แพ็กที่มีอยู่เป็นเทมเพลต** — `en/filler.json` เป็นตัวอย่างที่พัฒนาสมบูรณ์ที่สุด

### การออกแบบไปป์ไลน์

1. **ทำโปรไฟล์ก่อนปรับประสิทธิภาพ** — วัดผลด้วย `compression_stats` ก่อน
2. **เลือกใช้การประกอบส่วนแทนการนำไปสร้างใหม่** — ขยายกฎ Caveman ก่อนเขียนเอนจินใหม่
3. **บันทึกเหตุผลของลำดับไว้** — คอมเมนต์ว่าเหตุใดเอนจิน A จึงอยู่ก่อนเอนจิน B
4. **ทดสอบที่ระดับความเข้มข้นทั้ง 3 ระดับ** — `lite` รวดเร็วแต่มีการสูญเสียข้อมูล ส่วน `ultra` ช้าแต่แม่นยำ

---

## เอกสารอ้างอิง: เอนจินในตัว

| ID เอนจิน            | ซ้อนกันได้ | stackPriority เริ่มต้น | เป้าหมาย                                 |
| -------------------- | ---------- | ---------------------- | ---------------------------------------- |
| `lite`               | ใช่        | 5                      | ข้อความ, ผลลัพธ์ของเครื่องมือ            |
| `rtk`                | ใช่        | 10                     | ผลลัพธ์ของเครื่องมือ                     |
| `standard` (caveman) | ใช่        | 20                     | ข้อความ, ผลลัพธ์ของเครื่องมือ, บล็อกโค้ด |
| `aggressive`         | ใช่        | 30                     | ข้อความ                                  |
| `ultra`              | ใช่        | 40                     | ข้อความ, บล็อกโค้ด                       |

### ดูเพิ่มเติม

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — ภาพรวมของไปป์ไลน์
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — เอกสารอ้างอิงรีจิสทรีของเอนจิน
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — ข้อกำหนดรูปแบบกฎ
- [COMPRESSION_LANGUAGE_PACKS.md](./COMPRESSION_LANGUAGE_PACKS.md) — รายละเอียดแพ็กภาษา
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — เอนจิน RTK และตัวกรองแบบกำหนดเอง
- ซอร์ส: `open-sse/services/compression/` (117 ไฟล์, ~250KB)
