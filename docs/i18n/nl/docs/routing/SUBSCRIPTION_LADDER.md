# Subscription-first routing (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/SUBSCRIPTION_LADDER.md) · 🇪🇹 [am](../../../am/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇦 [ar](../../../ar/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇿 [az](../../../az/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇬 [bg](../../../bg/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇩 [bn](../../../bn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇦 [bs](../../../bs/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇿 [cs](../../../cs/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇰 [da](../../../da/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇪 [de](../../../de/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇷 [el](../../../el/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇸 [es](../../../es/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇪 [et](../../../et/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇷 [fa](../../../fa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇮 [fi](../../../fi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇷 [fr](../../../fr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇪 [ga](../../../ga/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [gu](../../../gu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ha](../../../ha/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇱 [he](../../../he/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [hi](../../../hi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇷 [hr](../../../hr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇺 [hu](../../../hu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇲 [hy](../../../hy/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇩 [id](../../../id/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ig](../../../ig/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇹 [it](../../../it/docs/routing/SUBSCRIPTION_LADDER.md) · 🇯🇵 [ja](../../../ja/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇪 [ka](../../../ka/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇭 [km](../../../km/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [kn](../../../kn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇷 [ko](../../../ko/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇹 [lt](../../../lt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇻 [lv](../../../lv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ml](../../../ml/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [mr](../../../mr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇾 [ms](../../../ms/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇹 [mt](../../../mt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇲 [my](../../../my/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇵 [ne](../../../ne/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇴 [no](../../../no/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [or](../../../or/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [pa](../../../pa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇭 [phi](../../../phi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇱 [pl](../../../pl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇹 [pt](../../../pt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇴 [ro](../../../ro/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇺 [ru](../../../ru/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇰 [si](../../../si/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇰 [sk](../../../sk/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇮 [sl](../../../sl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇸 [sr](../../../sr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇪 [sv](../../../sv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇪 [sw](../../../sw/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ta](../../../ta/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [te](../../../te/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇭 [th](../../../th/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇷 [tr](../../../tr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇰 [ur](../../../ur/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇿 [uz](../../../uz/docs/routing/SUBSCRIPTION_LADDER.md) · 🇻🇳 [vi](../../../vi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [yo](../../../yo/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/SUBSCRIPTION_LADDER.md)

---

> Twee nieuwe `auto/*`-id's — `auto/subscription` en `auto/thrifty`. Beide zijn opt-in doordat ze
> expliciet moeten worden aangevraagd: niets wordt via deze id's gerouteerd tenzij een aanroeper de
> id bij naam aanvraagt, en er worden geen bestaande pools, strategieën of standaardwaarden gewijzigd.

## Waarom dit bestaat

OmniRoute beantwoordt al twee kostenvragen, maar geen van beide is de vraag die de meeste beheerders stellen.

| Bestaand mechanisme                                      | Beantwoordt                                          |
| -------------------------------------------------------- | ---------------------------------------------------- |
| `hidePaidModels` (`autoCombo/paidModelFilter.ts`)        | "staat dit model als gratis in de catalogus?"        |
| `freeAccessPolicy: "strict"` (`strictZeroCostFilter.ts`) | "kan deze verbinding mij ooit kosten aanrekenen?"    |
| `quotaPreflight` (`combo/quotaExhaustionCutoff.ts`)      | "nadert deze verbinding haar limiet?"                |
| `budgetCap` / `budgetFallback` (`autoCombo/engine.ts`)   | "beperk uitgaven, schakel terug naar de goedkoopste" |

Elk mechanisme dat uitsluitend gratis opties gebruikt, **faalt gesloten** — een uitgeputte gratis pool is een lege pool, nooit een
stap omhoog naar een betaalde optie — en elk mechanisme aan de betaalde kant houdt geen rekening met prijsklassen. Geen van beide beantwoordt:

> "Gebruik het quotum waarvoor ik al betaal. Wanneer het op is, stop dan of ga telkens één trede
> omhoog via de goedkoopste betaalde opties — en keer terug zodra het quotum wordt gereset."

