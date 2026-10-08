# Subscription-first routing (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/SUBSCRIPTION_LADDER.md) · 🇪🇹 [am](../../../am/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇦 [ar](../../../ar/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇿 [az](../../../az/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇬 [bg](../../../bg/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇩 [bn](../../../bn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇦 [bs](../../../bs/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇿 [cs](../../../cs/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇰 [da](../../../da/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇪 [de](../../../de/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇷 [el](../../../el/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇸 [es](../../../es/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇪 [et](../../../et/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇷 [fa](../../../fa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇮 [fi](../../../fi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇷 [fr](../../../fr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇪 [ga](../../../ga/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [gu](../../../gu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ha](../../../ha/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇱 [he](../../../he/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [hi](../../../hi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇷 [hr](../../../hr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇺 [hu](../../../hu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇲 [hy](../../../hy/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ig](../../../ig/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇹 [it](../../../it/docs/routing/SUBSCRIPTION_LADDER.md) · 🇯🇵 [ja](../../../ja/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇪 [ka](../../../ka/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇭 [km](../../../km/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [kn](../../../kn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇷 [ko](../../../ko/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇹 [lt](../../../lt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇻 [lv](../../../lv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ml](../../../ml/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [mr](../../../mr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇾 [ms](../../../ms/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇹 [mt](../../../mt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇲 [my](../../../my/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇵 [ne](../../../ne/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇱 [nl](../../../nl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇴 [no](../../../no/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [or](../../../or/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [pa](../../../pa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇭 [phi](../../../phi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇱 [pl](../../../pl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇹 [pt](../../../pt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇴 [ro](../../../ro/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇺 [ru](../../../ru/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇰 [si](../../../si/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇰 [sk](../../../sk/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇮 [sl](../../../sl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇸 [sr](../../../sr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇪 [sv](../../../sv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇪 [sw](../../../sw/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ta](../../../ta/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [te](../../../te/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇭 [th](../../../th/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇷 [tr](../../../tr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇰 [ur](../../../ur/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇿 [uz](../../../uz/docs/routing/SUBSCRIPTION_LADDER.md) · 🇻🇳 [vi](../../../vi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [yo](../../../yo/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/SUBSCRIPTION_LADDER.md)

---

> Dua id `auto/*` baru — `auto/subscription` dan `auto/thrifty`. Keduanya bersifat opt-in dengan cara
> diminta: tidak ada apa pun yang dirutekan melaluinya kecuali pemanggil meminta id tersebut berdasarkan nama, dan tidak ada
> pool, strategi, atau default yang sudah ada yang berubah.

## Mengapa ini ada

OmniRoute sudah menjawab dua pertanyaan tentang biaya, tetapi tidak satu pun merupakan pertanyaan yang paling sering diajukan operator.

| Mekanisme yang ada                                       | Menjawab                                        |
| -------------------------------------------------------- | ----------------------------------------------- |
| `hidePaidModels` (`autoCombo/paidModelFilter.ts`)        | "apakah model ini dikatalogkan sebagai gratis?" |
| `freeAccessPolicy: "strict"` (`strictZeroCostFilter.ts`) | "apakah koneksi ini dapat menagih saya?"        |
| `quotaPreflight` (`combo/quotaExhaustionCutoff.ts`)      | "apakah koneksi ini mendekati batasnya?"        |
| `budgetCap` / `budgetFallback` (`autoCombo/engine.ts`)   | "batasi pengeluaran, turunkan ke yang termurah" |

Setiap mekanisme khusus-gratis **gagal secara tertutup** — pool gratis yang habis menjadi pool kosong, tidak pernah
naik ke opsi berbayar — dan setiap mekanisme sisi berbayar tidak membedakan tier. Tidak satu pun menjawab:

> "Gunakan kuota yang sudah saya bayar. Ketika habis, berhenti, atau naik satu tingkat setiap
> kali melalui opsi berbayar termurah — dan kembali segera setelah kuota direset."

## Penagihan adalah fakta koneksi, bukan fakta model

