# Subscription-first routing (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/SUBSCRIPTION_LADDER.md) · 🇪🇹 [am](../../../am/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇦 [ar](../../../ar/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇿 [az](../../../az/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇬 [bg](../../../bg/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇩 [bn](../../../bn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇿 [cs](../../../cs/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇰 [da](../../../da/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇪 [de](../../../de/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇷 [el](../../../el/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇸 [es](../../../es/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇪 [et](../../../et/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇷 [fa](../../../fa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇮 [fi](../../../fi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇷 [fr](../../../fr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇪 [ga](../../../ga/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [gu](../../../gu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ha](../../../ha/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇱 [he](../../../he/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [hi](../../../hi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇺 [hu](../../../hu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇲 [hy](../../../hy/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇩 [id](../../../id/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ig](../../../ig/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇹 [it](../../../it/docs/routing/SUBSCRIPTION_LADDER.md) · 🇯🇵 [ja](../../../ja/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇪 [ka](../../../ka/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇭 [km](../../../km/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [kn](../../../kn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇷 [ko](../../../ko/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇹 [lt](../../../lt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇻 [lv](../../../lv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ml](../../../ml/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [mr](../../../mr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇾 [ms](../../../ms/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇹 [mt](../../../mt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇲 [my](../../../my/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇵 [ne](../../../ne/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇱 [nl](../../../nl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇴 [no](../../../no/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [or](../../../or/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [pa](../../../pa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇭 [phi](../../../phi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇱 [pl](../../../pl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇹 [pt](../../../pt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇴 [ro](../../../ro/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇺 [ru](../../../ru/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇰 [si](../../../si/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇰 [sk](../../../sk/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇮 [sl](../../../sl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇸 [sr](../../../sr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇪 [sv](../../../sv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇪 [sw](../../../sw/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ta](../../../ta/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [te](../../../te/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇭 [th](../../../th/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇷 [tr](../../../tr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇰 [ur](../../../ur/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇿 [uz](../../../uz/docs/routing/SUBSCRIPTION_LADDER.md) · 🇻🇳 [vi](../../../vi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [yo](../../../yo/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/SUBSCRIPTION_LADDER.md)

---

> Dva nova `auto/*` ID-a — `auto/subscription` i `auto/thrifty`. Oba se uključuju na zahtjev:
> ništa se ne usmjerava kroz njih osim ako pozivatelj izričito ne zatraži taj ID i nema
> promjena postojećih skupova, strategija ni zadanih postavki.

## Zašto ovo postoji

OmniRoute već odgovara na dva pitanja o troškovima, ali nijedno nije ono koje većina operatera postavlja.

| Postojeći mehanizam                                      | Odgovara na pitanje                                  |
| -------------------------------------------------------- | ---------------------------------------------------- |
| `hidePaidModels` (`autoCombo/paidModelFilter.ts`)        | "je li ovaj model u katalogu označen kao besplatan?" |
| `freeAccessPolicy: "strict"` (`strictZeroCostFilter.ts`) | "može li mi se ova veza ikada naplatiti?"            |
| `quotaPreflight` (`combo/quotaExhaustionCutoff.ts`)      | "je li ova veza blizu svojeg ograničenja?"           |
| `budgetCap` / `budgetFallback` (`autoCombo/engine.ts`)   | "ograniči potrošnju, prijeđi na najjeftiniju opciju" |

Svaki mehanizam ograničen samo na besplatne opcije **ne propušta u slučaju neuspjeha** — iscrpljen
besplatni skup postaje prazan skup, nikada prijelaz na plaćenu opciju — a svaki mehanizam na
plaćenoj strani neovisno tretira sve razine. Nijedan ne odgovara na pitanje:

> "Upotrijebi kvotu koju već plaćam. Kada se potroši, zaustavi se ili prijeđi jednu po jednu
> razinu kroz najjeftinije plaćene opcije — i vrati se čim se kvota obnovi."

## Naplata je svojstvo veze, a ne modela

