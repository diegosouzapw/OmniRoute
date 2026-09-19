# OmniRoute Auto-Combo Engine (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/AUTO-COMBO.md) · 🇪🇹 [am](../../../am/docs/routing/AUTO-COMBO.md) · 🇸🇦 [ar](../../../ar/docs/routing/AUTO-COMBO.md) · 🇦🇿 [az](../../../az/docs/routing/AUTO-COMBO.md) · 🇧🇬 [bg](../../../bg/docs/routing/AUTO-COMBO.md) · 🇧🇩 [bn](../../../bn/docs/routing/AUTO-COMBO.md) · 🇨🇿 [cs](../../../cs/docs/routing/AUTO-COMBO.md) · 🇩🇰 [da](../../../da/docs/routing/AUTO-COMBO.md) · 🇩🇪 [de](../../../de/docs/routing/AUTO-COMBO.md) · 🇬🇷 [el](../../../el/docs/routing/AUTO-COMBO.md) · 🇪🇸 [es](../../../es/docs/routing/AUTO-COMBO.md) · 🇪🇪 [et](../../../et/docs/routing/AUTO-COMBO.md) · 🇮🇷 [fa](../../../fa/docs/routing/AUTO-COMBO.md) · 🇫🇮 [fi](../../../fi/docs/routing/AUTO-COMBO.md) · 🇫🇷 [fr](../../../fr/docs/routing/AUTO-COMBO.md) · 🇮🇪 [ga](../../../ga/docs/routing/AUTO-COMBO.md) · 🇮🇳 [gu](../../../gu/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ha](../../../ha/docs/routing/AUTO-COMBO.md) · 🇮🇱 [he](../../../he/docs/routing/AUTO-COMBO.md) · 🇮🇳 [hi](../../../hi/docs/routing/AUTO-COMBO.md) · 🇭🇷 [hr](../../../hr/docs/routing/AUTO-COMBO.md) · 🇭🇺 [hu](../../../hu/docs/routing/AUTO-COMBO.md) · 🇦🇲 [hy](../../../hy/docs/routing/AUTO-COMBO.md) · 🇮🇩 [id](../../../id/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ig](../../../ig/docs/routing/AUTO-COMBO.md) · 🇮🇹 [it](../../../it/docs/routing/AUTO-COMBO.md) · 🇯🇵 [ja](../../../ja/docs/routing/AUTO-COMBO.md) · 🇬🇪 [ka](../../../ka/docs/routing/AUTO-COMBO.md) · 🇰🇭 [km](../../../km/docs/routing/AUTO-COMBO.md) · 🇮🇳 [kn](../../../kn/docs/routing/AUTO-COMBO.md) · 🇰🇷 [ko](../../../ko/docs/routing/AUTO-COMBO.md) · 🇱🇹 [lt](../../../lt/docs/routing/AUTO-COMBO.md) · 🇱🇻 [lv](../../../lv/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ml](../../../ml/docs/routing/AUTO-COMBO.md) · 🇮🇳 [mr](../../../mr/docs/routing/AUTO-COMBO.md) · 🇲🇾 [ms](../../../ms/docs/routing/AUTO-COMBO.md) · 🇲🇹 [mt](../../../mt/docs/routing/AUTO-COMBO.md) · 🇲🇲 [my](../../../my/docs/routing/AUTO-COMBO.md) · 🇳🇵 [ne](../../../ne/docs/routing/AUTO-COMBO.md) · 🇳🇱 [nl](../../../nl/docs/routing/AUTO-COMBO.md) · 🇳🇴 [no](../../../no/docs/routing/AUTO-COMBO.md) · 🇮🇳 [or](../../../or/docs/routing/AUTO-COMBO.md) · 🇮🇳 [pa](../../../pa/docs/routing/AUTO-COMBO.md) · 🇵🇭 [phi](../../../phi/docs/routing/AUTO-COMBO.md) · 🇵🇱 [pl](../../../pl/docs/routing/AUTO-COMBO.md) · 🇵🇹 [pt](../../../pt/docs/routing/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/AUTO-COMBO.md) · 🇷🇴 [ro](../../../ro/docs/routing/AUTO-COMBO.md) · 🇷🇺 [ru](../../../ru/docs/routing/AUTO-COMBO.md) · 🇱🇰 [si](../../../si/docs/routing/AUTO-COMBO.md) · 🇸🇰 [sk](../../../sk/docs/routing/AUTO-COMBO.md) · 🇸🇮 [sl](../../../sl/docs/routing/AUTO-COMBO.md) · 🇷🇸 [sr](../../../sr/docs/routing/AUTO-COMBO.md) · 🇸🇪 [sv](../../../sv/docs/routing/AUTO-COMBO.md) · 🇰🇪 [sw](../../../sw/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ta](../../../ta/docs/routing/AUTO-COMBO.md) · 🇮🇳 [te](../../../te/docs/routing/AUTO-COMBO.md) · 🇹🇭 [th](../../../th/docs/routing/AUTO-COMBO.md) · 🇹🇷 [tr](../../../tr/docs/routing/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/AUTO-COMBO.md) · 🇵🇰 [ur](../../../ur/docs/routing/AUTO-COMBO.md) · 🇺🇿 [uz](../../../uz/docs/routing/AUTO-COMBO.md) · 🇻🇳 [vi](../../../vi/docs/routing/AUTO-COMBO.md) · 🇳🇬 [yo](../../../yo/docs/routing/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/AUTO-COMBO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/AUTO-COMBO.md)

---

> **Za korisnike**: Tražite brzi početak? Pogledajte [Vodič za korisnike Auto-Combo](../getting-started/AUTO-COMBO-GUIDE.md) za jednostavna objašnjenja i primjere.

> Samoupravljajući lanci modela s adaptivnim bodovanjem + automatskim usmjeravanjem bez konfiguracije

## Automatsko usmjeravanje s nultom konfiguracijom (prefiks `auto/`)

> **NOVO:** Nije potrebno kreiranje kombinacija. Koristite prefiks `auto/` direktno u bilo kojem klijentu.

### Brzi primjeri

| ID modela | Varijanta | Ponašanje |
| ------------- | ------------------------------------------------------------------------- |
| `automatski` | zadano | Svi povezani pružatelji usluga, LKGP strategija, uravnotežene težine |
| `auto/kodiranje` | kodiranje | Težine usmjerene na kvalitet, pogodne za generiranje koda |
| `auto/brzo` | brzo | Odabir s niskom latencijom |
| `automatski/jeftino` | jeftino | Rutiranje optimizirano s obzirom na troškove (prvo najniža cijena) |
| `automatski/offline` | offline | Favorizira pružatelje usluga s najvećom dostupnošću kvota |
| `auto/pametno` | pametno | Kvalitet na prvom mjestu + veća stopa istraživanja (10%) za bolje otkrivanje modela |
| `auto/lkgp` | lkgp | Eksplicitni LKGP (isto kao i podrazumijevani `auto`) |
| `auto/haos` | haos | Težine ubrizgavanja grešaka za testiranje otpornosti (inženjering haosa) |

### Kategorija × Sastav nivoa (`auto/<kategorija>:<nivo>`)

