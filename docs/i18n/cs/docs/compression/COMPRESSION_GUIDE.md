# 🗜️ Prompt Compression Guide — OmniRoute (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Automaticky ušetřete 15–95 % u vhodného kontextu. Stručný přehled najdete v [části README o kompresi](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Přehled

OmniRoute implementuje modulární pipeline pro kompresi promptů, která se spouští **proaktivně** předtím, než požadavky dorazí k nadřazeným poskytovatelům. Úspora tokenů tak probíhá transparentně — váš pracovní postup není nutné nijak měnit.

```
Požadavek klienta
  → Výběr strategie komprese
    → Přepsání kombinací? → Použít nastavení kombinace
    → Práh automatického spuštění? → Použít automatický režim
    → Výchozí režim? → Použít globální nastavení
    → Vypnuto? → Přeskočit kompresi
  → Vybraný režim komprese
    → Vypnuto: Bez komprese
    → Lehký: Bezpečné vyčištění mezer a formátování (~15 %)
    → Standardní: Odstranění výplně ve stylu jeskynní mluvy (~30 %)
    → Agresivní: Stárnutí historie + sumarizace (~50 %)
    → Ultra: Heuristické prořezávání + ztenčení bloků kódu (~75 %)
    → RTK: Filtrování výstupu terminálu/nástrojů s ohledem na příkazy (rozsah 60–90 % u upstreamu)
    → Skládaný: Seřazená pipeline více enginů, obvykle RTK a poté Caveman (rozsah 78–95 % u vhodného obsahu)
  → Komprimovaný požadavek → Poskytovatel
```

---

## Režimy komprese

### Vypnuto

Nepoužije se žádná komprese. Všechny zprávy projdou beze změny.

### Lehký režim (~15% úspora, latence <1ms)

Nejbezpečnější režim — nulová sémantická změna, pouze vyčištění formátování:

| Technika                 | Popis                                                |
| ------------------------ | ---------------------------------------------------- |
| `collapseWhitespace`     | Sloučí po sobě jdoucí prázdné řádky a koncové mezery |
| `dedupSystemPrompt`      | Odstraní duplicitní systémové zprávy                 |
| `compressToolResults`    | Komprimuje příliš podrobné výstupy nástrojů/funkcí   |
| `removeRedundantContent` | Odstraní opakované pokyny                            |
| `replaceImageUrls`       | Zkrátí datové URI obrázků ve formátu base64          |

**Nejvhodnější pro:** Trvalé používání, pracovní postupy s kritickými požadavky na bezpečnost.

### Standardní režim (~30% úspora)

