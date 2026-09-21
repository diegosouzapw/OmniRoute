# Merge Queue & Manual Merge-Train Runbook (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇸 [es](../../../es/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

ตั้งแต่ v3.8.49 (WS3.2/WS3.4 ของแผนคุณภาพ/ความเร็ว) เส้นทางการผสานเริ่มต้นสำหรับ
PR ที่ผ่านการตรวจสอบเข้าสู่ `release/vX.Y.Z` คือ **คิวผสานของ Mergify** (`.mergify.yml`);
ส่วน **ขบวนการผสานแบบแมนนวล** ที่อธิบายไว้ด้านล่างคือเส้นทางสำรอง — ใช้ระหว่างเกิดเหตุขัดข้อง,
ช่วงหยุดการเผยแพร่ หรือหากแผน Open Source ของ Mergify มีการเปลี่ยนแปลง

## เส้นทางเริ่มต้น: คิว Mergify

1. PR ผ่านการตรวจสอบ/เป็นสีเขียวโดยแคมเปญต่างๆ และได้รับการอนุมัติจากเกต ⭐
   ก่อนผสานของเจ้าของ (รายงาน + การตัดสินใจแยกตามแต่ละรายการ — ดู `/merge-prs` ขั้นตอน 0.75)
2. เจ้าของ (หรือเซสชันที่ดำเนินการตามการตัดสินใจของเจ้าของ) ใช้ป้ายกำกับ **`queue`**
   ป้ายกำกับนี้ถือเป็นการอนุมัติให้ผสาน; Mergify มีหน้าที่เพียงดำเนินการเท่านั้น
3. Mergify จัดกลุ่ม PR ที่อยู่ในคิวได้สูงสุด 10 รายการ ตรวจสอบกลุ่มกับเกตแบบรวดเร็ว
   และผสาน (squash) กลุ่มที่เป็นสีแดงจะถูก **แบ่งครึ่งเพื่อค้นหาสาเหตุโดยอัตโนมัติ** — PR ที่ก่อปัญหา
   จะถูกแยกออกด้วยการตรวจสอบซ้ำประมาณ log2(N) รอบและนำออกจากคิว; ส่วนที่เหลือจะดำเนินการต่อ
4. หลังการผสาน เวิร์กโฟลว์ตรวจสอบสถานะสีเขียวของรีลีสอย่างต่อเนื่องจะตรวจสอบ tip ใหม่เมื่อมีการ push
   และเปิด issue ระบุที่มาหากชุดการเปลี่ยนแปลงร่วมกันก่อให้เกิดการถดถอย (ไม่มีการ revert อัตโนมัติ)

