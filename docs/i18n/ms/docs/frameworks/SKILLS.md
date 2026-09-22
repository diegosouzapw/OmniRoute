# Skills Framework (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/SKILLS.md) · 🇪🇹 [am](../../../am/docs/frameworks/SKILLS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/SKILLS.md) · 🇦🇿 [az](../../../az/docs/frameworks/SKILLS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/SKILLS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/SKILLS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/SKILLS.md) · 🇩🇰 [da](../../../da/docs/frameworks/SKILLS.md) · 🇩🇪 [de](../../../de/docs/frameworks/SKILLS.md) · 🇬🇷 [el](../../../el/docs/frameworks/SKILLS.md) · 🇪🇸 [es](../../../es/docs/frameworks/SKILLS.md) · 🇪🇪 [et](../../../et/docs/frameworks/SKILLS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/SKILLS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/SKILLS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/SKILLS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/SKILLS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/SKILLS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/SKILLS.md) · 🇮🇱 [he](../../../he/docs/frameworks/SKILLS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/SKILLS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/SKILLS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/SKILLS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/SKILLS.md) · 🇮🇩 [id](../../../id/docs/frameworks/SKILLS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/SKILLS.md) · 🇮🇹 [it](../../../it/docs/frameworks/SKILLS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/SKILLS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/SKILLS.md) · 🇰🇭 [km](../../../km/docs/frameworks/SKILLS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/SKILLS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/SKILLS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/SKILLS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/SKILLS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/SKILLS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/SKILLS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/SKILLS.md) · 🇲🇲 [my](../../../my/docs/frameworks/SKILLS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/SKILLS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/SKILLS.md) · 🇳🇴 [no](../../../no/docs/frameworks/SKILLS.md) · 🇮🇳 [or](../../../or/docs/frameworks/SKILLS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/SKILLS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/SKILLS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/SKILLS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/SKILLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/SKILLS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/SKILLS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/SKILLS.md) · 🇱🇰 [si](../../../si/docs/frameworks/SKILLS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/SKILLS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/SKILLS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/SKILLS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/SKILLS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/SKILLS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/SKILLS.md) · 🇮🇳 [te](../../../te/docs/frameworks/SKILLS.md) · 🇹🇭 [th](../../../th/docs/frameworks/SKILLS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/SKILLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/SKILLS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/SKILLS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/SKILLS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/SKILLS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/SKILLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/SKILLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/SKILLS.md)

---

> **Sumber rujukan utama:** `src/lib/skills/` dan `src/app/api/skills/`
> **Kemas kini terakhir:** 2026-06-28 — v3.8.40

OmniRoute menyediakan rangka kerja Skills yang boleh diperluas, yang membolehkan model bahasa (dan pengendali) menggabungkan keupayaan yang boleh digunakan semula — daripada pembacaan sistem fail dan permintaan HTTP hingga pelaksanaan kod dalam kotak pasir serta kemahiran pasaran yang dipilih susun.

Kemahiran ialah unit kerja berversi dan ditakrifkan oleh skema. OmniRoute boleh menyuntik kemahiran sebagai takrif alat ke dalam permintaan keluar, memintas panggilan alat yang dikembalikan oleh model, menjalankan pengendali yang sepadan, dan menyalurkan hasilnya kembali kepada model supaya perbualan boleh diteruskan. Model tidak pernah melihat pelaksanaannya — hanya antara muka alat.

---

## Agent Skills berbanding Omni Skills

OmniRoute mempunyai dua sistem kemahiran yang berbeza tetapi saling melengkapi:

| Dimensi              | **Omni Skills** (dokumen ini)                                                              | **Agent Skills**                                                                           |
| :------------------- | :----------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------- |
| Tujuan               | Suntikan alat LLM + pelaksanaan dalam kotak pasir                                          | Katalog SKILL.md untuk ditemui dan digunakan oleh ejen luaran                              |
| Sumber rujukan utama | `src/lib/skills/` + pasaran                                                                | `src/lib/agentSkills/` + direktori `skills/`                                               |
| Mod masa jalan       | Disuntik ke dalam permintaan keluar, dilaksanakan apabila peristiwa panggilan alat berlaku | Katalog markdown statik + titik akhir penemuan REST/MCP/A2A                                |
| Pengguna             | OmniRoute sendiri (penghalaan gabungan, panggilan LLM masuk)                               | Ejen luaran, klien MCP, pengatur A2A                                                       |
| Bilangan             | Berubah-ubah (dipacu oleh pasaran)                                                         | 45 entri katalog (23 API + 21 CLI + 1 konfigurasi)                                         |
| Format               | `SkillDefinition` dengan skema alat + pengendali                                           | Bahagian hadapan `SKILL.md` + isi markdown                                                 |
| Penemuan             | REST `/api/skills/*` + alat MCP `omniroute_skills_*`                                       | REST `/api/agent-skills/*` + alat MCP `omniroute_agent_skills_*` + `list-capabilities` A2A |

