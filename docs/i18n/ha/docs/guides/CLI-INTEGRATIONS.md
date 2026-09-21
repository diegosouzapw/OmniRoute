# CLI Integrations (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇪🇹 [am](../../../am/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇷 [el](../../../el/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇪 [et](../../../et/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇪 [ga](../../../ga/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇷 [hr](../../../hr/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇲 [hy](../../../hy/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ig](../../../ig/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇪 [ka](../../../ka/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇭 [km](../../../km/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [kn](../../../kn/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇹 [lt](../../../lt/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇻 [lv](../../../lv/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ml](../../../ml/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇹 [mt](../../../mt/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇲 [my](../../../my/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇵 [ne](../../../ne/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [or](../../../or/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [pa](../../../pa/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇰 [si](../../../si/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇮 [sl](../../../sl/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇸 [sr](../../../sr/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇿 [uz](../../../uz/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [yo](../../../yo/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

OmniRoute na zuwa da jerin umarnin `setup-*` waɗanda ke saita CLI na rubuta lamba
(Codex, Claude Code, OpenCode, Cline, …) don amfani da OmniRoute a matsayin backend ɗinsa — ta yadda
kayan aikin zai yi magana da endpoint **ɗaya** kawai, sannan OmniRoute ya tura buƙatar zuwa provider da ya dace tare da
sauyawa ta atomatik idan ya gaza. Kowane umarni yana karanta kundin model na **kai tsaye** daga OmniRoute da ke aiki
(na gida ko na nesa), sannan ya rubuta fayil ɗin saitin kayan aikin a kan na'urar **ka**.
Ana nuni da API key ta hanyar environment variable a duk inda kayan aikin yake goyon bayansa.
An nuna a ƙasa umarnin da ke adana fayil ɗin environment na cikin kayan aikin.

Akwai kuma launcher na gama-gari — `omniroute run <target>` — wanda ke ƙaddamar da
`claude`, `codex`, `aider`, `goose`, `opencode`, `qwen` ko `gemini` tare da
shigar da env da ya dace, ba tare da rubuta wani saitin ba kwata-kwata. Targets da
aliases ɗinsu suna fitowa daga manifest na asali `bin/cli/cli-manifest.mjs`
(`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`,
`open-code`, `qwen-code`, `gemini-cli`), kuma `omniroute completion` yana bayar da
kalmomin target iri ɗaya waɗanda aka samo daga manifest. Tsoffin launchers na kowane kayan aiki —
`omniroute launch` (Claude Code) da `omniroute launch-codex` (Codex) — har yanzu suna
nan.

Ana iya fara haɗa provider daga wannan yanayin na gida/nesa. Umarnin da ke ƙasa, waɗanda
suka fara da API, suna ware tabbatar da izinin gudanarwa daga bayanan shaidar provider
kuma ba sa taɓa buga bayanin shaida a cikin structured output:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

Don scripts, fi son `--credential-stdin` ko `--credential-env`; an ci gaba da riƙe `--credential`
don amfani na gida da ake sarrafawa. `providers remove` yana buƙatar `--yes` a kan
terminal marar hulɗa, kuma duk umarnin biyar suna bin active context ko kuma
zaɓuɓɓukan global `--base-url`/`--api-key`.

Don saitin tushe na sau ɗaya da ake rubutawa da hannu ga integrations biyu mafi cikakken fasali, duba
cikakken bayani na kowane kayan aiki:

- [Saitin Claude Code](./CLAUDE-CODE-CONFIGURATION.md)
- [Saitin Codex CLI](./CODEX-CLI-CONFIGURATION.md)
- [Yanayin Nesa](./REMOTE-MODE.md) — sarrafa OmniRoute na nesa (VPS / Tailnet) daga kwamfutar tafi-da-gidanka
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — extension na OmniCopilot; yana kuma iya gudanar da waɗannan
  umarnin `setup-*` a madadinka daga cikin editor

---

## Babban tebur

Kowane umarni yana bin **active context** (wanda aka saita da `omniroute connect`,
duba [Yanayin Nesa](./REMOTE-MODE.md)) ko flags na kai tsaye
`--remote <url> --api-key <key>`. Ma'anar "Na gida da na nesa" a ƙasa ita ce:
idan babu flags, yana nufar `http://localhost:20128`; idan akwai `--remote` (ko
active remote context), yana ɗauko kundin daga wannan server sannan ya rubuta
config ɗin a cikin na'urar gida.

