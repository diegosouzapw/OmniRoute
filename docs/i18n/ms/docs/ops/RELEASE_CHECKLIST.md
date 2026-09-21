# Release Checklist (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

> **Kemas kini terakhir:** 2026-08-28 — v3.8.51
> Aliran keluaran yang diperkemas dengan memanfaatkan kemahiran Claude Code untuk automasi.
>
> **Pastikan baris gilir/cawangan kekal hijau antara keluaran:** lihat [RELEASE_GREEN.md](./RELEASE_GREEN.md)
> (keluarga `/green-prs` + `npm run check:release-green` + `/babysit` + proses setiap malam). Menjalankan
> ini secara berkala — dan khususnya **sebelum** senarai semak ini — memastikan PR keluaran bermula dalam keadaan hijau.

## Ringkasannya

```bash
# 1. Naikkan versi + jana CHANGELOG (kemahiran)
/version-bump-cc patch    # atau minor/major

# 2. Jalankan get kualiti secara setempat
npm run check              # lint + ujian
npm run test:coverage      # get liputan penuh (60/60/60/60)

# 3. Bina & uji asap
npm run build
npm run test:e2e           # pilihan tetapi disyorkan

# 4. Jana keluaran (kemahiran)
/generate-release-cc

# 5. Laksanakan penyebaran (kemahiran)
/deploy-vps-both-cc        # atau akamai-cc / local-cc

# 6. Tangkap bukti keluaran (kemahiran)
/capture-release-evidences-cc
```

## Penerbitan Dipercayai npm (lalai sejak v3.8.51) — berperingkat atas permintaan, terus sebagai pilihan sandaran

`npm-publish.yml` menerbitkan melalui **Penerbitan Dipercayai npm (OIDC)** secara lalai: tugas
`stage-npm` (dihoskan GitHub) menukar id-token GitHub dengan bukti kelayakan npm
jangka pendek untuk pelaksanaan tersebut — tiada token npm jangka panjang dalam rahsia repositori, tiada gesaan 2FA, asal-usul dilampirkan.
Itulah pintasan yang kini dibenarkan oleh npm apabila token yang melangkau 2FA sedang ditamatkan;
ia memulihkan aliran automatik sepenuhnya yang dimiliki projek sehingga v3.8.48 sambil mengekalkan
jaminan WS1.3 (token yang bocor tidak boleh menerbitkan secara bersendirian — tiada token).

**Persediaan sekali sahaja (pemilik):** npmjs.com → pakej `omniroute` → Settings → _Trusted
Publisher_ → GitHub: owner `diegosouzapw`, repo `OmniRoute`, workflow `npm-publish.yml`
(environment: none). Sehingga konfigurasi itu wujud, langkah automatik akan gagal dengan `ENEEDAUTH`:
laksanakan semula dengan `publish_mode=staged` (di bawah) atau `direct`.

### Penerbitan berperingkat (atas permintaan — `publish_mode=staged`)

Aliran kerja npm-publish tidak lagi menerbitkan secara terus: ia memulakan tarball yang telah dibungkus
(`check:pack-boot`) dan kemudian menjalankan `npm stage publish` — bait yang tepat disimpan sementara pada
daftar, **tidak boleh dipasang** sehingga pemilik meluluskannya. Get 2FA manusia dipindahkan
ke SELEPAS pembuktian, bukan sebelumnya.

**Aliran pemilik selepas aliran kerja menjadi hijau:**

1. `npm stage list omniroute` — cari id peringkat (turut dicetak dalam ringkasan aliran kerja).
2. Sahkan bait berperingkat (disyorkan): `npm stage download <id>`, kemudian pasang
   tarball yang dimuat turun ke dalam awalan sementara dan mulakannya (`npm run check:pack-boot` mengautomasikan
   keputusan bungkus→pasang→mula yang sama dalam CI).
3. `npm stage approve <id>` — gesaan 2FA ITULAH penerbitan. `npm stage reject <id>` akan membuangnya.
4. Jaring keselamatan selepas penerbitan: pengesah selepas penerbitan (WS1.4 dalam pelan v3.8.49) memasang
   versi yang diterbitkan daripada daftar awam dalam bekas yang bersih dan memulakannya.

