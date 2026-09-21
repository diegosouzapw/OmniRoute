# Remote Mode (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/REMOTE-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/REMOTE-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/REMOTE-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/REMOTE-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/REMOTE-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/REMOTE-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/REMOTE-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/REMOTE-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/REMOTE-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/REMOTE-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/REMOTE-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/REMOTE-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/REMOTE-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/REMOTE-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/REMOTE-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/REMOTE-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/REMOTE-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/REMOTE-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/REMOTE-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/REMOTE-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/REMOTE-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/REMOTE-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/REMOTE-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/REMOTE-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/REMOTE-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/REMOTE-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/REMOTE-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/REMOTE-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/REMOTE-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/REMOTE-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/REMOTE-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/REMOTE-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/REMOTE-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/REMOTE-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/REMOTE-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/REMOTE-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/REMOTE-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/REMOTE-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/REMOTE-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/REMOTE-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/REMOTE-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/REMOTE-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/REMOTE-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/REMOTE-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/REMOTE-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/REMOTE-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/REMOTE-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/REMOTE-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/REMOTE-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/REMOTE-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/REMOTE-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/REMOTE-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/REMOTE-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/REMOTE-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/REMOTE-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/REMOTE-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/REMOTE-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/REMOTE-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/REMOTE-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/REMOTE-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/REMOTE-MODE.md)

---

Rulați CLI-ul `omniroute` pe laptopul dvs., în timp ce OmniRoute rulează în altă parte
(un VPS, un server de acasă, o altă mașină din Tailnet-ul dvs.). Vă autentificați o singură dată cu
`omniroute connect`, iar de atunci **fiecare** comandă CLI vizează serverul
la distanță — aceleași comenzi, același rezultat, doar că sunt executate pe serverul la distanță.

Nu există un al doilea instrument de instalat: modul la distanță folosește CLI-ul `omniroute`
obișnuit plus **tokenuri de acces** cu domeniu de aplicare.

```bash
npm install -g omniroute                 # CLI-ul obișnuit
omniroute connect 192.168.0.15           # autentificare (parolă → token cu domeniu de aplicare)
omniroute models list                    # ← listează acum modelele serverului LA DISTANȚĂ
omniroute configure codex                # ← scrie un profil Codex local din catalogul de la distanță
```

---

## Cum funcționează

```
laptopul dvs.                            OmniRoute la distanță (VPS)
┌────────────────────┐                   ┌───────────────────────────────┐
│ CLI omniroute      │  POST /api/cli/connect  (parolă → token)           │
│  context: vps      │ ───────────────►  │ emite un token de acces cu     │
│  baseUrl, token    │  Authorization: Bearer oma_live_…                  │
│                    │ ───────────────►  │ domeniu de aplicare; fiecare   │
│ scrie configurații │ ◄───────────────  │ rută este verificată conform  │
│ LOCAL              │                   │ domeniului tokenului           │
└────────────────────┘                   └───────────────────────────────┘
```

- **Contextele** stochează câte un server fiecare (`~/.omniroute/config.json`, `chmod 600`).
  `omniroute contexts use <name>` schimbă serverul activ; `default` este local.
- **Tokenurile de acces** (`oma_live_…`) autorizează comenzile de administrare. Acestea sunt
  distincte de cheile API pentru inferență (`sk-…`, utilizate pentru `/v1/chat/completions`).
- Pe server este stocat doar hash-ul SHA-256 al unui token. Textul în clar este afișat
  **o singură dată**, la creare.

---

## Conectarea

### Cu parola de administrare (inițializare)

```bash
omniroute connect 192.168.0.15
# Parola de administrare pentru http://192.168.0.15:20128: ********
# ✔ Conectat la http://192.168.0.15:20128 — contextul '192.168.0.15' (domeniu: admin)
```

Fluxul bazat pe parolă emite implicit un token **admin** (dețineți parola, deci
aveți deja control deplin). Restrângeți domeniul cu `--scope`:

```bash
omniroute connect 192.168.0.15 --scope write
```

Opțiuni: `--port <p>` (când gazda nu include niciun port), `--name <ctx>` (numele contextului),
`--scope read|write|admin`. Un URL complet este utilizat ca atare:
`omniroute connect https://omni.example.com`.

### Cu un token generat în prealabil

Generați un token cu domeniu de aplicare în panoul de control (sau cu `omniroute tokens create`) și
inserați-l — nu este necesară nicio parolă:

```bash
omniroute connect 192.168.0.15 --key oma_live_xxxxxxxx
```

CLI-ul îl validează prin `GET /api/cli/whoami` și îl salvează drept context activ.

---

## Domenii de aplicare

Trei niveluri, ierarhice (`admin ⊃ write ⊃ read`):

| Domeniu | Acțiuni permise                                                                                               |
| ------- | ------------------------------------------------------------------------------------------------------------- |
| `read`  | listare/inspectare — `models list`, `providers status`, `logs`, `usage`, `cost`                               |
| `write` | citire **+** configurare/aplicare — `setup-codex`, `keys add`, `config set`, combinații                       |
| `admin` | scriere **+** administrare — operații CRUD pentru `tokens`, adăugarea furnizorilor, servicii, politici, oauth |

Serverul deduce domeniul necesar fiecărei rute din metoda HTTP
(`GET`→citire, mutații→scriere), împreună cu o listă de permisiuni administrative pentru zonele sensibile
(mutații pentru `/api/cli/tokens`, `/api/providers`, `/api/oauth`, `/api/services`, …).
Un token cu un domeniu insuficient primește răspunsul `403` cu un mesaj clar.

> Rutele care pornesc procese (`/api/services/*`, `/api/mcp/*`, …) rămân
> accesibile **doar prin loopback** — un token la distanță nu le poate accesa niciodată, indiferent de domeniul său.

## Conectarea Antigravity la o instalare la distanță

Antigravity utilizează ecranul de consimțământ firstparty/nativeapp de la Google. Google
eliberează codul de autorizare numai atunci când **redirecționarea loopback**
(`http://127.0.0.1:<port>/callback`) este **accesibilă din browserul care
aprobă autentificarea**. În cazul unei instalări pe un VPS la distanță, acel loopback se află pe
server, nu pe computerul dvs., astfel încât ecranul de consimțământ **rămâne blocat la nesfârșit și nu
emite niciodată un cod** — mecanismul alternativ obișnuit „lipiți URL-ul de callback” nu are nimic de
lipit. (Aceasta este o restricție impusă de Google: aceeași blocare apare în orice proxy
care utilizează clientul desktop Antigravity inclus, nu doar în OmniRoute.)

Panoul de control detectează această situație înainte să rămâneți blocat: deschiderea **Providers → Antigravity →
Connect** de la o adresă care nu este localhost înlocuiește mesajul generic „copiați URL-ul de callback”
cu cele două soluții de mai jos, fiecare având deja completate gazda și portul dvs.
(Și o adresă LAN se califică — `192.168.x.x` nu este localhost în ceea ce privește acest callback.)

Există două modalități acceptate de a conecta Antigravity la un OmniRoute aflat la distanță.

### Opțiunea A — utilitar local de autentificare (recomandat)

Rulați OAuth pe **propriul computer**, unde `127.0.0.1` este accesibil. Utilitarul
comunică direct cu Google, astfel încât procesul de consimțământ se finalizează acolo unde versiunea din panoul de control
nu poate.

**Dacă sunteți deja conectat** (`omniroute connect <host>`), nu trebuie să
copiați nimic — utilitarul transmite automat acreditarea către instalarea respectivă:

```bash
# Pe computerul dvs. LOCAL (necesită Node.js + un browser):
omniroute connect 192.168.0.15        # o singură dată — generează un token de context cu privilegii de administrator
npx omniroute login antigravity
#   ↳ deschide ecranul de consimțământ Google, captează callback-ul pe un port loopback local,
#     îl schimbă și trimite acreditarea prin POST către contextul activ:
#
#   Antigravity conectat la http://192.168.0.15:20128 (conexiunea abc123).
#   Nu trebuie să lipiți nimic — puteți închide acest terminal.
```