| Umarni                     | Kayan aiki                        | Abin da yake rubutawa                                                                                                                                                                        | Muhimman flags                                                                                                                             | Na gida ko na nesa |
| -------------------------- | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ |
| `omniroute setup-codex`    | OpenAI Codex CLI                  | `~/.codex/<name>.config.toml` — profile ɗaya ga kowane samfurin rubutu mai jituwa (`codex --profile <name>`)                                                                                 | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | Dukansu            |
| `omniroute setup-claude`   | Claude Code                       | `~/.claude/profiles/<name>/settings.json` — profile ɗaya ga kowane samfurin da ya dace (`CLAUDE_CONFIG_DIR`)                                                                                 | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | Dukansu            |
| `omniroute setup-opencode` | OpenCode (mai jituwa da openai)   | `~/.config/opencode/opencode.json` — mai samar da `omniroute` tare da kowane samfurin kundin (`opencode -m omniroute/<model>`)                                                               | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | Dukansu            |
| `omniroute setup-cline`    | Cline                             | `~/.cline/data/{globalState,secrets}.json` (yanayin CLI) + yana fitar da saitunan tsawaitawar VS Code                                                                                        | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | Dukansu            |
| `omniroute setup-kilo`     | Kilo Code                         | `~/.local/share/kilo/auth.json` (CLI) + yana haɗa `kilocode.*` cikin `settings.json` na VS Code idan yana nan                                                                                | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | Dukansu            |
| `omniroute setup-continue` | Continue / `cn` CLI               | `~/.continue/config.yaml` — samfuran `provider: openai`, maɓalli ta `${{ secrets.OMNIROUTE_API_KEY }}`                                                                                       | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Dukansu            |
| `omniroute setup-cursor`   | Cursor                            | Babu komai — yana fitar da matakan da za a bi cikin manhajar (tsarin saitunan Cursor SQLite ne marar bayyana)                                                                                | `--remote` `--api-key` `--only` `--port`                                                                                                   | Dukansu            |
| `omniroute setup-roo`      | Roo Code                          | `~/.omniroute/roo-settings.json` (takardar shigo da bayanai) + yana saita `roo-cline.autoImportSettingsPath` idan `settings.json` na VS Code yana nan                                        | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | Dukansu            |
| `omniroute setup-crush`    | Crush                             | `~/.config/crush/crush.json` — mai samar da `openai-compat`, maɓalli ta `$OMNIROUTE_API_KEY`                                                                                                 | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Dukansu            |
| `omniroute setup-goose`    | Goose                             | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + yana fitar da umarnin tsara env                                                                               | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Dukansu            |
| `omniroute setup-aider`    | Aider                             | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + yana fitar da umarnin tsara env                                                                                             | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Dukansu            |
| `omniroute setup-qwen`     | Qwen Code                         | `~/.qwen/settings.json` — jerin V4 `modelProviders.openai` + `OMNIROUTE_API_KEY` a cikin `~/.qwen/.env`                                                                                      | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | Dukansu            |
| `omniroute setup-5dive`    | 5dive (rukunin wakilai)           | Babu komai ƙarƙashin `$HOME` — yana rubuta **profile na auth** na 5dive (`/var/lib/5dive/auth-profiles/<name>/`) ta `5dive agent auth set`; na root kaɗai, yana aiki a kan kwamfutar rukunin | `--remote` `--api-key` `--model` `--auth-profile` `--agent` `--byo-provider` `--fivedive-bin` `--no-sudo` `--yes` `--dry-run` `--port`     | Dukansu            |
| `omniroute run <target>`   | Ƙaddamarwa yayin aiki (gama-gari) | Babu komai — yana ƙaddamar da `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini` tare da env da args da suka dace; Qwen da Gemini suna amfani da home na wucin gadi mai keɓewa      | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | Dukansu            |
| `omniroute launch`         | Claude Code                       | Babu komai — yana ƙaddamar da `claude` tare da saka `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN`                                                                                              | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | Dukansu            |
| `omniroute launch-codex`   | OpenAI Codex CLI                  | Babu komai — yana ƙaddamar da `codex` tare da saka mai samar da `omniroute` ta flags na `-c`                                                                                                 | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | Dukansu            |