**Omni Skills** ialah enjin pelaksanaan — ia mentakrifkan perkara yang _boleh dilakukan_ oleh OmniRoute apabila LLM menggunakan alat.

**Agent Skills** ialah katalog dokumentasi — ia menerangkan kepada ejen luaran _cara menggunakan_ REST API dan CLI OmniRoute, dengan fail SKILL.md berstruktur yang boleh dimasukkan terus ke dalam prom ejen.

Untuk katalog Agent Skills, penjana, alat MCP, dan kemahiran A2A, lihat [docs/frameworks/AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## Konsep

### Sumber Kemahiran

Tiga sumber kemahiran wujud bersama-sama dalam pendaftaran yang sama:

1. **Kemahiran terbina dalam** (`src/lib/skills/builtins.ts`) — disertakan bersama OmniRoute. Merangkumi kes penggunaan umum:
   - `file_read`, `file_write` — ruang kerja kotak pasir bagi setiap kunci API di bawah `<DATA_DIR>/skills/workspaces/<hashed-key>/`
   - `http_request` — HTTP keluar melalui `safeOutboundFetch` dengan `guard: "public-only"`
   - `web_search` — penyedia carian boleh pasang dengan cache (`executeWebSearch`)
   - `eval_code` — pelaksanaan `node` atau `python` dalam kotak pasir Docker
   - `execute_command` — perintah shell dalam kotak pasir Docker
   - `browser` — perancah berasaskan Playwright, dinyahdayakan secara lalai (`builtin/browser.ts`)
2. **SkillsMP** (Pasaran OmniRoute) — diambil daripada `https://skillsmp.com/api/v1/skills/search`. Memerlukan `skillsmpApiKey` dalam Tetapan.
3. **SkillsSH** (katalog komuniti `skills.sh`) — diambil daripada `https://skills.sh/api/search`. Tiada pengesahan diperlukan; kandungan SKILL.md ditarik daripada fail mentah GitHub.

Satu "penyedia aktif" mengawal katalog yang digunakan oleh papan pemuka untuk pemasangan (`src/lib/skills/providerSettings.ts`). Tukarkannya di bawah **Tetapan → Memori & Kemahiran**. Lalai: `skillsmp`.

### Identiti Kemahiran

Kemahiran dikunci mengikut `name@version` dalam pendaftaran dalam memori (`src/lib/skills/registry.ts`). Versi mestilah semver (`^\d+\.\d+\.\d+$`). `resolveVersion()` memahami kekangan `^`, `~`, `>`, `>=`, `<`, `<=`, `==`, dan padanan tepat.

### Mod Kemahiran

Setiap kemahiran mempunyai mod masa jalan yang mengawal masa ia disuntik:

| Mod    | Tingkah laku                                                                                |
| ------ | ------------------------------------------------------------------------------------------- |
| `on`   | Sentiasa disuntik sebagai takrif alat                                                       |
| `off`  | Tidak pernah disuntik dan tidak boleh dilaksanakan                                          |
| `auto` | Dinilai berdasarkan permintaan masuk; disuntik hanya jika skor ≥ `AUTO_MIN_SCORE` (lalai 3) |

`auto` ialah nilai lalai untuk kemahiran yang dipasang daripada pasaran. `enabled=true` dan `mode="off"` bersama-sama bermaksud "didaftarkan tetapi tidak aktif" — menogol `enabled` melalui lajur legasi turut mengubah `mode` supaya laluan kod lama kekal konsisten (`src/app/api/skills/[id]/route.ts`).

### Status (pelaksanaan)

Pelaksanaan kemahiran dijejaki dalam jadual `skill_executions` dengan status berikut (`src/lib/skills/types.ts`):

```ts
enum SkillStatus {
  PENDING = "pending",
  RUNNING = "running",
  SUCCESS = "success",
  ERROR = "error",
  TIMEOUT = "timeout",
}
```

### Cache Pendaftaran

`SkillRegistry` ialah singleton dengan cache TTL 60 saat (`registry.ts:14`). `loadFromDatabase()` bersifat idempoten dan menyahpendua panggilan serentak melalui `pendingLoad`. Sebarang penulisan (`register`/`unregister`/`unregisterById`) mentaksahkan cache. Cari versi melalui `getSkillVersions(name)` dan `resolveVersion(name, constraint)`.

### Suntikan Peka Penyedia

`injectSkills()` dalam `src/lib/skills/injection.ts` ialah titik masuk yang menukar kemahiran berdaftar kepada takrif alat khusus penyedia:

- **OpenAI** — `{ type: "function", function: { name, description, parameters } }`
- **Anthropic** — `{ name, description, input_schema }`
- **Google (Gemini)** — `{ name, description, parameters }`

Nama alat dikodkan sebagai `name@version` supaya pengendali boleh memilih versi yang betul apabila model memanggilnya semula.

### Penskoran AUTO

Apabila `mode="auto"`, setiap kemahiran calon diberikan skor berdasarkan konteks permintaan (`scoreAutoSkill()` dalam `injection.ts`):

| Isyarat                                                        | Mata            |
| -------------------------------------------------------------- | --------------- |
| Nama kemahiran muncul secara tepat dalam konteks               | +6              |
| Setiap token nama sepadan dengan token konteks                 | +2              |
| Setiap subrentetan tag sepadan dengan konteks                  | +3              |
| Setiap token perihalan sepadan dengan konteks                  | +1              |
| Sebab latar belakang sepadan dengan token nama                 | +2 setiap token |
| Sebab latar belakang sepadan dengan tag                        | +2 setiap token |
| Petunjuk penyedia dalam tag sepadan dengan penyedia permintaan | +2 / −2         |

`AUTO_MAX_SKILLS = 5` kemahiran teratas dengan `score >= AUTO_MIN_SCORE = 3` disuntik. Keputusan seri ditentukan mengikut `installCount` (menurun), kemudian nama mengikut abjad (`injection.ts:225-235`).

### Pemintasan Panggilan Alat

`handleToolCallExecution()` dalam `src/lib/skills/interception.ts` dipanggil oleh pengendali sembang selepas perkhidmatan huluan mengembalikan respons yang memanggil alat:

1. `extractToolCalls()` membaca bentuk khusus penyedia (OpenAI `tool_calls` / Responses `function_call`, Anthropic `tool_use`, Gemini `functionCalls`).
2. Alias alat terbina dalam (cth. `omniroute_web_search` → `web_search`) diselesaikan terlebih dahulu. Pengendali terbina dalam dijalankan secara terus.
3. Perkara lain dihalakan melalui `skillExecutor.execute(name@version, args, { apiKeyId, sessionId })`.
4. Hasil disisipkan semula ke dalam respons — item `tool_results`, `function_call_output`, atau blok `tool_result` Anthropic, mengikut kesesuaian.

`customSkillExecutionEnabled` dalam konteks pelaksanaan boleh ditetapkan kepada `false` untuk membenarkan hanya pemintasan terbina dalam (digunakan oleh laluan permintaan yang melumpuhkan pengendali takrifan pengguna secara eksplisit).

---

## Kotak Pasir Docker

Laluan kod bukan terbina dalam (`eval_code`, `execute_command`) dijalankan di dalam Docker melalui `SandboxRunner` (`src/lib/skills/sandbox.ts`). Setiap bekas dilancarkan dengan:

```
--rm --network none|bridge --cap-drop ALL
--security-opt no-new-privileges --pids-limit 100
--cpus <cpuLimit/1000> --memory <memoryLimit>m
--tmpfs /tmp:rw,noexec,nosuid,size=64m
--tmpfs /workspace:rw,noexec,nosuid,size=64m
--read-only (apabila readOnly=true)
```

Nilai lalai (`SandboxRunner.DEFAULT_CONFIG`):

| Medan            | Lalai           | Catatan                                                  |
| ---------------- | --------------- | -------------------------------------------------------- |
| `cpuLimit`       | 100 (= 0.1 CPU) | Dibahagikan dengan 1000 sebelum dihantar kepada `--cpus` |
| `memoryLimit`    | 256 MB          | Had mutlak                                               |
| `timeout`        | 30000 ms        | Penamatan lembut melalui `SIGTERM` + `docker kill`       |
| `networkEnabled` | `false`         | Menjadi `--network none`                                 |
| `readOnly`       | `true`          | FS akar baca sahaja; `/tmp` dan `/workspace` ialah tmpfs |

`SandboxRunner.kill(id)` dan `killAll()` didedahkan untuk penutupan; bekas yang sedang berjalan dijejaki dalam `runningContainers: Map<string, ChildProcess>`.

### Pemboleh Ubah Persekitaran Kotak Pasir

Dikonfigurasikan melalui `process.env` dalam `src/lib/skills/builtins.ts`:

| Pemboleh Ubah Persekitaran        | Lalai            | Tujuan                                                                                                  |
| --------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------- |
| `SKILLS_MAX_FILE_BYTES`           | `1048576` (1 MB) | Had untuk `file_read` dan `file_write`                                                                  |
| `SKILLS_MAX_HTTP_RESPONSE_BYTES`  | `256000`         | Had untuk kandungan respons `http_request`                                                              |
| `SKILLS_MAX_SANDBOX_OUTPUT_CHARS` | `100000`         | Had untuk stdout/stderr yang dikembalikan kepada pemanggil                                              |
| `SKILLS_SANDBOX_TIMEOUT_MS`       | `10000`          | Tamat masa lalai untuk perintah berkotak pasir; dihadkan kepada 60 s                                    |
| `SKILLS_SANDBOX_NETWORK_ENABLED`  | `false`          | Kawalan utama untuk trafik keluar. Tetapkan `1` atau `true` bagi membenarkan pengaktifan ikut panggilan |
| `SKILLS_ALLOWED_SANDBOX_IMAGES`   | (lihat di bawah) | Senarai imej Docker yang dibenarkan, dipisahkan dengan koma                                             |

Imej lalai yang dibenarkan: `alpine:3.20`, `node:22-alpine`, `python:3.12-alpine`. Sebarang penambahan melalui `SKILLS_ALLOWED_SANDBOX_IMAGES` digabungkan dengan nilai lalai; imej yang tidak dikenali ditolak oleh `normalizeImage()`.

> Catatan: tiada pemboleh ubah persekitaran `SKILLS_EXECUTION_TIMEOUT_MS` yang berasingan. Tamat masa pengendali bukan kotak pasir dikodkan secara tetap kepada 30 s dalam `SkillExecutor` (`executor.ts:13`), tetapi boleh diganti semasa masa jalan melalui `skillExecutor.setTimeout(ms)`.

### Pengasingan Ruang Kerja

`file_read` dan `file_write` menyelesaikan setiap laluan secara relatif kepada ruang kerja bagi setiap kunci API di `<DATA_DIR>/skills/workspaces/<sha256(apiKeyId).slice(0,24)>/`. Perentasan laluan (`..`) dan segmen terlarang (`.env`, `.git`, `.ssh`, `.omniroute`, `.codex`, `secrets`) ditolak sebelum sebarang I/O cakera.

### Pengukuhan HTTP

`http_request` (`builtins.ts:257`):

- Senarai kaedah yang dibenarkan: `GET, HEAD, POST, PUT, PATCH, DELETE`
- Pengepala keluar yang disekat: `host, connection, content-length, cookie, set-cookie, authorization, proxy-authorization`
- Ubah hala dinyahdayakan (`allowRedirect: false`)
- Dihalakan melalui `safeOutboundFetch` dengan `guard: "public-only"` (julat persendirian/gelung balik disekat)
- Respons dipenggal pada `SKILLS_MAX_HTTP_RESPONSE_BYTES`; klien melihat `truncated: true`

---

## Pelaksana Hibrid (pratonton)

`src/lib/skills/hybrid.ts` mentakrifkan `HybridExecutor` yang memilih antara pelaksanaan `direct` (dalam proses) dan `sandbox` bagi setiap panggilan, dengan laluan percubaan semula `autoUpgrade` apabila berlaku ralat tamat masa/memori. Pelaksanaan `directExecutor` / `sandboxRunner` yang disambungkan ialah stub (`executeDirect`, `executeInSandbox` mengembalikan objek ruang letak) — anggap modul ini sebagai kontrak yang masih dalam pembangunan. Pelaksanaan sebenar masih melalui `skillExecutor` + `SandboxRunner`.

---

## Storan

Skema berada dalam dua migrasi:

- `src/lib/db/migrations/016_create_skills.sql` — jadual asas `skills` dan `skill_executions`, dengan indeks pada `(api_key_id, name)` dan `(skill_id, status, created_at)`.
- `src/lib/db/migrations/027_skill_mode_and_metadata.sql` — menambahkan `mode`, `source_provider`, `tags` (JSON), `install_count` pada `skills`.

`skill_executions.status` dihadkan pada peringkat pangkalan data: `CHECK(status IN ('pending', 'running', 'success', 'error', 'timeout'))`.

---

## API REST

Semua titik akhir berada di bawah `src/app/api/skills/`. Titik akhir pengurusan (`/api/skills`, `/api/skills/[id]`, `/api/skills/install`) memerlukan **pengesahan pengurusan** melalui `requireManagementAuth()`. Aliran marketplace/pemasangan menggunakan `isAuthenticated()` yang lebih ringan (sesi atau kunci API).

| Titik akhir | Kaedah | Tujuan |
| --------------------------------- | ------ | ------------------------------------------------------------------------ | --- | ------------------------ | -------- | ------------------ |
| `/api/skills` | GET | Senaraikan kemahiran berdaftar. Menyokong `?q=`, `?mode=on               | off | auto`, `?source=skillsmp | skillssh | local`, penomboran halaman |
| `/api/skills/[id]` | PUT | Kemas kini `enabled` atau `mode` |
| `/api/skills/[id]` | DELETE | Nyahdaftar mengikut id |
| `/api/skills/install` | POST | Pasang kemahiran tersuai (kod pengendali + skema) |
| `/api/skills/marketplace` | GET | Cari katalog SkillsMP (mengembalikan pilihan popular lalai apabila `q` kosong) |
| `/api/skills/marketplace/install` | POST | Pasang kemahiran SkillsMP (memerlukan penyedia aktif = `skillsmp`) |
| `/api/skills/skillssh` | GET | Cari katalog skills.sh (`?q=&limit=`, dihadkan kepada 100) |
| `/api/skills/skillssh/install` | POST | Pasang kemahiran skills.sh (memerlukan penyedia aktif = `skillssh`) |
| `/api/skills/executions` | GET | Sejarah pelaksanaan berhalaman (`?apiKeyId=`) |
| `/api/skills/executions` | POST | Laksanakan kemahiran berdaftar secara ad hoc |

Titik akhir `POST /api/skills/executions` mengembalikan HTTP `503` dengan `{ error: "Pelaksanaan kemahiran dinyahdayakan..." }` apabila `settings.skillsEnabled === false` (`executor.ts:42-45`). Pengendali boleh menukar suis induk melalui **Tetapan → AI**.

### Contoh: pasang kemahiran tersuai

```bash
curl -X POST http://localhost:20128/api/skills/install \
  -H "Authorization: Bearer $OMNIROUTE_MGMT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "reverse-text",
    "version": "1.0.0",
    "description": "Membalikkan rentetan",
    "schema": {
      "input":  { "type": "object", "properties": { "text": { "type": "string" } }, "required": ["text"] },
      "output": { "type": "object", "properties": { "reversed": { "type": "string" } } }
    },
    "handlerCode": "echo-handler",
    "apiKeyId": "your-api-key-id"
  }'
```

Rentetan `handlerCode` ialah **carian nama pengendali** — bukan kod boleh laksana. Pelaksana memetakannya melalui `skillExecutor.registerHandler(name, fn)` (`executor.ts:25`). Pemasangan marketplace menyimpan teks SKILL.md dalam medan ini sebagai dokumentasi dan menghalakan pelaksanaan melalui panggilan alat yang dijana model. Sumber sewenang-wenangnya yang dibekalkan pengguna tidak dinilai dengan eval.

## Alat MCP

Empat alat MCP membalut permukaan kemahiran (`open-sse/mcp-server/tools/skillTools.ts`). Alat-alat ini didaftarkan secara automatik apabila pelayan MCP dimulakan.

| Alat                          | Penerangan                                                           |
| ----------------------------- | -------------------------------------------------------------------- |
| `omniroute_skills_list`       | Senaraikan kemahiran, penapis pilihan: `apiKeyId`, `name`, `enabled` |
| `omniroute_skills_enable`     | Dayakan/nyahdayakan kemahiran mengikut `skillId`                     |
| `omniroute_skills_execute`    | Laksanakan kemahiran dengan muatan input                             |
| `omniroute_skills_executions` | Sejarah pelaksanaan terkini (lalai 50, maksimum 100)                 |

Lihat [MCP-SERVER.md](./MCP-SERVER.md) untuk persediaan pengangkutan dan penetapan skop.

---

## Penyepaduan A2A

`src/lib/skills/a2a.ts` mengeksport pemerihal kemahiran A2A `memory_aware_routing` dan pembantu `registerA2ASkill(registry)`. Kemahiran A2A tersuai ditempatkan dalam `src/lib/a2a/skills/` dan dihantar melalui `A2A_SKILL_HANDLERS` (`src/lib/a2a/taskExecution.ts`). Lihat [A2A-SERVER.md](./A2A-SERVER.md) untuk kitaran hayat tugas yang lengkap.

---

## Menambah Kemahiran Terbina Dalam Baharu

1. **Takrifkan pengendali** dalam `src/lib/skills/builtins.ts` (atau fail setara di bawah `src/lib/skills/builtin/`). Tandatangan: `(input, { apiKeyId, sessionId }) => Promise<output>`.
2. **Laluan kod berkotak pasir?** Panggil `sandboxRunner.run(image, command, env, sandboxConfig({...}))`. Gunakan `normalizeImage()` terhadap senarai yang dibenarkan.
3. **Laluan sistem fail?** Sentiasa lalukan melalui `resolveWorkspacePath(input, context)` sebelum mengakses cakera.
4. **Panggilan rangkaian?** Gunakan `safeOutboundFetch` dengan `guard: "public-only"`; bersihkan pengepala melalui `sanitizeHeaders()`.
5. **Daftarkan** dengan menambahkan entri pada `builtinSkills` (atau memanggil gaya `registerBrowserSkill(executor)` semasa permulaan).
6. **Sambungkan alias alat terbina dalam** (pilihan) dalam `BUILTIN_TOOL_ALIASES` (`interception.ts:23`) jika model huluan mengeluarkan nama yang berbeza.
7. **Ujian** dalam `src/lib/skills/__tests__/` (Vitest).

---

## Menambah Kemahiran Tersuai (Bukan Terbina Dalam)

1. Daftarkan pengendali semasa proses dimulakan:
   ```ts
   skillExecutor.registerHandler("my-handler", async (input, ctx) => { ... });
   ```
2. Masukkan kemahiran melalui `POST /api/skills/install` (medan `handlerCode` mesti sepadan dengan nama pengendali yang didaftarkan).
3. Tukar `mode` kepada `on` atau `auto` melalui `PUT /api/skills/[id]`.

---

## Petua Operasi

- **Suis induk:** `settings.skillsEnabled = false` menyekat semua pelaksanaan dan mengembalikan HTTP `503` pada `/api/skills/executions`. Daftar terus dimuatkan.
- **Sekat keluar rangkaian:** biarkan `SKILLS_SANDBOX_NETWORK_ENABLED` tidak ditetapkan (lalai) untuk pengkotakpasiran yang terasing sepenuhnya daripada rangkaian. `networkEnabled: true` bagi setiap panggilan masih memerlukan get induk.
- **Benarkan imej tertentu:** tetapkan `SKILLS_ALLOWED_SANDBOX_IMAGES="myorg/sandbox:1.0,node:22-alpine"` untuk memperluas senarai yang dibenarkan.
- **Audit pelaksanaan:** `/dashboard/skills/executions` dan `omniroute_skills_executions` kedua-duanya menanyakan `skill_executions`. Larian yang berjaya menyertakan `durationMs`; kegagalan menyertakan `errorMessage`.
- **Pembatalan cache:** panggil `skillRegistry.invalidateCache()` selepas pengeditan DB secara manual; jika tidak, tunggu 60 s.
- **Ruang kerja tanpa nama:** apabila `apiKeyId` kosong, semua panggilan dicincang kepada ruang kerja `"anonymous"` yang sama — kod yang mengambil kira perkongsian hendaklah sentiasa menghantar kunci sebenar.

---

## Kitaran Hayat Pelaksanaan (v3.8.16+)

`SkillExecutor` (`src/lib/skills/executor.ts`) ialah **singleton** yang mengurus setiap pemanggilan kemahiran. Memahami kitaran hayatnya amat penting untuk menyahpepijat tamat masa, percubaan semula dan keadaan pelaksanaan.

### Kitaran Hayat 5 Peringkat

```
   execute() dipanggil
        │
        ▼
  ┌─────────────┐
  │  PENDING    │  ← dibariskan, belum dimulakan (baris DB dicipta)
  └──────┬──────┘
         │ mulakan pengendali
         ▼
  ┌─────────────┐
  │  RUNNING    │  ← pengendali dipanggil dengan tamat masa
  └──────┬──────┘
         │
    ┌────┴────┬──────────┬──────────┐
    │         │          │          │
    ▼         ▼          ▼          ▼
  SUCCESS   ERROR     TIMEOUT   (tiada laluan lain — dihentikan oleh induk)
    │         │          │
    └────┬────┴──────────┘
         │
         ▼
   Baris DB dikemas kini dengan status, output, durationMs
```

### Konfigurasi Lalai

| Tetapan      | Lalai         | Boleh dikonfigurasikan melalui       |
| ------------ | ------------- | ------------------------------------ |
| `timeout`    | `30000` (30s) | `skillExecutor.setTimeout(ms)`       |
| `maxRetries` | `3`           | `skillExecutor.setMaxRetries(count)` |

> **Penting**: Pelaksana ialah singleton — memanggil `setTimeout()` mempengaruhi semua pemanggilan seterusnya secara global. Tamat masa bagi setiap kemahiran tidak disokong pada masa ini; jika anda memerlukan tamat masa yang berbeza bagi setiap kemahiran, hantar proses yang berasingan atau cabangkan pelaksana.

### Nilai Status

Daripada `src/lib/skills/types.ts`:

```ts
enum SkillStatus {
  PENDING = "pending", // Dibariskan, belum dimulakan
  RUNNING = "running", // Pengendali dipanggil
  SUCCESS = "success", // Pengendali mengembalikan output yang sah
  ERROR = "error", // Pengendali melontarkan pengecualian
  TIMEOUT = "timeout", // Melebihi tamat masa pelaksana
}
```

> **Nota**: Status `TIMEOUT` ditakrifkan dalam enum tetapi **sebenarnya tidak ditulis ke DB** oleh pelaksanaan pelaksana semasa — tamat masa muncul sebagai `ERROR` dengan mesej `"Skill execution timed out"`. Enum status tersebut dikhaskan untuk kegunaan masa hadapan.

### Memeriksa Pelaksanaan

```ts
import { skillExecutor } from "omniroute/skills/executor";

// Dapatkan pelaksanaan tertentu mengikut ID
const exec = skillExecutor.getExecution("exec-uuid-123");
if (exec) {
  console.log(`${exec.skillName}: ${exec.status} in ${exec.durationMs}ms`);
}

// Senaraikan pelaksanaan terkini untuk kunci API
const recent = skillExecutor.listExecutions("api-key-id", 50, 0);
for (const e of recent) {
  console.log(`${e.skillName} → ${e.status} (${e.durationMs}ms)`);
}

// Kira jumlah pelaksanaan
const total = skillExecutor.countExecutions("api-key-id");
```

### Tingkah Laku Percubaan Semula

Tetapan `maxRetries` disimpan tetapi **tidak digunakan pada masa ini** oleh kaedah `execute()` milik pelaksana — kaedah tersebut hanya melakukan satu percubaan. Nilai `maxRetries` didedahkan untuk pelaksanaan masa hadapan dan untuk cangkuk yang mahu membacanya.

Buat masa ini, percubaan semula mesti dilaksanakan dalam pengendali kemahiran itu sendiri. Kemahiran
terbina dalam didaftarkan dengan pelaksana (cth. `registerBuiltinSkills(executor)`
/ `registerBrowserSkill(executor)` dalam `src/lib/skills/builtin/`); mana-mana pengendali
yang anda daftarkan boleh membalut gelung percubaan semulanya sendiri:

```ts
// dalam pengendali kemahiran
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

## SkillMode Secara Terperinci

Enum `SkillMode` (`src/lib/skills/types.ts`) mengawal **bila dan bagaimana** kemahiran dipanggil:

```ts
enum SkillMode {
  AUTO = "auto", // LLM menentukan masa untuk memanggil kemahiran
  MANUAL = "manual", // Hanya dipanggil melalui permintaan pengguna yang eksplisit
  HYBRID = "hybrid", // Penskoran AUTO + penggantian manual
}
```

> **Nota**: Pangkalan kod mentakrifkan `SkillMode` (AUTO/MANUAL/HYBRID), manakala medan `Skill.mode` menggunakan bentuk yang berbeza (`"on" | "off" | "auto"`). Kedua-duanya berkaitan tetapi tidak sama — `SkillMode` adalah untuk dasar pelaksana, manakala `Skill.mode` adalah untuk pengaktifan setiap kemahiran.

### Masa untuk Menggunakan Setiap Mod

| Mod      | Tingkah laku LLM                                                                                          | Kes penggunaan                                                  |
| -------- | --------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `AUTO`   | LLM boleh memanggil kemahiran apabila dianggap perlu                                                      | Kemahiran kegunaan umum (membaca fail, permintaan HTTP)         |
| `MANUAL` | LLM tidak boleh memanggil kemahiran; hanya panggilan API `executeSkill` yang eksplisit boleh memanggilnya | Operasi sensitif (menulis ke pangkalan data, pembayaran)        |
| `HYBRID` | LLM boleh mencadangkan kemahiran; pengguna mesti mengesahkannya                                           | Kemahiran yang mempunyai kesan sampingan tetapi tidak berbahaya |

### Penskoran AUTO

Apabila mod `AUTO` aktif, setiap kemahiran calon diberikan skor berdasarkan konteks
permintaan oleh `scoreAutoSkill()` dalam `src/lib/skills/injection.ts` — sebuah sistem
mata integer aditif (padanan nama kemahiran, pertindihan token nama/tag/perihalan,
petunjuk sebab latar belakang, bonus/penalti petunjuk penyedia). Sebanyak
`AUTO_MAX_SKILLS = 5` kemahiran teratas dengan `score >= AUTO_MIN_SCORE = 3` disuntik sebagai
alat yang boleh dipanggil, dengan skor seri ditentukan oleh `installCount` kemudian nama. Lihat jadual mata penuh
dalam [**Penjanaan Skema Alat → Penskoran AUTO**](#auto-scoring) yang terdahulu dalam
dokumen ini; tiada ambang apungan gaya `0.6` dan tiada penskoran `registry.ts`.

---

## Katalog Kemahiran Terbina Dalam

OmniRoute disertakan dengan set kemahiran terbina dalam yang dipilih susun dalam `src/lib/skills/builtin/`. Antara yang paling lazim:

### Kemahiran Automasi Pelayar

Kemahiran pelayar (`src/lib/skills/builtin/browser.ts`) menyediakan automasi pelayar tanpa kepala melalui Playwright/Puppeteer. **Ia telah dilaksanakan tetapi tidak disertakan dalam katalog kemahiran lalai** — untuk menggunakannya, pasang pemalam sambungan pelayar secara berasingan.

```ts
// Aktifkan dalam konfigurasi anda
const config: SkillConfig = {
  enabled: true,
  mode: SkillMode.MANUAL, // Sentiasa perlukan pemanggilan eksplisit
  allowedSkills: ["browser"],
  timeout: 60000, // 60s untuk pemuatan halaman
  maxRetries: 1,
};
```

### Kategori Terbina Dalam Lain

| Kategori        | Kemahiran                                             | Mod    |
| --------------- | ----------------------------------------------------- | ------ |
| I/O Fail        | `file_read`, `file_write`                             | AUTO   |
| HTTP            | `http_request`                                        | AUTO   |
| Carian          | `web_search`                                          | AUTO   |
| Pelaksanaan Kod | `eval_code` (JavaScript/Python dalam kotak pasir)     | HYBRID |
| Sistem          | `execute_command` (pelaksanaan CLI dalam kotak pasir) | MANUAL |

### Menambahkan Kemahiran Tersuai

Lihat [SDK Pemalam & Penyepaduan Kemahiran](./PLUGIN_SDK.md) untuk mengetahui cara menambahkan kemahiran tersuai melalui sistem pemalam.

---

## Lihat Juga

- [MCP-SERVER.md](./MCP-SERVER.md) — pendaftaran alat dan pengangkutan MCP
- [A2A-SERVER.md](./A2A-SERVER.md) — kitar hayat tugas dan penghantaran kemahiran A2A
- [USER_GUIDE.md](../guides/USER_GUIDE.md#-skills-system) — pengenalan untuk pengguna
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — saluran pemprosesan permintaan dan peta komponen
- Sumber: `src/lib/skills/`, `src/app/api/skills/`, `open-sse/mcp-server/tools/skillTools.ts`
- Ujian: `src/lib/skills/__tests__/integration.test.ts`
