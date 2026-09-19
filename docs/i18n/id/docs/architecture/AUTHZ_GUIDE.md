# Authorization Guide (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Sumber kebenaran:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Terakhir diperbarui:** 2026-06-28 — v3.8.40

OmniRoute memiliki pipeline otorisasi yang memahami rute dan membatasi setiap permintaan API. Klasifikasinya bersifat **deterministik** dan **fail-closed** — apa pun yang tidak dapat diklasifikasikan akan dianggap sebagai `MANAGEMENT` dan memerlukan sesi atau token tingkat manajemen. Halaman ini menjelaskan model tersebut bagi engineer yang memelihara rute atau merancang endpoint baru.

![Pipeline AuthZ (3 kelas rute + evaluasi kebijakan)](../diagrams/exported/authz-pipeline.svg)

> Sumber: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Dua Mode Autentikasi

### 1. Kunci API (Bearer)

Digunakan untuk API klien yang kompatibel dengan OpenAI/Anthropic/Gemini serta beberapa rute manajemen ketika kunci memiliki cakupan `manage`.

```
Authorization: Bearer <api-key>
```

Divalidasi oleh `isValidApiKey()` / `extractApiKey()` dalam `src/sse/services/auth.ts` dan diekspor ulang melalui `src/shared/utils/apiAuth.ts`. Validator juga menerima variabel lingkungan `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` sebagai kunci passthrough persisten (isu #1350).

### 2. Sesi Dasbor (cookie auth_token)

Untuk halaman dasbor dan operasi admin.

```
Cookie: auth_token=<JWT yang ditandatangani dengan JWT_SECRET>
```

Cookie hanya dianggap sebagai sesi ketika JWT berhasil diverifikasi **dan** memuat `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Setiap
komponen yang menggunakan cookie tersebut (pelindung rute, penyegaran pipeline authz, handshake WebSocket, server
live, `/api/settings/require-login`, `/api/auth/status`) melewati helper tersebut.
Terdapat JWT lain yang ditandatangani dengan `JWT_SECRET` — passthrough Cursor CLI membuat token
`iss "omniroute" / aud "cursor-cli"` untuk pemegang kunci — dan token-token tersebut tidak pernah dianggap sebagai sesi
(#13298).

Diverifikasi oleh `isDashboardSessionAuthenticated()` dalam `src/shared/utils/apiAuth.ts`. Pipeline secara otomatis memperbarui JWT ketika masa berlakunya tersisa kurang dari 7 hari dari total masa berlaku 30 hari.

Beberapa rute manajemen menerima **salah satu** mode: cookie ATAU `Bearer <key>` ketika kunci API memiliki cakupan `manage` (atau `admin`). Inilah yang memungkinkan alur kerja "dapat dikonfigurasi melalui panggilan API" yang ditambahkan dalam v3.8.

#### Gerbang login OIDC opsional (#6973)

Login admin dasbor juga mendukung alur OIDC (OpenID Connect) yang **bersifat opsional**
bersama login kata sandi default — login kata sandi tidak pernah dihapus, hanya
dilengkapi:

- Dinonaktifkan kecuali `settings.oidcEnabled === true` **dan** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` semuanya telah dikonfigurasi (Settings → Auth).
  `GET /api/auth/oidc/login` akan mengembalikan `400` jika tidak.
- `GET /api/auth/oidc/login` menemukan `authorization_endpoint` dari
  `/.well-known/openid-configuration` milik penerbit (dengan fallback ke
  `<issuer>/authorize`), menyusun URI pengalihan dari permintaan yang masuk
  (dengan mempertimbangkan `x-forwarded-proto`), lalu mengalihkan ke IdP dengan `state`
  acak yang disimpan dalam cookie `oidc_state` beratribut `httpOnly`.
- `GET /api/auth/oidc/callback` memvalidasi `state`, menukarkan kode otorisasi,
  dan memverifikasi tanda tangan token ID melalui JWKS milik penerbit
  (`createRemoteJWKSet` dari `jose`, disimpan dalam cache per URI JWKS) dengan pemeriksaan
  `issuer`/`audience`. Daftar izin opsional `oidcAllowedSubjects` mencocokkan klaim
  `sub` token atau klaim `email`-nya — klaim email hanya diterima ketika
  `email_verified === true`, sehingga email yang belum diverifikasi di IdP tidak akan pernah lolos
  dari gerbang.
- Jika berhasil, alur ini membuat JWT `auth_token` 30 hari yang **sama persis** dengan yang diterbitkan oleh login
  kata sandi (`src/app/api/auth/login/route.ts`), sehingga bagian pipeline sesi
  dasbor lainnya (penyegaran otomatis, atribut cookie) tidak berubah —
  OIDC hanya menggantikan cara cookie dibuat, bukan hak akses yang diberikannya.

## Kelas Rute

`src/server/authz/types.ts` mendefinisikan tiga kelas; setiap rute yang tidak dapat diklasifikasikan secara deterministik akan menggunakan `MANAGEMENT` sebagai fallback.

| Kelas        | Deskripsi                                                                                                                                               | Autentikasi yang diperlukan                                           |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `PUBLIC`     | Rute yang secara eksplisit aman — login, logout, status, init, health, bootstrap onboarding.                                                            | Tidak ada                                                             |
| `CLIENT_API` | Endpoint penyajian model — `/api/v1/*`, `/api/v1beta/*`, ditambah alias `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Kunci Bearer ketika feature flag efektif `REQUIRE_API_KEY` diaktifkan |
| `MANAGEMENT` | Halaman dashboard, pengaturan, penyedia, kunci, serta endpoint admin dan diagnostik.                                                                    | Sesi dashboard ATAU Bearer dengan scope `manage`                      |

## Pipeline

```
Permintaan masuk → src/proxy.ts
  → runAuthzPipeline() di src/server/authz/pipeline.ts
    1. Hapus header internal tepercaya (x-omniroute-auth-*, x-omniroute-route-class)
    2. Buat ID permintaan, klasifikasikan rute melalui classifyRoute()
    3. Jika pathname == "/" → alihkan ke /dashboard
    4. Jika sedang menguras koneksi (penghentian secara bertahap) dan /api/* → 503
    5. Jika non-GET /api/* → pemeriksaan checkBodySize()
    6. Jika OPTIONS → preflight CORS 204
    7. Jika options.enforce == false → teruskan dengan header kelas rute
    8. Jika tidak: POLICIES[routeClass].evaluate(ctx)
       - izinkan → tambahkan x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - tolak   → kesalahan JSON dengan correlation_id (halaman dashboard → 302 /login)
```

Header internal tepercaya (didefinisikan di `src/server/authz/headers.ts`) **dihapus dari permintaan masuk** sebelum klasifikasi — klien tidak dapat mengisi `x-omniroute-auth-*` terlebih dahulu untuk menyamar sebagai suatu subjek.

### Kontrak kebijakan

Setiap kelas rute memiliki kebijakan di `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — selalu mengembalikan `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — mengekstrak Bearer, memvalidasinya melalui `validateApiKey()`. Hanya beralih ke anonim ketika feature flag efektif `REQUIRE_API_KEY` dinonaktifkan. Flag efektif ditentukan melalui `isRequireApiKeyEnabled()` (`penggantian feature flag DB > process.env.REQUIRE_API_KEY > default`) sehingga Feature Flags Dashboard dan variabel lingkungan mengatur `/api/v1/*`, `/api/v1beta/*`, serta aliasnya secara konsisten; kegagalan resolver akan menolak akses secara default. Mengizinkan permintaan sesi dashboard pada rute API klien (termasuk `/api/v1/models`, yang digunakan oleh katalog model dashboard).
- **`managementPolicy`** (`policies/management.ts`) — menerima sesi dashboard, permintaan sinkronisasi model internal (dicocokkan dengan `/api/providers/[name]/(sync-models|models)`), atau melewatkan pemeriksaan sepenuhnya jika `isAuthRequired()` mengembalikan false. Mengembalikan 403 (`AUTH_001`) ketika token Bearer tersedia tetapi tidak valid, dan 401 jika tidak. Kebijakan ini juga memberlakukan tingkatan penjaga rute (LOCAL_ONLY / ALWAYS_PROTECTED) sebelum cabang autentikasi apa pun — lihat [Tingkatan Penjaga Rute](../security/ROUTE_GUARD_TIERS.md). Path LOCAL_ONLY di `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (saat ini: `/api/mcp/`) dapat diakses dari non-loopback ketika kunci Bearer memiliki scope `manage`; semua path LOCAL_ONLY lainnya tetap dibatasi secara ketat ke loopback terlepas dari scope.

Kebijakan yang berhasil mengembalikan `AuthSubject` dengan `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`. Handler downstream dapat membacanya melalui `assertAuth(request, "CLIENT_API")` di `src/server/authz/assertAuth.ts` tanpa menjalankan ulang logika autentikasi.

## Daftar Rute Publik

`src/shared/constants/publicApiRoutes.ts` adalah daftar izin eksplisit:

Daftar ini dibagi berdasarkan **bentuk**, dan pembagian tersebut sangat penting (GHSA-74g9-q8f6-793h): sebuah prefiks dicocokkan dengan `startsWith()`, sehingga prefiks tersebut juga cocok dengan setiap path berdekatan yang memiliki karakter awal yang sama.
Ketika `/api/usage/om-usage` dijadikan prefiks, `/api/usage/om-usage<anything>` menjadi PUBLIK, dan Next memetakannya ke `/api/usage/[connectionId]` — sebuah handler yang tidak memiliki autentikasi sendiri.

```ts
// Subtree yang sebenarnya. Setiap entri HARUS diakhiri dengan "/" (dipastikan oleh pengujian unit).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // diperlakukan sebagai CLIENT_API dalam classify, bukan sebagai publik "tanpa autentikasi"
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Rute tunggal, dicocokkan SECARA PERSIS (dengan atau tanpa garis miring penutup).
PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/init",
  "/api/sync/bundle",
  "/api/cli/connect",
  "/api/usage/om-usage",
  "/api/skills/collect/chaos",
]);

// Rute tunggal hanya-baca yang juga mendapatkan pelonggaran origin CORS.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Rute tunggal hanya-baca TANPA pelonggaran CORS.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Rute hanya-baca bersifat publik **hanya** untuk metode yang aman. Catatan: `classifyRoute()` mengecualikan `/api/v1/*` dan `/api/v1beta/*` dari mekanisme fallback PUBLIC — rute-rute tersebut selalu diklasifikasikan sebagai `CLIENT_API` sehingga kebijakan kunci Bearer tetap berlaku.

## Menambahkan Rute Baru

### Pola 1 — Endpoint API klien publik (autentikasi Bearer)

Rute di bawah `/api/v1/` dan `/api/v1beta/` diklasifikasikan sebagai `CLIENT_API` secara otomatis. Middleware menerapkan pemeriksaan Bearer; handler rute tidak perlu mengulanginya, tetapi dapat membaca subjek jika diperlukan.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... logika handler
}
```

### Pola 2 — Endpoint pengelolaan (sesi atau Bearer + manage)

Gunakan `requireManagementAuth()` dari `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... logika handler
}
```

`requireManagementAuth()` mengembalikan `null` jika berhasil atau `Response` kesalahan JSON:

- 401 `AUTH_001` "Autentikasi diperlukan" — tidak ada kredensial sama sekali
- 403 — Bearer tidak valid **atau** Bearer tersedia tetapi kunci tidak memiliki scope `manage` / `admin`

`hasManageScope(scopes)` mengembalikan true untuk `"manage"` atau `"admin"`.

### Pola 3 — Menambahkan ke daftar izin publik

Pilih himpunan berdasarkan bentuk, bukan berdasarkan kemudahan. Satu rute dimasukkan ke `PUBLIC_API_ROUTES_EXACT` (atau `PUBLIC_READONLY_CORS_API_ROUTES` jika hanya untuk GET); hanya subtree yang sebenarnya yang dimasukkan ke `PUBLIC_API_ROUTE_PREFIXES`, dan entri tersebut **harus diakhiri dengan `/`**. Memasukkan satu rute ke daftar prefiks juga memublikasikan setiap path berdekatan yang memiliki karakter awal yang sama — termasuk sibling segmen dinamis yang ditambahkan kemudian (GHSA-74g9-q8f6-793h). Perbarui pengujian unit di `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts`, dan `tests/unit/authz/classify.test.ts`.

## Cakupan

Kunci API memiliki array `scopes` (disimpan sebagai JSON di `api_keys.scopes`, lihat `src/lib/db/apiKeys.ts`).

### Cakupan pengelolaan

- `manage` / `admin` — memberikan kunci akses ke endpoint API pengelolaan saat dikirim sebagai Bearer.

### Cakupan MCP (`src/shared/constants/mcpScopes.ts`)

Setiap alat MCP memerlukan cakupan tertentu melalui `MCP_TOOL_SCOPES`. Daftar lengkap (`MCP_SCOPE_LIST`):

```
read:health, read:combos, write:combos, read:quota, read:usage,
read:models, execute:completions, execute:search, write:budget,
write:resilience, pricing:write, read:cache, write:cache,
read:compression, write:compression, read:proxies
```

Penerapan cakupan di `open-sse/mcp-server/server.ts` meneruskan daftar cakupan setiap alat ke
`evaluateToolScopes()` setelah `resolveCallerScopeContext()` menentukan cakupan dari informasi autentikasi MCP,
metadata permintaan, atau `OMNIROUTE_MCP_SCOPES`.

## Pengalih Wajib Autentikasi

`isAuthRequired()` di `src/shared/utils/apiAuth.ts` menentukan apakah autentikasi **apa pun** diterapkan untuk suatu permintaan:

- `settings.requireLogin === false` → autentikasi dinonaktifkan secara global.
- Tidak ada kata sandi yang dikonfigurasi **dan** tidak ada variabel lingkungan `INITIAL_PASSWORD` → mode bootstrap mengizinkan wizard orientasi awal dan permintaan loopback, tetapi permintaan jaringan yang terekspos tetap memerlukan kredensial.
- Setiap kesalahan DB → gagal secara tertutup (aman secara default).

Penerapan kunci API klien menggunakan `isRequireApiKeyEnabled()` di `src/shared/utils/featureFlags.ts`, bukan pembacaan langsung `process.env.REQUIRE_API_KEY`. Hal ini penting untuk instans yang diterapkan: mengalihkan `REQUIRE_API_KEY` di Dasbor → Bendera Fitur menyimpan penggantian di DB dan langsung memengaruhi `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*`, serta pemeriksaan autentikasi API klien lainnya yang menggunakan pembantu ini. Jika penyimpanan bendera fitur tidak dapat dibaca, autentikasi API klien gagal secara tertutup dan mewajibkan kunci.

## Perubahan yang Tidak Kompatibel — v3.8.0

Endpoint `/api/v1/agents/tasks/*` dan `/api/resilience/model-cooldowns` **kini memerlukan autentikasi pengelolaan** (commit `588a0333`). Klien yang sebelumnya mengirimkan kunci API biasa tanpa cakupan `manage` akan menerima `403`. Migrasi: berikan cakupan `manage` pada kunci tersebut di dasbor Kunci API, atau gunakan sesi dasbor yang telah login.

## Perubahan Perilaku — v3.8.2

`/api/mcp/*` (server MCP jarak jauh) masih bersifat LOCAL_ONLY secara default, tetapi kini menerima permintaan non-loopback ketika header `Authorization: Bearer <api-key>` memiliki cakupan `manage`. Pengecualian ini dibatasi secara eksplisit per jalur melalui `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` di `src/server/authz/routeGuard.ts`; prefiks LOCAL_ONLY terkait `/api/cli-tools/runtime/*` sengaja TIDAK dapat dilewati karena dapat menjalankan subproses arbitrer. Permintaan anonim ke `/api/mcp/*` dari non-loopback akan tetap menghasilkan `403 LOCAL_ONLY` — perilaku default untuk setiap jalur LOCAL_ONLY baru tetap loopback-ketat. Lihat [Tingkatan Pengaman Rute](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Pengujian

- Pengujian unit: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Daftar izin publik: `tests/unit/public-api-routes.test.ts`.
- Jalankan pengujian terfokus: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Debugging

Pipeline selalu menandai respons dengan:

```
x-request-id:               <ID korelasi, ditampilkan kembali dalam isi error>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Untuk permintaan yang diautentikasi, header permintaan upstream (di sisi handler) juga mencakup:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<4 karakter terakhir> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (opsional)
x-omniroute-auth-scopes:    daftar yang dipisahkan koma
```

Gunakan `assertAuth(req, expectedClass)` di dalam handler — fungsi ini melempar `AuthzAssertionError` dengan kode `AUTHZ_NOT_INITIALIZED` jika middleware dilewati (berguna untuk mendeteksi regresi konfigurasi dalam pengujian).

## Lihat Juga

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — penanda autentikasi per endpoint
- [COMPLIANCE.md](../security/COMPLIANCE.md) — log audit untuk peristiwa autentikasi
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md) — detail penerapan cakupan MCP
- Sumber: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