## Facturering is een eigenschap van een verbinding, niet van een model

`classifyTier()` (`open-sse/services/tierResolver.ts`) gebruikt `(provider, model)` als sleutel en retourneert
`free | cheap | premium` op basis van catalogusprijzen. Maar of een aanvraag extra geld kost,
hangt af van **welke verbinding deze afhandelt**: hetzelfde model is inbegrepen in het abonnement via een Claude Code
OAuth-verbinding en wordt per token gefactureerd via een API-sleutelverbinding.

`provider_connections.auth_type` is in geen van beide richtingen een betrouwbare indicator — er bestaan
OAuth-verbindingen op basis van verbruik en er bestaan API-sleutelverbindingen die in een abonnement zijn inbegrepen (een Copilot-seat-token is geen
API-sleutel op basis van verbruik). Daarom komt de factureringsklasse uit een **beheerde catalogus**,
`open-sse/config/connectionBillingCatalog.ts`, die handmatig wordt ingesteld op basis van de gepubliceerde voorwaarden van elke provider —
hetzelfde patroon dat `FreeModelBudget.hardStopGuaranteed` al heeft vastgelegd voor gratis modellen.

```ts
type ConnectionBillingClass = "subscription" | "metered" | "keyless" | "unknown";
type ConnectionOverageBehavior = "hard-stop" | "meters-to-paid" | "unknown";
```

Volgorde van bepaling (`autoCombo/connectionBilling.ts`): de synthetische sentinel zonder authenticatie →
`keyless`; een catalogusvermelding die overeenkomt met de provider **en** `authType`; een providerbrede vermelding;
anders `unknown`. **Niet-beheerd betekent niet gratis** — `unknown` wordt overal behandeld als `metered`,
zodat een provider die morgen wordt toegevoegd buiten de abonnementstrede begint en bewust
moet worden opgenomen in de catalogus.

## Het tredemodel

Vijf treden in escalatievolgorde. Ze verschillen in meer dan alleen prijs — elke trede heeft haar **eigen**
uitputtingssignaal, en daarom is dit niet slechts een sortering.

| #   | Trede          | Lidmaatschap                                                     | Uitgeput wanneer                        |
| --- | -------------- | ---------------------------------------------------------------- | --------------------------------------- |
| 0   | `subscription` | beheerde `billing: "subscription"`                               | quotumvenster op/onder de drempelwaarde |
| 1   | `keyless`      | het synthetische pad zonder authenticatie                        | cooldown/onderbreker van de verbinding  |
| 2   | `free`         | verbinding op basis van verbruik, `classifyTier() === "free"`    | gratis tegoed uitgeput                  |
| 3   | `cheap`        | verbinding op basis van verbruik, `classifyTier() === "cheap"`   | budget per trede verbruikt              |
| 4   | `premium`      | verbinding op basis van verbruik, `classifyTier() === "premium"` | budget per trede verbruikt              |

Treden 0-2 raken uitgeput op basis van **quotum**, dat waarneembaar is en al wordt bijgehouden. Treden 3-4 hebben geen
quotum — een betaalde verbinding blijft onbeperkt aanvragen verwerken — waardoor hun enige zinvolle uitputtingssignaal een
**budget** per trede is. Zonder zo'n budget bestaat er geen trigger voor "escaleren wanneer `cheap` is uitgeput".

## `auto/subscription` — gesloten falen

Pool = uitsluitend trede 0, beperkt tot verbindingen waarvan het overschrijden van de limiet een gedocumenteerde `hard-stop` is en waarvoor live is geverifieerd dat er nog quotaruimte beschikbaar is. Alles wat ambigu is, wordt uitgesloten: een niet-gecureerde provider, een niet-verifieerbare quotameting, een verouderde meting of een overschrijding die als betaald verbruik wordt afgerekend.

Een lege pool is het **beoogde** resultaat, geen defect — het bestaande pad van de aanroeper voor een lege pool zet dit om in een duidelijke fout in plaats van een stille, factureerbare fallback. Dat is de volledige belofte van deze ID.

