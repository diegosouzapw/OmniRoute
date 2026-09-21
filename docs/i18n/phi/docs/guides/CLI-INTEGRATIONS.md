# CLI Integrations (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇪🇹 [am](../../../am/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇷 [el](../../../el/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇪 [et](../../../et/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇪 [ga](../../../ga/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ha](../../../ha/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇷 [hr](../../../hr/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇲 [hy](../../../hy/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ig](../../../ig/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇪 [ka](../../../ka/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇭 [km](../../../km/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [kn](../../../kn/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇹 [lt](../../../lt/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇻 [lv](../../../lv/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ml](../../../ml/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇹 [mt](../../../mt/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇲 [my](../../../my/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇵 [ne](../../../ne/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [or](../../../or/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [pa](../../../pa/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇰 [si](../../../si/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇮 [sl](../../../sl/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇸 [sr](../../../sr/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇿 [uz](../../../uz/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [yo](../../../yo/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

Ang OmniRoute ay may pamilya ng mga command na `setup-*` na nagko-configure ng isang coding
CLI (Codex, Claude Code, OpenCode, Cline, …) upang gamitin ang OmniRoute bilang backend nito — kaya
nakikipag-ugnayan ang tool sa **iisang** endpoint at niruruta ng OmniRoute ang kahilingan sa tamang provider na may
awtomatikong fallback. Binabasa ng bawat command ang **live** na katalogo ng modelo mula sa tumatakbong
OmniRoute (lokal o remote) at isinusulat ang sariling config file ng tool sa **iyong**
machine. Tinutukoy ang API key sa pamamagitan ng environment variable saanman ito
sinusuportahan ng tool. Ang mga command na nagpapanatili ng tool-local na environment file ay nakatala sa ibaba.

Mayroon ding generic na launcher — `omniroute run <target>` — na nagpapatakbo ng
`claude`, `codex`, `aider`, `goose`, `opencode`, `qwen` o `gemini` na may
tamang env na naka-inject, nang hindi nagsusulat ng anumang config. Ang mga target at ang kanilang
mga alias ay nagmumula sa canonical manifest na `bin/cli/cli-manifest.mjs`
(`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`,
`open-code`, `qwen-code`, `gemini-cli`), at nag-aalok ang `omniroute completion` ng
parehong mga target na salita na nagmula sa manifest. Ang mga legacy na launcher para sa bawat tool —
`omniroute launch` (Claude Code) at `omniroute launch-codex` (Codex) — ay nananatiling
available.

Available rin ang onboarding ng provider mula sa parehong lokal/remote na konteksto. Pinananatiling
hiwalay ng mga API-first na command sa ibaba ang authentication para sa pamamahala mula sa mga credential
ng provider at hindi kailanman nagpi-print ng credential sa structured output:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

Para sa mga script, mas piliin ang `--credential-stdin` o `--credential-env`; pinanatili ang `--credential`
para sa kontroladong lokal na paggamit. Kinakailangan ng `providers remove` ang `--yes` sa isang
non-interactive na terminal, at sinusunod ng lahat ng limang command ang aktibong konteksto o ang
mga global na option na `--base-url`/`--api-key`.

Para sa minsanan at manu-manong base setup ng dalawang integrasyong may pinakamaraming feature, tingnan ang
mga detalyadong gabay para sa bawat tool:

- [Configuration ng Claude Code](./CLAUDE-CODE-CONFIGURATION.md)
- [Configuration ng Codex CLI](./CODEX-CLI-CONFIGURATION.md)
- [Remote Mode](./REMOTE-MODE.md) — kontrolin ang isang remote na OmniRoute (VPS / Tailnet) mula sa iyong laptop
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — ang OmniCopilot extension; maaari rin nitong patakbuhin ang mga
  command na `setup-*` para sa iyo mula mismo sa loob ng editor

---

## Pangunahing talahanayan

Sinusunod ng bawat command ang **aktibong konteksto** (itinakda gamit ang `omniroute connect`, tingnan ang
[Remote Mode](./REMOTE-MODE.md)) o ang mga tahasang flag na `--remote <url> --api-key <key>`.
Ang ibig sabihin ng "Lokal kumpara sa remote" sa ibaba ay: kapag walang mga flag, tina-target nito ang `http://localhost:20128`;
kapag may `--remote` (o aktibong remote na konteksto), kinukuha nito ang katalogo mula sa
server na iyon at lokal na isinusulat ang config.

