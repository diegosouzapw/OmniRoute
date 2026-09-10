# CLI-INTEGRATIONS (Bahasa Indonesia)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

---

title: "Integrasi CLI — arahkan CLI pengkodean ke OmniRoute"
version: 3.8.50
lastUpdated: 2026-08-18
---

# Integrasi CLI

OmniRoute menyediakan serangkaian perintah `setup-*` yang mengonfigurasi CLI pengkodean
(Codex, Claude Code, OpenCode, Cline, …) untuk menggunakan OmniRoute sebagai backend-nya — sehingga
alat tersebut berbicara ke **satu** endpoint dan OmniRoute mengarahkan ke penyedia yang tepat dengan
fallback otomatis. Setiap perintah membaca katalog model **langsung** dari OmniRoute yang berjalan
(lokal atau jarak jauh) dan menulis file konfigurasi alat itu sendiri di **mesin Anda**. Kunci API dirujuk oleh variabel lingkungan di mana pun alat tersebut mendukungnya. Perintah yang mempertahankan file lingkungan lokal alat dicatat di bawah.

Ada juga peluncur generik — `omniroute run <target>` — yang memunculkan
`claude`, `codex`, `aider`, `goose`, `opencode`, `qwen` atau `gemini` dengan
lingkungan yang tepat disuntikkan, tanpa menulis konfigurasi sama sekali. Target dan aliasnya berasal dari manifest kanonik `bin/cli/cli-manifest.mjs`
(`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`,
`open-code`, `qwen-code`, `gemini-cli`), dan `omniroute completion` menawarkan
kata target yang sama yang berasal dari manifest. Peluncur per-alat yang lama —
`omniroute launch` (Claude Code) dan `omniroute launch-codex` (Codex) — tetap
tersedia.

Onboarding penyedia tersedia dari konteks lokal/remote yang sama. Perintah
API-first di bawah ini menjaga otentikasi manajemen terpisah dari kredensial penyedia
dan tidak pernah mencetak kredensial dalam output terstruktur:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

Untuk skrip, lebih baik menggunakan `--credential-stdin` atau `--credential-env`; `--credential`
dipertahankan untuk penggunaan lokal yang terkontrol. `providers remove` memerlukan `--yes` pada terminal
non-interaktif, dan semua lima perintah menghormati konteks aktif atau opsi global `--base-url`/`--api-key`.

Untuk pengaturan dasar satu kali yang ditulis tangan dari dua integrasi terkaya, lihat
penjelasan mendalam per-alat:

- [Konfigurasi Claude Code](./CLAUDE-CODE-CONFIGURATION.md)
- [Konfigurasi Codex CLI](./CODEX-CLI-CONFIGURATION.md)
- [Mode Jarak Jauh](./REMOTE-MODE.md) — mengendalikan OmniRoute jarak jauh (VPS / Tailnet) dari laptop Anda
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — ekstensi OmniCopilot; ini juga dapat menjalankan perintah
  `setup-*` ini untuk Anda dari dalam editor

---

## Tabel Master

Setiap perintah menghormati **konteks aktif** (diatur dengan `omniroute connect`, lihat
[Mode Jarak Jauh](./REMOTE-MODE.md)) atau bendera eksplisit `--remote <url> --api-key <key>`.
"Local vs remote" di bawah ini berarti: tanpa bendera, itu menargetkan `http://localhost:20128`;
dengan `--remote` (atau konteks jarak jauh yang aktif) itu mengambil katalog dari server tersebut dan menulis konfigurasi secara lokal.

