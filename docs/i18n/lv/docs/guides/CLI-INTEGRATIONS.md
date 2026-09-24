# CLI Integrations (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇪🇹 [am](../../../am/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇦 [bs](../../../bs/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇷 [el](../../../el/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇪 [et](../../../et/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇪 [ga](../../../ga/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ha](../../../ha/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇷 [hr](../../../hr/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇲 [hy](../../../hy/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ig](../../../ig/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇪 [ka](../../../ka/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇭 [km](../../../km/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [kn](../../../kn/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇹 [lt](../../../lt/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ml](../../../ml/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇹 [mt](../../../mt/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇲 [my](../../../my/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇵 [ne](../../../ne/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [or](../../../or/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [pa](../../../pa/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇰 [si](../../../si/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇮 [sl](../../../sl/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇸 [sr](../../../sr/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇿 [uz](../../../uz/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [yo](../../../yo/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

OmniRoute nodrošina `setup-*` komandu saimi, kas konfigurē programmēšanas
CLI (Codex, Claude Code, OpenCode, Cline, …), lai tas izmantotu OmniRoute kā savu aizmugursistēmu — tādējādi
rīks sazinās ar **vienu** galapunktu, bet OmniRoute novirza pieprasījumus uz pareizo pakalpojumu sniedzēju,
izmantojot automātisku rezerves variantu. Katra komanda nolasa **aktuālo** modeļu katalogu no darbojošās
OmniRoute instances (lokālas vai attālas) un ieraksta paša rīka konfigurācijas failu **jūsu**
datorā. Ja rīks to atbalsta, atsauce uz API atslēgu tiek norādīta ar vides mainīgo. Komandas, kas saglabā rīka lokālo vides failu, ir norādītas tālāk.

Ir pieejams arī universāls palaidējs — `omniroute run <target>` —, kas palaiž
`claude`, `codex`, `aider`, `goose`, `opencode`, `qwen` vai `gemini` ar
ievadītu atbilstošo vidi, vispār neierakstot nekādu konfigurāciju. Mērķi un to
aizstājvārdi tiek iegūti no kanoniskā manifesta `bin/cli/cli-manifest.mjs`
(`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`,
`open-code`, `qwen-code`, `gemini-cli`), un `omniroute completion` piedāvā tos
pašus no manifesta iegūtos mērķu nosaukumus. Mantotie katram rīkam paredzētie palaidēji —
`omniroute launch` (Claude Code) un `omniroute launch-codex` (Codex) — joprojām ir
pieejami.

Pakalpojumu sniedzēju pievienošana ir pieejama tajā pašā lokālajā vai attālajā kontekstā. Tālāk norādītās
API prioritārās komandas nošķir pārvaldības autentifikāciju no pakalpojumu sniedzēju
akreditācijas datiem un nekad neizvada akreditācijas datus strukturētā izvadē:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

Skriptos ieteicams izmantot `--credential-stdin` vai `--credential-env`; `--credential`
ir saglabāts kontrolētai lokālai lietošanai. Neinteraktīvā terminālī komandai `providers remove`
ir nepieciešams `--yes`, un visas piecas komandas ievēro aktīvo kontekstu vai
globālās opcijas `--base-url`/`--api-key`.

Informāciju par abu funkcijām bagātāko integrāciju vienreizējo, manuāli veicamo pamatkonfigurāciju skatiet
katram rīkam paredzētajos detalizētajos aprakstos:

- [Claude Code konfigurācija](./CLAUDE-CODE-CONFIGURATION.md)
- [Codex CLI konfigurācija](./CODEX-CLI-CONFIGURATION.md)
- [Attālais režīms](./REMOTE-MODE.md) — pārvaldiet attālu OmniRoute instanci (VPS / Tailnet) no sava klēpjdatora
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — OmniCopilot paplašinājums; tas var arī izpildīt šīs
  `setup-*` komandas jūsu vietā tieši redaktorā

---

## Galvenā tabula

Katra komanda ievēro **aktīvo kontekstu** (iestatīts ar `omniroute connect`, skatiet
[Attālais režīms](./REMOTE-MODE.md)) vai tieši norādītos `--remote <url> --api-key <key>` karogus.
Tālāk tekstā “lokāls vai attāls” nozīmē: bez karogiem mērķis ir `http://localhost:20128`;
ar `--remote` (vai aktīvu attālo kontekstu) katalogs tiek izgūts no attiecīgā
servera, un konfigurācija tiek ierakstīta lokāli.

