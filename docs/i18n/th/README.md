<div align="center">
  <img src="./docs/screenshots/MainOmniRoute.png" alt="OmniRoute Dashboard" width="800"/>
  
  # 🚀 OmniRoute — เกตเวย์ AI ฟรี

### อย่าหยุดเขียนโค้ด การกำหนดเส้นทางอัจฉริยะไปยัง **โมเดล AI ฟรีและราคาประหยัด** พร้อมทางเลือกสำรองอัตโนมัติ

_พร็อกซี API สากลของคุณ — จุดสิ้นสุดเดียว ผู้ให้บริการมากกว่า 36 ราย เวลาหยุดทำงานเป็นศูนย์_

**เสร็จสิ้นการแชท • การฝัง • การสร้างภาพ • เสียง • การจัดอันดับใหม่ • TypeScript 100%**

---

### 🆕 What's New in v2.7.0

- **Pluggable RouterStrategy** — rules, cost, and latency routing strategies
- **Multilingual intent detection** — routing scoring in 30+ languages
- **Request deduplication** — prevent duplicate API calls via content hash
- **New providers:** Grok-4 Fast (xAI), GLM-5 / Z.AI, MiniMax M2.5, Kimi K2.5
- **Updated pricing:** Grok-4 Fast $0.20/$0.50/M, GLM-5 $0.50/M, MiniMax M2.5 $0.30/M

---

### 🚀 New in v2.0.9+ — Playground, CLI Fingerprints & ACP

| Feature                                    | What It Does                                                                                                                                  |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| 🎮 **Model Playground**                    | Dashboard page to test any model directly — provider/model/endpoint selectors, Monaco Editor, streaming, abort, timing                        |
| 🔏 **CLI Fingerprint Matching**            | Per-provider header/body ordering to match native CLI signatures — toggle per provider in Settings > Security. **Your proxy IP is preserved** |
| 🤝 **ACP Support (Agent Client Protocol)** | CLI agent discovery (Codex, Claude, Goose, Gemini CLI, OpenClaw), process spawner, `/api/acp/agents` endpoint                                 |
| 🤖 **ACP Agents Dashboard**                | Debug > Agents page — grid of 14 agents with install status, version, custom agent form for any CLI tool                                      |
| 🔧 **Custom Model `apiFormat` Routing**    | Custom models with `apiFormat: "responses"` now correctly route to the Responses API translator                                               |
| 🏢 **Codex Workspace Isolation**           | Multiple Codex workspaces per email — OAuth correctly separates connections by workspace ID                                                   |
| 🔄 **Electron Auto-Update**                | Desktop app checks for updates + auto-install on restart                                                                                      |

### 🤖 ผู้ให้บริการ AI ฟรีสำหรับตัวแทนการเขียนโค้ดที่คุณชื่นชอบ

_เชื่อมต่อเครื่องมือ IDE หรือ CLI ที่ขับเคลื่อนด้วย AI ผ่าน OmniRoute — เกตเวย์ API ฟรีสำหรับการเข้ารหัสไม่จำกัด_

  <table>
    <tr>
      <td align="center" width="110">
        <a href="https://github.com/cline/cline">
          <img src="./public/providers/openclaw.png" alt="OpenClaw" width="48"/><br/>
          <b>OpenClaw</b>
        </a><br/>
        <sub>⭐ 205K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/HKUDS/nanobot">
          <img src="./public/providers/nanobot.png" alt="NanoBot" width="48"/><br/>
          <b>NanoBot</b>
        </a><br/>
        <sub>⭐ 20.9K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/sipeed/picoclaw">
          <img src="./public/providers/picoclaw.jpg" alt="PicoClaw" width="48"/><br/>
          <b>PicoClaw</b>
        </a><br/>
        <sub>⭐ 14.6K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/zeroclaw-labs/zeroclaw">
          <img src="./public/providers/zeroclaw.png" alt="ZeroClaw" width="48"/><br/>
          <b>ZeroClaw</b>
        </a><br/>
        <sub>⭐ 9.9K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/nearai/ironclaw">
          <img src="./public/providers/ironclaw.png" alt="IronClaw" width="48"/><br/>
          <b>IronClaw</b>
        </a><br/>
        <sub>⭐ 2.1K</sub>
      </td>
    </tr>
    <tr>
      <td align="center" width="110">
        <a href="https://github.com/anomalyco/opencode">
          <img src="./public/providers/opencode.svg" alt="OpenCode" width="48"/><br/>
          <b>OpenCode</b>
        </a><br/>
        <sub>⭐ 106K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/openai/codex">
          <img src="./public/providers/codex.png" alt="Codex CLI" width="48"/><br/>
          <b>Codex CLI</b>
        </a><br/>
        <sub>⭐ 60.8K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/anthropics/claude-code">
          <img src="./public/providers/claude.png" alt="Claude Code" width="48"/><br/>
          <b>Claude Code</b>
        </a><br/>
        <sub>⭐ 67.3K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/google-gemini/gemini-cli">
          <img src="./public/providers/gemini-cli.png" alt="Gemini CLI" width="48"/><br/>
          <b>Gemini CLI</b>
        </a><br/>
        <sub>⭐ 94.7K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/Kilo-Org/kilocode">
          <img src="./public/providers/kilocode.png" alt="Kilo Code" width="48"/><br/>
          <b>Kilo Code</b>
        </a><br/>
        <sub>⭐ 15.5K</sub>
      </td>
    </tr>
  </table>

<sub>📡 ตัวแทนทั้งหมดเชื่อมต่อผ่าน <code>http://localhost:20128/v1</code> หรือ <code>http://cloud.omniroute.online/v1</code> — การกำหนดค่าเดียว โมเดลไม่จำกัด และ โควต้า</sub>

---

