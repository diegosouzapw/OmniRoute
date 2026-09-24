# Remote Mode (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/REMOTE-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/REMOTE-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/REMOTE-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/REMOTE-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/REMOTE-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/REMOTE-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/REMOTE-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/REMOTE-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/REMOTE-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/REMOTE-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/REMOTE-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/REMOTE-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/REMOTE-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/REMOTE-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/REMOTE-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/REMOTE-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/REMOTE-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/REMOTE-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/REMOTE-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/REMOTE-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/REMOTE-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/REMOTE-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/REMOTE-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/REMOTE-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/REMOTE-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/REMOTE-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/REMOTE-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/REMOTE-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/REMOTE-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/REMOTE-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/REMOTE-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/REMOTE-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/REMOTE-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/REMOTE-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/REMOTE-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/REMOTE-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/REMOTE-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/REMOTE-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/REMOTE-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/REMOTE-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/REMOTE-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/REMOTE-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/REMOTE-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/REMOTE-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/REMOTE-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/REMOTE-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/REMOTE-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/REMOTE-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/REMOTE-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/REMOTE-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/REMOTE-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/REMOTE-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/REMOTE-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/REMOTE-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/REMOTE-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/REMOTE-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/REMOTE-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/REMOTE-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/REMOTE-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/REMOTE-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/REMOTE-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/REMOTE-MODE.md)

---

Spúšťajte CLI `omniroute` na svojom notebooku, zatiaľ čo samotný OmniRoute beží niekde inde
(na VPS, domácom serveri alebo inom zariadení vo vašej sieti Tailnet). Raz sa prihlásite pomocou
`omniroute connect` a odvtedy sa **každý** príkaz CLI zameria na tento vzdialený
server — rovnaké príkazy, rovnaký výstup, iba sa vykonávajú voči vzdialenému serveru.

Nie je potrebné inštalovať žiadny ďalší nástroj: vzdialený režim používa bežné CLI `omniroute`
spolu s **prístupovými tokenmi** s obmedzeným rozsahom.

```bash
npm install -g omniroute                 # bežné CLI
omniroute connect 192.168.0.15           # prihlásenie (heslo → token s obmedzeným rozsahom)
omniroute models list                    # ← teraz zobrazí modely VZDIALENÉHO servera
omniroute configure codex                # ← vytvorí lokálny profil Codex zo vzdialeného katalógu
```

---

## Ako to funguje

```
váš notebook                             vzdialený OmniRoute (VPS)
┌────────────────────┐                   ┌───────────────────────────────┐
│ CLI omniroute      │  POST /api/cli/connect  (heslo → token)           │
│  kontext: vps      │ ───────────────►  │ vydá prístupový token s       │
│  baseUrl, token    │  Authorization: Bearer oma_live_…                  │
│                    │ ───────────────►  │ kontrolou rozsahu pre každú    │
│ zapisuje konfigur. │ ◄───────────────  │ trasu správy                  │
│ LOKÁLNE            │                   └───────────────────────────────┘
└────────────────────┘
```

- **Kontexty** uchovávajú každý jeden server (`~/.omniroute/config.json`, `chmod 600`).
  `omniroute contexts use <name>` prepne aktívny server; `default` je lokálny.
- **Prístupové tokeny** (`oma_live_…`) autorizujú príkazy správy. Líšia sa
  od API kľúčov na inferenciu (`sk-…`, používaných pre `/v1/chat/completions`).
- Na strane servera sa uchováva iba SHA-256 hash tokenu. Token v otvorenom texte sa zobrazí
  **iba raz**, pri vytvorení.

---

## Pripojenie

### Pomocou hesla na správu (úvodné nastavenie)

```bash
omniroute connect 192.168.0.15
# Heslo na správu pre http://192.168.0.15:20128: ********
# ✔ Pripojené k http://192.168.0.15:20128 — kontext „192.168.0.15“ (rozsah: admin)
```

Postup s heslom predvolene vydá token s rozsahom **admin** (máte heslo, takže
už máte úplnú kontrolu). Rozsah obmedzíte pomocou `--scope`:

```bash
omniroute connect 192.168.0.15 --scope write
```

Možnosti: `--port <p>` (ak hostiteľ neobsahuje port), `--name <ctx>` (názov kontextu),
`--scope read|write|admin`. Úplná URL sa použije bez zmien:
`omniroute connect https://omni.example.com`.

