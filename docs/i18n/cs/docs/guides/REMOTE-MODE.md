# Remote Mode (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/REMOTE-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/REMOTE-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/REMOTE-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/REMOTE-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/REMOTE-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/REMOTE-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/REMOTE-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/REMOTE-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/REMOTE-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/REMOTE-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/REMOTE-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/REMOTE-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/REMOTE-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/REMOTE-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/REMOTE-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/REMOTE-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/REMOTE-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/REMOTE-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/REMOTE-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/REMOTE-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/REMOTE-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/REMOTE-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/REMOTE-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/REMOTE-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/REMOTE-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/REMOTE-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/REMOTE-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/REMOTE-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/REMOTE-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/REMOTE-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/REMOTE-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/REMOTE-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/REMOTE-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/REMOTE-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/REMOTE-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/REMOTE-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/REMOTE-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/REMOTE-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/REMOTE-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/REMOTE-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/REMOTE-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/REMOTE-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/REMOTE-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/REMOTE-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/REMOTE-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/REMOTE-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/REMOTE-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/REMOTE-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/REMOTE-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/REMOTE-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/REMOTE-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/REMOTE-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/REMOTE-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/REMOTE-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/REMOTE-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/REMOTE-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/REMOTE-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/REMOTE-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/REMOTE-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/REMOTE-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/REMOTE-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/REMOTE-MODE.md)

---

Spouštějte CLI `omniroute` na svém notebooku, zatímco samotný OmniRoute běží někde jinde
(na VPS, domácím serveru nebo jiném zařízení ve vaší síti Tailnet). Jednou se přihlásíte pomocí
`omniroute connect` a od té chvíle se **každý** příkaz CLI zaměřuje na tento vzdálený
server — stejné příkazy, stejný výstup, pouze se provádějí vůči vzdálenému serveru.

Není potřeba instalovat žádný další nástroj: vzdálený režim tvoří běžné CLI `omniroute`
společně s **přístupovými tokeny** s omezeným rozsahem oprávnění.

```bash
npm install -g omniroute                 # běžné CLI
omniroute connect 192.168.0.15           # přihlášení (heslo → token s omezeným rozsahem)
omniroute models list                    # ← nyní vypíše modely VZDÁLENÉHO serveru
omniroute configure codex                # ← vytvoří místní profil Codex ze vzdáleného katalogu
```

---

## Jak to funguje

```
váš notebook                             vzdálený OmniRoute (VPS)
┌────────────────────┐                   ┌───────────────────────────────┐
│ CLI omniroute      │  POST /api/cli/connect  (heslo → token)           │
│  kontext: vps      │ ───────────────►  │ vydá přístupový token         │
│  baseUrl, token    │  Authorization: Bearer oma_live_…                  │
│                    │ ───────────────►  │ každá trasa pro správu, rozsah │
│ zapisuje konfigurace│ ◄───────────────  │ ověřený podle rozsahu tokenu  │
│ MÍSTNĚ             │                   └───────────────────────────────┘
└────────────────────┘
```

- **Kontexty** uchovávají každý jeden server (`~/.omniroute/config.json`, `chmod 600`).
  `omniroute contexts use <name>` přepne aktivní server; `default` je místní.
- **Přístupové tokeny** (`oma_live_…`) autorizují příkazy pro správu. Liší se
  od klíčů API pro inferenci (`sk-…`, používaných pro `/v1/chat/completions`).
- Na straně serveru se ukládá pouze hash tokenu SHA-256. Token v otevřeném tvaru se zobrazí
  **pouze jednou**, při vytvoření.

---

## Připojení

### Pomocí hesla pro správu (počáteční nastavení)

```bash
omniroute connect 192.168.0.15
# Heslo pro správu serveru http://192.168.0.15:20128: ********
# ✔ Připojeno k http://192.168.0.15:20128 — kontext '192.168.0.15' (rozsah: admin)
```

Postup s heslem ve výchozím nastavení vydá token s rozsahem **admin** (jelikož máte heslo,
již máte úplnou kontrolu). Rozsah omezíte pomocí `--scope`:

```bash
omniroute connect 192.168.0.15 --scope write
```

