# OmniRoute Auto-Combo Engine (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/AUTO-COMBO.md) · 🇪🇹 [am](../../../am/docs/routing/AUTO-COMBO.md) · 🇸🇦 [ar](../../../ar/docs/routing/AUTO-COMBO.md) · 🇦🇿 [az](../../../az/docs/routing/AUTO-COMBO.md) · 🇧🇬 [bg](../../../bg/docs/routing/AUTO-COMBO.md) · 🇧🇩 [bn](../../../bn/docs/routing/AUTO-COMBO.md) · 🇨🇿 [cs](../../../cs/docs/routing/AUTO-COMBO.md) · 🇩🇰 [da](../../../da/docs/routing/AUTO-COMBO.md) · 🇩🇪 [de](../../../de/docs/routing/AUTO-COMBO.md) · 🇬🇷 [el](../../../el/docs/routing/AUTO-COMBO.md) · 🇪🇸 [es](../../../es/docs/routing/AUTO-COMBO.md) · 🇪🇪 [et](../../../et/docs/routing/AUTO-COMBO.md) · 🇮🇷 [fa](../../../fa/docs/routing/AUTO-COMBO.md) · 🇫🇮 [fi](../../../fi/docs/routing/AUTO-COMBO.md) · 🇫🇷 [fr](../../../fr/docs/routing/AUTO-COMBO.md) · 🇮🇪 [ga](../../../ga/docs/routing/AUTO-COMBO.md) · 🇮🇳 [gu](../../../gu/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ha](../../../ha/docs/routing/AUTO-COMBO.md) · 🇮🇱 [he](../../../he/docs/routing/AUTO-COMBO.md) · 🇮🇳 [hi](../../../hi/docs/routing/AUTO-COMBO.md) · 🇭🇷 [hr](../../../hr/docs/routing/AUTO-COMBO.md) · 🇭🇺 [hu](../../../hu/docs/routing/AUTO-COMBO.md) · 🇦🇲 [hy](../../../hy/docs/routing/AUTO-COMBO.md) · 🇮🇩 [id](../../../id/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ig](../../../ig/docs/routing/AUTO-COMBO.md) · 🇮🇹 [it](../../../it/docs/routing/AUTO-COMBO.md) · 🇯🇵 [ja](../../../ja/docs/routing/AUTO-COMBO.md) · 🇬🇪 [ka](../../../ka/docs/routing/AUTO-COMBO.md) · 🇰🇭 [km](../../../km/docs/routing/AUTO-COMBO.md) · 🇮🇳 [kn](../../../kn/docs/routing/AUTO-COMBO.md) · 🇰🇷 [ko](../../../ko/docs/routing/AUTO-COMBO.md) · 🇱🇹 [lt](../../../lt/docs/routing/AUTO-COMBO.md) · 🇱🇻 [lv](../../../lv/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ml](../../../ml/docs/routing/AUTO-COMBO.md) · 🇮🇳 [mr](../../../mr/docs/routing/AUTO-COMBO.md) · 🇲🇾 [ms](../../../ms/docs/routing/AUTO-COMBO.md) · 🇲🇹 [mt](../../../mt/docs/routing/AUTO-COMBO.md) · 🇲🇲 [my](../../../my/docs/routing/AUTO-COMBO.md) · 🇳🇵 [ne](../../../ne/docs/routing/AUTO-COMBO.md) · 🇳🇴 [no](../../../no/docs/routing/AUTO-COMBO.md) · 🇮🇳 [or](../../../or/docs/routing/AUTO-COMBO.md) · 🇮🇳 [pa](../../../pa/docs/routing/AUTO-COMBO.md) · 🇵🇭 [phi](../../../phi/docs/routing/AUTO-COMBO.md) · 🇵🇱 [pl](../../../pl/docs/routing/AUTO-COMBO.md) · 🇵🇹 [pt](../../../pt/docs/routing/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/AUTO-COMBO.md) · 🇷🇴 [ro](../../../ro/docs/routing/AUTO-COMBO.md) · 🇷🇺 [ru](../../../ru/docs/routing/AUTO-COMBO.md) · 🇱🇰 [si](../../../si/docs/routing/AUTO-COMBO.md) · 🇸🇰 [sk](../../../sk/docs/routing/AUTO-COMBO.md) · 🇸🇮 [sl](../../../sl/docs/routing/AUTO-COMBO.md) · 🇷🇸 [sr](../../../sr/docs/routing/AUTO-COMBO.md) · 🇸🇪 [sv](../../../sv/docs/routing/AUTO-COMBO.md) · 🇰🇪 [sw](../../../sw/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ta](../../../ta/docs/routing/AUTO-COMBO.md) · 🇮🇳 [te](../../../te/docs/routing/AUTO-COMBO.md) · 🇹🇭 [th](../../../th/docs/routing/AUTO-COMBO.md) · 🇹🇷 [tr](../../../tr/docs/routing/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/AUTO-COMBO.md) · 🇵🇰 [ur](../../../ur/docs/routing/AUTO-COMBO.md) · 🇺🇿 [uz](../../../uz/docs/routing/AUTO-COMBO.md) · 🇻🇳 [vi](../../../vi/docs/routing/AUTO-COMBO.md) · 🇳🇬 [yo](../../../yo/docs/routing/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/AUTO-COMBO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/AUTO-COMBO.md)

---

> **Voor gebruikers**: Op zoek naar een snelle start? Bekijk de [Auto-Combo-gebruikershandleiding](../getting-started/AUTO-COMBO-GUIDE.md) voor eenvoudige uitleg en voorbeelden.

> Zelfbeherende modelketens met adaptieve scoring + automatische routering zonder configuratie

## Automatische routering zonder configuratie (prefix `auto/`)

> **NIEUW:** Het aanmaken van een combo is niet vereist. Gebruik de prefix `auto/` rechtstreeks in elke client.

### Snelle voorbeelden

| Model-ID       | Variant | Gedrag                                                                           |
| -------------- | ------- | -------------------------------------------------------------------------------- |
| `auto`         | default | Alle verbonden providers, LKGP-strategie, gebalanceerde gewichten                |
| `auto/coding`  | coding  | Kwaliteitsgerichte gewichten, geschikt voor codegeneratie                        |
| `auto/fast`    | fast    | Gewogen selectie met lage latentie                                               |
| `auto/cheap`   | cheap   | Kostengeoptimaliseerde routering (laagste kosten eerst)                          |
| `auto/offline` | offline | Geeft voorrang aan providers met de hoogste quotumbeschikbaarheid                |
| `auto/smart`   | smart   | Kwaliteitsgericht + hoger exploratiepercentage (10%) voor betere modelontdekking |
| `auto/lkgp`    | lkgp    | Expliciete LKGP (hetzelfde als standaard `auto`)                                 |
| `auto/chaos`   | chaos   | Gewichten voor foutinjectie om veerkracht te testen (chaosengineering)           |

### Samenstelling van categorie × niveau (`auto/<category>:<tier>`)

