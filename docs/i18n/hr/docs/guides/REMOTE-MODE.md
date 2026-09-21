# Remote Mode (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/REMOTE-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/REMOTE-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/REMOTE-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/REMOTE-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/REMOTE-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/REMOTE-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/REMOTE-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/REMOTE-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/REMOTE-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/REMOTE-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/REMOTE-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/REMOTE-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/REMOTE-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/REMOTE-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/REMOTE-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/REMOTE-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/REMOTE-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/REMOTE-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/REMOTE-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/REMOTE-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/REMOTE-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/REMOTE-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/REMOTE-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/REMOTE-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/REMOTE-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/REMOTE-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/REMOTE-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/REMOTE-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/REMOTE-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/REMOTE-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/REMOTE-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/REMOTE-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/REMOTE-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/REMOTE-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/REMOTE-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/REMOTE-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/REMOTE-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/REMOTE-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/REMOTE-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/REMOTE-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/REMOTE-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/REMOTE-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/REMOTE-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/REMOTE-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/REMOTE-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/REMOTE-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/REMOTE-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/REMOTE-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/REMOTE-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/REMOTE-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/REMOTE-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/REMOTE-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/REMOTE-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/REMOTE-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/REMOTE-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/REMOTE-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/REMOTE-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/REMOTE-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/REMOTE-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/REMOTE-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/REMOTE-MODE.md)

---

Pokrenite CLI `omniroute` na svom prijenosnom računalu dok se sam OmniRoute izvršava negdje drugdje
(na VPS-u, kućnom poslužitelju ili drugom računalu na vašem Tailnetu). Jednom se prijavite pomoću
`omniroute connect`, a nakon toga **svaka** CLI naredba cilja taj udaljeni
poslužitelj — iste naredbe, isti izlaz, samo se izvršavaju na udaljenom poslužitelju.

Nema drugog alata koji treba instalirati: udaljeni način rada koristi uobičajeni CLI `omniroute`
uz **pristupne tokene** ograničenog opsega.

```bash
npm install -g omniroute                 # uobičajeni CLI
omniroute connect 192.168.0.15           # prijava (lozinka → token ograničenog opsega)
omniroute models list                    # ← sada prikazuje modele UDALJENOG poslužitelja
omniroute configure codex                # ← zapisuje lokalni Codex profil iz udaljenog kataloga
```

---

## Kako funkcionira

```
vaše prijenosno računalo                 udaljeni OmniRoute (VPS)
┌────────────────────┐                   ┌───────────────────────────────┐
│ omniroute CLI      │  POST /api/cli/connect  (lozinka → token)          │
│  kontekst: vps     │ ───────────────►  │ izdaje pristupni token         │
│  baseUrl, token    │  Authorization: Bearer oma_live_…                  │
│                    │ ───────────────►  │ svaka upravljačka ruta, uz     │
│ zapisuje konfigur. │ ◄───────────────  │ provjeru opsega tokena         │
│ LOKALNO            │                   └───────────────────────────────┘
└────────────────────┘
```

- **Konteksti** pohranjuju po jedan poslužitelj (`~/.omniroute/config.json`, `chmod 600`).
  `omniroute contexts use <name>` mijenja aktivni poslužitelj; `default` je lokalni.
- **Pristupni tokeni** (`oma_live_…`) autoriziraju upravljačke naredbe. Razlikuju se
  od API ključeva za inferenciju (`sk-…`, koji se koriste za `/v1/chat/completions`).
- Na strani poslužitelja pohranjuje se samo SHA-256 sažetak tokena. Token u običnom tekstu prikazuje se
  **jednom**, pri stvaranju.

---

## Povezivanje

### Pomoću upravljačke lozinke (početno postavljanje)

```bash
omniroute connect 192.168.0.15
# Upravljačka lozinka za http://192.168.0.15:20128: ********
# ✔ Povezano s http://192.168.0.15:20128 — kontekst '192.168.0.15' (opseg: admin)
```

Tok s lozinkom prema zadanim postavkama izdaje token opsega **admin** (budući da imate lozinku,
već imate potpunu kontrolu). Smanjite opseg pomoću `--scope`:

```bash
omniroute connect 192.168.0.15 --scope write
```

