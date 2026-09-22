# Extending the Compression Pipeline (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/EXTENDING_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/EXTENDING_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/EXTENDING_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/EXTENDING_COMPRESSION.md)

---

> **Stručně**: Kompresní modul OmniRoute je **rozšiřitelný** — můžete registrovat vlastní moduly, dodávat jazykové balíčky pro nové jazyky a skládat vícefázová zpracování. Tato příručka ukazuje, jak na to.

**Související příručky:**

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Úplný přehled zpracování
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Registr modulů a vestavěné moduly
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — Modul RTK a vlastní filtry
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Referenční příručka formátu balíčků pravidel

---

## Přehled

Kompresní systém má **3 body rozšíření**:

| Bod rozšíření           | Případ použití                                                             | Obtížnost    |
| ----------------------- | -------------------------------------------------------------------------- | ------------ |
| **Vlastní modul**       | Přidání zcela nového kompresního algoritmu (např. oborového sumarizátoru)  | Pokročilá    |
| **Jazykový balíček**    | Přidání podpory nového přirozeného jazyka (např. hindštiny nebo arabštiny) | Střední      |
| **Skládané zpracování** | Složení existujících modulů ve vlastním pořadí                             | Začátečnická |

```
┌─────────────────────────────────────────────────────────────┐
│                    Strategie komprese                        │
│                                                              │
│ Vstupní zprávy ──▶ getEffectiveMode() ──▶ režim             │
│                                              │               │
│                      ┌───────────────────────┼──────────┐    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   "rtk"    "lite"   "standard" "stacked"    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   RTK       Lite     Caveman   engines[]   │
│                   modul     modul    modul     zřetězené   │
│                      │         │         │         │    │    │
│                      └─────────┴─────────┴─────────┘    │    │
│                                      │                    │
│                                      ▼                    │
│                             Komprimovaný výstup            │
└─────────────────────────────────────────────────────────────┘

Výběr strategie je ZALOŽEN NA REŽIMU: každý požadavek vybere JEDEN režim
(rtk / lite / standard / aggressive / ultra / stacked / off).
Více modulů postupně řetězí pouze režim "stacked".
Výchozí režim automatického spuštění je "lite" (nikoli třístupňový řetězec priorit).
```

---

## Vytvoření vlastního kompresního modulu

Rozhraní modulu (`open-sse/services/compression/engines/types.ts`) představuje smlouvu, kterou musí splňovat každý modul. Obsahuje 5 povinných metod.

### Rozhraní `CompressionEngine`

```ts
interface CompressionEngine {
  id: string; // Jedinečný identifikátor modulu
  name: string; // Zobrazovaný název
  description: string; // Krátký popis
  icon: string; // Ikona (emoji nebo URL)
  targets: CompressionEngineTarget[]; // ["messages", "tool_results", "code_blocks"]
  stackable: boolean; // Lze použít ve skládaném zpracování
  stackPriority: number; // Pořadí ve skládaných zpracováních (nižší = dříve)
  metadata: CompressionEngineMetadata;

  apply(body, options?): CompressionResult;
  compress(body, config?): CompressionResult;
  getConfigSchema(): EngineConfigField[];
  validateConfig(config): EngineValidationResult;
}
```

### Minimální příklad: Modul pro bílé znaky

Nejjednodušší možný modul — odstraní ze zpráv nadbytečné bílé znaky.

````ts
import type { CompressionEngine } from "omniroute/compression/engines/types";
import { registerCompressionEngine } from "omniroute/compression/engines/registry";

function preserveCodeBlocks(text: string): string {
  // Rozdělit podle značek bloků kódu a zachovat mezery uvnitř nich
  const parts = text.split(/(```[\s\S]*?```)/);
  return parts
    .map((part) => {
      if (part.startsWith("```")) {
        return part; // Neupravovat bloky kódu
      }
      return part.replace(/\n{3,}/g, "\n\n"); // Použít pouze na běžný text
    })
    .join("");
}

