# Remote Mode (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/REMOTE-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/REMOTE-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/REMOTE-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/REMOTE-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/REMOTE-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/REMOTE-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/REMOTE-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/REMOTE-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/REMOTE-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/REMOTE-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/REMOTE-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/REMOTE-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/REMOTE-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/REMOTE-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/REMOTE-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/REMOTE-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/REMOTE-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/REMOTE-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/REMOTE-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/REMOTE-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/REMOTE-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/REMOTE-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/REMOTE-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/REMOTE-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/REMOTE-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/REMOTE-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/REMOTE-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/REMOTE-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/REMOTE-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/REMOTE-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/REMOTE-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/REMOTE-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/REMOTE-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/REMOTE-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/REMOTE-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/REMOTE-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/REMOTE-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/REMOTE-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/REMOTE-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/REMOTE-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/REMOTE-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/REMOTE-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/REMOTE-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/REMOTE-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/REMOTE-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/REMOTE-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/REMOTE-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/REMOTE-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/REMOTE-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/REMOTE-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/REMOTE-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/REMOTE-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/REMOTE-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/REMOTE-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/REMOTE-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/REMOTE-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/REMOTE-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/REMOTE-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/REMOTE-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/REMOTE-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/REMOTE-MODE.md)

---

Zaženite CLI `omniroute` na svojem prenosniku, medtem ko sam OmniRoute deluje nekje drugje
(na VPS-u, domačem strežniku ali drugem računalniku v vašem omrežju Tailnet). Enkrat se prijavite z
`omniroute connect`, nato pa **vsak** ukaz CLI cilja na ta oddaljeni
strežnik — isti ukazi, isti izpis, le izvajanje poteka na oddaljenem strežniku.

Ni vam treba namestiti drugega orodja: oddaljeni način uporablja običajni CLI `omniroute`
in **žetone za dostop** z določenim obsegom.

```bash
npm install -g omniroute                 # običajni CLI
omniroute connect 192.168.0.15           # prijava (geslo → žeton z določenim obsegom)
omniroute models list                    # ← zdaj izpiše modele ODDALJENEGA strežnika
omniroute configure codex                # ← iz oddaljenega kataloga zapiše lokalni profil Codex
```

---

## Kako deluje

```
vaš prenosnik                            oddaljeni OmniRoute (VPS)
┌────────────────────┐                   ┌───────────────────────────────┐
│ CLI omniroute      │  POST /api/cli/connect  (geslo → žeton)            │
│  kontekst: vps     │ ───────────────►  │ izda žeton za dostop z obsegom │
│  baseUrl, žeton    │  Authorization: Bearer oma_live_…                  │
│                    │ ───────────────►  │ vsaka upravljalna pot preveri  │
│ zapisuje nastavitve│ ◄───────────────  │ obseg žetona                   │
│ LOKALNO            │                   └───────────────────────────────┘
└────────────────────┘
```

- **Konteksti** shranjujejo vsak po en strežnik (`~/.omniroute/config.json`, `chmod 600`).
  `omniroute contexts use <name>` preklopi aktivni strežnik; `default` je lokalni.
- **Žetoni za dostop** (`oma_live_…`) dovoljujejo ukaze za upravljanje. Razlikujejo se
  od ključev API za sklepanje (`sk-…`, ki se uporabljajo za `/v1/chat/completions`).
- Na strani strežnika je shranjena samo zgoščena vrednost žetona SHA-256. Žeton v navadnem besedilu se prikaže
  **enkrat**, ob ustvarjanju.

---

## Vzpostavljanje povezave

### Z geslom za upravljanje (začetna nastavitev)

```bash
omniroute connect 192.168.0.15
# Geslo za upravljanje za http://192.168.0.15:20128: ********
# ✔ Povezava z http://192.168.0.15:20128 je vzpostavljena — kontekst '192.168.0.15' (obseg: admin)
```

Potek z geslom privzeto izda žeton **admin** (ker imate geslo,
že imate popoln nadzor). Obseg omejite z `--scope`:

```bash
omniroute connect 192.168.0.15 --scope write
```