Transmiterea are loc automat ori de câte ori contextul activ indică spre un alt
computer. Forțați oricare dintre comportamente cu `--push` / `--no-push` sau vizați un anumit
context cu `--context <name>`.

**Dacă computerul dvs. nu poate accesa VPS-ul** (blocat de firewall, fără SSH, stație izolată fizic), utilitarul
funcționează în continuare — acesta _are nevoie_ doar de Google. Utilizați `--no-push` sau permiteți pur și simplu ca
transmiterea să eșueze: utilitarul va afișa blob-ul în loc să elimine o
autorizare pe care ați finalizat-o deja.

```bash
npx omniroute login antigravity --no-push
#   omniroute-cred-v1.eyJ2IjoxLCJ...
```

Apoi, în panoul de control **la distanță**: **Providers → Antigravity → Connect**, lipiți
blob-ul `omniroute-cred-v1.…` în câmpul **Step 2** (acesta acceptă fie un
URL de callback, fie un blob de acreditare). OmniRoute îl decodifică, execută integrarea inițială Cloud Code
pe server și salvează conexiunea.

> Blob-ul conține un token de reîmprospătare — tratați-l ca pe o parolă. În cazul transmiterii automate, acesta
> este trimis o singură dată prin conexiunea autentificată a contextului dvs.; în cazul lipirii, prin
> conexiunea panoului de control. În ambele cazuri, este stocat criptat, iar o
> transmitere reușită nu îl afișează niciodată în terminal.

Opțiuni: `--no-browser` (afișează URL-ul în loc să îl deschidă automat), `--port <n>`
(fixează portul loopback), `--timeout <ms>`, `--push` / `--no-push` (suprascriu
livrarea automată), `--context <name>` (vizează un anumit context).

### Opțiunea B — tunel SSH cu redirecționare locală

Dacă aveți acces SSH la VPS, redirecționați portul panoului de control astfel încât
callback-ul loopback să ajungă înapoi la server prin tunel:

```bash
# Pe computerul dvs. LOCAL:
ssh -L 20128:127.0.0.1:20128 user@your-vps
# apoi deschideți http://localhost:20128 în browserul dvs. LOCAL și conectați Antigravity
# în mod normal — redirecționarea 127.0.0.1:20128/callback ajunge acum la VPS prin SSH.
```

Deoarece accesați panoul de control ca `localhost:20128`, procesul de consimțământ Google
se finalizează, iar callback-ul este transmis serverului prin același tunel —
nu este necesar niciun blob. Păstrați tunelul deschis până când conexiunea apare ca activă.

Spre deosebire de furnizorii cu loopback fix de mai jos, **o singură redirecționare este suficientă** aici:
callback-ul Antigravity utilizează chiar portul panoului de control, astfel încât nu există un al doilea
port specific furnizorului care să trebuiască redirecționat prin tunel.

> O alternativă complet headless (fără utilitar, fără tunel) este să configurați **propriile**
> acreditări web Google OAuth + un URL de bază public; consultați variabilele de mediu OAuth
> ale furnizorului. Cele două opțiuni de mai sus nu necesită nicio configurare Google suplimentară.

---

## Conectarea Codex / Grok la o instalare la distanță (furnizori cu loopback fix)

Codex, xAI (`xai-oauth`) și Grok CLI (`grok-cli`) înregistrează un **`redirect_uri` fix** de loopback
în aplicația OAuth din amonte. OmniRoute nu îl poate modifica — furnizorul
trimite întotdeauna browserul înapoi la aceeași adresă codificată direct:

| Furnizor    | Callback fix către care redirecționează furnizorul |
| ----------- | -------------------------------------------------- |
| `codex`     | `http://localhost:1455/auth/callback`              |
| `xai-oauth` | `http://127.0.0.1:56121/callback`                  |
| `grok-cli`  | `http://127.0.0.1:56122/callback`                  |

Acolo, `localhost` înseamnă **mașina pe care rulează browserul**, în timp ce serverul
de callback PKCE al OmniRoute ascultă pe interfața de loopback a **serverului**. Dacă deschideți panoul de control la o
adresă LAN precum `http://192.168.0.15:20128`, cele două nu se întâlnesc niciodată: codul de autorizare
este livrat către `localhost:1455` al propriului laptop, unde nu ascultă nimic,
iar furnizorul nu reușește să finalizeze autentificarea fără să afișeze vreo eroare.

Panoul de control detectează această situație înainte de a deschide fereastra pop-up și afișează comanda pentru tunel
în loc să permită autentificării să eșueze fără niciun mesaj (#8046).

### Remediere — redirecționați **ambele** porturi

```bash
# Pe mașina pe care rulează BROWSERUL:
ssh -L 20128:127.0.0.1:20128 -L 1455:127.0.0.1:1455 <user>@192.168.0.15
# apoi accesați http://localhost:20128 și conectați Codex de acolo
```

Sunt necesare două redirecționări, iar redirecționarea doar a uneia tot va eșua:

- **`20128`** (portul panoului de control) face ca originea să fie cu adevărat localhost, ceea ce
  determină OmniRoute să pornească serverul de callback PKCE — o origine LAN nu
  ajunge niciodată la acea ramură.
- **`1455`** (portul de callback fix al furnizorului) este locul către care este trimis înapoi browserul;
  acesta trebuie să treacă prin tunel până la interfața de loopback a serverului.

Înlocuiți `1455` cu `56121`/`56122` atunci când conectați xAI sau Grok CLI și `20128` cu
portul real al panoului de control. Păstrați tunelul deschis până când conexiunea apare ca
activă.

> **Nu aveți acces SSH?** Codex și Grok CLI acceptă și un token lipit — fila **Lipiți cheia API
> ** / **Importați auth.json** din dialogul de conectare. Această metodă nu are callback de loopback,
> deci funcționează de la orice origine. În plus, Codex acceptă un token de acces simplu
> sau un blob de sesiune `~/.codex/auth.json`.

---

## Gestionarea tokenurilor

```bash
omniroute tokens create --name "laptop" --scope write [--expires 30]
#   ↳ afișează secretul O SINGURĂ DATĂ — copiați-l acum
omniroute tokens list                 # mascat: id, nume, domeniu, prefix, stare, expirare
omniroute tokens revoke <id|prefix>   # revocă imediat
omniroute tokens scopes               # explică cele trei domenii
```

Comenzile `tokens` necesită o acreditare de **administrator**. De asemenea, puteți gestiona tokenurile în
panoul de control, la **Setări → Tokenuri de acces** (creare, revocare, copiere unică).

---

## Configurarea unui CLI de programare din catalogul de la distanță

`omniroute configure` citește catalogul actual de modele al **serverului activ** și scrie
o configurație pe mașina **dumneavoastră**.

```bash
omniroute configure codex
#   Furnizori: glm, kmc, ollamacloud, opencode-go, …
#   Furnizor: glm
#   ID model: glm/glm-5.2
#   ✔ S-a scris ~/.codex/glm52.config.toml
#   Utilizați-l:  codex --profile glm52

# neinteractiv
omniroute configure codex --provider glm --model glm/glm-5.2 --name glm52

# păstrați un model utilizat frecvent în partea de sus a selectorului interactiv
omniroute configure codex --provider glm --model glm/glm-5.2 --favorite --yes
```

Selectorul păstrează numai ID-urile modelelor (niciodată URL-uri sau acreditări) în fișierul local
`model-preferences.json`, delimitate în funcție de context și destinația CLI. Favoritele sunt
afișate înaintea selecțiilor recente; utilizați `--unfavorite` pentru a elimina un model selectat
din lista contextului/destinației respective.

Profilul scris face referire la cheia de inferență prin variabila de mediu
(`OMNIROUTE_API_KEY`) — secretul nu este scris niciodată pe disc. Pentru configurarea inițială
unică a Codex (blocul `[model_providers.omniroute]`), consultați
[CODEX-CLI-CONFIGURATION.md](./CODEX-CLI-CONFIGURATION.md).

### Lansarea unui CLI către sistemul de la distanță (fără a scrie configurația)

`omniroute run <target>` respectă, de asemenea, contextul activ: URL-ul de bază de la distanță
și acreditarea contextului sunt injectate numai în procesul pornit.

```bash
omniroute connect 192.168.0.15
omniroute run claude   --model openai/gpt-5.4          # Claude Code → sistemul de la distanță
omniroute run gemini   --model glm/glm-5.2 -- --skip-trust -p "hello"
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"

# Previzualizați exact ce ar fi pornit (numai NUMELE CHEILOR de mediu, niciodată valorile):
omniroute run codex --dry-run --json
```

Destinații: `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen`, `gemini`
(sursă unică: `bin/cli/cli-manifest.mjs`). Qwen și Gemini rulează cu un
director personal temporar izolat, care este eliminat la ieșire, astfel încât lansarea nu atinge —
și nici nu transferă date în — configurația personală a instrumentelor dumneavoastră.

### Comenzi de configurare pentru fiecare CLI

Fiecare CLI acceptat are o comandă de configurare compatibilă cu sistemul de la distanță (toate respectă contextul
activ sau `--remote <url> --api-key <key>`):

| CLI         | Comandă                    | Ce scrie                                                                                                                                                                                    |
| ----------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Codex       | `omniroute setup-codex`    | profiluri `~/.codex/<name>.config.toml` (pentru fiecare model)                                                                                                                              |
| Claude Code | `omniroute setup-claude`   | `~/.claude/profiles/<name>/settings.json` (pentru fiecare model)                                                                                                                            |
| OpenCode    | `omniroute setup-opencode` | `~/.config/opencode/opencode.json` — furnizorul `omniroute` compatibil cu OpenAI, cu fiecare model din catalog (rulați `opencode -m omniroute/<model>`)                                     |
| Cline       | `omniroute setup-cline`    | `~/.cline/data/{globalState,secrets}.json` (mod CLI) + afișează setările extensiei VS Code care trebuie lipite (compatibil cu OpenAI, URL de bază **fără** `/v1`)                           |
| Kilo Code   | `omniroute setup-kilo`     | `~/.local/share/kilo/auth.json` (CLI) + setările VS Code `kilocode.*` — compatibil cu OpenAI, URL de bază **cu** `/v1`                                                                      |
| Continue    | `omniroute setup-continue` | `~/.continue/config.yaml` (VS Code/JetBrains + CLI-ul `cn`) — `provider: openai`, `apiBase` **cu** `/v1`, cheie prin `${{ secrets.OMNIROUTE_API_KEY }}`                                     |
| Cursor      | `omniroute setup-cursor`   | afișează pașii din aplicație (Settings → Models → Override OpenAI Base URL **cu** `/v1` + cheie + model). Configurația Cursor este un SQLite opac — doar panoul de chat                     |
| Roo Code    | `omniroute setup-roo`      | scrie un JSON pentru import în Roo (`~/.omniroute/roo-settings.json`) + setează `roo-cline.autoImportSettingsPath` + afișează pașii din UI (compatibil cu OpenAI, URL de bază **cu** `/v1`) |
| Crush       | `omniroute setup-crush`    | `~/.config/crush/crush.json` — furnizor `openai-compat`, `base_url` **cu** `/v1`, cheie prin `$OMNIROUTE_API_KEY`                                                                           |
| Goose       | `omniroute setup-goose`    | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER=openai` + `OPENAI_HOST` **fără** `/v1` + `GOOSE_MODEL`) + instrucțiuni pentru variabilele de mediu                                           |
| Aider       | `omniroute setup-aider`    | `~/.aider.conf.yml` (`openai-api-base` **fără** `/v1` + `model: openai/<id>`) + instrucțiuni pentru variabilele de mediu (`aider --message --yes`)                                          |
| Qwen Code   | `omniroute setup-qwen`     | intrare V4 `modelProviders.openai` în `~/.qwen/settings.json` + `OMNIROUTE_API_KEY` în `~/.qwen/.env`                                                                                       |

```bash
# OpenCode (furnizor compatibil cu OpenAI, toate modelele din catalog, VPS la distanță)
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute setup-opencode --only glm,kimi        # păstrează doar modelele care corespund
opencode -m omniroute/glm/glm-5.2 "..."          # exportați mai întâi OMNIROUTE_API_KEY
```

> OpenCode are și o integrare mai bogată prin **plugin**: `omniroute setup opencode`
> (acum compatibilă cu accesul la distanță prin `--remote`) instalează `@omniroute/opencode-plugin`.
> `setup-opencode` este alternativa simplificată, compatibilă cu OpenAI. Cheia API
> este referențiată prin `{env:OMNIROUTE_API_KEY}` — nu este scrisă niciodată pe disc.
>
> În OpenCode v2, utilizați în schimb `@omniroute/opencode-plugin-v2`: același catalog,
> un contract de încărcare diferit. Acesta citește cheia din propriul depozit de acreditări
> al OpenCode atunci când integrarea este conectată, astfel încât un gateway la distanță nu
> necesită deloc o cheie în `opencode.json`.

---

## Gestionarea contextelor (comutarea între servere)

Un **context** este un server salvat (baseUrl + acreditare + domeniu de acces). `omniroute connect`
creează unul și îl activează; din acel moment, fiecare comandă îl vizează. Gestionați
și comutați între contexte cu `omniroute contexts`:

```bash
omniroute contexts list            # toate contextele; cel activ este marcat cu ●
omniroute contexts current         # serverul activ, starea autentificării, domeniul de acces
```

```text
  | Name    | Base URL                  | Auth  | Scope | Description
● | vps     | http://100.67.86.91:20128 | token | admin | Remote OmniRoute (…)
  | default | http://localhost:20128    | ✗     |       |
```

**Comutați între servere** — fiecare comandă ulterioară urmează contextul activ:

```bash
omniroute contexts use vps         # → toate comenzile vizează acum VPS-ul de la distanță
omniroute tokens list              #   (rulează pe VPS)

omniroute contexts use default     # → înapoi la localhost
omniroute tokens list              #   (rulează pe serverul local)
```

**Adăugați manual un context** (în loc de `connect`), inspectați-l sau redenumiți-l:

```bash
omniroute contexts add staging --url https://staging.example.com:20128 \
  --access-token oma_live_xxxx --scope write --description "staging box"
omniroute contexts show staging    # detalii complete pentru un context
omniroute contexts rename staging stg
```

**Eliminați un context** — solicită confirmare; transmiteți `--yes` pentru a o omite
(obligatoriu pentru scripturi / shell-uri neinteractive, care altfel refuză în siguranță):

```bash
omniroute contexts remove stg --yes
```

> `default` (localhost) nu poate fi eliminat. Eliminarea contextului activ determină revenirea
> la `default`. Sfat: eliminarea unui context șterge doar acreditarea salvată **local** —
> revocați tokenul pe server cu `omniroute tokens revoke <id>` pentru a anula efectiv
> accesul.

**Exportați / importați** contexte (de exemplu, pentru a le muta între sisteme). Contextele noi păstrează
doar o referință către portchei; acreditările nu sunt copiate în export atunci când
portcheiul sistemului de operare este disponibil:

```bash
omniroute contexts export --out contexts.json     # implicit: stdout
omniroute contexts import contexts.json            # suprascriere; --merge pentru păstrarea celor existente
omniroute contexts migrate --yes                  # mută tokenurile vechi în text simplu în portchei
```

Pe sistemele headless fără un portchei utilizabil al sistemului de operare, CLI-ul revine la
`config.json` cu modul `0600` și afișează o avertizare unică. Tratați exporturile din
acest mecanism de rezervă (și orice configurație veche de dinaintea migrării) ca material secret.

---

## Verificare rapidă de la un capăt la altul

Un ciclu de viață care poate fi copiat și lipit pentru a verifica de la zero o configurare la distanță — conectați-vă, generați un
token cu domeniu de acces limitat, direcționați o comandă, comutați înapoi și eliminați configurația. Înlocuiți
`192.168.0.15` cu gazda/adresa IP a serverului dvs. (Tailscale, LAN sau un URL public
`https://…`).

```bash
# 1. Conectare (parolă → token de administrator, salvat drept context care devine activ)
omniroute connect 192.168.0.15                 # sau: --key oma_live_xxxx  (fără parolă)
omniroute contexts current                     # afișează serverul la distanță + domeniul de acces

# 2. Utilizare — comenzile de administrare rulează acum pe serverul la distanță
omniroute tokens create --name laptop --scope read   # generează un token cu acces mai restrâns
omniroute tokens list                                 # listă mascată, de pe serverul la distanță

# 3. Comutare înainte și înapoi
omniroute contexts use default                 # → local
omniroute contexts use 192-168-0-15            # → din nou la distanță (numele din `contexts list`)

# 4. Eliminare. NOTĂ: `contexts remove` șterge doar acreditarea LOCALĂ —
#    NU revocă tokenul de pe server. Revocați-l mai întâi pe server dacă
#    doriți să anulați efectiv accesul.
omniroute tokens revoke <id|prefix>            # anulează accesul pe server
omniroute contexts remove 192-168-0-15 --yes   # elimină contextul local (chiar dacă este activ → revine la default), fără solicitare
```

> `--yes` face ca `contexts remove` să fie neinteractivă (obligatoriu în scripturi/CI; fără
> această opțiune, un shell neinteractiv refuză în siguranță în loc să rămână blocat). Eliminarea contextului
> **activ** determină automat revenirea la `default`.

---

## Note de securitate

- Tokenul în text clar este afișat o singură dată; este stocat doar hashul SHA-256 (la fel ca pentru cheile API).
- `omniroute connect` reutilizează blocarea împotriva atacurilor prin forță brută asupra autentificării și jurnalizarea de audit.
- Pentru transport, preferați HTTPS sau un Tailnet; o gazdă fără protocol folosește implicit `http://`
  pentru comoditate în LAN/Tailscale — furnizați un URL complet `https://…` pentru TLS.
- Fișierul de context local preferat este `~/.omniroute/config.json` (`chmod 600`),
  care conține doar un `credentialRef`; tokenul propriu-zis este stocat în
  seiful de credențiale al sistemului de operare (`keytar`) și nu este afișat niciodată în jurnale. Instalările fără interfață, care nu dispun de un
  seif de credențiale nativ funcțional, utilizează același fișier cu permisiuni `0600` ca soluție alternativă explicită și
  emit o singură dată un avertisment. Utilizați `omniroute contexts migrate --yes` după instalarea unui
  backend pentru seiful de credențiale.

---

## Endpointuri API (referință)

| Metodă | Rută                  | Autentificare        | Domeniu                          |
| ------ | --------------------- | -------------------- | -------------------------------- |
| POST   | `/api/cli/connect`    | parola de gestionare | — (public, protejat prin parolă) |
| GET    | `/api/cli/whoami`     | token de acces       | read                             |
| GET    | `/api/cli/tokens`     | token de acces       | admin                            |
| POST   | `/api/cli/tokens`     | token de acces       | admin                            |
| DELETE | `/api/cli/tokens/:id` | token de acces       | admin                            |

Consultați [openapi.yaml](../openapi.yaml) pentru schemele complete.
