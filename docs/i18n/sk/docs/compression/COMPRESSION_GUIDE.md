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

### Ovládací panel

Prejdite na `Ovládací panel → Kontext a vyrovnávacia pamäť`:

- **Caveman** — výber režimu, jazykové balíky, náhľad a globálne predvolené nastavenia
- **RTK** — náhľad filtrovania príkazov, bezpečnostné nastavenia RTK a katalóg filtrov
- **Kombinácie kompresie** — pomenované reťazce enginov priradené ku kombináciám smerovania
- **Prah automatického spustenia** — automaticky aktivuje kompresiu, keď počet tokenov prekročí prah

### Prepísanie pre jednotlivé kombinácie

V časti `Ovládací panel → Kontext a vyrovnávacia pamäť → Kombinácie kompresie` priraďte kombináciu kompresie ku kombinácii smerovania:

```txt
Kombinácia: "free-tier-fallback"
  Kombinácia kompresie: "coding-agent-stack"
  Reťazec: RTK -> Caveman
  Ciele:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Vďaka tomu môžete používať vrstvenú kompresiu pri bezplatných poskytovateľoch a poskytovateľoch zameraných na programovanie, zatiaľ čo pri platených predplatných zostane zachovaný odľahčený režim.

Toto priradenie „Prepísanie pre jednotlivé kombinácie“ je iný ovládací prvok než prepísanie **režimu kompresie kombinácie smerovania** (Predvolené/Vypnuté/Odľahčené/Štandardné/Agresívne/Ultra) — toto prepísanie nevyberá pomenovaný reťazec kombinácie kompresie; iba nastavuje pole `compressionMode`, ktoré používa `resolveCompressionPlan`. Možno ho nastaviť buď na karte kombinácie (`Ovládací panel → Kombinácie`), alebo od #6760 pre jednotlivé kombinácie smerovania v zozname „Priradiť k smerovaniu“ v časti `Ovládací panel → Kontext a vyrovnávacia pamäť → Kombinácie kompresie`, hneď vedľa začiarkavacieho políčka na priradenie reťazca zdokumentovaného vyššie. Zmeny z oboch rozhraní sa ukladajú prostredníctvom rovnakého koncového bodu `PUT /api/combos/{id}`.

### Prepísanie pre jednotlivé požiadavky

Odošlite hlavičku požiadavky `x-omniroute-compression`, aby ste prepísali plán kompresie pre jednu požiadavku. Má najvyššiu prioritu — má prednosť pred prepísaním kombinácie smerovania, aktívnym profilom, automatickým spustením aj predvoleným nastavením panela. Neznáme hodnoty sa ignorujú (požiadavka sa nikdy neodmietne) a globálny hlavný prepínač naďalej riadi všetko: keď je kompresia globálne vypnutá, hlavička ju nemôže zapnúť. Hodnoty:

| Hodnota       | Účinok                                                                                                    |
| ------------- | --------------------------------------------------------------------------------------------------------- |
| `off`         | Bez kompresie pre túto požiadavku.                                                                        |
| `default`     | Predvolený profil odvodený z panela (ignoruje aktívny profil).                                            |
| `engine:<id>` | Jeden engine, ak je povolený, napr. `engine:rtk`.                                                         |
| `<combo>`     | Pomenovaná kombinácia, najprv porovnávaná podľa názvu (bez rozlišovania veľkosti písmen), potom podľa id. |

Použitý plán sa odošle späť v hlavičke odpovede `X-OmniRoute-Compression: <mode>; source=<source>`, kde `<source>` je jedna z hodnôt `request-header`, `routing-override`, `active-profile`, `auto-trigger`, `default` alebo `off`.

### API

```bash
# Získanie nastavení kompresie
curl http://localhost:20128/api/settings/compression

# Aktualizácia nastavení kompresie
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Náhľad konkrétneho obsahu RTK/stacked
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Zobrazenie zoznamu balíkov filtrov RTK
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

