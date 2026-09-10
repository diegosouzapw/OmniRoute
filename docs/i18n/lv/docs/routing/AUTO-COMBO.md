# AUTO-COMBO (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/AUTO-COMBO.md) · 🇸🇦 [ar](../../../ar/docs/routing/AUTO-COMBO.md) · 🇦🇿 [az](../../../az/docs/routing/AUTO-COMBO.md) · 🇧🇬 [bg](../../../bg/docs/routing/AUTO-COMBO.md) · 🇧🇩 [bn](../../../bn/docs/routing/AUTO-COMBO.md) · 🇨🇿 [cs](../../../cs/docs/routing/AUTO-COMBO.md) · 🇩🇰 [da](../../../da/docs/routing/AUTO-COMBO.md) · 🇩🇪 [de](../../../de/docs/routing/AUTO-COMBO.md) · 🇬🇷 [el](../../../el/docs/routing/AUTO-COMBO.md) · 🇪🇸 [es](../../../es/docs/routing/AUTO-COMBO.md) · 🇪🇪 [et](../../../et/docs/routing/AUTO-COMBO.md) · 🇮🇷 [fa](../../../fa/docs/routing/AUTO-COMBO.md) · 🇫🇮 [fi](../../../fi/docs/routing/AUTO-COMBO.md) · 🇫🇷 [fr](../../../fr/docs/routing/AUTO-COMBO.md) · 🇮🇪 [ga](../../../ga/docs/routing/AUTO-COMBO.md) · 🇮🇳 [gu](../../../gu/docs/routing/AUTO-COMBO.md) · 🇮🇱 [he](../../../he/docs/routing/AUTO-COMBO.md) · 🇮🇳 [hi](../../../hi/docs/routing/AUTO-COMBO.md) · 🇭🇷 [hr](../../../hr/docs/routing/AUTO-COMBO.md) · 🇭🇺 [hu](../../../hu/docs/routing/AUTO-COMBO.md) · 🇮🇩 [id](../../../id/docs/routing/AUTO-COMBO.md) · 🇮🇹 [it](../../../it/docs/routing/AUTO-COMBO.md) · 🇯🇵 [ja](../../../ja/docs/routing/AUTO-COMBO.md) · 🇰🇷 [ko](../../../ko/docs/routing/AUTO-COMBO.md) · 🇱🇹 [lt](../../../lt/docs/routing/AUTO-COMBO.md) · 🇮🇳 [mr](../../../mr/docs/routing/AUTO-COMBO.md) · 🇲🇾 [ms](../../../ms/docs/routing/AUTO-COMBO.md) · 🇲🇹 [mt](../../../mt/docs/routing/AUTO-COMBO.md) · 🇳🇱 [nl](../../../nl/docs/routing/AUTO-COMBO.md) · 🇳🇴 [no](../../../no/docs/routing/AUTO-COMBO.md) · 🇵🇭 [phi](../../../phi/docs/routing/AUTO-COMBO.md) · 🇵🇱 [pl](../../../pl/docs/routing/AUTO-COMBO.md) · 🇵🇹 [pt](../../../pt/docs/routing/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/AUTO-COMBO.md) · 🇷🇴 [ro](../../../ro/docs/routing/AUTO-COMBO.md) · 🇷🇺 [ru](../../../ru/docs/routing/AUTO-COMBO.md) · 🇸🇰 [sk](../../../sk/docs/routing/AUTO-COMBO.md) · 🇸🇮 [sl](../../../sl/docs/routing/AUTO-COMBO.md) · 🇷🇸 [sr](../../../sr/docs/routing/AUTO-COMBO.md) · 🇸🇪 [sv](../../../sv/docs/routing/AUTO-COMBO.md) · 🇰🇪 [sw](../../../sw/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ta](../../../ta/docs/routing/AUTO-COMBO.md) · 🇮🇳 [te](../../../te/docs/routing/AUTO-COMBO.md) · 🇹🇭 [th](../../../th/docs/routing/AUTO-COMBO.md) · 🇹🇷 [tr](../../../tr/docs/routing/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/AUTO-COMBO.md) · 🇵🇰 [ur](../../../ur/docs/routing/AUTO-COMBO.md) · 🇻🇳 [vi](../../../vi/docs/routing/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/AUTO-COMBO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/AUTO-COMBO.md)

---

---

title: "OmniRoute Auto-Combo dzinējs"
version: 3.8.40
lastUpdated: 2026-06-28
---

# OmniRoute Auto-Combo dzinējs

> **Lietotājiem**: Meklējat ātru sākumu? Skatiet [Auto-Combo lietotāja rokasgrāmatu](../getting-started/AUTO-COMBO-GUIDE.md) vienkāršiem paskaidrojumiem un piemēriem.

> Pašpārvaldītas modeļu ķēdes ar adaptīvu vērtējumu + nulles konfigurācijas auto-maršrutēšanu

## Nulles Konfigurācijas Auto-Maršrutēšana (`auto/` prefikss)

> **JAUNUMS:** Nav nepieciešama kombinācijas izveidošana. Izmantojiet `auto/` prefiksu jebkurā klientā.

### Ātrie Piemēri

| Modeļa ID      | Variants    | Uzvedība                                                                         |
| -------------- | ----------- | -------------------------------------------------------------------------------- |
| `auto`         | noklusējums | Visi pieslēgtie nodrošinātāji, LKGP stratēģija, līdzsvarots svars                |
| `auto/coding`  | coding      | Kvalitāte pirmajā vietā, piemērots koda ģenerēšanai                              |
| `auto/fast`    | fast        | Zemas latentuma svarota izvēle                                                   |
| `auto/cheap`   | cheap       | Izmaksu optimizēta maršrutēšana (zemākās izmaksas pirmajā vietā)                 |
| `auto/offline` | offline     | Dod priekšroku nodrošinātājiem ar augstāko kvotu pieejamību                      |
| `auto/smart`   | smart       | Kvalitāte pirmajā vietā + augstāka izpētes likme (10%) labākai modeļu atklāšanai |
| `auto/lkgp`    | lkgp        | Eksplicīts LKGP (tāds pats kā noklusējuma `auto`)                                |
| `auto/chaos`   | chaos       | Svaru traucējumu injekcija noturības testēšanai (chaos inženierija)              |

### Kategorija × Līmeņa Kompozīcija (`auto/<kategorija>:<līmenis>`)

