# ACP registry and registered CLI launchers (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

OmniRoute memisahkan **penemuan CLI**, **Agent Client Protocol natif**, dan
**penyesuai stdio legasi**. Penemuan binari yang dipasang tidak membuktikan
pengesahan, keserasian model atau kesediaannya untuk mengendalikan gesaan.

Papan pemuka menggunakan `GET /api/acp/agents` dan `POST /api/acp/agents` untuk inventori
dan pendaftaran ejen tersuai. Ini ialah laluan pengurusan setempat sahaja, bukan
API awam untuk memulakan proses atau menghantar gesaan. `AcpManager` dalaman
tidak secara automatik menjadi sandaran penyedia HTTP.

## Kontrak berdaftar

`config/cli-tools-manifest.json` ialah sumber kebenaran untuk binari pelancaran
terbina dalam, argumen dan mod bahagian belakang. Daftar memperoleh takrifannya
daripada manifes tersebut. Pengesanan dicache selama 60 saat.

- `acp`: kontrak Gemini melancarkan `gemini --experimental-acp` dan berkomunikasi
  menggunakan ACP JSON-RPC yang dipisahkan baris baharu melalui SDK TypeScript rasmi.
- `stdio-adapter`: kontrak berdaftar lain mengekalkan penyesuai input baris baharu,
  output stdout legasi. Tempoh melahu output selama dua saat menamatkan responsnya.
  Penyesuai ini **tidak** mengesahkan sokongan ACP natif untuk CLI tersebut.

Gemini mendokumentasikan bendera pelancaran dalam [rujukan CLI](https://geminicli.com/docs/cli/cli-reference/).
Klien menggunakan [SDK ACP rasmi](https://github.com/agentclientprotocol/typescript-sdk)
untuk pemulaan, penciptaan sesi, permintaan gesaan, pemberitahuan dan pembatalan.

Takrifan ejen tersuai kekal sebagai kontrak pelancaran yang dikawal oleh pentadbir.
Pendaftaran binari dan argumen memberikan proses tersebut keistimewaan pelaksanaan
setempat pengguna pelayan; pendaftaran bukan kotak pasir. Pemeriksaan versi hanya
menerima boleh laku yang didaftarkan dan bendera versi yang dikenali.

## API pelancaran dalaman

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("gemini", {
  cwd: process.cwd(),
  // Hanya berikan pemboleh ubah penyedia yang ditetapkan secara sengaja kepada ejen ini.
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
});

try {
  const response = await acpManager.sendPrompt(session.id, "Terangkan projek ini", 120_000);
  // Gunakan respons dalam aplikasi pemanggil.
} finally {
  acpManager.kill(session.id);
}
```

`spawn(agentId, options)` menyelesaikan boleh laku dan argumen daripada takrifan
berdaftar. Satu-satunya pilihan pemanggil ialah `cwd` dan `env`; tandatangan lama
`spawn(agentId, binary, args, env)` dan penggantian boleh laku ditolak.
Kontrak pelancaran HTTP tidak disokong oleh pengurus ini.

Proses anak mewarisi sistem pengendalian, terminal, tempatan dan senarai izin sijil
yang sama seperti pelancar CLI. Rahsia pelayan/penyedia tidak disalin daripada
persekitaran induk. Bukti kelayakan yang diperlukan oleh CLI yang dipilih mesti
diberikan secara eksplisit atau dibekalkan melalui pengesahan setempat CLI itu sendiri.
Proses anak masih mempunyai keizinan sistem fail pengguna setempat dan boleh membaca
konfigurasinya sendiri.

## Kitaran hayat dan had natif

1. Mulakan binari berdaftar, mulakan ACP dan cipta sesi yang berakar pada
   direktori kerja yang dipilih. Pemulaan mempunyai had sepuluh saat.
2. Hantar gesaan dan kumpulkan pemberitahuan teks untuk sesi itu sahaja.
   Pelengkapan ialah respons RPC gesaan, bukan tempoh stdout senyap.
3. Gunakan satu tarikh akhir gesaan, termasuk sebarang pemulaan yang belum selesai;
   lalainya ialah 120 saat. Gesaan serentak dalam proses yang sama ditolak.
4. Apabila tamat masa natif berlaku, cuba `session/cancel` dan tamatkan proses.
   Tetingkap terhad selama 100 ms membolehkan pemberitahuan dikosongkan sebelum penamatan.
5. Tutup keadaan pengangkutan dan alih keluar sesi apabila pemulaan gagal,
   sambungan ditutup, proses keluar atau pemanggil menamatkannya.

Permintaan keizinan alat ditolak. Tiada keupayaan klien sistem fail atau terminal
diiklankan. Sekatan ini tidak mengasingkan binari anak dalam kotak pasir atau
menggantikan tetapan kebenaran CLI itu sendiri.

Teks natif dan stdout/stderr legasi masing-masing mengekalkan paling banyak 1 MiB aksara,
dengan menyimpan output terbaharu bersama notis pemangkasan. Setiap bingkai dawai natif
dihadkan kepada 2 MiB bait sebelum penghuraian SDK. Penimbal ditetapkan semula bagi setiap gesaan.

`kill(sessionId)` menghantar SIGTERM, kemudian SIGKILL selepas lima saat jika proses
belum keluar. Tamat masa gesaan legasi melepaskan pendengar dan pemasa tetapi membiarkan
sesi tersedia untuk gesaan lain; pemanggil kekal bertanggungjawab untuk menggunakan
`kill()` atau `killAll()` apabila selesai.

## Peristiwa dan pemeriksaan

Pengurus memancarkan `stdout`, `stderr` dan `exit`, setiap satunya dengan `sessionId`.
`sessionError` melaporkan ralat pengangkutan yang telah disanitasi. Peristiwa keserasian
`error` dipancarkan hanya apabila ia mempunyai pelanggan, supaya binari yang tiada tidak
boleh menyebabkan ralat EventEmitter yang tidak dikendalikan.

- `getSession(sessionId)` mengembalikan sesi terurus atau `undefined`.
- `getActiveSessions()` mengecualikan sesi yang dihentikan atau sedang dihentikan.
- `sendInput(sessionId, input)` hanya tersedia untuk penyesuai legasi yang aktif;
  ACP natif menolak input mentah untuk melindungi strim JSON-RPC-nya.
- `killAll()` menamatkan setiap sesi yang diuruskan oleh tika tersebut.

## Sempadan pengesahan

Lekapan berketentuan meliputi jabat tangan natif, output teks, keizinan yang ditolak,
pembatalan, gesaan serentak, kegagalan pemulaan, proses keluar, had output dan
pengasingan rahsia. Regresi penimbal/pendengar legasi sedia ada kekal diliputi.
Ujian ini tidak menunjukkan log masuk Gemini secara langsung atau inferens penyedia
yang berjaya; perkara tersebut memerlukan ujian ringkas yang dibenarkan secara
berasingan dalam persekitaran sasaran.

## Dokumentasi berkaitan

- [Protokol ejen](./AGENT_PROTOCOLS_GUIDE.md)
- [Kontrak pelancaran CLI](../guides/CLI-LAUNCH-CONTRACTS.md)
- [Alat CLI](../reference/CLI-TOOLS.md)
- [Pelayan A2A](./A2A-SERVER.md)
- [Ejen awan](./CLOUD_AGENT.md)
