# Compression Engines (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_ENGINES.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_ENGINES.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_ENGINES.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_ENGINES.md)

---

Compresia OmniRoute este construită în jurul contractelor motoarelor. Un mod poate rula direct un singur motor
(`caveman` sau `rtk`) ori o conductă stivuită deterministă care execută mai multe motoare în ordine.

## Moduri

| Mod          | Cale motor                                                                                                                                            | Intrare intenționată                            |
| :----------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------- |
| `off`        | niciuna                                                                                                                                               | Păstrarea exactă a promptului                   |
| `lite`       | Ajutoare Caveman lite                                                                                                                                 | Curățare permanentă cu risc scăzut              |
| `standard`   | Caveman                                                                                                                                               | Condensarea promptului în limbaj natural        |
| `aggressive` | Caveman + sumarizatoare istoric/instrumente                                                                                                           | Sesiuni lungi de chat                           |
| `ultra`      | Caveman + ajutoare de tăiere                                                                                                                          | Recuperare limită de context                    |
| `rtk`        | RTK                                                                                                                                                   | Ieșire terminal, shell, build, test și git      |
| `omniglyph`  | OmniGlyph                                                                                                                                             | Context ca imagine pe cablul furnizorului nativ |
| `stacked`    | Pipeline. Implicit pentru cerere este `session-dedup -> lite`. `rtk -> caveman` este opțional. Jurnale mixte de instrumente și proză, economii maxime |

### Profile de compresie OmniGlyph

Motorul `omniglyph` (pachetul `omniglyph`, 1.4.0+) acceptă un profil semantic numit, setat
global prin `omniglyph.profile` în setările de compresie sau per pas prin
configurația pasului pipeline-ului stivuit:

| Profil        | Limită                                                                                                                    |
| :------------ | :------------------------------------------------------------------------------------------------------------------------ |
| `aggressive`  | Implicit. Politica măsurată de chitanțele publicate — sistem de imagini, documente de instrumente și istoric dens         |
| `balanced`    | Menține starea live nativă, protejează ultimele 8 interacțiuni, colapsează istoricul închis mai vechi                     |
| `coding-safe` | Menține autoritatea, schemele de instrumente și ieșirea live a instrumentelor nativă, protejează ultimele 12 interacțiuni |
| `passthrough` | Redirecționează fără transformare; motorul este omis                                                                      |

Profilul este un **plafon, nu un prag**: `mergeCompressionProfileOptions` din pachet
refuză să permită unui apelant să suprascrie redeschiderea unei căi cu pierderi pe care
profilul a închis-o, astfel încât un `preserveSystemPrompt: false` per pas nu poate
reactiva compresia sistemului sub `coding-safe`.

Măsurat pe această bază de cod: `coding-safe` și `balanced` ridică `minCompressChars` la
maxim și mențin sistemul, schemele de instrumente și rezultatele instrumentelor native,
astfel încât o sesiune care nu a acumulat încă istoric se oprește la `below_min_chars` și
motorul nu transformă nimic. Acesta este motivul pentru care implicit este `aggressive` și
nu cel mai sigur profil.

Pachetul își rezolvă propriul domeniu de aplicare al modelului și profilul din
configurația mediului său. OmniRoute nu deleagă niciodată decizia: adaptorul fixează
poarta modelului la cel mai restrictiv domeniu de aplicare al pachetului, astfel încât
setările mediului gazdă pot doar restrânge lista permisă, niciodată să o extindă dincolo
de chitanțele măsurate de OmniRoute.

## Registrul motoarelor

Registrul se află în `open-sse/services/compression/engines/registry.ts`. Motoarele expun un contract
comun:

- `id`: ID stabil al motorului, precum `caveman` sau `rtk`
- `apply(text, config)`: calea de execuție moștenită, utilizată de pipeline-urile stivuite
- `compress(input, config)`: calea principală de execuție, care returnează textul + statisticile
- `getConfigSchema()`: returnează structura similară cu JSON Schema a configurației valide
- `validateConfig(config)`: returnează `{ valid, errors[] }`

