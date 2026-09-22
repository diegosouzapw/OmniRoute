# Subscription-first routing (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/SUBSCRIPTION_LADDER.md) · 🇪🇹 [am](../../../am/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇦 [ar](../../../ar/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇿 [az](../../../az/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇬 [bg](../../../bg/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇩 [bn](../../../bn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇿 [cs](../../../cs/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇰 [da](../../../da/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇪 [de](../../../de/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇷 [el](../../../el/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇸 [es](../../../es/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇪 [et](../../../et/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇷 [fa](../../../fa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇮 [fi](../../../fi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇷 [fr](../../../fr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇪 [ga](../../../ga/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [gu](../../../gu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ha](../../../ha/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇱 [he](../../../he/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [hi](../../../hi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇷 [hr](../../../hr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇺 [hu](../../../hu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇲 [hy](../../../hy/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇩 [id](../../../id/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ig](../../../ig/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇹 [it](../../../it/docs/routing/SUBSCRIPTION_LADDER.md) · 🇯🇵 [ja](../../../ja/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇪 [ka](../../../ka/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇭 [km](../../../km/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [kn](../../../kn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇷 [ko](../../../ko/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇹 [lt](../../../lt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇻 [lv](../../../lv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ml](../../../ml/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [mr](../../../mr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇾 [ms](../../../ms/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇹 [mt](../../../mt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇲 [my](../../../my/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇵 [ne](../../../ne/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇱 [nl](../../../nl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇴 [no](../../../no/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [or](../../../or/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [pa](../../../pa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇭 [phi](../../../phi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇱 [pl](../../../pl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇹 [pt](../../../pt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇴 [ro](../../../ro/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇺 [ru](../../../ru/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇰 [si](../../../si/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇰 [sk](../../../sk/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇮 [sl](../../../sl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇸 [sr](../../../sr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇪 [sw](../../../sw/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ta](../../../ta/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [te](../../../te/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇭 [th](../../../th/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇷 [tr](../../../tr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇰 [ur](../../../ur/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇿 [uz](../../../uz/docs/routing/SUBSCRIPTION_LADDER.md) · 🇻🇳 [vi](../../../vi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [yo](../../../yo/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/SUBSCRIPTION_LADDER.md)

---

> Två nya `auto/*`-id:n — `auto/subscription` och `auto/thrifty`. Båda är opt-in genom att
> uttryckligen begäras: inget dirigeras genom dem om inte en anropare begär id:t med namn, och inga
> befintliga pooler, strategier eller standardvärden ändras.

## Varför detta finns

OmniRoute besvarar redan två kostnadsfrågor, men ingen av dem är den som de flesta operatörer ställer.

| Befintlig mekanism                                       | Besvarar                                          |
| -------------------------------------------------------- | ------------------------------------------------- |
| `hidePaidModels` (`autoCombo/paidModelFilter.ts`)        | "är den här modellen katalogiserad som gratis?"   |
| `freeAccessPolicy: "strict"` (`strictZeroCostFilter.ts`) | "kan den här anslutningen någonsin debitera mig?" |
| `quotaPreflight` (`combo/quotaExhaustionCutoff.ts`)      | "är den här anslutningen nära sin gräns?"         |
| `budgetCap` / `budgetFallback` (`autoCombo/engine.ts`)   | "begränsa utgifterna, nedgradera till billigast"  |

Varje mekanism som endast tillåter gratisalternativ **stänger vid osäkerhet** — en förbrukad
gratiskvot innebär en tom pool, aldrig en upptrappning till ett betalalternativ — och varje
mekanism på betalsidan är nivåoberoende. Ingen av dem besvarar:

> "Använd kvoten som jag redan betalar för. När den tar slut ska du antingen stoppa eller trappa
> upp ett steg i taget genom de billigaste betalalternativen — och återgå så fort den återställs."

## Debitering är ett anslutningsfaktum, inte ett modellfaktum

`classifyTier()` (`open-sse/services/tierResolver.ts`) använder `(provider, model)` som nyckel och
returnerar `free | cheap | premium` utifrån katalogprissättningen. Men huruvida en begäran medför en
inkrementell kostnad beror på **vilken anslutning som hanterar den**: samma modell ingår i abonnemanget
via en Claude Code OAuth-anslutning och debiteras per token via en API-nyckelanslutning.

`provider_connections.auth_type` är inte en säker indikator i någon riktning — avgiftsmätta
OAuth-anslutningar finns, och det finns API-nyckelanslutningar som ingår i abonnemang (en Copilot-
plats-token är inte en avgiftsmätt API-nyckel). Därför kommer debiteringsklassen från en **manuellt
underhållen katalog**, `open-sse/config/connectionBillingCatalog.ts`, som ställs in manuellt utifrån
varje leverantörs publicerade villkor — samma mönster som `FreeModelBudget.hardStopGuaranteed` redan
har etablerat för gratismodeller.

```ts
type ConnectionBillingClass = "subscription" | "metered" | "keyless" | "unknown";
type ConnectionOverageBehavior = "hard-stop" | "meters-to-paid" | "unknown";
```

