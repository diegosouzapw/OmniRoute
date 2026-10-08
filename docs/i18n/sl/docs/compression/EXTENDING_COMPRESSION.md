# Extending the Compression Pipeline (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/EXTENDING_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇦 [bs](../../../bs/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/EXTENDING_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/EXTENDING_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/EXTENDING_COMPRESSION.md)

---

> **Na kratko**: Mehanizem stiskanja OmniRoute je **razširljiv** — registrirate lahko lastne mehanizme, distribuirate jezikovne pakete za nove jezike in sestavljate večstopenjske cevovode. Ta vodnik prikazuje, kako.

**Sorodni vodniki:**

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Celoten pregled cevovoda
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Register mehanizmov in vgrajeni mehanizmi
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — Mehanizem RTK in filtri po meri
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Referenca oblike paketov pravil

---

## Pregled

Sistem stiskanja ima **3 razširitvene točke**:

| Razširitvena točka        | Primer uporabe                                                                        | Zahtevnost |
| ------------------------- | ------------------------------------------------------------------------------------- | ---------- |
| **Mehanizem po meri**     | Dodajanje povsem novega algoritma stiskanja (npr. domensko specifičnega povzemalnika) | Napredno   |
| **Jezikovni paket**       | Dodajanje podpore za nov naravni jezik (npr. hindijščino ali arabščino)               | Srednje    |
| **Večstopenjski cevovod** | Združevanje obstoječih mehanizmov v vrstnem redu po meri                              | Začetno    |

```
┌─────────────────────────────────────────────────────────────┐
│                    Strategija stiskanja                      │
│                                                              │
│   Vhodna sporočila ──▶ getEffectiveMode() ──▶ način         │
│                                              │               │
│                      ┌───────────────────────┼──────────┐    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   "rtk"    "lite"   "standard" "stacked"    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   RTK       Lite     Caveman   engines[]   │
│                   mehanizem mehanizem mehanizem povezani   │
│                      │         │         │         │    │    │
│                      └─────────┴─────────┴─────────┘    │    │
│                                      │                    │
│                                      ▼                    │
│                              Stisnjen izhod                 │
└─────────────────────────────────────────────────────────────┘

Izbirnik strategije TEMELJI NA NAČINU: vsaka zahteva izbere EN način
(rtk / lite / standard / aggressive / ultra / stacked / off).
Samo način "stacked" verižno poveže več mehanizmov.
Privzeti način samodejnega proženja je "lite" (in ne tristopenjska prednostna veriga).
```

---

## Pisanje mehanizma stiskanja po meri

Vmesnik mehanizma (`open-sse/services/compression/engines/types.ts`) je pogodba, ki jo mora izpolnjevati vsak mehanizem. Ima 5 obveznih metod.

### Vmesnik `CompressionEngine`

```ts
interface CompressionEngine {
  id: string; // Enolični ID mehanizma
  name: string; // Prikazno ime
  description: string; // Kratek opis
  icon: string; // Ikona (emoji ali URL)
  targets: CompressionEngineTarget[]; // ["messages", "tool_results", "code_blocks"]
  stackable: boolean; // Ali se lahko uporablja v večstopenjskem cevovodu
  stackPriority: number; // Vrstni red v večstopenjskih cevovodih (nižja vrednost = prej)
  metadata: CompressionEngineMetadata;

  apply(body, options?): CompressionResult;
  compress(body, config?): CompressionResult;
  getConfigSchema(): EngineConfigField[];
  validateConfig(config): EngineValidationResult;
}
```

### Minimalni primer: mehanizem za presledke

Najpreprostejši možni mehanizem — iz sporočil odstrani odvečne presledke.

````ts
import type { CompressionEngine } from "omniroute/compression/engines/types";
import { registerCompressionEngine } from "omniroute/compression/engines/registry";

