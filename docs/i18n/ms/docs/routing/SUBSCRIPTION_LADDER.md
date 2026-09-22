# Subscription-first routing (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/SUBSCRIPTION_LADDER.md) · 🇪🇹 [am](../../../am/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇦 [ar](../../../ar/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇿 [az](../../../az/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇬 [bg](../../../bg/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇩 [bn](../../../bn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇦 [bs](../../../bs/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇿 [cs](../../../cs/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇰 [da](../../../da/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇪 [de](../../../de/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇷 [el](../../../el/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇸 [es](../../../es/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇪 [et](../../../et/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇷 [fa](../../../fa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇮 [fi](../../../fi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇷 [fr](../../../fr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇪 [ga](../../../ga/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [gu](../../../gu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ha](../../../ha/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇱 [he](../../../he/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [hi](../../../hi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇷 [hr](../../../hr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇺 [hu](../../../hu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇲 [hy](../../../hy/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇩 [id](../../../id/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ig](../../../ig/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇹 [it](../../../it/docs/routing/SUBSCRIPTION_LADDER.md) · 🇯🇵 [ja](../../../ja/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇪 [ka](../../../ka/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇭 [km](../../../km/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [kn](../../../kn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇷 [ko](../../../ko/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇹 [lt](../../../lt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇻 [lv](../../../lv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ml](../../../ml/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [mr](../../../mr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇹 [mt](../../../mt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇲 [my](../../../my/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇵 [ne](../../../ne/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇱 [nl](../../../nl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇴 [no](../../../no/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [or](../../../or/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [pa](../../../pa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇭 [phi](../../../phi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇱 [pl](../../../pl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇹 [pt](../../../pt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇴 [ro](../../../ro/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇺 [ru](../../../ru/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇰 [si](../../../si/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇰 [sk](../../../sk/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇮 [sl](../../../sl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇸 [sr](../../../sr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇪 [sv](../../../sv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇪 [sw](../../../sw/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ta](../../../ta/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [te](../../../te/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇭 [th](../../../th/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇷 [tr](../../../tr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇰 [ur](../../../ur/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇿 [uz](../../../uz/docs/routing/SUBSCRIPTION_LADDER.md) · 🇻🇳 [vi](../../../vi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [yo](../../../yo/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/SUBSCRIPTION_LADDER.md)

---

> Dua id `auto/*` baharu — `auto/subscription` dan `auto/thrifty`. Kedua-duanya bersifat ikut serta apabila
> diminta: tiada apa-apa dihalakan melaluinya melainkan pemanggil meminta id tersebut mengikut nama, dan tiada
> perubahan pada kumpulan, strategi atau lalai sedia ada.

## Mengapa ini diwujudkan

OmniRoute sudah pun menjawab dua soalan kos, tetapi kedua-duanya bukan soalan yang paling kerap ditanya oleh pengendali.

| Mekanisme sedia ada                                      | Menjawab                                                 |
| -------------------------------------------------------- | -------------------------------------------------------- |
| `hidePaidModels` (`autoCombo/paidModelFilter.ts`)        | "adakah model ini dikatalogkan sebagai percuma?"         |
| `freeAccessPolicy: "strict"` (`strictZeroCostFilter.ts`) | "bolehkah sambungan ini mengenakan bayaran kepada saya?" |
| `quotaPreflight` (`combo/quotaExhaustionCutoff.ts`)      | "adakah sambungan ini menghampiri hadnya?"               |
| `budgetCap` / `budgetFallback` (`autoCombo/engine.ts`)   | "hadkan perbelanjaan, turun taraf kepada yang termurah"  |

Setiap mekanisme percuma sahaja **gagal secara tertutup** — kumpulan percuma yang kehabisan kuota menjadi kumpulan kosong, bukan
peningkatan kepada pilihan berbayar — dan setiap mekanisme sisi berbayar tidak mengambil kira tahap. Kedua-duanya tidak menjawab:

> "Gunakan kuota yang telah saya bayar. Apabila kuota itu habis, sama ada berhenti atau naik satu tahap pada satu
> masa melalui pilihan berbayar yang termurah — dan kembali semula sebaik sahaja kuota itu ditetapkan semula."

## Pengebilan ialah fakta sambungan, bukan fakta model