`keyless` komt bewust **niet** in aanmerking: deze groepering betekent "het abonnement waarvoor ik betaal", dus een backend zonder authenticatie hoort er niet bij. Gebruik daarvoor `auto/thrifty` (of `auto/best-free`).

### Verbindingsveiligheid

Een kandidaat is niet altijd aan één verbinding gekoppeld — een logische kandidaat bevat een allowlist `allowedConnectionIds`, en het account dat daadwerkelijk wordt gebruikt, wordt pas later, bij het dispatchen, gekozen door `open-sse/services/combo/autoStrategy.ts`. Beide groeperingen verifiëren daarom **elke verbinding afzonderlijk** en beperken `allowedConnectionIds` tot exact de overgebleven subset — nooit de volledige oorspronkelijke lijst en nooit één willekeurig gekozen lid. Omdat `autoStrategy.ts` die array al als harde allowlist afdwingt, zorgt het hier herschrijven ervan er per definitie voor dat "geverifieerd" en "daadwerkelijk gebruikt" dezelfde verzameling zijn. Dit is dezelfde invariant en dezelfde redenering als bij [STRICT_ZERO_COST](./STRICT_ZERO_COST.md).

## `auto/thrifty` — telkens één trede opschalen

Pool = alle treden, geordend op trede-index, waarbij uitgeputte kandidaten worden uitgesloten. De `auto`-engine kent nog steeds scores toe **binnen** de overgebleven pool: de ladder bepaalt welke treden meedoen, de scoring bepaalt welke kandidaat daarbinnen wint. De volgorde binnen een trede is stabiel, zodat de eigen rangschikking van de scorer nooit door deze overlay wordt gewijzigd.

Dit is een overlay voor ordening en gating, **geen** nieuwe dispatcher: de speculatieve lus van `combo.ts` doorloopt doelen al op volgorde en gaat bij een fout door naar het volgende doel. Daardoor wordt bij runtime-uitputting die niet door de preflight is gedetecteerd, binnen hetzelfde verzoek alsnog opgeschaald naar de volgende trede.

Waar `auto/subscription` gesloten faalt, faalt `auto/thrifty` **open**: een bij het abonnement inbegrepen verbinding zonder bruikbare quotameting wordt nog steeds als eerste geprobeerd. Die poging kost niets, en als de verbinding toch uitgeput blijkt, gaat de fallback alsnog door naar de volgende trede — terwijl het weigeren van die poging het verzoek bij ontbrekende telemetrie naar een betaalde trede zou sturen, precies het resultaat dat deze groepering moet voorkomen.

## Terugkeren naar het abonnement na een reset

Drie onafhankelijke zaken moeten verlopen voordat de routering terugkeert naar trede 0. Als slechts één ervan wordt opgelost, blijft de ladder nog lang nadat het abonnement is aangevuld op betaalde treden vastzitten.

1. **De cache voor de quotastatus** — `freeAccessQuota.ts` cachet per `(provider, connection)` met een TTL van 180 s. Een gecachte entry waarvan de eigen `resetAt` al is verstreken, beschrijft een venster dat niet meer bestaat en wordt daarom nu als verouderd beschouwd, **ongeacht de ouderdom**, waardoor een refresh wordt afgedwongen. Zonder dit mechanisme blijft een abonnement dat om middernacht is aangevuld als uitgeput worden weergegeven totdat de TTL toevallig verloopt.
2. **De eigen status van de ladder** — die bestaat bewust niet. Of een trede in aanmerking komt, wordt bij elke opbouw van de pool opnieuw berekend op basis van de live quotastatus; er bestaat geen persistente record "momenteel op trede 3" die langer dan een reset kan blijven bestaan en de routering kan blokkeren.
3. **De cooldown van de verbinding** — de 429 bij uitputting stelt `rateLimitedUntil` in op basis van exponentiële back-off, die voor een abonnementsverbinding de werkelijke reset kan overschrijden. `clampCooldownToReset()` (`subscriptionLadder.ts`) verkort een cooldown tot het eigen resetmoment van de upstream en kan een cooldown nooit verlengen. **Dit is geïmplementeerd en getest, maar nog niet aangesloten**: de quotacache wordt in `src/sse/services/auth.ts` ongeldig gemaakt _voordat_ een cooldown wordt vastgelegd, dus `resetAt` moet eerder in die functie worden vastgelegd — een wijziging aan het kritieke pad voor veerkracht die thuishoort in een eigen beoordeelde PR. Tot die tijd wordt bij terugkeer gewacht tot de cooldown van de verbinding is verlopen (die al de voorkeur geeft aan upstream-`Retry-After`-hints wanneer de provider die meestuurt).

