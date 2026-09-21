# Subscription-first routing (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/SUBSCRIPTION_LADDER.md) · 🇪🇹 [am](../../../am/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇦 [ar](../../../ar/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇿 [az](../../../az/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇬 [bg](../../../bg/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇩 [bn](../../../bn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇿 [cs](../../../cs/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇰 [da](../../../da/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇪 [de](../../../de/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇷 [el](../../../el/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇸 [es](../../../es/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇪 [et](../../../et/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇷 [fa](../../../fa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇮 [fi](../../../fi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇷 [fr](../../../fr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇪 [ga](../../../ga/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [gu](../../../gu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ha](../../../ha/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇱 [he](../../../he/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [hi](../../../hi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇷 [hr](../../../hr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇺 [hu](../../../hu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇲 [hy](../../../hy/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇩 [id](../../../id/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ig](../../../ig/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇹 [it](../../../it/docs/routing/SUBSCRIPTION_LADDER.md) · 🇯🇵 [ja](../../../ja/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇪 [ka](../../../ka/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇭 [km](../../../km/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [kn](../../../kn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇷 [ko](../../../ko/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇹 [lt](../../../lt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇻 [lv](../../../lv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ml](../../../ml/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [mr](../../../mr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇾 [ms](../../../ms/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇹 [mt](../../../mt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇲 [my](../../../my/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇵 [ne](../../../ne/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇱 [nl](../../../nl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [or](../../../or/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [pa](../../../pa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇭 [phi](../../../phi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇱 [pl](../../../pl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇹 [pt](../../../pt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇴 [ro](../../../ro/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇺 [ru](../../../ru/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇰 [si](../../../si/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇰 [sk](../../../sk/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇮 [sl](../../../sl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇸 [sr](../../../sr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇪 [sv](../../../sv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇪 [sw](../../../sw/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ta](../../../ta/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [te](../../../te/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇭 [th](../../../th/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇷 [tr](../../../tr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇰 [ur](../../../ur/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇿 [uz](../../../uz/docs/routing/SUBSCRIPTION_LADDER.md) · 🇻🇳 [vi](../../../vi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [yo](../../../yo/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/SUBSCRIPTION_LADDER.md)

---

> To nye `auto/*`-id-er — `auto/subscription` og `auto/thrifty`. Begge aktiveres eksplisitt ved å bli
> forespurt: ingenting rutes gjennom dem med mindre en kallende part ber om id-en ved navn, og ingen
> eksisterende pool, strategi eller standardinnstilling endres.

## Hvorfor dette finnes

OmniRoute besvarer allerede to kostnadsspørsmål, men ingen av dem er det de fleste operatører spør om.

| Eksisterende mekanisme                                   | Besvarer                                          |
| -------------------------------------------------------- | ------------------------------------------------- |
| `hidePaidModels` (`autoCombo/paidModelFilter.ts`)        | «er denne modellen katalogført som gratis?»       |
| `freeAccessPolicy: "strict"` (`strictZeroCostFilter.ts`) | «kan denne forbindelsen noen gang fakturere meg?» |
| `quotaPreflight` (`combo/quotaExhaustionCutoff.ts`)      | «nærmer denne forbindelsen seg grensen sin?»      |
| `budgetCap` / `budgetFallback` (`autoCombo/engine.ts`)   | «begrens forbruket, gå ned til det billigste»     |

Alle mekanismer som kun tillater gratis bruk, **feiler lukket** — en oppbrukt gratis pool er en tom pool, aldri et
trinn opp til et betalt alternativ — og alle mekanismer på betalingssiden er uavhengige av nivå. Ingen av dem besvarer:

> «Bruk kvoten jeg allerede betaler for. Når den er brukt opp, stopp eller gå opp ett trinn om
> gangen gjennom de billigste betalte alternativene — og gå tilbake i det øyeblikket kvoten tilbakestilles.»

## Fakturering er en egenskap ved forbindelsen, ikke modellen

