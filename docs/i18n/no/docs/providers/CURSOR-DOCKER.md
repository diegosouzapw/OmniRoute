# Cursor Provider in Docker Environments (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR-DOCKER.md)

---

Når OmniRoute kjører i Docker, mislykkes de eldre flytene **Importer fra Cursor IDE** /
`cursor-agent` fordi containeren ikke kan se Cursor-installasjonen på verten.
Bruk **Logg inn med Cursor** (deep-control PKCE) i stedet.

## Hvorfor import fra IDE / CLI mislykkes i Docker

1. **Filsystemisolasjon** — Automatisk import ser etter Linux-baner som
   `~/.config/Cursor/User/globalStorage/state.vscdb` _inne i_ containeren.
   I Docker Desktop for macOS er IDE-databasen på verten ikke montert som
   standard, og containerens operativsystem er Linux selv når verten er Darwin.
2. **Ingen `cursor-agent`-binærfil** — Offisielle OmniRoute-avbildninger
   inkluderer ikke `cursor-agent`. Tilgjengelige modeller kjørte tidligere
   `cursor-agent --list-models` og falt tilbake til en statisk katalog.
3. **Feil binærfil** — Du må **ikke** bind-montere en macOS-versjon av
   `cursor-agent` i en Linux-container. Den vil ikke kunne kjøres.

## Anbefalt: Logg inn med Cursor

1. Åpne **Kontrollpanel → Leverandører → Cursor**.
2. Velg fanen **Logg inn med Cursor**.
3. Klikk på **Logg inn med Cursor** — OmniRoute åpner
   `https://cursor.com/loginDeepControl?…` i nettleseren på **verten**.
4. Godkjenn innloggingen i nettleseren, og gå deretter tilbake til
   kontrollpanelet. OmniRoute spør `api2.cursor.sh/auth/poll` gjentatte ganger
   frem til tokener mottas.
5. OmniRoute lagrer **tilgangs- og oppdateringstokener** og fornyer dem via
   `https://api2.cursor.sh/auth/exchange_user_api_key`.

Denne fremgangsmåten krever ikke Cursor IDE eller `cursor-agent` inne i
containeren.

## Modelloppdagelse

Med en innlogget tilkobling foretrekker **Tilgjengelige modeller / Automatisk
synkronisering** Cursors HTTP-katalog `AiService/AvailableModels` ved bruk av
tilkoblingens bearer-token. Hvis dette mislykkes, forsøker OmniRoute fortsatt
å bruke vertens `cursor-agent` (når den finnes), og deretter den statiske
registerstartkatalogen.

OmniRoute viser alltid **`auto`** i katalogen (vises som «Auto»), i tillegg til
OpenCodex-lignende rutermoduser: **`auto-cost`**, **`auto-balance`** og
**`auto-intelligence`**. Over forbindelsen tilordnes disse Cursors
`default`-modell (med en `optimization`-ModelParameter for de tre variantene).
Foretrekk `cu/auto` når bruken av premiummodeller er oppbrukt — Auto har ofte
fortsatt tilgjengelig kvote.

### Live-katalogen er eksklusiv når den er synkronisert

Etter en vellykket synkronisering av Cursor-modeller
(`cursor-agent --list-models` → lagret synkronisert katalog, eller den
bearer-autentiserte `AvailableModels`-hentingen ovenfor), viser
**kontrollpanelet**, **`/v1/models`** og **Test alle**:

1. Modeller returnert av live-synkroniseringen
2. Innsatte ID-er for automatiske rutere: `auto`, `auto-cost`, `auto-balance`, `auto-intelligence`
3. Operatørens **egendefinerte** modeller (importerte / manuelle) — fjernes aldri av synkronisering

Det store statiske registeret under
`open-sse/config/providers/registry/cursor/` brukes **bare som reservemekanisme
uten nettilgang**. Når den synkroniserte katalogen er tom (eller oppdagelsen
mislykkes), faller oppføringen tilbake til dette registeret.

