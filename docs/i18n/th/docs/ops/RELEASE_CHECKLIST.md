# Release Checklist (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

> **อัปเดตล่าสุด:** 2026-08-28 — v3.8.51
> กระบวนการรีลีสที่คล่องตัวยิ่งขึ้น โดยใช้ประโยชน์จากทักษะของ Claude Code สำหรับระบบอัตโนมัติ
>
> **รักษา queue/branch ให้เป็นสีเขียวระหว่างรีลีส:** ดู [RELEASE_GREEN.md](./RELEASE_GREEN.md)
> (ชุดคำสั่ง `/green-prs` + `npm run check:release-green` + `/babysit` + งานรายคืน) การเรียกใช้
> ขั้นตอนนี้เป็นระยะ — และโดยเฉพาะอย่างยิ่ง **ก่อน** ทำตามรายการตรวจสอบนี้ — จะช่วยให้ PR สำหรับรีลีสเริ่มต้นด้วยสถานะสีเขียว

## สรุปโดยย่อ

```bash
# 1. เพิ่มเวอร์ชัน + สร้าง CHANGELOG (ทักษะ)
/version-bump-cc patch    # หรือ minor/major

# 2. เรียกใช้ด่านตรวจสอบคุณภาพในเครื่อง
npm run check              # lint + การทดสอบ
npm run test:coverage      # ด่านตรวจสอบ coverage แบบเต็ม (60/60/60/60)

# 3. บิลด์และทดสอบเบื้องต้น
npm run build
npm run test:e2e           # ไม่บังคับ แต่แนะนำ

# 4. สร้างรีลีส (ทักษะ)
/generate-release-cc

# 5. ดีพลอย (ทักษะ)
/deploy-vps-both-cc        # หรือ akamai-cc / local-cc

# 6. บันทึกหลักฐานของรีลีส (ทักษะ)
/capture-release-evidences-cc
```

## npm Trusted Publishing (ค่าเริ่มต้นตั้งแต่ v3.8.51) — พักไว้ตามคำขอ และเผยแพร่โดยตรงเป็นทางเลือกสำรอง

`npm-publish.yml` เผยแพร่ผ่าน **npm Trusted Publishing (OIDC)** โดยค่าเริ่มต้น: งาน
`stage-npm` (โฮสต์โดย GitHub) จะแลก id-token ของ GitHub เป็นข้อมูลรับรอง npm
แบบอายุสั้นสำหรับการรันครั้งนั้น — ไม่มีโทเค็น npm อายุยาวใน secrets ของ repository, ไม่มีพรอมต์ 2FA และแนบ provenance มาด้วย
นี่คือวิธีเลี่ยงข้อจำกัดที่ npm รองรับในขณะนี้ เนื่องจากโทเค็นที่ข้าม 2FA กำลังถูกยกเลิก;
วิธีนี้ทำให้กระบวนการอัตโนมัติเต็มรูปแบบที่โปรเจกต์เคยใช้จนถึง v3.8.48 กลับคืนมา พร้อมคงไว้ซึ่ง
การรับประกัน WS1.3 (โทเค็นที่รั่วไหลไม่สามารถเผยแพร่ได้โดยลำพัง — เพราะไม่มีโทเค็น)

**การตั้งค่าครั้งเดียว (เจ้าของ):** npmjs.com → package `omniroute` → Settings → _Trusted
Publisher_ → GitHub: owner `diegosouzapw`, repo `OmniRoute`, workflow `npm-publish.yml`
(environment: none) จนกว่าจะตั้งค่านี้ ขั้นตอนอัตโนมัติจะล้มเหลวด้วย `ENEEDAUTH`:
ให้สั่งรันใหม่ด้วย `publish_mode=staged` (ด้านล่าง) หรือ `direct`

### การเผยแพร่แบบพักไว้ (ตามคำขอ — `publish_mode=staged`)

เวิร์กโฟลว์ npm-publish จะไม่เผยแพร่โดยตรงอีกต่อไป โดยจะบูต tarball ที่แพ็กแล้ว
(`check:pack-boot`) จากนั้นเรียกใช้ `npm stage publish` — ไบต์ชุดเดียวกันทุกประการจะถูกพักไว้บน
registry และ **ยังไม่สามารถติดตั้งได้** จนกว่าเจ้าของจะอนุมัติ ด่าน 2FA ที่ต้องดำเนินการโดยมนุษย์ถูกย้าย
ไปไว้หลังการพิสูจน์ความถูกต้อง ไม่ใช่ก่อนหน้า

**ขั้นตอนของเจ้าของหลังจากเวิร์กโฟลว์เป็นสีเขียว:**

1. `npm stage list omniroute` — ค้นหา stage id (ซึ่งจะแสดงอยู่ในสรุปของเวิร์กโฟลว์ด้วย)
2. ตรวจสอบไบต์ที่พักไว้ (แนะนำ): `npm stage download <id>` จากนั้นติดตั้ง
   tarball ที่ดาวน์โหลดลงใน prefix ชั่วคราวแล้วบูต (`npm run check:pack-boot` ทำให้
   การตัดสินผลแบบ pack→install→boot เดียวกันเป็นอัตโนมัติใน CI)