`classifyTier()` (`open-sse/services/tierResolver.ts`) menggunakan `(provider, model)` sebagai kunci dan mengembalikan
`free | cheap | premium` berdasarkan harga katalog. Namun, sama ada sesuatu permintaan menanggung kos tambahan
bergantung pada **sambungan yang mengendalikannya**: model yang sama disertakan dalam pelan melalui sambungan OAuth Claude Code
dan dibilkan mengikut token melalui sambungan kunci API.

`provider_connections.auth_type` bukan proksi yang selamat dalam mana-mana arah — sambungan OAuth
bermeter memang wujud, begitu juga sambungan kunci API yang disertakan dalam pelan (token tempat duduk Copilot bukan
kunci API bermeter). Oleh itu, kelas pengebilan diperoleh daripada **katalog yang dikurasi**,
`open-sse/config/connectionBillingCatalog.ts`, yang ditetapkan secara manual berdasarkan terma yang diterbitkan oleh setiap penyedia —
corak yang sama yang telah diwujudkan oleh `FreeModelBudget.hardStopGuaranteed` untuk model percuma.

```ts
type ConnectionBillingClass = "subscription" | "metered" | "keyless" | "unknown";
type ConnectionOverageBehavior = "hard-stop" | "meters-to-paid" | "unknown";
```

Urutan resolusi (`autoCombo/connectionBilling.ts`): sentinela tanpa pengesahan sintetik →
`keyless`; entri katalog yang sepadan dengan penyedia **dan** `authType`; entri seluruh penyedia;
jika tidak, `unknown`. **Tidak dikurasi bukan bermakna percuma** — `unknown` dianggap sebagai `metered`
di semua tempat, jadi penyedia yang ditambahkan esok bermula di luar tahap langganan dan perlu
dikurasi secara sengaja.

## Model tahap

Lima tahap mengikut urutan peningkatan. Perbezaannya bukan sekadar harga — setiap satu mempunyai isyarat
kehabisan **tersendiri**, sebab itulah ini bukan sekadar pengisihan.

| #   | Tahap          | Keahlian                                           | Dianggap habis apabila                     |
| --- | -------------- | -------------------------------------------------- | ------------------------------------------ |
| 0   | `subscription` | `billing: "subscription"` yang dikurasi            | tetingkap kuota pada/di bawah ambang       |
| 1   | `keyless`      | laluan tanpa pengesahan sintetik                   | tempoh bertenang sambungan / pemutus litar |
| 2   | `free`         | sambungan bermeter, `classifyTier() === "free"`    | peruntukan percuma habis                   |
| 3   | `cheap`        | sambungan bermeter, `classifyTier() === "cheap"`   | belanjawan setiap tahap digunakan          |
| 4   | `premium`      | sambungan bermeter, `classifyTier() === "premium"` | belanjawan setiap tahap digunakan          |

Tahap 0-2 habis berdasarkan **kuota**, yang boleh diperhatikan dan sudah pun dijejaki. Tahap 3-4 tidak mempunyai
kuota — sambungan berbayar boleh terus digunakan selama-lamanya — maka satu-satunya isyarat kehabisan yang munasabah ialah
**belanjawan** bagi setiap tahap. Tanpanya, "tingkatkan apabila tahap murah habis" tidak mempunyai pencetus.

## `auto/subscription` — gagal secara tertutup

Kumpulan = anak tangga 0 sahaja, terhad kepada sambungan yang lebihan penggunaannya didokumenkan sebagai `hard-stop`, dengan setiap satunya disahkan secara langsung mempunyai baki kuota. Semua yang samar dikecualikan: penyedia yang belum dikurasi, bacaan kuota yang tidak dapat disahkan, bacaan lapuk, atau lebihan penggunaan yang dicaj mengikut penggunaan.

Kumpulan kosong ialah jawapan yang **disengajakan**, bukannya kecacatan — laluan kumpulan kosong sedia ada milik pemanggil menukarkannya kepada ralat yang jelas dan bukannya sandaran senyap yang boleh dikenakan bayaran. Itulah keseluruhan jaminan id ini.

`keyless` sengaja **tidak** layak: pengelompokan ini bermaksud "pelan yang saya bayar", maka bahagian belakang tanpa pengesahan tidak termasuk di dalamnya. Gunakan `auto/thrifty` (atau `auto/best-free`) untuk tujuan tersebut.

