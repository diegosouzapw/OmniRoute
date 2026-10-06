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

## Pokročilé systémy kompresie

Okrem 7 štandardných režimov obsahuje OmniRoute niekoľko pokročilých systémov kompresie, ktoré fungujú automaticky podľa kontextu.

### Kompresia zohľadňujúca vyrovnávaciu pamäť

Niektorí poskytovatelia (napríklad Anthropic s ukladaním promptov do vyrovnávacej pamäte) podporujú **ukladanie promptov do vyrovnávacej pamäte**, ktoré im umožňuje ukladať časti promptu, čím sa znižujú náklady a latencia. Keď je ukladanie do vyrovnávacej pamäte povolené, agresívna kompresia môže v skutočnosti **zhoršiť** výkon, pretože mení uložené tokeny, čím zneplatňuje vyrovnávaciu pamäť.

Modul `cachingAware.ts` tento problém rieši **zisťovaním kontextu ukladania do vyrovnávacej pamäte** a zodpovedajúcou **úpravou stratégie kompresie**.

#### Ako to funguje

1. **Zistenie kontextu ukladania do vyrovnávacej pamäte** — Prehľadá telo požiadavky a vyhľadá značky `cache_control`
2. **Identifikácia poskytovateľov podporujúcich ukladanie do vyrovnávacej pamäte** — Skontroluje, či cieľový poskytovateľ podporuje ukladanie do vyrovnávacej pamäte
3. **Úprava stratégie** — Pre poskytovateľov podporujúcich ukladanie do vyrovnávacej pamäte zníži úroveň `aggressive`/`ultra` na `standard`
4. **Vynechanie systémového promptu** — Systémové prompty sa zvyčajne ukladajú do vyrovnávacej pamäte, preto ich nekomprimuje
5. **Použitie deterministických transformácií** — Používa iba transformácie, ktoré vytvárajú konzistentný výstup

#### Príklad kódu

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Značka vyrovnávacej pamäte
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Kedy použiť

Kompresia zohľadňujúca vyrovnávaciu pamäť je **vždy zapnutá** — nie je potrebná žiadna konfigurácia. Aktivuje sa iba vtedy, keď:

- Požiadavka obsahuje značky `cache_control`
- Cieľový poskytovateľ podporuje ukladanie promptov do vyrovnávacej pamäte (Anthropic, OpenAI atď.)

### Progresívne starnutie

V dlhých konverzáciách sa hromadí veľa komunikačných kôl, ale staršie kolá sú čoraz menej relevantné. Modul `progressiveAging.ts` **redukuje správy podľa vzdialenosti komunikačného kola**:

- **Nedávne kolá (0-3)**: Zachovajú sa doslovne (úplné detaily)
- **Stredne staré kolá (4-8)**: Ľahká kompresia (vyčistenie medzier a formátovania)
- **Staré kolá (9+)**: Telegrafická kompresia (odstránenie výplňových slov, sumarizácia)
- **Veľmi staré kolá (20+)**: Výrazne sa zosumarizujú alebo odstránia

#### Príklad kódu

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... ďalších 50 kôl ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // Prvé 3 kolá: doslovne
  light: 8, // Kolá 4-8: ľahká kompresia
  moderate: 20, // Kolá 9-20: telegrafická kompresia
  // Kolá 21+: výrazná sumarizácia
});

