# Subscription-first routing (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/SUBSCRIPTION_LADDER.md) · 🇪🇹 [am](../../../am/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇦 [ar](../../../ar/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇿 [az](../../../az/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇬 [bg](../../../bg/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇩 [bn](../../../bn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇦 [bs](../../../bs/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇿 [cs](../../../cs/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇰 [da](../../../da/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇪 [de](../../../de/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇷 [el](../../../el/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇸 [es](../../../es/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇪 [et](../../../et/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇷 [fa](../../../fa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇮 [fi](../../../fi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇷 [fr](../../../fr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇪 [ga](../../../ga/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [gu](../../../gu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ha](../../../ha/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇱 [he](../../../he/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [hi](../../../hi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇷 [hr](../../../hr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇺 [hu](../../../hu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇲 [hy](../../../hy/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇩 [id](../../../id/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ig](../../../ig/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇹 [it](../../../it/docs/routing/SUBSCRIPTION_LADDER.md) · 🇯🇵 [ja](../../../ja/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇪 [ka](../../../ka/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇭 [km](../../../km/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [kn](../../../kn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇷 [ko](../../../ko/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇹 [lt](../../../lt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇻 [lv](../../../lv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ml](../../../ml/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [mr](../../../mr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇾 [ms](../../../ms/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇹 [mt](../../../mt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇲 [my](../../../my/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇵 [ne](../../../ne/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇱 [nl](../../../nl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇴 [no](../../../no/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [or](../../../or/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [pa](../../../pa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇭 [phi](../../../phi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇱 [pl](../../../pl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇹 [pt](../../../pt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇴 [ro](../../../ro/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇺 [ru](../../../ru/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇰 [si](../../../si/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇰 [sk](../../../sk/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇸 [sr](../../../sr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇪 [sv](../../../sv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇪 [sw](../../../sw/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ta](../../../ta/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [te](../../../te/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇭 [th](../../../th/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇷 [tr](../../../tr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇰 [ur](../../../ur/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇿 [uz](../../../uz/docs/routing/SUBSCRIPTION_LADDER.md) · 🇻🇳 [vi](../../../vi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [yo](../../../yo/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/SUBSCRIPTION_LADDER.md)

---

> Dva nova ID-ja `auto/*` — `auto/subscription` in `auto/thrifty`. Oba sta izbirna tako, da ju
> je treba izrecno zahtevati: nič se ne usmerja prek njiju, razen če klicatelj zahteva ID po imenu,
> obstoječi skladi, strategije ali privzete nastavitve pa se ne spremenijo.

## Zakaj to obstaja

OmniRoute že odgovarja na dve vprašanji o stroških, vendar nobeno od njiju ni tisto, ki ga zastavlja večina upravljavcev.

| Obstoječi mehanizem                                      | Odgovarja na vprašanje                               |
| -------------------------------------------------------- | ---------------------------------------------------- |
| `hidePaidModels` (`autoCombo/paidModelFilter.ts`)        | »ali je ta model v katalogu označen kot brezplačen?« |
| `freeAccessPolicy: "strict"` (`strictZeroCostFilter.ts`) | »ali mi lahko ta povezava kadar koli kaj zaračuna?«  |
| `quotaPreflight` (`combo/quotaExhaustionCutoff.ts`)      | »ali je ta povezava blizu svoje omejitve?«           |
| `budgetCap` / `budgetFallback` (`autoCombo/engine.ts`)   | »omeji porabo, nato preklopi na najcenejšo možnost«  |

Vsak mehanizem, omejen na brezplačne možnosti, **se ob napaki zapre** — izčrpan brezplačni sklad je prazen sklad, nikoli
pa ne pomeni prehoda na plačljivo možnost — in vsak mehanizem na plačljivi strani je neodvisen od ravni. Nobeden ne odgovarja:

> »Uporabi kvoto, ki jo že plačujem. Ko se izčrpa, se bodisi ustavi bodisi se po eno stopnjo
> naenkrat pomikaj skozi najcenejše plačljive možnosti — in se vrni v trenutku, ko se kvota ponastavi.«