Možnosti: `--port <p>` (pokud hostitel port neobsahuje), `--name <ctx>` (název kontextu),
`--scope read|write|admin`. Úplná URL se použije beze změny:
`omniroute connect https://omni.example.com`.

### Pomocí předem vygenerovaného tokenu

Vygenerujte token s omezeným rozsahem na řídicím panelu (nebo pomocí `omniroute tokens create`) a
vložte jej — heslo není potřeba:

```bash
omniroute connect 192.168.0.15 --key oma_live_xxxxxxxx
```

CLI jej ověří prostřednictvím `GET /api/cli/whoami` a uloží jej jako aktivní kontext.

---

## Rozsahy oprávnění

Tři hierarchické úrovně (`admin ⊃ write ⊃ read`):

| Rozsah  | Umožňuje                                                                               |
| ------- | -------------------------------------------------------------------------------------- |
| `read`  | výpis/kontrola — `models list`, `providers status`, `logs`, `usage`, `cost`            |
| `write` | read **+** konfigurace/použití — `setup-codex`, `keys add`, `config set`, kombinace    |
| `admin` | write **+** správa — CRUD pro `tokens`, přidávání poskytovatelů, služby, zásady, oauth |

Server odvodí rozsah vyžadovaný každou trasou z metody HTTP
(`GET`→read, změny→write) a ze seznamu povolených administrátorských operací pro citlivé oblasti
(změny `/api/cli/tokens`, `/api/providers`, `/api/oauth`, `/api/services`, …).
Token s nedostatečným rozsahem obdrží odpověď `403` s jasnou zprávou.

> Trasy, které spouštějí procesy (`/api/services/*`, `/api/mcp/*`, …), zůstávají
> **přístupné pouze přes loopback** — vzdálený token k nim nikdy nemůže přistupovat bez ohledu na svůj rozsah.

---

## Připojení Antigravity ke vzdálené instalaci

Antigravity používá souhlasnou obrazovku Google firstparty/nativeapp. Google vydá
autorizační kód pouze tehdy, když je **zpětné přesměrování na loopback**
(`http://127.0.0.1:<port>/callback`) **dostupné z prohlížeče, který
schvaluje přihlášení**. U vzdálené instalace na VPS se tento loopback nachází na
serveru, nikoli na vašem počítači, takže souhlasná obrazovka **zůstane navždy viset
a nikdy nevydá kód** — běžný záložní postup „vložte URL zpětného volání“ tedy nemá
co vložit. (Jde o omezení na straně Googlu: ke stejnému zablokování dochází
v jakémkoli proxy serveru, který používá přibaleného desktopového klienta
Antigravity, nejen v OmniRoute.)

Řídicí panel tuto situaci rozpozná dříve, než se zablokujete: otevřete-li
**Poskytovatelé → Antigravity → Připojit** z jiné adresy než localhost, obecné
oznámení „zkopírujte URL zpětného volání“ se nahradí dvěma níže uvedenými řešeními,
v nichž už budou vyplněny váš hostitel a port. (Počítá se i adresa LAN —
`192.168.x.x` není z hlediska tohoto zpětného volání localhost.)

Existují dva podporované způsoby připojení Antigravity ke vzdálenému OmniRoute.

### Možnost A — místní pomocník pro přihlášení (doporučeno)

Spusťte OAuth na **svém vlastním počítači**, kde je `127.0.0.1` dostupná. Pomocník
komunikuje přímo s Googlem, takže proces udělení souhlasu bude dokončen tam, kde
jej verze v řídicím panelu dokončit nemůže.

**Pokud jste již připojeni** (`omniroute connect <host>`), nemusíte nic kopírovat —
pomocník předá přihlašovací údaj dané instalaci za vás:

```bash
# Na vašem MÍSTNÍM počítači (vyžaduje Node.js + prohlížeč):
omniroute connect 192.168.0.15        # jednou — vytvoří kontextový token s oprávněními správce
npx omniroute login antigravity
#   ↳ otevře souhlasnou obrazovku Googlu, zachytí zpětné volání na místním loopback portu,
#     provede výměnu a odešle přihlašovací údaj metodou POST do aktivního kontextu:
#
#   Antigravity připojeno na http://192.168.0.15:20128 (připojení abc123).
#   Není třeba nic vkládat — tento terminál můžete zavřít.
```