### Keselamatan sambungan

Calon tidak semestinya terikat kepada satu sambungan — calon logik membawa senarai dibenarkan `allowedConnectionIds`, dan akaun yang sebenarnya digunakan dipilih kemudian, semasa penghantaran, oleh `open-sse/services/combo/autoStrategy.ts`. Oleh itu, kedua-dua pengelompokan mengesahkan **setiap sambungan secara individu** dan menulis semula `allowedConnectionIds` agar mengandungi tepat-tepat subset yang terselamat — bukan keseluruhan senarai asal dan bukan satu ahli yang dipilih sewenang-wenangnya. Oleh sebab `autoStrategy.ts` sudah menguatkuasakan tatasusunan tersebut sebagai senarai dibenarkan yang tegas, penulisan semulanya di sini menjadikan set "yang disahkan" dan "yang sebenarnya digunakan" sama secara reka bentuk. Ini ialah invarian yang sama, serta penaakulan yang sama, seperti [STRICT_ZERO_COST](./STRICT_ZERO_COST.md).

## `auto/thrifty` — naik satu anak tangga pada satu-satu masa

Kumpulan = semua anak tangga, disusun mengikut indeks anak tangga, dengan calon yang telah kehabisan disekat keluar. Enjin `auto` masih memberikan skor **dalam** kumpulan yang terselamat: tangga menentukan anak tangga yang terlibat, manakala pemarkahan menentukan calon yang menang di dalamnya. Susunan adalah stabil dalam setiap anak tangga, maka kedudukan milik pemberi skor sendiri tidak pernah disusun semula oleh lapisan tindanan ini.

Ini ialah lapisan tindanan penyusunan + penyekatan, **bukan** penghantar baharu: gelung spekulatif `combo.ts` sudah menelusuri sasaran mengikut turutan dan beralih kepada sasaran berikutnya apabila berlaku kegagalan, maka kehabisan semasa masa jalan yang tidak dikesan oleh prapemeriksaan masih menaikkan permintaan ke anak tangga seterusnya dalam permintaan yang sama.

Jika `auto/subscription` gagal secara **tertutup**, `auto/thrifty` gagal secara **terbuka**: sambungan yang termasuk dalam pelan tanpa bacaan kuota yang boleh digunakan masih dicuba terlebih dahulu. Percubaan itu tidak menelan kos, dan jika ia rupa-rupanya telah kehabisan, mekanisme peralihan akan sampai ke anak tangga seterusnya juga — sedangkan keengganan untuk mencubanya akan menghantar permintaan ke anak tangga berbayar apabila telemetri tiada, iaitu hasil tepat yang ingin dielakkan oleh pengelompokan ini.

## Kembali kepada pelan selepas penetapan semula

Tiga perkara berasingan mesti tamat tempoh sebelum penghalaan kembali kepada anak tangga 0. Membetulkan hanya satu daripadanya menyebabkan tangga terus tersekat pada anak tangga berbayar lama selepas pelan diisi semula.

1. **Cache keadaan kuota** — `freeAccessQuota.ts` menyimpan cache bagi setiap `(provider, connection)` dengan TTL 180 saat. Entri cache yang `resetAt`-nya sendiri sudah berlalu menerangkan tetingkap yang tidak lagi wujud, maka entri itu kini dianggap lapuk **tanpa mengira usianya** dan memaksa penyegaran. Tanpa ini, pelan yang diisi semula pada tengah malam terus dibaca sebagai telah kehabisan sehingga TTL kebetulan tamat tempoh.
2. **Keadaan tangga itu sendiri** — tiada, mengikut reka bentuk. Kelayakan anak tangga dikira semula daripada keadaan kuota langsung pada setiap pembinaan kumpulan; tiada rekod "kini pada anak tangga 3" yang disimpan dan mungkin kekal melepasi penetapan semula lalu menyekat penghalaan.
3. **Tempoh bertenang sambungan** — respons 429 yang menandakan kehabisan menetapkan `rateLimitedUntil` berdasarkan undur eksponen, yang bagi sambungan pelan boleh melangkaui penetapan semula sebenar. `clampCooldownToReset()` (`subscriptionLadder.ts`) mengehadkan tempoh bertenang kepada detik penetapan semula milik penyedia huluan sendiri dan tidak sekali-kali boleh memanjangkannya. **Ia telah dilaksanakan dan diuji tetapi belum lagi disambungkan**: cache kuota dibatalkan dalam `src/sse/services/auth.ts` _sebelum_ sebarang tempoh bertenang ditulis, maka `resetAt` mesti ditangkap lebih awal dalam fungsi tersebut — perubahan pada laluan genting daya tahan yang wajar dibuat dalam PR tersendiri untuk semakan. Sehingga itu, kemasukan semula perlu menunggu sehingga tempoh bertenang sambungan tamat (yang sudah pun mengutamakan petunjuk `Retry-After` daripada penyedia huluan apabila penyedia menghantarnya).

