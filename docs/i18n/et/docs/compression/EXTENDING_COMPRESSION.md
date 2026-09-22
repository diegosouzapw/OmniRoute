# Extending the Compression Pipeline (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/EXTENDING_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/EXTENDING_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/EXTENDING_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/EXTENDING_COMPRESSION.md)

---

> **Lühidalt**: OmniRoute'i tihendusmootor on **laiendatav** — saate registreerida kohandatud mootoreid, tarnida uute keelte keelepakette ja koostada mitmest etapist koosnevaid konveiereid. See juhend näitab, kuidas seda teha.

**Seotud juhendid:**

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Täielik konveieri ülevaade
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Mootorite register ja sisseehitatud mootorid
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK-mootor ja kohandatud filtrid
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Reeglipaki vormingu viide

---

## Ülevaade

Tihendussüsteemil on **3 laienduspunkti**:

| Laienduspunkt            | Kasutusjuht                                                            | Raskusaste |
| ------------------------ | ---------------------------------------------------------------------- | ---------- |
| **Kohandatud mootor**    | Täiesti uue tihendusalgoritmi lisamine (nt valdkonnapõhine kokkuvõtja) | Keeruline  |
| **Keelepakett**          | Uue loomuliku keele toe lisamine (nt hindi või araabia keel)           | Keskmine   |
| **Virnastatud konveier** | Olemasolevate mootorite kombineerimine kohandatud järjekorras          | Lihtne     |

```
┌─────────────────────────────────────────────────────────────┐
│                     Tihendusstrateegia                       │
│                                                              │
│   Sisendsõnumid ──▶ getEffectiveMode() ──▶ režiim           │
│                                              │               │
│                      ┌───────────────────────┼──────────┐    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   "rtk"    "lite"   "standard" "stacked"    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   RTK       Lite     Caveman   engines[]   │
│                   mootor    mootor   mootor    ahelana     │
│                      │         │         │         │    │    │
│                      └─────────┴─────────┴─────────┘    │    │
│                                      │                    │
│                                      ▼                    │
│                              Tihendatud väljund            │
└─────────────────────────────────────────────────────────────┘

Strateegia valik on REŽIIMIPÕHINE: iga päring valib ÜHE režiimi
(rtk / lite / standard / aggressive / ultra / stacked / off).
Ainult režiim "stacked" aheldab mitu mootorit järjestikku.
Automaatse käivitamise vaikerežiim on "lite" (mitte kolmeastmeline prioriteediahel).
```

---

## Kohandatud tihendusmootori loomine

Mootori liides (`open-sse/services/compression/engines/types.ts`) on leping, millele iga mootor peab vastama. Sellel on 5 kohustuslikku meetodit.

### Liides `CompressionEngine`

```ts
interface CompressionEngine {
  id: string; // Mootori kordumatu ID
  name: string; // Kuvatav nimi
  description: string; // Lühikirjeldus
  icon: string; // Ikoon (emoji või URL)
  targets: CompressionEngineTarget[]; // ["messages", "tool_results", "code_blocks"]
  stackable: boolean; // Kas seda saab kasutada virnastatud konveieris
  stackPriority: number; // Järjekord virnastatud konveierites (väiksem = varasem)
  metadata: CompressionEngineMetadata;

  apply(body, options?): CompressionResult;
  compress(body, config?): CompressionResult;
  getConfigSchema(): EngineConfigField[];
  validateConfig(config): EngineValidationResult;
}
```

### Minimaalne näide: tühikumärkide mootor

Lihtsaim võimalik mootor — eemaldab sõnumitest üleliigsed tühikumärgid.

````ts
import type { CompressionEngine } from "omniroute/compression/engines/types";
import { registerCompressionEngine } from "omniroute/compression/engines/registry";