const whitespaceEngine: CompressionEngine = {
  id: "whitespace",
  name: "Whitespace Stripper",
  description: "Removes extra whitespace and blank lines",
  icon: "📝",
  targets: ["messages", "tool_results"],
  stackable: true,
  stackPriority: 100, // Spustit PO caveman/rtk

  metadata: {
    id: "whitespace",
    name: "Whitespace Stripper",
    description: "Removes extra whitespace and blank lines",
    inputScope: "messages",
    targetLatencyMs: 5,
    supportsPreview: true,
    stable: true,
  },

  apply(body, options) {
    return this.compress(body, options?.config);
  },

  compress(body, config = {}) {
    let originalLength = 0;
    let compressedLength = 0;

    // Projít pole zpráv — zpracovat řetězcový i vícedílný obsah
    const compressedBody = (body.messages || []).map((msg) => {
      if (typeof msg.content === "string") {
        originalLength += msg.content.length;
        let compressed = msg.content
          .replace(/[ \t]+/g, " ")
          .replace(/\n{3,}/g, "\n\n")
          .replace(/^\s+|\s+$/gm, "");
        compressedLength += compressed.length;
        return { ...msg, content: compressed };
      }
      // Vícedílný obsah: projít jednotlivé části a komprimovat pouze textové části
      if (Array.isArray(msg.content)) {
        const newParts = msg.content.map((part) => {
          if (part.type === "text" && typeof part.text === "string") {
            originalLength += part.text.length;
            let compressed = part.text
              .replace(/[ \t]+/g, " ")
              .replace(/\n{3,}/g, "\n\n")
              .replace(/^\s+|\s+$/gm, "");
            compressedLength += compressed.length;
            return { ...part, text: compressed };
          }
          return part; // zachovat image_url, tool_use atd.
        });
        return { ...msg, content: newParts };
      }
      return msg;
    });

    return {
      body: { ...body, messages: compressedBody },
      stats: {
        originalTokens: Math.ceil(originalLength / 4),
        compressedTokens: Math.ceil(compressedLength / 4),
        savingsPercent: originalLength > 0 ? 100 * (1 - compressedLength / originalLength) : 0,
        techniques: ["whitespace-collapse"],
        engineId: "whitespace",
      },
    };
  },

  getConfigSchema() {
    return [
      {
        key: "preserveCodeBlocks",
        type: "boolean",
        label: "Preserve code blocks",
        defaultValue: true,
        description: "Don't touch whitespace inside ```code``` blocks",
      },
    ];
  },

  validateConfig(config) {
    if (config.preserveCodeBlocks !== undefined && typeof config.preserveCodeBlocks !== "boolean") {
      return { valid: false, errors: ["preserveCodeBlocks must be a boolean"] };
    }
    return { valid: true, errors: [] };
  },
};

// Zaregistrovat globálně
registerCompressionEngine(whitespaceEngine);
````

### Kam umístit vlastní enginy

```
~/.omniroute/compression/engines/my-engine.ts    # Uživatelská úroveň
<project>/compression-engines/my-engine.ts        # Úroveň projektu (načteno při spuštění)
```

Nebo je načtěte programově z pluginu:

```ts
// Ve vašem pluginu
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "@omniroute/open-sse/services/compression/engines/registry";
import { myEngine } from "./engines/my-engine";

export default definePlugin({
  name: "my-compression-plugin",
  // SDK pluginu poskytuje hooky onRequest / onResponse / onError. Zaregistrujte
  // engine při načtení modulu pluginu (nebo při prvním onRequest); odregistrujte jej
  // ve vlastní ukončovací rutině.
  onRequest: async (ctx) => {
    registerCompressionEngine(myEngine);
  },
});

// Při ukončení:
// unregisterCompressionEngine("my-engine");
```

### Testování vašeho enginu

Zaregistrujte svůj engine v pluginu nebo ve spouštěcí funkci. Po registraci bude engine dostupný
ve voliči strategie prostřednictvím svého `id`. Integraci otestujte jeho začleněním do skládané pipeline:

---

## Vytváření jazykových balíčků

Komprese ve stylu Caveman používá **pravidlové balíčky specifické pro jednotlivé jazyky**, které v každém přirozeném jazyce zpracovávají výplňová slova, zmírňující výrazy a rozvláčné formulace. OmniRoute se dodává se **6 jazykovými balíčky**: `en`, `es`, `fr`, `de`, `ja`, `pt-BR`.