| Perintah                   | Alat                                | Apa yang ditulis                                                                                                                                                                          | Bendera kunci                                                                                                                              | Local vs remote |
| -------------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | --------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI                    | `~/.codex/<name>.config.toml` — satu profil per model teks yang kompatibel (`codex --profile <name>`)                                                                                     | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | Keduanya        |
| `omniroute setup-claude`   | Claude Code                         | `~/.claude/profiles/<name>/settings.json` — satu profil per model yang cocok (`CLAUDE_CONFIG_DIR`)                                                                                        | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | Keduanya        |
| `omniroute setup-opencode` | OpenCode (kompatibel dengan openai) | `~/.config/opencode/opencode.json` — penyedia `omniroute` dengan setiap model katalog (`opencode -m omniroute/<model>`)                                                                   | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | Keduanya        |
| `omniroute setup-cline`    | Cline                               | `~/.cline/data/{globalState,secrets}.json` (mode CLI) + mencetak pengaturan ekstensi VS Code                                                                                              | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | Keduanya        |
| `omniroute setup-kilo`     | Kilo Code                           | `~/.local/share/kilo/auth.json` (CLI) + menggabungkan `kilocode.*` ke dalam `settings.json` VS Code jika ada                                                                              | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | Keduanya        |
| `omniroute setup-continue` | Continue / `cn` CLI                 | `~/.continue/config.yaml` — model `provider: openai`, kunci melalui `${{ secrets.OMNIROUTE_API_KEY }}`                                                                                    | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Keduanya        |
| `omniroute setup-cursor`   | Cursor                              | Tidak ada — mencetak langkah-langkah dalam aplikasi (konfigurasi Cursor tidak transparan SQLite)                                                                                          | `--remote` `--api-key` `--only` `--port`                                                                                                   | Keduanya        |
| `omniroute setup-roo`      | Roo Code                            | `~/.omniroute/roo-settings.json` (dokumen impor) + mengatur `roo-cline.autoImportSettingsPath` jika ada `settings.json` VS Code                                                           | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | Keduanya        |
| `omniroute setup-crush`    | Crush                               | `~/.config/crush/crush.json` — penyedia `openai-compat`, kunci melalui `$OMNIROUTE_API_KEY`                                                                                               | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Keduanya        |
| `omniroute setup-goose`    | Goose                               | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + mencetak resep env                                                                                         | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Keduanya        |
| `omniroute setup-aider`    | Aider                               | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + mencetak resep env                                                                                                       | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Keduanya        |
| `omniroute setup-qwen`     | Qwen Code                           | `~/.qwen/settings.json` — array `modelProviders.openai` V4 + `OMNIROUTE_API_KEY` di `~/.qwen/.env`                                                                                        | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | Keduanya        |
| `omniroute run <target>`   | Peluncuran runtime (generik)        | Tidak ada — memunculkan `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini` dengan lingkungan dan argumen yang tepat; Qwen dan Gemini menggunakan rumah sementara yang terisolasi | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | Keduanya        |
| `omniroute launch`         | Claude Code                         | Tidak ada — memunculkan `claude` dengan `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN` disuntikkan                                                                                           | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | Keduanya        |
| `omniroute launch-codex`   | OpenAI Codex CLI                    | Tidak ada — memunculkan `codex` dengan penyedia `omniroute` disuntikkan melalui bendera `-c`                                                                                              | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | Keduanya        |

Catatan tentang bendera (diverifikasi dalam sumber perintah):

- `--remote <url>` — mengambil katalog dari OmniRoute jarak jauh (mengganti `--port`
  dan konteks aktif). `--api-key <key>` menyediakan kredensial untuk server tersebut
  (default ke variabel lingkungan `OMNIROUTE_API_KEY`, atau token konteks aktif).
- `--only <patterns>` — substring yang dipisahkan koma; hanya menyimpan ID model yang cocok
  (misalnya `--only glm,kimi`). Tersedia pada `setup-codex`, `setup-claude`,
  `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`.
- `--dry-run` — mencetak persis apa yang akan ditulis tanpa menyentuh
  sistem file. Tersedia pada setiap perintah `setup-*` **kecuali** `setup-cursor`
  (yang tidak pernah menulis file).
- `--model <id>` — diperlukan (atau dipilih secara interaktif) untuk alat yang tidak memiliki
  penemuan model otomatis: Cline, Kilo, Roo, Goose, Qwen, Aider. Alat-alat tersebut
  juga menerima `--yes` untuk eksekusi non-interaktif (yang kemudian memerlukan `--model`).
  `setup-opencode` mengambil `--model` untuk mengatur model tingkat atas default.
- `--model <id>` pada `omniroute run` mengikuti pengkabelan per-target dari manifest
  (`bin/cli/cli-manifest.mjs`): **aider** menerima `--model openai/<id>` dan
  **opencode** `--model omniroute/<id>` (awalan hanya ditambahkan ketika id
  tidak sudah membawanya); **qwen** dan **gemini** menerima id apa adanya;
  **claude** mendapatkannya melalui `ANTHROPIC_MODEL`, **goose** melalui `GOOSE_MODEL`, dan
  **codex** melalui argumen `-c model_providers.omniroute.*`. **Qwen adalah satu-satunya target run
  yang secara keras memerlukan `--model`** — `omniroute run qwen` tanpa itu keluar
  `2` dengan kesalahan eksplisit.
- `--port <port>` — port OmniRoute lokal (default `20128`, diabaikan saat `--remote`
  diatur). Tersedia pada semua `setup-*` dan kedua peluncur.
- Kode keluar `omniroute run`: kode keluar CLI anak disebarkan
  apa adanya; `2` = argumen tidak valid (target tidak didukung, `--model` yang diperlukan hilang, penjaga kontainer); `127` = biner target tidak ada di `PATH`;
  `130`/`143`/`129` ketika peluncuran diakhiri oleh `SIGINT`/`SIGTERM`/`SIGHUP`;
  `1` = kegagalan peluncuran runtime lainnya.