| Fáza    | Režimy                                                                                                                                                                         | Stav      |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- |
| Fáza 1  | Off, Lite                                                                                                                                                                      | ✅ Vydané |
| Fáza 2  | Standard, Aggressive, Ultra                                                                                                                                                    | ✅ Vydané |
| Fáza 3  | RTK, Stacked, Compression Combos                                                                                                                                               | ✅ Vydané |
| Fáza 4  | Output Styles, SLM-tier Ultra, eval harness                                                                                                                                    | ✅ Vydané |
| Fáza 4C | Adaptívny kontextový rozpočet („ovládač“) — výpočtový mechanizmus + API (`contextBudget` v `PUT /api/settings/compression`) + ovládacie prvky režimu/zásad na ovládacom paneli | ✅ Vydané |

---

## Poďakovanie

Pravidlá kompresie štandardného režimu sú inšpirované projektom **[Caveman](https://github.com/JuliusBrussee/caveman)** od autora **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — virálnym projektom „prečo používať veľa tokenov, keď stačí málo“. Caveman uvádza o `~75%` menej výstupných tokenov, priemernú úsporu výstupu v benchmarkoch `65%`, rozsah úspory výstupu `22-87%` a nástroj na kompresiu vstupu s úsporou `~46%`.

Režim RTK je inšpirovaný projektom **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** od **[RTK AI](https://github.com/rtk-ai)** — vysokovýkonným projektom na kompresiu výstupu príkazov pre terminál, zostavenie, testovanie, git a filtrovanie výstupu nástrojov. RTK uvádza úsporu `60-90%`, pričom ukážková relácia v jeho súbore README vykazuje úsporu `~80%`.

---

## Pokročilé kompresné systémy

Okrem 7 štandardných režimov obsahuje OmniRoute niekoľko pokročilých kompresných
systémov, ktoré fungujú automaticky podľa kontextu.

### Kompresia zohľadňujúca vyrovnávaciu pamäť

Niektorí poskytovatelia (napríklad Anthropic s ukladaním promptov do vyrovnávacej pamäte) podporujú **ukladanie promptov do vyrovnávacej pamäte**,
ktoré im umožňuje ukladať časti promptu s cieľom znížiť náklady a latenciu. Keď je
ukladanie do vyrovnávacej pamäte povolené, agresívna kompresia môže v skutočnosti **zhoršiť** výkon,
pretože mení tokeny uložené vo vyrovnávacej pamäti, čím ju zneplatní.

Modul `cachingAware.ts` tento problém rieši **detegovaním kontextu ukladania do vyrovnávacej pamäte** a
zodpovedajúcou **úpravou stratégie kompresie**.

#### Ako to funguje

1. **Detegovanie kontextu ukladania do vyrovnávacej pamäte** — Prehľadá telo požiadavky a vyhľadá značky `cache_control`
2. **Identifikácia poskytovateľov s podporou vyrovnávacej pamäte** — Skontroluje, či cieľový poskytovateľ podporuje ukladanie do vyrovnávacej pamäte
3. **Úprava stratégie** — Pre poskytovateľov s podporou vyrovnávacej pamäte zníži režim `aggressive`/`ultra` na `standard`
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

Kompresia zohľadňujúca vyrovnávaciu pamäť je **vždy zapnutá** — nie je potrebná žiadna konfigurácia. Aktivuje sa iba
vtedy, keď:

- Požiadavka obsahuje značky `cache_control`
- Cieľový poskytovateľ podporuje ukladanie promptov do vyrovnávacej pamäte (Anthropic, OpenAI atď.)

### Progresívne starnutie

V dlhých konverzáciách sa hromadí veľa kôl správ, ale staršie kolá sa stávajú menej
relevantnými. Modul `progressiveAging.ts` **degraduje správy podľa vzdialenosti kola**:

- **Nedávne kolá (0-3)**: Zachované doslovne (úplné podrobnosti)
- **Stredne staré kolá (4-8)**: Kompresia Lite (odstránenie nadbytočných medzier a úprava formátovania)
- **Staré kolá (9+)**: Kompresia Caveman (odstránenie výplňových slov, sumarizácia)
- **Veľmi staré kolá (20+)**: Výrazne zhrnuté alebo odstránené

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
  light: 8, // Kolá 4 – 8: kompresia lite
  moderate: 20, // Kolá 9 – 20: kompresia caveman
  // Kolá 21+: výrazná sumarizácia
});

