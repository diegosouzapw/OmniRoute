# CLI-TOOLS (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/CLI-TOOLS.md) · 🇸🇦 [ar](../../../ar/docs/reference/CLI-TOOLS.md) · 🇦🇿 [az](../../../az/docs/reference/CLI-TOOLS.md) · 🇧🇬 [bg](../../../bg/docs/reference/CLI-TOOLS.md) · 🇧🇩 [bn](../../../bn/docs/reference/CLI-TOOLS.md) · 🇨🇿 [cs](../../../cs/docs/reference/CLI-TOOLS.md) · 🇩🇰 [da](../../../da/docs/reference/CLI-TOOLS.md) · 🇩🇪 [de](../../../de/docs/reference/CLI-TOOLS.md) · 🇪🇸 [es](../../../es/docs/reference/CLI-TOOLS.md) · 🇮🇷 [fa](../../../fa/docs/reference/CLI-TOOLS.md) · 🇫🇮 [fi](../../../fi/docs/reference/CLI-TOOLS.md) · 🇫🇷 [fr](../../../fr/docs/reference/CLI-TOOLS.md) · 🇮🇳 [gu](../../../gu/docs/reference/CLI-TOOLS.md) · 🇮🇱 [he](../../../he/docs/reference/CLI-TOOLS.md) · 🇮🇳 [hi](../../../hi/docs/reference/CLI-TOOLS.md) · 🇭🇺 [hu](../../../hu/docs/reference/CLI-TOOLS.md) · 🇮🇩 [id](../../../id/docs/reference/CLI-TOOLS.md) · 🇮🇹 [it](../../../it/docs/reference/CLI-TOOLS.md) · 🇯🇵 [ja](../../../ja/docs/reference/CLI-TOOLS.md) · 🇰🇷 [ko](../../../ko/docs/reference/CLI-TOOLS.md) · 🇮🇳 [mr](../../../mr/docs/reference/CLI-TOOLS.md) · 🇲🇾 [ms](../../../ms/docs/reference/CLI-TOOLS.md) · 🇳🇱 [nl](../../../nl/docs/reference/CLI-TOOLS.md) · 🇳🇴 [no](../../../no/docs/reference/CLI-TOOLS.md) · 🇵🇭 [phi](../../../phi/docs/reference/CLI-TOOLS.md) · 🇵🇱 [pl](../../../pl/docs/reference/CLI-TOOLS.md) · 🇵🇹 [pt](../../../pt/docs/reference/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/CLI-TOOLS.md) · 🇷🇴 [ro](../../../ro/docs/reference/CLI-TOOLS.md) · 🇷🇺 [ru](../../../ru/docs/reference/CLI-TOOLS.md) · 🇸🇰 [sk](../../../sk/docs/reference/CLI-TOOLS.md) · 🇸🇪 [sv](../../../sv/docs/reference/CLI-TOOLS.md) · 🇰🇪 [sw](../../../sw/docs/reference/CLI-TOOLS.md) · 🇮🇳 [ta](../../../ta/docs/reference/CLI-TOOLS.md) · 🇮🇳 [te](../../../te/docs/reference/CLI-TOOLS.md) · 🇹🇷 [tr](../../../tr/docs/reference/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/CLI-TOOLS.md) · 🇵🇰 [ur](../../../ur/docs/reference/CLI-TOOLS.md) · 🇻🇳 [vi](../../../vi/docs/reference/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/CLI-TOOLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/CLI-TOOLS.md)

---

---

title: "CLI Tools — OmniRoute"
version: 3.8.50
lastUpdated: 2026-08-18
---

# CLI Tools — OmniRoute

อัปเดตล่าสุด: 2026-08-18

OmniRoute รวมเข้ากับเครื่องมือ CLI สามประเภทที่กระจายอยู่ในสามหน้าจอแดชบอร์ดที่กำหนดไว้:

| หน้า           | เส้นทาง                 | แนวคิด                                                                               | จำนวน       |
| -------------- | ----------------------- | ------------------------------------------------------------------------------------ | ----------- |
| **CLI Code's** | `/dashboard/cli-code`   | เครื่องมือการเขียนโค้ดที่คุณชี้ไปที่ OmniRoute (Client → CLI → OmniRoute → Provider) | 26          |
| **CLI Agents** | `/dashboard/cli-agents` | ตัวแทนอิสระที่คุณชี้ไปที่ OmniRoute (กระบวนการเดียวกัน, ขอบเขตกว้างขึ้น)             | 8           |
| **ACP Agents** | `/dashboard/acp-agents` | CLI ที่ OmniRoute สร้างขึ้นเป็นแบ็คเอนด์ผ่าน stdio/ACP (กระบวนการย้อนกลับ)           | ดูในทะเบียน |

เส้นทางเก่าจะเปลี่ยนเส้นทางผ่าน 308: `/dashboard/cli-tools` → `/dashboard/cli-code`, `/dashboard/agents` → `/dashboard/acp-agents`.

---

## วิธีการทำงาน

```
CLI Code's / CLI Agents (กระบวนการบริโภค):
Claude / Codex / OpenCode / Cline / KiloCode / Continue / Hermes Agent / Goose / ...
           │
           ▼  (ทั้งหมดชี้ไปที่ OmniRoute)
    http://YOUR_SERVER:20128/v1
           │
           ▼  (OmniRoute จะส่งไปยังผู้ให้บริการที่ถูกต้อง)
    Anthropic / OpenAI / Gemini / DeepSeek / Groq / Mistral / ...

ACP Agents (กระบวนการสร้างย้อนกลับ):
    Client request → OmniRoute → สร้าง CLI ผ่าน stdio/ACP → response
```

**ประโยชน์:**

- คีย์ API เดียวในการจัดการเครื่องมือทั้งหมด
- การติดตามค่าใช้จ่ายทั่วทั้ง CLI ทั้งหมดในแดชบอร์ด
- การเปลี่ยนโมเดลโดยไม่ต้องกำหนดค่าใหม่ทุกเครื่องมือ
- ทำงานได้ทั้งในเครื่องและบนเซิร์ฟเวอร์ระยะไกล (VPS, Docker, Akamai, Cloudflare Tunnel)

---

## การกำหนดค่าอัตโนมัติกับ `setup-*`