**Pilihan sandaran kecemasan:** `workflow_dispatch` dengan `publish_mode=direct` memulihkan
`npm publish` serta-merta yang lama (gunakan hanya jika pementasan itu sendiri bermasalah; catat sebabnya).

**Pengerasan sekali sahaja (pemilik, npmjs.com):** konfigurasikan Trusted Publisher untuk
`omniroute` dalam mod peringkat sahaja supaya token jangka panjang yang bocor tidak boleh menjalankan `npm publish`
secara terus dari mana-mana sahaja — CI hanya boleh membuat pementasan; hanya 2FA pemilik boleh mengeluarkannya.

**Panduan artifak rosak (tidak berubah):** `npm deprecate omniroute@<bad> "<reason> — use <fixed>"`
sebagai tindakan lalai (beberapa minit, boleh diterbalikkan); `npm unpublish` hanya dalam tempoh 72 jam/tanpa tanggungan
dan jangan sekali-kali sebagai tindakan pertama. Docker: jangan sekali-kali menulis semula tag versi — pengunduran ialah
menghalakan semula `latest` kepada digest baik yang terakhir.

**Docker Hub `latest` (diperlukan bagi setiap penerbitan SemVer stabil):** aliran kerja
`docker-publish` mesti mengetag **kedua-dua** `X.Y.Z` dan, apabila
`should-promote-latest.sh` mengesahkan bahawa ini ialah SemVer stabil tertinggi, `:latest`
dengan **digest yang sama**. Selepas tugas selesai: digest `latest` Hub menyamai digest
SemVer baharu dan `last_updated` telah berubah. Jangan biarkan `:latest` merujuk binaan
lama sedangkan nota keluaran membincangkan pembaikan yang hanya wujud dalam git. Permulaan pantas
Compose menggunakan `:latest`; GitOps harus terus menyematkan `X.Y.Z`. Lihat
[Saluran keluaran Docker](../guides/DOCKER_GUIDE.md#release-channels) dan #10317.

## Laluan Pantas Hotfix (label `hotfix`)

PR yang dilabel `hotfix` melangkau matriks CI berat (E2E 9 serpihan, ratchet liputan,
quality-gate, quality-extended) dan mengekalkan get pantas dengan isyarat tinggi: binaan,
serpihan unit, integrasi, vitest, lint/typecheck, docs-sync, `check:pack-artifact`
dan ujian ringkas but tarball (`check:pack-boot`). Sasaran: hijau dalam ≤15 minit berbanding ~33 minit.

**Dasar kemasukan — keempat-empatnya diperlukan (dimodelkan berdasarkan laluan kecemasan Chromium/VS Code/Node):**

1. **Keterukan**: pengeluaran rosak — artifak yang diterbitkan ranap semasa but / pembaikan
   keselamatan / setiap pengguna keluaran terjejas. "Penting" tidak bermaksud "rosak".
2. **Kuasa**: hanya pemilik repositori boleh menggunakan label `hotfix`. Label itu SENDIRI
   merupakan kelulusan — jangan sekali-kali gunakannya sendiri pada PR kempen.
3. **Bukti**: kandungan PR memautkan proses berat terdahulu yang hijau sepenuhnya (suit yang
   akan disahkan semula oleh tugas yang dilangkau) serta ujian pembaikan itu sendiri yang mula-mula gagal kemudian lulus.
4. **Skop**: cherry-pick sahaja — pembaikan minimum, tiada pemfaktoran semula, tiada perubahan sampingan.

Permukaan liputan/ratchet yang dilangkau disahkan semula oleh proses penuh seterusnya pada
cabang keluaran (release-green berterusan) — laluan ini melangkau PENANTIAN, bukan pengesahan.
Perbezaan ujian sahaja (semua fail di bawah `tests/`, tiada di bawah `tests/e2e/`) melangkau matriks E2E
secara automatik, tanpa sebarang label.

## Senarai Semak Terperinci

### Prakeluaran

- [ ] Semua PR yang disasarkan untuk keluaran ini telah digabungkan ke `release/vX.Y.0`
- [ ] Semua item Linear/isu terbuka untuk versi ini telah ditutup atau dipindahkan ke pencapaian seterusnya
- [ ] CI hijau pada cabang `release/vX.Y.0`
- [ ] Tiada penanda `TODO(release)` dalam kod: `grep -r "TODO(release)" src/ open-sse/`
- [ ] Imej asas Docker dikemas kini (kini `node:24.15.0-trixie-slim`)

### Versi & Log Perubahan

- [ ] Jalankan `/version-bump-cc <patch|minor|major>` (kemahiran Claude Code)
  - Menaikkan versi `package.json`, `electron/package.json`
  - Menjana semula `CHANGELOG.md` daripada komit git sejak tag terakhir
  - Mengemas kini lencana README.md
- [ ] Semak CHANGELOG.md secara manual dan kemaskan mesej komit jika perlu
- [ ] Pastikan bahagian semver terkini dalam `CHANGELOG.md` sama dengan versi `package.json`
- [ ] Kekalkan `## [Unreleased]` sebagai bahagian pertama log perubahan untuk kerja akan datang
- [ ] Kemas kini `docs/openapi.yaml` → `info.version` mestilah sama dengan versi `package.json`

### Kualiti Kod

- [ ] `npm run lint` — 0 ralat (amaran telah sedia ada)
- [ ] `npm run typecheck:core` — bersih
- [ ] `npm run typecheck:noimplicit:core` — bersih (ketat)
- [ ] `npm run check:cycles` — tiada kebergantungan kitaran
- [ ] `npm run check:any-budget:t11` — dalam bajet
- [ ] `npm run check:route-validation:t06` — bersih
- [ ] `npm run check:node-runtime` — had minimum masa jalan yang disokong dipenuhi (`>=22.22.2 <23`, `>=24.0.0 <27`, mengikut `SUPPORTED_NODE_RANGE` dalam `src/shared/utils/nodeRuntimeSupport.ts`; sejajar dengan `engines` dalam `package.json`)

### Pengujian

- [ ] `npm run test:unit` — lulus
- [ ] `npm run test:vitest` — lulus (pelayan MCP, autoCombo, cache)
- [ ] `npm run test:coverage` — get 60/60/60/60 dipenuhi (pernyataan/baris/fungsi/cabang)
- [ ] `npm run test:integration` — lulus (jika perubahan menyentuh DB / pengendali)
- [ ] `npm run test:combo:matrix` — lulus (matriks strategi kombo: membuktikan keputusan pemilihan kesemua 19 strategi penghalaan awam secara deterministik; jalankan apabila menyentuh penghalaan kombo, resolusi strategi atau logik sandaran)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` — **pilihan/manual** (ujian ringkas huluan sebenar yang dikawal; mendapatkan syot kilat DB baca sahaja daripada VPS `root@192.168.0.15`; mengakses penyedia sebenar, menggunakan kredit; tidak pernah dijalankan dalam CI; dilangkau dengan lancar tanpa get)
- [ ] `npm run test:combo:live:vps` — **pilihan/manual** (ujian ringkas langsung VPS Fasa 3: 7 senario HTTP terhadap pelayan `.15` langsung melalui Node ESM biasa; memerlukan `ssh root@192.168.0.15`; mencipta/memadam hanya kombo `__live_test__*`; mengakses penyedia sebenar; tidak pernah dijalankan dalam CI)
- [ ] `npm run test:e2e` — lulus (perubahan UI)
- [ ] `npm run test:protocols:e2e` — lulus (perubahan MCP/A2A)
- [ ] `npm run test:ecosystem` — lulus

### Cangkuk (Disahkan Husky)

Cangkuk Husky terletak dalam `.husky/` dan dijalankan secara automatik semasa operasi git.

- **pre-commit:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **pre-push:** get deterministik pantas — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (diaktifkan pada 2026-06-13). Sengaja mengecualikan `test:unit` (perlahan; diliputi oleh tugas CI `test-unit`).
  - Jalankan `npm run test:unit` secara manual sebelum menolak cabang keluaran.

Jika cangkuk gagal: betulkan isu asas, jangan pintas dengan `--no-verify`.

### Komit Konvensional

Semua komit untuk keluaran mesti mengikut format `type(scope): subject`.

**Jenis sah:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**Skop sah:** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`

Perubahan pemecah keserasian: tambah pengaki `BREAKING CHANGE:` atau `!` selepas skop (cth. `feat(api)!: drop /v0`).

### Dokumentasi

- [ ] `npm run check:docs-sync` berjaya (dijalankan secara automatik oleh pre-commit)
- [ ] `npm run check:docs-all` berjaya (payung: docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links)
- [ ] `npm run check:env-doc-sync` keluar dengan kod 0 — kontrak env antara kod ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` kekal utuh
- [ ] `npm run check:doc-links` keluar dengan kod 0 — tiada rujukan markdown dalaman yang rosak selepas penstrukturan semula
- [ ] `docs/architecture/ARCHITECTURE.md` disemak untuk hanyutan storan/masa jalan
- [ ] `docs/guides/TROUBLESHOOTING.md` disemak untuk hanyutan pemboleh ubah env dan operasi
- [ ] Jika `.env.example` berubah: `docs/reference/ENVIRONMENT.md` dikemas kini
- [ ] Jika ciri baharu mempunyai UI: `docs/guides/USER_GUIDE.md` menyebutnya
- [ ] Jika ciri baharu mempunyai API: `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml` dikemas kini
- [ ] Jika ciri baharu ialah modul: `docs/<MODULE>.md` khusus wujud
- [ ] Jika terdapat perubahan pemecah keserasian: `docs/guides/TROUBLESHOOTING.md` mempunyai nota migrasi

### i18n

- [ ] `npm run i18n:check` keluar dengan kod 0 — keadaan terjemahan (`.i18n-state.json`) disegerakkan dengan dokumen sumber (tiada sumber yang terhanyut dalam mod ketat; nasihat mod amaran boleh diterima untuk kemasan dokumen saat akhir, tetapi mestilah 0 sebelum pengetagan)
- [ ] `npm run i18n:check-ui-coverage` keluar dengan kod 0 — setiap penempatan UI mencapai atau melebihi ambang liputan 80%
- [ ] `npm run i18n:sync-ui:dry` melaporkan 0 kekunci yang hilang merentas kesemua 42 penempatan
- [ ] Jika dokumen sumber bahasa Inggeris berubah, jalankan `npm run i18n:run` (memerlukan `OMNIROUTE_TRANSLATION_API_KEY` dalam `.env`) sebelum pengetagan
- [ ] Sumbangan terjemahan boleh ditangguhkan ke keluaran seterusnya jika kecil (jejaki dalam CHANGELOG)

### Migrasi Pangkalan Data

- [ ] Jika `src/lib/db/migrations/` mempunyai fail baharu:
  - [ ] Setiap migrasi bersifat idempoten (`CREATE TABLE IF NOT EXISTS`, dsb.)
  - [ ] Migrasi dibalut dalam transaksi
  - [ ] Dinomborkan dengan betul (tiada jurang dalam urutan)
- [ ] Uji pada pemasangan baharu: padam `~/.omniroute/omniroute.db` dan jalankan `npm run dev`
- [ ] Uji pada pemasangan sedia ada: sandarkan DB, jalankan migrasi, sahkan skema
- [ ] Fail WAL (`-wal`, `-shm`) dikendalikan dengan betul jika migrasi menulis semula jadual

### Katalog Penyedia (Disahkan oleh Zod)

- [ ] Skema Zod `src/shared/constants/providers.ts` sah semasa pemuatan
  - [ ] Semua penyedia mempunyai medan yang diperlukan (`id`, `label`, `kind`, dsb.)
  - [ ] `freeNote` disediakan untuk penyedia percuma baharu
  - [ ] Penyedia OAuth mempunyai `oauthConfig` yang didaftarkan dalam `src/lib/oauth/constants/oauth.ts`
- [ ] Jika penyedia baharu ditambah: pelaksana yang sepadan dalam `open-sse/executors/`
- [ ] Jika format bukan OpenAI: penterjemah dalam `open-sse/translator/`
- [ ] Model didaftarkan dalam `open-sse/config/providerRegistry.ts`
- [ ] Ujian unit dalam `tests/unit/` meliputi pengelasan dan penghalaan penyedia

### Desktop (Electron)

Jika `electron/` berubah:

- [ ] `npm run electron:smoke:packaged` berjaya
- [ ] Binaan diuji untuk sekurang-kurangnya satu daripada `:win`, `:mac`, `:linux`
- [ ] Sijil penandatanganan kod belum tamat tempoh (jika menandatangani)
- [ ] Versi `electron/package.json` sepadan dengan `package.json` akar
- [ ] Penuding saluran kemas kini automatik dikemas kini jika mengeluarkan kepada `stable`

### Susun Atur Binaan

Repositori menggunakan tiga direktori output yang berbeza — jangan sekali-kali mencampuradukkannya:

| Direktori | Tujuan                                                        | Dijejaki?          |
| --------- | ------------------------------------------------------------- | ------------------ |
| `src/`    | Sumber aplikasi (TypeScript / TSX)                            | Ya                 |
| `.build/` | Perantaraan binaan — output `next build` (`distDir`)          | Tidak (gitignored) |
| `dist/`   | Berkas npm boleh edar — dihimpunkan oleh `assembleStandalone` | Tidak (gitignored) |

> **Nota pengendali:** direktori imej VPS jauh kekal sebagai `/usr/lib/node_modules/omniroute/app/`.
> Hanya output binaan **dalam repositori** yang dipindahkan (`app/` → `dist/`). Kemahiran pengerahan menggunakan rsync
> untuk menyalin kandungan `dist/` ke dalam direktori `app/` jauh — tiada perubahan laluan VPS diperlukan.

**Aliran binaan tunggal:**

```
npm run build:release
  └─ rm -rf .build dist          (bersihkan)
  └─ next build → .build/next/   (perantaraan)
  └─ assembleStandalone          (menyalin kendiri + statik + awam + natif → dist/)
  └─ writes dist/BUILD_SHA       (sentinel HEAD)
```

JANGAN jalankan `npm run build` diikuti oleh `npm run build:cli` yang berasingan untuk pengerahan — gunakan
`npm run build:release` yang melakukan binaan semula bersih + sentinel dalam satu perintah.

### Pengesahan Artifak

- [ ] `npm run build:release` berjaya dan `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` bersih — tiada `app.__qa_backup`, `scripts/scratch`, `package-lock.json`, atau sisa setempat lain
- [ ] `dist/server.js` wujud selepas binaan

### Pengetagan & Keluaran

- [ ] Jalankan `/generate-release-cc` (kemahiran Claude Code):
  - Mencipta tag `vX.Y.Z`
  - Menolak tag dan cabang
  - Membuka GitHub Release dengan kandungan log perubahan
  - Melampirkan pemasang Electron (jika dibina)
- [ ] Atau secara manual:
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### Pengerahan

Kemahiran pengerahan menggunakan aliran rsync ringan — tanpa `npm pack`, tanpa `npm i -g`:

- [ ] Gunakan kemahiran pengerahan yang sepadan dengan sasaran:
  - `/deploy-vps-local-cc` — VPS setempat (192.168.0.15)
  - `/deploy-vps-akamai-cc` — VPS Akamai (69.164.221.35)
  - `/deploy-vps-both-cc` — kedua-duanya
- [ ] Sebelum mengerah, sahkan `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] Binaan mesti dijalankan di tempat `node_modules` adalah sebenar (checkout utama atau worktree yang telah menjalankan `npm ci` — BUKAN worktree pautan simbolik)
- [ ] Uji ringkas tika pengerahan:
  - Buka `/dashboard/health` → semak rentetan versi sepadan dengan keluaran
  - Jalankan permintaan `/v1/chat/completions` terhadap penyedia yang diketahui
  - Sahkan `/api/monitoring/health` mengembalikan pemutus litar `CLOSED`
  - Sahkan pengangkutan MCP memberikan respons (`/mcp` HTTP, `/mcp-sse` SSE)

