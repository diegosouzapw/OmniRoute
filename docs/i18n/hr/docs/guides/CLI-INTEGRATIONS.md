# CLI-INTEGRATIONS (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇷 [el](../../../el/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇪 [et](../../../et/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇪 [ga](../../../ga/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇹 [lt](../../../lt/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇻 [lv](../../../lv/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇹 [mt](../../../mt/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇮 [sl](../../../sl/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇸 [sr](../../../sr/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

---

title: "CLI Integracije — usmjerite bilo koji coding CLI na OmniRoute"
version: 3.8.50
lastUpdated: 2026-08-18
---

# CLI Integracije

OmniRoute isporučuje skupinu `setup-*` naredbi koje konfiguriraju coding
CLI (Codex, Claude Code, OpenCode, Cline, …) da koristi OmniRoute kao pozadinsku uslugu — tako
da alat komunicira s **jednom** krajnjom točkom, a OmniRoute preusmjerava na pravog pružatelja uz
automatski prelazak na zamjenu. Svaka naredba čita **aktivan** katalog modela s pokrenutog
OmniRoute instance (lokalne ili udaljene) i zapisuje vlastitu konfiguracijsku datoteku alata na **vašem**
računalu. API ključ se referencira putem varijable okruženja gdje god to alat podržava. Naredbe koje trajno pohranjuju lokalnu datoteku okruženja alata navedene su u nastavku.

Postoji i generički pokretač — `omniroute run <target>` — koji pokreće
`claude`, `codex`, `aider`, `goose`, `opencode`, `qwen` ili `gemini` s
ispravno postavljenim env varijablama, bez pisanja ikakve konfiguracije. Ciljevi i njihovi
pseudonimi dolaze iz kanonskog manifesta `bin/cli/cli-manifest.mjs`
(`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`,
`open-code`, `qwen-code`, `gemini-cli`), a `omniroute completion` nudi
iste ciljne riječi izvedene iz manifesta. Naslijeđeni pokretači za pojedine alate —
`omniroute launch` (Claude Code) i `omniroute launch-codex` (Codex) — ostaju
dostupni.

Uključivanje pružatelja usluga dostupno je iz istog lokalnog/udaljenog konteksta. Naredbe
usmjerene na API u nastavku drže autentikaciju upravljanja odvojenom od vjerodajnica pružatelja
i nikada ne ispisuju vjerodajnicu u strukturiranom izlazu:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

Za skripte preferirajte `--credential-stdin` ili `--credential-env`; `--credential`
je zadržan za kontroliranu lokalnu upotrebu. `providers remove` zahtijeva `--yes` na
neterminalnom sučelju, a svih pet naredbi poštuje aktivni kontekst ili
globalne opcije `--base-url`/`--api-key`.

Za jednokratno, ručno pisano osnovno postavljanje dviju najbogatijih integracija, pogledajte
detaljne vodiče za pojedine alate:

- [Konfiguracija Claude Code](./CLAUDE-CODE-CONFIGURATION.md)
- [Konfiguracija Codex CLI](./CODEX-CLI-CONFIGURATION.md)
- [Udaljeni način rada](./REMOTE-MODE.md) — upravljajte udaljenim OmniRoute (VPS / Tailnet) s vašeg laptopa
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — OmniCopilot ekstenzija; može i sama pokrenuti ove
  `setup-*` naredbe iz uređivača

---

## Glavna tablica

Svaka naredba poštuje **aktivni kontekst** (postavljen s `omniroute connect`, vidi
[Udaljeni način rada](./REMOTE-MODE.md)) ili eksplicitne zastavice `--remote <url> --api-key <key>`.
"Lokalno vs udaljeno" u nastavku znači: bez zastavica cilja `http://localhost:20128`;
s `--remote` (ili aktivnim udaljenim kontekstom) dohvaća katalog s tog
poslužitelja i lokalno zapisuje konfiguraciju.

