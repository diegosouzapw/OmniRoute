# 🗜️ Prompt Compression Guide — OmniRoute (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Automaticky ušetrite 15 – 95 % tokenov vo vhodnom kontexte. Stručný prehľad nájdete v [časti README o kompresii](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Prehľad

OmniRoute implementuje modulárny pipeline kompresie promptov, ktorý sa spúšťa **proaktívne** predtým, než požiadavky dorazia k nadradeným poskytovateľom. Úspora tokenov tak prebieha transparentne — nie sú potrebné žiadne zmeny vo vašom pracovnom postupe.

```
Požiadavka klienta
  → Výber stratégie kompresie
    → Prepísanie kombináciou? → Použiť nastavenie kombinácie
    → Prahová hodnota automatického spustenia? → Použiť automatický režim
    → Predvolený režim? → Použiť globálne nastavenie
    → Vypnuté? → Preskočiť kompresiu
  → Vybratý režim kompresie
    → Vypnutý: Bez kompresie
    → Ľahký: Bezpečné vyčistenie medzier/formátovania (~15 %)
    → Štandardný: Odstránenie výplne v štýle jaskynnej reči (~30 %)
    → Agresívny: Starnutie histórie + sumarizácia (~50 %)
    → Ultra: Heuristické prerezávanie + stenčenie blokov kódu (~75 %)
    → RTK: Filtrovanie terminálového/výstupného obsahu nástrojov so zohľadnením príkazov (rozsah 60 – 90 % pre nadradeného poskytovateľa)
    → Vrstvený: Usporiadaný pipeline viacerých enginov, zvyčajne RTK a potom Caveman (rozsah 78 – 95 % vhodného obsahu)
  → Komprimovaná požiadavka → Poskytovateľ
```

---

## Režimy kompresie

### Vypnutý

Nepoužije sa žiadna kompresia. Všetky správy prejdú bez zmien.

### Ľahký režim (úspora ~15 %, latencia <1 ms)

Najbezpečnejší režim — nulová zmena významu, iba vyčistenie formátovania:

| Technika                 | Opis                                                       |
| ------------------------ | ---------------------------------------------------------- |
| `collapseWhitespace`     | Zlúči po sebe nasledujúce prázdne riadky a koncové medzery |
| `dedupSystemPrompt`      | Odstráni duplicitné systémové správy                       |
| `compressToolResults`    | Komprimuje rozsiahle výstupy nástrojov/funkcií             |
| `removeRedundantContent` | Odstráni opakované pokyny                                  |
| `replaceImageUrls`       | Skráti dátové URI obrázkov vo formáte base64               |

**Najvhodnejšie pre:** Neustále používanie a pracovné postupy s kritickými požiadavkami na bezpečnosť.

### Štandardný režim (úspora ~30 %)

