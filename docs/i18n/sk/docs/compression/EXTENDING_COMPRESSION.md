# Extending the Compression Pipeline (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/EXTENDING_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/EXTENDING_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/EXTENDING_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/EXTENDING_COMPRESSION.md)

---

> **Stručne**: Kompresný mechanizmus OmniRoute je **rozšíriteľný** — môžete registrovať vlastné mechanizmy, distribuovať jazykové balíky pre nové jazyky a skladať viacstupňové reťazce spracovania. Táto príručka ukazuje, ako na to.

**Súvisiace príručky:**

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Úplný prehľad reťazca spracovania
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Register mechanizmov a vstavané mechanizmy
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — Mechanizmus RTK a vlastné filtre
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Referenčná príručka formátu balíkov pravidiel

---

## Prehľad

Kompresný systém má **3 body rozšírenia**:

| Bod rozšírenia          | Prípad použitia                                                                       | Náročnosť     |
| ----------------------- | ------------------------------------------------------------------------------------- | ------------- |
| **Vlastný mechanizmus** | Pridanie úplne nového kompresného algoritmu (napr. sumarizátora pre konkrétnu doménu) | Pokročilá     |
| **Jazykový balík**      | Pridanie podpory pre nový prirodzený jazyk (napr. hindčinu alebo arabčinu)            | Stredná       |
| **Reťazec mechanizmov** | Zloženie existujúcich mechanizmov vo vlastnom poradí                                  | Začiatočnícka |

```
┌─────────────────────────────────────────────────────────────┐
│                    Stratégia kompresie                       │
│                                                              │
│   Vstupné správy ──▶ getEffectiveMode() ──▶ režim           │
│                                              │               │
│                      ┌───────────────────────┼──────────┐    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   "rtk"    "lite"   "standard" "stacked"    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   RTK       Lite     Caveman   engines[]   │
│                   mechan.   mechan.  mechan.   zreťazené   │
│                      │         │         │         │    │    │
│                      └─────────┴─────────┴─────────┘    │    │
│                                      │                    │
│                                      ▼                    │
│                             Komprimovaný výstup            │
└─────────────────────────────────────────────────────────────┘

Výber stratégie je ZALOŽENÝ NA REŽIME: každá požiadavka vyberie JEDEN režim
(rtk / lite / standard / aggressive / ultra / stacked / off).
Iba režim "stacked" reťazí viacero mechanizmov za sebou.
Predvoleným režimom automatického spustenia je "lite" (nie trojúrovňový prioritný reťazec).
```

---

## Vytvorenie vlastného kompresného mechanizmu

Rozhranie mechanizmu (`open-sse/services/compression/engines/types.ts`) predstavuje zmluvu, ktorú musí spĺňať každý mechanizmus. Obsahuje 5 povinných metód.

### Rozhranie `CompressionEngine`

```ts
interface CompressionEngine {
  id: string; // Jedinečný identifikátor mechanizmu
  name: string; // Zobrazovaný názov
  description: string; // Krátky opis
  icon: string; // Ikona (emoji alebo URL)
  targets: CompressionEngineTarget[]; // ["messages", "tool_results", "code_blocks"]
  stackable: boolean; // Možno ho použiť v zreťazenom reťazci spracovania
  stackPriority: number; // Poradie v zreťazených reťazcoch spracovania (nižšie = skôr)
  metadata: CompressionEngineMetadata;

  apply(body, options?): CompressionResult;
  compress(body, config?): CompressionResult;
  getConfigSchema(): EngineConfigField[];
  validateConfig(config): EngineValidationResult;
}
```

### Minimálny príklad: Mechanizmus na spracovanie medzier

Najjednoduchší možný mechanizmus — odstráni zo správ nadbytočné medzery.

````ts
import type { CompressionEngine } from "omniroute/compression/engines/types";
import { registerCompressionEngine } from "omniroute/compression/engines/registry";

