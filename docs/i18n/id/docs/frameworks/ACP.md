# ACP (Agent Client Protocol) (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

> **TL;DR**: ACP memungkinkan OmniRoute menjalankan agen CLI (seperti Claude Code, Codex) sebagai proses anak, alih-alih menggunakan API HTTP. Ini menyediakan mekanisme transportasi "CLI-sebagai-backend".

---

## Apa Itu ACP?

ACP (Agent Client Protocol) adalah mekanisme transportasi **"CLI-sebagai-backend"** untuk OmniRoute. Alih-alih mencegat panggilan API HTTP ke penyedia AI, ACP **menjalankan agen CLI sebagai proses anak** dan mengirimkan prompt melalui antarmuka native mereka.

### Mengapa Menggunakan ACP?

| Manfaat                        | Deskripsi                                          |
| ------------------------------ | -------------------------------------------------- |
| **Tidak memerlukan kunci API** | Menggunakan autentikasi CLI Anda yang sudah ada    |
| **Protokol native**            | Menggunakan format input/output native setiap CLI  |
| **Penemuan otomatis**          | Mendeteksi CLI yang terinstal di sistem Anda       |
| **15 agen bawaan**             | Telah dikonfigurasi untuk alat CLI populer         |
| **Agen kustom**                | Tambahkan alat CLI Anda sendiri melalui pengaturan |
| **Manajemen proses**           | Menangani siklus hidup (jalankan, kirim, hentikan) |

---

## Agen CLI yang Didukung

ACP langsung mendukung **15 agen CLI bawaan**:

| ID Agen       | Nama Tampilan      | Biner         | Protokol |
| ------------- | ------------------ | ------------- | -------- |
| `codex`       | OpenAI Codex CLI   | `codex`       | stdio    |
| `claude`      | Claude Code CLI    | `claude`      | stdio    |
| `goose`       | Goose CLI          | `goose`       | stdio    |
| `openclaw`    | OpenClaw           | `openclaw`    | stdio    |
| `aider`       | Aider              | `aider`       | stdio    |
| `opencode`    | OpenCode           | `opencode`    | stdio    |
| `cline`       | Cline              | `cline`       | stdio    |
| `qwen`        | Qwen Code          | `qwen --acp`  | stdio    |
| `forge`       | ForgeCode          | `forge`       | stdio    |
| `amazon-q`    | Amazon Q Developer | `q`           | stdio    |
| `interpreter` | Open Interpreter   | `interpreter` | stdio    |
| `cursor-cli`  | Cursor CLI         | `cursor`      | stdio    |
| `warp`        | Warp AI            | `warp`        | stdio    |
| `gemini`      | Gemini CLI         | `gemini`      | stdio    |
| `zcode`       | ZCode              | `zcode`       | stdio    |

### Agen Kustom

Anda dapat menambahkan agen CLI Anda sendiri melalui pengaturan. Agen kustom mendukung fitur yang sama seperti agen bawaan.

---

## Mulai Cepat

### Langkah 1: Instal Agen CLI

```bash
# Contoh: Instal Claude Code CLI
npm install -g @anthropic-ai/claude-code

# Verifikasi instalasi
claude --version
```

### Langkah 2: Deteksi Otomatis ACP

ACP secara otomatis mendeteksi agen CLI yang terinstal di sistem Anda. Tidak diperlukan konfigurasi!

### Langkah 3: Gunakan Transportasi ACP

Setelah terdeteksi, ACP dapat digunakan sebagai mekanisme transportasi untuk penyedia apa pun yang didukung. OmniRoute akan secara otomatis menggunakan ACP ketika CLI tersedia.

---

## Cara Kerja ACP

### Arsitektur

```
┌─────────────────┐
│  OmniRoute      │
│  (Proksi HTTP)  │
└────────┬────────┘
         │
         │ spawn()
         ▼
┌─────────────────┐
│  Proses Anak    │
│  (Agen CLI)     │
│                 │
│  stdin  ◄──────┤  Kirim prompt
│  stdout ──────►│  Terima respons
│  stderr ──────►│  Terima kesalahan
└─────────────────┘
```

### Siklus Hidup Proses

