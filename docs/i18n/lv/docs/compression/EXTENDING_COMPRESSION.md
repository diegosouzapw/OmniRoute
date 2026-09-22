# Extending the Compression Pipeline (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/EXTENDING_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/EXTENDING_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/EXTENDING_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/EXTENDING_COMPRESSION.md)

---

> **ĪSUMĀ**: OmniRoute saspiešanas dzinis ir **paplašināms** — varat reģistrēt pielāgotus dziņus, piegādāt valodu pakotnes jaunām valodām un veidot vairāku posmu konveijerus. Šajā rokasgrāmatā parādīts, kā to izdarīt.

**Saistītās rokasgrāmatas:**

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Pilns konveijera pārskats
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Dziņu reģistrs un iebūvētie dziņi
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK dzinis un pielāgoti filtri
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Noteikumu pakotnes formāta atsauce

---

## Pārskats

Saspiešanas sistēmai ir **3 paplašināšanas punkti**:

| Paplašināšanas punkts      | Lietojums                                                                                   | Sarežģītība |
| -------------------------- | ------------------------------------------------------------------------------------------- | ----------- |
| **Pielāgots dzinis**       | Pievienot pilnīgi jaunu saspiešanas algoritmu (piem., konkrētai jomai paredzētu apkopotāju) | Augsta      |
| **Valodas pakotne**        | Pievienot jaunas dabiskās valodas atbalstu (piem., hindi, arābu)                            | Vidēja      |
| **Vairākposmu konveijers** | Apvienot esošos dziņus pielāgotā secībā                                                     | Iesācēja    |

```
┌─────────────────────────────────────────────────────────────┐
│                    Saspiešanas stratēģija                    │
│                                                              │
│   Ievades ziņojumi ──▶ getEffectiveMode() ──▶ režīms        │
│                                              │               │
│                      ┌───────────────────────┼──────────┐    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   "rtk"    "lite"   "standard" "stacked"    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   RTK       Lite     Caveman   engines[]   │
│                   dzinis    dzinis   dzinis    ķēdēti      │
│                      │         │         │         │    │    │
│                      └─────────┴─────────┴─────────┘    │    │
│                                      │                    │
│                                      ▼                    │
│                             Saspiestā izvade               │
└─────────────────────────────────────────────────────────────┘

Stratēģijas atlasītājs darbojas PĒC REŽĪMA: katrs pieprasījums atlasa VIENU režīmu
(rtk / lite / standard / aggressive / ultra / stacked / off).
Tikai režīms "stacked" secīgi sasaista vairākus dziņus.
Noklusējuma automātiskās aktivizēšanas režīms ir "lite" (nevis 3 līmeņu prioritāšu ķēde).
```

---

## Pielāgota saspiešanas dziņa izveide

Dziņa saskarne (`open-sse/services/compression/engines/types.ts`) ir līgums, kas jāizpilda katram dzinim. Tai ir 5 obligātas metodes.

### `CompressionEngine` saskarne

```ts
interface CompressionEngine {
  id: string; // Unikāls dziņa ID
  name: string; // Attēlojamais nosaukums
  description: string; // Īss apraksts
  icon: string; // Ikona (emocijzīme vai URL)
  targets: CompressionEngineTarget[]; // ["messages", "tool_results", "code_blocks"]
  stackable: boolean; // Vai var izmantot vairākposmu konveijerā
  stackPriority: number; // Secība vairākposmu konveijeros (mazāks = agrāk)
  metadata: CompressionEngineMetadata;

  apply(body, options?): CompressionResult;
  compress(body, config?): CompressionResult;
  getConfigSchema(): EngineConfigField[];
  validateConfig(config): EngineValidationResult;
}
```

### Minimāls piemērs: atstarpju dzinis

Vienkāršākais iespējamais dzinis — noņemt liekās atstarpes no ziņojumiem.

````ts
import type { CompressionEngine } from "omniroute/compression/engines/types";
import { registerCompressionEngine } from "omniroute/compression/engines/registry";