| Komanda                    | Rīks                              | Ko tā ieraksta                                                                                                                                                                                         | Galvenie karodziņi                                                                                                                         | Lokāli vai attālināti |
| -------------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | --------------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI                  | `~/.codex/<name>.config.toml` — viens profils katram saderīgajam teksta modelim (`codex --profile <name>`)                                                                                             | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | Abi                   |
| `omniroute setup-claude`   | Claude Code                       | `~/.claude/profiles/<name>/settings.json` — viens profils katram atbilstošajam modelim (`CLAUDE_CONFIG_DIR`)                                                                                           | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | Abi                   |
| `omniroute setup-opencode` | OpenCode (saderīgs ar OpenAI)     | `~/.config/opencode/opencode.json` — `omniroute` nodrošinātājs ar visiem kataloga modeļiem (`opencode -m omniroute/<model>`)                                                                           | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | Abi                   |
| `omniroute setup-cline`    | Cline                             | `~/.cline/data/{globalState,secrets}.json` (CLI režīms) + izdrukā VS Code paplašinājuma iestatījumus                                                                                                   | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | Abi                   |
| `omniroute setup-kilo`     | Kilo Code                         | `~/.local/share/kilo/auth.json` (CLI) + apvieno `kilocode.*` ar VS Code `settings.json`, ja tas pastāv                                                                                                 | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | Abi                   |
| `omniroute setup-continue` | Continue / `cn` CLI               | `~/.continue/config.yaml` — `provider: openai` modeļi, atslēga, izmantojot `${{ secrets.OMNIROUTE_API_KEY }}`                                                                                          | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Abi                   |
| `omniroute setup-cursor`   | Cursor                            | Neko — izdrukā lietotnē veicamās darbības (Cursor konfigurācija ir necaurskatāma SQLite datubāze)                                                                                                      | `--remote` `--api-key` `--only` `--port`                                                                                                   | Abi                   |
| `omniroute setup-roo`      | Roo Code                          | `~/.omniroute/roo-settings.json` (importēšanas dokuments) + iestata `roo-cline.autoImportSettingsPath`, ja pastāv VS Code `settings.json`                                                              | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | Abi                   |
| `omniroute setup-crush`    | Crush                             | `~/.config/crush/crush.json` — `openai-compat` nodrošinātājs, atslēga, izmantojot `$OMNIROUTE_API_KEY`                                                                                                 | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Abi                   |
| `omniroute setup-goose`    | Goose                             | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + izdrukā vides konfigurēšanas norādījumus                                                                                | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Abi                   |
| `omniroute setup-aider`    | Aider                             | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + izdrukā vides konfigurēšanas norādījumus                                                                                              | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Abi                   |
| `omniroute setup-qwen`     | Qwen Code                         | `~/.qwen/settings.json` — V4 `modelProviders.openai` masīvs + `OMNIROUTE_API_KEY` failā `~/.qwen/.env`                                                                                                 | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | Abi                   |
| `omniroute setup-5dive`    | 5dive (aģentu flote)              | Neko mapē `$HOME` — ieraksta 5dive **autentifikācijas profilu** (`/var/lib/5dive/auth-profiles/<name>/`), izmantojot `5dive agent auth set`; nepieciešamas root tiesības, darbojas flotes resursdatorā | `--remote` `--api-key` `--model` `--auth-profile` `--agent` `--byo-provider` `--fivedive-bin` `--no-sudo` `--yes` `--dry-run` `--port`     | Abi                   |
| `omniroute run <target>`   | Izpildlaika palaišana (vispārīga) | Neko — palaiž `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini` ar pareizo vidi un argumentiem; Qwen un Gemini izmanto pagaidu izolētu mājas direktoriju                                     | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | Abi                   |
| `omniroute launch`         | Claude Code                       | Neko — palaiž `claude` ar ievadītiem `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN`                                                                                                                       | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | Abi                   |
| `omniroute launch-codex`   | OpenAI Codex CLI                  | Neko — palaiž `codex` ar `omniroute` nodrošinātāju, kas ievadīts, izmantojot `-c` karodziņus                                                                                                           | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | Abi                   |

