# ACP (Agent Client Protocol) (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

> **สรุปสั้น ๆ**: ACP ช่วยให้ OmniRoute เรียกใช้เอเจนต์ CLI (เช่น Claude Code, Codex) เป็นโพรเซสลูกแทนการใช้ HTTP API ซึ่งทำให้คุณใช้การรับส่งข้อมูลแบบ "CLI-as-backend" ได้

---

## ACP คืออะไร?

ACP (Agent Client Protocol) คือการรับส่งข้อมูลแบบ **"CLI-as-backend"** สำหรับ OmniRoute แทนที่จะดักจับการเรียก HTTP API ไปยังผู้ให้บริการ AI แต่ ACP จะ **เรียกใช้เอเจนต์ CLI เป็นโพรเซสลูก** และส่งพรอมต์ผ่านอินเทอร์เฟซดั้งเดิมของเอเจนต์เหล่านั้น

### ทำไมจึงควรใช้ ACP?

| ประโยชน์                   | คำอธิบาย                                             |
| -------------------------- | ---------------------------------------------------- |
| **ไม่ต้องใช้ API key**     | ใช้การยืนยันตัวตน CLI ที่คุณมีอยู่แล้ว               |
| **โปรโตคอลดั้งเดิม**       | ใช้รูปแบบอินพุต/เอาต์พุตดั้งเดิมของแต่ละ CLI         |
| **การค้นหาอัตโนมัติ**      | ตรวจหา CLI ที่ติดตั้งอยู่ในระบบของคุณ                |
| **เอเจนต์ในตัว 15 รายการ** | กำหนดค่าไว้ล่วงหน้าสำหรับเครื่องมือ CLI ยอดนิยม      |
| **เอเจนต์แบบกำหนดเอง**     | เพิ่มเครื่องมือ CLI ของคุณเองผ่านการตั้งค่า          |
| **การจัดการโพรเซส**        | จัดการวงจรชีวิต (เรียกใช้ ส่งข้อมูล และยุติการทำงาน) |

---

## เอเจนต์ CLI ที่รองรับ

ACP รองรับ **เอเจนต์ CLI ในตัว 15 รายการ** พร้อมใช้งานทันที:

| ID เอเจนต์    | ชื่อที่แสดง        | ไบนารี        | โปรโตคอล |
| ------------- | ------------------ | ------------- | -------- |
| `codex`       | OpenAI Codex CLI   | `codex`       | stdio    |
| `claude`      | Claude Code CLI    | `claude`      | stdio    |
| `goose`       | Goose CLI          | `goose`       | stdio    |
| `openclaw`    | OpenClaw           | `openclaw`    | stdio    |
| `aider`       | Aider              | `aider`       | stdio    |
| `opencode`    | OpenCode           | `opencode`    | stdio    |
| `cline`       | Cline              | `cline`       | stdio    |
| `qwen`        | Qwen Code          | `qwen --acp`  | stdio    |
| `forge`       | ForgeCode          | `forge`       | stdio    |
| `amazon-q`    | Amazon Q Developer | `q`           | stdio    |
| `interpreter` | Open Interpreter   | `interpreter` | stdio    |
| `cursor-cli`  | Cursor CLI         | `cursor`      | stdio    |
| `warp`        | Warp AI            | `warp`        | stdio    |
| `gemini`      | Gemini CLI         | `gemini`      | stdio    |
| `zcode`       | ZCode              | `zcode`       | stdio    |

### เอเจนต์แบบกำหนดเอง

คุณสามารถเพิ่มเอเจนต์ CLI ของคุณเองผ่านการตั้งค่าได้ เอเจนต์แบบกำหนดเองรองรับคุณสมบัติเดียวกันกับเอเจนต์ในตัว

---

## เริ่มต้นอย่างรวดเร็ว

### ขั้นตอนที่ 1: ติดตั้งเอเจนต์ CLI

