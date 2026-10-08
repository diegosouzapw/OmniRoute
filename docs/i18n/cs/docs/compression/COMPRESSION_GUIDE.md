# 🗜️ Prompt Compression Guide — OmniRoute (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Automaticky ušetřete 15–95 % tokenů u vhodného kontextu. Stručný přehled najdete v [části README o kompresi](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Přehled

OmniRoute implementuje modulární pipeline komprese promptů, která se spouští **proaktivně** před odesláním požadavků upstream poskytovatelům. K úspoře tokenů tak dochází transparentně — váš pracovní postup není nutné nijak měnit.

```
Požadavek klienta
  → Výběr strategie komprese
    → Přepsání kombinací? → Použít nastavení kombinace
    → Prahová hodnota automatického spuštění? → Použít automatický režim
    → Výchozí režim? → Použít globální nastavení
    → Vypnuto? → Přeskočit kompresi
  → Vybraný režim komprese
    → Vypnuto: Bez komprese
    → Lehký: Bezpečné vyčištění mezer a formátování (~15 %)
    → Standardní: Odstranění výplňových slov ve stylu Caveman (~30 %)
    → Agresivní: Stárnutí historie + sumarizace (~50 %)
    → Ultra: Heuristické prořezávání + ztenčování bloků kódu (~75 %)
    → RTK: Filtrování výstupu terminálu/nástrojů se zohledněním příkazů (upstream rozsah 60–90 %)
    → Skládaný: Uspořádaná pipeline více enginů, obvykle RTK a poté Caveman (rozsah 78–95 % u vhodného obsahu)
  → Komprimovaný požadavek → Poskytovatel
```

---

## Režimy komprese

### Vypnuto

Není použita žádná komprese. Všechny zprávy procházejí beze změny.

### Lehký režim (~15% úspora, latence <1 ms)

Nejbezpečnější režim — nulová sémantická změna, pouze vyčištění formátování:

| Technika                 | Popis                                                       |
| ------------------------ | ----------------------------------------------------------- |
| `collapseWhitespace`     | Sloučí po sobě jdoucí prázdné řádky a mezery na konci řádků |
| `dedupSystemPrompt`      | Odstraní duplicitní systémové zprávy                        |
| `compressToolResults`    | Komprimuje podrobné výstupy nástrojů/funkcí                 |
| `removeRedundantContent` | Odstraní opakované pokyny                                   |
| `replaceImageUrls`       | Zkrátí datové URI obrázků ve formátu base64                 |

**Nejvhodnější pro:** Trvale zapnuté používání a pracovní postupy s kritickými požadavky na bezpečnost.

### Standardní režim (~30% úspora)

