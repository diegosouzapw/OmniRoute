# Error Message Sanitization (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../security/ERROR_SANITIZATION.md) · 🇪🇹 [am](../../../am/docs/security/ERROR_SANITIZATION.md) · 🇸🇦 [ar](../../../ar/docs/security/ERROR_SANITIZATION.md) · 🇦🇿 [az](../../../az/docs/security/ERROR_SANITIZATION.md) · 🇧🇬 [bg](../../../bg/docs/security/ERROR_SANITIZATION.md) · 🇧🇩 [bn](../../../bn/docs/security/ERROR_SANITIZATION.md) · 🇨🇿 [cs](../../../cs/docs/security/ERROR_SANITIZATION.md) · 🇩🇰 [da](../../../da/docs/security/ERROR_SANITIZATION.md) · 🇩🇪 [de](../../../de/docs/security/ERROR_SANITIZATION.md) · 🇬🇷 [el](../../../el/docs/security/ERROR_SANITIZATION.md) · 🇪🇸 [es](../../../es/docs/security/ERROR_SANITIZATION.md) · 🇪🇪 [et](../../../et/docs/security/ERROR_SANITIZATION.md) · 🇮🇷 [fa](../../../fa/docs/security/ERROR_SANITIZATION.md) · 🇫🇮 [fi](../../../fi/docs/security/ERROR_SANITIZATION.md) · 🇫🇷 [fr](../../../fr/docs/security/ERROR_SANITIZATION.md) · 🇮🇪 [ga](../../../ga/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [gu](../../../gu/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ha](../../../ha/docs/security/ERROR_SANITIZATION.md) · 🇮🇱 [he](../../../he/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [hi](../../../hi/docs/security/ERROR_SANITIZATION.md) · 🇭🇷 [hr](../../../hr/docs/security/ERROR_SANITIZATION.md) · 🇭🇺 [hu](../../../hu/docs/security/ERROR_SANITIZATION.md) · 🇦🇲 [hy](../../../hy/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ig](../../../ig/docs/security/ERROR_SANITIZATION.md) · 🇮🇹 [it](../../../it/docs/security/ERROR_SANITIZATION.md) · 🇯🇵 [ja](../../../ja/docs/security/ERROR_SANITIZATION.md) · 🇬🇪 [ka](../../../ka/docs/security/ERROR_SANITIZATION.md) · 🇰🇭 [km](../../../km/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [kn](../../../kn/docs/security/ERROR_SANITIZATION.md) · 🇰🇷 [ko](../../../ko/docs/security/ERROR_SANITIZATION.md) · 🇱🇹 [lt](../../../lt/docs/security/ERROR_SANITIZATION.md) · 🇱🇻 [lv](../../../lv/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ml](../../../ml/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [mr](../../../mr/docs/security/ERROR_SANITIZATION.md) · 🇲🇾 [ms](../../../ms/docs/security/ERROR_SANITIZATION.md) · 🇲🇹 [mt](../../../mt/docs/security/ERROR_SANITIZATION.md) · 🇲🇲 [my](../../../my/docs/security/ERROR_SANITIZATION.md) · 🇳🇵 [ne](../../../ne/docs/security/ERROR_SANITIZATION.md) · 🇳🇱 [nl](../../../nl/docs/security/ERROR_SANITIZATION.md) · 🇳🇴 [no](../../../no/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [or](../../../or/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [pa](../../../pa/docs/security/ERROR_SANITIZATION.md) · 🇵🇭 [phi](../../../phi/docs/security/ERROR_SANITIZATION.md) · 🇵🇱 [pl](../../../pl/docs/security/ERROR_SANITIZATION.md) · 🇵🇹 [pt](../../../pt/docs/security/ERROR_SANITIZATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/ERROR_SANITIZATION.md) · 🇷🇴 [ro](../../../ro/docs/security/ERROR_SANITIZATION.md) · 🇷🇺 [ru](../../../ru/docs/security/ERROR_SANITIZATION.md) · 🇱🇰 [si](../../../si/docs/security/ERROR_SANITIZATION.md) · 🇸🇰 [sk](../../../sk/docs/security/ERROR_SANITIZATION.md) · 🇸🇮 [sl](../../../sl/docs/security/ERROR_SANITIZATION.md) · 🇷🇸 [sr](../../../sr/docs/security/ERROR_SANITIZATION.md) · 🇸🇪 [sv](../../../sv/docs/security/ERROR_SANITIZATION.md) · 🇰🇪 [sw](../../../sw/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ta](../../../ta/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [te](../../../te/docs/security/ERROR_SANITIZATION.md) · 🇹🇭 [th](../../../th/docs/security/ERROR_SANITIZATION.md) · 🇹🇷 [tr](../../../tr/docs/security/ERROR_SANITIZATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/ERROR_SANITIZATION.md) · 🇵🇰 [ur](../../../ur/docs/security/ERROR_SANITIZATION.md) · 🇺🇿 [uz](../../../uz/docs/security/ERROR_SANITIZATION.md) · 🇻🇳 [vi](../../../vi/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [yo](../../../yo/docs/security/ERROR_SANITIZATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/ERROR_SANITIZATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/ERROR_SANITIZATION.md)

