# Cursor Provider in Docker Environments (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR-DOCKER.md)

---

Kad OmniRoute darbojas Docker vidē, mantotās **Importēt no Cursor IDE** /
`cursor-agent` plūsmas nedarbojas, jo konteiners nevar piekļūt resursdatorā
instalētajam Cursor. Tā vietā izmantojiet **Pieteikties ar Cursor** (dziļās vadības PKCE).

## Kāpēc IDE / CLI importēšana Docker vidē nedarbojas

1. **Failu sistēmas izolācija** — automātiskā importēšana meklē Linux ceļus, piemēram,
   `~/.config/Cursor/User/globalStorage/state.vscdb`, _konteinera iekšienē_.
   Docker Desktop vidē operētājsistēmai macOS resursdatora IDE datubāze pēc noklusējuma
   nav montēta, un konteinera operētājsistēma ir Linux pat tad, ja resursdators izmanto Darwin.
2. **Nav `cursor-agent` binārā faila** — oficiālajos OmniRoute attēlos nav iekļauts
   `cursor-agent`. Iepriekš pieejamo modeļu iegūšanai tika izpildīts
   `cursor-agent --list-models`, bet kļūmes gadījumā tika izmantots statisks katalogs.
3. **Nepareizs binārais fails** — **nemontējiet** macOS `cursor-agent` Linux
   konteinerā, izmantojot bind mount. Tas netiks izpildīts.

## Ieteicams: pieteikšanās ar Cursor

1. Atveriet **Informācijas panelis → Nodrošinātāji → Cursor**.
2. Izvēlieties cilni **Pieteikties ar Cursor**.
3. Noklikšķiniet uz **Pieteikties ar Cursor** — OmniRoute jūsu **resursdatora**
   pārlūkprogrammā atvērs `https://cursor.com/loginDeepControl?…`.
4. Apstipriniet pieteikšanos pārlūkprogrammā un pēc tam atgriezieties informācijas panelī. OmniRoute
   aptaujās `api2.cursor.sh/auth/poll`, līdz tiks saņemti pilnvarojuma marķieri.
5. OmniRoute saglabā **piekļuves un atsvaidzināšanas** marķierus un atsvaidzina tos, izmantojot
   `https://api2.cursor.sh/auth/exchange_user_api_key`.

Šim ceļam konteinera iekšienē nav nepieciešams Cursor IDE vai `cursor-agent`.

## Modeļu atklāšana

Ja savienojumā ir veikta pieteikšanās, **Pieejamie modeļi / Automātiskā sinhronizācija** dod priekšroku Cursor
HTTP `AiService/AvailableModels` katalogam, izmantojot savienojuma nesēja marķieri.
Ja tas neizdodas, OmniRoute joprojām mēģina izmantot resursdatora `cursor-agent` (ja tas ir pieejams) un pēc tam
statiskā reģistra sākotnējos datus.

OmniRoute katalogā vienmēr nodrošina **`auto`** (attēlojamais nosaukums “Automātiski”), kā arī
OpenCodex stila maršrutētāja režīmus **`auto-cost`**, **`auto-balance`** un
**`auto-intelligence`**. Pārsūtīšanas laikā tie tiek kartēti uz Cursor `default` modeli
(ar `optimization` ModelParameter trim variantiem). Dodiet priekšroku
`cu/auto`, kad premium modeļu lietojuma limits ir izsmelts — automātiskajam režīmam bieži vēl ir pieejams limits.

### Sinhronizētais aktīvais katalogs ir ekskluzīvs

Pēc veiksmīgas Cursor modeļu sinhronizācijas (`cursor-agent --list-models` → saglabāts
sinhronizētais katalogs vai iepriekš minētā ar nesēja marķieri autentificētā `AvailableModels` iegūšana)
**informācijas panelī**, **`/v1/models`** un sarakstā **Testēt visus** tiek rādīti:

1. Aktīvās sinhronizācijas atgrieztie modeļi
2. Pievienotie automātiskā maršrutētāja ID: `auto`, `auto-cost`, `auto-balance`, `auto-intelligence`
3. Operatora **pielāgotie** modeļi (importēti / manuāli pievienoti) — sinhronizācija tos nekad nenoņem

Lielais statiskais reģistrs direktorijā
`open-sse/config/providers/registry/cursor/` ir paredzēts **tikai bezsaistes atkāpšanās režīmam**. Ja
sinhronizētais katalogs ir tukšs (vai atklāšana neizdodas), modeļu uzskaitīšanai tiek izmantots šis reģistrs.