| Command                    | Tool                         | Isinusulat nito                                                                                                                                                                                   | Mga pangunahing flag                                                                                                                       | Lokal vs remote |
| -------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | --------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI             | `~/.codex/<name>.config.toml` — isang profile para sa bawat katugmang text model (`codex --profile <name>`)                                                                                       | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | Pareho          |
| `omniroute setup-claude`   | Claude Code                  | `~/.claude/profiles/<name>/settings.json` — isang profile para sa bawat katugmang model (`CLAUDE_CONFIG_DIR`)                                                                                     | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | Pareho          |
| `omniroute setup-opencode` | OpenCode (openai-compatible) | `~/.config/opencode/opencode.json` — `omniroute` provider na may bawat model sa catalog (`opencode -m omniroute/<model>`)                                                                         | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | Pareho          |
| `omniroute setup-cline`    | Cline                        | `~/.cline/data/{globalState,secrets}.json` (CLI mode) + ipinapakita ang mga setting ng VS Code extension                                                                                          | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | Pareho          |
| `omniroute setup-kilo`     | Kilo Code                    | `~/.local/share/kilo/auth.json` (CLI) + pinagsasama ang `kilocode.*` sa `settings.json` ng VS Code kung mayroon                                                                                   | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | Pareho          |
| `omniroute setup-continue` | Continue / `cn` CLI          | `~/.continue/config.yaml` — mga model na may `provider: openai`, key sa pamamagitan ng `${{ secrets.OMNIROUTE_API_KEY }}`                                                                         | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Pareho          |
| `omniroute setup-cursor`   | Cursor                       | Wala — ipinapakita ang mga hakbang sa loob ng app (opaque na SQLite ang config ng Cursor)                                                                                                         | `--remote` `--api-key` `--only` `--port`                                                                                                   | Pareho          |
| `omniroute setup-roo`      | Roo Code                     | `~/.omniroute/roo-settings.json` (dokumento sa pag-import) + itinatakda ang `roo-cline.autoImportSettingsPath` kung may `settings.json` ng VS Code                                                | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | Pareho          |
| `omniroute setup-crush`    | Crush                        | `~/.config/crush/crush.json` — `openai-compat` provider, key sa pamamagitan ng `$OMNIROUTE_API_KEY`                                                                                               | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Pareho          |
| `omniroute setup-goose`    | Goose                        | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + ipinapakita ang recipe para sa env                                                                                 | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Pareho          |
| `omniroute setup-aider`    | Aider                        | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + ipinapakita ang recipe para sa env                                                                                               | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Pareho          |
| `omniroute setup-qwen`     | Qwen Code                    | `~/.qwen/settings.json` — V4 `modelProviders.openai` array + `OMNIROUTE_API_KEY` sa `~/.qwen/.env`                                                                                                | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | Pareho          |
| `omniroute setup-5dive`    | 5dive (fleet ng mga agent)   | Wala sa ilalim ng `$HOME` — nagsusulat ng **auth profile** ng 5dive (`/var/lib/5dive/auth-profiles/<name>/`) sa pamamagitan ng `5dive agent auth set`; para lang sa root, tumatakbo sa fleet host | `--remote` `--api-key` `--model` `--auth-profile` `--agent` `--byo-provider` `--fivedive-bin` `--no-sudo` `--yes` `--dry-run` `--port`     | Pareho          |
| `omniroute run <target>`   | Runtime launch (generic)     | Wala — pinapagana ang `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini` gamit ang tamang env at mga argument; gumagamit ang Qwen at Gemini ng pansamantalang nakahiwalay na home        | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | Pareho          |
| `omniroute launch`         | Claude Code                  | Wala — pinapagana ang `claude` na may naka-inject na `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN`                                                                                                  | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | Pareho          |
| `omniroute launch-codex`   | OpenAI Codex CLI             | Wala — pinapagana ang `codex` na may naka-inject na `omniroute` provider sa pamamagitan ng mga `-c` flag                                                                                          | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | Pareho          |

