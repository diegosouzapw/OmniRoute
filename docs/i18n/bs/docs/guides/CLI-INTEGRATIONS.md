# CLI-INTEGRATIONS (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇪🇹 [am](../../../am/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇷 [el](../../../el/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇪 [et](../../../et/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇪 [ga](../../../ga/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ha](../../../ha/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇷 [hr](../../../hr/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇲 [hy](../../../hy/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ig](../../../ig/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇪 [ka](../../../ka/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇭 [km](../../../km/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [kn](../../../kn/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇹 [lt](../../../lt/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇻 [lv](../../../lv/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ml](../../../ml/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇹 [mt](../../../mt/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇲 [my](../../../my/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇵 [ne](../../../ne/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [or](../../../or/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [pa](../../../pa/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇰 [si](../../../si/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇮 [sl](../../../sl/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇸 [sr](../../../sr/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇿 [uz](../../../uz/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [yo](../../../yo/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

# CLI Integracije

OmniRoute isporučuje porodicu `setup-*` komandi koje konfigurišu coding CLI (Codex, Claude Code, OpenCode, Cline, …) da koristi OmniRoute kao svoj backend — tako da alat komunicira sa **jednim** endpointom, a OmniRoute rutira prema ispravnom provajderu uz automatski fallback. Svaka komanda čita **live** katalog modela iz pokrenutog OmniRoute-a (lokalnog ili udaljenog) i upisuje vlastiti konfiguracijski fajl alata na **vašoj** mašini. API ključ se referencira putem varijable okruženja gdje god to alat podržava. Komande koje perzistiraju lokalni fajl okruženja alata su navedene u nastavku.

Postoji i generički pokretač — `omniroute run <target>` — koji pokreće `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen` ili `gemini` sa ispravno injektovanim okruženjem, bez pisanja bilo kakve konfiguracije. Ciljevi (targets) i njihovi aliasi dolaze iz kanoničnog manifesta `bin/cli/cli-manifest.mjs` (`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`, `open-code`, `qwen-code`, `gemini-cli`), a `omniroute completion` nudi iste riječi ciljeva izvedene iz manifesta. Zastarjeli pokretači po alatu — `omniroute launch` (Claude Code) i `omniroute launch-codex` (Codex) — ostaju dostupni.

Onboarding provajdera je dostupan iz istog lokalnog/udaljenog konteksta. API-first komande ispod održavaju autentifikaciju upravljanja odvojenu od vjerodostojnosti (credentials) provajdera i nikada ne ispisuju vjerodostojnost u strukturiranom izlazu:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

Za skripte, preferirajte `--credential-stdin` ili `--credential-env`; `--credential` je zadržan za kontrolisanu lokalnu upotrebu. `providers remove` zahtijeva `--yes` na neinteraktivnoj terminalu, a svih pet komandi poštuje aktivni kontekst ili globalne `--base-url`/`--api-key` opcije.

Za jednokratno, ručno napisano osnovno postavljanje dvije najbogatije integracije, pogledajte detaljne analize po alatu:

- [Claude Code konfiguracija](./CLAUDE-CODE-CONFIGURATION.md)
- [Codex CLI konfiguracija](./CODEX-CLI-CONFIGURATION.md)
- [Remote Mode](./REMOTE-MODE.md) — upravljajte udaljenim OmniRoute-om (VPS / Tailnet) sa svog laptopa
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — OmniCopilot ekstenzija; ona takođe može pokrenuti ove `setup-*` komande za vas iz unutar editora

---

## Glavna tabela

Svaka komanda poštuje **aktivni kontekst** (postavljen sa `omniroute connect`, vidjeti [Remote Mode](./REMOTE-MODE.md)) ili eksplicitne `--remote <url> --api-key <key>` zastavice. "Lokalno vs udaljeno" u nastavku znači: bez zastavica cilja se na `http://localhost:20128`; sa `--remote` (ili aktivnim udaljenim kontekstom) povlači se katalog sa tog servera i konfiguracija se upisuje lokalno.

User Safety: safe

# Napomene o flagovima (potvrđena u komandnom izvoru)

- `--remote <url>` — pobavljanje kataloga oddaljnog OmniRoute-a (prevrhava `--port`
  i aktivni kontekst). `--api-key <key>` nadamuje kredencijal za taj
  server (po defaultu `OMNIROUTE_API_KEY` env varijablu, ili token aktivnog konteksta).
- `--only <patterns>` — zasebno odeljeni podstringovi; ostavi samo ID modela koji dopadaju
  (npr. `--only glm,kimi`). Dostupni su na `setup-codex`, `setup-claude`,
  `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`.
- `--dry-run` — izvesti tačno što bi se pisalo bez dotazivanja fiksne mreže. Dostupan na svakoj `setup-*` komandi **izuziva** `setup-cursor`
  (koji nikada ne piše fajl).