### Pomocou vopred vygenerovaného tokenu

Vygenerujte token s obmedzeným rozsahom v ovládacom paneli (alebo pomocou `omniroute tokens create`) a
vložte ho — heslo nie je potrebné:

```bash
omniroute connect 192.168.0.15 --key oma_live_xxxxxxxx
```

CLI ho overí prostredníctvom `GET /api/cli/whoami` a uloží ho ako aktívny kontext.

---

## Rozsahy

Tri hierarchické úrovne (`admin ⊃ write ⊃ read`):

| Rozsah  | Povolené operácie                                                                             |
| ------- | --------------------------------------------------------------------------------------------- |
| `read`  | výpis/kontrola — `models list`, `providers status`, `logs`, `usage`, `cost`                   |
| `write` | čítanie **+** konfigurácia/použitie — `setup-codex`, `keys add`, `config set`, kombinácie     |
| `admin` | zápis **+** správa — CRUD operácie `tokens`, pridávanie poskytovateľov, služby, zásady, oauth |

Server odvodzuje rozsah vyžadovaný jednotlivými trasami z metódy HTTP
(`GET`→read, zmeny→write) a zo zoznamu povolených operácií správcu pre citlivé rozhrania
(zmeny `/api/cli/tokens`, `/api/providers`, `/api/oauth`, `/api/services`, …).
Token s nedostatočným rozsahom dostane odpoveď `403` so zrozumiteľnou správou.

> Trasy, ktoré spúšťajú procesy (`/api/services/*`, `/api/mcp/*`, …), zostávajú
> dostupné **iba cez loopback** — vzdialený token k nim nikdy nemôže pristupovať bez ohľadu na rozsah.

---

## Pripojenie Antigravity pri vzdialenej inštalácii

Antigravity používa súhlasnú obrazovku Google typu firstparty/nativeapp. Google
uvoľní autorizačný kód iba vtedy, keď je **presmerovanie na loopback**
(`http://127.0.0.1:<port>/callback`) **dostupné z prehliadača, v ktorom
schvaľujete prihlásenie**. Pri vzdialenej inštalácii na VPS sa tento loopback
nachádza na serveri, nie na vašom počítači, takže súhlasná obrazovka **zostane
navždy visieť a nikdy nevygeneruje kód** — bežná záložná možnosť „vložiť URL
spätného volania“ teda nemá čo vložiť. (Ide o obmedzenie na strane Googlu:
rovnaké zaseknutie nastane v každom proxy serveri, ktorý používa pribaleného
desktopového klienta Antigravity, nielen v OmniRoute.)

Ovládací panel to zistí skôr, než sa zaseknete: ak otvoríte **Providers → Antigravity →
Connect** z adresy, ktorá nie je localhost, všeobecné upozornenie „skopírujte URL
spätného volania“ sa nahradí dvoma riešeniami uvedenými nižšie, pričom v každom
už bude vyplnený váš hostiteľ a port. (Počíta sa aj adresa siete LAN —
`192.168.x.x` sa z pohľadu tohto spätného volania nepovažuje za localhost.)

Existujú dva podporované spôsoby pripojenia Antigravity k vzdialenému OmniRoute.

### Možnosť A — lokálny pomocník na prihlásenie (odporúčané)

Spustite OAuth na **vlastnom počítači**, kde je `127.0.0.1` dostupná. Pomocník
komunikuje priamo s Googlom, takže proces udelenia súhlasu sa dokončí tam, kde
ho verzia v ovládacom paneli dokončiť nemôže.

**Ak ste už pripojení** (`omniroute connect <host>`), nemusíte nič kopírovať —
pomocník doručí poverenie do danej inštalácie za vás:

```bash
# Na vašom LOKÁLNOM počítači (vyžaduje Node.js + prehliadač):
omniroute connect 192.168.0.15        # raz — vytvorí kontextový token s rozsahom správcu
npx omniroute login antigravity
#   ↳ otvorí súhlasnú obrazovku Googlu, zachytí spätné volanie na lokálnom loopback porte,
#     vykoná jeho výmenu a odošle poverenie metódou POST do aktívneho kontextu:
#
#   Antigravity pripojené na http://192.168.0.15:20128 (pripojenie abc123).
#   Netreba nič vkladať — tento terminál môžete zavrieť.
```