3. `npm stage approve <id>` — พรอมต์ 2FA คือการเผยแพร่ `npm stage reject <id>` ใช้สำหรับยกเลิก
4. ตาข่ายนิรภัยหลังการเผยแพร่: ตัวตรวจสอบหลังการเผยแพร่ (WS1.4 ของแผน v3.8.49) จะติดตั้ง
   เวอร์ชันที่เผยแพร่จาก registry สาธารณะใน container ใหม่ที่สะอาด แล้วบูตเวอร์ชันนั้น

**ทางเลือกสำรองฉุกเฉิน:** `workflow_dispatch` พร้อม `publish_mode=direct` จะคืนค่า
การใช้ `npm publish` แบบทันทีตามกระบวนการเดิม (ใช้เฉพาะเมื่อการพักไว้ทำงานผิดปกติ และต้องบันทึกเหตุผล)

**การเสริมความปลอดภัยครั้งเดียว (เจ้าของ, npmjs.com):** กำหนดค่า Trusted Publisher สำหรับ
`omniroute` เป็นโหมด stage-only เพื่อให้โทเค็นอายุยาวที่รั่วไหลไม่สามารถเรียก `npm publish`
โดยตรงจากที่ใดก็ตามได้ — CI ทำได้เพียงพักรายการไว้ และมีเพียง 2FA ของเจ้าของเท่านั้นที่ปล่อยรีลีสได้

**แนวทางรับมืออาร์ติแฟกต์ที่เสียหาย (ไม่เปลี่ยนแปลง):** `npm deprecate omniroute@<bad> "<reason> — use <fixed>"`
เป็นการตอบสนองเริ่มต้นตามค่าเริ่มต้น (ใช้เวลาไม่กี่นาทีและย้อนกลับได้); ใช้ `npm unpublish` เฉพาะภายในกรอบเวลา 72 ชั่วโมง/ไม่มีแพ็กเกจที่พึ่งพา
และห้ามใช้เป็นวิธีแรก สำหรับ Docker: ห้ามเขียนทับแท็กเวอร์ชัน — การ rollback คือ
การชี้ `latest` กลับไปยัง digest ล่าสุดที่ใช้งานได้