### Struktura balíčku

Jazykový balíček je adresář **souborů JSON** v umístění `open-sse/services/compression/rules/<language>/`:

```
open-sse/services/compression/rules/
├── en/
│   ├── filler.json          # Zdvořilostní fráze, zmírňující výrazy, projevy slušnosti
│   ├── context.json         # Pravidla redukující kontext
│   ├── dedup.json           # Pravidla deduplikace
│   ├── structural.json      # Interpunkce, formátování
│   └── ultra.json           # Pravidla agresivní komprese
├── es/  (stejná struktura)
├── fr/  (stejná struktura)
├── de/  (stejná struktura)
├── ja/  (stejná struktura)
└── pt-BR/ (stejná struktura)
```

### Struktura pravidla

Každé pravidlo má následující podobu (z `open-sse/services/compression/ruleLoader.ts`):

```ts
interface FileRule {
  name: string; // Název srozumitelný pro člověka (kebab-case)
  pattern: string; // Vzor regulárního výrazu JavaScriptu
  replacement?: string; // Čím nahradit shodu
  replacementMap?: Record<string, string>; // NEBO mapa klíč→náhrada
  flags?: string; // Příznaky regulárního výrazu (obvykle „gi“)
  context?: "all" | "user" | "system" | "assistant";
  category?: "filler" | "context" | "structural" | "dedup" | "terse" | "ultra";
  minIntensity?: "lite" | "full" | "ultra"; // Přeskočit pod touto intenzitou
  description?: string; // Dokumentace
}
```

### Příklad: Přidání hindských pravidel pro výplňové výrazy

```json
{
  "language": "hi",
  "category": "filler",
  "rules": [
    {
      "name": "polite_opener",
      "pattern": "\\b(?:नमस्ते|नमस्कार|आदरणीय)\\b[,!\\s]*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "lite",
      "description": "Odstranit zdvořilostní úvodní výrazy, jako je „नमस्ते“"
    },
    {
      "name": "filler_actually",
      "pattern": "\\b(?:असल में|वास्तव में|दरअसल)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "lite",
      "description": "Odstranit výplňové výrazy ve významu „actually“"
    },
    {
      "name": "verbose_plea",
      "pattern": "\\b(?:कृपया|कृपया आप|अनुरोध है कि आप)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "full",
      "description": "Odstranit hindské výrazy ve významu „please“"
    }
  ]
}
```

### Ověření

Pravidlové balíčky jsou při načítání ověřovány podle `_schema.json`. Balíček s chybnou strukturou se nenačte a do protokolu se zapíše chyba:

```
RULE_LOADER: ověření balíčku „hi/filler.json“ selhalo:
  - rules.0.pattern: Neplatný regulární výraz
  - rules.1.context: musí být jedna z hodnot [all, user, system, assistant]
```

Ověření probíhá automaticky při načtení balíčku (podle `_schema.json`); neplatný
balíček je odmítnut a výše uvedená chyba je zapsána do protokolu. Pro ověřování
balíčků neexistuje samostatný skript `npm run` — načtěte balíček (např. spusťte
server nebo aktivujte cestu komprese) a sledujte protokoly.

### Načtení vlastního jazykového balíčku

```ts
import { loadRulePack } from "omniroute/compression/ruleLoader";

await loadRulePack("./my-custom-rules/hi/filler.json");
```

Nebo jej umístěte do rozpoznávaného umístění:

```
~/.omniroute/compression/rules/hi/filler.json  # Uživatelská úroveň
<project>/.compression/rules/hi/filler.json   # Úroveň projektu
```

### Doporučené postupy pro jazykové balíčky

1. **Začněte s `filler`** — tato pravidla mají největší dopad
2. **Pomocí `minIntensity`** omezte agresivní pravidla — chrání to před nadměrnou kompresí
3. **Zahrňte testovací případy** — přidejte do JSON pole `tests[]` pro ověření chování
4. **Na pořadí záleží** — dřívější pravidla se použijí jako první; pravidla s velkým dopadem umístěte na začátek
5. **U `replacement` postupujte konzervativně** — prázdný řetězec je obvykle správnou volbou; nikdy nevkládejte nový obsah

