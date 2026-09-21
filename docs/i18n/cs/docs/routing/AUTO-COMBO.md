# OmniRoute Auto-Combo Engine (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/AUTO-COMBO.md) · 🇪🇹 [am](../../../am/docs/routing/AUTO-COMBO.md) · 🇸🇦 [ar](../../../ar/docs/routing/AUTO-COMBO.md) · 🇦🇿 [az](../../../az/docs/routing/AUTO-COMBO.md) · 🇧🇬 [bg](../../../bg/docs/routing/AUTO-COMBO.md) · 🇧🇩 [bn](../../../bn/docs/routing/AUTO-COMBO.md) · 🇩🇰 [da](../../../da/docs/routing/AUTO-COMBO.md) · 🇩🇪 [de](../../../de/docs/routing/AUTO-COMBO.md) · 🇬🇷 [el](../../../el/docs/routing/AUTO-COMBO.md) · 🇪🇸 [es](../../../es/docs/routing/AUTO-COMBO.md) · 🇪🇪 [et](../../../et/docs/routing/AUTO-COMBO.md) · 🇮🇷 [fa](../../../fa/docs/routing/AUTO-COMBO.md) · 🇫🇮 [fi](../../../fi/docs/routing/AUTO-COMBO.md) · 🇫🇷 [fr](../../../fr/docs/routing/AUTO-COMBO.md) · 🇮🇪 [ga](../../../ga/docs/routing/AUTO-COMBO.md) · 🇮🇳 [gu](../../../gu/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ha](../../../ha/docs/routing/AUTO-COMBO.md) · 🇮🇱 [he](../../../he/docs/routing/AUTO-COMBO.md) · 🇮🇳 [hi](../../../hi/docs/routing/AUTO-COMBO.md) · 🇭🇷 [hr](../../../hr/docs/routing/AUTO-COMBO.md) · 🇭🇺 [hu](../../../hu/docs/routing/AUTO-COMBO.md) · 🇦🇲 [hy](../../../hy/docs/routing/AUTO-COMBO.md) · 🇮🇩 [id](../../../id/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ig](../../../ig/docs/routing/AUTO-COMBO.md) · 🇮🇹 [it](../../../it/docs/routing/AUTO-COMBO.md) · 🇯🇵 [ja](../../../ja/docs/routing/AUTO-COMBO.md) · 🇬🇪 [ka](../../../ka/docs/routing/AUTO-COMBO.md) · 🇰🇭 [km](../../../km/docs/routing/AUTO-COMBO.md) · 🇮🇳 [kn](../../../kn/docs/routing/AUTO-COMBO.md) · 🇰🇷 [ko](../../../ko/docs/routing/AUTO-COMBO.md) · 🇱🇹 [lt](../../../lt/docs/routing/AUTO-COMBO.md) · 🇱🇻 [lv](../../../lv/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ml](../../../ml/docs/routing/AUTO-COMBO.md) · 🇮🇳 [mr](../../../mr/docs/routing/AUTO-COMBO.md) · 🇲🇾 [ms](../../../ms/docs/routing/AUTO-COMBO.md) · 🇲🇹 [mt](../../../mt/docs/routing/AUTO-COMBO.md) · 🇲🇲 [my](../../../my/docs/routing/AUTO-COMBO.md) · 🇳🇵 [ne](../../../ne/docs/routing/AUTO-COMBO.md) · 🇳🇱 [nl](../../../nl/docs/routing/AUTO-COMBO.md) · 🇳🇴 [no](../../../no/docs/routing/AUTO-COMBO.md) · 🇮🇳 [or](../../../or/docs/routing/AUTO-COMBO.md) · 🇮🇳 [pa](../../../pa/docs/routing/AUTO-COMBO.md) · 🇵🇭 [phi](../../../phi/docs/routing/AUTO-COMBO.md) · 🇵🇱 [pl](../../../pl/docs/routing/AUTO-COMBO.md) · 🇵🇹 [pt](../../../pt/docs/routing/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/AUTO-COMBO.md) · 🇷🇴 [ro](../../../ro/docs/routing/AUTO-COMBO.md) · 🇷🇺 [ru](../../../ru/docs/routing/AUTO-COMBO.md) · 🇱🇰 [si](../../../si/docs/routing/AUTO-COMBO.md) · 🇸🇰 [sk](../../../sk/docs/routing/AUTO-COMBO.md) · 🇸🇮 [sl](../../../sl/docs/routing/AUTO-COMBO.md) · 🇷🇸 [sr](../../../sr/docs/routing/AUTO-COMBO.md) · 🇸🇪 [sv](../../../sv/docs/routing/AUTO-COMBO.md) · 🇰🇪 [sw](../../../sw/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ta](../../../ta/docs/routing/AUTO-COMBO.md) · 🇮🇳 [te](../../../te/docs/routing/AUTO-COMBO.md) · 🇹🇭 [th](../../../th/docs/routing/AUTO-COMBO.md) · 🇹🇷 [tr](../../../tr/docs/routing/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/AUTO-COMBO.md) · 🇵🇰 [ur](../../../ur/docs/routing/AUTO-COMBO.md) · 🇺🇿 [uz](../../../uz/docs/routing/AUTO-COMBO.md) · 🇻🇳 [vi](../../../vi/docs/routing/AUTO-COMBO.md) · 🇳🇬 [yo](../../../yo/docs/routing/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/AUTO-COMBO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/AUTO-COMBO.md)

---

> **Pro uživatele**: Hledáte rychlý úvod? Jednoduchá vysvětlení a příklady najdete v [uživatelské příručce Auto-Combo](../getting-started/AUTO-COMBO-GUIDE.md).

> Samořídicí řetězce modelů s adaptivním hodnocením + automatickým směrováním bez konfigurace

## Automatické směrování bez konfigurace (předpona `auto/`)

> **NOVINKA:** Není nutné vytvářet combo. Použijte předponu `auto/` přímo v libovolném klientovi.

### Rychlé příklady

| ID modelu      | Varianta | Chování                                                                        |
| -------------- | -------- | ------------------------------------------------------------------------------ |
| `auto`         | default  | Všichni připojení poskytovatelé, strategie LKGP, vyvážené váhy                 |
| `auto/coding`  | coding   | Váhy upřednostňující kvalitu, vhodné pro generování kódu                       |
| `auto/fast`    | fast     | Vážený výběr s nízkou latencí                                                  |
| `auto/cheap`   | cheap    | Směrování optimalizované podle nákladů (nejnižší náklady jako první)           |
| `auto/offline` | offline  | Upřednostňuje poskytovatele s nejvyšší dostupností kvóty                       |
| `auto/smart`   | smart    | Upřednostnění kvality + vyšší míra průzkumu (10 %) pro lepší objevování modelů |
| `auto/lkgp`    | lkgp     | Explicitní LKGP (stejné jako výchozí `auto`)                                   |
| `auto/chaos`   | chaos    | Váhy s vkládáním chyb pro testování odolnosti (chaos engineering)              |

