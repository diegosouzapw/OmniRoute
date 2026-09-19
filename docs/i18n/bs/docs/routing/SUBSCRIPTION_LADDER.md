# SUBSCRIPTION_LADDER (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/SUBSCRIPTION_LADDER.md) · 🇪🇹 [am](../../../am/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇦 [ar](../../../ar/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇿 [az](../../../az/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇬 [bg](../../../bg/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇩 [bn](../../../bn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇿 [cs](../../../cs/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇰 [da](../../../da/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇪 [de](../../../de/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇷 [el](../../../el/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇸 [es](../../../es/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇪 [et](../../../et/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇷 [fa](../../../fa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇮 [fi](../../../fi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇷 [fr](../../../fr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇪 [ga](../../../ga/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [gu](../../../gu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ha](../../../ha/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇱 [he](../../../he/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [hi](../../../hi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇷 [hr](../../../hr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇺 [hu](../../../hu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇲 [hy](../../../hy/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇩 [id](../../../id/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ig](../../../ig/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇹 [it](../../../it/docs/routing/SUBSCRIPTION_LADDER.md) · 🇯🇵 [ja](../../../ja/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇪 [ka](../../../ka/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇭 [km](../../../km/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [kn](../../../kn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇷 [ko](../../../ko/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇹 [lt](../../../lt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇻 [lv](../../../lv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ml](../../../ml/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [mr](../../../mr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇾 [ms](../../../ms/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇹 [mt](../../../mt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇲 [my](../../../my/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇵 [ne](../../../ne/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇱 [nl](../../../nl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇴 [no](../../../no/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [or](../../../or/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [pa](../../../pa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇭 [phi](../../../phi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇱 [pl](../../../pl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇹 [pt](../../../pt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇴 [ro](../../../ro/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇺 [ru](../../../ru/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇰 [si](../../../si/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇰 [sk](../../../sk/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇮 [sl](../../../sl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇸 [sr](../../../sr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇪 [sv](../../../sv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇪 [sw](../../../sw/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ta](../../../ta/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [te](../../../te/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇭 [th](../../../th/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇷 [tr](../../../tr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇰 [ur](../../../ur/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇿 [uz](../../../uz/docs/routing/SUBSCRIPTION_LADDER.md) · 🇻🇳 [vi](../../../vi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [yo](../../../yo/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/SUBSCRIPTION_LADDER.md)

---

# Usmjeravanje temeljeno na pretplati

> Dva nova `auto/*` ID-a — `auto/subscription` i `auto/thrifty`. Oba su opcionalna i zahtijevaju eksplicitni poziv: ništa se ne usmjerava kroz njih osim ako pozivatelj ne zatraži ID po imenu, i nijedan postojeći skup (pool), strategija ili zadana postavka se ne mijenjaju.

## Zašto ovo postoji

OmniRoute već odgovara na dva pitanja o troškovima, a nijedno od njih nije ono koje većina operatera postavlja.

| Postojeći mehanizam                                      | Odgovara na                                      |
| -------------------------------------------------------- | ------------------------------------------------ |
| `hidePaidModels` (`autoCombo/paidModelFilter.ts`)        | "je li ovaj model katalogiziran kao besplatan?"  |
| `freeAccessPolicy: "strict"` (`strictZeroCostFilter.ts`) | "može li mi ova veza ikada naplatiti?"           |
| `quotaPreflight` (`combo/quotaExhaustionCutoff.ts`)      | "je li ova veza blizu svog ograničenja?"         |
| `budgetCap` / `budgetFallback` (`autoCombo/engine.ts`)   | "ograniči potrošnju, degradiraj na najjeftinije" |

Svaki mehanizam isključivo za besplatne opcije **zatvara se u slučaju neuspjeha** — iscrpljen besplatni skup je prazan skup, nikada ne prelazi na plaćenu opciju — a svaki mehanizam na strani plaćanja je agnostičan prema razini. Nijedan ne odgovara na:

> "Iskoristi kvotu koju već plaćam. Kada se potroši, ili stani, ili pređi na sljedeću razinu jednu po jednu kroz najjeftinije plaćene opcije — i vrati se čim se kvota resetira."

## Naplata je činjenica veze, a ne činjenica modela

`classifyTier()` (`open-sse/services/tierResolver.ts`) koristi `(provider, model)` kao ključ i vraća `free | cheap | premium` iz kataloga cijena. Ali hoće li zahtjev koštati dodatni novac ovisi o tome **koja ga veza poslužuje**: isti model je uključen u plan putem Claude Code OAuth veze, a naplaćuje se po tokenu putem veze s API ključem.

`provider_connections.auth_type` nije siguran pokazatelj ni u jednom smjeru — postoje OAuth veze s naplatom po potrošnji, i postoje veze s API ključem koje su uključene u plan (Copilot seat token nije API ključ s naplatom po potrošnji). Dakle, klasa naplate dolazi iz **kuriranog kataloga**, `open-sse/config/connectionBillingCatalog.ts`, ručno postavljenog prema objavljenim uvjetima svakog pružatelja usluga — isti uzorak koji je `FreeModelBudget.hardStopGuaranteed` već uspostavio za besplatne modele.