ID ar piepūles līmeņa sufiksu (piemēram, `claude-4.6-sonnet-high`) joprojām var
**pieprasīt** izpildlaikā: `resolveRequestedModel` noņem sufiksu, pārveidojot to par pārsūtāmu
`ModelParameter`. Ekskluzīvā uzskaitīšana apzināti paslēpj šos statiskos variantus
no **Testēt visus**, lai pārbaudes atbilstu modeļiem, kurus Cursor faktiski norāda kā pieejamus.

### Palīgfunkcijas

- `providerUsesExclusiveSyncedListing("cursor"|"cu")` —
  `src/lib/providers/modelListingCapability.ts`
- `mergeProviderModelListing` — informācijas paneļa sapludināšana
- `ensureCursorAutoCatalogEntry` — auto* pievienošana atklāšanas un uzskaitīšanas laikā
- `shouldSuppressStaticModelForExclusiveListing` — `/v1/models` statiskā cilpa

## Nodrošinātāja limiti (kvota)

Cursor sadaļā **Lietojums → Nodrošinātāja limiti** pēc PKCE vai marķieru
importēšanas tiek izmantotas `api2.cursor.sh` nesēja API
(`GetCurrentPeriodUsage` → lietojuma kopsavilkums → auth/usage). Mantotais sīkfailu/`cursor.com`
informācijas paneļa ceļš joprojām ir pēdējā atkāpšanās iespēja vecākām sesijām,
kas importētas no IDE.

Logi parasti ietver **Kopā**, **Auto + Composer** un **API**. Ja
limiti tiek rādīti tukši, vēlreiz izpildiet **Pieteikties ar Cursor** vai atkārtoti importējiet marķierus (importēšana
tikai no IDE vairs nav nepieciešama).

## Tukšas atbildes / izsmelts lietojuma limits

Kad Cursor pieņem izpildes pieprasījumu, bet neatgriež asistenta tekstu (tas bieži notiek, kad ir izsmelts
premium lietojuma limits), OmniRoute parāda noderīgu **429** kļūdu (ar kvotas norādēm) vai
**502** kļūdu ar ieteikumiem, nevis tikai “Nodrošinātājs atgrieza tukšu saturu”. Straumēšanas
kļūmes, piemēram, `not_found: AI Model Not Found` (lietojuma logs ir izsmelts), tiek
klasificētas kā **pārsniegts Cursor ātruma / lietojuma limits**, un šis ziņojums tiek saglabāts
visā SSE konveijerā (koplietotā tukšās straumes aizsardzība nepārraksta jau
izvadītu kļūdu). Pārbaudiet nodrošinātāja limitus, izmēģiniet modeli **`auto`** vai palieliniet
Cursor plāna limitus.

## Klienta versija (bez grafiskās saskarnes)

Ja nav lokāli instalēta `cursor-agent`, OmniRoute nosaka
`x-cursor-client-version`, vispirms izmantojot vides mainīgo `CURSOR_AGENT_CLI_VERSION`, pēc tam diskā kešotu
Cursor instalēšanas skripta izgūšanu un visbeidzot fiksētu būvējuma ID. Ja nepieciešams,
norādiet citu vērtību ar `CURSOR_AGENT_CLI_VERSION`.

## Atkāpšanās iespēja: manuāla marķieru importēšana

Ja nevarat pabeigt pieteikšanos pārlūkprogrammā:

1. Resursdatorā izgūstiet marķierus no Cursor `state.vscdb`:

   ```bash
   sqlite3 "$HOME/Library/Application Support/Cursor/User/globalStorage/state.vscdb" \
     "SELECT key, value FROM ItemTable WHERE key IN ('cursorAuth/accessToken','cursorAuth/refreshToken','storage.serviceMachineId');"
   ```

2. Cursor autentifikācijas modālajā logā atveriet **Importēt marķieri**.
3. Ielīmējiet **piekļuves marķieri** un, ja pieejams, **atsvaidzināšanas marķieri** (nepieciešams
   automātiskai atsvaidzināšanai). Iekārtas ID nav obligāts.

Importēšana tikai ar piekļuves marķieri joprojām darbojas, taču bez atsvaidzināšanas marķiera tā derīguma termiņš beigsies —
importējiet to atkārtoti, kad tērzēšana sāk atgriezt autentifikācijas kļūdas.

## Saistītā informācija

- Zed Docker norādījumi: [`docs/providers/ZED-DOCKER.md`](./ZED-DOCKER.md)
- OpenCodex Cursor pieteikšanās atsauce (ārēja):
  https://github.com/lidge-jun/opencodex/blob/main/src/oauth/cursor.ts
