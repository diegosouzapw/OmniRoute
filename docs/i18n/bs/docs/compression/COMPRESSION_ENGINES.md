# Compression Engines (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_ENGINES.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_ENGINES.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_ENGINES.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_ENGINES.md)

---

# Mehanizmi kompresije

OmniRoute kompresija je izgrađena oko ugovora o mehanizmima. Režim može pokrenuti jedan mehanizam direktno (`caveman` ili `rtk`) ili deterministički složeni cjevovod koji izvršava više mehanizama redom.

## Načini rada

| Način rada   | Putanja mehanizma                                                                                        | Namijenjeni ulaz                                      |
| ------------ | -------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| `off`        | nema                                                                                                     | Potpuno očuvanje upita                                |
| `lite`       | Caveman lite pomoćni alati                                                                               | Stalno aktivno čišćenje niskog rizika                 |
| `standard`   | Caveman                                                                                                  | Sažimanje upita na prirodnom jeziku                   |
| `aggressive` | Caveman + sažimači historije/alata                                                                       | Duge sesije razgovora                                 |
| `ultra`      | Caveman + pomoćni alati za skraćivanje                                                                   | Oporavak nakon dostizanja ograničenja konteksta       |
| `rtk`        | RTK                                                                                                      | Izlaz terminala, ljuske, izgradnje, testiranja i gita |
| `omniglyph`  | OmniGlyph                                                                                                | Kontekst kao slika na izvornoj vezi pružaoca usluge   |
| `stacked`    | Cjevovod. Zadana vrijednost zahtjeva je `session-dedup -> lite`. `rtk -> caveman` se uključuje po želji. | Mješoviti zapisnici alata i proza, maksimalna ušteda  |

### Profili kompresije OmniGlyph

Mehanizam `omniglyph` (paket `omniglyph`, 1.4.0+) prihvata imenovani semantički profil, postavljen
globalno putem `omniglyph.profile` u postavkama kompresije ili po koraku putem konfiguracije
koraka složenog cjevovoda:

| Profil        | Granica                                                                                                                      |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `aggressive`  | Zadano. Pravilo prema kojem su mjerene objavljene potvrde — pretvara sistem, dokumentaciju alata i opsežnu historiju u slike |
| `balanced`    | Zadržava aktivno stanje u izvornom obliku, štiti posljednjih 8 interakcija, sažima stariju završenu historiju                |
| `coding-safe` | Zadržava ovlaštenja, sheme alata i aktivni izlaz alata u izvornom obliku, štiti posljednjih 12 interakcija                   |
| `passthrough` | Usmjerava bez transformacije; mehanizam se preskače                                                                          |

Profil je **gornja, a ne donja granica**: `mergeCompressionProfileOptions` u paketu
ne dozvoljava da prepisivanje pozivaoca ponovo otvori kanal s gubicima koji je profil zatvorio, pa postavka
`preserveSystemPrompt: false` po koraku ne može ponovo omogućiti kompresiju sistema pod profilom `coding-safe`.

Izmjereno na ovoj bazi koda: `coding-safe` i `balanced` podižu `minCompressChars` na njegovu
maksimalnu vrijednost te zadržavaju sistem, sheme alata i rezultate alata u izvornom obliku, pa se sesija koja još nije
akumulirala historiju zaustavlja na `below_min_chars` i mehanizam ništa ne transformiše. Zbog toga
je zadana vrijednost `aggressive`, a ne najsigurniji profil.

Paket određuje vlastiti opseg modela i profil iz svoje konfiguracije okruženja.
OmniRoute nikada ne delegira odluku: adapter fiksira ograničenje modela na najrestriktivniji
opseg paketa, pa postavke okruženja domaćina mogu samo suziti listu dozvoljenih, ali je nikada
ne mogu proširiti izvan izmjerenih potvrda OmniRoutea.

## Registar mehanizama

Registar se nalazi u `open-sse/services/compression/engines/registry.ts`. Mehanizmi izlažu zajednički ugovor:

- `id`: stabilni ID mehanizma kao što je `caveman` ili `rtk`
- `apply(text, config)`: naslijeđena putanja izvršavanja koju koriste složeni (stacked) cjevovodi
- `compress(input, config)`: primarna putanja izvršavanja koja vraća tekst + statistiku
- `getConfigSchema()`: vraća oblik važeće konfiguracije nalik na JSON-Schema
- `validateConfig(config)`: vraća `{ valid, errors[] }`

Registracija koristi `registerCompressionEngine(engine)` (ili `registerEngine` za napredne slučajeve), koji poziva `assertValidEngine()` i `validateConfig(defaultConfig)` prije prihvatanja.
Koristite `unregisterCompressionEngine(id)` za uklanjanje mehanizma tokom izvršavanja.

`strategySelector.ts` registruje ugrađene mehanizme prije pokretanja kompresije. Ovo omogućava pregledu, kompresiji tokom izvršavanja, složenom režimu, testovima i budućim mehanizmima da koriste istu putanju izvršavanja.

### Kompresija MCP opisa (povezano)

Poseban registar kompresuje metapodatke opisa MCP alata na nivou registra — pogledajte `open-sse/mcp-server/descriptionCompressor.ts` i [MCP-SERVER.md](../frameworks/MCP-SERVER.md). On ponovo koristi Caveman pravila, ali radi na metapodacima alata, a ne na payload-ima zahtjeva.

### Dodatni ugrađeni mehanizmi

Pored Caveman, RTK i LLMLingua-2, registar isporučuje nekoliko specijalizovanih mehanizama bez gubitaka / strukturnih mehanizama (koje koriste složeni cjevovodi, playground i testovi):

| Mehanizam     | Id              | Šta radi                                                                                                                                                                                   |
| ------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| CCR           | `ccr`           | Content-Compress-Retrieve (H4): zamjenjuje velike susjedne blokove teksta referencama adresiranim sadržajem, tako da se ponovljeni/veliki blokovi šalju jednom i nakon toga referenciraju. |
| headroom      | `headroom`      | SmartCrusher (H3 + N5): kompresija bez gubitaka tabelarnih homogenih JSON-niz payload-a u kolumnarni `[N rows]` oblik.                                                                     |
| ionizer       | `ionizer`       | Uzorkovanje redova glava/sredina/rep za veoma velike homogene blokove, pohranjujući izostavljenu sredinu kao CCR referencu adresiranu sadržajem.                                           |
| session-dedup | `session-dedup` | Dedupikacija između poteza adresirana sadržajem (inspirisana TokenMizer-om): izostavlja tekst koji je već viđen u ranijim potezima iste sesije.                                            |

