# Subscription-first routing (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/SUBSCRIPTION_LADDER.md) · 🇪🇹 [am](../../../am/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇦 [ar](../../../ar/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇿 [az](../../../az/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇬 [bg](../../../bg/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇩 [bn](../../../bn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇿 [cs](../../../cs/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇰 [da](../../../da/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇪 [de](../../../de/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇷 [el](../../../el/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇸 [es](../../../es/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇪 [et](../../../et/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇷 [fa](../../../fa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇮 [fi](../../../fi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇷 [fr](../../../fr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇪 [ga](../../../ga/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [gu](../../../gu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ha](../../../ha/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇱 [he](../../../he/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [hi](../../../hi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇷 [hr](../../../hr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇺 [hu](../../../hu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇲 [hy](../../../hy/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇩 [id](../../../id/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ig](../../../ig/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇹 [it](../../../it/docs/routing/SUBSCRIPTION_LADDER.md) · 🇯🇵 [ja](../../../ja/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇪 [ka](../../../ka/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇭 [km](../../../km/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [kn](../../../kn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇷 [ko](../../../ko/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇻 [lv](../../../lv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ml](../../../ml/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [mr](../../../mr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇾 [ms](../../../ms/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇹 [mt](../../../mt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇲 [my](../../../my/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇵 [ne](../../../ne/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇱 [nl](../../../nl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇴 [no](../../../no/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [or](../../../or/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [pa](../../../pa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇭 [phi](../../../phi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇱 [pl](../../../pl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇹 [pt](../../../pt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇴 [ro](../../../ro/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇺 [ru](../../../ru/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇰 [si](../../../si/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇰 [sk](../../../sk/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇮 [sl](../../../sl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇸 [sr](../../../sr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇪 [sv](../../../sv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇪 [sw](../../../sw/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ta](../../../ta/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [te](../../../te/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇭 [th](../../../th/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇷 [tr](../../../tr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇰 [ur](../../../ur/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇿 [uz](../../../uz/docs/routing/SUBSCRIPTION_LADDER.md) · 🇻🇳 [vi](../../../vi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [yo](../../../yo/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/SUBSCRIPTION_LADDER.md)

---

> Du nauji `auto/*` ID — `auto/subscription` ir `auto/thrifty`. Abu aktyvuojami tik pateikus
> užklausą: per juos niekas nemaršrutizuojama, nebent kvietėjas paprašo ID pagal pavadinimą, ir
> joks esamas telkinys, strategija ar numatytoji nuostata nesikeičia.

## Kodėl tai reikalinga

OmniRoute jau atsako į du klausimus apie sąnaudas, tačiau nė vienas iš jų nėra tas, kurį užduoda dauguma operatorių.

| Esamas mechanizmas                                       | Į kokį klausimą atsako                                |
| -------------------------------------------------------- | ----------------------------------------------------- |
| `hidePaidModels` (`autoCombo/paidModelFilter.ts`)        | „ar šiame kataloge modelis nurodytas kaip nemokamas?“ |
| `freeAccessPolicy: "strict"` (`strictZeroCostFilter.ts`) | „ar šis ryšys apskritai gali būti apmokestintas?“     |
| `quotaPreflight` (`combo/quotaExhaustionCutoff.ts`)      | „ar šis ryšys artėja prie savo ribos?“                |
| `budgetCap` / `budgetFallback` (`autoCombo/engine.ts`)   | „apriboti išlaidas, pereiti prie pigiausio varianto“  |

Kiekvienas tik nemokamus variantus naudojantis mechanizmas **užsidaro nesėkmės atveju** — išnaudotas nemokamas telkinys tampa tuščiu telkiniu, o ne priežastimi pereiti prie mokamo varianto — ir kiekvienas mokamiems variantams skirtas mechanizmas neatsižvelgia į pakopas. Nė vienas neatsako:

> „Naudok kvotą, už kurią jau moku. Kai ji baigsis, arba sustok, arba po vieną pakopą pereik
> prie pigiausių mokamų variantų — ir grįžk, kai tik kvota bus atnaujinta.“

## Apmokestinimas yra ryšio, o ne modelio savybė

`classifyTier()` (`open-sse/services/tierResolver.ts`) naudoja `(provider, model)` kaip raktą ir pagal katalogo kainodarą grąžina
`free | cheap | premium`. Tačiau tai, ar užklausa kainuoja papildomai, priklauso nuo to, **kuris ryšys ją aptarnauja**: tas pats modelis per Claude Code
OAuth ryšį yra įtrauktas į planą, o per API rakto ryšį apmokestinamas pagal žetonų skaičių.

