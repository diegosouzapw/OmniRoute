# Cursor Provider in Docker Environments (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR-DOCKER.md)

---

Kai OmniRoute veikia Docker viduje, senieji **Importuoti iš Cursor IDE** /
`cursor-agent` procesai neveikia, nes konteineris nemato pagrindinio kompiuterio Cursor
diegimo. Vietoje jų naudokite **Prisijungti naudojant Cursor** (deep-control PKCE).

## Kodėl IDE / CLI importavimas neveikia Docker aplinkoje

1. **Failų sistemos izoliacija** — automatinis importavimas ieško Linux kelių, tokių kaip
   `~/.config/Cursor/User/globalStorage/state.vscdb`, _konteinerio viduje_.
   Naudojant Docker Desktop sistemoje macOS, pagrindinio kompiuterio IDE DB pagal numatytąsias nuostatas nėra prijungta, o
   konteinerio OS yra Linux, net kai pagrindiniame kompiuteryje veikia Darwin.
2. **Nėra `cursor-agent` vykdomojo failo** — oficialiuose OmniRoute atvaizduose
   `cursor-agent` nėra. Anksčiau skiltis „Galimi modeliai“ vykdydavo
   `cursor-agent --list-models` ir nesėkmės atveju naudodavo statinį katalogą.
3. **Netinkamas vykdomasis failas** — **neprijunkite** macOS skirto `cursor-agent` prie Linux
   konteinerio naudodami bind mount. Jis nebus vykdomas.

## Rekomenduojama: prisijungti naudojant Cursor

1. Atidarykite **Valdymo skydas → Teikėjai → Cursor**.
2. Pasirinkite kortelę **Prisijungti naudojant Cursor**.
3. Spustelėkite **Prisijungti naudojant Cursor** — OmniRoute jūsų **pagrindinio kompiuterio** naršyklėje atidarys
   `https://cursor.com/loginDeepControl?…`.
4. Patvirtinkite prisijungimą naršyklėje, tada grįžkite į valdymo skydą. OmniRoute
   periodiškai tikrina `api2.cursor.sh/auth/poll`, kol gauna prieigos raktus.
5. OmniRoute išsaugo **prieigos ir atnaujinimo** prieigos raktus bei atnaujina juos per
   `https://api2.cursor.sh/auth/exchange_user_api_key`.

Šiam būdui konteinerio viduje nereikia Cursor IDE arba `cursor-agent`.

## Modelių aptikimas

Esant prisijungusiam ryšiui, **Galimi modeliai / Automatinis sinchronizavimas** pirmiausia naudoja Cursor
HTTP `AiService/AvailableModels` katalogą su ryšio Bearer prieigos raktu.
Jei tai nepavyksta, OmniRoute vis tiek bando naudoti pagrindinio kompiuterio `cursor-agent` (kai jis yra), o tada
statinio registro pradinį rinkinį.

OmniRoute kataloge visada pateikia **`auto`** (rodoma kaip „Auto“), taip pat
OpenCodex stiliaus maršruto parinkimo režimus **`auto-cost`**, **`auto-balance`** ir
**`auto-intelligence`**. Persiunčiant jie susiejami su Cursor `default` modeliu
(trims variantams pridedant `optimization` ModelParameter). Kai aukščiausios klasės modelių naudojimo limitas išnaudotas, rinkitės
`cu/auto` — „Auto“ dažnai vis dar turi likusį limitą.

### Sinchronizavus naudojamas tik tiesioginis katalogas

Sėkmingai sinchronizavus Cursor modelius (`cursor-agent --list-models` → išsaugotas
sinchronizuotas katalogas arba pirmiau aprašyta Bearer autentifikuota `AvailableModels` užklausa),
**valdymo skydas**, **`/v1/models`** ir **Tikrinti visus** pateikia:

1. Tiesioginio sinchronizavimo grąžintus modelius
2. Įterptus automatinio maršruto parinkiklio ID: `auto`, `auto-cost`, `auto-balance`, `auto-intelligence`
3. Operatoriaus **pasirinktinius** modelius (importuotus / pridėtus rankiniu būdu) — sinchronizuojant jie niekada nepašalinami

Didelis statinis registras, esantis
`open-sse/config/providers/registry/cursor/`, naudojamas **tik kaip atsarginis variantas neprisijungus**. Kai
sinchronizuotas sąrašas yra tuščias (arba aptikimas nepavyksta), pateikiant sąrašą naudojamas šis registras.

