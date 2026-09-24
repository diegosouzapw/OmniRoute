# Remote Mode (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/REMOTE-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/REMOTE-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/REMOTE-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/REMOTE-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/REMOTE-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/REMOTE-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/REMOTE-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/REMOTE-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/REMOTE-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/REMOTE-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/REMOTE-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/REMOTE-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/REMOTE-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/REMOTE-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/REMOTE-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/REMOTE-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/REMOTE-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/REMOTE-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/REMOTE-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/REMOTE-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/REMOTE-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/REMOTE-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/REMOTE-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/REMOTE-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/REMOTE-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/REMOTE-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/REMOTE-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/REMOTE-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/REMOTE-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/REMOTE-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/REMOTE-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/REMOTE-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/REMOTE-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/REMOTE-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/REMOTE-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/REMOTE-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/REMOTE-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/REMOTE-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/REMOTE-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/REMOTE-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/REMOTE-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/REMOTE-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/REMOTE-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/REMOTE-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/REMOTE-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/REMOTE-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/REMOTE-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/REMOTE-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/REMOTE-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/REMOTE-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/REMOTE-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/REMOTE-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/REMOTE-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/REMOTE-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/REMOTE-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/REMOTE-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/REMOTE-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/REMOTE-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/REMOTE-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/REMOTE-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/REMOTE-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/REMOTE-MODE.md)

---

Patakbuhin ang `omniroute` CLI sa iyong laptop habang tumatakbo naman ang OmniRoute sa ibang lugar
(isang VPS, home server, o ibang machine sa iyong Tailnet). Mag-log in nang isang beses gamit ang
`omniroute connect`, at mula noon, **bawat** CLI command ay nakatuon sa remote
server na iyon — parehong mga command, parehong output, ngunit isinasagawa laban sa remote.

Walang pangalawang tool na kailangang i-install: ang remote mode ay ang karaniwang `omniroute` CLI
kasama ang mga **access token** na may saklaw.

```bash
npm install -g omniroute                 # ang karaniwang CLI
omniroute connect 192.168.0.15           # mag-log in (password → token na may saklaw)
omniroute models list                    # ← inililista na ngayon ang mga modelo ng REMOTE server
omniroute configure codex                # ← nagsusulat ng lokal na Codex profile mula sa remote catalog
```

---

## Paano ito gumagana

```
iyong laptop                             remote OmniRoute (VPS)
┌────────────────────┐                   ┌───────────────────────────────┐
│ omniroute CLI      │  POST /api/cli/connect  (password → token)         │
│  konteksto: vps    │ ───────────────►  │ lumilikha ng access token na  │
│  baseUrl, token    │  Authorization: Bearer oma_live_…                  │
│                    │ ───────────────►  │ may saklaw; bawat management   │
│ nagsusulat ng mga  │ ◄───────────────  │ route ay sinusuri ayon sa      │
│ config NANG LOKAL  │                   │ saklaw ng token                │
└────────────────────┘                   └───────────────────────────────┘
```

- Ang mga **konteksto** ay nag-iimbak ng tig-isang server (`~/.omniroute/config.json`, `chmod 600`).
  Inililipat ng `omniroute contexts use <name>` ang aktibong server; lokal ang `default`.
- Ang mga **access token** (`oma_live_…`) ang nagbibigay-pahintulot sa mga management command. Naiiba ang mga ito
  sa mga inference API key (`sk-…`, ginagamit para sa `/v1/chat/completions`).
- Tanging ang SHA-256 hash ng token ang iniimbak sa server. Ipinapakita ang plaintext nang
  **isang beses** lamang, sa paggawa nito.

---

## Pagkonekta

### Gamit ang management password (bootstrap)

```bash
omniroute connect 192.168.0.15
# Management password para sa http://192.168.0.15:20128: ********
# ✔ Nakakonekta sa http://192.168.0.15:20128 — konteksto '192.168.0.15' (saklaw: admin)
```

Ang password flow ay lumilikha ng **admin** token bilang default (hawak mo ang password, kaya
mayroon ka nang ganap na kontrol). Bawasan ang saklaw gamit ang `--scope`:

```bash
omniroute connect 192.168.0.15 --scope write
```

