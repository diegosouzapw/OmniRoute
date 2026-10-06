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

## Pokročilé kompresní systémy

Kromě 7 standardních režimů OmniRoute obsahuje několik pokročilých kompresních
systémů, které fungují automaticky na základě kontextu.

### Komprese s ohledem na cache

Někteří poskytovatelé (například Anthropic s prompt caching) podporují **prompt caching**,
který jim umožňuje ukládat části promptu do cache, aby snížili náklady a latenci. Když
je caching povolen, agresivní komprese může ve skutečnosti **poškodit** výkon,
protože mění tokeny v cache a tím ji zneplatňuje.

Modul `cachingAware.ts` to řeší **detekcí kontextu cachování** a
**úpravou kompresní strategie** podle toho.

#### Jak to funguje

1. **Detekce kontextu cachování** — Prohledává tělo požadavku na značky `cache_control`
2. **Identifikace poskytovatelů cachování** — Kontroluje, zda cílový poskytovatel podporuje cachování
3. **Úprava strategie** — Snižuje `aggressive`/`ultra` na `standard` pro poskytovatele cachování
4. **Přeskočení systémového promptu** — Systémové prompty jsou obvykle cachovány, takže je nekomprimujte
5. **Použití deterministických transformací** — Používejte pouze transformace, které produkují konzistentní výstup

#### Příklad kódu

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Značka cache
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Kdy použít

Komprese s ohledem na cache je **vždy zapnutá** – není potřeba žádná konfigurace. Aktivuje se
pouze tehdy, když:

- Požadavek obsahuje značky `cache_control`
- Cílový poskytovatel podporuje prompt caching (Anthropic, OpenAI atd.)

### Progresivní stárnutí

Dlouhé konverzace hromadí mnoho zpráv, ale starší zprávy se stávají méně
relevantními. Modul `progressiveAging.ts` **degraduje zprávy podle vzdálenosti tahu**:

- **Nedávné tahy (0-3)**: Zachovány doslovně (plné detaily)
- **Střední tahy (4-8)**: Lehká komprese (mezery, vyčištění formátování)
- **Staré tahy (9+)**: Jaskyňská komprese (odstranění výplně, shrnutí)
- **Velmi staré tahy (20+)**: Silně shrnuté nebo vynechané

#### Příklad kódu

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 50 dalších tahů ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // První 3 tahy: doslovně
  light: 8, // Tahy 4-8: lehká komprese
  moderate: 20, // Tahy 9-20: jaskyňská komprese
  // Tahy 21+: silné shrnutí
});

// saved = počet ušetřených tokenů
```

#### Kdy použít

Progresivní stárnutí je **vždy zapnuto** pro režimy `aggressive` a `ultra`. Je
zvláště účinné pro:

- Dlouhotrvající kódovací sezení
- Vícedenní konverzace
- Agentní pracovní postupy s mnoha voláními nástrojů

### Režim výstupu "Caveman"

Modul `outputMode.ts` vkládá **instrukce systémového promptu**, aby samotný
model produkoval komprimovaný, stručný výstup (styl „caveman“).

#### Jak to funguje

Místo komprimace vstupu tento režim přidává systémový prompt jako:

> "Odpovězte minimálním počtem slov. Vynechejte zdvořilosti. Použijte krátké věty."

To funguje obzvláště dobře pro:

- Generování kódu (stručnější výstup = méně tokenů)
- Rychlé otázky a odpovědi (není potřeba složitých vysvětlení)
- Dávkové zpracování (maximalizace propustnosti)

#### Kdy použít

Režim výstupu Caveman je **volitelný** – nastavte jej pomocí kombinované konfigurace:

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

Režim výstupu Caveman výše je **starší cesta s jedním stylem**. Fáze 4 jej zobecnila
do katalogu kompozitních stylů výstupu: `OUTPUT_STYLE_CATALOG` v
`open-sse/services/compression/outputStyles/catalog.ts`. Každý styl je instrukce systémového promptu,
která samotnému modelu umožňuje produkovat levnější výstup; styly lze povolit
společně a jsou vkládány v pořadí katalogu.

| Styl                            | `id`          | Co dělá                                                                                                                                                                                                                   | Jazyky instrukcí                                                     |
| :------------------------------ | :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------- |
| Stručný text                    | `terse-prose` | Vynechává výplňová slova/členy/zdráhání; zachovává přesnou technickou podstatu. Stejný text jako starší režim výstupu caveman (odkazováno, nepřepisováno).                                                                | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                        |
| Méně kódu                       | `less-code`   | Žebříček YAGNI: nejmenší funkční změna, žádné nevyžádané abstrakce.                                                                                                                                                       | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                        |
| Culík (líný seniorní vývojář)   | `ponytail`    | "Nejlepší kód je kód, který nikdy nebyl napsán": znovupoužití > přepisování, hlavní příčina > symptom, nejkratší funkční rozdíl.                                                                                          | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                        |
| Mám ADHD (akce na prvním místě) | `i-have-adhd` | Akce na prvním místě (příkaz/cesta/úryvek před textem), číslované ohraničené kroky, JEDEN konkrétní další krok, žádný úvod/shrnutí/závěr. Adaptováno z [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                        |
| Stručný CJK (文言)              | `terse-cjk`   | Ultra-stručný styl klasické čínštiny.                                                                                                                                                                                     | zh (omezeno lokalizací: nabízeno pouze, když je vyřešený jazyk `zh`) |

Každý styl nabízí tři úrovně intenzity — `lite`, `full`, `ultra` — a každá úroveň
končí společnou klauzulí o hranicích, která zachovává bloky kódu, cesty k souborům, příkazy,
chybové řetězce, URL a identifikátory doslovně.

#### Jak funguje injekce

Funkce `applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) vyhodnotí
výběr proti katalogu (neznámá ID a styly neodpovídající lokalizaci jsou vynechány, nikdy to není chyba), zřetězí vybrané instrukce v pořadí katalogu,
připojí klauzuli o hranicích **jednou** a začne blok jedním idempotentním markerem (`[OmniRoute Output Styles]`), takže opětovné použití je no-op. Pokud má vyřešený
jazyk (viz výběr jazyka níže) překlad, je místo angličtiny vložena lokalizovaná instrukce.