- Kedua peluncur (`launch`, `launch-codex`) menerima `--profile <name>` untuk memilih
  profil yang ditulis oleh `setup-claude` / `setup-codex`, plus argumen pass-through untuk
  biner `claude` / `codex` yang mendasarinya.

Pemilih interaktif juga dibagikan oleh resep pengaturan:

```bash
# Pilih dari katalog model lokal atau jarak jauh yang aktif dan konfigurasikan target.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

`configure` saat ini mendelegasikan ke resep yang diuji untuk `codex`, `claude`,
`opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, dan `kilo`. Entri katalog yang hanya untuk IDE,
MITM, dan panduan tetap menjadi alur `setup-*`/manual yang eksplisit dan
tidak disajikan sebagai target yang dapat diluncurkan.

> `setup-opencode` adalah integrasi OpenCode **ringan yang kompatibel dengan openai**.
> Ada juga integrasi plugin yang lebih kaya — `omniroute setup opencode` — yang
> menginstal `@omniroute/opencode-plugin`. Mereka adalah perintah yang berbeda; tabel
> di atas mendokumentasikan `setup-opencode`.

---

## Penggunaan lokal

Dengan OmniRoute berjalan di `localhost:20128`, cukup jalankan perintah setup untuk alat Anda. Katalog diambil dari server lokal.

```bash
# Codex: tulis profil per model yang cocok ke ~/.codex/
omniroute setup-codex
codex --profile glm52            # gunakan profil yang dihasilkan

# Claude Code: tulis profil per model, lalu luncurkan satu
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: tulis penyedia yang kompatibel dengan openai dengan semua model katalog
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # dirujuk melalui {env:OMNIROUTE_API_KEY}, tidak pernah di disk
opencode -m omniroute/glm/glm-5.2 "..."

# Alat tanpa penemuan otomatis memerlukan model eksplisit:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# Prabaca tanpa menulis apa pun:
omniroute setup-continue --dry-run
```

Luncurkan tanpa menulis konfigurasi sama sekali (hanya injeksi-env):

```bash
omniroute launch                 # Claude Code → OmniRoute lokal
omniroute launch-codex           # Codex CLI → OmniRoute lokal
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# Jalur perintah eksplisit: lewati apa pun yang datang setelah --
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## Penggunaan jarak jauh

Arahkan perintah setup apa pun ke OmniRoute jarak jauh dengan `--remote` + `--api-key`. Katalog diambil dari jarak jauh; konfigurasi ditulis di mesin lokal Anda.

```bash
# OpenCode terhadap VPS jarak jauh, simpan hanya model glm/kimi
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # ekspor OMNIROUTE_API_KEY terlebih dahulu

# Profil Codex dari katalog jarak jauh
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# Luncurkan CLI langsung terhadap jarak jauh
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

Alih-alih melewatkan `--remote`/`--api-key` setiap kali, masuk sekali dan biarkan **konteks aktif** menyediakannya secara otomatis:

```bash
omniroute connect 192.168.0.15        # membuat token terikat, menyimpan konteks
omniroute setup-codex                 # ← sekarang menggunakan katalog jarak jauh
omniroute setup-opencode              # ← sama
omniroute launch                      # ← Claude Code terhadap jarak jauh
```

Lihat [Mode Jarak Jauh](./REMOTE-MODE.md) untuk konteks, cakupan, dan manajemen token.

---

## Konvensi URL Dasar (alat mana yang menginginkan `/v1`)

OmniRoute mengekspos permukaan OpenAI di `/v1`, permukaan Anthropic di root, dan permukaan Gemini asli di `/v1beta`. Setiap integrasi terhubung ke bentuk yang diharapkan alatnya (diverifikasi dalam sumber perintah):

| Integrasi                                                                  | URL Dasar yang ditulis | `/v1`?                                             |
| -------------------------------------------------------------------------- | ---------------------- | -------------------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | root                   | Tidak — Cline menambahkan `/v1/chat/completions`   |
| `setup-goose` (`OPENAI_HOST`)                                              | root                   | Tidak — Goose menambahkan jalur                    |
| `setup-aider` (`OPENAI_API_BASE`)                                          | root                   | Tidak — LiteLLM menambahkan `/v1/chat/completions` |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | dengan `/v1`           | Ya                                                 |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | root                   | Tidak — Claude Code menambahkan `/v1/messages`     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | dengan `/v1`           | Ya                                                 |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | dengan `/v1`           | Ya                                                 |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | root                   | Tidak — SDK menambahkan `/v1beta/models/…`         |

---

## Menjaga dependensi native saat pembaruan: `--include=optional`

Saat Anda memperbarui dengan `omniroute update` (setelah mengonfirmasi, atau dengan `--apply`),
OmniRoute menjalankan instalasi dengan `--include=optional` yang sudah terintegrasi:

```bash
npm install -g omniroute@latest --include=optional
```

Ini **bukan** sebuah flag yang Anda berikan ke `omniroute update` — ini selalu diterapkan oleh
updater. Ini menjamin bahwa `optionalDependencies` (`better-sqlite3`, `keytar`,
`tls-client`, tumpukan LLMLingua SLM) bertahan setelah pembaruan meskipun konfigurasi npm Anda
memiliki `omit=optional` yang akan secara diam-diam menghapus driver SQLite native
dan binding OS-keyring. Untuk melihat perintah yang tepat tanpa menerapkannya:

```bash
omniroute update --dry-run
# [DRY RUN] Akan menjalankan: npm install -g omniroute@latest --include=optional
```

Flag `omniroute update` lainnya (terverifikasi dalam sumber): `--check` (keluar 1 jika
kadaluwarsa), `--apply` (instal tanpa meminta), `--changelog`, `--no-backup`,
`--yes`.

---

## Google Gemini CLI melalui `omniroute run gemini`

Kontrak diverifikasi terhadap `@google/gemini-cli` 0.50.0: CLI menghormati
`GOOGLE_GEMINI_BASE_URL` dan mengeluarkan `POST /v1beta/models/<model>:generateContent`
(dan `:streamGenerateContent?alt=sse`) terhadapnya — persis seperti permukaan
Gemini native OmniRoute (`/v1beta`). `omniroute run gemini` menghubungkan itu secara otomatis:

- `GOOGLE_GEMINI_BASE_URL` → URL dasar OmniRoute yang aktif (root, tanpa `/v1`);
- `GEMINI_API_KEY` → kredensial OmniRoute yang terpecahkan (opsi/env/konteks);
- **sebuah `GEMINI_CLI_HOME` yang terisolasi sementara** yang `.gemini/settings.json`
  memilih otentikasi `gemini-api-key`, sehingga sesi Google OAuth yang disimpan (Code Assist)
  tidak pernah menggantikan peluncuran yang diarahkan oleh OmniRoute — dihapus setelah keluar;
- **kebersihan env**: lingkungan anak dibersihkan dari `GOOGLE_API_KEY`,
  `GOOGLE_GENAI_USE_VERTEXAI` dan `GOOGLE_GENAI_USE_GCA` (yang akan mengalihkan
  otentikasi ke Vertex/Code Assist), dan `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key` diatur
  sebagai cadangan — target `run` lainnya mendapatkan perlakuan yang sama untuk variabel yang
  bertentangan;
- injeksi `--model <id>` dari `--provider`/`--model`.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Pengaman kepercayaan workspace Gemini masih berlaku dalam mode headless — berikan
`--skip-trust` (atau percayakan direktori secara interaktif) sendiri; peluncur
dengan sengaja tidak melewatinya. Peluncur ini berbeda dari **registrasi ACP**
(`src/lib/acp/registry.ts`, `gemini --acp`), yang tetap menjadi
integrasi protokol agen untuk `/dashboard/acp-agents`.

---

## Pembersihan asap nyata (opt-in)

Regresi rencana peluncuran deterministik berjalan di CI (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). Untuk memvalidasi biner REAL terhadap server
OmniRoute yang REAL, terdapat harness opt-in di
`tests/integration/upstream-cli-smoke.int.test.ts`. Ini tidak pernah berjalan secara otomatis
(setiap sub-tes dilewati kecuali `RUN_CLI_SMOKE=1`), meneruskan kredensial melalui variabel-env
NAMA (tidak pernah melalui nilai), menyensor string berbentuk kunci dari output yang tercatat,
melewati target yang biner-nya tidak terinstal, dan mengklasifikasikan kegagalan sebagai
otentikasi / upstream / konfigurasi alih-alih boolean kosong:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

Opsional: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` membatasi pembersihan;
`OMNIROUTE_SMOKE_TIMEOUT_MS` menggantikan batas waktu 120 detik per-target.

---

## Lihat juga

- [Konfigurasi Claude Code](./CLAUDE-CODE-CONFIGURATION.md) — panduan mendalam tentang Claude Code
- [Konfigurasi Codex CLI](./CODEX-CLI-CONFIGURATION.md) — pengaturan dasar `[model_providers.omniroute]` sekali saja
- [Mode Jarak Jauh](./REMOTE-MODE.md) — konteks, token akses terbatas, mengendalikan server jarak jauh
- [Referensi Alat CLI](../reference/CLI-TOOLS.md) — katalog lengkap alat yang didukung + halaman dasbor
- [Panduan Pengaturan](./SETUP_GUIDE.md) — metode instalasi dan onboarding saat pertama kali menjalankan
