# Subscription-first routing (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/SUBSCRIPTION_LADDER.md) · 🇪🇹 [am](../../../am/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇦 [ar](../../../ar/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇿 [az](../../../az/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇬 [bg](../../../bg/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇩 [bn](../../../bn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇦 [bs](../../../bs/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇿 [cs](../../../cs/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇰 [da](../../../da/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇪 [de](../../../de/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇷 [el](../../../el/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇸 [es](../../../es/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇷 [fa](../../../fa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇮 [fi](../../../fi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇷 [fr](../../../fr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇪 [ga](../../../ga/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [gu](../../../gu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ha](../../../ha/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇱 [he](../../../he/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [hi](../../../hi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇷 [hr](../../../hr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇺 [hu](../../../hu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇲 [hy](../../../hy/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇩 [id](../../../id/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ig](../../../ig/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇹 [it](../../../it/docs/routing/SUBSCRIPTION_LADDER.md) · 🇯🇵 [ja](../../../ja/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇪 [ka](../../../ka/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇭 [km](../../../km/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [kn](../../../kn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇷 [ko](../../../ko/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇹 [lt](../../../lt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇻 [lv](../../../lv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ml](../../../ml/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [mr](../../../mr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇾 [ms](../../../ms/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇹 [mt](../../../mt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇲 [my](../../../my/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇵 [ne](../../../ne/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇱 [nl](../../../nl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇴 [no](../../../no/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [or](../../../or/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [pa](../../../pa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇭 [phi](../../../phi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇱 [pl](../../../pl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇹 [pt](../../../pt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇴 [ro](../../../ro/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇺 [ru](../../../ru/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇰 [si](../../../si/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇰 [sk](../../../sk/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇮 [sl](../../../sl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇸 [sr](../../../sr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇪 [sv](../../../sv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇪 [sw](../../../sw/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ta](../../../ta/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [te](../../../te/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇭 [th](../../../th/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇷 [tr](../../../tr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇰 [ur](../../../ur/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇿 [uz](../../../uz/docs/routing/SUBSCRIPTION_LADDER.md) · 🇻🇳 [vi](../../../vi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [yo](../../../yo/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/SUBSCRIPTION_LADDER.md)

---

> Kaks uut `auto/*` ID-d — `auto/subscription` ja `auto/thrifty`. Mõlemad on kasutatavad ainult
> nõudmisel: midagi ei suunata nende kaudu, kui kutsuja ei küsi vastavat ID-d nime järgi, ning
> ükski olemasolev kogum, strateegia ega vaikeväärtus ei muutu.

## Miks see olemas on

OmniRoute vastab juba kahele kuludega seotud küsimusele, kuid kumbki neist pole see, mida enamik operaatoreid küsib.

| Olemasolev mehhanism                                     | Vastab küsimusele                                  |
| -------------------------------------------------------- | -------------------------------------------------- |
| `hidePaidModels` (`autoCombo/paidModelFilter.ts`)        | „Kas see mudel on kataloogitud tasuta mudelina?”   |
| `freeAccessPolicy: "strict"` (`strictZeroCostFilter.ts`) | „Kas see ühendus võib mulle kunagi arve tekitada?” |
| `quotaPreflight` (`combo/quotaExhaustionCutoff.ts`)      | „Kas see ühendus on oma limiidi lähedal?”          |
| `budgetCap` / `budgetFallback` (`autoCombo/engine.ts`)   | „Piira kulusid, taandu odavaimale valikule”        |

Iga ainult tasuta valikuid kasutav mehhanism **tõrkub suletult** — ammendunud tasuta kogum on tühi kogum,
mitte üleminek tasulisele valikule — ning iga tasulise poole mehhanism eirab hinnaklassi. Kumbki ei vasta
järgmisele küsimusele:

> „Kasuta kvooti, mille eest ma juba maksan. Kui see saab otsa, siis kas peatu või liigu ühe astme
> kaupa odavaimate tasuliste valikute kaudu ülespoole — ja naase kohe, kui kvoot lähtestatakse.”

## Arveldamine sõltub ühendusest, mitte mudelist