`classifyTier()` (`open-sse/services/tierResolver.ts`) menggunakan `(provider, model)` sebagai kunci dan mengembalikan
`free | cheap | premium` berdasarkan harga katalog. Namun, apakah suatu permintaan menimbulkan biaya tambahan
bergantung pada **koneksi mana yang melayaninya**: model yang sama sudah termasuk dalam paket melalui koneksi OAuth Claude Code
dan ditagih per token melalui koneksi API key.

`provider_connections.auth_type` bukan proksi yang aman untuk kedua arah — koneksi OAuth
bermeter memang ada, dan koneksi API key yang termasuk dalam paket juga ada (token seat Copilot bukan
API key bermeter). Karena itu, kelas penagihan berasal dari **katalog terkurasi**,
`open-sse/config/connectionBillingCatalog.ts`, yang ditetapkan secara manual berdasarkan ketentuan yang dipublikasikan setiap provider —
pola yang sama dengan yang sudah ditetapkan `FreeModelBudget.hardStopGuaranteed` untuk model gratis.

```ts
type ConnectionBillingClass = "subscription" | "metered" | "keyless" | "unknown";
type ConnectionOverageBehavior = "hard-stop" | "meters-to-paid" | "unknown";
```

Urutan resolusi (`autoCombo/connectionBilling.ts`): sentinel tanpa autentikasi sintetis →
`keyless`; entri katalog yang cocok dengan provider **dan** `authType`; entri untuk seluruh provider;
jika tidak, `unknown`. **Yang belum dikurasi bukan berarti gratis** — `unknown` diperlakukan sebagai `metered`
di semua tempat, sehingga provider yang ditambahkan besok dimulai di luar tingkat langganan dan harus
dikurasi secara sengaja.

## Model tingkat

Lima tingkat dalam urutan eskalasi. Perbedaannya bukan hanya harga — masing-masing memiliki sinyal
**kehabisan** tersendiri, sehingga ini bukan sekadar pengurutan.

| #   | Tingkat        | Keanggotaan                                      | Dianggap habis ketika              |
| --- | -------------- | ------------------------------------------------ | ---------------------------------- |
| 0   | `subscription` | `billing: "subscription"` yang dikurasi          | jendela kuota pada/di bawah cutoff |
| 1   | `keyless`      | jalur tanpa autentikasi sintetis                 | cooldown koneksi / breaker         |
| 2   | `free`         | koneksi bermeter, `classifyTier() === "free"`    | jatah gratis habis                 |
| 3   | `cheap`        | koneksi bermeter, `classifyTier() === "cheap"`   | anggaran per tingkat terpakai      |
| 4   | `premium`      | koneksi bermeter, `classifyTier() === "premium"` | anggaran per tingkat terpakai      |

Tingkat 0-2 habis berdasarkan **kuota**, yang dapat diamati dan sudah dilacak. Tingkat 3-4 tidak memiliki
kuota — koneksi berbayar dapat melayani selamanya — sehingga satu-satunya sinyal kehabisan yang masuk akal adalah
**anggaran** per tingkat. Tanpanya, "eskalasi ketika tingkat murah habis" tidak memiliki pemicu.

## `auto/subscription` — gagal secara tertutup

Pool = hanya tingkat 0, dibatasi pada koneksi yang kelebihan penggunaannya merupakan `hard-stop` yang terdokumentasi, dan setiap koneksi telah diverifikasi secara langsung memiliki sisa kuota. Semua yang ambigu dikecualikan: penyedia yang belum dikurasi, pembacaan kuota yang tidak dapat diverifikasi, pembacaan yang kedaluwarsa, atau kelebihan penggunaan yang dihitung sebagai penggunaan berbayar.

Pool kosong adalah jawaban yang **disengaja**, bukan cacat — jalur pool kosong milik pemanggil yang sudah ada mengubahnya menjadi kesalahan yang jelas, bukan fallback diam-diam yang dapat ditagihkan. Itulah keseluruhan jaminan dari id ini.

`keyless` sengaja **tidak** memenuhi syarat: pengelompokan ini berarti "paket yang saya bayar", sehingga backend tanpa autentikasi tidak termasuk di dalamnya. Gunakan `auto/thrifty` (atau `auto/best-free`) untuk itu.

