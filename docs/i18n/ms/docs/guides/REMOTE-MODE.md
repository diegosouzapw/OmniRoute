# Remote Mode (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/REMOTE-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/REMOTE-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/REMOTE-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/REMOTE-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/REMOTE-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/REMOTE-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/REMOTE-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/REMOTE-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/REMOTE-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/REMOTE-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/REMOTE-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/REMOTE-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/REMOTE-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/REMOTE-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/REMOTE-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/REMOTE-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/REMOTE-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/REMOTE-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/REMOTE-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/REMOTE-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/REMOTE-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/REMOTE-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/REMOTE-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/REMOTE-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/REMOTE-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/REMOTE-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/REMOTE-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/REMOTE-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/REMOTE-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/REMOTE-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/REMOTE-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/REMOTE-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/REMOTE-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/REMOTE-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/REMOTE-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/REMOTE-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/REMOTE-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/REMOTE-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/REMOTE-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/REMOTE-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/REMOTE-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/REMOTE-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/REMOTE-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/REMOTE-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/REMOTE-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/REMOTE-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/REMOTE-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/REMOTE-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/REMOTE-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/REMOTE-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/REMOTE-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/REMOTE-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/REMOTE-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/REMOTE-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/REMOTE-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/REMOTE-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/REMOTE-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/REMOTE-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/REMOTE-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/REMOTE-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/REMOTE-MODE.md)

---

Jalankan CLI `omniroute` pada komputer riba anda sementara OmniRoute itu sendiri berjalan di tempat lain
(VPS, pelayan rumah, mesin lain dalam Tailnet anda). Anda log masuk sekali dengan
`omniroute connect`, dan selepas itu **setiap** perintah CLI menyasarkan pelayan
jauh tersebut — perintah yang sama, output yang sama, cuma dilaksanakan terhadap pelayan jauh.

Tiada alat kedua yang perlu dipasang: mod jauh menggunakan CLI `omniroute` biasa
bersama **token akses** berskop.

```bash
npm install -g omniroute                 # CLI biasa
omniroute connect 192.168.0.15           # log masuk (kata laluan → token berskop)
omniroute models list                    # ← kini menyenaraikan model pada pelayan JAUH
omniroute configure codex                # ← menulis profil Codex setempat daripada katalog jauh
```

---

## Cara ia berfungsi

```
komputer riba anda                       OmniRoute jauh (VPS)
┌────────────────────┐                   ┌───────────────────────────────┐
│ CLI omniroute      │  POST /api/cli/connect  (kata laluan → token)     │
│  konteks: vps      │ ───────────────►  │ menghasilkan token akses      │
│  baseUrl, token    │  Authorization: Bearer oma_live_…                  │
│                    │ ───────────────►  │ setiap laluan pengurusan, skop │
│ menulis konfigurasi│ ◄───────────────  │ diperiksa mengikut skop token │
│ SECARA SETEMPAT    │                   └───────────────────────────────┘
└────────────────────┘
```

- **Konteks** menyimpan satu pelayan setiap satu (`~/.omniroute/config.json`, `chmod 600`).
  `omniroute contexts use <name>` menukar pelayan aktif; `default` ialah setempat.
- **Token akses** (`oma_live_…`) membenarkan perintah pengurusan. Token ini
  berbeza daripada kunci API inferens (`sk-…`, digunakan untuk `/v1/chat/completions`).
- Hanya cincangan SHA-256 token disimpan pada pelayan. Teks biasa ditunjukkan
  **sekali sahaja**, ketika penciptaan.

---

## Menyambung

### Dengan kata laluan pengurusan (pemulaan)

```bash
omniroute connect 192.168.0.15
# Kata laluan pengurusan untuk http://192.168.0.15:20128: ********
# ✔ Disambungkan ke http://192.168.0.15:20128 — konteks '192.168.0.15' (skop: admin)
```

Aliran kata laluan menghasilkan token **admin** secara lalai (anda memiliki kata laluan tersebut,
jadi anda sememangnya mempunyai kawalan penuh). Kecilkan skop dengan `--scope`:

```bash
omniroute connect 192.168.0.15 --scope write
```