```bash
# ตัวอย่าง: ติดตั้ง Claude Code CLI
npm install -g @anthropic-ai/claude-code

# ตรวจสอบการติดตั้ง
claude --version
```

### ขั้นตอนที่ 2: การตรวจหาอัตโนมัติของ ACP

ACP จะตรวจหาเอเจนต์ CLI ที่ติดตั้งอยู่ในระบบของคุณโดยอัตโนมัติ โดยไม่จำเป็นต้องกำหนดค่า!

### ขั้นตอนที่ 3: ใช้การรับส่งข้อมูลแบบ ACP

เมื่อตรวจพบแล้ว คุณสามารถใช้ ACP เป็นการรับส่งข้อมูลสำหรับผู้ให้บริการที่รองรับรายใดก็ได้ OmniRoute จะใช้ ACP โดยอัตโนมัติเมื่อมี CLI พร้อมใช้งาน

---

## ACP ทำงานอย่างไร

### สถาปัตยกรรม

```
┌─────────────────┐
│  OmniRoute      │
│  (พร็อกซี HTTP)   │
└────────┬────────┘
         │
         │ spawn()
         ▼
┌─────────────────┐
│  โพรเซสลูก       │
│  (เอเจนต์ CLI)    │
│                 │
│  stdin  ◄──────┤  ส่งพรอมต์
│  stdout ──────►│  รับการตอบกลับ
│  stderr ──────►│  รับข้อผิดพลาด
└─────────────────┘
```

### วงจรชีวิตของโพรเซส

1. **เรียกใช้** — ACP สร้างโพรเซสลูกสำหรับเอเจนต์ CLI
2. **ส่ง** — ACP เขียนพรอมต์ไปยัง stdin ของโพรเซส
3. **รับ** — ACP อ่านการตอบกลับจาก stdout/stderr
4. **ตรวจหาสถานะว่าง** — ACP รอจนไม่มีกิจกรรมเป็นเวลา 2 วินาที ก่อนถือว่าการตอบกลับเสร็จสมบูรณ์
5. **ยุติ** — ACP ยุติโพรเซส (SIGTERM แล้วตามด้วย SIGKILL หลังจาก 5 วินาที)

### โปรโตคอลการสื่อสาร

ACP ใช้ **stdio** (อินพุต/เอาต์พุตมาตรฐาน) เพื่อสื่อสารกับเอเจนต์ CLI โดยมีโปรโตคอลดังนี้:

1. **ส่งพรอมต์** — เขียนไปยัง stdin พร้อมอักขระขึ้นบรรทัดใหม่
2. **รอการตอบกลับ** — อ่านจาก stdout จนเข้าสู่สถานะว่าง (ไม่มีเอาต์พุตเป็นเวลา 2 วินาที)
3. **หมดเวลา** — ค่าเริ่มต้นคือ 120 วินาที (กำหนดค่าได้)

---

## เอกสารอ้างอิง API

### ฟังก์ชัน Registry

#### `detectInstalledAgents()`

ตรวจหาเอเจนต์ CLI ที่ติดตั้งไว้ทั้งหมดในระบบ ผลลัพธ์จะถูกแคชไว้เป็นเวลา 60 วินาที

```typescript
import { detectInstalledAgents } from "@/lib/acp";

const agents = detectInstalledAgents();
// ส่งคืน: CliAgentInfo[]

interface CliAgentInfo {
  id: string; // เช่น "codex", "claude"
  name: string; // ชื่อที่ใช้แสดง
  binary: string; // ชื่อไบนารีที่จะเรียกใช้
  versionCommand: string; // คำสั่งตรวจหาเวอร์ชัน
  version: string | null; // เวอร์ชันที่ตรวจพบ (เป็น null หากไม่ได้ติดตั้ง)
  installed: boolean; // ระบุว่าติดตั้งเอเจนต์แล้วหรือไม่
  providerAlias: string; // ID ของผู้ให้บริการใน OmniRoute
  spawnArgs: string[]; // อาร์กิวเมนต์ที่ส่งเมื่อเรียกใช้
  protocol: "stdio" | "http"; // โปรโตคอลการสื่อสาร
  isCustom?: boolean; // ระบุว่าเป็นเอเจนต์แบบกำหนดเองโดยผู้ใช้หรือไม่
}
```

