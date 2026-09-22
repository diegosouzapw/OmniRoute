# Compression Engines (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_ENGINES.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_ENGINES.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_ENGINES.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_ENGINES.md)

---

Kompresija u OmniRouteu temelji se na ugovorima mehanizama. Način rada može izravno pokretati jedan mehanizam
(`caveman` ili `rtk`) ili deterministički složeni cjevovod koji redom izvršava više mehanizama.

## Načini rada

| Način rada   | Putanja mehanizma                         | Predviđeni ulaz                                    |
| ------------ | ----------------------------------------- | -------------------------------------------------- |
| `off`        | nijedan                                   | Točno očuvanje upita                               |
| `lite`       | Pomoćne funkcije Caveman lite             | Stalno čišćenje niskog rizika                      |
| `standard`   | Caveman                                   | Sažimanje upita na prirodnom jeziku                |
| `aggressive` | Caveman + sažimatelji povijesti/alata     | Duge sesije razgovora                              |
| `ultra`      | Caveman + pomoćne funkcije za obrezivanje | Oporavak od ograničenja konteksta                  |
| `rtk`        | RTK                                       | Izlaz terminala, ljuske, izgradnje, testova i gita |
| `omniglyph`  | OmniGlyph                                 | Kontekst kao slika na izvornom sučelju pružatelja  |
| `stacked`    | Cjevovod, zadano `rtk -> caveman`         | Mješoviti zapisnici alata i proza, najveća ušteda  |

### Profili kompresije OmniGlyph

Mehanizam `omniglyph` (paket `omniglyph`, 1.4.0+) prihvaća imenovani semantički profil, postavljen
globalno putem `omniglyph.profile` u postavkama kompresije ili za svaki korak putem konfiguracije
koraka složenog cjevovoda:

| Profil        | Granica                                                                                                         |
| ------------- | --------------------------------------------------------------------------------------------------------------- |
| `aggressive`  | Zadano. Pravilo prema kojem su mjerene objavljene potvrde — slike sustava, dokumentacija alata i gusta povijest |
| `balanced`    | Zadržava aktivno stanje u izvornom obliku, štiti posljednjih 8 krugova i sažima stariju zatvorenu povijest      |
| `coding-safe` | Zadržava ovlasti, sheme alata i aktivni izlaz alata u izvornom obliku te štiti posljednjih 12 krugova           |
| `passthrough` | Usmjerava bez transformacije; mehanizam se preskače                                                             |

Profil je **gornja granica, a ne donja**: `mergeCompressionProfileOptions` u paketu
ne dopušta da nadjačavanje pozivatelja ponovno otvori kanal s gubicima koji je profil zatvorio, pa postavka
`preserveSystemPrompt: false` za pojedinačni korak ne može ponovno omogućiti kompresiju sustava u profilu `coding-safe`.

Prema mjerenjima na ovoj bazi koda: `coding-safe` i `balanced` podižu `minCompressChars` na njegovu
najveću vrijednost i zadržavaju sustav, sheme alata i rezultate alata u izvornom obliku, pa se sesija koja još nije
prikupila povijest zaustavlja na `below_min_chars`, a mehanizam ništa ne transformira. Zato je zadani profil
`aggressive`, a ne najsigurniji profil.

Paket razrješava vlastiti opseg modela i profil iz konfiguracije okruženja.
OmniRoute nikada ne delegira tu odluku: prilagodnik ograničava pristup modelu na najrestriktivniji opseg paketa,
pa postavke okruženja glavnog sustava mogu samo suziti popis dopuštenih, ali ga nikada ne mogu proširiti izvan
izmjerenih potvrda OmniRoutea.

## Registar mehanizama

Registar se nalazi u `open-sse/services/compression/engines/registry.ts`. Mehanizmi izlažu zajednički
ugovor:

- `id`: stabilni ID mehanizma, kao što je `caveman` ili `rtk`
- `apply(text, config)`: zastarjeli put izvršavanja koji upotrebljavaju složeni cjevovodi
- `compress(input, config)`: primarni put izvršavanja koji vraća tekst i statistiku
- `getConfigSchema()`: vraća strukturu valjane konfiguracije nalik JSON shemi
- `validateConfig(config)`: vraća `{ valid, errors[] }`

