# Extending the Compression Pipeline (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/EXTENDING_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇦 [bs](../../../bs/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/EXTENDING_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/EXTENDING_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/EXTENDING_COMPRESSION.md)

---

> **Ukratko**: OmniRouteov mehanizam kompresije je **proširiv** — možete registrirati prilagođene mehanizme, isporučiti jezične pakete za nove jezike i sastavljati višeslojne cjevovode. Ovaj vodič pokazuje kako.

**Povezani vodiči:**

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Potpuni pregled cjevovoda
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Registar mehanizama i ugrađeni mehanizmi
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK mehanizam i prilagođeni filtri
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Referenca formata paketa pravila

---

## Pregled

Sustav kompresije ima **3 točke proširenja**:

| Točka proširenja          | Slučaj upotrebe                                                                       | Težina     |
| ------------------------- | ------------------------------------------------------------------------------------- | ---------- |
| **Prilagođeni mehanizam** | Dodavanje potpuno novog algoritma kompresije (npr. sažimatelja specifičnog za domenu) | Napredno   |
| **Jezični paket**         | Dodavanje podrške za novi prirodni jezik (npr. hindski, arapski)                      | Srednje    |
| **Višeslojni cjevovod**   | Sastavljanje postojećih mehanizama prilagođenim redoslijedom                          | Početnički |

```
┌─────────────────────────────────────────────────────────────┐
│                    Strategija kompresije                     │
│                                                              │
│   Ulazne poruke ──▶ getEffectiveMode() ──▶ način rada       │
│                                              │               │
│                      ┌───────────────────────┼──────────┐    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   "rtk"    "lite"   "standard" "stacked"    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   RTK       Lite     Caveman   engines[]   │
│                mehanizam mehanizam mehanizam  ulančani    │
│                      │         │         │         │    │    │
│                      └─────────┴─────────┴─────────┘    │    │
│                                      │                    │
│                                      ▼                    │
│                            Komprimirani izlaz              │
└─────────────────────────────────────────────────────────────┘

Odabir strategije TEMELJI SE NA NAČINU RADA: svaki zahtjev odabire JEDAN način
(rtk / lite / standard / aggressive / ultra / stacked / off).
Samo način rada "stacked" ulančava više mehanizama u nizu.
Zadani način automatskog pokretanja jest "lite" (nije lanac prioriteta s 3 razine).
```

---

## Pisanje prilagođenog mehanizma kompresije

Sučelje mehanizma (`open-sse/services/compression/engines/types.ts`) ugovor je koji svaki mehanizam mora ispuniti. Ima 5 obaveznih metoda.

### Sučelje `CompressionEngine`

```ts
interface CompressionEngine {
  id: string; // Jedinstveni ID mehanizma
  name: string; // Naziv za prikaz
  description: string; // Kratak opis
  icon: string; // Ikona (emoji ili URL)
  targets: CompressionEngineTarget[]; // ["messages", "tool_results", "code_blocks"]
  stackable: boolean; // Može se upotrebljavati u višeslojnom cjevovodu
  stackPriority: number; // Redoslijed u višeslojnim cjevovodima (niže = ranije)
  metadata: CompressionEngineMetadata;

  apply(body, options?): CompressionResult;
  compress(body, config?): CompressionResult;
  getConfigSchema(): EngineConfigField[];
  validateConfig(config): EngineValidationResult;
}
```

### Minimalni primjer: mehanizam za razmake

Najjednostavniji mogući mehanizam — uklanja suvišne razmake iz poruka.

````ts
import type { CompressionEngine } from "omniroute/compression/engines/types";
import { registerCompressionEngine } from "omniroute/compression/engines/registry";