**Uputstvo za CCR protokol preuzimanja (#8033):** prvi put kada CCR zamijeni ≥1 blok u zahtjevu, mehanizam dodaje jednu, idempotentnu `system` poruku (koja počinje sa `[CCR protocol]` sentinelom) podučavajući pozivaoca ugovoru marker → alat: šta znači `[CCR retrieve hash=<24hex> chars=N]` marker, da se heš mora kopirati doslovno (svih 24 heksadecimalna znaka — pogrešno kopirani heševi su vjerovatan uzrok grešaka "blok nije pronađen"), i da `[dedup:ref sha=...]` marker znači "pogledaj nazad u istoriju", a ne "pozovi alat". Napomena se ubacuje **samo kada `tools[]` koji je pozivalac reklamirao dokazuje da zaista može dosegnuti `omniroute_ccr_retrieve`** (`callerSupportsCcrRetrieve()` u `open-sse/services/compression/engines/ccr/protocolInstruction.ts`) — običan OpenAI-kompatibilan pozivalac bez tog alata nikada ne dobija uputstvo da pozove nešto što ne može dosegnuti. Idempotentnost se sprovodi skeniranjem istorije poruka za sentinelom prije ubacivanja, tako da zahtjevi sa više poteza (koji ponavljaju prethodne poruke) ne gomilaju napomenu jednom po potezu.

## Caveman

Caveman način rada se fokusira na semantičku kondenzaciju običnog teksta:

- čuva blokove koda, URL-ove, JSON, putanje i strukturirane podatke
- uklanja poštapalice, okolišanje, ponovljeni kontekst i opširne vezne fraze
- podržava pakete pravila za datoteke svjesne jezika u `open-sse/services/compression/rules/`
- ostaje dostupan kroz naslijeđene `standard`, `aggressive` i `ultra` načine rada

Površina kontrolne ploče je `Dashboard -> Context & Cache -> Caveman`.

Caveman upstream izvještava o `~75%` manje izlaznih tokena, `65%` prosječnoj uštedi izlaza u benchmark testovima sa rasponom od `22-87%`, i `~46%` alatu za kompresiju ulaza. OmniRoute koristi Caveman broj na strani ulaza prilikom dokumentiranja ušteda složenih upita/konteksta; Caveman izlazni način rada ostaje zasebna značajka ponašanja odgovora.

## RTK

RTK način rada se fokusira na izlaz komandi i alata:

- detektuje klase izlaza kao što su `git status`, `git branch`, `git diff`, Vitest/Jest/Pytest, Cargo/Go testovi, TypeScript/Vite/Webpack buildovi, ESLint, npm audit/installs, Docker logovi, shell `find`/`grep`, stack traceovi i generički logovi
- primjenjuje 49 JSON filtera iz `open-sse/services/compression/engines/rtk/filters/`
- podržava deklarativni pipeline u RTK stilu: ANSI stripping, zamjena, short-circuit podudaranja izlaza, uklanjanje/zadržavanje linija, skraćivanje po liniji, skraćivanje head/tail/max-line, i fallback na prazno
- podržava projektne filtere zaštićene povjerenjem u `.rtk/filters.json` i globalne filtere u `DATA_DIR/rtk/filters.json`
- uklanja ANSI sekvence, šum napretka, ponovljene linije i beskorisni boilerplate
- čuva korisne greške, upozorenja, sažetke, promijenjene datoteke i tail kontekst
- može opciono zadržati redigovani sirovi izlaz za oporavak/otklanjanje grešaka putem autentifikovanih upravljačkih ruta

Površina kontrolne ploče je `Dashboard -> Context & Cache -> RTK`.

Operativni detalji za prilagođene filtere, povjerenje, verifikaciju i oporavak sirovog izlaza nalaze se u [`RTK_COMPRESSION.md`](./RTK_COMPRESSION.md).

RTK upstream izvještava o `60-90%` uštede za kompresiju izlaza komandi. Njegov README primjer pokazuje 30-minutnu Claude Code sesiju koja ide od `~118,000` tokena do `~23,900`, ili `79.7%` uštede.

## LLMLingua-2 (Semantičko orezivanje)

LLMLingua-2 način rada vrši **semantičko orezivanje tokena** na prozi koristeći mali ONNX klasifikator tokena, dopunjujući Caveman i RTK mašine zasnovane na pravilima:

- komprimuje prozu samo u porukama koje nisu sistemske; ograđeni blokovi koda i druge sačuvane konstrukcije se nikada ne mijenjaju
- pokreće `@atjsh/llmlingua-2` backend (ONNX putem `@huggingface/transformers`) u radnoj niti (worker thread), tako da zaključivanje modela nikada ne blokira event loop zahtjeva
- je **slagljiv** (`stackPriority` 35): u složenom pipeline-u se pokreće nakon strukturnih mašina (CCR, session-dedup, headroom, Caveman), ali prije `ultra`, jer je semantičko orezivanje najefikasnije na već strukturno komprimovanom tekstu — npr. `rtk -> caveman -> llmlingua`
- **fail-opens pri bilo kojoj grešci** (nedostajuće opcione zavisnosti, pokretanje radnika, učitavanje modela, zaključivanje ili timeout) → originalni tekst se vraća nepromijenjen, nikada greška

Lokacija mašine: `open-sse/services/compression/engines/llmlingua/`. Površina kontrolne ploče je `Dashboard -> Context & Cache -> LLMLingua`.

### Modeli

Zadani model je **TinyBERT** (`atjsh/llmlingua-2-js-tinybert-meetingbank`, ~57 MB, brz). Model **BERT-base** veće tačnosti (`Arcoldd/llmlingua4j-bert-base-onnx`, ~710 MB) je dostupan putem polja `model` u konfiguraciji mašine. `@huggingface/transformers` preuzima odabrani model lijeno (lazily) sa HuggingFace Hub-a u `${DATA_DIR}/models/llmlingua` pri prvom pozivu (`modelStore.ts`); `modelPath` konfiguracijsko preusmjeravanje ga usmjerava na lokalnu kopiju (offline / air-gapped instalacije).

### Opcione zavisnosti & instalacija na zahtjev

LLMLingua runtime peer stack koji se može orezivati je **opcion**. Dva paketa su deklarisana kao `optionalDependencies` u `package.json` i zadržana su **eksterna** od strane produkcijskog builda (`scripts/build/prepublish.ts` ih ne pakuje):

| Paket                | Verzija (pin) | Bilješke                                    |
| -------------------- | ------------- | ------------------------------------------- |
| `@atjsh/llmlingua-2` | `2.0.5`       | Ulazni paket; deklariše ostale kao peer-ove |
| `js-tiktoken`        | `^1.0.20`     | Tokenizer                                   |

`@huggingface/transformers` je pinovan na `^4.2.0` (dijeljen sa lokalnom putanjom embeddinga i također praćen u samostalni bundle); `@atjsh/llmlingua-2@2.0.5` se oslanja na njega sa `"^3.5.2 || ^4.0.0"`, tako da su podržani i Transformers.js v3 i v4. Od verzije 2.0.4, `@atjsh/llmlingua-2` više ne zahtijeva `@tensorflow/tfjs`, što je uklonilo najvećeg pojedinačnog doprinosioca (TensorFlow.js) iz SLM stacka. Samo su dva gore navedena paketa prunable SLM peer-ovi. Standardni `npm install` (dev) automatski instalira opcioni stack osim ako se opcione zavisnosti ne izostave.

**Zašto na zahtjev:** npm-objavljeni paket, samostalni bundle i Docker slika se isporučuju **bez** ovih zavisnosti kako bi ostali lagani. Kada su odsutne, kapija zavisnosti radnika (resolve proba `@atjsh/llmlingua-2` u `worker.ts`) ne uspijeva i mašina **fail-opens tiho** — odabir LLMLingua postaje no-op (tekst se vraća nepromijenjen, greška nije zabilježena). Da biste ga aktivirali u okruženju sa orezivanjem, instalirajte opcioni stack:

```bash
# pin na verzije deklarisane u package.json optionalDependencies
npm install @atjsh/llmlingua-2@2.0.5 js-tiktoken
```

Uklanjanje `@tensorflow/tfjs` (2.0.4+) eliminiše prethodno dominantnog ~800 MB doprinosioca — preostali otisak su transformers.js + onnxruntime-node runtime-i, plus TinyBERT model (~57 MB) preuzet pri prvoj upotrebi (ne putem npm-a).

Po okruženju:

- **Dev / `npm install`** — instalira se automatski osim ako niste proslijedili `--omit=optional` (ili `--no-optional`). Nije potrebna nikakva radnja.
- **Global npm (`npm i -g omniroute`) / standalone** — pokrenite gornju naredbu za instalaciju unutar direktorija instaliranog paketa ili ponovo instalirajte bez izostavljanja opcionalnih zavisnosti.
- **Docker** — dodajte naredbu za instalaciju u izvedeni sloj slike; objavljena slika je po dizajnu minimalna.
- **VPS (PM2)** — instalirajte u `node_modules` aplikacije, a zatim ponovo pokrenite proces kako bi worker ponovo provjerio gate.
- **Raw Next standalone (`npm run build` → `.build/next/standalone/server.js`)** — standalone trace ne isporučuje NI worker NI opcionalne zavisnosti, pa engine tiho prelazi u fail-open. `scripts/build/colocate-standalone.mjs` ponovo primjenjuje oboje (worker esbuild + closure opcionalnih zavisnosti u standalone stablo); pokreće se automatski putem `postbuild` npm hook-a nakon svakog builda. Idempotentan, fail-soft kada zavisnosti nedostaju.

**Provjerite je li aktivno:** sa odabranim LLMLingua, stvarni tekst se zapravo smanjuje (engine prestaje sa fail-open ponašanjem), a prvi zahtjev pokreće preuzimanje modela u `${DATA_DIR}/models/llmlingua`. Gate namjerno provjerava samo `@atjsh/llmlingua-2` — ostali parovi su samo ESM i `require.resolve` baca grešku na njima čak i kada su prisutni — tako da worker i dalje prelazi u fail-open ako bilo koji par zaista nedostaje u vrijeme `import()` poziva.

## Stacked Pipelines

Stacked režim pokreće korake cjevovoda (pipeline) redom. Zadana vrijednost je:

```txt
rtk -> caveman
```

Koristite ovo za sesije kodiranja agenata gdje upit kombinuje izlaz komande sa prozom čovjeka ili asistenta. RTK prvo smanjuje bučne logove alata, a zatim Caveman komprimuje preostali prirodni jezik.

Koraci cjevovoda se konfigurišu pomoću `stackedPipeline` u postavkama kompresije ili kroz kombinacije kompresije.

Kada oba mehanizma smanjuju isti prihvatljivi payload, uštede se sabiraju:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## MCP Accessibility Tree Filter

MCP accessibility-tree pametni filter je sloj kompresije nakon izvršenja koji se pokreće na **rezultatima alata** MCP-a, a ne na upitima ili kontekstu. On cilja opširne accessibility-tree i browser snapshot payload-e koje vraćaju alati kao što su Playwright, computer-use i browser-automation MCP serveri.

### Šta radi

1. **Uklanjanje šuma** — uklanja prazne generic/text unose (`- generic:`, `- text: ""`)
2. **Sažimanje srodnih elemenata (Sibling collapse)** — kada je ≥ `collapseThreshold` (zadano 30) uzastopnih linija strukturno ponavljanje, sažima ih u prvih `collapseKeepHead` (zadano 10) linija + sažetak broja + posljednjih `collapseKeepTail` (zadano 5) linija
3. **Očuvanje referenci (Ref preservation)** — `[ref=eXX]` sidra koja zahtijevaju Playwright/computer-use se nikada ne diraju
4. **Tvrdo skraćivanje (Hard truncation)** — ako tekst nakon sažimanja i dalje premašuje `maxTextChars` (zadano 50.000), skraćuje ga uz napomenu za navigaciju kako bi agent mogao nastaviti raditi

### Lokacija mehanizma

```txt
open-sse/services/compression/engines/mcpAccessibility/
  index.ts            ← smartFilterText() ulazna tačka
  collapseRepeated.ts ← algoritam za sažimanje srodnih elemenata
  constants.ts        ← DEFAULT_MCP_ACCESSIBILITY_CONFIG
```

### Konfiguracija

Kontrolisano pomoću `compression.mcpAccessibility` u globalnim postavkama (migracija 056). Zadana konfiguracija:

```json
{
  "enabled": true,
  "maxTextChars": 50000,
  "collapseThreshold": 30,
  "collapseKeepHead": 10,
  "collapseKeepTail": 5,
  "minLengthToProcess": 2000
}
```

Filter se primjenjuje samo na payload-e rezultata alata čiji je `type` `"text"` i čija dužina premašuje `minLengthToProcess`. Ne utiče na kompresiju upita ili payload-e zahtjeva.

### Očekivane uštede

60–80% na rezultatima alata za snimanje pretraživača (browser snapshot), zavisno od složenosti stranice. Algoritam sažimanja je O(n) u broju linija i dodaje zanemarljivo kašnjenje.

### Ovaj filter u odnosu na gore navedene mehanizme kompresije

| Aspekt          | Caveman / RTK / Stacked    | MCP accessibility filter               |
| --------------- | -------------------------- | -------------------------------------- |
| Cilj            | Upiti zahtjeva / kontekst  | Rezultati MCP alata                    |
| Okidač          | Postavka režima kompresije | `compression.mcpAccessibility.enabled` |
| Opseg           | Sve SSE poruke             | Samo rezultati alata                   |
| Sidra referenci | N/A                        | Očuvano bezuslovno                     |

---

## Kompresijske kombinacije

Kompresijske kombinacije su imenovane kompresijske profilne postavke koje se mogu dodijeliti kombinacijama usmjeravanja (routing combos):

- `compression_combos`: pohranjuje način rada (mode), cjevovod (pipeline), RTK konfiguraciju, jezičnu konfiguraciju i zadani marker
- `compression_combo_assignments`: mapira kompresijsku kombinaciju na kombinaciju usmjeravanja
- integracija tokom izvođenja (runtime) razrješava dodijeljenu kompresijsku kombinaciju prije generičkih nadjačavanja kombinacija
- analitika uključuje `compression_combo_id` i `engine`

Površina nadzorne ploče (Dashboard): `Dashboard -> Context & Cache -> Compression Combos`.

## API površina

| Ruta                                   | Svrha                                                                     |
| -------------------------------------- | ------------------------------------------------------------------------- |
| `/api/settings/compression`            | Globalne postavke kompresije (uključuje `mcpAccessibility` konfiguraciju) |
| `/api/compression/preview`             | Pregled bilo kojeg načina kompresije                                      |
| `/api/compression/language-packs`      | Popis dostupnih Caveman jezičnih paketa                                   |
| `/api/context/caveman/config`          | Alias za Caveman postavke                                                 |
| `/api/context/rtk/config`              | RTK zadane vrijednosti i postavke                                         |
| `/api/context/rtk/filters`             | Katalog RTK filtera                                                       |
| `/api/context/rtk/test`                | RTK endpoint za pregled/testiranje                                        |
| `/api/context/rtk/raw-output/[id]`     | Autentificirani oporavak redigiranog sirovog izlaza (raw-output)          |
| `/api/context/combos`                  | CRUD za kompresijske kombinacije                                          |
| `/api/context/combos/[id]/assignments` | CRUD za dodjelu kombinacija usmjeravanja                                  |
| `/api/context/analytics`               | Alias za analitiku kompresije                                             |

Upravljačke rute zahtijevaju upravljačku autentifikaciju ili provjere pravila API ključa.

## MCP alati

Kompresija izlaže pet MCP alata:

| Alat                                | Opseg               | Svrha                                            |
| ----------------------------------- | ------------------- | ------------------------------------------------ |
| `omniroute_compression_status`      | `read:compression`  | Postavke, analitika, statistika predmemorije     |
| `omniroute_compression_configure`   | `write:compression` | Ažuriranje globalnih postavki                    |
| `omniroute_set_compression_engine`  | `write:compression` | Postavljanje načina rada i opcionalnog cjevovoda |
| `omniroute_list_compression_combos` | `read:compression`  | Popis kompresijskih kombinacija                  |
| `omniroute_compression_combo_stats` | `read:compression`  | Čitanje analitike kombinacija/motora             |

## Opseg i isključenja

**Ugradnje (Embeddings) se nikada ne komprimiraju.** `open-sse/handlers/embeddings.ts` nikada ne poziva nijedan kompresijski motor — tijela zahtjeva/odgovora prolaze izravno do izvršitelja netaknuta. Ovo je danas strukturno (ugradnje i dovršavanje chata su odvojeni rukovatelji), a ne provjera tokom izvođenja, ali to znači da problem izobličenja vektora u #8034 nema površinu izloženosti u putanji ugradnji.

**Filtar isključenja po modelu/endpointu (#8034).** Za dovršavanje chata, operater može imenovati ID-ove modela / `provider/model` ciljeve koji se nikada ne smiju komprimirati — zaštitna ograda korisna ako se kompresija ikada kasnije poveže bliže putanji susjednoj ugradnjama, a općenito korisna za bilo koji model čiji točan prompt bajt-po-bajt je važan (determinističke procjene, prefiksi osjetljivi na predmemoriju, itd.).

- Polje postavki: `exclusions?: string[]` u globalnoj konfiguraciji kompresije (`GET`/`PUT /api/settings/compression`), pohranjeno putem postojećeg `key_value` kompresijskog prostora imena (`src/lib/db/compression.ts`) — nema nove tablice.
- Kartica nadzorne ploče: **Dashboard → Compression → Exclusions** (`/dashboard/compression/exclusions`).
- Sintaksa uzorka: `*` je jedini zamjenski znak (wildcard). Svaki drugi regex metaznak u uzorku se eskapira prije podudaranja, tako da `gpt-5.6` odgovara samo doslovnom nizu, nikada `gpt-5x6` (sigurno od ReDoS-a, ograničeno, bez ugniježđenih kvantifikatora). Uzorci se podudaraju neovisno o veličini slova (case-insensitive) i s golim ID-om modela i s `provider/model` kompozitom — `gpt-5-6`, `openai/gpt-5-6` i `openai/*` svi rade, a `*` sam po sebi isključuje svaki model.
- Podudaranje: `isCompressionExcluded()` / `normalizeCompressionExclusions()` u `open-sse/services/compression/exclusions.ts`. `chatCore.ts` provjerava isključeni cilj odmah nakon razrješavanja postavki kompresije, **prije nego što se pokrene bilo koji motor**, i tretira podudaranje točno kao da je kompresija globalno onemogućena — tijelo zahtjeva je dokazivo identično bajt po bajt. Preskakanje se bilježi putem `writeCompressionSkip(..., "excluded")` radi vidljivosti analitike.
- Zadano (prazan/odsutan popis): identično ponašanju prije #8034 — ništa nije isključeno.

## Poznata ograničenja

- **LLMLingua-2 (SLM) zahtijeva kolocirane opcionalne zavisnosti.** Worker se pokreće samo u produkcijskoj verziji kada su `@atjsh/llmlingua-2` + parnjaci kolocirani u `dist/node_modules` (pogledajte `scripts/build/colocateOptionals.mjs`, #4286). Bez njih, engine se otvara u slučaju greške (vraća originalni tekst). Worker rezolucija više ne zavisi od `import.meta.url` (to ne radi u samostalnom paketu) — ona se oslanja na runtime cwd / `argv[1]`.
- **Caveman jezički paketi `de` / `fr` / `ja` su djelimični.** Oni isporučuju `context` + `filler` + `structural` pravila, ali ne i `dedup` / `ultra` pakete, tako da `ultra` intenzitet nije jači od `full` za te jezike (oni koriste samo svoja pravila — ne postoji tihi povratak na engleska `dedup`/`ultra` pravila, što bi iskrivilo strani tekst). `en` / `es` / `id` / `pt-BR` su potpuni. Doprinosi za `dedup.json` + `ultra.json` za djelimične pakete su dobrodošli.
- **Složena telemetrija navodi samo engine koji su izvršili kompresiju.** Korak `stacked-pipeline` čiji je engine radio, ali je proizveo 0 % uštede, vraća `stats:null` i stoga se ne pojavljuje u `engineBreakdown` — ne razlikuje se od koraka koji je preskočen. Razlikovanje "radio, 0 %" od "preskočen" zahtijevalo bi promjenu `breakdown-model` i to je odgođeno.

## Validacija

Ciljane provjere za ovo područje su:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-*.test.ts tests/unit/compression/pipeline-integration.test.ts tests/unit/compression/context-compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/*.test.ts tests/golden-set/*.test.ts tests/integration/compression-pipeline.test.ts tests/unit/api/compression/compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/mcpAccessibility*.test.ts
npm run typecheck:core
```