`classifyTier()` (`open-sse/services/tierResolver.ts`) kasutab võtmena paari `(provider, model)` ja tagastab
kataloogi hinnastuse põhjal `free | cheap | premium`. Kuid see, kas päring tekitab lisakulu,
sõltub sellest, **milline ühendus seda teenindab**: sama mudel sisaldub paketi hinnas Claude Code'i
OAuth-ühenduse kaudu, kuid API-võtmega ühenduse kaudu arveldatakse selle eest tokenipõhiselt.

`provider_connections.auth_type` ei ole kummaski suunas usaldusväärne indikaator — eksisteerib mõõdetava
kasutusega OAuth-ühendusi ning paketi hinnas sisalduvaid API-võtmega ühendusi (Copiloti kasutajakoha token
ei ole mõõdetava kasutusega API-võti). Seetõttu pärineb arveldusklass **kureeritud kataloogist**
`open-sse/config/connectionBillingCatalog.ts`, kuhu see määratakse käsitsi iga teenusepakkuja avaldatud
tingimuste põhjal — sama muster, mille `FreeModelBudget.hardStopGuaranteed` tasuta mudelite jaoks juba
kehtestas.

```ts
type ConnectionBillingClass = "subscription" | "metered" | "keyless" | "unknown";
type ConnectionOverageBehavior = "hard-stop" | "meters-to-paid" | "unknown";
```

Lahendusjärjekord (`autoCombo/connectionBilling.ts`) on järgmine: sünteetiline autentimiseta oleku
sentinell → `keyless`; kataloogikirje, mis vastab nii teenusepakkujale **kui ka** `authType` väärtusele;
teenusepakkujaülene kirje; muul juhul `unknown`. **Kureerimata ei tähenda tasuta** — `unknown` käsitletakse
kõikjal väärtusena `metered`, mistõttu homme lisatud teenusepakkuja alustab väljaspool tellimuse astet
ning tuleb sinna teadlikult kureerida.

## Astmemudel

Viis astet eskaleerumise järjekorras. Need erinevad enama kui hinna poolest — igal astmel on **oma**
ammendumissignaal, mistõttu ei ole see pelgalt sortimine.

| #   | Aste           | Liikmesus                                        | Ammendunud, kui                      |
| --- | -------------- | ------------------------------------------------ | ------------------------------------ |
| 0   | `subscription` | kureeritud `billing: "subscription"`             | kvoodiaken on lävendi juures või all |
| 1   | `keyless`      | sünteetiline autentimiseta tee                   | ühenduse ooteaeg / kaitselüliti      |
| 2   | `free`         | mõõdetav ühendus, `classifyTier() === "free"`    | tasuta kasutusmaht on ammendunud     |
| 3   | `cheap`        | mõõdetav ühendus, `classifyTier() === "cheap"`   | astme eelarve on ära kasutatud       |
| 4   | `premium`      | mõõdetav ühendus, `classifyTier() === "premium"` | astme eelarve on ära kasutatud       |

Astmed 0–2 ammenduvad **kvoodi** põhjal, mis on jälgitav ja mille üle juba arvestust peetakse. Astmetel 3–4
kvooti ei ole — tasuline ühendus teenindab lõputult — seega on nende ainus mõistlik ammendumissignaal
astmepõhine **eelarve**. Ilma selleta puudub tingimus, mis käivitaks tegevuse „eskaleeri, kui odav aste on
ammendunud”.

## `auto/subscription` — tõrke korral suletud

Kogum = ainult aste 0, piiratuna ühendustega, mille ülekasutus on dokumenteeritud kui `hard-stop` ja mille puhul on reaalajas kontrollitud, et kvooti on piisavalt. Kõik ebaselge jäetakse välja: kureerimata teenusepakkuja, kontrollimatu kvoodinäit, aegunud näit või ülekasutus, mille eest esitatakse arve.

Tühi kogum on **taotluslik** tulemus, mitte defekt — kutsuja olemasolev tühja kogumi käsitlustee muudab selle selgeks veaks, selle asemel et rakendada vaikimisi arveldatavat varuvarianti. See ongi kogu selle ID lubadus.

