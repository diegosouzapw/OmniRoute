# 🐳 Docker Guide — OmniRoute (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Referensi lengkap deployment Docker. Untuk memulai dengan cepat, lihat [bagian Docker di README](../README.md#-docker).

## Daftar Isi

- [Menjalankan dengan Cepat](#quick-run)
- [Dengan File Environment](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Profil yang Tersedia](#available-profiles)
- [Mengonfigurasi alat CLI host saat OmniRoute berjalan di Docker](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Sidecar Redis](#redis-sidecar)
- [Compose Produksi](#production-compose)
- [Tahapan Dockerfile](#dockerfile-stages)
- [Variabel Environment Penting](#critical-environment-variables)
- [Docker Compose dengan Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare Quick Tunnel](#cloudflare-quick-tunnel)
- [Tag Image](#image-tags)
- [Ketersediaan: SQLite default hanya mendukung satu replika](#availability-default-sqlite-is-single-replica)
- [Catatan Penting](#important-notes)

---

## Menjalankan Cepat

> **Host sendiri dengan satu perintah?** Lihat
> [Panduan Host Sendiri](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (image yang telah dipublikasikan +
> Redis, hanya loopback, tanpa pilihan profil). Menjalankan Cepat di bawah ini adalah
> cara dengan satu container bagi pengguna yang sudah menjalankan Redis di tempat lain.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Dengan File Environment

```bash
# Salin dan edit .env terlebih dahulu
cp .env.example .env

docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  --env-file .env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Docker Compose

```bash
# Profil dasar (tanpa alat CLI)
docker compose --profile base up -d

# Profil CLI (Claude Code, Codex, OpenClaw bawaan)
docker compose --profile cli up -d

# Profil host (utamanya untuk Linux; memasang biner CLI host sebagai hanya-baca)
docker compose --profile host up -d

# Gabungkan CLI + sidecar CLIProxyAPI
docker compose --profile cli --profile cliproxyapi up -d
```

## Profil yang Tersedia

OmniRoute menyediakan empat profil Compose. Pilih profil yang sesuai dengan lingkungan Anda.

| Profil           | Layanan          | Kapan digunakan                                                                                                                                    | Perintah                                     |
| ---------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (default) | `omniroute-base` | Server headless / runtime minimal, tanpa CLI penyedia yang disertakan                                                                              | `docker compose --profile base up -d`        |
| `cli`            | `omniroute-cli`  | Alur kerja agentik yang memanggil `omniroute providers/setup/doctor` dan CLI bawaan (Codex, Claude Code, Droid, OpenClaw)                          | `docker compose --profile cli up -d`         |
| `host`           | `omniroute-host` | Host Linux yang memerlukan akses mirip `network_mode` ke CLI host dengan memasang `~/.local/bin`, `~/.codex`, `~/.claude`, dll. sebagai hanya-baca | `docker compose --profile host up -d`        |
| `cliproxyapi`    | `cliproxyapi`    | Menjalankan sidecar [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) pada port `8317` untuk pemroksian CLI upstream                     | `docker compose --profile cliproxyapi up -d` |

> Beberapa profil dapat digabungkan: `docker compose --profile cli --profile cliproxyapi up -d`.

## Mengonfigurasi alat CLI host saat OmniRoute berjalan di Docker

`omniroute setup-codex`, `setup-claude`, `config set <tool>`, dan tombol
**Simpan konfigurasi** di dasbor semuanya menulis file seperti `~/.codex/*.config.toml`. Path tersebut
hanya bermakna pada mesin tempat CLI benar-benar berjalan. Jika dijalankan di dalam
container, penulisan akan masuk ke direktori home milik container (`/home/node` —
image berjalan sebagai `USER node`), yang tidak akan pernah dibaca oleh CLI host dan akan
dihapus begitu container dibuat ulang.

OmniRoute mendeteksi hal ini dan menolak penulisan dengan memberikan instruksi alih-alih
melaporkan keberhasilan yang tidak dapat Anda manfaatkan: CLI keluar dengan kode `2`, dan API merespons `422`
dengan `containerEphemeralTarget: true`.

### Direkomendasikan: jalankan CLI di host dan OmniRoute di Docker

Container menyediakan API; CLI mengonfigurasi alat di host Anda.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # arahkan CLI ke container
omniroute setup-codex                      # menulis ke ~/.codex yang sebenarnya di host Anda
```

Ini merupakan pilihan yang tepat ketika Codex, Claude Code, Cursor, atau alat serupa berjalan di
laptop Anda — yang merupakan konfigurasi umum.

### Alternatif: bind-mount direktori konfigurasi host (profil `host`)

Jika Anda ingin container itu sendiri menulis konfigurasi host, mount
direktori tersebut dan arahkan `CLI_CONFIG_HOME` ke root mount. Profil `host`
sudah melakukan hal ini:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Bind mount membuat path tersebut dapat dipercaya: OmniRoute membaca
`/proc/self/mountinfo` dan mengizinkan penulisan ke path yang di-mount (serta ke direktori
yang turunannya merupakan mount, yang persis seperti struktur `/host-home` di atas), sembari
tetap menolak path yang tidak di-mount.

### Jalan keluar: konfigurasikan CLI milik container itu sendiri (gunakan seperlunya)

Ketika CLI memang benar-benar berada di dalam container (profil `cli`), penulisan
tersebut memang disengaja. Teruskan `--allow-container-write` ke perintah `setup-*` apa pun, atau atur
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` untuk server. Penulisan akan dilanjutkan
dengan peringatan bahwa hasilnya tidak akan bertahan setelah container dibuat ulang.

> **Peringatan keamanan — profil `cli` + mount `docker.sock`.**
> Profil `cli` melakukan bind-mount `/var/run/docker.sock` agar pembaru otomatis
> di dalam container dapat membuat ulang stack melalui daemon host
> (`src/lib/system/autoUpdate.ts` memeriksa keberadaan socket tersebut dan melewati
> jalur Docker jika socket tidak tersedia). Socket tersebut merupakan **batas kepercayaan
> setara root host**: apa pun yang dapat mengaksesnya dapat mengendalikan daemon Docker host sebagai
> root — termasuk membuat, memeriksa, menghentikan, dan menghapus container apa pun di host.
> Implikasinya:
>
> 1. **Jangan pernah mengekspos port profil `cli` ke jaringan.** Publikasikan
>    port tersebut di `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — profil `cli` yang dapat dijangkau dari LAN akan mengubah RCE tingkat dasbor menjadi
>    pengambilalihan penuh atas host.
> 2. **Jangan bind direktori host tambahan apa pun ke profil `cli`.**
>    Socket Docker ditambah mount lain akan memberi container akses baca/tulis penuh
>    ke sistem file dan konfigurasi host Anda. Jika sebuah alat perlu mengakses proyek,
>    jalankan alat tersebut secara lokal dengan binary CLI — jangan mount proyek itu
>    ke dalam container `cli`.
>
> Jika Anda tidak memerlukan pembaruan otomatis di dalam container, jangan aktifkan profil `cli`
> (`COMPOSE_PROFILES=core,redis` atau yang lebih singkat). Profil lainnya tidak
> me-mount socket Docker.
>
> Lihat `docs/security/MITM-TPROXY-DECRYPT.md` (git; tidak dikompilasi ke `/docs`) untuk model ancaman terkait
> MITM, dan `docs/security/SUPPLY_CHAIN.md` untuk rantai asal-usul binary
> `codex`/`claude-code`/`droid`/`openclaw`.

## Sidecar Redis

OmniRoute mengandalkan Redis untuk mendukung pembatas laju terdistribusi dan cache bersama. Layanan `redis` **selalu didefinisikan** dalam `docker-compose.yml` (tidak memiliki pembatas profil) dan dimulai bersama profil lainnya.

| Detail                | Nilai                                         |
| --------------------- | --------------------------------------------- |
| Image                 | `redis:7-alpine`                              |
| Nama kontainer        | `omniroute-redis`                             |
| Port internal         | `6379`                                        |
| Port host (override)  | `REDIS_PORT` (nilai default `6379`)           |
| Bind host (override)  | `REDIS_BIND_HOST` (nilai default `127.0.0.1`) |
| Volume                | `omniroute-redis-data` → `/data`              |
| Pemeriksaan kesehatan | `redis-cli ping` (interval 10 detik)          |

Variabel lingkungan terkait:

- `REDIS_URL` — string koneksi yang diinjeksikan ke aplikasi (`redis://redis:6379` secara default).
- `REDIS_PORT` — pemetaan port sisi host untuk kontainer Redis.
- `REDIS_BIND_HOST` — antarmuka host tempat port dipublikasikan. Nilai defaultnya adalah `127.0.0.1`.

> **Mengapa loopback digunakan secara default:** sidecar berjalan tanpa `requirepass`, dan kontainer
> aplikasi mengaksesnya melalui jaringan compose (`redis:6379`) — port yang dipublikasikan
> hanya disediakan untuk alat sisi host (`redis-cli`, `npm run dev` lokal). Mempublikasikannya pada
> `0.0.0.0` akan mengekspos Redis tanpa autentikasi ke setiap host di LAN Anda. Jika Anda menetapkan
> `REDIS_BIND_HOST=0.0.0.0`, tambahkan juga `--requirepass` ke `command:` layanan.

**Menonaktifkan Redis** tidak disarankan (pembatas laju akan beralih ke fallback dalam memori dengan kemampuan yang menurun). Jika harus melakukannya, hapus/beri komentar pada blok layanan `redis:` di `docker-compose.yml` atau skalakan ke nol:

```bash
docker compose up -d --scale redis=0
```

## Compose Produksi

Untuk snapshot produksi terisolasi yang berjalan berdampingan dengan pengembangan, gunakan `docker-compose.prod.yml`.

| Detail                | Nilai                                                                                          |
| --------------------- | ---------------------------------------------------------------------------------------------- |
| File                  | `docker-compose.prod.yml`                                                                      |
| Port dasbor default   | `PROD_DASHBOARD_PORT=20130` (dipetakan ke `${DASHBOARD_PORT:-20128}` internal)                 |
| Port API default      | `PROD_API_PORT=20131`                                                                          |
| Image                 | `omniroute:prod` (dibuat dari target `runner-cli`)                                             |
| Kontainer Redis       | `omniroute-redis-prod` (`redis:8.6.2`, volume khusus `redis-prod-data`)                        |
| Volume data           | `omniroute-prod-data` (bernama, dipertahankan saat pembuatan ulang)                            |
| Pemeriksaan kesehatan | `node healthcheck.mjs` + `redis-cli ping`, dengan `depends_on` bergantung pada kesehatan Redis |

Cara menggunakan:

```bash
# Bangun & mulai stack produksi
docker compose -f docker-compose.prod.yml up -d --build

# Alirkan log
docker compose -f docker-compose.prod.yml logs -f

# Hentikan (pertahankan volume)
docker compose -f docker-compose.prod.yml down
```

Stack produksi berjalan secara paralel dengan compose pengembangan (nama kontainer, port, dan volume berbeda), sehingga Anda dapat terus melakukan iterasi secara lokal sementara produksi tetap berjalan.

## Tahapan Dockerfile

Repositori ini menyediakan Dockerfile multi-tahap (`Dockerfile`). Tiga tahapan diekspos; pilih `target` yang tepat untuk kasus penggunaan Anda.

| Tahap         | Image dasar           | Tujuan                                                                                                                                                                      |
| ------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Menginstal dependensi (`npm ci --legacy-peer-deps`) dan menjalankan `npm run build` (Turbopack secara default — lihat Sumber daya waktu build di bawah)                     |
| `runner-base` | `node:26-trixie-slim` | Runtime produksi dengan output standalone Next.js. **Tidak menyertakan CLI penyedia.**                                                                                      |
| `runner-cli`  | `runner-base`         | Menambahkan `git`, `docker.io`, `docker-compose`, serta CLI global: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Pilih ini untuk alur kerja agen.** |

Build target tertentu secara manual:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
```

### Sumber daya waktu build

Tiga argumen build mengendalikan biaya sumber daya tahap `builder`. Argumen tersebut hanya berlaku saat build —
`OMNIROUTE_MEMORY_MB` (di bawah) merupakan pengaturan runtime yang terpisah.

| Argumen build               | Default | Efek                                                                                           |
| --------------------------- | ------- | ---------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `1`     | `0` melakukan build dengan webpack. Memori puncak lebih rendah, tetapi lebih lambat.           |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`  | Batas heap V8 (`--max-old-space-size`) untuk `next build` yang dijalankan.                     |
| `OMNIROUTE_BUILD_WORKERS`   | `2`     | Mengisi `CIRCLE_NODE_TOTAL`; Next menetapkan `workers = N - 1` untuk pengumpulan data halaman. |

`OMNIROUTE_BUILD_WORKERS` adalah pengaturan yang perlu dinaikkan pada builder besar dan
perlu dicurigai ketika build dengan sumber daya terbatas berhenti **setelah** `✓ Compiled successfully`. Setiap
worker data halaman merupakan proses tersendiri, begitu pula proses induk `next build`;
reproduksi langsung pada VPS (isu #7518) mengukur RSS puncak setiap proses sebesar
~4,5 GB terlepas dari flag heap `NODE_OPTIONS` (Turbopack melakukan kompilasi dalam
memori native/Rust di luar heap V8). Nilai default `2` (→ 1 worker, total 2
proses) disesuaikan untuk runner yang di-host GitHub dengan 16 GB / 4 vCPU yang
digunakan pipeline publikasi. Pada `8` (→ 7 worker), runner tersebut kehabisan memori dan
buildkit menggagalkan langkah dengan `ResourceExhausted: ... cannot allocate memory`;
`3` (→ 2 worker) tetap tidak mencukupi setelah RSS per proses diukur
secara langsung, bukan disimpulkan. `tests/unit/docker-build-memory-budget.test.ts`
melakukan perhitungan berdasarkan angka yang diukur dan gagal jika salah satu pengaturan
melampaui kapasitas runner.

Turbopack melakukan kompilasi dalam memori native Rust yang berada **di luar** heap V8, sehingga
`OMNIROUTE_BUILD_MEMORY_MB` tidak membatasinya. Pada host dengan batas memori,
build kemudian dihentikan dengan SIGKILL oleh OOM killer tanpa teks kesalahan sama sekali — proses hanya
berhenti di tengah `Creating an optimized production build`, sehingga tampak seperti macet,
bukan kehabisan memori. Jika host build memiliki sumber daya terbatas, ganti bundler:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=0 \
  -t omniroute:base .
```

`webpackBuildWorker` diaktifkan, sehingga `next build` menjalankan proses induk **dan** proses worker,
dan masing-masing mematuhi `OMNIROUTE_BUILD_MEMORY_MB` secara terpisah. Tetapkan batas
container kira-kira lebih dari dua kali nilai tersebut, bukan hanya satu kali.

Diukur pada tree ini (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Bundler   | Batas container | Hasil                                     |
| --------- | --------------- | ----------------------------------------- |
| Turbopack | 8 GiB / 16 GiB  | Dihentikan OOM pada keduanya, tanpa pesan |
| webpack   | 8 GiB           | Worker build dihentikan dengan SIGKILL    |
| webpack   | 12 GiB          | Berhasil, mencapai puncak 11,1 GiB        |

### Default runtime

Default yang diekspor oleh `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Perilaku memori di Docker:

- Image menetapkan `OMNIROUTE_MEMORY_MB=1024` dan menurunkan `NODE_OPTIONS=--max-old-space-size=1024` darinya.
- Proses server aktual dimulai oleh peluncur standalone, yang membaca `OMNIROUTE_MEMORY_MB` dan menambahkan `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node menggunakan nilai `--max-old-space-size` terakhir yang diulang, sehingga menetapkan `OMNIROUTE_MEMORY_MB` akan mengendalikan batas heap Docker yang efektif.
- Karena image selalu menetapkannya, fallback milik peluncur yang dikalibrasi berdasarkan RAM tidak pernah berlaku di Docker. Naikkan nilainya secara eksplisit sesuai beban kerja (tabel di bawah). `2048` masih terlalu kecil untuk `/v1/responses` milik agen pengodean.

### RAM runtime untuk agen pengodean

Default Docker 1 GiB merupakan batas minimum untuk dasbor/percakapan ringan, bukan ukuran untuk produksi. Body `POST /v1/responses` yang panjang (ratusan pesan, puluhan alat) mempertahankan beberapa graf dalam memori selama kompresi. Dua permintaan tumpang tindih berukuran ~3 MiB / ~750 ribu token telah menyebabkan V8 berhenti pada old-space **12 GiB** (`FATAL ERROR: Reached heap limit`) dan juga memicu OOM cgroup 16 GiB. Lihat [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Tetapkan **`--memory` cgroup di atas ukuran heap** — buffer native, SQLite, dan data perantara kompresi berada di luar V8.

| Beban kerja                          | `OMNIROUTE_MEMORY_MB`   | Container / cgroup            | Catatan                                                                                                                |
| ------------------------------------ | ----------------------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| Dasbor, satu percakapan ringan       | `1024` (default image)  | ≥2 GiB                        |                                                                                                                        |
| Satu agen coding (Claude/Codex/Grok) | `8192`                  | ≥10 GiB                       | Sesi tunggal `/v1/responses` yang umum                                                                                 |
| Dua `/v1/responses` panjang serentak | `10240`–`12288`         | ≥12–16 GiB                    | Penghentian V8 terukur pada heap ~12 GiB                                                                               |
| Tiga+ konteks panjang serentak       | jangan pada satu proses | serialisasi / RAM lebih besar | Secara default, penerimaan beban berat dibatasi 1 proses aktif; menaikkannya tanpa RAM akan kembali memicu penghentian |

`omniroute serve` pada bare metal mengalibrasi ~35% RAM (dibatasi pada `[512, 4096]`) ketika `OMNIROUTE_MEMORY_MB` **tidak disetel**. Docker selalu menyetel `1024`, sehingga kalibrasi tersebut tidak pernah dijalankan dalam image resmi.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Variabel Lingkungan Kritis

Selain nilai default yang didokumentasikan dalam [ENVIRONMENT.md](../reference/ENVIRONMENT.md), variabel berikut adalah yang paling penting saat dijalankan menggunakan Docker:

| Variabel                      | Tujuan                                                                                                                                                                                                                                                     | Default                        |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Rahasia bersama untuk bridge WebSocket. **Wajib di lingkungan produksi** — atur ke string acak yang kuat.                                                                                                                                                  | tidak diatur (harus diberikan) |
| `REDIS_URL`                   | String koneksi untuk backend pembatas laju/cache                                                                                                                                                                                                           | `redis://redis:6379`           |
| `REDIS_PORT`                  | Port sisi host untuk kontainer Redis bawaan                                                                                                                                                                                                                | `6379`                         |
| `REDIS_BIND_HOST`             | Antarmuka host tempat port Redis bawaan dipublikasikan (loopback kecuali Anda menambahkan AUTH)                                                                                                                                                            | `127.0.0.1`                    |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Path host yang dipasang ke profil `cli` di `/workspace/omniroute` untuk alur kerja pembaruan mandiri                                                                                                                                                       | `.` (direktori saat ini)       |
| `OMNIROUTE_MEMORY_MB`         | Batas heap Node saat runtime untuk server Docker mandiri; menimpa default image di atas. Agen pengodean: `8192`+ (lihat [RAM runtime](#runtime-ram-for-coding-agents)).                                                                                    | `1024`                         |
| `DASHBOARD_PORT` / `API_PORT` | Menimpa port yang diekspos untuk dasbor (20128) dan API (20129)                                                                                                                                                                                            | `20128` / `20129`              |
| `APP_BIND_HOST`               | Antarmuka host tempat docker-compose memublikasikan port dasbor/API/live-WS. Dengan `REQUIRE_API_KEY=false` (default), `0.0.0.0` mengekspos proksi `/v1` anonim ke LAN — hanya perluas akses dengan `REQUIRE_API_KEY=true` atau reverse proxy di depannya. | `127.0.0.1`                    |
| `CLIPROXY_BIND_HOST`          | Antarmuka host tempat docker-compose memublikasikan sidecar `cliproxyapi` — volume datanya menyimpan kredensial penyedia.                                                                                                                                  | `127.0.0.1`                    |
| `OMNIROUTE_PLUGINS_DIR`       | Direktori yang dibaca oleh pemindai plugin runtime dan menjadi lokasi pemasangan plugin. Atur variabel ini saat plugin dipasang melalui bind mount: default mengikuti `HOME`, yang tidak selalu diekspor oleh image.                                       | `~/.omniroute/plugins`         |
| `OMNIROUTE_BASE_PATH`         | Subpath URL saat aplikasi dipublikasikan di belakang reverse proxy (misalnya `/omniroute`)                                                                                                                                                                 | _(kosong = root)_              |
| `NEXT_PUBLIC_BASE_URL`        | Origin browser publik termasuk subpath (misalnya `https://host/omniroute`)                                                                                                                                                                                 | tidak diatur                   |
| `PROD_DASHBOARD_PORT`         | Port dasbor sisi host untuk `docker-compose.prod.yml`                                                                                                                                                                                                      | `20130`                        |
| `CLIPROXYAPI_PORT`            | Port sisi host untuk sidecar `cliproxyapi`                                                                                                                                                                                                                 | `8317`                         |

## Reverse Proxy pada Subpath (Traefik / nginx)

`basePath` Next.js dikompilasi ke dalam bundle standalone. OmniRoute mencatat nilai
yang tertanam tersebut dalam file sentinel di root aplikasi (ditulis saat `npm run build`;
dibaca oleh `scripts/docker/ensure-docker-base-path.mjs`) dan membandingkannya dengan
`OMNIROUTE_BASE_PATH` ketika container dimulai. Jika nilainya berbeda dan image dibuat
untuk root domain, entrypoint menulis ulang manifes standalone, literal
`basePath`/`assetPrefix` yang disematkan (Next 16 merender URL aset SSR hanya dari
`assetPrefix` — patcher mencerminkan subpath ke dalamnya), URL aset
`/_next/static` yang tertanam (manifes referensi klien, impor media, halaman error
yang telah diprarender), serta shim `process.env` klien sebelum
`node dev/run-standalone.mjs` dijalankan.

### Build Compose (direkomendasikan)

Atur kedua variabel dalam `.env`, lalu build ulang agar image dan runtime selaras:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` meneruskan `OMNIROUTE_BASE_PATH` sebagai argumen build Docker dan
sebagai variabel lingkungan runtime.

### Image root siap pakai + subpath runtime

Image `diegosouzapw/omniroute:*` yang dipublikasikan dibuat untuk root domain. Anda
tetap dapat mengatur `OMNIROUTE_BASE_PATH` saat runtime; container akan melakukan patch
pada bundle sekali saat dimulai. Pasangkan dengan origin publik yang sesuai:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Konfigurasikan reverse proxy untuk meneruskan path eksternal **secara penuh** (jangan
hapus prefiks). Traefik harus merutekan `PathPrefix(`/omniroute`)` ke container tanpa
`StripPrefix`, sehingga Next.js menerima `/omniroute/...` dan menyajikan aset dari
`/omniroute/_next/...`.

Healthcheck Docker memeriksa endpoint siklus hidup ringan `/healthz` yang diberi prefiks
`OMNIROUTE_BASE_PATH` aktif. `/api/monitoring/health` tetap tersedia untuk
diagnostik manusia/dasbor; untuk mengarahkan kembali HEALTHCHECK container ke endpoint
tersebut (misalnya untuk penerapan pemeriksaan kesehatan mendalam), atur
`OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. Path tersebut merupakan pemeriksaan
**mendalam** (DB + ringkasan pemantauan) — sesuai untuk `HEALTHCHECK` Docker yang jarang
dijalankan jika Anda memilih untuk mengaktifkannya kembali, tetapi **tidak** untuk
interval `livenessProbe` Kubernetes.

Untuk orkestrator (Kubernetes, Nomad, dll.):

| Probe           | Utamakan                                                              | Hindari                                                     |
| --------------- | --------------------------------------------------------------------- | ----------------------------------------------------------- |
| Liveness        | HTTP `GET /livez`, atau TCP pada port utama (`PORT`, default `20128`) | `/api/monitoring/health` sebagai pemeriksaan liveness       |
| Readiness       | HTTP `GET /healthz`                                                   | Timeout ketat yang menganggap event loop sibuk sebagai mati |
| Deep / blackbox | `/api/monitoring/health`                                              | —                                                           |

`/healthz` melaporkan siklus hidup proses (`ok` / `starting` / `stopping`). `/livez`
hanya memeriksa apakah proses hidup (200 setiap kali handler dapat berjalan; endpoint
ini tidak menunggu kesiapan). Keduanya tetap berjalan pada event loop Node yang sama
dengan penanganan permintaan, sehingga pekerjaan katalog atau kompresi yang terikat CPU
dapat menundanya — sibuk ≠ mati. Utamakan liveness TCP jika probe HTTP mengalami
timeout. Panduan probe lengkap:
[Panduan pemantauan — rekomendasi probe Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose dengan Caddy (HTTPS Auto-TLS)

OmniRoute dapat diekspos secara aman menggunakan penyediaan SSL otomatis dari Caddy. Pastikan record A DNS domain Anda mengarah ke IP server Anda.

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    container_name: omniroute
    restart: unless-stopped
    volumes:
      - omniroute-data:/app/data
    environment:
      - PORT=20128
      # Origin yang diakses browser untuk callback OAuth, tautan dasbor, dan URL publik yang dihasilkan.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # URL internal antarpeladen untuk tugas terjadwal / pengambilan mandiri.
      - BASE_URL=http://omniroute:20128
      - AUTH_COOKIE_SECURE=true

  caddy:
    image: caddy:latest
    container_name: caddy
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    command: caddy reverse-proxy --from https://your-domain.com --to http://omniroute:20128

volumes:
  omniroute-data:
```

Caddy menetapkan header penerusan standar untuk kontainer upstream. OmniRoute menggunakan
`NEXT_PUBLIC_BASE_URL` sebagai origin publik kanonis untuk callback OAuth dan tautan publik yang
dihasilkan; operasi tulis dasbor yang diautentikasi menggunakan permintaan same-origin beserta
perlindungan CSRF yang terikat pada sesi. Aktifkan `OMNIROUTE_TRUST_PROXY` hanya untuk deployment
tingkat lanjut saat Anda secara sengaja ingin OmniRoute memperoleh origin publik dari header
penerusan tepercaya, bukan dari konfigurasi eksplisit.

## Cloudflare Quick Tunnel

Dukungan dasbor untuk deployment Docker mencakup **Cloudflare Quick Tunnel** sekali klik di `Dashboard → Endpoints`. Pengaktifan pertama akan mengunduh `cloudflared` hanya saat diperlukan, memulai tunnel sementara ke endpoint `/v1` Anda saat ini, dan menampilkan URL `https://*.trycloudflare.com/v1` yang dihasilkan tepat di bawah URL publik normal Anda.

Panel tunnel endpoint (Cloudflare, Tailscale, ngrok) dapat ditampilkan atau disembunyikan dari `Settings → Appearance` tanpa mengubah status tunnel yang aktif.

### Catatan Tunnel

- URL Quick Tunnel bersifat sementara dan berubah setelah setiap restart.
- Quick Tunnel tidak dipulihkan secara otomatis setelah OmniRoute atau kontainer dimulai ulang. Aktifkan kembali dari dasbor saat diperlukan.
- Instalasi terkelola saat ini mendukung Linux, macOS, dan Windows pada `x64` / `arm64`.
- Quick Tunnel terkelola secara default menggunakan transport HTTP/2 untuk menghindari peringatan buffer UDP QUIC yang bising di lingkungan kontainer dengan sumber daya terbatas. Tetapkan `CLOUDFLARED_PROTOCOL=quic` atau `auto` jika Anda menginginkan transport yang berbeda.
- Image Docker menyertakan root CA sistem dan meneruskannya ke `cloudflared` terkelola, sehingga menghindari kegagalan kepercayaan TLS saat tunnel melakukan bootstrap di dalam kontainer.
- Tetapkan `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` jika Anda ingin OmniRoute menggunakan biner yang sudah ada alih-alih mengunduhnya.

## Tag Image

| Image                    | Tag      | Ukuran | Deskripsi                                                          |
| ------------------------ | -------- | ------ | ------------------------------------------------------------------ |
| `diegosouzapw/omniroute` | `latest` | ~250MB | SemVer stabil **yang dipublikasikan** tertinggi (bukan `main` git) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | Sematkan kelas tag ini untuk GitOps                                |

Manifes multi-platform: `linux/amd64` + `linux/arm64` native (Apple Silicon, AWS Graviton, Raspberry Pi). Docker memilih arsitektur yang sesuai secara otomatis; berikan `--platform linux/amd64` jika Anda perlu memaksakan emulasi AMD64 pada host ARM.

### Kanal Rilis

OmniRoute memublikasikan kanal Docker terpisah untuk rilis stabil, pengujian cabang rilis aktif, dan build pengembangan.

| Kanal                           | Sumber                                          | Mutabilitas                              | Penggunaan yang disarankan                                                                                                       |
| ------------------------------- | ----------------------------------------------- | ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Rilis bertanda tangan/berversi                  | Tidak dapat diubah                       | Deployment produksi yang menyematkan rilis tertentu                                                                              |
| `:latest` / `:latest-web`       | SemVer stabil **yang dipublikasikan** tertinggi | Penunjuk stabil yang dapat berubah       | Mengikuti rilis stabil **setelah** tugas publikasi SemVer — **tidak** melacak `main` atau commit `release/v*` yang belum dirilis |
| `:next` / `:next-web`           | Cabang `release/v*` default saat ini            | Penunjuk prarilis yang dapat berubah     | Menguji perbaikan yang telah masuk ke cabang rilis aktif tetapi belum tersedia dalam rilis stabil                                |
| `:main` / `:main-web`           | Cabang `main`                                   | Penunjuk pengembangan yang dapat berubah | Hanya untuk pengembangan dan pengujian integrasi                                                                                 |

#### Menggunakan kanal prarilis

Kanal `next` dibuat ulang pada setiap push ke cabang `release/v*` default saat ini dan dipublikasikan untuk AMD64 maupun ARM64. Cabang pemeliharaan yang lebih lama tidak dapat menimpanya. Kanal ini menyediakan image yang dapat ditarik untuk perbaikan yang telah digabungkan ke cabang rilis aktif sebelum tag stabil berikutnya dibuat.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Untuk Docker Compose, timpa tag image yang digunakan oleh profil terpilih, lalu tarik dan buat ulang layanan:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Keamanan dan rollback

`next` adalah kanal prarilis mengambang. Kanal ini dapat berubah pada setiap push ke cabang rilis aktif dan **tidak didukung untuk penggunaan produksi**. Sematkan digest image saat mengevaluasi build tertentu:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Sebelum melakukan pengujian, cadangkan volume data OmniRoute atau direktori data yang dipasang dengan bind mount. Untuk melakukan rollback, pulihkan versi stabil atau digest yang sebelumnya digunakan, lalu buat ulang container:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Build dari branch rilis tidak pernah dapat memindahkan `latest`; hanya versi semantik stabil yang memenuhi syarat yang dapat memperbarui penunjuk stabil tersebut. Image `next` tetap menjalani pemeriksaan image rilis dan gerbang pemblokiran untuk kerentanan CRITICAL.

**`latest` bukan jaminan keterkinian terhadap git.** Perbaikan yang telah digabungkan ke `main` atau branch `release/v*` aktif **tidak** tersedia di `:latest` hingga image SemVer stabil dipublikasikan dan job publikasi memperbarui `:latest` (dengan digest yang sama seperti SemVer tersebut). Jika `latest` tampak tidak berubah sementara GitHub sudah menampilkan perbaikannya, tarik `:next` untuk menguji branch rilis atau tunggu tag SemVer.

| Yang Anda inginkan                                                    | Gunakan                          |
| --------------------------------------------------------------------- | -------------------------------- |
| GitOps / produksi yang tidak boleh berubah tanpa disengaja            | Pin `:X.Y.Z` (atau digest image) |
| Mengikuti rilis stabil dan menerima pembuatan ulang pada setiap rilis | `:latest`                        |
| Menguji commit `release/v*` yang belum dirilis                        | `:next` (bukan untuk produksi)   |
| Menguji `main`                                                        | `:main` (bukan untuk produksi)   |

## Ketersediaan: SQLite default hanya mendukung satu replika

Docker / Kubernetes OmniRoute standar adalah **satu proses Node + satu penulis SQLite**. Ketersediaan tinggi **tidak didukung** pada topologi tersebut.

| Batasan                                                      | Konsekuensi                                                                                                                                                                                                                                                                                                                                         |
| ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Penulis tunggal                                              | **Jangan** menjalankan beberapa replika terhadap file SQLite yang sama. Hal tersebut akan merusak DB.                                                                                                                                                                                                                                               |
| Pembuatan ulang / mulai ulang / penghentian oleh HEALTHCHECK | **Gangguan total** pada SSE yang sedang berlangsung, sesi dasbor, dan status dalam memori. Setiap klien yang terhubung akan terputus. Permintaan baru selama periode tanpa endpoint akan menerima **`502 Bad Gateway: Unknown error`** dari reverse proxy, bukan JSON OmniRoute — klien tidak dapat membedakannya dari kegagalan penyedia (#11015). |
| Event loop yang sama dengan `/healthz`                       | Siklus katalog atau kompresi yang sibuk dapat menunda probe; timeout yang singkat kemudian akan memulai ulang **satu-satunya** replika.                                                                                                                                                                                                             |

**Matriks probe** (lihat juga [rekomendasi probe Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Probe              | Target                                                        | Jangan gunakan                                              |
| ------------------ | ------------------------------------------------------------- | ----------------------------------------------------------- |
| Liveness           | TCP pada `PORT` (default `20128`), atau HTTP lunak `/healthz` | `/api/monitoring/health`                                    |
| Readiness          | HTTP `GET /healthz`                                           | Timeout ketat yang menganggap event loop sibuk sebagai mati |
| Mendalam / manusia | `/api/monitoring/health`                                      | Liveness kubelet otomatis                                   |

**Peningkatan versi:** perkirakan setiap sesi akan terputus. Kuras klien jika memungkinkan; tidak ada pembaruan bergulir pada SQLite default. Compose `restart: unless-stopped` ditambah Docker `HEALTHCHECK` juga akan mengganti satu-satunya proses ketika kontainer berstatus Tidak Sehat — dengan dampak yang sama.

Cuplikan Kubernetes untuk **satu replika** (Recreate wajib digunakan; jangan menaikkan `replicas` terhadap satu file SQLite):

```yaml
spec:
  replicas: 1
  strategy:
    type: Recreate
  template:
    spec:
      terminationGracePeriodSeconds: 90
      containers:
        - name: omniroute
          lifecycle:
            preStop:
              exec:
                command: ["/bin/sleep", "15"]
          readinessProbe:
            httpGet:
              path: /healthz
              port: 20128
            periodSeconds: 5
          livenessProbe:
            tcpSocket:
              port: 20128
            periodSeconds: 20
```

Penundaan `preStop` memungkinkan kube menghapus endpoint Service sebelum SIGTERM sehingga lalu lintas **baru** berhenti mencapai proses yang sedang dihentikan. SSE `/v1/responses` yang sedang berlangsung dikuras hingga `SHUTDOWN_TIMEOUT_MS` (default 30 detik) melalui lease penerimaan kelas berat (#11015). Permintaan baru yang masih mencapai proses akan menerima `503` + `Retry-After: 5`. Jeda tanpa endpoint akibat Recreate hingga pengganti berstatus Ready tetap merupakan gangguan total — hal tersebut merupakan karakteristik topologi SQLite, bukan kesalahan konfigurasi probe.

Postgres eksternal / HA multi-penulis **bukan** jalur standar yang terdokumentasi. Jika Anda memerlukan HA, pertahankan satu replika atau jalankan topologi yang telah diuji dan didokumentasikan secara terpisah oleh proyek. Pekerjaan Postgres/MySQL tersedia di [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Hingga fitur tersebut tersedia, satu-satunya cara yang didukung untuk meningkatkan kapasitas `/v1/responses` **berskala besar** adalah N proses independen (bagian berikutnya), bukan `replicas > 1` pada satu volume.

## Penskalaan keluar: N proses independen

Satu proses Node adalah **satu heap V8**. Dua coding-agent `POST /v1/responses` (RTK + Caveman) yang saling tumpang tindih, masing-masing berukuran ~3 MiB / ~750 ribu token, menghentikan heap tersebut pada ~12 Gi (`FATAL ERROR: Reached heap limit`) dan dapat menyebabkan OOM pada cgroup 16 Gi. Lihat [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Pengukuran tersebut merupakan peringatan **anggaran memori**, bukan batas maksimum produk sebanyak dua permintaan `/v1/responses` panjang secara bersamaan. Penerimaan chat berat dibatasi oleh anggaran byte masuk yang diturunkan secara otomatis (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) dan ditentukan berdasarkan batas V8/cgroup yang sama — menimpanya dengan nilai yang lebih tinggi (atau menetapkan batas jumlah permintaan lama `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) pada proses yang kapasitasnya sudah ditentukan akan kembali menyebabkan penghentian. Chat kecil, `/healthz`, `/v1/models`, dan MCP **tidak** termasuk dalam batas tersebut.

### Satu proses: lebih dari dua `/v1/responses` panjang

Proses yang **sehat** (heap di bawah `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, default `0.75`) **dapat** menjalankan lebih dari dua `POST /v1/responses` panjang secara bersamaan ketika anggaran byte dalam proses yang sedang berlangsung (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) masih memiliki ruang. Body dengan ukuran sama dengan atau di atas `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (default 256 KiB) mengambil lease berat yang sama seperti permintaan dengan struktur kompleks dan menggunakan mekanisme lolos `tryAcquireHealthyHeadroom` dari [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) yang sama (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Puluhan klien SSE panjang secara bersamaan (operator sering memerlukan 40–50) adalah persoalan **anggaran memori** — tentukan ukuran heap + slot primer/headroom + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — bukan batas keras produk “maksimal 2”. Heap yang mengalami tekanan tetap mengurangi beban dengan `503` yang dapat dicoba ulang agar masalah #7849 tidak kembali terjadi.

Untuk **melipatgandakan heap** (old-space V8 independen) **saat ini**:

| Lakukan                                                                                                                                                       | Jangan lakukan                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Jalankan **N container/pod**, masing-masing dengan `DATA_DIR` / volume **sendiri**                                                                            | Menetapkan `replicas > 1` terhadap satu file SQLite              |
| Tentukan ukuran heavy in-flight + healthy-headroom berdasarkan heap / anggaran byte in-flight; 1–2 adalah default konservatif #7849, bukan batas keras produk | Memberikan satu proses RAM 8× dan batas jumlah tak terbatas      |
| Opsional: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` untuk **penghitung kuota bersama**                                                             | Menganggap Redis sebagai SQLite bersama — Redis bukan itu        |
| Duplikasikan secret penyedia ke setiap instance (atau terima dashboard yang terpartisi)                                                                       | Mengharapkan satu dashboard / satu log panggilan lintas instance |
| Tempatkan di belakang load balancer apa pun; sticky berdasarkan API key atau sesi sudah cukup                                                                 | Memerlukan middleware khusus vendor yang memahami ukuran         |

Perangkat keras: jumlah `/v1/responses` panjang per instance yang berjalan secara bersamaan merupakan persoalan **anggaran memori** (heap + byte in-flight / #10110). `N` `DATA_DIR` independen tetap melipatgandakan heap: RAM host harus mencakup `N × cgroup`, bukan “satu pod 16 Gi dengan N=8.” Jangan pernah menggunakan `replicas > 1` pada satu file SQLite.

Contoh Compose (dua heap, dua volume — bukan `deploy.replicas: 2`):

```yaml
services:
  omniroute-a:
    image: diegosouzapw/omniroute:3.8.49
    environment:
      DATA_DIR: /app/data
      OMNIROUTE_MEMORY_MB: "12288"
      QUOTA_STORE_DRIVER: redis
      QUOTA_STORE_REDIS_URL: redis://redis:6379
    volumes: [omniroute-a-data:/app/data]
    ports: ["20128:20128"]
  omniroute-b:
    image: diegosouzapw/omniroute:3.8.49
    environment:
      DATA_DIR: /app/data
      OMNIROUTE_MEMORY_MB: "12288"
      QUOTA_STORE_DRIVER: redis
      QUOTA_STORE_REDIS_URL: redis://redis:6379
    volumes: [omniroute-b-data:/app/data]
    ports: ["20138:20128"]
volumes:
  omniroute-a-data:
  omniroute-b-data:
```

Kepadatan dalam proses (kompresi dikeluarkan dari isolate HTTP) dibahas di [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Satu cluster logis pada state persisten bersama dibahas di [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Catatan Penting

- **Mode WAL SQLite:** `docker stop` harus dibiarkan selesai agar OmniRoute dapat melakukan checkpoint terhadap perubahan terbaru kembali ke `storage.sqlite`. File Compose bawaan sudah menetapkan masa tenggang penghentian selama 40 detik. Jika Anda menjalankan image secara langsung, tetap gunakan `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Atur ke `true` jika pencadangan rutin/sebelum penulisan dikelola secara eksternal. Migrasi database yang sudah ada tetap memerlukan snapshot pengaman yang tahan lama dan perlindungan migrasi massal tersendiri.
- **Persistensi Data:** Selalu pasang volume ke `/app/data` untuk mempertahankan database, kunci, dan konfigurasi Anda saat container dimulai ulang.
- **Konfigurasi Port:** Timpa variabel lingkungan `PORT` untuk mengubah port default `20128`.

## Lihat Juga

- [Panduan Deployment VM](../ops/VM_DEPLOYMENT_GUIDE.md) — Penyiapan VM + nginx + Cloudflare
- [Panduan Deployment Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Deploy ke Fly.io
- [Konfigurasi Lingkungan](../reference/ENVIRONMENT.md) — Referensi lengkap `.env`