### Selepas Keluaran

- [ ] Jalankan `/capture-release-evidences-cc` (kemahiran Claude Code)
  - Menangkap tangkapan skrin/rakaman WebP bagi ciri baharu
  - Melampirkannya pada nota keluaran / catatan blog
- [ ] Kemas kini GitHub Discussions / Discord dengan pengumuman keluaran
- [ ] Buka pencapaian untuk versi seterusnya
- [ ] Jika kritikal: sematkan perbincangan atau siarkan dalam `news.json` untuk sepanduk dalam aplikasi

### Gerbang pelancaran awam Radar

Pengumuman Radar sengaja dikomit dengan `active: false`. Pengaktifan ialah perubahan berasingan
selepas bukti disediakan untuk setiap perkara di bawah:

- [ ] Semua PR Radar bertindan telah digabungkan dan CI hujung keluaran berstatus hijau
- [ ] Lancarkan dan lakukan ujian asap pada laluan OSS Radar dengan `RADAR_ENABLED` masih dimatikan secara lalai
- [ ] Lakukan ujian asap pada `GET /planos`, `/termos`, `/privacidade`, dan `/reembolso` di hos Radar yang ditetapkan
- [ ] Rekod identiti/maklumat hubungan/alamat pengendali dan semakan undang-undang yang diluluskan pemilik dalam perkhidmatan persendirian
- [ ] Uji Stripe Checkout dan webhook bertandatangan dalam mod ujian sahaja
- [ ] Uji satu penghantaran e-mel transaksi yang disulitkan dengan pengirim/domain yang diluluskan
- [ ] Buktikan pemulihan sandaran dan satu pelaksanaan penyelidikan terselia dengan had belanjawan
- [ ] Luluskan dasar semakan BRL/PIX sebelum menerima bukti sumbangan
- [ ] Dayakan Checkout awam hanya selepas gerbang terdahulu dipenuhi, kemudian aktifkan ID `news.json` baharu
- [ ] Sahkan sepanduk Laman Utama menggunakan teks setempat dan ID baharu muncul semula selepas ID lama ditutup