`provider_connections.auth_type` nėra patikimas pakaitinis rodiklis nė viena kryptimi — egzistuoja
pagal naudojimą apmokestinami OAuth ryšiai ir į planą įtraukti API rakto ryšiai (Copilot licencijos vietos prieigos raktas nėra
pagal naudojimą apmokestinamas API raktas). Todėl apmokestinimo klasė nustatoma pagal **kuruojamą katalogą**,
`open-sse/config/connectionBillingCatalog.ts`, rankiniu būdu sudarytą pagal kiekvieno teikėjo paskelbtas sąlygas —
tai tas pats principas, kurį nemokamiems modeliams jau įtvirtino `FreeModelBudget.hardStopGuaranteed`.

```ts
type ConnectionBillingClass = "subscription" | "metered" | "keyless" | "unknown";
type ConnectionOverageBehavior = "hard-stop" | "meters-to-paid" | "unknown";
```

Nustatymo tvarka (`autoCombo/connectionBilling.ts`): sintetinis autentifikavimo nereikalaujantis kontrolinis įrašas →
`keyless`; katalogo įrašas, atitinkantis teikėją **ir** `authType`; visam teikėjui taikomas įrašas;
kitu atveju — `unknown`. **Nekuruojamas nereiškia nemokamo** — `unknown` visur traktuojamas kaip `metered`,
todėl rytoj pridėtas teikėjas iš pradžių nepatenka į prenumeratos pakopą ir turi būti sąmoningai įtrauktas į katalogą.

## Pakopų modelis

Penkios pakopos eskalavimo tvarka. Jos skiriasi ne tik kaina — kiekviena turi **atskirą**
išnaudojimo signalą, todėl tai nėra vien tik rikiavimas.

| #   | Pakopa         | Narystės sąlyga                                                      | Kada laikoma išnaudota                               |
| --- | -------------- | -------------------------------------------------------------------- | ---------------------------------------------------- |
| 0   | `subscription` | kuruojamas `billing: "subscription"`                                 | kvotos langas ties riba arba žemiau jos              |
| 1   | `keyless`      | sintetinis autentifikavimo nereikalaujantis kelias                   | ryšio atvėsimo laikotarpis / grandinės pertraukiklis |
| 2   | `free`         | pagal naudojimą apmokestinamas ryšys, `classifyTier() === "free"`    | išnaudota nemokama kvota                             |
| 3   | `cheap`        | pagal naudojimą apmokestinamas ryšys, `classifyTier() === "cheap"`   | išnaudotas pakopos biudžetas                         |
| 4   | `premium`      | pagal naudojimą apmokestinamas ryšys, `classifyTier() === "premium"` | išnaudotas pakopos biudžetas                         |

0–2 pakopos išnaudojamos pagal **kvotą**, kuri yra stebima ir jau sekama. 3–4 pakopos kvotos neturi
— mokamas ryšys gali aptarnauti neribotai — todėl vienintelis prasmingas jų išnaudojimo signalas yra kiekvienai pakopai skirtas
**biudžetas**. Be jo nuostata „eskaluoti, kai pigi pakopa išnaudota“ neturi aktyvavimo sąlygos.

## `auto/subscription` — saugus uždarasis režimas

Telkinys = tik 0 pakopa, apribota jungtimis, kurių kvotos viršijimas dokumentuotas kaip `hard-stop` ir kurių kiekviena realiuoju laiku patikrinta, ar turi kvotos rezervą. Viskas, kas neaišku, neįtraukiama: nekuruojamas teikėjas, nepatikrinamas kvotos rodmuo, pasenęs rodmuo arba viršijimas, už kurį skaičiuojamas mokestis.

Tuščias telkinys yra **numatytas** rezultatas, o ne defektas — esama kvietėjo tuščio telkinio apdorojimo eiga paverčia jį aiškia klaida, užuot tyliai pasirinkusi apmokestinamą atsarginį variantą. Tai ir yra visas šio id pažadas.

