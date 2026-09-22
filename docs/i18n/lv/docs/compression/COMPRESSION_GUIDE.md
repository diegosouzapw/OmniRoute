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

- **Caveman** — režīma izvēle, valodu pakotnes, priekšskatījums un globālie noklusējumi
- **RTK** — komandu filtru priekšskatījums, RTK drošības iestatījumi un filtru katalogs
- **Compression Combos** — nosaukti dzinēju konveijeri, kas piešķirti maršrutēšanas kombinācijām
- **Auto-Trigger Threshold** — automātiski aktivizē saspiešanu, kad tokenu skaits pārsniedz slieksni

### Atsevišķas kombinācijas ignorēšana

Sadaļā `Dashboard → Context & Cache → Compression Combos` piešķiriet saspiešanas kombināciju maršrutēšanas
kombinācijai:

```txt
Kombinācija: "free-tier-fallback"
  Saspiešanas kombinācija: "coding-agent-stack"
  Konveijers: RTK -> Caveman
  Mērķi:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

Tas ļauj izmantot vairāklīmeņu saspiešanu bezmaksas/kodēšanas pakalpojumu sniedzējiem, vienlaikus saglabājot vienkāršoto režīmu maksas
abonementiem.

Šis "Atsevišķas kombinācijas ignorēšanas" piešķīrums ir cita vadīkla nekā **maršrutēšanas kombinācijas saspiešanas
režīma** ignorēšana (Default/Off/Lite/Standard/Aggressive/Ultra) — šī ignorēšana neizvēlas nosauktu
saspiešanas kombinācijas konveijeru; tā tikai iestata lauku `compressionMode`, kuru izmanto
`resolveCompressionPlan`. To var iestatīt vai nu kombinācijas kartītē (`Dashboard → Combos`), vai kopš
#6760 — katrai maršrutēšanas kombinācijai atsevišķi sarakstā "Assign to routing", kas atrodas
`Dashboard → Context & Cache → Compression Combos`, tieši blakus iepriekš aprakstītajai konveijera piešķiršanas izvēles rūtiņai.
Abās saskarnēs izmaiņas tiek saglabātas, izmantojot vienu un to pašu `PUT /api/combos/{id}` galapunktu.

### Atsevišķa pieprasījuma ignorēšana

Nosūtiet `x-omniroute-compression` pieprasījuma galveni, lai ignorētu saspiešanas plānu vienam
pieprasījumam. Tai ir augstākā prioritāte — tā prevalē pār maršrutēšanas kombinācijas ignorēšanu, aktīvo profilu,
automātisko aktivizēšanu un paneļa noklusējumu. Nezināmas vērtības tiek ignorētas (pieprasījums nekad netiek noraidīts), un
globālais galvenais slēdzis joprojām kontrolē visu: ja saspiešana ir globāli izslēgta, galvene nevar
to ieslēgt. Vērtības:

| Vērtība       | Efekts                                                                                         |
| ------------- | ---------------------------------------------------------------------------------------------- |
| `off`         | Šim pieprasījumam saspiešana netiek veikta.                                                    |
| `default`     | No paneļa atvasinātais noklusējuma profils (ignorē aktīvo profilu).                            |
| `engine:<id>` | Viens dzinējs, ja tas ir iespējots, piem., `engine:rtk`.                                       |
| `<combo>`     | Nosaukta kombinācija, vispirms meklējot pēc nosaukuma (neņemot vērā reģistru), pēc tam pēc ID. |

Piemērotais plāns tiek atgriezts `X-OmniRoute-Compression: <mode>; source=<source>` atbildes
galvenē, kur `<source>` ir viena no šīm vērtībām: `request-header`, `routing-override`, `active-profile`,
`auto-trigger`, `default` vai `off`.

### API

```bash
# Iegūt saspiešanas iestatījumus
curl http://localhost:20128/api/settings/compression

# Atjaunināt saspiešanas iestatījumus
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# Priekšskatīt konkrētu RTK/vairāklīmeņu lietderīgo slodzi
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# Uzskaitīt RTK filtru pakotnes
curl http://localhost:20128/api/context/rtk/filters

# Testēt RTK tieši ar neobligātiem komandas metadatiem
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

## Posmu ceļvedis