#### `getAvailableAgents()`

รับเฉพาะเอเจนต์ที่ติดตั้งแล้วและพร้อมใช้งานสำหรับ ACP

```typescript
import { getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();
// ส่งคืน: CliAgentInfo[] (เฉพาะเอเจนต์ที่ติดตั้งแล้ว)
```

#### `getAgentById(id)`

รับเอเจนต์ที่ระบุตาม ID

```typescript
import { getAgentById } from "@/lib/acp";

const agent = getAgentById("claude");
// ส่งคืน: CliAgentInfo | undefined
```

#### `setCustomAgents(agents)`

ตั้งค่าคำนิยามเอเจนต์แบบกำหนดเองจากการตั้งค่า

```typescript
import { setCustomAgents } from "@/lib/acp";

setCustomAgents([
  {
    id: "my-custom-cli",
    name: "My Custom CLI",
    binary: "mycli",
    versionCommand: "mycli --version",
    providerAlias: "my-provider",
    spawnArgs: [],
    protocol: "stdio",
  },
]);
```

### ฟังก์ชัน Manager

#### `acpManager.spawn(agentId, binary, args, env)`

สร้างโพรเซสเอเจนต์ CLI ใหม่

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("claude", "claude", ["--print", "--output-format", "json"], {
  /* ตัวแปรสภาพแวดล้อมแบบกำหนดเอง */
});
// ส่งคืน: AcpSession
```

**ID เอเจนต์ที่อนุญาต**: `["claude", "codex", "gemini", "qwen"]`

#### `acpManager.sendPrompt(sessionId, prompt, timeoutMs)`

ส่งพรอมต์ไปยังเอเจนต์ CLI และรวบรวมการตอบกลับ

```typescript
import { acpManager } from "@/lib/acp";

const response = await acpManager.sendPrompt(
  "acp-claude-1234567890-abc123",
  "What is 2+2?",
  120000 // หมดเวลาหลังจาก 2 นาที
);
// ส่งคืน: Promise<string>
```

#### `acpManager.kill(sessionId)`

ยุติเซสชันและล้างข้อมูลที่เกี่ยวข้อง

```typescript
import { acpManager } from "@/lib/acp";

const killed = acpManager.kill("acp-claude-1234567890-abc123");
// ส่งคืน: boolean
```

#### `acpManager.getActiveSessions()`

รับเซสชันที่กำลังทำงานอยู่ทั้งหมด

```typescript
import { acpManager } from "@/lib/acp";

const sessions = acpManager.getActiveSessions();
// ส่งคืน: AcpSession[]
```

#### `acpManager.killAll()`

ยุติเซสชันทั้งหมด

```typescript
import { acpManager } from "@/lib/acp";

