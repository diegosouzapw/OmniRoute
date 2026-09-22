# Skills Framework (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/SKILLS.md) · 🇪🇹 [am](../../../am/docs/frameworks/SKILLS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/SKILLS.md) · 🇦🇿 [az](../../../az/docs/frameworks/SKILLS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/SKILLS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/SKILLS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/SKILLS.md) · 🇩🇰 [da](../../../da/docs/frameworks/SKILLS.md) · 🇩🇪 [de](../../../de/docs/frameworks/SKILLS.md) · 🇬🇷 [el](../../../el/docs/frameworks/SKILLS.md) · 🇪🇸 [es](../../../es/docs/frameworks/SKILLS.md) · 🇪🇪 [et](../../../et/docs/frameworks/SKILLS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/SKILLS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/SKILLS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/SKILLS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/SKILLS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/SKILLS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/SKILLS.md) · 🇮🇱 [he](../../../he/docs/frameworks/SKILLS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/SKILLS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/SKILLS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/SKILLS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/SKILLS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/SKILLS.md) · 🇮🇹 [it](../../../it/docs/frameworks/SKILLS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/SKILLS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/SKILLS.md) · 🇰🇭 [km](../../../km/docs/frameworks/SKILLS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/SKILLS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/SKILLS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/SKILLS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/SKILLS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/SKILLS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/SKILLS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/SKILLS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/SKILLS.md) · 🇲🇲 [my](../../../my/docs/frameworks/SKILLS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/SKILLS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/SKILLS.md) · 🇳🇴 [no](../../../no/docs/frameworks/SKILLS.md) · 🇮🇳 [or](../../../or/docs/frameworks/SKILLS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/SKILLS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/SKILLS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/SKILLS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/SKILLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/SKILLS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/SKILLS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/SKILLS.md) · 🇱🇰 [si](../../../si/docs/frameworks/SKILLS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/SKILLS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/SKILLS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/SKILLS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/SKILLS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/SKILLS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/SKILLS.md) · 🇮🇳 [te](../../../te/docs/frameworks/SKILLS.md) · 🇹🇭 [th](../../../th/docs/frameworks/SKILLS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/SKILLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/SKILLS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/SKILLS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/SKILLS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/SKILLS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/SKILLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/SKILLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/SKILLS.md)

---

> **Sumber acuan:** `src/lib/skills/` dan `src/app/api/skills/`
> **Terakhir diperbarui:** 2026-06-28 — v3.8.40

OmniRoute menyediakan kerangka kerja Skills yang dapat diperluas, yang memungkinkan model bahasa (dan operator) menyusun kapabilitas yang dapat digunakan kembali — mulai dari pembacaan sistem berkas dan permintaan HTTP hingga eksekusi kode dalam sandbox dan skill marketplace yang dikurasi.

Skill adalah unit kerja berversi yang didefinisikan oleh skema. OmniRoute dapat menyuntikkan skill sebagai definisi alat ke dalam permintaan keluar, mencegat pemanggilan alat yang dikembalikan dari model, menjalankan handler yang sesuai, dan mengirimkan hasilnya kembali ke model agar percakapan dapat berlanjut. Model tidak pernah melihat implementasinya — hanya antarmuka alatnya.

---

## Agent Skills vs Omni Skills

OmniRoute memiliki dua sistem skill yang berbeda tetapi saling melengkapi:

| Dimensi      | **Omni Skills** (dokumen ini)                                                | **Agent Skills**                                                                           |
| :----------- | :--------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------- |
| Tujuan       | Penyuntikan alat LLM + eksekusi dalam sandbox                                | Katalog SKILL.md untuk ditemukan dan digunakan oleh agen eksternal                         |
| Sumber acuan | `src/lib/skills/` + marketplace                                              | `src/lib/agentSkills/` + direktori `skills/`                                               |
| Mode runtime | Disuntikkan ke permintaan keluar, dieksekusi pada peristiwa pemanggilan alat | Katalog markdown statis + endpoint penemuan REST/MCP/A2A                                   |
| Pengguna     | OmniRoute sendiri (perutean kombo, panggilan LLM masuk)                      | Agen eksternal, klien MCP, orkestrator A2A                                                 |
| Jumlah       | Bervariasi (ditentukan marketplace)                                          | 45 entri katalog (23 API + 21 CLI + 1 konfigurasi)                                         |
| Format       | `SkillDefinition` dengan skema alat + handler                                | Frontmatter `SKILL.md` + isi markdown                                                      |
| Penemuan     | REST `/api/skills/*` + alat MCP `omniroute_skills_*`                         | REST `/api/agent-skills/*` + alat MCP `omniroute_agent_skills_*` + `list-capabilities` A2A |

