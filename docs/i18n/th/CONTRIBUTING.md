# Contributing to OmniRoute (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇧🇦 [bs](../bs/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Thank you for your interest in contributing! This guide covers everything you need to get started.

---

## การตั้งค่าสภาพแวดล้อมสำหรับการพัฒนา

### ข้อกำหนดเบื้องต้น

- **Node.js** `>=22.22.2 <23` หรือ `>=24.0.0 <27` (แนะนำ: 24 LTS)
- **npm** 10+

> **สำหรับผู้ใช้ npm v11+ (Node 24+):** หลังจากรัน `npm install` ให้ตรวจสอบว่าโมดูลเนทีฟได้รับการติดตั้งแล้ว:
> `node -e "require('better-sqlite3')"`. หากคำสั่งล้มเหลวพร้อมข้อผิดพลาด `MODULE_NOT_FOUND`
> ให้รัน `npm approve-scripts better-sqlite3 && npm install` ดูข้อมูลเพิ่มเติมที่
> [การแก้ไขปัญหา](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module)

- **Git**

### โคลนและติดตั้ง

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### ตัวแปรสภาพแวดล้อม

```bash
# สร้างไฟล์ .env จากเทมเพลต
cp .env.example .env

# สร้างค่าลับที่จำเป็น
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

ตัวแปรสำคัญสำหรับการพัฒนา:

| ตัวแปร                 | ค่าเริ่มต้นสำหรับการพัฒนา | คำอธิบาย                             |
| ---------------------- | ------------------------- | ------------------------------------ |
| `PORT`                 | `20128`                   | พอร์ตของเซิร์ฟเวอร์                  |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128`  | URL ฐานสำหรับฟรอนต์เอนด์             |
| `JWT_SECRET`           | (สร้างตามขั้นตอนด้านบน)   | ค่าลับสำหรับลงนาม JWT                |
| `INITIAL_PASSWORD`     | `CHANGEME`                | รหัสผ่านสำหรับการเข้าสู่ระบบครั้งแรก |
| `APP_LOG_LEVEL`        | `info`                    | ระดับความละเอียดของบันทึก            |

### การตั้งค่าแดชบอร์ด

แดชบอร์ดมีตัวเลือก UI สำหรับเปิดหรือปิดฟีเจอร์ต่าง ๆ ซึ่งสามารถกำหนดค่าผ่านตัวแปรสภาพแวดล้อมได้เช่นกัน:

| ตำแหน่งการตั้งค่า    | ตัวเลือก           | คำอธิบาย                                |
| -------------------- | ------------------ | --------------------------------------- |
| การตั้งค่า → ขั้นสูง | โหมดดีบัก          | เปิดใช้งานบันทึกคำขอสำหรับการดีบัก (UI) |
| การตั้งค่า → ทั่วไป  | การแสดงแถบด้านข้าง | แสดง/ซ่อนส่วนต่าง ๆ ของแถบด้านข้าง      |

การตั้งค่าเหล่านี้จะถูกจัดเก็บไว้ในฐานข้อมูลและยังคงอยู่หลังการรีสตาร์ต โดยจะแทนที่ค่าเริ่มต้นจากตัวแปรสภาพแวดล้อมเมื่อมีการกำหนดค่า

### การรันภายในเครื่อง

