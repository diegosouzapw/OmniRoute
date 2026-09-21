# Radar Free-Model Catalog (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/RADAR.md) · 🇪🇹 [am](../../../am/docs/frameworks/RADAR.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/RADAR.md) · 🇦🇿 [az](../../../az/docs/frameworks/RADAR.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/RADAR.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/RADAR.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/RADAR.md) · 🇩🇰 [da](../../../da/docs/frameworks/RADAR.md) · 🇩🇪 [de](../../../de/docs/frameworks/RADAR.md) · 🇬🇷 [el](../../../el/docs/frameworks/RADAR.md) · 🇪🇸 [es](../../../es/docs/frameworks/RADAR.md) · 🇪🇪 [et](../../../et/docs/frameworks/RADAR.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/RADAR.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/RADAR.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/RADAR.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/RADAR.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/RADAR.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/RADAR.md) · 🇮🇱 [he](../../../he/docs/frameworks/RADAR.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/RADAR.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/RADAR.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/RADAR.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/RADAR.md) · 🇮🇩 [id](../../../id/docs/frameworks/RADAR.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/RADAR.md) · 🇮🇹 [it](../../../it/docs/frameworks/RADAR.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/RADAR.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/RADAR.md) · 🇰🇭 [km](../../../km/docs/frameworks/RADAR.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/RADAR.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/RADAR.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/RADAR.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/RADAR.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/RADAR.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/RADAR.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/RADAR.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/RADAR.md) · 🇲🇲 [my](../../../my/docs/frameworks/RADAR.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/RADAR.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/RADAR.md) · 🇳🇴 [no](../../../no/docs/frameworks/RADAR.md) · 🇮🇳 [or](../../../or/docs/frameworks/RADAR.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/RADAR.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/RADAR.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/RADAR.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/RADAR.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/RADAR.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/RADAR.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/RADAR.md) · 🇱🇰 [si](../../../si/docs/frameworks/RADAR.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/RADAR.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/RADAR.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/RADAR.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/RADAR.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/RADAR.md) · 🇮🇳 [te](../../../te/docs/frameworks/RADAR.md) · 🇹🇭 [th](../../../th/docs/frameworks/RADAR.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/RADAR.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/RADAR.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/RADAR.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/RADAR.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/RADAR.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/RADAR.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/RADAR.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/RADAR.md)

---

> **Sanningskälla:** `src/lib/radar/`, `src/lib/db/radar.ts`, `src/app/api/radar/`
> **Senast uppdaterad:** 2026-09-01 — v3.8.51
> **Evidensgräns för den driftade tjänsten:** reglerna på serversidan som beskrivs här verifierades
> 2026-09-01 mot den avsiktligt privata Radar-servern på den exakta revisionen
> `main@dce70f004364912f3f144cdb69f4cbcde16093ed`. Den implementationen distribueras inte i
> detta OSS-arkiv; tillgängligheten för den driftade tjänsten förblir ett separat drifttillstånd.

Radar är ett **valfritt tillägg** som lägger en signerad, nyligen kurerad katalog över kostnadsfria modeller
ovanpå utgåvans baslinje (`FREE_MODEL_BUDGETS` i
`open-sse/config/freeModelCatalog.data.ts`). Det finns eftersom landskapet för kostnadsfria nivåer förändras
snabbare än utgivningstakten — leverantörer lägger till, minskar eller avvecklar kostnadsfria kvoter mellan
utgåvor, och baslinjekatalogen kan endast uppdateras när en ny version levereras.

