# CLI Integrations (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇪🇹 [am](../../../am/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇷 [el](../../../el/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇪 [et](../../../et/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇪 [ga](../../../ga/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ha](../../../ha/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇷 [hr](../../../hr/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇲 [hy](../../../hy/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ig](../../../ig/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇪 [ka](../../../ka/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇭 [km](../../../km/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [kn](../../../kn/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇹 [lt](../../../lt/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇻 [lv](../../../lv/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ml](../../../ml/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇹 [mt](../../../mt/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇲 [my](../../../my/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇵 [ne](../../../ne/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [or](../../../or/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [pa](../../../pa/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇰 [si](../../../si/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇮 [sl](../../../sl/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇸 [sr](../../../sr/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇿 [uz](../../../uz/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [yo](../../../yo/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

OmniRoute isporučen je sa porodicom `setup-*` komandi koje konfigurišu CLI za kodiranje (Codex, Claude Code, OpenCode, Cline, …) da koristi OmniRoute kao svoj pozadinski sistem — tako da alat komunicira sa **jednom** krajnjom tačkom, a OmniRoute rutira ka pravom provajderu sa automatskim povratkom. Svaka komanda čita **živi** katalog modela iz pokrenutog OmniRoute-a (lokalnog ili udaljenog) i piše sopstvenu konfiguracionu datoteku alata na **vašoj** mašini. API ključ se referencira preko varijable okruženja gde god alat to podržava. Komande koje čuvaju lokalnu datoteku okruženja alata su navedene ispod.

Postoji i generički pokretač — `omniroute run <target>` — koji pokreće `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen` ili `gemini` sa injektiranim ispravnim okruženjem, bez pisanja ikakve konfiguracije. Ciljevi i njihovi alijasi dolaze iz kanonskog manifesta `bin/cli/cli-manifest.mjs` (`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`, `open-code`, `qwen-code`, `gemini-cli`), a `omniroute completion` nudi iste ciljne reči izvedene iz manifesta. Nasleđeni pokretači po alatu — `omniroute launch` (Claude Code) i `omniroute launch-codex` (Codex) — ostaju dostupni.

Uključivanje provajdera je dostupno iz istog lokalnog/udaljenog konteksta. Komande sa prioritetom na API ispod drže autentifikaciju upravljanja odvojenom od kredencijala provajdera i nikada ne štampaju kredencijal u strukturiranom izlazu:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

Za skripte, preferirajte `--credential-stdin` ili `--credential-env`; `--credential` je zadržan za kontrolisanu lokalnu upotrebu. `providers remove` zahteva `--yes` na neinteraktivnom terminalu, i svih pet komandi poštuju aktivni kontekst ili globalne opcije `--base-url`/`--api-key`.

Selektori provajdera odbijaju dvosmislene prefikse ID-a, imena ili imena provajdera; koristite pun ID veze kada se podudara više veza. Komande za kreiranje i uređivanje ponovo čitaju sačuvanu vezu, a uklanjanje proverava da li više nije čitljiva. Uvoz preskače postojeći par provajder/ime. Uvezeni unosi ne mogu nadjačati upravljačku krajnju tačku, kontekst ili upravljačke kredencijale dostavljene CLI-ju.

Za jednokratno, ručno pisano osnovno podešavanje dve najbogatije integracije, pogledajte detaljne preglede po alatu:

- [Konfiguracija Claude Code-a](./CLAUDE-CODE-CONFIGURATION.md)
- [Konfiguracija Codex CLI-ja](./CODEX-CLI-CONFIGURATION.md)
- [Udaljeni režim](./REMOTE-MODE.md) — upravljajte udaljenim OmniRoute-om (VPS / Tailnet) sa svog laptopa
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — OmniCopilot ekstenzija; takođe može pokrenuti ove `setup-*` komande za vas unutar editora

---

## Glavna tabela