มาตรการป้องกัน (สอดคล้องกับกฎเคร่งครัด #21/#22 ใน `CLAUDE.md`):

- **มีการหยุดการเผยแพร่อยู่** → ห้ามติดป้ายกำกับให้ PR ที่กำหนดเป้าหมายไปยัง branch ที่ถูกตรึง; ให้เปลี่ยนเป้าหมายเป็น
  `release/vX+1` ที่ใช้งานอยู่ก่อน
- **PR ที่กำลังดำเนินการของเซสชันอื่น** → ห้ามติดป้ายกำกับ; มีเพียงเซสชันเจ้าของเท่านั้นที่นำงานของตนเองเข้าคิว
- diff ที่มีเฉพาะการทดสอบและ PR ที่มีป้ายกำกับ `hotfix` จะใช้ CI แบบลดขั้นตอนอยู่แล้ว (ดู
  `RELEASE_CHECKLIST.md` → ช่องทางด่วนสำหรับ Hotfix); เงื่อนไขของคิวจะยอมรับชุดการตรวจสอบใดๆ
  ที่ได้ทำงานจริง (`#check-failure=0` + `#check-pending=0`)

## เส้นทางสำรอง: ขบวนการผสานแบบแมนนวล

ใช้เมื่อคิวไม่พร้อมใช้งาน แนวทางนี้ทำให้แนวปฏิบัติที่เคยระบาย PR 33 รายการได้
ภายในวันเดียวระหว่างรอบ v3.8.47 เป็นมาตรฐาน:

1. **รวบรวมกลุ่ม** (PR ที่ผ่านการตรวจสอบและอนุมัติแล้วประมาณ 10–30 รายการ) ตรวจสอบการชนกันของ `linked:`
   (`tap.testFiles` เดียวกัน, hunk เดียวกันใน CHANGELOG) และจัดลำดับให้รายการเหล่านั้นทำงานทีละรายการ
2. **ตรวจสอบเพียงครั้งเดียว**: ใน worktree แยกที่สร้างจาก tip ของรีลีส ให้ผสาน head ทั้งหมดในกลุ่ม
   ภายในเครื่อง จากนั้นเรียกใช้ชุดการทดสอบที่เทียบเท่ากับรีลีส
   (`npm run check:release-green`, เพิ่ม `--with-build` ก่อนเผยแพร่)
   `scripts/release/merge-train.sh <base> <PR#>…` ทำขั้นตอน 1–2 โดยอัตโนมัติ (PR ที่ขัดแย้งกัน
   จะถูกนำออก และขบวนจะดำเนินการต่อ) โหมดเต็มจะเรียกใช้ `npm run test:unit` — ตัวรัน
   ที่ปรับแต่งตามเครื่อง (`--test-concurrency=20`) **ไม่ใช่** CI สอง shard แบบลำดับที่ใช้ 4 คอร์
   ซึ่งทำให้เฟสหลักใช้ทรัพยากรเพียงประมาณ 25% ของเครื่อง 16 คอร์ (แก้ไขเมื่อ
   2026-07-18) `--fast` (สำหรับการระบายขบวนขนาดใหญ่ภายในวันเดียว ซึ่งเจ้าของอนุมัติเมื่อ 2026-07-18)
   ยังคงเรียกใช้เกตแบบสแตติกทั้งหมด + vitest แต่เรียกใช้เฉพาะไฟล์ node:test ที่มีการเปลี่ยนแปลงโดย
   PR ที่เข้าร่วมขบวน; ยังคงต้องเรียกใช้ชุดการทดสอบแบบเต็มอย่างน้อยวันละครั้งบน
   tip ที่สะสมการเปลี่ยนแปลงแล้ว (หนึ่งขบวนที่ไม่ใช้ `--fast`)
3. **สีเขียว** → ผสาน PR ตามลำดับ (ตรวจสอบ `state,headRefOid` ซ้ำก่อนแต่ละรายการ —
   PR ที่ head มีการเปลี่ยนแปลงต้องกลับเข้าสู่กระบวนการตรวจสอบ) พิสูจน์ว่า diff สุทธิของแต่ละการผสานคือ
   การเปลี่ยนแปลงของ PR นั้นเอง (ห้าม revert ด้วยการแก้ไขอัตโนมัติ: ตรวจสอบ `git diff --stat` เพื่อหา
   การลบที่อยู่นอกขอบเขต)
4. **สีแดง** → แบ่งกลุ่มออกเป็นครึ่งๆ (ตรวจสอบแต่ละครึ่ง) แทนการตรวจสอบซ้ำ
   ทีละรายการ; ส่ง PR ที่ก่อปัญหากลับไปยังคิวตรวจสอบพร้อมหลักฐาน
5. **ห้ามเด็ดขาด**: ผสานเข้าสู่ branch ที่ถูกตรึงระหว่างช่วงหยุดการเผยแพร่; ใช้ `git stash` ที่ใดก็ตาม;
   เรียกใช้ CI ซ้ำทั้งหมดโดยหวังว่าสถานะสีแดงจะหายไป (กฎ: สถานะสีแดงคือข้อมูล)

## การแบ่งระดับ (เหตุใดคิวจึงปลอดภัยแม้ใช้เพียงเกตแบบรวดเร็ว)

- **ต่อ PR** (เกตแบบรวดเร็วใน quality.yml): การทดสอบที่ได้รับผลกระทบตาม TIA + ยูนิตแบบเต็ม 4 shard +
  vitest + ชุด lint + typecheck + การตรวจสอบความถูกต้องของเอกสาร/บันทึกการเปลี่ยนแปลง
- **ต่อกลุ่ม/tip** (การตรวจสอบสถานะสีเขียวของรีลีสอย่างต่อเนื่อง): เกตแบบ HARD ด้วย `--quick` ทุกครั้งที่ push ไปยัง
  branch รีลีส; การตรวจสอบแบบเต็มด้วย `--with-build --full-ci` วันละ 3 ครั้ง
- **ต่อรีลีส** (ci.yml บน PR รีลีส): เมทริกซ์ทั้งหมด รวมถึง E2E ×9,
  package-artifact + การทดสอบเริ่มระบบจาก tarball, coverage/ratchets

ไม่มีสิ่งใดได้รับการตรวจสอบน้อยลงกว่าเดิม — เพียงแต่ส่วนงานหนักทำงานต่อกลุ่ม/tip
แทนที่จะทำต่อ PR ซึ่งเป็นสิ่งที่ช่วยลดรอบการทำงานแบบ O(N)
