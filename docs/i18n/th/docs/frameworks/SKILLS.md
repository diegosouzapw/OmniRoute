# Skills Framework (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/SKILLS.md) · 🇪🇹 [am](../../../am/docs/frameworks/SKILLS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/SKILLS.md) · 🇦🇿 [az](../../../az/docs/frameworks/SKILLS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/SKILLS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/SKILLS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/SKILLS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/SKILLS.md) · 🇩🇰 [da](../../../da/docs/frameworks/SKILLS.md) · 🇩🇪 [de](../../../de/docs/frameworks/SKILLS.md) · 🇬🇷 [el](../../../el/docs/frameworks/SKILLS.md) · 🇪🇸 [es](../../../es/docs/frameworks/SKILLS.md) · 🇪🇪 [et](../../../et/docs/frameworks/SKILLS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/SKILLS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/SKILLS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/SKILLS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/SKILLS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/SKILLS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/SKILLS.md) · 🇮🇱 [he](../../../he/docs/frameworks/SKILLS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/SKILLS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/SKILLS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/SKILLS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/SKILLS.md) · 🇮🇩 [id](../../../id/docs/frameworks/SKILLS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/SKILLS.md) · 🇮🇹 [it](../../../it/docs/frameworks/SKILLS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/SKILLS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/SKILLS.md) · 🇰🇭 [km](../../../km/docs/frameworks/SKILLS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/SKILLS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/SKILLS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/SKILLS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/SKILLS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/SKILLS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/SKILLS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/SKILLS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/SKILLS.md) · 🇲🇲 [my](../../../my/docs/frameworks/SKILLS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/SKILLS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/SKILLS.md) · 🇳🇴 [no](../../../no/docs/frameworks/SKILLS.md) · 🇮🇳 [or](../../../or/docs/frameworks/SKILLS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/SKILLS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/SKILLS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/SKILLS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/SKILLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/SKILLS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/SKILLS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/SKILLS.md) · 🇱🇰 [si](../../../si/docs/frameworks/SKILLS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/SKILLS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/SKILLS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/SKILLS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/SKILLS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/SKILLS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/SKILLS.md) · 🇮🇳 [te](../../../te/docs/frameworks/SKILLS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/SKILLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/SKILLS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/SKILLS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/SKILLS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/SKILLS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/SKILLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/SKILLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/SKILLS.md)

---

> **แหล่งข้อมูลอ้างอิงหลัก:** `src/lib/skills/` และ `src/app/api/skills/`
> **อัปเดตล่าสุด:** 2026-06-28 — v3.8.40

OmniRoute มีเฟรมเวิร์ก Skills ที่สามารถขยายได้ ซึ่งช่วยให้โมเดลภาษา (และผู้ปฏิบัติงาน) ประกอบความสามารถที่นำกลับมาใช้ซ้ำได้ ตั้งแต่การอ่านระบบไฟล์และการส่งคำขอ HTTP ไปจนถึงการรันโค้ดในแซนด์บ็อกซ์และสกิลที่ผ่านการคัดสรรจากมาร์เก็ตเพลส

สกิลคือหน่วยงานที่มีเวอร์ชันและกำหนดด้วยสคีมา OmniRoute สามารถแทรกสกิลเป็นคำจำกัดความของเครื่องมือลงในคำขอขาออก ดักจับการเรียกใช้เครื่องมือที่ส่งกลับมาจากโมเดล เรียกใช้แฮนด์เลอร์ที่ตรงกัน และป้อนผลลัพธ์กลับไปยังโมเดลเพื่อให้การสนทนาดำเนินต่อไปได้ โมเดลจะไม่เห็นรายละเอียดการทำงานภายใน แต่จะเห็นเฉพาะอินเทอร์เฟซของเครื่องมือเท่านั้น

---

## Agent Skills เทียบกับ Omni Skills

OmniRoute มีระบบสกิลสองระบบที่แยกจากกันแต่ทำงานเสริมกัน:

| มิติ                   | **Omni Skills** (เอกสารนี้)                                        | **Agent Skills**                                                                                     |
| :--------------------- | :----------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------- |
| วัตถุประสงค์           | การแทรกเครื่องมือให้ LLM + การดำเนินการในแซนด์บ็อกซ์               | แค็ตตาล็อก SKILL.md สำหรับให้เอเจนต์ภายนอกค้นหาและนำไปใช้                                            |
| แหล่งข้อมูลอ้างอิงหลัก | `src/lib/skills/` + มาร์เก็ตเพลส                                   | `src/lib/agentSkills/` + ไดเรกทอรี `skills/`                                                         |
| โหมดรันไทม์            | แทรกลงในคำขอขาออก และดำเนินการเมื่อเกิดเหตุการณ์เรียกใช้เครื่องมือ | แค็ตตาล็อก Markdown แบบคงที่ + เอนด์พอยต์การค้นหาผ่าน REST/MCP/A2A                                   |
| ผู้ใช้งาน              | ตัว OmniRoute เอง (การกำหนดเส้นทางแบบผสมและการเรียก LLM ขาเข้า)    | เอเจนต์ภายนอก ไคลเอนต์ MCP และตัวประสานงาน A2A                                                       |
| จำนวน                  | เปลี่ยนแปลงได้ (ขับเคลื่อนโดยมาร์เก็ตเพลส)                         | รายการในแค็ตตาล็อก 45 รายการ (23 API + 21 CLI + 1 การกำหนดค่า)                                       |
| รูปแบบ                 | `SkillDefinition` พร้อมสคีมาเครื่องมือ + แฮนด์เลอร์                | ส่วน frontmatter ของ `SKILL.md` + เนื้อหา Markdown                                                   |
| การค้นหา               | REST `/api/skills/*` + เครื่องมือ MCP `omniroute_skills_*`         | REST `/api/agent-skills/*` + เครื่องมือ MCP `omniroute_agent_skills_*` + `list-capabilities` ของ A2A |