Opcije: `--port <p>` (kada glavno računalo nema naveden port), `--name <ctx>` (naziv konteksta),
`--scope read|write|admin`. Potpuni URL upotrebljava se bez izmjena:
`omniroute connect https://omni.example.com`.

### Pomoću unaprijed generiranog tokena

Generirajte token ograničenog opsega na nadzornoj ploči (ili pomoću `omniroute tokens create`) i
zalijepite ga — lozinka nije potrebna:

```bash
omniroute connect 192.168.0.15 --key oma_live_xxxxxxxx
```

CLI ga provjerava putem `GET /api/cli/whoami` i sprema kao aktivni kontekst.

---

## Opsezi

Tri hijerarhijske razine (`admin ⊃ write ⊃ read`):

| Opseg   | Omogućuje                                                                                    |
| ------- | -------------------------------------------------------------------------------------------- |
| `read`  | popis/pregled — `models list`, `providers status`, `logs`, `usage`, `cost`                   |
| `write` | čitanje **+** konfiguriranje/primjena — `setup-codex`, `keys add`, `config set`, kombinacije |
| `admin` | pisanje **+** upravljanje — CRUD za `tokens`, dodavanje pružatelja, usluge, pravila, oauth   |

Poslužitelj zaključuje potreban opseg za svaku rutu na temelju HTTP metode
(`GET`→čitanje, izmjene→pisanje) i popisa osjetljivih površina dopuštenih samo administratorima
(izmjene `/api/cli/tokens`, `/api/providers`, `/api/oauth`, `/api/services`, …).
Token nedovoljnog opsega dobiva odgovor `403` s jasnom porukom.

> Rute koje pokreću procese (`/api/services/*`, `/api/mcp/*`, …) ostaju
> dostupne **samo preko sučelja povratne petlje** — udaljeni token nikada im ne može pristupiti, bez obzira na opseg.

---

## Povezivanje Antigravityja na udaljenoj instalaciji

Antigravity koristi Googleov zaslon za pristanak firstparty/nativeapp. Google
objavljuje autorizacijski kod samo kada je **povratno preusmjeravanje na lokalnu petlju**
(`http://127.0.0.1:<port>/callback`) **dostupno iz preglednika koji
odobrava prijavu**. Na udaljenoj VPS instalaciji ta se lokalna petlja nalazi na
poslužitelju, a ne na vašem računalu, pa zaslon za pristanak **zauvijek ostaje visjeti i
nikad ne izdaje kod** — uobičajena zamjenska mogućnost „zalijepite URL povratnog poziva”
nema što zalijepiti. (To je ograničenje na Googleovoj strani: isto se blokiranje događa
u svakom proxyju koji koristi ugrađeni Antigravityjev klijent za stolna računala, a ne
samo u OmniRouteu.)

Nadzorna ploča to otkriva prije nego što zapnete: otvaranje stavke **Davatelji → Antigravity →
Poveži** s adrese koja nije localhost zamjenjuje generičku obavijest „kopirajte URL povratnog poziva”
dvama rješenjima u nastavku, pri čemu su vaš host i port već uneseni.
(Računa se i LAN adresa — `192.168.x.x` nije localhost kada je riječ o ovom povratnom
pozivu.)

Postoje dva podržana načina povezivanja Antigravityja s udaljenim OmniRouteom.

### Opcija A — lokalni pomoćnik za prijavu (preporučeno)

Pokrenite OAuth na **vlastitom računalu**, gdje je `127.0.0.1` dostupan. Pomoćnik
izravno komunicira s Googleom, pa se davanje pristanka dovršava ondje gdje verzija
s nadzorne ploče to ne može.

**Ako ste već povezani** (`omniroute connect <host>`), ne morate ništa
kopirati — pomoćnik će vjerodajnicu isporučiti toj instalaciji umjesto vas:

```bash
# Na vašem LOKALNOM računalu (potrebni su Node.js i preglednik):
omniroute connect 192.168.0.15        # jednom — stvara kontekstni token s administratorskim opsegom
npx omniroute login antigravity
#   ↳ otvara Googleov zaslon za pristanak, hvata povratni poziv na lokalnom portu lokalne petlje,
#     razmjenjuje ga i šalje vjerodajnicu aktivnom kontekstu putem POST zahtjeva:
#
#   Antigravity je povezan na http://192.168.0.15:20128 (veza abc123).
#   Ne morate ništa zalijepiti — možete zatvoriti ovaj terminal.
```