### Strategie překladu

Při lokalizaci pravidlových balíčků do nového jazyka:

1. **Přeložte názvy pravidel** — zobrazují se v ladicím výstupu
2. **Přizpůsobte vzory regulárních výrazů** — přímý překlad často nefunguje (hranice slov se liší)
3. **Testujte na skutečných konverzacích** — balíček by měl být bezpečný pro reálné vstupy
4. **Zohledněte kulturní zvyklosti** — například japonské balíčky obsahují více zdvořilostních výplňových výrazů než anglické

---

## Skládané pipeline

**Skládaná pipeline** spouští několik enginů postupně, přičemž výstup každého enginu slouží jako vstup pro následující. Takto interně funguje `mode: stacked`.

### Jak skládání funguje

```
Vstup (10 000 tokenů)
        │
        ▼
   ┌──────────┐
   │  Engine  │  priorita 10
   │  A       │  ──▶ výstup: 6 000 tokenů (-40 %)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  Engine  │  priorita 50
   │  B       │  ──▶ výstup: 2 400 tokenů (-60 %)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  Engine  │  priorita 100
   │  C       │  ──▶ výstup: 1 200 tokenů (-80 %)
   └────┬─────┘
        │
        ▼
Konečný výstup (1 200 tokenů, celková úspora ~88 %)
```

Když je vybrán režim `mode: "stacked"`, enginy se spouštějí postupně v pořadí uvedeném v poli `pipeline`.
Výstup enginu N se stává vstupem enginu N+1.

### Režimy komprese

OmniRoute vybírá pro každý požadavek **JEDEN režim** na základě konfigurace, prahových hodnot automatického spouštění a přepisů kombinací.
Dostupné režimy jsou definovány v `open-sse/services/compression/types.ts` (typ `CompressionMode`):

| Režim        | Enginy               | Případ použití                                                                                                                                                                                                           |
| ------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `off`        | Žádné                | Vypne veškerou kompresi                                                                                                                                                                                                  |
| `rtk`        | Pouze RTK            | Relace s velkým množstvím výstupů příkazů (úspora přes 80 %)                                                                                                                                                             |
| `lite`       | Pouze Lite           | Konzervativní komprese (rychlá, bezpečná)                                                                                                                                                                                |
| `standard`   | Caveman              | Komprese prózy pomocí jazykových balíčků                                                                                                                                                                                 |
| `aggressive` | Caveman + Aggressive | Agresivní komprese prózy + agresivní závěrečný průchod                                                                                                                                                                   |
| `ultra`      | Ultra                | Maximální komprese (ztrátová, poslední možnost). Volitelně směrována přes SLM engine **LLMLingua-2**, když je nastaveno `ultra.modelPath` (pokud model není dostupný, bezpečně přejde na cestu založenou na pravidlech). |
| `stacked`    | Vlastní pipeline     | Skládání enginů v libovolném pořadí (viz níže)                                                                                                                                                                           |

