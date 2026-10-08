# Quality Gates Reference (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

เอกสารนี้เป็นแหล่งอ้างอิงหลักที่มีผลบังคับใช้สำหรับเกตตรวจสอบคุณภาพ CI ทั้งหมดใน OmniRoute
โดยอธิบายแต่ละเกต สิ่งที่เกตตรวจสอบ งาน CI ที่เกตทำงานอยู่ นโยบายที่ใช้ว่าเป็น
ค่าฐานแบบ ratchet หรือผ่าน/ไม่ผ่าน รวมถึงเกตนั้นบล็อกบิลด์หรือมีไว้เพื่อให้คำแนะนำ

สำหรับสรุปแบบย่อและนโยบาย allowlist โปรดดูส่วน "Quality Gates & Ratchets"
ใน `AGENTS.md` สำหรับการประเมินเชิงวิพากษ์ การจัดระดับวุฒิภาวะ และแผนการจำลองระบบเดียวกัน
โดยไม่ขึ้นกับเครื่องมือ โปรดดู
[คู่มือ Quality Gate](../ops/QUALITY_GATE_PLAYBOOK.md)

---

## รายการเกตและโปรไฟล์การดำเนินการ

### การรับแคนดิเดต

เวิร์กโฟลว์ CI และ Quality Gates ต่างให้ผลตัดสินที่คงที่ ได้แก่ `Gate / CI` และ
`Gate / Quality` นโยบายการรับที่มีการกำหนดเวอร์ชันของแต่ละเวิร์กโฟลว์ระบุทุกงานต้นทาง
ว่าเป็นงานบังคับหรืองานให้คำแนะนำ งานบังคับที่เกี่ยวข้องต้องสำเร็จ โดยผลลัพธ์ที่หายไป
ถูกยกเลิก ถูกข้าม อยู่ระหว่างดำเนินการ หรือไม่ทราบสถานะ ไม่สามารถยืนยัน PASS ได้ การจัดประเภท
docs-only หรือ catalog-only ที่ถูกต้องอาจทำให้เลนโค้ดไม่เกี่ยวข้องได้
แต่ PR แบบร่างไม่ถือเป็นแคนดิเดตที่ยอมรับได้ ป้ายกำกับ `hotfix` ไม่ได้ยกเว้นข้อกำหนดด้านหลักฐาน

ทั้งสองเวิร์กโฟลว์ครอบคลุม PR และการพุชไปยังบรานช์ main/release การสั่งทำงานด้วยตนเอง และ
เหตุการณ์ merge-group การพุช การสั่งทำงาน และ merge-group จะรันชุดการตรวจสอบทั้งหมด Fork
และ merge group ใช้ hosted runner สำหรับงานที่โดยปกติจะเลือก self-hosted runner
โดยต้องตรวจสอบว่ามีขีดความสามารถของ hosted runner เพียงพอก่อนเปิดใช้งาน

ใบรับรอง JSON แต่ละรายการระบุ SHA ที่ checkout, workflow run และ attempt
CLI จะปฏิเสธเมื่อ SHA ของ checkout/event ไม่ตรงกัน การทดสอบเวิร์กโฟลว์ผูกสมาชิกของนโยบาย
เข้ากับรายการ `needs` ของงานตัดสินผล เพื่อไม่ให้เลนที่เพิ่มใหม่หรือถูกลบหายไปโดยไม่มีการแจ้งเตือน
ใบรับรองครอบคลุมเฉพาะเวิร์กโฟลว์ของตนเอง ไม่ครอบคลุมการเผยแพร่ การดีพลอย หรือรายละเอียดภายใน
ของ advisory scanner ที่มีอยู่ การเปิดใช้งานชื่อการตรวจสอบทั้งสองในกฎของบรานช์เป็น
การเปลี่ยนแปลงด้านการดูแลระบบที่แยกต่างหาก การเพิ่มงานเหล่านี้ไม่ได้ปกป้องบรานช์โดยอัตโนมัติ

### รายการ static scan

รายการ npm-alias ที่มีการกำหนดเวอร์ชันและสมาชิกของ static-scan อยู่ใน
`config/quality/gate-manifest.json` รัน `npm run check:gate-manifest` เพื่อตรวจสอบ
ชื่อสคริปต์และคำสั่งที่ตรงกันทุกประการเทียบกับ `package.json` การเพิ่ม การลบ และ
การเปลี่ยนแปลงคำสั่งจะทำให้ทั้ง local hook และงานจำแนกการเปลี่ยนแปลงใน CI ล้มเหลว
alias ไม่ใช่งานเวิร์กโฟลว์ matrix instance หรือ test case ดังนั้นต้องไม่แสดงจำนวนเหล่านี้
ราวกับว่าสามารถใช้แทนกันได้

ใช้ `npm run quality:scan -- --list` หรือ `npm run quality:scan:fast -- --list`
เพื่อตรวจสอบ alias ที่เลือกโดยไม่เรียกใช้งาน runner จะเรียกผ่าน
npm entrypoint ดังนั้น runtime ของรายการดังกล่าว (รวมถึง Bun เมื่อกำหนดค่าไว้) จะยังคงเดิม
manifest บันทึก alias ที่อยู่นอกโปรไฟล์เหล่านี้ว่าเป็นรายการที่เรียกแยกต่างหาก และ
ห้ามใช้คำสั่งบำรุงรักษาในโปรไฟล์สแกนแบบอ่านอย่างเดียว

โปรไฟล์เหล่านี้ครอบคลุมเฉพาะ static scan เท่านั้น ไม่ได้รับรองการทดสอบผลิตภัณฑ์
coverage, packaging, การตรวจสอบภายนอก หรือการยอมรับแคนดิเดตสำหรับรีลีสอย่างครบถ้วน
การรับของเวิร์กโฟลว์ใช้ `config/quality/admission-policy.json` ที่เชื่อมโยงไว้และ
`scripts/quality/admission-verdict.mjs` โปรไฟล์ release-observer ยังคงแยกต่างหาก
ให้ตรวจสอบการตรวจเช็กและใบรับรองที่เกี่ยวข้องของโปรไฟล์เหล่านั้นโดยอิสระ รายการแบบร้อยแก้ว
ด้านล่างเป็นข้อมูลอ้างอิง ไม่ใช่หลักฐานว่าเกตได้ทำงานจริง

สคริปต์อยู่ภายใต้ `scripts/check/` (เกตนโยบาย) และ `scripts/quality/` (กลไก ratchet)
แหล่งข้อมูลจริงของ CI คือ `.github/workflows/ci.yml`

### เส้นทางด่วนสำหรับ Release PR (`quality.yml`)

`.github/workflows/quality.yml` ทำงานเสริม CI สำหรับ PR ของ main/release, การพุชไปยังบรานช์
ที่ได้รับการปกป้อง การสั่งทำงาน และ merge group โดย PR จะใช้การตรวจสอบแบบเร็วที่กรองตาม path
การ build ซ้ำที่ถูกปิดใช้งานอย่างถาวรถูกลบแล้ว ส่วนการตรวจสอบ build/package/boot จริงยังคงอยู่ใน CI

| งาน                                              | ขอบเขต                                                                                                                                                                                                    | การบล็อก        |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `Docs Gates (fast-path)`                         | PR ของเอกสาร/โค้ด; การอ้างอิงเอกสาร API และ docs-all                                                                                                                                                      | ใช่             |
| `Fast Quality Gates`                             | PR ของโค้ด; การตรวจสอบแบบ static, typecheck, typecheck ของแดชบอร์ด และ unit test ที่ได้รับผลกระทบ                                                                                                         | ใช่             |
| `Forgotten sibling tests`                        | PR ของโค้ด; ติดตามโมดูลที่เปลี่ยนแปลงไปยัง static consumer และ sibling test ที่เป็นไปได้ โดยรายงานเส้นทางผ่าน barrel และ dynamic-import เป็นการวินิจฉัยเชิงคำแนะนำ พร้อมข้อยกเว้น allowlist ที่อ้างอิงไว้ | **ให้คำแนะนำ**  |
| `Vitest (fast-path)`                             | PR ของโค้ด; ชุดทดสอบ vitest แบบเร็ว                                                                                                                                                                       | ใช่             |
| `Unit Tests fast-path`                           | PR ของโค้ด; ชุด unit test แบบ 4 shard                                                                                                                                                                     | ใช่             |
| `No new ESLint warnings`                         | PR ของโค้ด; ตัวป้องกัน lint ที่คำนึงถึง suppression                                                                                                                                                       | ใช่ รวมถึง fork |
| `Merge integrity (changelog + generated skills)` | PR ที่ไม่ใช่แบบร่าง; การซิงค์ changelog และ skill ที่สร้างขึ้น                                                                                                                                            | ใช่ รวมถึง fork |

#### รายงาน Forgotten sibling tests

`npm run check:forgotten-sibling-tests` ใช้ import resolver ที่อยู่เบื้องหลังแผนที่ผลกระทบต่อการทดสอบซ้ำ
สำหรับทุกโมดูล production ที่เปลี่ยนแปลง ระบบจะรายงานสายโซ่
`changed module/symbol -> static consumer -> candidate sibling test` ที่ให้ผลลัพธ์แบบกำหนดแน่นอน
เมื่อการเปลี่ยนแปลงของ pull request ไม่มีการทดสอบที่เป็นไปได้ดังกล่าว สรุป Markdown และผลลัพธ์ JSON
จะถูกเก็บไว้เป็นอาร์ติแฟกต์เวิร์กโฟลว์ `forgotten-sibling-tests` เพื่อใช้ปรับเทียบก่อนเปิดใช้การบล็อกใดๆ

การส่งออกซ้ำผ่าน barrel และ dynamic imports เป็นเพียงการวินิจฉัยการ resolve เท่านั้น โดยจะไม่ก่อให้เกิด
ผลการตรวจที่บล็อกการดำเนินการ ข้อยกเว้นที่ผ่านการตรวจสอบแล้วอยู่ใน
`config/quality/forgotten-sibling-allowlist.json` แต่ละรายการต้องระบุ consumer และ candidate
test ให้เหตุผลที่เฉพาะเจาะจง และลิงก์ไปยัง GitHub issue หรือ pull request รายการที่มีรูปแบบไม่ถูกต้องจะล้มเหลว
แบบปิด ข้อยกเว้นไม่สามารถระงับ candidate test ที่ถูกลบหรือ diff ที่เพิ่ม `.skip`/`.todo`
ได้ ส่วนการทำให้ assertion อ่อนลงและการปกปิดรูปแบบอื่น ๆ ยังคงอยู่ภายใต้ gate
`check:test-masking` ซึ่งบล็อกการดำเนินการโดยอิสระ

### งาน: `lint`