Piezīmes par karodziņiem (pārbaudītas komandas pirmkodā):

- `--remote <url>` — izgūst katalogu no attāla OmniRoute servera (ignorē `--port`
  un aktīvo kontekstu). `--api-key <key>` norāda šī servera akreditācijas datus
  (pēc noklusējuma izmanto `OMNIROUTE_API_KEY` vides mainīgo vai aktīvā konteksta pilnvaru).
- `--only <patterns>` — ar komatiem atdalītas apakšvirknes; patur tikai modeļu ID, kas atbilst
  (piem., `--only glm,kimi`). Pieejams komandām `setup-codex`, `setup-claude`,
  `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`.
- `--dry-run` — izvada tieši to, kas tiktu ierakstīts, nemainot
  failu sistēmu. Pieejams katrai `setup-*` komandai, **izņemot** `setup-cursor`
  (kas nekad neraksta failā).
- `--model <id>` — obligāts (vai izvēlēts interaktīvi) rīkiem, kuriem nav
  automātiskas modeļu atrašanas: Cline, Kilo, Roo, Goose, Qwen, Aider, 5dive. Šie rīki
  atbalsta arī `--yes` neinteraktīvai palaišanai (tādā gadījumā nepieciešams `--model`).
  `setup-opencode` izmanto `--model`, lai iestatītu noklusējuma augstākā līmeņa modeli.
- `--model <id>` komandā `omniroute run` ievēro manifesta katram mērķim noteikto sasaisti
  (`bin/cli/cli-manifest.mjs`): **aider** saņem `--model openai/<id>`, bet
  **opencode** — `--model omniroute/<id>` (prefikss tiek pievienots tikai tad, ja ID
  tas vēl nav norādīts); **qwen** un **gemini** saņem ID nemainītā veidā;
  **claude** to saņem ar `ANTHROPIC_MODEL`, **goose** — ar `GOOSE_MODEL`, bet
  **codex** — ar `-c model_providers.omniroute.*` argumentiem. **Qwen ir vienīgais palaišanas
  mērķis, kuram `--model` ir obligāti nepieciešams** — `omniroute run qwen` bez tā beidz darbu
  ar kodu `2` un nepārprotamu kļūdas ziņojumu.
- `--port <port>` — lokālais OmniRoute ports (pēc noklusējuma `20128`; tiek ignorēts, ja norādīts
  `--remote`). Pieejams visām `setup-*` komandām un abiem palaidējiem.
- `omniroute run` izejas kodi: pakārtotā CLI izejas kods tiek nodots
  nemainīts; `2` = nederīgi argumenti (neatbalstīts mērķis, trūkst obligātā
  `--model`, konteinera aizsardzības pārbaude); `127` = mērķa izpildāmais fails nav atrodams `PATH`;
  `130`/`143`/`129`, ja palaišanu pārtrauc `SIGINT`/`SIGTERM`/`SIGHUP`;
  `1` = cita izpildlaika palaišanas kļūme.
- Abi palaidēji (`launch`, `launch-codex`) pieņem `--profile <name>`, lai atlasītu
  profilu, ko izveidojis `setup-claude` / `setup-codex`, kā arī tālāk nododamus argumentus
  pamatā esošajam `claude` / `codex` izpildāmajam failam.

Interaktīvo atlasītāju kopīgi izmanto arī iestatīšanas receptes:

```bash
# Atlasiet modeli no aktīvā lokālā vai attālā modeļu kataloga un konfigurējiet mērķi.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

`configure` pašlaik deleģē darbību pārbaudītajām receptēm šādiem rīkiem: `codex`, `claude`,
`opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, `kilo` un `5dive`.
Tikai IDE paredzētie,
MITM un tikai ceļvežos aprakstītie kataloga ieraksti joprojām izmanto atsevišķas `setup-*`/manuālas darbplūsmas un
netiek piedāvāti kā palaižami mērķi.

