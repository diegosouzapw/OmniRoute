# Account-Ban / Banned-Keyword Detection (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../security/BAN_DETECTION.md) · 🇪🇹 [am](../../../am/docs/security/BAN_DETECTION.md) · 🇸🇦 [ar](../../../ar/docs/security/BAN_DETECTION.md) · 🇦🇿 [az](../../../az/docs/security/BAN_DETECTION.md) · 🇧🇬 [bg](../../../bg/docs/security/BAN_DETECTION.md) · 🇧🇩 [bn](../../../bn/docs/security/BAN_DETECTION.md) · 🇧🇦 [bs](../../../bs/docs/security/BAN_DETECTION.md) · 🇨🇿 [cs](../../../cs/docs/security/BAN_DETECTION.md) · 🇩🇰 [da](../../../da/docs/security/BAN_DETECTION.md) · 🇩🇪 [de](../../../de/docs/security/BAN_DETECTION.md) · 🇬🇷 [el](../../../el/docs/security/BAN_DETECTION.md) · 🇪🇸 [es](../../../es/docs/security/BAN_DETECTION.md) · 🇪🇪 [et](../../../et/docs/security/BAN_DETECTION.md) · 🇮🇷 [fa](../../../fa/docs/security/BAN_DETECTION.md) · 🇫🇮 [fi](../../../fi/docs/security/BAN_DETECTION.md) · 🇫🇷 [fr](../../../fr/docs/security/BAN_DETECTION.md) · 🇮🇪 [ga](../../../ga/docs/security/BAN_DETECTION.md) · 🇮🇳 [gu](../../../gu/docs/security/BAN_DETECTION.md) · 🇳🇬 [ha](../../../ha/docs/security/BAN_DETECTION.md) · 🇮🇱 [he](../../../he/docs/security/BAN_DETECTION.md) · 🇮🇳 [hi](../../../hi/docs/security/BAN_DETECTION.md) · 🇭🇷 [hr](../../../hr/docs/security/BAN_DETECTION.md) · 🇭🇺 [hu](../../../hu/docs/security/BAN_DETECTION.md) · 🇦🇲 [hy](../../../hy/docs/security/BAN_DETECTION.md) · 🇳🇬 [ig](../../../ig/docs/security/BAN_DETECTION.md) · 🇮🇹 [it](../../../it/docs/security/BAN_DETECTION.md) · 🇯🇵 [ja](../../../ja/docs/security/BAN_DETECTION.md) · 🇬🇪 [ka](../../../ka/docs/security/BAN_DETECTION.md) · 🇰🇭 [km](../../../km/docs/security/BAN_DETECTION.md) · 🇮🇳 [kn](../../../kn/docs/security/BAN_DETECTION.md) · 🇰🇷 [ko](../../../ko/docs/security/BAN_DETECTION.md) · 🇱🇹 [lt](../../../lt/docs/security/BAN_DETECTION.md) · 🇱🇻 [lv](../../../lv/docs/security/BAN_DETECTION.md) · 🇮🇳 [ml](../../../ml/docs/security/BAN_DETECTION.md) · 🇮🇳 [mr](../../../mr/docs/security/BAN_DETECTION.md) · 🇲🇾 [ms](../../../ms/docs/security/BAN_DETECTION.md) · 🇲🇹 [mt](../../../mt/docs/security/BAN_DETECTION.md) · 🇲🇲 [my](../../../my/docs/security/BAN_DETECTION.md) · 🇳🇵 [ne](../../../ne/docs/security/BAN_DETECTION.md) · 🇳🇱 [nl](../../../nl/docs/security/BAN_DETECTION.md) · 🇳🇴 [no](../../../no/docs/security/BAN_DETECTION.md) · 🇮🇳 [or](../../../or/docs/security/BAN_DETECTION.md) · 🇮🇳 [pa](../../../pa/docs/security/BAN_DETECTION.md) · 🇵🇭 [phi](../../../phi/docs/security/BAN_DETECTION.md) · 🇵🇱 [pl](../../../pl/docs/security/BAN_DETECTION.md) · 🇵🇹 [pt](../../../pt/docs/security/BAN_DETECTION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/BAN_DETECTION.md) · 🇷🇴 [ro](../../../ro/docs/security/BAN_DETECTION.md) · 🇷🇺 [ru](../../../ru/docs/security/BAN_DETECTION.md) · 🇱🇰 [si](../../../si/docs/security/BAN_DETECTION.md) · 🇸🇰 [sk](../../../sk/docs/security/BAN_DETECTION.md) · 🇸🇮 [sl](../../../sl/docs/security/BAN_DETECTION.md) · 🇷🇸 [sr](../../../sr/docs/security/BAN_DETECTION.md) · 🇸🇪 [sv](../../../sv/docs/security/BAN_DETECTION.md) · 🇰🇪 [sw](../../../sw/docs/security/BAN_DETECTION.md) · 🇮🇳 [ta](../../../ta/docs/security/BAN_DETECTION.md) · 🇮🇳 [te](../../../te/docs/security/BAN_DETECTION.md) · 🇹🇭 [th](../../../th/docs/security/BAN_DETECTION.md) · 🇹🇷 [tr](../../../tr/docs/security/BAN_DETECTION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/BAN_DETECTION.md) · 🇵🇰 [ur](../../../ur/docs/security/BAN_DETECTION.md) · 🇺🇿 [uz](../../../uz/docs/security/BAN_DETECTION.md) · 🇻🇳 [vi](../../../vi/docs/security/BAN_DETECTION.md) · 🇳🇬 [yo](../../../yo/docs/security/BAN_DETECTION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/BAN_DETECTION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/BAN_DETECTION.md)

