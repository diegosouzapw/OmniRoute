# Account-Ban / Banned-Keyword Detection (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../security/BAN_DETECTION.md) · 🇪🇹 [am](../../../am/docs/security/BAN_DETECTION.md) · 🇸🇦 [ar](../../../ar/docs/security/BAN_DETECTION.md) · 🇦🇿 [az](../../../az/docs/security/BAN_DETECTION.md) · 🇧🇬 [bg](../../../bg/docs/security/BAN_DETECTION.md) · 🇧🇩 [bn](../../../bn/docs/security/BAN_DETECTION.md) · 🇧🇦 [bs](../../../bs/docs/security/BAN_DETECTION.md) · 🇨🇿 [cs](../../../cs/docs/security/BAN_DETECTION.md) · 🇩🇰 [da](../../../da/docs/security/BAN_DETECTION.md) · 🇩🇪 [de](../../../de/docs/security/BAN_DETECTION.md) · 🇬🇷 [el](../../../el/docs/security/BAN_DETECTION.md) · 🇪🇸 [es](../../../es/docs/security/BAN_DETECTION.md) · 🇪🇪 [et](../../../et/docs/security/BAN_DETECTION.md) · 🇮🇷 [fa](../../../fa/docs/security/BAN_DETECTION.md) · 🇫🇮 [fi](../../../fi/docs/security/BAN_DETECTION.md) · 🇫🇷 [fr](../../../fr/docs/security/BAN_DETECTION.md) · 🇮🇪 [ga](../../../ga/docs/security/BAN_DETECTION.md) · 🇮🇳 [gu](../../../gu/docs/security/BAN_DETECTION.md) · 🇳🇬 [ha](../../../ha/docs/security/BAN_DETECTION.md) · 🇮🇱 [he](../../../he/docs/security/BAN_DETECTION.md) · 🇮🇳 [hi](../../../hi/docs/security/BAN_DETECTION.md) · 🇭🇷 [hr](../../../hr/docs/security/BAN_DETECTION.md) · 🇭🇺 [hu](../../../hu/docs/security/BAN_DETECTION.md) · 🇦🇲 [hy](../../../hy/docs/security/BAN_DETECTION.md) · 🇮🇩 [id](../../../id/docs/security/BAN_DETECTION.md) · 🇳🇬 [ig](../../../ig/docs/security/BAN_DETECTION.md) · 🇮🇹 [it](../../../it/docs/security/BAN_DETECTION.md) · 🇯🇵 [ja](../../../ja/docs/security/BAN_DETECTION.md) · 🇬🇪 [ka](../../../ka/docs/security/BAN_DETECTION.md) · 🇰🇭 [km](../../../km/docs/security/BAN_DETECTION.md) · 🇮🇳 [kn](../../../kn/docs/security/BAN_DETECTION.md) · 🇰🇷 [ko](../../../ko/docs/security/BAN_DETECTION.md) · 🇱🇹 [lt](../../../lt/docs/security/BAN_DETECTION.md) · 🇱🇻 [lv](../../../lv/docs/security/BAN_DETECTION.md) · 🇮🇳 [ml](../../../ml/docs/security/BAN_DETECTION.md) · 🇮🇳 [mr](../../../mr/docs/security/BAN_DETECTION.md) · 🇲🇹 [mt](../../../mt/docs/security/BAN_DETECTION.md) · 🇲🇲 [my](../../../my/docs/security/BAN_DETECTION.md) · 🇳🇵 [ne](../../../ne/docs/security/BAN_DETECTION.md) · 🇳🇱 [nl](../../../nl/docs/security/BAN_DETECTION.md) · 🇳🇴 [no](../../../no/docs/security/BAN_DETECTION.md) · 🇮🇳 [or](../../../or/docs/security/BAN_DETECTION.md) · 🇮🇳 [pa](../../../pa/docs/security/BAN_DETECTION.md) · 🇵🇭 [phi](../../../phi/docs/security/BAN_DETECTION.md) · 🇵🇱 [pl](../../../pl/docs/security/BAN_DETECTION.md) · 🇵🇹 [pt](../../../pt/docs/security/BAN_DETECTION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/BAN_DETECTION.md) · 🇷🇴 [ro](../../../ro/docs/security/BAN_DETECTION.md) · 🇷🇺 [ru](../../../ru/docs/security/BAN_DETECTION.md) · 🇱🇰 [si](../../../si/docs/security/BAN_DETECTION.md) · 🇸🇰 [sk](../../../sk/docs/security/BAN_DETECTION.md) · 🇸🇮 [sl](../../../sl/docs/security/BAN_DETECTION.md) · 🇷🇸 [sr](../../../sr/docs/security/BAN_DETECTION.md) · 🇸🇪 [sv](../../../sv/docs/security/BAN_DETECTION.md) · 🇰🇪 [sw](../../../sw/docs/security/BAN_DETECTION.md) · 🇮🇳 [ta](../../../ta/docs/security/BAN_DETECTION.md) · 🇮🇳 [te](../../../te/docs/security/BAN_DETECTION.md) · 🇹🇭 [th](../../../th/docs/security/BAN_DETECTION.md) · 🇹🇷 [tr](../../../tr/docs/security/BAN_DETECTION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/BAN_DETECTION.md) · 🇵🇰 [ur](../../../ur/docs/security/BAN_DETECTION.md) · 🇺🇿 [uz](../../../uz/docs/security/BAN_DETECTION.md) · 🇻🇳 [vi](../../../vi/docs/security/BAN_DETECTION.md) · 🇳🇬 [yo](../../../yo/docs/security/BAN_DETECTION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/BAN_DETECTION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/BAN_DETECTION.md)