function preserveCodeBlocks(text: string): string {
  // Sadalīt pēc koda bloku marķieriem un saglabāt tajos atstarpes
  const parts = text.split(/(```[\s\S]*?```)/);
  return parts
    .map((part) => {
      if (part.startsWith("```")) {
        return part; // Nemainīt koda blokus
      }
      return part.replace(/\n{3,}/g, "\n\n"); // Lietot tikai prozai
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
  stackPriority: 100, // Izpildīt PĒC caveman/rtk

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

    // Apstaigāt ziņojumu masīvu — apstrādāt gan virknes, gan vairākdaļu saturu
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
      // Vairākdaļu saturs: apstaigāt daļas un saspiest tikai teksta daļas
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
          return part; // saglabāt image_url, tool_use utt.
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

// Reģistrēt globāli
registerCompressionEngine(whitespaceEngine);
````

### Kur izvietot pielāgotus dzinējus

```
~/.omniroute/compression/engines/my-engine.ts    # Lietotāja līmenī
<project>/compression-engines/my-engine.ts        # Projekta līmenī (tiek ielādēts palaišanas laikā)
```

Vai ielādējiet programmatiski no spraudņa:

```ts
// Jūsu spraudnī
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "@omniroute/open-sse/services/compression/engines/registry";
import { myEngine } from "./engines/my-engine";

export default definePlugin({
  name: "my-compression-plugin",
  // Spraudņa SDK nodrošina onRequest / onResponse / onError āķus. Reģistrējiet
  // dzinēju, kad tiek ielādēts spraudņa modulis (vai pirmajā onRequest); atceliet tā
  // reģistrāciju savā izslēgšanas ceļā.
  onRequest: async (ctx) => {
    registerCompressionEngine(myEngine);
  },
});

// Izslēgšanas laikā:
// unregisterCompressionEngine("my-engine");
```

### Dzinēja testēšana

Reģistrējiet savu dzinēju spraudnī vai palaišanas funkcijā. Pēc reģistrēšanas dzinējs būs pieejams
stratēģijas atlasītājā, izmantojot tā `id`. Pārbaudiet integrāciju, iekļaujot to stekā sakārtotā konveijerā:

---

## Valodu pakotņu izveide

Alu cilvēka stila saspiešana izmanto **valodai specifiskas kārtulu pakotnes**, lai apstrādātu liekvārdību, izvairīgus formulējumus un daudzvārdīgas konstrukcijas katrā dabiskajā valodā. OmniRoute komplektācijā ir **6 valodu pakotnes**: `en`, `es`, `fr`, `de`, `ja`, `pt-BR`.

### Pakotnes struktūra

Valodas pakotne ir **JSON failu** direktorijs zem `open-sse/services/compression/rules/<language>/`:

```
open-sse/services/compression/rules/
├── en/
│   ├── filler.json          # Pieklājības frāzes, izvairīgi formulējumi, pieklājība
│   ├── context.json         # Kontekstu samazinošas kārtulas
│   ├── dedup.json           # Dublikātu novēršanas kārtulas
│   ├── structural.json      # Pieturzīmes, formatējums
│   └── ultra.json           # Agresīvas saspiešanas kārtulas
├── es/  (tāda pati struktūra)
├── fr/  (tāda pati struktūra)
├── de/  (tāda pati struktūra)
├── ja/  (tāda pati struktūra)
└── pt-BR/ (tāda pati struktūra)
```

### Kārtulas uzbūve

Katrai kārtulai ir šāda struktūra (no `open-sse/services/compression/ruleLoader.ts`):

```ts
interface FileRule {
  name: string; // Cilvēkiem saprotams nosaukums (kebab-case)
  pattern: string; // JavaScript regulārās izteiksmes raksts
  replacement?: string; // Ar ko aizstāt atbilstību
  replacementMap?: Record<string, string>; // VAI atslēgas→aizstājēja karte
  flags?: string; // Regulārās izteiksmes karodziņi (parasti "gi")
  context?: "all" | "user" | "system" | "assistant";
  category?: "filler" | "context" | "structural" | "dedup" | "terse" | "ultra";
  minIntensity?: "lite" | "full" | "ultra"; // Izlaist zem šīs intensitātes
  description?: string; // Dokumentācija
}
```

### Piemērs: hindi valodas liekvārdības kārtulu pievienošana

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
      "description": "Noņemt pieklājīgus ievadus, piemēram, 'नमस्ते'"
    },
    {
      "name": "filler_actually",
      "pattern": "\\b(?:असल में|वास्तव में|दरअसल)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "lite",
      "description": "Noņemt liekvārdīgus 'patiesībā' ekvivalentus"
    },
    {
      "name": "verbose_plea",
      "pattern": "\\b(?:कृपया|कृपया आप|अनुरोध है कि आप)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "full",
      "description": "Noņemt 'lūdzu' hindi valodā"
    }
  ]
}
```

### Validācija

Kārtulu pakotnes ielādes laikā tiek validētas pret `_schema.json`. Pakotni ar nepareizu struktūru neizdosies ielādēt, un tiks reģistrēta kļūda:

```
RULE_LOADER: pakotnes "hi/filler.json" validācija neizdevās:
  - rules.0.pattern: Nederīga regulārā izteiksme
  - rules.1.context: jābūt vienai no vērtībām [all, user, system, assistant]