Bayanai kan tutoci (an tabbatar da su a tushen umarnin):

- `--remote <url>` — ɗauko kundin daga OmniRoute mai nisa (yana rinjayar `--port`
  da mahallin da yake aiki). `--api-key <key>` yana samar da bayanan shaidar wannan
  sabar (ta tsohuwa yana amfani da env var `OMNIROUTE_API_KEY`, ko token na mahallin da yake aiki).
- `--only <patterns>` — ƙananan jimloli da waƙafi ya raba; a bar ID ɗin samfura kawai waɗanda suka dace
  (misali `--only glm,kimi`). Akwai shi a kan `setup-codex`, `setup-claude`,
  `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`.
- `--dry-run` — nuna ainihin abin da za a rubuta ba tare da taɓa
  tsarin fayiloli ba. Akwai shi a kowane umarnin `setup-*` **sai dai** `setup-cursor`
  (wanda ba ya taɓa rubuta fayil).
- `--model <id>` — wajibi ne (ko a zaɓa ta hulɗa) ga kayan aikin da ba su da
  gano samfuri ta atomatik: Cline, Kilo, Roo, Goose, Qwen, Aider, 5dive. Waɗannan kayan aikin
  kuma suna karɓar `--yes` don gudanarwa ba tare da hulɗa ba (wanda a lokacin ke buƙatar `--model`).
  `setup-opencode` yana karɓar `--model` don saita samfuri na sama a matsayin tsoho.
- `--model <id>` a kan `omniroute run` yana bin haɗin kowane maƙasudi na manifest
  (`bin/cli/cli-manifest.mjs`): **aider** yana karɓar `--model openai/<id>` sannan
  **opencode** `--model omniroute/<id>` (ana ƙara prefix ne kawai idan id
  bai riga ya ƙunsa ba); **qwen** da **gemini** suna karɓar id ɗin yadda yake;
  **claude** yana samun sa ta `ANTHROPIC_MODEL`, **goose** ta `GOOSE_MODEL`, sannan
  **codex** ta args na `-c model_providers.omniroute.*`. **Qwen ne kaɗai maƙasudin gudanarwa
  da ke tilasta buƙatar `--model`** — `omniroute run qwen` ba tare da shi ba yana fita da
  `2` tare da bayyanannen kuskure.
- `--port <port>` — tashar OmniRoute ta gida (tsoho `20128`, ana watsi da ita idan an saita `--remote`).
  Yana nan a kan duk `setup-*` da masu ƙaddamarwa biyun.
- Lambobin fita na `omniroute run`: ana isar da lambar fita ta CLI ɗin yaro
  yadda take; `2` = hujjoji marasa inganci (maƙasudi mara tallafi, `--model` na wajibi da ya ɓace,
  kariyar container); `127` = binary na maƙasudin ba ya cikin `PATH`;
  `130`/`143`/`129` idan `SIGINT`/`SIGTERM`/`SIGHUP` ya kawo ƙarshen ƙaddamarwar;
  `1` = wata gazawar ƙaddamarwa yayin aiki.
- Masu ƙaddamarwa biyun (`launch`, `launch-codex`) suna karɓar `--profile <name>` don zaɓar
  profile da `setup-claude` / `setup-codex` ya rubuta, tare da args da ake miƙawa kai tsaye ga
  binary na `claude` / `codex` da ke ƙarƙashinsu.

Mai zaɓin hulɗa kuma ana amfani da shi tare a girke-girken saitawa:

```bash
# Zaɓa daga kundin samfura na gida ko mai nisa da yake aiki sannan a saita maƙasudin.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

A halin yanzu `configure` yana wakilta zuwa girke-girken da aka gwada na `codex`, `claude`,
`opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, `kilo`, da `5dive`.
Shigarwar kundin da suka keɓanta ga IDE,
MITM, da jagora kawai suna ci gaba da zama bayyanannun hanyoyin `setup-*`/na hannu kuma
ba a gabatar da su a matsayin maƙasudan da za a iya ƙaddamarwa ba.

