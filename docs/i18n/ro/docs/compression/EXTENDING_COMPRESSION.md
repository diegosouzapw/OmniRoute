# Extending the Compression Pipeline (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/EXTENDING_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/EXTENDING_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/EXTENDING_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/EXTENDING_COMPRESSION.md)

---

> **Pe scurt**: motorul de compresie OmniRoute este **extensibil** — puteți înregistra motoare personalizate, distribui pachete lingvistice pentru limbi noi și compune fluxuri de procesare suprapuse. Acest ghid vă arată cum.

**Ghiduri conexe:**

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Prezentarea completă a fluxului de procesare
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Registrul de motoare și motoarele încorporate
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — Motorul RTK și filtrele personalizate
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Referință pentru formatul pachetelor de reguli

---

## Prezentare generală

Sistemul de compresie are **3 puncte de extensie**:

| Punct de extensie      | Caz de utilizare                                                                    | Dificultate |
| ---------------------- | ----------------------------------------------------------------------------------- | ----------- |
| **Motor personalizat** | Adăugarea unui algoritm de compresie complet nou (de ex., un rezumator specializat) | Avansată    |
| **Pachet lingvistic**  | Adăugarea suportului pentru o limbă naturală nouă (de ex., hindi, arabă)            | Medie       |
| **Flux suprapus**      | Compunerea motoarelor existente într-o ordine personalizată                         | Începător   |

```
┌─────────────────────────────────────────────────────────────┐
│                    Strategie de compresie                    │
│                                                              │
│   Mesaje de intrare ──▶ getEffectiveMode() ──▶ mod          │
│                                              │               │
│                      ┌───────────────────────┼──────────┐    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   "rtk"    "lite"   "standard" "stacked"    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   RTK       Lite     Caveman   engines[]   │
│                   motor     motor    motor     înlănțuite  │
│                      │         │         │         │    │    │
│                      └─────────┴─────────┴─────────┘    │    │
│                                      │                    │
│                                      ▼                    │
│                              Ieșire comprimată             │
└─────────────────────────────────────────────────────────────┘

Selectorul strategiei este BAZAT PE MOD: fiecare solicitare selectează UN SINGUR mod
(rtk / lite / standard / aggressive / ultra / stacked / off).
Doar modul "stacked" înlănțuie mai multe motoare în ordine.
Modul implicit de declanșare automată este "lite" (nu un lanț de priorități cu 3 niveluri).
```

---

## Scrierea unui motor de compresie personalizat

Interfața motorului (`open-sse/services/compression/engines/types.ts`) este contractul pe care trebuie să îl respecte fiecare motor. Aceasta are 5 metode obligatorii.

### Interfața `CompressionEngine`

```ts
interface CompressionEngine {
  id: string; // ID unic al motorului
  name: string; // Nume afișat
  description: string; // Descriere scurtă
  icon: string; // Pictogramă (emoji sau URL)
  targets: CompressionEngineTarget[]; // ["messages", "tool_results", "code_blocks"]
  stackable: boolean; // Poate fi utilizat într-un flux de procesare suprapus
  stackPriority: number; // Ordinea în fluxurile suprapuse (valoare mai mică = mai devreme)
  metadata: CompressionEngineMetadata;

  apply(body, options?): CompressionResult;
  compress(body, config?): CompressionResult;
  getConfigSchema(): EngineConfigField[];
  validateConfig(config): EngineValidationResult;
}
```

### Exemplu minimal: motor pentru spații albe

Cel mai simplu motor posibil — elimină spațiile albe suplimentare din mesaje.

````ts
import type { CompressionEngine } from "omniroute/compression/engines/types";
import { registerCompressionEngine } from "omniroute/compression/engines/registry";

