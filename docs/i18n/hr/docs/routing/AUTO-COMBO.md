# OmniRoute Auto-Combo Engine (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/AUTO-COMBO.md) · 🇪🇹 [am](../../../am/docs/routing/AUTO-COMBO.md) · 🇸🇦 [ar](../../../ar/docs/routing/AUTO-COMBO.md) · 🇦🇿 [az](../../../az/docs/routing/AUTO-COMBO.md) · 🇧🇬 [bg](../../../bg/docs/routing/AUTO-COMBO.md) · 🇧🇩 [bn](../../../bn/docs/routing/AUTO-COMBO.md) · 🇧🇦 [bs](../../../bs/docs/routing/AUTO-COMBO.md) · 🇨🇿 [cs](../../../cs/docs/routing/AUTO-COMBO.md) · 🇩🇰 [da](../../../da/docs/routing/AUTO-COMBO.md) · 🇩🇪 [de](../../../de/docs/routing/AUTO-COMBO.md) · 🇬🇷 [el](../../../el/docs/routing/AUTO-COMBO.md) · 🇪🇸 [es](../../../es/docs/routing/AUTO-COMBO.md) · 🇪🇪 [et](../../../et/docs/routing/AUTO-COMBO.md) · 🇮🇷 [fa](../../../fa/docs/routing/AUTO-COMBO.md) · 🇫🇮 [fi](../../../fi/docs/routing/AUTO-COMBO.md) · 🇫🇷 [fr](../../../fr/docs/routing/AUTO-COMBO.md) · 🇮🇪 [ga](../../../ga/docs/routing/AUTO-COMBO.md) · 🇮🇳 [gu](../../../gu/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ha](../../../ha/docs/routing/AUTO-COMBO.md) · 🇮🇱 [he](../../../he/docs/routing/AUTO-COMBO.md) · 🇮🇳 [hi](../../../hi/docs/routing/AUTO-COMBO.md) · 🇭🇺 [hu](../../../hu/docs/routing/AUTO-COMBO.md) · 🇦🇲 [hy](../../../hy/docs/routing/AUTO-COMBO.md) · 🇮🇩 [id](../../../id/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ig](../../../ig/docs/routing/AUTO-COMBO.md) · 🇮🇹 [it](../../../it/docs/routing/AUTO-COMBO.md) · 🇯🇵 [ja](../../../ja/docs/routing/AUTO-COMBO.md) · 🇬🇪 [ka](../../../ka/docs/routing/AUTO-COMBO.md) · 🇰🇭 [km](../../../km/docs/routing/AUTO-COMBO.md) · 🇮🇳 [kn](../../../kn/docs/routing/AUTO-COMBO.md) · 🇰🇷 [ko](../../../ko/docs/routing/AUTO-COMBO.md) · 🇱🇹 [lt](../../../lt/docs/routing/AUTO-COMBO.md) · 🇱🇻 [lv](../../../lv/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ml](../../../ml/docs/routing/AUTO-COMBO.md) · 🇮🇳 [mr](../../../mr/docs/routing/AUTO-COMBO.md) · 🇲🇾 [ms](../../../ms/docs/routing/AUTO-COMBO.md) · 🇲🇹 [mt](../../../mt/docs/routing/AUTO-COMBO.md) · 🇲🇲 [my](../../../my/docs/routing/AUTO-COMBO.md) · 🇳🇵 [ne](../../../ne/docs/routing/AUTO-COMBO.md) · 🇳🇱 [nl](../../../nl/docs/routing/AUTO-COMBO.md) · 🇳🇴 [no](../../../no/docs/routing/AUTO-COMBO.md) · 🇮🇳 [or](../../../or/docs/routing/AUTO-COMBO.md) · 🇮🇳 [pa](../../../pa/docs/routing/AUTO-COMBO.md) · 🇵🇭 [phi](../../../phi/docs/routing/AUTO-COMBO.md) · 🇵🇱 [pl](../../../pl/docs/routing/AUTO-COMBO.md) · 🇵🇹 [pt](../../../pt/docs/routing/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/AUTO-COMBO.md) · 🇷🇴 [ro](../../../ro/docs/routing/AUTO-COMBO.md) · 🇷🇺 [ru](../../../ru/docs/routing/AUTO-COMBO.md) · 🇱🇰 [si](../../../si/docs/routing/AUTO-COMBO.md) · 🇸🇰 [sk](../../../sk/docs/routing/AUTO-COMBO.md) · 🇸🇮 [sl](../../../sl/docs/routing/AUTO-COMBO.md) · 🇷🇸 [sr](../../../sr/docs/routing/AUTO-COMBO.md) · 🇸🇪 [sv](../../../sv/docs/routing/AUTO-COMBO.md) · 🇰🇪 [sw](../../../sw/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ta](../../../ta/docs/routing/AUTO-COMBO.md) · 🇮🇳 [te](../../../te/docs/routing/AUTO-COMBO.md) · 🇹🇭 [th](../../../th/docs/routing/AUTO-COMBO.md) · 🇹🇷 [tr](../../../tr/docs/routing/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/AUTO-COMBO.md) · 🇵🇰 [ur](../../../ur/docs/routing/AUTO-COMBO.md) · 🇺🇿 [uz](../../../uz/docs/routing/AUTO-COMBO.md) · 🇻🇳 [vi](../../../vi/docs/routing/AUTO-COMBO.md) · 🇳🇬 [yo](../../../yo/docs/routing/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/AUTO-COMBO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/AUTO-COMBO.md)

---

> **Za korisnike**: Tražite brzi početak? Pogledajte [Korisnički vodič za Auto-Combo](../getting-started/AUTO-COMBO-GUIDE.md) za jednostavna objašnjenja i primjere.

> Samoupravljajući lanci modela s prilagodljivim bodovanjem + automatsko usmjeravanje bez konfiguracije

## Automatsko usmjeravanje bez konfiguracije (prefiks `auto/`)

> **NOVO:** Nije potrebno kreiranje kombija. Koristite prefiks `auto/` izravno u bilo kojem klijentu.

### Brzi primjeri

| ID modela      | Varijanta | Ponašanje                                                                      |
| -------------- | --------- | ------------------------------------------------------------------------------ |
| `auto`         | default   | Svi povezani pružatelji, LKGP strategija, uravnotežene težine                  |
| `auto/coding`  | coding    | Težine s prioritetom kvalitete, pogodno za generiranje kôda                    |
| `auto/fast`    | fast      | Odabir s težinama niske latencije                                              |
| `auto/cheap`   | cheap     | Usmjeravanje optimizirano za trošak (najjeftinije prvo)                        |
| `auto/offline` | offline   | Favorizira pružatelje s najvećom dostupnošću kvote                             |
| `auto/smart`   | smart     | Prioritet kvalitete + viša stopa istraživanja (10%) za bolje otkrivanje modela |
| `auto/lkgp`    | lkgp      | Eksplicitni LKGP (isto kao zadani `auto`)                                      |
| `auto/chaos`   | chaos     | Težine s ubacivanjem grešaka za testiranje otpornosti (kaos inženjering)       |

