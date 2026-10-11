# Merge Queue & Manual Merge-Train Runbook (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

ตั้งแต่ v3.8.49 (WS3.2/WS3.4 ของแผน quality/velocity) เส้นทางการผสานเริ่มต้นสำหรับ
PR ที่ผ่านการตรวจสอบเข้าสู่ `release/vX.Y.Z` คือ **คิวผสานของ Mergify** (`.mergify.yml`);
ส่วน **ขบวนการผสานแบบดำเนินการเอง** ที่อธิบายไว้ด้านล่างเป็นทางเลือกสำรอง — ใช้ระหว่างเกิดเหตุขัดข้อง,
ช่วงหยุดรับการผสานเพื่อออกรุ่น หรือหากแผน Open Source ของ Mergify มีการเปลี่ยนแปลง

## เส้นทางเริ่มต้น: คิว Mergify

1. PR ได้รับการตรวจสอบ/ผ่านสถานะสีเขียวจากแคมเปญ และได้รับการอนุมัติจากเกต ⭐
   ก่อนผสานของเจ้าของ (รายงาน + การตัดสินใจรายรายการ — ดู `/merge-prs` ขั้นตอนที่ 0.75)
2. เจ้าของ (หรือเซสชันที่ดำเนินการตามการตัดสินใจของเจ้าของ) ติดป้ายกำกับ **`queue`**
   ป้ายกำกับนี้ถือเป็นการอนุมัติให้ผสาน โดย Mergify มีหน้าที่เพียงดำเนินการตามนั้น