> Kromě výše uvedených enginů jednotlivých režimů obsahuje registr také specializované skládatelné enginy —
> **CCR**, **headroom**, **ionizer** a **session-dedup** — zdokumentované v
> [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md#additional-built-in-engines).

Výběr režimu určuje funkce `getEffectiveMode()` v `open-sse/services/compression/strategySelector.ts`:

1. Pokud je komprese vypnuta: `"off"`
2. Pokud existuje přepis kombinace: použije se tento přepis
3. Pokud je překročena prahová hodnota automatického spuštění: použije se `autoTriggerMode` (výchozí: `"lite"`)
4. Jinak: použije se `defaultMode`

### Výchozí skládaná pipeline

Když je explicitně nakonfigurováno `mode: "stacked"`, výchozí pipeline skládá:

1. **RTK** — odstraní šum z výstupů příkazů (úspora ~80 % u terminálového výstupu)
2. **Caveman** — odstraní výplňová slova a zestruční prózu (~46 % ze zbývajícího textu)
3. **Lite** — závěrečný průchod pro úpravu mezer a odstranění duplicit

Tato kombinace dosahuje **úspory 78–95 %** u relací s intenzivním používáním nástrojů.

### Konfigurace skládaných pipeline

V konfiguraci kombinace:

```json
{
  "compression": {
    "mode": "stacked",
    "pipeline": [
      { "engine": "rtk", "config": { "intensity": "aggressive" } },
      { "engine": "caveman", "config": { "intensity": "full" } },
      { "engine": "lite", "config": {} }
    ]
  }
}
```

Enginy můžete vynechat, přidat vlastní nebo změnit jejich pořadí.

### Předávání stavu

Enginy mohou číst metadata z kontextu požadavku (v `options`):

```ts
compress(body, config) {
  // Čtení metadat z předchozích enginů
  const original = options?.compressionComboId;  // "my-coding-combo"
  // ...
}
```

Metadata jsou **pouze pro čtení** — enginy nemohou měnit kontext požadavku, pouze svůj vlastní výstupní obsah.

### Úskalí pořadí spouštění

| Pořadí enginů                                | Účinek                                                                                   |
| -------------------------------------------- | ---------------------------------------------------------------------------------------- |
| RTK → Caveman → Lite                         | **Doporučeno** (nejprve odstraní šum, poté upraví jazyk a nakonec mezery)                |
| Lite → RTK → Caveman                         | Nevhodné — Lite odstraní mezery ze surového výstupu, takže porovnávání vzorů v RTK selže |
| Caveman → RTK                                | Nevhodné — Caveman může text přepsat způsobem, který RTK nerozpozná                      |
| Libovolné pořadí s `tool_results` na začátku | Lepší — výstup nástrojů obsahuje nejvíce šumu                                            |

### Kdy skládání NEPOUŽÍVAT

Skládání není vždy lepší:

- **Jednoduché zprávy** (bez výstupu nástrojů) — stačí samostatný Caveman nebo Lite
- **Citlivost na náklady** — každý engine přidává latenci ~5–50 ms
- **Specifické nástroje** — pro výstup shellu obvykle stačí samotný RTK

### Vytvoření vlastní pipeline

Neexistuje žádný registr pojmenovaných pipeline. Skládaná pipeline je pouze **inline pole
kroků** předané funkci `applyStackedCompression()` (exportované z
`@omniroute/open-sse/services/compression/strategySelector`):

```ts
import { applyStackedCompression } from "@omniroute/open-sse/services/compression/strategySelector";

const result = applyStackedCompression(body, [
  { engine: "rtk", intensity: "aggressive" },
  { engine: "caveman", intensity: "full" },
]);
```

Pokud pipeline nepředáte, ve výchozím nastavení se použije `rtk(standard) → caveman(full)`.

Chcete-li ji řídit pomocí konfigurace, nastavte `mode: "stacked"` a zadejte pole kroků pod
`stackedPipeline` (načítá se z `config.stackedPipeline`):

```json
{
  "compression": {
    "mode": "stacked",
    "stackedPipeline": [
      { "engine": "rtk", "intensity": "aggressive" },
      { "engine": "caveman", "intensity": "full" }
    ]
  }
}
```

---

## Zásady synchronizace s upstreamem

Kompresní enginy OmniRoute uvádějí v README několik upstreamových projektů
(„inspirováno projekty RTK, Caveman, LLMLingua-2, Troglodita“). Častou otázkou
přispěvatelů je: **když upstreamový projekt RTK přidá nový filtr nástrojů nebo
Caveman přidá balíček pravidel, jak se tato změna dostane do OmniRoute?** Tato
část představuje směrodatnou odpověď.

### Převzaté kopie vs. nezávislé implementace

| Engine                       | Vztah k upstreamu                                                                                                          | Umístění                                                            |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **RTK**                      | **Nezávislá reimplementace** (inspirovaná upstreamem, nikoli jeho kopie)                                                   | `open-sse/services/compression/engines/rtk/`                        |
| **Caveman**                  | **Nezávislá reimplementace** (inspirovaná upstreamem)                                                                      | `open-sse/services/compression/engines/cavemanAdapter.ts`           |
| **Headroom**                 | Převážně interní; pouze kodek `gcf/` je **skutečně převzatý** z `gcf-typescript` (MIT, označený SPDX, pouze obecný profil) | `open-sse/services/compression/engines/headroom/gcf/`               |
| **LLMLingua-2 / Troglodita** | Inspirováno upstreamem (tvoří základ enginů `llmlingua` + `session-dedup`)                                                 | `open-sse/services/compression/engines/llmlingua/`, `session-dedup` |

Klíčový bod: **RTK a Caveman jsou nezávislé implementace _myšlenek_ v TypeScriptu
(pravidel filtrů a balíčků pravidel), nikoli převzaté zdrojové stromy.** Neexistuje
žádná upstreamová kopie, ze které by bylo možné provést `git pull` — právě proto
README uvádí „inspirováno“, nikoli „součástí balíčku“.

### Jak se začleňují upstreamová vylepšení

**Neexistuje žádné automatické sledování upstreamových vydání ani štítek
`compression-sync`** — záměrně. Protože jsou enginy reimplementacemi, upstreamový
filtr RTK nebo balíček pravidel Caveman se nezačleňuje jako kód; je **nově vyjádřen
jako pravidlo či filtr ve vlastním formátu OmniRoute** (viz
[COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md)) a je příležitostně
začleněn prostřednictvím běžného PR. Výše uvedené body rozšíření (vlastní engine,
jazykový balíček, filtr RTK) představují schválený způsob, jak takové vylepšení
přidat.

Nedávné příklady přesně tohoto postupu:

- Filtry RTK pro výstup sestavení Gradle a `dotnet` (v3.8.42)
- Filtry RTK pro kubectl / docker-build / composer / gh (#2824)
- Indonéský jazykový balíček Caveman (#3975) spolu s německým / francouzským / japonským / čínským balíčkem

### Headroom (proxy pro kompresi vstupu)

Headroom je **zcela interní** — připnutý snapshot převzatého kodeku `gcf` spolu
s vlastními vrstvami `smartcrusher` / `toon` / `tabular` projektu OmniRoute.
Kromě převzaté kopie neexistuje žádný aktivní upstream, který by bylo potřeba
sledovat; aktualizace `gcf` se při změně kodeku obnovují ručně a znovu ověřují
pomocí kontroly limitu komprese (`check:compression-budget`).

### Návrh vylepšení inspirovaného upstreamem

1. **Nevkládejte převzatý kód** — vyjádřete upstreamové pravidlo či filtr ve
   formátu OmniRoute.
2. Přidejte jej prostřednictvím odpovídajícího bodu rozšíření níže (jazykový
   balíček, filtr RTK nebo vlastní engine).
3. V popisu PR uveďte odkaz na upstreamový projekt (jako uvedení zdroje), místo
   abyste kopírovali jeho zdrojový kód podléhající licenci.
4. Přidejte testy a ověřte, že kontrola `check:compression-budget` stále
   prochází.

---

## Přidání stylu výstupu

Styly výstupu (viz [tabulka katalogu v průvodci](./COMPRESSION_GUIDE.md#output-styles-catalog))
jsou protějškem vstupních enginů na straně odpovědi: namísto komprese toho, co
odesíláte, instruují model, aby vytvářel úspornější výstup. Registr se nachází v
`OUTPUT_STYLE_CATALOG` v souboru `open-sse/services/compression/outputStyles/catalog.ts` a
**jedna položka katalogu představuje celou funkcionalitu**: injektor, panel nastavení řídicího panelu,
perzistence i telemetrie procházejí katalog — není třeba aktualizovat žádný další seznam.

1. **Přidejte jednu položku do `OUTPUT_STYLE_CATALOG`** s poli `id`, `label`, `description` a
   třemi anglickými `levels` (`lite`, `full`, `ultra`). Každá úroveň musí končit řetězcem
   `${SHARED_BOUNDARIES}`, aby kód, cesty, příkazy, chyby a URL zůstaly beze změny.
   Text instrukce musí být pro každou kombinaci **statický a deterministický**
   `(id, level, language)` — `${SHARED_BOUNDARIES}` je jediná povolená interpolace.
2. **Přeložte ji.** V rámci `i18n` dodejte alespoň blok `pt-BR`; referenční strukturu představují
   `ponytail` a `i-have-adhd` (en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi). Styl záměrně
   určený pro jediný jazyk místo toho nastavuje `locale` (například `terse-cjk` → `zh`) a poté
   se nabízí pouze pro toto národní prostředí.
3. **Aktualizujte kontrolu matice** — přidejte jazyky stylu do `BASELINE_LANGUAGES` v
   `tests/unit/compression/output-styles-i18n-matrix.test.ts`. Kontrola odmítne každý nový
   styl neomezený na konkrétní národní prostředí, který nemá požadované překlady, pokud
   neobsahuje explicitní položku `KNOWN_ENGLISH_ONLY` s odkazem na sledovací issue.
4. **Přidejte test pro daný styl** podle vzoru
   `tests/unit/compression/i-have-adhd-catalog.test.ts`: strukturu katalogu, klauzuli
   o hranicích pro každou úroveň a kontrolní text potvrzující, že každý překlad je napsán
   ve vlastním jazyce a není zkopírován z angličtiny.
5. **Uvedení zdroje**: pokud je styl adaptován z externího projektu, uveďte jej ve zdrojovém
   komentáři u dané položky (např. `i-have-adhd` → ayghri/i-have-adhd, MIT) — platí
   stejné pravidlo jako výše v části „Navržení vylepšení inspirovaného externím projektem“.

Není nutná žádná změna uživatelského rozhraní, schématu ani telemetrie — tyto části se vykreslují z katalogu.

---

## Osvědčené postupy

### Vývoj enginů

1. **Vždy implementujte `validateConfig`** — enginy bez validace způsobují tichá selhání
2. **Nastavte realistickou hodnotu `targetLatencyMs`** — selektor strategií ji používá k výběru enginů
3. **Pro řídicí panel používejte `getConfigSchema`** — konfiguraci před uživateli nikdy neskrývejte
4. **Pokud je váš engine čistý, podporujte `stackable: true`** — enginy s vedlejšími účinky by se neměly řetězit
5. **Pište vložené testy** — enginy by mělo být možné ověřit za méně než 1 s

### Vývoj jazykových balíčků

1. **Začněte s intenzitou `lite`** — vaše pravidla by měla být bezpečná při nejnižším nastavení
2. **K omezení rozsahu pravidel používejte `context`** — pravidla pouze pro `user` nemohou nechtěně ovlivnit systémové prompty
3. **Vyhněte se zachycování klíčů JSON** — `\\bword\\b` může najít shodu uvnitř JSON a poškodit strukturovaná data
4. **Testujte hraniční případy** — prázdný vstup, Unicode, text psaný zprava doleva, emoji
5. **Používejte existující balíčky jako šablony** — `en/filler.json` je nejpropracovanější příklad

### Návrh pipeline

1. **Před optimalizací profilujte** — nejprve měřte pomocí `compression_stats`
2. **Upřednostněte skládání před opětovnou implementací** — před vytvořením nového enginu rozšiřte pravidla Caveman
3. **Zdokumentujte důvod pořadí** — v komentáři vysvětlete, proč je engine A před enginem B
4. **Testujte na všech 3 úrovních intenzity** — `lite` je rychlá, ale ztrátová, `ultra` je pomalá, ale přesná

---

## Referenční přehled: Vestavěné enginy

| ID enginu            | Stohovatelný | Výchozí stackPriority | Cíle                                  |
| -------------------- | ------------ | --------------------- | ------------------------------------- |
| `lite`               | Ano          | 5                     | zprávy, výsledky nástrojů             |
| `rtk`                | Ano          | 10                    | výsledky nástrojů                     |
| `standard` (caveman) | Ano          | 20                    | zprávy, výsledky nástrojů, bloky kódu |
| `aggressive`         | Ano          | 30                    | zprávy                                |
| `ultra`              | Ano          | 40                    | zprávy, bloky kódu                    |

### Viz také

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Přehled pipeline
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Referenční dokumentace registru enginů
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Specifikace formátu pravidel
- [COMPRESSION_LANGUAGE_PACKS.md](./COMPRESSION_LANGUAGE_PACKS.md) — Podrobnosti o jazykových balíčcích
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — Engine RTK a vlastní filtry
- Zdroj: `open-sse/services/compression/` (117 souborů, ~250 KB)