Inšpirovaný nástrojom [Caveman](https://github.com/JuliusBrussee/caveman) — odstraňuje výplňové slová a rozvláčne formulácie, pričom zachováva význam:

- Odstraňuje výplňové slová („prosím“, „myslím si“, „v podstate“, „vlastne“)
- Skracuje rozvláčne frázy („s cieľom“ → „na“, „v dôsledku“ → „pretože“)
- Odstraňuje zdvorilé zmierňujúce formulácie („Nevadilo by vám...“, „Ak by ste mohli...“)
- Viac ako 30 pravidiel regulárnych výrazov vyladených pre programátorské prompty

**Najvhodnejšie pre:** Každodenné programátorské pracovné postupy a tímy, ktoré dbajú na náklady.

### Agresívny režim (úspora ~50 %)

Inteligentná správa histórie pre dlhé relácie:

- **Starnutie správ** — staršie správy sa postupne komprimujú
- **Kompresia výsledkov nástrojov** — dlhé výstupy nástrojov sa skracujú alebo vynechávajú (prvé/posledné riadky,
  filtrovanie zhodujúcich sa riadkov, kompakcia kľúčov JSON)
- **Ochrany štrukturálnej integrity** — zaisťujú konzistentnosť párov `tool_use` + `tool_result`
- **Zohľadnenie kontextového okna** — rešpektuje limity tokenov jednotlivých modelov

**Najvhodnejšie pre:** Dlhé relácie ladenia a veľké kódové základne.

### Režim Ultra (úspora ~75 %)

Maximálna kompresia pre scenáre s kritickým obmedzením tokenov:

- **Heuristické prerezávanie** — prerezávanie tokenov prózy na základe skóre
- **Zachovanie štruktúry** — ohraničené bloky kódu, kód v riadku, URL adresy a identifikátory sa
  nahradia zástupnými značkami a následne sa znova vložia bez zmeny; nikdy sa neprerezávajú
- **Voliteľná úroveň SLM** — ak je nakonfigurovaná, malé lokálne modely môžu prerezávanie spresniť
- Nezávisí od agresívneho režimu: nevykonáva starnutie správ, kompresiu výsledkov nástrojov
  ani záložnú sumarizáciu (iba zlyhanie na úrovni SLM môže nasmerovať záložný priechod cez
  agresívny režim)

**Najvhodnejšie pre:** Situácie, keď opakovane narážate na limity kontextu.

### Režim RTK (rozsah 60 – 90 % pre nadradeného poskytovateľa)

Režim RTK je optimalizovaný pre rozsiahle výstupy nástrojov, ktoré sa objavujú v reláciách programátorských agentov:

- Rozpoznáva triedy príkazov/výstupov, ako sú `git status`, `git diff`, `git log`, nástroje na spúšťanie testov,
  zostavenia TypeScript/Vite/Webpack, ESLint/Biome/Prettier, audity/inštalácie npm, protokoly Docker, výstup infraštruktúry
  a všeobecný výstup shellu
- Používa balíky filtrov JSON z `open-sse/services/compression/engines/rtk/filters/`
- Importuje filtre schémy RTK TOML v1 z projektových alebo globálnych súborov `filters.toml`, s overením
  vložených testov a kontrolou dôveryhodnosti projektových súborov
- Obsahuje 55 vstavaných filtrov s vloženými overovacími vzorkami
- Odstraňuje riadiace sekvencie ANSI, indikátory priebehu, opakované riadky a šum, ktorý nevyžaduje zásah
- Zachováva zlyhania, chyby, upozornenia, zmenené súbory, súhrny a koniec dlhého výstupu
- Podporuje projektové filtre s kontrolou dôveryhodnosti, globálne filtre a voliteľné obnovenie redigovaného nespracovaného výstupu

**Najvhodnejšie pre:** Relácie agentov s prepismi shellu, zostavení, testov, gitu, grepu a súborových výstupov.

### Vrstvený režim (rozsah 78 – 95 % vhodného obsahu)

Vrstvený režim spúšťa viacero kompresných enginov v deterministickom poradí. Predvolený pipeline je:

```txt
RTK -> Caveman
```

Toto poradie najskôr skomprimuje výstup terminálu/nástrojov a potom použije sémantickú kondenzáciu Caveman na
zostávajúci prompt v prirodzenom jazyku. Vrstvené pipeline možno konfigurovať globálne alebo prostredníctvom
kombinácií kompresie priradených ku kombináciám smerovania.

**Najvhodnejšie pre:** Zmiešaný kontext s veľkými protokolmi nástrojov spolu s ľudskými pokynmi alebo súhrnmi asistenta.

---

## Výpočet úspor z upstream projektov

OmniRoute dokumentuje úspory vďaka kompresii z dvoch zdrojov: benchmarkov upstream projektov a
vlastnej kombinácie enginov OmniRoute.

| Zdroj   | Číslo z upstream README použité v tomto dokumente                                                                                    |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Caveman | `~75%` menej výstupných tokenov, priemerná úspora výstupu v benchmarkoch `65%`, rozsah `22-87%` a nástroj na kompresiu vstupu `~46%` |
| RTK     | Úspora výstupu príkazov `60-90%`; ukážková relácia `~118,000 -> ~23,900` tokenov, teda úspora `79.7%` (`~80%`)                       |

Pri prekrývajúcich sa dátach nástrojov/kontextu predvolená kombinácia OmniRoute vrství enginy:

```txt
RTK -> Caveman
```

Kombinované úspory sa násobia, nesčítavajú:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Hodnota `78-95%` platí vtedy, keď RTK aj Caveman dokážu zmenšiť rovnaké vstupné/kontextové dáta.
Režim výstupu odpovede Caveman je samostatný: keď je povolený, použite vlastné úspory výstupu nástroja Caveman (`65%`
v priemere, hlavná uvádzaná hodnota `~75%`, rozsah `22-87%`). Celkové úspory nákladov závisia od pomeru vstupov a výstupov.

### Čo v skutočnosti znamená „vhodný“

Uvádzaný rozsah 15-95% je reálny, ale vzťahuje sa iba na **redundantný alebo príliš podrobný** obsah — opakované
riadky chýb, výpis zostavenia, ktorý zahlcuje výstup rovnakým upozornením, alebo nadmerne veľký výpis z `grep`/čítania súboru. To
**neznamená**, že každá požiadavka dosiahne takúto úsporu.

Empiricky overené (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): beh
`stacked` (RTK + Caveman) nad blokom `tool_result` vo formáte Anthropic, ktorý obsahoval 300 rovnakých
riadkov chýb, dosiahol **úsporu 95.93% tokenov / 96.26% znakov** — presne v rámci uvádzaného
rozsahu. Keď sa však rovnaký reťazec spracovania spustí nad bežným, neredundantným výstupom nástroja (čistý zoznam zhôd z `grep`,
krátke načítanie súboru, bežný konverzačný text), správne dosiahne **takmer nulovú úsporu**, pretože
neobsahuje nič opakujúce sa, čo by bolo možné odstrániť, a `validateCompression()` (`validation.ts`) odmietne odoslať
prepísaný obsah, ktorý by vynechal alebo zmenil bloky kódu, URL adresy, nadpisy, verzie alebo identifikátory konštánt písané VEĽKÝMI PÍSMENAMI.

Ide o očakávané a bezpečné správanie, nie o chybu: relácia programovania, ktorá prevažne číta alebo prehľadáva čisté súbory,
dosiahne skromné celkové úspory aj pri plne povolenej kompresii, zatiaľ čo relácia, ktorá narazí na zlyhávajúcu
slučku alebo príliš výrečný linter, dosiahne pri takomto prenose plný rozsah 78-95%. Nízke percento
súhrnných úspor jednej relácie nepovažujte za dôkaz nesprávnej konfigurácie kompresie — najskôr skontrolujte, či bol
príslušný výstup nástroja skutočne redundantný.

---

## Vizualizácia úspory tokenov

```
Bez kompresie:       47K tokenov odoslaných do LLM
S Lite:              40K odoslaných tokenov          (úspora 15% — bezpečné, vždy zapnuté)
So Standard:         33K odoslaných tokenov          (úspora 30% — pravidlá caveman-speak)
S Aggressive:        24K odoslaných tokenov          (úspora 50% — starnutie + sumarizácia)
S Ultra:             12K odoslaných tokenov          (úspora 75% — heuristické orezávanie)
S RTK:               19K-5K odoslaných tokenov       (úspora 60-90% na výstupe príkazov/nástrojov)
So Stacked:          10K-2.5K odoslaných tokenov     (rozsah 78-95% pre vhodné dáta RTK+Caveman)
```

---

## Konfigurácia

### Ovládací panel

Prejdite na `Dashboard → Context & Cache`:

- **Caveman** — výber režimu, jazykové balíky, náhľad a globálne predvolené nastavenia
- **RTK** — náhľad filtrovania príkazov, bezpečnostné nastavenia RTK a katalóg filtrov
- **Compression Combos** — pomenované postupnosti enginov priradené ku kombináciám smerovania
- **Auto-Trigger Threshold** — automaticky zapne kompresiu, keď počet tokenov prekročí prahovú hodnotu

### Prepísanie pre konkrétnu kombináciu

V časti `Dashboard → Context & Cache → Compression Combos` priraďte kombináciu kompresie ku kombinácii
smerovania:

```txt
Kombinácia: "free-tier-fallback"
  Kombinácia kompresie: "coding-agent-stack"
  Postupnosť: RTK -> Caveman
  Ciele:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Vďaka tomu môžete používať vrstvenú kompresiu pre bezplatných poskytovateľov alebo poskytovateľov
určených na programovanie a súčasne zachovať režim Lite pre platené predplatné.

Toto priradenie „Prepísanie pre konkrétnu kombináciu“ je iný ovládací prvok než prepísanie
**režimu kompresie kombinácie smerovania** (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses —
schéma poľa podporuje aj hodnoty `rtk`, `stacked` a `omniglyph`) — toto prepísanie nevyberá pomenovanú
postupnosť kombinácie kompresie; iba nastavuje pole `compressionMode`, ktoré používa
`resolveCompressionPlan`. Možno ho nastaviť buď na karte kombinácie (`Dashboard → Combos`), alebo od
verzie #6760 pre každú kombináciu smerovania v zozname „Assign to routing“ v časti
`Dashboard → Context & Cache → Compression Combos`, hneď vedľa začiarkavacieho políčka na priradenie
postupnosti, ktoré je zdokumentované vyššie. Obe rozhrania ukladajú nastavenia prostredníctvom rovnakého
koncového bodu `PUT /api/combos/{id}`.

### Prepísanie pre konkrétnu požiadavku

Odošlite hlavičku požiadavky `x-omniroute-compression`, ak chcete prepísať plán kompresie pre jednu
požiadavku. Má najvyššiu prioritu — má prednosť pred prepísaním kombinácie smerovania, aktívnym profilom,
automatickým spustením aj nastavením Default na paneli. Neznáme hodnoty sa ignorujú (požiadavka sa nikdy
neodmietne) a globálny hlavný prepínač má naďalej rozhodujúcu úlohu: keď je kompresia globálne vypnutá,
hlavička ju nemôže zapnúť. Hodnoty:

| Hodnota       | Účinok                                                                                                                |
| ------------- | --------------------------------------------------------------------------------------------------------------------- |
| `off`         | Pre túto požiadavku sa nepoužije žiadna kompresia.                                                                    |
| `default`     | Profil Default odvodený z panela (ignoruje aktívny profil). Stratové enginy zostanú vypnuté.                          |
| `safe`        | Rovnaké ako vynechanie hlavičky: iba deduplikácia a zlučovanie bielych znakov.                                        |
| `allow-lossy` | Zachová plán operátora tejto požiadavky vrátane súhrnov, filtrov relevantnosti a úprav štýlu.                         |
| `engine:<id>` | Jeden engine, ak je povolený, napr. `engine:rtk`. Toto je explicitné zapnutie daného enginu pre konkrétnu požiadavku. |
| `<combo>`     | Pomenovaná kombinácia; najprv sa vyhľadáva podľa názvu (bez rozlišovania veľkosti písmen) a potom podľa ID.           |

Bez hodnoty `allow-lossy`, `engine:<id>` alebo pomenovanej kombinácie sa stratové enginy nepoužijú.
Ak je kompresia zapnutá, požiadavka naďalej využíva deduplikáciu relácie a zlučovanie bielych znakov.

Použitý plán sa zopakuje v hlavičke odpovede `X-OmniRoute-Compression: <mode>; source=<source>`,
kde `<source>` je jedna z hodnôt `request-header`, `routing-override`, `active-profile`,
`auto-trigger`, `default` alebo `off`.

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

## Čo sa chráni

Kompresný mechanizmus **vždy zachováva:**

- ✅ Bloky kódu (ohraničené aj vložené)
- ✅ URL adresy a cesty k súborom
- ✅ Štruktúry JSON a štruktúrované údaje
- ✅ Identifikátory a chránené technické tokeny
- ✅ Matematické výrazy
- ✅ Definície volaní nástrojov/funkcií
- ✅ Systémové prompty (v režime lite)

Obnova surového výstupu RTK rediguje bežné API kľúče, bearer tokeny, tokeny Slacku, prístupové kľúče AWS,
heslá, tokeny a tajné údaje predtým, než sa čokoľvek trvalo uloží.

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

| Fáza    | Režimy                                                                                                                                                                 | Stav      |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| Fáza 1  | Vypnuté, Lite                                                                                                                                                          | ✅ Vydané |
| Fáza 2  | Standard, Aggressive, Ultra                                                                                                                                            | ✅ Vydané |
| Fáza 3  | RTK, Stacked, kombinácie kompresie                                                                                                                                     | ✅ Vydané |
| Fáza 4  | Štýly výstupu, Ultra na úrovni SLM, evaluačná infraštruktúra                                                                                                           | ✅ Vydané |
| Fáza 4C | Adaptívny rozpočet kontextu („ovládač“) — výpočtový mechanizmus + API (`contextBudget` na `PUT /api/settings/compression`) + ovládacie prvky režimu/politiky na paneli | ✅ Vydané |

---

## Poďakovanie

Pravidlá kompresie režimu Standard sú inšpirované projektom **[Caveman](https://github.com/JuliusBrussee/caveman)** od autora **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — virálnym projektom „prečo používať veľa tokenov, keď stačí málo“. Caveman uvádza o `~75%` menej výstupných tokenov, priemernú úsporu výstupu v benchmarkoch na úrovni `65%`, rozsah výstupných úspor `22-87%` a nástroj na kompresiu vstupu s úsporou `~46%`.

Režim RTK je inšpirovaný projektom **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** od **[RTK AI](https://github.com/rtk-ai)** — vysokovýkonným projektom kompresie výstupu príkazov pre terminál, zostavovanie, testovanie, git a filtrovanie výstupu nástrojov. RTK uvádza úsporu `60-90%`, pričom ukážková relácia v jeho README dosahuje úsporu `~80%`.

---

## Pokročilé systémy kompresie

Okrem 7 režimov opísaných vyššie (zdroj podporuje aj režimy `codex-responses` a
`omniglyph`, ktorým sa táto príručka nevenuje) sa nasledujúce časti zaoberajú funkciami,
ktoré fungujú v rámci týchto režimov alebo súbežne s nimi: kompresia výsledkov nástrojov a progresívne starnutie
sú kroky 1 a 2 agresívneho mechanizmu (režim Aggressive a krok `aggressive` v
skladanom spracovateľskom reťazci), skladaný spracovateľský reťazec určuje fungovanie režimu Stacked, kompresia
zohľadňujúca vyrovnávaciu pamäť zníži pri zapnutej kompresii úroveň `aggressive` a `ultra` na `standard`
pri poskytovateľoch s podporou ukladania do vyrovnávacej pamäte a výstupný režim Caveman a štýly výstupu sú voliteľné inštrukcie systémového promptu,
ktoré sú predvolene vypnuté a namiesto kompresie požiadavky formujú výstup modelu.

### Kompresia zohľadňujúca vyrovnávaciu pamäť

Niektorí poskytovatelia (napríklad Anthropic s ukladaním promptov do vyrovnávacej pamäte) podporujú **ukladanie promptov do vyrovnávacej pamäte**,
čo im umožňuje ukladať časti promptu do vyrovnávacej pamäte a znižovať tak náklady a latenciu. Keď
je ukladanie do vyrovnávacej pamäte zapnuté, agresívna kompresia môže výkon v skutočnosti **zhoršiť**,
pretože mení tokeny uložené vo vyrovnávacej pamäti, čím ju zneplatňuje.

Modul `cachingAware.ts` tento problém rieši **detekciou kontextu ukladania do vyrovnávacej pamäte** a
zodpovedajúcou **úpravou stratégie kompresie**.

#### Ako to funguje

1. **Detekcia kontextu ukladania do vyrovnávacej pamäte** — Prehľadá telo požiadavky a vyhľadá značky `cache_control`
2. **Identifikácia poskytovateľov s ukladaním do vyrovnávacej pamäte** — Overí, či cieľový poskytovateľ podporuje ukladanie do vyrovnávacej pamäte
3. **Úprava stratégie** — Zníži úroveň `aggressive`/`ultra` na `standard` pri poskytovateľoch s ukladaním do vyrovnávacej pamäte
4. **Vynechanie systémového promptu** — Systémové prompty sa zvyčajne ukladajú do vyrovnávacej pamäte, preto ich nekomprimuje

Pomocná funkcia stratégie vracia aj príznak `deterministicOnly`, ale zostavovač plánu používa
iba stratégiu — v súčasnosti tento príznak nič v nadväzujúcom spracovaní nečíta.

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
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Kedy použiť

Kompresia zohľadňujúca vyrovnávaciu pamäť je **vždy zapnutá** — nevyžaduje žiadnu konfiguráciu. Aktivuje sa vždy,
keď je kompresia zapnutá a cieľový poskytovateľ podporuje ukladanie promptov do vyrovnávacej pamäte (Anthropic, OpenAI
atď.); explicitné značky `cache_control` nie sú potrebné — zníženie úrovne spustí už samotný poskytovateľ
s podporou ukladania do vyrovnávacej pamäte, zatiaľ čo samotné značky ho nikdy nespustia (detekcia značiek poskytuje údaje
pre telemetriu vyrovnávacej pamäte, nie pre rozhodovanie o stratégii).

### Progresívne starnutie

V dlhých konverzáciách sa hromadí veľa správ, ale staršie časti sa stávajú menej
relevantnými. Modul `progressiveAging.ts` **zjednodušuje správy podľa vzdialenosti od konca konverzácie**
(vzdialenosť sa meria od konca konverzácie). S dodávanými predvolenými hodnotami
(`verbatim: 2, light: 2, moderate: 3`):

- **Posledné 2 výmeny (vzdialenosť ≤ 2)**: Zachované doslovne
- **Vzdialenosť 3**: Jaskynná kompresia (odstránenie výplňových slov)
- **Vzdialenosť 4+**: Správy asistenta sú zhrnuté; správy používateľa sú skrátené na prvý
  riadok, najviac na 120 znakov; ostatné roly zostávajú nedotknuté. Systémové výzvy, už zostarnuté
  správy a najnovšia správa používateľa sú vždy zachované doslovne bez ohľadu na vzdialenosť.
  Nič sa úplne nevynechá a pásmo `light`
  nie je s dodávanými predvolenými nastaveniami dosiahnuteľné (`light` sa rovná `verbatim`).

#### Príklad kódu

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... ďalších 50 výmen ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // posledné 3 výmeny: doslovne
  light: 8, // vzdialenosť <= 8: ľahká kompresia
  moderate: 20, // vzdialenosť <= 20: jaskynná kompresia
  fullSummary: 5, // vyžadované typom, kód na priraďovanie pásiem ho nečíta
  // vzdialenosť > 20: zhrnuté (asistent) / zachovaný prvý riadok (používateľ)
});

// saved = počet ušetrených tokenov
```

#### Kedy použiť

Progresívne starnutie je v režime `aggressive` **vždy zapnuté** — ide o 2. krok
`compressAggressive()`. Režim Ultra ho nespúšťa. Je
obzvlášť účinné pri:

- Dlhotrvajúcich reláciách programovania
- Viacdňových konverzáciách
- Agentných pracovných postupoch s mnohými volaniami nástrojov

### Režim jaskynného výstupu

Režim jaskynného výstupu pridáva **pokyny systémovej výzvy**, ktoré od samotného modelu žiadajú
stručný výstup — úroveň `lite` žiada stručné odpovede zachovávajúce celé vety, úroveň `full`
žiada, aby „odpovedal stručne ako múdry jaskynný človek“, a úroveň `ultra` žiada telegrafický výstup;
pokyny iba žiadajú, nemôžu ho zaručiť. Požiadavky ich dostávajú prostredníctvom
`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`):
`open-sse/handlers/chatCore.ts` najprv určí výber pomocou vrstvy spätnej kompatibility
(`resolveOutputStyleSelection()` v
`open-sse/services/compression/outputStyles/backCompat.ts`), ktorá, pokiaľ je `outputStyles`
prázdne, mapuje povolený `cavemanOutputMode` na výstupný štýl `terse-prose` s intenzitou
`cavemanOutputMode.intensity` (pozri časť Spätná kompatibilita nižšie); neprázdny výber `outputStyles`
sa použije bez zmeny a `cavemanOutputMode.enabled` ani `intensity` potom nemajú žiadny
vplyv, zatiaľ čo jeho prepínač `autoClarity` sa uplatňuje naďalej. `outputMode.ts` obsahuje
texty pokynov (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), obídenie podľa obsahu a
pomocnú funkciu umiestnenia, ktorú používa vkladanie; jeho vlastný injektor `applyCavemanOutputMode()` nemá
žiadneho volajúceho v produkcii.