Mga opsyon: `--port <p>` (kapag walang port ang host), `--name <ctx>` (pangalan ng konteksto),
`--scope read|write|admin`. Ginagamit nang walang pagbabago ang buong URL:
`omniroute connect https://omni.example.com`.

### Gamit ang paunang ginawang token

Gumawa ng token na may saklaw sa dashboard (o gamit ang `omniroute tokens create`) at
i-paste ito — hindi kailangan ng password:

```bash
omniroute connect 192.168.0.15 --key oma_live_xxxxxxxx
```

Bine-validate ito ng CLI sa pamamagitan ng `GET /api/cli/whoami` at sine-save bilang aktibong konteksto.

---

## Mga saklaw

Tatlong antas, na may hierarchy (`admin ⊃ write ⊃ read`):

| Saklaw  | Maaaring gawin                                                                              |
| ------- | ------------------------------------------------------------------------------------------- |
| `read`  | maglista/magsiyasat — `models list`, `providers status`, `logs`, `usage`, `cost`            |
| `write` | read **+** mag-configure/mag-apply — `setup-codex`, `keys add`, `config set`, mga combo     |
| `admin` | write **+** mamahala — CRUD ng `tokens`, magdagdag ng mga provider, serbisyo, policy, oauth |

Tinutukoy ng server ang kinakailangang saklaw ng bawat route mula sa HTTP method
(`GET`→read, mutations→write), kasama ang isang admin allowlist para sa mga sensitibong bahagi
(mga mutation sa `/api/cli/tokens`, `/api/providers`, `/api/oauth`, `/api/services`, …).
Ang token na walang sapat na saklaw ay makakatanggap ng `403` na may malinaw na mensahe.

> Ang mga route na nagpapatakbo ng mga proseso (`/api/services/*`, `/api/mcp/*`, …) ay nananatiling
> **loopback-only** — hindi kailanman maa-access ng remote token ang mga ito, anuman ang saklaw.

---

## Pagkonekta sa Antigravity sa isang remote na installation

Ginagamit ng Antigravity ang first-party/native-app na screen ng pahintulot ng Google. Inilalabas lamang ng Google ang authorization code kapag ang **loopback redirect**
(`http://127.0.0.1:<port>/callback`) ay **naaabot mula sa browser na
nag-aapruba sa pag-sign in**. Sa isang remote na installation sa VPS, nasa
server ang loopback na iyon, hindi sa iyong machine, kaya **habambuhay na naghihintay at
hindi kailanman naglalabas ng code** ang screen ng pahintulot — walang
maipe-paste ang karaniwang fallback na "i-paste ang callback URL." (Isa itong
limitasyon sa panig ng Google: nangyayari rin ang parehong paghihintay sa anumang proxy
na gumagamit ng kasamang Antigravity desktop client, hindi lamang sa OmniRoute.)

Nade-detect ito ng dashboard bago ka ma-stuck: kapag binuksan ang **Providers → Antigravity →
Connect** mula sa isang address na hindi localhost, pinapalitan nito ang pangkalahatang abisong "kopyahin ang callback URL"
ng dalawang solusyon sa ibaba, na parehong nakalagay na ang iyong host at port.
(Kabilang dito ang isang LAN address — hindi localhost ang `192.168.x.x` pagdating sa
callback na ito.)

May dalawang sinusuportahang paraan upang ikonekta ang Antigravity sa isang remote na OmniRoute.

### Opsyon A — lokal na login helper (inirerekomenda)

Patakbuhin ang OAuth sa **sarili mong computer**, kung saan naaabot ang `127.0.0.1`. Direktang
nakikipag-ugnayan ang helper sa Google, kaya nakukumpleto ang pahintulot kung saan hindi
ito magawa ng bersyon ng dashboard.

**Kung nakakonekta ka na** (`omniroute connect <host>`), wala kang kailangang
kopyahin — ihahatid ng helper ang credential sa installation na iyon para sa iyo:

```bash
# Sa iyong LOKAL na machine (kailangan ng Node.js + browser):
omniroute connect 192.168.0.15        # isang beses — lumilikha ng admin-scoped na context token
npx omniroute login antigravity
#   ↳ binubuksan ang pahintulot ng Google, kinukuha ang callback sa isang lokal na loopback port,
#     ipinagpapalit ito, at ipinapadala sa pamamagitan ng POST ang credential sa aktibong context:
#
#   Nakakonekta ang Antigravity sa http://192.168.0.15:20128 (koneksyon abc123).
#   Walang kailangang i-paste — maaari mo nang isara ang terminal na ito.
```