**Omni Skills** คือกลไกการดำเนินการ ซึ่งกำหนดว่า OmniRoute _สามารถทำอะไรได้_ เมื่อ LLM เรียกใช้เครื่องมือ

**Agent Skills** คือแค็ตตาล็อกเอกสาร ซึ่งอธิบายให้เอเจนต์ภายนอกทราบว่า _จะใช้งาน_ REST API และ CLI ของ OmniRoute อย่างไร โดยใช้ไฟล์ SKILL.md ที่มีโครงสร้างและสามารถป้อนเข้าสู่พรอมต์ของเอเจนต์ได้โดยตรง

สำหรับแค็ตตาล็อก Agent Skills ตัวสร้าง เครื่องมือ MCP และสกิล A2A โปรดดู [docs/frameworks/AGENT-SKILLS.md](./AGENT-SKILLS.md)

---

## แนวคิด

### แหล่งที่มาของสกิล

สกิลจากสามแหล่งอยู่ร่วมกันในรีจิสทรีเดียวกัน:

1. **สกิลในตัว** (`src/lib/skills/builtins.ts`) — มาพร้อมกับ OmniRoute และครอบคลุมกรณีใช้งานทั่วไป:
   - `file_read`, `file_write` — พื้นที่ทำงานแซนด์บ็อกซ์แยกตามคีย์ API ภายใต้ `<DATA_DIR>/skills/workspaces/<hashed-key>/`
   - `http_request` — HTTP ขาออกผ่าน `safeOutboundFetch` โดยใช้ `guard: "public-only"`
   - `web_search` — ผู้ให้บริการค้นหาที่เปลี่ยนแทนกันได้พร้อมการแคช (`executeWebSearch`)
   - `eval_code` — การรัน `node` หรือ `python` ในแซนด์บ็อกซ์ Docker
   - `execute_command` — คำสั่งเชลล์ในแซนด์บ็อกซ์ Docker
   - `browser` — โครงพื้นฐานที่รองรับด้วย Playwright และปิดใช้งานโดยค่าเริ่มต้น (`builtin/browser.ts`)
2. **SkillsMP** (มาร์เก็ตเพลสของ OmniRoute) — ดึงข้อมูลจาก `https://skillsmp.com/api/v1/skills/search` ต้องมี `skillsmpApiKey` ในการตั้งค่า
3. **SkillsSH** (แค็ตตาล็อกชุมชน `skills.sh`) — ดึงข้อมูลจาก `https://skills.sh/api/search` ไม่ต้องมีการยืนยันตัวตน โดยเนื้อหา SKILL.md จะถูกดึงจากไฟล์ raw ของ GitHub

"ผู้ให้บริการที่ใช้งานอยู่" เพียงรายเดียวจะควบคุมว่าแดชบอร์ดติดตั้งสกิลจากแค็ตตาล็อกใด (`src/lib/skills/providerSettings.ts`) สามารถเปลี่ยนได้ที่ **การตั้งค่า → หน่วยความจำและสกิล** ค่าเริ่มต้น: `skillsmp`

### อัตลักษณ์ของสกิล

สกิลใช้ `name@version` เป็นคีย์ในรีจิสทรีในหน่วยความจำ (`src/lib/skills/registry.ts`) เวอร์ชันต้องเป็น semver (`^\d+\.\d+\.\d+$`) `resolveVersion()` รองรับข้อจำกัดแบบ `^`, `~`, `>`, `>=`, `<`, `<=`, `==` และการจับคู่แบบตรงกันทุกประการ

### โหมดสกิล

แต่ละสกิลมีโหมดรันไทม์ที่ควบคุมว่าจะถูกแทรกเมื่อใด:

| โหมด   | ลักษณะการทำงาน                                                                       |
| ------ | ------------------------------------------------------------------------------------ |
| `on`   | แทรกเป็นคำจำกัดความของเครื่องมือเสมอ                                                 |
| `off`  | ไม่แทรกและไม่สามารถดำเนินการได้                                                      |
| `auto` | ให้คะแนนเทียบกับคำขอขาเข้า และแทรกเฉพาะเมื่อคะแนน ≥ `AUTO_MIN_SCORE` (ค่าเริ่มต้น 3) |

`auto` เป็นค่าเริ่มต้นสำหรับสกิลที่ติดตั้งจากมาร์เก็ตเพลส การใช้ `enabled=true` ร่วมกับ `mode="off"` หมายถึง "ลงทะเบียนแล้วแต่ยังไม่ทำงาน" โดยการสลับค่า `enabled` ผ่านคอลัมน์แบบเดิมจะปรับ `mode` ตามไปด้วย เพื่อให้เส้นทางโค้ดรุ่นเก่ายังคงทำงานสอดคล้องกัน (`src/app/api/skills/[id]/route.ts`)

### สถานะ (การดำเนินการ)

การดำเนินการของสกิลถูกติดตามในตาราง `skill_executions` โดยมีสถานะต่อไปนี้ (`src/lib/skills/types.ts`):

```ts
enum SkillStatus {
  PENDING = "pending",
  RUNNING = "running",
  SUCCESS = "success",
  ERROR = "error",
  TIMEOUT = "timeout",
}
```

### แคชรีจิสทรี