> `setup-opencode` ir **vienkāršotā ar openai saderīgā** OpenCode integrācija.
> Ir pieejama arī funkcionāli bagātāka spraudņa integrācija — `omniroute setup opencode` —, kas
> instalē `@omniroute/opencode-plugin`. Tās ir atšķirīgas komandas; iepriekš esošajā tabulā
> ir dokumentēta `setup-opencode`.
>
> Spraudnis ir pieejams divās pakotnēs — pa vienai katrai OpenCode galvenajai versijai —, jo abi
> ielādētāji sagaida atšķirīgus ieejas punktus:
> `@omniroute/opencode-plugin` paredzēts OpenCode v1, bet
> `@omniroute/opencode-plugin-v2` — OpenCode v2. v2 pakotne ir jauna
> (`0.1.0`) un ievēro resursdatora līgumu, kas joprojām mainās, tādēļ tā nolasa
> struktūru, ko OpenCode ievieto kataloga melnrakstā, nevis pieņem konkrētu struktūru.
> Instalējiet to, pievienojot `plugins` ierakstu failam `opencode.json`; `omniroute setup opencode`
> joprojām instalē v1 pakotni. Opcijas un akreditācijas datu meklēšanas secība ir aprakstīta
> pakotnes README failā.

---

## Lokāla lietošana

Kamēr OmniRoute darbojas vietnē `localhost:20128`, vienkārši palaidiet savai
lietotnei paredzēto iestatīšanas komandu. Katalogs tiek iegūts no lokālā servera.

```bash
# Codex: ierakstīt profilu katram atbilstošajam modelim mapē ~/.codex/
omniroute setup-codex
codex --profile glm52            # izmantot ģenerētu profilu

# Claude Code: ierakstīt profilus katram modelim un pēc tam palaist vienu
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: ierakstīt ar OpenAI saderīgu nodrošinātāju ar visiem kataloga modeļiem
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # atsauce, izmantojot {env:OMNIROUTE_API_KEY}; nekad netiek saglabāta diskā
opencode -m omniroute/glm/glm-5.2 "..."

# Rīkiem bez automātiskas atklāšanas nepieciešams norādīt modeli:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# Priekšskatījums, neko neierakstot:
omniroute setup-continue --dry-run
```

Palaidiet, vispār neierakstot konfigurāciju (tikai vides mainīgo ievade):

```bash
omniroute launch                 # Claude Code → lokālais OmniRoute
omniroute launch-codex           # Codex CLI → lokālais OmniRoute
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# Precīzs komandas ceļš: nodot visu, kas atrodas aiz --
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## Attālināta lietošana

Norādiet jebkurai iestatīšanas komandai attālinātu OmniRoute, izmantojot `--remote`
un `--api-key`. Katalogs tiek iegūts no attālinātā servera, bet konfigurācija tiek
ierakstīta jūsu lokālajā datorā.

```bash
# OpenCode pret attālinātu VPS, saglabājot tikai glm/kimi modeļus
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # vispirms eksportēt OMNIROUTE_API_KEY

# Codex profili no attālināta kataloga
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# Palaist CLI tieši pret attālināto serveri
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

Tā vietā, lai katru reizi nodotu `--remote`/`--api-key`, piesakieties vienreiz un
ļaujiet **aktīvajam kontekstam** tos automātiski nodrošināt:

```bash
omniroute connect 192.168.0.15        # ģenerē ierobežotas darbības pilnvaru un saglabā kontekstu
omniroute setup-codex                 # ← tagad izmanto attālināto katalogu
omniroute setup-opencode              # ← tas pats
omniroute launch                      # ← Claude Code pret attālināto serveri
```

Skatiet sadaļu [Attālinātais režīms](./REMOTE-MODE.md), lai uzzinātu par
kontekstiem, tvērumiem un pilnvaru pārvaldību.

---

## 5dive aģentu flotes

