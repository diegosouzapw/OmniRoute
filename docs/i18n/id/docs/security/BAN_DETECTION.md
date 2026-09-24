# Account-Ban / Banned-Keyword Detection (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../security/BAN_DETECTION.md) · 🇪🇹 [am](../../../am/docs/security/BAN_DETECTION.md) · 🇸🇦 [ar](../../../ar/docs/security/BAN_DETECTION.md) · 🇦🇿 [az](../../../az/docs/security/BAN_DETECTION.md) · 🇧🇬 [bg](../../../bg/docs/security/BAN_DETECTION.md) · 🇧🇩 [bn](../../../bn/docs/security/BAN_DETECTION.md) · 🇧🇦 [bs](../../../bs/docs/security/BAN_DETECTION.md) · 🇨🇿 [cs](../../../cs/docs/security/BAN_DETECTION.md) · 🇩🇰 [da](../../../da/docs/security/BAN_DETECTION.md) · 🇩🇪 [de](../../../de/docs/security/BAN_DETECTION.md) · 🇬🇷 [el](../../../el/docs/security/BAN_DETECTION.md) · 🇪🇸 [es](../../../es/docs/security/BAN_DETECTION.md) · 🇪🇪 [et](../../../et/docs/security/BAN_DETECTION.md) · 🇮🇷 [fa](../../../fa/docs/security/BAN_DETECTION.md) · 🇫🇮 [fi](../../../fi/docs/security/BAN_DETECTION.md) · 🇫🇷 [fr](../../../fr/docs/security/BAN_DETECTION.md) · 🇮🇪 [ga](../../../ga/docs/security/BAN_DETECTION.md) · 🇮🇳 [gu](../../../gu/docs/security/BAN_DETECTION.md) · 🇳🇬 [ha](../../../ha/docs/security/BAN_DETECTION.md) · 🇮🇱 [he](../../../he/docs/security/BAN_DETECTION.md) · 🇮🇳 [hi](../../../hi/docs/security/BAN_DETECTION.md) · 🇭🇷 [hr](../../../hr/docs/security/BAN_DETECTION.md) · 🇭🇺 [hu](../../../hu/docs/security/BAN_DETECTION.md) · 🇦🇲 [hy](../../../hy/docs/security/BAN_DETECTION.md) · 🇳🇬 [ig](../../../ig/docs/security/BAN_DETECTION.md) · 🇮🇹 [it](../../../it/docs/security/BAN_DETECTION.md) · 🇯🇵 [ja](../../../ja/docs/security/BAN_DETECTION.md) · 🇬🇪 [ka](../../../ka/docs/security/BAN_DETECTION.md) · 🇰🇭 [km](../../../km/docs/security/BAN_DETECTION.md) · 🇮🇳 [kn](../../../kn/docs/security/BAN_DETECTION.md) · 🇰🇷 [ko](../../../ko/docs/security/BAN_DETECTION.md) · 🇱🇹 [lt](../../../lt/docs/security/BAN_DETECTION.md) · 🇱🇻 [lv](../../../lv/docs/security/BAN_DETECTION.md) · 🇮🇳 [ml](../../../ml/docs/security/BAN_DETECTION.md) · 🇮🇳 [mr](../../../mr/docs/security/BAN_DETECTION.md) · 🇲🇾 [ms](../../../ms/docs/security/BAN_DETECTION.md) · 🇲🇹 [mt](../../../mt/docs/security/BAN_DETECTION.md) · 🇲🇲 [my](../../../my/docs/security/BAN_DETECTION.md) · 🇳🇵 [ne](../../../ne/docs/security/BAN_DETECTION.md) · 🇳🇱 [nl](../../../nl/docs/security/BAN_DETECTION.md) · 🇳🇴 [no](../../../no/docs/security/BAN_DETECTION.md) · 🇮🇳 [or](../../../or/docs/security/BAN_DETECTION.md) · 🇮🇳 [pa](../../../pa/docs/security/BAN_DETECTION.md) · 🇵🇭 [phi](../../../phi/docs/security/BAN_DETECTION.md) · 🇵🇱 [pl](../../../pl/docs/security/BAN_DETECTION.md) · 🇵🇹 [pt](../../../pt/docs/security/BAN_DETECTION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/BAN_DETECTION.md) · 🇷🇴 [ro](../../../ro/docs/security/BAN_DETECTION.md) · 🇷🇺 [ru](../../../ru/docs/security/BAN_DETECTION.md) · 🇱🇰 [si](../../../si/docs/security/BAN_DETECTION.md) · 🇸🇰 [sk](../../../sk/docs/security/BAN_DETECTION.md) · 🇸🇮 [sl](../../../sl/docs/security/BAN_DETECTION.md) · 🇷🇸 [sr](../../../sr/docs/security/BAN_DETECTION.md) · 🇸🇪 [sv](../../../sv/docs/security/BAN_DETECTION.md) · 🇰🇪 [sw](../../../sw/docs/security/BAN_DETECTION.md) · 🇮🇳 [ta](../../../ta/docs/security/BAN_DETECTION.md) · 🇮🇳 [te](../../../te/docs/security/BAN_DETECTION.md) · 🇹🇭 [th](../../../th/docs/security/BAN_DETECTION.md) · 🇹🇷 [tr](../../../tr/docs/security/BAN_DETECTION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/BAN_DETECTION.md) · 🇵🇰 [ur](../../../ur/docs/security/BAN_DETECTION.md) · 🇺🇿 [uz](../../../uz/docs/security/BAN_DETECTION.md) · 🇻🇳 [vi](../../../vi/docs/security/BAN_DETECTION.md) · 🇳🇬 [yo](../../../yo/docs/security/BAN_DETECTION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/BAN_DETECTION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/BAN_DETECTION.md)