Achtervoegsels in OpenRouter-stijl scheiden **welk soort route** (categorie) van **hoe deze moet worden geoptimaliseerd** (niveau), zodat u ze vrij kunt combineren (#4235 fase B, `open-sse/services/autoCombo/suffixComposition.ts`):

- **Categorieën** (filteren de kandidatenpool op mogelijkheid): `coding` · `reasoning` · `vision` · `chat` · `multimodal`. `vision`/`multimodal` behouden modellen met ondersteuning voor beeldverwerking; `reasoning` behoudt modellen voor redeneren/denken.
- **Niveaus** (bepalen de scoringgewichten / het poolfilter): `fast` (snelle oplevering) · `cheap` (alias `floor`, kostenbesparend) · `reliable` (status van circuitonderbreker + latentiestabiliteit) · `free` / `pro` (filteren de pool op modelniveau via `classifyTier` — gratis niveau versus premium).

| Voorbeeld              | Wordt omgezet naar                                                                      |
| ---------------------- | --------------------------------------------------------------------------------------- |
| `auto/coding:fast`     | codingpool, gewichten voor lage latentie                                                |
| `auto/coding:cheap`    | codingpool, kostengeoptimaliseerd (alias `auto/coding:floor`)                           |
| `auto/reasoning:pro`   | alleen modellen voor redeneren/denken, premiumniveau                                    |
| `auto/vision`          | modellen met ondersteuning voor beeldverwerking (geen niveau → gebalanceerde gewichten) |
| `auto/multimodal:free` | modellen met multimodale ondersteuning, alleen gratis niveau                            |

Elke geldige `auto/<category>[:<tier>]` wordt op aanvraag omgezet; een zorgvuldig samengestelde subset wordt vermeld in `/v1/models` en het dashboard (`AUTO_SUFFIX_VARIANTS` in `open-sse/services/autoCombo/builtinCatalog.ts`). Filteren werkt volgens het **fail-open-principe** — als geen enkel verbonden model aan een beperking voldoet, wordt de volledige pool gebruikt, zodat de routering nooit uitvalt. De kernscorer (`combo.ts`) blijft ongewijzigd; het categorie-/niveaufilter wordt toegepast in `buildAutoCandidates`.

> **Live modelinformatie:** de geschiktheid voor automatische routering wordt gebaseerd op live **Arena ELO**-ranglijsten + niveaugegevens van **models.dev** wanneer de vlag `ARENA_ELO_SYNC_ENABLED` is ingeschakeld (anders wordt teruggevallen op de statische geschiktheidskaart).

**Gebruik:**

```bash
# Elke IDE of CLI-tool die de OpenAI-indeling ondersteunt
Base URL: http://localhost:20128/v1
API Key:  <uw-endpoint-sleutel>

# Stel het model in uw code/configuratie in op:
model: "auto"                 # gebalanceerde standaardinstelling
model: "auto/coding"          # het beste voor programmeertaken
model: "auto/fast"            # snelst beschikbare optie
model: "auto/cheap"           # goedkoopst per token
```

**Wat gebeurt er:**

1. OmniRoute detecteert de prefix `auto/` in `src/sse/handlers/chat.ts`
2. Vraagt alle **actieve providerverbindingen** op uit de database
3. Filtert deze op geldige referenties (API-sleutel of OAuth-token)
4. Bepaalt het model per verbinding (`connection.defaultModel` of het eerste model van de provider)
5. Bouwt in het geheugen een **virtuele combo** (niet opgeslagen in de database)
6. Routeert met het gewichtsprofiel van de geselecteerde variant + de LKGP-strategie

**Belangrijkste eigenschappen:**

- ✅ **Altijd actief:** Geen schakeloptie, geen combo-aanmaak en geen configuratie nodig
- ✅ **Dynamisch:** Weerspiegelt automatisch de momenteel verbonden providers
- ✅ **Sessiestabiliteit:** LKGP zorgt ervoor dat de laatst succesvolle provider prioriteit krijgt
- ✅ **Ondersteuning voor meerdere accounts:** Elke providerverbinding wordt een afzonderlijke kandidaat
- ✅ **Geen schrijfbewerkingen naar de database:** De virtuele combo bestaat alleen voor het verzoek, zonder overhead voor persistente opslag

### Kandidatenbeheer per sleutel (#7819, niveau 1+2)

`GET /v1/auto-combo/{channel}/candidates` (`{channel}` = het achtervoegsel na `auto/`, of
de letterlijke waarde `auto` voor het basiskanaal) is een **alleen-lezen**-endpoint dat de
huidige kandidatenpool van een `auto/*`-kanaal toont, aangevuld met actuele bereikbaarheidsinformatie,
waarbij de bestaande uitleesfuncties voor veerkracht worden hergebruikt (nooit de ruwe `state` van de circuitonderbreker):

- circuitonderbreker van de provider — `getCircuitBreaker(provider).getStatus()` / `.canExecute()`
- afkoelperiode van de verbinding — `rateLimitedUntil` / `testStatus` in de gevonden rij van
  `provider_connections`
- modelblokkering — `isModelLocked(provider, connectionId, model)`

Elke kandidaat bevat ook de vlag `excluded` voor deze API-sleutel. Uitsluitingen worden
per API-sleutel opgeslagen (tabel `auto_candidate_overrides`, migratie `128`) — OmniRoute
is single-tenant en heeft geen tabel `users`, waardoor `apiKeyId` de meest geschikte echte
identiteit per aanroeper is — en worden afgedwongen op het centrale punt voor de kandidatenpool in
`open-sse/services/autoCombo/virtualFactory.ts` via de pure, met unittests geteste functie
`filterExcludedCandidates()` (`open-sse/services/autoCombo/candidateOverrides.ts`).
Het filter werkt volgens het **fail-open-principe**: bij een ontbrekende apiKeyId/kanaalwaarde of een mislukte
databasequery blijft de pool ongefilterd, zodat een beheerder zonder geconfigureerde overschrijvingen routering
ontvangt die byte voor byte identiek is aan de situatie vóór deze functie.

**Uitgesteld naar een vervolgissue:** gewichten per kandidaat + expliciete volgorde (niveau 3
— wordt doorgegeven aan de bestaande strategieën voor weging/prioriteit) en het vastzetten van een specifieke
`combo.ts`-strategie per `auto/*`-kanaal (niveau 4). Zie het plan van #7819 voor de openstaande
vraag of overrides per API-sleutel moeten blijven of globaal moeten worden vanwege het
single-tenantmodel.

**Achter de schermen:**

```txt
Verzoek: { model: "auto/coding" }
   ↓
src/sse/handlers/chat.ts detecteert voorvoegsel
   ↓
createVirtualAutoCombo('coding') → candidatePool uit actieve verbindingen
   ↓
handleComboChat (dezelfde engine als voor persistente combo's)
   ↓
Automatische scoring selecteert per verzoek de beste provider/het beste model
```

**Implementatiebestanden:**

| Bestand                                                   | Doel                                                 |
| --------------------------------------------------------- | ---------------------------------------------------- |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Parser voor voorvoegsels (`parseAutoPrefix`)         |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Maakt virtuele `AutoComboConfig`-objecten            |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Testhook voor het mocken van het providerregister    |
| `src/sse/handlers/chat.ts`                                | Integratie: vroegtijdige afhandeling van auto-prefix |
| `src/shared/constants/providers.ts`                       | Systeemvermelding `SYSTEM_PROVIDERS.auto`            |

## Combonamen die overeenkomen met een echte model-id

Een combo waarvan de `name` identiek is aan een kale model-id (bijvoorbeeld een combo met de naam
`gpt-5.5`) is een **opzettelijk, ondersteund patroon**, geen bug: dit is het
mechanisme voor providerfallback per model-id dat wordt beschreven in
[#6940](https://github.com/diegosouzapw/OmniRoute/issues/6940). Omdat combo-
resolutie vóór de resolutie van kale model-id's wordt gecontroleerd
(`getComboForModel()` in `src/sse/services/model.ts`), wordt een verzoek voor de kale
id `gpt-5.5` via de doelen van de combo gerouteerd (bijvoorbeeld
`acme-responses/gpt-5.5`, `backup-responses/gpt-5.5`) in plaats van rechtstreeks naar
één provider — dit hergebruikt de prioriteit van combo vóór herschrijving die is gebouwd voor
[#3227/#3233](https://github.com/diegosouzapw/OmniRoute/issues/3227) en wordt met regressietests getest door `tests/unit/responses-combo-resolution-3227.test.ts` en
`tests/unit/combo-name-codex-responses-rewrite.test.ts`.

Het maken of hernoemen van een combo naar een naam die een echte model-id overschaduwt, wordt
**nooit geweigerd** — dit zou deze gedocumenteerde workflow verbreken. In plaats daarvan
(#8530) voegen `POST /api/combos` en `PUT /api/combos/[id]` een niet-blokkerend
`warning`-veld toe aan het antwoord wanneer de (nieuwe) naam botst met een echte
model-id:

```json
{
  "warning": {
    "code": "COMBO_NAME_SHADOWS_MODEL",
    "modelId": "gpt-5.5",
    "providerId": "openai"
  }
}
```

Tijdens het opstarten registreert `scanComboModelNameCollisionsAtBoot()`
(`src/instrumentation-node.ts`) ook een `[STARTUP]`-waarschuwing van één regel
waarin elke bestaande combo wordt opgesomd die een model-id overschaduwt, zodat beheerders die
dit per ongeluk doen (in plaats van opzettelijk, conform #6940) een signaal krijgen.
De detectiehelper bevindt zich in `src/lib/combos/modelNameCollision.ts`.

## Een aangepaste combo aanroepen vanuit een client

Opgeslagen combo's (Instellingen → Combo's) worden alleen gebruikt wanneer de client de **exacte naam** van de combo in het veld `model` verzendt — er vindt geen onnauwkeurige of gedeeltelijke overeenkomst met de combonaam plaats en er is geen `auto/`-prefix bij betrokken. Resolutievolgorde (`getComboForModel()` in `src/sse/services/model.ts`):

1. exacte overeenkomst met de combonaam (`model: "my-combo"`),
2. `combo/<name>`-prefix (`model: "combo/my-combo"`),
3. model→combo-globtoewijzingen (`/api/model-combo-mappings`).

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"my-combo","messages":[{"role":"user","content":"Hello"}]}'
```

Twee veelvoorkomende valkuilen:

- **`auto` gebruikt uw combo's niet.** `auto`/`auto/*` bouwt een eigen kandidaatpool zonder configuratie en raadpleegt opgeslagen combo's alleen als een combo letterlijk `auto` heet (niet aanbevolen). Om via een combo te routeren, verzendt u de exacte naam ervan — niet `auto`.
- **`openrouter/auto` is een echt betaald OpenRouter-product** ("Auto Best Available"), geen OmniRoute-alias. Het is de enige statische modelvermelding in het OpenRouter-register (`open-sse/config/providers/registry/openrouter/index.ts`) en wordt afzonderlijk gefactureerd. Gebruik Instellingen → Routering → Betaalde modellen verbergen om het uit `auto`-pools uit te sluiten.

Zie [#7992](https://github.com/diegosouzapw/OmniRoute/issues/7992) en [#7111](https://github.com/diegosouzapw/OmniRoute/issues/7111) voor de oorspronkelijke verwarring die hiermee wordt gedocumenteerd.

## Hoe het werkt (opgeslagen Auto-Combo's)

De Auto-Combo Engine selecteert voor elke aanvraag dynamisch de beste provider en het beste model met behulp van een **scorefunctie met 16 factoren** (gedefinieerd in `open-sse/services/autoCombo/scoring.ts` → `DEFAULT_WEIGHTS`). De standaardsgewichten tellen op tot `1.0`; aangepaste gewichten worden opnieuw genormaliseerd door `normalizeScoringWeights()`. Twee van de zestien — `cacheAffinity` en `resetWindowAffinity` — hebben standaard een gewicht van `0`; `reliability` heeft een gewicht van `0` in `DEFAULT_WEIGHTS`, maar `0.03` in algemene pakketten en `0.04` in `reliability-first`, en `quality` heeft een gewicht van `0.02` in pakketten (`0.03` in `quality-first`): ze worden nog steeds voor elke kandidaat berekend, en `cacheAffinity` bepaalt buiten de score of deduplicatie van de promptcache wordt toegepast. De factoren met een standaardgewicht van nul tellen dus standaard simpelweg niet mee, terwijl ze dat in pakketten wel doen.

![Auto-Combo-scoreberekening met 16 factoren](../diagrams/exported/auto-combo-scoring.svg)

> Bron: [diagrams/auto-combo-scoring.mmd](../diagrams/auto-combo-scoring.mmd) (opnieuw genereren via `npm run docs:render-diagrams`). De bestandsnaam is historisch; de bron en het gerenderde diagram tonen alle 16 factoren die in `DEFAULT_WEIGHTS` zijn gedeclareerd.

| Factor                | Standaardgewicht | Beschrijving                                                                                                                                                                                                                                             |
| :-------------------- | :--------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `quota`               | 0.1429           | Resterend quotum / beschikbare ruimte binnen de frequentielimiet [0..1]                                                                                                                                                                                  |
| `health`              | 0.1605           | Gezondheidsscore van de circuitbreaker (CLOSED=1.0, HALF_OPEN=0.5, OPEN=0.0)                                                                                                                                                                             |
| `costInv`             | 0.1429           | Omgekeerde **gecombineerde** kosten (60% prijs van invoertokens + 40% prijs van uitvoertokens, genormaliseerd) — goedkoper = hogere score                                                                                                                |
| `latencyInv`          | 0.1143           | Omgekeerde p95-latentie, genormaliseerd ten opzichte van de pool — sneller = hogere score                                                                                                                                                                |
| `taskFit`             | 0.0762           | Geschiktheid voor het taaktype (programmeren, beoordelen, plannen, analyseren, debuggen, documentatie)                                                                                                                                                   |
| `stability`           | 0.0476           | Op variantie gebaseerde stabiliteit aan de hand van de standaardafwijking van de latentie — een kandidaat met sterk wisselende responstijden scoort lager                                                                                                |
| `tierPriority`        | 0.0476           | Prioriteit van het accountniveau — Ultra=1.0, Pro=0.67, Standard=0.33, Free=0.0                                                                                                                                                                          |
| `tierAffinity`        | 0.0476           | Affiniteit tussen het niveau van de kandidaat en het door het manifest aanbevolen niveau                                                                                                                                                                 |
| `specificityMatch`    | 0.0476           | Overeenkomst tussen de specificiteit van de aanvraag (hint uit het manifest) en het modelniveau                                                                                                                                                          |
| `contextAffinity`     | 0.0476           | Affiniteit tussen de behoefte aan contextvensterruimte van de aanvraag en het contextvenster van het model                                                                                                                                               |
| `sessionAvailability` | 0.0476           | Beschikbaarheid van een OAuth-sessie voor de kandidaatverbinding binnen deze sessie (`getOAuthSessionAvailability()`; niet-OAuth-verbindingen scoren 1.0)                                                                                                |
| `connectionDensity`   | 0.0476           | Verdeelt de belasting over verbindingen van dezelfde provider (anticorrelatie)                                                                                                                                                                           |
| `cacheAffinity`       | 0.00             | Affiniteit op basis van rendezvous-hashing voor de verbinding die waarschijnlijk al het promptcachevoorvoegsel van deze aanvraag bevat (`open-sse/services/combo/promptCacheAffinity.ts`); standaard uitgeschakeld (#8008)                               |
| `resetWindowAffinity` | 0.00             | Voorkeur voor verbindingen met een gunstig venster voor het opnieuw instellen van het quotum (standaard uitgeschakeld)                                                                                                                                   |
| `quality`             | 0.03             | Door feedback gestuurd signaal voor de uitvoerkwaliteit vanuit de kwaliteitstracker voor routeringsgebeurtenissen; kandidaten zonder waarnemingen krijgen een neutrale score van 0.5                                                                     |
| `reliability`         | 0.00             | Waargenomen succespercentage, `1 - failureRate`, op basis van 24 uur gebruiksgeschiedenis met een minimum van tien steekproeven (anders realtime metrische gegevens); kandidaten zonder waarnemingen krijgen een waarde van 1.0. Standaard uitgeschakeld |

**Som:** `0.1429 + 0.1605 + 0.1429 + 0.1143 + 0.0762 + (7 × 0.0476) + 0.00 + 0.00 + 0.03 + 0.00 = 1.0`, zoals gedeclareerd in `DEFAULT_WEIGHTS`; door de gebruiker geconfigureerde gewichten worden vóór de scoreberekening door `normalizeScoringWeights()` opnieuw genormaliseerd tot een verdeling.

## Moduspakketten

6 vooraf gedefinieerde gewichtsprofielen in `open-sse/services/autoCombo/modePacks.ts`. Elk pakket vervangt de standaardgewichten volledig om de selectie op één doel te richten. Elk pakket telt al op tot `1.0` (`0.9999` zoals weergegeven met vier decimalen), dus `normalizeScoringWeights()` heeft niets wezenlijks te corrigeren wanneer een pakket actief is — de onderstaande waarden zijn, behoudens afronding, de waarden die de scorer toepast.

| Factor                | ship-fast  | cost-saver | quality-first | offline-friendly | reliability-first | chaos-mode |
| :-------------------- | :--------- | :--------- | :------------ | :--------------- | :---------------- | :--------- |
| `quota`               | 0.1133     | 0.1133     | 0.0752        | **0.3324**       | 0.1133            | 0.0376     |
| `health`              | 0.2667     | 0.1810     | 0.1714        | 0.2667           | **0.3524**        | **0.4000** |
| `costInv`             | 0.0276     | **0.3324** | 0.0276        | 0.0752           | 0.0181            | 0.0140     |
| `latencyInv`          | **0.3048** | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0186     |
| `taskFit`             | 0.0952     | 0.0952     | **0.3524**    | 0.0000           | 0.0952            | 0.1905     |
| `stability`           | 0.0000     | 0.0476     | 0.1429        | 0.0952           | 0.1905            | 0.1714     |
| `tierPriority`        | 0.0376     | 0.0376     | 0.0276        | 0.0376           | 0.0276            | 0.0040     |
| `tierAffinity`        | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `specificityMatch`    | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `contextAffinity`     | 0.0095     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0186     |
| `sessionAvailability` | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |
| `resetWindowAffinity` | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `connectionDensity`   | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |
| `quality`             | 0.02       | 0.02       | **0.03**      | 0.02             | 0.02              | 0.02       |
| `reliability`         | 0.03       | 0.03       | 0.03          | 0.03             | **0.04**          | 0.03       |

Opmerkingen:

- **Pakketten bevatten `quality` en `reliability`** (`quality 0.02`, `quality-first 0.03`; `reliability 0.03`, `reliability-first 0.04`) en vervangen de gewichtstoewijzing volledig (`weights = pack`, geen samenvoeging). `DEFAULT_WEIGHTS` bevat `quality 0.03 / reliability 0`; bij selectie van `balanced`/`default` blijven die standaardwaarden behouden, terwijl bij selectie van een pakket de bovenstaande waarden van dat pakket worden gebruikt. In een koude pool (nog geen waarnemingen, dus `quality 0.5` en `reliability 1`) voegen deze twee factoren `+0.04` toe bij een generiek pakket (`0.03 + 0.01`), `+0.045` bij `quality-first` en `+0.05` bij `reliability-first`.
- `tierAffinity`, `specificityMatch` en `resetWindowAffinity` zijn in elk pakket expliciet ingesteld op `0`.
- De nadruk van elk pakket in één oogopslag:
  - **ship-fast** → latencyInv 0.3048 + health 0.2667 (gezonde verbindingen met lage latentie)
  - **cost-saver** → costInv 0.3324 (de goedkoopste tokens winnen)
  - **quality-first** → taskFit 0.3524 + stability 0.1429 + quality 0.03, het hoogste van alle pakketten (beste model voor de taak, consistent)
  - **offline-friendly** → quota 0.3324 + health 0.2667 (maximale speelruimte, ongeacht snelheid/kosten)
  - **reliability-first** → health 0.3524 + stability 0.1905 + reliability 0.04, het hoogste van alle pakketten (minste verrassingen)
  - **chaos-mode** → health 0.4000 + taskFit 0.1905 (profiel voor foutinjectie)

### Besturing per aanvraag (headers) — #6023 / #6024 / #6025 / #3470

Een `auto`-combinatie kan **per aanvraag** worden aangestuurd via drie headers, zonder de
opgeslagen configuratie van de combinatie te wijzigen. Deze zijn alleen van toepassing op de `auto`-strategie en alleen op de aanvraag
die ze bevat; de opgeslagen `modePack`/`budgetCap`/`budgetFallback` van de combinatie worden gebruikt
wanneer de header ontbreekt.

| Header                        | Accepteert                                                                                                                                                                                                     | Effect                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| :---------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `X-OmniRoute-Mode`            | een vooraf ingestelde alias (`fast`, `balanced`, `quality`, `cheap`, `reliable`, `offline`) of een onbewerkte pakketnaam (`ship-fast`, `cost-saver`, `quality-first`, `offline-friendly`, `reliability-first`) | Overschrijft de scoringsgewichten voor deze aanvraag. `balanced`/`default` dwingen de standaardgewichten af (geen pakket). Onbekende waarden worden genegeerd (configuratie blijft behouden).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `X-OmniRoute-Budget`          | een positief getal (maximaal USD per aanvraag)                                                                                                                                                                 | Harde kostenlimiet: kandidaten waarvan de geschatte kosten deze limiet overschrijden, worden vóór de selectie uitgefilterd. Wat er gebeurt wanneer **elke** kandidaat de limiet overschrijdt, wordt bepaald door `X-OmniRoute-Budget-Fallback` hieronder.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `X-OmniRoute-Budget-Fallback` | `cheapest` (standaard, aliassen: `cheapest-viable`, `soft`) of `strict` (aliassen: `block`, `hard`)                                                                                                            | `cheapest`: valt terug op de wereldwijd goedkoopste kandidaat, ook al overschrijdt deze nog steeds de limiet (verouderd gedrag). `strict`: weigert een selectie te maken — de aanvraag mislukt direct met `HTTP 402` in plaats van stilzwijgend het budget te overschrijden. Onbekende waarden worden genegeerd.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `X-OmniRoute-Effort`          | `auto` (andere waarden gereserveerd)                                                                                                                                                                           | Adaptief denkbudget: wanneer de aanvraag **geen** redeneerveld van welke vorm dan ook bevat (`reasoning_effort`, `reasoning`, `thinking`), zet de gateway `auto` om in `low`/`medium`/`high` op basis van deterministische signalen uit de aanvraagstructuur (lengte van het laatste gebruikersbericht, contextomvang tot en met het laatste gebruikersbericht, eerdere toolresultaten, diepte van de tool-lus). Signalen zijn beperkt tot de huidige beurt — alles na het laatste gebruikersbericht wordt genegeerd — zodat elke aanvraag in een tool-lus op hetzelfde niveau uitkomt (statusloze vastzetting per beurt, geen sessiestatus, geen opschaling halverwege de lus die bovenliggende prompt-cacheprefixen zou verbreken). Een expliciet redeneerveld van de client heeft altijd voorrang. Beperkt tot aanvragen waarvan de bovenliggende dispatch wordt omgezet naar de OpenAI Chat Completions-vorm (`targetFormat === FORMATS.OPENAI`) — `reasoning_effort` is een veld in OpenAI-vorm, dus de header heeft geen effect op een aanvraag die op Claude of Gemini is gericht (zie `open-sse/handlers/chatCore/adaptiveEffortWiring.ts`). |

```bash
# Forceer het snelste profiel, beperk deze aanvraag tot $0.05 en blokkeer strikt in plaats van het budget te overschrijden
curl -sS http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "X-OmniRoute-Mode: fast" \
  -H "X-OmniRoute-Budget: 0.05" \
  -H "X-OmniRoute-Budget-Fallback: strict" \
  -d '{"model":"auto","messages":[{"role":"user","content":"hi"}]}'
```

De resolutie is een zuivere functie (`open-sse/services/autoCombo/requestControls.ts`); de
opgeloste waarden worden doorgegeven aan de bestaande invoerparameters `config.modePack` / `config.budgetCap` /
`config.budgetFallback` van de engine. De opgeslagen `config.budgetFallback` van een combinatie ("strict" |
"cheapest") bepaalt het permanente beleid; de header overschrijft dit voor één enkele aanvraag.

## Alle routeringsstrategieën

De combo-engine van OmniRoute ondersteunt **19 routeringsstrategieën** (gedeclareerd in `src/shared/constants/routingStrategies.ts` → `ROUTING_STRATEGY_VALUES`). De Auto Combo-engine zelf wordt aangeboden via de strategie `auto`; de overige strategieën zijn beschikbaar voor opgeslagen combo's.

| Strategie           | Beschrijving                                                                                                                                                                                                                |
| :------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `priority`          | Geordende lijst waarbij het eerste doel voorrang heeft, met expliciete prioriteit                                                                                                                                           |
| `weighted`          | Gewogen willekeurige selectie op basis van het gewicht per doel                                                                                                                                                             |
| `round-robin`       | Doorloop de doelen cyclisch op volgorde                                                                                                                                                                                     |
| `context-relay`     | Draag context over tussen doelen (lange gesprekken)                                                                                                                                                                         |
| `fill-first`        | Vul het quotum van elk doel voordat naar het volgende wordt overgegaan                                                                                                                                                      |
| `p2c`               | Willekeurige taakverdeling volgens Power of 2 Choices                                                                                                                                                                       |
| `random`            | Uniforme willekeurige selectie                                                                                                                                                                                              |
| `least-used`        | Kies het doel met de laagste huidige belasting                                                                                                                                                                              |
| `cost-optimized`    | Minimaliseer de kosten per aanvraag op basis van catalogusprijzen                                                                                                                                                           |
| `reset-aware` ⭐    | Geef prioriteit op basis van de resettijd van het quotum — korte resetvensters krijgen een hogere positie                                                                                                                   |
| `reset-window`      | Geef de voorkeur aan doelen waarvan het quotumvenster het snelst wordt gereset                                                                                                                                              |
| `headroom`          | Kies het doel met de meeste resterende quotumruimte                                                                                                                                                                         |
| `strict-random`     | Willekeurige selectie zonder deduplicatie van herhalingen                                                                                                                                                                   |
| `auto`              | Gebruik Auto Combo-scores (16 factoren) — **aanbevolen**                                                                                                                                                                    |
| `lkgp`              | Laatst bekende werkende route (houdt vast aan de laatste succesvolle provider en valt daarna terug op regels)                                                                                                               |
| `context-optimized` | Kies het doel dat het beste past bij de huidige contextgrootte                                                                                                                                                              |
| `cache-optimized`   | Herschik doelen op basis van promptcache-affiniteit — de verbinding die waarschijnlijk al de gecachte prefix van deze aanvraag bevat, wordt als eerste geprobeerd (`open-sse/services/combo/promptCacheAffinity.ts`, #8008) |
| `fusion` 🧬         | Stuur de aanvraag parallel naar een panel van modellen en laat vervolgens één antwoord door een beoordelaar samenstellen (zie hieronder)                                                                                    |
| `pipeline`          | Voer doelen achtereenvolgens uit, waarbij de uitvoer van elke stap als invoer voor de volgende stap dient; alleen het uiteindelijke antwoord wordt geretourneerd (#6396)                                                    |

⭐ = Nieuw in v3.8.0 · 🧬 = Nieuw in v3.8.36

### Semantiek van `weighted`

`weighted` is een **proportionele willekeurige trekking per aanvraag**
(`open-sse/services/combo/targetSorters.ts` → `selectWeightedTarget`), geen methode om de verdeling gelijk te trekken:

- Voor elke aanvraag wordt **één** stap getrokken met de waarschijnlijkheid `weight / totalWeight`; de overige stappen
  worden voor die aanvraag op aflopend gewicht geordend als terugvalketen.
- Een stap waarvan het gewicht `0` is (of ontbreekt), wordt **nooit getrokken** zolang een andere stap een
  gewicht > 0 heeft — deze kan alleen als terugvaloptie dienen nadat de getrokken stap is mislukt. Alleen wanneer **alle**
  gewichten 0 zijn, wordt de selectie uniform.
- Stappen waarvan alle doelen niet beschikbaar zijn — provider-circuitbreaker `OPEN`, afkoelperiode van de verbinding,
  modelblokkering — worden vóór de trekking uit de selectie verwijderd
  (`open-sse/services/combo/targetResolution.ts`), zodat één gezonde stap tijdelijk
  elke aanvraag kan winnen.
- `stickyWeightedLimit` (combo-configuratie, standaard `1` = uit) houdt de getrokken stap gedurende dat aantal
  opeenvolgende successen vast voordat opnieuw wordt getrokken.

Gebruik `round-robin` voor strikte rotatie; gelijke gewichten bij `weighted` leveren een statistische — niet
strikte — balans op.

## Fusiestrategie

`fusion` is de enige strategie die **niet** één enkel doel kiest. De prompt wordt
parallel naar **elk model in het panel** verzonden, waarna een configureerbaar
**beoordelaarsmodel** één definitief antwoord samenstelt uit alle panelantwoorden. Overgenomen
uit upstream `decolua/9router` (het Fusion-ontwerp van OpenRouter); implementatie in
`open-sse/services/fusion.ts`.

Zo werkt het:

0. **Omzeiling voor aanvragen met tools** — een aanvraag met een niet-lege `tools`-array
   waarbij `tool_choice` niet expliciet op `"none"` is ingesteld, slaat het panel volledig
   over: de aanvraag wordt rechtstreeks naar één model gerouteerd (de geconfigureerde
   beoordelaar of `panel[0]`), waarbij `tools`/`tool_choice` ongewijzigd worden doorgegeven.
   Panelleden hebben geen toegang tot tools en de synthese-instructie van de beoordelaar
   ontmoedigt het genereren van tool-calls, zodat agentische/tool-aanroepende clients een
   echte beslissing over de tool-call krijgen in plaats van gesynthetiseerd proza (#6771).
1. **Uitwaaiering** (alleen voor aanvragen zonder tools) — de prompt wordt tegelijkertijd
   naar elk model in het panel verzonden, waarbij niet-streamen wordt afgedwongen en tools
   worden verwijderd (de beoordelaar heeft volledig proza nodig om een synthese te maken).
2. **Verzameling met quorumrespijt** — zodra `minPanel` antwoorden zijn ontvangen, start
   een korte respijttimer voor de achterblijvers, waarna de fusie doorgaat met wat er is
   verzameld. Dit beperkt de tijdstraf van het langzaamste model, begrensd door een harde
   time-out.
3. **Synthese door de beoordelaar** — panelantwoorden worden geanonimiseerd (`Source 1`,
   `Source 2`, … — zodat de beoordelaar de inhoud weegt, niet het modelmerk) en aan de
   beoordelaar doorgegeven. Deze analyseert consensus / tegenstrijdigheden / gedeeltelijke
   dekking / unieke inzichten / blinde vlekken en schrijft vervolgens **één** gezaghebbend
   antwoord. De aanroep van de beoordelaar behoudt de oorspronkelijke `stream`-vlag en tools
   van de client, zodat streamen en verderop gelegen toolgebruik blijven werken.
4. **Geleidelijke degradatie** — 0 panelantwoorden → `503`; precies 1 overblijvend antwoord
   → dat antwoord wordt rechtstreeks geretourneerd (er valt niets samen te voegen); een
   panel met één model antwoordt rechtstreeks.

Een panellid mag ook een `combo-ref`-stap zijn (`{kind: "combo-ref", comboName: "..."}`) die naar
een andere combo verwijst — deze wordt verwerkt als **één black-boxstem in het panel** (een
volledige recursieve dispatch naar de combo waarnaar wordt verwezen, niet een uitwaaiering naar
de afzonderlijke doelen van die combo), met dezelfde diepte-/cyclusbeveiliging die elke andere
strategie die combo-ref gebruikt al toepast (#6764).

### Configuratie

Geconfigureerd in de `config`-blob van de combo (geen schemamigratie — de bestaande
`combos`-tabel wordt hergebruikt):

| Veld                                     | Type     | Standaard         | Doel                                                                                       |
| :--------------------------------------- | :------- | :---------------- | :----------------------------------------------------------------------------------------- |
| `config.judgeModel`                      | `string` | eerste panelmodel | Model dat het definitieve antwoord samenstelt                                              |
| `config.fusionTuning.minPanel`           | `number` | `2`               | Vereiste geslaagde antwoorden voordat de respijttimer start (begrensd op `[2, panelSize]`) |
| `config.fusionTuning.stragglerGraceMs`   | `number` | `8000`            | Hoelang op achterblijvers wordt gewacht nadat het quorum is bereikt                        |
| `config.fusionTuning.panelHardTimeoutMs` | `number` | `90000`           | Absolute limiet zodat één vastgelopen model de aanvraag niet kan blokkeren                 |

De standaardwaarden staan in `FUSION_DEFAULTS` (`open-sse/services/fusion.ts`).

### Voorbeeld

```bash
curl -X POST http://localhost:20128/api/combos \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "fusion-panel",
    "strategy": "fusion",
    "targets": [
      { "model": "cc/claude-opus-4-7" },
      { "model": "cx/gpt-5.5" },
      { "model": "glm/glm-5.1" }
    ],
    "config": {
      "judgeModel": "cc/claude-opus-4-7",
      "fusionTuning": { "minPanel": 2, "stragglerGraceMs": 8000, "panelHardTimeoutMs": 90000 }
    }
  }'
```

Roep deze vervolgens aan zoals elke andere combo: `{"model":"fusion-panel","messages":[...]}`.

## Virtuele Auto-Combo-factory

De Auto Combo-engine vereist geen vooraf gedefinieerde combo's. In plaats daarvan bouwt `open-sse/services/autoCombo/virtualFactory.ts` de kandidaten dynamisch:

1. Haalt `getProviderConnections({ isActive: true })` op (alle ingeschakelde verbindingen)
2. Filtert op verbindingen met geldige referenties (API-sleutel of niet-verlopen OAuth-token via `hasUsableOAuthToken()`)
3. Vergelijkt deze met `getProviderRegistry()` voor modelbeschikbaarheid en prijzen
4. Bouwt voor elke tuple `(provider, model, connection)` een `VirtualAutoComboCandidate`
5. Kiest `connection.defaultModel` (of het eerste model uit het register) als dispatchdoel
6. Berekent voor elke kandidaat een score met de 16-factorenfunctie `scorePool()` en het gewichtspakket van de variant
7. Retourneert de resulterende `AutoComboConfig` in het geheugen voor `handleComboChat()` — deze wordt nooit in de database opgeslagen

Dit betekent dat **het toevoegen van een nieuwe provider waarvoor `auto/*` is ingeschakeld, de kandidatenpool automatisch uitbreidt** — handmatige bewerking van combo's is niet nodig. De virtuele combo wordt per aanvraag opnieuw opgebouwd, zodat nieuw toegevoegde of recent weer gezonde verbindingen onmiddellijk worden meegenomen.

## Zelfherstel

- **Tijdelijke uitsluiting**: Score < 0.2 → 5 min uitgesloten (progressieve back-off, maximaal 30 min)
- **Bewustzijn van circuit breaker**: OPEN → automatisch uitgesloten; HALF_OPEN → probe-aanvragen
- **Incidentmodus**: >50% OPEN → exploratie uitschakelen, stabiliteit maximaliseren
- **Herstel na afkoelperiode**: Na uitsluiting is de eerste aanvraag een "probe" met een kortere time-out

## Bandit-exploratie

5% van de aanvragen (configureerbaar) wordt voor exploratie naar willekeurige providers gerouteerd. Uitgeschakeld in de incidentmodus.

## API

Er is **geen afzonderlijk `POST /api/combos/auto`-endpoint** — Auto-Combo wordt op twee manieren gebruikt:

1. **Zonder configuratie (aanbevolen):** Verstuur een willekeurige chatcompletion-aanvraag met `model: "auto"` of `model: "auto/<variant>"`. De virtuele factory bouwt de combo per aanvraag — geen persistentie en geen API-aanroepen nodig.

2. **Opgeslagen combo met `strategy: "auto"`:** Maak via `POST /api/combos` een reguliere combo en stel `strategy: "auto"` in, samen met `config.auto.weights` / `config.auto.candidatePool`. Dezelfde scoring-engine wordt gebruikt; de combo wordt opgeslagen in `combos` en kan via de ID opnieuw worden gebruikt.

Voor detectie vermeldt `GET /api/combos/auto` elke variant met de opgeloste kandidatenpool plus `context_length` / `max_output_tokens` — de MAXIMUMWAARDE van de vensters in de kandidatenpool. Clients (bijvoorbeeld de opencode-plugin) moeten deze waarden in plaats van `0` bekendmaken: een context van nul schakelt de automatische compactie van opencode volledig uit, waardoor sessies blijven groeien totdat het opschonen van de geschiedenis door de gateway de context vernietigt. MAX kan veilig bekendgemaakt worden, omdat het contextvoorfilter van de auto-combo te grote aanvragen naar kandidaten met grote vensters routeert.

```bash
# Gebruik zonder configuratie (geen combo aanmaken)
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"auto/coding","messages":[{"role":"user","content":"Hello"}]}'

# Opgeslagen auto-combo via het reguliere combo-endpoint
curl -X POST http://localhost:20128/api/combos \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","strategy":"auto","config":{"auto":{"candidatePool":["anthropic","google","openai"],"weights":{"quota":0.15,"health":0.3,"costInv":0.05,"latencyInv":0.35,"taskFit":0.1,"stability":0,"tierPriority":0.05}}}}'
```

### Auto-routerstrategieën

Opgeslagen combo's met `strategy: "auto"` kunnen `config.routerStrategy` (of het verouderde
`config.auto.routerStrategy`) instellen op een van de volgende opties:

- `rules` — standaard gewogen scoring
- `score` — selecteert de hoogst geconfigureerde gewogen score. Bij exact gelijke scores blijft de geconfigureerde
  volgorde van kandidaten behouden; de bestaande `explorationRate` neemt steekproeven uit de volledige gerangschikte pool.
- `cost` / `eco` — goedkoopste gezonde provider
- `latency` / `fast` — laagste p95-latentie met betrouwbaarheidsstraf
- `sla-aware` / `sla` — geeft de voorkeur aan kandidaten die voldoen aan SLO's voor p95-latentie, foutpercentage en optionele
  kosten
- `lkgp` — laatst bekende goede provider eerst

### Routerstrategieën in detail

De auto-combo-engine biedt 6 verwisselbare **RouterStrategy**-implementaties die
u via `config.routerStrategy` (of het verouderde `config.auto.routerStrategy`) kunt selecteren.
Elke strategie kiest één provider uit de kandidatenpool op basis van een `RoutingContext`
(taaktype, hints voor tools/visie, tokenschatting, optioneel SLA-beleid, optionele
laatst bekende goede provider).

#### 1. `rules` (standaard) — gewogen scoring met 16 factoren

Omhult de bestaande scoring-engine. Filtert kandidaten met een `OPEN` circuit breaker
uit en voert vervolgens `scorePool()` uit met het huidige taaktype en `getTaskFitness()`,
waarna de provider met de hoogste score wordt gekozen.

```ts
class RulesStrategyImpl implements RouterStrategy {
  readonly name = "rules";
  readonly description = "16-factor weighted scoring (see DEFAULT_WEIGHTS)";

  select(pool, context) {
    const eligible = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const ranked = scorePool(
      eligible.length > 0 ? eligible : pool,
      context.taskType,
      undefined,
      getTaskFitness
    );
    return { provider: ranked[0].provider /* ... */ };
  }
}
```

**Wanneer te gebruiken**: Standaard. Gebruik dit wanneer u een evenwichtige afweging tussen alle signalen wilt.

**Alias**: `rules` (geen alias)

---

#### 2. `cost` / `eco` — goedkoopste gezonde provider

Sorteert de kandidatenpool op `costPer1MTokens` (oplopend) en kiest de goedkoopste.
Filtert eerst `OPEN`-kandidaten uit.

```ts
class CostStrategyImpl implements RouterStrategy {
  readonly name = "cost";
  readonly description = "Always selects cheapest available provider";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort((a, b) => a.costPer1MTokens - b.costPer1MTokens);
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**Wanneer te gebruiken**: Kostengevoelige workloads, batchverwerking of achtergrondtaken.

**Aliassen**: `cost`, `eco`

---

#### 3. `latency` / `fast` — laagste p95-latentie met betrouwbaarheidsstraf

Sorteert op `p95LatencyMs + (errorRate * 1000)`. De straf voor het foutpercentage zorgt ervoor dat
onbetrouwbare providers lager worden gerangschikt, zelfs als hun nominale latentie laag is.

```ts
class LatencyStrategyImpl implements RouterStrategy {
  readonly name = "latency";
  readonly description = "Prioritizes lowest p95 latency with reliability weighting";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort(
      (a, b) => a.p95LatencyMs + a.errorRate * 1000 - (b.p95LatencyMs + b.errorRate * 1000)
    );
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**Wanneer te gebruiken**: Latentiegevoelige workloads, zoals realtimechat, automatisch aanvullen of
interactieve programmeerassistenten.

**Aliassen**: `latency`, `fast`

---

#### 4. `sla-aware` / `sla` — naleving van SLO's voor latentie/fouten/kosten

Geeft elke kandidaat een score op basis van hoe goed deze aan het geconfigureerde SLO-beleid voldoet:

| Factor            | Gewicht | Formule                                                      |
| ----------------- | ------- | ------------------------------------------------------------ |
| Latentiescore     | 35%     | `threshold / max(value, ε)`                                  |
| Foutscore         | 35%     | `threshold / max(value, ε)`                                  |
| Gezondheidsscore  | 15%     | `1.0` (CLOSED) / `0.5` (HALF_OPEN) / `0.0` (OPEN)            |
| Kostenscore       | 10%     | `threshold / max(value, ε)` of omgekeerd genormaliseerd      |
| Stabiliteitsscore | 5%      | omgekeerd genormaliseerde standaardafwijking van de latentie |

Wanneer `hardConstraints: true` is, worden kandidaten primair gesorteerd op **overtredingsscore**
(de mate waarin ze een SLO overschrijden) en vervolgens op samengestelde score. Anders wordt alleen
de samengestelde score gebruikt.

```ts
class SLAStrategyImpl implements RouterStrategy {
  readonly name = "sla-aware";
  readonly description =
    "Selects the provider most likely to satisfy latency, error-rate, and cost SLOs";