Pilihan: `--port <p>` (apabila hos tidak mempunyai port), `--name <ctx>` (nama konteks),
`--scope read|write|admin`. URL penuh digunakan tanpa perubahan:
`omniroute connect https://omni.example.com`.

### Dengan token yang dijana terlebih dahulu

Jana token berskop dalam papan pemuka (atau dengan `omniroute tokens create`) dan
tampalkannya — kata laluan tidak diperlukan:

```bash
omniroute connect 192.168.0.15 --key oma_live_xxxxxxxx
```

CLI mengesahkannya melalui `GET /api/cli/whoami` dan menyimpannya sebagai konteks aktif.

---

## Skop

Tiga peringkat, secara hierarki (`admin ⊃ write ⊃ read`):

| Skop    | Boleh dilakukan                                                                       |
| ------- | ------------------------------------------------------------------------------------- |
| `read`  | senarai/periksa — `models list`, `providers status`, `logs`, `usage`, `cost`          |
| `write` | read **+** konfigurasi/guna pakai — `setup-codex`, `keys add`, `config set`, gabungan |
| `admin` | write **+** urus — CRUD `tokens`, tambah penyedia, perkhidmatan, dasar, oauth         |

Pelayan menentukan skop yang diperlukan oleh setiap laluan berdasarkan kaedah HTTP
(`GET`→read, mutasi→write), serta senarai dibenarkan admin untuk bahagian sensitif
(mutasi `/api/cli/tokens`, `/api/providers`, `/api/oauth`, `/api/services`, …).
Token dengan skop yang tidak mencukupi menerima `403` dengan mesej yang jelas.

> Laluan yang mencetuskan proses (`/api/services/*`, `/api/mcp/*`, …) kekal
> **untuk gelung balik sahaja** — token jauh tidak boleh mengaksesnya, tanpa mengira skop.

---

## Menyambungkan Antigravity pada pemasangan jauh

Antigravity menggunakan skrin persetujuan firstparty/nativeapp Google. Google hanya
mengeluarkan kod pengesahan apabila **ubah hala loopback**
(`http://127.0.0.1:<port>/callback`) **boleh dicapai daripada pelayar yang
meluluskan log masuk**. Pada pemasangan VPS jauh, loopback tersebut berada pada
pelayan, bukan pada mesin anda, maka skrin persetujuan **tergantung selama-lamanya dan
tidak pernah mengeluarkan kod** — kaedah sandaran biasa "tampal URL panggil balik" tidak
mempunyai apa-apa untuk ditampal. (Ini ialah kekangan daripada pihak Google: keadaan
tergantung yang sama berlaku dalam mana-mana proksi yang menggunakan klien desktop
Antigravity terbina dalam, bukan OmniRoute sahaja.)

Papan pemuka mengesan perkara ini sebelum anda tersekat: membuka **Providers → Antigravity →
Connect** daripada alamat bukan localhost akan menggantikan notis umum "salin URL panggil balik"
dengan dua penyelesaian di bawah, masing-masing dengan hos dan port anda yang telah diisi.
(Alamat LAN turut dikira — `192.168.x.x` bukan localhost bagi tujuan panggil balik ini.)

Terdapat dua cara yang disokong untuk menyambungkan Antigravity kepada OmniRoute jauh.

### Pilihan A — pembantu log masuk setempat (disyorkan)

Jalankan OAuth pada **komputer anda sendiri**, tempat `127.0.0.1` boleh dicapai. Pembantu
berkomunikasi terus dengan Google, maka proses persetujuan dapat diselesaikan di tempat
versi papan pemuka tidak dapat melakukannya.

**Jika anda sudah tersambung** (`omniroute connect <host>`), tiada apa-apa yang perlu
disalin — pembantu akan menghantar bukti kelayakan kepada pemasangan tersebut untuk anda:

```bash
# Pada mesin SETEMPAT anda (memerlukan Node.js + pelayar):
omniroute connect 192.168.0.15        # sekali sahaja — menjana token konteks dengan skop pentadbir
npx omniroute login antigravity
#   ↳ membuka persetujuan Google, menangkap panggil balik pada port loopback setempat,
#     menukarnya, dan menghantar bukti kelayakan melalui POST kepada konteks aktif:
#
#   Antigravity disambungkan pada http://192.168.0.15:20128 (sambungan abc123).
#   Tiada apa-apa untuk ditampal — anda boleh menutup terminal ini.
```