## Ujian ringkas Perkhidmatan Terbenam (v3.8.4+)

Sebelum mengeluarkan sebarang keluaran yang merangkumi perubahan perkhidmatan terbenam, sahkan:

### But DB baharu (mengesan pertembungan migrasi — ditambahkan selepas pembaikan segera v3.8.4)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — tunggu 10 s untuk but
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` mengembalikan `"9router"` (BUKAN 404, BUKAN 500). Mengesahkan migrasi `071_services.sql` telah digunakan + baris telah disemai.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` mengembalikan 3 baris.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` mengembalikan 2 baris (mengesahkan `070_webhooks_kind_metadata.sql` telah digunakan).
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` berjaya — melindungi daripada pertembungan pada masa hadapan.

### 9Router

- [ ] `POST /api/services/9router/install` mengembalikan 200 dengan `installedVersion` dalam masa kurang daripada 2 min
- [ ] `POST /api/services/9router/start` mengembalikan 200 dan `state: "running"` dalam masa kurang daripada 30 s
- [ ] `GET /api/services/9router/status` melaporkan `health: "healthy"`
- [ ] `POST /v1/chat/completions` dengan `"model": "9router/auto/..."` mengembalikan 200 (penghalaan hujung ke hujung melalui 9Router)
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` memaparkan UI asli 9Router di dalam proksi (tiada iframe `127.0.0.1:port` secara langsung)
- [ ] `POST /api/services/9router/rotate-key` mengembalikan `{ keyRotated: true }` dan perkhidmatan dimulakan semula dengan lancar
- [ ] `POST /api/services/9router/stop` mengembalikan 200 dan `state: "stopped"`
- [ ] `GET /api/services/9router/logs?tail=50` mengembalikan strim SSE dengan peristiwa `snapshot` yang mengandungi baris terkini
- [ ] Pemasangan dalam persekitaran tanpa `npm` dalam PATH mengembalikan 500 dengan mesej ralat yang mesra (bukan surih tindanan)

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install` mengembalikan 200 dalam masa kurang daripada 2 min
- [ ] `POST /api/services/cliproxy/start` mengembalikan 200 dan `state: "running"` dalam masa kurang daripada 30 s
- [ ] `GET /api/services/cliproxy/status` melaporkan `health: "healthy"`
- [ ] `POST /api/services/cliproxy/stop` mengembalikan 200 dan `state: "stopped"`
- [ ] `GET /api/services/cliproxy/logs?tail=50` mengembalikan strim SSE