Sufiksi u OpenRouter stilu odvajaju **kakva je ruta** (kategorija) od **kako je optimizirati** (nivo), tako da ih možete slobodno sastavljati (#4235 Faza B, `open-sse/services/autoCombo/suffixComposition.ts`):

- **Kategorije** (filtrirajte skupinu kandidata prema sposobnostima): `kodiranje` · `rasuđivanje` · `vizija` · `ćaskanje` · `multimodalno`. `vizija`/`multimodalno` zadržava modele koji podržavaju viziju; `rasuđivanje` zadržava modele rasuđivanja/razmišljanja.
- **Nivoi** (odaberite težine bodovanja / filter grupe): `brzo` (brza isporuka) · `jeftino` (alias `podna ploča`, ušteda troškova) · `pouzdano` (ispravnost prekidača + stabilnost latencije) · `besplatno` / `profesionalno` (filtrirajte grupu po nivou modela putem `classifyTier` — besplatni nivo vs. premium).

| Primjer                | Rješava se na                                                          |
| ---------------------- | ---------------------------------------------------------------------- |
| `auto/kodiranje:brzo`  | bazen za kodiranje, težine niske latencije                             |
| `auto/coding:cheap`    | kodni bazen, optimiziran prema troškovima (alias `auto/coding:floor`)  |
| `auto/reasoning:pro`   | samo modeli rasuđivanja/razmišljanja, premium nivo                     |
| `auto/vid`             | modeli sa mogućnošću rada sa vidom (bez slojeva → uravnotežene težine) |
| `auto/multimodal:free` | modeli koji podržavaju multimodalni pristup, samo besplatni nivo       |

Bilo koji važeći `auto/<kategorija>[:<nivo>]` se rješava na zahtjev; odabrani podskup se oglašava u `/v1/models` i kontrolnoj ploči (`AUTO_SUFFIX_VARIANTS` u `open-sse/services/autoCombo/builtinCatalog.ts`). Filtriranje je **otvaranje bez greške** — ako ograničenje ne odgovara nijednom povezanom modelu, koristi se cijeli skup tako da se usmjeravanje nikada ne prekida. Osnovni bodovni sistem (`combo.ts`) ostaje nepromijenjen; filter kategorije/nivoa se primjenjuje u `buildAutoCandidates`.

> **Inteligencija modela uživo:** Automatsko usmjeravanje kondicije se zasniva na trenutnim rang listama **ARENA ELO** + podacima o nivoima **models.dev** kada je uključena zastavica `ARENA_ELO_SYNC_ENABLED` (u suprotnom se vraća na statičku mapu kondicije).

**Kako se koristi:**

bash

# Bilo koji IDE ili CLI alat koji podržava OpenAI format

Osnovni URL: http://localhost:20128/v1
API ključ: <vaš-ključ-krajnje-tačke>

# U vašem kodu/konfiguraciji, postavite model na:

model: "automatski" # uravnoteženo zadano
model: "auto/coding" # najbolje za zadatke kodiranja
model: "auto/brzo" # najbrže dostupno
model: "auto/jeftino" # najjeftinije po tokenu

````

**Šta se dešava:**

1. OmniRoute detektuje prefiks `auto/` u `src/sse/handlers/chat.ts`
2. Upita sve **aktivne veze provajdera** iz baze podataka
3. Filtrira na one s važećim akreditivima (API ključ ili OAuth token)
4. Određuje model po konekciji (`connection.defaultModel` ili prvi model provajdera)
5. Kreira **virtualnu kombinaciju** u memoriji (ne pohranjuje se u bazi podataka)
6. Rute koje koriste težinski profil odabrane varijante + LKGP strategija

**Ključna svojstva:**

- ✅ **Uvijek uključeno:** Nema prebacivanja, nema kreiranja kombinacija, nije potrebna konfiguracija
- ✅ **Dinamičko:** Automatski odražava trenutno povezane pružatelje usluga
- ✅ **Ljepljivost sesije:** LKGP osigurava da posljednji uspješni pružatelj usluga ima prioritet
- ✅ **Svjesno više računa:** Svaka veza s pružateljem usluga postaje zaseban kandidat
- ✅ **Nema pisanja u bazu podataka:** Virtuelna kombinacija postoji samo za zahtjev, bez opterećenja perzistencijom

### Kontrola kandidata po ključu (#7819, Nivo 1+2)

`GET /v1/auto-combo/{channel}/candidates` (`{channel}` = sufiks nakon `auto/`, ili
doslovni `auto` za osnovni kanal) je krajnja tačka **samo za čitanje** koja navodi
Trenutni skup kandidata za kanal `auto/*` uređen je s dostupnošću uživo, ponovno korištenje
Postojeća otpornost glasi (nikada sirovo stanje prekidača):

- prekidač provajdera — `getCircuitBreaker(provider).getStatus()` / `.canExecute()`
- hlađenje veze — `rateLimitedUntil` / `testStatus` na riješenoj
Red `provider_connections`
- zaključavanje modela — `isModelLocked(provider, connectionId, model)`

Svaki kandidat također nosi oznaku `isključeno` ovog API ključa. Izuzeća se pohranjuju
po API ključu (tabela `auto_candidate_overrides`, migracija `128`) — OmniRoute je
jedan zakupac bez tabele `korisnici`, tako da je `apiKeyId` najbliži stvarni po pozivaocu
identitet — i nametnut na mjestu gdje se kandidati nalaze u uskom krugu
`open-sse/services/autoCombo/virtualFactory.ts` putem čistog, jedinično testiranog
`filterExcludedCandidates()` (`open-sse/services/autoCombo/candidateOverrides.ts`).
Filter je **otvoren zbog greške**: nepostavljen apiKeyId/kanal ili greška u pretraživanju baze podataka.
Ostavite bazen nefiltriranim, tako da operater bez konfiguriranih prepisivanja vidi usmjeravanje
bajtno identično onome prije ove funkcije.

**Odloženo za naknadno rješavanje problema:** težine po kandidatu + eksplicitno uređenje (Nivo 3)
— uklapa se u postojeće ponderirane/prioritetne strateške puteve) i definiše određeni
Strategija `combo.ts` po kanalu `auto/*` (Nivo 4). Pogledajte plan #7819 za otvoreni
pitanje o tome da li bi nadjačavanja trebala ostati po API ključu ili postati globalna s obzirom na
model s jednim zakupcem.

**Iza kulisa:**

