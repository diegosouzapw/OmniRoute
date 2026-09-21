# Subscription-first routing (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/SUBSCRIPTION_LADDER.md) · 🇪🇹 [am](../../../am/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇦 [ar](../../../ar/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇿 [az](../../../az/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇬 [bg](../../../bg/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇩 [bn](../../../bn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇿 [cs](../../../cs/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇰 [da](../../../da/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇪 [de](../../../de/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇷 [el](../../../el/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇸 [es](../../../es/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇪 [et](../../../et/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇷 [fa](../../../fa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇮 [fi](../../../fi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇷 [fr](../../../fr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇪 [ga](../../../ga/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [gu](../../../gu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ha](../../../ha/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇱 [he](../../../he/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [hi](../../../hi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇷 [hr](../../../hr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇺 [hu](../../../hu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇲 [hy](../../../hy/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇩 [id](../../../id/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ig](../../../ig/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇹 [it](../../../it/docs/routing/SUBSCRIPTION_LADDER.md) · 🇯🇵 [ja](../../../ja/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇪 [ka](../../../ka/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇭 [km](../../../km/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [kn](../../../kn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇷 [ko](../../../ko/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇹 [lt](../../../lt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ml](../../../ml/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [mr](../../../mr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇾 [ms](../../../ms/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇹 [mt](../../../mt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇲 [my](../../../my/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇵 [ne](../../../ne/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇱 [nl](../../../nl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇴 [no](../../../no/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [or](../../../or/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [pa](../../../pa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇭 [phi](../../../phi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇱 [pl](../../../pl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇹 [pt](../../../pt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇴 [ro](../../../ro/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇺 [ru](../../../ru/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇰 [si](../../../si/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇰 [sk](../../../sk/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇮 [sl](../../../sl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇸 [sr](../../../sr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇪 [sv](../../../sv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇪 [sw](../../../sw/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ta](../../../ta/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [te](../../../te/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇭 [th](../../../th/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇷 [tr](../../../tr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇰 [ur](../../../ur/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇿 [uz](../../../uz/docs/routing/SUBSCRIPTION_LADDER.md) · 🇻🇳 [vi](../../../vi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [yo](../../../yo/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/SUBSCRIPTION_LADDER.md)

---

> Divi jauni `auto/*` identifikatori — `auto/subscription` un `auto/thrifty`. Abi ir jāpieprasa
> tieši: nekas netiek maršrutēts caur tiem, ja vien izsaucējs nepieprasa identifikatoru pēc nosaukuma,
> un netiek mainīts neviens esošais pūls, stratēģija vai noklusējuma iestatījums.

## Kāpēc tas ir vajadzīgs

OmniRoute jau atbild uz diviem ar izmaksām saistītiem jautājumiem, taču neviens no tiem nav tas,
ko uzdod lielākā daļa operatoru.

| Esošais mehānisms                                        | Atbild uz jautājumu                                  |
| -------------------------------------------------------- | ---------------------------------------------------- |
| `hidePaidModels` (`autoCombo/paidModelFilter.ts`)        | "vai šis modelis katalogā ir norādīts kā bezmaksas?" |
| `freeAccessPolicy: "strict"` (`strictZeroCostFilter.ts`) | "vai šis savienojums vispār var radīt izmaksas?"     |
| `quotaPreflight` (`combo/quotaExhaustionCutoff.ts`)      | "vai šis savienojums tuvojas savam limitam?"         |
| `budgetCap` / `budgetFallback` (`autoCombo/engine.ts`)   | "ierobežot tēriņus, pāriet uz lētāko variantu"       |

Katrs tikai bezmaksas iespējas izmantojošais mehānisms **kļūmes gadījumā bloķē piekļuvi** —
izsmelts bezmaksas pūls ir tukšs pūls, un nekad nenotiek pāreja uz maksas opciju —, savukārt
katrs maksas puses mehānisms neņem vērā līmeņus. Neviens no tiem neatbild:

> "Izmanto kvotu, par kuru es jau maksāju. Kad tā beidzas, vai nu apstājies, vai pakāpeniski
> pārej par vienu līmeni augstāk, izmantojot lētākās maksas opcijas, — un atgriezies, tiklīdz
> kvota tiek atiestatīta."

## Norēķinu veids ir savienojuma, nevis modeļa īpašība

`classifyTier()` (`open-sse/services/tierResolver.ts`) izmanto `(provider, model)` kā atslēgu un
atgriež `free | cheap | premium`, pamatojoties uz kataloga cenām. Taču tas, vai pieprasījums rada
papildu izmaksas, ir atkarīgs no tā, **kurš savienojums to apkalpo**: tas pats modelis ir iekļauts
plānā, ja tiek izmantots Claude Code OAuth savienojums, bet API atslēgas savienojumā par to tiek
piestādīts rēķins par katru marķieri.