// saved = počet ušetrených tokenov
```

#### Kedy použiť

Progresívne starnutie je **vždy zapnuté** v režimoch `aggressive` a `ultra`. Je obzvlášť účinné pri:

- Dlhodobých programovacích reláciách
- Viacdňových konverzáciách
- Agentných pracovných postupoch s mnohými volaniami nástrojov

### Režim telegrafického výstupu

Modul `outputMode.ts` vkladá **inštrukcie systémového promptu**, aby samotný model vytváral komprimovaný, stručný výstup (v „telegrafickom“ štýle).

#### Ako to funguje

Namiesto kompresie vstupu tento režim pridá systémový prompt, napríklad:

> „Odpovedaj s minimom slov. Vynechaj zdvorilostné frázy. Používaj krátke vety.“

Funguje to obzvlášť dobre pri:

- Generovaní kódu (stručnejší výstup = menej tokenov)
- Rýchlych otázkach a odpovediach (nie sú potrebné podrobné vysvetlenia)
- Dávkovom spracovaní (maximalizácia priepustnosti)

#### Kedy použiť

Režim telegrafického výstupu je **voliteľný** — nastavte ho prostredníctvom kombinovanej konfigurácie:

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

Vyššie uvedený režim telegrafického výstupu predstavuje **pôvodný spôsob s jediným štýlom**. Fáza 4 ho zovšeobecnila na katalóg kombinovateľných štýlov výstupu: `OUTPUT_STYLE_CATALOG` v súbore `open-sse/services/compression/outputStyles/catalog.ts`. Každý štýl je inštrukciou systémového promptu, ktorá vedie model k vytváraniu úspornejšieho výstupu; štýly možno povoliť súčasne a vkladajú sa v poradí uvedenom v katalógu.

| Štýl                            | `id`          | Čo robí                                                                                                                                                                                                                      | Jazyky pokynov                                                             |
| ------------------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Stručná próza                   | `terse-prose` | Odstraňuje výplňové slová/členy/váhanie; zachováva presný technický obsah. Rovnaký text ako v staršom režime výstupu caveman (odkazuje sa naň, neopakuje sa).                                                                | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                              |
| Menej kódu                      | `less-code`   | Rebríček YAGNI: najmenšia funkčná zmena, žiadne nevyžiadané abstrakcie.                                                                                                                                                      | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                              |
| Copík (lenivý seniorný vývojár) | `ponytail`    | „Najlepší kód je ten, ktorý nebol nikdy napísaný“: opätovné použitie > prepisovanie, koreňová príčina > symptóm, najkratší funkčný diff.                                                                                     | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                              |
| Mám ADHD (najprv akcia)         | `i-have-adhd` | Najprv akcia (príkaz/cesta/úryvok pred prózou), očíslované kroky s jasným rozsahom, JEDEN konkrétny ďalší krok, bez úvodu/zhrnutia/záveru. Upravené podľa [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                              |
| Stručná CJK (文言)              | `terse-cjk`   | Mimoriadne stručný štýl klasickej čínštiny.                                                                                                                                                                                  | zh (obmedzené podľa locale: ponúka sa iba vtedy, keď je určený jazyk `zh`) |

Každý štýl sa dodáva v troch úrovniach intenzity — `lite`, `full`, `ultra` — a každá úroveň
sa končí spoločnou klauzulou o hraniciach, ktorá ponecháva bloky kódu, cesty k súborom, príkazy,
chybové reťazce, URL adresy a identifikátory bez zmien.

#### Ako funguje vkladanie

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) porovná
výber s katalógom (neznáme id a štýly nezodpovedajúce locale sa vynechajú, nikdy nejde
o chybu), spojí vybrané pokyny v poradí podľa katalógu, **raz** pridá klauzulu
o hraniciach a blok začne jedinou značkou idempotencie
(`[OmniRoute Output Styles]`), takže opätovné použitie nič nezmení. Ak existuje pre určený
jazyk (pozri Výber jazyka nižšie) preklad, namiesto angličtiny sa vloží lokalizovaný pokyn.

V tele s `messages` kontroluje obídenie podľa obsahu (`shouldBypassCavemanOutputMode()` v
`open-sse/services/compression/outputMode.ts`) posledné tri správy a preskočí
štýly pre celý ťah, ak zodpovedajú kľúčovým slovám týkajúcim sa bezpečnosti, nezvratných
akcií, objasnenia alebo citlivosti na poradie. Obídenie sa vykonáva podľa nastavenia prepínača
**Auto-Clarity Bypass** (`cavemanOutputMode.autoClarity`) na ovládacom paneli.

Keď obídenie umožní spracovanie ťahu, `placeSystemInstruction()` (rovnaký súbor), ktorý
nikdy nevytvára nový `messages[0]`, umiestni blok na prvé z týchto nájdených miest:

1. Úvodná systémová správa s reťazcovým obsahom: blok sa pridá za jej text.
2. Pole najvyššej úrovne `system`: blok sa pridá za text reťazca alebo sa
   pridá ako nový textový blok do poľa blokov obsahu.
3. Prvá neskoršia systémová správa s reťazcovým obsahom: blok sa pridá za jej
   text.
4. Nič z uvedeného: blok sa vloží do novej systémovej správy na konci `messages`.

V tele bez `messages` sa blok pridá do reťazcového poľa `instructions`
alebo sa z neho stane `instructions`, keď telo obsahuje `input` (reťazec alebo pole). Telo,
ktoré neobsahuje ani `instructions`, ani `input`, sa preskočí ako `no_messages`.

#### Ako povoliť

Na ovládacom paneli: **Context → Settings → Compression** — jeden riadok pre každý štýl
s prepínačom zapnutia/vypnutia a výberom úrovne. Programovo konfigurácia kompresie ukladá
výber takto:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Spätná kompatibilita: staršie kombinované nastavenie `outputMode: "caveman"` naďalej funguje
a mapuje sa na `terse-prose`, pričom je v každom staršom jazyku bajtovo identické
so starým vloženým obsahom.

Výber jazyka: keď je `languageConfig.enabled` zapnuté, `autoDetect` vyberie
jazyk najnovšej správy používateľa (rovnaký detektor ako vstupné mechanizmy);
vypnutie `autoDetect` pevne nastaví `defaultLanguage`. Vypnuté → angličtina.

Matica štýl × jazyk je pevne určená testom
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: nový štýl nemožno vydať
bez aspoň prekladu do pt-BR (alebo explicitne sledovanej výnimky) a
existujúci štýl nemôže bez upozornenia stratiť locale. Postup pridania štýlu nájdete v
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Kompresia výsledkov nástrojov

Modul `toolResultCompressor.ts` poskytuje **5 špecializovaných stratégií kompresie**
pre výsledky nástrojov (volania funkcií, výstupy agentov, výsledky vyhľadávania atď.):

1. **Kompresia výsledkov vyhľadávania** — Odstraňuje nadbytočné výsledky, ponecháva najlepších N
2. **Kompresia čítania súborov** — Skracuje veľké súbory, zachováva hlavičky/importy
3. **Kompresia vykonávania kódu** — Ponecháva iba nevyhnutný stdout/stderr
4. **Kompresia databázových dopytov** — Obmedzuje počet riadkov, odstraňuje rozvláčne metadáta
5. **Kompresia odpovedí API** — Odstraňuje polia s hodnotou null, skracuje polia

#### Kedy použiť

Kompresia výsledkov nástrojov je pri použití volaní nástrojov **vždy zapnutá**. Nie je
potrebná žiadna konfigurácia.

### Reťazený kanál spracovania

Reťazený režim spúšťa **viacero jadier za sebou** — zvyčajne najprv RTK
(úspora 60 – 90 % vo výstupe nástroja) a potom Caveman (dodatočná úspora 30 %
zo zostávajúceho textu). Tým sa dosiahne **celková úspora 78 – 95 %**.

#### Ako to funguje

```
Vstup (1000 tokenov)
  → RTK (filter zohľadňujúci príkazy) → 200 tokenov
    → Caveman (odstránenie výplňového textu) → 140 tokenov
  → Výstup (140 tokenov, úspora 86 %)
```

#### Kedy ho použiť

Reťazený režim použite na:

- Pracovné postupy s intenzívnym využívaním nástrojov (agentné programovanie, výskum)
- Nákladovo citlivé dávkové spracovanie
- Situácie, keď potrebujete maximálnu úsporu tokenov

Nakonfigurujte ho prostredníctvom kombinácie:

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