Možnosti: `--port <p>` (ko gostitelj nima navedenih vrat), `--name <ctx>` (ime konteksta),
`--scope read|write|admin`. Celoten URL se uporabi nespremenjen:
`omniroute connect https://omni.example.com`.

### Z vnaprej ustvarjenim žetonom

V nadzorni plošči (ali z `omniroute tokens create`) ustvarite žeton z določenim obsegom in
ga prilepite — geslo ni potrebno:

```bash
omniroute connect 192.168.0.15 --key oma_live_xxxxxxxx
```

CLI ga preveri prek `GET /api/cli/whoami` in shrani kot aktivni kontekst.

---

## Obsegi

Tri hierarhične ravni (`admin ⊃ write ⊃ read`):

| Obseg   | Omogočena dejanja                                                                                |
| ------- | ------------------------------------------------------------------------------------------------ |
| `read`  | izpis/pregled — `models list`, `providers status`, `logs`, `usage`, `cost`                       |
| `write` | branje **+** konfiguriranje/uveljavljanje — `setup-codex`, `keys add`, `config set`, kombinacije |
| `admin` | pisanje **+** upravljanje — CRUD za `tokens`, dodajanje ponudnikov, storitve, pravilniki, oauth  |

Strežnik določi obseg, ki ga zahteva posamezna pot, na podlagi metode HTTP
(`GET`→branje, spremembe→pisanje) in skrbniškega seznama dovoljenih občutljivih področij
(spremembe `/api/cli/tokens`, `/api/providers`, `/api/oauth`, `/api/services`, …).
Žeton z nezadostnim obsegom prejme odgovor `403` z jasnim sporočilom.

> Poti, ki zaganjajo procese (`/api/services/*`, `/api/mcp/*`, …), ostanejo
> **dostopne samo prek povratne zanke** — oddaljeni žeton jih ne more nikoli doseči ne glede na obseg.

---

## Povezovanje storitve Antigravity pri oddaljeni namestitvi

Antigravity uporablja Googlov zaslon za soglasje firstparty/nativeapp. Google izda
avtorizacijsko kodo samo, ko je **povratna preusmeritev loopback**
(`http://127.0.0.1:<port>/callback`) **dosegljiva iz brskalnika, v katerem
potrdite prijavo**. Pri oddaljeni namestitvi na VPS je ta naslov loopback na
strežniku, ne na vašem računalniku, zato zaslon za soglasje **obvisi za vedno in
nikoli ne izda kode** — običajna nadomestna možnost »prilepite URL povratnega
klica« nima ničesar, kar bi lahko prilepili. (To je omejitev na Googlovi strani:
enako se zgodi v vsakem posredniškem strežniku, ki uporablja priloženi namizni
odjemalec Antigravity, ne le v OmniRoute.)

Nadzorna plošča to zazna, preden obtičite: če možnost **Ponudniki → Antigravity →
Poveži** odprete z naslova, ki ni localhost, se splošno obvestilo »kopirajte URL
povratnega klica« nadomesti s spodnjima rešitvama, pri čemer sta vaš gostitelj in
vrata že izpolnjena. (Tudi naslov LAN šteje — `192.168.x.x` za ta povratni klic
ni localhost.)

Za povezavo storitve Antigravity z oddaljenim OmniRoute sta podprta dva načina.

### Možnost A — lokalni pomočnik za prijavo (priporočeno)

OAuth zaženite v **svojem računalniku**, kjer je `127.0.0.1` dosegljiv. Pomočnik
komunicira neposredno z Googlom, zato se postopek soglasja dokonča tam, kjer se
različica v nadzorni plošči ne more.

**Če ste že povezani** (`omniroute connect <host>`), vam ni treba ničesar
kopirati — pomočnik sam posreduje poverilnico tej namestitvi:

```bash
# Na vašem LOKALNEM računalniku (potrebujete Node.js in brskalnik):
omniroute connect 192.168.0.15        # enkrat — ustvari kontekstni žeton z obsegom skrbnika
npx omniroute login antigravity
#   ↳ odpre Googlovo soglasje, zajame povratni klic na lokalnih vratih loopback,
#     ga izmenja in s POST pošlje poverilnico aktivnemu kontekstu:
#
#   Antigravity povezan na http://192.168.0.15:20128 (povezava abc123).
#   Ničesar ni treba prilepiti — ta terminal lahko zaprete.
```