```ts
type ConnectionBillingClass = "subscription" | "metered" | "keyless" | "unknown";
type ConnectionOverageBehavior = "hard-stop" | "meters-to-paid" | "unknown";
```

Redoslijed razrješenja (`autoCombo/connectionBilling.ts`): sintetički sentinel bez autorizacije → `keyless`; unos u katalogu koji odgovara pružatelju **i** `authType`-u; unos za cijelog pružatelja; u suprotnom `unknown`. **Nekurirano ne znači besplatno** — `unknown` se svugdje tretira kao `metered`, tako da pružatelj dodan sutra počinje izvan razine pretplate i mora se namjerno kurirati.

## Model razina (rung model)

Pet razina u redoslijedu eskalacije. Razlikuju se po više od cijene — svaka ima **vlastiti** signal iscrpljenosti, zbog čega ovo nije samo sortiranje.

| #   | Razina         | Članstvo                                        | Iscrpljeno kada               |
| --- | -------------- | ----------------------------------------------- | ----------------------------- |
| 0   | `subscription` | kurirano `billing: "subscription"`              | prozor kvote na/ispod granice |
| 1   | `keyless`      | sintetička putanja bez autorizacije             | hlađenje veze / prekidač      |
| 2   | `free`         | veza s naplatom, `classifyTier() === "free"`    | besplatna kvota iscrpljena    |
| 3   | `cheap`        | veza s naplatom, `classifyTier() === "cheap"`   | budžet po razini potrošen     |
| 4   | `premium`      | veza s naplatom, `classifyTier() === "premium"` | budžet po razini potrošen     |

Razine 0-2 se iscrpljuju na temelju **kvote**, koja je vidljiva i već se prati. Razine 3-4 nemaju kvotu — plaćena veza poslužuje zauvijek — pa je njihov jedini razuman signal iscrpljenosti **budžet** po razini. Bez njega, "eskaliraj kada je cheap iscrpljen" nema okidač.

## `auto/subscription` — zatvaranje pri neuspjehu

Pool = samo rung 0, ograničen na konekcije čije prekoračenje je dokumentovani `hard-stop`, pri čemu je za svaku uživo potvrđeno da ima prostora u kvoti. Sve što je dvosmisleno je isključeno: neprovjeren provajder, neprovjerljivo očitanje kvote, zastarjelo očitanje ili prekoračenje koje se naplaćuje.

Prazan pool je **namjeravan** odgovor, a ne greška — postojeća putanja za prazan pool kod pozivaoca pretvara ga u jasnu grešku umjesto u tihi, naplativi rezervni plan. To je cijelo obećanje ovog id-a.

`keyless` namjerno **ne** ispunjava uslove: ovo grupisanje znači "plan koji plaćam", tako da backend bez autentifikacije ne pripada ovdje. Za to koristite `auto/thrifty` (ili `auto/best-free`).

### Sigurnost konekcije

Kandidat nije uvijek vezan za jednu konekciju — logički kandidat nosi `allowedConnectionIds` listu dozvoljenih, a nalog koji se stvarno koristi bira se kasnije, prilikom slanja (dispatch), od strane `open-sse/services/combo/autoStrategy.ts`. Obje grupacije stoga verifikuju **svaku konekciju pojedinačno** i prepisuju `allowedConnectionIds` na tačno preživjeli podskup — nikada na punu originalnu listu, nikada na jednog nasumično odabranog člana. Budući da `autoStrategy.ts` već nameće taj niz kao strogu listu dozvoljenih, njegovo prepisivanje ovdje čini "verifikovano" i "stvarno korišteno" istim skupom po konstrukciji. Ovo je isti invarijant, i isto obrazloženje, kao i [STRICT_ZERO_COST](./STRICT_ZERO_COST.md).

## `auto/thrifty` — eskalacija jedan po jedan rung

Pool = svi rungovi, poredani po indeksu runga, sa isključenim iscrpljenim kandidatima. `auto` mehanizam i dalje boduje **unutar** preživjelog poola: ljestvica odlučuje koji su rungovi u igri, bodovanje odlučuje koji kandidat pobjeđuje unutar njih. Redoslijed je stabilan unutar runga, tako da scorer-ovo vlastito rangiranje nikada ne biva promijenjeno ovim slojem (overlay).

Ovo je sloj za redoslijed + filtriranje (gating), **ne** novi dispečer: spekulativna petlja u `combo.ts` već prolazi kroz ciljeve redom i prelazi na sljedeći u slučaju neuspjeha, tako da iscrpljenost tokom izvršavanja (runtime) koju preflight nije uhvatio i dalje eskalira na sljedeći rung unutar istog zahtjeva.

Tamo gdje `auto/subscription` zatvara pri neuspjehu (fails closed), `auto/thrifty` otvara pri neuspjehu (fails open): konekcija uključena u plan bez upotrebljivog očitanja kvote se i dalje prvo isprobava. Isprobavanje ne košta ništa, a ako se ispostavi da je iscrpljena, prelazak (fall-through) ionako stiže do sljedećeg runga — dok bi odbijanje pokušaja poslalo zahtjev na plaćeni rung zbog nedostajuće telemetrije, što je upravo ishod koji grupisanje postoji da izbjegne.

