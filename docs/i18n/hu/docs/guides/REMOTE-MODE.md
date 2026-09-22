# Remote Mode (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/REMOTE-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/REMOTE-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/REMOTE-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/REMOTE-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/REMOTE-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/REMOTE-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/REMOTE-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/REMOTE-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/REMOTE-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/REMOTE-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/REMOTE-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/REMOTE-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/REMOTE-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/REMOTE-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/REMOTE-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/REMOTE-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/REMOTE-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/REMOTE-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/REMOTE-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/REMOTE-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/REMOTE-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/REMOTE-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/REMOTE-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/REMOTE-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/REMOTE-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/REMOTE-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/REMOTE-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/REMOTE-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/REMOTE-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/REMOTE-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/REMOTE-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/REMOTE-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/REMOTE-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/REMOTE-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/REMOTE-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/REMOTE-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/REMOTE-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/REMOTE-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/REMOTE-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/REMOTE-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/REMOTE-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/REMOTE-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/REMOTE-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/REMOTE-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/REMOTE-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/REMOTE-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/REMOTE-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/REMOTE-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/REMOTE-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/REMOTE-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/REMOTE-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/REMOTE-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/REMOTE-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/REMOTE-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/REMOTE-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/REMOTE-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/REMOTE-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/REMOTE-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/REMOTE-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/REMOTE-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/REMOTE-MODE.md)

---

Futtassa az `omniroute` CLI-t a laptopján, miközben maga az OmniRoute valahol máshol fut
(egy VPS-en, otthoni szerveren vagy egy másik gépen a Tailnet hálózatán). Egyszer jelentkezik be az
`omniroute connect` paranccsal, ezután pedig **minden** CLI-parancs azt a távoli
szervert célozza — ugyanazok a parancsok, ugyanaz a kimenet, csak a végrehajtás történik a távoli gépen.

Nincs szükség második eszköz telepítésére: a távoli mód a szokásos `omniroute` CLI-t
és hatókörrel rendelkező **hozzáférési tokeneket** használja.

```bash
npm install -g omniroute                 # a szokásos CLI
omniroute connect 192.168.0.15           # bejelentkezés (jelszó → hatókörrel rendelkező token)
omniroute models list                    # ← mostantól a TÁVOLI szerver modelljeit listázza
omniroute configure codex                # ← helyi Codex-profilt ír a távoli katalógusból
```

---

## Működés

```
az Ön laptopja                           távoli OmniRoute (VPS)
┌────────────────────┐                   ┌───────────────────────────────┐
│ omniroute CLI      │  POST /api/cli/connect  (jelszó → token)           │
│  környezet: vps    │ ───────────────►  │ hatókörös hozzáférési tokent  │
│  baseUrl, token    │  Authorization: Bearer oma_live_…                  │
│                    │ ───────────────►  │ hoz létre; minden kezelési út- │
│ konfigurációkat ír │ ◄───────────────  │ vonalon ellenőrzi a hatókört  │
│ HELYBEN            │                   └───────────────────────────────┘
└────────────────────┘
```

- A **környezetek** szerverenként egy bejegyzést tárolnak (`~/.omniroute/config.json`, `chmod 600`).
  Az `omniroute contexts use <name>` váltja át az aktív szervert; a `default` helyi.
- A **hozzáférési tokenek** (`oma_live_…`) engedélyezik a kezelési parancsokat. Ezek
  eltérnek a következtetési API-kulcsoktól (`sk-…`, amelyeket a `/v1/chat/completions` használ).
- A szerveroldalon csak a token SHA-256-kivonata tárolódik. A nyílt szövegű érték
  **egyszer**, a létrehozáskor jelenik meg.

---

## Csatlakozás

### A kezelési jelszóval (kezdeti beállítás)

```bash
omniroute connect 192.168.0.15
# Kezelési jelszó ehhez: http://192.168.0.15:20128: ********
# ✔ Csatlakoztatva ehhez: http://192.168.0.15:20128 — környezet: '192.168.0.15' (hatókör: admin)
```

A jelszavas folyamat alapértelmezés szerint **admin** tokent hoz létre (mivel Önnél van a jelszó,
már eleve teljes hozzáféréssel rendelkezik). A hatókört a `--scope` kapcsolóval szűkítheti:

```bash
omniroute connect 192.168.0.15 --scope write
```