function preserveCodeBlocks(text: string): string {
  // Razdeli po označevalcih kodnih blokov in ohrani presledke znotraj njih
  const parts = text.split(/(```[\s\S]*?```)/);
  return parts
    .map((part) => {
      if (part.startsWith("```")) {
        return part; // Ne spreminjaj kodnih blokov
      }
      return part.replace(/\n{3,}/g, "\n\n"); // Uporabi samo za besedilo
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
  stackPriority: 100, // Zaženi PO caveman/rtk

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

    // Preišči polje sporočil — obravnavaj tako vsebino v obliki niza kot večdelno vsebino
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
      // Večdelna vsebina: preišči dele in stisni samo besedilne dele
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
          return part; // ohrani image_url, tool_use itd.
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

// Registriraj globalno
registerCompressionEngine(whitespaceEngine);
````

### Kam umestiti mehanizme po meri

```
~/.omniroute/compression/engines/my-engine.ts    # Na ravni uporabnika
<project>/compression-engines/my-engine.ts        # Na ravni projekta (naloženo ob zagonu)
```

Lahko pa jih programsko naložite iz vtičnika:

```ts
// V vašem vtičniku
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "@omniroute/open-sse/services/compression/engines/registry";
import { myEngine } from "./engines/my-engine";

export default definePlugin({
  name: "my-compression-plugin",
  // SDK vtičnika izpostavlja kavlje onRequest / onResponse / onError. Registrirajte
  // mehanizem, ko se naloži modul vtičnika (ali ob prvem onRequest); odregistrirajte ga
  // v lastnem postopku zaustavitve.
  onRequest: async (ctx) => {
    registerCompressionEngine(myEngine);
  },
});

// Ob zaustavitvi:
// unregisterCompressionEngine("my-engine");
```

### Preskušanje vašega mehanizma

Registrirajte svoj mehanizem v vtičniku ali zagonski funkciji. Ko je registriran, bo mehanizem na voljo
v izbirniku strategij prek svojega `id`. Integracijo preizkusite tako, da ga vključite v sestavljeni cevovod:

---

## Ustvarjanje jezikovnih paketov

Stiskanje v slogu Caveman uporablja **pravila, prilagojena posameznemu jeziku**, za obravnavo mašil, omiljevanja izjav in razvlečenih vzorcev v vsakem naravnem jeziku. OmniRoute vključuje **6 jezikovnih paketov**: `en`, `es`, `fr`, `de`, `ja`, `pt-BR`.

### Struktura paketa

Jezikovni paket je imenik **datotek JSON** v `open-sse/services/compression/rules/<language>/`:

```
open-sse/services/compression/rules/
├── en/
│   ├── filler.json          # Vljudnostne fraze, omiljevanje, vljudnost
│   ├── context.json         # Pravila za zmanjševanje konteksta
│   ├── dedup.json           # Pravila za odstranjevanje podvojitev
│   ├── structural.json      # Ločila, oblikovanje
│   └── ultra.json           # Pravila za agresivno stiskanje
├── es/  (enaka struktura)
├── fr/  (enaka struktura)
├── de/  (enaka struktura)
├── ja/  (enaka struktura)
└── pt-BR/ (enaka struktura)
```

### Zgradba pravila

Vsako pravilo ima naslednjo obliko (iz `open-sse/services/compression/ruleLoader.ts`):

```ts
interface FileRule {
  name: string; // Človeku berljivo ime (kebab-case)
  pattern: string; // Vzorec regularnega izraza JavaScript
  replacement?: string; // S čim zamenjati ujemanje
  replacementMap?: Record<string, string>; // ALI preslikava ključ→zamenjava
  flags?: string; // Zastavice regularnega izraza (običajno "gi")
  context?: "all" | "user" | "system" | "assistant";
  category?: "filler" | "context" | "structural" | "dedup" | "terse" | "ultra";
  minIntensity?: "lite" | "full" | "ultra"; // Preskoči pod to stopnjo intenzivnosti
  description?: string; // Dokumentacija
}
```

### Primer: dodajanje hindijskih pravil za mašila

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
      "description": "Odstrani vljudnostne uvode, kot je 'नमस्ते'"
    },
    {
      "name": "filler_actually",
      "pattern": "\\b(?:असल में|वास्तव में|दरअसल)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "lite",
      "description": "Odstrani mašila s pomenom 'pravzaprav'"
    },
    {
      "name": "verbose_plea",
      "pattern": "\\b(?:कृपया|कृपया आप|अनुरोध है कि आप)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "full",
      "description": "Odstrani 'prosim' v hindijščini"
    }
  ]
}
```

### Preverjanje veljavnosti

Veljavnost paketov pravil se ob nalaganju preveri glede na `_schema.json`. Paket z neveljavno strukturo se ne bo naložil in bo zabeležil napako:

```
RULE_LOADER: preverjanje veljavnosti paketa "hi/filler.json" ni uspelo:
  - rules.0.pattern: Neveljaven regularni izraz
  - rules.1.context: mora biti ena od vrednosti [all, user, system, assistant]
