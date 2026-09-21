# Compression Engines (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_ENGINES.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_ENGINES.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_ENGINES.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_ENGINES.md)

---

Stiskanje v OmniRoute temelji na pogodbah pogonov. Način lahko neposredno izvaja en pogon
(`caveman` ali `rtk`) ali determinističen skladovni cevovod, ki zaporedoma izvaja več pogonov.

## Načini

| Način        | Pot pogona                              | Predvideni vhod                                        |
| ------------ | --------------------------------------- | ------------------------------------------------------ |
| `off`        | brez                                    | Natančna ohranitev poziva                              |
| `lite`       | Lahka pomožna orodja Caveman            | Vedno vklopljeno čiščenje z nizkim tveganjem           |
| `standard`   | Caveman                                 | Strnjevanje pozivov v naravnem jeziku                  |
| `aggressive` | Caveman + povzemalniki zgodovine/orodij | Dolge seje klepeta                                     |
| `ultra`      | Caveman + pomožna orodja za obrezovanje | Obnova ob doseženi omejitvi konteksta                  |
| `rtk`        | RTK                                     | Izhod terminala, lupine, gradnje, testov in git        |
| `omniglyph`  | OmniGlyph                               | Kontekst kot slika na izvornem kanalu ponudnika        |
| `stacked`    | Cevovod, privzeto `rtk -> caveman`      | Mešani dnevniki orodij in besedilo, največji prihranki |

### Profili stiskanja OmniGlyph

Pogon `omniglyph` (paket `omniglyph`, 1.4.0+) sprejema poimenovan semantični profil, nastavljen
globalno prek `omniglyph.profile` v nastavitvah stiskanja ali za posamezni korak prek konfiguracije
koraka skladovnega cevovoda:

| Profil        | Meja                                                                                                                           |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `aggressive`  | Privzeto. Pravilnik, uporabljen pri objavljenih meritvah — kot slike obravnava sistem, dokumentacijo orodij in gosto zgodovino |
| `balanced`    | Ohrani aktivno stanje v izvorni obliki, zaščiti zadnjih 8 izmenjav in strne starejšo zaključeno zgodovino                      |
| `coding-safe` | Ohrani pooblastila, sheme orodij in aktivni izhod orodij v izvorni obliki ter zaščiti zadnjih 12 izmenjav                      |
| `passthrough` | Usmerja brez preoblikovanja; pogon je preskočen                                                                                |

Profil je **zgornja meja, ne spodnja**: `mergeCompressionProfileOptions` v paketu
prepreči, da bi preglasitev klicatelja znova odprla izgubni kanal, ki ga je profil zaprl, zato nastavitev
`preserveSystemPrompt: false` za posamezni korak ne more znova omogočiti stiskanja sistemskega poziva pri profilu `coding-safe`.

Merjeno na tej kodni zbirki: `coding-safe` in `balanced` zvišata `minCompressChars` na njegovo
najvišjo vrednost ter ohranita sistem, sheme orodij in rezultate orodij v izvorni obliki, zato se seja, v kateri
se zgodovina še ni nakopičila, ustavi pri `below_min_chars`, pogon pa ne preoblikuje ničesar. Zato je
privzeti profil `aggressive` in ne najvarnejši profil.

Paket določi lasten obseg modelov in profil iz svoje okoljske konfiguracije.
OmniRoute odločitve nikoli ne prenese nanj: vmesnik omeji vrata modelov na najstrožji obseg paketa,
zato lahko nastavitve gostiteljskega okolja seznam dovoljenih možnosti le zožijo, nikoli pa ga ne morejo
razširiti prek obsega, potrjenega z meritvami OmniRoute.

## Register mehanizmov

Register se nahaja v `open-sse/services/compression/engines/registry.ts`. Mehanizmi izpostavljajo skupno
pogodbo:

- `id`: nespremenljiv ID mehanizma, na primer `caveman` ali `rtk`
- `apply(text, config)`: podedovana izvedbena pot, ki jo uporabljajo sestavljeni cevovodi
- `compress(input, config)`: primarna izvedbena pot, ki vrne besedilo in statistiko
- `getConfigSchema()`: vrne strukturo veljavne konfiguracije, podobno shemi JSON
- `validateConfig(config)`: vrne `{ valid, errors[] }`