**Docker Hub `latest` (จำเป็นสำหรับการเผยแพร่ SemVer แบบเสถียรทุกครั้ง):**
เวิร์กโฟลว์ `docker-publish` ต้องติดแท็ก **ทั้ง** `X.Y.Z` และเมื่อ
`should-promote-latest.sh` ยืนยันว่านี่คือ SemVer แบบเสถียรที่สูงที่สุด ให้ติดแท็ก `:latest`
ด้วย **digest เดียวกัน** หลังจากงานเสร็จสิ้น: digest ของ `latest` บน Hub ต้องเท่ากับ digest ของ
SemVer ใหม่ และ `last_updated` ต้องเปลี่ยนแปลง อย่าปล่อยให้ `:latest` ชี้ไปยัง
บิลด์ที่เก่ากว่า ขณะที่บันทึกประจำรีลีสกล่าวถึงการแก้ไขที่มีอยู่เฉพาะใน git
คู่มือเริ่มต้นใช้งาน Compose ใช้ `:latest`; ส่วน GitOps ควรตรึงไว้ที่ `X.Y.Z` ต่อไป ดู
[ช่องทางการรีลีส Docker](../guides/DOCKER_GUIDE.md#release-channels) และ #10317

## ช่องทางด่วนสำหรับ Hotfix (ป้ายกำกับ `hotfix`)

PR ที่ติดป้ายกำกับ `hotfix` จะข้ามเมทริกซ์ CI ขนาดใหญ่ (E2E แบบ 9 ชาร์ด, coverage ratchet,
quality-gate, quality-extended) และคงเกตที่รวดเร็วและให้สัญญาณชัดเจนไว้ ได้แก่ build,
ชาร์ดของ unit test, integration, vitest, lint/typecheck, docs-sync, `check:pack-artifact`
และการทดสอบ boot-smoke ของ tarball (`check:pack-boot`) เป้าหมาย: ผ่านทั้งหมดภายใน ≤15 นาที แทนที่จะใช้เวลาประมาณ ~33 นาที

**นโยบายการเข้าใช้ — ต้องครบทั้งสี่ข้อ (อิงตามช่องทางฉุกเฉินของ Chromium/VS Code/Node):**

1. **ความรุนแรง**: ระบบ production ใช้งานไม่ได้ — อาร์ติแฟกต์ที่เผยแพร่แล้วล้มเหลวขณะบูต /
   การแก้ไขด้านความปลอดภัย / ผู้ใช้รีลีสทุกคนได้รับผลกระทบ "สำคัญ" ไม่ได้แปลว่า "ใช้งานไม่ได้"
2. **ผู้มีอำนาจ**: มีเพียงเจ้าของ repository เท่านั้นที่ติดป้ายกำกับ `hotfix` ป้ายกำกับนี้ถือเป็น
   การอนุมัติ — ห้ามดำเนินการด้วยตนเองบน campaign PR
3. **หลักฐาน**: เนื้อหา PR ต้องลิงก์ไปยัง heavy run ก่อนหน้าที่ผ่านทั้งหมด (ชุดการทดสอบที่
   งานซึ่งถูกข้ามจะนำมาตรวจสอบซ้ำ) พร้อมทั้งการทดสอบของการแก้ไขนี้ที่แสดงว่าล้มเหลวก่อนและผ่านหลังแก้ไข
4. **ขอบเขต**: cherry-pick เท่านั้น — แก้ไขให้น้อยที่สุด ห้าม refactor และห้ามพ่วงการเปลี่ยนแปลงอื่น

พื้นผิว coverage/ratchet ที่ถูกข้ามจะได้รับการตรวจสอบซ้ำโดย full run ครั้งถัดไปบน
release branch (รักษาสถานะรีลีสให้เขียวอย่างต่อเนื่อง) — ช่องทางนี้ข้ามเฉพาะการรอคอย ไม่เคยข้ามการตรวจสอบ
diff ที่มีเฉพาะการทดสอบ (ไฟล์ทั้งหมดอยู่ภายใต้ `tests/` และไม่มีไฟล์ใดอยู่ภายใต้ `tests/e2e/`) จะข้ามเมทริกซ์ E2E
โดยอัตโนมัติโดยไม่ต้องใช้ป้ายกำกับใดๆ

## รายการตรวจสอบโดยละเอียด

### ก่อนรีลีส

- [ ] PR ทั้งหมดที่กำหนดเป้าหมายมายังรีลีสนี้ถูก merge เข้า `release/vX.Y.0` แล้ว
- [ ] รายการ Linear/issue ที่ยังเปิดอยู่ทั้งหมดสำหรับเวอร์ชันนี้ถูกปิดหรือเลื่อนไปยัง milestone ถัดไปแล้ว
- [ ] CI เป็นสีเขียวบน branch `release/vX.Y.0`
- [ ] ไม่มีเครื่องหมาย `TODO(release)` ในโค้ด: `grep -r "TODO(release)" src/ open-sse/`
- [ ] Docker base image เป็นเวอร์ชันล่าสุด (ปัจจุบันคือ `node:24.15.0-trixie-slim`)

### เวอร์ชันและ Changelog

- [ ] รัน `/version-bump-cc <patch|minor|major>` (Claude Code skill)
  - เพิ่มเวอร์ชันใน `package.json`, `electron/package.json`
  - สร้าง `CHANGELOG.md` ใหม่จาก git commits นับตั้งแต่ tag ล่าสุด
  - อัปเดต badge ใน README.md
- [ ] ตรวจสอบ CHANGELOG.md ด้วยตนเองและปรับข้อความ commit หากจำเป็น
- [ ] ตรวจสอบให้แน่ใจว่าส่วน semver ล่าสุดใน `CHANGELOG.md` ตรงกับเวอร์ชันใน `package.json`
- [ ] คง `## [Unreleased]` ไว้เป็นส่วนแรกของ changelog สำหรับงานที่จะมาถึง
- [ ] อัปเดต `docs/openapi.yaml` → `info.version` ต้องตรงกับเวอร์ชันใน `package.json`

### คุณภาพโค้ด

- [ ] `npm run lint` — 0 ข้อผิดพลาด (คำเตือนมีอยู่ก่อนแล้ว)
- [ ] `npm run typecheck:core` — ผ่านโดยไม่มีปัญหา
- [ ] `npm run typecheck:noimplicit:core` — ผ่านโดยไม่มีปัญหา (เข้มงวด)
- [ ] `npm run check:cycles` — ไม่มี dependency แบบวนซ้ำ
- [ ] `npm run check:any-budget:t11` — อยู่ภายในงบประมาณ
- [ ] `npm run check:route-validation:t06` — ผ่านโดยไม่มีปัญหา
- [ ] `npm run check:node-runtime` — เป็นไปตามเวอร์ชัน runtime ขั้นต่ำที่รองรับ (`>=22.22.2 <23`, `>=24.0.0 <27`, ตาม `SUPPORTED_NODE_RANGE` ใน `src/shared/utils/nodeRuntimeSupport.ts`; สอดคล้องกับ `engines` ใน `package.json`)

### การทดสอบ

- [ ] `npm run test:unit` — ผ่าน
- [ ] `npm run test:vitest` — ผ่าน (MCP server, autoCombo, cache)
- [ ] `npm run test:coverage` — ผ่านเกต 60/60/60/60 (statements/lines/functions/branches)
- [ ] `npm run test:integration` — ผ่าน (หากการเปลี่ยนแปลงกระทบ DB / handlers)
- [ ] `npm run test:combo:matrix` — ผ่าน (เมทริกซ์กลยุทธ์ combo: พิสูจน์การตัดสินใจเลือกของกลยุทธ์ routing สาธารณะทั้ง 19 แบบอย่างกำหนดผลได้แน่นอน; ให้รันเมื่อแก้ไข combo routing, การ resolve กลยุทธ์ หรือตรรกะ fallback)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` — **ไม่บังคับ/รันด้วยตนเอง** (smoke test ที่มีเกตและเชื่อมต่อ upstream จริง; ดึง snapshot ของ DB แบบอ่านอย่างเดียวจาก VPS `root@192.168.0.15`; เรียกใช้ผู้ให้บริการจริงและมีค่าใช้จ่ายเป็นเครดิต; ไม่รันใน CI; ข้ามอย่างเรียบร้อยหากไม่มีเกต)
- [ ] `npm run test:combo:live:vps` — **ไม่บังคับ/รันด้วยตนเอง** (VPS live smoke ระยะที่ 3: สถานการณ์ HTTP 7 แบบกับเซิร์ฟเวอร์ `.15` ที่ใช้งานจริงผ่าน Node ESM โดยตรง; ต้องใช้ `ssh root@192.168.0.15`; สร้าง/ลบเฉพาะ combo ที่ขึ้นต้นด้วย `__live_test__*`; เรียกใช้ผู้ให้บริการจริง; ไม่รันใน CI)
- [ ] `npm run test:e2e` — ผ่าน (การเปลี่ยนแปลง UI)
- [ ] `npm run test:protocols:e2e` — ผ่าน (การเปลี่ยนแปลง MCP/A2A)
- [ ] `npm run test:ecosystem` — ผ่าน

### Hooks (ตรวจสอบโดย Husky)

Husky hooks อยู่ใน `.husky/` และทำงานโดยอัตโนมัติระหว่างการดำเนินการของ git

- **pre-commit:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **pre-push:** เกตที่รวดเร็วและให้ผลลัพธ์แน่นอน — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (เปิดใช้งานเมื่อ 2026-06-13) จงใจไม่รวม `test:unit` (ช้า; ครอบคลุมโดยงาน `test-unit` ใน CI)
  - รัน `npm run test:unit` ด้วยตนเองก่อน push release branch
    ถ้า hook ล้มเหลว: แก้ไขปัญหาต้นเหตุ อย่าข้ามด้วย `--no-verify`

### Conventional Commits

commit ทั้งหมดที่จะรวมในรีลีสต้องเป็นไปตามรูปแบบ `type(scope): subject`

**ประเภทที่ใช้ได้:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**ขอบเขตที่ใช้ได้:** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`

การเปลี่ยนแปลงที่ทำให้เข้ากันไม่ได้: เพิ่ม footer `BREAKING CHANGE:` หรือ `!` หลัง scope (เช่น `feat(api)!: drop /v0`)

### เอกสารประกอบ

- [ ] `npm run check:docs-sync` ผ่าน (รันอัตโนมัติโดย pre-commit)
- [ ] `npm run check:docs-all` ผ่าน (คำสั่งรวม: docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links)
- [ ] `npm run check:env-doc-sync` จบการทำงานด้วยรหัส 0 — ข้อตกลง env ระหว่างโค้ด ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` ยังคงสอดคล้องกัน
- [ ] `npm run check:doc-links` จบการทำงานด้วยรหัส 0 — ไม่มีการอ้างอิง Markdown ภายในที่เสียหายหลังปรับโครงสร้าง
- [ ] ตรวจสอบ `docs/architecture/ARCHITECTURE.md` แล้วว่าข้อมูลเกี่ยวกับพื้นที่จัดเก็บ/รันไทม์ไม่มีความคลาดเคลื่อน
- [ ] ตรวจสอบ `docs/guides/TROUBLESHOOTING.md` แล้วว่าตัวแปร env และข้อมูลด้านการปฏิบัติการไม่มีความคลาดเคลื่อน
- [ ] หาก `.env.example` เปลี่ยนแปลง: อัปเดต `docs/reference/ENVIRONMENT.md`
- [ ] หากฟีเจอร์ใหม่มี UI: กล่าวถึงฟีเจอร์ดังกล่าวใน `docs/guides/USER_GUIDE.md`
- [ ] หากฟีเจอร์ใหม่มี API: อัปเดต `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml`
- [ ] หากฟีเจอร์ใหม่เป็นโมดูล: ต้องมีไฟล์ `docs/<MODULE>.md` โดยเฉพาะ
- [ ] หากเป็นการเปลี่ยนแปลงที่ไม่เข้ากันย้อนหลัง: เพิ่มหมายเหตุการย้ายระบบใน `docs/guides/TROUBLESHOOTING.md`

### i18n

- [ ] `npm run i18n:check` จบการทำงานด้วยรหัส 0 — สถานะการแปล (`.i18n-state.json`) สอดคล้องกับเอกสารต้นฉบับ (ไม่มีต้นฉบับที่คลาดเคลื่อนในโหมดเข้มงวด; คำแนะนำในโหมดเตือนยอมรับได้สำหรับการปรับแก้เอกสารในนาทีสุดท้าย แต่ควรเป็น 0 ก่อนสร้างแท็ก)
- [ ] `npm run i18n:check-ui-coverage` จบการทำงานด้วยรหัส 0 — ทุกโลเคลของ UI มีความครอบคลุมอย่างน้อยตามเกณฑ์ขั้นต่ำ 80%
- [ ] `npm run i18n:sync-ui:dry` รายงานคีย์ที่ขาดหายไป 0 รายการในทั้ง 42 โลเคล
- [ ] หากเอกสารต้นฉบับภาษาอังกฤษเปลี่ยนแปลง ให้รัน `npm run i18n:run` (ต้องมี `OMNIROUTE_TRANSLATION_API_KEY` ใน `.env`) ก่อนสร้างแท็ก
- [ ] สามารถเลื่อนการส่งผลงานแปลไปยังรุ่นถัดไปได้หากเป็นการเปลี่ยนแปลงเล็กน้อย (ติดตามไว้ใน CHANGELOG)

### การย้ายฐานข้อมูล

- [ ] หาก `src/lib/db/migrations/` มีไฟล์ใหม่:
  - [ ] การย้ายแต่ละรายการต้องรันซ้ำได้โดยไม่เกิดผลข้างเคียง (`CREATE TABLE IF NOT EXISTS` เป็นต้น)
  - [ ] การย้ายถูกครอบด้วยธุรกรรม
  - [ ] กำหนดหมายเลขอย่างถูกต้อง (ไม่มีหมายเลขขาดหายจากลำดับ)
- [ ] ทดสอบกับการติดตั้งใหม่: ลบ `~/.omniroute/omniroute.db` แล้วรัน `npm run dev`
- [ ] ทดสอบกับการติดตั้งเดิม: สำรองฐานข้อมูล รันการย้าย และตรวจสอบสคีมา
- [ ] จัดการไฟล์ WAL (`-wal`, `-shm`) อย่างถูกต้อง หากการย้ายมีการเขียนตารางใหม่

### แค็ตตาล็อกผู้ให้บริการ (ตรวจสอบด้วย Zod)

- [ ] สคีมา Zod ใน `src/shared/constants/providers.ts` ถูกต้องเมื่อโหลด
  - [ ] ผู้ให้บริการทั้งหมดมีฟิลด์ที่จำเป็น (`id`, `label`, `kind` เป็นต้น)
  - [ ] ระบุ `freeNote` สำหรับผู้ให้บริการฟรีรายใหม่
  - [ ] ผู้ให้บริการ OAuth มี `oauthConfig` ที่ลงทะเบียนไว้ใน `src/lib/oauth/constants/oauth.ts`
- [ ] หากเพิ่มผู้ให้บริการใหม่: มีตัวประมวลผลที่สอดคล้องกันใน `open-sse/executors/`
- [ ] หากใช้รูปแบบที่ไม่ใช่ OpenAI: มีตัวแปลใน `open-sse/translator/`
- [ ] ลงทะเบียนโมเดลใน `open-sse/config/providerRegistry.ts`
- [ ] การทดสอบหน่วยใน `tests/unit/` ครอบคลุมการจัดประเภทและการกำหนดเส้นทางของผู้ให้บริการ

### เดสก์ท็อป (Electron)

หาก `electron/` เปลี่ยนแปลง:

- [ ] `npm run electron:smoke:packaged` ผ่าน
- [ ] ทดสอบบิลด์อย่างน้อยหนึ่งรายการจาก `:win`, `:mac`, `:linux`
- [ ] ใบรับรองการลงนามโค้ดยังไม่หมดอายุ (หากมีการลงนาม)
- [ ] เวอร์ชันใน `electron/package.json` ตรงกับ `package.json` ที่ราก
- [ ] อัปเดตตัวชี้ช่องทางอัปเดตอัตโนมัติ หากกำลังเผยแพร่ไปยัง `stable`

### โครงสร้างบิลด์

รีพอซิทอรีใช้ไดเรกทอรีเอาต์พุตที่แตกต่างกันสามแห่ง — ห้ามสับสนกัน:

| ไดเรกทอรี | วัตถุประสงค์                                                | ติดตามหรือไม่       |
| --------- | ----------------------------------------------------------- | ------------------- |
| `src/`    | ซอร์สของแอปพลิเคชัน (TypeScript / TSX)                      | ใช่                 |
| `.build/` | ไฟล์ระหว่างการบิลด์ — เอาต์พุต `next build` (`distDir`)     | ไม่ (ถูก gitignore) |
| `dist/`   | บันเดิล npm ที่พร้อมจัดส่ง — ประกอบโดย `assembleStandalone` | ไม่ (ถูก gitignore) |

> **หมายเหตุสำหรับผู้ปฏิบัติงาน:** ไดเรกทอรีอิมเมจบน VPS ระยะไกลยังคงเป็น `/usr/lib/node_modules/omniroute/app/`
> มีเพียงเอาต์พุตบิลด์ **ภายในรีพอซิทอรี** เท่านั้นที่ย้าย (`app/` → `dist/`) ทักษะการปรับใช้จะ rsync
> เนื้อหาของ `dist/` ไปยังไดเรกทอรี `app/` ระยะไกล — ไม่จำเป็นต้องเปลี่ยนพาธบน VPS

**โฟลว์การบิลด์ครั้งเดียว:**

```
npm run build:release
  └─ rm -rf .build dist          (ล้าง)
  └─ next build → .build/next/   (ไฟล์ระหว่างทาง)
  └─ assembleStandalone          (คัดลอก standalone + static + public + natives → dist/)
  └─ writes dist/BUILD_SHA       (ตัวตรวจสอบ HEAD)
```

ห้ามรัน `npm run build` แล้วตามด้วย `npm run build:cli` แยกต่างหากสำหรับการปรับใช้ — ให้ใช้
`npm run build:release` ซึ่งจะบิลด์ใหม่ทั้งหมดแบบสะอาดพร้อมเขียนตัวตรวจสอบในคำสั่งเดียว

### การตรวจสอบอาร์ติแฟกต์

- [ ] `npm run build:release` สำเร็จ และ `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` สะอาด — ไม่มี `app.__qa_backup`, `scripts/scratch`, `package-lock.json` หรือไฟล์ตกค้างอื่นจากเครื่องภายใน
- [ ] มี `dist/server.js` หลังบิลด์

### การสร้างแท็กและการเผยแพร่

- [ ] รัน `/generate-release-cc` (ทักษะ Claude Code):
  - สร้างแท็ก `vX.Y.Z`
  - พุชแท็กและแบรนช์
  - เปิด GitHub Release พร้อมเนื้อหา changelog
  - แนบตัวติดตั้ง Electron (หากบิลด์ไว้)
- [ ] หรือดำเนินการด้วยตนเอง:
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### การปรับใช้

ทักษะการปรับใช้ใช้โฟลว์ rsync แบบเบา — ไม่มี `npm pack` และไม่มี `npm i -g`:

- [ ] ใช้ทักษะการปรับใช้ที่ตรงกับเป้าหมาย:
  - `/deploy-vps-local-cc` — VPS ภายใน (192.168.0.15)
  - `/deploy-vps-akamai-cc` — Akamai VPS (69.164.221.35)
  - `/deploy-vps-both-cc` — ทั้งสองแห่ง
- [ ] ก่อนปรับใช้ ให้ยืนยันว่า `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] ต้องรันบิลด์ในตำแหน่งที่ `node_modules` เป็นของจริง (เช็กเอาต์หลักหรือ worktree ที่รัน `npm ci` แล้ว — ห้ามใช้ worktree ที่เป็น symlink)
- [ ] ทดสอบแบบ smoke test กับอินสแตนซ์ที่ปรับใช้แล้ว:
  - เปิด `/dashboard/health` → ตรวจสอบว่าสตริงเวอร์ชันตรงกับรุ่นที่เผยแพร่
  - ส่งคำขอ `/v1/chat/completions` ไปยังผู้ให้บริการที่ทราบว่าใช้งานได้
  - ตรวจสอบว่า `/api/monitoring/health` ส่งคืน circuit breaker เป็น `CLOSED`
  - ยืนยันว่าทรานสปอร์ต MCP ตอบสนอง (`/mcp` HTTP, `/mcp-sse` SSE)

