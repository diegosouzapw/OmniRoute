# AUTO-COMBO (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/AUTO-COMBO.md) · 🇸🇦 [ar](../../../ar/docs/routing/AUTO-COMBO.md) · 🇦🇿 [az](../../../az/docs/routing/AUTO-COMBO.md) · 🇧🇬 [bg](../../../bg/docs/routing/AUTO-COMBO.md) · 🇧🇩 [bn](../../../bn/docs/routing/AUTO-COMBO.md) · 🇨🇿 [cs](../../../cs/docs/routing/AUTO-COMBO.md) · 🇩🇰 [da](../../../da/docs/routing/AUTO-COMBO.md) · 🇩🇪 [de](../../../de/docs/routing/AUTO-COMBO.md) · 🇬🇷 [el](../../../el/docs/routing/AUTO-COMBO.md) · 🇪🇸 [es](../../../es/docs/routing/AUTO-COMBO.md) · 🇪🇪 [et](../../../et/docs/routing/AUTO-COMBO.md) · 🇮🇷 [fa](../../../fa/docs/routing/AUTO-COMBO.md) · 🇫🇮 [fi](../../../fi/docs/routing/AUTO-COMBO.md) · 🇫🇷 [fr](../../../fr/docs/routing/AUTO-COMBO.md) · 🇮🇪 [ga](../../../ga/docs/routing/AUTO-COMBO.md) · 🇮🇳 [gu](../../../gu/docs/routing/AUTO-COMBO.md) · 🇮🇱 [he](../../../he/docs/routing/AUTO-COMBO.md) · 🇮🇳 [hi](../../../hi/docs/routing/AUTO-COMBO.md) · 🇭🇷 [hr](../../../hr/docs/routing/AUTO-COMBO.md) · 🇭🇺 [hu](../../../hu/docs/routing/AUTO-COMBO.md) · 🇮🇩 [id](../../../id/docs/routing/AUTO-COMBO.md) · 🇮🇹 [it](../../../it/docs/routing/AUTO-COMBO.md) · 🇯🇵 [ja](../../../ja/docs/routing/AUTO-COMBO.md) · 🇰🇷 [ko](../../../ko/docs/routing/AUTO-COMBO.md) · 🇱🇹 [lt](../../../lt/docs/routing/AUTO-COMBO.md) · 🇱🇻 [lv](../../../lv/docs/routing/AUTO-COMBO.md) · 🇮🇳 [mr](../../../mr/docs/routing/AUTO-COMBO.md) · 🇲🇾 [ms](../../../ms/docs/routing/AUTO-COMBO.md) · 🇲🇹 [mt](../../../mt/docs/routing/AUTO-COMBO.md) · 🇳🇱 [nl](../../../nl/docs/routing/AUTO-COMBO.md) · 🇳🇴 [no](../../../no/docs/routing/AUTO-COMBO.md) · 🇵🇭 [phi](../../../phi/docs/routing/AUTO-COMBO.md) · 🇵🇱 [pl](../../../pl/docs/routing/AUTO-COMBO.md) · 🇵🇹 [pt](../../../pt/docs/routing/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/AUTO-COMBO.md) · 🇷🇴 [ro](../../../ro/docs/routing/AUTO-COMBO.md) · 🇷🇺 [ru](../../../ru/docs/routing/AUTO-COMBO.md) · 🇸🇰 [sk](../../../sk/docs/routing/AUTO-COMBO.md) · 🇸🇮 [sl](../../../sl/docs/routing/AUTO-COMBO.md) · 🇸🇪 [sv](../../../sv/docs/routing/AUTO-COMBO.md) · 🇰🇪 [sw](../../../sw/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ta](../../../ta/docs/routing/AUTO-COMBO.md) · 🇮🇳 [te](../../../te/docs/routing/AUTO-COMBO.md) · 🇹🇭 [th](../../../th/docs/routing/AUTO-COMBO.md) · 🇹🇷 [tr](../../../tr/docs/routing/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/AUTO-COMBO.md) · 🇵🇰 [ur](../../../ur/docs/routing/AUTO-COMBO.md) · 🇻🇳 [vi](../../../vi/docs/routing/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/AUTO-COMBO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/AUTO-COMBO.md)

---

---

title: "OmniRoute Auto-Combo Engine"
version: 3.8.40
lastUpdated: 2026-06-28
---

# OmniRoute Auto-Combo Engine

> **Za korisnike**: Tražite brzi početak? Pogledajte [Auto-Combo vodič za korisnike](../getting-started/AUTO-COMBO-GUIDE.md) za jednostavna objašnjenja i primere.

> Samoupravljivi lanci modela sa adaptivnim bodovanjem + auto-rutiranjem bez konfiguracije

## Auto-rutiranje bez konfiguracije (`auto/` prefiks)

> **NOVO:** Nije potrebno kreiranje kombinacije. Koristite `auto/` prefiks direktno u bilo kom klijentu.

### Brzi primeri

| ID modela      | Varijanta     | Ponašanje                                                                      |
| -------------- | ------------- | ------------------------------------------------------------------------------ |
| `auto`         | podrazumevana | Svi povezani provajderi, LKGP strategija, balansirane težine                   |
| `auto/coding`  | coding        | Težine sa prioritetom na kvalitet, pogodno za generisanje kôda                 |
| `auto/fast`    | fast          | Odabir sa težinom za nisku latenciju                                           |
| `auto/cheap`   | cheap         | Rutiranje optimizovano po troškovima (najniža cena prvo)                       |
| `auto/offline` | offline       | Favorizuje provajdere sa najvećom dostupnošću kvote                            |
| `auto/smart`   | smart         | Prioritet kvaliteta + veća stopa eksploracije (10%) za bolje otkrivanje modela |
| `auto/lkgp`    | lkgp          | Eksplicitni LKGP (isto kao podrazumevani `auto`)                               |
| `auto/chaos`   | chaos         | Težine za ubacivanje grešaka radi testiranja otpornosti (chaos engineering)    |

### Kompozicija kategorije × nivoa (`auto/<category>:<tier>`)