### Regresi keselamatan

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` mengembalikan `403 LOCAL_ONLY`
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` mengembalikan `403 LOCAL_ONLY`
- [ ] Respons ralat daripada `/api/services/*` tidak mengandungi `err.stack` atau laluan fail mutlak

## Semakan v3.8.0+

Sebelum mengeluarkan sebarang keluaran v3.8.x, sahkan item tambahan berikut:

- [ ] `omniroute --tray` berjaya dibut pada macOS (systray2 dipasang ke dalam `~/.omniroute/runtime/`)
- [ ] `omniroute --tray` berjaya dibut pada Linux (memerlukan DISPLAY; ralat terkawal jika tidak ditetapkan)
- [ ] `omniroute --tray` berjaya dibut pada Windows (PowerShell NotifyIcon, tiada binari tambahan)
- [ ] `omniroute config tray enable` mencipta entri mula automatik; nyahdaya akan mengalih keluarnya
- [ ] `npm install -g omniroute@<this-version>` menjalankan pascapemasangan tanpa keluar secara fatal
- [ ] Laluan kemas kini mengekalkan kebergantungan pilihan: `omniroute update --apply` dan pengemas kini automatik
      menjalankan `npm install -g … --include=optional` supaya `optionalDependencies` (better-sqlite3,
      keytar, tls-client, dan tindanan SLM llmlingua: `@atjsh/llmlingua-2@2.0.5`,
      `js-tiktoken`) kekal selepas kemas kini. Peringkat SLM ultra `modelPath` turut memerlukan model
      tinybert, yang dimuat turun secara automatik ke `${DATA_DIR}/models/llmlingua` pada penggunaan pertama. Pascapemasangan
      (`scripts/build/colocateOptionals.mjs`) kemudian menempatkan bersama penutupan pilihan SLM ke dalam
      `dist/node_modules` supaya pekerja menyelesaikan SATU tika `@huggingface/transformers` ^4.2.0
      — surih kendiri hanya menghimpunkan transformers, bukan komponen pilihan yang diimport secara dinamik,
      maka tanpanya pekerja akan memuatkan llmlingua-2 menggunakan transformers akar
      dan peringkat SLM akan gagal secara senyap dalam mod terbuka.
