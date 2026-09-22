# Extending the Compression Pipeline (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/EXTENDING_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇦 [bs](../../../bs/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/EXTENDING_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/EXTENDING_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/EXTENDING_COMPRESSION.md)

---

> **TL;DR**: Il-magna tal-kompressjoni ta’ OmniRoute hija **modulari** — tista’ tirreġistra magni personalizzati, tqassam pakketti lingwistiċi għal lingwi ġodda, u tikkomponi pipelines f’munzelli. Din il-gwida turi kif.

**Gwidi relatati:**

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Ħarsa ġenerali lejn il-pipeline sħiħ
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Reġistru tal-magni u magni integrati
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — Il-magna RTK u filtri personalizzati
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Referenza għall-format tal-pakketti tar-regoli

---

## Ħarsa ġenerali

Is-sistema tal-kompressjoni għandha **3 punti ta’ estensjoni**:

| Punt ta’ estensjoni      | Każ ta’ użu                                                                                 | Diffikultà |
| ------------------------ | ------------------------------------------------------------------------------------------- | ---------- |
| **Magna personalizzata** | Żid algoritmu tal-kompressjoni kompletament ġdid (eż. sommarizzatur speċifiku għal dominju) | Avvanzata  |
| **Pakkett lingwistiku**  | Żid appoġġ għal lingwa naturali ġdida (eż. il-Ħindi, l-Għarbi)                              | Medja      |
| **Pipeline f’munzell**   | Ikkomponi magni eżistenti f’ordni personalizzata                                            | Għall-bidu |

```
┌─────────────────────────────────────────────────────────────┐
│                  Strateġija tal-Kompressjoni                 │
│                                                              │
│   Messaġġi tal-input ──▶ getEffectiveMode() ──▶ modalità    │
│                                              │               │
│                      ┌───────────────────────┼──────────┐    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   "rtk"    "lite"   "standard" "stacked"    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   Magna     Magna    Magna     engines[]   │
│                   RTK       Lite     Caveman   f’katina    │
│                      │         │         │         │    │    │
│                      └─────────┴─────────┴─────────┘    │    │
│                                      │                    │
│                                      ▼                    │
│                              Output ikkompressat            │
└─────────────────────────────────────────────────────────────┘

Is-selettur tal-istrateġija huwa BBAŻAT FUQ IL-MODALITÀ: kull talba tagħżel modalità WAĦDA
(rtk / lite / standard / aggressive / ultra / stacked / off).
Il-modalità "stacked" biss tikkatina diversi magni f’sekwenza.
Il-modalità awtomatika predefinita għall-attivazzjoni hija "lite" (mhux katina ta’ prijorità bi 3 livelli).
```

---

## Kitba ta’ Magna tal-Kompressjoni Personalizzata

L-interfaċċa tal-magna (`open-sse/services/compression/engines/types.ts`) hija l-kuntratt li kull magna trid tissodisfa. Għandha 5 metodi obbligatorji.

### L-Interfaċċa `CompressionEngine`

```ts
interface CompressionEngine {
  id: string; // ID uniku tal-magna
  name: string; // Isem għall-wiri
  description: string; // Deskrizzjoni qasira
  icon: string; // Ikona (emoji jew URL)
  targets: CompressionEngineTarget[]; // ["messages", "tool_results", "code_blocks"]
  stackable: boolean; // Tista’ tintuża f’pipeline f’munzell
  stackPriority: number; // Ordni fil-pipelines f’munzelli (inqas = aktar kmieni)
  metadata: CompressionEngineMetadata;

  apply(body, options?): CompressionResult;
  compress(body, config?): CompressionResult;
  getConfigSchema(): EngineConfigField[];
  validateConfig(config): EngineValidationResult;
}
```

### Eżempju Minimu: Magna tal-Ispazji Bojod

L-aktar magna sempliċi possibbli — neħħi l-ispazji bojod żejda mill-messaġġi.

````ts
import type { CompressionEngine } from "omniroute/compression/engines/types";
import { registerCompressionEngine } from "omniroute/compression/engines/registry";