1. **Jalankan** — ACP membuat proses anak untuk agen CLI
2. **Kirim** — ACP menulis prompt ke stdin proses
3. **Terima** — ACP membaca respons dari stdout/stderr
4. **Deteksi Tidak Aktif** — ACP menunggu selama 2 detik tanpa aktivitas sebelum menganggap respons selesai
5. **Hentikan** — ACP menghentikan proses (SIGTERM, kemudian SIGKILL setelah 5 detik)

### Protokol Komunikasi

ACP menggunakan **stdio** (input/output standar) untuk berkomunikasi dengan agen CLI. Protokolnya adalah:

1. **Kirim prompt** — Tulis ke stdin dengan baris baru
2. **Tunggu respons** — Baca dari stdout hingga tidak aktif (tidak ada output selama 2 detik)
3. **Batas waktu** — Default 120 detik (dapat dikonfigurasi)

---

## Referensi API

### Fungsi Registry

#### `detectInstalledAgents()`

Mendeteksi semua agen CLI yang terinstal pada sistem. Hasil disimpan dalam cache selama 60 detik.

```typescript
import { detectInstalledAgents } from "@/lib/acp";

const agents = detectInstalledAgents();
// Mengembalikan: CliAgentInfo[]

interface CliAgentInfo {
  id: string; // misalnya, "codex", "claude"
  name: string; // Nama tampilan
  binary: string; // Nama biner yang akan dijalankan
  versionCommand: string; // Perintah pendeteksian versi
  version: string | null; // Versi yang terdeteksi (null jika tidak terinstal)
  installed: boolean; // Apakah agen terinstal
  providerAlias: string; // ID penyedia di OmniRoute
  spawnArgs: string[]; // Argumen yang diteruskan saat menjalankan
  protocol: "stdio" | "http"; // Protokol komunikasi
  isCustom?: boolean; // Apakah ini agen kustom yang ditentukan pengguna
}
```

#### `getAvailableAgents()`

Mendapatkan hanya agen yang terinstal dan tersedia untuk ACP.

```typescript
import { getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();
// Mengembalikan: CliAgentInfo[] (hanya agen yang terinstal)
```

#### `getAgentById(id)`

Mendapatkan agen tertentu berdasarkan ID.

```typescript
import { getAgentById } from "@/lib/acp";

const agent = getAgentById("claude");
// Mengembalikan: CliAgentInfo | undefined
```

#### `setCustomAgents(agents)`

Menetapkan definisi agen kustom dari pengaturan.

```typescript
import { setCustomAgents } from "@/lib/acp";

setCustomAgents([
  {
    id: "my-custom-cli",
    name: "My Custom CLI",
    binary: "mycli",
    versionCommand: "mycli --version",
    providerAlias: "my-provider",
    spawnArgs: [],
    protocol: "stdio",
  },
]);
```

### Fungsi Manager

#### `acpManager.spawn(agentId, binary, args, env)`

Menjalankan proses agen CLI baru.

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("claude", "claude", ["--print", "--output-format", "json"], {
  /* variabel lingkungan kustom */
});
// Mengembalikan: AcpSession
```

**ID agen yang diizinkan**: `["claude", "codex", "gemini", "qwen"]`

#### `acpManager.sendPrompt(sessionId, prompt, timeoutMs)`

Mengirim prompt ke agen CLI dan mengumpulkan responsnya.

```typescript
import { acpManager } from "@/lib/acp";

const response = await acpManager.sendPrompt(
  "acp-claude-1234567890-abc123",
  "What is 2+2?",
  120000 // batas waktu 2 menit
);
// Mengembalikan: Promise<string>
```

#### `acpManager.kill(sessionId)`

Menghentikan sesi dan melakukan pembersihan.

```typescript
import { acpManager } from "@/lib/acp";

const killed = acpManager.kill("acp-claude-1234567890-abc123");
// Mengembalikan: boolean
```

#### `acpManager.getActiveSessions()`

Mendapatkan semua sesi aktif.

```typescript
import { acpManager } from "@/lib/acp";

const sessions = acpManager.getActiveSessions();
// Mengembalikan: AcpSession[]
```

#### `acpManager.killAll()`

Menghentikan semua sesi.

```typescript
import { acpManager } from "@/lib/acp";

