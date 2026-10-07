# CLAUDE.md (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Semua peraturan projek terkandung dalam [`AGENTS.md`](AGENTS.md)** — sumber kebenaran tunggal untuk setiap
pembantu AI (seni bina, konvensyen, pengujian, gerbang kualiti, aliran kerja git, 23 Peraturan Tegas,
pembelajaran PII). Baca sepenuhnya; jangan tambahkan semula peraturan projek di sini. Semua perkara di bawah terpakai HANYA
untuk Claude Code — penambahbaikan operasi terhadap peraturan yang telah ditakrifkan dalam `AGENTS.md`.

## Pengasingan worktree — perkara khusus Claude Code

Protokol worktree mandatori yang lengkap (pengesahan cabang asas, laluan kanonik
`.claude/worktrees/`, `cp -al` node_modules, peraturan penghapusan) terdapat dalam `AGENTS.md` → Aliran Kerja Git → "Pengasingan
worktree". Perkara khusus Claude Code:

- Sahkan cabang asas dengan operator melalui `AskUserQuestion` (Peraturan Tegas #19) melainkan mereka
  telah memaklumkannya kepada anda.
- Utamakan alat natif `EnterWorktree` — alat ini sememangnya mencipta worktree di bawah
  `.claude/worktrees/` (laluan kanonik). Cipta worktree menggunakan perintah `git
worktree add` yang didokumentasikan, kemudian panggil `EnterWorktree` dengan `path` worktree tersebut.

## Keselamatan merentas sesi — perkara khusus Claude Code

Peraturan Tegas #19/#21/#22 (dalam `AGENTS.md`) mengawal sesi selari. Peringatan operasi untuk
persekitaran ini:

- **Salin larangan `git stash` secara verbatim ke dalam gesaan setiap subagen yang menyentuh git**
  (alat Agent / skrip Workflow) — subagen tidak mewarisi fail ini, dan kejadian berulang
  bagi insiden stash yang direkodkan berlaku melalui subagen.
- Sebelum menggabungkan atau menolak ke mana-mana PR yang tidak anda cipta _dalam sesi ini_, jalankan `git worktree list`
  dan semak semula `gh pr view <N> --json state,headRefOid` (Peraturan Tegas #22b).
- Akhiri setiap sesi dengan checkout utama berada pada cabang yang sama seperti ketika sesi bermula.

## Superpowers / artifak perancangan — penggantian laluan

Konvensyen `_tasks/` ditakrifkan dalam `AGENTS.md` → "Artifak Perancangan & Penyelidikan". Kemahiran
superpowers disediakan dengan lalai yang menghala ke `docs/…` — lalai tersebut **digantikan
di sini**. Apabila kemahiran superpowers mengumumkan laluan seperti "disimpan ke `docs/superpowers/plans/…`",
tulis semula kepada laluan `_tasks/…` yang setara sebelum menulis:

| Artifak (kemahiran)                         | Lalai (JANGAN gunakan)    | Simpan di sini sebagai ganti                                  |
| ------------------------------------------- | ------------------------- | ------------------------------------------------------------- |
| Pelan (`writing-plans`)                     | `docs/superpowers/plans/` | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| Spesifikasi / reka bentuk (`brainstorming`) | `docs/superpowers/specs/` | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| Penyelidikan (`deep-research`, ad-hoc)      | `docs/research/`          | `_tasks/research/…`                                           |
| Serahan (`/handoff`)                        | —                         | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

Commit artifak tersebut di dalam repo `_tasks/` (`git -C _tasks …`), jangan sekali-kali dalam repo utama.

## Fail contengan / sementara — gunakan `_artifacts/`, bukan `/tmp`

Projek ini menggantikan pad contengan sesi lalai persekitaran (`/tmp/claude-*/…`). Tulis
fail sementara/kerja — eksport, zip yang dijana, output perantaraan sekali guna, apa-apa sahaja yang
biasanya anda letakkan dalam `/tmp` — ke `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/` sebagai ganti.

- `_artifacts/` ialah laluan akar `_*`: sudah diabaikan oleh git (`AGENTS.md` → "Laluan akar `_*`"), hanya wujud
  pada cakera, tidak pernah dijejaki.
- Sebab: menyimpan output contengan di dalam projek (berbanding `/tmp`) memudahkan operator
  mencari dan memadam semua perkara sementara di satu tempat, dan bukannya mencarinya merentasi
  direktori `/tmp` khusus sesi yang bersifat sementara, yang hilang atau mengumpulkan fail tidak dijejaki.
- Jangan **kelirukan** ini dengan `_tasks/` (Peraturan Tegas #23, repo git peribadinya sendiri untuk
  pelan/spesifikasi/penyelidikan/serahan yang berkekalan) — `_artifacts/` hanya untuk fail kerja yang boleh dibuang, tiada apa-apa
  di sini yang perlu dikekalkan atau diversi.

## Pastikan asas hijau sebelum membuka PR

Sebelum mencipta cabang atau membuka PR, jalankan semakan asas hijau (`AGENTS.md` → Aliran Kerja Git →
"Semakan asas hijau"; kemahiran projek merujuknya sebagai `.agents/skills/_shared/base-green.md`). PR
yang dibuka ketika tip asas berstatus merah mesti mengandungi `⚠️ base-red inherited: #<issue>` dalam badannya. Untuk
menghapuskan keadaan merah yang terkumpul (tip asas + PR merah), gunakan kemahiran `/sweep-reds`.