---

OmniRoute mengimbas respons ralat huluan untuk mencari isyarat yang menunjukkan bahawa
**akaun penyedia telah mati secara kekal** (digantung / dinyahaktifkan / disekat kerana ToS) dan, apabila
padanan ditemui, memindahkan sambungan tersebut kepada **keadaan terminal `banned`** supaya ia tidak
lagi dipilih untuk permintaan. Inilah yang dikonfigurasikan oleh kad tetapan **Security → Banned Keywords**
("Kata kunci tambahan yang mencetuskan pengesanan sekatan akaun kekal. Kata kunci terbina dalam
sentiasa digunakan.").

Halaman ini mendokumentasikan senarai terbina dalam, aliran pengesanan, skopnya, cara menambahkan
kata kunci tersuai dengan selamat dan cara memulihkan sambungan yang ditandai. Keadaan terminal
itu sendiri merupakan sebahagian daripada model ketahanan — lihat
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md) ("Keadaan terminal").

**Sumber rujukan utama:** `open-sse/services/accountFallback.ts`
(`ACCOUNT_DEACTIVATED_SIGNALS`, `getMergedBannedSignals()`, `isAccountDeactivated()`).

## Kata kunci terbina dalam

8 subrentetan ini sentiasa digunakan (tanpa mengira huruf besar atau kecil), tanpa mengira sebarang senarai tersuai:

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

> Senarai ini berkembang apabila penyedia mengubah kata-kata yang digunakan untuk sekatan. Salinan
> berwibawa ialah `ACCOUNT_DEACTIVATED_SIGNALS` dalam `open-sse/services/accountFallback.ts`;
> anggap blok di atas sebagai petikan semasa.

Dua jadual isyarat bersebelahan yang **berasingan** berada dalam fail yang sama dan _bukan_ sebahagian
daripada pengesanan kata kunci sekatan:

- `CREDITS_EXHAUSTED_SIGNALS` — pengebilan/kuota habis (`insufficient_quota`,
  `credit_balance_too_low`, `payment required`, …) → terminal `credits_exhausted`.
- `OAUTH_INVALID_TOKEN_SIGNALS` — **bukan terminal**; penyegaran token boleh memulihkannya.

Nota: frasa sementara yang lazim seperti **`rate limit`** / `429` dikendalikan oleh
laluan had kadar / tempoh bertenang sambungan dan **bukan** isyarat sekatan.

## Aliran pengesanan

```
respons ralat huluan
  → badan ditukar kepada rentetan + huruf kecil
  → isAccountDeactivated(body): getMergedBannedSignals().some(sig => body.includes(sig))   [padanan subrentetan]
  → sepadan?
      → connection testStatus = "banned"      (kekal — tempoh bertenang 1 tahun, tidak pernah pulih secara automatik)
      → jika tetapan `autoDisableBannedAccounts` dihidupkan dan `autoDisableBannedScope`
        merangkumi sambungan ini (`all`, atau `subscription` untuk OAuth/kuki/sesi)
        → turut menetapkan isActive = false. Kunci API prabayar kekal aktif apabila skop ialah
        `subscription`.
      → sambungan dilangkau semasa pemilihan akaun (status QUOTA_BLOCKING kombo)
```

- Padanan tersebut ialah carian **subrentetan tanpa mengira huruf besar atau kecil** pada **badan**
  respons (`isAccountDeactivated`, `accountFallback.ts`).
