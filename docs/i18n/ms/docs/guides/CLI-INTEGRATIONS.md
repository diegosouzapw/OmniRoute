# CLI Integrations (Bahasa Melayu)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇪🇹 [am](../../../am/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇷 [el](../../../el/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇪 [et](../../../et/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇪 [ga](../../../ga/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ha](../../../ha/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇷 [hr](../../../hr/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇲 [hy](../../../hy/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ig](../../../ig/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇪 [ka](../../../ka/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇭 [km](../../../km/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [kn](../../../kn/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇹 [lt](../../../lt/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇻 [lv](../../../lv/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ml](../../../ml/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇹 [mt](../../../mt/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇲 [my](../../../my/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇵 [ne](../../../ne/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [or](../../../or/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [pa](../../../pa/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇰 [si](../../../si/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇮 [sl](../../../sl/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇸 [sr](../../../sr/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇿 [uz](../../../uz/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [yo](../../../yo/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

OmniRoute menyediakan keluarga perintah `setup-*` yang mengkonfigurasi CLI
pengekodan (Codex, Claude Code, OpenCode, Cline, …) untuk menggunakan OmniRoute sebagai bahagian belakangnya — supaya
alat tersebut berkomunikasi dengan **satu** titik akhir dan OmniRoute menghalakan permintaan kepada penyedia yang betul dengan
sandaran automatik. Setiap perintah membaca katalog model **langsung** daripada OmniRoute yang sedang berjalan
(setempat atau jauh) dan menulis fail konfigurasi alat itu sendiri pada mesin **anda**.
Kunci API dirujuk melalui pemboleh ubah persekitaran apabila alat tersebut
menyokongnya. Perintah yang menyimpan fail persekitaran setempat alat dinyatakan di bawah.

Terdapat juga pelancar generik — `omniroute run <target>` — yang melancarkan
`claude`, `codex`, `aider`, `goose`, `opencode`, `qwen` atau `gemini` dengan
persekitaran yang betul disuntik, tanpa menulis sebarang konfigurasi. Sasaran dan
aliasnya berasal daripada manifes kanonik `bin/cli/cli-manifest.mjs`
(`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`,
`open-code`, `qwen-code`, `gemini-cli`), dan `omniroute completion` menawarkan
perkataan sasaran yang sama, yang diperoleh daripada manifes. Pelancar khusus bagi setiap alat yang lama —
`omniroute launch` (Claude Code) dan `omniroute launch-codex` (Codex) — kekal
tersedia.

Penyertaan penyedia tersedia daripada konteks setempat/jauh yang sama. Perintah
yang mengutamakan API di bawah mengasingkan pengesahan pengurusan daripada kelayakan
penyedia dan tidak pernah mencetak kelayakan dalam output berstruktur:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

Untuk skrip, utamakan `--credential-stdin` atau `--credential-env`; `--credential`
dikekalkan untuk penggunaan setempat yang terkawal. `providers remove` memerlukan `--yes` pada
terminal bukan interaktif, dan kelima-lima perintah mematuhi konteks aktif atau
pilihan global `--base-url`/`--api-key`.

Untuk persediaan asas sekali sahaja yang ditulis secara manual bagi dua integrasi paling lengkap, lihat
penerangan terperinci bagi setiap alat:

- [Konfigurasi Claude Code](./CLAUDE-CODE-CONFIGURATION.md)
- [Konfigurasi Codex CLI](./CODEX-CLI-CONFIGURATION.md)
- [Mod Jauh](./REMOTE-MODE.md) — kendalikan OmniRoute jauh (VPS / Tailnet) daripada komputer riba anda
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — sambungan OmniCopilot; ia juga boleh menjalankan perintah
  `setup-*` ini untuk anda dari dalam penyunting

---

## Jadual induk

Setiap perintah mematuhi **konteks aktif** (ditetapkan dengan `omniroute connect`, lihat
[Mod Jauh](./REMOTE-MODE.md)) atau bendera `--remote <url> --api-key <key>` yang dinyatakan secara eksplisit.
"Setempat berbanding jauh" di bawah bermaksud: tanpa bendera, ia menyasarkan `http://localhost:20128`;
dengan `--remote` (atau konteks jauh yang aktif), ia mengambil katalog daripada
pelayan tersebut dan menulis konfigurasi secara setempat.