`SkillRegistry` เป็นซิงเกิลตันที่มีแคช TTL 60 วินาที (`registry.ts:14`) `loadFromDatabase()` เป็นแบบ idempotent และขจัดการเรียกพร้อมกันที่ซ้ำกันผ่าน `pendingLoad` การเขียนใด ๆ (`register`/`unregister`/`unregisterById`) จะทำให้แคชใช้การไม่ได้ ค้นหาเวอร์ชันผ่าน `getSkillVersions(name)` และ `resolveVersion(name, constraint)`

### การแทรกที่รับรู้ผู้ให้บริการ

`injectSkills()` ใน `src/lib/skills/injection.ts` คือจุดเริ่มต้นที่แปลงสกิลซึ่งลงทะเบียนไว้ให้เป็นคำจำกัดความของเครื่องมือเฉพาะสำหรับผู้ให้บริการ:

- **OpenAI** — `{ type: "function", function: { name, description, parameters } }`
- **Anthropic** — `{ name, description, input_schema }`
- **Google (Gemini)** — `{ name, description, parameters }`

ชื่อเครื่องมือจะถูกเข้ารหัสเป็น `name@version` เพื่อให้ตัวจัดการสามารถเลือกเวอร์ชันที่ถูกต้องเมื่อโมเดลเรียกใช้กลับมา

### การให้คะแนน AUTO

เมื่อ `mode="auto"` แต่ละสกิลที่เป็นตัวเลือกจะได้รับการประเมินคะแนนเทียบกับบริบทของคำขอ (`scoreAutoSkill()` ใน `injection.ts`):

| สัญญาณ                                           | คะแนน        |
| ------------------------------------------------ | ------------ |
| ชื่อสกิลปรากฏตรงตามข้อความในบริบท                | +6           |
| โทเค็นแต่ละรายการของชื่อตรงกับโทเค็นในบริบท      | +2           |
| สตริงย่อยแต่ละรายการของแท็กตรงกับบริบท           | +3           |
| โทเค็นแต่ละรายการของคำอธิบายตรงกับบริบท          | +1           |
| เหตุผลเบื้องหลังตรงกับโทเค็นของชื่อ              | +2 ต่อโทเค็น |
| เหตุผลเบื้องหลังตรงกับแท็ก                       | +2 ต่อโทเค็น |
| คำใบ้ผู้ให้บริการในแท็กตรงกับผู้ให้บริการของคำขอ | +2 / −2      |

สกิล `AUTO_MAX_SKILLS = 5` อันดับแรกที่มี `score >= AUTO_MIN_SCORE = 3` จะถูกแทรกเข้ามา หากคะแนนเท่ากัน จะตัดสินด้วย `installCount` (เรียงจากมากไปน้อย) จากนั้นตามด้วยชื่อตามลำดับตัวอักษร (`injection.ts:225-235`)

### การดักจับการเรียกใช้เครื่องมือ

`handleToolCallExecution()` ใน `src/lib/skills/interception.ts` จะถูกเรียกใช้โดยตัวจัดการแชตหลังจากต้นทางส่งคืนการตอบกลับที่มีการเรียกใช้เครื่องมือ:

1. `extractToolCalls()` อ่านโครงสร้างเฉพาะของผู้ให้บริการ (OpenAI `tool_calls` / Responses `function_call`, Anthropic `tool_use`, Gemini `functionCalls`)
2. นามแฝงของเครื่องมือในตัว (เช่น `omniroute_web_search` → `web_search`) จะถูกแปลงก่อน ตัวจัดการในตัวจะทำงานภายในกระบวนการทันที
3. รายการอื่นทั้งหมดจะถูกส่งต่อผ่าน `skillExecutor.execute(name@version, args, { apiKeyId, sessionId })`
4. ผลลัพธ์จะถูกแทรกกลับเข้าไปในการตอบกลับในรูปแบบที่เหมาะสม ได้แก่ รายการ `tool_results`, รายการ `function_call_output` หรือบล็อก `tool_result` ของ Anthropic

สามารถตั้งค่า `customSkillExecutionEnabled` ในบริบทการดำเนินการเป็น `false` เพื่ออนุญาตเฉพาะการดักจับเครื่องมือในตัวเท่านั้น (ใช้โดยเส้นทางคำขอที่ปิดใช้งานตัวจัดการที่ผู้ใช้กำหนดไว้อย่างชัดเจน)

---

## แซนด์บ็อกซ์ Docker

เส้นทางโค้ดที่ไม่ใช่แบบบิวท์อิน (`eval_code`, `execute_command`) จะทำงานภายใน Docker ผ่าน `SandboxRunner` (`src/lib/skills/sandbox.ts`) ทุกคอนเทนเนอร์จะเริ่มทำงานด้วย:

```
--rm --network none|bridge --cap-drop ALL
--security-opt no-new-privileges --pids-limit 100
--cpus <cpuLimit/1000> --memory <memoryLimit>m
--tmpfs /tmp:rw,noexec,nosuid,size=64m
--tmpfs /workspace:rw,noexec,nosuid,size=64m
--read-only (เมื่อ readOnly=true)
```

ค่าเริ่มต้น (`SandboxRunner.DEFAULT_CONFIG`):

| ฟิลด์            | ค่าเริ่มต้น     | หมายเหตุ                                                        |
| ---------------- | --------------- | --------------------------------------------------------------- |
| `cpuLimit`       | 100 (= 0.1 CPU) | หารด้วย 1000 ก่อนส่งให้ `--cpus`                                |
| `memoryLimit`    | 256 MB          | ขีดจำกัดแบบตายตัว                                               |
| `timeout`        | 30000 ms        | ยุติแบบนุ่มนวลผ่าน `SIGTERM` + `docker kill`                    |
| `networkEnabled` | `false`         | เปลี่ยนเป็น `--network none`                                    |
| `readOnly`       | `true`          | FS รากเป็นแบบอ่านอย่างเดียว; `/tmp` และ `/workspace` เป็น tmpfs |