function preserveCodeBlocks(text: string): string {
  // Rozdeľte podľa značiek blokov kódu a zachovajte medzery v ich vnútri
  const parts = text.split(/(```[\s\S]*?```)/);
  return parts
    .map((part) => {
      if (part.startsWith("```")) {
        return part; // Neupravujte bloky kódu
      }
      return part.replace(/\n{3,}/g, "\n\n"); // Použite iba na bežný text
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
  stackPriority: 100, // Spustiť PO caveman/rtk

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

    // Prejdite pole správ — spracujte reťazcový aj viacdielny obsah
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
      // Viacdielny obsah: prejdite jednotlivé časti a komprimujte iba textové časti
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
          return part; // zachovajte image_url, tool_use atď.
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

// Zaregistrujte globálne
registerCompressionEngine(whitespaceEngine);
````

### Kam umiestniť vlastné mechanizmy

```
~/.omniroute/compression/engines/my-engine.ts    # Na úrovni používateľa
<project>/compression-engines/my-engine.ts        # Na úrovni projektu (načíta sa pri spustení)
```

Alebo ich načítajte programovo z pluginu:

```ts
// Vo vašom plugine
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "@omniroute/open-sse/services/compression/engines/registry";
import { myEngine } from "./engines/my-engine";

export default definePlugin({
  name: "my-compression-plugin",
  // SDK pluginu poskytuje háky onRequest / onResponse / onError. Zaregistrujte
  // mechanizmus pri načítaní modulu pluginu (alebo pri prvom onRequest); zrušte jeho
  // registráciu vo vlastnom procese ukončenia.
  onRequest: async (ctx) => {
    registerCompressionEngine(myEngine);
  },
});

// Pri ukončení:
// unregisterCompressionEngine("my-engine");
```

### Testovanie vášho mechanizmu

Zaregistrujte svoj mechanizmus v plugine alebo spúšťacej funkcii. Po registrácii bude mechanizmus dostupný
vo výbere stratégie prostredníctvom svojho `id`. Integráciu otestujte jeho použitím v reťazenom kanáli spracovania:

---

## Vytváranie jazykových balíkov

Kompresia v štýle Caveman používa **pravidlá špecifické pre jednotlivé jazyky**, ktoré spracúvajú výplňové výrazy, zmierňovanie tvrdení a rozvláčne formulácie v každom prirodzenom jazyku. OmniRoute sa dodáva so **6 jazykovými balíkmi**: `en`, `es`, `fr`, `de`, `ja`, `pt-BR`.

### Štruktúra balíka

Jazykový balík je adresár **súborov JSON** v umiestnení `open-sse/services/compression/rules/<language>/`:

```
open-sse/services/compression/rules/
├── en/
│   ├── filler.json          # Zdvorilostné frázy, zmierňovanie tvrdení, zdvorilosť
│   ├── context.json         # Pravidlá na redukciu kontextu
│   ├── dedup.json           # Pravidlá deduplikácie
│   ├── structural.json      # Interpunkcia, formátovanie
│   └── ultra.json           # Pravidlá agresívnej kompresie
├── es/  (rovnaká štruktúra)
├── fr/  (rovnaká štruktúra)
├── de/  (rovnaká štruktúra)
├── ja/  (rovnaká štruktúra)
└── pt-BR/ (rovnaká štruktúra)
```

### Anatómia pravidla

Každé pravidlo má nasledujúcu podobu (zo súboru `open-sse/services/compression/ruleLoader.ts`):

```ts
interface FileRule {
  name: string; // Názov zrozumiteľný pre človeka (kebab-case)
  pattern: string; // Vzor regulárneho výrazu JavaScriptu
  replacement?: string; // Čím nahradiť zhodu
  replacementMap?: Record<string, string>; // ALEBO mapa kľúč→náhrada
  flags?: string; // Príznaky regulárneho výrazu (zvyčajne "gi")
  context?: "all" | "user" | "system" | "assistant";
  category?: "filler" | "context" | "structural" | "dedup" | "terse" | "ultra";
  minIntensity?: "lite" | "full" | "ultra"; // Preskočiť pod touto intenzitou
  description?: string; // Dokumentácia
}
```

### Príklad: Pridanie hindských pravidiel pre výplňové výrazy

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
      "description": "Strip polite openers like 'नमस्ते'"
    },
    {
      "name": "filler_actually",
      "pattern": "\\b(?:असल में|वास्तव में|दरअसल)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "lite",
      "description": "Strip 'actually' fillers"
    },
    {
      "name": "verbose_plea",
      "pattern": "\\b(?:कृपया|कृपया आप|अनुरोध है कि आप)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "full",
      "description": "Strip 'please' in Hindi"
    }
  ]
}
```

### Overenie

Balíky pravidiel sa pri načítaní overujú podľa `_schema.json`. Balík s nesprávnou štruktúrou sa nenačíta a zaznamená sa chyba:

```
RULE_LOADER: pack "hi/filler.json" failed validation:
  - rules.0.pattern: Invalid regex
  - rules.1.context: must be one of [all, user, system, assistant]
