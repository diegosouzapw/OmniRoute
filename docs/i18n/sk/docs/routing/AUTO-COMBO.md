# OmniRoute Auto-Combo Engine (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/AUTO-COMBO.md) · 🇪🇹 [am](../../../am/docs/routing/AUTO-COMBO.md) · 🇸🇦 [ar](../../../ar/docs/routing/AUTO-COMBO.md) · 🇦🇿 [az](../../../az/docs/routing/AUTO-COMBO.md) · 🇧🇬 [bg](../../../bg/docs/routing/AUTO-COMBO.md) · 🇧🇩 [bn](../../../bn/docs/routing/AUTO-COMBO.md) · 🇨🇿 [cs](../../../cs/docs/routing/AUTO-COMBO.md) · 🇩🇰 [da](../../../da/docs/routing/AUTO-COMBO.md) · 🇩🇪 [de](../../../de/docs/routing/AUTO-COMBO.md) · 🇬🇷 [el](../../../el/docs/routing/AUTO-COMBO.md) · 🇪🇸 [es](../../../es/docs/routing/AUTO-COMBO.md) · 🇪🇪 [et](../../../et/docs/routing/AUTO-COMBO.md) · 🇮🇷 [fa](../../../fa/docs/routing/AUTO-COMBO.md) · 🇫🇮 [fi](../../../fi/docs/routing/AUTO-COMBO.md) · 🇫🇷 [fr](../../../fr/docs/routing/AUTO-COMBO.md) · 🇮🇪 [ga](../../../ga/docs/routing/AUTO-COMBO.md) · 🇮🇳 [gu](../../../gu/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ha](../../../ha/docs/routing/AUTO-COMBO.md) · 🇮🇱 [he](../../../he/docs/routing/AUTO-COMBO.md) · 🇮🇳 [hi](../../../hi/docs/routing/AUTO-COMBO.md) · 🇭🇷 [hr](../../../hr/docs/routing/AUTO-COMBO.md) · 🇭🇺 [hu](../../../hu/docs/routing/AUTO-COMBO.md) · 🇦🇲 [hy](../../../hy/docs/routing/AUTO-COMBO.md) · 🇮🇩 [id](../../../id/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ig](../../../ig/docs/routing/AUTO-COMBO.md) · 🇮🇹 [it](../../../it/docs/routing/AUTO-COMBO.md) · 🇯🇵 [ja](../../../ja/docs/routing/AUTO-COMBO.md) · 🇬🇪 [ka](../../../ka/docs/routing/AUTO-COMBO.md) · 🇰🇭 [km](../../../km/docs/routing/AUTO-COMBO.md) · 🇮🇳 [kn](../../../kn/docs/routing/AUTO-COMBO.md) · 🇰🇷 [ko](../../../ko/docs/routing/AUTO-COMBO.md) · 🇱🇹 [lt](../../../lt/docs/routing/AUTO-COMBO.md) · 🇱🇻 [lv](../../../lv/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ml](../../../ml/docs/routing/AUTO-COMBO.md) · 🇮🇳 [mr](../../../mr/docs/routing/AUTO-COMBO.md) · 🇲🇾 [ms](../../../ms/docs/routing/AUTO-COMBO.md) · 🇲🇹 [mt](../../../mt/docs/routing/AUTO-COMBO.md) · 🇲🇲 [my](../../../my/docs/routing/AUTO-COMBO.md) · 🇳🇵 [ne](../../../ne/docs/routing/AUTO-COMBO.md) · 🇳🇱 [nl](../../../nl/docs/routing/AUTO-COMBO.md) · 🇳🇴 [no](../../../no/docs/routing/AUTO-COMBO.md) · 🇮🇳 [or](../../../or/docs/routing/AUTO-COMBO.md) · 🇮🇳 [pa](../../../pa/docs/routing/AUTO-COMBO.md) · 🇵🇭 [phi](../../../phi/docs/routing/AUTO-COMBO.md) · 🇵🇱 [pl](../../../pl/docs/routing/AUTO-COMBO.md) · 🇵🇹 [pt](../../../pt/docs/routing/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/AUTO-COMBO.md) · 🇷🇴 [ro](../../../ro/docs/routing/AUTO-COMBO.md) · 🇷🇺 [ru](../../../ru/docs/routing/AUTO-COMBO.md) · 🇱🇰 [si](../../../si/docs/routing/AUTO-COMBO.md) · 🇸🇮 [sl](../../../sl/docs/routing/AUTO-COMBO.md) · 🇷🇸 [sr](../../../sr/docs/routing/AUTO-COMBO.md) · 🇸🇪 [sv](../../../sv/docs/routing/AUTO-COMBO.md) · 🇰🇪 [sw](../../../sw/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ta](../../../ta/docs/routing/AUTO-COMBO.md) · 🇮🇳 [te](../../../te/docs/routing/AUTO-COMBO.md) · 🇹🇭 [th](../../../th/docs/routing/AUTO-COMBO.md) · 🇹🇷 [tr](../../../tr/docs/routing/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/AUTO-COMBO.md) · 🇵🇰 [ur](../../../ur/docs/routing/AUTO-COMBO.md) · 🇺🇿 [uz](../../../uz/docs/routing/AUTO-COMBO.md) · 🇻🇳 [vi](../../../vi/docs/routing/AUTO-COMBO.md) · 🇳🇬 [yo](../../../yo/docs/routing/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/AUTO-COMBO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/AUTO-COMBO.md)

---

> **Pre používateľov**: Hľadáte rýchly začiatok? Jednoduché vysvetlenia a príklady nájdete v [Používateľskej príručke Auto-Combo](../getting-started/AUTO-COMBO-GUIDE.md).

> Samostatne sa spravujúce reťazce modelov s adaptívnym hodnotením + automatickým smerovaním bez konfigurácie

## Automatické smerovanie bez konfigurácie (prefix `auto/`)

> **NOVINKA:** Vytvorenie kombinácie nie je potrebné. Použite prefix `auto/` priamo v ľubovoľnom klientovi.

### Rýchle príklady

| ID modelu      | Variant | Správanie                                                                            |
| -------------- | ------- | ------------------------------------------------------------------------------------ |
| `auto`         | default | Všetci pripojení poskytovatelia, stratégia LKGP, vyvážené váhy                       |
| `auto/coding`  | coding  | Váhy uprednostňujúce kvalitu, vhodné na generovanie kódu                             |
| `auto/fast`    | fast    | Vážený výber s nízkou latenciou                                                      |
| `auto/cheap`   | cheap   | Smerovanie optimalizované podľa nákladov (najprv najnižšie náklady)                  |
| `auto/offline` | offline | Uprednostňuje poskytovateľov s najvyššou dostupnosťou kvóty                          |
| `auto/smart`   | smart   | Uprednostnenie kvality + vyššia miera prieskumu (10 %) na lepšie objavovanie modelov |
| `auto/lkgp`    | lkgp    | Explicitné LKGP (rovnaké ako predvolené `auto`)                                      |
| `auto/chaos`   | chaos   | Váhy vkladania porúch na testovanie odolnosti (chaos engineering)                    |

### Kombinovanie kategórie × úrovne (`auto/<category>:<tier>`)

