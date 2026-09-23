# CORS Configuration & Security (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute mengontrol **origin browser** mana yang dapat membaca respons lintas origin
melalui satu daftar izin terpusat. Model ini **gagal-tertutup secara default**:
tidak ada origin yang diizinkan sampai Anda secara eksplisit mengizinkannya. Halaman ini mendokumentasikan cara daftar izin
ditentukan, apa yang sebenarnya diekspos oleh `CORS_ALLOW_ALL=true` (dan, yang tidak kalah penting, apa yang
**tidak** diekspos), cara mengonfigurasi lingkungan pengembangan vs produksi secara aman, serta peringatan runtime
yang ditampilkan dasbor saat wildcard aktif.

**Sumber acuan:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`,
`applyCorsHeaders`, `getCorsStatus`). Daftar izin diterapkan satu kali, di
middleware (`src/server/authz/pipeline.ts`) — handler per rute tidak menetapkan
`Access-Control-Allow-Origin` sendiri.

## Cara origin ditentukan

Untuk setiap permintaan, middleware menghitung nilai `Access-Control-Allow-Origin`
dengan urutan berikut:

1. **`CORS_ALLOW_ALL=true`** (atau `CORS_ORIGIN=*` yang lama) → mengembalikan
   `Origin` pemanggil apa adanya (atau `*` ketika tidak ada header `Origin`), dengan `Vary: Origin`
   agar cache tetap benar. Titik kontrol `applyCorsHeaders()` yang sama juga menambahkan
   `Vary: Accept-Encoding` ke setiap respons 2xx yang memiliki isi pada permukaan
   `/v1*`/`/v1beta*` yang diautentikasi dengan token (`relaxForTokenAuth`, RFC 9110 §12.5.5, isu #6737), sehingga
   cache hilir/bersama dapat membedakan varian terkompresi dan tidak terkompresi
   dengan benar.
2. Jika tidak, `Origin` permintaan dinormalisasi (diubah menjadi huruf kecil, garis miring
   di akhir dihapus) dan dicocokkan dengan **daftar izin gabungan**:
   - env **`CORS_ALLOWED_ORIGINS`** — daftar yang dipisahkan koma, dan
   - pengaturan runtime **`corsOrigins`** (Dasbor → Keamanan → _Origin yang Diizinkan
     CORS_), yang diinjeksi melalui `setRuntimeAllowedOrigins()` dari
     `src/lib/config/runtimeSettings.ts`.
3. Tidak ada kecocokan → **tidak ada header `Access-Control-Allow-Origin` yang dikirimkan**. Browser
   memblokir pembacaan lintas origin. Ini adalah perilaku gagal-tertutup yang memang dimaksudkan.

| Variabel env           | Arti                                                                                   |
| ---------------------- | -------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | CSV berisi origin persis yang akan diizinkan (direkomendasikan).                       |
| `CORS_ALLOW_ALL`       | `true`/`1` → mengembalikan origin apa pun (wildcard). Hanya untuk pengembangan.        |
| `CORS_ORIGIN`          | Lama. `*` berperilaku seperti `CORS_ALLOW_ALL`; satu nilai ditambahkan ke daftar izin. |

## Model ancaman — apa yang sebenarnya diekspos oleh `CORS_ALLOW_ALL=true`

Peringatan umum OWASP ("CORS wildcard = situs mana pun dapat memanggil API Anda") memang perlu
ditanggapi serius, tetapi paparan OmniRoute **lebih sempit daripada kasus umum**,
karena satu fakta implementasi yang konkret:

> **`applyCorsHeaders()` terpusat tidak pernah mengirimkan
> `Access-Control-Allow-Credentials`.** Browser tidak akan mengekspos respons lintas
> origin _dengan kredensial_ (yang membawa cookie), kecuali server mengirimkan
> `Access-Control-Allow-Credentials: true`. Jalur CORS bersama OmniRoute tidak pernah
> melakukannya.

Artinya untuk setiap permukaan, bahkan dengan `CORS_ALLOW_ALL=true`:

| Permukaan                           | Mekanisme autentikasi       | Dampak CORS wildcard                                                                                                                                                                                                                            |
| ----------------------------------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dasbor / MANAGEMENT `/api/*`        | Sesi cookie                 | Origin dikembalikan, tetapi **tanpa `Allow-Credentials`** browser **memblokir** pembacaan dengan kredensial. Situs lintas origin berbahaya **tidak dapat membaca** respons dasbor terautentikasi Anda, dan cookie sesi tidak terekspos.         |
| API Klien `/v1/*`, `/v1beta/*`      | Header Bearer / `x-api-key` | Sudah permisif **sesuai desain** (`relaxForTokenAuth`): browser tidak pernah melampirkan `Authorization`/`x-api-key` secara otomatis, sehingga halaman penyerang tidak dapat menyertakan kunci Anda. `CORS_ALLOW_ALL` tidak memperluas hal ini. |
| Baca-saja publik (`/api/health`, …) | Tidak ada                   | Tidak sensitif; wildcard tidak berbahaya.                                                                                                                                                                                                       |

Jadi, paparan **residual** dari `CORS_ALLOW_ALL=true` terbatas pada: (a)
**pembacaan** lintas origin tanpa kredensial atas data yang memang sudah tidak memerlukan autentikasi, dan (b)
memungkinkan **preflight CORS lolos** pada rute manajemen — yang tetap memerlukan autentikasi
yang tidak dapat diberikan oleh halaman lintas origin. Ini **bukan** vektor pembajakan sesi atau
pencurian kredensial pada jalur CORS bersama.

### Satu pengecualian nyata — `/api/v1/agents/`

Rute Cloud-Agent (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) menetapkan
header CORS **miliknya sendiri**
(`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) dan **memang** mengirimkan
`Access-Control-Allow-Origin: <origin>|*` bersama dengan
`Access-Control-Allow-Credentials: true`. Ini adalah satu-satunya permukaan tempat
pengembalian origin dan kredensial hadir bersamaan, dan hal ini **tidak bergantung pada
`CORS_ALLOW_ALL`**. Rute-rute ini diautentikasi untuk manajemen
(`requireManagementAuth`); operator yang mengekspos dasbor di luar host perlu
mengetahui bahwa ini adalah satu-satunya tempat pembacaan lintas origin dengan kredensial diizinkan oleh
header respons. Pembatasannya ke daftar izin eksplisit dilacak
secara terpisah dari panduan CORS ini.

## Daftar periksa produksi

- **Jangan pernah menetapkan `CORS_ALLOW_ALL=true` dalam produksi.** Biarkan tidak ditetapkan.
- Tetapkan daftar origin secara **eksplisit** — baik melalui variabel lingkungan maupun kolom pada tab Security:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Jika OmniRoute berjalan di belakang reverse proxy / tunnel (nginx, Caddy, Cloudflare
  Tunnel, Tailscale), CORS **bukan** satu-satunya kontrol Anda — pengaman rute loopback
  tetap melindungi rute yang dapat melakukan spawn (lihat
  [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md)). Jangan memalsukan
  `X-Forwarded-For: 127.0.0.1` untuk "memperbaiki" 403; tindakan tersebut membuka kembali kelas RCE yang
  ditutup oleh pengaman rute.
- Konfirmasikan status runtime: dasbor menampilkan **banner kuning yang persisten**
  di Dashboard → Security → Authorization Inventory setiap kali
  `CORS_ALLOW_ALL=true` aktif, dan `/api/settings/authz-inventory` mengembalikan
  envelope `cors: { allowAll, allowedOrigins }` yang dapat dipantau oleh alat pemantauan.

## Kemudahan pengembangan — izinkan origin lokal tertentu

Bahkan dalam pengembangan, Anda jarang memerlukan wildcard. Izinkan hanya server pengembangan yang Anda gunakan:

```bash
# Server pengembangan Vite (5173) + Next.js (3000) yang memanggil OmniRoute lokal
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Origin dicocokkan tanpa membedakan huruf besar-kecil dan garis miring di akhir diabaikan, sehingga
`http://localhost:3000` dan `http://localhost:3000/` dianggap setara. CSV yang sama
dapat ditetapkan saat runtime melalui **Dashboard → Security → CORS Allowed Origins** tanpa perlu
memulai ulang.

## Kunci API vs sesi cookie

- **Bearer / `x-api-key` (permukaan inferensi `/v1/*`):** browser tidak pernah menyertakan
  ini secara otomatis. CORS bukanlah penghalang yang berarti di sini — kunci API-lah yang menjadi
  penghalang — karena itu permukaan ini sengaja dibuat permisif agar klien browser dan
  Electron dapat membaca respons yang memang berhak mereka akses.
- **Sesi cookie (dasbor):** dilindungi oleh default fail-closed **dan**
  oleh tidak adanya `Access-Control-Allow-Credentials` pada jalur bersama. Jangan
  masukkan origin pengelolaan/dasbor ke konfigurasi permisif apa pun; origin tersebut harus tetap
  sepenuhnya fail-closed.

## Contoh: reverse proxy di depan OmniRoute

CORS diberlakukan oleh OmniRoute sendiri, sehingga proxy umumnya **tidak boleh** menambahkan atau
menulis ulang header `Access-Control-*` (header ganda merusak fungsi browser). Terminasi TLS
dan teruskan — biarkan OmniRoute menjawab preflight:

```nginx
# nginx — teruskan ke OmniRoute; JANGAN menyisipkan Access-Control-* di sini
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    # JANGAN menetapkan X-Forwarded-For ke 127.0.0.1 — hal itu menonaktifkan pengaman rute loopback.
}
```

Tetapkan origin browser yang diizinkan di OmniRoute (`CORS_ALLOWED_ORIGINS` atau tab
Security), bukan di proxy.

## File sumber

| Aspek                                            | File                                                                 |
| ------------------------------------------------ | -------------------------------------------------------------------- |
| Resolusi daftar izin + `getCorsStatus()`         | `src/server/cors/origins.ts`                                         |
| Penerapan middleware (satu-satunya sumber acuan) | `src/server/authz/pipeline.ts`                                       |
| Settings → injeksi origin runtime                | `src/lib/config/runtimeSettings.ts`                                  |
| Status runtime untuk dasbor                      | `src/app/api/settings/authz-inventory/route.ts`                      |
| Banner peringatan dasbor                         | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| Kolom CORS Allowed Origins                       | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| CORS per rute Cloud-Agent (pengecualian)         | `src/lib/cloudAgent/api.ts`                                          |

## Lihat juga

- [Tingkatan Route Guard](./ROUTE_GUARD_TIERS.md) — penerapan loopback untuk
  rute yang dapat melakukan spawn (kontrol terpisah yang saling melengkapi).
- [Panduan Otorisasi](../architecture/AUTHZ_GUIDE.md) — alur autentikasi lengkap.