---

> **Sumber acuan:** `open-sse/utils/errorSanitization.ts`,
> `open-sse/utils/errorPathRedaction.ts`, dan builder publik di `open-sse/utils/error.ts`
> **Pengujian:** `tests/unit/error-message-sanitization.test.ts`,
> `tests/unit/error-public-boundaries-hardening.test.ts`
> **Terakhir diperbarui:** 2026-09-02 — v3.8.51
> **Audiens:** Setiap engineer yang menangani respons error (route HTTP, stream SSE, eksekutor, handler MCP).
> **Status:** **WAJIB** untuk setiap jalur kode yang mengembalikan pesan error kepada klien.

## Mengapa ini diperlukan

Aturan CodeQL `js/stack-trace-exposure` (CWE-209) menandai setiap jalur kode tempat pesan error yang berasal dari exception runtime mencapai respons HTTP / SSE tanpa disanitasi. Stack trace dan path file absolut dalam respons produksi memberi penyerang:

- Tata letak direktori internal (`/srv/app/src/lib/...`) → pengintaian untuk serangan lebih lanjut.
- Versi library / framework yang disimpulkan dari frame stack → pemilihan eksploit yang ditargetkan.
- Nilai runtime sensitif yang mungkin diinterpolasikan sebagai string ke dalam error (kueri DB, nilai konfigurasi).

Helper `sanitizeErrorMessage` yang diekspor oleh `open-sse/utils/error.ts` menghapus kategori
kebocoran berikut:

1. Ekor frame stack JavaScript yang berbentuk fisik, terserialisasi, dan inline secara jelas.
2. Path sistem file absolut POSIX, Windows, UNC, dan `file://`, sembari mempertahankan URL HTTPS yang aman
   serta route API yang ditandai secara eksplisit.
3. Penetapan kredensial, format token provider yang umum, blok PEM private key, dan URL data base64.

Sanitizer membatasi panjang input dan gagal secara tertutup ketika nilai yang dilempar menolak koersi string.
Sanitasi JSON upstream secara rekursif juga menghapus key kredensial/path yang tidak aman, alias sesi, dan
key pengendali prototipe sebelum respons diserialisasi.

## Pola wajib

### 1. Membuat respons error (route HTTP / API)

Gunakan `buildErrorBody()` — sanitasi sudah terintegrasi:

```ts
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

export async function POST(req: Request) {
  try {
    // ... logika handler ...
  } catch (err) {
    return new Response(JSON.stringify(buildErrorBody(500, String(err))), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

Atau, untuk wrapper praktis dalam modul yang sama:

```ts
import {
  errorResponse, // objek Response sekali pakai
  writeStreamError, // writer SSE
  createErrorResult, // bentuk { success: false, status, response, ... }
  unavailableResponse, // menambahkan Retry-After
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

Semuanya menerapkan batas error publik kanonis. `errorResponse`, `writeStreamError`, dan
`createErrorResult` diteruskan melalui `buildErrorBody`; ketiga helper khusus retry/sirkuit
memproyeksikan dan menyanitasi konteks publiknya secara langsung. **Anda tidak perlu memanggil
`sanitizeErrorMessage` secara manual** saat menggunakan helper ini.

### 2. Envelope error khusus (jarang)

Jika Anda tidak dapat menggunakan helper di atas (misalnya, bentuk respons ditentukan oleh protokol upstream seperti Connect-RPC), impor `sanitizeErrorMessage` secara langsung:

```ts
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

const body = JSON.stringify({
  error: {
    message: sanitizeErrorMessage(rawMessage),
    type: "invalid_request_error",
    code: "",
  },
});
```

Ini adalah satu-satunya cara yang diizinkan untuk menyusun body error khusus. Lihat `open-sse/executors/cursor.ts::buildErrorResponse` sebagai implementasi referensi.

### 3. Logging vs. merespons

Exception internal tepercaya dapat mempertahankan pesan dan stack lengkapnya agar operator dapat melakukan debug. Nilai
yang berasal dari batas provider, validasi, sesi browser, atau yang berdekatan dengan kredensial harus
disanitasi sebelum masuk ke output konsol, metadata audit, atau log panggilan persisten. Pola:

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "handler failed"); // khusus exception internal tepercaya
  return errorResponse(500, getErrorMessage(err)); // disanitasi — dikirim ke klien
}
```

Untuk kegagalan yang dikendalikan provider, proyeksikan juga nilai yang dicatat ke log:

```ts
log.error({ message: sanitizeErrorMessage(err) || "Provider request failed" });
```

### 4. Pola yang dilarang

❌ **Jangan pernah** memasukkan output exception mentah ke dalam body Response:

```ts
// BURUK: stack trace + path file mencapai klien
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ **Jangan pernah** membuat sendiri pemisah baris pertama:

```ts
// BURUK: lupa menghapus path absolut, dapat menyimpang dari helper kanonis
const safe = String(err).split("\n")[0];
```

❌ **Jangan pernah** melakukan sanitasi di route lalu melupakan jalur SSE. Apa pun yang menulis ke stream harus melalui `writeStreamError` (atau `buildErrorBody` yang mendasarinya).

❌ **Jangan pernah** secara sengaja menyertakan `process.cwd()`, `__filename`, `__dirname`, atau path yang berasal dari environment
dalam pesan error. Sanitizer mencakup path absolut sebagai pertahanan berlapis, tetapi pemanggil tidak boleh
membuat pesan yang mengandung informasi topologi sejak awal.

## Cakupan di CI

`tests/unit/error-message-sanitization.test.ts` memastikan:

- Setiap rute di bawah `/api/model-combo-mappings/*` mengembalikan isi respons yang telah disanitasi pada 4xx/5xx.
- `sanitizeErrorMessage` menghapus stack trace multibaris.
- `sanitizeErrorMessage` mengganti path absolut POSIX dan Windows dengan `<path>`.
- `sanitizeErrorMessage` menangani input instance `null`/`undefined`/`Error` secara aman.
- `buildErrorBody` tidak pernah mengekspos stack trace dalam bidang `message` miliknya.

Saat menambahkan rute atau eksekutor baru, salin pola asersi dari file ini. Gerbang cakupan (`npm run test:coverage`) memberlakukan ≥60% pernyataan/baris/fungsi/cabang — jalur galat harus dicakup.

## Kontrol terkait

- Peringatan CodeQL `js/stack-trace-exposure` di `.github/security` harus selalu **diperbaiki** melalui helper ini **atau** ditutup dengan komentar yang merujuk dokumen ini.
- Konfigurasi redaksi `pino` (`src/shared/utils/logRedaction.ts`) menangani log terstruktur tepercaya
  secara terpisah. Dokumen ini mencakup pesan respons publik dan nilai yang dikendalikan penyedia yang
  melintasi batas panggilan persisten/log proksi.
- Daftar larangan header upstream (`src/shared/constants/upstreamHeaders.ts`) mencakup kebocoran header — pastikan kedua file tetap selaras saat menambahkan masalah eksfiltrasi baru.

## Penerusan detail upstream

`buildErrorBody` menerima argumen ketiga opsional `upstreamDetails` (isi mentah
yang diurai dari penyedia upstream). Jika diberikan, nilai tersebut disanitasi oleh
`sanitizeUpstreamDetails` sebelum disertakan dalam respons sebagai `upstream_details`.

Argumen keempat opsional `classification`
(`{ type?: string; code?: string; reason?: string }`) menerima klasifikasi publik eksplisit.
Setiap bidang dipetakan ke kosakata pengidentifikasi publik yang terbatas. Nilai yang tidak aman, menyerupai kredensial,
mengandung karakter kontrol, atau terlalu panjang akan kembali ke tipe/kode yang diturunkan dari status; alasan opsional
yang tidak aman akan dihilangkan. Pengidentifikasi status HTTP tiga digit (`100` hingga `599`) tetap valid untuk
kontrak penyedia yang mengekspos status upstream numerik sebagai kode yang dapat dibaca mesin. Rentang terbatas yang sama
diterima dalam bentuk placeholder status HTTP yang dihasilkan secara lokal; angka dan nama penyedia sembarang
tetap berada di luar kosakata.