3. Mergify ตรวจสอบ PR ที่อยู่ในคิว **ตามลำดับทีละรายการ** กับ fast-gates
   และผสาน (squash) การประมวลผลแบบแบตช์ + การแบ่งครึ่งอัตโนมัติเป็นความสามารถในแพ็กเกจ Mergify แบบชำระเงิน
   ("Cannot use Merge Queue batch" ในแผนฟรี, #7220) ดังนั้น `.mergify.yml` จึงไม่ได้กำหนด
   `batch_size`; การประมวลผลแบบแบตช์ยังคงเป็นหน้าที่ของ merge-train แบบทำด้วยตนเองด้านล่าง PR ที่
   การตรวจสอบยังคงอยู่ระหว่างดำเนินการหลังจาก `checks_timeout` (240 นาที = 2× ค่า p95 ที่วัดได้ของ
   `quality.yml`) จะถูกนำออกจากคิวแทนที่จะทำให้คิวหยุดชะงัก
4. หลังการผสาน เวิร์กโฟลว์ continuous release-green จะตรวจสอบ tip ใหม่เมื่อมีการ push
   และเปิด issue เพื่อระบุแหล่งที่มาหากการทำงานร่วมกันของการเปลี่ยนแปลงทำให้เกิด regression (จะไม่ auto-revert)

มาตรการป้องกัน (สอดคล้องกับกฎเคร่งครัด #21/#22 ใน `CLAUDE.md`):

- **อยู่ในช่วง release freeze** → ห้ามติดป้ายกำกับ PR ที่มีเป้าหมายเป็น branch ที่ถูก freeze; ให้เปลี่ยนเป้าหมายไปยัง
  `release/vX+1` ที่ใช้งานอยู่ก่อน
- **PR ที่กำลังดำเนินการของเซสชันอื่น** → ห้ามติดป้ายกำกับ; มีเพียงเซสชันเจ้าของเท่านั้นที่นำงานของตนเองเข้าคิว
- diff ที่มีเฉพาะการทดสอบและ PR ที่ติดป้ายกำกับ `hotfix` จะรัน CI แบบลดขั้นตอนอยู่แล้ว (ดู
  `RELEASE_CHECKLIST.md` → Hotfix Fast-Lane); เงื่อนไขของคิวจะยอมรับชุดการตรวจสอบใดก็ตาม
  ที่รันจริง (`#check-failure=0` + `#check-pending=0`)

## ทางเลือกสำรอง: ขบวนการผสานแบบดำเนินการเอง

ใช้เมื่อคิวไม่พร้อมใช้งาน แนวทางนี้ทำให้แนวปฏิบัติที่เคยระบาย PR ได้ 33 รายการภายใน
วันเดียวระหว่างรอบ v3.8.47 เป็นมาตรฐาน:

1. **รวบรวมกลุ่ม** (PR ที่ผ่านการตรวจสอบ+อนุมัติแล้วประมาณ 10–30 รายการ) ตรวจสอบการชนกันของ `linked:`
   (`tap.testFiles` เดียวกัน, ส่วน CHANGELOG เดียวกัน) และจัดให้รายการเหล่านั้นดำเนินการตามลำดับ
2. **ตรวจสอบเพียงครั้งเดียว**: ใน worktree ที่แยกออกจากปลายของ release ให้ผสาน head ทั้งหมดในกลุ่ม
   ภายในเครื่อง แล้วเรียกใช้ชุดการตรวจสอบที่เทียบเท่ากับ release
   (`npm run check:release-green` และเพิ่ม `--with-build` ก่อนออกรุ่น)
   `scripts/release/merge-train.sh <base> <PR#>…` ทำขั้นตอน 1–2 โดยอัตโนมัติ (PR ที่ขัดแย้งกัน
   จะถูกนำออก ส่วนขบวนดำเนินการต่อ) โหมดเต็มเรียกใช้ `npm run test:unit` — ตัวรัน
   ที่ปรับให้เหมาะกับเครื่อง (`--test-concurrency=20`) **ไม่ใช่** CI สอง shard แบบลำดับที่ใช้ 4 คอร์
   ซึ่งเคยทำให้ช่วงหลักใช้งานเพียงประมาณ 25% ของเครื่อง 16 คอร์ (แก้ไขเมื่อ
   2026-07-18) `--fast` (สำหรับระบายขบวนขนาดใหญ่มากภายในวันเดียว โดยเจ้าของอนุมัติเมื่อ 2026-07-18)
   ยังคงใช้ด่าน static ทั้งหมด + vitest แต่เรียกใช้เฉพาะไฟล์ node:test ที่มีการเปลี่ยนแปลงโดย
   PR ที่เข้าขบวน; ชุดการทดสอบแบบเต็มยังคงต้องทำงานอย่างน้อยวันละครั้งบน
   ปลายที่สะสมแล้ว (หนึ่งขบวนที่ไม่ใช้ `--fast`)
3. **สีเขียว** → ผสาน PR ตามลำดับ (ตรวจสอบ `state,headRefOid` ซ้ำก่อนแต่ละรายการ —
   PR ที่ head เปลี่ยนแปลงต้องกลับเข้าสู่การตรวจสอบ) พิสูจน์ว่า diff สุทธิของแต่ละการผสานคือ
   การเปลี่ยนแปลงของ PR นั้นเอง (ห้าม auto-resolve ด้วยการย้อนการเปลี่ยนแปลง: ตรวจสอบ `git diff --stat`
   เพื่อหาการลบนอกขอบเขต)
4. **สีแดง** → แบ่งกลุ่มออกเป็นครึ่งๆ (ตรวจสอบแต่ละครึ่ง) แทนการตรวจสอบซ้ำ
   ทีละรายการ; ส่ง PR ที่เป็นต้นเหตุกลับไปยังคิวตรวจสอบพร้อมหลักฐาน
5. **ห้ามเด็ดขาด**: ผสานเข้าสู่ branch ที่ถูกหยุดไว้ระหว่างช่วงหยุดรับการผสานเพื่อออกรุ่น; ใช้ `git stash` ไม่ว่าที่ใด;
   เรียก CI ซ้ำทั้งหมดโดยหวังว่าสถานะสีแดงจะหายไป (กฎ: สีแดงคือข้อมูล)

## การแบ่งระดับ (เหตุผลที่คิวปลอดภัยแม้ใช้เฉพาะ fast-gates)

- **ต่อ PR** (fast-gates ของ quality.yml): การทดสอบที่ได้รับผลกระทบตาม TIA + unit แบบเต็ม 4 shard +
  vitest + ชุด lint + typecheck + การตรวจสอบความถูกต้องของเอกสาร/changelog
- **ต่อกลุ่ม/ปลาย** (continuous release-green): ด่านแบบ HARD ด้วย `--quick` ทุกครั้งที่ push ไปยัง
  release branch; การกวาดตรวจแบบเต็มด้วย `--with-build --full-ci` วันละ 3 ครั้ง
- **ต่อ release** (ci.yml บน release PR): เมทริกซ์ทั้งหมด รวมถึง E2E ×9,
  package-artifact + tarball boot-smoke, coverage/ratchets

ไม่มีสิ่งใดได้รับการตรวจสอบน้อยลงกว่าเดิม — เพียงย้ายพื้นผิวงานหนักไปรันต่อกลุ่ม/ปลาย
แทนการรันต่อ PR ซึ่งเป็นสิ่งที่ช่วยลดรอบการทำงานแบบ O(N)

## ข้อกำหนดเบื้องต้นสำหรับ checkout ใหม่เพื่อใช้ `merge-train.sh`

สคริปต์จะเรียกใช้ **preflight** แบบหยุดทันทีเมื่อล้มเหลวบน checkout หลัก (ก่อนดำเนินการใดๆ
ใน worktree) เพื่อให้การติดตั้งที่เสียหายไม่สามารถแสดงผลเสมือนเป็นขบวนสีแดงได้:

1. เรียกใช้ `npm ci` แล้วเรียก postinstall ของ `bun` ที่ npm บล็อกไว้:
   `(cd node_modules/bun && node install.js)` — มิฉะนั้น `check:provider-consistency`
   และ `check:known-symbols` (ทั้งคู่ใช้ `bun scripts/…`) จะล้มเหลวทั้งบนขบวนและ base โดย
   ไม่มีบรรทัดระบุการละเมิด
2. ต้องไม่มี `node_modules/node_modules` หลงเหลืออยู่ (โครงสร้าง dependency ที่ซ้ำกัน; React ถูกโหลดสองครั้ง
   และชุด UI vitest ล้มเหลวทันที)
3. ต้องมี `node_modules/.bin/tsc` และเรียกใช้งานได้ (การติดตั้งที่ไม่สมบูรณ์จะไม่มีไฟล์นี้)

ขบวนเรียกใช้ `npm run check:cycles:ratchet` ซึ่งเป็นขั้นตอนบังคับ; ส่วน `npm run check:cycles`
เพียงอย่างเดียวมีไว้ให้ข้อมูล (คำสั่งนี้แสดงรายการ SCC และจบด้วยสถานะ non-zero แม้บน base ที่สมบูรณ์)
