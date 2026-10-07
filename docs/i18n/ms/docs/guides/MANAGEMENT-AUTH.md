# Management Authentication (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute mempunyai **empat keluarga kelayakan** yang boleh membenarkan laluan pengurusan.
Ia tidak boleh ditukar ganti. Kunci API Inferens (`sk-…`) **tidak** mengurus pelayan melainkan ia diberikan skop `manage` atau `admin` secara eksplisit.

Pelaksanaan kanonik: `src/lib/api/requireManagementAuth.ts`.

| Kelayakan             | Bentuk lazim                       | Dicipta di mana                                    | Kegunaan yang dimaksudkan   | Keupayaan pengurusan                                                                                          |
| :-------------------- | :--------------------------------- | :------------------------------------------------- | :-------------------------- | :------------------------------------------------------------------------------------------------------------ |
| Sesi JWT Papan Pemuka | `auth_token` kuki                  | Log masuk papan pemuka                             | UI Pelayar                  | Pengurusan papan pemuka penuh, tertakluk kepada peraturan CSRF, lokaliti, dan laluan yang sentiasa dilindungi |
| Token ID mesin CLI    | dalaman / tempatan                 | Bootstrap CLI (`omniroute` pada mesin yang sama)   | CLI Tempatan                | Pengurusan tempatan sahaja                                                                                    |
| Token Akses Berskop   | `oma_live_…`                       | **Tetapan → Token Akses** atau `omniroute connect` | CLI Jauh dan API pengurusan | Mesti memenuhi skop `read`, `write`, atau `admin` yang diperlukan oleh laluan                                 |
| Kunci API Inferens    | `sk-…` (dan awalan kunci API lain) | **Pengurus API / Kunci API**                       | inferens `/v1/*`            | **Tiada** melainkan metadata kunci termasuk `manage` atau `admin`                                             |

Kelayakan `oma_` adalah kelayakan pengurusan/CLI. Ia **bukan** kunci API inferens.

Jika pengesahan log masuk/kunci API dilumpuhkan untuk pelayan, beberapa laluan pengurusan mungkin menerima panggilan tanpa pengesahan. Laluan tempatan sahaja dan yang sentiasa dilindungi masih menggunakan peraturan mereka sendiri. Oleh itu, mengemukakan salah satu kelayakan ini tidak wajib secara universal, dan memilikinya tidak mencukupi secara universal tanpa skop dan lokaliti laluan yang diperlukan.

Berkaitan: [Mod Jauh](./REMOTE-MODE.md) (bagaimana `oma_live_…` dicetak untuk CLI jauh).

---

## Matriks skop

