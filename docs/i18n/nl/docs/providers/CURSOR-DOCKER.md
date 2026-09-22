# Cursor Provider in Docker Environments (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR-DOCKER.md)

---

Wanneer OmniRoute binnen Docker wordt uitgevoerd, werken de verouderde flows **Importeren uit Cursor IDE** /
`cursor-agent` niet, omdat de container de Cursor-installatie op de host niet kan
zien. Gebruik in plaats daarvan **Inloggen met Cursor** (deep-control PKCE).

## Waarom importeren uit de IDE / CLI niet werkt in Docker

1. **Isolatie van het bestandssysteem** — Automatisch importeren zoekt naar Linux-paden zoals
   `~/.config/Cursor/User/globalStorage/state.vscdb` _binnen_ de container.
   In Docker Desktop voor macOS wordt de IDE-database van de host standaard niet gekoppeld, en
   het besturingssysteem van de container is Linux, zelfs wanneer de host Darwin gebruikt.
2. **Geen `cursor-agent`-binair bestand** — Officiële OmniRoute-images bevatten geen
   `cursor-agent`. Beschikbare modellen werden voorheen opgehaald door
   `cursor-agent --list-models` uit te voeren, met een statische catalogus als fallback.
3. **Verkeerd binair bestand** — Koppel **geen** macOS-versie van `cursor-agent` via een bind mount aan een Linux-
   container. Deze kan daar niet worden uitgevoerd.

## Aanbevolen: Inloggen met Cursor

1. Open **Dashboard → Providers → Cursor**.
2. Kies het tabblad **Inloggen met Cursor**.
3. Klik op **Inloggen met Cursor** — OmniRoute opent
   `https://cursor.com/loginDeepControl?…` in de browser op uw **host**.
4. Bevestig de aanmelding in de browser en ga vervolgens terug naar het dashboard. OmniRoute
   pollt `api2.cursor.sh/auth/poll` totdat de tokens beschikbaar zijn.
5. OmniRoute slaat **toegangs- en vernieuwingstokens** op en vernieuwt deze via
   `https://api2.cursor.sh/auth/exchange_user_api_key`.

Voor deze methode zijn Cursor IDE en `cursor-agent` niet vereist in de container.

## Modeldetectie

Met een aangemelde verbinding geven **Beschikbare modellen / Automatische synchronisatie** de voorkeur aan de
HTTP-catalogus `AiService/AvailableModels` van Cursor, met het bearer-token van de verbinding.
Als dat mislukt, probeert OmniRoute alsnog `cursor-agent` op de host (indien aanwezig), gevolgd door
de statische registerseed.

OmniRoute toont **`auto`** altijd in de catalogus (weergavenaam “Auto”), plus
routermodi in OpenCodex-stijl: **`auto-cost`**, **`auto-balance`** en
**`auto-intelligence`**. In de communicatie met Cursor worden deze gekoppeld aan het model `default`
(met een `optimization`-`ModelParameter` voor de drie varianten). Geef de voorkeur aan
`cu/auto` wanneer het gebruik van premiummodellen is uitgeput — Auto heeft vaak nog wel budget.

### De livecatalogus is exclusief wanneer deze is gesynchroniseerd

Na een geslaagde synchronisatie van Cursor-modellen (`cursor-agent --list-models` → opgeslagen
gesynchroniseerde catalogus, of het hierboven genoemde met bearer geauthenticeerde verzoek naar `AvailableModels`) tonen het
**dashboard**, **`/v1/models`** en **Alles testen**:

1. Modellen die door de live synchronisatie zijn geretourneerd
2. Toegevoegde auto-router-id's: `auto`, `auto-cost`, `auto-balance`, `auto-intelligence`
3. **Aangepaste** modellen van de beheerder (import / handmatig) — deze worden nooit door synchronisatie verwijderd

Het grote statische register onder
`open-sse/config/providers/registry/cursor/` dient **alleen als offline fallback**. Wanneer
de gesynchroniseerde catalogus leeg is (of detectie mislukt), valt de lijst terug op dat register.