| Perintah                   | Alat                         | Perkara yang ditulisnya                                                                                                                                                                     | Bendera utama                                                                                                                              | Setempat lwn jauh |
| -------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ----------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI             | `~/.codex/<name>.config.toml` — satu profil bagi setiap model teks yang serasi (`codex --profile <name>`)                                                                                   | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | Kedua-duanya      |
| `omniroute setup-claude`   | Claude Code                  | `~/.claude/profiles/<name>/settings.json` — satu profil bagi setiap model yang sepadan (`CLAUDE_CONFIG_DIR`)                                                                                | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | Kedua-duanya      |
| `omniroute setup-opencode` | OpenCode (serasi openai)     | `~/.config/opencode/opencode.json` — penyedia `omniroute` dengan setiap model dalam katalog (`opencode -m omniroute/<model>`)                                                               | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | Kedua-duanya      |
| `omniroute setup-cline`    | Cline                        | `~/.cline/data/{globalState,secrets}.json` (mod CLI) + mencetak tetapan sambungan VS Code                                                                                                   | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | Kedua-duanya      |
| `omniroute setup-kilo`     | Kilo Code                    | `~/.local/share/kilo/auth.json` (CLI) + menggabungkan `kilocode.*` ke dalam `settings.json` VS Code jika wujud                                                                              | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | Kedua-duanya      |
| `omniroute setup-continue` | Continue / `cn` CLI          | `~/.continue/config.yaml` — model `provider: openai`, kunci melalui `${{ secrets.OMNIROUTE_API_KEY }}`                                                                                      | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Kedua-duanya      |
| `omniroute setup-cursor`   | Cursor                       | Tiada — mencetak langkah dalam aplikasi (konfigurasi Cursor ialah SQLite legap)                                                                                                             | `--remote` `--api-key` `--only` `--port`                                                                                                   | Kedua-duanya      |
| `omniroute setup-roo`      | Roo Code                     | `~/.omniroute/roo-settings.json` (dokumen import) + menetapkan `roo-cline.autoImportSettingsPath` jika `settings.json` VS Code wujud                                                        | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | Kedua-duanya      |
| `omniroute setup-crush`    | Crush                        | `~/.config/crush/crush.json` — penyedia `openai-compat`, kunci melalui `$OMNIROUTE_API_KEY`                                                                                                 | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Kedua-duanya      |
| `omniroute setup-goose`    | Goose                        | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + mencetak resipi persekitaran                                                                                 | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Kedua-duanya      |
| `omniroute setup-aider`    | Aider                        | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + mencetak resipi persekitaran                                                                                               | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Kedua-duanya      |
| `omniroute setup-qwen`     | Qwen Code                    | `~/.qwen/settings.json` — tatasusunan V4 `modelProviders.openai` + `OMNIROUTE_API_KEY` dalam `~/.qwen/.env`                                                                                 | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | Kedua-duanya      |
| `omniroute setup-5dive`    | 5dive (kumpulan ejen)        | Tiada di bawah `$HOME` — menulis **profil pengesahan** 5dive (`/var/lib/5dive/auth-profiles/<name>/`) melalui `5dive agent auth set`; khusus root, dijalankan pada hos kumpulan             | `--remote` `--api-key` `--model` `--auth-profile` `--agent` `--byo-provider` `--fivedive-bin` `--no-sudo` `--yes` `--dry-run` `--port`     | Kedua-duanya      |
| `omniroute run <target>`   | Pelancaran masa jalan (umum) | Tiada — melancarkan `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini` dengan persekitaran dan argumen yang betul; Qwen dan Gemini menggunakan direktori utama terpencil sementara | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | Kedua-duanya      |
| `omniroute launch`         | Claude Code                  | Tiada — melancarkan `claude` dengan `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN` disuntik                                                                                                    | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | Kedua-duanya      |
| `omniroute launch-codex`   | OpenAI Codex CLI             | Tiada — melancarkan `codex` dengan penyedia `omniroute` disuntik melalui bendera `-c`                                                                                                       | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | Kedua-duanya      |

