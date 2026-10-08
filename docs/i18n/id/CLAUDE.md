# CLAUDE.md (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇪🇹 [am](../am/CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇧🇦 [bs](../bs/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇬🇷 [el](../el/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇪🇪 [et](../et/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇪 [ga](../ga/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇳🇬 [ha](../ha/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇷 [hr](../hr/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇦🇲 [hy](../hy/CLAUDE.md) · 🇳🇬 [ig](../ig/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇬🇪 [ka](../ka/CLAUDE.md) · 🇰🇭 [km](../km/CLAUDE.md) · 🇮🇳 [kn](../kn/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇱🇹 [lt](../lt/CLAUDE.md) · 🇱🇻 [lv](../lv/CLAUDE.md) · 🇮🇳 [ml](../ml/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇲🇹 [mt](../mt/CLAUDE.md) · 🇲🇲 [my](../my/CLAUDE.md) · 🇳🇵 [ne](../ne/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇮🇳 [or](../or/CLAUDE.md) · 🇮🇳 [pa](../pa/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇱🇰 [si](../si/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇮 [sl](../sl/CLAUDE.md) · 🇷🇸 [sr](../sr/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇺🇿 [uz](../uz/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇳🇬 [yo](../yo/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md) · 🇹🇼 [zh-TW](../zh-TW/CLAUDE.md)

---

@AGENTS.md

**Semua aturan proyek berada di [`AGENTS.md`](AGENTS.md)** — satu-satunya sumber kebenaran untuk setiap
asisten AI (arsitektur, konvensi, pengujian, gerbang kualitas, alur kerja git, 23 Aturan Keras,
pembelajaran PII). Baca seluruhnya; jangan tambahkan kembali aturan proyek di sini. Semua hal di bawah ini berlaku HANYA
untuk Claude Code — penyempurnaan operasional dari aturan yang sudah ditetapkan dalam `AGENTS.md`.

## Isolasi worktree — khusus Claude Code

Protokol worktree wajib secara lengkap (konfirmasi branch dasar, path kanonis `.claude/worktrees/`,
`cp -al` node_modules, aturan pembongkaran) terdapat dalam `AGENTS.md` → Alur Kerja Git → "Isolasi
worktree". Poin-poin khusus Claude Code:

- Konfirmasikan branch dasar dengan operator melalui `AskUserQuestion` (Aturan Keras #19), kecuali mereka
  sudah memberitahukannya.
- Utamakan tool native `EnterWorktree` — tool ini sudah membuat worktree di bawah
  `.claude/worktrees/` (path kanonis). Buat worktree dengan perintah `git
worktree add` yang terdokumentasi, lalu panggil `EnterWorktree` dengan `path`-nya.

## Keamanan lintas sesi — khusus Claude Code

Aturan Keras #19/#21/#22 (dalam `AGENTS.md`) mengatur sesi paralel. Pengingat operasional untuk
harness ini:

- **Replikasikan larangan `git stash` secara verbatim dalam prompt setiap subagen yang menyentuh git**
  (tool Agent / skrip Workflow) — subagen tidak mewarisi file ini, dan insiden stash yang tercatat
  berulang terjadi melalui subagen.
- Sebelum melakukan merge atau push ke PR apa pun yang tidak Anda buat _dalam sesi ini_, jalankan `git worktree list`
  dan periksa kembali `gh pr view <N> --json state,headRefOid` (Aturan Keras #22b).
- Akhiri setiap sesi dengan checkout utama berada pada branch tempat sesi tersebut dimulai.

## Superpowers / artefak perencanaan — penggantian path

Konvensi `_tasks/` didefinisikan dalam `AGENTS.md` → "Artefak Perencanaan & Riset". Skill
superpowers disertakan dengan default yang mengarah ke `docs/…` — default tersebut **diganti
di sini**. Ketika skill superpowers mengumumkan path seperti "disimpan ke `docs/superpowers/plans/…`",
ubah ke padanan `_tasks/…` sebelum menulis:

| Artefak (skill)                        | Default (JANGAN digunakan) | Simpan di sini sebagai gantinya                               |
| -------------------------------------- | -------------------------- | ------------------------------------------------------------- |
| Rencana (`writing-plans`)              | `docs/superpowers/plans/`  | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`            |
| Spesifikasi / desain (`brainstorming`) | `docs/superpowers/specs/`  | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`       |
| Riset (`deep-research`, ad-hoc)        | `docs/research/`           | `_tasks/research/…`                                           |
| Serah terima (`/handoff`)              | —                          | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/` |

Commit artefak tersebut di dalam repo `_tasks/` (`git -C _tasks …`), jangan pernah di repo utama.

## File sementara / draf — gunakan `_artifacts/`, bukan `/tmp`

Proyek ini mengganti scratchpad sesi default harness (`/tmp/claude-*/…`). Tulis
file sementara/kerja — ekspor, zip yang dihasilkan, output perantara sekali pakai, apa pun yang
biasanya akan Anda letakkan di `/tmp` — ke `/home/diegosouzapw/dev/proxys/OmniRoute/_artifacts/` sebagai gantinya.

- `_artifacts/` adalah path root `_*`: sudah diabaikan git (`AGENTS.md` → "Path root `_*`"), hanya berada
  di disk, tidak pernah dilacak.
- Alasan: menyimpan output sementara di dalam proyek (alih-alih `/tmp`) memudahkan operator
  menemukan dan menghapus semua hal sementara di satu tempat, alih-alih mencarinya di berbagai
  direktori `/tmp` sementara khusus sesi yang menghilang atau menumpuk tanpa terlacak.
- **Jangan** samakan ini dengan `_tasks/` (Aturan Keras #23, repo git privat tersendiri untuk
  rencana/spesifikasi/riset/serah terima yang tahan lama) — `_artifacts/` hanya untuk file kerja sekali pakai, tidak ada
  di sini yang perlu dipertahankan atau diberi versi.

## Base-green sebelum membuka PR

Sebelum membuat branch atau membuka PR, jalankan pemeriksaan base-green (`AGENTS.md` → Alur Kerja Git →
"Pemeriksaan base-green"; skill proyek merujuknya sebagai `.agents/skills/_shared/base-green.md`). PR
yang dibuka saat tip dasar berstatus merah harus memuat `⚠️ base-red inherited: #<issue>` dalam body-nya. Untuk
mengatasi akumulasi status merah (tip dasar + PR merah), gunakan skill `/sweep-reds`.
