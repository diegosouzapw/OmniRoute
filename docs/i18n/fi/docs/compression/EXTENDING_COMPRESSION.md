# Extending the Compression Pipeline (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/EXTENDING_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇦 [bs](../../../bs/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/EXTENDING_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇷 [ko](../../../ko/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/EXTENDING_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/EXTENDING_COMPRESSION.md)

---

> **TL;DR**: OmniRouten pakkausmoottori on **laajennettavissa** — voit rekisteröidä mukautettuja moottoreita, toimittaa kielipaketteja uusille kielille ja koostaa pinottuja käsittelyputkia. Tässä oppaassa näytetään, miten se tehdään.

**Aiheeseen liittyvät oppaat:**

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Koko käsittelyputken yleiskatsaus
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Moottorirekisteri ja sisäänrakennetut moottorit
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK-moottori ja mukautetut suodattimet
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Sääntöpaketin muodon viiteopas

---

## Yleiskatsaus

Pakkausjärjestelmässä on **3 laajennuspistettä**:

| Laajennuspiste             | Käyttötapaus                                                            | Vaikeustaso |
| -------------------------- | ----------------------------------------------------------------------- | ----------- |
| **Mukautettu moottori**    | Lisää täysin uusi pakkausalgoritmi (esim. toimialakohtainen tiivistäjä) | Vaativa     |
| **Kielipaketti**           | Lisää tuki uudelle luonnolliselle kielelle (esim. hindi tai arabia)     | Keskitaso   |
| **Pinottu käsittelyputki** | Koosta olemassa olevat moottorit mukautettuun järjestykseen             | Aloittelija |

```
┌─────────────────────────────────────────────────────────────┐
│                     Pakkausstrategia                         │
│                                                              │
│   Syöteviestit ──▶ getEffectiveMode() ──▶ tila              │
│                                              │               │
│                      ┌───────────────────────┼──────────┐    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   "rtk"    "lite"   "standard" "stacked"    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   RTK       Lite     Caveman   engines[]   │
│                   moottori  moottori moottori  ketjutettu  │
│                      │         │         │         │    │    │
│                      └─────────┴─────────┴─────────┘    │    │
│                                      │                    │
│                                      ▼                    │
│                              Pakattu tuloste               │
└─────────────────────────────────────────────────────────────┘

Strategian valinta on TILAPOHJAINEN: kukin pyyntö valitsee YHDEN tilan
(rtk / lite / standard / aggressive / ultra / stacked / off).
Vain tila "stacked" ketjuttaa useita moottoreita peräkkäin.
Automaattisen aktivoinnin oletustila on "lite" (ei kolmitasoinen prioriteettiketju).
```

---

## Mukautetun pakkausmoottorin kirjoittaminen

Moottorin rajapinta (`open-sse/services/compression/engines/types.ts`) on sopimus, joka jokaisen moottorin on täytettävä. Siinä on 5 pakollista metodia.

### `CompressionEngine`-rajapinta

```ts
interface CompressionEngine {
  id: string; // Yksilöllinen moottorin tunnus
  name: string; // Näyttönimi
  description: string; // Lyhyt kuvaus
  icon: string; // Kuvake (emoji tai URL)
  targets: CompressionEngineTarget[]; // ["messages", "tool_results", "code_blocks"]
  stackable: boolean; // Voidaanko käyttää pinotussa käsittelyputkessa
  stackPriority: number; // Järjestys pinotuissa käsittelyputkissa (pienempi = aiemmin)
  metadata: CompressionEngineMetadata;

  apply(body, options?): CompressionResult;
  compress(body, config?): CompressionResult;
  getConfigSchema(): EngineConfigField[];
  validateConfig(config): EngineValidationResult;
}
```

### Vähimmäisesimerkki: tyhjätilamoottori

Yksinkertaisin mahdollinen moottori — poistaa viesteistä ylimääräiset tyhjämerkit.

````ts
import type { CompressionEngine } from "omniroute/compression/engines/types";
import { registerCompressionEngine } from "omniroute/compression/engines/registry";