#### Ako to funguje

Tento režim nekomprimuje vstup. Pridáva blok pokynov do systémovej výzvy
(pozri časť Ako funguje vkladanie nižšie) a každý režim kompresie vstupu vybraný pre požiadavku
sa následne naďalej spustí nad telom, ktoré už obsahuje tento blok. Pred spoločnou
klauzulou o hraniciach, ktorou sa končí každá úroveň, anglická úroveň `full` uvádza:

> „Odpovedaj stručne ako múdry jaskynný človek. Vynechávaj členy (a/an/the), výplňové slová (just/really/basically/actually/simply), zdvorilostné frázy a zmierňujúce formulácie. Fragmenty sú v poriadku. Používaj krátke synonymá (big namiesto extensive, fix namiesto implement). Zachovaj presne všetok technický obsah, kód, chyby, adresy URL a identifikátory.“

Funguje to obzvlášť dobre pri:

- Generovaní kódu (stručnejší výstup = menej tokenov)
- Rýchlych otázkach a odpovediach (nie sú potrebné podrobné vysvetlenia)
- Dávkovom spracovaní (maximalizácia priepustnosti)

#### Kedy použiť

Režim jaskynného výstupu je **voliteľný**. Keď je kompresia zapnutá (`enabled: true`, hlavný prepínač
na stránke Compression Settings), zapnite ho pomocou `cavemanOutputMode.enabled`; `intensity`
vyberá `lite`, `full` alebo `ultra`:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