| Posms    | Režīmi                                                                                                                                                                           | Statuss     |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| 1. posms | Izslēgts, viegls                                                                                                                                                                 | ✅ Izlaists |
| 2. posms | Standarta, agresīvs, īpaši intensīvs                                                                                                                                             | ✅ Izlaists |
| 3. posms | RTK, slāņots, saspiešanas kombinācijas                                                                                                                                           | ✅ Izlaists |
| 4. posms | Izvades stili, SLM līmeņa īpaši intensīvais režīms, novērtēšanas sistēma                                                                                                         | ✅ Izlaists |
| 4C posms | Adaptīvs konteksta budžets („regulators”) — skaitļošanas dzinis + API (`contextBudget` parametrā `PUT /api/settings/compression`) + informācijas paneļa režīmu/politiku vadīklas | ✅ Izlaists |

---

## Pateicības

Standarta režīma saspiešanas noteikumus iedvesmojis **[Caveman](https://github.com/JuliusBrussee/caveman)**, ko izveidojis **[JuliusBrussee](https://github.com/JuliusBrussee)** (⭐ 51K+) — plašu popularitāti guvušais projekts „kāpēc izmantot daudz marķieru, ja pietiek ar dažiem”. Caveman ziņo par `~75%` mazāku izvades marķieru skaitu, `65%` vidējo izvades ietaupījumu etalonpārbaudēs, `22-87%` izvades ietaupījuma diapazonu un `~46%` ievades saspiešanas rīku.

RTK režīmu iedvesmojis **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)**, ko izveidojis **[RTK AI](https://github.com/rtk-ai)** — augstas veiktspējas komandu izvades saspiešanas projekts termināļa, būvēšanas, testēšanas, git un rīku izvades filtrēšanai. RTK ziņo par `60-90%` ietaupījumu, bet tā README sesijas paraugs uzrāda `~80%` ietaupījumu.

---

## Uzlabotas saspiešanas sistēmas

Papildus 7 standarta režīmiem OmniRoute ietver vairākas uzlabotas saspiešanas
sistēmas, kas darbojas automātiski atkarībā no konteksta.

### Kešatmiņu ņemoša vērā saspiešana

Daži nodrošinātāji (piemēram, Anthropic ar uzvedņu kešatmiņu) atbalsta **uzvedņu kešatmiņu**,
kas ļauj kešot uzvednes daļas, lai samazinātu izmaksas un latentumu. Kad
kešošana ir iespējota, agresīva saspiešana var faktiski **pasliktināt** veiktspēju,
jo tā maina kešotos marķierus un padara kešatmiņu nederīgu.

Modulis `cachingAware.ts` to atrisina, **nosakot kešošanas kontekstu** un
**attiecīgi pielāgojot saspiešanas stratēģiju**.

#### Kā tas darbojas

1. **Kešošanas konteksta noteikšana** — pieprasījuma pamattekstā meklē `cache_control` marķierus
2. **Kešošanu atbalstošo nodrošinātāju identificēšana** — pārbauda, vai mērķa nodrošinātājs atbalsta kešošanu
3. **Stratēģijas pielāgošana** — kešošanu atbalstošiem nodrošinātājiem pazemina `aggressive`/`ultra` līdz `standard`
4. **Sistēmas uzvednes izlaišana** — sistēmas uzvednes parasti tiek kešotas, tāpēc tās netiek saspiestas
5. **Deterministisku transformāciju izmantošana** — izmanto tikai tādas transformācijas, kas nodrošina konsekventu izvadi

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

Kešatmiņu ņemoša vērā saspiešana ir **vienmēr ieslēgta** — konfigurācija nav nepieciešama. Tā tiek aktivizēta tikai
tad, ja:

- Pieprasījumā ir `cache_control` marķieri
- Mērķa nodrošinātājs atbalsta uzvedņu kešošanu (Anthropic, OpenAI u.c.)

### Pakāpeniska novecošana

Garās sarunās uzkrājas daudzi ziņojumu cikli, taču vecāki cikli kļūst mazāk
nozīmīgi. Modulis `progressiveAging.ts` **samazina ziņojumu detalizācijas pakāpi atkarībā no cikla attāluma**:

- **Nesenie cikli (0-3)**: saglabāti burtiski (pilna detalizācija)
- **Vidēji seni cikli (4-8)**: viegla saspiešana (atstarpju un formatējuma sakārtošana)
- **Veci cikli (9+)**: Caveman saspiešana (liekvārdības noņemšana, kopsavilkuma veidošana)
- **Ļoti veci cikli (20+)**: būtiski saīsināti vai atmesti

#### Koda piemērs

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... vēl 50 cikli ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // Pirmie 3 cikli: burtiski
  light: 8, // 4.–8. cikls: viegla saspiešana
  moderate: 20, // 9.–20. cikls: Caveman saspiešana
  // Sākot ar 21. ciklu: būtiska saīsināšana
});