Nota tentang bendera (disahkan dalam sumber perintah):

- `--remote <url>` — dapatkan katalog daripada OmniRoute jauh (mengatasi `--port`
  dan konteks aktif). `--api-key <key>` membekalkan bukti kelayakan untuk
  pelayan tersebut (lalai kepada pemboleh ubah persekitaran `OMNIROUTE_API_KEY`, atau token konteks aktif).
- `--only <patterns>` — subrentetan dipisahkan koma; kekalkan hanya ID model yang sepadan
  (cth. `--only glm,kimi`). Tersedia pada `setup-codex`, `setup-claude`,
  `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`.
- `--dry-run` — cetak dengan tepat perkara yang akan ditulis tanpa menyentuh
  sistem fail. Tersedia pada setiap perintah `setup-*` **kecuali** `setup-cursor`
  (yang tidak pernah menulis fail).
- `--model <id>` — diperlukan (atau dipilih secara interaktif) untuk alat yang tidak mempunyai
  penemuan automatik model: Cline, Kilo, Roo, Goose, Qwen, Aider, 5dive. Alat tersebut
  turut menerima `--yes` untuk pelaksanaan bukan interaktif (yang kemudiannya memerlukan `--model`).
  `setup-opencode` menerima `--model` untuk menetapkan model peringkat teratas lalai.
- `--model <id>` pada `omniroute run` mengikuti pendawaian setiap sasaran dalam manifes
  (`bin/cli/cli-manifest.mjs`): **aider** menerima `--model openai/<id>` dan
  **opencode** `--model omniroute/<id>` (awalan ditambahkan hanya apabila ID
  belum memilikinya); **qwen** dan **gemini** menerima ID tersebut secara verbatim;
  **claude** menerimanya melalui `ANTHROPIC_MODEL`, **goose** melalui `GOOSE_MODEL`, dan
  **codex** melalui argumen `-c model_providers.omniroute.*`. **Qwen ialah satu-satunya sasaran pelaksanaan
  yang mewajibkan `--model`** — `omniroute run qwen` tanpanya akan keluar
  dengan kod `2` berserta ralat yang jelas.
- `--port <port>` — port OmniRoute setempat (lalai `20128`, diabaikan apabila `--remote`
  ditetapkan). Terdapat pada semua `setup-*` dan kedua-dua pelancar.
- Kod keluar `omniroute run`: kod keluar CLI anak itu sendiri disebarkan
  secara verbatim; `2` = argumen tidak sah (sasaran tidak disokong, `--model` wajib
  tiada, pengawal kontena); `127` = binari sasaran tiada dalam `PATH`;
  `130`/`143`/`129` apabila pelancaran ditamatkan oleh `SIGINT`/`SIGTERM`/`SIGHUP`;
  `1` = kegagalan pelancaran masa jalan yang lain.
- Kedua-dua pelancar (`launch`, `launch-codex`) menerima `--profile <name>` untuk memilih
  profil yang ditulis oleh `setup-claude` / `setup-codex`, serta argumen laluan terus untuk
  binari asas `claude` / `codex`.

Pemilih interaktif turut dikongsi oleh resipi persediaan:

```bash
# Pilih daripada katalog model setempat atau jauh yang aktif dan konfigurasikan sasaran.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

`configure` kini mewakilkan kepada resipi yang telah diuji untuk `codex`, `claude`,
`opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, `kilo`, dan `5dive`.
Entri katalog khusus IDE,
MITM dan panduan sahaja kekal sebagai aliran `setup-*`/manual yang eksplisit dan
tidak dipersembahkan sebagai sasaran yang boleh dilancarkan.