Inspirováno nástrojem [Caveman](https://github.com/JuliusBrussee/caveman) — odstraňuje výplňová slova a rozvláčné formulace, přičemž zachovává význam:

- Odstraňuje výplňová slova („prosím“, „myslím si“, „v podstatě“, „vlastně“)
- Zkracuje rozvláčné fráze („za účelem“ → „pro“, „v důsledku“ → „protože“)
- Odstraňuje zdvořilé zmírňující formulace („Nevadilo by vám...“, „Pokud byste případně mohli...“)
- Více než 30 pravidel regulárních výrazů vyladěných pro programovací prompty

**Nejvhodnější pro:** Každodenní programovací pracovní postupy a týmy dbající na náklady.

### Agresivní režim (~50% úspora)

Inteligentní správa historie pro dlouhé relace:

- **Stárnutí zpráv** — starší zprávy jsou postupně více komprimovány
- **Komprese výsledků nástrojů** — dlouhé výstupy nástrojů jsou zkráceny nebo vynechány (první/poslední řádky,
  filtrování odpovídajících řádků, kompakce klíčů JSON)
- **Ochrany strukturální integrity** — zajišťují, aby dvojice `tool_use` + `tool_result` zůstaly konzistentní
- **Zohlednění kontextového okna** — respektuje limity tokenů jednotlivých modelů

**Nejvhodnější pro:** Dlouhé ladicí relace a rozsáhlé zdrojové kódy.

### Režim Ultra (~75% úspora)

Maximální komprese pro scénáře s kritickými nároky na tokeny:

- **Heuristické prořezávání** — prořezávání tokenů prózy na základě bodového hodnocení
- **Zachování struktury** — ohraničené bloky kódu, vložený kód, URL a identifikátory jsou
  nahrazeny zástupnými symboly a následně beze změny znovu vloženy; nikdy se neprořezávají
- **Volitelná úroveň SLM** — je-li nakonfigurována, může prořezávání zpřesnit malý lokální model
- Nezávislé na agresivním režimu: nespouští stárnutí zpráv, kompresi výsledků nástrojů
  ani záložní sumarizátor (pouze selhání úrovně SLM může přesměrovat záložní průchod přes
  agresivní režim)

**Nejvhodnější pro:** Situace, kdy opakovaně narážíte na limity kontextu.

### Režim RTK (upstream rozsah 60–90 %)

Režim RTK je optimalizován pro podrobné výstupy nástrojů, které se objevují v relacích programovacích agentů:

- Detekuje třídy příkazů/výstupů, jako jsou `git status`, `git diff`, `git log`, nástroje pro spouštění testů,
  sestavení TypeScript/Vite/Webpack, ESLint/Biome/Prettier, audity/instalace npm, protokoly Dockeru, výstupy infrastruktury
  a obecné výstupy shellu
- Používá balíčky filtrů JSON z `open-sse/services/compression/engines/rtk/filters/`
- Importuje filtry schématu RTK TOML v1 z projektových nebo globálních souborů `filters.toml`, včetně validace
  vložených testů a řízení důvěryhodnosti projektových souborů
- Obsahuje 55 vestavěných filtrů s vloženými ověřovacími vzorky
- Odstraňuje řídicí sekvence ANSI, ukazatele průběhu, opakované řádky a nerelevantní šum
- Zachovává selhání, chyby, varování, změněné soubory, souhrny a konec dlouhého výstupu
- Podporuje projektové filtry řízené důvěryhodností, globální filtry a volitelnou obnovu redigovaného nezpracovaného výstupu

**Nejvhodnější pro:** Relace agentů obsahující přepisy shellu, sestavení, testů, příkazů git a grep a výstupů souborů.

### Skládaný režim (rozsah 78–95 % u vhodného obsahu)

Skládaný režim spouští více kompresních enginů v deterministickém pořadí. Výchozí pipeline je:

```txt
RTK -> Caveman
```

Toto pořadí nejprve zkompaktňuje výstup terminálu/nástrojů a poté na
zbývající prompt v přirozeném jazyce aplikuje sémantické zhuštění Caveman. Skládané pipeline lze konfigurovat globálně nebo prostřednictvím
kombinací komprese přiřazených ke kombinacím směrování.

**Nejvhodnější pro:** Smíšený kontext s rozsáhlými protokoly nástrojů spolu s lidskými pokyny nebo souhrny asistenta.

---

## Výpočet úspor oproti upstream projektům

OmniRoute dokumentuje úspory díky kompresi ze dvou zdrojů: benchmarků upstream projektů a
vlastní kombinace enginů OmniRoute.

| Zdroj   | Hodnota z upstream README použitá zde                                                                                             |
| ------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Caveman | o `~75%` méně výstupních tokenů, průměrná úspora výstupu v benchmarku `65%`, rozsah `22-87%` a nástroj pro kompresi vstupu `~46%` |
| RTK     | úspora výstupu příkazů `60-90%`; ukázková relace `~118,000 -> ~23,900` tokenů neboli úspora `79.7%` (`~80%`)                      |

U překrývajících se dat nástrojů a kontextu výchozí kombinace OmniRoute skládá enginy takto:

```txt
RTK -> Caveman
```

Kombinované úspory se násobí, nikoli sčítají:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Hodnota `78-95%` platí v případech, kdy RTK i Caveman mohou zmenšit stejná vstupní nebo kontextová data.
Režim výstupu odpovědi Caveman je samostatný: pokud je povolen, použijí se vlastní úspory výstupu nástroje Caveman (`65%`
v průměru, hlavní uváděná hodnota `~75%`, rozsah `22-87%`). Celkové úspory nákladů závisí na poměru promptů a výstupů.

### Co „způsobilý“ skutečně znamená

Uváděný rozsah 15-95% je reálný, ale platí pouze pro **redundantní nebo příliš podrobný** obsah — opakované
řádky chyb, protokol sestavení, který neustále vypisuje stejné varování, nebo nadměrně velký výpis z `grep` či čtení souboru. **Neznamená**
to, že každý požadavek dosáhne takové úspory.

Empiricky ověřeno (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): běh
`stacked` (RTK + Caveman) nad blokem `tool_result` ve formátu Anthropic obsahujícím 300 identických
řádků chyb dosáhl **úspory 95.93% tokenů / úspory 96.26% znaků** — přesně v uváděném
rozsahu. Stejný pipeline spuštěný nad běžným, neredundantním výstupem nástroje (čistým seznamem shod z `grep`,
krátkým čtením souboru nebo běžným konverzačním textem) však správně dosahuje **téměř nulových úspor**, protože
neobsahuje nic opakujícího se, co by bylo možné odstranit, a `validateCompression()` (`validation.ts`) odmítá odeslat
přepracovaný obsah, který by odstranil nebo změnil bloky kódu, URL, nadpisy, verze nebo identifikátory konstant psané VELKÝMI PÍSMENY.

Jde o očekávané a bezpečné chování, nikoli o chybu: programovací relace, která převážně čte a prohledává čisté soubory,
dosáhne i při plně povolené kompresi pouze mírných celkových úspor, zatímco relace, která narazí na chybovou
smyčku nebo příliš upovídaný linter, dosáhne u takového provozu plného rozsahu 78-95%. Nepovažujte nízké souhrnné
procento úspor jediné relace za důkaz, že je komprese nesprávně nakonfigurována — nejprve ověřte, zda byl
původní výstup nástroje skutečně redundantní.

---

## Vizualizace úspor tokenů

```
Bez komprese:       47K tokenů odeslaných do LLM
S Lite:             40K tokenů odeslaných          (úspora 15% — bezpečné, vždy zapnuté)
Se Standard:        33K tokenů odeslaných          (úspora 30% — pravidla caveman-speak)
S Aggressive:       24K tokenů odeslaných          (úspora 50% — stárnutí + sumarizace)
S Ultra:            12K tokenů odeslaných          (úspora 75% — heuristické prořezávání)
S RTK:              19K-5K tokenů odeslaných       (úspora 60-90% na výstupu příkazů/nástrojů)
Se Stacked:         10K-2.5K tokenů odeslaných     (způsobilý rozsah RTK+Caveman 78-95%)
```

---

## Konfigurace

### Ovládací panel

Přejděte do `Dashboard → Context & Cache`:

- **Caveman** — výběr režimu, jazykové balíčky, náhled a globální výchozí nastavení
- **RTK** — náhled filtru příkazů, bezpečnostní nastavení RTK a katalog filtrů
- **Compression Combos** — pojmenované řetězce enginů přiřazené směrovacím kombinacím
- **Auto-Trigger Threshold** — automaticky aktivuje kompresi, když počet tokenů překročí prahovou hodnotu

### Přepsání pro konkrétní kombinaci

V `Dashboard → Context & Cache → Compression Combos` přiřaďte kompresní kombinaci směrovací
kombinaci:

```txt
Kombinace: "free-tier-fallback"
  Kompresní kombinace: "coding-agent-stack"
  Řetězec: RTK -> Caveman
  Cíle:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

To vám umožní používat vrstvenou kompresi u bezplatných/programátorských poskytovatelů a současně zachovat odlehčený režim u placených
předplatných.

Toto přiřazení „Přepsání pro konkrétní kombinaci“ je jiný ovládací prvek než přepsání **režimu komprese směrovací
kombinace** (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — schéma tohoto pole
také přijímá hodnoty `rtk`, `stacked` a `omniglyph`) — toto přepsání nevybírá pojmenovaný řetězec
kompresní kombinace; pouze nastavuje pole `compressionMode`, které používá
`resolveCompressionPlan`. Lze je nastavit buď na kartě kombinace (`Dashboard → Combos`), nebo od verze
#6760 pro každou směrovací kombinaci v seznamu „Assign to routing“ na stránce
`Dashboard → Context & Cache → Compression Combos`, přímo vedle zaškrtávacího políčka pro přiřazení řetězce
popsaného výše. Obě rozhraní ukládají změny prostřednictvím stejného endpointu `PUT /api/combos/{id}`.

### Přepsání pro konkrétní požadavek

Odešlete hlavičku požadavku `x-omniroute-compression`, chcete-li přepsat plán komprese pro jeden
požadavek. Má nejvyšší prioritu — přebíjí přepsání směrovací kombinace, aktivní profil,
automatické spuštění i výchozí nastavení panelu. Neznámé hodnoty se ignorují (požadavek není nikdy odmítnut) a
globální hlavní přepínač stále řídí vše: když je komprese globálně vypnutá, hlavička ji nemůže
zapnout. Hodnoty:

| Hodnota       | Účinek                                                                                                    |
| ------------- | --------------------------------------------------------------------------------------------------------- |
| `off`         | Pro tento požadavek se nepoužije žádná komprese.                                                          |
| `default`     | Výchozí profil odvozený z panelu (ignoruje aktivní profil). Ztrátové enginy zůstanou vypnuté.             |
| `safe`        | Stejné jako vynechání hlavičky: pouze deduplikace a slučování bílých znaků.                               |
| `allow-lossy` | Zachová operátorský plán tohoto požadavku včetně souhrnů, filtrů relevance a přepisů stylu.               |
| `engine:<id>` | Jeden engine, pokud je povolen, např. `engine:rtk`. Jde o povolení daného enginu pro konkrétní požadavek. |
| `<combo>`     | Pojmenovaná kombinace, nejprve porovnávaná podle názvu (bez rozlišení velikosti písmen), poté podle ID.   |

Bez hodnoty `allow-lossy`, `engine:<id>` nebo pojmenované kombinace se ztrátové enginy nepoužijí.
Pokud je komprese zapnutá, požadavek stále využívá deduplikaci relace a slučování bílých znaků.

Použitý plán je vrácen v hlavičce odpovědi `X-OmniRoute-Compression: <mode>; source=<source>`,
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

# Náhled konkrétního datového obsahu RTK/stacked
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Výpis balíčků filtrů RTK
curl http://localhost:20128/api/context/rtk/filters

# Přímý test RTK s volitelnými metadaty příkazu
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Co je chráněno

Kompresní engine **vždy zachovává:**

- ✅ Bloky kódu (ohraničené i vložené)
- ✅ Adresy URL a cesty k souborům
- ✅ Struktury JSON a strukturovaná data
- ✅ Identifikátory a chráněné technické tokeny
- ✅ Matematické výrazy
- ✅ Definice volání nástrojů/funkcí
- ✅ Systémové prompty (v režimu lite)

Obnova nezpracovaného výstupu RTK před jakýmkoli uložením rediguje běžné klíče API, bearer tokeny, tokeny Slacku, přístupové klíče AWS,
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

## Plán fází

| Fáze    | Režimy                                                                                                                                                                | Stav      |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| Fáze 1  | Off, Lite                                                                                                                                                             | ✅ Vydáno |
| Fáze 2  | Standard, Aggressive, Ultra                                                                                                                                           | ✅ Vydáno |
| Fáze 3  | RTK, Stacked, kombinace komprese                                                                                                                                      | ✅ Vydáno |
| Fáze 4  | Styly výstupu, Ultra na úrovni SLM, evaluační nástroj                                                                                                                 | ✅ Vydáno |
| Fáze 4C | Adaptivní rozpočet kontextu („číselník“) — výpočetní engine + API (`contextBudget` v `PUT /api/settings/compression`) + ovládací prvky režimu/zásad na řídicím panelu | ✅ Vydáno |

---

## Poděkování

Pravidla komprese režimu Standard jsou inspirována projektem **[Caveman](https://github.com/JuliusBrussee/caveman)** od **[Juliuse Brusseeho](https://github.com/JuliusBrussee)** (⭐ 51K+) — virálním projektem „proč používat mnoho tokenů, když málo tokenů stačí“. Caveman uvádí o `~75%` méně výstupních tokenů, průměrnou úsporu výstupu v benchmarku `65%`, rozsah úspory výstupu `22-87%` a nástroj pro kompresi vstupu s úsporou `~46%`.

Režim RTK je inspirován projektem **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** od **[RTK AI](https://github.com/rtk-ai)** — vysoce výkonným projektem pro kompresi výstupu příkazů pro terminál, sestavení, testování, git a filtrování výstupu nástrojů. RTK uvádí úsporu `60-90%`, přičemž ukázková relace v jeho souboru README vykazuje úsporu `~80%`.

---

## Pokročilé systémy komprese

Kromě 7 výše popsaných režimů (zdroj podporuje také režimy `codex-responses` a
`omniglyph`, kterými se tato příručka nezabývá) se následující části věnují funkcím,
které fungují uvnitř těchto režimů nebo souběžně s nimi: Komprese výsledků nástrojů a progresivní stárnutí
jsou kroky 1 a 2 agresivního enginu (režim Aggressive a krok `aggressive` ve
skládané pipeline), skládaná pipeline určuje, jak se režim Stacked spouští, komprese
zohledňující mezipaměť snižuje úroveň `aggressive` a `ultra` na `standard` u poskytovatelů
s podporou ukládání do mezipaměti, když je komprese zapnutá, a výstupní režim Caveman a styly výstupu jsou volitelné instrukce systémového promptu,
které jsou ve výchozím nastavení vypnuté a místo komprese požadavku formují výstup modelu.

### Komprese zohledňující mezipaměť

Někteří poskytovatelé (například Anthropic s ukládáním promptů do mezipaměti) podporují **ukládání promptů do mezipaměti**,
což jim umožňuje ukládat části promptu do mezipaměti a snížit tak náklady a latenci. Když
je ukládání do mezipaměti povoleno, agresivní komprese může výkon ve skutečnosti **zhoršit**,
protože mění tokeny uložené v mezipaměti, čímž mezipaměť zneplatňuje.

Modul `cachingAware.ts` tento problém řeší **detekcí kontextu ukládání do mezipaměti** a
odpovídající **úpravou strategie komprese**.

#### Jak to funguje

1. **Detekce kontextu ukládání do mezipaměti** — Prohledá tělo požadavku a vyhledá značky `cache_control`
2. **Identifikace poskytovatelů s podporou mezipaměti** — Zkontroluje, zda cílový poskytovatel podporuje ukládání do mezipaměti
3. **Úprava strategie** — Sníží úroveň `aggressive`/`ultra` na `standard` u poskytovatelů s podporou mezipaměti
4. **Přeskočení systémového promptu** — Systémové prompty jsou obvykle uloženy v mezipaměti, proto je nekomprimuje

Pomocná funkce strategie také vrací příznak `deterministicOnly`, ale sestavovač plánu využívá
pouze strategii — žádná navazující komponenta tento příznak v současnosti nečte.

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
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Kdy použít

Komprese zohledňující mezipaměť je **vždy zapnutá** — není nutná žádná konfigurace. Aktivuje se pokaždé,
když je zapnutá komprese a cílový poskytovatel podporuje ukládání promptů do mezipaměti (Anthropic, OpenAI
atd.); explicitní značky `cache_control` nejsou vyžadovány — snížení úrovně spustí samotný poskytovatel
s podporou mezipaměti, zatímco samotné značky jej nikdy nespustí (detekce značek poskytuje telemetrii
mezipaměti, nikoli rozhodnutí o strategii).

### Progresivní stárnutí

Dlouhé konverzace hromadí mnoho zpráv, ale starší zprávy se stávají méně
relevantními. Modul `progressiveAging.ts` **degraduje zprávy podle vzdálenosti jednotlivých kol**
(vzdálenost se měří od konce konverzace). S dodávanými výchozími hodnotami
(`verbatim: 2, light: 2, moderate: 3`):

- **Poslední 2 tahy (vzdálenost ≤ 2)**: Zachovány doslovně
- **Vzdálenost 3**: Jeskynní komprese (odstranění výplňových slov)
- **Vzdálenost 4+**: Zprávy asistenta jsou shrnuty; zprávy uživatele jsou zkráceny na svůj první
  řádek, maximálně na 120 znaků; ostatní role zůstávají beze změny. Systémové prompty, již zestárlé
  zprávy a nejnovější zpráva uživatele jsou bez ohledu na vzdálenost vždy zachovány doslovně.
  Nic se zcela nezahazuje a pásmo `light`
  je s dodávanými výchozími nastaveními nedosažitelné (`light` se rovná `verbatim`).

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
  verbatim: 3, // poslední 3 tahy: doslovně
  light: 8, // vzdálenost <= 8: lehká komprese
  moderate: 20, // vzdálenost <= 20: jeskynní komprese
  fullSummary: 5, // vyžadováno typem, kód pro rozdělení do pásem tuto hodnotu nečte
  // vzdálenost > 20: shrnuto (asistent) / zachován první řádek (uživatel)
});

// saved = počet ušetřených tokenů
```

#### Kdy použít

Progresivní stárnutí je v režimu `aggressive` **vždy zapnuté** — jde o 2. krok
funkce `compressAggressive()`. Režim Ultra jej nespouští. Je
obzvlášť efektivní pro:

- Dlouhé programátorské relace
- Konverzace trvající několik dní
- Agentní pracovní postupy s mnoha voláními nástrojů

### Režim jeskynního výstupu

Režim jeskynního výstupu přidává **instrukce do systémového promptu**, které samotný model žádají
o stručný výstup — úroveň `lite` žádá stručné odpovědi zachovávající celé věty, `full`
jej žádá, aby „odpovídal stručně jako chytrý jeskynní člověk“, a `ultra` žádá telegrafický výstup;
instrukce pouze žádají, nemohou jej zaručit. Požadavky je obdrží prostřednictvím
`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`):
`open-sse/handlers/chatCore.ts` nejprve vyřeší výběr pomocí vrstvy zpětné kompatibility
(`resolveOutputStyleSelection()` v
`open-sse/services/compression/outputStyles/backCompat.ts`), která v případě, že je `outputStyles`
prázdné, mapuje povolený `cavemanOutputMode` na výstupní styl `terse-prose` s úrovní
`cavemanOutputMode.intensity` (viz Zpětná kompatibilita níže); neprázdný výběr `outputStyles`
se použije beze změny a `cavemanOutputMode.enabled` ani `intensity` pak nemají žádný
vliv, zatímco jeho přepínač `autoClarity` se uplatňuje i nadále. Soubor `outputMode.ts` obsahuje
texty instrukcí (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`), vynechání na základě obsahu a
pomocnou funkci pro umístění, kterou používá vkládání; jeho vlastní vkládací funkce `applyCavemanOutputMode()` nemá
žádného produkčního volajícího.

#### Jak to funguje

Tento režim nekomprimuje vstup. Přidává do systémového promptu blok instrukcí
(viz Jak funguje vkládání níže) a jakýkoli režim komprese vstupu vybraný pro požadavek
se poté stále spustí nad tělem, které již tento blok obsahuje. Před sdílenou
klauzulí o hranicích, kterou končí každá úroveň, zní anglická úroveň `full` takto:

> „Odpovídej stručně jako chytrý jeskynní člověk. Vynechávej členy (a/an/the), výplňová slova (just/really/basically/actually/simply), zdvořilostní fráze a opatrné formulace. Větné fragmenty jsou v pořádku. Používej krátká synonyma (big, ne extensive; fix, ne implement). Zachovej přesně veškerý technický obsah, kód, chyby, adresy URL a identifikátory.“

Funguje to obzvlášť dobře pro:

- Generování kódu (stručnější výstup = méně tokenů)
- Rychlé otázky a odpovědi (nejsou potřeba propracovaná vysvětlení)
- Dávkové zpracování (maximalizace propustnosti)

#### Kdy použít

Režim jeskynního výstupu je **volitelný**. Se zapnutou kompresí (`enabled: true`, hlavní přepínač
na stránce Compression Settings) jej zapněte pomocí `cavemanOutputMode.enabled`; `intensity`
vybírá `lite`, `full` nebo `ultra`:

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

Přepínač **Output Mode** (`outputMode`, úroveň v `outputModeIntensity`) kombinace komprese
nastavuje stejný přepínač pro požadavky, na které se tato kombinace vztahuje, a nástroj MCP
`omniroute_set_compression_engine` jej zapisuje prostřednictvím svého booleovského argumentu `outputMode`.
Neprázdný výběr `outputStyles` má před tímto přepínačem přednost. Na
řídicím panelu vloží povolení výstupního stylu **Terse prose** stejný blok (viz Výstupní
styly níže).

### Výstupní styly (katalog)

Výše uvedený režim jeskynního výstupu je **starší cesta pro jediný styl**. Fáze 4 jej zobecnila
na katalog kombinovatelných výstupních stylů: `OUTPUT_STYLE_CATALOG` v
`open-sse/services/compression/outputStyles/catalog.ts`. Každý styl je instrukce v systémovém promptu,
která samotný model žádá o úspornější výstup; styly lze povolit
společně a vkládají se v pořadí katalogu.

| Styl                          | `id`          | Co dělá                                                                                                                                                                                                                            | Jazyky instrukcí                              |
| ----------------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| Stručná próza                 | `terse-prose` | Odstraňuje výplňová slova, členy a změkčující výrazy; zachovává přesný technický obsah. Stejný text jako starší režim výstupu caveman (pouze odkazovaný, nikoli znovu uvedený).                                                    | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Méně kódu                     | `less-code`   | Stupnice YAGNI: nejmenší funkční změna, žádné nevyžádané abstrakce.                                                                                                                                                                | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Culík (líný seniorní vývojář) | `ponytail`    | „Nejlepší kód je ten, který nikdy nebyl napsán“: opětovné použití > přepsání, hlavní příčina > příznak, nejkratší funkční diff.                                                                                                    | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Mám ADHD (nejdřív akce)       | `i-have-adhd` | Nejdřív akce (příkaz/cesta/úryvek před prózou), očíslované kroky s jasným rozsahem, JEDEN konkrétní další krok, bez úvodu/shrnutí/závěrečných frází. Převzato z [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Stručná CJK (文言)            | `terse-cjk`   | Odpověď `full`/`ultra` v klasické čínštině (文言); `lite` pouze požaduje stručné odpovědi bez funkčních slov, zdvořilostních frází či příkras.                                                                                     | zh (omezeno podle locale, viz níže)           |

Každý styl se dodává ve třech úrovních intenzity — `lite`, `full`, `ultra` — a každá úroveň
končí sdílenou klauzulí omezení (`SHARED_BOUNDARIES` v `outputMode.ts`), která
zachovává přesné bloky kódu, cesty k souborům, příkazy, chyby a URL. Texty úrovní stylů
`terse-prose` a `terse-cjk` do tohoto seznamu přidávají identifikátory.

`terse-cjk` je na dvou místech omezen podle locale na `zh`. Stránka Nastavení komprese
zobrazuje jeho řádek pouze tehdy, když je jazyk uživatelského rozhraní řídicího panelu
čínština (`zh-CN` nebo `zh-TW`), a `applyOutputStyles()` jej vloží pouze tehdy, když je
vyhodnocený jazyk požadavku (viz Výběr jazyka níže) `zh`. Skrytí řádku nevymaže uložený
výběr `terse-cjk`: API nastavení přijímá libovolné id stylu a uložení jiných stylů na
stránce jej zachová. Při zpracování požadavku je kontrola jazyka v `applyOutputStyles()`
jediným omezením podle locale.

#### Jak vkládání funguje

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) porovná
výběr s katalogem (neznámá id a styly neodpovídající locale jsou vyřazeny, nikdy nejde
o chybu; výběr, ze kterého nezůstane žádný styl, ponechá tělo beze změny a je přeskočen
jako `no_styles`), zřetězí vybrané instrukce v pořadí katalogu,
připojí klauzuli omezení **jednou** (spolu s bezpečnostní klauzulí, `SAFETY_BOUNDARIES`
nebo jejím překladem, když je vybrán `less-code` nebo `ponytail`) a zahájí blok jedinou
značkou idempotence (`[OmniRoute Output Styles]`), takže opětovné použití nic neprovede.
Když pro vyhodnocený jazyk (viz Výběr jazyka níže) existuje překlad, vloží se namísto
angličtiny lokalizovaná instrukce.

U těla s neprázdným polem `messages` proběhne kontrola idempotence před
vynecháním podle obsahu: když se značka `[OmniRoute Output Styles]` již nachází v poli
`system` nejvyšší úrovně (řetězec nebo pole bloků obsahu) nebo v systémové zprávě
s řetězcovým obsahem, tělo zůstane beze změny jako `already_applied` a neprovede se
žádná kontrola klíčových slov. Jinak vynechání podle obsahu
(`shouldBypassCavemanOutputMode()` v
`open-sse/services/compression/outputMode.ts`) zkontroluje text posledních tří zpráv bez
ohledu na jejich roli a přeskočí styly pro celý tah, pokud tento text odpovídá klíčovým
slovům týkajícím se zabezpečení, nevratné akce či žádosti o upřesnění, nebo sekvenci
citlivé na pořadí: `first`, `then`, `after that`, `before`, `rollback` nebo
`backup`, po nichž do 240 znaků následuje `delete`, `drop`, `migrate`, `deploy` nebo
`release`. Vynechání se provádí, když je zapnutý přepínač **Auto-Clarity Bypass**
(`cavemanOutputMode.autoClarity`, ve výchozím nastavení zapnutý); vypnutím přepínače se
kontrola klíčových slov přeskočí.

Když vynechání tah propustí, `placeSystemInstruction()` (ve stejném souboru), který
nikdy nevytváří nový `messages[0]`, umístí blok do prvního nalezeného umístění
v následujícím pořadí:

1. Úvodní systémová zpráva s řetězcovým obsahem: blok se připojí za její text.
2. Pole `system` nejvyšší úrovně: blok se připojí za text řetězce nebo
   se přidá jako nový textový blok do pole bloků obsahu.
3. První pozdější systémová zpráva s řetězcovým obsahem: blok se připojí za její
   text.
4. Nic z výše uvedeného: blok se vloží do nové systémové zprávy na konci `messages`.

U těla bez pole `messages` (nebo s prázdným polem) se vynechání podle obsahu neprovádí
a pole `system` nejvyšší úrovně se nekontroluje. Blok se připojí za text řetězcového
pole `instructions`, pokud toto pole již neobsahuje značku
`[OmniRoute Output Styles]`; v takovém případě tělo zůstane beze změny jako
`already_applied`. Pokud tělo nemá řetězcové pole `instructions`, ale obsahuje `input`
(řetězec nebo pole), blok se stane hodnotou `instructions` a nahradí jakoukoli
neřetězcovou hodnotu, kterou toto pole obsahovalo. Tělo bez řetězcového pole
`instructions` i bez řetězcového či maticového `input` zůstane beze změny a je
přeskočeno jako `no_messages`.

#### Jak povolit

Na řídicím panelu: **Kontext komprese → Nastavení komprese**
(`/dashboard/context/settings`), sekce Styly výstupu: jeden řádek pro každý styl s přepínačem
zapnuto/vypnuto a voličem úrovně. Styly se vkládají, když je zapnutá samotná komprese (hlavní
přepínač stránky, `enabled`). Přepínač **Automatické obejití srozumitelnosti** je na stránce
**Caveman** (`/dashboard/context/caveman`) na její kartě **Režim výstupu**. Konfigurace
komprese programově uchovává výběr takto:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Zpětná kompatibilita: dokud je `outputStyles` prázdné, starší nastavení
`cavemanOutputMode.enabled` se mapuje na `terse-prose` s intenzitou
`cavemanOutputMode.intensity`. Blok pak začíná značkou `[OmniRoute Output Styles]`,
zatímco starší injektor `applyCavemanOutputMode()` zapisoval
`[OmniRoute Caveman Output Mode]`. Pod značkou text odpovídá staršímu vloženému textu
v jazycích en, pt-BR, es, de, fr, it, ru, id a vi; v ja a zh obsahuje před klauzulí
o hranicích jednu mezeru navíc. `terse-prose` je přeložen do pt-BR, es, de, fr, it, ru,
zh, ja, id a vi, takže požadavek, jehož výsledný jazyk je `hu`, obdrží anglický text,
zatímco starší injektor používal maďarský.

Výběr jazyka stylu výstupu (`resolveOutputStyleLanguage()` v
`outputStyles/apply.ts`): když je `languageConfig.enabled` zapnuté, `autoDetect` vezme
jako vzorek nejnovější uživatelskou zprávu v poli `messages` požadavku, která obsahuje
text (řetězcový obsah nebo `text` jejích částí obsahu), a spustí na ní detektor enginu
Caveman (`detectCompressionLanguage()`). Detektor vrátí `zh` pro text obsahující znaky
Han a žádnou kanu; jinak vrátí ten z jazyků `it`, `pt-BR`, `es`, `de`, `fr`, `ru`, `ja`,
`hu` a `id`, který má nejvíce shod s vodítky, a `en`, pokud se neshoduje nic — text,
který nedokáže klasifikovat, dostane angličtinu, nikdy `defaultLanguage`, a `vi` není
nikdy detekován, přestože styly obsahují text ve `vi`. Tělo API Responses uchovává své
repliky v `input`, z něhož se vzorek neodebírá, takže použije `defaultLanguage` a poté
angličtinu. Když žádná uživatelská zpráva v `messages` neobsahuje text nebo když je
`autoDetect` vypnuté, použije se `defaultLanguage` a poté angličtina. Když je
`languageConfig.enabled` vypnuté, jazykem je angličtina — ledaže se na požadavek vztahuje
kombinace komprese (kombinace přiřazená ke směrovací kombinaci požadavku nebo výchozí
kombinace komprese, na kterou chatCore přejde u vestavěného zřetězeného kanálu):
použití kombinace pro daný požadavek zapne `languageConfig.enabled` a nastaví
`defaultLanguage` z jazykových balíčků kombinace (uložená hodnota, pokud patří mezi
balíčky kombinace, jinak první balíček kombinace, který má výchozí hodnotu `en`), přičemž
uložené nastavení `autoDetect` (ve výchozím stavu zapnuté) se nadále použije. Vstupní
engine Caveman vybírá jazyk svého balíčku pravidel jinak — pro každou textovou část
zvlášť a při vypnuté automatické detekci s omezením podle `enabledPacks`.

Matice styl × jazyk je pevně daná testem
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: každý styl v katalogu musí
mít položku v `BASELINE_LANGUAGES` testu; styl, který není omezen podle lokalizace, musí
obsahovat překlad do pt-BR (styl `terse-cjk` omezený podle lokalizace je z tohoto pravidla
vyjmut), pokud není uveden v `KNOWN_ENGLISH_ONLY`, které smí obsahovat pouze styly bez
jakýchkoli překladů — uvedený styl, který má jakýkoli překlad, způsobí selhání testu;
a styl způsobí selhání testu, pokud přijde o jazyk uvedený v jeho položce
`BASELINE_LANGUAGES`. Postup přidání stylu najdete v dokumentu
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Komprese výsledků nástrojů

`compressToolResult()` v `open-sse/services/compression/toolResultCompressor.ts`
komprimuje text výsledku nástroje pomocí **5 strategií**. Zkouší je v tomto pořadí
a o výsledku rozhodne první povolená strategie, jejíž kontrola odpovídá obsahu:

1. **`fileContent`**: obsah o 3 nebo více řádcích, v němž alespoň jeden řádek po
   odhlédnutí od počátečního odsazení začíná na `import `, `export `, `function `, `class `,
   `const `, `let `, `var ` nebo `return ` (klíčové slovo následované mezerou), případně na
   `if`, `for` nebo `while` následované `(` či ` (`, zachová prvních 20 a posledních 5
   řádků a vynechanou prostřední část označí.
2. **`grepSearch`**: obsah s alespoň jedním řádkem ve tvaru `<path>:<digits>:`,
   kde text před první dvojtečkou neobsahuje žádné bílé znaky, zachová pouze tyto řádky,
   nejvýše 30, a za nimi uvede počet dalších shod a seznam odpovídajících souborů;
   všechny ostatní řádky jsou odstraněny. Ke spuštění strategie stačí jeden takový řádek,
   takže se započítá i řádek protokolu začínající časovým razítkem, například `12:30:45`.
3. **`shellOutput`**: výstup, který obsahuje sekvenci ANSI CSI (`ESC[` následované
   číslicemi nebo středníky a poté písmenem, jako u barevných kódů) nebo znak `$`
   následovaný kdekoli v textu bílým znakem, o tyto sekvence přijde (jiné řídicí
   sekvence, například `ESC[?25l` nebo sekvence OSC pro titulek okna, jsou zachovány)
   a zachová se jeho posledních 50 řádků, přičemž po sobě jdoucí opakované řádky jsou
   sloučeny. Protože tato kontrola probíhá před `json` a `errorMessage`, výstup JSON
   nebo chybový výstup obsahující takový znak `$` se při zapnutém `shellOutput` k těmto
   strategiím nikdy nedostane.
4. **`json`**: datová část JSON delší než 2 000 znaků, která začíná znakem `{` nebo `[`
   (po volitelných bílých znacích) a kterou lze analyzovat, je shrnuta: pole s více než
   7 položkami zachová prvních 5 a poslední 2 položky a jejich celkový počet, zatímco
   objekt zachová prvních 20 klíčů, přičemž každá hodnota vnořeného objektu nebo pole
   je nahrazena zástupným symbolem `{…N keys}` (u pole je N jeho délka) a značka
   `_remaining_<N>_keys` udává počet klíčů vynechaných za prvními 20. Skalární hodnoty
   jsou zkopírovány celé, takže objekt s nejvýše 20 klíči bez vnořených hodnot se pouze
   znovu odsadí — minimalizovanému objektu přibudou znaky a zůstane nezměněn.
5. **`errorMessage`**: výstup, který kdekoli a bez ohledu na velikost písmen obsahuje
   `error:`, `error ` (slovo následované mezerou, jako v `no error found`), `[error]`,
   `exception:`, `exception `, `[exception]` nebo `traceback`, zachová svůj první
   řádek, následujících 10 řádků a poslední 3 řádky, přičemž řádky mezi nimi nahradí
   značkou `… [N frames elided] …`. Značka se zobrazí pouze tehdy, když po prvním
   řádku následuje více než 13 řádků, takže chybový výstup o 14 nebo méně řádcích se
   nezkrátí (při 12 nebo 13 řádcích poslední 3 řádky opakují již zachované řádky).

Jakmile některá strategie najde shodu, pozdější strategie se již nezkoušejí, a to ani
v případě, že daná strategie nic neušetří. Pokud odpovídající strategie neušetří žádné
odhadované tokeny (délka ÷ 4, zaokrouhlená nahoru) — například soubor podobný kódu
s nejvýše 25 řádky nebo pole JSON delší než 2 000 znaků s nejvýše 7 položkami —
agresivní engine zachová původní výsledek nástroje: oba volající
(`compressAggressive()` a `compressAnthropicToolResultBlock()`) zachovají originál,
pokud je hodnota `saved` rovna 0 nebo nižší, zatímco samotná funkce
`compressToolResult()` přesto vrátí výstup dané strategie. Krok s výsledkem nástroje
není konečný: záložní sumarizátor enginu může stále zkrátit zprávu typu `tool` nebo
`function` delší než 8 192 znaků (`maxTokensPerMessage`, 2 048, krát 4).

#### Kdy použít

Komprese výsledků nástrojů je krokem 1 agresivního enginu (`compressAggressive()` v
`open-sse/services/compression/aggressive.ts`), takže se spouští v režimu Aggressive
a v kroku `aggressive` vrstveného kanálu. Komprimuje zprávy typu `tool` a `function`
ve formátu OpenAI a text uvnitř bloků Anthropic `tool_result`. Každá strategie má
vlastní přepínač v části `aggressive.toolStrategies`; všechny jsou ve výchozím
nastavení zapnuté. Na ovládacím panelu se přepínače nacházejí v zobrazení
**Advanced** stránky Caveman, když je komprese zapnutá a výchozím režimem je
Aggressive.

### Vrstvený kanál

Vrstvený režim spouští **více enginů postupně** — obvykle nejprve RTK
(úspora 60–90 % na výstupu nástrojů) a poté Caveman na zbývajícím textu
(úspora vstupu přibližně 46 %). Jejich složením vzniká **rozsah úspory 78–95 % pro
způsobilý obsah** (viz výše uvedená část Upstream Savings Math):
`1 - (1 - 0.60..0.90) × (1 - 0.46)` dává průměrně ≈89 %.

#### Jak to funguje

```
Vstup (1000 tokenů)
  → RTK (filtr zohledňující příkazy) → 200 tokenů
    → Caveman (odstranění výplně) → 108 tokenů
  → Výstup (108 tokenů, úspora ~89 %)
```

#### Kdy použít

Vrstvený režim použijte pro:

- Pracovní postupy intenzivně využívající nástroje (agentní programování, výzkum)
- Nákladově citlivé dávkové zpracování
- Situace, kdy potřebujete maximální úsporu tokenů

Vrstvené kanály se konfigurují prostřednictvím globálního nastavení komprese
`stackedPipeline` nebo prostřednictvím pojmenované kombinace komprese přiřazené ke
kombinaci směrování (viz výše Per-Combo Override) — nikoli prostřednictvím
automatické kombinace `modePack` (toto pole pouze mění váhy výběru modelu
automatické kombinace a `stacked` není platný název balíčku).

---

## Přepsání komprese pro jednotlivé kombinace

Globální režim komprese můžete přepsat **pro každou kombinaci zvlášť** a doladit tak chování
pro různé případy použití:

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

To je užitečné pro:

- **Kombinace pro programování**: Pro dlouhé relace použijte režim `aggressive`
- **Kombinace pro rychlé otázky a odpovědi**: Pro rychlé odpovědi použijte režim `lite`
- **Kombinace intenzivně využívající nástroje**: Pro maximální úsporu použijte režim `stacked`
- **Produkční kombinace**: U poskytovatelů s ukládáním do mezipaměti ponechte přepsání vypnuté — trvale aktivní
  úprava zohledňující mezipaměť automaticky sníží režim `aggressive`/`ultra` na `standard`
  (režim `cache-aware` nelze vybrat)

---

## Viz také

- [Konfigurace prostředí](../reference/ENVIRONMENT.md) — Proměnné prostředí pro kompresi
- [Průvodce architekturou](../architecture/ARCHITECTURE.md) — Vnitřní fungování kompresního kanálu
- [Uživatelská příručka](../guides/USER_GUIDE.md) — Začínáme s kompresí
- [Komprese RTK](./RTK_COMPRESSION.md) — Filtry RTK, model důvěryhodnosti, ověřovací brána a obnovení nezpracovaného výstupu
- [Kompresní moduly](./COMPRESSION_ENGINES.md) — Caveman, RTK, vrstvení, API, MCP a řídicí panel
- [Formát pravidel komprese](./COMPRESSION_RULES_FORMAT.md) — Formát balíčku pravidel JSON
- [Jazykové balíčky komprese](./COMPRESSION_LANGUAGE_PACKS.md) — Pravidla Caveman specifická pro jednotlivé jazyky