Skop pengurusan kunci API dan skop token akses adalah perbendaharaan kata yang berbeza.
Skop alat MCP adalah perbendaharaan kata ketiga, diperiksa dengan `scopeMatches` dan bukannya
mana-mana fungsi dalam jadual di bawah. Bersebelahan:
[Tiga ruang nama skop](../frameworks/MCP-SERVER.md#three-scope-namespaces).

### Skop Token Akses (`oma_live_…`)

| Skop    | Operasi biasa                                                        |
| ------- | -------------------------------------------------------------------- |
| `read`  | Senarai/status GET yang dibenarkan untuk dilihat oleh token          |
| `write` | Mutasi (cipta/kemas kini/padam) di bawah pentadbir                   |
| `admin` | CLI jauh penuh / token sambung (lalai bootstrap kata laluan di sini) |

Token dengan `read` tidak boleh memanggil laluan `write`. Bentuk mesej masa jalan:
`Skop token akses '<have>' tidak mencukupi; '<need>' diperlukan.`

### Skop pengurusan kunci API

| Skop     | Maksud                                                                               |
| -------- | ------------------------------------------------------------------------------------ |
| (tiada)  | Inferens sahaja. Laluan pengurusan mengembalikan 403.                                |
| `manage` | API Pengurusan (gerbang yang sama dengan cawangan kunci API `requireManagementAuth`) |
| `admin`  | Juga memenuhi `hasManageScope` (dianggap berkemampuan pengurusan)                    |

Dayakan `manage` pada kunci dalam UI Kunci API / Pengurus API. Jangan gunakan semula
kunci klien sembang untuk automasi melainkan anda sengaja memberikan skop tersebut.

---

## Cara mencipta dan membatalkan

### Sesi JWT papan pemuka

1. Buka `/login`, log masuk menggunakan kata laluan pengurusan (`INITIAL_PASSWORD` semasa but pertama).
2. Kuki `auth_token` ialah HttpOnly. Papan pemuka pelayar menggunakannya secara automatik.
3. Log keluar melalui `/api/auth/logout`. Tiada rahsia berjangka panjang untuk disalin.

### Token ID mesin CLI

1. Jalankan `omniroute` pada **hos yang sama** dengan pelayan (gelung balik).
2. CLI memulakan token ID mesin di bawah `~/.omniroute/` (chmod 600).
3. Ini **tidak** berfungsi dari mesin lain. Gunakan Token Akses untuk CLI jauh.

### Token Akses Berskop (`oma_live_…`)

1. Papan pemuka: **Tetapan → Token Akses** → cipta (nama + skop). **Rahsia hanya dipaparkan sekali.**
2. Atau CLI: `omniroute connect <host>` (kata laluan → token). Lihat [Mod Jauh](./REMOTE-MODE.md).
3. Pengepala: `Authorization: Bearer oma_live_…`
4. Batalkan daripada halaman Token Akses yang sama (atau padam konteks CLI).
5. Pelayan hanya menyimpan cincangan. Layan teks biasa seperti kata laluan.

### Kunci API berskop pengurusan

1. Papan pemuka: **Pengurus API / Kunci API** → cipta atau edit kunci → dayakan `manage` (atau `admin`).
2. Pengepala: `Authorization: Bearer sk-…` (awalan sebenar kunci tersebut).
3. Batalkan atau alih keluar `manage` dalam UI yang sama.
4. Untuk keistimewaan paling minimum bagi automasi yang bukan CLI: utamakan Token Akses `read` untuk tugasan GET sahaja; gunakan `manage` pada kunci API hanya apabila pemanggil juga perlu berkomunikasi dengan `/v1` dan pengurusan.

---

## Format pengepala

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

Jangan letakkan kelayakan pengurusan dalam laluan URL atau rentetan pertanyaan. Pengesahan
pengurusan hanya melalui pengepala/kuki.

---

## Contoh salin dan tampal

Baca sahaja (senaraikan penyedia). Gunakan Token Akses `read`:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

Pengubahsuaian (cipta sambungan penyedia). Gunakan Token Akses `write`/`admin` atau
kunci API dengan skop `manage`:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

Inferens (bukan pengurusan). Kunci API biasa, `manage` tidak diperlukan:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## Ralat masa jalan semasa (jangan gema rahsia)

| Situasi                                          | Status biasa | Mesej (disanitasi)                                                   |
| :----------------------------------------------- | :----------- | :------------------------------------------------------------------- |
| Tiada kelayakan                                  | 401          | `Authentication required`                                            |
| `oma_live_…` tidak sah/tamat tempoh              | 401          | `Invalid or expired access token`                                    |
| Kunci API sah tanpa `manage`/`admin`             | 403          | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| Kunci API biasa tidak sah pada laluan pengurusan | 403          | `Invalid management token`                                           |
| Skop Token Akses terlalu rendah                  | 403          | `Access token scope '<have>' is insufficient; '<need>' required.`    |

"Invalid management token" bermaksud pembawa **tidak** diterima sebagai kelayakan pengurusan. Ia **tidak** memberitahu anda keluarga mana yang perlu dicetak. Gunakan jadual di atas: kunci inferens memerlukan skop `manage`; CLI jauh memerlukan `oma_live_…`; papan pemuka menggunakan kuki sesi.

---

## Pilihan keistimewaan paling rendah yang disyorkan

| Pemanggil                                                     | Penggunaan                                       |
| :------------------------------------------------------------ | :----------------------------------------------- |
| Pelayar                                                       | Sesi papan pemuka                                |
| CLI pada hos pelayan                                          | Token mesin                                      |
| CLI pada komputer riba yang berkomunikasi dengan pelayan jauh | `oma_live_…` daripada `omniroute connect`        |
| CI / skrip (pengurusan sahaja)                                | `oma_live_…` dengan skop terkecil yang berfungsi |
| CI yang mesti memanggil kedua-dua `/v1` dan `/api`            | Kunci API dengan `manage` **atau** dua kelayakan |