### Keamanan koneksi

Kandidat tidak selalu terikat pada satu koneksi — kandidat logis membawa daftar yang diizinkan `allowedConnectionIds`, dan akun yang benar-benar digunakan dipilih kemudian, saat dispatch, oleh `open-sse/services/combo/autoStrategy.ts`. Karena itu, kedua pengelompokan memverifikasi **setiap koneksi secara individual** dan menulis ulang `allowedConnectionIds` sehingga hanya memuat subset yang lolos — tidak pernah daftar asli secara lengkap, dan tidak pernah satu anggota yang dipilih secara arbitrer. Karena `autoStrategy.ts` telah memberlakukan array tersebut sebagai daftar izin yang ketat, penulisan ulang di sini membuat "terverifikasi" dan "benar-benar digunakan" menjadi himpunan yang sama secara konstruksi. Ini adalah invarian yang sama, dan penalaran yang sama, seperti [STRICT_ZERO_COST](./STRICT_ZERO_COST.md).

## `auto/thrifty` — naik satu tingkat pada satu waktu

Pool = semua tingkat, diurutkan berdasarkan indeks tingkat, dengan kandidat yang telah kehabisan kuota disaring keluar. Mesin `auto` tetap memberikan skor **di dalam** pool yang lolos: tangga menentukan tingkat mana yang dipertimbangkan, sedangkan penilaian menentukan kandidat mana yang menang di dalamnya. Pengurutan stabil di dalam satu tingkat, sehingga peringkat milik pemberi skor tidak pernah diacak ulang oleh overlay ini.

Ini adalah overlay pengurutan + penyaringan, **bukan** dispatcher baru: loop spekulatif milik `combo.ts` sudah menelusuri target secara berurutan dan beralih ke target berikutnya saat terjadi kegagalan, sehingga kehabisan kuota saat runtime yang tidak terdeteksi oleh preflight tetap menyebabkan kenaikan ke tingkat berikutnya dalam permintaan yang sama.

Jika `auto/subscription` gagal secara **tertutup**, `auto/thrifty` gagal secara **terbuka**: koneksi yang termasuk dalam paket tetapi tidak memiliki pembacaan kuota yang dapat digunakan tetap dicoba terlebih dahulu. Mencobanya tidak menimbulkan biaya, dan jika ternyata kuotanya telah habis, mekanisme peralihan akan tetap mencapai tingkat berikutnya — sedangkan menolak untuk mencobanya akan mengirim permintaan ke tingkat berbayar ketika telemetri tidak tersedia, persis hasil yang ingin dihindari oleh pengelompokan ini.

## Kembali ke paket setelah reset

Tiga hal independen harus kedaluwarsa sebelum perutean kembali ke tingkat 0. Memperbaiki hanya salah satunya akan membuat tangga tetap terjebak pada tingkat berbayar lama setelah paket terisi kembali.

1. **Cache status kuota** — `freeAccessQuota.ts` menyimpan cache per `(provider, connection)` dengan TTL 180 detik. Entri cache yang nilai `resetAt`-nya sendiri telah berlalu mendeskripsikan jendela yang sudah tidak ada lagi, sehingga kini diperlakukan sebagai kedaluwarsa **tanpa memandang usianya** dan memaksa penyegaran. Tanpa ini, paket yang terisi kembali pada tengah malam akan tetap terbaca telah habis hingga TTL kebetulan berakhir.
2. **Status milik tangga itu sendiri** — secara sengaja tidak ada. Kelayakan tingkat dihitung ulang dari status kuota langsung pada setiap pembuatan pool; tidak ada catatan "saat ini berada di tingkat 3" yang dipertahankan dan dapat bertahan melewati reset serta membuat perutean macet.
3. **Cooldown koneksi** — respons 429 yang menunjukkan kehabisan kuota menetapkan `rateLimitedUntil` berdasarkan backoff eksponensial, yang untuk koneksi paket dapat melampaui waktu reset sebenarnya. `clampCooldownToReset()` (`subscriptionLadder.ts`) mempersempit cooldown ke waktu reset milik upstream dan tidak pernah dapat memperpanjangnya. **Fungsi ini telah diimplementasikan dan diuji, tetapi belum dihubungkan**: cache kuota dibatalkan di `src/sse/services/auth.ts` _sebelum_ cooldown apa pun ditulis, sehingga `resetAt` harus diambil lebih awal di dalam fungsi tersebut — perubahan pada jalur kritis ketahanan yang sebaiknya berada dalam PR tersendiri untuk ditinjau. Hingga saat itu, masuk kembali harus menunggu cooldown koneksi berakhir (yang sudah mengutamakan petunjuk `Retry-After` dari upstream ketika penyedia mengirimkannya).