> `setup-opencode` shi ne haɗawar OpenCode mai **sauƙi kuma mai jituwa da openai**.
> Haka kuma akwai haɗawar plugin mai ƙarin fasali — `omniroute setup opencode` — wadda
> ke girka `@omniroute/opencode-plugin`. Umarnai ne daban-daban; jadawalin
> da ke sama yana bayyana `setup-opencode`.
>
> Plugin ɗin yana zuwa a cikin packages guda biyu, ɗaya ga kowane babban sigar OpenCode, saboda loaders biyun
> suna tsammanin entrypoints daban-daban:
> `@omniroute/opencode-plugin` na OpenCode v1 da
> `@omniroute/opencode-plugin-v2` na OpenCode v2. Package na v2 sabo ne
> (`0.1.0`) kuma yana bin kwangilar host da har yanzu take sauyawa, don haka yana karanta
> tsarin da OpenCode ya shigar cikin daftarin kundin maimakon ya ɗauka kai tsaye. Girka
> shi ta ƙara shigarwar `plugins` zuwa `opencode.json`; `omniroute setup opencode`
> har yanzu yana girka package na v1. Zaɓuɓɓuka da tsarin binciken bayanan shaida suna cikin
> README na package.

---

## Amfani na gida

Yayin da OmniRoute ke aiki a kan `localhost:20128`, kawai gudanar da umarnin saiti na
kayan aikinka. Ana ɗauko katalog ɗin daga sabar gida.

```bash
# Codex: rubuta profile ɗaya ga kowane model da ya dace cikin ~/.codex/
omniroute setup-codex
codex --profile glm52            # yi amfani da profile da aka ƙirƙira

# Claude Code: rubuta profiles na kowane model, sannan ƙaddamar da ɗaya
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: rubuta provider mai dacewa da openai tare da duk models na katalog
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # ana ambatonsa ta {env:OMNIROUTE_API_KEY}, ba a taɓa ajiye shi a faifai ba
opencode -m omniroute/glm/glm-5.2 "..."

# Kayan aikin da ba su da ganowa ta atomatik suna buƙatar a fayyace model:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# Yi samfoti ba tare da rubuta komai ba:
omniroute setup-continue --dry-run
```

Ƙaddamar ba tare da rubuta wani config kwata-kwata ba (allurar env kawai):

```bash
omniroute launch                 # Claude Code → OmniRoute na gida
omniroute launch-codex           # Codex CLI → OmniRoute na gida
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# Takamaiman hanyar umarni: tura duk abin da ya zo bayan -- kai tsaye
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## Amfani daga nesa

Nuna kowane umarnin saiti zuwa OmniRoute na nesa da `--remote` + `--api-key`. Ana
ɗauko katalog ɗin daga wurin nesa; ana rubuta config ɗin a kan na'urarka ta gida.

```bash
# OpenCode da ke aiki da VPS na nesa, riƙe models na glm/kimi kawai
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # fara export OMNIROUTE_API_KEY

# Profiles na Codex daga katalog na nesa
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# Ƙaddamar da CLI kai tsaye da wurin nesa
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

Maimakon bayar da `--remote`/`--api-key` kowane lokaci, shiga sau ɗaya ka bar
**mahallin da ke aiki** ya samar da su ta atomatik:

```bash
omniroute connect 192.168.0.15        # ƙirƙiri scoped token, ajiye mahallin
omniroute setup-codex                 # ← yanzu yana amfani da katalog na nesa
omniroute setup-opencode              # ← iri ɗaya
omniroute launch                      # ← Claude Code da ke aiki da wurin nesa
```

Duba [Yanayin Nesa](./REMOTE-MODE.md) don mahallai, scopes, da sarrafa tokens.

---

## Rundunonin agents na 5dive