OpenRouter stila sufiksi atdala **kāda veida maršrutu** (kategoriju) no **kā to optimizēt** (līmeni), tāpēc varat tos brīvi kombinēt (#4235 Phase B, `open-sse/services/autoCombo/suffixComposition.ts`):

- **Kategorijas** (filtrē kandidātu pūlu pēc spējām): `coding` · `reasoning` · `vision` · `chat` · `multimodal`. `vision`/`multimodal` saglabā redzes spējīgos modeļus; `reasoning` saglabā domāšanas/racionālās domāšanas modeļus.
- **Līmeņi** (izvēlas vērtēšanas svarus / pūla filtru): `fast` (ātra piegāde) · `cheap` (aliases `floor`, izmaksu taupītājs) · `reliable` (slēdža veselība + latentuma stabilitāte) · `free` / `pro` (filtrē pūlu pēc modeļa līmeņa, izmantojot `classifyTier` — bezmaksas vs. premium).

| Piemērs                | Atrisina līdz                                                |
| ---------------------- | ------------------------------------------------------------ |
| `auto/coding:fast`     | coding pūls, zemas latentuma svari                           |
| `auto/coding:cheap`    | coding pūls, izmaksu optimizēts (aliass `auto/coding:floor`) |
| `auto/reasoning:pro`   | tikai domāšanas/racionālās domāšanas modeļi, premium līmenis |
| `auto/vision`          | redzes spējīgi modeļi (nav līmeņa → līdzsvaroti svari)       |
| `auto/multimodal:free` | multimodāli spējīgi modeļi, tikai bezmaksas līmenis          |

Jebkurš derīgs `auto/<kategorija>[:<līmenis>]` tiek atrisināts pēc pieprasījuma; izvēlēta apakškopa tiek reklamēta `/v1/models` un informācijas panelī (`AUTO_SUFFIX_VARIANTS` failā `open-sse/services/autoCombo/builtinCatalog.ts`). Filtrēšana ir **neatkarīga no kļūdām** — ja ierobežojums neatbilst nevienam pieslēgtajam modelim, tiek izmantots pilns pūls, lai maršrutēšana nekad nesalūzt. Galvenais vērtētājs (`combo.ts`) nav mainīts; kategorijas/līmeņa filtrs tiek piemērots `buildAutoCandidates`.

> **Dzīvā modeļa informācija:** auto-maršrutēšanas piemērotību informē dzīvā **Arena ELO** reitinga + **models.dev** līmeņa dati, kad `ARENA_ELO_SYNC_ENABLED` karogs ir ieslēgts (citos gadījumos atgriežas pie statiskās piemērotības kartes).

**Kā lietot:**

```bash
# Jebkura IDE vai CLI rīks, kas atbalsta OpenAI formātu
Base URL: http://localhost:20128/v1
API Key:  <your-endpoint-key>

# Savā kodā/konfigurācijā iestatiet modeli uz:
model: "auto"                 # līdzsvarots noklusējums
model: "auto/coding"          # labākais kodēšanas uzdevumiem
model: "auto/fast"            # ātrākais pieejamais
model: "auto/cheap"           # lētākais par tokenu
```

**Kas notiek:**

1. OmniRoute atklāj `auto/` prefiksu failā `src/sse/handlers/chat.ts`
2. Izjautā visas **aktīvās nodrošinātāju savienojumus** no datubāzes
3. Filtrē tos ar derīgiem akreditācijas datiem (API atslēga vai OAuth tokens)
4. Nosaka modeli katram savienojumam (`connection.defaultModel` vai nodrošinātāja pirmais modelis)
5. Atmiņā izveido **virtuālu kombināciju** (netiek saglabāta datubāzē)
6. Maršrutē, izmantojot izvēlētā varianta svaru profilu + LKGP stratēģiju

**Galvenās īpašības:**

- ✅ **Vienmēr ieslēgts:** Nav slēdža, nav kombinācijas izveidošanas, nav nepieciešama konfigurācija
- ✅ **Dinamisks:** Automātiski atspoguļo pašreizējos pieslēgtos nodrošinātājus
- ✅ **Sesijas pielipšana:** LKGP nodrošina, ka pēdējam veiksmīgajam nodrošinātājam tiek dota priekšroka
- ✅ **Vairāku kontu apzināšanās:** Katrs nodrošinātāja savienojums kļūst par atsevišķu kandidātu
- ✅ **Nav rakstīšanas datubāzē:** Virtuālā kombinācija pastāv tikai pieprasījumam, nulles saglabāšanas izmaksas

### Atslēgas kandidātu kontrole (#7819, Level 1+2)

`GET /v1/auto-combo/{channel}/candidates` (`{channel}` = sufikss pēc `auto/`, vai
burtiskais `auto` bāzes kanālam) ir **tikai lasāms** galapunkts, kas uzskaita
`auto/*` kanāla pašreizējo kandidātu pūlu, dekorētu ar dzīvo sasniedzamību, atkārtoti
izmantojot esošos noturības nolasījumus (nekad neapstrādātu slēdža `stāvokli`):

- nodrošinātāja slēdzis — `getCircuitBreaker(provider).getStatus()` / `.canExecute()`
- savienojuma atdzesēšana — `rateLimitedUntil` / `testStatus` atrisinātajā
  `provider_connections` rindā
- modeļa bloķēšana — `isModelLocked(provider, connectionId, model)`

Katra kandidāta satur arī šīs API atslēgas `excluded` karogu. Izņēmumi tiek glabāti
katrā API atslēgā (`auto_candidate_overrides` tabula, migrācija `128`) — OmniRoute ir
viena nomnieka arhitektūra bez `users` tabulas, tāpēc `apiKeyId` ir tuvākā reālā izsaukēja
identitāte — un tiek piemēroti kandidātu pūla sašaurināšanas punktā
`open-sse/services/autoCombo/virtualFactory.ts`, izmantojot tīru, vienībām testētu
`filterExcludedCandidates()` (`open-sse/services/autoCombo/candidateOverrides.ts`).
Filtrs ir **neatkarīgs no kļūdām**: nenoteikts apiKeyId/channel vai datubāzes meklēšanas
kļūda abos gadījumos atstāj pūlu nefiltrētu, tāpēc operators bez konfigurētiem izņēmumiem
redz maršrutēšanu identisku šai funkcijai pirms tās ieviešanas.

**Atlikts uz sekojošo problēmu:** kandidātu svaru + eksplicīta kārtošana (Level 3
— baro esošās svaru prioritātes stratēģijas ceļus) un specifiskas `combo.ts` stratēģijas
piesaistīšana `auto/*` kanālam (Level 4). Skatiet #7819 plānu par atvērto
jautājumu, vai izņēmumiem jāpaliek katram API atslēgai vai jākļūst par globāliem ņemot
vērā viena nomnieka modeli.

**Aizkulisēs:**

```txt
Request: { model: "auto/coding" }
   ↓
src/sse/handlers/chat.ts atklā prefiksu
   ↓
createVirtualAutoCombo('coding') → candidatePool no aktīvajiem savienojumiem
   ↓
handleComboChat (tāds pats dzinējs kā saglabātām kombinācijām)
   ↓
Auto-vērtēšana izvēlas labāko nodrošinātāju/modeli katram pieprasījumam
```

**Implementācijas faili:**

| Fails                                                     | Mērķis                                       |
| --------------------------------------------------------- | -------------------------------------------- |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Prefiksa parsētājs (`parseAutoPrefix`)       |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Izveido virtuālus `AutoComboConfig` objektus |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Testa āķis nodrošinātāju reģistra mocīšanai  |
| `src/sse/handlers/chat.ts`                                | Integrācija: auto prefiksa īsslēgšana        |
| `src/shared/constants/providers.ts`                       | `SYSTEM_PROVIDERS.auto` sistēmas ieraksts    |

## Kombināciju nosaukumi, kas atbilst reāliem modeļa identifikatoriem

Kombinācija, kuras `name` ir identisks vienkāršam modeļa identifikatoram (piemēram, kombinācija ar nosaukumu `gpt-5.5`), ir **apzināts un atbalstīts modelis**, nevis kļūda: tas ir mehānisms katra modeļa identifikatora pakalpojumu sniedzēja rezerves risinājumam, kas aprakstīts [sadaļā #6940](https://github.com/diegosouzapw/OmniRoute/issues/6940). Tā kā kombinācijas risināšana tiek pārbaudīta pirms vienkārša modeļa identifikatora risināšanas (`getComboForModel()` failā `src/sse/services/model.ts`), pieprasījums vienkāršajam identifikatoram `gpt-5.5` tiek novirzīts caur kombinācijas mērķiem (piemēram, `acme-responses/gpt-5.5`, `backup-responses/gpt-5.5`), nevis tieši uz vienu pakalpojumu sniedzēju — tas atkārto kombinācijas-pirms-pārrakstīšanas prioritāti, kas izveidota [sadaļā #3227/#3233](https://github.com/diegosouzapw/OmniRoute/issues/3227), un to pārbauda regresijas testi `tests/unit/responses-combo-resolution-3227.test.ts` un `tests/unit/combo-name-codex-responses-rewrite.test.ts`.

Kombinācijas izveidošana vai pārdēvēšana uz nosaukumu, kas pārklājas ar reālu modeļa identifikatoru, **nekad netiek noraidīta** — tā rīcība pārtrauktu šo dokumentēto darboplastu. Tā vietā (#8530) `POST /api/combos` un `PUT /api/combos/[id]` pievieno atbildei bloķējošu `warning` lauku, kad (jaunais) nosaukums pārklājas ar reālu modeļa identifikatoru:

```json
{
  "warning": {
    "code": "COMBO_NAME_SHADOWS_MODEL",
    "modelId": "gpt-5.5",
    "providerId": "openai"
  }
}
```

Palaižot sistēmu, `scanComboModelNameCollisionsAtBoot()` (failā `src/instrumentation-node.ts`) arī reģistrē vienrindiņas `[STARTUP]` brīdinājumu, uzskaitot katru esošo kombināciju, kas pārklājas ar modeļa identifikatoru, lai operatori, kas to nejauši sastop (nevis apzinīgi, kā #6940 norāda), saņemtu signālu. Noteikšanas palīdzības rīks atrodas failā `src/lib/combos/modelNameCollision.ts`.

## Pielāgotas kombinācijas izsaukšana no klienta

Saglabātās kombinācijas (Iestatījumi → Kombinācijas) tiek izmantotas tikai tad, kad klients komandas laukā `model` nosūta kombinācijas **precīzo nosaukumu** — kombinācijas nosaukumam nav nepilnīgas vai daļējas atbilstības, un netiek izmantots prefikss `auto/`. Risināšanas secība (`getComboForModel()` failā `src/sse/services/model.ts`):

1. precīza kombinācijas nosaukuma atbilstība (`model: "my-combo"`),
2. `combo/<nosaukums>` prefikss (`model: "combo/my-combo"`),
3. modeļa→kombinācijas glob kartēšanas (`/api/model-combo-mappings`).

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"my-combo","messages":[{"role":"user","content":"Hello"}]}'
```

Divas biežās kļūdas:

- **`auto` neizmanto jūsu kombinācijas.** `auto`/`auto/*` veido savu bezkonfigurācijas kandidātu kopu un konsultējas ar saglabātajām kombinācijām tikai tad, ja kombinācijas nosaukums ir burtiski `auto` (nav ieteicams). Lai novirzītu caur kombināciju, nosūtiet tās precīzo nosaukumu — ne `auto`.
- **`openrouter/auto` ir reāls apmaksāts OpenRouter produkts** ("Auto Best Available"), nevis OmniRoute aizstājvārds. Tas ir OpenReģistra (`open-sse/config/providers/registry/openrouter/index.ts`) vienīgais statiskais modeļa ieraksts, un par to tiek atsevišķi iekasēta maksa. Lai izslēgtu to no `auto` kopām, izmantojiet Iestatījumi → Maršrutēšana → Slēgt apmaksātus modeļus.

Skatīt [sadaļu #7992](https://github.com/diegosouzapw/OmniRoute/issues/7992) un [sadaļu #7111](https://github.com/diegosouzapw/OmniRoute/issues/7111) par sākotnējo pārpratumu, ko šis dokuments apraksta.

## Kā tas darbojas (Saglabātas autokombo)

Autokombo dzinējs dinamiski izvēlas labāko pakalpojumu sniedzēju/modeli katram pieprasījumam, izmantojot **16 faktoru vērtēšanas funkciju** (definēta `open-sse/services/autoCombo/scoring.ts` → `DEFAULT_WEIGHTS`). Noklusējuma svars ir `1.0`; pielāgotus svars atkārtoti normalizē `normalizeScoringWeights()`. No sešpadsmit faktoriem trīs — `cacheAffinity`, `resetWindowAffinity` un `reliability` — pēc noklusējuma ir ar svaru `0`: tie joprojām tiek aprēķināti katram kandidātam, un `cacheAffinity` kontrolē prompt-cache dublikātu noņemšanu ārpus rezultāta, tāpēc tie tiek deklarēti kā faktori, kuri pēc noklusējuma nepiedalās balsošanā.

![Autokombo 16 faktoru vērtēšana](../diagrams/exported/auto-combo-scoring.svg)

> Avots: [diagrams/auto-combo-scoring.mmd](../diagrams/auto-combo-scoring.mmd) (atsjaunot, izmantojot `npm run docs:render-diagrams`). Faila nosaukums ir vēsturisks; avots un renderētā diagramma rāda visus 16 faktorus, kas deklarēti `DEFAULT_WEIGHTS`.

| Faktors               | Noklusējuma svars | Apraksts                                                                                                                                                                                                              |
| :-------------------- | :---------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `quota`               | 0.1429            | Atlikušais kvota / ātruma ierobežojuma vieta [0..1]                                                                                                                                                                   |
| `health`              | 0.1605            | Veselības rādītājs no slēguma pārtraucēja (CLOSED=1.0, HALF_OPEN=0.5, OPEN=0.0)                                                                                                                                       |
| `costInv`             | 0.1429            | Apgriezta **sajaukta** cena (60% ievades + 40% izvades token cena, normalizēta) — lētāka = augstāks vērtējums                                                                                                         |
| `latencyInv`          | 0.1143            | Apgriezta p95 aizture, normalizēta pret kopu — ātrāka = augstāks vērtējums                                                                                                                                            |
| `taskFit`             | 0.0762            | Uzdevuma tipa piemērotība (kodēšana, pārskatīšana, plānošana, analīze, kļūdu novēršana, dokumentācija)                                                                                                                |
| `stability`           | 0.0476            | Variances balstīta stabilitāte no aiztures standartnovirzes — kandidāts, kura atbildes laiks svārstās, saņem zemāku vērtējumu                                                                                         |
| `tierPriority`        | 0.0476            | Konta līmeņa prioritāte — Ultra=1.0, Pro=0.67, Standard=0.33, Free=0.0                                                                                                                                                |
| `tierAffinity`        | 0.0476            | Piederība starp kandidāta līmeni un manifestā ieteikto līmeni                                                                                                                                                         |
| `specificityMatch`    | 0.0476            | Atbilstība starp pieprasījuma specifiskumu (manifesta norāde) un modeļa līmeni                                                                                                                                        |
| `contextAffinity`     | 0.0476            | Piederība starp pieprasījuma konteksta loga vajadzību un modeļa konteksta logu                                                                                                                                        |
| `sessionAvailability` | 0.0476            | OAuth sesijas pieejamība šī savienojuma kandidātam šai sesijai (`getOAuthSessionAvailability()`; ne-OAuth savienojumi saņem 1.0)                                                                                      |
| `connectionDensity`   | 0.0476            | Sadala slodzi starp tā paša pakalpojumu sniedzēja savienojumiem (pret koncentrēšanos)                                                                                                                                 |
| `cacheAffinity`       | 0.00              | Rendezvous-hash piederība pret savienojumu, kas visdrīzāk jau satur šī pieprasījuma prompt-cache prefiksu (`open-sse/services/combo/promptCacheAffinity.ts`); pēc noklusējuma atspējots (#8008)                       |
| `resetWindowAffinity` | 0.00              | Virziens pret savienojumiem, kuru kvotas atiestatīšanas logs ir labvēlīgs (pēc noklusējuma atspējots)                                                                                                                 |
| `quality`             | 0.03              | Atgriezeniskās saites balstīts izvades kvalitātes signāls no maršrutēšanas notikumu kvalitātes izsekotāja; kandidāti bez novērojumiem saņem neitrālu 0.5                                                              |
| `reliability`         | 0.00              | Novērotā veiksmes daļa, `1 - failureRate`, no 24 stundu lietojuma vēstures ar desmit paraugu griestu (pretējā gadījumā reāllaika metrika); kandidāti bez novērojumiem tiek nolasīti kā 1.0. Pēc noklusējuma atspējots |

**Summa:** `0.1429 + 0.1605 + 0.1429 + 0.1143 + 0.0762 + (7 × 0.0476) + 0.00 + 0.00 + 0.03 + 0.00 = 1.0`, kā deklarēts `DEFAULT_WEIGHTS`; lietotāja konfigurētos svars pirms vērtēšanas atkārtoti normalizē par sadalījumu ar `normalizeScoringWeights()`.

## Režīmu komplekti

6 iepriekš definētas svaru profili `open-sse/services/autoCombo/modePacks.ts` failā. Katrs komplekts pilnībā aizstāj noklusējuma svarus, lai vēlēšanos novirzītu uz vienu mērķi. Katrs komplekts jau sasniedz `1.0` summu (`0.9999`, kā parādīts četros decimālos), tāpēc `normalizeScoringWeights()` neko būtiski nekoriģē, kad komplekts ir aktīvs – turpmāk minētās vērtības, ņemot vērā noapaļošanu, ir tās, kuras vērtētājs piemēro.

| Faktors               | ship-fast  | cost-saver | quality-first | offline-friendly | reliability-first | chaos-mode |
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

Piezīmes:

- **Neviens komplekts nenosaka `quality`, un komplekts pilnībā nomaina svaru karti** (`weights = pack`, nevis apvienošanu). `quality` nes `0.03` `DEFAULT_WEIGHTS`, bet jebkura režīma komplekta gadījumā tas tiek normalizēts līdz `0` – komplekta izvēle pilnībā izslēdz novērotās kvalitātes signālu. Ja vēlaties, lai kvalitātes atgriezeniskā saite ietekmētu maršrutēšanu, atstājiet `modePack` nedefinētu un pielāgojiet svarus tieši. (`cacheAffinity` arī katrā komplektā ir nedefinēts, bet pēc noklusējuma tas ir `0`, tāpēc tur nekas nemainās.)
- `tierAffinity`, `specificityMatch` un `resetWindowAffinity` katrā komplektā ir skaidri norādīti kā `0`.
- Katra komplekta uzsvars uzreiz:
  - **ship-fast** → latencyInv 0.3048 + health 0.2667 (zema latentuma, veselīgi savienojumi)
  - **cost-saver** → costInv 0.3524 (lētākie tokeni uzvar)
  - **quality-first** → taskFit 0.3524 + stability 0.1429 (labākais modelis uzdevumam, konsekvents)
  - **offline-friendly** → quota 0.3524 + health 0.2667 (maksimāla galviņas telpa neatkarīgi no ātruma/cenas)
  - **reliability-first** → health 0.3524 + stability 0.1905 (mazāk pārsteigumu)
  - **chaos-mode** → health 0.4000 + taskFit 0.1905 (kļūdas injekcijas profils)

### Pieprasījuma vadība (galvenes) — #6023 / #6024 / #6025 / #3470

`auto` kombināciju var vadīt **katrā pieprasījumā** ar trim galvenēm, nemainot kombinācijas saglabāto konfigurāciju. Tās attiecas tikai uz `auto` stratēģiju un tikai uz pieprasījumu, kas tās satur; kombinācijas saglabātā `modePack`/`budgetCap`/`budgetFallback` tiek izmantota, kad galvene nav norādīta.

| Galvene                       | Pieņem                                                                                                                                                                                                              | Efekts                                                                                                                                                                                                                                    |
| :---------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `X-OmniRoute-Mode`            | iepriekš definētu aliāsu (`fast`, `balanced`, `quality`, `cheap`, `reliable`, `offline`) vai neapstrādāta komplekta nosaukumu (`ship-fast`, `cost-saver`, `quality-first`, `offline-friendly`, `reliability-first`) | Pārklāj vērtēšanas svarus šim pieprasījumam. `balanced`/`default` piespiež noklusējuma svarus (nav komplekta). Nezināmas vērtības tiek ignorētas (konfigurācija saglabāta).                                                               |
| `X-OmniRoute-Budget`          | pozitīvu skaitli (maks. USD par pieprasījumu)                                                                                                                                                                       | Stingra izmaksu griestus: kandidāti, kuru paredzamās izmaksas pārsniedz šo griestu, tiek filtrēti pirms izvēles. Kas notiek, ja **visi** kandidāti to pārsniedz, nosaka zemāk esošais `X-OmniRoute-Budget-Fallback`.                      |
| `X-OmniRoute-Budget-Fallback` | `cheapest` (noklusējuma, aliāsi: `cheapest-viable`, `soft`) vai `strict` (aliāsi: `block`, `hard`)                                                                                                                  | `cheapest`: izmanto globāli lētāko kandidātu, pat ja tas joprojām pārsniedz griestus (vecā uzvedība). `strict`: atsakās izvēlēties – pieprasījums ātri neizdodas ar `HTTP 402` vietā klusas pārtēriņa. Nezināmas vērtības tiek ignorētas. |

```bash
# Piespied ātrāko profilu, ierobežo šo pieprasījumu līdz $0.05 un bloķē stingri, nevis tērē vairāk
curl -sS http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "X-OmniRoute-Mode: fast" \
  -H "X-OmniRoute-Budget: 0.05" \
  -H "X-OmniRoute-Budget-Fallback: strict" \
  -d '{"model":"auto","messages":[{"role":"user","content":"hi"}]}'
```

Izšķirtspēja ir tīra funkcija (`open-sse/services/autoCombo/requestControls.ts`); izšķirtās vērtības baro dzinēja esošos `config.modePack` / `config.budgetCap` / `config.budgetFallback` ievades. Kombinācijas saglabātā `config.budgetFallback` ("strict" | "cheapest") nosaka pastāvīgo politiku; galvene to pārklāj vienam pieprasījumam.

## Visas maršrutēšanas stratēģijas

OmniRoute kombinētājs atbalsta **19 maršrutēšanas stratēģijas** (deklarētas `src/shared/constants/routingStrategies.ts` → `ROUTING_STRATEGY_VALUES`). Pašas Auto kombinētāja dzinējs ir pieejams zem `auto` stratēģijas; pārējās ir pieejamas saglabātām kombinācijām.

| Stratēģija          | Apraksts                                                                                                                                                                                                  |
| :------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `priority`          | Pirmais mērķis kārtotā sarakstā ar prioritāti                                                                                                                                                             |
| `weighted`          | Svarīta nejaušība pēc katra mērķa svara                                                                                                                                                                   |
| `round-robin`       | Pa kārtai iziet cauri mērķiem                                                                                                                                                                             |
| `context-relay`     | Nodevīt kontekstu starp mērķiem (garas sarunas)                                                                                                                                                           |
| `fill-first`        | Aizpildīt katra mērķa kvotu pirms pārejas uz nākamo                                                                                                                                                       |
| `p2c`               | 2. pakāpes izvēles nejaušs slodzes līdzsvarošana                                                                                                                                                          |
| `random`            | Vienmērīga nejauša izvēle                                                                                                                                                                                 |
| `least-used`        | Izvēlēties mērķi ar zemāko pašreizējo slodzi                                                                                                                                                              |
| `cost-optimized`    | Minimizēt izmaksas par pieprasījumu, ņemot vērā kataloga cenas                                                                                                                                            |
| `reset-aware` ⭐    | Prioritizēt pēc kvotas atiestatīšanas laika — īsāki atiestatīšanas logi rangēti augstāk                                                                                                                   |
| `reset-window`      | Dot priekšroku mērķiem, kuru kvotas logs atiestatās visdrīzāk                                                                                                                                             |
| `headroom`          | Izvēlēties mērķi ar vislielāko atlikušo kvotas brīvo vietu                                                                                                                                                |
| `strict-random`     | Nejauša, bez atkārtojumu deduplikācijas                                                                                                                                                                   |
| `auto`              | Izmantot Auto kombinētāja vērtēšanu (16 faktoru) — **ieteicams**                                                                                                                                          |
| `lkgp`              | Last-Known-Good Path (piesaista pie pēdējā veiksmīgā pakalpojuma sniedzēja, tad atkāpjas pēc noteikumiem)                                                                                                 |
| `context-optimized` | Izvēlēties mērķi ar labāko atbilstību pašreizējam konteksta lielumam                                                                                                                                      |
| `cache-optimized`   | Pārkārtot mērķus pēc pieprasījuma kešatmiņas afinitātes — vispirms mēģināt savienojumu, kas visdrīzāk jau satur šī pieprasījuma kešoto prefiksu (`open-sse/services/combo/promptCacheAffinity.ts`, #8008) |
| `fusion` 🧬         | Paralēli izplatīties uz modeļu paneli, pēc tam sintezēt vienu atbildi caur tiesnesi (skatīt zemāk)                                                                                                        |
| `pipeline`          | Palaist mērķus secīgi, pavedot katra soļa izvadi nākamā soļa ievadē; tiek atgriezta tikai galīgā atbilde (#6396)                                                                                          |

⭐ = Jauns v3.8.0 · 🧬 = Jauns v3.8.36

### `weighted` semantika

`weighted` ir **proporcionāla nejauša izvēle katram pieprasījumam**
(`open-sse/services/combo/targetSorters.ts` → `selectWeightedTarget`), nevis izlīdzinātājs:

- Katrs pieprasījums izvelk **vienu** soli ar varbūtību `weight / totalWeight`; atlikušie soļi
  tiek kārtoti pēc svara dilstošā secībā kā šī pieprasījuma atkāpšanās ķēde.
- Solis, kura svars ir `0` (vai trūkst), **netiek izvēlēts**, kamēr jebkuram citam solim ir
  svars > 0 — tas var kalpot tikai kā atkāpšanās variants pēc izvēlētā soļa neveiksmes. Tikai tad, kad **visi**
  svari ir 0, izvēle kļūst vienmērīga.
- Soļi, kuru mērķi visi ir nepieejami — pakalpojuma sniedzēja ķēdes pārtraucējs `OPEN`, savienojuma
  atdzesēšanas periods, modeļa bloķēšana — tiek noņemti no izlozes pirms tās notiek
  (`open-sse/services/combo/targetResolution.ts`), tāpēc viens veselīgs solis var pagaidu
  uzvarēt katru pieprasījumu.
- `stickyWeightedLimit` (kombinētāja konfigurācija, noklusējums `1` = izslēgts) piesaista izvēlēto soli tik daudzām
  secīgām veiksmēm pirms atkārtotas izlozes.

Precīzai rotācijai izmantojiet `round-robin`; vienādi svari `weighted` dod statistisku — nevis
stingru — līdzsvaru.

## Fusijas stratēģija

`fusion` ir vienīgā stratēģija, kas **neizvēlas vienu mērķi**. Tā vienlaikus izplata pieprasījumu
**visām paneļa modeļiem paralēli**, pēc tam konfigurējams **tiesnesis模型is** sintezē
vienīgo galīgo atbildi no visām paneļa atbildēm. Portēts no augšējā līmeņa `decolua/9router`
(OpenRouter Fusijas dizains); implementācija `open-sse/services/fusion.ts`.

Kā tas darbojas:

0. **Rīku nesēju apietšana** — pieprasījums, kas satur nepukstošu `tools` masīvu ar
   `tool_choice`, kas nav skaidri norādīts `"none"`, pilnībā izlaiž paneli: tas tieši novirzās uz
   vienu modeli (konfigurēto tiesnesi vai `panel[0]`) ar `tools`/`tool_choice`
   nemainīti nodotiem. Paneļa dalībniekiem nav piekļuves rīkiem, un tiesnesa sintēzes
   direktīja attur no rīku izsaukumu ģenerēšanas, tāpēc aģentu/rīku izsaukumu klienti
   saņem īstu rīku izsaukuma lēmumu, nevis sintezētu prozu (#6771).
1. **Izplatīšana** (tikai pieprasījumiem bez rīkiem) — pieprasījums tiek nosūtīts uz katru paneļa
   modeli uzreiz, ar piespiedu nestreamingu un izņemtiem rīkiem (tiesnesim vajag pilnu
   prozu sintēzei).
2. **Kvorumā žēlastības savākšana** — tiklīdz ir saņemtas `minPanel` atbildes, sākas
   īsa žēlastības taimerīša gaidīšana novēlošanām, pēc tam fusija turpinās ar visu, kas savākts.
   Tas ierobežo lēnākā modeļa sodu par faktisko laiku, ar cieto taimautu kā robežu.
3. **Tiesnesa sintēze** — paneļa atbildes tiek anonimizētas (`Avots 1`, `Avots 2`, … — lai
   tiesnesis vērtētu saturu, nevis modeļa zīmolu) un nodotas tiesnesim, kas analizē
   vienprātības / pretrunas / daļēju pārklājumu / unikālās atziņas / neredzamās vietas, pēc tam
   uzraksta **vienīgo** autoritatīvo atbildi. Tiesnesa izsaukums saglabā klienta sākotnējo
   `stream` karogu + rīkus, tāpēc straumēšana un lejupējā rīku izmantošana joprojām darbojas.
4. **Vienmērīga degradācija** — 0 paneļa atbildes → `503`; tieši 1 izdzīvotājs → tā atbilde
   tiek atgriezta tieši (nav nekā ko sintezēt); viena modeļa panelis atbild tieši.

Paneļa dalībnieks var būt arī `combo-ref` solis (`{kind: "combo-ref", comboName: "..."}`), kas atsaucas
uz citu kombināciju — tas tiek atrisināts kā **viens melnā kastes paneļa balss** (pilna rekursīva nosūtīšana uz
atsaukto kombināciju, nevis šīs kombinācijas pašu mērķu izplatīšana), ar vienādu dziļuma/cikla aizsardzību,
kādu izmanto jebkura cita stratēģija, kas patērē combo-ref (#6764).

### Konfigurācija

Konfigurēts kombinācijas `config` blobā (nav shēmas migrācijas — tas atkārtoti izmanto esošo
`combos` tabulu):

| Lauks                                    | Tips     | Noklusējums            | Mērķis                                                                                                    |
| :--------------------------------------- | :------- | :--------------------- | :-------------------------------------------------------------------------------------------------------- |
| `config.judgeModel`                      | `string` | pirmais paneļa modelis | Modelis, kas sintezē galīgo atbildi                                                                       |
| `config.fusionTuning.minPanel`           | `number` | `2`                    | Veiksmīgas atbildes, kas nepieciešamas pirms žēlastības taimera sākuma (ierobežots līdz `[2, panelSize]`) |
| `config.fusionTuning.stragglerGraceMs`   | `number` | `8000`                 | Cik ilgi gaidīt novēloties, kad ir sasniegts kvorums                                                      |
| `config.fusionTuning.panelHardTimeoutMs` | `number` | `90000`                | Absolūtais ierobežojums, lai viens aizsūcīgs modelis nevarētu aizkavēt pieprasījumu                       |

Noklusējumi atrodas `FUSION_DEFAULTS` (`open-sse/services/fusion.ts`).

### Piemērs

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

Tad izsauciet to kā jebkuru kombināciju: `{"model":"fusion-panel","messages":[...]}`.

## Virtuālā Auto-Kombināciju Fabrika

Auto Kombināciju dzinējam nav nepieciešamas iepriekš definētas kombinācijas. Tā vietā `open-sse/services/autoCombo/virtualFactory.ts` veido kandidātus dinamiski:

1. Iegūst `getProviderConnections({ isActive: true })` (visas aktivētās savienojumus)
2. Filtrē pēc derīgiem akreditācijas datiem (API atslēga vai nebeidzis OAuth tokens, izmantojot `hasUsableOAuthToken()`)
3. Krustodzēš ar `getProviderRegistry()`, lai iegūtu modeļu pieejamību + cenu noteikšanu
4. Katram kopa `(provider, model, connection)` izveido `VirtualAutoComboCandidate`
5. Izvēlas `connection.defaultModel` (vai reģistra pirmo modeli) kā izsūtīšanas mērķi
6. Vērtē katru kandidātu, izmantojot 16 faktoru `scorePool()` un varianta svaru pakotni
7. Atgriež rezultātā iegūto atmiņā esošo `AutoComboConfig` priekš `handleComboChat()` — nekad netiek saglabāts datubāzē

Tas nozīmē, ka **jauna pakalpojumu sniedzēja pievienošana ar `auto/*` iespējotu automātiski paplašina kandidātu kopienu** — nav nepieciešama manuāla kombināciju rediģēšana. Virtuālā kombinācija tiek pārbūvēta katram pieprasījumam, tāpēc jaunpievienotie vai jaunā veselības stāvokļa savienojumi tiek iekļauti uzreiz.

## Pašdziedināšanās

- **Pagaidu izslēgšana**: Vērtējums < 0.2 → izslēgts uz 5 minūtēm (progresīva atkāpšanās, maks. 30 min)
- **Apļa pārtraucēja apzināšanās**: ATVĒRTS → automātiski izslēgts; PUSATVĒRTS → izmeklēšanas pieprasījumi
- **Incidenta režīms**: >50% ATVĒRTS → atspējot izpēti, maksimizēt stabilitāti
- **Atdzišanas atgūšana**: Pēc izslēgšanas pirmais pieprasījums ir "izmeklēšana" ar samazinātu taimautu

## Bandītu izpēte

5% pieprasījumu (konfigurējams) tiek novirzīti uz nejaušiem pakalpojumu sniedzējiem izpētei. Atspējots incidenta režīmā.

## API

**Nav īpaša `POST /api/combos/auto` galapunkta** — Auto Kombinācijas tiek patērētas divos veidos:

1. **Nulles konfigurācija (ieteicams):** Nosūtiet jebkuru tērzēšanas pabeigšanas pieprasījumu ar `model: "auto"` vai `model: "auto/<variant>"`. Virtuālā fabrika veido kombināciju katram pieprasījumam — nav saglabāšanas, nav nepieciešamas API izsaukumus.

2. **Saglabāta kombinācija ar `strategy: "auto"`:** Izveido regulāru kombināciju ar `POST /api/combos` un iestatiet `strategy: "auto"` kopā ar `config.auto.weights` / `config.auto.candidatePool`. Tiek izmantots tas pats vērtēšanas dzinējs; kombinācija tiek glabāta `combos` un ir atkārtoti izmantojama pēc ID.

Lai atklātu, `GET /api/combos/auto` uzskaita katru variantu ar tā atrisināto kandidātu kopienu plus `context_length` / `max_output_tokens` — MAX kandidātu kopas logu vidū. Klienti (piem., opencode spraudnis) šīs vērtības jāreklamē tā vietā, lai izmantotu `0`: nulles konteksts pilnībā atspējo opencode automātisko saspiešanu, ļaujot sesijām augt, līdz vāteņa vēstures izraidīšana iznīcina kontekstu. MAX ir droša vērtība, ko reklamēt, jo auto-kombināciju konteksta priekšfiltrs novirza pārmērīgus pieprasījumus uz lielu logu kandidātiem.

```bash
# Nulles konfigurācijas lietošana (bez kombinācijas izveides)
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"auto/coding","messages":[{"role":"user","content":"Hello"}]}'

# Saglabāta auto kombinācija caur regulāro kombināciju galapunktu
curl -X POST http://localhost:20128/api/combos \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","strategy":"auto","config":{"auto":{"candidatePool":["anthropic","google","openai"],"weights":{"quota":0.15,"health":0.3,"costInv":0.05,"latencyInv":0.35,"taskFit":0.1,"stability":0,"tierPriority":0.05}}}}'
```

### Auto maršrutētāja stratēģijas

Saglabātās `strategy: "auto"` kombinācijas var iestatīt `config.routerStrategy` (vai veco `config.auto.routerStrategy`) uz kādu no:

- `rules` — noklusējuma svērtā vērtēšana
- `score` — izvēlas augstāko konfigurēto svērto vērtējumu. Precīza līdzsvēršana saglabā konfigurēto kandidātu secību; esošais `explorationRate` izlases no pilnā rangētā kopuma.
- `cost` / `eco` — lētākais veselīgais pakalpojumu sniedzējs
- `latency` / `fast` — zemākais p95 latentums ar uzticamības sodu
- `sla-aware` / `sla` — dod priekšroku kandidātiem, kas apmierina p95 latentuma, kļūdu līmeņa un izvēles SLO izmaksas
- `lkgp` — pēdējais zināmais labs pakalpojumu sniedzējs vispirms

### Maršrutētāja stratēģijas sīkāk

Auto-kombināciju dzinējs atklāj 6 aizstājamas **RouterStrategy** implementācijas, kuras variet aizstāt ar `config.routerStrategy` (vai veco `config.auto.routerStrategy`). Katra stratēģija izvēlas vienu pakalpojumu sniedzēju no kandidātu kopas, ņemot vērā `RoutingContext` (uzdevuma tips, rīku/redzes norādes, tokena aprēķins, izvēles SLA politika, izvēles pēdējais-zināmais labs pakalpojumu sniedzējs).

#### 1. `rules` (noklusējums) — 16 faktoru svērtā vērtēšana

Ietilpina esošo vērtēšanas dzinēju. Filtrē ārā `OPEN` apļa pārtraucēja kandidātus, pēc tam veic `scorePool()` ar pašreizējo uzdevuma tipu un `getTaskFitness()`, izvēloties kandidātu ar augstāko vērtējumu.

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

**Kad izmantot**: Noklusējums. Izmantojiet, kad vēlaties līdzsvarotu kompromisu starp visiem signāliem.

**Aizstājvārds**: `rules` (nav aizstājvārda)

---

#### 2. `cost` / `eco` — lētākais veselīgais pakalpojumu sniedzējs

Sakārto kandidātu kopu pēc `costPer1MTokens` (augošā secībā) un izvēlas lētāko. Vispirms filtrē ārā `OPEN` kandidātus.

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

**Kad izmantot**: Izdevīgiem slodzēm, masu apstrādei vai fona darbiem.

**Aizstājvārdi**: `cost`, `eco`

---

#### 3. `latency` / `fast` — zemākais p95 latentums ar uzticamības sodu

Sakārto pēc `p95LatencyMs + (errorRate * 1000)`. Kļūdu līmeņa sods nodrošina, ka neuzticami pakalpojumu sniedzēji tiek rangēti zemāk pat tad, ja to nominālais latentums ir zems.

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

**Kad izmantot**: Latentuma jūtīgas slodzes, piemēram, reāllaika tērzēšana, automātiskā pabeigšana vai interaktīvi kodošanas palīgi.

**Aizstājvārdi**: `latency`, `fast`

---

#### 4. `sla-aware` / `sla` — latentuma/kļūdu/izmaksu SLO atbilstība

Vērtē katru kandidātu pēc tā, cik labi tas apmierina konfigurēto SLO politiku:

| Faktors                | Svars | Formula                                                  |
| ---------------------- | ----- | -------------------------------------------------------- |
| Latentuma vērtējums    | 35%   | `threshold / max(value, ε)`                              |
| Kļūdu vērtējums        | 35%   | `threshold / max(value, ε)`                              |
| Veselības vērtējums    | 15%   | `1.0` (AIZVĒRTS) / `0.5` (PUSAIZVĒRTS) / `0.0` (ATVĒRTS) |
| Izmaksu vērtējums      | 10%   | `threshold / max(value, ε)` vai apgrieztā normalizācija  |
| Stabilitātes vērtējums | 5%    | apgrieztā normalizēta latentuma novirze                  |

Ja `hardConstraints: true`, kandidāti tiek sakārtoti galvenokārt pēc **pārkāpuma vērtējuma** (cik tālu tie pārsniedz jebkuru SLO), tad pēc kombinētā vērtējuma. Citādi tiek izmantots tikai kombinētais vērtējums.

```ts
class SLAStrategyImpl implements RouterStrategy {
  readonly name = "sla-aware";
  readonly description =
    "Selects the provider most likely to satisfy latency, error-rate, and cost SLOs";

  select(pool, context) {
    // ... vērtē katru kandidātu pret politiku: { targetP95Ms, maxErrorRate, maxCostPer1MTokens, hardConstraints }
  }
}
```

**SLA lauki** (iestatīti kombinācijas konfigurācijā):

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

**Kad izmantot**: Ražošanas slodzes ar stingrām latentuma, kļūdu līmeņa vai izmaksu budžetiem.

**Aizstājvārdi**: `sla-aware`, `sla`

---

#### 5. `lkgp` — pēdējais zināmais labs pakalpojumu sniedzējs vispirms

Vispirms mēģina **pēdējo zināmo labo pakalpojumu sniedzēju** (ja iestatīts), pēc tam atgriežas pie `rules` stratēģijas. Noderīga sesijas noturībai — tas pats pakalpojumu sniedzējs apstrādā turpmākos pieprasījumus sarunā.

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

    // Atgriežas pie rules stratēģijas
    return getStrategy("rules").select(pool, context);
  }
}
```

**Kad izmantot**: Vairāku gājienu sarunas, kur vēlaties, lai tas pats pakalpojumu sniedzējs apstrādātu turpmākos pieprasījumus (piem., kešošanai, konteksta nepārtrauktībai vai cenu konsekvencei).

**Aizstājvārds**: `lkgp` (nav aizstājvārda)

---

### Pielāgotas maršrutētāja stratēģijas

Varat reģistrēt savu `RouterStrategy` implementāciju, izmantojot publisko API:

```ts
import {
  registerStrategy,
  type RouterStrategy,
} from "@omniroute/open-sse/services/autoCombo/routerStrategy";

class MyCustomStrategy implements RouterStrategy {
  readonly name = "my-custom";
  readonly description = "My custom routing strategy";

  select(pool, context) {
    // Jūsu maršrutēšanas loģika šeit
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

Pēc tam izmantojiet to:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "my-custom"
  }
}
```

---

### Maršrutētāja stratēģijas izvēles ceļvedis

| Lietojuma gadījums        | Stratēģija  | Iemesls                                       |
| ------------------------- | ----------- | --------------------------------------------- |
| Līdzsvarota slodze        | `rules`     | Noklusējums — ņem vērā visus faktorus         |
| Minimizēt izmaksas        | `cost`      | Vienmēr izvēlas lētāko                        |
| Minimizēt latentumu       | `latency`   | Izvēlas ātrāko uzticamo pakalpojumu sniedzēju |
| Stingri SLO               | `sla-aware` | Filtrē pēc p95/kļūdu/izmaksu sliekšņiem       |
| Vairāku gājienu tērzēšana | `lkgp`      | Sesijas noturība                              |

SLA-aware lauki:

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

## Uzdevuma piemērotība

30+ modeļi vērtēti 6 uzdevumu tipos (`coding`, `review`, `planning`, `analysis`, `debugging`, `documentation`). Atbalsta aizstājējzīmju rakstus (piemēram, `*-coder` → augsts koda izstrādes vērtējums).

## Auto varianta atkārtojums

Ieskaitot tukšo `auto` (noklusējuma) un 6 `AutoVariant` vērtības, kas deklarētas `autoPrefix.ts`, kopā ir **7 izsaucamu modeļu ID**:

`auto`, `auto/coding`, `auto/fast`, `auto/cheap`, `auto/offline`, `auto/smart`, `auto/lkgp`

(`AutoVariant` pats uzskaita 6 vērtības; 7. iespēja ir "nav varianta" — tukšais `auto` — ko apstrādā `parseAutoPrefix()` kā `variant: undefined`.)

## Kā slāņi iederas Auto-Kombinācijā

16 faktoru vērtēšanas funkcija (`open-sse/services/autoCombo/scoring.ts`) apstrādā slāņa
piederību kā divus signālus: `tierPriority` (0.0476) un `tierAffinity` (0.0476). Skatiet
kanonisko [vērtēšanas faktoru tabulu](#how-it-works-persisted-auto-combos) iepriekš pilnam
`DEFAULT_WEIGHTS` kopam — iepakojumu specifiskos pielāgojumus (ship-fast/cost-saver/quality-first/
offline-friendly) varat atrast "Svaru profili katram iepakojumam" tabulā.

Slānis pats par sevi **nespiež** Tier 1 pirmais — ja Tier 1 aiztures laiks ir slikts vai
izmaksas-kvalitātes attiecība ir neoptimāla, uzvar Tier 2. Lai piespiestu slāņa secību, izmantojiet kombinēšanas
stratēģiju `priority` un sakārtojiet sniedzējus pēc slāņa.

Lai stipri favorizētu Tier 1 (abonements), palieliniet `tierPriority` svaru:

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "tierPriority": 0.3, "costInv": 0.05 } } }
}
```

Skatiet `docs/marketing/TIERS.md` par slāņu definīcijām un sniedzēju klasifikāciju.

## Testēšana un pārklājums

### Deterministisks maršrutēšanas lēmumu matrica (`npm run test:combo:matrix`)

`tests/integration/combo-matrix/*.test.ts` pierāda visu 19
publisko stratēģiju maršrutēšanas **lēmumu** end-to-end caur reālo kombinācijas konveijeru ar
ģenerētu augšējo līmeni. Pārklājums ietver:

- Visas 19 `ROUTING_STRATEGY_VALUES` stratēģijas (sakārtotas, svarītas, izmaksas, konteksts, saplūšana, …).
- `quota-share` (iekšējs) end-to-end: DRR taisnīgums + piesātinājuma degradēšana caur
  reālo `selectQuotaShareTarget` šuvi (`registerQuotaFetcher` / `setLKGP` /
  `__setHeadroomSaturationFetcherForTests`).
- `context-relay` universālā pārneses pārklājums visos mērķa skaitļos.

Šī testa komplekta tiek palaists CI (`test:integration` darbs) ar `--test-concurrency=1` un
`--test-force-exit`, lai tas būtu deterministisks un neprasītu dzīvos akreditīvus.

### Vārtots dzīvais dūmu tests (NAV CI — reāli sniedzēji)

| Komanda                                | Ko tā dara                                                                            |
| :------------------------------------- | :------------------------------------------------------------------------------------ |
| `npm run test:combo:live`              | Procesā reāla maršrutēšana ar `RUN_COMBO_LIVE=1`; saglabā dzīvo OmniRoute DB snapšotu |
| `npm run test:combo:live:vps`          | HTTP pieprasījumi pret dzīvu OmniRoute serveri (iestatiet `COMBO_LIVE_BASE_URL`)      |
| `npm run test:combo:live:vps:failover` | Tas pats, ar tīšiem failover scenārijiem                                              |

Šie dūmu testi izmanto reālo tīkla ceļu (kombinācija → sniedzējs → pabeigšana). Tie ir
apzināti izslēgti no CI, jo tiem nepieciešami dzīvie akreditīvi un VPS piekļuve.

---

## Faili

| Faila nosaukums                                           | Mērķis                                                                                                  |
| :-------------------------------------------------------- | :------------------------------------------------------------------------------------------------------ |
| `open-sse/services/autoCombo/scoring.ts`                  | 16 faktoru vērtēšanas funkcija, `DEFAULT_WEIGHTS`, baseinu normalizācija                                |
| `open-sse/services/autoCombo/taskFitness.ts`              | Modeļa × uzdevuma piemērotības meklēšana                                                                |
| `open-sse/services/autoCombo/engine.ts`                   | Atlases loģika, bandīts, budžeta ierobežojums                                                           |
| `open-sse/services/autoCombo/selfHealing.ts`              | Izslēgšana, zondes, incidenta režīms                                                                    |
| `open-sse/services/autoCombo/modePacks.ts`                | 6 svara profili (ship-fast, cost-saver, quality-first, offline-friendly, reliability-first, chaos-mode) |
| `open-sse/services/autoCombo/autoPrefix.ts`               | `auto/` prefiksa parsētājs + 6 varianti                                                                 |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Veido atmiņā esošu `AutoComboConfig` no dzīviem savienojumiem                                           |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Testa āķis pakalpojumu reģistra mokiem                                                                  |
| `src/shared/constants/routingStrategies.ts`               | `ROUTING_STRATEGY_VALUES` (19 stratēģijas)                                                              |
| `src/sse/handlers/chat.ts`                                | Integrācija: auto-prefiksa īssavienojums                                                                |