`keyless` sąmoningai **neatitinka** kriterijų: ši grupė reiškia „planą, už kurį moku“, todėl autentifikavimo nereikalaujanti galinė sistema jai nepriklauso. Tam naudokite `auto/thrifty` (arba `auto/best-free`).

### Jungčių sauga

Kandidatas ne visada susietas tik su viena jungtimi — loginis kandidatas turi leidžiamų jungčių sąrašą `allowedConnectionIds`, o faktiškai naudojama paskyra pasirenkama vėliau, išsiuntimo metu, faile `open-sse/services/combo/autoStrategy.ts`. Todėl abi grupės tikrina **kiekvieną jungtį atskirai** ir perrašo `allowedConnectionIds`, palikdamos tiksliai išlikusį poaibį — niekada ne visą pradinį sąrašą ir niekada ne vieną savavališkai pasirinktą narį. Kadangi `autoStrategy.ts` jau taiko šį masyvą kaip griežtą leidžiamų reikšmių sąrašą, jį perrašius čia „patikrintų“ ir „faktiškai naudojamų“ jungčių aibės sutampa pagal pačią konstrukciją. Tai tas pats invariantas ir tie patys argumentai kaip [STRICT_ZERO_COST](./STRICT_ZERO_COST.md).

## `auto/thrifty` — kilti po vieną pakopą

Telkinys = visos pakopos, surikiuotos pagal pakopos indeksą, išfiltruojant išnaudotus kandidatus. `auto` variklis vis tiek vertina kandidatus **išlikusiame** telkinyje: kopėčios nustato, kurios pakopos dalyvauja, o vertinimas — kuris jų kandidatas laimi. Tvarka pakopoje yra stabili, todėl šis papildomas sluoksnis niekada nekeičia paties vertintojo sudaryto reitingo.

Tai yra rikiavimo ir filtravimo sluoksnis, **o ne** naujas dispečeris: spekuliatyvus `combo.ts` ciklas jau eina per tikslus nustatyta tvarka ir nesėkmės atveju pereina prie kito, todėl vykdymo metu aptiktas išnaudojimas, kurio neaptiko išankstinė patikra, vis tiek tame pačiame užklausos vykdyme perkelia į kitą pakopą.

Kai `auto/subscription` veikia saugiu **uždaruoju** režimu, `auto/thrifty` veikia **atviruoju** režimu: į planą įtraukta jungtis, kuriai nepavyksta gauti tinkamo kvotos rodmens, vis tiek bandoma pirmiausia. Jos išbandymas nieko nekainuoja, o jei paaiškėja, kad jos kvota išnaudota, pereinama prie kitos pakopos — tuo tarpu atsisakius ją išbandyti dėl trūkstamų telemetrijos duomenų, užklausa būtų nukreipta į mokamą pakopą, t. y. būtų pasiektas būtent tas rezultatas, kuriam išvengti ši grupė ir sukurta.

## Grįžimas prie plano po atstatymo

Kad maršruto parinkimas grįžtų į 0 pakopą, turi baigti galioti trys nepriklausomi dalykai. Pataisius tik vieną, kopėčios dar ilgai po plano kvotos papildymo lieka įstrigusios mokamose pakopose.

1. **Kvotos būsenos podėlis** — `freeAccessQuota.ts` saugo duomenis kiekvienai `(provider, connection)` porai taikydamas 180 s TTL. Podėlio įrašas, kurio nuosavas `resetAt` laikas jau praėjo, apibūdina nebeegzistuojantį laikotarpį, todėl nuo šiol laikomas pasenusiu **nepaisant jo amžiaus** ir priverstinai atnaujinamas. Be to vidurnaktį papildyto plano rodmuo ir toliau rodytų, kad kvota išnaudota, kol atsitiktinai baigtųsi TTL.
2. **Pačių kopėčių būsena** — jos sąmoningai nėra. Pakopų tinkamumas iš naujo apskaičiuojamas pagal dabartinę kvotos būseną kiekvieną kartą kuriant telkinį; nėra išsaugoto įrašo „šiuo metu naudojama 3 pakopa“, kuris galėtų išlikti ilgiau nei atstatymo būsena ir užblokuoti maršruto parinkimą.
3. **Jungties pristabdymas** — kvotą išnaudojęs 429 atsakas nustato `rateLimitedUntil` pagal eksponentinį delsos didinimą, kuris plano jungties atveju gali tęstis ilgiau nei tikrasis atstatymo laikas. `clampCooldownToReset()` (`subscriptionLadder.ts`) sutrumpina pristabdymą iki paties išorinio šaltinio atstatymo momento ir niekada negali jo pailginti. **Tai įgyvendinta ir išbandyta, bet dar neprijungta**: kvotos podėlis faile `src/sse/services/auth.ts` anuliuojamas _prieš_ įrašant bet kokį pristabdymą, todėl `resetAt` turi būti užfiksuotas anksčiau toje funkcijoje — tai atsparumo kritinio vykdymo kelio pakeitimas, kuriam reikia atskiros peržiūrimos PR. Iki tol pakartotinio įtraukimo laukiama, kol baigsis jungties pristabdymas (kuris jau teikia pirmenybę išorinio šaltinio `Retry-After` nurodymams, kai teikėjas juos siunčia).