  select(pool, context) {
    // ... geeft elke kandidaat een score ten opzichte van het beleid: { targetP95Ms, maxErrorRate, maxCostPer1MTokens, hardConstraints }
  }
}
```

**SLA-velden** (ingesteld in de comboconfiguratie):

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

**Wanneer te gebruiken**: Productieworkloads met strikte budgetten voor latentie, foutpercentage of kosten.

**Aliassen**: `sla-aware`, `sla`

---

#### 5. `lkgp` — laatst bekende goede provider eerst

Probeert eerst de **laatst bekende goede provider** (indien ingesteld) en valt daarna terug op de
`rules`-strategie. Nuttig voor sessie-affiniteit: dezelfde provider verwerkt
vervolgverzoeken in een gesprek.

```ts
class LKGPStrategyImpl implements RouterStrategy {
  readonly name = "lkgp";
  readonly description = "Tries last known good provider first, then falls back to rules";

  select(pool, context) {
    if (context.lkgpEnabled === false) {
      return getStrategy("rules").select(pool, context);
    }

    if (context.lastKnownGoodProvider) {
      const candidates = pool.filter(
        (c) => c.provider === context.lastKnownGoodProvider && c.circuitBreakerState !== "OPEN"
      );
      if (candidates.length > 0) {
        return { provider: candidates[0].provider /* ... */ };
      }
    }

    // Terugvallen op de rules-strategie
    return getStrategy("rules").select(pool, context);
  }
}
```

**Wanneer te gebruiken**: Gesprekken met meerdere beurten waarbij dezelfde provider
vervolgverzoeken moet verwerken (bijvoorbeeld voor caching, contextcontinuïteit of consistente prijzen).

**Alias**: `lkgp` (geen alias)

---

### Aangepaste routerstrategieën

U kunt uw eigen implementatie van `RouterStrategy` registreren via de openbare API:

```ts
import {
  registerStrategy,
  type RouterStrategy,
} from "@omniroute/open-sse/services/autoCombo/routerStrategy";

class MyCustomStrategy implements RouterStrategy {
  readonly name = "my-custom";
  readonly description = "My custom routing strategy";

