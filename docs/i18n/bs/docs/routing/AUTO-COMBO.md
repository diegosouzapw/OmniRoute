# OmniRoute Auto-Combo Engine (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/AUTO-COMBO.md) · 🇪🇹 [am](../../../am/docs/routing/AUTO-COMBO.md) · 🇸🇦 [ar](../../../ar/docs/routing/AUTO-COMBO.md) · 🇦🇿 [az](../../../az/docs/routing/AUTO-COMBO.md) · 🇧🇬 [bg](../../../bg/docs/routing/AUTO-COMBO.md) · 🇧🇩 [bn](../../../bn/docs/routing/AUTO-COMBO.md) · 🇨🇿 [cs](../../../cs/docs/routing/AUTO-COMBO.md) · 🇩🇰 [da](../../../da/docs/routing/AUTO-COMBO.md) · 🇩🇪 [de](../../../de/docs/routing/AUTO-COMBO.md) · 🇬🇷 [el](../../../el/docs/routing/AUTO-COMBO.md) · 🇪🇸 [es](../../../es/docs/routing/AUTO-COMBO.md) · 🇪🇪 [et](../../../et/docs/routing/AUTO-COMBO.md) · 🇮🇷 [fa](../../../fa/docs/routing/AUTO-COMBO.md) · 🇫🇮 [fi](../../../fi/docs/routing/AUTO-COMBO.md) · 🇫🇷 [fr](../../../fr/docs/routing/AUTO-COMBO.md) · 🇮🇪 [ga](../../../ga/docs/routing/AUTO-COMBO.md) · 🇮🇳 [gu](../../../gu/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ha](../../../ha/docs/routing/AUTO-COMBO.md) · 🇮🇱 [he](../../../he/docs/routing/AUTO-COMBO.md) · 🇮🇳 [hi](../../../hi/docs/routing/AUTO-COMBO.md) · 🇭🇷 [hr](../../../hr/docs/routing/AUTO-COMBO.md) · 🇭🇺 [hu](../../../hu/docs/routing/AUTO-COMBO.md) · 🇦🇲 [hy](../../../hy/docs/routing/AUTO-COMBO.md) · 🇮🇩 [id](../../../id/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ig](../../../ig/docs/routing/AUTO-COMBO.md) · 🇮🇹 [it](../../../it/docs/routing/AUTO-COMBO.md) · 🇯🇵 [ja](../../../ja/docs/routing/AUTO-COMBO.md) · 🇬🇪 [ka](../../../ka/docs/routing/AUTO-COMBO.md) · 🇰🇭 [km](../../../km/docs/routing/AUTO-COMBO.md) · 🇮🇳 [kn](../../../kn/docs/routing/AUTO-COMBO.md) · 🇰🇷 [ko](../../../ko/docs/routing/AUTO-COMBO.md) · 🇱🇹 [lt](../../../lt/docs/routing/AUTO-COMBO.md) · 🇱🇻 [lv](../../../lv/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ml](../../../ml/docs/routing/AUTO-COMBO.md) · 🇮🇳 [mr](../../../mr/docs/routing/AUTO-COMBO.md) · 🇲🇾 [ms](../../../ms/docs/routing/AUTO-COMBO.md) · 🇲🇹 [mt](../../../mt/docs/routing/AUTO-COMBO.md) · 🇲🇲 [my](../../../my/docs/routing/AUTO-COMBO.md) · 🇳🇵 [ne](../../../ne/docs/routing/AUTO-COMBO.md) · 🇳🇱 [nl](../../../nl/docs/routing/AUTO-COMBO.md) · 🇳🇴 [no](../../../no/docs/routing/AUTO-COMBO.md) · 🇮🇳 [or](../../../or/docs/routing/AUTO-COMBO.md) · 🇮🇳 [pa](../../../pa/docs/routing/AUTO-COMBO.md) · 🇵🇭 [phi](../../../phi/docs/routing/AUTO-COMBO.md) · 🇵🇱 [pl](../../../pl/docs/routing/AUTO-COMBO.md) · 🇵🇹 [pt](../../../pt/docs/routing/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/AUTO-COMBO.md) · 🇷🇴 [ro](../../../ro/docs/routing/AUTO-COMBO.md) · 🇷🇺 [ru](../../../ru/docs/routing/AUTO-COMBO.md) · 🇱🇰 [si](../../../si/docs/routing/AUTO-COMBO.md) · 🇸🇰 [sk](../../../sk/docs/routing/AUTO-COMBO.md) · 🇸🇮 [sl](../../../sl/docs/routing/AUTO-COMBO.md) · 🇷🇸 [sr](../../../sr/docs/routing/AUTO-COMBO.md) · 🇸🇪 [sv](../../../sv/docs/routing/AUTO-COMBO.md) · 🇰🇪 [sw](../../../sw/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ta](../../../ta/docs/routing/AUTO-COMBO.md) · 🇮🇳 [te](../../../te/docs/routing/AUTO-COMBO.md) · 🇹🇭 [th](../../../th/docs/routing/AUTO-COMBO.md) · 🇹🇷 [tr](../../../tr/docs/routing/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/AUTO-COMBO.md) · 🇵🇰 [ur](../../../ur/docs/routing/AUTO-COMBO.md) · 🇺🇿 [uz](../../../uz/docs/routing/AUTO-COMBO.md) · 🇻🇳 [vi](../../../vi/docs/routing/AUTO-COMBO.md) · 🇳🇬 [yo](../../../yo/docs/routing/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/AUTO-COMBO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/AUTO-COMBO.md)

---

> **Za korisnike**: Tražite brzi početak? Pogledajte [Korisnički vodič za Auto-Combo](../getting-started/AUTO-COMBO-GUIDE.md) za jednostavna objašnjenja i primjere.

> Samoupravljajući lanci modela s adaptivnim bodovanjem + automatskim usmjeravanjem bez konfiguracije

## Automatsko usmjeravanje bez konfiguracije (`auto/` prefiks)

> **NOVO:** Kreiranje kombinacije nije potrebno. Koristite `auto/` prefiks direktno u bilo kojem klijentu.

### Brzi primjeri

| ID modela      | Varijanta | Ponašanje                                                                           |
| -------------- | --------- | ----------------------------------------------------------------------------------- |
| `auto`         | zadana    | Svi povezani pružaoci, LKGP strategija, uravnotežene težine                         |
| `auto/coding`  | coding    | Težine usmjerene na kvalitet, pogodno za generisanje koda                           |
| `auto/fast`    | fast      | Ponderisani odabir s malom latencijom                                               |
| `auto/cheap`   | cheap     | Usmjeravanje optimizirano prema trošku (prvo najniži trošak)                        |
| `auto/offline` | offline   | Daje prednost pružaocima s najvećom dostupnošću kvote                               |
| `auto/smart`   | smart     | Kvalitet na prvom mjestu + viša stopa istraživanja (10%) za bolje otkrivanje modela |
| `auto/lkgp`    | lkgp      | Eksplicitni LKGP (isto kao zadani `auto`)                                           |
| `auto/chaos`   | chaos     | Paralelno slanje, jedan model po pružaocu (nije ubrizgavanje grešaka)               |

### Kompozicija kategorije × nivoa (`auto/<category>:<tier>`)