function preserveCodeBlocks(text: string): string {
  // Împarte după marcatorii blocurilor de cod și păstrează spațiile albe din interiorul acestora
  const parts = text.split(/(```[\s\S]*?```)/);
  return parts
    .map((part) => {
      if (part.startsWith("```")) {
        return part; // Nu modifica blocurile de cod
      }
      return part.replace(/\n{3,}/g, "\n\n"); // Aplică doar textului explicativ
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
  stackPriority: 100, // Rulează DUPĂ caveman/rtk

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

    // Parcurge matricea de mesaje — gestionează atât conținutul șir de caractere, cât și pe cel multipart
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
      // Conținut multipart: parcurge părțile și comprimă numai părțile text
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
          return part; // păstrează image_url, tool_use etc.
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

// Înregistrează global
registerCompressionEngine(whitespaceEngine);
````

### Unde se plasează motoarele personalizate

```
~/.omniroute/compression/engines/my-engine.ts    # La nivel de utilizator
<project>/compression-engines/my-engine.ts        # La nivel de proiect (încărcat la pornire)
```

Sau încărcați-l programatic dintr-un plugin:

```ts
// În pluginul dvs.
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "@omniroute/open-sse/services/compression/engines/registry";
import { myEngine } from "./engines/my-engine";

export default definePlugin({
  name: "my-compression-plugin",
  // SDK-ul pluginului expune hook-urile onRequest / onResponse / onError. Înregistrați
  // motorul atunci când se încarcă modulul pluginului (sau la primul onRequest); anulați-i
  // înregistrarea prin propriul mecanism de desființare.
  onRequest: async (ctx) => {
    registerCompressionEngine(myEngine);
  },
});

// La desființare:
// unregisterCompressionEngine("my-engine");
```

### Testarea motorului dvs.

Înregistrați motorul într-un plugin sau într-o funcție de pornire. După înregistrare, motorul va fi disponibil
în selectorul de strategii prin intermediul identificatorului său `id`. Testați integrarea compunându-l într-un pipeline stivuit:

---

## Crearea pachetelor lingvistice

Compresia în stil Caveman folosește **pachete de reguli specifice limbii** pentru a gestiona cuvintele de umplutură, exprimările ezitante și tiparele prolixe din fiecare limbă naturală. OmniRoute este livrat cu **6 pachete lingvistice**: `en`, `es`, `fr`, `de`, `ja`, `pt-BR`.

### Structura pachetului

Un pachet lingvistic este un director de **fișiere JSON** aflat în `open-sse/services/compression/rules/<language>/`:

```
open-sse/services/compression/rules/
├── en/
│   ├── filler.json          # Formule de politețe, exprimări ezitante, politețe
│   ├── context.json         # Reguli pentru reducerea contextului
│   ├── dedup.json           # Reguli de deduplicare
│   ├── structural.json      # Punctuație, formatare
│   └── ultra.json           # Reguli de compresie agresivă
├── es/  (aceeași structură)
├── fr/  (aceeași structură)
├── de/  (aceeași structură)
├── ja/  (aceeași structură)
└── pt-BR/ (aceeași structură)
```

### Anatomia unei reguli

Fiecare regulă are această structură (din `open-sse/services/compression/ruleLoader.ts`):

```ts
interface FileRule {
  name: string; // Nume lizibil pentru oameni (kebab-case)
  pattern: string; // Tipar regex JavaScript
  replacement?: string; // Textul cu care se înlocuiește potrivirea
  replacementMap?: Record<string, string>; // SAU o mapare cheie→înlocuire
  flags?: string; // Fanioane regex (de obicei „gi”)
  context?: "all" | "user" | "system" | "assistant";
  category?: "filler" | "context" | "structural" | "dedup" | "terse" | "ultra";
  minIntensity?: "lite" | "full" | "ultra"; // Omite sub această intensitate
  description?: string; // Documentație
}
```

### Exemplu: adăugarea regulilor pentru cuvinte de umplutură în hindi

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
      "description": "Elimină formulele politicoase de deschidere precum „नमस्ते”"
    },
    {
      "name": "filler_actually",
      "pattern": "\\b(?:असल में|वास्तव में|दरअसल)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "lite",
      "description": "Elimină expresiile de umplutură echivalente cu „de fapt”"
    },
    {
      "name": "verbose_plea",
      "pattern": "\\b(?:कृपया|कृपया आप|अनुरोध है कि आप)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "full",
      "description": "Elimină echivalentul lui „vă rog” în hindi"
    }
  ]
}
```

### Validare

Pachetele de reguli sunt validate în raport cu `_schema.json` la încărcare. Un pachet cu o structură incorectă nu se va încărca și va înregistra o eroare:

```
RULE_LOADER: pachetul "hi/filler.json" nu a trecut validarea:
  - rules.0.pattern: Expresie regex nevalidă
  - rules.1.context: trebuie să fie una dintre [all, user, system, assistant]