Odeslání proběhne automaticky pokaždé, když aktivní kontext odkazuje na jiný
počítač. Vynutit jej můžete v obou směrech pomocí `--push` / `--no-push`, případně
můžete cílit na konkrétní kontext pomocí `--context <name>`.

**Pokud se váš počítač nemůže připojit k VPS** (firewall, bez SSH, izolované
pracoviště), pomocník přesto funguje — _potřebuje_ pouze Google. Použijte
`--no-push`, nebo jednoduše nechte odeslání selhat: namísto zahození již dokončené
autorizace se následně vypíše datový blok.

```bash
npx omniroute login antigravity --no-push
#   omniroute-cred-v1.eyJ2IjoxLCJ...
```

Poté ve **vzdáleném** řídicím panelu otevřete **Poskytovatelé → Antigravity →
Připojit** a vložte datový blok `omniroute-cred-v1.…` do pole v **Kroku 2**
(přijímá buď URL zpětného volání, nebo datový blok s přihlašovacími údaji).
OmniRoute jej dekóduje, na straně serveru spustí úvodní nastavení Cloud Code
a připojení trvale uloží.

> Datový blok obsahuje obnovovací token — zacházejte s ním jako s heslem. Při
> odeslání je jednorázově přenesen přes ověřené připojení vašeho kontextu; při
> ručním vložení přes připojení k řídicímu panelu. V obou případech je uložen
> zašifrovaně a při úspěšném odeslání se nikdy nevypíše do terminálu.

Přepínače: `--no-browser` (vypíše URL namísto automatického otevření),
`--port <n>` (pevně nastaví loopback port), `--timeout <ms>`, `--push` /
`--no-push` (přepíše automatický způsob doručení), `--context <name>` (zacílí na
konkrétní kontext).

### Možnost B — tunel s místním přesměrováním přes SSH

Pokud máte k VPS přístup přes SSH, přesměrujte port řídicího panelu tak, aby
loopback zpětné volání vedlo přes tunel zpět na server:

```bash
# Na vašem MÍSTNÍM počítači:
ssh -L 20128:127.0.0.1:20128 user@your-vps
# poté v MÍSTNÍM prohlížeči otevřete http://localhost:20128 a připojte Antigravity
# běžným způsobem — přesměrování 127.0.0.1:20128/callback se nyní přes SSH dostane k VPS.
```

Protože k řídicímu panelu přistupujete jako k `localhost:20128`, proces udělení
souhlasu Googlu se dokončí a zpětné volání se doručí serveru přes stejný tunel —
žádný datový blok není potřeba. Nechte tunel otevřený, dokud se připojení
nezobrazí jako aktivní.

Na rozdíl od níže uvedených poskytovatelů s pevně daným loopbackem zde **stačí
jedno přesměrování**: zpětné volání Antigravity používá samotný port řídicího
panelu, takže není nutné tunelovat druhý port specifický pro poskytovatele.

> Plně bezobslužnou alternativou (bez pomocníka a bez tunelu) je nakonfigurovat
> **vlastní** webové přihlašovací údaje Google OAuth + veřejnou základní URL; viz
> proměnné prostředí OAuth daného poskytovatele. Dvě výše uvedené možnosti
> nevyžadují žádné další nastavení Googlu.

---

## Připojení Codexu / Groku ke vzdálené instalaci (poskytovatelé s pevnou adresou loopback)

Codex, xAI (`xai-oauth`) a Grok CLI (`grok-cli`) registrují ve své upstreamové aplikaci OAuth **pevnou** adresu loopback
`redirect_uri`. OmniRoute ji nemůže změnit — poskytovatel vždy přesměruje
prohlížeč zpět na stejnou pevně zadanou adresu:

| Poskytovatel | Pevná adresa callbacku, na kterou poskytovatel přesměruje |
| ------------ | --------------------------------------------------------- |
| `codex`      | `http://localhost:1455/auth/callback`                     |
| `xai-oauth`  | `http://127.0.0.1:56121/callback`                         |
| `grok-cli`   | `http://127.0.0.1:56122/callback`                         |