มีการเปิดเผย `SandboxRunner.kill(id)` และ `killAll()` สำหรับการปิดระบบ โดยคอนเทนเนอร์ที่กำลังทำงานจะถูกติดตามใน `runningContainers: Map<string, ChildProcess>`

### ตัวแปรสภาพแวดล้อมของแซนด์บ็อกซ์

กำหนดค่าผ่าน `process.env` ใน `src/lib/skills/builtins.ts`:

| ตัวแปรสภาพแวดล้อม                 | ค่าเริ่มต้น      | วัตถุประสงค์                                                                           |
| --------------------------------- | ---------------- | -------------------------------------------------------------------------------------- |
| `SKILLS_MAX_FILE_BYTES`           | `1048576` (1 MB) | ขีดจำกัดสำหรับ `file_read` และ `file_write`                                            |
| `SKILLS_MAX_HTTP_RESPONSE_BYTES`  | `256000`         | ขีดจำกัดสำหรับเนื้อหาการตอบกลับของ `http_request`                                      |
| `SKILLS_MAX_SANDBOX_OUTPUT_CHARS` | `100000`         | ขีดจำกัดสำหรับ stdout/stderr ที่ส่งกลับไปยังผู้เรียก                                   |
| `SKILLS_SANDBOX_TIMEOUT_MS`       | `10000`          | การหมดเวลาเริ่มต้นสำหรับคำสั่งในแซนด์บ็อกซ์; จำกัดสูงสุดที่ 60 s                       |
| `SKILLS_SANDBOX_NETWORK_ENABLED`  | `false`          | เกตหลักสำหรับทราฟฟิกขาออก ตั้งเป็น `1` หรือ `true` เพื่ออนุญาตให้เลือกใช้เป็นรายคำสั่ง |
| `SKILLS_ALLOWED_SANDBOX_IMAGES`   | (ดูด้านล่าง)     | รายการอิมเมจ Docker ที่อนุญาต โดยคั่นด้วยจุลภาค                                        |

อิมเมจที่อนุญาตโดยค่าเริ่มต้น: `alpine:3.20`, `node:22-alpine`, `python:3.12-alpine` รายการที่เพิ่มผ่าน `SKILLS_ALLOWED_SANDBOX_IMAGES` จะถูกรวมเข้ากับค่าเริ่มต้น ส่วนอิมเมจที่ไม่รู้จักจะถูกปฏิเสธโดย `normalizeImage()`

> หมายเหตุ: ไม่มีตัวแปรสภาพแวดล้อม `SKILLS_EXECUTION_TIMEOUT_MS` แยกต่างหาก การหมดเวลาของตัวจัดการที่ไม่ใช่แซนด์บ็อกซ์ถูกกำหนดตายตัวไว้ที่ 30 s ใน `SkillExecutor` (`executor.ts:13`) แต่สามารถเขียนทับขณะรันไทม์ได้ผ่าน `skillExecutor.setTimeout(ms)`

### การแยกพื้นที่ทำงาน

`file_read` และ `file_write` จะแปลงทุกเส้นทางโดยอ้างอิงกับพื้นที่ทำงานเฉพาะคีย์ API ที่ `<DATA_DIR>/skills/workspaces/<sha256(apiKeyId).slice(0,24)>/` การไล่ย้อนเส้นทาง (`..`) และเซกเมนต์ต้องห้าม (`.env`, `.git`, `.ssh`, `.omniroute`, `.codex`, `secrets`) จะถูกปฏิเสธก่อนการดำเนินการ I/O บนดิสก์ใดๆ

### การเสริมความแข็งแกร่งให้ HTTP

`http_request` (`builtins.ts:257`):

- รายการเมธอดที่อนุญาต: `GET, HEAD, POST, PUT, PATCH, DELETE`
- เฮดเดอร์ขาออกที่ถูกบล็อก: `host, connection, content-length, cookie, set-cookie, authorization, proxy-authorization`
- ปิดใช้งานการเปลี่ยนเส้นทาง (`allowRedirect: false`)
- กำหนดเส้นทางผ่าน `safeOutboundFetch` โดยใช้ `guard: "public-only"` (บล็อกช่วงแอดเดรสส่วนตัว/ลูปแบ็ก)
- การตอบกลับจะถูกตัดให้ไม่เกิน `SKILLS_MAX_HTTP_RESPONSE_BYTES`; ไคลเอนต์จะเห็น `truncated: true`

---

## ตัวดำเนินการแบบไฮบริด (ตัวอย่างทดลอง)

`src/lib/skills/hybrid.ts` กำหนด `HybridExecutor` ซึ่งตัดสินใจเลือกระหว่างการดำเนินการแบบ `direct` (ภายในโปรเซส) และ `sandbox` สำหรับแต่ละการเรียกใช้ พร้อมเส้นทางลองใหม่ด้วย `autoUpgrade` เมื่อเกิดข้อผิดพลาดจากการหมดเวลาหรือหน่วยความจำ การใช้งาน `directExecutor` / `sandboxRunner` ที่เชื่อมต่อไว้เป็นเพียงสตับ (`executeDirect`, `executeInSandbox` ส่งคืนออบเจ็กต์ตัวแทน) — ให้ถือว่าโมดูลนี้เป็นสัญญาที่ยังอยู่ระหว่างการพัฒนา การดำเนินการจริงยังคงผ่าน `skillExecutor` + `SandboxRunner`

---

## พื้นที่จัดเก็บข้อมูล

สคีมาอยู่ในการย้ายฐานข้อมูลสองรายการ:

- `src/lib/db/migrations/016_create_skills.sql` — ตารางพื้นฐาน `skills` และ `skill_executions` พร้อมดัชนีบน `(api_key_id, name)` และ `(skill_id, status, created_at)`
- `src/lib/db/migrations/027_skill_mode_and_metadata.sql` — เพิ่ม `mode`, `source_provider`, `tags` (JSON), `install_count` ให้กับ `skills`

`skill_executions.status` ถูกจำกัดในระดับฐานข้อมูล: `CHECK(status IN ('pending', 'running', 'success', 'error', 'timeout'))`

---

## REST API

เอนด์พอยต์ทั้งหมดอยู่ภายใต้ `src/app/api/skills/` เอนด์พอยต์สำหรับการจัดการ (`/api/skills`, `/api/skills/[id]`, `/api/skills/install`) ต้องใช้ **การยืนยันตัวตนสำหรับการจัดการ** ผ่าน `requireManagementAuth()` โฟลว์มาร์เก็ตเพลส/การติดตั้งใช้ `isAuthenticated()` ซึ่งมีข้อกำหนดเบากว่า (เซสชันหรือคีย์ API)

| เอนด์พอยต์ | เมธอด | วัตถุประสงค์ |
| --------------------------------- | ------ | ------------------------------------------------------------------------ | --- | ------------------------ | -------- | ------------------ |
| `/api/skills` | GET | แสดงรายการสกิลที่ลงทะเบียน รองรับ `?q=`, `?mode=on                        | off | auto`, `?source=skillsmp | skillssh | local`, การแบ่งหน้า |
| `/api/skills/[id]` | PUT | อัปเดต `enabled` หรือ `mode` |
| `/api/skills/[id]` | DELETE | ยกเลิกการลงทะเบียนตาม ID |
| `/api/skills/install` | POST | ติดตั้งสกิลแบบกำหนดเอง (โค้ดแฮนด์เลอร์ + สคีมา) |
| `/api/skills/marketplace` | GET | ค้นหาแค็ตตาล็อก SkillsMP (ส่งคืนรายการยอดนิยมเริ่มต้นเมื่อ `q` ว่างเปล่า) |
| `/api/skills/marketplace/install` | POST | ติดตั้งสกิล SkillsMP (กำหนดให้ผู้ให้บริการที่ใช้งานอยู่ = `skillsmp`) |
| `/api/skills/skillssh` | GET | ค้นหาแค็ตตาล็อก skills.sh (`?q=&limit=` โดยจำกัดสูงสุดที่ 100) |
| `/api/skills/skillssh/install` | POST | ติดตั้งสกิล skills.sh (กำหนดให้ผู้ให้บริการที่ใช้งานอยู่ = `skillssh`) |
| `/api/skills/executions` | GET | ประวัติการดำเนินการแบบแบ่งหน้า (`?apiKeyId=`) |
| `/api/skills/executions` | POST | ดำเนินการสกิลที่ลงทะเบียนแบบเฉพาะกิจ |

เอนด์พอยต์ `POST /api/skills/executions` ส่งคืน HTTP `503` พร้อม `{ error: "Skills execution is disabled..." }` เมื่อ `settings.skillsEnabled === false` (`executor.ts:42-45`) ผู้ดูแลระบบสามารถเปิดหรือปิดสวิตช์หลักได้จาก **การตั้งค่า → AI**

### ตัวอย่าง: ติดตั้งสกิลแบบกำหนดเอง

```bash
curl -X POST http://localhost:20128/api/skills/install \
  -H "Authorization: Bearer $OMNIROUTE_MGMT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "reverse-text",
    "version": "1.0.0",
    "description": "Reverses a string",
    "schema": {
      "input":  { "type": "object", "properties": { "text": { "type": "string" } }, "required": ["text"] },
      "output": { "type": "object", "properties": { "reversed": { "type": "string" } } }
    },
    "handlerCode": "echo-handler",
    "apiKeyId": "your-api-key-id"
  }'
```

สตริง `handlerCode` เป็น **ชื่อที่ใช้ค้นหาแฮนด์เลอร์** — ไม่ใช่โค้ดที่เรียกใช้งานได้ ตัวดำเนินการจะแมปสตริงนี้ผ่าน `skillExecutor.registerHandler(name, fn)` (`executor.ts:25`) การติดตั้งจากมาร์เก็ตเพลสจะจัดเก็บข้อความ SKILL.md ไว้ในฟิลด์นี้เป็นเอกสารประกอบ และกำหนดเส้นทางการดำเนินการผ่านการเรียกใช้เครื่องมือที่โมเดลสร้างขึ้น ซอร์สที่ผู้ใช้ระบุเองจะไม่ถูกนำไป eval

## เครื่องมือ MCP

เครื่องมือ MCP สี่รายการทำหน้าที่ครอบคลุมส่วนการทำงานของทักษะ (`open-sse/mcp-server/tools/skillTools.ts`) โดยจะได้รับการลงทะเบียนโดยอัตโนมัติเมื่อเซิร์ฟเวอร์ MCP เริ่มทำงาน

| เครื่องมือ                    | คำอธิบาย                                                         |
| ----------------------------- | ---------------------------------------------------------------- |
| `omniroute_skills_list`       | แสดงรายการทักษะ โดยมีตัวกรองเสริม: `apiKeyId`, `name`, `enabled` |
| `omniroute_skills_enable`     | เปิด/ปิดใช้งานทักษะด้วย `skillId`                                |
| `omniroute_skills_execute`    | เรียกใช้ทักษะด้วยเพย์โหลดอินพุต                                  |
| `omniroute_skills_executions` | ประวัติการเรียกใช้ล่าสุด (ค่าเริ่มต้น 50, สูงสุด 100)            |