Mga tala tungkol sa mga flag (beripikado sa source ng command):

- `--remote <url>` — kunin ang catalog mula sa isang remote na OmniRoute (ino-override ang `--port`
  at ang aktibong context). Ibinibigay ng `--api-key <key>` ang credential para sa
  server na iyon (ang default ay ang `OMNIROUTE_API_KEY` env var, o ang token ng aktibong context).
- `--only <patterns>` — mga substring na pinaghihiwalay ng kuwit; panatilihin lamang ang mga model ID na tumutugma
  (hal. `--only glm,kimi`). Available sa `setup-codex`, `setup-claude`,
  `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`.
- `--dry-run` — i-print nang eksakto kung ano ang isusulat nang hindi binabago ang
  filesystem. Available sa bawat `setup-*` command **maliban sa** `setup-cursor`
  (na hindi kailanman nagsusulat ng file).
- `--model <id>` — kinakailangan (o pinipili nang interactive) para sa mga tool na walang
  awtomatikong pagtuklas ng model: Cline, Kilo, Roo, Goose, Qwen, Aider, 5dive. Tinatanggap din ng mga tool na iyon
  ang `--yes` para sa mga non-interactive na pagpapatakbo (na nangangailangan naman ng `--model`).
  Tinatanggap ng `setup-opencode` ang `--model` upang itakda ang default na top-level model.
- Ang `--model <id>` sa `omniroute run` ay sumusunod sa per-target na wiring ng manifest
  (`bin/cli/cli-manifest.mjs`): tumatanggap ang **aider** ng `--model openai/<id>` at
  ang **opencode** ng `--model omniroute/<id>` (idinadagdag lamang ang prefix kapag wala pa ito
  sa id); natatanggap ng **qwen** at **gemini** ang id nang walang pagbabago;
  nakukuha ito ng **claude** sa pamamagitan ng `ANTHROPIC_MODEL`, ng **goose** sa pamamagitan ng `GOOSE_MODEL`, at
  ng **codex** sa pamamagitan ng mga arg na `-c model_providers.omniroute.*`. **Ang Qwen lang ang run
  target na mahigpit na nangangailangan ng `--model`** — ang `omniroute run qwen` na wala nito ay nag-e-exit
  nang may `2` at tahasang error.
- `--port <port>` — lokal na OmniRoute port (default na `20128`, binabalewala kapag nakatakda ang `--remote`).
  Nasa lahat ng `setup-*` at sa parehong launcher.
- Mga exit code ng `omniroute run`: ang sariling exit code ng child CLI ay ipinapasa
  nang walang pagbabago; `2` = mga hindi wastong argument (hindi suportadong target, nawawalang kinakailangang
  `--model`, container guard); `127` = wala sa `PATH` ang target binary;
  `130`/`143`/`129` kapag tinapos ang paglulunsad ng `SIGINT`/`SIGTERM`/`SIGHUP`;
  `1` = iba pang runtime launch failure.
- Tinatanggap ng dalawang launcher (`launch`, `launch-codex`) ang `--profile <name>` upang pumili
  ng profile na isinulat ng `setup-claude` / `setup-codex`, kasama ang mga pass-through arg para sa
  pinagbabatayang `claude` / `codex` binary.

Pareho ring interactive picker ang ginagamit ng mga setup recipe:

```bash
# Pumili mula sa aktibong lokal o remote na model catalog at i-configure ang target.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

Kasalukuyang ipinapasa ng `configure` ang gawain sa mga nasubok na recipe para sa `codex`, `claude`,
`opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, `kilo`, at `5dive`.
Ang mga entry sa catalog na para lamang sa IDE,
MITM, at gabay ay nananatiling mga tahasang `setup-*`/manwal na flow at
hindi ipinapakita bilang mga target na maaaring ilunsad.