Înregistrarea utilizează `registerCompressionEngine(engine)` (sau `registerEngine` pentru cazuri avansate),
care apelează `assertValidEngine()` și `validateConfig(defaultConfig)` înainte de acceptare.
Utilizați `unregisterCompressionEngine(id)` pentru a elimina un motor în timpul execuției.

`strategySelector.ts` înregistrează motoarele încorporate înainte de rularea comprimării. Astfel, previzualizarea,
comprimarea în timpul execuției, modul stivuit, testele și motoarele viitoare pot utiliza aceeași cale de execuție.

### Comprimarea descrierilor MCP (subiect asociat)

Un registru separat comprimă metadatele descrierilor instrumentelor MCP la nivelul registrului — consultați
`open-sse/mcp-server/descriptionCompressor.ts` și [MCP-SERVER.md](../frameworks/MCP-SERVER.md). Acesta reutilizează
regulile Caveman, dar operează asupra metadatelor instrumentelor, nu asupra sarcinilor utile ale cererilor.

### Motoare încorporate suplimentare

Pe lângă Caveman, RTK și LLMLingua-2, registrul include mai multe motoare specializate fără pierderi /
structurale (utilizate de pipeline-urile stivuite, mediul de testare interactiv și teste):

| Motor         | ID              | Ce face                                                                                                                                                                                                   |
| ------------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CCR           | `ccr`           | Content-Compress-Retrieve (H4): înlocuiește blocurile mari de text contiguu cu referințe adresate după conținut, astfel încât blocurile repetate/mari să fie trimise o singură dată și referite ulterior. |
| headroom      | `headroom`      | SmartCrusher (H3 + N5): compactare tabelară fără pierderi a sarcinilor utile constând în matrice JSON omogene, într-o formă columnară `[N rows]`.                                                         |
| ionizer       | `ionizer`       | Eșantionează rânduri de la începutul/mijlocul/sfârșitul blocurilor omogene foarte mari, stocând secțiunea mediană omisă ca referință CCR adresată după conținut.                                          |
| session-dedup | `session-dedup` | Deduplicare adresată după conținut între interacțiuni (inspirată de TokenMizer): omite textul deja întâlnit în interacțiunile anterioare ale aceleiași sesiuni.                                           |