acpManager.killAll();
```

### Antarmuka Sesi

```typescript
interface AcpSession {
  id: string; // ID sesi unik
  agentId: string; // ID agen (misalnya, "claude")
  process: ChildProcess; // Handle proses anak
  alive: boolean; // Apakah proses masih berjalan
  stdoutBuffer: string; // Buffer stdout yang terakumulasi
  stderrBuffer: string; // Buffer stderr yang terakumulasi
  createdAt: Date; // Stempel waktu pembuatan
}
```

### Peristiwa

`AcpManager` memperluas `EventEmitter` dan memancarkan peristiwa berikut:

#### `stdout`

Dipancarkan ketika agen CLI menulis ke stdout.

```typescript
acpManager.on("stdout", ({ sessionId, data }) => {
  console.log(`[${sessionId}] stdout: ${data}`);
});
```

#### `stderr`

Dipancarkan ketika agen CLI menulis ke stderr.

```typescript
acpManager.on("stderr", ({ sessionId, data }) => {
  console.error(`[${sessionId}] stderr: ${data}`);
});
```

#### `exit`

Dipancarkan ketika proses agen CLI berhenti.

```typescript
acpManager.on("exit", ({ sessionId, code, signal }) => {
  console.log(`[${sessionId}] exited with code ${code}, signal ${signal}`);
});
```

#### `error`

Dipancarkan ketika proses agen CLI mengalami kesalahan.

```typescript
acpManager.on("error", ({ sessionId, error }) => {
  console.error(`[${sessionId}] error: ${error}`);
});
```

---

## Konfigurasi

### Variabel Lingkungan

ACP mewarisi semua variabel lingkungan dari proses induk dan dapat diperluas dengan variabel lingkungan khusus:

```typescript
acpManager.spawn("claude", "claude", [], {
  ANTHROPIC_API_KEY: "sk-...",
  DEBUG: "true",
});
```

### Argumen Spawn

Setiap agen memiliki argumen spawn default yang ditentukan dalam registri. Anda dapat menggantinya:

```typescript
acpManager.spawn("claude", "claude", ["--print", "--verbose"], {});
```

### Batas Waktu

Batas waktu prompt default adalah **120 detik** (2 menit). Anda dapat menggantinya:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 menit
```

### Cache Deteksi

Deteksi agen disimpan dalam cache selama **60 detik** untuk menghindari pemindaian sistem berkas yang mahal. Paksa penyegaran:

```typescript
import { refreshAgentCache } from "@/lib/acp";

refreshAgentCache();
```

---

## Keamanan

### Pencegahan Injeksi Perintah

ACP memvalidasi perintah versi untuk mencegah serangan injeksi perintah:

```typescript
const DISALLOWED_VERSION_COMMAND_CHARS = /[;&|<>`$\r\n]/;
```

Perintah versi yang berisi karakter berikut akan ditolak:

- `;` — Pemisah perintah
- `&` — Proses latar belakang
- `|` — Pipe
- `<`, `>` — Pengalihan
- `` ` `` — Substitusi perintah
- `$` — Ekspansi variabel
- `\r`, `\n` — Pemisah baris

### Validasi Nama Biner

ACP memvalidasi bahwa biner perintah versi cocok dengan nama biner yang diharapkan (kecuali jika merupakan agen khusus).

### Isolasi Proses

Setiap sesi ACP berjalan dalam proses anaknya sendiri. Proses dihentikan ketika sesi berakhir atau melewati batas waktu.

---

## Performa

### Performa Deteksi

- **Pemanggilan pertama**: ~50-200ms (menjalankan perintah `version` untuk setiap agen)
- **Pemanggilan yang disimpan dalam cache**: <1ms (dikembalikan dari cache)
- **TTL cache**: 60 detik

### Performa Prompt

- **Spawn**: ~50-100ms
- **Kirim prompt**: ~10-50ms
- **Tunggu respons**: Bergantung pada agen CLI (biasanya 1-30 detik)
- **Hentikan**: ~5 detik (SIGTERM) + seketika (SIGKILL)

### Penggunaan Sumber Daya

- **Memori per sesi**: ~10-50MB (bergantung pada agen CLI)
- **CPU**: Minimal (terikat I/O)
- **Disk**: Tidak ada

---

## Pemecahan Masalah

### Kesalahan "Unknown agent"

**Masalah**: `acpManager.spawn()` melempar `Unknown agent: <id>`

**Solusi**: Hanya agen berikut yang diizinkan dalam `spawn()`:

- `claude`
- `codex`
- `gemini`
- `qwen`

Agen lain harus dijalankan secara manual atau melalui definisi agen khusus.

### Kesalahan "Session not alive"