```

Validarea rulează automat când este încărcat un pachet (în raport cu `_schema.json`); un
pachet nevalid este respins, iar eroarea de mai sus este înregistrată. Nu există un script
`npm run` separat pentru validarea pachetelor — încărcați pachetul (de exemplu, porniți serverul sau
executați fluxul de compresie) și urmăriți jurnalele.

### Încărcarea unui pachet lingvistic personalizat

```ts
import { loadRulePack } from "omniroute/compression/ruleLoader";

await loadRulePack("./my-custom-rules/hi/filler.json");
```

Sau plasați-l într-o locație recunoscută:

```
~/.omniroute/compression/rules/hi/filler.json  # La nivel de utilizator
<project>/.compression/rules/hi/filler.json   # La nivel de proiect
```

### Bune practici pentru pachetele lingvistice

1. **Începeți cu `filler`** — acestea sunt regulile cu cel mai mare impact
2. **Folosiți `minIntensity`** pentru a restricționa regulile agresive — protejează împotriva compresiei excesive
3. **Includeți cazuri de testare** — adăugați un vector `tests[]` în JSON pentru a verifica comportamentul
4. **Ordinea contează** — regulile anterioare se aplică primele; plasați mai întâi regulile cu impact ridicat
5. **Fiți conservatori cu `replacement`** — de obicei, șirul gol este alegerea corectă; nu introduceți niciodată conținut nou

### Strategia de traducere

Când localizați pachetele de reguli într-o limbă nouă:

1. **Traduceți numele regulilor** — acestea apar în rezultatul de depanare
2. **Adaptați tiparele regex** — traducerea directă eșuează adesea (limitele cuvintelor diferă)
3. **Testați folosind conversații reale** — pachetul trebuie să fie sigur pentru date de intrare reale
4. **Respectați convențiile culturale** — pachetele pentru japoneză, de exemplu, conțin mai multe formule onorifice de umplutură decât cele pentru engleză

---

## Pipeline-uri stivuite

Un **pipeline stivuit** rulează mai multe motoare în secvență, ieșirea fiecărui motor fiind transmisă următorului. Acesta este modul în care funcționează intern `mode: stacked`.

### Cum funcționează stivuirea

```
Intrare (10.000 de tokenuri)
        │
        ▼
   ┌──────────┐
   │  Motor   │  prioritate 10
   │  A       │  ──▶ ieșire: 6.000 de tokenuri (-40%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  Motor   │  prioritate 50
   │  B       │  ──▶ ieșire: 2.400 de tokenuri (-60%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  Motor   │  prioritate 100
   │  C       │  ──▶ ieșire: 1.200 de tokenuri (-80%)
   └────┬─────┘
        │
        ▼
Ieșire finală (1.200 de tokenuri, economii combinate de ~88%)
```

Când este selectat `mode: "stacked"`, motoarele se execută secvențial, în ordinea specificată în matricea `pipeline`.
Ieșirea motorului N devine intrarea motorului N+1.

### Moduri de comprimare

OmniRoute selectează **UN SINGUR mod pentru fiecare cerere**, pe baza configurației, a pragurilor de declanșare automată și a suprascrierilor combinațiilor.
Modurile disponibile sunt definite în `open-sse/services/compression/types.ts` (tipul `CompressionMode`):

| Mod          | Motoare               | Caz de utilizare                                                                                                                                                                                        |
| ------------ | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `off`        | Niciunul              | Dezactivează toate comprimările                                                                                                                                                                         |
| `rtk`        | Numai RTK             | Sesiuni cu multe ieșiri de comenzi (economii de peste 80%)                                                                                                                                              |
| `lite`       | Numai Lite            | Comprimare conservatoare (rapidă, sigură)                                                                                                                                                               |
| `standard`   | Caveman               | Comprimarea prozei cu pachete lingvistice                                                                                                                                                               |
| `aggressive` | Caveman + Aggressive  | Comprimare agresivă a prozei + trecere finală agresivă                                                                                                                                                  |
| `ultra`      | Ultra                 | Comprimare maximă (cu pierderi, ultimă soluție). Rutată opțional prin motorul SLM **LLMLingua-2** când este setat `ultra.modelPath` (revine la calea bazată pe reguli când modelul nu este disponibil). |
| `stacked`    | Pipeline personalizat | Compune motoarele în orice ordine (consultați mai jos)                                                                                                                                                  |

> Pe lângă motoarele modurilor de mai sus, registrul include și motoare specializate care pot fi stivuite —
> **CCR**, **headroom**, **ionizer** și **session-dedup** — documentate în
> [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md#additional-built-in-engines).

Selectarea modului este determinată de `getEffectiveMode()` în `open-sse/services/compression/strategySelector.ts`:

1. Dacă comprimarea este dezactivată: `"off"`
2. Dacă există o suprascriere pentru combinație: se utilizează suprascrierea
3. Dacă pragul de declanșare automată este depășit: se utilizează `autoTriggerMode` (implicit: `"lite"`)
4. În caz contrar: se utilizează `defaultMode`

### Pipeline-ul stivuit implicit

Când `mode: "stacked"` este configurat explicit, pipeline-ul implicit combină:

1. **RTK** — elimină zgomotul din ieșirea comenzilor (economii de ~80% pentru ieșirea terminalului)
2. **Caveman** — elimină cuvintele de umplutură și face proza mai concisă (~46% din textul rămas)
3. **Lite** — trecere finală pentru eliminarea spațiilor albe și a duplicatelor

Această combinație obține **economii de 78-95%** în sesiunile care utilizează intensiv instrumente.

### Configurarea pipeline-urilor stivuite

În configurația combinației:

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

Puteți omite motoare, puteți adăuga unele personalizate sau le puteți reordona.

### Transmiterea stării

Motoarele pot citi metadatele din contextul cererii (în `options`):

```ts
compress(body, config) {
  // Citește metadatele de la motoarele anterioare
  const original = options?.compressionComboId;  // "my-coding-combo"
  // ...
}
```

Metadatele sunt **doar în citire** — motoarele nu pot modifica contextul cererii, ci doar propria ieșire a corpului.

### Capcane privind ordinea de execuție

| Ordinea motoarelor                    | Efect                                                                                              |
| ------------------------------------- | -------------------------------------------------------------------------------------------------- |
| RTK → Caveman → Lite                  | **Recomandată** (elimină mai întâi zgomotul, apoi limbajul și, în final, spațiile albe)            |
| Lite → RTK → Caveman                  | Nerecomandată — Lite elimină spațiile albe din ieșirea brută, împiedicând potrivirea tiparelor RTK |
| Caveman → RTK                         | Nerecomandată — Caveman poate rescrie textul în moduri pe care RTK nu le recunoaște                |
| Orice ordine cu `tool_results` primul | Mai bună — ieșirea instrumentelor este conținutul cel mai zgomotos                                 |

### Când să NU stivuiți

Stivuirea nu este întotdeauna mai bună:

- **Mesaje simple** (fără ieșiri de la instrumente) — un singur Caveman sau Lite este suficient
- **Sensibilitate la costuri** — fiecare motor adaugă o latență de ~5-50 ms
- **Instrumente specifice** — de obicei, doar RTK este suficient pentru ieșirea shell-ului

### Construirea unui pipeline personalizat

Nu există niciun registru pentru pipeline-uri denumite. Un pipeline suprapus este doar o **matrice inline
de pași** transmisă către `applyStackedCompression()` (exportată din
`@omniroute/open-sse/services/compression/strategySelector`):

```ts
import { applyStackedCompression } from "@omniroute/open-sse/services/compression/strategySelector";

const result = applyStackedCompression(body, [
  { engine: "rtk", intensity: "aggressive" },
  { engine: "caveman", intensity: "full" },
]);
```

Când nu transmiteți un pipeline, valoarea implicită este `rtk(standard) → caveman(full)`.

Pentru a-l controla din configurație, setați `mode: "stacked"` și furnizați matricea de pași în
`stackedPipeline` (citită din `config.stackedPipeline`):

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

## Politica de sincronizare cu proiectele upstream

Motoarele de compresie OmniRoute menționează mai multe proiecte upstream în README
(„inspirat de RTK, Caveman, LLMLingua-2, Troglodita”). O întrebare frecventă din
partea contribuitorilor este: **atunci când RTK adaugă upstream un filtru nou pentru
un instrument sau Caveman adaugă un pachet de reguli, cum ajunge acesta în
OmniRoute?** Această secțiune oferă răspunsul oficial.

### Copii incluse în sursă vs. implementări independente

| Motor                        | Relația cu proiectul upstream                                                                                                               | Locație                                                             |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **RTK**                      | **Reimplementare independentă** (inspirată de proiect, nu o copie)                                                                          | `open-sse/services/compression/engines/rtk/`                        |
| **Caveman**                  | **Reimplementare independentă** (inspirată de proiect)                                                                                      | `open-sse/services/compression/engines/cavemanAdapter.ts`           |
| **Headroom**                 | În mare parte intern; doar codecul `gcf/` este **inclus efectiv în sursă** din `gcf-typescript` (MIT, marcat SPDX, exclusiv profil generic) | `open-sse/services/compression/engines/headroom/gcf/`               |
| **LLMLingua-2 / Troglodita** | Inspirate de proiecte (stau la baza motoarelor `llmlingua` + `session-dedup`)                                                               | `open-sse/services/compression/engines/llmlingua/`, `session-dedup` |

Aspect esențial: **RTK și Caveman sunt implementări TypeScript clean-room ale
_ideilor_ (reguli de filtrare, pachete de reguli), nu arbori de surse incluși în
proiect.** Nu există nicio copie upstream asupra căreia să se execute `git pull` —
tocmai de aceea README spune „inspirat de”, nu „inclus”.

### Cum sunt integrate îmbunătățirile upstream

Nu există **nicio urmărire automatizată a versiunilor upstream și nicio etichetă
`compression-sync`** — în mod intenționat. Deoarece motoarele sunt reimplementări,
un filtru RTK sau un pachet de reguli Caveman din upstream nu este integrat sub
formă de cod; acesta este **reexprimat ca o regulă/un filtru nou în formatul propriu
OmniRoute** (consultați
[COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md)) și este adăugat ad-hoc
printr-un PR obișnuit. Punctele de extensie de mai sus (motor personalizat, pachet
lingvistic, filtru RTK) reprezintă modalitățile aprobate de a contribui cu unul.

Exemple recente ale acestui flux exact:

- Filtre RTK pentru ieșirea compilărilor Gradle și `dotnet` (v3.8.42)
- Filtre RTK pentru kubectl / docker-build / composer / gh (#2824)
- Pachet lingvistic indonezian pentru Caveman (#3975), plus pachete pentru germană / franceză / japoneză / chineză

### Headroom (proxy pentru compresia intrărilor)

Headroom este **complet intern** — un instantaneu fixat al codecului `gcf`, inclus
în sursă, plus straturile proprii OmniRoute `smartcrusher` / `toon` / `tabular`.
Nu există niciun proiect upstream activ de urmărit în afara copiei incluse în
sursă; actualizările pentru `gcf` sunt preluate manual atunci când codecul se
modifică și sunt revalidate în raport cu poarta pentru bugetul de compresie
(`check:compression-budget`).

### Propunerea unei îmbunătățiri inspirate de upstream

1. **Nu includeți codul upstream în sursă** — reexprimați regula/filtrul upstream
   în formatul OmniRoute.
2. Adăugați-l prin punctul de extensie corespunzător de mai jos (pachet lingvistic,
   filtru RTK sau motor personalizat).
3. Menționați proiectul upstream în descrierea PR-ului (atribuire), fără a copia
   sursa acestuia care face obiectul unei licențe.
4. Includeți teste și confirmați că poarta `check:compression-budget` trece în
   continuare.

---

## Adăugarea unui stil de ieșire

Stilurile de ieșire (consultați [tabelul cu catalogul din ghid](./COMPRESSION_GUIDE.md#output-styles-catalog))
sunt echivalentul pentru răspuns al motoarelor de intrare: în loc să comprime ceea ce
trimiteți, acestea îi indică modelului să producă un rezultat mai puțin costisitor. Registrul este
`OUTPUT_STYLE_CATALOG` în `open-sse/services/compression/outputStyles/catalog.ts`, iar
**o singură intrare în catalog reprezintă întreaga funcționalitate**: injectorul, panoul de setări
din tabloul de bord, persistența și telemetria parcurg toate catalogul — nu există nicio altă listă de actualizat.

1. **Adăugați o intrare în `OUTPUT_STYLE_CATALOG`** cu `id`, `label`, `description` și cele
   trei `levels` în limba engleză (`lite`, `full`, `ultra`). Fiecare nivel trebuie să se încheie cu
   `${SHARED_BOUNDARIES}`, astfel încât codul, căile, comenzile, erorile și URL-urile să rămână neschimbate.
   Textul instrucțiunii trebuie să fie **static și determinist** pentru fiecare
   `(id, level, language)` — `${SHARED_BOUNDARIES}` este singura interpolare permisă.
2. **Traduceți-l.** Includeți cel puțin un bloc `pt-BR` sub `i18n`; `ponytail` și
   `i-have-adhd` (en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi) reprezintă structura de referință. Un stil
   intenționat disponibil într-o singură limbă setează în schimb `locale` (precum `terse-cjk` → `zh`) și este apoi
   oferit numai pentru limba respectivă.
3. **Actualizați verificarea matricei** — adăugați limbile stilului în `BASELINE_LANGUAGES` din
   `tests/unit/compression/output-styles-i18n-matrix.test.ts`. Verificarea respinge orice stil nou
   care nu este restricționat prin locale și nu are traducerile necesare, cu excepția cazului în care conține
   o intrare explicită `KNOWN_ENGLISH_ONLY` cu un tichet de urmărire.
4. **Adăugați un test specific stilului**, după modelul
   `tests/unit/compression/i-have-adhd-catalog.test.ts`: structura catalogului, clauza privind limitele
   pentru fiecare nivel și un reper care să confirme că fiecare traducere este scrisă în propria limbă,
   în loc să fie copiată din engleză.
5. **Atribuire**: dacă stilul este adaptat dintr-un proiect din amonte, menționați sursa într-un
   comentariu aferent intrării (de exemplu, `i-have-adhd` → ayghri/i-have-adhd, MIT) — se aplică
   aceeași regulă ca în secțiunea „Propunerea unei îmbunătățiri inspirate de un proiect din amonte” de mai sus.

Nu sunt necesare modificări ale interfeței, schemei sau telemetriei — aceste componente sunt generate din catalog.

---

## Bune practici

### Dezvoltarea motoarelor

1. **Implementați întotdeauna `validateConfig`** — motoarele fără validare provoacă erori nedetectate
2. **Setați o valoare realistă pentru `targetLatencyMs`** — este utilizată de selectorul de strategii pentru alegerea motoarelor
3. **Utilizați `getConfigSchema` pentru tabloul de bord** — nu ascundeți niciodată configurația de utilizatori
4. **Acceptați `stackable: true` dacă motorul este pur** — motoarele cu efecte secundare nu ar trebui suprapuse
5. **Scrieți teste inline** — motoarele ar trebui să poată fi verificate în mai puțin de 1s

### Dezvoltarea pachetelor lingvistice

1. **Începeți cu intensitatea `lite`** — regulile trebuie să fie sigure la cea mai redusă setare
2. **Utilizați `context` pentru a limita domeniul regulilor** — regulile doar pentru `user` nu pot afecta accidental prompturile de sistem
3. **Evitați capturarea cheilor JSON** — `\\bword\\b` poate produce potriviri în interiorul JSON, deteriorând datele structurate
4. **Testați cazurile-limită** — intrări goale, unicode, text RTL, emoji-uri
5. **Utilizați pachetele existente drept șabloane** — `en/filler.json` este exemplul cel mai bine dezvoltat

### Proiectarea pipeline-ului

1. **Efectuați profilarea înainte de optimizare** — măsurați mai întâi folosind `compression_stats`
2. **Preferați compoziția în locul reimplementării** — extindeți regulile Caveman înainte de a scrie un motor nou
3. **Documentați raționamentul ordinii** — explicați într-un comentariu de ce motorul A precedă motorul B
4. **Testați la toate cele 3 niveluri de intensitate** — `lite` este rapid, dar cu pierderi, iar `ultra` este lent, dar precis

---

## Referință: motoare încorporate

| ID motor             | Compozabil | stackPriority implicit | Ținte                                     |
| -------------------- | ---------- | ---------------------- | ----------------------------------------- |
| `lite`               | Da         | 5                      | mesaje, rezultate_instrument              |
| `rtk`                | Da         | 10                     | rezultate_instrument                      |
| `standard` (caveman) | Da         | 20                     | mesaje, rezultate_instrument, blocuri_cod |
| `aggressive`         | Da         | 30                     | mesaje                                    |
| `ultra`              | Da         | 40                     | mesaje, blocuri_cod                       |

### Consultați și

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Prezentare generală a fluxului de procesare
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Referință pentru registrul motoarelor
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Specificația formatului regulilor
- [COMPRESSION_LANGUAGE_PACKS.md](./COMPRESSION_LANGUAGE_PACKS.md) — Detalii despre pachetele lingvistice
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — Motorul RTK și filtrele personalizate
- Sursă: `open-sse/services/compression/` (117 fișiere, ~250 KB)