**Instrucțiune privind protocolul de recuperare CCR (#8033):** prima dată când CCR înlocuiește ≥1 bloc dintr-o
cerere, motorul adaugă la început un singur mesaj `system` idempotent (începând cu santinela
`[CCR protocol]`), care explică apelantului contractul marcaj → instrument: ce înseamnă un marcaj
`[CCR retrieve hash=<24hex> chars=N]`, faptul că hash-ul trebuie copiat textual
(toate cele 24 de caractere hexazecimale — hash-urile copiate greșit reprezintă cauza probabilă a erorilor
„blocul nu a fost găsit”) și faptul că un marcaj `[dedup:ref sha=...]` înseamnă „caută înapoi în istoric”, nu „apelează
instrumentul”. Nota este injectată **numai atunci când `tools[]` declarate de apelant demonstrează că acesta poate
accesa efectiv `omniroute_ccr_retrieve`** (`callerSupportsCcrRetrieve()` din
`open-sse/services/compression/engines/ccr/protocolInstruction.ts`) — un apelant simplu,
compatibil cu OpenAI, fără acel instrument, nu primește niciodată instrucțiunea de a apela ceva
ce nu poate accesa. Idempotența este asigurată prin scanarea istoricului mesajelor pentru santinelă
înainte de injectare, astfel încât cererile cu mai multe interacțiuni (care redau mesajele anterioare) să nu adauge
nota încă o dată la fiecare interacțiune.

## Caveman

Modul Caveman se concentrează pe condensarea semantică a prozei obișnuite:

- păstrează blocurile de cod, URL-urile, JSON-ul, căile și datele structurate
- elimină textul de umplutură, formulările ezitante, contextul repetat și expresiile de legătură verbose
- acceptă pachete de reguli specifice limbii pentru fișiere în `open-sse/services/compression/rules/`
- rămâne disponibil prin modurile vechi `standard`, `aggressive` și `ultra`

Secțiunea din panoul de control este `Dashboard -> Context & Cache -> Caveman`.

Proiectul Caveman din amonte raportează cu `~75%` mai puțini tokeni de ieșire, economii medii de `65%` pentru ieșire în testele de performanță, cu un interval de `22-87%`, și un instrument de comprimare a intrării de `~46%`. OmniRoute utilizează valoarea Caveman pentru partea de intrare atunci când documentează economiile cumulate pentru prompt/context; modul de ieșire Caveman rămâne o funcționalitate separată privind comportamentul răspunsului.

## RTK

Modul RTK se concentrează pe ieșirea comenzilor și a instrumentelor:

- detectează clase de ieșire precum `git status`, `git branch`, `git diff`, Vitest/Jest/Pytest,
  testele Cargo/Go, buildurile TypeScript/Vite/Webpack, ESLint, auditurile/instalările npm, jurnalele Docker,
  comenzile shell `find`/`grep`, traseele stivei și jurnalele generice
- aplică 49 de filtre JSON din `open-sse/services/compression/engines/rtk/filters/`
- acceptă pipeline-ul declarativ în stil RTK: eliminarea ANSI, înlocuire, scurtcircuitarea la potrivirea ieșirii,
  eliminarea/păstrarea liniilor, trunchierea fiecărei linii, trunchierea începutului/sfârșitului/numărului maxim de linii și revenirea alternativă când rezultatul este gol
- acceptă filtre de proiect condiționate de încredere în `.rtk/filters.json` și filtre globale în
  `DATA_DIR/rtk/filters.json`
- elimină secvențele ANSI, zgomotul indicatorilor de progres, liniile repetate și textul standard inutil
- păstrează erorile asupra cărora se poate acționa, avertismentele, rezumatele, fișierele modificate și contextul final
- poate păstra opțional ieșirea brută redactată pentru recuperare/depanare prin rute de administrare autentificate

Secțiunea din panoul de control este `Dashboard -> Context & Cache -> RTK`.

Detaliile operaționale pentru filtrele personalizate, încredere, verificare și recuperarea ieșirii brute se găsesc în
[`RTK_COMPRESSION.md`](./RTK_COMPRESSION.md).

Proiectul RTK din amonte raportează economii de `60-90%` pentru comprimarea ieșirii comenzilor. Exemplul din README prezintă o sesiune Claude Code de 30 de minute care scade de la `~118,000` de tokeni la `~23,900`, adică o economie de `79.7%`.

## LLMLingua-2 (Eliminare semantică)

Modul LLMLingua-2 efectuează **eliminarea semantică a tokenilor** din proză folosind un mic clasificator ONNX de tokeni, completând motoarele Caveman și RTK bazate pe reguli:

- comprimă proza numai în mesajele care nu sunt de sistem; blocurile de cod delimitate și celelalte
  elemente păstrate nu sunt modificate niciodată
- rulează backendul `@atjsh/llmlingua-2` (ONNX prin `@huggingface/transformers`) într-un
  fir de execuție worker, astfel încât inferența modelului să nu blocheze niciodată bucla de evenimente a cererii
- este **combinabil** (`stackPriority` 35): într-un pipeline combinat rulează după motoarele
  structurale (CCR, session-dedup, headroom, Caveman), dar înainte de `ultra`, deoarece
  eliminarea semantică este cea mai eficientă pentru textul deja comprimat structural — de exemplu,
  `rtk -> caveman -> llmlingua`
- **continuă fără efect la orice eroare** (dependențe opționale lipsă, pornirea workerului, încărcarea modelului, inferență
  sau expirarea timpului) → textul original este returnat nemodificat, niciodată o eroare

Locația motorului: `open-sse/services/compression/engines/llmlingua/`. Secțiunea din panoul de control
este `Dashboard -> Context & Cache -> LLMLingua`.

### Modele

Modelul implicit este **TinyBERT** (`atjsh/llmlingua-2-js-tinybert-meetingbank`, ~57 MB,
rapid). Un model **BERT-base** cu acuratețe mai mare (`Arcoldd/llmlingua4j-bert-base-onnx`,
~710 MB) este disponibil prin câmpul `model` din configurația motorului. `@huggingface/transformers`
descarcă în mod leneș modelul selectat din HuggingFace Hub în
`${DATA_DIR}/models/llmlingua` la primul apel (`modelStore.ts`); o suprascriere prin opțiunea
`modelPath` din configurație indică în schimb o copie locală (pentru instalări offline / izolate de rețea).

### Dependențe opționale și instalare la cerere

Stiva de peer dependencies pentru runtime-ul LLMLingua eliminabil este **opțională**. Două pachete sunt declarate ca
`optionalDependencies` în `package.json` și sunt păstrate **externe** de buildul de producție
(`scripts/build/prepublish.ts` nu le include în bundle):

| Pachet               | Versiune (fixată) | Observații                                          |
| -------------------- | ----------------- | --------------------------------------------------- |
| `@atjsh/llmlingua-2` | `2.0.5`           | Pachet de intrare; le declară pe celelalte ca peers |
| `js-tiktoken`        | `^1.0.20`         | Tokenizator                                         |

`@huggingface/transformers` este fixat la `^4.2.0` (partajat cu ruta locală pentru embeddings și
inclus, de asemenea, prin urmărire în bundle-ul autonom); `@atjsh/llmlingua-2@2.0.5` îl declară ca peer cu
`"^3.5.2 || ^4.0.0"`, astfel încât sunt acceptate atât Transformers.js v3, cât și v4. Începând cu 2.0.4,
`@atjsh/llmlingua-2` nu mai necesită `@tensorflow/tfjs`, ceea ce a eliminat cel mai mare
contributor individual (TensorFlow.js) din stiva SLM. Numai cele două pachete de mai sus sunt peers SLM
eliminabili. Un `npm install` standard (dezvoltare) instalează automat stiva opțională, cu excepția cazului în care dependențele
opționale sunt omise.

**De ce la cerere:** pachetul publicat pe npm, bundle-ul autonom și imaginea Docker
sunt livrate **fără** aceste dependențe pentru a rămâne compacte. Când acestea lipsesc, verificarea
dependențelor efectuată de worker (o încercare de rezolvare pentru `@atjsh/llmlingua-2` în `worker.ts`) eșuează, iar motorul
**continuă silențios fără efect** — selectarea LLMLingua nu produce nicio modificare (textul este returnat nemodificat, fără
înregistrarea vreunei erori). Pentru a-l activa într-un mediu redus, instalați stiva opțională:

```bash
# fixați versiunile la cele declarate în optionalDependencies din package.json
npm install @atjsh/llmlingua-2@2.0.5 js-tiktoken
```

Eliminarea `@tensorflow/tfjs` (2.0.4+) înlătură componenta anterior dominantă, de ~800 MB
— spațiul rămas este ocupat de runtime-urile transformers.js + onnxruntime-node,
plus modelul TinyBERT (~57 MB), descărcat la prima utilizare (nu prin npm).

Pentru fiecare mediu:

- **Dezvoltare / `npm install`** — instalat automat, cu excepția cazului în care ați folosit `--omit=optional`
  (sau `--no-optional`). Nu este necesară nicio acțiune.
- **npm global (`npm i -g omniroute`) / autonom** — rulați comanda de instalare de mai sus în
  directorul pachetului instalat sau reinstalați fără a omite dependențele opționale.
- **Docker** — adăugați comanda de instalare într-un strat al unei imagini derivate; imaginea publicată
  este livrată în mod intenționat într-o formă minimală.
- **VPS (PM2)** — instalați în `node_modules` al aplicației, apoi reporniți procesul pentru ca
  workerul să verifice din nou mecanismul de control.
- **Next autonom neprelucrat (`npm run build` → `.build/next/standalone/server.js`)** — trasarea
  autonomă nu include NICI workerul, NICI dependențele opționale, astfel că motorul permite în mod silențios
  continuarea în caz de eroare. `scripts/build/colocate-standalone.mjs` le adaugă din nou pe ambele (workerul esbuild +
  închiderea dependențelor opționale în arborele autonom); acesta rulează automat prin hookul npm
  `postbuild` după fiecare compilare. Idempotent, tolerează erorile atunci când dependențele lipsesc.

**Verificați dacă este activ:** când LLMLingua este selectat, textul real chiar se comprimă (motorul
nu mai permite continuarea în caz de eroare), iar prima solicitare declanșează descărcarea modelului în
`${DATA_DIR}/models/llmlingua`. Mecanismul de control verifică în mod intenționat doar `@atjsh/llmlingua-2` —
celelalte pachete peer sunt exclusiv ESM, iar `require.resolve` generează o excepție pentru ele chiar și atunci când sunt prezente — astfel că
workerul permite în continuare continuarea în caz de eroare dacă vreun pachet peer lipsește cu adevărat la momentul apelului `import()`.

## Pipeline-uri stivuite

Modul stivuit execută pașii pipeline-ului în ordine. Ordinea implicită este:

```txt
rtk -> caveman
```

Utilizați acest mod pentru sesiunile cu agenți de programare în care un prompt combină rezultatul comenzilor cu proză scrisă de utilizator sau de asistent. RTK reduce mai întâi jurnalele zgomotoase ale instrumentelor, apoi Caveman comprimă limbajul natural rămas.

Pașii pipeline-ului sunt configurați prin `stackedPipeline` în setările de compresie sau prin combinații de compresie.

Când ambele motoare reduc aceeași sarcină utilă eligibilă, economiile se cumulează:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## Filtrul arborelui de accesibilitate MCP

Filtrul inteligent pentru arborele de accesibilitate MCP este un strat de compresie aplicat după execuție, care operează asupra **rezultatelor instrumentelor** MCP, nu asupra prompturilor sau contextului. Acesta vizează sarcinile utile detaliate ale arborelui de accesibilitate și instantaneele browserului returnate de instrumente precum Playwright, computer-use și serverele MCP pentru automatizarea browserului.

### Ce face

1. **Eliminarea zgomotului** — elimină intrările generice/textuale goale (`- generic:`, `- text: ""`)
2. **Comprimarea elementelor vecine** — când ≥ `collapseThreshold` (implicit 30) linii consecutive reprezintă repetări structurale, le comprimă la primele `collapseKeepHead` (implicit 10) linii + un rezumat al numărului + ultimele `collapseKeepTail` (implicit 5) linii
3. **Păstrarea referințelor** — ancorele `[ref=eXX]` necesare pentru Playwright/computer-use nu sunt modificate niciodată
4. **Trunchiere strictă** — dacă textul rezultat după comprimare depășește în continuare `maxTextChars` (implicit 50.000), acesta este trunchiat și se adaugă un indiciu de navigare, astfel încât agentul să își poată continua activitatea

### Locația motorului

```txt
open-sse/services/compression/engines/mcpAccessibility/
  index.ts            ← punctul de intrare smartFilterText()
  collapseRepeated.ts ← algoritmul de comprimare a elementelor vecine
  constants.ts        ← DEFAULT_MCP_ACCESSIBILITY_CONFIG
```

### Configurare

Controlat prin `compression.mcpAccessibility` în setările globale (migrarea 056). Configurația implicită:

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

Filtrul este aplicat numai sarcinilor utile ale rezultatelor instrumentelor al căror `type` este `"text"` și a căror lungime depășește `minLengthToProcess`. Acesta nu afectează compresia prompturilor sau sarcinile utile ale cererilor.

### Economii estimate

60–80% pentru rezultatele instrumentelor care conțin instantanee ale browserului, în funcție de complexitatea paginii. Algoritmul de comprimare are complexitatea O(n) în raport cu numărul de linii și adaugă o latență neglijabilă.

### Acest filtru comparativ cu motoarele de compresie de mai sus

| Aspect              | Caveman / RTK / Stacked      | Filtrul de accesibilitate MCP          |
| ------------------- | ---------------------------- | -------------------------------------- |
| Țintă               | Prompturi / context cerere   | Rezultatele instrumentelor MCP         |
| Declanșator         | Setarea modului de compresie | `compression.mcpAccessibility.enabled` |
| Domeniu de aplicare | Toate mesajele SSE           | Numai rezultatele instrumentelor       |
| Ancore de referință | Nu se aplică                 | Păstrate necondiționat                 |

---

## Combinații de compresie

Combinațiile de compresie sunt profiluri de compresie denumite care pot fi atribuite combinațiilor de rutare:

- `compression_combos`: stochează modul, pipeline-ul, configurația RTK, configurația de limbă și marcajul implicit
- `compression_combo_assignments`: asociază o combinație de compresie cu o combinație de rutare
- integrarea în timpul execuției rezolvă o combinație de compresie atribuită înaintea suprascrierilor generice ale combinației
- datele analitice includ `compression_combo_id` și `engine`

Locație în panoul de control: `Dashboard -> Context & Cache -> Compression Combos`.

## Suprafața API

| Rută                                   | Scop                                                                  |
| -------------------------------------- | --------------------------------------------------------------------- |
| `/api/settings/compression`            | Setări globale de compresie (include configurația `mcpAccessibility`) |
| `/api/compression/preview`             | Previzualizarea oricărui mod de compresie                             |
| `/api/compression/language-packs`      | Listează pachetele lingvistice Caveman disponibile                    |
| `/api/context/caveman/config`          | Alias pentru setările Caveman                                         |
| `/api/context/rtk/config`              | Valori implicite și setări RTK                                        |
| `/api/context/rtk/filters`             | Catalogul de filtre RTK                                               |
| `/api/context/rtk/test`                | Endpoint RTK pentru previzualizare/testare                            |
| `/api/context/rtk/raw-output/[id]`     | Recuperarea autentificată a ieșirii brute cu date sensibile eliminate |
| `/api/context/combos`                  | Operații CRUD pentru combinațiile de compresie                        |
| `/api/context/combos/[id]/assignments` | Operații CRUD pentru atribuirea combinațiilor de rutare               |
| `/api/context/analytics`               | Alias pentru datele analitice privind compresia                       |

Rutele de administrare necesită autentificare de administrare sau verificări ale politicii privind cheia API.

## Instrumente MCP

Compresia expune cinci instrumente MCP:

| Instrument                          | Domeniu             | Scop                                               |
| ----------------------------------- | ------------------- | -------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Setări, date analitice, statistici cache           |
| `omniroute_compression_configure`   | `write:compression` | Actualizarea setărilor globale                     |
| `omniroute_set_compression_engine`  | `write:compression` | Setarea modului și a pipeline-ului opțional        |
| `omniroute_list_compression_combos` | `read:compression`  | Listează combinațiile de compresie                 |
| `omniroute_compression_combo_stats` | `read:compression`  | Citește datele analitice despre combinații/motoare |

## Domeniu de aplicare și excluderi

**Încorporările nu sunt comprimate niciodată.** `open-sse/handlers/embeddings.ts` nu apelează niciodată niciun
motor de compresie — corpurile cererilor/răspunsurilor sunt transmise direct executorului, fără modificări.
În prezent, acest lucru este structural (încorporările și completările conversaționale au gestionari separați), nu o
verificare în timpul execuției, dar înseamnă că problema distorsionării vectorilor din #8034 nu are nicio suprafață de expunere
pe calea încorporărilor.

**Filtru de excludere per model/endpoint (#8034).** Pentru completările conversaționale, un operator poate specifica
ID-uri de modele / destinații `provider/model` care nu trebuie comprimate niciodată — o măsură de protecție utilă dacă,
ulterior, compresia este conectată mai aproape de o cale adiacentă încorporărilor și, în general, utilă
pentru orice model în cazul căruia contează ca promptul să fie identic octet cu octet (evaluări deterministe, prefixe
sensibile la cache etc.).

- Câmp de setări: `exclusions?: string[]` în configurația globală de compresie
  (`GET`/`PUT /api/settings/compression`), păstrat prin spațiul de nume existent `key_value` pentru compresie
  (`src/lib/db/compression.ts`) — fără tabel nou.
- Filă în panoul de control: **Dashboard → Compression → Exclusions**
  (`/dashboard/compression/exclusions`).
- Sintaxa modelelor: `*` este singurul metacaracter. Orice alt metacaracter de expresie regulată dintr-un model este
  escap-at înainte de potrivire, astfel încât `gpt-5.6` se potrivește numai cu șirul literal, niciodată cu `gpt-5x6`
  (sigur împotriva ReDoS, limitat, fără cuantificatori imbricați). Modelele sunt comparate fără a ține cont de majuscule și minuscule atât cu
  ID-ul simplu al modelului, cât și cu forma compusă `provider/model` — `gpt-5-6`, `openai/gpt-5-6`
  și `openai/*` funcționează toate, iar `*` singur exclude fiecare model.
- Potrivire: `isCompressionExcluded()` / `normalizeCompressionExclusions()` în
  `open-sse/services/compression/exclusions.ts`. `chatCore.ts` verifică destinația exclusă
  imediat după rezolvarea setărilor de compresie, **înainte de rularea oricărui motor**, și tratează o potrivire
  exact ca și cum compresia ar fi dezactivată global — corpul cererii este în mod demonstrabil
  identic octet cu octet. Omiterea este înregistrată prin `writeCompressionSkip(..., "excluded")` pentru
  vizibilitate în datele analitice.
- Valoare implicită (listă goală/absentă): comportament identic cu cel anterior #8034 — nimic nu este exclus.

## Limitări cunoscute

- **LLMLingua-2 (SLM) necesită dependențe opționale colocate.** Workerul rulează într-un
  build de producție numai atunci când `@atjsh/llmlingua-2` și dependențele peer sunt colocate în
  `dist/node_modules` (consultați `scripts/build/colocateOptionals.mjs`, #4286). Fără acestea,
  motorul continuă în mod sigur (returnează textul original). Rezolvarea workerului nu mai depinde de
  `import.meta.url` (aceasta eșuează în bundle-ul independent) — se ancorează în directorul de lucru
  din timpul execuției / `argv[1]`.
- **Pachetele lingvistice Caveman `de` / `fr` / `ja` sunt parțiale.** Acestea includ reguli
  `context` + `filler` + `structural`, dar nu și pachete `dedup` / `ultra`, astfel încât intensitatea
  `ultra` nu este mai puternică decât `full` pentru limbile respective (acestea utilizează exclusiv
  propriile reguli — nu există nicio revenire implicită la regulile `dedup`/`ultra` pentru limba
  engleză, care ar altera textul în limbi străine). `en` / `es` / `id` / `pt-BR` sunt complete.
  Contribuțiile cu `dedup.json` + `ultra.json` pentru pachetele parțiale sunt binevenite.
- **Telemetria stivuită enumeră numai motoarele care au comprimat.** Un pas al pipeline-ului
  stivuit al cărui motor a rulat, dar a produs economii de 0 %, returnează `stats:null` și, prin
  urmare, nu apare în `engineBreakdown` — fiind imposibil de diferențiat de un pas omis. Diferențierea
  dintre „a rulat, 0 %” și „omis” ar necesita o modificare a modelului de detaliere și este amânată.

## Validare

Testele cheie pentru această zonă sunt:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-*.test.ts tests/unit/compression/pipeline-integration.test.ts tests/unit/compression/context-compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/*.test.ts tests/golden-set/*.test.ts tests/integration/compression-pipeline.test.ts tests/unit/api/compression/compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/mcpAccessibility*.test.ts
npm run typecheck:core
```