`classifyTier()` (`open-sse/services/tierResolver.ts`) bruker `(provider, model)` som nøkkel og returnerer
`free | cheap | premium` basert på katalogpriser. Men hvorvidt en forespørsel medfører ekstra kostnader,
avhenger av **hvilken forbindelse som håndterer den**: Den samme modellen er inkludert i abonnementet via en Claude Code
OAuth-forbindelse og faktureres per token via en API-nøkkelforbindelse.

`provider_connections.auth_type` er ikke en trygg indikator i noen retning — forbruksbaserte OAuth-
forbindelser finnes, og det samme gjør API-nøkkelforbindelser som er inkludert i et abonnement (et Copilot-abonnementstoken er ikke en
forbruksbasert API-nøkkel). Faktureringsklassen kommer derfor fra en **kurert katalog**,
`open-sse/config/connectionBillingCatalog.ts`, som angis manuelt basert på hver leverandørs publiserte vilkår —
det samme mønsteret som `FreeModelBudget.hardStopGuaranteed` allerede etablerte for gratis modeller.

```ts
type ConnectionBillingClass = "subscription" | "metered" | "keyless" | "unknown";
type ConnectionOverageBehavior = "hard-stop" | "meters-to-paid" | "unknown";
```

Rekkefølge for avgjørelse (`autoCombo/connectionBilling.ts`): den syntetiske markøren for ingen autentisering →
`keyless`; en katalogoppføring som samsvarer med leverandør **og** `authType`; en leverandøromfattende oppføring;
ellers `unknown`. **Ikke-kurert betyr ikke gratis** — `unknown` behandles som `metered`
overalt, slik at en leverandør som legges til i morgen, starter utenfor abonnementstrinnet og må
legges inn i katalogen bevisst.

## Trinnmodellen

Fem trinn i eskaleringsrekkefølge. De skiller seg fra hverandre på mer enn pris — hvert av dem har sitt **eget**
signal for oppbrukt kapasitet, og derfor er dette ikke bare en sortering.

| #   | Trinn          | Medlemskap                                                 | Oppbrukt når                          |
| --- | -------------- | ---------------------------------------------------------- | ------------------------------------- |
| 0   | `subscription` | kurert `billing: "subscription"`                           | kvotevinduet er på/under terskelen    |
| 1   | `keyless`      | den syntetiske banen uten autentisering                    | forbindelsesnedkjøling / effektbryter |
| 2   | `free`         | forbruksbasert forbindelse, `classifyTier() === "free"`    | gratiskvoten er brukt opp             |
| 3   | `cheap`        | forbruksbasert forbindelse, `classifyTier() === "cheap"`   | budsjettet per trinn er brukt opp     |
| 4   | `premium`      | forbruksbasert forbindelse, `classifyTier() === "premium"` | budsjettet per trinn er brukt opp     |

Trinn 0–2 blir oppbrukt basert på **kvote**, som er observerbar og allerede spores. Trinn 3–4 har ingen
kvote — en betalt forbindelse kan betjene forespørsler for alltid — så deres eneste fornuftige signal for oppbrukt kapasitet er et
**budsjett** per trinn. Uten et slikt budsjett har «eskaler når det billige trinnet er oppbrukt» ingen utløser.

## `auto/subscription` — steng ved usikkerhet

Pool = kun trinn 0, begrenset til tilkoblinger der overforbruk er dokumentert som `hard-stop`, og
der hver tilkobling er verifisert i sanntid til å ha ledig kvote. Alt som er tvetydig, utelukkes:
en ikke-kurert leverandør, en kvoteavlesning som ikke kan verifiseres, en utdatert avlesning eller
overforbruk som faktureres.

En tom pool er det **tilsiktede** resultatet, ikke en feil — kallende kodes eksisterende håndtering
av tom pool gjør dette om til en tydelig feil i stedet for et stilltiende, fakturerbart reservevalg.
Det er hele garantien denne ID-en gir.