  select(pool, context) {
    // Uw routeringslogica hier
    return {
      provider: pool[0].provider,
      model: pool[0].model,
      strategy: this.name,
      reason: "MyCustomStrategy: ...",
      candidatesConsidered: pool.length,
      finalScore: 1.0,
    };
  }
}

registerStrategy("my-custom", new MyCustomStrategy());
```

Gebruik deze vervolgens:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "my-custom"
  }
}
```

---

### Keuzehulp voor routerstrategieën

| Gebruikssituatie          | Strategie   | Reden                                            |
| ------------------------- | ----------- | ------------------------------------------------ |
| Gebalanceerde workload    | `rules`     | Standaard — houdt rekening met alle factoren     |
| Kosten minimaliseren      | `cost`      | Kiest altijd de goedkoopste                      |
| Latentie minimaliseren    | `latency`   | Kiest de snelste betrouwbare provider            |
| Strikte SLO's             | `sla-aware` | Filtert op drempelwaarden voor p95/fouten/kosten |
| Chat met meerdere beurten | `lkgp`      | Sessie-affiniteit                                |

SLA-bewuste velden:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

## Taakgeschiktheid

30+ modellen beoordeeld voor 6 taaktypen (`coding`, `review`, `planning`, `analysis`, `debugging`, `documentation`). Ondersteunt wildcardpatronen (bijv. `*-coder` → hoge score voor programmeren).

## Overzicht van automatische varianten

Inclusief de kale `auto` (standaard) plus de 6 `AutoVariant`-waarden die in `autoPrefix.ts` zijn gedeclareerd, zijn er **7 aanroepbare model-ID's**:

`auto`, `auto/coding`, `auto/fast`, `auto/cheap`, `auto/offline`, `auto/smart`, `auto/lkgp`

(`AutoVariant` zelf somt 6 waarden op; de 7e optie is "geen variant" — kale `auto` — die door `parseAutoPrefix()` wordt verwerkt als `variant: undefined`.)

## Hoe niveaus binnen Auto-Combo passen

De scoringsfunctie met 16 factoren (`open-sse/services/autoCombo/scoring.ts`) behandelt het behoren tot een niveau als twee signalen: `tierPriority` (0.0476) en `tierAffinity` (0.0476). Zie de canonieke [tabel met scoringsfactoren](#how-it-works-persisted-auto-combos) hierboven voor de volledige set `DEFAULT_WEIGHTS` — de overschrijvingen per pakket (ship-fast/cost-saver/quality-first/offline-friendly) staan vermeld in de tabel "Gewichtsprofielen per pakket".

Het niveau alleen dwingt **niet** af dat niveau 1 als eerste komt — als de latentie van niveau 1 slecht is of de verhouding tussen kosten en kwaliteit niet optimaal is, wint niveau 2. Gebruik de combostrategie `priority` en rangschik providers per niveau om de volgorde van niveaus af te dwingen.

Verhoog het gewicht van `tierPriority` om niveau 1 (abonnement) sterk te bevoordelen:

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "tierPriority": 0.3, "costInv": 0.05 } } }
}
```

Zie `docs/marketing/TIERS.md` voor niveaudefinities en providerclassificatie.

## Testen en dekking

### Deterministische matrix voor routeringsbeslissingen (`npm run test:combo:matrix`)

`tests/integration/combo-matrix/*.test.ts` bewijst de routerings**beslissing** van alle 19 openbare strategieën end-to-end via de echte combopijplijn met een gesimuleerde upstream. De dekking omvat:

- Alle 19 strategieën van `ROUTING_STRATEGY_VALUES` (ordered, weighted, cost, context, fusion, …).
- `quota-share` (intern) end-to-end: DRR-eerlijkheid + lagere prioriteit bij verzadiging via het echte `selectQuotaShareTarget`-aangrijpingspunt (`registerQuotaFetcher` / `setLKGP` / `__setHeadroomSaturationFetcherForTests`).
- `context-relay`-dekking voor universele overdracht voor elk aantal doelen.

Deze testsuite wordt in CI uitgevoerd (`test:integration`-taak) met `--test-concurrency=1` en `--test-force-exit`, zodat deze deterministisch is en geen actieve inloggegevens vereist.

### Afgeschermde live-rooktest (NIET in CI — echte providers)

| Opdracht                               | Wat deze doet                                                                                                          |
| :------------------------------------- | :--------------------------------------------------------------------------------------------------------------------- |
| `npm run test:combo:live`              | Echte routering binnen hetzelfde proces met `RUN_COMBO_LIVE=1`; maakt een momentopname van een live OmniRoute-database |
| `npm run test:combo:live:vps`          | HTTP-aanroepen naar een live OmniRoute-server (stel `COMBO_LIVE_BASE_URL` in)                                          |
| `npm run test:combo:live:vps:failover` | Hetzelfde, met opzettelijke failoverscenario's                                                                         |

Deze rooktests testen het echte communicatiepad (combo → provider → voltooiing). Ze zijn opzettelijk uitgesloten van CI omdat ze actieve inloggegevens en VPS-toegang vereisen.

---

## Bestanden

| Bestand                                                   | Doel                                                                                                        |
| :-------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------- |
| `open-sse/services/autoCombo/scoring.ts`                  | Scorefunctie met 16 factoren, `DEFAULT_WEIGHTS`, poolnormalisatie                                           |
| `open-sse/services/autoCombo/taskFitness.ts`              | Opzoektabel voor geschiktheid van model × taak                                                              |
| `open-sse/services/autoCombo/engine.ts`                   | Selectielogica, bandit, budgetlimiet                                                                        |
| `open-sse/services/autoCombo/selfHealing.ts`              | Uitsluiting, probes, incidentmodus                                                                          |
| `open-sse/services/autoCombo/modePacks.ts`                | 6 gewichtsprofielen (ship-fast, cost-saver, quality-first, offline-friendly, reliability-first, chaos-mode) |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Parser voor het voorvoegsel `auto/` + 6 varianten                                                           |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Bouwt een `AutoComboConfig` in het geheugen op basis van actieve verbindingen                               |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Testhook voor het mocken van het providerregister                                                           |
| `src/shared/constants/routingStrategies.ts`               | `ROUTING_STRATEGY_VALUES` (19 strategieën)                                                                  |
| `src/sse/handlers/chat.ts`                                | Integratie: kortsluiting voor auto-prefix                                                                   |