| Naredba                    | Alat                           | Što zapisuje                                                                                                                                                           | Ključne zastavice                                                                                                                          | Lokalno vs udaljeno |
| -------------------------- | ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI               | `~/.codex/<name>.config.toml` — jedan profil po kompatibilnom tekstualnom modelu (`codex --profile <name>`)                                                            | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | Oba                 |
| `omniroute setup-claude`   | Claude Code                    | `~/.claude/profiles/<name>/settings.json` — jedan profil po odgovarajućem modelu (`CLAUDE_CONFIG_DIR`)                                                                 | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | Oba                 |
| `omniroute setup-opencode` | OpenCode (openai-compatible)   | `~/.config/opencode/opencode.json` — `omniroute` pružatelj s svakim modelom iz kataloga (`opencode -m omniroute/<model>`)                                              | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | Oba                 |
| `omniroute setup-cline`    | Cline                          | `~/.cline/data/{globalState,secrets}.json` (CLI način) + ispisuje postavke VS Code ekstenzije                                                                          | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | Oba                 |
| `omniroute setup-kilo`     | Kilo Code                      | `~/.local/share/kilo/auth.json` (CLI) + spaja `kilocode.*` u VS Code `settings.json` ako postoji                                                                       | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | Oba                 |
| `omniroute setup-continue` | Continue / `cn` CLI            | `~/.continue/config.yaml` — modeli s `provider: openai`, ključ putem `${{ secrets.OMNIROUTE_API_KEY }}`                                                                | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Oba                 |
| `omniroute setup-cursor`   | Cursor                         | Ništa — ispisuje korake unutar aplikacije (Cursor konfiguracija je neprozirni SQLite)                                                                                  | `--remote` `--api-key` `--only` `--port`                                                                                                   | Oba                 |
| `omniroute setup-roo`      | Roo Code                       | `~/.omniroute/roo-settings.json` (dokument za uvoz) + postavlja `roo-cline.autoImportSettingsPath` ako postoji VS Code `settings.json`                                 | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | Oba                 |
| `omniroute setup-crush`    | Crush                          | `~/.config/crush/crush.json` — `openai-compat` pružatelj, ključ putem `$OMNIROUTE_API_KEY`                                                                             | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Oba                 |
| `omniroute setup-goose`    | Goose                          | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + ispisuje env recept                                                                     | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Oba                 |
| `omniroute setup-aider`    | Aider                          | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + ispisuje env recept                                                                                   | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Oba                 |
| `omniroute setup-qwen`     | Qwen Code                      | `~/.qwen/settings.json` — V4 `modelProviders.openai` polje + `OMNIROUTE_API_KEY` u `~/.qwen/.env`                                                                      | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | Oba                 |
| `omniroute setup-5dive`    | 5dive (agent fleet)            | Ništa pod `$HOME` — zapisuje 5dive **auth profil** (`/var/lib/5dive/auth-profiles/<name>/`) putem `5dive agent auth set`; samo root, pokreće se na fleet hostu         | `--remote` `--api-key` `--model` `--auth-profile` `--agent` `--byo-provider` `--fivedive-bin` `--no-sudo` `--yes` `--dry-run` `--port`     | Oba                 |
| `omniroute run <target>`   | Runtime pokretanje (generičko) | Ništa — pokreće `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini` s ispravnim env varijablama i argumentima; Qwen i Gemini koriste privremeni izolirani home | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | Oba                 |
| `omniroute launch`         | Claude Code                    | Ništa — pokreće `claude` s umetnutim `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN`                                                                                       | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | Oba                 |
| `omniroute launch-codex`   | OpenAI Codex CLI               | Ništa — pokreće `codex` s umetnutim `omniroute` pružateljem putem `-c` zastavica                                                                                       | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | Oba                 |

Napomene o zastavicama (provjereno u izvornom kodu naredbi):

- `--remote <url>` — dohvaća katalog s udaljenog OmniRoute (nadjačava `--port`
  i aktivni kontekst). `--api-key <key>` pruža vjerodajnicu za taj
  poslužitelj (zadano na env varijablu `OMNIROUTE_API_KEY`, ili token aktivnog konteksta).
- `--only <patterns>` — podnizkovi odvojeni zarezima; zadržava samo ID-ove modela koji se podudaraju
  (npr. `--only glm,kimi`). Dostupno na `setup-codex`, `setup-claude`,
  `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`.
- `--dry-run` — ispisuje točno što bi bilo zapisano bez dodirivanja
  datotečnog sustava. Dostupno na svakoj `setup-*` naredbi **osim** `setup-cursor`
  (koja nikada ne zapisuje datoteku).
- `--model <id>` — obavezno (ili odabrano interaktivno) za alate koji nemaju
  automatsko otkrivanje modela: Cline, Kilo, Roo, Goose, Qwen, Aider, 5dive. Ti alati
  također prihvaćaju `--yes` za neinteraktivna pokretanja (što tada zahtijeva `--model`).
  `setup-opencode` prima `--model` za postavljanje zadanog modela najviše razine.
