# CLAUDE.md (ไทย)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**กฎทั้งหมดของโปรเจกต์อยู่ใน [`AGENTS.md`](AGENTS.md)** — แหล่งข้อมูลจริงเพียงแห่งเดียวสำหรับผู้ช่วย AI
ทุกตัว (สถาปัตยกรรม แบบแผน การทดสอบ ด่านตรวจคุณภาพ เวิร์กโฟลว์ git กฎบังคับ 23 ข้อ
และบทเรียนเกี่ยวกับ PII) โปรดอ่านทั้งหมด และอย่าเพิ่มกฎของโปรเจกต์ซ้ำที่นี่ ทุกสิ่งด้านล่างนี้ใช้
กับ Claude Code เท่านั้น — เป็นรายละเอียดเชิงปฏิบัติการเพิ่มเติมของกฎที่กำหนดไว้แล้วใน `AGENTS.md`

## การแยก worktree — รายละเอียดเฉพาะสำหรับ Claude Code

โพรโทคอล worktree ฉบับเต็มที่ต้องปฏิบัติตาม (การยืนยัน base branch, พาธมาตรฐาน
`.claude/worktrees/`, `cp -al` node_modules, กฎการรื้อถอน) อยู่ใน `AGENTS.md` → Git Workflow → "Worktree
isolation" ประเด็นเฉพาะสำหรับ Claude Code ได้แก่:

- ยืนยัน base branch กับผู้ดำเนินการผ่าน `AskUserQuestion` (กฎบังคับ #19) เว้นแต่พวกเขา
  จะแจ้งไว้แล้ว
- เลือกใช้เครื่องมือเนทีฟ `EnterWorktree` — เครื่องมือนี้สร้าง worktree ภายใต้
  `.claude/worktrees/` (พาธมาตรฐาน) อยู่แล้ว ให้สร้าง worktree ด้วยคำสั่ง `git
worktree add` ที่ระบุไว้ในเอกสาร จากนั้นเรียก `EnterWorktree` พร้อม `path` ของ worktree นั้น

## ความปลอดภัยข้ามเซสชัน — รายละเอียดเฉพาะสำหรับ Claude Code

กฎบังคับ #19/#21/#22 (ใน `AGENTS.md`) ควบคุมเซสชันที่ทำงานขนานกัน ข้อควรจำเชิงปฏิบัติการสำหรับ
ระบบนี้:

- **ทำซ้ำข้อห้ามใช้ `git stash` แบบคำต่อคำในพรอมต์ของ subagent ทุกตัวที่ทำงานกับ git**
  (เครื่องมือ Agent / สคริปต์ Workflow) — subagent จะไม่ได้รับไฟล์นี้โดยอัตโนมัติ และเหตุการณ์
  stash ที่เกิดซ้ำตามบันทึกนั้นเกิดขึ้นผ่าน subagent
- ก่อน merge หรือ push ไปยัง PR ใดก็ตามที่คุณไม่ได้สร้าง _ในเซสชันนี้_ ให้รัน `git worktree list`
  และตรวจสอบ `gh pr view <N> --json state,headRefOid` อีกครั้ง (กฎบังคับ #22b)
- จบทุกเซสชันโดยให้ checkout หลักอยู่บน branch เดียวกับตอนที่เริ่มต้นเซสชัน

## Superpowers / อาร์ติแฟกต์การวางแผน — การแทนที่พาธ

แบบแผน `_tasks/` กำหนดไว้ใน `AGENTS.md` → "Planning & Research Artifacts" ทักษะ
superpowers มาพร้อมค่าเริ่มต้นที่ชี้ไปยัง `docs/…` — ค่าเริ่มต้นเหล่านั้นถูก **แทนที่
ที่นี่** เมื่อทักษะ superpowers แจ้งพาธอย่าง "saved to `docs/superpowers/plans/…`"
ให้เปลี่ยนเป็นพาธที่เทียบเท่าภายใต้ `_tasks/…` ก่อนเขียนไฟล์:

| อาร์ติแฟกต์ (ทักษะ)                    | ค่าเริ่มต้น (ห้ามใช้)     | ให้บันทึกที่นี่แทน                                            |
| -------------------------------------- | ------------------------- | ------------------------------------------------------------- |
| แผน (`writing-plans`)                  | `docs/superpowers/plans/` | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| ข้อกำหนด / การออกแบบ (`brainstorming`) | `docs/superpowers/specs/` | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| งานวิจัย (`deep-research`, เฉพาะกิจ)   | `docs/research/`          | `_tasks/research/…`                                           |
| การส่งต่องาน (`/handoff`)              | —                         | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

commit อาร์ติแฟกต์เหล่านั้นภายใน repo `_tasks/` (`git -C _tasks …`) เท่านั้น ห้าม commit ใน repo หลัก

## ไฟล์ร่าง / ไฟล์ชั่วคราว — ใช้ `_artifacts/` ไม่ใช่ `/tmp`

โปรเจกต์นี้แทนที่ scratchpad เริ่มต้นประจำเซสชันของระบบ (`/tmp/claude-*/…`) ให้เขียน
ไฟล์ชั่วคราว/ไฟล์ระหว่างทำงาน — ไฟล์ export, zip ที่สร้างขึ้น, เอาต์พุตขั้นกลางแบบใช้ครั้งเดียว หรือสิ่งใดก็ตามที่ปกติคุณ
จะใส่ใน `/tmp` — ไปยัง `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/` แทน

- `_artifacts/` เป็นพาธ `_*` ที่ root: ถูก gitignore ไว้แล้ว (`AGENTS.md` → "Root `_*` paths") และอยู่
  บนดิสก์เท่านั้น โดยจะไม่ถูกติดตาม
- เหตุผล: การเก็บเอาต์พุตชั่วคราวไว้ภายในโปรเจกต์ (แทน `/tmp`) ช่วยให้ผู้ดำเนินการ
  ค้นหาและลบสิ่งชั่วคราวทั้งหมดได้ง่ายในที่เดียว แทนที่จะต้องตามหาในไดเรกทอรี `/tmp`
  เฉพาะแต่ละเซสชันที่อาจหายไปหรือสะสมไฟล์ที่ไม่ได้ติดตาม
- **อย่า** สับสนกับ `_tasks/` (กฎบังคับ #23 ซึ่งเป็น repo git ส่วนตัวแยกต่างหากสำหรับ
  แผน/ข้อกำหนด/งานวิจัย/การส่งต่องานที่ต้องเก็บถาวร) — `_artifacts/` ใช้สำหรับไฟล์ระหว่างทำงานที่ทิ้งได้เท่านั้น ไม่มีสิ่งใด
  ที่นี่ต้องคงอยู่หรือได้รับการควบคุมเวอร์ชัน

## ตรวจสอบว่า base เป็นสีเขียวก่อนเปิด PR

ก่อนสร้าง branch หรือเปิด PR ให้รันการตรวจสอบ base-green (`AGENTS.md` → Git Workflow →
"Base-green check"; ทักษะของโปรเจกต์อ้างอิงถึงขั้นตอนนี้ใน `.agents/skills/_shared/base-green.md`) PR ที่
เปิดขณะที่ tip ของ base เป็นสีแดงต้องมี `⚠️ base-red inherited: #<issue>` ในเนื้อหา หากต้องการ
สะสางสถานะสีแดงที่สะสมอยู่ (tip ของ base + PR ที่เป็นสีแดง) ให้ใช้ทักษะ `/sweep-reds`