Uppslagsordning (`autoCombo/connectionBilling.ts`): den syntetiska sentinelposten utan autentisering →
`keyless`; en katalogpost som matchar både leverantör **och** `authType`; en leverantörsomfattande post;
annars `unknown`. **Ej katalogiserat är inte gratis** — `unknown` behandlas som `metered`
överallt, så en leverantör som läggs till i morgon börjar utanför abonnemangsnivån och måste
avsiktligt läggas till i katalogen.

## Nivåstegsmodellen

Fem nivåsteg i upptrappningsordning. De skiljer sig åt i mer än pris — vart och ett har sin **egen**
uttömningssignal, vilket är anledningen till att detta inte bara är en sortering.

| #   | Nivåsteg       | Medlemskap                                             | Uttömt när                        |
| --- | -------------- | ------------------------------------------------------ | --------------------------------- |
| 0   | `subscription` | katalogiserad `billing: "subscription"`                | kvotfönstret är vid/under gränsen |
| 1   | `keyless`      | den syntetiska sökvägen utan autentisering             | anslutningens vänteläge/brytare   |
| 2   | `free`         | avgiftsmätt anslutning, `classifyTier() === "free"`    | gratisutrymmet är förbrukat       |
| 3   | `cheap`        | avgiftsmätt anslutning, `classifyTier() === "cheap"`   | nivåstegets budget är förbrukad   |
| 4   | `premium`      | avgiftsmätt anslutning, `classifyTier() === "premium"` | nivåstegets budget är förbrukad   |

Nivåsteg 0–2 uttöms baserat på **kvot**, vilket är observerbart och redan spåras. Nivåsteg 3–4 har
ingen kvot — en betalanslutning fortsätter att hantera begäranden för alltid — så deras enda rimliga
uttömningssignal är en **budget** per nivåsteg. Utan en sådan finns ingen utlösare för
"trappa upp när den billiga nivån är uttömd".

## `auto/subscription` — stäng vid osäkerhet

Pool = endast nivå 0, begränsad till anslutningar vars överförbrukning är ett dokumenterat `hard-stop` och som var och en har verifierats i realtid ha kvarvarande kvotutrymme. Allt tvetydigt utesluts: en leverantör som inte har granskats, en kvotavläsning som inte kan verifieras, en inaktuell avläsning eller överförbrukning som debiteras.

En tom pool är det **avsedda** resultatet, inte ett fel — anroparens befintliga sökväg för tomma pooler omvandlar detta till ett tydligt fel i stället för en tyst, debiterbar reservlösning. Det är hela löftet med id:t.

`keyless` kvalificerar sig avsiktligt **inte**: den här grupperingen betyder ”abonnemanget jag betalar för”, så en backend utan autentisering hör inte hemma i den. Använd `auto/thrifty` (eller `auto/best-free`) för detta.

### Anslutningssäkerhet

En kandidat är inte alltid knuten till en enda anslutning — en logisk kandidat har en tillåtelselista i `allowedConnectionIds`, och kontot som faktiskt används väljs senare, vid distribueringen, av `open-sse/services/combo/autoStrategy.ts`. Båda grupperingarna verifierar därför **varje anslutning individuellt** och skriver om `allowedConnectionIds` till exakt den delmängd som klarade verifieringen — aldrig hela den ursprungliga listan och aldrig en godtyckligt vald medlem. Eftersom `autoStrategy.ts` redan tillämpar denna matris som en strikt tillåtelselista blir ”verifierad” och ”faktiskt använd” samma mängd genom konstruktion när den skrivs om här. Detta är samma invariant och samma resonemang som i [STRICT_ZERO_COST](./STRICT_ZERO_COST.md).

## `auto/thrifty` — eskalera en nivå i taget

Pool = alla nivåer, ordnade efter nivåindex, där kandidater med förbrukad kvot filtreras bort. `auto`-motorn poängsätter fortfarande **inom** den kvarvarande poolen: stegen avgör vilka nivåer som är aktuella, och poängsättningen avgör vilken kandidat som vinner inom dem. Ordningen är stabil inom en nivå, så poängsättarens egen rangordning ändras aldrig av detta överlägg.

Detta är ett överlägg för ordning + filtrering, **inte** en ny dispatcher: den spekulativa loopen i `combo.ts` går redan igenom målen i ordning och fortsätter till nästa vid fel, så en kvotförbrukning under körning som förhandskontrollen inte upptäckte leder ändå till eskalering till nästa nivå inom samma begäran.

Där `auto/subscription` stänger vid osäkerhet är `auto/thrifty` **öppen** vid osäkerhet: en anslutning som ingår i abonnemanget och saknar en användbar kvotavläsning provas fortfarande först. Att prova den kostar ingenting, och om den visar sig ha förbrukat sin kvot fortsätter flödet ändå till nästa nivå — medan en vägran att prova den skulle skicka begäran till en betald nivå när telemetri saknas, vilket är exakt det resultat som grupperingen är avsedd att undvika.