- Penetapan terminal `banned` yang kekal dicetuskan oleh badan dengan isyarat sekatan pada **sebarang
  status HTTP** (melalui `markAccountUnavailable` → `checkFallbackError`). Label
  **`deactivated`** yang lebih khusus (`isActive=false` apabila sambungan tidak mempunyai
  kunci API simpanan) ditulis oleh laluan sebaris `chatCore.ts` pada **HTTP 401 / 403**
  (diklasifikasikan melalui `classifyProviderError` → `ACCOUNT_DEACTIVATED`). Harap maklum bahawa
  laluan `markAccountUnavailable()` menulis status terminal yang _berbeza_ —
  **`expired`** — untuk isyarat `ACCOUNT_DEACTIVATED` yang sama (melalui
  `resolveTerminalConnectionStatus`), maka sekatan yang sama boleh dipaparkan sama ada sebagai
  `deactivated` atau `expired` bergantung pada laluan yang mengendalikan respons tersebut. (Komen
  kod yang lebih lama menyatakan "apabila badan 401 mengandungi rentetan ini" — pernyataan itu
  kurang menggambarkan tingkah laku semasa.)
- Sambungan `banned` dikecualikan daripada pemilihan di semua tempat yang menapis status terminal
  (`isTerminalConnectionStatus`, `QUOTA_BLOCKING_CONNECTION_STATUSES` kombo).

## Skop — penyedia yang diimbas

**Semua penyedia.** Semakan dijalankan dalam saluran pengendalian ralat generik yang
dilalui oleh setiap permintaan huluan yang gagal — ia **tidak** dihadkan kepada
pengikis OAuth/langganan. Keadaan terminal yang terhasil adalah bagi setiap
**sambungan**, bukan bagi setiap penyedia.

Walau bagaimanapun, _rentetan_ terbina dalam berorientasikan penyedia
langganan/OAuth yang mempunyai risiko sekatan sebenar (ChatGPT Web Codex, Claude
Web, Codex, Muse Spark, Antigravity). Penyedia kunci API hanya akan mencetuskan
pengesan jika kandungan ralatnya benar-benar mengandungi salah satu subrentetan
tersebut.

`autoDisableBannedScope` (`all` | `subscription`, lalai `all`) mengawal sama ada
padanan turut menukar `isActive=false`. `subscription` bermaksud tempat duduk
jenis log masuk (langganan berbayar dan akaun percuma, termasuk sesi kuki web).
Ia masih merekodkan `testStatus=banned` untuk kunci API prabayar tetapi
membiarkannya dalam kumpulan penghalaan. Reka bentuk jangka panjang ialah
penggantian bagi setiap penyedia dan setiap akaun; enum global ialah pelaksanaan
awal.

## Kata kunci sekatan tersuai

Tambah atau alih keluar kata kunci dalam **Security → Banned Keywords** (dikekalkan
sebagai tetapan global `customBannedSignals` melalui `PATCH /api/settings`). Kata
kunci tersebut **ditambahkan kepada** senarai terbina dalam — bukan sebagai
pengganti — dan dimuat semula secara langsung apabila disimpan (serta semasa
permulaan) melalui `setCustomBannedSignals()`. Setiap kata kunci dihadkan kepada
200 aksara; tiada had panjang tatasusunan.

**⚠ Risiko positif palsu — pilih frasa yang khusus.** Pengesanan menggunakan
padanan subrentetan mentah pada keseluruhan kandungan respons, dan padanan adalah
**kekal** (tempoh bertenang 1 tahun, pemulihan manual). Kata kunci yang terlalu
umum boleh menyekat sambungan yang sebenarnya berfungsi dengan baik:

- **Tidak baik:** `quota`, `limit`, `error`, `denied` — muncul dalam banyak ralat sementara.
- **Baik:** ayat sekatan penuh, contohnya `your account has been suspended for`,
  `account permanently banned`, `violation of our terms`.

Utamakan frasa jelas yang paling panjang yang dikembalikan oleh penyedia apabila
sekatan sebenar berlaku. Jika ragu-ragu, perhatikan `lastError` sambungan terlebih
dahulu, kemudian tambahkan perkataan yang tepat.

## Memulihkan sambungan yang ditandai

Keadaan terminal `banned` / `deactivated` **tidak pernah pulih secara automatik**
(keadaan tersebut dikecualikan daripada detik pemulihan proaktif — hanya tempoh
bertenang `unavailable` pulih dengan sendiri). Pengendali mesti
mengosongkannya secara jelas:

1. **Uji semula sambungan** — tindakan **Test** pada papan pemuka
   (`POST /api/providers/{id}/test`); pemeriksaan yang berjaya menetapkan semula
   `testStatus` kepada `active` dan mengosongkan medan ralat.
2. **Sahkan semula / edit kelayakan** — untuk penyedia OAuth, jalankan semula aliran
   log masuk / muat semula; laluan penciptaan/import penyedia menetapkan
   `isActive = true`.
3. **Dayakan semula sambungan** — jika penyahdayaan automatik menetapkan
   `isActive = false` (skop `all`, atau `subscription` untuk sambungan
   OAuth/kuki/sesi), hidupkan semula selepas membetulkan akaun.

Tiada butang "kosongkan bendera sekatan" yang berasingan — pemulihan dilakukan
melalui ujian semula, pengesahan semula atau pendayaan semula, selaras dengan
peraturan umum keadaan terminal dalam
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md).

