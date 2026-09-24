# Subscription-first routing (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/SUBSCRIPTION_LADDER.md) · 🇪🇹 [am](../../../am/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇦 [ar](../../../ar/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇿 [az](../../../az/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇬 [bg](../../../bg/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇩 [bn](../../../bn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇦 [bs](../../../bs/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇿 [cs](../../../cs/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇪 [de](../../../de/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇷 [el](../../../el/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇸 [es](../../../es/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇪 [et](../../../et/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇷 [fa](../../../fa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇮 [fi](../../../fi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇷 [fr](../../../fr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇪 [ga](../../../ga/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [gu](../../../gu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ha](../../../ha/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇱 [he](../../../he/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [hi](../../../hi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇷 [hr](../../../hr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇺 [hu](../../../hu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇲 [hy](../../../hy/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇩 [id](../../../id/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ig](../../../ig/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇹 [it](../../../it/docs/routing/SUBSCRIPTION_LADDER.md) · 🇯🇵 [ja](../../../ja/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇪 [ka](../../../ka/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇭 [km](../../../km/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [kn](../../../kn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇷 [ko](../../../ko/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇹 [lt](../../../lt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇻 [lv](../../../lv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ml](../../../ml/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [mr](../../../mr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇾 [ms](../../../ms/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇹 [mt](../../../mt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇲 [my](../../../my/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇵 [ne](../../../ne/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇱 [nl](../../../nl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇴 [no](../../../no/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [or](../../../or/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [pa](../../../pa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇭 [phi](../../../phi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇱 [pl](../../../pl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇹 [pt](../../../pt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇴 [ro](../../../ro/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇺 [ru](../../../ru/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇰 [si](../../../si/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇰 [sk](../../../sk/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇮 [sl](../../../sl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇸 [sr](../../../sr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇪 [sv](../../../sv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇪 [sw](../../../sw/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ta](../../../ta/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [te](../../../te/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇭 [th](../../../th/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇷 [tr](../../../tr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇰 [ur](../../../ur/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇿 [uz](../../../uz/docs/routing/SUBSCRIPTION_LADDER.md) · 🇻🇳 [vi](../../../vi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [yo](../../../yo/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/SUBSCRIPTION_LADDER.md)

---

> To nye `auto/*`-id'er — `auto/subscription` og `auto/thrifty`. Begge er tilvalg ved at blive
> anmodet om: Intet routes gennem dem, medmindre en kalder anmoder om id'et ved navn, og ingen
> eksisterende pulje, strategi eller standardindstilling ændres.

## Hvorfor dette findes

OmniRoute besvarer allerede to spørgsmål om omkostninger, og ingen af dem er det, de fleste operatører spørger om.

| Eksisterende mekanisme                                   | Besvarer                                      |
| -------------------------------------------------------- | --------------------------------------------- |
| `hidePaidModels` (`autoCombo/paidModelFilter.ts`)        | "er denne model katalogiseret som gratis?"    |
| `freeAccessPolicy: "strict"` (`strictZeroCostFilter.ts`) | "kan denne forbindelse nogensinde fakturere?" |
| `quotaPreflight` (`combo/quotaExhaustionCutoff.ts`)      | "er denne forbindelse tæt på sin grænse?"     |
| `budgetCap` / `budgetFallback` (`autoCombo/engine.ts`)   | "begræns forbrug, skift til den billigste"    |

Alle mekanismer, der kun tillader gratis brug, **lukker ved fejl** — en opbrugt gratis pulje er en tom pulje, aldrig et
trin op til en betalt mulighed — og alle mekanismer på den betalte side er niveauagnostiske. Ingen af dem besvarer:

> "Brug den kvote, jeg allerede betaler for. Når den slipper op, skal du enten stoppe eller gå ét trin op
> ad gangen gennem de billigste betalte muligheder — og vende tilbage i samme øjeblik, den nulstilles."

## Fakturering er en egenskab ved forbindelsen, ikke ved modellen

`classifyTier()` (`open-sse/services/tierResolver.ts`) bruger `(provider, model)` som nøgle og returnerer
`free | cheap | premium` ud fra katalogpriser. Men hvorvidt en anmodning medfører yderligere omkostninger,
afhænger af **hvilken forbindelse der håndterer den**: Den samme model er inkluderet i abonnementet via en Claude Code
OAuth-forbindelse og faktureres pr. token via en API-nøgleforbindelse.

`provider_connections.auth_type` er ikke en sikker indikator i nogen af retningerne — der findes forbrugsafregnede OAuth-
forbindelser, og der findes API-nøgleforbindelser, som er inkluderet i et abonnement (et Copilot-sædetoken er ikke en
forbrugsafregnet API-nøgle). Derfor kommer faktureringsklassen fra et **kurateret katalog**,
`open-sse/config/connectionBillingCatalog.ts`, som indstilles manuelt ud fra hver udbyders offentliggjorte vilkår —
det samme mønster, som `FreeModelBudget.hardStopGuaranteed` allerede etablerede for gratis modeller.

```ts
type ConnectionBillingClass = "subscription" | "metered" | "keyless" | "unknown";
type ConnectionOverageBehavior = "hard-stop" | "meters-to-paid" | "unknown";
```