Prepínač **Output Mode** kombinácie kompresie (`outputMode`, úroveň v `outputModeIntensity`)
nastavuje rovnaký prepínač pre požiadavky, na ktoré sa daná kombinácia vzťahuje, a nástroj MCP
`omniroute_set_compression_engine` ho zapisuje prostredníctvom svojho booleovského argumentu `outputMode`.
Neprázdny výber `outputStyles` má pred týmto prepínačom prednosť. Na
ovládacom paneli povolenie výstupného štýlu **Terse prose** vloží rovnaký blok (pozri časť Výstupné
štýly nižšie).

### Výstupné štýly (katalóg)

Vyššie opísaný režim jaskynného výstupu je **staršia cesta s jedným štýlom**. Fáza 4 ho zovšeobecnila
na katalóg kombinovateľných výstupných štýlov: `OUTPUT_STYLE_CATALOG` v
`open-sse/services/compression/outputStyles/catalog.ts`. Každý štýl je pokynom systémovej výzvy,
ktorý od samotného modelu žiada úspornejší výstup; štýly možno povoliť
spoločne a vkladajú sa v poradí katalógu.

| Štýl                                    | `id`          | Čo robí                                                                                                                                                                                                                      | Jazyky inštrukcií                                       |
| --------------------------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| Stručná próza                           | `terse-prose` | Odstraňuje výplňové slová/členy/váhanie; zachováva presný technický obsah. Rovnaký text ako v staršom režime výstupu caveman (odkazuje sa naň, neopakuje sa).                                                                | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi           |
| Menej kódu                              | `less-code`   | Rebrík YAGNI: najmenšia funkčná zmena, žiadne nevyžiadané abstrakcie.                                                                                                                                                        | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi           |
| Konský chvost (lenivý seniorný vývojár) | `ponytail`    | „Najlepší kód je ten, ktorý nikdy nebol napísaný“: opätovné použitie > prepisovanie, základná príčina > symptóm, najkratší funkčný diff.                                                                                     | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi           |
| Mám ADHD (najprv akcia)                 | `i-have-adhd` | Najprv akcia (príkaz/cesta/úryvok pred prózou), očíslované kroky s jasným rozsahom, JEDEN konkrétny ďalší krok, bez úvodu/zhrnutia/záveru. Upravené podľa [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi           |
| Stručná CJK (文言)                      | `terse-cjk`   | Odpoveď `full`/`ultra` v klasickej čínštine (文言); `lite` iba požaduje stručné odpovede bez funkčných slov, zdvorilostí či ozdôb.                                                                                           | zh (obmedzené podľa miestneho nastavenia, pozri nižšie) |

Každý štýl sa dodáva s tromi úrovňami intenzity — `lite`, `full`, `ultra` — a každá úroveň
sa končí zdieľanou klauzulou obmedzení (`SHARED_BOUNDARIES` v `outputMode.ts`), ktorá
zachováva bloky kódu, cesty k súborom, príkazy, chyby a adresy URL v presnom znení. Texty úrovní
`terse-prose` a `terse-cjk` pridávajú do tohto zoznamu identifikátory.

`terse-cjk` je na dvoch miestach obmedzený na miestne nastavenie `zh`. Stránka Nastavenia kompresie zobrazuje
jeho riadok iba vtedy, keď je jazyk používateľského rozhrania ovládacieho panela čínština (`zh-CN` alebo `zh-TW`), a
`applyOutputStyles()` ho vloží iba vtedy, keď je určený jazyk požiadavky (pozri Výber
jazyka nižšie) `zh`. Skrytie riadka nevymaže uložený výber `terse-cjk`:
API nastavení akceptuje ľubovoľné id štýlu a uloženie iných štýlov na stránke ho zachová. Pri
spracovaní požiadavky je kontrola jazyka v `applyOutputStyles()` jediným obmedzením podľa miestneho nastavenia.

#### Ako funguje vkladanie

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) porovná
výber s katalógom (neznáme id a štýly nezodpovedajúce miestnemu nastaveniu sa
zahodia bez chyby; výber, z ktorého sa neurčí žiadny štýl, ponechá telo
nezmenené a preskočí sa ako `no_styles`), spojí vybrané inštrukcie v poradí podľa katalógu,
pripojí klauzulu obmedzení **raz** (plus bezpečnostnú klauzulu, `SAFETY_BOUNDARIES` alebo jej
preklad, keď je vybraný `less-code` alebo `ponytail`) a začne blok
jedinou značkou idempotencie (`[OmniRoute Output Styles]`), takže opätovné použitie nič nezmení. Keď
má určený jazyk (pozri Výber jazyka nižšie) preklad, vloží sa lokalizovaná
inštrukcia namiesto anglickej.