Registracija se izvodi pomoću `registerCompressionEngine(engine)` (ili `registerEngine` za napredne slučajeve),
koji prije prihvaćanja poziva `assertValidEngine()` i `validateConfig(defaultConfig)`.
Upotrijebite `unregisterCompressionEngine(id)` za uklanjanje mehanizma tijekom izvođenja.

`strategySelector.ts` registrira ugrađene mehanizme prije pokretanja kompresije. To omogućuje pretpregledu,
kompresiji tijekom izvođenja, složenom načinu rada, testovima i budućim mehanizmima da upotrebljavaju isti put izvršavanja.

### Kompresija MCP opisa (povezano)

Zaseban registar komprimira metapodatke opisa MCP alata na razini registra — pogledajte
`open-sse/mcp-server/descriptionCompressor.ts` i [MCP-SERVER.md](../frameworks/MCP-SERVER.md). Ponovno upotrebljava
pravila Cavemana, ali djeluje na metapodacima alata, a ne na sadržaju zahtjeva.

### Dodatni ugrađeni mehanizmi

Uz Caveman, RTK i LLMLingua-2, registar uključuje nekoliko specijaliziranih mehanizama bez gubitaka /
strukturnih mehanizama (koje upotrebljavaju složeni cjevovodi, razvojno okruženje i testovi):

| Mehanizam     | Id              | Što radi                                                                                                                                                                                |
| ------------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CCR           | `ccr`           | Content-Compress-Retrieve (H4): zamjenjuje velike susjedne blokove teksta referencama adresiranima sadržajem, tako da se ponovljeni/veliki blokovi šalju jednom, a zatim referenciraju. |
| headroom      | `headroom`      | SmartCrusher (H3 + N5): tablična kompakcija bez gubitaka homogenih sadržaja JSON polja u stupčani oblik `[N rows]`.                                                                     |
| ionizer       | `ionizer`       | Uzorkovanje redaka s početka/sredine/kraja za vrlo velike homogene blokove, uz pohranu izostavljene sredine kao CCR reference adresirane sadržajem.                                     |
| session-dedup | `session-dedup` | Deduplikacija između interakcija adresirana sadržajem (nadahnuta TokenMizerom): izostavlja tekst koji se već pojavio u ranijim interakcijama iste sesije.                               |

