# Extending the Compression Pipeline (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/EXTENDING_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇦 [bs](../../../bs/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/EXTENDING_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/EXTENDING_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/EXTENDING_COMPRESSION.md)

---

> **TL;DR**: il motore di compressione di OmniRoute è **estendibile** — puoi registrare motori personalizzati, distribuire pacchetti linguistici per nuove lingue e comporre pipeline concatenate. Questa guida mostra come fare.

**Guide correlate:**

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Panoramica completa della pipeline
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Registro dei motori e motori integrati
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — Motore RTK e filtri personalizzati
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Riferimento sul formato dei pacchetti di regole

---

## Panoramica

Il sistema di compressione dispone di **3 punti di estensione**:

| Punto di estensione       | Caso d'uso                                                                                                      | Difficoltà |
| ------------------------- | --------------------------------------------------------------------------------------------------------------- | ---------- |
| **Motore personalizzato** | Aggiungere un algoritmo di compressione completamente nuovo (ad es., un riepilogatore specifico per un dominio) | Avanzata   |
| **Pacchetto linguistico** | Aggiungere il supporto per una nuova lingua naturale (ad es., hindi, arabo)                                     | Media      |
| **Pipeline concatenata**  | Comporre i motori esistenti in un ordine personalizzato                                                         | Facile     |

```
┌─────────────────────────────────────────────────────────────┐
│                 Strategia di compressione                    │
│                                                              │
│ Messaggi di input ──▶ getEffectiveMode() ──▶ modalità       │
│                                              │               │
│                      ┌───────────────────────┼──────────┐    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   "rtk"    "lite"   "standard" "stacked"    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   RTK       Lite     Caveman   engines[]   │
│                   motore    motore   motore    concatenati │
│                      │         │         │         │    │    │
│                      └─────────┴─────────┴─────────┘    │    │
│                                      │                    │
│                                      ▼                    │
│                              Output compresso              │
└─────────────────────────────────────────────────────────────┘

Il selettore della strategia è BASATO SULLA MODALITÀ: ogni richiesta
seleziona UNA modalità
(rtk / lite / standard / aggressive / ultra / stacked / off).
Solo la modalità "stacked" concatena più motori in sequenza.
La modalità predefinita di attivazione automatica è "lite"
(non una catena di priorità a 3 livelli).
```

---

## Scrivere un motore di compressione personalizzato

L'interfaccia del motore (`open-sse/services/compression/engines/types.ts`) è il contratto che ogni motore deve rispettare. Include 5 metodi obbligatori.

### L'interfaccia `CompressionEngine`

```ts
interface CompressionEngine {
  id: string; // ID univoco del motore
  name: string; // Nome visualizzato
  description: string; // Breve descrizione
  icon: string; // Icona (emoji o URL)
  targets: CompressionEngineTarget[]; // ["messages", "tool_results", "code_blocks"]
  stackable: boolean; // Indica se può essere utilizzato in una pipeline concatenata
  stackPriority: number; // Ordine nelle pipeline concatenate (valore inferiore = esecuzione anticipata)
  metadata: CompressionEngineMetadata;

  apply(body, options?): CompressionResult;
  compress(body, config?): CompressionResult;
  getConfigSchema(): EngineConfigField[];
  validateConfig(config): EngineValidationResult;
}
```

### Esempio minimo: motore per gli spazi vuoti

Il motore più semplice possibile: rimuove gli spazi vuoti in eccesso dai messaggi.

````ts
import type { CompressionEngine } from "omniroute/compression/engines/types";
import { registerCompressionEngine } from "omniroute/compression/engines/registry";