`provider_connections.auth_type` nav drošs aizstājējrādītājs nevienā virzienā — pastāv OAuth
savienojumi ar uzskaiti pēc patēriņa, kā arī plānā iekļauti API atslēgas savienojumi (Copilot
lietotāja licences pilnvara nav API atslēga ar uzskaiti pēc patēriņa). Tādēļ norēķinu klase tiek
ņemta no **manuāli uzturēta kataloga** `open-sse/config/connectionBillingCatalog.ts`, kas iestatīts
manuāli, pamatojoties uz katra nodrošinātāja publicētajiem noteikumiem — tas ir tas pats modelis,
ko `FreeModelBudget.hardStopGuaranteed` jau ieviesa bezmaksas modeļiem.

```ts
type ConnectionBillingClass = "subscription" | "metered" | "keyless" | "unknown";
type ConnectionOverageBehavior = "hard-stop" | "meters-to-paid" | "unknown";
```

Noteikšanas secība (`autoCombo/connectionBilling.ts`): sintētiskais bezautentifikācijas
marķieris → `keyless`; kataloga ieraksts, kas atbilst nodrošinātājam **un** `authType`;
nodrošinātāja līmeņa ieraksts; pretējā gadījumā `unknown`. **Katalogā neiekļauts nenozīmē
bezmaksas** — `unknown` visur tiek apstrādāts kā `metered`, tāpēc rīt pievienots nodrošinātājs
sāk ārpus abonementa līmeņa un ir apzināti jāiekļauj katalogā.

## Līmeņu modelis

Pieci līmeņi eskalācijas secībā. Tie atšķiras ne tikai pēc cenas — katram ir **savs**
izsmelšanas signāls, tāpēc šī nav tikai kārtošana.

| #   | Līmenis        | Piederība                                               | Izsmelts, kad                                                |
| --- | -------------- | ------------------------------------------------------- | ------------------------------------------------------------ |
| 0   | `subscription` | manuāli norādīts `billing: "subscription"`              | kvotas logs sasniedzis robežvērtību vai ir zem tās           |
| 1   | `keyless`      | sintētiskais bezautentifikācijas ceļš                   | savienojuma nogaidīšanas periods / automātiskais pārtraucējs |
| 2   | `free`         | savienojums ar uzskaiti, `classifyTier() === "free"`    | bezmaksas limits ir izsmelts                                 |
| 3   | `cheap`        | savienojums ar uzskaiti, `classifyTier() === "cheap"`   | līmeņa budžets ir iztērēts                                   |
| 4   | `premium`      | savienojums ar uzskaiti, `classifyTier() === "premium"` | līmeņa budžets ir iztērēts                                   |

Līmeņi 0–2 tiek izsmelti, sasniedzot **kvotu**, kas ir novērojama un jau tiek uzskaitīta.
Līmeņiem 3–4 nav kvotas — maksas savienojums var apkalpot bezgalīgi —, tāpēc vienīgais
saprātīgais izsmelšanas signāls ir katram līmenim noteikts **budžets**. Bez tā nosacījumam
"eskalēt, kad lētais līmenis ir izsmelts" nav aktivizēšanas signāla.

## `auto/subscription` — kļūmes gadījumā slēgts

Kopa = tikai 0. pakāpiens, ierobežots līdz savienojumiem, kuru limita pārsniegšana ir dokumentēta kā `hard-stop` un kuriem tiešsaistē ir pārbaudīta kvotas rezerve. Viss neskaidrais tiek izslēgts: nekūrēts pakalpojumu sniedzējs, nepārbaudāms kvotas rādījums, novecojis rādījums vai limita pārsniegšana, par kuru tiek aprēķināta maksa.

Tukša kopa ir **paredzētais** rezultāts, nevis defekts — izsaucēja esošais tukšas kopas apstrādes ceļš to pārvērš skaidrā kļūdā, nevis klusā rezerves variantā, par kuru var tikt iekasēta maksa. Tas ir viss, ko sola šis id.

`keyless` apzināti **neatbilst** kritērijiem: šis grupējums nozīmē „plāns, par kuru es maksāju”, tāpēc aizmugursistēma bez autentifikācijas tajā neiederas. Šim nolūkam izmantojiet `auto/thrifty` (vai `auto/best-free`).