```

Preverjanje veljavnosti se samodejno izvede ob nalaganju paketa (glede na `_schema.json`); neveljaven paket je zavrnjen, zgornja napaka pa se zabeleži. Za preverjanje veljavnosti paketov ni ločenega skripta `npm run` — naložite paket (npr. zaženite strežnik ali izvedite pot stiskanja) in spremljajte dnevnike.

### Nalaganje jezikovnega paketa po meri

```ts
import { loadRulePack } from "omniroute/compression/ruleLoader";

await loadRulePack("./my-custom-rules/hi/filler.json");
```

Lahko pa ga postavite na prepoznano mesto:

```
~/.omniroute/compression/rules/hi/filler.json  # Uporabniška raven
<project>/.compression/rules/hi/filler.json   # Raven projekta
```

### Najboljše prakse za jezikovne pakete

1. **Začnite s `filler`** — ta pravila imajo največji učinek
2. **Uporabite `minIntensity`** za omejevanje agresivnih pravil — to ščiti pred pretiranim stiskanjem
3. **Vključite preskusne primere** — v JSON dodajte polje `tests[]`, da preverite delovanje
4. **Vrstni red je pomemben** — prejšnja pravila se uporabijo prva; pravila z največjim učinkom postavite na začetek
5. **Pri `replacement` bodite zadržani** — prazen niz je običajno pravilna izbira; nikoli ne uvajajte nove vsebine

### Strategija prevajanja

Pri lokalizaciji paketov pravil v nov jezik:

1. **Prevedite imena pravil** — prikazana so v izpisu za razhroščevanje
2. **Prilagodite vzorce regularnih izrazov** — neposreden prevod pogosto ne deluje (meje besed se razlikujejo)
3. **Preskusite jih na resničnih pogovorih** — paket mora biti varen za dejanske vhodne podatke
4. **Upoštevajte kulturne konvencije** — japonski paketi imajo na primer več častnih mašil kot angleški

---

## Sestavljeni cevovodi

**Sestavljeni cevovod** zaporedno izvaja več pogonov, pri čemer izhod vsakega pogona postane vhod naslednjega. Tako interno deluje `mode: stacked`.

### Kako deluje sestavljanje

```
Vhod (10.000 žetonov)
        │
        ▼
   ┌──────────┐
   │  Pogon   │  prednost 10
   │  A       │  ──▶ izhod: 6.000 žetonov (-40 %)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  Pogon   │  prednost 50
   │  B       │  ──▶ izhod: 2.400 žetonov (-60 %)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  Pogon   │  prednost 100
   │  C       │  ──▶ izhod: 1.200 žetonov (-80 %)
   └────┬─────┘
        │
        ▼