// saved = počet ušetrených tokenov
```

#### Kedy použiť

Progresívne starnutie je **vždy zapnuté** pre režimy `aggressive` a `ultra`. Je
obzvlášť účinné pre:

- Dlhé programovacie relácie
- Viacdňové konverzácie
- Agentné pracovné postupy s mnohými volaniami nástrojov

### Režim výstupu Caveman

Modul `outputMode.ts` vkladá **inštrukcie systémovej výzvy**, aby samotný
model vytváral komprimovaný, stručný výstup (štýl „jaskynného človeka“).

#### Ako to funguje

Namiesto komprimovania vstupu tento režim pridáva systémovú výzvu, napríklad:

> „Odpovedaj minimálnym počtom slov. Vynechaj zdvorilostné frázy. Používaj krátke vety.“

Funguje to obzvlášť dobre pre:

- Generovanie kódu (stručnejší výstup = menej tokenov)
- Rýchle otázky a odpovede (bez potreby podrobných vysvetlení)
- Dávkové spracovanie (maximalizácia priepustnosti)

#### Kedy ho použiť

Režim výstupu Caveman je **voliteľný** — nastavte ho prostredníctvom kombinovanej konfigurácie:

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

Vyššie uvedený režim výstupu Caveman je **pôvodná cesta s jediným štýlom**. Fáza 4 ho zovšeobecnila
na katalóg kombinovateľných štýlov výstupu: `OUTPUT_STYLE_CATALOG` v
`open-sse/services/compression/outputStyles/catalog.ts`. Každý štýl predstavuje inštrukciu systémovej výzvy,
ktorá vedie samotný model k vytváraniu lacnejšieho výstupu; štýly možno zapnúť
spoločne a vkladajú sa v poradí katalógu.

| Štýl                         | `id`          | Čo robí                                                                                                                                                                                                                        | Jazyky inštrukcií                                                                               |
| ---------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| Stručná próza                | `terse-prose` | Odstraňuje výplňové slová/členy/váhavé formulácie; zachováva presný technický obsah. Rovnaký text ako v pôvodnom režime výstupu Caveman (odkazuje sa naň, neopakuje sa).                                                       | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                                   |
| Menej kódu                   | `less-code`   | Rebríček YAGNI: najmenšia funkčná zmena, žiadne nevyžiadané abstrakcie.                                                                                                                                                        | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                                   |
| Cop (lenivý skúsený vývojár) | `ponytail`    | „Najlepší kód je kód, ktorý nikdy nebol napísaný“: opätovné použitie > prepisovanie, základná príčina > príznak, najkratší funkčný diff.                                                                                       | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                                   |
| Mám ADHD (najprv akcia)      | `i-have-adhd` | Najprv akcia (príkaz/cesta/úryvok pred opisom), očíslované kroky s obmedzeným rozsahom, JEDEN konkrétny ďalší krok, bez úvodu/zhrnutia/záveru. Adaptované z [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                                   |
| Stručné CJK (文言)           | `terse-cjk`   | Mimoriadne stručný štýl klasickej čínštiny.                                                                                                                                                                                    | zh (obmedzené podľa miestneho nastavenia: ponúka sa len vtedy, keď je rozpoznaným jazykom `zh`) |

Každý štýl obsahuje tri úrovne intenzity — `lite`, `full`, `ultra` — a každá úroveň
sa končí spoločnou klauzulou o hraniciach, ktorá zachováva bloky kódu, cesty k súborom, príkazy,
chybové reťazce, adresy URL a identifikátory bez zmien.

#### Ako funguje vkladanie

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) porovná
výber s katalógom (neznáme id a štýly nezodpovedajúce miestnemu nastaveniu sa
vynechajú, nikdy nespôsobia chybu), zreťazí vybrané inštrukcie v poradí katalógu,
pripojí klauzulu o hraniciach **raz** a vloží výsledok na začiatok systémovej
výzvy za jedinú značku idempotencie (`[OmniRoute Output Styles]`) — opätovné
použitie nevykoná žiadnu operáciu. Keď existuje pre rozpoznaný jazyk požiadavky preklad,
namiesto angličtiny sa vloží lokalizovaná inštrukcia.

#### Ako zapnúť

Na ovládacom paneli: **Kontext → Nastavenia → Kompresia** — jeden riadok pre každý štýl
s prepínačom zapnutia/vypnutia a výberom úrovne. Programovo konfigurácia kompresie uchováva
výber takto:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Spätná kompatibilita: pôvodné kombinované nastavenie `outputMode: "caveman"` naďalej funguje a mapuje sa na
`terse-prose`, pričom je na úrovni bajtov totožné so starým vkladaním v každom pôvodne podporovanom jazyku.

Výber jazyka: keď je zapnuté `languageConfig.enabled`, `autoDetect` vyberie
jazyk najnovšej správy používateľa (rovnaký detektor ako vo vstupných moduloch);
vypnutie `autoDetect` nastaví napevno `defaultLanguage`. Vypnuté → angličtina.

Matica štýl × jazyk je pevne stanovená testom
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: nový štýl nemožno vydať
bez aspoň prekladu pt-BR (alebo explicitne sledovanej výnimky) a
existujúci štýl nemôže bez upozornenia stratiť miestne nastavenie. Informácie o pridaní štýlu nájdete v
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Kompresia výsledkov nástrojov

Modul `toolResultCompressor.ts` poskytuje **5 špecializovaných stratégií kompresie**
pre výsledky nástrojov (volania funkcií, výstupy agentov, výsledky vyhľadávania atď.):

1. **Kompresia výsledkov vyhľadávania** — Odstraňuje redundantné výsledky, zachováva najlepších N
2. **Kompresia čítania súborov** — Skracuje veľké súbory, zachováva hlavičky/importy
3. **Kompresia vykonávania kódu** — Zachováva iba podstatný stdout/stderr
4. **Kompresia databázových dotazov** — Obmedzuje počet riadkov, odstraňuje rozvláčne metadáta
5. **Kompresia odpovedí API** — Odstraňuje polia s hodnotou null, kondenzuje polia

#### Kedy ju použiť

Kompresia výsledkov nástrojov je **vždy zapnutá**, keď sú prítomné volania nástrojov. Nie je
potrebná žiadna konfigurácia.

### Reťazené spracovanie

Reťazený režim spúšťa **viacero modulov za sebou** — zvyčajne najprv RTK
(úspora 60–90 % pri výstupe nástrojov), potom Caveman (ďalšia úspora 30 % zo
zostávajúceho textu). Tým sa dosahuje **celková úspora 78–95 %**.

#### Ako to funguje

```
Vstup (1000 tokenov)
  → RTK (filter zohľadňujúci príkazy) → 200 tokenov
    → Caveman (odstránenie výplne) → 140 tokenov
  → Výstup (140 tokenov, úspora 86 %)
```

#### Kedy ho použiť

Reťazený režim použite pre:

- Pracovné postupy intenzívne využívajúce nástroje (agentné programovanie, výskum)
- Dávkové spracovanie citlivé na náklady
- Situácie, keď potrebujete maximálnu úsporu tokenov

Nakonfigurujte ho prostredníctvom kombinovanej konfigurácie:

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