---

OmniRoute memindai respons galat dari upstream untuk mencari sinyal yang menunjukkan bahwa **akun penyedia mati secara permanen** (ditangguhkan / dinonaktifkan / diblokir karena pelanggaran ToS) dan, ketika ditemukan kecocokan, memindahkan koneksi tersebut ke **status terminal `banned`** agar tidak lagi dipilih untuk permintaan. Inilah yang dikonfigurasi oleh kartu pengaturan **Security → Banned Keywords** ("Kata kunci tambahan yang memicu deteksi pemblokiran akun permanen. Kata kunci bawaan selalu berlaku.").

Halaman ini mendokumentasikan daftar bawaan, alur deteksi, cakupannya, cara menambahkan kata kunci khusus dengan aman, dan cara memulihkan koneksi yang ditandai. Status terminal itu sendiri merupakan bagian dari model ketahanan — lihat
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md) ("Status terminal").

**Sumber acuan utama:** `open-sse/services/accountFallback.ts`
(`ACCOUNT_DEACTIVATED_SIGNALS`, `getMergedBannedSignals()`, `isAccountDeactivated()`),
serta `open-sse/services/errorClassifier.ts` untuk kelas verifikasi nonterminal
(`ACCOUNT_VERIFICATION_REQUIRED_SIGNALS` / `isAccountVerificationRequired()`) dan untuk
cabang 403 yang menggunakannya.

## Kata kunci bawaan

Ketujuh substring ini selalu berlaku (tanpa membedakan huruf besar-kecil), terlepas dari daftar kustom apa pun:

```
account_deactivated
account has been deactivated
account has been disabled
your account has been suspended
this account is deactivated
this service has been disabled in this account for violation    (Antigravity)
this service has been disabled in this account                  (Antigravity)
```

> Daftar ini terus berkembang seiring perubahan redaksi pemblokiran oleh penyedia. Salinan
> otoritatifnya adalah `ACCOUNT_DEACTIVATED_SIGNALS` dalam `open-sse/services/accountFallback.ts`;
> perlakukan blok di atas sebagai cuplikan.

### Bukan pemblokiran: permintaan verifikasi yang dapat ditindaklanjuti operator

`verify your account to continue` **sebelumnya** ada dalam daftar di atas. Frasa tersebut bukan
sinyal pemblokiran dan kini berada dalam `ACCOUNT_VERIFICATION_REQUIRED_SIGNALS`, yang diklasifikasikan
sebagai `PROJECT_ROUTE_ERROR` yang dapat dipulihkan, alih-alih mengakhiri koneksi secara permanen.

