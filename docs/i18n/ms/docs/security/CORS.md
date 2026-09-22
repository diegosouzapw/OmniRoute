# CORS Configuration & Security (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute mengawal **origin pelayar** yang dibenarkan membaca respons silang origin
daripada satu senarai dibenarkan yang berpusat. Model ini **gagal-tertutup secara lalai**:
tiada origin dibenarkan sehingga anda membenarkannya secara eksplisit. Halaman ini mendokumenkan cara senarai dibenarkan
ditentukan, perkara yang sebenarnya didedahkan oleh `CORS_ALLOW_ALL=true` (dan, yang penting, perkara yang
**tidak** didedahkan), cara mengkonfigurasi persekitaran pembangunan berbanding pengeluaran dengan selamat, serta amaran masa jalan
yang dipaparkan oleh papan pemuka apabila kad bebas aktif.

**Sumber rujukan muktamad:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`,
`applyCorsHeaders`, `getCorsStatus`). Senarai dibenarkan diterapkan sekali sahaja dalam
perisian tengah (`src/server/authz/pipeline.ts`) — pengendali setiap laluan tidak menetapkan
`Access-Control-Allow-Origin` sendiri.

## Cara origin ditentukan

Bagi setiap permintaan, perisian tengah mengira nilai `Access-Control-Allow-Origin`
mengikut turutan ini:

1. **`CORS_ALLOW_ALL=true`** (atau `CORS_ORIGIN=*` legasi) → pantulkan semula
   `Origin` pemanggil (atau `*` apabila tiada pengepala `Origin`), dengan `Vary: Origin`
   supaya cache kekal tepat. Titik kawalan tunggal `applyCorsHeaders()` yang sama turut menambahkan
   `Vary: Accept-Encoding` pada setiap respons 2xx yang mempunyai isi pada permukaan
   `/v1*`/`/v1beta*` yang disahkan dengan token (`relaxForTokenAuth`, RFC 9110 §12.5.5, isu #6737), supaya
   cache hiliran/dikongsi dapat membezakan dengan betul antara varian termampat dengan tidak termampat.
2. Jika tidak, `Origin` permintaan dinormalkan (ditukar kepada huruf kecil, garis condong
   di hujung dibuang) dan dipadankan dengan **senarai dibenarkan tergabung**:
   - env **`CORS_ALLOWED_ORIGINS`** — senarai dipisahkan koma, dan
   - tetapan masa jalan **`corsOrigins`** (Papan Pemuka → Keselamatan → _Origin Dibenarkan
     CORS_), yang disuntik melalui `setRuntimeAllowedOrigins()` daripada
     `src/lib/config/runtimeSettings.ts`.
3. Tiada padanan → **tiada pengepala `Access-Control-Allow-Origin` dikeluarkan**. Pelayar
   menyekat pembacaan silang origin. Ini ialah tingkah laku gagal-tertutup lalai yang dimaksudkan.

| Pemboleh ubah env      | Maksud                                                                                          |
| ---------------------- | ----------------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | CSV bagi origin tepat yang hendak dibenarkan (disyorkan).                                       |
| `CORS_ALLOW_ALL`       | `true`/`1` → pantulkan sebarang origin (kad bebas). Untuk pembangunan sahaja.                   |
| `CORS_ORIGIN`          | Legasi. `*` berfungsi seperti `CORS_ALLOW_ALL`; satu nilai ditambahkan pada senarai dibenarkan. |

## Model ancaman — perkara yang sebenarnya didedahkan oleh `CORS_ALLOW_ALL=true`

Amaran umum OWASP ("CORS kad bebas = mana-mana laman boleh memanggil API anda") wajar
diambil serius, tetapi pendedahan OmniRoute **lebih terhad daripada kes umum**,
disebabkan satu fakta pelaksanaan yang nyata:

> **`applyCorsHeaders()` pusat tidak pernah mengeluarkan
> `Access-Control-Allow-Credentials`.** Pelayar tidak akan mendedahkan respons silang origin
> _yang menggunakan bukti kelayakan_ (mengandungi kuki) melainkan pelayan menghantar
> `Access-Control-Allow-Credentials: true`. Laluan CORS dikongsi OmniRoute tidak pernah
> berbuat demikian.

Maksudnya bagi setiap permukaan, walaupun dengan `CORS_ALLOW_ALL=true`:

| Permukaan                           | Mekanisme pengesahan           | Kesan CORS kad bebas                                                                                                                                                                                                                                                |
| ----------------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Papan Pemuka / PENGURUSAN `/api/*`  | Sesi kuki                      | Origin dipantulkan, tetapi **tanpa `Allow-Credentials`**, pelayar **menyekat** pembacaan yang menggunakan bukti kelayakan. Laman silang origin berniat jahat **tidak boleh membaca** respons papan pemuka anda yang telah disahkan, dan kuki sesi tidak didedahkan. |
| API Klien `/v1/*`, `/v1beta/*`      | Pengepala Bearer / `x-api-key` | Sudah bersifat permisif **secara reka bentuk** (`relaxForTokenAuth`): pelayar tidak pernah melampirkan `Authorization`/`x-api-key` secara automatik, maka halaman penyerang tidak boleh membekalkan kunci anda. `CORS_ALLOW_ALL` tidak meluaskan akses ini.         |
| Awam baca sahaja (`/api/health`, …) | Tiada                          | Tidak sensitif; kad bebas tidak memudaratkan.                                                                                                                                                                                                                       |

Jadi, pendedahan **baki** daripada `CORS_ALLOW_ALL=true` terhad kepada: (a)
**pembacaan** silang origin tanpa bukti kelayakan terhadap data yang sememangnya tidak memerlukan pengesahan, dan (b)
membenarkan **prapenerbangan** CORS diluluskan pada laluan pengurusan — yang masih memerlukan pengesahan
yang tidak boleh diberikan oleh halaman silang origin. Ia **bukan** vektor rampasan sesi atau
pencurian bukti kelayakan pada laluan CORS dikongsi.

### Satu pengecualian sebenar — `/api/v1/agents/`

Laluan Cloud-Agent (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) menetapkan
pengepala CORS **sendiri**
(`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) dan **sememangnya** mengeluarkan
`Access-Control-Allow-Origin: <origin>|*` bersama-sama dengan
`Access-Control-Allow-Credentials: true`. Ini ialah satu-satunya permukaan yang
menggabungkan pantulan origin dengan bukti kelayakan, dan ia **tidak bergantung pada
`CORS_ALLOW_ALL`**. Laluan ini disahkan oleh pengurusan
(`requireManagementAuth`); pengendali yang mendedahkan papan pemuka di luar hos harus
sedar bahawa inilah satu-satunya tempat pembacaan silang origin menggunakan bukti kelayakan dibenarkan oleh
pengepala respons. Pengetatannya kepada senarai dibenarkan yang eksplisit dijejaki
secara berasingan daripada panduan CORS ini.

## Senarai semak produksi

- **Jangan sekali-kali tetapkan `CORS_ALLOW_ALL=true` dalam produksi.** Biarkannya tidak ditetapkan.
- Tetapkan senarai origin secara **eksplisit** — sama ada melalui pemboleh ubah persekitaran atau medan dalam tab Security:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Jika OmniRoute berjalan di belakang proksi songsang / terowong (nginx, Caddy, Cloudflare
  Tunnel, Tailscale), CORS **bukan** satu-satunya kawalan anda — pengawal laluan
  gelung balik masih melindungi laluan yang mampu melakukan spawn (lihat
  [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md)). Jangan palsukan
  `X-Forwarded-For: 127.0.0.1` untuk "membetulkan" ralat 403; tindakan itu membuka semula kelas RCE yang
  ditutup oleh pengawal laluan.
- Sahkan keadaan masa jalan: papan pemuka memaparkan **sepanduk ambar berterusan**
  di bawah Dashboard → Security → Authorization Inventory apabila
  `CORS_ALLOW_ALL=true` aktif, dan `/api/settings/authz-inventory` mengembalikan
  sampul `cors: { allowAll, allowedOrigins }` yang boleh ditinjau oleh alat pemantauan.

## Kemudahan pembangunan — benarkan origin setempat tertentu

Anda jarang memerlukan kad bebas walaupun dalam persekitaran pembangunan. Benarkan hanya pelayan pembangunan yang anda gunakan:

```bash
# Pelayan pembangunan Vite (5173) + Next.js (3000) yang memanggil OmniRoute setempat
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Origin dipadankan tanpa mengira huruf besar atau kecil dan garis miring di hujung diabaikan, jadi
`http://localhost:3000` dan `http://localhost:3000/` adalah setara. CSV yang sama
boleh ditetapkan pada masa jalan melalui **Dashboard → Security → CORS Allowed Origins** tanpa
memulakan semula.

## Kunci API berbanding sesi kuki

- **Bearer / `x-api-key` (permukaan inferens `/v1/*`):** pelayar tidak akan melampirkannya
  secara automatik. CORS bukan penghalang yang bermakna di sini — kunci API ialah
  penghalangnya — sebab itulah permukaan tersebut sengaja dibuat permisif supaya klien pelayar dan
  Electron boleh membaca respons yang sememangnya mereka berhak terima.
- **Sesi kuki (papan pemuka):** dilindungi oleh lalai tutup-jika-gagal **dan**
  oleh ketiadaan `Access-Control-Allow-Credentials` pada laluan dikongsi. Jangan
  masukkan origin pengurusan/papan pemuka dalam sebarang konfigurasi permisif; origin tersebut mesti kekal
  tutup-jika-gagal sepenuhnya.

## Contoh: proksi songsang di hadapan OmniRoute

CORS dikuatkuasakan oleh OmniRoute sendiri, jadi proksi secara umumnya **tidak** sepatutnya menambah atau
menulis semula pengepala `Access-Control-*` (pengepala berganda menyebabkan pelayar gagal). Tamatkan TLS
dan majukan permintaan — biarkan OmniRoute menjawab prapenerbangan:

```nginx
# nginx — majukan ke OmniRoute; JANGAN suntik Access-Control-* di sini
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    # JANGAN tetapkan X-Forwarded-For kepada 127.0.0.1 — tindakan itu menewaskan pengawal laluan gelung balik.
}
```

Tetapkan origin pelayar yang dibenarkan dalam OmniRoute (`CORS_ALLOWED_ORIGINS` atau tab
Security), bukan dalam proksi.

## Fail sumber

| Perkara                                                    | Fail                                                                 |
| ---------------------------------------------------------- | -------------------------------------------------------------------- |
| Penyelesaian senarai dibenarkan + `getCorsStatus()`        | `src/server/cors/origins.ts`                                         |
| Penggunaan perisian tengah (satu-satunya sumber kebenaran) | `src/server/authz/pipeline.ts`                                       |
| Settings → suntikan origin masa jalan                      | `src/lib/config/runtimeSettings.ts`                                  |
| Status masa jalan untuk papan pemuka                       | `src/app/api/settings/authz-inventory/route.ts`                      |
| Sepanduk amaran papan pemuka                               | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| Medan CORS Allowed Origins                                 | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| CORS per laluan Cloud-Agent (pengecualian)                 | `src/lib/cloudAgent/api.ts`                                          |

## Lihat juga

- [Tahap Pengawal Laluan](./ROUTE_GUARD_TIERS.md) — penguatkuasaan loopback untuk
  laluan yang berkeupayaan melakukan spawn (kawalan berasingan yang saling melengkapi).
- [Panduan Pengesahan](../architecture/AUTHZ_GUIDE.md) — saluran paip pengesahan penuh.