### Kombinace kategorie × úroveň (`auto/<category>:<tier>`)

Přípony ve stylu OpenRouter oddělují **jaký druh trasy** (kategorie) od toho, **jak ji optimalizovat** (úroveň), takže je můžete libovolně kombinovat (#4235 Phase B, `open-sse/services/autoCombo/suffixComposition.ts`):

- **Kategorie** (filtrují množinu kandidátů podle schopností): `coding` · `reasoning` · `vision` · `chat` · `multimodal`. `vision`/`multimodal` zachovávají modely podporující obrazový vstup; `reasoning` zachovává modely pro uvažování/přemýšlení.
- **Úrovně** (vybírají váhy hodnocení / filtr množiny): `fast` (rychlé nasazení) · `cheap` (alias `floor`, úspora nákladů) · `reliable` (stav jističe + stabilita latence) · `free` / `pro` (filtrují množinu podle úrovně modelu prostřednictvím `classifyTier` — bezplatná vs. prémiová úroveň).

| Příklad                | Výsledek                                                                   |
| ---------------------- | -------------------------------------------------------------------------- |
| `auto/coding:fast`     | množina pro programování, váhy s nízkou latencí                            |
| `auto/coding:cheap`    | množina pro programování, optimalizace nákladů (alias `auto/coding:floor`) |
| `auto/reasoning:pro`   | pouze modely pro uvažování/přemýšlení, prémiová úroveň                     |
| `auto/vision`          | modely podporující obrazový vstup (bez úrovně → vyvážené váhy)             |
| `auto/multimodal:free` | modely s multimodálními schopnostmi, pouze bezplatná úroveň                |

Libovolná platná varianta `auto/<category>[:<tier>]` se vyhodnocuje na vyžádání; vybraná podmnožina je zveřejňována v `/v1/models` a na řídicím panelu (`AUTO_SUFFIX_VARIANTS` v `open-sse/services/autoCombo/builtinCatalog.ts`). Filtrování je **fail-open** — pokud omezení neodpovídá žádnému připojenému modelu, použije se celá množina, aby směrování nikdy nepřestalo fungovat. Základní hodnoticí mechanismus (`combo.ts`) zůstává beze změny; filtr kategorie/úrovně se aplikuje v `buildAutoCandidates`.

> **Živé informace o modelech:** vhodnost pro automatické směrování vychází z živých žebříčků **Arena ELO** + údajů o úrovních z **models.dev**, pokud je zapnut příznak `ARENA_ELO_SYNC_ENABLED` (jinak se použije statická mapa vhodnosti).

**Jak používat:**

```bash
# Libovolné IDE nebo nástroj CLI podporující formát OpenAI
Základní URL: http://localhost:20128/v1
Klíč API:    <váš-klíč-koncového-bodu>

# V kódu/konfiguraci nastavte model na:
model: "auto"                 # vyvážené výchozí nastavení
model: "auto/coding"          # nejlepší pro programovací úlohy
model: "auto/fast"            # nejrychlejší dostupná možnost
model: "auto/cheap"           # nejlevnější za token
```

**Co se stane:**

1. OmniRoute detekuje předponu `auto/` v `src/sse/handlers/chat.ts`
2. Dotáže se databáze na všechna **aktivní připojení poskytovatelů**
3. Vyfiltruje ta, která mají platné přihlašovací údaje (klíč API nebo token OAuth)
4. Určí model pro každé připojení (`connection.defaultModel` nebo první model poskytovatele)
5. Vytvoří **virtuální combo** v paměti (neukládá se do DB)
6. Provede směrování pomocí profilu vah vybrané varianty + strategie LKGP

**Klíčové vlastnosti:**

- ✅ **Vždy aktivní:** Není potřeba žádný přepínač, vytváření comba ani konfigurace
- ✅ **Dynamické:** Automaticky zohledňuje aktuálně připojené poskytovatele
- ✅ **Stálost relace:** LKGP zajišťuje upřednostnění posledního úspěšného poskytovatele
- ✅ **Podpora více účtů:** Každé připojení poskytovatele se stává samostatným kandidátem
- ✅ **Žádné zápisy do DB:** Virtuální combo existuje pouze po dobu požadavku, bez jakékoli režie spojené s perzistencí

### Řízení kandidátů pro jednotlivé klíče (#7819, úroveň 1+2)

`GET /v1/auto-combo/{channel}/candidates` (`{channel}` = přípona za `auto/`, nebo
doslovná hodnota `auto` pro základní kanál) je koncový bod **pouze pro čtení**, který
uvádí aktuální množinu kandidátů kanálu `auto/*` doplněnou o živé údaje o dosažitelnosti
a opětovně využívá existující čtení odolnosti (nikdy surovou hodnotu `state` jističe):

- jistič poskytovatele — `getCircuitBreaker(provider).getStatus()` / `.canExecute()`
- doba zklidnění připojení — `rateLimitedUntil` / `testStatus` ve vyhodnoceném řádku
  `provider_connections`
- zablokování modelu — `isModelLocked(provider, connectionId, model)`

Každý kandidát také obsahuje příznak `excluded` pro tento klíč API. Výjimky jsou
ukládány pro jednotlivé klíče API (tabulka `auto_candidate_overrides`, migrace `128`) —
OmniRoute je určen pro jednoho tenanta a nemá tabulku `users`, takže `apiKeyId` je
nejbližší skutečnou identitou jednotlivého volajícího — a vynucují se v kritickém bodě
množiny kandidátů v `open-sse/services/autoCombo/virtualFactory.ts` prostřednictvím
čisté, jednotkově testované funkce `filterExcludedCandidates()`
(`open-sse/services/autoCombo/candidateOverrides.ts`). Filtr je **fail-open**:
nenastavené apiKeyId/kanál i selhání vyhledávání v DB ponechají množinu nefiltrovanou,
takže operátor bez nakonfigurovaných výjimek uvidí směrování po bajtech totožné se
stavem před zavedením této funkce.

**Odloženo do navazujícího issue:** váhy jednotlivých kandidátů + explicitní pořadí (úroveň 3
— napojuje se na stávající cesty strategií založených na vahách/prioritách) a připnutí konkrétní
strategie `combo.ts` pro každý kanál `auto/*` (úroveň 4). Otevřenou otázku, zda by přepsání měla
vzhledem k modelu jednoho tenanta zůstat specifická pro jednotlivé klíče API, nebo se stát globálními,
řeší plán v #7819.

**Na pozadí:**

```txt
Požadavek: { model: "auto/coding" }
   ↓
src/sse/handlers/chat.ts detekuje prefix
   ↓
createVirtualAutoCombo('coding') → candidatePool z aktivních připojení
   ↓
handleComboChat (stejný mechanismus jako u uložených kombinací)
   ↓
Automatické hodnocení vybere pro každý požadavek nejlepšího poskytovatele/model
```

**Soubory implementace:**

| Soubor                                                    | Účel                                                |
| --------------------------------------------------------- | --------------------------------------------------- |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Parser prefixu (`parseAutoPrefix`)                  |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Vytváří virtuální objekty `AutoComboConfig`         |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Testovací hook pro mockování registru poskytovatelů |
| `src/sse/handlers/chat.ts`                                | Integrace: zkratka pro prefix auto                  |
| `src/shared/constants/providers.ts`                       | Systémová položka `SYSTEM_PROVIDERS.auto`           |

## Názvy kombinací odpovídající skutečnému ID modelu

Kombinace, jejíž `name` je shodný se samotným ID modelu (např. kombinace s názvem
`gpt-5.5`), je **záměrný a podporovaný vzor**, nikoli chyba: jde o
mechanismus záložního poskytovatele pro jednotlivá ID modelů popsaný v
[#6940](https://github.com/diegosouzapw/OmniRoute/issues/6940). Protože se
rozlišení kombinace kontroluje před rozlišením samotného ID modelu
(`getComboForModel()` v `src/sse/services/model.ts`), požadavek na samotné
ID `gpt-5.5` je směrován přes cíle kombinace (např.
`acme-responses/gpt-5.5`, `backup-responses/gpt-5.5`) namísto přímo k
jedinému poskytovateli — tím se znovu využívá priorita kombinace před přepisem vytvořená pro
[#3227/#3233](https://github.com/diegosouzapw/OmniRoute/issues/3227), která je
regresně testována pomocí `tests/unit/responses-combo-resolution-3227.test.ts` a
`tests/unit/combo-name-codex-responses-rewrite.test.ts`.

Vytvoření nebo přejmenování kombinace na název, který zastiňuje skutečné ID modelu,
**není nikdy odmítnuto** — tím by se narušil tento zdokumentovaný pracovní postup. Namísto
toho (#8530) připojí `POST /api/combos` a `PUT /api/combos/[id]` k odpovědi
neblokující pole `warning`, pokud se (nový) název shoduje se skutečným
ID modelu:

```json
{
  "warning": {
    "code": "COMBO_NAME_SHADOWS_MODEL",
    "modelId": "gpt-5.5",
    "providerId": "openai"
  }
}
```

Při spuštění funkce `scanComboModelNameCollisionsAtBoot()`
(`src/instrumentation-node.ts`) také zapíše jednořádkové varování `[STARTUP]`
se seznamem všech existujících kombinací, které zastiňují ID modelu, takže provozovatelé, kteří
na tuto situaci narazí omylem (namísto záměrně podle #6940), dostanou upozornění.
Pomocná funkce pro detekci se nachází v `src/lib/combos/modelNameCollision.ts`.

## Volání vlastní kombinace z klienta

Uložené kombinace (Nastavení → Kombinace) se použijí pouze tehdy, když klient odešle **přesný název** kombinace v poli `model` — nepoužívá se žádná přibližná ani částečná shoda názvu kombinace a není potřeba prefix `auto/`. Pořadí rozlišení (`getComboForModel()` v `src/sse/services/model.ts`):

1. přesná shoda názvu kombinace (`model: "my-combo"`),
2. prefix `combo/<name>` (`model: "combo/my-combo"`),
3. globální mapování model→kombinace (`/api/model-combo-mappings`).

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"my-combo","messages":[{"role":"user","content":"Hello"}]}'
```

Dvě časté nástrahy:

- **`auto` vaše kombinace nepoužívá.** `auto`/`auto/*` vytváří vlastní fond kandidátů bez nutnosti konfigurace a uložené kombinace zohlední pouze v případě, že je některá kombinace doslova pojmenována `auto` (nedoporučuje se). Chcete-li směrovat přes kombinaci, odešlete její přesný název — nikoli `auto`.
- **`openrouter/auto` je skutečný placený produkt OpenRouter** („Auto Best Available“), nikoli alias OmniRoute. Jde o jedinou statickou položku modelu v registru OpenRouter (`open-sse/config/providers/registry/openrouter/index.ts`) a je účtována samostatně. Chcete-li ji vyloučit z fondů `auto`, použijte Nastavení → Směrování → Skrýt placené modely.

Původní nejasnosti, které tato dokumentace objasňuje, naleznete v [#7992](https://github.com/diegosouzapw/OmniRoute/issues/7992) a [#7111](https://github.com/diegosouzapw/OmniRoute/issues/7111).

## Jak to funguje (trvalé automatické kombinace)

Modul Auto-Combo dynamicky vybírá nejlepšího poskytovatele/model pro každý požadavek pomocí **16faktorové bodovací funkce** (definované v `open-sse/services/autoCombo/scoring.ts` → `DEFAULT_WEIGHTS`). Výchozí váhy mají součet `1.0`; vlastní váhy jsou znovu normalizovány pomocí `normalizeScoringWeights()`. Dva ze šestnácti faktorů — `cacheAffinity` a `resetWindowAffinity` — mají výchozí váhu `0`; faktor `reliability` má v `DEFAULT_WEIGHTS` váhu `0`, ale v obecných sadách `0.03` a v sadě `reliability-first` hodnotu `0.04`, zatímco faktor `quality` má v sadách váhu `0.02` (v sadě `quality-first` hodnotu `0.03`): přesto se počítají pro každého kandidáta a `cacheAffinity` mimo výsledné skóre řídí deduplikaci mezipaměti promptů, takže faktory s nulovou výchozí váhou se ve výchozím nastavení jednoduše nezapojují do rozhodování, zatímco v sadách ano.

![16faktorové bodování Auto-Combo](../diagrams/exported/auto-combo-scoring.svg)

> Zdroj: [diagrams/auto-combo-scoring.mmd](../diagrams/auto-combo-scoring.mmd) (znovu vygenerujte pomocí `npm run docs:render-diagrams`). Název souboru je historický; zdrojový i vykreslený diagram zobrazují všech 16 faktorů deklarovaných v `DEFAULT_WEIGHTS`.

| Faktor                | Výchozí váha | Popis                                                                                                                                                                                                                                            |
| :-------------------- | :----------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `quota`               | 0.1429       | Zbývající kvóta / rezerva limitu požadavků [0..1]                                                                                                                                                                                                |
| `health`              | 0.1605       | Skóre stavu z jističe (CLOSED=1.0, HALF_OPEN=0.5, OPEN=0.0)                                                                                                                                                                                      |
| `costInv`             | 0.1429       | Převrácená hodnota **kombinovaných** nákladů (60 % ceny vstupních + 40 % ceny výstupních tokenů, normalizováno) — nižší cena = vyšší skóre                                                                                                       |
| `latencyInv`          | 0.1143       | Převrácená hodnota latence p95 normalizovaná podle fondu — vyšší rychlost = vyšší skóre                                                                                                                                                          |
| `taskFit`             | 0.0762       | Vhodnost pro typ úlohy (programování, revize, plánování, analýza, ladění, dokumentace)                                                                                                                                                           |
| `stability`           | 0.0476       | Stabilita založená na varianci směrodatné odchylky latence — kandidátovi s kolísající dobou odezvy je přiděleno nižší skóre                                                                                                                      |
| `tierPriority`        | 0.0476       | Priorita úrovně účtu — Ultra=1.0, Pro=0.67, Standard=0.33, Free=0.0                                                                                                                                                                              |
| `tierAffinity`        | 0.0476       | Afinita mezi úrovní kandidáta a úrovní doporučenou manifestem                                                                                                                                                                                    |
| `specificityMatch`    | 0.0476       | Shoda mezi specifičností požadavku (nápovědou manifestu) a úrovní modelu                                                                                                                                                                         |
| `contextAffinity`     | 0.0476       | Afinita mezi požadovanou velikostí kontextového okna a kontextovým oknem modelu                                                                                                                                                                  |
| `sessionAvailability` | 0.0476       | Dostupnost relace OAuth kandidátního připojení pro tuto relaci (`getOAuthSessionAvailability()`; připojení bez OAuth získávají skóre 1.0)                                                                                                        |
| `connectionDensity`   | 0.0476       | Rozkládá zatížení mezi připojení stejného poskytovatele (zamezení koncentraci)                                                                                                                                                                   |
| `cacheAffinity`       | 0.00         | Afinita založená na rendezvous hashování směrem k připojení, které již s největší pravděpodobností uchovává prefix mezipaměti promptu tohoto požadavku (`open-sse/services/combo/promptCacheAffinity.ts`); ve výchozím nastavení vypnuto (#8008) |
| `resetWindowAffinity` | 0.00         | Upřednostnění připojení, jejichž časové okno obnovení kvóty je výhodné (ve výchozím nastavení vypnuto)                                                                                                                                           |
| `quality`             | 0.03         | Signál kvality výstupu řízený zpětnou vazbou ze sledování kvality událostí směrování; kandidáti bez pozorování obdrží neutrální hodnotu 0.5                                                                                                      |
| `reliability`         | 0.00         | Pozorovaný podíl úspěšnosti, `1 - failureRate`, z historie využití za 24 hodin s minimálním limitem deseti vzorků (jinak metriky v reálném čase); kandidáti bez pozorování mají hodnotu 1.0. Ve výchozím nastavení vypnuto                       |

**Součet:** `0.1429 + 0.1605 + 0.1429 + 0.1143 + 0.0762 + (7 × 0.0476) + 0.00 + 0.00 + 0.03 + 0.00 = 1.0`, jak je deklarováno v `DEFAULT_WEIGHTS`; uživatelem nakonfigurované váhy jsou před bodováním pomocí `normalizeScoringWeights()` znovu normalizovány na rozdělení.

## Balíčky režimů

6 předdefinovaných profilů vah v `open-sse/services/autoCombo/modePacks.ts`. Každý balíček zcela nahradí výchozí váhy, aby upřednostnil výběr podle jednoho cíle. Součet každého balíčku je již `1.0` (`0.9999` při zobrazení na čtyři desetinná místa), takže `normalizeScoringWeights()` nemá při aktivním balíčku co smysluplně opravovat — níže uvedené hodnoty jsou po zaokrouhlení ty, které hodnoticí algoritmus používá.

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

- **Balíčky obsahují `quality` a `reliability`** (`quality 0.02`, u `quality-first` 0.03; `reliability 0.03`, u `reliability-first` 0.04) a nahrazují celou mapu vah (`weights = pack`, nejde o sloučení). `DEFAULT_WEIGHTS` obsahuje `quality 0.03 / reliability 0`; výběr `balanced`/`default` zachová tyto výchozí hodnoty, zatímco výběr balíčku použije jeho výše uvedené hodnoty. U studeného fondu (zatím bez pozorování, takže `quality 0.5` a `reliability 1`) přidávají tyto dva faktory `+0.04` u obecného balíčku (`0.03 + 0.01`), `+0.045` u `quality-first` a `+0.05` u `reliability-first`.
- `tierAffinity`, `specificityMatch` a `resetWindowAffinity` jsou v každém balíčku explicitně nastaveny na `0`.
- Stručný přehled zaměření jednotlivých balíčků:
  - **ship-fast** → latencyInv 0.3048 + health 0.2667 (zdravá připojení s nízkou latencí)
  - **cost-saver** → costInv 0.3324 (vítězí nejlevnější tokeny)
  - **quality-first** → taskFit 0.3524 + stability 0.1429 + quality 0.03, nejvyšší ze všech balíčků (nejlepší model pro danou úlohu, konzistentní)
  - **offline-friendly** → quota 0.3324 + health 0.2667 (maximální rezerva bez ohledu na rychlost či cenu)
  - **reliability-first** → health 0.3524 + stability 0.1905 + reliability 0.04, nejvyšší ze všech balíčků (minimum překvapení)
  - **chaos-mode** → health 0.4000 + taskFit 0.1905 (profil pro vnášení poruch)

### Řízení pro jednotlivé požadavky (hlavičky) — #6023 / #6024 / #6025 / #3470

Kombinaci `auto` lze **pro každý požadavek** řídit pomocí tří hlaviček, aniž by se měnila
uložená konfigurace kombinace. Tyto hlavičky se vztahují pouze na strategii `auto` a pouze na požadavek,
který je obsahuje; pokud hlavička chybí, použijí se uložené hodnoty `modePack`/`budgetCap`/`budgetFallback`
dané kombinace.

| Hlavička                      | Přijímá                                                                                                                                                                                               | Účinek                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| :---------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `X-OmniRoute-Mode`            | alias předvolby (`fast`, `balanced`, `quality`, `cheap`, `reliable`, `offline`) nebo nezpracovaný název balíčku (`ship-fast`, `cost-saver`, `quality-first`, `offline-friendly`, `reliability-first`) | Přepíše váhy hodnocení pro tento požadavek. `balanced`/`default` vynutí výchozí váhy (bez balíčku). Neznámé hodnoty jsou ignorovány (konfigurace zůstane zachována).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `X-OmniRoute-Budget`          | kladné číslo (maximální částka v USD na požadavek)                                                                                                                                                    | Pevný cenový strop: kandidáti, jejichž odhadované náklady jej překračují, jsou před výběrem odfiltrováni. Chování v případě, že jej překročí **všichni** kandidáti, určuje níže uvedená hlavička `X-OmniRoute-Budget-Fallback`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `X-OmniRoute-Budget-Fallback` | `cheapest` (výchozí, aliasy: `cheapest-viable`, `soft`) nebo `strict` (aliasy: `block`, `hard`)                                                                                                       | `cheapest`: použije jako záložní možnost globálně nejlevnějšího kandidáta, i když stále překračuje cenový strop (původní chování). `strict`: odmítne provést výběr — požadavek okamžitě selže s `HTTP 402` namísto tichého překročení rozpočtu. Neznámé hodnoty jsou ignorovány.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `X-OmniRoute-Effort`          | `auto` (ostatní hodnoty jsou rezervovány)                                                                                                                                                             | Adaptivní rozpočet na uvažování: pokud požadavek neobsahuje **žádné** pole pro uvažování v jakékoli podobě (`reasoning_effort`, `reasoning`, `thinking`), brána převede `auto` na `low`/`medium`/`high` na základě deterministických signálů ze struktury požadavku (délka poslední zprávy uživatele, velikost kontextu po poslední zprávu uživatele, předchozí výsledky nástrojů, hloubka cyklu nástrojů). Signály jsou omezeny na aktuální tah — vše po poslední zprávě uživatele je ignorováno — takže se každý požadavek v cyklu nástrojů vyhodnotí na stejnou úroveň (bezstavové připnutí pro jednotlivý tah, žádný stav relace, žádné zvýšení úrovně uprostřed cyklu, které by narušilo prefixy mezipaměti výzev u nadřazené služby). Explicitní pole klienta pro uvažování má vždy přednost. Platí pro požadavky, jejichž odeslání nadřazené službě se vyhodnotí na formát OpenAI Chat Completions (`targetFormat === FORMATS.OPENAI`) — `reasoning_effort` je pole ve formátu OpenAI, takže tato hlavička nemá žádný účinek na požadavek cílený na Claude nebo Gemini (viz `open-sse/handlers/chatCore/adaptiveEffortWiring.ts`). |

```bash
# Vynutit nejrychlejší profil, omezit tento požadavek na $0.05 a při překročení limitu jej striktně zablokovat
curl -sS http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "X-OmniRoute-Mode: fast" \
  -H "X-OmniRoute-Budget: 0.05" \
  -H "X-OmniRoute-Budget-Fallback: strict" \
  -d '{"model":"auto","messages":[{"role":"user","content":"hi"}]}'
```

Vyhodnocení je čistá funkce (`open-sse/services/autoCombo/requestControls.ts`); výsledné
hodnoty se předávají do stávajících vstupů enginu `config.modePack` / `config.budgetCap` /
`config.budgetFallback`. Uložená hodnota `config.budgetFallback` dané kombinace („strict“ |
„cheapest“) nastavuje trvalou zásadu; hlavička ji přepíše pro jediný požadavek.

## Všechny strategie směrování

Kombinační modul OmniRoute podporuje **19 strategií směrování** (deklarovaných v `src/shared/constants/routingStrategies.ts` → `ROUTING_STRATEGY_VALUES`). Samotný modul Auto Combo je dostupný pod strategií `auto`; ostatní strategie jsou k dispozici pro uložené kombinace.

| Strategie           | Popis                                                                                                                                                                                                                               |
| :------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `priority`          | Seřazený seznam s prvním cílem a explicitní prioritou                                                                                                                                                                               |
| `weighted`          | Vážený náhodný výběr podle váhy jednotlivých cílů                                                                                                                                                                                   |
| `round-robin`       | Cyklické procházení cílů v daném pořadí                                                                                                                                                                                             |
| `context-relay`     | Předávání kontextu mezi cíli (dlouhé konverzace)                                                                                                                                                                                    |
| `fill-first`        | Vyčerpání kvóty každého cíle před přechodem na další                                                                                                                                                                                |
| `p2c`               | Náhodné vyvažování zátěže metodou Power-of-2-choices                                                                                                                                                                                |
| `random`            | Rovnoměrný náhodný výběr                                                                                                                                                                                                            |
| `least-used`        | Výběr cíle s nejnižší aktuální zátěží                                                                                                                                                                                               |
| `cost-optimized`    | Minimalizace ceny v $ za požadavek podle katalogových cen                                                                                                                                                                           |
| `reset-aware` ⭐    | Upřednostnění podle času obnovení kvóty — krátká období do obnovení mají vyšší prioritu                                                                                                                                             |
| `reset-window`      | Upřednostnění cílů, jejichž období kvóty se obnoví nejdříve                                                                                                                                                                         |
| `headroom`          | Výběr cíle s největší zbývající rezervou kvóty                                                                                                                                                                                      |
| `strict-random`     | Náhodný výběr bez odstraňování opakování                                                                                                                                                                                            |
| `auto`              | Použití bodového hodnocení Auto Combo (16 faktorů) — **doporučeno**                                                                                                                                                                 |
| `lkgp`              | Poslední známá funkční cesta (připne se k poslednímu úspěšnému poskytovateli a poté přejde na záložní pravidla)                                                                                                                     |
| `context-optimized` | Výběr cíle, který nejlépe odpovídá aktuální velikosti kontextu                                                                                                                                                                      |
| `cache-optimized`   | Změna pořadí cílů podle afinity k mezipaměti promptů — jako první se zkusí připojení, které s největší pravděpodobností již obsahuje prefix tohoto požadavku v mezipaměti (`open-sse/services/combo/promptCacheAffinity.ts`, #8008) |
| `fusion` 🧬         | Paralelní odeslání panelu modelů a následné sloučení do jedné odpovědi pomocí posuzovacího modelu (viz níže)                                                                                                                        |
| `pipeline`          | Sekvenční spouštění cílů, přičemž výstup každého kroku se předává jako vstup následujícího kroku; vrátí se pouze konečná odpověď (#6396)                                                                                            |

⭐ = Novinka ve v3.8.0 · 🧬 = Novinka ve v3.8.36

### Sémantika `weighted`

`weighted` představuje **poměrný náhodný výběr pro každý požadavek**
(`open-sse/services/combo/targetSorters.ts` → `selectWeightedTarget`), nikoli vyrovnávací mechanismus:

- Pro každý požadavek se vybere **jeden** krok s pravděpodobností `weight / totalWeight`; zbývající kroky
  jsou pro daný požadavek seřazeny sestupně podle váhy jako řetězec záložních možností.
- Krok, jehož váha je `0` (nebo chybí), **nebude nikdy vybrán**, dokud má některý jiný krok
  váhu > 0 — může sloužit pouze jako záloha po selhání vybraného kroku. Výběr se stane rovnoměrným pouze tehdy, když jsou **všechny**
  váhy nulové.
- Kroky, jejichž cíle jsou všechny nedostupné — jistič poskytovatele ve stavu `OPEN`, čekací doba
  připojení, zablokování modelu — jsou z výběru odstraněny ještě před jeho provedením
  (`open-sse/services/combo/targetResolution.ts`), takže jediný funkční krok může dočasně
  získat všechny požadavky.
- `stickyWeightedLimit` (konfigurace kombinace, výchozí hodnota `1` = vypnuto) připne vybraný krok na daný počet
  po sobě jdoucích úspěchů, než se provede nový výběr.

Pro striktní rotaci použijte `round-robin`; stejné váhy u `weighted` poskytují statistické — nikoli
striktní — vyvážení.

## Strategie Fusion

`fusion` je jediná strategie, která **nevybírá** jeden cíl. Rozešle prompt
**všem modelům panelu paralelně** a poté konfigurovatelný **hodnoticí model** syntetizuje
ze všech odpovědí panelu jedinou finální odpověď. Převzato z upstream projektu `decolua/9router`
(návrh Fusion od OpenRouteru); implementace se nachází v `open-sse/services/fusion.ts`.

Jak funguje:

0. **Vynechání panelu u požadavků s nástroji** — požadavek, který obsahuje neprázdné pole `tools`
   a jehož `tool_choice` není explicitně nastaveno na `"none"`, panel zcela vynechá: je směrován
   přímo do jediného modelu (nakonfigurovaného hodnoticího modelu nebo `panel[0]`), přičemž
   `tools`/`tool_choice` jsou předány beze změny. Členové panelu nemají přístup k nástrojům
   a instrukce pro syntézu hodnoticího modelu odrazuje od generování volání nástrojů, takže
   klienti využívající agenty či volání nástrojů získají skutečné rozhodnutí o volání nástroje
   namísto syntetizované prózy (#6771).
1. **Paralelní rozeslání** (pouze požadavky bez nástrojů) — prompt je odeslán současně všem
   modelům panelu, vynuceně bez streamování a s odebranými nástroji (hodnoticí model potřebuje
   pro syntézu kompletní text).
2. **Shromažďování s kvórem a dodatečnou lhůtou** — jakmile dorazí `minPanel` odpovědí, spustí
   se krátký časovač dodatečné lhůty pro opozdilé modely; poté Fusion pokračuje s tím, co bylo
   shromážděno. Tím se omezuje dopad nejpomalejšího modelu na celkovou dobu zpracování, která
   je ohraničena pevným časovým limitem.
3. **Syntéza hodnoticím modelem** — odpovědi panelu jsou anonymizovány (`Source 1`, `Source 2`, … —
   hodnoticí model tak posuzuje obsah, nikoli značku modelu) a předány hodnoticímu modelu, který
   analyzuje shodu / rozpory / částečné pokrytí / jedinečné postřehy / slepá místa a poté
   vytvoří **jednu** autoritativní odpověď. Volání hodnoticího modelu zachovává původní příznak
   `stream` klienta i nástroje, takže streamování a následné použití nástrojů nadále fungují.
4. **Řízená degradace** — 0 odpovědí panelu → `503`; právě 1 přeživší odpověď → tato odpověď
   je vrácena přímo (není co slučovat); panel s jediným modelem odpovídá přímo.

Členem panelu může být také krok `combo-ref` (`{kind: "combo-ref", comboName: "..."}`), který
odkazuje na jiné combo — vyhodnotí se jako **jeden samostatný hlas panelu** (úplné rekurzivní
směrování do odkazovaného comba, nikoli paralelní rozeslání na vlastní cíle tohoto comba),
se stejnou ochranou proti nadměrné hloubce a cyklům, jakou již používají všechny ostatní
strategie pracující s combo-ref (#6764).

### Konfigurace

Konfiguruje se v objektu `config` daného comba (bez migrace schématu — znovu využívá
existující tabulku `combos`):

| Pole                                     | Typ      | Výchozí hodnota    | Účel                                                                                                |
| :--------------------------------------- | :------- | :----------------- | :-------------------------------------------------------------------------------------------------- |
| `config.judgeModel`                      | `string` | první model panelu | Model, který syntetizuje finální odpověď                                                            |
| `config.fusionTuning.minPanel`           | `number` | `2`                | Počet úspěšných odpovědí nutných ke spuštění časovače dodatečné lhůty (omezeno na `[2, panelSize]`) |
| `config.fusionTuning.stragglerGraceMs`   | `number` | `8000`             | Jak dlouho po dosažení kvóra čekat na opozdilé modely                                               |
| `config.fusionTuning.panelHardTimeoutMs` | `number` | `90000`            | Absolutní limit, aby jeden zaseknutý model nemohl pozdržet požadavek                                |

Výchozí hodnoty jsou definovány v `FUSION_DEFAULTS` (`open-sse/services/fusion.ts`).

### Příklad

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

Poté jej volejte jako jakékoli jiné combo: `{"model":"fusion-panel","messages":[...]}`.

## Virtuální továrna Auto-Combo

Engine Auto Combo nevyžaduje předem definované kombinace. Místo toho `open-sse/services/autoCombo/virtualFactory.ts` sestavuje kandidáty za běhu:

1. Načte `getProviderConnections({ isActive: true })` (všechna povolená připojení)
2. Vyfiltruje připojení s platnými přihlašovacími údaji (API klíč nebo neexpirovaný token OAuth prostřednictvím `hasUsableOAuthToken()`)
3. Porovná je s `getProviderRegistry()` za účelem zjištění dostupnosti modelů a cen
4. Pro každou trojici `(provider, model, connection)` sestaví `VirtualAutoComboCandidate`
5. Jako cíl směrování vybere `connection.defaultModel` (nebo první model v registru)
6. Ohodnotí každého kandidáta pomocí 16faktorové funkce `scorePool()` a sady vah dané varianty
7. Vrátí výslednou konfiguraci `AutoComboConfig` uloženou v paměti pro `handleComboChat()` — nikdy se neukládá do DB

To znamená, že **přidání nového poskytovatele s povoleným `auto/*` automaticky rozšíří fond kandidátů** — není nutná ruční úprava kombinace. Virtuální kombinace se znovu sestavuje pro každý požadavek, takže nově přidaná nebo nově funkční připojení jsou zohledněna okamžitě.

## Samoopravování

- **Dočasné vyloučení**: Skóre < 0.2 → vyloučení na 5 min (progresivní prodlužování, maximálně 30 min)
- **Zohlednění jističe**: OPEN → automaticky vyloučeno; HALF_OPEN → ověřovací požadavky
- **Režim incidentu**: >50 % OPEN → vypnout průzkum, maximalizovat stabilitu
- **Obnovení po uplynutí čekací doby**: Po vyloučení je první požadavek „ověřovací“ se zkráceným časovým limitem

## Průzkum metodou bandit

5 % požadavků (konfigurovatelné) je za účelem průzkumu směrováno k náhodným poskytovatelům. V režimu incidentu je tato funkce vypnutá.

## API

**Neexistuje žádný vyhrazený koncový bod `POST /api/combos/auto`** — Auto-Combo se používá dvěma způsoby:

1. **Bez konfigurace (doporučeno):** Odešlete libovolný požadavek na dokončení chatu s `model: "auto"` nebo `model: "auto/<variant>"`. Virtuální továrna sestaví kombinaci pro každý požadavek — není potřeba žádné trvalé uložení ani volání API.

2. **Trvale uložená kombinace se `strategy: "auto"`:** Vytvořte běžnou kombinaci prostřednictvím `POST /api/combos` a nastavte `strategy: "auto"` spolu s `config.auto.weights` / `config.auto.candidatePool`. Použije se stejný hodnoticí engine; kombinace se uloží do `combos` a lze ji znovu používat podle ID.

Pro zjišťování dostupných možností uvádí `GET /api/combos/auto` všechny varianty s jejich vyhodnoceným fondem kandidátů a také `context_length` / `max_output_tokens` — MAXIMUM napříč okny fondu kandidátů. Klienti (např. plugin opencode) musí uvádět tyto hodnoty namísto `0`: nulový kontext zcela zakáže automatickou komprimaci opencode, takže relace narůstají, dokud vyčištění historie v bráně nezničí kontext. Uvádění MAXIMA je bezpečné, protože předběžný filtr kontextu Auto-Combo směruje nadměrně velké požadavky ke kandidátům s velkým kontextovým oknem.

```bash
# Použití bez konfigurace (bez vytváření kombinace)
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"auto/coding","messages":[{"role":"user","content":"Hello"}]}'

# Trvale uložená automatická kombinace prostřednictvím běžného koncového bodu pro kombinace
curl -X POST http://localhost:20128/api/combos \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","strategy":"auto","config":{"auto":{"candidatePool":["anthropic","google","openai"],"weights":{"quota":0.15,"health":0.3,"costInv":0.05,"latencyInv":0.35,"taskFit":0.1,"stability":0,"tierPriority":0.05}}}}'
```

### Strategie automatického routeru

Trvale uložené kombinace se `strategy: "auto"` mohou nastavit `config.routerStrategy` (nebo starší
`config.auto.routerStrategy`) na jednu z následujících hodnot:

- `rules` — výchozí vážené hodnocení
- `score` — vybere nejvyšší nakonfigurované vážené skóre. Při přesné shodě se zachová nakonfigurované
  pořadí kandidátů; stávající `explorationRate` vybírá vzorky z celého seřazeného fondu.
- `cost` / `eco` — nejlevnější funkční poskytovatel
- `latency` / `fast` — nejnižší latence p95 s penalizací za nespolehlivost
- `sla-aware` / `sla` — upřednostní kandidáty, kteří splňují cíle SLO pro latenci p95, chybovost a volitelně
  náklady
- `lkgp` — nejprve poslední známý funkční poskytovatel

### Podrobný popis strategií routeru

Engine Auto-Combo nabízí 6 zaměnitelných implementací **RouterStrategy**, mezi kterými
lze přepínat prostřednictvím `config.routerStrategy` (nebo staršího `config.auto.routerStrategy`).
Každá strategie vybere jednoho poskytovatele z fondu kandidátů na základě `RoutingContext`
(typ úlohy, indikace použití nástrojů/vizuálního vstupu, odhad počtu tokenů, volitelné zásady SLA, volitelný
poslední známý funkční poskytovatel).

#### 1. `rules` (výchozí) — 16faktorové vážené hodnocení

Obaluje stávající hodnoticí engine. Vyfiltruje kandidáty s jističem ve stavu `OPEN`
a poté spustí `scorePool()` s aktuálním typem úlohy a `getTaskFitness()`,
přičemž vybere poskytovatele s nejvyšším skóre.

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

**Kdy použít**: Výchozí volba. Použijte, pokud požadujete vyvážený kompromis mezi všemi signály.

**Alias**: `rules` (bez aliasu)

---

#### 2. `cost` / `eco` — nejlevnější funkční poskytovatel

Seřadí fond kandidátů podle `costPer1MTokens` (vzestupně) a vybere nejlevnějšího.
Nejprve vyfiltruje kandidáty ve stavu `OPEN`.

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

**Kdy použít**: Úlohy citlivé na náklady, dávkové zpracování nebo úlohy na pozadí.

**Aliasy**: `cost`, `eco`

---

#### 3. `latency` / `fast` — nejnižší latence p95 s penalizací za nespolehlivost

Řadí podle `p95LatencyMs + (errorRate * 1000)`. Penalizace chybovosti zajišťuje,
že nespolehliví poskytovatelé budou zařazeni níže, i když je jejich nominální latence nízká.

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

**Kdy použít**: Úlohy citlivé na latenci, například chat v reálném čase, automatické doplňování nebo
interaktivní asistenti pro programování.

**Aliasy**: `latency`, `fast`

---

#### 4. `sla-aware` / `sla` — dodržování SLO pro latenci/chybovost/náklady

Každého kandidáta hodnotí podle toho, jak dobře splňuje nakonfigurované zásady SLO:

| Faktor           | Váha | Vzorec                                                  |
| ---------------- | ---- | ------------------------------------------------------- |
| Skóre latence    | 35%  | `threshold / max(value, ε)`                             |
| Skóre chybovosti | 35%  | `threshold / max(value, ε)`                             |
| Skóre stavu      | 15%  | `1.0` (CLOSED) / `0.5` (HALF_OPEN) / `0.0` (OPEN)       |
| Skóre nákladů    | 10%  | `threshold / max(value, ε)` nebo inverzně normalizované |
| Skóre stability  | 5%   | inverzně normalizovaná směrodatná odchylka latence      |

Když je nastaveno `hardConstraints: true`, kandidáti jsou řazeni primárně podle **skóre porušení**
(o kolik překračují některé SLO) a následně podle složeného skóre. V opačném případě se používá
pouze složené skóre.

```ts
class SLAStrategyImpl implements RouterStrategy {
  readonly name = "sla-aware";
  readonly description =
    "Selects the provider most likely to satisfy latency, error-rate, and cost SLOs";

  select(pool, context) {
    // ... ohodnotí každého kandidáta podle zásad: { targetP95Ms, maxErrorRate, maxCostPer1MTokens, hardConstraints }
  }
}
```

**Pole SLA** (nastavují se v konfiguraci kombinace):

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

**Kdy použít**: Produkční úlohy s přísnými limity latence, chybovosti nebo nákladů.

**Aliasy**: `sla-aware`, `sla`

---

#### 5. `lkgp` — nejprve poslední známý funkční poskytovatel

Nejprve vyzkouší **posledního známého funkčního poskytovatele** (pokud je nastaven) a poté přejde na
strategii `rules`. Je to užitečné pro zachování příslušnosti k relaci — následné požadavky
v konverzaci zpracovává stejný poskytovatel.

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

    // Přechod na strategii rules
    return getStrategy("rules").select(pool, context);
  }
}
```

**Kdy použít**: Vícekolové konverzace, u kterých chcete, aby následné požadavky zpracovával
stejný poskytovatel (např. kvůli ukládání do mezipaměti, kontinuitě kontextu nebo konzistenci cen).

**Alias**: `lkgp` (bez aliasu)

---

### Vlastní strategie směrovače

Prostřednictvím veřejného API můžete zaregistrovat vlastní implementaci `RouterStrategy`:

```ts
import {
  registerStrategy,
  type RouterStrategy,
} from "@omniroute/open-sse/services/autoCombo/routerStrategy";

class MyCustomStrategy implements RouterStrategy {
  readonly name = "my-custom";
  readonly description = "My custom routing strategy";

  select(pool, context) {
    // Zde vložte vlastní logiku směrování
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

Poté ji použijte:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "my-custom"
  }
}
```

---

### Průvodce výběrem strategie směrovače

| Případ použití       | Strategie   | Důvod                                            |
| -------------------- | ----------- | ------------------------------------------------ |
| Vyvážená úloha       | `rules`     | Výchozí — zohledňuje všechny faktory             |
| Minimalizace nákladů | `cost`      | Vždy vybere nejlevnějšího poskytovatele          |
| Minimalizace latence | `latency`   | Vybere nejrychlejšího spolehlivého poskytovatele |
| Přísná SLO           | `sla-aware` | Filtruje podle limitů p95/chybovosti/nákladů     |
| Vícekolový chat      | `lkgp`      | Zachování příslušnosti k relaci                  |

Pole pro strategii zohledňující SLA:

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

## Vhodnost pro úlohy

Více než 30 modelů bylo ohodnoceno napříč 6 typy úloh (`coding`, `review`, `planning`, `analysis`, `debugging`, `documentation`). Podporuje zástupné vzory (např. `*-coder` → vysoké skóre pro programování).

## Rekapitulace automatických variant

Včetně samotného `auto` (výchozího) a 6 hodnot `AutoVariant` deklarovaných v `autoPrefix.ts` existuje **7 použitelných ID modelů**:

`auto`, `auto/coding`, `auto/fast`, `auto/cheap`, `auto/offline`, `auto/smart`, `auto/lkgp`

(`AutoVariant` samotný obsahuje 6 hodnot; 7. možností je „žádná varianta“ — samotné `auto` — kterou `parseAutoPrefix()` zpracovává jako `variant: undefined`.)

## Jak úrovně zapadají do Auto-Combo

Bodovací funkce se 16 faktory (`open-sse/services/autoCombo/scoring.ts`) považuje příslušnost k úrovni za dva signály: `tierPriority` (0.0476) a `tierAffinity` (0.0476). Úplnou sadu `DEFAULT_WEIGHTS` naleznete výše v kanonické [tabulce bodovacích faktorů](#how-it-works-persisted-auto-combos) — přepsání pro jednotlivé balíčky (ship-fast/cost-saver/quality-first/offline-friendly) jsou uvedena v tabulce „Profily vah podle balíčku“.

Samotná úroveň **nezaručuje**, že Tier 1 bude první — pokud má Tier 1 vysokou latenci nebo neoptimální poměr ceny a kvality, zvítězí Tier 2. Chcete-li vynutit pořadí úrovní, použijte strategii komba `priority` a seřaďte poskytovatele podle úrovně.

Chcete-li výrazně upřednostnit Tier 1 (předplatné), zvyšte váhu `tierPriority`:

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "tierPriority": 0.3, "costInv": 0.05 } } }
}
```

Definice úrovní a klasifikaci poskytovatelů naleznete v `docs/marketing/TIERS.md`.

## Testování a pokrytí

### Deterministická matice rozhodování o směrování (`npm run test:combo:matrix`)

`tests/integration/combo-matrix/*.test.ts` ověřuje **rozhodnutí** směrování všech 19 veřejných strategií v rámci kompletního reálného kombinačního kanálu s mockovaným upstreamem. Pokrytí zahrnuje:

- Všech 19 strategií `ROUTING_STRATEGY_VALUES` (ordered, weighted, cost, context, fusion, …).
- Kompletní test `quota-share` (interní): spravedlnost DRR + snížení priority při saturaci prostřednictvím skutečného bodu `selectQuotaShareTarget` (`registerQuotaFetcher` / `setLKGP` / `__setHeadroomSaturationFetcherForTests`).
- Pokrytí univerzálního předávání `context-relay` pro každý počet cílů.

Tato sada se spouští v CI (úloha `test:integration`) s `--test-concurrency=1` a `--test-force-exit`, takže je deterministická a nevyžaduje živé přihlašovací údaje.

### Podmíněné živé smoke testy (NEJSOU v CI — skuteční poskytovatelé)

| Příkaz                                 | Co provádí                                                                          |
| :------------------------------------- | :---------------------------------------------------------------------------------- |
| `npm run test:combo:live`              | Skutečné směrování v procesu s `RUN_COMBO_LIVE=1`; vytvoří snímek živé DB OmniRoute |
| `npm run test:combo:live:vps`          | HTTP volání na živý server OmniRoute (nastavte `COMBO_LIVE_BASE_URL`)               |
| `npm run test:combo:live:vps:failover` | Totéž se záměrně vyvolanými scénáři převzetí služeb při selhání                     |

Tyto smoke testy prověřují skutečnou přenosovou cestu (kombo → poskytovatel → dokončení). Z CI jsou záměrně vyloučeny, protože vyžadují živé přihlašovací údaje a přístup k VPS.

---

## Soubory

| Soubor                                                    | Účel                                                                                                                              |
| :-------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| `open-sse/services/autoCombo/scoring.ts`                  | Skórovací funkce se 16 faktory, `DEFAULT_WEIGHTS`, norma fondu                                                                    |
| `open-sse/services/autoCombo/taskFitness.ts`              | Vyhledávání vhodnosti modelu pro úlohu                                                                                            |
| `open-sse/services/autoCombo/engine.ts`                   | Logika výběru, bandit, rozpočtový limit                                                                                           |
| `open-sse/services/autoCombo/selfHealing.ts`              | Vyloučení, sondy, režim incidentu                                                                                                 |
| `open-sse/services/autoCombo/modePacks.ts`                | 6 profilů vah (rychlé vydání, úspora nákladů, důraz na kvalitu, vhodné pro offline režim, důraz na spolehlivost, chaotický režim) |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Parser prefixu `auto/` + 6 variant                                                                                                |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Sestavuje objekt `AutoComboConfig` v paměti z aktivních připojení                                                                 |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Testovací rozhraní pro simulaci registru poskytovatelů                                                                            |
| `src/shared/constants/routingStrategies.ts`               | `ROUTING_STRATEGY_VALUES` (19 strategií)                                                                                          |
| `src/sse/handlers/chat.ts`                                | Integrace: zkratka pro prefix auto                                                                                                |
