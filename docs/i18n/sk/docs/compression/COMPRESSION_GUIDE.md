# 🗜️ Prompt Compression Guide — OmniRoute (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Automaticky ušetrite 15 – 95 % z vhodného kontextu. Stručný prehľad nájdete v [časti README o kompresii](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Prehľad

OmniRoute implementuje modulárny proces kompresie promptov, ktorý sa spúšťa **proaktívne** predtým, ako požiadavky dorazia k nadradeným poskytovateľom. To znamená, že tokeny šetríte transparentne — pracovný postup nemusíte nijako meniť.

```
Požiadavka klienta
  → Výber stratégie kompresie
    → Prepísanie kombináciou? → Použiť nastavenie kombinácie
    → Prah automatického spustenia? → Použiť automatický režim
    → Predvolený režim? → Použiť globálne nastavenie
    → Vypnuté? → Preskočiť kompresiu
  → Vybraný režim kompresie
    → Vypnuté: Bez kompresie
    → Ľahký: Bezpečné vyčistenie medzier/formátovania (~15 %)
    → Štandardný: Odstránenie výplňových slov v štýle jaskynnej reči (~30 %)
    → Agresívny: Starnutie histórie + sumarizácia (~50 %)
    → Ultra: Heuristické prerezávanie + preriedenie blokov kódu (~75 %)
    → RTK: Filtrovanie výstupu terminálu/nástrojov so zohľadnením príkazov (rozsah 60 – 90 % na vstupe)
    → Vrstvený: Usporiadaný proces s viacerými jadrami, zvyčajne RTK a potom Caveman (rozsah 78 – 95 % vhodného obsahu)
  → Komprimovaná požiadavka → Poskytovateľ
```

---

## Režimy kompresie

### Vypnuté

Nepoužije sa žiadna kompresia. Všetky správy prejdú bez zmeny.

### Ľahký režim (~15 % úspora, latencia <1 ms)

Najbezpečnejší režim — bez akejkoľvek zmeny významu, iba vyčistenie formátovania:

| Technika                 | Popis                                                         |
| ------------------------ | ------------------------------------------------------------- |
| `collapseWhitespace`     | Zlúči po sebe idúce prázdne riadky a odstráni koncové medzery |
| `dedupSystemPrompt`      | Odstráni duplicitné systémové správy                          |
| `compressToolResults`    | Komprimuje podrobné výstupy nástrojov/funkcií                 |
| `removeRedundantContent` | Odstráni opakované pokyny                                     |
| `replaceImageUrls`       | Skráti identifikátory URI obrázkových údajov base64           |

**Najvhodnejšie pre:** Neustále používanie a pracovné postupy s kritickými požiadavkami na bezpečnosť.

### Štandardný režim (~30 % úspora)