```

Overenie sa spustí automaticky pri načítaní balíka (podľa `_schema.json`); neplatný balík sa odmietne a zaznamená sa vyššie uvedená chyba. Na overenie balíka neexistuje samostatný skript `npm run` — načítajte balík (napríklad spustením servera alebo použitím kompresnej cesty) a sledujte protokoly.

### Načítanie vlastného jazykového balíka

```ts
import { loadRulePack } from "omniroute/compression/ruleLoader";

await loadRulePack("./my-custom-rules/hi/filler.json");
```

Prípadne ho umiestnite do rozpoznávaného umiestnenia:

```
~/.omniroute/compression/rules/hi/filler.json  # Na úrovni používateľa
<project>/.compression/rules/hi/filler.json   # Na úrovni projektu
```

### Osvedčené postupy pre jazykové balíky

1. **Začnite s `filler`** — tieto pravidlá majú najväčší vplyv
2. **Používajte `minIntensity`** na obmedzenie agresívnych pravidiel — chráni to pred nadmernou kompresiou
3. **Zahrňte testovacie prípady** — pridajte do JSON pole `tests[]` na overenie správania
4. **Na poradí záleží** — skoršie pravidlá sa použijú ako prvé; pravidlá s veľkým vplyvom umiestnite na začiatok
5. **Pri `replacement` postupujte konzervatívne** — prázdny reťazec je zvyčajne správny; nikdy nevkladajte nový obsah

### Stratégia prekladu

Pri lokalizácii balíkov pravidiel do nového jazyka:

1. **Preložte názvy pravidiel** — zobrazujú sa v ladiacom výstupe
2. **Prispôsobte vzory regulárnych výrazov** — priamy preklad často nefunguje (hranice slov sa líšia)
3. **Testujte na skutočných konverzáciách** — balík by mal byť bezpečný pri použití so skutočnými vstupmi
4. **Zohľadnite kultúrne konvencie** — napríklad japonské balíky obsahujú viac zdvorilostných výplňových výrazov než anglické

---

## Zreťazené kanály

**Zreťazený kanál** spúšťa viacero enginov v poradí, pričom výstup každého enginu vstupuje do nasledujúceho. Takto interne funguje `mode: stacked`.

### Ako funguje zreťazenie

```
Vstup (10 000 tokenov)
        │
        ▼
   ┌──────────┐
   │  Engine  │  priorita 10
   │  A       │  ──▶ výstup: 6 000 tokenov (-40 %)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  Engine  │  priorita 50
   │  B       │  ──▶ výstup: 2 400 tokenov (-60 %)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  Engine  │  priorita 100
   │  C       │  ──▶ výstup: 1 200 tokenov (-80 %)
   └────┬─────┘
        │
        ▼