function preserveCodeBlocks(text: string): string {
  // Razdijeli prema oznakama blokova koda i sačuvaj razmake unutar njih
  const parts = text.split(/(```[\s\S]*?```)/);
  return parts
    .map((part) => {
      if (part.startsWith("```")) {
        return part; // Nemoj mijenjati blokove koda
      }
      return part.replace(/\n{3,}/g, "\n\n"); // Primijeni samo na prozni tekst
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
  stackPriority: 100, // Pokreni NAKON caveman/rtk

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

    // Prođi kroz polje poruka — obradi i tekstualni i višedijelni sadržaj
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
      // Višedijelni sadržaj: prođi kroz dijelove i komprimiraj samo tekstualne dijelove
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
          return part; // sačuvaj image_url, tool_use itd.
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

### Gdje smjestiti prilagođene mehanizme

```
~/.omniroute/compression/engines/my-engine.ts    # Na razini korisnika
<project>/compression-engines/my-engine.ts        # Na razini projekta (učitava se pri pokretanju)
```

Ili ih programski učitajte iz dodatka:

```ts
// U vašem dodatku
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "@omniroute/open-sse/services/compression/engines/registry";
import { myEngine } from "./engines/my-engine";

export default definePlugin({
  name: "my-compression-plugin",
  // SDK dodatka izlaže priključke onRequest / onResponse / onError. Registrirajte
  // mehanizam kada se učita modul dodatka (ili pri prvom onRequest); poništite njegovu registraciju
  // putem vlastitog postupka uklanjanja.
  onRequest: async (ctx) => {
    registerCompressionEngine(myEngine);
  },
});

// Pri uklanjanju:
// unregisterCompressionEngine("my-engine");
```

### Testiranje vašeg mehanizma

Registrirajte svoj mehanizam u dodatku ili funkciji pokretanja. Nakon registracije mehanizam će biti dostupan
u izborniku strategije putem svojeg `id`. Testirajte integraciju kombiniranjem mehanizma u složeni proces:

---

## Izrada jezičnih paketa

Kompresija u stilu pećinskog čovjeka koristi **pakete pravila specifične za jezik** kako bi obradila poštapalice, ublažavanje tvrdnji i opširne obrasce u svakom prirodnom jeziku. OmniRoute dolazi sa **6 jezičnih paketa**: `en`, `es`, `fr`, `de`, `ja`, `pt-BR`.

### Struktura paketa

Jezični paket direktorij je s **JSON datotekama** unutar `open-sse/services/compression/rules/<language>/`:

```
open-sse/services/compression/rules/
├── en/
│   ├── filler.json          # Uljudne fraze, ublažavanje tvrdnji, pristojnost
│   ├── context.json         # Pravila za sažimanje konteksta
│   ├── dedup.json           # Pravila za uklanjanje duplikata
│   ├── structural.json      # Interpunkcija, oblikovanje
│   └── ultra.json           # Pravila za agresivnu kompresiju
├── es/  (ista struktura)
├── fr/  (ista struktura)
├── de/  (ista struktura)
├── ja/  (ista struktura)
└── pt-BR/ (ista struktura)
```

### Anatomija pravila

Svako pravilo ima sljedeći oblik (iz `open-sse/services/compression/ruleLoader.ts`):

```ts
interface FileRule {
  name: string; // Čitljiv naziv (kebab-case)
  pattern: string; // JavaScript obrazac regularnog izraza
  replacement?: string; // Vrijednost kojom se zamjenjuje podudaranje
  replacementMap?: Record<string, string>; // ILI mapa ključeva i zamjenskih vrijednosti
  flags?: string; // Zastavice regularnog izraza (obično "gi")
  context?: "all" | "user" | "system" | "assistant";
  category?: "filler" | "context" | "structural" | "dedup" | "terse" | "ultra";
  minIntensity?: "lite" | "full" | "ultra"; // Preskoči ispod ovog intenziteta
  description?: string; // Dokumentacija
}
```

### Primjer: dodavanje hindskih pravila za poštapalice

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
      "description": "Ukloni uljudne uvodne izraze poput 'नमस्ते'"
    },
    {
      "name": "filler_actually",
      "pattern": "\\b(?:असल में|वास्तव में|दरअसल)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "lite",
      "description": "Ukloni poštapalice sa značenjem 'zapravo'"
    },
    {
      "name": "verbose_plea",
      "pattern": "\\b(?:कृपया|कृपया आप|अनुरोध है कि आप)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "full",
      "description": "Ukloni izraz 'molim' na hindskom"
    }
  ]
}
```

### Provjera valjanosti

Valjanost paketa pravila provjerava se prema `_schema.json` prilikom učitavanja. Paket s neispravnom strukturom neće se učitati i zabilježit će pogrešku:

```
RULE_LOADER: paket "hi/filler.json" nije prošao provjeru valjanosti:
  - rules.0.pattern: Neispravan regularni izraz
  - rules.1.context: mora biti jedno od [all, user, system, assistant]