Slanje se odvija automatski kad god aktivni kontekst upućuje na drugo
računalo. Prisilno ga omogućite ili onemogućite s `--push` / `--no-push`, ili ciljajte određeni
kontekst s `--context <name>`.

**Ako vaše računalo ne može pristupiti VPS-u** (vatrozid, nema SSH-a, fizički izolirano radno mjesto),
pomoćnik i dalje radi — zapravo mu je _potreban_ samo Google. Upotrijebite `--no-push` ili jednostavno
dopustite da slanje ne uspije: tada će umjesto odbacivanja već dovršene autorizacije
ispisati blob.

```bash
npx omniroute login antigravity --no-push
#   omniroute-cred-v1.eyJ2IjoxLCJ...
```

Zatim na **udaljenoj** nadzornoj ploči otvorite **Davatelji → Antigravity → Poveži** i zalijepite
blob `omniroute-cred-v1.…` u polje **Korak 2** (prihvaća ili URL povratnog
poziva ili blob vjerodajnice). OmniRoute ga dekodira, izvršava uvođenje u Cloud Code
na strani poslužitelja i trajno pohranjuje vezu.

> Blob sadrži token za osvježavanje — postupajte s njim kao sa zaporkom. Pri izravnom slanju
> šalje se jednom putem autentificirane veze vašeg konteksta; pri ručnom lijepljenju šalje se
> putem veze s nadzornom pločom. U oba slučaja pohranjuje se šifriran, a nakon
> uspješnog slanja nikad se ne ispisuje u vašem terminalu.

Opcije: `--no-browser` (ispiši URL umjesto automatskog otvaranja), `--port <n>`
(fiksiraj port lokalne petlje), `--timeout <ms>`, `--push` / `--no-push` (nadjačaj
automatsku isporuku), `--context <name>` (ciljaj određeni kontekst).

### Opcija B — SSH tunel s lokalnim prosljeđivanjem

Ako imate SSH pristup VPS-u, proslijedite port nadzorne ploče tako da se
povratni poziv na lokalnu petlju kroz tunel ponovno usmjeri prema poslužitelju:

```bash
# Na vašem LOKALNOM računalu:
ssh -L 20128:127.0.0.1:20128 user@your-vps
# zatim otvorite http://localhost:20128 u LOKALNOM pregledniku i povežite Antigravity
# na uobičajen način — preusmjeravanje na 127.0.0.1:20128/callback sada putem SSH-a stiže do VPS-a.
```

Budući da nadzornoj ploči pristupate kao `localhost:20128`, Googleov postupak davanja
pristanka dovršava se, a povratni poziv isporučuje se poslužitelju kroz isti tunel —
blob nije potreban. Držite tunel otvorenim dok se veza ne prikaže kao aktivna.

Za razliku od davatelja s fiksnom lokalnom petljom u nastavku, ovdje je **dovoljno jedno prosljeđivanje**:
Antigravityjev povratni poziv koristi sam port nadzorne ploče, pa nema drugog
porta specifičnog za davatelja koji bi trebalo tunelirati.

> Potpuno bezglava alternativa (bez pomoćnika i bez tunela) jest konfiguriranje **vlastitih**
> Google OAuth vjerodajnica za web i javnog osnovnog URL-a; pogledajte OAuth
> varijable okruženja davatelja. Za dvije prethodno navedene opcije nije potrebna dodatna konfiguracija Googlea.

---

## Povezivanje Codexa / Groka na udaljenoj instalaciji (pružatelji s fiksnom povratnom adresom sučelja petlje)

Codex, xAI (`xai-oauth`) i Grok CLI (`grok-cli`) registriraju **fiksni** `redirect_uri`
sučelja petlje u svojoj vanjskoj OAuth aplikaciji. OmniRoute ga ne može promijeniti —
pružatelj uvijek preusmjerava preglednik natrag na istu, unaprijed zadanu adresu:

| Pružatelj   | Fiksna povratna adresa na koju pružatelj preusmjerava |
| ----------- | ----------------------------------------------------- |
| `codex`     | `http://localhost:1455/auth/callback`                 |
| `xai-oauth` | `http://127.0.0.1:56121/callback`                     |
| `grok-cli`  | `http://127.0.0.1:56122/callback`                     |