### Anti-turun-naik

Anak tangga yang baru sahaja ditetapkan semula hanya diterima masuk semula apabila melebihi `reentryMinRemainingPercent` (lalai 5), manakala sambungan yang sudah digunakan hanya perlu kekal melebihi `exitCutoffPercent` (lalai 2, sepadan dengan `quotaPreflight.defaultThresholdPercent`). Jurang itu ialah jalur histeresis — tanpanya, sambungan yang berlegar-legar pada ambang akan berayun antara anak tangga pada permintaan berturutan.

## Konfigurasi

Pelarasan sahaja. Sengaja **tiada** bendera `enabled`: suis yang boleh mematikan ciri ini
akan menyebabkan `auto/subscription` terus menyediakan keseluruhan kumpulan secara senyap — termasuk model berbayar — menggunakan
nama yang menjanjikan perkara sebaliknya.

```jsonc
{
  "subscriptionLadder": {
    "exitCutoffPercent": 2,
    "reentryMinRemainingPercent": 5,
    "rungBudgetUsd": { "cheap": 5.0, "premium": 0 }, // 0 menyahdayakan anak tangga sepenuhnya
  },
}
```

Pengegatan belanjawan tidak aktif sehingga penyelesai perbelanjaan disambungkan: apabila tiada perakaunan tersedia, anak tangga
berbayar disusun tetapi tidak pernah disekat. Mulai v3.8.51, tetapan `rungBudgetUsd` diterima oleh
skema tetapi BELUM dikuatkuasakan — anggapnya sebagai konfigurasi yang dikhaskan, bukan had perbelanjaan aktif. Susunan anak tangga, kehabisan berdasarkan kuota dan kemasukan semula selepas penetapan semula semuanya
berfungsi tanpanya.

## Komposisi

`subscription` dan `thrifty` ialah nilai `AutoTier`, maka kedua-duanya boleh digabungkan dengan setiap kategori:
`auto/coding:thrifty`, `auto/reasoning:subscription` dan sebagainya. Dua id rata
(`auto/subscription`, `auto/thrifty`) dipaparkan dalam `/v1/models` dan papan pemuka.

Kedua-dua id bukan peringkat berbayar, maka `isPaidTierAutoId()` mengembalikan `false` untuk kedua-duanya dan
`auto/subscription` kekal tersedia apabila `hidePaidModels` digunakan.

## Lokasi kod

| Perkara                                                | Fail                                                |
| ------------------------------------------------------ | --------------------------------------------------- |
| Fakta pengebilan terpilih                              | `open-sse/config/connectionBillingCatalog.ts`       |
| Pengelas                                               | `open-sse/services/autoCombo/connectionBilling.ts`  |
| Anak tangga, kedua-dua pengelompokan, kemasukan semula | `open-sse/services/autoCombo/subscriptionLadder.ts` |
| Pendawaian ke dalam kumpulan calon                     | `open-sse/services/autoCombo/virtualFactory.ts`     |
| Kelapukan cache yang mengambil kira penetapan semula   | `open-sse/services/autoCombo/freeAccessQuota.ts`    |
| Permukaan peringkat                                    | `open-sse/services/autoCombo/suffixComposition.ts`  |
| Id yang dipaparkan                                     | `open-sse/services/autoCombo/builtinCatalog.ts`     |
| Ujian                                                  | `tests/unit/autoCombo/subscription-ladder.test.ts`  |