Svaka naredba poštuje **aktivni kontekst** (postavljen pomoću `omniroute connect`, pogledajte
[Udaljeni način rada](./REMOTE-MODE.md)) ili eksplicitne zastavice `--remote <url> --api-key <key>`.
„Lokalno naspram udaljenog“ u nastavku znači: bez zastavica cilja `http://localhost:20128`;
s opcijom `--remote` (ili aktivnim udaljenim kontekstom) preuzima katalog s tog
servera i lokalno zapisuje konfiguraciju.

| Naredba                    | Alat                                         | Šta zapisuje                                                                                                                                                                        | Ključne opcije                                                                                                                             | Lokalno ili udaljeno |
| -------------------------- | -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | -------------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI                             | `~/.codex/<name>.config.toml` — jedan profil po kompatibilnom tekstualnom modelu (`codex --profile <name>`)                                                                         | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | Oboje                |
| `omniroute setup-claude`   | Claude Code                                  | `~/.claude/profiles/<name>/settings.json` — jedan profil po podudarnom modelu (`CLAUDE_CONFIG_DIR`)                                                                                 | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | Oboje                |
| `omniroute setup-opencode` | OpenCode (kompatibilan s OpenAI)             | `~/.config/opencode/opencode.json` — `omniroute` pružalac sa svakim modelom iz kataloga (`opencode -m omniroute/<model>`)                                                           | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | Oboje                |
| `omniroute setup-cline`    | Cline                                        | `~/.cline/data/{globalState,secrets}.json` (CLI režim) + ispisuje postavke ekstenzije za VS Code                                                                                    | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | Oboje                |
| `omniroute setup-kilo`     | Kilo Code                                    | `~/.local/share/kilo/auth.json` (CLI) + spaja `kilocode.*` u VS Code `settings.json` ako postoji                                                                                    | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | Oboje                |
| `omniroute setup-continue` | Continue / `cn` CLI                          | `~/.continue/config.yaml` — modeli s `provider: openai`, ključ putem `${{ secrets.OMNIROUTE_API_KEY }}`                                                                             | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Oboje                |
| `omniroute setup-cursor`   | Cursor                                       | Ništa — ispisuje korake unutar aplikacije (Cursor konfiguracija je neprozirni SQLite)                                                                                               | `--remote` `--api-key` `--only` `--port`                                                                                                   | Oboje                |
| `omniroute setup-roo`      | Roo Code                                     | `~/.omniroute/roo-settings.json` (dokument za uvoz) + postavlja `roo-cline.autoImportSettingsPath` ako postoji VS Code `settings.json`                                              | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | Oboje                |
| `omniroute setup-crush`    | Crush                                        | `~/.config/crush/crush.json` — `openai-compat` pružalac, ključ putem `$OMNIROUTE_API_KEY`                                                                                           | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Oboje                |
| `omniroute setup-goose`    | Goose                                        | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + ispisuje upute za varijable okruženja                                                                | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Oboje                |
| `omniroute setup-aider`    | Aider                                        | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + ispisuje upute za varijable okruženja                                                                              | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Oboje                |
| `omniroute setup-qwen`     | Qwen Code                                    | `~/.qwen/settings.json` — V4 niz `modelProviders.openai` + `OMNIROUTE_API_KEY` u `~/.qwen/.env`                                                                                     | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | Oboje                |
| `omniroute setup-5dive`    | 5dive (flota agenata)                        | Ništa unutar `$HOME` — zapisuje 5dive **profil za autentifikaciju** (`/var/lib/5dive/auth-profiles/<name>/`) putem `5dive agent auth set`; samo za root, izvršava se na hostu flote | `--remote` `--api-key` `--model` `--auth-profile` `--agent` `--byo-provider` `--fivedive-bin` `--no-sudo` `--yes` `--dry-run` `--port`     | Oboje                |
| `omniroute run <target>`   | Pokretanje u vrijeme izvršavanja (generičko) | Ništa — pokreće `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini` s odgovarajućim okruženjem i argumentima; Qwen i Gemini koriste privremeni izolirani početni direktorij | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | Oba                  |
| `omniroute launch`         | Claude Code                                  | Ništa — pokreće `claude` s umetnutim varijablama `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN`                                                                                        | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | Oba                  |
| `omniroute launch-codex`   | OpenAI Codex CLI                             | Ništa — pokreće `codex` s pružateljem `omniroute` umetnutim putem oznaka `-c`                                                                                                       | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | Oba                  |