```txt
Zahtjev: { model: "auto/kodiranje" }
↓
src/sse/handlers/chat.ts detektuje prefiks
↓
createVirtualAutoCombo('coding') → candidatePool iz aktivnih konekcija
↓
handleComboChat (isti mehanizam kao i trajne kombinacije)
↓
Automatsko bodovanje odabire najboljeg pružatelja usluga/model po zahtjevu
````

**Implementacijske datoteke:**

| Datoteka                                                  | Svrha                                              |
| --------------------------------------------------------- | -------------------------------------------------- |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Parser prefiksa (`parseAutoPrefix`)                |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Kreira virtuelne `AutoComboConfig` objekte         |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Testna kuka za lažno kreiranje registra provajdera |
| `src/sse/handlers/chat.ts`                                | Integracija: automatski prefiks s kratkim spojem   |
| `src/shared/constants/providers.ts`                       | Sistemski unos `SYSTEM_PROVIDERS.auto`             |

## Kombinovani nazivi koji odgovaraju stvarnom ID-u modela

Kombinacija čiji je `naziv` identičan golom ID-u modela (npr. kombinacija pod nazivom
`gpt-5.5`) je **namjerni, podržani obrazac**, a ne greška: to je
mehanizam za rezervni provajder po modelu-id dokumentovan u
[#6940](https://github.com/diegosouzapw/OmniRoute/issues/6940). Zbog kombinacije
Rezolucija se provjerava prije rezolucije golog ID-a modela
(`getComboForModel()` u `src/sse/services/model.ts`), zahtjev za goli
id `gpt-5.5` se usmjerava kroz ciljeve kombinacije (npr.
`acme-responses/gpt-5.5`, `backup-responses/gpt-5.5`) umjesto direktno na
jedan provajder — ovo ponovo koristi prioritet kombinovanja pre prepisivanja izgrađen za
[#3227/#3233](https://github.com/diegosouzapw/OmniRoute/issues/3227) i jeste
regresivno testirano pomoću `tests/unit/responses-combo-resolution-3227.test.ts` i
`testovi/jedinica/kombinovani-naziv-kodeksa-odgovori-prepisivanje.test.ts`.

Kreiranje ili preimenovanje kombinacije u ime koje zasjenjuje stvarni ID modela je
**nikada odbijeno** — time bi se prekinuo ovaj dokumentirani tijek rada. Umjesto toga
(#8530), `POST /api/combos` i `PUT /api/combos/[id]` dodaju neblokirajući
polje `upozorenje` u odgovoru kada se (novo) ime sudari sa stvarnim
ID modela:

```json
{
  "upozorenje": {
    "kod": "KOMBINOVANI_NAZIV_SJENA_MODEL",
    "modelId": "gpt-5.5",
    "providerId": "openai"
  }
}
```

Prilikom pokretanja, `scanComboModelNameCollisionsAtBoot()`
(`src/instrumentation-node.ts`) također bilježi upozorenje od jednog reda `[STARTUP]`
nabrajanje svake postojeće kombinacije koja zasjenjuje ID modela, tako da operatori koji
slučajno sam ovo pogodio (a ne namjerno, prema #6940) imam signal.
Pomoćnik za detekciju se nalazi u `src/lib/combos/modelNameCollision.ts`.

## Pozivanje prilagođene kombinacije od strane klijenta

Trajne kombinacije (Postavke → Kombinacije) se koriste samo kada klijent pošalje **tačan naziv** kombinacije u polje `model` — nema nejasnog ili djelomičnog podudaranja naziva kombinacije, niti je uključen prefiks `auto/`. Redoslijed rezolucije (`getComboForModel()` u `src/sse/services/model.ts`):

1. tačno podudaranje naziva kombinacije (`model: "my-combo"`),
2. prefiks `combo/<naziv>` (`model: "combo/my-combo"`),
3. model→kombinirana glob mapiranja (`/api/model-combo-mappings`).

bash
curl -X POST http://localhost:20128/v1/chat/completions \
-H "Autorizacija: Nosilac <ključ>"
-H "Vrsta sadržaja: aplikacija/json" \
-d '{"model":"moja-kombinacija","poruke":[{"uloga":"korisnik","sadržaj":"Pozdrav"}]}'

```

Dvije uobičajene zamke:

- **`auto` ne koristi vaše kombinacije.** `auto`/`auto/*` gradi vlastiti skup kandidata bez konfiguracije i konsultuje postojeće kombinacije samo ako je kombinacija doslovno nazvana `auto` (ne preporučuje se). Da biste usmjerili kroz kombinaciju, pošaljite njeno tačno ime - ne `auto`.
- **`openrouter/auto` je pravi plaćeni OpenRouter proizvod** ("Auto Best Available"), a ne OmniRoute alias. To je jedinstveni statički model u OpenRouter registru (`open-sse/config/providers/registry/openrouter/index.ts`) i naplaćuje se zasebno. Koristite Postavke → Rutiranje → Sakrij plaćene modele da biste ga isključili iz `auto` pool-ova.

