# Cursor Provider in Docker Environments (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR-DOCKER.md)

---

Kui OmniRoute töötab Dockeris, ei toimi pärandvood **Import from Cursor IDE** /
`cursor-agent`, sest konteiner ei pääse hosti Cursor'i installile ligi. Kasutage
selle asemel valikut **Login with Cursor** (deep-control PKCE).

## Miks IDE / CLI import Dockeris ei toimi

1. **Failisüsteemi isolatsioon** — automaatne import otsib Linuxi teid, näiteks
   `~/.config/Cursor/User/globalStorage/state.vscdb`, _konteineri seest_.
   Docker Desktopis macOS-i jaoks ei haagita hosti IDE andmebaasi vaikimisi ning
   konteineri operatsioonisüsteem on Linux isegi siis, kui host kasutab Darwinit.
2. **Binaarfail `cursor-agent` puudub** — ametlikud OmniRoute'i tõmmised ei sisalda
   `cursor-agent`-i. Available Models käivitas varem käsurealt
   `cursor-agent --list-models` ja tõrke korral kasutas staatilist kataloogi.
3. **Vale binaarfail** — ärge haakige macOS-i `cursor-agent`-i bind-mount-meetodil
   Linuxi konteinerisse. Seda ei saa seal käivitada.

## Soovitus: Cursoriga sisselogimine

1. Avage **Dashboard → Providers → Cursor**.
2. Valige vahekaart **Login with Cursor**.
3. Klõpsake **Login with Cursor** — OmniRoute avab aadressi
   `https://cursor.com/loginDeepControl?…` teie **hosti** brauseris.
4. Kinnitage brauseris sisselogimine ja naaske seejärel juhtpaneelile. OmniRoute
   küsitleb aadressi `api2.cursor.sh/auth/poll`, kuni saabub token.
5. OmniRoute salvestab **juurdepääsu- ja värskendustokenid** ning värskendab neid
   aadressi `https://api2.cursor.sh/auth/exchange_user_api_key` kaudu.

See lahendus ei nõua konteineris Cursor IDE-d ega `cursor-agent`-i.

## Mudelite tuvastamine

Sisselogitud ühenduse korral eelistab **Available Models / Auto-Sync** Cursor'i
HTTP-kataloogi `AiService/AvailableModels`, kasutades ühenduse kandjatokenit.
Kui see ebaõnnestub, proovib OmniRoute siiski hosti `cursor-agent`-i (kui see on
olemas) ja seejärel staatilise registri algandmeid.

OmniRoute kuvab kataloogis alati mudeli **`auto`** (kuvatav nimi „Auto”) ning
OpenCodexi-laadsed marsruutimisrežiimid **`auto-cost`**, **`auto-balance`** ja
**`auto-intelligence`**. Andmeedastuses vastavad need Cursor'i mudelile
`default` (kolme variandi puhul koos parameetriga `optimization`
ModelParameteris). Eelistage `cu/auto`, kui premium-mudelite kasutusmaht on
ammendunud — Autol on sageli veel eelarvet.

### Sünkroonimise korral kasutatakse ainult reaalajas kataloogi

Pärast Cursor'i mudelite edukat sünkroonimist (`cursor-agent --list-models` →
salvestatud sünkroonitud kataloog või eespool kirjeldatud kandjaautenditud
`AvailableModels`-i päring) loetlevad **dashboard**, **`/v1/models`** ja
**Test All** järgmise:

1. Reaalajas sünkroonimise tagastatud mudelid
2. Lisatud automaatmarsruuteri ID-d: `auto`, `auto-cost`, `auto-balance`, `auto-intelligence`
3. Operaatori **kohandatud** mudelid (import / käsitsi lisamine) — sünkroonimine ei eemalda neid kunagi

Mahukas staatiline register asukohas
`open-sse/config/providers/registry/cursor/` on mõeldud **ainult võrguühenduseta
varuvariandiks**. Kui sünkroonitud loend on tühi (või tuvastamine ebaõnnestub),
kasutatakse loendi jaoks seda registrit.