### หลังการเผยแพร่

- [ ] เรียกใช้ `/capture-release-evidences-cc` (สกิล Claude Code)
  - จับภาพหน้าจอ/บันทึกวิดีโอรูปแบบ WebP ของฟีเจอร์ใหม่
  - แนบไปกับบันทึกประจำรุ่น / โพสต์บล็อก
- [ ] อัปเดต GitHub Discussions / Discord ด้วยประกาศการเผยแพร่
- [ ] เปิด milestone สำหรับเวอร์ชันถัดไป
- [ ] หากมีความสำคัญเร่งด่วน: ปักหมุดการสนทนาหรือโพสต์ใน `news.json` เพื่อแสดงแบนเนอร์ในแอป

### เกณฑ์ก่อนเปิดตัว Radar สู่สาธารณะ

ประกาศ Radar ถูก commit โดยตั้งค่า `active: false` ไว้โดยเจตนา การเปิดใช้งานเป็นการเปลี่ยนแปลงแยกต่างหาก
หลังจากมีหลักฐานยืนยันครบทุกข้อด้านล่าง:

- [ ] PR ของ Radar แบบซ้อนทั้งหมดได้รับการ merge แล้ว และ CI ของ release-tip เป็นสีเขียว
- [ ] deploy และทดสอบเบื้องต้นเส้นทาง OSS Radar โดยที่ `RADAR_ENABLED` ยังคงปิดเป็นค่าเริ่มต้น
- [ ] ทดสอบเบื้องต้น `GET /planos`, `/termos`, `/privacidade` และ `/reembolso` บนโฮสต์ Radar ที่ระบุ
- [ ] บันทึกข้อมูลระบุตัวตน/ข้อมูลติดต่อ/ที่อยู่ของผู้ดำเนินการ และผลการตรวจสอบด้านกฎหมายที่เจ้าของอนุมัติแล้วไว้ในบริการส่วนตัว
- [ ] ทดสอบ Stripe Checkout และ signed webhook ในโหมดทดสอบเท่านั้น
- [ ] ทดสอบการส่งอีเมลธุรกรรมแบบเข้ารหัสหนึ่งครั้งด้วยผู้ส่ง/โดเมนที่ได้รับอนุมัติ
- [ ] พิสูจน์ว่าสามารถกู้คืนข้อมูลสำรองได้ และดำเนินการวิจัยภายใต้การกำกับดูแลหนึ่งครั้งโดยมีการจำกัดงบประมาณ
- [ ] อนุมัตินโยบายการตรวจสอบ BRL/PIX ก่อนยอมรับหลักฐานการบริจาค
- [ ] เปิดใช้งาน Checkout สาธารณะหลังจากผ่านเกณฑ์ก่อนหน้าทั้งหมดแล้วเท่านั้น จากนั้นจึงเปิดใช้งาน ID ใหม่ใน `news.json`
- [ ] ตรวจสอบว่าแบนเนอร์หน้า Home ใช้ข้อความที่แปลตาม locale และ ID ใหม่จะปรากฏอีกครั้งหลังจากปิด ID เก่าไปแล้ว

