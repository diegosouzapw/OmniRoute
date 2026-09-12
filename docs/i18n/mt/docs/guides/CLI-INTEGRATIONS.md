# CLI-INTEGRATIONS (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇷 [el](../../../el/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇪 [et](../../../et/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇪 [ga](../../../ga/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇷 [hr](../../../hr/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇹 [lt](../../../lt/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇻 [lv](../../../lv/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇮 [sl](../../../sl/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇸 [sr](../../../sr/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

---

title: "Integrazjonijiet CLI — poġġi kwalunkwe CLI tal-kodiċi lejn OmniRoute"
version: 3.8.50
lastUpdated: 2026-08-18
---

# Integrazjonijiet CLI

OmniRoute jibgħat familja ta' kmandi `setup-*` li jikkonfiguraw CLI tal-kodiċi
(Codex, Claude Code, OpenCode, Cline, …) biex juża OmniRoute bħala l-backend tiegħu — sabiex
l-għodda titkellem mal-**waħda** endpoint u OmniRoute jiddirezzona lejn il-provditur it-tajjeb b'
fallback awtomatiku. Kull kmand jaqra l-katalgu **ta' ħajja** tal-mudelli minn OmniRoute qed
jintuża (lokali jew remoto) u jikteb il-fajl tal-konfigurazzjoni speċifiku tal-għodda fuq
**il-magna tiegħek**. L-API key tiġi riferita permezz ta' variabbli tal-ambjent fejn kull għodda
tappoġġjah. Il-kmandi li jippersistu fajl tal-ambjent lokali tal-għodda huma nnotifikati t'hawn
taħt.

Hemm ukoll launch generika — `omniroute run <target>` — li toħroġ
`claude`, `codex`, `aider`, `goose`, `opencode`, `qwen` jew `gemini` bl-
ambjent it-tajjeb injettat, bla ma jikteb l-ebda konfigurazzjoni. Il-miri u l-alijs tagħhom ġejjin
minn il-manifest kanoniku `bin/cli/cli-manifest.mjs`
(`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`,
`open-code`, `qwen-code`, `gemini-cli`), u `omniroute completion` joffri l-
istedess kelma miri derivata mill-manifest. Il-legacy launcher speċifiċi għall-għodda —
`omniroute launch` (Claude Code) u `omniroute launch-codex` (Codex) — jibqgħu
disponibbli.

It-tħejjija tal-provditur hija disponibbli mill-istess kontekst lokali/remoto. Il-
kmandi API-ewwel t'hawn taħt iżżomm l-awtentikazzjoni tal-ġestjoni separata mill-kredenzjali tal-provditur
u qatt ma tipprintja kredenzjal f'output strutturat:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

Għall-scripts, agħżel `--credential-stdin` jew `--credential-env`; `--credential`
huwa r-rwiefn għal użu lokali kkontrollat. `providers remove` jeħtieġ `--yes` fuq terminal
mhux interattiv, u l-ħames kmandi kollha jħarsu lejn il-kontekst attiv jew il-
għażliet globali `--base-url`/`--api-key`.

Għas-setup bażiku wieħed-darba, miktub bl-idej, tal-iżjed integrazzjonijiet sinjuri, ara l-
ħarsa profonda għal kull għodda:

- [Konfigurazzjoni ta' Claude Code](./CLAUDE-CODE-CONFIGURATION.md)
- [Konfigurazzjoni ta' Codex CLI](./CODEX-CLI-CONFIGURATION.md)
- [Modalità Remota](./REMOTE-MODE.md) — segwi OmniRoute remoto (VPS / Tailnet) mill-laptop tiegħek
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — l-estensjoni OmniCopilot; tista' tħejji dawn ukoll
  il-kmandi `setup-*` għalik minn ġewwa l-editor

---

## Tabella ewlenija

Kull kmand jirrispetta l-**kontekst attiv** (imsejjaħ b'`omniroute connect`, ara
[Modalità Remota](./REMOTE-MODE.md)) jew flags expliċiti `--remote <url> --api-key <key>`.
"Lokali vs remoto" hawn taħt jfisser: bla flags jimmarka `http://localhost:20128`;
b'`--remote` (jew kontekst attiv remot) jiġbor il-katalgu minn dik is-server
u jikteb il-konfigurazzjoni lokalment.

| Kmand                      | Għodda                            | X'jikteb                                                                                                                                                                            | Flags ewlenin                                                                                                                              | Lokali vs remoto |
| -------------------------- | --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ---------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI                  | `~/.codex/<name>.config.toml` — profil wieħed għal kull mudell test kompatibbli (`codex --profile <name>`)                                                                          | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | It-tnejn         |
| `omniroute setup-claude`   | Claude Code                       | `~/.claude/profiles/<name>/settings.json` — profil wieħed għal kull mudell korrispondenti (`CLAUDE_CONFIG_DIR`)                                                                     | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | It-tnejn         |
| `omniroute setup-opencode` | OpenCode (kompatibbli mal-openai) | `~/.config/opencode/opencode.json` — fornitur `omniroute` bil-katalgu kollu tal-mudelli (`opencode -m omniroute/<model>`)                                                           | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | It-tnejn         |
| `omniroute setup-cline`    | Cline                             | `~/.cline/data/{globalState,secrets}.json` (modalità CLI) + jistampa l-impurtazzjonijiet tal-estensjoni VS Code                                                                     | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | It-tnejn         |
| `omniroute setup-kilo`     | Kilo Code                         | `~/.local/share/kilo/auth.json` (CLI) + jidħol `kilocode.*` f'`settings.json` tal-VS Code jekk hemm                                                                                 | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | It-tnejn         |
| `omniroute setup-continue` | Continue / `cn` CLI               | `~/.continue/config.yaml` — `provider: openai` mudelli, key permezz `${{ secrets.OMNIROUTE_API_KEY }}`                                                                              | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | It-tnejn         |
| `omniroute setup-cursor`   | Cursor                            | Xejn — jistampa l-passi ġewwa l-app (konfigurazzjoni Cursor hija SQLite ma jistax jinftiehem)                                                                                       | `--remote` `--api-key` `--only` `--port`                                                                                                   | It-tnejn         |
| `omniroute setup-roo`      | Roo Code                          | `~/.omniroute/roo-settings.json` (dokument impurtar) + jistabbilixxi `roo-cline.autoImportSettingsPath` jekk hemm `settings.json` tal-VS Code                                       | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | It-tnejn         |
| `omniroute setup-crush`    | Crush                             | `~/.config/crush/crush.json` — fornitur `openai-compat`, key permezz `$OMNIROUTE_API_KEY`                                                                                           | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | It-tnejn         |
| `omniroute setup-goose`    | Goose                             | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + jistampa ir-riċetta tal-ambjent                                                                      | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | It-tnejn         |
| `omniroute setup-aider`    | Aider                             | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + jistampa ir-riċetta tal-ambjent                                                                                    | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | It-tnejn         |
| `omniroute setup-qwen`     | Qwen Code                         | `~/.qwen/settings.json` — V4 `modelProviders.openai` array + `OMNIROUTE_API_KEY` f'`~/.qwen/.env`                                                                                   | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | It-tnejn         |
| `omniroute setup-5dive`    | 5dive (flotta ta' aġenti)         | Xejn taħt `$HOME` — jikteb **profil awtentikazzjoni** 5dive (`/var/lib/5dive/auth-profiles/<name>/`) permezz `5dive agent auth set`; biss għar-radjk, jimxi fuq il-magna tal-flotta | `--remote` `--api-key` `--model` `--auth-profile` `--agent` `--byo-provider` `--fivedive-bin` `--no-sudo` `--yes` `--dry-run` `--port`     | It-tnejn         |
| `omniroute run <target>`   | Ħruġ runtime (generiku)           | Xejn — joħroġ `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini` bl-ambjent u argomenti t-tajjeb; Qwen u Gemini jużaw dar temporanju iżolat                                | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | It-tnejn         |
| `omniroute launch`         | Claude Code                       | Xejn — joħroġ `claude` b'`ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN` injettat                                                                                                       | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | It-tnejn         |
| `omniroute launch-codex`   | OpenAI Codex CLI                  | Xejn — joħroġ `codex` bil-fornitur `omniroute` injettat permezz `-c` flags                                                                                                          | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | It-tnejn         |

Noti dwar il-flags (verifikati fil-kodiċi tal-kmand):

- `--remote <url>` — jiġbor il-katalgu minn OmniRoute remoto (jirriskjara `--port`
  u l-kontekst attiv). `--api-key <key>` jipprovdi l-kredenzjal għal dik
  is-server (jekk le jittieħed il-variabbli tal-ambjent `OMNIROUTE_API_KEY`, jew it-token tal-kontekst attiv).
- `--only <patterns>` — sottostrijni f'koma; Żomm biss l-IDs tal-mudell li jaqblu
  (eż. `--only glm,kimi`). Disponibbli fuq `setup-codex`, `setup-claude`,
  `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`.
- `--dry-run` — jistampa eżattament dak li jkun se jittieħed bla ma jagħmel
  xejn mal-fajls. Disponibbli fuq kull kmand `setup-*` **ħlief** `setup-cursor`
  (li qatt m'huwa se jikteb fajl).
- `--model <id>` — meħtieġ (jew magħżul interattivament) għall-għodda li m'għandhomx
  skoperta awtomatika tal-mudelli: Cline, Kilo, Roo, Goose, Qwen, Aider, 5dive. Dawn l-għodda
  jaċċettaw ukoll `--yes` għal tmexxijiet mhux interattivi (li mbagħad jeħtieġu `--model`).
  `setup-opencode` jieħu `--model` biex jistabbilixxi l-mudell ewlieni implicitu.
- `--model <id>` fuq `omniroute run` jimxi skont il-wirja speċifika tal-mirija tal-manifest
  (`bin/cli/cli-manifest.mjs`): **aider** jirċievi `--model openai/<id>` u
  **opencode** `--model omniroute/<id>` (il-prefix jiżdied biss meta l-id
  diġà m'għandux); **qwen** u **gemini** jirċievu l-id kif huwa; **claude** jieħdu permezz
  `ANTHROPIC_MODEL`, **goose** permezz `GOOSE_MODEL`, u **codex** permezz
  `-c model_providers.omniroute.*` argomenti. **Qwen huwa l-unika mirija run
  li jeħtieġ obbligatorjament `--model`** — `omniroute run qwen` bla ma jkun hemm joħroġ
  `2` b' żball expliċitu.
- `--port <port>` — port lokali ta' OmniRoute (default `20128`, injorat meta `--remote`
  huwa stabbilit). Preżenti fuq kollha `setup-*` u żewġ launchers.
- Kohot tal-ħruġ ta' `omniroute run`: il-kod tal-ħruġ speċifiku tat-tifla CLI jiġi propagat
  kif huwa; `2` = argomenti invalidi (mirija mhux appoġġjata, ma jonqosx `--model`
  meħtieġ, gard tal-kontenitur); `127` = il-binari tal-mirija mhuwiex f'`PATH`;
  `130`/`143`/`129` meta l-ħruġ jiġi terminated b' `SIGINT`/`SIGTERM`/`SIGHUP`;
  `1` = falla oħra runtime.
- Iż-żewġ launchers (`launch`, `launch-codex`) jaċċettaw `--profile <name>` biex jagħżlu
  profil miktub minn `setup-claude` / `setup-codex`, flimkien mal-argomenti pass-through għall-
  `claude` / `codex` binari bażiku.

L-għażla interattiva tinqasam ukoll mir-riċetti tal-konfigurazzjoni:

```bash
# Agħżel mill-katalgu lokali jew remot attiv u ikkonfigura l-mirija.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

`configure` b'issa jiddelega għar-riċetti ttestjati għal `codex`, `claude`,
`opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, `kilo`, u `5dive`.
Biss IDE,
MITM, u entries tal-katalgu b' gida jibqgħu flussi expliċiti `setup-*`/manwali
u mhumiex preżentati bħala mirijiiet li jitniedsu.

> `setup-opencode` hija l-integrazzjoni **ħafif openai-kompatibbli** ta' OpenCode.
> Hemm ukoll integrazzjoni sinjura b'plug-in — `omniroute setup opencode` — li
> tinstalla `@omniroute/opencode-plugin`. Huma kmandi differenti; it-tabella
> hawn fuq tiddokumenta `setup-opencode`.

---

## Użu lokali

Meta OmniRoute qed jaħdem fuq `localhost:20128`, sempliċiment eżegwixxi l-kummerċ għodda tiegħek. Il-katalogu jitniżżel mis-server lokali.

```bash
# Codex: write a profile per matched model into ~/.codex/
omniroute setup-codex
codex --profile glm52            # use a generated profile

# Claude Code: write per-model profiles, then launch one
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: write the openai-compatible provider with all catalog models
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # referenced via {env:OMNIROUTE_API_KEY}, never on disk
opencode -m omniroute/glm/glm-5.2 "..."

# Tools without auto-discovery need an explicit model:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# Preview without writing anything:
omniroute setup-continue --dry-run
```

Ittella mingħajr dikjarazzjoni speċifika waħda (biss injezzjoni fl-ambjent):

```bash
omniroute launch                 # Claude Code → local OmniRoute
omniroute launch-codex           # Codex CLI → local OmniRoute
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# Explicit command path: pass through whatever comes after --
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## Użu mill-bogħod

Indika kwalunkwe kummerċ setup għal OmniRoute mill-bogħod b `--remote` + `--api-key`. Il-
katalogu jitniżżel mill-bogħod; il-konfigurazzjoni titniżżel fil-magna lokali tiegħek.

```bash
# OpenCode against a remote VPS, keep only glm/kimi models
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # export OMNIROUTE_API_KEY first

# Codex profiles from a remote catalog
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# Launch a CLI straight against the remote
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

Minflok jgħaddi `--remote`/`--api-key` kull darba, idħol darba u ħalli l-
**kontatt attiv** japprovixxihom awtomatikament:

```bash
omniroute connect 192.168.0.15        # mints a scoped token, stores the context
omniroute setup-codex                 # ← now uses the remote catalog
omniroute setup-opencode              # ← same
omniroute launch                      # ← Claude Code against the remote
```

Ara [Remote Mode](./REMOTE-MODE.md) għal kontatt, skopijiet, u ġestjoni tat-tokens.

---

## Flotta ta' aġenti 5dive

[5dive](https://5dive.ai) jimxi b'flotta ta' aġenti tal-programmar fit-tul, kull wieħed
unità ta' sistema taħt l-utent Unix tagħha stess. Mhuwiex għodda CLI tal-programmar b'saħħitha stess, għalhekk
mhux hemm x'jittella `omniroute run` — `5dive` huwa magħmudija biss.

```bash
omniroute configure 5dive --model failover-demo --yes
omniroute setup-5dive --model failover-demo --auth-profile omniroute --agent worker1
```

Iż-żewġ forom jiktbu **profil ta' awtentikazzjoni** wieħed ta' 5dive, u kull pjan `claude` marbut mal-
profil jitkellem mal-OmniRoute. Tliet affarijiet huma speċifiċi għal din il-mira:

- **Jiġi żviluppat fuq il-flotta host, bħala root.** Istampi ta' 5dive joperaw fuq unitajiet lokali tas-sistema
  u fuq direttorju stat bl-isem tal-root; mhuwiex hemm modalità mill-bogħod. Ir-riċetta terġa' taħdem mill-
  `sudo` meta mhuwiex diġà root (`--no-sudo` tħalli dik u tipprintja l-
  kummerċ minflokha).
- **Iż-żewġ puntijiet iridu jkunu `https/` sakemm mhumiex loopback.** L-awtentikazzjoni tal-aġenti titla' f'dan l-URL fuq kull talba, u 5dive jirrifjuta punt off-box mingħajr protezzjoni. Indirizz LAN privat mhux eċċezzjoni.
- **Kull pjan għandu mudell wieħed li jipprevali fuq il-profil.** Il-profil iġorr
  `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL`, imma pjan għadu marbut b'mudell standard
  jifail l-ewwel karozza tiegħu bi _"Hemm problema mal-mudell magħżul"_. Agħti `--agent <isem>` (tista' terġa' tużah) biex twaħħal il-pjanijiet ukoll; ir-riċetta tipprintja l-
  kummerċ meta ma tagħmilx.

L-awtentikazzjoni tal-API tingħata lill-5dive fuq **stdin** (`--api-key=-`), hekk li qatt tidher fil-
output tal-`ps`.

Il-profil imur lejn kombinazzjoni **OmniRoute** minflok mudell wieħed biss li jġib il-falliment tal-fornitur tal-flotta: meta l-punt ewlieni waqa' waqt karozza f'run irreġistrat fuq
[#11578](https://github.com/diegosouzapw/OmniRoute/issues/11578), l-aġent lesta il-passi li fadal fuq il-fallback u qatt ma ħareġ in-breakout.

---

## Konvenzjonijiet tal-URL bażiċi (liema għodod jitolbu `/v1`)

OmniRoute jippreżenta s-superfiċċja ta' OpenAI f'`/v1`, is-superfiċċja ta' Anthropic fir-rads, u superfiċċja nativa ta' Gemini f'`/v1beta`. Kull integrazzjoni hija mqabbda mal-forma li l-għodda tagħha tistenna (verifikata fil-kodiċi tal-kmand):

| Integrazzjoni                                                              | URL bażi miktub | `/v1`?                                   |
| -------------------------------------------------------------------------- | --------------- | ---------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | rads            | Le — Cline iżid `/v1/chat/completions`   |
| `setup-goose` (`OPENAI_HOST`)                                              | rads            | Le — Goose iżid il-mixja                 |
| `setup-aider` (`OPENAI_API_BASE`)                                          | rads            | Le — LiteLLM iżid `/v1/chat/completions` |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | b'`/v1`         | Iva                                      |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | rads            | Le — Claude Code iżid `/v1/messages`     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | b'`/v1`         | Iva                                      |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | b'`/v1`         | Iva                                      |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | rads            | Le — is-SDK iżid `/v1beta/models/…`      |
| `setup-5dive` (`ANTHROPIC_BASE_URL` fil-profil tal-awtentikazzjoni)        | rads            | Le — Claude Code iżid `/v1messages`      |

---

## It-tħażin ta' dipendenzi nattivi waqt it-tġdid: `--include=optional`

Meta tġdid b'`omniroute update` (wara li tikkonferma, jew b'`--apply`), OmniRoute jimmoda l-installazzjoni b'`--include=optional` internament:

```bash
npm install -g omniroute@latest --include=optional
```

Dan **mhux** flemma li tagħti lil `omniroute update` — huwa applikat dejjem mill-ġdid. Dan jiżgura li l-`optionalDependencies` (`better-sqlite3`, `keytar`, `tls-client`, il-pakkett tal-LLMLingua SLM) jibqgħu ma' l-aġġornament anki jekk il-konfigurazzjoni npm tiegħek għandha `omit=optional` sett, li b'xi mod iħalli l-pilotaġġ nattiv tal-SQLite u r-rabta tal-kċina tal-OS biex jitwarrab b'sik. Biex tara l-kmand eżatt mingħajr ma tapplikah:

```bash
omniroute update --dry-run
# [DRY RUN] Sejjer jirrikjedi: npm install -g omniroute@latest --include=optional
```

Flemm oħra ta' `omniroute update` (verifikati fil-kodiċi): `--check` (ħarġa 1 jekk skaduta), `--apply` (tinstalla mingħajr jekk tagħmel il-mistoqsija), `--changelog`, `--no-backup`, `--yes`.

---

## Google Gemini CLI permezz ta' `omniroute run gemini`

Il-kuntratt verifikat kontra `@google/gemini-cli` 0.50.0: il-CLI jirrikonoxxi `GOOGLE_GEMINI_BASE_URL` u jagħmel `POST /v1beta/models/<model>:generateContent` (u `:streamGenerateContent?alt=sse`) fuq dan — eżatt is-superfiċċja nativa ta' OmniRoute (`/v1beta`). `omniroute run gemini` iqabbad dan awtomatikament:

- `GOOGLE_GEMINI_BASE_URL` → il-URL bażi attiv ta' OmniRoute (rads, bla `/v1`);
- `GEMINI_API_KEY` → i-kredenzjali risolta ta' OmniRoute (għażla/madwar/kuntest);
- **`GEMINI_CLI_HOME` temporanju iżolat** li fih il-`.gemini/settings.json` jagħżel awtentikazzjoni ta' `gemini-api-key`, sabiessi ħlas Google OAuth maħżun (Code Assist) qatt ma jiskontra l-ħruġ immexxi minn OmniRoute — jitneħħa wara l-ħruġ;
- **iġjene tal-madwar**: l-madwar tat-tifel jitħassar minn `GOOGLE_API_KEY`, `GOOGLE_GENAI_USE_VERTEXAI` u `GOOGLE_GENAI_USE_GCA` (li jiddirott l-awtentikazzjoni għal Vertex/Code Assist), u `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key` jiġi stabbilit bħalaappoġġż added — il-miri oħra `run` jirċievu l-istess trattament għal l-ilħna konfliġġenti tagħhom stess;
- injettjar `--model <id>` minn `--provider`/`--model`.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Is-sentunzja tal-fiduċja tax-xogħol ta' Gemini għadha tapplika fil-modalità b'ras— jgħaddi `--skip-trust` (jew tafda direttorju interattivament) int stess; il-pilota deliberatament mhux se jingħaddha. Dan il-pilota huwa distint mill-**reġistrazzjoni ACP** (`src/lib/acp/registry.ts`, `gemini --acp`), li jibqa' l-integrazzjoni tal-protokoll tal-aġenzija għal `/dashboard/acp-agents`.

---

## Swejjar tal-mħagna reali (b'għażula)

Il-jiċċekkjani reġressivi deterministiċi tal-pjan ta' tnedija jseħħu fl-CI (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). Biex jivvaluta l-binarji REALI kontra Server OmniRoute REALI, hemm ġgħastra b'għażula fis-
`tests/integration/upstream-cli-smoke.int.test.ts`. Qatt m'għandha taħdem awtomatikament
(kull sub-test jispiċċa sakemm `RUN_CLI_SMOKE=1`), tgħaddi l-kredenzjali permezz tal-isem tal-varjabbli tal-ambjent
(qatt bil-valur), tħassar iż-żġunijiet f'forma ta' sieħa minn kwalunkwe output irrekordjat, tispiċċa
it-testi li l-binarju tagħhom mhuwiex installat, u tikklassifika l-fallimenti bħala
auth / upstream / config minflok Booleana裸:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128"OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

Fakultattiv: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` jirrestrinġi s-swejjar;
`OMNIROUTE_SMOKE_TIMEOUT_MS` jaqbad it-timeout ta' 120s kull destinazzjoni.

---

## Ara wkoll

- [Konfigurazzjoni ta' Claude Code](./CLAUDE-CODE-CONFIGURATION.md) — il-gwida aktar profonda ta' Claude Code
- [Konfigurazzjoni tal-CLI ta' Codex](./CODEX-CLI-CONFIGURATION.md) — is-sistema waħda tal-bażi `[model_providers.omniroute]`
- [Modalità ta' Distanza](./REMOTE-MODE.md) — il-kuntesti, it-tokeni ta' aċċess skopati, it-tirressi ta' server ta' distanza
- [Referenza għall-Għodod tal-CLI](../reference/CLI-TOOLS.md) — il-katalgu sħiħ tal-għodod appoġġjati + il-paġni tad-dashboard
- [Gwida tal-Installazzjoni](./SETUP_GUIDE.md) - il-metodi tal-installazzjoni u l-onboarding tal-ewwel darba