ทำงานกับทุก PR ที่ส่งไปยัง `main` และบล็อกการ merge เมื่อเกิดความล้มเหลว

| สคริปต์ (`npm run ...`)           | สิ่งที่ตรวจสอบ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | การบล็อก                                  |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| `check:node-runtime`              | เวอร์ชัน Node.js อยู่ภายในช่วงที่รองรับ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | ใช่                                       |
| `check:cycles`                    | การ import แบบวนรอบทั่วทั้ง `src/` + `open-sse/` (อิง AST และ resolve `paths` ของ tsconfig แล้ว) โหมดปกติ = ให้คำแนะนำและแสดงรายการวงจร `check:cycles:ratchet` (ซึ่งเป็นสิ่งที่ CI เรียกใช้) จะบล็อกเมื่อจำนวนเกินเพดาน `metrics.cycles` ใน `quality-baseline.json` — ปัจจุบันคือ 14 โดยมี `direction: down` ดังนั้นค่าจึงลดลงได้เท่านั้น (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | ใช่ (ratchet)                             |
| `check:route-validation:t06`      | มี Zod schemas อยู่ในทุก route (นโยบาย Tier 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | ใช่                                       |
| `check:any-budget:t11`            | จำนวน `@ts-expect-error // any` ไม่เกินงบประมาณ (catraca ระดับ Tier 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | ใช่                                       |
| `check:provider-consistency`      | ผู้ให้บริการทุกรายใน `providers.ts` มีรายการที่ตรงกันใน `providerRegistry.ts` (และในทางกลับกัน ภายใน allowlist)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | ใช่                                       |
| `check:model-lifecycle`           | ตารางการกำหนดเส้นทางทั้งสามรายการที่ดูแลด้วยตนเองยังคงสอดคล้องกับสแนปช็อตวงจรชีวิตที่เช็กอินไว้ (#11503): `FITNESS_TABLE` (`taskFitness.ts`) ไม่ให้คะแนน id ที่เลิกใช้งานแล้วซึ่ง `REGISTRY` สามารถกำหนดเส้นทางไปถึงได้; เป้าหมายทั้งหมดของ `BUILT_IN_ALIASES` มีอยู่ใน `REGISTRY` และไม่มีอยู่ในสแนปช็อต id ที่เลิกใช้งานแล้ว; id ที่เลิกใช้งานแล้วทุกรายการซึ่งยังอยู่ใน `REGISTRY` จะถูกส่งต่อหรือระบุไว้ใน `allowedRetiredInCatalog`; และไม่มีต้นทางหรือปลายทางของ `DEFAULT_DEGRADATION_MAP` ที่ปรากฏว่าเลิกใช้งานแล้วในสแนปช็อตดังกล่าว การตรวจสอบนี้ไม่ได้พิสูจน์ว่าโมเดลหนึ่งกำลังให้บริการโดยต้นทางที่ใช้งานจริงอยู่ในปัจจุบัน ทำงานแบบออฟไลน์ — เปรียบเทียบกับ `config/quality/model-lifecycle.json` ซึ่งรีเฟรชด้วยตนเองโดยใช้ `npm run quality:refresh-model-lifecycle` (ใช้เครือข่าย; ไม่ได้เชื่อมเข้ากับ CI) `allowedRetiredInCatalog` เป็นกลไก ratchet เพื่อลดจำนวนรายการ: ให้เพิ่มรายการเฉพาะเมื่อมี issue สำหรับติดตามเท่านั้น | ใช่                                       |
| `check:fetch-targets`             | ทุก `fetch("/api/...")` ใน `src/` ฝั่งไคลเอ็นต์สามารถชี้ไปยัง `route.ts` ที่มีอยู่จริงได้                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | ใช่                                       |
| `check:deps`                      | dependency ทั้งหมดที่ติดตั้งได้ด้วย `npm install` จากทุกไฟล์ `package.json` ใน repo ต้องอยู่ใน `dependency-allowlist.json`; package ใหม่ที่ไม่ได้ตรึงเวอร์ชันหรืออาจเป็น slopsquatting จะถูกแจ้งเตือน                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | ใช่                                       |
| `audit:deps`                      | `npm audit` (รูท) — ไม่มีคำแนะนำด้านความปลอดภัยระดับสูง/วิกฤต (ทับซ้อนกับ osv `check:vuln-ratchet`; ดู Rationalization Backlog)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | ใช่                                       |
| `check:lockfile`                  | ความถูกต้องของ `package-lock.json` — รีจิสทรี https, แฮชตรวจสอบความสมบูรณ์, ไม่มีการเขียนทับโฮสต์                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | ใช่                                       |
| `check:licenses`                  | รายการที่อนุญาตของใบอนุญาต SPDX สำหรับ dependencies ที่ใช้ใน production                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | ใช่                                       |
| `check:tracked-artifacts`         | ไม่มี artifacts จากการ build / symlinks ของ `node_modules` ที่ถูก commit (ทำงานใน husky pre-commit ด้วย; pre-push ถูกตั้งใจให้ทำงานเพียงเล็กน้อย — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | ใช่                                       |
| `check:ai-attribution`            | ไม่มี trailer `Co-Authored-By` ของ AI/บอต หรือ footer ที่ระบุการสร้างโดย AI ใน commits, ชื่อ หรือเนื้อหาของ PR — กฎเคร่งครัด #16 (อยู่ในลูป fast-gates ของ `quality.yml` สำหรับ PR→`release/**` — อ่าน event payload และไม่ดำเนินการเมื่อไม่ใช่ PR — และขั้นตอนเฉพาะ PR ใน lint ของ `ci.yml` สำหรับ PR→`main`; รวมถึง hook `commit-msg` ของ husky; อนุญาตผู้เขียนร่วมที่เป็นมนุษย์; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `check:vitest-exclusions`         | ข้อยกเว้น Vitest ทุกรายการต้องระบุ tracking issue และปรากฏอยู่ใน `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | ใช่                                       |
| `check:file-size`                 | ไม่มีไฟล์ source ใดเกินขีดจำกัดของนามสกุลนั้น (ratchet: ไฟล์ขนาดใหญ่ที่ถูกตรึงอยู่ในรายการ `frozen`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | ใช่                                       |
| `check:error-helper`              | การตอบกลับข้อผิดพลาดใน executors/handlers ใช้ `buildErrorBody()` / `sanitizeErrorMessage()` (กฎเคร่งครัด #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | ใช่                                       |
| `check:migration-numbering`       | ไฟล์ Migration SQL มีหมายเลขเรียงตามลำดับ โดยไม่มีหมายเลขขาดหายหรือซ้ำกัน                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | ใช่                                       |
| `check:public-creds`              | ไม่มีค่า OAuth `client_id`/`client_secret` หรือคีย์ Firebase Web แบบค่าคงที่อยู่นอก `publicCreds.ts` (กฎเคร่งครัด #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | ใช่                                       |
| `check:db-rules`                  | ไม่มี SQL ดิบอยู่นอกโมดูล `src/lib/db/`; ไม่มีการนำเข้าแบบ barrel จาก `localDb.ts` (กฎเคร่งครัด #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | ใช่                                       |
| `check:known-symbols`             | ตัวดำเนินการของผู้ให้บริการ กลยุทธ์การกำหนดเส้นทาง และตัวแปลที่ลงทะเบียนในตาราง dispatch ของตน สอดคล้องกับไฟล์บนดิสก์ — ไม่มีสัญลักษณ์ที่ไม่ได้ถูกอ้างอิงหรือไม่ได้ประกาศ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | ใช่                                       |
| `check:route-guard-membership`    | ทุกเส้นทางที่สร้างโพรเซสลูกได้รับการจัดประเภทโดย `isLocalOnlyPath()` (กฎเคร่งครัด #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | ใช่                                       |
| `check:test-discovery`            | ทุกไฟล์ `*.test.ts` / `*.spec.ts` ใน repo ถูกรวบรวมโดยตัวรันการทดสอบอย่างน้อยหนึ่งตัว (ratchet: รายการไฟล์ที่ไม่ถูกรวบรวมใน `test-discovery-baseline.json` ทำได้เพียงลดลงเท่านั้น)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | ใช่                                       |
| `check:agent-skills-sync`         | อาร์ติแฟกต์ agent-skills ที่สร้างขึ้นตรงกับแค็ตตาล็อกต้นทาง (ไม่มีความคลาดเคลื่อน)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `check:provider-asset-provenance` | โลโก้/แอสเซ็ตของผู้ให้บริการมีรายการบันทึกแหล่งที่มา                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `lint:json`                       | ไฟล์การกำหนดค่า JSON สามารถแยกวิเคราะห์ได้และเป็นไปตามกฎ lint ของรีโพ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `typecheck:core`                  | คอมไพล์ TypeScript โดยไม่มีข้อผิดพลาด (มีเพียงคำเตือนเชิงแนะนำ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | ใช่                                       |
| `typecheck:noimplicit:core`       | ใช้ `noImplicitAny` แบบเข้มงวด — เป็นแนวทางสำหรับอนาคต โดยจุดเรียกใช้งานเดิมจำนวนมากยังคงต้องเพิ่มคำอธิบายชนิดข้อมูล                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | **เชิงแนะนำ** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` ที่จำกัดขอบเขตไว้เฉพาะ `src/app/(dashboard)/**` (#7033) — รายการอนุญาต 27 ไฟล์ที่คัดสรรไว้ของ `typecheck:core` ไม่มี TSX ของแดชบอร์ดรวมอยู่เลย และ `next build` ก็ไม่เคยตรวจสอบชนิดข้อมูลของไฟล์เหล่านั้นเช่นกัน (`next.config.mjs` ตั้งค่า `ignoreBuildErrors: true`) ดังนั้นรีเกรสชันของตัวระบุที่ไม่มีการอ้างอิงในส่วนนั้น (#6625/#6909) จึงไม่ปรากฏให้ CI ตรวจพบ เปรียบเทียบความแตกต่างกับค่าฐานจำนวนข้อผิดพลาดต่อไฟล์/ต่อรหัส TS ที่ตรึงไว้ (`config/quality/dashboard-typecheck-baseline.json` โดยใช้รูปแบบการบังคับใช้กับรายการที่ล้าสมัยเช่นเดียวกับ `check:known-symbols`) — เฉพาะข้อผิดพลาดใหม่ที่เกินกว่าจำนวนในค่าฐานเท่านั้นที่จะทำให้เกตล้มเหลว ให้ปรับค่าฐานลดลงด้วย `--update` เมื่อแก้ไขข้อผิดพลาดเดิมแล้ว                                                                                                                                                                                                             | ใช่                                       |

### งาน: `quality-gate`

ทำงานหลังจาก `test-coverage` และบล็อกการผสานเมื่อเกิดความล้มเหลว

| สคริปต์                      | ตรวจสอบความถูกต้อง                                                                                                                                                          | การบล็อก                |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| `quality:collect`            | สร้าง `quality-metrics.json` (จำนวนคำเตือน ESLint, coverage จากรายงาน shard ที่ผสานแล้ว)                                                                                    | ใช่ (ทำงานก่อน ratchet) |
| `quality:ratchet`            | แต่ละ metric ใน `quality-baseline.json` ต้องไม่ถดถอย (คำเตือน ESLint ≤ baseline; coverage ≥ baseline)                                                                       | ใช่                     |
| `check:duplication`          | การทำซ้ำของโค้ด (jscpd@4) ต้องไม่เกิน baseline ใน `quality-baseline.json`                                                                                                   | ใช่                     |
| `check:complexity`           | cyclomatic complexity ระดับไฟล์ต้องไม่เกินเพดาน (กฎหลัก `complexity` + `max-lines-per-function` ของ ESLint)                                                                 | ใช่                     |
| `check:cognitive-complexity` | ratchet ของ cognitive complexity (`eslint-plugin-sonarjs`) — รัน ESLint แยกต่างหาก; CI รันทั้งสองแบบรวมเป็นขั้นตอนเดียว `check:complexity-ratchets`                         | ใช่                     |
| `check:dead-code`            | ratchet ของ export / ไฟล์ที่ไม่ได้ใช้ (knip) ต้องไม่ถดถอยเมื่อเทียบกับ baseline                                                                                             | ใช่                     |
| `check:compression-budget`   | งบประมาณ benchmark การบีบอัด — ค่าขั้นต่ำของการประหยัด token ต่อ engine ต้องไม่ถดถอย                                                                                        | ใช่                     |
| `check:type-coverage`        | ratchet ของเปอร์เซ็นต์ที่ระบุ type (`type-coverage`) ต้องไม่ถดถอย; โดยส่วนใหญ่ครอบคลุม `typecheck:noimplicit:core`                                                          | ใช่                     |
| `check:codeql-ratchet`       | จำนวน alert ของ CodeQL ที่ยังเปิดอยู่ต้องไม่ถดถอย (อ่านผ่าน `gh api`; ข้ามอย่างเหมาะสมเมื่อไม่มี token) — รอบการรีเฟรชและการเรียกใช้ด้วยตนเอง: ดู "CodeQL ratchet" ด้านล่าง | ใช่                     |

### งาน: `quality-extended`

งานทั้งหมดมีไว้เพื่อให้คำแนะนำ (`continue-on-error: true`) ratchet ที่ใช้ npm จะรันจริง
ส่วน scanner ภายนอกจะติดตั้งผ่าน `gh release download` และข้ามตัวเอง (exit 0)
เมื่อยังไม่มี binary

| สคริปต์                  | ตรวจสอบความถูกต้อง                                                                                                                                                                                                                     | การบล็อก                                 |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `check:circular-deps`    | ไม่มี dependency แบบวนเป็นวงกลม (dpdm)                                                                                                                                                                                                 | **คำแนะนำ**                              |
| `check:bundle-size`      | ขนาด bundle ต้องไม่เกินเพดาน                                                                                                                                                                                                           | **คำแนะนำ**                              |
| `check:secrets`          | การสแกน secret (gitleaks) — ข้ามหากไม่มี binary                                                                                                                                                                                        | **คำแนะนำ**                              |
| `check:vuln-ratchet`     | ช่องโหว่ของ dependency (osv-scanner) ต้องไม่ถดถอย — ข้ามหากไม่มี binary                                                                                                                                                                | **คำแนะนำ**                              |
| `check:workflows`        | การ lint workflow (actionlint + zizmor); scanner ที่ไม่มี/ใช้งานไม่ได้ รายงานที่ไม่ถูกต้อง หรือ ratchet baseline ที่หายไป จะล้มเหลวด้วยสถานะ INCOMPLETE ส่วนสิ่งที่ตรวจพบซึ่งถูกต้องจะเป็นไปตามนโยบาย strict/advisory/ratchet ที่เลือก | ต้องดำเนินการ; zizmor ratchet บล็อกใน CI |
| `check:openapi-breaking` | การเปลี่ยนแปลงที่ทำให้สัญญา public API (`openapi.yaml`) ใช้งานร่วมกันไม่ได้เมื่อเทียบกับ base branch (oasdiff) — สร้าง `openapiBreaking=N`; ข้ามหากไม่มี oasdiff หรือไม่สามารถ resolve base spec ได้                                   | **คำแนะนำ**                              |

### งาน: `docs-sync-strict`

รันในทุก PR ที่ส่งไปยัง `main` และบล็อกการ merge เมื่อล้มเหลว

| สคริปต์                        | สิ่งที่ตรวจสอบความถูกต้อง                                                                                                                                         | การบล็อก                    |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `check:docs-all`               | เมตาเกตที่เรียกใช้เกตย่อยทั้ง 6 รายการด้านล่างตามลำดับ                                                                                                            | ใช่                         |
| ↳ `check:docs-sync`            | ความสอดคล้องของเวอร์ชันระหว่าง CHANGELOG / OpenAPI / llm.txt                                                                                                      | ใช่                         |
| ↳ `check:docs-counts`          | จำนวนที่ระบุในเนื้อหา (จำนวนผู้ให้บริการ จำนวนการย้ายข้อมูล ฯลฯ) อยู่ภายในช่วง ratchet ของจำนวนจริง                                                               | ใช่                         |
| ↳ `check:env-doc-sync`         | ตัวแปรสภาพแวดล้อมทุกตัวใน `.env.example` มีการบันทึกไว้ในตารางเอกสาร และในทางกลับกัน                                                                              | ใช่                         |
| ↳ `check:deprecated-versions`  | ไม่มีสตริงเวอร์ชันที่เลิกใช้แล้วในเอกสาร                                                                                                                          | ใช่                         |
| ↳ `check:doc-links`            | ลิงก์ markdown ภายในเอกสารชี้ไปยังไฟล์ที่มีอยู่จริง (รูปแบบ `[text]`/`(path)`)                                                                                    | ใช่                         |
| ↳ `check:fabricated-docs`      | เส้นทาง ตัวแปรสภาพแวดล้อม คำสั่ง CLI ชื่อ hook และพาธไฟล์ที่อ้างถึงในเอกสารมีอยู่จริงในฐานโค้ด เป็นเกตแบบบังคับผ่าน `--strict`; หากไม่มีแฟล็กจะล้มเหลวแบบไม่บล็อก | ใช่ (ผ่าน `--strict` ใน CI) |
| `check:cli-i18n`               | สตริงคำสั่ง CLI มีอยู่ในไฟล์โลเคล i18n ทั้งหมด                                                                                                                    | ใช่                         |
| `check:openapi-coverage`       | ข้อกำหนด OpenAPI ครอบคลุมเส้นทางจริงอย่างน้อยตามค่าขั้นต่ำที่กำหนดแบบ ratchet                                                                                     | ใช่                         |
| `check:openapi-security-tiers` | คำอธิบายประกอบระดับความปลอดภัยใน `openapi.yaml` สอดคล้องกับการจัดประเภทใน `routeGuard.ts`                                                                         | **คำแนะนำ**                 |
| `check:openapi-routes`         | ทุกพาธใน `openapi.yaml` เชื่อมโยงไปยัง `route.ts` ที่มีอยู่จริง (ป้องกันการสร้างข้อมูลเท็จ)                                                                       | ใช่                         |
| `check:docs-symbols`           | ทุกการอ้างอิง `/api/...` ใน `docs/**/*.md` เชื่อมโยงไปยัง `route.ts` ที่มีอยู่จริง (ป้องกันการสร้างข้อมูลเท็จ)                                                    | ใช่                         |
| `i18n translation drift`       | คีย์ที่ยังไม่ได้แปลในไฟล์โลเคล i18n — แสดงคำเตือนเท่านั้น                                                                                                         | **คำแนะนำ**                 |

### งาน: `i18n-ui-coverage`

| สคริปต์                           | สิ่งที่ตรวจสอบความถูกต้อง                                                                                                                                                                | การบล็อก    |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `check-ui-keys-coverage` (inline) | ความครอบคลุมของคีย์ i18n สำหรับ UI ≥ 65%                                                                                                                                                 | ใช่         |
| `check-ui-value-drift` (inline)   | เมื่อเขียน **ค่า** ภาษาอังกฤษใหม่ จะต้องไม่มีคำแปลเก่าที่ยังคงหลงเหลืออยู่                                                                                                               | ใช่         |
| `check-new-key-coverage` (inline) | คีย์ภาษาอังกฤษ **ใหม่** ต้องได้รับการแปลในทุกโลเคล — เครื่องหมาย `__MISSING__:` จะถูกปฏิเสธ                                                                                              | ใช่         |
| `check-translation-ratio`         | อัตราส่วนคำแปลจริงต่อโลเคล (รายการที่เหมือนกับภาษาอังกฤษ / เป็นตัวยึดตำแหน่ง / ขาดหายไปซึ่งอยู่นอกรายการอนุญาต) ต้องไม่เกิน `config/quality/i18n-translation-baseline.json` + ค่าผ่อนผัน | **คำแนะนำ** |

ต้องใช้ `fetch-depth: 0` — เกต value-drift จะเปรียบเทียบความแตกต่างของ `en.json` กับฐานการผสาน

#### `check-ui-value-drift` — เกตตรวจจับคำแปลที่ล้าสมัย

ตรวจจับการถดถอยของ i18n รูปแบบหนึ่งที่เกตอื่นไม่สามารถตรวจพบได้ในเชิงโครงสร้าง กล่าวคือ เมื่อค่า
ภาษาอังกฤษถูกเขียนใหม่ แต่คำแปลที่อ้างอิงจากภาษาอังกฤษฉบับ_ก่อนหน้า_ยังคงอยู่ ทำให้
ผู้ใช้ที่ไม่ได้ใช้ภาษาอังกฤษยังคงอ่านข้อความที่ดูน่าเชื่อถือแต่ไม่ถูกต้องอีกต่อไป

ปัญหานี้เกิดขึ้นจริงในรุ่นที่เผยแพร่ `oauthModal.googleOAuthWarning` ถูกเขียนใหม่เมื่อมีการเพิ่มตัวช่วย
เข้าสู่ระบบ Antigravity (#5203); **39 จาก 43 โลเคล** ยังคงมีข้อความที่บอกผู้ดูแลให้ "คัดลอก
URL แบบเต็มแล้ววางไว้ด้านล่าง" — ซึ่งเป็นขั้นตอนที่ไม่สามารถดำเนินการจนเสร็จสิ้นสำหรับผู้ให้บริการรายนั้นได้ ปัญหานี้
ไม่มีใครสังเกตเห็นจนกระทั่ง #8463 เนื่องจาก:

- `sync-ui-keys` เติมคีย์ย้อนหลังเฉพาะคีย์ที่ **ไม่มีอยู่** เท่านั้น ไม่ใช่คีย์ที่ **ล้าสมัย**;
- `check-ui-keys-coverage` นับการ_มีอยู่_ของคีย์ ดังนั้นคำแปลที่ล้าสมัยจึงถูกนับว่าครอบคลุมแล้ว;
- `check-translation-drift` ติดตามสำเนาเอกสาร `docs/i18n/<locale>/**.md` —
  แต่ไม่เคยอ่าน `src/i18n/messages/*.json` บล็อกในงาน `docs-sync-strict` ตั้งแต่การซิงค์ใหม่
  2026-09: แก้ไขเอกสารหลัก → `npm run i18n:run -- --files=<doc>` (ระดับส่วน ประหยัดทรัพยากร)

**รับรู้ความแตกต่าง ไม่ได้อิง baseline** โดยจะเปรียบเทียบ `en.json` ณ merge base กับ
working tree สำหรับทุก key ที่ค่า English เปลี่ยนแปลง locale ใดก็ตามที่ยังคงมี
คำแปลเดิมที่ไม่ได้แก้ไขจะถือว่าล้าสมัย วิธีนี้ตั้งใจ **ตรึงหนี้เดิมที่มีอยู่** — diff
ไม่สามารถระบุได้ว่าคำแปลที่มีมานานแปลมาจาก English เวอร์ชันเก่าใด ดังนั้น gate จึงตรวจสอบ
เฉพาะสิ่งที่การเปลี่ยนแปลงปัจจุบันแตะต้องเท่านั้น ทางเลือกอื่น (baseline แบบ hash ต่อ key) จะทำให้ต้องมี
ไฟล์ที่สร้างขึ้นขนาดประมาณ 600 KB ซึ่งใหญ่กว่า baseline ที่มีอยู่ขนาดใหญ่ที่สุด 3 เท่า และเปลี่ยนแปลงทุกครั้งที่มี i18n PR

มีสองวิธีที่จะทำให้ผ่าน:

1. อัปเดตคำแปลที่ได้รับผลกระทบ หรือ
2. ตั้งค่าเป็น `__MISSING__:<new english>` — จากนั้น runtime จะให้บริการ English ที่แก้ไขแล้ว
   (`src/i18n/request.ts::deepMergeFallback`, #7258) และนำ key เข้าคิวเพื่อรอการแปล

หาก **ความหมาย** ของ string เปลี่ยนไป ควรเลือก **เปลี่ยนชื่อ key**: key ใหม่ไม่สามารถรับช่วง
คำแปลที่ล้าสมัยได้ นี่คือรูปแบบที่ #8463 ใช้

```bash
npm run i18n:check-value-drift          # เข้มงวด (สิ่งที่ CI เรียกใช้)
npm run i18n:check-value-drift:warn     # รายงานเท่านั้น
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

ออกด้วยสถานะ 0 พร้อม `SKIP reason=base-unresolved` เมื่อไม่สามารถอ่าน catalog ฐานได้ (shallow
clone ที่ไม่มี base ref) ซึ่งสอดคล้องกับ `check-openapi-breaking`

### งาน: `i18n`

เมทริกซ์การตรวจสอบ i18n แบบเต็ม (หนึ่งงานต่อ locale) งานทั้งหมดเป็นเพียงคำแนะนำ

| สคริปต์                         | ตรวจสอบ                           | การบล็อก                                              |
| ------------------------------- | --------------------------------- | ----------------------------------------------------- |
| `validate_translation.py quick` | ความครบถ้วนของคำแปลในแต่ละ locale | **คำแนะนำ** (`continue-on-error: true` สำหรับทั้งงาน) |

### งาน: `pr-test-policy`

ทำงานเฉพาะบน pull request

| สคริปต์                | ตรวจสอบ                                                                                                                                                 | การบล็อก |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `check:pr-test-policy` | PR ที่เปลี่ยน production code ใน `src/`, `open-sse/` หรือ `bin/` ต้องเพิ่มหรืออัปเดต test (กฎตายตัว #8)                                                 | ใช่      |
| `check:test-masking`   | ไฟล์ test ที่เปลี่ยนแปลงต้องไม่ลดจำนวน assert สุทธิหรือเพิ่ม tautology แบบ `assert.ok(true)`                                                            | ใช่      |
| `check:pr-evidence`    | เนื้อหา PR อ้างอิงหลักฐานจาก test/VPS สำหรับการเปลี่ยนแปลงนั้น (ทำให้กฎตายตัว #18 เป็นกลไกอัตโนมัติด้วยการ grep ข้อความใน PR — เปราะบาง โปรดดู Backlog) | ใช่      |

### งาน: `test-vitest`

ทำงานหลัง `build` และบล็อกการ merge เมื่อล้มเหลว

| ชุดทดสอบ         | ตรวจสอบ                                                  | การบล็อก                                                                                                     |
| ---------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `test:vitest`    | MCP server (110 tools), autoCombo, cache — ตัวรัน vitest | ใช่                                                                                                          |
| `test:vitest:ui` | test สำหรับ UI component — ตัวรัน vitest                 | **บล็อก** — failure ที่มีอยู่ก่อนถูกยกเว้นไว้อย่างชัดเจนใน `vitest.config.ts`; failure ใหม่จะทำให้งานล้มเหลว |

### Workflow รายคืน (ตามกำหนดเวลา, เป็นคำแนะนำ)

รายการเหล่านี้ทำงานตามกำหนดเวลา cron (และ `workflow_dispatch`) โดยไม่ทำงานบน PR และทั้งหมดเป็นเพียงคำแนะนำ

| Workflow               | ตรวจสอบ                                                                                                                                                      | การบล็อก    |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| `nightly-property`     | property test ด้วย fast-check โดยใช้ seed แบบสุ่มและจำนวนรอบการทำงานสูง                                                                                      | **คำแนะนำ** |
| `nightly-resilience`   | gate ตรวจการเติบโตของ heap, การฉีด fault แบบ chaos, การทดสอบ load/soak ด้วย k6                                                                               | **คำแนะนำ** |
| `nightly-llm-security` | ตัวป้องกัน injection ของ promptfoo (โหมด block) + probe ของ garak (ข้ามเมื่อไม่มี provider secret)                                                           | **คำแนะนำ** |
| `nightly-schemathesis` | การ fuzz สัญญา OpenAPI (schemathesis) กับ OmniRoute ที่ทำงานอยู่ โดยใช้ `docs/openapi.yaml` — เปิดเผยการละเมิด spec / 500 ที่ไม่ได้รับการจัดการ (Fase 8 B.4) | **คำแนะนำ** |
| `nightly-mutation`     | คะแนน mutation testing ของ Stryker บน lane unit แบบเร็ว — mutant ที่รอดเผยให้เห็น assert ที่อ่อนแอ                                                           | **คำแนะนำ** |
| `nightly-compat`       | เมทริกซ์ความเข้ากันได้ของ Node engine ครอบคลุมช่วง `engines.node` ที่รองรับ                                                                                  | **คำแนะนำ** |

---

## ช่วงเร่งความเร็ว (2026-08-30 → v4.0 LTS): ผ่อนปรนค่าฐานทุกค่าลง 20%

มติของผู้รับผิดชอบ (2026-08-30): จนกว่าจะมีการปรับเป็นโมดูลใน v4.0 ความเร็วในการส่งมอบมีความสำคัญมากกว่า
การควบคุมหนี้ทางเทคนิค ค่าฐาน ratchet แบบ **ตัวเลข** ทุกค่าถูกผ่อนปรนลง 20% ในการดำเนินการครั้งเดียว
ที่ตรวจสอบย้อนหลังได้ และมีการประกาศช่วงนี้ไว้ใน `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| สิ่งที่เปลี่ยนแปลง                                                                                                                                                                                          | ตำแหน่ง                                                                                                |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — จำนวนที่ยิ่งต่ำยิ่งดี ×1.2, เปอร์เซ็นต์ที่ยิ่งสูงยิ่งดี ÷1.2 (คงค่าขั้นต่ำของ coverage ไว้ที่ 60, `eslintErrors` ยังคงเป็น 0, `eslintWarnings` 0 → 20% ของจำนวน suppression ที่ตรึงไว้) | `quality-baseline.json` (หมายเหตุ `_relax_velocity_2026_08_30` แสดงค่าก่อน → หลังทุกรายการ)            |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                            | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, ขีดจำกัดจำนวนบรรทัด `frozen[*]` / `testFrozen[*]` ทุกค่า ×1.2                                                                                                                             | `file-size-baseline.json`                                                                              |
| จำนวนต่อไฟล์ / ต่อโค้ด TS ×1.2                                                                                                                                                                              | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                         | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` เปลี่ยนเป็นเพียงคำแนะนำเมื่อ `_policy.requireTighten === false`                                                                                                                         | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| หยุด `bank-ratchet-shrinks` รายคืนชั่วคราว (เพราะจะบันทึกการลดลงที่วัดได้และทำให้พื้นที่เผื่อหมดไป)                                                                                                         | `.github/workflows/nightly-release-green.yml`                                                          |

รายการที่อนุญาต (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **ไม่ใช่** งบประมาณและไม่ได้รับการแก้ไข เกตนโยบายผ่าน/ไม่ผ่าน (ข้อมูลลับ, กฎ SQL,
สัญญา docs/env, ความสอดคล้องของ i18n, unit tests) ยังคงเดิม — เทสต์ที่เป็นสีแดงยังคงเป็นเทสต์ที่ไม่ผ่าน

**เครื่องมือ**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — การผ่อนปรนแบบ
  ครั้งเดียว (`scripts/quality/relax-baselines.mjs`); จะปฏิเสธการรันซ้ำด้วยหมายเหตุเดียวกัน
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  วัดเกตแบบตัวเลขทุกเกตด้วยวิธีเดียวกับ CI และแสดงพื้นที่เผื่อที่เหลืออยู่ของแต่ละเกต
  (`scripts/quality/baseline-headroom.mjs`) งาน `baseline-headroom` รายคืนจะโพสต์
  ตารางไปยัง issue ที่อัปเดตต่อเนื่อง **📈 พื้นที่เผื่อของค่าฐาน (ช่วงเร่งความเร็ว)** และเพิ่มป้ายกำกับ
  `headroom-alert` เมื่อเกตใดก็ตามอยู่ภายในระยะ 10% จากขีดจำกัดหรือเกินขีดจำกัดแล้ว issue นั้น
  เป็นสัญญาณเตือนล่วงหน้า: งบประมาณที่เต็มภายในไม่กี่วันหมายความว่าพื้นที่ผ่อนปรนกำลังถูกใช้ไปโดย
  PR เพียงไม่กี่รายการ ไม่ใช่โดยทั้งทีม — ให้ตรวจสอบหมายเหตุ `_rebaseline_*` ของเกตที่เป็นปัญหา

**โหมดโค้ดใหม่ (Clean-as-You-Code) — ตั้งแต่ 2026-08-30 เฉพาะเส้นทางด่วนของ PR**

ในเหตุการณ์ `pull_request` ไฟล์ `quality.yml` จะส่ง `--base-ref <PR base SHA>` ไปยัง `check:file-size`,
`check:complexity-ratchets` และ `check:dead-code` ในโหมดนี้ เกตจะเปรียบเทียบ HEAD กับ
merge-base โดย **จำกัดเฉพาะไฟล์ที่ PR แก้ไข** (`scripts/check/newCodeMode.mjs`:
merge-base จะถูกสร้างไว้ใน `git worktree` ชั่วคราว จากนั้น ESLint/knip จะทำงานที่นั่นและบน HEAD แล้วจึง
หาความแตกต่างของจำนวนต่อไฟล์):

- **มีผลบล็อก** — PR เพิ่มการละเมิด cyclomatic/cognitive complexity หรือ dead exports ในไฟล์ที่แก้ไข
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` ใน log);
- **เป็นเพียงคำแนะนำ** — ยอดรวมทั่วระบบเทียบกับค่าฐานที่ตรึงไว้ drift ที่สืบทอดมาจะไม่ทำให้
  PR ที่ไม่เกี่ยวข้องล้มเหลว; drift จะถูกตรึงใหม่ระหว่างการกระทบยอดรุ่น และได้รับการเฝ้าระวังโดยงาน headroom

การรัน `workflow_dispatch`, การตรวจสอบ release-green และงาน headroom รายคืนไม่มีฐาน PR
และยังคงใช้การเปรียบเทียบแบบสัมบูรณ์ (ทั่วระบบ) Coverage, duplication และ type-coverage ยังคงเป็นแบบทั่วระบบ
ในขณะนี้ (เครื่องมือของส่วนเหล่านี้ไม่สามารถสร้าง diff ต่อไฟล์ได้โดยใช้ทรัพยากรต่ำ) — และเป็นตัวเลือกสำหรับนำแนวทางเดียวกันนี้มาใช้

**การปิดช่วงนี้เมื่อถึง v4.0 (LTS = เข้มงวดกว่าเดิม ไม่ใช่ "กลับสู่ภาวะปกติ")**

1. ที่ปลายสุดของ `release/v4.0.0` แบบบริสุทธิ์: เรียกใช้ `npm run quality:headroom --json` เพื่อบันทึกไว้ จากนั้นเรียกใช้
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update` และ
   `--update` ของเกตตรวจสอบชนิดแต่ละรายการ — ค่าพื้นฐานทุกค่าจะลดลงมาเป็นค่าที่วัดได้
2. ลบ `_policy` ออกจาก `quality-baseline.json` (เปิดใช้งาน `--require-tighten` และการสะสมส่วนต่าง
   รายคืนอีกครั้ง) และคืนค่า `THRESHOLD = 36` (หรือสูงกว่า) ใน `check-openapi-coverage.mjs`
3. ปรับเกณฑ์ให้เข้มงวดกว่าค่าที่วัดได้ในส่วนที่การแยกเป็นโมดูลให้ผลดี: ปรับ `cap` ของขนาดไฟล์กลับเป็น 1000
   (หรือ 800), เพิ่มค่าขั้นต่ำของความครอบคลุม +5 และกำหนดจำนวน export ที่ไม่ได้ใช้งานเป็น 0 สำหรับแพ็กเกจที่แยกเป็นโมดูล

## ค่าอ้างอิง Ratchet (`quality-baseline.json`)

กลไก ratchet (`scripts/quality/check-quality-ratchet.mjs`) จะอ่าน `quality-baseline.json`
และเปรียบเทียบกับ `quality-metrics.json` ที่เพิ่งรวบรวมมาใหม่ เมตริกใดก็ตามที่ถดถอย
เกินค่า epsilon จะทำให้บิลด์ล้มเหลว

เมตริกที่ติดตามอยู่ในปัจจุบัน:

| เมตริก                | ทิศทาง | ความหมาย                              |
| --------------------- | ------ | ------------------------------------- |
| `eslintWarnings`      | `down` | จำนวนคำเตือน ESLint ต้องไม่เพิ่มขึ้น  |
| `coverage.statements` | `up`   | ความครอบคลุมของ statement ต้องไม่ลดลง |
| `coverage.lines`      | `up`   | ความครอบคลุมของบรรทัดต้องไม่ลดลง      |
| `coverage.functions`  | `up`   | ความครอบคลุมของฟังก์ชันต้องไม่ลดลง    |
| `coverage.branches`   | `up`   | ความครอบคลุมของ branch ต้องไม่ลดลง    |

หากต้องการอัปเดตค่าอ้างอิงหลังจากมีการปรับปรุงจริง:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

แฟล็ก `--update` จะเขียนค่าที่วัดได้ในปัจจุบันลงใน `quality-baseline.json`
ให้ commit ไฟล์นี้พร้อมกับการเปลี่ยนแปลงที่ปรับปรุงเมตริก PR ที่ปรับปรุง
เมตริกโดยไม่อัปเดตค่าอ้างอิงจะถูกตรวจพบโดย `--require-tighten` (ระยะ 6A.5,
รอการนำไปใช้งาน)

### Ratchet ของ CodeQL: รอบการรีเฟรชและการทริกเกอร์ด้วยตนเอง

`check:codeql-ratchet` อ่าน **สถานะของ repo ซึ่งรีเฟรชตามกำหนดเวลา — ไม่ใช่ต่อ PR**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` รายงาน
`state: configured`, `schedule: weekly`: นี่คือการสแกนแบบ default setup ของ GitHub ไม่ใช่การวิเคราะห์
ทุกครั้งที่ push ผลที่ตามมาคือ หลังจาก PR ที่แก้ไขการแจ้งเตือนถูก merge แล้ว ratchet จะยังคงอ่าน
จำนวนเดิมที่สูงกว่าอยู่จนกว่าการสแกนตามกำหนดเวลาครั้งถัดไปจะทำงาน — จึงรายงานการถดถอย
ใน PR ที่เปิดอยู่ทุก PR รวมถึง PR ติดตามผลของ PR ที่แก้ไขนั้นเอง จนกว่าการสแกนจะตามทัน

**การรีเฟรชด้วยตนเอง**: `gh workflow run codeql.yml --ref release/vX.Y.Z` จะเรียกใช้
การวิเคราะห์อีกครั้งและเผยแพร่การแจ้งเตือนใหม่ภายในไม่กี่นาที อ่าน `.github/workflows/codeql.yml`
ก่อน — ส่วนหัวของไฟล์อธิบายว่าไฟล์นี้ใช้เฉพาะ `workflow_dispatch` **เนื่องจากขัดแย้งกับ
"default setup" ของ GitHub** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`) การนำทริกเกอร์ `push`/`pull_request`/
`schedule` กลับมาต้องให้ **เจ้าของดำเนินการก่อน**: Settings → Code security →
CodeQL: Default → Advanced อย่าเพิ่มทริกเกอร์ `schedule:` หากยังไม่ได้สลับการตั้งค่านี้ — เพราะจะ
ทำให้เกิดเฉพาะรันที่ล้มเหลวเท่านั้น

**ปรับค่าอ้างอิงให้เข้มงวดขึ้นหลังจากจำนวนลดลง** — `node scripts/check/check-codeql-ratchet.mjs
--update` จะเขียนจำนวนใหม่ที่วัดได้ลงใน `quality-baseline.json` →
`metrics.codeqlAlerts.value` เพื่อไม่ให้ ratchet ยอมให้เกิดการถดถอยกลับขึ้นไปถึง
เพดานเดิมโดยไม่มีการแจ้งเตือน ตัวอย่างการทำงาน (2026-09-02/03): PR #12502 แก้ไขการแจ้งเตือนจริง 7 รายการ
(วัดจำนวนที่เปิดอยู่ได้ 13 → 6 รายการ); PR #12530 ปรับค่าอ้างอิงที่ตรึงไว้ให้เข้มงวดขึ้นจาก 11 → 6 เพื่อให้ตรงกัน จากนั้น
การแจ้งเตือนที่เหลืออีก 6 รายการถูกปิดพร้อมเหตุผลประกอบรายรายการ จนเหลือรายการที่เปิดอยู่ 0 รายการ

**การปิดการแจ้งเตือนเป็นการตัดสินใจของผู้ดำเนินการ (กฎเคร่งครัดข้อที่ #14)** — ห้ามปิดการแจ้งเตือน CodeQL
โดยไม่บันทึกเหตุผลทางเทคนิคไว้ในความคิดเห็นประกอบการปิด: `won't fix` สำหรับ
ข้อกำหนดของโปรโตคอลต้นทาง, `used in tests` สำหรับ fixture ที่ใช้ทดสอบ, `false positive`
สำหรับ sanitizer ที่ CodeQL ตรวจไม่พบ (แบบอย่าง: `docs/security/ERROR_SANITIZATION.md`)

---

## นโยบายการลองทดสอบซ้ำ (WS5.4, v3.8.49)

การลองซ้ำกำหนดแยกตาม runner เท่านั้น ไม่ใช่การลองซ้ำแบบครอบคลุมทั้งหมด — เพราะการลองซ้ำแบบครอบคลุมจะเปลี่ยน regression ที่เกิดขึ้นจริง
ให้กลายเป็น flake ที่มองไม่เห็น:

| Runner           | นโยบาย                                                                                                                                                 | เหตุผล                                                                                                                               |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| Playwright (e2e) | `retries: 1` เฉพาะใน CI พร้อม `trace: on-first-retry`                                                                                                  | จังหวะเวลาของเบราว์เซอร์/เครือข่ายมีความไม่แน่นอนจริง การลองซ้ำหนึ่งครั้งพร้อม trace จะเปลี่ยน flake ให้เป็น artifact ที่วินิจฉัยได้ |
| Vitest           | ไม่มีการลองซ้ำแบบ global การทดสอบที่พิสูจน์แล้วว่า flaky จะได้รับการกำหนดให้ลองซ้ำอย่างชัดเจนเป็นราย test (มองเห็นได้ใน diff และได้รับการตรวจสอบใน PR) | ทำให้รายการ quarantine อยู่ใน repo และไม่คลุมเครือ                                                                                   |
| node:test (unit) | ไม่มีการลองซ้ำไม่ว่าในกรณีใด                                                                                                                           | unit test ที่ flaky คือบั๊กในการทดสอบ — ให้แก้ไข อย่าสุ่มรันใหม่                                                                     |

SLO เป้าหมายเมื่อมี telemetry ของ flake แล้ว (WS5.2/5.3): อัตรา flake ต่อการทดสอบ <1%
(เกณฑ์ "แก้ทันที") และอัตราผ่านต่อ pipeline ≥95% ค่ามาตรฐานอ้างอิงของอุตสาหกรรม —
ให้ปรับเทียบใหม่จากค่าที่เราวัดได้เอง

## การเลื่อนถอยของ Ratchet ระดับรีลีส (WS5.5, v3.8.49)

เมื่อ ratchet (ขนาดไฟล์, ความซับซ้อน, คำเตือน eslint) ถดถอยบนปลายรีลีสที่เป็น PURE
กล่าวคือ เกิดการถดถอยจากผลรวมของการ merge และไม่มี PR ใดเพียงรายการเดียวที่ทำให้เกิด
การถดถอยซ้ำได้บน branch ของตนเอง การแก้ไขนั้นเป็นหน้าที่ของ **release captain เพียงครั้งเดียวบน
release branch**: ให้เลือกการแยกโค้ด/refactor เป็นอันดับแรก และ rebaseline เฉพาะเมื่อมีรายการ
เหตุผลที่บันทึกไว้เท่านั้น ห้ามผลักภาระการเลื่อนถอยจากผลรวมไปยัง PR ของ contributor และห้าม
rebaseline แยกตาม PR (เพราะจะซ่อน regression ที่เกิดขึ้นจริง) ให้แยกแยะสาเหตุก่อน: ทำให้สถานะ
แดงเกิดซ้ำบนปลายรีลีสที่เป็น pure ใน probe worktree ก่อนสันนิษฐานว่า PR ของคุณเป็นสาเหตุ

## การเก็บสะสมการลดค่า Ratchet — ทิศทางขาลง (#8584)

ratchet เป็นระบบอัตโนมัติเพียงครึ่งเดียว และเป็นครึ่งที่ผิดเสียด้วย การ **เพิ่ม** cap คือการแก้ไข
JSON ด้วยตนเองซึ่งใช้เวลาสิบวินาที และเป็นวิธีที่เร็วที่สุดในการปลดล็อก PR ที่เป็นสีแดง
การ **ลด** cap ต้องมีผู้รัน `--update` และ commit ผลลัพธ์ — และก่อนที่จะมี job
`bank-ratchet-shrinks` ก็ไม่มี workflow ใดรันคำสั่งนี้ ผลที่วัดได้
(2026-07-25): มีไฟล์ frozen 18 ไฟล์ที่มีขนาดไม่เกิน cap 800 บรรทัดสำหรับไฟล์ใหม่อยู่แล้ว โดยกรณีที่แย่ที่สุด
อยู่ที่ 132 เท่า (`src/shared/validation/schemas.ts` มี 19 บรรทัดแต่ถือ cap ไว้ที่ 2,523);
เพดานความซับซ้อนขยับจาก `1794 → 2169` ตลอดบันทึก rebaseline ประมาณ 37 รายการ โดยลดลงเพียง
ครั้งเดียว (−1); และมีการเขียนว่า "ปรับให้เข้มงวดผ่าน `--update` ในรอบถัดไป" 31 ครั้ง แต่ทำจริง
เพียงครั้งเดียว cap ที่ยังคงอยู่หลังจากโค้ดที่ทำให้ต้องมี cap นั้นหมดไปแล้ว จะเปลี่ยนทุกการแยกส่วนโค้ด
ที่เสร็จสมบูรณ์ให้กลายเป็นโควตาการเติบโตสำหรับผู้ที่มาแก้ไขไฟล์นั้นเป็นรายถัดไปโดยไม่ส่งสัญญาณเตือน

`nightly-release-green.yml` → job **`bank-ratchet-shrinks`** ปิดวงจรดังกล่าว:

|          |                                                                                                             |
| -------- | ----------------------------------------------------------------------------------------------------------- |
| รันเมื่อ | `schedule` (3×/วัน) + `workflow_dispatch` — ตั้งใจ **ไม่** ใช้ `push`                                       |
| วัดผล    | `release/vX.Y.Z` ที่สูงที่สุด โดยใช้การ resolve และ injection guard แบบเดียวกับ `release-green`             |
| เขียน    | `check:file-size --update` และ `check:complexity-ratchets --update` (ทั้งสองลดค่าได้อย่างเดียวตามโครงสร้าง) |
| ตรวจสอบ  | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                    |
| ส่งมอบ   | PR ที่เป็นปัจจุบันเสมอเพียงรายการเดียวไปยัง release branch — อัปเดตแบบบังคับและไม่สร้างสแปม                 |

การเก็บสะสมจะทำเป็นชุดแทนที่จะทำทุกครั้งที่ push เพราะไม่มีข้อกำหนดด้าน latency (เก็บสะสมการลดค่า
ภายใน 8 ชั่วโมงก็เพียงพอ) ขณะที่การรันทุกครั้งที่ merge จะสร้าง PR branch ใหม่ซ้ำหลายครั้ง
ระหว่างแคมเปญ merge และเสียค่าใช้จ่ายในการรัน ESLint แบบเต็มทุกครั้ง การตรวจจับยังคงทำเมื่อ
push (`release-green`); มีเพียงการเก็บสะสมเท่านั้นที่ทำเป็นชุด

### ตัวตรวจสอบความปลอดภัย

job นี้เขียนลง baseline โดยไม่มีผู้ดูแล ดังนั้น `verify-ratchet-bank.mjs` จึงเป็นสิ่งที่ทำให้
การดำเนินการดังกล่าวยอมรับได้ มันจะ diff tree หลัง `--update` กับ `HEAD` และ **ยุติ job
ก่อนที่จะมี commit ใดเกิดขึ้น** — โดยไม่เปิด PR — เว้นแต่ทุกการเปลี่ยนแปลงจะเป็นหนึ่งในรายการต่อไปนี้:

- รายการตัวเลข `frozen` / `testFrozen` ที่ถูก **ลดค่า** หรือ **ลบออก**
- `complexity-baseline.json` → `count` ถูก **ลดค่า**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` ถูก **ลดค่า**

สิ่งอื่นทั้งหมดจะถือว่าล้มเหลว: การเพิ่มตัวเลข, การเพิ่มรายการ, การเปลี่ยน `cap`/`testCap` หรือ
การลบ/เขียนบันทึก `_rebaseline_*` ใหม่ (บันทึกเหล่านี้คือ audit trail ที่อธิบายว่าเหตุใดเพดานแต่ละค่า
จึงมีอยู่ และถูกจัดเก็บภายใน object `frozen` เดียวกับรายการไฟล์)
บอตที่สามารถเพิ่ม cap ได้จะแย่กว่าสถานะปัจจุบันอย่างชัดเจน ตัวป้องกัน regression:
`tests/unit/verify-ratchet-bank.test.ts`

job นี้จะไม่ push ไปยัง `release/*` — มนุษย์เป็นผู้ merge PR ดังนั้นผลการวัดที่ผิดพลาด
จึงไม่สามารถถูกรวมเข้าไปโดยไม่ได้รับการตรวจสอบได้

## นโยบาย Allowlist

ทุกเกตที่ไม่สามารถล้มเหลวจากการละเมิดที่มีอยู่ก่อนแล้วจะใช้ allowlist แบบตรึงไว้
(เช่น `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`) โดยมีนโยบายดังนี้:

**แก้ไขสาเหตุที่แท้จริง ใช้ allowlist เฉพาะเมื่อการละเมิดนั้นมีอยู่ก่อนแล้วและ
ไม่สามารถแก้ไขได้ภายใน PR เดียวกัน**

เมื่อเพิ่มรายการลงใน allowlist:

1. ใส่ความคิดเห็นที่อธิบายเหตุผล
2. อ้างอิง issue ที่ใช้ติดตาม (เช่น `// #3498 — ฟีเจอร์ระยะที่ 2 ซึ่งยังไม่ได้พัฒนา`)
3. ลบรายการดังกล่าวใน PR เดียวกับที่แก้ไขการละเมิด — รายการที่ค้างอยู่และไม่ได้
   ระงับการละเมิดที่ยังเกิดขึ้นจริงอีกต่อไปถือเป็นข้อบกพร่องเช่นกัน (การบังคับใช้เพื่อตรวจจับ
   รายการค้างใน 6A.3 จะทำให้เกตล้มเหลวเมื่อพบรายการ allowlist ที่ไม่มีการละเมิดรองรับ หลังจากนำไปใช้แล้ว)

**ห้าม** เพิ่มรายการใน allowlist เพื่อให้การทดสอบผ่านเร็วขึ้น เกตที่เป็นสีเขียวพร้อมกับ
allowlist ที่เพิ่มขึ้นเรื่อย ๆ เป็นเพียงภาพลวงตาของคุณภาพ

### เมื่อเกตล้มเหลวใน PR ของคุณ

1. **อ่านผลลัพธ์ของเกตอย่างละเอียด** — ผลลัพธ์จะระบุอย่างชัดเจนว่าไฟล์หรือสัญลักษณ์ใด
   ละเมิดกฎ
2. **แก้ไขการละเมิด** — เกตส่วนใหญ่เป็นการตรวจสอบระบบไฟล์แบบกำหนดผลได้แน่นอน ซึ่งจะผ่านทันที
   เมื่อโค้ดถูกต้อง
3. **หากการละเมิดมีอยู่ก่อนแล้ว** (กล่าวคือ คุณไม่ได้เป็นผู้ทำให้เกิด แต่ตอนนี้เกต
   ครอบคลุมถึงการละเมิดนั้นแล้ว): ให้เพิ่มรายการ allowlist พร้อมความคิดเห็นอธิบายเหตุผลและ issue สำหรับติดตาม
4. **หากเกตเป็นแบบ ratchet** (coverage, คำเตือน ESLint, การทำซ้ำ, ความซับซ้อน):
   การเปลี่ยนแปลงของคุณทำให้เมตริกแย่ลง ให้แก้ไขปัญหาที่เป็นต้นเหตุ หรือในกรณีที่พบได้น้อย ให้รัน
   `npm run quality:ratchet -- --update` หากเป็นการเปลี่ยนแปลงโดยตั้งใจและยอมรับ
   การเสื่อมลงของเมตริกได้ — แต่ต้องบันทึกเหตุผลไว้ในคำอธิบาย PR
5. **เกตเชิงแนะนำ** (`continue-on-error: true`) มีไว้ให้ข้อมูล — เกตเหล่านี้จะไม่ขัดขวาง
   การ merge แต่จะปรากฏในสรุป CI อย่างไรก็ตาม ควรแก้ไขปัญหาเหล่านี้ด้วย

---

## การเพิ่มเกตใหม่

1. สร้าง `scripts/check/check-<name>.mjs` (หรือ `.ts`) เกตเชิงนโยบายจะจบการทำงานด้วยรหัส 0/1
   ส่วนเกตแบบ ratchet จะส่งเมตริกไปยัง `quality-metrics.json` ผ่าน `collect-metrics.mjs`
2. เพิ่ม `"check:<name>": "node scripts/check/check-<name>.mjs"` ลงใน `package.json`
3. เชื่อมต่อเกตใน `.github/workflows/ci.yml` ภายใต้ job ที่เหมาะสม
   (นโยบาย → `lint` หรือ `docs-sync-strict`; ratchet → `quality-gate`)
4. หากเกตมี allowlist ให้ใช้ `reportStaleEntries()` จาก
   `scripts/check/lib/allowlist.mjs` เพื่อให้ตรวจจับรายการที่ค้างอยู่ได้โดยอัตโนมัติ
5. เขียนการทดสอบใน `tests/unit/build/` ซึ่งครอบคลุมตรรกะการตรวจจับของเกต
6. อัปเดตเอกสารนี้ (เพิ่มแถวในตาราง job ที่เกี่ยวข้อง)

---

## เครื่องมือสำหรับเอเจนต์: LSP-in-the-loop (เลือกใช้ได้)

นอกเหนือจากเกต CI แล้ว OmniRoute ยังมาพร้อมโครงร่าง `agent-lsp` แบบ **เลือกใช้ได้**
(`.mcp.json` ระดับโปรเจกต์, Fase 7 Task 15) ให้สร้าง `.mcp.json`
เพื่อเปิดให้เอเจนต์เขียนโค้ดเข้าถึงเซิร์ฟเวอร์ภาษา TypeScript เพื่อให้เอเจนต์สามารถตรวจหาสัญลักษณ์ /
การวินิจฉัย **ก่อน** เขียนโค้ด — เป็นกลไกตรวจสอบก่อนกล่าวอ้างว่า compile ได้ ซึ่งทำงานเสริมกับ
`typecheck:core` และลดข้อผิดพลาดประเภท "สัญลักษณ์ที่แต่งขึ้น" ได้ตั้งแต่ต้นทาง กลไกนี้ตั้งใจ
ไม่ให้โหลดโดยอัตโนมัติ (คุณเป็นผู้เลือกและตรวจสอบบริดจ์ MCP↔LSP) รายการที่เสียจะเพียงบันทึก
ข้อผิดพลาดในการเชื่อมต่อ และจะไม่ทำให้เซสชันหยุดทำงาน

---

## รายการงานค้างสำหรับการปรับปรุงให้มีเหตุผล (การทบทวน ROI — ระยะ 9 รอบ 3)

รายการนี้ได้รับการตรวจสอบเทียบกับ `ci.yml` เมื่อ 2026-06-17 (เวอร์ชันก่อนหน้านี้ไม่ได้ระบุ
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`) การทบทวน ROI ของชุดรายการที่ตรวจสอบแล้ว
พบตัวเลือกสำหรับการปรับปรุงให้มีเหตุผลดังต่อไปนี้ **การรวมเป็นการเปลี่ยนแปลง CI
เชิงกล ส่วนการสลับ/ยกเลิกเป็นการตัดสินใจเชิงนโยบายที่สงวนไว้สำหรับผู้ปฏิบัติการ** รายการด้านล่าง
ยังไม่มีการนำไปใช้

**รายการที่ยังไม่ได้บันทึกไว้ข้างต้นด้วย** (เชิงแนะนำ, สัญญาณต่ำ): งาน `docs-lint`
(markdownlint + Vale โดยทั้งงานตั้งค่า `continue-on-error`) และเวิร์กโฟลว์สแกนเนอร์แบบแยกเดี่ยว
`semgrep.yml` / `codeql.yml` / `scorecard.yml` ค่า `semgrepFindings: 0` อยู่ใน
`quality-baseline.json` แต่ยังไม่ได้เชื่อมต่อกับ ratchet แบบบล็อกใน `ci.yml` — ปัจจุบันเมตริกนี้
ไม่มีการใช้งาน

### รวม / ขจัดความซ้ำซ้อน (เชิงกล, ความเสี่ยงต่ำกว่า)

ตัวเลือกแต่ละรายการได้รับการตรวจสอบกับสถานะ gate ที่ใช้งานจริงเมื่อ 2026-06-17 (เชื่อใจแต่ต้องตรวจสอบ)
การรวมหลายรายการที่ดู “ชัดเจน” กลับพบว่าซ่อนหนี้ทางเทคนิคไว้ และ **ไม่ใช่** การแทนที่ที่ทำได้โดยตรงอย่างปลอดภัย

- **`check:docs-sync` ทำงานสองครั้ง** — ทำงานแยกเดี่ยวในงาน `lint` และทำงานอีกครั้งภายใน `check:docs-all` (`docs-sync-strict`) รวมถึงใน husky pre-commit hook ✅ **เสร็จแล้ว** — นำการเรียกใช้แบบแยกเดี่ยวใน `lint` ออกแล้ว
- **การสแกน CVE** — ❌ **ไม่ใช่การรวมที่ทำได้โดยตรงอย่างปลอดภัย** `audit:deps` ล้มเหลวทันทีเมื่อพบ CVE ระดับสูง/วิกฤตใด ๆ ส่วน `check:vuln-ratchet` (osv) จะล้มเหลวเฉพาะเมื่อมี _การถดถอย_ เมื่อเทียบกับ baseline (ปัจจุบันมีระดับ MODERATE 1 รายการ) ความหมายต่างกัน — การนำ `audit:deps` ออกจะทำให้สูญเสีย gate แบบค่าสัมบูรณ์สำหรับระดับสูง/วิกฤต ให้คงทั้งสองรายการไว้
- **การตรวจจับวงจร** — ✅ **เสร็จแล้ว** (#15159 G-01/G-02) ข้อความเดิมในส่วนนี้เรียก `check:cycles` ว่าเป็น gate ที่ “ผ่านและคัดสรรมาแล้ว” และให้เหตุผลว่าควรคงการบล็อกไว้ เนื่องจาก `check:circular-deps` (dpdm) รายงานวงจร 91 รายการ แต่การผ่านนั้นเป็น **ผลผ่านลวง**: `check:cycles` สแกนไดเรกทอรีย่อย 5 รายการ (450 ไฟล์) จับคู่เฉพาะ `import|export … from` แบบสแตติก และตัด specifier ที่เป็น `@/` และ `@omniroute/open-sse/` ทั้งหมดออก จึงไม่สามารถตรวจพบวงจรจาก dynamic import + alias ซึ่งเป็นวงจรส่วนใหญ่ใน repo ได้ แก้ไขแล้ว: ขณะนี้ gate ตรวจไล่ผ่าน `src` + `open-sse` (5023 ไฟล์), รวบรวม specifier จาก TypeScript AST (ดังนั้น `import("…")` จะถูกนับ แต่ `typeof import("…")` ในตำแหน่งประเภทจะไม่ถูกนับ) และ resolve `paths` ของ tsconfig โดยพบวงจร **14** รายการ ไม่ใช่ 0 เนื่องจากไม่สามารถแก้ไขวงจรเดิมทั้ง 14 รายการใน gate PR ได้ ขณะนี้ `check:cycles` จึงเป็น **ratchet** (`--ratchet`, เพดาน `metrics.cycles.value = 14` ใน `quality-baseline.json`, `direction: down`) — โดยจะบล็อก _การถดถอย_ ใด ๆ และจำนวนวงจรจะลดลงได้เท่านั้น CI เรียกใช้ `npm run check:cycles:ratchet` การทยอยลดจำนวนจะดำเนินไปพร้อมกับ **A-01** ส่วน `check:circular-deps` (dpdm) ยังคงเป็นรายการเชิงแนะนำเพื่อใช้เป็นความเห็นที่สองในขอบเขตที่กว้างกว่า
- **ความซับซ้อน** — ✅ **เสร็จแล้ว** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): ตรวจไล่ด้วย ESLint เพียงรอบเดียว และนับตาม ruleId เพื่อให้ baseline ของ cyclomatic+max-lines และ cognitive ยังคงเป็นอิสระจากกัน ส่วน `check:complexity` / `check:cognitive-complexity` แต่ละรายการยังคงไว้สำหรับ `--update` ภายในเครื่อง
- **การป้องกันข้อมูลหลอนของ `/api`** — ✅ **เสร็จแล้ว** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): จัดทำรายการ FS ของ `src/app/api` เพียงครั้งเดียว โดย openapi-routes + docs-symbols ยังคงรายงานแยกกัน และยังคงรายการแต่ละรายการไว้สำหรับการเรียกใช้ภายในเครื่อง
- **`check:node-runtime` ทำงานใน 11 งาน** — ⚠️ **ROI ต่ำ** แต่ละงานใช้ runner แยกกันและการตรวจสอบใช้เวลาน้อยกว่า 1 วินาที เวลาที่ประหยัดได้รวมประมาณ 10 วินาที ซึ่งไม่คุ้มกับการสูญเสียตัวป้องกันราคาถูกในแต่ละงานและความวุ่นวายจากการเปลี่ยนแปลง
- **`typecheck:noimplicit:core` ใน CI lint** — ✅ **นำออกจากงาน lint แล้ว** (เดิมเป็นเชิงแนะนำโดยใช้ `continue-on-error`) พื้นผิวประเภทที่บล็อกคือ `typecheck:core` + `check:type-coverage` โดยยังคงสคริปต์สำหรับใช้งานภายในเครื่องไว้

### สลับ / ตัดสินใจ (นโยบายของผู้ปฏิบัติการ)

- `check:openapi-security-tiers` (เชิงแนะนำ) — ❌ **ไม่สามารถสลับได้โดยตรงอย่างปลอดภัย** แม้จะจบการทำงานด้วย 0 แต่เตือนว่า route หลายรายการของ `traffic-inspector` ภายใต้ `LOCAL_ONLY_API_PREFIXES` ไม่มี annotation `x-loopback-only: true` การบังคับใช้จำเป็นต้องเพิ่ม annotation เหล่านั้นใน `openapi.yaml` ก่อน
- `typecheck:noimplicit:core` (เชิงแนะนำ) — ถูกแทนที่โดย ratchet `check:type-coverage` ที่บล็อกอยู่เป็นส่วนใหญ่แล้ว ให้สลับเป็น ratchet หรือนำการรัน `tsc` รอบที่สองซึ่งซ้ำซ้อนออก
- `test:vitest:ui` (ขณะนี้ **บล็อก**) — ความล้มเหลวที่มีอยู่เดิมถูกยกเว้นไว้อย่างชัดเจนใน `vitest.config.ts` พร้อมความคิดเห็นติดตาม `// #8618` ส่วนความล้มเหลวใหม่จะทำให้งานล้มเหลว
- `check:secrets` (gitleaks ซึ่งเป็น ratchet แบบบล็อกที่ตรึงไว้ที่ผลบวกลวงที่มีเอกสารกำกับ 3 รายการ) — เพิ่มทั้ง 3 รายการลงใน allowlist เพื่อให้เหลือ 0 หรือลดระดับเป็นเชิงแนะนำ มีขอบเขตทับซ้อนกับการสแกน secret แบบเนทีฟของ GitHub + `check:public-creds`
- `check:pr-evidence` (บล็อก โดยค้นหาข้อความในเนื้อหา PR ด้วย grep) — มีความเสี่ยงสูงที่จะเกิดผลบวกลวง หากนำออกจะทำให้การบังคับใช้กฎตายตัวข้อที่ 18 อ่อนแอลง ดังนั้นนี่จึงเป็นการตัดสินใจเชิงนโยบายอย่างแท้จริง
- `semgrep` (แบบแยกเดี่ยวเชิงแนะนำ) — มีขอบเขตทับซ้อนกับ CodeQL สำหรับกลุ่ม OWASP ให้เชื่อม baseline ของมันเข้ากับ ratchet หรือนำออก

---

## เอกสารที่เกี่ยวข้อง

- ห่วงโซ่อุปทาน (ที่มา, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — เกตตรวจสอบความเท่าเทียมกันของชุดคีย์

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, งาน `i18n-ui-coverage`)
เปรียบเทียบชุดคีย์ปลายสุดของทุกไฟล์ `src/i18n/messages/<locale>.json` กับ `en.json` และจะล้มเหลว
เมื่อพบคีย์ปลายสุดที่ขาดหายหรือเกินมา โดยไม่คำนึงว่าคีย์นั้นถูกเพิ่มเมื่อใด ตัวยึดตำแหน่ง
`__MISSING__:` จะนับว่ามีอยู่แล้ว (เนื้อหาของตัวยึดเป็นหน้าที่ของเกตตรวจสอบอัตราส่วน) เกตนี้เป็นส่วนเติมเต็ม
โดยสมบูรณ์ของเกตอีกสองตัวที่อิงส่วนต่าง/เปอร์เซ็นต์: `check-ui-keys-coverage` กำหนดค่าขั้นต่ำ 80 %
ต่อ locale (แม้ขาดไป 43 คีย์จากทั้งหมดประมาณ 13,000 คีย์ ก็ยังแสดงเป็น 99.7 %) และ
`check-new-key-coverage` จะพิจารณาเฉพาะคีย์ที่ PR เพิ่มลงใน `en.json` ชุด locale หนึ่งจะถูกสร้างขึ้นจาก
`en.json` ณ วันที่ตัด branch และใช้เวลาหลายวันในการแปล ขณะที่ base ยังคงมีการเพิ่มคีย์ต่อไป แต่ PR
ของชุดดังกล่าวไม่ได้เพิ่มคีย์ใดด้วยตัวเอง ดังนั้นเกตพี่น้องทั้งสองจึงไม่ส่งสัญญาณเมื่อชุดที่ 1 (#13044)
ถูกรวมโดยขาดไป 43 คีย์ในเก้า locale และชุดที่ 2 (#13660) ขาดไป 10 คีย์ในแปด locale
(2026-09-15) แก้สถานะแดงด้วย
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; คีย์ปลายสุดที่เป็น `extra`
หมายความว่าต้นทางลบคีย์นั้นแล้ว — ให้ลบออกจาก locale ด้วย `--warn` จะรายงานโดยไม่ทำให้งานล้มเหลว
`--catalog=cli` จะเรียกใช้การเปรียบเทียบเดียวกันกับ `bin/cli/locales` (`npm run i18n:check-keys:cli`);
ทั้งสองขั้นตอนอยู่ในงาน `i18n-ui-coverage`

#### `check-new-key-coverage` — เกต i18n สำหรับคีย์ใหม่

เป็นเกตพี่น้องของ `check-ui-value-drift` โดยเกตนั้นตรวจจับค่าภาษาอังกฤษที่ถูก **เขียนใหม่**
ขณะที่คำแปลยังไม่ได้รับการอัปเดต ส่วนเกตนี้ตรวจจับคีย์ภาษาอังกฤษที่ถูก **เพิ่ม**
แต่บาง locale ไม่เคยได้รับคีย์นั้น

`check-ui-keys-coverage` ไม่สามารถตรวจพบกรณีประเภทนี้ได้ เพราะมันบังคับใช้ค่าขั้นต่ำเป็นเปอร์เซ็นต์ต่อ locale
และการขาดไปสิบเอ็ดคีย์จากคีย์ปลายสุดประมาณ 13,000 คีย์ยังทำให้ความครอบคลุมอยู่ที่ 99.9% เปอร์เซ็นต์
ต่อภาษาไม่สามารถสื่อความหมายว่า "ฟีเจอร์นี้เผยแพร่โดยยังไม่ได้แปล" ได้ — ฟีเจอร์ทั้งชุดอาจเข้าสู่
locale ใหม่โดยไม่มีข้อความเลย แต่ตัวเลขก็แทบไม่เปลี่ยนแปลง

เหตุการณ์ที่เกตนี้บันทึกไว้คือ: Phase 3 ของ Orchestration Canvas แปลคีย์ทั้งสิบเอ็ดคีย์ใน 42 locale
ที่มีอยู่ในขณะนั้น หลายชั่วโมงต่อมา ชุดภาษาของสหภาพยุโรป (#13044) ทำให้ repository มีทั้งหมด
51 locale และ locale ใหม่ทั้งเก้า (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) ไม่เคย
ได้รับคีย์เหล่านั้น `deepMergeFallback` จะแทนคีย์ที่ขาดด้วยภาษาอังกฤษ ดังนั้นรูปแบบความล้มเหลว
จึงเป็น UI ที่ไม่ได้รับการแปลแทนที่จะเป็น UI ว่างเปล่า — เป็นปัญหาจริงและเงียบโดยธรรมชาติของการออกแบบ

เช่นเดียวกับเกตพี่น้อง เกตนี้ **รับรู้ส่วนต่าง** โดยเปรียบเทียบภาษาอังกฤษ ณ merge base กับ working
tree ดังนั้นช่องว่างที่มีอยู่ก่อนแล้วจะยังคงถูกตรึงไว้ และไม่ต้องมีการย้ายข้อมูลก่อนเปิดใช้เกต

**มาร์กเกอร์ `__MISSING__:<english>` ไม่ถือว่าผ่านเกตนี้ (ตั้งแต่ 2026-09-17)** ก่อนหน้านี้มาร์กเกอร์ดังกล่าว
เป็นวิธีเลื่อนการแปลที่ระบุไว้ในเอกสาร — runtime จะ fallback ไปใช้ภาษาอังกฤษที่ถูกต้อง — จนกระทั่ง
feature PR แปดรายการเมื่อ 2026-09-16 เพิ่ม 61 คีย์และใส่มาร์กเกอร์ลงในทั้ง 65 locale แทนการแปล:
เกตนี้ยอมรับทุก PR ไม่มีสิ่งใดขัดขวาง PR เหล่านั้น และจากนั้นเกตตรวจสอบอัตราส่วนคำแปลจริงแบบบล็อก
ก็ล้มเหลวที่ release tip สำหรับทุกคน (pt-BR 3.2 % > 2.5 % + 0.5) ปัจจุบันมาร์กเกอร์จะถูกพิจารณา
ว่าเป็นคำแปลที่ขาดหาย แก้สถานะแดงด้วย
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` หรือ
ดำเนินการทุก locale แบบขนานด้วย `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
ใช้งานได้อย่างปลอดภัยในโหมด detached และจะไม่เริ่มทำงานหากไม่มี env `OMNIROUTE_TRANSLATION_*`)
คีย์ที่จำเป็นต้องคงเป็นภาษาอังกฤษ (ชื่อผลิตภัณฑ์/เอนจิน/แฟล็กที่กำหนดตายตัว) ต้องอยู่ใน
`scripts/i18n/untranslatable-keys.json` และต้องไม่ซ่อนอยู่หลังมาร์กเกอร์ `vi` ห้ามใช้มาร์กเกอร์
โดยเด็ดขาด (`tests/unit/i18n-vi-completeness.test.ts`)

#### `check-vitest-exclusions` — เกตสำหรับเทสต์ที่ถูกพักไว้

ไฟล์ที่อยู่ในรายการ `exclude` ของ `vitest.config.ts` คือเทสต์ที่ไม่ได้ทำงาน และในสายตาของผู้ที่อ่าน
โครงสร้างไฟล์ เทสต์นั้นดูเหมือนเป็นส่วนหนึ่งของความครอบคลุม มีไฟล์สะสมอยู่หลังคอมเมนต์
`// #8618 — pre-existing failure; remove this exclusion when fixed` ถึงหกสิบสองไฟล์ Issue #8618
ถูกปิดเมื่อ 2026-08-11 ขณะที่รายการที่ติดตามโดย issue นี้เพิ่มจาก 45 รายการเป็น 62 รายการ โดยแต่ละ
รายการใหม่รับช่วงคอมเมนต์ที่ชี้ไปยัง issue ที่ปิดไปแล้ว เมื่อมีการวัดผลรายการดังกล่าวทีละไฟล์ในที่สุด
(#13204) พบว่า **51 จาก 62 ไฟล์ผ่านกับ tree ปัจจุบันโดยไม่ต้องเปลี่ยนแปลง source ใดๆ**

เกตนี้กำหนดให้ทุก exclusion ที่ resolve ไปยังไฟล์จริงต้อง (a) ระบุ tracking issue และ
(b) ปรากฏใน `config/quality/vitest-exclusions.json` พร้อมสถานะที่วัดได้ เพื่อให้การเพิ่ม exclusion
เป็น diff ที่ตรวจสอบได้ในไฟล์เฉพาะ แทนที่จะเป็นเพียงอีกหนึ่งบรรทัดในอาร์เรย์ที่มี 60 รายการ เกตนี้
ตั้งใจไม่เรียกใช้เทสต์ที่ถูก exclude ซ้ำ — การทำเช่นนั้นใช้เวลาประมาณ 10 นาทีและควรอยู่ในงานที่รัน
เป็นระยะ ส่วน inventory จะบันทึกว่าแต่ละรายการถูกวัดผลครั้งล่าสุดเมื่อใด