Lehetőségek: `--port <p>` (ha a gazdagép nincs porttal megadva), `--name <ctx>` (a környezet neve),
`--scope read|write|admin`. A teljes URL változtatás nélkül lesz használva:
`omniroute connect https://omni.example.com`.

### Előre létrehozott tokennel

Hozzon létre egy adott hatókörű tokent az irányítópulton (vagy az `omniroute tokens create` paranccsal), majd
illessze be — nincs szükség jelszóra:

```bash
omniroute connect 192.168.0.15 --key oma_live_xxxxxxxx
```

A CLI a `GET /api/cli/whoami` útvonalon ellenőrzi a tokent, majd aktív környezetként menti.

---

## Hatókörök

Három hierarchikus szint (`admin ⊃ write ⊃ read`):

| Hatókör | Engedélyezett műveletek                                                                      |
| ------- | -------------------------------------------------------------------------------------------- |
| `read`  | listázás/megtekintés — `models list`, `providers status`, `logs`, `usage`, `cost`            |
| `write` | olvasás **+** konfigurálás/alkalmazás — `setup-codex`, `keys add`, `config set`, kombinációk |
| `admin` | írás **+** kezelés — `tokens` CRUD, szolgáltatók hozzáadása, szolgáltatások, házirend, oauth |

A szerver a HTTP-metódusból állapítja meg az egyes útvonalakhoz szükséges hatókört
(`GET`→read, módosítások→write), valamint egy admin engedélyezési listát használ az érzékeny felületekhez
(`/api/cli/tokens`, `/api/providers` módosításai, `/api/oauth`, `/api/services`, …).
Az elégtelen hatókörű token `403` választ kap egy egyértelmű üzenettel.

> A folyamatokat indító útvonalak (`/api/services/*`, `/api/mcp/*`, …)
> **csak a loopback interfészen** maradnak elérhetők — távoli tokennel a hatókörtől függetlenül soha nem érhetők el.

---

## Az Antigravity csatlakoztatása távoli telepítés esetén

Az Antigravity a Google firstparty/nativeapp hozzájárulási képernyőjét használja. A Google csak akkor adja ki az engedélyezési kódot, ha a **loopback átirányítás**
(`http://127.0.0.1:<port>/callback`) **elérhető abból a böngészőből, amelyben jóváhagyják a bejelentkezést**. Távoli VPS-telepítés esetén ez a loopback a kiszolgálón található, nem az Ön gépén, ezért a hozzájárulási képernyő **örökre függőben marad, és soha nem ad ki kódot** — így a szokásos „illessze be a visszahívási URL-t” tartalékmegoldásnál nincs mit beilleszteni. (Ez a Google oldalán fennálló korlátozás: ugyanez történik minden olyan proxyban, amely a mellékelt Antigravity asztali klienst használja, nem csak az OmniRoute-ban.)

Az irányítópult ezt még az elakadás előtt észleli: ha nem localhost-címről nyitja meg a **Providers → Antigravity →
Connect** lehetőséget, az általános „másolja ki a visszahívási URL-t” értesítés helyett az alábbi két megoldás jelenik meg, már kitöltve az Ön gépnevével és portjával.
(A LAN-cím is ide tartozik — ennél a visszahívásnál a `192.168.x.x` nem számít localhostnak.)

Az Antigravity két támogatott módon csatlakoztatható egy távoli OmniRoute-hoz.

### A lehetőség — helyi bejelentkezési segédprogram (ajánlott)

Futtassa az OAuth-folyamatot **a saját számítógépén**, ahol a `127.0.0.1` elérhető. A segédprogram közvetlenül kommunikál a Google-lel, így a hozzájárulási folyamat ott fejeződik be, ahol az irányítópult verziójával ez nem lehetséges.

**Ha már csatlakozott** (`omniroute connect <host>`), semmit sem kell másolnia — a segédprogram elküldi a hitelesítő adatot az adott telepítésnek:

```bash
# A HELYI gépén (Node.js és böngésző szükséges):
omniroute connect 192.168.0.15        # egyszer — rendszergazdai hatókörű környezeti tokent hoz létre
npx omniroute login antigravity
#   ↳ megnyitja a Google hozzájárulási képernyőjét, rögzíti a visszahívást egy helyi loopback porton,
#     végrehajtja a cserét, majd POST-kéréssel elküldi a hitelesítő adatot az aktív környezetnek:
#
#   Az Antigravity csatlakoztatva: http://192.168.0.15:20128 (kapcsolat: abc123).
#   Nincs mit beilleszteni — bezárhatja ezt a terminált.
```