> Ang `setup-opencode` ay ang **magaan na openai-compatible** na integrasyon ng OpenCode.
> Mayroon ding mas mayamang plugin integration — `omniroute setup opencode` — na
> nag-i-install ng `@omniroute/opencode-plugin`. Magkaiba ang mga command na ito; idinodokumento ng talahanayan
> sa itaas ang `setup-opencode`.
>
> May dalawang package ang plugin, isa para sa bawat pangunahing bersyon ng OpenCode, dahil magkaibang
> entrypoint ang inaasahan ng dalawang loader:
> `@omniroute/opencode-plugin` para sa OpenCode v1 at
> `@omniroute/opencode-plugin-v2` para sa OpenCode v2. Bago ang v2 package
> (`0.1.0`) at sumusunod ito sa isang host contract na patuloy pang nagbabago, kaya binabasa nito ang
> anyong inilalagay ng OpenCode sa draft ng catalog sa halip na magpalagay ng isa. I-install
> ito sa pamamagitan ng pagdaragdag ng `plugins` entry sa `opencode.json`; ini-install pa rin ng `omniroute setup opencode`
> ang v1 package. Nasa README ng package ang mga opsyon at ang pagkakasunod-sunod ng paghahanap ng credential.

---

## Lokal na paggamit

Kapag tumatakbo ang OmniRoute sa `localhost:20128`, patakbuhin lang ang setup command para sa iyong tool. Kinukuha ang catalog mula sa lokal na server.

```bash
# Codex: magsulat ng isang profile para sa bawat tumugmang model sa ~/.codex/
omniroute setup-codex
codex --profile glm52            # gumamit ng nabuong profile

# Claude Code: magsulat ng mga profile para sa bawat model, pagkatapos ay maglunsad ng isa
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: isulat ang provider na compatible sa openai kasama ang lahat ng model sa catalog
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # nire-reference sa pamamagitan ng {env:OMNIROUTE_API_KEY}, hindi kailanman nasa disk
opencode -m omniroute/glm/glm-5.2 "..."

# Kailangan ng tahasang model ang mga tool na walang auto-discovery:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# Mag-preview nang walang isinusulat:
omniroute setup-continue --dry-run
```

Maglunsad nang hindi nagsusulat ng anumang config (env-injection lamang):

```bash
omniroute launch                 # Claude Code → lokal na OmniRoute
omniroute launch-codex           # Codex CLI → lokal na OmniRoute
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# Tahasang path ng command: ipasa nang walang pagbabago ang anumang kasunod ng --
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## Malayuang paggamit

Ituro ang anumang setup command sa isang malayuang OmniRoute gamit ang `--remote` + `--api-key`. Kinukuha ang catalog mula sa remote; isinusulat ang config sa iyong lokal na machine.

```bash
# OpenCode laban sa isang malayuang VPS, panatilihin lamang ang mga glm/kimi model
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # i-export muna ang OMNIROUTE_API_KEY

# Mga Codex profile mula sa isang malayuang catalog
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# Direktang maglunsad ng CLI laban sa remote
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

Sa halip na ipasa ang `--remote`/`--api-key` sa bawat pagkakataon, mag-log in nang isang beses at hayaang awtomatikong ibigay ng **aktibong context** ang mga ito:

```bash
omniroute connect 192.168.0.15        # lumilikha ng scoped token at iniimbak ang context
omniroute setup-codex                 # ← ginagamit na ngayon ang malayuang catalog
omniroute setup-opencode              # ← gayundin
omniroute launch                      # ← Claude Code laban sa remote
```

Tingnan ang [Remote Mode](./REMOTE-MODE.md) para sa mga context, scope, at pamamahala ng token.

---

## Mga fleet ng 5dive agent