`localhost` ovdje znači **računalo na kojem je pokrenut preglednik**, dok OmniRouteov
PKCE poslužitelj za povratni poziv sluša na sučelju petlje **poslužitelja**. Ako otvorite
nadzornu ploču na LAN adresi poput `http://192.168.0.15:20128`, te se dvije strane
nikada neće povezati: autorizacijski kôd isporučuje se na `localhost:1455` vašeg
prijenosnog računala, gdje ništa ne sluša, pa pružatelj ne uspijeva dovršiti prijavu
bez prikazivanja pogreške.

Nadzorna ploča to otkriva prije otvaranja skočnog prozora i prikazuje naredbu za
tunel umjesto da dopusti tihi neuspjeh prijave (#8046).

### Rješenje — proslijedite **oba** priključka

```bash
# Na računalu na kojem je pokrenut PREGLEDNIK:
ssh -L 20128:127.0.0.1:20128 -L 1455:127.0.0.1:1455 <user>@192.168.0.15
# zatim otvorite http://localhost:20128 i odande povežite Codex
```

Potrebna su dva prosljeđivanja, a prosljeđivanje samo jednog i dalje ne uspijeva:

- **`20128`** (priključak nadzorne ploče) čini ishodište stvarnim lokalnim hostom,
  zbog čega OmniRoute uopće pokreće PKCE poslužitelj za povratni poziv — LAN
  ishodište nikada ne dolazi do te grane.
- **`1455`** (fiksni priključak pružatelja za povratni poziv) mjesto je na koje se
  preglednik vraća; mora se tunelirati do sučelja petlje poslužitelja.

Zamijenite `1455` s `56121`/`56122` pri povezivanju s xAI-jem ili Grok CLI-jem,
a `20128` svojim stvarnim priključkom nadzorne ploče. Držite tunel otvorenim dok se
veza ne prikaže kao aktivna.

> **Nemate SSH pristup?** Codex i Grok CLI prihvaćaju i zalijepljeni token — kartica
> **Zalijepi API ključ** / **Uvezi auth.json** u dijaloškom okviru za povezivanje.
> Taj postupak nema povratni poziv prema sučelju petlje, pa radi s bilo kojeg
> ishodišta. Codex dodatno prihvaća samostalni pristupni token ili podatke sesije iz
> `~/.codex/auth.json`.

---

## Upravljanje tokenima

```bash
omniroute tokens create --name "laptop" --scope write [--expires 30]
#   ↳ ispisuje tajnu SAMO JEDNOM — kopirajte je odmah
omniroute tokens list                 # maskirano: ID, naziv, opseg, prefiks, status, istek
omniroute tokens revoke <id|prefix>   # odmah opozovite
omniroute tokens scopes               # objašnjava tri opsega
```

Naredbe `tokens` zahtijevaju vjerodajnicu **administratora**. Tokenima možete
upravljati i na nadzornoj ploči u odjeljku **Postavke → Pristupni tokeni**
(stvaranje, opozivanje, jednokratno kopiranje).

---

## Konfiguriranje CLI-ja za programiranje iz udaljenog kataloga

`omniroute configure` čita aktualni katalog modela **aktivnog poslužitelja** i
zapisuje konfiguraciju na **vaše** računalo.

```bash
omniroute configure codex
#   Pružatelji: glm, kmc, ollamacloud, opencode-go, …
#   Pružatelj: glm
#   ID modela: glm/glm-5.2
#   ✔ Zapisano ~/.codex/glm52.config.toml
#   Upotrijebite:  codex --profile glm52

# neinteraktivno
omniroute configure codex --provider glm --model glm/glm-5.2 --name glm52

# zadržite često korišten model na vrhu interaktivnog birača
omniroute configure codex --provider glm --model glm/glm-5.2 --favorite --yes
```

Birač u lokalnoj datoteci `model-preferences.json` čuva samo ID-ove modela
(nikada URL-ove ili vjerodajnice), razvrstane prema kontekstu i ciljnom CLI-ju.
Favoriti se prikazuju prije nedavnih odabira; upotrijebite `--unfavorite` kako
biste uklonili odabrani model s popisa za taj kontekst/cilj.

Zapisani profil referencira ključ za izvođenje zaključivanja putem varijable
okruženja (`OMNIROUTE_API_KEY`) — tajna se nikada ne zapisuje na disk. Za
jednokratno osnovno postavljanje Codexa (blok `[model_providers.omniroute]`)
pogledajte [CODEX-CLI-CONFIGURATION.md](./CODEX-CLI-CONFIGURATION.md).

### Pokretanje CLI-ja prema udaljenom poslužitelju (bez zapisivanja konfiguracije)

`omniroute run <target>` također poštuje aktivni kontekst: udaljeni osnovni URL
i vjerodajnica konteksta umeću se samo u pokrenuti proces.

```bash
omniroute connect 192.168.0.15
omniroute run claude   --model openai/gpt-5.4          # Claude Code → udaljeni poslužitelj
omniroute run gemini   --model glm/glm-5.2 -- --skip-trust -p "hello"
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"

# Pregledajte točno što bi se pokrenulo (samo NAZIVI KLJUČEVA varijabli okruženja, nikada vrijednosti):
omniroute run codex --dry-run --json
```

Ciljevi: `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen`, `gemini`
(jedinstveni izvor: `bin/cli/cli-manifest.mjs`). Qwen i Gemini pokreću se s
privremenim izoliranim matičnim direktorijem koji se uklanja pri izlasku, pa
pokretanje nikada ne mijenja vašu osobnu konfiguraciju alata — niti u nju
propušta podatke.

### Naredbe za postavljanje pojedinačnih CLI-jeva

Svaki podržani CLI ima naredbu za postavljanje prilagođenu udaljenom poslužitelju
(sve poštuju aktivni kontekst ili `--remote <url> --api-key <key>`):

| CLI         | Naredba                    | Što zapisuje                                                                                                                                                                                             |
| ----------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Codex       | `omniroute setup-codex`    | profile `~/.codex/<name>.config.toml` (po modelu)                                                                                                                                                        |
| Claude Code | `omniroute setup-claude`   | `~/.claude/profiles/<name>/settings.json` (po modelu)                                                                                                                                                    |
| OpenCode    | `omniroute setup-opencode` | `~/.config/opencode/opencode.json` — pružatelj `omniroute` kompatibilan s OpenAI-jem sa svim modelima iz kataloga (pokrenite `opencode -m omniroute/<model>`)                                            |
| Cline       | `omniroute setup-cline`    | `~/.cline/data/{globalState,secrets}.json` (CLI način rada) + ispisuje postavke proširenja za VS Code koje treba zalijepiti (kompatibilno s OpenAI-jem, osnovni URL **bez** `/v1`)                       |
| Kilo Code   | `omniroute setup-kilo`     | `~/.local/share/kilo/auth.json` (CLI) + postavke `kilocode.*` za VS Code — kompatibilno s OpenAI-jem, osnovni URL **s** `/v1`                                                                            |
| Continue    | `omniroute setup-continue` | `~/.continue/config.yaml` (VS Code/JetBrains + `cn` CLI) — `provider: openai`, `apiBase` **s** `/v1`, ključ putem `${{ secrets.OMNIROUTE_API_KEY }}`                                                     |
| Cursor      | `omniroute setup-cursor`   | ispisuje korake unutar aplikacije (Postavke → Modeli → nadjačajte osnovni URL za OpenAI **s** `/v1` + ključ + model). Cursorova konfiguracija neprozirna je SQLite baza — samo ploča za razgovor         |
| Roo Code    | `omniroute setup-roo`      | zapisuje Roo JSON za uvoz (`~/.omniroute/roo-settings.json`) + postavlja `roo-cline.autoImportSettingsPath` + ispisuje korake u korisničkom sučelju (kompatibilno s OpenAI-jem, osnovni URL **s** `/v1`) |
| Crush       | `omniroute setup-crush`    | `~/.config/crush/crush.json` — pružatelj `openai-compat`, `base_url` **s** `/v1`, ključ putem `$OMNIROUTE_API_KEY`                                                                                       |
| Goose       | `omniroute setup-goose`    | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER=openai` + `OPENAI_HOST` **bez** `/v1` + `GOOSE_MODEL`) + upute za varijable okruženja                                                                     |
| Aider       | `omniroute setup-aider`    | `~/.aider.conf.yml` (`openai-api-base` **bez** `/v1` + `model: openai/<id>`) + upute za varijable okruženja (`aider --message --yes`)                                                                    |
| Qwen Code   | `omniroute setup-qwen`     | unos V4 `modelProviders.openai` u `~/.qwen/settings.json` + `OMNIROUTE_API_KEY` u `~/.qwen/.env`                                                                                                         |

```bash
# OpenCode (pružatelj kompatibilan s OpenAI-jem, svi modeli iz kataloga, udaljeni VPS)
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute setup-opencode --only glm,kimi        # zadrži samo modele koji se podudaraju
opencode -m omniroute/glm/glm-5.2 "..."          # najprije izvezi OMNIROUTE_API_KEY
```

> OpenCode također ima bogatiju integraciju putem **dodatka**: `omniroute setup opencode`
> (sada podržava udaljene sustave putem `--remote`) instalira `@omniroute/opencode-plugin`.
> `setup-opencode` je lagana alternativa kompatibilna s OpenAI-jem. Na API ključ
> upućuje se putem `{env:OMNIROUTE_API_KEY}` — nikada se ne zapisuje na disk.
>
> Na OpenCodeu v2 umjesto toga upotrijebite `@omniroute/opencode-plugin-v2`: isti katalog,
> drukčiji ugovor učitavača. Ključ čita iz OpenCodeova vlastitog spremišta vjerodajnica
> kada je integracija povezana, pa udaljeni pristupnik uopće ne treba ključ u
> `opencode.json`.

---

## Upravljanje kontekstima (prebacivanje između poslužitelja)

**Kontekst** je spremljeni poslužitelj (baseUrl + vjerodajnica + opseg). `omniroute connect`
stvara kontekst i čini ga aktivnim; od tada je svaka naredba usmjerena na njega. Upravljajte
kontekstima i prebacujte se između njih pomoću `omniroute contexts`:

```bash
omniroute contexts list            # svi konteksti; aktivni je označen s ●
omniroute contexts current         # aktivni poslužitelj, status autentifikacije, opseg
```

```text
  | Naziv   | Osnovni URL               | Autent. | Opseg | Opis
● | vps     | http://100.67.86.91:20128 | token   | admin | Udaljeni OmniRoute (…)
  | default | http://localhost:20128    | ✗       |       |
```

**Prebacivanje između poslužitelja** — svaka sljedeća naredba koristi aktivni kontekst:

```bash
omniroute contexts use vps         # → sve naredbe sada pristupaju udaljenom VPS-u
omniroute tokens list              #   (izvršava se na VPS-u)

omniroute contexts use default     # → povratak na localhost
omniroute tokens list              #   (izvršava se na lokalnom poslužitelju)
```

**Ručno dodavanje konteksta** (umjesto naredbe `connect`), pregledavanje ili preimenovanje:

```bash
omniroute contexts add staging --url https://staging.example.com:20128 \
  --access-token oma_live_xxxx --scope write --description "staging box"
omniroute contexts show staging    # potpuni detalji za jedan kontekst
omniroute contexts rename staging stg
```

**Uklanjanje konteksta** — traži potvrdu; navedite `--yes` kako biste je preskočili
(obavezno za skripte / neinteraktivne ljuske, koje inače sigurno odbijaju radnju):

```bash
omniroute contexts remove stg --yes
```

> `default` (localhost) nije moguće ukloniti. Uklanjanjem aktivnog konteksta automatski
> se prelazi na `default`. Savjet: uklanjanjem konteksta briše se samo **lokalno**
> spremljena vjerodajnica — opozovite token na poslužitelju naredbom
> `omniroute tokens revoke <id>` kako biste doista onemogućili pristup.

**Izvoz / uvoz** konteksta (npr. radi premještanja između računala). Za nove kontekste
sprema se samo referenca na privjesak ključeva; vjerodajnice se ne kopiraju u izvoz kada
je dostupan privjesak ključeva operacijskog sustava:

```bash
omniroute contexts export --out contexts.json     # zadano: stdout
omniroute contexts import contexts.json            # prebrisivanje; --merge za zadržavanje postojećih
omniroute contexts migrate --yes                  # premještanje naslijeđenih tokena u običnom tekstu u privjesak ključeva
```

Na sustavima bez grafičkog sučelja i bez upotrebljivog privjeska ključeva operacijskog
sustava, CLI kao pričuvnu mogućnost koristi `config.json` s načinom rada `0600` i
prikazuje jednokratno upozorenje. Izvoze nastale tom pričuvnom metodom (kao i sve
naslijeđene konfiguracije prije migracije) smatrajte tajnim materijalom.

---

## Brza sveobuhvatna provjera

Životni ciklus koji možete kopirati i zalijepiti kako biste od početka provjerili udaljeno
postavljanje — povezivanje, stvaranje tokena ograničenog opsega, usmjeravanje naredbe,
povratak i uklanjanje postavki. Zamijenite `192.168.0.15` nazivom/IP adresom svojeg
poslužitelja (Tailscale, LAN ili javni `https://…` URL).

```bash
# 1. Povezivanje (lozinka → administratorski token, spremljen kao kontekst koji postaje aktivan)
omniroute connect 192.168.0.15                 # ili: --key oma_live_xxxx  (bez lozinke)
omniroute contexts current                     # prikazuje udaljeni poslužitelj + opseg

# 2. Upotreba — naredbe za upravljanje sada se izvršavaju na udaljenom poslužitelju
omniroute tokens create --name laptop --scope read   # stvara token užeg opsega
omniroute tokens list                                 # maskirani popis s udaljenog poslužitelja

# 3. Prebacivanje između njih
omniroute contexts use default                 # → lokalno
omniroute contexts use 192-168-0-15            # → ponovno udaljeno (naziv iz `contexts list`)

# 4. Uklanjanje postavki. NAPOMENA: `contexts remove` briše samo LOKALNU vjerodajnicu —
#    NE opoziva token na poslužitelju. Ako želite doista onemogućiti pristup,
#    najprije opozovite token na poslužitelju.
omniroute tokens revoke <id|prefix>            # onemogućuje pristup na poslužitelju
omniroute contexts remove 192-168-0-15 --yes   # uklanja lokalni kontekst (čak i ako je aktivan → vraća se na default), bez upita
```

> `--yes` čini `contexts remove` neinteraktivnom naredbom (obavezno u skriptama/CI-ju;
> bez toga neinteraktivna ljuska sigurno odbija radnju umjesto da se zaglavi).
> Uklanjanjem **aktivnog** konteksta automatski se prelazi na `default`.

---

## Sigurnosne napomene

- Token u čitljivom obliku prikazuje se samo jednom; pohranjuje se samo SHA-256 sažetak (isto kao za API ključeve).
- `omniroute connect` ponovno koristi zaključavanje nakon pokušaja pogađanja prijave + zapisivanje nadzornog dnevnika.
- Za prijenos koristite HTTPS ili Tailnet; za samostalni naziv poslužitelja zadano se koristi `http://`
  radi praktičnosti na LAN-u/Tailscaleu — za TLS navedite puni `https://…` URL.
- Preporučena lokalna datoteka konteksta jest `~/.omniroute/config.json` (`chmod 600`)
  i sadržava samo `credentialRef`; sam token pohranjuje se u spremištu vjerodajnica
  operacijskog sustava (`keytar`) i nikada se ne ispisuje u zapisnike. Instalacije bez korisničkog sučelja i bez
  funkcionalnog izvornog spremišta vjerodajnica koriste istu datoteku s dopuštenjima `0600` kao izričitu pričuvnu opciju i
  jednom prikazuju upozorenje. Nakon instaliranja pozadinskog sustava spremišta vjerodajnica upotrijebite
  `omniroute contexts migrate --yes`.

---

## Krajnje točke API-ja (referenca)

| Metoda | Ruta                  | Autentifikacija        | Opseg                         |
| ------ | --------------------- | ---------------------- | ----------------------------- |
| POST   | `/api/cli/connect`    | lozinka za upravljanje | — (javno, zaštićeno lozinkom) |
| GET    | `/api/cli/whoami`     | pristupni token        | čitanje                       |
| GET    | `/api/cli/tokens`     | pristupni token        | administracija                |
| POST   | `/api/cli/tokens`     | pristupni token        | administracija                |
| DELETE | `/api/cli/tokens/:id` | pristupni token        | administracija                |

Potpune sheme potražite u datoteci [openapi.yaml](../openapi.yaml).