`localhost` zde znamená **počítač, na kterém běží prohlížeč**, zatímco server callbacku PKCE
v OmniRoute naslouchá na loopbacku **serveru**. Pokud otevřete řídicí panel na adrese v LAN,
například `http://192.168.0.15:20128`, tyto dvě strany se nikdy nespojí: autorizační
kód je doručen na `localhost:1455` vašeho notebooku, kde nic nenaslouchá,
a poskytovatel přihlášení ukončí, aniž by zobrazil chybu.

Řídicí panel tuto situaci rozpozná ještě před otevřením vyskakovacího okna a místo toho,
aby nechal přihlášení bez upozornění selhat, zobrazí příkaz pro tunel (#8046).

### Řešení — přesměrujte **oba** porty

```bash
# Na počítači, na kterém běží PROHLÍŽEČ:
ssh -L 20128:127.0.0.1:20128 -L 1455:127.0.0.1:1455 <user>@192.168.0.15
# poté přejděte na http://localhost:20128 a odtud připojte Codex
```

Jsou nutná dvě přesměrování; přesměrování pouze jednoho portu stále selže:

- **`20128`** (port řídicího panelu) zajistí, že origin bude skutečně localhost, což
  je podmínka, aby OmniRoute vůbec spustil server callbacku PKCE — origin z LAN
  se do této větve nikdy nedostane.
- **`1455`** (pevný port callbacku poskytovatele) je místo, kam je prohlížeč přesměrován;
  musí být tunelem propojen s loopbackem serveru.

Při připojování xAI nebo Grok CLI nahraďte `1455` portem `56121`/`56122` a `20128`
skutečným portem svého řídicího panelu. Nechte tunel otevřený, dokud se připojení
nezobrazí jako aktivní.

> **Nemáte přístup přes SSH?** Codex a Grok CLI také umožňují vložit token — použijte kartu **Vložit klíč API
> Key** / **Importovat auth.json** v dialogovém okně připojení. Tato cesta nepoužívá callback
> na loopbacku, takže funguje z libovolného originu. Codex navíc přijímá samotný přístupový
> token nebo data relace `~/.codex/auth.json`.

---

## Správa tokenů

```bash
omniroute tokens create --name "laptop" --scope write [--expires 30]
#   ↳ tajný údaj se vypíše POUZE JEDNOU — nyní jej zkopírujte
omniroute tokens list                 # maskované údaje: ID, název, rozsah, prefix, stav, vypršení platnosti
omniroute tokens revoke <id|prefix>   # okamžité odvolání
omniroute tokens scopes               # vysvětlení tří rozsahů
```

Příkazy `tokens` vyžadují přihlašovací údaj s oprávněním **správce**. Tokeny lze také spravovat
v řídicím panelu v části **Nastavení → Přístupové tokeny** (vytvoření, odvolání, jednorázové zkopírování).

---

## Konfigurace programátorského CLI ze vzdáleného katalogu

`omniroute configure` načte živý katalog modelů z **aktivního serveru** a zapíše
konfiguraci na **váš** počítač.

```bash
omniroute configure codex
#   Poskytovatelé: glm, kmc, ollamacloud, opencode-go, …
#   Poskytovatel: glm
#   ID modelu: glm/glm-5.2
#   ✔ Zapsáno do ~/.codex/glm52.config.toml
#   Použití:  codex --profile glm52

# neinteraktivně
omniroute configure codex --provider glm --model glm/glm-5.2 --name glm52

# ponechání často používaného modelu na začátku interaktivního výběru
omniroute configure codex --provider glm --model glm/glm-5.2 --favorite --yes
```

Nástroj pro výběr uchovává v místním souboru `model-preferences.json` pouze ID modelů
(nikdy adresy URL ani přihlašovací údaje), odděleně podle kontextu a cílového CLI. Oblíbené položky se
zobrazují před nedávnými výběry; chcete-li vybraný model ze seznamu daného
kontextu/cíle odebrat, použijte `--unfavorite`.

Zapsaný profil odkazuje na inferenční klíč prostřednictvím proměnné prostředí
(`OMNIROUTE_API_KEY`) — tajný údaj se nikdy nezapisuje na disk. Informace o jednorázovém
základním nastavení Codexu (blok `[model_providers.omniroute]`) naleznete v souboru
[CODEX-CLI-CONFIGURATION.md](./CODEX-CLI-CONFIGURATION.md).

### Spuštění CLI proti vzdálenému serveru (bez zápisu konfigurace)

`omniroute run <target>` rovněž respektuje aktivní kontext: vzdálená základní adresa URL
a přihlašovací údaj kontextu se vloží pouze do spuštěného procesu.

```bash
omniroute connect 192.168.0.15
omniroute run claude   --model openai/gpt-5.4          # Claude Code → vzdálený server
omniroute run gemini   --model glm/glm-5.2 -- --skip-trust -p "hello"
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"

# Náhled přesně toho, co by se spustilo (pouze NÁZVY KLÍČŮ prostředí, nikdy jejich hodnoty):
omniroute run codex --dry-run --json
```

Cíle: `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen`, `gemini`
(jediný zdroj: `bin/cli/cli-manifest.mjs`). Qwen a Gemini se spouštějí s
dočasným izolovaným domovským adresářem, který se při ukončení odstraní, takže spuštění nikdy neovlivní —
ani do něj neunikne — konfiguraci vašich osobních nástrojů.

### Příkazy pro nastavení jednotlivých CLI

Každé podporované CLI má příkaz pro nastavení zohledňující vzdálený server (všechny respektují aktivní
kontext nebo `--remote <url> --api-key <key>`):

| CLI         | Příkaz                     | Co zapisuje                                                                                                                                                                                           |
| ----------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Codex       | `omniroute setup-codex`    | profily `~/.codex/<name>.config.toml` (pro jednotlivé modely)                                                                                                                                         |
| Claude Code | `omniroute setup-claude`   | `~/.claude/profiles/<name>/settings.json` (pro jednotlivé modely)                                                                                                                                     |
| OpenCode    | `omniroute setup-opencode` | `~/.config/opencode/opencode.json` — poskytovatel `omniroute` kompatibilní s OpenAI se všemi modely z katalogu (spusťte `opencode -m omniroute/<model>`)                                              |
| Cline       | `omniroute setup-cline`    | `~/.cline/data/{globalState,secrets}.json` (režim CLI) + vypíše nastavení rozšíření VS Code k vložení (kompatibilní s OpenAI, základní URL **bez** `/v1`)                                             |
| Kilo Code   | `omniroute setup-kilo`     | `~/.local/share/kilo/auth.json` (CLI) + nastavení VS Code `kilocode.*` — kompatibilní s OpenAI, základní URL **s** `/v1`                                                                              |
| Continue    | `omniroute setup-continue` | `~/.continue/config.yaml` (VS Code/JetBrains + CLI `cn`) — `provider: openai`, `apiBase` **s** `/v1`, klíč přes `${{ secrets.OMNIROUTE_API_KEY }}`                                                    |
| Cursor      | `omniroute setup-cursor`   | vypíše postup v aplikaci (Nastavení → Modely → Přepsat základní URL OpenAI **s** `/v1` + klíč + model). Konfigurace Cursoru je neprůhledná databáze SQLite — pouze panel chatu                        |
| Roo Code    | `omniroute setup-roo`      | zapíše importní JSON pro Roo (`~/.omniroute/roo-settings.json`) + nastaví `roo-cline.autoImportSettingsPath` + vypíše kroky v uživatelském rozhraní (kompatibilní s OpenAI, základní URL **s** `/v1`) |
| Crush       | `omniroute setup-crush`    | `~/.config/crush/crush.json` — poskytovatel `openai-compat`, `base_url` **s** `/v1`, klíč přes `$OMNIROUTE_API_KEY`                                                                                   |
| Goose       | `omniroute setup-goose`    | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER=openai` + `OPENAI_HOST` **bez** `/v1` + `GOOSE_MODEL`) + postup pro nastavení prostředí                                                                |
| Aider       | `omniroute setup-aider`    | `~/.aider.conf.yml` (`openai-api-base` **bez** `/v1` + `model: openai/<id>`) + postup pro nastavení prostředí (`aider --message --yes`)                                                               |
| Qwen Code   | `omniroute setup-qwen`     | položka V4 `modelProviders.openai` v `~/.qwen/settings.json` + `OMNIROUTE_API_KEY` v `~/.qwen/.env`                                                                                                   |

```bash
# OpenCode (poskytovatel kompatibilní s OpenAI, všechny modely z katalogu, vzdálený VPS)
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute setup-opencode --only glm,kimi        # ponechat pouze odpovídající modely
opencode -m omniroute/glm/glm-5.2 "..."          # nejprve exportovat OMNIROUTE_API_KEY
```

> OpenCode má také propracovanější integraci pomocí **pluginu**: `omniroute setup opencode`
> (nyní s podporou vzdáleného připojení přes `--remote`) nainstaluje `@omniroute/opencode-plugin`.
> `setup-opencode` je odlehčená alternativa kompatibilní s OpenAI. Na klíč API
> se odkazuje pomocí `{env:OMNIROUTE_API_KEY}` — nikdy se nezapisuje na disk.
>
> V OpenCode v2 místo toho použijte `@omniroute/opencode-plugin-v2`: stejný katalog,
> jiný kontrakt zavaděče. Když je integrace připojena, načítá klíč z vlastního úložiště
> přihlašovacích údajů OpenCode, takže vzdálená brána vůbec nepotřebuje klíč
> v souboru `opencode.json`.

---

## Správa kontextů (přepínání mezi servery)

**Kontext** je uložený server (baseUrl + pověření + rozsah). `omniroute connect`
jeden vytvoří a aktivuje; od té doby každý příkaz cílí na něj. Spravujte a
přepínejte mezi nimi pomocí `omniroute contexts`:

```bash
omniroute contexts list            # všechny kontexty; aktivní je označen ●
omniroute contexts current         # aktivní server, stav autentizace, rozsah
```

```text
  | Name    | Base URL                  | Auth  | Scope | Description
● | vps     | http://100.67.86.91:20128 | token | admin | Remote OmniRoute (…)
  | default | http://localhost:20128    | ✗     |       |
```

**Přepínání serverů** — každý následující příkaz se řídí aktivním kontextem:

```bash
omniroute contexts use vps         # → všechny příkazy nyní směřují na vzdálený VPS
omniroute tokens list              #   (spouští se proti VPS)

omniroute contexts use default     # → zpět na localhost
omniroute tokens list              #   (spouští se proti lokálnímu serveru)
```

**Přidání kontextu ručně** (místo `connect`), kontrola nebo přejmenování:

```bash
omniroute contexts add staging --url https://staging.example.com:20128 \
  --access-token oma_live_xxxx --scope write --description "staging box"
omniroute contexts show staging    # úplné detaily pro jeden kontext
omniroute contexts rename staging stg
```

**Odebrání kontextu** — vyžádá si potvrzení; pro přeskočení použijte `--yes`
(vyžadováno pro skripty / neinteraktivní shelly, které by jinak bezpečně odmítly):

```bash
omniroute contexts remove stg --yes
```

> `default` (localhost) nelze odebrat. Odebrání aktivního kontextu se vrátí na
> `default`. Tip: odebrání kontextu pouze zahodí **lokálně** uložené pověření —
> pro skutečné zrušení přístupu zrušte token na serveru pomocí `omniroute tokens revoke <id>`.

**Export / import** kontextů (např. pro jejich přesun mezi stroji). Exporty ve výchozím nastavení vynechávají pověření, včetně pověření uložených záložním souborem. Použijte `--include-secrets` explicitně, když je potřeba přenosná záloha obsahující pověření:

```bash
omniroute contexts export --out contexts.json     # redigováno; výchozí cíl: stdout
omniroute contexts export --include-secrets --out private-contexts.json
omniroute contexts import contexts.json            # přepsat; --merge pro zachování stávajících
omniroute contexts migrate --yes                  # přesunout starší plaintext tokeny do klíčenky
```

`--include-secrets` před exportem rozřeší odkazy na klíčenku a selže, pokud nelze přečíst jakékoli odkazované pověření. `--no-secrets` má vždy přednost. Exportní soubory jsou zapisovány atomicky s režimem `0600`. S explicitním exportem obsahujícím tajemství zacházejte jako s tajným materiálem. Na bezhlavých systémech bez použitelné klíčenky OS se CLI vrátí k `config.json` s režimem `0600` a vytiskne jednorázové varování; výchozí export zůstává v tomto režimu redigován.

---

## Rychlá kompletní kontrola

Životní cyklus ke zkopírování a vložení pro ověření vzdáleného nastavení od začátku — připojení, vytvoření
tokenu s omezeným rozsahem oprávnění, směrování příkazu, přepnutí zpět a odstranění nastavení. Nahraďte
`192.168.0.15` názvem hostitele/IP adresou svého serveru (Tailscale, LAN nebo veřejná
URL `https://…`).

```bash
# 1. Připojení (heslo → token správce, uložený jako kontext, který se stane aktivním)
omniroute connect 192.168.0.15                 # nebo: --key oma_live_xxxx  (bez hesla)
omniroute contexts current                     # zobrazí vzdálený server + rozsah oprávnění

# 2. Použití — příkazy pro správu se nyní spouštějí vůči vzdálenému serveru
omniroute tokens create --name laptop --scope read   # vytvoří token s užším rozsahem oprávnění
omniroute tokens list                                 # maskovaný seznam ze vzdáleného serveru

# 3. Přepínání tam a zpět
omniroute contexts use default                 # → místní
omniroute contexts use 192-168-0-15            # → znovu vzdálený (název z `contexts list`)

# 4. Odstranění nastavení. POZNÁMKA: `contexts remove` odstraní pouze MÍSTNÍ přihlašovací údaj —
#    token na serveru NEODVOLÁ. Pokud chcete přístup skutečně zrušit,
#    nejprve token odvolejte na serveru.
omniroute tokens revoke <id|prefix>            # zruší přístup na serveru
omniroute contexts remove 192-168-0-15 --yes   # odstraní místní kontext (i když je aktivní → vrátí se k default), bez výzvy
```

> Přepínač `--yes` zajistí, že `contexts remove` bude neinteraktivní (vyžadováno ve skriptech/CI; bez
> něj neinteraktivní shell operaci bezpečně odmítne namísto toho, aby se zasekl). Po odebrání
> **aktivního** kontextu se systém automaticky vrátí ke kontextu `default`.

---

## Bezpečnostní poznámky

- Token v otevřeném textu se zobrazí pouze jednou; trvale se ukládá pouze jeho hash SHA-256 (stejně jako u klíčů API).
- `omniroute connect` používá stejný mechanismus uzamčení při opakovaných neúspěšných pokusech o přihlášení a protokolování auditu.
- Pro přenos upřednostněte HTTPS nebo Tailnet; při zadání samotného hostitele se kvůli pohodlnému použití v síti LAN/Tailscale ve výchozím nastavení použije `http://` — pro TLS zadejte úplnou adresu URL `https://…`.
- Upřednostňovaným místním kontextovým souborem je `~/.omniroute/config.json` (`chmod 600`), který obsahuje pouze `credentialRef`; samotný token je uložen v systémové klíčence (`keytar`) a nikdy se nevypisuje do protokolů. Bezobslužné instalace bez funkční nativní klíčenky používají jako explicitní záložní řešení stejný soubor s oprávněními `0600` a jednou zobrazí varování. Po instalaci backendu klíčenky použijte `omniroute contexts migrate --yes`.

---

## Koncové body API (referenční přehled)

| Metoda | Trasa                 | Ověření          | Rozsah                       |
| ------ | --------------------- | ---------------- | ---------------------------- |
| POST   | `/api/cli/connect`    | heslo pro správu | — (veřejné, chráněné heslem) |
| GET    | `/api/cli/whoami`     | přístupový token | čtení                        |
| GET    | `/api/cli/tokens`     | přístupový token | správce                      |
| POST   | `/api/cli/tokens`     | přístupový token | správce                      |
| DELETE | `/api/cli/tokens/:id` | přístupový token | správce                      |

Úplná schémata najdete v souboru [openapi.yaml](../openapi.yaml).