- `--model <id>` na `omniroute run` prati ožičenje manifesta po cilju
  (`bin/cli/cli-manifest.mjs`): **aider** prima `--model openai/<id>`, a
  **opencode** `--model omniroute/<id>` (prefiks se dodaje samo kada id
  ga već ne sadrži); **qwen** i **gemini** primaju id doslovno;
  **claude** ga dobiva putem `ANTHROPIC_MODEL`, **goose** putem `GOOSE_MODEL`, a
  **codex** putem `-c model_providers.omniroute.*` argumenata. **Qwen je jedini run
  cilj koji strogo zahtijeva `--model`** — `omniroute run qwen` bez njega izlazi
  s `2` uz eksplicitnu grešku.
- `--port <port>` — lokalni OmniRoute port (zadano `20128`, ignorira se kada je postavljen `--remote`).
  Prisutno na svim `setup-*` naredbama i oba pokretača.
- Izlazni kodovi `omniroute run`: vlastiti izlazni kod podređenog CLI-ja se prenosi
  doslovno; `2` = nevaljani argumenti (nepodržani cilj, nedostaje obavezni
  `--model`, zaštita kontejnera); `127` = ciljana binarna datoteka nije u `PATH`-u;
  `130`/`143`/`129` kada je pokretanje završeno s `SIGINT`/`SIGTERM`/`SIGHUP`;
  `1` = ostale greške pri pokretanju.
- Oba pokretača (`launch`, `launch-codex`) prihvaćaju `--profile <name>` za odabir
  profila zapisanog s `setup-claude` / `setup-codex`, uz argumente za prosljeđivanje temeljnoj
  binarnoj datoteci `claude` / `codex`.

Interaktivni birač također je zajednički za setup recepte:

```bash
# Odaberite iz aktivnog lokalnog ili udaljenog kataloga modela i konfigurirajte cilj.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

`configure` trenutno delegira na testirane recepte za `codex`, `claude`,
`opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, `kilo` i `5dive`.
Unosi kataloga samo za IDE,
MITM i samo za vodiče ostaju eksplicitni `setup-*`/ručni tokovi i
nisu prikazani kao ciljevi koji se mogu pokrenuti.

> `setup-opencode` je **lagana openai-kompatibilna** OpenCode integracija.
> Postoji i bogatija integracija putem dodatka — `omniroute setup opencode` — koja
> instalira `@omniroute/opencode-plugin`. To su različite naredbe; tablica
> iznad dokumentira `setup-opencode`.

---

## Lokalna uporaba

S OmniRoute koji radi na `localhost:20128`, jednostavno pokrenite narebu za postavljanje vašeg
alata. Katalog se dohvaća s lokalnog poslužitelja.

```bash
# Codex: napiši profil po podudarenom modelu u ~/.codex/
omniroute setup-codex
codex --profile glm52            # koristi generirani profil

# Claude Code: napiši profile po modelu, zatim pokreni jedan
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: napiši openai-kompatibilnog pružatelja sa svim modelima iz kataloga
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # referencira se putem {env:OMNIROUTE_API_KEY}, nikada na disku
opencode -m omniroute/glm/glm-5.2 "..."

# Alati bez automatskog otkrivanja zahtijevaju eksplicitan model:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# Pregled bez ikakvih zapisivanja:
omniroute setup-continue --dry-run
```

Pokretanje bez pisanja ikakve konfiguracije (samo ubrizgavanje okruženja):

```bash
omniroute launch                 # Claude Code → lokalni OmniRoute
omniroute launch-codex           # Codex CLI → lokalni OmniRoute
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# Eksplicitna putanja naredbe: proslijedi sve što dolazi iza --
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## Udaljenja uporaba

Usmjerite bilo koju naredbu za postavljanje prema udaljenom OmniRouteu s `--remote` + `--api-key`. Katalog
se dohvaća s udaljenog poslužitelja; konfiguracija se zapisuje na vašem lokalnom računalu.

```bash
# OpenCode prema udaljenom VPS-u, zadrži samo modele glm/kimi
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # prvo izvezite OMNIROUTE_API_KEY

# Codex profili iz udaljenog kataloga
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# Pokretanje CLI-ja izravno prema udaljenom poslužitelju
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

Umjesto da svaki put prosljeđujete `--remote`/`--api-key`, prijavite se jednom i prepustite
**aktivnom kontekstu** da ih automatski osigura:

```bash
omniroute connect 192.168.0.15        # kreira opsežni token, pohranjuje kontekst
omniroute setup-codex                 # ← sada koristi udaljeni katalog
omniroute setup-opencode              # ← isto
omniroute launch                      # ← Claude Code prema udaljenom poslužitelju
```