### Savienojumu drošība

Kandidāts ne vienmēr ir piesaistīts vienam savienojumam — loģiskam kandidātam ir atļauto savienojumu saraksts `allowedConnectionIds`, un faktiski izmantotais konts tiek izvēlēts vēlāk, nosūtīšanas laikā, failā `open-sse/services/combo/autoStrategy.ts`. Tādēļ abi grupējumi pārbauda **katru savienojumu atsevišķi** un pārraksta `allowedConnectionIds`, atstājot tieši izdzīvojušo apakškopu — nekad ne pilnu sākotnējo sarakstu un nekad ne vienu patvaļīgi izvēlētu elementu. Tā kā `autoStrategy.ts` jau piemēro šo masīvu kā stingru atļauto elementu sarakstu, tā pārrakstīšana šeit pēc konstrukcijas nodrošina, ka „pārbaudītā” un „faktiski izmantotā” kopa ir viena un tā pati. Tas ir tas pats invariants un tas pats pamatojums, kas aprakstīts sadaļā [STRICT_ZERO_COST](./STRICT_ZERO_COST.md).

## `auto/thrifty` — pārejiet augstāk pa vienam pakāpienam

Kopa = visi pakāpieni, sakārtoti pēc pakāpiena indeksa, izslēdzot izsmeltos kandidātus. `auto` dzinis joprojām vērtē kandidātus **izdzīvojušās kopas ietvaros**: kāpnes nosaka, kuri pakāpieni tiek izmantoti, bet vērtēšana nosaka, kurš kandidāts tajos uzvar. Kārtība viena pakāpiena ietvaros ir stabila, tāpēc šis pārklājums nekad nepārkārto paša vērtētāja ranžējumu.

Šis ir kārtošanas un atlases pārklājums, **nevis** jauns dispečers: `combo.ts` spekulatīvais cikls jau secīgi apstaigā mērķus un kļūmes gadījumā pāriet pie nākamā, tādēļ izpildlaikā konstatēta izsmelšana, kuru sākotnējā pārbaude neuztvēra, tā paša pieprasījuma ietvaros tik un tā izraisa pāreju uz nākamo pakāpienu.

Kamēr `auto/subscription` kļūmes gadījumā ir **slēgts**, `auto/thrifty` kļūmes gadījumā ir **atvērts**: plānā iekļauts savienojums bez izmantojama kvotas rādījuma tik un tā tiek izmēģināts pirmais. Tā izmēģināšana neko nemaksā, un, ja izrādās, ka tas ir izsmelts, pārejas mehānisms tik un tā sasniedz nākamo pakāpienu. Savukārt atteikšanās to izmēģināt trūkstošas telemetrijas dēļ novirzītu pieprasījumu uz maksas pakāpienu — tieši to iznākumu, kura novēršanai šis grupējums pastāv.

## Atgriešanās pie plāna pēc atiestatīšanas

Pirms maršrutēšana atgriežas 0. pakāpienā, jābeidzas trīs savstarpēji neatkarīgām lietām. Izlabojot tikai vienu no tām, kāpnes paliek iestrēgušas maksas pakāpienos vēl ilgi pēc plāna atjaunošanas.

1. **Kvotas stāvokļa kešatmiņa** — `freeAccessQuota.ts` kešo datus katram `(provider, connection)` pārim ar 180 sekunžu TTL. Kešatmiņas ieraksts, kura paša `resetAt` laiks jau ir pagājis, apraksta logu, kas vairs nepastāv, tādēļ tas tagad tiek uzskatīts par novecojušu **neatkarīgi no vecuma** un piespiež veikt atsvaidzināšanu. Bez tā plāns, kas atjaunots pusnaktī, joprojām tiktu uzskatīts par izsmeltu, līdz nejauši beigtos TTL.
2. **Pašu kāpņu stāvoklis** — tāda nav pēc konstrukcijas. Pakāpienu atbilstība tiek pārrēķināta no aktuālā kvotas stāvokļa ikreiz, kad tiek veidota kopa; nepastāv saglabāts ieraksts „pašlaik 3. pakāpienā”, kas varētu pārdzīvot atiestatīšanu un iestrēdināt maršrutēšanu.
3. **Savienojuma nogaidīšanas periods** — izsmelšanu izraisošais 429 iestata `rateLimitedUntil`, izmantojot eksponenciālu gaidīšanas intervāla palielināšanu, kas plāna savienojumam var pārsniegt faktisko atiestatīšanas laiku. `clampCooldownToReset()` (`subscriptionLadder.ts`) saīsina nogaidīšanas periodu līdz augšupējā pakalpojuma paša atiestatīšanas brīdim un nekad nevar to pagarināt. **Tas ir ieviests un testēts, bet vēl nav pieslēgts**: kvotas kešatmiņa failā `src/sse/services/auth.ts` tiek invalidēta _pirms_ jebkāda nogaidīšanas perioda ierakstīšanas, tāpēc `resetAt` šajā funkcijā jāiegūst agrāk — tās ir izmaiņas noturības kritiskajā izpildes ceļā, kurām jābūt atsevišķā, pārskatītā PR. Līdz tam atkārtota iekļaušana gaida savienojuma nogaidīšanas perioda beigas (tas jau dod priekšroku augšupējā pakalpojuma `Retry-After` norādēm, ja pakalpojumu sniedzējs tās nosūta).