Ang [5dive](https://5dive.ai) ay nagpapatakbo ng fleet ng mga coding agent na matagal tumatakbo, na ang bawat isa ay isang systemd unit sa ilalim ng sarili nitong Unix user. Hindi ito isang coding CLI, kaya walang mailulunsad ang `omniroute run` — ang `5dive` ay isang target na **configure-only**.

```bash
omniroute configure 5dive --model failover-demo --yes
omniroute setup-5dive --model failover-demo --auth-profile omniroute --agent worker1
```

Ang dalawang anyo ay parehong nagsusulat ng isang **auth profile** ng 5dive, at pagkatapos ay kumokonekta sa OmniRoute ang bawat `claude` seat na nakatali sa profile na iyon. Tatlong bagay ang natatangi sa target na ito:

- **Tumatakbo ito sa fleet host bilang root.** Kumikilos ang mga verb ng 5dive sa mga lokal na systemd unit at sa isang state dir na pag-aari ng root; walang remote mode. Muling pinapatakbo ng recipe ang sarili nito sa pamamagitan ng `sudo` kapag hindi pa ito root (`--no-sudo` ang nag-o-off nito at sa halip ay nagpi-print ng command).
- **Dapat ay `https://` ang endpoint maliban kung loopback ito.** Sumasama ang API key ng agent sa URL na iyon sa bawat request, at hindi tinatanggap ng 5dive ang isang plaintext na endpoint sa labas ng machine. Hindi eksepsiyon ang isang pribadong LAN address.
- **Mas mataas ang priyoridad ng sariling model pin ng bawat seat kaysa sa profile.** Taglay ng profile ang `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL`, ngunit ang isang seat na naka-pin pa rin sa stock model id ay mabibigo sa unang turn nito na may _"There's an issue with the selected model"_. Ipasa ang `--agent <name>` (maaaring ulitin) upang i-pin din ang mga seat; ipi-print ng recipe ang command kapag hindi mo ito ginawa.

Ipinapasa ang API key sa 5dive sa pamamagitan ng **stdin** (`--api-key=-`), kaya hindi ito kailanman lumilitaw sa output ng `ps`.

Ang pagtutok ng profile sa isang **combo** ng OmniRoute sa halip na sa iisang model ang nagbibigay sa fleet ng provider failover: nang tuluyang bumagsak ang pangunahing endpoint sa kalagitnaan ng turn sa run na naitala sa [#11578](https://github.com/diegosouzapw/OmniRoute/issues/11578), tinapos ng agent ang mga natitirang hakbang nito gamit ang fallback at hindi kailanman inilantad ang outage.

---

## Mga kumbensiyon sa Base URL (kung aling mga tool ang nangangailangan ng `/v1`)

Inilalantad ng OmniRoute ang OpenAI surface sa `/v1`, ang Anthropic surface sa root,
at ang native Gemini surface sa `/v1beta`. Ang bawat integrasyon ay naka-wire sa anyong
inaasahan ng tool nito (na-verify sa source ng command):

| Integrasyon                                                                | Isinusulat na Base URL | `/v1`?                                                    |
| -------------------------------------------------------------------------- | ---------------------- | --------------------------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | root                   | Hindi — idinadagdag ng Cline ang `/v1/chat/completions`   |
| `setup-goose` (`OPENAI_HOST`)                                              | root                   | Hindi — idinadagdag ng Goose ang path                     |
| `setup-aider` (`OPENAI_API_BASE`)                                          | root                   | Hindi — idinadagdag ng LiteLLM ang `/v1/chat/completions` |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | may `/v1`              | Oo                                                        |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | root                   | Hindi — idinadagdag ng Claude Code ang `/v1/messages`     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | may `/v1`              | Oo                                                        |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | may `/v1`              | Oo                                                        |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | root                   | Hindi — idinadagdag ng SDK ang `/v1beta/models/…`         |
| `setup-5dive` (`ANTHROPIC_BASE_URL` sa auth profile)                       | root                   | Hindi — idinadagdag ng Claude Code ang `/v1/messages`     |

---

## Pagpapanatili ng mga native dep sa pag-update: `--include=optional`

Kapag nag-update ka gamit ang `omniroute update` (pagkatapos magkumpirma, o gamit ang `--apply`),
pinapatakbo ng OmniRoute ang pag-install na may nakapaloob nang `--include=optional`:

```bash
npm install -g omniroute@latest --include=optional
```

**Hindi** ito isang flag na ipinapasa mo sa `omniroute update` — palagi itong inilalapat ng
updater. Tinitiyak nitong mananatili ang `optionalDependencies` (`better-sqlite3`, `keytar`,
`tls-client`, ang LLMLingua SLM stack) pagkatapos ng update kahit nakatakda ang npm config mo
sa `omit=optional`, na kung hindi ay tahimik na mag-aalis sa native SQLite
driver at OS-keyring binding. Upang i-preview ang eksaktong command nang hindi ito inilalapat:

```bash
omniroute update --dry-run
# [DRY RUN] Patatakbuhin sana ang: npm install -g omniroute@latest --include=optional
```

Iba pang mga flag ng `omniroute update` (na-verify sa source): `--check` (mag-exit nang 1 kung
luma na), `--apply` (mag-install nang hindi nagtatanong), `--changelog`, `--no-backup`,
`--yes`.

---

## Google Gemini CLI sa pamamagitan ng `omniroute run gemini`

Na-verify ang contract laban sa `@google/gemini-cli` 0.50.0: sinusunod ng CLI ang
`GOOGLE_GEMINI_BASE_URL` at nagpapadala ng `POST /v1beta/models/<model>:generateContent`
(at `:streamGenerateContent?alt=sse`) dito — eksaktong native
Gemini surface (`/v1beta`) ng OmniRoute. Awtomatikong kino-configure iyon ng `omniroute run gemini`:

- `GOOGLE_GEMINI_BASE_URL` → ang aktibong OmniRoute base URL (root, walang `/v1`);
- `GEMINI_API_KEY` → ang na-resolve na kredensiyal ng OmniRoute (option/env/context);
- isang **pansamantala at nakahiwalay na `GEMINI_CLI_HOME`** na ang `.gemini/settings.json`
  ay pumipili ng `gemini-api-key` auth, upang hindi kailanman ma-override ng nakaimbak na Google OAuth session (Code Assist)
  ang launch na nakadirekta sa OmniRoute — inaalis pagkatapos mag-exit;
- **kalinisan ng env**: inaalis sa child env ang `GOOGLE_API_KEY`,
  `GOOGLE_GENAI_USE_VERTEXAI` at `GOOGLE_GENAI_USE_GCA` (na magre-redirect
  ng auth sa Vertex/Code Assist), at itinatakda ang `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key`
  bilang karagdagang fallback — tumatanggap din ang iba pang mga target ng `run` ng parehong
  pagtrato para sa kani-kanilang magkasalungat na variable;
- pag-inject ng `--model <id>` mula sa `--provider`/`--model`.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Nalalapat pa rin ang workspace-trust guard ng Gemini sa headless mode — ikaw mismo ang magpasa ng
`--skip-trust` (o interaktibong pagkatiwalaan ang directory); sadyang hindi ito
bina-bypass ng launcher. Naiiba ang launcher na ito sa **ACP
registration** (`src/lib/acp/registry.ts`, `gemini --acp`), na nananatiling
agent-protocol integration para sa `/dashboard/acp-agents`.

---

## Aktuwal na smoke sweep (opt-in)

Tumatakbo sa CI ang mga deterministic na launch-plan regression (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). Upang i-validate ang mga AKTUWAL na binary laban sa isang AKTUWAL na
OmniRoute server, may opt-in harness sa
`tests/integration/upstream-cli-smoke.int.test.ts`. Hindi ito kailanman awtomatikong tumatakbo
(nilalaktawan ang bawat sub-test maliban kung `RUN_CLI_SMOKE=1`), ipinapasa ang credential sa pamamagitan ng PANGALAN ng env-var
(hindi kailanman sa pamamagitan ng value), nire-redact ang mga string na mukhang key mula sa anumang naitalang output, nilalaktawan ang
mga target na walang naka-install na binary, at inuuri ang mga pagkabigo bilang
auth / upstream / config sa halip na isang simpleng boolean:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

Opsyonal: nililimitahan ng `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` ang sweep;
ino-override ng `OMNIROUTE_SMOKE_TIMEOUT_MS` ang 120s na timeout sa bawat target.

---

## Tingnan din

- [Configuration ng Claude Code](./CLAUDE-CODE-CONFIGURATION.md) — ang mas detalyadong gabay sa Claude Code
- [Configuration ng Codex CLI](./CODEX-CLI-CONFIGURATION.md) — ang minsanang paunang setup ng `[model_providers.omniroute]`
- [Remote Mode](./REMOTE-MODE.md) — mga context, scoped access token, at pagkontrol sa isang remote server
- [Reference ng CLI Tools](../reference/CLI-TOOLS.md) — ang kumpletong catalog ng mga sinusuportahang tool + mga dashboard page
- [Gabay sa Pag-setup](./SETUP_GUIDE.md) — mga paraan ng pag-install at onboarding sa unang pagpapatakbo
