# AUTO-COMBO (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/AUTO-COMBO.md) · 🇸🇦 [ar](../../../ar/docs/routing/AUTO-COMBO.md) · 🇦🇿 [az](../../../az/docs/routing/AUTO-COMBO.md) · 🇧🇬 [bg](../../../bg/docs/routing/AUTO-COMBO.md) · 🇧🇩 [bn](../../../bn/docs/routing/AUTO-COMBO.md) · 🇨🇿 [cs](../../../cs/docs/routing/AUTO-COMBO.md) · 🇩🇰 [da](../../../da/docs/routing/AUTO-COMBO.md) · 🇩🇪 [de](../../../de/docs/routing/AUTO-COMBO.md) · 🇬🇷 [el](../../../el/docs/routing/AUTO-COMBO.md) · 🇪🇸 [es](../../../es/docs/routing/AUTO-COMBO.md) · 🇪🇪 [et](../../../et/docs/routing/AUTO-COMBO.md) · 🇮🇷 [fa](../../../fa/docs/routing/AUTO-COMBO.md) · 🇫🇮 [fi](../../../fi/docs/routing/AUTO-COMBO.md) · 🇫🇷 [fr](../../../fr/docs/routing/AUTO-COMBO.md) · 🇮🇪 [ga](../../../ga/docs/routing/AUTO-COMBO.md) · 🇮🇳 [gu](../../../gu/docs/routing/AUTO-COMBO.md) · 🇮🇱 [he](../../../he/docs/routing/AUTO-COMBO.md) · 🇮🇳 [hi](../../../hi/docs/routing/AUTO-COMBO.md) · 🇭🇷 [hr](../../../hr/docs/routing/AUTO-COMBO.md) · 🇭🇺 [hu](../../../hu/docs/routing/AUTO-COMBO.md) · 🇮🇩 [id](../../../id/docs/routing/AUTO-COMBO.md) · 🇮🇹 [it](../../../it/docs/routing/AUTO-COMBO.md) · 🇯🇵 [ja](../../../ja/docs/routing/AUTO-COMBO.md) · 🇰🇷 [ko](../../../ko/docs/routing/AUTO-COMBO.md) · 🇱🇻 [lv](../../../lv/docs/routing/AUTO-COMBO.md) · 🇮🇳 [mr](../../../mr/docs/routing/AUTO-COMBO.md) · 🇲🇾 [ms](../../../ms/docs/routing/AUTO-COMBO.md) · 🇲🇹 [mt](../../../mt/docs/routing/AUTO-COMBO.md) · 🇳🇱 [nl](../../../nl/docs/routing/AUTO-COMBO.md) · 🇳🇴 [no](../../../no/docs/routing/AUTO-COMBO.md) · 🇵🇭 [phi](../../../phi/docs/routing/AUTO-COMBO.md) · 🇵🇱 [pl](../../../pl/docs/routing/AUTO-COMBO.md) · 🇵🇹 [pt](../../../pt/docs/routing/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/AUTO-COMBO.md) · 🇷🇴 [ro](../../../ro/docs/routing/AUTO-COMBO.md) · 🇷🇺 [ru](../../../ru/docs/routing/AUTO-COMBO.md) · 🇸🇰 [sk](../../../sk/docs/routing/AUTO-COMBO.md) · 🇸🇮 [sl](../../../sl/docs/routing/AUTO-COMBO.md) · 🇷🇸 [sr](../../../sr/docs/routing/AUTO-COMBO.md) · 🇸🇪 [sv](../../../sv/docs/routing/AUTO-COMBO.md) · 🇰🇪 [sw](../../../sw/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ta](../../../ta/docs/routing/AUTO-COMBO.md) · 🇮🇳 [te](../../../te/docs/routing/AUTO-COMBO.md) · 🇹🇭 [th](../../../th/docs/routing/AUTO-COMBO.md) · 🇹🇷 [tr](../../../tr/docs/routing/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/AUTO-COMBO.md) · 🇵🇰 [ur](../../../ur/docs/routing/AUTO-COMBO.md) · 🇻🇳 [vi](../../../vi/docs/routing/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/AUTO-COMBO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/AUTO-COMBO.md)

---

---

title: "OmniRoute Auto-Combo Engine"
version: 3.8.40
lastUpdated: 2026-06-28
---

# OmniRoute Auto-Combo variklis

> **Naudotojams**: ieškote greitos pradžios? Paprastus paaiškinimus ir pavyzdžius rasite [Auto-Combo naudotojo vadove](../getting-started/AUTO-COMBO-GUIDE.md).

> Savarankiškai valdomos modelių grandinės su adaptyviu vertinimu ir nulinės konfigūracijos automatiniu maršruto parinkimu

## Nulinės konfigūracijos automatinis maršruto parinkimas (`auto/` priešdėlis)

> **NAUJA:** derinio kurti nereikia. Naudokite `auto/` priešdėlį tiesiogiai bet kuriame kliente.

### Trumpi pavyzdžiai

| Modelio ID     | Variantas | Veikimas                                                                                  |
| -------------- | --------- | ----------------------------------------------------------------------------------------- |
| `auto`         | default   | Visi prijungti teikėjai, LKGP strategija, subalansuoti svoriai                            |
| `auto/coding`  | coding    | Kokybei pirmenybę teikiantys svoriai, tinkami kodui generuoti                             |
| `auto/fast`    | fast      | Mažą delsą akcentuojanti svertinė atranka                                                 |
| `auto/cheap`   | cheap     | Pagal kainą optimizuotas maršruto parinkimas (pirmiausia mažiausia kaina)                 |
| `auto/offline` | offline   | Pirmenybė teikėjams, turintiems didžiausią prieinamą kvotą                                |
| `auto/smart`   | smart     | Pirmenybė kokybei + didesnis tyrinėjimo dažnis (10 %), kad būtų geriau atrandami modeliai |
| `auto/lkgp`    | lkgp      | Aiškiai nurodytas LKGP (tas pats kaip numatytasis `auto`)                                 |
| `auto/chaos`   | chaos     | Gedimų įterpimo svoriai atsparumui testuoti (chaoso inžinerija)                           |

### Kategorijos × lygio kompozicija (`auto/<category>:<tier>`)