`keyless` kvalifiserer bevisst **ikke**: denne grupperingen betyr «abonnementet jeg betaler for»,
så en backend uten autentisering hører ikke hjemme i den. Bruk `auto/thrifty` (eller
`auto/best-free`) til dette.

### Tilkoblingssikkerhet

En kandidat er ikke alltid knyttet til én tilkobling — en logisk kandidat har en tillatelsesliste
i `allowedConnectionIds`, og kontoen som faktisk brukes, velges senere, ved distribuering, av
`open-sse/services/combo/autoStrategy.ts`. Begge grupperingene verifiserer derfor **hver tilkobling
individuelt** og omskriver `allowedConnectionIds` til nøyaktig det delsettet som består — aldri
hele den opprinnelige listen, aldri ett vilkårlig valgt medlem. Fordi `autoStrategy.ts` allerede
håndhever denne matrisen som en absolutt tillatelsesliste, gjør omskrivingen her at «verifisert»
og «faktisk brukt» blir samme mengde per konstruksjon. Dette er samme invariant, og samme
resonnement, som [STRICT_ZERO_COST](./STRICT_ZERO_COST.md).

## `auto/thrifty` — eskaler ett trinn om gangen

Pool = alle trinn, sortert etter trinnindeks, med oppbrukte kandidater filtrert ut. `auto`-motoren
poengsetter fortsatt **innenfor** den gjenværende poolen: stigen avgjør hvilke trinn som er
aktuelle, mens poengsettingen avgjør hvilken kandidat som vinner blant dem. Rekkefølgen er stabil
innenfor et trinn, så poengberegnerens egen rangering omorganiseres aldri av dette overlegget.

Dette er et overlegg for rekkefølge + filtrering, **ikke** en ny distributør: den spekulative
løkken i `combo.ts` går allerede gjennom målene i rekkefølge og fortsetter ved feil, så hvis
kvoten blir oppbrukt under kjøring uten at forhåndskontrollen oppdaget det, eskaleres det fortsatt
til neste trinn i samme forespørsel.

Mens `auto/subscription` stenger ved usikkerhet, forblir `auto/thrifty` **åpen**: en tilkobling som
er inkludert i abonnementet, men som ikke har noen brukbar kvoteavlesning, forsøkes fortsatt først.
Det koster ingenting å prøve den, og hvis den viser seg å være oppbrukt, går den videre til neste
trinn uansett — mens det å nekte å prøve ville sendt forespørselen til et betalt trinn ved manglende
telemetri, nøyaktig det utfallet grupperingen er ment å unngå.

## Retur til abonnementet etter en tilbakestilling

Tre uavhengige ting må utløpe før rutingen går tilbake til trinn 0. Hvis bare én av dem korrigeres,
blir stigen stående fast på betalte trinn lenge etter at abonnementet er fylt opp igjen.

1. **Hurtigbufferen for kvotestatus** — `freeAccessQuota.ts` hurtigbufrer per
   `(provider, connection)` med en TTL på 180 sekunder. En hurtigbufret oppføring der egen
   `resetAt` allerede er passert, beskriver et vindu som ikke lenger finnes, og behandles derfor
   nå som utdatert **uansett alder**, slik at en oppdatering tvinges frem. Uten dette vil et
   abonnement som fylles opp igjen ved midnatt, fortsatt vises som oppbrukt frem til TTL-en
   tilfeldigvis utløper.
2. **Stigens egen tilstand** — den har ingen, med hensikt. Kvalifisering for trinn beregnes på
   nytt fra gjeldende kvotestatus hver gang poolen bygges; det finnes ingen lagret oppføring av
   typen «for øyeblikket på trinn 3» som kan overleve en tilbakestilling og låse rutingen.