function preserveCodeBlocks(text: string): string {
  // Jaa koodilohkomerkkien kohdalta ja säilytä niiden sisäiset välilyönnit
  const parts = text.split(/(```[\s\S]*?```)/);
  return parts
    .map((part) => {
      if (part.startsWith("```")) {
        return part; // Älä muokkaa koodilohkoja
      }
      return part.replace(/\n{3,}/g, "\n\n"); // Käytä vain leipätekstiin
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
  stackPriority: 100, // Suorita caveman/rtk:n JÄLKEEN

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

    // Käy viestitaulukko läpi — käsittele sekä merkkijono- että moniosainen sisältö
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
      // Moniosainen sisältö: käy osat läpi ja pakkaa vain tekstiosat
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
          return part; // säilytä image_url, tool_use jne.
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

// Rekisteröi globaalisti
registerCompressionEngine(whitespaceEngine);
````

### Mukautettujen moottorien sijoituspaikka

```
~/.omniroute/compression/engines/my-engine.ts    # Käyttäjätaso
<project>/compression-engines/my-engine.ts        # Projektitaso (ladataan käynnistyksen yhteydessä)
```

Tai lataa ohjelmallisesti liitännäisestä:

```ts
// Liitännäisessäsi
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "@omniroute/open-sse/services/compression/engines/registry";
import { myEngine } from "./engines/my-engine";

export default definePlugin({
  name: "my-compression-plugin",
  // Liitännäisen SDK tarjoaa onRequest-, onResponse- ja onError-koukut. Rekisteröi
  // moottori, kun liitännäismoduuli latautuu (tai ensimmäisen onRequest-kutsun yhteydessä);
  // poista sen rekisteröinti omassa purkupolussasi.
  onRequest: async (ctx) => {
    registerCompressionEngine(myEngine);
  },
});

// Purkamisen yhteydessä:
// unregisterCompressionEngine("my-engine");
```

### Moottorisi testaaminen

Rekisteröi moottorisi liitännäisessä tai käynnistysfunktiossa. Rekisteröinnin jälkeen moottori on käytettävissä
strategiavalitsimessa sen `id`-tunnisteella. Testaa integraatiota yhdistämällä se pinottuun käsittelyputkeen:

---

## Kielipakettien luominen

Caveman-tyylinen pakkaus käyttää **kielikohtaisia sääntöpaketteja** käsitelläkseen täytesanoja, varauksellisia ilmaisuja ja monisanaisia rakenteita kussakin luonnollisessa kielessä. OmniRoute sisältää **6 kielipakettia**: `en`, `es`, `fr`, `de`, `ja`, `pt-BR`.

### Paketin rakenne

Kielipaketti on **JSON-tiedostoista** koostuva hakemisto polussa `open-sse/services/compression/rules/<language>/`:

```
open-sse/services/compression/rules/
├── en/
│   ├── filler.json          # Kohteliaisuudet, varaukselliset ilmaukset, kohteliaisuus
│   ├── context.json         # Kontekstia vähentävät säännöt
│   ├── dedup.json           # Deduplikointisäännöt
│   ├── structural.json      # Välimerkit, muotoilu
│   └── ultra.json           # Aggressiiviset pakkaussäännöt
├── es/  (sama rakenne)
├── fr/  (sama rakenne)
├── de/  (sama rakenne)
├── ja/  (sama rakenne)
└── pt-BR/ (sama rakenne)
```

### Säännön rakenne

Jokaisella säännöllä on seuraava rakenne (tiedostosta `open-sse/services/compression/ruleLoader.ts`):

```ts
interface FileRule {
  name: string; // Ihmisen luettava nimi (kebab-case)
  pattern: string; // JavaScriptin säännöllisen lausekkeen malli
  replacement?: string; // Millä osuma korvataan
  replacementMap?: Record<string, string>; // TAI avain→korvaus-kartta
  flags?: string; // Säännöllisen lausekkeen liput (tavallisesti "gi")
  context?: "all" | "user" | "system" | "assistant";
  category?: "filler" | "context" | "structural" | "dedup" | "terse" | "ultra";
  minIntensity?: "lite" | "full" | "ultra"; // Ohita tätä pienemmällä voimakkuudella
  description?: string; // Dokumentaatio
}
```

### Esimerkki: hindinkielisten täytesanasääntöjen lisääminen

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

### Validointi

Sääntöpaketit validoidaan ladattaessa `_schema.json`-skeemaa vasten. Rakenteeltaan virheellisen paketin lataaminen epäonnistuu, ja lokiin kirjataan virhe:

```
RULE_LOADER: paketin "hi/filler.json" validointi epäonnistui:
  - rules.0.pattern: Virheellinen säännöllinen lauseke
  - rules.1.context: arvon on oltava jokin seuraavista: [all, user, system, assistant]
```

Validointi suoritetaan automaattisesti, kun paketti ladataan (`_schema.json`-skeemaa vasten); virheellinen paketti hylätään ja yllä oleva virhe kirjataan lokiin. Pakettien validointiin ei ole erillistä `npm run`-komentosarjaa — lataa paketti (esimerkiksi käynnistämällä palvelin tai suorittamalla pakkauspolku) ja seuraa lokeja.

### Mukautetun kielipaketin lataaminen

```ts
import { loadRulePack } from "omniroute/compression/ruleLoader";

await loadRulePack("./my-custom-rules/hi/filler.json");
```

Tai sijoita se tunnistettuun sijaintiin:

```
~/.omniroute/compression/rules/hi/filler.json  # Käyttäjätaso
<project>/.compression/rules/hi/filler.json   # Projektitaso
```

### Kielipakettien parhaat käytännöt

1. **Aloita `filler`-säännöistä** — niillä on suurin vaikutus
2. **Käytä `minIntensity`-arvoa** aggressiivisten sääntöjen rajaamiseen — tämä suojaa liialliselta pakkaukselta
3. **Sisällytä testitapaukset** — lisää JSON-tiedostoon `tests[]`-taulukko toiminnan varmistamiseksi
4. **Järjestyksellä on merkitystä** — aiemmat säännöt suoritetaan ensin; sijoita vaikuttavimmat säännöt ensimmäisiksi
5. **Käytä `replacement`-arvoa harkiten** — tyhjä merkkijono on yleensä oikea valinta; älä koskaan lisää uutta sisältöä

### Käännösstrategia

Kun sääntöpaketteja lokalisoidaan uudelle kielelle:

1. **Käännä sääntöjen nimet** — ne näkyvät virheenkorjaustulosteessa
2. **Mukauta säännöllisten lausekkeiden malleja** — suora käännös ei usein toimi (sanarajat eroavat toisistaan)
3. **Testaa oikeilla keskusteluilla** — paketin pitää toimia turvallisesti todellisella syötteellä
4. **Huomioi kulttuuriset käytännöt** — esimerkiksi japaninkielisissä paketeissa on enemmän kunnioittavia täyteilmauksia kuin englanninkielisissä

---

## Pinotut käsittelyketjut

**Pinottu käsittelyketju** suorittaa useita moottoreita peräkkäin siten, että kunkin moottorin tuloste syötetään seuraavalle. Näin `mode: stacked` toimii sisäisesti.

### Kuinka pinoaminen toimii

```
Syöte (10 000 tunnistetta)
        │
        ▼
   ┌──────────┐
   │ Moottori │  prioriteetti 10
   │  A       │  ──▶ tuloste: 6 000 tunnistetta (-40 %)
   └────┬─────┘
        ▼
   ┌──────────┐
   │ Moottori │  prioriteetti 50
   │  B       │  ──▶ tuloste: 2 400 tunnistetta (-60 %)
   └────┬─────┘
        ▼
   ┌──────────┐
   │ Moottori │  prioriteetti 100
   │  C       │  ──▶ tuloste: 1 200 tunnistetta (-80 %)
   └────┬─────┘
        │
        ▼
Lopullinen tuloste (1 200 tunnistetta, yhteensä ~88 % säästöä)
```

Kun `mode: "stacked"` on valittu, moottorit suoritetaan peräkkäin `pipeline`-taulukossa määritetyssä järjestyksessä.
Moottorin N tulosteesta tulee moottorin N+1 syöte.

### Pakkaustilat

OmniRoute valitsee **YHDEN tilan pyyntöä kohden** määritysten, automaattisen käynnistyksen kynnysarvojen ja yhdistelmäkohtaisten ohitusten perusteella.
Käytettävissä olevat tilat on määritetty tiedostossa `open-sse/services/compression/types.ts` (tyyppi `CompressionMode`):

| Tila         | Moottorit            | Käyttötapaus                                                                                                                                                                                                                                  |
| ------------ | -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `off`        | Ei mitään            | Poistaa kaiken pakkauksen käytöstä                                                                                                                                                                                                            |
| `rtk`        | Vain RTK             | Istunnot, joissa on paljon komentotulosteita (yli 80 % säästöä)                                                                                                                                                                               |
| `lite`       | Vain Lite            | Varovainen pakkaus (nopea ja turvallinen)                                                                                                                                                                                                     |
| `standard`   | Caveman              | Proosatekstin pakkaus kielipakettien avulla                                                                                                                                                                                                   |
| `aggressive` | Caveman + Aggressive | Aggressiivinen proosatekstin pakkaus + aggressiivinen viimeistelykierros                                                                                                                                                                      |
| `ultra`      | Ultra                | Enimmäispakkaus (häviöllinen, viimeinen vaihtoehto). Voidaan valinnaisesti reitittää **LLMLingua-2**-SLM-moottorin kautta, kun `ultra.modelPath` on asetettu (jos malli ei ole käytettävissä, siirrytään virheettä sääntöpohjaiseen polkuun). |
| `stacked`    | Mukautettu ketju     | Moottorien yhdistäminen missä tahansa järjestyksessä (katso alta)                                                                                                                                                                             |

> Edellä mainittujen tilamoottorien lisäksi rekisteri sisältää myös pinottavia erikoismoottoreita —
> **CCR**, **headroom**, **ionizer** ja **session-dedup** — jotka on dokumentoitu tiedostossa
> [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md#additional-built-in-engines).

Tilan valinnan määrittää `getEffectiveMode()` tiedostossa `open-sse/services/compression/strategySelector.ts`:

1. Jos pakkaus on poistettu käytöstä: `"off"`
2. Jos yhdistelmäkohtainen ohitus on olemassa: käytä ohitusta
3. Jos automaattisen käynnistyksen kynnysarvo ylittyy: käytä `autoTriggerMode`-tilaa (oletus: `"lite"`)
4. Muussa tapauksessa: käytä `defaultMode`-tilaa

### Oletusarvoinen pinottu käsittelyketju

Kun `mode: "stacked"` on määritetty erikseen, oletusarvoinen käsittelyketju yhdistää seuraavat:

1. **RTK** — poistaa komentotulosteen hälyn (~80 % säästöä päätetulosteissa)
2. **Caveman** — poistaa täytesanat ja tiivistää proosatekstiä (~46 % jäljellä olevasta tekstistä)
3. **Lite** — viimeinen välilyöntien siistimis- ja kaksoiskappaleiden poistokierros

Tällä yhdistelmällä saavutetaan **78–95 %:n säästö** istunnoissa, joissa käytetään paljon työkaluja.

### Pinottujen käsittelyketjujen määrittäminen

Yhdistelmämäärityksessä:

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

Voit jättää moottoreita pois, lisätä mukautettuja moottoreita tai muuttaa niiden järjestystä.

### Tilan välittäminen

Moottorit voivat lukea metatietoja pyyntökontekstista (kohdassa `options`):

```ts
compress(body, config) {
  // Lue aiempien moottorien metatiedot
  const original = options?.compressionComboId;  // "my-coding-combo"
  // ...
}
```

Metatiedot ovat **vain luku -muotoisia** — moottorit eivät voi muuttaa pyyntökontekstia, ainoastaan oman rungon tulostettaan.

### Suoritusjärjestyksen sudenkuopat

| Moottorien järjestys                                  | Vaikutus                                                                                     |
| ----------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| RTK → Caveman → Lite                                  | **Suositeltu** (poistaa ensin hälyn, sitten kielellisen ylimäärän ja lopuksi välilyönnit)    |
| Lite → RTK → Caveman                                  | Huono — Lite poistaa välilyönnit raakatuotoksesta, jolloin RTK:n hahmontunnistus epäonnistuu |
| Caveman → RTK                                         | Huono — Caveman voi muokata tekstiä tavoilla, joita RTK ei tunnista                          |
| Mikä tahansa järjestys, jossa `tool_results` on ensin | Parempi — työkalutuloste on sisällön hälyisin osa                                            |

### Milloin pinoamista EI pidä käyttää

Pinoaminen ei ole aina parempi vaihtoehto:

- **Yksinkertaiset viestit** (ei työkalutulostetta) — pelkkä Caveman tai Lite riittää
- **Kustannusherkät tilanteet** — kukin moottori lisää viivettä noin 5–50 ms
- **Tietyt työkalut** — pelkkä RTK riittää yleensä komentotulosteille

### Mukautetun käsittelyketjun luominen

Nimettyä putkistorekisteriä ei ole. Pinottu putkisto on vain **vaiheiden rivinsisäinen taulukko**, joka välitetään `applyStackedCompression()`-funktiolle (viedään paketista `@omniroute/open-sse/services/compression/strategySelector`):

```ts
import { applyStackedCompression } from "@omniroute/open-sse/services/compression/strategySelector";

const result = applyStackedCompression(body, [
  { engine: "rtk", intensity: "aggressive" },
  { engine: "caveman", intensity: "full" },
]);
```

Jos putkistoa ei anneta, oletusarvona on `rtk(standard) → caveman(full)`.

Jos haluat ohjata sitä konfiguraatiolla, aseta `mode: "stacked"` ja anna vaihetaulukko kohdassa `stackedPipeline` (luetaan kohdasta `config.stackedPipeline`):

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

## Upstream-synkronointikäytäntö

OmniRouten pakkausmoottoreiden yhteydessä mainitaan README-tiedostossa useita upstream-projekteja
("inspired by RTK, Caveman, LLMLingua-2, Troglodita"). Yleinen avustajien
kysymys kuuluu: **kun upstream-RTK lisää uuden työkalusuodattimen tai Caveman lisää
sääntöpaketin, miten se päätyy OmniRouteen?** Tämä osio antaa virallisen vastauksen.

### Vendoroidut kopiot vs. itsenäiset toteutukset

| Moottori                     | Suhde upstream-projektiin                                                                                                                     | Sijainti                                                            |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **RTK**                      | **Itsenäinen uudelleentoteutus** (inspiraation lähde, ei kopio)                                                                               | `open-sse/services/compression/engines/rtk/`                        |
| **Caveman**                  | **Itsenäinen uudelleentoteutus** (inspiraation lähde)                                                                                         | `open-sse/services/compression/engines/cavemanAdapter.ts`           |
| **Headroom**                 | Enimmäkseen sisäinen; vain `gcf/`-koodekki on **aidosti vendoroitu** projektista `gcf-typescript` (MIT, SPDX-merkitty, vain yleinen profiili) | `open-sse/services/compression/engines/headroom/gcf/`               |
| **LLMLingua-2 / Troglodita** | Inspiraation lähteitä (`llmlingua`- ja `session-dedup`-moottoreiden taustalla)                                                                | `open-sse/services/compression/engines/llmlingua/`, `session-dedup` |

Keskeinen asia: **RTK ja Caveman ovat ideoiden (suodatussääntöjen,
sääntöpakettien) puhtaalta pöydältä tehtyjä TypeScript-toteutuksia, eivät vendoroituja
lähdekoodipuita.** Upstream-kopiota, josta voisi suorittaa komennon `git pull`, ei
ole — juuri siksi README-tiedostossa lukee "inspired by" eikä "bundled".

### Miten upstream-parannukset yhdistetään

Käytössä **ei tarkoituksellisesti ole automaattista upstream-julkaisujen seurantaa eikä
`compression-sync`-tunnistetta**. Koska moottorit ovat uudelleentoteutuksia, upstream-RTK:n
suodatinta tai Cavemanin sääntöpakettia ei yhdistetä koodina, vaan se **ilmaistaan uudelleen uutena
sääntönä/suodattimena OmniRouten omassa muodossa** (katso
[COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md)) ja lisätään tapauskohtaisesti
tavallisen PR:n kautta. Edellä mainitut laajennuspisteet (mukautettu moottori, kielipaketti, RTK-suodatin)
ovat hyväksytty tapa osallistua tällaisen parannuksen tekemiseen.

Tuoreita esimerkkejä juuri tästä työnkulusta:

- RTK-suodattimet Gradlen ja `dotnet`-koontitulosteille (v3.8.42)
- RTK-suodattimet työkaluille kubectl / docker-build / composer / gh (#2824)
- Cavemanin indonesian kielipaketti (#3975) sekä saksan / ranskan / japanin / kiinan paketit

### Headroom (syötteenpakkausvälityspalvelin)

Headroom on **täysin sisäinen** — kiinnitetty vendoroitu tilannevedos `gcf`-koodekista sekä
OmniRouten omat `smartcrusher`- / `toon`- / `tabular`-kerrokset. Vendoroitua kopiota lukuun ottamatta
seurattavaa aktiivista upstream-projektia ei ole; `gcf` päivitetään
manuaalisesti koodekin muuttuessa ja validoidaan uudelleen pakkausbudjetin
tarkistusporttia (`check:compression-budget`) vasten.

### Upstream-projektin inspiroiman parannuksen ehdottaminen

1. **Älä vendoroi** — ilmaise upstream-sääntö/suodatin uudelleen OmniRouten muodossa.
2. Lisää se alla olevan vastaavan laajennuspisteen kautta (kielipaketti, RTK-suodatin tai
   mukautettu moottori).
3. Viittaa upstream-projektiin PR:n kuvauksessa (tekijyyden ilmoittamiseksi) sen sijaan, että
   kopioisit sen lisenssillä varustettua lähdekoodia.
4. Sisällytä testit ja varmista, että `check:compression-budget`-tarkistusportti läpäistään edelleen.

---

## Tulostyylin lisääminen

Tulostyylit (katso [oppaan luettelotaulukko](./COMPRESSION_GUIDE.md#output-styles-catalog))
ovat syötemoottoreiden vastine vastauspuolella: lähettämäsi sisällön pakkaamisen sijaan
ne ohjeistavat mallia tuottamaan edullisemman vastauksen. Rekisteri on
`OUTPUT_STYLE_CATALOG` tiedostossa `open-sse/services/compression/outputStyles/catalog.ts`, ja
**yksi luettelomerkintä muodostaa koko ominaisuuden**: injektori, hallintapaneelin asetuspaneeli,
pysyvä tallennus ja telemetria käyvät kaikki luettelon läpi — muuta päivitettävää luetteloa ei ole.

1. **Lisää yksi merkintä kohteeseen `OUTPUT_STYLE_CATALOG`** sisältäen kentät `id`, `label`, `description` ja
   kolme englanninkielistä `levels`-tasoa (`lite`, `full`, `ultra`). Jokaisen tason lopussa on oltava
   `${SHARED_BOUNDARIES}`, jotta koodi, polut, komennot, virheet ja URL-osoitteet säilyvät sanatarkkoina.
   Ohjetekstin on oltava **staattinen ja deterministinen** yhdistelmää
   `(id, level, language)` kohden — `${SHARED_BOUNDARIES}` on ainoa sallittu interpolointi.
2. **Käännä se.** Toimita vähintään `pt-BR`-lohko kohdassa `i18n`; `ponytail` ja
   `i-have-adhd` (en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi) toimivat rakennemalleina. Tarkoituksella
   yksikielinen tyyli asettaa sen sijaan `locale`-kentän (kuten `terse-cjk` → `zh`), jolloin sitä
   tarjotaan vain kyseisellä alueasetuksella.
3. **Päivitä matriisin tarkistus** — lisää tyylin kielet kohtaan `BASELINE_LANGUAGES` tiedostossa
   `tests/unit/compression/output-styles-i18n-matrix.test.ts`. Tarkistus hylkää kaikki uudet
   tyylit, joita ei ole rajattu alueasetuksella ja joista puuttuvat vaaditut käännökset, ellei niillä ole
   nimenomaista `KNOWN_ENGLISH_ONLY`-merkintää ja seurantatehtävää.
4. **Lisää tyylikohtainen testi** tiedoston
   `tests/unit/compression/i-have-adhd-catalog.test.ts` mallin mukaisesti: luettelon rakenne, rajausehto
   tasoa kohden sekä ankkuri, joka varmistaa, että jokainen käännös on kirjoitettu omalla
   kielellään eikä kopioitu englannista.
5. **Tekijän mainitseminen**: jos tyyli on mukautettu ylemmän tason projektista, mainitse se
   merkinnän lähdekommentissa (esim. `i-have-adhd` → ayghri/i-have-adhd, MIT) — sama
   sääntö kuin yllä kohdassa "Ylemmän tason projektin inspiroiman parannuksen ehdottaminen".

Käyttöliittymää, skeemaa tai telemetriaa ei tarvitse muuttaa — nämä pinnat renderöidään luettelon perusteella.

---

## Parhaat käytännöt

### Moottoreiden kehittäminen

1. **Toteuta aina `validateConfig`** — ilman validointia olevat moottorit aiheuttavat huomaamattomia virheitä
2. **Aseta realistinen `targetLatencyMs`** — strategian valitsin käyttää sitä moottoreiden valitsemiseen
3. **Käytä hallintapaneelia varten `getConfigSchema`-toimintoa** — älä koskaan piilota määrityksiä käyttäjiltä
4. **Tue asetusta `stackable: true`, jos moottorisi on puhdas** — sivuvaikutuksia sisältäviä moottoreita ei pidä pinota
5. **Kirjoita upotettuja testejä** — moottorit pitäisi voida todentaa alle sekunnissa

### Kielipakettien kehittäminen

1. **Aloita `lite`-intensiteetillä** — sääntöjesi tulee olla turvallisia alimmalla asetuksella
2. **Rajaa säännöt `context`-kentällä** — vain `user`-kontekstiin kohdistuvat säännöt eivät voi vahingossa vaikuttaa järjestelmäkehotteisiin
3. **Vältä JSON-avainten sieppaamista** — `\\bword\\b` voi täsmätä JSON-rakenteen sisällä ja rikkoa rakenteisen datan
4. **Testaa reunatapauksilla** — tyhjä syöte, unicode, RTL-teksti, emojit
5. **Käytä olemassa olevia paketteja malleina** — `en/filler.json` on pisimmälle kehitetty esimerkki

### Putken suunnittelu

1. **Profiloi ennen optimointia** — mittaa ensin toiminnolla `compression_stats`
2. **Suosi koostamista uudelleentoteutuksen sijaan** — laajenna Caveman-sääntöjä ennen uuden moottorin kirjoittamista
3. **Dokumentoi järjestyksen perustelut** — kommentoi, miksi moottori A tulee ennen moottoria B
4. **Testaa kaikilla kolmella intensiteettitasolla** — `lite` on nopea mutta häviöllinen, `ultra` on hidas mutta tarkka

---

## Viite: Sisäänrakennetut moottorit

| Moottorin tunnus     | Pinottava | Oletusarvoinen stackPriority | Kohteet                               |
| -------------------- | --------- | ---------------------------- | ------------------------------------- |
| `lite`               | Kyllä     | 5                            | viestit, työkalutulokset              |
| `rtk`                | Kyllä     | 10                           | työkalutulokset                       |
| `standard` (caveman) | Kyllä     | 20                           | viestit, työkalutulokset, koodilohkot |
| `aggressive`         | Kyllä     | 30                           | viestit                               |
| `ultra`              | Kyllä     | 40                           | viestit, koodilohkot                  |

### Katso myös

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — Putken yleiskatsaus
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — Moottorirekisterin viite
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — Sääntömuodon määrittely
- [COMPRESSION_LANGUAGE_PACKS.md](./COMPRESSION_LANGUAGE_PACKS.md) — Kielipakettien tiedot
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK-moottori ja mukautetut suodattimet
- Lähde: `open-sse/services/compression/` (117 tiedostoa, ~250 kt)
