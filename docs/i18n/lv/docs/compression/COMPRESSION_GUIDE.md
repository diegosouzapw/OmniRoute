# 🗜️ Prompt Compression Guide — OmniRoute (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> Automātiski ietaupiet 15–95% no piemērotā konteksta. Īsu pārskatu skatiet [README saspiešanas sadaļā](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically).

## Pārskats

OmniRoute īsteno modulāru uzvedņu saspiešanas konveijeru, kas darbojas **proaktīvi**, pirms pieprasījumi sasniedz augšupējos pakalpojumu sniedzējus. Tas nozīmē, ka marķieru ietaupījums notiek nemanāmi — darbplūsmā nekas nav jāmaina.

```
Klienta pieprasījums
  → Saspiešanas stratēģijas atlasītājs
    → Vai ir kombinācijas pārrakstīšana? → Izmantot kombinācijas iestatījumu
    → Vai sasniegts automātiskās aktivizēšanas slieksnis? → Izmantot automātisko režīmu
    → Vai ir noklusējuma režīms? → Izmantot globālo iestatījumu
    → Vai izslēgts? → Izlaist saspiešanu
  → Atlasītais saspiešanas režīms
    → Izslēgts: bez saspiešanas
    → Viegls: droša atstarpju/formatējuma tīrīšana (~15%)
    → Standarta: liekvārdības noņemšana „alu cilvēka” stilā (~30%)
    → Agresīvs: vēstures novecināšana + apkopošana (~50%)
    → Ultra: heiristiska retināšana + koda bloku samazināšana (~75%)
    → RTK: komandas ņemoša vērā termināļa/rīku izvades filtrēšana (60–90% augšupējā diapazonā)
    → Daudzpakāpju: sakārtots vairāku dzinēju konveijers, parasti RTK un pēc tam Caveman (78–95% piemērotā diapazona)
  → Saspiests pieprasījums → Pakalpojumu sniedzējs
```

---

## Saspiešanas režīmi

### Izslēgts

Saspiešana netiek veikta. Visi ziņojumi tiek nodoti tālāk bez izmaiņām.

### Vieglais režīms (~15% ietaupījums, <1ms latentums)

Visdrošākais režīms — nekādu semantisku izmaiņu, tikai formatējuma tīrīšana:

| Paņēmiens                | Apraksts                                               |
| ------------------------ | ------------------------------------------------------ |
| `collapseWhitespace`     | Apvieno secīgas tukšās rindas un noņem beigu atstarpes |
| `dedupSystemPrompt`      | Noņem dublētus sistēmas ziņojumus                      |
| `compressToolResults`    | Saspiež izvērstu rīku/funkciju izvadi                  |
| `removeRedundantContent` | Noņem atkārtotus norādījumus                           |
| `replaceImageUrls`       | Saīsina base64 attēlu datu URI                         |

**Vispiemērotākais:** pastāvīgai lietošanai un drošībai kritiskām darbplūsmām.

### Standarta režīms (~30% ietaupījums)