A továbbítás automatikusan megtörténik, amikor az aktív környezet egy másik gépre mutat. Ezt a `--push` / `--no-push` kapcsolókkal kényszerítheti ki vagy tilthatja le, illetve a `--context <name>` használatával megadhat egy konkrét környezetet.

**Ha a gépe nem tudja elérni a VPS-t** (tűzfal miatt, SSH nélkül vagy hálózatról leválasztott munkaállomásról), a segédprogram akkor is működik — csak a Google elérésére van _szüksége_. Használja a `--no-push` kapcsolót, vagy egyszerűen hagyja sikertelenül végződni a továbbítást: ilyenkor a már elvégzett engedélyezés elvetése helyett kiírja a blobot.

```bash
npx omniroute login antigravity --no-push
#   omniroute-cred-v1.eyJ2IjoxLCJ...
```

Ezután a **távoli** irányítópulton nyissa meg a **Providers → Antigravity → Connect** lehetőséget, majd illessze be az `omniroute-cred-v1.…` blobot a **Step 2** mezőbe (a mező visszahívási URL-t és hitelesítőadat-blobot egyaránt elfogad). Az OmniRoute dekódolja, kiszolgálóoldalon lefuttatja a Cloud Code bevezetési folyamatát, majd tartósan menti a kapcsolatot.

> A blob frissítési tokent tartalmaz — kezelje úgy, mint egy jelszót. Továbbítás esetén egyszer küldi el a rendszer a környezet hitelesített kapcsolatán keresztül; beillesztés esetén pedig az irányítópult kapcsolatán keresztül. Mindkét esetben titkosítva tárolódik, és sikeres továbbításkor soha nem jelenik meg a terminálban.

Kapcsolók: `--no-browser` (az automatikus megnyitás helyett kiírja az URL-t), `--port <n>`
(rögzíti a loopback portot), `--timeout <ms>`, `--push` / `--no-push` (felülbírálja az automatikus kézbesítést), `--context <name>` (egy konkrét környezetet céloz meg).

### B lehetőség — helyi SSH-porttovábbítási alagút

Ha rendelkezik SSH-hozzáféréssel a VPS-hez, továbbítsa az irányítópult portját úgy, hogy a loopback visszahívás az alagúton keresztül visszajusson a kiszolgálóhoz:

```bash
# A HELYI gépén:
ssh -L 20128:127.0.0.1:20128 user@your-vps
# ezután nyissa meg a http://localhost:20128 címet a HELYI böngészőjében, és csatlakoztassa az Antigravityt
# a szokásos módon — a 127.0.0.1:20128/callback átirányítás most már SSH-n keresztül eléri a VPS-t.
```

Mivel az irányítópultot a `localhost:20128` címen éri el, a Google hozzájárulási folyamata befejeződik, a visszahívás pedig ugyanazon az alagúton keresztül eljut a kiszolgálóhoz — nincs szükség blobra. Tartsa nyitva az alagutat, amíg a kapcsolat aktívként nem jelenik meg.

Az alábbi, rögzített loopbacket használó szolgáltatóktól eltérően itt **egyetlen porttovábbítás elegendő**: az Antigravity visszahívása magát az irányítópult portját használja, ezért nincs szükség egy második, szolgáltatóspecifikus port alagútba terelésére.

> Teljesen grafikus felület nélküli alternatívaként (segédprogram és alagút nélkül) beállíthatja a **saját**
> Google OAuth webes hitelesítő adatait és egy nyilvános alap-URL-t; lásd a szolgáltató OAuth-környezeti változóit. A fenti két lehetőséghez nincs szükség további Google-beállításra.

---

## A Codex / Grok csatlakoztatása távoli telepítéshez (rögzített visszacsatolási címet használó szolgáltatók)

A Codex, az xAI (`xai-oauth`) és a Grok CLI (`grok-cli`) egy **rögzített** loopback
`redirect_uri` címet regisztrál a külső OAuth-alkalmazásában. Az OmniRoute ezt nem tudja módosítani — a
szolgáltató mindig ugyanarra a beégetett címre irányítja vissza a böngészőt:

| Szolgáltató | Rögzített visszahívási cím, amelyre a szolgáltató átirányít |
| ----------- | ----------------------------------------------------------- |
| `codex`     | `http://localhost:1455/auth/callback`                       |
| `xai-oauth` | `http://127.0.0.1:56121/callback`                           |
| `grok-cli`  | `http://127.0.0.1:56122/callback`                           |