[5dive](https://5dive.ai) yana gudanar da rundunar coding agents masu aiki na dogon
lokaci, kowannensu systemd unit ne a ƙarƙashin nasa Unix user. Shi kansa ba coding
CLI ba ne, saboda haka babu abin da `omniroute run` zai ƙaddamar — `5dive` manufa ce
ta **saitawa-kawai**.

```bash
omniroute configure 5dive --model failover-demo --yes
omniroute setup-5dive --model failover-demo --auth-profile omniroute --agent worker1
```

Duk siffofin biyu suna rubuta 5dive **auth profile** ɗaya, sannan kowane `claude` seat
da aka ɗaura wa wannan profile zai yi magana da OmniRoute. Abubuwa uku sun keɓanta
ga wannan manufa:

- **Yana aiki a kan fleet host, a matsayin root.** Verbs na 5dive suna aiki a kan
  systemd units na gida da state dir mallakar root; babu yanayin nesa. Recipe ɗin
  yana sake aiwatar da kansa ta `sudo` idan bai riga ya zama root ba (`--no-sudo`
  yana kashe hakan kuma ya buga umarnin maimakon haka).
- **Dole endpoint ɗin ya zama `https://` sai dai idan loopback ne.** API key na agent
  yana bin wannan URL a kowane request, kuma 5dive yana ƙin endpoint na plaintext
  da ke wajen na'urar. Adireshin LAN mai zaman kansa ba togaci ba ne.
- **Model pin na kowane seat ya fi profile fifiko.** Profile ɗin yana ɗauke da
  `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL`, amma seat da har yanzu aka pin zuwa
  stock model id zai gaza a juyinsa na farko da _"Akwai matsala da model ɗin da aka
  zaɓa"_. Ba da `--agent <name>` (ana iya maimaitawa) don pin na seats ɗin ma;
  recipe ɗin yana buga umarnin idan ba ka yi hakan ba.

Ana miƙa API key ɗin ga 5dive ta **stdin** (`--api-key=-`), don haka ba ya taɓa
bayyana a cikin fitowar `ps`.

Nuna profile ɗin zuwa **combo** na OmniRoute maimakon model guda ɗaya shi ne ke ba
rundunar damar failover na provider: lokacin da primary endpoint ya daina aiki
gaba ɗaya a tsakiyar turn a cikin aikin da aka rubuta a
[#11578](https://github.com/diegosouzapw/OmniRoute/issues/11578), agent ɗin ya
kammala sauran matakansa a kan fallback kuma bai taɓa bayyana katsewar ba.

---

## Ka’idojin Base URL (waɗanne kayan aiki ne ke buƙatar `/v1`)

OmniRoute yana samar da shimfiɗar OpenAI a `/v1`, shimfiɗar Anthropic a tushe,
da kuma shimfiɗar Gemini ta asali a `/v1beta`. An haɗa kowace hulɗa da tsarin da
kayan aikinta ke tsammani (an tabbatar a cikin tushen umarnin):

| Haɗawa                                                                     | Base URL da aka rubuta | `/v1`?                                         |
| -------------------------------------------------------------------------- | ---------------------- | ---------------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | tushe                  | A’a — Cline yana ƙara `/v1/chat/completions`   |
| `setup-goose` (`OPENAI_HOST`)                                              | tushe                  | A’a — Goose yana ƙara hanyar                   |
| `setup-aider` (`OPENAI_API_BASE`)                                          | tushe                  | A’a — LiteLLM yana ƙara `/v1/chat/completions` |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | tare da `/v1`          | E                                              |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | tushe                  | A’a — Claude Code yana ƙara `/v1/messages`     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | tare da `/v1`          | E                                              |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | tare da `/v1`          | E                                              |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | tushe                  | A’a — SDK yana ƙara `/v1beta/models/…`         |
| `setup-5dive` (`ANTHROPIC_BASE_URL` a cikin bayanin auth)                  | tushe                  | A’a — Claude Code yana ƙara `/v1/messages`     |

---

## Kiyaye native deps yayin sabuntawa: `--include=optional`

Lokacin da kuka sabunta da `omniroute update` (bayan tabbatarwa, ko tare da `--apply`),
OmniRoute yana gudanar da shigarwar tare da `--include=optional` da aka riga aka haɗa:

```bash
npm install -g omniroute@latest --include=optional
```

Wannan **ba** flag ba ne da za ku tura wa `omniroute update` — mai sabuntawa ne
koyaushe yake amfani da shi. Yana tabbatar da cewa `optionalDependencies`
(`better-sqlite3`, `keytar`, `tls-client`, tarin LLMLingua SLM) sun ci gaba da
kasancewa bayan sabuntawa ko da saitin npm ɗinku yana da `omit=optional`, wanda
in ba haka ba zai cire native SQLite driver da haɗin OS-keyring a ɓoye. Don ganin
ainihin umarnin kafin aiwatar da shi:

```bash
omniroute update --dry-run
# [GWADAWA KAWAI] Za a gudanar da: npm install -g omniroute@latest --include=optional
```

Sauran flags na `omniroute update` (an tabbatar a cikin tushe): `--check` (fita da
1 idan ya tsufa), `--apply` (shigar ba tare da tambayar tabbatarwa ba), `--changelog`,
`--no-backup`, `--yes`.

---

## Google Gemini CLI ta hanyar `omniroute run gemini`

An tabbatar da ƙa’idar aiki da `@google/gemini-cli` 0.50.0: CLI yana mutunta
`GOOGLE_GEMINI_BASE_URL` kuma yana aika `POST /v1beta/models/<model>:generateContent`
(da `:streamGenerateContent?alt=sse`) zuwa gare shi — daidai da shimfiɗar Gemini
ta asali ta OmniRoute (`/v1beta`). `omniroute run gemini` yana haɗa wannan ta
atomatik:

- `GOOGLE_GEMINI_BASE_URL` → Base URL na OmniRoute mai aiki (tushe, babu `/v1`);
- `GEMINI_API_KEY` → bayanan shaidar OmniRoute da aka warware (zaɓi/env/context);
- **`GEMINI_CLI_HOME` na ɗan lokaci kuma keɓantacce** wanda `.gemini/settings.json`
  ɗinsa yake zaɓar auth na `gemini-api-key`, don kada zaman Google OAuth da aka
  adana (Code Assist) ya taɓa rinjayar ƙaddamarwar da aka karkatar zuwa OmniRoute
  — ana cire shi bayan fita;
- **tsabtar env**: ana cire `GOOGLE_API_KEY`, `GOOGLE_GENAI_USE_VERTEXAI` da
  `GOOGLE_GENAI_USE_GCA` daga env na child process (waɗanda za su karkatar da auth
  zuwa Vertex/Code Assist), sannan a saita
  `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key` a matsayin ƙarin kariya — sauran
  manufofin `run` suna samun irin wannan kulawa ga nasu variables masu karo da juna;
- shigar da `--model <id>` daga `--provider`/`--model`.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Har yanzu kariyar amincewa da workspace ta Gemini tana aiki a yanayin headless —
ku tura `--skip-trust` (ko ku amince da directory ɗin ta hanyar hulɗa) da kanku;
launcher ɗin da gangan ba ya ketare ta. Wannan launcher ya bambanta da
**rajistar ACP** (`src/lib/acp/registry.ts`, `gemini --acp`), wadda har yanzu ita
ce haɗawar agent-protocol don `/dashboard/acp-agents`.

---

## Gwajin hayaki na ainihi (na zaɓi)

Ana gudanar da gwajin koma-bayan tsarin ƙaddamarwa mai tabbataccen sakamako a cikin CI (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). Don tabbatar da binaries na AINIHI a kan sabar
OmniRoute ta AINIHI, akwai tsarin gwaji na zaɓi a
`tests/integration/upstream-cli-smoke.int.test.ts`. Ba ya taɓa gudana ta atomatik
(kowane ƙaramin gwaji ana tsallake shi sai idan `RUN_CLI_SMOKE=1`), yana miƙa bayanan shiga ta SUNAN env-var
(ba ta ƙimarsa ba), yana ɓoye jerin haruffa masu kama da maɓalli daga duk wani fitarwa da aka adana, yana tsallake
manufofin da ba a shigar da binary ɗinsu ba, kuma yana rarraba gazawa zuwa
auth / upstream / config maimakon ƙimar boolean kawai:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

Na zaɓi: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` yana taƙaita gwajin;
`OMNIROUTE_SMOKE_TIMEOUT_MS` yana maye gurbin iyakar lokacin daƙiƙa 120 ga kowace manufa.

---

## Duba kuma

- [Tsarin Claude Code](./CLAUDE-CODE-CONFIGURATION.md) — cikakken jagorar Claude Code
- [Tsarin Codex CLI](./CODEX-CLI-CONFIGURATION.md) — saitin tushe na `[model_providers.omniroute]` da ake yi sau ɗaya
- [Yanayin Nesa](./REMOTE-MODE.md) — mahallai, tokens na shiga masu iyakantaccen fage, sarrafa sabar nesa
- [Manunin Kayan Aikin CLI](../reference/CLI-TOOLS.md) — cikakken kundin kayan aikin da ake tallafawa + shafukan dashboard
- [Jagorar Saiti](./SETUP_GUIDE.md) — hanyoyin shigarwa da jagorancin fara amfani na farko