ID su pastangų lygio priesagomis (pavyzdžiui, `claude-4.6-sonnet-high`) vis tiek gali būti
**užklausiami** vykdymo metu: `resolveRequestedModel` pašalina priesagą ir paverčia ją perduodamu
`ModelParameter`. Išskirtinis sąrašas sąmoningai slepia šiuos statinius variantus
nuo funkcijos „Tikrinti visus“, kad patikros atitiktų modelius, kuriuos Cursor iš tikrųjų grąžina kaip pasiekiamus.

### Pagalbinės priemonės

- `providerUsesExclusiveSyncedListing("cursor"|"cu")` —
  `src/lib/providers/modelListingCapability.ts`
- `mergeProviderModelListing` — valdymo skydo sujungimas
- `ensureCursorAutoCatalogEntry` — auto* įterpimas aptinkant ir pateikiant sąrašą
- `shouldSuppressStaticModelForExclusiveListing` — `/v1/models` statinis ciklas

## Teikėjo limitai (kvota)

Cursor skirtoje skiltyje **Naudojimas → Teikėjo limitai** naudojamos Bearer API, esančios `api2.cursor.sh`
(`GetCurrentPeriodUsage` → naudojimo suvestinė → auth/usage), po PKCE arba prieigos rakto
importavimo. Senasis slapukais ir `cursor.com` valdymo skydeliu pagrįstas būdas išlieka paskutiniu atsarginiu variantu
senesnėms iš IDE importuotoms sesijoms.

Languose paprastai pateikiami **Iš viso**, **Auto + Composer** ir **API**. Jei
limitai atrodo tušti, dar kartą atlikite **Prisijungti naudojant Cursor** arba iš naujo importuokite prieigos raktus (vien
IDE importavimas nebėra būtinas).

## Tušti atsakymai / išnaudotas naudojimo limitas

Kai Cursor priima vykdymo užklausą, bet negrąžina asistento teksto (tai dažnai nutinka išnaudojus aukščiausios klasės
modelių naudojimo limitą), OmniRoute pateikia aiškų **429** (kvotos požymiai) arba
**502** su nurodymais, o ne vien tik „Teikėjas grąžino tuščią turinį“. Srautinio perdavimo
klaidos, tokios kaip `not_found: AI Model Not Found` (išnaudotas naudojimo laikotarpio limitas),
klasifikuojamos kaip **viršytas Cursor užklausų dažnio / naudojimo limitas**, o šis pranešimas išsaugomas
visoje SSE grandinėje (bendroji tuščio srauto apsauga neperrašo jau
pateiktos klaidos). Patikrinkite teikėjo limitus, išbandykite modelį **`auto`** arba padidinkite
Cursor plano limitus.

## Kliento versija (be grafinės sąsajos)

Kai nėra vietinio `cursor-agent` diegimo, OmniRoute nustato
`x-cursor-client-version` pirmiausia iš aplinkos kintamojo `CURSOR_AGENT_CLI_VERSION`, tada iš diske podėliuotos
Cursor diegimo scenarijaus analizės, o galiausiai naudoja fiksuotą komponavimo ID. Kai reikia, nurodykite kitą reikšmę naudodami
`CURSOR_AGENT_CLI_VERSION`.

## Atsarginis būdas: rankinis prieigos rakto importavimas

Jei negalite užbaigti prisijungimo naršyklėje:

1. Pagrindiniame kompiuteryje išgaukite prieigos raktus iš Cursor `state.vscdb`:

   ```bash
   sqlite3 "$HOME/Library/Application Support/Cursor/User/globalStorage/state.vscdb" \
     "SELECT key, value FROM ItemTable WHERE key IN ('cursorAuth/accessToken','cursorAuth/refreshToken','storage.serviceMachineId');"
   ```

2. Cursor autentifikavimo modaliniame lange atidarykite **Importuoti prieigos raktą**.
3. Įklijuokite **prieigos raktą** ir, jei turite, **atnaujinimo prieigos raktą** (jis būtinas
   automatiniam atnaujinimui). Įrenginio ID nėra privalomas.

Importavimas tik su prieigos raktu vis tiek veikia, tačiau be atnaujinimo prieigos rakto jo galiojimas pasibaigs —
importuokite iš naujo, kai pokalbyje pradedamos grąžinti autentifikavimo klaidos.

## Susijusi informacija

- Zed naudojimo Docker aplinkoje gairės: [`docs/providers/ZED-DOCKER.md`](./ZED-DOCKER.md)
- OpenCodex prisijungimo prie Cursor nuoroda (išorinė):
  https://github.com/lidge-jun/opencodex/blob/main/src/oauth/cursor.ts