[5dive](https://5dive.ai) darbina ilgstoši strādājošu kodēšanas aģentu floti, kur
katrs aģents ir systemd vienība ar savu Unix lietotāju. Tā pati par sevi nav
kodēšanas CLI, tāpēc `omniroute run` nav ko palaist — `5dive` ir **tikai
konfigurējams** mērķis.

```bash
omniroute configure 5dive --model failover-demo --yes
omniroute setup-5dive --model failover-demo --auth-profile omniroute --agent worker1
```

Abas formas ieraksta vienu 5dive **autentifikācijas profilu**, un katra šim
profilam piesaistītā `claude` vieta pēc tam sazinās ar OmniRoute. Šim mērķim ir
raksturīgas trīs lietas:

- **Tas darbojas flotes resursdatorā kā root.** 5dive darbības vārdi darbojas ar
  lokālām systemd vienībām un root piederošu stāvokļa mapi; attālinātais režīms
  nav pieejams. Ja recepte vēl nedarbojas ar root tiesībām, tā tiek palaista
  atkārtoti, izmantojot `sudo` (`--no-sudo` to atspējo un tā vietā izdrukā
  komandu).
- **Gala punktam jābūt `https://`, ja vien tas nav cilpas atgriezeniskās saites
  gals.** Aģenta API atslēga tiek nosūtīta šajā URL ar katru pieprasījumu, un
  5dive atsakās izmantot nešifrētu gala punktu ārpus datora. Privāta LAN adrese
  nav izņēmums.
- **Katras vietas pašas modeļa piesaiste ir svarīgāka par profilu.** Profilā ir
  `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL`, taču vieta, kas joprojām ir
  piesaistīta standarta modeļa ID, pirmajā pagriezienā neizdodas ar ziņojumu
  _"Atlasītajam modelim ir problēma"_. Izmantojiet `--agent <name>` (var norādīt
  atkārtoti), lai piesaistītu arī vietas; ja to nedarāt, recepte izdrukā komandu.

API atslēga tiek nodota 5dive, izmantojot **stdin** (`--api-key=-`), tāpēc tā
nekad neparādās `ps` izvadē.

Tieši norādot profilā OmniRoute **kombināciju**, nevis vienu modeli, flotes
nodrošinātājs iegūst kļūmjpārlēci: kad primārais gala punkts pārtraukumā
pilnībā nedarbojās izpildes laikā, kas aprakstīts
[#11578](https://github.com/diegosouzapw/OmniRoute/issues/11578), aģents pabeidza
atlikušās darbības, izmantojot rezerves gala punktu, un pārtraukums nekad netika
parādīts lietotājam.

---

## Bāzes URL konvencijas (kuriem rīkiem nepieciešams `/v1`)

OmniRoute nodrošina OpenAI saskarni `/v1`, Anthropic saskarni saknē
un vietējo Gemini saskarni `/v1beta`. Katra integrācija ir savienota tādā formā,
kādu sagaida tās rīks (pārbaudīts komandu avotā):

| Integrācija                                                                | Ierakstītais bāzes URL | `/v1`?                                       |
| -------------------------------------------------------------------------- | ---------------------- | -------------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | sakne                  | Nē — Cline pievieno `/v1/chat/completions`   |
| `setup-goose` (`OPENAI_HOST`)                                              | sakne                  | Nē — Goose pievieno ceļu                     |
| `setup-aider` (`OPENAI_API_BASE`)                                          | sakne                  | Nē — LiteLLM pievieno `/v1/chat/completions` |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | ar `/v1`               | Jā                                           |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | sakne                  | Nē — Claude Code pievieno `/v1/messages`     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | ar `/v1`               | Jā                                           |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | ar `/v1`               | Jā                                           |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | sakne                  | Nē — SDK pievieno `/v1beta/models/…`         |
| `setup-5dive` (`ANTHROPIC_BASE_URL` autentifikācijas profilā)              | sakne                  | Nē — Claude Code pievieno `/v1/messages`     |

---

## Vietējo atkarību saglabāšana atjaunināšanas laikā: `--include=optional`

Kad atjaunināt ar `omniroute update` (pēc apstiprināšanas vai ar `--apply`),
OmniRoute instalēšanu palaiž ar iebūvētu `--include=optional`:

```bash
npm install -g omniroute@latest --include=optional
```

Tas **nav** karodziņš, ko nododat `omniroute update` — atjauninātājs to vienmēr
pielieto. Tas garantē, ka `optionalDependencies` (`better-sqlite3`, `keytar`,
`tls-client`, LLMLingua SLM steks) pārdzīvo atjaunināšanu pat tad, ja jūsu npm konfigurācijā
ir iestatīts `omit=optional`, kas pretējā gadījumā nemanāmi noņemtu vietējo SQLite
draiveri un OS atslēgu piekariņa piesaisti. Lai priekšskatītu precīzu komandu, to neizpildot:

```bash
omniroute update --dry-run
# [DRY RUN] Tiks izpildīts: npm install -g omniroute@latest --include=optional
```

Citi `omniroute update` karodziņi (pārbaudīti avotā): `--check` (iziet ar kodu 1, ja
pieejams jaunāks izdevums), `--apply` (instalē bez uzvednes), `--changelog`, `--no-backup`,
`--yes`.

---

## Google Gemini CLI, izmantojot `omniroute run gemini`

Līgums pārbaudīts pret `@google/gemini-cli` 0.50.0: CLI ievēro
`GOOGLE_GEMINI_BASE_URL` un nosūta `POST /v1beta/models/<model>:generateContent`
(un `:streamGenerateContent?alt=sse`) pieprasījumus uz šo adresi — tieši uz OmniRoute vietējo
Gemini saskarni (`/v1beta`). `omniroute run gemini` to automātiski konfigurē:

- `GOOGLE_GEMINI_BASE_URL` → aktīvais OmniRoute bāzes URL (sakne, bez `/v1`);
- `GEMINI_API_KEY` → atrastie OmniRoute akreditācijas dati (opcija/vides mainīgais/konteksts);
- **pagaidu izolēts `GEMINI_CLI_HOME`**, kura `.gemini/settings.json`
  atlasa `gemini-api-key` autentifikāciju, tādējādi saglabāta Google OAuth sesija (Code Assist)
  nekad nepārraksta OmniRoute novirzīto palaišanu — pēc iziešanas tā tiek noņemta;
- **vides mainīgo tīrīšana**: bērnprocesa vide tiek attīrīta no `GOOGLE_API_KEY`,
  `GOOGLE_GENAI_USE_VERTEXAI` un `GOOGLE_GENAI_USE_GCA` (kas novirzītu
  autentifikāciju uz Vertex/Code Assist), un `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key`
  tiek iestatīts kā papildu drošības rezerves iestatījums — pārējie `run` mērķi saņem tādu pašu
  apstrādi attiecībā uz saviem konfliktējošajiem mainīgajiem;
- `--model <id>` ievietošana no `--provider`/`--model`.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Gemini darbvietas uzticamības aizsardzība bezgalvas režīmā joprojām ir spēkā — pašam
nododiet `--skip-trust` (vai interaktīvi uzticieties direktorijai); palaidējs
to apzināti neapej. Šis palaidējs atšķiras no **ACP reģistrācijas**
(`src/lib/acp/registry.ts`, `gemini --acp`), kas joprojām ir aģentu protokola integrācija
`/dashboard/acp-agents`.

---

## Reāla smoke pārbaude (pēc izvēles)

Deterministiskas palaišanas plāna regresijas pārbaudes CI vidē (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). Lai validētu REĀLOS bināros failus pret REĀLU
OmniRoute serveri, ir pieejams izvēles režīma palaidējs
`tests/integration/upstream-cli-smoke.int.test.ts`. Tas nekad netiek palaists automātiski
(ikviens apakštests tiek izlaists, ja vien nav iestatīts `RUN_CLI_SMOKE=1`), nodod
akreditācijas datus ar vides mainīgā NOSAUKUMU (nekad ne tā vērtību), noņem atslēgām
līdzīgas virknes no jebkādas reģistrētās izvades, izlaiž mērķus, kuru binārais fails nav
instalēts, un klasificē kļūmes kā autentifikācijas / augšupējā servera / konfigurācijas kļūmes,
nevis kā vienkāršu Būla vērtību:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

Pēc izvēles: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` ierobežo pārbaudi tikai
uz norādītajiem mērķiem; `OMNIROUTE_SMOKE_TIMEOUT_MS` pārraksta 120 s taimautu katram mērķim.

---

## Skatiet arī

- [Claude Code konfigurācija](./CLAUDE-CODE-CONFIGURATION.md) — padziļināta Claude Code rokasgrāmata
- [Codex CLI konfigurācija](./CODEX-CLI-CONFIGURATION.md) — vienreizēja `[model_providers.omniroute]` pamata iestatīšana
- [Attālais režīms](./REMOTE-MODE.md) — konteksti, tvērumā ierobežoti piekļuves marķieri, attālā servera vadīšana
- [CLI rīku uzziņas materiāls](../reference/CLI-TOOLS.md) — pilns atbalstīto rīku un informācijas paneļa lapu katalogs
- [Iestatīšanas rokasgrāmata](./SETUP_GUIDE.md) — instalēšanas metodes un pirmreizējā ieviešana