Evalueringsrækkefølge (`autoCombo/connectionBilling.ts`): den syntetiske sentinel uden godkendelse →
`keyless`; en katalogpost, der matcher både udbyder **og** `authType`; en post for hele udbyderen;
ellers `unknown`. **Ikke-kurateret betyder ikke gratis** — `unknown` behandles som `metered`
overalt, så en udbyder, der tilføjes i morgen, starter uden for abonnementsniveauet og skal
kurateres bevidst.

## Trinmodellen

Fem trin i eskaleringsrækkefølge. De adskiller sig på mere end blot prisen — hvert har sit **eget**
opbrugssignal, hvilket er grunden til, at dette ikke blot er en sortering.

| #   | Trin           | Medlemskab                                                   | Opbrugt, når                     |
| --- | -------------- | ------------------------------------------------------------ | -------------------------------- |
| 0   | `subscription` | kurateret `billing: "subscription"`                          | kvotevinduet er på/under grænsen |
| 1   | `keyless`      | den syntetiske sti uden godkendelse                          | forbindelsens cooldown/afbryder  |
| 2   | `free`         | forbrugsafregnet forbindelse, `classifyTier() === "free"`    | gratis kvote opbrugt             |
| 3   | `cheap`        | forbrugsafregnet forbindelse, `classifyTier() === "cheap"`   | budgettet pr. trin er opbrugt    |
| 4   | `premium`      | forbrugsafregnet forbindelse, `classifyTier() === "premium"` | budgettet pr. trin er opbrugt    |

Trin 0-2 opbruges på baggrund af **kvote**, som kan observeres og allerede spores. Trin 3-4 har ingen
kvote — en betalt forbindelse fortsætter for evigt — så deres eneste fornuftige opbrugssignal er et **budget**
pr. trin. Uden et sådant signal findes der ingen udløser for "eskaler, når `cheap` er opbrugt".

## `auto/subscription` — fail closed

Pulje = kun trin 0, begrænset til forbindelser, hvis overforbrug er et dokumenteret `hard-stop`, og som hver især er verificeret live til at have ledig kvote. Alt tvetydigt udelukkes: en ikke-kurateret udbyder, en kvoteaflæsning, der ikke kan verificeres, en forældet aflæsning eller et overforbrug, der takseres som betalt.

En tom pulje er det **tilsigtede** svar, ikke en fejl — kalderens eksisterende sti for tomme puljer omdanner det til en tydelig fejl frem for et lydløst, fakturerbart fallback. Det er hele id'ets løfte.

`keyless` kvalificerer sig bevidst **ikke**: Denne gruppering betyder "det abonnement, jeg betaler for", så en backend uden godkendelse hører ikke hjemme i den. Brug `auto/thrifty` (eller `auto/best-free`) til det.

### Forbindelsessikkerhed

En kandidat er ikke altid knyttet til én forbindelse — en logisk kandidat har en `allowedConnectionIds`-tilladelsesliste, og den konto, der faktisk bruges, vælges senere ved afsendelse af `open-sse/services/combo/autoStrategy.ts`. Begge grupperinger verificerer derfor **hver forbindelse individuelt** og omskriver `allowedConnectionIds` til præcis den delmængde, der består kontrollen — aldrig den fulde oprindelige liste og aldrig ét vilkårligt valgt medlem. Fordi `autoStrategy.ts` allerede håndhæver dette array som en bindende tilladelsesliste, gør omskrivningen her "verificeret" og "faktisk brugt" til den samme mængde gennem selve konstruktionen. Dette er den samme invariant og den samme argumentation som i [STRICT_ZERO_COST](./STRICT_ZERO_COST.md).

## `auto/thrifty` — eskaler ét trin ad gangen

Pulje = alle trin, sorteret efter trinindeks, hvor udtømte kandidater filtreres fra. `auto`-motoren scorer stadig **inden for** den resterende pulje: Stigen afgør, hvilke trin der er i spil, mens scoringen afgør, hvilken kandidat der vinder inden for dem. Rækkefølgen er stabil inden for et trin, så scorerens egen rangering ændres aldrig af dette lag.

Dette er et lag til sortering + filtrering, **ikke** en ny dispatcher: Den spekulative løkke i `combo.ts` gennemgår allerede målene i rækkefølge og går videre ved fejl, så en udtømning under kørsel, som forhåndskontrollen ikke fangede, eskalerer stadig til næste trin inden for samme request.

Hvor `auto/subscription` afviser ved tvivl, fortsætter `auto/thrifty` **åbent**: En forbindelse, der er inkluderet i abonnementet, men ikke har en anvendelig kvoteaflæsning, forsøges stadig først. Det koster intet at prøve den, og hvis den viser sig at være udtømt, går fallback-mekanismen alligevel videre til næste trin — hvorimod en afvisning af at prøve den ville sende requestet til et betalt trin ved manglende telemetri, præcis det resultat, grupperingen er oprettet for at undgå.

## Tilbagevenden til abonnementet efter en nulstilling