`keyless` ei kvalifitseeru sihilikult: see rühmitus tähendab „pakett, mille eest ma maksan“, seega autentimiseta tagasüsteem sellesse ei kuulu. Selleks kasutage `auto/thrifty` (või `auto/best-free`).

### Ühenduse turvalisus

Kandidaat ei ole alati seotud ühe ühendusega — loogiline kandidaat sisaldab lubatud ühenduste loendit `allowedConnectionIds` ning tegelikult kasutatav konto valitakse hiljem, päringu edastamisel, failis `open-sse/services/combo/autoStrategy.ts`. Seetõttu kontrollivad mõlemad rühmitused **iga ühendust eraldi** ja kirjutavad `allowedConnectionIds` ümber nii, et see sisaldaks täpselt kontrolli läbinud alamhulka — mitte kunagi kogu algset loendit ega üht suvaliselt valitud liiget. Kuna `autoStrategy.ts` jõustab seda massiivi juba range lubatud loendina, muudab selle siin ümberkirjutamine „kontrollitud“ ja „tegelikult kasutatud“ hulga konstruktsiooniliselt samaks. See on sama invariant ja sama põhjendus nagu dokumendis [STRICT_ZERO_COST](./STRICT_ZERO_COST.md).

## `auto/thrifty` — liigu korraga ühe astme võrra ülespoole

Kogum = kõik astmed astmeindeksi järgi järjestatuna, kus ammendunud kandidaadid on välja filtreeritud. Mootor `auto` hindab endiselt säilinud kogumi **sees**: redel määrab, millised astmed osalevad, hindamine määrab, milline kandidaat nende hulgas võidab. Järjestus on astme sees stabiilne, seega ei korralda see kiht hindaja enda pingerida kunagi ümber.

See on järjestus- ja filtreerimiskiht, **mitte** uus dispetšer: faili `combo.ts` spekulatiivne tsükkel läbib sihtmärke juba järjekorras ning liigub tõrke korral järgmise juurde, mistõttu eskaleerub eeltöötluses märkamata jäänud käitusaegne ammendumine sama päringu sees ikkagi järgmisele astmele.

Kui `auto/subscription` on tõrke korral **suletud**, siis `auto/thrifty` on tõrke korral **avatud**: paketti kuuluvat ühendust, mille kohta pole kasutatavat kvoodinäitu, proovitakse siiski esimesena. Selle proovimine ei maksa midagi ning kui ühendus osutub ammendunuks, jõuab varuvariandile üleminek niikuinii järgmise astmeni — samas kui selle proovimisest keeldumine saadaks puuduva telemeetria korral päringu tasulisele astmele, mis on täpselt see tulemus, mida selle rühmitusega püütakse vältida.

## Pärast lähtestamist paketti naasmine

Enne kui marsruutimine naaseb astmele 0, peavad aeguma kolm üksteisest sõltumatut asja. Ainult ühe parandamine jätab redeli tasulistele astmetele kinni veel kauaks pärast paketi kvoodi taastumist.

1. **Kvoodiolekute vahemälu** — `freeAccessQuota.ts` salvestab andmed vahemällu iga paari `(provider, connection)` kohta 180-sekundilise TTL-iga. Vahemälukirje, mille enda `resetAt` on juba möödunud, kirjeldab ajavahemikku, mida enam ei eksisteeri, seega käsitletakse seda nüüd aegununa **olenemata kirje vanusest** ja sunnitakse värskendama. Ilma selleta näitab südaööl taastunud pakett ammendunud olekut seni, kuni TTL juhuslikult aegub.
2. **Redeli enda olek** — seda ei ole, ja see on taotluslik. Astmete sobivus arvutatakse reaalajas kvoodiolekust iga kord kogumi koostamisel uuesti; puudub püsiv kirje „praegu astmel 3“, mis võiks lähtestuse üle elada ja marsruutimise kinni kiiluda.
3. **Ühenduse ooteaeg** — ammendumist näitav 429 määrab `rateLimitedUntil` väärtuse eksponentsiaalse tagasivõtu põhjal, mis võib paketiühenduse puhul tegelikust lähtestamisest hilisemaks ulatuda. `clampCooldownToReset()` (`subscriptionLadder.ts`) lühendab ooteaega ülesvooluteenuse enda lähtestamishetkeni ega saa seda kunagi pikendada. **See on implementeeritud ja testitud, kuid pole veel ühendatud**: kvoodivahemälu tühjendatakse failis `src/sse/services/auth.ts` _enne_ mis tahes ooteaja kirjutamist, seega tuleb `resetAt` selles funktsioonis varem talletada — see on töökindluse kriitilise täitmistee muudatus, mis kuulub eraldi ülevaadatavasse PR-i. Seni oodatakse enne naasmist ühenduse ooteaja lõppemiseni (mis juba eelistab ülesvooluteenuse `Retry-After` vihjeid, kui teenusepakkuja need saadab).

