# OmniRoute Auto-Combo Engine (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/AUTO-COMBO.md) · 🇪🇹 [am](../../../am/docs/routing/AUTO-COMBO.md) · 🇸🇦 [ar](../../../ar/docs/routing/AUTO-COMBO.md) · 🇦🇿 [az](../../../az/docs/routing/AUTO-COMBO.md) · 🇧🇬 [bg](../../../bg/docs/routing/AUTO-COMBO.md) · 🇧🇩 [bn](../../../bn/docs/routing/AUTO-COMBO.md) · 🇨🇿 [cs](../../../cs/docs/routing/AUTO-COMBO.md) · 🇩🇰 [da](../../../da/docs/routing/AUTO-COMBO.md) · 🇩🇪 [de](../../../de/docs/routing/AUTO-COMBO.md) · 🇬🇷 [el](../../../el/docs/routing/AUTO-COMBO.md) · 🇪🇸 [es](../../../es/docs/routing/AUTO-COMBO.md) · 🇪🇪 [et](../../../et/docs/routing/AUTO-COMBO.md) · 🇮🇷 [fa](../../../fa/docs/routing/AUTO-COMBO.md) · 🇫🇮 [fi](../../../fi/docs/routing/AUTO-COMBO.md) · 🇫🇷 [fr](../../../fr/docs/routing/AUTO-COMBO.md) · 🇮🇪 [ga](../../../ga/docs/routing/AUTO-COMBO.md) · 🇮🇳 [gu](../../../gu/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ha](../../../ha/docs/routing/AUTO-COMBO.md) · 🇮🇱 [he](../../../he/docs/routing/AUTO-COMBO.md) · 🇮🇳 [hi](../../../hi/docs/routing/AUTO-COMBO.md) · 🇭🇷 [hr](../../../hr/docs/routing/AUTO-COMBO.md) · 🇭🇺 [hu](../../../hu/docs/routing/AUTO-COMBO.md) · 🇦🇲 [hy](../../../hy/docs/routing/AUTO-COMBO.md) · 🇮🇩 [id](../../../id/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ig](../../../ig/docs/routing/AUTO-COMBO.md) · 🇮🇹 [it](../../../it/docs/routing/AUTO-COMBO.md) · 🇯🇵 [ja](../../../ja/docs/routing/AUTO-COMBO.md) · 🇬🇪 [ka](../../../ka/docs/routing/AUTO-COMBO.md) · 🇰🇭 [km](../../../km/docs/routing/AUTO-COMBO.md) · 🇮🇳 [kn](../../../kn/docs/routing/AUTO-COMBO.md) · 🇰🇷 [ko](../../../ko/docs/routing/AUTO-COMBO.md) · 🇱🇹 [lt](../../../lt/docs/routing/AUTO-COMBO.md) · 🇱🇻 [lv](../../../lv/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ml](../../../ml/docs/routing/AUTO-COMBO.md) · 🇮🇳 [mr](../../../mr/docs/routing/AUTO-COMBO.md) · 🇲🇾 [ms](../../../ms/docs/routing/AUTO-COMBO.md) · 🇲🇹 [mt](../../../mt/docs/routing/AUTO-COMBO.md) · 🇲🇲 [my](../../../my/docs/routing/AUTO-COMBO.md) · 🇳🇵 [ne](../../../ne/docs/routing/AUTO-COMBO.md) · 🇳🇱 [nl](../../../nl/docs/routing/AUTO-COMBO.md) · 🇳🇴 [no](../../../no/docs/routing/AUTO-COMBO.md) · 🇮🇳 [or](../../../or/docs/routing/AUTO-COMBO.md) · 🇮🇳 [pa](../../../pa/docs/routing/AUTO-COMBO.md) · 🇵🇭 [phi](../../../phi/docs/routing/AUTO-COMBO.md) · 🇵🇱 [pl](../../../pl/docs/routing/AUTO-COMBO.md) · 🇵🇹 [pt](../../../pt/docs/routing/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/AUTO-COMBO.md) · 🇷🇴 [ro](../../../ro/docs/routing/AUTO-COMBO.md) · 🇷🇺 [ru](../../../ru/docs/routing/AUTO-COMBO.md) · 🇱🇰 [si](../../../si/docs/routing/AUTO-COMBO.md) · 🇸🇰 [sk](../../../sk/docs/routing/AUTO-COMBO.md) · 🇷🇸 [sr](../../../sr/docs/routing/AUTO-COMBO.md) · 🇸🇪 [sv](../../../sv/docs/routing/AUTO-COMBO.md) · 🇰🇪 [sw](../../../sw/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ta](../../../ta/docs/routing/AUTO-COMBO.md) · 🇮🇳 [te](../../../te/docs/routing/AUTO-COMBO.md) · 🇹🇭 [th](../../../th/docs/routing/AUTO-COMBO.md) · 🇹🇷 [tr](../../../tr/docs/routing/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/AUTO-COMBO.md) · 🇵🇰 [ur](../../../ur/docs/routing/AUTO-COMBO.md) · 🇺🇿 [uz](../../../uz/docs/routing/AUTO-COMBO.md) · 🇻🇳 [vi](../../../vi/docs/routing/AUTO-COMBO.md) · 🇳🇬 [yo](../../../yo/docs/routing/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/AUTO-COMBO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/AUTO-COMBO.md)

---

> **Za uporabnike**: Iščete hiter začetek? Za preproste razlage in primere si oglejte [Uporabniški priročnik za Auto-Combo](../getting-started/AUTO-COMBO-GUIDE.md).

> Samoupravljajoče se verige modelov s prilagodljivim točkovanjem in samodejnim usmerjanjem brez konfiguracije

## Samodejno usmerjanje brez konfiguracije (predpona `auto/`)

> **NOVO:** Ustvarjanje kombinacije ni potrebno. Predpono `auto/` uporabite neposredno v katerem koli odjemalcu.

### Hitri primeri

| ID modela      | Različica | Vedenje                                                                             |
| -------------- | --------- | ----------------------------------------------------------------------------------- |
| `auto`         | privzeta  | Vsi povezani ponudniki, strategija LKGP, uravnotežene uteži                         |
| `auto/coding`  | coding    | Uteži s prednostjo kakovosti, primerno za ustvarjanje kode                          |
| `auto/fast`    | fast      | Utežena izbira z nizko zakasnitvijo                                                 |
| `auto/cheap`   | cheap     | Stroškovno optimizirano usmerjanje (najprej najnižji strošek)                       |
| `auto/offline` | offline   | Daje prednost ponudnikom z največjo razpoložljivostjo kvote                         |
| `auto/smart`   | smart     | Prednost kakovosti + višja stopnja raziskovanja (10 %) za boljše odkrivanje modelov |
| `auto/lkgp`    | lkgp      | Izrecni LKGP (enako kot privzeti `auto`)                                            |
| `auto/chaos`   | chaos     | Uteži za vbrizgavanje napak pri preizkušanju odpornosti (inženirstvo kaosa)         |

### Sestavljanje kategorije × ravni (`auto/<category>:<tier>`)