- `--model <id>` — obavezno (ili izabran interaktivno) za narudžbe koje nisu
  s automatskim otkrivanja modela: Cline, Kilo, Roo, Goose, Qwen, Aider, 5dive. Ovi narudžbe
  takođe prihvataju `--yes` za neinteraktivne pokrete (koji pakadaju `--model`).
  `setup-opencode` koristi `--model` da postavi defaultni gornji model.
- `--port <port>` — lokalni port OmniRoute-a (po defaultu `20128`, ignoriran kad je
  `--remote` postavljen). Postoji na svakom `setup-*` i oba launchera.

## Izvršni kodovi `omniroute run` i njihovi kodovi izlaza

Izvršni kodovi `omniroute run` propušta poslovno kod djetinjskog CLI-a verbatim; `2` = nevaljan argumenti (nepodržani cilj, nedostatni obezbitni `--model`, sigurnosna kontrola kontenera); `127` = ciljni binar nije u `PATH`-u; `130`/`143`/`129` kada je pokretanje završilo zahvaljujući `SIGINT`/`SIGTERM`/`SIGHUP`; `1` = drugačiji pogrešak pri raskazu.

Interaktivni izbor je i deljen sa receptima za nastavak nastavka:

```bash
# Izabrati iz aktivnog lokalnog ili daljeg kataloga modela i konfiguriracija cilja.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

`configure` trenutno delegira na testirane recepti za `codex`, `claude`,
`opencode`, `qwen`, `aider`, `goose`, `cline`, `continue`, `kilo` i `5dive`.
IDE-only, MITM i guide-only katalogski entiti ostaju explicitni `setup-*`/manual flosi i
nije predstavljeni kao pokretivi ciljevi.

> `setup-opencode` je **lakša OpenAI-skompatibilna** integricija OpenCode.
> Postoji i bogats plugin integracija — `omniroute setup opencode` — koja instalira `@omniroute/opencode-plugin`. Oni su različiti komandi; tablica iznad dokumentira `setup-opencode`.

Plugin dolazi u dva paketova, jedan po velikosti OpenCode, jer su dva loadera očekuju različite ulazne punkte:

- `@omniroute/opencode-plugin` za OpenCode v1 i
- `@omniroute/opencode-plugin-v2` za OpenCode v2. Paket v2 je novi (`0.1.0`) i sledi host kontraktu koji se još uvijek razvija, pa čita formiranje u kojem se OpenCode seedi u katalogsku projeku umesto pretpostavke jednog. Instalacija se radi dodavanjem `plugins` unosa u `opencode.json`; `omniroute setup opencode` i dalje instalira paket v1. Opcije i redoslijed pregleda kredenciala su u README paketa.

---

## Narudžbe za `omniroute run` i njihovi kodovi izlaza

| Komanda          | Opis                                                                                                                                                                        |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `setup-opencode` | Lakša OpenAI-skompatibilna integricija OpenCode.                                                                                                                            |
| `setup-claude`   | Richer plugin integracija — `omniroute setup opencode` — koja instalira `@omniroute/opencode-plugin`. Oni su različiti komandi; tablica iznad dokumentira `setup-opencode`. |
| `setup-opencode` | Lightweight OpenAI-compatible OpenCode integracija.                                                                                                                         |

Plugins dolaze u dva paketova, jedan po velikosti OpenCode, jer su dva loadera očekuju različite ulazne punkte:

- `@omniroute/opencode-plugin` za OpenCode v1 i
- `@omniroute/opencode-plugin-v2` za OpenCode v2. Paket v2 je novi (`0.1.0`) i sledi host kontraktu koji se još uvijek razvija, pa čita formiranje u kojem se OpenCode seedi u katalogsku projeku umesto pretpostavke jednog. Instalacija se radi dodavanjem `plugins` unosa u `opencode.json`; `omniroute setup opencode` i dalje instalira paket v1. Opcije i redoslijed pregleda kredenciala su u README paketa.

User Safety: safe

## Konvencije za Base URL (koji alati zahtijevaju `/v1`)

OmniRoute izlaže OpenAI površinu na `/v1`, Anthropic površinu na root-u,
i nativnu Gemini površinu na `/v1beta`. Svaka integracija je povezana u onom
obliku koji njen alat očekuje (provjereno u izvornom kodu komande):

| Integracija                                                                | Napisani Base URL | `/v1`?                                     |
| -------------------------------------------------------------------------- | ----------------- | ------------------------------------------ |
| `setup-cline` (`openAiBaseUrl`)                                            | root              | Ne — Cline dodaje `/v1/chat/completions`   |
| `setup-goose` (`OPENAI_HOST`)                                              | root              | Ne — Goose dodaje putanju                  |
| `setup-aider` (`OPENAI_API_BASE`)                                          | root              | Ne — LiteLLM dodaje `/v1/chat/completions` |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | sa `/v1`          | Da                                         |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | root              | Ne — Claude Code dodaje `/v1/messages`     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | sa `/v1`          | Da                                         |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | sa `/v1`          | Da                                         |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | root              | Ne — SDK dodaje `/v1beta/models/…`         |
| `setup-5dive` (`ANTHROPIC_BASE_URL` u auth profilu)                        | root              | Ne — Claude Code dodaje `/v1/messages`     |

---

## Zadržavanje nativnih zavisnosti prilikom ažuriranja: `--include=optional`

Kada ažurirate pomoću `omniroute update` (nakon potvrde, ili sa `--apply`),
OmniRoute pokreće instalaciju sa ugrađenim `--include=optional`:

```bash
npm install -g omniroute@latest --include=optional
```

Ovo **nije** zastavica (flag) koju proslijeđujete `omniroute update` — ona je uvijek
primjenjuje ažurivač. To garantuje da `optionalDependencies` (`better-sqlite3`, `keytar`,
`tls-client`, LLMLingua SLM stack) preživljavaju ažuriranje čak i ako vaš npm config
ima postavljeno `omit=optional`, što bi inače tiho uklonilo nativni SQLite
driver i OS-keyring binding. Da pregledate tačnu komandu bez primjene:

```bash
omniroute update --dry-run
# [DRY RUN] Pokrenuo bi: npm install -g omniroute@latest --include=optional
```

Druge `omniroute update` zastavice (provjereno u izvornom kodu): `--check` (izlaz 1 ako
je zastarjelo), `--apply` (instalacija bez upita), `--changelog`, `--no-backup`,
`--yes`.

---

## Google Gemini CLI putem `omniroute run gemini`

Ugovor provjeren u odnosu na `@google/gemini-cli` 0.50.0: CLI poštuje
`GOOGLE_GEMINI_BASE_URL` i izvršava `POST /v1beta/models/<model>:generateContent`
(i `:streamGenerateContent?alt=sse`) prema njemu — upravo kao OmniRoute-ova nativna
Gemini površina (`/v1beta`). `omniroute run gemini` to automatski povezuje:

- `GOOGLE_GEMINI_BASE_URL` → aktivni OmniRoute base URL (root, bez `/v1`);
- `GEMINI_API_KEY` → razriješeni OmniRoute kredencijal (opcija/env/kontekst);
- **privremeni izolovani `GEMINI_CLI_HOME`** čiji `.gemini/settings.json`
  bira `gemini-api-key` auth, tako da sačuvana Google OAuth sesija (Code Assist)
  nikada ne pregazi OmniRoute-om usmjereno pokretanje — uklanja se nakon izlaska;
- **higijena okruženja (env hygiene)**: child okruženje je očišćeno od `GOOGLE_API_KEY`,
  `GOOGLE_GENAI_USE_VERTEXAI` i `GOOGLE_GENAI_USE_GCA` (što bi preusmjerilo
  autentifikaciju na Vertex/Code Assist), a `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key` je
  postavljen kao sigurnosna mera (fallback) — ostali `run` ciljevi dobijaju istu
  obradu za svoje konfliktne varijable;
- `--model <id>` injekcija iz `--provider`/`--model`.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Gemini-jev workspace-trust guard se i dalje primjenjuje u headless modu — proslijedite
`--skip-trust` (ili vjerujte direktoriju interaktivno) sami; launcher
namjerno to ne zaobilazi. Ovaj launcher je odvojen od **ACP registracije**
(`src/lib/acp/registry.ts`, `gemini --acp`), koja ostaje integracija agent-protokola
za `/dashboard/acp-agents`.

---

## Real smoke sweep (opcionalno)

Determinističko pokretanje regresionih testova launch-plana u CI (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). Da bi se validirali STVARNI binarni fajlovi protiv STVARNOG
OmniRoute servera, postoji opcionalni harness na
`tests/integration/upstream-cli-smoke.int.test.ts`. On se nikada ne pokreće automatski
(svaki sub-test preskače osim ako je `RUN_CLI_SMOKE=1`), proslijeđuje kredencijale putem env-var
NAME (nikada putem vrijednosti), maskira stringove u obliku ključeva iz bilo kojeg zabilježenog izlaza, preskače
targete čiji binarni fajl nije instaliran i klasifikuje neuspjehe kao
auth / upstream / config umjesto običnog boolean-a:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

Opcionalno: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` ograničava sweep;
`OMNIROUTE_SMOKE_TIMEOUT_MS` pregazi timeout od 120s po targetu.

---

## Vidi također

- [Claude Code konfiguracija](./CLAUDE-CODE-CONFIGURATION.md) — detaljniji Claude Code vodič
- [Codex CLI konfiguracija](./CODEX-CLI-CONFIGURATION.md) — jednokratno `[model_providers.omniroute]` osnovno podešavanje
- [Remote Mode](./REMOTE-MODE.md) — konteksti, scoped access tokeni, upravljanje udaljenim serverom
- [CLI Tools reference](../reference/CLI-TOOLS.md) — puni katalog podržanih alata + dashboard stranice
- [Setup Guide](./SETUP_GUIDE.md) — metode instalacije i onboarding za prvo pokretanje