`classifyTier()` (`open-sse/services/tierResolver.ts`) koristi `(provider, model)` kao ključ i
vraća `free | cheap | premium` na temelju cijena iz kataloga. Međutim, hoće li zahtjev uzrokovati
dodatni trošak ovisi o tome **koja ga veza poslužuje**: isti je model uključen u pretplatu putem
OAuth veze za Claude Code, a naplaćuje se po tokenu putem veze s API ključem.

`provider_connections.auth_type` nije pouzdan pokazatelj ni u jednom smjeru — postoje OAuth veze
s naplatom prema potrošnji, kao i veze s API ključem uključene u pretplatu (token za Copilot
licencu nije API ključ s naplatom prema potrošnji). Stoga klasa naplate dolazi iz **ručno
uređenog kataloga**, `open-sse/config/connectionBillingCatalog.ts`, postavljenog ručno prema
objavljenim uvjetima svakog pružatelja — isti obrazac koji je `FreeModelBudget.hardStopGuaranteed`
već uspostavio za besplatne modele.

```ts
type ConnectionBillingClass = "subscription" | "metered" | "keyless" | "unknown";
type ConnectionOverageBehavior = "hard-stop" | "meters-to-paid" | "unknown";
```

Redoslijed razrješavanja (`autoCombo/connectionBilling.ts`): sintetička oznaka bez autentifikacije →
`keyless`; stavka kataloga koja odgovara pružatelju **i** vrijednosti `authType`; stavka za cijelog
pružatelja; u suprotnom `unknown`. **Ono što nije u katalogu nije besplatno** — `unknown` se svugdje
tretira kao `metered`, pa pružatelj dodan sutra počinje izvan pretplatničke razine i mora biti
namjerno dodan u katalog.

## Model razina

Pet razina prema redoslijedu eskalacije. Razlikuju se po više od cijene — svaka ima **vlastiti**
signal iscrpljenosti, zbog čega ovo nije samo sortiranje.

| #   | Razina         | Pripadnost                                      | Iscrpljena kada                            |
| --- | -------------- | ----------------------------------------------- | ------------------------------------------ |
| 0   | `subscription` | ručno uređeni `billing: "subscription"`         | prozor kvote dosegne ili padne ispod praga |
| 1   | `keyless`      | sintetički put bez autentifikacije              | hlađenje veze / prekidač                   |
| 2   | `free`         | veza s naplatom, `classifyTier() === "free"`    | besplatna kvota iscrpljena                 |
| 3   | `cheap`        | veza s naplatom, `classifyTier() === "cheap"`   | potrošen proračun te razine                |
| 4   | `premium`      | veza s naplatom, `classifyTier() === "premium"` | potrošen proračun te razine                |

Razine 0-2 iscrpljuju se na temelju **kvote**, što je vidljivo i već se prati. Razine 3-4 nemaju
kvotu — plaćena veza može posluživati zauvijek — pa je njihov jedini razuman signal iscrpljenosti
**proračun** po razini. Bez njega nema okidača za "eskaliraj kada se jeftina razina iscrpi".

## `auto/subscription` — zatvaranje pri pogrešci

Skup = samo razina 0, ograničena na veze čije je prekoračenje dokumentirano kao `hard-stop`, pri čemu je
za svaku uživo potvrđeno da ima preostale kvote. Isključuje se sve što je nejasno: nekatalogizirani pružatelj,
neprovjerljivo očitanje kvote, zastarjelo očitanje ili prekoračenje koje se naplaćuje.

Prazan skup je **očekivani** rezultat, a ne nedostatak — postojeća putanja pozivatelja za prazan skup
pretvara ga u jasnu pogrešku umjesto u tihu, naplativu rezervnu opciju. To je cjelokupno obećanje
tog identifikatora.

`keyless` namjerno **ne** ispunjava uvjete: ovo grupiranje znači „paket koji plaćam”, pa
pozadinski sustav bez autentifikacije ne pripada u njega. Za to upotrijebite `auto/thrifty` (ili `auto/best-free`).