### Anti-flap

Een trede die zojuist is gereset, wordt pas opnieuw toegelaten boven `reentryMinRemainingPercent` (standaard 5), terwijl een verbinding die al in gebruik is alleen boven `exitCutoffPercent` hoeft te blijven (standaard 2, overeenkomstig `quotaPreflight.defaultThresholdPercent`). Het verschil vormt de hysteresisband — zonder deze band zou een verbinding die rond de afkapwaarde schommelt bij opeenvolgende verzoeken voortdurend tussen treden wisselen.

## Configuratie

Alleen voor afstemming. Er is bewust **geen** `enabled`-vlag: een schakelaar waarmee dit kan worden uitgeschakeld,
zou `auto/subscription` ongemerkt de volledige pool laten aanbieden — inclusief betaalde modellen — onder een
naam die het tegenovergestelde belooft.

```jsonc
{
  "subscriptionLadder": {
    "exitCutoffPercent": 2,
    "reentryMinRemainingPercent": 5,
    "rungBudgetUsd": { "cheap": 5.0, "premium": 0 }, // 0 schakelt een trede volledig uit
  },
}
```

Budgetbeperking is inactief totdat een uitgavenresolver is aangesloten: wanneer er geen boekhouding beschikbaar is, wordt een betaalde
trede wel gerangschikt, maar nooit beperkt. Sinds v3.8.51 wordt de instelling `rungBudgetUsd` door het
schema geaccepteerd, maar nog NIET afgedwongen — beschouw deze als gereserveerde configuratie, niet als een actieve uitgavenlimiet. De volgorde van treden, uitputting op basis van quota en herintreding na een reset
werken allemaal zonder deze instelling.

## Samenstelling

`subscription` en `thrifty` zijn `AutoTier`-waarden en kunnen dus met elke categorie worden gecombineerd:
`auto/coding:thrifty`, `auto/reasoning:subscription`, enzovoort. De twee vlakke id's
(`auto/subscription`, `auto/thrifty`) worden gepubliceerd in `/v1/models` en het dashboard.

Geen van beide id's behoort tot de betaalde laag, dus `isPaidTierAutoId()` retourneert voor beide `false` en
`auto/subscription` blijft behouden bij `hidePaidModels`.

## Waar de code staat

| Onderdeel                                | Bestand                                             |
| ---------------------------------------- | --------------------------------------------------- |
| Samengestelde facturatiegegevens         | `open-sse/config/connectionBillingCatalog.ts`       |
| Classificator                            | `open-sse/services/autoCombo/connectionBilling.ts`  |
| Treden, beide groeperingen, herintreding | `open-sse/services/autoCombo/subscriptionLadder.ts` |
| Koppeling met de kandidatenpool          | `open-sse/services/autoCombo/virtualFactory.ts`     |
| Resetbewuste cacheveroudering            | `open-sse/services/autoCombo/freeAccessQuota.ts`    |
| Laagoppervlak                            | `open-sse/services/autoCombo/suffixComposition.ts`  |
| Gepubliceerde id's                       | `open-sse/services/autoCombo/builtinCatalog.ts`     |
| Tests                                    | `tests/unit/autoCombo/subscription-ladder.test.ts`  |