Konečný výstup (1 200 tokenov, kombinovaná úspora ~88 %)
```

Keď je vybraný režim `mode: "stacked"`, enginy sa vykonávajú postupne v poradí určenom v poli `pipeline`.
Výstup enginu N sa stáva vstupom enginu N+1.

### Režimy kompresie

OmniRoute vyberá **JEDEN režim pre každú požiadavku** na základe konfigurácie, prahových hodnôt automatického spustenia a prepísaní kombinácie.
Dostupné režimy sú definované v `open-sse/services/compression/types.ts` (typ `CompressionMode`):

| Režim        | Enginy               | Prípad použitia                                                                                                                                                                                                |
| ------------ | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `off`        | Žiadne               | Vypnutie všetkej kompresie                                                                                                                                                                                     |
| `rtk`        | Iba RTK              | Relácie s veľkým množstvom výstupov príkazov (úspora 80 % a viac)                                                                                                                                              |
| `lite`       | Iba Lite             | Konzervatívna kompresia (rýchla, bezpečná)                                                                                                                                                                     |
| `standard`   | Caveman              | Kompresia prózy pomocou jazykových balíkov                                                                                                                                                                     |
| `aggressive` | Caveman + Aggressive | Agresívna kompresia prózy + agresívny záverečný prechod                                                                                                                                                        |
| `ultra`      | Ultra                | Maximálna kompresia (stratová, posledná možnosť). Voliteľne smerovaná cez SLM engine **LLMLingua-2**, keď je nastavené `ultra.modelPath` (ak model nie je dostupný, použije sa postup založený na pravidlách). |
| `stacked`    | Vlastný kanál        | Kombinovanie enginov v ľubovoľnom poradí (pozri nižšie)                                                                                                                                                        |

> Okrem enginov režimov uvedených vyššie obsahuje register aj špecializované zreťaziteľné enginy —
> **CCR**, **headroom**, **ionizer** a **session-dedup** — zdokumentované v
> [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md#additional-built-in-engines).

Výber režimu určuje funkcia `getEffectiveMode()` v `open-sse/services/compression/strategySelector.ts`:

1. Ak je kompresia vypnutá: `"off"`
2. Ak existuje prepísanie kombinácie: použije sa toto prepísanie
3. Ak je prekročená prahová hodnota automatického spustenia: použije sa `autoTriggerMode` (predvolene: `"lite"`)
4. Inak: použije sa `defaultMode`

### Predvolený zreťazený kanál

Keď je explicitne nakonfigurovaný režim `mode: "stacked"`, predvolený kanál kombinuje:

1. **RTK** — odstráni šum z výstupu príkazov (~80 % úspora pri terminálovom výstupe)
2. **Caveman** — odstráni výplňové slová a skráti prózu (~46 % zo zostávajúceho textu)
3. **Lite** — záverečný prechod na úpravu medzier a odstránenie duplicít

Táto kombinácia dosahuje **úsporu 78 – 95 %** pri reláciách s intenzívnym používaním nástrojov.

### Konfigurácia zreťazených kanálov

V konfigurácii kombinácie:

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

Enginy môžete vynechať, pridať vlastné alebo zmeniť ich poradie.

### Odovzdávanie stavu

Enginy môžu čítať metadáta z kontextu požiadavky (v `options`):

```ts
compress(body, config) {
  // Čítanie metadát z predchádzajúcich enginov
  const original = options?.compressionComboId;  // "my-coding-combo"
  // ...
}
```

Metadáta sú **iba na čítanie** — enginy nemôžu meniť kontext požiadavky, iba výstup vlastného tela.

### Úskalia poradia vykonávania

| Poradie enginov                                | Účinok                                                                                      |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------- |
| RTK → Caveman → Lite                           | **Odporúčané** (najprv odstráni šum, potom jazykové prvky a nakoniec nadbytočné medzery)    |
| Lite → RTK → Caveman                           | Nevhodné — Lite odstráni medzery zo surového výstupu, čím znemožní RTK rozpoznávanie vzorov |
| Caveman → RTK                                  | Nevhodné — Caveman môže prepísať text spôsobmi, ktoré RTK nerozpozná                        |
| Ľubovoľné poradie s `tool_results` na začiatku | Lepšie — výstup nástrojov je obsahom s najväčším množstvom šumu                             |

### Kedy zreťazenie NEPOUŽÍVAŤ

Zreťazenie nie je vždy lepšie:

- **Jednoduché správy** (bez výstupu nástrojov) — postačuje samotný Caveman alebo Lite
- **Citlivosť na náklady** — každý engine pridáva latenciu približne 5 – 50 ms
- **Konkrétne nástroje** — samotný RTK je zvyčajne dostatočný pre výstup shellu

### Vytvorenie vlastného kanála

Neexistuje žiadny register pomenovaných pipeline. Vrstvená pipeline je jednoducho **inline pole
krokov** odovzdané funkcii `applyStackedCompression()` (exportovanej z
`@omniroute/open-sse/services/compression/strategySelector`):

```ts
import { applyStackedCompression } from "@omniroute/open-sse/services/compression/strategySelector";