### Sigurnost veza

Kandidat nije uvijek vezan uz jednu vezu — logički kandidat sadrži popis dopuštenih veza
`allowedConnectionIds`, a račun koji se doista upotrebljava odabire se kasnije, pri otpremanju,
u `open-sse/services/combo/autoStrategy.ts`. Oba grupiranja stoga provjeravaju **svaku vezu
zasebno** i preoblikuju `allowedConnectionIds` tako da sadrži točno preživjeli podskup — nikada
cijeli izvorni popis niti jednog proizvoljno odabranog člana. Budući da `autoStrategy.ts` taj
niz već primjenjuje kao strogi popis dopuštenih veza, njegovo preoblikovanje ovdje osigurava da su skupovi
„provjereno” i „stvarno upotrijebljeno” jednaki samom konstrukcijom. To je ista invarijanta i isto obrazloženje kao u
[STRICT_ZERO_COST](./STRICT_ZERO_COST.md).

## `auto/thrifty` — napredovanje jednu po jednu razinu

Skup = sve razine, poredane prema indeksu razine, uz isključivanje iscrpljenih kandidata. Mehanizam `auto`
i dalje boduje **unutar** preživjelog skupa: ljestvica određuje koje se razine uzimaju u obzir, a bodovanje
određuje koji kandidat pobjeđuje unutar njih. Redoslijed je stabilan unutar razine, pa ovaj nadgradni sloj nikada
ne mijenja vlastiti poredak ocjenjivača.

Ovo je nadgradni sloj za poredak i ograničavanje, **a ne** novi dispečer: spekulativna petlja u `combo.ts`
već redom prolazi kroz odredišta i nakon neuspjeha prelazi na sljedeće, pa iscrpljenje tijekom izvođenja koje
prethodna provjera nije otkrila ipak dovodi do prelaska na sljedeću razinu unutar istog zahtjeva.

Dok se `auto/subscription` zatvara pri pogrešci, `auto/thrifty` ostaje **otvoren**: veza
uključena u paket bez upotrebljivog očitanja kvote ipak se prva pokušava upotrijebiti. Pokušaj ne košta ništa, a ako
se pokaže da je veza iscrpljena, prijelaz nakon neuspjeha ionako doseže sljedeću razinu — dok bi odbijanje
pokušaja poslalo zahtjev na plaćenu razinu zbog nedostajuće telemetrije, upravo onog ishoda koji
ovo grupiranje treba spriječiti.

## Povratak na paket nakon poništavanja

Tri neovisne stvari moraju isteći prije nego što se usmjeravanje vrati na razinu 0. Ispravljanje samo jedne ostavlja
ljestvicu zaglavljenom na plaćenim razinama dugo nakon što je paket ponovno napunjen.

1. **Predmemorija stanja kvote** — `freeAccessQuota.ts` sprema podatke po `(provider, connection)` uz
   TTL od 180 s. Predmemorirani unos čiji je vlastiti `resetAt` već prošao opisuje razdoblje koje više
   ne postoji, pa se sada smatra zastarjelim **bez obzira na starost** i prisiljava osvježavanje.
   Bez toga se paket koji se ponovno napunio u ponoć i dalje očitava kao iscrpljen sve dok TTL slučajno
   ne istekne.
2. **Vlastito stanje ljestvice** — po dizajnu ga nema. Prihvatljivost razine ponovno se izračunava iz
   aktualnog stanja kvote pri svakoj izgradnji skupa; ne postoji trajno spremljen zapis „trenutačno na razini 3” koji bi
   mogao nadživjeti poništavanje i zaglaviti usmjeravanje.