function preserveCodeBlocks(text: string): string {
  // Aqsam skont il-markaturi tal-blokki tal-kodiċi u ppreserva l-ispazji bojod fihom
  const parts = text.split(/(```[\s\S]*?```)/);
  return parts
    .map((part) => {
      if (part.startsWith("```")) {
        return part; // Timmodifikax il-blokki tal-kodiċi
      }
      return part.replace(/\n{3,}/g, "\n\n"); // Applika biss għall-proża
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
  stackPriority: 100, // Ħaddem WARA caveman/rtk

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

    // Għaddi mill-array tal-messaġġi — ittratta kemm il-kontenut string kif ukoll dak multipart
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
      // Kontenut multipart: għaddi mill-partijiet u kkompressa biss il-partijiet tat-test
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
          return part; // ippreserva image_url, tool_use, eċċ.
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

// Irreġistra globalment
registerCompressionEngine(whitespaceEngine);
````

### Fejn Għandek Tpoġġi Engines Personalizzati

```
~/.omniroute/compression/engines/my-engine.ts    # Fil-livell tal-utent
<project>/compression-engines/my-engine.ts        # Fil-livell tal-proġett (jitgħabba waqt l-istartjar)
```

Jew tellgħu b’mod programmatiku minn plugin:

```ts
// Fil-plugin tiegħek
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "@omniroute/open-sse/services/compression/engines/registry";
import { myEngine } from "./engines/my-engine";

export default definePlugin({
  name: "my-compression-plugin",
  // L-SDK tal-plugin jesponi l-hooks onRequest / onResponse / onError. Irreġistra l-
  // engine meta jitgħabba l-modulu tal-plugin (jew mal-ewwel onRequest); neħħi r-reġistrazzjoni tiegħu
  // mill-perkors tat-teardown tiegħek stess.
  onRequest: async (ctx) => {
    registerCompressionEngine(myEngine);
  },
});

// Waqt it-teardown:
// unregisterCompressionEngine("my-engine");
```

### Ittestjar tal-Engine Tiegħek

Irreġistra l-engine tiegħek fi plugin jew f’funzjoni tal-istartjar. Ladarba jiġi rreġistrat, l-engine ikun disponibbli
fis-selettur tal-istrateġija permezz tal-`id` tiegħu. Ittestja l-integrazzjoni billi tikkomponih f’pipeline f’munzell:

---

## Il-Ħolqien ta’ Pakketti tal-Lingwa

Il-kompressjoni stil **Caveman** tuża **pakketti ta’ regoli speċifiċi għal-lingwa** biex tittratta kliem tal-mili, espressjonijiet ta’ inċertezza, u mudelli verbose f’kull lingwa naturali. OmniRoute jiġi b’**6 pakketti tal-lingwa**: `en`, `es`, `fr`, `de`, `ja`, `pt-BR`.

### Struttura tal-Pakkett

Pakkett tal-lingwa huwa direttorju ta’ **fajls JSON** taħt `open-sse/services/compression/rules/<language>/`:

```
open-sse/services/compression/rules/
├── en/
│   ├── filler.json          # Tislijiet, espressjonijiet ta’ inċertezza, korteżija
│   ├── context.json         # Regoli għat-tnaqqis tal-kuntest
│   ├── dedup.json           # Regoli għat-tneħħija tad-duplikazzjoni
│   ├── structural.json      # Punteġġjatura, ifformattjar
│   └── ultra.json           # Regoli ta’ kompressjoni aggressiva
├── es/  (l-istess struttura)
├── fr/  (l-istess struttura)
├── de/  (l-istess struttura)
├── ja/  (l-istess struttura)
└── pt-BR/ (l-istess struttura)
```

### Anatomija ta’ Regola

Kull regola għandha din l-istruttura (minn `open-sse/services/compression/ruleLoader.ts`):

```ts
interface FileRule {
  name: string; // Isem li jista’ jinqara mill-bniedem (kebab-case)
  pattern: string; // Mudell regex ta’ JavaScript
  replacement?: string; // Biex għandha tiġi sostitwita t-taqbila
  replacementMap?: Record<string, string>; // JEW mappa ta’ ċavetta→sostituzzjoni
  flags?: string; // Markaturi regex (tipikament "gi")
  context?: "all" | "user" | "system" | "assistant";
  category?: "filler" | "context" | "structural" | "dedup" | "terse" | "ultra";
  minIntensity?: "lite" | "full" | "ultra"; // Aqbeż taħt din l-intensità
  description?: string; // Dokumentazzjoni
}
```

### Eżempju: Żieda ta’ Regoli tal-Mili bil-Ħindi

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
      "description": "Neħħi introduzzjonijiet edukati bħal 'नमस्ते'"
    },
    {
      "name": "filler_actually",
      "pattern": "\\b(?:असल में|वास्तव में|दरअसल)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "lite",
      "description": "Neħħi kliem tal-mili li jfisser 'fil-fatt'"
    },
    {
      "name": "verbose_plea",
      "pattern": "\\b(?:कृपया|कृपया आप|अनुरोध है कि आप)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "full",
      "description": "Neħħi 'jekk jogħġbok' bil-Ħindi"
    }
  ]
}
```

### Validazzjoni

Il-pakketti tar-regoli jiġu vvalidati ma’ `_schema.json` waqt it-tagħbija. Pakkett bi struttura ħażina ma jitgħabbiex u jiġi rreġistrat żball:

```
RULE_LOADER: il-pakkett "hi/filler.json" ma għaddiex mill-validazzjoni:
  - rules.0.pattern: Regex invalidu
  - rules.1.context: irid ikun wieħed minn [all, user, system, assistant]