Odoslanie prebehne automaticky vždy, keď aktívny kontext smeruje na iný počítač.
Vynútiť ho alebo mu zabrániť môžete pomocou `--push` / `--no-push`, prípadne
zacieliť na konkrétny kontext pomocou `--context <name>`.

**Ak sa váš počítač nemôže pripojiť k VPS** (brána firewall, žiadny SSH prístup,
izolovaný počítač), pomocník bude naďalej fungovať — _potrebuje_ iba Google.
Použite `--no-push` alebo jednoducho nechajte odoslanie zlyhať: namiesto zahodenia
už dokončenej autorizácie následne vypíše blob.

```bash
npx omniroute login antigravity --no-push
#   omniroute-cred-v1.eyJ2IjoxLCJ...
```

Potom vo **vzdialenom** ovládacom paneli prejdite na **Providers → Antigravity →
Connect** a vložte blob `omniroute-cred-v1.…` do poľa v časti **Step 2** (prijíma
URL spätného volania aj blob s poverením). OmniRoute ho dekóduje, spustí
registráciu Cloud Code na strane servera a pripojenie natrvalo uloží.

> Blob obsahuje obnovovací token — zaobchádzajte s ním ako s heslom. Pri automatickom
> odoslaní sa odošle raz cez autentifikované pripojenie vášho kontextu; pri ručnom
> vložení cez pripojenie k ovládaciemu panelu. V oboch prípadoch sa v úložisku
> uchováva zašifrovaný a po úspešnom odoslaní sa nikdy nevypíše do terminálu.

Prepínače: `--no-browser` (vypíše URL namiesto jej automatického otvorenia),
`--port <n>` (nastaví loopback port), `--timeout <ms>`, `--push` / `--no-push`
(prepíše automatické doručenie), `--context <name>` (zacieli na konkrétny kontext).

### Možnosť B — lokálny presmerovací tunel SSH

Ak máte prístup k VPS cez SSH, presmerujte port ovládacieho panela tak, aby sa
spätné volanie na loopback cez tunel dostalo späť na server:

```bash
# Na vašom LOKÁLNOM počítači:
ssh -L 20128:127.0.0.1:20128 user@your-vps
# potom v LOKÁLNOM prehliadači otvorte http://localhost:20128 a pripojte Antigravity
# bežným spôsobom — presmerovanie na 127.0.0.1:20128/callback sa teraz cez SSH dostane na VPS.
```

Keďže k ovládaciemu panelu pristupujete cez `localhost:20128`, proces udelenia
súhlasu Googlu sa dokončí a spätné volanie sa doručí na server cez rovnaký tunel —
nie je potrebný žiadny blob. Tunel nechajte otvorený, kým sa pripojenie nezobrazí
ako aktívne.

Na rozdiel od poskytovateľov s pevným loopbackom uvedených nižšie tu **stačí jedno
presmerovanie**: spätné volanie Antigravity používa samotný port ovládacieho
panela, takže nie je potrebné tunelovať druhý port špecifický pre poskytovateľa.

> Úplne bezobslužnou alternatívou (bez pomocníka a bez tunela) je nakonfigurovať
> **vlastné** webové poverenia Google OAuth + verejnú základnú URL; pozrite si
> premenné prostredia OAuth daného poskytovateľa. Dve vyššie uvedené možnosti
> nevyžadujú žiadne ďalšie nastavenie Googlu.

---

## Pripojenie Codex / Grok k vzdialenej inštalácii (poskytovatelia s pevnou loopback adresou)

Codex, xAI (`xai-oauth`) a Grok CLI (`grok-cli`) registrujú vo svojej nadradenej aplikácii OAuth **pevnú** loopback adresu
`redirect_uri`. OmniRoute ju nemôže zmeniť — poskytovateľ vždy presmeruje prehliadač späť na rovnakú pevne zakódovanú adresu:

| Poskytovateľ | Pevná adresa spätného volania, na ktorú poskytovateľ presmeruje |
| ------------ | --------------------------------------------------------------- |
| `codex`      | `http://localhost:1455/auth/callback`                           |
| `xai-oauth`  | `http://127.0.0.1:56121/callback`                               |
| `grok-cli`   | `http://127.0.0.1:56122/callback`                               |