```

Provjera valjanosti automatski se pokreće kada se paket učita (prema `_schema.json`);
neispravan paket odbacuje se i bilježi se prethodno navedena pogreška. Ne postoji zasebna
`npm run` skripta za provjeru valjanosti paketa — učitajte paket (npr. pokrenite poslužitelj ili
izvršite put kompresije) i pratite zapisnike.

### Učitavanje prilagođenog jezičnog paketa

```ts
import { loadRulePack } from "omniroute/compression/ruleLoader";

await loadRulePack("./my-custom-rules/hi/filler.json");
```

Ili ga smjestite na prepoznato mjesto:

```
~/.omniroute/compression/rules/hi/filler.json  # Na razini korisnika
<project>/.compression/rules/hi/filler.json   # Na razini projekta
```

### Najbolje prakse za jezične pakete

1. **Započnite s `filler`** — ta pravila imaju najveći učinak
2. **Upotrebljavajte `minIntensity`** za ograničavanje agresivnih pravila — time se štiti od prekomjerne kompresije
3. **Uključite testne slučajeve** — dodajte polje `tests[]` u JSON kako biste provjerili ponašanje
4. **Redoslijed je važan** — ranija pravila primjenjuju se prva; pravila s velikim učinkom postavite na početak
5. **Budite oprezni s `replacement`** — prazan niz obično je ispravan; nikada ne uvodite novi sadržaj

### Strategija prevođenja

Pri lokalizaciji paketa pravila na novi jezik:

1. **Prevedite nazive pravila** — pojavljuju se u izlazu za otklanjanje pogrešaka
2. **Prilagodite obrasce regularnih izraza** — izravan prijevod često ne funkcionira (granice riječi razlikuju se)
3. **Testirajte na stvarnim razgovorima** — paket treba biti siguran za stvarne ulazne podatke
4. **Uskladite ga s kulturnim konvencijama** — japanski paketi, primjerice, imaju više počasnih poštapalica nego engleski

---

## Složeni cjevovodi

**Složeni cjevovod** pokreće više mehanizama u slijedu, pri čemu izlaz svakog mehanizma postaje ulaz sljedećeg. Tako `mode: stacked` funkcionira interno.

### Kako slaganje funkcionira

```
Ulaz (10.000 tokena)
        │
        ▼
   ┌──────────┐
   │ Mehanizam│  prioritet 10
   │  A       │  ──▶ izlaz: 6.000 tokena (-40%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │ Mehanizam│  prioritet 50
   │  B       │  ──▶ izlaz: 2.400 tokena (-60%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │ Mehanizam│  prioritet 100
   │  C       │  ──▶ izlaz: 1.200 tokena (-80%)
   └────┬─────┘
        │
        ▼
Konačni izlaz (1.200 tokena, ukupna ušteda ~88%)
```

Kada je odabran `mode: "stacked"`, mehanizmi se izvršavaju slijedno, redoslijedom navedenim u polju `pipeline`.
Izlaz mehanizma N postaje ulaz mehanizma N+1.

### Načini kompresije

OmniRoute odabire **JEDAN način po zahtjevu** na temelju konfiguracije, pragova automatskog pokretanja i nadjačavanja kombinacija.
Dostupni načini definirani su u `open-sse/services/compression/types.ts` (tip `CompressionMode`):

| Način        | Mehanizmi            | Slučaj upotrebe                                                                                                                                                                                                        |
| ------------ | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `off`        | Nijedan              | Onemogućuje svu kompresiju                                                                                                                                                                                             |
| `rtk`        | Samo RTK             | Sesije s mnogo izlaza naredbi (ušteda od 80% ili više)                                                                                                                                                                 |
| `lite`       | Samo Lite            | Konzervativna kompresija (brza, sigurna)                                                                                                                                                                               |
| `standard`   | Caveman              | Kompresija proze s jezičnim paketima                                                                                                                                                                                   |
| `aggressive` | Caveman + Aggressive | Agresivna kompresija proze + agresivni završni prolaz                                                                                                                                                                  |
| `ultra`      | Ultra                | Maksimalna kompresija (s gubicima, krajnja opcija). Po izboru se usmjerava kroz SLM mehanizam **LLMLingua-2** kada je postavljen `ultra.modelPath` (ako model nije dostupan, nastavlja putem temeljenim na pravilima). |
| `stacked`    | Prilagođeni cjevovod | Kombiniranje mehanizama bilo kojim redoslijedom (pogledajte u nastavku)                                                                                                                                                |

> Osim prethodno navedenih mehanizama načina rada, registar također uključuje specijalizirane mehanizme koji se mogu slagati —
> **CCR**, **headroom**, **ionizer** i **session-dedup** — dokumentirane u
> [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md#additional-built-in-engines).

Odabir načina određuje `getEffectiveMode()` u `open-sse/services/compression/strategySelector.ts`:

1. Ako je kompresija onemogućena: `"off"`
2. Ako postoji nadjačavanje kombinacije: upotrijebi nadjačavanje
3. Ako je prekoračen prag automatskog pokretanja: upotrijebi `autoTriggerMode` (zadano: `"lite"`)
4. U suprotnom: upotrijebi `defaultMode`

### Zadani složeni cjevovod

Kada je izričito konfiguriran `mode: "stacked"`, zadani cjevovod kombinira:

1. **RTK** — uklanja šum iz izlaza naredbi (ušteda od ~80% na terminalskom izlazu)
2. **Caveman** — uklanja poštapalice i sažima prozu (~46% na preostalom tekstu)
3. **Lite** — završni prolaz za uklanjanje suvišnih razmaka i duplikata

Ova kombinacija postiže **78-95% uštede** u sesijama s intenzivnom upotrebom alata.

### Konfiguriranje složenih cjevovoda

U konfiguraciji kombinacije:

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
  // Čitanje metapodataka iz prethodnih mehanizama
  const original = options?.compressionComboId;  // "my-coding-combo"
  // ...
}
```

Metapodaci su **samo za čitanje** — mehanizmi ne mogu mijenjati kontekst zahtjeva, već samo izlaz vlastitog tijela.

### Zamke u redoslijedu izvršavanja

| Redoslijed mehanizama                            | Učinak                                                                                           |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| RTK → Caveman → Lite                             | **Preporučeno** (prvo uklanja šum, zatim obrađuje jezik, a potom razmake)                        |
| Lite → RTK → Caveman                             | Loše — Lite uklanja razmake iz sirovog izlaza, zbog čega RTK-ovo podudaranje uzoraka ne uspijeva |
| Caveman → RTK                                    | Loše — Caveman može preoblikovati tekst tako da ga RTK više ne prepoznaje                        |
| Bilo koji redoslijed s `tool_results` na početku | Bolje — izlaz alata sadržava najviše šuma                                                        |

### Kada NE slagati

Slaganje nije uvijek bolje:

- **Jednostavne poruke** (bez izlaza alata) — dovoljan je samo Caveman ili Lite
- **Osjetljivost na troškove** — svaki mehanizam dodaje ~5-50ms latencije
- **Određeni alati** — za izlaz ljuske obično je dovoljan samo RTK

### Izrada prilagođenog cjevovoda

Ne postoji registar imenovanih pipelineova. Složeni pipeline samo je **ugrađeni niz
koraka** koji se prosljeđuje funkciji `applyStackedCompression()` (izvezenoj iz
`@omniroute/open-sse/services/compression/strategySelector`):

```ts
import { applyStackedCompression } from "@omniroute/open-sse/services/compression/strategySelector";

const result = applyStackedCompression(body, [
  { engine: "rtk", intensity: "aggressive" },
  { engine: "caveman", intensity: "full" },
]);
```

Kada ne proslijedite pipeline, zadana je vrijednost `rtk(standard) → caveman(full)`.

Da biste njime upravljali putem konfiguracije, postavite `mode: "stacked"` i navedite niz koraka pod
`stackedPipeline` (čita se iz `config.stackedPipeline`):

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

## Pravila sinkronizacije s izvornim projektima

OmniRouteovi mehanizmi kompresije u README-u navode nekoliko izvornih projekata
("inspirirano projektima RTK, Caveman, LLMLingua-2, Troglodita"). Često pitanje
suradnika glasi: **kada izvorni RTK doda novi filtar alata ili Caveman doda paket
pravila, kako to dospijeva u OmniRoute?** Ovaj je odjeljak mjerodavan odgovor.

### Uključene kopije nasuprot neovisnim implementacijama

| Mehanizam                    | Odnos prema izvornom projektu                                                                                                         | Lokacija                                                            |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **RTK**                      | **Neovisna ponovna implementacija** (inspirirana projektom, nije kopija)                                                              | `open-sse/services/compression/engines/rtk/`                        |
| **Caveman**                  | **Neovisna ponovna implementacija** (inspirirana projektom)                                                                           | `open-sse/services/compression/engines/cavemanAdapter.ts`           |
| **Headroom**                 | Uglavnom interni; samo je kodek `gcf/` **doista uključen** iz projekta `gcf-typescript` (MIT, označen SPDX-om, samo generički profil) | `open-sse/services/compression/engines/headroom/gcf/`               |
| **LLMLingua-2 / Troglodita** | Inspirirani projektima (pokreću mehanizme `llmlingua` + `session-dedup`)                                                              | `open-sse/services/compression/engines/llmlingua/`, `session-dedup` |

Ključna napomena: **RTK i Caveman su neovisne TypeScript implementacije
_ideja_ (pravila filtara, paketi pravila), a ne uključena stabla izvornog koda.**
Ne postoji izvorna kopija iz koje bi se mogao izvršiti `git pull` — upravo zato
README navodi "inspirirano projektom", a ne "uključeno".

### Kako se poboljšanja iz izvornih projekata integriraju

**Ne postoji automatizirano praćenje izdanja izvornih projekata niti oznaka
`compression-sync`** — i to je namjerno. Budući da su mehanizmi ponovne
implementacije, filtar iz izvornog RTK-a ili Cavemanov paket pravila ne
integriraju se kao kod; oni se **ponovno izražavaju kao novo pravilo/filtar u
OmniRouteovu vlastitom formatu** (pogledajte
[COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md)) i dodaju se ad hoc
putem uobičajenog PR-a. Gore navedene točke proširenja (prilagođeni mehanizam,
jezični paket, RTK filtar) odobreni su način za doprinos.

Nedavni primjeri upravo takvog tijeka:

- RTK filtri za izlaz izgradnje alata Gradle i `dotnet` (v3.8.42)
- RTK filtri za kubectl / docker-build / composer / gh (#2824)
- Cavemanov indonezijski jezični paket (#3975), uz njemačke / francuske / japanske / kineske pakete

### Headroom (proxy za kompresiju ulaza)

Headroom je **u potpunosti interni** — prikvačena uključena snimka kodeka `gcf`
uz OmniRouteove vlastite slojeve `smartcrusher` / `toon` / `tabular`. Ne postoji
aktivni izvorni projekt koji bi trebalo pratiti izvan uključene kopije; ažuriranja
za `gcf` osvježavaju se ručno kada se kodek promijeni i ponovno provjeravaju prema
kontrolnoj točki proračuna kompresije (`check:compression-budget`).

### Predlaganje poboljšanja inspiriranog izvornim projektom

1. **Nemojte uključivati izvorni kod** — ponovno izrazite izvorno pravilo/filtar u OmniRouteovu formatu.
2. Dodajte ga putem odgovarajuće točke proširenja u nastavku (jezični paket, RTK
   filtar ili prilagođeni mehanizam).
3. Navedite izvorni projekt u opisu PR-a (pripisivanje zasluga), a ne kopiranjem
   njegova izvornog koda koji podliježe licenci.
4. Uključite testove i potvrdite da kontrolna točka `check:compression-budget` i dalje prolazi.

---

## Dodavanje izlaznog stila

Izlazni stilovi (pogledajte [tablicu kataloga u vodiču](./COMPRESSION_GUIDE.md#output-styles-catalog))
pandani su ulaznim mehanizmima na strani odgovora: umjesto sažimanja onoga što
šaljete, nalažu modelu da proizvede ekonomičniji izlaz. Registar je
`OUTPUT_STYLE_CATALOG` u `open-sse/services/compression/outputStyles/catalog.ts`, a
**jedan kataloški unos predstavlja cijelu funkcionalnost**: injektor, ploča s postavkama,
postojanost i telemetrija dohvaćaju stavke iz kataloga — ne postoji nijedan drugi popis koji treba ažurirati.

1. **Dodajte jedan unos u `OUTPUT_STYLE_CATALOG`** s poljima `id`, `label`, `description` i
   trima engleskim `levels` (`lite`, `full`, `ultra`). Svaka razina mora završavati s
   `${SHARED_BOUNDARIES}` kako bi kod, putanje, naredbe, pogreške i URL-ovi ostali neizmijenjeni.
   Tekst upute mora biti **statičan i determinističan** za svaku kombinaciju
   `(id, level, language)` — `${SHARED_BOUNDARIES}` jedina je dopuštena interpolacija.
2. **Prevedite ga.** Dodajte barem blok `pt-BR` unutar `i18n`; `ponytail` i
   `i-have-adhd` (en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi) referentni su oblik. Stil koji namjerno
   podržava samo jedan jezik umjesto toga postavlja `locale` (poput `terse-cjk` → `zh`) te se tada
   nudi samo za taj lokalitet.
3. **Ažurirajte zaštitu matrice** — dodajte jezike stila u `BASELINE_LANGUAGES` u
   `tests/unit/compression/output-styles-i18n-matrix.test.ts`. Provjera odbija svaki novi
   stil koji nije ograničen lokalitetom i nema potrebne prijevode, osim ako sadrži
   eksplicitan unos `KNOWN_ENGLISH_ONLY` s povezanom stavkom za praćenje.
4. **Dodajte test za pojedinačni stil** po uzoru na
   `tests/unit/compression/i-have-adhd-catalog.test.ts`: oblik kataloga, klauzulu
   o granicama za svaku razinu i kontrolnu tvrdnju kojom se potvrđuje da je svaki prijevod napisan na vlastitom
   jeziku, umjesto da je kopiran engleski tekst.
5. **Navođenje izvora**: ako je stil prilagođen iz vanjskog projekta, navedite zasluge u
   komentaru izvora uz unos (npr. `i-have-adhd` → ayghri/i-have-adhd, MIT) — vrijedi isto
   pravilo kao u gornjem odjeljku „Predlaganje poboljšanja nadahnutog vanjskim projektom”.

Nisu potrebne promjene korisničkog sučelja, sheme ni telemetrije — te se površine generiraju iz kataloga.

---

## Najbolje prakse

### Razvoj mehanizama

1. **Uvijek implementirajte `validateConfig`** — mehanizmi bez provjere valjanosti uzrokuju neprimjetne kvarove
2. **Postavite realističan `targetLatencyMs`** — birač strategije koristi ga za odabir mehanizama
3. **Upotrebljavajte `getConfigSchema` za nadzornu ploču** — nikada ne skrivajte konfiguraciju od korisnika
4. **Podržite `stackable: true` ako je vaš mehanizam čist** — mehanizmi s nuspojavama ne bi se trebali slagati
5. **Pišite ugrađene testove** — mehanizme bi trebalo biti moguće provjeriti za manje od 1 s

### Razvoj jezičnih paketa

1. **Počnite s intenzitetom `lite`** — vaša pravila trebaju biti sigurna na najnižoj postavci
2. **Upotrebljavajte `context` za ograničavanje dosega pravila** — pravila samo za `user` ne mogu slučajno utjecati na sistemske upite
3. **Izbjegavajte obuhvaćanje JSON ključeva** — `\\bword\\b` može pronaći podudaranje unutar JSON-a i narušiti strukturirane podatke
4. **Testirajte rubne slučajeve** — prazan ulaz, Unicode, tekst zdesna nalijevo, emojiji
5. **Upotrebljavajte postojeće pakete kao predloške** — `en/filler.json` najrazvijeniji je primjer

### Dizajn obrade

1. **Profilirajte prije optimizacije** — najprije mjerite pomoću `compression_stats`
2. **Dajte prednost kombiniranju pred ponovnom implementacijom** — proširite pravila Caveman prije pisanja novog mehanizma
3. **Dokumentirajte obrazloženje redoslijeda** — komentarom objasnite zašto mehanizam A dolazi prije mehanizma B
4. **Testirajte na sve 3 razine intenziteta** — `lite` je brz, ali uz gubitke; `ultra` je spor, ali precizan

---

## Referenca: ugrađeni mehanizmi

| ID mehanizma         | Moguće slaganje | Zadani stackPriority | Ciljevi                               |
| -------------------- | --------------- | -------------------- | ------------------------------------- |
| `lite`               | Da              | 5                    | poruke, rezultati alata               |
| `rtk`                | Da              | 10                   | rezultati alata                       |
| `standard` (caveman) | Da              | 20                   | poruke, rezultati alata, blokovi koda |
| `aggressive`         | Da              | 30                   | poruke                                |
| `ultra`              | Da              | 40                   | poruke, blokovi koda                  |

### Vidi također

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Pregled procesnog lanca
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Referenca registra mehanizama
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Specifikacija formata pravila
- [COMPRESSION_LANGUAGE_PACKS.md](./COMPRESSION_LANGUAGE_PACKS.md) — Pojedinosti o jezičnim paketima
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — Mehanizam RTK i prilagođeni filtri
- Izvor: `open-sse/services/compression/` (117 datoteka, ~250 KB)