Sufiksi u stilu OpenRoutera razdvajaju **koju vrstu rute** (kategoriju) od toga **kako je optimizirati** (nivo), tako da ih možete slobodno kombinovati (#4235 Phase B, `open-sse/services/autoCombo/suffixComposition.ts`):

- **Kategorije** (filtriraju skup kandidata prema mogućnostima): `coding` · `reasoning` · `vision` · `chat` · `multimodal`. `vision`/`multimodal` zadržavaju modele koji podržavaju vizuelne ulaze; `reasoning` zadržava modele za rezonovanje/razmišljanje.
- **Nivoi** (odabiru težine bodovanja / filter skupa): `fast` (brza isporuka) · `cheap` (alias `floor`, ušteda troškova) · `reliable` (stanje zaštitnog prekidača + stabilnost latencije) · `free` / `pro` (filtriraju skup prema nivou modela putem `classifyTier` — besplatni nivo naspram premium nivoa).

| Primjer                | Razrješava se u                                                         |
| ---------------------- | ----------------------------------------------------------------------- |
| `auto/coding:fast`     | skup za kodiranje, težine usmjerene na malu latenciju                   |
| `auto/coding:cheap`    | skup za kodiranje, optimiziran prema trošku (alias `auto/coding:floor`) |
| `auto/reasoning:pro`   | samo modeli za rezonovanje/razmišljanje, premium nivo                   |
| `auto/vision`          | modeli koji podržavaju vizuelne ulaze (bez nivoa → uravnotežene težine) |
| `auto/multimodal:free` | modeli s multimodalnim mogućnostima, samo besplatni nivo                |

Svaki važeći `auto/<category>[:<tier>]` razrješava se na zahtjev; odabrani podskup oglašava se u `/v1/models` i na kontrolnoj ploči (`AUTO_SUFFIX_VARIANTS` u `open-sse/services/autoCombo/builtinCatalog.ts`). Filtriranje je **otvoreno u slučaju greške** — ako nijedan povezani model ne odgovara ograničenju, koristi se cijeli skup kako se usmjeravanje nikada ne bi prekinulo. Osnovni sistem bodovanja (`combo.ts`) ostaje nepromijenjen; filter kategorije/nivoa primjenjuje se u `buildAutoCandidates`.

> **Informacije o modelima uživo:** prikladnost za automatsko usmjeravanje zasniva se na aktuelnim **Arena ELO** rangiranjima + podacima o nivoima iz **models.dev** kada je zastavica `ARENA_ELO_SYNC_ENABLED` uključena (u suprotnom se koristi statička mapa prikladnosti).

**Kako koristiti:**

```bash
# Bilo koji IDE ili CLI alat koji podržava OpenAI format
Osnovni URL: http://localhost:20128/v1
API ključ:   <ključ-vaše-krajnje-tačke>

# U svom kodu/konfiguraciji postavite model na:
model: "auto"                 # uravnotežena zadana postavka
model: "auto/coding"          # najbolje za zadatke kodiranja
model: "auto/fast"            # najbrže dostupno
model: "auto/cheap"           # najjeftinije po tokenu
```

**Šta se dešava:**

1. OmniRoute otkriva `auto/` prefiks u `src/sse/handlers/chat.ts`
2. Iz baze podataka dohvaća sve **aktivne veze s pružaocima**
3. Filtrira one s važećim vjerodajnicama (API ključ ili OAuth token)
4. Određuje model po vezi (`connection.defaultModel` ili prvi model pružaoca)
5. Izgrađuje **virtuelnu kombinaciju** u memoriji (ne pohranjuje se u bazu podataka)
6. Usmjerava pomoću profila težina odabrane varijante + LKGP strategije

**Ključne osobine:**

- ✅ **Uvijek aktivno:** Nisu potrebni prekidač, kreiranje kombinacije ni konfiguracija
- ✅ **Dinamično:** Automatski odražava trenutno povezane pružaoce
- ✅ **Postojanost sesije:** LKGP osigurava da posljednji uspješni pružalac ima prioritet
- ✅ **Podrška za više računa:** Svaka veza s pružaocem postaje zaseban kandidat
- ✅ **Bez upisa u bazu podataka:** Virtuelna kombinacija postoji samo tokom zahtjeva, bez troška trajne pohrane

### Kontrola kandidata po ključu (#7819, nivoi 1+2)

`GET /v1/auto-combo/{channel}/candidates` (`{channel}` = sufiks nakon `auto/`, ili
doslovni `auto` za osnovni kanal) je krajnja tačka **samo za čitanje** koja navodi
trenutni skup kandidata `auto/*` kanala, dopunjen informacijama o dostupnosti uživo,
ponovno koristeći postojeća očitanja otpornosti (nikada sirovi `state` prekidača):

- zaštitni prekidač pružaoca — `getCircuitBreaker(provider).getStatus()` / `.canExecute()`
- period mirovanja veze — `rateLimitedUntil` / `testStatus` u razriješenom
  redu `provider_connections`
- blokada modela — `isModelLocked(provider, connectionId, model)`

Svaki kandidat također sadrži zastavicu `excluded` ovog API ključa. Izuzeci se
pohranjuju zasebno za svaki API ključ (tabela `auto_candidate_overrides`, migracija
`128`) — OmniRoute koristi jednog korisnika i nema tabelu `users`, pa je `apiKeyId`
najbliži stvarni identitet pojedinačnog pozivaoca — te se primjenjuju na centralnoj
tački skupa kandidata u `open-sse/services/autoCombo/virtualFactory.ts` putem čiste,
jedinično testirane funkcije `filterExcludedCandidates()`
(`open-sse/services/autoCombo/candidateOverrides.ts`). Filter je **otvoren u slučaju
greške**: nepostavljen apiKeyId/kanal ili neuspjelo pretraživanje baze podataka
ostavljaju skup nefiltriranim, tako da operater bez konfiguriranih izuzetaka dobija
usmjeravanje koje je na nivou bajtova identično ponašanju prije ove funkcionalnosti.

**Odgođeno za naknadni problem:** težine po kandidatu + eksplicitno redoslijedanje (Nivo 3
— uključuje se u postojeće putanje strategija ponderisanja/prioriteta) i fiksiranje određene
`combo.ts` strategije po `auto/*` kanalu (Nivo 4). Pogledajte plan #7819 za otvoreno
pitanje trebaju li nadjačavanja ostati po API ključu ili postati globalna s obzirom na
model jednog zakupca.

**Iza kulisa:**

```txt
Zahtjev: { model: "auto/coding" }
   ↓
src/sse/handlers/chat.ts otkriva prefiks
   ↓
createVirtualAutoCombo('coding') → candidatePool iz aktivnih veza
   ↓
handleComboChat (isti mehanizam kao za trajno pohranjene kombinacije)
   ↓
Automatsko bodovanje odabire najboljeg pružatelja/model za svaki zahtjev
```

**Implementacijske datoteke:**

| Datoteka                                                  | Svrha                                          |
| --------------------------------------------------------- | ---------------------------------------------- |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Parser prefiksa (`parseAutoPrefix`)            |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Kreira virtualne `AutoComboConfig` objekte     |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Testna kuka za imitiranje registra pružatelja  |
| `src/sse/handlers/chat.ts`                                | Integracija: kratki spoj za automatski prefiks |
| `src/shared/constants/providers.ts`                       | Sistemski unos `SYSTEM_PROVIDERS.auto`         |

## Nazivi kombinacija koji odgovaraju stvarnom ID-u modela

Kombinacija čiji je `name` identičan osnovnom ID-u modela (npr. kombinacija nazvana
`gpt-5.5`) predstavlja **namjeran, podržan obrazac**, a ne grešku: to je
mehanizam za rezervni odabir pružaoca po ID-u modela, dokumentovan u
[#6940](https://github.com/diegosouzapw/OmniRoute/issues/6940). Budući da se
razrješavanje kombinacije provjerava prije razrješavanja osnovnog ID-a modela
(`getComboForModel()` u `src/sse/services/model.ts`), zahtjev za osnovni
ID `gpt-5.5` usmjerava se kroz ciljeve kombinacije (npr.
`acme-responses/gpt-5.5`, `backup-responses/gpt-5.5`) umjesto direktno prema
jednom pružaocu — time se ponovo koristi prvenstvo kombinacije nad prepisivanjem, napravljeno za
[#3227/#3233](https://github.com/diegosouzapw/OmniRoute/issues/3227), a regresijsko
testiranje obavljaju `tests/unit/responses-combo-resolution-3227.test.ts` i
`tests/unit/combo-name-codex-responses-rewrite.test.ts`.

Kreiranje ili preimenovanje kombinacije tako da njen naziv zasjeni stvarni ID modela
**nikada se ne odbija** — time bi se prekinuo ovaj dokumentovani tok rada. Umjesto
toga (#8530), `POST /api/combos` i `PUT /api/combos/[id]` odgovoru dodaju
neblokirajuće polje `warning` kada se (novi) naziv podudara sa stvarnim
ID-om modela:

```json
{
  "warning": {
    "code": "COMBO_NAME_SHADOWS_MODEL",
    "modelId": "gpt-5.5",
    "providerId": "openai"
  }
}
```

Prilikom pokretanja, `scanComboModelNameCollisionsAtBoot()`
(`src/instrumentation-node.ts`) također zapisuje jednolinijsko `[STARTUP]` upozorenje
koje navodi svaku postojeću kombinaciju koja zasjenjuje ID modela, tako da operateri koji
na ovo naiđu slučajno (umjesto namjerno, prema #6940) dobiju signal.
Pomoćna funkcija za otkrivanje nalazi se u `src/lib/combos/modelNameCollision.ts`.

## Pozivanje prilagođene kombinacije iz klijenta

Sačuvane kombinacije (Postavke → Kombinacije) koriste se samo kada klijent pošalje **tačan naziv** kombinacije u polju `model` — nema približnog ni djelimičnog podudaranja naziva kombinacije i ne koristi se prefiks `auto/`. Redoslijed razrješavanja (`getComboForModel()` u `src/sse/services/model.ts`):

1. tačno podudaranje naziva kombinacije (`model: "my-combo"`),
2. prefiks `combo/<name>` (`model: "combo/my-combo"`),
3. glob mapiranja modela na kombinaciju (`/api/model-combo-mappings`).

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"my-combo","messages":[{"role":"user","content":"Hello"}]}'
```

Dvije česte zamke:

- **`auto` ne koristi vaše kombinacije.** `auto`/`auto/*` gradi vlastiti skup kandidata bez konfiguracije i provjerava sačuvane kombinacije samo ako je neka kombinacija doslovno nazvana `auto` (nije preporučeno). Za usmjeravanje kroz kombinaciju pošaljite njen tačan naziv — ne `auto`.
- **`openrouter/auto` je stvarni plaćeni OpenRouter proizvod** („Auto Best Available“), a ne OmniRoute alias. To je jedini statički unos modela u OpenRouter registru (`open-sse/config/providers/registry/openrouter/index.ts`) i naplaćuje se zasebno. Koristite Postavke → Usmjeravanje → Sakrij plaćene modele kako biste ga isključili iz `auto` skupova.

Pogledajte [#7992](https://github.com/diegosouzapw/OmniRoute/issues/7992) i [#7111](https://github.com/diegosouzapw/OmniRoute/issues/7111) za prvobitnu zabunu koju ovo dokumentuje.

## Kako funkcioniše (trajne automatske kombinacije)

Mehanizam automatskih kombinacija dinamički bira najboljeg pružaoca/model za svaki zahtjev pomoću **funkcije bodovanja sa 16 faktora** (definisane u `open-sse/services/autoCombo/scoring.ts` → `DEFAULT_WEIGHTS`). Zbir podrazumijevanih težina iznosi `1.0`; prilagođene težine ponovo se normalizuju pomoću `normalizeScoringWeights()`. Dva od šesnaest faktora — `cacheAffinity` i `resetWindowAffinity` — imaju podrazumijevanu težinu `0`; `reliability` ima vrijednost `0` u `DEFAULT_WEIGHTS`, ali `0.03` u generičkim paketima i `0.04` u paketu `reliability-first`, dok `quality` u paketima ima vrijednost `0.02` (`0.03` u paketu `quality-first`): oni se ipak izračunavaju za svakog kandidata, a `cacheAffinity` upravlja deduplikacijom predmemorije upita izvan rezultata, tako da faktori s podrazumijevanom vrijednošću nula jednostavno ne utiču na rezultat prema zadanim postavkama, dok u paketima utiču.

![Bodovanje automatskih kombinacija sa 16 faktora](../diagrams/exported/auto-combo-scoring.svg)

> Izvor: [diagrams/auto-combo-scoring.mmd](../diagrams/auto-combo-scoring.mmd) (ponovo generišite pomoću `npm run docs:render-diagrams`). Naziv datoteke je historijski; izvor i generisani dijagram prikazuju svih 16 faktora deklarisanih u `DEFAULT_WEIGHTS`.

| Faktor                | Podrazumijevana težina | Opis                                                                                                                                                                                                                                                |
| :-------------------- | :--------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `quota`               | 0.1429                 | Preostala kvota / raspoloživi prostor do ograničenja stope [0..1]                                                                                                                                                                                   |
| `health`              | 0.1605                 | Ocjena ispravnosti iz prekidača strujnog kola (CLOSED=1.0, HALF_OPEN=0.5, OPEN=0.0)                                                                                                                                                                 |
| `costInv`             | 0.1429                 | Inverzni **kombinovani** trošak (60% cijene ulaznih + 40% cijene izlaznih tokena, normalizovano) — jeftinije = viša ocjena                                                                                                                          |
| `latencyInv`          | 0.1143                 | Inverzna p95 latencija normalizovana prema skupu — brže = viša ocjena                                                                                                                                                                               |
| `taskFit`             | 0.0762                 | Prikladnost za vrstu zadatka (programiranje, pregled, planiranje, analiza, otklanjanje grešaka, dokumentacija)                                                                                                                                      |
| `stability`           | 0.0476                 | Stabilnost zasnovana na varijansi standardne devijacije latencije — kandidat čije vrijeme odgovora značajno varira dobija nižu ocjenu                                                                                                               |
| `tierPriority`        | 0.0476                 | Prioritet nivoa računa — Ultra=1.0, Pro=0.67, Standard=0.33, Free=0.0                                                                                                                                                                               |
| `tierAffinity`        | 0.0476                 | Podudarnost između nivoa kandidata i nivoa preporučenog u manifestu                                                                                                                                                                                 |
| `specificityMatch`    | 0.0476                 | Podudarnost između specifičnosti zahtjeva (naznake iz manifesta) i nivoa modela                                                                                                                                                                     |
| `contextAffinity`     | 0.0476                 | Podudarnost između potrebe zahtjeva za kontekstnim prozorom i kontekstnog prozora modela                                                                                                                                                            |
| `sessionAvailability` | 0.0476                 | Dostupnost OAuth sesije veze kandidata za ovu sesiju (`getOAuthSessionAvailability()`; veze koje ne koriste OAuth dobijaju ocjenu 1.0)                                                                                                              |
| `connectionDensity`   | 0.0476                 | Raspoređuje opterećenje između veza istog pružaoca (sprečavanje koncentracije)                                                                                                                                                                      |
| `cacheAffinity`       | 0.00                   | Podudarnost zasnovana na rendezvous raspršivanju prema vezi koja najvjerovatnije već sadrži prefiks predmemorije upita ovog zahtjeva (`open-sse/services/combo/promptCacheAffinity.ts`); podrazumijevano onemogućeno (#8008)                        |
| `resetWindowAffinity` | 0.00                   | Prednost vezama čiji je vremenski prozor za poništavanje kvote povoljan (podrazumijevano onemogućeno)                                                                                                                                               |
| `quality`             | 0.03                   | Signal kvaliteta izlaza zasnovan na povratnim informacijama iz sistema za praćenje kvaliteta događaja usmjeravanja; kandidati bez zapažanja dobijaju neutralnu vrijednost 0.5                                                                       |
| `reliability`         | 0.00                   | Zabilježeni udio uspješnosti, `1 - failureRate`, iz 24-satne historije korištenja uz minimalni prag od deset uzoraka (u suprotnom se koriste metrike u stvarnom vremenu); kandidati bez zapažanja imaju vrijednost 1.0. Podrazumijevano onemogućeno |

**Zbir:** `0.1429 + 0.1605 + 0.1429 + 0.1143 + 0.0762 + (7 × 0.0476) + 0.00 + 0.00 + 0.03 + 0.00 = 1.0`, kako je deklarisano u `DEFAULT_WEIGHTS`; težine koje konfiguriše korisnik ponovo se normalizuju u distribuciju pomoću `normalizeScoringWeights()` prije bodovanja.

## Paketi režima

6 unaprijed definiranih profila težina u `open-sse/services/autoCombo/modePacks.ts`. Svaki paket u potpunosti zamjenjuje zadane težine kako bi usmjerio odabir prema jednom cilju. Zbir svakog paketa već iznosi `1.0` (`0.9999` kada se prikaže na četiri decimale), tako da `normalizeScoringWeights()` nema ništa značajno ispraviti kada je paket aktivan — vrijednosti u nastavku su, uz zaokruživanje, one koje ocjenjivač primjenjuje.

| Faktor                | ship-fast  | cost-saver | quality-first | offline-friendly | reliability-first | chaos-mode |
| :-------------------- | :--------- | :--------- | :------------ | :--------------- | :---------------- | :--------- |
| `quota`               | 0.1133     | 0.1133     | 0.0752        | **0.3324**       | 0.1133            | 0.0376     |
| `health`              | 0.2667     | 0.1810     | 0.1714        | 0.2667           | **0.3524**        | **0.4000** |
| `costInv`             | 0.0276     | **0.3324** | 0.0276        | 0.0752           | 0.0181            | 0.0140     |
| `latencyInv`          | **0.3048** | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0186     |
| `taskFit`             | 0.0952     | 0.0952     | **0.3524**    | 0.0000           | 0.0952            | 0.1905     |
| `stability`           | 0.0000     | 0.0476     | 0.1429        | 0.0952           | 0.1905            | 0.1714     |
| `tierPriority`        | 0.0376     | 0.0376     | 0.0276        | 0.0376           | 0.0276            | 0.0040     |
| `tierAffinity`        | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `specificityMatch`    | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `contextAffinity`     | 0.0095     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0186     |
| `sessionAvailability` | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |
| `resetWindowAffinity` | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `connectionDensity`   | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |
| `quality`             | 0.02       | 0.02       | **0.03**      | 0.02             | 0.02              | 0.02       |
| `reliability`         | 0.03       | 0.03       | 0.03          | 0.03             | **0.04**          | 0.03       |

Napomene:

- **Paketi sadrže `quality` i `reliability`** (`quality 0.02`, `quality-first 0.03`; `reliability 0.03`, `reliability-first 0.04`) i u potpunosti zamjenjuju mapu težina (`weights = pack`, nije spajanje). `DEFAULT_WEIGHTS` sadrži `quality 0.03 / reliability 0`; odabir opcije `balanced`/`default` zadržava te zadane vrijednosti, dok odabir paketa koristi njegove gore navedene vrijednosti. U hladnom skupu (još nema opažanja, pa su vrijednosti `quality 0.5` i `reliability 1`) ova dva faktora dodaju `+0.04` uz generički paket (`0.03 + 0.01`), `+0.045` uz `quality-first` i `+0.05` uz `reliability-first`.
- `tierAffinity`, `specificityMatch` i `resetWindowAffinity` izričito su postavljeni na `0` u svakom paketu.
- Sažet pregled naglaska svakog paketa:
  - **ship-fast** → latencyInv 0.3048 + health 0.2667 (zdrave veze s malom latencijom)
  - **cost-saver** → costInv 0.3324 (najjeftiniji tokeni pobjeđuju)
  - **quality-first** → taskFit 0.3524 + stability 0.1429 + quality 0.03, najviše od svih paketa (najbolji model za zadatak, dosljedan)
  - **offline-friendly** → quota 0.3324 + health 0.2667 (maksimalna rezerva bez obzira na brzinu/trošak)
  - **reliability-first** → health 0.3524 + stability 0.1905 + reliability 0.04, najviše od svih paketa (najmanje iznenađenja)
  - **chaos-mode** → health 0.4000 + taskFit 0.1905 (paket težina koji `auto/chaos` dodjeljuje članovima svog panela; paralelno grananje ne čita ove težine i ovo nije profil za ubrizgavanje grešaka, pogledajte [CHAOS-MODE.md](../guides/CHAOS-MODE.md#autochaos-parallel-fan-out))

### Kontrole po zahtjevu (zaglavlja) — #6023 / #6024 / #6025 / #3470

`auto` kombinacija može se usmjeravati **za svaki zahtjev zasebno** putem tri zaglavlja, bez mijenjanja pohranjene konfiguracije
kombinacije. Ona se primjenjuju samo na strategiju `auto` i samo na zahtjev
koji ih sadrži; spremljene vrijednosti `modePack`/`budgetCap`/`budgetFallback` kombinacije koriste se
kada zaglavlje nije prisutno.

| Zaglavlje                     | Prihvaća                                                                                                                                                                                                         | Efekat                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :---------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `X-OmniRoute-Mode`            | alias unaprijed postavljene opcije (`fast`, `balanced`, `quality`, `cheap`, `reliable`, `offline`) ili sirovi naziv paketa (`ship-fast`, `cost-saver`, `quality-first`, `offline-friendly`, `reliability-first`) | Nadjačava težine bodovanja za ovaj zahtjev. `balanced`/`default` nameću zadane težine (bez paketa). Nepoznate vrijednosti se zanemaruju (konfiguracija se zadržava).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `X-OmniRoute-Budget`          | pozitivan broj (maksimalni iznos u USD po zahtjevu)                                                                                                                                                              | Čvrsto ograničenje troškova: kandidati čiji procijenjeni trošak premašuje ograničenje filtriraju se prije odabira. Ono što se dešava kada **svaki** kandidat premašuje ograničenje određuje `X-OmniRoute-Budget-Fallback` u nastavku.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `X-OmniRoute-Budget-Fallback` | `cheapest` (zadano, aliasi: `cheapest-viable`, `soft`) ili `strict` (aliasi: `block`, `hard`)                                                                                                                    | `cheapest`: vraća se na globalno najjeftinijeg kandidata iako on i dalje premašuje ograničenje (naslijeđeno ponašanje). `strict`: odbija izvršiti odabir — zahtjev se odmah prekida uz `HTTP 402` umjesto da neprimjetno prekorači budžet. Nepoznate vrijednosti se zanemaruju.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `X-OmniRoute-Effort`          | `auto` (ostale vrijednosti su rezervisane)                                                                                                                                                                       | Prilagodljivi budžet za razmišljanje: kada zahtjev **ne sadrži** polje za rezonovanje ni u jednom obliku (`reasoning_effort`, `reasoning`, `thinking`), pristupnik razrješava `auto` u `low`/`medium`/`high` na osnovu determinističkih signala iz strukture zahtjeva (dužina posljednje korisničke poruke, veličina konteksta do posljednje korisničke poruke, prethodni rezultati alata, dubina petlje alata). Signali su ograničeni na trenutni korak — sve nakon posljednje korisničke poruke se zanemaruje — tako da se svaki zahtjev u petlji alata razrješava na isti nivo (fiksiranje bez stanja po koraku, bez stanja sesije i bez eskalacije usred petlje koja bi narušila prefikse predmemorije prompta uzvodnog sistema). Eksplicitno klijentsko polje za rezonovanje uvijek ima prednost. Ograničeno je na zahtjeve čije se uzvodno usmjeravanje razrješava u oblik OpenAI Chat Completions (`targetFormat === FORMATS.OPENAI`) — `reasoning_effort` je polje u OpenAI obliku, pa zaglavlje nema efekta na zahtjev usmjeren prema Claudeu ili Geminiju (pogledajte `open-sse/handlers/chatCore/adaptiveEffortWiring.ts`). |

```bash
# Nametni najbrži profil, ograniči ovaj zahtjev na $0.05 i strogo ga blokiraj umjesto prekoračenja potrošnje
curl -sS http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "X-OmniRoute-Mode: fast" \
  -H "X-OmniRoute-Budget: 0.05" \
  -H "X-OmniRoute-Budget-Fallback: strict" \
  -d '{"model":"auto","messages":[{"role":"user","content":"hi"}]}'
```

Razrješavanje je čista funkcija (`open-sse/services/autoCombo/requestControls.ts`);
razriješene vrijednosti prosljeđuju se postojećim ulazima mehanizma `config.modePack` / `config.budgetCap` /
`config.budgetFallback`. Pohranjeni `config.budgetFallback` kombinacije ("strict" |
"cheapest") postavlja trajnu politiku; zaglavlje je nadjačava za jedan zahtjev.

## Sve strategije usmjeravanja

OmniRouteov kombinovani mehanizam podržava **20 strategija usmjeravanja** (deklarisanih u `src/shared/constants/routingStrategies.ts` → `ROUTING_STRATEGY_VALUES`). Sam Auto Combo mehanizam dostupan je putem strategije `auto`; ostale su dostupne za trajno pohranjene kombinacije.

| Strategija          | Opis                                                                                                                                                                                                                   |
| :------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `priority`          | Uređena lista s prvim ciljem i izričitim prioritetom                                                                                                                                                                   |
| `weighted`          | Ponderisani nasumični odabir prema težini pojedinačnog cilja                                                                                                                                                           |
| `round-robin`       | Ciklično prolazi kroz ciljeve redom (u grupama; pogledajte ispod)                                                                                                                                                      |
| `context-relay`     | Prenosi kontekst između ciljeva (dugi razgovori)                                                                                                                                                                       |
| `fill-first`        | Popunjava kvotu svakog cilja prije prelaska na sljedeći                                                                                                                                                                |
| `p2c`               | Nasumično balansiranje opterećenja metodom izbora između 2 opcije                                                                                                                                                      |
| `random`            | Ravnomjeran nasumični odabir                                                                                                                                                                                           |
| `least-used`        | Odabire cilj s najmanjim trenutnim opterećenjem                                                                                                                                                                        |
| `cost-optimized`    | Minimizira cijenu u $ po zahtjevu na osnovu kataloških cijena                                                                                                                                                          |
| `reset-aware` ⭐    | Daje prioritet prema vremenu poništavanja kvote — kraći periodi poništavanja rangiraju se više                                                                                                                         |
| `reset-window`      | Daje prednost ciljevima čiji se period kvote najranije poništava                                                                                                                                                       |
| `headroom`          | Odabire cilj s najvećom preostalom rezervom kvote                                                                                                                                                                      |
| `quota-weighted`    | Preskače iscrpljene račune, a zatim bira među ostalima proporcionalno preostaloj kvoti podijeljenoj aktivnim opterećenjem; postojeći razgovori ostaju vezani                                                           |
| `strict-random`     | Nasumični odabir bez uklanjanja ponavljanja                                                                                                                                                                            |
| `auto`              | Koristi Auto Combo bodovanje (16 faktora) — **preporučeno**                                                                                                                                                            |
| `lkgp`              | Posljednja poznata ispravna putanja (vezuje se za posljednjeg uspješnog pružaoca usluge, a zatim se vraća na pravila)                                                                                                  |
| `context-optimized` | Odabire cilj koji najbolje odgovara trenutnoj veličini konteksta                                                                                                                                                       |
| `cache-optimized`   | Mijenja redoslijed ciljeva prema podudarnosti s kešom upita — prvo se pokušava s vezom koja će najvjerovatnije već sadržavati keširani prefiks ovog zahtjeva (`open-sse/services/combo/promptCacheAffinity.ts`, #8008) |
| `fusion` 🧬         | Paralelno šalje zahtjev panelu modela, a zatim sintetizira jedan odgovor pomoću modela-sudije (pogledajte ispod)                                                                                                       |
| `pipeline`          | Pokreće ciljeve uzastopno, prosljeđujući izlaz svakog koraka kao ulaz sljedećeg koraka; vraća se samo konačni odgovor (#6396)                                                                                          |

⭐ = Novo u v3.8.0 · 🧬 = Novo u v3.8.36

### Semantika strategije `weighted`

`weighted` predstavlja **proporcionalni nasumični odabir za svaki zahtjev**
(`open-sse/services/combo/targetSorters.ts` → `selectWeightedTarget`), a ne mehanizam izjednačavanja:

- Svaki zahtjev odabire **jedan** korak s vjerovatnoćom `weight / totalWeight`; preostali koraci
  poredani su prema opadajućoj težini kao rezervni lanac za taj zahtjev.
- Korak čija je težina `0` (ili nije navedena) **nikada se ne odabire** dok bilo koji drugi korak
  ima težinu > 0 — može služiti samo kao rezerva nakon neuspjeha odabranog koraka. Tek kada su **sve**
  težine 0, odabir postaje ravnomjeran.
- Koraci čiji su svi ciljevi nedostupni — prekidač kola pružaoca usluge u stanju `OPEN`, period
  čekanja veze, zaključavanje modela — uklanjaju se iz izbora prije njegovog izvršavanja
  (`open-sse/services/combo/targetResolution.ts`), pa jedan dostupan korak može privremeno
  biti odabran za svaki zahtjev.
- `stickyWeightedLimit` (konfiguracija kombinacije, zadano `1` = isključeno) zadržava odabrani korak tokom navedenog broja
  uzastopnih uspjeha prije ponovnog odabira.

Za strogu rotaciju koristite `round-robin`; jednake težine uz `weighted` daju statističku — ne
strogu — ravnotežu.

### Način rada agentskog pipelinea

`pipeline` kombinacija s najmanje dva modela može omogućiti usmjeravanje planer/izvršilac pomoću
`config.agenticOrchestration.enabled`. Prvi cilj je zadužen za planiranje i konačne odgovore;
drugi cilj šalje pozive alata u izvornom formatu klijenta. OmniRoute prepoznaje nastavke s
rezultatima alata na osnovu protokola zahtjeva, pita planer da li je potreban još jedan krug
korištenja alata te dinamički određuje da li će izvršilac ili planer biti završni korak
prema klijentu.

Dodatni modeli nakon drugog cilja predstavljaju redoslijedom poredane rezervne izvršioce. Neuspješan
HTTP odgovor ili izuzetak u prijenosu prebacuje obradu na sljedećeg izvršioca, uz zadržavanje
iste odluke planera i izvornih alata, ali korištenje vlastitog prompta koraka tog izvršioca i
razriješene veze. Prvi uspješan odgovor vraća se neizmijenjen, uključujući
SSE streaming; neuspjesi nakon početka uspješnog streama ovdje se ne mogu ponovo pokušati.
Ako svi izvršioci ne uspiju, vraća se posljednji neuspjeh. Prekidi od strane klijenta zaustavljaju slanje.

```json
{
  "strategy": "pipeline",
  "models": [{ "model": "provider/planner" }, { "model": "provider/executor" }],
  "config": {
    "agenticOrchestration": { "enabled": true, "maxToolRounds": 8 }
  }
}
```

Izvršilac može poslati više nezavisnih poziva u jednom odgovoru. Zavisni pozivi
obrađuju se u kasnijim klijentskim iteracijama s rezultatima alata, pri čemu planer pregledava svaki rezultat.
`maxToolRounds` podrazumijevano iznosi `8` i prihvata vrijednosti `1`–`32`; nakon dostizanja ograničenja planer mora
generisati najbolji dostupni konačni odgovor. Interne odluke planera smještaju se u međuspremnik, dok
odabrani odgovor prema klijentu zadržava izvornu postavku streaminga.

### `round-robin` ljepljive grupe i proširenje računa

Round-robin se izvršava grupno, a ne po principu jednog zahtjeva po koraku:

- `stickyRoundRobinLimit` (konfiguracija kombinacije, zatim `comboStickyRoundRobinLimit`, pa
  `settings.stickyRoundRobinLimit`, podrazumijevano **3**) zadržava isti cilj tokom navedenog broja
  uzastopnih uspjeha prije rotacije. Postavite vrijednost nadjačavanja kombinacije na `1` za rotaciju
  po svakom zahtjevu. Uređivač kombinacija prikazuje efektivnu vrijednost i sloj iz kojeg ona potiče.
- `connectionAwareExpansion` (konfiguracija kombinacije, zatim postavke, podrazumijevano **false**) proširuje
  svaki korak na nivou provajdera u ciljeve po pojedinačnim računima prije rotacije. Strategije grupe B
  (priority, weighted, round-robin, random, p2c, least-used, cost-optimized, lkgp,
  fill-first, strict-random, context-optimized, cache-optimized, context-relay, fusion,
  pipeline) zadržavaju prikaz na nivou provajdera dok se ova opcija ne uključi. Uređivač kombinacija nudi
  nasljeđivanje / uključeno / isključeno; nasljeđivanje koristi globalnu podrazumijevanu vrijednost (isključeno).
- Usmjeravanje prema lokalnosti predmemorije prompta (`promptCacheAffinityEnabled`, podrazumijevano **true**) mijenja redoslijed
  prikvačenih veza kako bi odgovarajući ključevi predmemorije ostali na jednom računu. Ono ima prednost nad
  round-robin i weighted rotacijom kroz prikvačene korake po računu. Isključite ga u
  Settings → Combo defaults ako vam je potrebna stroga rotacija. Ne postoji nadjačavanje po kombinaciji.

Za rotaciju kroz više računa na jednom modelu koristite **jedan korak dinamičkog računa** (prazan
`connectionId`, cijeli skup) s ograničenjem ljepljivosti `1`, umjesto tri prikvačena `connectionId`-a.
Prikvačeni koraci u kombinaciji s afinitetom svode se na isti račun čak i dok se RR brojač
povećava.

## Strategija Fusion

`fusion` je jedina strategija koja **ne** bira jedan cilj. Ona šalje upit
**svakom modelu u panelu paralelno**, a zatim konfigurabilni **model-sudija** sintetizira
jedan konačni odgovor iz svih odgovora panela. Preneseno iz izvornog projekta `decolua/9router`
(OpenRouterov Fusion dizajn); implementacija se nalazi u `open-sse/services/fusion.ts`.

Kako funkcionira:

0. **Zaobilaženje za zahtjeve s alatima** — zahtjev koji sadrži neprazan niz `tools`, pri čemu
   `tool_choice` nije izričito postavljen na `"none"`, potpuno preskače panel: usmjerava se direktno
   na jedan model (konfiguriranog sudiju ili `panel[0]`), uz neizmijenjeno prosljeđivanje
   `tools`/`tool_choice`. Članovi panela nemaju pristup alatima, a sudijina
   direktiva za sintetiziranje obeshrabruje emitiranje poziva alata, tako da klijenti koji koriste
   agente/pozivanje alata dobijaju stvarnu odluku o pozivu alata umjesto sintetizirane proze (#6771).
1. **Paralelno slanje** (samo zahtjevi bez alata) — upit se šalje svim modelima
   panela odjednom, uz prisilno isključeno strujanje i uklonjene alate (sudiji je potrebna potpuna
   proza za sintetiziranje).
2. **Prikupljanje uz kvorum i period počeka** — čim stigne `minPanel` odgovora, pokreće se kratki
   period počeka za modele koji kasne, nakon čega se fusion nastavlja sa svime što je prikupljeno.
   Time se ograničava utjecaj najsporijeg modela na ukupno vrijeme, unutar granica čvrstog vremenskog ograničenja.
3. **Sinteza sudije** — odgovori panela se anonimiziraju (`Source 1`, `Source 2`, … — tako
   da sudija procjenjuje sadržaj, a ne brend modela) i predaju sudiji, koji analizira
   konsenzus / kontradikcije / djelimičnu pokrivenost / jedinstvene uvide / slijepe tačke, a zatim
   piše **jedan** autoritativan odgovor. Poziv sudiji zadržava originalnu klijentovu
   zastavicu `stream` + alate, tako da strujanje i daljnja upotreba alata i dalje funkcioniraju.
4. **Postepena degradacija** — 0 odgovora panela → `503`; tačno 1 preživjeli odgovor → taj se odgovor
   vraća direktno (nema se šta objediniti); panel s jednim modelom odgovara direktno.

Član panela također može biti korak `combo-ref` (`{kind: "combo-ref", comboName: "..."}`) koji referencira
drugi combo — razrješava se kao **jedan panel-glas u obliku crne kutije** (potpuno rekurzivno prosljeđivanje u
referencirani combo, a ne paralelno slanje vlastitim ciljevima tog comboa), uz istu zaštitu od dubine/ciklusa
koju već koristi svaka druga strategija koja obrađuje combo-ref (#6764).

### Konfiguracija

Konfigurira se u comboovom objektu `config` (bez migracije sheme — ponovo koristi postojeću
tabelu `combos`):

| Polje                                    | Tip      | Zadana vrijednost | Svrha                                                                                              |
| :--------------------------------------- | :------- | :---------------- | :------------------------------------------------------------------------------------------------- |
| `config.judgeModel`                      | `string` | prvi model panela | Model koji sintetizira konačni odgovor                                                             |
| `config.fusionTuning.minPanel`           | `number` | `2`               | Broj uspješnih odgovora potrebnih prije pokretanja perioda počeka (ograničeno na `[2, panelSize]`) |
| `config.fusionTuning.stragglerGraceMs`   | `number` | `8000`            | Koliko dugo čekati modele koji kasne nakon što se dostigne kvorum                                  |
| `config.fusionTuning.panelHardTimeoutMs` | `number` | `90000`           | Apsolutna granica kako jedan zaglavljeni model ne bi mogao zaustaviti zahtjev                      |

Zadane vrijednosti nalaze se u `FUSION_DEFAULTS` (`open-sse/services/fusion.ts`).

### Primjer

```bash
curl -X POST http://localhost:20128/api/combos \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "fusion-panel",
    "strategy": "fusion",
    "targets": [
      { "model": "cc/claude-opus-4-7" },
      { "model": "cx/gpt-5.5" },
      { "model": "glm/glm-5.1" }
    ],
    "config": {
      "judgeModel": "cc/claude-opus-4-7",
      "fusionTuning": { "minPanel": 2, "stragglerGraceMs": 8000, "panelHardTimeoutMs": 90000 }
    }
  }'
```

Zatim ga pozovite kao bilo koji drugi combo: `{"model":"fusion-panel","messages":[...]}`.

## Virtualna Auto-Combo fabrika

Auto Combo mehanizam ne zahtijeva unaprijed definirane kombinacije. Umjesto toga, `open-sse/services/autoCombo/virtualFactory.ts` kreira kandidate u hodu:

1. Dohvata `getProviderConnections({ isActive: true })` (sve omogućene veze)
2. Filtrira one s važećim vjerodajnicama (API ključ ili OAuth token koji nije istekao putem `hasUsableOAuthToken()`)
3. Poredi ih s `getProviderRegistry()` radi dostupnosti modela i cijena
4. Za svaku n-torku `(provider, model, connection)` kreira `VirtualAutoComboCandidate`
5. Odabire `connection.defaultModel` (ili prvi model iz registra) kao odredište za prosljeđivanje
6. Boduje svakog kandidata koristeći 16-faktorski `scorePool()` i paket težina varijante
7. Vraća rezultirajući `AutoComboConfig` u memoriji za `handleComboChat()` — nikada se ne pohranjuje u bazu podataka

To znači da **dodavanje novog pružaoca s omogućenim `auto/*` automatski proširuje skup kandidata** — nije potrebno ručno uređivanje kombinacije. Virtualna kombinacija se ponovo kreira za svaki zahtjev, pa se novododane veze ili veze koje su ponovo postale ispravne odmah uzimaju u obzir.

## Samooporavak

- **Privremeno isključivanje**: Rezultat < 0.2 → isključeno na 5 min (progresivno odgađanje, maksimalno 30 min)
- **Uvažavanje prekidača kola**: OPEN → automatski isključeno; HALF_OPEN → probni zahtjevi
- **Režim incidenta**: >50% OPEN → onemogući istraživanje, maksimalno poveća stabilnost
- **Oporavak nakon perioda čekanja**: Nakon isključivanja, prvi zahtjev je „probni” sa skraćenim vremenom čekanja

## Bandit istraživanje

5% zahtjeva (podesivo) usmjerava se nasumičnim pružaocima radi istraživanja. Onemogućeno je u režimu incidenta.

## API

**Ne postoji namjenska krajnja tačka `POST /api/combos/auto`** — Auto-Combo se koristi na dva načina:

1. **Bez konfiguracije (preporučeno):** Pošaljite bilo koji zahtjev za dovršavanje razgovora s `model: "auto"` ili `model: "auto/<variant>"`. Virtuelna fabrika kreira kombinaciju za svaki zahtjev — nije potrebna trajna pohrana niti API pozivi.

2. **Trajno pohranjena kombinacija sa `strategy: "auto"`:** Kreirajte običnu kombinaciju putem `POST /api/combos` i postavite `strategy: "auto"` zajedno s `config.auto.weights` / `config.auto.candidatePool`. Koristi se isti mehanizam bodovanja; kombinacija se pohranjuje u `combos` i može se ponovo koristiti prema ID-u.

Za otkrivanje, `GET /api/combos/auto` navodi svaku varijantu s njenim razriješenim skupom kandidata te `context_length` / `max_output_tokens` — MAKSIMALNE vrijednosti među prozorima skupa kandidata. Klijenti (npr. dodatak opencode) moraju oglašavati ove vrijednosti umjesto `0`: kontekst veličine nula u potpunosti onemogućava automatsko sažimanje u opencodeu, omogućavajući sesijama da rastu sve dok čišćenje historije na pristupniku ne uništi kontekst. Sigurno je oglašavati MAKSIMALNU vrijednost jer predfilter konteksta automatske kombinacije usmjerava prevelike zahtjeve kandidatima s velikim prozorima.

```bash
# Korištenje bez konfiguracije (bez kreiranja kombinacije)
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"auto/coding","messages":[{"role":"user","content":"Hello"}]}'

# Trajno pohranjena automatska kombinacija putem standardne krajnje tačke za kombinacije
curl -X POST http://localhost:20128/api/combos \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","strategy":"auto","config":{"auto":{"candidatePool":["anthropic","google","openai"],"weights":{"quota":0.15,"health":0.3,"costInv":0.05,"latencyInv":0.35,"taskFit":0.1,"stability":0,"tierPriority":0.05}}}}'
```

### Strategije automatskog usmjerivača

Trajno pohranjene kombinacije sa `strategy: "auto"` mogu postaviti `config.routerStrategy` (ili zastarjeli
`config.auto.routerStrategy`) na jednu od sljedećih vrijednosti:

- `rules` — zadano ponderisano bodovanje
- `score` — odabire najveći konfigurisani ponderisani rezultat. Kod potpuno jednakih rezultata zadržava se konfigurisani
  redoslijed kandidata; postojeći `explorationRate` uzorkuje iz cijelog rangiranog skupa.
- `cost` / `eco` — najjeftiniji zdravi pružalac usluge
- `latency` / `fast` — najniža p95 latencija uz kaznu za nepouzdanost
- `sla-aware` / `sla` — daje prednost kandidatima koji zadovoljavaju SLO-ove za p95 latenciju, stopu grešaka i opcionalno
  troškove
- `lkgp` — prvo posljednji poznati ispravni pružalac usluge
- `nadir` — pita API za odlučivanje servisa [Nadir](https://getnadir.com) koji model iz skupa je
  potreban upitu; zahtijeva izričito uključivanje, a u slučaju neuspjeha koristi `rules`

### Detaljan opis strategija usmjerivača

Mehanizam automatskih kombinacija pruža 7 zamjenjivih implementacija interfejsa **RouterStrategy** koje
možete mijenjati putem `config.routerStrategy` (ili zastarjelog `config.auto.routerStrategy`).
Svaka strategija bira jednog pružaoca usluge iz skupa kandidata na osnovu `RoutingContext`
(vrsta zadatka, naznake o alatima/vizuelnom sadržaju, procjena broja tokena, opcionalna SLA politika, opcionalni
posljednji poznati ispravni pružalac usluge).

#### 1. `rules` (zadano) — ponderisano bodovanje sa 16 faktora

Obavija postojeći mehanizam bodovanja. Filtrira kandidate čiji je prekidač strujnog kola u stanju `OPEN`,
a zatim pokreće `scorePool()` s trenutnom vrstom zadatka i `getTaskFitness()`,
birajući pružaoca usluge s najboljim rezultatom.

```ts
class RulesStrategyImpl implements RouterStrategy {
  readonly name = "rules";
  readonly description = "16-factor weighted scoring (see DEFAULT_WEIGHTS)";

  select(pool, context) {
    const eligible = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const ranked = scorePool(
      eligible.length > 0 ? eligible : pool,
      context.taskType,
      undefined,
      getTaskFitness
    );
    return { provider: ranked[0].provider /* ... */ };
  }
}
```

**Kada koristiti**: Zadano. Koristite kada želite uravnotežen kompromis između svih signala.

**Alias**: `rules` (bez aliasa)

---

#### 2. `cost` / `eco` — najjeftiniji zdravi pružalac usluge

Sortira skup kandidata prema `costPer1MTokens` (uzlazno) i bira najjeftinijeg.
Prvo filtrira kandidate u stanju `OPEN`.

```ts
class CostStrategyImpl implements RouterStrategy {
  readonly name = "cost";
  readonly description = "Always selects cheapest available provider";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort((a, b) => a.costPer1MTokens - b.costPer1MTokens);
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**Kada koristiti**: Radna opterećenja osjetljiva na troškove, grupna obrada ili pozadinski poslovi.

**Aliasi**: `cost`, `eco`

---

#### 3. `latency` / `fast` — najniža p95 latencija uz kaznu za nepouzdanost

Sortira prema `p95LatencyMs + (errorRate * 1000)`. Kazna za stopu grešaka osigurava
da nepouzdani pružaoci usluga budu niže rangirani čak i ako je njihova nominalna latencija niska.

```ts
class LatencyStrategyImpl implements RouterStrategy {
  readonly name = "latency";
  readonly description = "Prioritizes lowest p95 latency with reliability weighting";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort(
      (a, b) => a.p95LatencyMs + a.errorRate * 1000 - (b.p95LatencyMs + b.errorRate * 1000)
    );
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**Kada koristiti**: Radna opterećenja osjetljiva na latenciju, kao što su razgovor u stvarnom vremenu, automatsko dovršavanje ili
interaktivni asistenti za programiranje.

**Aliasi**: `latency`, `fast`

---

#### 4. `sla-aware` / `sla` — usklađenost sa SLO-ovima za latenciju/greške/troškove

Boduje svakog kandidata prema tome koliko dobro zadovoljava konfigurisanu SLO politiku:

| Faktor             | Težina | Formula                                               |
| ------------------ | ------ | ----------------------------------------------------- |
| Ocjena latencije   | 35%    | `threshold / max(value, ε)`                           |
| Ocjena grešaka     | 35%    | `threshold / max(value, ε)`                           |
| Ocjena zdravlja    | 15%    | `1.0` (CLOSED) / `0.5` (HALF_OPEN) / `0.0` (OPEN)     |
| Ocjena troška      | 10%    | `threshold / max(value, ε)` ili obrnuto normalizirano |
| Ocjena stabilnosti | 5%     | obrnuto normalizirana standardna devijacija latencije |

Kada je `hardConstraints: true`, kandidati se prvenstveno sortiraju prema **ocjeni kršenja**
(koliko premašuju bilo koji SLO), a zatim prema kompozitnoj ocjeni. U suprotnom se koristi
samo kompozitna ocjena.

```ts
class SLAStrategyImpl implements RouterStrategy {
  readonly name = "sla-aware";
  readonly description =
    "Selects the provider most likely to satisfy latency, error-rate, and cost SLOs";

  select(pool, context) {
    // ... ocjenjuje svakog kandidata prema pravilima: { targetP95Ms, maxErrorRate, maxCostPer1MTokens, hardConstraints }
  }
}
```

**SLA polja** (postavljaju se u konfiguraciji kombinacije):

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

**Kada koristiti**: Produkcijska radna opterećenja sa strogim ograničenjima latencije, stope grešaka ili troškova.

**Aliasi**: `sla-aware`, `sla`

---

#### 5. `lkgp` — prvo posljednji poznati ispravni pružalac usluge

Prvo pokušava koristiti **posljednjeg poznatog ispravnog pružaoca usluge** (ako je postavljen), a zatim prelazi na
strategiju `rules`. Korisno za zadržavanje sesije — isti pružalac usluge obrađuje
naknadne zahtjeve u razgovoru.

```ts
class LKGPStrategyImpl implements RouterStrategy {
  readonly name = "lkgp";
  readonly description = "Tries last known good provider first, then falls back to rules";

  select(pool, context) {
    if (context.lkgpEnabled === false) {
      return getStrategy("rules").select(pool, context);
    }

    if (context.lastKnownGoodProvider) {
      const candidates = pool.filter(
        (c) => c.provider === context.lastKnownGoodProvider && c.circuitBreakerState !== "OPEN"
      );
      if (candidates.length > 0) {
        return { provider: candidates[0].provider /* ... */ };
      }
    }

    // Prelazak na strategiju rules
    return getStrategy("rules").select(pool, context);
  }
}
```

**Kada koristiti**: Razgovori s više interakcija u kojima želite da isti pružalac usluge obrađuje
naknadne zahtjeve (npr. zbog keširanja, kontinuiteta konteksta ili dosljednosti cijena).

**Alias**: `lkgp` (nema aliasa)

---

#### 6. `nadir` — odabir modela putem Nadira na osnovu prompta

Svaka prethodno navedena strategija rangira kandidate prema vlastitoj telemetriji; nijedna od njih ne čita
zahtjev. `nadir` šalje posljednju korisničku poruku zajedno s ID-ovima modela iz skupa
[Nadir](https://getnadir.com) API-ju za odlučivanje (`POST /v1/bucket`) i usmjerava na model
koji Nadir odabere iz tog menija (`simple` → najjeftiniji odgovarajući model, `complex` → napredni
model). Vezu koja opslužuje taj model i dalje bira `rules`, tako da kvota,
zdravlje i trošak nastavljaju određivati koji će se račun koristiti.

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "nadir",
    "nadir": {
      "apiKey": "ndr_...",
      "baseUrl": "https://api.getnadir.com",
      "timeoutMs": 2000
    }
  }
}
```

`OMNIROUTE_NADIR_API_KEY` i `OMNIROUTE_NADIR_BASE_URL` su rezervne varijable okruženja za ta dva
stringa. `baseUrl` je potreban samo za samostalno hostovani Nadir (završni `/v1` se tolerira).
Pozivi bez ključa koriste Nadirov anonimni nivo, čija je stopa ograničena po IP adresi.

Šta se šalje izvan sistema: tekst posljednje korisničke poruke (prvih 16k znakova), ID-ovi
modela kandidata i oznaka kanala `source: "omniroute"`. Ne šalju se sistemski prompt, historija, alati ni
zaglavlja.

Ponašanje pri grešci je fail-open: istek vremena (zadano 2000 ms), odgovor koji nije 2xx, nedostupan
host, neispravan odgovor ili odabir izvan skupa dovode do odluke strategije `rules`,
a razlog dobija prefiks `NadirStrategy: fallback (…)`. Nakon neuspjelog poziva
strategija preskače mrežni poziv 30 s, tako da prekid rada uzrokuje jedan istek vremena svakih 30 s umjesto
jednog po zahtjevu. Događaji usmjeravanja prijavljuju `strategy: "nadir"` samo kada je Nadir zaista izvršio
odabir.

**Kada koristiti**: promet različitih nivoa složenosti u skupu koji obuhvata više nivoa modela (mali, srednji
i napredni model), kada želite smanjiti trošak stalnog korištenja naprednog modela.

**Alias**: `nadir` (nema aliasa)

---

### Prilagođene strategije usmjeravanja

Možete registrirati vlastitu implementaciju `RouterStrategy` putem javnog API-ja:

```ts
import {
  registerStrategy,
  type RouterStrategy,
} from "@omniroute/open-sse/services/autoCombo/routerStrategy";

class MyCustomStrategy implements RouterStrategy {
  readonly name = "my-custom";
  readonly description = "My custom routing strategy";

  select(pool, context) {
    // Ovdje unesite vlastitu logiku usmjeravanja
    return {
      provider: pool[0].provider,
      model: pool[0].model,
      strategy: this.name,
      reason: "MyCustomStrategy: ...",
      candidatesConsidered: pool.length,
      finalScore: 1.0,
    };
  }
}

registerStrategy("my-custom", new MyCustomStrategy());
```

Zatim je koristite:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "my-custom"
  }
}
```

---

### Vodič za odabir strategije usmjeravanja

| Slučaj upotrebe             | Strategija  | Razlog                                      |
| --------------------------- | ----------- | ------------------------------------------- |
| Uravnoteženo opterećenje    | `rules`     | Zadano — uzima u obzir sve faktore          |
| Minimiziranje troška        | `cost`      | Uvijek bira najjeftiniju opciju             |
| Minimiziranje latencije     | `latency`   | Bira najbržeg pouzdanog pružaoca usluge     |
| Strogi SLO-ovi              | `sla-aware` | Filtrira prema pragovima p95/grešaka/troška |
| Razgovor s više interakcija | `lkgp`      | Zadržavanje sesije                          |
| Različiti nivoi složenosti  | `nadir`     | Bira nivo modela za svaki prompt            |

SLA-aware polja:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

## Prikladnost za zadatke

Više od 30 modela ocijenjeno je kroz 6 vrsta zadataka (`coding`, `review`, `planning`, `analysis`, `debugging`, `documentation`). Podržani su zamjenski obrasci (npr. `*-coder` → visoka ocjena za programiranje).

## Pregled automatskih varijanti

Uključujući osnovni `auto` (zadano) i 6 vrijednosti `AutoVariant` deklariranih u `autoPrefix.ts`, postoji **7 dostupnih ID-ova modela**:

`auto`, `auto/coding`, `auto/fast`, `auto/cheap`, `auto/offline`, `auto/smart`, `auto/lkgp`

(Sam `AutoVariant` nabraja 6 vrijednosti; sedma opcija je „bez varijante” — osnovni `auto` — koji `parseAutoPrefix()` obrađuje kao `variant: undefined`.)

## Kako se nivoi uklapaju u Auto-Combo

Funkcija bodovanja sa 16 faktora (`open-sse/services/autoCombo/scoring.ts`) tretira
pripadnost nivou kao dva signala: `tierPriority` (0.0476) i `tierAffinity` (0.0476). Pogledajte
kanonsku [tabelu faktora bodovanja](#how-it-works-persisted-auto-combos) iznad za kompletan
skup `DEFAULT_WEIGHTS` — prilagođavanja za svaki paket (ship-fast/cost-saver/quality-first/
offline-friendly) navedena su u tabeli „Profili težina po paketu“.

Sam nivo **ne** daje automatski prednost Nivou 1 — ako je latencija Nivoa 1 loša ili
odnos troškova i kvaliteta nije optimalan, Nivo 2 pobjeđuje. Da biste nametnuli redoslijed
nivoa, koristite combo strategiju `priority` i rasporedite pružaoce usluga prema nivou.

Da biste dali snažnu prednost Nivou 1 (pretplata), povećajte težinu `tierPriority`:

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "tierPriority": 0.3, "costInv": 0.05 } } }
}
```