```

Il-validazzjoni taħdem awtomatikament meta jitgħabba pakkett (ma’ `_schema.json`); pakkett
invalidu jiġi rrifjutat u l-iżball t’hawn fuq jiġi rreġistrat. Ma hemm l-ebda skript
`npm run` separat għall-validazzjoni tal-pakketti — għabbi l-pakkett (eż. ibda s-server jew
ħaddem il-fluss tal-kompressjoni) u osserva l-logs.

### Tagħbija ta’ Pakkett tal-Lingwa Personalizzat

```ts
import { loadRulePack } from "omniroute/compression/ruleLoader";

await loadRulePack("./my-custom-rules/hi/filler.json");
```

Jew poġġih f’post rikonoxxut:

```
~/.omniroute/compression/rules/hi/filler.json  # Fil-livell tal-utent
<project>/.compression/rules/hi/filler.json   # Fil-livell tal-proġett
```

### L-Aħjar Prattiki għall-Pakketti tal-Lingwa

1. **Ibda b’`filler`** — dawn huma r-regoli bl-akbar impatt
2. **Uża `minIntensity`** biex tikkontrolla r-regoli aggressivi — dan jipproteġi kontra kompressjoni eċċessiva
3. **Inkludi każijiet tat-test** — żid firxa `tests[]` fil-JSON biex tivverifika l-imġiba
4. **L-ordni hija importanti** — ir-regoli ta’ qabel jiġu applikati l-ewwel; poġġi r-regoli bl-akbar impatt l-ewwel
5. **Kun konservattiv b’`replacement`** — string vojta normalment hija korretta; qatt tintroduċi kontenut ġdid

### Strateġija tat-Traduzzjoni

Meta tadatta pakketti tar-regoli għal lingwa ġdida:

1. **Ittraduċi l-ismijiet tar-regoli** — dawn jidhru fl-output tad-debug
2. **Adatta l-mudelli regex** — traduzzjoni diretta spiss ma taħdimx (il-konfini tal-kliem ivarjaw)
3. **Ittestja b’konverżazzjonijiet reali** — il-pakkett għandu jkun sikur fuq input reali
4. **Irrispetta l-konvenzjonijiet kulturali** — pereżempju, il-pakketti Ġappuniżi għandhom aktar kliem tal-mili onorifiku minn dawk Ingliżi

---

## Pipelines f'Munzell

**Pipeline f'munzell** tħaddem diversi magni f'sekwenza, fejn l-output ta' kull magna jiddaħħal f'dik ta' warajha. Hekk jaħdem internament `mode: stacked`.

### Kif Jaħdem l-Istivar

```
Input (10,000 token)
        │
        ▼
   ┌──────────┐
   │  Magna   │  prijorità 10
   │  A       │  ──▶ output: 6,000 token (-40%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  Magna   │  prijorità 50
   │  B       │  ──▶ output: 2,400 token (-60%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  Magna   │  prijorità 100
   │  C       │  ──▶ output: 1,200 token (-80%)
   └────┬─────┘
        │
        ▼
Output finali (1,200 token, ~88% iffrankar ikkombinat)
```

Meta jintgħażel `mode: "stacked"`, il-magni jitħaddmu b'mod sekwenzjali fl-ordni speċifikata fl-array `pipeline`.
L-output tal-magna N isir l-input tal-magna N+1.

### Modi ta' Kompressjoni

OmniRoute jagħżel **MOD WIEĦED għal kull talba** abbażi tal-konfigurazzjoni, il-limiti ta' attivazzjoni awtomatika, u s-sostituzzjonijiet tal-combo.
Il-modi disponibbli huma ddefiniti f'`open-sse/services/compression/types.ts` (it-tip `CompressionMode`):

| Mod          | Magni                  | Każ ta' użu                                                                                                                                                                                                                       |
| ------------ | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `off`        | Ebda waħda             | Itfi l-kompressjoni kollha                                                                                                                                                                                                        |
| `rtk`        | RTK biss               | Sessjonijiet b'ħafna output tal-kmandi (iffrankar ta' 80%+)                                                                                                                                                                       |
| `lite`       | Lite biss              | Kompressjoni konservattiva (veloċi, sikura)                                                                                                                                                                                       |
| `standard`   | Caveman                | Kompressjoni tal-proża b'pakketti tal-lingwa                                                                                                                                                                                      |
| `aggressive` | Caveman + Aggressive   | Proża aggressiva + pass finali aggressiv                                                                                                                                                                                          |
| `ultra`      | Ultra                  | Kompressjoni massima (b'telf, bħala l-aħħar għażla). B'mod fakultattiv tgħaddi mill-magna SLM **LLMLingua-2** meta jkun issettjat `ultra.modelPath` (taqleb għar-rotta bbażata fuq ir-regoli meta l-mudell ma jkunx disponibbli). |
| `stacked`    | Pipeline personalizzat | Ikkomponi l-magni fi kwalunkwe ordni (ara hawn taħt)                                                                                                                                                                              |

> Minbarra l-magni tal-modi t'hawn fuq, ir-reġistru jipprovdi wkoll magni speċjalizzati li jistgħu jitqiegħdu f'munzell —
> **CCR**, **headroom**, **ionizer**, u **session-dedup** — iddokumentati f'
> [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md#additional-built-in-engines).

L-għażla tal-mod hija ddeterminata minn `getEffectiveMode()` f'`open-sse/services/compression/strategySelector.ts`:

1. Jekk il-kompressjoni tkun diżattivata: `"off"`
2. Jekk teżisti sostituzzjoni tal-combo: uża s-sostituzzjoni
3. Jekk jinqabeż il-limitu tal-attivazzjoni awtomatika: uża `autoTriggerMode` (default: `"lite"`)
4. Inkella: uża `defaultMode`

### Il-Pipeline f'Munzell Default

Meta `mode: "stacked"` jiġi kkonfigurat b'mod espliċitu, il-pipeline default jikkomponi:

1. **RTK** — ineħħi l-istorbju mill-output tal-kmandi (~80% iffrankar fuq l-output tat-terminal)
2. **Caveman** — ineħħi l-kliem żejjed u jagħmel il-proża aktar konċiża (~46% mit-test li jifdal)
3. **Lite** — pass finali għall-ispazji vojta + deduplikazzjoni

Din il-kompożizzjoni tikseb **78-95% iffrankar** f'sessjonijiet b'użu intensiv tal-għodod.

### Il-Konfigurazzjoni ta' Pipelines f'Munzell

Fil-konfigurazzjoni tal-combo:

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

Tista' tħalli barra magni, iżżid oħrajn personalizzati, jew tibdel l-ordni tagħhom.

### It-Trasferiment tal-Istat

Il-magni jistgħu jaqraw il-metadata mill-kuntest tat-talba (f'`options`):

```ts
compress(body, config) {
  // Aqra l-metadata mill-magni preċedenti
  const original = options?.compressionComboId;  // "my-coding-combo"
  // ...
}
```

Il-metadata hija **għall-qari biss** — il-magni ma jistgħux jimmodifikaw il-kuntest tat-talba, iżda biss l-output tal-body tagħhom stess.

### Problemi Komuni fl-Ordni tal-Eżekuzzjoni

| Ordni tal-magni                          | Effett                                                                                                           |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| RTK → Caveman → Lite                     | **Rakkomandat** (ineħħi l-istorbju l-ewwel, imbagħad il-lingwa, u wara l-ispazji vojta)                          |
| Lite → RTK → Caveman                     | Ħażin — Lite ineħħi l-ispazji vojta mill-output mhux ipproċessat, u b'hekk ifalli t-tqabbil tal-patterns ta' RTK |
| Caveman → RTK                            | Ħażin — Caveman jista' jerġa' jikteb it-test b'modi li RTK ma jagħrafx                                           |
| Kwalunkwe ordni b'`tool_results` l-ewwel | Aħjar — l-output tal-għodod huwa l-aktar kontenut storbjuż                                                       |

### Meta M'GĦANDEKX Tuża Munzell

L-istivar mhux dejjem aħjar:

- **Messaġġi sempliċi** (mingħajr output tal-għodod) — Caveman jew Lite waħdu huwa biżżejjed
- **Meta l-ispiża hija importanti** — kull magna żżid latenza ta' ~5-50ms
- **Għodod speċifiċi** — RTK waħdu normalment ikun biżżejjed għall-output tax-shell

### Il-Bini ta' Pipeline Personalizzat

M'hemm l-ebda reġistru ta' pipelines bl-isem. Pipeline stacked hija sempliċement **array inline
ta' passi** mgħoddija lil `applyStackedCompression()` (esportata minn
`@omniroute/open-sse/services/compression/strategySelector`):

```ts
import { applyStackedCompression } from "@omniroute/open-sse/services/compression/strategySelector";

const result = applyStackedCompression(body, [
  { engine: "rtk", intensity: "aggressive" },
  { engine: "caveman", intensity: "full" },
]);
```

Meta ma tgħaddix pipeline, tintuża awtomatikament `rtk(standard) → caveman(full)`.

Biex tikkontrollaha mill-konfigurazzjoni, issettja `mode: "stacked"` u pprovdi l-array tal-passi taħt
`stackedPipeline` (moqrija minn `config.stackedPipeline`):

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

## Politika ta' Sinkronizzazzjoni mal-Upstream

Il-magni tal-kompressjoni ta' OmniRoute jagħtu kreditu lil diversi proġetti upstream fir-README
("ispirati minn RTK, Caveman, LLMLingua-2, Troglodita"). Mistoqsija komuni mill-kontributuri
hija: **meta RTK upstream iżid filtru ġdid tal-għodod jew Caveman iżid pakkett ta'
regoli, dan kif jasal f'OmniRoute?** Din it-taqsima hija t-tweġiba awtorevoli.

### Kopji vendorizzati vs. implimentazzjonijiet indipendenti

| Magna                        | Relazzjoni mal-upstream                                                                                                                            | Post                                                                |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **RTK**                      | **Implimentazzjoni mill-ġdid indipendenti** (ispirata minnu, mhux kopja)                                                                           | `open-sse/services/compression/engines/rtk/`                        |
| **Caveman**                  | **Implimentazzjoni mill-ġdid indipendenti** (ispirata minnu)                                                                                       | `open-sse/services/compression/engines/cavemanAdapter.ts`           |
| **Headroom**                 | Fil-biċċa l-kbira intern; il-codec `gcf/` biss huwa **ġenwinament vendorizzat** minn `gcf-typescript` (MIT, immarkat b'SPDX, profil ġeneriku biss) | `open-sse/services/compression/engines/headroom/gcf/`               |
| **LLMLingua-2 / Troglodita** | Ispirati minnhom (imexxu l-magni `llmlingua` + `session-dedup`)                                                                                    | `open-sse/services/compression/engines/llmlingua/`, `session-dedup` |

Punt ewlieni: **RTK u Caveman huma implimentazzjonijiet TypeScript clean-room tal-
_ideat_ (regoli tal-filtri, pakketti ta' regoli), mhux siġar tas-sors vendorizzati.** Ma hemm
l-ebda kopja upstream li tista' tinġibed permezz ta' `git pull` — u huwa proprju għalhekk li r-README jgħid
"ispirati minn" minflok "inklużi".

### Kif jingħaqad it-titjib upstream

**Ma hemm l-ebda traċċar awtomatizzat tar-rilaxxi upstream u l-ebda tikketta `compression-sync`
** — dan huwa intenzjonat. Minħabba li l-magni huma implimentazzjonijiet mill-ġdid, filtru RTK
jew pakkett ta' regoli Caveman upstream ma jingħaqadx bħala kodiċi; minflok, jiġi **espress mill-ġdid bħala
regola/filtru ġdid fil-format proprju ta' OmniRoute** (ara
[COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md)) u jiddaħħal ad hoc permezz
ta' PR normali. Il-punti ta' estensjoni ta' hawn fuq (magna personalizzata, pakkett lingwistiku, filtru RTK)
huma l-mod approvat biex tikkontribwixxi wieħed.

Eżempji reċenti ta' dan il-fluss preċiż:

- Filtri RTK għall-output tal-build ta' Gradle u `dotnet` (v3.8.42)
- Filtri RTK għal kubectl / docker-build / composer / gh (#2824)
- Pakkett tal-lingwa Indoneżjana għal Caveman (#3975), flimkien ma' pakketti bil-Ġermaniż / Franċiż / Ġappuniż / Ċiniż

### Headroom (proxy tal-kompressjoni tal-input)

Headroom huwa **kompletament intern** — snapshot ippinjat u vendorizzat tal-codec `gcf` flimkien mas-saffi
`smartcrusher` / `toon` / `tabular` proprji ta' OmniRoute. Ma hemm l-ebda
upstream attiv x'jiġi traċċat lil hinn mill-kopja vendorizzata; l-aġġornamenti għal `gcf` jiġu aġġornati
manwalment meta jinbidel il-codec u jerġgħu jiġu vvalidati mal-gate tal-baġit tal-kompressjoni
(`check:compression-budget`).

### Kif tipproponi titjib ispirat mill-upstream

1. **Tivvendorizzax** — esprimi mill-ġdid ir-regola/filtru upstream fil-format ta' OmniRoute.
2. Żidu permezz tal-punt ta' estensjoni korrispondenti hawn taħt (pakkett lingwistiku, filtru RTK, jew
   magna personalizzata).
3. Irreferi għall-proġett upstream fid-deskrizzjoni tal-PR (attribuzzjoni), mhux billi
   tikkopja s-sors tiegħu li jinkludi liċenzja.
4. Inkludi testijiet u kkonferma li l-gate `check:compression-budget` għadu jgħaddi.

---

## Żieda ta’ Stil ta’ Output

L-istili tal-output (ara t-[tabella tal-katalogu fil-gwida](./COMPRESSION_GUIDE.md#output-styles-catalog))
huma l-kontroparti fuq in-naħa tar-rispons tal-magni tal-input: minflok jikkompressaw dak li
tibgħat, jagħtu struzzjonijiet lill-mudell biex jipproduċi output orħos. Ir-reġistru huwa
`OUTPUT_STYLE_CATALOG` f’`open-sse/services/compression/outputStyles/catalog.ts`, u
**entrata waħda fil-katalogu hija l-karatteristika kollha**: l-injettur, il-pannell tas-settings tad-dashboard,
il-persistenza u t-telemetrija kollha jinnumeraw il-katalogu — m’hemm l-ebda lista oħra x’taġġorna.

1. **Żid entrata waħda ma’ `OUTPUT_STYLE_CATALOG`** b’`id`, `label`, `description` u t-tliet
   `levels` bl-Ingliż (`lite`, `full`, `ultra`). Kull livell irid jispiċċa b’
   `${SHARED_BOUNDARIES}` sabiex il-code, il-paths, il-commands, l-errors u l-URLs jibqgħu kelma b’kelma.
   It-test tal-istruzzjoni jrid ikun **statiku u deterministiku** għal kull
   `(id, level, language)` — `${SHARED_BOUNDARIES}` hija l-unika interpolazzjoni permessa.
2. **Ittraduċih.** Inkludi mill-inqas blokka `pt-BR` taħt `i18n`; `ponytail` u
   `i-have-adhd` (en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi) huma l-forma ta’ referenza. Stil intenzjonalment
   b’lingwa waħda juża `locale` minflok (bħal `terse-cjk` → `zh`) u mbagħad
   jiġi offrut biss taħt dak il-locale.
3. **Aġġorna l-kontroll tal-matriċi** — żid il-lingwi tal-istil ma’ `BASELINE_LANGUAGES` f’
   `tests/unit/compression/output-styles-i18n-matrix.test.ts`. Il-kontroll ifalli kwalunkwe
   stil ġdid li mhuwiex ristrett b’locale u li ma jkollux it-traduzzjonijiet meħtieġa, sakemm ma jkollux
   entrata espliċita `KNOWN_ENGLISH_ONLY` b’issue ta’ traċċar.
4. **Żid test għal kull stil** imfassal fuq
   `tests/unit/compression/i-have-adhd-catalog.test.ts`: il-forma tal-katalogu, il-klawżola tal-konfini
   għal kull livell, u anchor li jafferma li kull traduzzjoni hija miktuba bil-lingwa tagħha stess minflok ma tkun Ingliż ikkupjat.
5. **Attribuzzjoni**: jekk l-istil huwa adattat minn proġett upstream, agħtih kreditu f’
   kumment tas-sors fuq l-entrata (eż. `i-have-adhd` → ayghri/i-have-adhd, MIT) — l-istess
   regola bħal “Proposta ta’ titjib ispirat minn upstream” hawn fuq.

Mhi meħtieġa l-ebda bidla fl-UI, fl-iskema jew fit-telemetrija — dawk l-uċuħ jiġu rrendjati mill-katalogu.

---

## L-Aħjar Prattiki

### Żvilupp tal-Magni

1. **Dejjem implimenta `validateConfig`** — magni mingħajr validazzjoni jikkawżaw fallimenti siekta
2. **Issettja `targetLatencyMs` realistiku** — jintuża mis-selettur tal-istrateġija biex jagħżel il-magni
3. **Uża `getConfigSchema` għad-dashboard** — qatt taħbi l-konfigurazzjoni mill-utenti
4. **Appoġġja `stackable: true` jekk il-magna tiegħek hija pura** — magni b’effetti sekondarji m’għandhomx jiġu stivati
5. **Ikteb tests inline** — il-magni għandhom ikunu verifikabbli f’<1s

### Żvilupp ta’ Pakketti tal-Lingwa

1. **Ibda bl-intensità `lite`** — ir-regoli tiegħek għandhom ikunu sikuri fl-aktar setting baxx
2. **Uża `context` biex tillimita l-ambitu tar-regoli** — regoli `user` biss ma jistgħux jaffettwaw bi żball il-prompts tas-sistema
3. **Evita li taqbad JSON keys** — `\\bword\\b` jista’ jaqbel ġewwa JSON u jikser data strutturata
4. **Ittestja b’każijiet estremi** — input vojt, unicode, test RTL, emojis
5. **Uża pakketti eżistenti bħala mudelli** — `en/filler.json` huwa l-aktar eżempju żviluppat

### Disinn tal-Pipeline

1. **Agħmel profiling qabel ma tottimizza** — l-ewwel kejjel b’`compression_stats`
2. **Ippreferi l-kompożizzjoni milli timplimenta mill-ġdid** — estendi r-regoli ta’ Caveman qabel tikteb magna ġdida
3. **Iddokumenta r-raġuni għall-ordni** — ikkummenta għaliex il-magna A tiġi qabel il-magna B
4. **Ittestja fit-3 livelli kollha ta’ intensità** — `lite` huwa veloċi iżda jitlef id-data, `ultra` huwa kajman iżda preċiż

---

## Referenza: Magni Integrati

| ID tal-Magna         | Akkumulabbli | stackPriority Default | Miri                                              |
| -------------------- | ------------ | --------------------- | ------------------------------------------------- |
| `lite`               | Iva          | 5                     | messaġġi, riżultati tal-għodod                    |
| `rtk`                | Iva          | 10                    | riżultati tal-għodod                              |
| `standard` (caveman) | Iva          | 20                    | messaġġi, riżultati tal-għodod, blokki tal-kodiċi |
| `aggressive`         | Iva          | 30                    | messaġġi                                          |
| `ultra`              | Iva          | 40                    | messaġġi, blokki tal-kodiċi                       |

### Ara Wkoll

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Ħarsa ġenerali lejn il-pipeline
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Referenza tar-reġistru tal-magni
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Speċifikazzjoni tal-format tar-regoli
- [COMPRESSION_LANGUAGE_PACKS.md](./COMPRESSION_LANGUAGE_PACKS.md) — Dettalji dwar il-pakketti tal-lingwi
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — Il-magna RTK u filtri personalizzati
- Sors: `open-sse/services/compression/` (117-il fajl, ~250KB)