Napomene o oznakama (provjereno u izvornom kodu naredbe):

- `--remote <url>` — dohvaća katalog s udaljenog OmniRoutea (nadjačava `--port`
  i aktivni kontekst). `--api-key <key>` pruža vjerodajnicu za taj
  server (zadana je vrijednost varijable okruženja `OMNIROUTE_API_KEY` ili token aktivnog konteksta).
- `--only <patterns>` — podnizovi odvojeni zarezima; zadržava samo ID-ove modela koji se podudaraju
  (npr. `--only glm,kimi`). Dostupno za `setup-codex`, `setup-claude`,
  `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`.
- `--dry-run` — ispisuje tačno ono što bi bilo zapisano bez izmjene
  datotečnog sistema. Dostupno za svaku naredbu `setup-*` **osim** `setup-cursor`
  (koja nikada ne zapisuje datoteku).
- `--model <id>` — obavezno (ili se bira interaktivno) za alate koji nemaju
  automatsko otkrivanje modela: Cline, Kilo, Roo, Goose, Qwen, Aider, 5dive. Ti alati
  također prihvataju `--yes` za neinteraktivna pokretanja (koja tada zahtijevaju `--model`).
  `setup-opencode` prihvata `--model` radi postavljanja zadanog modela najvišeg nivoa.
- `--model <id>` u naredbi `omniroute run` slijedi povezivanje po ciljevima iz manifesta
  (`bin/cli/cli-manifest.mjs`): **aider** prima `--model openai/<id>`, a
  **opencode** `--model omniroute/<id>` (prefiks se dodaje samo kada ga ID
  već ne sadrži); **qwen** i **gemini** primaju ID bez izmjena;
  **claude** ga dobija putem `ANTHROPIC_MODEL`, **goose** putem `GOOSE_MODEL`, a
  **codex** putem argumenata `-c model_providers.omniroute.*`. **Qwen je jedini cilj naredbe run
  koji strogo zahtijeva `--model`** — `omniroute run qwen` bez njega završava
  kodom `2` uz izričitu grešku.
- `--port <port>` — lokalni OmniRoute port (zadano `20128`, zanemaruje se kada je postavljen `--remote`).
  Prisutan je u svim naredbama `setup-*` i oba pokretača.
- Izlazni kodovi naredbe `omniroute run`: izlazni kod podređenog CLI-ja prenosi se
  bez izmjena; `2` = nevažeći argumenti (nepodržani cilj, nedostaje obavezni
  `--model`, zaštita kontejnera); `127` = ciljna izvršna datoteka nije u `PATH`;
  `130`/`143`/`129` kada se pokretanje prekine signalom `SIGINT`/`SIGTERM`/`SIGHUP`;
  `1` = druga greška pri pokretanju u vrijeme izvršavanja.
- Dva pokretača (`launch`, `launch-codex`) prihvataju `--profile <name>` radi odabira
  profila koji je zapisao `setup-claude` / `setup-codex`, kao i prolazne argumente za
  osnovnu izvršnu datoteku `claude` / `codex`.

Interaktivni birač također se dijeli među receptima za postavljanje:

```bash
# Odaberite iz aktivnog lokalnog ili udaljenog kataloga modela i konfigurirajte cilj.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

`configure` trenutno delegira na testirane recepte za `codex`, `claude`,
`opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, `kilo` i `5dive`.
Stavke kataloga namijenjene samo IDE-u,
MITM-u i vodičima ostaju izričiti tokovi `setup-*`/ručnog postavljanja i
nisu predstavljene kao ciljevi koji se mogu pokrenuti.

