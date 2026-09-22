# Cursor Provider in Docker Environments (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR-DOCKER.md)

---

Når OmniRoute kører i Docker, mislykkes de ældre flows **Importér fra Cursor IDE** /
`cursor-agent`, fordi containeren ikke kan se værtens Cursor-installation.
Brug i stedet **Log ind med Cursor** (deep-control PKCE).

## Hvorfor IDE-/CLI-import mislykkes i Docker

1. **Filsystemisolering** — Automatisk import leder efter Linux-stier såsom
   `~/.config/Cursor/User/globalStorage/state.vscdb` _inde i_ containeren.
   I Docker Desktop til macOS er værtens IDE-database ikke monteret som
   standard, og containerens operativsystem er Linux, selv når værten er Darwin.
2. **Ingen `cursor-agent`-binærfil** — Officielle OmniRoute-images leveres ikke
   med `cursor-agent`. Tilgængelige modeller kaldte tidligere
   `cursor-agent --list-models` via skallen og faldt tilbage til et statisk katalog.
3. **Forkert binærfil** — Bind-montér **ikke** en macOS-version af
   `cursor-agent` i en Linux-container. Den kan ikke køres.

## Anbefalet: Log ind med Cursor

1. Åbn **Dashboard → Udbydere → Cursor**.
2. Vælg fanen **Log ind med Cursor**.
3. Klik på **Log ind med Cursor** — OmniRoute åbner
   `https://cursor.com/loginDeepControl?…` i din browser på **værten**.
4. Godkend login i browseren, og vend derefter tilbage til dashboardet.
   OmniRoute forespørger løbende `api2.cursor.sh/auth/poll`, indtil tokens modtages.
5. OmniRoute gemmer **adgangs- og opdateringstokens** og opdaterer dem via
   `https://api2.cursor.sh/auth/exchange_user_api_key`.

Denne metode kræver ikke Cursor IDE eller `cursor-agent` inde i containeren.

## Modelregistrering

Med en forbindelse, der er logget ind, foretrækker **Tilgængelige modeller /
Automatisk synkronisering** Cursors HTTP-katalog `AiService/AvailableModels`
ved hjælp af forbindelsens bearer-token. Hvis det mislykkes, forsøger OmniRoute
stadig at bruge værtens `cursor-agent` (når den findes) og derefter det statiske
registergrundlag.

OmniRoute viser altid **`auto`** i kataloget (vist som “Auto”) samt
OpenCodex-lignende routertilstande: **`auto-cost`**, **`auto-balance`** og
**`auto-intelligence`**. Under overførslen knyttes disse til Cursors
`default`-model (med en `optimization`-ModelParameter for de tre varianter).
Foretræk `cu/auto`, når forbruget for premiummodeller er opbrugt — Auto har
ofte stadig tilgængelig kapacitet.

### Livekataloget er eksklusivt efter synkronisering

Efter en vellykket synkronisering af Cursor-modeller
(`cursor-agent --list-models` → et permanent gemt, synkroniseret katalog eller
den bearer-godkendte hentning fra `AvailableModels` ovenfor) viser
**dashboardet**, **`/v1/models`** og **Test alle**:

1. Modeller returneret af livesynkroniseringen
2. Tilføjede auto-router-id'er: `auto`, `auto-cost`, `auto-balance`, `auto-intelligence`
3. Operatørens **brugerdefinerede** modeller (import/manuelt) — fjernes aldrig ved synkronisering

Det store statiske register under
`open-sse/config/providers/registry/cursor/` bruges **kun som offlinereserve**.
Når det synkroniserede katalog er tomt (eller registreringen mislykkes), falder
visningen tilbage til dette register.

Id'er med indsatsniveau som suffiks (for eksempel `claude-4.6-sonnet-high`) kan
stadig **anmod_es om** under kørsel: `resolveRequestedModel` fjerner suffikset og
omdanner det til en `ModelParameter` til overførsel. Den eksklusive visning
skjuler bevidst disse statiske varianter fra Test alle, så sonderingerne svarer
til det, Cursor faktisk returnerer som tilgængeligt.

### Hjælpefunktioner

- `providerUsesExclusiveSyncedListing("cursor"|"cu")` —
  `src/lib/providers/modelListingCapability.ts`
- `mergeProviderModelListing` — sammenfletning på dashboardet
- `ensureCursorAutoCatalogEntry` — tilføjelse af auto* ved registrering og visning
- `shouldSuppressStaticModelForExclusiveListing` — statisk løkke i `/v1/models`

## Udbydergrænser (kvote)

**Forbrug → Udbydergrænser** for Cursor bruger Bearer-API'er på
`api2.cursor.sh` (`GetCurrentPeriodUsage` → forbrugsoversigt → auth/usage) efter
PKCE eller tokenimport. Den ældre dashboardmetode med cookies/`cursor.com`
forbliver en sidste reservemulighed for ældre sessioner importeret fra IDE'en.

Vinduer omfatter typisk **I alt**, **Auto + Composer** og **API**. Hvis
grænserne ser tomme ud, skal du køre **Log ind med Cursor** igen eller
genimportere tokens (IDE-import alene er ikke længere nødvendig).

## Tomme svar / opbrugt forbrug

Når Cursor accepterer en kørsel, men ikke returnerer nogen assistenttekst
(hvilket ofte sker, når premiumforbruget er opbrugt), viser OmniRoute en
handlingsanvisende **429** (kvoteindikatorer) eller **502** med vejledning — ikke
blot “Udbyderen returnerede tomt indhold”. Streamingfejl såsom
`not_found: AI Model Not Found` (forbrugsvinduet er opbrugt) klassificeres som
**Cursor-hastighedsgrænse/forbrug overskredet**, og meddelelsen bevares gennem
SSE-pipelinen (den fælles beskyttelse mod tomme streams overskriver ikke en
fejl, der allerede er udsendt). Kontrollér Udbydergrænser, prøv modellen
**`auto`**, eller hæv grænserne for Cursor-abonnementet.

## Klientversion (uden brugergrænseflade)

Uden en lokal installation af `cursor-agent` finder OmniRoute værdien for
`x-cursor-client-version` via miljøvariablen `CURSOR_AGENT_CLI_VERSION`, derefter
via en disk-cachet scraping af Cursor-installationsscriptet og til sidst via et
fastlåst build-id. Tilsidesæt med `CURSOR_AGENT_CLI_VERSION`, når det er
nødvendigt.

## Reserveløsning: Manuel tokenimport

Hvis du ikke kan fuldføre browserlogin:

1. Udtræk tokens fra Cursors `state.vscdb` på værten:

   ```bash
   sqlite3 "$HOME/Library/Application Support/Cursor/User/globalStorage/state.vscdb" \
     "SELECT key, value FROM ItemTable WHERE key IN ('cursorAuth/accessToken','cursorAuth/refreshToken','storage.serviceMachineId');"
   ```

2. Åbn **Importér token** i dialogboksen til Cursor-godkendelse.
3. Indsæt **adgangstokenet** og, når det er tilgængeligt,
   **opdateringstokenet** (påkrævet for automatisk opdatering). Maskin-id er
   valgfrit.

Importer med kun et adgangstoken fungerer stadig, men udløber uden et
opdateringstoken — importér igen, når chatten returnerer godkendelsesfejl.

## Relateret

- Docker-vejledning til Zed: [`docs/providers/ZED-DOCKER.md`](./ZED-DOCKER.md)
- OpenCodex-reference til Cursor-login (ekstern):
  https://github.com/lidge-jun/opencodex/blob/main/src/oauth/cursor.ts