Tre uafhængige ting skal udløbe, før routingen vender tilbage til trin 0. Hvis kun én af dem rettes, bliver stigen hængende på betalte trin længe efter, at abonnementet er blevet genopfyldt.

1. **Kvotetilstandens cache** — `freeAccessQuota.ts` cacher pr. `(provider, connection)` med en TTL på 180s. En cachet post, hvis egen `resetAt` allerede er passeret, beskriver et vindue, der ikke længere findes, og behandles derfor nu som forældet **uanset alder**, hvilket fremtvinger en opdatering. Uden dette bliver et abonnement, der er genopfyldt ved midnat, fortsat aflæst som udtømt, indtil TTL'en tilfældigvis udløber.
2. **Stigens egen tilstand** — den findes ikke, helt bevidst. Berettigelsen til et trin genberegnes ud fra den aktuelle kvotetilstand, hver gang puljen opbygges; der findes ingen vedvarende post med "aktuelt på trin 3", som kunne overleve en nulstilling og fastlåse routingen.
3. **Forbindelsens nedkølingsperiode** — den udtømmende 429 sætter `rateLimitedUntil` ud fra eksponentiel backoff, hvilket for en abonnementsforbindelse kan overskride den faktiske nulstilling. `clampCooldownToReset()` (`subscriptionLadder.ts`) afkorter en nedkølingsperiode til upstream-systemets eget nulstillingstidspunkt og kan aldrig forlænge den. **Den er implementeret og testet, men endnu ikke tilsluttet**: Kvotecachen ugyldiggøres i `src/sse/services/auth.ts` _før_ nogen nedkølingsperiode skrives, så `resetAt` skal registreres tidligere i den funktion — en ændring af den kritiske robusthedssti, som hører hjemme i sin egen reviewede PR. Indtil da afventes hele forbindelsens nedkølingsperiode før genindtræden (som allerede foretrækker upstream-systemets `Retry-After`-anvisninger, når udbyderen sender dem).

### Beskyttelse mod fluktuation

Et trin, der netop er blevet nulstillet, genoptages kun over `reentryMinRemainingPercent` (standardværdi 5), mens en forbindelse, der allerede er i spil, kun skal forblive over `exitCutoffPercent` (standardværdi 2, svarende til `quotaPreflight.defaultThresholdPercent`). Forskellen er hystereseområdet — uden det vil en forbindelse, der ligger omkring grænseværdien, skifte frem og tilbage mellem trinene ved efterfølgende requests.

## Konfiguration

Kun finjustering. Der er bevidst **intet** `enabled`-flag: En kontakt, der kan slå disse fra,
ville medføre, at `auto/subscription` ubemærket anvender hele puljen — inklusive betalte modeller — under et
navn, der lover det modsatte.

```jsonc
{
  "subscriptionLadder": {
    "exitCutoffPercent": 2,
    "reentryMinRemainingPercent": 5,
    "rungBudgetUsd": { "cheap": 5.0, "premium": 0 }, // 0 deaktiverer et trin fuldstændigt
  },
}
```

Budgetbegrænsning er inaktiv, indtil en forbrugsresolver er tilsluttet: Når der ikke er nogen bogføring tilgængelig, placeres et betalt
trin i rækkefølgen, men begrænses aldrig. Fra og med v3.8.51 accepteres indstillingen `rungBudgetUsd` af
skemaet, men håndhæves endnu IKKE — betragt den som reserveret konfiguration og ikke som et aktivt forbrugsloft. Rækkefølgen af trin, kvotebaseret opbrug og genindtræden efter nulstilling fungerer alle
uden den.

## Sammensætning

`subscription` og `thrifty` er `AutoTier`-værdier, så de kan kombineres med alle kategorier:
`auto/coding:thrifty`, `auto/reasoning:subscription` og så videre. De to flade id'er
(`auto/subscription`, `auto/thrifty`) annonceres i `/v1/models` og kontrolpanelet.

Ingen af id'erne tilhører det betalte niveau, så `isPaidTierAutoId()` returnerer `false` for begge, og
`auto/subscription` påvirkes ikke af `hidePaidModels`.

## Hvor koden findes

| Område                                 | Fil                                                 |
| -------------------------------------- | --------------------------------------------------- |
| Kuraterede faktureringsdata            | `open-sse/config/connectionBillingCatalog.ts`       |
| Klassifikator                          | `open-sse/services/autoCombo/connectionBilling.ts`  |
| Trin, begge grupperinger, genindtræden | `open-sse/services/autoCombo/subscriptionLadder.ts` |
| Tilslutning til kandidatpuljen         | `open-sse/services/autoCombo/virtualFactory.ts`     |
| Nulstillingsbevidst cacheforældelse    | `open-sse/services/autoCombo/freeAccessQuota.ts`    |
| Niveaugrænseflade                      | `open-sse/services/autoCombo/suffixComposition.ts`  |
| Annoncerede id'er                      | `open-sse/services/autoCombo/builtinCatalog.ts`     |
| Tests                                  | `tests/unit/autoCombo/subscription-ladder.test.ts`  |
