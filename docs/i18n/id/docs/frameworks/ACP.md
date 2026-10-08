# ACP registry and registered CLI launchers (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

OmniRoute memisahkan **penemuan CLI**, **Agent Client Protocol native**, dan
**adaptor stdio lama**. Menemukan biner yang terinstal tidak membuktikan
autentikasi, kompatibilitas model, atau kesiapannya untuk menangani prompt.

Dasbor menggunakan `GET /api/acp/agents` dan `POST /api/acp/agents` untuk inventaris
dan pendaftaran agen khusus. Ini adalah rute manajemen khusus lokal, bukan
API publik untuk menjalankan proses atau mengirimkan prompt. `AcpManager`
internal tidak secara otomatis menjadi fallback penyedia HTTP.

## Kontrak yang terdaftar

`config/cli-tools-manifest.json` adalah sumber kebenaran untuk biner peluncuran
bawaan, argumen, dan mode backend. Registri memperoleh definisinya dari
manifes tersebut. Deteksi disimpan dalam cache selama 60 detik.

- `acp`: kontrak Gemini menjalankan `gemini --experimental-acp` dan berkomunikasi
  menggunakan ACP JSON-RPC yang dipisahkan oleh baris baru melalui SDK TypeScript resmi.
- `stdio-adapter`: kontrak terdaftar lainnya mempertahankan adaptor lama dengan input
  berbasis baris baru dan output melalui stdout. Periode idle output selama dua detik
  mengakhiri responsnya. Adaptor ini **tidak** menyatakan bahwa CLI tersebut
  mendukung ACP native.

Gemini mendokumentasikan flag peluncuran tersebut dalam [referensi CLI](https://geminicli.com/docs/cli/cli-reference/).
Klien menggunakan [SDK ACP resmi](https://github.com/agentclientprotocol/typescript-sdk)
untuk inisialisasi, pembuatan sesi, permintaan prompt, notifikasi, dan pembatalan.

Definisi agen khusus tetap merupakan kontrak peluncuran yang dikendalikan administrator.
Mendaftarkan biner dan argumen memberi proses tersebut hak eksekusi lokal milik
pengguna server; pendaftaran bukanlah sandbox. Probe versi hanya menerima
executable yang terdaftar dan flag versi yang dikenali.

## API peluncuran internal

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("gemini", {
  cwd: process.cwd(),
  // Hanya teruskan variabel penyedia yang secara sengaja ditetapkan untuk agen ini.
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
});

try {
  const response = await acpManager.sendPrompt(session.id, "Explain this project", 120_000);
  // Gunakan respons dalam aplikasi pemanggil.
} finally {
  acpManager.kill(session.id);
}
```

`spawn(agentId, options)` menentukan executable dan argumen dari definisi yang
terdaftar. Satu-satunya opsi pemanggil adalah `cwd` dan `env`; signature lama
`spawn(agentId, binary, args, env)` dan override executable ditolak.
Kontrak peluncuran HTTP tidak didukung oleh pengelola ini.

Proses anak mewarisi allowlist sistem operasi, terminal, locale, dan sertifikat
yang sama seperti peluncur CLI. Rahasia server/penyedia tidak disalin dari
environment induk. Kredensial yang dibutuhkan oleh CLI terpilih harus diteruskan
secara eksplisit atau disediakan melalui autentikasi lokal milik CLI tersebut.
Proses anak tetap memiliki izin sistem berkas pengguna lokal dan dapat membaca
konfigurasinya sendiri.

## Siklus hidup dan batas native

1. Jalankan biner yang terdaftar, inisialisasi ACP, dan buat sesi yang berakar
   pada direktori kerja yang dipilih. Inisialisasi memiliki batas sepuluh detik.
2. Kirimkan prompt dan kumpulkan notifikasi teks hanya untuk sesi tersebut.
   Penyelesaian ditentukan oleh respons RPC prompt, bukan periode tanpa keluaran stdout.
3. Gunakan satu tenggat waktu prompt, termasuk inisialisasi yang belum selesai;
   nilai default-nya adalah 120 detik. Prompt bersamaan dalam proses yang sama ditolak.
4. Saat timeout native terjadi, coba `session/cancel` dan hentikan proses.
   Jendela terbatas selama 100 ms memungkinkan notifikasi di-flush sebelum penghentian.
5. Tutup status transport dan hapus sesi ketika inisialisasi gagal, koneksi
   ditutup, proses berhenti, atau pemanggil menghentikannya.

Permintaan izin alat ditolak. Tidak ada kapabilitas klien sistem berkas atau
terminal yang diiklankan. Pembatasan ini tidak mengisolasi biner anak dalam sandbox
atau menggantikan pengaturan otorisasi milik CLI.

Baik teks native maupun stdout/stderr lama mempertahankan paling banyak 1 MiB karakter,
dengan menyimpan output terbaru disertai pemberitahuan pemotongan. Setiap frame wire
native dibatasi hingga 2 MiB byte sebelum parsing SDK. Buffer direset untuk setiap prompt.

`kill(sessionId)` mengirim SIGTERM, lalu SIGKILL setelah lima detik jika proses
belum berhenti. Timeout prompt lama melepaskan listener dan timer, tetapi membiarkan
sesi tetap tersedia untuk prompt lain; pemanggil tetap bertanggung jawab untuk
memanggil `kill()` atau `killAll()` setelah selesai.

## Peristiwa dan inspeksi

Pengelola memancarkan `stdout`, `stderr`, dan `exit`, masing-masing dengan `sessionId`.
`sessionError` melaporkan kesalahan transport yang telah disanitasi. Peristiwa
kompatibilitas `error` hanya dipancarkan ketika memiliki subscriber, sehingga biner
yang tidak ditemukan tidak dapat menyebabkan kesalahan EventEmitter yang tidak tertangani.

- `getSession(sessionId)` mengembalikan sesi terkelola atau `undefined`.
- `getActiveSessions()` mengecualikan sesi yang telah berhenti atau sedang dihentikan.
- `sendInput(sessionId, input)` hanya tersedia untuk adaptor lama yang aktif;
  ACP native menolak input mentah untuk melindungi stream JSON-RPC-nya.
- `killAll()` menghentikan setiap sesi yang dikelola oleh instance tersebut.

## Batas validasi

Fixture deterministik mencakup handshake native, output teks, izin yang ditolak,
pembatalan, prompt bersamaan, kegagalan inisialisasi, penghentian proses, batas
output, dan isolasi rahasia. Regresi buffer/listener lama yang sudah ada tetap
dicakup. Pengujian ini tidak membuktikan login Gemini langsung atau inferensi
penyedia yang berhasil; hal tersebut memerlukan smoke test yang diotorisasi
secara terpisah di environment target.

## Dokumentasi terkait

- [Protokol agen](./AGENT_PROTOCOLS_GUIDE.md)
- [Kontrak peluncuran CLI](../guides/CLI-LAUNCH-CONTRACTS.md)
- [Alat CLI](../reference/CLI-TOOLS.md)
- [Server A2A](./A2A-SERVER.md)
- [Agen cloud](./CLOUD_AGENT.md)