Pogledajte [Udaljeni način rada](./REMOTE-MODE.md) za kontekste, opsege i upravljanje tokenima.

---

## 5dive flote agenata

[5dive](https://5dive.ai) pokreće flotu dugotrajnih agenata za kodiranje, od kojih je svaki
systemd jedinica pod vlastitim Unix korisnikom. To nije CLI za kodiranje sam po sebi, pa nema
ničega što bi `omniroute run` trebao pokrenuti — `5dive` je cilj **samo za konfiguriranje**.

```bash
omniroute configure 5dive --model failover-demo --yes
omniroute setup-5dive --model failover-demo --auth-profile omniroute --agent worker1
```

Oba oblika zapisuju jedan 5dive **auth profil**, a svako `claude` sjedalo vezano uz taj
profil tada komunicira s OmniRouteom. Tri stvari su specifične za ovaj cilj:

- **Pokreće se na poslužitelju flote, kao root.** 5dive-ovi glagoli djeluju na lokalne systemd jedinice
  i direktorij stanja koji je u vlasništvu roota; ne postoji udaljeni način rada. Recept se ponovno izvršava kroz
  `sudo` kada već nije root (`--no-sudo` to isključuje i umjesto toga ispisuje naredbu).
- **Krajnja točka mora biti `https://` osim ako nije loopback.** API ključ agenta
  putuje tom URL-om na svakom zahtjevu, a 5dive odbija nešifriranu krajnju točku izvan uređaja.
  Privatna LAN adresa nije iznimka.
- **Vlastiti pin modela svakog sjedala nadmašuje profil.** Profil nosi
  `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL`, ali sjedalo koje je i dalje prikvačeno na standardni
  id modela ne uspijeva pri prvom potezu s porukom _"There's an issue with the selected model"_.
  Prosljeđujte `--agent <name>` (može se ponavljati) da biste prikvačili i sjedala; recept ispisuje
  naredbu kada to ne učinite.

API ključ se predaje 5diveu putem **stdin-a** (`--api-key=-`), pa se nikada ne pojavljuje u
ispisu `ps`.

Usmjeravanje profila na OmniRoute **kombinaciju** umjesto na jedan model ono je što
osigurava prebacivanje pružatelja usluge za flotu: kada je primarna krajnja točka potpuno pala usred poteza
u snimljenom izvođenju na
[#11578](https://github.com/diegosouzapw/OmniRoute/issues/11578), agent je završio
preostale korake na rezervnoj krajnjoj točki i nikada nije izložio prekid rada.

---

## Konvencije osnovnog URL-a (koji alati žele `/v1`)

OmniRoute izlaže OpenAI sučelje na `/v1`, Anthropic sučelje na korijenu,
a izvorno Gemini sučelje na `/v1beta`. Svaka integracija spojena je na oblik koji
njezin alat očekuje (provjereno u izvornom kodu naredbe):

| Integracija                                                                | Upisani osnovni URL | `/v1`?                                     |
| -------------------------------------------------------------------------- | ------------------- | ------------------------------------------ |
| `setup-cline` (`openAiBaseUrl`)                                            | korijen             | Ne — Cline dodaje `/v1/chat/completions`   |
| `setup-goose` (`OPENAI_HOST`)                                              | korijen             | Ne — Goose dodaje putanju                  |
| `setup-aider` (`OPENAI_API_BASE`)                                          | korijen             | Ne — LiteLLM dodaje `/v1/chat/completions` |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | s `/v1`             | Da                                         |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | korijen             | Ne — Claude Code dodaje `/v1/messages`     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | s `/v1`             | Da                                         |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | s `/v1`             | Da                                         |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | korijen             | Ne — SDK dodaje `/v1beta/models/…`         |
| `setup-5dive` (`ANTHROPIC_BASE_URL` u auth profilu)                        | korijen             | Ne — Claude Code dodaje `/v1/messages`     |

---

## Zadržavanje izvornih ovisnosti pri ažuriranju: `--include=optional`

Kada ažurirate pomoću `omniroute update` (nakon potvrde ili s `--apply`),
OmniRoute pokreće instalaciju s ugrađenom zastavicom `--include=optional`:

```bash
npm install -g omniroute@latest --include=optional
```

Ovo **nije** zastavica koju prosljeđujete naredbi `omniroute update` — uvijek je primjenjuje
program za ažuriranje. Jamči da `optionalDependencies` (`better-sqlite3`, `keytar`,
`tls-client`, LLMLingua SLM skup) prežive ažuriranje čak i ako vaša npm konfiguracija
ima postavljeno `omit=optional`, što bi inače tiho uklonilo izvorni SQLite
upravljački program i vezanje OS privjeska za ključeve. Za pregled točne naredbe bez primjene:

```bash
omniroute update --dry-run
# [PROBNI POKRET] Bi pokrenuo: npm install -g omniroute@latest --include=optional
```

Ostale zastavice naredbe `omniroute update` (provjereno u izvornom kodu): `--check` (izlaz 1 ako je
zastarjelo), `--apply` (instalacija bez upita), `--changelog`, `--no-backup`,
`--yes`.

---

## Google Gemini CLI putem `omniroute run gemini`

Ugovor provjeren za `@google/gemini-cli` 0.50.0: CLI poštuje
`GOOGLE_GEMINI_BASE_URL` i šalje `POST /v1beta/models/<model>:generateContent`
(i `:streamGenerateContent?alt=sse`) na njega — točno OmniRouteovo izvorno
Gemini sučelje (`/v1beta`). `omniroute run gemini` to automatski povezuje:

- `GOOGLE_GEMINI_BASE_URL` → aktivni OmniRoute osnovni URL (korijen, bez `/v1`);
- `GEMINI_API_KEY` → razriješena OmniRoute vjerodajnica (opcija/env/kontekst);
- **privremeni izolirani `GEMINI_CLI_HOME`** čiji `.gemini/settings.json`
  odabire autentifikaciju `gemini-api-key`, tako da pohranjena Google OAuth sesija (Code Assist)
  nikada ne nadjača OmniRoute-usmjereno pokretanje — uklanja se nakon izlaska;
- **higijene okoline**: dječja okolina pročišćuje se od `GOOGLE_API_KEY`,
  `GOOGLE_GENAI_USE_VERTEXAI` i `GOOGLE_GENAI_USE_GCA` (koji bi preusmjerili
  autentifikaciju na Vertex/Code Assist), a `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key` postavlja se
  kao rezervna mjera pojačane sigurnosti — ostale mete `run` dobivaju jednaki
  tretman za vlastite varijable koje su u sukobu;
- ubacivanje `--model <id>` iz `--provider`/`--model`.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Geminijev zaštitnik povjerenja radnog prostora i dalje se primjenjuje u bezglavom načinu — prenesite
`--skip-trust` (ili interaktivno prihvatite direktorij) sami; pokretač
to namjerno ne zaobilazi. Ovaj pokretač razlikuje se od **ACP
registracije** (`src/lib/acp/registry.ts`, `gemini --acp`), koja ostaje
integracija agentskog protokola za `/dashboard/acp-agents`.

---

## Pravi smoke test (opt-in)

Determinističko pokretanje regresijskih testova plana pokretanja u CI-u (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). Za validaciju PRAVIH binara protiv PRAVOG
OmniRoute poslužitelja, opt-in okvir postoji na
`tests/integration/upstream-cli-smoke.int.test.ts`. Nikada se ne pokreće automatski
(svaki podtest se preskače osim ako nije postavljen `RUN_CLI_SMOKE=1`), prosljeđuje vjerodajnicu putem env-var
NAZIVA (nikada putem vrijednosti), uklanja nizove koji izgledaju kao ključevi iz bilo kojeg snimljenog izlaza, preskače
ciljeve čiji binarni program nije instaliran, te klasificira neuspjehe kao
auth / upstream / config umjesto jednostavne logičke vrijednosti:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

Neobavezno: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` ograničava sweep;
`OMNIROUTE_SMOKE_TIMEOUT_MS` nadjačava vremensko ograničenje od 120s po cilju.

---

## Vidi također

- [Konfiguracija Claude Code](./CLAUDE-CODE-CONFIGURATION.md) — detaljniji vodič za Claude Code
- [Konfiguracija Codex CLI](./CODEX-CLI-CONFIGURATION.md) — jednokratno postavljanje `[model_providers.omniroute]` baze
- [Udaljeni način rada](./REMOTE-MODE.md) — konteksti, ograničeni pristupni tokeni, upravljanje udaljenim poslužiteljem
- [Referenca CLI alata](../reference/CLI-TOOLS.md) — potpuni katalog podržanih alata i stranica nadzorne ploče
- [Vodič za postavljanje](./SETUP_GUIDE.md) — metode instalacije i uvođenje pri prvom pokretanju