Registracija uporablja `registerCompressionEngine(engine)` (ali `registerEngine` za napredne primere),
ki pred sprejetjem pokliče `assertValidEngine()` in `validateConfig(defaultConfig)`.
Za odstranitev mehanizma med izvajanjem uporabite `unregisterCompressionEngine(id)`.

`strategySelector.ts` pred izvajanjem stiskanja registrira vgrajene mehanizme. Tako lahko predogled,
stiskanje med izvajanjem, sestavljeni način, preizkusi in prihodnji mehanizmi uporabljajo isto izvedbeno pot.

### Stiskanje opisov MCP (povezano)

Ločen register stiska metapodatke opisov orodij MCP na ravni registra — glejte
`open-sse/mcp-server/descriptionCompressor.ts` in [MCP-SERVER.md](../frameworks/MCP-SERVER.md). Ponovno uporablja
pravila Caveman, vendar deluje na metapodatkih orodij in ne na koristnih vsebinah zahtev.

### Dodatni vgrajeni mehanizmi

Poleg mehanizmov Caveman, RTK in LLMLingua-2 register vključuje več specializiranih brezizgubnih /
strukturnih mehanizmov (uporabljajo jih sestavljeni cevovodi, preizkusno okolje in preizkusi):

| Mehanizem     | ID              | Kaj počne                                                                                                                                                                                        |
| ------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| CCR           | `ccr`           | Content-Compress-Retrieve (H4): velike neprekinjene besedilne bloke nadomesti z vsebinsko naslovljenimi sklici, tako da so ponovljeni/veliki bloki poslani enkrat, nato pa se nanje le sklicuje. |
| headroom      | `headroom`      | SmartCrusher (H3 + N5): brezizgubno tabelarično stiskanje koristnih vsebin homogenih polj JSON v stolpčno obliko `[N rows]`.                                                                     |
| ionizer       | `ionizer`       | Vzorčenje vrstic z začetka, sredine in konca zelo velikih homogenih blokov, pri čemer je izpuščena sredina shranjena kot vsebinsko naslovljen sklic CCR.                                         |
| session-dedup | `session-dedup` | Vsebinsko naslovljeno odstranjevanje podvojitev med koraki (po zgledu TokenMizer): izpusti besedilo, ki je bilo že videno v prejšnjih korakih iste seje.                                         |

