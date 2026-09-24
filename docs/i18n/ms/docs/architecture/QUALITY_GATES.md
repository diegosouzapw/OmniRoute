# Quality Gates Reference (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Dokumen ini ialah rujukan berwibawa untuk semua gerbang kualiti CI dalam OmniRoute.
Ia menerangkan setiap gerbang, perkara yang disahkan, tugas CI yang menjalankannya, sama ada ia menggunakan
garis dasar ratchet atau dasar lulus/gagal, dan sama ada ia menyekat binaan atau sekadar bersifat nasihat.

Untuk ringkasan pendek dan dasar senarai dibenarkan, lihat bahagian "Gerbang Kualiti & Ratchet"
dalam `AGENTS.md`. Untuk penilaian kritikal, pengelasan kematangan dan pelan replikasi
bebas alat bagi sistem yang sama, lihat
[Playbook Gerbang Kualiti](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## Inventori Gate (~90 skrip)

Skrip berada di bawah `scripts/check/` (gate dasar) dan `scripts/quality/` (enjin ratchet).
Sumber kebenaran CI ialah `.github/workflows/ci.yml`.

### Laluan pantas PR keluaran (`quality.yml`)

`.github/workflows/quality.yml` dijalankan pada PR yang menyasarkan `release/**`. Ia memastikan cabang
penyumbang terus bergerak dengan gate pantas yang ditapis mengikut laluan, serta satu isyarat binaan produksi nasihat untuk perubahan
kod:

| Tugas                                            | Skop                                                                                                                                                                                                                       | Menyekat                                                                                                  |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `Build (advisory)`                               | PR kod bukan draf dan cabang giliran Mergify; Node 24, `npm-ci-retry`, `check:node-runtime`, `npm run build` dengan `OMNIROUTE_USE_TURBOPACK=1`; tiada muat naik artifak kerana tiada tugas kualiti hiliran menggunakannya | **Nasihat** (`continue-on-error: true`; alih keluar selepas seminggu pelaksanaan PR keluaran yang stabil) |
| `Docs Gates (fast-path)`                         | PR dokumentasi/kod; rujukan dokumentasi API dan docs-all                                                                                                                                                                   | Ya                                                                                                        |
| `Fast Quality Gates`                             | PR kod; semakan statik, semakan jenis, semakan jenis papan pemuka, ujian unit yang terjejas                                                                                                                                | Ya                                                                                                        |
| `Forgotten sibling tests`                        | PR kod; modul yang diubah dijejak kepada pengguna statik dan ujian saudara calon; laluan barrel dan import dinamik dilaporkan sebagai diagnostik nasihat, dengan pengecualian senarai dibenarkan yang dirujuk              | **Nasihat**                                                                                               |
| `Vitest (fast-path)`                             | PR kod; suit vitest pantas                                                                                                                                                                                                 | Ya                                                                                                        |
| `Unit Tests fast-path`                           | PR kod; suit unit 4 serpihan                                                                                                                                                                                               | Ya                                                                                                        |
| `No new ESLint warnings`                         | PR kod; pengawal lint yang menyedari penindasan                                                                                                                                                                            | Ya untuk asal sendiri, nasihat untuk fork                                                                 |
| `Merge integrity (changelog + generated skills)` | PR bukan draf; log perubahan dan penyegerakan kemahiran yang dijana                                                                                                                                                        | Ya untuk asal sendiri, nasihat untuk fork                                                                 |

#### Laporan ujian saudara yang terlupa

`npm run check:forgotten-sibling-tests` menggunakan semula penyelesai import di sebalik peta impak ujian.
Bagi setiap modul produksi yang diubah, ia melaporkan rantaian
`modul/simbol yang diubah -> pengguna statik -> ujian saudara calon` secara deterministik apabila ujian calon
tiada dalam diff permintaan tarik. Ringkasan Markdown dan hasil JSON disimpan sebagai
artifak aliran kerja `forgotten-sibling-tests` untuk penentukuran sebelum sebarang pelaksanaan yang menyekat.

Eksport semula barrel dan import dinamik hanyalah diagnostik resolusi; ia tidak pernah menghasilkan
penemuan yang menyekat. Pengecualian yang telah disemak berada dalam
`config/quality/forgotten-sibling-allowlist.json`. Setiap entri mesti menyatakan pengguna dan ujian
calon, memberikan rasional khusus, serta memautkan isu atau permintaan tarik GitHub. Entri yang tidak
sah akan gagal secara tertutup. Pengecualian tidak boleh menyekat ujian calon yang dipadamkan atau diff yang menambah `.skip`/`.todo`;
pelemahan penegasan dan penyamaran lain kekal di bawah tanggungjawab gate
`check:test-masking` yang menyekat secara bebas.

### Tugas: `lint`

Dijalankan pada setiap PR ke `main`. Menyekat penggabungan jika gagal.

| Skrip (`npm run ...`)             | Mengesahkan                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Menyekat                                |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `check:node-runtime`              | Versi Node.js berada dalam julat yang disokong                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ya                                      |
| `check:cycles`                    | Import kitaran — semua modul `src/` + `open-sse/`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ya                                      |
| `check:route-validation:t06`      | Skema Zod tersedia pada semua laluan (dasar Tahap 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ya                                      |
| `check:any-budget:t11`            | Bilangan `@ts-expect-error // any` tidak melebihi had (catraca Tahap 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ya                                      |
| `check:provider-consistency`      | Setiap penyedia dalam `providers.ts` mempunyai entri yang sepadan dalam `providerRegistry.ts` (dan begitu juga sebaliknya, dalam senarai dibenarkan)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ya                                      |
| `check:model-lifecycle`           | Tiga jadual penghalaan yang diselenggara secara manual kekal konsisten dengan petikan kitar hayat yang disimpan dalam repositori (#11503): `FITNESS_TABLE` (`taskFitness.ts`) tidak memberikan skor kepada mana-mana id yang telah ditamatkan tetapi masih boleh dihalakan oleh `REGISTRY`; setiap sasaran `BUILT_IN_ALIASES` terdapat dalam `REGISTRY` dan tiada dalam petikan id yang telah ditamatkan; setiap id yang telah ditamatkan tetapi masih berada dalam `REGISTRY` dimajukan atau disenaraikan dalam `allowedRetiredInCatalog`; dan tiada sumber atau sasaran `DEFAULT_DEGRADATION_MAP` ditandai sebagai telah ditamatkan dalam petikan tersebut. Ini tidak membuktikan bahawa sesuatu model sedang disediakan oleh perkhidmatan huluan yang aktif. Luar talian — dibandingkan dengan `config/quality/model-lifecycle.json`, yang dimuat semula secara manual menggunakan `npm run quality:refresh-model-lifecycle` (rangkaian; tidak disepadukan ke dalam CI). `allowedRetiredInCatalog` ialah mekanisme pengunci kemajuan pengurangan: tambahkan entri hanya bersama isu penjejakan. | Ya                                      |
| `check:fetch-targets`             | Setiap `fetch("/api/...")` dalam `src/` sisi klien merujuk kepada `route.ts` yang sebenar                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ya                                      |
| `check:deps`                      | Semua kebergantungan yang boleh dipasang dengan `npm install` merentas setiap `package.json` dalam repositori terdapat dalam `dependency-allowlist.json`; pakej baharu yang tidak dipinkan atau berpotensi menjadi sasaran slopsquatting ditandai                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ya                                      |
| `audit:deps`                      | `npm audit` (akar + electron) — tiada nasihat keselamatan berkeparahan tinggi/kritikal (bertindih dengan `check:vuln-ratchet` osv; lihat Backlog Rasionalisasi)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ya                                      |
| `check:lockfile`                  | Integriti `package-lock.json` — pendaftaran https, cincangan integriti, tiada penggantian hos                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ya                                      |
| `check:licenses`                  | Senarai dibenarkan lesen SPDX untuk kebergantungan pengeluaran                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Ya                                      |
| `check:tracked-artifacts`         | Tiada artifak binaan / pautan simbolik `node_modules` yang dikomitkan (turut dijalankan dalam pra-komit husky; pra-tolak sengaja diringankan — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ya                                      |
| `check:ai-attribution`            | Tiada treler `Co-Authored-By` AI/bot atau pengaki penjanaan AI dalam komit, tajuk atau isi PR — Peraturan Tegas #16 (dalam gelung pagar pantas `quality.yml` untuk PR→`release/**` — membaca muatan peristiwa, tidak melakukan apa-apa di luar PR — dan langkah khusus PR dalam lint `ci.yml` untuk PR→`main`; turut digunakan oleh cangkuk `commit-msg` husky; pengarang bersama manusia dibenarkan; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `check:vitest-exclusions`         | Setiap pengecualian Vitest menyatakan isu penjejakan dan terdapat dalam `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ya                                      |
| `check:file-size`                 | Tiada fail sumber melebihi had bagi setiap sambungan (ratchet: fail besar yang dibekukan dalam senarai `frozen`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ya                                      |
| `check:error-helper`              | Respons ralat dalam pelaksana/pengendali menggunakan `buildErrorBody()` / `sanitizeErrorMessage()` (Peraturan Tegas #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ya                                      |
| `check:migration-numbering`       | Fail SQL migrasi dinomborkan secara berurutan, tanpa jurang atau pendua                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ya                                      |
| `check:public-creds`              | Tiada `client_id`/`client_secret` OAuth literal atau kunci Web Firebase di luar `publicCreds.ts` (Peraturan Tegas #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ya                                      |
| `check:db-rules`                  | Tiada SQL mentah di luar modul `src/lib/db/`; tiada import barrel daripada `localDb.ts` (Peraturan Tegas #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ya                                      |
| `check:known-symbols`             | Pelaksana penyedia, strategi penghalaan dan penterjemah yang didaftarkan dalam jadual penghantaran mereka sepadan dengan fail pada cakera — tiada simbol yatim atau tidak diisytiharkan                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ya                                      |
| `check:route-guard-membership`    | Setiap laluan yang memulakan proses anak diklasifikasikan oleh `isLocalOnlyPath()` (Peraturan Tegas #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ya                                      |
| `check:test-discovery`            | Setiap fail `*.test.ts` / `*.spec.ts` dalam repo dikumpulkan oleh sekurang-kurangnya satu pelaksana ujian (ratchet: senarai yatim dalam `test-discovery-baseline.json` hanya boleh mengecil)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ya                                      |
| `check:agent-skills-sync`         | Artifak agent-skills yang dijana sepadan dengan katalog sumbernya (tiada penyimpangan)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `check:provider-asset-provenance` | Logo/aset penyedia mempunyai entri asal-usul yang direkodkan                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `lint:json`                       | Fail konfigurasi JSON berjaya dihuraikan dan mematuhi peraturan lint repositori                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `typecheck:core`                  | Kompilasi TypeScript tanpa ralat (amaran nasihat sahaja)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ya                                      |
| `typecheck:noimplicit:core`       | `noImplicitAny` yang ketat — untuk kegunaan masa hadapan; banyak tapak panggilan sedia ada masih memerlukan anotasi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | **Nasihat** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` yang diskopkan kepada `src/app/(dashboard)/**` (#7033) — senarai dibenarkan 27 fail yang dipilih bagi `typecheck:core` tidak merangkumi mana-mana TSX papan pemuka, dan `next build` juga tidak pernah menyemak jenisnya (`next.config.mjs` menetapkan `ignoreBuildErrors: true`), maka regresi pengecam yatim di situ (#6625/#6909) tidak dapat dikesan oleh CI. Perbezaan dibandingkan dengan garis dasar kiraan beku bagi setiap fail/setiap kod TS (`config/quality/dashboard-typecheck-baseline.json`, corak penguatkuasaan lapuk yang sama seperti `check:known-symbols`) — hanya ralat BAHARU yang melebihi kiraan garis dasar akan menggagalkan gerbang; turunkan secara beransur-ansur dengan `--update` apabila ralat sedia ada dibetulkan.                                                                                                                                                                                                                                                                                                                                        | Ya                                      |

### Tugas: `quality-gate`

Dijalankan selepas `test-coverage`. Menyekat penggabungan jika gagal.

| Skrip                        | Mengesahkan                                                                                                                                                                                        | Menyekat                          |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| `quality:collect`            | Menghasilkan `quality-metrics.json` (bilangan amaran ESLint, liputan daripada laporan serpihan yang digabungkan)                                                                                   | Ya (mendahului mekanisme ratchet) |
| `quality:ratchet`            | Setiap metrik dalam `quality-baseline.json` tidak merosot (amaran ESLint ≤ garis dasar; liputan ≥ garis dasar)                                                                                     | Ya                                |
| `check:duplication`          | Penduaan kod (jscpd@4) tidak melebihi garis dasar dalam `quality-baseline.json`                                                                                                                    | Ya                                |
| `check:complexity`           | Kerumitan siklomatik peringkat fail tidak melebihi had (peraturan teras ESLint `complexity` + `max-lines-per-function`)                                                                            | Ya                                |
| `check:cognitive-complexity` | Mekanisme ratchet kerumitan kognitif (`eslint-plugin-sonarjs`) — laluan ESLint berasingan; CI menjalankan kedua-duanya secara tergabung sebagai satu langkah `check:complexity-ratchets`           | Ya                                |
| `check:dead-code`            | Mekanisme ratchet eksport / fail yang tidak digunakan (knip) tidak merosot berbanding garis dasar                                                                                                  | Ya                                |
| `check:compression-budget`   | Bajet penanda aras pemampatan — paras minimum penjimatan token bagi setiap enjin tidak boleh merosot                                                                                               | Ya                                |
| `check:type-coverage`        | Mekanisme ratchet peratusan jenis (`type-coverage`) tidak merosot; sebahagian besarnya merangkumi `typecheck:noimplicit:core`                                                                      | Ya                                |
| `check:codeql-ratchet`       | Bilangan amaran CodeQL terbuka tidak merosot (dibaca melalui `gh api`; dilangkau dengan selamat tanpa token) — kekerapan penyegaran dan pencetus manual: lihat "Mekanisme ratchet CodeQL" di bawah | Ya                                |

### Tugas: `quality-extended`

Keseluruhan tugas bersifat nasihat (`continue-on-error: true`). Mekanisme ratchet berasaskan npm benar-benar
dijalankan; pengimbas luaran dipasang melalui `gh release download` dan melangkau sendiri (exit 0)
apabila binari masih tiada.

| Skrip                    | Mengesahkan                                                                                                                                                                                                  | Menyekat    |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| `check:circular-deps`    | Tiada kebergantungan kitaran (dpdm)                                                                                                                                                                          | **Nasihat** |
| `check:bundle-size`      | Saiz berkas tidak melebihi had                                                                                                                                                                               | **Nasihat** |
| `check:secrets`          | Pengimbasan rahsia (gitleaks) — dilangkau jika binari tiada                                                                                                                                                  | **Nasihat** |
| `check:vuln-ratchet`     | Kerentanan kebergantungan (osv-scanner) tidak merosot — dilangkau jika binari tiada                                                                                                                          | **Nasihat** |
| `check:workflows`        | Lint aliran kerja (actionlint + zizmor) — dilangkau jika binari tiada                                                                                                                                        | **Nasihat** |
| `check:openapi-breaking` | Perubahan yang memecahkan kontrak API awam (`openapi.yaml`) berbanding cabang asas (oasdiff) — menghasilkan `openapiBreaking=N`; dilangkau jika oasdiff tiada atau spesifikasi asas tidak dapat diselesaikan | **Nasihat** |

### Tugas: `docs-sync-strict`

Dijalankan pada setiap PR ke `main`. Menyekat penggabungan jika gagal.

| Skrip                          | Mengesahkan                                                                                                                                                                                                | Menyekat                         |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- |
| `check:docs-all`               | Gerbang meta yang menjalankan 6 subgerbang di bawah secara berurutan                                                                                                                                       | Ya                               |
| ↳ `check:docs-sync`            | Ketekalan versi CHANGELOG / OpenAPI / llm.txt                                                                                                                                                              | Ya                               |
| ↳ `check:docs-counts`          | Bilangan dalam prosa (bilangan penyedia, bilangan migrasi, dll.) berada dalam tetingkap ratchet bagi bilangan sebenar                                                                                      | Ya                               |
| ↳ `check:env-doc-sync`         | Setiap pemboleh ubah persekitaran dalam `.env.example` didokumentasikan dalam jadual dokumentasi, dan begitu juga sebaliknya                                                                               | Ya                               |
| ↳ `check:deprecated-versions`  | Tiada rentetan versi lapuk dalam dokumentasi                                                                                                                                                               | Ya                               |
| ↳ `check:doc-links`            | Pautan markdown dalaman dalam dokumentasi merujuk kepada fail sebenar (bentuk `[teks]`/`(laluan)`)                                                                                                         | Ya                               |
| ↳ `check:fabricated-docs`      | Laluan, pemboleh ubah persekitaran, perintah CLI, nama hook dan laluan fail yang dirujuk dalam dokumentasi wujud dalam pangkalan kod. Gerbang keras melalui `--strict`; gagal secara lembut tanpa bendera. | Ya (melalui `--strict` dalam CI) |
| `check:cli-i18n`               | Rentetan perintah CLI terdapat dalam semua fail lokal i18n                                                                                                                                                 | Ya                               |
| `check:openapi-coverage`       | Spesifikasi OpenAPI merangkumi sekurang-kurangnya had minimum laluan sebenar yang ditetapkan secara ratchet                                                                                                | Ya                               |
| `check:openapi-security-tiers` | Anotasi tahap keselamatan dalam `openapi.yaml` selaras dengan pengelasan `routeGuard.ts`                                                                                                                   | **Nasihat**                      |
| `check:openapi-routes`         | Setiap laluan dalam `openapi.yaml` merujuk kepada `route.ts` sebenar (antihalusinasi)                                                                                                                      | Ya                               |
| `check:docs-symbols`           | Setiap rujukan `/api/...` dalam `docs/**/*.md` merujuk kepada `route.ts` sebenar (antihalusinasi)                                                                                                          | Ya                               |
| `i18n translation drift`       | Kekunci yang belum diterjemahkan dalam fail lokal i18n — amaran sahaja                                                                                                                                     | **Nasihat**                      |

### Tugas: `i18n-ui-coverage`

| Skrip                              | Mengesahkan                                                                                                                                                                                                              | Menyekat    |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| `check-ui-keys-coverage` (sebaris) | Liputan kekunci i18n UI ialah ≥ 65%                                                                                                                                                                                      | Ya          |
| `check-ui-value-drift` (sebaris)   | **Nilai** bahasa Inggeris yang ditulis semula tidak meninggalkan sebarang terjemahan lapuk                                                                                                                               | Ya          |
| `check-new-key-coverage` (sebaris) | Kekunci bahasa Inggeris yang **baharu** diterjemahkan dalam setiap lokal — penanda `__MISSING__:` ditolak                                                                                                                | Ya          |
| `check-translation-ratio`          | Nisbah terjemahan sebenar bagi setiap lokal (sama dengan bahasa Inggeris / ruang letak / entri yang tiada di luar senarai dibenarkan) tidak boleh melebihi `config/quality/i18n-translation-baseline.json` + kelonggaran | **Nasihat** |

Memerlukan `fetch-depth: 0` — gerbang hanyutan nilai membandingkan perbezaan `en.json` dengan asas gabungan.

#### `check-ui-value-drift` — gerbang terjemahan lapuk

Mengesan satu regresi i18n yang secara struktur tidak dapat dilihat oleh gerbang lain: nilai bahasa Inggeris
ditulis semula dan terjemahan yang diterbitkan daripada bahasa Inggeris _sebelumnya_ kekal, sehingga
pengguna bukan berbahasa Inggeris terus membaca teks yang disampaikan dengan yakin tetapi kini salah.

Ini benar-benar telah dikeluarkan. `oauthModal.googleOAuthWarning` ditulis semula apabila pembantu log masuk
Antigravity diperkenalkan (#5203); **39 daripada 43 lokal** mengekalkan teks yang mengarahkan pengendali untuk
"menyalin URL penuh dan menampalnya di bawah" — aliran yang tidak dapat dilengkapkan untuk penyedia tersebut.
Perkara ini tidak disedari sehingga #8463 kerana:

- `sync-ui-keys` hanya mengisi semula kekunci yang **tiada**, bukan kekunci yang **lapuk**;
- `check-ui-keys-coverage` mengira _kewujudan_ kekunci, jadi terjemahan lapuk dikira sebagai diliputi;
- `check-translation-drift` menjejaki cerminan dokumentasi `docs/i18n/<locale>/**.md` —
  ia tidak pernah membaca `src/i18n/messages/*.json`. Menyekat dalam tugas `docs-sync-strict` sejak
  penyegerakan semula 2026-09: sunting dokumen teras → `npm run i18n:run -- --files=<doc>` (peringkat bahagian, ringan).

**Peka perbezaan, bukan disokong garis dasar.** Ia membandingkan `en.json` pada pangkal cantuman dengan
pepohon kerja; bagi setiap kekunci yang nilai bahasa Inggerisnya berubah, mana-mana lokaliti yang masih mempunyai
terjemahan yang tidak disentuh dianggap lapuk. Ini sengaja **membekukan hutang sedia ada** — perbezaan
tidak dapat mendedahkan versi bahasa Inggeris lama yang menjadi sumber sesuatu terjemahan lama, jadi get
hanya menilai perkara yang disentuh oleh perubahan semasa. Alternatifnya (garis dasar cincangan bagi setiap kekunci) akan memerlukan
fail terjana bersaiz ~600 KB, 3× lebih besar daripada garis dasar sedia ada yang terbesar, dan berubah-ubah pada setiap PR i18n.

Dua cara untuk mematuhinya:

1. kemas kini terjemahan yang terjejas, atau
2. tetapkan terjemahan tersebut kepada `__MISSING__:<bahasa inggeris baharu>` — masa jalan kemudiannya menyajikan versi bahasa Inggeris yang dibetulkan
   (`src/i18n/request.ts::deepMergeFallback`, #7258) dan kekunci tersebut dimasukkan ke dalam baris gilir untuk diterjemahkan.

Jika **makna** rentetan tersebut berubah, sebaik-baiknya **namakan semula kekunci**: kekunci baharu tidak boleh mewarisi
terjemahan yang lapuk. Itulah corak yang digunakan oleh #8463.

```bash
npm run i18n:check-value-drift          # ketat (yang dijalankan oleh CI)
npm run i18n:check-value-drift:warn     # laporan sahaja
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Keluar dengan kod 0 bersama `SKIP reason=base-unresolved` apabila katalog asas tidak dapat dibaca (klon cetek
tanpa rujukan asas), selaras dengan `check-openapi-breaking`.

### Tugas: `i18n`

Matriks pengesahan i18n penuh (satu tugas bagi setiap lokaliti). Keseluruhan tugas bersifat nasihat.

| Skrip                           | Mengesahkan                            | Menyekat                                                       |
| ------------------------------- | -------------------------------------- | -------------------------------------------------------------- |
| `validate_translation.py quick` | Kelengkapan terjemahan setiap lokaliti | **Nasihat** (`continue-on-error: true` pada keseluruhan tugas) |

### Tugas: `pr-test-policy`

Dijalankan pada permintaan tarik sahaja.

| Skrip                  | Mengesahkan                                                                                                                                                          | Menyekat |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| `check:pr-test-policy` | PR yang mengubah kod pengeluaran dalam `src/`, `open-sse/`, `electron/`, atau `bin/` mesti menyertakan atau mengemas kini ujian (Peraturan Keras #8)                 | Ya       |
| `check:test-masking`   | Fail ujian yang diubah tidak mengurangkan bilangan bersih asersi atau menambahkan tautologi `assert.ok(true)`                                                        | Ya       |
| `check:pr-evidence`    | Kandungan PR memetik bukti ujian/VPS bagi perubahan tersebut (mengautomatikkan Peraturan Keras #18 dengan mengimbas teks PR menggunakan grep — rapuh, lihat Backlog) | Ya       |

### Tugas: `test-vitest`

Dijalankan selepas `build`. Menyekat cantuman jika gagal.

| Suit             | Mengesahkan                                                 | Menyekat                                                                                                                        |
| ---------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | Pelayan MCP (110 alat), autoCombo, cache — pelaksana vitest | Ya                                                                                                                              |
| `test:vitest:ui` | Ujian komponen UI — pelaksana vitest                        | **Menyekat** — kegagalan sedia ada dikecualikan secara jelas dalam `vitest.config.ts`; kegagalan baharu menyebabkan tugas gagal |

### Aliran kerja setiap malam (berjadual, bersifat nasihat)

Ini dijalankan mengikut jadual cron (dan `workflow_dispatch`), tidak sekali-kali pada PR. Semuanya bersifat nasihat.

| Aliran kerja           | Mengesahkan                                                                                                                                                                                       | Menyekat    |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `nightly-property`     | Ujian sifat fast-check dengan benih rawak + bilangan pelaksanaan yang tinggi                                                                                                                      | **Nasihat** |
| `nightly-resilience`   | Get pertumbuhan heap, suntikan kerosakan chaos, beban/rendaman k6                                                                                                                                 | **Nasihat** |
| `nightly-llm-security` | Pengawal suntikan promptfoo (mod sekat) + prob garak (dilangkau tanpa rahsia penyedia)                                                                                                            | **Nasihat** |
| `nightly-schemathesis` | Pengujian kabur kontrak OpenAPI (schemathesis) terhadap OmniRoute langsung menggunakan `docs/openapi.yaml` — menampilkan pelanggaran spesifikasi / ralat 500 yang tidak dikendalikan (Fasa 8 B.4) | **Nasihat** |
| `nightly-mutation`     | Skor pengujian mutasi Stryker pada laluan unit pantas — mutan yang terselamat mendedahkan asersi yang lemah                                                                                       | **Nasihat** |
| `nightly-compat`       | Matriks keserasian enjin Node merentasi julat `engines.node` yang disokong                                                                                                                        | **Nasihat** |

---

## Fasa kelajuan (2026-08-30 → v4.0 LTS): setiap garis dasar dilonggarkan sebanyak 20%

Keputusan pemilik (2026-08-30): sehingga pemodularan v4.0, kelajuan penghantaran lebih penting
daripada mengekalkan had hutang. Setiap garis dasar ratchet **berangka** telah dilonggarkan sebanyak 20% dalam satu
proses yang boleh diaudit, dan fasa tersebut diisytiharkan dalam `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Perkara yang berubah                                                                                                                                                                                                                      | Lokasi                                                                                                 |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — kiraan yang lebih rendah lebih baik ×1.2, peratusan yang lebih tinggi lebih baik ÷1.2 (had minimum liputan 60 dikekalkan, `eslintErrors` kekal 0, `eslintWarnings` 0 → 20% daripada kiraan penindasan yang dibekukan) | `quality-baseline.json` (nota `_relax_velocity_2026_08_30` menyenaraikan setiap sebelum → selepas)     |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                                          | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, setiap had baris `frozen[*]` / `testFrozen[*]` ×1.2                                                                                                                                                                     | `file-size-baseline.json`                                                                              |
| kiraan setiap fail / setiap kod TS ×1.2                                                                                                                                                                                                   | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                                       | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` menjadi nasihat apabila `_policy.requireTighten === false`                                                                                                                                                            | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| `bank-ratchet-shrinks` setiap malam dijeda (ia akan menyimpan pengurangan yang diukur dan membatalkan ruang lebihan)                                                                                                                      | `.github/workflows/nightly-release-green.yml`                                                          |

Senarai dibenarkan (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **bukan** belanjawan dan tidak diubah. Gerbang dasar lulus/gagal (rahsia, peraturan SQL,
kontrak dokumen/persekitaran, kesetaraan i18n, ujian unit) tidak berubah — ujian merah masih merupakan ujian merah.

**Peralatan**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — pelonggaran
  sekali sahaja (`scripts/quality/relax-baselines.mjs`); enggan dijalankan dua kali dengan
  nota yang sama.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  mengukur setiap gerbang berangka sebagaimana dilakukan oleh CI dan memaparkan baki ruang lebihan bagi setiap gerbang
  (`scripts/quality/baseline-headroom.mjs`). Tugas `baseline-headroom` setiap malam menyiarkan
  jadual tersebut ke isu aktif **📈 Ruang lebihan garis dasar (fasa kelajuan)** dan menambahkan
  label `headroom-alert` apabila mana-mana gerbang berada dalam lingkungan 10% daripada hadnya atau sudah
  melebihinya. Isu tersebut ialah amaran awal: belanjawan yang penuh dalam beberapa hari bermakna pelonggaran itu sedang digunakan oleh
  beberapa PR, bukan oleh seluruh pasukan — lihat nota `_rebaseline_*` bagi gerbang yang berkenaan.

**Mod kod baharu (Clean-as-You-Code) — sejak 2026-08-30, laluan pantas PR sahaja**

Pada peristiwa `pull_request`, `quality.yml` menghantar `--base-ref <PR base SHA>` kepada `check:file-size`,
`check:complexity-ratchets` dan `check:dead-code`. Dalam mod tersebut, gerbang membandingkan HEAD dengan
merge-base **yang dihadkan kepada fail yang disentuh oleh PR** (`scripts/check/newCodeMode.mjs`:
merge-base diwujudkan dalam `git worktree` sementara, ESLint/knip dijalankan di sana dan pada HEAD, kemudian
kiraan setiap fail dibandingkan melalui perbezaan):

- **menyekat** — PR menambahkan pelanggaran siklomatik/kognitif atau eksport mati dalam fail yang diubahnya
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` dalam log);
- **nasihat** — jumlah global berbanding garis dasar yang dibekukan. Hanyutan yang diwarisi tidak sekali-kali menyebabkan
  PR yang tidak bersalah gagal; hanyutan tersebut dibekukan semula semasa penyelarasan keluaran dan dipantau oleh tugas ruang lebihan.

Jalankan `workflow_dispatch`, semakan menyeluruh release-green dan tugas ruang lebihan setiap malam tidak mempunyai asas PR
dan mengekalkan perbandingan mutlak (global). Liputan, penduaan dan liputan jenis kekal global
buat masa ini (alatnya tidak menghasilkan perbezaan setiap fail dengan kos yang rendah) — calon untuk menerima pendekatan yang sama.

**Menutup fasa pada v4.0 (LTS = lebih ketat berbanding sebelumnya, bukan "kembali seperti biasa")**

1. Pada hujung tulen `release/v4.0.0`: jalankan `npm run quality:headroom --json` untuk rekod, kemudian
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, dan
   `--update` bagi setiap gerbang semakan jenis — setiap garis dasar turun kepada nilai yang diukur.
2. Padamkan `_policy` daripada `quality-baseline.json` (mengaktifkan semula `--require-tighten` dan
   penyimpanan setiap malam), pulihkan `THRESHOLD = 36` (atau lebih tinggi) dalam `check-openapi-coverage.mjs`.
3. Ketatkan melebihi nilai yang diukur di bahagian yang mendapat manfaat daripada pemodularan: kembalikan `cap`
   saiz fail kepada 1000 (atau 800), naikkan had minimum liputan sebanyak 5, dan tetapkan eksport mati kepada 0 bagi pakej yang dimodularkan.

## Garis Dasar Ratchet (`quality-baseline.json`)

Enjin ratchet (`scripts/quality/check-quality-ratchet.mjs`) membaca `quality-baseline.json`
dan membandingkannya dengan `quality-metrics.json` yang baru dikumpulkan. Sebarang metrik yang merosot
melebihi epsilonnya akan menyebabkan binaan gagal.

Metrik yang dijejak pada masa ini:

| Metrik                | Arah   | Maksud                                       |
| --------------------- | ------ | -------------------------------------------- |
| `eslintWarnings`      | `down` | Bilangan amaran ESLint tidak boleh meningkat |
| `coverage.statements` | `up`   | Liputan pernyataan tidak boleh menurun       |
| `coverage.lines`      | `up`   | Liputan baris tidak boleh menurun            |
| `coverage.functions`  | `up`   | Liputan fungsi tidak boleh menurun           |
| `coverage.branches`   | `up`   | Liputan cabang tidak boleh menurun           |

Untuk mengemas kini garis dasar selepas peningkatan sebenar:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

Bendera `--update` menulis nilai semasa yang diukur ke dalam `quality-baseline.json`.
Komit fail ini bersama-sama perubahan yang meningkatkan metrik tersebut. PR yang meningkatkan
metrik tanpa mengemas kini garis dasar akan dikesan oleh `--require-tighten` (Fasa 6A.5,
menunggu pelaksanaan).

### Ratchet CodeQL: kekerapan penyegaran dan pencetus manual

`check:codeql-ratchet` membaca **keadaan repositori, yang disegarkan mengikut jadual — bukan bagi setiap PR.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` melaporkan
`state: configured`, `schedule: weekly`: imbasan persediaan lalai GitHub, bukan analisis bagi setiap push.
Akibatnya: selepas PR yang MEMBAIKI amaran digabungkan, ratchet terus membaca
bilangan lama yang lebih tinggi sehingga imbasan berjadual seterusnya dijalankan — maka ia melaporkan regresi
pada setiap PR terbuka, termasuk PR susulan kepada PR pembaikan itu sendiri, sehingga imbasan tersebut dikemas kini.

**Penyegaran manual**: `gh workflow run codeql.yml --ref release/vX.Y.Z` menjalankan semula
analisis dan menerbitkan semula amaran dalam beberapa minit. Baca `.github/workflows/codeql.yml`
terlebih dahulu — pengepalanya menjelaskan bahawa ia hanya menggunakan `workflow_dispatch` **kerana ia bercanggah dengan
"persediaan lalai" GitHub** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). Mengembalikan pencetus `push`/`pull_request`/
`schedule` memerlukan **tindakan pemilik terlebih dahulu**: Settings → Code security →
CodeQL: Default → Advanced. Jangan tambah pencetus `schedule:` tanpa pertukaran itu — ia
hanya akan menghasilkan pelaksanaan yang gagal.

**Ketatkan garis dasar selepas bilangannya menurun** — `node scripts/check/check-codeql-ratchet.mjs
--update` menulis bilangan baharu yang diukur ke dalam `quality-baseline.json` →
`metrics.codeqlAlerts.value`, supaya ratchet tidak secara senyap membenarkan regresi kembali
kepada had lama. Contoh pelaksanaan (2026-09-02/03): PR #12502 membaiki 7 amaran sebenar
(13 → 6 amaran terbuka yang diukur); PR #12530 mengetatkan garis dasar beku daripada 11 → 6 agar sepadan; baki
6 amaran kemudiannya ditolak dengan justifikasi bagi setiap amaran sehingga menjadi 0 amaran terbuka.

**Penolakan ialah keputusan pengendali (Peraturan Tegas #14)** — jangan sekali-kali menolak amaran CodeQL
tanpa merekodkan justifikasi teknikal dalam ulasan penolakan: `won't fix` untuk
keperluan protokol huluan, `used in tests` untuk lekapan ujian, `false positive`
untuk pensanitasi yang tidak dapat dikesan oleh CodeQL (dahuluan: `docs/security/ERROR_SANITIZATION.md`).

---

## Dasar Percubaan Semula Ujian (WS5.4, v3.8.49)

Percubaan semula ditetapkan bagi setiap runner, bukan secara menyeluruh — percubaan semula menyeluruh menukar regresi sebenar
menjadi kegagalan tidak konsisten yang tidak kelihatan:

| Runner           | Dasar                                                                                                                                                             | Sebab                                                                                                                                                           |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | `retries: 1` dalam CI sahaja, dengan `trace: on-first-retry`                                                                                                      | Pemasaan pelayar/rangkaian sememangnya tidak tentu; satu percubaan semula dengan surih menukar kegagalan tidak konsisten menjadi artifak yang boleh didiagnosis |
| Vitest           | TIADA percubaan semula global. Ujian yang terbukti tidak konsisten mendapat percubaan semula eksplisit bagi setiap ujian (kelihatan dalam diff, disemak dalam PR) | Mengekalkan senarai kuarantin dalam repo, tidak sesekali kabur                                                                                                  |
| node:test (unit) | TIADA percubaan semula, sama sekali                                                                                                                               | Ujian unit yang tidak konsisten ialah pepijat dalam ujian — baikinya, jangan jalankannya semula secara rawak                                                    |

SLO sasaran selepas telemetri kegagalan tidak konsisten tersedia (WS5.2/5.3): kadar kegagalan tidak konsisten <1% bagi setiap ujian
(ambang "baiki sekarang"), kadar lulus ≥95% bagi setiap pipeline. Nilai rujukan industri —
tentukur semula berdasarkan ukuran kita sendiri.

## Hanyutan Ratchet Peringkat Keluaran (WS5.5, v3.8.49)

Apabila ratchet (saiz fail, kerumitan, amaran eslint) mengalami regresi pada hujung keluaran TULEN
— iaitu GABUNGAN merge menyebabkannya merosot, dan tiada satu pun PR yang menghasilkan semula
regresi itu pada cabangnya sendiri — pembaikan tersebut menjadi tanggungjawab **kapten keluaran, sekali sahaja, pada
cabang keluaran**: utamakan pengekstrakan/pemfaktoran semula; tetapkan semula garis dasar hanya dengan entri
justifikasi yang didokumenkan. Jangan sesekali memindahkan hanyutan gabungan kepada PR penyumbang, dan jangan sesekali
menetapkan semula garis dasar bagi setiap PR (itu menyembunyikan regresi sebenar). Bezakan dahulu: hasilkan semula
status merah terhadap hujung tulen dalam worktree siasatan sebelum menganggap PR anda menyebabkannya.

## Menyimpan Pengecilan Ratchet — arah menurun (#8584)

Ratchet hanya separuh automatik, dan separuh itu ialah bahagian yang salah. **Menaikkan** had ialah
suntingan JSON manual yang mengambil masa sepuluh saat dan merupakan cara terpantas untuk membuka sekatan PR merah.
**Menurunkan** had memerlukan seseorang menjalankan `--update` dan melakukan commit pada hasilnya — dan sehingga
job `bank-ratchet-shrinks` tersedia, tiada workflow yang menjalankannya. Akibat yang diukur
(2026-07-25): 18 fail beku sudah berada pada atau di bawah had 800 baris bagi fail baharu, dengan yang terburuk
pada 132× (`src/shared/validation/schemas.ts`, 19 baris dengan had 2,523); siling
kerumitan bergerak `1794 → 2169` merentasi ~37 nota penetapan semula garis dasar dengan tepat satu
penurunan (−1); dan "ketatkan melalui `--update` dalam kitaran seterusnya" ditulis 31 kali dan dipatuhi
sekali. Had yang bertahan lebih lama daripada kod yang melayakkannya secara senyap menukar setiap
penguraian yang selesai menjadi kelonggaran pertumbuhan bagi sesiapa yang menyunting fail itu seterusnya.

`nightly-release-green.yml` → job **`bank-ratchet-shrinks`** melengkapkan kitaran tersebut:

|               |                                                                                                                                 |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Berjalan pada | `schedule` (3×/hari) + `workflow_dispatch` — sengaja **bukan** `push`                                                           |
| Mengukur      | `release/vX.Y.Z` tertinggi, dengan resolusi + pelindung suntikan yang sama seperti `release-green`                              |
| Menulis       | `check:file-size --update` dan `check:complexity-ratchets --update` (kedua-duanya hanya boleh mengecil berdasarkan reka bentuk) |
| Mengesahkan   | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                                        |
| Menghantar    | satu PR yang sentiasa terkini terhadap cabang keluaran — dikemas kini secara paksa, tidak sesekali menghasilkan spam            |

Penyimpanan dilakukan secara kelompok dan bukannya bagi setiap push kerana ia tiada keperluan kependaman (pengecilan
yang disimpan dalam masa 8 jam boleh diterima), manakala pelaksanaan bagi setiap merge akan membina semula cabang PR berulang kali
semasa kempen merge dan menanggung kos imbasan penuh ESLint setiap kali. Pengesanan kekal dilakukan semasa
push (`release-green`); hanya penyimpanan dilakukan secara kelompok.

### Pengesah keselamatan

Job tersebut menulis pada garis dasar tanpa pengawasan, jadi `verify-ratchet-bank.mjs` memastikan
tindakan itu boleh diterima. Ia membandingkan perbezaan pepohon selepas `--update` dengan `HEAD` dan **menghentikan job
sebelum sebarang commit wujud** — tanpa membuka PR — melainkan setiap perubahan ialah salah satu daripada:

- entri angka `frozen` / `testFrozen` yang **diturunkan** atau **dialih keluar**
- `complexity-baseline.json` → `count` **diturunkan**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` **diturunkan**

Apa-apa selainnya akan gagal: menaikkan angka, menambahkan entri, mengubah `cap`/`testCap`, atau
memadam/menulis semula nota `_rebaseline_*` (nota tersebut ialah jejak audit yang menerangkan sebab setiap
siling wujud dan disimpan dalam objek `frozen` yang sama dengan entri fail).
Bot yang boleh menaikkan had akan menjadi jauh lebih buruk berbanding keadaan semasa. Pelindung
regresi: `tests/unit/verify-ratchet-bank.test.ts`.

Job tersebut tidak sesekali melakukan push ke `release/*` — manusia menggabungkan PR, jadi ukuran yang buruk
tidak boleh dimasukkan tanpa semakan.

## Dasar Senarai Benar

Setiap gerbang yang tidak boleh gagal disebabkan pelanggaran sedia ada menggunakan senarai benar yang dibekukan
(cth., `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Dasarnya ialah:

**Betulkan punca utama; gunakan senarai benar hanya apabila pelanggaran tersebut telah sedia ada dan
tidak dapat dibetulkan dalam PR yang sama.**

Apabila menambahkan entri pada senarai benar:

1. Sertakan komen dengan justifikasi.
2. Rujuk isu penjejakan (cth., `// #3498 — Ciri Fasa 2, belum dilaksanakan`).
3. Alih keluar entri dalam PR yang sama yang membetulkan pelanggaran tersebut — entri lapuk yang tidak lagi
   menyekat pelanggaran aktif merupakan kecacatan itu sendiri (penguatkuasaan entri lapuk 6A.3 akan
   menggagalkan gerbang bagi entri senarai benar yatim setelah dilaksanakan).

**Jangan** tambahkan entri senarai benar untuk mempercepatkan kelulusan ujian. Gerbang hijau dengan senarai
benar yang semakin bertambah memberikan gambaran palsu tentang kualiti.

### Apabila gerbang gagal pada PR anda

1. **Baca output gerbang dengan teliti** — output tersebut memberitahu anda dengan tepat fail atau simbol yang
   melanggar peraturan.
2. **Betulkan pelanggaran tersebut** — kebanyakan gerbang ialah semakan sistem fail deterministik yang lulus sebaik sahaja
   kod dibetulkan.
3. **Jika pelanggaran tersebut telah sedia ada** (iaitu, anda tidak memperkenalkannya tetapi gerbang kini
   merangkuminya): tambahkan entri senarai benar dengan komen justifikasi dan isu penjejakan.
4. **Jika gerbang tersebut ialah mekanisme sehala** (liputan, amaran ESLint, penduaan, kerumitan):
   perubahan anda telah memburukkan metrik. Betulkan isu asas, atau (jarang sekali) jalankan
   `npm run quality:ratchet -- --update` jika perubahan itu disengajakan dan kemerosotan metrik
   boleh diterima — tetapi dokumentasikan sebabnya dalam perihalan PR.
5. **Gerbang berbentuk nasihat** (`continue-on-error: true`) adalah untuk tujuan maklumat — gerbang tersebut tidak menyekat
   penggabungan tetapi muncul dalam ringkasan CI. Betulkannya juga.

---

## Menambahkan Gerbang Baharu

1. Cipta `scripts/check/check-<name>.mjs` (atau `.ts`). Gerbang dasar keluar dengan kod 0/1.
   Gerbang berasaskan mekanisme sehala mengeluarkan metrik kepada `quality-metrics.json` melalui `collect-metrics.mjs`.
2. Tambahkan `"check:<name>": "node scripts/check/check-<name>.mjs"` pada `package.json`.
3. Sambungkannya dalam `.github/workflows/ci.yml` di bawah tugas yang sesuai
   (dasar → `lint` atau `docs-sync-strict`; mekanisme sehala → `quality-gate`).
4. Jika gerbang itu mempunyai senarai benar, gunakan `reportStaleEntries()` daripada
   `scripts/check/lib/allowlist.mjs` supaya entri lapuk dikesan secara automatik.
5. Tulis ujian dalam `tests/unit/build/` yang merangkumi logik pengesanan gerbang tersebut.
6. Kemas kini dokumen ini (tambahkan baris pada jadual tugas yang berkaitan).

---

## Peralatan ejen: LSP-dalam-gelung (pilihan)

Selain gerbang CI, OmniRoute menyediakan perancah `agent-lsp` **pilihan**
(`.mcp.json` peringkat projek, Fasa 7 Tugasan 15). Cipta `.mcp.json`
untuk mendedahkan pelayan bahasa TypeScript kepada ejen pengekodan, supaya mereka menyelesaikan simbol /
diagnostik **sebelum** menulis kod — pendamping kompilasi-sebelum-mendakwa kepada
`typecheck:core` yang mengurangkan ralat "simbol rekaan" pada puncanya. Ia sengaja
tidak dimuatkan secara automatik (anda memilih dan mengesahkan jambatan MCP↔LSP); entri yang rosak hanya merekodkan
ralat sambungan dan tidak pernah merosakkan sesi.

---

## Tunggakan Rasionalisasi (semakan ROI — Fasa 9 Gelombang 3)

Inventori ini telah diselaraskan dengan `ci.yml` pada 2026-06-17 (versi terdahulu tidak menyertakan
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Semakan ROI bagi set yang telah diselaraskan
mengenal pasti calon rasionalisasi berikut. **Penggabungan ialah perubahan CI yang
mekanikal; penukaran/pengguguran ialah keputusan dasar yang dikhaskan untuk pengendali.** Tiada apa-apa di bawah
yang telah dilaksanakan lagi.

**Turut tidak didokumentasikan di atas** (bersifat nasihat, isyarat rendah): tugas `docs-lint`
(markdownlint + Vale, keseluruhan tugas menggunakan `continue-on-error`) dan aliran kerja pengimbas kendiri
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` terdapat dalam
`quality-baseline.json` tetapi tidak disambungkan kepada mekanisme sehala yang menyekat dalam `ci.yml` — metrik ini
kini terbiar.

### Gabung / nyahpendua (mekanikal, risiko lebih rendah)

Setiap calon telah disahkan berdasarkan keadaan gerbang semasa pada 2026-06-17 (percaya tetapi sahkan);
beberapa penggabungan yang kelihatan "jelas" sebenarnya menyembunyikan hutang dan **bukan** penggantian terus yang bersih.

- **`check:docs-sync` dijalankan dua kali** — secara kendiri dalam tugas `lint` dan sekali lagi dalam `check:docs-all` (`docs-sync-strict`) serta cangkuk pra-komit husky. ✅ **SELESAI** — pemanggilan kendiri dalam `lint` telah dialih keluar.
- **Pengimbasan CVE** — ❌ **BUKAN penggabungan yang bersih.** `audit:deps` gagal keras bagi mana-mana CVE tinggi/kritikal; `check:vuln-ratchet` (osv) hanya gagal apabila berlaku _regresi_ berbanding garis dasar (kini 1 MODERATE). Semantiknya berbeza — menggugurkan `audit:deps` akan menghilangkan gerbang mutlak bagi tahap tinggi/kritikal. Kekalkan kedua-duanya.
- **Pengesanan kitaran** — ❌ **BUKAN penggabungan yang bersih.** `check:circular-deps` (dpdm) melaporkan **91 kitaran** (itulah sebabnya ia bersifat nasihat); ia tidak boleh dinaik taraf menjadi menyekat tanpa menyelesaikan kitaran tersebut terlebih dahulu, dan skopnya lebih luas daripada `check:cycles` terpilih yang berstatus hijau. Kekalkan `check:cycles` sebagai menyekat; penyelesaian 91 kitaran dpdm merupakan tunggakan yang berasingan.
- **Kerumitan** — ✅ **SELESAI** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): satu lintasan ESLint, pengiraan mengikut ruleId supaya garis dasar siklomatik+max-lines dan kognitif kekal bebas; `check:complexity` / `check:cognitive-complexity` individu dikekalkan untuk `--update` setempat.
- **Antihalusinasi `/api`** — ✅ **SELESAI** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): satu inventori FS bagi `src/app/api`, openapi-routes + docs-symbols masih melaporkan secara berasingan; semakan individu dikekalkan untuk pelaksanaan setempat.
- **`check:node-runtime` dijalankan dalam 11 tugas** — ⚠️ **ROI rendah.** Setiap satunya menggunakan pelaksana berasingan dan semakan mengambil masa <1s; jumlah penjimatan ~10s, dengan risiko kehilangan kawalan murah bagi setiap tugas. Tidak berbaloi dengan perubahan tersebut.
- **`typecheck:noimplicit:core` dalam lint CI** — ✅ **dialih keluar daripada tugas lint** (sebelum ini bersifat nasihat dengan `continue-on-error`); permukaan jenis yang menyekat ialah `typecheck:core` + `check:type-coverage`. Skrip setempat dikekalkan.

### Tukar / putuskan (dasar pengendali)

- `check:openapi-security-tiers` (bersifat nasihat) — ❌ **TIDAK boleh ditukar dengan bersih.** Ia keluar dengan kod 0 tetapi memberi amaran bahawa beberapa laluan `traffic-inspector` di bawah `LOCAL_ONLY_API_PREFIXES` tidak mempunyai anotasi `x-loopback-only: true`. Penguatkuasaannya memerlukan anotasi tersebut ditambahkan terlebih dahulu pada `openapi.yaml`.
- `typecheck:noimplicit:core` (bersifat nasihat) — sebahagian besarnya telah dirangkumi oleh mekanisme sehala `check:type-coverage` yang menyekat. Tukar kepada mekanisme sehala atau gugurkan lintasan `tsc` kedua yang berlebihan.
- `test:vitest:ui` (kini **menyekat**) — kegagalan sedia ada dikecualikan secara jelas dalam `vitest.config.ts` dengan komen penjejakan `// #8618`; kegagalan baharu akan menggagalkan tugas.
- `check:secrets` (gitleaks, mekanisme sehala menyekat yang dibekukan pada 3 positif palsu yang didokumentasikan) — tambahkan 3 kes tersebut pada senarai izin untuk mencapai 0, atau turunkan taraf kepada bersifat nasihat. Bertindih dengan pengimbasan rahsia natif GitHub + `check:public-creds`.
- `check:pr-evidence` (menyekat, mencari teks kandungan PR menggunakan grep) — risiko positif palsu yang tinggi; menggugurkannya akan melemahkan penguatkuasaan Peraturan Tegas #18, jadi ini sememangnya keputusan dasar.
- `semgrep` (kendiri, bersifat nasihat) — bertindih dengan CodeQL untuk keluarga OWASP; sambungkan garis dasarnya kepada mekanisme sehala atau gugurkannya.

---

## Dokumentasi Berkaitan

- Rantaian bekalan (asal usul, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — gerbang kesepadanan set kunci

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, tugas `i18n-ui-coverage`).
Membandingkan set kunci daun bagi setiap `src/i18n/messages/<locale>.json` dengan `en.json` dan gagal
jika terdapat mana-mana daun yang tiada atau berlebihan, tanpa mengira bila kunci itu ditambahkan. Ruang letak `__MISSING__:`
dikira sebagai wujud (kandungannya ialah urusan gerbang nisbah). Ia merupakan pelengkap mutlak
kepada dua gerbang berasaskan perbezaan/peratusan: `check-ui-keys-coverage` menguatkuasakan paras minimum 80 % bagi setiap
lokaliti (43 kunci yang tiada daripada ~13,000 masih menunjukkan 99.7 %) dan `check-new-key-coverage` menilai
hanya kunci yang ditambahkan oleh PR kepada `en.json`. Satu kelompok lokaliti dijana daripada `en.json` pada hari
cabangnya diwujudkan dan diterjemahkan selama beberapa hari sementara asas terus menambahkan kunci; PR kelompok itu sendiri tidak
menambahkan sebarang kunci, maka kedua-dua gerbang setara kekal senyap apabila kelompok 1 (#13044) digabungkan dengan kekurangan 43 kunci dalam sembilan
lokaliti dan kelompok 2 (#13660) kekurangan 10 kunci dalam lapan lokaliti (2026-09-15). Betulkan kegagalan dengan
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; daun `extra`
bermakna sumber telah menggugurkannya — padamkannya daripada lokaliti tersebut. `--warn` melaporkan tanpa menggagalkan.
`--catalog=cli` menjalankan perbandingan yang sama pada `bin/cli/locales` (`npm run i18n:check-keys:cli`);
kedua-dua langkah berada dalam tugas `i18n-ui-coverage`.

#### `check-new-key-coverage` — gerbang i18n kunci baharu

Gerbang setara bagi `check-ui-value-drift`. Gerbang itu mengesan nilai bahasa Inggeris yang telah **ditulis semula**
sedangkan terjemahannya tidak dikemas kini; gerbang ini mengesan kunci bahasa Inggeris yang telah **ditambahkan**
sedangkan sesetengah lokaliti tidak pernah menerimanya.

`check-ui-keys-coverage` tidak dapat melihat kelas ini: ia menguatkuasakan paras minimum peratusan bagi setiap lokaliti, dan
sebelas kunci yang tiada daripada ~13,000 masih menghasilkan liputan 99.9%. Peratusan bagi setiap bahasa tidak dapat
menyatakan "ciri ini dilancarkan tanpa terjemahan" — keseluruhan ciri boleh dimasukkan ke dalam lokaliti baharu tanpa
teks dan tidak pernah mengubah angka tersebut.

Insiden yang dirakamkannya: Fasa 3 Orchestration Canvas menterjemahkan sebelas kuncinya merentas
42 lokaliti yang wujud pada masa itu. Beberapa jam kemudian, kelompok bahasa EU (#13044) meningkatkan bilangan lokaliti repositori
kepada 51, dan sembilan lokaliti baharu (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) tidak pernah
menerimanya. `deepMergeFallback` menggantikan kunci yang tiada dengan bahasa Inggeris, maka mod kegagalannya ialah
UI yang tidak diterjemahkan dan bukannya UI kosong — kegagalan sebenar yang sememangnya senyap mengikut reka bentuk.

Seperti gerbang setaranya, ia **peka terhadap perbezaan**, dengan membandingkan bahasa Inggeris pada asas cantuman dengan pepohon
kerja, maka jurang sedia ada kekal dibekukan dan gerbang ini tidak memerlukan migrasi untuk diaktifkan.

**Penanda `__MISSING__:<english>` tidak memenuhinya (sejak 2026-09-17).** Dahulu, penanda ini ialah
penangguhan yang didokumenkan — masa jalan berundur kepada bahasa Inggeris yang betul — sehinggalah lapan PR ciri pada
2026-09-16 menambahkan 61 kunci dan meletakkan penanda tersebut dalam kesemua 65 lokaliti dan bukannya menterjemahkannya: gerbang ini
menerima semuanya, tiada apa-apa yang menyekat PR tersebut, dan gerbang nisbah terjemahan sebenar yang menyekat
kemudiannya gagal pada hujung keluaran untuk semua orang (pt-BR 3.2 % > 2.5 % + 0.5). Penanda kini dinilai
sebagai terjemahan yang tiada. Betulkan kegagalan dengan
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`, atau
semua lokaliti secara selari dengan `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
selamat ketika dipisahkan, enggan bermula tanpa pemboleh ubah persekitaran `OMNIROUTE_TRANSLATION_*`). Kunci yang mesti kekal
dalam bahasa Inggeris (nama produk/enjin/bendera yang ditetapkan) hendaklah dimasukkan ke dalam `scripts/i18n/untranslatable-keys.json`,
bukan disembunyikan di sebalik penanda. `vi` melarang penanda sepenuhnya (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — gerbang ujian yang diketepikan

Fail dalam senarai `exclude` milik `vitest.config.ts` ialah ujian yang tidak dijalankan, namun kelihatan seperti
liputan kepada sesiapa yang membaca pepohon tersebut. Enam puluh dua fail terkumpul di sebalik komen
`// #8618 — kegagalan sedia ada; alih keluar pengecualian ini apabila telah dibetulkan`. Isu #8618 telah ditutup pada
2026-08-11 sedangkan senarai yang dijejakinya berkembang daripada 45 entri kepada 62, dengan setiap entri baharu mewarisi komen
yang menunjuk kepada isu yang telah ditutup. Apabila senarai tersebut akhirnya diukur fail demi fail (#13204), **51 daripada 62 fail
lulus pada pepohon semasa tanpa sebarang perubahan sumber**.

Gerbang ini mewajibkan setiap pengecualian yang merujuk kepada fail sebenar untuk (a) menamakan isu penjejakan dan
(b) disenaraikan dalam `config/quality/vitest-exclusions.json` berserta status yang diukur, supaya penambahan satu pengecualian menjadi
perbezaan yang boleh disemak dalam fail khusus dan bukannya satu lagi baris dalam tatasusunan 60 entri. Ia sengaja
tidak menjalankan semula ujian yang dikecualikan — tindakan itu mengambil masa ~10 minit dan sepatutnya dilakukan dalam tugas berkala;
inventori tersebut merekodkan bila setiap ujian kali terakhir diukur.