Potisk se izvede samodejno, kadar aktivni kontekst kaže na drug računalnik.
Izrecno ga omogočite ali onemogočite z `--push` / `--no-push`, določen kontekst
pa izberite z `--context <name>`.

**Če vaš računalnik ne more doseči VPS-ja** (zaradi požarnega zidu, brez SSH-ja,
fizično ločena delovna postaja), pomočnik še vedno deluje — potrebuje samo
Google. Uporabite `--no-push` ali pa preprosto pustite, da potisk ne uspe: namesto
da bi zavrgel že dokončano avtorizacijo, bo izpisal podatkovni blok.

```bash
npx omniroute login antigravity --no-push
#   omniroute-cred-v1.eyJ2IjoxLCJ...
```

Nato na **oddaljeni** nadzorni plošči odprite **Ponudniki → Antigravity → Poveži**
in prilepite blok `omniroute-cred-v1.…` v polje **2. korak** (sprejme bodisi URL
povratnega klica bodisi blok poverilnice). OmniRoute ga dekodira, na strežniški
strani izvede uvodno nastavitev Cloud Code in trajno shrani povezavo.

> Blok vsebuje žeton za osvežitev — obravnavajte ga kot geslo. Pri potisku se
> enkrat pošlje prek overjene povezave vašega konteksta, pri ročnem lepljenju pa
> prek povezave z vašo nadzorno ploščo. V obeh primerih je shranjen šifrirano,
> uspešen potisk pa ga nikoli ne izpiše v terminalu.

Zastavice: `--no-browser` (izpiše URL namesto samodejnega odpiranja),
`--port <n>` (določi vrata loopback), `--timeout <ms>`, `--push` / `--no-push`
(preglasi samodejno dostavo), `--context <name>` (izbere določen kontekst).

### Možnost B — tunel z lokalnim posredovanjem SSH

Če imate dostop SSH do VPS-ja, posredujte vrata nadzorne plošče, da se povratni
klic loopback skozi tunel razreši nazaj do strežnika:

```bash
# Na vašem LOKALNEM računalniku:
ssh -L 20128:127.0.0.1:20128 user@your-vps
# nato v LOKALNEM brskalniku odprite http://localhost:20128 in povežite Antigravity
# na običajen način — preusmeritev 127.0.0.1:20128/callback zdaj doseže VPS prek SSH-ja.
```

Ker do nadzorne plošče dostopate kot `localhost:20128`, se Googlovo soglasje
dokonča, povratni klic pa je prek istega tunela dostavljen strežniku — podatkovni
blok ni potreben. Tunel pustite odprt, dokler povezava ni prikazana kot aktivna.

Za razliko od spodnjih ponudnikov s fiksnim naslovom loopback je tukaj **dovolj
eno posredovanje**: povratni klic Antigravity uporablja kar vrata nadzorne
plošče, zato vam ni treba tunelirati dodatnih vrat, specifičnih za ponudnika.

> Povsem brezglava alternativa (brez pomočnika in tunela) je, da nastavite
> **lastne** Googlove spletne poverilnice OAuth in javni osnovni URL; glejte
> ponudnikove okoljske spremenljivke za OAuth. Zgornji možnosti ne zahtevata
> dodatne nastavitve Googla.

---

## Povezovanje Codexa / Groka pri oddaljeni namestitvi (ponudniki s fiksno povratno zanko)

Codex, xAI (`xai-oauth`) in Grok CLI (`grok-cli`) pri svoji nadrejeni aplikaciji OAuth registrirajo **fiksen** naslov povratne zanke
`redirect_uri`. OmniRoute ga ne more spremeniti — ponudnik brskalnik vedno preusmeri nazaj na isti, vnaprej določen naslov:

| Ponudnik    | Fiksni povratni naslov, na katerega preusmeri ponudnik |
| ----------- | ------------------------------------------------------ |
| `codex`     | `http://localhost:1455/auth/callback`                  |
| `xai-oauth` | `http://127.0.0.1:56121/callback`                      |
| `grok-cli`  | `http://127.0.0.1:56122/callback`                      |

