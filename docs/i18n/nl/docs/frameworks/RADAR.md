# Radar Free-Model Catalog (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/RADAR.md) · 🇪🇹 [am](../../../am/docs/frameworks/RADAR.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/RADAR.md) · 🇦🇿 [az](../../../az/docs/frameworks/RADAR.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/RADAR.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/RADAR.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/RADAR.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/RADAR.md) · 🇩🇰 [da](../../../da/docs/frameworks/RADAR.md) · 🇩🇪 [de](../../../de/docs/frameworks/RADAR.md) · 🇬🇷 [el](../../../el/docs/frameworks/RADAR.md) · 🇪🇸 [es](../../../es/docs/frameworks/RADAR.md) · 🇪🇪 [et](../../../et/docs/frameworks/RADAR.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/RADAR.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/RADAR.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/RADAR.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/RADAR.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/RADAR.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/RADAR.md) · 🇮🇱 [he](../../../he/docs/frameworks/RADAR.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/RADAR.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/RADAR.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/RADAR.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/RADAR.md) · 🇮🇩 [id](../../../id/docs/frameworks/RADAR.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/RADAR.md) · 🇮🇹 [it](../../../it/docs/frameworks/RADAR.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/RADAR.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/RADAR.md) · 🇰🇭 [km](../../../km/docs/frameworks/RADAR.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/RADAR.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/RADAR.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/RADAR.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/RADAR.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/RADAR.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/RADAR.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/RADAR.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/RADAR.md) · 🇲🇲 [my](../../../my/docs/frameworks/RADAR.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/RADAR.md) · 🇳🇴 [no](../../../no/docs/frameworks/RADAR.md) · 🇮🇳 [or](../../../or/docs/frameworks/RADAR.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/RADAR.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/RADAR.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/RADAR.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/RADAR.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/RADAR.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/RADAR.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/RADAR.md) · 🇱🇰 [si](../../../si/docs/frameworks/RADAR.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/RADAR.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/RADAR.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/RADAR.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/RADAR.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/RADAR.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/RADAR.md) · 🇮🇳 [te](../../../te/docs/frameworks/RADAR.md) · 🇹🇭 [th](../../../th/docs/frameworks/RADAR.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/RADAR.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/RADAR.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/RADAR.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/RADAR.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/RADAR.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/RADAR.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/RADAR.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/RADAR.md)

---

> **Bron van waarheid:** `src/lib/radar/`, `src/lib/db/radar.ts`, `src/app/api/radar/`
> **Laatst bijgewerkt:** 2026-09-01 — v3.8.51
> **Bewijsgrens voor de gehoste service:** de hier beschreven server-side regels zijn op
> 2026-09-01 geverifieerd aan de hand van de opzettelijk private Radar-server op exact revisieniveau
> `main@dce70f004364912f3f144cdb69f4cbcde16093ed`. Die implementatie wordt niet gedistribueerd in
> deze OSS-repository; beschikbaarheid van de gehoste service blijft een afzonderlijke operationele status.

Radar is een **optionele add-on** die een ondertekende, recent samengestelde catalogus met gratis modellen
over de releasebasis (`FREE_MODEL_BUDGETS` in
`open-sse/config/freeModelCatalog.data.ts`) heen legt. Deze bestaat omdat het aanbod van gratis niveaus sneller
verandert dan het releasetempo — providers voegen tussen releases gratis quota toe, verkleinen deze of beëindigen
ze, terwijl de basiscatalogus alleen kan worden bijgewerkt wanneer een nieuwe versie wordt uitgebracht.