Penghantaran berlaku secara automatik apabila konteks aktif menghala ke mesin lain.
Paksa tindakan tersebut dengan `--push` / `--no-push`, atau sasarkan konteks tertentu
dengan `--context <name>`.

**Jika mesin anda tidak dapat mencapai VPS** (disekat tembok api, tiada SSH, meja kerja
diasingkan daripada rangkaian), pembantu masih berfungsi — ia hanya benar-benar
_memerlukan_ Google. Gunakan `--no-push`, atau biarkan sahaja penghantaran gagal: ia akan
kembali kepada mencetak blob dan bukannya membuang pengesahan yang telah anda selesaikan.

```bash
npx omniroute login antigravity --no-push
#   omniroute-cred-v1.eyJ2IjoxLCJ...
```

Kemudian, dalam papan pemuka **jauh**: **Providers → Antigravity → Connect**, dan tampal
blob `omniroute-cred-v1.…` ke dalam medan **Step 2** (ia menerima sama ada URL panggil
balik atau blob bukti kelayakan). OmniRoute menyahkodnya, menjalankan proses permulaan
Cloud Code pada pelayan, dan menyimpan sambungan secara berterusan.

> Blob tersebut mengandungi token segar semula — perlakukannya seperti kata laluan. Melalui
> kaedah penghantaran, ia dihantar sekali melalui sambungan konteks anda yang disahkan;
> melalui kaedah tampal, ia dihantar melalui sambungan papan pemuka anda. Dalam kedua-dua
> keadaan, ia disimpan dalam bentuk tersulit, dan penghantaran yang berjaya tidak akan
> mencetaknya pada terminal anda.

Bendera: `--no-browser` (cetak URL dan bukannya membukanya secara automatik), `--port <n>`
(tetapkan port loopback), `--timeout <ms>`, `--push` / `--no-push` (atasi penghantaran
automatik), `--context <name>` (sasarkan konteks tertentu).

### Pilihan B — terowong pemajuan setempat SSH

Jika anda mempunyai akses SSH kepada VPS, majukan port papan pemuka supaya panggil balik
loopback dapat dihalakan kembali ke pelayan melalui terowong:

```bash
# Pada mesin SETEMPAT anda:
ssh -L 20128:127.0.0.1:20128 user@your-vps
# kemudian buka http://localhost:20128 dalam pelayar SETEMPAT anda dan sambungkan Antigravity
# seperti biasa — ubah hala 127.0.0.1:20128/callback kini mencapai VPS melalui SSH.
```

Oleh sebab anda mencapai papan pemuka sebagai `localhost:20128`, persetujuan Google
dapat diselesaikan dan panggil balik dihantar kepada pelayan melalui terowong yang sama —
blob tidak diperlukan. Pastikan terowong kekal terbuka sehingga sambungan dipaparkan
sebagai aktif.

Tidak seperti penyedia loopback tetap di bawah, **satu pemajuan sudah mencukupi** di sini:
panggil balik Antigravity menggunakan port papan pemuka itu sendiri, maka tiada port kedua
khusus penyedia yang perlu diterowongkan.

> Alternatif tanpa paparan sepenuhnya (tanpa pembantu, tanpa terowong) adalah dengan
> mengkonfigurasi bukti kelayakan web Google OAuth **anda sendiri** + URL asas awam;
> lihat pemboleh ubah persekitaran OAuth penyedia tersebut. Dua pilihan di atas tidak
> memerlukan persediaan Google tambahan.

---

## Menyambungkan Codex / Grok pada pemasangan jauh (penyedia gelung balik tetap)

Codex, xAI (`xai-oauth`) dan Grok CLI (`grok-cli`) mendaftarkan `redirect_uri`
gelung balik yang **tetap** dengan aplikasi OAuth huluan mereka. OmniRoute tidak
boleh mengubahnya — penyedia sentiasa menghantar pelayar kembali ke alamat yang
dikod keraskan yang sama:

| Penyedia    | Panggil balik tetap yang menjadi destinasi ubah hala penyedia |
| ----------- | ------------------------------------------------------------- |
| `codex`     | `http://localhost:1455/auth/callback`                         |
| `xai-oauth` | `http://127.0.0.1:56121/callback`                             |
| `grok-cli`  | `http://127.0.0.1:56122/callback`                             |

`localhost` di situ bermaksud **mesin yang menjalankan pelayar**, manakala pelayan
panggil balik PKCE OmniRoute mendengar pada gelung balik **pelayan**. Buka papan
pemuka pada alamat LAN seperti `http://192.168.0.15:20128` dan kedua-duanya tidak
akan bertemu: kod kebenaran dihantar ke `localhost:1455` komputer riba anda
sendiri, tempat tiada apa-apa yang mendengar, lalu penyedia menggagalkan proses
log masuk tanpa memaparkan ralat.

Papan pemuka mengesan perkara ini sebelum membuka tetingkap timbul dan memaparkan
perintah terowong dan bukannya membiarkan proses log masuk gagal secara senyap
(#8046).

### Penyelesaian — majukan **kedua-dua** port

```bash
# Pada mesin yang menjalankan PELAYAR:
ssh -L 20128:127.0.0.1:20128 -L 1455:127.0.0.1:1455 <user>@192.168.0.15
# kemudian layari http://localhost:20128 dan sambungkan Codex dari situ
```

Dua pemajuan diperlukan dan memajukan hanya satu masih akan gagal:

- **`20128`** (port papan pemuka) menjadikan asal sebagai localhost sebenar,
  yang membolehkan OmniRoute memulakan pelayan panggil balik PKCE — asal LAN
  tidak sekali-kali mencapai cabang tersebut.
- **`1455`** (port panggil balik tetap penyedia) ialah tempat pelayar dihantar
  kembali; port tersebut perlu diterowongkan ke gelung balik pelayan.

Gantikan `1455` dengan `56121`/`56122` apabila menyambungkan xAI atau Grok CLI,
dan `20128` dengan port papan pemuka sebenar anda. Pastikan terowong kekal terbuka
sehingga sambungan dipaparkan sebagai aktif.

> **Tiada akses SSH?** Codex dan Grok CLI juga menerima token yang ditampal —
> tab **Tampal Kunci API** / **Import auth.json** pada dialog sambungan. Laluan
> tersebut tidak mempunyai panggil balik gelung balik, jadi ia berfungsi dari
> mana-mana asal. Codex juga menerima token akses biasa atau gumpalan sesi
> `~/.codex/auth.json`.

---

## Mengurus token

```bash
omniroute tokens create --name "laptop" --scope write [--expires 30]
#   ↳ mencetak rahsia SEKALI sahaja — salinnya sekarang
omniroute tokens list                 # disamarkan: id, nama, skop, awalan, status, tamat tempoh
omniroute tokens revoke <id|prefix>   # batalkan serta-merta
omniroute tokens scopes               # terangkan ketiga-tiga skop
```

Perintah `tokens` memerlukan kelayakan **pentadbir**. Anda juga boleh mengurus
token dalam papan pemuka di bawah **Tetapan → Token Akses** (cipta, batalkan,
salin sekali).

---

## Mengkonfigurasi CLI pengekodan daripada katalog jauh

`omniroute configure` membaca katalog model langsung **pelayan aktif** dan
menulis konfigurasi pada mesin **anda**.

```bash
omniroute configure codex
#   Penyedia: glm, kmc, ollamacloud, opencode-go, …
#   Penyedia: glm
#   ID model: glm/glm-5.2
#   ✔ Menulis ~/.codex/glm52.config.toml
#   Gunakannya:  codex --profile glm52

# bukan interaktif
omniroute configure codex --provider glm --model glm/glm-5.2 --name glm52

# kekalkan model yang kerap digunakan di bahagian atas pemilih interaktif
omniroute configure codex --provider glm --model glm/glm-5.2 --favorite --yes
```

Pemilih hanya menyimpan ID model (tidak sekali-kali URL atau kelayakan) dalam
fail `model-preferences.json` setempat, yang diskopkan mengikut konteks dan
sasaran CLI. Kegemaran dipaparkan sebelum pilihan terkini; gunakan
`--unfavorite` untuk mengalih keluar model terpilih daripada senarai
konteks/sasaran tersebut.

Profil yang ditulis merujuk kunci inferens melalui pemboleh ubah persekitaran
(`OMNIROUTE_API_KEY`) — rahsia tersebut tidak sekali-kali ditulis ke cakera.
Untuk persediaan asas Codex sekali sahaja (blok `[model_providers.omniroute]`),
lihat [CODEX-CLI-CONFIGURATION.md](./CODEX-CLI-CONFIGURATION.md).

### Melancarkan CLI terhadap sistem jauh (tiada konfigurasi ditulis)

`omniroute run <target>` juga mematuhi konteks aktif: URL asas jauh dan kelayakan
konteks disuntik ke dalam proses yang dilancarkan sahaja.

```bash
omniroute connect 192.168.0.15
omniroute run claude   --model openai/gpt-5.4          # Claude Code → sistem jauh
omniroute run gemini   --model glm/glm-5.2 -- --skip-trust -p "hello"
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"

# Pratonton dengan tepat perkara yang akan dilancarkan (NAMA KUNCI persekitaran sahaja, tidak sekali-kali nilainya):
omniroute run codex --dry-run --json
```

Sasaran: `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen`, `gemini`
(sumber tunggal: `bin/cli/cli-manifest.mjs`). Qwen dan Gemini dijalankan dengan
direktori utama terpencil sementara yang dialih keluar semasa keluar, maka
pelancaran tidak sekali-kali menyentuh — atau membocor masuk ke dalam —
konfigurasi alat peribadi anda.

### Perintah persediaan bagi setiap CLI

Setiap CLI yang disokong mempunyai perintah persediaan yang menyedari sistem
jauh (semuanya mematuhi konteks aktif atau `--remote <url> --api-key <key>`):

| CLI         | Perintah                   | Apa yang ditulis                                                                                                                                                                     |
| ----------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Codex       | `omniroute setup-codex`    | Profil `~/.codex/<name>.config.toml` (bagi setiap model)                                                                                                                             |
| Claude Code | `omniroute setup-claude`   | `~/.claude/profiles/<name>/settings.json` (bagi setiap model)                                                                                                                        |
| OpenCode    | `omniroute setup-opencode` | `~/.config/opencode/opencode.json` — penyedia `omniroute` yang serasi dengan OpenAI dengan setiap model dalam katalog (jalankan `opencode -m omniroute/<model>`)                     |
| Cline       | `omniroute setup-cline`    | `~/.cline/data/{globalState,secrets}.json` (mod CLI) + memaparkan tetapan sambungan VS Code untuk ditampal (serasi dengan OpenAI, URL asas **tanpa** `/v1`)                          |
| Kilo Code   | `omniroute setup-kilo`     | `~/.local/share/kilo/auth.json` (CLI) + tetapan `kilocode.*` VS Code — serasi dengan OpenAI, URL asas **dengan** `/v1`                                                               |
| Continue    | `omniroute setup-continue` | `~/.continue/config.yaml` (VS Code/JetBrains + CLI `cn`) — `provider: openai`, `apiBase` **dengan** `/v1`, kunci melalui `${{ secrets.OMNIROUTE_API_KEY }}`                          |
| Cursor      | `omniroute setup-cursor`   | memaparkan langkah dalam aplikasi (Settings → Models → Override OpenAI Base URL **dengan** `/v1` + kunci + model). Konfigurasi Cursor ialah SQLite legap — panel sembang sahaja      |
| Roo Code    | `omniroute setup-roo`      | menulis JSON import Roo (`~/.omniroute/roo-settings.json`) + menetapkan `roo-cline.autoImportSettingsPath` + memaparkan langkah UI (serasi dengan OpenAI, URL asas **dengan** `/v1`) |
| Crush       | `omniroute setup-crush`    | `~/.config/crush/crush.json` — penyedia `openai-compat`, `base_url` **dengan** `/v1`, kunci melalui `$OMNIROUTE_API_KEY`                                                             |
| Goose       | `omniroute setup-goose`    | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER=openai` + `OPENAI_HOST` **tanpa** `/v1` + `GOOSE_MODEL`) + panduan persekitaran                                                       |
| Aider       | `omniroute setup-aider`    | `~/.aider.conf.yml` (`openai-api-base` **tanpa** `/v1` + `model: openai/<id>`) + panduan persekitaran (`aider --message --yes`)                                                      |
| Qwen Code   | `omniroute setup-qwen`     | entri V4 `modelProviders.openai` dalam `~/.qwen/settings.json` + `OMNIROUTE_API_KEY` dalam `~/.qwen/.env`                                                                            |

```bash
# OpenCode (penyedia yang serasi dengan OpenAI, semua model katalog, VPS jauh)
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute setup-opencode --only glm,kimi        # kekalkan hanya model yang sepadan
opencode -m omniroute/glm/glm-5.2 "..."          # eksport OMNIROUTE_API_KEY terlebih dahulu
```

> OpenCode juga mempunyai penyepaduan **pemalam** yang lebih lengkap: `omniroute setup opencode`
> (kini menyokong sistem jauh melalui `--remote`) memasang `@omniroute/opencode-plugin`.
> `setup-opencode` ialah alternatif ringan yang serasi dengan OpenAI. Kunci API
> dirujuk melalui `{env:OMNIROUTE_API_KEY}` — tidak pernah ditulis ke cakera.
>
> Pada OpenCode v2, gunakan `@omniroute/opencode-plugin-v2` sebagai gantinya: katalog yang sama,
> kontrak pemuat yang berbeza. Ia membaca kunci daripada stor kelayakan OpenCode sendiri
> apabila penyepaduan disambungkan, jadi get laluan jauh langsung tidak memerlukan kunci dalam
> `opencode.json`.

---

## Mengurus konteks (bertukar antara pelayan)

**Konteks** ialah pelayan yang disimpan (baseUrl + kelayakan + skop). `omniroute connect`
mencipta satu konteks dan menjadikannya aktif; selepas itu, setiap perintah menyasarkan konteks tersebut. Urus dan
bertukar antara konteks dengan `omniroute contexts`:

```bash
omniroute contexts list            # semua konteks; konteks aktif ditandai ●
omniroute contexts current         # pelayan aktif, status pengesahan, skop
```

```text
  | Nama    | URL Asas                  | Pengesahan | Skop  | Perihalan
● | vps     | http://100.67.86.91:20128 | token      | admin | OmniRoute Jauh (…)
  | default | http://localhost:20128    | ✗          |       |
```

**Tukar pelayan** — setiap perintah seterusnya menggunakan konteks aktif:

```bash
omniroute contexts use vps         # → semua perintah kini mencapai VPS jauh
omniroute tokens list              #   (dijalankan terhadap VPS)

omniroute contexts use default     # → kembali ke localhost
omniroute tokens list              #   (dijalankan terhadap pelayan setempat)
```

**Tambah konteks secara manual** (dan bukannya menggunakan `connect`), periksa atau namakan semula:

```bash
omniroute contexts add staging --url https://staging.example.com:20128 \
  --access-token oma_live_xxxx --scope write --description "kotak pementasan"
omniroute contexts show staging    # butiran penuh bagi satu konteks
omniroute contexts rename staging stg
```

**Alih keluar konteks** — meminta pengesahan; berikan `--yes` untuk melangkauinya
(diperlukan untuk skrip / shell bukan interaktif, yang jika tidak akan menolak dengan selamat):

```bash
omniroute contexts remove stg --yes
```

> `default` (localhost) tidak boleh dialih keluar. Mengalih keluar konteks aktif akan kembali
> kepada `default`. Petua: mengalih keluar konteks hanya membuang kelayakan **setempat** yang disimpan —
> batalkan token pada pelayan dengan `omniroute tokens revoke <id>` untuk benar-benar
> menamatkan akses.

**Eksport / import** konteks (contohnya untuk memindahkannya antara mesin). Konteks baharu hanya menyimpan
rujukan rantai kunci; kelayakan tidak disalin ke dalam eksport apabila rantai kunci OS
tersedia:

```bash
omniroute contexts export --out contexts.json     # lalai: stdout
omniroute contexts import contexts.json            # tulis ganti; gunakan --merge untuk mengekalkan yang sedia ada
omniroute contexts migrate --yes                  # pindahkan token teks biasa legasi ke rantai kunci
```

Pada sistem tanpa paparan yang tidak mempunyai rantai kunci OS yang boleh digunakan, CLI akan kembali menggunakan
`config.json` dengan mod `0600` dan mencetak amaran sekali sahaja. Anggap eksport daripada
kaedah sandaran tersebut (dan sebarang konfigurasi legasi sebelum migrasi) sebagai bahan rahsia.

---

## Semakan menyeluruh ringkas

Kitaran hayat yang boleh disalin dan ditampal untuk mengesahkan persediaan jauh dari awal — sambungkan, jana
token berskop, halakan perintah, tukar kembali dan hapuskan persediaan. Gantikan
`192.168.0.15` dengan hos/IP pelayan anda (Tailscale, LAN atau URL
`https://…` awam).

```bash
# 1. Sambungkan (kata laluan → token pentadbir, disimpan sebagai konteks yang menjadi aktif)
omniroute connect 192.168.0.15                 # atau: --key oma_live_xxxx  (tanpa kata laluan)
omniroute contexts current                     # menunjukkan pelayan jauh + skop

# 2. Gunakannya — perintah pengurusan kini dijalankan terhadap pelayan jauh
omniroute tokens create --name laptop --scope read   # jana token dengan skop lebih terhad
omniroute tokens list                                 # senarai bertopeng, daripada pelayan jauh

# 3. Bertukar pergi dan balik
omniroute contexts use default                 # → setempat
omniroute contexts use 192-168-0-15            # → jauh semula (nama daripada `contexts list`)

# 4. Hapuskan persediaan. PERHATIAN: `contexts remove` hanya memadamkan kelayakan SETEMPAT —
#    ia TIDAK membatalkan token pada pelayan. Batalkan pada bahagian pelayan terlebih dahulu jika anda
#    benar-benar mahu menamatkan akses.
omniroute tokens revoke <id|prefix>            # menamatkan akses pada pelayan
omniroute contexts remove 192-168-0-15 --yes   # buang konteks setempat (walaupun aktif → kembali kepada default), tanpa gesaan
```

> `--yes` menjadikan `contexts remove` bukan interaktif (diperlukan dalam skrip/CI; tanpanya,
> shell bukan interaktif akan menolak dengan selamat dan bukannya tergantung). Mengalih keluar konteks
> **aktif** akan kembali kepada `default` secara automatik.

---

## Nota keselamatan

- Teks biasa token dipaparkan sekali sahaja; hanya cincangan SHA-256 disimpan secara berterusan (sama seperti kunci API).
- `omniroute connect` menggunakan semula sekatan percubaan log masuk secara paksaan + pengelogan audit.
- Utamakan HTTPS atau Tailnet untuk pengangkutan; hos tanpa protokol ditetapkan secara lalai kepada `http://`
  untuk kemudahan LAN/Tailscale — berikan URL `https://…` penuh untuk TLS.
- Fail konteks setempat yang diutamakan ialah `~/.omniroute/config.json` (`chmod 600`)
  yang hanya mengandungi `credentialRef`; token itu sendiri disimpan dalam rantai
  kunci OS (`keytar`) dan tidak pernah dicetak dalam log. Pemasangan tanpa paparan yang tidak mempunyai
  rantai kunci natif yang berfungsi menggunakan fail `0600` yang sama sebagai pilihan sandaran eksplisit dan
  mengeluarkan amaran sekali. Gunakan `omniroute contexts migrate --yes` selepas memasang
  bahagian belakang rantai kunci.

---

## Titik akhir API (rujukan)

| Kaedah | Laluan                | Pengesahan             | Skop                             |
| ------ | --------------------- | ---------------------- | -------------------------------- |
| POST   | `/api/cli/connect`    | kata laluan pengurusan | — (awam, dilindungi kata laluan) |
| GET    | `/api/cli/whoami`     | token akses            | read                             |
| GET    | `/api/cli/tokens`     | token akses            | admin                            |
| POST   | `/api/cli/tokens`     | token akses            | admin                            |
| DELETE | `/api/cli/tokens/:id` | token akses            | admin                            |

Lihat [openapi.yaml](../openapi.yaml) untuk skema penuh.