## การทดสอบ smoke สำหรับ Embedded Services (v3.8.4+)

ก่อนเผยแพร่รีลีสใดๆ ที่มีการเปลี่ยนแปลง embedded services ให้ตรวจสอบดังนี้:

### การบูตด้วยฐานข้อมูลใหม่ (ตรวจจับ migration ที่ชนกัน — เพิ่มหลัง hotfix ของ v3.8.4)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — รอให้บูต 10 วินาที
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` ต้องคืนค่า `"9router"` (ห้ามเป็น 404 และห้ามเป็น 500) เพื่อยืนยันว่า migration `071_services.sql` ถูกนำไปใช้และมีการเพิ่มข้อมูลเริ่มต้นในแถวแล้ว
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` ต้องคืนค่า 3 แถว
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` ต้องคืนค่า 2 แถว (ยืนยันว่า `070_webhooks_kind_metadata.sql` ถูกนำไปใช้แล้ว)
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` ต้องผ่าน — ป้องกันการชนกันในอนาคต

### 9Router

- [ ] `POST /api/services/9router/install` ต้องคืนค่า 200 พร้อม `installedVersion` ภายในเวลาไม่เกิน 2 นาที
- [ ] `POST /api/services/9router/start` ต้องคืนค่า 200 และ `state: "running"` ภายในเวลาไม่เกิน 30 วินาที
- [ ] `GET /api/services/9router/status` ต้องรายงาน `health: "healthy"`
- [ ] `POST /v1/chat/completions` ที่มี `"model": "9router/auto/..."` ต้องคืนค่า 200 (การกำหนดเส้นทางแบบ end-to-end ผ่าน 9Router)
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` ต้องเรนเดอร์ UI ดั้งเดิมของ 9Router ภายในพร็อกซี (ไม่ใช้ iframe ที่ชี้ไปยัง `127.0.0.1:port` โดยตรง)
- [ ] `POST /api/services/9router/rotate-key` ต้องคืนค่า `{ keyRotated: true }` และบริการรีสตาร์ตได้อย่างสมบูรณ์
- [ ] `POST /api/services/9router/stop` ต้องคืนค่า 200 และ `state: "stopped"`
- [ ] `GET /api/services/9router/logs?tail=50` ต้องคืนค่า SSE stream พร้อม event `snapshot` ที่มีบรรทัดล่าสุด
- [ ] การติดตั้งในสภาพแวดล้อมที่ไม่มี `npm` อยู่ใน PATH ต้องคืนค่า 500 พร้อมข้อความแสดงข้อผิดพลาดที่เป็นมิตรต่อผู้ใช้ (ไม่ใช่ stack trace)

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install` ต้องคืนค่า 200 ภายในเวลาไม่เกิน 2 นาที
- [ ] `POST /api/services/cliproxy/start` ต้องคืนค่า 200 และ `state: "running"` ภายในเวลาไม่เกิน 30 วินาที
- [ ] `GET /api/services/cliproxy/status` ต้องรายงาน `health: "healthy"`
- [ ] `POST /api/services/cliproxy/stop` ต้องคืนค่า 200 และ `state: "stopped"`
- [ ] `GET /api/services/cliproxy/logs?tail=50` ต้องคืนค่า SSE stream