**Niets wat vandaag gratis is, houdt op gratis te zijn vanwege de externe feed.** Radar plaatst
een basisitem nooit achter een betaalmuur; het werkt alleen limiet-/statusvelden bij tijdens het lezen en kan
tussen releases nieuw ontdekte gratis modellen toevoegen. Een beheerder kan een model nog steeds lokaal
verbergen en het via hetzelfde dashboard herstellen. De basiscatalogus zelf wordt nooit op schijf
gewijzigd — zie hieronder
[Samenvoegregels voor de overlay tijdens het lezen](#read-time-overlay-merge-rules).

---

## Leveringsstatus in v3.8.51

De volgende status maakt onderscheid tussen wat deze OSS-release implementeert en latere Radar-
werkstromen. Het is een status op codeniveau, geen belofte dat een bepaalde gehoste implementatie
of externe integratie momenteel beschikbaar is.

| Gebied                              | Status in deze release                                                                                                                                                                                                                                                                                              |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Client voor ondertekende catalogus  | Geïmplementeerd achter `RADAR_ENABLED`, met afzonderlijke opt-in, Ed25519-verificatie, lokaal versleutelde instellingen/cache, blijvende weergave-/inschakeloverschrijvingen, omkeerbare tombstones, planner en dashboard.                                                                                          |
| Activering voor bijdragers          | Het dashboard verwijst naar de door de server gehoste GitHub-claimprocedure en accepteert een bestaande `omr_…`-sleutel. De private service bepaalt of bijdragers in aanmerking komen; de OSS-client bevat geen GitHub-token of uitgiftelogica.                                                                     |
| Activering met supporterssleutel    | Geïmplementeerd. De onbewerkte sleutel wordt gevalideerd, versleuteld opgeslagen, gemaskeerd bij het lezen en alleen verzonden tijdens server-side synchronisatie. Het wijzigen of wissen van de sleutel maakt alle vier rechtengevoelige feedcaches ongeldig.                                                      |
| Verwijzingslinks                    | Geïmplementeerd als een afzonderlijk ondertekende feed die elk uur wordt vernieuwd. Vaste links zijn direct beschikbaar voor het communityniveau; beperkte campagnes blijven live-tiergegevens.                                                                                                                     |
| Supportersaanbiedingen              | Geïmplementeerd als een afzonderlijke, ondertekende feed die uitsluitend live beschikbaar is, met een eigen dashboardpagina. De client valideert het gesloten voordeelschema opnieuw, behoudt de laatst geldige cache, filtert verlopen vermeldingen en labelt partneraanbiedingen expliciet.                       |
| Inzichten en supporterserkenning    | Geïmplementeerd als een strikte, ondertekende feed die uitsluitend live beschikbaar is, met ELO in beheer van Radar, feitelijke informatie over actualiteit/trends van de catalogus, een geverifieerde lokale supportersbadge, een dashboardpagina en uitsluitend lokale CLI-opdrachten voor status/synchronisatie. |
| Betalingen en transactionele e-mail | Niet geïmplementeerd in de OSS-client. Aankopen, donaties, beoordeling van ontvangstbewijzen, herstel en e-mailbezorging behoren tot de private service; beschikbaarheid van de gehoste service blijft afhankelijk van de gecontroleerde implementatie en providerconfiguratie ervan.                               |
| Werkstroom voor onderzoeksagenten   | Maakt geen deel uit van deze clientrelease. De inhoud van samengestelde feeds blijft server-side data; er wordt geen autonome onderzoeksagent uitgevoerd in een OmniRoute-installatie.                                                                                                                              |

---

## Lezer voor openbare aankondigingen

De generieke aankondigingslezer staat los van de Radar-featureflag. De Home-pagina van het dashboard en
de Changelog-weergave halen de openbare `news.json` van de repository op via een gewone `GET` naar
`NEWS_JSON_URL` (`src/shared/utils/releaseNotes.ts`). Ze verzenden geen Radar-instelling, prompt, provider-
configuratie, gebruiksregistratie of lokale verwijderingsstatus.

`news.json` gebruikt het gesloten v2-schema dat door `parseNewsPayload()` is geïmplementeerd:

- `schemaVersion: 2` en een begrensde `items[]`-verzameling;
- stabiele, unieke `id`-waarden voor aankondigingen;
- expliciete velden `active` en `publishedAt` in ISO-indeling;
- verplichte Engelse tekst met optionele gelokaliseerde tekst;
- optionele HTTPS-links zonder inloggegevens en een pictogram op een toelatingslijst;
- selectie van nieuwste actieve items eerst, terugval naar Engels voor de landinstelling en lokale verwijdering per ID.

De parser accepteert tijdelijk de voormalige enkelvoudige vorm `{ active, title, message, ... }`, zodat
oudere forks kunnen migreren zonder een defecte Changelog-weergave. Ongeldige feeds zijn inactief. Het Radar-lanceringsitem
wordt geleverd met `active: false`; dit wijzigen naar `true` is een afzonderlijke releaseactie na het mergen en implementeren
en wijzigt `RADAR_ENABLED` of de onafhankelijke opt-in voor feedsynchronisatie niet.

---

## Flag: `RADAR_ENABLED` (standaard uit)

Radar wordt volledig afgeschermd door de featureflag `RADAR_ENABLED`
(`src/shared/constants/featureFlagDefinitions.ts`, categorie `policies`,
`defaultValue: "false"`).

**Wanneer de flag uitstaat, bestaat de interface niet:**

- Alle `/api/radar/*`-endpoints, inclusief lokale lees- en schrijfbewerkingen voor de modelstatus,
  retourneren `404` voordat ze een Radar-module aanspreken.
- De dashboardschermen (`/dashboard/radar`, `/dashboard/radar/setup`,
  `/dashboard/radar/combos`, `/dashboard/radar/offers`, `/dashboard/radar/intel`) renderen
  `notFound()`.
- `getRadarCatalog()` (`src/lib/radar/index.ts`) retourneert de ongewijzigde basisversie —
  hetzelfde aantal items, dezelfde waarden, elk item gelabeld met `origin: "baseline"` — en leest
  nooit de feedcache.
- Er wordt nooit een Radar-netwerkaanroep uitgevoerd; elke synchronisatiemodule retourneert `{ status: "disabled" }`
  voordat `fetch` wordt aangeroepen.

Dit is een strikte overkoepelende toegangspoort: het inschakelen van de flag ontgrendelt alleen de _schermen_,
niets meer. Er worden geen gegevens geüpload, er wordt geen achtergrondsynchronisatie gestart en
routering of modelselectie wordt niet gewijzigd — zie de afzonderlijke opt-in hieronder.

---

## Gegevenssynchronisatie is een AFZONDERLIJKE opt-in — de privacybelofte

Het inschakelen van `RADAR_ENABLED` ontgrendelt alleen de gebruikersinterface. Voor het synchroniseren van de feed
is een tweede, onafhankelijke opt-in vereist die is opgeslagen in `radar_settings.opt_in` (`src/lib/db/radar.ts`,
migratie `136_radar_cache_settings.sql`). `syncRadar()` controleert de flag _en_ de
opt-in voordat een netwerkaanroep wordt uitgevoerd:

```
Flag uit       → { status: "disabled" }   — geen netwerkaanroep
Opt-in false   → { status: "opt_out" }    — geen netwerkaanroep
```

Wanneer beide zijn ingeschakeld, verloopt het synchronisatiepad als volgt:

1. `GET <feed base URL>/v1/catalog/latest` met `x-omniroute-radar-schema: 2` en een optionele
   `Authorization: Bearer <supporter key>`-header (zie hieronder). Servers gebruiken standaard het afzonderlijk
   ondertekende v1-overgangsartefact wanneer de schemaheader ontbreekt, zodat oudere geïnstalleerde clients
   updates blijven ontvangen.
2. Dit is een uitsluitend downloadende applicatiestroom, maar het blijft een HTTPS-verzoek. De gehoste
   infrastructuur ontvangt gebruikelijke verbindingsmetadata, zoals het bron-IP-adres. Wanneer een supporter-
   sleutel is geconfigureerd, verzendt de synchronisatie die sleutel ook in de Bearer-header, zodat de service de
   aanspraak kan bepalen. In de exacte revisie van de privéserver die binnen de bovenstaande bewijsgrens is geïdentificeerd,
   gebruikt de registratie van feedverzoeken sleutelhashes, geaggregeerd gebruik en een dagelijks roterende, afgekorte HMAC
   van het IP-adres voor handmatige controle op misbruik; deze tabellen slaan noch de sleutel, noch het IP-adres in onbewerkte vorm op.
   Toegangslogboeken van de infrastructuur en de versleutelde uitvoerwachtrij voor levering vormen afzonderlijke operationele
   grenzen.
3. OmniRoute verzendt nooit prompts, antwoorden, gesprekken, providerinloggegevens, modelverkeer,
   uptime, latentie of de lokale providerconfiguratie naar de Radar-service.
4. Het antwoord wordt geverifieerd, gevalideerd en lokaal in de cache opgeslagen (zie
   [Beveiligingsmodel](#security-model)). Radar heeft precies vier serverzijdige netwerkpaden:
   `syncRadar()` voor de catalogus, `syncRadarReferrals()` voor verwijzingen en
   `syncRadarOffers()` / `syncRadarIntel()` voor aanbiedingen en Intel die uitsluitend voor supporters beschikbaar zijn.

De **supportersleutel** is een optioneel Bearer-token (`radar_settings.supporter_key`)
waarmee de feedservice kan bepalen welke laag moet worden aangeboden (zie
[Lagen](#tiers-community-and-live)). Deze wordt:

- **Versleuteld opgeslagen** met dezelfde AES-256-GCM-helpers `encrypt()`/`decrypt()`
  (`src/lib/db/encryption.ts`) die voor providerinloggegevens worden gebruikt.
- Ingesteld via `POST /api/radar/settings` (`{ supporterKey: "omr_" + 40 hex chars }`) en
  **nooit teruggestuurd** — het antwoord retourneert een gemaskeerde vorm (`omr_****abcd`).
- Bij wijziging of verwijdering worden de caches voor de catalogus, verwijzingen, aanbiedingen en Intel atomair ongeldig gemaakt. De
  volgende synchronisatie-/leesbewerking bepaalt de nieuwe aanspraak aan de serverzijde; het opslaan van een sleutel voert op zichzelf
  geen netwerkverzoek uit en verbruikt geen activeringssleutel voor eenmalig gebruik.
- Als Bearer-token naar de feedservice verzonden bij de synchronisatie-GET — verder verlaat niets over de
  sleutel ooit de client.

---

## Toegangs- en veiligheidsregels die vóór opt-in worden getoond

Het inactieve dashboard geeft deze regels weer vanuit
`src/app/(dashboard)/dashboard/radar/RadarAccessExplainer.tsx` **vóór** een van beide activeringsacties.
De canonieke toegangsschaal is:

| Niveau                        | Voorwaarden                                                                                                        | Toegang                                                 | Regel voor herhaling/verval                                                             |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Community                     | Iedereen; geen sleutel                                                                                             | Volledige catalogus met ongeveer 30 dagen vertraging    | Altijd beschikbaar; geen uitgifte                                                       |
| Ster + volgen                 | GitHub OAuth verifieert zowel een ster voor de repository als het volgen van de eigenaar                           | Eenmalige livelezing van de catalogus, daarna Community | Eén uitgifte per login; wordt nooit opnieuw uitgegeven                                  |
| Contributor Top 10            | Posities 1–10 in de meest recente volledige wekelijkse ranglijst                                                   | 365 dagen live toegang                                  | Op aanvraag geclaimd; het verlaten van de ranglijst verkort een toegekende periode niet |
| Contributor Top 100           | Posities 11–100 in die ranglijst                                                                                   | 90 dagen live toegang                                   | Dezelfde regel voor claimen op aanvraag/idempotent claimen                              |
| Aankoop door supporter        | Eenmalige aankoop voor 6 maanden, 1 jaar of levenslang                                                             | Livecatalogus, ondertekende liveaanbiedingen en Intel   | Geen automatische verlenging                                                            |
| Donatie/handmatige toekenning | Door de eigenaar beoordeelde donatie of een toekenning door de eigenaar voor een expliciet aantal dagen/levenslang | Hetzelfde live-recht voor de toegekende periode         | Gecontroleerde, idempotente toekenning                                                  |

Samengevoegde PR's, commits en gewijzigde regels zijn **uitsluitend invoer voor de ranglijst**. Een login buiten de Top 100 krijgt
geen Contributor-toekenning, ongeacht het aantal PR's. Tijdelijke aankopen, donaties, Contributor-periodes en
handmatige toekenningen worden opgeteld bij de huidige vervaldatum; levenslang heeft voorrang. Een wijziging in de rangschikking
trekt reeds toegekende tijd nooit met terugwerkende kracht in en verkort deze ook niet.

De gehoste licentie is persoonlijk en de voor gebruikers zichtbare regel is één actieve installatie tegelijk. Deze
release claimt **geen** hardwarevergrendeling: de OSS-synchronisatie maakt geen hardwarevingerafdruk en beheert geen
cryptografische apparaatlease. In de hierboven vermelde geverifieerde revisie van de privéserver bestaat de geïmplementeerde handhaving
uit validatie van rechten plus een signaal voor handmatige beoordeling wanneer dezelfde actieve sleutel binnen 24 uur vanaf een vierde
afzonderlijk IP-adres wordt waargenomen. Dat signaal blokkeert of trekt een sleutel nooit automatisch in. Herstel
trekt de verloren sleutel in en vervangt deze met behoud van de bestaande vervaldatum; de
gekochte of toegekende periode begint hierdoor niet opnieuw.

Liveaanbiedingen worden handmatig samengesteld en kunnen wijzigen of verlopen. Het opt-in-scherm vermeldt ook de exacte
privacygrens: ondertekende catalogus-/verwijzingsmetadata worden gedownload; een geldige sleutel ontgrendelt daarnaast
ondertekende aanbiedingen en Intel; de Bearer-sleutel en normale verbindingsmetadata bereiken de gehoste dienst;
prompts, antwoorden, gesprekken, providerreferenties, modelverkeer, uptime, latentie en lokale
providerconfiguratie niet.

---

## Een supporter-sleutel verkrijgen

Het activeringsscherm (`/dashboard/radar`) bevat links naar twee trajecten om een
supporter-sleutel te **verkrijgen**. De OSS-repository zelf geeft er nooit een uit, voert nooit betalingscode uit en
**vermeldt nooit een prijs** — prijzen worden volledig bepaald en weergegeven op de
bestemmingspagina's, niet in deze repository (specificatiebesluit D14).

- **"Ik ben een bijdrager"** — opent `RADAR_CONTRIBUTOR_CLAIM_URL` (standaard
  `https://radar.omniroute.online/auth/github`), een via GitHub OAuth verlopend claimtraject dat wordt gehost op
  de privé-Radar-server. Dit controleert de meest recente volledige wekelijkse ranglijst: de top 10 ontvangt 365 dagen
  en posities 11–100 ontvangen 90 dagen. Buiten de top 100 geeft het aantal PR's nooit toegang; het traject
  controleert in plaats daarvan het afzonderlijke eenmalige niveau voor een ster + volgen.
- **"Steun het project"** — opent `RADAR_SUPPORTER_PLANS_URL` (standaard
  `https://radar.omniroute.online/planos`), de gehoste pagina voor de eenmalige opties van 6 maanden, 1 jaar en
  levenslang. De OSS-pagina geeft nog steeds geen geldbedrag weer.

Beide URL's worden server-side bepaald (`src/lib/radar/links.ts`, hetzelfde patroon voor
overschrijving via omgevingsvariabelen als `RADAR_FEED_URL`) en via de bestaande
respons van `GET /api/radar/settings` (`contributorClaimUrl`, `supporterPlansUrl`) doorgegeven aan het dashboard — de
clientcomponent leest `process.env` nooit zelf.

| Variabele                     | Doel                                                                                                 |
| ----------------------------- | ---------------------------------------------------------------------------------------------------- |
| `RADAR_CONTRIBUTOR_CLAIM_URL` | Overschrijft de URL voor bijdragersclaims (standaard `https://radar.omniroute.online/auth/github`).  |
| `RADAR_SUPPORTER_PLANS_URL`   | Overschrijft de URL voor supporter-abonnementen (standaard `https://radar.omniroute.online/planos`). |

### Een verloren supporter-sleutel herstellen

Het hersteltoegangspunt van de gehoste service is `https://radar.omniroute.online/recover`; hiernaar wordt ook
gelinkt vanaf de abonnementenpagina. Herstel blijft volledig buiten de OSS-client, omdat de lokale
installatie nooit het e-mailadres van de koper/bijdrager ontvangt en geen onbewerkte sleutel kan reconstrueren uit
de versleutelde instellingen.

1. Dien het e-mailadres in dat aan de sleutel is gekoppeld. De service retourneert dezelfde bevestigingspagina, ongeacht of
   er een herstelbare licentie bestaat, zodat het formulier geen accounts prijsgeeft.
2. Indien gerechtigd, verzendt de bezorgworker een kortstondige link voor eenmalig gebruik. Wanneer deze wordt geopend, wordt
   het token onmiddellijk verplaatst naar een tijdelijke versleutelde `HttpOnly`/`Secure`-cookie en wordt doorgestuurd naar de schone
   `/recover`-URL; de pagina bevat geen token, e-mailadres, oude sleutel of vervangende sleutel.
3. Bevestig de intrekking. De privéservice trekt de vorige sleutel in, maakt de vervangende sleutel aan met
   hetzelfde abonnement/dezelfde vervaldatum en zet deze in één transactie in de wachtrij voor verzending per e-mail. De vervangende sleutel wordt nooit
   teruggestuurd naar de browser.
4. Plak de vervangende sleutel in `/dashboard/radar`. De oude sleutel moet nu terugvallen naar `community`; de
   vervangende sleutel moet een geverifieerde `live`-synchronisatie opleveren. Het opnieuw openen van dezelfde herstellink moet mislukken met
   een algemene melding dat de link ongeldig/verlopen is.

De gehoste herstelroute en mailworker kunnen in de code aanwezig zijn, maar toch niet beschikbaar zijn in een bepaalde
implementatie. Noem het traject niet productierijp voordat de server is geïmplementeerd, de bezorgprovider
is geconfigureerd met een gecontroleerde ontvanger en de volledige link voor eenmalig gebruik is getest.

Zodra een bezoeker een sleutel heeft (`omr_` + 40 hexadecimale tekens), biedt het activeringsscherm
(`src/app/(dashboard)/dashboard/radar/page.tsx`) als primair traject een invoerveld om de sleutel te plakken:
het plakken en verzenden van een sleutel stuurt in één aanroep `POST /api/radar/settings`
(`{ optIn: true, supporterKey }`) — door een sleutel te plakken wordt deze zowel ingesteld als toestemming verleend,
waardoor het scherm wordt ontgrendeld. De indeling (`omr_` + 40 hexadecimale tekens) wordt voor het gemak van de gebruiker eerst
client-side gecontroleerd met de gedeelde helper `isValidSupporterKeyFormat()` (`src/lib/radar/supporterKey.ts`);
het Zod-schema van de server is hoe dan ook de gezaghebbende controle. Zodra een
sleutel is ingesteld, toont het activeringsscherm de gemaskeerde vorm (`supporterKeyMasked` uit
`GET /api/radar/settings`) in plaats van een leeg invoerveld, met een bedieningselement "sleutel wijzigen" om
een nieuwe te plakken — de onbewerkte sleutel wordt nooit opnieuw weergegeven. De twee knoppen voor claimen/abonnementen hierboven
blijven de manier om in eerste instantie een sleutel te _verkrijgen_; via dit invoerveld activeert een beheerder
die er al een heeft deze.

### End-to-endactivering en begeleide configuratie

De privé-feedservice en deze OSS-client hebben een bewust smalle grens: de service
geeft de supporter-sleutel uit en valideert deze, terwijl de lokale OmniRoute-installatie de sleutel versleutelt,
ondertekende artefacten server-side synchroniseert en de configuratie van providers begeleidt. De volgorde voor begeleide validatie is:

1. Verkrijg een nieuw uitgegeven of herstelde sleutel via de contributor-claim, plans/checkout, het hersteltraject of een bevoegde beheerder van een privéserver. Plak de onbewerkte sleutel niet in logboeken, schermafbeeldingen, opmerkingen bij issues of opdrachtregelargumenten.
2. Schakel de featureflag `RADAR_ENABLED` in op de lokale OmniRoute-installatie. Hierdoor wordt de UI beschikbaar, maar deze blijft netwerkinactief totdat de afzonderlijke opt-in is opgeslagen.
3. Open `/dashboard/radar`, plak de sleutel en activeer. De browser verzendt één lokaal verzoek, `POST /api/radar/settings`, met `{ optIn: true, supporterKey }`; de sleutel wordt lokaal versleuteld en het antwoord bevat alleen `omr_****<last4>`.
4. Laat het activeringsscherm de catalogussynchronisatie uitvoeren of selecteer **Nu synchroniseren**. Controleer of de pagina `live`, een feedversie en een ophaaltijd vermeldt. Voor een geverifieerde lokale diagnose rapporteert `GET /api/radar/status` de status van de opt-in/aanwezigheid van de sleutel en de vier cachestatussen zonder de sleutel te retourneren. Met `POST /api/radar/sync-all` kunnen de catalogus, verwijzingen, aanbiedingen en Intel expliciet worden vernieuwd.
5. Open `/dashboard/radar/setup?provider=<provider>`. Volg de door de provider beheerde URL voor inloggegevens, selecteer **API-sleutel toevoegen**, sla deze op via het echte providerformulier, keer terug naar de handleiding en voer **Verbinding testen** uit. De handleiding gebruikt de normale routes `/api/providers` en `/api/providers/<connection-id>/test`; er worden geen afzonderlijke Radar-inloggegevens aangemaakt.
6. Open `/dashboard/radar/combos` nadat ten minste twee compatibele providerverbindingen actief zijn. Bekijk de voorgestelde familie en maak de combinatie aan via de bestaande combo-API. Aanbiedingen en Intel blijven afzonderlijke, ondertekende caches die alleen live beschikbaar zijn en kunnen op hun eigen Radar-pagina's worden gecontroleerd.
7. Laad `/dashboard/radar` en de installatiepagina opnieuw. De opt-in, de status van de gemaskeerde sleutel, de geverifieerde cache, de opgeslagen providerverbinding en de testactie moeten behouden blijven na het opnieuw laden. Leg pas bewijsmateriaal vast nadat de onbewerkte sleutel en de inloggegevens van de provider niet meer zichtbaar zijn.

Het opslaan van een sleutel is op zichzelf geen bewijs van live-rechten. Het bewijs bestaat uit de combinatie van het resultaat van `GET /v1/license/check` van de privéservice, de door de OSS-catalogus geleverde `live`-laag, een geverifieerde ondertekende cache en de echte providerverbindings- en testprocedure. Bij een ongeldige, verlopen of ingetrokken sleutel wordt de catalogus veilig teruggezet naar `community`; dit mag niet als een geslaagde validatie van een live-sleutel worden gerapporteerd.

### Koppeling naar het privébeheerpaneel

`RADAR_ADMIN_URL` voegt optioneel **Radar-beheer ↗** toe direct na het gebruikersgerichte Radar-item in de sectie Kosten van de zijbalk. Er is bewust geen standaardwaarde: wanneer de variabele niet is ingesteld of ongeldig is, bevatten de statische zijbalk, het opdrachtenpalet en het scherm voor zijbalkaanpassing geen beheeritem en geen privé-URL.

De waarde wordt aan de serverzijde bepaald en via het met beheer geverifieerde antwoord van `GET /api/settings` uitsluitend doorgegeven aan een geverifieerde dashboardsessie, of aan de vertrouwde loopback-eigenaar tijdens een lokale bootstrap zonder aanmelding. Authenticatie via de CLI, interne services en API-sleutels met manage-scope ontvangt deze waarde niet. De browser valideert het antwoord opnieuw voordat de externe koppeling wordt weergegeven; deze wordt geopend met `noopener noreferrer`.

Gebruik een HTTPS-tunnel- of tailnet-URL zonder inloggegevens. Gewone HTTP wordt alleen geaccepteerd voor een SSH-forward via loopback, zoals `http://127.0.0.1:9351`; andere schema's, ingesloten inloggegevens, onjuist gevormde URL's en externe HTTP-bestemmingen worden standaard geblokkeerd en laten de navigatie inactief.

---

## Beveiligingsmodel

### Ed25519-handtekening over de exacte bytes

De feedpayload is ondertekend met Ed25519. `verifyFeedBytes()`
(`src/lib/radar/verify.ts`) verifieert de handtekening over de **exacte responsbytes**
die via de verbinding zijn ontvangen — de payload wordt vóór verificatie nooit opnieuw geserialiseerd, zodat
een byte-voor-byte-hercodering de handtekeningcontrole niet ongemerkt ongeldig kan maken of omzeilen.
Een mislukte verificatie (`invalid_signature`) breekt de synchronisatie af voordat de payload
ooit wordt geparseerd of gecachet.

### Vastgezette openbare sleutel + rotatie

De openbare sleutel voor verificatie is vastgezet in `src/lib/radar/pinnedKeys.ts`
(`PINNED_FEED_PUBLIC_KEYS`), een array zodat een nieuwe sleutel voorafgaand aan een
rotatie vooraan kan worden toegevoegd, terwijl oude gecachete feeds die met een eerdere sleutel zijn ondertekend geldig blijven totdat
ze opnieuw worden gesynchroniseerd.

### Omgevingsvariabele-overschrijvingen voor forks

Met twee omgevingsvariabelen kunnen forks en self-hosters de client naar hun eigen feed laten verwijzen in plaats van
naar de standaardservice van OmniRoute — zie
[Een feed zelf hosten](#how-to-self-host-a-feed) hieronder:

| Variabele           | Doel                                                                                                                         |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `RADAR_FEED_URL`    | Overschrijft de basis-URL van de feed (standaard `https://radar.omniroute.online`).                                          |
| `RADAR_FEED_PUBKEY` | Overschrijft de vastgezette openbare sleutel (base64-DER SPKI of PEM) en vervangt de ingebouwde array door deze ene sleutel. |

### Versieondergrens

`syncRadar()` weigert een gedownloade feed waarvan de `version` niet strikt nieuwer is dan de
momenteel gecachete versie (`compareVersions()`, vergelijking van gestippelde `YYYY.MM.DD.n`-waarden) —
`{ status: "stale" }`. Dit voorkomt dat een gecompromitteerd of verkeerd geconfigureerd feedeindpunt
een client terugzet naar een oudere, anders ondertekende payload.

### Twee datums en waarom beide worden bewaard

Een gecachete feed bevat twee afzonderlijke datums; voorkomen dat ze worden verward is precies de reden waarom
beide worden bewaard:

| Veld          | Afkomstig uit                | Beantwoordt                                |
| ------------- | ---------------------------- | ------------------------------------------ |
| `generatedAt` | de ondertekende feedinhoud   | hoe oud de **gegevens** zijn               |
| `fetchedAt`   | de klok van deze installatie | wanneer deze installatie ze **downloadde** |

Een feed die minuten geleden is opgehaald, kan cijfers van weken oud bevatten. Daarom kan `fetchedAt` alleen
een beheerder niet vertellen of de overlay actueler is dan de basis waarop deze is geplaatst. Beide worden
opgeslagen in `radar_feed_cache`, geretourneerd door `getRadarCatalog().meta` en afzonderlijk
gerapporteerd door `GET /api/radar/status`. Een rij die werd gecachet voordat de kolom `generated_at`
bestond (migratie 163), wordt teruggelezen als `null` — onbekend blijft onbekend in plaats van
de ophaaltijd over te nemen. `radar_referrals_cache` bewaart sinds
migratie 142 zijn eigen `generated_at`.

De bovenstaande versieondergrens vergelijkt `version`, niet een van beide datums.

Er blijven twee hiaten bestaan, beide bewust: het dashboard toont nog steeds alleen `Last fetched`, dus om
de builddatum daar te tonen is een nieuw label nodig (en de bijbehorende 41 vertalingen); en de caches voor aanbiedingen en intel
bewaren helemaal geen builddatum, hoewel hun feedschema's er wel een bevatten — `GET
/api/radar/status` laat het veld voor die twee daarom weg in plaats van een `null` te rapporteren
dat als 'onbekend' zou worden geïnterpreteerd.

### Schemavalidatie

De gedownloade bytes worden **na** verificatie van de handtekening geparseerd en gevalideerd aan de hand van `RadarFeedSchema`
(`src/lib/radar/feedSchema.ts`, een Zod-schema). Een
schema-afwijking retourneert `{ status: "invalid_schema" }` en laat de cache
ongewijzigd. De gecachete payload wordt bij elke leesbewerking uit voorzorg opnieuw gevalideerd
(`getRadarCatalog()`) — bij een beschadigde of handmatig bewerkte cacherij wordt teruggevallen op de
basisgegevens in plaats van dat deze wordt aangeleverd.

### Limiet voor responsgrootte (10 MB)

`syncRadar()` hanteert een **harde limiet van 10 MB** voor de responsinhoud van de feed — de ondertekende
feed is een JSON-document van enkele KB's, dus alles boven deze limiet wijst op een verkeerd geconfigureerde of
kwaadaardige `RADAR_FEED_URL` (of een upstream die rommel aanbiedt), niet op een legitieme catalogus.
De handhaving bestaat uit twee lagen:

1. Een voorafgaande controle van `Content-Length` slaat het lezen van de inhoud volledig over wanneer de
   header al een waarde boven de limiet aangeeft.
2. Een controle van het lopende totaal tijdens het lezen van de inhoud handhaaft de limiet ook wanneer
   `Content-Length` ontbreekt of de werkelijke grootte te laag opgeeft — de header wordt nooit
   op zichzelf vertrouwd. Door de verzamelde chunks samen te voegen, blijven de exacte
   bytes behouden die daarna nodig zijn voor de controle van de Ed25519-handtekening.

Het overschrijden van de limiet retourneert `{ status: "too_large" }` en laat de cache ongewijzigd,
volgens hetzelfde niet-destructieve patroon als elke andere synchronisatiefout
(`invalid_signature`, `invalid_schema`, `stale`).

---

## Niveaus: `community` en `live`

Het feedschema bevat een veld `tier: "community" | "live"`, dat **server-side**
door de feedservice wordt bepaald op basis van het verzoek (aanwezigheid en geldigheid van de supportersleutel)
— de client bepaalt nooit zijn eigen niveau.

- **`community`** — de gratis catalogus die ongeveer 30 dagen achterloopt op de meest recente
  gegevens. Dit ontvangt een niet-geverifieerd verzoek of een verzoek met een ongeldige sleutel.
- **`live`** — de meest recente catalogus, verstrekt aan verzoeken met een geldige
  supportersleutel.

**Een ongeldige of verlopen supportersleutel valt terug op `community` — dit is nooit een
fout.** Het synchronisatiepad maakt alleen onderscheid tussen fouten in ondertekening/schema/versie (allemaal
herstelbaar en allemaal niet-fataal voor de gecachte status) en een geslaagd `{ status:
"updated", version, tier }`. Er is geen niveauspecifiek foutpad dat een client hoeft af te
handelen.

### Het aangeboden niveau komt uit een responsheader, niet uit de ondertekende body

Het veld `tier` in de **body** van de ondertekende feed is altijd `"live"` — de feedservice levert
**twee ondertekende artefacten per versie**: live bevat actuele campagnes en community
laat deze weg. Elk artefact wordt op basis van zijn eigen exacte bytes ondertekend. De body dient nog steeds niet
als beslissing over toegangsrechten; het niveau dat daadwerkelijk voor een verzoek wordt geselecteerd, wordt doorgegeven
in de **responsheader `x-omniroute-feed-tier`**, server-side bepaald aan de hand van de
`Authorization`-sleutel van het verzoek.

`syncRadar()` (`src/lib/radar/sync.ts::parseServedTierHeader()`) is de enige plek
die bepaalt welk niveau een client moet vertrouwen:

1. Parse `x-omniroute-feed-tier` met `RadarTierSchema` (Zod) — een ontbrekende header of
   een waarde die niet exact `"community"` of `"live"` is, wordt behandeld alsof deze **niet
   aanwezig** is (deze wordt nooit ongewijzigd in de cache/UI vertrouwd; dit omvat ook oudere feedservers
   van vóór de introductie van de header).
2. Val alleen terug op het veld `tier` van de ondertekende body (altijd `"live"`) wanneer stap 1
   niets oplevert.
3. Het bepaalde niveau wordt gecacht en geretourneerd als `{ status: "updated",
version, tier }` — dit is de waarde die het dashboard toont, nooit het onbewerkte veld uit de
   body.

---

## Samenvoegregels bij het lezen

`applyFeed()` (`src/lib/radar/applyFeed.ts`) voegt de gecachte feed **over** de
statische basis heen samen **tijdens het lezen**, binnen `getRadarCatalog()`. De basisarray
(`FREE_MODEL_BUDGETS`) wordt nooit gewijzigd — bij elke aanroep wordt een nieuwe `MergedEntry[]`
berekend.

Vier regels, in volgorde van prioriteit:

1. **De feed overschrijft nooit een lokale aanpassing.** Per veld: als de beheerder
   een veld van een item heeft aangepast (de map `localOverrides`, met als sleutel `provider:modelId`),
   wordt de waarde van de feed voor dat specifieke veld overgeslagen — de waarde van de beheerder wint.
2. **`enabled: false` schakelt het item uit, met herkomstinformatie.** Een feeditem dat
   een item uitschakelt, stelt `enabled: false` en `disabledBy: "radar"` in op het samengevoegde resultaat,
   zodat de UI kan uitleggen _waarom_ een item van beschikbaar naar uitgeschakeld ging.
3. **Een door de gebruiker toegevoegd item dat niet in de feed voorkomt, blijft ongewijzigd bestaan.** Items die
   alleen in de basis bestaan (of lokaal zijn toegevoegd) en waarvoor geen overeenkomstig feeditem
   bestaat, worden ongewijzigd doorgegeven.
4. **Een met een tombstone gemarkeerd item wordt nooit opnieuw tot leven gewekt.** Als de beheerder een
   item expliciet heeft verwijderd (de set `tombstones`), zorgt het opnieuw toevoegen van die
   `provider:modelId` door de feed in een latere versie er niet voor dat het terugkeert.

De bewerkbare velden en tombstones worden opgeslagen in
`radar_local_model_state` (migratie `153_radar_local_model_state.sql`). De openbare DB-adapter
(`src/lib/db/radar.ts`) zet die rijen om in de map `localOverrides` en de set
`tombstones` die door `applyFeed()` worden gebruikt; `getRadarCatalog()` laadt die status in productie
nadat de controles voor de featureflag, cache en het schema zijn geslaagd. Alleen `displayName` en `enabled` kunnen
door de beheerder worden bewerkt. De identiteit van provider/model, feedherkomst, quota, mogelijkheden, gebruiksvoorwaarden
en configuratiegegevens kunnen niet via deze interface worden weggeschreven.

Het dashboard biedt vier lokale acties:

- **Bewerken** wijzigt de lokale weergavenaam en ingeschakelde status.
- **Lokale wijzigingen resetten** wist beide bewerkbare velden zonder een tombstone te wijzigen.
- **Verbergen** maakt een tombstone aan, zodat latere feedupdates de rij niet opnieuw kunnen aanmaken.
- **Herstellen** verwijdert de tombstone; afzonderlijk opgeslagen aanpassingen blijven van kracht.

Een `enabled: false` uit de feed blijft de veiligheidsuitzondering: deze heeft voorrang op een verouderde lokale
`enabled: true`, houdt het samengevoegde item uitgeschakeld en registreert `disabledBy: "radar"`.

Cataloguspublicaties gebruiken `schemaVersion: 2`. `contextWindow` en elk van `tools`, `vision` en
`thinking` zijn onafhankelijk `number | null` / `boolean | null`: `null` betekent onbekend, terwijl
`false` betekent dat een door D16 bevestigde officiële providerbron expliciet aangeeft dat de mogelijkheid ontbreekt.
Interne register-/modelspecificatievlaggen van OmniRoute worden nooit rechtstreeks tot feedfeiten verheven. De client
accepteert nog steeds v1-snapshots; omdat de oude builder `false` als tijdelijke aanduiding voor afwezigheid gebruikte, wordt `false` uit v1
genormaliseerd naar onbekend, terwijl `true` uit v1 feitelijk blijft. Onbekende schemaversies worden standaard geweigerd en de
laatste geldige cache blijft beschikbaar. Elk v2-model met een niet-null-context/-mogelijkheid moet een
zonder aanmeldgegevens toegankelijke HTTPS-`metadataEvidenceUrls[]` bevatten; anders mislukt de schemavalidatie en wordt de cache
niet vervangen. De catalogustabel geeft alle drie de statussen weer als `✓`, `✕` en `?`.

### Begeleide combinaties en MCP-toegang

Bevestigde `familyId`-waarden blijven behouden tijdens het samenvoegen bij het lezen en sturen de pure
module `buildRadarComboSuggestions()` (`src/lib/radar/comboSuggestions.ts`) aan. Een familie wordt alleen voorgesteld
wanneer ten minste twee verschillende providers actieve verbindingen hebben en exact de samengestelde model-ID
beschikbaar stellen. Uitgeschakelde modellen, inactieve providers, ontbrekende model-ID's, families met één provider en ambigue
alias-/prefixovereenkomsten worden standaard geweigerd. Suggesties gebruiken de bestaande `priority`-strategie, waarbij het
grootste terugkerende maandbudget als eerste wordt geplaatst; de UI maakt ze uitsluitend aan via `POST /api/combos`.

De begeleide UI bevindt zich op `/dashboard/radar/combos`. Deze leest uitsluitend de lokale
eindpunten `GET /api/radar/catalog` en `GET /api/combos/builder/options`. De UI activeert nooit een Radar-synchronisatie,
leest geen providerreferenties en schrijft niet rechtstreeks naar de combodatabase.

MCP-clients kunnen dezelfde lokale projectie lezen met `omniroute_radar_catalog` (`read:radar`). De
optionele filters `provider`, `familyId` en `enabledOnly` worden geëvalueerd na één lokale
`GET /api/radar/catalog`-lezing. De gesloten uitvoer bevat catalogusmetadata plus provider/model,
weergavenaam, `familyId`, quotum, mogelijkheden, ingeschakelde status, oorsprong en `disabledBy`; configuratie-URL's,
stappen, verbindingen, e-mailadressen, sleutels en verwijzingsgegevens worden nooit geretourneerd. Deze tool is
alleen-lezen en roept nooit `/api/radar/sync` aan.

### Herkomstmarkeringen

Elke samengevoegde vermelding bevat een veld `origin` dat door de UI als badge wordt weergegeven:

- `"baseline"` — ongewijzigd overgenomen uit de statische releasecatalogus.
- `"radar"` — een of meer velden zijn door de feed bijgewerkt.
- `"local"` — de beheerder heeft ten minste één lokale overschrijving voor deze vermelding (lokale
  overschrijvingen hebben volgens regel 1 altijd voorrang op de feed, ongeacht wat de feed vermeldt).

---

## Lokale oppervlakken — nooit een feedproxy

De onderstaande lokale Radar-routefamilies ondersteunen de UI onder `src/app/api/radar/`:

| Route                          | Methode | Doel                                                                                                                                    |
| ------------------------------ | ------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `/api/radar/catalog`           | GET     | Retourneert de samengevoegde catalogus (`getRadarCatalog()`) uit de lokale cache.                                                       |
| `/api/radar/sync`              | POST    | Activeert `syncRadar()` aan de serverzijde en retourneert de resulterende status.                                                       |
| `/api/radar/settings`          | GET     | Retourneert `{ optIn, hasSupporterKey, supporterKeyMasked }` — nooit de onbewerkte sleutel.                                             |
| `/api/radar/settings`          | POST    | Stelt opt-in en/of de (versleutelde) supporterssleutel in.                                                                              |
| `/api/radar/referrals`         | GET     | Retourneert `{ fixed, campaigns, tier }` uit de lokale cache — zie [Verwijzingslinks](#referral-links-free-credits) hieronder.          |
| `/api/radar/offers`            | GET     | Retourneert actieve aanbiedingen uit de geverifieerde lokale live-cache; retourneert nooit de supporterssleutel.                        |
| `/api/radar/offers/sync`       | POST    | Activeert de alleen-met-live-sleutel werkende `syncRadarOffers()`-pijplijn aan de serverzijde.                                          |
| `/api/radar/intel`             | GET     | Retourneert geverifieerde lokale live-Intel plus een booleaanse waarde voor supporterherkenning; nooit een identiteit of sleutel.       |
| `/api/radar/intel/sync`        | POST    | Activeert de alleen-met-live-sleutel werkende `syncRadarIntel()`-pijplijn aan de serverzijde.                                           |
| `/api/radar/status`            | GET     | Retourneert een alleen-lezenstatus van lokale instellingen/caches voor catalogus, verwijzingen, aanbiedingen en Intel, zonder geheimen. |
| `/api/radar/sync-all`          | POST    | Voert alle vier synchronisatiemodules aan de serverzijde uit en retourneert voor elke feed een afzonderlijke status.                    |
| `/api/radar/local-model-state` | GET     | Geeft persistente overrides en tombstones weer voor bewerkings- en herstelbediening.                                                    |
| `/api/radar/local-model-state` | PATCH   | Stelt de gevalideerde overridevelden `displayName`/`enabled` in of wist deze.                                                           |
| `/api/radar/local-model-state` | PUT     | Maakt of verwijdert een tombstone met `{ provider, modelId, tombstoned }`.                                                              |
| `/api/radar/local-model-state` | DELETE  | Wist bewerkbare overridevelden, maar behoudt een eventuele tombstone.                                                                   |

**Harde regel: deze routes fungeren nooit als proxy voor de feedservice.** De browser communiceert uitsluitend
met de lokale OmniRoute-server. De vier modules die contact maken met de Radar-service zijn
`src/lib/radar/sync.ts` (catalogus), `src/lib/radar/referralsSync.ts` (verwijzingen) en
`src/lib/radar/offersSync.ts` (aanbiedingen), plus `src/lib/radar/intelSync.ts` (Intel); ze worden allemaal
aan de serverzijde uitgevoerd, nooit aan de clientzijde. Hierdoor blijven
de feed-URL en eventuele supporterssleutels volledig buiten het clientgerichte netwerkverkeer.

Alle Radar-eindpunten retourneren `404` wanneer `RADAR_ENABLED` is uitgeschakeld (zie
[Flag](#flag-radar_enabled-default-off) hierboven) en verwerken routefoutreacties via
`buildErrorBody()`/`sanitizeErrorMessage()` volgens de regel voor foutopschoning die voor de hele repository geldt
(`docs/security/ERROR_SANITIZATION.md`).

### Authenticatie

Alle Radar-eindpunten vereisen authenticatie via `isAuthenticated()`
(`src/shared/utils/apiAuth.ts`) — een dashboardsessiecookie of een API-sleutel met beheerbereik,
dezelfde toegangspoort die de rest van `/api/settings/*` beschermt. De `404`-controle voor een
uitgeschakelde flag wordt altijd **vóór** de authenticatiecontrole uitgevoerd, zodat een installatie waarbij `RADAR_ENABLED`
is uitgeschakeld byte-identiek blijft (geen authenticatieprompt alleen om te ontdekken dat het oppervlak niet bestaat);
zodra de flag is ingeschakeld, ontvangt een niet-geverifieerd verzoek `401` vóórdat de database wordt gelezen of
beschreven. `GET /api/radar/settings` retourneert nooit de onbewerkte supporterssleutel, ongeacht de
authenticatiestatus — alleen de gemaskeerde vorm en een booleaanse waarde `hasSupporterKey`.

---

## Supportersaanbiedingen

Aanbiedingen gebruiken hun eigen ondertekende artefact, `GET /v1/offers/latest`, en delen nooit de catalogus- of verwijzingscache. Het serverendpoint vereist een geldige, actieve Bearer-sleutel voor supporters; er is geen terugvaloptie voor de community. `syncRadarOffers()` stopt daarom vóór de netwerkrequest wanneer de featureflag is uitgeschakeld, de beheerder geen toestemming heeft gegeven of er geen supportersleutel is geconfigureerd.

Na een succesvolle GET verifieert de client de Ed25519-handtekening over de exacte responsbytes, valideert `RadarOffersFeedSchema`, vereist dat zowel de ondertekende body als de header `x-omniroute-feed-tier` `live` vermelden, dwingt een strikt nieuwere versie met punten af en vervangt pas daarna atomair `radar_offers_cache` (migratie `144_radar_offers_cache.sql`). Dezelfde limiet van 10 MB voor headers plus stream die voor de andere feeds wordt gebruikt, is van toepassing. Bij fouten met de handtekening, het schema, de tier, herhaling, grootte, HTTP of het netwerk blijft de laatst geverifieerde cache behouden.

De gesloten aanbiedingsstructuur ondersteunt drie vergelijkbare soorten voordelen: een percentage in basispunten, een tegoed in kleine munteenheden of proefdagen. Een partneraanbieding moet een openbare referentiewaarde van hetzelfde type bevatten en het voordeel moet strikt groter zijn; officiële aanbiedingen hebben geen partnerreferentiewaarde. URL's moeten HTTPS gebruiken en mogen geen aanmeldgegevens bevatten. `getRadarOffers()` valideert de gecachte payload preventief opnieuw en filtert verlopen vermeldingen bij elke lokale leesbewerking; `/dashboard/radar/offers` filtert vóór het renderen opnieuw op vervaldatum, gebruikt Portugese tekst wanneer die beschikbaar is met Engels als terugvaloptie en labelt partneraanbiedingen expliciet.

De browser roept uitsluitend lokale routes aan: hij leest de gemaskeerde momentopname van de instellingen, vraagt `POST /api/radar/offers/sync` om server-side te vernieuwen en leest vervolgens `GET /api/radar/offers`. Zonder sleutel toont hij de bestaande links voor bijdragers en ondersteuning in plaats van een feedrequest uit te voeren. Externe aanbiedingslinks worden geopend in een nieuw tabblad met `noopener noreferrer`. In deze release wordt geen MCP-tool `radar_offers` beschikbaar gesteld.

---

## Radar Intel, supportersbadge en CLI

Intel is een ondertekend artefact op `GET /v1/intel/latest`. Het gesloten `RadarIntelFeedSchema` accepteert uitsluitend ELO-ranglijsten die eigendom zijn van Radar en door de privécurator zijn afgeleid van bevestigde vergelijkingen, evenals feitelijke verschillen in leeftijd en aantallen van de catalogus die zijn afgeleid van ondertekende catalogusmomentopnamen. De methodologie ligt vast op een initiële rating van 1000 en K=32. Een lege ranglijst is geldig wanneer geen enkele vergelijking is bevestigd; de client genereert er nooit zelf een.

`syncRadarIntel()` past dezelfde server-side Bearer, time-out van 30 seconden, gestreamde limiet van 10 MiB, Ed25519-verificatie van exacte bytes, strikte schemavalidatie, vereiste van `live` voor body/header, minimale versie en behoud van de laatst geldige cache toe als bij aanbiedingen. Nadat een geverifieerde live-momentopname is opgeslagen, leidt de client `radar:<sha256(supporter key)>` af, slaat uitsluitend die eenrichtingsidentiteit op en genereert de specifieke herkenningsgebeurtenis `radar_supporter`. De badge `radar-supporter` is idempotent en kent nul XP toe; deze werkt nooit klassementen bij en hergebruikt `token_share` niet. `/dashboard/radar/intel` rendert de badge uitsluitend op basis van geverifieerde lokale cachemetadata.

De CLI biedt `omniroute radar status` en `omniroute radar sync`. Beide communiceren uitsluitend met de lokale OmniRoute-API. `status` voert een alleen-lezen `GET /api/radar/status` uit; `sync` verzendt één `POST /api/radar/sync-all` en drukt per feed een resultaat af. Geen van beide opdrachten leest, accepteert of toont de supportersleutel, en geen van beide maakt rechtstreeks verbinding met de Radar-service.

---

## Verwijzingslinks (gratis tegoeden)

Verwijzingslinks worden aangeboden via een **zelfstandige, altijd actuele** feed —
`GET /v1/referrals/latest` — los van de catalogusfeed. Dit is opzettelijk: de
catalogusfeed van het communityniveau is een momentopname die tot 30 dagen oud kan zijn,
waardoor een daaruit opgehaalde verwijzingslink voorheen evenveel achterliep op de
werkelijke lijst met links van de server (een nieuw toegevoegde verwijzing bereikte een
gratis/communitygebruiker mogelijk pas na een maand). De verwijzingsfeed voorkomt die
vertraging door volgens een eigen, veel korter interval te synchroniseren.

```ts
// Responsbody van GET /v1/referrals/latest (ondertekend met Ed25519, dezelfde vastgezette sleutel als
// voor de catalogusfeed):
{
  feed: "omniroute-radar-referrals",
  schemaVersion: 1,
  generatedAt: string,           // ISO — deterministisch: max(updatedAt) over alle verwijzingslinks,
                                  // zodat twee identieke verzoeken exact dezelfde ondertekende
                                  // bytes/handtekening opleveren
  referrals: {
    fixed: RadarReferral[],      // aanwezig in ELK niveau, inclusief zonder authenticatie/community
    campaigns: RadarReferral[],  // alleen gevuld voor een geldige actieve (supporter-)Bearer-
                                  // sleutel; verzoeken zonder authenticatie/met verlopen sleutel krijgen []
  },
}
// RadarReferral = { provider, url, kind: "fixo" | "campanha", validUntil,
//                    requiredAction, isDefault }
```

Anders dan de catalogusfeed bevat deze body helemaal geen `tier`-veld — de server
bepaalt per verzoek wat moet worden opgenomen op basis van de `Authorization`-sleutel,
waardoor de responsheader `x-omniroute-feed-tier` de ENIGE bron voor het aangeboden
niveau is (`referralsSync.ts::syncRadarReferrals`); een ontbrekende/niet-herkende header
valt terug op `"community"`, de aanname met de minste rechten.
`RadarReferralsFeedSchema` (`src/lib/radar/referralsFeedSchema.ts`) valideert de volledige
body en hergebruikt hetzelfde `RadarReferralSchema` per verwijzing dat vanuit
`feedSchema.ts` wordt geëxporteerd, zodat beide feeds afzonderlijke verwijzingen identiek
valideren. Elke `RadarReferral.url` moet `https://` gebruiken — een `http://`-URL doorstaat
de schemavalidatie niet.

Het OUDE, in de catalogus opgenomen veld `referrals` van `RadarFeedSchema`
(`feedSchema.ts`) blijft behouden voor achterwaartse compatibiliteit met reeds gecachte
catalogusfeeds, maar `getRadarReferrals()` leest het niet langer — zie
[Accessor](#accessor) hieronder.

### Synchronisatie

`syncRadarReferrals()` (`src/lib/radar/referralsSync.ts`) is de ENIGE module die voor
verwijzingen het netwerk benadert en volgt exact hetzelfde contract als `syncRadar()`:
vlag uit → `disabled`; opt-in onwaar → `opt_out`; downloadt
`${RADAR_FEED_URL}/v1/referrals/latest` (dezelfde fork-overschrijvingen via
`RADAR_FEED_URL`/`RADAR_FEED_PUBKEY` als voor de catalogus), verifieert de
Ed25519-handtekening over de exacte responsbytes (`verifyFeedBytes`), valideert aan de
hand van `RadarReferralsFeedSchema` en cachet in de tabel `radar_referrals_cache`
(migratie `142_radar_referrals_cache.sql`) — een tabel die volledig losstaat van
`radar_feed_cache` van de catalogus. Een responslimiet van 10 MB en een ondergrens voor
`generatedAt` weigeren een binnenkomende feed die ouder is dan de gecachte feed, als
bescherming tegen het opnieuw afspelen van een ouder ondertekend artefact. Een gelijke
tijdstempel wordt geaccepteerd: de server geeft de community- en actieve varianten van
de verwijzingsfeed bewust dezelfde deterministische `generatedAt`, zodat de ondertekende
payload en het aangeboden niveau kunnen veranderen na een wijziging van de
supportersleutel zonder dat de onderliggende verzameling links verandert. Gooit nooit
een uitzondering — retourneert altijd een statusobject; fouten bevatten nooit een
stacktrace in `reason`.

Twee triggers houden de verwijzingscache warm, beide onafhankelijk van het eigen
24-uursinterval van de catalogus:

- **Synchronisatie bij lezen** — `GET /api/radar/referrals` roept zelf
  `syncRadarReferrals()` inline aan wanneer de cache ontbreekt of ouder is dan
  `REFERRALS_STALE_MS` (1 uur, `shouldSyncReferralsOnRead()`), voordat de respons wordt
  aangeboden. Hierdoor zijn vaste links bij het eerstvolgende laden van het dashboard
  "altijd actueel", zonder op een achtergrondtimer te hoeven wachten.
- **Nevensynchronisatie door de scheduler** — `radarSchedulerTick()` (`scheduler.ts`)
  beoordeelt onafhankelijk de veroudering van verwijzingen tijdens dezelfde uurlijkse
  tick die voor de catalogus wordt gebruikt en roept `syncRadarReferrals()` aan wanneer
  dat nodig is. Dit wordt uitgevoerd ongeacht of de catalogus zelf tijdens die tick aan
  de beurt was en heeft nooit invloed op de vorm van `RadarTickResult` (alleen een
  best-effort-neveneffect; fouten worden genegeerd).

### Accessor

`src/lib/radar/index.ts` exporteert twee alleen-lezen accessors, die beide nooit een
uitzondering gooien (hetzelfde defensieve contract als `getRadarCatalog()` — een
uitgeschakelde vlag, geen cache of een beschadigde gecachte payload resulteert altijd in
de lege vorm in plaats van een fout):

- `getRadarReferrals()` → `{ fixed: RadarReferral[], campaigns: RadarReferral[] }`,
  leest uit `radar_referrals_cache` (via `getRadarReferralsCache()`) en valideert via
  `RadarReferralsFeedSchema` — **niet** via de cataloguscache.
- `getDefaultReferralFor(provider)` → de `fixed`-verwijzing met `isDefault: true` voor
  die provider, of `null`. Kijkt alleen naar `fixed` — een campagne wordt nooit als de
  "standaardlink" van een provider gebruikt.

De daadwerkelijke regel voor "welke verwijzing is de standaard voor een provider" staat
in `findDefaultReferral()` (`src/lib/radar/referrals.ts`), een kleine pure functie
**zonder DB-import** — deze kan veilig in een `"use client"`-component worden
geïmporteerd. `getRadarReferrals`/`getDefaultReferralFor` (in `index.ts`) halen
`@/lib/db/radar` binnen en blijven daarom alleen voor de server; het providerdashboard
importeert `referrals.ts` rechtstreeks in plaats van `index.ts` (zie hieronder), om te
voorkomen dat `better-sqlite3` in de browserbundel terechtkomt.

### `GET /api/radar/referrals`

Volgt exact dezelfde gate-volgorde als elke andere Radar-route: `RADAR_ENABLED` uit →
`404` (als eerste gecontroleerd, byte-identieke inertie); niet-geauthenticeerd → `401`;
anders wordt bij verouderde gegevens een synchronisatie bij het lezen geactiveerd (zie
hierboven), gevolgd door `200` met `{ fixed, campaigns, tier }` — `tier` komt
rechtstreeks uit de (mogelijk zojuist vernieuwde) cacherij en is uitsluitend informatief
(bepaalt de vrijblijvende upselltekst in de UI hieronder). De feedserver wordt nooit
rechtstreeks geproxied — de eigen broncode van de route bevat geen `fetch(`-aanroep;
netwerkverkeer vindt uitsluitend plaats binnen `syncRadarReferrals()`, volgens hetzelfde
principe van alleen lokale cache als bij `/api/radar/catalog`.

### Dashboard-UI — tabblad "Gratis tegoed" op `/dashboard/radar`

Hergebruikt de bestaande Radar-pagina (`src/app/(dashboard)/dashboard/radar/page.tsx`) als
een tweede tabblad in plaats van een nieuwe route — minder routerings-/i18n-oppervlak
voor een functie die een variatie is op gegevens die de pagina al ophaalt. Na aanmelding
biedt de tabbladbalk **Catalogus** (bestaande tabel) en **Gratis tegoed**:

- Vaste links worden per provider gegroepeerd; elke link toont `requiredAction` (indien
  aanwezig) en een knop met `target="_blank" rel="noopener noreferrer"` naar de
  verwijzings-URL.
- Campagnes tonen hetzelfde, plus `validUntil` indien aanwezig.
- Wanneer `campaigns` leeg is **en** de weergegeven tier `community` is, toont de UI een
  korte upsellmelding ("tijdelijke campagnes zijn een extraatje voor supporters") — dit
  verbergt of blokkeert de lijst met vaste links **nooit**; deze blijft voor elke tier
  volledig gevuld. De upsell is alleen vrijblijvende tekst en vormt nooit een blokkade.

### Verwijzingslink op de providernaam (providersdashboard)

`ProviderPageHeader` (`src/app/(dashboard)/dashboard/providers/[id]/components/`)
koppelde de providernaam al aan `providerInfo.website` wanneer deze aanwezig was, met één
precedent voor een gemonetariseerde link: de opmerking bij de partnerlink van Kimi
(Moonshot AI) (i18n-sleutel `providers.kimiPartnerLinkNote`). D28 hergebruikt exact
hetzelfde patroon met een discrete opmerking voor standaardverwijzingen van Radar, in
plaats van een nieuwe sleutel te introduceren.

Bewust losse koppeling:

- `resolveProviderHeaderLink()` (`src/app/(dashboard)/dashboard/providers/providerPageUtils.ts`)
  is een **pure** functie — `(staticWebsite, referralUrl) => { website, isReferralLink }`
  — zonder afhankelijkheid van `@/lib/radar` of `@/lib/db/*`. `providerPageUtils.ts`
  als geheel blijft vrij van die imports (gecontroleerd door
  `tests/unit/provider-header-referral-link.test.ts`).
- `ProviderDetailPageClient.tsx` (een `"use client"`-component) is de enige plek waar
  Radar-gegevens mogen worden opgehaald — via `fetch("/api/radar/referrals")`, hetzelfde
  patroon met een lokale route dat de Radar-dashboardpagina zelf gebruikt — en berekent
  de standaardverwijzing aan de clientzijde met `findDefaultReferral()` uit het
  DB-vrije `src/lib/radar/referrals.ts`.
- Met `RADAR_ENABLED` uit retourneert de fetch een 404, blijft `referralUrl` `null` en
  retourneert `resolveProviderHeaderLink()` de statische `website` uit de catalogus
  ongewijzigd — de providerpagina is byte-identiek aan voordat deze functie bestond.
  Hetzelfde resultaat geldt wanneer er nog geen cache is of er geen standaardverwijzing
  voor die specifieke provider bestaat.
- Wanneer een standaardverwijzing van toepassing is, ontvangt `ProviderPageHeader`
  `isReferralLink` en toont deze dezelfde discrete opmerking/tooltip als bij de
  Kimi-partnerlink (met hergebruik van de sleutel `providers.kimiPartnerLinkNote`) —
  nooit een nieuwe, afzonderlijke visuele behandeling.

---

## Zelf een feed hosten

Een fork of self-hoster die volledige controle over de catalogus wil, kan een eigen
feedservice uitvoeren zonder de clientcode aan te passen:

1. Bied een `GET /v1/catalog/latest`-endpoint aan dat een JSON-body retourneert die voldoet aan
   `RadarFeedSchema` (`src/lib/radar/feedSchema.ts`) — op het hoogste niveau `feed:
"omniroute-radar"`, `schemaVersion: 2`, `version`, `tier`, `providers`, `models`,
   `quirks` en `totals`. Respecteer `x-omniroute-radar-schema: 2`; een transitiecompatibele server
   moet verzoeken zonder deze header standaard afhandelen met een afzonderlijk ondertekend v1-artefact.
2. Onderteken de exacte responsbytes met een Ed25519-sleutelpaar en retourneer de base64-
   handtekening in de responsheader `x-omniroute-feed-signature`.
3. Stel `RADAR_FEED_URL` in op de nieuwe basis-URL en `RADAR_FEED_PUBKEY` op de bijbehorende
   openbare sleutel (base64-DER SPKI of PEM) — zie de
   [referentie voor omgevingsvariabelen](../reference/ENVIRONMENT.md#27-radar-feed-self-hosting).
4. Schakel `RADAR_ENABLED` in en meld je aan via `POST /api/radar/settings`
   (`{ optIn: true }`).

Er zijn geen andere codewijzigingen nodig — `verifyFeedBytes()` neemt de overschrijving
automatisch over (`getFeedPublicKeys()` in `src/lib/radar/pinnedKeys.ts`), en versie-
vergelijking, schemavalidatie en de samenvoegregels worden op identieke wijze toegepast op een zelfgehoste
feed.

Verwijzingslinks (zie [Verwijzingslinks (gratis tegoeden)](#referral-links-free-credits)
hierboven) vormen een afzonderlijk, optioneel artefact: een fork die alleen `/v1/catalog/latest`
aanbiedt, blijft volledig werken — `syncRadarReferrals()` valt bij een `404`
van `/v1/referrals/latest` terug op `{ status: "error" }` en de cache blijft simpelweg leeg, zodat
`GET /api/radar/referrals` `{ fixed: [], campaigns: [], tier: null }` blijft retourneren
in plaats van de rest van de pagina te laten mislukken. Om ook verwijzingslinks aan te bieden, bied je
`GET /v1/referrals/latest` aan dat voldoet aan `RadarReferralsFeedSchema`
(`src/lib/radar/referralsFeedSchema.ts`) en onderteken je dit met hetzelfde Ed25519-sleutelpaar als
de catalogusfeed.

Supporteraanbiedingen vormen nog een optioneel artefact. Om deze aan te bieden, implementeer je
`GET /v1/offers/latest` met het gesloten `RadarOffersFeedSchema`
(`src/lib/radar/offersFeedSchema.ts`), vereis je een actief gebruiksrecht, retourneer je
`x-omniroute-feed-tier: live` en onderteken je de exacte bytes met dezelfde sleutel. Bij een fork die dit
endpoint weglaat, blijft het gedrag van de catalogus en verwijzingen ongewijzigd; het vernieuwen van aanbiedingen mislukt zonder gegevens te verwijderen en
de laatst geverifieerde lokale aanbiedingencache blijft beschikbaar.

Intel is op dezelfde manier optioneel. Een self-hoster kan `GET /v1/intel/latest` aanbieden met
`RadarIntelFeedSchema` (`src/lib/radar/intelFeedSchema.ts`), een actief gebruiksrecht vereisen,
`x-omniroute-feed-tier: live` retourneren en de exacte bytes ondertekenen met de gedeelde Ed25519-sleutel. Als het
endpoint wordt weggelaten, blijven de catalogus, verwijzingen en aanbiedingen ongewijzigd; bij het vernieuwen van Intel blijft elke laatst geverifieerde
lokale momentopname behouden.

---

## Gerelateerde documentatie

- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) — het
  foutresponspatroon dat de routes onder `/api/radar/*` volgen.
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md#27-radar-feed-self-hosting)
  — referentie voor `RADAR_FEED_URL` / `RADAR_FEED_PUBKEY`.