### Võnkumise vältimine

Äsja lähtestatud aste lubatakse uuesti kasutusse ainult siis, kui see ületab `reentryMinRemainingPercent` väärtuse (vaikimisi 5), samas kui juba kasutuses olev ühendus peab püsima ainult üle `exitCutoffPercent` väärtuse (vaikimisi 2, mis vastab väärtusele `quotaPreflight.defaultThresholdPercent`). Nende vahe on hüstereesivahemik — ilma selleta võnguks piirväärtuse lähedal püsiv ühendus järjestikuste päringute käigus astmete vahel.

## Konfiguratsioon

Ainult peenhäälestuseks. Teadlikult **puudub** lipp `enabled`: lüliti, millega saaks need välja lülitada,
jätaks `auto/subscription`-i märkamatult teenindama kogu mudelikogumit — sealhulgas tasulisi mudeleid — nime all,
mis lubab vastupidist.

```jsonc
{
  "subscriptionLadder": {
    "exitCutoffPercent": 2,
    "reentryMinRemainingPercent": 5,
    "rungBudgetUsd": { "cheap": 5.0, "premium": 0 }, // 0 keelab astme täielikult
  },
}
```

Eelarvepõhine piiramine ei rakendu enne, kui kululahendaja on ühendatud: kui arvestusandmed puuduvad, siis tasuline
aste järjestatakse, kuid seda ei piirata kunagi. Alates versioonist v3.8.51 aktsepteerib skeem seadistust `rungBudgetUsd`,
kuid seda EI jõustata veel — käsitlege seda reserveeritud konfiguratsioonina, mitte aktiivse kululimiidina. Astmete järjestamine, kvoodipõhine ammendumine ja lähtestamisjärgne naasmine
toimivad ka ilma selleta.

## Koosseis

`subscription` ja `thrifty` on `AutoTier`-i väärtused, seega saab neid kombineerida iga kategooriaga:
`auto/coding:thrifty`, `auto/reasoning:subscription` jne. Kaks liht-ID-d
(`auto/subscription`, `auto/thrifty`) on avaldatud `/v1/models`-is ja juhtpaneelil.

Kumbki ID ei kuulu tasulisele tasemele, seega tagastab `isPaidTierAutoId()` mõlema puhul `false` ja
`auto/subscription` säilib pärast `hidePaidModels`-i rakendamist.

## Koodi asukoht

| Valdkond                                | Fail                                                |
| --------------------------------------- | --------------------------------------------------- |
| Kureeritud arveldusandmed               | `open-sse/config/connectionBillingCatalog.ts`       |
| Klassifikaator                          | `open-sse/services/autoCombo/connectionBilling.ts`  |
| Astmed, mõlemad rühmitused, naasmine    | `open-sse/services/autoCombo/subscriptionLadder.ts` |
| Ühendamine kandidaatide kogumiga        | `open-sse/services/autoCombo/virtualFactory.ts`     |
| Lähtestamist arvestav vahemälu aegumine | `open-sse/services/autoCombo/freeAccessQuota.ts`    |
| Tasemete liides                         | `open-sse/services/autoCombo/suffixComposition.ts`  |
| Avaldatud ID-d                          | `open-sse/services/autoCombo/builtinCatalog.ts`     |
| Testid                                  | `tests/unit/autoCombo/subscription-ladder.test.ts`  |