Pogledajte [#7992](https://github.com/diegosouzapw/OmniRoute/issues/7992) i [#7111](https://github.com/diegosouzapw/OmniRoute/issues/7111) za izvornu zabunu koju ovaj dokument sadrži.

## Kako funkcioniše (Trajne automatske kombinacije)

Auto-Combo Engine dinamički odabire najboljeg provajdera/model za svaki zahtjev koristeći **funkciju bodovanja sa 16 faktora** (definiranu u `open-sse/services/autoCombo/scoring.ts` → `DEFAULT_WEIGHTS`). Zadane težine se zbirno kreću do `1.0`; prilagođene težine se renormaliziraju pomoću `normalizeScoringWeights()`. Dvije od šesnaest - `cacheAffinity` i `resetWindowAffinity` - nose zadanu težinu `0`; `reliability` nosi `0` u `DEFAULT_WEIGHTS` ali `0.03` u generičkim paketima i `0.04` u `reliability-first`, a `quality` nosi `0.02` u paketima (`0.03` u `quality-first`): one se i dalje izračunavaju za svakog kandidata, a `cacheAffinity` zatvara deduplikaciju keširanja prompt-a izvan bodovanja, tako da faktori nula-zadanih jednostavno ne glasaju po zadanim postavkama dok paketi glasaju.

![Automatsko kombinovano bodovanje sa 16 faktora](../diagrams/exported/auto-combo-scoring.svg)

> Izvor: [diagrams/auto-combo-scoring.mmd](../diagrams/auto-combo-scoring.mmd) (regeneriraj putem `npm run docs:render-diagrams`). Naziv datoteke je historijski; izvor i renderirani dijagram prikazuju svih 16 faktora deklariranih u `DEFAULT_WEIGHTS`.

| Faktor | Zadana težina | Opis |
| :------------------- | :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `kvota` | 0,1429 | Preostali prostor za kvotu / ograničenje brzine [0..1] |
| `zdravlje` | 0.1605 | Rezultat zdravlja prekidača (ZATVORENO=1.0, POLUOTVORENO=0.5, OTVORENO=0.0) |
| `costInv` | 0.1429 | Inverzna **kombinirana** cijena (60% ulazne + 40% izlazne cijene tokena, normalizirano) — jeftinije = veći rezultat |
| `latencyInv` | 0.1143 | Inverzna latencija p95 normalizovana na skup — brže = veći rezultat |
| `taskFit` | 0.0762 | Prilagođenost tipa zadatka (kodiranje, pregled, planiranje, analiza, otklanjanje grešaka, dokumentacija) |
| `stabilnost` | 0,0476 | Stabilnost zasnovana na varijansi iz standardne devijacije latencije — kandidat čije oscilacije vremena odziva postižu niže rezultate |
| `tierPriority` | 0.0476 | Prioritet nivoa računa — Ultra=1.0, Pro=0.67, Standard=0.33, Free=0.0 |
| `tierAffinity` | 0.0476 | Afinitet između nivoa kandidata i nivoa preporučenog u manifestu |
| `specificityMatch` | 0.0476 | Podudaranje između specifičnosti zahtjeva (nagovještaj manifesta) i nivoa modela |
| `contextAffinity` | 0.0476 | Afinitet između potrebe kontekstualnog prozora zahtjeva i kontekstualnog prozora modela |
| `sessionAvailability` | 0.0476 | Dostupnost OAuth sesije kandidatske veze za ovu sesiju (`getOAuthSessionAvailability()`; veze koje nisu OAuth imaju rezultat 1.0) |
| `connectionDensity` | 0.0476 | Raspoređuje opterećenje na veze istog provajdera (anti-koncentracija) |
| `cacheAffinity` | 0.00 | Afinitet Rendezvous-hash-a prema konekciji koja najvjerovatnije već sadrži prefiks prompt-cache ovog zahtjeva (`open-sse/services/combo/promptCacheAffinity.ts`); onemogućeno prema zadanim postavkama (#8008) |
| `resetWindowAffinity` | 0.00 | Pristrasnost prema vezama čiji je prozor za resetiranje kvote povoljan (onemogućeno prema zadanim postavkama) |
| `kvalitet` | 0,03 | Signal o kvaliteti izlaza vođen povratnom informacijom iz sistema za praćenje kvaliteta događaja usmjeravanja; kandidati bez zapažanja dobijaju neutralnu ocjenu 0,5 |
| `pouzdanost` | 0,00 | Uočeni udio uspjeha, `1 - stopa neuspjeha`, iz 24 sata historije korištenja iza deset uzoraka (inače metrike u realnom vremenu); kandidati bez zapažanja čitaju se kao 1,0. Onemogućeno prema zadanim postavkama |

**Zbir:** `0,1429 + 0,1605 + 0,1429 + 0,1143 + 0,0762 + (7 × 0,0476) + 0,00 + 0,00 + 0,03 + 0,00 = 1,0` kako je deklarisano u `DEFAULT_WEIGHTS`; težine koje je konfigurisao korisnik se renormalizuju u distribuciju pomoću `normalizeScoringWeights()` prije bodovanja.

## Paketi modova

6 unaprijed definiranih profila težina u `open-sse/services/autoCombo/modePacks.ts`. Svaki paket u potpunosti zamjenjuje zadane težine kako bi se odabir usmjerio prema jednom cilju. Svaki paket već daje `1.0` (`0.9999` ispisano na četiri decimale), tako da `normalizeScoringWeights()` nema ništa smisleno za ispravljanje kada je paket aktivan — vrijednosti ispod su, zaokruženo, one koje primjenjuje ocjenjivač.

| Faktor | brza dostava | ušteda troškova | kvalitet na prvom mjestu | prilagođeno van mreže | pouzdanost na prvom mjestu | haos-način rada |
| :------------------- | :--------- | :---------- | :----------- | :------------- | :---------------- | :---------- |
| `kvota` | 0,1133 | 0,1133 | 0,0752 | **0,3324** | 0,1133 | 0,0376 |
| `zdravlje` | 0,2667 | 0,1810 | 0,1714 | 0,2667 | **0,3524** | **0,4000** |
| `costInv` | 0,0276 | **0,3324** | 0,0276 | 0,0752 | 0,0181 | 0,0140 |
| `latencyInv` | **0,3048** | 0,0476 | 0,0476 | 0,0476 | 0,0476 | 0,0186 |
| `taskFit` | 0,0952 | 0,0952 | **0,3524** | 0,0000 | 0,0952 | 0,1905 |
| `stabilnost` | 0,0000 | 0,0476 | 0,1429 | 0,0952 | 0,1905 | 0,1714 |
| `PrioritetVrha` | 0,0376 | 0,0376 | 0,0276 | 0,0376 | 0,0276 | 0,0040 |
| `tierAffinity` | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0.0000 |
| `specifičnostPodudaranje` | 0,0000 | 0,0000 | 0,0000 | 0,0000 | 0,0000 | 0,0000 |
| `contextAffinity` | 0,0095 | 0,0000 | 0,0000 | 0,0000 | 0,0000 | 0,0186 |
| `DostupnostSesije` | 0,0476 | 0,0476 | 0,0476 | 0,0476 | 0,0476 | 0,0476 |
| `resetWindowAffinity` | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0.0000 | 0.0000 |
| `Gustoća veze` | 0,0476 | 0,0476 | 0,0476 | 0,0476 | 0,0476 | 0,0476 |
| `kvalitet` | 0,02 | 0,02 | **0,03** | 0,02 | 0,02 | 0,02 |
| `pouzdanost` | 0,03 | 0,03 | 0,03 | 0,03 | **0,04** | 0,03 |

Napomene:

- **Paketi nose `kvalitet` i `pouzdanost`** (`kvalitet 0,02`, `kvalitet-prvo 0,03`; `pouzdanost 0,03`, `pouzdanost-prvo 0,04`) i zamjenjuju mapu težina na veliko (`težine = paket`, ne spajanje). `DEFAULT_WEIGHTS` nosi `kvalitet 0,03 / pouzdanost 0`; odabir `uravnoteženo`/`podrazumijevano` zadržava te zadane vrijednosti, odabir paketa koristi gornje vrijednosti paketa. Na hladnom skupu (još nema zapažanja, pa `kvalitet 0,5` i `pouzdanost 1`) ova dva faktora dodaju `+0,04` pod generičkim paketom (`0,03 + 0,01`), `+0,045` pod `kvalitet-prvo` i `+0,05` pod `pouzdanost-prvo`.
- `tierAffinity`, `specificityMatch` i `resetWindowAffinity` su eksplicitno `0` u svakom paketu.
- Naglasak svakog pakovanja na prvi pogled:
- **brza isporuka** → latencyInv 0.3048 + health 0.2667 (niska latencija, zdrave veze)
- **ušteda troškova** → trošakInv 0.3324 (najjeftiniji tokeni pobjeđuju)
- **kvalitet na prvom mjestu** → taskFit 0,3524 + stabilnost 0,1429 + kvalitet 0,03, najviši od svih paketa (najbolji model za zadatak, konzistentan)
- **prilagođeno za rad van mreže** → kvota 0,3324 + zdravlje 0,2667 (maksimalni kapacitet bez obzira na brzinu/cijenu)
- **pouzdanost na prvom mjestu** → zdravlje 0,3524 + stabilnost 0,1905 + pouzdanost 0,04, najviše od svih čopora (najmanje iznenađenja)
- **haos-mod** → zdravlje 0.4000 + taskFit 0.1905 (profil ubrizgavanja grešaka)

### Kontrole po zahtjevu (zaglavlja) — #6023 / #6024 / #6025 / #3470

`Automatska` kombinacija se može upravljati **po zahtjevu** putem tri zaglavlja, bez mijenjanja
pohranjena konfiguracija kombinacije. Ovo se odnosi samo na strategiju `auto` i samo na zahtjev
koji ih nosi; koriste se sačuvani `modePack`/`budgetCap`/`budgetFallback` kombinacije
kada zaglavlje nedostaje.

| Zaglavlje | Prihvata | Efekat |
| :--------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `X-OmniRoute-Mode` | unaprijed postavljeni alias (`fast`, `balanced`, `quality`, `cheap`, `reliable`, `offline`) ili neobrađeni naziv paketa (`ship-fast`, `cost-saver`, `quality-first`, `offline-friendly`, `reliability-first`) | Nadjačava težine bodovanja za ovaj zahtjev. `balanced`/`default` prisiljava zadane težine (bez paketa). Nepoznate vrijednosti se ignoriraju (konfiguracija je sačuvana). |
| `X-OmniRoute-Budget` | pozitivan broj (maksimalno USD po zahtjevu) | Fiksni limit troškova: kandidati čiji procijenjeni trošak prelazi taj limit filtriraju se prije odabira. Šta se dešava kada **svaki** kandidat prekorači taj limit kontroliše `X-OmniRoute-Budget-Fallback` ispod. |
| `X-OmniRoute-Budget-Fallback` | `cheapest` (zadano, aliasi: `cheapest-viable`, `soft`) ili `strict` (aliasi: `block`, `hard`) | `cheapest`: vraća se na globalno najjeftinijeg kandidata iako i dalje premašuje ograničenje (zastarjelo ponašanje). `strict`: odbija odabir — zahtjev brzo ne uspijeva s `HTTP 402` umjesto tihog prekoračenja potrošnje. Nepoznate vrijednosti se ignoriraju. |
| `X-OmniRoute-Effort` | `auto` (ostale vrijednosti su rezervirane) | Budžet adaptivnog razmišljanja: kada zahtjev ne sadrži polje obrazloženja bilo kojeg oblika (`reasoning_effort`, `reasoning`, `thinking`), gateway razrješava `auto` na `low`/`medium`/`high` iz determinističkih signala oblika zahtjeva (dužina poruke posljednjeg korisnika, veličina konteksta do posljednje korisničke poruke, prethodni rezultati alata, dubina petlje alata). Signali su ograničeni na trenutni potez - sve nakon posljednje korisničke poruke se ignorira - tako da se svaki zahtjev u petlji alata razrješava na isti nivo (pin bez stanja po potezu, bez stanja sesije, bez eskalacije sredine petlje koja bi prekinula prefikse keša prompt-a uzvodno). Eksplicitno polje obrazloženja klijenta uvijek pobjeđuje. Ograničeno na zahtjeve čije se uzvodno slanje rješava oblikom OpenAI Chat Completions (`targetFormat === FORMATS.OPENAI`) — `reasoning_effort` je polje u obliku OpenAI-a, tako da je zaglavlje no-op na zahtjevu usmjerenom na Claude ili Gemini (pogledajte `open-sse/handlers/chatCore/adaptiveEffortWiring.ts`). |

bash
# Forsirajte najbrži profil, ograničite ovaj zahtjev na 0,05 USD i čvrsto blokirajte umjesto prekomjernog trošenja
curl -sS http://localhost:20128/v1/chat/dovršeci \
-H "Vrsta sadržaja: aplikacija/json" \
-H "X-OmniRoute-Mode: brzi" \
-H "X-OmniRoute-Budget: 0.05" \
-H "X-OmniRoute-Budget-Fallback: strogo" \
-d '{"model":"automatski","poruke":[{"uloga":"korisnik","sadržaj":"zdravo"}]}'
```

Rezolucija je čista funkcija (`open-sse/services/autoCombo/requestControls.ts`);
Riješene vrijednosti šalju podatke u postojeći `config.modePack` / `config.budgetCap` / engine-a
Ulazi `config.budgetFallback`. Kombinovani `config.budgetFallback` ("strict" |
"najjeftiniji") postavlja trajnu politiku; zaglavlje je poništava za jedan zahtjev.

## Sve strategije usmjeravanja

OmniRouteov combo mehanizam podržava **19 strategija usmjeravanja** (deklariranih u `src/shared/constants/routingStrategies.ts` → `ROUTING_STRATEGY_VALUES`). Sam Auto Combo mehanizam je izložen pod strategijom `auto`; ostale su dostupne za trajne kombinacije.

| Strategija                  | Opis                                                                                                                                                                                                             |
| :-------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `prioritet`                 | Uređena lista prvog cilja s eksplicitnim prioritetom                                                                                                                                                             |
| `ponderirano`               | Ponderirano nasumično prema težini po cilju                                                                                                                                                                      |
| `kružno poređenje`          | Prolazi kroz ciljeve po redu                                                                                                                                                                                     |
| `kontekstni relej`          | Prenošenje konteksta između ciljeva (dugi razgovori)                                                                                                                                                             |
| `fill-first`                | Popuni kvotu svakog cilja prije prelaska na sljedeći                                                                                                                                                             |
| `p2c`                       | Nasumično balansiranje opterećenja s izborima potencije dva                                                                                                                                                      |
| `slučajno`                  | Uniformni slučajni odabir                                                                                                                                                                                        |
| `najmanje korišteno`        | Odaberite cilj s najnižim strujnim opterećenjem                                                                                                                                                                  |
| `optimizirano troškovima`   | Minimizirajte $ po zahtjevu s obzirom na cijene kataloga                                                                                                                                                         |
| `reset-aware` ⭐            | Prioritizirajte prema vremenu resetiranja kvote — kratki prozori za resetiranje imaju viši rang                                                                                                                  |
| `reset-window`              | Preferiraj ciljeve čiji se kvotni prozor najbrže resetuje                                                                                                                                                        |
| `headroom`                  | Odaberite cilj s najviše preostalog prostora za kvotu                                                                                                                                                            |
| `strogo-random`             | Slučajno bez deduplikacije ponavljanja                                                                                                                                                                           |
| `auto`                      | Koristite automatsko kombinovano bodovanje (16 faktora) — **preporučeno**                                                                                                                                        |
| `lkgp`                      | Posljednja poznata ispravna putanja (priključuje se na posljednjeg uspješnog pružatelja usluga, a zatim se vraća na pravila)                                                                                     |
| `optimizirano za kontekst`  | Odaberite cilj koji najbolje odgovara trenutnoj veličini konteksta                                                                                                                                               |
| `optimizirano za keširanje` | Preuredite ciljeve prema afinitetu prompt-keširanja — prva se pokušava uspostaviti veza koja najvjerovatnije već sadrži keširani prefiks ovog zahtjeva (`open-sse/services/combo/promptCacheAffinity.ts`, #8008) |
| `fuzija` 🧬                 | Paralelno podijelite na panel modela, a zatim sintetizirajte jedan odgovor putem sudije (vidi dolje)                                                                                                             |
| `cjevovod`                  | Pokreni ciljeve sekvencijalno, povezujući izlaz svakog koraka sa ulazom sljedećeg koraka; vraća se samo konačni odgovor (#6396)                                                                                  |

⭐ = Novo u v3.8.0 · 🧬 = Novo u v3.8.36

### `ponderirana` semantika

`ponderirano` je **proporcionalno nasumično izvlačenje po zahtjevu**
(`open-sse/services/combo/targetSorters.ts` → `selectWeightedTarget`), nije ekvilajzer:

- Svaki zahtjev izvlači **jedan** korak sa vjerovatnoćom `težina / ukupnatežina`; preostali koraci
  su poređani po opadajućoj težini kao rezervni lanac za taj zahtjev.
- Korak čija je težina `0` (ili nedostaje) se **nikada ne crta** dok bilo koji drugi korak ima
  težina > 0 — može poslužiti samo kao rezerva nakon što nacrtani korak ne uspije. Samo kada **sve**
  Ako su težine 0, da li selekcija postaje uniformna.
- Koraci čiji ciljevi nisu dostupni — prekidač provajdera `OTVORENO`, veza
  vrijeme hlađenja, zaključavanje modela — uklanjaju se iz izvlačenja prije nego što se to dogodi
  (`open-sse/services/combo/targetResolution.ts`), tako da jedan ispravan korak može privremeno
  pobijediti u svakom zahtjevu.
- `stickyWeightedLimit` (kombinovana konfiguracija, podrazumijevano `1` = isključeno) zakači nacrtani korak za taj broj
  uzastopni uspjesi prije ponovnog izvlačenja.

Za strogu rotaciju koristite `kružni postupak`; jednake težine na `ponderiranim` daju statističke — ne
stroga — ravnoteža.

## Strategija fuzije

`Fuzija` je jedina strategija koja **ne** bira jednu metu. Ona rasipa prompt.
do **svakog modela panela paralelno**, zatim konfigurabilni **model sudije** sintetizira
jedan konačni odgovor od svih odgovora panela. Preuzeto sa uzvodnog `decolua/9router`
(OpenRouter-ov Fusion dizajn); implementacija u `open-sse/services/fusion.ts`.

Kako funkcioniše:

0. **Zaobilaženje ležišta alata** — zahtjev koji nosi neprazan niz `alata` sa
   `tool_choice` nije eksplicitno `"none"` preskače panel u potpunosti: usmjerava direktno na
   jedan model (konfigurisani sudija ili `panel[0]`) sa `alatima`/`izborom_alata`
   prošao bez izmjena. Članovi panela nemaju pristup alatima i sudiji
   Direktiva za sintezu obeshrabruje emisiju poziva alata, tako da agentski/klijenti koji pozivaju alate
   dobiti pravu odluku na osnovu pozivanja alata umjesto sintetizirane proze (#6771).
1. **Raširivanje** (samo zahtjevi koji ne sadrže alate) — upit se šalje svakoj ploči
   model odjednom, prisilno nestreamanje s uklonjenim alatima (sudija treba kompletirati
   proza ​​za sintezu).
2. **Prikupljanje zahtjeva za kvorum** — čim stignu odgovori `minPanel`, kratka odgoda
   Tajmer počinje za zaostale, a zatim se fuzija nastavlja sa onim što je prikupljeno.
   Ovo ograničava kaznu najsporijeg modela na vrijeme čekanja na zidu, ograničenu fiksnim timeoutom.
3. **Sinteza sudije** — odgovori panela su anonimizirani („Izvor 1“, „Izvor 2“, ... — dakle
   Sudija vaga supstancu, a ne marku modela) i predaje se sudiji, koji analizira
   konsenzus / kontradikcije / djelimična pokrivenost / jedinstveni uvidi / slijepe tačke, zatim
   piše **jedan** autoritativni odgovor. Sudija zadržava original klijenta
   Zastavica `stream` + alati, tako da strujanje i korištenje alata za nizvodno i dalje funkcionira.
4. **Graciozna degradacija** — 0 odgovora na panelu → `503`; tačno 1 preživjeli → taj odgovor
   vraća se direktno (nema se štapa s fiksatorom); panel s jednim modelom odgovara direktno.

Član panela može biti i referenca na korak `combo-ref` (`{kind: "combo-ref", comboName: "..."}`).
još jedna kombinacija — rješava se kao **jedan glas crne kutije** (potpuno rekurzivno slanje u
referentna kombinacija, a ne proširenje vlastitih ciljeva te kombinacije), s istom zaštitom od dubine/ciklusa
svaka druga strategija koja koristi kombinaciju referenci već koristi (#6764).

### Konfiguracija

Konfigurirano na `config` blobu kombinacije (bez migracije sheme — ponovno koristi postojeću
tabela `kombinacija`):

| Polje                                    | Tip      | Zadano             | Svrha                                                                                    |
| :--------------------------------------- | :------- | :----------------- | :--------------------------------------------------------------------------------------- |
| `config.judgeModel`                      | `string` | model prvog panela | Model koji sintetizira konačni odgovor                                                   |
| `config.fusionTuning.minPanel`           | `number` | `2`                | Uspješni odgovori su potrebni prije početka odbrojavanja (fiksirano na `[2, panelSize]`) |
| `config.fusionTuning.stragglerGraceMs`   | `number` | `8000`             | Koliko dugo čekati na one koji zaostaju nakon što se dostigne kvorum                     |
| `config.fusionTuning.panelHardTimeoutMs` | `number` | `90000`            | Apsolutno ograničenje tako da jedan zaglavljeni model ne može zaustaviti zahtjev         |

Zadane vrijednosti se nalaze u `FUSION_DEFAULTS` (`open-sse/services/fusion.ts`).

### Primjer

bash
curl -X POST http://localhost:20128/api/combos \
-H "Autorizacija: Nosilac <ključ>"
-H "Vrsta sadržaja: aplikacija/json" \
-d '{
"naziv": "fuzijska-panel",
"strategija": "fuzija",
"ciljevi": [
{ "model": "cc/claude-opus-4-7" },
{ "model": "cx/gpt-5.5" },
{ "model": "glm/glm-5.1" }
],
"konfiguracija": {
"judgeModel": "cc/claude-opus-4-7",
"fusionTuning": { "minPanel": 2, "stragglerGraceMs": 8000, "panelHardTimeoutMs": 90000 }
}
}'

```

Zatim ga nazovite kao bilo koju kombinaciju: `{"model":"fusion-panel","messages":[...]}`.

## Virtuelna fabrika auto-kombinacija

Mehanizam za automatsko kombinovanje ne zahtijeva unaprijed definirane kombinacije. Umjesto toga, `open-sse/services/autoCombo/virtualFactory.ts` gradi kandidate u hodu:

1. Izvlači `getProviderConnections({ isActive: true })` (sve omogućene veze)
2. Filtrira one s važećim vjerodajnicama (API ključ ili OAuth token koji nije istekao putem `hasUsableOAuthToken()`)
3. Unakrsne reference sa `getProviderRegistry()` za dostupnost modela + cijene
4. Za svaki tuple `(provider, model, connection)`, gradi `VirtualAutoComboCandidate`
5. Bira `connection.defaultModel` (ili prvi model registra) kao cilj otpreme
6. Boduje svakog kandidata koristeći 16-faktorski `scorePool()` i paket težina varijante
7. Vraća rezultujuću `AutoComboConfig` iz memorije za `handleComboChat()` — nikada nije sačuvana u bazi podataka

To znači da **dodavanje novog provajdera sa omogućenom opcijom `auto/*` automatski proširuje skup kandidata** — nije potrebno ručno uređivanje kombinacija. Virtuelna kombinacija se ponovo gradi po zahtjevu, tako da se novododane ili novoispravne veze odmah preuzimaju.

## Samoizlječenje

- **Privremeno isključenje**: Rezultat < 0,2 → isključeno na 5 minuta (progresivno odgađanje, maksimalno 30 minuta)
- **Svjestanost prekidača**: OTVORENO → automatsko isključenje; POLUOTVORENO → zahtjevi sonde
- **Incidentni način rada**: >50% OTVORENO → onemogući istraživanje, maksimiziraj stabilnost
- **Oporavak nakon hlađenja**: Nakon isključenja, prvi zahtjev je "sonda" sa smanjenim vremenskim ograničenjem

## Istraživanje bandita

5% zahtjeva (konfigurabilno) se usmjerava nasumičnim provajderima za istraživanje. Onemogućeno u režimu incidenta.

## API

Ne postoji **posebna krajnja tačka `POST /api/combos/auto`** — Auto-Combo se koristi na dva načina:

1. **Nulta konfiguracija (preporučeno):** Pošaljite bilo koji zahtjev za završetak chata sa `model: "auto"` ili `model: "auto/<varijanta>"`. Virtuelna fabrika gradi kombinaciju po zahtjevu — bez perzistencije, bez potrebe za API pozivima.

2. **Trajna kombinacija sa `strategy: "auto"`:** Kreirajte regularnu kombinaciju putem `POST /api/combos` i postavite `strategy: "auto"` plus `config.auto.weights` / `config.auto.candidatePool`. Koristi se isti sistem za bodovanje; kombinacija se pohranjuje u `combos` i može se ponovo koristiti po ID-u.

Za otkrivanje, `GET /api/combos/auto` navodi svaku varijantu sa njenim riješenim skupom kandidata plus `context_length` / `max_output_tokens` - MAX u prozorima skupa kandidata. Klijenti (npr. opencode dodatak) moraju oglašavati ove vrijednosti umjesto `0`: nulti kontekst u potpunosti onemogućava automatsko sažimanje opencode-a, omogućavajući sesijama da rastu sve dok čišćenje historije gateway-a ne uništi kontekst. MAX je siguran za oglašavanje jer automatski kombinovani kontekstni predfilter usmjerava prevelike zahtjeve kandidatima sa velikim prozorima.

bash
# Korištenje nulte konfiguracije (bez kreiranja kombinacija)
curl -X POST http://localhost:20128/v1/chat/completions \
-H "Autorizacija: Nosilac <ključ>"
-H "Vrsta sadržaja: aplikacija/json" \
-d '{"model":"automatsko/kodiranje","poruke":[{"uloga":"korisnik","sadržaj":"Pozdrav"}]}'

# Trajna automatska kombinacija putem regularne krajnje tačke kombinacija
curl -X POST http://localhost:20128/api/combos \
-H "Vrsta sadržaja: aplikacija/json" \
-d '{"id":"my-auto","name":"Automatski koder","strategy":"auto","config":{"auto":{"candidatePool":["anthropic","google","openai"],"weights":{"quota":0.15,"health":0.3,"costInv":0.05,"latencyInv":0.35,"taskFit":0.1,"stability":0,"tierPriority":0.05}}}}'
```

### Strategije automatskog ruteriranja

Trajne kombinacije `strategy: "auto"` mogu postaviti `config.routerStrategy` (ili naslijeđenu verziju
`config.auto.routerStrategy`) na jedno od:

- `pravila` — zadano ponderirano bodovanje
- `score` — odabire najviši konfigurirani ponderirani rezultat. Tačne veze čuvaju konfigurirane
  redoslijed kandidata; postojeći uzorci `explorationRate` iz punog rangiranog skupa.
- `cost` / `eco` — najjeftiniji zdravstveni pružatelj usluga
- `latencija` / `brzo` — najniža p95 latencija sa kaznom za pouzdanost
- `sla-aware` / `sla` — preferiraju kandidate koji zadovoljavaju p95 latenciju, stopu grešaka i opcionalno
  trošak SLO-a
- `lkgp` — prvi posljednji poznati ispravan provajder

### Detaljan pregled strategija rutera

Mehanizam za automatsko kombinovanje otkriva 6 implementacija **RouterStrategy** koje se mogu priključiti.
možete zamijeniti putem `config.routerStrategy` (ili naslijeđenog `config.auto.routerStrategy`).
Svaka strategija bira jednog provajdera iz grupe kandidata, uz zadani `RoutingContext`.
(tip zadatka, savjeti za alat/viziju, procjena tokena, opcionalna SLA politika, opcionalno
posljednji poznati ispravan provajder).

#### 1. `rules` (zadano) — bodovanje sa 16 faktora ponderisano

Omotava postojeći sistem bodovanja. Filtrira prekidač `OPEN`.
kandidati, zatim pokreće `scorePool()` sa trenutnim tipom zadatka i `getTaskFitness()`,
odabir pružatelja usluga s najboljim rezultatom.

```ts
klasa RulesStrategyImpl implementira RouterStrategy {
samo za čitanje ime = "pravila";
samo za čitanje opis = "16-faktorsko ponderirano bodovanje (pogledajte DEFAULT_WEIGHTS)";

odaberi(bazen, kontekst) {
const prihvatljiv = pool.filter((c) => c.circuitBreakerState !== "OTVORENO");
const rangiran = scorePool(
eligible.length > 0 ? eligible : pool,
kontekst.tipzadatka,
nedefinirano,
getTaskFitness
);
vratiti { provajder: rangiran[0].provajder /* ... */ };
}
}
```

**Kada koristiti**: Zadano. Koristite kada želite uravnotežen kompromis između svih signala.

**Alias**: `pravila` (bez aliasa)

---

#### 2. `cost` / `eco` — najjeftiniji zdravstveni pružatelj usluga

Sortira skupinu kandidata prema `costPer1MTokens` (uzlazno) i bira najjeftinijeg.
Prvo filtrira kandidate tipa `OTVORENO`.

```ts
klasa CostStrategyImpl implementira RouterStrategy {
samo za čitanje ime = "cijena";
samo za čitanje opis = "Uvijek bira najjeftinijeg dostupnog provajdera";

odaberi(bazen, kontekst) {
const zdrav = pool.filter((c) => c.circuitBreakerState !== "OTVORENO");
const sortirano = [...zdravo].sort((a, b) => a.costPer1MTokens - b.costPer1MTokens);
vratiti { provajder: sortirano[0].provajder /* ... */ };
}
}
```

**Kada koristiti**: Radna opterećenja osjetljiva na troškove, grupna obrada ili pozadinski poslovi.

**Alijasi**: `cost`, `eco`

---

#### 3. `latencija` / `brzo` — najniža latencija p95 sa kaznom za pouzdanost

Sortira po `p95LatencyMs + (errorRate * 1000)`. Kazna za stopu grešaka osigurava
Nepouzdani pružatelji usluga su niže rangirani čak i ako im je nominalna latencija niska.

```ts
klasa LatencyStrategyImpl implementira RouterStrategy {
ime samo za čitanje = "latencija";
opis samo za čitanje = "Prioritet daje najnižoj latenciji p95 s ponderiranjem pouzdanosti";

odaberi(bazen, kontekst) {
const zdrav = pool.filter((c) => c.circuitBreakerState !== "OTVORENO");
const sortirano = [...zdravo].sort(
(a, b) => a.p95LatencyMs + a.StopaGreške * 1000 - (b.p95LatencyMs + b.StopaGreške * 1000)
);
vratiti { provajder: sortirano[0].provajder /* ... */ };
}
}
```

**Kada koristiti**: Radna opterećenja osjetljiva na latenciju poput chata u stvarnom vremenu, automatskog dovršavanja ili
interaktivni asistenti za kodiranje.

**Aliasi**: `latencija`, `brzo`

---

#### 4. `sla-aware` / `sla` — usklađenost sa SLO-om u pogledu latencije/greške/troška

Ocjenjuje svakog kandidata prema tome koliko dobro zadovoljava konfiguriranu SLO politiku:

| Faktor               | Težina | Formula                                                     |
| -------------------- | ------ | ----------------------------------------------------------- |
| Rezultat latencije   | 35%    | `prag / maks(vrijednost, ε)`                                |
| Rezultat greške      | 35%    | `prag / maks(vrijednost, ε)`                                |
| Zdravstveni rezultat | 15%    | `1.0` (ZATVORENO) / `0.5` (POLUOTVORENO) / `0.0` (OTVORENO) |
| Rezultat troškova    | 10%    | `prag / max(vrijednost, ε)` ili inverzno normalizirana      |
| Rezultat stabilnosti | 5%     | inverzna normalizirana latencija stddev                     |

Kada je `hardConstraints: true`, kandidati se sortiraju prvenstveno prema **rezultatu kršenja**
(koliko daleko premašuju bilo koji SLO), zatim po kompozitnom rezultatu. U suprotnom, to je samo
kompozitni rezultat.

```ts
klasa SLAStrategyImpl implementira RouterStrategy {
ime samo za čitanje = "svjestan SLA-a";
opis samo za čitanje =
"Odabire provajdera koji najvjerovatnije zadovoljava SLO-ove u pogledu latencije, stope grešaka i troškova";

odaberi(bazen, kontekst) {
// ... boduje svakog kandidata u odnosu na politiku: { targetP95Ms, maxErrorRate, maxCostPer1MTokens, hardConstraints }
}
}
```

**SLA polja** (postavljena u combo konfiguraciji):

```json
{
"strategija": "automatski",
"konfiguracija": {
"routerStrategy": "svjestan SLA-a",
"slaTargetP95Ms": 1500,
"slaMaxErrorRate": 0,05,
"slaMaxCostPer1MTokens": 5,
"slaHardConstraints": tačno
}
}
```

**Kada koristiti**: Produkcijska opterećenja sa strogim ograničenjima latencije, stope grešaka ili budžeta troškova.

**Alijasi**: `sla-svjestan`, `sla`

---

#### 5. `lkgp` — prvi posljednji poznati ispravan provajder

Prvo pokušava s **posljednjim poznatim ispravnim provajderom** (ako je postavljen), a zatim se vraća na
Strategija `pravila`. Korisno za ljepljivost sesije — isti provajder se brine
zahtjevi za praćenje u razgovoru.

```ts
klasa LKGPStrategyImpl implementira RouterStrategy {
ime samo za čitanje = "lkgp";
samo za čitanje opis = "Prvo pokušava s posljednjim poznatim ispravnim provajderom, a zatim se vraća na pravila";

odaberi(bazen, kontekst) {
ako (context.lkgpOmogućeno === false) {
vratiti getStrategy("pravila").odaberi(pool, kontekst);
}

ako (kontekst.zadnjiKnownGoodProvider) {
konstantni kandidati = pool.filter(
(c) => c.provider === context.lastKnownGoodProvider && c.circuitBreakerState !== "OTVORENO"
);
ako (kandidati.dužina > 0) {
vratiti { provajder: kandidati[0].provajder /* ... */ };
}
}

// Strategija vraćanja na pravila
vratiti getStrategy("pravila").odaberi(pool, kontekst);
}
}
```

**Kada koristiti**: Razgovori u više smjerova gdje želite da isti pružatelj usluga obavlja
zahtjevi za praćenje (npr. za keširanje, kontinuitet konteksta ili konzistentnost cijena).

**Alias**: `lkgp` (bez aliasa)

---

### Strategije prilagođenog rutera

Možete registrovati vlastitu implementaciju `RouterStrategy` putem javnog API-ja:

```ts
uvoz {
Strategija registracije,
upišite RouterStrategy,
} iz "@omniroute/open-sse/services/autoCombo/routerStrategy";

klasa MyCustomStrategy implementira RouterStrategy {
ime samo za čitanje = "moj-prilagođeni";
opis samo za čitanje = "Moja prilagođena strategija usmjeravanja";

odaberi(bazen, kontekst) {
// Vaša logika usmjeravanja ovdje
vratiti {
provajder: pool[0].provajder,
model: bazen[0].model,
strategija: this.name,
razlog: "MojaPrilagođenaStrategija: ...",
Razmatraju se kandidati: dužina.bazena,
konačni rezultat: 1.0,
};
}
}

registerStrategy("moja-prilagođena", nova MojaPrilagođenaStrategija());
```

Zatim ga koristite:

```json
{
  "strategija": "automatski",
  "konfiguracija": {
    "routerStrategy": "moj-prilagođeni"
  }
}
```

---

### Vodič za odabir strategije rutera

| Primjer upotrebe         | Strategija       | Razlog                                      |
| ------------------------ | ---------------- | ------------------------------------------- |
| Uravnoteženo opterećenje | `pravila`        | Zadano — uzima u obzir sve faktore          |
| Minimiziraj troškove     | `trošak`         | Uvijek bira najjeftinije                    |
| Minimiziraj latenciju    | `latencija`      | Bira najbržeg i pouzdanog provajdera        |
| Strogi SLO-ovi           | `svjestan SLA-a` | Filtrira po p95/greškama/pragovima troškova |
| Ćaskanje s više okretaja | `lkgp`           | Ljepljivost sesije                          |

Polja svjesna SLA-a:

```json
{
"strategija": "automatski",
"konfiguracija": {
"routerStrategy": "svjestan SLA-a",
"slaTargetP95Ms": 1500,
"slaMaxErrorRate": 0,05,
"slaMaxCostPer1MTokens": 5,
"slaHardConstraints": tačno
}
}
```

## Kondicija uz zadatke

Više od 30 modela je ocijenjeno u 6 tipova zadataka (`kodiranje`, `pregled`, `planiranje`, `analiza`, `otklanjanje grešaka`, `dokumentacija`). Podržava džoker obrasce (npr., `*-koder` → visok rezultat kodiranja).

## Sažetak varijanti automobila

Uključujući goli `auto` (podrazumijevano) plus 6 vrijednosti `AutoVariant` deklariranih u `autoPrefix.ts`, postoji **7 pozivajućih ID-ova modela**:

`automatski`, `automatski/kodiranje`, `automatski/brzo`, `automatski/jeftino`, `automatski/van mreže`, `automatski/pametno`, `automatski/lkgp`

(Sam `AutoVariant` nabraja 6 vrijednosti; 7. opcija je "bez varijante" — samo `auto` — obrađuje se pomoću `parseAutoPrefix()` kao `varijanta: nedefinirana`.)

## Kako se nivoi uklapaju u Auto-Combo

Funkcija bodovanja sa 16 faktora (`open-sse/services/autoCombo/scoring.ts`) tretira nivo
članstvo kao dva signala: `tierPriority` (0,0476) i `tierAffinity` (0,0476). Pogledajte
kanonska [tabela faktora bodovanja](#kako-to-radi-uporno-automatske-kombinacije) iznad za potpuni prikaz
`DEFAULT_WEIGHTS` set — nadjačavanja po paketu (brza dostava/ušteda troškova/kvalitet na prvom mjestu/
(prilagođeno za korištenje van mreže) navedeni su u tabeli "Profili težine po pakovanju".

Sam nivo **ne** prisiljava prvi nivo — ako je latencija prvog nivoa loša ili
Odnos cijene i kvalitete je neoptimalan, pobjeđuje 2. nivo. Da biste nametnuli redoslijed po nivoima, koristite kombinaciju.
`prioritet` strategije i sortiranje pružatelja usluga po nivoima.

Da biste snažno favorizirali Tier 1 (pretplata), povećajte težinu `tierPriority`:

```json
{
  "strategija": "automatski",
  "config": { "auto": { "weights": { "tierPriority": 0.3, "costInv": 0.05 } } }
}
```

Pogledajte `docs/marketing/TIERS.md` za definicije nivoa i klasifikaciju pružatelja usluga.

## Testiranje i pokrivenost

### Deterministička matrica odlučivanja o usmjeravanju (`npm run test:combo:matrix`)

`tests/integration/combo-matrix/*.test.ts` dokazuje **odluku** o usmjeravanju svih 19
javne strategije od početka do kraja kroz pravi kombinirani cjevovod s lažnim uzvodnim postupkom.
Pokrivenost uključuje:

- Svih 19 strategija `ROUTING_STRATEGY_VALUES` (uređene, ponderirane, troškovne, kontekstualne, fuzije, ...).
- `kvota-raspodjele` (interno) od početka do kraja: pravednost DRR-a + depriorizacija zasićenja putem
  pravi `selectQuotaShareTarget` šav (`registerQuotaFetcher` / `setLKGP` /
  `__setHeadroomSaturationFetcherForTests`).
- pokrivenost univerzalnim prenosom konteksta preko svakog broja ciljeva.

Ovaj paket se izvršava u CI (`test:integration` posao) sa `--test-concurrency=1` i
`--test-force-exit` tako da je deterministički i ne zahtijeva aktivne vjerodajnice.

### Zatvoreni prostor za pušenje uživo (NE u CI - pravi dobavljači)

| Komanda                                | Šta radi                                                                                      |
| :------------------------------------- | :-------------------------------------------------------------------------------------------- |
| `npm run test:combo:live`              | Pravo rutiranje u procesu sa `RUN_COMBO_LIVE=1`; snima snimke aktivne OmniRoute baze podataka |
| `npm run test:combo:live:vps`          | HTTP pozivi prema aktivnom OmniRoute serveru (postavi `COMBO_LIVE_BASE_URL`)                  |
| `npm run test:combo:live:vps:failover` | Isto, sa namjernim scenarijima prebacivanja u slučaju kvara                                   |

Ovi testovi dima vježbaju stvarnu putanju žice (kombinacija → provajder → kompletiranje). Oni su
namjerno isključeni iz CI jer zahtijevaju aktivne akreditive i pristup VPS-u.

---

## Datoteke

| Datoteka                                                  | Svrha                                                                                                                                     |
| :-------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| `open-sse/services/autoCombo/scoring.ts`                  | Funkcija bodovanja sa 16 faktora, `DEFAULT_WEIGHTS`, norma grupe                                                                          |
| `open-sse/services/autoCombo/taskFitness.ts`              | Model × pretraga fitnesa zadatka                                                                                                          |
| `open-sse/services/autoCombo/engine.ts`                   | Logika odabira, bandit, ograničenje budžeta                                                                                               |
| `open-sse/services/autoCombo/selfHealing.ts`              | Isključenje, sonde, način rada za incidente                                                                                               |
| `open-sse/services/autoCombo/modePacks.ts`                | 6 profila težine (brza dostava, ušteda troškova, kvalitet na prvom mjestu, prilagođeno van mreže, pouzdanost na prvom mjestu, haos-režim) |
| `open-sse/services/autoCombo/autoPrefix.ts`               | `auto/` parser prefiksa + 6 varijanti                                                                                                     |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Kreira `AutoComboConfig` u memoriji iz aktivnih konekcija                                                                                 |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Testna kuka za lažno kreiranje registra provajdera                                                                                        |
| `src/shared/constants/routingStrategies.ts`               | `VRIJEDNOSTI_STRATEGIJE_RUTIRANJA` (19 strategija)                                                                                        |
| `src/sse/handlers/chat.ts`                                | Integracija: kratki spoj s automatskim prefiksom                                                                                          |
