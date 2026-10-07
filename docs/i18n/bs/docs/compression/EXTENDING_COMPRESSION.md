# Extending the Compression Pipeline (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/EXTENDING_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/EXTENDING_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/EXTENDING_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/EXTENDING_COMPRESSION.md)

---

# Proširivanje kompresijskog cjevovoda

> **TL;DR**: OmniRoute-ov kompresijski mehanizam je **modularan** — možete registrirati prilagođene mehanizme, isporučivati jezične pakete za nove jezike i sastavljati složene cjevovode. Ovaj vodič pokazuje kako.

**Povezani vodiči:**

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Pregled cjelokupnog cjevovoda
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Registar mehanizama i ugrađeni mehanizmi
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK mehanizam i prilagođeni filteri
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Referenca formata paketa pravila

---

## Pregled

Sistem kompresije ima **3 tačke proširenja**:

| Tačka proširenja          | Slučaj upotrebe                                                                 | Težina   |
| ------------------------- | ------------------------------------------------------------------------------- | -------- |
| **Prilagođeni mehanizam** | Dodavanje potpuno novog algoritma kompresije (npr. sažimač specifičan za domen) | Napredno |
| **Jezični paket**         | Dodavanje podrške za novi prirodni jezik (npr. hindi, arapski)                  | Srednje  |
| **Složeni cjevovod**      | Sastavljanje postojećih mehanizama u prilagođenom redoslijedu                   | Početni  |

```
┌─────────────────────────────────────────────────────────────┐
│                    Compression Strategy                      │
│                                                              │
│   Input messages ──▶ getEffectiveMode() ──▶ mode            │
│                                              │               │
│                      ┌───────────────────────┼──────────┐    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   "rtk"    "lite"   "standard" "stacked"    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   RTK       Lite     Caveman   engines[]   │
│                   engine    engine   engine    chained     │
│                      │         │         │         │    │    │
│                      └─────────┴─────────┴─────────┘    │    │
│                                      │                    │
│                                      ▼                    │
│                             Compressed output              │
└─────────────────────────────────────────────────────────────┘

Selektor strategije je ZASNOVAN NA NAČINU RADA (MODE-BASED): svaki zahtjev bira JEDAN način rada
(rtk / lite / standard / aggressive / ultra / stacked / off).
Samo način rada "stacked" povezuje više mehanizama u nizu.
Zadani način automatskog pokretanja je "lite" (nije lanac prioriteta od 3 nivoa).
```

---

## Pisanje prilagođenog kompresijskog mehanizma

Interfejs mehanizma (`open-sse/services/compression/engines/types.ts`) je ugovor koji svaki mehanizam mora ispuniti. Ima 5 obaveznih metoda.

### Interfejs `CompressionEngine`

```ts
interface CompressionEngine {
  id: string; // Jedinstveni ID mehanizma
  name: string; // Prikazano ime
  description: string; // Kratak opis
  icon: string; // Ikona (emoji ili URL)
  targets: CompressionEngineTarget[]; // ["messages", "tool_results", "code_blocks"]
  stackable: boolean; // Može se koristiti u složenom cjevovodu
  stackPriority: number; // Redoslijed u složenim cjevovodima (manji broj = ranije)
  metadata: CompressionEngineMetadata;

  apply(body, options?): CompressionResult;
  compress(body, config?): CompressionResult;
  getConfigSchema(): EngineConfigField[];
  validateConfig(config): EngineValidationResult;
}
```

### Minimalni primjer: Whitespace mehanizam

Najjednostavniji mogući mehanizam — uklanja dodatni razmak iz poruka.

````ts
import type { CompressionEngine } from "omniroute/compression/engines/types";
import { registerCompressionEngine } from "omniroute/compression/engines/registry";

function preserveCodeBlocks(text: string): string {
  // Podijeli prema markerima blokova koda i sačuvaj prazan prostor unutar njih
  const parts = text.split(/(```[\s\S]*?```)/);
  return parts
    .map((part) => {
      if (part.startsWith("```")) {
        return part; // Ne mijenjaj blokove koda
      }
      return part.replace(/\n{3,}/g, "\n\n"); // Primijeni samo na prozu
    })
    .join("");
}