**Masalah**: `acpManager.sendPrompt()` melempar `Session ${sessionId} is not alive`

**Solusi**: Sesi mungkin telah berhenti atau dihentikan. Periksa status sesi:

```typescript
const session = acpManager.getSession(sessionId);
if (!session?.alive) {
  // Jalankan ulang sesi
  acpManager.spawn("claude", "claude", [], {});
}
```

### Kesalahan "ACP timeout"

**Masalah**: `acpManager.sendPrompt()` melempar `ACP timeout after 120000ms`

**Solusi**: Tingkatkan batas waktu:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 menit
```

### CLI Tidak Terdeteksi

**Masalah**: `detectInstalledAgents()` tidak menemukan CLI Anda

**Solusi**:

1. **Periksa PATH**: Pastikan CLI berada di PATH sistem Anda
2. **Periksa perintah versi**: Jalankan `claude --version` secara manual
3. **Periksa izin**: Pastikan CLI dapat dieksekusi
4. **Agen khusus**: Tambahkan definisi agen khusus untuk CLI nonstandar

### Izin Ditolak

**Masalah**: ACP tidak dapat mengeksekusi CLI

**Solusi**:

1. **Periksa izin berkas**: `chmod +x /usr/local/bin/claude`
2. **Periksa kepemilikan**: Pastikan OmniRoute memiliki izin baca/eksekusi
3. **Periksa SELinux/AppArmor**: Dapat memblokir pembuatan proses

---

## Contoh

### Contoh 1: Menjalankan dan Menggunakan Claude Code

```typescript
import { acpManager, detectInstalledAgents } from "@/lib/acp";

// Deteksi agen yang terinstal
const agents = detectInstalledAgents();
const claude = agents.find((a) => a.id === "claude");

if (claude?.installed) {
  // Jalankan sesi baru
  const session = acpManager.spawn("claude", claude.binary, ["--print", "--output-format", "json"]);

  // Kirim prompt
  const response = await acpManager.sendPrompt(
    session.id,
    "Explain quantum computing in 100 words"
  );

  console.log("Claude's response:", response);

  // Bersihkan
  acpManager.kill(session.id);
}
```

### Contoh 2: Penemuan Otomatis dengan Fallback

```typescript
import { acpManager, getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();

// Coba Claude terlebih dahulu, gunakan Codex sebagai fallback
let agentId = "claude";
if (!available.find((a) => a.id === "claude")) {
  if (available.find((a) => a.id === "codex")) {
    agentId = "codex";
  } else {
    throw new Error("No ACP-compatible CLI agent found");
  }
}

const agent = available.find((a) => a.id === agentId)!;
const session = acpManager.spawn(agentId, agent.binary, agent.spawnArgs);

const response = await acpManager.sendPrompt(session.id, "Hello!");

acpManager.kill(session.id);
```

### Contoh 3: Agen Kustom

```typescript
import { setCustomAgents, detectInstalledAgents } from "@/lib/acp";

// Daftarkan agen CLI kustom
setCustomAgents([
  {
    id: "my-llm-cli",
    name: "My LLM CLI",
    binary: "myllm",
    versionCommand: "myllm --version",
    providerAlias: "my-llm-provider",
    spawnArgs: ["--format", "json"],
    protocol: "stdio",
  },
]);

// Sekarang detectInstalledAgents() akan menyertakan "my-llm-cli"
const agents = detectInstalledAgents();
```

---

## Apa Selanjutnya?

- **[Referensi API](../reference/API_REFERENCE.md)** — Endpoint REST API
- **[Referensi Penyedia](../reference/PROVIDER_REFERENCE.md)** — Seluruh 352 penyedia
- **[Server MCP](./MCP-SERVER.md)** — Integrasi Model Context Protocol
- **[Server A2A](./A2A-SERVER.md)** — Protokol Agent-to-Agent
- **[Agen Cloud](./CLOUD_AGENT.md)** — Agen berbasis cloud

---

## Referensi

- [Proyek AionUi](https://github.com/iOfficeAI/AionUi) — Inspirasi untuk deteksi otomatis ACP
- [Kode Sumber ACP](../../src/lib/acp/) — Detail implementasi
  - `manager.ts` — Pengelolaan siklus hidup proses
  - `registry.ts` — Penemuan dan pendaftaran agen
  - `index.ts` — Ekspor API publik