## Obračunavanje je lastnost povezave, ne modela

`classifyTier()` (`open-sse/services/tierResolver.ts`) uporablja ključ `(provider, model)` in na podlagi
kataloških cen vrne `free | cheap | premium`. Toda ali zahteva povzroči dodatne stroške,
je odvisno od tega, **katera povezava jo obravnava**: isti model je vključen v paket prek povezave OAuth za Claude Code,
prek povezave s ključem API pa se obračunava po žetonih.

`provider_connections.auth_type` ni varen približek v nobeno smer — obstajajo obračunavane povezave OAuth
in povezave s ključem API, vključene v paket (žeton uporabniškega mesta Copilot ni
obračunavani ključ API). Zato razred obračunavanja izhaja iz **ročno urejenega kataloga**,
`open-sse/config/connectionBillingCatalog.ts`, nastavljenega ročno na podlagi objavljenih pogojev vsakega ponudnika —
po enakem vzorcu, ki ga je `FreeModelBudget.hardStopGuaranteed` že uvedel za brezplačne modele.

```ts
type ConnectionBillingClass = "subscription" | "metered" | "keyless" | "unknown";
type ConnectionOverageBehavior = "hard-stop" | "meters-to-paid" | "unknown";
```

Vrstni red razreševanja (`autoCombo/connectionBilling.ts`): sintetični označevalec brez preverjanja pristnosti →
`keyless`; vnos v katalogu, ki se ujema s ponudnikom **in** z `authType`; vnos za celotnega ponudnika;
sicer `unknown`. **Kar ni ročno uvrščeno, ni brezplačno** — `unknown` se povsod obravnava kot `metered`,
zato se ponudnik, dodan jutri, začne zunaj naročniške stopnje in ga je treba vanjo namerno
ročno uvrstiti.

## Model stopenj

Pet stopenj v vrstnem redu stopnjevanja. Razlikujejo se v več kot le ceni — vsaka ima svoj
**lastni** signal izčrpanosti, zato to ni zgolj razvrščanje.

| #   | Stopnja        | Članstvo                                              | Izčrpana, ko                        |
| --- | -------------- | ----------------------------------------------------- | ----------------------------------- |
| 0   | `subscription` | ročno določeno `billing: "subscription"`              | je okno kvote na pragu ali pod njim |
| 1   | `keyless`      | sintetična pot brez preverjanja pristnosti            | ohlajanje povezave / prekinjevalnik |
| 2   | `free`         | obračunavana povezava, `classifyTier() === "free"`    | je brezplačna količina izčrpana     |
| 3   | `cheap`        | obračunavana povezava, `classifyTier() === "cheap"`   | je proračun stopnje porabljen       |
| 4   | `premium`      | obračunavana povezava, `classifyTier() === "premium"` | je proračun stopnje porabljen       |

Stopnje 0–2 se izčrpajo na podlagi **kvote**, ki je opazljiva in se že spremlja. Stopnji 3–4 nimata
kvote — plačljiva povezava obravnava zahteve neomejeno — zato je njun edini smiseln signal izčrpanosti
**proračun** za posamezno stopnjo. Brez njega »stopnjuj, ko je poceni možnost izčrpana« nima sprožilca.

## `auto/subscription` — varno zavrni

Nabor = samo stopnica 0, omejena na povezave, pri katerih je prekoračitev dokumentirana kot `hard-stop`, za vsako pa je v živo preverjeno, da ima dovolj kvotne rezerve. Vse dvoumno je izključeno: ponudnik brez skrbniško določenih pravil, nepreverljiv podatek o kvoti, zastarel podatek ali prekoračitev, ki se obračuna kot plačljiva poraba.

Prazen nabor je **pričakovan** rezultat, ne napaka — obstoječa pot klicatelja za prazen nabor ga pretvori v jasno napako namesto v tiho, plačljivo nadomestno možnost. To je celotno zagotovilo tega ID-ja.