**Uputa protokola dohvaćanja CCR-a (#8033):** kada CCR prvi put zamijeni ≥1 blok u
zahtjevu, mehanizam dodaje na početak jednu idempotentnu poruku `system` (koja počinje
sentinelom `[CCR protocol]`) i poučava pozivatelja ugovoru oznaka → alat: što znači
oznaka `[CCR retrieve hash=<24hex> chars=N]`, da se hash mora kopirati doslovno
(svih 24 heksadecimalnih znakova — pogrešno kopirani hashovi vjerojatan su uzrok pogrešaka
"block not found") te da oznaka `[dedup:ref sha=...]` znači "pogledaj unatrag u povijest", a ne "pozovi
alat". Napomena se umeće **samo kada oglašeni `tools[]` pozivatelja dokazuje da on doista može
pristupiti `omniroute_ccr_retrieve`** (`callerSupportsCcrRetrieve()` u
`open-sse/services/compression/engines/ccr/protocolInstruction.ts`) — običan
pozivatelj kompatibilan s OpenAI-jem bez tog alata nikada ne prima uputu da pozove nešto
čemu ne može pristupiti. Idempotentnost se osigurava pretraživanjem povijesti poruka u potrazi za sentinelom
prije umetanja, tako da zahtjevi s više interakcija (koji ponovno reproduciraju prethodne poruke) ne gomilaju
napomenu jednom po interakciji.

## Caveman

Način rada Caveman usmjeren je na semantičko sažimanje obične proze:

- čuva blokove koda, URL-ove, JSON, putanje i strukturirane podatke
- uklanja poštapalice, ublažavajuće izraze, ponovljeni kontekst i opširne povezne formulacije
- podržava jezično prilagođene pakete pravila za datoteke u `open-sse/services/compression/rules/`
- ostaje dostupan putem naslijeđenih načina rada `standard`, `aggressive` i `ultra`

Površina nadzorne ploče nalazi se na `Dashboard -> Context & Cache -> Caveman`.

Izvorni Caveman navodi `~75%` manje izlaznih tokena, prosječnu uštedu izlaza od `65%` u referentnim testovima
s rasponom od `22-87%` te alat za kompresiju ulaza od `~46%`. OmniRoute upotrebljava broj
za ulaznu kompresiju Cavemana pri dokumentiranju kombiniranih ušteda na upitima/kontekstu; izlazni način
Cavemana ostaje zasebna značajka ponašanja odgovora.

## RTK

Način rada RTK usmjeren je na izlaz naredbi i alata:

- otkriva klase izlaza kao što su `git status`, `git branch`, `git diff`, Vitest/Jest/Pytest,
  Cargo/Go testovi, TypeScript/Vite/Webpack međuverzije, ESLint, npm provjere/instalacije, Docker zapisnici,
  `find`/`grep` ljuske, tragovi stoga i generički zapisnici
- primjenjuje 49 JSON filtara iz `open-sse/services/compression/engines/rtk/filters/`
- podržava deklarativni cjevovod u stilu RTK-a: uklanjanje ANSI-ja, zamjenu, prečac za podudaranje izlaza,
  uklanjanje/zadržavanje redaka, skraćivanje po retku, skraćivanje početka/kraja/maksimalnog broja redaka i pričuvni sadržaj za prazan rezultat
- podržava projektne filtre uvjetovane povjerenjem u `.rtk/filters.json` i globalne filtre u
  `DATA_DIR/rtk/filters.json`
- uklanja ANSI sekvence, šum pokazatelja napretka, ponovljene retke i nekorisni tipski tekst
- čuva pogreške na temelju kojih se može djelovati, upozorenja, sažetke, promijenjene datoteke i završni kontekst
- po želji može zadržati redigirani neobrađeni izlaz za oporavak/otklanjanje pogrešaka putem autentificiranih
  ruta za upravljanje

Površina nadzorne ploče nalazi se na `Dashboard -> Context & Cache -> RTK`.

Operativne pojedinosti o prilagođenim filtrima, povjerenju, provjeri i oporavku neobrađenog izlaza nalaze se u
[`RTK_COMPRESSION.md`](./RTK_COMPRESSION.md).

Izvorni RTK navodi uštedu od `60-90%` pri kompresiji izlaza naredbi. Primjer u njegovoj datoteci README prikazuje
kako se 30-minutna sesija Claude Codea smanjuje s `~118,000` tokena na `~23,900`, odnosno uštedu od `79.7%`.

## LLMLingua-2 (semantičko obrezivanje)

Način rada LLMLingua-2 provodi **semantičko obrezivanje tokena** u prozi pomoću malog ONNX klasifikatora
tokena, nadopunjujući Caveman i RTK pogone temeljene na pravilima:

- komprimira prozu samo u porukama koje nisu sistemske; ograđeni blokovi koda i druge sačuvane
  konstrukcije nikad se ne mijenjaju
- pokreće pozadinski sustav `@atjsh/llmlingua-2` (ONNX putem `@huggingface/transformers`) u
  radnoj niti, tako da zaključivanje modela nikad ne blokira petlju događaja zahtjeva
- može se **slagati** (`stackPriority` 35): u složenom cjevovodu pokreće se nakon
  strukturnih pogona (CCR, uklanjanje duplikata sesije, rezerva prostora, Caveman), ali prije `ultra`, jer je
  semantičko obrezivanje najučinkovitije na već strukturno komprimiranom tekstu — npr.
  `rtk -> caveman -> llmlingua`
- **u slučaju bilo koje pogreške nastavlja s izvornim sadržajem** (nedostajuće neobavezne ovisnosti, pokretanje radnika, učitavanje modela, zaključivanje
  ili istek vremena) → izvorni tekst vraća se nepromijenjen, nikad kao pogreška

Lokacija pogona: `open-sse/services/compression/engines/llmlingua/`. Površina nadzorne ploče
nalazi se na `Dashboard -> Context & Cache -> LLMLingua`.

### Modeli

Zadani model je **TinyBERT** (`atjsh/llmlingua-2-js-tinybert-meetingbank`, ~57 MB,
brz). Precizniji model **BERT-base** (`Arcoldd/llmlingua4j-bert-base-onnx`,
~710 MB) dostupan je putem polja `model` u konfiguraciji pogona. `@huggingface/transformers`
lijeno preuzima odabrani model s HuggingFace Huba u
`${DATA_DIR}/models/llmlingua` pri prvom pozivu (`modelStore.ts`); konfiguracijska opcija
`modelPath` umjesto toga usmjerava na lokalnu kopiju (izvanmrežne / mrežno izolirane instalacije).

### Neobavezne ovisnosti i instalacija na zahtjev

Obrezivi stog istovjetnih ovisnosti izvršnog okruženja LLMLingua **nije obavezan**. Dva su paketa deklarirana kao
`optionalDependencies` u `package.json` i ostaju **vanjski** u produkcijskoj međuverziji
(`scripts/build/prepublish.ts` ih ne uključuje):

| Paket                | Verzija (fiksirana) | Napomene                                                |
| -------------------- | ------------------- | ------------------------------------------------------- |
| `@atjsh/llmlingua-2` | `2.0.5`             | Ulazni paket; ostale deklarira kao istovjetne ovisnosti |
| `js-tiktoken`        | `^1.0.20`           | Tokenizator                                             |

`@huggingface/transformers` fiksiran je na `^4.2.0` (dijeli se s putanjom lokalnih ugradnji i
također se prati u samostalnom paketu); `@atjsh/llmlingua-2@2.0.5` oslanja se na njega uz
`"^3.5.2 || ^4.0.0"`, pa su podržani i Transformers.js v3 i v4. Od verzije 2.0.4,
`@atjsh/llmlingua-2` više ne zahtijeva `@tensorflow/tfjs`, čime je iz SLM stoga uklonjen najveći
pojedinačni doprinositelj (TensorFlow.js). Samo su prethodno navedena dva paketa obrezive SLM
istovjetne ovisnosti. Standardni `npm install` (razvoj) automatski instalira neobavezni stog osim ako su neobavezne
ovisnosti izostavljene.

**Zašto na zahtjev:** paket objavljen na npm-u, samostalni paket i Docker slika
isporučuju se **bez** tih ovisnosti kako bi ostali maleni. Kada ih nema, provjera ovisnosti
radnika (probno razrješavanje `@atjsh/llmlingua-2` u `worker.ts`) ne uspijeva i pogon
**tiho nastavlja s izvornim sadržajem** — odabir LLMLingue ne obavlja nikakvu radnju (tekst se vraća nepromijenjen, bez
zabilježene pogreške). Da biste ga aktivirali u obrezanom okruženju, instalirajte neobavezni stog:

```bash
# fiksirajte na verzije deklarirane u package.json optionalDependencies
npm install @atjsh/llmlingua-2@2.0.5 js-tiktoken
```

Uklanjanje paketa `@tensorflow/tfjs` (2.0.4+) eliminira prethodno dominantan doprinos od ~800 MB
— preostali otisak čine izvršna okruženja transformers.js + onnxruntime-node
te model TinyBERT (~57 MB) koji se preuzima pri prvoj uporabi (ne putem npm-a).

Za svako okruženje:

- **Razvoj / `npm install`** — instalira se automatski, osim ako ste proslijedili `--omit=optional`
  (ili `--no-optional`). Nije potrebna nikakva radnja.
- **Globalni npm (`npm i -g omniroute`) / samostalna instalacija** — pokrenite gornju naredbu za instalaciju unutar
  direktorija instaliranog paketa ili ponovno instalirajte bez izostavljanja neobaveznih ovisnosti.
- **Docker** — dodajte naredbu za instalaciju u sloj izvedene slike; objavljena slika
  namjerno je minimalna.
- **VPS (PM2)** — instalirajte u `node_modules` aplikacije, a zatim ponovno pokrenite proces kako bi
  radnik ponovno provjerio kontrolni mehanizam.
- **Izvorni samostalni Next (`npm run build` → `.build/next/standalone/server.js`)** — samostalni
  trag NE sadrži ni radnika ni neobavezne ovisnosti, pa mehanizam neprimjetno nastavlja rad bez njih.
  `scripts/build/colocate-standalone.mjs` ponovno dodaje oboje (radnika izgrađenog pomoću esbuilda +
  zatvoren skup neobaveznih ovisnosti u samostalno stablo); automatski se pokreće putem npm kuke
  `postbuild` nakon svake izgradnje. Idempotentan je i nastavlja bez prekida kada ovisnosti nedostaju.

**Provjerite je li aktivan:** kada je odabran LLMLingua, stvarni se prozni tekst doista skraćuje (mehanizam
više ne nastavlja rad bez ovisnosti), a prvi zahtjev pokreće preuzimanje modela u
`${DATA_DIR}/models/llmlingua`. Kontrolni mehanizam namjerno provjerava samo `@atjsh/llmlingua-2` —
ostali ravnopravni paketi podržavaju samo ESM, a `require.resolve` za njih izbacuje pogrešku čak i kada su prisutni — pa
radnik i dalje nastavlja rad bez njih ako bilo koji ravnopravni paket doista nedostaje tijekom poziva `import()`.

## Složeni cjevovodi

Složeni način rada izvršava korake cjevovoda redom. Zadani redoslijed je:

```txt
rtk -> caveman
```

Upotrijebite ovo za sesije agenata za programiranje u kojima upit kombinira izlaz naredbi s tekstom
koji je napisao korisnik ili asistent. RTK najprije smanjuje opširne zapisnike alata, a zatim Caveman
sažima preostali prirodni jezik.

Koraci cjevovoda konfiguriraju se putem opcije `stackedPipeline` u postavkama sažimanja ili kroz
kombinacije sažimanja.

Kada oba mehanizma smanjuju isti prihvatljivi sadržaj, uštede se multipliciraju:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## MCP filtar stabla pristupačnosti

Pametni MCP filtar stabla pristupačnosti sloj je sažimanja nakon izvršavanja koji se primjenjuje na
**rezultate alata**, a ne na upite ili kontekst. Namijenjen je opširnim sadržajima stabla
pristupačnosti i snimki preglednika koje vraćaju alati kao što su Playwright, computer-use i MCP
poslužitelji za automatizaciju preglednika.

### Što radi

1. **Uklanjanje šuma** — uklanja prazne generičke/tekstne unose (`- generic:`, `- text: ""`)
2. **Sažimanje susjednih elemenata** — kada je ≥ `collapseThreshold` (zadano 30) uzastopnih redaka
   strukturno ponovljeno, sažima ih na prvih `collapseKeepHead` (zadano 10) redaka + sažetak broja +
   posljednjih `collapseKeepTail` (zadano 5) redaka
3. **Očuvanje referenci** — sidra `[ref=eXX]` koja zahtijevaju Playwright/computer-use nikada se ne
   mijenjaju
4. **Strogo skraćivanje** — ako tekst nakon sažimanja i dalje premašuje `maxTextChars` (zadano
   50.000), skraćuje ga uz navigacijsku uputu kako bi agent mogao nastaviti s radom

### Lokacija mehanizma

```txt
open-sse/services/compression/engines/mcpAccessibility/
  index.ts            ← ulazna točka smartFilterText()
  collapseRepeated.ts ← algoritam sažimanja susjednih elemenata
  constants.ts        ← DEFAULT_MCP_ACCESSIBILITY_CONFIG
```

### Konfiguracija

Upravlja se putem `compression.mcpAccessibility` u globalnim postavkama (migracija 056). Zadana
konfiguracija:

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

Filtar se primjenjuje samo na sadržaje rezultata alata čiji je `type` `"text"` i čija duljina
premašuje `minLengthToProcess`. Ne utječe na sažimanje upita ni na sadržaje zahtjeva.

### Očekivane uštede

60–80% na rezultatima alata za snimke preglednika, ovisno o složenosti stranice. Algoritam sažimanja
ima složenost O(n) prema broju redaka i dodaje zanemarivo kašnjenje.

### Ovaj filtar u usporedbi s prethodno navedenim mehanizmima sažimanja

| Aspekt           | Caveman / RTK / Stacked   | MCP filtar pristupačnosti              |
| ---------------- | ------------------------- | -------------------------------------- |
| Cilj             | Upiti zahtjeva / kontekst | Rezultati MCP alata                    |
| Okidač           | Postavka načina sažimanja | `compression.mcpAccessibility.enabled` |
| Opseg            | Sve SSE poruke            | Samo rezultati alata                   |
| Referentna sidra | Nije primjenjivo          | Bezuvjetno se čuvaju                   |

---

## Kombinacije kompresije

Kombinacije kompresije imenovani su profili kompresije koji se mogu dodijeliti kombinacijama usmjeravanja:

- `compression_combos`: pohranjuje način rada, cjevovod, RTK konfiguraciju, jezičnu konfiguraciju i oznaku zadanog profila
- `compression_combo_assignments`: mapira kombinaciju kompresije na kombinaciju usmjeravanja
- integracija tijekom izvođenja razrješava dodijeljenu kombinaciju kompresije prije generičkih nadjačavanja kombinacije
- analitika uključuje `compression_combo_id` i `engine`

Lokacija na nadzornoj ploči: `Dashboard -> Context & Cache -> Compression Combos`.

## API sučelje

| Ruta                                   | Svrha                                                                     |
| -------------------------------------- | ------------------------------------------------------------------------- |
| `/api/settings/compression`            | Globalne postavke kompresije (uključuju konfiguraciju `mcpAccessibility`) |
| `/api/compression/preview`             | Pretpregled bilo kojeg načina kompresije                                  |
| `/api/compression/language-packs`      | Popis dostupnih jezičnih paketa Caveman                                   |
| `/api/context/caveman/config`          | Pseudonim za postavke Caveman                                             |
| `/api/context/rtk/config`              | Zadane vrijednosti i postavke RTK-a                                       |
| `/api/context/rtk/filters`             | Katalog RTK filtara                                                       |
| `/api/context/rtk/test`                | Krajnja točka za pretpregled/testiranje RTK-a                             |
| `/api/context/rtk/raw-output/[id]`     | Autentificirani oporavak redigiranog neobrađenog izlaza                   |
| `/api/context/combos`                  | CRUD za kombinacije kompresije                                            |
| `/api/context/combos/[id]/assignments` | CRUD za dodjelu kombinacija usmjeravanja                                  |
| `/api/context/analytics`               | Pseudonim za analitiku kompresije                                         |

Rute za upravljanje zahtijevaju autentifikaciju za upravljanje ili provjere pravila API ključa.

## MCP alati

Kompresija izlaže pet MCP alata:

| Alat                                | Opseg               | Svrha                                         |
| ----------------------------------- | ------------------- | --------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Postavke, analitika i statistika predmemorije |
| `omniroute_compression_configure`   | `write:compression` | Ažuriranje globalnih postavki                 |
| `omniroute_set_compression_engine`  | `write:compression` | Postavljanje načina rada i izbornog cjevovoda |
| `omniroute_list_compression_combos` | `read:compression`  | Popis kombinacija kompresije                  |
| `omniroute_compression_combo_stats` | `read:compression`  | Čitanje analitike kombinacija/mehanizama      |

## Opseg i izuzeci

**Ugradnje se nikada ne komprimiraju.** `open-sse/handlers/embeddings.ts` nikada ne poziva nijedan
mehanizam kompresije — tijela zahtjeva/odgovora prolaze izravno do izvršitelja bez izmjena.
To je trenutačno strukturno svojstvo (ugradnje i dovršavanja razgovora imaju odvojene rukovatelje), a ne
provjera tijekom izvođenja, no to znači da problem izobličenja vektora iz #8034 nema površinu izloženosti
u putanji ugradnji.

**Filtar izuzimanja po modelu/krajnjoj točki (#8034).** Za dovršavanja razgovora operator može navesti
ID-jeve modela / ciljeve `provider/model` koji se nikada ne smiju komprimirati — zaštitna mjera korisna ako
se kompresija kasnije poveže bliže putanji povezanoj s ugradnjama, a općenito je korisna
za svaki model kod kojeg je važan potpuno identičan upit na razini bajtova (determinističke evaluacije, prefiksi
osjetljivi na predmemoriju itd.).

- Polje postavki: `exclusions?: string[]` u globalnoj konfiguraciji kompresije
  (`GET`/`PUT /api/settings/compression`), trajno pohranjeno putem postojećeg prostora naziva `key_value` za kompresiju
  (`src/lib/db/compression.ts`) — bez nove tablice.
- Kartica nadzorne ploče: **Nadzorna ploča → Kompresija → Izuzeci**
  (`/dashboard/compression/exclusions`).
- Sintaksa uzorka: `*` je jedini zamjenski znak. Svaki drugi metaznak regularnog izraza u uzorku
  escapira se prije podudaranja, pa se `gpt-5.6` podudara samo s doslovnim nizom, a nikada s `gpt-5x6`
  (sigurno od ReDoS-a, ograničeno, bez ugniježđenih kvantifikatora). Uzorci se podudaraju bez obzira na veličinu slova
  i sa samostalnim ID-jem modela i s kompozitom `provider/model` — `gpt-5-6`, `openai/gpt-5-6`
  i `openai/*` svi funkcioniraju, a sam `*` izuzima svaki model.
- Podudaranje: `isCompressionExcluded()` / `normalizeCompressionExclusions()` u
  `open-sse/services/compression/exclusions.ts`. `chatCore.ts` provjerava izuzeti cilj
  odmah nakon razrješavanja postavki kompresije, **prije pokretanja bilo kojeg mehanizma**, i podudaranje tretira
  potpuno jednako kao da je kompresija globalno onemogućena — tijelo zahtjeva dokazivo je
  identično na razini bajtova. Preskakanje se bilježi putem `writeCompressionSkip(..., "excluded")` radi
  vidljivosti u analitici.
- Zadana vrijednost (prazan/nepostojeći popis): identično ponašanju prije #8034 — ništa nije izuzeto.

## Poznata ograničenja

- **LLMLingua-2 (SLM) zahtijeva da neobavezne ovisnosti budu smještene zajedno.** Radni proces pokreće se u
  produkcijskoj međuverziji samo kada su `@atjsh/llmlingua-2` i povezane ovisnosti smještene zajedno u
  `dist/node_modules` (pogledajte `scripts/build/colocateOptionals.mjs`, #4286). Bez njih
  mehanizam nastavlja rad bez obrade (vraća izvorni tekst). Razrješavanje radnog procesa više ne ovisi o
  `import.meta.url` (koji ne radi u samostalnom paketu) — kao osnovu koristi izvršni
  cwd / `argv[1]`.
- **Jezični paketi Caveman `de` / `fr` / `ja` djelomični su.** Isporučuju pravila `context` +
  `filler` + `structural`, ali ne i pakete `dedup` / `ultra`, pa intenzitet `ultra` nije
  snažniji od intenziteta `full` za te jezike (koriste samo vlastita pravila — nema
  prešutnog povratka na engleska pravila `dedup`/`ultra`, koja bi izobličila strani tekst).
  Paketi `en` / `es` / `id` / `pt-BR` potpuni su. Doprinosi datoteka `dedup.json` + `ultra.json`
  za djelomične pakete dobrodošli su.
- **Složena telemetrija navodi samo mehanizme koji su izvršili kompresiju.** Korak složenog kanala obrade čiji
  se mehanizam pokrenuo, ali je ostvario uštedu od 0 %, vraća `stats:null` i zato se ne prikazuje u
  `engineBreakdown` — nije ga moguće razlikovati od preskočenog koraka. Razlikovanje stanja
  „pokrenuto, 0 %” od „preskočeno” zahtijevalo bi promjenu modela raščlambe te je odgođeno.

## Provjera valjanosti

Ciljane provjere za ovo područje su:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-*.test.ts tests/unit/compression/pipeline-integration.test.ts tests/unit/compression/context-compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/*.test.ts tests/golden-set/*.test.ts tests/integration/compression-pipeline.test.ts tests/unit/api/compression/compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/mcpAccessibility*.test.ts
npm run typecheck:core
```