Pingutustaset tähistava järelliitega ID-sid (näiteks
`claude-4.6-sonnet-high`) saab käitusajal endiselt **pärida**:
`resolveRequestedModel` eemaldab järelliite ja teisendab selle andmeedastuse
`ModelParameter`-iks. Ainult sünkroonitud loendi kuvamisel peidetakse need
staatilised variandid sihilikult Test Alli eest, et kontrollid vastaksid
mudelitele, mille Cursor tegelikult saadaval olevatena tagastab.

### Abifunktsioonid

- `providerUsesExclusiveSyncedListing("cursor"|"cu")` —
  `src/lib/providers/modelListingCapability.ts`
- `mergeProviderModelListing` — juhtpaneeli loendite liitmine
- `ensureCursorAutoCatalogEntry` — auto* lisamine tuvastamise ja loendi koostamise ajal
- `shouldSuppressStaticModelForExclusiveListing` — `/v1/models`-i staatiline tsükkel

## Teenusepakkuja limiidid (kvoot)

Cursor'i **Usage → Provider Limits** kasutab pärast PKCE-d või tokeni importimist
aadressil `api2.cursor.sh` kandja-API-sid (`GetCurrentPeriodUsage` →
kasutuskokkuvõte → auth/usage). Pärandküpsisel ja `cursor.com`-i juhtpaneelil
põhinev tee jääb viimaseks varuvariandiks vanematele IDE-st imporditud
seanssidele.

Aknad sisaldavad tavaliselt jaotisi **Total**, **Auto + Composer** ja **API**.
Kui limiidid näivad tühjad, käivitage uuesti **Login with Cursor** või importige
tokenid uuesti (ainult IDE-st importimine pole enam nõutav).

## Tühjad vastused / kasutusmaht ammendunud

Kui Cursor võtab Run-päringu vastu, kuid ei tagasta assistendi teksti (see on
tavaline premium-kasutusmahu ammendumisel), kuvab OmniRoute selgete
tegutsemisjuhistega vea **429** (kvoodile viitavate tunnuste korral) või **502**
— mitte lihtsalt teadet „Provider returned empty content”. Voogedastuse tõrked,
nagu `not_found: AI Model Not Found` (kasutusperioodi mahu ammendumisel),
liigitatakse veaks **Cursor rate limit / usage exceeded** ning see teade säilib
kogu SSE-konveieris (ühine tühja voo kaitse ei kirjuta juba väljastatud viga
üle). Kontrollige Provider Limitsi, proovige mudelit **`auto`** või suurendage
Cursor'i paketi limiite.

## Kliendiversioon (ilma kasutajaliideseta)

Kui kohalikku `cursor-agent`-i installi pole, määrab OmniRoute
`x-cursor-client-version`-i esmalt keskkonnamuutuja
`CURSOR_AGENT_CLI_VERSION` järgi, seejärel Cursor'i installiskripti kettale
vahemällu salvestatud analüüsi põhjal ning lõpuks fikseeritud järgu-ID järgi.
Vajaduse korral määrake väärtus keskkonnamuutujaga
`CURSOR_AGENT_CLI_VERSION`.

## Varuvariant: tokeni käsitsi importimine

Kui te ei saa brauseris sisselogimist lõpule viia:

1. Eraldage hostis tokenid Cursor'i failist `state.vscdb`:

   ```bash
   sqlite3 "$HOME/Library/Application Support/Cursor/User/globalStorage/state.vscdb" \
     "SELECT key, value FROM ItemTable WHERE key IN ('cursorAuth/accessToken','cursorAuth/refreshToken','storage.serviceMachineId');"
   ```

2. Avage Cursor'i autentimisdialoogis **Import token**.
3. Kleepige **Access Token** ja võimaluse korral **Refresh Token** (nõutav
   automaatseks värskendamiseks). Machine ID on valikuline.

Ainult juurdepääsutokeni importimine toimib samuti, kuid ilma värskendustokenita
see aegub — importige token uuesti, kui vestlus hakkab tagastama
autentimisvigu.

## Seotud materjalid

- Zedi Dockeri juhend: [`docs/providers/ZED-DOCKER.md`](./ZED-DOCKER.md)
- OpenCodexi Cursor'i sisselogimise viide (väline):
  https://github.com/lidge-jun/opencodex/blob/main/src/oauth/cursor.ts