const whitespaceEngine: CompressionEngine = {
  id: "whitespace",
  name: "Čistač praznog prostora",
  description: "Uklanja višak praznog prostora i prazne linije",
  icon: "📝",
  targets: ["messages", "tool_results"],
  stackable: true,
  stackPriority: 100, // Pokreni NAKON caveman/rtk

  metadata: {
    id: "whitespace",
    name: "Čistač praznog prostora",
    description: "Uklanja višak praznog prostora i prazne linije",
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

    // Prođi kroz niz poruka — rukuj i tekstualnim i višedijelnim sadržajem
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
      // Višedijelni sadržaj: prođi kroz dijelove, kompresuj samo tekstualne dijelove
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
          return part; // sačuvaj image_url, tool_use, itd.
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
        label: "Sačuvaj blokove koda",
        defaultValue: true,
        description: "Ne diraj prazan prostor unutar ```code``` blokova",
      },
    ];
  },

  validateConfig(config) {
    if (config.preserveCodeBlocks !== undefined && typeof config.preserveCodeBlocks !== "boolean") {
      return { valid: false, errors: ["preserveCodeBlocks mora biti boolean"] };
    }
    return { valid: true, errors: [] };
  },
};

// Registruj globalno
registerCompressionEngine(whitespaceEngine);
````

### Gdje postaviti prilagođene engine

```
~/.omniroute/compression/engines/my-engine.ts    # Korisnički nivo
<project>/compression-engines/my-engine.ts        # Projektni nivo (učitava se pri pokretanju)
```

Ili učitajte programski iz plugina:

```ts
// U vašem pluginu
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "@omniroute/open-sse/services/compression/engines/registry";
import { myEngine } from "./engines/my-engine";

export default definePlugin({
  name: "my-compression-plugin",
  // Plugin SDK izlaže onRequest / onResponse / onError hook-ove. Registrujte
  // engine kada se modul plugina učita (ili pri prvom onRequest); odjavite ga
  // iz vaše vlastite teardown putanje.
  onRequest: async (ctx) => {
    registerCompressionEngine(myEngine);
  },
});

// Pri gašenju (teardown):
// unregisterCompressionEngine("my-engine");
```

### Testiranje vašeg engine-a

Registrujte svoj engine u pluginu ili startup funkciji. Nakon registracije, engine će biti dostupan
u selektoru strategija putem svog `id`. Testirajte integraciju tako što ćete ga sastaviti u naslagani (stacked) pipeline:

---

## Kreiranje jezičkih paketa

Kompresija u stilu "pećinskog čovjeka" (Caveman-style) koristi **jezički specifične pakete pravila** za rukovanje poštapalicama, ograđivanjem (hedging) i opširnim obrascima u svakom prirodnom jeziku. OmniRoute dolazi sa **6 jezičkih paketa**: `en`, `es`, `fr`, `de`, `ja`, `pt-BR`.

### Struktura paketa

Jezički paket je direktorij **JSON datoteka** unutar `open-sse/services/compression/rules/<language>/`:

```
open-sse/services/compression/rules/
├── en/
│   ├── filler.json          # Uljudnosti, ograđivanje, pristojnost
│   ├── context.json         # Pravila za smanjenje konteksta
│   ├── dedup.json           # Pravila za deduplikaciju
│   ├── structural.json      # Interpunkcija, formatiranje
│   └── ultra.json           # Agresivna pravila kompresije
├── es/  (ista struktura)
├── fr/  (ista struktura)
├── de/  (ista struktura)
├── ja/  (ista struktura)
└── pt-BR/ (ista struktura)
```

### Anatomija pravila

Svako pravilo ima ovaj oblik (iz `open-sse/services/compression/ruleLoader.ts`):

```ts
interface FileRule {
  name: string; // Ime čitljivo ljudima (kebab-case)
  pattern: string; // JavaScript regex obrazac
  replacement?: string; // Čime zamijeniti podudaranje
  replacementMap?: Record<string, string>; // ILI mapa ključ→zamjena
  flags?: string; // Regex zastavice (obično "gi")
  context?: "all" | "user" | "system" | "assistant";
  category?: "filler" | "context" | "structural" | "dedup" | "terse" | "ultra";
  minIntensity?: "lite" | "full" | "ultra"; // Preskoči ispod ovog intenziteta
  description?: string; // Dokumentacija
}
```