const result = applyStackedCompression(body, [
  { engine: "rtk", intensity: "aggressive" },
  { engine: "caveman", intensity: "full" },
]);
```

Ak pipeline neodovzdáte, predvolene sa použije `rtk(standard) → caveman(full)`.

Ak ju chcete riadiť z konfigurácie, nastavte `mode: "stacked"` a zadajte pole krokov v
`stackedPipeline` (načítané z `config.stackedPipeline`):

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

## Zásady synchronizácie s upstreamom

Kompresné enginy OmniRoute uvádzajú v README niekoľko upstreamových projektov
(„inšpirované projektmi RTK, Caveman, LLMLingua-2, Troglodita“). Častá otázka
prispievateľov znie: **keď upstreamový projekt RTK pridá nový filter nástroja alebo Caveman pridá balík
pravidiel, ako sa to dostane do OmniRoute?** Táto časť predstavuje smerodajnú odpoveď.

### Vendorizované kópie vs. nezávislé implementácie

| Engine                       | Vzťah k upstreamu                                                                                                              | Umiestnenie                                                         |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------- |
| **RTK**                      | **Nezávislá reimplementácia** (inšpirovaná, nie kópia)                                                                         | `open-sse/services/compression/engines/rtk/`                        |
| **Caveman**                  | **Nezávislá reimplementácia** (inšpirovaná)                                                                                    | `open-sse/services/compression/engines/cavemanAdapter.ts`           |
| **Headroom**                 | Prevažne interný; iba kodek `gcf/` je **skutočne vendorizovaný** z `gcf-typescript` (MIT, označený SPDX, iba všeobecný profil) | `open-sse/services/compression/engines/headroom/gcf/`               |
| **LLMLingua-2 / Troglodita** | Inšpirované týmito projektmi (sú základom enginov `llmlingua` + `session-dedup`)                                               | `open-sse/services/compression/engines/llmlingua/`, `session-dedup` |

Kľúčový bod: **RTK a Caveman sú nezávislé TypeScript implementácie
_myšlienok_ (pravidiel filtrov, balíkov pravidiel), nie vendorizované zdrojové stromy.** Neexistuje
žiadna upstreamová kópia, z ktorej by sa dalo vykonať `git pull` — práve preto README uvádza
„inšpirované“ namiesto „pribalené“.

### Ako sa začleňujú upstreamové vylepšenia

Zámerne **neexistuje žiadne automatizované sledovanie upstreamových vydaní ani označenie
`compression-sync`**. Keďže enginy sú reimplementáciami, upstreamový filter RTK
alebo balík pravidiel Caveman sa nezačleňuje ako kód; namiesto toho je **nanovo vyjadrený ako nové
pravidlo/filter vo vlastnom formáte OmniRoute** (pozrite si
[COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md)) a príležitostne sa začlení prostredníctvom
bežného PR. Vyššie uvedené rozširujúce body (vlastný engine, jazykový balík, filter RTK)
predstavujú schválený spôsob, ako takýmto vylepšením prispieť.

Nedávne príklady presne tohto postupu:

- Filtre RTK pre výstup zostavení Gradle a `dotnet` (v3.8.42)
- Filtre RTK pre kubectl / docker-build / composer / gh (#2824)
- Indonézsky jazykový balík Caveman (#3975) spolu s nemeckými / francúzskymi / japonskými / čínskymi balíkmi

### Headroom (proxy na kompresiu vstupu)

Headroom je **úplne interný** — pripnutá vendorizovaná snímka kodeku `gcf` spolu s
vlastnými vrstvami OmniRoute `smartcrusher` / `toon` / `tabular`. Okrem vendorizovanej kópie
neexistuje žiadny aktívny upstream, ktorý by bolo potrebné sledovať; aktualizácie `gcf` sa obnovujú
manuálne pri zmene kodeku a opätovne sa overujú voči bráne rozpočtu kompresie
(`check:compression-budget`).

### Navrhnutie vylepšenia inšpirovaného upstreamom

1. **Nevendorizujte** — vyjadrite upstreamové pravidlo/filter nanovo vo formáte OmniRoute.
2. Pridajte ho prostredníctvom príslušného rozširujúceho bodu uvedeného nižšie (jazykový balík, filter RTK alebo
   vlastný engine).
3. V opise PR uveďte upstreamový projekt (pripísanie autorstva), nekopírujte však
   jeho zdrojový kód podliehajúci licencii.
4. Zahrňte testy a potvrďte, že brána `check:compression-budget` naďalej úspešne prechádza.

---

## Pridanie štýlu výstupu

Štýly výstupu (pozrite si [tabuľku katalógu v príručke](./COMPRESSION_GUIDE.md#output-styles-catalog))
sú náprotivkom vstupných enginov na strane odpovede: namiesto komprimovania toho, čo
odosielate, dávajú modelu pokyn vytvoriť úspornejší výstup. Register je
`OUTPUT_STYLE_CATALOG` v `open-sse/services/compression/outputStyles/catalog.ts` a
**jedna položka katalógu predstavuje celú funkciu**: injektor, panel nastavení na ovládacom paneli,
perzistencia aj telemetria prechádzajú katalóg — nie je potrebné aktualizovať žiadny ďalší zoznam.

1. **Pridajte jednu položku do `OUTPUT_STYLE_CATALOG`** s poľami `id`, `label`, `description` a
   tromi anglickými `levels` (`lite`, `full`, `ultra`). Každá úroveň musí končiť reťazcom
   `${SHARED_BOUNDARIES}`, aby kód, cesty, príkazy, chyby a adresy URL zostali nezmenené.
   Text pokynu musí byť **statický a deterministický** pre každú
   `(id, level, language)` — `${SHARED_BOUNDARIES}` je jediná povolená interpolácia.
2. **Preložte ho.** Zahrňte aspoň blok `pt-BR` pod `i18n`; referenčnú štruktúru predstavujú
   `ponytail` a `i-have-adhd` (en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi). Štýl zámerne
   určený iba pre jeden jazyk namiesto toho nastaví `locale` (ako `terse-cjk` → `zh`) a potom
   sa ponúka iba pre dané miestne nastavenie.
3. **Aktualizujte kontrolu matice** — pridajte jazyky štýlu do `BASELINE_LANGUAGES` v
   `tests/unit/compression/output-styles-i18n-matrix.test.ts`. Kontrola odmietne každý nový
   štýl, ktorý nie je obmedzený miestnym nastavením a nemá požadované preklady, pokiaľ
   neobsahuje explicitnú položku `KNOWN_ENGLISH_ONLY` s odkazom na sledovaný problém.
4. **Pridajte test pre konkrétny štýl** podľa vzoru
   `tests/unit/compression/i-have-adhd-catalog.test.ts`: štruktúra katalógu, klauzula
   o hraniciach pre každú úroveň a kontrolný text potvrdzujúci, že každý preklad je napísaný
   vo vlastnom jazyku a nie je skopírovaný z angličtiny.
5. **Uvedenie zdroja**: ak je štýl adaptovaný z externého projektu, uveďte ho v komentári
   k zdroju pri danej položke (napr. `i-have-adhd` → ayghri/i-have-adhd, MIT) — platí rovnaké
   pravidlo ako vyššie v časti „Navrhovanie vylepšenia inšpirovaného externým projektom“.

Nie je potrebná žiadna zmena používateľského rozhrania, schémy ani telemetrie — tieto časti sa vykresľujú z katalógu.

---

## Osvedčené postupy

### Vývoj enginov

1. **Vždy implementujte `validateConfig`** — enginy bez validácie spôsobujú tiché zlyhania
2. **Nastavte realistickú hodnotu `targetLatencyMs`** — používa ju selektor stratégie na výber enginov
3. **Pre ovládací panel používajte `getConfigSchema`** — nikdy neskrývajte konfiguráciu pred používateľmi
4. **Podporujte `stackable: true`, ak je váš engine čistý** — enginy s vedľajšími účinkami by sa nemali reťaziť
5. **Píšte vnorené testy** — enginy by malo byť možné overiť za menej ako 1 sekundu

### Vývoj jazykových balíkov

1. **Začnite s intenzitou `lite`** — vaše pravidlá by mali byť bezpečné pri najnižšom nastavení
2. **Na obmedzenie rozsahu pravidiel používajte `context`** — pravidlá len pre `user` nemôžu náhodne ovplyvniť systémové prompty
3. **Vyhnite sa zachytávaniu kľúčov JSON** — `\\bword\\b` môže nájsť zhodu vnútri JSON a poškodiť štruktúrované údaje
4. **Testujte hraničné prípady** — prázdny vstup, Unicode, text sprava doľava, emoji
5. **Používajte existujúce balíky ako šablóny** — `en/filler.json` je najrozvinutejší príklad

### Návrh pipeline

1. **Pred optimalizáciou profilujte** — najprv vykonajte meranie pomocou `compression_stats`
2. **Uprednostnite skladanie pred opätovnou implementáciou** — pred napísaním nového enginu rozšírte pravidlá Caveman
3. **Zdokumentujte odôvodnenie poradia** — v komentári vysvetlite, prečo je engine A pred enginom B
4. **Testujte pri všetkých 3 úrovniach intenzity** — `lite` je rýchla, ale stratová; `ultra` je pomalá, ale presná

---

## Referencia: Vstavané enginy

| ID enginu            | Stohovateľný | Predvolená stackPriority | Ciele                                  |
| -------------------- | ------------ | ------------------------ | -------------------------------------- |
| `lite`               | Áno          | 5                        | správy, výsledky nástrojov             |
| `rtk`                | Áno          | 10                       | výsledky nástrojov                     |
| `standard` (caveman) | Áno          | 20                       | správy, výsledky nástrojov, bloky kódu |
| `aggressive`         | Áno          | 30                       | správy                                 |
| `ultra`              | Áno          | 40                       | správy, bloky kódu                     |

### Pozri tiež

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Prehľad spracovateľského reťazca
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Referenčná dokumentácia registra enginov
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Špecifikácia formátu pravidiel
- [COMPRESSION_LANGUAGE_PACKS.md](./COMPRESSION_LANGUAGE_PACKS.md) — Podrobnosti o jazykových balíkoch
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — Engine RTK a vlastné filtre
- Zdroj: `open-sse/services/compression/` (117 súborov, ~250 KB)