```

Validācija tiek palaista automātiski, kad pakotne tiek ielādēta (pret `_schema.json`); nederīga pakotne tiek noraidīta, un žurnālā tiek reģistrēta iepriekš redzamā kļūda. Pakotņu validācijai nav atsevišķa `npm run` skripta — ielādējiet pakotni (piemēram, palaidiet serveri vai izpildiet saspiešanas ceļu) un pārbaudiet žurnālus.

### Pielāgotas valodas pakotnes ielāde

```ts
import { loadRulePack } from "omniroute/compression/ruleLoader";

await loadRulePack("./my-custom-rules/hi/filler.json");
```

Vai ievietojiet to atpazītā vietā:

```
~/.omniroute/compression/rules/hi/filler.json  # Lietotāja līmenis
<project>/.compression/rules/hi/filler.json   # Projekta līmenis
```

### Valodu pakotņu paraugprakse

1. **Sāciet ar `filler`** — šīm kārtulām ir vislielākā ietekme
2. **Izmantojiet `minIntensity`**, lai ierobežotu agresīvas kārtulas — tas pasargā no pārmērīgas saspiešanas
3. **Iekļaujiet testa gadījumus** — pievienojiet JSON failam masīvu `tests[]`, lai pārbaudītu darbību
4. **Secībai ir nozīme** — agrāk norādītās kārtulas tiek lietotas pirmās; vispirms izvietojiet kārtulas ar lielāko ietekmi
5. **Esiet piesardzīgi ar `replacement`** — tukša virkne parasti ir pareizā izvēle; nekad neieviesiet jaunu saturu

### Tulkošanas stratēģija

Lokalizējot kārtulu pakotnes jaunai valodai:

1. **Tulkojiet kārtulu nosaukumus** — tie tiek parādīti atkļūdošanas izvadē
2. **Pielāgojiet regulāro izteiksmju rakstus** — tiešs tulkojums bieži nedarbojas (vārdu robežas atšķiras)
3. **Testējiet ar īstām sarunām** — pakotnei jābūt drošai, apstrādājot reālu ievadi
4. **Ņemiet vērā kultūras konvencijas** — piemēram, japāņu valodas pakotnēs ir vairāk godbijības liekvārdības konstrukciju nekā angļu valodā

---

## Saliktie konveijeri

**Saliktais konveijers** secīgi darbina vairākus dzinējus, katra dzinēja izvadi nododot nākamajam. Šādi `mode: stacked` darbojas iekšēji.

### Kā darbojas salikšana

```
Ievade (10 000 marķieru)
        │
        ▼
   ┌──────────┐
   │ Dzinējs  │  prioritāte 10
   │ A        │  ──▶ izvade: 6 000 marķieru (-40%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │ Dzinējs  │  prioritāte 50
   │ B        │  ──▶ izvade: 2 400 marķieru (-60%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │ Dzinējs  │  prioritāte 100
   │ C        │  ──▶ izvade: 1 200 marķieru (-80%)
   └────┬─────┘
        │
        ▼
Gala izvade (1 200 marķieru, kopā ietaupīti ~88%)
```

Ja ir atlasīts `mode: "stacked"`, dzinēji tiek izpildīti secīgi tādā secībā, kādā tie norādīti masīvā `pipeline`.
Dzinēja N izvade kļūst par dzinēja N+1 ievadi.

### Saspiešanas režīmi

OmniRoute katram pieprasījumam atlasa **VIENU režīmu**, pamatojoties uz konfigurāciju, automātiskās aktivizēšanas sliekšņiem un kombināciju ignorēšanas iestatījumiem.
Pieejamie režīmi ir definēti failā `open-sse/services/compression/types.ts` (tips `CompressionMode`):

| Režīms       | Dzinēji              | Lietojums                                                                                                                                                                                                                    |
| ------------ | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `off`        | Nav                  | Atspējot visu saspiešanu                                                                                                                                                                                                     |
| `rtk`        | Tikai RTK            | Sesijas ar lielu komandu izvades apjomu (vairāk nekā 80% ietaupījums)                                                                                                                                                        |
| `lite`       | Tikai Lite           | Konservatīva saspiešana (ātra, droša)                                                                                                                                                                                        |
| `standard`   | Caveman              | Prozas saspiešana ar valodu pakotnēm                                                                                                                                                                                         |
| `aggressive` | Caveman + Aggressive | Agresīva prozas saspiešana un agresīva noslēdzošā apstrāde                                                                                                                                                                   |
| `ultra`      | Ultra                | Maksimāla saspiešana (ar zudumiem, pēdējais risinājums). Ja ir iestatīts `ultra.modelPath`, pēc izvēles tiek maršrutēts caur **LLMLingua-2** SLM dzinēju (ja modelis nav pieejams, tiek izmantots kārtulās balstītais ceļš). |
| `stacked`    | Pielāgots konveijers | Dzinēju kombinēšana jebkādā secībā (skatiet tālāk)                                                                                                                                                                           |

> Papildus iepriekš minēto režīmu dzinējiem reģistrā ir iekļauti arī specializēti saliekamie dzinēji —
> **CCR**, **headroom**, **ionizer** un **session-dedup** —, kas dokumentēti failā
> [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md#additional-built-in-engines).

Režīma atlasi nosaka `getEffectiveMode()` failā `open-sse/services/compression/strategySelector.ts`:

1. Ja saspiešana ir atspējota: `"off"`
2. Ja pastāv kombinācijas ignorēšanas iestatījums: izmantot šo iestatījumu
3. Ja ir pārsniegts automātiskās aktivizēšanas slieksnis: izmantot `autoTriggerMode` (noklusējums: `"lite"`)
4. Pretējā gadījumā: izmantot `defaultMode`

### Noklusējuma saliktais konveijers

Ja `mode: "stacked"` ir konfigurēts tieši, noklusējuma konveijers apvieno:

1. **RTK** — noņem komandu izvades troksni (~80% ietaupījums termināļa izvadē)
2. **Caveman** — noņem liekvārdību un padara prozu lakoniskāku (~46% atlikušajā tekstā)
3. **Lite** — noslēdzošā atstarpju apstrāde un dublikātu noņemšana

Šī kombinācija nodrošina **78–95% ietaupījumu** sesijās ar intensīvu rīku izmantošanu.

### Salikto konveijeru konfigurēšana

Kombinācijas konfigurācijā:

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

Varat izlaist dzinējus, pievienot pielāgotus dzinējus vai mainīt to secību.

### Stāvokļa nodošana

Dzinēji var nolasīt metadatus no pieprasījuma konteksta (`options`):

```ts
compress(body, config) {
  // Nolasa metadatus no iepriekšējiem dzinējiem
  const original = options?.compressionComboId;  // "my-coding-combo"
  // ...
}
```

Metadati ir **tikai lasāmi** — dzinēji nevar mainīt pieprasījuma kontekstu, tikai sava satura izvadi.

### Izpildes secības nianses

| Dzinēju secība                          | Ietekme                                                                                        |
| --------------------------------------- | ---------------------------------------------------------------------------------------------- |
| RTK → Caveman → Lite                    | **Ieteicams** (vispirms noņem troksni, pēc tam apstrādā valodu un visbeidzot — atstarpes)      |
| Lite → RTK → Caveman                    | Slikti — Lite noņem atstarpes no neapstrādātās izvades, tādēļ RTK šablonu atbilstība neizdodas |
| Caveman → RTK                           | Slikti — Caveman var pārrakstīt tekstu tā, ka RTK to vairs neatpazīst                          |
| Jebkāda secība ar `tool_results` sākumā | Labāk — rīku izvade satur visvairāk trokšņa                                                    |

### Kad salikšanu NEIZMANTOT

Salikšana ne vienmēr ir labāka:

- **Vienkārši ziņojumi** (bez rīku izvades) — pietiek ar vienu Caveman vai Lite dzinēju
- **Ja būtiskas ir izmaksas** — katrs dzinējs palielina latentumu par ~5–50 ms
- **Konkrēti rīki** — čaulas izvadei parasti pietiek tikai ar RTK

### Pielāgota konveijera izveide

Nav nosauktu konveijeru reģistra. Salikts konveijers ir vienkārši **iekļauts soļu masīvs**, kas tiek nodots funkcijai `applyStackedCompression()` (eksportēta no `@omniroute/open-sse/services/compression/strategySelector`):

```ts
import { applyStackedCompression } from "@omniroute/open-sse/services/compression/strategySelector";

const result = applyStackedCompression(body, [
  { engine: "rtk", intensity: "aggressive" },
  { engine: "caveman", intensity: "full" },
]);
```

Ja konveijers netiek nodots, pēc noklusējuma tiek izmantots `rtk(standard) → caveman(full)`.

Lai to pārvaldītu no konfigurācijas, iestatiet `mode: "stacked"` un norādiet soļu masīvu laukā `stackedPipeline` (tiek nolasīts no `config.stackedPipeline`):

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

## Augšupstraumes sinhronizācijas politika

OmniRoute saspiešanas dzinēji README failā atsaucas uz vairākiem augšupstraumes projektiem
(„iedvesmojoties no RTK, Caveman, LLMLingua-2, Troglodita”). Biežs līdzstrādnieku
jautājums ir: **kad augšupstraumes RTK pievieno jaunu rīku filtru vai Caveman pievieno noteikumu
pakotni, kā tas nonāk OmniRoute?** Šī sadaļa sniedz autoritatīvu atbildi.

### Iekļautās kopijas un neatkarīgas implementācijas

| Dzinējs                      | Saistība ar augšupstraumi                                                                                                             | Atrašanās vieta                                                     |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **RTK**                      | **Neatkarīga atkārtota implementācija** (iedvesmota, nevis kopija)                                                                    | `open-sse/services/compression/engines/rtk/`                        |
| **Caveman**                  | **Neatkarīga atkārtota implementācija** (iedvesmota)                                                                                  | `open-sse/services/compression/engines/cavemanAdapter.ts`           |
| **Headroom**                 | Pārsvarā iekšējs; tikai `gcf/` kodeks ir **patiesi iekļauts** no `gcf-typescript` (MIT, ar SPDX marķējumu, tikai vispārīgais profils) | `open-sse/services/compression/engines/headroom/gcf/`               |
| **LLMLingua-2 / Troglodita** | Iedvesmoti risinājumi (nodrošina `llmlingua` + `session-dedup` dzinējus)                                                              | `open-sse/services/compression/engines/llmlingua/`, `session-dedup` |

Galvenais: **RTK un Caveman ir no nulles veidotas TypeScript implementācijas, kas īsteno
_idejas_ (filtru noteikumus, noteikumu pakotnes), nevis iekļauti pirmkoda koki.** Nav
augšupstraumes kopijas, no kuras izpildīt `git pull` — tieši tāpēc README ir teikts
„iedvesmojoties no”, nevis „iekļauts”.

### Kā tiek apvienoti augšupstraumes uzlabojumi

**Nav automatizētas augšupstraumes laidienu izsekošanas un nav `compression-sync`
etiķetes** — tas ir apzināti. Tā kā dzinēji ir atkārtotas implementācijas, augšupstraumes RTK
filtrs vai Caveman noteikumu pakotne netiek apvienota kā kods; tā tiek **no jauna izteikta kā jauns
noteikums/filtrs OmniRoute formātā** (skatiet
[COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md)) un tiek pievienota pēc vajadzības,
izmantojot parastu PR. Iepriekš minētie paplašinājuma punkti (pielāgots dzinējs, valodas pakotne, RTK filtrs)
ir oficiāli apstiprinātais veids, kā tādu pievienot.

Nesenie tieši šīs plūsmas piemēri:

- RTK filtri Gradle un `dotnet` būvējuma izvadei (v3.8.42)
- RTK filtri kubectl / docker-build / composer / gh (#2824)
- Caveman indonēziešu valodas pakotne (#3975), kā arī vācu / franču / japāņu / ķīniešu valodas pakotnes

### Headroom (ievades saspiešanas starpniekserveris)

Headroom ir **pilnībā iekšējs** — fiksēta iekļautā `gcf` kodeka momentuzņēmuma versija kopā ar
OmniRoute paša `smartcrusher` / `toon` / `tabular` slāņiem. Nav aktīvas
augšupstraumes, ko izsekot ārpus iekļautās kopijas; `gcf` atjauninājumi tiek
manuāli atsvaidzināti, kad kodeks mainās, un atkārtoti validēti pret saspiešanas budžeta
kontroli (`check:compression-budget`).

### Augšupstraumes iedvesmota uzlabojuma ierosināšana

1. **Neiekļaujiet ārēju kopiju** — no jauna izsakiet augšupstraumes noteikumu/filtru OmniRoute formātā.
2. Pievienojiet to, izmantojot tālāk norādīto atbilstošo paplašinājuma punktu (valodas pakotni, RTK filtru vai
   pielāgotu dzinēju).
3. PR aprakstā norādiet atsauci uz augšupstraumes projektu (autortiesību atzīšanai), nevis
   kopējiet tā licencēto pirmkodu.
4. Iekļaujiet testus un apstipriniet, ka `check:compression-budget` kontrole joprojām tiek sekmīgi izpildīta.

---

## Izvades stila pievienošana

Izvades stili (skatiet [rokasgrāmatas kataloga tabulu](./COMPRESSION_GUIDE.md#output-styles-catalog))
ir ievades dziņu analogs atbildes pusē: tā vietā, lai saspiestu jūsu
sūtīto saturu, tie norāda modelim veidot ekonomiskāku izvadi. Reģistrs ir
`OUTPUT_STYLE_CATALOG` failā `open-sse/services/compression/outputStyles/catalog.ts`, un
**viens kataloga ieraksts ir visa funkcionalitāte**: injektors, informācijas paneļa iestatījumu panelis,
noturīgā glabāšana un telemetrija izmanto kataloga uzskaitījumu — nav neviena cita saraksta, kas būtu jāatjaunina.

1. **Pievienojiet vienu ierakstu `OUTPUT_STYLE_CATALOG`** ar `id`, `label`, `description` un
   trim līmeņiem angļu valodā (`lite`, `full`, `ultra`). Katram līmenim jābeidzas ar
   `${SHARED_BOUNDARIES}`, lai kods, ceļi, komandas, kļūdas un URL paliktu nemainīti.
   Instrukcijas tekstam jābūt **statiskam un deterministiskam** katrai
   `(id, level, language)` kombinācijai — `${SHARED_BOUNDARIES}` ir vienīgā atļautā interpolācija.
2. **Iztulkojiet to.** Iekļaujiet vismaz `pt-BR` bloku zem `i18n`; `ponytail` un
   `i-have-adhd` (en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi) ir struktūras paraugi. Apzināti
   vienas valodas stilam tā vietā iestatiet `locale` (piemēram, `terse-cjk` → `zh`), un tad tas
   tiek piedāvāts tikai šajā lokalizācijā.
3. **Atjauniniet matricas aizsargtestu** — pievienojiet stila valodas `BASELINE_LANGUAGES` failā
   `tests/unit/compression/output-styles-i18n-matrix.test.ts`. Pārbaude noraida jebkuru jaunu
   stilu, kas nav ierobežots ar lokalizāciju un kam trūkst nepieciešamo tulkojumu, ja vien tam nav
   skaidri norādīta `KNOWN_ENGLISH_ONLY` vērtība ar izsekošanas pieteikumu.
4. **Pievienojiet katram stilam atsevišķu testu**, par paraugu izmantojot
   `tests/unit/compression/i-have-adhd-catalog.test.ts`: kataloga struktūra, robežu
   klauzula katram līmenim un enkura pārbaude, kas apliecina, ka katrs tulkojums ir rakstīts attiecīgajā
   valodā, nevis nokopēts no angļu valodas.
5. **Attiecinājums**: ja stils ir pielāgots no augšupstraumes projekta, norādiet tā autorību
   avota komentārā pie ieraksta (piemēram, `i-have-adhd` → ayghri/i-have-adhd, MIT) — tas pats
   noteikums, kas minēts iepriekš sadaļā "Augšupstraumes projekta iedvesmota uzlabojuma ierosināšana".

Nav nepieciešamas lietotāja saskarnes, shēmas vai telemetrijas izmaiņas — šie komponenti tiek atveidoti no kataloga.

---

## Labākā prakse

### Dziņu izstrāde

1. **Vienmēr implementējiet `validateConfig`** — dziņi bez validācijas izraisa nemanāmas kļūmes
2. **Iestatiet reālistisku `targetLatencyMs`** — stratēģijas atlasītājs to izmanto dziņu izvēlei
3. **Informācijas panelim izmantojiet `getConfigSchema`** — nekad neslēpiet konfigurāciju no lietotājiem
4. **Atbalstiet `stackable: true`, ja jūsu dzinis ir tīrs** — dziņus ar blakusefektiem nevajadzētu kombinēt
5. **Rakstiet iekļautos testus** — dziņiem jābūt pārbaudāmiem <1s laikā

### Valodu pakotņu izstrāde

1. **Sāciet ar `lite` intensitāti** — jūsu noteikumiem jābūt drošiem zemākajā iestatījumā
2. **Izmantojiet `context`, lai ierobežotu noteikumu tvērumu** — tikai `user` paredzēti noteikumi nevar nejauši ietekmēt sistēmas uzvednes
3. **Izvairieties tvert JSON atslēgas** — `\\bword\\b` var atrast atbilstību JSON iekšienē, sabojājot strukturētos datus
4. **Testējiet robežgadījumus** — tukšu ievadi, unikodu, RTL tekstu, emocijzīmes
5. **Izmantojiet esošās pakotnes kā veidnes** — `en/filler.json` ir vispilnīgāk izstrādātais piemērs

### Konveijera izstrāde

1. **Veiciet profilēšanu pirms optimizācijas** — vispirms veiciet mērījumus ar `compression_stats`
2. **Dodiet priekšroku kompozīcijai, nevis atkārtotai implementācijai** — paplašiniet Caveman noteikumus, pirms rakstāt jaunu dzini
3. **Dokumentējiet secības pamatojumu** — komentārā paskaidrojiet, kāpēc dzinis A ir pirms dziņa B
4. **Testējiet visos 3 intensitātes līmeņos** — `lite` ir ātrs, bet ar zudumiem, savukārt `ultra` ir lēns, bet precīzs

---

## Atsauce: iebūvētie dzinēji

| Dzinēja ID           | Kombinējams | Noklusējuma stackPriority | Mērķi                                |
| -------------------- | ----------- | ------------------------- | ------------------------------------ |
| `lite`               | Jā          | 5                         | ziņojumi, rīku_rezultāti             |
| `rtk`                | Jā          | 10                        | rīku_rezultāti                       |
| `standard` (caveman) | Jā          | 20                        | ziņojumi, rīku_rezultāti, koda_bloki |
| `aggressive`         | Jā          | 30                        | ziņojumi                             |
| `ultra`              | Jā          | 40                        | ziņojumi, koda_bloki                 |

### Skatiet arī

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Konveijera pārskats
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Dzinēju reģistra atsauce
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Kārtulu formāta specifikācija
- [COMPRESSION_LANGUAGE_PACKS.md](./COMPRESSION_LANGUAGE_PACKS.md) — Informācija par valodu pakotnēm
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK dzinējs un pielāgoti filtri
- Avots: `open-sse/services/compression/` (117 faili, ~250 KB)