**Omni Skills** adalah mesin eksekusi — sistem ini menentukan apa yang _dapat dilakukan_ OmniRoute ketika LLM memanggil suatu alat.

**Agent Skills** adalah katalog dokumentasi — sistem ini menjelaskan kepada agen eksternal _cara menggunakan_ REST API dan CLI OmniRoute, dengan berkas SKILL.md terstruktur yang dapat dimasukkan langsung ke dalam prompt agen.

Untuk katalog Agent Skills, generator, alat MCP, dan skill A2A, lihat [docs/frameworks/AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## Konsep

### Sumber Skill

Tiga sumber skill hadir berdampingan dalam registri yang sama:

1. **Skill bawaan** (`src/lib/skills/builtins.ts`) — disertakan bersama OmniRoute. Mencakup kasus penggunaan umum:
   - `file_read`, `file_write` — ruang kerja sandbox per kunci API di bawah `<DATA_DIR>/skills/workspaces/<hashed-key>/`
   - `http_request` — HTTP keluar melalui `safeOutboundFetch` dengan `guard: "public-only"`
   - `web_search` — penyedia pencarian yang dapat diganti dengan caching (`executeWebSearch`)
   - `eval_code` — eksekusi `node` atau `python` dalam sandbox Docker
   - `execute_command` — perintah shell dalam sandbox Docker
   - `browser` — scaffolding berbasis Playwright, dinonaktifkan secara default (`builtin/browser.ts`)
2. **SkillsMP** (Marketplace OmniRoute) — diambil dari `https://skillsmp.com/api/v1/skills/search`. Memerlukan `skillsmpApiKey` di Pengaturan.
3. **SkillsSH** (katalog komunitas `skills.sh`) — diambil dari `https://skills.sh/api/search`. Tidak memerlukan autentikasi; konten SKILL.md diambil dari GitHub raw.

Satu "penyedia aktif" mengontrol katalog yang digunakan dashboard untuk melakukan instalasi (`src/lib/skills/providerSettings.ts`). Ganti penyedia tersebut melalui **Pengaturan → Memori & Skill**. Default: `skillsmp`.

### Identitas Skill

Skill diberi kunci berdasarkan `name@version` dalam registri di memori (`src/lib/skills/registry.ts`). Versi harus berupa semver (`^\d+\.\d+\.\d+$`). `resolveVersion()` memahami batasan `^`, `~`, `>`, `>=`, `<`, `<=`, `==`, dan pencocokan persis.

### Mode Skill

Setiap skill memiliki mode runtime yang mengontrol kapan skill tersebut disuntikkan:

| Mode   | Perilaku                                                                                         |
| ------ | ------------------------------------------------------------------------------------------------ |
| `on`   | Selalu disuntikkan sebagai definisi alat                                                         |
| `off`  | Tidak pernah disuntikkan dan tidak pernah dapat dieksekusi                                       |
| `auto` | Dinilai berdasarkan permintaan masuk; hanya disuntikkan jika skor ≥ `AUTO_MIN_SCORE` (default 3) |

`auto` adalah default untuk skill yang diinstal dari marketplace. `enabled=true` dan `mode="off"` secara bersamaan berarti "terdaftar tetapi tidak aktif" — mengalihkan `enabled` melalui kolom lama juga memperbarui `mode` agar alur kode lama tetap konsisten (`src/app/api/skills/[id]/route.ts`).

### Status (eksekusi)

Eksekusi skill dilacak dalam tabel `skill_executions` dengan status berikut (`src/lib/skills/types.ts`):

```ts
enum SkillStatus {
  PENDING = "pending",
  RUNNING = "running",
  SUCCESS = "success",
  ERROR = "error",
  TIMEOUT = "timeout",
}
```

### Cache Registri

`SkillRegistry` adalah singleton dengan cache TTL 60 detik (`registry.ts:14`). `loadFromDatabase()` bersifat idempoten dan menghapus duplikasi panggilan bersamaan melalui `pendingLoad`. Setiap operasi tulis (`register`/`unregister`/`unregisterById`) membatalkan cache. Cari versi melalui `getSkillVersions(name)` dan `resolveVersion(name, constraint)`.

### Penyuntikan yang Mempertimbangkan Penyedia

`injectSkills()` dalam `src/lib/skills/injection.ts` adalah titik masuk yang mengubah skill terdaftar menjadi definisi alat khusus penyedia:

- **OpenAI** — `{ type: "function", function: { name, description, parameters } }`
- **Anthropic** — `{ name, description, input_schema }`
- **Google (Gemini)** — `{ name, description, parameters }`

Nama alat dikodekan sebagai `name@version` agar handler dapat memilih versi yang tepat saat model memanggilnya kembali.

### Penilaian AUTO

Saat `mode="auto"`, setiap kandidat skill dinilai berdasarkan konteks permintaan (`scoreAutoSkill()` di `injection.ts`):

| Sinyal                                                       | Poin         |
| ------------------------------------------------------------ | ------------ |
| Nama skill muncul persis dalam konteks                       | +6           |
| Setiap token nama cocok dengan token konteks                 | +2           |
| Setiap substring tag cocok dengan konteks                    | +3           |
| Setiap token deskripsi cocok dengan konteks                  | +1           |
| Alasan latar belakang cocok dengan token nama                | +2 per token |
| Alasan latar belakang cocok dengan tag                       | +2 per token |
| Petunjuk penyedia dalam tag cocok dengan penyedia permintaan | +2 / −2      |

Sebanyak `AUTO_MAX_SKILLS = 5` skill teratas dengan `score >= AUTO_MIN_SCORE = 3` akan diinjeksi. Jika nilainya sama, urutan ditentukan berdasarkan `installCount` (menurun), lalu nama sesuai urutan alfabetis (`injection.ts:225-235`).

### Intersepsi Pemanggilan Alat

`handleToolCallExecution()` di `src/lib/skills/interception.ts` dipanggil oleh handler chat setelah upstream mengembalikan respons yang memanggil alat:

1. `extractToolCalls()` membaca bentuk khusus penyedia (OpenAI `tool_calls` / Responses `function_call`, Anthropic `tool_use`, Gemini `functionCalls`).
2. Alias alat bawaan (misalnya `omniroute_web_search` → `web_search`) diselesaikan terlebih dahulu. Handler bawaan dijalankan secara inline.
3. Semua yang lain dirutekan melalui `skillExecutor.execute(name@version, args, { apiKeyId, sessionId })`.
4. Hasil disisipkan kembali ke dalam respons — item `tool_results`, `function_call_output`, atau blok `tool_result` Anthropic sesuai kebutuhan.

`customSkillExecutionEnabled` dalam konteks eksekusi dapat diatur ke `false` untuk hanya mengizinkan intersepsi bawaan (digunakan oleh jalur permintaan yang secara eksplisit menonaktifkan handler buatan pengguna).

---

## Sandbox Docker

Jalur kode non-bawaan (`eval_code`, `execute_command`) dijalankan di dalam Docker melalui `SandboxRunner` (`src/lib/skills/sandbox.ts`). Setiap kontainer diluncurkan dengan:

```
--rm --network none|bridge --cap-drop ALL
--security-opt no-new-privileges --pids-limit 100
--cpus <cpuLimit/1000> --memory <memoryLimit>m
--tmpfs /tmp:rw,noexec,nosuid,size=64m
--tmpfs /workspace:rw,noexec,nosuid,size=64m
--read-only (ketika readOnly=true)
```

Nilai default (`SandboxRunner.DEFAULT_CONFIG`):

| Bidang           | Default         | Catatan                                                  |
| ---------------- | --------------- | -------------------------------------------------------- |
| `cpuLimit`       | 100 (= 0.1 CPU) | Dibagi 1000 sebelum diteruskan ke `--cpus`               |
| `memoryLimit`    | 256 MB          | Batas keras                                              |
| `timeout`        | 30000 ms        | Penghentian lunak melalui `SIGTERM` + `docker kill`      |
| `networkEnabled` | `false`         | Menjadi `--network none`                                 |
| `readOnly`       | `true`          | FS root hanya-baca; `/tmp` dan `/workspace` adalah tmpfs |

`SandboxRunner.kill(id)` dan `killAll()` diekspos untuk penghentian; kontainer yang sedang berjalan dilacak dalam `runningContainers: Map<string, ChildProcess>`.

### Variabel Lingkungan Sandbox

Dikonfigurasi melalui `process.env` di `src/lib/skills/builtins.ts`:

| Variabel Lingkungan               | Default          | Tujuan                                                                                              |
| --------------------------------- | ---------------- | --------------------------------------------------------------------------------------------------- |
| `SKILLS_MAX_FILE_BYTES`           | `1048576` (1 MB) | Batas untuk `file_read` dan `file_write`                                                            |
| `SKILLS_MAX_HTTP_RESPONSE_BYTES`  | `256000`         | Batas untuk isi respons `http_request`                                                              |
| `SKILLS_MAX_SANDBOX_OUTPUT_CHARS` | `100000`         | Batas stdout/stderr yang dikembalikan kepada pemanggil                                              |
| `SKILLS_SANDBOX_TIMEOUT_MS`       | `10000`          | Batas waktu default untuk perintah dalam sandbox; dibatasi hingga 60 dtk                            |
| `SKILLS_SANDBOX_NETWORK_ENABLED`  | `false`          | Gerbang utama untuk trafik keluar. Atur ke `1` atau `true` untuk mengizinkan aktivasi per panggilan |
| `SKILLS_ALLOWED_SANDBOX_IMAGES`   | (lihat di bawah) | Daftar gambar Docker yang diizinkan, dipisahkan dengan koma                                         |

Gambar yang diizinkan secara default: `alpine:3.20`, `node:22-alpine`, `python:3.12-alpine`. Setiap tambahan melalui `SKILLS_ALLOWED_SANDBOX_IMAGES` digabungkan dengan nilai default; gambar yang tidak dikenal ditolak oleh `normalizeImage()`.

> Catatan: tidak ada variabel lingkungan `SKILLS_EXECUTION_TIMEOUT_MS` yang terpisah. Batas waktu pengendali non-sandbox ditetapkan secara permanen ke 30 dtk dalam `SkillExecutor` (`executor.ts:13`), tetapi dapat ditimpa saat runtime melalui `skillExecutor.setTimeout(ms)`.

### Isolasi Ruang Kerja

`file_read` dan `file_write` menyelesaikan setiap jalur relatif terhadap ruang kerja per kunci API di `<DATA_DIR>/skills/workspaces/<sha256(apiKeyId).slice(0,24)>/`. Traversal jalur (`..`) dan segmen terlarang (`.env`, `.git`, `.ssh`, `.omniroute`, `.codex`, `secrets`) ditolak sebelum operasi I/O disk apa pun.

### Penguatan HTTP

`http_request` (`builtins.ts:257`):

- Daftar metode yang diizinkan: `GET, HEAD, POST, PUT, PATCH, DELETE`
- Header keluar yang diblokir: `host, connection, content-length, cookie, set-cookie, authorization, proxy-authorization`
- Pengalihan dinonaktifkan (`allowRedirect: false`)
- Dirutekan melalui `safeOutboundFetch` dengan `guard: "public-only"` (rentang privat/loopback diblokir)
- Respons dipotong pada `SKILLS_MAX_HTTP_RESPONSE_BYTES`; klien melihat `truncated: true`

---

## Hybrid Executor (pratinjau)

`src/lib/skills/hybrid.ts` mendefinisikan `HybridExecutor` yang memilih antara eksekusi `direct` (dalam proses) dan `sandbox` untuk setiap pemanggilan, dengan jalur percobaan ulang `autoUpgrade` ketika terjadi kesalahan batas waktu/memori. Implementasi `directExecutor` / `sandboxRunner` yang terhubung masih berupa stub (`executeDirect`, `executeInSandbox` mengembalikan objek placeholder) — perlakukan modul ini sebagai kontrak yang masih dalam pengembangan. Eksekusi sebenarnya masih dilakukan melalui `skillExecutor` + `SandboxRunner`.

---

## Penyimpanan

Skema tersedia dalam dua migrasi:

- `src/lib/db/migrations/016_create_skills.sql` — tabel dasar `skills` dan `skill_executions`, dengan indeks pada `(api_key_id, name)` dan `(skill_id, status, created_at)`.
- `src/lib/db/migrations/027_skill_mode_and_metadata.sql` — menambahkan `mode`, `source_provider`, `tags` (JSON), `install_count` ke `skills`.

`skill_executions.status` dibatasi pada tingkat basis data: `CHECK(status IN ('pending', 'running', 'success', 'error', 'timeout'))`.

---

## REST API

Semua endpoint berada di bawah `src/app/api/skills/`. Endpoint pengelolaan (`/api/skills`, `/api/skills/[id]`, `/api/skills/install`) memerlukan **autentikasi pengelolaan** melalui `requireManagementAuth()`. Alur marketplace/instalasi menggunakan `isAuthenticated()` yang lebih ringan (sesi atau kunci API).

| Endpoint | Metode | Tujuan |
| --------------------------------- | ------ | ------------------------------------------------------------------------ | --- | ------------------------ | -------- | ------------------ |
| `/api/skills` | GET | Menampilkan skill yang terdaftar. Mendukung `?q=`, `?mode=on             | off | auto`, `?source=skillsmp | skillssh | local`, paginasi |
| `/api/skills/[id]` | PUT | Memperbarui `enabled` atau `mode` |
| `/api/skills/[id]` | DELETE | Membatalkan pendaftaran berdasarkan id |
| `/api/skills/install` | POST | Menginstal skill kustom (kode handler + skema) |
| `/api/skills/marketplace` | GET | Mencari katalog SkillsMP (mengembalikan pilihan populer bawaan saat `q` kosong) |
| `/api/skills/marketplace/install` | POST | Menginstal skill SkillsMP (memerlukan penyedia aktif = `skillsmp`) |
| `/api/skills/skillssh` | GET | Mencari katalog skills.sh (`?q=&limit=`, dibatasi hingga 100) |
| `/api/skills/skillssh/install` | POST | Menginstal skill skills.sh (memerlukan penyedia aktif = `skillssh`) |
| `/api/skills/executions` | GET | Riwayat eksekusi berpaginasi (`?apiKeyId=`) |
| `/api/skills/executions` | POST | Menjalankan skill terdaftar secara ad hoc |

Endpoint `POST /api/skills/executions` mengembalikan HTTP `503` dengan `{ error: "Skills execution is disabled..." }` saat `settings.skillsEnabled === false` (`executor.ts:42-45`). Operator dapat mengubah sakelar utama melalui **Pengaturan → AI**.

### Contoh: menginstal skill kustom

```bash
curl -X POST http://localhost:20128/api/skills/install \
  -H "Authorization: Bearer $OMNIROUTE_MGMT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "reverse-text",
    "version": "1.0.0",
    "description": "Reverses a string",
    "schema": {
      "input":  { "type": "object", "properties": { "text": { "type": "string" } }, "required": ["text"] },
      "output": { "type": "object", "properties": { "reversed": { "type": "string" } } }
    },
    "handlerCode": "echo-handler",
    "apiKeyId": "your-api-key-id"
  }'
```

String `handlerCode` merupakan **pencarian nama handler** — bukan kode yang dapat dieksekusi. Executor memetakannya melalui `skillExecutor.registerHandler(name, fn)` (`executor.ts:25`). Instalasi dari marketplace menyimpan teks SKILL.md dalam bidang ini sebagai dokumentasi dan mengarahkan eksekusi melalui pemanggilan alat yang dihasilkan model. Sumber sembarang yang diberikan pengguna tidak dievaluasi dengan eval.

## Alat MCP

Empat alat MCP membungkus antarmuka skill (`open-sse/mcp-server/tools/skillTools.ts`). Alat-alat tersebut didaftarkan secara otomatis saat server MCP dimulai.

| Alat                          | Deskripsi                                                                       |
| ----------------------------- | ------------------------------------------------------------------------------- |
| `omniroute_skills_list`       | Menampilkan daftar skill, dengan filter opsional: `apiKeyId`, `name`, `enabled` |
| `omniroute_skills_enable`     | Mengaktifkan/menonaktifkan skill berdasarkan `skillId`                          |
| `omniroute_skills_execute`    | Menjalankan skill dengan payload input                                          |
| `omniroute_skills_executions` | Riwayat eksekusi terbaru (default 50, maksimum 100)                             |

Lihat [MCP-SERVER.md](./MCP-SERVER.md) untuk penyiapan transport dan penetapan cakupan.

---

## Integrasi A2A

`src/lib/skills/a2a.ts` mengekspor deskriptor skill A2A `memory_aware_routing` dan helper `registerA2ASkill(registry)`. Skill A2A kustom berada di `src/lib/a2a/skills/` dan diteruskan melalui `A2A_SKILL_HANDLERS` (`src/lib/a2a/taskExecution.ts`). Lihat [A2A-SERVER.md](./A2A-SERVER.md) untuk siklus hidup tugas selengkapnya.

---

## Menambahkan Skill Bawaan Baru

1. **Definisikan handler** di `src/lib/skills/builtins.ts` (atau file sejawat di bawah `src/lib/skills/builtin/`). Tanda tangan: `(input, { apiKeyId, sessionId }) => Promise<output>`.
2. **Jalur kode dalam sandbox?** Panggil `sandboxRunner.run(image, command, env, sandboxConfig({...}))`. Gunakan `normalizeImage()` terhadap daftar yang diizinkan.
3. **Jalur sistem berkas?** Selalu teruskan melalui `resolveWorkspacePath(input, context)` sebelum mengakses disk.
4. **Panggilan jaringan?** Gunakan `safeOutboundFetch` dengan `guard: "public-only"`; sanitasi header melalui `sanitizeHeaders()`.
5. **Daftarkan** dengan menambahkan entri ke `builtinSkills` (atau memanggil pola `registerBrowserSkill(executor)` saat proses dimulai).
6. **Hubungkan alias alat bawaan** (opsional) di `BUILTIN_TOOL_ALIASES` (`interception.ts:23`) jika model upstream menghasilkan nama yang berbeda.
7. **Pengujian** di `src/lib/skills/__tests__/` (Vitest).

---

## Menambahkan Skill Kustom (Non-Bawaan)

1. Daftarkan handler saat proses dimulai:
   ```ts
   skillExecutor.registerHandler("my-handler", async (input, ctx) => { ... });
   ```
2. Tambahkan skill melalui `POST /api/skills/install` (bidang `handlerCode` harus cocok dengan nama handler yang terdaftar).
3. Alihkan `mode` ke `on` atau `auto` melalui `PUT /api/skills/[id]`.

---

## Kiat Operasional

- **Sakelar utama:** `settings.skillsEnabled = false` memblokir semua eksekusi dan mengembalikan HTTP `503` pada `/api/skills/executions`. Registry tetap dimuat.
- **Batasi akses keluar:** biarkan `SKILLS_SANDBOX_NETWORK_ENABLED` tidak disetel (default) untuk sandbox yang sepenuhnya terisolasi dari jaringan. `networkEnabled: true` per panggilan tetap memerlukan gerbang utama.
- **Izinkan image tertentu:** setel `SKILLS_ALLOWED_SANDBOX_IMAGES="myorg/sandbox:1.0,node:22-alpine"` untuk memperluas daftar yang diizinkan.
- **Audit eksekusi:** `/dashboard/skills/executions` dan `omniroute_skills_executions` sama-sama mengueri `skill_executions`. Eksekusi yang berhasil menyertakan `durationMs`; kegagalan menyertakan `errorMessage`.
- **Invalidasi cache:** panggil `skillRegistry.invalidateCache()` setelah pengeditan DB secara manual; jika tidak, tunggu 60 dtk.
- **Workspace anonim:** ketika `apiKeyId` kosong, semua panggilan di-hash ke workspace `"anonymous"` yang sama — kode yang menangani penggunaan bersama harus selalu meneruskan kunci yang sebenarnya.

---

## Siklus Hidup Eksekusi (v3.8.16+)

`SkillExecutor` (`src/lib/skills/executor.ts`) adalah sebuah **singleton** yang mengelola setiap pemanggilan skill. Memahami siklus hidupnya sangat penting untuk men-debug timeout, percobaan ulang, dan status eksekusi.

### Siklus Hidup 5 Tahap

```
   execute() dipanggil
        │
        ▼
  ┌─────────────┐
  │  PENDING    │  ← masuk antrean, belum dimulai (baris DB dibuat)
  └──────┬──────┘
         │ mulai handler
         ▼
  ┌─────────────┐
  │  RUNNING    │  ← handler dipanggil dengan timeout
  └──────┬──────┘
         │
    ┌────┴────┬──────────┬──────────┐
    │         │          │          │
    ▼         ▼          ▼          ▼
  SUCCESS   ERROR     TIMEOUT   (tidak ada jalur lain — dihentikan oleh induk)
    │         │          │
    └────┬────┴──────────┘
         │
         ▼
   Baris DB diperbarui dengan status, output, durationMs
```

### Konfigurasi Default

| Pengaturan   | Default          | Dapat dikonfigurasi melalui          |
| ------------ | ---------------- | ------------------------------------ |
| `timeout`    | `30000` (30 dtk) | `skillExecutor.setTimeout(ms)`       |
| `maxRetries` | `3`              | `skillExecutor.setMaxRetries(count)` |

> **Penting**: Executor ini merupakan singleton — memanggil `setTimeout()` akan memengaruhi semua pemanggilan berikutnya secara global. Timeout per skill saat ini belum didukung; jika Anda memerlukan timeout yang berbeda untuk setiap skill, jalankan proses terpisah atau fork executor tersebut.

### Nilai Status

Dari `src/lib/skills/types.ts`:

```ts
enum SkillStatus {
  PENDING = "pending", // Masuk antrean, belum dimulai
  RUNNING = "running", // Handler dipanggil
  SUCCESS = "success", // Handler mengembalikan output yang valid
  ERROR = "error", // Handler melempar pengecualian
  TIMEOUT = "timeout", // Melampaui timeout executor
}
```

> **Catatan**: Status `TIMEOUT` didefinisikan dalam enum, tetapi **sebenarnya tidak ditulis ke DB** oleh implementasi executor saat ini — timeout ditampilkan sebagai `ERROR` dengan pesan `"Skill execution timed out"`. Enum status tersebut disediakan untuk penggunaan pada masa mendatang.

### Memeriksa Eksekusi

```ts
import { skillExecutor } from "omniroute/skills/executor";

// Dapatkan eksekusi tertentu berdasarkan ID
const exec = skillExecutor.getExecution("exec-uuid-123");
if (exec) {
  console.log(`${exec.skillName}: ${exec.status} dalam ${exec.durationMs}ms`);
}

// Cantumkan eksekusi terbaru untuk sebuah kunci API
const recent = skillExecutor.listExecutions("api-key-id", 50, 0);
for (const e of recent) {
  console.log(`${e.skillName} → ${e.status} (${e.durationMs}ms)`);
}

// Hitung jumlah total eksekusi
const total = skillExecutor.countExecutions("api-key-id");
```

### Perilaku Percobaan Ulang

Pengaturan `maxRetries` disimpan, tetapi **saat ini tidak digunakan** oleh metode `execute()` milik executor — metode tersebut hanya melakukan satu kali percobaan. Nilai `maxRetries` diekspos untuk implementasi pada masa mendatang dan untuk hook yang perlu membacanya.

Untuk saat ini, percobaan ulang harus diimplementasikan di dalam handler skill itu sendiri. Skill bawaan didaftarkan ke executor (misalnya `registerBuiltinSkills(executor)` / `registerBrowserSkill(executor)` di `src/lib/skills/builtin/`); handler apa pun yang Anda daftarkan dapat membungkus loop percobaan ulangnya sendiri:

```ts
// di dalam handler skill
async function handler(input, ctx) {
  const maxRetries = 3;
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fetchSomething(input);
    } catch (err) {
      lastError = err as Error;
      if (attempt < maxRetries) {
        await new Promise((r) => setTimeout(r, 1000 * attempt));
      }
    }
  }
  throw lastError;
}
```

---

## SkillMode secara Mendetail

Enum `SkillMode` (`src/lib/skills/types.ts`) mengontrol **kapan dan bagaimana** skill dipanggil:

```ts
enum SkillMode {
  AUTO = "auto", // LLM memutuskan kapan akan memanggil skill
  MANUAL = "manual", // Hanya dipanggil melalui permintaan eksplisit pengguna
  HYBRID = "hybrid", // Penilaian AUTO + pengesampingan manual
}
```

> **Catatan**: Basis kode mendefinisikan `SkillMode` (AUTO/MANUAL/HYBRID), sedangkan bidang `Skill.mode` menggunakan bentuk yang berbeda (`"on" | "off" | "auto"`). Keduanya saling berkaitan, tetapi tidak identik — `SkillMode` digunakan untuk kebijakan eksekutor, sedangkan `Skill.mode` digunakan untuk pengaktifan per skill.

### Kapan Menggunakan Setiap Mode

| Mode     | Perilaku LLM                                                                                          | Kasus penggunaan                                         |
| -------- | ----------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `AUTO`   | LLM dapat memanggil skill ketika dianggap perlu                                                       | Skill serbaguna (membaca file, permintaan HTTP)          |
| `MANUAL` | LLM tidak dapat memanggil skill; hanya panggilan API `executeSkill` eksplisit yang dapat memanggilnya | Operasi sensitif (penulisan basis data, pembayaran)      |
| `HYBRID` | LLM dapat menyarankan skill; pengguna harus mengonfirmasi                                             | Skill yang memiliki efek samping, tetapi tidak berbahaya |

### Penilaian AUTO

Saat mode `AUTO` aktif, setiap kandidat skill dinilai berdasarkan konteks permintaan
oleh `scoreAutoSkill()` di `src/lib/skills/injection.ts` — sebuah sistem poin
bilangan bulat aditif (kecocokan nama skill, tumpang tindih token nama/tag/deskripsi,
petunjuk alasan latar belakang, bonus/penalti petunjuk penyedia). Sebanyak
`AUTO_MAX_SKILLS = 5` skill teratas dengan `score >= AUTO_MIN_SCORE = 3` disisipkan sebagai
alat yang dapat dipanggil, dengan hasil seri ditentukan berdasarkan `installCount`, lalu nama. Lihat tabel poin lengkap
di [**Pembuatan Skema Alat → Penilaian AUTO**](#auto-scoring) pada bagian sebelumnya dalam
dokumen ini; tidak ada ambang batas bilangan pecahan bergaya `0.6` dan tidak ada penilaian di `registry.ts`.

---

## Katalog Skill Bawaan

OmniRoute dilengkapi dengan sekumpulan skill bawaan yang telah dikurasi di `src/lib/skills/builtin/`. Skill yang paling umum:

### Skill Otomatisasi Browser

Skill browser (`src/lib/skills/builtin/browser.ts`) menyediakan otomatisasi browser headless melalui Playwright/Puppeteer. **Skill ini telah diimplementasikan, tetapi tidak disertakan dalam katalog skill default** — untuk menggunakannya, instal plugin ekstensi browser secara terpisah.

```ts
// Aktifkan di konfigurasi Anda
const config: SkillConfig = {
  enabled: true,
  mode: SkillMode.MANUAL, // Selalu mewajibkan pemanggilan eksplisit
  allowedSkills: ["browser"],
  timeout: 60000, // 60 detik untuk pemuatan halaman
  maxRetries: 1,
};
```

### Kategori Bawaan Lainnya

| Kategori      | Skill                                       | Mode   |
| ------------- | ------------------------------------------- | ------ |
| I/O File      | `file_read`, `file_write`                   | AUTO   |
| HTTP          | `http_request`                              | AUTO   |
| Pencarian     | `web_search`                                | AUTO   |
| Eksekusi Kode | `eval_code` (JavaScript/Python terisolasi)  | HYBRID |
| Sistem        | `execute_command` (eksekusi CLI terisolasi) | MANUAL |

### Menambahkan Skill Kustom

Lihat [SDK Plugin & Integrasi Skill](./PLUGIN_SDK.md) untuk mengetahui cara menambahkan skill kustom melalui sistem plugin.

---

## Lihat Juga

- [MCP-SERVER.md](./MCP-SERVER.md) — pendaftaran alat dan transport MCP
- [A2A-SERVER.md](./A2A-SERVER.md) — siklus hidup tugas dan pengiriman keterampilan A2A
- [USER_GUIDE.md](../guides/USER_GUIDE.md#-skills-system) — pengantar bagi pengguna
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — alur permintaan dan peta komponen
- Sumber: `src/lib/skills/`, `src/app/api/skills/`, `open-sse/mcp-server/tools/skillTools.ts`
- Pengujian: `src/lib/skills/__tests__/integration.test.ts`