## Pengasingan pemeriksaan (uji semua model)

**Kegagalan berpunca daripada pemeriksaan** (penghantaran uji semua
model / semakan kesihatan yang dilaksanakan dalam `runAsProbe`) tidak sekali-kali
mengalih keluar sambungan daripada kumpulan (#9817): kegagalan itu
**direkodkan untuk keterlihatan** (`last_error`, `last_error_type`, `error_code`,
`last_error_at`) tetapi melangkau **setiap** perubahan penghalaan — tempoh
bertenang, status terminal (`banned` / `deactivated` / `credits_exhausted`),
penguncian bagi setiap model, pemutus litar penyedia, cache kuota 5 minit, muat
semula token OAuth dan penyahdayaan automatik. Hanya kegagalan pada laluan
permintaan sebenar akan menyahaktifkan sambungan. Ralat yang direkodkan itulah
yang menjadikan akaun bertanda kelihatan pada papan pemuka sementara akaun
tersebut terus menyediakan trafik.

Titik keputusan tunggal ialah `shouldIsolateProbeFailures()`
(`src/shared/utils/probeOrigin.ts`), yang dirujuk oleh **setiap** tempat yang
boleh mengubah keadaan penghalaan akibat kegagalan berpunca daripada pemeriksaan:

- `markAccountUnavailable` (`auth.ts`) — rekod sahaja (teks mentah `lastError`,
  `lastErrorType`, `errorCode`, `lastErrorAt`; sengaja **tanpa**
  `backoffLevel`, yang akan mencetuskan penyusutan automatik semasa pemilihan dan
  memadamkan rekod)
- `maybeAutoDisableBannedAccount` — tiada penyahdayaan automatik
- `chatCore` — FORBIDDEN, ACCOUNT_DEACTIVATED, QUOTA_EXHAUSTED (rekod sahaja,
  tiada terminal `credits_exhausted`), GEO_BLOCKED (tiada pengecualian 24 jam),
  MODEL_NOT_FOUND (tiada `lockModel`), pertukaran ganti penggiliran akaun codex
  429 (tiada `markCodexScopeRateLimited`, tiada `rate_limited_until` yang
  dikekalkan, tiada pengosongan afiniti sesi), `persistCodexQuotaState` (tiada
  penulisan keadaan kuota, tiada pembatalan cache), `recordKeyHealthStatus`
  (penggiliran kesihatan kunci tidak disentuh)
- Muat semula OAuth — kedua-dua muat semula proaktif dalam asas pelaksana
  (`base.ts` `execute()`, tiada penggiliran token muat semula digunakan) dan
  laluan reaktif 401/403 dalam `chatCore` (tiada penyahaktifan `expired`)
- `chat.ts` — pemutus litar penyedia dan cache kuota 5 minit
  (`markAccountExhaustedFrom429`) tidak pernah dijejaskan

Ralat yang direkodkan itulah yang menjadikan akaun bertanda kelihatan pada papan
pemuka sementara akaun tersebut terus menyediakan trafik. Nota: rekod
pemeriksaan menyimpan teks ralat **mentah** (tanpa dipotong), tidak seperti
pemotongan `slice(0,100)` pada laluan sebenar.

Pengendali yang menggunakan uji semua sebagai alat penyelenggaraan boleh
memulihkan tingkah laku terdahulu (pemeriksaan dikira sebagai penjanaan sebenar)
melalui salah satu cara berikut:

- tetapan `probeCanDisable` (`POST /api/settings` dengan
  `{"probeCanDisable": true}`, atau edit DB `key_value` secara langsung), atau
- bendera ciri **`PROBE_CAN_DISABLE=true`** (penggantian env atau DB; mengatasi
  tetapan).

Selamat gagal: jika carian bendera atau tetapan menimbulkan ralat, pengasingan
kekal AKTIF.

## Fail sumber

| Perkara                                 | Fail                                                                                                          |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Jadual isyarat + pemadanan              | `open-sse/services/accountFallback.ts`                                                                        |
| Penamatan / pengekalan                  | `src/sse/services/auth.ts` (`markAccountUnavailable`, `resolveTerminalConnectionStatus`, `clearAccountError`) |
| Skop nyahdaya automatik                 | `src/shared/utils/autoDisableBanned.ts`, `src/sse/services/autoDisableBannedAccount.ts`                       |
| Pengelasan sebaris                      | `open-sse/handlers/chatCore.ts`, `open-sse/services/errorClassifier.ts`                                       |
| Pengecualian pemulihan keadaan terminal | `src/lib/quota/connectionRecovery.ts`                                                                         |
| Pemuatan masa jalan kata kunci tersuai  | `src/lib/config/runtimeSettings.ts` (`setCustomBannedSignals`)                                                |
| UI tetapan                              | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`                                           |