acpManager.killAll();
```

### อินเทอร์เฟซ Session

```typescript
interface AcpSession {
  id: string; // ID เซสชันที่ไม่ซ้ำกัน
  agentId: string; // ID เอเจนต์ (เช่น "claude")
  process: ChildProcess; // ตัวจัดการโพรเซสลูก
  alive: boolean; // ระบุว่าโพรเซสยังทำงานอยู่หรือไม่
  stdoutBuffer: string; // บัฟเฟอร์ stdout ที่สะสมไว้
  stderrBuffer: string; // บัฟเฟอร์ stderr ที่สะสมไว้
  createdAt: Date; // เวลาประทับที่สร้าง
}
```

### เหตุการณ์

`AcpManager` สืบทอดจาก `EventEmitter` และปล่อยเหตุการณ์ต่อไปนี้:

#### `stdout`

ปล่อยเมื่อเอเจนต์ CLI เขียนข้อมูลไปยัง stdout

```typescript
acpManager.on("stdout", ({ sessionId, data }) => {
  console.log(`[${sessionId}] stdout: ${data}`);
});
```

#### `stderr`

ปล่อยเมื่อเอเจนต์ CLI เขียนข้อมูลไปยัง stderr

```typescript
acpManager.on("stderr", ({ sessionId, data }) => {
  console.error(`[${sessionId}] stderr: ${data}`);
});
```

#### `exit`

ปล่อยเมื่อโพรเซสเอเจนต์ CLI สิ้นสุดการทำงาน

```typescript
acpManager.on("exit", ({ sessionId, code, signal }) => {
  console.log(`[${sessionId}] exited with code ${code}, signal ${signal}`);
});
```

#### `error`

ปล่อยเมื่อโพรเซสเอเจนต์ CLI เกิดข้อผิดพลาด

```typescript
acpManager.on("error", ({ sessionId, error }) => {
  console.error(`[${sessionId}] error: ${error}`);
});
```

---

## การกำหนดค่า

### ตัวแปรสภาพแวดล้อม

ACP สืบทอดตัวแปรสภาพแวดล้อมทั้งหมดจากโปรเซสแม่ และสามารถเพิ่มตัวแปรสภาพแวดล้อมแบบกำหนดเองได้:

```typescript
acpManager.spawn("claude", "claude", [], {
  ANTHROPIC_API_KEY: "sk-...",
  DEBUG: "true",
});
```

### อาร์กิวเมนต์สำหรับการเริ่มโปรเซส

เอเจนต์แต่ละตัวมีอาร์กิวเมนต์เริ่มต้นสำหรับการเริ่มโปรเซสที่กำหนดไว้ในรีจิสทรี คุณสามารถเขียนทับค่าเหล่านี้ได้:

```typescript
acpManager.spawn("claude", "claude", ["--print", "--verbose"], {});
```

### การหมดเวลา

ระยะหมดเวลาเริ่มต้นของพรอมต์คือ **120 วินาที** (2 นาที) คุณสามารถเขียนทับค่าได้:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 นาที
```

### แคชการตรวจหา

ผลการตรวจหาเอเจนต์จะถูกแคชไว้เป็นเวลา **60 วินาที** เพื่อหลีกเลี่ยงการสแกนระบบไฟล์ที่ใช้ทรัพยากรมาก หากต้องการบังคับรีเฟรช:

```typescript
import { refreshAgentCache } from "@/lib/acp";

refreshAgentCache();
```

---

## ความปลอดภัย

### การป้องกันการแทรกคำสั่ง

ACP ตรวจสอบความถูกต้องของคำสั่งตรวจสอบเวอร์ชันเพื่อป้องกันการโจมตีด้วยการแทรกคำสั่ง:

```typescript
const DISALLOWED_VERSION_COMMAND_CHARS = /[;&|<>`$\r\n]/;
```

คำสั่งตรวจสอบเวอร์ชันที่มีอักขระเหล่านี้จะถูกปฏิเสธ:

- `;` — ตัวคั่นคำสั่ง
- `&` — โปรเซสเบื้องหลัง
- `|` — ไปป์
- `<`, `>` — การเปลี่ยนทิศทาง
- `` ` `` — การแทนที่ด้วยผลลัพธ์ของคำสั่ง
- `$` — การขยายค่าตัวแปร
- `\r`, `\n` — การขึ้นบรรทัดใหม่

### การตรวจสอบชื่อไบนารี

ACP ตรวจสอบว่าไบนารีในคำสั่งตรวจสอบเวอร์ชันตรงกับชื่อไบนารีที่คาดไว้ (เว้นแต่จะเป็นเอเจนต์แบบกำหนดเอง)

