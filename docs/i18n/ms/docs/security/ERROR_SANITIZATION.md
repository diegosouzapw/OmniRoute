# Error Message Sanitization (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../security/ERROR_SANITIZATION.md) · 🇪🇹 [am](../../../am/docs/security/ERROR_SANITIZATION.md) · 🇸🇦 [ar](../../../ar/docs/security/ERROR_SANITIZATION.md) · 🇦🇿 [az](../../../az/docs/security/ERROR_SANITIZATION.md) · 🇧🇬 [bg](../../../bg/docs/security/ERROR_SANITIZATION.md) · 🇧🇩 [bn](../../../bn/docs/security/ERROR_SANITIZATION.md) · 🇧🇦 [bs](../../../bs/docs/security/ERROR_SANITIZATION.md) · 🇨🇿 [cs](../../../cs/docs/security/ERROR_SANITIZATION.md) · 🇩🇰 [da](../../../da/docs/security/ERROR_SANITIZATION.md) · 🇩🇪 [de](../../../de/docs/security/ERROR_SANITIZATION.md) · 🇬🇷 [el](../../../el/docs/security/ERROR_SANITIZATION.md) · 🇪🇸 [es](../../../es/docs/security/ERROR_SANITIZATION.md) · 🇪🇪 [et](../../../et/docs/security/ERROR_SANITIZATION.md) · 🇮🇷 [fa](../../../fa/docs/security/ERROR_SANITIZATION.md) · 🇫🇮 [fi](../../../fi/docs/security/ERROR_SANITIZATION.md) · 🇫🇷 [fr](../../../fr/docs/security/ERROR_SANITIZATION.md) · 🇮🇪 [ga](../../../ga/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [gu](../../../gu/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ha](../../../ha/docs/security/ERROR_SANITIZATION.md) · 🇮🇱 [he](../../../he/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [hi](../../../hi/docs/security/ERROR_SANITIZATION.md) · 🇭🇷 [hr](../../../hr/docs/security/ERROR_SANITIZATION.md) · 🇭🇺 [hu](../../../hu/docs/security/ERROR_SANITIZATION.md) · 🇦🇲 [hy](../../../hy/docs/security/ERROR_SANITIZATION.md) · 🇮🇩 [id](../../../id/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ig](../../../ig/docs/security/ERROR_SANITIZATION.md) · 🇮🇹 [it](../../../it/docs/security/ERROR_SANITIZATION.md) · 🇯🇵 [ja](../../../ja/docs/security/ERROR_SANITIZATION.md) · 🇬🇪 [ka](../../../ka/docs/security/ERROR_SANITIZATION.md) · 🇰🇭 [km](../../../km/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [kn](../../../kn/docs/security/ERROR_SANITIZATION.md) · 🇰🇷 [ko](../../../ko/docs/security/ERROR_SANITIZATION.md) · 🇱🇹 [lt](../../../lt/docs/security/ERROR_SANITIZATION.md) · 🇱🇻 [lv](../../../lv/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ml](../../../ml/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [mr](../../../mr/docs/security/ERROR_SANITIZATION.md) · 🇲🇹 [mt](../../../mt/docs/security/ERROR_SANITIZATION.md) · 🇲🇲 [my](../../../my/docs/security/ERROR_SANITIZATION.md) · 🇳🇵 [ne](../../../ne/docs/security/ERROR_SANITIZATION.md) · 🇳🇱 [nl](../../../nl/docs/security/ERROR_SANITIZATION.md) · 🇳🇴 [no](../../../no/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [or](../../../or/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [pa](../../../pa/docs/security/ERROR_SANITIZATION.md) · 🇵🇭 [phi](../../../phi/docs/security/ERROR_SANITIZATION.md) · 🇵🇱 [pl](../../../pl/docs/security/ERROR_SANITIZATION.md) · 🇵🇹 [pt](../../../pt/docs/security/ERROR_SANITIZATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/ERROR_SANITIZATION.md) · 🇷🇴 [ro](../../../ro/docs/security/ERROR_SANITIZATION.md) · 🇷🇺 [ru](../../../ru/docs/security/ERROR_SANITIZATION.md) · 🇱🇰 [si](../../../si/docs/security/ERROR_SANITIZATION.md) · 🇸🇰 [sk](../../../sk/docs/security/ERROR_SANITIZATION.md) · 🇸🇮 [sl](../../../sl/docs/security/ERROR_SANITIZATION.md) · 🇷🇸 [sr](../../../sr/docs/security/ERROR_SANITIZATION.md) · 🇸🇪 [sv](../../../sv/docs/security/ERROR_SANITIZATION.md) · 🇰🇪 [sw](../../../sw/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ta](../../../ta/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [te](../../../te/docs/security/ERROR_SANITIZATION.md) · 🇹🇭 [th](../../../th/docs/security/ERROR_SANITIZATION.md) · 🇹🇷 [tr](../../../tr/docs/security/ERROR_SANITIZATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/ERROR_SANITIZATION.md) · 🇵🇰 [ur](../../../ur/docs/security/ERROR_SANITIZATION.md) · 🇺🇿 [uz](../../../uz/docs/security/ERROR_SANITIZATION.md) · 🇻🇳 [vi](../../../vi/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [yo](../../../yo/docs/security/ERROR_SANITIZATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/ERROR_SANITIZATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/ERROR_SANITIZATION.md)