[![npm version](https://img.shields.io/npm/v/omniroute?color=cb3837&logo=npm)](https://www.npmjs.com/package/omniroute)
[![Docker Hub](https://img.shields.io/docker/v/diegosouzapw/omniroute?label=Docker%20Hub&logo=docker&color=2496ED)](https://hub.docker.com/r/diegosouzapw/omniroute)
[![License](https://img.shields.io/github/license/diegosouzapw/OmniRoute)](https://github.com/diegosouzapw/OmniRoute/blob/main/LICENSE)
[![Website](https://img.shields.io/badge/Website-omniroute.online-blue?logo=google-chrome&logoColor=white)](https://omniroute.online)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Community-25D366?logo=whatsapp&logoColor=white)](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)

[🌐 Website](https://omniroute.online) • [🚀 Quick Start](#-quick-start) • [💡 Features](#-key-features) • [📖 Docs](#-documentation) • [💰 Pricing](#-pricing-at-a-glance) • [💬 WhatsApp](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)

🌐 **Available in:** 🇺🇸 [English](../../README.md) | 🇧🇷 [Português (Brasil)](../pt-BR/README.md) | 🇪🇸 [Español](../es/README.md) | 🇫🇷 [Français](../fr/README.md) | 🇮🇹 [Italiano](../it/README.md) | 🇷🇺 [Русский](../ru/README.md) | 🇨🇳 [中文 (简体)](../zh-CN/README.md) | 🇩🇪 [Deutsch](../de/README.md) | 🇮🇳 [हिन्दी](../in/README.md) | 🇹🇭 [ไทย](../th/README.md) | 🇺🇦 [Українська](../uk-UA/README.md) | 🇸🇦 [العربية](../ar/README.md) | 🇯🇵 [日本語](../ja/README.md) | 🇻🇳 [Tiếng Việt](../vi/README.md) | 🇧🇬 [Български](../bg/README.md) | 🇩🇰 [Dansk](../da/README.md) | 🇫🇮 [Suomi](../fi/README.md) | 🇮🇱 [עברית](../he/README.md) | 🇭🇺 [Magyar](../hu/README.md) | 🇮🇩 [Bahasa Indonesia](../id/README.md) | 🇰🇷 [한국어](../ko/README.md) | 🇲🇾 [Bahasa Melayu](../ms/README.md) | 🇳🇱 [Nederlands](../nl/README.md) | 🇳🇴 [Norsk](../no/README.md) | 🇵🇹 [Português (Portugal)](../pt/README.md) | 🇷🇴 [Română](../ro/README.md) | 🇵🇱 [Polski](../pl/README.md) | 🇸🇰 [Slovenčina](../sk/README.md) | 🇸🇪 [Svenska](../sv/README.md) | 🇵🇭 [Filipino](../phi/README.md)

</div>

---

## 🖼️

<div align="center">
  <img src="./docs/screenshots/MainOmniRoute.png" alt="OmniRoute" width="800"/>
</div>

---

## 📸

<details>
<summary><b>...</b></summary>

| #     | #                                        |
| ----- | ---------------------------------------- |
| **1** | ![1](docs/screenshots/01-providers.png)  |
| **2** | ![2](docs/screenshots/02-combos.png)     |
| **3** | ![3](docs/screenshots/03-analytics.png)  |
| **4** | ![4](docs/screenshots/04-health.png)     |
| **5** | ![5](docs/screenshots/05-translator.png) |
| **6** | ![6](docs/screenshots/06-settings.png)   |
| **7** | ![7](docs/screenshots/07-cli-tools.png)  |
| **8** | ![8](docs/screenshots/08-usage.png)      |
| **9** | ![9](docs/screenshots/09-endpoint.png)   |

</details>

---

## 🤔 ทำไมต้อง OmniRoute?

**หยุดเสียเงินและจำกัดขีดจำกัด:**

- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> โควต้าการสมัครจะหมดอายุโดยไม่ได้ใช้ทุกเดือน
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> การจำกัดอัตราจะทำให้คุณไม่สามารถเขียนโค้ดกลางคันได้
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> API ราคาแพง ($20-50/เดือนต่อผู้ให้บริการ)
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> การสลับระหว่างผู้ให้บริการด้วยตนเอง

**OmniRoute แก้ปัญหานี้:**

- ✅ **เพิ่มการสมัครรับข้อมูลสูงสุด** - ติดตามโควต้า ใช้ทุกบิตก่อนรีเซ็ต
- ✅ **ทางเลือกสำรองอัตโนมัติ** - การสมัครสมาชิก → คีย์ API → ราคาถูก → ฟรี ไม่มีการหยุดทำงาน
- ✅ **หลายบัญชี** - หมุนเวียนระหว่างบัญชีต่อผู้ให้บริการ
- ✅ **สากล** - ใช้งานได้กับ Claude Code, Codex, Gemini CLI, Cursor, Cline, OpenClaw และเครื่องมือ CLI ใดๆ

---

## 📧 สนับสนุน

> 💌 **เข้าร่วมชุมชนของเรา!** [WhatsApp Group](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t) — รับความช่วยเหลือ แบ่งปันเคล็ดลับ และติดตามข่าวสารล่าสุด

- **เว็บไซต์**: [omniroute.online](https://omniroute.online)
- **GitHub**: [github.com/diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute)
- **ปัญหา**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **WhatsApp**: [Community Group](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)
- **โปรเจ็กต์ดั้งเดิม**: [9router by decolua](https://github.com/decolua/9router)

---

## 🔄 มันทำงานอย่างไร

```
┌─────────────┐
│  Your CLI   │  (Claude Code, Codex, Gemini CLI, OpenClaw, Cursor, Cline...)
│   Tool      │
└──────┬──────┘
       │ http://localhost:20128/v1
       ↓
┌─────────────────────────────────────────┐
│           OmniRoute (Smart Router)        │
│  • Format translation (OpenAI ↔ Claude) │
│  • Quota tracking + Embeddings + Images │
│  • Auto token refresh                   │
└──────┬──────────────────────────────────┘
       │
       ├─→ [Tier 1: SUBSCRIPTION] Claude Code, Codex, Gemini CLI
       │   ↓ quota exhausted
       ├─→ [Tier 2: API KEY] DeepSeek, Groq, xAI, Mistral, NVIDIA NIM, etc.
       │   ↓ budget limit
       ├─→ [Tier 3: CHEAP] GLM ($0.6/1M), MiniMax ($0.2/1M)
       │   ↓ budget limit
       └─→ [Tier 4: FREE] iFlow, Qwen, Kiro (unlimited)

Result: Never stop coding, minimal cost
```

---

## 🎯 สิ่งที่ OmniRoute แก้ปัญหาได้ — 30 คะแนนปัญหาและกรณีการใช้งานจริง

> **นักพัฒนาทุกคนที่ใช้เครื่องมือ AI ต้องเผชิญกับปัญหาเหล่านี้ทุกวัน** OmniRoute ถูกสร้างขึ้นเพื่อแก้ไขปัญหาทั้งหมด ตั้งแต่ค่าใช้จ่ายที่มากเกินไปไปจนถึงการบล็อกระดับภูมิภาค จากโฟลว์ OAuth ที่เสียหาย ไปจนถึงการทำงานของโปรโตคอลและความสามารถในการสังเกตระดับองค์กร

<details>
<summary><b>💸 1. "ฉันจ่ายค่าสมัครสมาชิกราคาแพงแต่ยังคงถูกขัดจังหวะด้วยขีดจำกัด"</b></summary>

นักพัฒนาจ่ายเงิน $20–200/เดือนสำหรับ Claude Pro, Codex Pro หรือ GitHub Copilot แม้จะจ่ายเงิน โควต้าก็มีเพดาน — การใช้งาน 5 ชม. ขีดจำกัดรายสัปดาห์ หรือขีดจำกัดอัตราต่อนาที เซสชันการเข้ารหัสกลาง ผู้ให้บริการหยุดการตอบสนอง และนักพัฒนาสูญเสียความลื่นไหลและประสิทธิภาพการทำงาน

**OmniRoute แก้ปัญหาอย่างไร:**

- **ทางเลือกสำรองอัจฉริยะ 4 ระดับ** — หากโควต้าการสมัครสมาชิกหมด จะเปลี่ยนเส้นทางไปยังคีย์ API → ราคาถูก → ฟรีโดยไม่มีการแทรกแซงด้วยตนเอง
- **การติดตามโควต้าแบบเรียลไทม์** — แสดงการใช้โทเค็นแบบเรียลไทม์พร้อมการนับถอยหลังการรีเซ็ต (5 ชม. รายวัน รายสัปดาห์)
- **การสนับสนุนหลายบัญชี** — หลายบัญชีต่อผู้ให้บริการพร้อมการหมุนเวียนอัตโนมัติ — เมื่อบัญชีหนึ่งหมด ให้สลับไปยังบัญชีถัดไป
- **คอมโบแบบกำหนดเอง** — ห่วงโซ่ทางเลือกที่ปรับแต่งได้พร้อมกลยุทธ์การปรับสมดุล 6 แบบ (เติมก่อน, ปัดเศษ, P2C, สุ่ม, ใช้น้อยที่สุด, ปรับต้นทุนให้เหมาะสม)
- **โควต้าธุรกิจ Codex** — การตรวจสอบโควต้าพื้นที่ทำงานของธุรกิจ/ทีมโดยตรงในแดชบอร์ด

</details>

<details>
<summary><b>🔌 2. "ฉันจำเป็นต้องใช้ผู้ให้บริการหลายราย แต่แต่ละรายมี API ที่แตกต่างกัน"</b></summary>

OpenAI ใช้รูปแบบหนึ่ง Claude (Anthropic) ใช้อีกรูปแบบหนึ่ง Gemini ยังใช้อีกรูปแบบหนึ่ง หากผู้พัฒนาต้องการทดสอบโมเดลจากผู้ให้บริการหลายรายหรือทางเลือกระหว่างผู้ให้บริการ พวกเขาจำเป็นต้องกำหนดค่า SDK ใหม่ เปลี่ยนตำแหน่งข้อมูล และจัดการกับรูปแบบที่เข้ากันไม่ได้ ผู้ให้บริการแบบกำหนดเอง (FriendLI, NIM) มีจุดสิ้นสุดโมเดลที่ไม่ได้มาตรฐาน

**OmniRoute แก้ปัญหาอย่างไร:**

- **Unified Endpoint** — `http://localhost:20128/v1` เดียวทำหน้าที่เป็นพร็อกซีสำหรับผู้ให้บริการมากกว่า 36 ราย
- **การแปลรูปแบบ** — อัตโนมัติและโปร่งใส: OpenAI ↔ Claude ↔ Gemini ↔ Responses API
- **การฆ่าเชื้อการตอบสนอง** — ตัดช่องที่ไม่ได้มาตรฐาน (`x_groq`, `usage_breakdown`, `service_tier`) ที่ทำลาย OpenAI SDK v1.83+
- **การปรับบทบาทให้เป็นมาตรฐาน** — แปลง `developer` → `system` สำหรับผู้ให้บริการที่ไม่ใช่ OpenAI `system` → `user` สำหรับ GLM/ERNIE
- **คิดการแยกแท็ก** — แยกบล็อก `<think>` จากรุ่นอย่าง DeepSeek R1 ให้เป็น `reasoning_content` ที่ได้มาตรฐาน
- **เอาต์พุตที่มีโครงสร้างสำหรับราศีเมถุน** — `json_schema` → `responseMimeType`/`responseSchema` การแปลงอัตโนมัติ
- **`stream` มีค่าเริ่มต้นเป็น `false`** — สอดคล้องกับข้อกำหนด OpenAI หลีกเลี่ยง SSE ที่ไม่คาดคิดใน Python/Rust/Go SDK

</details>

<details>
<summary><b>🌐 3. "ผู้ให้บริการ AI ของฉันบล็อกภูมิภาค/ประเทศของฉัน"</b></summary>

ผู้ให้บริการเช่น OpenAI/Codex บล็อกการเข้าถึงจากภูมิภาคทางภูมิศาสตร์บางแห่ง ผู้ใช้ได้รับข้อผิดพลาดเช่น `unsupported_country_region_territory` ในระหว่างการเชื่อมต่อ OAuth และ API สิ่งนี้น่าหงุดหงิดเป็นพิเศษสำหรับนักพัฒนาจากประเทศกำลังพัฒนา

**OmniRoute แก้ปัญหาอย่างไร:**

- **การกำหนดค่าพร็อกซี 3 ระดับ** — พร็อกซีที่กำหนดค่าได้ 3 ระดับ: ทั่วโลก (การรับส่งข้อมูลทั้งหมด) ต่อผู้ให้บริการ (ผู้ให้บริการรายเดียวเท่านั้น) และต่อการเชื่อมต่อ/คีย์
- **ป้ายพร็อกซีที่ใช้รหัสสี** — ตัวบ่งชี้ภาพ: 🟢 พร็อกซีส่วนกลาง, 🟡 พร็อกซีผู้ให้บริการ, 🔵 พร็อกซีการเชื่อมต่อ แสดง IP เสมอ
- **การแลกเปลี่ยนโทเค็น OAuth ผ่านพร็อกซี** — โฟลว์ OAuth ยังต้องผ่านพร็อกซีด้วย การแก้ปัญหา `unsupported_country_region_territory`
- **การทดสอบการเชื่อมต่อผ่านพร็อกซี** — การทดสอบการเชื่อมต่อใช้พร็อกซีที่กำหนดค่าไว้ (ไม่มีการบายพาสโดยตรงอีกต่อไป)
- **รองรับ SOCKS5** — รองรับพร็อกซี SOCKS5 เต็มรูปแบบสำหรับการกำหนดเส้นทางขาออก
- **การปลอมแปลงลายนิ้วมือ TLS** — ลายนิ้วมือ TLS เหมือนเบราว์เซอร์ผ่าน `wreq-js` เพื่อเลี่ยงการตรวจจับบอท

</details>

<details>
<summary><b>🆓 4. "ฉันต้องการใช้ AI ในการเขียนโค้ด แต่ไม่มีเงิน"</b></summary>

ไม่ใช่ทุกคนที่สามารถจ่าย $20–200/เดือน สำหรับการสมัครสมาชิก AI นักศึกษา นักพัฒนาจากประเทศเกิดใหม่ ผู้ที่สมัครเล่น และฟรีแลนซ์ต้องการเข้าถึงโมเดลคุณภาพโดยไม่มีค่าใช้จ่าย

**OmniRoute แก้ปัญหาอย่างไร:**

- **ผู้ให้บริการ Tier ฟรีในตัว** — รองรับเนทิฟสำหรับผู้ให้บริการฟรี 100%: iFlow (8 รุ่นไม่จำกัด), Qwen (3 รุ่นไม่จำกัด), Kiro (Claude ฟรี), Gemini CLI (ฟรี 180K/เดือน)
- **Ollama Cloud** — Cloud-hosted Ollama models at `api.ollama.com` with free "Light usage" tier; use `ollamacloud/<model>` prefix
- **คอมโบฟรีเท่านั้น** — Chain `gc/gemini-3-flash → if/kimi-k2-thinking → qw/qwen3-coder-plus` = $0/เดือน โดยไม่มีการหยุดทำงาน
- **เครดิตฟรี NVIDIA NIM** — รวมเครดิตฟรี 1,000 รายการ
- **กลยุทธ์การปรับต้นทุนให้เหมาะสม** — กลยุทธ์การกำหนดเส้นทางที่จะเลือกผู้ให้บริการที่ถูกที่สุดที่มีอยู่โดยอัตโนมัติ

</details>

<details>
<summary><b>🔒 5. "ฉันต้องปกป้องเกตเวย์ AI ของฉันจากการเข้าถึงที่ไม่ได้รับอนุญาต"</b></summary>

เมื่อเปิดเผยเกตเวย์ AI ไปยังเครือข่าย (LAN, VPS, Docker) ใครก็ตามที่มีที่อยู่จะสามารถใช้โทเค็น/โควต้าของนักพัฒนาได้ หากไม่มีการป้องกัน API ก็เสี่ยงต่อการถูกนำไปใช้ในทางที่ผิด การแทรกทันที และการละเมิด

**OmniRoute แก้ปัญหาอย่างไร:**

- **การจัดการคีย์ API** — การสร้าง การหมุนเวียน และการกำหนดขอบเขตต่อผู้ให้บริการด้วยเพจ `/dashboard/api-manager` เฉพาะ
- **การอนุญาตระดับโมเดล** — จำกัดคีย์ API ให้กับโมเดลเฉพาะ (`openai/*` รูปแบบไวด์การ์ด) พร้อมสลับอนุญาตทั้งหมด/จำกัด
- **การป้องกันปลายทาง API** — ต้องใช้รหัสสำหรับ `/v1/models` และบล็อกผู้ให้บริการบางรายจากรายการ
- **Auth Guard + การป้องกัน CSRF** — เส้นทางแดชบอร์ดทั้งหมดที่ได้รับการป้องกันด้วยมิดเดิลแวร์ `withAuth` + โทเค็น CSRF
- **ตัวจำกัดอัตรา** — การจำกัดอัตราต่อ IP ด้วยหน้าต่างที่กำหนดค่าได้
- **การกรอง IP** — รายการที่อนุญาต/รายการบล็อกสำหรับการควบคุมการเข้าถึง
- **Prompt Injection Guard** — การฆ่าเชื้อจากรูปแบบการแจ้งเตือนที่เป็นอันตราย
- **การเข้ารหัส AES-256-GCM** — ข้อมูลประจำตัวได้รับการเข้ารหัสเมื่อไม่ได้ใช้งาน

</details>

<details>
<summary><b>🛑 6. "ผู้ให้บริการของฉันหยุดทำงานและฉันสูญเสียขั้นตอนการเขียนโค้ด"</b></summary>

ผู้ให้บริการ AI อาจไม่เสถียร ส่งกลับข้อผิดพลาด 5xx หรือถึงขีดจำกัดอัตราชั่วคราว หากผู้พัฒนาขึ้นอยู่กับผู้ให้บริการรายเดียว ผู้ให้บริการเหล่านั้นจะถูกขัดจังหวะ หากไม่มีเซอร์กิตเบรกเกอร์ การลองซ้ำหลายครั้งอาจทำให้แอปพลิเคชันเสียหายได้

**OmniRoute แก้ปัญหาอย่างไร:**

- **เซอร์กิตเบรกเกอร์ต่อผู้ให้บริการ** — เปิด/ปิดอัตโนมัติด้วยเกณฑ์และคูลดาวน์ที่กำหนดค่าได้ (ปิด/เปิด/เปิดครึ่งหนึ่ง)
- **Exponential Backoff** — ความล่าช้าในการลองใหม่อย่างต่อเนื่อง
- **Anti-Thundering Herd** — Mutex + การป้องกันเซมาฟอร์จากพายุที่ลองใหม่พร้อมกัน
- **Combo Fallback Chains** — หากผู้ให้บริการหลักล้มเหลว จะตกผ่านห่วงโซ่โดยอัตโนมัติโดยไม่มีการแทรกแซง
- **Combo Circuit Breaker** — ปิดการใช้งานผู้ให้บริการที่ล้มเหลวภายในคอมโบเชนโดยอัตโนมัติ
  | 🎯 **Endpoint-Aware Models** | Custom models declare supported endpoints + API format |
- **แดชบอร์ดสุขภาพ** — การตรวจสอบสถานะการออนไลน์ สถานะของเซอร์กิตเบรกเกอร์ การล็อก สถิติแคช เวลาแฝง p50/p95/p99

</details>

<details>
<summary><b>🏽 7. "การกำหนดค่าเครื่องมือ AI แต่ละรายการนั้นน่าเบื่อและซ้ำซาก"</b></summary>

นักพัฒนาใช้ Cursor, Claude Code, Codex CLI, OpenClaw, Gemini CLI, Kilo Code... เครื่องมือแต่ละอันจำเป็นต้องมีการกำหนดค่าที่แตกต่างกัน (จุดสิ้นสุด API, คีย์, โมเดล) การกำหนดค่าใหม่เมื่อเปลี่ยนผู้ให้บริการหรือรุ่นเป็นการเสียเวลา

**OmniRoute แก้ปัญหาอย่างไร:**

- **แดชบอร์ดเครื่องมือ CLI** — หน้าเฉพาะพร้อมการตั้งค่าเพียงคลิกเดียวสำหรับ Claude Code, Codex CLI, OpenClaw, Kilo Code, Antigravity, Cline
- **GitHub Copilot Config Generator** — สร้าง `chatLanguageModels.json` สำหรับโค้ด VS พร้อมการเลือกรุ่นจำนวนมาก
- **ตัวช่วยสร้างการเริ่มต้นใช้งาน** — คำแนะนำการตั้งค่า 4 ขั้นตอนสำหรับผู้ใช้ครั้งแรก
- **จุดสิ้นสุดเดียว ทุกรุ่น** — กำหนดค่า `http://localhost:20128/v1` ครั้งเดียว เข้าถึงผู้ให้บริการมากกว่า 36 ราย

</details>

<details>
<summary><b>🔑 8. "การจัดการโทเค็น OAuth จากผู้ให้บริการหลายรายนั้นช่างเลวร้าย" </b></summary>

Claude Code, Codex, Gemini CLI, Copilot — ทั้งหมดใช้ OAuth 2.0 โดยมีโทเค็นที่กำลังจะหมดอายุ นักพัฒนาจำเป็นต้องตรวจสอบความถูกต้องอีกครั้งอย่างต่อเนื่อง จัดการกับ `client_secret is missing`, `redirect_uri_mismatch` และความล้มเหลวบนเซิร์ฟเวอร์ระยะไกล OAuth บน LAN/VPS เป็นปัญหาอย่างยิ่ง

**OmniRoute แก้ปัญหาอย่างไร:**

- **รีเฟรชโทเค็นอัตโนมัติ** — โทเค็น OAuth รีเฟรชในพื้นหลังก่อนหมดอายุ
- **OAuth 2.0 (PKCE) ในตัว** — โฟลว์อัตโนมัติสำหรับ Claude Code, Codex, Gemini CLI, Copilot, Kiro, Qwen, iFlow
- **OAuth หลายบัญชี** — หลายบัญชีต่อผู้ให้บริการผ่านการดึงโทเค็น JWT/ID
- **OAuth LAN/Remote Fix** — การตรวจจับ IP ส่วนตัวสำหรับ `redirect_uri` + โหมด URL แบบแมนนวลสำหรับเซิร์ฟเวอร์ระยะไกล
- **OAuth ที่อยู่เบื้องหลัง Nginx** — ใช้ `window.location.origin` สำหรับความเข้ากันได้ของ Reverse Proxy
- **คู่มือ OAuth ระยะไกล** — คำแนะนำทีละขั้นตอนสำหรับข้อมูลรับรอง Google Cloud บน VPS/Docker

</details>

<details>
<summary><b>📊 9. "ฉันไม่รู้ว่าใช้เงินไปเท่าไหร่หรือที่ไหน"</b></summary>

นักพัฒนาซอฟต์แวร์ใช้ผู้ให้บริการแบบชำระเงินหลายราย แต่ไม่มีมุมมองการใช้จ่ายแบบรวมศูนย์ ผู้ให้บริการแต่ละรายมีแดชบอร์ดการเรียกเก็บเงินของตัวเอง แต่ไม่มีข้อมูลรวม ค่าใช้จ่ายที่ไม่คาดคิดอาจกองพะเนิน

**OmniRoute แก้ปัญหาอย่างไร:**

- **แดชบอร์ดการวิเคราะห์ต้นทุน** — การติดตามต้นทุนต่อโทเค็นและการจัดการงบประมาณต่อผู้ให้บริการ
- **ขีดจำกัดงบประมาณต่อระดับ** — เพดานการใช้จ่ายต่อระดับที่ทำให้เกิดทางเลือกสำรองอัตโนมัติ
- **การกำหนดค่าราคาต่อรุ่น** — ราคาที่กำหนดค่าได้ต่อรุ่น
- **สถิติการใช้งานต่อคีย์ API** — จำนวนคำขอและการประทับเวลาที่ใช้ล่าสุดต่อคีย์
- **แดชบอร์ดการวิเคราะห์** — การ์ดสถิติ แผนภูมิการใช้งานโมเดล ตารางผู้ให้บริการพร้อมอัตราความสำเร็จและเวลาแฝง

</details>

<details>
<summary><b>🐛 10. "ฉันไม่สามารถวินิจฉัยข้อผิดพลาดและปัญหาในการเรียก AI ได้"</b></summary>

เมื่อการโทรล้มเหลว ผู้พัฒนาจะไม่ทราบว่าเป็นการจำกัดอัตรา โทเค็นหมดอายุ รูปแบบไม่ถูกต้อง หรือข้อผิดพลาดของผู้ให้บริการ บันทึกที่แยกส่วนในเทอร์มินัลต่างๆ หากไม่สามารถสังเกตได้ การดีบักถือเป็นการลองผิดลองถูก

**OmniRoute แก้ปัญหาอย่างไร:**

- **Unified Logs Dashboard** — 4 แท็บ: บันทึกคำขอ, บันทึกพร็อกซี, บันทึกการตรวจสอบ, คอนโซล
- **โปรแกรมดูบันทึกคอนโซล** — โปรแกรมดูสไตล์เทอร์มินัลแบบเรียลไทม์พร้อมระดับรหัสสี เลื่อนอัตโนมัติ ค้นหา ตัวกรอง
- **SQLite Proxy Logs** — บันทึกถาวรที่รอดจากการรีสตาร์ทเซิร์ฟเวอร์
- **Translator Playground** — โหมดแก้ไขข้อบกพร่อง 4 โหมด: Playground (การแปลรูปแบบ), Chat Tester (ไป-กลับ), ม้านั่งทดสอบ (เป็นกลุ่ม), Live Monitor (เรียลไทม์)
- **ร้องขอการตรวจวัดทางไกล** — p50/p95/p99 latency + การติดตาม X-Request-Id
- **การบันทึกตามไฟล์พร้อมการหมุน** — ตัวสกัดกั้นคอนโซลจะบันทึกทุกอย่างไปยังบันทึก JSON ด้วยการหมุนตามขนาด

</details>

<details>
<summary><b>🏗️ 11. "การปรับใช้และการบำรุงรักษาเกตเวย์นั้นซับซ้อน"</b></summary>

การติดตั้ง การกำหนดค่า และการบำรุงรักษาพร็อกซี AI ในสภาพแวดล้อมที่แตกต่างกัน (ภายในเครื่อง, VPS, Docker, คลาวด์) ต้องใช้แรงงานมาก ปัญหาเช่นเส้นทางฮาร์ดโค้ด `EACCES` บนไดเร็กทอรี ข้อขัดแย้งของพอร์ต และการสร้างข้ามแพลตฟอร์มจะเพิ่มแรงเสียดทาน

**OmniRoute แก้ปัญหาอย่างไร:**

- **การติดตั้งทั่วโลก npm** — `npm install -g omniroute && omniroute` — เสร็จแล้ว
- **นักเทียบท่าหลายแพลตฟอร์ม** — AMD64 + ARM64 ดั้งเดิม (Apple Silicon, AWS Graviton, Raspberry Pi)
- **โปรไฟล์นักเทียบท่าเขียน** — `base` (ไม่มีเครื่องมือ CLI) และ `cli` (พร้อม Claude Code, Codex, OpenClaw)
- **แอป Electron Desktop** — แอปเนทีฟสำหรับ Windows/macOS/Linux พร้อมถาดระบบ เริ่มอัตโนมัติ โหมดออฟไลน์
- **โหมดแยกพอร์ต** — API และแดชบอร์ดบนพอร์ตแยกกันสำหรับสถานการณ์ขั้นสูง (พร็อกซีย้อนกลับ เครือข่ายคอนเทนเนอร์)
- **Cloud Sync** — กำหนดค่าการซิงโครไนซ์ระหว่างอุปกรณ์ผ่าน Cloudflare Workers
- **การสำรองข้อมูล DB** — การสำรองข้อมูล กู้คืน ส่งออก และนำเข้าการตั้งค่าทั้งหมดโดยอัตโนมัติ

</details>

<details>
<summary><b>🌍 12. "อินเทอร์เฟซเป็นภาษาอังกฤษเท่านั้น และทีมของฉันไม่พูดภาษาอังกฤษ"</b></summary>

ทีมในประเทศที่ไม่ได้ใช้ภาษาอังกฤษ โดยเฉพาะในละตินอเมริกา เอเชีย และยุโรป ประสบปัญหากับอินเทอร์เฟซที่ใช้ภาษาอังกฤษเท่านั้น อุปสรรคทางภาษาลดการนำไปใช้และเพิ่มข้อผิดพลาดในการกำหนดค่า

**OmniRoute แก้ปัญหาอย่างไร:**

- **แดชบอร์ด i18n — 30 ภาษา** — ทั้งหมด 500+ คีย์ที่แปล รวมถึงอารบิก บัลแกเรีย เดนมาร์ก เยอรมัน สเปน ฟินแลนด์ ฝรั่งเศส ฮิบรู ฮินดี ฮังการี อินโดนีเซีย อิตาลี ญี่ปุ่น เกาหลี มาเลย์ ดัตช์ นอร์เวย์ โปแลนด์ โปรตุเกส (PT/BR) โรมาเนีย รัสเซีย สโลวาเกีย สวีเดน ไทย ยูเครน เวียดนาม จีน ฟิลิปปินส์ อังกฤษ
- **รองรับ RTL** — รองรับภาษาอาหรับและฮีบรูจากขวาไปซ้าย
- **README หลายภาษา** — การแปลเอกสารฉบับสมบูรณ์ 30 รายการ
- **ตัวเลือกภาษา** — ไอคอนลูกโลกในส่วนหัวสำหรับการสลับแบบเรียลไทม์

</details>

<details>
<summary><b>🔄 13. "ฉันต้องการมากกว่าการแชท — ฉันต้องการการฝัง รูปภาพ เสียง"</b></summary>

AI ไม่ใช่แค่การแชทให้เสร็จสิ้นเท่านั้น นักพัฒนาจำเป็นต้องสร้างภาพ ถอดเสียง สร้างการฝังสำหรับ RAG จัดอันดับเอกสารใหม่ และกลั่นกรองเนื้อหา API แต่ละรายการมีจุดสิ้นสุดและรูปแบบที่แตกต่างกัน

**OmniRoute แก้ปัญหาอย่างไร:**

- **การฝัง** — `/v1/embeddings` พร้อมผู้ให้บริการ 6 รายและรุ่น 9+
- **การสร้างภาพ** — `/v1/images/generations` พร้อมผู้ให้บริการ 10 รายและโมเดลมากกว่า 20 รุ่น (OpenAI, xAI, Together, Fireworks, Nebius, Hyperbolic, NanoBanana, Antigravity, SD WebUI, ComfyUI)
- **ข้อความเป็นวิดีโอ** — `/v1/videos/generations` — ComfyUI (AnimateDiff, SVD) และ SD WebUI
- **ข้อความเป็นเพลง** — `/v1/music/generations` — ComfyUI (เปิดเสียงที่เสถียร, MusicGen)
- **การถอดเสียง** — `/v1/audio/transcriptions` — Whisper + Nvidia NIM, HuggingFace, Qwen3
- **การอ่านออกเสียงข้อความ** — `/v1/audio/speech` — ElevenLabs, Nvidia NIM, HuggingFace, Coqui, Tortoise, Qwen3, Inworld, Cartesia, PlayHT และผู้ให้บริการที่มีอยู่
- **การกลั่นกรอง** — `/v1/moderations` — การตรวจสอบความปลอดภัยของเนื้อหา
- **การจัดอันดับใหม่** — `/v1/rerank` — การจัดอันดับความเกี่ยวข้องของเอกสารใหม่
- **Responses API** — รองรับ `/v1/responses` เต็มรูปแบบสำหรับ Codex

</details>

<details>
<summary><b>🧪 14. "ฉันไม่มีวิธีทดสอบและเปรียบเทียบคุณภาพระหว่างรุ่นต่างๆ"</b></summary>

นักพัฒนาต้องการทราบว่าโมเดลใดดีที่สุดสำหรับกรณีการใช้งานของพวกเขา เช่น โค้ด การแปล การใช้เหตุผล แต่การเปรียบเทียบด้วยตนเองนั้นช้า ไม่มีเครื่องมือประเมินแบบรวมอยู่

**OmniRoute แก้ปัญหาอย่างไร:**

- **การประเมิน LLM** — การทดสอบชุดทองพร้อมเคสที่โหลดไว้ล่วงหน้า 10 เคส ซึ่งครอบคลุมการทักทาย คณิตศาสตร์ ภูมิศาสตร์ การสร้างโค้ด การปฏิบัติตาม JSON การแปล การมาร์กดาวน์ การปฏิเสธด้านความปลอดภัย
- **4 กลยุทธ์การจับคู่** — `exact`, `contains`, `regex`, `custom` (ฟังก์ชัน JS)
- **ม้านั่งทดสอบสนามเด็กเล่นสำหรับนักแปล** — การทดสอบเป็นกลุ่มที่มีอินพุตหลายอินพุตและเอาต์พุตที่คาดหวัง การเปรียบเทียบข้ามผู้ให้บริการ
- **เครื่องมือทดสอบการแชท** — ไป-กลับเต็มรูปแบบพร้อมการเรนเดอร์การตอบสนองด้วยภาพ
- **Live Monitor** — สตรีมคำขอทั้งหมดที่ไหลผ่านพร็อกซีแบบเรียลไทม์

</details>

<details>
<summary><b>📈 15. "ฉันต้องปรับขนาดโดยไม่สูญเสียประสิทธิภาพ"</b></summary>

เมื่อปริมาณคำขอเพิ่มขึ้น หากไม่มีการแคช คำถามเดียวกันจะทำให้เกิดต้นทุนซ้ำซ้อน หากไม่มีการระบุตัวตน คำขอซ้ำจะสูญเปล่าในการประมวลผล ต้องเคารพขีดจำกัดอัตราต่อผู้ให้บริการ

**OmniRoute แก้ปัญหาอย่างไร:**

- **Semantic Cache** — แคชสองชั้น (ลายเซ็น + ความหมาย) ช่วยลดต้นทุนและเวลาแฝง
- **คำขอ Idempotency** — หน้าต่างการขจัดข้อมูลซ้ำซ้อน 5 วินาทีสำหรับคำขอที่เหมือนกัน
- **การตรวจจับขีดจำกัดอัตรา** — RPM ต่อผู้ให้บริการ ช่องว่างขั้นต่ำ และการติดตามพร้อมกันสูงสุด
- **ขีดจำกัดอัตราที่แก้ไขได้** — ค่าเริ่มต้นที่กำหนดค่าได้ในการตั้งค่า → ความยืดหยุ่นด้วยความคงอยู่
- **แคชการตรวจสอบคีย์ API** — แคช 3 ระดับสำหรับประสิทธิภาพการผลิต
- **แดชบอร์ดสุขภาพพร้อมการวัดและส่งข้อมูลทางไกล** — เวลาแฝง p50/p95/p99 สถิติแคช เวลาทำงาน

</details>

<details>
<summary><b>🤖 16. "ฉันต้องการควบคุมพฤติกรรมของโมเดลทั่วโลก"</b></summary>

นักพัฒนาที่ต้องการคำตอบทั้งหมดในภาษาใดภาษาหนึ่ง มีน้ำเสียงเฉพาะ หรือต้องการจำกัดโทเค็นการให้เหตุผล การกำหนดค่านี้ในทุกเครื่องมือ/คำขอไม่สามารถทำได้

**OmniRoute แก้ปัญหาอย่างไร:**

- **การแจ้งพร้อมท์ของระบบ** — พร้อมท์ทั่วโลกนำไปใช้กับคำขอทั้งหมด
- **การตรวจสอบงบประมาณการคิด** — การควบคุมการจัดสรรโทเค็นการให้เหตุผลต่อคำขอ (การส่งผ่าน, อัตโนมัติ, กำหนดเอง, การปรับตัว)
- **6 กลยุทธ์การกำหนดเส้นทาง** — กลยุทธ์ระดับโลกที่กำหนดวิธีกระจายคำขอ
- **Wildcard Router** — รูปแบบ `provider/*` จะกำหนดเส้นทางแบบไดนามิกไปยังผู้ให้บริการใดๆ
- **Combo Enable/Disable Toggle** — สลับคอมโบได้โดยตรงจากแดชบอร์ด
- **สลับผู้ให้บริการ** — เปิด/ปิดการเชื่อมต่อทั้งหมดสำหรับผู้ให้บริการได้ด้วยคลิกเดียว
- **ผู้ให้บริการที่ถูกบล็อก** — ยกเว้นผู้ให้บริการบางรายจากรายการ `/v1/models`

</details>

<details>
<summary><b>🧰 17. "ฉันต้องการเครื่องมือ MCP เนื่องจากความสามารถด้านผลิตภัณฑ์ระดับเฟิร์สคลาส"</b></summary>

เกตเวย์ AI จำนวนมากเปิดเผย MCP เป็นเพียงรายละเอียดการใช้งานที่ซ่อนอยู่เท่านั้น ทีมจำเป็นต้องมีชั้นการปฏิบัติงานที่มองเห็นได้และจัดการได้

**OmniRoute แก้ปัญหาอย่างไร:**

- MCP ปรากฏในการนำทางแดชบอร์ดและแท็บโปรโตคอลปลายทาง
- หน้าการจัดการ MCP เฉพาะพร้อมกระบวนการ เครื่องมือ ขอบเขต และการตรวจสอบ
- การเริ่มต้นอย่างรวดเร็วในตัวสำหรับ `omniroute --mcp` และการเริ่มต้นใช้งานไคลเอ็นต์

</details>

<details>
<summary><b>🧠 18. "ฉันต้องการการประสาน A2A พร้อมเส้นทางงานการซิงค์ + สตรีม"</b></summary>

เวิร์กโฟลว์ของตัวแทนต้องการทั้งการตอบกลับโดยตรงและการดำเนินการสตรีมที่ใช้เวลานานพร้อมการควบคุมวงจรชีวิต

**OmniRoute แก้ปัญหาอย่างไร:**

- จุดสิ้นสุด A2A JSON-RPC (`POST /a2a`) พร้อม `message/send` และ `message/stream`
- การสตรีม SSE พร้อมการเผยแพร่สถานะเทอร์มินัล
- API วงจรชีวิตของงานสำหรับ `tasks/get` และ `tasks/cancel`

</details>

<details>
<summary><b>🛰️ 19. "ฉันต้องการความสมบูรณ์ของกระบวนการ MCP ที่แท้จริง ไม่ใช่สถานะที่เดาได้"</b></summary>

ทีมปฏิบัติการจำเป็นต้องทราบว่า MCP ยังคงอยู่จริงหรือไม่ ไม่ใช่แค่ว่า API สามารถเข้าถึงได้หรือไม่

**OmniRoute แก้ปัญหาอย่างไร:**

- ไฟล์ฮาร์ทบีทรันไทม์พร้อม PID, การประทับเวลา, การขนส่ง, จำนวนเครื่องมือ และโหมดขอบเขต
- API สถานะ MCP รวมการเต้นของหัวใจ + กิจกรรมล่าสุด
- การ์ดสถานะ UI สำหรับความสดใหม่ของกระบวนการ/สถานะการออนไลน์/การเต้นของหัวใจ

</details>

<details>
<summary><b>📋 20. "ฉันต้องการการทำงานของเครื่องมือ MCP ที่ตรวจสอบได้"</b></summary>

เมื่อเครื่องมือเปลี่ยนแปลงการกำหนดค่าหรือทริกเกอร์การดำเนินการ ทีมจำเป็นต้องมีการตรวจสอบย้อนกลับทางนิติเวช

**OmniRoute แก้ปัญหาอย่างไร:**

- การบันทึกการตรวจสอบที่ได้รับการสนับสนุนจาก SQLite สำหรับการเรียกใช้เครื่องมือ MCP
- กรองตามเครื่องมือ ความสำเร็จ/ความล้มเหลว คีย์ API และการแบ่งหน้า
- ตารางการตรวจสอบแดชบอร์ด + จุดสิ้นสุดสถิติสำหรับระบบอัตโนมัติ

</details>

<details>
<summary><b>🔐 21. "ฉันต้องการสิทธิ์ MCP ที่กำหนดขอบเขตต่อการบูรณาการ"</b></summary>

ไคลเอนต์ที่แตกต่างกันควรมีสิทธิ์เข้าถึงหมวดหมู่เครื่องมือน้อยที่สุด

**OmniRoute แก้ปัญหาอย่างไร:**

- ขอบเขต MCP แบบละเอียด 9 แบบสำหรับการเข้าถึงเครื่องมือที่ควบคุม
- การบังคับใช้ขอบเขตและการมองเห็นใน UI การจัดการ MCP
- ท่าทางเริ่มต้นที่ปลอดภัยสำหรับเครื่องมือในการปฏิบัติงาน

</details>

<details>
<summary><b>⚙️ 22. "ฉันต้องการการควบคุมการปฏิบัติงานโดยไม่ต้องปรับใช้ใหม่"</b></summary>

ทีมต้องการการเปลี่ยนแปลงรันไทม์อย่างรวดเร็วระหว่างเหตุการณ์หรือเหตุการณ์ต้นทุน

**OmniRoute แก้ปัญหาอย่างไร:**

- สลับการเปิดใช้งานคอมโบโดยตรงจากแดชบอร์ด MCP
- ใช้โปรไฟล์ความยืดหยุ่นจากชุดนโยบายที่กำหนดไว้ล่วงหน้า
- รีเซ็ตสถานะเซอร์กิตเบรกเกอร์จากแผงการทำงานเดียวกัน

</details>

<details>
<summary><b>🔄 23. "ฉันต้องการการมองเห็นและการยกเลิกวงจรการใช้งาน A2A แบบสด"</b></summary>

หากไม่มีการมองเห็นวงจรการใช้งาน เหตุการณ์ของงานจะยากต่อการคัดแยก

**OmniRoute แก้ปัญหาอย่างไร:**

- รายการงาน/การกรองตามสถานะ/ทักษะพร้อมการแบ่งหน้า
- เจาะลึกข้อมูลเมตาของงาน เหตุการณ์ และสิ่งประดิษฐ์
- จุดสิ้นสุดการยกเลิกงานและการดำเนินการ UI พร้อมการยืนยัน

</details>

<details>
<summary><b>🌊 24. "ฉันต้องการตัววัดสตรีมที่ใช้งานอยู่สำหรับโหลด A2A"</b></summary>

เวิร์กโฟลว์การสตรีมจำเป็นต้องมีข้อมูลเชิงลึกในการดำเนินงานเกี่ยวกับการทำงานพร้อมกันและการเชื่อมต่อแบบสด

**OmniRoute แก้ปัญหาอย่างไร:**

- ตัวนับสตรีมที่ใช้งานรวมอยู่ในสถานะ A2A
- การประทับเวลางานล่าสุดและการนับต่อรัฐ
- การ์ดแดชบอร์ด A2A สำหรับการตรวจสอบการปฏิบัติงานแบบเรียลไทม์

</details>

<details>
<summary><b>🪪 25. "ฉันต้องการการค้นพบเอเจนต์มาตรฐานสำหรับลูกค้า"</b></summary>

ไคลเอนต์และผู้ควบคุมภายนอกต้องการเมตาดาต้าที่เครื่องอ่านได้เพื่อการเริ่มต้นใช้งาน

**OmniRoute แก้ปัญหาอย่างไร:**

- บัตรตัวแทนเปิดเผยที่ `/.well-known/agent.json`
- ความสามารถและทักษะที่แสดงใน UI การจัดการ
- API สถานะ A2A รวมถึงข้อมูลเมตาการค้นพบสำหรับระบบอัตโนมัติ

</details>

<details>
<summary><b>🧭 26. "ฉันต้องการการค้นพบโปรโตคอลในผลิตภัณฑ์ UX"</b></summary>

หากผู้ใช้ไม่พบพื้นผิวของโปรโตคอล การนำไปใช้และคุณภาพการสนับสนุนจะลดลง

**OmniRoute แก้ปัญหาอย่างไร:**

- รายการแถบด้านข้างสำหรับ MCP และ A2A
- แท็บโปรโตคอลหน้าปลายทางพร้อมการเริ่มต้นและสถานะอย่างรวดเร็ว
- ลิงก์จากภาพรวมไปยังแดชบอร์ดการจัดการเฉพาะ

</details>

<details>
<summary><b>🧪 27. "ฉันต้องการการตรวจสอบโปรโตคอลแบบ end-to-end กับไคลเอนต์จริง"</b></summary>

การทดสอบจำลองไม่เพียงพอที่จะตรวจสอบความเข้ากันได้ของโปรโตคอลก่อนเผยแพร่

**OmniRoute แก้ปัญหาอย่างไร:**

- ชุด E2E ที่บูทแอปและใช้การขนส่งไคลเอนต์ MCP SDK จริง
- ไคลเอนต์ A2A ทดสอบการค้นหา ส่ง สตรีม รับ และยกเลิกโฟลว์
- ยืนยันการตรวจสอบข้ามกับการตรวจสอบ MCP และ API งาน A2A

</details>

<details>
<summary><b>📡 28. "ฉันต้องการความสามารถในการสังเกตแบบรวมศูนย์ในทุกอินเทอร์เฟซ"</b></summary>

การแยกความสามารถในการสังเกตตามโปรโตคอลทำให้เกิดจุดบอดและ MTTR ที่ยาวขึ้น

**OmniRoute แก้ปัญหาอย่างไร:**

- แดชบอร์ด/บันทึก/การวิเคราะห์แบบรวมในผลิตภัณฑ์เดียว
- สุขภาพ + การตรวจสอบ + ขอการตรวจวัดทางไกลผ่านเลเยอร์ OpenAI, MCP และ A2A
- API การดำเนินงานสำหรับสถานะและระบบอัตโนมัติ

</details>

<details>
<summary><b>💼 29. "ฉันต้องการหนึ่งรันไทม์สำหรับพร็อกซี + เครื่องมือ + การจัดการเอเจนต์"</b></summary>

การใช้บริการแยกกันจำนวนมากจะเพิ่มต้นทุนการดำเนินงานและโหมดความล้มเหลว

**OmniRoute แก้ปัญหาอย่างไร:**

- พร็อกซีที่เข้ากันได้กับ OpenAI, เซิร์ฟเวอร์ MCP และเซิร์ฟเวอร์ A2A ในสแต็กเดียว
- การรับรองความถูกต้องที่ใช้ร่วมกัน ความยืดหยุ่น การจัดเก็บข้อมูล และความสามารถในการสังเกต
- รูปแบบนโยบายที่สอดคล้องกันในทุกรูปแบบการโต้ตอบ

</details>

<details>
<summary><b>🚀 30. "ฉันต้องจัดส่งเวิร์กโฟลว์เอเจนต์โดยไม่มีการแผ่ขยายโค้ดกาว"</b></summary>

ทีมจะสูญเสียความเร็วเมื่อรวมบริการและสคริปต์เฉพาะกิจหลายรายการเข้าด้วยกัน

**OmniRoute แก้ปัญหาอย่างไร:**

- กลยุทธ์อุปกรณ์ปลายทางแบบครบวงจรสำหรับลูกค้าและตัวแทน
- UIs การจัดการโปรโตคอลในตัวและเส้นทางการตรวจสอบควัน
- รากฐานที่พร้อมสำหรับการผลิต (ความปลอดภัย การบันทึก ความยืดหยุ่น การสำรองข้อมูล)

</details>

### Playbook ตัวอย่าง (กรณีการใช้งานแบบรวม)

**Playbook A: เพิ่มการสมัครสมาชิกแบบชำระเงินให้สูงสุด + การสำรองข้อมูลราคาถูก**

```txt
Combo: "maximize-claude"
  1. cc/claude-opus-4-6
  2. glm/glm-4.7
  3. if/kimi-k2-thinking

Monthly cost: $20 + small backup spend
Outcome: higher quality, near-zero interruption
```

**Playbook B: สแต็คการเขียนโค้ดแบบไม่มีค่าใช้จ่าย**

```txt
Combo: "free-forever"
  1. gc/gemini-3-flash
  2. if/kimi-k2-thinking
  3. qw/qwen3-coder-plus

Monthly cost: $0
Outcome: stable free coding workflow
```

**Playbook C: ห่วงโซ่ทางเลือกที่เปิดตลอด 24 ชั่วโมงทุกวัน**

```txt
Combo: "always-on"
  1. cc/claude-opus-4-6
  2. cx/gpt-5.2-codex
  3. glm/glm-4.7
  4. minimax/MiniMax-M2.1
  5. if/kimi-k2-thinking

Outcome: deep fallback depth for deadline-critical workloads
```

**Playbook D: ตัวแทนดำเนินการด้วย MCP + A2A**

```txt
1) Start MCP transport (`omniroute --mcp`) for tool-driven operations
2) Run A2A tasks via `message/send` and `message/stream`
3) Observe via /dashboard/mcp and /dashboard/a2a
4) Control incidents with resilience profile + task cancellation
```

---

## ⚡ เริ่มต้นอย่างรวดเร็ว

**1. ติดตั้งทั่วโลก:**

```bash
npm install -g omniroute
omniroute
```

🎉 แดชบอร์ดเปิดเมื่อ `http://localhost:20128`

| คำสั่ง                  | คำอธิบาย                               |
| ----------------------- | -------------------------------------- |
| `omniroute`             | เริ่มเซิร์ฟเวอร์ (พอร์ตเริ่มต้น 20128) |
| `omniroute --port 3000` | ใช้พอร์ตที่กำหนดเอง                    |
| `omniroute --no-open`   | อย่าเปิดเบราว์เซอร์อัตโนมัติ           |
| `omniroute --help`      | แสดงความช่วยเหลือ                      |

**2. เชื่อมต่อผู้ให้บริการฟรี:**

แดชบอร์ด → ผู้ให้บริการ → เชื่อมต่อ **Claude Code** หรือ **Antigravity** → เข้าสู่ระบบ OAuth → เสร็จสิ้น!

**3. ใช้ในเครื่องมือ CLI ของคุณ:**

```
Claude Code/Codex/Gemini CLI/OpenClaw/Cursor/Cline Settings:
  Endpoint: http://localhost:20128/v1
  API Key: [copy from dashboard]
  Model: if/kimi-k2-thinking
```

**แค่นั้นแหละ!** เริ่มเขียนโค้ดด้วยโมเดล AI ฟรี

**ทางเลือก — เรียกใช้จากแหล่งที่มา:**

```bash
cp .env.example .env
npm install
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

---

## 🐳 ด็อคเกอร์

OmniRoute มีให้เป็นอิมเมจ Docker สาธารณะบน [Docker Hub](https://hub.docker.com/r/diegosouzapw/omniroute)

**วิ่งด่วน:**

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

**พร้อมไฟล์สภาพแวดล้อม:**

```bash
# Copy and edit .env first
cp .env.example .env

docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --env-file .env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

**การใช้นักเทียบท่าเขียน:**

```bash
# Base profile (no CLI tools)
docker compose --profile base up -d

# CLI profile (Claude Code, Codex, OpenClaw built-in)
docker compose --profile cli up -d
```

| รูปภาพ                   | แท็ก     | ขนาด   | คำอธิบาย         |
| ------------------------ | -------- | ------ | ---------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | รุ่นเสถียรล่าสุด |
| `diegosouzapw/omniroute` | `1.0.3`  | ~250MB | เวอร์ชันปัจจุบัน |

---

---

## 🖥️

> 🆕 **NEW!** OmniRoute is now available as a **native desktop application** for Windows, macOS, and Linux.

- 🖥️ **Native Window** — Dedicated app window with system tray integration
- 🔄 **Auto-Start** — Launch OmniRoute on system login
- 🔔 **Native Notifications** — Get alerts for quota exhaustion or provider issues
- ⚡ **One-Click Install** — NSIS (Windows), DMG (macOS), AppImage (Linux)
- 🌐 **Offline Mode** — Works fully offline with bundled server

```bash
npm run electron:dev           # Development mode
npm run electron:build         # Current platform
npm run electron:build:win     # Windows (.exe)
npm run electron:build:mac     # macOS (.dmg)
npm run electron:build:linux   # Linux (.AppImage)
```

📖 Full documentation: [`electron/README.md`](electron/README.md)

---

## 💰 ราคาโดยสรุป

| ชั้น               | ผู้ให้บริการ     | ราคา                   | รีเซ็ตโควต้า        | ดีที่สุดสำหรับ               |
| ------------------ | ---------------- | ---------------------- | ------------------- | ---------------------------- |
| **💳 สมัครสมาชิก** | รหัสคลอดด์ (Pro) | $20/เดือน              | 5 ชม. + รายสัปดาห์  | สมัครสมาชิกแล้ว              |
|                    | Codex (พลัส/โปร) | $20-200/เดือน          | 5 ชม. + รายสัปดาห์  | ผู้ใช้ OpenAI                |
|                    | ราศีเมถุน CLI    | **ฟรี**                | 180K/เดือน + 1K/วัน | ทุกคน!                       |
|                    | นักบิน GitHub    | $10-19/เดือน           | รายเดือน            | ผู้ใช้ GitHub                |
| **🔑 คีย์ API**    | NVIDIA NIM       | **ฟรี** (1,000 เครดิต) | ครั้งเดียว          | การทดสอบระดับฟรี             |
|                    | DeepSeek         | จ่ายตามการใช้งาน       | ไม่มี               | ราคา/คุณภาพที่ดีที่สุด       |
|                    | กรอค             | ฟรีเทียร์ + จ่ายเงิน   | อัตราจำกัด          | การอนุมานที่รวดเร็วเป็นพิเศษ |
|                    | xAI (โกรก)       | จ่ายตามการใช้งาน       | ไม่มี               | รุ่น Grok                    |
|                    | มิสทรัล          | ฟรีเทียร์ + จ่ายเงิน   | อัตราจำกัด          | AI ยุโรป                     |
|                    | OpenRouter       | จ่ายตามการใช้งาน       | ไม่มี               | โมเดลมากกว่า 100 แบบ         |
| **💰 ราคาถูก**     | GLM-4.7          | $0.6/1M                | ทุกวัน 10.00 น.     | สำรองงบประมาณ                |
|                    | MiniMax M2.1     | $0.2/1M                | กลิ้ง 5 ชั่วโมง     | ตัวเลือกที่ถูกที่สุด         |
|                    | คิมิ K2          | $9/เดือน คงที่         | 10M โทเค็น/เดือน    | ต้นทุนที่คาดการณ์ได้         |
| **🆓 ฟรี**         | ไอโฟลว์          | $0                     | ไม่จำกัด            | ฟรี 8 รุ่น                   |
|                    | ควีน             | $0                     | ไม่จำกัด            | ฟรี 3 รุ่น                   |
|                    | คิโระ            | $0                     | ไม่จำกัด            | คลอดด์ฟรี                    |

**💡 เคล็ดลับสำหรับมืออาชีพ:** เริ่มต้นด้วย Gemini CLI (ฟรี 180,000 ต่อเดือน) + iFlow (ฟรีไม่จำกัด) คอมโบ = ค่าใช้จ่าย $0!

---

## 💡 คุณสมบัติที่สำคัญ

### 🧠 การกำหนดเส้นทางหลักและความฉลาด

| คุณสมบัติ                            | มันทำอะไร                                                                         |
| ------------------------------------ | --------------------------------------------------------------------------------- |
| 🎯 **ทางเลือกสำรองอัจฉริยะ 4 ระดับ** | เส้นทางอัตโนมัติ: การสมัครสมาชิก → คีย์ API → ถูก → ฟรี                           |
| 📊 **การติดตามโควต้าแบบเรียลไทม์**   | จำนวนโทเค็นสด + รีเซ็ตการนับถอยหลังต่อผู้ให้บริการ                                |
| 🔄 **แปลรูปแบบ**                     | OpenAI ↔ Claude ↔ ราศีเมถุน ↔ เคอร์เซอร์ ↔ Kiro ไร้รอยต่อ + การฆ่าเชื้อแบบตอบสนอง |
| 👥 **รองรับหลายบัญชี**               | หลายบัญชีต่อผู้ให้บริการพร้อมตัวเลือกที่ชาญฉลาด                                   |
| 🔄 **รีเฟรชโทเค็นอัตโนมัติ**         | โทเค็น OAuth รีเฟรชอัตโนมัติพร้อมลองอีกครั้ง                                      |
| 🎨 **คอมโบแบบกำหนดเอง**              | 6 กลยุทธ์: เติมก่อน, ปัดเศษ, p2c, สุ่ม, ใช้น้อยที่สุด, ปรับต้นทุนให้เหมาะสม       |
| 🧩 **โมเดลที่กำหนดเอง**              | เพิ่ม ID รุ่นใด ๆ ให้กับผู้ให้บริการ                                              |
| 🌐 **เราเตอร์ตัวแทน**                | กำหนดเส้นทางรูปแบบ `provider/*` ไปยังผู้ให้บริการใดๆ แบบไดนามิก                   |
| 🧠 **คิดงบประมาณ**                   | โหมดส่งผ่าน, อัตโนมัติ, กำหนดเอง และแบบปรับได้สำหรับโมเดลการให้เหตุผล             |
| 🔀 **Model Aliases**                 | Auto-forward deprecated model IDs to current replacements (built-in + custom)     |
| ⚡ **Background Degradation**        | Auto-route background tasks (titles, summaries) to cheaper models                 |
| 💌 **ระบบพร้อมฉีด**                  | พร้อมท์ระบบสากลใช้กับคำขอทั้งหมด                                                  |
| 📄 **API ตอบกลับ**                   | รองรับ OpenAI Responses API เต็มรูปแบบ (`/v1/responses`) สำหรับ Codex             |

### 🎵 Multi-Modal API

| คุณสมบัติ               | มันทำอะไร                                                                                                                             |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| 🖼️ **การสร้างภาพ**      | `/v1/images/generations` — ผู้ให้บริการ 4 ราย รุ่น 9+                                                                                 |
| 📐 **การฝัง**           | `/v1/embeddings` — ผู้ให้บริการ 6 ราย รุ่น 9+                                                                                         |
| 🎶 **การถอดเสียง**      | `/v1/audio/transcriptions` — รองรับการกระซิบ                                                                                          |
| 🔊 **ข้อความเป็นคำพูด** | `/v1/audio/speech` — 10 providers (ElevenLabs, OpenAI, Deepgram, Cartesia, PlayHT, HuggingFace, Nvidia NIM, Inworld, Coqui, Tortoise) |
| 🛡️ **การกลั่นกรอง**     | `/v1/moderations` — การตรวจสอบความปลอดภัยของเนื้อหา                                                                                   |
| 🔀 **จัดอันดับ**        | `/v1/rerank` — การจัดอันดับความเกี่ยวข้องของเอกสาร                                                                                    |

### 🛡️ ความยืดหยุ่นและความปลอดภัย

| คุณสมบัติ                         | มันทำอะไร                                                                    |
| --------------------------------- | ---------------------------------------------------------------------------- |
| 🔌 **เซอร์กิตเบรกเกอร์**          | เปิด/ปิดอัตโนมัติต่อผู้ให้บริการพร้อมเกณฑ์ที่กำหนดค่าได้                     |
| 🛡️ **ฝูงต่อต้านฟ้าร้อง**          | Mutex + ขีดจำกัดอัตราเซมาฟอร์สำหรับผู้ให้บริการคีย์ API                      |
| 🧠 **แคชความหมาย**                | แคชสองชั้น (ลายเซ็น + ความหมาย) ช่วยลดต้นทุน & เวลาแฝง                       |
| ⚡ **ขอ Idempotency**             | หน้าต่าง dedup 5s สำหรับคำขอซ้ำ                                              |
| 🔒 **การปลอมแปลงลายนิ้วมือ TLS**  | เลี่ยงการตรวจจับบอทที่ใช้ TLS ผ่าน wreq-js                                   |
| 🌐 **การกรอง IP**                 | รายการที่อนุญาต/รายการบล็อกสำหรับการควบคุมการเข้าถึง API                     |
| 📊 **ขีดจำกัดอัตราที่แก้ไขได้**   | RPM ที่กำหนดค่าได้ ช่องว่างขั้นต่ำ และสูงสุดพร้อมกันที่ระดับระบบ             |
| 💾 **Rate Limit Persistence**     | Learned limits survive restarts via SQLite with 60s debounce + 24h staleness |
| 🔄 **Token Refresh Resilience**   | Per-provider circuit breaker (5 fails→30min) + 30s timeout per attempt       |
| 🛡 **การป้องกันปลายทาง API**      | การตรวจสอบสิทธิ์ + การบล็อกผู้ให้บริการสำหรับปลายทาง `/models`               |
| 🔒 **การมองเห็นพร็อกซี**          | ป้ายรหัสสี: 🟢 ทั่วโลก 🟡 ผู้ให้บริการ 🔵 ต่อการเชื่อมต่อพร้อมจอแสดงผล IP    |
| 🌐 **การกำหนดค่าพร็อกซี 3 ระดับ** | กำหนดค่าพร็อกซีในระดับโกลบอล ต่อผู้ให้บริการ หรือต่อการเชื่อมต่อ             |

### 📊 ความสามารถในการสังเกตและการวิเคราะห์

| คุณสมบัติ                   | มันทำอะไร                                                                      |
| --------------------------- | ------------------------------------------------------------------------------ |
| 📝 **ขอบันทึก**             | โหมดแก้ไขข้อบกพร่องพร้อมบันทึกคำขอ/การตอบกลับแบบเต็ม                           |
| 💾 **บันทึกพร็อกซี SQLite** | บันทึกพร็อกซีถาวรยังคงอยู่เซิร์ฟเวอร์รีสตาร์ท                                  |
| 📊 **แดชบอร์ดการวิเคราะห์** | ขับเคลื่อนโดย Recharts: การ์ดสถิติ แผนภูมิการใช้งานโมเดล ตารางผู้ให้บริการ     |
| 📈 **ติดตามความคืบหน้า**    | เลือกใช้กิจกรรมความคืบหน้าของ SSE สำหรับการสตรีม                               |
| 🧪 **การประเมิน LLM**       | การทดสอบชุดทองด้วย 4 กลยุทธ์การจับคู่                                          |
| 🔍 **ขอโทรมาตร**            | การรวมเวลาแฝง p50/p95/p99 + การติดตาม X-Request-Id                             |
| 📋 **แดชบอร์ดบันทึก**       | หน้าแท็บ 4 แบบรวม: บันทึกคำขอ บันทึกพร็อกซี บันทึกการตรวจสอบ คอนโซล            |
| 🖥️ **ผู้ดูบันทึกคอนโซล**    | โปรแกรมดูสไตล์เทอร์มินัลแบบเรียลไทม์พร้อมตัวกรองระดับ การค้นหา เลื่อนอัตโนมัติ |
| 📑 **การบันทึกตามไฟล์**     | ตัวดักจับคอนโซลจับเอาต์พุตทั้งหมดไปยังไฟล์บันทึก JSON พร้อมการหมุน             |
| 🏥 **แดชบอร์ดสุขภาพ**       | เวลาทำงานของระบบ, สถานะของเซอร์กิตเบรกเกอร์, การล็อกเอาต์, สถิติแคช            |
| 💰 **ติดตามต้นทุน**         | การจัดการงบประมาณ + การกำหนดค่าราคาต่อรุ่น                                     |

### ☁️ การปรับใช้และการซิงค์

| คุณสมบัติ                            | มันทำอะไร                                                                   |
| ------------------------------------ | --------------------------------------------------------------------------- |
| 💾 **คลาวด์ซิงค์**                   | ซิงค์การกำหนดค่าระหว่างอุปกรณ์ผ่าน Cloudflare Workers                       |
| 🌐 **ปรับใช้ได้ทุกที่**              | Localhost, VPS, นักเทียบท่า, พนักงาน Cloudflare                             |
| 🔑 **การจัดการคีย์ API**             | สร้าง หมุนเวียน และกำหนดขอบเขตคีย์ API ตามผู้ให้บริการ                      |
| 🧙 **ตัวช่วยสร้างการเริ่มต้นใช้งาน** | การตั้งค่าพร้อมคำแนะนำ 4 ขั้นตอนสำหรับผู้ใช้ครั้งแรก                        |
| ???? **แดชบอร์ดเครื่องมือ CLI**      | คลิกเดียวกำหนดค่า Claude, Codex, Cline, OpenClaw, Kilo, Antigravity         |
| 🔄 **การสำรองฐานข้อมูล**             | สำรองข้อมูล กู้คืน ส่งออก & นำเข้าอัตโนมัติสำหรับการตั้งค่าทั้งหมด          |
| 🌐 **ความเป็นสากล**                  | i18n เต็มรูปแบบพร้อม next-intl — รองรับภาษาอังกฤษ + โปรตุเกส (บราซิล)       |
| 🌍 **ตัวเลือกภาษา**                  | ไอคอนลูกโลกในส่วนหัวสำหรับการสลับภาษาแบบเรียลไทม์ (USA/🇧🇷)                  |
| 📂 **ไดเรกทอรีข้อมูลที่กำหนดเอง**    | `DATA_DIR` env var เพื่อแทนที่ค่าเริ่มต้น `~/.omniroute` พาธหน่วยเก็บข้อมูล |

<details>
<summary><b>📖 รายละเอียดคุณสมบัติ</b></summary>
### 🎯 ทางเลือกสำรอง 4 ชั้นอัจฉริยะ

สร้างคอมโบพร้อมทางเลือกอัตโนมัติ:

```
Combo: "my-coding-stack"
  1. cc/claude-opus-4-6        (your subscription)
  2. nvidia/llama-3.3-70b      (free NVIDIA API)
  3. glm/glm-4.7               (cheap backup, $0.6/1M)
  4. if/kimi-k2-thinking       (free fallback)

→ Auto switches when quota runs out or errors occur
```

### 📊 การติดตามโควต้าแบบเรียลไทม์

- การใช้โทเค็นต่อผู้ให้บริการ
- รีเซ็ตการนับถอยหลัง (5 ชั่วโมง รายวัน รายสัปดาห์)
- การประมาณต้นทุนสำหรับระดับที่ชำระเงิน
- รายงานการใช้จ่ายรายเดือน

### 🔄 แปลรูปแบบ

การแปลที่ราบรื่นระหว่างรูปแบบ:

- **OpenAI** ↔ **Claude** ↔ **ราศีเมถุน** ↔ **การตอบกลับ OpenAI**
- เครื่องมือ CLI ของคุณส่งรูปแบบ OpenAI → การแปล OmniRoute → ผู้ให้บริการได้รับรูปแบบดั้งเดิม
- ทำงานร่วมกับเครื่องมือใดๆ ที่รองรับจุดสิ้นสุด OpenAI ที่กำหนดเอง
- **การฆ่าเชื้อการตอบสนอง** — ตัดช่องที่ไม่ได้มาตรฐานสำหรับความเข้ากันได้ของ OpenAI SDK ที่เข้มงวด
- **การปรับบทบาทให้เป็นมาตรฐาน** — `developer` → `system` สำหรับ non-OpenAI; `system` → `user` สำหรับรุ่น GLM/ERNIE
- **ลองแยกแท็ก** — `<think>` บล็อก → `reasoning_content` สำหรับการคิดโมเดล
- **เอาต์พุตที่มีโครงสร้าง** — `json_schema` → `responseMimeType`/`responseSchema` ของราศีเมถุน

### 👥 รองรับหลายบัญชี

- เพิ่มหลายบัญชีต่อผู้ให้บริการ
- การวนรอบอัตโนมัติหรือการกำหนดเส้นทางตามลำดับความสำคัญ
- ถอยกลับไปยังบัญชีถัดไปเมื่อถึงโควต้า

### 🔄 รีเฟรชโทเค็นอัตโนมัติ

- โทเค็น OAuth จะรีเฟรชโดยอัตโนมัติก่อนหมดอายุ
- ไม่จำเป็นต้องตรวจสอบสิทธิ์ซ้ำด้วยตนเอง
- ประสบการณ์ที่ไร้รอยต่อกับผู้ให้บริการทุกราย

### 🎨 คอมโบที่กำหนดเอง

- สร้างชุดค่าผสมโมเดลได้ไม่จำกัด
- 6 กลยุทธ์: เติมก่อน ปัดเศษ ยกกำลังสองตัวเลือก สุ่ม ใช้น้อยที่สุด ปรับต้นทุนให้เหมาะสม
- แบ่งปันคอมโบระหว่างอุปกรณ์ด้วย Cloud Sync

### 🏥 แดชบอร์ดสุขภาพ

- สถานะของระบบ (สถานะการออนไลน์, เวอร์ชัน, การใช้หน่วยความจำ)
- สถานะเซอร์กิตเบรกเกอร์ต่อผู้ให้บริการ (ปิด/เปิด/เปิดครึ่ง)
- สถานะการจำกัดอัตราและการล็อกที่ใช้งานอยู่
- สถิติแคชลายเซ็น
- telemetry Latency (p50/p95/p99) + แคชพร้อมท์
- รีเซ็ตสถานะสุขภาพได้ด้วยคลิกเดียว

### ???? สนามเด็กเล่นนักแปล

OmniRoute มี Translator Playground ในตัวอันทรงพลัง พร้อมด้วย **4 โหมด** สำหรับการดีบัก การทดสอบ และการตรวจสอบการแปล API:

| โหมด                      | คำอธิบาย                                                                                                                                                                                                |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **💻 สนามเด็กเล่น**       | การแปลรูปแบบโดยตรง — วางเนื้อหาคำขอ API ใดๆ และดูได้ทันทีว่า OmniRoute แปลระหว่างรูปแบบของผู้ให้บริการอย่างไร (OpenAI ↔ Claude ↔ Gemini ↔ Responses API) รวมเทมเพลตตัวอย่างและการตรวจจับรูปแบบอัตโนมัติ |
| **💌 โปรแกรมทดสอบการแชท** | ส่งคำขอแชทจริงผ่าน OmniRoute และดูการเดินทางไปกลับทั้งหมด: ข้อมูลของคุณ คำขอที่แปล คำตอบของผู้ให้บริการ และการตอบกลับที่แปลแล้ว ล้ำค่าสำหรับการตรวจสอบการกำหนดเส้นทางคำสั่งผสม                          |
| **🧪 ม้านั่งทดสอบ**       | โหมดการทดสอบแบบแบตช์ — กำหนดกรณีการทดสอบหลายกรณีด้วยอินพุตและเอาต์พุตที่คาดหวังที่แตกต่างกัน รันการทดสอบทั้งหมดพร้อมกัน และเปรียบเทียบผลลัพธ์ระหว่างผู้ให้บริการและโมเดลต่างๆ                           |
| **📱 ไลฟ์มอนิเตอร์**      | การตรวจสอบคำขอแบบเรียลไทม์ — ดูคำขอที่เข้ามาขณะที่คำขอไหลผ่าน OmniRoute ดูการแปลรูปแบบที่เกิดขึ้นแบบสด และระบุปัญหาได้ทันที                                                                             |

**การเข้าถึง:** แดชบอร์ด → นักแปล (แถบด้านข้าง)

### 💾 คลาวด์ซิงค์

- ซิงค์ผู้ให้บริการ คอมโบ และการตั้งค่าระหว่างอุปกรณ์ต่างๆ
- ซิงค์พื้นหลังอัตโนมัติ
- พื้นที่เก็บข้อมูลที่เข้ารหัสที่ปลอดภัย

</details>

## 🧪 การประเมินผล (Evals)

OmniRoute มีกรอบการประเมินในตัวเพื่อทดสอบคุณภาพการตอบสนองของ LLM เทียบกับชุดทอง เข้าถึงได้ผ่านทาง **Analytics → Evals** ในแดชบอร์ด

### ชุดทองในตัว

"OmniRoute Golden Set" ที่โหลดไว้ล่วงหน้าประกอบด้วยกรณีทดสอบ 10 กรณีที่ครอบคลุม:

- คำทักทาย คณิตศาสตร์ ภูมิศาสตร์ การสร้างโค้ด
- การปฏิบัติตามรูปแบบ JSON, การแปล, มาร์กดาวน์
- การปฏิเสธอย่างปลอดภัย (เนื้อหาที่เป็นอันตราย) การนับ ตรรกะบูลีน

### กลยุทธ์การประเมินผล

| กลยุทธ์    | คำอธิบาย                                                           | ตัวอย่าง                         |
| ---------- | ------------------------------------------------------------------ | -------------------------------- |
| `exact`    | ผลลัพธ์จะต้องตรงกันทุกประการ                                       | `"4"`                            |
| `contains` | เอาต์พุตจะต้องมีสตริงย่อย (ไม่คำนึงถึงตัวพิมพ์เล็กและตัวพิมพ์ใหญ่) | `"Paris"`                        |
| `regex`    | เอาต์พุตต้องตรงกับรูปแบบ regex                                     | `"1.*2.*3"`                      |
| `custom`   | ฟังก์ชัน JS แบบกำหนดเองส่งคืนค่า true/false                        | `(output) => output.length > 10` |

---

## 📖 คู่มือการตั้งค่า

<details>
<summary><b>💳 ผู้ให้บริการสมัครสมาชิก</b></summary>
### รหัสคลอด (Pro/Max)

```bash
Dashboard → Providers → Connect Claude Code
→ OAuth login → Auto token refresh
→ 5-hour + weekly quota tracking

Models:
  cc/claude-opus-4-6
  cc/claude-sonnet-4-5-20250929
  cc/claude-haiku-4-5-20251001
```

**เคล็ดลับสำหรับมือโปร:** ใช้ Opus สำหรับงานที่ซับซ้อน และใช้ Sonnet เพื่อความรวดเร็ว โควต้าการติดตาม OmniRoute ต่อรุ่น!

### OpenAI Codex (พลัส/โปร)

```bash
Dashboard → Providers → Connect Codex
→ OAuth login (port 1455)
→ 5-hour + weekly reset

Models:
  cx/gpt-5.2-codex
  cx/gpt-5.1-codex-max
```

### Gemini CLI (ฟรี 180K/เดือน!)

```bash
Dashboard → Providers → Connect Gemini CLI
→ Google OAuth
→ 180K completions/month + 1K/day

Models:
  gc/gemini-3-flash-preview
  gc/gemini-2.5-pro
```

**คุ้มค่าที่สุด:** ระดับฟรีมหาศาล! ใช้สิ่งนี้ก่อนระดับที่ชำระเงิน

### นักบิน GitHub

```bash
Dashboard → Providers → Connect GitHub
→ OAuth via GitHub
→ Monthly reset (1st of month)

Models:
  gh/gpt-5
  gh/claude-4.5-sonnet
  gh/gemini-3-pro
```

</details>

<details>
<summary><b>🔑 ผู้ให้บริการคีย์ API</b></summary>
### NVIDIA NIM (ฟรี 1,000 เครดิต!)

1. ลงทะเบียน: [build.nvidia.com](https://build.nvidia.com)
2. รับคีย์ API ฟรี (รวมเครดิตการอนุมาน 1,000 รายการ)
3. แดชบอร์ด → เพิ่มผู้ให้บริการ → NVIDIA NIM:
   - คีย์ API: `nvapi-your-key`

**รุ่น:** `nvidia/llama-3.3-70b-instruct`, `nvidia/mistral-7b-instruct` และอีก 50+ รายการ

**เคล็ดลับสำหรับมือโปร:** API ที่เข้ากันได้กับ OpenAI — ทำงานได้อย่างราบรื่นกับการแปลรูปแบบของ OmniRoute!

### ดีปซีค

1. ลงทะเบียน: [platform.deepseek.com](https://platform.deepseek.com)
2. รับรหัส API
3. แดชบอร์ด → เพิ่มผู้ให้บริการ → DeepSeek

**รุ่น:** `deepseek/deepseek-chat`, `deepseek/deepseek-coder`

### Groq (มีระดับฟรี!)

1. ลงทะเบียน: [console.groq.com](https://console.groq.com)
2. รับคีย์ API (รวมเทียร์ฟรี)
3. แดชบอร์ด → เพิ่มผู้ให้บริการ → Groq

**รุ่น:** `groq/llama-3.3-70b`, `groq/mixtral-8x7b`

**เคล็ดลับสำหรับมือโปร:** การอนุมานที่รวดเร็วเป็นพิเศษ — ดีที่สุดสำหรับการเขียนโค้ดแบบเรียลไทม์!

### OpenRouter (มากกว่า 100 รุ่น)

1. ลงทะเบียน: [openrouter.ai](https://openrouter.ai)
2. รับรหัส API
3. แดชบอร์ด → เพิ่มผู้ให้บริการ → OpenRouter

**รุ่น:** เข้าถึงโมเดลมากกว่า 100 โมเดลจากผู้ให้บริการรายใหญ่ทั้งหมดผ่านคีย์ API เดียว

</details>

<details>
<summary><b>💰 ผู้ให้บริการราคาถูก (สำรอง)</b></summary>
### GLM-4.7 (รีเซ็ตรายวัน, $0.6/1M)

1. ลงทะเบียน: [Zhipu AI](https://open.bigmodel.cn/)
2. รับคีย์ API จาก Coding Plan
3. แดชบอร์ด → เพิ่มคีย์ API:
   - ผู้ให้บริการ: `glm`
   - คีย์ API: `your-key`

**ใช้:** `glm/glm-4.7`

**เคล็ดลับสำหรับมือโปร:** แผนการเขียนโค้ดเสนอโควต้า 3 เท่าในราคา 1/7! รีเซ็ตทุกวัน 10.00 น.

### MiniMax M2.1 (รีเซ็ต 5 ชม., $0.20/1M)

1. ลงทะเบียน: [MiniMax](https://www.minimax.io/)
2. รับรหัส API
3. แดชบอร์ด → เพิ่มคีย์ API

**ใช้:** `minimax/MiniMax-M2.1`

**เคล็ดลับสำหรับมือโปร:** ตัวเลือกที่ถูกที่สุดสำหรับบริบทที่ยาว (โทเค็น 1M)!

### Kimi K2 ($9/เดือน)

1. สมัครสมาชิก: [Moonshot AI](https://platform.moonshot.ai/)
2. รับรหัส API
3. แดชบอร์ด → เพิ่มคีย์ API

**ใช้:** `kimi/kimi-latest`

**เคล็ดลับสำหรับมือโปร:** แก้ไข $9/เดือนสำหรับโทเค็น 10M = $0.90/ต้นทุนที่แท้จริง 1M!

</details>

<details>
<summary><b>🆓 ผู้ให้บริการฟรี (การสำรองข้อมูลฉุกเฉิน)</b></summary>
### iFlow (ฟรี 8 รุ่น)

```bash
Dashboard → Connect iFlow
→ iFlow OAuth login
→ Unlimited usage

Models:
  if/kimi-k2-thinking
  if/qwen3-coder-plus
  if/glm-4.7
  if/minimax-m2
  if/deepseek-r1
```

### Qwen (ฟรี 3 รุ่น)

```bash
Dashboard → Connect Qwen
→ Device code authorization
→ Unlimited usage

Models:
  qw/qwen3-coder-plus
  qw/qwen3-coder-flash
```

### คิโระ (คลอดด์ฟรี)

```bash
Dashboard → Connect Kiro
→ AWS Builder ID or Google/GitHub
→ Unlimited usage

Models:
  kr/claude-sonnet-4.5
  kr/claude-haiku-4.5
```

</details>

<details>
<summary><b>🎨 สร้างคอมโบ</b></summary>
### ตัวอย่างที่ 1: เพิ่มการสมัครสมาชิกให้สูงสุด → การสำรองข้อมูลราคาถูก

```
Dashboard → Combos → Create New

Name: premium-coding
Models:
  1. cc/claude-opus-4-6 (Subscription primary)
  2. glm/glm-4.7 (Cheap backup, $0.6/1M)
  3. minimax/MiniMax-M2.1 (Cheapest fallback, $0.20/1M)

Use in CLI: premium-coding
```

### ตัวอย่างที่ 2: ฟรีเท่านั้น (ไม่มีค่าใช้จ่าย)

```
Name: free-combo
Models:
  1. gc/gemini-3-flash-preview (180K free/month)
  2. if/kimi-k2-thinking (unlimited)
  3. qw/qwen3-coder-plus (unlimited)

Cost: $0 forever!
```

</details>

<details>
<summary><b>ดำเนินการบูรณาการ CLI</b></summary>
### เคอร์เซอร์ IDE

```
Settings → Models → Advanced:
  OpenAI API Base URL: http://localhost:20128/v1
  OpenAI API Key: [from OmniRoute dashboard]
  Model: cc/claude-opus-4-6
```

### รหัสคลอด

ใช้หน้า **เครื่องมือ CLI** ในแดชบอร์ดสำหรับการกำหนดค่าด้วยคลิกเดียว หรือแก้ไข `~/.claude/settings.json` ด้วยตนเอง

### Codex CLI

```bash
export OPENAI_BASE_URL="http://localhost:20128"
export OPENAI_API_KEY="your-omniroute-api-key"

codex "your prompt"
```

### โอเพ่นคลอว์

**ตัวเลือก 1 — แดชบอร์ด (แนะนำ):**

```
Dashboard → CLI Tools → OpenClaw → Select Model → Apply
```

**ตัวเลือก 2 — กำหนดเอง:** แก้ไข `~/.openclaw/openclaw.json`:

```json
{
  "models": {
    "providers": {
      "omniroute": {
        "baseUrl": "http://127.0.0.1:20128/v1",
        "apiKey": "sk_omniroute",
        "api": "openai-completions"
      }
    }
  }
}
```

> **หมายเหตุ:** OpenClaw ใช้งานได้กับ OmniRoute ในพื้นที่เท่านั้น ใช้ `127.0.0.1` แทน `localhost` เพื่อหลีกเลี่ยงปัญหาความละเอียดของ IPv6

### ไคลน์ / ดำเนินการต่อ / RooCode

```
Settings → API Configuration:
  Provider: OpenAI Compatible
  Base URL: http://localhost:20128/v1
  API Key: [from OmniRoute dashboard]
  Model: if/kimi-k2-thinking
```

</details>

---

## 🐛 การแก้ไขปัญหา

<details>
<summary><b>คลิกเพื่อขยายคำแนะนำการแก้ปัญหา</b></summary>
**"โมเดลภาษาไม่ได้ระบุข้อความ"**

- โควต้าผู้ให้บริการหมด → ตรวจสอบตัวติดตามโควต้าแดชบอร์ด
- วิธีแก้ไข: ใช้ทางเลือกแบบคอมโบหรือเปลี่ยนไปใช้ระดับที่ถูกกว่า

**จำกัดอัตรา**

- โควต้าการสมัครสมาชิกหมด → สำรองไปที่ GLM/MiniMax
- เพิ่มคอมโบ: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`

**โทเค็น OAuth หมดอายุแล้ว**

- รีเฟรชอัตโนมัติโดย OmniRoute
- หากปัญหายังคงอยู่: แดชบอร์ด → ผู้ให้บริการ → เชื่อมต่อใหม่

**ค่าใช้จ่ายสูง**

- ตรวจสอบสถิติการใช้งานในแดชบอร์ด → ต้นทุน
- เปลี่ยนโมเดลหลักเป็น GLM/MiniMax
- ใช้ระดับฟรี (Gemini CLI, iFlow) สำหรับงานที่ไม่สำคัญ

**แดชบอร์ดเปิดผิดพอร์ต**

- ตั้งค่า `PORT=20128` และ `NEXT_PUBLIC_BASE_URL=http://localhost:20128`

**ข้อผิดพลาดในการซิงค์คลาวด์**

- ตรวจสอบ `BASE_URL` ชี้ไปยังอินสแตนซ์ที่ทำงานอยู่ของคุณ
- ตรวจสอบ `CLOUD_URL` ชี้ไปยังจุดปลายทางคลาวด์ที่คุณคาดหวัง
- เก็บค่า `NEXT_PUBLIC_*` ให้สอดคล้องกับค่าฝั่งเซิร์ฟเวอร์

**เข้าสู่ระบบครั้งแรกใช้งานไม่ได้**

- ตรวจสอบ `INITIAL_PASSWORD` ใน `.env`
- หากไม่ได้ตั้งค่า รหัสผ่านสำรองจะเป็น `123456`

** ไม่มีบันทึกคำขอ **

- ตั้งค่า `ENABLE_REQUEST_LOGS=true` ใน `.env`

**การทดสอบการเชื่อมต่อแสดงว่า "ไม่ถูกต้อง" สำหรับผู้ให้บริการที่รองรับ OpenAI**

- ผู้ให้บริการหลายรายไม่เปิดเผยปลายทาง `/models`
- OmniRoute v1.0.6+ มีการตรวจสอบทางเลือกผ่านการแชทให้เสร็จสิ้น
- ตรวจสอบให้แน่ใจว่า URL ฐานมีคำต่อท้าย `/v1`

### 🔐 OAuth ในเซิร์ฟเวอร์ Remoto (การตั้งค่า OAuth ระยะไกล)

<a name="oauth-em-servidor-remoto"></a>

> **⚠️ สิ่งสำคัญสำหรับการใช้ OmniRoute กับ VPS/Docker/servidor remoto**

### OAuth

ระบบปฏิบัติการ **Antigravity** และ **Gemini CLI** ใช้ **Google OAuth 2.0** สำหรับการรับรองความถูกต้อง O Google ต้องการ `redirect_uri` usada no fluxo OAuth seja **exatamente** uma das URIs pré-cadastradas no Google Cloud Console do aplicativo.

ตามที่รับรอง OAuth embutidas no OmniRoute estão cadastradas **apenas para `localhost`**. ต้องการใช้ OmniRoute ในเซิร์ฟเวอร์ remoto (เช่น `https://omniroute.meuservidor.com`) หรือ Google ตรวจสอบ com autenticação:

```
Error 400: redirect_uri_mismatch
```

### วิธีแก้ปัญหา: กำหนดค่า suas próprias credenciais OAuth

อยู่ในนั้นโดยตรง **OAuth 2.0 Client ID** ไม่มี Google Cloud Console พร้อม URI สำหรับเซิร์ฟเวอร์

#### เยี่ยมเลย

**1. เข้าถึง Google Cloud Console**

อับรา: [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)

**2. ฉันเพิ่งค้นพบ OAuth 2.0 Client ID**

- คลิก em **"+ สร้างข้อมูลรับรอง"** → **"รหัสไคลเอ็นต์ OAuth"**
- เคล็ดลับการใช้งาน: **"แอปพลิเคชันเว็บ"**
- ชื่อ: ชื่อ escolha qualquer (เช่น: `OmniRoute Remote`)

**3. Adicione เป็น URI การเปลี่ยนเส้นทางที่ได้รับอนุญาต**

ไม่มีค่าย **"URI การเปลี่ยนเส้นทางที่ได้รับอนุญาต"** ผู้สนับสนุน:

```
https://seu-servidor.com/callback
```

> Substitua `seu-servidor.com` pelo domínio ou IP do seu servidor (รวม porta se necessário เช่น `http://45.33.32.156:20128/callback`)

**4. Salve e copy as credenciais**

อ้างอิงถึง Google มากที่สุด o **Client ID** e o **Client Secret**

**5. กำหนดค่าเป็น variáveis de Ambiente**

ไม่มี `.env` (คุณมีตัวเลือกอื่นสำหรับ Docker):

```bash
# Para Antigravity:
ANTIGRAVITY_OAUTH_CLIENT_ID=seu-client-id.apps.googleusercontent.com
ANTIGRAVITY_OAUTH_CLIENT_SECRET=GOCSPX-seu-secret

# Para Gemini CLI:
GEMINI_OAUTH_CLIENT_ID=seu-client-id.apps.googleusercontent.com
GEMINI_OAUTH_CLIENT_SECRET=GOCSPX-seu-secret
GEMINI_CLI_OAUTH_CLIENT_SECRET=GOCSPX-seu-secret
```

**6. ย้อนกลับไปสู่ OmniRoute**

```bash
# Se usando npm:
npm run dev

# Se usando Docker:
docker restart omniroute
```

**7. เต็นท์ คอนเนกตาร์ โนวาเมนเต**

แดชบอร์ด → ผู้ให้บริการ → Antigravity (หรือ Gemini CLI) → OAuth

ภาพรวมของ Google การแก้ไขสำหรับ `https://seu-servidor.com/callback` และการรับรองความถูกต้อง

---

### วิธีแก้ปัญหาชั่วคราว (sem configurar credenciais próprias)

Se não quiser criar credenciais próprias agora, ainda é possível usar o fluxo **manual de URL**:

1. O OmniRoute ย่อ URL อัตโนมัติของ Google
2. Após você autorizar, o Google tentará redirecionar para `localhost` (que falha no servidor remoto)
3. **คัดลอก URL ที่สมบูรณ์** da barra de endereço do seu browser (mesmo que a página não carregue)
4. Cole essa URL no campo que aparece no modal de conexão do OmniRoute
5. คลิกที่นี่ **"เชื่อมต่อ"**

> วิธีแก้ปัญหาเบื้องต้นคือทำการเปลี่ยนเส้นทางโดยอัตโนมัติและทำการเปลี่ยนเส้นทางโดยอัตโนมัติ

</details>

---

## 🛠️

- **รันไทม์**: Node.js 18–22 LTS (⚠️ Node.js 24+ ไม่ได้รับการสนับสนุน\*\* — `better-sqlite3` ไบนารีดั้งเดิมเข้ากันไม่ได้)
- **ภาษา**: TypeScript 5.9 — **100% TypeScript** ทั่วทั้ง `src/` และ `open-sse/` (v1.0.6)
- **เฟรมเวิร์ก**: Next.js 16 + React 19 + Tailwind CSS 4
- **ฐานข้อมูล**: LowDB (JSON) + SQLite (สถานะโดเมน + บันทึกพร็อกซี)
- **การสตรีม**: เหตุการณ์ที่เซิร์ฟเวอร์ส่ง (SSE)
- **Auth**: OAuth 2.0 (PKCE) + JWT + คีย์ API
- **การทดสอบ**: ตัวรันการทดสอบ Node.js (การทดสอบหน่วยมากกว่า 368 รายการ)
- **CI/CD**: การดำเนินการ GitHub (เผยแพร่ npm อัตโนมัติ + Docker Hub เมื่อวางจำหน่าย)
- **เว็บไซต์**: [omniroute.online](https://omniroute.online)
- **แพ็คเกจ**: [npmjs.com/package/omniroute](https://www.npmjs.com/package/omniroute)
- **นักเทียบท่า**: [hub.docker.com/r/diegosouzapw/omniroute](https://hub.docker.com/r/diegosouzapw/omniroute)
- **ความยืดหยุ่น**: เซอร์กิตเบรกเกอร์, การถอยกลับแบบเอ็กซ์โปเนนเชียล, การป้องกันฝูงฟ้าผ่า, การปลอมแปลง TLS

---

## 📖 เอกสารประกอบ

| เอกสาร                                       | คำอธิบาย                                              |
| -------------------------------------------- | ----------------------------------------------------- |
| [User Guide](docs/USER_GUIDE.md)             | ผู้ให้บริการ, คอมโบ, การรวม CLI, การปรับใช้           |
| [API Reference](docs/API_REFERENCE.md)       | จุดสิ้นสุดทั้งหมดพร้อมตัวอย่าง                        |
| [Troubleshooting](docs/TROUBLESHOOTING.md)   | ปัญหาและแนวทางแก้ไขทั่วไป                             |
| [Architecture](docs/ARCHITECTURE.md)         | สถาปัตยกรรมระบบและภายใน                               |
| [Contributing](CONTRIBUTING.md)              | การตั้งค่าและแนวทางการพัฒนา                           |
| [OpenAPI Spec](docs/openapi.yaml)            | ข้อมูลจำเพาะของ OpenAPI 3.0                           |
| [Security Policy](SECURITY.md)               | การรายงานช่องโหว่และแนวปฏิบัติด้านความปลอดภัย         |
| [VM Deployment](docs/VM_DEPLOYMENT_GUIDE.md) | คู่มือฉบับสมบูรณ์: VM + nginx + การตั้งค่า Cloudflare |
| [Features Gallery](docs/FEATURES.md)         | ทัวร์ชมแดชบอร์ดภาพพร้อมภาพหน้าจอ                      |

### 📸 ดูตัวอย่างแดชบอร์ด

<details>
<summary><b>คลิกเพื่อดูภาพหน้าจอแดชบอร์ด</b></summary>
| หน้า                | ภาพหน้าจอ                                         |
| ------------------- | ------------------------------------------------- |
| **ผู้ให้บริการ**    | ![Providers](docs/screenshots/01-providers.png)   |
| **คอมโบ**           | ![Combos](docs/screenshots/02-combos.png)         |
| **การวิเคราะห์**    | ![Analytics](docs/screenshots/03-analytics.png)   |
| **สุขภาพ**          | ![Health](docs/screenshots/04-health.png)         |
| **นักแปล**          | ![Translator](docs/screenshots/05-translator.png) |
| **การตั้งค่า**      | ![Settings](docs/screenshots/06-settings.png)     |
| **เครื่องมือ CLI**  | ![CLI Tools](docs/screenshots/07-cli-tools.png)   |
| **บันทึกการใช้งาน** | ![Usage](docs/screenshots/08-usage.png)           |
| **จุดสิ้นสุด**      | ![Endpoint](docs/screenshots/09-endpoint.png)     |

</details>

---

## 🗺️

OmniRoute มี **ฟีเจอร์มากกว่า 210 รายการที่วางแผน** ไว้ในขั้นตอนการพัฒนาหลายขั้นตอน นี่คือประเด็นสำคัญ:

| หมวดหมู่                                   | คุณสมบัติที่วางแผนไว้ | ไฮไลท์                                                                                                        |
| ------------------------------------------ | --------------------- | ------------------------------------------------------------------------------------------------------------- |
| 🧠 **การกำหนดเส้นทางและความฉลาด**          | 25+                   | การกำหนดเส้นทางที่มีความหน่วงต่ำที่สุด, การกำหนดเส้นทางตามแท็ก, โควต้า preflight, การเลือกบัญชี P2C           |
| 🔒 **ความปลอดภัยและการปฏิบัติตามข้อกำหนด** | 20+                   | การเสริมความแข็งแกร่งของ SSRF, การปิดบังข้อมูลรับรอง, ขีดจำกัดอัตราต่อจุดสิ้นสุด, การกำหนดขอบเขตคีย์การจัดการ |
| 📊 **ความสามารถในการสังเกต**               | 15+                   | การรวม OpenTelemetry การตรวจสอบโควต้าแบบเรียลไทม์ การติดตามต้นทุนต่อรุ่น                                      |
| 🔄 **การบูรณาการของผู้ให้บริการ**          | 20+                   | การลงทะเบียนโมเดลแบบไดนามิก, คูลดาวน์ของผู้ให้บริการ, Codex หลายบัญชี, การแยกวิเคราะห์โควต้า Copilot          |
| ⚡ **ประสิทธิภาพ**                         | 15+                   | เลเยอร์แคชคู่, แคชพร้อมท์, แคชการตอบสนอง, การสตรีมแบบ Keepalive, ชุด API                                      |
| 🌐 **ระบบนิเวศ**                           | 10+                   | WebSocket API, กำหนดค่า hot-reload, การจัดเก็บ config แบบกระจาย, โหมดเชิงพาณิชย์                              |

### 🔜 เร็วๆ นี้

- 🔗 **การรวม OpenCode** — รองรับผู้ให้บริการเนทีฟสำหรับ IDE การเข้ารหัส OpenCode AI
- 🔗 **การบูรณาการ TRAE** — รองรับกรอบการพัฒนา TRAE AI อย่างเต็มที่
- 📦 **Batch API** — การประมวลผลแบบแบตช์แบบอะซิงโครนัสสำหรับคำขอจำนวนมาก
- 🎯 **การกำหนดเส้นทางตามแท็ก** — คำขอกำหนดเส้นทางตามแท็กที่กำหนดเองและข้อมูลเมตา
- 💰 **กลยุทธ์ต้นทุนต่ำสุด** — เลือกผู้ให้บริการที่ถูกที่สุดโดยอัตโนมัติ

> dict ข้อมูลจำเพาะคุณสมบัติแบบเต็มมีอยู่ใน [link](docs/new-features/) (ข้อมูลจำเพาะโดยละเอียด 217 รายการ)

---

## 👥 ผู้มีส่วนร่วม

[![Contributors](https://contrib.rocks/image?repo=diegosouzapw/OmniRoute&max=100&columns=20&anon=1)](https://github.com/diegosouzapw/OmniRoute/graphs/contributors)

### วิธีการมีส่วนร่วม

1. แยกพื้นที่เก็บข้อมูล
2. สร้างสาขาคุณลักษณะของคุณ (`git checkout -b feature/amazing-feature`)
3. ยอมรับการเปลี่ยนแปลงของคุณ (`git commit -m 'Add amazing feature'`)
4. กดไปที่สาขา (`git push origin feature/amazing-feature`)
5. เปิดคำขอดึง

ดู [CONTRIBUTING.md](CONTRIBUTING.md) สำหรับคำแนะนำโดยละเอียด

### เปิดตัวเวอร์ชันใหม่

```bash
# Create a release — npm publish happens automatically
gh release create v1.0.6 --title "v1.0.6" --generate-notes
```

---

## 📊 ประวัติดารา

## Stargazers over time

## [![Stargazers over time](https://starchart.cc/diegosouzapw/OmniRoute.svg?variant=adaptive)](https://starchart.cc/diegosouzapw/OmniRoute)

## 🙏ขอบพระคุณ

ขอขอบคุณเป็นพิเศษกับ **[9router](https://github.com/decolua/9router)** โดย **[decolua](https://github.com/decolua)** — โปรเจ็กต์ดั้งเดิมที่เป็นแรงบันดาลใจให้กับ Fork นี้ OmniRoute สร้างบนรากฐานอันน่าทึ่งดังกล่าวด้วยคุณสมบัติเพิ่มเติม API หลายรูปแบบ และการเขียน TypeScript ใหม่ทั้งหมด

ขอขอบคุณเป็นพิเศษสำหรับ **[CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI)** — การใช้งาน Go ดั้งเดิมที่เป็นแรงบันดาลใจให้กับพอร์ต JavaScript นี้

---

## 📄 ใบอนุญาต

ใบอนุญาต MIT - ดู [LICENSE](LICENSE) สำหรับรายละเอียด

---

<div align="center">
  <sub>สร้างด้วย ❤️ สำหรับนักพัฒนาที่เขียนโค้ด 24/7</sub>
  <br/>
  <sub><a href="https://omniroute.online">omniroute.online</a> 
</div>