U těla s `messages` kontroluje obcházení obsahu (`shouldBypassCavemanOutputMode()` v
`open-sse/services/compression/outputMode.ts`) poslední tři zprávy a přeskočí
styly pro celé kolo, pokud odpovídají jeho klíčovým slovům pro bezpečnost, nevratnou akci,
objasnění nebo citlivost na pořadí. Obcházení se spustí bez ohledu na to, jak je nastaven přepínač **Auto-Clarity Bypass** (`cavemanOutputMode.autoClarity`) na ovládacím panelu.

Když obcházení povolí průchod, `placeSystemInstruction()` (stejný soubor), která
nikdy nevytvoří novou `messages[0]`, umístí blok do prvního z následujících, které najde:

1. Úvodní systémová zpráva s řetězcovým obsahem: blok je připojen za její text.
2. Pole `system` nejvyšší úrovně: blok je připojen za text řetězce, nebo
   přidán jako nový textový blok do pole bloků obsahu.
3. První pozdější systémová zpráva s řetězcovým obsahem: blok je připojen za její text.
4. Nic z výše uvedeného: blok se vloží do nové systémové zprávy na konci `messages`.

U těla bez `messages` je blok připojen k řetězci v poli `instructions`,
nebo se stane `instructions`, když tělo obsahuje `input` (řetězec nebo pole). Tělo
bez `instructions` ani `input` je přeskočeno jako `no_messages`.

#### Jak povolit

Na ovládacím panelu: **Kontext → Nastavení → Komprese** — jeden řádek pro každý styl s
přepínačem zapnutí/vypnutí a voličem úrovně. Programově konfigurace komprese uchovává
výběr jako:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Zpětná kompatibilita: starší kombinované nastavení `outputMode: "caveman"` stále funguje a mapuje se na
`terse-prose`, byte-identické se starou injekcí v každém starším jazyce.

Výběr jazyka: s `languageConfig.enabled` zapnutým, `autoDetect` vybere
jazyk poslední uživatelské zprávy (stejný detektor jako vstupní enginy);
vypnutí `autoDetect` zafixuje `defaultLanguage`. Vypnuto → Angličtina.

Matice styl × jazyk je pevně stanovena souborem
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: nový styl nemůže být dodán
bez alespoň pt-BR překladu (nebo explicitní sledované výjimky), a
existující styl nemůže tiše ztratit lokalizaci. Pro přidání stylu viz
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Komprese výsledků nástrojů

Modul `toolResultCompressor.ts` poskytuje **5 specializovaných kompresních strategií**
pro výsledky nástrojů (volání funkcí, výstupy agentů, výsledky vyhledávání atd.):

1.  **Komprese výsledků vyhledávání** — Odstraňuje redundantní výsledky, zachovává top-N
2.  **Komprese čtení souborů** — Zkracuje velké soubory, zachovává hlavičky/importy
3.  **Komprese spouštění kódu** — Zachovává pouze podstatný stdout/stderr
4.  **Komprese databázových dotazů** — Omezuje řádky, odstraňuje podrobná metadata
5.  **Komprese odpovědí API** — Odstraňuje nulová pole, zahušťuje pole

#### Kdy použít

Komprese výsledků nástrojů je **vždy zapnutá**, když jsou přítomna volání nástrojů. Není potřeba žádná konfigurace.

### Skládaný pipeline

Skládaný režim spouští **více enginů v sekvenci** — obvykle nejprve RTK (60-90% úspora na výstupu nástroje), poté Caveman (30% dodatečná úspora na zbývajícím textu). Tím se dosáhne **celkové úspory 78-95%**.

#### Jak to funguje

```
Vstup (1000 tokenů)
  → RTK (filtr citlivý na příkazy) → 200 tokenů
    → Caveman (odstranění výplňových slov) → 140 tokenů
  → Výstup (140 tokenů, 86% úspora)
```

#### Kdy použít

Použijte skládaný režim pro:

- Pracovní postupy náročné na nástroje (agentní kódování, výzkum)
- Dávkové zpracování citlivé na náklady
- Když potřebujete maximální úsporu tokenů

Konfigurujte pomocí kombinace:

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