function preserveCodeBlocks(text: string): string {
  // Suddivide in base ai delimitatori dei blocchi di codice e conserva gli spazi al loro interno
  const parts = text.split(/(```[\s\S]*?```)/);
  return parts
    .map((part) => {
      if (part.startsWith("```")) {
        return part; // Non modificare i blocchi di codice
      }
      return part.replace(/\n{3,}/g, "\n\n"); // Applica solo al testo
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
  stackPriority: 100, // Esegui DOPO caveman/rtk

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

    // Attraversa l'array dei messaggi: gestisce sia il contenuto stringa sia quello multipart
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
      // Contenuto multipart: attraversa le parti e comprime solo quelle testuali
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
          return part; // conserva image_url, tool_use, ecc.
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

// Registra globalmente
registerCompressionEngine(whitespaceEngine);
````

### Dove posizionare i motori personalizzati

```
~/.omniroute/compression/engines/my-engine.ts    # A livello utente
<project>/compression-engines/my-engine.ts        # A livello di progetto (caricato all'avvio)
```

Oppure caricali a livello di codice da un plugin:

```ts
// Nel tuo plugin
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "@omniroute/open-sse/services/compression/engines/registry";
import { myEngine } from "./engines/my-engine";

export default definePlugin({
  name: "my-compression-plugin",
  // L'SDK del plugin espone gli hook onRequest / onResponse / onError. Registra il
  // motore al caricamento del modulo del plugin (o al primo onRequest); annulla la registrazione
  // tramite il tuo percorso di teardown.
  onRequest: async (ctx) => {
    registerCompressionEngine(myEngine);
  },
});

// Durante il teardown:
// unregisterCompressionEngine("my-engine");
```

### Testare il motore

Registra il motore in un plugin o in una funzione di avvio. Una volta registrato, il motore sarà disponibile
nel selettore della strategia tramite il suo `id`. Testa l'integrazione componendolo in una pipeline sovrapposta:

---

## Creazione di pacchetti linguistici

La compressione in stile Caveman utilizza **pacchetti di regole specifici per lingua** per gestire riempitivi, espressioni attenuative e costrutti prolissi in ciascuna lingua naturale. OmniRoute include **6 pacchetti linguistici**: `en`, `es`, `fr`, `de`, `ja`, `pt-BR`.

### Struttura del pacchetto

Un pacchetto linguistico è una directory di **file JSON** all'interno di `open-sse/services/compression/rules/<language>/`:

```
open-sse/services/compression/rules/
├── en/
│   ├── filler.json          # Convenevoli, espressioni attenuative, formule di cortesia
│   ├── context.json         # Regole di riduzione del contesto
│   ├── dedup.json           # Regole di deduplicazione
│   ├── structural.json      # Punteggiatura, formattazione
│   └── ultra.json           # Regole di compressione aggressiva
├── es/  (stessa struttura)
├── fr/  (stessa struttura)
├── de/  (stessa struttura)
├── ja/  (stessa struttura)
└── pt-BR/ (stessa struttura)
```

### Anatomia di una regola

Ogni regola ha questa struttura (da `open-sse/services/compression/ruleLoader.ts`):

```ts
interface FileRule {
  name: string; // Nome leggibile (kebab-case)
  pattern: string; // Pattern regex JavaScript
  replacement?: string; // Testo con cui sostituire la corrispondenza
  replacementMap?: Record<string, string>; // OPPURE una mappa chiave→sostituzione
  flags?: string; // Flag regex (solitamente "gi")
  context?: "all" | "user" | "system" | "assistant";
  category?: "filler" | "context" | "structural" | "dedup" | "terse" | "ultra";
  minIntensity?: "lite" | "full" | "ultra"; // Ignora al di sotto di questa intensità
  description?: string; // Documentazione
}
```

### Esempio: aggiunta di regole per i riempitivi in hindi

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
      "description": "Rimuove formule di apertura cortesi come 'नमस्ते'"
    },
    {
      "name": "filler_actually",
      "pattern": "\\b(?:असल में|वास्तव में|दरअसल)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "lite",
      "description": "Rimuove i riempitivi equivalenti ad 'actually'"
    },
    {
      "name": "verbose_plea",
      "pattern": "\\b(?:कृपया|कृपया आप|अनुरोध है कि आप)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "full",
      "description": "Rimuove 'please' in hindi"
    }
  ]
}
```

### Validazione

I pacchetti di regole vengono convalidati rispetto a `_schema.json` durante il caricamento. Un pacchetto con una struttura non valida non verrà caricato e verrà registrato un errore:

```
RULE_LOADER: la convalida del pacchetto "hi/filler.json" non è riuscita:
  - rules.0.pattern: Regex non valida
  - rules.1.context: deve essere uno tra [all, user, system, assistant]