Id's met een inspanningsachtervoegsel (bijvoorbeeld `claude-4.6-sonnet-high`) kunnen tijdens runtime nog steeds worden
**aangevraagd**: `resolveRequestedModel` verwijdert het achtervoegsel en zet dit om in een
`ModelParameter` voor de communicatie. De exclusieve lijst verbergt deze statische varianten bewust
voor Alles testen, zodat de controles overeenkomen met wat Cursor daadwerkelijk als beschikbaar retourneert.

### Helpers

- `providerUsesExclusiveSyncedListing("cursor"|"cu")` —
  `src/lib/providers/modelListingCapability.ts`
- `mergeProviderModelListing` — samenvoeging voor het dashboard
- `ensureCursorAutoCatalogEntry` — auto*-toevoeging bij detectie en weergave
- `shouldSuppressStaticModelForExclusiveListing` — statische lus van `/v1/models`

## Providerlimieten (quotum)

**Gebruik → Providerlimieten** gebruikt voor Cursor Bearer-API's op `api2.cursor.sh`
(`GetCurrentPeriodUsage` → gebruiksoverzicht → auth/usage) na PKCE of het
importeren van tokens. Het verouderde dashboardpad via cookies/`cursor.com` blijft als laatste fallback
beschikbaar voor oudere sessies die uit de IDE zijn geïmporteerd.

Vensters bevatten doorgaans **Totaal**, **Auto + Composer** en **API**. Als
de limieten leeg lijken, voert u **Inloggen met Cursor** opnieuw uit of importeert u de tokens opnieuw (alleen importeren uit de IDE
is niet langer vereist).

## Lege beurten / gebruik uitgeput

Wanneer Cursor een Run accepteert maar geen assistenttekst retourneert (wat vaak voorkomt wanneer het gebruik van
premiumfuncties is uitgeput), toont OmniRoute een bruikbare **429** (quotumaanwijzingen) of
**502** met instructies — niet alleen “Provider returned empty content”. Streamingfouten
zoals `not_found: AI Model Not Found` (gebruiksvenster uitgeput) worden
geclassificeerd als **Cursor-snelheidslimiet / gebruik overschreden** en behouden die melding
in de volledige SSE-pijplijn (de gedeelde beveiliging tegen lege streams overschrijft een
reeds verzonden fout niet). Controleer Providerlimieten, probeer model **`auto`** of verhoog
de limieten van het Cursor-abonnement.

## Clientversie (headless)

Zonder een lokale installatie van `cursor-agent` bepaalt OmniRoute
`x-cursor-client-version` via de omgevingsvariabele `CURSOR_AGENT_CLI_VERSION`, vervolgens via een op schijf gecachte
scrape van het Cursor-installatiescript en ten slotte via een vastgezette build-id. Overschrijf dit indien nodig met
`CURSOR_AGENT_CLI_VERSION`.

## Fallback: Handmatig tokens importeren

Als u de aanmelding via de browser niet kunt voltooien:

1. Haal op de host de tokens uit `state.vscdb`:

   ```bash
   sqlite3 "$HOME/Library/Application Support/Cursor/User/globalStorage/state.vscdb" \
     "SELECT key, value FROM ItemTable WHERE key IN ('cursorAuth/accessToken','cursorAuth/refreshToken','storage.serviceMachineId');"
   ```

2. Open **Token importeren** in het Cursor-authenticatievenster.
3. Plak het **toegangstoken** en, indien beschikbaar, het **vernieuwingstoken** (vereist voor
   automatische vernieuwing). De machine-id is optioneel.

Import met alleen een toegangstoken werkt nog steeds, maar verloopt zonder vernieuwingstoken —
importeer opnieuw wanneer chat authenticatiefouten retourneert.

## Gerelateerd

- Zed Docker-handleiding: [`docs/providers/ZED-DOCKER.md`](./ZED-DOCKER.md)
- Referentie voor aanmelden bij Cursor vanuit OpenCodex (extern):
  https://github.com/lidge-jun/opencodex/blob/main/src/oauth/cursor.ts