3. **Tilkoblingens nedkjølingsperiode** — 429-responsen som oppstår ved oppbrukt kvote, setter
   `rateLimitedUntil` basert på eksponentiell tilbakeholdelse, som for en abonnementstilkobling
   kan vare lenger enn den faktiske tilbakestillingen. `clampCooldownToReset()`
   (`subscriptionLadder.ts`) begrenser en nedkjølingsperiode til leverandørens eget
   tilbakestillingstidspunkt og kan aldri forlenge den. **Den er implementert og testet, men
   ennå ikke koblet til**: kvotehurtigbufferen ugyldiggjøres i `src/sse/services/auth.ts` _før_
   noen nedkjølingsperiode skrives, så `resetAt` må registreres tidligere i denne funksjonen —
   en endring i den kritiske robusthetsflyten som hører hjemme i en egen fagfellevurdert PR.
   Frem til da venter systemet med gjenopptak til tilkoblingens nedkjølingsperiode er over
   (den foretrekker allerede leverandørens `Retry-After`-hint når leverandøren sender dem).

### Beskyttelse mot pendling

Et trinn som nettopp er tilbakestilt, slippes først inn igjen over
`reentryMinRemainingPercent` (standardverdi 5), mens en tilkobling som allerede er i bruk, bare
må holde seg over `exitCutoffPercent` (standardverdi 2, tilsvarende
`quotaPreflight.defaultThresholdPercent`). Forskjellen er hysteresebåndet — uten det vil en
tilkobling som ligger rundt grenseverdien, pendle mellom trinn ved påfølgende forespørsler.

## Konfigurasjon

Kun finjustering. Det finnes med hensikt **ikke noe** `enabled`-flagg: En bryter som kan slå av disse,
ville la `auto/subscription` fortsette å tilby hele utvalget i det stille — inkludert betalte modeller — under et
navn som lover det motsatte.

```jsonc
{
  "subscriptionLadder": {
    "exitCutoffPercent": 2,
    "reentryMinRemainingPercent": 5,
    "rungBudgetUsd": { "cheap": 5.0, "premium": 0 }, // 0 deaktiverer et trinn fullstendig
  },
}
```

Budsjettbegrensningen er inaktiv frem til en utgiftsresolver er koblet til: Når ingen regnskapsdata er tilgjengelige, blir et betalt
trinn sortert, men aldri begrenset. Fra og med v3.8.51 godtas innstillingen `rungBudgetUsd` av
skjemaet, men håndheves IKKE ennå — behandle den som reservert konfigurasjon, ikke som et aktivt utgiftstak. Sortering av trinn, kvotebasert uttømming og gjeninntreden etter tilbakestilling
fungerer uten den.

## Sammensetning

`subscription` og `thrifty` er `AutoTier`-verdier, så de kan kombineres med alle kategorier:
`auto/coding:thrifty`, `auto/reasoning:subscription` og så videre. De to flate ID-ene
(`auto/subscription`, `auto/thrifty`) annonseres i `/v1/models` og kontrollpanelet.

Ingen av ID-ene tilhører et betalt nivå, så `isPaidTierAutoId()` returnerer `false` for begge, og
`auto/subscription` påvirkes ikke av `hidePaidModels`.

## Hvor koden befinner seg

| Område                                   | Fil                                                 |
| ---------------------------------------- | --------------------------------------------------- |
| Kuraterte faktureringsfakta              | `open-sse/config/connectionBillingCatalog.ts`       |
| Klassifikator                            | `open-sse/services/autoCombo/connectionBilling.ts`  |
| Trinn, begge grupperinger, gjeninntreden | `open-sse/services/autoCombo/subscriptionLadder.ts` |
| Integrasjon i kandidatgrunnlaget         | `open-sse/services/autoCombo/virtualFactory.ts`     |
| Tilbakestillingsbevisst cache-foreldelse | `open-sse/services/autoCombo/freeAccessQuota.ts`    |
| Nivågrensesnitt                          | `open-sse/services/autoCombo/suffixComposition.ts`  |
| Annonserte ID-er                         | `open-sse/services/autoCombo/builtinCatalog.ts`     |
| Tester                                   | `tests/unit/autoCombo/subscription-ladder.test.ts`  |