---

OmniRoute memindai respons kesalahan upstream untuk mencari sinyal yang menunjukkan bahwa
**akun penyedia telah mati secara permanen** (ditangguhkan / dinonaktifkan / diblokir karena ToS) dan, ketika
ditemukan kecocokan, memindahkan koneksi tersebut ke **status terminal `banned`** sehingga tidak
lagi dipilih untuk permintaan. Inilah yang dikonfigurasi oleh kartu pengaturan **Security → Banned Keywords**
("Kata kunci tambahan yang memicu deteksi pemblokiran akun permanen.
Kata kunci bawaan selalu diterapkan.").

Halaman ini mendokumentasikan daftar bawaan, alur deteksi, cakupannya, cara menambahkan
kata kunci khusus dengan aman, dan cara memulihkan koneksi yang ditandai. Status terminal
itu sendiri merupakan bagian dari model ketahanan — lihat
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md) ("Status terminal").

**Sumber acuan:** `open-sse/services/accountFallback.ts`
(`ACCOUNT_DEACTIVATED_SIGNALS`, `getMergedBannedSignals()`, `isAccountDeactivated()`).

## Kata kunci bawaan

8 substring berikut selalu diterapkan (tidak peka huruf besar/kecil), terlepas dari daftar khusus apa pun:

```
account_deactivated
account has been deactivated
account has been disabled
your account has been suspended
this account is deactivated
verify your account to continue                                 (Antigravity / Google Cloud Code)
this service has been disabled in this account for violation    (Antigravity)
this service has been disabled in this account                  (Antigravity)
```

> Daftar ini berkembang seiring penyedia mengubah redaksi pemblokiran mereka. Salinan
> resminya adalah `ACCOUNT_DEACTIVATED_SIGNALS` di `open-sse/services/accountFallback.ts`;
> anggap blok di atas sebagai snapshot.

Dua tabel sinyal **terpisah** yang berdekatan berada dalam file yang sama dan _bukan_ bagian
dari deteksi kata kunci pemblokiran:

- `CREDITS_EXHAUSTED_SIGNALS` — tagihan/kuota habis (`insufficient_quota`,
  `credit_balance_too_low`, `payment required`, …) → terminal `credits_exhausted`.
- `OAUTH_INVALID_TOKEN_SIGNALS` — **nonterminal**; penyegaran token dapat memulihkannya.

Catatan: frasa transien umum seperti **`rate limit`** / `429` ditangani oleh jalur
batas laju / cooldown koneksi dan **bukan** merupakan sinyal pemblokiran.

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