### การทดสอบการถดถอยด้านความปลอดภัย

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` ต้องคืนค่า `403 LOCAL_ONLY`
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` ต้องคืนค่า `403 LOCAL_ONLY`
- [ ] การตอบกลับข้อผิดพลาดจาก `/api/services/*` ต้องไม่มี `err.stack` หรือพาธไฟล์แบบสัมบูรณ์

## รายการตรวจสอบสำหรับ v3.8.0+

ก่อนเผยแพร่รีลีส v3.8.x ใดๆ ให้ตรวจสอบรายการเพิ่มเติมต่อไปนี้:

- [ ] `omniroute --tray` ต้องบูตบน macOS ได้ (ติดตั้ง systray2 ไว้ใน `~/.omniroute/runtime/`)
- [ ] `omniroute --tray` ต้องบูตบน Linux ได้ (ต้องมี DISPLAY และแสดงข้อผิดพลาดอย่างเหมาะสมหากไม่ได้ตั้งค่า)
- [ ] `omniroute --tray` ต้องบูตบน Windows ได้ (ใช้ PowerShell NotifyIcon โดยไม่ต้องใช้ไบนารีเพิ่มเติม)
- [ ] `omniroute config tray enable` ต้องสร้างรายการ autostart และคำสั่ง disable ต้องลบรายการดังกล่าว
- [ ] `npm install -g omniroute@<this-version>` ต้องเรียกใช้ postinstall โดยไม่จบการทำงานด้วยข้อผิดพลาดร้ายแรง
- [ ] เส้นทางการอัปเดตต้องเก็บ optional deps ไว้: `omniroute update --apply` และ auto-updater
      ต้องเรียกใช้ `npm install -g … --include=optional` เพื่อให้ `optionalDependencies` (better-sqlite3,
      keytar, tls-client และสแตก llmlingua SLM ได้แก่ `@atjsh/llmlingua-2@2.0.5`,
      `js-tiktoken`) ยังคงอยู่หลังการอัปเดต ระดับ SLM แบบ ultra ที่ใช้ `modelPath` ยังต้องมีโมเดล
      tinybert ซึ่งจะถูกดาวน์โหลดโดยอัตโนมัติไปยัง `${DATA_DIR}/models/llmlingua` เมื่อใช้งานครั้งแรก จากนั้น postinstall
      (`scripts/build/colocateOptionals.mjs`) จะจัดวาง optional closure ของ SLM ไว้ร่วมกันใน
      `dist/node_modules` เพื่อให้ worker resolve อินสแตนซ์ `@huggingface/transformers` ^4.2.0 เพียงอินสแตนซ์เดียว
      — standalone trace จะ bundle เฉพาะ transformers โดยไม่รวม optionals ที่ import แบบไดนามิก
      ดังนั้นหากไม่มีขั้นตอนนี้ worker จะโหลด llmlingua-2 โดยใช้ transformers จาก root
      และระดับ SLM จะ fail-open โดยไม่มีสัญญาณเตือน