Iedvesmots no [Caveman](https://github.com/JuliusBrussee/caveman) — noņem liekvārdību un izvērstus formulējumus, vienlaikus saglabājot nozīmi:

- Noņem liekvārdību ("lūdzu", "manuprāt", "būtībā", "faktiski")
- Saīsina izvērstas frāzes ("lai varētu" → "lai", "tā rezultātā, ka" → "jo")
- Noņem pārspīlētu pieklājību ("Vai jūs neiebilstu...", "Ja jūs, iespējams, varētu...")
- Vairāk nekā 30 regulāro izteiksmju kārtulu, kas pielāgotas programmēšanas uzvednēm

**Vispiemērotākais:** ikdienas programmēšanas darbplūsmām un komandām, kas rūpīgi pārvalda izmaksas.

### Agresīvais režīms (~50% ietaupījums)

Vieda vēstures pārvaldība ilgām sesijām:

- **Ziņojumu novecināšana** — vecāki ziņojumi tiek pakāpeniski vairāk saspiesti
- **Rīku rezultātu apkopošana** — gara rīku izvade tiek aizstāta ar kopsavilkumiem
- **Strukturālās integritātes aizsardzība** — nodrošina, ka `tool_use` un `tool_result` pāri paliek savstarpēji saskaņoti
- **Konteksta loga ņemšana vērā** — ievēro katra modeļa marķieru ierobežojumus

**Vispiemērotākais:** ilgstošām atkļūdošanas sesijām un lielām kodu bāzēm.

### Ultra režīms (~75% ietaupījums)

Maksimāla saspiešana situācijām, kurās marķieru skaits ir kritiski svarīgs:

- **Heiristiska retināšana** — noņem ziņojumus, kuru atbilstība ir zemāka par slieksni
- **Koda bloku samazināšana** — saspiež atkārtotus koda piemērus
- **Binārās meklēšanas apcirpšana** — atrod optimālo konteksta loga nogriešanas punktu
- Iekļautas visas agresīvā režīma funkcijas

**Vispiemērotākais:** gadījumiem, kad atkārtoti tiek sasniegti konteksta ierobežojumi.

### RTK režīms (60–90% augšupējā diapazonā)

RTK režīms ir optimizēts apjomīgai rīku izvadei, kas parādās programmēšanas aģentu sesijās:

- Nosaka tādas komandu/izvades klases kā `git status`, `git diff`, `git log`, testu izpildītāji,
  TypeScript/Vite/Webpack būvējumi, ESLint/Biome/Prettier, npm auditi/instalācijas, Docker žurnāli, infrastruktūras
  izvade un vispārīga čaulas izvade
- Lieto JSON filtru pakotnes no `open-sse/services/compression/engines/rtk/filters/`
- Importē RTK TOML shēmas v1 filtrus no projekta vai globālajiem `filters.toml` failiem, veicot iekļauto testu
  validāciju un projekta failu uzticamības pārbaudi
- Ietver 49 iebūvētus filtrus ar iekļautiem verifikācijas paraugiem
- Noņem ANSI vadības sekvences, progresa joslas, atkārtotas rindas un nevajadzīgu informāciju, kas nepalīdz veikt darbības
- Saglabā neveiksmes, kļūdas, brīdinājumus, mainītos failus, kopsavilkumus un garas izvades beigu daļu
- Atbalsta projekta filtrus ar uzticamības pārbaudi, globālos filtrus un neobligātu rediģētās neapstrādātās izvades atkopšanu

**Vispiemērotākais:** aģentu sesijām ar čaulas, būvēšanas, testēšanas, git, grep un failu izvades pierakstiem.

### Daudzpakāpju režīms (78–95% piemērotā diapazona)

Daudzpakāpju režīms palaiž vairākus saspiešanas dzinējus deterministiskā secībā. Noklusējuma konveijers ir:

```txt
RTK -> Caveman
```

Šāda secība vispirms padara termināļa/rīku izvadi kompaktu un pēc tam lieto Caveman semantisko saīsināšanu
atlikušajai dabiskās valodas uzvednei. Daudzpakāpju konveijerus var konfigurēt globāli vai ar
saspiešanas kombinācijām, kas piešķirtas maršrutēšanas kombinācijām.

**Vispiemērotākais:** jauktam kontekstam ar apjomīgiem rīku žurnāliem, kā arī cilvēka norādījumiem vai asistenta kopsavilkumiem.

---

## Augšupējo projektu ietaupījumu aprēķini

OmniRoute dokumentē saspiešanas ietaupījumus no diviem avotiem: augšupējo projektu veiktspējas testiem un
paša OmniRoute dzinēju kombinācijas.

| Avots   | Šeit izmantotais skaitlis no augšupējā projekta README                                                                                        |
| ------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Caveman | Par `~75%` mazāk izvades tokenu, `65%` vidējais izvades ietaupījums veiktspējas testos, `22-87%` diapazons un `~46%` ievades saspiešanas rīks |
| RTK     | `60-90%` komandu izvades ietaupījums; parauga sesijā `~118,000 -> ~23,900` tokenu jeb ietaupīti `79.7%` (`~80%`)                              |

Rīku/konteksta lietderīgajām slodzēm, kas pārklājas, noklusējuma OmniRoute kombinācija secīgi izmanto šos dzinējus:

```txt
RTK -> Caveman
```

Kopējais ietaupījums tiek reizināts, nevis saskaitīts:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

Šis `78-95%` rādītājs attiecas uz gadījumiem, kad gan RTK, gan Caveman var samazināt vienu un to pašu ievades/konteksta lietderīgo slodzi.
Caveman atbilžu izvades režīms ir atsevišķs: kad tas ir iespējots, izmantojiet paša Caveman izvades ietaupījuma rādītājus (`65%`
vidēji, `~75%` galvenais rādītājs, `22-87%` diapazons). Kopējais norēķinu ietaupījums ir atkarīgs no jūsu uzvedņu un izvades proporcijas.

### Ko patiesībā nozīmē “piemērots”

Galvenajā aprakstā norādītais 15-95% diapazons ir reāls, taču tas attiecas tikai uz **redundantu vai pārmērīgi izvērstu** saturu — atkārtotām
kļūdu rindām, būvējuma žurnālu, kas pārpludina izvadi ar vienu un to pašu brīdinājumu, vai pārmērīgi lielu `grep`/faila lasīšanas izvadi. Tas
**nenozīmē**, ka katrs pieprasījums nodrošina šādu ietaupījumu.

Empīriski pārbaudīts (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`): režīma
`stacked` (RTK + Caveman) izpilde ar Anthropic formas `tool_result` bloku, kurā bija 300 identiskas
kļūdu rindas, nodrošināja **95.93% tokenu ietaupījumu / 96.26% rakstzīmju ietaupījumu** — tieši reklamētajā
diapazonā. Taču, izpildot to pašu konveijeru ar normālu, neredundantu rīka izvadi (tīru `grep` atbilstību sarakstu,
īsu faila lasījumu, parastu sarunas tekstu), tas pamatoti nodrošina **gandrīz nulles ietaupījumu**, jo
nav nekā atkārtojoša, ko noņemt, un `validateCompression()` (`validation.ts`) atsakās nosūtīt
pārveidotu versiju, kurā tiktu atmesti vai mainīti koda bloki, URL, virsraksti, versijas vai ar LIELAJIEM BURTIEM rakstīti konstantu identifikatori.

Tā ir paredzēta un droša darbība, nevis kļūda: kodēšanas sesijā, kurā galvenokārt tiek lasīti faili vai tajos meklēts ar `grep`,
kopējais ietaupījums būs neliels pat tad, ja saspiešana ir pilnībā iespējota, savukārt sesijā, kurā rodas kļūmju cikls
vai tiek izmantots daudz izvades ģenerējošs linteris, šai datplūsmai būs redzams pilns 78-95% diapazons. Neuzskatiet vienas sesijas
zemo kopējā ietaupījuma procentuālo rādītāju par pierādījumu tam, ka saspiešana ir nepareizi konfigurēta — vispirms pārbaudiet, vai
pamatā esošā rīka izvade patiešām bija redundanta.

---

## Tokenu ietaupījuma vizualizācija

```
Bez saspiešanas:     LLM nosūtīti 47K tokenu
Ar Lite:             nosūtīti 40K tokenu       (ietaupīti 15% — drošs, vienmēr aktīvs)
Ar Standard:         nosūtīti 33K tokenu       (ietaupīti 30% — caveman-speak noteikumi)
Ar Aggressive:       nosūtīti 24K tokenu       (ietaupīti 50% — novecināšana + apkopošana)
Ar Ultra:            nosūtīti 12K tokenu       (ietaupīti 75% — heiristiska atsijāšana)
Ar RTK:              nosūtīti 19K-5K tokenu    (ietaupīti 60-90% komandu/rīku izvadē)
Ar Stacked:          nosūtīti 10K-2.5K tokenu  (78-95% ietaupījuma diapazons piemērotai RTK+Caveman datplūsmai)
```

---

## Konfigurācija

### Informācijas panelis

Dodieties uz `Dashboard → Context & Cache`:

- **Caveman** — režīma izvēle, valodu pakotnes, priekšskatījums un globālās noklusējuma vērtības
- **RTK** — komandu filtru priekšskatījums, RTK drošības iestatījumi un filtru katalogs
- **Compression Combos** — nosauktas dzinēju cauruļvadu sistēmas, kas piešķirtas maršrutēšanas kombinācijām
- **Auto-Trigger Threshold** — automātiski ieslēgt kompresiju, ja marķieru skaits pārsniedz slieksni

### Pārrakstīšana katrai kombinācijai

Sadaļā `Dashboard → Context & Cache → Compression Combos` piešķiriet kompresijas kombināciju maršrutēšanas kombinācijai:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Tas ļauj izmantot sakārtotu kompresiju bezmaksas/kodēšanas pakalpojumu sniedzējiem, vienlaikus saglabājot vieglo režīmu maksas abonementiem.

Šis "Pārrakstīšanas katrai kombinācijai" piešķīrums ir atšķirīga vadība no **maršrutēšanas kombinācijas kompresijas režīma** pārrakstīšanas (Default/Off/Lite/Standard/Aggressive/Ultra) — šī pārrakstīšana neizvēlas nosauktu kompresijas kombinācijas cauruļvadu; tā tikai iestata `compressionMode` lauku, ko izmanto `resolveCompressionPlan`. To var iestatīt vai nu kombinācijas kartītē (`Dashboard → Combos`), vai, kopš #6760, katrai maršrutēšanas kombinācijai sarakstā "Assign to routing" sadaļā `Dashboard → Context & Cache → Compression Combos`, tieši blakus iepriekš dokumentētajai cauruļvadu piešķiršanas izvēles rūtiņai. Abas saskarnes saglabājas, izmantojot to pašu `PUT /api/combos/{id}` galapunktu.

### Pārrakstīšana katram pieprasījumam

Nosūtiet `x-omniroute-compression` pieprasījuma galveni, lai pārrakstītu kompresijas plānu vienam pieprasījumam. Tam ir visaugstākā prioritāte — tas pārspēj maršrutēšanas kombinācijas pārrakstīšanu, aktīvo profilu, automātisko aktivizēšanu un paneļa noklusējuma iestatījumu. Nezināmas vērtības tiek ignorētas (pieprasījums nekad netiek noraidīts), un globālais galvenais slēdzis joprojām kontrolē visu: ja kompresija ir globāli izslēgta, galvene to nevar ieslēgt. Vērtības:

| Vērtība       | Efekts                                                                                                          |
| ------------- | --------------------------------------------------------------------------------------------------------------- |
| `off`         | Nav kompresijas šim pieprasījumam.                                                                              |
| `default`     | No paneļa atvasinātais noklusējuma profils (ignorē aktīvo profilu). Zaudējošie dzinēji tiek atstāti izslēgti.   |
| `safe`        | Tas pats, kas izlaižot galveni: tikai dublikātu noņemšana un atstarpju salocīšana.                              |
| `allow-lossy` | Saglabāt šī pieprasījuma operatora plānu, ieskaitot kopsavilkumus, atbilstības filtrus un stila pārrakstījumus. |
| `engine:<id>` | Viens dzinējs, ja tas ir iespējots, piemēram, `engine:rtk`. Tas ir katra pieprasījuma piekrišana šim dzinējam.  |
| `<combo>`     | Nosaukta kombinācija, kas vispirms tiek saskaņota pēc nosaukuma (bez reģistrjutības), pēc tam pēc ID.           |

Bez `allow-lossy`, `engine:<id>` vai nosauktas kombinācijas zaudējošie dzinēji netiek lietoti. Pieprasījums joprojām saņem sesijas dublikātu noņemšanu un atstarpju salocīšanu, ja kompresija ir ieslēgta.

Lietotais plāns tiek atgriezts atbildes galvenē `X-OmniRoute-Compression: <mode>; source=<source>`, kur `<source>` ir viens no `request-header`, `routing-override`, `active-profile`, `auto-trigger`, `default` vai `off`.

### API

```bash
# Iegūt kompresijas iestatījumus
curl http://localhost:20128/api/settings/compression

# Atjaunināt kompresijas iestatījumus
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Priekšskatīt specifisku RTK/sakārtotu datu slodzi
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Uzskaitīt RTK filtru pakotnes
curl http://localhost:20128/api/context/rtk/filters

# Tieši testēt RTK ar papildu komandas metadatiem
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## Kas tiek aizsargāts

Saspiešanas dzinis **vienmēr saglabā:**

- ✅ Koda blokus (norobežotus un iekļautus tekstā)
- ✅ URL un failu ceļus
- ✅ JSON struktūras un strukturētus datus
- ✅ Identifikatorus un aizsargātus tehniskos marķierus
- ✅ Matemātiskas izteiksmes
- ✅ Rīku/funkciju izsaukumu definīcijas
- ✅ Sistēmas uzvednes (`lite` režīmā)

RTK neapstrādātās izvades atkopšana pirms datu saglabāšanas aizklāj bieži izmantotas API atslēgas, nesēja pilnvarojuma marķierus, Slack marķierus, AWS piekļuves atslēgas,
paroles, marķierus un noslēpumus.

---

## Saspiešanas statistika

Katra saspiestā pieprasījuma statistika tiek iekļauta servera žurnālos:

```json
{
  "originalTokens": 47200,
  "compressedTokens": 40120,
  "savingsPercent": 15.0,
  "techniquesUsed": ["collapseWhitespace", "dedupSystemPrompt"],
  "mode": "lite",
  "engine": "caveman",
  "compressionComboId": "coding-agent-stack",
  "durationMs": 0.8,
  "rtkRawOutputPointers": []
}
```

---

## Fāžu ceļvedis

| Fāze    | Režīmi                                                                                                                                                                     | Statuss      |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| 1. fāze | Izslēgts, Viegls                                                                                                                                                           | ✅ Piegādāts |
| 2. fāze | Standarta, Agresīvs, Ultra                                                                                                                                                 | ✅ Piegādāts |
| 3. fāze | RTK, Salikts, Kompresijas kombinācijas                                                                                                                                     | ✅ Piegādāts |
| 4. fāze | Izvades stili, SLM līmeņa Ultra, novērtēšanas sistēma                                                                                                                      | ✅ Piegādāts |
| 4C fāze | Adaptīvs konteksta budžets ("ciparnīca") — skaitļošanas dzinējs + API (`contextBudget` uz `PUT /api/settings/compression`) + informācijas paneļa režīma/politikas vadīklas | ✅ Piegādāts |

---

## Pateicības

Standarta režīma saspiešanas noteikumus iedvesmojis **[Caveman](https://github.com/JuliusBrussee/caveman)**, ko izveidojis **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — plašu popularitāti guvušais projekts „kāpēc izmantot daudz marķieru, ja pietiek ar dažiem”. Caveman ziņo par `~75%` mazāku izvades marķieru skaitu, `65%` vidējo izvades ietaupījumu etalonpārbaudēs, `22-87%` izvades ietaupījuma diapazonu un `~46%` ievades saspiešanas rīku.

RTK režīmu iedvesmojis **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)**, ko izveidojis **[RTK AI](https://github.com/rtk-ai)** — augstas veiktspējas komandu izvades saspiešanas projekts termināļa, būvēšanas, testēšanas, git un rīku izvades filtrēšanai. RTK ziņo par `60-90%` ietaupījumu, bet tā README sesijas paraugs uzrāda `~80%` ietaupījumu.

---

## Uzlabotas saspiešanas sistēmas

Papildus 7 standarta režīmiem OmniRoute ietver vairākas uzlabotas saspiešanas
sistēmas, kas darbojas automātiski atkarībā no konteksta.

### Kešatmiņu ņemoša vērā saspiešana

Daži pakalpojumu sniedzēji (piemēram, Anthropic ar uzvedņu kešošanu) atbalsta **uzvedņu kešošanu**,
kas ļauj tiem saglabāt kešatmiņā uzvednes daļas, lai samazinātu izmaksas un aizkavi. Kad
kešošana ir iespējota, agresīva saspiešana faktiski var **pasliktināt** veiktspēju,
jo tā maina kešotos tokenus, padarot kešatmiņu nederīgu.

Modulis `cachingAware.ts` to atrisina, **nosakot kešošanas kontekstu** un
**atbilstoši pielāgojot saspiešanas stratēģiju**.

#### Kā tas darbojas

1. **Nosaka kešošanas kontekstu** — Pārbauda, vai pieprasījuma pamattekstā ir `cache_control` marķieri
2. **Identificē kešošanu atbalstošus pakalpojumu sniedzējus** — Pārbauda, vai mērķa pakalpojumu sniedzējs atbalsta kešošanu
3. **Pielāgo stratēģiju** — Kešošanu atbalstošiem pakalpojumu sniedzējiem pazemina `aggressive`/`ultra` uz `standard`
4. **Izlaiž sistēmas uzvedni** — Sistēmas uzvednes parasti tiek kešotas, tāpēc tās netiek saspiestas
5. **Izmanto deterministiskas transformācijas** — Izmanto tikai transformācijas, kas rada konsekventu rezultātu

#### Koda piemērs

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← Kešatmiņas marķieris
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### Kad izmantot

Kešatmiņu ņemoša vērā saspiešana ir **vienmēr ieslēgta** — konfigurācija nav nepieciešama. Tā tiek aktivizēta tikai tad, ja:

- Pieprasījumā ir `cache_control` marķieri
- Mērķa pakalpojumu sniedzējs atbalsta uzvedņu kešošanu (Anthropic, OpenAI utt.)

### Progresīva novecošana

Garās sarunās uzkrājas daudzi ziņojumu dialoga soļi, taču vecāki soļi kļūst mazāk
nozīmīgi. Modulis `progressiveAging.ts` **pakāpeniski vienkāršo ziņojumus atkarībā no to attāluma dialogā**:

- **Nesenie dialoga soļi (0–3)**: Saglabāti nemainīti (pilna detalizācija)
- **Vidēji seni dialoga soļi (4–8)**: Viegla saspiešana (atstarpju un formatējuma sakārtošana)
- **Veci dialoga soļi (9+)**: „Alu cilvēka” saspiešana (liekvārdības noņemšana, apkopošana)
- **Ļoti veci dialoga soļi (20+)**: Intensīvi apkopoti vai atmesti

#### Koda piemērs

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... vēl 50 dialoga soļi ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // Pirmie 3 dialoga soļi: nemainīti
  light: 8, // 4.–8. dialoga solis: viegla saspiešana
  moderate: 20, // 9.–20. dialoga solis: „alu cilvēka” saspiešana
  // 21. un turpmākie dialoga soļi: intensīva apkopošana
});

// saved = ietaupīto tokenu skaits
```

#### Kad izmantot

Progresīva novecošana ir **vienmēr ieslēgta** režīmiem `aggressive` un `ultra`. Tā ir
īpaši efektīva:

- Ilgstošās programmēšanas sesijās
- Vairāku dienu sarunās
- Aģentu darbplūsmās ar daudziem rīku izsaukumiem

### „Alu cilvēka” izvades režīms

Modulis `outputMode.ts` ievieto **sistēmas uzvednes norādījumus**, lai pats
modelis veidotu saspiestu, lakonisku izvadi („alu cilvēka” stilā).

#### Kā tas darbojas

Tā vietā, lai saspiestu ievadi, šis režīms pievieno šādu sistēmas uzvedni:

> „Atbildi ar minimālu vārdu skaitu. Izlaid pieklājības frāzes. Lieto īsus teikumus.”

Tas ir īpaši piemērots:

- Koda ģenerēšanai (īsāka izvade = mazāk tokenu)
- Ātriem jautājumiem un atbildēm (nav nepieciešami izvērsti skaidrojumi)
- Pakešapstrādei (maksimālai caurlaidspējai)

#### Kad izmantot

„Alu cilvēka” izvades režīms ir **jāiespējo manuāli** — iestatiet to kombinētajā konfigurācijā:

```json
{
  "strategy": "auto",
  "config": {
    "auto": {
      "outputMode": "caveman"
    }
  }
}
```

### Izvades stili (katalogs)

Iepriekš aprakstītais „alu cilvēka” izvades režīms ir **mantotais viena stila risinājums**. 4. posmā tas tika vispārināts
par kombinējamu izvades stilu katalogu: `OUTPUT_STYLE_CATALOG` failā
`open-sse/services/compression/outputStyles/catalog.ts`. Katrs stils ir sistēmas uzvednes
norādījums, kas liek pašam modelim veidot lētāku izvadi; stilus var iespējot
kopā, un tie tiek ievietoti kataloga secībā.

| Stils                                   | `id`          | Ko tas dara                                                                                                                                                                                                                            | Instrukciju valodas                                                                     |
| --------------------------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Lakoniska proza                         | `terse-prose` | Atmet liekvārdību/artikulus/izvairīgas frāzes; precīzi saglabā tehnisko būtību. Tas pats teksts, kas mantotajā alu cilvēka izvades režīmā (norādīts ar atsauci, nevis pārrakstīts).                                                    | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                           |
| Mazāk koda                              | `less-code`   | YAGNI pieeja: mazākās funkcionējošās izmaiņas, nekādu nepieprasītu abstrakciju.                                                                                                                                                        | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                           |
| Zirgaste (slinks vecākais izstrādātājs) | `ponytail`    | "Labākais kods ir kods, kas nekad nav uzrakstīts": atkārtota izmantošana > pārrakstīšana, pamatcēlonis > simptoms, īsākais funkcionējošais diff.                                                                                       | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                           |
| Man ir ADHD (vispirms darbība)          | `i-have-adhd` | Vispirms darbība (komanda/ceļš/fragments pirms prozas), numurēti un ierobežoti soļi, VIENS konkrēts nākamais solis, bez ievada/kopsavilkuma/nobeiguma. Pielāgots no [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                           |
| Lakonisks CJK (文言)                    | `terse-cjk`   | Īpaši lakonisks klasiskās ķīniešu valodas stils.                                                                                                                                                                                       | zh (ierobežots pēc lokalizācijas: tiek piedāvāts tikai tad, ja noteiktā valoda ir `zh`) |

Katram stilam ir trīs intensitātes līmeņi — `lite`, `full`, `ultra` —, un katrs līmenis
beidzas ar kopīgo robežu klauzulu, kas saglabā koda blokus, failu ceļus, komandas,
kļūdu virknes, URL un identifikatorus nemainītus.

#### Kā darbojas ievietošana

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) salīdzina
atlasi ar katalogu (nezināmi id un lokalizācijai neatbilstoši stili tiek atmesti, nekad
neradot kļūdu), savieno atlasītās instrukcijas kataloga secībā, **vienreiz** pievieno
robežu klauzulu un sāk bloku ar vienu idempotences marķieri
(`[OmniRoute Output Styles]`), tāpēc atkārtota lietošana neko nemaina. Ja noteiktajai
valodai (skatiet sadaļu Valodas atlase tālāk) ir tulkojums, angļu valodas instrukcijas
vietā tiek ievietota lokalizētā instrukcija.

Pamattekstā ar `messages` satura apiešana (`shouldBypassCavemanOutputMode()` failā
`open-sse/services/compression/outputMode.ts`) pārbauda pēdējos trīs ziņojumus un izlaiž
stilus visam gājienam, ja tie atbilst drošības, neatgriezeniskas darbības,
precizēšanas vai secības jutīguma atslēgvārdiem. Apiešana darbojas, kamēr vadības panelī **Auto-Clarity Bypass** pārslēgs (`cavemanOutputMode.autoClarity`) ir ieslēgts, kas ir noklusējuma iestatījums; ja pārslēgs ir izslēgts, izvēlētie stili tiek piemēroti arī šajos gājienos.

Ja apiešana ļauj apstrādāt gājienu, `placeSystemInstruction()` (tajā pašā failā), kas
nekad neveido jaunu `messages[0]`, ievieto bloku pirmajā atrastajā vietā:

1. Sākuma sistēmas ziņojums ar virknes saturu: bloks tiek pievienots aiz tā teksta.
2. Augstākā līmeņa `system` lauks: bloks tiek pievienots aiz virknes teksta vai
   pievienots kā jauns teksta bloks satura bloku masīvam.
3. Pirmais nākamais sistēmas ziņojums ar virknes saturu: bloks tiek pievienots aiz tā
   teksta.
4. Nekas no iepriekš minētā: bloks tiek ievietots jaunā sistēmas ziņojumā `messages`
   beigās.

Pamattekstā bez `messages` bloks tiek pievienots virknes laukam `instructions` vai kļūst
par `instructions`, ja pamattekstā ir `input` (virkne vai masīvs). Pamatteksts, kurā nav
ne `instructions`, ne `input`, tiek izlaists kā `no_messages`.

#### Kā iespējot

Vadības panelī: **Context → Settings → Compression** — katram stilam viena rinda ar
ieslēgšanas/izslēgšanas pārslēgu un līmeņa atlasītāju. Programmatiski kompresijas
konfigurācija saglabā atlasi šādi:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Atpakaļsaderība: mantotais kombinācijas iestatījums `outputMode: "caveman"` joprojām
darbojas un tiek kartēts uz `terse-prose`, katrā mantotajā valodā baitus pa baitam
atbilstot vecajam ievietojumam.

Valodas atlase: ja `languageConfig.enabled` ir ieslēgts, `autoDetect` nosaka jaunākā
lietotāja ziņojuma valodu (izmantojot to pašu noteicēju, ko ievades dziņi);
izslēdzot `autoDetect`, tiek fiksēta `defaultLanguage`. Izslēgts → angļu valoda.

Stilu × valodu matrica ir fiksēta ar
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: jaunu stilu nevar izlaist
bez vismaz pt-BR tulkojuma (vai skaidri izsekota izņēmuma), un esošs stils nevar
nepamanīti zaudēt lokalizāciju. Lai pievienotu stilu, skatiet
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Rīku rezultātu kompresija

Modulis `toolResultCompressor.ts` nodrošina **5 specializētas kompresijas stratēģijas**
rīku rezultātiem (funkciju izsaukumiem, aģentu izvadei, meklēšanas rezultātiem utt.):

1. **Meklēšanas rezultātu kompresija** — noņem dublējošus rezultātus, saglabā labākos N
2. **Failu lasīšanas kompresija** — saīsina lielus failus, saglabā galvenes/importus
3. **Koda izpildes kompresija** — saglabā tikai būtisko stdout/stderr
4. **Datubāzes vaicājumu kompresija** — ierobežo rindas, noņem izvērstus metadatus
5. **API atbildes kompresija** — noņem null laukus, saīsina masīvus

#### Kad izmantot

Rīku rezultātu saspiešana ir **vienmēr ieslēgta**, ja ir veikti rīku izsaukumi. Nekāda
konfigurēšana nav nepieciešama.

### Secīgais konveijers

Secīgais režīms izpilda **vairākus dzinējus pēc kārtas** — parasti vispirms RTK
(60–90% rīku izvades ietaupījums), pēc tam Caveman (papildu 30% ietaupījums
atlikušajam tekstam). Tādējādi tiek panākts **78–95% kopējais ietaupījums**.

#### Kā tas darbojas

```
Ievade (1000 marķieru)
  → RTK (komandas ņemošs vērā filtrs) → 200 marķieru
    → Caveman (liekvārdības noņemšana) → 140 marķieru
  → Izvade (140 marķieru, 86% ietaupījums)
```

#### Kad izmantot

Izmantojiet secīgo režīmu šādiem nolūkiem:

- Darbplūsmām ar intensīvu rīku izmantošanu (aģentiska programmēšana, izpēte)
- Izmaksu ziņā jutīgai pakešapstrādei
- Ja nepieciešams maksimāls marķieru ietaupījums

Konfigurējiet, izmantojot kombinēto režīmu:

```json
{
  "strategy": "auto",
  "config": {
    "auto": {
      "modePack": "stacked"
    }
  }
}
```

---

## Kompresijas kombināciju ignorēšanas iestatījumi

Varat ignorēt globālo kompresijas režīmu **katrai kombinācijai atsevišķi**, lai precīzi pielāgotu darbību
dažādiem lietošanas gadījumiem:

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "auto": {
      "weights": { "taskFit": 0.5 },
      "modePack": "quality-first"
    }
  },
  "compressionOverride": {
    "mode": "aggressive",
    "stackedPipelines": ["rtk", "caveman"],
    "preserveToolDefinitions": true
  }
}
```

Tas ir noderīgi šādos gadījumos:

- **Programmēšanas kombinācijas**: izmantojiet režīmu `aggressive` ilgām sesijām
- **Ātro jautājumu un atbilžu kombinācijas**: izmantojiet režīmu `lite` ātrām atbildēm
- **Kombinācijas ar intensīvu rīku izmantošanu**: izmantojiet režīmu `stacked` maksimālam ietaupījumam
- **Produkcijas kombinācijas**: izmantojiet režīmu `cache-aware` pakalpojumu sniedzējiem, kas atbalsta kešatmiņu

---

## Skatiet arī

- [Vides konfigurācija](../reference/ENVIRONMENT.md) — Kompresijas vides mainīgie
- [Arhitektūras ceļvedis](../architecture/ARCHITECTURE.md) — Kompresijas konveijera iekšējā darbība
- [Lietotāja ceļvedis](../guides/USER_GUIDE.md) — Darba sākšana ar kompresiju
- [RTK kompresija](./RTK_COMPRESSION.md) — RTK filtri, uzticamības modelis, verifikācijas vārteja, neapstrādātās izvades atkopšana
- [Kompresijas dzinēji](./COMPRESSION_ENGINES.md) — Caveman, RTK, grupēšana, API, MCP, informācijas panelis
- [Kompresijas kārtulu formāts](./COMPRESSION_RULES_FORMAT.md) — JSON kārtulu pakotnes formāts
- [Kompresijas valodu pakotnes](./COMPRESSION_LANGUAGE_PACKS.md) — Valodai specifiskas Caveman kārtulas