```

La validazione viene eseguita automaticamente quando un pacchetto viene caricato (rispetto a `_schema.json`); un
pacchetto non valido viene rifiutato e l'errore precedente viene registrato. Non esiste uno script
`npm run` separato per la validazione dei pacchetti: carica il pacchetto (ad esempio, avvia il server o
esegui il percorso di compressione) e controlla i log.

### Caricamento di un pacchetto linguistico personalizzato

```ts
import { loadRulePack } from "omniroute/compression/ruleLoader";

await loadRulePack("./my-custom-rules/hi/filler.json");
```

In alternativa, posizionalo in un percorso riconosciuto:

```
~/.omniroute/compression/rules/hi/filler.json  # A livello utente
<project>/.compression/rules/hi/filler.json   # A livello di progetto
```

### Procedure consigliate per i pacchetti linguistici

1. **Inizia con `filler`** — queste sono le regole con l'impatto maggiore
2. **Usa `minIntensity`** per limitare le regole aggressive — protegge da una compressione eccessiva
3. **Includi casi di test** — aggiungi un array `tests[]` nel JSON per verificare il comportamento
4. **L'ordine è importante** — le regole precedenti vengono applicate per prime; posiziona per prime quelle con l'impatto maggiore
5. **Sii prudente con `replacement`** — una stringa vuota è generalmente la scelta corretta; non introdurre mai nuovi contenuti

### Strategia di traduzione

Quando si localizzano pacchetti di regole in una nuova lingua:

1. **Traduci i nomi delle regole** — compaiono nell'output di debug
2. **Adatta i pattern regex** — una traduzione diretta spesso non funziona (i confini delle parole variano)
3. **Esegui test su conversazioni reali** — il pacchetto deve essere sicuro con input effettivi
4. **Rispetta le convenzioni culturali** — i pacchetti giapponesi, ad esempio, contengono più riempitivi onorifici rispetto a quelli inglesi

---

## Pipeline concatenate

Una **pipeline concatenata** esegue più motori in sequenza, passando l'output di ciascun motore a quello successivo. Questo è il funzionamento interno di `mode: stacked`.

### Come funziona la concatenazione

```
Input (10.000 token)
        │
        ▼
   ┌──────────┐
   │  Motore  │  priorità 10
   │  A       │  ──▶ output: 6.000 token (-40%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  Motore  │  priorità 50
   │  B       │  ──▶ output: 2.400 token (-60%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  Motore  │  priorità 100
   │  C       │  ──▶ output: 1.200 token (-80%)
   └────┬─────┘
        │
        ▼
Output finale (1.200 token, risparmio combinato di circa l'88%)
```

Quando viene selezionato `mode: "stacked"`, i motori vengono eseguiti in sequenza nell'ordine specificato nell'array `pipeline`.
L'output del motore N diventa l'input del motore N+1.

### Modalità di compressione

OmniRoute seleziona **UNA modalità per richiesta** in base alla configurazione, alle soglie di attivazione automatica e alle sostituzioni definite dalle combinazioni.
Le modalità disponibili sono definite in `open-sse/services/compression/types.ts` (tipo `CompressionMode`):

| Modalità     | Motori                  | Caso d'uso                                                                                                                                                                                                                                               |
| ------------ | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `off`        | Nessuno                 | Disabilita ogni compressione                                                                                                                                                                                                                             |
| `rtk`        | Solo RTK                | Sessioni con molto output di comandi (risparmio superiore all'80%)                                                                                                                                                                                       |
| `lite`       | Solo Lite               | Compressione conservativa (rapida e sicura)                                                                                                                                                                                                              |
| `standard`   | Caveman                 | Compressione del testo in prosa con pacchetti linguistici                                                                                                                                                                                                |
| `aggressive` | Caveman + Aggressive    | Compressione aggressiva della prosa + passaggio finale aggressivo                                                                                                                                                                                        |
| `ultra`      | Ultra                   | Compressione massima (con perdita, ultima risorsa). Facoltativamente instradata tramite il motore SLM **LLMLingua-2** quando è impostato `ultra.modelPath` (se il modello non è disponibile, ripiega sul metodo basato su regole senza generare errori). |
| `stacked`    | Pipeline personalizzata | Combina i motori in qualsiasi ordine (vedere sotto)                                                                                                                                                                                                      |

> Oltre ai motori delle modalità riportati sopra, il registro include anche motori specializzati concatenabili —
> **CCR**, **headroom**, **ionizer** e **session-dedup** — documentati in
> [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md#additional-built-in-engines).

La selezione della modalità è determinata da `getEffectiveMode()` in `open-sse/services/compression/strategySelector.ts`:

1. Se la compressione è disabilitata: `"off"`
2. Se esiste una sostituzione per la combinazione: usa la sostituzione
3. Se viene superata la soglia di attivazione automatica: usa `autoTriggerMode` (valore predefinito: `"lite"`)
4. Altrimenti: usa `defaultMode`

### Pipeline concatenata predefinita

Quando `mode: "stacked"` è configurato esplicitamente, la pipeline predefinita combina:

1. **RTK** — elimina il rumore dall'output dei comandi (risparmio di circa l'80% sull'output del terminale)
2. **Caveman** — rimuove le espressioni superflue e rende la prosa più concisa (circa il 46% sul testo rimanente)
3. **Lite** — passaggio finale per spaziatura e deduplicazione

Questa composizione consente di ottenere un **risparmio del 78-95%** nelle sessioni con un uso intensivo di strumenti.

### Configurazione delle pipeline concatenate

Nella configurazione della combinazione:

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

È possibile omettere motori, aggiungerne di personalizzati o modificarne l'ordine.

### Passaggio dello stato

I motori possono leggere i metadati dal contesto della richiesta (in `options`):

```ts
compress(body, config) {
  // Legge i metadati dai motori precedenti
  const original = options?.compressionComboId;  // "my-coding-combo"
  // ...
}
```

I metadati sono **di sola lettura**: i motori non possono modificare il contesto della richiesta, ma solo l'output del proprio corpo.

### Insidie relative all'ordine di esecuzione

| Ordine dei motori                              | Effetto                                                                                                  |
| ---------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| RTK → Caveman → Lite                           | **Consigliato** (elimina prima il rumore, poi interviene sul linguaggio e infine sugli spazi)            |
| Lite → RTK → Caveman                           | Sconsigliato — Lite elimina gli spazi dall'output grezzo, impedendo la corrispondenza dei pattern di RTK |
| Caveman → RTK                                  | Sconsigliato — Caveman può riscrivere il testo in modi che RTK non riconosce                             |
| Qualsiasi ordine con `tool_results` all'inizio | Migliore — l'output degli strumenti è il contenuto con più rumore                                        |

### Quando NON concatenare

La concatenazione non è sempre la scelta migliore:

- **Messaggi semplici** (senza output di strumenti) — un singolo Caveman o Lite è sufficiente
- **Sensibilità ai costi** — ogni motore aggiunge una latenza di circa 5-50 ms
- **Strumenti specifici** — RTK da solo è generalmente sufficiente per l'output della shell

### Creazione di una pipeline personalizzata

Non esiste un registro di pipeline con nome. Una pipeline concatenata è semplicemente un **array inline
di passaggi** passato a `applyStackedCompression()` (esportata da
`@omniroute/open-sse/services/compression/strategySelector`):

```ts
import { applyStackedCompression } from "@omniroute/open-sse/services/compression/strategySelector";

const result = applyStackedCompression(body, [
  { engine: "rtk", intensity: "aggressive" },
  { engine: "caveman", intensity: "full" },
]);
```

Quando non viene passata una pipeline, il valore predefinito è `rtk(standard) → caveman(full)`.

Per gestirla tramite la configurazione, imposta `mode: "stacked"` e fornisci l'array di passaggi in
`stackedPipeline` (letto da `config.stackedPipeline`):

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

## Politica di sincronizzazione con gli upstream

I motori di compressione di OmniRoute riconoscono nel README il contributo di diversi progetti upstream
("ispirato a RTK, Caveman, LLMLingua-2, Troglodita"). Una domanda comune tra i contributor
è: **quando il progetto upstream RTK aggiunge un nuovo filtro per uno strumento o Caveman aggiunge un pacchetto
di regole, come viene integrato in OmniRoute?** Questa sezione fornisce la risposta ufficiale.

### Copie integrate rispetto a implementazioni indipendenti

| Motore                       | Rapporto con il progetto upstream                                                                                                                  | Posizione                                                           |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **RTK**                      | **Reimplementazione indipendente** (ispirata al progetto, non una copia)                                                                           | `open-sse/services/compression/engines/rtk/`                        |
| **Caveman**                  | **Reimplementazione indipendente** (ispirata al progetto)                                                                                          | `open-sse/services/compression/engines/cavemanAdapter.ts`           |
| **Headroom**                 | Prevalentemente interno; solo il codec `gcf/` è **effettivamente integrato** da `gcf-typescript` (MIT, contrassegnato SPDX, solo profilo generico) | `open-sse/services/compression/engines/headroom/gcf/`               |
| **LLMLingua-2 / Troglodita** | Ispirati ai progetti upstream (sono alla base dei motori `llmlingua` + `session-dedup`)                                                            | `open-sse/services/compression/engines/llmlingua/`, `session-dedup` |

Punto chiave: **RTK e Caveman sono implementazioni TypeScript clean-room delle
_idee_ (regole di filtro, pacchetti di regole), non alberi di sorgenti integrati.** Non esiste
una copia upstream da cui eseguire `git pull`: è proprio per questo che il README riporta
"ispirato a" anziché "incluso".

### Come vengono integrate le migliorie upstream

**Non esistono né un tracciamento automatizzato delle release upstream né un'etichetta
`compression-sync`**: è una scelta progettuale. Poiché i motori sono reimplementazioni, un filtro
RTK o un pacchetto di regole Caveman upstream non viene integrato sotto forma di codice, ma viene
**riespresso come nuova regola/nuovo filtro nel formato proprio di OmniRoute** (vedere
[COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md)) e integrato ad hoc tramite
una normale PR. I punti di estensione indicati sopra (motore personalizzato, pacchetto linguistico, filtro RTK)
sono il modo ufficialmente supportato per contribuire.

Esempi recenti di questo stesso flusso:

- Filtri RTK per l'output di build di Gradle e `dotnet` (v3.8.42)
- Filtri RTK per kubectl / docker-build / composer / gh (#2824)
- Pacchetto linguistico indonesiano per Caveman (#3975), oltre ai pacchetti tedesco / francese / giapponese / cinese

### Headroom (proxy di compressione dell'input)

Headroom è **completamente interno**: uno snapshot bloccato e integrato del codec `gcf`, più
i livelli `smartcrusher` / `toon` / `tabular` propri di OmniRoute. Non esiste alcun
upstream attivo da monitorare oltre alla copia integrata; gli aggiornamenti di `gcf` vengono applicati
manualmente quando il codec cambia e nuovamente convalidati rispetto al controllo del budget di compressione
(`check:compression-budget`).

### Proporre una miglioria ispirata a un progetto upstream

1. **Non integrare il sorgente**: riesprimere la regola o il filtro upstream nel formato di OmniRoute.
2. Aggiungerlo tramite il punto di estensione corrispondente indicato di seguito (pacchetto linguistico, filtro RTK o
   motore personalizzato).
3. Citare il progetto upstream nella descrizione della PR (attribuzione), anziché
   copiarne il sorgente soggetto a licenza.
4. Includere i test e verificare che il controllo `check:compression-budget` continui a essere superato.

---

## Aggiungere uno stile di output

Gli stili di output (consulta la [tabella del catalogo nella guida](./COMPRESSION_GUIDE.md#output-styles-catalog))
sono la controparte, sul lato della risposta, dei motori di input: invece di comprimere ciò che
invii, indicano al modello di produrre un output meno costoso. Il registro è
`OUTPUT_STYLE_CATALOG` in `open-sse/services/compression/outputStyles/catalog.ts` e
**una singola voce del catalogo costituisce l'intera funzionalità**: l'iniettore, il pannello delle impostazioni della dashboard,
la persistenza e la telemetria enumerano tutti il catalogo — non esistono altri elenchi da aggiornare.

1. **Aggiungi una voce a `OUTPUT_STYLE_CATALOG`** con `id`, `label`, `description` e i
   tre `levels` in inglese (`lite`, `full`, `ultra`). Ogni livello deve terminare con
   `${SHARED_BOUNDARIES}`, affinché codice, percorsi, comandi, errori e URL rimangano invariati.
   Il testo delle istruzioni deve essere **statico e deterministico** per
   `(id, level, language)` — `${SHARED_BOUNDARIES}` è l'unica interpolazione consentita.
2. **Traducilo.** Fornisci almeno un blocco `pt-BR` sotto `i18n`; `ponytail` e
   `i-have-adhd` (en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi) costituiscono la struttura di riferimento. Uno stile deliberatamente
   monolingue imposta invece `locale` (come `terse-cjk` → `zh`) e viene quindi
   proposto solo per quella localizzazione.
3. **Aggiorna il controllo della matrice** — aggiungi le lingue dello stile a `BASELINE_LANGUAGES` in
   `tests/unit/compression/output-styles-i18n-matrix.test.ts`. Il controllo rifiuta qualsiasi nuovo stile
   non vincolato a una localizzazione che non includa le traduzioni richieste, a meno che non disponga di una
   voce esplicita in `KNOWN_ENGLISH_ONLY` con un ticket di tracciamento.
4. **Aggiungi un test specifico per lo stile** basato su
   `tests/unit/compression/i-have-adhd-catalog.test.ts`: struttura del catalogo, clausola dei limiti
   per ogni livello e un'asserzione di riferimento che verifichi che ciascuna traduzione sia scritta nella propria
   lingua anziché essere una copia dell'inglese.
5. **Attribuzione**: se lo stile è adattato da un progetto upstream, accreditalo in un
   commento sorgente sulla voce (ad esempio `i-have-adhd` → ayghri/i-have-adhd, MIT) — si applica la
   stessa regola della sezione "Proporre un miglioramento ispirato a un progetto upstream" precedente.

Non è necessaria alcuna modifica all'interfaccia utente, allo schema o alla telemetria — queste componenti vengono generate a partire dal catalogo.

---

## Procedure consigliate

### Sviluppo dei motori

1. **Implementa sempre `validateConfig`** — i motori privi di convalida causano errori silenziosi
2. **Imposta un valore realistico per `targetLatencyMs`** — viene utilizzato dal selettore della strategia per scegliere i motori
3. **Usa `getConfigSchema` per la dashboard** — non nascondere mai la configurazione agli utenti
4. **Supporta `stackable: true` se il motore è puro** — i motori con effetti collaterali non dovrebbero essere combinati
5. **Scrivi test inline** — i motori devono poter essere verificati in meno di 1 secondo

### Sviluppo dei pacchetti linguistici

1. **Inizia con l'intensità `lite`** — le regole devono essere sicure all'impostazione più bassa
2. **Usa `context` per limitare l'ambito delle regole** — le regole riservate a `user` non possono influire accidentalmente sui prompt di sistema
3. **Evita di acquisire le chiavi JSON** — `\\bword\\b` può trovare corrispondenze all'interno di JSON, compromettendo i dati strutturati
4. **Esegui test con casi limite** — input vuoto, Unicode, testo RTL, emoji
5. **Usa i pacchetti esistenti come modelli** — `en/filler.json` è l'esempio più completo

### Progettazione della pipeline

1. **Esegui la profilazione prima dell'ottimizzazione** — misura prima con `compression_stats`
2. **Preferisci la composizione alla reimplementazione** — estendi le regole Caveman prima di scrivere un nuovo motore
3. **Documenta la motivazione dell'ordine** — spiega in un commento perché il motore A precede il motore B
4. **Esegui i test con tutti e 3 i livelli di intensità** — `lite` è veloce ma con perdita di informazioni, `ultra` è lento ma preciso

---

## Riferimento: motori integrati

| ID motore            | Impilabile | stackPriority predefinita | Obiettivi                                              |
| -------------------- | ---------- | ------------------------- | ------------------------------------------------------ |
| `lite`               | Sì         | 5                         | messaggi, risultati degli strumenti                    |
| `rtk`                | Sì         | 10                        | risultati degli strumenti                              |
| `standard` (caveman) | Sì         | 20                        | messaggi, risultati degli strumenti, blocchi di codice |
| `aggressive`         | Sì         | 30                        | messaggi                                               |
| `ultra`              | Sì         | 40                        | messaggi, blocchi di codice                            |

### Vedi anche

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Panoramica della pipeline
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Riferimento del registro dei motori
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Specifica del formato delle regole
- [COMPRESSION_LANGUAGE_PACKS.md](./COMPRESSION_LANGUAGE_PACKS.md) — Dettagli dei pacchetti linguistici
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — Motore RTK e filtri personalizzati
- Fonte: `open-sse/services/compression/` (117 file, ~250 KB)
