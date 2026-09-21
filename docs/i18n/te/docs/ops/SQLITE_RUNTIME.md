# SQLite Runtime Resolution (తెలుగు)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute ప్రారంభ సమయంలో 5-దశల ఫాల్బ్యాక్ శ్రేణి ద్వారా తన SQLite డ్రైవర్ను గుర్తిస్తుంది:

1. **బండిల్ చేయబడిన `better-sqlite3`** (`package.json`లోని `dependencies` ద్వారా)
   — అత్యంత వేగవంతమైనది, నేటివ్ బైనరీ; బిల్డ్ సాధనాలు అందుబాటులో ఉన్నప్పుడు `npm install` ద్వారా ఇన్స్టాల్ అవుతుంది.

2. **రన్టైమ్లో ఇన్స్టాల్ చేయబడిన `better-sqlite3`** (`~/.omniroute/runtime/`లో)
   — మొదటిసారి రన్ చేసినప్పుడు అవసరాన్ని బట్టి **లేదా** `scripts/build/postinstall.mjs → scripts/postinstall.mjs` ద్వారా ఇన్స్టాల్ చేయబడుతుంది.
   పాడైన లేదా తప్పు ప్లాట్ఫారమ్ బైనరీలు లోడ్ కాకుండా నిరోధించడానికి, లోడ్ చేసే ముందు
   నేటివ్ `.node` మ్యాజిక్ బైట్లను (ELF / Mach-O / PE) ధృవీకరిస్తుంది.

3. **`node:sqlite`** (Node ≥22.5 స్టాండర్డ్ లైబ్రరీ) — నేటివ్ బిల్డ్ అవసరం లేదు; రెండు
   better-sqlite3 మార్గాలు విఫలమైనప్పుడు ఉపయోగించబడుతుంది. పరిమిత ఫీచర్ సమితిని కలిగి ఉంటుంది.

4. **`sql.js`** (WASM) — చివరి ఫాల్బ్యాక్. ప్రతిచోటా పనిచేస్తుంది, కానీ నెమ్మదిగా ఉంటుంది
   మరియు డేటాను సమకాలికంగా కాకుండా నిర్దిష్ట వ్యవధుల్లో రాస్తుంది.

## ఇంత సంక్లిష్టత ఎందుకు?

- **Windows EBUSY**: మునుపటి వెర్షన్కు చెందిన `better_sqlite3.node`ను రన్ అవుతున్న ప్రాసెస్
  లాక్ చేసి ఉంటే, `npm install -g omniroute@latest` విఫలం కావచ్చు. `~/.omniroute/runtime/`లోని
  రన్టైమ్ ఇన్స్టాలేషన్ గ్లోబల్ npm కాష్ను పక్కదారి పట్టిస్తుంది.
- **బిల్డ్ సాధనాలు లేకపోవడం**: కొన్ని ఎన్విరాన్మెంట్లు (VS Build Tools లేని కార్పొరేట్ Windows,
  కనిష్ఠ Docker ఇమేజ్లు) `better-sqlite3`ను కంపైల్ చేయలేవు. రన్టైమ్ ఇన్స్టాలర్ npm రిజిస్ట్రీ
  నుండి ముందే బిల్డ్ చేసిన బైనరీని పొందుతుంది; అది విఫలమైనా OmniRoute ప్రారంభమయ్యేలా
  ఫాల్బ్యాక్ డ్రైవర్లు నిర్ధారిస్తాయి.
- **ఎయిర్-గ్యాప్డ్ సిస్టమ్లు**: npm రిజిస్ట్రీని చేరుకోలేకపోతే, `node:sqlite`
  లేదా `sql.js` ప్రాథమిక కార్యాచరణకు హామీ ఇస్తాయి.

## మ్యాజిక్-బైట్ ధృవీకరణ

రన్టైమ్లో ఇన్స్టాల్ చేసిన `.node` ఫైల్ను లోడ్ చేసే ముందు, OmniRoute మొదటి 8
బైట్లను చదివి, తెలిసిన ప్లాట్ఫారమ్ మ్యాజిక్లతో సరిపోలుస్తుంది:

| ప్లాట్ఫారమ్           | బైట్లు (hex)  | లేబుల్      |
| --------------------- | ------------- | ----------- |
| Linux                 | `7F 45 4C 46` | `elf`       |
| macOS 64-bit BE       | `FE ED FA CF` | `macho`     |
| macOS 64-bit LE       | `CF FA ED FE` | `macho-le`  |
| macOS fat (universal) | `CA FE BA BE` | `macho-fat` |
| Windows               | `4D 5A` (MZ)  | `pe`        |

మ్యాజిక్ సరిపోలకపోతే → ఫైల్ విస్మరించబడుతుంది, ఫాల్బ్యాక్ తదుపరి దశకు కొనసాగుతుంది.

## సక్రియ డ్రైవర్ను తనిఖీ చేయడం

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## మాన్యువల్ నియంత్రణ

```bash
# వేగవంతమైన CI ఇన్స్టాలేషన్ల కోసం postinstall వార్మ్-అప్ను దాటవేయండి
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# రన్టైమ్ better-sqlite3ను బలవంతంగా మళ్లీ ఇన్స్టాల్ చేయండి
rm -rf ~/.omniroute/runtime
omniroute  # తదుపరి ప్రారంభంలో మళ్లీ ఇన్స్టాల్ అవుతుంది

# ఏ డ్రైవర్ సక్రియంగా ఉందో తనిఖీ చేయండి
omniroute config db-info  # (CLI కమాండ్ అందుబాటులో ఉంటే)
```

## సూచన

అమలు:

- `bin/cli/runtime/magicBytes.mjs` — బైనరీ మ్యాజిక్-బైట్ ధృవీకరణ సహాయకాలు
- `bin/cli/runtime/sqliteRuntime.mjs` — 5-దశల రన్టైమ్ రిజాల్వర్ + అవసరాన్ని బట్టి పనిచేసే ఇన్స్టాలర్
- `bin/cli/runtime/index.mjs` — స్టార్టప్ ఆర్కెస్ట్రేటర్ (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — npm పోస్ట్-ఇన్స్టాల్ హుక్ (విఫలమైనా ప్రాణాంతకం కాని వార్మ్-అప్)
- `src/lib/db/core.ts` — `ensureDbInitialized()` / `getDriverInfo()` ఎక్స్పోర్ట్లు

## సింగిల్-రైటర్ టోపాలజీ (HAకు మద్దతు లేదు)

పైన ఉన్న డ్రైవర్ ఫాల్బ్యాక్ శ్రేణి ఇప్పటికీ **ఒక ప్రాసెస్**లోనే రన్ అవుతుంది. డిఫాల్ట్ SQLite
OmniRoute ఒక **సింగిల్ రైటర్**:

- ఒకే `storage.sqlite` ఫైల్కు రెండు OmniRoute రెప్లికాలను అనుసంధానించవద్దు.
- కంటైనర్ రీస్టార్ట్, Recreate డిప్లాయ్, OOM kill లేదా HEALTHCHECK రీస్టార్ట్ వల్ల
  ప్రాసెస్లో ఉన్న ప్రతి SSE సెషన్ నిలిచిపోతుంది. ప్రామాణిక మార్గంలో సెషన్ డ్రెయిన్ లేదు.
- నెమ్మదిగా స్పందించే `/healthz`ను పనిచేయనిదిగా పరిగణించే ఆర్కెస్ట్రేటర్ లైవ్నెస్, ఉన్న ఏకైక
  రెప్లికాను నిలిపివేస్తుంది. TCP లైవ్నెస్ + HTTP `/healthz` రెడీనెస్కు ప్రాధాన్యం ఇవ్వండి. వీటిని చూడండి:
  [Docker గైడ్ — లభ్యత](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  మరియు [Kubernetes ప్రోబ్ సిఫార్సులు](./MONITORING_GUIDE.md#kubernetes-probe-recommendations).