> `setup-opencode` je **lagana integracija OpenCodea kompatibilna s OpenAI-jem**.
> Postoji i bogatija integracija dodatka — `omniroute setup opencode` — koja
> instalira `@omniroute/opencode-plugin`. To su različite naredbe; gornja tabela
> dokumentira `setup-opencode`.
>
> Dodatak dolazi u dva paketa, po jedan za svaku glavnu verziju OpenCodea, jer dva
> učitavača očekuju različite ulazne tačke:
> `@omniroute/opencode-plugin` za OpenCode v1 i
> `@omniroute/opencode-plugin-v2` za OpenCode v2. Paket v2 je nov
> (`0.1.0`) i slijedi ugovor domaćina koji se još mijenja, pa čita
> strukturu koju OpenCode postavlja u nacrt kataloga umjesto da je unaprijed pretpostavlja. Instalirajte
> ga dodavanjem stavke `plugins` u `opencode.json`; `omniroute setup opencode`
> i dalje instalira paket v1. Opcije i redoslijed traženja vjerodajnica nalaze se u
> README-u paketa.

---

## Lokalna upotreba

Dok OmniRoute radi na `localhost:20128`, samo pokrenite naredbu za podešavanje svog
alata. Katalog se preuzima s lokalnog servera.

```bash
# Codex: zapišite profil za svaki odgovarajući model u ~/.codex/
omniroute setup-codex
codex --profile glm52            # koristite generisani profil

# Claude Code: zapišite profile za svaki model, a zatim pokrenite jedan
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: zapišite pružaoca kompatibilnog s OpenAI-jem sa svim modelima iz kataloga
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # koristi se putem {env:OMNIROUTE_API_KEY}, nikada se ne zapisuje na disk
opencode -m omniroute/glm/glm-5.2 "..."

# Alatima bez automatskog otkrivanja potreban je eksplicitno naveden model:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# Pregled bez ikakvog zapisivanja:
omniroute setup-continue --dry-run
```

Pokretanje bez zapisivanja bilo kakve konfiguracije (samo ubacivanje varijabli okruženja):

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

# Eksplicitna putanja naredbe: proslijedite sve što dolazi nakon --
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## Udaljena upotreba

Usmjerite bilo koju naredbu za podešavanje na udaljeni OmniRoute pomoću `--remote` + `--api-key`.
Katalog se preuzima s udaljenog servera, a konfiguracija se zapisuje na vašem lokalnom računaru.

```bash
# OpenCode povezan s udaljenim VPS-om, zadržite samo glm/kimi modele
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # prvo izvezite OMNIROUTE_API_KEY

# Codex profili iz udaljenog kataloga
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# Pokrenite CLI direktno prema udaljenom serveru
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

Umjesto prosljeđivanja `--remote`/`--api-key` svaki put, prijavite se jednom i dopustite
da ih **aktivni kontekst** automatski navede:

```bash
omniroute connect 192.168.0.15        # izdaje token ograničenog opsega i pohranjuje kontekst
omniroute setup-codex                 # ← sada koristi udaljeni katalog
omniroute setup-opencode              # ← isto
omniroute launch                      # ← Claude Code povezan s udaljenim serverom
```

Pogledajte [Udaljeni način rada](./REMOTE-MODE.md) za informacije o kontekstima, opsezima i upravljanju tokenima.

---

## Flote 5dive agenata

[5dive](https://5dive.ai) pokreće flotu dugotrajnih agenata za programiranje, od kojih je svaki
systemd jedinica pod vlastitim Unix korisnikom. Sam po sebi nije CLI za programiranje, pa
`omniroute run` nema šta pokrenuti — `5dive` je odredište **samo za konfiguraciju**.

```bash
omniroute configure 5dive --model failover-demo --yes
omniroute setup-5dive --model failover-demo --auth-profile omniroute --agent worker1
```

Oba oblika zapisuju jedan 5dive **profil za autentifikaciju**, a svako `claude` mjesto povezano s tim
profilom zatim komunicira s OmniRouteom. Tri stvari su specifične za ovo odredište:

- **Pokreće se na hostu flote, kao root.** 5dive naredbe djeluju na lokalne systemd jedinice
  i direktorij stanja u vlasništvu root korisnika; udaljeni način rada ne postoji. Recept se ponovo izvršava putem
  `sudo` kada već nije pokrenut kao root (`--no-sudo` to isključuje i umjesto toga ispisuje
  naredbu).
- **Krajnja tačka mora koristiti `https://`, osim ako je povratna petlja.** API ključ agenta
  prenosi se tim URL-om pri svakom zahtjevu, a 5dive odbija nešifriranu krajnju tačku izvan hosta.
  Privatna LAN adresa nije izuzetak.