- [ ] `omniroute status` ต้องทำงานได้โดยไม่มี `.env` (ใช้เส้นทาง CLI token และจำกัดเฉพาะ loopback)
- [ ] `curl http://localhost:20128/api/shutdown` ต้องคืนค่า 401 (เส้นทางที่ได้รับการป้องกันตลอดเวลา)
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` ต้องคืนค่า 401 (ตัวป้องกัน loopback)
- [ ] SQLite runtime ต้อง resolve เป็น `bundled` ในการเรียกใช้ครั้งแรก (ไบนารีแบบ bundled ใช้งานได้กับแพลตฟอร์ม)
- [ ] SQLite runtime ต้อง fallback เป็น `runtime` เมื่อ `node_modules/better-sqlite3` ถูกลบ
- [ ] ตัวกรอง Smart MCP ต้องบีบอัดเอาต์พุตจริงจาก `playwright-mcp browser_snapshot` ได้ (ลดขนาด ≥50%)
- [ ] ไฟล์ `skills/omniroute*/SKILL.md` ทั้ง 10 ไฟล์ต้องเข้าถึงแบบสาธารณะได้ผ่าน raw GitHub URL
- [ ] วิซาร์ด onboarding ต้องแสดงขั้นตอนแนะนำระดับ "How It Works" ในการตั้งค่าใหม่
- [ ] วิดเจ็ตความครอบคลุมของระดับบนแดชบอร์ดหน้าแรกต้องแสดงจำนวนที่กำหนดค่าแล้ว/ทำงานอยู่

---

## การย้อนกลับ

หากรีลีสมีปัญหาร้ายแรง:

1. `gh release edit vX.Y.Z --prerelease` (ทำเครื่องหมายว่าไม่ใช่เวอร์ชันล่าสุด)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z` (เฉพาะในกรณีที่ผู้ใช้ยังไม่ได้นำไปใช้)
3. หรือ: ทำ hotfix บน `release/vX.Y.0` → ออกแพตช์รีลีส `vX.Y.(Z+1)`
4. แจ้งให้ทราบใน GitHub Discussions และ Discord ทันที

## กฎที่ต้องปฏิบัติตามอย่างเคร่งครัด

- ห้าม commit ไปยัง `main` โดยตรง
- ห้ามใช้ `git push --force` กับ `main` หรือ branch `release/*`
- ห้ามข้าม hook ของ Husky (`--no-verify`)
- ห้าม commit secret, credential หรือไฟล์ `.env`
- Coverage ต้องคงอยู่ที่ ≥60/60/60/60 (statements/lines/functions/branches)
- ต้องเพิ่มหรืออัปเดต test เสมอเมื่อมีการเปลี่ยนแปลง production code ใน `src/`, `open-sse/`, `electron/` หรือ `bin/`

## การตรวจสอบการซิงค์แบบอัตโนมัติ

เรียกใช้ตัวตรวจสอบการซิงค์เอกสารภายในเครื่องก่อนเปิด PR:

```bash
npm run check:docs-sync
```

CI จะเรียกใช้การตรวจสอบนี้ใน `.github/workflows/ci.yml` เช่นกัน (งาน lint)