`keyless` namenoma **ne** izpolnjuje pogojev: ta skupina pomeni »paket, ki ga plačujem«, zato zaledni sistem brez preverjanja pristnosti vanjo ne spada. Za to uporabite `auto/thrifty` (ali `auto/best-free`).

### Varnost povezav

Kandidat ni vedno vezan na eno povezavo — logični kandidat vsebuje seznam dovoljenih povezav `allowedConnectionIds`, dejansko uporabljeni račun pa pozneje, ob razpošiljanju, izbere `open-sse/services/combo/autoStrategy.ts`. Obe skupini zato preverita **vsako povezavo posebej** in `allowedConnectionIds` prepišeta tako, da vsebuje natanko preživelo podmnožico — nikoli celotnega prvotnega seznama in nikoli enega poljubno izbranega člana. Ker `autoStrategy.ts` to polje že uveljavlja kot strog seznam dovoljenih vrednosti, s prepisom na tem mestu zagotovimo, da sta množici »preverjeno« in »dejansko uporabljeno« po sami konstrukciji enaki. To je ista invarianta in enako sklepanje kot pri [STRICT_ZERO_COST](./STRICT_ZERO_COST.md).

## `auto/thrifty` — stopnjuj po eno stopnico naenkrat

Nabor = vse stopnice, razvrščene po indeksu stopnice, pri čemer so izčrpani kandidati izločeni. Mehanizem `auto` še vedno točkuje **znotraj** preživelega nabora: lestvica določa, katere stopnice sodelujejo, točkovanje pa določa, kateri kandidat znotraj njih zmaga. Vrstni red znotraj stopnice je stabilen, zato ta plast nikoli ne prerazporedi lastne razvrstitve ocenjevalnika.

To je plast za razvrščanje in omejevanje, **ne** nov razpošiljevalnik: špekulativna zanka v `combo.ts` že obravnava cilje po vrsti in ob napaki nadaljuje z naslednjim, zato izčrpanje med izvajanjem, ki ga predhodno preverjanje ni zaznalo, še vedno povzroči prehod na naslednjo stopnico znotraj iste zahteve.

Medtem ko `auto/subscription` varno zavrne, `auto/thrifty` nadaljuje **odprto**: povezava, vključena v paket, brez uporabnega podatka o kvoti se vseeno poskusi prva. Poskus ne stane nič, in če se izkaže, da je povezava izčrpana, se nadaljevanje vseeno premakne na naslednjo stopnico — če pa je sploh ne bi poskusili, bi bila zahteva zaradi manjkajoče telemetrije poslana na plačljivo stopnico, kar je natanko rezultat, ki ga želi ta skupina preprečiti.

## Vrnitev na paket po ponastavitvi

Preden se usmerjanje vrne na stopnico 0, morajo poteči tri neodvisne stvari. Če popravite samo eno, lestvica ostane na plačljivih stopnicah še dolgo po obnovitvi paketa.

1. **Predpomnilnik stanja kvote** — `freeAccessQuota.ts` podatke predpomni za vsak par `(provider, connection)` s TTL-jem 180 s. Predpomnjeni vnos, katerega lastni `resetAt` je že potekel, opisuje okno, ki ne obstaja več, zato se zdaj šteje za zastarelega **ne glede na starost** in sproži osvežitev. Brez tega se paket, ki se je obnovil ob polnoči, še naprej prikazuje kot izčrpan, dokler TTL slučajno ne poteče.
2. **Lastno stanje lestvice** — po zasnovi ga ni. Upravičenost stopnic se ob vsaki sestavi nabora znova izračuna iz trenutnega stanja kvote; ne obstaja noben trajno shranjen zapis »trenutno na stopnici 3«, ki bi lahko preživel ponastavitev in blokiral usmerjanje.
3. **Ohlajanje povezave** — odgovor 429 ob izčrpanju nastavi `rateLimitedUntil` na podlagi eksponentnega podaljševanja čakanja, ki lahko pri povezavi paketa preseže dejansko ponastavitev. `clampCooldownToReset()` (`subscriptionLadder.ts`) skrajša obdobje ohlajanja na trenutek ponastavitve pri ponudniku in ga nikoli ne more podaljšati. **Funkcija je implementirana in preizkušena, vendar še ni povezana**: predpomnilnik kvote se v `src/sse/services/auth.ts` razveljavi, _preden_ se zapiše kakršno koli ohlajanje, zato je treba `resetAt` zajeti prej v tej funkciji — to je sprememba kritične poti za odpornost, ki sodi v lasten pregledani PR. Do takrat ponovni vstop čaka, da poteče ohlajanje povezave (ki že daje prednost ponudnikovim namigom `Retry-After`, kadar jih ponudnik pošlje).

