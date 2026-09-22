# 📖 Setup Guide — OmniRoute (Հայերեն)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/SETUP_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/SETUP_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/SETUP_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/SETUP_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/SETUP_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/SETUP_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/SETUP_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/SETUP_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/SETUP_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/SETUP_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/SETUP_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/SETUP_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/SETUP_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/SETUP_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/SETUP_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/SETUP_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/SETUP_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/SETUP_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/SETUP_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/SETUP_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/SETUP_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/SETUP_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/SETUP_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/SETUP_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/SETUP_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/SETUP_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/SETUP_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/SETUP_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/SETUP_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/SETUP_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/SETUP_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/SETUP_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/SETUP_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/SETUP_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/SETUP_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/SETUP_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/SETUP_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/SETUP_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/SETUP_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/SETUP_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/SETUP_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/SETUP_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/SETUP_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/SETUP_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/SETUP_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/SETUP_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/SETUP_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/SETUP_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/SETUP_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/SETUP_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/SETUP_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/SETUP_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/SETUP_GUIDE.md)

---

> OmniRoute-ի ամբողջական կարգավորման տեղեկատու։ Արագ տարբերակի համար տե՛ս [README-ի արագ մեկնարկը](../README.md#-quick-start)։

## Բովանդակություն

- [Տեղադրման եղանակներ](#install-methods)
- [CLI գործիքի կարգավորում](#cli-tool-configuration)
- [Արձանագրությունների կարգավորում (MCP + A2A)](#protocol-setup-mcp--a2a)
- [Սպասման ժամանակի կարգավորում](#timeout-configuration)
- [Բաժանված պորտերի ռեժիմ](#split-port-mode)
- [Void Linux (xbps-src)](#void-linux-xbps-src-template)
- [Ապատեղադրում](#uninstalling)

---

## Տեղադրման եղանակներ

### npm (խորհուրդ է տրվում)

```bash
npm install -g omniroute
omniroute
```

Կառավարման վահանակը բացվում է `http://localhost:20128` հասցեով, իսկ API-ի բազային URL-ն է՝ `http://localhost:20128/v1`։

### pnpm

```bash
pnpm add -g omniroute@latest --allow-build=better-sqlite3 --allow-build=@swc/core
omniroute
```

> **pnpm-ի օգտատերերի համար․** `--allow-build` դրոշն անհրաժեշտ է՝ `better-sqlite3`-ի և `@swc/core`-ի բնիկ կառուցման սկրիպտները միացնելու համար։ `pnpm approve-builds -g` հրամանը pnpm v11-ում չի աջակցվում գլոբալ տեղադրումների համար։

### Arch Linux (AUR)

```bash
yay -S omniroute-bin
systemctl --user enable --now omniroute.service
```

[AUR փաթեթը](https://aur.archlinux.org/packages/omniroute-bin) տեղադրում է OmniRoute-ը և տրամադրում systemd-ի օգտատիրոջ ծառայություն։

### Սկզբնաղբյուրից

```bash
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
```

> **Նշում Windows-ի համար․** Լռելյայնորեն OmniRoute-ն օգտագործում է `%APPDATA%\omniroute`-ը, եթե հին `%USERPROFILE%\.omniroute` գրացուցակը բացակայում է։ Տվյալների գրացուցակի այլ տեղադրություն ընտրելու համար սահմանեք `DATA_DIR`-ը։

> **Նշում․** Առաջին գործարկման ժամանակ `npm install`-ը `.env.example`-ից ինքնաշխատ ստեղծում է `.env`։ Հետագա տեղադրումները չեն վերագրի գոյություն ունեցող `.env`-ը, ուստի անհատական կարգավորումները կպահպանվեն։ Այն կրկին սկզբնական արժեքներով ստեղծելու համար ջնջեք `.env`-ը՝ նախքան կրկին գործարկելը։

### Docker

Docker-ի ամբողջական կարգավորման, ներառյալ Compose պրոֆիլների և Caddy HTTPS-ի մասին տե՛ս [Docker-ի ուղեցույցը](./DOCKER_GUIDE.md)։

### Սեղանադիր հավելված (Electron)

OmniRoute-ը տրամադրվում է Electron 41 + electron-builder 26.10-ի հիման վրա ստեղծված սեղանադիր պատյանով։ Հասանելի սկրիպտները (աշխատատարածքի արմատում)՝

```bash
npm run electron:dev          # Գործարկել սեղանադիր հավելվածը՝ թարմ փոփոխությունների ինքնաշխատ վերաբեռնմամբ
npm run electron:build        # Կառուցել ընթացիկ ՕՀ-ի համար (ինքնաշխատ հայտնաբերվում է)
npm run electron:build:win    # Windows-ի տեղադրիչ (NSIS + շարժական տարբերակ)
npm run electron:build:mac    # macOS (dmg + zip, arm64+x64)
npm run electron:build:linux  # Linux (AppImage + deb + rpm)
npm run electron:smoke:packaged  # Արագ ստուգել փաթեթավորված կառուցվածքը
```

Սեղանադիր տեղադրիչների թողարկումները կցվում են GitHub Releases-ին։ Electron-ի ամբողջական մանրամասն ուղեցույցի համար (ստորագրում, IPC կամուրջ, դիստրիբուտիվներ) տե՛ս [`ELECTRON_GUIDE.md`](./ELECTRON_GUIDE.md) _(ստեղծվել է ավելի ուշ փուլում)_։

### Առանց գրաֆիկական միջերեսի սերվեր (CI/ավտոմատացում)

Չվերահսկվող կարգավորումների համար (Docker, Kubernetes, CI) օգտագործեք՝

```bash
omniroute setup --non-interactive
omniroute providers test-batch
```

Միջավայրի փոփոխականների (`INITIAL_PASSWORD`, `OMNIROUTE_WS_BRIDGE_SECRET` և այլն) հետ համատեղ սա թույլ է տալիս գործարկել OmniRoute-ի ամբողջովին սկրիպտավորվող օրինակ։

### CLI-ի ընտրանքներ

| Հրաման                  | Նկարագրություն                                                                            |
| ----------------------- | ----------------------------------------------------------------------------------------- |
| `omniroute`             | Գործարկել սերվերը (`PORT=20128`, API-ն և վահանակը՝ նույն պորտում)                         |
| `omniroute setup`       | Գաղտնաբառի և առաջին մատակարարի քայլ առ քայլ CLI կարգավորում                               |
| `omniroute doctor`      | Կատարել տեղային աշխատունակության ստուգումներ՝ առանց սերվերը գործարկելու                   |
| `omniroute providers`   | CLI-ից հայտնաբերել, թվարկել, վավերացնել և փորձարկել մատակարարներին                        |
| `omniroute config`      | CLI գործիքի կարգավորում՝ թվարկել, ստանալ, սահմանել և վավերացնել կարգավորումները           |
| `omniroute status`      | Անցանց կարգավիճակի վահանակ՝ տարբերակ, DB, գործիքներ, կարգավորում                          |
| `omniroute logs`        | API-ից հոսքային եղանակով ստանալ օգտագործման մատյանները (աջակցում է `--follow`)            |
| `omniroute update`      | Ստուգել կամ կիրառել OmniRoute-ի թարմացումները                                             |
| `omniroute provider`    | Կառավարել մատակարարների կապերը՝ ավելացնել, թվարկել, հեռացնել, փորձարկել, ընտրել լռելյայնը |
| `omniroute --port 3000` | Սահմանել հիմնական/API պորտը որպես 3000                                                    |
| `omniroute --mcp`       | Գործարկել MCP սերվերը (stdio փոխադրում)                                                   |
| `omniroute --no-open`   | Ինքնաշխատ չբացել դիտարկիչը                                                                |
| `omniroute --help`      | Ցուցադրել օգնությունը                                                                     |

Առանց գրաֆիկական միջերեսի կարգավորումը կարելի է սկրիպտավորել դրոշների կամ միջավայրի փոփոխականների միջոցով՝

```bash
omniroute setup --non-interactive --password "$OMNIROUTE_PASSWORD"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY" --test-provider
```

Կատարեք տեղային ախտորոշում՝ առանց կառավարման վահանակը բացելու․

```bash
omniroute doctor
omniroute doctor --json
omniroute doctor --no-liveness
```

Կառավարեք մատակարարներին SSH-ից կամ սկրիպտներից՝ առանց կառավարման վահանակը բացելու․

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

## CLI գործիքի կազմաձևում

### 1) Միացրեք մատակարարները և ստեղծեք API բանալի

1. Բացեք Dashboard → `Providers` և միացրեք առնվազն մեկ մատակարար (OAuth կամ API բանալի):
2. Բացեք Dashboard → `Endpoints` և ստեղծեք API բանալի:
3. (Ընտրովի) Բացեք Dashboard → `Combos` և սահմանեք ձեր պահուստային շղթան:

### 2) Կարգավորեք ձեր ծրագրավորման գործիքը

```txt
Base URL: http://localhost:20128/v1
API Key:  [copy from Endpoint page]
Model:    if/qwen3.8-max-preview (or any provider/model prefix)
```

Եթե ձեր խմբագրիչը չի կարող ուղարկել `Authorization: Bearer ...`, դրա փոխարեն օգտագործեք թոքեն պարունակող համատեղելիության բազային հասցեն.

```txt
Base URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/
Models URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/models
Chat URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/chat/completions
Ollama Tags URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/api/tags
```

Աշխատում է Claude Code-ի, Codex CLI-ի, Cursor-ի, Cline-ի, OpenClaw-ի, OpenCode-ի և OpenAI-ի հետ համատեղելի SDK-ների հետ:

#### Ավտոմատ կազմաձևում `setup-*`-ի միջոցով

Բազային URL-ը և բանալին ձեռքով տեղադրելու փոխարեն թույլ տվեք OmniRoute-ին ընթացիկ մոդելների կատալոգի հիման վրա գրել յուրաքանչյուր գործիքի սեփական կազմաձևը: Յուրաքանչյուր գործիքի համար՝ մեկ հրաման.

```bash
omniroute setup-codex        # ~/.codex/<name>.config.toml պրոֆիլներ
omniroute setup-claude       # ~/.claude/profiles/<name>/settings.json
omniroute setup-opencode     # ~/.config/opencode/opencode.json (openai-ի հետ համատեղելի)
omniroute setup-cline        # Cline CLI-ի և VS Code ընդլայնման կարգավորումներ
omniroute setup-kilo         # Kilo Code
omniroute setup-continue     # ~/.continue/config.yaml (Continue / cn)
omniroute setup-cursor       # ցուցադրում է Cursor-ի ներծրագրային քայլերը
omniroute setup-roo          # Roo Code-ի ներմուծում և autoImport ցուցիչ
omniroute setup-crush        # ~/.config/crush/crush.json
omniroute setup-goose        # ~/.config/goose/config.yaml
omniroute setup-aider        # ~/.aider.conf.yml
omniroute setup-qwen         # ~/.qwen/settings.json + ~/.qwen/.env
```

Յուրաքանչյուրն ընդունում է `--remote <url> --api-key <key>`՝ տեղային գործիքը **հեռավար** OmniRoute-ի հետ աշխատելու համար կազմաձևելու նպատակով, ինչպես նաև `--dry-run`՝ նախադիտման համար: CLI-ն ճիշտ ներդրված միջավայրով և առանց որևէ կազմաձև գրելու գործարկելու համար օգտագործեք ընդհանուր գործարկիչը՝ `omniroute run <target>` (claude, codex, aider, goose, opencode, qwen, gemini): Նախկին՝ առանձին գործիքների համար նախատեսված `omniroute launch` (Claude Code) և `omniroute launch-codex` (Codex) գործարկիչները շարունակում են հասանելի լինել:

Ամբողջական աղյուսակի համար (թե յուրաքանչյուր հրաման ինչ է գրում, բոլոր դրոշները, տեղային և հեռավար տարբերակները, բազային URL-ի `/v1` համաձայնությունները) տե՛ս **[CLI ինտեգրումներ](./CLI-INTEGRATIONS.md)**:

Յուրաքանչյուր գործիքի մանրամասն կազմաձևման համար (Claude Code, Codex CLI, Cursor, Cline, OpenClaw, Kilo Code, Copilot և այլն) տե՛ս հատուկ **[CLI գործիքների ուղեցույցը](../reference/CLI-TOOLS.md)**:

---

## Արձանագրությունների կարգավորում (MCP + A2A)

### MCP-ի կարգավորում (Model Context Protocol)

Գործարկեք MCP փոխադրումը stdio ռեժիմով.

```bash
omniroute --mcp
```

Առաջարկվող վավերացման ընթացքը.

```bash
# 1. Գործարկեք MCP սերվերը
omniroute --mcp

# 2. Ձեր MCP հաճախորդից կանչեք՝
omniroute_get_health        # Պետք է վերադարձնի համակարգի առողջական վիճակը
omniroute_list_combos       # Պետք է վերադարձնի ակտիվ համակցությունները

# 3. Կամ գործարկեք ամբողջական E2E թեստային փաթեթը՝
npm run test:protocols:e2e
```

#### MCP հաճախորդի կազմաձևում

**Claude Code:**

```bash
claude mcp add-server omniroute --type http --url http://localhost:20128/api/mcp/stream
```

**Cursor / Cline:**

Ավելացրեք ձեր MCP կարգավորումներին.

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

**MCP-ի ամբողջական փաստաթղթեր:** [MCP սերվերի README](../../open-sse/mcp-server/README.md) — 110 գործիք, IDE կազմաձևեր, Python/TS/Go հաճախորդներ:

### A2A-ի կարգավորում (գործակալից գործակալ արձանագրություն)

Ստուգեք Agent Card-ը.

```bash
curl http://localhost:20128/.well-known/agent.json
```

Ուղարկեք առաջադրանք.

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Give me a short quota summary."}]}}'
```

**A2A-ի ամբողջական փաստաթղթեր:** [A2A սերվերի README](../../src/lib/a2a/README.md) — JSON-RPC 2.0, հմտություններ, հոսքային փոխանցում, առաջադրանքի կենսափուլ:

---

## Սպասման ժամանակի կազմաձևում

### Հիմնական սպասման ժամանակներ

Տեղակայումների մեծ մասի համար ձեզ անհրաժեշտ են միայն այս երկու փոփոխականները.

| Փոփոխական                | Լռելյայն արժեք                      | Նպատակ                                                                                                                                                                                           |
| ------------------------ | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `REQUEST_TIMEOUT_MS`     | `600000`                            | Ընդհանուր ելակետ՝ վերին հոսքի պատասխանի մեկնարկի սպասման ժամանակի, Undici-ի թաքնված սպասման ժամանակների, TLS մատնահետքի հարցումների և API կամրջակի հարցումների/պրոքսիի սպասման ժամանակների համար |
| `STREAM_IDLE_TIMEOUT_MS` | ժառանգում է `REQUEST_TIMEOUT_MS`-ից | Հոսքային տվյալների հատվածների միջև առավելագույն ընդմիջումը, որից հետո OmniRoute-ը դադարեցնում է SSE հոսքը                                                                                        |

Հետադարձ համատեղելիությունը պահպանվում է. գոյություն ունեցող `FETCH_TIMEOUT_MS`, `API_BRIDGE_PROXY_TIMEOUT_MS` և յուրաքանչյուր շերտի համար նախատեսված սպասման ժամանակի այլ փոփոխականները շարունակում են գործել և գերակայում են ընդհանուր ելակետին։

### Մատակարարին հատուկ նշումներ

Claude Code-ի հետ համատեղելի վերին հոսքերի (`anthropic-compatible-cc-*`) համար OmniRoute-ը ելքային `X-Stainless-Timeout` վերնագիրը ձևավորում է որոշված հարցման սպասման ժամանակի հիման վրա, որպեսզի մատակարարի կողմի ընթերցման սպասման ժամանակները համապատասխանեն ձեր միջավայրի կազմաձևմանը։

Claude Code-ի հետ համատեղելի երրորդ կողմի հակադարձ պրոքսիների համար OmniRoute-ը պահպանում է լռելյայն `anthropic-beta` հավաքածուի պահպանողական կազմաձևումը և, երբ `Client Cache Control`-ը թողնված է `Auto` արժեքով, փոխանցում է միայն հաճախորդի տրամադրած `cache_control` նշիչները։ Յուրաքանչյուր կապի համար նախատեսված «Միացնել redact-thinking beta-ն» փոխարկիչը միացրեք միայն այն դեպքում, երբ վերին հոսքը հստակ պահանջում է Claude-ի խմբագրված մտածողության հոսքեր։

### Սպասման ժամանակի ընդլայնված վերասահմանումներ

| Փոփոխական                                | Լռելյայն արժեք                                   | Նպատակ                                                                                     |
| ---------------------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| `FETCH_TIMEOUT_MS`                       | ժառանգում է `REQUEST_TIMEOUT_MS`-ից              | Վերին հոսքի պատասխանի մեկնարկի սպասման ժամանակը՝ մինչև պատասխանի վերնագրերի ստացումը       |
| `FETCH_HEADERS_TIMEOUT_MS`               | ժառանգում է `FETCH_TIMEOUT_MS`-ից                | Վերին հոսքի պատասխանի վերնագրերն ստանալու համար Undici-ի ժամանակային սահմանաչափը           |
| `FETCH_BODY_TIMEOUT_MS`                  | ժառանգում է `FETCH_TIMEOUT_MS`-ից                | Վերին հոսքի մարմնի հատվածների միջև Undici-ի ժամանակային սահմանաչափը (`0`-ն անջատում է այն) |
| `FETCH_CONNECT_TIMEOUT_MS`               | `30000`                                          | Undici-ի TCP կապի հաստատման սպասման ժամանակը                                               |
| `FETCH_KEEPALIVE_TIMEOUT_MS`             | `4000`                                           | Undici-ի անգործուն keep-alive սոկետի սպասման ժամանակը                                      |
| `TLS_CLIENT_TIMEOUT_MS`                  | ժառանգում է `FETCH_TIMEOUT_MS`-ից                | `wreq-js`-ի միջոցով կատարվող TLS մատնահետքի հարցումների սպասման ժամանակը                   |
| `API_BRIDGE_PROXY_TIMEOUT_MS`            | ժառանգում է `REQUEST_TIMEOUT_MS`-ից կամ `600000` | API պորտից վահանակի պորտ `/v1` պրոքսիային փոխանցման սպասման ժամանակը                       |
| `API_BRIDGE_SERVER_REQUEST_TIMEOUT_MS`   | `max(API_BRIDGE_PROXY_TIMEOUT_MS, 300000)`       | API կամրջակի սերվերում մուտքային հարցման սպասման ժամանակը                                  |
| `API_BRIDGE_SERVER_HEADERS_TIMEOUT_MS`   | `60000`                                          | API կամրջակի սերվերում մուտքային վերնագրերի սպասման ժամանակը                               |
| `API_BRIDGE_SERVER_KEEPALIVE_TIMEOUT_MS` | `5000`                                           | API կամրջակի սերվերում keep-alive-ի սպասման ժամանակը                                       |
| `API_BRIDGE_SERVER_SOCKET_TIMEOUT_MS`    | `0`                                              | API կամրջակի սերվերում սոկետի անգործության սպասման ժամանակը (`0`-ն անջատում է այն)         |

> **Նշում.** Հոսքային հարցումների դեպքում `FETCH_TIMEOUT_MS`-ն ընդգրկում է միայն կապի հաստատումը / վերին հոսքից առաջին պատասխանին սպասելը։ Հոսքն ակտիվանալուց հետո OmniRoute-ը կդադարեցնի այն միայն փաստացի կանգի (`STREAM_IDLE_TIMEOUT_MS`) կամ Undici-ի մարմնի անգործության (`FETCH_BODY_TIMEOUT_MS`) դեպքում։

### Հակադարձ պրոքսիի հետ համատեղելիություն

Եթե OmniRoute-ն աշխատեցնում եք Nginx-ի, Caddy-ի, Cloudflare-ի կամ մեկ այլ հակադարձ պրոքսիի հետևում, համոզվեք, որ պրոքսիի սպասման ժամանակները նույնպես ավելի մեծ են, քան OmniRoute-ի հոսքի/հարցման սպասման ժամանակները։

---

## Առանձին պորտերի ռեժիմ

Ընդլայնված սցենարների համար (հակադարձ պրոքսի, կոնտեյներային ցանց) գործարկեք API-ն և Dashboard-ը տարբեր պորտերով.

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API՝       http://localhost:20128/v1
# Dashboard՝ http://localhost:20129
```

---

## Void Linux-ի (xbps-src) ձևանմուշ

Void Linux-ի օգտատերերը կարող են ստեղծել բնիկ փաթեթ՝ օգտագործելով `xbps-src`-ը։ Պահպանեք այս բլոկը որպես `srcpkgs/omniroute/template`.

```bash
# «omniroute»-ի ձևանմուշի ֆայլ
pkgname=omniroute
version=3.8.0
revision=1
hostmakedepends="nodejs python3 make"
depends="openssl"
short_desc="Universal AI gateway with smart routing for multiple LLM providers"
maintainer="zenobit <zenobit@disroot.org>"
license="MIT"
homepage="https://github.com/diegosouzapw/OmniRoute"
distfiles="https://github.com/diegosouzapw/OmniRoute/archive/refs/tags/v${version}.tar.gz"
# Յուրաքանչյուր թողարկման համար վերստեղծեք ստուգիչ գումարը հետևյալ կերպ.
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

## Ապատեղադրում

| Հրաման                   | Գործողություն                                                                                            |
| ------------------------ | -------------------------------------------------------------------------------------------------------- |
| `npm run uninstall`      | Հեռացնում է համակարգային հավելվածը, սակայն **պահպանում է ձեր DB-ն և կազմաձևումները** `~/.omniroute`-ում։ |
| `npm run uninstall:full` | Հեռացնում է հավելվածը ԵՎ ընդմիշտ **ջնջում է բոլոր կազմաձևումները, բանալիներն ու տվյալների բազաները**։    |

> Բոլոր մեթոդների համար ապատեղադրման մանրամասն հրահանգները տե՛ս [UNINSTALL.md](./UNINSTALL.md) ֆայլում։