### การแยกโปรเซส

แต่ละเซสชัน ACP ทำงานในโปรเซสลูกของตัวเอง โปรเซสจะถูกยุติเมื่อเซสชันสิ้นสุดหรือหมดเวลา

---

## ประสิทธิภาพ

### ประสิทธิภาพการตรวจหา

- **การเรียกครั้งแรก**: ~50-200ms (เรียกใช้คำสั่ง `version` สำหรับแต่ละเอเจนต์)
- **การเรียกที่ใช้แคช**: <1ms (ส่งคืนจากแคช)
- **TTL ของแคช**: 60 วินาที

### ประสิทธิภาพของพรอมต์

- **เริ่มโปรเซส**: ~50-100ms
- **ส่งพรอมต์**: ~10-50ms
- **รอการตอบกลับ**: ขึ้นอยู่กับเอเจนต์ CLI (โดยทั่วไป 1-30 วินาที)
- **ยุติโปรเซส**: ~5 วินาที (SIGTERM) + ทันที (SIGKILL)

### การใช้ทรัพยากร

- **หน่วยความจำต่อเซสชัน**: ~10-50MB (ขึ้นอยู่กับเอเจนต์ CLI)
- **CPU**: น้อยมาก (จำกัดด้วย I/O)
- **ดิสก์**: ไม่มี

---

## การแก้ไขปัญหา

### ข้อผิดพลาด "Unknown agent"

**ปัญหา**: `acpManager.spawn()` ส่งข้อผิดพลาด `Unknown agent: <id>`

**วิธีแก้ไข**: อนุญาตให้ใช้เฉพาะเอเจนต์เหล่านี้ใน `spawn()`:

- `claude`
- `codex`
- `gemini`
- `qwen`

เอเจนต์อื่นต้องเริ่มโปรเซสด้วยตนเองหรือผ่านการกำหนดเอเจนต์แบบกำหนดเอง

### ข้อผิดพลาด "Session not alive"

**ปัญหา**: `acpManager.sendPrompt()` ส่งข้อผิดพลาด `Session ${sessionId} is not alive`

**วิธีแก้ไข**: เซสชันอาจสิ้นสุดหรือถูกยุติไปแล้ว ตรวจสอบสถานะเซสชัน:

```typescript
const session = acpManager.getSession(sessionId);
if (!session?.alive) {
  // เริ่มโปรเซสของเซสชันอีกครั้ง
  acpManager.spawn("claude", "claude", [], {});
}
```

### ข้อผิดพลาด "ACP timeout"

**ปัญหา**: `acpManager.sendPrompt()` ส่งข้อผิดพลาด `ACP timeout after 120000ms`

**วิธีแก้ไข**: เพิ่มระยะหมดเวลา:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 นาที
```

### ตรวจไม่พบ CLI

**ปัญหา**: `detectInstalledAgents()` ไม่พบ CLI ของคุณ

**วิธีแก้ไข**:

1. **ตรวจสอบ PATH**: ตรวจสอบให้แน่ใจว่า CLI อยู่ใน PATH ของระบบ
2. **ตรวจสอบคำสั่งเวอร์ชัน**: เรียกใช้ `claude --version` ด้วยตนเอง
3. **ตรวจสอบสิทธิ์**: ตรวจสอบให้แน่ใจว่า CLI สามารถเรียกใช้งานได้
4. **เอเจนต์แบบกำหนดเอง**: เพิ่มการกำหนดเอเจนต์แบบกำหนดเองสำหรับ CLI ที่ไม่ได้เป็นไปตามมาตรฐาน

### สิทธิ์ถูกปฏิเสธ

**ปัญหา**: ACP ไม่สามารถเรียกใช้ CLI ได้

**วิธีแก้ไข**:

1. **ตรวจสอบสิทธิ์ของไฟล์**: `chmod +x /usr/local/bin/claude`
2. **ตรวจสอบความเป็นเจ้าของ**: ตรวจสอบให้แน่ใจว่า OmniRoute มีสิทธิ์อ่าน/เรียกใช้
3. **ตรวจสอบ SELinux/AppArmor**: อาจบล็อกการเริ่มโปรเซส

---

## ตัวอย่าง

### ตัวอย่างที่ 1: เริ่มต้นและใช้งาน Claude Code

```typescript
import { acpManager, detectInstalledAgents } from "@/lib/acp";

