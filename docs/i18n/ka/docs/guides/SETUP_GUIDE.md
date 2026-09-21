# 📖 Setup Guide — OmniRoute (ქართული)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/SETUP_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/SETUP_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/SETUP_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/SETUP_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/SETUP_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/SETUP_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/SETUP_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/SETUP_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/SETUP_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/SETUP_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/SETUP_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/SETUP_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/SETUP_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/SETUP_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/SETUP_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/SETUP_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/SETUP_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/SETUP_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/SETUP_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/SETUP_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/SETUP_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/SETUP_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/SETUP_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/SETUP_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/SETUP_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/SETUP_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/SETUP_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/SETUP_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/SETUP_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/SETUP_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/SETUP_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/SETUP_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/SETUP_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/SETUP_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/SETUP_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/SETUP_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/SETUP_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/SETUP_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/SETUP_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/SETUP_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/SETUP_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/SETUP_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/SETUP_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/SETUP_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/SETUP_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/SETUP_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/SETUP_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/SETUP_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/SETUP_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/SETUP_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/SETUP_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/SETUP_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/SETUP_GUIDE.md)

---

> OmniRoute-ის სრული დაყენების ცნობარი. მოკლე ვერსიისთვის იხილეთ [სწრაფი დაწყება README-ში](../README.md#-quick-start).

## სარჩევი

- [ინსტალაციის მეთოდები](#install-methods)
- [CLI ხელსაწყოს კონფიგურაცია](#cli-tool-configuration)
- [პროტოკოლის დაყენება (MCP + A2A)](#protocol-setup-mcp--a2a)
- [ლოდინის დროის კონფიგურაცია](#timeout-configuration)
- [გაყოფილი პორტების რეჟიმი](#split-port-mode)
- [Void Linux (xbps-src)](#void-linux-xbps-src-template)
- [დეინსტალაცია](#uninstalling)

---

## ინსტალაციის მეთოდები

### npm (რეკომენდებული)

```bash
npm install -g omniroute
omniroute
```

მართვის პანელი იხსნება მისამართზე `http://localhost:20128`, ხოლო API-ის საბაზო URL არის `http://localhost:20128/v1`.

### pnpm

```bash
pnpm add -g omniroute@latest --allow-build=better-sqlite3 --allow-build=@swc/core
omniroute
```

> **pnpm-ის მომხმარებლებისთვის:** `--allow-build` ალამი საჭიროა `better-sqlite3`-ისა და `@swc/core`-ისთვის ნატიური აგების სკრიპტების ჩასართავად. `pnpm approve-builds -g` ბრძანება pnpm v11-ში გლობალური ინსტალაციებისთვის მხარდაჭერილი არ არის.

### Arch Linux (AUR)

```bash
yay -S omniroute-bin
systemctl --user enable --now omniroute.service
```

[AUR პაკეტი](https://aur.archlinux.org/packages/omniroute-bin) აინსტალირებს OmniRoute-ს და უზრუნველყოფს systemd-ის მომხმარებლის სერვისს.

### საწყისი კოდიდან

```bash
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
```

> **შენიშვნა Windows-ისთვის:** ნაგულისხმევად, OmniRoute იყენებს `%APPDATA%\omniroute`-ს, როდესაც ძველი `%USERPROFILE%\.omniroute` დირექტორია არ არსებობს. მონაცემთა დირექტორიის სხვა მდებარეობის ასარჩევად დააყენეთ `DATA_DIR`.

> **შენიშვნა:** პირველი გაშვებისას `npm install` ავტომატურად ქმნის `.env`-ს `.env.example`-ის საფუძველზე. შემდგომი ინსტალაციები არსებულ `.env`-ს არ გადაწერს, ამიტომ მორგებული პარამეტრები შენარჩუნდება. ხელახლა შესაქმნელად განმეორებით გაშვებამდე წაშალეთ `.env`.

### Docker

Docker-ის სრული დაყენებისთვის, Compose პროფილებისა და Caddy HTTPS-ის ჩათვლით, იხილეთ [Docker-ის სახელმძღვანელო](./DOCKER_GUIDE.md).

### დესკტოპის აპლიკაცია (Electron)

OmniRoute-ს მოჰყვება Electron 41-სა და electron-builder 26.10-ზე აგებული დესკტოპის გარსი. ხელმისაწვდომი სკრიპტები (სამუშაო სივრცის ძირეული დირექტორია):

```bash
npm run electron:dev          # დესკტოპის გაშვება ავტომატური გადატვირთვით
npm run electron:build        # მიმდინარე OS-ისთვის აგება (ავტომატურად აღმოჩენილი)
npm run electron:build:win    # Windows-ის ინსტალატორი (NSIS + პორტატიული)
npm run electron:build:mac    # macOS (dmg + zip, arm64+x64)
npm run electron:build:linux  # Linux (AppImage + deb + rpm)
npm run electron:smoke:packaged  # შეფუთული აგების საბაზისო ტესტირება
```

დესკტოპის ინსტალატორების გამოშვებები თან ერთვის GitHub Releases-ს. Electron-ის სრული დეტალური მიმოხილვისთვის (ხელმოწერა, IPC ხიდი, დისტრიბუტივები) იხილეთ [`ELECTRON_GUIDE.md`](./ELECTRON_GUIDE.md) _(მოგვიანებით ეტაპზე შექმნილი)_.

### უთავო სერვერი (CI/ავტომატიზაცია)

ოპერატორის ჩარევის გარეშე დასაყენებლად (Docker, Kubernetes, CI) გამოიყენეთ:

```bash
omniroute setup --non-interactive
omniroute providers test-batch
```

გარემოს ცვლადებთან (`INITIAL_PASSWORD`, `OMNIROUTE_WS_BRIDGE_SECRET` და სხვ.) ერთად ეს საშუალებას გაძლევთ, სრულად სკრიპტირებადი გზით გაუშვათ OmniRoute-ის ეგზემპლარი.

### CLI პარამეტრები

| ბრძანება                | აღწერა                                                                                          |
| ----------------------- | ----------------------------------------------------------------------------------------------- |
| `omniroute`             | სერვერის გაშვება (`PORT=20128`, API და მართვის პანელი ერთ პორტზე)                               |
| `omniroute setup`       | პაროლისა და პირველი პროვაიდერის CLI-ით ეტაპობრივი კონფიგურაცია                                  |
| `omniroute doctor`      | ლოკალური მდგომარეობის შემოწმებების გაშვება სერვერის გაშვების გარეშე                             |
| `omniroute providers`   | CLI-დან პროვაიდერების აღმოჩენა, ჩამოთვლა, ვალიდაცია და ტესტირება                                |
| `omniroute config`      | CLI ხელსაწყოს კონფიგურაცია — კონფიგურაციების ჩამოთვლა, მიღება, დაყენება და ვალიდაცია            |
| `omniroute status`      | ოფლაინ მდგომარეობის პანელი — ვერსია, DB, ხელსაწყოები, კონფიგურაცია                              |
| `omniroute logs`        | API-დან გამოყენების ჟურნალების ნაკადის მიღება (`--follow`-ის მხარდაჭერით)                       |
| `omniroute update`      | OmniRoute-ის განახლებების შემოწმება ან გამოყენება                                               |
| `omniroute provider`    | პროვაიდერებთან კავშირების მართვა — დამატება, ჩამოთვლა, წაშლა, ტესტირება, ნაგულისხმევად დაყენება |
| `omniroute --port 3000` | კანონიკური/API პორტის 3000-ზე დაყენება                                                          |
| `omniroute --mcp`       | MCP სერვერის გაშვება (stdio ტრანსპორტი)                                                         |
| `omniroute --no-open`   | ბრაუზერის ავტომატურად არ გახსნა                                                                 |
| `omniroute --help`      | დახმარების ჩვენება                                                                              |

უთავო დაყენების სკრიპტირება შესაძლებელია ალმებით ან გარემოს ცვლადებით:

```bash
omniroute setup --non-interactive --password "$OMNIROUTE_PASSWORD"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY" --test-provider
```

გაუშვით ლოკალური დიაგნოსტიკა მართვის პანელის გახსნის გარეშე:

```bash
omniroute doctor
omniroute doctor --json
omniroute doctor --no-liveness
```

მართეთ პროვაიდერები SSH-დან ან სკრიპტებიდან მართვის პანელის გახსნის გარეშე:

```bash
omniroute providers available
omniroute providers available --search openai
omniroute providers available --category api-key
omniroute providers list
omniroute providers test <id-or-name>
omniroute providers test-all
omniroute providers validate
```

---

## CLI ინსტრუმენტის კონფიგურაცია

### 1) პროვაიდერების დაკავშირება და API გასაღების შექმნა

1. გახსენით Dashboard → `Providers` და დააკავშირეთ მინიმუმ ერთი პროვაიდერი (OAuth ან API გასაღები).
2. გახსენით Dashboard → `Endpoints` და შექმენით API გასაღები.
3. (არასავალდებულო) გახსენით Dashboard → `Combos` და დააყენეთ სარეზერვო ჯაჭვი.

### 2) თქვენი კოდირების ინსტრუმენტის მითითება

```txt
საბაზისო URL: http://localhost:20128/v1
API გასაღები:  [დააკოპირეთ Endpoint გვერდიდან]
მოდელი:        if/qwen3.8-max-preview (ან ნებისმიერი პროვაიდერის/მოდელის პრეფიქსი)
```

თუ თქვენს რედაქტორს არ შეუძლია `Authorization: Bearer ...`-ის გაგზავნა, სანაცვლოდ გამოიყენეთ ტოკენიზებული თავსებადობის საბაზისო მისამართი:

```txt
საბაზისო URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/
მოდელების URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/models
ჩატის URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/chat/completions
Ollama Tags URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/api/tags
```

მუშაობს Claude Code-თან, Codex CLI-თან, Cursor-თან, Cline-თან, OpenClaw-თან, OpenCode-თან და OpenAI-თან თავსებად SDK-ებთან.

#### ავტომატური კონფიგურაცია `setup-*`-ით

საბაზისო URL-ისა და გასაღების ხელით ჩასმის ნაცვლად, მიეცით OmniRoute-ს საშუალება, მოდელების მიმდინარე კატალოგის საფუძველზე თითოეული ინსტრუმენტისთვის
საკუთარი კონფიგურაცია შექმნას. თითო ინსტრუმენტზე ერთი ბრძანება:

```bash
omniroute setup-codex        # ~/.codex/<name>.config.toml პროფილები
omniroute setup-claude       # ~/.claude/profiles/<name>/settings.json
omniroute setup-opencode     # ~/.config/opencode/opencode.json (OpenAI-თან თავსებადი)
omniroute setup-cline        # Cline CLI + VS Code გაფართოების პარამეტრები
omniroute setup-kilo         # Kilo Code
omniroute setup-continue     # ~/.continue/config.yaml (Continue / cn)
omniroute setup-cursor       # ბეჭდავს Cursor-ში შესასრულებელ ნაბიჯებს
omniroute setup-roo          # Roo Code-ის იმპორტი + autoImport მაჩვენებელი
omniroute setup-crush        # ~/.config/crush/crush.json
omniroute setup-goose        # ~/.config/goose/config.yaml
omniroute setup-aider        # ~/.aider.conf.yml
omniroute setup-qwen         # ~/.qwen/settings.json + ~/.qwen/.env
```

თითოეული იღებს `--remote <url> --api-key <key>` პარამეტრებს, რათა ლოკალური ინსტრუმენტი
**დისტანციურ** OmniRoute-თან სამუშაოდ დააკონფიგურიროს, ასევე `--dry-run` პარამეტრს წინასწარი გადახედვისთვის. CLI-ის საჭირო
გარემოს ცვლადებით, საერთოდ რაიმე კონფიგურაციის ჩაწერის გარეშე გასაშვებად გამოიყენეთ უნივერსალური გამშვები
`omniroute run <target>` (claude, codex, aider, goose, opencode, qwen, gemini);
ძველი, ცალკეული ინსტრუმენტებისთვის განკუთვნილი გამშვებები `omniroute launch` (Claude Code) და
`omniroute launch-codex` (Codex) კვლავ ხელმისაწვდომია.

სრული ცხრილისთვის (რას წერს თითოეული ბრძანება, ყველა პარამეტრი, ლოკალური და დისტანციური რეჟიმები, საბაზისო URL-ის
`/v1` შეთანხმებები) იხილეთ **[CLI ინტეგრაციები](./CLI-INTEGRATIONS.md)**.

ცალკეული ინსტრუმენტების დეტალური კონფიგურაციისთვის (Claude Code, Codex CLI, Cursor, Cline, OpenClaw, Kilo Code, Copilot და სხვა) იხილეთ სპეციალური **[CLI ინსტრუმენტების სახელმძღვანელო](../reference/CLI-TOOLS.md)**.

---

## პროტოკოლების დაყენება (MCP + A2A)

### MCP-ის დაყენება (Model Context Protocol)

გაუშვით MCP ტრანსპორტი stdio რეჟიმში:

```bash
omniroute --mcp
```

რეკომენდებული შემოწმების პროცესი:

```bash
# 1. გაუშვით MCP სერვერი
omniroute --mcp

# 2. თქვენი MCP კლიენტიდან გამოიძახეთ:
omniroute_get_health        # უნდა დააბრუნოს სისტემის მდგომარეობა
omniroute_list_combos       # უნდა დააბრუნოს აქტიური კომბინაციები

# 3. ან გაუშვით სრული E2E ნაკრები:
npm run test:protocols:e2e
```

#### MCP კლიენტის კონფიგურაცია

**Claude Code:**

```bash
claude mcp add-server omniroute --type http --url http://localhost:20128/api/mcp/stream
```

**Cursor / Cline:**

დაამატეთ თქვენს MCP პარამეტრებში:

```json
{
  "mcpServers": {
    "omniroute": {
      "command": "omniroute",
      "args": ["--mcp"],
      "env": {}
    }
  }
}
```

**MCP-ის სრული დოკუმენტაცია:** [MCP სერვერის README](../../open-sse/mcp-server/README.md) — 110 ინსტრუმენტი, IDE კონფიგურაციები, Python/TS/Go კლიენტები.

### A2A-ის დაყენება (Agent-to-Agent Protocol)

შეამოწმეთ Agent Card:

```bash
curl http://localhost:20128/.well-known/agent.json
```

გაგზავნეთ დავალება:

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Give me a short quota summary."}]}}'
```

**A2A-ის სრული დოკუმენტაცია:** [A2A სერვერის README](../../src/lib/a2a/README.md) — JSON-RPC 2.0, უნარები, ნაკადური გადაცემა, დავალების სასიცოცხლო ციკლი.

---

## ტაიმაუტის კონფიგურაცია

### ძირითადი ტაიმაუტები

განთავსებების უმეტესობისთვის მხოლოდ ეს ორი ცვლადი გჭირდებათ:

| ცვლადი                   | ნაგულისხმევი მნიშვნელობა                   | დანიშნულება                                                                                                                                                                                 |
| ------------------------ | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `REQUEST_TIMEOUT_MS`     | `600000`                                   | საერთო საბაზისო მნიშვნელობა ზედა დონის სერვერის პასუხის დაწყების ტაიმაუტისთვის, Undici-ის ფარული ტაიმაუტებისთვის, TLS-ანაბეჭდის მოთხოვნებისა და API-ხიდის მოთხოვნის/პროქსის ტაიმაუტებისთვის |
| `STREAM_IDLE_TIMEOUT_MS` | მემკვიდრეობით იღებს `REQUEST_TIMEOUT_MS`-ს | ნაკადურ ფრაგმენტებს შორის მაქსიმალური ინტერვალი, რომლის შემდეგაც OmniRoute წყვეტს SSE ნაკადს                                                                                                |

უკუთავსებადობა შენარჩუნებულია: არსებული `FETCH_TIMEOUT_MS`, `API_BRIDGE_PROXY_TIMEOUT_MS` და სხვა, ცალკეული ფენებისთვის განკუთვნილი ტაიმაუტის ცვლადები კვლავ მუშაობს და საერთო საბაზისო მნიშვნელობას ანაცვლებს.

### პროვაიდერისთვის სპეციფიკური შენიშვნები

Claude Code-თან თავსებადი ზედა დონის სერვერებისთვის (`anthropic-compatible-cc-*`) OmniRoute გამომავალი `X-Stainless-Timeout` სათაურის მნიშვნელობას განსაზღვრული fetch-ტაიმაუტიდან იღებს, რათა პროვაიდერის მხარეს წაკითხვის ტაიმაუტები თქვენს გარემოს კონფიგურაციასთან შესაბამისობაში დარჩეს.

მესამე მხარის Claude Code-თან თავსებადი უკუპროქსიებისთვის OmniRoute ნაგულისხმევ `anthropic-beta` ნაკრებს კონსერვატიულად ინარჩუნებს და, როდესაც `Client Cache Control` დაყენებულია მნიშვნელობაზე `Auto`, მხოლოდ კლიენტის მიერ მოწოდებულ `cache_control` მარკერებს გადაამისამართებს. ცალკეული კავშირისთვის გადამრთველი „Enable redact-thinking beta“ ჩართეთ მხოლოდ მაშინ, როდესაც ზედა დონის სერვერი კონკრეტულად მოითხოვს Claude-ის რედაქტირებული აზროვნების ნაკადებს.

### ტაიმაუტების გაფართოებული ჩანაცვლებები

| ცვლადი                                   | ნაგულისხმევი მნიშვნელობა                               | დანიშნულება                                                                                     |
| ---------------------------------------- | ------------------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| `FETCH_TIMEOUT_MS`                       | მემკვიდრეობით იღებს `REQUEST_TIMEOUT_MS`-ს             | ზედა დონის სერვერის პასუხის დაწყების ტაიმაუტი, რომელიც პასუხის სათაურების მიღებამდე გამოიყენება |
| `FETCH_HEADERS_TIMEOUT_MS`               | მემკვიდრეობით იღებს `FETCH_TIMEOUT_MS`-ს               | Undici-ის დროის ლიმიტი ზედა დონის სერვერის პასუხის სათაურების მისაღებად                         |
| `FETCH_BODY_TIMEOUT_MS`                  | მემკვიდრეობით იღებს `FETCH_TIMEOUT_MS`-ს               | Undici-ის დროის ლიმიტი ზედა დონის სერვერის პასუხის სხეულის ფრაგმენტებს შორის (`0` თიშავს მას)   |
| `FETCH_CONNECT_TIMEOUT_MS`               | `30000`                                                | Undici-ის TCP კავშირის ტაიმაუტი                                                                 |
| `FETCH_KEEPALIVE_TIMEOUT_MS`             | `4000`                                                 | Undici-ის უმოქმედო keep-alive სოკეტის ტაიმაუტი                                                  |
| `TLS_CLIENT_TIMEOUT_MS`                  | მემკვიდრეობით იღებს `FETCH_TIMEOUT_MS`-ს               | `wreq-js`-ის მეშვეობით შესრულებული TLS-ანაბეჭდის მოთხოვნების ტაიმაუტი                           |
| `API_BRIDGE_PROXY_TIMEOUT_MS`            | მემკვიდრეობით იღებს `REQUEST_TIMEOUT_MS`-ს ან `600000` | `/v1` პროქსი-გადამისამართების ტაიმაუტი API პორტიდან მართვის პანელის პორტზე                      |
| `API_BRIDGE_SERVER_REQUEST_TIMEOUT_MS`   | `max(API_BRIDGE_PROXY_TIMEOUT_MS, 300000)`             | შემომავალი მოთხოვნის ტაიმაუტი API-ხიდის სერვერზე                                                |
| `API_BRIDGE_SERVER_HEADERS_TIMEOUT_MS`   | `60000`                                                | შემომავალი სათაურების ტაიმაუტი API-ხიდის სერვერზე                                               |
| `API_BRIDGE_SERVER_KEEPALIVE_TIMEOUT_MS` | `5000`                                                 | keep-alive ტაიმაუტი API-ხიდის სერვერზე                                                          |
| `API_BRIDGE_SERVER_SOCKET_TIMEOUT_MS`    | `0`                                                    | სოკეტის უმოქმედობის ტაიმაუტი API-ხიდის სერვერზე (`0` თიშავს მას)                                |

> **შენიშვნა:** ნაკადური მოთხოვნებისთვის `FETCH_TIMEOUT_MS` მოიცავს მხოლოდ კავშირის დამყარებას / ზედა დონის სერვერის პირველი პასუხის მოლოდინს. ნაკადის გააქტიურების შემდეგ OmniRoute მას მხოლოდ რეალური შეფერხების (`STREAM_IDLE_TIMEOUT_MS`) ან Undici-ის პასუხის სხეულის უმოქმედობის (`FETCH_BODY_TIMEOUT_MS`) შემთხვევაში შეწყვეტს.

### უკუპროქსის თავსებადობა

თუ OmniRoute-ს Nginx-ის, Caddy-ის, Cloudflare-ის ან სხვა უკუპროქსის უკან უშვებთ, დარწმუნდით, რომ პროქსის ტაიმაუტებიც OmniRoute-ის ნაკადის/fetch-ის ტაიმაუტებზე მეტია.

---

## განცალკევებული პორტების რეჟიმი

გაფართოებული სცენარებისთვის (უკუ პროქსი, კონტეინერების ქსელი) გაუშვით API და Dashboard ცალკეულ პორტებზე:

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API:       http://localhost:20128/v1
# Dashboard: http://localhost:20129
```

---

## Void Linux-ის (xbps-src) შაბლონი

Void Linux-ის მომხმარებლებს შეუძლიათ შექმნან ნატიური პაკეტი `xbps-src`-ის გამოყენებით. შეინახეთ ეს ბლოკი, როგორც `srcpkgs/omniroute/template`:

```bash
# შაბლონის ფაილი 'omniroute'-ისთვის
pkgname=omniroute
version=3.8.0
revision=1
hostmakedepends="nodejs python3 make"
depends="openssl"
short_desc="უნივერსალური AI-კარიბჭე გონივრული მარშრუტიზაციით მრავალი LLM-პროვაიდერისთვის"
maintainer="zenobit <zenobit@disroot.org>"
license="MIT"
homepage="https://github.com/diegosouzapw/OmniRoute"
distfiles="https://github.com/diegosouzapw/OmniRoute/archive/refs/tags/v${version}.tar.gz"
# თითოეული გამოშვებისთვის თავიდან შექმენით საკონტროლო ჯამი შემდეგი ბრძანებით:
#   curl -L -o /tmp/omniroute.tar.gz "https://github.com/diegosouzapw/OmniRoute/archive/refs/tags/v${version}.tar.gz" && sha256sum /tmp/omniroute.tar.gz
checksum=PLACEHOLDER_REGENERATE_PER_RELEASE
system_accounts="_omniroute"
omniroute_homedir="/var/lib/omniroute"
export NODE_ENV=production
export npm_config_engine_strict=false
export npm_config_loglevel=error
export npm_config_fund=false
export npm_config_audit=false

do_build() {
	local _gyp_arch
	case "$XBPS_TARGET_MACHINE" in
		aarch64*) _gyp_arch=arm64 ;;
		armv7*|armv6*) _gyp_arch=arm ;;
		i686*) _gyp_arch=ia32 ;;
		*) _gyp_arch=x64 ;;
	esac

	NODE_ENV=development npm ci --ignore-scripts
	npm run build
	cp -r .next/static .next/standalone/.next/static
	[ -d public ] && cp -r public .next/standalone/public || true

	local _node_gyp=/usr/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js
	(cd node_modules/better-sqlite3 && node "$_node_gyp" rebuild --arch="$_gyp_arch")

	local _bs3_release=.next/standalone/node_modules/better-sqlite3/build/Release
	mkdir -p "$_bs3_release"
	cp node_modules/better-sqlite3/build/Release/better_sqlite3.node "$_bs3_release/"

	rm -rf .next/standalone/node_modules/@img

	for _mod in pino-abstract-transport split2 process-warning; do
		cp -r "node_modules/$_mod" .next/standalone/node_modules/
	done
}

do_check() {
	npm run test:unit
}

do_install() {
	vmkdir usr/lib/omniroute/.next
	vcopy .next/standalone/. usr/lib/omniroute/.next/standalone

	for _d in \
		.next/standalone/.next/server/app/dashboard \
		.next/standalone/.next/server/app/dashboard/settings \
		.next/standalone/.next/server/app/dashboard/providers; do
		touch "${DESTDIR}/usr/lib/omniroute/${_d}/.keep"
	done

	cat > "${WRKDIR}/omniroute" <<'EOF'
#!/bin/sh
export PORT="${PORT:-20128}"
export DATA_DIR="${DATA_DIR:-${XDG_DATA_HOME:-${HOME}/.local/share}/omniroute}"
export APP_LOG_TO_FILE="${APP_LOG_TO_FILE:-false}"
mkdir -p "${DATA_DIR}"
exec node /usr/lib/omniroute/.next/standalone/server.js "$@"
EOF
	vbin "${WRKDIR}/omniroute"
}

post_install() {
	vlicense LICENSE
}
```

---

## დეინსტალაცია

| ბრძანება                 | მოქმედება                                                                                         |
| ------------------------ | ------------------------------------------------------------------------------------------------- |
| `npm run uninstall`      | შლის სისტემურ აპლიკაციას, მაგრამ **ინარჩუნებს თქვენს DB-სა და კონფიგურაციებს** `~/.omniroute`-ში. |
| `npm run uninstall:full` | შლის აპლიკაციას და სამუდამოდ **შლის ყველა კონფიგურაციას, გასაღებსა და მონაცემთა ბაზას**.          |

> ყველა მეთოდისთვის დეინსტალაციის დეტალური ინსტრუქციები იხილეთ [UNINSTALL.md](./UNINSTALL.md)-ში.