- [ ] `omniroute status` berfungsi tanpa `.env` (laluan token CLI, gelung balik sahaja)
- [ ] `curl http://localhost:20128/api/shutdown` mengembalikan 401 (laluan yang sentiasa dilindungi)
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` mengembalikan 401 (pengawal gelung balik)
- [ ] Masa jalan SQLite diselesaikan kepada `bundled` pada pelaksanaan pertama (binari terhimpun sah untuk platform)
- [ ] Masa jalan SQLite kembali menggunakan `runtime` apabila `node_modules/better-sqlite3` dipadamkan
- [ ] Penapis MCP pintar memampatkan output sebenar `playwright-mcp browser_snapshot` (pengurangan ≥50%)
- [ ] Kesemua 10 fail `skills/omniroute*/SKILL.md` boleh diambil secara awam melalui URL GitHub mentah
- [ ] Bestari persediaan awal memaparkan langkah jelajah peringkat "Cara Ia Berfungsi" semasa persediaan baharu
- [ ] Widget liputan peringkat pada papan pemuka utama memaparkan bilangan yang dikonfigurasi/aktif

---

## Pengembalian Semula

Jika keluaran mempunyai isu kritikal:

1. `gh release edit vX.Y.Z --prerelease` (menandakan sebagai bukan yang terkini)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z` (hanya jika belum digunakan oleh pengguna)
3. Atau: pembaikan segera pada `release/vX.Y.0` → keluaran tampalan `vX.Y.(Z+1)`
4. Maklumkan dengan segera dalam GitHub Discussions dan Discord

## Peraturan Wajib

- Jangan sekali-kali melakukan commit terus ke `main`
- Jangan sekali-kali menggunakan `git push --force` ke cabang `main` atau `release/*`
- Jangan sekali-kali melangkau hook Husky (`--no-verify`)
- Jangan sekali-kali melakukan commit terhadap rahsia, kelayakan, atau fail `.env`
- Liputan mesti kekal ≥60/60/60/60 (pernyataan/baris/fungsi/cabang)
- Sentiasa sertakan atau kemas kini ujian apabila mengubah kod produksi dalam `src/`, `open-sse/`, `electron/`, atau `bin/`

## Semakan Penyegerakan Automatik

Jalankan pengawal penyegerakan dokumentasi secara setempat sebelum membuka PR:

```bash
npm run check:docs-sync
```

CI turut menjalankan semakan ini dalam `.github/workflows/ci.yml` (tugas lint).