function preserveCodeBlocks(text: string): string {
  // Tükelda koodiplokkide tähiste järgi ja säilita nende sees olevad tühikud
  const parts = text.split(/(```[\s\S]*?```)/);
  return parts
    .map((part) => {
      if (part.startsWith("```")) {
        return part; // Ära muuda koodiplokke
      }
      return part.replace(/\n{3,}/g, "\n\n"); // Rakenda ainult proosale
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
  stackPriority: 100, // Käivita PÄRAST caveman/rtk-d

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

    // Läbi sõnumite massiiv — töötle nii sõne- kui ka mitmeosalise sisuga sõnumeid
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
      // Mitmeosaline sisu: läbi osad, tihenda ainult tekstiosi
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
          return part; // säilita image_url, tool_use jne
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

// Registreeri globaalselt
registerCompressionEngine(whitespaceEngine);
````

### Kuhu kohandatud mootorid paigutada

```
~/.omniroute/compression/engines/my-engine.ts    # Kasutaja tasand
<project>/compression-engines/my-engine.ts        # Projekti tasand (laaditakse käivitamisel)
```

Või laadi pistikprogrammist programmiliselt:

```ts
// Sinu pistikprogrammis
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "@omniroute/open-sse/services/compression/engines/registry";
import { myEngine } from "./engines/my-engine";

export default definePlugin({
  name: "my-compression-plugin",
  // Pistikprogrammi SDK pakub onRequest / onResponse / onError haake. Registreeri
  // mootor pistikprogrammi mooduli laadimisel (või esimesel onRequest-kutsel); eemalda selle
  // registreering enda sulgemisprotsessis.
  onRequest: async (ctx) => {
    registerCompressionEngine(myEngine);
  },
});

// Sulgemisel:
// unregisterCompressionEngine("my-engine");
```

### Mootori testimine

Registreeri oma mootor pistikprogrammis või käivitusfunktsioonis. Pärast registreerimist on mootor
strateegia valijas selle `id` kaudu saadaval. Testi integratsiooni, kombineerides selle virnastatud konveieris:

---

## Keelepakettide loomine

Caveman-stiilis tihendamine kasutab **keelespetsiifilisi reeglipakette**, et käsitleda iga loomuliku keele täitesõnu, ebakindlust väljendavaid fraase ja paljusõnalisi mustreid. OmniRoute sisaldab **6 keelepaketti**: `en`, `es`, `fr`, `de`, `ja`, `pt-BR`.

### Paketi struktuur

Keelepakett on **JSON-failide** kataloog asukohas `open-sse/services/compression/rules/<language>/`:

```
open-sse/services/compression/rules/
├── en/
│   ├── filler.json          # Viisakusväljendid, ebakindlad sõnastused, viisakus
│   ├── context.json         # Konteksti vähendavad reeglid
│   ├── dedup.json           # Duplikaatide eemaldamise reeglid
│   ├── structural.json      # Kirjavahemärgid, vormindus
│   └── ultra.json           # Agressiivse tihendamise reeglid
├── es/  (sama struktuur)
├── fr/  (sama struktuur)
├── de/  (sama struktuur)
├── ja/  (sama struktuur)
└── pt-BR/ (sama struktuur)
```

### Reegli ülesehitus

Igal reeglil on järgmine kuju (failist `open-sse/services/compression/ruleLoader.ts`):

```ts
interface FileRule {
  name: string; // Inimloetav nimi (kebab-case)
  pattern: string; // JavaScripti regulaaravaldise muster
  replacement?: string; // Millega vaste asendada
  replacementMap?: Record<string, string>; // VÕI võtme→asenduse vastendus
  flags?: string; // Regulaaravaldise lipud (tavaliselt "gi")
  context?: "all" | "user" | "system" | "assistant";
  category?: "filler" | "context" | "structural" | "dedup" | "terse" | "ultra";
  minIntensity?: "lite" | "full" | "ultra"; // Jäta sellest intensiivsusest madalamal tasemel vahele
  description?: string; // Dokumentatsioon
}
```

### Näide: hindi keele täitesõnareeglite lisamine

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

### Valideerimine

Reeglipakette valideeritakse laadimisel `_schema.json` alusel. Vigase struktuuriga paketi laadimine ebaõnnestub ja logisse kirjutatakse tõrge:

```
RULE_LOADER: pack "hi/filler.json" failed validation:
  - rules.0.pattern: Invalid regex
  - rules.1.context: must be one of [all, user, system, assistant]
```

Valideerimine käivitub paketi laadimisel automaatselt (`_schema.json` alusel); vigane pakett lükatakse tagasi ja ülaltoodud tõrge kirjutatakse logisse. Pakettide valideerimiseks ei ole eraldi `npm run` skripti — laadige pakett (nt käivitage server või kasutage tihendamise töövoogu) ja jälgige logisid.

### Kohandatud keelepaketi laadimine

```ts
import { loadRulePack } from "omniroute/compression/ruleLoader";

await loadRulePack("./my-custom-rules/hi/filler.json");
```

Või paigutage see tuvastatud asukohta:

```
~/.omniroute/compression/rules/hi/filler.json  # Kasutaja tasemel
<project>/.compression/rules/hi/filler.json   # Projekti tasemel
```

### Keelepakettide parimad tavad

1. **Alustage kategooriast `filler`** — need reeglid avaldavad suurimat mõju
2. **Kasutage agressiivsete reeglite piiramiseks välja `minIntensity`** — see kaitseb liigse tihendamise eest
3. **Lisage testjuhud** — käitumise kontrollimiseks lisage JSON-i massiiv `tests[]`
4. **Järjekord on oluline** — varasemad reeglid rakenduvad esimesena; paigutage suure mõjuga reeglid ettepoole
5. **Olge väärtusega `replacement` konservatiivne** — tühi string on tavaliselt õige; ärge kunagi lisage uut sisu

### Tõlkestrateegia

Reeglipakettide lokaliseerimisel uude keelde:

1. **Tõlkige reeglite nimed** — need kuvatakse silumisväljundis
2. **Kohandage regulaaravaldiste mustreid** — otsetõlge sageli ei tööta (sõnapiirid erinevad)
3. **Testige tegelike vestlustega** — pakett peab olema pärissisendi puhul turvaline
4. **Järgige kultuurilisi tavasid** — näiteks jaapani keele pakettides on rohkem austust väljendavaid täitefraase kui inglise keeles

---

## Virnastatud konveierid

**Virnastatud konveier** käitab mitut mootorit järjestikku, kusjuures iga mootori väljund suunatakse järgmise mootori sisendiks. Nii töötab `mode: stacked` sisemiselt.

### Kuidas virnastamine töötab

```
Sisend (10 000 tokenit)
        │
        ▼
   ┌──────────┐
   │  Mootor  │  prioriteet 10
   │  A       │  ──▶ väljund: 6000 tokenit (-40%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  Mootor  │  prioriteet 50
   │  B       │  ──▶ väljund: 2400 tokenit (-60%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  Mootor  │  prioriteet 100
   │  C       │  ──▶ väljund: 1200 tokenit (-80%)
   └────┬─────┘
        │
        ▼
Lõppväljund (1200 tokenit, kokku ~88% säästu)
```

Kui valitud on `mode: "stacked"`, käivitatakse mootorid järjestikku massiivis `pipeline` määratud järjekorras.
Mootori N väljundist saab mootori N+1 sisend.

### Tihendusrežiimid

OmniRoute valib konfiguratsiooni, automaatse käivitamise lävendite ja kombinatsioonide alistuste põhjal **IGA PÄRINGU KOHTA ÜHE režiimi**.
Saadaolevad režiimid on määratletud failis `open-sse/services/compression/types.ts` (tüüp `CompressionMode`):

| Režiim       | Mootorid             | Kasutusjuht                                                                                                                                                                                                       |
| ------------ | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `off`        | Puuduvad             | Keela igasugune tihendamine                                                                                                                                                                                       |
| `rtk`        | Ainult RTK           | Käsuväljundirohked seansid (üle 80% säästu)                                                                                                                                                                       |
| `lite`       | Ainult Lite          | Konservatiivne tihendamine (kiire ja ohutu)                                                                                                                                                                       |
| `standard`   | Caveman              | Proosa tihendamine keelepakettide abil                                                                                                                                                                            |
| `aggressive` | Caveman + Aggressive | Agressiivne proosa tihendamine + agressiivne lõppvoor                                                                                                                                                             |
| `ultra`      | Ultra                | Maksimaalne tihendamine (kadudega, viimane abinõu). Kui `ultra.modelPath` on määratud, saab selle valikuliselt suunata läbi SLM-mootori **LLMLingua-2** (kui mudel pole saadaval, jätkatakse reeglipõhise teega). |
| `stacked`    | Kohandatud konveier  | Koosta mootoritest suvalises järjekorras konveier (vt allpool)                                                                                                                                                    |

> Lisaks eespool nimetatud režiimimootoritele sisaldab register ka spetsiaalseid virnastatavaid mootoreid —
> **CCR**, **headroom**, **ionizer** ja **session-dedup** — mida kirjeldatakse failis
> [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md#additional-built-in-engines).

Režiimivaliku määrab funktsioon `getEffectiveMode()` failis `open-sse/services/compression/strategySelector.ts`:

1. Kui tihendamine on keelatud: `"off"`
2. Kui kombinatsiooni alistus on olemas: kasuta alistust
3. Kui automaatse käivitamise lävend on ületatud: kasuta `autoTriggerMode` (vaikimisi: `"lite"`)
4. Muul juhul: kasuta `defaultMode`

### Vaikimisi virnastatud konveier

Kui `mode: "stacked"` on sõnaselgelt konfigureeritud, koosneb vaikekonveier järgmistest etappidest:

1. **RTK** — eemaldab käsuväljundist müra (~80% säästu terminaliväljundi puhul)
2. **Caveman** — eemaldab täitesõnad ja muudab proosa lakoonilisemaks (~46% ülejäänud tekstist)
3. **Lite** — viimane tühimärkide korrastamise ja duplikaatide eemaldamise voor

See kombinatsioon saavutab tööriistarohketes seanssides **78–95% säästu**.

### Virnastatud konveierite konfigureerimine

Kombinatsiooni konfiguratsioonis:

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

Võid mootoreid välja jätta, lisada kohandatud mootoreid või muuta nende järjekorda.

### Oleku edastamine

Mootorid saavad lugeda päringu kontekstist metaandmeid (objektis `options`):

```ts
compress(body, config) {
  // Eelmiste mootorite metaandmete lugemine
  const original = options?.compressionComboId;  // "my-coding-combo"
  // ...
}
```

Metaandmed on **kirjutuskaitstud** — mootorid ei saa päringu konteksti muuta, vaid ainult enda kehaväljundit.

### Käivitusjärjekorra ohukohad

| Mootorite järjekord                               | Mõju                                                                                         |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| RTK → Caveman → Lite                              | **Soovitatav** (esmalt eemaldatakse müra, seejärel töödeldakse keelt ja lõpuks tühimärke)    |
| Lite → RTK → Caveman                              | Halb — Lite eemaldab toorväljundist tühimärgid, mistõttu RTK mustrite sobitamine ebaõnnestub |
| Caveman → RTK                                     | Halb — Caveman võib teksti ümber kirjutada viisil, mida RTK ei tuvasta                       |
| Suvaline järjekord, kus `tool_results` on esimene | Parem — tööriistade väljund on kõige mürarikkam sisu                                         |

### Millal EI TASU mootoreid virnastada

Virnastamine pole alati parem:

- **Lihtsad sõnumid** (ilma tööriistaväljundita) — piisab ainult Cavemanist või Litest
- **Kulutundlikud olukorrad** — iga mootor lisab ~5–50 ms latentsust
- **Konkreetsed tööriistad** — kestaväljundi jaoks piisab tavaliselt ainult RTK-st

### Kohandatud konveieri loomine

Nimega konveierite registrit ei ole. Virnastatud konveier on lihtsalt **sammude tekstisisene massiiv**, mis edastatakse funktsioonile `applyStackedCompression()` (eksporditud paketist `@omniroute/open-sse/services/compression/strategySelector`):

```ts
import { applyStackedCompression } from "@omniroute/open-sse/services/compression/strategySelector";

const result = applyStackedCompression(body, [
  { engine: "rtk", intensity: "aggressive" },
  { engine: "caveman", intensity: "full" },
]);
```

Kui konveierit ei edastata, kasutatakse vaikimisi väärtust `rtk(standard) → caveman(full)`.

Selle seadistuse kaudu juhtimiseks määrake `mode: "stacked"` ja lisage sammude massiiv võtme `stackedPipeline` alla (loetakse väljast `config.stackedPipeline`):

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

## Upstream-projektidega sünkroonimise põhimõtted

OmniRoute'i tihendusmootorite README-s on tunnustatud mitut upstream-projekti
(„inspireeritud projektidest RTK, Caveman, LLMLingua-2, Troglodita“). Kaastöötajate
levinud küsimus on: **kui upstream-projekt RTK lisab uue tööriistafiltri või Caveman lisab
reeglipaketi, kuidas jõuab see OmniRoute'i?** See jaotis annab autoriteetse vastuse.

### Kaasatud koopiad vs. sõltumatud teostused

| Mootor                       | Seos upstream-projektiga                                                                                                                           | Asukoht                                                             |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **RTK**                      | **Sõltumatu uusteostus** (inspireeritud, mitte koopia)                                                                                             | `open-sse/services/compression/engines/rtk/`                        |
| **Caveman**                  | **Sõltumatu uusteostus** (inspireeritud)                                                                                                           | `open-sse/services/compression/engines/cavemanAdapter.ts`           |
| **Headroom**                 | Peamiselt sisemine; ainult `gcf/` koodek on **tegelikult kaasatud koopia** projektist `gcf-typescript` (MIT, SPDX-märgistusega, ainult üldprofiil) | `open-sse/services/compression/engines/headroom/gcf/`               |
| **LLMLingua-2 / Troglodita** | Inspireeritud (nende põhjal töötavad mootorid `llmlingua` + `session-dedup`)                                                                       | `open-sse/services/compression/engines/llmlingua/`, `session-dedup` |

Põhipunkt: **RTK ja Caveman on _ideede_ (filtrireeglite, reeglipakettide)
puhasruumi TypeScripti-teostused, mitte kaasatud lähtekoodipuud.** Puudub
upstream-koopia, millest saaks teha `git pull` — just seepärast ütleb README
„inspireeritud“, mitte „kaasas“.

### Kuidas upstream-projektide täiustused liidetakse

**Upstream-väljalasete automaatne jälgimine puudub ja silti `compression-sync`
ei ole** — see on taotluslik. Kuna mootorid on uusteostused, ei liideta upstream-projekti RTK
filtrit või Cavemani reeglipaketti koodina; see **väljendatakse uuesti OmniRoute'i
enda vormingus uue reegli/filtrina** (vt
[COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md)) ja lisatakse vajaduspõhiselt
tavalise PR-i kaudu. Eespool kirjeldatud laienduspunktid (kohandatud mootor, keelepakett, RTK filter)
on selle lisamiseks ametlikult toetatud viisid.

Selle töövoo hiljutised näited:

- RTK filtrid Gradle'i ja `dotnet`-i koosteväljundi jaoks (v3.8.42)
- RTK filtrid kubectl / docker-build / composer / gh jaoks (#2824)
- Cavemani indoneesia keelepakett (#3975) ning saksa / prantsuse / jaapani / hiina keelepaketid

### Headroom (sisendi tihendamise puhverserver)

Headroom on **täielikult sisemine** — fikseeritud versiooniga kaasatud `gcf`-koodeki hetktõmmis koos
OmniRoute'i enda kihtidega `smartcrusher` / `toon` / `tabular`. Peale kaasatud koopia
pole ühtegi aktiivset upstream-projekti, mida jälgida; `gcf`-i värskendatakse koodeki muutumisel
käsitsi ja valideeritakse uuesti tihenduseelarve kontrolli
(`check:compression-budget`) suhtes.

### Upstream-projektist inspireeritud täiustuse pakkumine

1. **Ärge kaasake koopiat** — väljendage upstream-projekti reegel/filter uuesti OmniRoute'i vormingus.
2. Lisage see allpool oleva sobiva laienduspunkti kaudu (keelepakett, RTK filter või
   kohandatud mootor).
3. Viidake PR-i kirjelduses upstream-projektile (allika tunnustamiseks), selle asemel et
   kopeerida litsentsiga kaitstud lähtekoodi.
4. Lisage testid ja veenduge, et kontroll `check:compression-budget` läbib endiselt edukalt.

---

## Väljundstiili lisamine

Väljundstiilid (vt [juhendi kataloogitabelit](./COMPRESSION_GUIDE.md#output-styles-catalog))
on sisendimootorite vaste vastuse poolel: selle asemel et tihendada seda, mida
saadate, juhendavad need mudelit odavamat väljundit looma. Register on
`OUTPUT_STYLE_CATALOG` failis `open-sse/services/compression/outputStyles/catalog.ts` ning
**üks kataloogikirje moodustab kogu funktsionaalsuse**: sisestaja, töölaua seadete paneel,
püsivus ja telemeetria loendavad kõik kataloogi — ühtegi muud loendit pole vaja uuendada.

1. **Lisage üks kirje kataloogi `OUTPUT_STYLE_CATALOG`** väljadega `id`, `label`, `description` ja
   kolme ingliskeelse tasemega `levels` (`lite`, `full`, `ultra`). Iga tase peab lõppema
   väärtusega `${SHARED_BOUNDARIES}`, et kood, teed, käsud, vead ja URL-id jääksid muutmata.
   Juhise tekst peab olema iga kombinatsiooni
   `(id, level, language)` puhul **staatiline ja deterministlik** — `${SHARED_BOUNDARIES}` on ainus lubatud interpolatsioon.
2. **Tõlkige see.** Lisage võtme `i18n` alla vähemalt plokk `pt-BR`; `ponytail` ja
   `i-have-adhd` (en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi) on võrdluskujuks. Taotluslikult
   ühekeelne stiil määrab selle asemel välja `locale` (nagu `terse-cjk` → `zh`) ja seda
   pakutakse siis ainult selle lokaadi puhul.
3. **Uuendage maatriksikontrolli** — lisage stiili keeled muutujasse `BASELINE_LANGUAGES` failis
   `tests/unit/compression/output-styles-i18n-matrix.test.ts`. Kontroll tõrjub kõik uued
   lokaadiga piiramata stiilid, millel puuduvad nõutavad tõlked, välja arvatud juhul, kui nendega kaasneb
   selgesõnaline `KNOWN_ENGLISH_ONLY` kirje koos jälgimisprobleemiga.
4. **Lisage stiilipõhine test**, mille eeskujuks on
   `tests/unit/compression/i-have-adhd-catalog.test.ts`: kataloogi struktuur, piiranguklausel
   iga taseme kohta ning kontrollväide, mis kinnitab, et iga tõlge on kirjutatud oma keeles,
   mitte kopeeritud inglise keelest.
5. **Omistamine**: kui stiil on kohandatud mõnest ülesvooluprojektist, märkige algallikas
   kirje lähtekoodikommentaaris (nt `i-have-adhd` → ayghri/i-have-adhd, MIT) — kehtib sama
   reegel nagu eespool jaotises „Ülesvoolust inspireeritud täiustuse pakkumine“.

Kasutajaliidest, skeemi ega telemeetriat pole vaja muuta — need pinnad renderdatakse kataloogist.

---

## Parimad tavad

### Mootori arendamine

1. **Rakendage alati `validateConfig`** — valideerimiseta mootorid põhjustavad vaikseid tõrkeid
2. **Määrake realistlik `targetLatencyMs`** — strateegiavalija kasutab seda mootorite valimiseks
3. **Kasutage töölaua jaoks funktsiooni `getConfigSchema`** — ärge kunagi peitke konfiguratsiooni kasutajate eest
4. **Toetage valikut `stackable: true`, kui teie mootor on puhas** — kõrvalmõjudega mootoreid ei tohiks virnastada
5. **Kirjutage tekstisisesed testid** — mootoreid peaks saama kontrollida vähem kui 1 sekundiga

### Keelepaketi arendamine

1. **Alustage intensiivsusega `lite`** — teie reeglid peaksid olema madalaima seadistuse korral ohutud
2. **Kasutage reeglite ulatuse määramiseks välja `context`** — ainult väärtusega `user` reeglid ei saa kogemata süsteemiviipasid mõjutada
3. **Vältige JSON-võtmete hõivamist** — `\\bword\\b` võib leida vaste JSON-i seest ja rikkuda struktureeritud andmed
4. **Testige piirjuhtudega** — tühi sisend, Unicode, RTL-tekst, emodžid
5. **Kasutage olemasolevaid pakette mallidena** — `en/filler.json` on kõige põhjalikumalt arendatud näide

### Konveieri kujundamine

1. **Profileerige enne optimeerimist** — mõõtke esmalt väärtusega `compression_stats`
2. **Eelistage uuesti rakendamisele kompositsiooni** — enne uue mootori kirjutamist laiendage Cavemani reegleid
3. **Dokumenteerige järjestuse põhjendus** — kommenteerige, miks mootor A eelneb mootorile B
4. **Testige kõigil kolmel intensiivsustasemel** — `lite` on kiire, kuid kadudega, `ultra` on aeglane, kuid täpne

---

## Viide: sisseehitatud mootorid

| Mootori ID           | Virnastatav | Vaikimisi stackPriority | Sihtmärgid                               |
| -------------------- | ----------- | ----------------------- | ---------------------------------------- |
| `lite`               | Jah         | 5                       | sõnumid, tööriistatulemused              |
| `rtk`                | Jah         | 10                      | tööriistatulemused                       |
| `standard` (caveman) | Jah         | 20                      | sõnumid, tööriistatulemused, koodiplokid |
| `aggressive`         | Jah         | 30                      | sõnumid                                  |
| `ultra`              | Jah         | 40                      | sõnumid, koodiplokid                     |

### Vaata ka

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Konveieri ülevaade
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Mootoriregistri viide
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Reeglivormingu spetsifikatsioon
- [COMPRESSION_LANGUAGE_PACKS.md](./COMPRESSION_LANGUAGE_PACKS.md) — Keelepakettide üksikasjad
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK-mootor ja kohandatud filtrid
- Lähtekood: `open-sse/services/compression/` (117 faili, ~250 KB)
