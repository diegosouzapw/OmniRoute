# CLI Machine-ID Token (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CLI_TOKEN.md) · 🇪🇹 [am](../../../am/docs/security/CLI_TOKEN.md) · 🇸🇦 [ar](../../../ar/docs/security/CLI_TOKEN.md) · 🇦🇿 [az](../../../az/docs/security/CLI_TOKEN.md) · 🇧🇬 [bg](../../../bg/docs/security/CLI_TOKEN.md) · 🇧🇩 [bn](../../../bn/docs/security/CLI_TOKEN.md) · 🇧🇦 [bs](../../../bs/docs/security/CLI_TOKEN.md) · 🇨🇿 [cs](../../../cs/docs/security/CLI_TOKEN.md) · 🇩🇰 [da](../../../da/docs/security/CLI_TOKEN.md) · 🇩🇪 [de](../../../de/docs/security/CLI_TOKEN.md) · 🇬🇷 [el](../../../el/docs/security/CLI_TOKEN.md) · 🇪🇸 [es](../../../es/docs/security/CLI_TOKEN.md) · 🇪🇪 [et](../../../et/docs/security/CLI_TOKEN.md) · 🇮🇷 [fa](../../../fa/docs/security/CLI_TOKEN.md) · 🇫🇮 [fi](../../../fi/docs/security/CLI_TOKEN.md) · 🇫🇷 [fr](../../../fr/docs/security/CLI_TOKEN.md) · 🇮🇪 [ga](../../../ga/docs/security/CLI_TOKEN.md) · 🇮🇳 [gu](../../../gu/docs/security/CLI_TOKEN.md) · 🇳🇬 [ha](../../../ha/docs/security/CLI_TOKEN.md) · 🇮🇱 [he](../../../he/docs/security/CLI_TOKEN.md) · 🇮🇳 [hi](../../../hi/docs/security/CLI_TOKEN.md) · 🇭🇷 [hr](../../../hr/docs/security/CLI_TOKEN.md) · 🇭🇺 [hu](../../../hu/docs/security/CLI_TOKEN.md) · 🇦🇲 [hy](../../../hy/docs/security/CLI_TOKEN.md) · 🇮🇩 [id](../../../id/docs/security/CLI_TOKEN.md) · 🇳🇬 [ig](../../../ig/docs/security/CLI_TOKEN.md) · 🇮🇹 [it](../../../it/docs/security/CLI_TOKEN.md) · 🇯🇵 [ja](../../../ja/docs/security/CLI_TOKEN.md) · 🇬🇪 [ka](../../../ka/docs/security/CLI_TOKEN.md) · 🇰🇭 [km](../../../km/docs/security/CLI_TOKEN.md) · 🇮🇳 [kn](../../../kn/docs/security/CLI_TOKEN.md) · 🇰🇷 [ko](../../../ko/docs/security/CLI_TOKEN.md) · 🇱🇹 [lt](../../../lt/docs/security/CLI_TOKEN.md) · 🇱🇻 [lv](../../../lv/docs/security/CLI_TOKEN.md) · 🇮🇳 [ml](../../../ml/docs/security/CLI_TOKEN.md) · 🇮🇳 [mr](../../../mr/docs/security/CLI_TOKEN.md) · 🇲🇹 [mt](../../../mt/docs/security/CLI_TOKEN.md) · 🇲🇲 [my](../../../my/docs/security/CLI_TOKEN.md) · 🇳🇵 [ne](../../../ne/docs/security/CLI_TOKEN.md) · 🇳🇱 [nl](../../../nl/docs/security/CLI_TOKEN.md) · 🇳🇴 [no](../../../no/docs/security/CLI_TOKEN.md) · 🇮🇳 [or](../../../or/docs/security/CLI_TOKEN.md) · 🇮🇳 [pa](../../../pa/docs/security/CLI_TOKEN.md) · 🇵🇭 [phi](../../../phi/docs/security/CLI_TOKEN.md) · 🇵🇱 [pl](../../../pl/docs/security/CLI_TOKEN.md) · 🇵🇹 [pt](../../../pt/docs/security/CLI_TOKEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CLI_TOKEN.md) · 🇷🇴 [ro](../../../ro/docs/security/CLI_TOKEN.md) · 🇷🇺 [ru](../../../ru/docs/security/CLI_TOKEN.md) · 🇱🇰 [si](../../../si/docs/security/CLI_TOKEN.md) · 🇸🇰 [sk](../../../sk/docs/security/CLI_TOKEN.md) · 🇸🇮 [sl](../../../sl/docs/security/CLI_TOKEN.md) · 🇷🇸 [sr](../../../sr/docs/security/CLI_TOKEN.md) · 🇸🇪 [sv](../../../sv/docs/security/CLI_TOKEN.md) · 🇰🇪 [sw](../../../sw/docs/security/CLI_TOKEN.md) · 🇮🇳 [ta](../../../ta/docs/security/CLI_TOKEN.md) · 🇮🇳 [te](../../../te/docs/security/CLI_TOKEN.md) · 🇹🇭 [th](../../../th/docs/security/CLI_TOKEN.md) · 🇹🇷 [tr](../../../tr/docs/security/CLI_TOKEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CLI_TOKEN.md) · 🇵🇰 [ur](../../../ur/docs/security/CLI_TOKEN.md) · 🇺🇿 [uz](../../../uz/docs/security/CLI_TOKEN.md) · 🇻🇳 [vi](../../../vi/docs/security/CLI_TOKEN.md) · 🇳🇬 [yo](../../../yo/docs/security/CLI_TOKEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CLI_TOKEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CLI_TOKEN.md)