// saved = ietaupīto marķieru skaits
```

#### Kad izmantot

Progresīvā novecošana ir **vienmēr ieslēgta** `aggressive` un `ultra` režīmos. Tā ir
īpaši efektīva:

- Ilgstošām programmēšanas sesijām
- Vairāku dienu sarunām
- Aģentu darbplūsmām ar daudziem rīku izsaukumiem

### Alu cilvēka izvades režīms

`outputMode.ts` modulis ievieto **sistēmas uzvednes norādījumus**, lai pats
modelis ģenerētu saspiestu, lakonisku izvadi („alu cilvēka” stilā).

#### Kā tas darbojas

Tā vietā, lai saspiestu ievadi, šis režīms pievieno šādu sistēmas uzvedni:

> „Atbildi ar pēc iespējas mazāk vārdiem. Izlaid pieklājības frāzes. Lieto īsus teikumus.”

Tas darbojas īpaši labi:

- Koda ģenerēšanai (īsāka izvade = mazāk tokenu)
- Īsiem jautājumiem un atbildēm (nav vajadzīgi izvērsti skaidrojumi)
- Pakešapstrādei (maksimālai caurlaidspējai)

#### Kad izmantot

Alu cilvēka izvades režīms ir **jāieslēdz apzināti** — iestatiet to, izmantojot kombinēto konfigurāciju:

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

Iepriekš aprakstītais alu cilvēka izvades režīms ir **mantotais viena stila risinājums**. 4. posmā tas tika vispārināts,
izveidojot kombinējamu izvades stilu katalogu: `OUTPUT_STYLE_CATALOG` failā
`open-sse/services/compression/outputStyles/catalog.ts`. Katrs stils ir sistēmas uzvednes
norādījums, kas liek pašam modelim ģenerēt ekonomiskāku izvadi; stilus var iespējot
kopā, un tie tiek ievietoti kataloga secībā.

| Stils                                   | `id`          | Ko tas dara                                                                                                                                                                                                                              | Norādījumu valodas                                                                      |
| --------------------------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| Lakoniska proza                         | `terse-prose` | Atmet liekvārdību/artikulus/piesardzīgus formulējumus; precīzi saglabā tehnisko saturu. Tas pats teksts, kas mantotajā alu cilvēka izvades režīmā (izmantots ar atsauci, nevis atkārtoti ievadīts).                                      | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                           |
| Mazāk koda                              | `less-code`   | YAGNI pakāpju princips: mazākās funkcionējošās izmaiņas, nekādu nepieprasītu abstrakciju.                                                                                                                                                | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                           |
| Zirgaste (slinks vecākais izstrādātājs) | `ponytail`    | „Labākais kods ir kods, kas nekad nav uzrakstīts”: atkārtota izmantošana > pārrakstīšana, pamatcēlonis > simptoms, īsākā funkcionējošā izmaiņu kopa.                                                                                     | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                           |
| Man ir UDHS (vispirms darbība)          | `i-have-adhd` | Vispirms darbība (komanda/ceļš/fragments pirms apraksta), numurēti un ierobežoti soļi, VIENS konkrēts nākamais solis, bez ievada/kopsavilkuma/noslēguma. Pielāgots no [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT). | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi                                           |
| Lakonisks CJK (文言)                    | `terse-cjk`   | Īpaši lakonisks klasiskās ķīniešu valodas stils.                                                                                                                                                                                         | zh (ierobežots pēc lokalizācijas: tiek piedāvāts tikai tad, ja noteiktā valoda ir `zh`) |

Katram stilam ir trīs intensitātes līmeņi — `lite`, `full`, `ultra` — un katrs līmenis
beidzas ar kopīgo ierobežojumu klauzulu, kas saglabā koda blokus, failu ceļus, komandas,
kļūdu virknes, URL un identifikatorus nemainītus.

#### Kā darbojas ievietošana

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) salīdzina
atlasi ar katalogu (nezināmi identifikatori un lokalizācijai neatbilstoši stili tiek
atmesti, nekad neradot kļūdu), savieno atlasītos norādījumus kataloga secībā,
vienreiz pievieno ierobežojumu klauzulu un ievieto rezultātu sistēmas
uzvednes sākumā aiz viena idempotences marķiera (`[OmniRoute Output Styles]`) — atkārtota
lietošana neko nemaina. Ja noteiktajai pieprasījuma valodai ir pieejams tulkojums,
angļu valodas norādījuma vietā tiek ievietots lokalizētais norādījums.

#### Kā iespējot

Informācijas panelī: **Konteksts → Iestatījumi → Saspiešana** — katram stilam viena
rinda ar ieslēgšanas/izslēgšanas slēdzi un līmeņa atlasītāju. Programmatiski saspiešanas konfigurācija saglabā
atlasi šādi:

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

Atpakaļsaderība: mantotais kombinētais iestatījums `outputMode: "caveman"` joprojām darbojas un tiek kartēts uz
`terse-prose`; visās mantotajās valodās tas baitu līmenī ir identisks iepriekšējam ievietojumam.

Valodas atlase: ja `languageConfig.enabled` ir ieslēgts, `autoDetect` nosaka
jaunākā lietotāja ziņojuma valodu (tas pats detektors, ko izmanto ievades dziņi);
izslēdzot `autoDetect`, tiek fiksēta `defaultLanguage`. Ja izslēgts → angļu valoda.

Stilu × valodu matrica ir fiksēta ar
`tests/unit/compression/output-styles-i18n-matrix.test.ts`: jaunu stilu nevar izlaist
bez vismaz pt-BR tulkojuma (vai skaidri izsekota izņēmuma), un
esošs stils nevar nemanāmi zaudēt lokalizāciju. Lai pievienotu stilu, skatiet
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style).

### Rīku rezultātu saspiešana

`toolResultCompressor.ts` modulis nodrošina **5 specializētas saspiešanas stratēģijas**
rīku rezultātiem (funkciju izsaukumiem, aģentu izvadei, meklēšanas rezultātiem utt.):

1. **Meklēšanas rezultātu saspiešana** — noņem liekos rezultātus, saglabā N labākos
2. **Failu lasīšanas saspiešana** — apcērt lielus failus, saglabā galvenes/importus
3. **Koda izpildes saspiešana** — saglabā tikai būtisko stdout/stderr
4. **Datubāzes vaicājumu saspiešana** — ierobežo rindas, noņem izvērstos metadatus
5. **API atbilžu saspiešana** — izņem laukus ar null vērtību, saīsina masīvus

#### Kad izmantot

Rīku rezultātu saspiešana ir **vienmēr ieslēgta**, ja ir rīku izsaukumi. Nekāda
konfigurēšana nav nepieciešama.

### Secīgais konveijers

Secīgais režīms palaiž **vairākus dziņus pēc kārtas** — parasti vispirms RTK
(60–90% ietaupījums rīku izvadē), pēc tam Caveman (vēl 30% ietaupījums
atlikušajā tekstā). Tādējādi tiek sasniegts **78–95% kopējais ietaupījums**.

#### Kā tas darbojas

```
Ievade (1000 tokenu)
  → RTK (komandu kontekstu ņemošs filtrs) → 200 tokenu
    → Caveman (liekvārdības noņemšana) → 140 tokenu
  → Izvade (140 tokenu, 86% ietaupījums)
```

#### Kad izmantot

Izmantojiet secīgo režīmu:

- Darbplūsmām ar intensīvu rīku izmantošanu (aģentiskai programmēšanai, pētniecībai)
- Pret izmaksām jutīgai pakešapstrādei
- Ja nepieciešams maksimāli ietaupīt tokenus

Konfigurējiet, izmantojot kombinēto konfigurāciju:

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