V tele s neprázdnym poľom `messages` sa kontrola idempotencie vykoná pred
obídením podľa obsahu: keď sa značka `[OmniRoute Output Styles]` už nachádza v poli
`system` najvyššej úrovne (ako reťazec alebo pole blokov obsahu) alebo v systémovej správe s reťazcovým
obsahom, telo zostane nezmenené ako `already_applied` a nevykoná sa žiadna kontrola kľúčových slov.
V opačnom prípade obídenie podľa obsahu (`shouldBypassCavemanOutputMode()` v
`open-sse/services/compression/outputMode.ts`) skontroluje text posledných troch
správ bez ohľadu na ich rolu a preskočí štýly pre celý ťah, keď tento text
zodpovedá kľúčovým slovám týkajúcim sa bezpečnosti, nezvratnej akcie alebo objasnenia, prípadne
sekvencii citlivej na poradie: `first`, `then`, `after that`, `before`, `rollback` alebo
`backup`, po ktorých do 240 znakov nasleduje `delete`, `drop`, `migrate`, `deploy` alebo
`release`. Obídenie sa vykonáva, keď je zapnutý prepínač **Automatické obídenie kvôli zrozumiteľnosti**
(`cavemanOutputMode.autoClarity`, predvolene zapnutý); vypnutie prepínača preskočí
kontrolu kľúčových slov.