Končni izhod (1.200 žetonov, skupno ~88 % prihranka)
```

Ko je izbran `mode: "stacked"`, se pogoni izvajajo zaporedno v vrstnem redu, določenem v polju `pipeline`.
Izhod pogona N postane vhod pogona N+1.

### Načini stiskanja

OmniRoute za vsako zahtevo izbere **EN način** glede na konfiguracijo, pragove samodejnega sprožanja in preglasitve kombinacij.
Razpoložljivi načini so opredeljeni v `open-sse/services/compression/types.ts` (tip `CompressionMode`):

| Način        | Pogoni               | Primer uporabe                                                                                                                                                                                                  |
| ------------ | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `off`        | Brez                 | Onemogoči vse stiskanje                                                                                                                                                                                         |
| `rtk`        | Samo RTK             | Seje z veliko izpisa ukazov (80 %+ prihranka)                                                                                                                                                                   |
| `lite`       | Samo Lite            | Konzervativno stiskanje (hitro, varno)                                                                                                                                                                          |
| `standard`   | Caveman              | Stiskanje proznega besedila z jezikovnimi paketi                                                                                                                                                                |
| `aggressive` | Caveman + Aggressive | Agresivno stiskanje proznega besedila + agresiven končni prehod                                                                                                                                                 |
| `ultra`      | Ultra                | Največje stiskanje (z izgubami, skrajni ukrep). Po želji je usmerjeno skozi pogon SLM **LLMLingua-2**, ko je nastavljen `ultra.modelPath` (če model ni na voljo, se brez napake uporabi pot na podlagi pravil). |
| `stacked`    | Cevovod po meri      | Sestavite pogone v poljubnem vrstnem redu (glejte spodaj)                                                                                                                                                       |

> Poleg zgornjih pogonov načinov register vsebuje tudi specializirane pogone, ki jih je mogoče sestavljati —
> **CCR**, **headroom**, **ionizer** in **session-dedup** — dokumentirane v
> [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md#additional-built-in-engines).

Izbiro načina določa `getEffectiveMode()` v `open-sse/services/compression/strategySelector.ts`:

1. Če je stiskanje onemogočeno: `"off"`
2. Če obstaja preglasitev kombinacije: uporabi preglasitev
3. Če je prag samodejnega sprožanja presežen: uporabi `autoTriggerMode` (privzeto: `"lite"`)
4. Sicer: uporabi `defaultMode`

### Privzeti sestavljeni cevovod

Ko je `mode: "stacked"` izrecno konfiguriran, privzeti cevovod združuje:

1. **RTK** — odstrani šum iz izpisa ukazov (~80 % prihranka pri terminalskem izpisu)
2. **Caveman** — odstrani mašila in naredi besedilo jedrnatejše (~46 % pri preostalem besedilu)
3. **Lite** — končni prehod za odstranjevanje odvečnih presledkov in podvojenih vsebin

Ta sestava dosega **78–95 % prihranka** pri sejah z veliko uporabe orodij.

### Konfiguriranje sestavljenih cevovodov

V konfiguraciji kombinacije:

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

Pogone lahko izpustite, dodate pogone po meri ali spremenite njihov vrstni red.

### Posredovanje stanja

Pogoni lahko berejo metapodatke iz konteksta zahteve (v `options`):

```ts
compress(body, config) {
  // Branje metapodatkov iz prejšnjih pogonov
  const original = options?.compressionComboId;  // "my-coding-combo"
  // ...
}
```

Metapodatki so **samo za branje** — pogoni ne morejo spreminjati konteksta zahteve, temveč le svoj izhod telesa.

### Pasti vrstnega reda izvajanja

| Vrstni red pogonov                              | Učinek                                                                                   |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------- |
| RTK → Caveman → Lite                            | **Priporočeno** (najprej odstrani šum, nato jezikovne odvečnosti in nazadnje presledke)  |
| Lite → RTK → Caveman                            | Slabo — Lite odstrani presledke iz neobdelanega izhoda, zato ujemanje vzorcev RTK odpove |
| Caveman → RTK                                   | Slabo — Caveman lahko preoblikuje besedilo tako, da ga RTK ne prepozna                   |
| Poljuben vrstni red z `tool_results` na začetku | Bolje — izhod orodij vsebuje največ šuma                                                 |

### Kdaj NE sestavljati

Sestavljanje ni vedno boljše:

- **Preprosta sporočila** (brez izhoda orodij) — zadostuje en sam Caveman ali Lite
- **Stroškovna občutljivost** — vsak pogon doda ~5–50 ms zakasnitve
- **Določena orodja** — za lupinski izhod običajno zadostuje samo RTK

### Izdelava cevovoda po meri

Register poimenovanih cevovodov ne obstaja. Zloženi cevovod je zgolj **vgrajeno polje
korakov**, posredovano funkciji `applyStackedCompression()` (izvoženi iz
`@omniroute/open-sse/services/compression/strategySelector`):

```ts
import { applyStackedCompression } from "@omniroute/open-sse/services/compression/strategySelector";