### Primjer: Dodavanje hindi pravila za poštapalice

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
      "description": "Ukloni uljudne uvodne riječi poput 'नमस्ते'"
    },
    {
      "name": "filler_actually",
      "pattern": "\\b(?:असल में|वास्तव में|दरअसल)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "lite",
      "description": "Ukloni poštapalice poput 'actually'"
    },
    {
      "name": "verbose_plea",
      "pattern": "\\b(?:कृपया|कृपया आप|अनुरोध है कि आप)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "full",
      "description": "Ukloni 'please' (molim) na hindskom"
    }
  ]
}
```

### Validacija

Paketi pravila se validiraju prema `_schema.json` prilikom učitavanja. Paket sa lošom strukturom neće se učitati i zabilježit će grešku:

```
RULE_LOADER: paket "hi/filler.json" nije prošao validaciju:
  - rules.0.pattern: Nevažeći regex
  - rules.1.context: mora biti jedan od [all, user, system, assistant]
```

Validacija se pokreće automatski kada se paket učita (prema `_schema.json`); nevažeći paket se odbija i gore navedena greška se bilježi. Ne postoji posebna `npm run` skripta za validaciju paketa — učitajte paket (npr. pokrenite server ili izvršite putanju kompresije) i pratite logove.

### Učitavanje prilagođenog jezičkog paketa

```ts
import { loadRulePack } from "omniroute/compression/ruleLoader";