คุณไม่จำเป็นต้องเขียนการกำหนดค่าของแต่ละเครื่องมือด้วยมือ OmniRoute ส่งคำสั่ง `setup-*`
ต่อ CLI ที่รองรับซึ่งอ่านแคตตาล็อกโมเดล **สด** จาก OmniRoute ที่กำลังทำงาน (ในเครื่องหรือระยะไกล) และเขียนการกำหนดค่าของเครื่องมือเองลงในเครื่องของคุณ:

```bash
omniroute setup-codex        omniroute setup-claude       omniroute setup-opencode
omniroute setup-cline        omniroute setup-kilo         omniroute setup-continue
omniroute setup-cursor       omniroute setup-roo          omniroute setup-crush
omniroute setup-goose        omniroute setup-qwen         omniroute setup-aider
```

แต่ละคำสั่งรับ `--remote <url> --api-key <key>` (กำหนดค่าเครื่องมือในเครื่องกับ OmniRoute ระยะไกล), `--dry-run` (ดูตัวอย่างโดยไม่เขียน), และ `--port`. เครื่องมือที่ไม่มีการค้นหาโมเดลอัตโนมัติ (Cline, Kilo, Roo, Goose, Aider, Qwen) จะใช้
`--model <id>` (และ `--yes` สำหรับการรันแบบไม่โต้ตอบ). เพื่อเริ่ม CLI ด้วย env ที่ถูกต้องและไม่มีการเขียนการกำหนดค่าเลย ให้ใช้
ตัวเรียกทั่วไป `omniroute run <target>` (claude, codex, aider, goose, opencode, qwen,
gemini — เป้าหมายและนามแฝงมาจาก `bin/cli/cli-manifest.mjs`); ตัวเรียกเฉพาะต่อเครื่องมือเก่า `omniroute launch` (Claude Code) และ `omniroute launch-codex`
(Codex) ยังคงมีให้บริการ. Gemini CLI เป็นเพียงการเริ่มต้น: มันเป็นเป้าหมาย `omniroute run`
แต่ไม่มีสูตร `setup-*`/`configure`.

> **เอกสารอ้างอิงทั้งหมด:** ตารางหลัก — สิ่งที่แต่ละคำสั่งเขียน, ทุกธง,
> ในเครื่องกับระยะไกล, และเครื่องมือใดต้องการ `/v1` ซัฟฟิกซ์ — มีอยู่ใน
> **[CLI Integrations](../guides/CLI-INTEGRATIONS.md)**.

### การรันเหล่านี้ภายในคอนเทนเนอร์

