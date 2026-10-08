# Cursor Provider in Docker Environments (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR-DOCKER.md)

---

När OmniRoute körs i Docker misslyckas de äldre flödena **Importera från Cursor IDE** /
`cursor-agent` eftersom containern inte kan se värddatorns Cursor-installation.
Använd **Logga in med Cursor** (deep-control PKCE) i stället.

## Varför IDE-/CLI-import misslyckas i Docker

1. **Filsystemsisolering** — Automatisk import söker efter Linux-sökvägar som
   `~/.config/Cursor/User/globalStorage/state.vscdb` _inuti_ containern.
   I Docker Desktop för macOS monteras värddatorns IDE-databas inte som standard,
   och containerns operativsystem är Linux även när värddatorn kör Darwin.
2. **Ingen `cursor-agent`-binärfil** — Officiella OmniRoute-avbilder innehåller
   inte `cursor-agent`. Tillgängliga modeller körde tidigare
   `cursor-agent --list-models` i ett skal och föll tillbaka till en statisk katalog.
3. **Fel binärfil** — Bindmontera **inte** en `cursor-agent` för macOS i en
   Linux-container. Den kommer inte att kunna köras.

## Rekommenderat: Logga in med Cursor

1. Öppna **Kontrollpanel → Leverantörer → Cursor**.
2. Välj fliken **Logga in med Cursor**.
3. Klicka på **Logga in med Cursor** — OmniRoute öppnar
   `https://cursor.com/loginDeepControl?…` i webbläsaren på din **värddator**.
4. Godkänn inloggningen i webbläsaren och återgå sedan till kontrollpanelen.
   OmniRoute avfrågar `api2.cursor.sh/auth/poll` tills token erhålls.
5. OmniRoute lagrar token för både **åtkomst och uppdatering** och uppdaterar dem via
   `https://api2.cursor.sh/auth/exchange_user_api_key`.

Den här metoden kräver inte Cursor IDE eller `cursor-agent` inuti containern.

## Modellidentifiering

Med en inloggad anslutning föredrar **Tillgängliga modeller/Automatisk synkronisering**
Cursors HTTP-katalog `AiService/AvailableModels` med anslutningens Bearer-token.
Om det misslyckas försöker OmniRoute fortfarande använda värddatorns
`cursor-agent` (när den finns) och därefter den statiska registerbasen.

OmniRoute visar alltid **`auto`** i katalogen (visningsnamn ”Auto”) samt
routerlägen i OpenCodex-stil: **`auto-cost`**, **`auto-balance`** och
**`auto-intelligence`**. I protokollet motsvarar dessa Cursors `default`-modell
(med en `optimization`-ModelParameter för de tre varianterna). Föredra
`cu/auto` när användningsutrymmet för premiummodeller är slut — Auto har ofta
fortfarande tillgänglig budget.

### Livekatalogen används exklusivt efter synkronisering

Efter en lyckad synkronisering av Cursor-modeller (`cursor-agent --list-models` →
beständigt lagrad synkroniserad katalog, eller den Bearer-autentiserade hämtningen
från `AvailableModels` ovan) visar **kontrollpanelen**, **`/v1/models`** och
**Testa alla**:

1. Modeller som returneras av livesynkroniseringen
2. Inmatade ID:n för automatiska routrar: `auto`, `auto-cost`, `auto-balance`, `auto-intelligence`
3. Operatörens **anpassade** modeller (importerade/manuella) — tas aldrig bort vid synkronisering

Det stora statiska registret under
`open-sse/config/providers/registry/cursor/` används **endast som offlinereserv**.
När den synkroniserade katalogen är tom (eller identifieringen misslyckas) faller
listningen tillbaka till det registret.

ID:n med ansträngningssuffix (till exempel `claude-4.6-sonnet-high`) kan
fortfarande **begäras** vid körning: `resolveRequestedModel` tar bort suffixet
och omvandlar det till en `ModelParameter` i protokollet. Den exklusiva
listningen döljer avsiktligt dessa statiska varianter från Testa alla, så att
testerna motsvarar det Cursor faktiskt returnerar som tillgängligt.

### Hjälpfunktioner

- `providerUsesExclusiveSyncedListing("cursor"|"cu")` —
  `src/lib/providers/modelListingCapability.ts`
- `mergeProviderModelListing` — sammanslagning i kontrollpanelen
- `ensureCursorAutoCatalogEntry` — infogning av auto* vid identifiering och listning
- `shouldSuppressStaticModelForExclusiveListing` — statisk loop i `/v1/models`

## Leverantörsgränser (kvot)

**Användning → Leverantörsgränser** för Cursor använder Bearer-API:er på
`api2.cursor.sh` (`GetCurrentPeriodUsage` → användningssammanfattning → auth/usage)
efter PKCE eller tokenimport. Den äldre sökvägen via cookie/Cursor-kontrollpanelen
på `cursor.com` finns kvar som en sista reserv för äldre sessioner som importerats
från IDE:n.

Fönstren omfattar vanligtvis **Totalt**, **Auto + Composer** och **API**. Om
gränserna ser tomma ut kör du **Logga in med Cursor** igen eller återimporterar
token (enbart IDE-import krävs inte längre).

## Tomma turer/slut på användningsutrymme

När Cursor accepterar en körning men inte returnerar någon assistenttext (vilket
är vanligt när premiumanvändningen är förbrukad) visar OmniRoute ett användbart
**429** (kvotinformation) eller **502** med vägledning — inte bara ”Leverantören
returnerade tomt innehåll”. Strömningsfel som
`not_found: AI Model Not Found` (användningsperioden är förbrukad) klassificeras
som **Cursors frekvensgräns/användning överskriden** och behåller det meddelandet
genom SSE-pipelinen (det gemensamma skyddet mot tomma strömmar skriver inte över
ett fel som redan har skickats). Kontrollera Leverantörsgränser, prova modellen
**`auto`** eller höj gränserna för Cursor-abonnemanget.

## Klientversion (utan grafiskt gränssnitt)

Utan en lokal installation av `cursor-agent` fastställer OmniRoute
`x-cursor-client-version` först via miljövariabeln `CURSOR_AGENT_CLI_VERSION`,
därefter via en diskcachad avläsning av Cursors installationsskript och slutligen
via ett fastnålat bygg-ID. Åsidosätt med `CURSOR_AGENT_CLI_VERSION` vid behov.

## Reservmetod: Manuell tokenimport

Om du inte kan slutföra inloggningen i webbläsaren:

1. Extrahera token från Cursors `state.vscdb` på värddatorn:

   ```bash
   sqlite3 "$HOME/Library/Application Support/Cursor/User/globalStorage/state.vscdb" \
     "SELECT key, value FROM ItemTable WHERE key IN ('cursorAuth/accessToken','cursorAuth/refreshToken','storage.serviceMachineId');"
   ```

2. Öppna **Importera token** i dialogrutan för Cursor-autentisering.
3. Klistra in **Åtkomsttoken** och, när den finns tillgänglig, **Uppdateringstoken**
   (krävs för automatisk uppdatering). Maskin-ID är valfritt.

Import med enbart åtkomsttoken fungerar fortfarande, men upphör att gälla utan
en uppdateringstoken — importera på nytt när chatten returnerar autentiseringsfel.

## Relaterat

- Docker-vägledning för Zed: [`docs/providers/ZED-DOCKER.md`](./ZED-DOCKER.md)
- Referens för Cursor-inloggning i OpenCodex (extern):
  https://github.com/lidge-jun/opencodex/blob/main/src/oauth/cursor.ts