### Apsauga nuo svyravimo

Ką tik atstatyta pakopa vėl įtraukiama tik tada, kai viršijama `reentryMinRemainingPercent` reikšmė (numatytoji — 5), o jau naudojamai jungčiai pakanka išlikti virš `exitCutoffPercent` reikšmės (numatytoji — 2, atitinkanti `quotaPreflight.defaultThresholdPercent`). Skirtumas tarp jų yra histerezės juosta — be jos ties riba svyruojanti jungtis per gretimas užklausas nuolat šokinėtų tarp pakopų.

## Konfigūracija

Tik derinimo parametrai. Sąmoningai **nėra** `enabled` žymos: jungiklis, kuriuo būtų galima juos išjungti,
leistų `auto/subscription` nepastebimai naudoti visą telkinį — įskaitant mokamus modelius — prisidengiant
priešingą reikšmę žadančiu pavadinimu.

```jsonc
{
  "subscriptionLadder": {
    "exitCutoffPercent": 2,
    "reentryMinRemainingPercent": 5,
    "rungBudgetUsd": { "cheap": 5.0, "premium": 0 }, // 0 visiškai išjungia pakopą
  },
}
```

Biudžeto ribojimas neveikia, kol neprijungtas išlaidų nustatymo mechanizmas: kai apskaitos duomenys
nepasiekiami, mokama pakopa įtraukiama į eilę, tačiau niekada neribojama. Nuo v3.8.51 nustatymą
`rungBudgetUsd` schema priima, tačiau jis dar NĖRA taikomas — laikykite jį rezervuota konfigūracija,
o ne aktyvia išlaidų riba. Pakopų eiliškumas, kvota pagrįstas išnaudojimas ir pakartotinis įtraukimas
po atkūrimo veikia ir be jo.

## Kompozicija

`subscription` ir `thrifty` yra `AutoTier` reikšmės, todėl jas galima derinti su kiekviena kategorija:
`auto/coding:thrifty`, `auto/reasoning:subscription` ir t. t. Abu paprastieji identifikatoriai
(`auto/subscription`, `auto/thrifty`) skelbiami `/v1/models` ir valdymo skydelyje.

Nė vienas identifikatorius nepriklauso mokamai pakopai, todėl `isPaidTierAutoId()` abiem atvejais grąžina
`false`, o `auto/subscription` išlieka pritaikius `hidePaidModels`.

## Kur yra kodas

| Sritis                                | Failas                                              |
| ------------------------------------- | --------------------------------------------------- |
| Atrinkti atsiskaitymo duomenys        | `open-sse/config/connectionBillingCatalog.ts`       |
| Klasifikatorius                       | `open-sse/services/autoCombo/connectionBilling.ts`  |
| Pakopos, abi grupuotės ir grįžimas    | `open-sse/services/autoCombo/subscriptionLadder.ts` |
| Integravimas į kandidatų telkinį      | `open-sse/services/autoCombo/virtualFactory.ts`     |
| Atkūrimą įvertinantis podėlio senumas | `open-sse/services/autoCombo/freeAccessQuota.ts`    |
| Pakopų sąsaja                         | `open-sse/services/autoCombo/suffixComposition.ts`  |
| Skelbiami identifikatoriai            | `open-sse/services/autoCombo/builtinCatalog.ts`     |
| Testai                                | `tests/unit/autoCombo/subscription-ladder.test.ts`  |