### Preprečevanje preklapljanja

Stopnica, ki je bila pravkar ponastavljena, se znova sprejme samo nad `reentryMinRemainingPercent` (privzeto 5), medtem ko mora povezava, ki se že uporablja, ostati le nad `exitCutoffPercent` (privzeto 2, kar se ujema z `quotaPreflight.defaultThresholdPercent`). Razlika je histerezni pas — brez njega povezava, ki niha okoli mejne vrednosti, pri zaporednih zahtevah oscilira med stopnicami.

## Konfiguracija

Samo prilagajanje. Namenoma **ni** zastavice `enabled`: stikalo, ki bi to lahko izklopilo,
bi povzročilo, da bi `auto/subscription` neopazno uporabljal celoten nabor — vključno s plačljivimi modeli — pod
imenom, ki obljublja nasprotno.

```jsonc
{
  "subscriptionLadder": {
    "exitCutoffPercent": 2,
    "reentryMinRemainingPercent": 5,
    "rungBudgetUsd": { "cheap": 5.0, "premium": 0 }, // 0 popolnoma onemogoči stopnjo
  },
}
```

Omejevanje na podlagi proračuna je nedejavno, dokler ni povezan razreševalnik porabe: če podatki o obračunavanju niso na voljo, je plačljiva
stopnja razvrščena, vendar ni nikoli omejena. Od v3.8.51 dalje shema sprejema nastavitev `rungBudgetUsd`,
vendar se ta še NE uveljavlja — obravnavajte jo kot rezervirano konfiguracijo in ne kot aktivno omejitev porabe. Razvrščanje stopenj, izčrpanje na podlagi kvote in ponovni vstop po ponastavitvi delujejo
brez nje.

## Sestavljanje

`subscription` in `thrifty` sta vrednosti `AutoTier`, zato ju je mogoče sestaviti z vsako kategorijo:
`auto/coding:thrifty`, `auto/reasoning:subscription` in tako naprej. Dva ravna identifikatorja
(`auto/subscription`, `auto/thrifty`) sta objavljena v `/v1/models` in na nadzorni plošči.

Noben od identifikatorjev ne spada v plačljivo raven, zato `isPaidTierAutoId()` za oba vrne `false`,
`auto/subscription` pa ostane viden ob uporabi `hidePaidModels`.

## Kje se nahaja koda

| Področje                                        | Datoteka                                            |
| ----------------------------------------------- | --------------------------------------------------- |
| Kurirani podatki za obračunavanje               | `open-sse/config/connectionBillingCatalog.ts`       |
| Klasifikator                                    | `open-sse/services/autoCombo/connectionBilling.ts`  |
| Stopnje, obe razvrstitvi, ponovni vstop         | `open-sse/services/autoCombo/subscriptionLadder.ts` |
| Povezava z naborom kandidatov                   | `open-sse/services/autoCombo/virtualFactory.ts`     |
| Zastaranje predpomnilnika glede na ponastavitev | `open-sse/services/autoCombo/freeAccessQuota.ts`    |
| Površina ravni                                  | `open-sse/services/autoCombo/suffixComposition.ts`  |
| Objavljeni identifikatorji                      | `open-sse/services/autoCombo/builtinCatalog.ts`     |
| Testi                                           | `tests/unit/autoCombo/subscription-ladder.test.ts`  |