Awtomatikong nangyayari ang push kapag nakaturo ang aktibong context sa ibang
machine. Pilitin ito sa alinmang paraan gamit ang `--push` / `--no-push`, o ituon sa isang partikular
na context gamit ang `--context <name>`.

**Kung hindi naaabot ng iyong machine ang VPS** (naka-firewall, walang SSH, air-gapped na desk),
gagana pa rin ang helper — Google lamang ang talagang _kailangan_ nitong maabot. Gamitin ang `--no-push`, o hayaan lang
na mabigo ang push: babalik ito sa pag-print ng blob sa halip na itapon ang
authorization na nakumpleto mo na.

```bash
npx omniroute login antigravity --no-push
#   omniroute-cred-v1.eyJ2IjoxLCJ...
```

Pagkatapos, sa **remote** na dashboard: **Providers → Antigravity → Connect**, at i-paste
ang `omniroute-cred-v1.…` blob sa field na **Step 2** (tumatanggap ito ng alinman sa
callback URL o credential blob). Ide-decode ito ng OmniRoute, patatakbuhin ang Cloud Code
onboarding sa server, at permanenteng ise-save ang koneksyon.

> Naglalaman ang blob ng refresh token — ituring ito na parang password. Sa push path,
> isang beses itong ipinapadala sa pamamagitan ng authenticated na koneksyon ng iyong context; sa paste path, sa pamamagitan ng
> koneksyon ng iyong dashboard. Sa alinmang paraan, naka-encrypt ito habang nakaimbak, at hindi ito
> kailanman ipi-print sa iyong terminal kapag matagumpay ang push.

Mga flag: `--no-browser` (i-print ang URL sa halip na awtomatikong buksan), `--port <n>`
(italaga ang loopback port), `--timeout <ms>`, `--push` / `--no-push` (i-override ang
awtomatikong paghahatid), `--context <name>` (ituon sa isang partikular na context).

### Opsyon B — SSH local-forward tunnel

Kung mayroon kang SSH access sa VPS, i-forward ang dashboard port upang ang
loopback callback ay muling malutas pabalik sa server sa pamamagitan ng tunnel:

```bash
# Sa iyong LOKAL na machine:
ssh -L 20128:127.0.0.1:20128 user@your-vps
# pagkatapos, buksan ang http://localhost:20128 sa iyong LOKAL na browser at ikonekta ang Antigravity
# gaya ng karaniwan — naaabot na ngayon ng 127.0.0.1:20128/callback redirect ang VPS sa pamamagitan ng SSH.
```

Dahil ina-access mo ang dashboard bilang `localhost:20128`, nakukumpleto ang pahintulot ng Google
at naihahatid ang callback sa server sa pamamagitan ng parehong tunnel —
hindi kailangan ng blob. Panatilihing bukas ang tunnel hanggang ipakitang aktibo ang koneksyon.

Hindi tulad ng mga fixed-loopback provider sa ibaba, **sapat na ang isang forward** dito: ginagamit
ng Antigravity callback ang dashboard port mismo, kaya walang pangalawang
port na partikular sa provider na kailangang i-tunnel.

> Ang isang ganap na headless na alternatibo (walang helper, walang tunnel) ay ang pag-configure ng **sarili mong**
> Google OAuth web credentials + isang pampublikong base URL; tingnan ang mga OAuth
> environment variable ng provider. Hindi nangangailangan ng karagdagang Google setup ang dalawang opsyon sa itaas.

---

## Pagkonekta ng Codex / Grok sa isang remote na pag-install (mga provider na may nakapirming loopback)

Nagrerehistro ang Codex, xAI (`xai-oauth`), at Grok CLI (`grok-cli`) ng isang
**nakapirming** loopback na `redirect_uri` sa kanilang upstream na OAuth app. Hindi
ito mababago ng OmniRoute — palaging ibinabalik ng provider ang browser sa parehong
hardcoded na address:

| Provider    | Nakapirming callback kung saan nagre-redirect ang provider |
| ----------- | ---------------------------------------------------------- |
| `codex`     | `http://localhost:1455/auth/callback`                      |
| `xai-oauth` | `http://127.0.0.1:56121/callback`                          |
| `grok-cli`  | `http://127.0.0.1:56122/callback`                          |

Ang `localhost` dito ay nangangahulugang **ang machine kung saan tumatakbo ang
browser**, samantalang nakikinig ang PKCE callback server ng OmniRoute sa loopback
ng **server**. Buksan ang dashboard sa isang LAN address gaya ng
`http://192.168.0.15:20128` at hindi kailanman magtatagpo ang dalawa: ihahatid ang
authorization code sa `localhost:1455` ng sarili mong laptop, kung saan walang
nakikinig, at mabibigo ang provider sa pag-sign in nang hindi nagpapakita ng error.

Natutukoy ito ng dashboard bago buksan ang popup at ipinapakita ang tunnel command
sa halip na hayaang tahimik na mabigo ang pag-login (#8046).

### Solusyon — i-forward ang **parehong** port

```bash
# Sa machine kung saan tumatakbo ang BROWSER:
ssh -L 20128:127.0.0.1:20128 -L 1455:127.0.0.1:1455 <user>@192.168.0.15
# pagkatapos ay pumunta sa http://localhost:20128 at ikonekta ang Codex mula roon
```

Kinakailangan ang dalawang forward, at mabibigo pa rin kung isa lang ang
i-forward:

- Ginagawa ng **`20128`** (ang dashboard port) na tunay na localhost ang origin,
  na siyang dahilan kung bakit sinisimulan ng OmniRoute ang PKCE callback server —
  hindi kailanman naaabot ng LAN origin ang branch na iyon.
- Ang **`1455`** (ang nakapirming callback port ng provider) ang pinagbabalikan ng
  browser; kailangan itong dumaan sa tunnel patungo sa loopback ng server.

Palitan ang `1455` ng `56121`/`56122` kapag kumokonekta sa xAI o Grok CLI, at ang
`20128` ng aktuwal mong dashboard port. Panatilihing bukas ang tunnel hanggang
ipakitang aktibo ang koneksyon.

> **Walang SSH access?** Tumatanggap din ang Codex at Grok CLI ng ini-paste na token —
> ang tab na **I-paste ang API Key** / **I-import ang auth.json** sa dialog ng
> pagkonekta. Walang loopback callback ang paraang iyon, kaya gumagana ito mula sa
> anumang origin. Tumatanggap din ang Codex ng bare access token o ng
> `~/.codex/auth.json` session blob.

---

## Pamamahala ng mga token

```bash
omniroute tokens create --name "laptop" --scope write [--expires 30]
#   ↳ ISANG BESES lang ipi-print ang secret — kopyahin ito ngayon
omniroute tokens list                 # naka-mask: id, pangalan, scope, prefix, status, expiry
omniroute tokens revoke <id|prefix>   # bawiin kaagad
omniroute tokens scopes               # ipaliwanag ang tatlong scope
```

Nangangailangan ang mga command na `tokens` ng **admin** credential. Maaari mo ring
pamahalaan ang mga token sa dashboard sa ilalim ng **Settings → Access Tokens**
(gumawa, mag-revoke, kopyahin nang isang beses).

---

## Pag-configure ng coding CLI mula sa remote catalog

Binabasa ng `omniroute configure` ang live model catalog ng **aktibong server** at
nagsusulat ng config sa **iyong** machine.

```bash
omniroute configure codex
#   Mga provider: glm, kmc, ollamacloud, opencode-go, …
#   Provider: glm
#   Model id: glm/glm-5.2
#   ✔ Isinulat ang ~/.codex/glm52.config.toml
#   Gamitin ito:  codex --profile glm52

# hindi interactive
omniroute configure codex --provider glm --model glm/glm-5.2 --name glm52

# panatilihin sa itaas ng interactive picker ang isang madalas gamiting model
omniroute configure codex --provider glm --model glm/glm-5.2 --favorite --yes
```

Mga model ID lamang ang pinapanatili ng picker (hindi kailanman mga URL o
credential) sa lokal na file na `model-preferences.json`, na naka-scope ayon sa
context at CLI target. Ipinapakita ang mga paborito bago ang mga kamakailang
pinili; gamitin ang `--unfavorite` upang alisin ang napiling model mula sa listahan
ng context/target na iyon.

Tinutukoy ng isinulat na profile ang inference key sa pamamagitan ng env var
(`OMNIROUTE_API_KEY`) — hindi kailanman isinusulat sa disk ang secret. Para sa
isang beses na base setup ng Codex (ang block na `[model_providers.omniroute]`),
tingnan ang [CODEX-CLI-CONFIGURATION.md](./CODEX-CLI-CONFIGURATION.md).

### Paglunsad ng CLI laban sa remote (walang isinusulat na config)

Sinusunod din ng `omniroute run <target>` ang aktibong context: ang remote base URL
at context credential ay ini-inject lamang sa inilulunsad na process.

```bash
omniroute connect 192.168.0.15
omniroute run claude   --model openai/gpt-5.4          # Claude Code → remote
omniroute run gemini   --model glm/glm-5.2 -- --skip-trust -p "hello"
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"

# I-preview nang eksakto kung ano ang ilulunsad (mga PANGALAN lang ng env KEY, hindi kailanman mga value):
omniroute run codex --dry-run --json
```

Mga target: `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen`, `gemini`
(iisang source: `bin/cli/cli-manifest.mjs`). Tumatakbo ang Qwen at Gemini gamit
ang pansamantalang nakahiwalay na home na inaalis kapag lumabas, kaya hindi
kailanman nagagalaw ng paglunsad — o natatagasan papunta rito — ang personal mong
configuration ng tool.

### Mga setup command para sa bawat CLI

May remote-aware na setup command ang bawat sinusuportahang CLI (sinusunod ng lahat
ang aktibong context, o ang `--remote <url> --api-key <key>`):

| CLI         | Command                    | Isinusulat nito                                                                                                                                                                                        |
| ----------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Codex       | `omniroute setup-codex`    | Mga profile na `~/.codex/<name>.config.toml` (bawat modelo)                                                                                                                                            |
| Claude Code | `omniroute setup-claude`   | `~/.claude/profiles/<name>/settings.json` (bawat modelo)                                                                                                                                               |
| OpenCode    | `omniroute setup-opencode` | `~/.config/opencode/opencode.json` — ang openai-compatible provider na `omniroute` kasama ang bawat modelo sa catalog (patakbuhin ang `opencode -m omniroute/<model>`)                                 |
| Cline       | `omniroute setup-cline`    | `~/.cline/data/{globalState,secrets}.json` (CLI mode) + inilalabas ang mga setting ng VS Code extension na idi-dikit (OpenAI-compatible, Base URL na **walang** `/v1`)                                 |
| Kilo Code   | `omniroute setup-kilo`     | `~/.local/share/kilo/auth.json` (CLI) + mga setting ng VS Code na `kilocode.*` — OpenAI-compatible, Base URL na **may** `/v1`                                                                          |
| Continue    | `omniroute setup-continue` | `~/.continue/config.yaml` (VS Code/JetBrains + `cn` CLI) — `provider: openai`, `apiBase` na **may** `/v1`, key sa pamamagitan ng `${{ secrets.OMNIROUTE_API_KEY }}`                                    |
| Cursor      | `omniroute setup-cursor`   | inilalabas ang mga hakbang sa app (Settings → Models → Override OpenAI Base URL na **may** `/v1` + key + modelo). Opaque SQLite ang config ng Cursor — chat panel lang                                 |
| Roo Code    | `omniroute setup-roo`      | nagsusulat ng Roo import JSON (`~/.omniroute/roo-settings.json`) + itinatakda ang `roo-cline.autoImportSettingsPath` + inilalabas ang mga hakbang sa UI (OpenAI-compatible, Base URL na **may** `/v1`) |
| Crush       | `omniroute setup-crush`    | `~/.config/crush/crush.json` — `openai-compat` provider, `base_url` na **may** `/v1`, key sa pamamagitan ng `$OMNIROUTE_API_KEY`                                                                       |
| Goose       | `omniroute setup-goose`    | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER=openai` + `OPENAI_HOST` na **walang** `/v1` + `GOOSE_MODEL`) + recipe para sa env                                                                       |
| Aider       | `omniroute setup-aider`    | `~/.aider.conf.yml` (`openai-api-base` na **walang** `/v1` + `model: openai/<id>`) + recipe para sa env (`aider --message --yes`)                                                                      |
| Qwen Code   | `omniroute setup-qwen`     | V4 entry na `modelProviders.openai` sa `~/.qwen/settings.json` + `OMNIROUTE_API_KEY` sa `~/.qwen/.env`                                                                                                 |

```bash
# OpenCode (openai-compatible provider, lahat ng modelo sa catalog, remote VPS)
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute setup-opencode --only glm,kimi        # panatilihin lamang ang mga tumutugmang modelo
opencode -m omniroute/glm/glm-5.2 "..."          # i-export muna ang OMNIROUTE_API_KEY
```

> Mayroon ding mas mayamang integrasyong **plugin** ang OpenCode: `omniroute setup opencode`
> (sinusuportahan na ngayon ang remote sa pamamagitan ng `--remote`) na nag-i-install ng `@omniroute/opencode-plugin`.
> Ang `setup-opencode` ang magaan na openai-compatible na alternatibo. Isinasangguni ang API key
> sa pamamagitan ng `{env:OMNIROUTE_API_KEY}` — hindi kailanman isinusulat sa disk.
>
> Sa OpenCode v2, gamitin sa halip ang `@omniroute/opencode-plugin-v2`: parehong catalog,
> ibang loader contract. Binabasa nito ang key mula sa sariling credential
> store ng OpenCode kapag nakakonekta ang integration, kaya hindi kailangan ng remote gateway ng key sa
> `opencode.json`.

---

## Pamamahala ng mga context (paglipat sa pagitan ng mga server)

Ang **context** ay isang naka-save na server (baseUrl + credential + scope). Gumagawa ang `omniroute connect`
ng isa at ginagawa itong aktibo; mula noon, dito nakatuon ang bawat command. Pamahalaan at
lumipat sa pagitan ng mga ito gamit ang `omniroute contexts`:

```bash
omniroute contexts list            # lahat ng context; minamarkahan ng ● ang aktibo
omniroute contexts current         # ang aktibong server, status ng auth, scope
```

```text
  | Pangalan | Base URL                  | Auth  | Scope | Paglalarawan
● | vps      | http://100.67.86.91:20128 | token | admin | Malayuang OmniRoute (…)
  | default  | http://localhost:20128    | ✗     |       |
```

**Lumipat ng mga server** — sinusunod ng bawat susunod na command ang aktibong context:

```bash
omniroute contexts use vps         # → lahat ng command ay ipinapadala na ngayon sa malayuang VPS
omniroute tokens list              #   (tumatakbo laban sa VPS)

omniroute contexts use default     # → bumalik sa localhost
omniroute tokens list              #   (tumatakbo laban sa lokal na server)
```

**Manu-manong magdagdag ng context** (sa halip na `connect`), siyasatin, o palitan ang pangalan:

```bash
omniroute contexts add staging --url https://staging.example.com:20128 \
  --access-token oma_live_xxxx --scope write --description "staging na makina"
omniroute contexts show staging    # kumpletong detalye para sa isang context
omniroute contexts rename staging stg
```

**Mag-alis ng context** — hihingi ng kumpirmasyon; ipasa ang `--yes` upang laktawan ito
(kinakailangan para sa mga script / non-interactive shell, na kung hindi ay ligtas na tatanggi):

```bash
omniroute contexts remove stg --yes
```

> Hindi maaaring alisin ang `default` (localhost). Kapag inalis ang aktibong context, babalik
> ito sa `default`. Tip: ang pag-aalis ng context ay nagtatanggal lamang ng **lokal** na naka-save na credential —
> i-revoke ang token sa server gamit ang `omniroute tokens revoke <id>` upang talagang
> alisin ang access.

**I-export / i-import** ang mga context (hal. upang ilipat ang mga ito sa pagitan ng mga makina). Ang mga bagong context ay
nagpapanatili lamang ng keychain reference; hindi kinokopya ang mga credential sa export kapag available
ang keychain ng OS:

```bash
omniroute contexts export --out contexts.json     # default: stdout
omniroute contexts import contexts.json            # i-overwrite; --merge upang panatilihin ang mga kasalukuyan
omniroute contexts migrate --yes                  # ilipat ang mga legacy plaintext token sa keychain
```

Sa mga headless system na walang magagamit na keychain ng OS, babalik ang CLI sa
`config.json` na may mode na `0600` at magpi-print ng isang beses na babala. Ituring ang mga export mula
sa fallback na iyon (at anumang legacy config bago ang migration) bilang lihim na materyal.

---

## Mabilis na end-to-end na pagsusuri

Isang lifecycle na maaaring i-copy-paste upang beripikahin mula sa simula ang isang malayuang setup — kumonekta, gumawa ng
scoped token, mag-route ng command, bumalik, at maglinis. Palitan ang
`192.168.0.15` ng host/IP ng iyong server (Tailscale, LAN, o pampublikong
`https://…` URL).

```bash
# 1. Kumonekta (password → admin token, sine-save bilang context na nagiging aktibo)
omniroute connect 192.168.0.15                 # o: --key oma_live_xxxx  (walang password)
omniroute contexts current                     # ipinapakita ang malayuang server + scope

# 2. Gamitin ito — tumatakbo na ngayon ang mga management command laban sa malayuang server
omniroute tokens create --name laptop --scope read   # gumawa ng token na may mas limitadong scope
omniroute tokens list                                 # naka-mask na listahan, mula sa malayuang server

# 3. Magpalipat-lipat
omniroute contexts use default                 # → lokal
omniroute contexts use 192-168-0-15            # → malayuan muli (pangalan mula sa `contexts list`)

# 4. Maglinis. TANDAAN: ang `contexts remove` ay nagtatanggal lamang ng LOKAL na credential —
#    HINDI nito nire-revoke ang token sa server. I-revoke muna ito sa server kung nais mong
#    talagang alisin ang access.
omniroute tokens revoke <id|prefix>            # inaalis ang access sa server
omniroute contexts remove 192-168-0-15 --yes   # alisin ang lokal na context (kahit aktibo → babalik sa default), walang prompt
```

> Ginagawang non-interactive ng `--yes` ang `contexts remove` (kinakailangan sa mga script/CI; kung wala
> ito, ligtas na tatanggi ang isang non-interactive shell sa halip na manatiling naghihintay). Kapag inalis ang
> **aktibong** context, awtomatiko itong babalik sa `default`.

---

## Mga tala sa seguridad

- Isang beses lamang ipinapakita ang plaintext ng token; tanging ang SHA-256 hash ang permanenteng sine-save (katulad ng mga API key).
- Muling ginagamit ng `omniroute connect` ang brute-force lockout at audit logging para sa pag-login.
- Mas mainam na gumamit ng HTTPS o Tailnet para sa transport; nagde-default sa `http://`
  ang isang host na walang protocol para sa kaginhawahan sa LAN/Tailscale — magpasa ng buong `https://…` URL para sa TLS.
- Ang inirerekomendang lokal na context file ay `~/.omniroute/config.json` (`chmod 600`)
  na naglalaman lamang ng `credentialRef`; ang token mismo ay nakaimbak sa OS
  keychain (`keytar`) at hindi kailanman ipinapakita sa mga log. Ginagamit ng mga headless install na walang
  gumaganang native keychain ang parehong `0600` file bilang tahasang fallback at
  isang beses na naglalabas ng babala. Gamitin ang `omniroute contexts migrate --yes` pagkatapos mag-install ng
  keychain backend.

---

## Mga API endpoint (sanggunian)

| Paraan | Ruta                  | Awtorisasyon           | Saklaw                            |
| ------ | --------------------- | ---------------------- | --------------------------------- |
| POST   | `/api/cli/connect`    | password sa pamamahala | — (pampubliko, may password gate) |
| GET    | `/api/cli/whoami`     | access token           | pagbasa                           |
| GET    | `/api/cli/tokens`     | access token           | admin                             |
| POST   | `/api/cli/tokens`     | access token           | admin                             |
| DELETE | `/api/cli/tokens/:id` | access token           | admin                             |

Tingnan ang [openapi.yaml](../openapi.yaml) para sa mga kumpletong schema.