## Återgång till abonnemanget efter en återställning

Tre oberoende saker måste löpa ut innan routningen återgår till nivå 0. Om bara en åtgärdas fastnar stegen på betalda nivåer långt efter att abonnemanget har fyllts på.

1. **Kvottillståndscachen** — `freeAccessQuota.ts` cachar per `(provider, connection)` med en TTL på
   180 s. En cachad post vars eget `resetAt` redan har passerat beskriver ett fönster som inte
   längre finns, så den behandlas nu som inaktuell **oavsett ålder** och framtvingar en uppdatering.
   Utan detta fortsätter ett abonnemang som fylldes på vid midnatt att visas som förbrukat tills TTL:n
   råkar löpa ut.
2. **Stegens eget tillstånd** — det finns inget, avsiktligt. Nivåernas behörighet beräknas om från
   aktuellt kvottillstånd varje gång poolen byggs; det finns ingen beständig post om ”för närvarande
   på nivå 3” som skulle kunna överleva en återställning och låsa routningen.
3. **Anslutningens väntetid** — det förbrukande 429-felet ställer in `rateLimitedUntil` utifrån
   exponentiell återgång, vilket för en abonnemangsanslutning kan sträcka sig förbi den verkliga
   återställningen. `clampCooldownToReset()` (`subscriptionLadder.ts`) begränsar en väntetid till
   uppströmskällans egen återställningstidpunkt och kan aldrig förlänga den. **Den är implementerad
   och testad men ännu inte inkopplad**: kvotcachen invalideras i `src/sse/services/auth.ts` _innan_
   någon väntetid skrivs, så `resetAt` måste registreras tidigare i den funktionen — en ändring i
   den kritiska resilienssökvägen som hör hemma i en egen granskad PR. Fram till dess väntar
   återinträdet ut anslutningens väntetid (som redan föredrar uppströmskällans `Retry-After`-tips
   när leverantören skickar dem).

### Fladdringsskydd

En nivå som just har återställts tillåts återinträda först över `reentryMinRemainingPercent` (standardvärde 5), medan en anslutning som redan används bara behöver ligga kvar över `exitCutoffPercent` (standardvärde 2, vilket motsvarar `quotaPreflight.defaultThresholdPercent`). Skillnaden är hysteresbandet — utan det skulle en anslutning som pendlar kring gränsvärdet växla mellan nivåer vid efterföljande begäranden.

## Konfiguration

Endast finjustering. Det finns avsiktligt **ingen** `enabled`-flagga: en växel som kan stänga av dessa
skulle innebära att `auto/subscription` obemärkt använder hela poolen — inklusive betalda modeller — under ett
namn som utlovar motsatsen.

```jsonc
{
  "subscriptionLadder": {
    "exitCutoffPercent": 2,
    "reentryMinRemainingPercent": 5,
    "rungBudgetUsd": { "cheap": 5.0, "premium": 0 }, // 0 inaktiverar ett steg helt
  },
}
```

Budgetbegränsningen är inaktiv tills en utgiftsresolver har kopplats in: när ingen redovisning är tillgänglig sorteras ett betalt
steg in, men begränsas aldrig. Från och med v3.8.51 accepteras inställningen `rungBudgetUsd` av
schemat men tillämpas ännu INTE — betrakta den som reserverad konfiguration, inte som ett aktivt utgiftstak. Stegordning, kvotbaserad uttömning och återinträde efter återställning
fungerar utan den.

## Sammansättning

`subscription` och `thrifty` är `AutoTier`-värden, så de kan kombineras med varje kategori:
`auto/coding:thrifty`, `auto/reasoning:subscription` och så vidare. De två platta id:na
(`auto/subscription`, `auto/thrifty`) visas i `/v1/models` och på instrumentpanelen.

Inget av id:na tillhör en betalnivå, så `isPaidTierAutoId()` returnerar `false` för båda och
`auto/subscription` finns kvar när `hidePaidModels` används.

## Var koden finns

| Område                                    | Fil                                                 |
| ----------------------------------------- | --------------------------------------------------- |
| Handplockade faktureringsfakta            | `open-sse/config/connectionBillingCatalog.ts`       |
| Klassificerare                            | `open-sse/services/autoCombo/connectionBilling.ts`  |
| Steg, båda grupperingarna, återinträde    | `open-sse/services/autoCombo/subscriptionLadder.ts` |
| Inkoppling i kandidatpoolen               | `open-sse/services/autoCombo/virtualFactory.ts`     |
| Återställningsmedveten cache-inaktualitet | `open-sse/services/autoCombo/freeAccessQuota.ts`    |
| Nivågränssnitt                            | `open-sse/services/autoCombo/suffixComposition.ts`  |
| Visade id:n                               | `open-sse/services/autoCombo/builtinCatalog.ts`     |
| Tester                                    | `tests/unit/autoCombo/subscription-ladder.test.ts`  |