ดูการตั้งค่าการรับส่งข้อมูลและการกำหนดขอบเขตได้ที่ [MCP-SERVER.md](./MCP-SERVER.md)

---

## การผสานรวม A2A

`src/lib/skills/a2a.ts` ส่งออกตัวอธิบายทักษะ A2A `memory_aware_routing` และตัวช่วย `registerA2ASkill(registry)` ทักษะ A2A แบบกำหนดเองจะอยู่ใน `src/lib/a2a/skills/` และถูกส่งต่อผ่าน `A2A_SKILL_HANDLERS` (`src/lib/a2a/taskExecution.ts`) ดูวงจรชีวิตงานฉบับสมบูรณ์ได้ที่ [A2A-SERVER.md](./A2A-SERVER.md)

---

## การเพิ่มทักษะในตัวใหม่

1. **กำหนดตัวจัดการ** ใน `src/lib/skills/builtins.ts` (หรือไฟล์ที่อยู่ในระดับเดียวกันภายใต้ `src/lib/skills/builtin/`) รูปแบบฟังก์ชัน: `(input, { apiKeyId, sessionId }) => Promise<output>`
2. **เส้นทางโค้ดที่ทำงานในแซนด์บ็อกซ์ใช่หรือไม่?** เรียก `sandboxRunner.run(image, command, env, sandboxConfig({...}))` ใช้ `normalizeImage()` เพื่อตรวจสอบกับรายการที่อนุญาต
3. **เส้นทางระบบไฟล์ใช่หรือไม่?** ส่งผ่าน `resolveWorkspacePath(input, context)` ก่อนเข้าถึงดิสก์เสมอ
4. **มีการเรียกเครือข่ายใช่หรือไม่?** ใช้ `safeOutboundFetch` พร้อม `guard: "public-only"` และทำความสะอาดส่วนหัวผ่าน `sanitizeHeaders()`
5. **ลงทะเบียน** โดยเพิ่มรายการลงใน `builtinSkills` (หรือเรียกใช้รูปแบบ `registerBrowserSkill(executor)` ขณะเริ่มต้นระบบ)
6. **เชื่อมโยงนามแฝงของเครื่องมือในตัว** (ไม่บังคับ) ใน `BUILTIN_TOOL_ALIASES` (`interception.ts:23`) หากโมเดลต้นทางส่งชื่อที่แตกต่างออกมา
7. **การทดสอบ** ใน `src/lib/skills/__tests__/` (Vitest)

---

## การเพิ่มทักษะแบบกำหนดเอง (ไม่ใช่ทักษะในตัว)

1. ลงทะเบียนตัวจัดการเมื่อเริ่มต้นโปรเซส:
   ```ts
   skillExecutor.registerHandler("my-handler", async (input, ctx) => { ... });
   ```
2. เพิ่มทักษะผ่าน `POST /api/skills/install` (ฟิลด์ `handlerCode` ต้องตรงกับชื่อตัวจัดการที่ลงทะเบียนไว้)
3. สลับ `mode` เป็น `on` หรือ `auto` ผ่าน `PUT /api/skills/[id]`

---

## เคล็ดลับการปฏิบัติงาน

- **สวิตช์หลัก:** `settings.skillsEnabled = false` จะบล็อกการเรียกใช้ทั้งหมดและส่งคืน HTTP `503` บน `/api/skills/executions` โดยรีจิสทรียังคงโหลดต่อไป
- **จำกัดการรับส่งข้อมูลขาออก:** ไม่ต้องกำหนด `SKILLS_SANDBOX_NETWORK_ENABLED` (ค่าเริ่มต้น) เพื่อให้แซนด์บ็อกซ์แยกขาดจากเครือข่ายโดยสมบูรณ์ การตั้งค่า `networkEnabled: true` ในแต่ละครั้งยังคงต้องได้รับอนุญาตจากเกตหลัก
- **อนุญาตอิมเมจเฉพาะ:** ตั้งค่า `SKILLS_ALLOWED_SANDBOX_IMAGES="myorg/sandbox:1.0,node:22-alpine"` เพื่อขยายรายการที่อนุญาต
- **ตรวจสอบการเรียกใช้:** ทั้ง `/dashboard/skills/executions` และ `omniroute_skills_executions` จะคิวรี `skill_executions` การทำงานที่สำเร็จจะมี `durationMs` ส่วนการทำงานที่ล้มเหลวจะมี `errorMessage`
- **การทำให้แคชใช้ไม่ได้:** เรียก `skillRegistry.invalidateCache()` หลังแก้ไขฐานข้อมูลด้วยตนเอง มิฉะนั้นให้รอ 60 วินาที
- **พื้นที่ทำงานแบบไม่ระบุตัวตน:** เมื่อ `apiKeyId` ว่างเปล่า การเรียกทั้งหมดจะถูกแฮชไปยังพื้นที่ทำงาน `"anonymous"` เดียวกัน — โค้ดที่คำนึงถึงการแชร์ควรส่งคีย์จริงเสมอ

---

## วงจรการทำงาน (v3.8.16+)

`SkillExecutor` (`src/lib/skills/executor.ts`) เป็น **ซิงเกิลตัน** ที่จัดการการเรียกใช้สกิลทุกครั้ง การทำความเข้าใจวงจรการทำงานของมันเป็นสิ่งสำคัญสำหรับการดีบักการหมดเวลา การลองใหม่ และสถานะการทำงาน

### วงจรการทำงาน 5 ขั้นตอน