```bash
# โหมดการพัฒนา (โหลดใหม่อัตโนมัติ)
npm run dev

# บิลด์สำหรับโปรดักชัน
npm run build    # next build → .build/next/ จากนั้น assembleStandalone → dist/
npm run start

# คอมไพล์เฉพาะแบ็กเอนด์/API อย่างรวดเร็วสำหรับการเปลี่ยนแปลงของผู้ร่วมพัฒนา
npm run build:contributor

# บิลด์สำหรับรีลีส (บิลด์ใหม่ทั้งหมด + ตัวตรวจสอบ HEAD — จำเป็นสำหรับการ deploy)
npm run build:release   # rm -rf .build dist แล้วบิลด์ + เขียน dist/BUILD_SHA

# การกำหนดค่าพอร์ตทั่วไป
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

บิลด์สำหรับผู้ร่วมพัฒนาจะตรวจสอบเฉพาะการคอมไพล์ โดยจะไม่ประกอบชุดเผยแพร่แบบสแตนด์อโลน
หรือบิลด์แอสเซตแพ็กเกจเนทีฟที่เป็นตัวเลือก ใช้บิลด์สำหรับโปรดักชันตามปกติเมื่อ
ต้องการตรวจสอบชุดไฟล์ที่พร้อมเผยแพร่

### โครงสร้างผลลัพธ์ของบิลด์

| ไดเรกทอรี | เนื้อหา                                                                                    | ติดตามในระบบควบคุมเวอร์ชัน |
| --------- | ------------------------------------------------------------------------------------------ | -------------------------- |
| `src/`    | ซอร์สของแอปพลิเคชัน (TypeScript / TSX)                                                     | ใช่                        |
| `.build/` | ไฟล์ระหว่างกระบวนการ — ผลลัพธ์จาก `next build` (ถูกละเว้นโดย Git, `distDir = .build/next`) | ไม่                        |
| `dist/`   | ชุดไฟล์ที่พร้อมเผยแพร่ — ประกอบโดย `assembleStandalone` (ถูกละเว้นโดย Git)                 | ไม่                        |

ไปป์ไลน์การบิลด์ทำงานแบบรอบเดียว:

```
npm run build
  └─ next build → .build/next/standalone  (ผลลัพธ์จาก Next.js)
  └─ assembleStandalone()                 (คัดลอกไฟล์สแตนด์อโลน + static + public + แอสเซตเนทีฟ)
       └─ ผลลัพธ์: dist/                   (server.js, .next/static/, public/, node_modules/)
```

นอกจากนี้ `npm run build:release` จะล้างทั้งสองไดเรกทอรีก่อน แล้วเขียน
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`) เพื่อใช้เป็นตัวตรวจสอบความถูกต้องในการ deploy

`npm run build:contributor` ใช้โปรไฟล์การบิลด์เฉพาะแบ็กเอนด์ โดยจะแทนที่ไฟล์
UI ของแดชบอร์ดด้วยไฟล์ชั่วคราวระหว่างการบิลด์ เก็บตัวจัดการเส้นทาง API ไว้ และคืนค่าไฟล์ต้นฉบับ
หลังจากบิลด์เสร็จ ใช้ `npm run build` สำหรับการเปลี่ยนแปลงที่ส่งผลต่อ UI ของแดชบอร์ด หรือสำหรับ
การตรวจสอบรีลีสแบบเต็มรูปแบบ โปรไฟล์สำหรับผู้ร่วมพัฒนาไม่สามารถใช้แทนบิลด์สำหรับรีลีสได้

> **หมายเหตุเกี่ยวกับการ deploy บน VPS:** ไดเรกทอรีอิมเมจระยะไกล `/usr/lib/node_modules/omniroute/app/`
> ยังคงไม่เปลี่ยนแปลง เครื่องมือสำหรับ deploy จะใช้ rsync เพื่อซิงค์เนื้อหาของ `dist/` ไปยังไดเรกทอรีดังกล่าว
> มีเพียงพาธผลลัพธ์ของบิลด์ภายในรีโพซิทอรีเท่านั้นที่เปลี่ยนแปลง (`app/` → `dist/`)

URL เริ่มต้น:

- **แดชบอร์ด**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## เวิร์กโฟลว์ Git

> ⚠️ **ห้าม commit ไปยัง `main` โดยตรงโดยเด็ดขาด** ให้ใช้ feature branch เสมอ
>
> **ฐานของ PR:** กำหนดเป้าหมายเป็น branch `release/vX.Y.Z` ที่ใช้งานอยู่ (ไม่ใช่ `main`) โปรดดู
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md) สำหรับโมเดล
> หนึ่ง branch ต่อหนึ่ง release + สร้าง tag เมื่อเผยแพร่

```bash
# สร้าง branch จากปลาย branch ของ release ที่ใช้งานอยู่ (ตัวอย่าง: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... ทำการแก้ไข ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# เปิด Pull Request โดยกำหนด base = release/v3.8.49
```

### การตั้งชื่อ Branch

| Prefix      | วัตถุประสงค์                 |
| ----------- | ---------------------------- |
| `feat/`     | ฟีเจอร์ใหม่                  |
| `fix/`      | การแก้ไขบั๊ก                 |
| `refactor/` | การปรับโครงสร้างโค้ด         |
| `docs/`     | การเปลี่ยนแปลงเอกสาร         |
| `test/`     | การเพิ่ม/แก้ไขการทดสอบ       |
| `chore/`    | เครื่องมือ, CI, dependencies |

### ข้อความ Commit