## Povratak na plan nakon resetovanja

Tri nezavisne stvari moraju isteći prije nego što se rutiranje vrati na rung 0. Popravljanje samo jedne ostavlja ljestvicu zaglavljenu na plaćenim rungovima dugo nakon što se plan dopunio.

1. **Keš stanja kvote** — `freeAccessQuota.ts` kešira po `(provider, connection)` sa TTL-om od 180s. Keširani unos čiji je vlastiti `resetAt` već prošao opisuje prozor koji više ne postoji, pa se sada tretira kao zastario **bez obzira na starost** i prisiljava na osvježavanje. Bez ovoga, plan koji se dopunio u ponoć nastavlja čitati kao iscrpljen sve dok TTL ne istekne.
2. **Vlastito stanje ljestvice** — ne postoji, po dizajnu. Kvalifikovanost za rung se ponovo izračunava iz stanja kvote uživo pri svakoj izgradnji poola; ne postoji trajni zapis "trenutno na rungu 3" koji bi mogao nadživjeti resetovanje i zaglaviti rutiranje.
3. **Cooldown konekcije** — iscrpljujući 429 postavlja `rateLimitedUntil` iz eksponencijalnog backoff-a, što za konekciju plana može premašiti stvarno resetovanje. `clampCooldownToReset()` (`subscriptionLadder.ts`) sužava cooldown na trenutak resetovanja samog upstream-a i nikada ga ne može produžiti. **Implementirano je i testirano, ali još nije povezano**: keš kvote se invalidira u `src/sse/services/auth.ts` _prije_ nego što se upiše bilo kakav cooldown, tako da se `resetAt` mora uhvatiti ranije u toj funkciji — promjena na kritičnoj putanji otpornosti (resilience hot path) koja pripada vlastitom pregledanom PR-u. Do tada, ponovni ulazak čeka da prođe cooldown konekcije (koji već preferira upstream `Retry-After` savjete kada ih provajder pošalje).

### Anti-flap

Rung koji se upravo resetovao ponovo se prihvata samo iznad `reentryMinRemainingPercent` (zadano 5), dok konekcija koja je već u igri mora samo ostati iznad `exitCutoffPercent` (zadano 2, što odgovara `quotaPreflight.defaultThresholdPercent`). Razmak je histerezni pojas — bez njega, konekcija koja lebdi na granici osciluje između rungova pri uzastopnim zahtjevima.

## Konfiguracija

Samo podešavanje. Namjerno **nema** `enabled` zastavice: prekidač koji bi ih isključio ostavio bi `auto/subscription` da tiho poslužuje cijeli skup — uključujući plaćene modele — pod nazivom koji obećava suprotno.

```jsonc
{
  "subscriptionLadder": {
    "exitCutoffPercent": 2,
    "reentryMinRemainingPercent": 5,
    "rungBudgetUsd": { "cheap": 5.0, "premium": 0 }, // 0 potpuno onemogućava nivo
  },
}
```

Ograničavanje budžeta je neaktivno dok se ne poveže rješavač potrošnje: bez dostupnog računovodstva, plaćeni nivo se naručuje, ali nikada ne ograničava. Od verzije v3.8.51, postavka `rungBudgetUsd` je prihvaćena od strane sheme, ali JOŠ NIJE primijenjena — tretirajte je kao rezervisanu konfiguraciju, a ne kao aktivno ograničenje potrošnje. Redoslijed nivoa, iscrpljivanje na osnovu kvote i ponovni ulazak nakon resetovanja rade i bez toga.

## Kompozicija

`subscription` i `thrifty` su `AutoTier` vrijednosti, pa se komponuju sa svakom kategorijom: `auto/coding:thrifty`, `auto/reasoning:subscription` i tako dalje. Dva ravna ID-a (`auto/subscription`, `auto/thrifty`) su reklamirana u `/v1/models` i na kontrolnoj tabli.

Nijedan ID nije plaćeni nivo, pa `isPaidTierAutoId()` vraća `false` za oba, a `auto/subscription` preživljava `hidePaidModels`.

## Gdje se nalazi kod

| Oblast                                | Datoteka                                            |
| ------------------------------------- | --------------------------------------------------- |
| Odabrane činjenice o naplati          | `open-sse/config/connectionBillingCatalog.ts`       |
| Klasifikator                          | `open-sse/services/autoCombo/connectionBilling.ts`  |
| Nivoi, obje grupe, ponovni ulaz       | `open-sse/services/autoCombo/subscriptionLadder.ts` |
| Povezivanje u skup kandidata          | `open-sse/services/autoCombo/virtualFactory.ts`     |
| Zastarjelost keša svjesna resetovanja | `open-sse/services/autoCombo/freeAccessQuota.ts`    |
| Površina nivoa                        | `open-sse/services/autoCombo/suffixComposition.ts`  |
| Reklamirani ID-ovi                    | `open-sse/services/autoCombo/builtinCatalog.ts`     |
| Testovi                               | `tests/unit/autoCombo/subscription-ladder.test.ts`  |