Prípony v štýle OpenRouter oddeľujú **aký druh trasy** (kategória) od toho, **ako ju optimalizovať** (úroveň), takže ich môžete ľubovoľne kombinovať (#4235 fáza B, `open-sse/services/autoCombo/suffixComposition.ts`):

- **Kategórie** (filtrujú množinu kandidátov podľa schopností): `coding` · `reasoning` · `vision` · `chat` · `multimodal`. `vision`/`multimodal` zachovávajú modely podporujúce obrazový vstup; `reasoning` zachováva modely schopné uvažovania/premýšľania.
- **Úrovne** (vyberajú váhy hodnotenia/filter množiny): `fast` (rýchle nasadenie) · `cheap` (alias `floor`, úspora nákladov) · `reliable` (stav ističa + stabilita latencie) · `free` / `pro` (filtrujú množinu podľa úrovne modelu prostredníctvom `classifyTier` — bezplatná vs. prémiová úroveň).

| Príklad                | Výsledok                                                                 |
| ---------------------- | ------------------------------------------------------------------------ |
| `auto/coding:fast`     | množina na kódovanie, váhy s nízkou latenciou                            |
| `auto/coding:cheap`    | množina na kódovanie, optimalizácia nákladov (alias `auto/coding:floor`) |
| `auto/reasoning:pro`   | iba modely na uvažovanie/premýšľanie, prémiová úroveň                    |
| `auto/vision`          | modely podporujúce obrazový vstup (bez úrovne → vyvážené váhy)           |
| `auto/multimodal:free` | modely s multimodálnymi schopnosťami, iba bezplatná úroveň               |

Každý platný identifikátor `auto/<category>[:<tier>]` sa vyhodnotí podľa potreby; starostlivo vybraná podmnožina sa zverejňuje v `/v1/models` a na ovládacom paneli (`AUTO_SUFFIX_VARIANTS` v `open-sse/services/autoCombo/builtinCatalog.ts`). Filtrovanie je typu **fail-open** — ak obmedzeniu nezodpovedajú žiadne pripojené modely, použije sa celá množina, aby sa smerovanie nikdy neprerušilo. Základný mechanizmus hodnotenia (`combo.ts`) zostáva nezmenený; filter kategórie/úrovne sa použije v `buildAutoCandidates`.

> **Aktuálne informácie o modeloch:** vhodnosť automatického smerovania vychádza z aktuálnych rebríčkov **Arena ELO** + údajov o úrovniach z **models.dev**, keď je zapnutý príznak `ARENA_ELO_SYNC_ENABLED` (inak sa použije statická mapa vhodnosti).

**Ako používať:**

```bash
# Ľubovoľné IDE alebo nástroj CLI, ktorý podporuje formát OpenAI
Base URL: http://localhost:20128/v1
API Key:  <your-endpoint-key>

# Vo svojom kóde/konfigurácii nastavte model na:
model: "auto"                 # vyvážené predvolené nastavenie
model: "auto/coding"          # najlepšie na úlohy programovania
model: "auto/fast"            # najrýchlejší dostupný
model: "auto/cheap"           # najlacnejší na token
```

**Čo sa stane:**

1. OmniRoute zistí prefix `auto/` v `src/sse/handlers/chat.ts`
2. Z databázy načíta všetky **aktívne pripojenia poskytovateľov**
3. Vyfiltruje tie, ktoré majú platné prihlasovacie údaje (kľúč API alebo token OAuth)
4. Určí model pre každé pripojenie (`connection.defaultModel` alebo prvý model poskytovateľa)
5. Vytvorí **virtuálnu kombináciu** v pamäti (neuloží sa do DB)
6. Vykoná smerovanie pomocou váhového profilu vybraného variantu + stratégie LKGP

**Kľúčové vlastnosti:**

- ✅ **Vždy zapnuté:** Nie je potrebný prepínač, vytvorenie kombinácie ani žiadna konfigurácia
- ✅ **Dynamické:** Automaticky zohľadňuje aktuálne pripojených poskytovateľov
- ✅ **Stálosť relácie:** LKGP zabezpečuje uprednostnenie posledného úspešného poskytovateľa
- ✅ **Podpora viacerých účtov:** Každé pripojenie poskytovateľa sa stane samostatným kandidátom
- ✅ **Žiadne zápisy do DB:** Virtuálna kombinácia existuje iba počas požiadavky, bez režijných nákladov na uchovávanie

### Ovládanie kandidátov podľa kľúča (#7819, úroveň 1+2)

`GET /v1/auto-combo/{channel}/candidates` (`{channel}` = prípona za `auto/` alebo
doslovné `auto` pre základný kanál) je koncový bod **iba na čítanie**, ktorý uvádza
aktuálnu množinu kandidátov kanála `auto/*` doplnenú o aktuálnu dostupnosť, pričom
opätovne používa existujúce čítania odolnosti (nikdy nie nespracovaný `state` ističa):

- istič poskytovateľa — `getCircuitBreaker(provider).getStatus()` / `.canExecute()`
- čas na zotavenie pripojenia — `rateLimitedUntil` / `testStatus` vo vyhodnotenom
  riadku `provider_connections`
- zablokovanie modelu — `isModelLocked(provider, connectionId, model)`

Každý kandidát obsahuje aj príznak `excluded` pre tento kľúč API. Vylúčenia sa ukladajú
pre každý kľúč API samostatne (tabuľka `auto_candidate_overrides`, migrácia `128`) — OmniRoute
je systém pre jedného nájomcu bez tabuľky `users`, takže `apiKeyId` je najbližšia skutočná
identita jednotlivého volajúceho — a vynucujú sa v kritickom bode množiny kandidátov v
`open-sse/services/autoCombo/virtualFactory.ts` prostredníctvom čistej, jednotkovo testovanej
funkcie `filterExcludedCandidates()` (`open-sse/services/autoCombo/candidateOverrides.ts`).
Filter je typu **fail-open**: nenastavené apiKeyId/kanál aj zlyhanie vyhľadávania v DB
ponechajú množinu nefiltrovanú, takže operátor bez nakonfigurovaných výnimiek dostane smerovanie
bajtovo identické so stavom pred zavedením tejto funkcie.

**Odložené do nadväzujúceho problému:** váhy jednotlivých kandidátov + explicitné poradie (Úroveň 3
— využíva existujúce cesty stratégií váženia/priority) a pripnutie konkrétnej stratégie
`combo.ts` ku každému kanálu `auto/*` (Úroveň 4). Otvorenú otázku, či majú prepísania vzhľadom na
model s jedným nájomníkom zostať viazané na jednotlivé kľúče API alebo sa majú stať globálnymi,
nájdete v pláne #7819.

**Na pozadí:**

```txt
Požiadavka: { model: "auto/coding" }
   ↓
src/sse/handlers/chat.ts rozpozná prefix
   ↓
createVirtualAutoCombo('coding') → candidatePool z aktívnych pripojení
   ↓
handleComboChat (rovnaký mechanizmus ako pri uložených kombináciách)
   ↓
Automatické bodovanie vyberie najlepšieho poskytovateľa/model pre každú požiadavku
```

**Súbory implementácie:**

| Súbor                                                     | Účel                                                       |
| --------------------------------------------------------- | ---------------------------------------------------------- |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Analyzátor prefixu (`parseAutoPrefix`)                     |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Vytvára virtuálne objekty `AutoComboConfig`                |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Testovací mechanizmus na simuláciu registra poskytovateľov |
| `src/sse/handlers/chat.ts`                                | Integrácia: skrátené spracovanie prefixu auto              |
| `src/shared/constants/providers.ts`                       | Systémová položka `SYSTEM_PROVIDERS.auto`                  |

## Názvy kombinácií zhodné so skutočným identifikátorom modelu

Kombinácia, ktorej `name` je zhodný s holým identifikátorom modelu (napr. kombinácia s názvom
`gpt-5.5`), je **zámerný a podporovaný vzor**, nie chyba: ide o
mechanizmus záložného prepínania poskytovateľov pre jednotlivé identifikátory modelov, zdokumentovaný v
[#6940](https://github.com/diegosouzapw/OmniRoute/issues/6940). Keďže rozlíšenie
kombinácie sa kontroluje pred rozlíšením holého identifikátora modelu
(`getComboForModel()` v `src/sse/services/model.ts`), požiadavka na holý
identifikátor `gpt-5.5` je smerovaná cez ciele kombinácie (napr.
`acme-responses/gpt-5.5`, `backup-responses/gpt-5.5`) namiesto priameho smerovania
k jedinému poskytovateľovi — opätovne sa tým využíva priorita kombinácie pred prepisovaním, vytvorená pre
[#3227/#3233](https://github.com/diegosouzapw/OmniRoute/issues/3227), a regresne sa testuje pomocou `tests/unit/responses-combo-resolution-3227.test.ts` a
`tests/unit/combo-name-codex-responses-rewrite.test.ts`.

Vytvorenie alebo premenovanie kombinácie na názov, ktorý prekrýva skutočný identifikátor modelu,
sa **nikdy neodmietne** — takýto postup by narušil tento zdokumentovaný pracovný postup. Namiesto toho
(#8530) pripájajú `POST /api/combos` a `PUT /api/combos/[id]` k odpovedi neblokujúce
pole `warning`, keď sa (nový) názov zhoduje so skutočným
identifikátorom modelu:

```json
{
  "warning": {
    "code": "COMBO_NAME_SHADOWS_MODEL",
    "modelId": "gpt-5.5",
    "providerId": "openai"
  }
}
```

Pri spustení funkcia `scanComboModelNameCollisionsAtBoot()`
(`src/instrumentation-node.ts`) tiež zaznamená jednoriadkové upozornenie `[STARTUP]`
s výpočtom všetkých existujúcich kombinácií, ktoré prekrývajú identifikátor modelu, aby prevádzkovatelia,
ktorí na túto situáciu narazia omylom (namiesto zámerného použitia podľa #6940), dostali upozornenie.
Pomocná funkcia na detekciu sa nachádza v `src/lib/combos/modelNameCollision.ts`.

## Volanie vlastnej kombinácie z klienta

Uložené kombinácie (Nastavenia → Kombinácie) sa použijú iba vtedy, keď klient odošle **presný názov** kombinácie v poli `model` — názov kombinácie sa neporovnáva približne ani čiastočne a nepoužíva sa žiadna predpona `auto/`. Poradie rozlíšenia (`getComboForModel()` v `src/sse/services/model.ts`):

1. presná zhoda názvu kombinácie (`model: "my-combo"`),
2. predpona `combo/<name>` (`model: "combo/my-combo"`),
3. mapovania modelov na kombinácie pomocou glob vzorov (`/api/model-combo-mappings`).

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"my-combo","messages":[{"role":"user","content":"Hello"}]}'
```

Dve bežné nástrahy:

- **`auto` nepoužíva vaše kombinácie.** `auto`/`auto/*` vytvára vlastnú množinu kandidátov bez potreby konfigurácie a uložené kombinácie zohľadní iba vtedy, ak má niektorá kombinácia doslova názov `auto` (neodporúča sa). Ak chcete smerovať cez kombináciu, odošlite jej presný názov — nie `auto`.
- **`openrouter/auto` je skutočný platený produkt OpenRouter** („Auto Best Available“), nie alias OmniRoute. Ide o jedinú statickú položku modelu v registri OpenRouter (`open-sse/config/providers/registry/openrouter/index.ts`) a účtuje sa samostatne. Ak ho chcete vylúčiť z množín `auto`, použite Nastavenia → Smerovanie → Skryť platené modely.

Pôvodné nejasnosti, ktoré táto dokumentácia objasňuje, nájdete v [#7992](https://github.com/diegosouzapw/OmniRoute/issues/7992) a [#7111](https://github.com/diegosouzapw/OmniRoute/issues/7111).

## Ako to funguje (perzistentné automatické kombinácie)

Mechanizmus automatických kombinácií dynamicky vyberá najlepšieho poskytovateľa/model pre každú požiadavku pomocou **16-faktorovej skórovacej funkcie** (definovanej v `open-sse/services/autoCombo/scoring.ts` → `DEFAULT_WEIGHTS`). Súčet predvolených váh je `1.0`; vlastné váhy sa opätovne normalizujú pomocou `normalizeScoringWeights()`. Dva zo šestnástich faktorov — `cacheAffinity` a `resetWindowAffinity` — majú predvolenú váhu `0`; faktor `reliability` má v `DEFAULT_WEIGHTS` hodnotu `0`, ale vo všeobecných balíkoch `0.03` a v balíku `reliability-first` hodnotu `0.04`, zatiaľ čo faktor `quality` má v balíkoch hodnotu `0.02` (v balíku `quality-first` hodnotu `0.03`): napriek tomu sa vypočítavajú pre každého kandidáta a `cacheAffinity` riadi deduplikáciu vyrovnávacej pamäte promptov mimo skóre, takže faktory s predvolenou nulovou váhou predvolene nehlasujú, no v balíkoch sa používajú.

![16-faktorové skórovanie automatických kombinácií](../diagrams/exported/auto-combo-scoring.svg)

> Zdroj: [diagrams/auto-combo-scoring.mmd](../diagrams/auto-combo-scoring.mmd) (znova vygenerujte pomocou `npm run docs:render-diagrams`). Názov súboru je historický; zdrojový aj vykreslený diagram zobrazujú všetkých 16 faktorov deklarovaných v `DEFAULT_WEIGHTS`.

| Faktor                | Predvolená váha | Popis                                                                                                                                                                                                                                            |
| :-------------------- | :-------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `quota`               | 0.1429          | Zostávajúca kvóta / rezerva limitu frekvencie [0..1]                                                                                                                                                                                             |
| `health`              | 0.1605          | Skóre stavu z ističa (CLOSED=1.0, HALF_OPEN=0.5, OPEN=0.0)                                                                                                                                                                                       |
| `costInv`             | 0.1429          | Inverzné **kombinované** náklady (60 % cena vstupných + 40 % cena výstupných tokenov, normalizované) — nižšia cena = vyššie skóre                                                                                                                |
| `latencyInv`          | 0.1143          | Inverzná latencia p95 normalizovaná vzhľadom na fond — rýchlejšie = vyššie skóre                                                                                                                                                                 |
| `taskFit`             | 0.0762          | Vhodnosť pre typ úlohy (programovanie, kontrola, plánovanie, analýza, ladenie, dokumentácia)                                                                                                                                                     |
| `stability`           | 0.0476          | Stabilita založená na variancii zo štandardnej odchýlky latencie — kandidát s výrazne kolísajúcim časom odozvy získava nižšie skóre                                                                                                              |
| `tierPriority`        | 0.0476          | Priorita úrovne účtu — Ultra=1.0, Pro=0.67, Standard=0.33, Free=0.0                                                                                                                                                                              |
| `tierAffinity`        | 0.0476          | Zhoda medzi úrovňou kandidáta a úrovňou odporúčanou manifestom                                                                                                                                                                                   |
| `specificityMatch`    | 0.0476          | Zhoda medzi špecifickosťou požiadavky (pomôcka manifestu) a úrovňou modelu                                                                                                                                                                       |
| `contextAffinity`     | 0.0476          | Zhoda medzi požadovanou veľkosťou kontextového okna požiadavky a kontextovým oknom modelu                                                                                                                                                        |
| `sessionAvailability` | 0.0476          | Dostupnosť relácie OAuth kandidátskeho pripojenia pre túto reláciu (`getOAuthSessionAvailability()`; pripojenia bez OAuth získavajú skóre 1.0)                                                                                                   |
| `connectionDensity`   | 0.0476          | Rozkladá záťaž medzi pripojenia rovnakého poskytovateľa (proti koncentrácii)                                                                                                                                                                     |
| `cacheAffinity`       | 0.00            | Afinita založená na rendezvous hashovaní smerom k pripojeniu, ktoré už s najväčšou pravdepodobnosťou obsahuje prefix vyrovnávacej pamäte promptu tejto požiadavky (`open-sse/services/combo/promptCacheAffinity.ts`); predvolene vypnuté (#8008) |
| `resetWindowAffinity` | 0.00            | Uprednostnenie pripojení, ktorých okno obnovenia kvóty je výhodné (predvolene vypnuté)                                                                                                                                                           |
| `quality`             | 0.03            | Signál kvality výstupu založený na spätnej väzbe zo sledovacieho nástroja kvality udalostí smerovania; kandidáti bez pozorovaní dostanú neutrálne skóre 0.5                                                                                      |
| `reliability`         | 0.00            | Pozorovaný podiel úspešnosti, `1 - failureRate`, z 24-hodinovej histórie používania po dosiahnutí minima desiatich vzoriek (inak metriky v reálnom čase); kandidáti bez pozorovaní majú hodnotu 1.0. Predvolene vypnuté                          |

**Súčet:** `0.1429 + 0.1605 + 0.1429 + 0.1143 + 0.0762 + (7 × 0.0476) + 0.00 + 0.00 + 0.03 + 0.00 = 1.0`, ako je deklarované v `DEFAULT_WEIGHTS`; používateľom nakonfigurované váhy sa pred skórovaním opätovne normalizujú do rozdelenia pomocou `normalizeScoringWeights()`.

## Balíky režimov

6 preddefinovaných profilov váh v `open-sse/services/autoCombo/modePacks.ts`. Každý balík úplne nahrádza predvolené váhy, aby uprednostnil výber zameraný na jeden cieľ. Súčet hodnôt každého balíka je už `1.0` (`0.9999` pri zobrazení na štyri desatinné miesta), takže `normalizeScoringWeights()` pri aktívnom balíku nemá čo zmysluplne upravovať — nižšie uvedené hodnoty sú po zaokrúhlení tie, ktoré hodnotiaci mechanizmus používa.

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

Poznámky:

- **Balíky obsahujú `quality` a `reliability`** (`quality 0.02`, pri `quality-first 0.03`; `reliability 0.03`, pri `reliability-first 0.04`) a úplne nahrádzajú mapu váh (`weights = pack`, nejde o zlúčenie). `DEFAULT_WEIGHTS` obsahuje `quality 0.03 / reliability 0`; výber možnosti `balanced`/`default` zachová tieto predvolené hodnoty, zatiaľ čo výber balíka použije jeho hodnoty uvedené vyššie. V studenom poole (zatiaľ bez pozorovaní, takže `quality 0.5` a `reliability 1`) pridajú tieto dva faktory pri všeobecnom balíku hodnotu `+0.04` (`0.03 + 0.01`), pri `quality-first` hodnotu `+0.045` a pri `reliability-first` hodnotu `+0.05`.
- `tierAffinity`, `specificityMatch` a `resetWindowAffinity` majú v každom balíku explicitne nastavenú hodnotu `0`.
- Stručný prehľad zamerania jednotlivých balíkov:
  - **ship-fast** → latencyInv 0.3048 + health 0.2667 (zdravé pripojenia s nízkou latenciou)
  - **cost-saver** → costInv 0.3324 (vyhrávajú najlacnejšie tokeny)
  - **quality-first** → taskFit 0.3524 + stability 0.1429 + quality 0.03, najvyššia hodnota spomedzi všetkých balíkov (najlepší model pre danú úlohu, konzistentný)
  - **offline-friendly** → quota 0.3324 + health 0.2667 (maximálna rezerva bez ohľadu na rýchlosť alebo náklady)
  - **reliability-first** → health 0.3524 + stability 0.1905 + reliability 0.04, najvyššia hodnota spomedzi všetkých balíkov (najmenej prekvapení)
  - **chaos-mode** → health 0.4000 + taskFit 0.1905 (profil na vkladanie porúch)

### Ovládacie prvky pre jednotlivé požiadavky (hlavičky) — #6023 / #6024 / #6025 / #3470

Kombináciu `auto` možno riadiť **pre každú požiadavku samostatne** prostredníctvom troch hlavičiek bez toho, aby sa zmenila uložená konfigurácia
kombinácie. Tieto nastavenia sa vzťahujú iba na stratégiu `auto` a iba na požiadavku,
ktorá ich obsahuje; ak hlavička chýba, použijú sa uložené hodnoty `modePack`/`budgetCap`/`budgetFallback`
danej kombinácie.

| Hlavička                      | Akceptuje                                                                                                                                                                                             | Účinok                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| :---------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `X-OmniRoute-Mode`            | alias predvoľby (`fast`, `balanced`, `quality`, `cheap`, `reliable`, `offline`) alebo nespracovaný názov balíka (`ship-fast`, `cost-saver`, `quality-first`, `offline-friendly`, `reliability-first`) | Prepíše váhy hodnotenia pre túto požiadavku. `balanced`/`default` vynútia predvolené váhy (bez balíka). Neznáme hodnoty sa ignorujú (konfigurácia sa zachová).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `X-OmniRoute-Budget`          | kladné číslo (maximálna suma v USD na požiadavku)                                                                                                                                                     | Pevný strop nákladov: kandidáti, ktorých odhadované náklady ho prekračujú, sa pred výberom odfiltrujú. Správanie v prípade, že ho prekračuje **každý** kandidát, riadi nižšie uvedená hlavička `X-OmniRoute-Budget-Fallback`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `X-OmniRoute-Budget-Fallback` | `cheapest` (predvolené, aliasy: `cheapest-viable`, `soft`) alebo `strict` (aliasy: `block`, `hard`)                                                                                                   | `cheapest`: použije ako náhradnú možnosť globálne najlacnejšieho kandidáta, aj keď stále prekračuje limit (pôvodné správanie). `strict`: odmietne vykonať výber — požiadavka okamžite zlyhá s `HTTP 402` namiesto tichého prekročenia rozpočtu. Neznáme hodnoty sa ignorujú.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `X-OmniRoute-Effort`          | `auto` (ostatné hodnoty sú rezervované)                                                                                                                                                               | Adaptívny rozpočet na premýšľanie: keď požiadavka neobsahuje **žiadne** pole uvažovania v akejkoľvek podobe (`reasoning_effort`, `reasoning`, `thinking`), brána prevedie hodnotu `auto` na `low`/`medium`/`high` na základe deterministických signálov štruktúry požiadavky (dĺžka poslednej správy používateľa, veľkosť kontextu po poslednú správu používateľa, predchádzajúce výsledky nástrojov, hĺbka cyklu nástrojov). Signály sú obmedzené na aktuálny ťah — všetko za poslednou správou používateľa sa ignoruje — takže každá požiadavka v cykle nástrojov sa vyhodnotí na rovnakú úroveň (bezstavové pripnutie na jeden ťah, žiadny stav relácie, žiadne zvýšenie úrovne uprostred cyklu, ktoré by narušilo prefixy vyrovnávacej pamäte promptov nadradeného systému). Explicitné pole uvažovania od klienta má vždy prednosť. Vzťahuje sa na požiadavky, ktorých odoslanie do nadradeného systému sa vyhodnotí na formát OpenAI Chat Completions (`targetFormat === FORMATS.OPENAI`) — `reasoning_effort` je pole vo formáte OpenAI, takže hlavička nemá žiadny účinok na požiadavku smerovanú na Claude alebo Gemini (pozrite si `open-sse/handlers/chatCore/adaptiveEffortWiring.ts`). |

```bash
# Vynúti najrýchlejší profil, obmedzí túto požiadavku na $0.05 a namiesto prekročenia rozpočtu ju striktne zablokuje
curl -sS http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "X-OmniRoute-Mode: fast" \
  -H "X-OmniRoute-Budget: 0.05" \
  -H "X-OmniRoute-Budget-Fallback: strict" \
  -d '{"model":"auto","messages":[{"role":"user","content":"hi"}]}'
```

Vyhodnotenie je čistá funkcia (`open-sse/services/autoCombo/requestControls.ts`); výsledné
hodnoty sa odovzdajú do existujúcich vstupov jadra `config.modePack` / `config.budgetCap` /
`config.budgetFallback`. Uložená hodnota `config.budgetFallback` kombinácie („strict“ |
„cheapest“) nastavuje trvalú politiku; hlavička ju prepíše pre jednu požiadavku.

## Všetky stratégie smerovania

Kombinačný mechanizmus OmniRoute podporuje **19 stratégií smerovania** (deklarovaných v `src/shared/constants/routingStrategies.ts` → `ROUTING_STRATEGY_VALUES`). Samotný mechanizmus Auto Combo je dostupný prostredníctvom stratégie `auto`; ostatné sú k dispozícii pre uložené kombinácie.

| Stratégia           | Opis                                                                                                                                                                                                                                                       |
| :------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `priority`          | Usporiadaný zoznam s prvým cieľom a explicitnou prioritou                                                                                                                                                                                                  |
| `weighted`          | Vážený náhodný výber podľa váhy jednotlivých cieľov                                                                                                                                                                                                        |
| `round-robin`       | Postupné cyklické prechádzanie cieľov                                                                                                                                                                                                                      |
| `context-relay`     | Odovzdávanie kontextu medzi cieľmi (dlhé konverzácie)                                                                                                                                                                                                      |
| `fill-first`        | Vyčerpanie kvóty každého cieľa pred prechodom na ďalší                                                                                                                                                                                                     |
| `p2c`               | Náhodné vyvažovanie záťaže metódou výberu z 2 možností                                                                                                                                                                                                     |
| `random`            | Rovnomerný náhodný výber                                                                                                                                                                                                                                   |
| `least-used`        | Výber cieľa s najnižšou aktuálnou záťažou                                                                                                                                                                                                                  |
| `cost-optimized`    | Minimalizácia ceny v $ za požiadavku podľa katalógových cien                                                                                                                                                                                               |
| `reset-aware` ⭐    | Uprednostnenie podľa času obnovenia kvóty — kratšie intervaly obnovenia sú zaradené vyššie                                                                                                                                                                 |
| `reset-window`      | Uprednostnenie cieľov, ktorých interval kvóty sa obnoví najskôr                                                                                                                                                                                            |
| `headroom`          | Výber cieľa s najväčšou zostávajúcou rezervou kvóty                                                                                                                                                                                                        |
| `strict-random`     | Náhodný výber bez deduplikácie opakovaní                                                                                                                                                                                                                   |
| `auto`              | Použitie hodnotenia Auto Combo (16 faktorov) — **odporúčané**                                                                                                                                                                                              |
| `lkgp`              | Posledná známa funkčná cesta (pripne sa k poslednému úspešnému poskytovateľovi a následne použije záložné pravidlá)                                                                                                                                        |
| `context-optimized` | Výber cieľa, ktorý najlepšie vyhovuje aktuálnej veľkosti kontextu                                                                                                                                                                                          |
| `cache-optimized`   | Zmena poradia cieľov podľa afinity vyrovnávacej pamäte promptov — ako prvé sa vyskúša pripojenie, ktoré už s najväčšou pravdepodobnosťou obsahuje prefix tejto požiadavky vo vyrovnávacej pamäti (`open-sse/services/combo/promptCacheAffinity.ts`, #8008) |
| `fusion` 🧬         | Paralelné rozoslanie požiadavky panelu modelov a následné zlúčenie do jednej odpovede pomocou posudzovacieho modelu (pozri nižšie)                                                                                                                         |
| `pipeline`          | Sekvenčné spustenie cieľov, pričom výstup každého kroku sa odovzdáva ako vstup nasledujúcemu kroku; vráti sa iba konečná odpoveď (#6396)                                                                                                                   |

⭐ = Nové vo v3.8.0 · 🧬 = Nové vo v3.8.36

### Sémantika stratégie `weighted`

`weighted` predstavuje **proporcionálny náhodný výber pre každú požiadavku**
(`open-sse/services/combo/targetSorters.ts` → `selectWeightedTarget`), nie mechanizmus vyrovnávania:

- Pre každú požiadavku sa vyberie **jeden** krok s pravdepodobnosťou `weight / totalWeight`; zostávajúce kroky
  sú pre danú požiadavku zoradené podľa klesajúcej váhy ako záložný reťazec.
- Krok, ktorého váha je `0` (alebo chýba), sa **nikdy nevyberie**, pokiaľ má akýkoľvek iný krok
  váhu > 0 — môže slúžiť iba ako záloha po zlyhaní vybraného kroku. Výber sa stane rovnomerným iba vtedy, keď sú **všetky**
  váhy 0.
- Kroky, ktorých ciele sú všetky nedostupné — istič poskytovateľa v stave `OPEN`, doba čakania
  pripojenia, zablokovanie modelu — sa z výberu odstránia ešte pred jeho vykonaním
  (`open-sse/services/combo/targetResolution.ts`), takže jediný funkčný krok môže dočasne
  vyhrať pri každej požiadavke.
- `stickyWeightedLimit` (konfigurácia kombinácie, predvolená hodnota `1` = vypnuté) pripne vybraný krok na daný počet
  po sebe nasledujúcich úspešných vykonaní pred ďalším výberom.

Na striktne cyklické striedanie použite `round-robin`; rovnaké váhy pri stratégii `weighted` poskytujú štatistické — nie
striktné — vyváženie.

## Stratégia Fusion

`fusion` je jediná stratégia, ktorá **nevyberá** jeden cieľ. Požiadavku odošle
**paralelne každému modelu v paneli** a následne konfigurovateľný **hodnotiaci model** syntetizuje
jednu konečnú odpoveď zo všetkých odpovedí panelu. Portované z upstream projektu `decolua/9router`
(návrh Fusion od OpenRouter); implementácia sa nachádza v `open-sse/services/fusion.ts`.

Ako to funguje:

0. **Obídenie pri použití nástrojov** — požiadavka, ktorá obsahuje neprázdne pole `tools`
   a ktorej `tool_choice` nie je explicitne nastavené na `"none"`, úplne preskočí panel:
   smeruje priamo do jedného modelu (nakonfigurovaného hodnotiaceho modelu alebo `panel[0]`),
   pričom `tools`/`tool_choice` sa odovzdajú bez úprav. Členovia panelu nemajú prístup
   k nástrojom a direktíva hodnotiaceho modelu pre syntézu ho odrádza od generovania volaní
   nástrojov, takže agentné klienty a klienty používajúce volania nástrojov získajú skutočné
   rozhodnutie o volaní nástroja namiesto syntetizovaného textu (#6771).
1. **Paralelné rozoslanie** (iba požiadavky bez nástrojov) — požiadavka sa odošle naraz
   každému modelu v paneli, pričom je vynútený režim bez streamovania a nástroje sú odstránené
   (hodnotiaci model potrebuje na syntézu úplný text).
2. **Zhromažďovanie s kvórom a dodatočnou lehotou** — hneď ako dorazí `minPanel` odpovedí,
   spustí sa krátky časovač dodatočnej lehoty pre oneskorené modely a po jeho uplynutí
   pokračuje Fusion so všetkými zhromaždenými odpoveďami. Tým sa obmedzí vplyv najpomalšieho
   modelu na celkový čas, ktorý je navyše ohraničený pevným časovým limitom.
3. **Syntéza hodnotiacim modelom** — odpovede panelu sú anonymizované (`Zdroj 1`, `Zdroj 2`, … —
   aby hodnotiaci model posudzoval obsah, nie značku modelu) a odovzdané hodnotiacemu modelu,
   ktorý analyzuje zhodu / rozpory / čiastočné pokrytie / jedinečné postrehy / slepé miesta
   a následne vytvorí **jednu** autoritatívnu odpoveď. Volanie hodnotiaceho modelu zachováva
   pôvodný príznak `stream` klienta aj nástroje, takže streamovanie a následné použitie
   nástrojov naďalej fungujú.
4. **Postupná degradácia** — 0 odpovedí panelu → `503`; presne 1 úspešná odpoveď → táto odpoveď
   sa vráti priamo (nie je čo spájať); panel s jediným modelom odpovedá priamo.

Členom panelu môže byť aj krok `combo-ref` (`{kind: "combo-ref", comboName: "..."}`), ktorý odkazuje
na inú kombináciu — vyhodnotí sa ako **jeden samostatný hlas panelu** (úplné rekurzívne odoslanie
do odkazovanej kombinácie, nie paralelné rozoslanie na jednotlivé ciele danej kombinácie), s rovnakou
ochranou pred nadmernou hĺbkou a cyklami, akú už používajú všetky ostatné stratégie pracujúce
s `combo-ref` (#6764).

### Konfigurácia

Konfiguruje sa v objekte `config` danej kombinácie (bez migrácie schémy — opätovne sa používa
existujúca tabuľka `combos`):

| Pole                                     | Typ      | Predvolená hodnota  | Účel                                                                                               |
| :--------------------------------------- | :------- | :------------------ | :------------------------------------------------------------------------------------------------- |
| `config.judgeModel`                      | `string` | prvý model v paneli | Model, ktorý syntetizuje konečnú odpoveď                                                           |
| `config.fusionTuning.minPanel`           | `number` | `2`                 | Počet úspešných odpovedí potrebných na spustenie dodatočnej lehoty (obmedzený na `[2, panelSize]`) |
| `config.fusionTuning.stragglerGraceMs`   | `number` | `8000`              | Ako dlho čakať na oneskorené modely po dosiahnutí kvóra                                            |
| `config.fusionTuning.panelHardTimeoutMs` | `number` | `90000`             | Absolútny limit, aby jeden zaseknutý model nemohol zablokovať požiadavku                           |

Predvolené hodnoty sú definované v `FUSION_DEFAULTS` (`open-sse/services/fusion.ts`).

### Príklad

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

Potom ju volajte ako ľubovoľnú inú kombináciu: `{"model":"fusion-panel","messages":[...]}`.

## Virtuálna továreň Auto-Combo

Mechanizmus Auto Combo nevyžaduje vopred definované kombá. Namiesto toho `open-sse/services/autoCombo/virtualFactory.ts` vytvára kandidátov dynamicky:

1. Načíta `getProviderConnections({ isActive: true })` (všetky povolené pripojenia)
2. Vyfiltruje tie, ktoré majú platné prihlasovacie údaje (kľúč API alebo neexpirovaný token OAuth overený pomocou `hasUsableOAuthToken()`)
3. Porovná ich s `getProviderRegistry()` s cieľom zistiť dostupnosť modelov a ceny
4. Pre každú trojicu `(provider, model, connection)` vytvorí `VirtualAutoComboCandidate`
5. Ako cieľ odoslania vyberie `connection.defaultModel` (alebo prvý model v registri)
6. Každého kandidáta ohodnotí pomocou 16-faktorovej funkcie `scorePool()` a balíka váh daného variantu
7. Vráti výslednú konfiguráciu `AutoComboConfig` v pamäti pre `handleComboChat()` — nikdy sa neukladá do DB

To znamená, že **pridanie nového poskytovateľa s povoleným `auto/*` automaticky rozšíri množinu kandidátov** — nie je potrebné manuálne upravovať kombo. Virtuálne kombo sa vytvára nanovo pri každej požiadavke, takže novo pridané alebo opätovne funkčné pripojenia sa zohľadnia okamžite.

## Samooprava

- **Dočasné vylúčenie**: Skóre < 0.2 → vylúčenie na 5 min. (progresívne predlžovanie, max. 30 min.)
- **Zohľadnenie ističa**: OPEN → automaticky vylúčené; HALF_OPEN → skúšobné požiadavky
- **Režim incidentu**: >50 % OPEN → vypnutie prieskumu, maximalizácia stability
- **Obnovenie po prestávke**: Po skončení vylúčenia je prvá požiadavka „skúšobná“ so skráteným časovým limitom

## Prieskum pomocou banditového algoritmu

5 % požiadaviek (konfigurovateľné) sa na účely prieskumu smeruje k náhodným poskytovateľom. V režime incidentu je táto funkcia vypnutá.

## API

**Neexistuje žiadny vyhradený koncový bod `POST /api/combos/auto`** — Auto-Combo sa používa dvoma spôsobmi:

1. **Bez konfigurácie (odporúčané):** Odošlite ľubovoľnú požiadavku na dokončenie konverzácie s `model: "auto"` alebo `model: "auto/<variant>"`. Virtuálna továreň vytvorí kombo pre každú požiadavku — bez ukladania a bez potreby volaní API.

2. **Uložené kombo so `strategy: "auto"`:** Vytvorte bežné kombo prostredníctvom `POST /api/combos` a nastavte `strategy: "auto"` spolu s `config.auto.weights` / `config.auto.candidatePool`. Použije sa rovnaký mechanizmus hodnotenia; kombo sa uloží do `combos` a možno ho opakovane používať podľa ID.

Na zisťovanie dostupných možností `GET /api/combos/auto` vypíše každý variant spolu s jeho vyhodnotenou množinou kandidátov a hodnotami `context_length` / `max_output_tokens` — ide o MAXIMÁLNE hodnoty naprieč kontextovými oknami množiny kandidátov. Klienti (napr. doplnok opencode) musia namiesto `0` uvádzať tieto hodnoty: nulový kontext úplne vypne automatickú kompakciu opencode, čo umožní reláciám rásť, až kým čistenie histórie na bráne nezničí kontext. Uvádzanie MAXIMÁLNEJ hodnoty je bezpečné, pretože predbežný filter kontextu Auto-Combo smeruje nadmerne veľké požiadavky ku kandidátom s veľkým kontextovým oknom.

```bash
# Použitie bez konfigurácie (bez vytvorenia komba)
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"auto/coding","messages":[{"role":"user","content":"Hello"}]}'

# Uložené automatické kombo prostredníctvom bežného koncového bodu pre kombá
curl -X POST http://localhost:20128/api/combos \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","strategy":"auto","config":{"auto":{"candidatePool":["anthropic","google","openai"],"weights":{"quota":0.15,"health":0.3,"costInv":0.05,"latencyInv":0.35,"taskFit":0.1,"stability":0,"tierPriority":0.05}}}}'
```

### Stratégie automatického smerovača

Uložené kombá so `strategy: "auto"` môžu nastaviť `config.routerStrategy` (alebo starší
`config.auto.routerStrategy`) na jednu z nasledujúcich hodnôt:

- `rules` — predvolené vážené hodnotenie
- `score` — vyberie najvyššie nakonfigurované vážené skóre. Pri presnej zhode sa zachová nakonfigurované
  poradie kandidátov; existujúca hodnota `explorationRate` vyberá vzorky z celej zoradenej množiny.
- `cost` / `eco` — najlacnejší funkčný poskytovateľ
- `latency` / `fast` — najnižšia latencia p95 s penalizáciou za nespoľahlivosť
- `sla-aware` / `sla` — uprednostní kandidátov, ktorí spĺňajú požiadavky SLO na latenciu p95, chybovosť a voliteľne
  náklady
- `lkgp` — najprv posledný známy funkčný poskytovateľ

### Podrobný opis stratégií smerovača

Mechanizmus Auto-Combo sprístupňuje 6 zameniteľných implementácií **RouterStrategy**, ktoré
môžete prepínať prostredníctvom `config.routerStrategy` (alebo staršieho `config.auto.routerStrategy`).
Každá stratégia vyberie jedného poskytovateľa z množiny kandidátov podľa `RoutingContext`
(typ úlohy, informácie o nástrojoch/vizuálnych vstupoch, odhad počtu tokenov, voliteľné pravidlá SLA a voliteľný
posledný známy funkčný poskytovateľ).

#### 1. `rules` (predvolené) — 16-faktorové vážené hodnotenie

Obaľuje existujúci mechanizmus hodnotenia. Vyfiltruje kandidátov s ističom v stave `OPEN`
a potom spustí `scorePool()` s aktuálnym typom úlohy a `getTaskFitness()`,
pričom vyberie poskytovateľa s najvyšším skóre.

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

**Kedy použiť**: Predvolená možnosť. Použite ju, keď chcete vyvážený kompromis medzi všetkými signálmi.

**Alias**: `rules` (bez aliasu)

---

#### 2. `cost` / `eco` — najlacnejší funkčný poskytovateľ

Zoradí množinu kandidátov podľa `costPer1MTokens` (vzostupne) a vyberie najlacnejšieho.
Najprv vyfiltruje kandidátov v stave `OPEN`.

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

**Kedy použiť**: Úlohy citlivé na náklady, dávkové spracovanie alebo úlohy na pozadí.

**Aliasy**: `cost`, `eco`

---

#### 3. `latency` / `fast` — najnižšia latencia p95 s penalizáciou za nespoľahlivosť

Zoraďuje podľa `p95LatencyMs + (errorRate * 1000)`. Penalizácia miery chybovosti zabezpečuje,
že nespoľahliví poskytovatelia sú umiestnení nižšie, aj keď je ich nominálna latencia nízka.

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

**Kedy použiť**: Úlohy citlivé na latenciu, ako sú chat v reálnom čase, automatické dopĺňanie alebo
interaktívni asistenti na programovanie.

**Aliasy**: `latency`, `fast`

---

#### 4. `sla-aware` / `sla` — súlad s cieľmi SLO pre latenciu/chybovosť/náklady

Hodnotí každého kandidáta podľa toho, ako dobre spĺňa nakonfigurovanú politiku SLO:

| Faktor           | Váha | Vzorec                                                   |
| ---------------- | ---- | -------------------------------------------------------- |
| Skóre latencie   | 35%  | `threshold / max(value, ε)`                              |
| Skóre chybovosti | 35%  | `threshold / max(value, ε)`                              |
| Skóre stavu      | 15%  | `1.0` (CLOSED) / `0.5` (HALF_OPEN) / `0.0` (OPEN)        |
| Skóre nákladov   | 10%  | `threshold / max(value, ε)` alebo inverzne normalizované |
| Skóre stability  | 5%   | inverzne normalizovaná štandardná odchýlka latencie      |

Keď je nastavené `hardConstraints: true`, kandidáti sa zoraďujú primárne podľa **skóre porušenia**
(o koľko prekračujú niektorý cieľ SLO) a následne podľa zloženého skóre. V opačnom prípade sa používa iba
zložené skóre.

```ts
class SLAStrategyImpl implements RouterStrategy {
  readonly name = "sla-aware";
  readonly description =
    "Selects the provider most likely to satisfy latency, error-rate, and cost SLOs";

  select(pool, context) {
    // ... vyhodnotí každého kandidáta podľa politiky: { targetP95Ms, maxErrorRate, maxCostPer1MTokens, hardConstraints }
  }
}
```

**Polia SLA** (nastavujú sa v konfigurácii kombinácie):

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

**Kedy použiť**: Produkčné úlohy s prísnymi limitmi latencie, miery chybovosti alebo nákladov.

**Aliasy**: `sla-aware`, `sla`

---

#### 5. `lkgp` — posledný známy dobrý poskytovateľ ako prvý

Najprv vyskúša **posledného známeho dobrého poskytovateľa** (ak je nastavený) a potom prejde na
stratégiu `rules`. Je to užitočné na zachovanie väzby relácie — následné požiadavky
v konverzácii spracúva ten istý poskytovateľ.

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

    // Návrat k stratégii rules
    return getStrategy("rules").select(pool, context);
  }
}
```

**Kedy použiť**: Viackolové konverzácie, pri ktorých chcete, aby následné požiadavky
spracúval ten istý poskytovateľ (napr. kvôli ukladaniu do vyrovnávacej pamäte, kontinuite kontextu alebo konzistentnosti cien).

**Alias**: `lkgp` (bez aliasu)

---

### Vlastné stratégie smerovača

Prostredníctvom verejného API môžete zaregistrovať vlastnú implementáciu `RouterStrategy`:

```ts
import {
  registerStrategy,
  type RouterStrategy,
} from "@omniroute/open-sse/services/autoCombo/routerStrategy";

class MyCustomStrategy implements RouterStrategy {
  readonly name = "my-custom";
  readonly description = "My custom routing strategy";

  select(pool, context) {
    // Sem vložte vlastnú logiku smerovania
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

Potom ju použite:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "my-custom"
  }
}
```

---

### Sprievodca výberom stratégie smerovača

| Prípad použitia         | Stratégia   | Dôvod                                              |
| ----------------------- | ----------- | -------------------------------------------------- |
| Vyvážená pracovná záťaž | `rules`     | Predvolená — zohľadňuje všetky faktory             |
| Minimalizácia nákladov  | `cost`      | Vždy vyberie najlacnejšieho                        |
| Minimalizácia latencie  | `latency`   | Vyberie najrýchlejšieho spoľahlivého poskytovateľa |
| Prísne ciele SLO        | `sla-aware` | Filtruje podľa prahov p95/chybovosti/nákladov      |
| Viackolový chat         | `lkgp`      | Zachovanie väzby relácie                           |

Polia pre stratégiu zohľadňujúcu SLA:

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

## Vhodnosť pre úlohy

Viac ako 30 modelov bolo ohodnotených v rámci 6 typov úloh (`coding`, `review`, `planning`, `analysis`, `debugging`, `documentation`). Podporuje vzory so zástupnými znakmi (napr. `*-coder` → vysoké skóre pre programovanie).

## Súhrn variantov Auto

Vrátane samotného `auto` (predvolené) a 6 hodnôt `AutoVariant` deklarovaných v `autoPrefix.ts` existuje **7 vyvolateľných ID modelov**:

`auto`, `auto/coding`, `auto/fast`, `auto/cheap`, `auto/offline`, `auto/smart`, `auto/lkgp`

(`AutoVariant` samotný vymenúva 6 hodnôt; siedmou možnosťou je „bez variantu“ — samotné `auto` — ktoré funkcia `parseAutoPrefix()` spracuje ako `variant: undefined`.)

## Ako úrovne zapadajú do Auto-Combo

Bodovacia funkcia so 16 faktormi (`open-sse/services/autoCombo/scoring.ts`) považuje príslušnosť
k úrovni za dva signály: `tierPriority` (0.0476) a `tierAffinity` (0.0476). Úplnú
množinu `DEFAULT_WEIGHTS` nájdete v kanonickej [tabuľke bodovacích faktorov](#how-it-works-persisted-auto-combos) vyššie — prepisy pre jednotlivé balíky (ship-fast/cost-saver/quality-first/
offline-friendly) sú uvedené v tabuľke „Profily váh podľa balíka“.

Samotná úroveň **nevynucuje**, aby bola úroveň 1 prvá — ak má úroveň 1 vysokú latenciu alebo
neoptimálny pomer ceny a kvality, vyhrá úroveň 2. Ak chcete vynútiť poradie úrovní, použite
stratégiu kombinácie `priority` a usporiadajte poskytovateľov podľa úrovne.

Ak chcete výrazne uprednostniť úroveň 1 (predplatné), zvýšte váhu `tierPriority`:

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "tierPriority": 0.3, "costInv": 0.05 } } }
}
```

Definície úrovní a klasifikáciu poskytovateľov nájdete v `docs/marketing/TIERS.md`.

## Testovanie a pokrytie

### Deterministická matica rozhodnutí smerovania (`npm run test:combo:matrix`)

`tests/integration/combo-matrix/*.test.ts` overuje **rozhodnutie** smerovania všetkých 19
verejných stratégií od začiatku do konca prostredníctvom skutočného kombinovaného procesu so simulovanou upstream službou.
Pokrytie zahŕňa:

- Všetkých 19 stratégií `ROUTING_STRATEGY_VALUES` (usporiadané, vážené, nákladové, kontextové, fúzne, …).
- `quota-share` (interná) od začiatku do konca: spravodlivosť DRR + zníženie priority pri saturácii prostredníctvom
  skutočného integračného bodu `selectQuotaShareTarget` (`registerQuotaFetcher` / `setLKGP` /
  `__setHeadroomSaturationFetcherForTests`).
- Pokrytie univerzálneho odovzdania `context-relay` naprieč každým počtom cieľov.

Tento balík testov sa spúšťa v CI (úloha `test:integration`) s `--test-concurrency=1` a
`--test-force-exit`, takže je deterministický a nevyžaduje živé prihlasovacie údaje.

### Podmienený živý smoke test (NIE JE v CI — skutoční poskytovatelia)

| Príkaz                                 | Čo robí                                                                                           |
| :------------------------------------- | :------------------------------------------------------------------------------------------------ |
| `npm run test:combo:live`              | Skutočné smerovanie v rámci procesu s `RUN_COMBO_LIVE=1`; vytvorí snímku živej databázy OmniRoute |
| `npm run test:combo:live:vps`          | Volania HTTP na živý server OmniRoute (nastavte `COMBO_LIVE_BASE_URL`)                            |
| `npm run test:combo:live:vps:failover` | To isté so zámernými scenármi prepnutia pri zlyhaní                                               |

Tieto smoke testy preverujú skutočnú komunikačnú cestu (kombinácia → poskytovateľ → dokončenie). Sú
zámerne vylúčené z CI, pretože vyžadujú živé prihlasovacie údaje a prístup k VPS.

---

## Súbory

| Súbor                                                     | Účel                                                                                                                               |
| :-------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| `open-sse/services/autoCombo/scoring.ts`                  | Bodovacia funkcia so 16 faktormi, `DEFAULT_WEIGHTS`, normalizácia fondu                                                            |
| `open-sse/services/autoCombo/taskFitness.ts`              | Vyhľadávanie vhodnosti modelu pre úlohu                                                                                            |
| `open-sse/services/autoCombo/engine.ts`                   | Logika výberu, bandit, limit rozpočtu                                                                                              |
| `open-sse/services/autoCombo/selfHealing.ts`              | Vylúčenie, sondy, režim incidentu                                                                                                  |
| `open-sse/services/autoCombo/modePacks.ts`                | 6 profilov váh (rýchle dodanie, úspora nákladov, priorita kvality, vhodné pre offline režim, priorita spoľahlivosti, režim chaosu) |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Parser prefixu `auto/` + 6 variantov                                                                                               |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Vytvára `AutoComboConfig` v pamäti zo živých pripojení                                                                             |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Testovací hák na simulovanie registra poskytovateľov                                                                               |
| `src/shared/constants/routingStrategies.ts`               | `ROUTING_STRATEGY_VALUES` (19 stratégií)                                                                                           |
| `src/sse/handlers/chat.ts`                                | Integrácia: skoré ukončenie pre prefix `auto/`                                                                                     |