> `setup-opencode` ialah integrasi OpenCode **ringan yang serasi dengan openai**.
> Terdapat juga integrasi pemalam yang lebih kaya — `omniroute setup opencode` — yang
> memasang `@omniroute/opencode-plugin`. Kedua-duanya ialah perintah yang berbeza; jadual
> di atas mendokumentasikan `setup-opencode`.
>
> Pemalam tersebut tersedia dalam dua pakej, satu bagi setiap versi utama OpenCode, kerana kedua-dua
> pemuat menjangkakan titik masuk yang berbeza:
> `@omniroute/opencode-plugin` untuk OpenCode v1 dan
> `@omniroute/opencode-plugin-v2` untuk OpenCode v2. Pakej v2 adalah baharu
> (`0.1.0`) dan mengikuti kontrak hos yang masih berubah, maka ia membaca
> bentuk yang disediakan oleh OpenCode dalam draf katalog dan bukannya mengandaikan satu bentuk tertentu. Pasangnya
> dengan menambahkan entri `plugins` pada `opencode.json`; `omniroute setup opencode`
> masih memasang pakej v1. Pilihan dan tertib carian bukti kelayakan terdapat dalam
> README pakej.

---

## Penggunaan setempat

Dengan OmniRoute berjalan pada `localhost:20128`, hanya jalankan perintah persediaan untuk alat anda. Katalog diperoleh daripada pelayan setempat.

```bash
# Codex: tulis satu profil bagi setiap model yang sepadan ke dalam ~/.codex/
omniroute setup-codex
codex --profile glm52            # gunakan profil yang dijana

# Claude Code: tulis profil bagi setiap model, kemudian lancarkan salah satu daripadanya
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: tulis penyedia serasi openai dengan semua model katalog
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # dirujuk melalui {env:OMNIROUTE_API_KEY}, tidak pernah disimpan pada cakera
opencode -m omniroute/glm/glm-5.2 "..."

# Alat tanpa penemuan automatik memerlukan model yang dinyatakan secara jelas:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# Pratonton tanpa menulis apa-apa:
omniroute setup-continue --dry-run
```

Lancarkan tanpa menulis sebarang konfigurasi langsung (suntikan persekitaran sahaja):

```bash
omniroute launch                 # Claude Code → OmniRoute setempat
omniroute launch-codex           # Codex CLI → OmniRoute setempat
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# Laluan perintah eksplisit: teruskan apa sahaja yang hadir selepas --
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## Penggunaan jauh

Halakan mana-mana perintah persediaan kepada OmniRoute jauh dengan `--remote` + `--api-key`. Katalog diperoleh daripada pelayan jauh; konfigurasi ditulis pada mesin setempat anda.

```bash
# OpenCode terhadap VPS jauh, kekalkan model glm/kimi sahaja
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # eksport OMNIROUTE_API_KEY terlebih dahulu

# Profil Codex daripada katalog jauh
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# Lancarkan CLI terus terhadap pelayan jauh
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

Daripada memberikan `--remote`/`--api-key` setiap kali, log masuk sekali dan biarkan
**konteks aktif** membekalkannya secara automatik:

```bash
omniroute connect 192.168.0.15        # menjana token berskop, menyimpan konteks
omniroute setup-codex                 # ← kini menggunakan katalog jauh
omniroute setup-opencode              # ← sama
omniroute launch                      # ← Claude Code terhadap pelayan jauh
```

Lihat [Mod Jauh](./REMOTE-MODE.md) untuk konteks, skop dan pengurusan token.

---

## Armada ejen 5dive