- **Vlastito vezivanje modela svakog mjesta ima prednost nad profilom.** Profil sadrži
  `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL`, ali mjesto koje je i dalje vezano za standardni
  ID modela neće uspjeti pri prvom potezu uz poruku _"There's an issue with the selected model"_.
  Proslijedite `--agent <name>` (može se ponoviti) kako biste također vezali mjesta; recept ispisuje
  naredbu kada to ne učinite.

API ključ se predaje 5diveu putem **standardnog ulaza** (`--api-key=-`), tako da se nikada ne pojavljuje u
izlazu naredbe `ps`.

Usmjeravanje profila na OmniRoute **kombinaciju**, umjesto na pojedinačni model, omogućava
rezervno prebacivanje pružaoca za flotu: kada je primarna krajnja tačka potpuno prestala raditi usred poteza
tokom izvođenja zabilježenog u
[#11578](https://github.com/diegosouzapw/OmniRoute/issues/11578), agent je dovršio
preostale korake koristeći rezervnu opciju, a prekid rada nikada nije postao vidljiv.

---

## Konvencije osnovnog URL-a (koji alati zahtijevaju `/v1`)

OmniRoute izlaže OpenAI interfejs na `/v1`, Anthropic interfejs u korijenu,
a izvorni Gemini interfejs na `/v1beta`. Svaka integracija je povezana s oblikom koji
njen alat očekuje (provjereno u izvornom kodu naredbe):

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
| `setup-5dive` (`ANTHROPIC_BASE_URL` u profilu za autentifikaciju)          | korijen             | Ne — Claude Code dodaje `/v1/messages`     |

---

## Zadržavanje izvornih zavisnosti pri ažuriranju: `--include=optional`

Kada izvršite ažuriranje pomoću `omniroute update` (nakon potvrde ili uz `--apply`),
OmniRoute pokreće instalaciju s ugrađenom opcijom `--include=optional`:

```bash
npm install -g omniroute@latest --include=optional
```

Ovo **nije** opcija koju prosljeđujete naredbi `omniroute update` — program za
ažuriranje je uvijek primjenjuje. Ona garantuje da će `optionalDependencies`
(`better-sqlite3`, `keytar`, `tls-client`, LLMLingua SLM skup) ostati prisutne
nakon ažuriranja čak i ako vaša npm konfiguracija ima postavljeno
`omit=optional`, što bi inače neprimjetno uklonilo izvorni SQLite upravljački
program i povezivanje sa spremištem ključeva operativnog sistema. Za pregled
tačne naredbe bez njene primjene:

```bash
omniroute update --dry-run
# [PROBNO POKRETANJE] Pokrenulo bi se: npm install -g omniroute@latest --include=optional
```

Ostale opcije naredbe `omniroute update` (provjereno u izvornom kodu): `--check`
(izlazni kod 1 ako je verzija zastarjela), `--apply` (instalacija bez upita),
`--changelog`, `--no-backup`, `--yes`.

---

## Google Gemini CLI putem `omniroute run gemini`

Ugovor provjeren u odnosu na `@google/gemini-cli` 0.50.0: CLI poštuje
`GOOGLE_GEMINI_BASE_URL` i šalje `POST /v1beta/models/<model>:generateContent`
(i `:streamGenerateContent?alt=sse`) na tu adresu — upravo na izvorni Gemini
interfejs OmniRoutea (`/v1beta`). `omniroute run gemini` to automatski podešava:

- `GOOGLE_GEMINI_BASE_URL` → aktivni osnovni URL OmniRoutea (korijen, bez `/v1`);
- `GEMINI_API_KEY` → razrijeđena vjerodajnica OmniRoutea (opcija/okruženje/kontekst);
- **privremeni izolovani `GEMINI_CLI_HOME`** čiji `.gemini/settings.json`
  bira autentifikaciju `gemini-api-key`, tako da pohranjena Google OAuth sesija
  (Code Assist) nikada ne nadjača pokretanje usmjereno na OmniRoute — uklanja se
  nakon izlaska;
- **higijena okruženja**: iz okruženja podređenog procesa uklanjaju se
  `GOOGLE_API_KEY`, `GOOGLE_GENAI_USE_VERTEXAI` i `GOOGLE_GENAI_USE_GCA` (koji bi
  preusmjerili autentifikaciju na Vertex/Code Assist), a
  `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key` postavlja se kao dodatna sigurnosna
  mjera — ostala `run` odredišta dobijaju isti tretman za vlastite konfliktne
  varijable;
- ubacivanje `--model <id>` iz `--provider`/`--model`.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Gemini zaštita povjerenja u radni prostor i dalje se primjenjuje u bezglavom
režimu — sami proslijedite `--skip-trust` (ili interaktivno označite direktorij
kao pouzdan); pokretač je namjerno ne zaobilazi. Ovaj pokretač se razlikuje od
**ACP registracije** (`src/lib/acp/registry.ts`, `gemini --acp`), koja ostaje
integracija agentskog protokola za `/dashboard/acp-agents`.

---

## Stvarni smoke testovi (opcionalno)

Deterministički regresijski testovi plana pokretanja izvršavaju se u CI-ju (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). Za provjeru STVARNIH binarnih datoteka na STVARNOM
OmniRoute serveru postoji opcionalni testni okvir na lokaciji
`tests/integration/upstream-cli-smoke.int.test.ts`. Nikada se ne pokreće automatski
(svaki podtest se preskače osim ako je postavljeno `RUN_CLI_SMOKE=1`), prosljeđuje vjerodajnicu putem
NAZIVA varijable okruženja (nikada putem vrijednosti), rediguje nizove koji nalikuju ključevima iz svih snimljenih izlaza, preskače
ciljeve čija binarna datoteka nije instalirana i klasificira greške kao
autentifikacijske / upstream / konfiguracijske umjesto kao običnu Booleovu vrijednost:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

Opcionalno: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` ograničava skup testova;
`OMNIROUTE_SMOKE_TIMEOUT_MS` zamjenjuje zadano vremensko ograničenje od 120 s po cilju.

---

## Također pogledajte

- [Konfiguracija za Claude Code](./CLAUDE-CODE-CONFIGURATION.md) — detaljniji vodič za Claude Code
- [Konfiguracija za Codex CLI](./CODEX-CLI-CONFIGURATION.md) — jednokratno osnovno postavljanje `[model_providers.omniroute]`
- [Udaljeni način rada](./REMOTE-MODE.md) — konteksti, pristupni tokeni ograničenog opsega i upravljanje udaljenim serverom
- [Referenca CLI alata](../reference/CLI-TOOLS.md) — potpuni katalog podržanih alata i stranica nadzorne ploče
- [Vodič za postavljanje](./SETUP_GUIDE.md) — metode instalacije i početno podešavanje pri prvom pokretanju