---

> **Sumber rujukan utama:** `open-sse/utils/errorSanitization.ts`,
> `open-sse/utils/errorPathRedaction.ts`, dan pembina awam dalam `open-sse/utils/error.ts`
> **Ujian:** `tests/unit/error-message-sanitization.test.ts`,
> `tests/unit/error-public-boundaries-hardening.test.ts`
> **Kemas kini terakhir:** 2026-09-02 — v3.8.51
> **Khalayak:** Mana-mana jurutera yang mengendalikan respons ralat (laluan HTTP, strim SSE, pelaksana, pengendali MCP).
> **Status:** **WAJIB** bagi setiap laluan kod yang mengembalikan mesej ralat kepada klien.

## Mengapa ini diperlukan

Peraturan CodeQL `js/stack-trace-exposure` (CWE-209) menandakan mana-mana laluan kod apabila mesej ralat yang berasal daripada pengecualian masa jalan sampai kepada respons HTTP / SSE tanpa disanitasikan. Jejak tindanan dan laluan fail mutlak dalam respons pengeluaran memberikan penyerang:

- Susun atur direktori dalaman (`/srv/app/src/lib/...`) → peninjauan untuk serangan selanjutnya.
- Versi pustaka / rangka kerja yang disimpulkan daripada bingkai tindanan → pemilihan eksploitasi yang disasarkan.
- Nilai masa jalan sensitif yang mungkin diinterpolasikan sebagai rentetan ke dalam ralat (pertanyaan DB, nilai konfigurasi).

Pembantu `sanitizeErrorMessage` yang dieksport oleh `open-sse/utils/error.ts` menyingkirkan kelas
kebocoran berikut:

1. Ekor bingkai tindanan JavaScript berbentuk fizikal, bersiri, dan sebaris yang tidak menimbulkan kekaburan.
2. Laluan sistem fail POSIX, Windows, UNC, dan `file://` mutlak, sambil mengekalkan URL HTTPS yang selamat
   dan laluan API yang ditandakan secara eksplisit.
3. Penetapan bukti kelayakan, format token penyedia yang lazim, blok PEM kunci peribadi, dan URL data base64.

Penyahsanitasi mengehadkan panjang input dan gagal secara tertutup apabila nilai yang dilontarkan menolak paksaan rentetan.
Penyahsanitasian JSON huluan secara rekursif turut menggugurkan kunci bukti kelayakan/laluan yang tidak selamat, alias sesi, dan
kunci kawalan prototaip sebelum respons disirikan.

## Corak wajib

### 1. Membina respons ralat (laluan HTTP / API)

Gunakan `buildErrorBody()` — penyahsanitasian terbina dalam:

```ts
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

export async function POST(req: Request) {
  try {
    // ... logik pengendali ...
  } catch (err) {
    return new Response(JSON.stringify(buildErrorBody(500, String(err))), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

Atau, untuk pembalut kemudahan dalam modul yang sama:

```ts
import {
  errorResponse, // objek Response sekali guna
  writeStreamError, // penulis SSE
  createErrorResult, // bentuk { success: false, status, response, ... }
  unavailableResponse, // menambahkan Retry-After
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

Semua ini menggunakan sempadan ralat awam berkanun. `errorResponse`, `writeStreamError`, dan
`createErrorResult` disalurkan melalui `buildErrorBody`; tiga pembantu cuba semula/litar khusus
mengunjurkan dan menyahsanitasi konteks awamnya secara langsung. **Anda tidak perlu memanggil
`sanitizeErrorMessage` secara manual** apabila menggunakan pembantu ini.

### 2. Sampul ralat tersuai (jarang digunakan)

Apabila anda tidak dapat menggunakan pembantu di atas (contohnya, bentuk respons ditentukan oleh protokol huluan seperti Connect-RPC), import `sanitizeErrorMessage` secara langsung:

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

Ini ialah satu-satunya cara yang dibenarkan untuk membina isi ralat tersuai. Lihat `open-sse/executors/cursor.ts::buildErrorResponse` untuk pelaksanaan rujukan.

### 3. Pengelogan berbanding pemberian respons

Pengecualian dalaman yang dipercayai boleh mengekalkan mesej dan jejak tindanan penuh supaya pengendali boleh menyahpepijat. Nilai
yang berasal dari sempadan penyedia, pengesahan, sesi pelayar, atau yang berdekatan dengan bukti kelayakan mesti
dinyahsanitasi sebelum dimasukkan ke dalam output konsol, metadata audit, atau log panggilan berterusan. Corak:

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "handler failed"); // pengecualian dalaman yang dipercayai sahaja
  return errorResponse(500, getErrorMessage(err)); // dinyahsanitasi — dihantar kepada klien
}
```

Untuk kegagalan yang dikawal oleh penyedia, unjurkan nilai yang dilog juga:

```ts
log.error({ message: sanitizeErrorMessage(err) || "Provider request failed" });
```

### 4. Corak yang dilarang

❌ **Jangan sekali-kali** meletakkan output pengecualian mentah dalam isi Response:

```ts
// BURUK: jejak tindanan + laluan fail sampai kepada klien
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ **Jangan sekali-kali** mencipta sendiri pemisah baris pertama:

```ts
// BURUK: terlupa menyingkirkan laluan mutlak, mungkin menyimpang daripada pembantu berkanun
const safe = String(err).split("\n")[0];
```

❌ **Jangan sekali-kali** menyahsanitasi dalam laluan tetapi terlupa laluan SSE. Apa-apa yang menulis kepada strim mesti melalui `writeStreamError` (atau `buildErrorBody` yang mendasarinya).

❌ **Jangan sekali-kali** memasukkan `process.cwd()`, `__filename`, `__dirname`, atau laluan yang diperoleh daripada persekitaran secara sengaja
dalam mesej ralat. Penyahsanitasi meliputi laluan mutlak sebagai pertahanan berlapis, tetapi pemanggil tidak boleh
membina mesej yang mendedahkan topologi sejak awal lagi.

## Liputan dalam CI

`tests/unit/error-message-sanitization.test.ts` menguatkuasakan:

- Setiap laluan di bawah `/api/model-combo-mappings/*` mengembalikan kandungan yang disanitasi bagi 4xx/5xx.
- `sanitizeErrorMessage` menyingkirkan surihan tindanan berbilang baris.
- `sanitizeErrorMessage` menggantikan laluan mutlak POSIX dan Windows dengan `<path>`.
- `sanitizeErrorMessage` mengendalikan input tika `null`/`undefined`/`Error` dengan selamat.
- `buildErrorBody` tidak pernah mendedahkan surihan tindanan dalam medan `message` miliknya.

Apabila menambah laluan atau pelaksana baharu, salin corak penegasan daripada fail ini. Ambang liputan (`npm run test:coverage`) menguatkuasakan ≥60% pernyataan/baris/fungsi/cabang — laluan ralat mesti diliputi.

## Kawalan berkaitan

- Makluman CodeQL `js/stack-trace-exposure` dalam `.github/security` hendaklah sentiasa **sama ada** dibetulkan melalui pembantu ini **atau** ditolak dengan ulasan yang merujuk dokumen ini.
- Konfigurasi penyuntingan `pino` (`src/shared/utils/logRedaction.ts`) mengendalikan log berstruktur yang dipercayai secara berasingan. Dokumen ini merangkumi mesej respons awam dan nilai dikawal penyedia yang merentasi sempadan panggilan/log proksi berterusan.
- Senarai larangan pengepala huluan (`src/shared/constants/upstreamHeaders.ts`) merangkumi kebocoran pengepala — pastikan kedua-dua fail diselaraskan apabila menambah kebimbangan pengekstrakan data yang baharu.

## Penerusan butiran huluan

`buildErrorBody` menerima argumen ketiga pilihan `upstreamDetails` (kandungan mentah yang dihuraikan daripada penyedia huluan). Apabila diberikan, ia disanitasi oleh `sanitizeUpstreamDetails` sebelum dimasukkan dalam respons sebagai `upstream_details`.

Argumen keempat pilihan `classification`
(`{ type?: string; code?: string; reason?: string }`) menerima pengelasan awam yang eksplisit.
Setiap medan dipetakan kepada perbendaharaan pengecam awam yang terbatas. Nilai yang tidak selamat, berbentuk kelayakan, mengandungi aksara kawalan, atau terlalu panjang akan kembali kepada jenis/kod yang diterbitkan daripada status; sebab pilihan yang tidak selamat akan ditinggalkan. Pengecam status HTTP tiga digit (`100` hingga `599`) kekal sah untuk kontrak penyedia yang mendedahkan status huluan berangka sebagai kod yang boleh dibaca mesin. Julat terbatas yang sama diterima dalam bentuk ruang letak status HTTP yang dijana secara setempat; nombor dan nama penyedia arbitrari kekal di luar perbendaharaan tersebut.