OpenRouter stiliaus priesagos atskiria **kokio pobūdžio maršrutą** (kategoriją) nuo **to, kaip jį optimizuoti** (lygio), todėl jas galima laisvai derinti (#4235 B etapas, `open-sse/services/autoCombo/suffixComposition.ts`):

- **Kategorijos** (filtruoja kandidatų telkinį pagal galimybes): `coding` · `reasoning` · `vision` · `chat` · `multimodal`. `vision`/`multimodal` palieka vaizdus palaikančius modelius; `reasoning` palieka samprotavimo / mąstymo modelius.
- **Lygiai** (parenka vertinimo svorius / telkinio filtrą): `fast` (greitam pateikimui) · `cheap` (`floor` alternatyvusis pavadinimas, taupantis išlaidas) · `reliable` (grandinės pertraukiklio būklė + delsos stabilumas) · `free` / `pro` (filtruoja telkinį pagal modelio lygį naudodami `classifyTier` — nemokamas lygis arba „premium“).

| Pavyzdys               | Rezultatas                                                                                   |
| ---------------------- | -------------------------------------------------------------------------------------------- |
| `auto/coding:fast`     | kodavimo telkinys, mažos delsos svoriai                                                      |
| `auto/coding:cheap`    | kodavimo telkinys, optimizuotas pagal kainą (`auto/coding:floor` alternatyvusis pavadinimas) |
| `auto/reasoning:pro`   | tik samprotavimo / mąstymo modeliai, „premium“ lygis                                         |
| `auto/vision`          | vaizdus palaikantys modeliai (be lygio → subalansuoti svoriai)                               |
| `auto/multimodal:free` | daugiamodališkumą palaikantys modeliai, tik nemokamas lygis                                  |

Bet kuris galiojantis `auto/<category>[:<tier>]` variantas nustatomas pagal poreikį; atrinktas poaibis skelbiamas `/v1/models` ir valdymo skydelyje (`AUTO_SUFFIX_VARIANTS`, esančiame `open-sse/services/autoCombo/builtinCatalog.ts`). Filtravimas yra **fail-open** — jei apribojimo neatitinka nė vienas prijungtas modelis, naudojamas visas telkinys, todėl maršruto parinkimas niekada nenutrūksta. Pagrindinis vertintojas (`combo.ts`) nekeičiamas; kategorijos / lygio filtras taikomas funkcijoje `buildAutoCandidates`.

> **Tiesioginė modelių analizė:** kai įjungta žyma `ARENA_ELO_SYNC_ENABLED`, automatinio maršruto parinkimo tinkamumą padeda nustatyti tiesioginiai **Arena ELO** reitingai ir **models.dev** lygių duomenys (kitu atveju naudojamas statinis tinkamumo žemėlapis).

**Kaip naudoti:**

```bash
# Bet kuris IDE arba CLI įrankis, palaikantis OpenAI formatą
Bazinis URL: http://localhost:20128/v1
API raktas:  <jūsų-galinio-taško-raktas>

# Savo kode / konfigūracijoje nustatykite modelį:
model: "auto"                 # subalansuotas numatytasis variantas
model: "auto/coding"          # geriausiai tinka kodavimo užduotims
model: "auto/fast"            # greičiausias prieinamas
model: "auto/cheap"           # pigiausias vienam žetonui
```

**Kas vyksta:**

1. OmniRoute aptinka `auto/` priešdėlį faile `src/sse/handlers/chat.ts`
2. Duomenų bazėje užklausia visų **aktyvių teikėjų jungčių**
3. Atrenka turinčias galiojančius prisijungimo duomenis (API raktą arba OAuth prieigos raktą)
4. Nustato kiekvienos jungties modelį (`connection.defaultModel` arba pirmąjį teikėjo modelį)
5. Atmintyje sukuria **virtualų derinį** (jis nesaugomas DB)
6. Parenka maršrutą naudodamas pasirinkto varianto svorių profilį ir LKGP strategiją

**Pagrindinės savybės:**

- ✅ **Visada įjungta:** nereikia perjungiklio, kurti derinio ar atlikti konfigūracijos
- ✅ **Dinamiška:** automatiškai atspindi šiuo metu prijungtus teikėjus
- ✅ **Seanso pastovumas:** LKGP užtikrina, kad pirmenybė būtų teikiama paskutiniam sėkmingam teikėjui
- ✅ **Kelių paskyrų palaikymas:** kiekviena teikėjo jungtis tampa atskiru kandidatu
- ✅ **Jokių įrašų DB:** virtualus derinys egzistuoja tik užklausos metu, be jokių išliekamumo sąnaudų

### Kandidatų valdymas pagal raktą (#7819, 1+2 lygis)

`GET /v1/auto-combo/{channel}/candidates` (`{channel}` = priesaga po `auto/` arba
pažodinis `auto`, skirtas pagrindiniam kanalui) yra **tik skaitomas** galinis taškas,
pateikiantis dabartinį `auto/*` kanalo kandidatų telkinį kartu su tiesiogine
pasiekiamumo informacija, pakartotinai naudojant esamas atsparumo nuskaitymo
operacijas (niekada nenaudojama neapdorota pertraukiklio `state`):

- teikėjo grandinės pertraukiklis — `getCircuitBreaker(provider).getStatus()` / `.canExecute()`
- jungties laukimo laikotarpis — `rateLimitedUntil` / `testStatus` nustatytoje
  `provider_connections` eilutėje
- modelio blokavimas — `isModelLocked(provider, connectionId, model)`

Kiekvienas kandidatas taip pat turi šio API rakto `excluded` žymą. Išimtys saugomos
atskirai kiekvienam API raktui (`auto_candidate_overrides` lentelė, migracija `128`) —
OmniRoute yra vieno nuomininko sistema be `users` lentelės, todėl `apiKeyId` yra
artimiausia tikra kiekvieną iškvietėją identifikuojanti tapatybė — ir taikomos
kandidatų telkinio kontroliniame taške
`open-sse/services/autoCombo/virtualFactory.ts`, naudojant grynąją, vienetų testais
patikrintą funkciją `filterExcludedCandidates()`
(`open-sse/services/autoCombo/candidateOverrides.ts`). Filtras veikia
**fail-open** principu: nenustatytas apiKeyId / kanalas arba DB peržvalgos klaida
palieka telkinį nefiltruotą, todėl administratorius, nesukonfigūravęs jokių išimčių,
gauna baitų lygmeniu identišką maršruto parinkimą kaip iki šios funkcijos įdiegimo.

**Atidėta kitai užduočiai:** kiekvieno kandidato svoriai + aiškus eiliškumas (3 lygis
— perduodama esamiems svertinės / prioritetinės strategijos keliams) ir konkrečios
`combo.ts` strategijos prisegimas kiekvienam `auto/*` kanalui (4 lygis). Žr. #7819
planą dėl neatsakyto klausimo, ar, atsižvelgiant į vieno nuomininko modelį, pakeitimai
turėtų likti susieti su kiekvienu API raktu, ar tapti visuotiniai.

**Kas vyksta viduje:**

```txt
Užklausa: { model: "auto/coding" }
   ↓
src/sse/handlers/chat.ts aptinka priešdėlį
   ↓
createVirtualAutoCombo('coding') → candidatePool iš aktyvių jungčių
   ↓
handleComboChat (tas pats variklis kaip ir išsaugotiems deriniams)
   ↓
Automatinis vertinimas parenka geriausią teikėją / modelį kiekvienai užklausai
```

**Įgyvendinimo failai:**

| Failas                                                    | Paskirtis                                       |
| --------------------------------------------------------- | ----------------------------------------------- |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Priešdėlio analizatorius (`parseAutoPrefix`)    |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Kuria virtualius `AutoComboConfig` objektus     |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Testavimo sąsaja teikėjų registrui imituoti     |
| `src/sse/handlers/chat.ts`                                | Integracija: trumpasis `auto` priešdėlio kelias |
| `src/shared/constants/providers.ts`                       | `SYSTEM_PROVIDERS.auto` sistemos įrašas         |

## Kombinacijų pavadinimai, sutampantys su tikru modelio ID

Kombinacija, kurios `name` yra identiškas nepapildytam modelio ID (pvz., kombinacija, pavadinta
`gpt-5.5`), yra **sąmoningai palaikomas naudojimo būdas**, o ne klaida: tai
atsarginio paslaugų teikėjo parinkimo pagal modelio ID mechanizmas, aprašytas
[#6940](https://github.com/diegosouzapw/OmniRoute/issues/6940). Kadangi kombinacijų
atitiktis tikrinama prieš nepapildyto modelio ID atitiktį
(`getComboForModel()` faile `src/sse/services/model.ts`), užklausa dėl nepapildyto
ID `gpt-5.5` nukreipiama per kombinacijos paskirties vietas (pvz.,
`acme-responses/gpt-5.5`, `backup-responses/gpt-5.5`), o ne tiesiai pas
vieną paslaugų teikėją — taip pakartotinai panaudojama pirmumo taisyklė, pagal kurią
kombinacija tikrinama prieš perrašymą, sukurta
[#3227/#3233](https://github.com/diegosouzapw/OmniRoute/issues/3227), o regresijos
tikrinamos testais `tests/unit/responses-combo-resolution-3227.test.ts` ir
`tests/unit/combo-name-codex-responses-rewrite.test.ts`.

Kombinacijos kūrimas arba pervadinimas suteikiant jai pavadinimą, kuris užgožia tikrą modelio ID,
**niekada neatmetamas** — kitaip būtų pažeistas šis dokumentuotas darbo procesas. Vietoje to
(#8530), `POST /api/combos` ir `PUT /api/combos/[id]` prie atsako prideda neblokuojantį
`warning` lauką, kai (naujas) pavadinimas sutampa su tikru
modelio ID:

```json
{
  "warning": {
    "code": "COMBO_NAME_SHADOWS_MODEL",
    "modelId": "gpt-5.5",
    "providerId": "openai"
  }
}
```

Paleidimo metu `scanComboModelNameCollisionsAtBoot()`
(`src/instrumentation-node.ts`) taip pat į žurnalą įrašo vienos eilutės `[STARTUP]` įspėjimą,
kuriame išvardijamos visos esamos kombinacijos, užgožiančios modelio ID, kad operatoriai, kurie
su tuo susidūrė netyčia (o ne sąmoningai, kaip aprašyta #6940), gautų įspėjamąjį signalą.
Aptikimo pagalbinė funkcija yra faile `src/lib/combos/modelNameCollision.ts`.

## Pasirinktinės kombinacijos iškvietimas iš kliento

Išsaugotos kombinacijos (Nustatymai → Kombinacijos) naudojamos tik tada, kai klientas `model` lauke siunčia **tikslų kombinacijos pavadinimą** — nėra nei apytikslės ar dalinės kombinacijos pavadinimo atitikties, nei `auto/` priešdėlio. Atitikties nustatymo tvarka (`getComboForModel()` faile `src/sse/services/model.ts`):

1. tiksli kombinacijos pavadinimo atitiktis (`model: "my-combo"`),
2. `combo/<name>` priešdėlis (`model: "combo/my-combo"`),
3. modelio→kombinacijos glob šablonų susiejimai (`/api/model-combo-mappings`).

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"my-combo","messages":[{"role":"user","content":"Hello"}]}'
```

Dvi dažnos klaidos:

- **`auto` nenaudoja jūsų kombinacijų.** `auto`/`auto/*` sukuria savo be konfigūracijos veikiančių kandidatų telkinį ir atsižvelgia į išsaugotas kombinacijas tik tuo atveju, jei kombinacija tiesiogine prasme pavadinta `auto` (nerekomenduojama). Norėdami nukreipti per kombinaciją, siųskite tikslų jos pavadinimą, o ne `auto`.
- **`openrouter/auto` yra tikras mokamas OpenRouter produktas** („Automatiškai parenkamas geriausias prieinamas“), o ne OmniRoute alternatyvusis pavadinimas. Tai yra vienintelis statinis OpenRouter registro modelio įrašas (`open-sse/config/providers/registry/openrouter/index.ts`), už kurį atsiskaitoma atskirai. Norėdami jo neįtraukti į `auto` telkinius, naudokite Nustatymai → Maršruto parinkimas → Slėpti mokamus modelius.

Pirminė painiava, kurią paaiškina šis dokumentas, aprašyta [#7992](https://github.com/diegosouzapw/OmniRoute/issues/7992) ir [#7111](https://github.com/diegosouzapw/OmniRoute/issues/7111).

## Kaip tai veikia (išsaugomi automatiniai deriniai)

„Auto-Combo“ variklis dinamiškai parenka geriausią teikėją / modelį kiekvienai užklausai, naudodamas **16 veiksnių vertinimo funkciją** (apibrėžtą `open-sse/services/autoCombo/scoring.ts` → `DEFAULT_WEIGHTS`). Numatytųjų svorių suma yra `1.0`; pasirinktiniai svoriai iš naujo normalizuojami naudojant `normalizeScoringWeights()`. Trijų iš šešiolikos veiksnių — `cacheAffinity`, `resetWindowAffinity` ir `reliability` — numatytasis svoris yra `0`: jie vis tiek apskaičiuojami kiekvienam kandidatui, o `cacheAffinity` už vertinimo funkcijos ribų valdo raginimų podėlio dubliavimo šalinimą, todėl šie veiksniai yra deklaruoti, tačiau pagal numatytąsias nuostatas neturi įtakos rezultatui.

![„Auto-Combo“ 16 veiksnių vertinimas](../diagrams/exported/auto-combo-scoring.svg)

> Šaltinis: [diagrams/auto-combo-scoring.mmd](../diagrams/auto-combo-scoring.mmd) (sugeneruokite iš naujo naudodami `npm run docs:render-diagrams`). Failo pavadinimas yra istorinis; šaltinyje ir sugeneruotoje diagramoje pateikiami visi 16 veiksnių, deklaruotų `DEFAULT_WEIGHTS`.

| Veiksnys              | Numatytasis svoris | Aprašymas                                                                                                                                                                                                                                            |
| :-------------------- | :----------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `quota`               | 0.1429             | Likusios kvotos / užklausų dažnio apribojimo rezervas [0..1]                                                                                                                                                                                         |
| `health`              | 0.1605             | Būklės įvertis iš grandinės pertraukiklio (CLOSED=1.0, HALF_OPEN=0.5, OPEN=0.0)                                                                                                                                                                      |
| `costInv`             | 0.1429             | Atvirkštinė **mišri** kaina (60 % įvesties + 40 % išvesties žetonų kainos, normalizuota) — kuo pigiau, tuo aukštesnis įvertis                                                                                                                        |
| `latencyInv`          | 0.1143             | Atvirkštinė p95 delsa, normalizuota pagal kandidatų grupę — kuo greičiau, tuo aukštesnis įvertis                                                                                                                                                     |
| `taskFit`             | 0.0762             | Tinkamumas užduoties tipui (programavimui, peržiūrai, planavimui, analizei, derinimui, dokumentacijai)                                                                                                                                               |
| `stability`           | 0.0476             | Dispersija pagrįstas stabilumas pagal delsos standartinį nuokrypį — kandidatas, kurio atsako laikas smarkiai svyruoja, gauna žemesnį įvertį                                                                                                          |
| `tierPriority`        | 0.0476             | Paskyros lygio prioritetas — Ultra=1.0, Pro=0.67, Standard=0.33, Free=0.0                                                                                                                                                                            |
| `tierAffinity`        | 0.0476             | Kandidato lygio ir manifeste rekomenduojamo lygio atitiktis                                                                                                                                                                                          |
| `specificityMatch`    | 0.0476             | Užklausos specifiškumo (manifesto užuominos) ir modelio lygio atitiktis                                                                                                                                                                              |
| `contextAffinity`     | 0.0476             | Užklausai reikalingo konteksto lango ir modelio konteksto lango atitiktis                                                                                                                                                                            |
| `sessionAvailability` | 0.0476             | Kandidato ryšio OAuth seanso pasiekiamumas šiame seanse (`getOAuthSessionAvailability()`; ne OAuth ryšiai gauna 1.0 įvertį)                                                                                                                          |
| `connectionDensity`   | 0.0476             | Paskirsto apkrovą tarp to paties teikėjo ryšių (apsauga nuo koncentracijos)                                                                                                                                                                          |
| `cacheAffinity`       | 0.00               | Rendezvous maiša pagrįsta pirmenybė ryšiui, kuris greičiausiai jau turi šios užklausos raginimo podėlio prefiksą (`open-sse/services/combo/promptCacheAffinity.ts`); pagal numatytąsias nuostatas išjungta (#8008)                                   |
| `resetWindowAffinity` | 0.00               | Pirmenybė ryšiams, kurių kvotos atkūrimo langas yra palankus (pagal numatytąsias nuostatas išjungta)                                                                                                                                                 |
| `quality`             | 0.03               | Atsiliepimais pagrįstas išvesties kokybės signalas iš maršruto parinkimo įvykių kokybės sekimo priemonės; kandidatai be stebėjimų gauna neutralų 0.5 įvertį                                                                                          |
| `reliability`         | 0.00               | Stebėta sėkmingų užklausų dalis, `1 - failureRate`, apskaičiuota pagal 24h naudojimo istoriją, kai yra bent dešimt imčių (kitu atveju naudojama tikralaikė metrika); kandidatams be stebėjimų priskiriama 1.0. Pagal numatytąsias nuostatas išjungta |

**Suma:** `0.1429 + 0.1605 + 0.1429 + 0.1143 + 0.0762 + (7 × 0.0476) + 0.00 + 0.00 + 0.03 + 0.00 = 1.0`, kaip deklaruota `DEFAULT_WEIGHTS`; prieš vertinimą naudotojo sukonfigūruoti svoriai iš naujo normalizuojami į skirstinį naudojant `normalizeScoringWeights()`.

## Režimų paketai

6 iš anksto apibrėžti svorių profiliai faile `open-sse/services/autoCombo/modePacks.ts`. Kiekvienas paketas visiškai pakeičia numatytuosius svorius, kad atranka būtų nukreipta į vieną tikslą. Kiekvieno paketo suma jau yra `1.0` (`0.9999`, kai rodoma keturių skaitmenų po kablelio tikslumu), todėl, kai paketas aktyvus, `normalizeScoringWeights()` neturi ko reikšmingai koreguoti — toliau pateiktos reikšmės, atsižvelgiant į apvalinimą, yra tos, kurias taiko vertinimo funkcija.

| Veiksnys              | ship-fast  | cost-saver | quality-first | offline-friendly | reliability-first | chaos-mode |
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

Pastabos:

- **Nė vienas paketas nenustato `quality`, o paketas visiškai pakeičia svorių žemėlapį** (`weights = pack`, tai nėra suliejimas). `DEFAULT_WEIGHTS` rinkinyje `quality` reikšmė yra `0.03`, tačiau naudojant bet kurį režimų paketą ji normalizuojama į `0` — pasirinkus paketą, stebimos kokybės signalas visiškai nutildomas. Jei norite, kad kokybės grįžtamasis ryšys darytų įtaką maršruto parinkimui, neįrašykite `modePack` ir koreguokite svorius tiesiogiai. (Kiekviename pakete `cacheAffinity` taip pat nenustatytas, tačiau jo numatytoji reikšmė vis tiek yra `0`, todėl šiuo atveju niekas nesikeičia.)
- `tierAffinity`, `specificityMatch` ir `resetWindowAffinity` kiekviename pakete yra aiškiai nustatyti į `0`.
- Trumpa kiekvieno paketo akcentų apžvalga:
  - **ship-fast** → latencyInv 0.3048 + health 0.2667 (maža delsa, geros būklės ryšiai)
  - **cost-saver** → costInv 0.3524 (laimi pigiausi prieigos raktai)
  - **quality-first** → taskFit 0.3524 + stability 0.1429 (geriausiai užduočiai tinkantis ir nuoseklus modelis)
  - **offline-friendly** → quota 0.3524 + health 0.2667 (didžiausia atsarga, neatsižvelgiant į spartą ar kainą)
  - **reliability-first** → health 0.3524 + stability 0.1905 (mažiausiai netikėtumų)
  - **chaos-mode** → health 0.4000 + taskFit 0.1905 (gedimų įterpimo profilis)

### Kiekvienos užklausos valdikliai (antraštės) — #6023 / #6024 / #6025 / #3470

`auto` derinį galima valdyti **kiekvienai užklausai atskirai** naudojant tris antraštes, nekeičiant
išsaugotos derinio konfigūracijos. Jos taikomos tik `auto` strategijai ir tik tai užklausai,
kurioje jos pateikiamos; kai antraštės nėra, naudojamos išsaugotos derinio `modePack`/`budgetCap`/`budgetFallback`
reikšmės.

| Antraštė                      | Priima                                                                                                                                                                                                                                 | Poveikis                                                                                                                                                                                                                                                         |
| :---------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `X-OmniRoute-Mode`            | išankstinio nustatymo alternatyvųjį pavadinimą (`fast`, `balanced`, `quality`, `cheap`, `reliable`, `offline`) arba tiesioginį paketo pavadinimą (`ship-fast`, `cost-saver`, `quality-first`, `offline-friendly`, `reliability-first`) | Pakeičia šios užklausos vertinimo svorius. `balanced`/`default` priverstinai taiko numatytuosius svorius (be paketo). Nežinomos reikšmės ignoruojamos (konfigūracija išsaugoma).                                                                                 |
| `X-OmniRoute-Budget`          | teigiamą skaičių (didžiausia USD suma vienai užklausai)                                                                                                                                                                                | Griežta kainos riba: kandidatai, kurių numatoma kaina ją viršija, prieš atranką atmetami. Kas nutinka, kai ją viršija **kiekvienas** kandidatas, nustatoma toliau pateikta `X-OmniRoute-Budget-Fallback` antrašte.                                               |
| `X-OmniRoute-Budget-Fallback` | `cheapest` (numatytoji reikšmė, alternatyvos: `cheapest-viable`, `soft`) arba `strict` (alternatyvos: `block`, `hard`)                                                                                                                 | `cheapest`: grįžtama prie pigiausio kandidato iš visų, net jei jis vis tiek viršija ribą (ankstesnė elgsena). `strict`: atsisakoma atlikti atranką — užklausa iškart nutraukiama su `HTTP 402`, užuot tyliai viršijus biudžetą. Nežinomos reikšmės ignoruojamos. |

```bash
# Priverstinai taikyti sparčiausią profilį, apriboti šią užklausą iki $0.05 ir griežtai blokuoti, užuot viršijus biudžetą
curl -sS http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "X-OmniRoute-Mode: fast" \
  -H "X-OmniRoute-Budget: 0.05" \
  -H "X-OmniRoute-Budget-Fallback: strict" \
  -d '{"model":"auto","messages":[{"role":"user","content":"hi"}]}'
```

Reikšmių nustatymas yra grynoji funkcija (`open-sse/services/autoCombo/requestControls.ts`); nustatytos
reikšmės perduodamos esamoms modulio `config.modePack` / `config.budgetCap` /
`config.budgetFallback` įvestims. Išsaugota derinio `config.budgetFallback` reikšmė („strict“ |
„cheapest“) nustato nuolatinę politiką; antraštė ją pakeičia vienai užklausai.

## Visos maršruto parinkimo strategijos

„OmniRoute“ derinių variklis palaiko **19 maršruto parinkimo strategijų** (deklaruotų `src/shared/constants/routingStrategies.ts` → `ROUTING_STRATEGY_VALUES`). Pats „Auto Combo“ variklis pasiekiamas per strategiją `auto`, o kitos strategijos gali būti naudojamos išsaugotiems deriniams.

| Strategija          | Aprašymas                                                                                                                                                                                                 |
| :------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `priority`          | Pagal pirmąjį tikslą surikiuotas sąrašas su aiškiai nurodytu prioritetu                                                                                                                                   |
| `weighted`          | Svertinė atsitiktinė atranka pagal kiekvienam tikslui priskirtą svorį                                                                                                                                     |
| `round-robin`       | Cikliškas tikslų parinkimas iš eilės                                                                                                                                                                      |
| `context-relay`     | Konteksto perdavimas tarp tikslų (ilgi pokalbiai)                                                                                                                                                         |
| `fill-first`        | Prieš pereinant prie kito tikslo, išnaudojama kiekvieno tikslo kvota                                                                                                                                      |
| `p2c`               | Atsitiktinis apkrovos balansavimas pagal dviejų pasirinkimų metodą                                                                                                                                        |
| `random`            | Tolygioji atsitiktinė atranka                                                                                                                                                                             |
| `least-used`        | Parenkamas tikslas, kurio dabartinė apkrova mažiausia                                                                                                                                                     |
| `cost-optimized`    | Atsižvelgiant į katalogo kainodarą, sumažinama vienos užklausos kaina ($)                                                                                                                                 |
| `reset-aware` ⭐    | Pirmenybė teikiama pagal kvotos atkūrimo laiką — trumpesni atkūrimo intervalai vertinami aukščiau                                                                                                         |
| `reset-window`      | Pirmenybė teikiama tikslams, kurių kvotos intervalas bus atkurtas greičiausiai                                                                                                                            |
| `headroom`          | Parenkamas tikslas, turintis didžiausią likusios kvotos rezervą                                                                                                                                           |
| `strict-random`     | Atsitiktinė atranka nešalinant pasikartojimų                                                                                                                                                              |
| `auto`              | Naudojamas „Auto Combo“ vertinimas (16 veiksnių) — **rekomenduojama**                                                                                                                                     |
| `lkgp`              | Paskutinis žinomas veikiantis kelias (naudojamas paskutinis sėkmingai veikęs teikėjas, o jam nepavykus pereinama prie taisyklių)                                                                          |
| `context-optimized` | Parenkamas tikslas, geriausiai atitinkantis dabartinį konteksto dydį                                                                                                                                      |
| `cache-optimized`   | Tikslai perrikiuojami pagal užklausų podėlio atitiktį — pirmiausia bandomas ryšys, kurio podėlyje greičiausiai jau yra šios užklausos prefiksas (`open-sse/services/combo/promptCacheAffinity.ts`, #8008) |
| `fusion` 🧬         | Užklausa lygiagrečiai siunčiama modelių grupei, tada vertinimo modelis apibendrina vieną atsakymą (žr. toliau)                                                                                            |
| `pipeline`          | Tikslai vykdomi nuosekliai, kiekvieno žingsnio išvestį perduodant kaip kito žingsnio įvestį; grąžinamas tik galutinis atsakymas (#6396)                                                                   |

⭐ = Nauja v3.8.0 versijoje · 🧬 = Nauja v3.8.36 versijoje

### `weighted` semantika

`weighted` yra **proporcinė atsitiktinė atranka kiekvienai užklausai**
(`open-sse/services/combo/targetSorters.ts` → `selectWeightedTarget`), o ne išlyginimo priemonė:

- Kiekvienai užklausai parenkamas **vienas** žingsnis, kurio tikimybė yra `weight / totalWeight`; likę žingsniai
  išdėstomi mažėjančio svorio tvarka ir naudojami kaip tos užklausos atsarginių variantų grandinė.
- Žingsnis, kurio svoris yra `0` (arba nenurodytas), **niekada neparenkamas**, kol bent vieno kito žingsnio
  svoris yra > 0 — jis gali būti naudojamas tik kaip atsarginis variantas, jei parinktas žingsnis nepavyksta. Tik kai **visi**
  svoriai yra 0, atranka tampa tolygi.
- Žingsniai, kurių visi tikslai nepasiekiami — teikėjo grandinės pertraukiklis yra `OPEN`, ryšiui taikomas
  atvėsimo laikotarpis arba modelis užblokuotas — prieš atranką iš jos pašalinami
  (`open-sse/services/combo/targetResolution.ts`), todėl vienintelis veikiantis žingsnis gali laikinai
  laimėti kiekvieną užklausą.
- `stickyWeightedLimit` (derinio konfigūracija, numatytoji reikšmė `1` = išjungta) išlaiko parinktą žingsnį tiek
  sėkmingų užklausų iš eilės, prieš atliekant naują atranką.

Jei reikia griežtos rotacijos, naudokite `round-robin`; vienodi `weighted` svoriai užtikrina statistinį, o ne
griežtą balansą.

## Sintezės strategija

`fusion` yra vienintelė strategija, kuri **nepasirenka** vieno tikslinio modelio. Ji vienu metu
perduoda užklausą **kiekvienam komisijos modeliui lygiagrečiai**, o tada konfigūruojamas
**vertinimo modelis** iš visų komisijos atsakymų susintetina vieną galutinį atsakymą. Perkelta iš pirminio `decolua/9router`
(„OpenRouter“ Fusion architektūros); realizacija pateikta `open-sse/services/fusion.ts`.

Kaip tai veikia:

0. **Užklausų su įrankiais apėjimas** — užklausa, kurioje yra netuščias `tools` masyvas, o
   `tool_choice` nėra aiškiai nustatytas į `"none"`, visiškai praleidžia komisiją: ji nukreipiama tiesiai į
   vieną modelį (sukonfigūruotą vertinimo modelį arba `panel[0]`), nekeičiant perduodamų `tools`/`tool_choice`.
   Komisijos nariai neturi prieigos prie įrankių, o vertinimo modelio
   sintezės nurodymas neskatina generuoti įrankių iškvietimų, todėl agentinės / įrankius iškviečiančios kliento programos
   gauna tikrą sprendimą dėl įrankio iškvietimo, o ne susintetintą tekstą (#6771).
1. **Lygiagretus išskleidimas** (tik užklausoms be įrankių) — užklausa vienu metu siunčiama kiekvienam komisijos
   modeliui, priverstinai išjungiant srautinį perdavimą ir pašalinant įrankius (vertinimo modeliui sintezei
   reikia išsamių tekstinių atsakymų).
2. **Surinkimas su kvorumo atidėjimu** — kai tik gaunama `minPanel` atsakymų, paleidžiamas trumpas
   papildomo laukimo laikmatis vėluojantiems modeliams, o jam pasibaigus sintezė tęsiama su tuo, kas buvo surinkta.
   Taip apribojama lėčiausio modelio įtaka bendrai vykdymo trukmei, kurią taip pat riboja griežtas skirtasis laikas.
3. **Vertinimo modelio sintezė** — komisijos atsakymai anonimizuojami (`Source 1`, `Source 2`, … — kad
   vertinimo modelis vertintų turinį, o ne modelio prekės ženklą) ir perduodami vertinimo modeliui, kuris išanalizuoja
   sutapimus / prieštaravimus / dalinę aprėptį / unikalias įžvalgas / nepastebėtus aspektus, o tada
   parengia **vieną** autoritetingą atsakymą. Vertinimo modelio iškvietimas išlaiko pradinę kliento
   `stream` reikšmę ir įrankius, todėl srautinis perdavimas ir tolesnis įrankių naudojimas tebėra galimi.
4. **Sklandus funkcionalumo mažinimas** — 0 komisijos atsakymų → `503`; jei išlieka tik 1 atsakymas →
   jis grąžinamas tiesiogiai (nėra ko sintetinti); vieno modelio komisija atsako tiesiogiai.

Komisijos narys taip pat gali būti `combo-ref` veiksmas (`{kind: "combo-ref", comboName: "..."}`), nurodantis
kitą derinį — jis vykdomas kaip **vienas uždaras komisijos balsas** (atliekamas visas rekursinis iškvietimo perdavimas į
nurodytą derinį, o ne lygiagretus išskleidimas į to derinio tikslinius modelius), taikant tą pačią gylio ir ciklų apsaugą,
kurią jau naudoja visos kitos `combo-ref` naudojančios strategijos (#6764).

### Konfigūracija

Konfigūruojama derinio `config` duomenų bloke (schemos migracija nereikalinga — pakartotinai naudojama esama
`combos` lentelė):

| Laukas                                   | Tipas    | Numatytoji reikšmė         | Paskirtis                                                                                                           |
| :--------------------------------------- | :------- | :------------------------- | :------------------------------------------------------------------------------------------------------------------ |
| `config.judgeModel`                      | `string` | pirmasis komisijos modelis | Modelis, kuris sintetina galutinį atsakymą                                                                          |
| `config.fusionTuning.minPanel`           | `number` | `2`                        | Sėkmingų atsakymų skaičius, būtinas prieš paleidžiant papildomo laukimo laikmatį (apribojamas iki `[2, panelSize]`) |
| `config.fusionTuning.stragglerGraceMs`   | `number` | `8000`                     | Kiek laiko laukti vėluojančių modelių pasiekus kvorumą                                                              |
| `config.fusionTuning.panelHardTimeoutMs` | `number` | `90000`                    | Absoliuti riba, neleidžianti vienam užstrigusiam modeliui sustabdyti užklausos                                      |

Numatytosios reikšmės pateiktos `FUSION_DEFAULTS` (`open-sse/services/fusion.ts`).

### Pavyzdys

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

Tada iškvieskite jį kaip bet kurį kitą derinį: `{"model":"fusion-panel","messages":[...]}`.

## Virtuali „Auto-Combo“ gamykla

„Auto Combo“ varikliui nereikia iš anksto apibrėžtų kombinacijų. Vietoje to `open-sse/services/autoCombo/virtualFactory.ts` dinamiškai kuria kandidatus:

1. Gauna `getProviderConnections({ isActive: true })` (visus įjungtus ryšius)
2. Atrenka ryšius su galiojančiais prisijungimo duomenimis (API raktu arba nepasibaigusio galiojimo „OAuth“ prieigos raktu, naudojant `hasUsableOAuthToken()`)
3. Sutikrina juos su `getProviderRegistry()`, kad nustatytų modelių pasiekiamumą ir kainodarą
4. Kiekvienai sekai `(provider, model, connection)` sukuria `VirtualAutoComboCandidate`
5. Kaip siuntimo tikslą pasirenka `connection.defaultModel` (arba pirmąjį registro modelį)
6. Įvertina kiekvieną kandidatą naudodama 16 veiksnių `scorePool()` ir varianto svorių rinkinį
7. Grąžina gautą atmintyje laikomą `AutoComboConfig`, skirtą `handleComboChat()` — jis niekada neišsaugomas DB

Tai reiškia, kad **pridėjus naują teikėją su įjungtu `auto/*`, kandidatų telkinys automatiškai išplečiamas** — kombinacijos nereikia redaguoti rankiniu būdu. Virtuali kombinacija atkuriama kiekvienai užklausai, todėl naujai pridėti arba vėl tinkamai veikiantys ryšiai panaudojami iš karto.

## Savaiminis atkūrimas

- **Laikinas pašalinimas**: Įvertis < 0.2 → pašalinama 5 min. (progresyvus atidėjimas, daugiausia 30 min.)
- **Grandinės pertraukiklio būsenos įvertinimas**: OPEN → automatiškai pašalinama; HALF_OPEN → bandomosios užklausos
- **Incidento režimas**: >50 % OPEN → išjungiamas tyrinėjimas, maksimaliai padidinamas stabilumas
- **Atkūrimas po laukimo laikotarpio**: Pasibaigus pašalinimui, pirmoji užklausa yra „bandomoji“ ir jai taikomas trumpesnis skirtasis laikas

## Bandito tyrinėjimas

5 % užklausų (šį dydį galima konfigūruoti) tyrinėjimo tikslais nukreipiamos atsitiktiniams teikėjams. Incidento režimu ši funkcija išjungiama.

## API

**Specialaus `POST /api/combos/auto` galinio taško nėra** — „Auto-Combo“ naudojama dviem būdais:

1. **Be konfigūracijos (rekomenduojama):** Siųskite bet kurią pokalbio užbaigimo užklausą su `model: "auto"` arba `model: "auto/<variant>"`. Virtuali gamykla sukuria kombinaciją kiekvienai užklausai — nereikia nei išsaugojimo, nei API iškvietimų.

2. **Išsaugota kombinacija su `strategy: "auto"`:** Sukurkite įprastą kombinaciją per `POST /api/combos` ir nustatykite `strategy: "auto"` bei `config.auto.weights` / `config.auto.candidatePool`. Naudojamas tas pats vertinimo variklis; kombinacija išsaugoma `combos` ir gali būti pakartotinai naudojama pagal ID.

Paieškai `GET /api/combos/auto` pateikia kiekvieną variantą su jo galutiniu kandidatų telkiniu bei `context_length` / `max_output_tokens` — DIDŽIAUSIOMIS reikšmėmis iš visų kandidatų telkinio langų. Klientai (pvz., „opencode“ papildinys) turi skelbti šias reikšmes vietoje `0`: nulinis kontekstas visiškai išjungia „opencode“ automatinį glaudinimą, todėl seansai auga tol, kol tinklų sietuvo istorijos išvalymas sunaikina kontekstą. Skelbti DIDŽIAUSIĄ reikšmę yra saugu, nes „Auto-Combo“ išankstinis konteksto filtras per dideles užklausas nukreipia kandidatams su dideliais konteksto langais.

```bash
# Naudojimas be konfigūracijos (kombinacija nekuriama)
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"auto/coding","messages":[{"role":"user","content":"Hello"}]}'

# Išsaugota automatinė kombinacija per įprastą kombinacijų galinį tašką
curl -X POST http://localhost:20128/api/combos \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","strategy":"auto","config":{"auto":{"candidatePool":["anthropic","google","openai"],"weights":{"quota":0.15,"health":0.3,"costInv":0.05,"latencyInv":0.35,"taskFit":0.1,"stability":0,"tierPriority":0.05}}}}'
```

### Automatinio maršruto parinktuvo strategijos

Išsaugotose `strategy: "auto"` kombinacijose `config.routerStrategy` (arba senesnėje
`config.auto.routerStrategy`) galima nustatyti vieną iš šių reikšmių:

- `rules` — numatytasis svertinis vertinimas
- `score` — parenka didžiausią sukonfigūruotą svertinį įvertį. Esant visiškai vienodiems įverčiams, išlaikoma sukonfigūruota
  kandidatų tvarka; esamas `explorationRate` atrenka iš viso surikiuoto telkinio.
- `cost` / `eco` — pigiausias tinkamai veikiantis teikėjas
- `latency` / `fast` — mažiausia p95 delsa su patikimumo bauda
- `sla-aware` / `sla` — pirmenybė teikiama kandidatams, atitinkantiems p95 delsos, klaidų dažnio ir pasirinktinius
  kainos SLO
- `lkgp` — pirmiausia paskutinis patikimai veikęs teikėjas

### Išsamus maršruto parinktuvo strategijų aprašymas

„Auto-Combo“ variklis pateikia 6 pakeičiamas **RouterStrategy** realizacijas, kurias
galite keisti naudodami `config.routerStrategy` (arba senesnį `config.auto.routerStrategy`).
Kiekviena strategija iš kandidatų telkinio parenka vieną teikėją pagal `RoutingContext`
(užduoties tipą, įrankių / vaizdo užuominas, žetonų skaičiaus įvertį, pasirinktinę SLA politiką ir pasirinktinį
paskutinį patikimai veikusį teikėją).

#### 1. `rules` (numatytoji) — 16 veiksnių svertinis vertinimas

Apgaubia esamą vertinimo variklį. Atmeta `OPEN` grandinės pertraukiklio būsenos
kandidatus, tada paleidžia `scorePool()` su dabartiniu užduoties tipu ir `getTaskFitness()`,
pasirinkdama didžiausią įvertį gavusį teikėją.

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

**Kada naudoti**: Numatytoji parinktis. Naudokite, kai norite subalansuoto visų signalų kompromiso.

**Alternatyvus pavadinimas**: `rules` (alternatyvaus pavadinimo nėra)

---

#### 2. `cost` / `eco` — pigiausias tinkamai veikiantis teikėjas

Surikiuoja kandidatų telkinį pagal `costPer1MTokens` (didėjimo tvarka) ir pasirenka pigiausią.
Pirmiausia atmeta `OPEN` būsenos kandidatus.

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

**Kada naudoti**: Kainai jautrioms darbo apkrovoms, paketiniam apdorojimui arba foninėms užduotims.

**Alternatyvūs pavadinimai**: `cost`, `eco`

---

#### 3. `latency` / `fast` — mažiausia p95 delsa su patikimumo bauda

Rikiuoja pagal `p95LatencyMs + (errorRate * 1000)`. Klaidos dažnio bauda užtikrina,
kad nepatikimi teikėjai būtų reitinguojami žemiau, net jei jų nominalioji delsa yra maža.

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

**Kada naudoti**: Delsai jautrioms darbo apkrovoms, pvz., pokalbiams realiuoju laiku, automatiniam užbaigimui arba
interaktyviesiems programavimo asistentams.

**Alternatyvūs pavadinimai**: `latency`, `fast`

---

#### 4. `sla-aware` / `sla` — delsos / klaidų / kainos SLO atitiktis

Kiekvienas kandidatas vertinamas pagal tai, kaip gerai jis atitinka sukonfigūruotą SLO politiką:

| Veiksnys          | Svoris | Formulė                                                     |
| ----------------- | ------ | ----------------------------------------------------------- |
| Delsos įvertis    | 35 %   | `threshold / max(value, ε)`                                 |
| Klaidų įvertis    | 35 %   | `threshold / max(value, ε)`                                 |
| Būklės įvertis    | 15 %   | `1.0` (CLOSED) / `0.5` (HALF_OPEN) / `0.0` (OPEN)           |
| Kainos įvertis    | 10 %   | `threshold / max(value, ε)` arba atvirkštinis normalizuotas |
| Stabilumo įvertis | 5 %    | atvirkštinis normalizuotas delsos standartinis nuokrypis    |

Kai `hardConstraints: true`, kandidatai pirmiausia rikiuojami pagal **pažeidimo įvertį**
(kiek jie viršija kurį nors SLO), o tada pagal sudėtinį įvertį. Kitu atveju naudojamas tik
sudėtinis įvertis.

```ts
class SLAStrategyImpl implements RouterStrategy {
  readonly name = "sla-aware";
  readonly description =
    "Selects the provider most likely to satisfy latency, error-rate, and cost SLOs";

  select(pool, context) {
    // ... kiekvienas kandidatas vertinamas pagal politiką: { targetP95Ms, maxErrorRate, maxCostPer1MTokens, hardConstraints }
  }
}
```

**SLA laukai** (nustatomi kombinacijos konfigūracijoje):

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

**Kada naudoti**: Produkcinėms darbo apkrovoms, kurioms taikomi griežti delsos, klaidų dažnio ar kainos limitai.

**Alternatyvūs pavadinimai**: `sla-aware`, `sla`

---

#### 5. `lkgp` — pirmiausia paskutinis patikimai veikęs teikėjas

Pirmiausia išbando **paskutinį patikimai veikusį teikėją** (jei jis nustatytas), tada grįžta prie
`rules` strategijos. Tai naudinga seanso susiejimui — tas pats teikėjas apdoroja
tolesnes pokalbio užklausas.

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

    // Grįžtama prie rules strategijos
    return getStrategy("rules").select(pool, context);
  }
}
```

**Kada naudoti**: Kelių etapų pokalbiams, kai norite, kad tas pats teikėjas apdorotų
tolesnes užklausas (pvz., dėl kaupimo podėlyje, konteksto tęstinumo ar kainodaros nuoseklumo).

**Alternatyvus pavadinimas**: `lkgp` (alternatyvaus pavadinimo nėra)

---

### Pasirinktinės maršruto parinktuvo strategijos

Per viešąją API galite užregistruoti savo `RouterStrategy` realizaciją:

```ts
import {
  registerStrategy,
  type RouterStrategy,
} from "@omniroute/open-sse/services/autoCombo/routerStrategy";

class MyCustomStrategy implements RouterStrategy {
  readonly name = "my-custom";
  readonly description = "My custom routing strategy";

  select(pool, context) {
    // Čia pateikite savo maršruto parinkimo logiką
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

Tada ją naudokite:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "my-custom"
  }
}
```

---

### Maršruto parinktuvo strategijos pasirinkimo vadovas

| Naudojimo atvejis    | Strategija  | Priežastis                                       |
| -------------------- | ----------- | ------------------------------------------------ |
| Subalansuota apkrova | `rules`     | Numatytoji — atsižvelgia į visus veiksnius       |
| Kainos mažinimas     | `cost`      | Visada pasirenka pigiausią                       |
| Delsos mažinimas     | `latency`   | Pasirenka greičiausią patikimą teikėją           |
| Griežti SLO          | `sla-aware` | Filtruoja pagal p95 / klaidų / kainos slenksčius |
| Kelių etapų pokalbis | `lkgp`      | Seanso susiejimas                                |

SLA palaikantys laukai:

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

## Užduočių tinkamumas

30+ modelių įvertinta pagal 6 užduočių tipus (`coding`, `review`, `planning`, `analysis`, `debugging`, `documentation`). Palaikomi pakaitos simbolių šablonai (pvz., `*-coder` → aukštas programavimo įvertis).

## Automatinių variantų santrauka

Įskaitant bazinį `auto` (numatytąjį) ir 6 `AutoVariant` reikšmes, deklaruotas faile `autoPrefix.ts`, yra **7 iškviečiami modelių ID**:

`auto`, `auto/coding`, `auto/fast`, `auto/cheap`, `auto/offline`, `auto/smart`, `auto/lkgp`

(Pats `AutoVariant` išvardija 6 reikšmes; 7-oji parinktis yra „be varianto“ — bazinis `auto` — kurią `parseAutoPrefix()` apdoroja kaip `variant: undefined`.)

## Kaip pakopos dera su „Auto-Combo“

16 veiksnių vertinimo funkcija (`open-sse/services/autoCombo/scoring.ts`) narystę pakopoje
vertina kaip du signalus: `tierPriority` (0.0476) ir `tierAffinity` (0.0476). Visą
`DEFAULT_WEIGHTS` rinkinį žr. aukščiau pateiktoje kanoninėje [vertinimo veiksnių lentelėje](#how-it-works-persisted-auto-combos) —
atskirų rinkinių perrašymai (ship-fast/cost-saver/quality-first/
offline-friendly) pateikti lentelėje „Kiekvieno rinkinio svorių profiliai“.

Vien pakopa **neužtikrina**, kad pirmiausia bus pasirinkta 1 pakopa — jei 1 pakopos delsa yra didelė arba
kainos ir kokybės santykis nėra optimalus, pasirenkama 2 pakopa. Norėdami priverstinai taikyti pakopų eiliškumą, naudokite derinio
strategiją `priority` ir išdėstykite teikėjus pagal pakopas.

Norėdami aiškiai teikti pirmenybę 1 pakopai (prenumeratai), padidinkite `tierPriority` svorį:

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "tierPriority": 0.3, "costInv": 0.05 } } }
}
```

Pakopų apibrėžimus ir teikėjų klasifikaciją žr. `docs/marketing/TIERS.md`.

## Testavimas ir aprėptis

### Deterministinė maršruto parinkimo sprendimų matrica (`npm run test:combo:matrix`)

`tests/integration/combo-matrix/*.test.ts` patvirtina visų 19 viešųjų strategijų maršruto parinkimo **sprendimą**
nuo pradžios iki galo per tikrąjį derinių konvejerį, naudojant imituojamą išorinę paslaugą.
Aprėpiama:

- Visos 19 `ROUTING_STRATEGY_VALUES` strategijų (ordered, weighted, cost, context, fusion, …).
- Visapusis `quota-share` (vidinės strategijos) testavimas: DRR teisingumas + apkrovos prisotinimo prioriteto mažinimas per
  tikrąją `selectQuotaShareTarget` sąsają (`registerQuotaFetcher` / `setLKGP` /
  `__setHeadroomSaturationFetcherForTests`).
- Universaliojo perdavimo `context-relay` aprėptis su kiekvienu galimu paskirties vietų skaičiumi.

Šis testų rinkinys vykdomas CI (`test:integration` užduotyje) su `--test-concurrency=1` ir
`--test-force-exit`, todėl jis yra deterministinis ir jam nereikia tikrų prisijungimo duomenų.

### Sąlyginiai tiesioginiai baziniai testai (NE CI aplinkoje — tikri teikėjai)

| Komanda                                | Ką ji atlieka                                                                                                                |
| :------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| `npm run test:combo:live`              | Tikras maršruto parinkimas tame pačiame procese su `RUN_COMBO_LIVE=1`; sukuriama veikiančios „OmniRoute“ DB momentinė kopija |
| `npm run test:combo:live:vps`          | HTTP iškvietos į veikiantį „OmniRoute“ serverį (nustatykite `COMBO_LIVE_BASE_URL`)                                           |
| `npm run test:combo:live:vps:failover` | Tas pats, tačiau su sąmoningai sukeltais perjungimo sutrikimo atveju scenarijais                                             |

Šie baziniai testai tikrina tikrąjį duomenų perdavimo kelią (derinys → teikėjas → užbaigimas). Jie
sąmoningai neįtraukti į CI, nes jiems reikia tikrų prisijungimo duomenų ir prieigos prie VPS.

---

## Failai

| Failas                                                    | Paskirtis                                                                                                              |
| :-------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------- |
| `open-sse/services/autoCombo/scoring.ts`                  | 16 veiksnių vertinimo funkcija, `DEFAULT_WEIGHTS`, telkinio normalizavimas                                             |
| `open-sse/services/autoCombo/taskFitness.ts`              | Modelio × užduoties tinkamumo paieška                                                                                  |
| `open-sse/services/autoCombo/engine.ts`                   | Atrankos logika, banditas, biudžeto riba                                                                               |
| `open-sse/services/autoCombo/selfHealing.ts`              | Pašalinimas, patikros, incidento režimas                                                                               |
| `open-sse/services/autoCombo/modePacks.ts`                | 6 svorių profiliai („ship-fast“, „cost-saver“, „quality-first“, „offline-friendly“, „reliability-first“, „chaos-mode“) |
| `open-sse/services/autoCombo/autoPrefix.ts`               | `auto/` prefikso analizatorius + 6 variantai                                                                           |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Sukuria atmintyje laikomą `AutoComboConfig` iš aktyvių ryšių                                                           |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Testavimo sąsaja teikėjų registrui imituoti                                                                            |
| `src/shared/constants/routingStrategies.ts`               | `ROUTING_STRATEGY_VALUES` (19 strategijų)                                                                              |
| `src/sse/handlers/chat.ts`                                | Integracija: ankstyvasis išėjimas pagal „auto“ prefiksą                                                                |