const result = applyStackedCompression(body, [
  { engine: "rtk", intensity: "aggressive" },
  { engine: "caveman", intensity: "full" },
]);
```

Če cevovoda ne posredujete, je privzeta vrednost `rtk(standard) → caveman(full)`.

Če ga želite upravljati prek konfiguracije, nastavite `mode: "stacked"` in podajte polje korakov pod
`stackedPipeline` (prebrano iz `config.stackedPipeline`):

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

## Pravilnik sinhronizacije z izvornimi projekti

OmniRoute v README navaja več izvornih projektov, ki jim pripisuje zasluge za navdih pri svojih mehanizmih stiskanja
(»navdihnjeno z RTK, Caveman, LLMLingua-2, Troglodita«). Pogosto vprašanje sodelujočih
je: **ko izvorni RTK doda nov filter orodja ali Caveman doda paket
pravil, kako to pride v OmniRoute?** Ta razdelek vsebuje uradni odgovor.

### Vključene kopije v primerjavi z neodvisnimi implementacijami

| Mehanizem                    | Razmerje do izvornega projekta                                                                                              | Lokacija                                                            |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **RTK**                      | **Neodvisna ponovna implementacija** (navdihnjena z njim, ne kopija)                                                        | `open-sse/services/compression/engines/rtk/`                        |
| **Caveman**                  | **Neodvisna ponovna implementacija** (navdihnjena z njim)                                                                   | `open-sse/services/compression/engines/cavemanAdapter.ts`           |
| **Headroom**                 | Večinoma interen; samo kodek `gcf/` je **dejansko vključen** iz `gcf-typescript` (MIT, označen s SPDX, samo splošni profil) | `open-sse/services/compression/engines/headroom/gcf/`               |
| **LLMLingua-2 / Troglodita** | Navdihnjena z njima (poganjata mehanizma `llmlingua` + `session-dedup`)                                                     | `open-sse/services/compression/engines/llmlingua/`, `session-dedup` |

Ključna ugotovitev: **RTK in Caveman sta neodvisni implementaciji _zamisli_
(pravil filtrov, paketov pravil) v TypeScriptu, ne vključeni kopiji izvornih dreves.** Ni
izvorne kopije, iz katere bi lahko izvedli `git pull` — prav zato v README piše
»navdihnjeno z« in ne »vključeno«.

### Kako se združujejo izboljšave iz izvornih projektov

**Ni samodejnega spremljanja izdaj izvornih projektov in ni oznake `compression-sync`
** — namerno. Ker so mehanizmi ponovne implementacije, filter izvornega RTK
ali paket pravil Caveman ni združen kot koda, temveč je **na novo izražen kot novo
pravilo/filter v lastnem formatu OmniRoute** (glejte
[COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md)) in je občasno vključen prek
običajnega PR-ja. Zgornje razširitvene točke (mehanizem po meri, jezikovni paket, filter RTK)
so odobreni način za prispevanje take izboljšave.

Nedavni primeri prav takšnega postopka:

- Filtri RTK za izpis gradenj Gradle in `dotnet` (v3.8.42)
- Filtri RTK za kubectl / docker-build / composer / gh (#2824)
- Indonezijski jezikovni paket Caveman (#3975) ter nemški / francoski / japonski / kitajski paketi

### Headroom (posredniški strežnik za stiskanje vhoda)

Headroom je **v celoti interen** — pripeta vključena posnetkovna različica kodeka `gcf` skupaj z
lastnimi plastmi `smartcrusher` / `toon` / `tabular` projekta OmniRoute. Razen vključene
kopije ni aktivnega izvornega projekta, ki bi mu bilo treba slediti; posodobitve za `gcf` se osvežujejo
ročno, ko se kodek spremeni, in se znova preverijo glede na omejitev proračuna stiskanja
(`check:compression-budget`).

### Predlaganje izboljšave, navdihnjene z izvornim projektom

1. **Ne vključujte izvorne kode** — pravilo/filter izvornega projekta na novo izrazite v formatu OmniRoute.
2. Dodajte ga prek ustrezne spodnje razširitvene točke (jezikovni paket, filter RTK ali
   mehanizem po meri).
3. V opisu PR-ja navedite izvorni projekt (pripis zaslug), vendar ne
   kopirajte njegove izvorne kode z licenco.
4. Vključite teste in potrdite, da preverjanje `check:compression-budget` še vedno uspešno prestane.

---

## Dodajanje sloga izhoda

Slogi izhoda (glejte [tabelo kataloga v vodniku](./COMPRESSION_GUIDE.md#output-styles-catalog))
so na strani odgovora ustreznik vhodnih mehanizmov: namesto stiskanja tega, kar
pošljete, modelu naročijo, naj ustvari varčnejši izhod. Register je
`OUTPUT_STYLE_CATALOG` v `open-sse/services/compression/outputStyles/catalog.ts`, pri čemer je
**en vnos v katalog celotna funkcionalnost**: vstavljalnik, plošča z nastavitvami nadzorne plošče,
shranjevanje in telemetrija uporabljajo katalog — nobenega drugega seznama ni treba posodobiti.

1. **Dodajte en vnos v `OUTPUT_STYLE_CATALOG`** z `id`, `label`, `description` in
   tremi angleškimi `levels` (`lite`, `full`, `ultra`). Vsaka raven se mora končati z
   `${SHARED_BOUNDARIES}`, da koda, poti, ukazi, napake in URL-ji ostanejo nespremenjeni.
   Besedilo navodil mora biti **statično in deterministično** za vsako kombinacijo
   `(id, level, language)` — `${SHARED_BOUNDARIES}` je edina dovoljena interpolacija.
2. **Prevedite ga.** Pod `i18n` vključite vsaj blok `pt-BR`; `ponytail` in
   `i-have-adhd` (en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi) sta referenčna oblika. Slog, ki je namenoma
   enojezičen, namesto tega nastavi `locale` (kot `terse-cjk` → `zh`) in je nato
   na voljo samo za to področno nastavitev.
3. **Posodobite varovalo matrike** — jezike sloga dodajte v `BASELINE_LANGUAGES` v
   `tests/unit/compression/output-styles-i18n-matrix.test.ts`. Preverjanje zavrne vsak nov slog,
   ki ni omejen s področno nastavitvijo in nima zahtevanih prevodov, razen če vsebuje
   izrecen vnos `KNOWN_ENGLISH_ONLY` s povezavo do sledilne težave.
4. **Dodajte preizkus za posamezen slog** po vzoru
   `tests/unit/compression/i-have-adhd-catalog.test.ts`: oblika kataloga, določilo o mejah
   za vsako raven in sidrno preverjanje, ki potrjuje, da je vsak prevod napisan v svojem
   jeziku in ni kopirana angleščina.
5. **Navedba vira**: če je slog prilagojen iz zunanjega projekta, ga navedite v
   izvornem komentarju pri vnosu (npr. `i-have-adhd` → ayghri/i-have-adhd, MIT) — velja
   enako pravilo kot pri zgornjem razdelku »Predlaganje izboljšave, ki jo je navdihnil zunanji projekt«.

Spremembe uporabniškega vmesnika, sheme ali telemetrije niso potrebne — te površine se izrisujejo iz kataloga.

---

## Najboljše prakse

### Razvoj mehanizmov

1. **Vedno implementirajte `validateConfig`** — mehanizmi brez preverjanja povzročajo tihe napake
2. **Nastavite realistično vrednost `targetLatencyMs`** — izbirnik strategije jo uporablja za izbiro mehanizmov
3. **Za nadzorno ploščo uporabite `getConfigSchema`** — konfiguracije nikoli ne skrivajte pred uporabniki
4. **Podprite `stackable: true`, če je vaš mehanizem čist** — mehanizmi s stranskimi učinki se ne smejo zlagati
5. **Pišite vgrajene preizkuse** — mehanizme mora biti mogoče preveriti v manj kot 1 s

### Razvoj jezikovnih paketov

1. **Začnite z intenzivnostjo `lite`** — vaša pravila morajo biti varna pri najnižji nastavitvi
2. **Uporabite `context` za omejitev obsega pravil** — pravila samo za `user` ne morejo nenamerno vplivati na sistemske pozive
3. **Izogibajte se zajemanju ključev JSON** — `\\bword\\b` se lahko ujema z besedilom znotraj JSON-a in poškoduje strukturirane podatke
4. **Preizkušajte z robnimi primeri** — prazen vhod, Unicode, besedilo RTL, emodžiji
5. **Obstoječe pakete uporabite kot predloge** — `en/filler.json` je najbolj razvit primer

### Zasnova cevovoda

1. **Pred optimizacijo profilirajte** — najprej opravite meritve z `compression_stats`
2. **Dajte prednost sestavljanju pred ponovno implementacijo** — razširite pravila Caveman, preden napišete nov mehanizem
3. **Dokumentirajte utemeljitev vrstnega reda** — s komentarjem pojasnite, zakaj je mehanizem A pred mehanizmom B
4. **Preizkusite vse 3 ravni intenzivnosti** — `lite` je hiter, vendar izguben, `ultra` pa počasen, vendar natančen

---

## Referenca: vgrajeni mehanizmi

| ID mehanizma         | Zložljiv | Privzeta stackPriority | Cilji                                   |
| -------------------- | -------- | ---------------------- | --------------------------------------- |
| `lite`               | Da       | 5                      | sporočila, rezultati orodij             |
| `rtk`                | Da       | 10                     | rezultati orodij                        |
| `standard` (caveman) | Da       | 20                     | sporočila, rezultati orodij, bloki kode |
| `aggressive`         | Da       | 30                     | sporočila                               |
| `ultra`              | Da       | 40                     | sporočila, bloki kode                   |

### Glejte tudi

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Pregled cevovoda
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Referenca registra mehanizmov
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Specifikacija oblike pravil
- [COMPRESSION_LANGUAGE_PACKS.md](./COMPRESSION_LANGUAGE_PACKS.md) — Podrobnosti jezikovnih paketov
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — Mehanizem RTK in filtri po meri
- Vir: `open-sse/services/compression/` (117 datotek, ~250 KB)