A `localhost` itt **a böngészőt futtató gépet** jelenti, miközben az OmniRoute PKCE
visszahívási szervere a **szerver** loopback interfészén figyel. Ha az irányítópultot egy LAN-címen,
például a `http://192.168.0.15:20128` címen nyitja meg, a kettő soha nem találkozik: az engedélyezési
kód a saját laptopja `localhost:1455` címére érkezik, ahol semmi sem figyel,
és a szolgáltató hiba megjelenítése nélkül megszakítja a bejelentkezést.

Az irányítópult ezt még a felugró ablak megnyitása előtt észleli, és a bejelentkezés
csendes meghiúsulása helyett megjeleníti az alagút létrehozására szolgáló parancsot (#8046).

### Javítás — **mindkét** port továbbítása

```bash
# A BÖNGÉSZŐT futtató gépen:
ssh -L 20128:127.0.0.1:20128 -L 1455:127.0.0.1:1455 <user>@192.168.0.15
# ezután nyissa meg a http://localhost:20128 címet, és onnan csatlakoztassa a Codexet
```

Két továbbítás szükséges; ha csak az egyiket továbbítja, a folyamat továbbra is sikertelen lesz:

- A **`20128`** (az irányítópult portja) valódi helyi localhost eredetet biztosít, ami
  szükséges ahhoz, hogy az OmniRoute egyáltalán elindítsa a PKCE visszahívási szervert — LAN-eredet esetén
  ez az ág soha nem érhető el.
- A **`1455`** (a szolgáltató rögzített visszahívási portja) az a cím, ahová a böngészőt visszairányítják;
  ezt alagúton keresztül továbbítani kell a szerver loopback interfészére.

xAI vagy Grok CLI csatlakoztatásakor cserélje le a `1455` értéket `56121`/`56122` értékre, a `20128` értéket pedig
az irányítópult tényleges portjára. Tartsa nyitva az alagutat, amíg a kapcsolat aktívként
nem jelenik meg.

> **Nincs SSH-hozzáférése?** A Codex és a Grok CLI beillesztett tokent is elfogad — használja a csatlakozási
> párbeszédpanel **Paste API Key** / **Import auth.json** lapját. Ez a módszer nem használ loopback
> visszahívást, ezért bármilyen eredetről működik. A Codex emellett önálló hozzáférési
> tokent vagy `~/.codex/auth.json` munkamenetadat-blokkot is elfogad.

---

## Tokenek kezelése

```bash
omniroute tokens create --name "laptop" --scope write [--expires 30]
#   ↳ a titkos értéket EGYSZER írja ki — másolja ki most
omniroute tokens list                 # maszkolva: azonosító, név, hatókör, előtag, állapot, lejárat
omniroute tokens revoke <id|prefix>   # azonnali visszavonás
omniroute tokens scopes               # a három hatókör ismertetése
```

A `tokens` parancsokhoz **admin** hitelesítő adat szükséges. A tokeneket
az irányítópult **Settings → Access Tokens** részében is kezelheti (létrehozás, visszavonás, egyszeri másolás).

---

## Kódolási CLI konfigurálása a távoli katalógusból

Az `omniroute configure` beolvassa az **aktív szerver** élő modellkatalógusát, és konfigurációt ír
az **Ön** gépére.

```bash
omniroute configure codex
#   Providers: glm, kmc, ollamacloud, opencode-go, …
#   Provider: glm
#   Model id: glm/glm-5.2
#   ✔ Létrehozva: ~/.codex/glm52.config.toml
#   Használat:  codex --profile glm52

# nem interaktív
omniroute configure codex --provider glm --model glm/glm-5.2 --name glm52

# egy gyakran használt modell megtartása az interaktív választó tetején
omniroute configure codex --provider glm --model glm/glm-5.2 --favorite --yes
```

A választó kizárólag modellazonosítókat (URL-eket vagy hitelesítő adatokat soha) tárol a helyi
`model-preferences.json` fájlban, kontextus és CLI-cél szerint elkülönítve. A kedvencek
a legutóbbi választások előtt jelennek meg; a `--unfavorite` használatával távolíthat el egy kiválasztott modellt
az adott kontextus-/céllistából.

A létrehozott profil környezeti változóval hivatkozik a következtetési kulcsra
(`OMNIROUTE_API_KEY`) — a titkos érték soha nem kerül lemezre. A Codex egyszeri
alapbeállításával (a `[model_providers.omniroute]` blokkal) kapcsolatban lásd:
[CODEX-CLI-CONFIGURATION.md](./CODEX-CLI-CONFIGURATION.md).

### CLI indítása a távoli példányhoz (konfiguráció írása nélkül)

Az `omniroute run <target>` szintén figyelembe veszi az aktív kontextust: a távoli alap-URL
és a kontextus hitelesítő adatai csak az elindított folyamatba kerülnek be.

```bash
omniroute connect 192.168.0.15
omniroute run claude   --model openai/gpt-5.4          # Claude Code → távoli példány
omniroute run gemini   --model glm/glm-5.2 -- --skip-trust -p "hello"
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"

# Annak pontos előnézete, hogy mi indulna el (csak a környezeti változók KULCSNEVEI, az értékek soha):
omniroute run codex --dry-run --json
```

Célok: `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen`, `gemini`
(egyetlen forrás: `bin/cli/cli-manifest.mjs`). A Qwen és a Gemini ideiglenes,
elkülönített kezdőkönyvtárral fut, amely kilépéskor törlődik, így az indítás soha nem módosítja —
és nem is szivárogtatja ki — a személyes eszközkonfigurációját.

### CLI-nkénti beállítási parancsok

Minden támogatott CLI rendelkezik távoli környezetet kezelő beállítási paranccsal (mindegyik figyelembe veszi az aktív
kontextust, illetve a `--remote <url> --api-key <key>` beállítást):

| CLI         | Parancs                    | Amit ír                                                                                                                                                                                                |
| ----------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Codex       | `omniroute setup-codex`    | `~/.codex/<name>.config.toml` profilok (modellenként)                                                                                                                                                  |
| Claude Code | `omniroute setup-claude`   | `~/.claude/profiles/<name>/settings.json` (modellenként)                                                                                                                                               |
| OpenCode    | `omniroute setup-opencode` | `~/.config/opencode/opencode.json` — az `omniroute` OpenAI-kompatibilis szolgáltató az összes katalógusmodellel (futtatás: `opencode -m omniroute/<model>`)                                            |
| Cline       | `omniroute setup-cline`    | `~/.cline/data/{globalState,secrets}.json` (CLI mód) + kiírja a beillesztendő VS Code-bővítménybeállításokat (OpenAI-kompatibilis, alap-URL `/v1` **nélkül**)                                          |
| Kilo Code   | `omniroute setup-kilo`     | `~/.local/share/kilo/auth.json` (CLI) + VS Code `kilocode.*` beállítások — OpenAI-kompatibilis, alap-URL `/v1` **értékkel**                                                                            |
| Continue    | `omniroute setup-continue` | `~/.continue/config.yaml` (VS Code/JetBrains + `cn` CLI) — `provider: openai`, `apiBase` `/v1` **értékkel**, kulcs a `${{ secrets.OMNIROUTE_API_KEY }}` használatával                                  |
| Cursor      | `omniroute setup-cursor`   | kiírja az alkalmazáson belüli lépéseket (Settings → Models → Override OpenAI Base URL `/v1` **értékkel** + kulcs + modell). A Cursor konfigurációja átlátszatlan SQLite — csak a csevegőpanel          |
| Roo Code    | `omniroute setup-roo`      | Roo-importálási JSON-t ír (`~/.omniroute/roo-settings.json`) + beállítja a `roo-cline.autoImportSettingsPath` értékét + kiírja a felületi lépéseket (OpenAI-kompatibilis, alap-URL `/v1` **értékkel**) |
| Crush       | `omniroute setup-crush`    | `~/.config/crush/crush.json` — `openai-compat` szolgáltató, `base_url` `/v1` **értékkel**, kulcs a `$OMNIROUTE_API_KEY` használatával                                                                  |
| Goose       | `omniroute setup-goose`    | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER=openai` + `OPENAI_HOST` `/v1` **nélkül** + `GOOSE_MODEL`) + környezetbeállítási recept                                                                  |
| Aider       | `omniroute setup-aider`    | `~/.aider.conf.yml` (`openai-api-base` `/v1` **nélkül** + `model: openai/<id>`) + környezetbeállítási recept (`aider --message --yes`)                                                                 |
| Qwen Code   | `omniroute setup-qwen`     | V4-es `modelProviders.openai` bejegyzés a `~/.qwen/settings.json` fájlban + `OMNIROUTE_API_KEY` a `~/.qwen/.env` fájlban                                                                               |

```bash
# OpenCode (OpenAI-kompatibilis szolgáltató, minden katalógusmodell, távoli VPS)
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute setup-opencode --only glm,kimi        # csak az egyező modellek megtartása
opencode -m omniroute/glm/glm-5.2 "..."          # előbb exportálja az OMNIROUTE_API_KEY változót
```

> Az OpenCode gazdagabb **bővítményes** integrációval is rendelkezik: `omniroute setup opencode`
> (mostantól távoli használatot is támogat a `--remote` kapcsolóval), amely telepíti az `@omniroute/opencode-plugin` csomagot.
> A `setup-opencode` a könnyűsúlyú, OpenAI-kompatibilis alternatíva. Az API-kulcsra
> a `{env:OMNIROUTE_API_KEY}` hivatkozik — soha nem írja lemezre.
>
> OpenCode v2 esetén használja helyette az `@omniroute/opencode-plugin-v2` csomagot: ugyanaz a katalógus,
> eltérő betöltői szerződés. Amikor az integráció csatlakoztatva van, a kulcsot az OpenCode saját hitelesítőadat-tárolójából
> olvassa be, így egy távoli átjáró esetén egyáltalán nincs szükség kulcsra az
> `opencode.json` fájlban.

---

## Kontextusok kezelése (váltás a kiszolgálók között)

A **kontextus** egy mentett kiszolgáló (baseUrl + hitelesítő adat + hatókör). Az `omniroute connect`
létrehoz egyet, és aktívvá teszi; ettől kezdve minden parancs ezt célozza. A kontextusokat az
`omniroute contexts` paranccsal kezelheti, és válthat közöttük:

```bash
omniroute contexts list            # az összes kontextus; az aktívat ● jelöli
omniroute contexts current         # az aktív kiszolgáló, hitelesítési állapot és hatókör
```

```text
  | Név     | Alap URL                  | Hitelesítés | Hatókör | Leírás
● | vps     | http://100.67.86.91:20128 | token       | admin   | Távoli OmniRoute (…)
  | default | http://localhost:20128    | ✗           |         |
```

**Váltás a kiszolgálók között** — minden ezt követő parancs az aktív kontextust használja:

```bash
omniroute contexts use vps         # → mostantól minden parancs a távoli VPS-t célozza
omniroute tokens list              #   (a VPS-en fut)

omniroute contexts use default     # → vissza a localhosthoz
omniroute tokens list              #   (a helyi kiszolgálón fut)
```

**Kontextus manuális hozzáadása** (a `connect` helyett), megtekintése vagy átnevezése:

```bash
omniroute contexts add staging --url https://staging.example.com:20128 \
  --access-token oma_live_xxxx --scope write --description "előkészítési kiszolgáló"
omniroute contexts show staging    # egy kontextus teljes részletei
omniroute contexts rename staging stg
```

**Kontextus eltávolítása** — megerősítést kér; ennek kihagyásához adja meg a `--yes` kapcsolót
(szkriptekhez / nem interaktív parancsértelmezőkhöz szükséges, amelyek enélkül biztonságosan elutasítják a műveletet):

```bash
omniroute contexts remove stg --yes
```

> A `default` (localhost) nem távolítható el. Az aktív kontextus eltávolításakor a rendszer
> visszavált a `default` kontextusra. Tipp: egy kontextus eltávolítása csak a **helyileg**
> mentett hitelesítő adatot törli — a hozzáférés tényleges megszüntetéséhez vonja vissza
> a tokent a kiszolgálón az `omniroute tokens revoke <id>` paranccsal.

Kontextusok **exportálása / importálása** (például gépek közötti átvitelhez). Az új kontextusok
csak egy kulcskarika-hivatkozást tárolnak tartósan; ha az operációs rendszer kulcskarikája
elérhető, a hitelesítő adatok nem kerülnek bele az exportba:

```bash
omniroute contexts export --out contexts.json     # alapértelmezés: stdout
omniroute contexts import contexts.json            # felülírás; a meglévők megtartásához: --merge
omniroute contexts migrate --yes                  # régi egyszerű szöveges tokenek áthelyezése a kulcskarikába
```

Használható operációsrendszer-kulcskarika nélküli, grafikus felület nélküli rendszereken a CLI
a `0600` móddal rendelkező `config.json` fájlra áll vissza, és egyszeri figyelmeztetést jelenít
meg. Az ebből a tartalék megoldásból származó exportokat (és az áttelepítés előtti összes régi
konfigurációt) bizalmas anyagként kezelje.

---

## Gyors teljes körű ellenőrzés

Egy bemásolható életciklus a távoli beállítás teljesen az alapoktól történő ellenőrzéséhez:
csatlakozás, korlátozott hatókörű token létrehozása, parancs átirányítása, visszaváltás és
lebontás. Cserélje le a `192.168.0.15` címet a kiszolgáló gazdagépnevére/IP-címére
(Tailscale, LAN vagy nyilvános `https://…` URL).

```bash
# 1. Csatlakozás (jelszó → admin token, aktívvá váló kontextusként mentve)
omniroute connect 192.168.0.15                 # vagy: --key oma_live_xxxx  (nincs jelszó)
omniroute contexts current                     # megjeleníti a távoli kiszolgálót és a hatókört

# 2. Használat — a felügyeleti parancsok mostantól a távoli kiszolgálón futnak
omniroute tokens create --name laptop --scope read   # szűkebb hatókörű token létrehozása
omniroute tokens list                                 # maszkolt lista a távoli kiszolgálóról

# 3. Váltás oda-vissza
omniroute contexts use default                 # → helyi
omniroute contexts use 192-168-0-15            # → ismét távoli (név a `contexts list` parancsból)

# 4. Lebontás. MEGJEGYZÉS: a `contexts remove` csak a HELYI hitelesítő adatot törli —
#    NEM vonja vissza a tokent a kiszolgálón. Először a kiszolgálón vonja vissza, ha
#    ténylegesen meg szeretné szüntetni a hozzáférést.
omniroute tokens revoke <id|prefix>            # megszünteti a hozzáférést a kiszolgálón
omniroute contexts remove 192-168-0-15 --yes   # törli a helyi kontextust (aktívként is → visszavált a default kontextusra), megerősítés nélkül
```

> A `--yes` nem interaktívvá teszi a `contexts remove` parancsot (szkriptekben/CI-ban
> szükséges; nélküle a nem interaktív parancsértelmező várakozás helyett biztonságosan
> elutasítja a műveletet). Az **aktív** kontextus eltávolításakor a rendszer automatikusan
> visszavált a `default` kontextusra.

---

## Biztonsági megjegyzések

- A token egyszer jelenik meg egyszerű szövegként; csak az SHA-256-kivonat marad meg (az API-kulcsokhoz hasonlóan).
- Az `omniroute connect` újra felhasználja a bejelentkezés elleni brute-force zárolást és az auditnaplózást.
- Az adatátvitelhez lehetőleg HTTPS-t vagy Tailnetet használjon; egy protokoll nélküli állomásnév alapértelmezés szerint `http://`
  protokollt használ a LAN-/Tailscale-kényelem érdekében — TLS használatához adjon meg egy teljes `https://…` URL-t.
- Az előnyben részesített helyi környezetfájl a `~/.omniroute/config.json` (`chmod 600`),
  amely csak egy `credentialRef` értéket tartalmaz; maga a token az operációs rendszer
  kulcstartójában (`keytar`) tárolódik, és soha nem kerül kiírásra a naplókba. A működő
  natív kulcstartó nélküli, grafikus felületet nem használó telepítések explicit tartalékmegoldásként
  ugyanezt a `0600` fájlt használják, és egyszer figyelmeztetést jelenítenek meg. Egy
  kulcstartó-háttérrendszer telepítése után használja az `omniroute contexts migrate --yes` parancsot.

---

## API-végpontok (referencia)

| Metódus | Útvonal               | Hitelesítés       | Hatókör                     |
| ------- | --------------------- | ----------------- | --------------------------- |
| POST    | `/api/cli/connect`    | kezelési jelszó   | — (nyilvános, jelszóvédett) |
| GET     | `/api/cli/whoami`     | hozzáférési token | olvasás                     |
| GET     | `/api/cli/tokens`     | hozzáférési token | rendszergazdai              |
| POST    | `/api/cli/tokens`     | hozzáférési token | rendszergazdai              |
| DELETE  | `/api/cli/tokens/:id` | hozzáférési token | rendszergazdai              |

A teljes sémákért lásd az [openapi.yaml](../openapi.yaml) fájlt.