### Svārstību novēršana

Tikko atiestatīts pakāpiens tiek atkārtoti iekļauts tikai tad, ja tā atlikums pārsniedz `reentryMinRemainingPercent` (pēc noklusējuma 5), savukārt jau izmantotam savienojumam tikai jāpaliek virs `exitCutoffPercent` (pēc noklusējuma 2, kas atbilst `quotaPreflight.defaultThresholdPercent`). Atstarpe starp tiem ir histerēzes josla — bez tās savienojums, kura rādījums svārstās ap robežvērtību, secīgos pieprasījumos pārslēgtos starp pakāpieniem.

## Konfigurācija

Tikai precizēšanai. Apzināti **nav** karoga `enabled`: slēdzis, ar kuru šīs iespējas varētu izslēgt,
ļautu `auto/subscription` nemanāmi turpināt izmantot visu kopu — tostarp maksas modeļus — ar
nosaukumu, kas sola pretējo.

```jsonc
{
  "subscriptionLadder": {
    "exitCutoffPercent": 2,
    "reentryMinRemainingPercent": 5,
    "rungBudgetUsd": { "cheap": 5.0, "premium": 0 }, // 0 pilnībā atspējo pakāpienu
  },
}
```

Budžeta ierobežošana nedarbojas, kamēr nav pieslēgts izdevumu noteicējs: ja uzskaites dati nav
pieejami, maksas pakāpiens tiek iekļauts secībā, bet nekad netiek ierobežots. Sākot ar v3.8.51,
shēma pieņem iestatījumu `rungBudgetUsd`, taču tas vēl NETIEK piemērots — uzskatiet to par
rezervētu konfigurāciju, nevis aktīvu izdevumu ierobežojumu. Pakāpienu secība, uz kvotu balstīta
izsmelšana un atkārtota iekļaušana pēc atiestatīšanas darbojas arī bez tā.

## Kompozīcija

`subscription` un `thrifty` ir `AutoTier` vērtības, tāpēc tās var kombinēt ar jebkuru kategoriju:
`auto/coding:thrifty`, `auto/reasoning:subscription` un tā tālāk. Abi vienkāršie ID
(`auto/subscription`, `auto/thrifty`) tiek publicēti `/v1/models` un informācijas panelī.

Neviens no šiem ID nepieder maksas līmenim, tāpēc `isPaidTierAutoId()` abiem atgriež `false`, un
`auto/subscription` paliek pieejams, ja ir aktivizēts `hidePaidModels`.

## Koda atrašanās vietas

| Aspekts                                         | Fails                                               |
| ----------------------------------------------- | --------------------------------------------------- |
| Atlasītie norēķinu fakti                        | `open-sse/config/connectionBillingCatalog.ts`       |
| Klasifikators                                   | `open-sse/services/autoCombo/connectionBilling.ts`  |
| Pakāpieni, abi grupējumi, atkārtota ieeja       | `open-sse/services/autoCombo/subscriptionLadder.ts` |
| Savienošana ar kandidātu kopu                   | `open-sse/services/autoCombo/virtualFactory.ts`     |
| Atiestatīšanu ņemoša vērā kešatmiņas novecošana | `open-sse/services/autoCombo/freeAccessQuota.ts`    |
| Līmeņu saskarne                                 | `open-sse/services/autoCombo/suffixComposition.ts`  |
| Publicētie ID                                   | `open-sse/services/autoCombo/builtinCatalog.ts`     |
| Testi                                           | `tests/unit/autoCombo/subscription-ladder.test.ts`  |