### Kompozicija kategorije × razine (`auto/<kategorija>:<razina>`)

Sufiksi u OpenRouter stilu razdvajaju **vrstu rute** (kategorija) od **načina optimizacije** (razina), tako da ih možete slobodno kombinirati (#4235 Faza B, `open-sse/services/autoCombo/suffixComposition.ts`):

- **Kategorije** (filtriraju skup kandidata prema sposobnosti): `coding` · `reasoning` · `vision` · `chat` · `multimodal`. `vision`/`multimodal` zadržavaju modele s vizualnim sposobnostima; `reasoning` zadržava modele za rezoniranje/razmišljanje.
- **Razine** (biraju težine bodovanja / filter skupa): `fast` (brza isporuka) · `cheap` (alias `floor`, ušteda troškova) · `reliable` (zdravlje prekidača strujnog kruga + stabilnost latencije) · `free` / `pro` (filtriraju skup prema razini modela putem `classifyTier` — besplatna razina nasuprot premijuma).

| Primjer                | Razrješava se u                                                       |
| ---------------------- | --------------------------------------------------------------------- |
| `auto/coding:fast`     | skup za kodiranje, težine niske latencije                             |
| `auto/coding:cheap`    | skup za kodiranje, optimizirano za trošak (alias `auto/coding:floor`) |
| `auto/reasoning:pro`   | samo modeli za rezoniranje/razmišljanje, premijska razina             |
| `auto/vision`          | modeli s vizualnim sposobnostima (bez razine → uravnotežene težine)   |
| `auto/multimodal:free` | modeli s multimodalnim sposobnostima, samo besplatna razina           |

Svaki valjani `auto/<kategorija>[:<razina>]` razrješava se na zahtjev; kuriran podskup oglašava se u `/v1/models` i na nadzornoj ploči (`AUTO_SUFFIX_VARIANTS` u `open-sse/services/autoCombo/builtinCatalog.ts`). Filtriranje je **fail-open** — ako ograničenje ne odgovara nijednom povezanom modelu, koristi se cijeli skup kako usmjeravanje nikada ne bi prekinulo rad. Jezgreni bodovnik (`combo.ts`) ostaje nepromijenjen; filter kategorije/razine primjenjuje se u `buildAutoCandidates`.

> **Živa inteligencija modela:** prikladnost automatskog usmjeravanja informirana je živim rangiranjima **Arena ELO** + podacima razine s **models.dev** kada je zastavica `ARENA_ELO_SYNC_ENABLED` uključena (u suprotnom se koristi statička mapa prikladnosti).

**Kako koristiti:**

```bash
# Bilo koji IDE ili CLI alat koji podržava OpenAI format
Base URL: http://localhost:20128/v1
API Key:  <your-endpoint-key>

# U svom kôdu/konfiguraciji, postavite model na:
model: "auto"                 # uravnoteženi zadani
model: "auto/coding"          # najbolje za zadatke kodiranja
model: "auto/fast"            # najbrže dostupno
model: "auto/cheap"           # najjeftinije po tokenu
```

**Što se događa:**

1. OmniRoute detektira prefiks `auto/` u `src/sse/handlers/chat.ts`
2. Upituje sve **aktivne veze s pružateljem** iz baze podataka
3. Filtrira one s valjanim vjerodajnicama (API ključ ili OAuth token)
4. Određuje model po vezi (`connection.defaultModel` ili prvi model pružatelja)
5. Gradi **virtualni kombi** u memoriji (ne pohranjuje se u bazi podataka)
6. Usmjerava koristeći profil težina odabrane varijante + LKGP strategiju

**Ključna svojstva:**

- ✅ **Uvijek aktivno:** Nema prekidača, nema kreiranja kombija, nema potrebe za konfiguracijom
- ✅ **Dinamično:** Automatski odražava trenutno povezane pružatelje
- ✅ **Ljepljivost sesije:** LKGP osigurava prioritet posljednjeg uspješnog pružatelja
- ✅ **Svjesno višestrukih računa:** Svaka veza s pružateljem postaje zasebni kandidat
- ✅ **Bez pisanja u bazu podataka:** Virtualni kombi postoji samo za trajanje zahtjeva, nula troškova pohrane

### Kontrola kandidata po ključu (#7819, Razina 1+2)

`GET /v1/auto-combo/{channel}/candidates` (`{channel}` = sufiks nakon `auto/`, ili
doslovno `auto` za osnovni kanal) je **endpoint samo za čitanje** koji navodi
trenutni skup kandidata kanala `auto/*` ukrašen živom dostupnošću, koristeći
postojeća čitanja otpornosti (nikad sirovo stanje prekidača `state`):

- prekidač strujnog kruga pružatelja — `getCircuitBreaker(provider).getStatus()` / `.canExecute()`
- hlađenje veze — `rateLimitedUntil` / `testStatus` na razriješenom retku
  `provider_connections`
- zaključavanje modela — `isModelLocked(provider, connectionId, model)`

Svaki kandidat također nosi zastavicu `excluded` ovog API ključa. Isključenja se pohranjuju
po API ključu (tablica `auto_candidate_overrides`, migracija `128`) — OmniRoute je
jednokorisnički bez tablice `users`, pa je `apiKeyId` najbliži stvarni identitet pozivatelja
— i primjenjuju se na uskom grlu skupa kandidata u
`open-sse/services/autoCombo/virtualFactory.ts` putem čiste, jedinično testirane
`filterExcludedCandidates()` (`open-sse/services/autoCombo/candidateOverrides.ts`).
Filter je **fail-open**: nepostavljeni apiKeyId/kanal ili neuspjeh pretraživanja baze podataka
ostavljaju skup nefiltriranim, pa operator bez konfiguriranih nadjačavanja vidi usmjeravanje
identično bajtovima onome prije ove značajke.

**Odgođeno za naknadno izdanje:** težine po kandidatu + eksplicitno naručivanje (Razina 3
— ulazi u postojeće putanje vagane/prioritetne strategije) i prikvačivanje određene
strategije `combo.ts` po kanalu `auto/*` (Razina 4). Pogledajte plan #7819 za otvoreno
pitanje treba li nadjačavanja zadržati po API ključu ili ih učiniti globalnim s obzirom na
jednokorisnički model.

**Iza kulisa:**

```txt
Zahtjev: { model: "auto/coding" }
   ↓
src/sse/handlers/chat.ts detektira prefiks
   ↓
createVirtualAutoCombo('coding') → candidatePool iz aktivnih veza
   ↓
handleComboChat (isti engine kao i za pohranjene kombije)
   ↓
Automatsko bodovanje odabire najboljeg pružatelja/model po zahtjevu
```

**Datoteke implementacije:**

| Datoteka                                                  | Svrha                                         |
| --------------------------------------------------------- | --------------------------------------------- |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Parser prefiksa (`parseAutoPrefix`)           |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Kreira virtualne objekte `AutoComboConfig`    |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Testna kuka za imitiranje registra pružatelja |
| `src/sse/handlers/chat.ts`                                | Integracija: kratki spoj automatskog prefiksa |
| `src/shared/constants/providers.ts`                       | Sustavni unos `SYSTEM_PROVIDERS.auto`         |

## Nazivi Kombija Koji Se Podudaraju s Pravim ID-om Modela

Kombij čiji je `name` identičan golom ID-u modela (npr. kombij nazvan
`gpt-5.5`) je **namjerni, podržani obrazac**, a ne greška: to je
mehanizam za rezervni odabir pružatelja usluge po ID-u modela dokumentiran u
[#6940](https://github.com/diegosouzapw/OmniRoute/issues/6940). Budući da se
razrješavanje kombija provjerava prije razrješavanja golog ID-a modela
(`getComboForModel()` u `src/sse/services/model.ts`), zahtjev za goli
id `gpt-5.5` usmjerava se kroz ciljeve kombija (npr.
`acme-responses/gpt-5.5`, `backup-responses/gpt-5.5`) umjesto izravno prema
jednom pružatelju usluge — ovo ponovno koristi prednost kombija-prije-prepisa izgrađenu za
[#3227/#3233](https://github.com/diegosouzapw/OmniRoute/issues/3227) i
regresijski je testirana s `tests/unit/responses-combo-resolution-3227.test.ts` i
`tests/unit/combo-name-codex-responses-rewrite.test.ts`.

Stvaranje ili preimenovanje kombija u naziv koji zasjenjuje pravi ID modela
**nikada se ne odbija** — to bi narušilo ovaj dokumentirani tijek rada. Umjesto toga
(#8530), `POST /api/combos` i `PUT /api/combos/[id]` prilaže neblokizirajuće
polje `warning` odgovoru kada se (novi) naziv sudari s pravim
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

Pri pokretanju, `scanComboModelNameCollisionsAtBoot()`
(`src/instrumentation-node.ts`) također bilježi jednoredno upozorenje `[STARTUP]`
koje nabraja svaki postojeći kombij koji zasjenjuje ID modela, kako bi operatori koji
na ovo naiđu slučajno (a ne namjerno, prema #6940) imali signal.
Pomoćnik za detekciju nalazi se u `src/lib/combos/modelNameCollision.ts`.

## Pozivanje Prilagođenog Kombija iz Klijenta

Pohranjeni kombiji (Postavke → Kombiji) koriste se samo kada klijent pošalje **točan naziv** kombija u polju `model` — ne postoji nejasno ili djelomično podudaranje naziva kombija, niti je uključen prefiks `auto/`. Redoslijed razrješavanja (`getComboForModel()` u `src/sse/services/model.ts`):

1. točno podudaranje naziva kombija (`model: "my-combo"`),
2. prefiks `combo/<name>` (`model: "combo/my-combo"`),
3. glob mapiranja modela na kombij (`/api/model-combo-mappings`).

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"my-combo","messages":[{"role":"user","content":"Hello"}]}'
```

Dvije uobičajene zamke:

- **`auto` ne koristi vaše kombije.** `auto`/`auto/*` gradi vlastiti skup kandidata bez konfiguracije i savjetuje se s pohranjenim kombijima samo ako je kombij doslovno nazvan `auto` (nije preporučeno). Za usmjeravanje kroz kombij, pošaljite njegov točan naziv — ne `auto`.
- **`openrouter/auto` je pravi plaćeni OpenRouter proizvod** ("Auto Best Available"), a ne OmniRoute alias. To je jedini statični unos modela u registru OpenRoutera (`open-sse/config/providers/registry/openrouter/index.ts`) i naplaćuje se zasebno. Koristite Postavke → Usmjeravanje → Sakrij plaćene modele kako biste ga isključili iz `auto` skupova.

Pogledajte [#7992](https://github.com/diegosouzapw/OmniRoute/issues/7992) i [#7111](https://github.com/diegosouzapw/OmniRoute/issues/7111) za izvorne nejasnoće koje ovaj tekst dokumentira.

## Kako funkcionira (trajne automatske kombinacije)

Mehanizam automatskih kombinacija dinamički odabire najboljeg pružatelja/model za svaki zahtjev pomoću **funkcije bodovanja sa 16 čimbenika** (definirane u `open-sse/services/autoCombo/scoring.ts` → `DEFAULT_WEIGHTS`). Zbroj zadanih težina iznosi `1.0`; prilagođene težine ponovno se normaliziraju funkcijom `normalizeScoringWeights()`. Dva od šesnaest čimbenika — `cacheAffinity` i `resetWindowAffinity` — imaju zadanu težinu `0`; `reliability` ima vrijednost `0` u `DEFAULT_WEIGHTS`, ali `0.03` u generičkim paketima i `0.04` u paketu `reliability-first`, dok `quality` u paketima ima vrijednost `0.02` (`0.03` u paketu `quality-first`): oni se i dalje izračunavaju za svakog kandidata, a `cacheAffinity` uvjetuje deduplikaciju predmemorije upita izvan bodovanja, pa čimbenici sa zadanom težinom nula prema zadanim postavkama jednostavno ne utječu na rezultat, dok u paketima utječu.

![Bodovanje automatskih kombinacija sa 16 čimbenika](../diagrams/exported/auto-combo-scoring.svg)

> Izvor: [diagrams/auto-combo-scoring.mmd](../diagrams/auto-combo-scoring.mmd) (ponovno generirajte s pomoću `npm run docs:render-diagrams`). Naziv datoteke zadržan je iz povijesnih razloga; izvorna i generirana verzija dijagrama prikazuju svih 16 čimbenika deklariranih u `DEFAULT_WEIGHTS`.

| Čimbenik              | Zadana težina | Opis                                                                                                                                                                                                                               |
| :-------------------- | :------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `quota`               | 0.1429        | Preostala kvota / raspoloživi kapacitet ograničenja učestalosti [0..1]                                                                                                                                                             |
| `health`              | 0.1605        | Ocjena stanja iz prekidača strujnog kruga (CLOSED=1.0, HALF_OPEN=0.5, OPEN=0.0)                                                                                                                                                    |
| `costInv`             | 0.1429        | Inverzni **kombinirani** trošak (60 % cijene ulaznih + 40 % cijene izlaznih tokena, normalizirano) — niža cijena = viša ocjena                                                                                                     |
| `latencyInv`          | 0.1143        | Inverzna latencija p95 normalizirana prema skupu — brže = viša ocjena                                                                                                                                                              |
| `taskFit`             | 0.0762        | Prikladnost za vrstu zadatka (programiranje, pregled, planiranje, analiza, otklanjanje pogrešaka, dokumentacija)                                                                                                                   |
| `stability`           | 0.0476        | Stabilnost temeljena na varijanci standardne devijacije latencije — kandidat s većim oscilacijama vremena odziva dobiva nižu ocjenu                                                                                                |
| `tierPriority`        | 0.0476        | Prioritet razine računa — Ultra=1.0, Pro=0.67, Standard=0.33, Free=0.0                                                                                                                                                             |
| `tierAffinity`        | 0.0476        | Podudarnost između razine kandidata i razine koju preporučuje manifest                                                                                                                                                             |
| `specificityMatch`    | 0.0476        | Podudarnost između specifičnosti zahtjeva (naznaka iz manifesta) i razine modela                                                                                                                                                   |
| `contextAffinity`     | 0.0476        | Podudarnost između potrebne veličine kontekstnog prozora zahtjeva i kontekstnog prozora modela                                                                                                                                     |
| `sessionAvailability` | 0.0476        | Dostupnost OAuth sesije veze kandidata za ovu sesiju (`getOAuthSessionAvailability()`; veze koje ne upotrebljavaju OAuth dobivaju ocjenu 1.0)                                                                                      |
| `connectionDensity`   | 0.0476        | Raspoređuje opterećenje među vezama istog pružatelja (sprječavanje koncentracije)                                                                                                                                                  |
| `cacheAffinity`       | 0.00          | Podudarnost temeljena na rendezvous raspršivanju s vezom koja najvjerojatnije već sadržava prefiks predmemorije upita za ovaj zahtjev (`open-sse/services/combo/promptCacheAffinity.ts`); zadano onemogućeno (#8008)               |
| `resetWindowAffinity` | 0.00          | Daje prednost vezama s povoljnim vremenskim prozorom za ponovno postavljanje kvote (zadano onemogućeno)                                                                                                                            |
| `quality`             | 0.03          | Signal kvalitete izlaza temeljen na povratnim informacijama iz alata za praćenje kvalitete događaja usmjeravanja; kandidati bez opažanja dobivaju neutralnu vrijednost 0.5                                                         |
| `reliability`         | 0.00          | Opaženi udio uspješnosti, `1 - failureRate`, iz 24-satne povijesti upotrebe uz minimalno deset uzoraka (u suprotnom se upotrebljavaju metrike u stvarnom vremenu); kandidati bez opažanja imaju vrijednost 1.0. Zadano onemogućeno |

**Zbroj:** `0.1429 + 0.1605 + 0.1429 + 0.1143 + 0.0762 + (7 × 0.0476) + 0.00 + 0.00 + 0.03 + 0.00 = 1.0`, kako je deklarirano u `DEFAULT_WEIGHTS`; prije bodovanja korisnički konfigurirane težine ponovno se normaliziraju u distribuciju funkcijom `normalizeScoringWeights()`.

## Paketi načina rada

6 unaprijed definiranih profila težina u `open-sse/services/autoCombo/modePacks.ts`. Svaki paket u potpunosti zamjenjuje zadane težine kako bi odabir usmjerio prema jednom cilju. Zbroj vrijednosti svakog paketa već iznosi `1.0` (`0.9999` kada se ispiše na četiri decimale), pa `normalizeScoringWeights()` nema što značajno ispraviti kada je paket aktivan — vrijednosti u nastavku, uz zaokruživanje, one su koje ocjenjivač primjenjuje.

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

- **Paketi sadrže `quality` i `reliability`** (`quality 0.02`, `quality-first 0.03`; `reliability 0.03`, `reliability-first 0.04`) i u cijelosti zamjenjuju mapu težina (`weights = pack`, nije riječ o spajanju). `DEFAULT_WEIGHTS` sadrži `quality 0.03 / reliability 0`; odabirom opcije `balanced`/`default` zadržavaju se te zadane vrijednosti, dok se odabirom paketa upotrebljavaju prethodno navedene vrijednosti paketa. U hladnom skupu (još nema opažanja, stoga je `quality 0.5`, a `reliability 1`) ta dva faktora dodaju `+0.04` uz generički paket (`0.03 + 0.01`), `+0.045` uz `quality-first` i `+0.05` uz `reliability-first`.
- `tierAffinity`, `specificityMatch` i `resetWindowAffinity` izričito su postavljeni na `0` u svakom paketu.
- Sažeti pregled naglaska svakog paketa:
  - **ship-fast** → latencyInv 0.3048 + health 0.2667 (zdrave veze s niskom latencijom)
  - **cost-saver** → costInv 0.3324 (pobjeđuju najjeftiniji tokeni)
  - **quality-first** → taskFit 0.3524 + stability 0.1429 + quality 0.03, najviše među svim paketima (najbolji model za zadatak, dosljedan)
  - **offline-friendly** → quota 0.3324 + health 0.2667 (maksimalna rezerva bez obzira na brzinu/cijenu)
  - **reliability-first** → health 0.3524 + stability 0.1905 + reliability 0.04, najviše među svim paketima (najmanje iznenađenja)
  - **chaos-mode** → health 0.4000 + taskFit 0.1905 (profil za ubacivanje kvarova)

### Kontrole po zahtjevu (zaglavlja) — #6023 / #6024 / #6025 / #3470

Kombinacijom `auto` može se upravljati **za svaki zahtjev zasebno** putem triju zaglavlja, bez mijenjanja
pohranjene konfiguracije kombinacije. Primjenjuju se samo na strategiju `auto` i samo na zahtjev
koji ih sadrži; spremljene vrijednosti `modePack`/`budgetCap`/`budgetFallback` kombinacije upotrebljavaju se
kada zaglavlje nije prisutno.

| Zaglavlje                     | Prihvaća                                                                                                                                                                                                                     | Učinak                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| :---------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `X-OmniRoute-Mode`            | pseudonim unaprijed postavljene konfiguracije (`fast`, `balanced`, `quality`, `cheap`, `reliable`, `offline`) ili izvorni naziv paketa (`ship-fast`, `cost-saver`, `quality-first`, `offline-friendly`, `reliability-first`) | Nadjačava težinske faktore bodovanja za ovaj zahtjev. `balanced`/`default` prisilno primjenjuju zadane težinske faktore (bez paketa). Nepoznate se vrijednosti zanemaruju (konfiguracija ostaje očuvana).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `X-OmniRoute-Budget`          | pozitivan broj (najveći iznos u USD po zahtjevu)                                                                                                                                                                             | Čvrsta gornja granica troška: kandidati čiji procijenjeni trošak premašuje tu granicu filtriraju se prije odabira. Ponašanje u slučaju kada **svaki** kandidat premašuje granicu određuje zaglavlje `X-OmniRoute-Budget-Fallback` u nastavku.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `X-OmniRoute-Budget-Fallback` | `cheapest` (zadano, pseudonimi: `cheapest-viable`, `soft`) ili `strict` (pseudonimi: `block`, `hard`)                                                                                                                        | `cheapest`: kao pričuvno rješenje odabire se globalno najjeftiniji kandidat iako i dalje premašuje gornju granicu (naslijeđeno ponašanje). `strict`: odbija odabir — zahtjev odmah ne uspijeva uz `HTTP 402`, umjesto prešutnog prekoračenja budžeta. Nepoznate se vrijednosti zanemaruju.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `X-OmniRoute-Effort`          | `auto` (ostale su vrijednosti rezervirane)                                                                                                                                                                                   | Prilagodljivi budžet razmišljanja: kada zahtjev **ne** sadrži polje za zaključivanje ni u kojem obliku (`reasoning_effort`, `reasoning`, `thinking`), pristupnik određuje `auto` kao `low`/`medium`/`high` na temelju determinističkih signala oblika zahtjeva (duljina posljednje korisničke poruke, veličina konteksta do posljednje korisničke poruke, prethodni rezultati alata, dubina petlje alata). Signali su ograničeni na trenutačni potez — sve nakon posljednje korisničke poruke zanemaruje se — pa se svaki zahtjev u petlji alata razrješava na istu razinu (fiksiranje bez stanja po potezu, bez stanja sesije i bez eskalacije usred petlje koja bi narušila prefikse predmemorije upita uzvodnog sustava). Izričito klijentsko polje za zaključivanje uvijek ima prednost. Ograničeno je na zahtjeve čije se uzvodno usmjeravanje razrješava na oblik OpenAI Chat Completions (`targetFormat === FORMATS.OPENAI`) — `reasoning_effort` je polje oblika OpenAI, pa zaglavlje nema učinka na zahtjev usmjeren prema Claudeu ili Geminiju (pogledajte `open-sse/handlers/chatCore/adaptiveEffortWiring.ts`). |

```bash
# Forsiraj najbrži profil, ograniči ovaj zahtjev na $0.05 i strogo ga blokiraj umjesto prekoračenja budžeta
curl -sS http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "X-OmniRoute-Mode: fast" \
  -H "X-OmniRoute-Budget: 0.05" \
  -H "X-OmniRoute-Budget-Fallback: strict" \
  -d '{"model":"auto","messages":[{"role":"user","content":"hi"}]}'
```

Razrješavanje je čista funkcija (`open-sse/services/autoCombo/requestControls.ts`);
razrijeđene vrijednosti prosljeđuju se postojećim ulazima mehanizma `config.modePack` / `config.budgetCap` /
`config.budgetFallback`. Pohranjeni `config.budgetFallback` kombinacije ("strict" |
"cheapest") postavlja trajno pravilo; zaglavlje ga nadjačava za pojedinačni zahtjev.

## Sve Strategije Usmjeravanja

OmniRoute-ov kombinirani mehanizam podržava **19 strategija usmjeravanja** (deklarirane u `src/shared/constants/routingStrategies.ts` → `ROUTING_STRATEGY_VALUES`). Sam Auto Combo mehanizam dostupan je putem `auto` strategije; ostale su dostupne za trajno pohranjene kombinacije.

| Strategija          | Opis                                                                                                                                                                                                                      |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `priority`          | Popis prvih odredišta poredanih po eksplicitnom prioritetu                                                                                                                                                                |
| `weighted`          | Nasumični odabir s težinskim omjerom po odredištu                                                                                                                                                                         |
| `round-robin`       | Ciklično prolaženje kroz odredišta redom                                                                                                                                                                                  |
| `context-relay`     | Prosljeđivanje konteksta između odredišta (dugi razgovori)                                                                                                                                                                |
| `fill-first`        | Popunjava kvotu svakog odredišta prije prelaska na sljedeće                                                                                                                                                               |
| `p2c`               | Nasumično balansiranje opterećenja metodom power-of-2-choices                                                                                                                                                             |
| `random`            | Jednoliki nasumični odabir                                                                                                                                                                                                |
| `least-used`        | Odabire odredište s trenutno najnižim opterećenjem                                                                                                                                                                        |
| `cost-optimized`    | Minimizira $ po zahtjevu prema cjeniku kataloga                                                                                                                                                                           |
| `reset-aware` ⭐    | Prioritizira prema vremenu resetiranja kvote — kraći prozori resetiranja rangiraju se više                                                                                                                                |
| `reset-window`      | Preferira odredišta čiji se prozor kvote resetira najranije                                                                                                                                                               |
| `headroom`          | Odabire odredište s najvećim preostalim prostorom kvote                                                                                                                                                                   |
| `strict-random`     | Nasumični odabir bez uklanjanja ponavljanja                                                                                                                                                                               |
| `auto`              | Koristi Auto Combo bodovanje (16 faktora) — **preporučeno**                                                                                                                                                               |
| `lkgp`              | Last-Known-Good Path (zadržava posljednjeg uspješnog pružatelja, zatim se vraća na pravila)                                                                                                                               |
| `context-optimized` | Odabire odredište koje najbolje odgovara trenutnoj veličini konteksta                                                                                                                                                     |
| `cache-optimized`   | Preuređuje odredišta prema afinitetu predmemorije upita — veza s najvećom vjerojatnošću da već drži predmemoriranu predmemoriju ovog zahtjeva isprobava se prva (`open-sse/services/combo/promptCacheAffinity.ts`, #8008) |
| `fusion` 🧬         | Šalje upit paralelno skupini modela, zatim sintetizira jedan odgovor putem suca (vidi dolje)                                                                                                                              |
| `pipeline`          | Pokreće odredišta sekvencijalno, prosljeđujući izlaz svakog koraka kao ulaz sljedećeg; vraća se samo završni odgovor (#6396)                                                                                              |

⭐ = Novo u v3.8.0 · 🧬 = Novo u v3.8.36

### Semantika strategije `weighted`

`weighted` je **proporcionalni nasumični odabir po zahtjevu**
(`open-sse/services/combo/targetSorters.ts` → `selectWeightedTarget`), a ne izravnivač:

- Svaki zahtjev izvlači **jedan** korak s vjerojatnošću `weight / totalWeight`; preostali koraci
  poredani su silazno po težini kao rezervni lanac za taj zahtjev.
- Korak čija je težina `0` (ili nije navedena) **nikada se ne izvlači** dok god neki drugi korak ima
  težinu > 0 — može poslužiti samo kao rezerva nakon što izvučeni korak ne uspije. Tek kada **sve**
  težine iznose 0, odabir postaje jednoliki.
- Koraci čija su sva odredišta nedostupna — prekidač pružatelja u stanju `OPEN`, odredište u
  hlađenju, model zaključan — uklanjaju se iz izvlačenja prije nego što se ono dogodi
  (`open-sse/services/combo/targetResolution.ts`), pa jedan zdrav korak može privremeno
  osvajati sve zahtjeve.
- `stickyWeightedLimit` (konfiguracija kombinacije, zadano `1` = isključeno) zadržava izvučeni korak
  za taj broj uzastopnih uspjeha prije ponovnog izvlačenja.

Za strogo kružno izmjenjivanje koristite `round-robin`; jednake težine u `weighted` daju statističku — a ne
strogu — ravnotežu.

## Strategija Fusion

`fusion` je jedina strategija koja **ne** odabire jedan ciljni model. Ona šalje prompt
**svim panel modelima paralelno**, a zatim konfigurabilan **model suca** sintetizira
jedan konačni odgovor iz svih odgovora panela. Preneseno iz upstream repozitorija `decolua/9router`
(OpenRouterov Fusion dizajn); implementacija u `open-sse/services/fusion.ts`.

Kako radi:

0. **Zaobilaženje za zahtjeve s alatima** — zahtjev koji sadrži neprazan niz `tools` s
   `tool_choice` koji nije eksplicitno `"none"` potpuno preskače panel: usmjerava se izravno na
   jedan model (konfigurirani sudac, ili `panel[0]`) s `tools`/`tool_choice`
   proslijeđenima bez izmjena. Članovi panela nemaju pristup alatima, a sudčeva
   direktiva sinteze ne potiče emisiju poziva alata, pa agentski/klijenti koji koriste alate
   dobivaju pravu odluku o pozivu alata umjesto sintetiziranog teksta (#6771).
1. **Fan-out** (samo za zahtjeve bez alata) — prompt se šalje svim panel
   modelima odjednom, prisilno nestreaming s uklonjenim alatima (sucu trebaju potpuni
   tekstovi za sintezu).
2. **Prikupljanje s kvorumskom grejs-periodom** — čim pristigne `minPanel` odgovora, pokreće se kratki tajmer
   grejs-perioda za zaostale modele, a zatim fusion nastavlja s onim što je prikupljeno.
   Time se ograničava kazna najsporijeg modela na ukupno vrijeme, uz tvrdi vremenski limit.
3. **Sudačka sinteza** — odgovori panela se anonimiziraju (`Source 1`, `Source 2`, … — kako
   bi sudac vagao sadržaj, a ne naziv modela) i predaju sucu, koji analizira
   konsenzus / kontradikcije / djelomičnu pokrivenost / jedinstvene uvide / slijepe točke, a zatim
   piše **jedan** autoritativan odgovor. Sudački poziv zadržava originalni
   `stream` flag klijenta + alate, tako da streaming i downstream korištenje alata još uvijek rade.
4. **Postupna degradacija** — 0 odgovora panela → `503`; točno 1 preživjeli → taj odgovor
   se vraća izravno (nema što fuzionirati); panel s jednim modelom odgovara izravno.

Član panela može biti i korak `combo-ref` (`{kind: "combo-ref", comboName: "..."}`) koji referencira
drugi combo — razrješava se kao **jedan black-box glas panela** (potpuni rekurzivni dispatch u
referencirani combo, a ne fan-out vlastitih ciljeva tog comba), s istom zaštitom od dubine/ciklusa
koju već koriste sve ostale strategije koje konzumiraju combo-ref (#6764).

### Konfiguracija

Konfigurira se na `config` blobu comba (bez migracije sheme — koristi postojeću
tablicu `combos`):

| Polje                                    | Tip      | Zadana vrijednost | Svrha                                                                                            |
| :--------------------------------------- | :------- | :---------------- | :----------------------------------------------------------------------------------------------- |
| `config.judgeModel`                      | `string` | prvi panel model  | Model koji sintetizira konačni odgovor                                                           |
| `config.fusionTuning.minPanel`           | `number` | `2`               | Uspješni odgovori potrebni prije pokretanja tajmera grejs-perioda (stisnuto na `[2, panelSize]`) |
| `config.fusionTuning.stragglerGraceMs`   | `number` | `8000`            | Koliko dugo čekati na zaostale modele nakon što se dostigne kvorum                               |
| `config.fusionTuning.panelHardTimeoutMs` | `number` | `90000`           | Apsolutni limit kako jedan zapeli model ne bi blokirao zahtjev                                   |

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

Zatim ga pozovite kao bilo koji combo: `{"model":"fusion-panel","messages":[...]}`.

## Virtualna Tvornica Auto-Kombinacija

Engine za automatske kombinacije ne zahtijeva unaprijed definirane kombinacije. Umjesto toga, `open-sse/services/autoCombo/virtualFactory.ts` gradi kandidate u hodu:

1. Dohvaća `getProviderConnections({ isActive: true })` (sve aktivne veze)
2. Filtrira one s važećim vjerodajnicama (API ključ ili neistekli OAuth token putem `hasUsableOAuthToken()`)
3. Unakrsno provjerava s `getProviderRegistry()` za dostupnost modela i cijene
4. Za svaki skup `(provider, model, connection)`, gradi `VirtualAutoComboCandidate`
5. Odabire `connection.defaultModel` (ili prvi model iz registra) kao odredište slanja
6. Ocjenjuje svakog kandidata koristeći 16-faktorski `scorePool()` i paket težina varijante
7. Vraća rezultirajući `AutoComboConfig` u memoriji za `handleComboChat()` — nikada se ne pohranjuje u bazu podataka

To znači da **dodavanje novog pružatelja s omogućenim `auto/*` automatski proširuje skup kandidata** — nije potrebno ručno uređivanje kombinacija. Virtualna kombinacija se gradi iznova za svaki zahtjev, pa se novododane ili novozdrave veze odmah preuzimaju.

## Samo-oporavak

- **Privremeno isključenje**: Ocjena < 0.2 → isključeno na 5 min (progresivni backoff, maksimalno 30 min)
- **Svjesnost prekidača strujnog kruga**: OPEN → automatski isključen; HALF_OPEN → probe zahtjevi
- **Način incidenta**: >50% OPEN → onemogući istraživanje, maksimiziraj stabilnost
- **Oporavak nakon hlađenja**: Nakon isključenja, prvi zahtjev je "probe" sa smanjenim vremenskim ograničenjem

## Banditsko Istraživanje

5% zahtjeva (konfigurabilno) usmjerava se nasumičnim pružateljima radi istraživanja. Onemogućeno u načinu incidenta.

## API

**Ne postoji namjenski `POST /api/combos/auto` endpoint** — Auto-Combo se koristi na dva načina:

1. **Bez konfiguracije (preporučeno):** Pošaljite bilo koji zahtjev za dovršetkom razgovora s `model: "auto"` ili `model: "auto/<variant>"`. Virtualna tvornica gradi kombinaciju po zahtjevu — bez pohrane, bez API poziva.

2. **Pohranjena kombinacija s `strategy: "auto"`:** Kreirajte regularnu kombinaciju putem `POST /api/combos` i postavite `strategy: "auto"` uz `config.auto.weights` / `config.auto.candidatePool`. Koristi se isti engine za ocjenjivanje; kombinacija se pohranjuje u `combos` i može se ponovo koristiti po ID-u.

Za otkrivanje, `GET /api/combos/auto` navodi svaku varijantu s njezinim razriješenim skupom kandidata plus `context_length` / `max_output_tokens` — MAKSIMUM kroz prozore skupa kandidata. Klijenti (npr. dodatak opencode) moraju oglašavati ove vrijednosti umjesto `0`: nulti kontekst potpuno onemogućuje automatsko kompaktiranje opencodea, dopuštajući sesijama da rastu dok pročišćavanje povijesti pristupnika ne uništi kontekst. MAX je sigurno oglašavati jer predfiltар konteksta auto-kombinacije usmjerava preglomazne zahtjeve prema kandidatima s velikim prozorom.

```bash
# Korištenje bez konfiguracije (bez kreiranja kombinacije)
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"auto/coding","messages":[{"role":"user","content":"Hello"}]}'

# Pohranjena auto kombinacija putem regularnog endpointa za kombinacije
curl -X POST http://localhost:20128/api/combos \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","strategy":"auto","config":{"auto":{"candidatePool":["anthropic","google","openai"],"weights":{"quota":0.15,"health":0.3,"costInv":0.05,"latencyInv":0.35,"taskFit":0.1,"stability":0,"tierPriority":0.05}}}}'
```

### Strategije auto usmjerivača

Pohranjene `strategy: "auto"` kombinacije mogu postaviti `config.routerStrategy` (ili naslijeđeni
`config.auto.routerStrategy`) na jednu od:

- `rules` — zadano ponderirano ocjenjivanje
- `score` — odabire najvišu konfiguriranu ponderiranu ocjenu. Točne jednakosti čuvaju konfigurirani
  redoslijed kandidata; postojeći `explorationRate` uzorkuje iz cijelog rangiranog skupa.
- `cost` / `eco` — najjeftiniji zdravi pružatelj
- `latency` / `fast` — najniža p95 latencija s penalizacijom pouzdanosti
- `sla-aware` / `sla` — preferira kandidate koji zadovoljavaju p95 latenciju, stopu grešaka i neobavezne
  troškovne SLO-ove
- `lkgp` — zadnji poznati dobri pružatelj ima prednost

### Strategije usmjerivača u detalju

Engine auto-kombinacije izlaže 6 priključivih **RouterStrategy** implementacija koje
možete zamijeniti putem `config.routerStrategy` (ili naslijeđenog `config.auto.routerStrategy`).
Svaka strategija odabire jednog pružatelja iz skupa kandidata, uz zadani `RoutingContext`
(vrsta zadatka, naznake alata/vidljivosti, procjena tokena, neobavezna SLA politika, neobavezni
zadnji poznati dobri pružatelj).

#### 1. `rules` (zadano) — 16-faktorsko ponderirano ocjenjivanje

Omotava postojeći engine za ocjenjivanje. Filtrira kandidate s `OPEN` prekidačem strujnog kruga,
zatim pokreće `scorePool()` s trenutnom vrstom zadatka i `getTaskFitness()`,
odabirući pružatelja s najvišom ocjenom.

```ts
class RulesStrategyImpl implements RouterStrategy {
  readonly name = "rules";
  readonly description = "16-faktorsko ponderirano ocjenjivanje (vidi DEFAULT_WEIGHTS)";

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

**Pseudonim**: `rules` (bez pseudonima)

---

#### 2. `cost` / `eco` — najjeftiniji zdravi pružatelj

Sortira skup kandidata po `costPer1MTokens` (uzlazno) i odabire najjeftinijeg.
Prvo filtrira `OPEN` kandidate.

```ts
class CostStrategyImpl implements RouterStrategy {
  readonly name = "cost";
  readonly description = "Uvijek odabire najjeftinijeg dostupnog pružatelja";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort((a, b) => a.costPer1MTokens - b.costPer1MTokens);
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**Kada koristiti**: Radno opterećenje osjetljivo na troškove, skupna obrada ili pozadinski poslovi.

**Pseudonimi**: `cost`, `eco`

---

#### 3. `latency` / `fast` — najniža p95 latencija s penalizacijom pouzdanosti

Sortira po `p95LatencyMs + (errorRate * 1000)`. Penalizacija stope grešaka osigurava
da se nepouzdani pružatelji rangiraju niže čak i ako je njihova nominalna latencija niska.

```ts
class LatencyStrategyImpl implements RouterStrategy {
  readonly name = "latency";
  readonly description = "Daje prioritet najnižoj p95 latenciji s ponderiranjem pouzdanosti";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort(
      (a, b) => a.p95LatencyMs + a.errorRate * 1000 - (b.p95LatencyMs + b.errorRate * 1000)
    );
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**Kada koristiti**: Radno opterećenje osjetljivo na latenciju poput razgovora u stvarnom vremenu, automatskog dovršavanja ili
interaktivnih pomoćnika za kodiranje.

**Pseudonimi**: `latency`, `fast`

---

#### 4. `sla-aware` / `sla` — usklađenost s latencijskim/pogrešnim/troškovnim SLO-om

Ocjenjuje svakog kandidata prema tome koliko dobro zadovoljava konfiguriranu SLO politiku:

| Faktor             | Težina | Formula                                                |
| ------------------ | ------ | ------------------------------------------------------ |
| Ocjena latencije   | 35%    | `threshold / max(value, ε)`                            |
| Ocjena grešaka     | 35%    | `threshold / max(value, ε)`                            |
| Ocjena zdravlja    | 15%    | `1.0` (CLOSED) / `0.5` (HALF_OPEN) / `0.0` (OPEN)      |
| Ocjena troška      | 10%    | `threshold / max(value, ε)` ili inverzno normalizirano |
| Ocjena stabilnosti | 5%     | inverzno normalizirana standardna devijacija latencije |

Kada je `hardConstraints: true`, kandidati se sortiraju primarno prema **ocjeni kršenja**
(koliko premašuju bilo koji SLO), zatim prema kompozitnoj ocjeni. Inače se koristi samo
kompozitna ocjena.

```ts
class SLAStrategyImpl implements RouterStrategy {
  readonly name = "sla-aware";
  readonly description =
    "Odabire pružatelja koji će najvjerojatnije zadovoljiti latencijske, pogrešne i troškovne SLO-ove";

  select(pool, context) {
    // ... ocjenjuje svakog kandidata prema politici: { targetP95Ms, maxErrorRate, maxCostPer1MTokens, hardConstraints }
  }
}
```

**SLA polja** (postavljaju se na konfiguraciji kombinacije):

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

**Kada koristiti**: Produkcijsko radno opterećenje sa strogim proračunima latencije, stope grešaka ili troškova.

**Pseudonimi**: `sla-aware`, `sla`

---

#### 5. `lkgp` — zadnji poznati dobri pružatelj ima prednost

Pokušava s **zadnjim poznatim dobrim pružateljem** (ako je postavljen) prvo, zatim se vraća na
strategiju `rules`. Korisno za prianjanje uz sesiju — isti pružatelj obrađuje
naknadne zahtjeve u razgovoru.

```ts
class LKGPStrategyImpl implements RouterStrategy {
  readonly name = "lkgp";
  readonly description =
    "Pokušava zadnjeg poznatog dobrog pružatelja prvo, zatim se vraća na rules";

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

    // Povratak na strategiju rules
    return getStrategy("rules").select(pool, context);
  }
}
```

**Kada koristiti**: Višeokretni razgovori u kojima želite da isti pružatelj obrađuje
naknadne zahtjeve (npr. radi predmemoriranja, kontinuiteta konteksta ili dosljednosti cijena).

**Pseudonim**: `lkgp` (bez pseudonima)

---

### Prilagođene strategije usmjerivača

Možete registrirati vlastitu `RouterStrategy` implementaciju putem javnog API-ja:

```ts
import {
  registerStrategy,
  type RouterStrategy,
} from "@omniroute/open-sse/services/autoCombo/routerStrategy";

class MyCustomStrategy implements RouterStrategy {
  readonly name = "my-custom";
  readonly description = "Moja prilagođena strategija usmjeravanja";

  select(pool, context) {
    // Vaša logika usmjeravanja ovdje
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

Zatim koristite:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "my-custom"
  }
}
```

---

### Vodič za odabir strategije usmjerivača

| Slučaj upotrebe          | Strategija  | Razlog                                     |
| ------------------------ | ----------- | ------------------------------------------ |
| Uravnoteženo opterećenje | `rules`     | Zadano — uzima u obzir sve faktore         |
| Minimizacija troškova    | `cost`      | Uvijek odabire najjeftinijeg               |
| Minimizacija latencije   | `latency`   | Odabire najbržeg pouzdanog pružatelja      |
| Strogi SLO-ovi           | `sla-aware` | Filtrira prema pragovima p95/greške/troška |
| Višeokretni razgovor     | `lkgp`      | Prianjanje uz sesiju                       |

SLA-svjesna polja:

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

## Prikladnost zadataka

30+ modela ocijenjeno u 6 vrsta zadataka (`coding`, `review`, `planning`, `analysis`, `debugging`, `documentation`). Podržava uzorke s džokerima (npr. `*-coder` → visoka ocjena za kodiranje).

## Sažetak Auto varijanti

Uključujući goli `auto` (zadano) i 6 `AutoVariant` vrijednosti deklariranih u `autoPrefix.ts`, postoji **7 pozivnih ID-ova modela**:

`auto`, `auto/coding`, `auto/fast`, `auto/cheap`, `auto/offline`, `auto/smart`, `auto/lkgp`

(`AutoVariant` sam po sebi nabraja 6 vrijednosti; 7. opcija je "bez varijante" — goli `auto` — koji `parseAutoPrefix()` obrađuje kao `variant: undefined`.)

## Kako razredi odgovaraju Auto-Combo

Funkcija bodovanja s 16 čimbenika (`open-sse/services/autoCombo/scoring.ts`) tretira
članstvo u razredu kao dva signala: `tierPriority` (0.0476) i `tierAffinity` (0.0476). Pogledajte
kanonsku [tablicu čimbenika bodovanja](#how-it-works-persisted-auto-combos) gore za potpuni
skup `DEFAULT_WEIGHTS` — zamjene po paketu (ship-fast/cost-saver/quality-first/
offline-friendly) navedene su u tablici "Profili težina po paketu".

Sam razred **ne** prisiljava Razred 1 na prvo mjesto — ako je latencija Razreda 1 loša ili
omjer troška i kvalitete nije optimalan, pobjeđuje Razred 2. Da biste nametnuli redoslijed razreda,
koristite combo strategiju `priority` i rasporedite pružatelje usluga po razredu.

Za snažno favoriziranje Razreda 1 (pretplata), povećajte težinu `tierPriority`:

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "tierPriority": 0.3, "costInv": 0.05 } } }
}
```

Pogledajte `docs/marketing/TIERS.md` za definicije razreda i klasifikaciju pružatelja usluga.

## Testiranje i pokrivenost

### Deterministička matrica odluka usmjeravanja (`npm run test:combo:matrix`)

`tests/integration/combo-matrix/*.test.ts` dokazuje **odluku** usmjeravanja svih 19
javnih strategija od kraja do kraja kroz pravi combo cjevovod s lažnim upstream-om.
Pokrivenost uključuje:

- Svih 19 strategija `ROUTING_STRATEGY_VALUES` (naručene, ponderirane, troškovna, kontekstualna, fuzijska, …).
- `quota-share` (interno) od kraja do kraja: pravednost DRR + depriorizacija saturacije putem
  pravog šava `selectQuotaShareTarget` (`registerQuotaFetcher` / `setLKGP` /
  `__setHeadroomSaturationFetcherForTests`).
- Pokrivenost univerzalnog prijenosa `context-relay` za svaki broj ciljeva.

Ovaj skup testova izvodi se u CI (`test:integration` posao) s `--test-concurrency=1` i
`--test-force-exit` kako bi bio deterministički i ne zahtijeva stvarne vjerodajnice.

### Zaštićeno živo ispitivanje dima (NIJE u CI — stvarni pružatelji usluga)

| Naredba                                | Što radi                                                                                     |
| :------------------------------------- | :------------------------------------------------------------------------------------------- |
| `npm run test:combo:live`              | Stvarno usmjeravanje unutar procesa s `RUN_COMBO_LIVE=1`; snima živu OmniRoute bazu podataka |
| `npm run test:combo:live:vps`          | HTTP pozivi prema živom OmniRoute poslužitelju (postavi `COMBO_LIVE_BASE_URL`)               |
| `npm run test:combo:live:vps:failover` | Isto, s namjernim scenarijima prebacivanja u slučaju kvara                                   |

Ovi testovi dima ispituju pravi mrežni put (combo → pružatelj usluge → dovršetak). Namjerno su
isključeni iz CI jer zahtijevaju stvarne vjerodajnice i VPS pristup.

---

## Datoteke

| Datoteka                                                  | Svrha                                                                                                    |
| :-------------------------------------------------------- | :------------------------------------------------------------------------------------------------------- |
| `open-sse/services/autoCombo/scoring.ts`                  | Funkcija bodovanja s 16 faktora, `DEFAULT_WEIGHTS`, normalizacija skupa                                  |
| `open-sse/services/autoCombo/taskFitness.ts`              | Pretraživanje prikladnosti modela × zadatka                                                              |
| `open-sse/services/autoCombo/engine.ts`                   | Logika odabira, bandit algoritam, ograničenje budžeta                                                    |
| `open-sse/services/autoCombo/selfHealing.ts`              | Isključivanje, sonde, način rada pri incidentima                                                         |
| `open-sse/services/autoCombo/modePacks.ts`                | 6 profila težina (ship-fast, cost-saver, quality-first, offline-friendly, reliability-first, chaos-mode) |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Parser prefiksa `auto/` + 6 varijanti                                                                    |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Gradi `AutoComboConfig` u memoriji iz aktivnih veza                                                      |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Kuka za testiranje pri lažiranju registra pružatelja usluga                                              |
| `src/shared/constants/routingStrategies.ts`               | `ROUTING_STRATEGY_VALUES` (19 strategija)                                                                |
| `src/sse/handlers/chat.ts`                                | Integracija: kratki spoj auto-prefiksa                                                                   |