Pogledajte [`docs/guides/TIERS.md`](../guides/TIERS.md) za definicije nivoa i klasifikaciju pružalaca usluga.

## Testiranje i pokrivenost

### Deterministička matrica odluka usmjeravanja (`npm run test:combo:matrix`)

`tests/integration/combo-matrix/*.test.ts` potvrđuje **odluku** usmjeravanja svih 19 javnih strategija od početka do kraja kroz stvarni kombinovani cjevovod s lažnim nadređenim servisom. Pokrivenost uključuje:

- Svih 19 strategija `ROUTING_STRATEGY_VALUES` (ordered, weighted, cost, context, fusion, …).
- `quota-share` (interno) od početka do kraja: DRR pravednost + smanjivanje prioriteta pri zasićenju putem stvarne spojne tačke `selectQuotaShareTarget` (`registerQuotaFetcher` / `setLKGP` / `__setHeadroomSaturationFetcherForTests`).
- Pokrivenost univerzalne primopredaje `context-relay` za svaki broj ciljeva.

Ovaj paket testova pokreće se u CI-u (zadatak `test:integration`) sa `--test-concurrency=1` i `--test-force-exit`, tako da je deterministički i ne zahtijeva aktivne pristupne podatke.

### Uslovno pokrenuti produkcijski smoke testovi (NISU u CI-u — stvarni pružaoci usluga)