Keď obídenie povolí spracovanie ťahu, `placeSystemInstruction()` (ten istý súbor), ktorý
nikdy nevytvára nový `messages[0]`, umiestni blok na prvé z týchto nájdených miest:

1. Úvodná systémová správa s reťazcovým obsahom: blok sa pripojí za jej text.
2. Pole `system` najvyššej úrovne: blok sa pripojí za text reťazca alebo
   sa pridá ako nový textový blok do poľa blokov obsahu.
3. Prvá neskoršia systémová správa s reťazcovým obsahom: blok sa pripojí za jej
   text.
4. Žiadna z uvedených možností: blok sa vloží do novej systémovej správy na konci `messages`.

V tele bez poľa `messages` (alebo s prázdnym poľom) sa nevykoná obídenie podľa obsahu a
pole `system` najvyššej úrovne sa nezohľadňuje. Blok sa pripojí za text
reťazcového poľa `instructions`, pokiaľ už toto pole neobsahuje značku
`[OmniRoute Output Styles]`; v takom prípade telo zostane nezmenené ako
`already_applied`. Keď telo nemá reťazcové pole `instructions`, ale obsahuje `input`
(reťazec alebo pole), blok sa stane hodnotou `instructions` a nahradí akúkoľvek nereťazcovú hodnotu,
ktorú toto pole obsahovalo. Telo, ktoré nemá ani reťazcové pole `instructions`, ani reťazcový či poľový
`input`, zostane nezmenené a preskočí sa ako `no_messages`.

#### Ako povoliť

Na ovládacom paneli: **Kontext kompresie → Nastavenia kompresie**
(`/dashboard/context/settings`), sekcia Štýly výstupu: jeden riadok pre každý štýl s prepínačom
zapnutia/vypnutia a výberom úrovne. Štýly sa vkladajú, keď je zapnutá samotná kompresia (hlavný
prepínač stránky, `enabled`). Prepínač **Automatické obídenie zrozumiteľnosti** sa nachádza na stránke **Caveman**
(`/dashboard/context/caveman`) na jej karte **Režim výstupu**. Konfigurácia
kompresie programovo ukladá výber takto:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Spätná kompatibilita: kým je `outputStyles` prázdne, staršie nastavenie
`cavemanOutputMode.enabled` sa mapuje na `terse-prose` s intenzitou
`cavemanOutputMode.intensity`. Blok potom začína značkou `[OmniRoute Output Styles]`,
zatiaľ čo starší injektor `applyCavemanOutputMode()` vkladal
`[OmniRoute Caveman Output Mode]`. Pod značkou sa text zhoduje so staršou vloženou
verziou v jazykoch en, pt-BR, es, de, fr, it, ru, id a vi; v ja a zh obsahuje jednu
medzeru navyše pred klauzulou o hraniciach. `terse-prose` je preložený do pt-BR, es, de,
fr, it, ru, zh, ja, id a vi, takže požiadavka, ktorej určeným jazykom je `hu`, dostane
anglický text, hoci starší injektor používal maďarský.