[5dive](https://5dive.ai) menjalankan armada ejen pengekodan yang berjalan lama, dengan setiap satunya merupakan unit systemd di bawah pengguna Unix tersendiri. Ia sendiri bukan CLI pengekodan, jadi tiada apa-apa untuk dilancarkan oleh `omniroute run` — `5dive` ialah sasaran **konfigurasi sahaja**.

```bash
omniroute configure 5dive --model failover-demo --yes
omniroute setup-5dive --model failover-demo --auth-profile omniroute --agent worker1
```

Kedua-dua bentuk menulis satu **profil pengesahan** 5dive, dan setiap kedudukan `claude` yang terikat pada profil tersebut kemudiannya berkomunikasi dengan OmniRoute. Tiga perkara adalah khusus untuk sasaran ini:

- **Ia berjalan pada hos armada, sebagai root.** Kata kerja 5dive bertindak pada unit systemd setempat dan direktori keadaan milik root; tiada mod jauh. Resipi melaksanakan semula melalui `sudo` apabila ia belum dijalankan sebagai root (`--no-sudo` mematikan tindakan itu dan sebaliknya mencetak perintah tersebut).
- **Titik akhir mestilah `https://` melainkan ia gelung balik.** Kunci API ejen dihantar melalui URL tersebut pada setiap permintaan, dan 5dive menolak titik akhir di luar mesin yang menggunakan teks biasa. Alamat LAN persendirian bukanlah pengecualian.
- **Tetapan model setiap kedudukan sendiri mengatasi profil.** Profil membawa `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL`, tetapi kedudukan yang masih ditetapkan kepada id model stok akan gagal pada giliran pertamanya dengan _"Terdapat masalah dengan model yang dipilih"_. Berikan `--agent <name>` (boleh diulang) untuk menetapkan kedudukan itu juga; resipi mencetak perintah tersebut apabila anda tidak berbuat demikian.

Kunci API diserahkan kepada 5dive melalui **stdin** (`--api-key=-`), jadi ia tidak pernah muncul dalam output `ps`.

Menghalakan profil kepada **kombo** OmniRoute dan bukannya satu model tunggal membolehkan armada mendapat pemindahan ganti penyedia: apabila titik akhir utama terputus sepenuhnya di pertengahan giliran dalam pelaksanaan yang direkodkan pada [#11578](https://github.com/diegosouzapw/OmniRoute/issues/11578), ejen menyelesaikan langkah-langkah yang selebihnya menggunakan sandaran tanpa pernah mendedahkan gangguan tersebut.

---

## Konvensyen URL asas (alat yang memerlukan `/v1`)

OmniRoute mendedahkan antara muka OpenAI pada `/v1`, antara muka Anthropic pada akar,
dan antara muka Gemini natif pada `/v1beta`. Setiap integrasi dikonfigurasikan mengikut format yang
dijangkakan oleh alatnya (disahkan dalam sumber perintah):

| Integrasi                                                                  | URL asas yang ditulis | `/v1`?                                             |
| -------------------------------------------------------------------------- | --------------------- | -------------------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | akar                  | Tidak — Cline menambahkan `/v1/chat/completions`   |
| `setup-goose` (`OPENAI_HOST`)                                              | akar                  | Tidak — Goose menambahkan laluan                   |
| `setup-aider` (`OPENAI_API_BASE`)                                          | akar                  | Tidak — LiteLLM menambahkan `/v1/chat/completions` |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | dengan `/v1`          | Ya                                                 |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | akar                  | Tidak — Claude Code menambahkan `/v1/messages`     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | dengan `/v1`          | Ya                                                 |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | dengan `/v1`          | Ya                                                 |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | akar                  | Tidak — SDK menambahkan `/v1beta/models/…`         |
| `setup-5dive` (`ANTHROPIC_BASE_URL` dalam profil pengesahan)               | akar                  | Tidak — Claude Code menambahkan `/v1/messages`     |

---

## Mengekalkan kebergantungan natif semasa kemas kini: `--include=optional`

Apabila anda mengemas kini dengan `omniroute update` (selepas mengesahkan, atau dengan `--apply`),
OmniRoute menjalankan pemasangan dengan `--include=optional` terbina dalam:

```bash
npm install -g omniroute@latest --include=optional
```

Ini **bukan** bendera yang anda berikan kepada `omniroute update` — ia sentiasa digunakan oleh
pengemas kini. Ia menjamin bahawa `optionalDependencies` (`better-sqlite3`, `keytar`,
`tls-client`, tindanan SLM LLMLingua) kekal selepas kemas kini walaupun konfigurasi npm anda
menetapkan `omit=optional`, yang jika tidak akan menggugurkan pemacu SQLite natif dan
pengikatan gelang kunci OS secara senyap. Untuk melihat pratonton perintah tepat tanpa melaksanakannya:

```bash
omniroute update --dry-run
# [JALANAN KERING] Akan menjalankan: npm install -g omniroute@latest --include=optional
```

Bendera `omniroute update` lain (disahkan dalam sumber): `--check` (keluar dengan kod 1 jika
lapuk), `--apply` (pasang tanpa meminta pengesahan), `--changelog`, `--no-backup`,
`--yes`.

---

## Google Gemini CLI melalui `omniroute run gemini`

Kontrak disahkan terhadap `@google/gemini-cli` 0.50.0: CLI mematuhi
`GOOGLE_GEMINI_BASE_URL` dan menghantar `POST /v1beta/models/<model>:generateContent`
(dan `:streamGenerateContent?alt=sse`) kepadanya — tepat seperti antara muka Gemini natif
OmniRoute (`/v1beta`). `omniroute run gemini` mengkonfigurasikannya secara automatik:

- `GOOGLE_GEMINI_BASE_URL` → URL asas OmniRoute yang aktif (akar, tanpa `/v1`);
- `GEMINI_API_KEY` → kelayakan OmniRoute yang telah diselesaikan (pilihan/persekitaran/konteks);
- **`GEMINI_CLI_HOME` terpencil sementara** yang `.gemini/settings.json`-nya
  memilih pengesahan `gemini-api-key`, supaya sesi Google OAuth (Code Assist) yang disimpan
  tidak pernah mengatasi pelancaran yang diarahkan kepada OmniRoute — dipadamkan selepas keluar;
- **kebersihan persekitaran**: persekitaran proses anak dibersihkan daripada `GOOGLE_API_KEY`,
  `GOOGLE_GENAI_USE_VERTEXAI` dan `GOOGLE_GENAI_USE_GCA` (yang akan mengubah hala
  pengesahan kepada Vertex/Code Assist), dan `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key`
  ditetapkan sebagai langkah sandaran tambahan — sasaran `run` yang lain menerima
  layanan sama untuk pemboleh ubah bercanggah masing-masing;
- penyuntikan `--model <id>` daripada `--provider`/`--model`.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Perlindungan kepercayaan ruang kerja Gemini masih terpakai dalam mod tanpa kepala — berikan sendiri
`--skip-trust` (atau percayai direktori secara interaktif); pelancar sengaja tidak
memintasnya. Pelancar ini berbeza daripada **pendaftaran ACP**
(`src/lib/acp/registry.ts`, `gemini --acp`), yang kekal sebagai integrasi
protokol ejen untuk `/dashboard/acp-agents`.

---

## Ujian menyeluruh sebenar (pilihan ikut serta)

Ujian regresi pelan pelancaran deterministik dijalankan dalam CI (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). Untuk mengesahkan binari SEBENAR terhadap pelayan OmniRoute
SEBENAR, tersedia satu peralatan ujian pilihan ikut serta di
`tests/integration/upstream-cli-smoke.int.test.ts`. Ia tidak pernah dijalankan secara automatik
(setiap subujian dilangkau melainkan `RUN_CLI_SMOKE=1`), menghantar bukti kelayakan melalui NAMA
pemboleh ubah persekitaran (bukan nilainya), menyunting rentetan yang menyerupai kunci daripada
sebarang output yang direkodkan, melangkau sasaran yang binarinya tidak dipasang, dan
mengelaskan kegagalan sebagai pengesahan / huluan / konfigurasi dan bukannya nilai boolean semata-mata:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

Pilihan: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` mengehadkan ujian menyeluruh;
`OMNIROUTE_SMOKE_TIMEOUT_MS` menggantikan tempoh tamat masa 120 saat bagi setiap sasaran.

---

## Lihat juga

- [Konfigurasi Claude Code](./CLAUDE-CODE-CONFIGURATION.md) — panduan Claude Code yang lebih mendalam
- [Konfigurasi Codex CLI](./CODEX-CLI-CONFIGURATION.md) — persediaan asas `[model_providers.omniroute]` sekali sahaja
- [Mod Jauh](./REMOTE-MODE.md) — konteks, token akses berskop, mengendalikan pelayan jauh
- [Rujukan Alat CLI](../reference/CLI-TOOLS.md) — katalog lengkap alat yang disokong + halaman papan pemuka
- [Panduan Persediaan](./SETUP_GUIDE.md) — kaedah pemasangan dan pengenalan penggunaan kali pertama