ปฏิบัติตาม [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
```

Scopes (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## การรันการทดสอบ

```bash
# การทดสอบทั้งหมด (unit + vitest + ecosystem + e2e)
npm run test:all

# ไฟล์ทดสอบเดียว (ตัวรันการทดสอบแบบเนทีฟของ Node.js — การทดสอบส่วนใหญ่ใช้วิธีนี้)
node --import tsx/esm --test tests/unit/your-file.test.ts

# เฉพาะการทดสอบหน่วยที่ได้รับผลกระทบจากการเปลี่ยนแปลงของคุณ (ใช้ตัวเลือก TIA เดียวกับเกต CI, #8084)
npm run test:scoped            # การเปลี่ยนแปลงในคอมมิตล่าสุด (หรือ working tree)
npm run test:scoped:staged     # เฉพาะการเปลี่ยนแปลงที่ staged — เหมาะสำหรับใช้คู่กับการรันก่อนคอมมิต
npm run test:scoped:full       # สร้างแผนผังกราฟการนำเข้าใหม่ก่อน (หลังจากเพิ่ม/ย้ายไฟล์)
# Exit 1 + "run the full suite" หมายความว่าไฟล์ศูนย์กลาง (tsconfig, package.json, …) หรือซอร์ส
# ที่ไม่ได้แมปมีการเปลี่ยนแปลง — ตัวเลือกจะล้มเหลวอย่างปลอดภัย โดยจะไม่ข้ามการทดสอบอย่างเงียบ ๆ

# Vitest (เซิร์ฟเวอร์ MCP, autoCombo, แคช)
npm run test:vitest

# การทดสอบ E2E (ต้องใช้ Playwright)
npm run test:e2e

# E2E สำหรับไคลเอนต์โปรโตคอล (การขนส่ง MCP, A2A)
npm run test:protocols:e2e

# การทดสอบความเข้ากันได้กับระบบนิเวศ
npm run test:ecosystem

# เกตความครอบคลุม: statements/lines/functions/branches 60%
npm run test:coverage
npm run coverage:report

# ตรวจสอบ lint + รูปแบบ
npm run lint
npm run check

# การทดสอบ smoke ของคอมโบกับ upstream จริงแบบมีเกต (ต้องมีสิทธิ์เข้าถึง VPS + เครดิตของผู้ให้บริการจริง)
# เรียกใช้ผู้ให้บริการจริง — มีค่าใช้จ่ายเล็กน้อย ไม่เคยรันใน CI และจะข้ามอย่างเรียบร้อยหากไม่มีเกต
# ต้องมี: สิทธิ์เข้าถึง ssh root@192.168.0.15 (โหลดสแนปช็อต DB แบบอ่านอย่างเดียวจาก VPS)
RUN_COMBO_LIVE=1 npm run test:combo:live

# การทดสอบ smoke แบบไลฟ์บน VPS ระยะที่ 3 — สคริปต์ Node ESM ธรรมดาที่เรียกเซิร์ฟเวอร์ .15 โดยตรง
# ต้องมี: สิทธิ์เข้าถึง ssh root@192.168.0.15 (สร้าง/รื้อคอมโบผ่าน SSH sqlite)
# เรียกใช้ผู้ให้บริการจริง (มีค่าใช้จ่ายเล็กน้อย) สร้าง/ลบเฉพาะคอมโบ __live_test__* เท่านั้น และไม่เคยรันใน CI
# REQUIRE_API_KEY=false บน .15 จึงไม่ต้องใช้ API key แต่จะใช้ COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY หากตั้งค่าไว้
npm run test:combo:live:vps              # สถานการณ์ HTTP 7 แบบ (priority/round-robin/weighted/cost/fusion/auto + health)
npm run test:combo:live:vps:failover     # เพิ่มสถานการณ์ failover ข้ามผู้ให้บริการจริง (รวมทั้งหมด 8 แบบ)
```

หมายเหตุเกี่ยวกับความครอบคลุม:

- `npm run test:coverage` วัดความครอบคลุมของซอร์สสำหรับชุดการทดสอบหน่วยหลัก ไม่รวม `tests/**` และรวม `open-sse/**`
- Pull request ต้องรักษาเกตความครอบคลุมไว้ที่ **60%+** สำหรับ statements/lines/functions/branches
- หาก PR เปลี่ยนแปลงโค้ดที่ใช้จริงใน `src/`, `open-sse/`, `electron/` หรือ `bin/` ต้องเพิ่มหรืออัปเดตการทดสอบอัตโนมัติใน PR เดียวกัน
- `npm run coverage:report` แสดงรายงานโดยละเอียดแยกตามไฟล์จากการรันความครอบคลุมครั้งล่าสุด
- `npm run test:coverage:legacy` เก็บเมตริกแบบเดิมไว้เพื่อการเปรียบเทียบย้อนหลัง
- ดูแผนงานการปรับปรุงความครอบคลุมแบบเป็นระยะได้ที่ `docs/ops/COVERAGE_PLAN.md`

### ข้อกำหนดสำหรับ Pull Request

ก่อนเปิด PR ให้ใช้
[แนวทางมาตรฐานสำหรับการมีส่วนร่วม](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) เพื่อรันวงจรแบบเจาะจงสำหรับ
สิ่งที่คุณเปลี่ยนแปลง ชุดการทดสอบหน่วยทั้งหมด (4 ชาร์ดของ CI), Vitest, เกตความครอบคลุม **60%+** และ
บิลด์สำหรับใช้งานจริงเป็นความรับผิดชอบของ CI — การรันสิ่งเหล่านี้ในเครื่องไม่ได้ให้สัญญาณเพิ่มเติมนอกเหนือจากที่การตรวจสอบ PR
จะให้คุณอยู่แล้ว และบนเครื่องขนาดเล็กอาจทำให้โฮสต์ใช้ทรัพยากรเต็มขีดจำกัดได้ (#8084):

- รันไฟล์ทดสอบที่ครอบคลุมการเปลี่ยนแปลงของคุณ: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- รัน `npm run lint`
- เพิ่มหรืออัปเดตการทดสอบอัตโนมัติใน PR เดียวกันทุกครั้งที่โค้ดสำหรับใช้งานจริงมีการเปลี่ยนแปลง
- ระบุไฟล์ทดสอบที่เปลี่ยนแปลงหรือเพิ่มเข้ามาในคำอธิบาย PR เมื่อโค้ดสำหรับใช้งานจริงมีการเปลี่ยนแปลง
- ตรวจสอบผลลัพธ์ SonarQube บน PR เมื่อมีการกำหนดค่าความลับของโปรเจกต์ใน CI

สถานะการทดสอบปัจจุบัน: **ไฟล์การทดสอบหน่วย 122 ไฟล์** ซึ่งครอบคลุม:

- ตัวแปลของผู้ให้บริการและการแปลงรูปแบบ
- การจำกัดอัตรา, circuit breaker และความทนทาน
- แคชเชิงความหมาย, idempotency และการติดตามความคืบหน้า
- การดำเนินการกับฐานข้อมูลและสคีมา (โมดูล DB 21 โมดูล)
- โฟลว์ OAuth และการยืนยันตัวตน
- การตรวจสอบความถูกต้องของ API endpoint (Zod v4)
- เครื่องมือเซิร์ฟเวอร์ MCP และการบังคับใช้ขอบเขต
- ระบบ Memory และ Skills

---

## รูปแบบโค้ด

- **ESLint** — รัน `npm run lint` ก่อน commit
- **Prettier** — จัดรูปแบบอัตโนมัติผ่าน `lint-staged` เมื่อ commit (เยื้อง 2 ช่อง, ใช้ semicolon, ใช้ double quote, ความกว้าง 100 อักขระ, ใช้ trailing comma แบบ es5)
- **TypeScript** — โค้ดทั้งหมดใน `src/` ใช้ `.ts`/`.tsx`; `open-sse/` ใช้ `.ts`/`.js`; เขียนเอกสารด้วย TSDoc (`@param`, `@returns`, `@throws`)
- **ห้ามใช้ `eval()`** — ESLint บังคับใช้ `no-eval`, `no-implied-eval`, `no-new-func`
- **การตรวจสอบความถูกต้องด้วย Zod** — ใช้สคีมา Zod v4 สำหรับการตรวจสอบอินพุต API ทั้งหมด
- **การตั้งชื่อ**: ไฟล์ = camelCase/kebab-case, คอมโพเนนต์ = PascalCase, ค่าคงที่ = UPPER_SNAKE

### การจัดการข้อผิดพลาด / บล็อก catch ว่าง

ห้ามปล่อย `catch` ไว้โดยไม่มีคำอธิบาย ให้จัดประเภทเป็นหนึ่งในสองกลุ่ม (เพื่อให้กฎเคร่งครัด
ที่ว่า "ห้ามกลืนข้อผิดพลาดในสตรีม SSE โดยไม่แจ้งให้ทราบ" สามารถนำไปปฏิบัติได้):

- **โดยเจตนา (การทำความสะอาด/การเก็บข้อมูล telemetry แบบพยายามให้ดีที่สุดของเราเอง)** — ความล้มเหลวในจุดนี้เป็นสิ่งที่คาดไว้และ
  ไม่เป็นอันตราย; เพิ่มความคิดเห็นอธิบายเหตุผลหนึ่งบรรทัดโดยไม่ต้องบันทึก log (การบันทึก log ในทุกคำขอคือ
  สัญญาณรบกวนที่แนวทางนี้ต้องการหลีกเลี่ยง)

  ```ts
  } catch {} // การปิด controller ที่ปิดไปแล้วหลังจากไคลเอนต์ตัดการเชื่อมต่อเป็นสิ่งที่คาดไว้
  ```

- **ควรบันทึก log (โค้ดภายนอก/โค้ดที่ผู้เรียกส่งเข้ามา หรือการกลืนข้อผิดพลาดทำให้โฟลว์การควบคุมเปลี่ยนไป)** — คง
  `catch` ไว้ (ห้ามปล่อยให้ทำให้สตรีมล้มเหลว) แต่ให้แสดง `console.debug`/`warn` พร้อมบริบทเพื่อให้
  สามารถตรวจพบความล้มเหลวได้

  ```ts
  } catch (e) {
    console.debug("[STREAM] onFailure callback error:", e);
  }
  ```

ดูตัวอย่างการนำไปใช้ได้ที่ `open-sse/utils/stream.ts` และ `open-sse/utils/streamHandler.ts`

---

## โครงสร้างโปรเจกต์

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # หน้าแดชบอร์ด (23 ส่วน)
│   ├── api/                # เส้นทาง API (51 ไดเรกทอรี)
│   └── login/              # หน้าการยืนยันตัวตน (.tsx)
├── domain/                 # กลไกนโยบาย (policyEngine, comboResolver, costRules ฯลฯ)
├── lib/                    # ตรรกะธุรกิจหลัก (.ts)
│   ├── a2a/                # เซิร์ฟเวอร์โปรโตคอล Agent-to-Agent v0.3
│   ├── acp/                # รีจิสทรี Agent Communication Protocol
│   ├── compliance/         # กลไกนโยบายการปฏิบัติตามข้อกำหนด
│   ├── db/                 # โมดูลโดเมน SQLite + การย้ายฐานข้อมูล 130 รายการ
│   ├── memory/             # หน่วยความจำการสนทนาแบบถาวร
│   ├── oauth/              # ผู้ให้บริการ บริการ และยูทิลิตี OAuth
│   ├── skills/             # เฟรมเวิร์กทักษะที่ขยายได้
│   ├── usage/              # การติดตามการใช้งานและการคำนวณต้นทุน
│   └── localDb.ts          # ชั้น re-export เท่านั้น — ห้ามเพิ่มตรรกะที่นี่
├── middleware/              # มิดเดิลแวร์คำขอ (promptInjectionGuard)
├── mitm/                   # พร็อกซี MITM (ใบรับรอง, DNS, การกำหนดเส้นทางเป้าหมาย)
├── shared/
│   ├── components/         # คอมโพเนนต์ React (.tsx)
│   ├── constants/          # นิยามผู้ให้บริการ (329), ขอบเขต MCP, กลยุทธ์การกำหนดเส้นทาง 21 รายการ
│   ├── utils/              # เซอร์กิตเบรกเกอร์, ตัวทำความสะอาดข้อมูล, ตัวช่วยการยืนยันตัวตน
│   └── validation/         # สคีมา Zod v4
└── sse/                    # ไปป์ไลน์พร็อกซี SSE

open-sse/                   # เวิร์กสเปซ @omniroute/open-sse
├── executors/              # โมดูลตัวดำเนินการ 150 รายการ (คลาสตัวดำเนินการ + ตัวช่วยสำหรับผู้ให้บริการแต่ละราย)
├── handlers/               # ตัวจัดการคำขอ 11 รายการ (แชต, การตอบกลับ, embeddings, รูปภาพ ฯลฯ)
├── mcp-server/             # เซิร์ฟเวอร์ MCP (เครื่องมือที่ไม่ซ้ำกัน 110 รายการ, การขนส่ง 3 รูปแบบ, ขอบเขต 33 รายการ)
├── services/               # บริการระดับบนสุด 178 รายการ (combo, autoCombo, rateLimitManager ฯลฯ)
├── translator/             # ตัวแปลรูปแบบ (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # ตัวแปลง Responses API
└── utils/                  # โมดูลยูทิลิตี 22 รายการ (สตรีม, TLS, พร็อกซี, การบันทึกล็อก)

electron/                   # แอปเดสก์ท็อป Electron (ข้ามแพลตฟอร์ม)

tests/
├── unit/                   # ตัวรันการทดสอบ Node.js (ไฟล์ทดสอบ 1,574 ไฟล์)
├── integration/            # การทดสอบการทำงานร่วมกัน
├── e2e/                    # การทดสอบ Playwright
├── security/               # การทดสอบความปลอดภัย
├── translator/             # การทดสอบเฉพาะตัวแปล
└── load/                   # การทดสอบโหลด

docs/
├── adr/                     # บันทึกการตัดสินใจด้านสถาปัตยกรรม
├── architecture/            # สถาปัตยกรรมระบบและความยืดหยุ่น
├── comparison/              # การเปรียบเทียบ OmniRoute กับทางเลือกอื่น
├── compression/             # คู่มือและกฎการบีบอัด
├── dev/                     # คู่มือการพัฒนา
├── diagrams/                # แผนภาพสถาปัตยกรรม
├── frameworks/              # MCP, A2A, OpenCode, Memory, Skills
├── guides/                  # คู่มือผู้ใช้, Docker, การตั้งค่า, การแก้ไขปัญหา
├── i18n/                    # คำแปล README เป็นภาษาต่างๆ
├── marketing/               # สื่อการตลาด
├── ops/                     # การปรับใช้, พร็อกซี, ความครอบคลุม, การเผยแพร่
├── providers/               # เอกสารเฉพาะผู้ให้บริการ
├── reference/               # เอกสารอ้างอิง API, ตัวแปรสภาพแวดล้อม, เครื่องมือ CLI, ระดับบริการฟรี
├── releases/                # บันทึกประจำรุ่น
├── routing/                 # กลไก auto-combo, การเล่นซ้ำกระบวนการให้เหตุผล
├── screenshots/             # ภาพหน้าจอแดชบอร์ด
├── security/                # มาตรการป้องกัน, การปฏิบัติตามข้อกำหนด, การพรางตัว, โทเค็น
└── specs/                   # ข้อกำหนดการออกแบบ
```

---

## การเพิ่ม Provider ใหม่

### ขั้นตอนที่ 1: ลงทะเบียนค่าคงที่ของ Provider

เพิ่มใน `src/shared/constants/providers.ts` — ผ่านการตรวจสอบด้วย Zod เมื่อโหลดโมดูล

### ขั้นตอนที่ 2: เพิ่ม Executor (หากต้องใช้ตรรกะแบบกำหนดเอง)

สร้าง executor ใน `open-sse/executors/your-provider.ts` โดยสืบทอดจาก executor พื้นฐาน

### ขั้นตอนที่ 3: เพิ่ม Translator (หากไม่ใช่รูปแบบ OpenAI)

สร้าง translator สำหรับคำขอ/การตอบกลับใน `open-sse/translator/`

### ขั้นตอนที่ 4: เพิ่มการกำหนดค่า OAuth (หากใช้ OAuth)

เพิ่มข้อมูลประจำตัว OAuth ใน `src/lib/oauth/constants/oauth.ts` และเพิ่ม service ใน `src/lib/oauth/services/`

หาก Provider ต้นทางเผยแพร่ OAuth `client_id`/secret สาธารณะหรือคีย์ Firebase Web API ภายใน CLI / browser bundle สาธารณะของตน **ห้าม** ฝังค่านั้นเป็น string literal ให้ใช้ `resolvePublicCred()` จาก `open-sse/utils/publicCreds.ts` และเพิ่มรายการไบต์ที่ปกปิดค่าไว้ใน `EMBEDDED_DEFAULTS` เวิร์กโฟลว์ภาคบังคับฉบับเต็มมีอธิบายไว้ใน [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)

ภายใน handler/executor ข้อความแสดงข้อผิดพลาดที่จะส่งถึงไคลเอนต์ต้องผ่าน `buildErrorBody()` / `sanitizeErrorMessage()` จาก `open-sse/utils/error.ts` — ห้ามใส่ `err.stack` หรือ `err.message` แบบดิบลงในเนื้อหาของ Response ดูรายละเอียดได้ที่ [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md)

### ขั้นตอนที่ 5: ลงทะเบียนโมเดล

เพิ่มคำจำกัดความของโมเดลใน `open-sse/config/providerRegistry.ts`

### ขั้นตอนที่ 6: เพิ่มการทดสอบ

เขียน unit test ใน `tests/unit/` โดยครอบคลุมอย่างน้อย:

- การลงทะเบียน Provider
- การแปลงคำขอ/การตอบกลับ
- การจัดการข้อผิดพลาด

---

## รายการตรวจสอบ Pull Request

- [ ] การทดสอบผ่าน (`npm test`)
- [ ] การตรวจสอบ Lint ผ่าน (`npm run lint`)
- [ ] การ Build สำเร็จ (`npm run build`)
- [ ] เพิ่ม TypeScript types สำหรับ public functions และ interfaces ใหม่แล้ว
- [ ] ไม่มี secrets หรือ fallback values ที่ hardcode ไว้
- [ ] ฝัง public upstream credentials ผ่าน `resolvePublicCred()` (ดู [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)) และไม่ใช้ literals โดยเด็ดขาด
- [ ] Error responses ส่งผ่าน `buildErrorBody()` / `sanitizeErrorMessage()` — ไม่มี raw stack traces ใน response bodies (ดู [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md))
- [ ] Shell commands (`exec` / `spawn`) ส่ง runtime values ผ่าน `env` ไม่ใช่ผ่าน string interpolation
- [ ] ตรวจสอบ inputs ทั้งหมดด้วย Zod schemas
- [ ] เพิ่ม **fragment** ของ Changelog ภายใต้ `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` สำหรับการเปลี่ยนแปลงที่ส่งผลต่อผู้ใช้ (ดู [`changelog.d/README.md`](./changelog.d/README.md)) — **ห้าม** แก้ไข `CHANGELOG.md` โดยตรง; fragments จะถูกรวบรวมเมื่อเผยแพร่ release และจะไม่เกิด conflict ระหว่าง PRs
- [ ] อัปเดตเอกสารแล้ว (หากเกี่ยวข้อง)
- [ ] ไม่มี CodeQL / Secret-Scanning alerts ใหม่ หรือแต่ละรายการถูก dismiss พร้อมเหตุผลทางเทคนิคที่อ้างอิงเอกสาร `docs/security/` ที่เกี่ยวข้อง
- [ ] Routes ที่ spawn child processes (`/api/mcp/`, `/api/cli-tools/runtime/`) ถูกจัดประเภทเป็น `isLocalOnlyPath()` ใน `src/server/authz/routeGuard.ts` — ดู [กฎบังคับ #15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] ไม่มี trailers `Co-authored-by` ของ AI/bot ใน commit messages (กฎบังคับ #16) — human collaborators ที่นำผลงานมาใช้จะได้รับเครดิตด้วย trailers มาตรฐาน `Co-authored-by: Name <email>`

---

## การเผยแพร่

การเผยแพร่ได้รับการจัดการผ่านเวิร์กโฟลว์ `/generate-release` เมื่อมีการสร้าง GitHub Release ใหม่ แพ็กเกจจะถูก **เผยแพร่ไปยัง npm โดยอัตโนมัติ** ผ่าน GitHub Actions

สำหรับการปรับใช้บน VPS ให้ใช้ `npm run build:release` (ไม่ใช่ `npm run build`) — คำสั่งนี้จะดำเนินการบิลด์ใหม่ทั้งหมดตั้งแต่ต้น รวบรวมบันเดิลไว้ใน `dist/` และเขียนไฟล์ sentinel `dist/BUILD_SHA`
จากนั้นใช้สกิล `/deploy-vps-*-cc` ซึ่งจะใช้ rsync เพื่อซิงค์ `dist/` ไปยังไดเรกทอรี `app/` บนเซิร์ฟเวอร์ระยะไกล

---

## การขอความช่วยเหลือ

- **สถาปัตยกรรม**: ดู [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **เอกสารอ้างอิง API**: ดู [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **เอกสารด้านความปลอดภัย**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **เอกสารด้านการปฏิบัติการ**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **ปัญหา**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