**Navodilo protokola za pridobivanje CCR (#8033):** ko CCR v zahtevi prvič nadomesti ≥1 blok,
mehanizem na začetek doda eno samo idempotentno sporočilo `system` (ki se začne z
razpoznavnim nizom `[CCR protocol]`), s katerim klicatelja pouči o pogodbi med oznako in orodjem: kaj pomeni
oznaka `[CCR retrieve hash=<24hex> chars=N]`, da mora biti zgoščena vrednost prekopirana dobesedno
(vseh 24 šestnajstiških znakov — napačno prekopirane zgoščene vrednosti so najverjetnejši vzrok za
napake »bloka ni bilo mogoče najti«) in da oznaka `[dedup:ref sha=...]` pomeni »poglej nazaj v zgodovino«,
ne pa »pokliči orodje«. Opomba se vstavi **samo, ko klicateljev oglaševani `tools[]` dokazuje, da lahko
dejansko dostopa do `omniroute_ccr_retrieve`** (`callerSupportsCcrRetrieve()` v
`open-sse/services/compression/engines/ccr/protocolInstruction.ts`) — običajni
klicatelj, združljiv z OpenAI, brez tega orodja nikoli ne prejme navodila, naj pokliče nekaj,
do česar nima dostopa. Idempotentnost se zagotavlja tako, da se pred vstavljanjem v zgodovini sporočil
poišče razpoznavni niz, zato se pri večkorakovnih zahtevah (ki ponovno predvajajo predhodna sporočila)
opomba ne dodaja znova pri vsakem koraku.

## Caveman

Način Caveman se osredotoča na semantično zgoščevanje običajnega besedila:

- ohranja bloke kode, URL-je, JSON, poti in strukturirane podatke
- odstranjuje mašila, izraze negotovosti, ponovljen kontekst in razvlečene povezovalne besedne zveze
- podpira jezikovno prilagojene pakete pravil za datoteke v `open-sse/services/compression/rules/`
- ostaja na voljo prek podedovanih načinov `standard`, `aggressive` in `ultra`

V nadzorni plošči je na voljo pod `Dashboard -> Context & Cache -> Caveman`.

Izvorni projekt Caveman poroča o `~75%` manj izhodnih žetonih, povprečnem `65%` prihranku izhoda v primerjalnih preizkusih
z razponom `22-87%` in orodju za stiskanje vhoda z `~46%` prihrankom. OmniRoute pri dokumentiranju sestavljenih prihrankov poziva/konteksta
uporablja podatek za vhodno stran sistema Caveman; izhodni način Caveman ostaja ločena
funkcija vedenja odzivov.

## RTK

Način RTK se osredotoča na izhod ukazov in orodij:

- zaznava razrede izhoda, kot so `git status`, `git branch`, `git diff`, Vitest/Jest/Pytest,
  preizkusi Cargo/Go, gradnje TypeScript/Vite/Webpack, ESLint, preverjanja/namestitve npm, dnevniki Docker,
  lupinska ukaza `find`/`grep`, sledi sklada in splošni dnevniki
- uporablja 49 filtrov JSON iz `open-sse/services/compression/engines/rtk/filters/`
- podpira deklarativni cevovod v slogu RTK: odstranjevanje ANSI, zamenjavo, kratkostično obravnavo ujemanja izhoda,
  odstranjevanje/ohranjanje vrstic, krajšanje posamezne vrstice, krajšanje glave/repa/največjega števila vrstic in nadomestni izhod ob praznem rezultatu
- podpira projektne filtre z nadzorom zaupanja v `.rtk/filters.json` in globalne filtre v
  `DATA_DIR/rtk/filters.json`
- odstranjuje zaporedja ANSI, šum napredka, ponovljene vrstice in nekoristno standardno besedilo
- ohranja napake, ki zahtevajo ukrepanje, opozorila, povzetke, spremenjene datoteke in kontekst na koncu
- lahko izbirno ohrani redigiran neobdelan izhod za obnovitev/razhroščevanje prek overjenih upravljavskih
  poti

V nadzorni plošči je na voljo pod `Dashboard -> Context & Cache -> RTK`.

Operativne podrobnosti o filtrih po meri, zaupanju, preverjanju in obnovitvi neobdelanega izhoda so na voljo v
[`RTK_COMPRESSION.md`](./RTK_COMPRESSION.md).

Izvorni projekt RTK poroča o `60-90%` prihranku pri stiskanju izhoda ukazov. Primer v njegovi datoteki README prikazuje,
da se je 30-minutna seja Claude Code zmanjšala s `~118,000` žetonov na `~23,900`, kar pomeni `79.7%` prihranka.

## LLMLingua-2 (Semantično obrezovanje)

Način LLMLingua-2 izvaja **semantično obrezovanje žetonov** v besedilu z uporabo majhnega klasifikatorja žetonov
ONNX ter dopolnjuje mehanizma Caveman in RTK, ki temeljita na pravilih:

- stiska besedilo samo v nesistemskih sporočilih; ograjeni bloki kode in drugi ohranjeni
  konstrukti se nikoli ne spremenijo
- izvaja zaledje `@atjsh/llmlingua-2` (ONNX prek `@huggingface/transformers`) v
  delovni niti, zato sklepanje modela nikoli ne blokira dogodkovne zanke zahteve
- je **združljiv v sklad** (`stackPriority` 35): v sestavljenem cevovodu se izvede za
  strukturnimi mehanizmi (CCR, session-dedup, headroom, Caveman), vendar pred `ultra`, saj je
  semantično obrezovanje najučinkovitejše pri že strukturno stisnjenem besedilu — npr.
  `rtk -> caveman -> llmlingua`
- se ob **kakršni koli napaki varno izklopi** (manjkajoče izbirne odvisnosti, zagon delovne niti, nalaganje modela, sklepanje
  ali časovna omejitev) → izvirno besedilo se vrne nespremenjeno, nikoli pa napaka

Lokacija mehanizma: `open-sse/services/compression/engines/llmlingua/`. V nadzorni plošči je na voljo
pod `Dashboard -> Context & Cache -> LLMLingua`.

### Modeli

Privzeti model je **TinyBERT** (`atjsh/llmlingua-2-js-tinybert-meetingbank`, ~57 MB,
hiter). Natančnejši model **BERT-base** (`Arcoldd/llmlingua4j-bert-base-onnx`,
~710 MB) je na voljo prek polja `model` v konfiguraciji mehanizma. `@huggingface/transformers`
ob prvem klicu leno prenese izbrani model iz HuggingFace Hub v
`${DATA_DIR}/models/llmlingua` (`modelStore.ts`); preglasitev konfiguracije `modelPath`
ga namesto tega usmeri na lokalno kopijo (za namestitve brez povezave/v izoliranem omrežju).

### Izbirne odvisnosti in namestitev na zahtevo

Odstranljiv sklad enakovrednih odvisnosti izvajalnega okolja LLMLingua je **izbiren**. Dva paketa sta navedena kot
`optionalDependencies` v `package.json` in v produkcijski gradnji ostajata **zunanja**
(`scripts/build/prepublish.ts` ju ne vključi v paket):

| Paket                | Različica (pripeta) | Opombe                                                        |
| -------------------- | ------------------- | ------------------------------------------------------------- |
| `@atjsh/llmlingua-2` | `2.0.5`             | Vstopni paket; druge pakete navede kot enakovredne odvisnosti |
| `js-tiktoken`        | `^1.0.20`           | Razčlenjevalnik žetonov                                       |

`@huggingface/transformers` je pripet na `^4.2.0` (v skupni rabi z lokalno potjo vdelav in
vključen tudi v samostojni paket); `@atjsh/llmlingua-2@2.0.5` ga uporablja kot enakovredno odvisnost z
`"^3.5.2 || ^4.0.0"`, zato sta podprti različici Transformers.js v3 in v4. Od različice 2.0.4
`@atjsh/llmlingua-2` ne potrebuje več paketa `@tensorflow/tfjs`, s čimer je bil iz sklada SLM odstranjen največji posamezni
porabnik prostora (TensorFlow.js). Odstranljiva enakovredna paketa SLM sta samo zgornja dva.
Običajni `npm install` (razvoj) samodejno namesti izbirni sklad, razen če so izbirne
odvisnosti izpuščene.

**Zakaj na zahtevo:** paket, objavljen v npm, samostojni paket in slika Docker so dobavljeni
**brez** teh odvisnosti, da ostanejo majhni. Če odvisnosti manjkajo, preverjanje odvisnosti delovne niti
(poskus razrešitve `@atjsh/llmlingua-2` v `worker.ts`) spodleti in mehanizem se
**tiho varno izklopi** — izbira LLMLingua ne izvede ničesar (besedilo se vrne nespremenjeno, brez
zabeležene napake). Če ga želite aktivirati v okolju z odstranjenimi odvisnostmi, namestite izbirni sklad:

```bash
# pripnite na različice, navedene v optionalDependencies datoteke package.json
npm install @atjsh/llmlingua-2@2.0.5 js-tiktoken
```

Odstranitev paketa `@tensorflow/tfjs` (2.0.4+) odpravi prej prevladujočega porabnika velikosti ~800 MB
— preostali obseg sestavljajo izvajalna okolja transformers.js + onnxruntime-node
in model TinyBERT (~57 MB), ki se prenese ob prvi uporabi (ne prek npm).

Za posamezna okolja:

- **Razvoj / `npm install`** — samodejno nameščeno, razen če ste podali `--omit=optional`
  (ali `--no-optional`). Ukrepanje ni potrebno.
- **Globalni npm (`npm i -g omniroute`) / samostojna namestitev** — zaženite zgornji namestitveni ukaz v
  imeniku nameščenega paketa ali pa ga znova namestite, ne da bi izpustili izbirne odvisnosti.
- **Docker** — dodajte namestitveni ukaz v plast izpeljane slike; objavljena slika
  je namenoma okrnjena.
- **VPS (PM2)** — namestite v `node_modules` aplikacije, nato znova zaženite proces, da
  delovni proces ponovno preveri varovalo.
- **Neobdelana samostojna različica Next (`npm run build` → `.build/next/standalone/server.js`)** — samostojna
  sled NE vključuje niti delovnega procesa niti izbirnih odvisnosti, zato se mehanizem ob napaki neopazno
  odpre. `scripts/build/colocate-standalone.mjs` znova uporabi oboje (delovni proces esbuild +
  zaprtje izbirnih odvisnosti v samostojnem drevesu); po vsaki gradnji se samodejno zažene prek
  npm-kavlja `postbuild`. Idempotentno; če odvisnosti manjkajo, se napaka obravnava brez prekinitve.

**Preverite, ali je aktivno:** ko je izbran LLMLingua, se dejansko besedilo resnično skrči (mehanizem
se ob napaki ne odpira več), prva zahteva pa sproži prenos modela v
`${DATA_DIR}/models/llmlingua`. Varovalo namenoma preverja samo `@atjsh/llmlingua-2` —
drugi enakovredni paketi podpirajo samo ESM in `require.resolve` pri njih sproži izjemo, tudi ko so prisotni — zato
se delovni proces ob napaki še vedno odpre, če ob času `import()` dejansko manjka kateri koli enakovredni paket.

## Zloženi cevovodi

Zloženi način izvaja korake cevovoda po vrstnem redu. Privzeto je:

```txt
rtk -> caveman
```

To uporabite za seje z agentom za programiranje, kjer poziv združuje izhod ukazov s prozo uporabnika ali pomočnika. RTK najprej zmanjša količino nepreglednih dnevnikov orodij, nato pa Caveman stisne preostali naravni jezik.

Koraki cevovoda se konfigurirajo z `stackedPipeline` v nastavitvah stiskanja ali prek kombinacij stiskanja.

Ko oba mehanizma zmanjšata isto primerno koristno vsebino, se prihranki pomnožijo:

```txt
combined = 1 - (1 - prihranek RTK) * (1 - prihranek vhoda Caveman)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## Filter drevesa dostopnosti MCP

Pametni filter drevesa dostopnosti MCP je sloj stiskanja po izvedbi, ki se izvaja na **rezultatih orodij** MCP, ne pa na pozivih ali kontekstu. Namenjen je obsežnim koristnim vsebinam dreves dostopnosti in posnetkov brskalnika, ki jih vračajo orodja, kot so Playwright, computer-use in strežniki MCP za avtomatizacijo brskalnika.

### Kaj počne

1. **Odstranjevanje šuma** — odstrani prazne splošne/besedilne vnose (`- generic:`, `- text: ""`)
2. **Strnjevanje sorodnih elementov** — ko je ≥ `collapseThreshold` (privzeto 30) zaporednih vrstic strukturnih ponovitev, jih strne v prvih `collapseKeepHead` (privzeto 10) vrstic + povzetek števila + zadnjih `collapseKeepTail` (privzeto 5) vrstic
3. **Ohranjanje sklicev** — sidra `[ref=eXX]`, ki jih zahtevata Playwright/computer-use, ostanejo vedno nedotaknjena
4. **Trdo krajšanje** — če besedilo po strnjevanju še vedno presega `maxTextChars` (privzeto 50,000), ga skrajša in doda namig za krmarjenje, da lahko agent nadaljuje delo

### Lokacija mehanizma

```txt
open-sse/services/compression/engines/mcpAccessibility/
  index.ts            ← vstopna točka smartFilterText()
  collapseRepeated.ts ← algoritem strnjevanja sorodnih elementov
  constants.ts        ← DEFAULT_MCP_ACCESSIBILITY_CONFIG
```

### Konfiguracija

Nadzira jo `compression.mcpAccessibility` v globalnih nastavitvah (migracija 056). Privzeta konfiguracija:

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

Filter se uporabi samo za koristne vsebine rezultatov orodij, katerih `type` je `"text"` in katerih dolžina presega `minLengthToProcess`. Ne vpliva na stiskanje pozivov ali koristne vsebine zahtev.

### Pričakovani prihranki

60–80 % pri rezultatih orodij za posnetke brskalnika, odvisno od kompleksnosti strani. Časovna zahtevnost algoritma strnjevanja je O(n) glede na število vrstic, zakasnitev pa je zanemarljiva.

### Ta filter v primerjavi z zgornjimi mehanizmi stiskanja

| Vidik         | Caveman / RTK / Stacked     | Filter dostopnosti MCP                 |
| ------------- | --------------------------- | -------------------------------------- |
| Cilj          | Pozivi zahtev / kontekst    | Rezultati orodij MCP                   |
| Sprožilec     | Nastavitev načina stiskanja | `compression.mcpAccessibility.enabled` |
| Obseg         | Vsa sporočila SSE           | Samo rezultati orodij                  |
| Sidra sklicev | Ni relevantno               | Brezpogojno ohranjena                  |

---

## Kombinacije stiskanja

Kombinacije stiskanja so poimenovani profili stiskanja, ki jih je mogoče dodeliti kombinacijam usmerjanja:

- `compression_combos`: hrani način, cevovod, konfiguracijo RTK, jezikovno konfiguracijo in oznako privzete vrednosti
- `compression_combo_assignments`: preslika kombinacijo stiskanja v kombinacijo usmerjanja
- integracija med izvajanjem razreši dodeljeno kombinacijo stiskanja pred splošnimi preglasitvami kombinacij
- analitika vključuje `compression_combo_id` in `engine`

Mesto na nadzorni plošči: `Dashboard -> Context & Cache -> Compression Combos`.

## Površina API-ja

| Pot                                    | Namen                                                                      |
| -------------------------------------- | -------------------------------------------------------------------------- |
| `/api/settings/compression`            | Globalne nastavitve stiskanja (vključuje konfiguracijo `mcpAccessibility`) |
| `/api/compression/preview`             | Predogled katerega koli načina stiskanja                                   |
| `/api/compression/language-packs`      | Seznam razpoložljivih jezikovnih paketov Caveman                           |
| `/api/context/caveman/config`          | Vzdevek nastavitev Caveman                                                 |
| `/api/context/rtk/config`              | Privzete vrednosti in nastavitve RTK                                       |
| `/api/context/rtk/filters`             | Katalog filtrov RTK                                                        |
| `/api/context/rtk/test`                | Končna točka za predogled/preizkus RTK                                     |
| `/api/context/rtk/raw-output/[id]`     | Overjeno obnovitev redigiranega neobdelanega izhoda                        |
| `/api/context/combos`                  | CRUD kombinacij stiskanja                                                  |
| `/api/context/combos/[id]/assignments` | CRUD dodelitev kombinacij usmerjanja                                       |
| `/api/context/analytics`               | Vzdevek analitike stiskanja                                                |

Poti za upravljanje zahtevajo overjanje za upravljanje ali preverjanje pravilnika ključa API.

## Orodja MCP

Stiskanje ponuja pet orodij MCP:

| Orodje                              | Obseg               | Namen                                            |
| ----------------------------------- | ------------------- | ------------------------------------------------ |
| `omniroute_compression_status`      | `read:compression`  | Nastavitve, analitika, statistika predpomnilnika |
| `omniroute_compression_configure`   | `write:compression` | Posodobitev globalnih nastavitev                 |
| `omniroute_set_compression_engine`  | `write:compression` | Nastavitev načina in izbirnega cevovoda          |
| `omniroute_list_compression_combos` | `read:compression`  | Seznam kombinacij stiskanja                      |
| `omniroute_compression_combo_stats` | `read:compression`  | Branje analitike kombinacij/mehanizmov           |

## Obseg in izključitve

**Vdelave niso nikoli stisnjene.** `open-sse/handlers/embeddings.ts` nikoli ne pokliče nobenega
mehanizma za stiskanje — telesi zahteve in odgovora gresta neposredno do izvajalnika brez sprememb.
To je trenutno strukturno (vdelave in dokončanja klepeta imajo ločene obdelovalnike), ne gre za
preverjanje med izvajanjem, vendar to pomeni, da pomislek glede popačenja vektorjev iz #8034 nima
nobene izpostavljene površine na poti vdelav.

**Filter izključitev glede na model/končno točko (#8034).** Pri dokončanjih klepeta lahko upravljavec navede
ID-je modelov/cilje `provider/model`, ki ne smejo biti nikoli stisnjeni — zaščitni ukrep, uporaben, če
bo stiskanje pozneje kdaj povezano bližje poti, ki meji na vdelave, in na splošno uporaben
za vsak model, pri katerem je pomemben poziv, ki je do bajta povsem nespremenjen (deterministična vrednotenja, na
predpomnilnik občutljive predpone itd.).

- Polje nastavitev: `exclusions?: string[]` v globalni konfiguraciji stiskanja
  (`GET`/`PUT /api/settings/compression`), shranjeno prek obstoječega imenskega prostora stiskanja `key_value`
  (`src/lib/db/compression.ts`) — brez nove tabele.
- Zavihek nadzorne plošče: **Dashboard → Compression → Exclusions**
  (`/dashboard/compression/exclusions`).
- Sintaksa vzorca: `*` je edini nadomestni znak. Vsak drug metaznak regularnega izraza v vzorcu je
  pred ujemanjem ubežan, zato se `gpt-5.6` ujema samo z dobesednim nizom, nikoli z `gpt-5x6`
  (varno pred ReDoS, omejeno, brez ugnezdenih kvantifikatorjev). Vzorci se brez razlikovanja med velikimi in malimi črkami ujemajo
  tako z golim ID-jem modela kot s sestavljenim nizom `provider/model` — `gpt-5-6`, `openai/gpt-5-6`
  in `openai/*` vsi delujejo, `*` sam pa izključi vsak model.
- Ujemanje: `isCompressionExcluded()` / `normalizeCompressionExclusions()` v
  `open-sse/services/compression/exclusions.ts`. `chatCore.ts` preveri izključeni cilj
  takoj po razrešitvi nastavitev stiskanja, **pred zagonom katerega koli mehanizma**, in ujemanje
  obravnava natanko tako, kot če bi bilo stiskanje globalno onemogočeno — telo zahteve je dokazljivo
  bajt za bajtom enako. Preskok se zabeleži prek `writeCompressionSkip(..., "excluded")` za
  vidnost v analitiki.
- Privzeto (prazen/manjkajoč seznam): enako vedenju pred #8034 — nič ni izključeno.

## Znane omejitve

- **LLMLingua-2 (SLM) zahteva kolocirane izbirne odvisnosti.** Delovni proces se v
  produkcijski gradnji zažene samo, če so `@atjsh/llmlingua-2` in enakovredne odvisnosti kolocirane v
  `dist/node_modules` (glejte `scripts/build/colocateOptionals.mjs`, #4286). Brez njih
  mehanizem ob napaki vrne izvirno besedilo. Razreševanje delovnega procesa ni več odvisno od
  `import.meta.url` (ta v samostojnem svežnju preneha delovati) — opira se na izvajalni
  cwd / `argv[1]`.
- **Jezikovni paketi Caveman `de` / `fr` / `ja` so delni.** Vključujejo pravila `context` +
  `filler` + `structural`, vendar ne paketov `dedup` / `ultra`, zato intenzivnost `ultra`
  pri teh jezikih ni močnejša od `full` (uporabljajo samo lastna pravila — ni
  tihega nadomestnega preklopa na angleška pravila `dedup`/`ultra`, ki bi popačila tujejezično besedilo).
  Paketi `en` / `es` / `id` / `pt-BR` so popolni. Prispevki datotek `dedup.json` + `ultra.json`
  za delne pakete so dobrodošli.
- **Telemetrija zloženega cevovoda navaja samo mehanizme, ki so izvedli stiskanje.** Korak zloženega cevovoda,
  katerega mehanizem se je izvedel, vendar je dosegel 0 % prihranka, vrne `stats:null`, zato ni prikazan v
  `engineBreakdown` — ni ga mogoče razlikovati od preskočenega koraka. Razlikovanje med
  »izvedeno, 0 %« in »preskočeno« bi zahtevalo spremembo modela razčlenitve in je odloženo.

## Preverjanje

Ciljno usmerjena preverjanja za to področje so:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-*.test.ts tests/unit/compression/pipeline-integration.test.ts tests/unit/compression/context-compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/*.test.ts tests/golden-set/*.test.ts tests/integration/compression-pipeline.test.ts tests/unit/api/compression/compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/mcpAccessibility*.test.ts
npm run typecheck:core
```