Sufiksi u OpenRouter stilu razdvajaju **kakva vrsta rute** (kategorija) od **kako se optimizuje** (nivo), tako da ih možete slobodno kombinovati (#4235 Faza B, `open-sse/services/autoCombo/suffixComposition.ts`):

- **Kategorije** (filtriraju skup kandidata po mogućnostima): `coding` · `reasoning` · `vision` · `chat` · `multimodal`. `vision`/`multimodal` čuvaju modele sposobne za vizuelnu obradu; `reasoning` čuva modele za rezonovanje/razmišljanje.
- **Nivoi** (biraju težine bodovanja / filter skupa): `fast` (brza isporuka) · `cheap` (alias `floor`, uštedа troškova) · `reliable` (zdravlje circuit-breaker-a + stabilnost latencije) · `free` / `pro` (filtriraju skup po nivou modela putem `classifyTier` — besplatni nivo naspram premium nivoa).

| Primer                 | Rezultat                                                                  |
| ---------------------- | ------------------------------------------------------------------------- |
| `auto/coding:fast`     | skup za kôdiranje, težine za nisku latenciju                              |
| `auto/coding:cheap`    | skup za kôdiranje, optimizovano po troškovima (alias `auto/coding:floor`) |
| `auto/reasoning:pro`   | samo modeli za rezonovanje/razmišljanje, premium nivo                     |
| `auto/vision`          | modeli sposobni za vizuelnu obradu (bez nivoa → balansirane težine)       |
| `auto/multimodal:free` | modeli sposobni za multimodalnu obradu, samo besplatni nivo               |

Svaka važeća kombinacija `auto/<category>[:<tier>]` se razrešava po potrebi; odabrani podskup se prikazuje u `/v1/models` i na kontrolnoj tabli (`AUTO_SUFFIX_VARIANTS` u `open-sse/services/autoCombo/builtinCatalog.ts`). Filtriranje je **fail-open** — ako neko ograničenje ne odgovara nijednom povezanom modelu, koristi se čitav skup, tako da rutiranje nikada ne prestaje da radi. Osnovni sistem bodovanja (`combo.ts`) je nepromenjen; filter kategorije/nivoa se primenjuje u `buildAutoCandidates`.

> **Uvid u modele u realnom vremenu:** podesnost auto-rutiranja se zasniva na živim **Arena ELO** rangiranjima + podacima o nivoima sa **models.dev** kada je uključena oznaka `ARENA_ELO_SYNC_ENABLED` (u suprotnom se koristi statička mapa podesnosti).

**Kako koristiti:**

```bash
# Bilo koji IDE ili CLI alat koji podržava OpenAI format
Base URL: http://localhost:20128/v1
API Key:  <your-endpoint-key>

# U vašem kôdu/konfiguraciji, podesite model na:
model: "auto"                 # balansirana podrazumevana opcija
model: "auto/coding"          # najbolje za zadatke kôdiranja
model: "auto/fast"            # najbrže dostupno
model: "auto/cheap"           # najjeftinije po tokenu
```

**Šta se dešava:**

1. OmniRoute otkriva `auto/` prefiks u `src/sse/handlers/chat.ts`
2. Ispituje sve **aktivne veze sa provajderima** iz baze podataka
3. Filtrira ih na one sa važećim akreditivima (API ključ ili OAuth token)
4. Određuje model po vezi (`connection.defaultModel` ili prvi model provajdera)
5. Kreira **virtuelnu kombinaciju** u memoriji (nije snimljena u bazi)
6. Rutira koristeći profil težina odabrane varijante + LKGP strategiju

**Ključne osobine:**

- ✅ **Uvek aktivno:** Nema prekidača, kreiranja kombinacije ni potrebe za konfigurisanjem
- ✅ **Dinamično:** Automatski odražava trenutno povezane provajdere
- ✅ **Postojanost sesije:** LKGP obezbeđuje da posljednji uspešan provajder ima prioritet
- ✅ **Svesnost više naloga:** Svaka veza sa provajderom postaje poseban kandidat
- ✅ **Bez upisa u bazu:** Virtuelna kombinacija postoji samo za trajanje zahteva, bez ikakvog opterećenja za trajno čuvanje

### Kontrola kandidata po ključu (#7819, Nivo 1+2)

`GET /v1/auto-combo/{channel}/candidates` (`{channel}` = sufiks nakon `auto/`, ili
literal `auto` za osnovni kanal) je **samo za čitanje** krajnja tačka koja izlistava
trenutni skup kandidata `auto/*` kanala, obogaćen podacima o dostupnosti u realnom vremenu,
ponovnim korišćenjem postojećih očitavanja otpornosti (nikad sirovog `state` breaker-a):

- circuit breaker provajdera — `getCircuitBreaker(provider).getStatus()` / `.canExecute()`
- kuldaun veze — `rateLimitedUntil` / `testStatus` na razrešenom
  redu `provider_connections`
- zabrana modela — `isModelLocked(provider, connectionId, model)`

Svaki kandidat takođe nosi oznaku `excluded` za ovaj API ključ. Izuzeci se čuvaju
po API ključu (tabela `auto_candidate_overrides`, migracija `128`) — OmniRoute je
single-tenant sistem bez tabele `users`, tako da je `apiKeyId` najbliži stvarni identitet
po korisniku poziva — i primenjuju se na mestu suženja skupa kandidata u
`open-sse/services/autoCombo/virtualFactory.ts` putem čiste, testirane funkcije
`filterExcludedCandidates()` (`open-sse/services/autoCombo/candidateOverrides.ts`).
Filter je **fail-open**: nepostavljen apiKeyId/channel ili neuspeh pretrage u bazi
ostavljaju skup nefiltriranim, tako da operator bez konfigurisanih izuzetaka vidi rutiranje
identično onom pre uvođenja ove funkcionalnosti (bajt po bajt).

**Odloženo za naredni zadatak:** težine po kandidatu + eksplicitno redosled (Nivo 3
— uklapa se u postojeće puteve ponderisane/prioritetne strategije) i fiksiranje određene
`combo.ts` strategije po `auto/*` kanalu (Nivo 4). Pogledajte plan za #7819 za otvoreno
pitanje da li bi izuzeci trebalo da ostanu po API ključu ili postanu globalni, s obzirom na
single-tenant model.

**Iza scene:**

```txt
Zahtev: { model: "auto/coding" }
   ↓
src/sse/handlers/chat.ts otkriva prefiks
   ↓
createVirtualAutoCombo('coding') → candidatePool iz aktivnih veza
   ↓
handleComboChat (isti mehanizam kao trajne kombinacije)
   ↓
Auto-bodovanje bira najboljeg provajdera/model po zahtevu
```

**Fajlovi implementacije:**

| Fajl                                                      | Namena                                      |
| --------------------------------------------------------- | ------------------------------------------- |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Parser prefiksa (`parseAutoPrefix`)         |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Kreira virtuelne objekte `AutoComboConfig`  |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Test kuka za simulaciju registra provajdera |
| `src/sse/handlers/chat.ts`                                | Integracija: kratko-spajanje auto prefiksa  |
| `src/shared/constants/providers.ts`                       | Sistemski unos `SYSTEM_PROVIDERS.auto`      |

## Nazivi kombinacija koji odgovaraju stvarnom ID-u modela

Kombinacija čiji je `name` identičan golom ID-u modela (npr. kombinacija sa nazivom
`gpt-5.5`) je **namerni, podržani obrazac**, a ne greška: to je
mehanizam za fallback provajdera po ID-u modela, dokumentovan u
[#6940](https://github.com/diegosouzapw/OmniRoute/issues/6940). Pošto se razrešavanje kombinacije
provera prije razrešavanja golog ID-a modela
(`getComboForModel()` u `src/sse/services/model.ts`), zahtev za goli
ID `gpt-5.5` se rutira kroz mete kombinacije (npr.
`acme-responses/gpt-5.5`, `backup-responses/gpt-5.5`) umesto direktno ka
jednom provajderu — ovo ponovo koristi prioritet kombinacija-pre-prepisivanja izgrađen za
[#3227/#3233](https://github.com/diegosouzapw/OmniRoute/issues/3227) i testira se regresijom kroz `tests/unit/responses-combo-resolution-3227.test.ts` i
`tests/unit/combo-name-codex-responses-rewrite.test.ts`.

Kreiranje ili preimenovanje kombinacije u naziv koji zasenjuje stvarni ID modela
se **nikada ne odbija** — to bi narušilo ovaj dokumentovani proces. Umesto toga
(#8530), `POST /api/combos` i `PUT /api/combos/[id]` prilažu neblokirajuće
polje `warning` u odgovoru kada se (novi) naziv poklapa sa stvarnim
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
(`src/instrumentation-node.ts`) takođe zapisuje jednolinijsko `[STARTUP]` upozorenje
koje nabraja svaku postojeću kombinaciju koja zasenjuje ID modela, tako da operatori koji
na to naiđu slučajno (a ne namerno, prema #6940) imaju signal.
Pomoćna funkcija za detekciju se nalazi u `src/lib/combos/modelNameCollision.ts`.

## Pozivanje prilagođene kombinacije sa klijenta

Perzistentne kombinacije (Settings → Combos) se koriste samo kada klijent pošalje **tačan naziv** kombinacije u polju `model` — ne postoji nejasno ili delimično poklapanje naziva kombinacije, niti je uključen prefiks `auto/`. Redosled razrešavanja (`getComboForModel()` u `src/sse/services/model.ts`):

1. tačno poklapanje naziva kombinacije (`model: "my-combo"`),
2. prefiks `combo/<name>` (`model: "combo/my-combo"`),
3. mapiranja model→kombinacija putem glob obrazaca (`/api/model-combo-mappings`).

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"my-combo","messages":[{"role":"user","content":"Hello"}]}'
```

Dve česte zamke:

- **`auto` ne koristi vaše kombinacije.** `auto`/`auto/*` izgrađuje sopstveni skup kandidata bez konfiguracije i konsultuje perzistentne kombinacije samo ako je kombinacija bukvalno nazvana `auto` (nije preporučeno). Da biste rutirali kroz kombinaciju, pošaljite njen tačan naziv — ne `auto`.
- **`openrouter/auto` je stvarni plaćeni OpenRouter proizvod** ("Auto Best Available"), a ne OmniRoute alijas. To je jedini statički unos modela u OpenRouter registru (`open-sse/config/providers/registry/openrouter/index.ts`) i naplaćuje se posebno. Koristite Settings → Routing → Hide paid models da biste ga isključili iz `auto` skupova.

Pogledajte [#7992](https://github.com/diegosouzapw/OmniRoute/issues/7992) i [#7111](https://github.com/diegosouzapw/OmniRoute/issues/7111) za originalnu zabunu koju ovo dokumentuje.

## Како функционише (Persisted Auto-Combos)

Auto-Combo Engine динамички бира најбољег провајдера/модел за сваки захтев користећи **функцију оцењивања са 16 фактора** (дефинисана у `open-sse/services/autoCombo/scoring.ts` → `DEFAULT_WEIGHTS`). Подразумеване тежине се сабирају у `1.0`; прилагођене тежине се поново нормализују преко `normalizeScoringWeights()`. Три од шеснаест фактора — `cacheAffinity`, `resetWindowAffinity` и `reliability` — имају подразумевану тежину `0`: они се и даље израчунавају за сваког кандидата, а `cacheAffinity` контролише дедупликацију prompt-cache-а изван оцене, тако да су то декларисани фактори који подразумевано просто не утичу на глас.

![Auto-Combo оцењивање са 16 фактора](../diagrams/exported/auto-combo-scoring.svg)

> Извор: [diagrams/auto-combo-scoring.mmd](../diagrams/auto-combo-scoring.mmd) (регенерисати преко `npm run docs:render-diagrams`). Назив фајла је историјски; изворни и рендерован дијаграм показују свих 16 фактора декларисаних у `DEFAULT_WEIGHTS`.

| Фактор                | Подразумевана тежина | Опис                                                                                                                                                                                                                |
| :-------------------- | :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `quota`               | 0.1429               | Преостала квота / простор до ограничења брзине [0..1]                                                                                                                                                               |
| `health`              | 0.1605               | Оцена здравља из circuit breaker-а (CLOSED=1.0, HALF_OPEN=0.5, OPEN=0.0)                                                                                                                                            |
| `costInv`             | 0.1429               | Инверзна **комбинована** цена (60% цена улазних + 40% цена излазних токена, нормализовано) — јефтиније = виша оцена                                                                                                 |
| `latencyInv`          | 0.1143               | Инверзна p95 латенција нормализована на пул — брже = виша оцена                                                                                                                                                     |
| `taskFit`             | 0.0762               | Погодност за тип задатка (кодирање, ревизија, планирање, анализа, отклањање грешака, документација)                                                                                                                 |
| `stability`           | 0.0476               | Стабилност заснована на варијанси, из стандардне девијације латенције — кандидат чије време одзива осцилује добија нижу оцену                                                                                       |
| `tierPriority`        | 0.0476               | Приоритет према нивоу налога — Ultra=1.0, Pro=0.67, Standard=0.33, Free=0.0                                                                                                                                         |
| `tierAffinity`        | 0.0476               | Афинитет између нивоа кандидата и нивоа препорученог у манифесту                                                                                                                                                    |
| `specificityMatch`    | 0.0476               | Поклапање између специфичности захтева (наговештај манифеста) и нивоа модела                                                                                                                                        |
| `contextAffinity`     | 0.0476               | Афинитет између потребе захтева за контекстуалним прозором и контекстуалним прозором модела                                                                                                                         |
| `sessionAvailability` | 0.0476               | Доступност OAuth сесије кандидатске везе за ову сесију (`getOAuthSessionAvailability()`; конекције које нису OAuth добијају оцену 1.0)                                                                              |
| `connectionDensity`   | 0.0476               | Расподељује оптерећење по конекцијама истог провајдера (анти-концентрација)                                                                                                                                         |
| `cacheAffinity`       | 0.00                 | Афинитет базиран на rendezvous хешу према конекцији која најпробабилније већ садржи префикс prompt-cache-а за овај захтев (`open-sse/services/combo/promptCacheAffinity.ts`); подразумевано онемогућено (#8008)     |
| `resetWindowAffinity` | 0.00                 | Пристраност ка конекцијама чији је прозор ресетовања квоте повољан (подразумевано онемогућено)                                                                                                                      |
| `quality`             | 0.03                 | Сигнал квалитета излаза заснован на повратним информацијама из трекера квалитета routing-event-ова; кандидати без опсервација добијају неутралних 0.5                                                               |
| `reliability`         | 0.00                 | Опаженi удео успешности, `1 - failureRate`, из 24-часовне историје коришћења уз минимум од десет узорака (иначе метрике у реалном времену); кандидати без опсервација узимају се као 1.0. Подразумевано онемогућено |

**Збир:** `0.1429 + 0.1605 + 0.1429 + 0.1143 + 0.0762 + (7 × 0.0476) + 0.00 + 0.00 + 0.03 + 0.00 = 1.0` као што је декларисано у `DEFAULT_WEIGHTS`; тежине које конфигурише корисник поново се нормализују у дистрибуцију помоћу `normalizeScoringWeights()` пре оцењивања.

## Моде Пакети (Mode Packs)

6 предефинисаних профила тежина у `open-sse/services/autoCombo/modePacks.ts`. Сваки пакет у потпуности замењује подразумеване тежине да би усмерио селекцију ка једном циљу. Сваки пакет већ сабира до `1.0` (`0.9999` како је приказано на четири децимале), тако да `normalizeScoringWeights()` нема ништа значајно да коригује када је пакет активан — вредности испод су, до на заокруживање, оне које примењује скорер.

| Фактор                | ship-fast  | cost-saver | quality-first | offline-friendly | reliability-first | chaos-mode |
| :-------------------- | :--------- | :--------- | :------------ | :--------------- | :---------------- | :--------- |
| `quota`               | 0.1333     | 0.1333     | 0.0952        | **0.3524**       | 0.1333            | 0.0476     |
| `health`              | 0.2667     | 0.1810     | 0.1714        | 0.2667           | **0.3524**        | **0.4000** |
| `costInv`             | 0.0476     | **0.3524** | 0.0476        | 0.0952           | 0.0381            | 0.0190     |
| `latencyInv`          | **0.3048** | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0286     |
| `taskFit`             | 0.0952     | 0.0952     | **0.3524**    | 0.0000           | 0.0952            | 0.1905     |
| `stability`           | 0.0000     | 0.0476     | 0.1429        | 0.0952           | 0.1905            | 0.1714     |
| `tierPriority`        | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0190     |
| `tierAffinity`        | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `specificityMatch`    | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `contextAffinity`     | 0.0095     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0286     |
| `sessionAvailability` | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |
| `resetWindowAffinity` | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `connectionDensity`   | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |

Напомене:

- **Ниједан пакет не поставља `quality`, а пакет замењује мапу тежина у целости** (`weights = pack`, а не спајање). `quality` носи `0.03` у `DEFAULT_WEIGHTS`, али под било којим модом-пакетом нормализује се на `0` — избор пакета потпуно утишава сигнал посматраног квалитета. Ако желите да повратна информација о квалитету утиче на рутирање, оставите `modePack` непостављен и подешавајте тежине директно. (`cacheAffinity` је такође непостављен у сваком пакету, али је подразумевано `0` у сваком случају, тако да се ту ништа не мења.)
- `tierAffinity`, `specificityMatch` и `resetWindowAffinity` су експлицитно `0` у сваком пакету.
- Нагласак сваког пакета укратко:
  - **ship-fast** → latencyInv 0.3048 + health 0.2667 (мала латенција, здраве везе)
  - **cost-saver** → costInv 0.3524 (побеђују најјефтинији токени)
  - **quality-first** → taskFit 0.3524 + stability 0.1429 (најбољи модел за задатак, конзистентан)
  - **offline-friendly** → quota 0.3524 + health 0.2667 (максималан простор без обзира на брзину/цену)
  - **reliability-first** → health 0.3524 + stability 0.1905 (најмање изненађења)
  - **chaos-mode** → health 0.4000 + taskFit 0.1905 (профил за инјекцију грешака)

### Контроле по захтеву (заглавља) — #6023 / #6024 / #6025 / #3470

Комбо `auto` може бити усмерен **по захтеву** преко три заглавља, без мењања
сачуване конфигурације комбоа. Ова важе само за стратегију `auto` и само за захтев
који их носи; сачувани `modePack`/`budgetCap`/`budgetFallback` комбоа се користе
када заглавље није присутно.

| Заглавље                      | Прихвата                                                                                                                                                                                                     | Ефекат                                                                                                                                                                                                                                              |
| :---------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `X-OmniRoute-Mode`            | псеудоним предефинисаног профила (`fast`, `balanced`, `quality`, `cheap`, `reliable`, `offline`) или сирово име пакета (`ship-fast`, `cost-saver`, `quality-first`, `offline-friendly`, `reliability-first`) | Преписује тежине скорера за овај захтев. `balanced`/`default` намећу подразумеване тежине (без пакета). Непознате вредности се игноришу (конфигурација се задржава).                                                                                |
| `X-OmniRoute-Budget`          | позитиван број (максимум USD по захтеву)                                                                                                                                                                     | Тврда границa цене: кандидати чија процењена цена премашује ову вредност се филтрирају пре селекције. Шта се дешава када **сви** кандидати премаше ову вредност контролисано је помоћу `X-OmniRoute-Budget-Fallback` испод.                         |
| `X-OmniRoute-Budget-Fallback` | `cheapest` (подразумевано, псеудоними: `cheapest-viable`, `soft`) или `strict` (псеудоними: `block`, `hard`)                                                                                                 | `cheapest`: враћа се на глобално најјефтинијег кандидата иако и он премашује ограничење (наследно понашање). `strict`: одбија да изабере — захтев одмах не успе са `HTTP 402` уместо да прећутно прекорачи буджет. Непознате вредности се игноришу. |

```bash
# Форсирај најбржи профил, ограничи овај захтев на $0.05 и тврдо блокирај уместо прекорачења буџета
curl -sS http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "X-OmniRoute-Mode: fast" \
  -H "X-OmniRoute-Budget: 0.05" \
  -H "X-OmniRoute-Budget-Fallback: strict" \
  -d '{"model":"auto","messages":[{"role":"user","content":"hi"}]}'
```

Разрешавање је чиста функција (`open-sse/services/autoCombo/requestControls.ts`);
разрешене вредности се прослеђују постојећим уносима мотора `config.modePack` / `config.budgetCap` /
`config.budgetFallback`. Сачувана конфигурација комбоа `config.budgetFallback` ("strict" |
"cheapest") поставља трајну политику; заглавље је преписује за један захтев.

## Све стратегије рутирања

OmniRoute-ов combo енџин подржава **19 стратегија рутирања** (декларисане у `src/shared/constants/routingStrategies.ts` → `ROUTING_STRATEGY_VALUES`). Сам Auto Combo енџин изложен је под стратегијом `auto`; остале су доступне за трајно сачуване combo-е.

| Стратегија          | Опис                                                                                                                                                                                             |
| :------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `priority`          | Уређена листа циљева по редоследу, са експлицитним приоритетом                                                                                                                                   |
| `weighted`          | Пондерисани случајан избор по тежини сваког циља                                                                                                                                                 |
| `round-robin`       | Циклично пролажење кроз циљеве по редоследу                                                                                                                                                      |
| `context-relay`     | Прослеђивање контекста између циљева (дуги разговори)                                                                                                                                            |
| `fill-first`        | Попуни квоту сваког циља пре прелаза на следећи                                                                                                                                                  |
| `p2c`               | Насумично балансирање оптерећења по методи „power-of-2-choices”                                                                                                                                  |
| `random`            | Равномеран случајан избор                                                                                                                                                                        |
| `least-used`        | Бира циљ са тренутно најмањим оптерећењем                                                                                                                                                        |
| `cost-optimized`    | Минимизира цену по захтеву на основу цена из каталога                                                                                                                                            |
| `reset-aware` ⭐    | Приоритизује на основу времена ресетовања квоте — кратки прозори ресетовања рангирају се више                                                                                                    |
| `reset-window`      | Даје предност циљевима чији прозор квоте се најскорије ресетује                                                                                                                                  |
| `headroom`          | Бира циљ са највишим преосталим простором квоте (headroom)                                                                                                                                       |
| `strict-random`     | Насумичан избор без уклањања дупликата понављања                                                                                                                                                 |
| `auto`              | Користи Auto Combo бодовање (16 фактора) — **препоручено**                                                                                                                                       |
| `lkgp`              | Last-Known-Good Path (пин на последњи успешан провајдер, уз повратак на правила)                                                                                                                 |
| `context-optimized` | Бира циљ који најбоље одговара тренутној величини контекста                                                                                                                                      |
| `cache-optimized`   | Преуређује циљеве по афинитету према prompt-cache-у — прва се проба веза која најпробабилније већ садржи кеширани префикс овог захтева (`open-sse/services/combo/promptCacheAffinity.ts`, #8008) |
| `fusion` 🧬         | Паралелно шаље захтев панелу модела, затим синтетизује један одговор преко „судије” (види испод)                                                                                                 |
| `pipeline`          | Извршава циљеве секвенцијално, прослеђујући излаз сваког корака као улаз следећег; враћа се само коначан одговор (#6396)                                                                         |

⭐ = Ново у v3.8.0 · 🧬 = Ново у v3.8.36

### Семантика `weighted`

`weighted` је **пропорционално случајно извлачење по захтеву**
(`open-sse/services/combo/targetSorters.ts` → `selectWeightedTarget`), а не изравнавач:

- Сваки захтев извлачи **један** корак са вероватноћом `weight / totalWeight`; преостали кораци
  се поређају по опадајућој тежини као резервни ланац за тај захтев.
- Корак чија је тежина `0` (или недостаје) се **никада не извлачи** докле год неки други корак има
  тежину > 0 — може служити само као резерва након што извучени корак не успе. Само када **сви**
  кораци имају тежину 0, избор постаје равномеран.
- Кораци чији су сви циљеви недоступни — circuit breaker провајдера у стању `OPEN`, cooldown везе,
  закључавање модела — уклањају се из извлачења пре него што се оно изврши
  (`open-sse/services/combo/targetResolution.ts`), тако да један здрав корак може привремено
  „освојити” сваки захтев.
- `stickyWeightedLimit` (конфигурација combo-а, подразумевано `1` = искључено) фиксира извучени корак
  за тај број узастопних успеха пре поновног извлачења.

За строгу ротацију користите `round-robin`; једнаке тежине код `weighted` дају статистичку — а не
строгу — уравнотеженост.

## Fusion strategija

`fusion` je jedina strategija koja **ne** bira jedan cilj. Ona šalje prompt
paralelno na **svaki panel model**, a zatim konfigurabilni **judge model** sintetiše
jedan konačan odgovor na osnovu svih odgovora panela. Prenešeno iz upstream `decolua/9router`
(OpenRouter-ov Fusion dizajn); implementacija u `open-sse/services/fusion.ts`.

Kako funkcioniše:

0. **Zaobilaženje sa alatima (tool-bearing bypass)** — zahtev koji nosi neprazan `tools` niz sa
   `tool_choice` koji nije eksplicitno `"none"` u potpunosti zaobilazi panel: rutira se direktno na
   jedan model (konfigurisani judge, ili `panel[0]`) sa `tools`/`tool_choice`
   prosleđenim nepromenjenim. Članovi panela nemaju pristup alatima i judge-ova
   direktiva za sintezu obeshrabruje emitovanje tool-call-a, pa agentni/tool-calling klijenti
   dobijaju stvarnu odluku o tool-call-u umesto sintetizovane proze (#6771).
1. **Fan-out** (samo za zahteve koji ne nose alate) — prompt se šalje svakom panel
   modelu odjednom, forsirano bez streaminga sa uklonjenim alatima (judge-u je potrebna
   kompletna proza za sintezu).
2. **Prikupljanje sa quorum-grace periodom** — čim stigne `minPanel` odgovora, počinje
   kratki grace tajmer za zaostale modele, a zatim fusion nastavlja sa onim što je
   prikupljeno. Ovo ograničava kaznu najsporijeg modela na ukupno vreme, ograničeno
   tvrdim timeout-om.
3. **Judge sinteza** — odgovori panela se anonimizuju (`Source 1`, `Source 2`, … — tako da
   judge procenjuje suštinu, a ne brend modela) i predaju judge-u, koji analizira
   konsenzus / kontradikcije / delimičnu pokrivenost / jedinstvene uvide / slepe tačke, a zatim
   piše **jedan** autoritativan odgovor. Judge poziv čuva klijentov originalni
   `stream` flag + alate, tako da streaming i naknadna upotreba alata i dalje funkcionišu.
4. **Graciozna degradacija** — 0 odgovora panela → `503`; tačno 1 preživeli → taj odgovor
   se vraća direktno (nema šta da se fuzioniše); panel sa jednim modelom odgovara direktno.

Član panela može takođe biti `combo-ref` korak (`{kind: "combo-ref", comboName: "..."}`) koji upućuje na
drugi combo — on se rešava kao **jedan black-box panel glas** (potpuni rekurzivni dispatch u
referencirani combo, a ne fan-out ciljeva tog combo-a), sa istom zaštitom od dubine/ciklusa koju
već koriste sve ostale strategije koje konzumiraju combo-ref (#6764).

### Konfiguracija

Konfiguriše se na `config` blob-u combo-a (bez migracije šeme — ponovo se koristi postojeća
tabela `combos`):

| Polje                                    | Tip      | Podrazumevano    | Namena                                                                                           |
| :--------------------------------------- | :------- | :--------------- | :----------------------------------------------------------------------------------------------- |
| `config.judgeModel`                      | `string` | prvi panel model | Model koji sintetiše konačan odgovor                                                             |
| `config.fusionTuning.minPanel`           | `number` | `2`              | Broj uspešnih odgovora potreban pre nego što grace tajmer počne (ograničeno na `[2, panelSize]`) |
| `config.fusionTuning.stragglerGraceMs`   | `number` | `8000`           | Koliko dugo čekati zaostale modele nakon što je kvorum postignut                                 |
| `config.fusionTuning.panelHardTimeoutMs` | `number` | `90000`          | Apsolutni limit tako da jedan zaglavljen model ne može da blokira zahtev                         |

Podrazumevane vrednosti se nalaze u `FUSION_DEFAULTS` (`open-sse/services/fusion.ts`).

### Primer

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

Zatim ga pozovite kao svaki drugi combo: `{"model":"fusion-panel","messages":[...]}`.

## Виртуелна Auto-Combo фабрика

Auto Combo мотор не захтева претходно дефинисане комбинације. Уместо тога, `open-sse/services/autoCombo/virtualFactory.ts` изграђује кандидате у ходу:

1. Повлачи `getProviderConnections({ isActive: true })` (све омогућене конекције)
2. Филтрира на оне са важећим credentials (API кључ или OAuth токен који није истекао, преко `hasUsableOAuthToken()`)
3. Укршта са `getProviderRegistry()` за доступност модела + цене
4. За сваку торку `(provider, model, connection)`, изграђује `VirtualAutoComboCandidate`
5. Бира `connection.defaultModel` (или први модел из registry-а) као циљ за дистрибуцију
6. Оцењује сваки кандидат помоћу 16-факторског `scorePool()` и пакета тежина одговарајуће варијанте
7. Враћа резултујућу `AutoComboConfig` у меморији за `handleComboChat()` — никада се не чува у бази података

Ово значи да **додавање новог провајдера са омогућеним `auto/*` аутоматски проширује скуп кандидата** — без потребе за ручним уређивањем комбинација. Виртуелна комбинација се изграђује поново за сваки захтев, тако да новододате или новоопорављене конекције бивају одмах узете у обзир.

## Самоопоравак (Self-Healing)

- **Привремено искључивање**: Резултат < 0.2 → искључено на 5 минута (прогресивни backoff, максимум 30 минута)
- **Свесност circuit breaker-а**: OPEN → аутоматски искључено; HALF_OPEN → пробни захтеви
- **Режим инцидента**: >50% OPEN → искључује се истраживање, максимизује стабилност
- **Опоравак након пузе (cooldown)**: После искључивања, први захтев је "проба" са смањеним временским ограничењем

## Bandit истраживање

5% захтева (подесиво) се усмерава ка насумичним провајдерима ради истраживања. Онемогућено у режиму инцидента.

## API

Не постоји наменски `POST /api/combos/auto` крајња тачка — Auto-Combo се користи на два начина:

1. **Без конфигурације (препоручено):** Пошаљите било који chat completion захтев са `model: "auto"` или `model: "auto/<variant>"`. Виртуелна фабрика изграђује комбинацију по захтеву — без перзистенције, без потребе за API позивима.

2. **Перзистентна комбинација са `strategy: "auto"`:** Направите обичну комбинацију преко `POST /api/combos` и подесите `strategy: "auto"` плус `config.auto.weights` / `config.auto.candidatePool`. Користи се исти мотор за оцењивање; комбинација се чува у `combos` табели и може се поново користити преко ID-а.

За откривање, `GET /api/combos/auto` листа сваку варијанту са њеним разрешеним скупом кандидата, плус `context_length` / `max_output_tokens` — MAX вредност преко свих прозора у скупу кандидата. Клијенти (нпр. opencode plugin) морају да оглашавају ове вредности уместо `0`: нулти контекст потпуно онемогућава opencode-ову ауто-компакцију, дозвољавајући сесијама да расту док чишћење историје на gateway-у не уништи контекст. MAX је безбедно оглашавати јер претфилтер контекста auto-combo-а усмерава превелике захтеве на кандидате са великим прозором.

```bash
# Коришћење без конфигурације (без прављења комбинације)
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"auto/coding","messages":[{"role":"user","content":"Hello"}]}'

# Перзистентна auto комбинација преко обичне combos крајње тачке
curl -X POST http://localhost:20128/api/combos \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","strategy":"auto","config":{"auto":{"candidatePool":["anthropic","google","openai"],"weights":{"quota":0.15,"health":0.3,"costInv":0.05,"latencyInv":0.35,"taskFit":0.1,"stability":0,"tierPriority":0.05}}}}'
```

### Стратегије auto рутера

Перзистентне `strategy: "auto"` комбинације могу да подесе `config.routerStrategy` (или
застарело `config.auto.routerStrategy`) на једну од следећих вредности:

- `rules` — подразумевано пондерисано оцењивање
- `score` — бира најбоље оцењеног кандидата према конфигурисаном пондерисаном резултату. Потпуно изједначени резултати чувају конфигурисани редослед кандидата; постојећи `explorationRate` узоркује из целог рангираног скупа.
- `cost` / `eco` — најјефтинији здрав провајдер
- `latency` / `fast` — најнижа p95 латенција са казном за поузданост
- `sla-aware` / `sla` — фаворизује кандидате који задовољавају p95 латенцију, стопу грешака и опционе циљеве трошкова (SLO)
- `lkgp` — последњи познати добар провајдер прво

### Детаљан приказ стратегија рутера

Auto-combo мотор излаже 6 модуларних имплементација **RouterStrategy** које
можете мењати преко `config.routerStrategy` (или застарелог `config.auto.routerStrategy`).
Свака стратегија бира једног провајдера из скупа кандидата, на основу `RoutingContext`
(тип задатка, назнаке за алат/визију, процена броја токена, опциона SLA политика,
опциони последњи познати добар провајдер).

#### 1. `rules` (подразумевано) — 16-факторско пондерисано оцењивање

Обавија постојећи мотор за оцењивање. Филтрира кандидате чији је circuit-breaker
у стању `OPEN`, затим покреће `scorePool()` са тренутним типом задатка и `getTaskFitness()`,
бирајући провајдера са највишим резултатом.

```ts
class RulesStrategyImpl implements RouterStrategy {
  readonly name = "rules";
  readonly description = "16-факторско пондерисано оцењивање (види DEFAULT_WEIGHTS)";

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

**Када користити**: Подразумевано. Користите када желите balansiran однос свих сигнала.

**Алијас**: `rules` (нема алијас)

---

#### 2. `cost` / `eco` — најјефтинији здрав провајдер

Сортира скуп кандидата по `costPer1MTokens` (растуће) и бира најјефтинијег.
Прво филтрира кандидате у стању `OPEN`.

```ts
class CostStrategyImpl implements RouterStrategy {
  readonly name = "cost";
  readonly description = "Увек бира најјефтинијег доступног провајдера";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort((a, b) => a.costPer1MTokens - b.costPer1MTokens);
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**Када користити**: Радни задаци осетљиви на трошкове, batch обрада или послови у позадини.

**Алијаси**: `cost`, `eco`

---

#### 3. `latency` / `fast` — најнижа p95 латенција са казном за поузданост

Сортира по `p95LatencyMs + (errorRate * 1000)`. Казна за стопу грешака обезбеђује да
непоуздани провајдери буду рангирани ниже, чак и ако им је номинална латенција ниска.

```ts
class LatencyStrategyImpl implements RouterStrategy {
  readonly name = "latency";
  readonly description = "Приоритизује најнижу p95 латенцију уз пондерисање поузданости";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort(
      (a, b) => a.p95LatencyMs + a.errorRate * 1000 - (b.p95LatencyMs + b.errorRate * 1000)
    );
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**Када користити**: Радни задаци осетљиви на латенцију, као чет у реалном времену, аутоматско
довршавање, или интерактивни асистенти за кодирање.

**Алијаси**: `latency`, `fast`

---

#### 4. `sla-aware` / `sla` — усклађеност са SLO за латенцију/грешке/трошкове

Оцењује сваког кандидата на основу тога колико добро задовољава конфигурисану SLO политику:

| Фактор                      | Тежина | Формула                                                |
| --------------------------- | ------ | ------------------------------------------------------ |
| Резултат латенције          | 35%    | `threshold / max(value, ε)`                            |
| Резултат грешака            | 35%    | `threshold / max(value, ε)`                            |
| Резултат здравственог стања | 15%    | `1.0` (CLOSED) / `0.5` (HALF_OPEN) / `0.0` (OPEN)      |
| Резултат трошкова           | 10%    | `threshold / max(value, ε)` или инверзно нормализовано |
| Резултат стабилности        | 5%     | инверзно нормализована стандардна девијација латенције |

Када је `hardConstraints: true`, кандидати се сортирају примарно по **резултату кршења**
(колико прекорачују било који SLO), а затим по композитном резултату. Иначе, користи се
само композитни резултат.

```ts
class SLAStrategyImpl implements RouterStrategy {
  readonly name = "sla-aware";
  readonly description =
    "Бира провајдера који највероватније задовољава SLO за латенцију, стопу грешака и трошкове";

  select(pool, context) {
    // ... оцењује сваког кандидата у односу на политику: { targetP95Ms, maxErrorRate, maxCostPer1MTokens, hardConstraints }
  }
}
```

**SLA поља** (подешавају се у конфигурацији комбинације):

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

**Када користити**: Продукциони радни задаци са строгим буџетима за латенцију, стопу грешака или трошкове.

**Алијаси**: `sla-aware`, `sla`

---

#### 5. `lkgp` — последњи познати добар провајдер прво

Прво покушава са **последњим познатим добрим провајдером** (ако је постављен), а затим се
враћа на `rules` стратегију. Корисно за session stickiness — исти провајдер обрађује
накнадне захтеве у оквиру разговора.

```ts
class LKGPStrategyImpl implements RouterStrategy {
  readonly name = "lkgp";
  readonly description = "Прво покушава последњи познати добар провајдер, затим се враћа на rules";

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

    // Враћа се на rules стратегију
    return getStrategy("rules").select(pool, context);
  }
}
```

**Када користити**: Разговори са више размена (multi-turn) где желите да исти провајдер обрађује
накнадне захтеве (нпр. за кеширање, контекстуалну непрекидност или конзистентност цена).

**Алијас**: `lkgp` (нема алијас)

---

### Прилагођене стратегије рутера

Можете регистровати сопствену имплементацију `RouterStrategy` преко јавног API-ја:

```ts
import {
  registerStrategy,
  type RouterStrategy,
} from "@omniroute/open-sse/services/autoCombo/routerStrategy";

class MyCustomStrategy implements RouterStrategy {
  readonly name = "my-custom";
  readonly description = "Моја прилагођена стратегија рутирања";

  select(pool, context) {
    // Ваша логика рутирања овде
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

Затим је користите:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "my-custom"
  }
}
```

---

### Водич за избор стратегије рутера

| Случај употребе          | Стратегија  | Разлог                                    |
| ------------------------ | ----------- | ----------------------------------------- |
| Balansiran радни задатак | `rules`     | Подразумевано — узима у обзир све факторе |
| Минимизација трошкова    | `cost`      | Увек бира најјефтинијег                   |
| Минимизација латенције   | `latency`   | Бира најбржег поузданог провајдера        |
| Строги SLO               | `sla-aware` | Филтрира по прагу p95/грешке/трошкова     |
| Multi-turn чет           | `lkgp`      | Session stickiness                        |

SLA-aware поља:

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

## Podesnost za zadatke

30+ modela ocenjeno je za 6 tipova zadataka (`coding`, `review`, `planning`, `analysis`, `debugging`, `documentation`). Podržani su wildcard obrasci (npr. `*-coder` → visoka ocena za coding).

## Rekapitulacija Auto varijanti

Uključujući goli `auto` (podrazumevano) plus 6 vrednosti `AutoVariant` deklarisanih u `autoPrefix.ts`, postoji **7 pozivnih ID-jeva modela**:

`auto`, `auto/coding`, `auto/fast`, `auto/cheap`, `auto/offline`, `auto/smart`, `auto/lkgp`

(`AutoVariant` sam po sebi nabraja 6 vrednosti; 7. opcija je "bez varijante" — goli `auto` — koju `parseAutoPrefix()` obrađuje kao `variant: undefined`.)

## Kako se tier-ovi uklapaju u Auto-Combo

Funkcija za bodovanje sa 16 faktora (`open-sse/services/autoCombo/scoring.ts`) tretira
pripadnost tier-u kao dva signala: `tierPriority` (0.0476) i `tierAffinity` (0.0476). Pogledajte
kanonsku [tabelu faktora bodovanja](#how-it-works-persisted-auto-combos) iznad za kompletan
skup `DEFAULT_WEIGHTS` — prepravke po paketima (ship-fast/cost-saver/quality-first/
offline-friendly) su navedene u tabeli "Weight profiles per pack".

Sam tier ne prisiljava **automatski** Tier 1 da bude prvi — ako je latencija Tier 1 loša ili
je odnos cene i kvaliteta neoptimalan, pobeđuje Tier 2. Da biste nametnuli redosled tier-ova, koristite
combo strategiju `priority` i poređajte provajdere po tier-u.

Da biste snažno favorizovali Tier 1 (pretplata), povećajte težinu `tierPriority`:

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "tierPriority": 0.3, "costInv": 0.05 } } }
}
```

Pogledajte `docs/marketing/TIERS.md` za definicije tier-ova i klasifikaciju provajdera.

## Testiranje i pokrivenost

### Deterministička matrica odluka o rutiranju (`npm run test:combo:matrix`)

`tests/integration/combo-matrix/*.test.ts` dokazuje **odluku** o rutiranju svih 19
javnih strategija od kraja do kraja kroz stvarni combo pipeline sa mokovanim upstream-om.
Pokrivenost uključuje:

- Svih 19 strategija iz `ROUTING_STRATEGY_VALUES` (ordered, weighted, cost, context, fusion, …).
- `quota-share` (interno) od kraja do kraja: DRR pravičnost + smanjenje prioriteta usled saturacije putem
  stvarnog seam-a `selectQuotaShareTarget` (`registerQuotaFetcher` / `setLKGP` /
  `__setHeadroomSaturationFetcherForTests`).
- Pokrivenost `context-relay` univerzalnog predavanja (handoff) za svaki broj ciljeva.

Ovaj skup testova se izvršava u CI-u (posao `test:integration`) sa `--test-concurrency=1` i
`--test-force-exit` tako da je deterministički i ne zahteva prave kredencijale.

### Ograničeni "live" smoke testovi (NISU u CI-u — pravi provajderi)

| Komanda                                | Šta radi                                                                            |
| :------------------------------------- | :---------------------------------------------------------------------------------- |
| `npm run test:combo:live`              | Rutiranje u realnom procesu sa `RUN_COMBO_LIVE=1`; pravi snimak žive OmniRoute baze |
| `npm run test:combo:live:vps`          | HTTP pozivi prema živom OmniRoute serveru (postavite `COMBO_LIVE_BASE_URL`)         |
| `npm run test:combo:live:vps:failover` | Isto, sa namernim scenarijima failover-a                                            |

Ovi smoke testovi koriste stvarnu putanju prenosa (combo → provajder → completion). Namerno
su izostavljeni iz CI-a jer zahtevaju prave kredencijale i pristup VPS-u.

---

## Datoteke

| Datoteka                                                  | Namena                                                                                                   |
| :-------------------------------------------------------- | :------------------------------------------------------------------------------------------------------- |
| `open-sse/services/autoCombo/scoring.ts`                  | Funkcija bodovanja sa 16 faktora, `DEFAULT_WEIGHTS`, normalizacija pула                                  |
| `open-sse/services/autoCombo/taskFitness.ts`              | Pretraga podudarnosti model × zadatak                                                                    |
| `open-sse/services/autoCombo/engine.ts`                   | Logika selekcije, bandit, ograničenje budžeta                                                            |
| `open-sse/services/autoCombo/selfHealing.ts`              | Isključivanje, probe, režim incidenta                                                                    |
| `open-sse/services/autoCombo/modePacks.ts`                | 6 profila težina (ship-fast, cost-saver, quality-first, offline-friendly, reliability-first, chaos-mode) |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Parser prefiksa `auto/` + 6 varijanti                                                                    |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Izgrađuje in-memory `AutoComboConfig` na osnovu aktivnih konekcija                                       |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Test kuka za mokovanje registra provajdera                                                               |
| `src/shared/constants/routingStrategies.ts`               | `ROUTING_STRATEGY_VALUES` (19 strategija)                                                                |
| `src/sse/handlers/chat.ts`                                | Integracija: kratki spoj za auto-prefiks                                                                 |