Výber jazyka štýlu výstupu (`resolveOutputStyleLanguage()` v
`outputStyles/apply.ts`): keď je `languageConfig.enabled` zapnuté, `autoDetect` vyberie
najnovšiu správu používateľa v poli `messages` požiadavky, ktorá obsahuje text (reťazcový
obsah alebo `text` jej častí obsahu), a spustí na nej detektor enginu Caveman
(`detectCompressionLanguage()`). Detektor vráti `zh` pre text so znakmi Han
a bez kany; inak vráti ten z jazykov `it`, `pt-BR`, `es`, `de`, `fr`, `ru`, `ja`, `hu`
a `id`, ktorý má najviac zhôd s indíciami, a `en`, ak sa nezhoduje žiadny — text, ktorý
nedokáže klasifikovať, dostane angličtinu, nikdy nie `defaultLanguage`, a `vi` sa nikdy
nedeteguje, hoci štýly obsahujú text vo `vi`. Telo Responses API uchováva svoje repliky
v `input`, z ktorého sa vzorka neodoberá, takže dostane `defaultLanguage` a potom
angličtinu. Keď žiadna používateľská správa v `messages` neobsahuje text alebo keď je
`autoDetect` vypnuté, použije sa `defaultLanguage` a potom angličtina. Keď je
`languageConfig.enabled` vypnuté, jazykom je angličtina — pokiaľ sa na požiadavku
nevzťahuje kompresná kombinácia (kombinácia priradená smerovacej kombinácii požiadavky
alebo predvolená kompresná kombinácia, ku ktorej sa chatCore uchýli pri vstavanom
vrstvenom kanáli spracovania): použitie kombinácie zapne pre danú požiadavku
`languageConfig.enabled` a nastaví `defaultLanguage` z jazykových balíkov kombinácie
(uložená hodnota, ak patrí medzi balíky kombinácie, inak prvý balík kombinácie, ktorého
predvolená hodnota je `en`), pričom uložené nastavenie `autoDetect` (predvolene zapnuté)
sa naďalej uplatňuje. Vstupný engine Caveman vyberá jazyk balíka pravidiel odlišne —
pre každú textovú časť samostatne a pri vypnutej automatickej detekcii je výber
obmedzený nastavením `enabledPacks`.

Matica štýl × jazyk je pevne stanovená testom
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: každý štýl katalógu musí mať
záznam v `BASELINE_LANGUAGES` daného testu; štýl, ktorý nie je obmedzený podľa miestneho
nastavenia, musí obsahovať preklad do pt-BR (štýl `terse-cjk`, obmedzený podľa miestneho
nastavenia, je z tohto pravidla vyňatý), pokiaľ nie je uvedený v `KNOWN_ENGLISH_ONLY`,
ktoré môže obsahovať iba štýly úplne bez prekladov — ak má uvedený štýl akýkoľvek
preklad, test zlyhá; štýl zlyhá v teste aj vtedy, keď stratí jazyk uvedený v jeho zázname
`BASELINE_LANGUAGES`. Informácie o pridaní štýlu nájdete v dokumente
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Kompresia výsledkov nástrojov

`compressToolResult()` v `open-sse/services/compression/toolResultCompressor.ts`
komprimuje text výsledkov nástrojov pomocou **5 stratégií**. Skúša ich v tomto poradí
a o výsledku rozhodne prvá povolená stratégia, ktorej kontrola zodpovedá obsahu:

1. **`fileContent`**: obsah s 3 alebo viacerými riadkami, v ktorom aspoň jeden riadok po
   odignorovaní úvodného odsadenia začína reťazcom `import `, `export `, `function `, `class `,
   `const `, `let `, `var ` alebo `return ` (kľúčové slovo nasledované medzerou), prípadne
   reťazcom `if`, `for` alebo `while`, po ktorom nasleduje `(` alebo ` (`, zachová prvých
   20 a posledných 5 riadkov, pričom vynechaný stred označí.
2. **`grepSearch`**: obsah s aspoň jedným riadkom v tvare `<path>:<digits>:`,
   kde text pred prvou dvojbodkou neobsahuje žiadne medzery, zachová iba tieto riadky,
   najviac 30, za ktorými nasleduje počet všetkých ďalších zhôd a zoznam súborov so
   zhodami; každý iný riadok sa odstráni. Na spustenie stratégie stačí jeden takýto
   riadok, takže sa započítava aj riadok protokolu začínajúci časovou pečiatkou, napríklad
   `12:30:45`.
3. **`shellOutput`**: výstup, ktorý obsahuje sekvenciu ANSI CSI (`ESC[`, po ktorom
   nasledujú číslice alebo bodkočiarky a potom písmeno, ako pri farebných kódoch) alebo
   znak `$` nasledovaný medzerou kdekoľvek v texte, stratí tieto sekvencie (iné únikové
   sekvencie, napríklad `ESC[?25l` alebo sekvencia OSC s názvom okna, sa zachovajú)
   a zachová posledných 50 riadkov, pričom po sebe idúce opakované riadky zlúči. Keďže
   sa táto kontrola vykonáva pred stratégiami `json` a `errorMessage`, výstup JSON alebo
   chybový výstup obsahujúci takýto znak `$` sa k nim pri zapnutej stratégii
   `shellOutput` nikdy nedostane.
4. **`json`**: dátová časť JSON dlhšia ako 2 000 znakov, ktorá sa začína znakom `{` alebo
   `[` (po voliteľných medzerách) a ktorú možno analyzovať, sa zhrnie: pole s viac ako
   7 položkami zachová prvých 5 a posledné 2 položky a svoj celkový počet a objekt
   zachová prvých 20 kľúčov, pričom každá hodnota vnoreného objektu alebo poľa sa nahradí
   zástupným symbolom `{…N keys}` (pri poli je N jeho dĺžka) a značka
   `_remaining_<N>_keys` uvádza počet kľúčov vynechaných za prvými 20. Skalárne hodnoty
   sa skopírujú celé, takže objekt s najviac 20 kľúčmi bez vnorených hodnôt sa iba
   preodsadí — minifikovaný objekt tak získa znaky a zostane nezmenený.
