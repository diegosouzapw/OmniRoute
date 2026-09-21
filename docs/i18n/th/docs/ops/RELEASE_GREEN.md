# Release-Green: keeping the queue and release branch green (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

## ปัญหาที่โซลูชันนี้แก้ไข

**เกตแบบเต็ม** (`.github/workflows/ci.yml` — unit shards, vitest, ratchets,
`package-artifact`, SonarQube, E2E) ทำงาน **เฉพาะบน release PR** (PR → `main`) เท่านั้น ส่วน PR ที่มีเป้าหมายเป็น
`release/**` จะได้รับ **fast-gates** (`quality.yml`: การทดสอบที่ได้รับผลกระทบตาม TIA + typecheck + lint)
และสำหรับการเปลี่ยนแปลงโค้ด จะมี production build แบบ **ให้คำแนะนำ** ผลที่ตามมาคือ ปัญหาแดงที่เกิดเฉพาะตอน release ยังคง
สะสมอยู่บน release branch อย่างเงียบ ๆ และ **ระเบิดออกมาเป็นชั้น ๆ ชั้นละประมาณ 40 นาที** เมื่อถึงเวลา release
โดยเกิดขึ้นทีละปัญหา

"release-green family" มีไว้เพื่อ **คาดการณ์ล่วงหน้า** ถึงปัญหาแดงเหล่านั้น — ตรวจสอบสิ่งที่เทียบเท่ากับเกตแบบเต็ม
**ภายในเครื่อง / นอกกระบวนการ release** ได้ทุกเมื่อ เพื่อให้ release PR
เป็นสีเขียวตั้งแต่การรัน CI ครั้งแรก

> **หลักการที่ไม่สามารถต่อรองได้:** สิ่งเหล่านี้จะไม่บล็อกผู้มีส่วนร่วม เราจะไม่เพิ่ม required
> check ที่ทำให้ PR ของพวกเขาล้มเหลว **drift** (ratchets) เป็นเรื่องที่ผู้ดูแลต้องกำหนด baseline ใหม่ตอน release —
> ไม่ใช่เรื่องที่ผู้มีส่วนร่วมต้องกังวล ไม่มีส่วนใดที่ **ปิด** PR (ขโมยเครดิต) หรือ
> **ลดความเข้มงวด** ของการทดสอบเพื่อให้ผ่าน

## กลุ่มเครื่องมือ (4 ส่วน) — และวิธีที่แต่ละส่วนทำงานอย่างอิสระ

| ส่วน                                                                       | คืออะไร                                                                  | ควรรันเมื่อใด                                                               | ขอบเขต                        |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------ | --------------------------------------------------------------------------- | ----------------------------- |
| **`/green-prs`** (Solution A)                                              | การสแกน **คิวของ PR ที่เปิดอยู่** ตามคำขอโดยผู้ดูแล                      | **เป็นอิสระและเป็นระยะ ๆ** — โดยเฉพาะอย่างยิ่ง **ก่อน** `/generate-release` | คิว PR ทั้งหมด → `release/**` |
| **`/validate-release-green`** (Solution C — `npm run check:release-green`) | เอนจินตรวจสอบความถูกต้อง: จำลองเกตแบบเต็มกับ branch หรือ merge candidate | เป็นอิสระ ได้ทุกเมื่อ                                                       | branch หรือ merge-PR ที่ระบุ  |
| **`/babysit <PR#>`**                                                       | ขับเคลื่อน **CI แบบสด** ของ PR **หนึ่งรายการ** ให้เป็นสีเขียว            | เป็นอิสระ สำหรับแต่ละ PR                                                    | PR เดียว                      |
| **`nightly-release-green.yml`** (Solution D)                               | workflow อัตโนมัติที่ทำงานทุกคืน; เปิด issue เมื่อเกิด HARD red          | อัตโนมัติ (cron)                                                            | release branch ที่ใช้งานอยู่  |

**คำตอบสั้น ๆ สำหรับคำถามว่า "สิ่งนี้มีไว้สำหรับ release เท่านั้นหรือไม่?":** **ไม่ใช่** `/green-prs` ถูกออกแบบมาให้
ทำงาน **เป็นระยะ ๆ ระหว่าง release** การรันอย่างอิสระคือรูปแบบการใช้งานตามปกติ — release เป็นเพียง
ช่วงเวลาที่การรันเครื่องมือนี้ให้คุณค่าสูงสุดเท่านั้น

## บิลด์แนะนำจาก PR สู่รีลีส

ขณะนี้ `quality.yml` มี `Build (advisory)` สำหรับ PR โค้ดที่ไม่ใช่ฉบับร่างและบรานช์คิวของ Mergify
โดยทำตามขั้นตอนการบิลด์สำหรับโปรดักชันจาก `ci.yml`: Node 24, `npm-ci-retry`,
`check:node-runtime` และ `npm run build` พร้อม `OMNIROUTE_USE_TURBOPACK=1` ทั้งนี้จงใจ
ไม่อัปโหลดอาร์ติแฟกต์ของบิลด์ เนื่องจากไม่มีงานตรวจสอบคุณภาพปลายทางใดใช้งานอาร์ติแฟกต์ดังกล่าวในเวิร์กโฟลว์นี้
ให้นำ `continue-on-error` ออกหลังจากการรัน PR รีลีสมีเสถียรภาพเป็นเวลาหนึ่งสัปดาห์ เพื่อให้สัญญาณนี้กลายเป็น
เกตบังคับจาก PR สู่รีลีส

