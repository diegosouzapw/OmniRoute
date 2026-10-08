# Extending the Compression Pipeline (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/EXTENDING_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇦 [bs](../../../bs/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/EXTENDING_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/EXTENDING_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/EXTENDING_COMPRESSION.md)

---

> **Röviden**: Az OmniRoute tömörítési motorja **bővíthető** — egyéni motorokat regisztrálhat, nyelvi csomagokat készíthet új nyelvekhez, és többlépcsős feldolgozási folyamatokat állíthat össze. Ez az útmutató bemutatja, hogyan.

**Kapcsolódó útmutatók:**

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — A teljes feldolgozási folyamat áttekintése
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Motorregiszter és beépített motorok
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK-motor és egyéni szűrők
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — A szabálycsomag-formátum referenciája

---

## Áttekintés

A tömörítési rendszer **3 bővítési ponttal** rendelkezik:

| Bővítési pont               | Felhasználási eset                                                                 | Nehézség |
| --------------------------- | ---------------------------------------------------------------------------------- | -------- |
| **Egyéni motor**            | Teljesen új tömörítési algoritmus hozzáadása (pl. szakterület-specifikus összegző) | Haladó   |
| **Nyelvi csomag**           | Új természetes nyelv támogatásának hozzáadása (pl. hindi, arab)                    | Közepes  |
| **Többlépcsős feldolgozás** | Meglévő motorok egyéni sorrendben történő összeállítása                            | Kezdő    |

```
┌─────────────────────────────────────────────────────────────┐
│                    Tömörítési stratégia                      │
│                                                              │
│   Bemeneti üzenetek ──▶ getEffectiveMode() ──▶ mód           │
│                                              │               │
│                      ┌───────────────────────┼──────────┐    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   "rtk"    "lite"   "standard" "stacked"    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   RTK       Lite     Caveman   engines[]   │
│                   motor     motor    motor     láncolva    │
│                      │         │         │         │    │    │
│                      └─────────┴─────────┴─────────┘    │    │
│                                      │                    │
│                                      ▼                    │
│                             Tömörített kimenet              │
└─────────────────────────────────────────────────────────────┘

A stratégiaválasztó MÓDALAPÚ: minden kérés EGY módot választ
(rtk / lite / standard / aggressive / ultra / stacked / off).
Csak a "stacked" mód láncol több motort egymás után.
Az automatikus aktiválás alapértelmezett módja a "lite" (nem egy 3 szintű prioritási lánc).
```

---

## Egyéni tömörítési motor készítése

A motor interfésze (`open-sse/services/compression/engines/types.ts`) az a szerződés, amelyet minden motornak teljesítenie kell. Öt kötelező metódust tartalmaz.

### A `CompressionEngine` interfész

```ts
interface CompressionEngine {
  id: string; // Egyedi motorazonosító
  name: string; // Megjelenítési név
  description: string; // Rövid leírás
  icon: string; // Ikon (emoji vagy URL)
  targets: CompressionEngineTarget[]; // ["messages", "tool_results", "code_blocks"]
  stackable: boolean; // Használható-e többlépcsős feldolgozási folyamatban
  stackPriority: number; // Sorrend a többlépcsős folyamatokban (kisebb = korábbi)
  metadata: CompressionEngineMetadata;

  apply(body, options?): CompressionResult;
  compress(body, config?): CompressionResult;
  getConfigSchema(): EngineConfigField[];
  validateConfig(config): EngineValidationResult;
}
```

### Minimális példa: szóközkezelő motor

A lehető legegyszerűbb motor — eltávolítja a felesleges szóközöket az üzenetekből.

````ts
import type { CompressionEngine } from "omniroute/compression/engines/types";
import { registerCompressionEngine } from "omniroute/compression/engines/registry";