Teruskan setiap klasifikasi eksplisit dalam argumen keempat tersebut. Jangan pernah menimpa
`body.error.code`, `body.error.type`, atau `body.error.reason` setelah `buildErrorBody()` mengembalikan hasil;
mutasi setelah builder melewati proyeksi publik.

Aturan sanitasi yang diterapkan pada `upstreamDetails`:

1. Nilai string terminal: diproses melalui `sanitizeErrorMessage` (menghapus stack + path absolut).
2. Kunci path, kredensial, alias sesi, dan kontrol prototipe yang tidak aman akan dihapus.
3. Batas kedalaman: struktur bersarang melebihi 4 tingkat diganti dengan string `"[truncated]"`.
4. Array dibatasi hingga 32 elemen.

Hanya lokasi pemanggilan yang memiliki isi galat penyedia yang telah diurai yang boleh meneruskan `upstreamDetails`. Galat internal OmniRoute
(kegagalan penguraian SSE, konten kosong, blokir guardrail) tidak boleh menyertakannya.

JANGAN meneruskan `err.stack`, `err.message`, atau string mentah apa pun dari pengecualian runtime ke
`upstreamDetails`. Nilai tersebut tetap harus diproses melalui `errorResponse` / `buildErrorBody(code, msg)`
tanpa isi upstream.

Penerusan selektif 4xx upstream mempertahankan bentuk JSON aman dan susunan kata dari penyedia yang diperlukan oleh
pemulihan otomatis klien, tetapi ini bukan penerusan byte demi byte: sanitizer rekursif selalu dijalankan
sebelum serialisasi. Isi yang siklik, mengandung BigInt, atau memiliki `toJSON()` berbahaya akan ditolak secara tertutup dan tidak
memenuhi syarat untuk diteruskan. OCR dan moderasi menerapkan aturan yang sama; isi upstream non-JSON, kosong, atau
berlabel keliru dikonversi menjadi selubung galat JSON OmniRoute kanonis.

## Keterbatasan CodeQL yang diketahui: sanitizer kustom tidak dikenali

Kueri CodeQL [`js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/) menggunakan daftar izin tetap untuk pola sanitizer (misalnya `.split("\n")[0]` inline, `String#replace` dengan bentuk regex tertentu, akses ke `.message` pada `Error`). Kueri tersebut **tidak** mengenali pemanggilan tidak langsung melalui helper kustom seperti `sanitizeErrorMessage()` milik kita.

Artinya, callsite yang terbukti melakukan sanitasi melalui modul ini — misalnya `open-sse/utils/error.ts::errorResponse` dan `open-sse/executors/cursor.ts::buildErrorResponse` — mungkin tetap memunculkan peringatan meskipun kode tersebut aman secara fungsional. Preseden penolakan: `#224`, `#231` (Mei 2026), keduanya ditandai sebagai `false positive` dengan justifikasi teknis.

**Cara menangani kemunculan baru:**

1. Pastikan callsite benar-benar meneruskan pesan melalui `sanitizeErrorMessage` / `buildErrorBody` / salah satu wrapper yang didokumentasikan di atas (baca seluruh rantai pemanggilan dari awal hingga akhir — jangan hanya memercayai komentar).
2. Pastikan `tests/unit/error-message-sanitization.test.ts` menguji jalur tersebut (atau tambahkan cakupan pengujian).
3. Tolak peringatan melalui `gh api ... -X PATCH state=dismissed -f 'dismissed_reason=false positive'` dengan merujuk dokumen ini.
4. **Jangan** melakukan "perbaikan" dengan menyisipkan `.split("\n")[0]` secara inline di mana-mana — helper tersebut merupakan satu-satunya sumber acuan; menduplikasi pola itu melemahkan sanitizer (menghilangkan penghapusan path, batas panjang, dan koersi tipe) hanya demi terlihat memuaskan pemindai.

Mengadopsi fitur yang memerlukan keikutsertaan eksplisit seperti konfigurasi sanitizer kustom [`@codeql/javascript-models`](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-javascript/) milik CodeQL merupakan solusi jangka panjang; hal tersebut berada di luar cakupan dokumen ini.

## Referensi

- [CWE-209: Pengungkapan Informasi Melalui Pesan Kesalahan](https://cwe.mitre.org/data/definitions/209.html)
- [CodeQL `js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)
- [OWASP: Lembar Panduan Penanganan Kesalahan](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- Commit yang memusatkan helper: `1a39c31f` — _fix(security): samarkan kredensial upstream publik + pusatkan sanitasi kesalahan_
