# 🐳 Docker Guide — OmniRoute (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Rujukan lengkap penggunaan Docker. Untuk permulaan pantas, lihat [bahagian Docker README](../README.md#-docker).

## Kandungan

- [Jalankan dengan Pantas](#quick-run)
- [Dengan Fail Persekitaran](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Profil yang Tersedia](#available-profiles)
- [Mengkonfigurasi alat CLI hos apabila OmniRoute berjalan dalam Docker](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Sidecar Redis](#redis-sidecar)
- [Compose Produksi](#production-compose)
- [Peringkat Dockerfile](#dockerfile-stages)
- [Pemboleh Ubah Persekitaran Kritikal](#critical-environment-variables)
- [Docker Compose dengan Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare Quick Tunnel](#cloudflare-quick-tunnel)
- [Tag Imej](#image-tags)
- [Ketersediaan: SQLite lalai ialah replika tunggal](#availability-default-sqlite-is-single-replica)
- [Ralat rantau Gemini dalam Docker](#gemini-regional-errors-inside-docker)
- [Nota Penting](#important-notes)

---

## Jalankan dengan Pantas

> **Hos sendiri dengan satu perintah?** Lihat
> [Panduan Hos Sendiri](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (imej yang diterbitkan +
> Redis, gelung balik sahaja, tiada pilihan profil). Kaedah Jalankan dengan Pantas di bawah ialah
> laluan satu bekas untuk pengguna yang telah menjalankan Redis di tempat lain.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Dengan Fail Persekitaran

```bash
# Salin dan sunting .env terlebih dahulu
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
# Profil asas (tanpa alat CLI)
docker compose --profile base up -d

# Profil CLI (Claude Code, Codex, OpenClaw terbina dalam)
docker compose --profile cli up -d

# Profil hos (mengutamakan Linux; melekapkan perduaan CLI hos sebagai baca sahaja)
docker compose --profile host up -d

# Profil web (Chromium/Playwright untuk penyedia sesi web)
docker compose --profile web up -d

# Gabungkan CLI + sidecar CLIProxyAPI
docker compose --profile cli --profile cliproxyapi up -d
```

## Profil yang Tersedia

OmniRoute menyediakan profil Compose untuk bentuk penggunaan utama. Pilih profil yang sepadan dengan persekitaran anda.

| Profil         | Perkhidmatan     | Masa untuk digunakan                                                                                                                                             | Perintah                                     |
| -------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (lalai) | `omniroute-base` | Pelayan tanpa paparan / masa jalan minimum, tanpa CLI penyedia yang disertakan                                                                                   | `docker compose --profile base up -d`        |
| `cli`          | `omniroute-cli`  | Aliran kerja berasaskan ejen yang memanggil `omniroute providers/setup/doctor` dan CLI yang disertakan (Codex, Claude Code, Droid, OpenClaw)                     | `docker compose --profile cli up -d`         |
| `host`         | `omniroute-host` | Hos Linux yang mahukan akses seperti `network_mode` kepada CLI hos dengan melekapkan `~/.local/bin`, `~/.codex`, `~/.claude`, dan sebagainya sebagai baca sahaja | `docker compose --profile host up -d`        |
| `cliproxyapi`  | `cliproxyapi`    | Jalankan sidecar [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) pada port `8317` untuk proksi CLI huluan                                            | `docker compose --profile cliproxyapi up -d` |
| `web`          | `omniroute-web`  | Penyedia sesi web yang memerlukan pelayar: `gemini-web`, `claude-web`, `claude-turnstile` (membina `runner-web`, termasuk Chromium)                              | `docker compose --profile web up -d`         |

> Berbilang profil boleh digabungkan: `docker compose --profile cli --profile cliproxyapi up -d`.

## Mengkonfigurasi alat CLI hos apabila OmniRoute berjalan dalam Docker

`omniroute setup-codex`, `setup-claude`, `config set <tool>` dan butang
**Simpan konfigurasi** pada papan pemuka semuanya menulis fail seperti `~/.codex/*.config.toml`. Laluan tersebut
hanya mempunyai makna pada mesin tempat CLI sebenarnya berjalan. Jalankannya di dalam
bekas dan penulisan akan dilakukan ke direktori utama bekas itu sendiri (`/home/node` —
imej tersebut berjalan sebagai `USER node`), yang tidak akan dibaca oleh mana-mana CLI hos dan
akan dibuang sebaik sahaja bekas dicipta semula.

OmniRoute mengesan keadaan ini dan menolak penulisan tersebut dengan memberikan arahan, bukannya
melaporkan kejayaan yang tidak dapat anda gunakan: CLI keluar dengan kod `2`, dan API membalas `422`
dengan `containerEphemeralTarget: true`.

### Disyorkan: jalankan CLI pada hos, OmniRoute dalam Docker

Bekas menyediakan API; CLI mengkonfigurasi alat hos anda.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # halakan CLI ke bekas
omniroute setup-codex                      # menulis ke ~/.codex sebenar pada hos anda
```

Ini ialah pilihan yang tepat apabila Codex, Claude Code, Cursor atau alat serupa berjalan pada
komputer riba anda — yang merupakan persediaan lazim.

### Alternatif: lekap-ikat direktori konfigurasi hos (profil `host`)

Jika anda mahu bekas itu sendiri menulis konfigurasi hos anda, lekapkan
direktori tersebut dan halakan `CLI_CONFIG_HOME` ke akar lekapan. Profil `host`
sudah melakukan perkara ini:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Lekapan ikat menjadikan laluan itu boleh dipercayai: OmniRoute membaca
`/proc/self/mountinfo` dan membenarkan penulisan ke laluan yang dilekapkan (dan ke direktori
yang anak direktorinya ialah lekapan, iaitu tepat seperti struktur `/host-home` di atas), sambil
tetap menolak laluan yang tidak dilekapkan.

### Jalan keluar: konfigurasikan CLI milik bekas itu sendiri (gunakan dengan berhati-hati)

Apabila CLI benar-benar berada di dalam bekas (profil `cli`), penulisan tersebut
memang disengajakan. Berikan `--allow-container-write` kepada mana-mana perintah `setup-*`, atau tetapkan
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` untuk pelayan. Penulisan akan diteruskan
dengan amaran bahawa ia tidak akan kekal selepas bekas dicipta semula.

> **Amaran keselamatan — profil `cli` + lekapan `docker.sock`.**
> Profil `cli` mengikat-lekap `/var/run/docker.sock` supaya pengemas kini automatik
> dalam bekas boleh mencipta semula tindanan melalui daemon hos
> (`src/lib/system/autoUpdate.ts` memeriksa kewujudan soket tersebut dan melangkau
> laluan Docker apabila soket itu tiada). Soket tersebut ialah **sempadan
> kepercayaan root hos**: apa-apa sahaja yang boleh mencapainya dapat mengawal daemon Docker hos sebagai
> root — ia boleh mencipta, memeriksa, menghentikan dan mengalih keluar mana-mana bekas pada hos.
> Implikasinya:
>
> 1. **Jangan sekali-kali dedahkan port profil `cli` kepada rangkaian.** Terbitkannya
>    pada `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — profil `cli` yang boleh dicapai melalui LAN menukarkan sebarang RCE pada peringkat papan pemuka kepada
>    pencerobohan hos sepenuhnya.
> 2. **Jangan ikat mana-mana direktori hos tambahan ke dalam profil `cli`.**
>    Soket Docker bersama sebarang lekapan tambahan memberikan bekas akses baca/tulis penuh
>    kepada sistem fail dan konfigurasi hos anda. Jika anda memerlukan alat untuk
>    mengakses projek, jalankannya secara setempat dengan perduaan CLI — jangan lekapkan projek itu
>    ke dalam bekas `cli`.
>
> Jika anda tidak memerlukan kemas kini automatik dalam bekas, jangan aktifkan profil `cli`
> (`COMPOSE_PROFILES=core,redis` atau yang lebih ringkas). Profil lain tidak
> melekapkan soket Docker.
>
> Lihat `docs/security/MITM-TPROXY-DECRYPT.md` (git; tidak dikompil ke dalam `/docs`) untuk model ancaman berkaitan
> MITM, dan `docs/security/SUPPLY_CHAIN.md` untuk rantaian asal-usul perduaan
> `codex`/`claude-code`/`droid`/`openclaw`.

## Sidecar Redis

OmniRoute bergantung pada Redis untuk menyokong pengehad kadar teragih dan cache dikongsi. Perkhidmatan `redis` **sentiasa ditakrifkan** dalam `docker-compose.yml` (ia tidak mempunyai sekatan profil) dan bermula bersama mana-mana profil lain.

| Butiran                  | Nilai                                        |
| ------------------------ | -------------------------------------------- |
| Imej                     | `redis:7-alpine`                             |
| Nama kontena             | `omniroute-redis`                            |
| Port dalaman             | `6379`                                       |
| Port hos (penggantian)   | `REDIS_PORT` (lalai kepada `6379`)           |
| Ikatan hos (penggantian) | `REDIS_BIND_HOST` (lalai kepada `127.0.0.1`) |
| Volum                    | `omniroute-redis-data` → `/data`             |
| Semakan kesihatan        | `redis-cli ping` (selang 10s)                |

Pemboleh ubah persekitaran yang berkaitan:

- `REDIS_URL` — rentetan sambungan yang disuntik ke dalam aplikasi (`redis://redis:6379` secara lalai).
- `REDIS_PORT` — pemetaan port pada sisi hos untuk kontena Redis.
- `REDIS_BIND_HOST` — antara muka hos tempat port diterbitkan. Lalai kepada `127.0.0.1`.

> **Mengapa gelung balik digunakan secara lalai:** sidecar berjalan tanpa `requirepass`, dan kontena
> aplikasi mencapainya melalui rangkaian compose (`redis:6379`) — port yang diterbitkan
> hanya disediakan untuk alat pada sisi hos (`redis-cli`, `npm run dev` setempat). Penerbitan pada
> `0.0.0.0` akan mendedahkan Redis tanpa pengesahan kepada setiap hos dalam LAN anda. Jika anda menetapkan
> `REDIS_BIND_HOST=0.0.0.0`, tambahkan juga `--requirepass` pada `command:` perkhidmatan.

**Melumpuhkan Redis** tidak disyorkan (pengehad kadar akan beralih kepada sandaran dalam memori yang kurang berkesan). Jika perlu, sama ada alih keluar/ulas blok perkhidmatan `redis:` dalam `docker-compose.yml` atau skalakannya kepada sifar:

```bash
docker compose up -d --scale redis=0
```

## Compose Produksi

Untuk petikan produksi terpencil yang berjalan bersama persekitaran pembangunan, gunakan `docker-compose.prod.yml`.

| Butiran                 | Nilai                                                                                              |
| ----------------------- | -------------------------------------------------------------------------------------------------- |
| Fail                    | `docker-compose.prod.yml`                                                                          |
| Port papan pemuka lalai | `PROD_DASHBOARD_PORT=20130` (dipetakan kepada `${DASHBOARD_PORT:-20128}` dalaman)                  |
| Port API lalai          | `PROD_API_PORT=20131`                                                                              |
| Imej                    | `omniroute:prod` (dibina daripada sasaran `runner-cli`)                                            |
| Kontena Redis           | `omniroute-redis-prod` (`redis:8.6.2`, volum `redis-prod-data` khusus)                             |
| Volum data              | `omniroute-prod-data` (bernama, dikekalkan merentasi pembinaan semula)                             |
| Semakan kesihatan       | `node healthcheck.mjs` + `redis-cli ping`, dengan `depends_on` disekat berdasarkan kesihatan Redis |

Cara menggunakan:

```bash
# Bina & mulakan tindanan produksi
docker compose -f docker-compose.prod.yml up -d --build

# Strim log
docker compose -f docker-compose.prod.yml logs -f

# Hentikan tindanan (kekalkan volum)
docker compose -f docker-compose.prod.yml down
```

Tindanan produksi berjalan selari dengan compose pembangunan (nama kontena, port dan volum yang berbeza), jadi anda boleh terus membuat perubahan secara setempat sementara produksi kekal berjalan.

## Peringkat Dockerfile

Repositori ini menyertakan Dockerfile berbilang peringkat (`Dockerfile`). Empat peringkat disediakan; pilih `target` yang sesuai untuk kes penggunaan anda.

| Peringkat     | Imej asas             | Tujuan                                                                                                                                                                                                                                                                                              |
| ------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Memasang kebergantungan (`npm ci --legacy-peer-deps`) dan menjalankan `npm run build` (Turbopack secara lalai — lihat Sumber masa binaan di bawah)                                                                                                                                                  |
| `runner-base` | `node:26-trixie-slim` | Persekitaran masa jalan pengeluaran dengan output kendiri Next.js. **Tiada CLI penyedia disertakan.**                                                                                                                                                                                               |
| `runner-cli`  | `runner-base`         | Menambahkan `git`, `docker.io`, `docker-compose` dan CLI global: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Pilih ini untuk aliran kerja berasaskan ejen.**                                                                                                               |
| `runner-web`  | `runner-base`         | Menambahkan Playwright + pelayar Chromium (`--with-deps`) untuk penyedia sesi web: `gemini-web`, `claude-web`, `claude-turnstile`. **Pilih ini apabila anda menggunakan penyedia tersebut** — imej biasa akan gagal semasa permintaan tanpa ciri ini (lihat nota `-web` di bawah Saluran Keluaran). |

Bina sasaran tertentu secara manual:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Sumber masa binaan

Tiga argumen binaan mengawal kos peringkat `builder`. Argumen tersebut hanya digunakan semasa binaan —
`OMNIROUTE_MEMORY_MB` (di bawah) ialah tetapan masa jalan yang berasingan.

| Argumen binaan              | Lalai  | Kesan                                                                                              |
| --------------------------- | ------ | -------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`    | `0` membina dengan webpack: memori puncak lebih rendah, lebih perlahan. `1` menggunakan Turbopack. |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144` | Had maksimum timbunan V8 (`--max-old-space-size`) untuk `next build` yang dilancarkan.             |
| `OMNIROUTE_BUILD_WORKERS`   | `2`    | Membekalkan `CIRCLE_NODE_TOTAL`; Next memperoleh `workers = N - 1` untuk pengumpulan data halaman. |

`OMNIROUTE_BUILD_WORKERS` ialah nilai yang perlu dinaikkan pada pembina berkuasa tinggi dan nilai yang
perlu disyaki apabila binaan dengan sumber terhad terhenti **selepas** `✓ Compiled successfully`. Setiap
pekerja data halaman ialah prosesnya sendiri, begitu juga dengan proses induk `next build`;
penghasilan semula pada VPS sebenar (isu #7518) mengukur RSS puncak setiap proses pada
~4.5 GB tanpa bergantung pada bendera timbunan `NODE_OPTIONS` (Turbopack mengkompil dalam
memori asli/Rust di luar timbunan V8). Nilai lalai `2` (→ 1 pekerja, jumlah 2
proses) ditetapkan untuk pelaksana dihoskan GitHub dengan 16 GB / 4 vCPU yang
digunakan oleh saluran penerbitan. Pada `8` (→ 7 pekerja), pelaksana tersebut kehabisan memori dan
buildkit menggagalkan langkah itu dengan `ResourceExhausted: ... cannot allocate memory`;
`3` (→ 2 pekerja) masih tidak mencukupi selepas RSS setiap proses diukur
secara langsung dan bukannya dianggarkan. `tests/unit/docker-build-memory-budget.test.ts`
melakukan pengiraan berdasarkan angka yang diukur dan akan gagal jika mana-mana tetapan
melebihi kapasiti pelaksana.

Turbopack mengkompil dalam memori asli Rust yang berada **di luar** timbunan V8, jadi
`OMNIROUTE_BUILD_MEMORY_MB` tidak mengehadkannya. Pada hos dengan had memori,
binaan kemudiannya dihentikan dengan SIGKILL oleh pembunuh OOM tanpa sebarang teks ralat — ia hanya
terhenti di pertengahan `Creating an optimized production build`, yang kelihatan seperti tersangkut dan
bukannya kehabisan memori. Itulah sebabnya `Dockerfile` menggunakan webpack secara lalai
(`OMNIROUTE_USE_TURBOPACK=0`), tidak seperti `npm run dev` / `npm run build`, yang
menggunakan Turbopack sebagai lalai kod: `docker build .` biasa tanpa argumen binaan (seperti yang
dijalankan oleh Railway dan hos sekali klik lain) tidak boleh terhenti secara senyap pada
pembina yang mempunyai had memori. Imej yang diterbitkan sudah menghantar `OMNIROUTE_USE_TURBOPACK=0`
secara eksplisit dalam `docker-publish.yml`. Pada pembina yang mempunyai RAM yang mencukupi, gunakan
Turbopack untuk binaan yang lebih pantas:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` didayakan, jadi `next build` menjalankan proses induk **dan** proses pekerja,
dan setiap satunya mematuhi `OMNIROUTE_BUILD_MEMORY_MB` secara berasingan. Tetapkan had maksimum bekas
kepada kira-kira lebih daripada dua kali nilai tersebut, bukannya sekali ganda.

Diukur pada pepohon ini (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Penggabung | Had maksimum bekas | Hasil                                           |
| ---------- | ------------------ | ----------------------------------------------- |
| Turbopack  | 8 GiB / 16 GiB     | Dihentikan OOM pada kedua-duanya, secara senyap |
| webpack    | 8 GiB              | Pekerja binaan dihentikan dengan SIGKILL        |
| webpack    | 12 GiB             | Berjaya, memuncak pada 11.1 GiB                 |

### Lalai masa jalan

Nilai lalai yang dieksport oleh `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Tingkah laku memori dalam Docker:

- Imej menetapkan `OMNIROUTE_MEMORY_MB=1024` dan memperoleh `NODE_OPTIONS=--max-old-space-size=1024` daripadanya.
- Proses pelayan sebenar dimulakan oleh pelancar kendiri, yang membaca `OMNIROUTE_MEMORY_MB` dan menambahkan `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node menggunakan nilai `--max-old-space-size` berulang yang terakhir, jadi penetapan `OMNIROUTE_MEMORY_MB` mengawal had timbunan Docker yang berkuat kuasa.
- Oleh sebab imej sentiasa menetapkannya, nilai sandaran pelancar yang ditentukur berdasarkan RAM tidak pernah digunakan di bawah Docker. Tingkatkannya secara eksplisit mengikut beban kerja (jadual di bawah). `2048` masih terlalu kecil untuk `/v1/responses` ejen pengekodan.

### RAM masa jalan untuk ejen pengekodan

Nilai lalai Docker 1 GiB ialah had minimum untuk papan pemuka/sembang ringan, bukan saiz pengeluaran. Kandungan `POST /v1/responses` yang panjang (ratusan mesej, puluhan alat) mengekalkan berbilang graf dalam memori semasa pemampatan. Dua permintaan bertindih sebanyak ~3 MiB / ~750k token telah menyebabkan V8 terhenti pada ruang lama **12 GiB** (`FATAL ERROR: Reached heap limit`) dan turut mencetuskan OOM cgroup 16 GiB. Lihat [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Tetapkan saiz **cgroup `--memory` melebihi timbunan** — penimbal natif, SQLite dan data perantaraan pemampatan berada di luar V8.

| Beban kerja                              | `OMNIROUTE_MEMORY_MB`   | Bekas / cgroup      | Catatan                                                                                                                            |
| ---------------------------------------- | ----------------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Papan pemuka, satu sembang ringan        | `1024` (lalai imej)     | ≥2 GiB              |                                                                                                                                    |
| Satu ejen pengekodan (Claude/Codex/Grok) | `8192`                  | ≥10 GiB             | Sesi tunggal `/v1/responses` yang lazim                                                                                            |
| Dua `/v1/responses` panjang serentak     | `10240`–`12288`         | ≥12–16 GiB          | V8 diukur terhenti pada timbunan ~12 GiB                                                                                           |
| Tiga+ konteks panjang serentak           | jangan pada satu proses | sirikan / lebih RAM | Had kemasukan beban berat lalai ialah 1 permintaan dalam proses; meningkatkannya tanpa RAM akan menyebabkan kegagalan itu berulang |

`omniroute serve` pada perkakasan fizikal menentukur ~35% RAM (dihadkan kepada `[512, 4096]`) apabila `OMNIROUTE_MEMORY_MB` **tidak ditetapkan**. Docker sentiasa menetapkan `1024`, jadi penentukuran tersebut tidak pernah dijalankan dalam imej rasmi.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Pemboleh Ubah Persekitaran Kritikal

Selain nilai lalai yang didokumenkan dalam [ENVIRONMENT.md](../reference/ENVIRONMENT.md), pemboleh ubah berikut paling penting apabila dijalankan di bawah Docker:

| Pemboleh Ubah                 | Tujuan                                                                                                                                                                                                                                                                 | Lalai                           |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Rahsia dikongsi untuk jambatan WebSocket. **Diperlukan dalam persekitaran pengeluaran** — tetapkan kepada rentetan rawak yang kukuh.                                                                                                                                   | tidak ditetapkan (mesti diberi) |
| `REDIS_URL`                   | Rentetan sambungan untuk pengehad kadar / bahagian belakang cache                                                                                                                                                                                                      | `redis://redis:6379`            |
| `REDIS_PORT`                  | Port sebelah hos untuk bekas Redis terbina dalam                                                                                                                                                                                                                       | `6379`                          |
| `REDIS_BIND_HOST`             | Antara muka hos tempat port Redis terbina dalam diterbitkan (gelung balik melainkan anda menambahkan AUTH)                                                                                                                                                             | `127.0.0.1`                     |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Laluan hos yang dilekapkan ke dalam profil `cli` pada `/workspace/omniroute` untuk aliran kerja kemas kini kendiri                                                                                                                                                     | `.` (direktori semasa)          |
| `OMNIROUTE_MEMORY_MB`         | Had timbunan Node masa jalan untuk pelayan kendiri Docker; mengatasi nilai lalai imej di atas. Ejen pengekodan: `8192`+ (lihat [RAM masa jalan](#runtime-ram-for-coding-agents)).                                                                                      | `1024`                          |
| `DASHBOARD_PORT` / `API_PORT` | Mengatasi port yang didedahkan untuk papan pemuka (20128) dan API (20129)                                                                                                                                                                                              | `20128` / `20129`               |
| `APP_BIND_HOST`               | Antara muka hos tempat docker-compose menerbitkan port papan pemuka/API/live-WS. Dengan `REQUIRE_API_KEY=false` (nilai lalai), `0.0.0.0` mendedahkan proksi `/v1` tanpa nama kepada LAN — hanya luaskan dengan `REQUIRE_API_KEY=true` atau proksi songsang di hadapan. | `127.0.0.1`                     |
| `CLIPROXY_BIND_HOST`          | Antara muka hos tempat docker-compose menerbitkan sidecar `cliproxyapi` — volum datanya menyimpan bukti kelayakan penyedia.                                                                                                                                            | `127.0.0.1`                     |
| `OMNIROUTE_PLUGINS_DIR`       | Direktori yang dibaca dan dipasang oleh pengimbas pemalam masa jalan. Tetapkannya apabila pemalam dilekapkan secara ikatan: nilai lalai mengikuti `HOME`, yang tidak semestinya dieksport oleh imej.                                                                   | `~/.omniroute/plugins`          |
| `OMNIROUTE_BASE_PATH`         | Sub-laluan URL apabila aplikasi diterbitkan di belakang proksi songsang (cth. `/omniroute`)                                                                                                                                                                            | _(kosong = akar)_               |
| `NEXT_PUBLIC_BASE_URL`        | Asal pelayar awam termasuk sub-laluan (cth. `https://host/omniroute`)                                                                                                                                                                                                  | tidak ditetapkan                |
| `PROD_DASHBOARD_PORT`         | Port papan pemuka sebelah hos untuk `docker-compose.prod.yml`                                                                                                                                                                                                          | `20130`                         |
| `CLIPROXYAPI_PORT`            | Port sebelah hos untuk sidecar `cliproxyapi`                                                                                                                                                                                                                           | `8317`                          |

## Proksi Songsang pada Subpath (Traefik / nginx)

`basePath` Next.js dikompil ke dalam bundle kendiri. OmniRoute merekodkan nilai yang
telah diterapkan dalam fail sentinel pada akar aplikasi (ditulis semasa `npm run build`;
dibaca oleh `scripts/docker/ensure-docker-base-path.mjs`) dan membandingkannya dengan
`OMNIROUTE_BASE_PATH` apabila bekas dimulakan. Apabila nilainya berbeza dan imej dibina
untuk akar domain, entrypoint menulis semula manifes kendiri, literal
`basePath`/`assetPrefix` terbenam (Next 16 memaparkan URL aset SSR daripada
`assetPrefix` sahaja — penampal mencerminkan subpath ke dalamnya), URL aset
`/_next/static` yang telah diterapkan (manifes rujukan klien, import media, halaman
ralat yang diprapapar) dan shim `process.env` klien sebelum
`node dev/run-standalone.mjs` dijalankan.

### Binaan Compose (disyorkan)

Tetapkan kedua-dua pemboleh ubah dalam `.env`, kemudian bina semula supaya imej dan
masa jalan sepadan:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` memajukan `OMNIROUTE_BASE_PATH` sebagai argumen binaan Docker dan
sebagai pemboleh ubah persekitaran masa jalan.

### Imej akar prabina + subpath masa jalan

Imej `diegosouzapw/omniroute:*` yang diterbitkan dibina untuk akar domain. Anda masih
boleh menetapkan `OMNIROUTE_BASE_PATH` pada masa jalan; bekas menampal bundle sekali
semasa permulaan. Padankannya dengan origin awam yang sepadan:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Konfigurasikan proksi songsang untuk memajukan laluan luaran **penuh** (jangan buang
awalan). Traefik hendaklah menghalakan `PathPrefix(`/omniroute`)` ke bekas tanpa
`StripPrefix`, supaya Next.js menerima `/omniroute/...` dan menyediakan aset daripada
`/omniroute/_next/...`.

Semakan kesihatan Docker menguji endpoint kitar hayat ringan `/healthz` yang diawali
dengan `OMNIROUTE_BASE_PATH` aktif. `/api/monitoring/health` kekal tersedia untuk
diagnostik manusia/papan pemuka; untuk menghalakan semula HEALTHCHECK bekas kepadanya
(contohnya bagi penguatkuasaan kesihatan mendalam), tetapkan
`OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. Laluan tersebut ialah semakan
**mendalam** (DB + ringkasan pemantauan) — sesuai untuk `HEALTHCHECK` Docker yang
jarang dilakukan jika anda memilih untuk mengaktifkannya semula, tetapi **bukan**
untuk selang `livenessProbe` Kubernetes.

Untuk pengorkestra (Kubernetes, Nomad, dll.):

| Probe                  | Utamakan                                                            | Elakkan                                                              |
| ---------------------- | ------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Kehidupan              | HTTP `GET /livez`, atau TCP pada port utama (`PORT`, lalai `20128`) | `/api/monitoring/health` sebagai semakan kehidupan                   |
| Kesediaan              | HTTP `GET /healthz`                                                 | Tamat masa ketat yang menganggap gelung peristiwa sibuk sebagai mati |
| Mendalam / kotak hitam | `/api/monitoring/health`                                            | —                                                                    |

`/healthz` melaporkan kitar hayat proses (`ok` / `starting` / `stopping`). `/livez`
hanya melaporkan bahawa proses masih hidup (200 apabila pengendali boleh dijalankan;
ia tidak menunggu kesediaan). Kedua-duanya masih berjalan pada gelung peristiwa Node
yang sama seperti pengendalian permintaan, jadi kerja katalog atau pemampatan yang
terikat CPU boleh melengahkannya — sibuk ≠ mati. Utamakan semakan kehidupan TCP jika
probe HTTP tamat masa. Panduan probe penuh:
[Panduan pemantauan — cadangan probe Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose dengan Caddy (HTTPS Auto-TLS)

OmniRoute boleh didedahkan dengan selamat menggunakan penyediaan SSL automatik Caddy. Pastikan rekod A DNS domain anda menghala ke alamat IP pelayan anda.

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
      # Origin yang dihadapi pelayar untuk panggil balik OAuth, pautan papan pemuka dan URL awam yang dijana.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # URL dalaman pelayan-ke-pelayan untuk tugas berjadual / pengambilan kendiri.
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

Caddy menetapkan pengepala pemajuan standard untuk bekas huluan. OmniRoute menggunakan
`NEXT_PUBLIC_BASE_URL` sebagai origin awam kanonik untuk panggil balik OAuth dan pautan awam yang
dijana; penulisan papan pemuka yang disahkan menggunakan permintaan origin yang sama serta
perlindungan CSRF yang terikat pada sesi. Dayakan `OMNIROUTE_TRUST_PROXY` hanya untuk pengerahan
lanjutan apabila anda sengaja mahu OmniRoute memperoleh origin awam daripada pengepala pemajuan
yang dipercayai dan bukannya konfigurasi eksplisit.

## Cloudflare Quick Tunnel

Sokongan papan pemuka untuk pengerahan Docker merangkumi **Cloudflare Quick Tunnel** sekali klik pada `Dashboard → Endpoints`. Pengaktifan pertama memuat turun `cloudflared` hanya apabila diperlukan, memulakan terowong sementara ke titik akhir `/v1` semasa anda dan memaparkan URL `https://*.trycloudflare.com/v1` yang dijana secara langsung di bawah URL awam biasa anda.

Panel terowong titik akhir (Cloudflare, Tailscale, ngrok) boleh ditunjukkan atau disembunyikan melalui `Settings → Appearance` tanpa mengubah keadaan terowong yang aktif.

### Nota Terowong

- URL Quick Tunnel bersifat sementara dan berubah selepas setiap mula semula.
- Quick Tunnel tidak dipulihkan secara automatik selepas OmniRoute atau bekas dimulakan semula. Dayakannya semula melalui papan pemuka apabila diperlukan.
- Pemasangan terurus kini menyokong Linux, macOS dan Windows pada `x64` / `arm64`.
- Quick Tunnel terurus menggunakan pengangkutan HTTP/2 secara lalai untuk mengelakkan amaran penimbal UDP QUIC yang bising dalam persekitaran bekas yang terhad. Tetapkan `CLOUDFLARED_PROTOCOL=quic` atau `auto` jika anda mahukan pengangkutan yang berbeza.
- Imej Docker menyertakan akar CA sistem dan menyerahkannya kepada `cloudflared` terurus, yang mengelakkan kegagalan kepercayaan TLS apabila terowong dimulakan dalam bekas.
- Tetapkan `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` jika anda mahu OmniRoute menggunakan binari sedia ada dan bukannya memuat turun binari baharu.

## Tag Imej

| Imej                     | Tag      | Saiz   | Penerangan                                                 |
| ------------------------ | -------- | ------ | ---------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | SemVer stabil **diterbitkan** tertinggi (bukan git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | Tetapkan kelas tag ini secara kekal untuk GitOps           |

Manifes berbilang platform: `linux/amd64` + `linux/arm64` natif (Apple Silicon, AWS Graviton, Raspberry Pi). Docker memilih seni bina yang sepadan secara automatik; berikan `--platform linux/amd64` jika anda perlu memaksa emulasi AMD64 pada hos ARM.

### Saluran Keluaran

OmniRoute menerbitkan saluran Docker yang berasingan untuk keluaran stabil, pengujian cabang keluaran aktif dan binaan pembangunan.

| Saluran                         | Sumber                                  | Kebolehubahan                   | Penggunaan yang disyorkan                                                                                                                  |
| ------------------------------- | --------------------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `:<version>` / `:<version>-web` | Keluaran ditandatangani/berversi        | Tidak boleh diubah              | Pengerahan pengeluaran yang menetapkan keluaran tepat secara kekal                                                                         |
| `:latest` / `:latest-web`       | SemVer stabil **diterbitkan** tertinggi | Penunjuk stabil boleh ubah      | Mengikuti keluaran stabil **selepas** tugas penerbitan SemVer — **tidak** menjejaki `main` atau commit `release/v*` yang belum dikeluarkan |
| `:next` / `:next-web`           | Cabang `release/v*` lalai semasa        | Penunjuk prakeluaran boleh ubah | Menguji pembaikan yang telah dimasukkan ke dalam cabang keluaran aktif tetapi belum disertakan dalam keluaran stabil                       |
| `:main` / `:main-web`           | Cabang `main`                           | Penunjuk pembangunan boleh ubah | Untuk pembangunan dan pengujian integrasi sahaja                                                                                           |

#### Penyedia sesi web: imej `-web`

Setiap saluran di atas turut tersedia sebagai tag `-web` (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), yang dibina daripada peringkat `runner-web` — imej yang sama berserta Playwright dan pelayar Chromium. Imej biasa dihantar **tanpa** Chromium; `gemini-web`, `claude-web` dan `claude-turnstile` memerlukannya.

Kegagalan ditangguhkan dan tidak berlaku semasa permulaan: penyedia tersebut menyenaraikan model mereka dan dipaparkan sebagai tersambung dalam papan pemuka, dan hanya permintaan pertama gagal dengan

```
[500]: Gagal memuatkan modul luaran playwright: Ralat: Modul tidak dapat ditemukan
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Jika anda menggunakan penyedia tersebut, tarik tag `-web` bagi saluran yang sedang anda gunakan — tiada perkara lain yang berubah. Untuk pemasangan npm/CLI (tanpa imej Docker), komponen setara yang tiada ialah binari pelayar: jalankan `npx playwright install chromium` pada hos.

#### Menggunakan saluran prakeluaran

Saluran `next` dibina semula pada setiap push ke cawangan lalai `release/v*` semasa dan diterbitkan untuk AMD64 serta ARM64. Cawangan penyelenggaraan lama tidak boleh menimpanya. Saluran ini menyediakan imej yang boleh ditarik untuk pembaikan yang telah digabungkan ke dalam cawangan keluaran aktif sebelum tag stabil seterusnya dibuat.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Untuk Docker Compose, gantikan tag imej yang digunakan oleh profil yang dipilih, kemudian tarik dan cipta semula perkhidmatan:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Keselamatan dan pemulihan

`next` ialah saluran prakeluaran terapung. Ia mungkin berubah pada sebarang push ke cawangan keluaran aktif dan **tidak disokong untuk penggunaan produksi**. Sematkan digest imej semasa menilai binaan tertentu:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Sebelum menguji, sandarkan volum data OmniRoute atau direktori data yang dilekapkan dengan bind mount. Untuk kembali kepada versi sebelumnya, pulihkan versi stabil atau digest yang digunakan sebelum ini dan cipta semula bekas:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Binaan cawangan keluaran tidak boleh mengalihkan `latest`; hanya versi semantik stabil yang layak boleh mempromosikan penuding stabil. Imej `next` mengekalkan pemeriksaan imej keluaran dan get penyekat kerentanan CRITICAL.

**`latest` bukan jaminan kekinian untuk git.** Pembaikan yang digabungkan pada `main` atau pada cawangan `release/v*` yang aktif **tidak** terdapat dalam `:latest` sehingga imej SemVer stabil diterbitkan dan tugas penerbitan mempromosikan `:latest` (digest yang sama seperti SemVer tersebut). Jika `latest` kelihatan tidak berubah sedangkan GitHub sudah menunjukkan pembaikan tersebut, tarik `:next` untuk menguji cawangan keluaran atau tunggu tag SemVer.

| Keperluan anda                                                                           | Gunakan                              |
| ---------------------------------------------------------------------------------------- | ------------------------------------ |
| GitOps / produksi yang tidak boleh menyimpang                                            | Sematkan `:X.Y.Z` (atau digest imej) |
| Ikuti keluaran stabil yang diterbitkan dan terima penciptaan semula pada setiap keluaran | `:latest`                            |
| Uji commit `release/v*` yang belum dikeluarkan                                           | `:next` (bukan produksi)             |
| Uji `main`                                                                               | `:main` (bukan produksi)             |

## Ketersediaan: SQLite lalai ialah replika tunggal

Docker / Kubernetes OmniRoute standard ialah **satu proses Node + satu penulis SQLite**. Ketersediaan tinggi **tidak disokong** pada topologi tersebut.

| Kekangan                                                   | Akibat                                                                                                                                                                                                                                                                                                                                                                         |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Penulis tunggal                                            | **Jangan** jalankan berbilang replika terhadap fail SQLite yang sama. Tindakan itu akan merosakkan DB.                                                                                                                                                                                                                                                                         |
| Cipta semula / mulakan semula / penamatan oleh HEALTHCHECK | **Gangguan penuh** bagi SSE yang sedang berlangsung, sesi papan pemuka dan keadaan dalam memori. Setiap klien yang bersambung akan terputus. Permintaan baharu semasa tetingkap tanpa titik akhir akan menerima **`502 Bad Gateway: Unknown error`** daripada proksi songsang, bukannya JSON OmniRoute — klien tidak dapat membezakannya daripada kegagalan penyedia (#11015). |
| Gelung peristiwa yang sama seperti `/healthz`              | Kitaran katalog atau pemampatan yang sibuk boleh melengahkan prob; tamat masa yang singkat kemudiannya akan memulakan semula **satu-satunya** replika.                                                                                                                                                                                                                         |

**Matriks prob** (lihat juga [saranan prob Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Prob               | Sasaran                                                      | Jangan gunakan                                                       |
| ------------------ | ------------------------------------------------------------ | -------------------------------------------------------------------- |
| Keaktifan          | TCP pada `PORT` (lalai `20128`), atau HTTP lembut `/healthz` | `/api/monitoring/health`                                             |
| Kesediaan          | HTTP `GET /healthz`                                          | Tamat masa ketat yang menganggap gelung peristiwa sibuk sebagai mati |
| Mendalam / manusia | `/api/monitoring/health`                                     | Keaktifan kubelet automatik                                          |

**Naik taraf:** jangkakan setiap sesi akan terputus. Salirkan klien jika boleh; tiada kemas kini bergilir pada SQLite lalai. Compose `restart: unless-stopped` bersama Docker `HEALTHCHECK` juga akan menggantikan satu-satunya proses apabila bekas berada dalam keadaan Unhealthy — dengan skop impak yang sama.

Coretan Kubernetes untuk **satu replika** (Recreate diperlukan; jangan tingkatkan `replicas` terhadap satu fail SQLite):

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

Jeda `preStop` membolehkan kube menggugurkan titik akhir Service sebelum SIGTERM supaya trafik **baharu** berhenti menuju ke proses yang sedang ditamatkan. SSE `/v1/responses` yang sedang berlangsung disalirkan sehingga `SHUTDOWN_TIMEOUT_MS` (lalai 30s) melalui pajakan kemasukan kelas berat (#11015). Permintaan baharu yang masih sampai kepada proses akan menerima `503` + `Retry-After: 5`. Jurang tanpa titik akhir akibat Recreate sehingga pengganti berada dalam keadaan Ready kekal sebagai gangguan penuh — itu merupakan sifat topologi SQLite, bukannya kesilapan konfigurasi prob.

HA Postgres luaran / berbilang penulis **bukan** laluan standard yang didokumentasikan. Jika anda memerlukan HA, kekalkan satu replika atau jalankan topologi yang telah diuji dan didokumentasikan secara berasingan oleh projek. Usaha Postgres/MySQL dijejaki dalam [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Sehingga ciri itu dikeluarkan, satu-satunya cara yang disokong untuk menggandakan kapasiti `/v1/responses` **besar** ialah N proses bebas (bahagian seterusnya), bukannya `replicas > 1` pada satu volum.

## Penskalaan keluar: N proses bebas

Satu proses Node ialah **satu timbunan V8**. Dua `POST /v1/responses` ejen pengekodan (RTK + Caveman) yang bertindih, masing-masing berukuran ~3 MiB / ~750k token, menghentikan timbunan tersebut pada ~12 Gi (`FATAL ERROR: Reached heap limit`) dan boleh menyebabkan kehabisan memori (OOM) dalam cgroup 16 Gi. Lihat [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Pengukuran itu ialah amaran **belanjawan memori**, bukannya had maksimum produk sebanyak dua `/v1/responses` panjang yang serentak. Penerimaan sembang kelas berat dikawal oleh belanjawan bait pengingesan yang diterbitkan secara automatik (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) dan ditetapkan saiznya berdasarkan had V8/cgroup yang sama — mengatasinya dengan nilai lebih tinggi (atau menetapkan had kiraan permintaan legasi `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) pada proses yang telah ditetapkan saiznya akan menyebabkan penghentian itu berlaku semula. Sembang kecil, `/healthz`, `/v1/models`, dan MCP **tidak** termasuk dalam had tersebut.

### Satu proses: lebih daripada dua `/v1/responses` panjang

Proses yang **sihat** (timbunan di bawah `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, lalai `0.75`) **boleh** menjalankan lebih daripada dua `POST /v1/responses` panjang secara serentak apabila belanjawan bait dalam penerbangan bagi seluruh proses (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) masih mempunyai ruang. Badan permintaan yang bersaiz sama dengan atau melebihi `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (lalai 256 KiB) memperoleh permit kelas berat yang sama seperti permintaan dengan struktur kompleks dan menggunakan laluan keluar `tryAcquireHealthyHeadroom` [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) yang sama (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Puluhan klien SSE panjang yang serentak (pengendali sering memerlukan 40–50) ialah persoalan **belanjawan memori** — tetapkan saiz timbunan + slot utama/ruang tambahan + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — bukannya had keras produk “maksimum 2”. Timbunan yang mengalami tekanan masih mengurangkan beban dengan `503` yang boleh dicuba semula supaya #7849 tidak berulang.

Untuk **menggandakan timbunan** (ruang lama V8 yang bebas) **pada masa ini**:

| Lakukan                                                                                                                                                                                              | Jangan lakukan                                                 |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| Jalankan **N bekas/pod**, setiap satu dengan `DATA_DIR` / volum **sendiri**                                                                                                                          | Tetapkan `replicas > 1` untuk satu fail SQLite                 |
| Tetapkan saiz permintaan kelas berat dalam penerbangan + ruang tambahan sihat berdasarkan belanjawan timbunan / bait dalam penerbangan; 1–2 ialah lalai konservatif #7849, bukannya had keras produk | Berikan satu proses RAM 8× dan had kiraan tanpa batas          |
| Pilihan: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` untuk **pengira kuota dikongsi**                                                                                                       | Anggap Redis sebagai SQLite dikongsi — ia bukan                |
| Gandakan rahsia penyedia ke dalam setiap tika (atau terima papan pemuka yang dibahagikan)                                                                                                            | Jangkakan satu papan pemuka / satu log panggilan merentas tika |
| Letakkan sebarang pengimbang beban di hadapan; kekal pada API key atau sesi sudah memadai                                                                                                            | Memerlukan perisian tengah khusus vendor yang peka saiz        |

Perkakasan: bilangan `/v1/responses` panjang serentak bagi setiap tika ialah persoalan **belanjawan memori** (timbunan + bait dalam penerbangan / #10110). `N` `DATA_DIR` bebas masih menggandakan timbunan: RAM hos mesti menampung `N × cgroup`, bukannya “satu pod 16 Gi dengan N=8.” Jangan sesekali gunakan `replicas > 1` pada satu fail SQLite.

Lakaran Compose (dua timbunan, dua volum — bukan `deploy.replicas: 2`):

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

Ketumpatan dalam proses (pemampatan dikeluarkan daripada pencilan HTTP) ialah [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Satu kluster logik pada keadaan tahan lama yang dikongsi ialah [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Ralat rantau Gemini dalam Docker

Google AI Studio / Gemini API boleh mengembalikan HTTP 400 dengan FAILED_PRECONDITION dan
`User location is not supported for the API use.` Permintaan yang berjaya pada hos
tidak membuktikan bahawa bekas menggunakan laluan keluar yang sama. Susunan DNS,
kesambungan IPv4/IPv6, penghalaan VPN dan proksi yang dikonfigurasikan mungkin berbeza. Semak
[rantau yang disokong oleh Google](https://ai.google.dev/gemini-api/docs/available-regions)
serta laluan sambungan sebenar; ralat ini sahaja tidak menunjukkan bahawa kunci API bermasalah.

### Utamakan proksi khusus sambungan

Gunakan [konfigurasi proksi bagi setiap sambungan](../ops/PROXY_GUIDE.md#4-level-proxy-system)
OmniRoute untuk sambungan Gemini yang terjejas, kemudian ulangi **Uji Sambungan** dan permintaan kecil
dengan model yang sama. Ini mengehadkan perubahan penghalaan kepada sambungan tersebut. Sahkan
bahawa proksi boleh dicapai dari dalam bekas dan sambungan tersebut benar-benar memilihnya.
Perubahan laluan tidak menjamin kelayakan rantau pada pihak huluan.

### Bandingkan perangkaian hos dan bekas

Pastikan kunci, model dan permintaan adalah sama semasa membandingkan hasil yang disahkan; jangan
sekali-kali menampal kelayakan, kata laluan proksi atau pengepala kebenaran lengkap ke dalam isu.
Mula-mula, periksa keluarga alamat yang ditawarkan oleh penyelesai OS menggunakan arahan yang sama
pada hos dan di dalam bekas:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Gantikan `omniroute` dengan perkhidmatan yang anda jalankan (contohnya, `omniroute-web`). Arahan ini
memaparkan keluarga alamat tanpa kelayakan atau alamat IP. Nilai `6` yang dikembalikan
hanya menunjukkan hasil DNS IPv6: ia **tidak** membuktikan kewujudan laluan IPv6 yang boleh digunakan atau akses API.
Jika `curl` dipasang, bandingkan `curl -4 -I https://generativelanguage.googleapis.com`
dengan `curl -6 -I https://generativelanguage.googleapis.com` dalam kedua-dua persekitaran.
Respons HTTP membuktikan kesambungan untuk ujian tersebut, walaupun ia merupakan ralat tanpa pengesahan;
hanya permintaan model yang disahkan menguji kelayakan Gemini.

### Alternatif peringkat hos: IPv6 yang berfungsi dan dasar penyelesai

Pelapor [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) memulihkan
akses dalam persekitaran mereka dengan mendayakan IPv6 bekas dan mengubah pemilihan alamat
glibc. Anggap ini sebagai alternatif khusus persekitaran. Sahkan IPv6 hos yang berfungsi,
laluan trafik keluar bekas dan peraturan tembok api sebelum melaraskan keutamaan penyelesai.
Alamat ULA peribadi sahaja tidak membuktikan kesambungan IPv6 awam.

Bagi perkhidmatan yang telah disambungkan kepada rangkaian lalai Compose, fragmen ini mendayakan
IPv6 pada rangkaian tersebut; kekalkan selebihnya bagi perkhidmatan, port, volum dan konfigurasi anda:

```yaml
networks:
  default:
    enable_ipv6: true
```

Untuk rangkaian bernama, dayakannya pada rangkaian yang benar-benar disertai oleh perkhidmatan tersebut. Docker boleh
memperuntukkan subnet ULA; pilih subnet eksplisit yang tidak bertindih hanya apabila rangkaian anda
memerlukannya. Lihat [perangkaian IPv6 Docker](https://docs.docker.com/engine/daemon/ipv6/)
dan [pilihan rangkaian Compose](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

Pada **imej berasaskan glibc**, `/etc/gai.conf` boleh mengubah pemilihan alamat. Dockerfile repositori
semasa menggunakan Debian; imej tersuai berasaskan musl tidak berkongsi mekanisme ini.
Pelarasan yang dilaporkan mengubah label ULA daripada `label fc00::/7 6` kepada
`label fc00::/7 1`. Mulakan dengan jadual dasar lengkap imej dan kekalkan entri-entrinya yang lain:
penambahan entri `label` atau `precedence` menggantikan jadual lalai tersebut, maka fail
yang hanya mengandungi baris yang diubah adalah tidak mencukupi.
[Rujukan konfigurasi glibc](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
mendokumentasikan semantik tersebut. Lekapkan secara bind fail yang telah disemak sebagai baca sahaja pada `/etc/gai.conf`
dan cipta semula perkhidmatan untuk menerapkannya.

Ini mengubah pemilihan alamat OS untuk **semua trafik keluar dalam bekas tersebut**.
Ia tidak memaksa setiap aplikasi memilih IPv6: susunan DNS dan pemilihan sambungan
Node juga penting. Khususnya, `--dns-result-order=ipv4first` mengutamakan IPv4 dan
bukan penyelesaian bagi kegagalan khusus IPv4. Lihat [susunan DNS Node](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Uji semula Gemini dan penyedia anda yang lain selepas sebarang perubahan peringkat hos. Untuk membuat asal,
alih keluar lekapan `gai.conf` tersuai, pulihkan konfigurasi rangkaian sebelumnya dan
cipta semula perkhidmatan/rangkaian yang terjejas semasa tempoh penyelenggaraan. Penciptaan semula rangkaian
boleh mengganggu bekas lain yang disambungkan kepadanya; jangan padamkan volum data kekal.

## Nota Penting

- **Mod WAL SQLite:** `docker stop` perlu dibiarkan selesai supaya OmniRoute boleh melakukan titik semak bagi perubahan terkini kembali ke dalam `storage.sqlite`. Fail Compose yang disertakan sudah menetapkan tempoh tangguh henti selama 40 saat. Jika anda menjalankan imej secara langsung, kekalkan `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Tetapkan kepada `true` jika sandaran rutin/sebelum tulis diuruskan secara luaran. Migrasi pangkalan data sedia ada masih memerlukan petikan keselamatan tahan lama tersendiri dan perlindungan migrasi pukal.
- **Pengekalan Data:** Sentiasa lekapkan volum pada `/app/data` untuk mengekalkan pangkalan data, kekunci dan konfigurasi anda merentasi mula semula bekas.
- **Konfigurasi Port:** Atasi pemboleh ubah persekitaran `PORT` untuk menukar port lalai `20128`.

## Lihat Juga

- [Panduan Penggunaan VM](../ops/VM_DEPLOYMENT_GUIDE.md) — Persediaan VM + nginx + Cloudflare
- [Panduan Penggunaan Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Gunakan pada Fly.io
- [Konfigurasi Persekitaran](../reference/ENVIRONMENT.md) — Rujukan lengkap `.env`