Inspirováno projektem [Caveman](https://github.com/JuliusBrussee/caveman) — odstraňuje výplňová slova a rozvláčné formulace při zachování významu:

- Odstraňuje výplňová slova („prosím“, „myslím“, „v podstatě“, „vlastně“)
- Zkracuje rozvláčné fráze („za účelem“ → „pro“, „v důsledku“ → „protože“)
- Odstraňuje zdvořilostní změkčování („Nevadilo by vám...“, „Pokud byste mohl...“)
- Více než 30 pravidel regulárních výrazů vyladěných pro programátorské prompty

**Nejvhodnější pro:** Každodenní programátorské pracovní postupy, týmy zaměřené na náklady.

### Agresivní režim (~50% úspora)

Inteligentní správa historie pro dlouhé relace:

- **Stárnutí zpráv** — starší zprávy se postupně více komprimují
- **Sumarizace výsledků nástrojů** — dlouhé výstupy nástrojů jsou nahrazeny souhrny
- **Ochrany strukturální integrity** — zajišťují konzistenci dvojic `tool_use` + `tool_result`
- **Zohlednění kontextového okna** — respektuje limity tokenů jednotlivých modelů

**Nejvhodnější pro:** Dlouhé relace ladění, rozsáhlé kódové základny.

### Režim Ultra (~75% úspora)

Maximální komprese pro scénáře s kritickými nároky na počet tokenů:

- **Heuristické prořezávání** — odstraňuje zprávy pod prahem relevance
- **Ztenčení bloků kódu** — komprimuje opakující se příklady kódu
- **Zkrácení pomocí binárního vyhledávání** — najde optimální bod zkrácení pro kontextové okno
- Zahrnuje všechny funkce agresivního režimu

**Nejvhodnější pro:** Situace, kdy opakovaně narážíte na limity kontextu.

### Režim RTK (rozsah 60–90 % u upstreamu)

Režim RTK je optimalizován pro podrobné výstupy nástrojů, které se objevují v relacích programátorských agentů:

- Detekuje třídy příkazů/výstupů, jako jsou `git status`, `git diff`, `git log`, nástroje pro spouštění testů,
  sestavení TypeScript/Vite/Webpack, ESLint/Biome/Prettier, audity/instalace npm, protokoly Dockeru, výstup
  infrastruktury a obecný výstup shellu
- Používá sady filtrů JSON z `open-sse/services/compression/engines/rtk/filters/`
- Importuje filtry schématu RTK TOML v1 z projektových nebo globálních souborů `filters.toml`, včetně
  ověřování vloženými testy a kontroly důvěryhodnosti projektových souborů
- Obsahuje 49 vestavěných filtrů s vloženými ověřovacími vzorky
- Odstraňuje řídicí sekvence ANSI, ukazatele průběhu, opakované řádky a nerelevantní šum
- Zachovává selhání, chyby, varování, změněné soubory, souhrny a konec dlouhého výstupu
- Podporuje projektové filtry s kontrolou důvěryhodnosti, globální filtry a volitelné obnovení redigovaného nezpracovaného výstupu

**Nejvhodnější pro:** Relace agentů s přepisy shellu, sestavení, testů, příkazů git, grep a souborových výstupů.

### Skládaný režim (rozsah 78–95 % u vhodného obsahu)

Skládaný režim spouští více kompresních enginů v deterministickém pořadí. Výchozí pipeline je:

```txt
RTK -> Caveman
```

Toto pořadí nejprve zkomprimuje výstup terminálu/nástrojů a poté použije sémantické zkrácení Caveman
na zbývající prompt v přirozeném jazyce. Skládané pipelines lze konfigurovat globálně nebo prostřednictvím
kombinací komprese přiřazených ke kombinacím směrování.

**Nejvhodnější pro:** Smíšený kontext s rozsáhlými protokoly nástrojů spolu s lidskými pokyny nebo souhrny asistenta.

---

## Výpočet úspor oproti upstreamu

OmniRoute dokumentuje úspory díky kompresi ze dvou zdrojů: benchmarků upstreamových projektů a
vlastní kombinace enginů OmniRoute.

| Zdroj   | Číslo z upstreamového README použité zde                                                                                        |
| ------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Caveman | o `~75%` méně výstupních tokenů, průměrná úspora výstupu v benchmarku `65%`, rozsah `22-87%` a nástroj s kompresí vstupu `~46%` |
| RTK     | úspora výstupu příkazů `60-90%`; ukázková relace `~118,000 -> ~23,900` tokenů neboli úspora `79.7%` (`~80%`)                    |

Pro překrývající se datové části nástrojů a kontextu výchozí kombinace OmniRoute skládá enginy takto:

```txt
RTK -> Caveman
```

Kombinované úspory jsou násobné, nikoli sčítané:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Hodnota `78-95%` platí, když RTK i Caveman mohou zmenšit stejnou datovou část vstupu či kontextu.
Režim výstupu odpovědí Caveman je samostatný: když je povolen, použijí se vlastní úspory výstupu
Caveman (`65%` v průměru, hlavní uváděná hodnota `~75%`, rozsah `22-87%`). Celkové úspory nákladů
závisí na poměru promptů a výstupů.

### Co ve skutečnosti znamená „způsobilý“

Uváděný rozsah 15-95% je reálný, ale vztahuje se pouze na **redundantní nebo příliš podrobný** obsah —
opakované chybové řádky, protokol sestavení zahlcený stejným varováním nebo nadměrně velký výpis
z `grep` či čtení souboru. **Neznamená** to, že každá žádost ušetří tolik.

Empiricky ověřeno (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): běh
`stacked` (RTK + Caveman) nad blokem `tool_result` ve formátu Anthropic, který obsahoval 300 identických
chybových řádků, dosáhl **úspory tokenů 95.93% / úspory znaků 96.26%** — přesně v inzerovaném
rozsahu. Tentýž řetězec zpracování použitý na běžný, neredundantní výstup nástroje (čistý seznam shod
z `grep`, krátké čtení souboru, běžný konverzační text) však správně dosahuje **téměř nulových úspor**,
protože neobsahuje nic opakujícího se, co by bylo možné odstranit, a `validateCompression()`
(`validation.ts`) odmítne odeslat přepsaný obsah, který by odstranil nebo změnil bloky kódu, adresy
URL, nadpisy, verze nebo identifikátory konstant psané VELKÝMI PÍSMENY.

Jde o očekávané a bezpečné chování, nikoli o chybu: programovací relace, která převážně čte nebo
prohledává čisté soubory, dosáhne i při plně povolené kompresi jen mírných celkových úspor, zatímco
relace, která narazí na chybovou smyčku nebo příliš upovídaný linter, dosáhne u tohoto provozu plného
rozsahu 78-95%. Nízké souhrnné procento úspor jedné relace nepovažujte za důkaz nesprávného nastavení
komprese — nejprve zkontrolujte, zda byl výchozí výstup nástroje skutečně redundantní.

---

## Vizualizace úspory tokenů

```
Bez komprese:        47K tokenů odeslaných do LLM
S Lite:              40K tokenů odeslaných       (úspora 15% — bezpečné, vždy aktivní)
Se Standard:         33K tokenů odeslaných       (úspora 30% — pravidla caveman-speak)
S Aggressive:        24K tokenů odeslaných       (úspora 50% — stárnutí + sumarizace)
S Ultra:             12K tokenů odeslaných       (úspora 75% — heuristické prořezávání)
S RTK:               19K-5K tokenů odeslaných    (úspora 60-90% u výstupu příkazů/nástrojů)
Se Stacked:          10K-2.5K tokenů odeslaných  (rozsah 78-95% pro způsobilý obsah RTK+Caveman)
```

---

## Konfigurace

### Ovládací panel

Přejděte do `Dashboard → Context & Cache`:

- **Caveman** — výběr režimu, jazykové balíčky, náhled a globální výchozí nastavení
- **RTK** — náhled filtrování příkazů, bezpečnostní nastavení RTK a katalog filtrů
- **Compression Combos** — pojmenované kanály enginů přiřazené ke směrovacím kombinacím
- **Auto-Trigger Threshold** — automaticky aktivuje kompresi, když počet tokenů překročí prahovou hodnotu

### Přepsání pro konkrétní kombinaci

V `Dashboard → Context & Cache → Compression Combos` přiřaďte kompresní kombinaci ke směrovací
kombinaci:

```txt
Kombinace: "free-tier-fallback"
  Kompresní kombinace: "coding-agent-stack"
  Kanál: RTK -> Caveman
  Cíle:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

To umožňuje používat vrstvenou kompresi u bezplatných/programátorských poskytovatelů a současně zachovat odlehčený režim u placených
předplatných.

Toto přiřazení „Přepsání pro konkrétní kombinaci“ je jiný ovládací prvek než přepsání **režimu komprese směrovací
kombinace** (Default/Off/Lite/Standard/Aggressive/Ultra) — toto přepsání nevybírá pojmenovaný kanál
kompresní kombinace; pouze nastavuje pole `compressionMode`, které používá
`resolveCompressionPlan`. Lze jej nastavit buď na kartě kombinace (`Dashboard → Combos`), nebo od verze
#6760 pro jednotlivé směrovací kombinace v seznamu „Assign to routing“ na stránce
`Dashboard → Context & Cache → Compression Combos`, přímo vedle zaškrtávacího políčka pro přiřazení kanálu
popsaného výše. Obě rozhraní ukládají nastavení prostřednictvím stejného koncového bodu `PUT /api/combos/{id}`.

### Přepsání pro jednotlivý požadavek

Odešlete hlavičku požadavku `x-omniroute-compression`, chcete-li přepsat plán komprese pro jeden
požadavek. Má nejvyšší prioritu — přebíjí přepsání směrovací kombinace, aktivní profil,
automatické spuštění i výchozí nastavení panelu. Neznámé hodnoty jsou ignorovány (požadavek není nikdy odmítnut) a
globální hlavní přepínač stále řídí vše: pokud je komprese globálně vypnutá, hlavička ji nemůže
zapnout. Hodnoty:

| Hodnota       | Účinek                                                                                                  |
| ------------- | ------------------------------------------------------------------------------------------------------- |
| `off`         | Pro tento požadavek se nepoužije žádná komprese.                                                        |
| `default`     | Výchozí profil odvozený z panelu (ignoruje aktivní profil). Ztrátové enginy zůstanou vypnuté.           |
| `safe`        | Stejné jako vynechání hlavičky: pouze deduplikace a sloučení bílých znaků.                              |
| `allow-lossy` | Zachová operátorský plán tohoto požadavku včetně souhrnů, filtrů relevance a přepisů stylu.             |
| `engine:<id>` | Jeden engine, pokud je povolen, např. `engine:rtk`. Tímto se engine aktivuje pro daný požadavek.        |
| `<combo>`     | Pojmenovaná kombinace, nejprve porovnávaná podle názvu (bez rozlišení velikosti písmen), poté podle ID. |

Bez `allow-lossy`, `engine:<id>` nebo pojmenované kombinace se ztrátové enginy nepoužijí.
Pokud je komprese zapnutá, požadavek přesto využije deduplikaci relace a sloučení bílých znaků.

Použitý plán se vrací v hlavičce odpovědi `X-OmniRoute-Compression: <mode>; source=<source>`,
kde `<source>` je jedna z hodnot `request-header`, `routing-override`, `active-profile`,
`auto-trigger`, `default` nebo `off`.

### API

```bash
# Získání nastavení komprese
curl http://localhost:20128/api/settings/compression

# Aktualizace nastavení komprese
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Náhled konkrétní datové části RTK/stacked
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Výpis balíčků filtrů RTK
curl http://localhost:20128/api/context/rtk/filters

# Přímé testování RTK s volitelnými metadaty příkazu
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Co je chráněno

Kompresní engine **vždy zachovává:**

- ✅ Bloky kódu (ohraničené i vložené)
- ✅ URL a cesty k souborům
- ✅ Struktury JSON a strukturovaná data
- ✅ Identifikátory a chráněné technické tokeny
- ✅ Matematické výrazy
- ✅ Definice volání nástrojů/funkcí
- ✅ Systémové prompty (v režimu lite)

Obnova surového výstupu RTK před uložením rediguje běžné klíče API, bearer tokeny, tokeny Slacku, přístupové klíče AWS,
hesla, tokeny a tajné údaje.

---

## Statistiky komprese

Každý komprimovaný požadavek zahrnuje statistiky v protokolech serveru:

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

## Plán jednotlivých fází

| Fáze    | Režimy                                                                                                                                                            | Stav      |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| Fáze 1  | Off, Lite                                                                                                                                                         | ✅ Vydáno |
| Fáze 2  | Standard, Aggressive, Ultra                                                                                                                                       | ✅ Vydáno |
| Fáze 3  | RTK, Stacked, kombinace komprese                                                                                                                                  | ✅ Vydáno |
| Fáze 4  | Styly výstupu, Ultra na úrovni SLM, evaluační sada                                                                                                                | ✅ Vydáno |
| Fáze 4C | Adaptivní rozpočet kontextu („volič“) — výpočetní jádro + API (`contextBudget` v `PUT /api/settings/compression`) + ovládací prvky režimu/zásad na řídicím panelu | ✅ Vydáno |

---

## Poděkování

Pravidla komprese standardního režimu jsou inspirována projektem **[Caveman](https://github.com/JuliusBrussee/caveman)** od **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — virálním projektem „proč používat mnoho tokenů, když stačí pár“. Caveman uvádí o `~75%` méně výstupních tokenů, průměrnou úsporu výstupu v benchmarcích `65%`, rozsah úspory výstupu `22-87%` a nástroj pro kompresi vstupu s úsporou `~46%`.

Režim RTK je inspirován projektem **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** od **[RTK AI](https://github.com/rtk-ai)** — vysoce výkonným projektem pro kompresi výstupu příkazů terminálu, sestavení, testů, gitu a nástrojů. RTK uvádí úsporu `60-90%`, přičemž ukázková relace v jeho souboru README ukazuje úsporu `~80%`.

---

## Pokročilé systémy komprese

Kromě 7 standardních režimů obsahuje OmniRoute několik pokročilých systémů komprese, které fungují automaticky podle kontextu.

### Komprese zohledňující mezipaměť

Někteří poskytovatelé (například Anthropic s ukládáním promptů do mezipaměti) podporují **ukládání promptů do mezipaměti**, které jim umožňuje ukládat části promptu, a tím snižovat náklady a latenci. Když je ukládání do mezipaměti zapnuté, agresivní komprese může ve skutečnosti **zhoršit** výkon, protože změní tokeny uložené v mezipaměti, a tím mezipaměť zneplatní.

Modul `cachingAware.ts` tento problém řeší **detekcí kontextu ukládání do mezipaměti** a odpovídající **úpravou strategie komprese**.

#### Jak to funguje

1. **Detekce kontextu ukládání do mezipaměti** — Prohledá tělo požadavku a hledá značky `cache_control`
2. **Identifikace poskytovatelů podporujících ukládání do mezipaměti** — Ověří, zda cílový poskytovatel podporuje ukládání do mezipaměti
3. **Úprava strategie** — Pro poskytovatele podporující ukládání do mezipaměti sníží úroveň `aggressive`/`ultra` na `standard`
4. **Vynechání systémového promptu** — Systémové prompty se obvykle ukládají do mezipaměti, proto se nekomprimují
5. **Použití deterministických transformací** — Použijí se pouze transformace, které vytvářejí konzistentní výstup

#### Příklad kódu

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Značka mezipaměti
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Kdy použít

Komprese zohledňující mezipaměť je **vždy zapnutá** — není potřeba žádná konfigurace. Aktivuje se pouze tehdy, když:

- Požadavek obsahuje značky `cache_control`
- Cílový poskytovatel podporuje ukládání promptů do mezipaměti (Anthropic, OpenAI atd.)

### Postupné stárnutí

V dlouhých konverzacích se hromadí mnoho tahů zpráv, ale starší tahy se postupně stávají méně relevantními. Modul `progressiveAging.ts` **redukuje zprávy podle vzdálenosti tahu**:

- **Nedávné tahy (0–3)**: Zachovány doslovně (veškeré podrobnosti)
- **Středně staré tahy (4–8)**: Lehká komprese (vyčištění mezer a formátování)
- **Staré tahy (9+)**: Telegrafická komprese (odstranění výplňových slov, shrnutí)
- **Velmi staré tahy (20+)**: Výrazně shrnuty nebo odstraněny

#### Příklad kódu

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... dalších 50 tahů ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // První 3 tahy: doslovně
  light: 8, // Tahy 4–8: lehká komprese
  moderate: 20, // Tahy 9–20: telegrafická komprese
  // Tahy 21+: výrazné shrnutí
});

// saved = počet ušetřených tokenů
```

#### Kdy použít

Postupné stárnutí je **vždy zapnuté** pro režimy `aggressive` a `ultra`. Je obzvláště účinné pro:

- Dlouhodobé programovací relace
- Vícedenní konverzace
- Agentní pracovní postupy s mnoha voláními nástrojů

### Režim telegrafického výstupu

Modul `outputMode.ts` vkládá **instrukce do systémového promptu**, aby samotný model vytvářel komprimovaný, stručný výstup („telegrafickým“ stylem).

#### Jak to funguje

Namísto komprese vstupu přidá tento režim systémový prompt, například:

> „Odpovídej s minimem slov. Vynechávej zdvořilostní fráze. Používej krátké věty.“

Tento přístup funguje obzvláště dobře pro:

- Generování kódu (stručnější výstup = méně tokenů)
- Rychlé otázky a odpovědi (nejsou potřeba podrobná vysvětlení)
- Dávkové zpracování (maximalizace propustnosti)

#### Kdy použít

Režim telegrafického výstupu je **volitelný** — nastavte jej prostřednictvím kombinované konfigurace:

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

### Styly výstupu (katalog)

Výše uvedený režim telegrafického výstupu představuje **původní cestu s jediným stylem**. Fáze 4 jej zobecnila do katalogu kombinovatelných stylů výstupu: `OUTPUT_STYLE_CATALOG` v souboru `open-sse/services/compression/outputStyles/catalog.ts`. Každý styl je instrukcí systémového promptu, která přiměje samotný model vytvářet úspornější výstup; styly lze zapnout současně a vkládají se v pořadí katalogu.

| Styl                          | `id`          | Co dělá                                                                                                                                                                                                                | Jazyky instrukcí                                                                               |
| ----------------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Stručná próza                 | `terse-prose` | Odstraňuje výplňová slova, členy a váhavé formulace; zachovává přesný technický obsah. Stejný text jako starší výstupní režim caveman (odkazovaný, nikoli znovu uvedený).                                              | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                                  |
| Méně kódu                     | `less-code`   | Stupnice YAGNI: nejmenší funkční změna, žádné nevyžádané abstrakce.                                                                                                                                                    | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                                  |
| Culík (líný seniorní vývojář) | `ponytail`    | „Nejlepší kód je ten, který nikdy nebyl napsán“: opětovné použití > přepisování, základní příčina > příznak, nejkratší funkční rozdíl.                                                                                 | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                                  |
| Mám ADHD (nejprve akce)       | `i-have-adhd` | Nejprve akce (příkaz/cesta/úryvek před prózou), očíslované kroky s jasným rozsahem, JEDEN konkrétní další krok, žádný úvod/souhrn/závěr. Převzato z [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                                  |
| Stručné CJK (文言)            | `terse-cjk`   | Extrémně stručný styl klasické čínštiny.                                                                                                                                                                               | zh (omezeno podle národního prostředí: nabízeno pouze tehdy, když je rozpoznaným jazykem `zh`) |

Každý styl nabízí tři úrovně intenzity — `lite`, `full`, `ultra` — a každá úroveň
končí sdílenou klauzulí o omezeních, která zachovává bloky kódu, cesty k souborům, příkazy,
chybové řetězce, adresy URL a identifikátory beze změny.

#### Jak vkládání funguje

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) porovná
výběr s katalogem (neznámá id a styly neodpovídající národnímu prostředí jsou
vyřazeny, nikdy nezpůsobí chybu), zřetězí vybrané instrukce v pořadí katalogu,
připojí klauzuli o omezeních **jednou** a vloží výsledek na začátek systémové
výzvy za jedinou idempotentní značku (`[OmniRoute Output Styles]`) — opakované
použití nic nezmění. Pokud existuje překlad pro rozpoznaný jazyk požadavku, vloží
se místo angličtiny lokalizovaná instrukce.

#### Jak povolit

V ovládacím panelu: **Kontext → Nastavení → Komprese** — jeden řádek pro každý styl
s přepínačem zapnuto/vypnuto a voličem úrovně. Programově konfigurace komprese ukládá
výběr jako:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Zpětná kompatibilita: starší kombinované nastavení `outputMode: "caveman"` stále funguje
a mapuje se na `terse-prose`, přičemž je v každém starším jazyce bajtově identické
s původním vloženým obsahem.

Výběr jazyka: když je `languageConfig.enabled` zapnuto, `autoDetect` vybere
jazyk nejnovější zprávy uživatele (stejný detektor jako u vstupních modulů);
vypnutí `autoDetect` napevno nastaví `defaultLanguage`. Vypnuto → angličtina.

Matice styl × jazyk je pevně definována v
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: nový styl nelze vydat
bez alespoň překladu pt-BR (nebo explicitně sledované výjimky) a existující styl
nemůže bez upozornění přijít o národní prostředí. Pokyny k přidání stylu naleznete v
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Komprese výsledků nástrojů

Modul `toolResultCompressor.ts` poskytuje **5 specializovaných kompresních strategií**
pro výsledky nástrojů (volání funkcí, výstupy agentů, výsledky vyhledávání atd.):

1. **Komprese výsledků vyhledávání** — Odstraňuje nadbytečné výsledky, zachovává nejlepších N
2. **Komprese načtených souborů** — Zkracuje velké soubory, zachovává hlavičky/importy
3. **Komprese spuštění kódu** — Zachovává pouze nezbytný stdout/stderr
4. **Komprese databázových dotazů** — Omezuje počet řádků, odstraňuje zbytečně podrobná metadata
5. **Komprese odpovědí API** — Odstraňuje pole s hodnotou null, zkracuje pole

#### Kdy použít

Komprese výsledků nástrojů je při přítomnosti volání nástrojů **vždy zapnutá**.
Není nutná žádná konfigurace.

### Zřetězený kanál zpracování

Zřetězený režim spouští **více modulů za sebou** — obvykle nejprve RTK
(úspora 60–90 % na výstupu nástrojů), poté Caveman (další 30% úspora u
zbývajícího textu). Tím se dosahuje **celkové úspory 78–95 %**.

#### Jak funguje

```
Vstup (1000 tokenů)
  → RTK (filtr zohledňující příkazy) → 200 tokenů
    → Caveman (odstranění výplně) → 140 tokenů
  → Výstup (140 tokenů, úspora 86 %)
```

#### Kdy použít

Zřetězený režim použijte pro:

- Pracovní postupy intenzivně využívající nástroje (agentní programování, výzkum)
- Dávkové zpracování citlivé na náklady
- Situace, kdy potřebujete maximální úsporu tokenů

Nakonfigurujte pomocí kombinace:

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

## Přepsání komprese pro jednotlivé kombinace

Globální režim komprese můžete přepsat **pro každou kombinaci zvlášť** a doladit tak chování
pro různé případy použití:

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

To je užitečné pro:

- **Kombinace pro programování**: Pro dlouhé relace použijte režim `aggressive`
- **Kombinace pro rychlé otázky a odpovědi**: Pro rychlé odpovědi použijte režim `lite`
- **Kombinace s intenzivním využitím nástrojů**: Pro maximální úsporu použijte režim `stacked`
- **Produkční kombinace**: Pro poskytovatele podporující ukládání do mezipaměti použijte režim `cache-aware`

---

## Viz také

- [Konfigurace prostředí](../reference/ENVIRONMENT.md) — Proměnné prostředí pro kompresi
- [Průvodce architekturou](../architecture/ARCHITECTURE.md) — Interní fungování kompresní pipeline
- [Uživatelská příručka](../guides/USER_GUIDE.md) — Začínáme s kompresí
- [Komprese RTK](./RTK_COMPRESSION.md) — Filtry RTK, model důvěryhodnosti, ověřovací brána a obnovení nezpracovaného výstupu
- [Kompresní enginy](./COMPRESSION_ENGINES.md) — Caveman, RTK, skládání, API, MCP a řídicí panel
- [Formát pravidel komprese](./COMPRESSION_RULES_FORMAT.md) — Formát balíčku pravidel JSON
- [Jazykové balíčky komprese](./COMPRESSION_LANGUAGE_PACKS.md) — Pravidla Caveman specifická pro jednotlivé jazyky