Google Cloud Code / Antigravity mengembalikannya sebagai `403 VALIDATION_REQUIRED`. Kondisi ini
**bersifat sementara dan terjadi pada akun sehat dengan kuota penuh** — berdasarkan pengukuran pada
deployment aktif (2026-09-25, `proxy_logs`): satu koneksi Antigravity mengembalikan 33 respons
403 semacam ini dalam waktu 10 menit dan tetap `active`, sedangkan koneksi lain yang memiliki 100% dari
kuotanya pada seluruh 17 jendela diblokir secara permanen hanya oleh **satu** respons semacam itu. Satu-satunya
perbedaan adalah percobaan mana yang kebetulan dilayani.

Pembedaan ini penting karena kecocokan terminal memiliki `permanent: true` (masa tunggu 1 tahun,
tidak pernah pulih secara otomatis), sedangkan operator dapat menyelesaikan permintaan verifikasi melalui browser.
Mempertahankan frasa tersebut dalam daftar pemblokiran juga membuat cabang 403 cloud-code yang dapat dipulihkan dalam
`classifyProviderError` tidak dapat dijangkau untuk redaksi ini, karena `accountDeactivated`
dievaluasi terlebih dahulu — sehingga pemulihan rute proyek yang ditambahkan untuk Gemini Code Assist dalam
[#868](https://github.com/diegosouzapw/OmniRoute/pull/868) dan
[#6452](https://github.com/diegosouzapw/OmniRoute/pull/6452) tidak pernah dapat dijalankan.

Tiga tabel sinyal yang berdekatan dan **terpisah** berikut _bukan_ bagian dari deteksi kata kunci pemblokiran:

- `CREDITS_EXHAUSTED_SIGNALS` — penagihan/kuota habis (`insufficient_quota`,
  `credit_balance_too_low`, `payment required`, …) → `credits_exhausted` terminal.
- `OAUTH_INVALID_TOKEN_SIGNALS` — **nonterminal**; penyegaran token dapat memulihkan kondisi.
- `ACCOUNT_VERIFICATION_REQUIRED_SIGNALS` — **nonterminal**; operator harus
  memverifikasi ulang akun di sisi penyedia. Berada dalam `open-sse/services/errorClassifier.ts`
  (dua lainnya berada dalam `accountFallback.ts`). Lihat bagian di atas.

Catatan: frasa sementara yang umum seperti **`rate limit`** / `429` ditangani oleh
alur pembatasan laju / masa tunggu koneksi dan **bukan** merupakan sinyal pemblokiran.

## Alur deteksi

```
respons kesalahan upstream
  → body diubah menjadi string + huruf kecil
  → isAccountDeactivated(body): getMergedBannedSignals().some(sig => body.includes(sig))   [pencocokan substring]
  → cocok?
      → testStatus koneksi = "banned"      (permanen — cooldown 1 tahun, tidak pernah pulih otomatis)
      → jika pengaturan `autoDisableBannedAccounts` aktif dan `autoDisableBannedScope`
        mencakup koneksi ini (`all`, atau `subscription` untuk OAuth/cookie/sesi)
        → isActive = false juga. Kunci API prabayar tetap aktif ketika cakupannya adalah
        `subscription`.
      → koneksi dilewati selama pemilihan akun (status combo QUOTA_BLOCKING)
```

- Pencocokan merupakan pencarian **substring yang tidak peka huruf besar/kecil** pada **body**
  respons (`isAccountDeactivated`, `accountFallback.ts`).
- Terminalisasi permanen `banned` dipicu oleh body dengan sinyal pemblokiran pada **status
  HTTP apa pun** (melalui `markAccountUnavailable` → `checkFallbackError`). Label
  **`deactivated`** yang lebih sempit (`isActive=false` ketika koneksi tidak memiliki
  kunci API cadangan) ditulis oleh jalur inline `chatCore.ts` pada **HTTP 401 / 403**
  (diklasifikasikan melalui `classifyProviderError` → `ACCOUNT_DEACTIVATED`). Perhatikan bahwa
  jalur `markAccountUnavailable()` menulis status terminal yang _berbeda_ —
  **`expired`** — untuk sinyal `ACCOUNT_DEACTIVATED` yang sama (melalui
  `resolveTerminalConnectionStatus`), sehingga pemblokiran yang sama dapat muncul sebagai
  `deactivated` atau `expired`, bergantung pada jalur yang menangani respons tersebut. (Komentar
  kode lama menyatakan "ketika body 401 berisi string ini" — hal itu tidak sepenuhnya
  menggambarkan perilaku saat ini.)
- Koneksi `banned` dikecualikan dari pemilihan di semua tempat yang memfilter status terminal
  (`isTerminalConnectionStatus`, combo `QUOTA_BLOCKING_CONNECTION_STATUSES`).

## Cakupan — provider mana yang dipindai

**Semua provider.** Pemeriksaan berjalan dalam pipeline penanganan error generik yang
dilewati oleh setiap permintaan upstream yang gagal — pemeriksaan ini **tidak** dibatasi
hanya untuk scraper OAuth/langganan. Status terminal yang dihasilkan berlaku per
**koneksi**, bukan per provider.

Meskipun demikian, _string_ bawaan ditujukan untuk provider langganan/OAuth
dengan risiko pemblokiran nyata (ChatGPT Web Codex, Claude Web, Codex, Muse Spark,
Antigravity). Provider kunci API hanya akan memicu detektor jika isi error-nya
secara harfiah memuat salah satu substring tersebut.

`autoDisableBannedScope` (`all` | `subscription`, default `all`) mengontrol apakah
kecocokan juga mengubah `isActive=false`. `subscription` berarti akun bergaya login
(langganan berbayar dan akun gratis, termasuk sesi cookie web). Pengaturan ini tetap
mencatat `testStatus=banned` untuk kunci API prabayar, tetapi membiarkannya berada
dalam pool routing. Desain jangka panjangnya adalah override per provider dan per akun;
enum global ini merupakan implementasi awal.

## Kata kunci pemblokiran kustom

Tambahkan atau hapus kata kunci di **Security → Banned Keywords** (disimpan sebagai
pengaturan global `customBannedSignals` melalui `PATCH /api/settings`). Kata kunci
tersebut **ditambahkan ke** daftar bawaan — tidak pernah menggantikannya — dan dimuat
ulang secara langsung saat disimpan (serta saat startup) melalui
`setCustomBannedSignals()`. Setiap kata kunci dibatasi hingga 200 karakter; tidak ada
batas panjang array.

**⚠ Risiko positif palsu — pilih frasa yang spesifik.** Deteksi menggunakan pencocokan
substring mentah pada seluruh isi respons, dan suatu kecocokan bersifat **permanen**
(cooldown 1 tahun, pemulihan manual). Kata kunci yang terlalu umum dapat memblokir
koneksi yang sebenarnya sepenuhnya sehat:

- **Buruk:** `quota`, `limit`, `error`, `denied` — muncul dalam banyak error sementara.
- **Baik:** kalimat pemblokiran lengkap, misalnya `your account has been suspended for`,
  `account permanently banned`, `violation of our terms`.

Pilih frasa terpanjang yang tidak ambigu yang dikembalikan provider saat terjadi
pemblokiran nyata. Jika ragu, pantau `lastError` koneksi terlebih dahulu, lalu tambahkan
teks persisnya.

## Memulihkan koneksi yang ditandai

Status terminal `banned` / `deactivated` **tidak pernah pulih secara otomatis**
(status tersebut dikecualikan dari siklus pemulihan proaktif — hanya cooldown
`unavailable` yang pulih dengan sendirinya). Operator harus menghapus status tersebut
secara eksplisit:

1. **Uji ulang koneksi** — tindakan **Test** di dasbor
   (`POST /api/providers/{id}/test`); probe yang berhasil mereset `testStatus` menjadi
   `active` dan menghapus field error.
2. **Autentikasi ulang / edit kredensial** — untuk provider OAuth, jalankan ulang alur
   login / refresh; route pembuatan/impor provider menetapkan `isActive = true`.
3. **Aktifkan ulang koneksi** — jika penonaktifan otomatis menetapkan
   `isActive = false` (cakupan `all`, atau `subscription` untuk koneksi
   OAuth/cookie/sesi), aktifkan kembali setelah memperbaiki akun.

Tidak ada tombol "hapus tanda pemblokiran" terpisah — pemulihan dilakukan melalui
pengujian ulang, autentikasi ulang, atau pengaktifan ulang, sesuai dengan aturan umum
status terminal dalam
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md).

## Isolasi probe (model test-all)

**Kegagalan yang berasal dari probe** (dispatch model test-all / health-check yang
dijalankan di dalam `runAsProbe`) tidak pernah menghapus koneksi dari pool (#9817):
kegagalan tersebut **dicatat agar terlihat** (`last_error`, `last_error_type`,
`error_code`, `last_error_at`), tetapi melewati **setiap** mutasi routing — cooldown,
status terminal (`banned` / `deactivated` / `credits_exhausted`), penguncian per model,
circuit breaker provider, cache kuota 5 menit, refresh token OAuth, dan penonaktifan
otomatis. Hanya kegagalan pada jalur permintaan nyata yang melakukan penonaktifan.
Error yang dicatat membuat akun yang ditandai terlihat di dasbor sementara akun
tersebut tetap melayani traffic.

Titik keputusan tunggalnya adalah `shouldIsolateProbeFailures()`
(`src/shared/utils/probeOrigin.ts`), yang digunakan oleh **setiap** bagian yang dapat
memutasi status routing akibat kegagalan yang berasal dari probe:

- `markAccountUnavailable` (`auth.ts`) — hanya mencatat (`lastError` berupa teks mentah,
  `lastErrorType`, `errorCode`, `lastErrorAt`; sengaja **tanpa**
  `backoffLevel`, yang dapat memicu peluruhan otomatis pada waktu pemilihan dan
  menghapus catatan tersebut)
- `maybeAutoDisableBannedAccount` — tanpa penonaktifan otomatis
- `chatCore` — FORBIDDEN, ACCOUNT_DEACTIVATED, QUOTA_EXHAUSTED (hanya mencatat,
  tanpa status terminal `credits_exhausted`), GEO_BLOCKED (tanpa pengecualian 24 jam),
  MODEL_NOT_FOUND (tanpa `lockModel`), failover rotasi akun codex 429
  (tanpa `markCodexScopeRateLimited`, tanpa `rate_limited_until` yang disimpan, tanpa
  penghapusan afinitas sesi), `persistCodexQuotaState` (tanpa penulisan status kuota,
  tanpa invalidasi cache), `recordKeyHealthStatus` (rotator kesehatan kunci
  tidak disentuh)
- Refresh OAuth — baik refresh proaktif di basis executor
  (`base.ts` `execute()`, tanpa menghabiskan rotasi refresh-token) maupun jalur
  reaktif 401/403 di `chatCore` (tanpa penonaktifan `expired`)
- `chat.ts` — circuit breaker provider dan cache kuota 5 menit
  (`markAccountExhaustedFrom429`) tidak pernah diturunkan kondisinya

Error yang dicatat membuat akun yang ditandai terlihat di dasbor sementara akun
tersebut tetap melayani traffic. Catatan: catatan probe menyimpan teks error
**mentah** (tanpa pemotongan), berbeda dengan pemotongan `slice(0,100)` pada jalur
nyata.

Operator yang menggunakan test-all sebagai alat pemeliharaan dapat memulihkan
perilaku historis (probe dianggap sebagai generasi nyata) melalui salah satu cara
berikut:

- pengaturan `probeCanDisable` (`POST /api/settings` dengan
  `{"probeCanDisable": true}`, atau pengeditan DB `key_value` secara langsung), atau
- feature flag **`PROBE_CAN_DISABLE=true`** (override env atau DB; diprioritaskan di
  atas pengaturan).

Fail-safe: jika pencarian flag atau pengaturan memunculkan exception, isolasi tetap AKTIF.

## File sumber

| Aspek                                  | File                                                                                                          |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Tabel sinyal + pencocokan              | `open-sse/services/accountFallback.ts`                                                                        |
| Finalisasi / persistensi               | `src/sse/services/auth.ts` (`markAccountUnavailable`, `resolveTerminalConnectionStatus`, `clearAccountError`) |
| Cakupan penonaktifan otomatis          | `src/shared/utils/autoDisableBanned.ts`, `src/sse/services/autoDisableBannedAccount.ts`                       |
| Klasifikasi inline                     | `open-sse/handlers/chatCore.ts`, `open-sse/services/errorClassifier.ts`                                       |
| Pengecualian pemulihan status terminal | `src/lib/quota/connectionRecovery.ts`                                                                         |
| Pemuatan runtime kata kunci kustom     | `src/lib/config/runtimeSettings.ts` (`setCustomBannedSignals`)                                                |
| UI pengaturan                          | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`                                           |