คำสั่ง `setup-*` ที่ดำเนินการภายในคอนเทนเนอร์ OmniRoute จะเขียนลงใน
โฮมของคอนเทนเนอร์เอง ซึ่ง CLI ของโฮสต์ไม่สามารถอ่านได้และจะหายไปพร้อมกับ
คอนเทนเนอร์. OmniRoute ตรวจพบและออก `2` พร้อมคำแนะนำแทนที่จะเขียน. มีสองวิธีที่รองรับในการดำเนินการต่อ — ติดตั้ง CLI บนโฮสต์และ
`omniroute connect` ไปยังคอนเทนเนอร์ หรือทำการ bind-mount ไดเรกทอรีการกำหนดค่าและตั้งค่า
`CLI_CONFIG_HOME` (โปรไฟล์ `host` ของ compose). ทุกคำสั่ง `setup-*`, รวมถึง
`omniroute configure` และ `omniroute config set`, รับ
`--allow-container-write` เมื่อการกำหนดค่า CLI ของคอนเทนเนอร์เองคือสิ่งที่คุณ
หมายถึงจริงๆ; `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` ทำสิ่งเดียวกันสำหรับ
เซิร์ฟเวอร์. ดู
[Docker Guide → การกำหนดค่าเครื่องมือ CLI ของโฮสต์](../guides/DOCKER_GUIDE.md#configuring-host-cli-tools-when-omniroute-runs-in-docker).

**จุดสิ้นสุดการใช้** ของแดชบอร์ด (`POST /api/cli-tools/apply`) บังคับใช้
การป้องกันเดียวกัน: ในคอนเทนเนอร์ การเขียนที่เป้าหมายไม่ถูก bind-mounted จาก
โฮสต์จะตอบกลับ **`422`** พร้อม `containerEphemeralTarget: true`, ข้อความแสดงข้อผิดพลาดที่ปลอดภัยและ — สำหรับเครื่องมือที่มีสูตรโฮสต์ (claude, codex, opencode, cline,
kilo, continue) — คำสั่ง `hostSetupCommand` (เช่น `omniroute setup-opencode`) ที่จะรัน
บนโฮสต์แทน; ไม่มีอะไรถูกเขียน. `dryRun: true` ยังคงทำงานในโหมดคอนเทนเนอร์
และส่งคืนเนื้อหาที่สร้างขึ้น + เส้นทางเป้าหมายโดยไม่แตะต้องดิสก์ ดังนั้น
คุณสามารถดูตัวอย่างจากแดชบอร์ดและนำไปใช้บนโฮสต์. พฤติกรรมนี้เป็น
เจตนาและได้รับการป้องกันการถดถอยโดย
`tests/unit/api/cli-tools/apply-container-guard.test.ts` — อย่า "แก้ไข" 422
โดยการลบการป้องกัน.

## แหล่งข้อมูลที่เชื่อถือได้

แคตตาล็อกที่รวมอยู่จะอยู่ใน `src/shared/constants/cliTools.ts` ในรูปแบบ `CLI_TOOLS: Record<string, CliCatalogEntry>`.

แต่ละรายการมีฟิลด์เหล่านี้ (กำหนดใน `src/shared/schemas/cliCatalog.ts`):

| ฟิลด์                                           | ประเภท                                                       | คำอธิบาย                                                      |
| ----------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------- |
| `category`                                      | `"code" \| "agent"`                                          | หน้าไหนที่เครื่องมือปรากฏอยู่                                 |
| `vendor`                                        | `string`                                                     | แหล่งที่มาของเครื่องมือ ("Anthropic", "OSS (P. Gauthier)")    |
| `acpSpawnable`                                  | `boolean`                                                    | ใช้ได้เป็น ACP Agent ด้วย (แสดงป้าย)                          |
| `baseUrlSupport`                                | `"full" \| "partial" \| "none"`                              | ระดับการสนับสนุนจุดสิ้นสุดที่กำหนดเอง `"none"` = MITM backlog |
| `configType`                                    | `"env" \| "custom" \| "guide" \| "custom-builder" \| "mitm"` | กลไกการกำหนดค่า                                               |
| `id`, `name`, `color`, `description`, `docsUrl` | มาตรฐาน                                                      | ฟิลด์การแสดงผลหลัก                                            |

รายการที่มี `baseUrlSupport: "none"` จะ **ไม่แสดง** ในหน้าแดชบอร์ด — พวกเขาจะถูกลงทะเบียนใน MITM backlog สำหรับแผน 11 (ดู `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md`).

### ระดับความสามารถ (ที่จัดทำรายการ × ตรวจจับได้ × กำหนดค่าได้ × เรียกใช้ได้)

ไม่ใช่เครื่องมือที่จัดทำรายการทุกตัวจะสามารถตรวจจับได้ กำหนดค่าได้ หรือเรียกใช้ได้ แต่ละระดับมีแหล่งที่มาที่ประกาศ และการทดสอบการเบี่ยงเบนจะช่วยให้พวกเขาสอดคล้องกัน:

| ระดับ            | ความหมาย                                                           | ประกาศใน                                                          |
| ---------------- | ------------------------------------------------------------------ | ----------------------------------------------------------------- |
| **Cataloged**    | ปรากฏในแคตตาล็อกแดชบอร์ด (ชื่อ, ผู้ขาย, เอกสาร, ประเภทการกำหนดค่า) | `src/shared/constants/cliTools.ts` (`CLI_TOOLS`)                  |
| **Detectable**   | การตรวจจับไบนารี/การกำหนดค่า, การตรวจสอบสุขภาพ, เส้นทางการกำหนดค่า | `src/shared/services/cliRuntime.ts` (`CLI_TOOLS` runtime catalog) |
| **Configurable** | สนับสนุนโดย `omniroute configure <cli>` (มีสูตรการตั้งค่า)         | `bin/cli/cli-manifest.mjs` (`configure: true`)                    |
| **Launchable**   | สนับสนุนโดย `omniroute run <target>` (การฉีด env/args ที่กำหนด)    | `bin/cli/cli-manifest.mjs` (`run: true`)                          |

`bin/cli/cli-manifest.mjs` เป็นเอกสารที่สามารถเรียกใช้ได้ตามมาตรฐานสำหรับคำสั่ง CLI ที่ปรากฏ: `run`, `configure` และตัวสร้างการเติมเต็มเชลล์ทั้งหมดจะดึงรายการเป้าหมาย การแก้ไขชื่อเล่น (เช่น `kilocode`/`kilo-code`/`kilo_cli` → `kilo`) และการเชื่อมต่อธง `--model` จากมัน การป้องกันการเบี่ยงเบน `tests/unit/cli/cli-manifest-drift.test.ts` ยืนยันว่าเอกสาร, แคตตาล็อกการทำงาน, แคตตาล็อก UI และพื้นผิวผู้บริโภคทุกแห่งยังคงซิงค์กัน — เป้าหมายที่เพิ่มเข้ามาในพื้นผิวหนึ่งโดยไม่มีพื้นผิวอื่นจะทำให้การทดสอบล้มเหลวแทนที่จะเบี่ยงเบนอย่างเงียบ ๆ.

## 1. แคตตาล็อกโค้ด CLI (26 เครื่องมือ)

เครื่องมือทั้งหมดที่ปรากฏใน `/dashboard/cli-code` เครื่องมือที่มี `baseUrlSupport: none` จะเชื่อมต่อผ่าน MITM หรือคู่มือแบบแมนนวลแทนที่จะเป็น URL พื้นฐานที่กำหนดเอง:

| id           | name                    | vendor              | baseUrlSupport | configType     | acpSpawnable |
| ------------ | ----------------------- | ------------------- | -------------- | -------------- | ------------ |
| claude       | Claude Code             | Anthropic           | full           | env            | true         |
| codex        | OpenAI Codex CLI        | OpenAI              | full           | custom         | true         |
| zcode        | ZCode (GLM Coding Plan) | Z.ai                | none           | custom         | false        |
| cline        | Cline                   | OSS (ex-Claude Dev) | full           | custom         | true         |
| kilo         | Kilo Code               | Kilo-Org            | full           | custom         | false        |
| roo          | Roo Code                | Roo (OSS)           | full           | guide          | false        |
| continue     | Continue                | continue.dev        | full           | guide          | false        |
| aider        | Aider                   | OSS (P. Gauthier)   | full           | guide          | true         |
| forge        | ForgeCode               | Antinomy HQ         | full           | custom         | true         |
| jcode        | jcode                   | 1jehuang (OSS)      | full           | custom         | false        |
| deepseek-tui | DeepSeek TUI            | Hunter Bown (OSS)   | full           | custom         | false        |
| codewhale    | CodeWhale               | Hmbown (OSS)        | full           | custom         | false        |
| opencode     | OpenCode                | Anomaly (ex-SST)    | full           | guide          | true         |
| droid        | Factory Droid           | Factory AI          | partial        | guide          | false        |
| copilot      | GitHub Copilot CLI      | GitHub/MS           | full           | custom         | false        |
| cursor-cli   | Cursor CLI              | Anysphere           | partial        | guide          | true         |
| smelt        | Smelt                   | leonardcser (OSS)   | full           | custom         | false        |
| pi           | Pi (pi-coding-agent)    | M. Zechner (OSS)    | full           | custom         | false        |
| grok-build   | Grok Build              | xAI                 | full           | custom         | false        |
| crush        | Crush                   | OSS (Charm)         | full           | custom         | false        |
| qwen         | Qwen Code               | Alibaba             | full           | guide          | true         |
| cursor       | Cursor                  | Anysphere           | none           | guide          | false        |
| antigravity  | Antigravity             | Google              | none           | mitm           | false        |
| hermes       | Hermes                  | Nous Research       | none           | guide          | false        |
| kiro         | Kiro AI                 | Amazon              | none           | mitm           | false        |
| custom       | Custom CLI              | —                   | full           | custom-builder | false        |

เครื่องมือที่มี `baseUrlSupport: "partial"` จะแสดงป้าย "⚠ Base URL parcial" ในการ์ดแดชบอร์ด.
---

## 2. รายชื่อ CLI Agents (8 เครื่องมือ)

ตัวแทนอิสระที่ปรากฏใน `/dashboard/cli-agents`:

| id           | name             | vendor                   | baseUrlSupport | acpSpawnable |
| ------------ | ---------------- | ------------------------ | -------------- | ------------ |
| hermes-agent | Hermes Agent     | Nous Research            | full           | false        |
| openclaw     | OpenClaw         | OSS (P. Steinberger)     | full           | true         |
| goose        | Goose            | Block / Linux Foundation | full           | true         |
| interpreter  | Open Interpreter | OSS                      | full           | true         |
| warp         | Warp AI          | Warp Inc.                | partial        | true         |
| agent-deck   | Agent Deck       | asheshgoplani (OSS)      | full           | false        |
| omp          | Oh My Pi         | OSS                      | full           | true         |
| letta        | Letta CLI        | Letta                    | full           | false        |

---

## 3. ตัวแทน ACP (/dashboard/acp-agents)

หน้านี้ (เปลี่ยนชื่อจาก `/dashboard/agents`) แสดง CLI ที่ OmniRoute สามารถ **สร้าง** เป็นเครื่องมือการดำเนินการด้านหลังผ่านโปรโตคอล stdio/ACP รายชื่อจะถูกดูแลแยกต่างหากใน `src/lib/acp/registry.ts` และ **ไม่** เหมือนกับ `CLI_TOOLS`.

---

## 4. รายการรอ MITM (ไม่แสดงในแดชบอร์ด)

CLI ต่อไปนี้ไม่รองรับ URL พื้นฐานที่กำหนดเองโดยตรงและ **ไม่ได้ระบุ** ในหน้า CLI Code หรือหน้า CLI Agents พวกเขาเป็นผู้สมัครสำหรับการดักจับ MITM ในแผน 11:

| CLI                 | เหตุผล                                                     |
| ------------------- | ---------------------------------------------------------- |
| windsurf            | BYOK จำกัดเฉพาะโมเดล Claude ที่เลือก + URL/token ขององค์กร |
| amp                 | ระบบนิเวศปิด (Sourcegraph)                                 |
| amazon-q / kiro-cli | AWS SSO auth, ไม่มี URL ที่กำหนดเอง                        |
| cowork              | Anthropic Desktop, ไม่มีจุดสิ้นสุดที่กำหนดค่า              |

ดู `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md` สำหรับการอ้างอิงข้ามทั้งหมด.

---

## 5. API การตรวจจับแบบกลุ่ม

การตรวจจับเครื่องมือทั้งหมดถูกรวมเข้าผ่านจุดสิ้นสุดเดียว:

**`GET /api/cli-tools/all-statuses`**

- Auth: `requireCliToolsAuth(request)` (เหมือนกับเส้นทางอื่น ๆ ใน `/api/cli-tools/`)
- คืนค่า: `Record<toolId, ToolBatchStatus>` (ประเภท: `src/shared/types/cliBatchStatus.ts`)
- กลยุทธ์: `Promise.all` สำหรับเครื่องมือทั้งหมด, 5 วินาทีต่อเครื่องมือ
- Cache: ในหน่วยความจำ LRU ที่จัดทำดัชนีโดยไฟล์ config `mtime`. Cache จะถูกยกเลิกเมื่อ mtime เปลี่ยนแปลง. รีเซ็ตเมื่อเซิร์ฟเวอร์เริ่มต้นใหม่.

รูปแบบการตอบกลับต่อเครื่องมือ:

```ts
interface ToolBatchStatus {
  detection: {
    installed: boolean;
    runnable: boolean;
    version?: string;
    command?: string;
    commandPath?: string;
    reason?: string;
  };
  config: {
    status: "configured" | "not_configured" | "not_installed" | "unknown" | "other";
    endpoint?: string | null;
    lastConfiguredAt?: string | null;
  };
  error?: string; // ทำความสะอาดแล้ว, ไม่มี stack traces
}
```

## 6. ตัวจัดการการตั้งค่าสำหรับเครื่องมือใหม่

เครื่องมือใหม่ที่มี `configType: "custom"` มีเส้นทาง API การตั้งค่าที่กำหนดเฉพาะ:

| เส้นทาง                                     | เครื่องมือ                                                       |
| ------------------------------------------- | ---------------------------------------------------------------- |
| `POST /api/cli-tools/forge-settings`        | ForgeCode (.forge.toml)                                          |
| `POST /api/cli-tools/jcode-settings`        | jcode (--base-url flag)                                          |
| `POST /api/cli-tools/deepseek-tui-settings` | DeepSeek TUI (OPENAI_BASE_URL, legacy)                           |
| `POST /api/cli-tools/codewhale-settings`    | CodeWhale (OPENAI_BASE_URL, primary + legacy `~/.deepseek` sync) |
| `POST /api/cli-tools/smelt-settings`        | Smelt                                                            |
| `POST /api/cli-tools/pi-settings`           | Pi coding agent                                                  |
| `POST /api/cli-tools/grok-build-settings`   | Grok Build (~/.grok/config.toml, `[model.omniroute]`)            |
| `POST /api/cli-tools/qwen-settings`         | Qwen Code (`~/.qwen/settings.json` + dedicated `.env` key)       |

เส้นทางทั้งหมดใช้ `sanitizeErrorMessage()` สำหรับการตอบสนองข้อผิดพลาด (Hard Rule #12).

---

## 7. สถาปัตยกรรมหน้าแดชบอร์ด

### CLI Code's (`/dashboard/cli-code`)

- `src/app/(dashboard)/dashboard/cli-code/page.tsx` — ส่วนประกอบเซิร์ฟเวอร์
- `src/app/(dashboard)/dashboard/cli-code/CliCodePageClient.tsx` — กริดของไคลเอนต์
- `src/app/(dashboard)/dashboard/cli-code/[id]/page.tsx` — หน้าแสดงรายละเอียดเครื่องมือ
- `src/app/(dashboard)/dashboard/cli-code/components/` — การ์ดเครื่องมือเฉพาะ 12 ใบ + `ToolDetailClient.tsx`

### CLI Agents (`/dashboard/cli-agents`)

- `src/app/(dashboard)/dashboard/cli-agents/page.tsx` — ส่วนประกอบเซิร์ฟเวอร์
- `src/app/(dashboard)/dashboard/cli-agents/CliAgentsPageClient.tsx` — กริดของไคลเอนต์
- `src/app/(dashboard)/dashboard/cli-agents/[id]/page.tsx` — ใช้ซ้ำ `ToolDetailClient`

### ACP Agents (`/dashboard/acp-agents`)

- `src/app/(dashboard)/dashboard/acp-agents/page.tsx` — ส่วนประกอบเซิร์ฟเวอร์ (ย้ายมาจาก `agents/`)

### ส่วนประกอบ UI ที่แชร์ (`src/shared/components/cli/`)

| ไฟล์                    | วัตถุประสงค์                                              |
| ----------------------- | --------------------------------------------------------- |
| `CliToolCard.tsx`       | การ์ดสถานะอัจฉริยะ (การตรวจจับ + การตั้งค่า + จุดสิ้นสุด) |
| `CliConceptCard.tsx`    | การ์ดอธิบายแนวคิดต่อหน้า                                  |
| `CliComparisonCard.tsx` | การเปรียบเทียบสามคอลัมน์ระหว่างประเภท CLI                 |
| `BaseUrlSelect.tsx`     | เมนูดรอปดาวน์จุดสิ้นสุด (Local/Cloud/Custom)              |
| `ApiKeySelect.tsx`      | ตัวเลือกคีย์ API                                          |
| `ManualConfigModal.tsx` | โมดัลชิ้นส่วนการตั้งค่าที่สามารถคัดลอกได้                 |

### Hook ที่แชร์ (`src/shared/hooks/cli/`)

| ไฟล์                      | วัตถุประสงค์                                                      |
| ------------------------- | ----------------------------------------------------------------- |
| `useToolBatchStatuses.ts` | ดึงข้อมูล `/api/cli-tools/all-statuses` จัดการสถานะการโหลด/รีเฟรช |

## 8. i18n

เพิ่ม namespace ใหม่ในแผน 14 F9:

| Namespace   | วัตถุประสงค์                                                                     |
| ----------- | -------------------------------------------------------------------------------- |
| `cliCommon` | สตริงที่ใช้ร่วมกัน (ป้ายการ์ด, ข้อความแนวคิด/การเปรียบเทียบ, ป้ายหน้ารายละเอียด) |
| `cliCode`   | สตริงหน้าของ CLI Code                                                            |
| `cliAgents` | สตริงหน้าของ CLI Agents                                                          |
| `acpAgents` | สตริงหน้าของ ACP Agents                                                          |

การแปล PT-BR และ EN เต็มรูปแบบมีให้บริการแล้ว 39 ภาษาที่เหลือจะใช้ EN โดยอัตโนมัติผ่านการรวมระดับ namespace ใน `src/i18n/request.ts`.

---

## 9. Quick Start

### ขั้นตอนที่ 1 — รับ OmniRoute API Key

1. เปิด `/dashboard/api-manager` → **สร้าง API Key**
2. ตั้งชื่อให้มัน (เช่น `cli-tools`) และเลือกสิทธิ์ทั้งหมด
3. คัดลอกคีย์ — คุณจะต้องใช้มันสำหรับทุก CLI ด้านล่าง

> คีย์ของคุณมีลักษณะดังนี้: `sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`

---

### ขั้นตอนที่ 2 — ติดตั้ง CLI Tools

เครื่องมือทั้งหมดที่ใช้ npm ต้องการ Node.js 22.22.2+ หรือ 24.x:

```bash
# Claude Code (Anthropic)
npm install -g @anthropic-ai/claude-code

# OpenAI Codex
npm install -g @openai/codex

# OpenCode
npm install -g opencode-ai

# Cline
npm install -g cline

# KiloCode
npm install -g kilocode

# Qwen Code
npm install -g @qwen-code/qwen-code

# Google Gemini CLI (สามารถเรียกใช้ผ่าน `omniroute run gemini` → /v1beta surface)
npm install -g @google/gemini-cli

# Aider
pip install aider-chat

# Smelt
cargo install smelt  # ใช้ Rust

# Pi coding agent
# ดูที่ https://github.com/zechnerj/pi-coding-agent สำหรับการติดตั้ง

# jcode
# ดูที่ https://github.com/1jehuang/jcode สำหรับการติดตั้ง
```

---

### ขั้นตอนที่ 3 — กำหนดค่าผ่าน Dashboard

1. ไปที่ `http://localhost:20128/dashboard/cli-code`
2. ค้นหาเครื่องมือของคุณในกริด
3. คลิกการ์ดเพื่อเปิดหน้ารายละเอียดเครื่องมือ
4. เลือก API key และ base URL ของคุณ
5. คลิก **Apply Config** หรือคัดลอกส่วนการกำหนดค่าด้วยตนเอง

---

### ขั้นตอนที่ 4 — ตั้งค่าตัวแปรสภาพแวดล้อมทั่วโลก

```bash
# OmniRoute Universal Endpoint
export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128"
export ANTHROPIC_AUTH_TOKEN="sk-your-omniroute-key"
# Gemini CLI อ่าน GOOGLE_GEMINI_BASE_URL ที่ ROOT (SDK ของมันจะเพิ่ม /v1beta/... เอง)
export GOOGLE_GEMINI_BASE_URL="http://localhost:20128"
export GEMINI_API_KEY="sk-your-omniroute-key"
```

> สำหรับ **เซิร์ฟเวอร์ระยะไกล** ให้แทนที่ `localhost:20128` ด้วย IP หรือโดเมนของเซิร์ฟเวอร์,
> เช่น `http://<your-server-ip>:20128`.

---

### ขั้นตอนที่ 4 — กำหนดค่าแต่ละเครื่องมือ

#### Claude Code

```bash
# สร้าง ~/.claude/settings.json:
mkdir -p ~/.claude && cat > ~/.claude/settings.json << EOF
{
  "env": {
    "ANTHROPIC_BASE_URL": "http://localhost:20128",
    "ANTHROPIC_AUTH_TOKEN": "sk-your-omniroute-key"
  }
}
EOF
```

ใช้รากเกตเวย์ Anthropic ที่รวมสำหรับ Claude Code อย่าเพิ่ม `/v1` ที่นี่

**ทดสอบ:** `claude "say hello"`

---

#### OpenAI Codex

Modern Codex (v0.137+) อ่าน `~/.codex/config.toml` เท่านั้น — `config.yaml` เก่าจะเป็นของ npm CLI รุ่นเก่าและจะถูกละเลยโดยเงียบ คีย์ API จะอยู่ในตัวแปรสภาพแวดล้อม `OMNIROUTE_API_KEY` (`env_key`), ไม่เคยอยู่ในไฟล์:

```bash
mkdir -p ~/.codex && cat > ~/.codex/config.toml << EOF
model_provider = "omniroute"

[model_providers.omniroute]
name                 = "OmniRoute"
base_url             = "http://localhost:20128/v1"
env_key              = "OMNIROUTE_API_KEY"
requires_openai_auth = false
EOF
export OMNIROUTE_API_KEY="sk-your-omniroute-key"
```

เอกสารอ้างอิงเต็ม (โปรไฟล์, `wire_api`, หน้าต่างบริบท): [CODEX-CLI-CONFIGURATION.md](../guides/CODEX-CLI-CONFIGURATION.md).

**ทดสอบ:** `codex "what is 2+2?"`

---

#### OpenCode

```bash
mkdir -p ~/.config/opencode && cat > ~/.config/opencode/opencode.json << EOF
{
  "\$schema": "https://opencode.ai/config.json",
  "provider": {
    "omniroute": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OmniRoute",
      "options": {
        "baseURL": "http://localhost:20128/v1",
        "apiKey": "sk-your-omniroute-key"
      },
      "models": {
        "claude-sonnet-4-5": { "name": "claude-sonnet-4-5" },
        "claude-sonnet-4-5-thinking": { "name": "claude-sonnet-4-5-thinking" },
        "gemini-3-flash": { "name": "gemini-3-flash" }
      }
    }
  }
}
EOF
```

**ทดสอบ:** `opencode`

> ใช้ `opencode run "your prompt" --model omniroute/claude-sonnet-4-5-thinking --variant high`
> เพื่อส่งเวอร์ชันการคิด.

---

#### Cline (CLI หรือ VS Code)

**โหมด CLI:**

```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
  "apiProvider": "openai",
  "openAiBaseUrl": "http://localhost:20128/v1",
  "openAiApiKey": "sk-your-omniroute-key"
}
EOF
```

**โหมด VS Code:**
การตั้งค่าขยาย Cline → API Provider: `OpenAI Compatible` → Base URL: `http://localhost:20128/v1`

หรือใช้แดชบอร์ด OmniRoute → **CLI Tools → Cline → Apply Config**.

---

#### KiloCode (CLI หรือ VS Code)

**โหมด CLI:**

```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
```

**การตั้งค่า VS Code:**

```json
{
  "kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
  "kilo-code.apiKey": "sk-your-omniroute-key"
}
```

หรือใช้แดชบอร์ด OmniRoute → **CLI Tools → KiloCode → Apply Config**.

---

#### Continue (ส่วนขยาย VS Code)

แก้ไข `~/.continue/config.yaml`:

```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
```

รีสตาร์ท VS Code หลังจากแก้ไข.

---

#### VS Code Insiders (`chatLanguageModels.json`)

ใช้สิ่งนี้เมื่อ VS Code Insiders ถูกกำหนดค่าสำหรับโมเดลจุดสิ้นสุดที่กำหนดเองและคุณต้องการให้ OmniRoute ทำงานโดยไม่ต้องใช้ฟิลด์หัวข้อที่กำหนดเอง

**ตำแหน่งที่แนะนำ:**

- Linux: `~/.config/Code - Insiders/User/chatLanguageModels.json`
- Windows: `%APPDATA%/Code - Insiders/User/chatLanguageModels.json`

**ตัวอย่างการใช้ชื่อย่อ OmniRoute ที่ถูกจัด token:**

```json
[
  {
    "vendor": "customendpoint",
    "id": "auto",
    "name": "OmniRoute Auto",
    "family": "gpt-4",
    "version": "1.0.0",
    "url": "http://localhost:20128/api/v1/vscode/sk-your-omniroute-key/chat/completions",
    "modelsUrl": "http://localhost:20128/api/v1/vscode/sk-your-omniroute-key/models",
    "requestFormat": "openai-chat-completions",
    "contextWindow": 256000,
    "maxOutputTokens": 32768,
    "auth": {
      "type": "none"
    }
  }
]
```

**หมายเหตุ:**

- แทนที่ `sk-your-omniroute-key` ด้วย API key ที่สร้างใน OmniRoute.
- ฟิลด์ `url` ควรชี้ไปที่ `/api/v1/vscode/{token}/chat/completions`.
- ฟิลด์ `modelsUrl` ควรชี้ไปที่ `/api/v1/vscode/{token}/models`.
- ชอบการไหลปกติ `/v1` + Bearer header เมื่อไคลเอนต์สนับสนุนหัวข้อที่กำหนดเอง.
- โทเค็นที่ฝังใน URL เป็นการสำรองความเข้ากันได้และอาจปรากฏในบันทึกของโปรแกรมแก้ไขหรือประวัติพร็อกซี.

---

#### Kiro CLI (Amazon)

```bash
# เข้าสู่ระบบบัญชี AWS/Kiro ของคุณ:
kiro-cli login

# CLI ใช้การตรวจสอบสิทธิ์ของตัวเอง — OmniRoute ไม่จำเป็นต้องเป็นแบ็คเอนด์สำหรับ Kiro CLI เอง.
# ใช้ kiro-cli ร่วมกับ OmniRoute สำหรับเครื่องมืออื่น ๆ.
kiro-cli status
```

สำหรับแอปเดสก์ท็อป **Kiro IDE** ให้ใช้จุดสิ้นสุด MITM ที่เปิดเผยโดย OmniRoute
ภายใต้ `/dashboard/cli-tools → Kiro`.

---

## 10. Internal OmniRoute CLI

โปรแกรมไบนารี `omniroute` ให้คำสั่งสำหรับการจัดการวงจรชีวิตของเซิร์ฟเวอร์, การตั้งค่า, การวินิจฉัย, และการจัดการผู้ให้บริการ จุดเริ่มต้น: `bin/omniroute.mjs`.

```bash
omniroute                              # เริ่มเซิร์ฟเวอร์ (พอร์ตเริ่มต้น 20128)
omniroute setup                        # ตัวช่วยตั้งค่าแบบโต้ตอบ
omniroute doctor                       # ตรวจสอบการตั้งค่า, ฐานข้อมูล, พอร์ต, การทำงาน
omniroute providers list               # การเชื่อมต่อผู้ให้บริการที่ตั้งค่าไว้
omniroute providers test-all           # ทดสอบการเชื่อมต่อที่ใช้งานอยู่ทั้งหมด
omniroute reset-password               # รีเซ็ตรหัสผ่านผู้ดูแลระบบ
omniroute logs                         # สตรีมบันทึกคำขอ
omniroute health                       # สถานะสุขภาพโดยละเอียด (เบรกเกอร์, แคช, หน่วยความจำ)
omniroute --version                    # แสดงเวอร์ชัน
omniroute --help                       # แสดงคำสั่งทั้งหมด
```

### Setup & Initialization

```bash
omniroute setup                        # ตัวช่วยตั้งค่าแบบโต้ตอบ
omniroute setup --non-interactive      # โหมด CI/อัตโนมัติ (อ่านตัวแปรสภาพแวดล้อม + ธง)
omniroute setup --password '<value>'   # ตั้งค่ารหัสผ่านผู้ดูแลระบบโดยตรง
omniroute setup --add-provider \
  --provider openai \
  --api-key '<value>' \
  --test-provider                      # เพิ่มและทดสอบผู้ให้บริการในครั้งเดียว
```

ตัวแปรสภาพแวดล้อมที่รู้จักสำหรับการตั้งค่าแบบไม่โต้ตอบ:

| Var                 | Purpose                                                               |
| ------------------- | --------------------------------------------------------------------- |
| `OMNIROUTE_API_KEY` | รหัส API ของผู้ให้บริการ (ผูกกับ `--api-key` ผ่าน Commander `.env()`) |
| `DATA_DIR`          | เขียนทับไดเรกทอรีข้อมูลของ OmniRoute                                  |

ข้อมูลนำเข้าที่ไม่โต้ตอบอื่น ๆ จะถูกส่งเป็นธง ไม่ใช่ตัวแปรสภาพแวดล้อม:
`--password`, `--provider`, `--provider-name`, `--provider-base-url`, `--default-model`
(ดูตัวเลือก `omniroute setup` ข้างต้น).

### Diagnostics

```bash
omniroute doctor                       # ตรวจสอบการตั้งค่า, ฐานข้อมูล, พอร์ต, การทำงาน, หน่วยความจำ, การมีชีวิต
omniroute doctor --json                # JSON ที่อ่านได้โดยเครื่อง
omniroute doctor --no-liveness         # ข้ามการตรวจสอบสุขภาพ HTTP
omniroute doctor --host 0.0.0.0        # เขียนทับโฮสต์การมีชีวิต
omniroute doctor --liveness-url <url>  # เขียนทับ URL จุดสิ้นสุดสุขภาพทั้งหมด
```

โปรแกรม doctor จะทำการตรวจสอบเหล่านี้: `Config`, `Database`, `Storage/encryption`,
`Port availability`, `Node runtime`, `Native binary` (better-sqlite3),
`Memory`, และ `Server liveness`. มันจะออกจากโปรแกรมด้วยรหัสที่ไม่เป็นศูนย์หากการตรวจสอบใด ๆ ล้มเหลว.

### Provider Management

```bash
omniroute providers available                       # แคตตาล็อกผู้ให้บริการ OmniRoute
omniroute providers available --search openai       # กรองแคตตาล็อกตาม id/name/alias/category
omniroute providers available --category api-key    # กรองตามหมวดหมู่ (api-key, oauth, free, ...)
omniroute providers available --json                # JSON ที่อ่านได้โดยเครื่อง

omniroute providers list                            # การเชื่อมต่อผู้ให้บริการที่ตั้งค่าไว้
omniroute providers list --json

omniroute providers test <id|name>                  # ทดสอบการเชื่อมต่อที่ตั้งค่าไว้หนึ่งรายการ
omniroute providers test-all                        # ทดสอบการเชื่อมต่อที่ใช้งานอยู่ทั้งหมด
omniroute providers validate                        # การตรวจสอบโครงสร้างเฉพาะท้องถิ่น
omniroute providers add <provider> --credential-env PROVIDER_KEY
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth <provider>                 # กระบวนการ OAuth ที่มีอยู่
omniroute providers edit <id|name> --default-model <model>
omniroute providers remove <id|name> --yes
```

`providers add/import/auth/edit/remove` เป็น API-first และดังนั้นจึงทำงานกับ
บริบทท้องถิ่นหรือระยะไกลที่ใช้งานอยู่ การป้อนข้อมูลรับรองควรใช้
`--credential-stdin` หรือ `--credential-env`; `--dry-run --json` รายงานเฉพาะ
การมีอยู่/รูปร่างที่ถูกปกปิด `providers available` อ่านแคตตาล็อก OmniRoute;
`providers list/test/test-all/validate` ยังคงพฤติกรรม SQLite ท้องถิ่นของตนและ
ไม่ต้องการให้เซิร์ฟเวอร์ทำงาน.

### Recovery & Reset

```bash
omniroute reset-password                # รีเซ็ตรหัสผ่านผู้ดูแลระบบ (ยัง: omniroute-reset-password)
omniroute reset-encrypted-columns       # แสดงคำเตือน + การทดลองสำหรับการรีเซ็ตรหัสผ่านที่เข้ารหัส
omniroute reset-encrypted-columns --force  # ทำการล้างข้อมูลรับรองที่เข้ารหัสใน SQLite
```

### Credential Export (⚠ จัดการด้วยความระมัดระวัง)

```bash
omniroute auth export                                 # แสดงคำเตือน + ประตูยืนยัน — ไม่มีการเข้าถึงฐานข้อมูล
omniroute auth export --force                          # ส่งออกข้อมูลรับรองที่ถูกถอดรหัสของการเชื่อมต่อทั้งหมดไปยัง stdout เป็น JSON
omniroute auth export --force --id <id>                 # ส่งออกเฉพาะการเชื่อมต่อที่ตรงกัน
omniroute auth export --force --format env               # ส่งออกบรรทัด OMNIROUTE_<PROVIDER>_<FIELD>=<value>
omniroute auth export --force --out creds.json           # เขียนลงในไฟล์ (สร้างด้วยสิทธิ์ 0600)
```

`auth export` เป็น **เฉพาะท้องถิ่น** (อ่าน SQLite โดยตรง, ไม่มีเส้นทาง HTTP) และตั้งใจที่จะพิมพ์/เขียน
**ข้อความธรรมดา** `apiKey`/`accessToken`/`refreshToken`/`idToken` — นี่คือฟีเจอร์ ไม่ใช่
ข้อบกพร่อง ไม่มีอะไรถูกอ่านจากฐานข้อมูล และไม่มีอะไรถูกถอดรหัส โดยไม่มี `--force`. แบนเนอร์คำเตือน stderr
จะแสดงก่อนที่ข้อความธรรมดาจะถูกส่งออกเสมอ ต้องตั้งค่า `STORAGE_ENCRYPTION_KEY`
ฟิลด์ที่ไม่สามารถถอดรหัสได้ (กุญแจเก่า, ข้อความเข้ารหัสเสียหาย) จะถูกรายงานเป็น
`<field>DecryptFailed: true` แทนที่จะหยุดการส่งออกทั้งหมดหรือรั่วไหลข้อผิดพลาดพื้นฐาน.

### Other subcommands

คำสั่งเหล่านี้ถือว่ามีเซิร์ฟเวอร์ OmniRoute ที่กำลังทำงานอยู่ เว้นแต่จะระบุไว้เป็นอย่างอื่น:

```bash
omniroute status                       # สถานะการทำงานโดยละเอียด
omniroute logs                         # สตรีมบันทึกคำขอ (--json, --search, --follow)
omniroute config show                  # แสดงการตั้งค่าปัจจุบัน

omniroute provider list                # แสดงรายการผู้ให้บริการที่มีอยู่ (นามแฝงของ providers list)
omniroute provider add                 # ลงทะเบียน OmniRoute เป็นผู้ให้บริการในเครื่องมือ
omniroute keys add | list | remove     # จัดการ API keys
omniroute models [provider]            # แสดงรายการโมเดล (--json, --search)
omniroute combo list | switch | create | delete

omniroute backup                       # สแนปช็อตการตั้งค่า + ฐานข้อมูล
omniroute restore                      # กู้คืนจากสแนปช็อตก่อนหน้า

omniroute health                       # สถานะสุขภาพโดยละเอียด (เบรกเกอร์, แคช, หน่วยความจำ)
omniroute quota                        # การใช้งานโควตาของผู้ให้บริการ
omniroute cache                        # สถานะแคช
omniroute cache clear                  # ล้างแคชเชิงความหมาย + ลายเซ็น

omniroute mcp status | restart         # สถานะเซิร์ฟเวอร์ MCP / เริ่มใหม่
omniroute a2a status | card            # สถานะเซิร์ฟเวอร์ A2A / การ์ดตัวแทน

omniroute tunnel list | create | stop  # จัดการอุโมงค์ (cloudflare/tailscale/ngrok)
omniroute env show | get <k> | set <k> <v>  # ตรวจสอบ / ตั้งค่าตัวแปรสภาพแวดล้อม (ชั่วคราว)

omniroute test                         # ทดสอบการเชื่อมต่อของผู้ให้บริการ
omniroute update                       # ตรวจสอบการอัปเดต
omniroute completion                   # สร้างการเติมคำในเชลล์
```

### Common flags

| Flag                | Description                                                |
| ------------------- | ---------------------------------------------------------- |
| `--no-open`         | ไม่เปิดเบราว์เซอร์โดยอัตโนมัติเมื่อเริ่มต้น                |
| `--port <n>`        | เขียนทับพอร์ต API (เริ่มต้น 20128)                         |
| `--mcp`             | ทำงานเป็นเซิร์ฟเวอร์ MCP ผ่าน stdio (สำหรับ IDEs)          |
| `--non-interactive` | โหมด CI (ไม่มีการถาม; อ่านจาก env/flags)                   |
| `--json`            | ผลลัพธ์ JSON ที่อ่านได้โดยเครื่อง (doctor, providers, ฯลฯ) |
| `--help`, `-h`      | แสดงความช่วยเหลือเฉพาะคำสั่ง                               |
| `--version`, `-v`   | แสดงเวอร์ชันที่ติดตั้ง                                     |

---

## API จุดสิ้นสุดที่มีให้

| จุดสิ้นสุด                 | คำอธิบาย                         | ใช้สำหรับ                      |
| -------------------------- | -------------------------------- | ------------------------------ |
| `/v1/chat/completions`     | แชทมาตรฐาน (ผู้ให้บริการทั้งหมด) | เครื่องมือสมัยใหม่ทั้งหมด      |
| `/v1/responses`            | API การตอบสนอง (รูปแบบ OpenAI)   | Codex, การทำงานแบบตัวแทน       |
| `/v1/completions`          | การเติมข้อความแบบเก่า            | เครื่องมือเก่าที่ใช้ `prompt:` |
| `/v1/embeddings`           | การฝังข้อความ                    | RAG, การค้นหา                  |
| `/v1/images/generations`   | การสร้างภาพ                      | GPT-Image, Flux, ฯลฯ           |
| `/v1/audio/speech`         | ข้อความเป็นเสียง                 | ElevenLabs, OpenAI TTS         |
| `/v1/audio/transcriptions` | เสียงเป็นข้อความ                 | Deepgram, AssemblyAI           |

ตัวอย่างที่พร้อมวางพร้อม URL OmniRoute ที่มีการจัดการโทเค็น:

```txt
Token example: sk-a3ab3c080beaee3a-69f4a4-070d71af

ฐานข้อมูล OpenAI มาตรฐาน: http://localhost:20128/v1
โมเดล VS Code: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/models
แชท VS Code: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/chat/completions
การตอบสนอง VS Code: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/responses
แท็ก Ollama: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/tags
แชท Ollama: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/chat
```

---

## การแก้ไขปัญหา

| ข้อผิดพลาด                                   | สาเหตุ                            | วิธีแก้                                                    |
| -------------------------------------------- | --------------------------------- | ---------------------------------------------------------- |
| `Connection refused`                         | OmniRoute ไม่ทำงาน                | `omniroute serve`                                          |
| `401 Unauthorized`                           | API key ผิด                       | ตรวจสอบใน `/dashboard/api-manager`                         |
| `No combo configured`                        | ไม่มีการรวมการจัดเส้นทางที่ใช้งาน | ตั้งค่าใน `/dashboard/combos`                              |
| CLI แสดง "not installed"                     | ไบนารีไม่อยู่ใน PATH              | ตรวจสอบ `which <command>`                                  |
| Dashboard แสดง "not detected" หลังการติดตั้ง | แคชล้าสมัย                        | คลิก "⟳ Refresh detection" ในแดชบอร์ด                      |
| ลิงก์เก่า `/dashboard/cli-tools`             | บุ๊กมาร์กก่อนหน้า v3.8.6          | เปลี่ยนเส้นทางอัตโนมัติไปยัง `/dashboard/cli-code` (308)   |
| ลิงก์เก่า `/dashboard/agents`                | บุ๊กมาร์กก่อนหน้า v3.8.6          | เปลี่ยนเส้นทางอัตโนมัติไปยัง `/dashboard/acp-agents` (308) |