`localhost` tukaj pomeni **računalnik, na katerem se izvaja brskalnik**, medtem ko povratni strežnik PKCE storitve OmniRoute posluša na povratni zanki **strežnika**. Če nadzorno ploščo odprete na naslovu LAN, kot je `http://192.168.0.15:20128`, se povezavi nikoli ne srečata: avtorizacijska koda je dostavljena na `localhost:1455` vašega prenosnika, kjer nič ne posluša, zato ponudnik prijave ne izvede, ne da bi prikazal napako.

Nadzorna plošča to zazna, preden odpre pojavno okno, in namesto tihega neuspeha prijave prikaže ukaz za tunel (#8046).

### Rešitev — posredujte **obe** vrati

```bash
# Na računalniku, na katerem se izvaja BRSKALNIK:
ssh -L 20128:127.0.0.1:20128 -L 1455:127.0.0.1:1455 <user>@192.168.0.15
# nato odprite http://localhost:20128 in od tam povežite Codex
```

Potrebni sta dve posredovanji; tudi posredovanje samo enih vrat ne deluje:

- **`20128`** (vrata nadzorne plošče) zagotovi, da je izvor resnično lokalni `localhost`, zaradi česar OmniRoute sploh zažene povratni strežnik PKCE — izvor LAN nikoli ne doseže te veje.
- **`1455`** (fiksna povratna vrata ponudnika) so vrata, na katera je brskalnik preusmerjen; prek tunela morajo biti povezana s povratno zanko strežnika.

Pri povezovanju z xAI ali Grok CLI zamenjajte `1455` z `56121`/`56122`, `20128` pa z dejanskimi vrati svoje nadzorne plošče. Tunel pustite odprt, dokler povezava ni prikazana kot aktivna.

> **Nimate dostopa SSH?** Codex in Grok CLI sprejemata tudi prilepljen žeton — zavihek **Prilepi ključ API** / **Uvozi auth.json** v pogovornem oknu za povezovanje. Ta način ne uporablja povratnega klica prek povratne zanke, zato deluje iz katerega koli izvora. Codex dodatno sprejema samostojen žeton za dostop ali sejni objekt iz `~/.codex/auth.json`.

---

## Upravljanje žetonov

```bash
omniroute tokens create --name "laptop" --scope write [--expires 30]
#   ↳ skrivnost izpiše ENKRAT — kopirajte jo zdaj
omniroute tokens list                 # prikrito: ID, ime, obseg, predpona, stanje, potek veljavnosti
omniroute tokens revoke <id|prefix>   # takojšen preklic
omniroute tokens scopes               # razloži tri obsege
```

Ukazi `tokens` zahtevajo poverilnico **skrbnika**. Žetone lahko upravljate tudi na nadzorni plošči v razdelku **Nastavitve → Žetoni za dostop** (ustvarjanje, preklic, enkratno kopiranje).

---

## Konfiguriranje CLI-ja za programiranje iz oddaljenega kataloga

`omniroute configure` prebere sprotni katalog modelov **aktivnega strežnika** in zapiše konfiguracijo v **vaš** računalnik.

```bash
omniroute configure codex
#   Ponudniki: glm, kmc, ollamacloud, opencode-go, …
#   Ponudnik: glm
#   ID modela: glm/glm-5.2
#   ✔ Zapisano v ~/.codex/glm52.config.toml
#   Uporaba:  codex --profile glm52

# neinteraktivno
omniroute configure codex --provider glm --model glm/glm-5.2 --name glm52

# pogosto uporabljeni model ohranite na vrhu interaktivnega izbirnika
omniroute configure codex --provider glm --model glm/glm-5.2 --favorite --yes
```

Izbirnik v lokalni datoteki `model-preferences.json` hrani samo ID-je modelov (nikoli URL-jev ali poverilnic), ločeno glede na kontekst in ciljni CLI. Priljubljeni modeli so prikazani pred nedavnimi izbirami; z možnostjo `--unfavorite` odstranite izbrani model s seznama za ta kontekst/cilj.

Zapisani profil se na ključ za sklepanje sklicuje prek okoljske spremenljivke (`OMNIROUTE_API_KEY`) — skrivnost ni nikoli zapisana na disk. Za enkratno osnovno nastavitev Codexa (blok `[model_providers.omniroute]`) glejte [CODEX-CLI-CONFIGURATION.md](./CODEX-CLI-CONFIGURATION.md).

### Zagon CLI-ja z oddaljenim strežnikom (brez zapisovanja konfiguracije)

`omniroute run <target>` prav tako upošteva aktivni kontekst: osnovni URL oddaljenega strežnika in poverilnica konteksta se vstavita samo v zagnani proces.

```bash
omniroute connect 192.168.0.15
omniroute run claude   --model openai/gpt-5.4          # Claude Code → oddaljeni strežnik
omniroute run gemini   --model glm/glm-5.2 -- --skip-trust -p "hello"
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"

# Predogled natanko tega, kar bi se zagnalo (samo IMENA KLJUČEV okolja, nikoli vrednosti):
omniroute run codex --dry-run --json
```

Cilji: `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen`, `gemini`
(enoten vir: `bin/cli/cli-manifest.mjs`). Qwen in Gemini se izvajata z začasnim, izoliranim domačim imenikom, ki se ob izhodu odstrani, zato zagon nikoli ne poseže v osebno konfiguracijo vašega orodja niti vanjo ne vnese podatkov.

### Ukazi za nastavitev posameznega CLI-ja

Vsak podprti CLI ima ukaz za nastavitev, ki podpira oddaljeni strežnik (vsi upoštevajo aktivni kontekst ali `--remote <url> --api-key <key>`):

| CLI         | Ukaz                       | Kaj zapiše                                                                                                                                                                                       |
| ----------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Codex       | `omniroute setup-codex`    | profili `~/.codex/<name>.config.toml` (za vsak model posebej)                                                                                                                                    |
| Claude Code | `omniroute setup-claude`   | `~/.claude/profiles/<name>/settings.json` (za vsak model posebej)                                                                                                                                |
| OpenCode    | `omniroute setup-opencode` | `~/.config/opencode/opencode.json` — ponudnik `omniroute`, združljiv z OpenAI, z vsemi modeli iz kataloga (zaženite `opencode -m omniroute/<model>`)                                             |
| Cline       | `omniroute setup-cline`    | `~/.cline/data/{globalState,secrets}.json` (način CLI) + izpiše nastavitve razširitve VS Code, ki jih je treba prilepiti (združljivo z OpenAI, osnovni URL **brez** `/v1`)                       |
| Kilo Code   | `omniroute setup-kilo`     | `~/.local/share/kilo/auth.json` (CLI) + nastavitve VS Code `kilocode.*` — združljivo z OpenAI, osnovni URL **z** `/v1`                                                                           |
| Continue    | `omniroute setup-continue` | `~/.continue/config.yaml` (VS Code/JetBrains + CLI `cn`) — `provider: openai`, `apiBase` **z** `/v1`, ključ prek `${{ secrets.OMNIROUTE_API_KEY }}`                                              |
| Cursor      | `omniroute setup-cursor`   | izpiše korake v aplikaciji (Nastavitve → Modeli → preglasitev osnovnega URL-ja OpenAI **z** `/v1` + ključ + model). Konfiguracija Cursor je neprozoren SQLite — samo podokno klepeta             |
| Roo Code    | `omniroute setup-roo`      | zapiše uvozni JSON za Roo (`~/.omniroute/roo-settings.json`) + nastavi `roo-cline.autoImportSettingsPath` + izpiše korake v uporabniškem vmesniku (združljivo z OpenAI, osnovni URL **z** `/v1`) |
| Crush       | `omniroute setup-crush`    | `~/.config/crush/crush.json` — ponudnik `openai-compat`, `base_url` **z** `/v1`, ključ prek `$OMNIROUTE_API_KEY`                                                                                 |
| Goose       | `omniroute setup-goose`    | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER=openai` + `OPENAI_HOST` **brez** `/v1` + `GOOSE_MODEL`) + navodila za okoljske spremenljivke                                                      |
| Aider       | `omniroute setup-aider`    | `~/.aider.conf.yml` (`openai-api-base` **brez** `/v1` + `model: openai/<id>`) + navodila za okoljske spremenljivke (`aider --message --yes`)                                                     |
| Qwen Code   | `omniroute setup-qwen`     | vnos V4 `modelProviders.openai` v `~/.qwen/settings.json` + `OMNIROUTE_API_KEY` v `~/.qwen/.env`                                                                                                 |

```bash
# OpenCode (ponudnik, združljiv z OpenAI, vsi modeli iz kataloga, oddaljeni VPS)
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute setup-opencode --only glm,kimi        # ohrani samo ujemajoče se modele
opencode -m omniroute/glm/glm-5.2 "..."          # najprej izvozite OMNIROUTE_API_KEY
```

> OpenCode ponuja tudi bogatejšo integracijo z **vtičnikom**: `omniroute setup opencode`
> (zdaj podpira oddaljene sisteme prek `--remote`) namesti `@omniroute/opencode-plugin`.
> `setup-opencode` je lahka alternativa, združljiva z OpenAI. Na ključ API
> se sklicuje prek `{env:OMNIROUTE_API_KEY}` — nikoli se ne zapiše na disk.
>
> V OpenCode v2 namesto tega uporabite `@omniroute/opencode-plugin-v2`: isti katalog,
> drugačna pogodba nalagalnika. Ko je integracija povezana, ključ prebere iz lastne shrambe
> poverilnic OpenCode, zato oddaljeni prehod sploh ne potrebuje ključa v
> `opencode.json`.

---

## Upravljanje kontekstov (preklapljanje med strežniki)

**Kontekst** je shranjen strežnik (baseUrl + poverilnica + obseg). `omniroute connect`
ga ustvari in nastavi kot aktivnega; od takrat je vsak ukaz usmerjen vanj. Kontekste
upravljajte in med njimi preklapljajte z `omniroute contexts`:

```bash
omniroute contexts list            # vsi konteksti; aktivni je označen z ●
omniroute contexts current         # aktivni strežnik, stanje preverjanja pristnosti, obseg
```

```text
  | Ime     | Osnovni URL               | Avtent. | Obseg | Opis
● | vps     | http://100.67.86.91:20128 | token   | admin | Oddaljeni OmniRoute (…)
  | default | http://localhost:20128    | ✗       |       |
```

**Preklapljanje med strežniki** — vsak naslednji ukaz uporablja aktivni kontekst:

```bash
omniroute contexts use vps         # → vsi ukazi so zdaj usmerjeni v oddaljeni VPS
omniroute tokens list              #   (izvede se proti VPS-u)

omniroute contexts use default     # → nazaj na localhost
omniroute tokens list              #   (izvede se proti lokalnemu strežniku)
```

**Ročno dodajanje konteksta** (namesto `connect`), pregled ali preimenovanje:

```bash
omniroute contexts add staging --url https://staging.example.com:20128 \
  --access-token oma_live_xxxx --scope write --description "staging box"
omniroute contexts show staging    # vse podrobnosti za en kontekst
omniroute contexts rename staging stg
```

**Odstranitev konteksta** — zahteva potrditev; podajte `--yes`, da jo preskočite
(obvezno za skripte/neinteraktivne lupine, ki sicer zaradi varnosti odstranitev zavrnejo):

```bash
omniroute contexts remove stg --yes
```

> Konteksta `default` (localhost) ni mogoče odstraniti. Ob odstranitvi aktivnega konteksta
> se uporabi `default`. Namig: odstranitev konteksta izbriše samo **lokalno** shranjeno poverilnico —
> žeton prekličite na strežniku z `omniroute tokens revoke <id>`, da dejansko
> onemogočite dostop.

**Izvoz/uvoz** kontekstov (npr. za prenos med napravami). Za nove kontekste se trajno
shrani samo sklic na sistemsko shrambo ključev; ko je sistemska shramba ključev na voljo,
se poverilnice ne kopirajo v izvoženo datoteko:

```bash
omniroute contexts export --out contexts.json     # privzeto: standardni izhod
omniroute contexts import contexts.json            # prepiši; --merge za ohranitev obstoječih
omniroute contexts migrate --yes                  # premakni stare žetone v navadnem besedilu v shrambo ključev
```

V sistemih brez grafičnega vmesnika, kjer uporabna sistemska shramba ključev ni na voljo, CLI uporabi
`config.json` z načinom `0600` in prikaže enkratno opozorilo. Izvožene datoteke iz
tega nadomestnega načina (in vse stare konfiguracije pred migracijo) obravnavajte kot zaupno gradivo.

---

## Hiter celovit preizkus

Življenjski cikel, ki ga lahko kopirate in prilepite, za preverjanje oddaljene namestitve od začetka — povežite se, ustvarite
žeton z določenim obsegom, usmerite ukaz, preklopite nazaj in odstranite nastavitev. Zamenjajte
`192.168.0.15` z gostiteljem/naslovom IP svojega strežnika (Tailscale, LAN ali javni
URL `https://…`).

```bash
# 1. Povezava (geslo → skrbniški žeton, shranjen kot kontekst, ki postane aktiven)
omniroute connect 192.168.0.15                 # ali: --key oma_live_xxxx  (brez gesla)
omniroute contexts current                     # prikaže oddaljeni strežnik + obseg

# 2. Uporaba — upravljalni ukazi se zdaj izvajajo proti oddaljenemu strežniku
omniroute tokens create --name laptop --scope read   # ustvari žeton z ožjim obsegom
omniroute tokens list                                 # prikrit seznam iz oddaljenega strežnika

# 3. Preklapljanje sem in tja
omniroute contexts use default                 # → lokalno
omniroute contexts use 192-168-0-15            # → znova oddaljeno (ime iz `contexts list`)

# 4. Odstranitev. OPOMBA: `contexts remove` izbriše samo LOKALNO poverilnico —
#    žetona na strežniku NE prekliče. Če želite dejansko
#    onemogočiti dostop, ga najprej prekličite na strežniku.
omniroute tokens revoke <id|prefix>            # onemogoči dostop na strežniku
omniroute contexts remove 192-168-0-15 --yes   # odstrani lokalni kontekst (tudi če je aktiven → uporabi se default), brez poziva
```

> Z možnostjo `--yes` postane `contexts remove` neinteraktiven (obvezno v skriptah/CI; brez
> nje neinteraktivna lupina zaradi varnosti zavrne odstranitev, namesto da bi obstala). Ob odstranitvi
> **aktivnega** konteksta se samodejno uporabi `default`.

---

## Varnostne opombe

- Žeton v nešifrirani obliki je prikazan enkrat; trajno se shrani samo zgoščena vrednost SHA-256 (enako kot pri ključih API).
- `omniroute connect` ponovno uporabi zaklepanje ob poskusih prijave z grobo silo in beleženje revizijske sledi.
- Za prenos dajte prednost protokolu HTTPS ali omrežju Tailnet; pri navedbi zgolj gostitelja je zaradi priročnosti v omrežju LAN/Tailscale privzeto uporabljen `http://` — za TLS podajte celoten URL `https://…`.
- Prednostna lokalna datoteka konteksta je `~/.omniroute/config.json` (`chmod 600`), ki vsebuje samo `credentialRef`; sam žeton je shranjen v sistemski shrambi poverilnic (`keytar`) in se nikoli ne izpisuje v dnevnike. Namestitve brez grafičnega vmesnika in brez delujoče izvorne shrambe poverilnic kot izrecno nadomestno možnost uporabljajo isto datoteko z dovoljenji `0600` ter enkrat prikažejo opozorilo. Po namestitvi zalednega sistema shrambe poverilnic uporabite `omniroute contexts migrate --yes`.

---

## Končne točke API (referenca)

| Metoda | Pot                   | Preverjanje pristnosti | Obseg                         |
| ------ | --------------------- | ---------------------- | ----------------------------- |
| POST   | `/api/cli/connect`    | geslo za upravljanje   | — (javno, zaščiteno z geslom) |
| GET    | `/api/cli/whoami`     | žeton za dostop        | branje                        |
| GET    | `/api/cli/tokens`     | žeton za dostop        | skrbništvo                    |
| POST   | `/api/cli/tokens`     | žeton za dostop        | skrbništvo                    |
| DELETE | `/api/cli/tokens/:id` | žeton za dostop        | skrbništvo                    |

Za celotne sheme glejte [openapi.yaml](../openapi.yaml).