---

## Gambaran keseluruhan

Perintah OmniRoute CLI mengesahkan identiti terhadap API pengurusan setempat menggunakan token
`HMAC-SHA256(machine-id, salt)` yang dihantar melalui pengepala permintaan
`x-omniroute-cli-token`.

Ini membolehkan subperintah CLI (`omniroute status`, `omniroute providers`, dan sebagainya)
memanggil titik akhir pengurusan tanpa memerlukan pengguna membekalkan JWT atau
kata laluan pada setiap pelaksanaan.

## Cara ia berfungsi

1. `getMachineTokenSync()` membaca ID mesin perkakasan melalui `node-machine-id`
   (kembali kepada rentetan kosong jika gagal, sekali gus menyahdayakan pengesahan CLI).
2. Ia mengira `HMAC-SHA256(machine_id, salt)` dan mengembalikan cernaan heks
   penuh 64 aksara — token deterministik yang tidak boleh diterbalikkan dan terikat pada mesin ini.
3. CLI menghantar token sebagai `x-omniroute-cli-token` hanya apabila destinasi
   yang ditentukan ialah URL gelung balik yang eksplisit (`localhost`, `127.0.0.0/8`, atau
   IPv6 gelung balik). Permintaan yang membawa token menggunakan `redirect: error`, supaya
   ubah hala setempat tidak boleh memajukannya ke asalan lain. Konteks jauh sebaliknya
   menggunakan token akses dengan skop. Jika penerbitan token tidak tersedia, CLI tidak
   menyertakan pengepala tersebut dan `omniroute doctor` melaporkan kegagalan itu dan bukannya
   menganggap token kosong sebagai sah.
4. Pelayan (`src/server/authz/policies/management.ts`) mengira semula token
   yang dijangkakan dengan garam yang sama dan membandingkannya melalui `timingSafeEqual` untuk
   menghalang pengekstrakan berasaskan pemasaan.

## Ciri keselamatan

| Ciri                                     | Butiran                                                                                                                                                                                                                          |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Gelung balik sahaja**                  | Diterima hanya apabila cap lokaliti rakan dipercayai pelayan (yang diperoleh daripada alamat rakan TCP sebenar) menunjukkan gelung balik. Pengepala `Host` yang dikawal klien tidak pernah dipercayai untuk menentukan lokaliti. |
| **Perbandingan masa malar**              | `crypto.timingSafeEqual` menghalang serangan pemasaan.                                                                                                                                                                           |
| **Tidak boleh diterbalikkan**            | Output HMAC tidak boleh digunakan untuk mendapatkan semula ID mesin.                                                                                                                                                             |
| **Tiada pintasan perlindungan `always`** | `isAlwaysProtectedPath()` dinilai sebelum pemeriksaan token CLI. `/api/shutdown` dan `/api/settings/database` sentiasa memerlukan JWT.                                                                                           |
| **Tidak boleh dieksport**                | Token tidak pernah ditulis ke cakera atau direkodkan dalam log.                                                                                                                                                                  |

## Garam lalai (rawak bagi setiap pemasangan)