**Inget som är kostnadsfritt i dag slutar vara kostnadsfritt på grund av fjärrflödet.** Radar
lägger aldrig en baslinjepost bakom en betalvägg; det uppdaterar endast gräns- och statusfält vid läsning och kan
lägga till nyupptäckta kostnadsfria modeller mellan utgåvor. En operatör kan fortfarande dölja en
modell lokalt och återställa den från samma kontrollpanel. Själva baslinjekatalogen
ändras aldrig på disk — se
[Regler för sammanslagning av överlagring vid läsning](#read-time-overlay-merge-rules) nedan.

---

## Leveransstatus i v3.8.51

Följande status skiljer det som denna OSS-utgåva implementerar från senare
Radar-arbetsflöden. Det är en status på kodnivå, inte ett löfte om att en viss driftad distribution
eller extern integrering för närvarande är tillgänglig.

| Område                           | Status i denna utgåva                                                                                                                                                                                                                                                                |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Klient för signerad katalog      | Implementerad bakom `RADAR_ENABLED`, med separat aktivt samtycke, Ed25519-verifiering, lokala krypterade inställningar/cache, beständiga åsidosättningar för visning/aktivering, reversibla gravstenar, schemaläggare och kontrollpanel.                                             |
| Aktivering för bidragsgivare     | Kontrollpanelen länkar till det serverdriftade GitHub-flödet för anspråk och accepterar en befintlig `omr_…`-nyckel. Behörighet som bidragsgivare avgörs av den privata tjänsten; OSS-klienten innehåller ingen GitHub-token eller logik för utfärdande.                             |
| Aktivering med supporter-nyckel  | Implementerad. Den råa nyckeln valideras, krypteras vid lagring, maskeras vid läsning och skickas endast via synkronisering på serversidan. Om nyckeln ändras eller rensas ogiltigförklaras alla fyra flödescachar som är känsliga för behörigheter.                                 |
| Hänvisningslänkar                | Implementerade som ett separat signerat flöde som uppdateras varje timme. Fasta länkar är omedelbart tillgängliga för communitynivån; begränsade kampanjer förblir livedata för nivån.                                                                                               |
| Supportererbjudanden             | Implementerade som ett separat signerat flöde som endast är tillgängligt live och som en sida i kontrollpanelen. Klienten omvaliderar det slutna förmånsschemat, bevarar den senast fungerande cachen, filtrerar bort utgångna poster och märker uttryckligen ut partnererbjudanden. |
| Insikter och supporterkännande   | Implementerade som ett strikt signerat flöde som endast är tillgängligt live, med Radar-ägd ELO, faktabaserad katalogaktualitet/trend, ett verifierat lokalt supportermärke, en sida i kontrollpanelen samt CLI-kommandon för status/synkronisering som endast körs lokalt.          |
| Betalningar och transaktionsmejl | Inte implementerade i OSS-klienten. Köp, donationer, granskning av kvitton, återställning och e-postleverans hör till den privata tjänsten; tillgängligheten för den driftade tjänsten beror fortfarande på dess övervakade driftsättning och leverantörskonfiguration.              |
| Arbetsflöde för forskningsagent  | Ingår inte i denna klientutgåva. Innehållet i de kurerade flödena förblir data på serversidan; ingen autonom forskningsagent körs i en OmniRoute-installation.                                                                                                                       |

---

## Läsare för offentliga meddelanden

Den generiska meddelandeläsaren är separat från funktionsflaggan för Radar. Dashboardens startsida och
ändringsloggsläsaren hämtar datalagrets offentliga `news.json` via en vanlig `GET` till
`NEWS_JSON_URL` (`src/shared/utils/releaseNotes.ts`). De skickar inga Radar-inställningar, prompter, leverantörskonfigurationer, användningsposter eller lokala avvisningstillstånd.

`news.json` använder det slutna v2-schemat som implementeras av `parseNewsPayload()`:

- `schemaVersion: 2` och en begränsad `items[]`-samling;
- stabila, unika `id`-värden för meddelanden;
- explicita `active`-fält och ISO-formaterade `publishedAt`-fält;
- obligatorisk engelsk text med valfri lokaliserad text;
- valfria autentiseringsfria HTTPS-länkar och en ikon från en lista över tillåtna ikoner;
- val av det senaste aktiva meddelandet först, reservspråk till engelska och lokal avvisning per ID.

Parsern godtar tillfälligt den tidigare singulära formen `{ active, title, message, ... }` så att
äldre avgreningar kan migrera utan en trasig ändringsloggsvy. Ogiltiga flöden är inaktiva. Radar-lanseringsposten levereras med `active: false`; att ändra den till `true` är en separat versionsåtgärd efter sammanslagning och driftsättning och ändrar inte `RADAR_ENABLED` eller det oberoende samtycket till flödessynkronisering.

---

## Flagga: `RADAR_ENABLED` (av som standard)

Radar skyddas genomgående av funktionsflaggan `RADAR_ENABLED`
(`src/shared/constants/featureFlagDefinitions.ts`, kategori `policies`,
`defaultValue: "false"`).

**När flaggan är avstängd finns inte gränssnittet:**

- Alla `/api/radar/*`-endpoints, inklusive lokala läsningar och skrivningar av modelltillstånd,
  returnerar `404` innan någon Radar-modul berörs.
- Dashboardvyerna (`/dashboard/radar`, `/dashboard/radar/setup`,
  `/dashboard/radar/combos`, `/dashboard/radar/offers`, `/dashboard/radar/intel`) renderar
  `notFound()`.
- `getRadarCatalog()` (`src/lib/radar/index.ts`) returnerar den orörda baslinjen —
  samma antal poster, samma värden, varje post märkt med `origin: "baseline"` — och läser aldrig
  flödescachen.
- Inget Radar-nätverksanrop görs någonsin; varje synkroniseringsmodul returnerar `{ status: "disabled" }`
  innan `fetch` berörs.

Detta är en strikt överordnad spärr: att slå på flaggan låser upp _vyerna_, inget
annat. Det laddar inte upp data, startar inte någon bakgrundssynkronisering och ändrar inte
routning eller modellval — se det separata samtycket nedan.

---

## Datasynkronisering är ett SEPARAT samtycke — integritetslöftet

Att slå på `RADAR_ENABLED` låser endast upp användargränssnittet. Synkronisering av flödet kräver ett andra,
oberoende samtycke som lagras i `radar_settings.opt_in` (`src/lib/db/radar.ts`,
migrering `136_radar_cache_settings.sql`). `syncRadar()` kontrollerar flaggan _och_ samtycket innan något nätverksanrop görs:

```
Flaggan av      → { status: "disabled" }   — inget nätverksanrop
Samtycke saknas → { status: "opt_out" }    — inget nätverksanrop
```

När båda är aktiverade är synkroniseringsflödet följande:

1. `GET <feed base URL>/v1/catalog/latest` med `x-omniroute-radar-schema: 2` och en valfri
   `Authorization: Bearer <supporter key>`-header (se nedan). Servrar använder som standard den separat
   signerade v1-övergångsartefakten när schemaheadern saknas, så att äldre installerade klienter fortsätter
   att ta emot uppdateringar.
2. Detta är ett applikationsflöde endast för nedladdning, men det är fortfarande en HTTPS-begäran. Den driftade
   infrastrukturen tar emot vanlig anslutningsmetadata såsom källans IP-adress. När en supporternyckel
   är konfigurerad skickar synkroniseringen även den nyckeln i Bearer-headern så att tjänsten kan fastställa
   behörigheten. I den exakta privata serverrevision som anges i evidensgränsen ovan använder
   redovisningen av flödesbegäranden nyckelhashar, aggregerad användning och en dagligen roterande trunkerad HMAC
   av IP-adressen för manuell granskning av missbruk; dessa tabeller lagrar varken nyckeln eller IP-adressen i råformat.
   Infrastrukturens åtkomstloggar och den krypterade leveransutkorgen är separata operativa
   gränser.
3. OmniRoute skickar aldrig prompter, svar, konversationer, leverantörsuppgifter, modelltrafik,
   drifttid, latens eller den lokala leverantörskonfigurationen till Radar-tjänsten.
4. Svaret verifieras, valideras och cachelagras lokalt (se
   [Säkerhetsmodell](#security-model)). Radar har exakt fyra nätverkssökvägar på serversidan:
   `syncRadar()` för katalogen, `syncRadarReferrals()` för hänvisningar samt
   `syncRadarOffers()` / `syncRadarIntel()` för erbjudanden och Intel som endast är tillgängliga för supportrar.

**Supporternyckeln** är en valfri Bearer-token (`radar_settings.supporter_key`)
som låter flödestjänsten avgöra vilken nivå som ska levereras (se
[Nivåer](#tiers-community-and-live)). Den:

- Lagras **krypterad i vila** med samma AES-256-GCM-hjälpfunktioner `encrypt()`/`decrypt()`
  (`src/lib/db/encryption.ts`) som används för leverantörsuppgifter.
- Ställs in via `POST /api/radar/settings` (`{ supporterKey: "omr_" + 40 hex chars }`) och
  **returneras aldrig** — svaret innehåller en maskerad form (`omr_****abcd`).
- Om den ändras eller tas bort ogiltigförklaras cacherna för katalogen, hänvisningar, erbjudanden och Intel atomärt. Nästa
  synkronisering/läsning fastställer den nya behörigheten på serversidan; att spara en nyckel gör inte i sig
  någon nätverksbegäran och förbrukar inte en aktiveringsnyckel för engångsbruk.
- Skickas till flödestjänsten som en Bearer-token vid synkroniseringens GET-begäran — inget annat om
  nyckeln lämnar någonsin klienten.

---

## Åtkomst- och säkerhetsregler som visas före opt-in

Den inaktiva kontrollpanelen återger dessa regler från
`src/app/(dashboard)/dashboard/radar/RadarAccessExplainer.tsx` **före** någon av aktiveringsåtgärderna.
Den kanoniska åtkomstskalan är:

| Nivå                  | Behörighet                                                                             | Åtkomst                                             | Regel för upprepning/utgång                                               |
| --------------------- | -------------------------------------------------------------------------------------- | --------------------------------------------------- | ------------------------------------------------------------------------- |
| Community             | Vem som helst; ingen nyckel                                                            | Komplett katalog fördröjd med cirka 30 dagar        | Alltid tillgänglig; inget utfärdande                                      |
| Star + follow         | GitHub OAuth verifierar både en stjärna på repositoriet och att ägaren följs           | En live-läsning av katalogen, därefter Community    | Ett utfärdande per inloggning; utfärdas aldrig på nytt                    |
| Contributor Top 10    | Placering 1–10 i den senaste fullständiga veckorankningen                              | 365 live-dagar                                      | Begärs vid behov; en tilldelad period förkortas inte om rankningen lämnas |
| Contributor Top 100   | Placering 11–100 i den rankningen                                                      | 90 live-dagar                                       | Samma regel för begäran vid behov/idempotent anspråk                      |
| Supporter purchase    | Engångsköp för 6 månader, 1 år eller livstid                                           | Live-katalog, signerade live-erbjudanden och Intel  | Ingen automatisk förnyelse                                                |
| Donation/manual grant | Ägargranskad donation eller en ägartilldelning för ett uttryckligt antal dagar/livstid | Samma live-behörighet under den tilldelade perioden | Granskad, idempotent tilldelning                                          |

Sammanslagna PR:er, commits och ändrade rader är **endast underlag för rankningen**. En inloggning utanför Top 100 får
ingen contributor-tilldelning oavsett antalet PR:er. Tidsbegränsade köp, donationer, contributor-perioder och
manuella tilldelningar ackumuleras från det aktuella utgångsdatumet; livstid har företräde. En rankningsändring
återkallar eller förkortar aldrig retroaktivt tid som redan har tilldelats.

Den hostade licensen är personlig och den användarorienterade regeln är en aktiv installation åt gången. Den här
versionen gör **inte** anspråk på något hårdvarulås: OSS-synkroniseringen skapar inte fingeravtryck av hårdvara och
upprätthåller inte något kryptografiskt enhetslån. I den verifierade revisionen av den privata servern ovan består
den implementerade tillämpningen av behörighetsvalidering samt en signal för manuell granskning när samma aktiva
nyckel registreras från en fjärde unik IP-adress inom 24 timmar. Den signalen blockerar eller återkallar aldrig en
nyckel automatiskt. Återställning återkallar och ersätter den förlorade nyckeln samtidigt som det befintliga
utgångsdatumet bevaras; den köpta eller tilldelade perioden startas inte om.

Live-erbjudanden sammanställs manuellt och kan ändras eller löpa ut. Opt-in-skärmen anger även den exakta
integritetsgränsen: signerade katalog-/hänvisningsmetadata hämtas; en giltig nyckel låser dessutom upp signerade
erbjudanden och Intel; Bearer-nyckeln och normala anslutningsmetadata når den hostade tjänsten; prompter, svar,
konversationer, leverantörsuppgifter, modelltrafik, drifttid, latens och lokal leverantörskonfiguration gör det inte.

---

## Skaffa en supporter-nyckel

Aktiveringsskärmen (`/dashboard/radar`) länkar till två flöden för att **skaffa** en
supporter-nyckel. OSS-repot utfärdar aldrig någon nyckel, kör aldrig betalningskod och
**anger aldrig något pris** — prissättningen bestäms och visas helt och hållet på
målsidorna, inte i detta repo (specifikationsbeslut D14).

- **"Jag är en bidragsgivare"** — öppnar `RADAR_CONTRIBUTOR_CLAIM_URL` (standardvärde
  `https://radar.omniroute.online/auth/github`), ett GitHub OAuth-anspråksflöde som finns på
  den privata Radar-servern. Det kontrollerar den senaste fullständiga veckorankningen: Topp 10 får 365 dagar
  och placeringarna 11–100 får 90 dagar. Utanför Topp 100 ger antalet PR:er aldrig åtkomst; flödet
  kontrollerar i stället den separata engångsnivån för stjärnmärkning + följning.
- **"Stöd projektet"** — öppnar `RADAR_SUPPORTER_PLANS_URL` (standardvärde
  `https://radar.omniroute.online/planos`), den driftade sidan för engångsalternativen 6 månader, 1 år och
  livstid. OSS-sidan visar fortfarande inget penningbelopp.

Båda URL:erna löses på serversidan (`src/lib/radar/links.ts`, samma mönster för
miljövariabelöverskrivning som `RADAR_FEED_URL`) och vidarebefordras till dashboarden via det befintliga
`GET /api/radar/settings`-svaret (`contributorClaimUrl`, `supporterPlansUrl`) —
klientkomponenten läser aldrig själv från `process.env`.

| Variabel                      | Syfte                                                                                                    |
| ----------------------------- | -------------------------------------------------------------------------------------------------------- |
| `RADAR_CONTRIBUTOR_CLAIM_URL` | Åsidosätter URL:en för bidragsgivaranspråk (standardvärde `https://radar.omniroute.online/auth/github`). |
| `RADAR_SUPPORTER_PLANS_URL`   | Åsidosätter URL:en för supporterplaner (standardvärde `https://radar.omniroute.online/planos`).          |

### Återställa en förlorad supporter-nyckel

Den driftade tjänstens startpunkt för återställning är `https://radar.omniroute.online/recover`; den är även
länkad från plansidan. Återställningen sker helt utanför OSS-klienten eftersom den lokala
installationen aldrig tar emot köparens/bidragsgivarens e-postadress och inte kan återskapa en rå nyckel från
sina krypterade inställningar.

1. Skicka in e-postadressen som är associerad med nyckeln. Tjänsten returnerar samma bekräftelsesida oavsett om en
   återställningsbar licens finns eller inte, så formuläret avslöjar inte vilka konton som finns.
2. Om användaren är berättigad skickar leveransprocessen en kortlivad länk som endast kan användas en gång. När den öppnas flyttas
   token omedelbart till en tillfällig, krypterad `HttpOnly`/`Secure`-cookie och omdirigerar till den rena
   URL:en `/recover`; sidan innehåller ingen token, e-postadress, gammal nyckel eller ersättningsnyckel.
3. Bekräfta återkallelsen. Den privata tjänsten återkallar den tidigare nyckeln, skapar ersättningen med
   samma plan/utgångsdatum och köar den för e-postleverans i en enda transaktion. Ersättningen
   returneras aldrig till webbläsaren.
4. Klistra in ersättningen i `/dashboard/radar`. Den gamla nyckeln måste nu degraderas till `community`;
   ersättningen måste ge en verifierad `live`-synkronisering. Om samma återställningslänk öppnas igen måste det
   misslyckas med ett generiskt svar om att länken är ogiltig eller har upphört att gälla.

Den driftade återställningsrutten och e-postprocessen kan finnas i koden men ändå vara otillgängliga i en viss
driftsättning. Beskriv inte flödet som produktionsklart förrän servern har driftsatts, leveransleverantören
har konfigurerats med en kontrollerad mottagare och hela engångslänken har testats.

När en besökare har en nyckel (`omr_` + 40 hextecken) har aktiveringsskärmen
(`src/app/(dashboard)/dashboard/radar/page.tsx`) ett inmatningsfält för att klistra in nyckeln som primär
väg: att klistra in en nyckel och skicka formuläret anropar `POST /api/radar/settings`
(`{ optIn: true, supporterKey }`) i ett enda anrop — att klistra in en nyckel både anger den och anmäler användaren,
vilket låser upp skärmen. Formatet (`omr_` + 40 hextecken) kontrolleras först på klientsidan
med den delade hjälpfunktionen `isValidSupporterKeyFormat()` (`src/lib/radar/supporterKey.ts`)
för en bättre användarupplevelse; serverns Zod-schema är oavsett detta den auktoritativa kontrollen. När en
nyckel har angetts visar aktiveringsskärmen den maskerade formen (`supporterKeyMasked` från
`GET /api/radar/settings`) i stället för ett tomt inmatningsfält, med en kontroll för att "byta nyckel" där
en ny nyckel kan klistras in — den råa nyckeln visas aldrig igen. De två knapparna för anspråk/planer ovan
förblir sättet att _skaffa_ en nyckel från början; det här inmatningsfältet är där en operatör
som redan har en aktiverar den.

### Heltäckande aktivering och guidad konfiguration

Den privata flödestjänsten och denna OSS-klient har en avsiktligt snäv gräns: tjänsten
utfärdar och validerar supporter-nyckeln, medan den lokala OmniRoute-installationen krypterar nyckeln,
synkroniserar signerade artefakter på serversidan och vägleder leverantörskonfigurationen. Ordningen för den assisterade valideringen är:

1. Hämta en nyutfärdad eller återställd nyckel från bidragsgivaranspråket, plans/checkout, återställningsflödet eller en auktoriserad operatör av en privat server. Klistra inte in den råa nyckeln i loggar, skärmbilder, ärendekommentarer eller kommandoradsargument.
2. Aktivera funktionsflaggan `RADAR_ENABLED` i den lokala OmniRoute-installationen. Detta gör användargränssnittet tillgängligt, men ingen nätverksaktivitet sker förrän det separata aktiva medgivandet har sparats.
3. Öppna `/dashboard/radar`, klistra in nyckeln och aktivera. Webbläsaren skickar en lokal
   `POST /api/radar/settings` med `{ optIn: true, supporterKey }`; nyckeln krypteras lokalt och
   svaret innehåller endast `omr_****<last4>`.
4. Låt aktiveringsskärmen köra sin katalogsynkronisering eller välj **Synkronisera nu**. Bekräfta att sidan
   visar `live`, en flödesversion och en hämtningstid. För lokal autentiserad diagnostik
   rapporterar `GET /api/radar/status` status för aktivt medgivande/nyckelförekomst och de fyra cachetillstånden utan att returnera
   nyckeln. `POST /api/radar/sync-all` kan uttryckligen uppdatera katalog, hänvisningar, erbjudanden och Intel.
5. Öppna `/dashboard/radar/setup?provider=<provider>`. Följ leverantörens URL för autentiseringsuppgifter,
   välj **Lägg till API-nyckel**, spara via leverantörens faktiska formulär, återgå till guiden och kör
   **Testa anslutning**. Guiden använder de ordinarie vägarna `/api/providers` och
   `/api/providers/<connection-id>/test`; den skapar inte en parallell Radar-autentiseringsuppgift.
6. Öppna `/dashboard/radar/combos` när minst två kompatibla leverantörsanslutningar är aktiva.
   Granska den föreslagna familjen och skapa kombinationen via det befintliga kombinations-API:t. Erbjudanden och
   Intel förblir separata signerade cacheminnen endast för live-läge och kan kontrolleras på sina respektive Radar-sidor.
7. Läs in `/dashboard/radar` och konfigurationssidan på nytt. Det aktiva medgivandet, det maskerade nyckeltillståndet, det verifierade cacheminnet, den sparade
   leverantörsanslutningen och teståtgärden måste finnas kvar efter omladdningen. Samla endast in bevis efter att den
   råa nyckeln och leverantörens autentiseringsuppgift inte längre är synliga.

Att spara en nyckel är inte i sig ett bevis på en giltig live-behörighet. Beviset utgörs av kombinationen av den privata
tjänstens resultat från `GET /v1/license/check`, OSS-katalogens levererade `live`-nivå, ett verifierat signerat
cacheminne och det faktiska flödet för leverantörsanslutning/test. En ogiltig, utgången eller återkallad nyckel
nedgraderar säkert katalogen till `community`; detta får inte rapporteras som en lyckad validering av live-nyckeln.

### Länk till privat administratörspanel

`RADAR_ADMIN_URL` lägger valfritt till **Radar Admin ↗** direkt efter det användarinriktade
Radar-objektet i sidofältets kostnadsavsnitt. Det saknar avsiktligt ett standardvärde: när variabeln
inte är angiven eller är ogiltig innehåller det statiska sidofältet, kommandopaletten och anpassningsskärmen för sidofältet inget
administratörsobjekt och ingen privat URL.

Värdet bestäms på serversidan och vidarebefordras via det hanteringsautentiserade
`GET /api/settings`-svaret endast till en autentiserad instrumentpanelssession eller till den betrodda
loopback-ägaren under en lokal uppstart utan inloggning. Autentisering med CLI, interna tjänster och API-nycklar med hanteringsomfång
får inte värdet. Webbläsaren validerar svaret igen innan den externa länken skapas,
och länken öppnas med `noopener noreferrer`.

Använd en HTTPS-tunnel-/tailnet-URL utan autentiseringsuppgifter. Vanlig HTTP accepteras endast för en loopback-SSH-
vidarebefordran, exempelvis `http://127.0.0.1:9351`; andra scheman, inbäddade autentiseringsuppgifter, felaktiga URL:er och
fjärrdestinationer över HTTP blockeras på ett säkert sätt och lämnar navigeringen inaktiv.

---

## Säkerhetsmodell

### Ed25519-signatur över exakta byte

Flödets nyttolast signeras med Ed25519. `verifyFeedBytes()`
(`src/lib/radar/verify.ts`) verifierar signaturen över de **exakta svarsbyte**
som tas emot via nätverket — nyttolasten serialiseras aldrig om före verifieringen, så en
omkodning byte för byte kan inte obemärkt ogiltigförklara eller kringgå signaturkontrollen.
Ett verifieringsfel (`invalid_signature`) avbryter synkroniseringen innan nyttolasten
någonsin parsas eller cachelagras.

### Fäst offentlig nyckel + rotation

Den verifierande offentliga nyckeln är fäst i `src/lib/radar/pinnedKeys.ts`
(`PINNED_FEED_PUBLIC_KEYS`), en array så att en ny nyckel kan läggas till först inför en
rotation, medan äldre cachelagrade flöden som signerats med en tidigare nyckel förblir
giltiga tills de synkroniseras på nytt.

### Miljövariabelöverskrivningar för avgreningar

Två miljövariabler låter avgreningar och de som kör egen drift rikta klienten mot sitt eget flöde i stället för
OmniRoutes standardtjänst — se
[Så kör du ett flöde i egen drift](#how-to-self-host-a-feed) nedan:

| Variabel            | Syfte                                                                                                                         |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `RADAR_FEED_URL`    | Åsidosätter flödets bas-URL (standard: `https://radar.omniroute.online`).                                                     |
| `RADAR_FEED_PUBKEY` | Åsidosätter den fästa offentliga nyckeln (base64-DER SPKI eller PEM) och ersätter den inbyggda arrayen med denna enda nyckel. |

### Lägsta version

`syncRadar()` avvisar ett hämtat flöde vars `version` inte är strikt nyare än den
för närvarande cachelagrade versionen (`compareVersions()`, punktavgränsad jämförelse enligt `YYYY.MM.DD.n`) —
`{ status: "stale" }`. Detta förhindrar att en komprometterad eller felkonfigurerad flödesslutpunkt
återställer en klient till en äldre, annorlunda signerad nyttolast.

### Två datum och varför båda sparas

Ett cachelagrat flöde innehåller två separata datum, och risken att blanda ihop dem är själva
anledningen till att båda sparas:

| Fält          | Kommer från                | Besvarar                           |
| ------------- | -------------------------- | ---------------------------------- |
| `generatedAt` | den signerade flödestexten | hur gamla **data** är              |
| `fetchedAt`   | installationens klocka     | när installationen **hämtade** dem |

Ett flöde som hämtades för några minuter sedan kan innehålla flera veckor gamla siffror, så enbart `fetchedAt` kan inte
berätta för en operatör om överlagringen är färskare än baslinjen den vilar på. Båda
sparas i `radar_feed_cache`, returneras av `getRadarCatalog().meta` och rapporteras
separat av `GET /api/radar/status`. En rad som cachelagrades innan kolumnen `generated_at`
fanns (migrering 163) läses tillbaka som `null` — okänt förblir okänt i stället för att
använda hämtningstiden. `radar_referrals_cache` har haft sitt eget `generated_at` sedan
migrering 142.

Versionsgränsen ovan jämför `version`, inte något av datumen.

Två luckor återstår, båda avsiktliga: instrumentpanelen visar fortfarande bara `Last fetched`, så att visa
byggdatumet där kräver en ny etikett (och dess 41 språkanpassningar); och cacheminnena för erbjudanden och information
sparar inget byggdatum alls, även om deras flödesscheman innehåller ett — `GET
/api/radar/status` utelämnar därför fältet för dessa två i stället för att rapportera ett `null`
som skulle tolkas som ”okänt”.

### Schemavalidering

De hämtade byten parsas och valideras mot `RadarFeedSchema`
(`src/lib/radar/feedSchema.ts`, ett Zod-schema) **efter** signaturverifieringen. En
schemaavvikelse returnerar `{ status: "invalid_schema" }` och lämnar cachen
orörd. Den cachelagrade nyttolasten omvalideras dessutom defensivt vid varje läsning
(`getRadarCatalog()`) — en skadad eller manuellt redigerad cacherad gör att baslinjen
används i stället för att raden levereras.

### Storleksgräns för svar (10 MB)

`syncRadar()` upprätthåller en **hård gräns på 10 MB** för flödessvarets brödtext — det signerade
flödet är ett JSON-dokument i KB-storlek, så allt över denna gräns tyder på en felkonfigurerad eller
fientlig `RADAR_FEED_URL` (eller en uppströmsserver som levererar skräp), inte en legitim katalog.
Kontrollen sker i två lager:

1. En inledande kontroll av `Content-Length` gör att brödtexten inte läses alls när
   huvudet redan anger ett värde över gränsen.
2. En kontroll av den löpande totalsumman medan brödtexten läses upprätthåller gränsen även när
   `Content-Length` saknas eller underskattar den verkliga storleken — huvudet betraktas aldrig
   som tillförlitligt på egen hand. Sammanfogning av de ackumulerade segmenten bevarar de exakta
   byte som därefter behövs för kontrollen av Ed25519-signaturen.

Om gränsen överskrids returneras `{ status: "too_large" }` och cachen lämnas orörd,
i enlighet med samma icke-destruktiva mönster som vid alla andra synkroniseringsfel
(`invalid_signature`, `invalid_schema`, `stale`).

---

## Nivåer: `community` och `live`

Flödesschemat innehåller ett `tier: "community" | "live"`-fält, som bestäms **på serversidan**
av flödestjänsten baserat på begäran (förekomst och giltighet för supporter-nyckeln)
— klienten bestämmer aldrig sin egen nivå.

- **`community`** — den kostnadsfria katalogen, fördröjd med ungefär 30 dagar jämfört med de senaste
  uppgifterna. Detta är vad en oautentiserad begäran eller en begäran med ogiltig nyckel får.
- **`live`** — den senaste katalogen, som tillhandahålls för begäranden med en giltig
  supporter-nyckel.

**En ogiltig eller utgången supporter-nyckel degraderas till `community` — det är aldrig ett
fel.** Synkroniseringsflödet skiljer endast signatur-/schema-/versionsfel (alla
återställningsbara och icke-fatala för det cachade tillståndet) från ett lyckat `{ status:
"updated", version, tier }`. Det finns ingen nivåspecifik felhantering som en klient behöver
hantera.

### Den tillhandahållna nivån kommer från ett svarshuvud, inte den signerade kroppen

Det signerade flödets **kropps**fält `tier` är alltid `"live"` — flödestjänsten levererar
**två signerade artefakter per version**: live inkluderar aktuella kampanjer medan community
utelämnar dem. Varje artefakt signeras utifrån sina egna exakta byte. Kroppen används fortfarande inte
som beslut om åtkomsträttigheter; den nivå som faktiskt väljs för en begäran förmedlas
i **svarshuvudet `x-omniroute-feed-tier`**, och bestäms på serversidan utifrån begärans
`Authorization`-nyckel.

`syncRadar()` (`src/lib/radar/sync.ts::parseServedTierHeader()`) är den enda platsen
som avgör vilken nivå en klient ska lita på:

1. Tolka `x-omniroute-feed-tier` med `RadarTierSchema` (Zod) — ett saknat huvud, eller
   ett värde som inte är exakt `"community"` eller `"live"`, behandlas som **inte
   närvarande** (det läggs aldrig in i cachen/användargränssnittet i befintligt skick; detta omfattar även äldre flödes-
   servrar som är från tiden före huvudet).
2. Återgå till den signerade kroppens `tier`-fält (alltid `"live"`) endast när steg 1
   inte ger något resultat.
3. Den fastställda nivån är den som cachas och returneras som `{ status: "updated",
version, tier }` — detta är värdet som visas på instrumentpanelen, aldrig det obearbetade fältet från
   kroppen.

---

## Regler för sammanslagning av överlagring vid läsning

`applyFeed()` (`src/lib/radar/applyFeed.ts`) sammanfogar det cachade flödet **ovanpå** den
statiska baslinjen vid **läsning**, inuti `getRadarCatalog()`. Baslinjens array
(`FREE_MODEL_BUDGETS`) muteras aldrig — en ny `MergedEntry[]` beräknas vid varje
anrop.

Fyra regler, i prioritetsordning:

1. **Flödet skriver aldrig över en lokal åsidosättning.** Per fält: om operatören har
   anpassat ett fält för en post (`localOverrides`-mapp, nycklad med `provider:modelId`),
   hoppas flödets värde för det specifika fältet över — operatörens värde har företräde.
2. **`enabled: false` inaktiverar posten, med ursprungsinformation.** En flödespost som stänger
   av en post anger `enabled: false` och `disabledBy: "radar"` i det sammanslagna resultatet,
   så att användargränssnittet kan förklara _varför_ en post gick från tillgänglig till inaktiverad.
3. **En användartillagd post som inte finns i flödet förblir orörd.** Poster som
   endast finns i baslinjen (eller har lagts till lokalt) och inte har någon motsvarande flödespost
   förs vidare oförändrade.
4. **En gravstensmarkerad post återupplivas aldrig.** Om operatören uttryckligen har raderat en
   post (`tombstones`-uppsättning) återställs den inte om flödet åter lägger till samma `provider:modelId`
   i en senare version.

De redigerbara fälten och gravstensmarkeringarna lagras beständigt i
`radar_local_model_state` (migrering `153_radar_local_model_state.sql`). Den publika DB-
adaptern (`src/lib/db/radar.ts`) konverterar dessa rader till `localOverrides`-mappen och
`tombstones`-uppsättningen som används av `applyFeed()`; produktionens `getRadarCatalog()` läser in detta tillstånd
efter att kontrollerna för flagga, cache och schema har godkänts. Endast `displayName` och `enabled` kan
redigeras av operatören. Leverantörs-/modellidentitet, flödesursprung, kvot, funktioner, användarvillkor
och konfigurationsdata kan inte skrivas via detta gränssnitt.

Instrumentpanelen erbjuder fyra lokala åtgärder:

- **Redigera** ändrar det lokala visningsnamnet och aktiveringsläget.
- **Återställ lokala ändringar** rensar båda de redigerbara fälten utan att ändra en gravstensmarkering.
- **Dölj** skapar en gravstensmarkering så att senare flödesuppdateringar inte kan återskapa raden.
- **Återställ** tar bort gravstensmarkeringen; eventuella separat sparade åsidosättningar fortsätter att gälla.

Ett `enabled: false` från flödet förblir säkerhetsundantaget: det har företräde framför ett inaktuellt lokalt
`enabled: true`, håller den sammanslagna posten inaktiverad och registrerar `disabledBy: "radar"`.

Katalogpubliceringar använder `schemaVersion: 2`. `contextWindow` och vart och ett av `tools`, `vision` och
`thinking` är oberoende `number | null` / `boolean | null`: `null` betyder okänt, medan
`false` betyder att en D16-bekräftad officiell leverantörskälla uttryckligen anger att funktionen saknas.
Interna flaggor i OmniRoutes register/modellspecifikationer upphöjs aldrig direkt till flödesfakta. Klienten
accepterar fortfarande v1-ögonblicksbilder; eftersom den gamla byggaren använde `false` som platshållare för frånvaro,
normaliseras v1 `false` till okänt medan v1 `true` förblir ett faktum. Okända schemaversioner avslås
på ett säkert sätt och den senaste giltiga cachen förblir tillgänglig. Varje v2-modell med ett kontext-/funktionsvärde
som inte är null måste innehålla en autentiseringsfri HTTPS-`metadataEvidenceUrls[]`; annars misslyckas
schemavalideringen och cachen ersätts inte. Katalogtabellen återger alla tre tillstånd som `✓`, `✕` och `?`.

### Guidade kombinationer och MCP-åtkomst

Bekräftade `familyId`-värden bevaras genom överlagringen vid läsning och driver den rena
`buildRadarComboSuggestions()`-modulen (`src/lib/radar/comboSuggestions.ts`). En familj föreslås
endast när minst två olika leverantörer har aktiva anslutningar och exponerar exakt det kurerade modell-
ID:t. Inaktiverade modeller, inaktiva leverantörer, saknade modell-ID:n, familjer med en enda medlem och tvetydiga
alias-/prefixmatchningar avslås på ett säkert sätt. Förslagen använder den befintliga `priority`-strategin och sorterar
den största återkommande månadsbudgeten först; användargränssnittet skapar dem endast via `POST /api/combos`.

Det guidade användargränssnittet finns på `/dashboard/radar/combos`. Det läser endast de lokala
endpoints `GET /api/radar/catalog` och `GET /api/combos/builder/options`. Det utlöser aldrig någon Radar-synkronisering,
läser leverantörsuppgifter eller skriver direkt till kombinationsdatabasen.

MCP-klienter kan läsa samma lokala projektion med `omniroute_radar_catalog` (`read:radar`). De
valfria filtren `provider`, `familyId` och `enabledOnly` utvärderas efter en lokal
`GET /api/radar/catalog`-läsning. Dess slutna utdata omfattar katalogmetadata samt leverantör/modell,
visningsnamn, `familyId`, kvot, funktioner, aktiveringsstatus, ursprung och `disabledBy`; konfigurations-URL:er,
steg, anslutningar, e-postadresser, nycklar och hänvisningsdata returneras aldrig. Det här verktyget är
skrivskyddat och anropar aldrig `/api/radar/sync`.

### Ursprungsmarkörer

Varje sammanslagen post har ett `origin`-fält som användargränssnittet återger som ett märke:

- `"baseline"` — oförändrad från den statiska versionskatalogen.
- `"radar"` — ett eller flera fält har uppdaterats av flödet.
- `"local"` — operatören har minst en lokal åsidosättning för den här posten (lokala
  åsidosättningar har alltid företräde framför flödet enligt regel 1, oavsett vad flödet anger).

---

## Lokala gränssnitt — aldrig en proxy för flödet

De lokala Radar-ruttfamiljerna nedan stödjer användargränssnittet under `src/app/api/radar/`:

| Rutt                           | Metod  | Syfte                                                                                                                                 |
| ------------------------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| `/api/radar/catalog`           | GET    | Returnerar den sammanslagna katalogen (`getRadarCatalog()`) från den lokala cachen.                                                   |
| `/api/radar/sync`              | POST   | Utlöser `syncRadar()` på serversidan och returnerar resulterande status.                                                              |
| `/api/radar/settings`          | GET    | Returnerar `{ optIn, hasSupporterKey, supporterKeyMasked }` — aldrig den råa nyckeln.                                                 |
| `/api/radar/settings`          | POST   | Anger aktivt deltagande och/eller den (krypterade) supporternyckeln.                                                                  |
| `/api/radar/referrals`         | GET    | Returnerar `{ fixed, campaigns, tier }` från den lokala cachen — se [Hänvisningslänkar](#referral-links-free-credits) nedan.          |
| `/api/radar/offers`            | GET    | Returnerar aktiva erbjudanden från den verifierade lokala livecachen; returnerar aldrig supporternyckeln.                             |
| `/api/radar/offers/sync`       | POST   | Utlöser den serversidebaserade pipelinen `syncRadarOffers()`, som endast använder live-nyckeln.                                       |
| `/api/radar/intel`             | GET    | Returnerar verifierad lokal live-Intel samt ett booleskt värde för supporterigenkänning; aldrig en identitet eller nyckel.            |
| `/api/radar/intel/sync`        | POST   | Utlöser den serversidebaserade pipelinen `syncRadarIntel()`, som endast använder live-nyckeln.                                        |
| `/api/radar/status`            | GET    | Returnerar skrivskyddad status för lokala inställningar och cache för katalog, hänvisningar, erbjudanden och Intel, utan hemligheter. |
| `/api/radar/sync-all`          | POST   | Kör alla fyra synkroniseringsmoduler på serversidan och returnerar en separat status för varje flöde.                                 |
| `/api/radar/local-model-state` | GET    | Listar beständiga åsidosättningar och gravmarkörer för kontroller för redigering/återställning.                                       |
| `/api/radar/local-model-state` | PATCH  | Anger eller rensar de validerade åsidosättningsfälten `displayName`/`enabled`.                                                        |
| `/api/radar/local-model-state` | PUT    | Skapar eller tar bort en gravmarkör med `{ provider, modelId, tombstoned }`.                                                          |
| `/api/radar/local-model-state` | DELETE | Rensar redigerbara åsidosättningsfält men bevarar eventuella gravmarkörer.                                                            |

**Strikt regel: dessa rutter fungerar aldrig som proxy för flödestjänsten.** Webbläsaren kommunicerar endast
med den lokala OmniRoute-servern. De fyra moduler som kommunicerar med Radar-tjänsten är
`src/lib/radar/sync.ts` (katalog), `src/lib/radar/referralsSync.ts` (hänvisningar) och
`src/lib/radar/offersSync.ts` (erbjudanden) samt `src/lib/radar/intelSync.ts` (Intel); alla körs
på serversidan, aldrig på klientsidan. Detta håller
flödets URL och eventuella supporternycklar helt borta från klientriktad nätverkstrafik.

Alla Radar-endpoints returnerar `404` när `RADAR_ENABLED` är avstängd (se
[Flagga](#flag-radar_enabled-default-off) ovan) och skickar ruttfelsvar genom
`buildErrorBody()`/`sanitizeErrorMessage()` enligt regeln för felsanering som gäller i hela repot
(`docs/security/ERROR_SANITIZATION.md`).

### Autentisering

Alla Radar-endpoints kräver autentisering via `isAuthenticated()`
(`src/shared/utils/apiAuth.ts`) — en sessionscookie för kontrollpanelen eller en API-nyckel
med hanteringsbehörighet, samma spärr som skyddar resten av `/api/settings/*`. Kontrollen
som returnerar `404` när flaggan är avstängd körs alltid **före** autentiseringskontrollen, så en installation där `RADAR_ENABLED`
är avstängd förblir byte-identisk (ingen autentiseringsuppmaning enbart för att få veta att gränssnittet inte finns);
när flaggan väl är aktiverad får en oautentiserad begäran `401` innan någon läsning från eller
skrivning till databasen sker. `GET /api/radar/settings` returnerar aldrig den råa supporternyckeln, oavsett
autentiseringstillstånd — endast den maskerade formen och ett booleskt värde `hasSupporterKey`.

---

## Supporterbjudanden

Erbjudanden använder sin egen signerade artefakt, `GET /v1/offers/latest`, och delar aldrig katalog- eller
hänvisningscachen. Serverändpunkten kräver en giltig aktiv Bearer-nyckel för supporters; det finns ingen
reservlösning för communityversionen. `syncRadarOffers()` avbryter därför före nätverksanropet när funktionsflaggan är
avstängd, operatören inte har anmält sig eller ingen supporternyckel har konfigurerats.

Efter ett lyckat GET-anrop verifierar klienten Ed25519-signaturen för de exakta svarsbyten,
validerar `RadarOffersFeedSchema`, kräver att både den signerade kroppen och
`x-omniroute-feed-tier`-headern anger `live`, framtvingar en strikt nyare punktavgränsad version och ersätter först därefter
`radar_offers_cache` atomärt (migrering `144_radar_offers_cache.sql`). Samma gräns på 10 MB
för header plus ström som används av de andra flödena gäller. Fel relaterade till signatur, schema, nivå, återuppspelning, storlek, HTTP
och nätverk bevarar samtliga den senast verifierade cachen.

Det slutna erbjudandeformatet stöder tre jämförbara typer av förmåner: procentandel i baspunkter, kredit
i mindre valutaenheter eller provperiodsdagar. Ett partnererbjudande måste innehålla en offentlig referensnivå av samma typ och
dess förmån måste vara strikt större; officiella erbjudanden har ingen partnerreferensnivå. URL:er måste vara
HTTPS utan autentiseringsuppgifter. `getRadarOffers()` återvaliderar defensivt den cachade nyttolasten och filtrerar
utgångna poster vid varje lokal läsning; `/dashboard/radar/offers` filtrerar återigen efter utgångsdatum före rendering,
använder portugisisk text när sådan finns med engelska som reserv och märker uttryckligen ut partnererbjudanden.

Webbläsaren anropar endast lokala rutter: den läser den maskerade ögonblicksbilden av inställningarna, begär att
`POST /api/radar/offers/sync` ska uppdatera på serversidan och läser sedan `GET /api/radar/offers`. Utan en
nyckel visar den de befintliga länkarna för bidragsgivare/support i stället för att försöka göra en flödesbegäran. Externa
erbjudandelänkar öppnas i en ny flik med `noopener noreferrer`. Inget MCP-verktyg för `radar_offers` exponeras i
den här versionen.

---

## Radar Intel, supportermärke och CLI

Intel är en signerad artefakt på `GET /v1/intel/latest`. Det slutna `RadarIntelFeedSchema` accepterar
endast Radar-ägda ELO-rankningar som den privata kuratorn härlett från bekräftade jämförelser samt faktiska
skillnader i katalogålder/antal som härletts från signerade katalogögonblicksbilder. Metoden är fastställd till ett initialt
betyg på 1000 och K=32. En tom rankning är giltig när ingen jämförelse har bekräftats; klienten
skapar aldrig en på syntetisk väg.

`syncRadarIntel()` tillämpar samma Bearer-hantering på serversidan, tidsgräns på 30 sekunder, strömningsgräns på 10 MiB,
Ed25519-verifiering av exakta byte, strikta schema, krav på `live` i kropp/header, versionsgolv och
bevarande av den senaste fungerande cachen som för erbjudanden. När en verifierad aktiv ögonblicksbild har beständiggjorts härleder klienten
`radar:<sha256(supporter key)>`, lagrar endast denna enkelriktade identitet och genererar den särskilda
igenkänningshändelsen `radar_supporter`. Dess `radar-supporter`-märke är idempotent och ger noll XP;
det uppdaterar aldrig topplistor eller återanvänder `token_share`. `/dashboard/radar/intel` renderar märket
endast från verifierade lokala cachemetadata.

CLI:t exponerar `omniroute radar status` och `omniroute radar sync`. Båda kommunicerar endast med det
lokala OmniRoute-API:t. `status` utför ett skrivskyddat `GET /api/radar/status`; `sync` skickar ett
`POST /api/radar/sync-all` och skriver ut ett resultat per flöde. Inget av kommandona läser, tar emot eller skriver ut
supporternyckeln, och inget av dem kontaktar Radar-tjänsten direkt.

---

## Värvningslänkar (gratiskrediter)

Värvningslänkar levereras från ett **fristående, alltid aktuellt** flöde —
`GET /v1/referrals/latest` — separat från katalogflödet. Detta är avsiktligt:
katalogflödet på community-nivån är en ögonblicksbild som kan vara upp till 30 dagar
gammal, så en värvningslänk som hämtades därifrån släpade tidigare efter serverns
verkliga länklista med lika lång tid (en nytillagd värvningslänk nådde inte en
gratis-/community-användare på upp till en månad). Värvningsflödet eliminerar denna
fördröjning genom att synkroniseras enligt ett eget, mycket kortare intervall.

```ts
// Svarskropp från GET /v1/referrals/latest (Ed25519-signerad, samma fasta nyckel som
// för katalogflödet):
{
  feed: "omniroute-radar-referrals",
  schemaVersion: 1,
  generatedAt: string,           // ISO — deterministisk: max(updatedAt) bland
                                  // värvningslänkarna, så att två identiska anrop ger
                                  // exakt samma signerade byte/signatur
  referrals: {
    fixed: RadarReferral[],      // finns på ALLA nivåer, inklusive utan autentisering/community
    campaigns: RadarReferral[],  // fylls endast i för en giltig aktiv Bearer-nyckel
                                  // (supporter); anrop utan autentisering/med utgången nyckel får []
  },
}
// RadarReferral = { provider, url, kind: "fixo" | "campanha", validUntil,
//                    requiredAction, isDefault }
```

Till skillnad från katalogflödet innehåller denna kropp inget `tier`-fält alls —
servern avgör vad som ska inkluderas för varje anrop baserat på `Authorization`-nyckeln,
så svarshuvudet `x-omniroute-feed-tier` är den ENDA källan till den levererade nivån
(`referralsSync.ts::syncRadarReferrals`); ett frånvarande eller okänt huvud degraderas
till `"community"`, antagandet med lägst behörighet. `RadarReferralsFeedSchema`
(`src/lib/radar/referralsFeedSchema.ts`) validerar hela kroppen och återanvänder samma
`RadarReferralSchema` per värvningslänk som exporteras från `feedSchema.ts`, så att båda
flödena validerar enskilda värvningslänkar identiskt. Varje `RadarReferral.url` måste
vara `https://` — en `http://`-URL underkänns vid schemavalideringen.

Det GAMLA kataloginbäddade `referrals`-fältet i `RadarFeedSchema` (`feedSchema.ts`)
behålls för bakåtkompatibilitet med redan cachade katalogflöden, men
`getRadarReferrals()` läser det inte längre — se [Åtkomstfunktion](#accessor) nedan.

### Synkronisering

`syncRadarReferrals()` (`src/lib/radar/referralsSync.ts`) är den ENDA modulen som
använder nätverket för värvningslänkar och speglar kontraktet för `syncRadar()` exakt:
flagga av → `disabled`; bortvald medverkan → `opt_out`; hämtar
`${RADAR_FEED_URL}/v1/referrals/latest` (samma åsidosättningar via
`RADAR_FEED_URL`/`RADAR_FEED_PUBKEY` för alternativa grenar som katalogen), verifierar
Ed25519-signaturen över exakt samma byte som i svaret (`verifyFeedBytes`), validerar mot
`RadarReferralsFeedSchema` och cachar i tabellen `radar_referrals_cache`
(migrering `142_radar_referrals_cache.sql`) — en tabell som är helt separat från
katalogens `radar_feed_cache`. En svarsgräns på 10 MB och ett golv för `generatedAt`
avvisar ett inkommande flöde som är äldre än det cachade och skyddar därmed mot
återuppspelning av en äldre signerad artefakt. En identisk tidsstämpel accepteras:
servern ger avsiktligt community- och live-varianterna av värvningsflödet samma
deterministiska `generatedAt`, så den signerade nyttolasten och den levererade nivån kan
ändras efter ett byte av supporter-nyckel utan att den underliggande länkuppsättningen
ändras. Utlöser aldrig undantag — returnerar alltid ett statusobjekt; fel innehåller
aldrig en stackspårning i `reason`.

Två utlösare håller värvningscachen varm, båda oberoende av katalogens eget
24-timmarsintervall:

- **Synkronisering vid läsning** — `GET /api/radar/referrals` anropar självt
  `syncRadarReferrals()` direkt när cachen saknas eller är äldre än
  `REFERRALS_STALE_MS` (1 timme, `shouldSyncReferralsOnRead()`), innan svaret skickas.
  Det är detta som gör att fasta länkar är ”alltid aktuella” vid nästa inläsning av
  instrumentpanelen, utan att behöva invänta någon bakgrundstimer.
- **Schemalagd sidosynkronisering** — `radarSchedulerTick()` (`scheduler.ts`)
  utvärderar värvningslänkarnas ålder oberoende under samma timvisa körning som används
  för katalogen och anropar `syncRadarReferrals()` vid behov. Detta körs oavsett om
  katalogen själv skulle uppdateras under den körningen och påverkar aldrig formen på
  `RadarTickResult` (endast en sidoeffekt efter bästa förmåga som ignoreras vid fel).

### Åtkomstfunktion

`src/lib/radar/index.ts` exporterar två skrivskyddade åtkomstfunktioner som aldrig
utlöser undantag (samma defensiva kontrakt som `getRadarCatalog()` — avstängd flagga,
ingen cache eller en skadad cachad nyttolast resulterar alla i den tomma formen i
stället för ett fel):

- `getRadarReferrals()` → `{ fixed: RadarReferral[], campaigns: RadarReferral[] }`,
  läser från `radar_referrals_cache` (via `getRadarReferralsCache()`) och validerar
  genom `RadarReferralsFeedSchema` — **inte** katalogcachen.
- `getDefaultReferralFor(provider)` → den `fixed`-värvningslänk som har
  `isDefault: true` för den leverantören, eller `null`. Söker endast i `fixed` — en
  kampanj används aldrig som en leverantörs ”standardlänk”.

Den faktiska regeln för ”vilken värvningslänk som är standard för en leverantör” finns
i `findDefaultReferral()` (`src/lib/radar/referrals.ts`), en liten ren funktion utan
**någon DB-import** — den kan utan risk importeras till en `"use client"`-komponent.
`getRadarReferrals`/`getDefaultReferralFor` (i `index.ts`) hämtar in
`@/lib/db/radar` och förblir därför endast för servern; leverantörsinstrumentpanelen
importerar `referrals.ts` direkt i stället för `index.ts` (se nedan) för att undvika att
paketera `better-sqlite3` för webbläsaren.

### `GET /api/radar/referrals`

Följer exakt samma gate-ordning som alla andra Radar-rutter: `RADAR_ENABLED` av →
`404` (kontrolleras först, byte-identisk tröghet); oautentiserad → `401`; annars
utlöses en synkronisering vid läsning (se ovan) när data är inaktuella, följt av `200` med
`{ fixed, campaigns, tier }` — `tier` kommer direkt från den (möjligen nyss uppdaterade)
cache-raden och är endast informativ (styr gränssnittets mjuka merförsäljningsbudskap nedan). Proxyansluter aldrig
direkt till feed-servern — ruttens egen källkod innehåller inget anrop till `fetch(`;
nätverksanrop sker endast inuti `syncRadarReferrals()`, enligt samma princip om enbart lokal cache
som för `/api/radar/catalog`.

### Instrumentpanelsgränssnitt — fliken "Gratiskrediter" på `/dashboard/radar`

Återanvänder den befintliga Radar-sidan (`src/app/(dashboard)/dashboard/radar/page.tsx`) som en
andra flik i stället för en ny rutt — mindre yta för routning/i18n för en funktion som är en
variant av data som sidan redan hämtar. Efter aktivering erbjuder flikraden
**Katalog** (befintlig tabell) och **Gratiskrediter**:

- Fasta länkar grupperas efter leverantör och visar `requiredAction` (när det finns)
  samt en knapp med `target="_blank" rel="noopener noreferrer"` till hänvisnings-URL:en.
- Kampanjer visar samma information, plus `validUntil` när det finns.
- När `campaigns` är tom **och** den levererade nivån är `community` visar gränssnittet en
  kort merförsäljningsnotis ("tidsbegränsade kampanjer är en supporterförmån") — detta
  döljer eller spärrar **aldrig** listan över fasta länkar, som förblir fullständigt ifylld för varje nivå. Detta
  är endast ett mjukt merförsäljningsbudskap, aldrig en spärr.

### Hänvisningslänk på leverantörsnamnet (leverantörsinstrumentpanelen)

`ProviderPageHeader` (`src/app/(dashboard)/dashboard/providers/[id]/components/`)
länkade redan leverantörsnamnet till `providerInfo.website` när det fanns, med ett
tidigare exempel på en intäktsgenererande länk: notisen om Kimi-partnerlänken (Moonshot AI)
(i18n-nyckeln `providers.kimiPartnerLinkNote`). D28 återanvänder exakt samma diskreta notismönster
för Radars standardhänvisningar i stället för att introducera en ny nyckel.

Lös koppling, avsiktligt:

- `resolveProviderHeaderLink()` (`src/app/(dashboard)/dashboard/providers/providerPageUtils.ts`)
  är en **ren** funktion — `(staticWebsite, referralUrl) => { website, isReferralLink }`
  — utan beroende av `@/lib/radar` eller `@/lib/db/*`. `providerPageUtils.ts` förblir i sin
  helhet fri från dessa importer (vilket verifieras av
  `tests/unit/provider-header-referral-link.test.ts`).
- `ProviderDetailPageClient.tsx` (en `"use client"`-komponent) är den enda plats som får
  hämta Radar-data — via `fetch("/api/radar/referrals")`, samma mönster med lokal rutt
  som själva sidan för Radar-instrumentpanelen använder — och den beräknar standardhänvisningen
  på klientsidan med `findDefaultReferral()` från den DB-fria `src/lib/radar/referrals.ts`.
- När `RADAR_ENABLED` är avstängd returnerar hämtningen 404, `referralUrl` förblir `null` och
  `resolveProviderHeaderLink()` returnerar den statiska katalogens `website` oförändrad — leverantörssidan
  är byte-identisk med hur den såg ut innan den här funktionen infördes. Samma resultat gäller när
  det ännu inte finns någon cache eller ingen standardhänvisning för den specifika leverantören.
- När en standardhänvisning gäller tar `ProviderPageHeader` emot `isReferralLink`
  och visar samma diskreta notis/inforuta som Kimi-partnerlänken (med återanvändning av
  nyckeln `providers.kimiPartnerLinkNote`) — aldrig en ny, separat visuell utformning.

---

## Så självhostar du ett flöde

En fork eller självhostare som vill ha full kontroll över katalogen kan köra en egen
flödestjänst utan att ändra klientkoden:

1. Tillhandahåll en `GET /v1/catalog/latest`-slutpunkt som returnerar en JSON-kropp som uppfyller
   `RadarFeedSchema` (`src/lib/radar/feedSchema.ts`) — på toppnivå `feed:
"omniroute-radar"`, `schemaVersion: 2`, `version`, `tier`, `providers`, `models`,
   `quirks` och `totals`. Respektera `x-omniroute-radar-schema: 2`; en övergångskompatibel server
   bör som standard hantera förfrågningar utan detta som en separat signerad v1-artefakt.
2. Signera de exakta svarsbyten med ett Ed25519-nyckelpar och returnera base64-
   signaturen i svarshuvudet `x-omniroute-feed-signature`.
3. Ange `RADAR_FEED_URL` som den nya bas-URL:en och `RADAR_FEED_PUBKEY` som den matchande
   offentliga nyckeln (base64-DER SPKI eller PEM) — se
   [referensen för miljövariabler](../reference/ENVIRONMENT.md#27-radar-feed-self-hosting).
4. Aktivera `RADAR_ENABLED` och välj att delta via `POST /api/radar/settings`
   (`{ optIn: true }`).

Inga andra kodändringar krävs — `verifyFeedBytes()` hämtar åsidosättningen
automatiskt (`getFeedPublicKeys()` i `src/lib/radar/pinnedKeys.ts`), och versionsjämförelse,
schemavalidering och sammanslagningsreglerna tillämpas på samma sätt på ett självhostat
flöde.

Hänvisningslänkar (se [Hänvisningslänkar (kostnadsfria krediter)](#referral-links-free-credits)
ovan) är en separat, valfri artefakt: en fork som endast tillhandahåller `/v1/catalog/latest`
fungerar fortfarande fullt ut — `syncRadarReferrals()` degraderar till `{ status: "error" }` vid ett `404`-
svar från `/v1/referrals/latest` och cachen förblir helt enkelt tom, så
`GET /api/radar/referrals` fortsätter att returnera `{ fixed: [], campaigns: [], tier: null }`
i stället för att resten av sidan slutar fungera. Om du även vill erbjuda hänvisningslänkar tillhandahåller du
`GET /v1/referrals/latest` som uppfyller `RadarReferralsFeedSchema`
(`src/lib/radar/referralsFeedSchema.ts`) och signerar det med samma Ed25519-nyckelpar som
katalogflödet.

Supportererbjudanden är ytterligare en valfri artefakt. För att tillhandahålla dem implementerar du
`GET /v1/offers/latest` med det slutna `RadarOffersFeedSchema`
(`src/lib/radar/offersFeedSchema.ts`), kräver aktiv behörighet, returnerar
`x-omniroute-feed-tier: live` och signerar de exakta byten med samma nyckel. En fork som utelämnar denna
slutpunkt behåller katalogens och hänvisningarnas beteende oförändrat; uppdatering av erbjudanden misslyckas utan dataförlust och
den senast verifierade lokala erbjudandecachen förblir tillgänglig.

Intel är valfritt på samma sätt. En självhostare kan tillhandahålla `GET /v1/intel/latest` med
`RadarIntelFeedSchema` (`src/lib/radar/intelFeedSchema.ts`), kräva aktiv behörighet, returnera
`x-omniroute-feed-tier: live` och signera de exakta byten med den delade Ed25519-nyckeln. Om
slutpunkten utelämnas förblir katalogen, hänvisningarna och erbjudandena oförändrade; Intel-uppdatering bevarar den senast verifierade
lokala ögonblicksbilden.

---

## Relaterad dokumentation

- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) — mönstret för
  felsvar som `/api/radar/*`-rutterna följer.
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md#27-radar-feed-self-hosting)
  — referens för `RADAR_FEED_URL` / `RADAR_FEED_PUBKEY`.