```
   มีการเรียก execute()
        │
        ▼
  ┌─────────────┐
  │  PENDING    │  ← อยู่ในคิว ยังไม่เริ่มทำงาน (สร้างแถวใน DB แล้ว)
  └──────┬──────┘
         │ เริ่มแฮนด์เลอร์
         ▼
  ┌─────────────┐
  │  RUNNING    │  ← เรียกใช้แฮนด์เลอร์พร้อมกำหนดเวลาหมดเวลา
  └──────┬──────┘
         │
    ┌────┴────┬──────────┬──────────┐
    │         │          │          │
    ▼         ▼          ▼          ▼
  SUCCESS   ERROR     TIMEOUT   (ไม่มีเส้นทางอื่น — ถูกยุติโดยโปรเซสแม่)
    │         │          │
    └────┬────┴──────────┘
         │
         ▼
   อัปเดตแถวใน DB ด้วยสถานะ เอาต์พุต และ durationMs
```

### การกำหนดค่าเริ่มต้น

| การตั้งค่า   | ค่าเริ่มต้น         | กำหนดค่าได้ผ่าน                      |
| ------------ | ------------------- | ------------------------------------ |
| `timeout`    | `30000` (30 วินาที) | `skillExecutor.setTimeout(ms)`       |
| `maxRetries` | `3`                 | `skillExecutor.setMaxRetries(count)` |

> **สำคัญ**: ตัวดำเนินการเป็นซิงเกิลตัน — การเรียก `setTimeout()` จะส่งผลต่อการเรียกใช้ครั้งถัดไปทั้งหมดทั่วทั้งระบบ ขณะนี้ยังไม่รองรับการกำหนดเวลาหมดเวลาแยกตามสกิล หากคุณต้องการเวลาหมดเวลาที่แตกต่างกันสำหรับแต่ละสกิล ให้ส่งงานเป็นโปรเซสแยกกันหรือฟอร์กตัวดำเนินการ

### ค่าสถานะ

จาก `src/lib/skills/types.ts`:

```ts
enum SkillStatus {
  PENDING = "pending", // อยู่ในคิว ยังไม่เริ่มทำงาน
  RUNNING = "running", // เรียกใช้แฮนด์เลอร์แล้ว
  SUCCESS = "success", // แฮนด์เลอร์ส่งคืนเอาต์พุตที่ถูกต้อง
  ERROR = "error", // แฮนด์เลอร์โยนข้อยกเว้น
  TIMEOUT = "timeout", // เกินเวลาหมดเวลาของตัวดำเนินการ
}
```

> **หมายเหตุ**: สถานะ `TIMEOUT` ถูกกำหนดไว้ใน enum แต่การใช้งานตัวดำเนินการในปัจจุบัน **ไม่ได้เขียนสถานะนี้ลงใน DB จริง** — การหมดเวลาจะแสดงเป็น `ERROR` พร้อมข้อความ `"Skill execution timed out"` โดย enum สถานะนี้สงวนไว้สำหรับการใช้งานในอนาคต

### การตรวจสอบการทำงาน

```ts
import { skillExecutor } from "omniroute/skills/executor";

// ดึงข้อมูลการทำงานรายการหนึ่งตาม ID
const exec = skillExecutor.getExecution("exec-uuid-123");
if (exec) {
  console.log(`${exec.skillName}: ${exec.status} in ${exec.durationMs}ms`);
}

// แสดงรายการการทำงานล่าสุดสำหรับ API key
const recent = skillExecutor.listExecutions("api-key-id", 50, 0);
for (const e of recent) {
  console.log(`${e.skillName} → ${e.status} (${e.durationMs}ms)`);
}

// นับจำนวนการทำงานทั้งหมด
const total = skillExecutor.countExecutions("api-key-id");
```

### ลักษณะการลองใหม่

การตั้งค่า `maxRetries` จะถูกจัดเก็บไว้ แต่เมธอด `execute()` ของตัวดำเนินการ **ยังไม่ได้ใช้งานค่านี้ในปัจจุบัน** — เมธอดนี้จะพยายามทำงานเพียงครั้งเดียว ค่า `maxRetries` ถูกเปิดเผยไว้สำหรับการพัฒนาในอนาคตและสำหรับฮุกที่ต้องการอ่านค่านี้

ในขณะนี้ ต้องดำเนินการลองใหม่ภายในแฮนด์เลอร์ของสกิลเอง สกิลที่มาพร้อมกับระบบ
จะถูกลงทะเบียนกับตัวดำเนินการ (เช่น `registerBuiltinSkills(executor)`
/ `registerBrowserSkill(executor)` ใน `src/lib/skills/builtin/`) โดยแฮนด์เลอร์ใดก็ตาม
ที่คุณลงทะเบียนสามารถครอบลูปการลองใหม่ของตนเองได้:

```ts
// ภายในแฮนด์เลอร์ของสกิล
async function handler(input, ctx) {
  const maxRetries = 3;
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fetchSomething(input);
    } catch (err) {
      lastError = err as Error;
      if (attempt < maxRetries) {
        await new Promise((r) => setTimeout(r, 1000 * attempt));
      }
    }
  }
  throw lastError;
}
```

---

## รายละเอียดของ SkillMode

enum `SkillMode` (`src/lib/skills/types.ts`) ควบคุมว่า **สกิลจะถูกเรียกใช้เมื่อใดและอย่างไร**:

```ts
enum SkillMode {
  AUTO = "auto", // LLM ตัดสินใจว่าจะเรียกใช้สกิลเมื่อใด
  MANUAL = "manual", // เรียกใช้เฉพาะเมื่อผู้ใช้ร้องขออย่างชัดเจนเท่านั้น
  HYBRID = "hybrid", // การให้คะแนนแบบ AUTO พร้อมการแทนที่ด้วยตนเอง
}
```