5. **`errorMessage`**: výstup, ktorý kdekoľvek a bez ohľadu na veľkosť písmen obsahuje
   `error:`, `error ` (slovo nasledované medzerou, napríklad v `no error found`),
   `[error]`, `exception:`, `exception `, `[exception]` alebo `traceback`, zachová svoj
   prvý riadok, nasledujúcich 10 riadkov a posledné 3, pričom riadky medzi nimi nahradí
   značkou `… [N frames elided] …`. Značka sa zobrazí iba vtedy, keď za prvým riadkom
   nasleduje viac ako 13 riadkov, takže chybový výstup so 14 alebo menej riadkami sa
   neskráti (pri 12 alebo 13 riadkoch posledné 3 zopakujú už zachované riadky).

Keď stratégia nájde zhodu, neskoršie stratégie sa už neskúšajú, a to ani vtedy, ak sa
nič neušetrí. Keď zodpovedajúca stratégia neušetrí žiadne odhadované tokeny (dĺžka ÷ 4,
zaokrúhlená nahor) — napríklad súbor podobný kódu s najviac 25 riadkami alebo pole JSON
dlhšie ako 2 000 znakov s najviac 7 položkami — agresívny mechanizmus zachová pôvodný
výsledok nástroja: obe volajúce funkcie (`compressAggressive()` a
`compressAnthropicToolResultBlock()`) zachovajú originál, keď je hodnota `saved` rovná
0 alebo nižšia, zatiaľ čo samotná funkcia `compressToolResult()` stále vráti výstup
danej stratégie. Krok spracovania výsledku nástroja nie je konečný: záložný sumarizátor
mechanizmu môže stále skrátiť správu `tool` alebo `function` dlhšiu ako 8 192 znakov
(`maxTokensPerMessage`, 2 048, krát 4).

#### Kedy použiť

Kompresia výsledkov nástrojov je krokom 1 agresívneho mechanizmu
(`compressAggressive()` v `open-sse/services/compression/aggressive.ts`), takže sa
spúšťa v režime Aggressive a v kroku `aggressive` vrstveného kanála. Komprimuje správy
`tool` a `function` vo formáte OpenAI a text v blokoch Anthropic `tool_result`. Každá
stratégia má vlastný prepínač pod `aggressive.toolStrategies`; všetky sú predvolene
zapnuté. Na ovládacom paneli sa prepínače nachádzajú v zobrazení **Advanced** na stránke
Caveman, keď je kompresia zapnutá a predvoleným režimom je Aggressive.

### Vrstvený kanál

Vrstvený režim spúšťa **viacero mechanizmov za sebou** — zvyčajne najprv RTK
(úspora 60–90 % vo výstupe nástrojov) a potom Caveman na zostávajúcom texte (úspora
vstupu ~46 %). V kombinácii ide o **rozsah 78–95 % pri vhodných dátach** (pozri
výpočet úspor vyššie): `1 - (1 - 0.60..0.90) × (1 - 0.46)` má priemer ≈89 %.

#### Ako to funguje

```
Vstup (1000 tokenov)
  → RTK (filter zohľadňujúci príkazy) → 200 tokenov
    → Caveman (odstránenie výplne) → 108 tokenov
  → Výstup (108 tokenov, úspora ~89 %)
```

#### Kedy použiť

Vrstvený režim použite na:

- Pracovné postupy s intenzívnym využívaním nástrojov (agentné programovanie, výskum)
- Dávkové spracovanie citlivé na náklady
- Prípady, keď potrebujete maximálnu úsporu tokenov

Vrstvené kanály sa konfigurujú prostredníctvom globálneho nastavenia kompresie
`stackedPipeline` alebo prostredníctvom pomenovanej kombinácie kompresie priradenej ku
kombinácii smerovania (pozri prepísanie podľa kombinácie vyššie) — nie prostredníctvom
`modePack` automatickej kombinácie (toto pole iba mení váhy výberu modelu automatickej
kombinácie a `stacked` nie je platný názov balíka).

---

## Prepísanie kombinácií kompresie

Globálny režim kompresie môžete prepísať **pre každú kombináciu samostatne**, aby ste doladili správanie
pre rôzne prípady použitia:

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "weights": { "taskFit": 0.5 },
    "modePack": "quality-first"
  },
  "compressionOverride": "aggressive"
}
```

Je to užitočné pre:

- **Kombinácie na programovanie**: Pri dlhých reláciách použite režim `aggressive`
- **Kombinácie na rýchle otázky a odpovede**: Na rýchle odpovede použite režim `lite`
- **Kombinácie s intenzívnym používaním nástrojov**: Na dosiahnutie maximálnej úspory použite režim `stacked`
- **Produkčné kombinácie**: Pre poskytovateľov s ukladaním do vyrovnávacej pamäte ponechajte prepísanie vypnuté — neustále aktívna
  úprava zohľadňujúca vyrovnávaciu pamäť automaticky zníži `aggressive`/`ultra` na `standard`
  (režim `cache-aware` nie je možné vybrať)

---

## Pozrite tiež

- [Konfigurácia prostredia](../reference/ENVIRONMENT.md) — Premenné prostredia kompresie
- [Sprievodca architektúrou](../architecture/ARCHITECTURE.md) — Vnútorné fungovanie kompresného kanála
- [Používateľská príručka](../guides/USER_GUIDE.md) — Začíname s kompresiou
- [Kompresia RTK](./RTK_COMPRESSION.md) — Filtre RTK, model dôveryhodnosti, overovacia brána, obnovenie nespracovaného výstupu
- [Kompresné mechanizmy](./COMPRESSION_ENGINES.md) — Caveman, RTK, stacked, API, MCP, ovládací panel
- [Formát pravidiel kompresie](./COMPRESSION_RULES_FORMAT.md) — Formát balíka pravidiel JSON
- [Jazykové balíky kompresie](./COMPRESSION_LANGUAGE_PACKS.md) — Pravidlá Caveman špecifické pre jednotlivé jazyky