`localhost` tu znamená **počítač, na ktorom beží prehliadač**, zatiaľ čo server spätného volania PKCE služby OmniRoute počúva na loopback rozhraní **servera**. Ak otvoríte ovládací panel na adrese v sieti LAN, napríklad `http://192.168.0.15:20128`, tieto dve strany sa nikdy nespoja: autorizačný kód sa doručí na `localhost:1455` vášho notebooku, kde nič nepočúva, a poskytovateľ prihlásenie neúspešne ukončí bez zobrazenia chyby.

Ovládací panel to zistí pred otvorením vyskakovacieho okna a namiesto tichého zlyhania prihlásenia zobrazí príkaz na vytvorenie tunela (#8046).

### Riešenie — presmerujte **oba** porty

```bash
# Na počítači, na ktorom beží PREHLIADAČ:
ssh -L 20128:127.0.0.1:20128 -L 1455:127.0.0.1:1455 <user>@192.168.0.15
# potom prejdite na http://localhost:20128 a odtiaľ pripojte Codex
```

Vyžadujú sa dve presmerovania a presmerovanie iba jedného portu bude stále zlyhávať:

- **`20128`** (port ovládacieho panela) nastaví pôvod skutočne na localhost, čo je podmienka, aby OmniRoute vôbec spustil server spätného volania PKCE — pôvod v sieti LAN sa do tejto vetvy nikdy nedostane.
- **`1455`** (pevný port spätného volania poskytovateľa) je miesto, na ktoré sa prehliadač presmeruje späť; musí byť tunelovaný na loopback rozhranie servera.

Pri pripájaní xAI alebo Grok CLI nahraďte `1455` hodnotou `56121`/`56122` a `20128` skutočným portom vášho ovládacieho panela. Tunel nechajte otvorený, kým sa pripojenie nezobrazí ako aktívne.

> **Nemáte prístup cez SSH?** Codex a Grok CLI podporujú aj vloženie tokenu — karta **Vložiť kľúč API
> Key** / **Importovať auth.json** v dialógovom okne pripojenia. Táto cesta nepoužíva loopback
> spätné volanie, takže funguje z ľubovoľného pôvodu. Codex navyše podporuje samotný prístupový
> token alebo blob relácie `~/.codex/auth.json`.

---

## Správa tokenov

```bash
omniroute tokens create --name "laptop" --scope write [--expires 30]
#   ↳ vypíše tajný údaj IBA RAZ — skopírujte ho teraz
omniroute tokens list                 # maskované: ID, názov, rozsah, predpona, stav, platnosť
omniroute tokens revoke <id|prefix>   # okamžité odvolanie
omniroute tokens scopes               # vysvetlenie troch rozsahov
```

Príkazy `tokens` vyžadujú poverenie **správcu**. Tokeny môžete spravovať aj v ovládacom paneli v časti **Nastavenia → Prístupové tokeny** (vytvorenie, odvolanie, jednorazové skopírovanie).

---

## Konfigurácia programovacieho CLI zo vzdialeného katalógu

`omniroute configure` načíta aktuálny katalóg modelov **aktívneho servera** a zapíše konfiguráciu vo **vašom** počítači.

```bash
omniroute configure codex
#   Poskytovatelia: glm, kmc, ollamacloud, opencode-go, …
#   Poskytovateľ: glm
#   ID modelu: glm/glm-5.2
#   ✔ Zapísané do ~/.codex/glm52.config.toml
#   Použitie:  codex --profile glm52

# neinteraktívne
omniroute configure codex --provider glm --model glm/glm-5.2 --name glm52

# ponechanie často používaného modelu navrchu interaktívneho výberu
omniroute configure codex --provider glm --model glm/glm-5.2 --favorite --yes
```

Výberový nástroj uchováva v lokálnom súbore `model-preferences.json` iba ID modelov (nikdy nie adresy URL ani poverenia), oddelene podľa kontextu a cieľového CLI. Obľúbené položky sa zobrazujú pred nedávnymi výbermi; pomocou `--unfavorite` odstránite vybraný model zo zoznamu pre daný kontext/cieľ.

Zapísaný profil odkazuje na kľúč inferencie prostredníctvom premennej prostredia (`OMNIROUTE_API_KEY`) — tajný údaj sa nikdy nezapisuje na disk. Jednorazové základné nastavenie Codex (blok `[model_providers.omniroute]`) nájdete v dokumente [CODEX-CLI-CONFIGURATION.md](./CODEX-CLI-CONFIGURATION.md).

### Spustenie CLI voči vzdialenému serveru (bez zápisu konfigurácie)

`omniroute run <target>` takisto rešpektuje aktívny kontext: vzdialená základná adresa URL a poverenie kontextu sa vložia iba do spusteného procesu.

```bash
omniroute connect 192.168.0.15
omniroute run claude   --model openai/gpt-5.4          # Claude Code → vzdialený server
omniroute run gemini   --model glm/glm-5.2 -- --skip-trust -p "hello"
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"

# Náhľad presného príkazu, ktorý by sa spustil (iba NÁZVY KĽÚČOV prostredia, nikdy nie hodnoty):
omniroute run codex --dry-run --json
```

Ciele: `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen`, `gemini`
(jediný zdroj: `bin/cli/cli-manifest.mjs`). Qwen a Gemini sa spúšťajú v dočasnom izolovanom domovskom adresári, ktorý sa pri ukončení odstráni, takže spustenie sa nikdy nedotkne konfigurácie vašich osobných nástrojov — ani do nej nič neunikne.

### Príkazy na nastavenie jednotlivých CLI

Každé podporované CLI má príkaz na nastavenie zohľadňujúci vzdialený server (všetky rešpektujú aktívny kontext alebo `--remote <url> --api-key <key>`):

| CLI         | Príkaz                     | Čo zapisuje                                                                                                                                                                                             |
| ----------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Codex       | `omniroute setup-codex`    | profily `~/.codex/<name>.config.toml` (pre každý model)                                                                                                                                                 |
| Claude Code | `omniroute setup-claude`   | `~/.claude/profiles/<name>/settings.json` (pre každý model)                                                                                                                                             |
| OpenCode    | `omniroute setup-opencode` | `~/.config/opencode/opencode.json` — poskytovateľ `omniroute` kompatibilný s OpenAI so všetkými modelmi katalógu (spustite `opencode -m omniroute/<model>`)                                             |
| Cline       | `omniroute setup-cline`    | `~/.cline/data/{globalState,secrets}.json` (režim CLI) + vypíše nastavenia rozšírenia VS Code na vloženie (kompatibilné s OpenAI, základná URL **bez** `/v1`)                                           |
| Kilo Code   | `omniroute setup-kilo`     | `~/.local/share/kilo/auth.json` (CLI) + nastavenia VS Code `kilocode.*` — kompatibilné s OpenAI, základná URL **s** `/v1`                                                                               |
| Continue    | `omniroute setup-continue` | `~/.continue/config.yaml` (VS Code/JetBrains + CLI `cn`) — `provider: openai`, `apiBase` **s** `/v1`, kľúč prostredníctvom `${{ secrets.OMNIROUTE_API_KEY }}`                                           |
| Cursor      | `omniroute setup-cursor`   | vypíše kroky v aplikácii (Settings → Models → Override OpenAI Base URL **s** `/v1` + kľúč + model). Konfigurácia Cursor je nepriehľadná databáza SQLite — iba panel konverzácie                         |
| Roo Code    | `omniroute setup-roo`      | zapíše importný JSON pre Roo (`~/.omniroute/roo-settings.json`) + nastaví `roo-cline.autoImportSettingsPath` + vypíše kroky v používateľskom rozhraní (kompatibilné s OpenAI, základná URL **s** `/v1`) |
| Crush       | `omniroute setup-crush`    | `~/.config/crush/crush.json` — poskytovateľ `openai-compat`, `base_url` **s** `/v1`, kľúč prostredníctvom `$OMNIROUTE_API_KEY`                                                                          |
| Goose       | `omniroute setup-goose`    | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER=openai` + `OPENAI_HOST` **bez** `/v1` + `GOOSE_MODEL`) + postup nastavenia prostredia                                                                    |
| Aider       | `omniroute setup-aider`    | `~/.aider.conf.yml` (`openai-api-base` **bez** `/v1` + `model: openai/<id>`) + postup nastavenia prostredia (`aider --message --yes`)                                                                   |
| Qwen Code   | `omniroute setup-qwen`     | položka V4 `modelProviders.openai` v `~/.qwen/settings.json` + `OMNIROUTE_API_KEY` v `~/.qwen/.env`                                                                                                     |

```bash
# OpenCode (poskytovateľ kompatibilný s OpenAI, všetky modely katalógu, vzdialený VPS)
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute setup-opencode --only glm,kimi        # ponechať iba zodpovedajúce modely
opencode -m omniroute/glm/glm-5.2 "..."          # najprv exportovať OMNIROUTE_API_KEY
```

> OpenCode má aj bohatšiu integráciu prostredníctvom **pluginu**: `omniroute setup opencode`
> (teraz s podporou vzdialeného prístupu prostredníctvom `--remote`) nainštaluje `@omniroute/opencode-plugin`.
> `setup-opencode` je odľahčená alternatíva kompatibilná s OpenAI. Na kľúč API
> sa odkazuje prostredníctvom `{env:OMNIROUTE_API_KEY}` — nikdy sa nezapisuje na disk.
>
> V OpenCode v2 použite namiesto toho `@omniroute/opencode-plugin-v2`: rovnaký katalóg,
> odlišný kontrakt zavádzača. Keď je integrácia pripojená, načíta kľúč z vlastného úložiska
> prihlasovacích údajov OpenCode, takže vzdialená brána vôbec nepotrebuje kľúč
> v `opencode.json`.

---

## Správa kontextov (prepínanie medzi servermi)

**Kontext** je uložený server (baseUrl + prihlasovací údaj + rozsah). Príkaz `omniroute connect`
ho vytvorí a nastaví ako aktívny; odvtedy je každý príkaz smerovaný na tento server. Kontexty môžete spravovať
a prepínať medzi nimi pomocou `omniroute contexts`:

```bash
omniroute contexts list            # všetky kontexty; aktívny je označený symbolom ●
omniroute contexts current         # aktívny server, stav overenia, rozsah
```

```text
  | Názov   | Základná URL              | Overenie | Rozsah | Popis
● | vps     | http://100.67.86.91:20128 | token    | admin  | Vzdialený OmniRoute (…)
  | default | http://localhost:20128    | ✗        |        |
```

**Prepínanie serverov** — každý nasledujúci príkaz používa aktívny kontext:

```bash
omniroute contexts use vps         # → všetky príkazy teraz smerujú na vzdialený VPS
omniroute tokens list              #   (spustí sa voči VPS)

omniroute contexts use default     # → späť na localhost
omniroute tokens list              #   (spustí sa voči lokálnemu serveru)
```

**Manuálne pridanie kontextu** (namiesto `connect`), jeho zobrazenie alebo premenovanie:

```bash
omniroute contexts add staging --url https://staging.example.com:20128 \
  --access-token oma_live_xxxx --scope write --description "staging box"
omniroute contexts show staging    # úplné podrobnosti jedného kontextu
omniroute contexts rename staging stg
```

**Odstránenie kontextu** — zobrazí výzvu na potvrdenie; použitím `--yes` ju preskočíte
(vyžaduje sa pre skripty/neinteraktívne shelly, ktoré by inak operáciu bezpečne odmietli):

```bash
omniroute contexts remove stg --yes
```

> Kontext `default` (localhost) nemožno odstrániť. Po odstránení aktívneho kontextu sa systém vráti
> ku kontextu `default`. Tip: odstránením kontextu sa odstráni iba **lokálne** uložený prihlasovací údaj —
> ak chcete prístup skutočne
> zrušiť, odvolajte token na serveri pomocou `omniroute tokens revoke <id>`.

**Export/import** kontextov (napr. na ich prenos medzi počítačmi). Nové kontexty ukladajú
iba odkaz na kľúčenku; ak je dostupná kľúčenka operačného systému, prihlasovacie údaje sa do exportu
nekopírujú:

```bash
omniroute contexts export --out contexts.json     # predvolene: stdout
omniroute contexts import contexts.json            # prepíše existujúce; --merge ich zachová
omniroute contexts migrate --yes                  # presunie staršie tokeny v obyčajnom texte do kľúčenky
```

V systémoch bez grafického rozhrania a bez použiteľnej kľúčenky operačného systému použije CLI ako náhradné riešenie
súbor `config.json` s režimom `0600` a zobrazí jednorazové upozornenie. Exporty z tohto
náhradného riešenia (a akúkoľvek staršiu konfiguráciu pred migráciou) považujte za tajný materiál.

---

## Rýchla komplexná kontrola

Postup od začiatku do konca, ktorý možno skopírovať a vložiť na overenie vzdialenej konfigurácie — pripojenie, vytvorenie
tokenu s obmedzeným rozsahom, smerovanie príkazu, prepnutie späť a odstránenie konfigurácie. Nahraďte
`192.168.0.15` názvom hostiteľa/IP adresou svojho servera (Tailscale, LAN alebo verejnou
adresou URL `https://…`).

```bash
# 1. Pripojenie (heslo → token správcu, uložený ako kontext, ktorý sa stane aktívnym)
omniroute connect 192.168.0.15                 # alebo: --key oma_live_xxxx  (bez hesla)
omniroute contexts current                     # zobrazí vzdialený server + rozsah

# 2. Použitie — príkazy na správu sa teraz spúšťajú voči vzdialenému serveru
omniroute tokens create --name laptop --scope read   # vytvorí token s užším rozsahom
omniroute tokens list                                 # maskovaný zoznam zo vzdialeného servera

# 3. Prepínanie tam a späť
omniroute contexts use default                 # → lokálne
omniroute contexts use 192-168-0-15            # → znova vzdialene (názov z `contexts list`)

# 4. Odstránenie konfigurácie. POZNÁMKA: `contexts remove` odstráni iba LOKÁLNY prihlasovací údaj —
#    token na serveri NEODVOLÁ. Ak chcete prístup skutočne zrušiť,
#    najskôr odvolajte token na strane servera.
omniroute tokens revoke <id|prefix>            # zruší prístup na serveri
omniroute contexts remove 192-168-0-15 --yes   # odstráni lokálny kontext (aj keď je aktívny → návrat ku kontextu default), bez výzvy
```

> Prepínač `--yes` spôsobí, že `contexts remove` bude neinteraktívny (vyžaduje sa v skriptoch/CI; bez
> neho neinteraktívny shell operáciu bezpečne odmietne namiesto toho, aby zostal čakať). Po odstránení
> **aktívneho** kontextu sa systém automaticky vráti ku kontextu `default`.

---

## Bezpečnostné poznámky

- Token vo forme obyčajného textu sa zobrazí iba raz; trvalo sa uloží len hash SHA-256 (rovnako ako pri kľúčoch API).
- `omniroute connect` opätovne využíva uzamknutie pri útoku hrubou silou na prihlasovanie a zaznamenávanie auditu.
- Pre prenos uprednostnite HTTPS alebo Tailnet; pri zadaní iba hostiteľa sa predvolene použije `http://`
  pre pohodlné použitie v sieti LAN/Tailscale — ak chcete použiť TLS, zadajte úplnú URL adresu `https://…`.
- Preferovaným lokálnym súborom kontextu je `~/.omniroute/config.json` (`chmod 600`),
  ktorý obsahuje iba `credentialRef`; samotný token je uložený v systémovej
  kľúčenke (`keytar`) a nikdy sa nevypisuje do protokolov. Bezobslužné inštalácie bez
  funkčnej natívnej kľúčenky používajú rovnaký súbor s oprávneniami `0600` ako explicitnú záložnú možnosť
  a jednorazovo zobrazia upozornenie. Po nainštalovaní backendu
  kľúčenky použite `omniroute contexts migrate --yes`.

---

## Koncové body API (referencia)

| Metóda | Trasa                 | Autentifikácia   | Rozsah                       |
| ------ | --------------------- | ---------------- | ---------------------------- |
| POST   | `/api/cli/connect`    | heslo na správu  | — (verejné, chránené heslom) |
| GET    | `/api/cli/whoami`     | prístupový token | čítanie                      |
| GET    | `/api/cli/tokens`     | prístupový token | správca                      |
| POST   | `/api/cli/tokens`     | prístupový token | správca                      |
| DELETE | `/api/cli/tokens/:id` | prístupový token | správca                      |

Úplné schémy nájdete v súbore [openapi.yaml](../openapi.yaml).