// ตรวจหาเอเจนต์ที่ติดตั้งแล้ว
const agents = detectInstalledAgents();
const claude = agents.find((a) => a.id === "claude");

if (claude?.installed) {
  // เริ่มต้นเซสชันใหม่
  const session = acpManager.spawn("claude", claude.binary, ["--print", "--output-format", "json"]);

  // ส่งพรอมต์
  const response = await acpManager.sendPrompt(
    session.id,
    "Explain quantum computing in 100 words"
  );

  console.log("Claude's response:", response);

  // ล้างข้อมูล
  acpManager.kill(session.id);
}
```

### ตัวอย่างที่ 2: การค้นหาอัตโนมัติพร้อมตัวเลือกสำรอง

```typescript
import { acpManager, getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();

// ลองใช้ Claude ก่อน หากใช้ไม่ได้ให้ใช้ Codex เป็นตัวเลือกสำรอง
let agentId = "claude";
if (!available.find((a) => a.id === "claude")) {
  if (available.find((a) => a.id === "codex")) {
    agentId = "codex";
  } else {
    throw new Error("No ACP-compatible CLI agent found");
  }
}

const agent = available.find((a) => a.id === agentId)!;
const session = acpManager.spawn(agentId, agent.binary, agent.spawnArgs);

const response = await acpManager.sendPrompt(session.id, "Hello!");

acpManager.kill(session.id);
```

### ตัวอย่างที่ 3: เอเจนต์แบบกำหนดเอง

```typescript
import { setCustomAgents, detectInstalledAgents } from "@/lib/acp";

// ลงทะเบียนเอเจนต์ CLI แบบกำหนดเอง
setCustomAgents([
  {
    id: "my-llm-cli",
    name: "My LLM CLI",
    binary: "myllm",
    versionCommand: "myllm --version",
    providerAlias: "my-llm-provider",
    spawnArgs: ["--format", "json"],
    protocol: "stdio",
  },
]);

// ตอนนี้ detectInstalledAgents() จะรวม "my-llm-cli" ด้วย
const agents = detectInstalledAgents();
```

---

## ขั้นตอนถัดไปคืออะไร?

- **[เอกสารอ้างอิง API](../reference/API_REFERENCE.md)** — เอนด์พอยต์ REST API
- **[เอกสารอ้างอิงผู้ให้บริการ](../reference/PROVIDER_REFERENCE.md)** — ผู้ให้บริการทั้งหมด 352 ราย
- **[เซิร์ฟเวอร์ MCP](./MCP-SERVER.md)** — การผสานรวม Model Context Protocol
- **[เซิร์ฟเวอร์ A2A](./A2A-SERVER.md)** — โปรโตคอลระหว่างเอเจนต์
- **[Cloud Agent](./CLOUD_AGENT.md)** — เอเจนต์บนคลาวด์

---

## เอกสารอ้างอิง

- [โปรเจกต์ AionUi](https://github.com/iOfficeAI/AionUi) — แรงบันดาลใจสำหรับการตรวจหา ACP อัตโนมัติ
- [ซอร์สโค้ด ACP](../../src/lib/acp/) — รายละเอียดการนำไปใช้งาน
  - `manager.ts` — การจัดการวงจรชีวิตของโปรเซส
  - `registry.ts` — การค้นหาและลงทะเบียนเอเจนต์
  - `index.ts` — การส่งออก API สาธารณะ