await loadRulePack("./my-custom-rules/hi/filler.json");
```

Ili postavite na prepoznatu lokaciju:

```
~/.omniroute/compression/rules/hi/filler.json  # Korisnički nivo
<project>/.compression/rules/hi/filler.json   # Projektni nivo
```

### Najbolje prakse za jezičke pakete

1. **Počnite sa `filler`** — ovo su pravila sa najvećim uticajem
2. **Koristite `minIntensity`** za ograničavanje agresivnih pravila — štiti od prekomjerne kompresije
3. **Uključite testne slučajeve** — dodajte `tests[]` niz u JSON da biste provjerili ponašanje
4. **Redoslijed je bitan** — ranija pravila se primjenjuju prva; postavite pravila sa velikim uticajem na početak
5. **Budite konzervativni sa `replacement`** — prazan string je obično ispravan; nikada ne uvodite novi sadržaj

### Strategija prevođenja

Prilikom lokalizacije paketa pravila na novi jezik:

1. **Prevedite nazive pravila** — oni se pojavljuju u debug izlazu
2. **Prilagodite regex obrasce** — direktan prevod često ne uspijeva (granice riječi se razlikuju)
3. **Testirajte na stvarnim razgovorima** — paket treba biti siguran za stvarni unos
4. **Uskladite sa kulturnim konvencijama** — japanski paketi, na primjer, imaju više počasnih poštapalica nego engleski

## Složeni cjevovodi

**Složeni cjevovod** (stacked pipeline) pokreće više mehanizama u nizu, pri čemu izlaz svakog mehanizma služi kao ulaz za sljedeći. Ovako `mode: stacked` funkcionira interno.

### Kako slaganje funkcionira

```
Input (10,000 tokens)
        │
        ▼
   ┌──────────┐
   │  Engine  │  priority 10
   │  A       │  ──▶ output: 6,000 tokens (-40%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  Engine  │  priority 50
   │  B       │  ──▶ output: 2,400 tokens (-60%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │  Engine  │  priority 100
   │  C       │  ──▶ output: 1,200 tokens (-80%)
   └────┬─────┘
        │
        ▼
Final output (1,200 tokens, ~88% savings combined)
```

Kada je odabran `mode: "stacked"`, mehanizmi se izvršavaju sekvencijalno redoslijedom navedenim u polju `pipeline`.
Izlaz mehanizma N postaje ulaz mehanizma N+1.

### Načini kompresije

OmniRoute odabire **JEDAN način po zahtjevu** na temelju konfiguracije, pragova automatskog pokretanja i nadjačavanja kombinacija (combo overrides).
Dostupni načini definirani su u `open-sse/services/compression/types.ts` (tip `CompressionMode`):

| Način        | Mehanizmi            | Slučaj upotrebe                                                                                                                                                                                                        |
| ------------ | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `off`        | Nijedan              | Onemogući svu kompresiju                                                                                                                                                                                               |
| `rtk`        | Samo RTK             | Sesije s puno izlaza naredbi (80%+ uštede)                                                                                                                                                                             |
| `lite`       | Samo Lite            | Konzervativna kompresija (brza, sigurna)                                                                                                                                                                               |
| `standard`   | Caveman              | Kompresija proze s jezičnim paketima                                                                                                                                                                                   |
| `aggressive` | Caveman + Aggressive | Agresivna proza + agresivni završni prolaz                                                                                                                                                                             |
| `ultra`      | Ultra                | Maksimalna kompresija (s gubitkom, zadnja opcija). Opcionalno usmjereno kroz **LLMLingua-2** SLM mehanizam kada je postavljen `ultra.modelPath` (vraća se na putanju temeljenu na pravilima kada model nije dostupan). |
| `stacked`    | Prilagođeni cjevovod | Sastavite mehanizme bilo kojim redoslijedom (vidi dolje)                                                                                                                                                               |

> Osim gore navedenih mehanizama načina rada, registar također isporučuje specijalizirane mehanizme koji se mogu slagati —
> **CCR**, **headroom**, **ionizer** i **session-dedup** — dokumentirane u
> [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md#additional-built-in-engines).

Odabir načina rada određuje `getEffectiveMode()` u `open-sse/services/compression/strategySelector.ts`:

1. Ako je kompresija onemogućena: `"off"`
2. Ako postoji nadjačavanje kombinacije (combo override): koristi nadjačavanje
3. Ako je prag automatskog pokretanja prekoračen: koristi `autoTriggerMode` (zadano: `"lite"`)
4. U suprotnom: koristi `defaultMode`

### Zadani složeni cjevovod

Kada je `mode: "stacked"` eksplicitno konfiguriran, zadani cjevovod sastoji se od:

1. **RTK** — uklanja šum izlaza naredbi (~80% uštede na izlazu terminala)
2. **Caveman** — uklanja ispune, sažima prozu (~46% na preostalom tekstu)
3. **Lite** — završni prolaz za razmake + dedup

Ovaj sastav postiže **78-95% uštede** na sesijama s puno alata.

### Konfiguriranje složenih cjevovoda

U konfiguraciji kombinacije (combo config):

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

Možete izostaviti mehanizme, dodati prilagođene ili promijeniti njihov redoslijed.

### Prosljeđivanje stanja

Mehanizmi mogu čitati metapodatke iz konteksta zahtjeva (u `options`):

```ts
compress(body, config) {
  // Read metadata from previous engines
  const original = options?.compressionComboId;  // "my-coding-combo"
  // ...
}
```

Metapodaci su **samo za čitanje** — mehanizmi ne mogu mijenjati kontekst zahtjeva, već samo vlastiti izlaz tijela.

### Zamke redoslijeda izvršavanja

| Redoslijed mehanizama                                 | Učinak                                                                                       |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| RTK → Caveman → Lite                                  | **Preporučeno** (prvo uklanja šum, zatim jezik, pa razmake)                                  |
| Lite → RTK → Caveman                                  | Loše — Lite uklanja razmake iz sirovog izlaza, zbog čega RTK podudaranje uzoraka ne uspijeva |
| Caveman → RTK                                         | Loše — Caveman može prepisati tekst na načine koje RTK ne prepoznaje                         |
| Bilo koji redoslijed s `tool_results` na prvom mjestu | Bolje — izlaz alata je sadržaj s najviše šuma                                                |

### Kada NE slagati

Slaganje nije uvijek bolje:

- **Jednostavne poruke** (bez izlaza alata) — dovoljan je jedan Caveman ili Lite
- **Osjetljivo na troškove** — svaki mehanizam dodaje ~5-50ms kašnjenja
- **Specifični alati** — RTK je obično dovoljan za izlaz ljuske (shell)

### Izgradnja prilagođenog cjevovoda (pipeline)

Ne postoji registar imenovanih cjevovoda. Složeni cjevovod (stacked pipeline) je samo **ugrađeni niz koraka** koji se prosljeđuje funkciji `applyStackedCompression()` (izvezenoj iz `@omniroute/open-sse/services/compression/strategySelector`):

```ts
import { applyStackedCompression } from "@omniroute/open-sse/services/compression/strategySelector";

const result = applyStackedCompression(body, [
  { engine: "rtk", intensity: "aggressive" },
  { engine: "caveman", intensity: "full" },
]);
```

Kada ne proslijedite cjevovod, koristi se zadana vrijednost `rtk(standard) → caveman(full)`.

Da biste ga pokrenuli iz konfiguracije, postavite `mode: "stacked"` i navedite niz koraka pod `stackedPipeline` (čita se iz `config.stackedPipeline`):

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

## Politika sinhronizacije sa uzvodnim projektima

OmniRoute-ovi mehanizmi za kompresiju navode nekoliko uzvodnih projekata u README datoteci („inspirisano RTK, Caveman, LLMLingua-2, Troglodita“). Često pitanje saradnika je: **kada uzvodni RTK doda novi filter alata ili Caveman doda paket pravila, kako to dospijeva u OmniRoute?** Ovaj odjeljak je mjerodavan odgovor.

### Vendirane kopije naspram nezavisnih implementacija

| Mehanizam                    | Odnos prema uzvodnom projektu                                                                                                  | Lokacija                                                            |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------- |
| **RTK**                      | **Nezavisna reimplementacija** (inspirisano, nije kopija)                                                                      | `open-sse/services/compression/engines/rtk/`                        |
| **Caveman**                  | **Nezavisna reimplementacija** (inspirisano)                                                                                   | `open-sse/services/compression/engines/cavemanAdapter.ts`           |
| **Headroom**                 | Uglavnom interno; samo je `gcf/` kodek **istinski vendiran** iz `gcf-typescript` (MIT, sa SPDX oznakom, samo generički profil) | `open-sse/services/compression/engines/headroom/gcf/`               |
| **LLMLingua-2 / Troglodita** | Inspirisano (pokreće `llmlingua` + `session-dedup` mehanizme)                                                                  | `open-sse/services/compression/engines/llmlingua/`, `session-dedup` |

Ključna tačka: **RTK i Caveman su TypeScript implementacije _ideja_ (pravila filtera, paketi pravila) razvijene u čistoj sobi (clean-room), a ne vendirana izvorna stabla.** Ne postoji uzvodna kopija sa koje se može uraditi `git pull` — što je upravo razlog zašto README kaže „inspirisano“, a ne „upakovano“ (bundled).

### Kako se spajaju poboljšanja iz uzvodnih projekata

Ne postoji **automatizovano praćenje uzvodnih izdanja i nema `compression-sync` oznake** — po dizajnu. Budući da su mehanizmi reimplementacije, uzvodni RTK filter ili Caveman paket pravila se ne spajaju kao kod; oni se **ponovo izražavaju kao novo pravilo/filter u OmniRoute-ovom sopstvenom formatu** (pogledajte [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md)) i stižu ad-hoc putem normalnog PR-a. Tačke proširenja iznad (prilagođeni mehanizam, jezički paket, RTK filter) su odobreni način za doprinos.

Nedavni primjeri upravo ovog toka:

- RTK filteri za Gradle & `dotnet` izlaz izgradnje (v3.8.42)
- RTK filteri za kubectl / docker-build / composer / gh (#2824)
- Caveman indonežanski jezički paket (#3975), plus njemački / francuski / japanski / kineski paketi

### Headroom (proxy za kompresiju ulaza)

Headroom je **potpuno interni** — fiksirani vendirani `gcf` snimak kodeka plus OmniRoute-ovi sopstveni `smartcrusher` / `toon` / `tabular` slojevi. Ne postoji aktivni uzvodni projekat za praćenje osim vendirane kopije; ažuriranja za `gcf` se osvježavaju ručno kada se kodek promijeni i ponovo validiraju u odnosu na kapiju budžeta kompresije (`check:compression-budget`).

### Predlaganje poboljšanja inspirisanog uzvodnim projektom

1. **Nemojte vendirati** — ponovo izrazite uzvodno pravilo/filter u OmniRoute formatu.
2. Dodajte ga putem odgovarajuće tačke proširenja ispod (jezički paket, RTK filter ili prilagođeni mehanizam).
3. Referencirajte uzvodni projekat u opisu PR-a (atribucija), a ne kopiranjem njegovog izvornog koda koji podliježe licenci.
4. Uključite testove i potvrdite da kapija `check:compression-budget` i dalje prolazi.

---

## Dodavanje izlaznog stila

Izlazni stilovi (pogledajte [tabelu kataloga vodiča](./COMPRESSION_GUIDE.md#output-styles-catalog))
su pandan ulaznim mašinama na strani odgovora: umjesto komprimovanja onoga što
šaljete, oni instruišu model da proizvede jeftiniji izlaz. Registar je
`OUTPUT_STYLE_CATALOG` u `open-sse/services/compression/outputStyles/catalog.ts`, i
**jedan unos u katalogu je cijela funkcija**: injektor, panel sa postavkama na kontrolnoj tabli,
perzistencija i telemetrija, svi nabrajaju katalog — ne postoji druga lista za ažuriranje.

1. **Dodajte jedan unos u `OUTPUT_STYLE_CATALOG`** sa `id`, `label`, `description` i
   tri engleska `levels` (`lite`, `full`, `ultra`). Svaki nivo mora završavati sa
   `${SHARED_BOUNDARIES}` tako da kod, putanje, komande, greške i URL-ovi ostanu doslovni.
   Tekst instrukcije mora biti **statičan i deterministički** po
   `(id, level, language)` — `${SHARED_BOUNDARIES}` je jedina dozvoljena interpolacija.
2. **Prevedite ga.** Isporučite barem `pt-BR` blok pod `i18n`; `ponytail` i
   `i-have-adhd` (en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi) su referentni oblik. Stil koji je namjerno jednojezičan postavlja `locale` umjesto toga (poput `terse-cjk` → `zh`) i tada se nudi samo pod tim lokalitetom.
3. **Ažurirajte matričnu zaštitu (matrix guard)** — dodajte jezike stila u `BASELINE_LANGUAGES` u
   `tests/unit/compression/output-styles-i18n-matrix.test.ts`. Mehanizam provjere odbija svaki novi stil koji nije ograničen lokalitetom bez potrebnih prevoda, osim ako ne nosi eksplicitan `KNOWN_ENGLISH_ONLY` unos sa problemom za praćenje (tracking issue).
4. **Dodajte test po stilu** modelovan prema
   `tests/unit/compression/i-have-adhd-catalog.test.ts`: oblik kataloga, klauzula granica po nivou,
   i sidro koje potvrđuje da je svaki prevod napisan na svom jeziku, a ne kopirani engleski.
5. **Pripisivanje (Attribution)**: ako je stil adaptiran iz uzvodnog (upstream) projekta, navedite ga u komentaru izvora na unosu (npr. `i-have-adhd` → ayghri/i-have-adhd, MIT) — isto pravilo kao "Predlaganje poboljšanja inspirisanog uzvodnim projektom" iznad.

Nisu potrebne promjene korisničkog interfejsa, šeme ili telemetrije — te površine se renderuju iz kataloga.

---

## Najbolje prakse

### Razvoj mašina (Engine Development)

1. **Uvijek implementirajte `validateConfig`** — mašine bez validacije uzrokuju tihe greške
2. **Postavite realističan `targetLatencyMs`** — koristi ga selektor strategije za odabir mašina
3. **Koristite `getConfigSchema` za kontrolnu tablu** — nikada ne skrivajte konfiguraciju od korisnika
4. **Podržite `stackable: true` ako je vaša mašina čista** — mašine sa nuspojavama ne bi trebale da se slažu (stack)
5. **Pišite inline testove** — mašine bi trebale biti provjerljive za <1s

### Razvoj jezičkih paketa

1. **Počnite sa `lite` intenzitetom** — vaša pravila bi trebala biti sigurna na najnižoj postavci
2. **Koristite `context` za određivanje opsega pravila** — pravila samo za `user` ne mogu slučajno uticati na sistemske upite (system prompts)
3. **Izbjegavajte hvatanje JSON ključeva** — `\\bword\\b` se može podudarati unutar JSON-a, kvareći strukturirane podatke
4. **Testirajte sa graničnim slučajevima** — prazan unos, unicode, RTL tekst, emojiji
5. **Koristite postojeće pakete kao šablone** — `en/filler.json` je najrazvijeniji primjer

### Dizajn cjevovoda (Pipeline Design)

1. **Profilirajte prije optimizacije** — prvo izmjerite sa `compression_stats`
2. **Preferirajte kompoziciju nad reimplementacijom** — proširite Caveman pravila prije pisanja nove mašine
3. **Dokumentujte obrazloženje redoslijeda** — komentarišite zašto mašina A prije mašine B
4. **Testirajte na sva 3 nivoa intenziteta** — `lite` je brz, ali sa gubicima, `ultra` je spor, ali precizan

---

## Referenca: Ugrađeni mehanizmi

| ID mehanizma         | Složiv | Zadani stackPriority | Ciljevi                             |
| -------------------- | ------ | -------------------- | ----------------------------------- |
| `lite`               | Da     | 5                    | messages, tool_results              |
| `rtk`                | Da     | 10                   | tool_results                        |
| `standard` (caveman) | Da     | 20                   | messages, tool_results, code_blocks |
| `aggressive`         | Da     | 30                   | messages                            |
| `ultra`              | Da     | 40                   | messages, code_blocks               |

### Vidi također

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Pregled cjevovoda
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Referenca registra mehanizama
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Specifikacija formata pravila
- [COMPRESSION_LANGUAGE_PACKS.md](./COMPRESSION_LANGUAGE_PACKS.md) — Detalji jezičnih paketa
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK mehanizam i prilagođeni filteri
- Izvor: `open-sse/services/compression/` (117 datoteka, ~250KB)