ID-er med suffiks for innsatsnivå (for eksempel `claude-4.6-sonnet-high`) kan
fortsatt **forespørres** under kjøring: `resolveRequestedModel` fjerner suffikset
og gjør det til en `ModelParameter` for overføringen. Den eksklusive oppføringen
skjuler bevisst disse statiske variantene fra Test alle, slik at testene
samsvarer med det Cursor faktisk returnerer som tilgjengelig.

### Hjelpefunksjoner

- `providerUsesExclusiveSyncedListing("cursor"|"cu")` —
  `src/lib/providers/modelListingCapability.ts`
- `mergeProviderModelListing` — sammenslåing i kontrollpanelet
- `ensureCursorAutoCatalogEntry` — innsetting av auto* ved oppdagelse og oppføring
- `shouldSuppressStaticModelForExclusiveListing` — statisk løkke for `/v1/models`

## Leverandørgrenser (kvote)

**Bruk → Leverandørgrenser** for Cursor bruker Bearer-API-er på
`api2.cursor.sh` (`GetCurrentPeriodUsage` → brukssammendrag → auth/usage) etter
PKCE eller tokenimport. Den eldre dashboard-flyten med informasjonskapsler /
`cursor.com` beholdes som en siste reservemekanisme for eldre økter importert
fra IDE-en.

Vinduer inkluderer vanligvis **Totalt**, **Auto + Composer** og **API**. Hvis
grensene ser tomme ut, kjører du **Logg inn med Cursor** på nytt eller
importerer tokenene på nytt (IDE-import alene er ikke lenger nødvendig).

## Tomme runder / oppbrukt kvote

Når Cursor godtar en kjøring, men ikke returnerer noen assistenttekst (noe som
er vanlig når premiumbruken er oppbrukt), viser OmniRoute en handlingsrettet
**429** (kvoteindikasjoner) eller **502** med veiledning — ikke bare «Leverandøren
returnerte tomt innhold». Strømmefeil som
`not_found: AI Model Not Found` (bruksperioden er oppbrukt) klassifiseres som
**Cursors hastighetsgrense / bruk overskredet**, og denne meldingen beholdes
gjennom SSE-kjeden (den delte beskyttelsen mot tomme strømmer overskriver ikke
en feil som allerede er sendt). Kontroller Leverandørgrenser, prøv modellen
**`auto`**, eller øk grensene for Cursor-abonnementet.

## Klientversjon (hodeløs)

Uten en lokal installasjon av `cursor-agent` finner OmniRoute
`x-cursor-client-version` via miljøvariabelen `CURSOR_AGENT_CLI_VERSION`,
deretter via en diskbufret uthenting fra Cursor-installasjonsskriptet, og til
slutt via en fastlåst build-ID. Overstyr med `CURSOR_AGENT_CLI_VERSION` ved
behov.

## Reserveløsning: Manuell tokenimport

Hvis du ikke kan fullføre nettleserinnloggingen:

1. Hent ut tokener fra Cursors `state.vscdb` på verten:

   ```bash
   sqlite3 "$HOME/Library/Application Support/Cursor/User/globalStorage/state.vscdb" \
     "SELECT key, value FROM ItemTable WHERE key IN ('cursorAuth/accessToken','cursorAuth/refreshToken','storage.serviceMachineId');"
   ```

2. Åpne **Importer token** i dialogboksen for Cursor-autentisering.
3. Lim inn **Tilgangstoken** og, når det er tilgjengelig, **Oppdateringstoken**
   (kreves for automatisk fornyelse). Maskin-ID er valgfri.

Importer med bare tilgangstoken fungerer fortsatt, men utløper uten et
oppdateringstoken — importer på nytt når chatten returnerer
autentiseringsfeil.

## Relatert

- Docker-veiledning for Zed: [`docs/providers/ZED-DOCKER.md`](./ZED-DOCKER.md)
- Referanse for Cursor-innlogging i OpenCodex (ekstern):
  https://github.com/lidge-jun/opencodex/blob/main/src/oauth/cursor.ts