Hantar setiap pengelasan eksplisit dalam argumen keempat tersebut. Jangan sekali-kali menulis ganti `body.error.code`, `body.error.type`, atau `body.error.reason` selepas `buildErrorBody()` mengembalikan hasil;
mutasi selepas pembinaan memintas pemetaan awam.

Peraturan sanitasi yang digunakan pada `upstreamDetails`:

1. Nilai hujung rentetan: diproses melalui `sanitizeErrorMessage` (menyingkirkan tindanan + laluan mutlak).
2. Kunci laluan, kelayakan, alias sesi, dan kawalan prototaip yang tidak selamat dibuang.
3. Had kedalaman: penyarangan melebihi 4 aras digantikan dengan rentetan `"[truncated]"`.
4. Tatasusunan dihadkan kepada 32 elemen.

Hanya tapak panggilan dengan kandungan ralat penyedia yang telah dihuraikan patut menghantar `upstreamDetails`. Ralat dalaman OmniRoute (kegagalan penghuraian SSE, kandungan kosong, sekatan pengadang) tidak boleh menyertakannya.

JANGAN hantar `err.stack`, `err.message`, atau sebarang rentetan daripada pengecualian masa jalan yang mentah kepada `upstreamDetails`. Semua itu masih perlu melalui `errorResponse` / `buildErrorBody(code, msg)` tanpa kandungan huluan.

Penerusan terpilih 4xx huluan mengekalkan bentuk dan susunan kata JSON selamat penyedia yang diperlukan oleh pemulihan automatik klien, tetapi ia bukan penerusan bait demi bait: pensanitasi rekursif sentiasa dijalankan sebelum pensirian. Kandungan berkitar, mengandungi BigInt, atau mempunyai `toJSON()` yang berniat jahat akan gagal secara tertutup dan tidak layak untuk penerusan. OCR dan penyederhanaan menggunakan peraturan yang sama; kandungan huluan bukan JSON, kosong, atau tersalah label ditukar kepada sampul ralat JSON OmniRoute kanonik.

## Pengehadan CodeQL yang diketahui: pensanitasi tersuai tidak dikenali

Pertanyaan CodeQL [`js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/) menggunakan senarai dibenarkan tetap bagi corak pensanitasi (contohnya `.split("\n")[0]` sebaris, `String#replace` dengan bentuk ungkapan nalar tertentu, akses kepada `.message` pada `Error`). Ia **tidak** mengenali penghalaan tidak langsung melalui fungsi pembantu tersuai seperti `sanitizeErrorMessage()` kami.

Ini bermakna tapak panggilan yang terbukti menjalankan sanitasi melalui modul ini — contohnya `open-sse/utils/error.ts::errorResponse` dan `open-sse/executors/cursor.ts::buildErrorResponse` — mungkin terus mencetuskan amaran walaupun kod tersebut selamat dari segi fungsi. Penolakan terdahulu: `#224`, `#231` (Mei 2026), kedua-duanya ditandai sebagai `false positive` dengan justifikasi teknikal.

**Cara mengendalikan kejadian baharu:**

1. Sahkan bahawa tapak panggilan benar-benar menyalurkan mesej melalui `sanitizeErrorMessage` / `buildErrorBody` / salah satu pembalut yang didokumenkan di atas (baca rantaian panggilan dari awal hingga akhir — jangan percayai komen semata-mata).
2. Sahkan bahawa `tests/unit/error-message-sanitization.test.ts` menguji laluan tersebut (atau tambahkan liputan).
3. Tolak amaran melalui `gh api ... -X PATCH state=dismissed -f 'dismissed_reason=false positive'` dengan merujuk dokumen ini.
4. **Jangan** "baiki" dengan memasukkan `.split("\n")[0]` secara sebaris di merata-rata tempat — fungsi pembantu ialah sumber kebenaran tunggal; penduaan corak tersebut melemahkan pensanitasi (kehilangan pembersihan laluan, had panjang dan pemaksaan jenis) semata-mata untuk kelihatan seperti memenuhi kehendak pengimbas.

Penggunaan ciri ikut serta seperti [konfigurasi pensanitasi tersuai `@codeql/javascript-models`](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-javascript/) CodeQL ialah penyelesaian jangka panjang; perkara itu berada di luar skop dokumen ini.

## Rujukan

- [CWE-209: Pendedahan Maklumat Melalui Mesej Ralat](https://cwe.mitre.org/data/definitions/209.html)
- [CodeQL `js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)
- [OWASP: Helaian Rujukan Pengendalian Ralat](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- Komit yang memusatkan fungsi pembantu: `1a39c31f` — _fix(security): samarkan kelayakan upstream awam + pusatkan sanitasi ralat_