3. **Razdoblje mirovanja veze** — odgovor 429 pri iscrpljenju postavlja `rateLimitedUntil` na temelju eksponencijalnog
   povlačenja, koje za vezu paketa može premašiti stvarno vrijeme poništavanja. `clampCooldownToReset()`
   (`subscriptionLadder.ts`) skraćuje razdoblje mirovanja na trenutak poništavanja uzvodnog sustava i nikada ga
   ne može produljiti. **Implementirano je i testirano, ali još nije povezano**: predmemorija kvote
   poništava se u `src/sse/services/auth.ts` _prije_ zapisivanja bilo kojeg razdoblja mirovanja, pa se `resetAt`
   mora zabilježiti ranije u toj funkciji — promjena kritične putanje otpornosti koja
   treba biti u zasebnom pregledanom PR-u. Do tada ponovni ulazak čeka istek razdoblja mirovanja veze
   (koje već daje prednost uzvodnim naznakama `Retry-After` kada ih pružatelj pošalje).

### Sprječavanje osciliranja

Razina koja je upravo poništena ponovno se prihvaća samo iznad `reentryMinRemainingPercent` (zadano 5),
dok veza koja je već u upotrebi mora ostati samo iznad `exitCutoffPercent` (zadano 2,
što odgovara `quotaPreflight.defaultThresholdPercent`). Razlika je pojas histereze — bez
njega veza koja se zadržava oko granične vrijednosti oscilira između razina u uzastopnim zahtjevima.

## Konfiguracija

Samo fino podešavanje. Namjerno **ne postoji** oznaka `enabled`: prekidač kojim bi se ovo moglo isključiti
omogućio bi da `auto/subscription` neprimjetno poslužuje cijeli skup — uključujući modele koji se plaćaju — pod
nazivom koji obećava suprotno.

```jsonc
{
  "subscriptionLadder": {
    "exitCutoffPercent": 2,
    "reentryMinRemainingPercent": 5,
    "rungBudgetUsd": { "cheap": 5.0, "premium": 0 }, // 0 potpuno onemogućuje prečku
  },
}
```

Ograničavanje na temelju proračuna neaktivno je dok se ne poveže razrješivač potrošnje: bez dostupnog obračuna plaćena
prečka uključena je u redoslijed, ali nikad nije ograničena. Od v3.8.51 postavku `rungBudgetUsd` prihvaća
shema, ali se ona još NE primjenjuje — smatrajte je rezerviranom konfiguracijom, a ne aktivnim ograničenjem potrošnje. Redoslijed prečki, iscrpljivanje na temelju kvote i ponovni ulazak nakon poništavanja
funkcioniraju bez nje.

## Kompozicija

`subscription` i `thrifty` vrijednosti su tipa `AutoTier`, pa se mogu kombinirati sa svakom kategorijom:
`auto/coding:thrifty`, `auto/reasoning:subscription` i tako dalje. Dva ravna identifikatora
(`auto/subscription`, `auto/thrifty`) oglašavaju se u `/v1/models` i na nadzornoj ploči.

Nijedan identifikator ne pripada plaćenoj razini, pa `isPaidTierAutoId()` za oba vraća `false`, a
`auto/subscription` ostaje dostupan uz `hidePaidModels`.

## Gdje se nalazi kôd

| Područje                                       | Datoteka                                            |
| ---------------------------------------------- | --------------------------------------------------- |
| Kurirane činjenice o naplati                   | `open-sse/config/connectionBillingCatalog.ts`       |
| Klasifikator                                   | `open-sse/services/autoCombo/connectionBilling.ts`  |
| Prečke, oba grupiranja i ponovni ulazak        | `open-sse/services/autoCombo/subscriptionLadder.ts` |
| Povezivanje sa skupom kandidata                | `open-sse/services/autoCombo/virtualFactory.ts`     |
| Zastarjelost predmemorije svjesna poništavanja | `open-sse/services/autoCombo/freeAccessQuota.ts`    |
| Površina razine                                | `open-sse/services/autoCombo/suffixComposition.ts`  |
| Oglašeni identifikatori                        | `open-sse/services/autoCombo/builtinCatalog.ts`     |
| Testovi                                        | `tests/unit/autoCombo/subscription-ladder.test.ts`  |