> **หมายเหตุ**: โค้ดเบสกำหนด `SkillMode` (AUTO/MANUAL/HYBRID) ไว้ ขณะที่ฟิลด์ `Skill.mode` ใช้รูปแบบที่แตกต่างกัน (`"on" | "off" | "auto"`) ทั้งสองเกี่ยวข้องกันแต่ไม่เหมือนกัน — `SkillMode` ใช้สำหรับนโยบายของตัวดำเนินการ ส่วน `Skill.mode` ใช้สำหรับการเปิดใช้งานของแต่ละสกิล

### ควรใช้แต่ละโหมดเมื่อใด

| โหมด     | พฤติกรรมของ LLM                                                                       | กรณีการใช้งาน                                              |
| -------- | ------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `AUTO`   | LLM สามารถเรียกใช้สกิลได้เมื่อเห็นว่าจำเป็น                                           | สกิลอเนกประสงค์ (การอ่านไฟล์ คำขอ HTTP)                    |
| `MANUAL` | LLM ไม่สามารถเรียกใช้สกิลได้ โดยจะเรียกใช้ผ่าน API `executeSkill` อย่างชัดเจนเท่านั้น | การดำเนินการที่ละเอียดอ่อน (การเขียนฐานข้อมูล การชำระเงิน) |
| `HYBRID` | LLM สามารถแนะนำสกิลได้ แต่ผู้ใช้ต้องยืนยัน                                            | สกิลที่มีผลข้างเคียงแต่ไม่เป็นอันตราย                      |

### การให้คะแนน AUTO

เมื่อโหมด `AUTO` ทำงาน สกิลที่เป็นตัวเลือกแต่ละรายการจะได้รับการให้คะแนนเทียบกับบริบทของคำขอ
โดย `scoreAutoSkill()` ใน `src/lib/skills/injection.ts` — เป็นระบบคะแนนจำนวนเต็ม
แบบสะสม (การตรงกันของชื่อสกิล การทับซ้อนของโทเค็นชื่อ/แท็ก/คำอธิบาย
คำใบ้เหตุผลเบื้องหลัง โบนัส/ค่าปรับจากคำใบ้ของผู้ให้บริการ) สกิล
`AUTO_MAX_SKILLS = 5` อันดับแรกที่มี `score >= AUTO_MIN_SCORE = 3` จะถูกแทรกเป็น
เครื่องมือที่เรียกใช้ได้ โดยกรณีคะแนนเท่ากันจะตัดสินด้วย `installCount` แล้วตามด้วยชื่อ ดูตารางคะแนนฉบับเต็ม
ได้ใน [**การสร้างสคีมาของเครื่องมือ → การให้คะแนน AUTO**](#auto-scoring) ก่อนหน้านี้ใน
เอกสารนี้ ไม่มีเกณฑ์แบบเลขทศนิยม `0.6` และไม่มีการให้คะแนนใน `registry.ts`

---

## แค็ตตาล็อกสกิลในตัว

OmniRoute มาพร้อมกับชุดสกิลในตัวที่คัดสรรไว้ใน `src/lib/skills/builtin/` โดยสกิลที่พบบ่อยที่สุด ได้แก่:

### สกิลระบบอัตโนมัติสำหรับเบราว์เซอร์

สกิลเบราว์เซอร์ (`src/lib/skills/builtin/browser.ts`) รองรับระบบอัตโนมัติสำหรับเบราว์เซอร์แบบ headless ผ่าน Playwright/Puppeteer **สกิลนี้ได้รับการนำไปใช้แล้ว แต่ไม่ได้อยู่ในแค็ตตาล็อกสกิลเริ่มต้น** — หากต้องการใช้งาน ให้ติดตั้งปลั๊กอินส่วนขยายเบราว์เซอร์แยกต่างหาก

```ts
// เปิดใช้งานในการกำหนดค่าของคุณ
const config: SkillConfig = {
  enabled: true,
  mode: SkillMode.MANUAL, // กำหนดให้ต้องเรียกใช้อย่างชัดเจนเสมอ
  allowedSkills: ["browser"],
  timeout: 60000, // 60 วินาทีสำหรับการโหลดหน้า
  maxRetries: 1,
};
```

### หมวดหมู่สกิลในตัวอื่นๆ

| หมวดหมู่   | สกิล                                                  | โหมด   |
| ---------- | ----------------------------------------------------- | ------ |
| I/O ไฟล์   | `file_read`, `file_write`                             | AUTO   |
| HTTP       | `http_request`                                        | AUTO   |
| การค้นหา   | `web_search`                                          | AUTO   |
| การรันโค้ด | `eval_code` (JavaScript/Python ที่ทำงานในแซนด์บ็อกซ์) | HYBRID |
| ระบบ       | `execute_command` (การรัน CLI ในแซนด์บ็อกซ์)          | MANUAL |

### การเพิ่มสกิลแบบกำหนดเอง

ดูวิธีเพิ่มสกิลแบบกำหนดเองผ่านระบบปลั๊กอินได้ที่ [Plugin SDK และการผสานรวมสกิล](./PLUGIN_SDK.md)

---

## ดูเพิ่มเติม

- [MCP-SERVER.md](./MCP-SERVER.md) — การลงทะเบียนเครื่องมือ MCP และรูปแบบการรับส่งข้อมูล
- [A2A-SERVER.md](./A2A-SERVER.md) — วงจรชีวิตของงาน A2A และการส่งต่อไปยังสกิล
- [USER_GUIDE.md](../guides/USER_GUIDE.md#-skills-system) — บทนำสำหรับผู้ใช้
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — ไปป์ไลน์คำขอและแผนผังคอมโพเนนต์
- ซอร์ส: `src/lib/skills/`, `src/app/api/skills/`, `open-sse/mcp-server/tools/skillTools.ts`
- การทดสอบ: `src/lib/skills/__tests__/integration.test.ts`