### Anti-flap

Tingkat yang baru saja direset hanya dimasukkan kembali ketika berada di atas `reentryMinRemainingPercent` (nilai default 5), sedangkan koneksi yang sudah digunakan hanya perlu tetap berada di atas `exitCutoffPercent` (nilai default 2, sesuai dengan `quotaPreflight.defaultThresholdPercent`). Selisih ini adalah pita histeresis — tanpanya, koneksi yang berada di sekitar ambang batas akan berosilasi antartingkat pada permintaan yang berurutan.

## Konfigurasi

Hanya untuk penyetelan. Sengaja **tidak ada** flag `enabled`: sakelar yang dapat menonaktifkan fitur ini
akan membuat `auto/subscription` diam-diam menyajikan seluruh kumpulan — termasuk model berbayar — dengan
nama yang menjanjikan sebaliknya.

```jsonc
{
  "subscriptionLadder": {
    "exitCutoffPercent": 2,
    "reentryMinRemainingPercent": 5,
    "rungBudgetUsd": { "cheap": 5.0, "premium": 0 }, // 0 menonaktifkan anak tangga sepenuhnya
  },
}
```

Pembatasan anggaran tidak aktif hingga resolver pengeluaran dihubungkan: jika tidak tersedia pencatatan akuntansi, anak
tangga berbayar akan diurutkan tetapi tidak pernah dibatasi. Mulai v3.8.51, pengaturan `rungBudgetUsd` diterima oleh
skema tetapi BELUM diberlakukan — perlakukan sebagai konfigurasi yang dicadangkan, bukan batas pengeluaran aktif. Pengurutan anak tangga, penghabisan berbasis kuota, dan masuk kembali setelah reset semuanya
berfungsi tanpanya.

## Komposisi

`subscription` dan `thrifty` merupakan nilai `AutoTier`, sehingga keduanya dapat dikomposisikan dengan setiap kategori:
`auto/coding:thrifty`, `auto/reasoning:subscription`, dan seterusnya. Kedua ID datar
(`auto/subscription`, `auto/thrifty`) ditampilkan di `/v1/models` dan dasbor.

Kedua ID tersebut bukan tier berbayar, sehingga `isPaidTierAutoId()` mengembalikan `false` untuk keduanya dan
`auto/subscription` tetap tersedia saat `hidePaidModels` diterapkan.

## Lokasi kode

| Aspek                                           | File                                                |
| ----------------------------------------------- | --------------------------------------------------- |
| Fakta penagihan terkurasi                       | `open-sse/config/connectionBillingCatalog.ts`       |
| Pengklasifikasi                                 | `open-sse/services/autoCombo/connectionBilling.ts`  |
| Anak tangga, kedua pengelompokan, masuk kembali | `open-sse/services/autoCombo/subscriptionLadder.ts` |
| Pengintegrasian ke kumpulan kandidat            | `open-sse/services/autoCombo/virtualFactory.ts`     |
| Keusangan cache yang memperhitungkan reset      | `open-sse/services/autoCombo/freeAccessQuota.ts`    |
| Antarmuka tier                                  | `open-sse/services/autoCombo/suffixComposition.ts`  |
| ID yang ditampilkan                             | `open-sse/services/autoCombo/builtinCatalog.ts`     |
| Pengujian                                       | `tests/unit/autoCombo/subscription-ladder.test.ts`  |