Inšpirovaný nástrojom [Caveman](https://github.com/JuliusBrussee/caveman) — odstraňuje výplňové slová a rozvláčne formulácie, pričom zachováva význam:

- Odstraňuje výplňové slová („prosím“, „myslím si“, „v podstate“, „vlastne“)
- Skracuje rozvláčne frázy („za účelom“ → „na“, „v dôsledku“ → „pretože“)
- Odstraňuje zdvorilé zmierňujúce formulácie („Nevadilo by vám...“, „Ak by ste mohli...“)
- Viac ako 30 regulárnych výrazov vyladených pre programátorské prompty

**Najvhodnejšie pre:** Každodenné programátorské pracovné postupy a tímy, ktoré dbajú na náklady.

### Agresívny režim (~50 % úspora)

Inteligentná správa histórie pri dlhých reláciách:

- **Starnutie správ** — staršie správy sa postupne komprimujú
- **Sumarizácia výsledkov nástrojov** — dlhé výstupy nástrojov sa nahradia súhrnmi
- **Ochrany štrukturálnej integrity** — zabezpečujú konzistentnosť dvojíc `tool_use` + `tool_result`
- **Zohľadnenie kontextového okna** — rešpektuje limity tokenov jednotlivých modelov

**Najvhodnejšie pre:** Dlhé relácie ladenia a rozsiahle kódové základne.

### Režim Ultra (~75 % úspora)

Maximálna kompresia pre scenáre s kritickými požiadavkami na počet tokenov:

- **Heuristické prerezávanie** — odstraňuje správy pod prahom relevantnosti
- **Preriedenie blokov kódu** — komprimuje opakujúce sa príklady kódu
- **Skracovanie pomocou binárneho vyhľadávania** — nájde optimálny bod skrátenia pre kontextové okno
- Zahŕňa všetky funkcie agresívneho režimu

**Najvhodnejšie pre:** Situácie, keď opakovane narážate na limity kontextu.

### Režim RTK (rozsah 60 – 90 % na vstupe)

Režim RTK je optimalizovaný pre rozsiahle výstupy nástrojov, ktoré sa objavujú v reláciách programovacích agentov:

- Rozpoznáva triedy príkazov/výstupov, ako sú `git status`, `git diff`, `git log`, nástroje na spúšťanie testov,
  zostavenia TypeScript/Vite/Webpack, ESLint/Biome/Prettier, audity/inštalácie npm, protokoly Docker, výstupy
  infraštruktúry a všeobecné výstupy shellu
- Používa balíky filtrov JSON z `open-sse/services/compression/engines/rtk/filters/`
- Importuje filtre schémy RTK TOML v1 z projektových alebo globálnych súborov `filters.toml` s overovaním
  vložených testov a riadením dôveryhodnosti projektových súborov
- Obsahuje 49 vstavaných filtrov s vloženými overovacími vzorkami
- Odstraňuje riadiace sekvencie ANSI, indikátory priebehu, opakované riadky a nerelevantný šum
- Zachováva zlyhania, chyby, upozornenia, zmenené súbory, súhrny a koniec dlhého výstupu
- Podporuje projektové filtre riadené dôveryhodnosťou, globálne filtre a voliteľnú obnovu redigovaného surového výstupu

**Najvhodnejšie pre:** Relácie agentov s prepismi shellu, zostavení, testov, príkazov git a grep a výstupov súborov.

### Vrstvený režim (rozsah 78 – 95 % vhodného obsahu)

Vrstvený režim spúšťa viacero kompresných jadier v deterministickom poradí. Predvolený proces je:

```txt
RTK -> Caveman
```

Toto poradie najprv skomprimuje výstup terminálu/nástrojov a potom použije sémantické skrátenie Caveman na
zostávajúci prompt v prirodzenom jazyku. Vrstvené procesy možno nakonfigurovať globálne alebo prostredníctvom
kombinácií kompresie priradených ku kombináciám smerovania.

**Najvhodnejšie pre:** Zmiešaný kontext s rozsiahlymi protokolmi nástrojov spolu s ľudskými pokynmi alebo súhrnmi asistenta.

---

## Výpočet úspor z upstream projektov

OmniRoute dokumentuje úspory vďaka kompresii z dvoch zdrojov: benchmarkov upstream projektov a
vlastnej kombinácie mechanizmov OmniRoute.

| Zdroj   | Hodnota z upstream README použitá v tomto dokumente                                                                                  |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Caveman | `~75%` menej výstupných tokenov, priemerná úspora výstupu v benchmarkoch `65%`, rozsah `22-87%` a nástroj s kompresiou vstupu `~46%` |
| RTK     | Úspora výstupu príkazov `60-90%`; vzorová relácia `~118,000 -> ~23,900` tokenov, teda úspora `79.7%` (`~80%`)                        |

Pri prekrývajúcich sa dátach nástrojov a kontextu predvolená kombinácia OmniRoute zoraďuje mechanizmy takto:

```txt
RTK -> Caveman
```

Kombinované úspory sa násobia, nesčítavajú:

```txt
combined = 1 - (1 - úspora RTK) * (1 - úspora vstupu Caveman)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Hodnota `78-95%` platí vtedy, keď RTK aj Caveman dokážu zmenšiť rovnaké vstupné alebo kontextové dáta.
Režim výstupu odpovede Caveman je samostatný: keď je zapnutý, použijú sa vlastné úspory výstupu Caveman (`65%`
v priemere, hlavná uvádzaná hodnota `~75%`, rozsah `22-87%`). Celkové úspory nákladov závisia od pomeru vstupov a výstupov.

### Čo v skutočnosti znamená „vhodný“

Uvádzaný rozsah 15-95% je reálny, ale vzťahuje sa iba na **redundantný alebo rozvláčny** obsah — opakované
riadky chýb, výpis zostavenia, ktorý neustále opakuje rovnaké upozornenie, alebo nadmerne veľký výpis z `grep`/čítania súboru. **Neznamená**
to, že každá požiadavka ušetrí takéto množstvo.

Empiricky overené (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): beh
`stacked` (RTK + Caveman) nad blokom `tool_result` v tvare Anthropic, ktorý obsahoval 300 identických
riadkov chýb, dosiahol **úsporu 95.93% tokenov / 96.26% znakov** — presne v uvádzanom
rozsahu. Keď však rovnaký proces spracuje bežný, neredundantný výstup nástroja (čistý zoznam zhôd z `grep`,
krátke načítanie súboru, bežný konverzačný text), správne dosahuje **takmer nulové úspory**, pretože
neobsahuje nič opakujúce sa, čo by bolo možné odstrániť, a `validateCompression()` (`validation.ts`) odmietne odoslať
prepísaný obsah, ktorý by odstránil alebo zmenil bloky kódu, adresy URL, nadpisy, verzie alebo identifikátory konštánt písané VEĽKÝMI PÍSMENAMI.

Ide o očakávané a bezpečné správanie, nie o chybu: relácia programovania, ktorá väčšinou číta alebo prehľadáva čisté súbory,
dosiahne mierne celkové úspory aj pri plne zapnutej kompresii, zatiaľ čo relácia, ktorá narazí na zlyhávajúcu
slučku alebo príliš ukecaný linter, dosiahne pri tomto prenose celý rozsah 78-95%. Nízke percento
súhrnných úspor jednej relácie nepovažujte za dôkaz nesprávnej konfigurácie kompresie — najskôr skontrolujte, či bol
príslušný výstup nástroja skutočne redundantný.

---

## Vizualizácia úspory tokenov

```
Bez kompresie:       47K tokenov odoslaných do LLM
S režimom Lite:      40K odoslaných tokenov          (úspora 15% — bezpečné, vždy zapnuté)
S režimom Standard:  33K odoslaných tokenov          (úspora 30% — pravidlá jaskynnej reči)
S režimom Aggressive:24K odoslaných tokenov          (úspora 50% — starnutie + sumarizácia)
S režimom Ultra:     12K odoslaných tokenov          (úspora 75% — heuristické orezávanie)
S RTK:               19K-5K odoslaných tokenov       (úspora 60-90% na výstupe príkazov/nástrojov)
S režimom Stacked:   10K-2.5K odoslaných tokenov     (vhodný rozsah RTK+Caveman 78-95%)
```

---

## Konfigurácia

### Dashboard

Prejdite na `Dashboard → Context & Cache`:

- **Caveman** — výber režimu, jazykové balíčky, náhľad a globálne predvolené nastavenia
- **RTK** — náhľad filtra príkazov, bezpečnostné nastavenia RTK a katalóg filtrov
- **Compression Combos** — pomenované potrubia enginov priradené k smerovacím kombám
- **Auto-Trigger Threshold** — automaticky zapne kompresiu, keď počet tokenov prekročí prahovú hodnotu

### Prepis pre každé kombo

V `Dashboard → Context & Cache → Compression Combos` priraďte kompresné kombo k smerovaciemu
kombo:

```txt
Kombo: "free-tier-fallback"
  Kompresné kombo: "coding-agent-stack"
  Potrubie: RTK -> Caveman
  Ciele:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

To vám umožní použiť vrstvenú kompresiu na bezplatných/kódovacích poskytovateľoch, zatiaľ čo na
platených predplatných si ponecháte lite režim.

Toto priradenie "Per-Combo Override" je iné ovládanie ako prepis **režimu kompresie smerovacieho
komba** (Default/Off/Lite/Standard/Aggressive/Ultra) – tento prepis nevyberá pomenované potrubie
kompresného komba; iba nastavuje pole `compressionMode`, ktoré konzultuje
`resolveCompressionPlan`. Môže byť nastavené buď na karte komba (`Dashboard → Combos`), alebo, od
#6760, pre každé smerovacie kombo v zozname "Assign to routing" na
`Dashboard → Context & Cache → Compression Combos`, hneď vedľa zaškrtávacieho políčka pre priradenie
potrubia, ktoré je popísané vyššie. Oba povrchy pretrvávajú prostredníctvom rovnakého koncového
bodu `PUT /api/combos/{id}`.

### Prepis pre každú požiadavku

Odošlite hlavičku požiadavky `x-omniroute-compression` na prepísanie plánu kompresie pre jednu
požiadavku. Má najvyššiu prioritu – prekonáva prepis smerovacieho komba, aktívny profil,
automatické spustenie a predvolené nastavenie panela. Neznáme hodnoty sú ignorované (požiadavka
nikdy nie je odmietnutá) a globálny hlavný prepínač stále všetko riadi: keď je kompresia globálne
vypnutá, hlavička ju nemôže zapnúť. Hodnoty:

| Hodnota       | Účinok                                                                                                   |
| ------------- | -------------------------------------------------------------------------------------------------------- |
| `off`         | Žiadna kompresia pre túto požiadavku.                                                                    |
| `default`     | Predvolený profil odvodený z panela (ignoruje aktívny profil). Stratové enginy zostávajú vypnuté.        |
| `safe`        | Rovnaké ako vynechanie hlavičky: iba deduplikácia a skladanie medzier.                                   |
| `allow-lossy` | Zachovať plán operátora tejto požiadavky, vrátane súhrnov, filtrov relevantnosti a prepisov štýlov.      |
| `engine:<id>` | Jeden engine, keď je povolený, napr. `engine:rtk`. Toto je opt-in pre tento engine pre každú požiadavku. |
| `<combo>`     | Pomenované kombo, zhodné najprv podľa názvu (nerozlišuje veľké a malé písmená), potom podľa ID.          |

Bez `allow-lossy`, `engine:<id>` alebo pomenovaného komba sa stratové enginy nepoužijú. Požiadavka
stále dostane deduplikáciu relácie a skladanie medzier, keď je kompresia zapnutá.

Použitý plán sa vráti v hlavičke odpovede `X-OmniRoute-Compression: <mode>; source=<source>`, kde
`<source>` je jedna z `request-header`, `routing-override`, `active-profile`, `auto-trigger`,
`default` alebo `off`.

### API

```bash
# Získanie nastavení kompresie
curl http://localhost:20128/api/settings/compression

# Aktualizácia nastavení kompresie
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Náhľad špecifického RTK/vrstveného užitočného zaťaženia
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Zoznam balíkov filtrov RTK
curl http://localhost:20128/api/context/rtk/filters

# Priame testovanie RTK s voliteľnými metadátami príkazu
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Čo je chránené

Kompresný mechanizmus **vždy zachováva:**

- ✅ Bloky kódu (ohraničené aj vložené)
- ✅ URL adresy a cesty k súborom
- ✅ Štruktúry JSON a štruktúrované údaje
- ✅ Identifikátory a chránené technické tokeny
- ✅ Matematické výrazy
- ✅ Definície volaní nástrojov/funkcií
- ✅ Systémové prompty (v režime lite)

Obnova nespracovaného výstupu RTK rediguje bežné API kľúče, bearer tokeny, tokeny Slacku, prístupové kľúče AWS,
heslá, tokeny a tajné údaje predtým, než sa čokoľvek uloží.

---

## Štatistiky kompresie

Každá komprimovaná požiadavka obsahuje štatistiky v serverových protokoloch:

```json
{
  "originalTokens": 47200,
  "compressedTokens": 40120,
  "savingsPercent": 15.0,
  "techniquesUsed": ["collapseWhitespace", "dedupSystemPrompt"],
  "mode": "lite",
  "engine": "caveman",
  "compressionComboId": "coding-agent-stack",
  "durationMs": 0.8,
  "rtkRawOutputPointers": []
}
```

---

## Plán fáz

| Fáza    | Režimy                                                                                                                                                               | Stav      |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| Fáza 1  | Off, Lite                                                                                                                                                            | ✅ Dodané |
| Fáza 2  | Standard, Aggressive, Ultra                                                                                                                                          | ✅ Dodané |
| Fáza 3  | RTK, Stacked, Compression Combos                                                                                                                                     | ✅ Dodané |
| Fáza 4  | Output Styles, SLM-tier Ultra, eval harness                                                                                                                          | ✅ Dodané |
| Fáza 4C | Adaptívny rozpočet kontextu ("volič") — výpočtový engine + API (`contextBudget` na `PUT /api/settings/compression`) + ovládacie prvky režimu/politiky palubnej dosky | ✅ Dodané |

---

## Poďakovanie

Pravidlá kompresie štandardného režimu sú inšpirované projektom **[Caveman](https://github.com/JuliusBrussee/caveman)** od autora **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — virálnym projektom „prečo používať veľa tokenov, keď stačí málo“. Caveman uvádza o `~75%` menej výstupných tokenov, priemernú úsporu výstupu v benchmarkoch `65%`, rozsah úspory výstupu `22-87%` a nástroj na kompresiu vstupu s úsporou `~46%`.

Režim RTK je inšpirovaný projektom **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** od **[RTK AI](https://github.com/rtk-ai)** — vysokovýkonným projektom na kompresiu výstupu príkazov pre terminál, zostavenie, testovanie, git a filtrovanie výstupu nástrojov. RTK uvádza úsporu `60-90%`, pričom ukážková relácia v jeho súbore README vykazuje úsporu `~80%`.

---

## Pokročilé kompresné systémy

Okrem 7 štandardných režimov OmniRoute zahŕňa niekoľko pokročilých kompresných
systémov, ktoré fungujú automaticky na základe kontextu.

### Kompresia s ohľadom na cache

Niektorí poskytovatelia (ako Anthropic s prompt caching) podporujú **prompt caching**,
ktoré im umožňuje ukladať časti promptu do cache, aby sa znížili náklady a latencia. Keď
je caching povolený, agresívna kompresia môže v skutočnosti **poškodiť** výkon,
pretože mení tokeny v cache, čím cache zneplatňuje.

Modul `cachingAware.ts` to rieši **detekciou kontextu cache** a
**prispôsobením stratégie kompresie** podľa toho.

#### Ako to funguje

1.  **Detekcia kontextu cache** — Skenuje telo požiadavky na značky `cache_control`
2.  **Identifikácia poskytovateľov s cachingom** — Kontroluje, či cieľový poskytovateľ podporuje caching
3.  **Prispôsobenie stratégie** — Znižuje `aggressive`/`ultra` na `standard` pre poskytovateľov s cachingom
4.  **Preskočenie systémového promptu** — Systémové prompty sú zvyčajne v cache, takže ich nekomprimujte
5.  **Použitie deterministických transformácií** — Používajte iba transformácie, ktoré produkujú konzistentný výstup

#### Príklad kódu

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Cache marker
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Kedy použiť

Kompresia s ohľadom na cache je **vždy zapnutá** — nevyžaduje žiadnu konfiguráciu. Aktivuje sa
iba vtedy, keď:

- Požiadavka obsahuje značky `cache_control`
- Cieľový poskytovateľ podporuje prompt caching (Anthropic, OpenAI atď.)

### Progresívne starnutie

Dlhé konverzácie akumulujú mnoho správ, ale staršie správy sa stávajú menej
relevantnými. Modul `progressiveAging.ts` **degraduje správy podľa vzdialenosti ťahu**:

- **Nedávne ťahy (0-3)**: Zachované doslovne (plné detaily)
- **Stredné ťahy (4-8)**: Ľahká kompresia (medzery, vyčistenie formátovania)
- **Staré ťahy (9+)**: Jaskynná kompresia (odstránenie výplní, zhrnutie)
- **Veľmi staré ťahy (20+)**: Silne zhrnuté alebo vynechané

#### Príklad kódu

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 50 more turns ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // Prvé 3 ťahy: doslovne
  light: 8, // Ťahy 4-8: ľahká kompresia
  moderate: 20, // Ťahy 9-20: jaskynná kompresia
  // Ťahy 21+: silné zhrnutie
});

// saved = počet ušetrených tokenov
```

#### Kedy použiť

Progresívne starnutie je **vždy zapnuté** pre režimy `aggressive` a `ultra`. Je
obzvlášť účinné pre:

- Dlhotrvajúce kódovacie relácie
- Viacdňové konverzácie
- Agentné pracovné postupy s mnohými volaniami nástrojov

### Režim výstupu "Jaskynný človek" (Caveman Output Mode)

Modul `outputMode.ts` vkladá **inštrukcie do systémového promptu**, aby samotný
model produkoval komprimovaný, stručný výstup (štýl "jaskynného človeka").

#### Ako to funguje

Namiesto kompresie vstupu tento režim pridá systémový prompt ako:

> "Odpovedajte minimálnymi slovami. Vynechajte zdvorilosti. Používajte krátke vety."

To funguje obzvlášť dobre pre:

- Generovanie kódu (stručnejší výstup = menej tokenov)
- Rýchle otázky a odpovede (nie je potrebné rozsiahle vysvetľovanie)
- Dávkové spracovanie (maximalizácia priepustnosti)

#### Kedy použiť

Režim výstupu "jaskynný človek" je **voliteľný** — nastavte ho prostredníctvom kombinovanej konfigurácie:

```json
{
  "strategy": "auto",
  "config": {
    "auto": {
      "outputMode": "caveman"
    }
  }
}
```

### Štýly výstupu (katalóg)

Vyššie uvedený režim výstupu "jaskynný človek" je **stará cesta s jedným štýlom**. Fáza 4 ho zovšeobecnila
do katalógu skladateľných štýlov výstupu: `OUTPUT_STYLE_CATALOG` v
`open-sse/services/compression/outputStyles/catalog.ts`. Každý štýl je inštrukcia v systémovom promtpte,
ktorá prinúti samotný model produkovať lacnejší výstup; štýly môžu byť povolené spoločne a sú vkladané
v poradí podľa katalógu.

| Štýl                         | `id`          | Čo robí                                                                                                                                                                                                                      | Jazyky inštrukcií                                                           |
| :--------------------------- | :------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------- |
| Stručná próza                | `terse-prose` | Vypúšťa výplňové slová/články/zdržiavanie; zachováva presnú technickú podstatu. Rovnaký text ako starý výstupný režim caveman (odkazovaný, nie prepísaný).                                                                   | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                               |
| Menej kódu                   | `less-code`   | YAGNI rebrík: najmenšia funkčná zmena, žiadne nevyžiadané abstrakcie.                                                                                                                                                        | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                               |
| Ponytail (lenivý senior dev) | `ponytail`    | "Najlepší kód je kód, ktorý nikdy nebol napísaný": opätovné použitie > prepísanie, hlavná príčina > symptóm, najkratší funkčný rozdiel.                                                                                      | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                               |
| Mám ADHD (akcia-prvá)        | `i-have-adhd` | Akcia prvá (príkaz/cesta/úryvok pred prózou), číslované ohraničené kroky, JEDEN konkrétny ďalší krok, žiadna preambula/rekapitulácia/závery. Adaptované z [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                               |
| Stručné CJK (文言)           | `terse-cjk`   | Klasický čínsky ultra-stručný štýl.                                                                                                                                                                                          | zh (obmedzené na lokalitu: ponúkané len vtedy, keď je rozlíšený jazyk `zh`) |

Každý štýl obsahuje tri úrovne intenzity — `lite`, `full`, `ultra` — a každá úroveň
končí spoločnou klauzulou o hraniciach, ktorá zachováva bloky kódu, cesty k súborom, príkazy,
chybové reťazce, URL a identifikátory doslovne.

#### Ako funguje injekcia

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) rozrieši
výber voči katalógu (neznáme ID a štýly s nesúladom lokality sú
vynechané, nikdy nejde o chybu), zreťazí vybrané inštrukcie v poradí katalógu,
pripojí klauzulu o hraniciach **raz** a vloží výsledok na začiatok
systémovej výzvy za jediným markerom idempotencie (`[OmniRoute Output Styles]`) — opätovné použitie
je no-op. Keď má detekovaný jazyk požiadavky preklad,
namiesto angličtiny sa vloží lokalizovaná inštrukcia.

#### Ako povoliť

Na paneli: **Context → Settings → Compression** — jeden riadok pre každý štýl s
prepínačom zapnutia/vypnutia a voličom úrovne. Programovo, konfigurácia kompresie
uchováva výber ako:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Spätná kompatibilita: staré kombinované nastavenie `outputMode: "caveman"` stále funguje a mapuje sa na
`terse-prose`, bajtovo identické so starou injekciou v každom staršom jazyku.

Výber jazyka: s povoleným `languageConfig.enabled` `autoDetect` vyberie
jazyk poslednej správy používateľa (rovnaký detektor ako vstupné enginy);
vypnutie `autoDetect` pripne `defaultLanguage`. Vypnuté → Angličtina.

Matica štýl × jazyk je pripnutá pomocou
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: nový štýl nemôže byť dodaný
bez aspoň pt-BR prekladu (alebo explicitnej sledovanej výnimky) a
existujúci štýl nemôže potichu stratiť lokalitu. Ak chcete pridať štýl, pozrite si
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Kompresia výsledkov nástrojov

Modul `toolResultCompressor.ts` poskytuje **5 špecializovaných stratégií kompresie**
pre výsledky nástrojov (volania funkcií, výstupy agentov, výsledky vyhľadávania atď.):

1.  **Kompresia výsledkov vyhľadávania** — Odstraňuje redundantné výsledky, ponecháva top-N
2.  **Kompresia čítania súborov** — Skracuje veľké súbory, zachováva hlavičky/importy
3.  **Kompresia vykonávania kódu** — Ponecháva len podstatné stdout/stderr
4.  **Kompresia databázových dotazov** — Obmedzuje riadky, odstraňuje podrobné metadáta
5.  **Kompresia odpovedí API** — Odstraňuje nulové polia, zhusťuje polia

#### Kedy použiť

Kompresia výsledkov nástrojov je **vždy zapnutá**, keď sú prítomné volania nástrojov. Nie je
potrebná žiadna konfigurácia.

### Skladaný pipeline

Skladaný režim spúšťa **viacero enginov v sekvencii** — zvyčajne najprv RTK
(60-90% úspora na výstupe nástroja), potom Caveman (ďalších 30% úspora na
zostávajúcom texte). Tým sa dosiahne **celková úspora 78-95%**.

#### Ako to funguje

```
Vstup (1000 tokenov)
  → RTK (filter s vedomím príkazu) → 200 tokenov
    → Caveman (odstránenie výplne) → 140 tokenov
  → Výstup (140 tokenov, 86% úspora)
```

#### Kedy použiť

Skladaný režim použite pre:

- Pracovné postupy náročné na nástroje (agentné kódovanie, výskum)
- Nákladovo citlivé dávkové spracovanie
- Keď potrebujete maximálnu úsporu tokenov

Konfigurujte pomocou kombinácie:

```json
{
  "strategy": "auto",
  "config": {
    "auto": {
      "modePack": "stacked"
    }
  }
}
```

---

## Prepísanie kompresie pre kombinácie

Globálny režim kompresie môžete prepísať **pre každú kombináciu samostatne**, aby ste jemne doladili správanie
pre rôzne prípady použitia:

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "auto": {
      "weights": { "taskFit": 0.5 },
      "modePack": "quality-first"
    }
  },
  "compressionOverride": {
    "mode": "aggressive",
    "stackedPipelines": ["rtk", "caveman"],
    "preserveToolDefinitions": true
  }
}
```

Je to užitočné pre:

- **Kombinácie na programovanie**: Pri dlhých reláciách použite režim `aggressive`
- **Kombinácie na rýchle otázky a odpovede**: Na rýchle odpovede použite režim `lite`
- **Kombinácie s intenzívnym používaním nástrojov**: Na dosiahnutie maximálnej úspory použite režim `stacked`
- **Produkčné kombinácie**: Pre poskytovateľov s podporou ukladania do vyrovnávacej pamäte použite režim `cache-aware`

---

## Pozrite si tiež

- [Konfigurácia prostredia](../reference/ENVIRONMENT.md) — Premenné prostredia pre kompresiu
- [Sprievodca architektúrou](../architecture/ARCHITECTURE.md) — Interné fungovanie kompresného kanála
- [Používateľská príručka](../guides/USER_GUIDE.md) — Začíname s kompresiou
- [Kompresia RTK](./RTK_COMPRESSION.md) — Filtre RTK, model dôveryhodnosti, overovacia brána a obnovenie nespracovaného výstupu
- [Kompresné mechanizmy](./COMPRESSION_ENGINES.md) — Caveman, RTK, skladanie, API, MCP a ovládací panel
- [Formát pravidiel kompresie](./COMPRESSION_RULES_FORMAT.md) — Formát balíka pravidiel JSON
- [Jazykové balíky kompresie](./COMPRESSION_LANGUAGE_PACKS.md) — Pravidlá Caveman špecifické pre jednotlivé jazyky