Pripone v slogu OpenRouter ločijo **vrsto poti** (kategorijo) od tega, **kako jo optimizirati** (raven), zato jih lahko poljubno sestavljate (#4235 Phase B, `open-sse/services/autoCombo/suffixComposition.ts`):

- **Kategorije** (filtrirajo nabor kandidatov glede na zmogljivost): `coding` · `reasoning` · `vision` · `chat` · `multimodal`. `vision`/`multimodal` ohranita modele, ki podpirajo vid; `reasoning` ohrani modele za sklepanje/razmišljanje.
- **Ravni** (izberejo uteži ocenjevanja oziroma filter nabora): `fast` (hitra uvedba) · `cheap` (vzdevek `floor`, varčevanje s stroški) · `reliable` (zdravje odklopnika + stabilnost zakasnitve) · `free` / `pro` (filtriranje nabora glede na raven modela prek `classifyTier` — brezplačna raven v primerjavi s premijsko).

| Primer                 | Razreši se v                                                                 |
| ---------------------- | ---------------------------------------------------------------------------- |
| `auto/coding:fast`     | nabor za programiranje, uteži z nizko zakasnitvijo                           |
| `auto/coding:cheap`    | nabor za programiranje, stroškovno optimiziran (vzdevek `auto/coding:floor`) |
| `auto/reasoning:pro`   | samo modeli za sklepanje/razmišljanje, premijska raven                       |
| `auto/vision`          | modeli, ki podpirajo vid (brez ravni → uravnotežene uteži)                   |
| `auto/multimodal:free` | modeli z večmodalnimi zmogljivostmi, samo brezplačna raven                   |

Vsak veljaven `auto/<category>[:<tier>]` se razreši na zahtevo; skrbno izbrana podmnožica je objavljena v `/v1/models` in na nadzorni plošči (`AUTO_SUFFIX_VARIANTS` v `open-sse/services/autoCombo/builtinCatalog.ts`). Filtriranje je **odprto ob napaki** — če omejitev ne ustreza nobenemu povezanemu modelu, se uporabi celoten nabor, zato se usmerjanje nikoli ne prekine. Osrednji ocenjevalnik (`combo.ts`) ostane nespremenjen; filter kategorije/ravni se uporabi v `buildAutoCandidates`.

> **Podatki o modelih v živo:** ustreznost za samodejno usmerjanje določajo sprotne lestvice **Arena ELO** in podatki o ravneh iz **models.dev**, ko je zastavica `ARENA_ELO_SYNC_ENABLED` vklopljena (sicer se uporabi statični zemljevid ustreznosti).

**Uporaba:**

```bash
# Katero koli razvojno okolje ali orodje CLI, ki podpira obliko OpenAI
Osnovni URL: http://localhost:20128/v1
Ključ API:  <ključ-vaše-končne-točke>

# V kodi/konfiguraciji nastavite model na:
model: "auto"                 # uravnotežena privzeta možnost
model: "auto/coding"          # najboljše za programerske naloge
model: "auto/fast"            # najhitrejša razpoložljiva možnost
model: "auto/cheap"           # najcenejša možnost na žeton
```

**Kaj se zgodi:**

1. OmniRoute zazna predpono `auto/` v `src/sse/handlers/chat.ts`
2. V zbirki podatkov poišče vse **aktivne povezave ponudnikov**
3. Izbere tiste z veljavnimi poverilnicami (ključ API ali žeton OAuth)
4. Določi model za vsako povezavo (`connection.defaultModel` ali prvi model ponudnika)
5. V pomnilniku ustvari **navidezno kombinacijo** (ni shranjena v zbirki podatkov)
6. Usmerja z uporabo profila uteži izbrane različice in strategije LKGP

**Ključne lastnosti:**

- ✅ **Vedno vklopljeno:** Brez stikala, ustvarjanja kombinacije ali potrebne konfiguracije
- ✅ **Dinamično:** Samodejno odraža trenutno povezane ponudnike
- ✅ **Vztrajnost seje:** LKGP zagotavlja, da ima zadnji uspešni ponudnik prednost
- ✅ **Podpora za več računov:** Vsaka povezava ponudnika postane ločen kandidat
- ✅ **Brez zapisov v zbirko podatkov:** Navidezna kombinacija obstaja samo za posamezno zahtevo, brez stroškov trajnega shranjevanja

### Nadzor kandidatov za posamezni ključ (#7819, ravni 1+2)

`GET /v1/auto-combo/{channel}/candidates` (`{channel}` = pripona za `auto/` ali
dobesedni `auto` za osnovni kanal) je končna točka **samo za branje**, ki izpiše
trenutni nabor kandidatov kanala `auto/*`, dopolnjen s sprotnimi podatki o dosegljivosti,
pri čemer ponovno uporabi obstoječe podatke o odpornosti (nikoli neposrednega `state`
odklopnika):

- odklopnik ponudnika — `getCircuitBreaker(provider).getStatus()` / `.canExecute()`
- čakalna doba povezave — `rateLimitedUntil` / `testStatus` v razrešeni vrstici
  `provider_connections`
- zaklep modela — `isModelLocked(provider, connectionId, model)`

Vsak kandidat vsebuje tudi zastavico `excluded` tega ključa API. Izključitve so shranjene
za vsak ključ API posebej (tabela `auto_candidate_overrides`, migracija `128`) — OmniRoute
je sistem z enim najemnikom brez tabele `users`, zato je `apiKeyId` najbližja dejanska
identiteta posameznega klicatelja — in se uveljavljajo na ključni točki nabora kandidatov v
`open-sse/services/autoCombo/virtualFactory.ts` prek čiste in z enotskimi preizkusi preverjene
funkcije `filterExcludedCandidates()` (`open-sse/services/autoCombo/candidateOverrides.ts`).
Filter je **odprt ob napaki**: nenastavljen apiKeyId/kanal ali napaka pri poizvedbi v zbirki
podatkov pustita nabor nefiltriran, zato upravljavec brez konfiguriranih preglasitev vidi
usmerjanje, ki je na ravni bajtov enako kot pred uvedbo te funkcionalnosti.

**Prestavljeno v nadaljnjo nalogo:** uteži za posamezne kandidate + izrecno razvrščanje (raven 3
— podatki se posredujejo obstoječim potem strategij z utežmi/prednostmi) in pripenjanje določene
strategije `combo.ts` posameznemu kanalu `auto/*` (raven 4). Glejte načrt #7819 glede odprtega
vprašanja, ali naj preglasitve ostanejo vezane na posamezni ključ API ali postanejo globalne
zaradi modela z enim najemnikom.

**V ozadju:**

```txt
Zahteva: { model: "auto/coding" }
   ↓
src/sse/handlers/chat.ts zazna predpono
   ↓
createVirtualAutoCombo('coding') → candidatePool iz aktivnih povezav
   ↓
handleComboChat (isti mehanizem kot pri trajno shranjenih kombinacijah)
   ↓
Samodejno ocenjevanje izbere najboljšega ponudnika/model za posamezno zahtevo
```

**Implementacijske datoteke:**

| Datoteka                                                  | Namen                                              |
| --------------------------------------------------------- | -------------------------------------------------- |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Razčlenjevalnik predpone (`parseAutoPrefix`)       |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Ustvari navidezne objekte `AutoComboConfig`        |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Preskusna točka za simuliranje registra ponudnikov |
| `src/sse/handlers/chat.ts`                                | Integracija: neposredna obravnava predpone auto    |
| `src/shared/constants/providers.ts`                       | Sistemski vnos `SYSTEM_PROVIDERS.auto`             |

## Imena kombinacij, ki se ujemajo z dejanskim ID-jem modela

Kombinacija, katere `name` je enak samostojnemu ID-ju modela (npr. kombinacija z imenom
`gpt-5.5`), je **nameren in podprt vzorec**, ne napaka: to je
mehanizem za nadomestnega ponudnika za posamezen ID modela, dokumentiran v
[#6940](https://github.com/diegosouzapw/OmniRoute/issues/6940). Ker se
razreševanje kombinacij preveri pred razreševanjem samostojnega ID-ja modela
(`getComboForModel()` v `src/sse/services/model.ts`), je zahteva za samostojni
ID `gpt-5.5` usmerjena prek ciljev kombinacije (npr.
`acme-responses/gpt-5.5`, `backup-responses/gpt-5.5`) namesto neposredno k
enemu ponudniku — s tem se ponovno uporabi prednost kombinacije pred prepisovanjem, uvedena za
[#3227/#3233](https://github.com/diegosouzapw/OmniRoute/issues/3227), delovanje pa je
regresijsko preizkušeno v `tests/unit/responses-combo-resolution-3227.test.ts` in
`tests/unit/combo-name-codex-responses-rewrite.test.ts`.

Ustvarjanje ali preimenovanje kombinacije v ime, ki prekriva dejanski ID modela,
**ni nikoli zavrnjeno** — zavrnitev bi prekinila ta dokumentirani potek dela. Namesto tega
(#8530) `POST /api/combos` in `PUT /api/combos/[id]` odgovoru dodata neblokirajoče
polje `warning`, kadar je (novo) ime v navzkrižju z dejanskim
ID-jem modela:

```json
{
  "warning": {
    "code": "COMBO_NAME_SHADOWS_MODEL",
    "modelId": "gpt-5.5",
    "providerId": "openai"
  }
}
```

Ob zagonu `scanComboModelNameCollisionsAtBoot()`
(`src/instrumentation-node.ts`) prav tako zabeleži enovrstično opozorilo `[STARTUP]`,
ki našteje vse obstoječe kombinacije, ki prekrivajo ID modela, tako da imajo upravljavci,
ki to povzročijo pomotoma (in ne namerno, kot je opisano v #6940), na voljo opozorilni signal.
Pomožna funkcija za zaznavanje je v `src/lib/combos/modelNameCollision.ts`.

## Klicanje kombinacije po meri iz odjemalca

Shranjene kombinacije (Nastavitve → Kombinacije) se uporabijo samo, kadar odjemalec v polju `model` pošlje **točno ime** kombinacije — mehko ali delno ujemanje imena kombinacije ni podprto, prav tako ni vključena predpona `auto/`. Vrstni red razreševanja (`getComboForModel()` v `src/sse/services/model.ts`):

1. natančno ujemanje z imenom kombinacije (`model: "my-combo"`),
2. predpona `combo/<name>` (`model: "combo/my-combo"`),
3. preslikave model→kombinacija z vzorci glob (`/api/model-combo-mappings`).

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"my-combo","messages":[{"role":"user","content":"Hello"}]}'
```

Dve pogosti pasti:

- **`auto` ne uporablja vaših kombinacij.** `auto`/`auto/*` ustvari lasten nabor kandidatov brez potrebe po konfiguraciji in shranjene kombinacije upošteva samo, če je kombinacija dobesedno poimenovana `auto` (ni priporočljivo). Za usmerjanje prek kombinacije pošljite njeno točno ime — ne `auto`.
- **`openrouter/auto` je dejanski plačljivi izdelek OpenRouter** (»Auto Best Available«), ne vzdevek OmniRoute. Je edini statični vnos modela v registru OpenRouter (`open-sse/config/providers/registry/openrouter/index.ts`) in se obračunava ločeno. Če ga želite izključiti iz naborov `auto`, uporabite Nastavitve → Usmerjanje → Skrij plačljive modele.

Za prvotno zmedo, ki jo ta dokumentacija pojasnjuje, glejte [#7992](https://github.com/diegosouzapw/OmniRoute/issues/7992) in [#7111](https://github.com/diegosouzapw/OmniRoute/issues/7111).

## Kako deluje (trajno shranjene samodejne kombinacije)

Mehanizem samodejnih kombinacij za vsako zahtevo dinamično izbere najboljšega ponudnika/model z uporabo **16-faktorske funkcije točkovanja** (opredeljene v `open-sse/services/autoCombo/scoring.ts` → `DEFAULT_WEIGHTS`). Vsota privzetih uteži je `1.0`; uteži po meri se ponovno normalizirajo s funkcijo `normalizeScoringWeights()`. Dva od šestnajstih dejavnikov — `cacheAffinity` in `resetWindowAffinity` — imata privzeto utež `0`; `reliability` ima v `DEFAULT_WEIGHTS` vrednost `0`, vendar `0.03` v splošnih paketih in `0.04` v paketu `reliability-first`, `quality` pa ima v paketih vrednost `0.02` (`0.03` v paketu `quality-first`): kljub temu se izračunajo za vsakega kandidata, `cacheAffinity` pa zunaj ocene nadzoruje odpravljanje podvojenih podatkov v predpomnilniku pozivov, zato dejavniki z ničelno privzeto utežjo privzeto preprosto ne glasujejo, paketi pa jih upoštevajo.

![16-faktorsko točkovanje samodejnih kombinacij](../diagrams/exported/auto-combo-scoring.svg)

> Vir: [diagrams/auto-combo-scoring.mmd](../diagrams/auto-combo-scoring.mmd) (znova ustvarite z `npm run docs:render-diagrams`). Ime datoteke je zgodovinsko; izvorna in upodobljena shema prikazujeta vseh 16 dejavnikov, navedenih v `DEFAULT_WEIGHTS`.

| Dejavnik              | Privzeta utež | Opis                                                                                                                                                                                                  |
| :-------------------- | :------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `quota`               | 0.1429        | Preostala kvota / razpoložljiva zmogljivost omejitve hitrosti [0..1]                                                                                                                                  |
| `health`              | 0.1605        | Ocena stanja iz odklopnika (CLOSED=1.0, HALF_OPEN=0.5, OPEN=0.0)                                                                                                                                      |
| `costInv`             | 0.1429        | Obratna **kombinirana** cena (60 % cena vhodnih + 40 % cena izhodnih žetonov, normalizirano) — nižja cena = višja ocena                                                                               |
| `latencyInv`          | 0.1143        | Obratna zakasnitev p95, normalizirana glede na nabor — hitreje = višja ocena                                                                                                                          |
| `taskFit`             | 0.0762        | Primernost za vrsto naloge (programiranje, pregled, načrtovanje, analiza, razhroščevanje, dokumentacija)                                                                                              |
| `stability`           | 0.0476        | Stabilnost na podlagi variance standardnega odklona zakasnitve — kandidat z bolj nihajočim odzivnim časom prejme nižjo oceno                                                                          |
| `tierPriority`        | 0.0476        | Prednost ravni računa — Ultra=1.0, Pro=0.67, Standard=0.33, Free=0.0                                                                                                                                  |
| `tierAffinity`        | 0.0476        | Ujemanje med ravnjo kandidata in ravnjo, priporočeno v manifestu                                                                                                                                      |
| `specificityMatch`    | 0.0476        | Ujemanje med specifičnostjo zahteve (namig manifesta) in ravnjo modela                                                                                                                                |
| `contextAffinity`     | 0.0476        | Ujemanje med zahtevano velikostjo kontekstnega okna zahteve in kontekstnim oknom modela                                                                                                               |
| `sessionAvailability` | 0.0476        | Razpoložljivost seje OAuth za kandidatno povezavo v tej seji (`getOAuthSessionAvailability()`; povezave brez OAuth prejmejo oceno 1.0)                                                                |
| `connectionDensity`   | 0.0476        | Porazdeli obremenitev med povezave istega ponudnika (preprečevanje koncentracije)                                                                                                                     |
| `cacheAffinity`       | 0.00          | Afiniteta zgoščevanja rendezvous do povezave, ki najverjetneje že vsebuje predpono predpomnilnika pozivov te zahteve (`open-sse/services/combo/promptCacheAffinity.ts`); privzeto onemogočeno (#8008) |
| `resetWindowAffinity` | 0.00          | Prednost povezavam z ugodnim časovnim oknom ponastavitve kvote (privzeto onemogočeno)                                                                                                                 |
| `quality`             | 0.03          | Signal kakovosti izhoda, ki temelji na povratnih informacijah sledilnika kakovosti dogodkov usmerjanja; kandidati brez opazovanj prejmejo nevtralno vrednost 0.5                                      |
| `reliability`         | 0.00          | Opaženi delež uspešnosti, `1 - failureRate`, iz 24-urne zgodovine uporabe z najmanj desetimi vzorci (sicer sprotne metrike); kandidati brez opazovanj imajo vrednost 1.0. Privzeto onemogočeno        |

**Vsota:** `0.1429 + 0.1605 + 0.1429 + 0.1143 + 0.0762 + (7 × 0.0476) + 0.00 + 0.00 + 0.03 + 0.00 = 1.0`, kot je navedeno v `DEFAULT_WEIGHTS`; uporabniško nastavljene uteži se pred točkovanjem s funkcijo `normalizeScoringWeights()` ponovno normalizirajo v porazdelitev.

## Paketi načinov

6 vnaprej določenih profilov uteži v `open-sse/services/autoCombo/modePacks.ts`. Vsak paket v celoti nadomesti privzete uteži, da izbiro usmeri k enemu cilju. Vsota uteži v vsakem paketu je že `1.0` (`0.9999`, kot je prikazano na štiri decimalna mesta), zato `normalizeScoringWeights()` nima ničesar bistvenega za popravljati, ko je paket aktiven — spodnje vrednosti so, z upoštevanjem zaokroževanja, tiste, ki jih ocenjevalnik dejansko uporabi.

| Dejavnik              | ship-fast  | cost-saver | quality-first | offline-friendly | reliability-first | chaos-mode |
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

Opombe:

- **Paketi vsebujejo `quality` in `reliability`** (`quality 0.02`, pri `quality-first 0.03`; `reliability 0.03`, pri `reliability-first 0.04`) ter v celoti nadomestijo preslikavo uteži (`weights = pack`, ne združevanje). `DEFAULT_WEIGHTS` vsebuje `quality 0.03 / reliability 0`; izbira `balanced`/`default` ohrani te privzete vrednosti, izbira paketa pa uporabi zgornje vrednosti paketa. V hladnem naboru (ko še ni opazovanj, zato sta vrednosti `quality 0.5` in `reliability 1`) ta dejavnika skupaj dodata `+0.04` pri splošnem paketu (`0.03 + 0.01`), `+0.045` pri `quality-first` in `+0.05` pri `reliability-first`.
- `tierAffinity`, `specificityMatch` in `resetWindowAffinity` so v vsakem paketu izrecno nastavljeni na `0`.
- Poudarek posameznega paketa na kratko:
  - **ship-fast** → latencyInv 0.3048 + health 0.2667 (zdrave povezave z nizko zakasnitvijo)
  - **cost-saver** → costInv 0.3324 (zmagajo najcenejši žetoni)
  - **quality-first** → taskFit 0.3524 + stability 0.1429 + quality 0.03, največ med vsemi paketi (najboljši model za nalogo, dosledno delovanje)
  - **offline-friendly** → quota 0.3324 + health 0.2667 (največ razpoložljive rezerve ne glede na hitrost/stroške)
  - **reliability-first** → health 0.3524 + stability 0.1905 + reliability 0.04, največ med vsemi paketi (najmanj presenečenj)
  - **chaos-mode** → health 0.4000 + taskFit 0.1905 (profil za vnašanje napak)

### Kontrolniki za posamezno zahtevo (glave) — #6023 / #6024 / #6025 / #3470

Kombinacijo `auto` je mogoče **za posamezno zahtevo** usmerjati s tremi glavami, ne da bi pri tem spremenili
shranjeno konfiguracijo kombinacije. Te veljajo samo za strategijo `auto` in samo za zahtevo,
ki jih vsebuje; kadar glava ni prisotna, se uporabijo shranjene vrednosti `modePack`/`budgetCap`/`budgetFallback`
kombinacije.

| Glava                         | Sprejema                                                                                                                                                                                               | Učinek                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| :---------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `X-OmniRoute-Mode`            | vzdevek prednastavitve (`fast`, `balanced`, `quality`, `cheap`, `reliable`, `offline`) ali neobdelano ime paketa (`ship-fast`, `cost-saver`, `quality-first`, `offline-friendly`, `reliability-first`) | Preglasi uteži točkovanja za to zahtevo. `balanced`/`default` vsilita privzete uteži (brez paketa). Neznane vrednosti so prezrte (konfiguracija se ohrani).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `X-OmniRoute-Budget`          | pozitivno število (največ USD na zahtevo)                                                                                                                                                              | Stroga omejitev stroškov: kandidati, katerih ocenjeni strošek jo presega, so pred izbiro izločeni. Kaj se zgodi, ko jo preseže **vsak** kandidat, določa spodnja glava `X-OmniRoute-Budget-Fallback`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `X-OmniRoute-Budget-Fallback` | `cheapest` (privzeto, vzdevki: `cheapest-viable`, `soft`) ali `strict` (vzdevka: `block`, `hard`)                                                                                                      | `cheapest`: uporabi globalno najcenejšega kandidata, čeprav ta še vedno presega omejitev (podedovano vedenje). `strict`: zavrne izbiro — zahteva se nemudoma konča z napako `HTTP 402`, namesto da bi tiho prekoračila proračun. Neznane vrednosti so prezrte.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `X-OmniRoute-Effort`          | `auto` (druge vrednosti so rezervirane)                                                                                                                                                                | Prilagodljiv proračun za razmišljanje: kadar zahteva ne vsebuje **nobenega** polja za razmišljanje v kakršni koli obliki (`reasoning_effort`, `reasoning`, `thinking`), prehod razreši `auto` v `low`/`medium`/`high` na podlagi determinističnih signalov strukture zahteve (dolžina zadnjega uporabnikovega sporočila, velikost konteksta do zadnjega uporabnikovega sporočila, predhodni rezultati orodij, globina zanke orodij). Signali so omejeni na trenutni obrat — vse za zadnjim uporabnikovim sporočilom se prezre — zato se vsaka zahteva v zanki orodij razreši na isto raven (določitev brez stanja za posamezen obrat, brez stanja seje in brez stopnjevanja sredi zanke, ki bi pokvarilo predpone predpomnilnika pozivov na nadrejeni strani). Izrecno odjemalčevo polje za razmišljanje ima vedno prednost. Velja za zahteve, katerih posredovanje nadrejenemu sistemu se razreši v obliko OpenAI Chat Completions (`targetFormat === FORMATS.OPENAI`) — `reasoning_effort` je polje oblike OpenAI, zato glava nima učinka pri zahtevi, usmerjeni v Claude ali Gemini (glejte `open-sse/handlers/chatCore/adaptiveEffortWiring.ts`). |

```bash
# Vsili najhitrejši profil, omeji to zahtevo na 0,05 USD in jo strogo blokiraj, namesto da bi prekoračil proračun
curl -sS http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "X-OmniRoute-Mode: fast" \
  -H "X-OmniRoute-Budget: 0.05" \
  -H "X-OmniRoute-Budget-Fallback: strict" \
  -d '{"model":"auto","messages":[{"role":"user","content":"hi"}]}'
```

Razreševanje je čista funkcija (`open-sse/services/autoCombo/requestControls.ts`);
razrešene vrednosti se posredujejo obstoječim vhodom pogona `config.modePack` / `config.budgetCap` /
`config.budgetFallback`. Shranjena nastavitev `config.budgetFallback` kombinacije ("strict" |
"cheapest") določa trajni pravilnik; glava ga preglasi za posamezno zahtevo.

## Vse strategije usmerjanja

Kombinacijski mehanizem OmniRoute podpira **19 strategij usmerjanja** (deklariranih v `src/shared/constants/routingStrategies.ts` → `ROUTING_STRATEGY_VALUES`). Sam mehanizem Auto Combo je na voljo pod strategijo `auto`; druge strategije so na voljo za shranjene kombinacije.

| Strategija          | Opis                                                                                                                                                                                                                            |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `priority`          | Urejen seznam s prvim ciljem in izrecno določeno prednostjo                                                                                                                                                                     |
| `weighted`          | Uteženo naključno izbiranje glede na utež posameznega cilja                                                                                                                                                                     |
| `round-robin`       | Kroženje med cilji po vrstnem redu                                                                                                                                                                                              |
| `context-relay`     | Predajanje konteksta med cilji (dolgi pogovori)                                                                                                                                                                                 |
| `fill-first`        | Zapolni kvoto vsakega cilja, preden nadaljuje z naslednjim                                                                                                                                                                      |
| `p2c`               | Naključno uravnoteženje obremenitve z izbiro med dvema možnostma                                                                                                                                                                |
| `random`            | Enakomerno naključno izbiranje                                                                                                                                                                                                  |
| `least-used`        | Izbere cilj z najmanjšo trenutno obremenitvijo                                                                                                                                                                                  |
| `cost-optimized`    | Zmanjša strošek na zahtevo glede na cene v katalogu                                                                                                                                                                             |
| `reset-aware` ⭐    | Določi prednost glede na čas ponastavitve kvote — krajša ponastavitvena okna so uvrščena višje                                                                                                                                  |
| `reset-window`      | Daje prednost ciljem, katerih kvotno okno bo ponastavljeno najprej                                                                                                                                                              |
| `headroom`          | Izbere cilj z največjo preostalo rezervo kvote                                                                                                                                                                                  |
| `strict-random`     | Naključno izbiranje brez odstranjevanja ponovitev                                                                                                                                                                               |
| `auto`              | Uporabi točkovanje Auto Combo (16 dejavnikov) — **priporočeno**                                                                                                                                                                 |
| `lkgp`              | Zadnja znana delujoča pot (uporablja zadnjega uspešnega ponudnika, nato pa uporabi nadomestna pravila)                                                                                                                          |
| `context-optimized` | Izbere cilj, ki se najbolje ujema s trenutno velikostjo konteksta                                                                                                                                                               |
| `cache-optimized`   | Prerazporedi cilje glede na ujemanje s predpomnilnikom poziva — povezava, za katero je najverjetneje, da že vsebuje predpomnjeno predpono te zahteve, se poskusi prva (`open-sse/services/combo/promptCacheAffinity.ts`, #8008) |
| `fusion` 🧬         | Zahtevo vzporedno razpošlje skupini modelov, nato pa ocenjevalni model njihove odgovore združi v en odgovor (glejte spodaj)                                                                                                     |
| `pipeline`          | Cilje izvede zaporedno, pri čemer izhod vsakega koraka posreduje kot vhod naslednjega koraka; vrne se samo končni odgovor (#6396)                                                                                               |

⭐ = Novo v v3.8.0 · 🧬 = Novo v v3.8.36

### Semantika strategije `weighted`

`weighted` je **sorazmerno naključno žrebanje za vsako zahtevo**
(`open-sse/services/combo/targetSorters.ts` → `selectWeightedTarget`) in ne izenačevalnik:

- Vsaka zahteva izžreba **en** korak z verjetnostjo `weight / totalWeight`; preostali koraki
  so za to zahtevo razvrščeni po padajoči uteži kot veriga nadomestnih možnosti.
- Korak, katerega utež je `0` (ali manjka), ni **nikoli izžreban**, dokler ima kateri koli drug
  korak utež > 0 — uporabi se lahko samo kot nadomestna možnost po neuspehu izžrebanega koraka. Izbira
  postane enakomerna samo, kadar so **vse** uteži enake 0.
- Koraki, katerih vsi cilji niso na voljo — odklopnik ponudnika je `OPEN`, povezava je
  v obdobju ohlajanja, model je zaklenjen — so odstranjeni iz žrebanja, preden se to začne
  (`open-sse/services/combo/targetResolution.ts`), zato lahko en sam delujoč korak začasno
  obravnava vsako zahtevo.
- `stickyWeightedLimit` (konfiguracija kombinacije, privzeto `1` = izklopljeno) ohrani izžrebani
  korak za toliko zaporednih uspešnih izvedb, preden se žrebanje ponovi.

Za strogo kroženje uporabite `round-robin`; enake uteži pri strategiji `weighted` zagotavljajo
statistično — ne strogo — uravnoteženost.

## Strategija Fusion

`fusion` je edina strategija, ki **ne** izbere enega samega cilja. Poziv razpošlje
**vsem modelom panela vzporedno**, nato pa nastavljiv **model razsodnika** iz vseh
odgovorov panela sintetizira en sam končni odgovor. Preneseno iz izvornega projekta
`decolua/9router` (OpenRouterjeva zasnova Fusion); implementacija je v `open-sse/services/fusion.ts`.

Kako deluje:

0. **Obhod pri uporabi orodij** — zahteva, ki vsebuje neprazno polje `tools`, pri čemer
   `tool_choice` ni izrecno nastavljen na `"none"`, v celoti preskoči panel: usmerjena je
   neposredno v en sam model (nastavljenega razsodnika ali `panel[0]`), pri čemer sta
   `tools`/`tool_choice` nespremenjeno posredovana naprej. Člani panela nimajo dostopa
   do orodij, navodilo za sintezo razsodniku pa odsvetuje ustvarjanje klicev orodij, zato
   odjemalci z agentskim delovanjem oziroma klicanjem orodij namesto sintetiziranega
   besedila prejmejo pravo odločitev o klicu orodja (#6771).
1. **Razpošiljanje** (samo za zahteve brez orodij) — poziv je hkrati poslan vsakemu
   modelu panela, pri čemer je vsiljen način brez pretočnega prenosa in so orodja
   odstranjena (razsodnik za sintezo potrebuje celotno besedilo).
2. **Zbiranje s kvorumom in dodatnim časom** — takoj ko prispe `minPanel` odgovorov,
   se za zamudnike zažene kratko obdobje dodatnega čakanja, nato pa se sinteza izvede
   z vsemi do tedaj zbranimi odgovori. Tako je vpliv najpočasnejšega modela na skupni
   čas omejen, zgornjo mejo pa določa stroga časovna omejitev.
3. **Sinteza razsodnika** — odgovori panela so anonimizirani (`Source 1`, `Source 2`, … —
   tako razsodnik presoja vsebino in ne znamke modela) ter posredovani razsodniku, ki
   analizira soglasje / protislovja / delno pokritost / edinstvene ugotovitve / slepe
   pege, nato pa napiše **en** avtoritativen odgovor. Klic razsodnika ohrani izvorno
   odjemalčevo zastavico `stream` in orodja, zato pretočni prenos in nadaljnja uporaba
   orodij še vedno delujeta.
4. **Postopno zmanjševanje zmogljivosti** — 0 odgovorov panela → `503`; natanko 1
   preživeli odgovor → ta odgovor se vrne neposredno (ni ničesar za združiti); panel
   z enim samim modelom odgovori neposredno.

Član panela je lahko tudi korak `combo-ref` (`{kind: "combo-ref", comboName: "..."}`), ki se sklicuje
na drugo kombinacijo — razreši se kot **en samostojen glas panela** (popolna rekurzivna usmeritev v
navedeno kombinacijo, ne razpošiljanje njenim lastnim ciljem), z enako zaščito pred preveliko globino
in cikli, kot jo že uporablja vsaka druga strategija, ki obdeluje `combo-ref` (#6764).

### Konfiguracija

Nastavi se v objektu `config` kombinacije (brez migracije sheme — ponovno uporabi obstoječo
tabelo `combos`):

| Polje                                    | Vrsta    | Privzeta vrednost | Namen                                                                                               |
| :--------------------------------------- | :------- | :---------------- | :-------------------------------------------------------------------------------------------------- |
| `config.judgeModel`                      | `string` | prvi model panela | Model, ki sintetizira končni odgovor                                                                |
| `config.fusionTuning.minPanel`           | `number` | `2`               | Število uspešnih odgovorov, potrebnih pred začetkom dodatnega čakanja (omejeno na `[2, panelSize]`) |
| `config.fusionTuning.stragglerGraceMs`   | `number` | `8000`            | Kako dolgo čakati na zamudnike, ko je dosežen kvorum                                                |
| `config.fusionTuning.panelHardTimeoutMs` | `number` | `90000`           | Absolutna zgornja meja, da en neodziven model ne more zaustaviti zahteve                            |

Privzete vrednosti so določene v `FUSION_DEFAULTS` (`open-sse/services/fusion.ts`).

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

Nato jo pokličite kot katero koli drugo kombinacijo: `{"model":"fusion-panel","messages":[...]}`.

## Navidezna tovarna Auto-Combo

Mehanizem Auto Combo ne zahteva vnaprej določenih kombinacij. Namesto tega `open-sse/services/autoCombo/virtualFactory.ts` sproti gradi kandidate:

1. Pridobi `getProviderConnections({ isActive: true })` (vse omogočene povezave)
2. Filtrira tiste z veljavnimi poverilnicami (ključ API ali žeton OAuth, ki še ni potekel, prek `hasUsableOAuthToken()`)
3. Podatke navzkrižno primerja z `getProviderRegistry()` glede razpoložljivosti modelov in cen
4. Za vsako trojico `(provider, model, connection)` zgradi `VirtualAutoComboCandidate`
5. Kot cilj usmerjanja izbere `connection.defaultModel` (ali prvi model v registru)
6. Vsakega kandidata oceni s 16-faktorsko funkcijo `scorePool()` in paketom uteži različice
7. Vrne nastali pomnilniški `AutoComboConfig` za `handleComboChat()` — nikoli se ne shrani v podatkovno zbirko

To pomeni, da **dodajanje novega ponudnika z omogočenim `auto/*` samodejno razširi nabor kandidatov** — ročno urejanje kombinacij ni potrebno. Navidezna kombinacija se znova zgradi ob vsaki zahtevi, zato so na novo dodane ali na novo delujoče povezave upoštevane takoj.

## Samozdravljenje

- **Začasna izključitev**: Ocena < 0.2 → izključitev za 5 min (progresivno podaljševanje, največ 30 min)
- **Upoštevanje odklopnika**: OPEN → samodejno izključen; HALF_OPEN → poskusne zahteve
- **Način incidenta**: >50 % OPEN → onemogoči raziskovanje, poveča stabilnost
- **Obnovitev po obdobju ohlajanja**: Po izključitvi je prva zahteva »poskusna« z zmanjšano časovno omejitvijo

## Raziskovanje z večrokim razbojnikom

5 % zahtev (nastavljivo) je zaradi raziskovanja usmerjenih k naključnim ponudnikom. V načinu incidenta je to onemogočeno.

## API

**Namenska končna točka `POST /api/combos/auto` ne obstaja** — Auto-Combo se uporablja na dva načina:

1. **Brez konfiguracije (priporočeno):** Pošljite poljubno zahtevo za dokončanje klepeta z `model: "auto"` ali `model: "auto/<variant>"`. Navidezna tovarna zgradi kombinacijo za vsako zahtevo posebej — brez shranjevanja in brez potrebnih klicev API.

2. **Shranjena kombinacija s `strategy: "auto"`:** Ustvarite običajno kombinacijo prek `POST /api/combos` ter nastavite `strategy: "auto"` skupaj s `config.auto.weights` / `config.auto.candidatePool`. Uporabljen je isti mehanizem ocenjevanja; kombinacija se shrani v `combos` in jo je mogoče znova uporabiti prek ID-ja.

Za odkrivanje `GET /api/combos/auto` izpiše vse različice z njihovim razrešenim naborom kandidatov ter `context_length` / `max_output_tokens` — NAJVEČJI vrednosti med okni nabora kandidatov. Odjemalci (npr. vtičnik opencode) morajo oglaševati te vrednosti namesto `0`: ničelni kontekst popolnoma onemogoči samodejno zgoščevanje v opencode, zato seje rastejo, dokler čiščenje zgodovine na prehodu ne uniči konteksta. Oglaševanje NAJVEČJE vrednosti je varno, ker predhodno filtriranje konteksta Auto-Combo prevelike zahteve usmeri h kandidatom z velikimi kontekstnimi okni.

```bash
# Uporaba brez konfiguracije (brez ustvarjanja kombinacije)
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"auto/coding","messages":[{"role":"user","content":"Hello"}]}'

# Shranjena samodejna kombinacija prek običajne končne točke za kombinacije
curl -X POST http://localhost:20128/api/combos \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","strategy":"auto","config":{"auto":{"candidatePool":["anthropic","google","openai"],"weights":{"quota":0.15,"health":0.3,"costInv":0.05,"latencyInv":0.35,"taskFit":0.1,"stability":0,"tierPriority":0.05}}}}'
```

### Strategije samodejnega usmerjevalnika

Shranjene kombinacije s `strategy: "auto"` lahko nastavijo `config.routerStrategy` (ali starejši
`config.auto.routerStrategy`) na eno od naslednjih vrednosti:

- `rules` — privzeto uteženo ocenjevanje
- `score` — izbere najvišjo konfigurirano uteženo oceno. Pri popolnoma enakih ocenah se ohrani konfigurirani
  vrstni red kandidatov; obstoječi `explorationRate` vzorči iz celotnega razvrščenega nabora.
- `cost` / `eco` — najcenejši delujoči ponudnik
- `latency` / `fast` — najnižja zakasnitev p95 s kaznijo za nezanesljivost
- `sla-aware` / `sla` — daje prednost kandidatom, ki izpolnjujejo SLO-je za zakasnitev p95, stopnjo napak in izbirne
  stroške
- `lkgp` — najprej zadnji znani delujoči ponudnik

### Podroben opis strategij usmerjevalnika

Mehanizem Auto-Combo ponuja 6 zamenljivih implementacij **RouterStrategy**, ki jih
lahko zamenjate prek `config.routerStrategy` (ali starejšega `config.auto.routerStrategy`).
Vsaka strategija iz nabora kandidatov izbere enega ponudnika glede na `RoutingContext`
(vrsta opravila, namigi za orodja/vid, ocena števila žetonov, izbirni pravilnik SLA, izbirni
zadnji znani delujoči ponudnik).

#### 1. `rules` (privzeto) — 16-faktorsko uteženo ocenjevanje

Ovije obstoječi mehanizem ocenjevanja. Izloči kandidate z odklopnikom v stanju `OPEN`,
nato za trenutno vrsto opravila in `getTaskFitness()` zažene `scorePool()` ter
izbere ponudnika z najvišjo oceno.

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

**Kdaj uporabiti**: Privzeta izbira. Uporabite, ko želite uravnotežen kompromis med vsemi signali.

**Vzdevek**: `rules` (brez vzdevka)

---

#### 2. `cost` / `eco` — najcenejši delujoči ponudnik

Nabor kandidatov razvrsti po `costPer1MTokens` (naraščajoče) in izbere najcenejšega.
Najprej izloči kandidate v stanju `OPEN`.

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

**Kdaj uporabiti**: Stroškovno občutljive delovne obremenitve, paketna obdelava ali opravila v ozadju.

**Vzdevki**: `cost`, `eco`

---

#### 3. `latency` / `fast` — najnižja zakasnitev p95 s kaznijo za nezanesljivost

Razvrsti po `p95LatencyMs + (errorRate * 1000)`. Kazen za stopnjo napak zagotovi,
da so nezanesljivi ponudniki uvrščeni nižje, tudi če je njihova nazivna zakasnitev majhna.

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

**Kdaj uporabiti**: Delovne obremenitve, občutljive na zakasnitev, kot so klepet v realnem času, samodejno dokončevanje ali
interaktivni pomočniki za programiranje.

**Vzdevki**: `latency`, `fast`

---

#### 4. `sla-aware` / `sla` — skladnost s SLO-ji za zakasnitev/napake/stroške

Vsakega kandidata oceni glede na to, kako dobro izpolnjuje konfigurirani pravilnik SLO:

| Faktor            | Utež | Formula                                               |
| ----------------- | ---- | ----------------------------------------------------- |
| Ocena zakasnitve  | 35%  | `threshold / max(value, ε)`                           |
| Ocena napak       | 35%  | `threshold / max(value, ε)`                           |
| Ocena zdravja     | 15%  | `1.0` (CLOSED) / `0.5` (HALF_OPEN) / `0.0` (OPEN)     |
| Ocena stroškov    | 10%  | `threshold / max(value, ε)` ali obratno normalizirano |
| Ocena stabilnosti | 5%   | obratno normaliziran standardni odklon zakasnitve     |

Ko je `hardConstraints: true`, se kandidati razvrstijo predvsem po **oceni kršitve**
(za koliko presegajo katerikoli SLO), nato pa po sestavljeni oceni. V nasprotnem primeru
se uporabi samo sestavljena ocena.

```ts
class SLAStrategyImpl implements RouterStrategy {
  readonly name = "sla-aware";
  readonly description =
    "Selects the provider most likely to satisfy latency, error-rate, and cost SLOs";

  select(pool, context) {
    // ... vsakega kandidata oceni glede na pravilnik: { targetP95Ms, maxErrorRate, maxCostPer1MTokens, hardConstraints }
  }
}
```

**Polja SLA** (nastavljena v konfiguraciji kombinacije):

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

**Kdaj uporabiti**: Produkcijske delovne obremenitve s strogimi omejitvami zakasnitve, stopnje napak ali stroškov.

**Vzdevki**: `sla-aware`, `sla`

---

#### 5. `lkgp` — najprej zadnji znani delujoči ponudnik

Najprej poskusi uporabiti **zadnjega znanega delujočega ponudnika** (če je nastavljen), nato pa uporabi
strategijo `rules`. Uporabno za vezanost seje — isti ponudnik obravnava
nadaljnje zahteve v pogovoru.

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

    // Preklop na strategijo rules
    return getStrategy("rules").select(pool, context);
  }
}
```

**Kdaj uporabiti**: Pogovori z več izmenjavami, pri katerih želite, da nadaljnje
zahteve obravnava isti ponudnik (npr. zaradi predpomnjenja, neprekinjenosti konteksta ali doslednosti cen).

**Vzdevek**: `lkgp` (brez vzdevka)

---

### Strategije usmerjevalnika po meri

Prek javnega API-ja lahko registrirate lastno implementacijo `RouterStrategy`:

```ts
import {
  registerStrategy,
  type RouterStrategy,
} from "@omniroute/open-sse/services/autoCombo/routerStrategy";

class MyCustomStrategy implements RouterStrategy {
  readonly name = "my-custom";
  readonly description = "My custom routing strategy";

  select(pool, context) {
    // Tukaj vnesite svojo logiko usmerjanja
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

Nato jo uporabite:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "my-custom"
  }
}
```

---

### Vodnik za izbiro strategije usmerjevalnika

| Primer uporabe                   | Strategija  | Razlog                                      |
| -------------------------------- | ----------- | ------------------------------------------- |
| Uravnotežena delovna obremenitev | `rules`     | Privzeto — upošteva vse dejavnike           |
| Zmanjšanje stroškov              | `cost`      | Vedno izbere najcenejšega                   |
| Zmanjšanje zakasnitve            | `latency`   | Izbere najhitrejšega zanesljivega ponudnika |
| Strogi SLO-ji                    | `sla-aware` | Filtrira po pragovih p95/napak/stroškov     |
| Klepet z več izmenjavami         | `lkgp`      | Vezanost seje                               |

Polja za strategijo, ki upošteva SLA:

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

## Primernost za naloge

Več kot 30 modelov je ocenjenih v 6 vrstah nalog (`coding`, `review`, `planning`, `analysis`, `debugging`, `documentation`). Podprti so vzorci z nadomestnimi znaki (npr. `*-coder` → visoka ocena za programiranje).

## Povzetek različic Auto

Če upoštevamo osnovni `auto` (privzeto) in 6 vrednosti `AutoVariant`, deklariranih v `autoPrefix.ts`, je na voljo **7 priklicljivih ID-jev modelov**:

`auto`, `auto/coding`, `auto/fast`, `auto/cheap`, `auto/offline`, `auto/smart`, `auto/lkgp`

(`AutoVariant` vsebuje 6 vrednosti; sedma možnost je »brez različice« — osnovni `auto` — ki jo `parseAutoPrefix()` obravnava kot `variant: undefined`.)

## Kako se ravni vključujejo v Auto-Combo

Funkcija ocenjevanja s 16 dejavniki (`open-sse/services/autoCombo/scoring.ts`) obravnava pripadnost ravni kot dva signala: `tierPriority` (0.0476) in `tierAffinity` (0.0476). Za celoten nabor `DEFAULT_WEIGHTS` glejte zgornjo kanonično [tabelo dejavnikov ocenjevanja](#how-it-works-persisted-auto-combos) — preglasitve za posamezne pakete (ship-fast/cost-saver/quality-first/offline-friendly) so navedene v tabeli »Profili uteži po paketih«.

Sama raven **ne** zagotavlja, da bo najprej izbrana 1. raven — če je zakasnitev 1. ravni velika ali je razmerje med stroški in kakovostjo neoptimalno, zmaga 2. raven. Če želite vsiliti vrstni red ravni, uporabite strategijo kombiniranja `priority` in ponudnike razporedite po ravneh.

Če želite izrazito dati prednost 1. ravni (naročnina), povečajte utež `tierPriority`:

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "tierPriority": 0.3, "costInv": 0.05 } } }
}
```

Za definicije ravni in razvrstitev ponudnikov glejte `docs/marketing/TIERS.md`.

## Testiranje in pokritost

### Deterministična matrika odločitev usmerjanja (`npm run test:combo:matrix`)

`tests/integration/combo-matrix/*.test.ts` preverja **odločitev** usmerjanja za vseh 19 javnih strategij od začetka do konca prek dejanskega cevovoda kombiniranja s simuliranim nadrejenim ponudnikom. Pokritost vključuje:

- Vseh 19 strategij `ROUTING_STRATEGY_VALUES` (ordered, weighted, cost, context, fusion, …).
- Celovito testiranje interne strategije `quota-share`: pravičnost DRR in znižanje prednosti ob nasičenosti prek dejanske testne točke `selectQuotaShareTarget` (`registerQuotaFetcher` / `setLKGP` / `__setHeadroomSaturationFetcherForTests`).
- Pokritost univerzalne predaje `context-relay` za vsako število ciljev.

Ta zbirka testov se izvaja v CI (opravilo `test:integration`) z možnostma `--test-concurrency=1` in `--test-force-exit`, zato je deterministična in ne zahteva dejanskih poverilnic.

### Pogojni preizkus delovanja v živo (NI v CI — dejanski ponudniki)

| Ukaz                                   | Kaj naredi                                                                                                |
| :------------------------------------- | :-------------------------------------------------------------------------------------------------------- |
| `npm run test:combo:live`              | Dejansko usmerjanje znotraj procesa z `RUN_COMBO_LIVE=1`; ustvari posnetek žive zbirke podatkov OmniRoute |
| `npm run test:combo:live:vps`          | Klici HTTP do živega strežnika OmniRoute (nastavite `COMBO_LIVE_BASE_URL`)                                |
| `npm run test:combo:live:vps:failover` | Enako, z namerno sproženimi scenariji preklopa ob odpovedi                                                |

Ti preizkusi delovanja preverjajo dejansko komunikacijsko pot (kombinacija → ponudnik → dokončanje). Namenoma so izključeni iz CI, ker zahtevajo dejanske poverilnice in dostop do VPS-ja.

---

## Datoteke

| Datoteka                                                  | Namen                                                                                                    |
| :-------------------------------------------------------- | :------------------------------------------------------------------------------------------------------- |
| `open-sse/services/autoCombo/scoring.ts`                  | Funkcija ocenjevanja s 16 dejavniki, `DEFAULT_WEIGHTS`, norma nabora                                     |
| `open-sse/services/autoCombo/taskFitness.ts`              | Iskanje primernosti modela za nalogo                                                                     |
| `open-sse/services/autoCombo/engine.ts`                   | Logika izbire, bandit, omejitev proračuna                                                                |
| `open-sse/services/autoCombo/selfHealing.ts`              | Izključevanje, preverjanja, način incidenta                                                              |
| `open-sse/services/autoCombo/modePacks.ts`                | 6 profilov uteži (ship-fast, cost-saver, quality-first, offline-friendly, reliability-first, chaos-mode) |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Razčlenjevalnik predpone `auto/` + 6 različic                                                            |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Iz aktivnih povezav zgradi `AutoComboConfig` v pomnilniku                                                |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Testna vstopna točka za ustvarjanje lažnega registra ponudnikov                                          |
| `src/shared/constants/routingStrategies.ts`               | `ROUTING_STRATEGY_VALUES` (19 strategij)                                                                 |
| `src/sse/handlers/chat.ts`                                | Integracija: zgodnja prekinitev za predpono auto                                                         |