## โซลูชัน C — `npm run check:release-green` (เอนจิน)

จำลองการตรวจสอบที่เทียบเท่ากับรีลีสกับ working tree ปัจจุบัน และจำแนกสถานะสีแดงแต่ละรายการ:

- **HARD** (typecheck, ข้อผิดพลาดจาก lint, unit, vitest, db-rules, public-creds และ
  `package-artifact` ที่เป็นตัวเลือก) → **ข้อบกพร่องจริง**; `exit 1` แก้ไขบนบรานช์ต้นทาง (TDD, กฎ #18)
- **DRIFT** (**คำเตือน** จาก eslint, cognitive-complexity, file-size) → ค่าเบี่ยงเบนของ ratchet ที่สะสมใน
  รอบการทำงาน ซึ่ง **ไม่ใช่ความผิดของผู้มีส่วนร่วม**; ระบบจะรายงานเท่านั้น และ **ผู้ดูแลจะกำหนด baseline ใหม่เมื่อ
  รีลีส** DRIFT **จะไม่เปลี่ยน exit code** — ดังนั้นจึงไม่บล็อกผู้ใด

```bash
npm run check:release-green                 # บรานช์ปัจจุบัน (working tree)
node scripts/quality/validate-release-green.mjs --json   # เอาต์พุตแบบมีโครงสร้าง
node scripts/quality/validate-release-green.mjs --quick  # ข้าม unit+vitest (เฉพาะ drift+typecheck+lint)
node scripts/quality/validate-release-green.mjs --with-build  # รวม package-artifact (ช้า)
```

ทำเพียงการวินิจฉัยและ **รายงาน** (ไม่มีการแก้ไขอัตโนมัติ) การประสานงานเพื่อแก้ไขจนผ่านทั้งหมดอยู่ใน
`/green-prs` และ `/review-prs`

## โซลูชัน A — `/green-prs` (การสแกนคิว)

ขั้นตอน (สรุป — ดูรายละเอียดในสกิล `green-prs`):

1. **สำรวจรายการ** คิวของ PR ที่เปิดอยู่เทียบกับบรานช์รีลีสที่ใช้งานอยู่
2. **คัดแยก** PR แต่ละรายการ (ดำเนินการต่อได้ / สมควรปฏิเสธ / ต้องให้ผู้เขียนดำเนินการ) — รายการที่สมควรปฏิเสธ/ต้องให้ผู้เขียนดำเนินการจะถูก
   **รายงาน แต่ไม่ปิด** (ผู้เขียนเป็นผู้ตัดสินใจ)
3. สำหรับ PR แต่ละรายการที่ดำเนินการต่อได้ ให้ใช้ **worktree ที่แยกต่างหาก** (กฎ #19) นำ PR ไปยังปลายล่าสุดของรีลีส แล้วรัน
   `npm run check:release-green`:
   - **HARD** → แก้ไข **บนบรานช์ของผู้มีส่วนร่วม** ผ่านการระบุผู้เขียนร่วม (รักษาสถานะ "Merged" ของผู้เขียนไว้)
     แล้วรันซ้ำจนกว่า HARD ทั้งหมดจะถูกแก้ไข
   - **DRIFT** → ปล่อยไว้ โดยจะกำหนด baseline ใหม่เมื่อรีลีส
4. **รายงาน** ตาราง PR × (ผลการตัดสิน, รายการ HARD ที่เป็นสีแดง, แก้ไขแล้ว?, DRIFT, ผ่านเกตรีลีสแล้วหรือยัง?)

สามารถ **เตรียม** คิวโดยไม่ผสานได้ โดยจะผสานเฉพาะเมื่อมีการร้องขออย่างชัดเจนเท่านั้น — และจะไม่ปิด PR เด็ดขาด

## รอบการทำงานที่แนะนำ

- รัน **`/green-prs` เป็นระยะ** (เช่น ทุกสัปดาห์) และ **ทุกครั้งก่อน
  `/generate-release`**
- คง **`nightly-release-green.yml`** (โซลูชัน D) ไว้เป็นสัญญาณต่อเนื่อง: เมื่อเวิร์กโฟลว์นี้เปิด issue สำหรับ
  HARD ที่เป็นสีแดง ก็ถึงเวลาสแกน
- ใช้ **`/validate-release-green`** ตามความจำเป็นเพื่อตรวจสอบบรานช์หรือรายการที่กำลังพิจารณาผสานโดยเฉพาะ
- ใช้ **`/babysit <PR#>`** เมื่อจำเป็นต้องดูแล PR รายการใดรายการหนึ่งจนผ่านทั้งหมดบน CI จริง

## ความสัมพันธ์กับรีลีส

- `/generate-release` เรียกการตรวจสอบใน **เฟส 0 (pre-flight)**: กำหนด baseline ของ DRIFT ใหม่และแก้ไข
  HARD ก่อนเปิด PR รีลีส
- `/review-prs` ใช้เกต release-green ในขั้นตอนตัดสินใจผสาน (ผ่านทั้งหมดก่อนผสาน)

เป้าหมายของทุกส่วนเหมือนกันคือ: **PR รีลีสที่ผ่านทั้งหมดตั้งแต่การรัน CI ครั้งแรก** แทนที่จะต้องไล่แก้
สถานะสีแดงเป็นชั้น ๆ รอบละ 40 นาทีในวันรีลีส