function preserveCodeBlocks(text: string): string {
  // Felosztás a kódblokkjelölők mentén, a bennük lévő térközök megőrzésével
  const parts = text.split(/(```[\s\S]*?```)/);
  return parts
    .map((part) => {
      if (part.startsWith("```")) {
        return part; // Ne módosítsa a kódblokkokat
      }
      return part.replace(/\n{3,}/g, "\n\n"); // Csak a folyó szövegre alkalmazza
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
  stackPriority: 100, // Futtatás a caveman/rtk UTÁN

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

    // Az üzenettömb bejárása — a karakterlánc- és a többrészes tartalom kezelése
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
      // Többrészes tartalom: a részek bejárása, csak a szöveges részek tömörítése
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
          return part; // az image_url, tool_use stb. megőrzése
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

// Globális regisztráció
registerCompressionEngine(whitespaceEngine);
````

### Egyéni motorok elhelyezése

```
~/.omniroute/compression/engines/my-engine.ts    # Felhasználói szintű
<project>/compression-engines/my-engine.ts        # Projektszintű (indításkor töltődik be)
```

Vagy töltse be programozott módon egy bővítményből:

```ts
// A bővítményben
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "@omniroute/open-sse/services/compression/engines/registry";
import { myEngine } from "./engines/my-engine";

export default definePlugin({
  name: "my-compression-plugin",
  // A bővítmény SDK-ja onRequest / onResponse / onError horgokat tesz elérhetővé. Regisztrálja a
  // motort a bővítménymodul betöltésekor (vagy az első onRequest alkalmával); a regisztrációját
  // a saját leállítási folyamatában szüntesse meg.
  onRequest: async (ctx) => {
    registerCompressionEngine(myEngine);
  },
});

// Leállításkor:
// unregisterCompressionEngine("my-engine");
```

### A motor tesztelése

Regisztrálja a motort egy bővítményben vagy indítási függvényben. A regisztráció után a motor az `id` értékén keresztül lesz elérhető
a stratégiaválasztóban. Tesztelje az integrációt úgy, hogy egy rétegzett feldolgozási folyamatba illeszti:

---

## Nyelvi csomagok létrehozása

A Caveman-stílusú tömörítés **nyelvspecifikus szabálycsomagokat** használ az egyes természetes nyelvek töltelékszavainak, bizonytalankodó fordulatainak és terjengős mintáinak kezelésére. Az OmniRoute **6 nyelvi csomagot** tartalmaz: `en`, `es`, `fr`, `de`, `ja`, `pt-BR`.

### A csomag felépítése

Egy nyelvi csomag **JSON-fájlokból** álló könyvtár az `open-sse/services/compression/rules/<language>/` alatt:

```
open-sse/services/compression/rules/
├── en/
│   ├── filler.json          # Udvariassági fordulatok, bizonytalankodás, előzékenység
│   ├── context.json         # Kontextuscsökkentő szabályok
│   ├── dedup.json           # Duplikációeltávolítási szabályok
│   ├── structural.json      # Központozás, formázás
│   └── ultra.json           # Agresszív tömörítési szabályok
├── es/  (azonos struktúra)
├── fr/  (azonos struktúra)
├── de/  (azonos struktúra)
├── ja/  (azonos struktúra)
└── pt-BR/ (azonos struktúra)
```

### A szabályok felépítése

Minden szabály a következő struktúrával rendelkezik (az `open-sse/services/compression/ruleLoader.ts` alapján):

```ts
interface FileRule {
  name: string; // Ember által olvasható név (kebab-case)
  pattern: string; // JavaScript reguláris kifejezés mintája
  replacement?: string; // Mire cserélje az egyezést
  replacementMap?: Record<string, string>; // VAGY egy kulcs→helyettesítés leképezés
  flags?: string; // Reguláris kifejezés jelzői (jellemzően "gi")
  context?: "all" | "user" | "system" | "assistant";
  category?: "filler" | "context" | "structural" | "dedup" | "terse" | "ultra";
  minIntensity?: "lite" | "full" | "ultra"; // Ezen intenzitási szint alatt kihagyandó
  description?: string; // Dokumentáció
}
```

### Példa: hindi töltelékszó-szabályok hozzáadása

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

### Ellenőrzés

A szabálycsomagokat a rendszer betöltéskor ellenőrzi a `_schema.json` alapján. A hibás struktúrájú csomag betöltése sikertelen lesz, és a rendszer hibát naplóz:

```
RULE_LOADER: pack "hi/filler.json" failed validation:
  - rules.0.pattern: Invalid regex
  - rules.1.context: must be one of [all, user, system, assistant]
```

Az ellenőrzés automatikusan lefut a csomag betöltésekor (a `_schema.json` alapján); az
érvénytelen csomagot a rendszer elutasítja, és naplózza a fenti hibát. A csomagok ellenőrzéséhez
nincs külön `npm run` szkript — töltse be a csomagot (például indítsa el a kiszolgálót, vagy
futtassa le a tömörítési folyamatot), és figyelje a naplókat.

### Egyéni nyelvi csomag betöltése

```ts
import { loadRulePack } from "omniroute/compression/ruleLoader";

await loadRulePack("./my-custom-rules/hi/filler.json");
```

Vagy helyezze egy felismert helyre:

```
~/.omniroute/compression/rules/hi/filler.json  # Felhasználói szintű
<project>/.compression/rules/hi/filler.json   # Projektszintű
```

### Nyelvi csomagokra vonatkozó bevált gyakorlatok

1. **Kezdje a `filler` kategóriával** — ezek a legnagyobb hatású szabályok
2. **Használja a `minIntensity` értéket** az agresszív szabályok korlátozására — ez véd a túlzott tömörítéstől
3. **Mellékeljen teszteseteket** — a működés ellenőrzéséhez adjon hozzá egy `tests[]` tömböt a JSON-hoz
4. **A sorrend számít** — a korábbi szabályok lépnek először életbe; a nagy hatású szabályokat helyezze előre
5. **Óvatosan használja a `replacement` értéket** — általában az üres karakterlánc a megfelelő; soha ne vezessen be új tartalmat

### Fordítási stratégia

Amikor egy szabálycsomagot új nyelvre lokalizál:

1. **Fordítsa le a szabályok neveit** — ezek megjelennek a hibakeresési kimenetben
2. **Igazítsa a reguláris kifejezések mintáit a nyelvhez** — a közvetlen fordítás gyakran nem működik (a szóhatárok eltérnek)
3. **Tesztelje valós beszélgetésekkel** — a csomagnak tényleges bemeneteken is biztonságosan kell működnie
4. **Igazodjon a kulturális konvenciókhoz** — a japán csomagokban például több tiszteleti töltelékkifejezés található, mint az angol csomagokban

---

## Halmozott feldolgozási láncok

A **halmozott feldolgozási lánc** több motort futtat egymás után úgy, hogy minden motor kimenete a következő bemenetéül szolgál. Belsőleg így működik a `mode: stacked`.

### A halmozás működése

```
Bemenet (10 000 token)
        │
        ▼
   ┌──────────┐
   │  Motor   │  prioritás: 10
   │  A       │  ──▶ kimenet: 6 000 token (-40%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  Motor   │  prioritás: 50
   │  B       │  ──▶ kimenet: 2 400 token (-60%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  Motor   │  prioritás: 100
   │  C       │  ──▶ kimenet: 1 200 token (-80%)
   └────┬─────┘
        │
        ▼
Végső kimenet (1 200 token, összesen ~88%-os megtakarítás)
```

A `mode: "stacked"` kiválasztásakor a motorok egymás után, a `pipeline` tömbben megadott sorrendben hajtódnak végre.
Az N. motor kimenete az N+1. motor bemenetévé válik.

### Tömörítési módok

Az OmniRoute konfiguráció, automatikus aktiválási küszöbértékek és kombinációs felülbírálások alapján **kérésenként EGY módot** választ ki.
Az elérhető módok az `open-sse/services/compression/types.ts` fájlban vannak definiálva (`CompressionMode` típus):

| Mód          | Motorok                  | Felhasználási eset                                                                                                                                                                                                       |
| ------------ | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `off`        | Nincs                    | Minden tömörítés letiltása                                                                                                                                                                                               |
| `rtk`        | Csak RTK                 | Parancskimeneteket nagy mennyiségben tartalmazó munkamenetek (80%+ megtakarítás)                                                                                                                                         |
| `lite`       | Csak Lite                | Konzervatív tömörítés (gyors, biztonságos)                                                                                                                                                                               |
| `standard`   | Caveman                  | Prózatömörítés nyelvi csomagokkal                                                                                                                                                                                        |
| `aggressive` | Caveman + Aggressive     | Agresszív prózatömörítés + agresszív végső menet                                                                                                                                                                         |
| `ultra`      | Ultra                    | Maximális tömörítés (veszteséges, végső megoldás). Opcionálisan az **LLMLingua-2** SLM-motoron keresztül irányítható, ha az `ultra.modelPath` be van állítva (ha a modell nem érhető el, a szabályalapú útvonalra vált). |
| `stacked`    | Egyéni feldolgozási lánc | Motorok tetszőleges sorrendben történő összeállítása (lásd alább)                                                                                                                                                        |

> A fenti módok motorjain túl a beállításjegyzék speciális, halmozható motorokat is tartalmaz —
> **CCR**, **headroom**, **ionizer** és **session-dedup** —, amelyek dokumentációja itt található:
> [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md#additional-built-in-engines).

A módválasztást az `open-sse/services/compression/strategySelector.ts` fájlban található `getEffectiveMode()` határozza meg:

1. Ha a tömörítés le van tiltva: `"off"`
2. Ha létezik kombinációs felülbírálás: a felülbírálás használata
3. Ha az automatikus aktiválás küszöbértékét túllépi: az `autoTriggerMode` használata (alapértelmezés: `"lite"`)
4. Egyébként: a `defaultMode` használata

### Az alapértelmezett halmozott feldolgozási lánc

A `mode: "stacked"` kifejezett beállításakor az alapértelmezett feldolgozási lánc a következőket állítja össze:

1. **RTK** — eltávolítja a parancskimenetek zaját (~80%-os megtakarítás terminálkimeneteknél)
2. **Caveman** — eltávolítja a töltelékszavakat, tömörebbé teszi a prózát (~46% a fennmaradó szövegen)
3. **Lite** — végső térköz-eltávolítási és deduplikációs menet

Ez az összeállítás **78–95%-os megtakarítást** ér el eszközintenzív munkameneteknél.

### Halmozott feldolgozási láncok konfigurálása

A kombináció konfigurációjában:

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

A motorok kihagyhatók, egyéni motorok adhatók hozzá, illetve a sorrendjük is módosítható.

### Állapotátadás

A motorok metaadatokat olvashatnak a kérés kontextusából (az `options` objektumban):

```ts
compress(body, config) {
  // Metaadatok beolvasása a korábbi motoroktól
  const original = options?.compressionComboId;  // "my-coding-combo"
  // ...
}
```

A metaadatok **csak olvashatók** — a motorok nem módosíthatják a kérés kontextusát, csak a saját kimeneti törzsüket.

### Végrehajtási sorrenddel kapcsolatos buktatók

| Motorsorrend                               | Hatás                                                                                              |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------- |
| RTK → Caveman → Lite                       | **Ajánlott** (először a zajt, majd a nyelvi elemeket, végül a térközöket távolítja el)             |
| Lite → RTK → Caveman                       | Rossz — a Lite eltávolítja a térközöket a nyers kimenetből, ezért az RTK mintaillesztése meghiúsul |
| Caveman → RTK                              | Rossz — a Caveman úgy írhatja át a szöveget, hogy azt az RTK már nem ismeri fel                    |
| Bármilyen sorrend, elsőként `tool_results` | Jobb — az eszközkimenet a legzajosabb tartalom                                                     |

### Mikor NE alkalmazzon halmozást

A halmozás nem mindig jobb:

- **Egyszerű üzenetek** (nincs eszközkimenet) — egyetlen Caveman vagy Lite elegendő
- **Költségérzékeny esetek** — minden motor ~5–50 ms késleltetést ad hozzá
- **Speciális eszközök** — parancsértelmező-kimenetekhez általában önmagában az RTK is elegendő

### Egyéni feldolgozási lánc létrehozása

Nincs elnevezett pipeline-nyilvántartás. Az egymásra épülő pipeline egyszerűen a lépések **soron belül megadott tömbje**, amelyet az `applyStackedCompression()` függvénynek kell átadni (exportálva az `@omniroute/open-sse/services/compression/strategySelector` csomagból):

```ts
import { applyStackedCompression } from "@omniroute/open-sse/services/compression/strategySelector";

const result = applyStackedCompression(body, [
  { engine: "rtk", intensity: "aggressive" },
  { engine: "caveman", intensity: "full" },
]);
```

Ha nem ad meg pipeline-t, az alapértelmezett beállítás az `rtk(standard) → caveman(full)`.

A konfigurációból történő vezérléshez állítsa be a `mode: "stacked"` értéket, és adja meg a lépések tömbjét a `stackedPipeline` alatt (beolvasás innen: `config.stackedPipeline`):

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

## Upstream szinkronizálási szabályzat

Az OmniRoute tömörítési motorjai több upstream projektet is megjelölnek a README-ben inspirációs forrásként
(„inspired by RTK, Caveman, LLMLingua-2, Troglodita”). A közreműködők gyakori
kérdése: **amikor az upstream RTK új eszközszűrőt, vagy a Caveman új
szabálycsomagot ad hozzá, hogyan kerül az be az OmniRoute-ba?** Ez a szakasz adja a mérvadó választ.

### Beemelt másolatok és független implementációk

| Motor                        | Kapcsolat az upstream projekttel                                                                                                                                 | Hely                                                                |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **RTK**                      | **Független újraimplementálás** (ihlette, nem másolat)                                                                                                           | `open-sse/services/compression/engines/rtk/`                        |
| **Caveman**                  | **Független újraimplementálás** (ihlette)                                                                                                                        | `open-sse/services/compression/engines/cavemanAdapter.ts`           |
| **Headroom**                 | Többnyire belső fejlesztés; csak a `gcf/` kodek van **ténylegesen beemelve** a `gcf-typescript` projektből (MIT, SPDX-jelöléssel, kizárólag általános profillal) | `open-sse/services/compression/engines/headroom/gcf/`               |
| **LLMLingua-2 / Troglodita** | Inspirációs források (a `llmlingua` + `session-dedup` motorok alapjai)                                                                                           | `open-sse/services/compression/engines/llmlingua/`, `session-dedup` |

A lényeg: **az RTK és a Caveman az _ötletek_ (szűrési szabályok, szabálycsomagok)
független, tiszta szobás TypeScript-implementációi, nem beemelt forrásfák.** Nincs
olyan upstream másolat, amelyből `git pull` hajtható végre — pontosan ezért szerepel
a README-ben az „inspired by”, nem pedig a „bundled” megfogalmazás.

### Az upstream fejlesztések egyesítésének módja

Szándékosan **nincs automatizált upstream kiadáskövetés, és nincs
`compression-sync` címke sem**. Mivel a motorok újraimplementációk, egy upstream RTK-szűrő
vagy Caveman-szabálycsomag nem kódként kerül egyesítésre; ehelyett **új
szabályként/szűrőként fejezzük ki újra az OmniRoute saját formátumában** (lásd:
[COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md)), és eseti jelleggel,
normál PR-en keresztül kerül be. A fent említett bővítési pontok (egyéni motor,
nyelvi csomag, RTK-szűrő) biztosítják az ilyen hozzájárulások hivatalos módját.

Néhány közelmúltbeli példa pontosan erre a folyamatra:

- RTK-szűrők a Gradle és a `dotnet` buildkimenetéhez (v3.8.42)
- RTK-szűrők a kubectl / docker-build / composer / gh eszközökhöz (#2824)
- Caveman indonéz nyelvi csomag (#3975), valamint német / francia / japán / kínai csomagok

### Headroom (bemenettömörítő proxy)

A Headroom **teljes egészében belső fejlesztés** — egy rögzített, beemelt `gcf`
kodekpillanatkép, valamint az OmniRoute saját `smartcrusher` / `toon` / `tabular`
rétegei alkotják. A beemelt másolaton túl nincs követendő aktív upstream projekt;
a `gcf` frissítéseit manuálisan emeljük be a kodek változásakor, majd újból
ellenőrizzük őket a tömörítési keret ellenőrzési kapujával
(`check:compression-budget`).

### Upstream által inspirált fejlesztés javaslata

1. **Ne emeld be a forrást** — fejezd ki újra az upstream szabályt/szűrőt az OmniRoute formátumában.
2. Add hozzá az alábbi megfelelő bővítési ponton keresztül (nyelvi csomag, RTK-szűrő vagy
   egyéni motor).
3. A PR leírásában hivatkozz az upstream projektre (forrásmegjelölésként), ne pedig
   a licenccel védett forrásának lemásolásával.
4. Mellékelj teszteket, és ellenőrizd, hogy a `check:compression-budget` kapu továbbra is sikeresen teljesül.

---

## Kimeneti stílus hozzáadása

A kimeneti stílusok (lásd az [útmutató katalógustáblázatát](./COMPRESSION_GUIDE.md#output-styles-catalog))
a bemeneti motorok válaszoldali megfelelői: ahelyett, hogy az elküldött tartalmat
tömörítenék, arra utasítják a modellt, hogy gazdaságosabb kimenetet állítson elő. A nyilvántartás az
`OUTPUT_STYLE_CATALOG` az `open-sse/services/compression/outputStyles/catalog.ts` fájlban, és
**egyetlen katalógusbejegyzés jelenti a teljes funkciót**: az injektor, az irányítópult beállítási panelje,
a tartós tárolás és a telemetria egyaránt a katalógust járja be — nincs más frissítendő lista.

1. **Adjon hozzá egy bejegyzést az `OUTPUT_STYLE_CATALOG` katalógushoz** `id`, `label`, `description` mezőkkel és a
   három angol `levels` szinttel (`lite`, `full`, `ultra`). Minden szintnek
   `${SHARED_BOUNDARIES}` kifejezéssel kell végződnie, hogy a kód, az elérési utak, a parancsok, a hibák és az URL-ek szó szerint változatlanok maradjanak.
   Az utasítás szövegének **statikusnak és determinisztikusnak** kell lennie minden
   `(id, level, language)` kombináció esetén — kizárólag a `${SHARED_BOUNDARIES}` interpoláció engedélyezett.
2. **Fordítsa le.** Az `i18n` alatt legalább egy `pt-BR` blokkot biztosítson; a `ponytail` és az
   `i-have-adhd` (en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi) szolgál referenciaformaként. Egy szándékosan
   egynyelvű stílus ehelyett `locale` értéket állít be (mint a `terse-cjk` → `zh`), és ezután
   csak az adott területi beállításnál jelenik meg.
3. **Frissítse a mátrixellenőrzést** — adja hozzá a stílus nyelveit a `BASELINE_LANGUAGES` listához a
   `tests/unit/compression/output-styles-i18n-matrix.test.ts` fájlban. Az ellenőrzés elutasít minden új,
   területi beállítással nem korlátozott stílust, amely nem rendelkezik a szükséges fordításokkal, kivéve, ha
   tartalmaz egy explicit `KNOWN_ENGLISH_ONLY` bejegyzést egy nyomonkövetési feladattal.
4. **Adjon hozzá stílusonként egy tesztet** a
   `tests/unit/compression/i-have-adhd-catalog.test.ts` mintájára: a katalógus szerkezete, a határfeltétel
   minden szinthez, valamint egy olyan horgonyellenőrzés, amely igazolja, hogy minden fordítás a saját
   nyelvén készült, nem pedig az angol szöveg másolata.
5. **Forrásmegjelölés**: ha a stílus egy külső projekt alapján készült, tüntesse fel azt
   a bejegyzéshez tartozó forrásmegjegyzésben (például `i-have-adhd` → ayghri/i-have-adhd, MIT) — ugyanaz
   a szabály érvényes, mint a fenti „Külső projekt által inspirált fejlesztés javaslata” esetében.

Nincs szükség felhasználói felületi, séma- vagy telemetriai módosításra — ezek a felületek a katalógus alapján jelennek meg.

---

## Bevált gyakorlatok

### Motorfejlesztés

1. **Mindig valósítsa meg a `validateConfig` függvényt** — az ellenőrzés nélküli motorok észrevétlen hibákat okoznak
2. **Állítson be reális `targetLatencyMs` értéket** — a stratégiaválasztó ezt használja a motorok kiválasztásához
3. **Használja a `getConfigSchema` függvényt az irányítópulthoz** — soha ne rejtse el a konfigurációt a felhasználók elől
4. **Támogassa a `stackable: true` beállítást, ha a motor tiszta** — a mellékhatásokkal rendelkező motorokat nem szabad egymásra építeni
5. **Írjon beágyazott teszteket** — a motoroknak <1s alatt ellenőrizhetőknek kell lenniük

### Nyelvi csomagok fejlesztése

1. **Kezdje `lite` intenzitással** — a szabályoknak a legalacsonyabb beállítás mellett is biztonságosnak kell lenniük
2. **Használja a `context` mezőt a szabályok hatókörének meghatározásához** — a kizárólag `user` környezetre vonatkozó szabályok nem befolyásolhatják véletlenül a rendszerpromptokat
3. **Kerülje a JSON-kulcsok illesztését** — a `\\bword\\b` JSON-on belül is találhat egyezést, ami tönkreteheti a strukturált adatokat
4. **Teszteljen szélsőséges esetekkel** — üres bemenet, unicode, RTL-szöveg, emojik
5. **Használja a meglévő csomagokat sablonként** — az `en/filler.json` a legkidolgozottabb példa

### Folyamatlánc-tervezés

1. **Optimalizálás előtt készítsen profilt** — először a `compression_stats` segítségével mérjen
2. **Részesítse előnyben a kompozíciót az újbóli megvalósítással szemben** — új motor írása előtt bővítse a Caveman szabályait
3. **Dokumentálja a sorrend indoklását** — megjegyzésben magyarázza el, miért előzi meg az A motor a B motort
4. **Teszteljen mindhárom intenzitási szinten** — a `lite` gyors, de veszteséges, az `ultra` lassú, de pontos

---

## Referencia: Beépített motorok

| Motorazonosító       | Halmozható | Alapértelmezett stackPriority | Célok                               |
| -------------------- | ---------- | ----------------------------- | ----------------------------------- |
| `lite`               | Igen       | 5                             | messages, tool_results              |
| `rtk`                | Igen       | 10                            | tool_results                        |
| `standard` (caveman) | Igen       | 20                            | messages, tool_results, code_blocks |
| `aggressive`         | Igen       | 30                            | messages                            |
| `ultra`              | Igen       | 40                            | messages, code_blocks               |

### Lásd még

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — A feldolgozási folyamat áttekintése
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — A motorregiszter referenciája
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — A szabályformátum specifikációja
- [COMPRESSION_LANGUAGE_PACKS.md](./COMPRESSION_LANGUAGE_PACKS.md) — A nyelvi csomagok részletei
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK-motor és egyéni szűrők
- Forrás: `open-sse/services/compression/` (117 fájl, ~250 KB)