Apabila `OMNIROUTE_CLI_SALT` tidak ditetapkan, garam tersebut ialah rentetan heks rawak 64 aksara
yang dijana sekali dan disimpan secara berterusan di `<DATA_DIR>/cli-token-salt.json` (mod `0600`) —
bukannya nilai literal `omniroute-cli-auth-v1` yang disertakan dalam repositori. Kedua-dua `getActiveSalt()` dalam
`src/lib/machineToken.ts` dan cerminannya dalam `bin/cli/utils/cliToken.mjs` membaca fail
yang sama, supaya pelayan dan setiap pelaksanaan CLI pada pemasangan ini menggunakan
nilai yang sama; nilai literal yang disertakan dalam repositori hanya digunakan sebagai sandaran terakhir apabila
garam tersimpan atau garam persekitaran masih belum dapat diwujudkan (contohnya, pemasangan baharu untuk CLI sahaja
sebelum pelayan pernah dijalankan). Ini menutup kelemahan lalai literal tetap yang lama:
`/etc/machine-id` lazimnya boleh dibaca oleh semua pengguna, maka mana-mana pengguna setempat
sebaliknya boleh menerbitkan token yang sama bagi setiap pemasangan yang tidak pernah menetapkan
`OMNIROUTE_CLI_SALT`.

## Putaran salt

Tetapkan `OMNIROUTE_CLI_SALT` untuk memutar token terbitan tanpa perubahan kod — ia
sentiasa diutamakan berbanding salt setiap pemasangan yang disimpan. Selepas putaran, semua proses CLI
pada mesin ini akan menggunakan token baharu secara automatik. Berguna selepas
kebocoran senarai proses yang mungkin telah mendedahkan nilai terbitan sebelumnya.

```bash
# Putaran berterusan (tambahkan pada profil shell)
export OMNIROUTE_CLI_SALT="my-secret-salt-2026"

# Sahkan token baharu sedang digunakan
omniroute status
```

## Format lama (SHA-256, 32 aksara) — masih diterima

Sebelum format HMAC di atas, CLI menerbitkan tokennya sebagai
`SHA-256(machineId + salt).hex[0..32]` (awalan 32 aksara) dalam
`bin/cli/utils/cliToken.mjs` (`getLegacyCliTokenSync` dalam `src/lib/machineToken.ts`).

Untuk keserasian ke belakang, pelayan menerima **kedua-dua** format: pengesah membina
`expectedTokens = [getMachineTokenSync(), getLegacyCliTokenSync()]` dan membandingkan
pengepala masuk dengan setiap token menggunakan `timingSafeEqual`
(`src/server/authz/policies/management.ts` dan `src/lib/middleware/cliTokenAuth.ts`).
Oleh itu, sesuatu token adalah sah jika ia sepadan dengan **sama ada** cerna HMAC 64 aksara atau
awalan SHA-256 lama 32 aksara.

**Pilih keluar:** tetapkan `OMNIROUTE_DISABLE_CLI_TOKEN=true` (env atau `.env`) untuk menyahdayakan
mekanisme token CLI sepenuhnya; selepas itu, semua akses memerlukan kunci API yang dinyatakan secara eksplisit. Pada hos berbilang pengguna,
langkah ini disyorkan kerana `machine-id` adalah khusus bagi setiap peranti (bukan setiap pengguna) dan pengguna lain
pada hos yang sama boleh mengira token yang sama.

## Fail

| Fail                                      | Tujuan                                      |
| ----------------------------------------- | ------------------------------------------- |
| `src/lib/machineToken.ts`                 | Penerbitan token (`getMachineTokenSync`)    |
| `bin/cli/utils/cliToken.mjs`              | Cerminan penerbitan yang sama pada sisi CLI |
| `<DATA_DIR>/cli-token-salt.json`          | Salt rawak setiap pemasangan yang disimpan  |
| `src/server/authz/headers.ts`             | Pemalar `CLI_TOKEN_HEADER`                  |
| `src/server/authz/policies/management.ts` | Pengesahan pada sisi pelayan                |
| `src/server/authz/routeGuard.ts`          | Semakan hos gelung balik (`isLoopbackHost`) |

## Lihat juga

- `docs/security/ROUTE_GUARD_TIERS.md` — peringkat perlindungan laluan
- `docs/architecture/AUTHZ_GUIDE.md` — saluran paip pemberian kuasa penuh