| Naredba                                | Šta radi                                                                                               |
| :------------------------------------- | :----------------------------------------------------------------------------------------------------- |
| `npm run test:combo:live`              | Stvarno usmjeravanje unutar procesa s `RUN_COMBO_LIVE=1`; pravi snimak aktivne OmniRoute baze podataka |
| `npm run test:combo:live:vps`          | HTTP pozivi prema aktivnom OmniRoute serveru (postavite `COMBO_LIVE_BASE_URL`)                         |
| `npm run test:combo:live:vps:failover` | Isto, uz namjerno izazvane scenarije prebacivanja u slučaju kvara                                      |

Ovi smoke testovi provjeravaju stvarni komunikacijski put (kombinacija → pružalac usluga → dovršavanje). Namjerno su isključeni iz CI-a jer zahtijevaju aktivne pristupne podatke i pristup VPS-u.

---

## Datoteke

| Datoteka                                                  | Svrha                                                                                                    |
| :-------------------------------------------------------- | :------------------------------------------------------------------------------------------------------- |
| `open-sse/services/autoCombo/scoring.ts`                  | Funkcija bodovanja s 16 faktora, `DEFAULT_WEIGHTS`, norma skupa                                          |
| `open-sse/services/autoCombo/taskFitness.ts`              | Tabela prikladnosti modela × zadatka                                                                     |
| `open-sse/services/autoCombo/engine.ts`                   | Logika odabira, bandit, ograničenje budžeta                                                              |
| `open-sse/services/autoCombo/selfHealing.ts`              | Isključivanje, sonde, režim incidenta                                                                    |
| `open-sse/services/autoCombo/modePacks.ts`                | 6 profila težina (ship-fast, cost-saver, quality-first, offline-friendly, reliability-first, chaos-mode) |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Parser prefiksa `auto/` + 6 varijanti                                                                    |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Izrađuje `AutoComboConfig` u memoriji iz aktivnih veza                                                   |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Testna pristupna tačka za simuliranje registra pružalaca                                                 |
| `src/shared/constants/routingStrategies.ts`               | `ROUTING_STRATEGY_VALUES` (20 strategija)                                                                |
| `src/sse/handlers/chat.ts`                                | Integracija: kratki spoj za auto-prefiks                                                                 |
