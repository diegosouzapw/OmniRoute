# 🐳 Docker Guide — OmniRoute (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Rujukan lengkap penggunaan Docker. Untuk mula dengan pantas, lihat [bahagian Docker dalam README](../README.md#-docker).

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
- [Terowong Pantas Cloudflare](#cloudflare-quick-tunnel)
- [Tag Imej](#image-tags)
- [Ketersediaan: SQLite lalai ialah replika tunggal](#availability-default-sqlite-is-single-replica)
- [Nota Penting](#important-notes)

---

## Jalankan dengan Pantas

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
# Profil asas (tanpa alat CLI)
docker compose --profile base up -d

# Profil CLI (Claude Code, Codex, OpenClaw terbina dalam)
docker compose --profile cli up -d

# Profil hos (mengutamakan Linux; melekapkan perduaan CLI hos sebagai baca sahaja)
docker compose --profile host up -d

# Gabungkan CLI + sidecar CLIProxyAPI
docker compose --profile cli --profile cliproxyapi up -d
```

## Profil yang Tersedia

OmniRoute menyediakan empat profil Compose. Pilih profil yang sepadan dengan persekitaran anda.

| Profil         | Perkhidmatan     | Masa untuk digunakan                                                                                                                                             | Perintah                                     |
| -------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (lalai) | `omniroute-base` | Pelayan tanpa antara muka / masa jalan minimum, tanpa CLI penyedia yang disertakan                                                                               | `docker compose --profile base up -d`        |
| `cli`          | `omniroute-cli`  | Aliran kerja berasaskan ejen yang memanggil `omniroute providers/setup/doctor` dan CLI yang disertakan (Codex, Claude Code, Droid, OpenClaw)                     | `docker compose --profile cli up -d`         |
| `host`         | `omniroute-host` | Hos Linux yang mahukan akses seperti `network_mode` kepada CLI hos dengan melekapkan `~/.local/bin`, `~/.codex`, `~/.claude`, dan sebagainya sebagai baca sahaja | `docker compose --profile host up -d`        |
| `cliproxyapi`  | `cliproxyapi`    | Jalankan sidecar [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) pada port `8317` untuk proksi CLI huluan                                            | `docker compose --profile cliproxyapi up -d` |

> Berbilang profil boleh digabungkan: `docker compose --profile cli --profile cliproxyapi up -d`.

## Mengkonfigurasi alat CLI hos apabila OmniRoute berjalan dalam Docker

`omniroute setup-codex`, `setup-claude`, `config set <tool>` dan butang
**Simpan konfigurasi** pada papan pemuka semuanya menulis fail seperti `~/.codex/*.config.toml`. Laluan tersebut
hanya bermakna pada mesin tempat CLI benar-benar berjalan. Jika arahan tersebut dijalankan di dalam
bekas, penulisan akan dibuat ke direktori utama bekas itu sendiri (`/home/node` —
imej tersebut berjalan sebagai `USER node`), yang tidak akan dibaca oleh mana-mana CLI hos dan akan
dibuang sebaik sahaja bekas dicipta semula.

OmniRoute mengesan keadaan ini lalu menolak penulisan tersebut dengan memberikan arahan dan bukannya
melaporkan kejayaan yang tidak dapat anda gunakan: CLI keluar dengan kod `2`, dan API memberikan respons `422`
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

Lekapan ikat menjadikan laluan tersebut boleh dipercayai: OmniRoute membaca
`/proc/self/mountinfo` dan membenarkan penulisan ke laluan yang dilekapkan (serta ke direktori
yang direktori anaknya merupakan lekapan, iaitu tepat seperti struktur `/host-home` di atas), sambil
terus menolak laluan yang tidak dilekapkan.

### Jalan keluar: konfigurasikan CLI milik bekas itu sendiri (gunakan secara terhad)

Apabila CLI benar-benar berada di dalam bekas (profil `cli`), penulisan tersebut
memang disengajakan. Berikan `--allow-container-write` kepada mana-mana arahan `setup-*`, atau tetapkan
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` untuk pelayan. Penulisan akan diteruskan
dengan amaran bahawa ia tidak akan kekal selepas bekas dicipta semula.

> **Amaran keselamatan — profil `cli` + lekapan `docker.sock`.**
> Profil `cli` melekap-ikat `/var/run/docker.sock` supaya pengemas kini automatik
> dalam bekas boleh mencipta semula tindanan melalui daemon hos
> (`src/lib/system/autoUpdate.ts` memeriksa soket tersebut dan melangkau
> laluan Docker apabila soket itu tiada). Soket tersebut ialah **sempadan kepercayaan root
> hos**: apa-apa sahaja yang boleh mencapainya dapat mengawal daemon Docker hos sebagai
> root — ia boleh mencipta, memeriksa, menghentikan dan mengalih keluar mana-mana bekas pada hos.
> Implikasi:
>
> 1. **Jangan sekali-kali dedahkan port profil `cli` kepada rangkaian.** Terbitkan
>    port tersebut pada `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — profil `cli` yang boleh dicapai melalui LAN menukar sebarang RCE pada peringkat papan pemuka menjadi
>    pengambilalihan penuh hos.
> 2. **Jangan ikat mana-mana direktori hos tambahan ke dalam profil `cli`.**
>    Soket Docker berserta sebarang lekapan tambahan memberikan bekas akses penuh
>    baca/tulis kepada sistem fail dan konfigurasi hos anda. Jika anda memerlukan alat untuk
>    mengakses sesuatu projek, jalankannya secara setempat menggunakan perduaan CLI — jangan lekapkan projek itu
>    ke dalam bekas `cli`.
>
> Jika anda tidak memerlukan kemas kini automatik dalam bekas, jangan aktifkan profil `cli`
> (`COMPOSE_PROFILES=core,redis` atau yang lebih ringkas). Profil lain tidak
> melekapkan soket Docker.
>
> Lihat `docs/security/MITM-TPROXY-DECRYPT.md` (git; tidak dikompil ke dalam `/docs`) untuk model ancaman berkaitan
> MITM, dan `docs/security/SUPPLY_CHAIN.md` untuk rantaian asal usul perduaan
> `codex`/`claude-code`/`droid`/`openclaw`.

## Sespan Redis

OmniRoute bergantung pada Redis untuk menyokong pengehad kadar teragih dan cache dikongsi. Perkhidmatan `redis` **sentiasa ditakrifkan** dalam `docker-compose.yml` (ia tidak mempunyai sekatan profil) dan bermula bersama mana-mana profil lain.

| Butiran                      | Nilai                                        |
| ---------------------------- | -------------------------------------------- |
| Imej                         | `redis:7-alpine`                             |
| Nama bekas                   | `omniroute-redis`                            |
| Port dalaman                 | `6379`                                       |
| Port hos (penggantian)       | `REDIS_PORT` (lalai kepada `6379`)           |
| Pengikatan hos (penggantian) | `REDIS_BIND_HOST` (lalai kepada `127.0.0.1`) |
| Volum                        | `omniroute-redis-data` → `/data`             |
| Semakan kesihatan            | `redis-cli ping` (selang 10 saat)            |

Pemboleh ubah persekitaran yang berkaitan:

- `REDIS_URL` — rentetan sambungan yang disuntik ke dalam aplikasi (`redis://redis:6379` secara lalai).
- `REDIS_PORT` — pemetaan port pada bahagian hos untuk bekas Redis.
- `REDIS_BIND_HOST` — antara muka hos tempat port diterbitkan. Lalai kepada `127.0.0.1`.

> **Mengapa gelung balik digunakan secara lalai:** sespan berjalan tanpa `requirepass`, dan bekas
> aplikasi mencapainya melalui rangkaian Compose (`redis:6379`) — port yang diterbitkan
> hanya disediakan untuk alat pada bahagian hos (`redis-cli`, `npm run dev` setempat). Penerbitan pada
> `0.0.0.0` akan mendedahkan Redis tanpa pengesahan kepada setiap hos dalam LAN anda. Jika anda menetapkan
> `REDIS_BIND_HOST=0.0.0.0`, tambahkan juga `--requirepass` pada `command:` perkhidmatan tersebut.

**Melumpuhkan Redis** tidak disyorkan (pengehad kadar akan beralih kepada sandaran dalam memori dengan keupayaan yang terhad). Jika perlu, sama ada alih keluar/ulas blok perkhidmatan `redis:` dalam `docker-compose.yml` atau skalakannya kepada sifar:

```bash
docker compose up -d --scale redis=0
```

## Compose Produksi

Untuk syot kilat produksi terpencil yang berjalan seiring dengan persekitaran pembangunan, gunakan `docker-compose.prod.yml`.

| Butiran                 | Nilai                                                                                              |
| ----------------------- | -------------------------------------------------------------------------------------------------- |
| Fail                    | `docker-compose.prod.yml`                                                                          |
| Port papan pemuka lalai | `PROD_DASHBOARD_PORT=20130` (dipetakan kepada `${DASHBOARD_PORT:-20128}` dalaman)                  |
| Port API lalai          | `PROD_API_PORT=20131`                                                                              |
| Imej                    | `omniroute:prod` (dibina daripada sasaran `runner-cli`)                                            |
| Bekas Redis             | `omniroute-redis-prod` (`redis:8.6.2`, volum khusus `redis-prod-data`)                             |
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

Tindanan produksi berjalan selari dengan Compose pembangunan (nama bekas, port dan volum yang berbeza), supaya anda boleh terus membuat penambahbaikan secara setempat sementara produksi kekal berjalan.

## Peringkat Dockerfile

Repositori ini menyediakan Dockerfile berbilang peringkat (`Dockerfile`). Tiga peringkat didedahkan; pilih `target` yang sesuai untuk kes penggunaan anda.

| Peringkat     | Imej asas             | Tujuan                                                                                                                                                                        |
| ------------- | --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Memasang kebergantungan (`npm ci --legacy-peer-deps`) dan menjalankan `npm run build` (Turbopack secara lalai — lihat Sumber masa binaan di bawah)                            |
| `runner-base` | `node:26-trixie-slim` | Masa jalan pengeluaran dengan output kendiri Next.js. **Tiada CLI penyedia disertakan.**                                                                                      |
| `runner-cli`  | `runner-base`         | Menambahkan `git`, `docker.io`, `docker-compose` dan CLI global: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Pilih ini untuk aliran kerja beragen.** |

Bina sasaran tertentu secara manual:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
```

### Sumber masa binaan

Tiga argumen binaan mengawal kos peringkat `builder`. Argumen ini hanya digunakan pada masa binaan —
`OMNIROUTE_MEMORY_MB` (di bawah) ialah tetapan masa jalan yang berasingan.

| Argumen binaan              | Lalai  | Kesan                                                                                              |
| --------------------------- | ------ | -------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `1`    | `0` membina menggunakan webpack. Memori puncak lebih rendah, tetapi lebih perlahan.                |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144` | Had atas timbunan V8 (`--max-old-space-size`) untuk `next build` yang dimulakan.                   |
| `OMNIROUTE_BUILD_WORKERS`   | `2`    | Membekalkan `CIRCLE_NODE_TOTAL`; Next memperoleh `workers = N - 1` untuk pengumpulan data halaman. |

`OMNIROUTE_BUILD_WORKERS` ialah tetapan yang perlu dinaikkan pada pembina berkapasiti besar dan yang perlu
disyaki apabila binaan terhad gagal **selepas** `✓ Compiled successfully`. Setiap
pekerja data halaman ialah prosesnya sendiri, begitu juga proses induk `next build`;
penghasilan semula pada VPS sebenar (isu #7518) mengukur RSS puncak setiap proses pada
~4.5 GB tanpa bergantung pada bendera timbunan `NODE_OPTIONS` (Turbopack mengkompil dalam
memori natif/Rust di luar timbunan V8). Nilai lalai `2` (→ 1 pekerja, jumlah 2
proses) ditetapkan untuk pelaksana 16 GB / 4 vCPU yang dihoskan GitHub dan digunakan oleh
saluran penerbitan. Pada `8` (→ 7 pekerja), pelaksana tersebut kehabisan memori dan
buildkit menggagalkan langkah dengan `ResourceExhausted: ... cannot allocate memory`;
`3` (→ 2 pekerja) masih tidak muat setelah RSS setiap proses diukur
secara langsung dan bukannya disimpulkan. `tests/unit/docker-build-memory-budget.test.ts`
melakukan pengiraan berdasarkan angka yang diukur dan gagal jika mana-mana tetapan
melebihi kapasiti pelaksana.

Turbopack mengkompil dalam memori Rust natif yang berada **di luar** timbunan V8, jadi
`OMNIROUTE_BUILD_MEMORY_MB` tidak mengehadkannya. Pada hos dengan had memori,
binaan kemudiannya dihentikan dengan SIGKILL oleh pembunuh OOM tanpa sebarang teks ralat — ia hanya
berhenti ketika `Creating an optimized production build`, yang kelihatan seperti tersangkut dan
bukannya kehabisan memori. Jika hos binaan mempunyai sumber terhad, tukar pembundel:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=0 \
  -t omniroute:base .
```

`webpackBuildWorker` didayakan, maka `next build` menjalankan proses induk **dan** proses
pekerja, dan setiap satunya mematuhi `OMNIROUTE_BUILD_MEMORY_MB` secara berasingan. Tetapkan had
bekas melebihi kira-kira dua kali ganda nilai tersebut, bukan sekali ganda.

Diukur pada pepohon ini (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Pembundel | Had bekas      | Hasil                                           |
| --------- | -------------- | ----------------------------------------------- |
| Turbopack | 8 GiB / 16 GiB | Dihentikan OOM pada kedua-duanya, secara senyap |
| webpack   | 8 GiB          | Pekerja binaan dihentikan dengan SIGKILL        |
| webpack   | 12 GiB         | Berjaya, memuncak pada 11.1 GiB                 |

### Nilai lalai masa jalan

Nilai lalai yang dieksport oleh `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Tingkah laku memori dalam Docker:

- Imej menetapkan `OMNIROUTE_MEMORY_MB=1024` dan memperoleh `NODE_OPTIONS=--max-old-space-size=1024` daripadanya.
- Proses pelayan sebenar dimulakan oleh pelancar kendiri, yang membaca `OMNIROUTE_MEMORY_MB` dan menambahkan `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node menggunakan nilai `--max-old-space-size` berulang yang terakhir, jadi penetapan `OMNIROUTE_MEMORY_MB` mengawal had timbunan Docker yang berkuat kuasa.
- Oleh sebab imej sentiasa menetapkannya, nilai sandaran pelancar sendiri yang ditentukur berdasarkan RAM tidak pernah digunakan di bawah Docker. Naikkannya secara jelas untuk beban kerja (jadual di bawah). `2048` masih terlalu kecil untuk `/v1/responses` ejen pengekodan.

### RAM masa jalan untuk ejen pengekodan

Nilai lalai Docker 1 GiB ialah had minimum untuk papan pemuka/sembang ringan, bukan saiz pengeluaran. Kandungan `POST /v1/responses` yang panjang (beratus-ratus mesej, puluhan alat) mengekalkan berbilang graf dalam memori semasa pemampatan. Dua permintaan bertindih sekitar ~3 MiB / ~750k token telah menghentikan V8 pada ruang lama **12 GiB** (`FATAL ERROR: Reached heap limit`) dan turut mencapai OOM cgroup 16 GiB. Lihat [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Tetapkan **`--memory` cgroup melebihi timbunan** — penimbal natif, SQLite dan perantara pemampatan berada di luar V8.

| Beban kerja                              | `OMNIROUTE_MEMORY_MB`      | Bekas / cgroup             | Catatan                                                                                                                              |
| ---------------------------------------- | -------------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Papan pemuka, satu sembang ringan        | `1024` (lalai imej)        | ≥2 GiB                     |                                                                                                                                      |
| Satu ejen pengekodan (Claude/Codex/Grok) | `8192`                     | ≥10 GiB                    | Sesi tunggal `/v1/responses` yang lazim                                                                                              |
| Dua `/v1/responses` panjang serentak     | `10240`–`12288`            | ≥12–16 GiB                 | Penghentian V8 diukur pada timbunan ~12 GiB                                                                                          |
| Tiga+ konteks panjang serentak           | jangan gunakan satu proses | bersiri / lebih banyak RAM | Had kemasukan beban berat lalai ialah 1 yang sedang diproses; menaikkannya tanpa RAM akan menyebabkan penghentian itu berlaku semula |

`omniroute serve` pada perkakasan fizikal menentukur ~35% RAM (dihadkan kepada `[512, 4096]`) apabila `OMNIROUTE_MEMORY_MB` **tidak ditetapkan**. Docker sentiasa menetapkan `1024`, jadi penentukuran tersebut tidak pernah dijalankan dalam imej rasmi.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Pemboleh Ubah Persekitaran Kritikal

Selain nilai lalai yang didokumentasikan dalam [ENVIRONMENT.md](../reference/ENVIRONMENT.md), pemboleh ubah berikut paling penting apabila dijalankan di bawah Docker:

| Pemboleh Ubah                 | Tujuan                                                                                                                                                                                                                                                               | Lalai                              |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Rahsia dikongsi untuk jambatan WebSocket. **Diperlukan dalam persekitaran pengeluaran** — tetapkan kepada rentetan rawak yang kukuh.                                                                                                                                 | tidak ditetapkan (mesti diberikan) |
| `REDIS_URL`                   | Rentetan sambungan untuk pengehad kadar / bahagian belakang cache                                                                                                                                                                                                    | `redis://redis:6379`               |
| `REDIS_PORT`                  | Port pada hos untuk bekas Redis yang disertakan                                                                                                                                                                                                                      | `6379`                             |
| `REDIS_BIND_HOST`             | Antara muka hos tempat port Redis yang disertakan diterbitkan (gelung balik melainkan anda menambahkan AUTH)                                                                                                                                                         | `127.0.0.1`                        |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Laluan hos yang dilekapkan ke dalam profil `cli` pada `/workspace/omniroute` untuk aliran kerja kemas kini kendiri                                                                                                                                                   | `.` (direktori semasa)             |
| `OMNIROUTE_MEMORY_MB`         | Had maksimum timbunan Node masa jalan untuk pelayan kendiri Docker; mengatasi nilai lalai imej di atas. Ejen pengekodan: `8192`+ (lihat [RAM masa jalan](#runtime-ram-for-coding-agents)).                                                                           | `1024`                             |
| `DASHBOARD_PORT` / `API_PORT` | Mengatasi port yang didedahkan untuk papan pemuka (20128) dan API (20129)                                                                                                                                                                                            | `20128` / `20129`                  |
| `APP_BIND_HOST`               | Antara muka hos tempat docker-compose menerbitkan port papan pemuka/API/WS langsung. Dengan `REQUIRE_API_KEY=false` (lalai), `0.0.0.0` mendedahkan proksi `/v1` tanpa nama kepada LAN — hanya luaskan dengan `REQUIRE_API_KEY=true` atau proksi songsang di hadapan. | `127.0.0.1`                        |
| `CLIPROXY_BIND_HOST`          | Antara muka hos tempat docker-compose menerbitkan sidecar `cliproxyapi` — volum datanya menyimpan kelayakan penyedia.                                                                                                                                                | `127.0.0.1`                        |
| `OMNIROUTE_PLUGINS_DIR`       | Direktori yang dibaca dan digunakan oleh pengimbas pemalam masa jalan untuk pemasangan. Tetapkannya apabila pemalam dilekapkan melalui ikatan: nilai lalai mengikut `HOME`, yang tidak semestinya dieksport oleh imej.                                               | `~/.omniroute/plugins`             |
| `OMNIROUTE_BASE_PATH`         | Sub-laluan URL apabila aplikasi diterbitkan di belakang proksi songsang (cth. `/omniroute`)                                                                                                                                                                          | _(kosong = akar)_                  |
| `NEXT_PUBLIC_BASE_URL`        | Asalan pelayar awam termasuk sub-laluan (cth. `https://host/omniroute`)                                                                                                                                                                                              | tidak ditetapkan                   |
| `PROD_DASHBOARD_PORT`         | Port papan pemuka pada hos untuk `docker-compose.prod.yml`                                                                                                                                                                                                           | `20130`                            |
| `CLIPROXYAPI_PORT`            | Port pada hos untuk sidecar `cliproxyapi`                                                                                                                                                                                                                            | `8317`                             |

## Proksi Songsang pada Subpath (Traefik / nginx)

`basePath` Next.js dikompil ke dalam berkas bundle kendiri. OmniRoute merekodkan nilai
yang terbina dalam fail sentinel pada akar aplikasi (ditulis semasa `npm run build`;
dibaca oleh `scripts/docker/ensure-docker-base-path.mjs`) dan membandingkannya dengan
`OMNIROUTE_BASE_PATH` apabila bekas dimulakan. Apabila nilainya berbeza dan imej dibina
untuk akar domain, titik masuk menulis semula manifes kendiri, literal
`basePath`/`assetPrefix` yang dibenamkan (Next 16 memaparkan URL aset SSR daripada
`assetPrefix` sahaja — penampal mencerminkan subpath ke dalamnya), URL aset
`/_next/static` yang terbina (manifes rujukan klien, import media, halaman ralat
prapapar) dan shim `process.env` klien sebelum `node dev/run-standalone.mjs`
dijalankan.

### Binaan Compose (disyorkan)

Tetapkan kedua-dua pemboleh ubah dalam `.env`, kemudian bina semula supaya imej dan
persekitaran masa jalan adalah sepadan:

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
boleh menetapkan `OMNIROUTE_BASE_PATH` pada masa jalan; bekas akan menampal berkas
bundle sekali semasa permulaan. Padankannya dengan asal awam yang sepadan:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Konfigurasikan proksi songsang untuk memajukan laluan luaran **sepenuhnya** (jangan
buang awalan). Traefik perlu menghalakan `PathPrefix(`/omniroute`)` ke bekas tanpa
`StripPrefix`, supaya Next.js menerima `/omniroute/...` dan menyediakan aset daripada
`/omniroute/_next/...`.

Pemeriksaan kesihatan Docker menguji titik akhir kitar hayat ringan `/healthz` yang
diawali dengan `OMNIROUTE_BASE_PATH` aktif. `/api/monitoring/health` kekal tersedia
untuk diagnostik manusia/papan pemuka; untuk menghalakan HEALTHCHECK bekas kembali
kepadanya (contohnya untuk penguatkuasaan kesihatan mendalam), tetapkan
`OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. Laluan tersebut ialah pemeriksaan
**mendalam** (DB + ringkasan pemantauan) — sesuai untuk `HEALTHCHECK` Docker yang jarang
dijalankan jika anda memilih untuk mengaktifkannya semula, tetapi **bukan** untuk sela
`livenessProbe` Kubernetes.

Untuk pengorkestra (Kubernetes, Nomad, dll.):

| Probe                  | Utamakan                                                            | Elakkan                                                              |
| ---------------------- | ------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Keaktifan              | HTTP `GET /livez`, atau TCP pada port utama (`PORT`, lalai `20128`) | `/api/monitoring/health` sebagai keaktifan                           |
| Kesediaan              | HTTP `GET /healthz`                                                 | Tamat masa ketat yang menganggap gelung peristiwa sibuk sebagai mati |
| Mendalam / kotak hitam | `/api/monitoring/health`                                            | —                                                                    |

`/healthz` melaporkan kitar hayat proses (`ok` / `starting` / `stopping`). `/livez`
hanya memeriksa sama ada proses hidup (200 apabila pengendali boleh dijalankan; ia
tidak menunggu kesediaan). Kedua-duanya masih berjalan pada gelung peristiwa Node yang
sama seperti pengendalian permintaan, maka kerja katalog atau pemampatan yang terikat
CPU boleh melengahkannya — sibuk ≠ mati. Utamakan keaktifan TCP jika probe HTTP tamat
masa. Panduan probe penuh:
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
      # Asal yang menghadap pelayar untuk panggil balik OAuth, pautan papan pemuka dan URL awam yang dijana.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # URL dalaman antara pelayan untuk tugas berjadual / pengambilan kendiri.
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
`NEXT_PUBLIC_BASE_URL` sebagai asal awam kanonik untuk panggil balik OAuth dan pautan awam yang
dijana; penulisan papan pemuka yang disahkan menggunakan permintaan asal yang sama serta
perlindungan CSRF terikat sesi. Hanya dayakan `OMNIROUTE_TRUST_PROXY` untuk penggunaan lanjutan
apabila anda sengaja mahu OmniRoute memperoleh asal awam daripada pengepala pemajuan yang
dipercayai dan bukannya konfigurasi eksplisit.

## Terowong Pantas Cloudflare

Sokongan papan pemuka untuk penggunaan Docker merangkumi **Terowong Pantas Cloudflare** satu klik pada `Dashboard → Endpoints`. Pengaktifan pertama memuat turun `cloudflared` hanya apabila diperlukan, memulakan terowong sementara ke titik akhir `/v1` semasa anda dan memaparkan URL `https://*.trycloudflare.com/v1` yang dijana tepat di bawah URL awam biasa anda.

Panel terowong titik akhir (Cloudflare, Tailscale, ngrok) boleh dipaparkan atau disembunyikan daripada `Settings → Appearance` tanpa mengubah keadaan terowong aktif.

### Nota Terowong

- URL Terowong Pantas bersifat sementara dan berubah selepas setiap mula semula.
- Terowong Pantas tidak dipulihkan secara automatik selepas OmniRoute atau bekas dimulakan semula. Dayakan semula daripada papan pemuka apabila diperlukan.
- Pemasangan terurus kini menyokong Linux, macOS dan Windows pada `x64` / `arm64`.
- Terowong Pantas terurus menggunakan pengangkutan HTTP/2 secara lalai untuk mengelakkan amaran bising mengenai penimbal UDP QUIC dalam persekitaran bekas yang terhad. Tetapkan `CLOUDFLARED_PROTOCOL=quic` atau `auto` jika anda mahukan pengangkutan yang berbeza.
- Imej Docker menyertakan akar CA sistem dan menyerahkannya kepada `cloudflared` terurus, yang mengelakkan kegagalan kepercayaan TLS apabila terowong memulakan proses di dalam bekas.
- Tetapkan `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` jika anda mahu OmniRoute menggunakan binari sedia ada dan bukannya memuat turun binari baharu.

## Tag Imej

| Imej                     | Tag      | Saiz   | Penerangan                                                 |
| ------------------------ | -------- | ------ | ---------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | SemVer stabil **diterbitkan** tertinggi (bukan git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | Sematkan kelas tag ini untuk GitOps                        |

Manifes berbilang platform: `linux/amd64` + `linux/arm64` natif (Apple Silicon, AWS Graviton, Raspberry Pi). Docker memilih seni bina yang sepadan secara automatik; berikan `--platform linux/amd64` jika anda perlu memaksa emulasi AMD64 pada hos ARM.

### Saluran Keluaran

OmniRoute menerbitkan saluran Docker yang berasingan untuk keluaran stabil, pengujian cabang keluaran aktif dan binaan pembangunan.

| Saluran                         | Sumber                                  | Kebolehubahan                   | Penggunaan yang disyorkan                                                                                                             |
| ------------------------------- | --------------------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Keluaran ditandatangani/berversi        | Tidak boleh diubah              | Penggunaan pengeluaran yang menyematkan keluaran tertentu                                                                             |
| `:latest` / `:latest-web`       | SemVer stabil **diterbitkan** tertinggi | Penuding stabil boleh ubah      | Mengikuti keluaran stabil **selepas** tugas penerbitan SemVer — **tidak** menjejaki `main` atau commit `release/v*` belum dikeluarkan |
| `:next` / `:next-web`           | Cabang `release/v*` lalai semasa        | Penuding prakeluaran boleh ubah | Menguji pembaikan yang telah dimasukkan ke cabang keluaran aktif tetapi belum terdapat dalam keluaran stabil                          |
| `:main` / `:main-web`           | Cabang `main`                           | Penuding pembangunan boleh ubah | Untuk pembangunan dan pengujian penyepaduan sahaja                                                                                    |

#### Menggunakan saluran prakeluaran

Saluran `next` dibina semula pada setiap push ke cabang `release/v*` lalai semasa dan diterbitkan untuk AMD64 serta ARM64. Cabang penyelenggaraan lama tidak boleh menimpanya. Saluran ini menyediakan imej yang boleh ditarik untuk pembaikan yang telah digabungkan ke dalam cabang keluaran aktif sebelum tag stabil seterusnya dibuat.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Untuk Docker Compose, tindih tag imej yang digunakan oleh profil terpilih, kemudian tarik dan cipta semula perkhidmatan:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Keselamatan dan pengembalian semula

`next` ialah saluran prakeluaran terapung. Ia mungkin berubah pada sebarang push ke cabang keluaran aktif dan **tidak disokong untuk penggunaan pengeluaran**. Sematkan digest imej semasa menilai binaan tertentu:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Sebelum menguji, sandarkan volum data OmniRoute atau direktori data yang dilekapkan melalui bind mount. Untuk kembali kepada versi sebelumnya, pulihkan versi stabil atau digest yang digunakan sebelum ini dan cipta semula bekas:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Binaan cabang keluaran tidak sekali-kali boleh mengubah `latest`; hanya versi semantik stabil yang layak boleh mengemas kini penuding stabil. Imej `next` mengekalkan pemeriksaan imej keluaran dan gerbang penyekat kerentanan CRITICAL.

**`latest` bukan jaminan kemutakhiran untuk git.** Pembaikan yang digabungkan ke dalam `main` atau cabang `release/v*` yang aktif **tidak** disertakan dalam `:latest` sehingga imej SemVer stabil diterbitkan dan tugas penerbitan mengemas kini `:latest` (digest yang sama seperti SemVer tersebut). Jika `latest` kelihatan tidak berubah sedangkan GitHub sudah memaparkan pembaikan itu, tarik `:next` untuk menguji cabang keluaran atau tunggu tag SemVer.

| Keperluan anda                                                                           | Gunakan                              |
| ---------------------------------------------------------------------------------------- | ------------------------------------ |
| GitOps / pengeluaran yang tidak boleh berubah tanpa disengajakan                         | Sematkan `:X.Y.Z` (atau digest imej) |
| Ikuti keluaran stabil yang diterbitkan dan terima penciptaan semula pada setiap keluaran | `:latest`                            |
| Uji commit `release/v*` yang belum dikeluarkan                                           | `:next` (bukan untuk pengeluaran)    |
| Uji `main`                                                                               | `:main` (bukan untuk pengeluaran)    |

## Ketersediaan: SQLite lalai ialah replika tunggal

Docker / Kubernetes OmniRoute standard ialah **satu proses Node + satu penulis SQLite**. Ketersediaan tinggi **tidak disokong** pada topologi tersebut.

| Kekangan                                                     | Akibat                                                                                                                                                                                                                                                                                                                                                                       |
| ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Penulis tunggal                                              | **Jangan** jalankan berbilang replika terhadap fail SQLite yang sama. Tindakan itu akan merosakkan DB.                                                                                                                                                                                                                                                                       |
| Penciptaan semula / mula semula / penamatan oleh HEALTHCHECK | **Gangguan penuh** terhadap SSE yang sedang berjalan, sesi papan pemuka dan keadaan dalam memori. Setiap klien yang bersambung akan terputus. Permintaan baharu semasa tempoh tanpa titik akhir akan menerima **`502 Bad Gateway: Unknown error`** daripada proksi songsang, bukannya JSON OmniRoute — klien tidak dapat membezakannya daripada kegagalan penyedia (#11015). |
| Gelung peristiwa yang sama dengan `/healthz`                 | Kitaran katalog atau pemampatan yang sibuk boleh melengahkan probe; tamat masa yang singkat kemudiannya memulakan semula replika **satu-satunya**.                                                                                                                                                                                                                           |

**Matriks probe** (lihat juga [cadangan probe Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Probe              | Sasaran                                                      | Jangan gunakan                                                       |
| ------------------ | ------------------------------------------------------------ | -------------------------------------------------------------------- |
| Keaktifan          | TCP pada `PORT` (lalai `20128`), atau HTTP lembut `/healthz` | `/api/monitoring/health`                                             |
| Kesediaan          | HTTP `GET /healthz`                                          | Tamat masa ketat yang menganggap gelung peristiwa sibuk sebagai mati |
| Mendalam / manusia | `/api/monitoring/health`                                     | Keaktifan kubelet automatik                                          |

**Naik taraf:** jangkakan setiap sesi akan terputus. Salirkan klien jika boleh; tiada kemas kini bergilir pada SQLite lalai. Compose `restart: unless-stopped` bersama Docker `HEALTHCHECK` juga akan menggantikan satu-satunya proses apabila bekas berada dalam keadaan Unhealthy — dengan skop impak yang sama.

Petikan Kubernetes untuk **satu replika** (Recreate diperlukan; jangan tingkatkan `replicas` terhadap satu fail SQLite):

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

Jeda `preStop` membolehkan kube menggugurkan titik akhir Service sebelum SIGTERM supaya trafik **baharu** berhenti menuju ke proses yang sedang ditamatkan. SSE `/v1/responses` yang sedang berjalan disalirkan sehingga `SHUTDOWN_TIMEOUT_MS` (lalai 30s) melalui pajakan kemasukan heavyweight (#11015). Permintaan baharu yang masih sampai kepada proses akan menerima `503` + `Retry-After: 5`. Jurang tanpa titik akhir bagi Recreate sehingga pengganti menjadi Ready kekal sebagai gangguan penuh — itu ialah sifat topologi SQLite, bukannya salah konfigurasi probe.

Postgres luaran / HA berbilang penulis **bukan** laluan standard yang didokumentasikan. Jika anda memerlukan HA, kekalkan satu replika atau jalankan topologi yang telah diuji dan didokumentasikan secara berasingan oleh projek. Kerja Postgres/MySQL berada dalam [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Sehingga ciri itu dikeluarkan, satu-satunya cara yang disokong untuk menggandakan kapasiti `/v1/responses` **besar** ialah N proses bebas (bahagian seterusnya), bukannya `replicas > 1` pada satu volum.

## Penskalaan mendatar: N proses bebas

Satu proses Node ialah **satu heap V8**. Dua `POST /v1/responses` ejen pengekodan (RTK + Caveman) bertindih bersaiz ~3 MiB / ~750k token menggugurkan heap tersebut pada ~12 Gi (`FATAL ERROR: Reached heap limit`) dan boleh menyebabkan OOM dalam cgroup 16 Gi. Lihat [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Pengukuran tersebut ialah amaran **bajet memori**, bukannya had maksimum keras produk sebanyak dua `/v1/responses` panjang yang serentak. Kemasukan sembang berat dikawal oleh bajet bait pengambilan yang diterbitkan secara automatik (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`) dan ditentukan saiznya berdasarkan had V8/cgroup yang sama — menindihnya kepada nilai lebih tinggi (atau menetapkan had kiraan permintaan legasi `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) pada proses yang telah ditentukan saiznya akan menyebabkan pengguguran itu berlaku semula. Sembang kecil, `/healthz`, `/v1/models`, dan MCP **tidak** termasuk dalam had tersebut.

### Satu proses: lebih daripada dua `/v1/responses` panjang

Proses yang **sihat** (heap di bawah `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, lalai `0.75`) **boleh** menjalankan lebih daripada dua `POST /v1/responses` panjang secara serentak apabila masih terdapat ruang dalam bajet bait dalam penerbangan seluruh proses (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110). Badan pada atau melebihi `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (lalai 256 KiB) mengambil pajakan berat yang sama seperti permintaan dengan struktur berat dan menggunakan laluan pelepasan `tryAcquireHealthyHeadroom` [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) yang sama (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Puluhan klien SSE panjang yang serentak (pengendali sering memerlukan 40–50) ialah persoalan **bajet memori** — tentukan saiz heap + slot utama/ruang lebihan + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — bukannya had produk keras “maksimum 2”. Heap yang tertekan masih menyingkirkan permintaan dengan `503` yang boleh dicuba semula supaya #7849 tidak berulang.

Untuk **menggandakan heap** (ruang lama V8 yang bebas) **pada masa ini**:

| Lakukan                                                                                                                                                                                  | Jangan lakukan                                                |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| Jalankan **N bekas/pod**, setiap satu dengan `DATA_DIR` / volum **sendiri**                                                                                                              | Tetapkan `replicas > 1` terhadap satu fail SQLite             |
| Tentukan saiz dalam penerbangan berat + ruang lebihan sihat berdasarkan heap / bajet bait dalam penerbangan; 1–2 ialah nilai lalai konservatif #7849, bukannya had maksimum keras produk | Berikan satu proses RAM 8× dan had kiraan tanpa batas         |
| Pilihan: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` untuk **pembilang kuota dikongsi**                                                                                         | Anggap Redis sebagai SQLite dikongsi — ia bukan               |
| Gandakan rahsia penyedia ke dalam setiap tika (atau terima papan pemuka yang dipartisikan)                                                                                               | Harapkan satu papan pemuka / satu log panggilan merentas tika |
| Letakkan di belakang mana-mana pengimbang beban; kelekitan berdasarkan kunci API atau sesi sudah mencukupi                                                                               | Wajibkan perisian tengah peka saiz khusus vendor              |

Perkakasan: bilangan `/v1/responses` panjang serentak bagi setiap tika ialah persoalan **bajet memori** (heap + bait dalam penerbangan / #10110). `N` `DATA_DIR` bebas masih menggandakan heap: RAM hos mesti menampung `N × cgroup`, bukannya “satu pod 16 Gi dengan N=8.” Jangan sekali-kali gunakan `replicas > 1` pada satu fail SQLite.

Lakaran Compose (dua heap, dua volum — bukan `deploy.replicas: 2`):

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

Ketumpatan dalam proses (pemampatan dikeluarkan daripada pengasing HTTP) ialah [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Satu kluster logik pada keadaan tahan lama yang dikongsi ialah [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Nota Penting

- **Mod WAL SQLite:** `docker stop` perlu dibiarkan selesai supaya OmniRoute boleh membuat checkpoint perubahan terkini kembali ke dalam `storage.sqlite`. Fail Compose yang disertakan telah menetapkan tempoh ihsan penghentian selama 40 saat. Jika anda menjalankan imej secara langsung, kekalkan `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Tetapkan kepada `true` jika sandaran rutin/sebelum penulisan diuruskan secara luaran. Migrasi pangkalan data sedia ada masih memerlukan snapshot keselamatan tahan lama tersendiri dan perlindungan migrasi besar-besaran.
- **Pengekalan Data:** Sentiasa lekapkan volum pada `/app/data` untuk mengekalkan pangkalan data, kunci dan konfigurasi anda merentasi pemulaan semula bekas.
- **Konfigurasi Port:** Gantikan pemboleh ubah persekitaran `PORT` untuk menukar port lalai `20128`.

## Lihat Juga

- [Panduan Pelaksanaan VM](../ops/VM_DEPLOYMENT_GUIDE.md) — Persediaan VM + nginx + Cloudflare
- [Panduan Pelaksanaan Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Laksanakan ke Fly.io
- [Konfigurasi Persekitaran](../reference/ENVIRONMENT.md) — Rujukan `.env` lengkap
