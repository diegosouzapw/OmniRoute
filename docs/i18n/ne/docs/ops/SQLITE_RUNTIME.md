# SQLite Runtime Resolution (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇧🇦 [bs](../../../bs/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute ले सुरु हुँदा 5-चरणको फलब्याक शृङ्खलामार्फत आफ्नो SQLite ड्राइभर निर्धारण गर्छ:

1. **बन्डल गरिएको `better-sqlite3`** (`package.json` मा `dependencies` मार्फत)
   — सबैभन्दा छिटो, नेटिभ बाइनरी, बिल्ड उपकरणहरू उपलब्ध हुँदा `npm install` द्वारा स्थापना गरिन्छ।

2. **रनटाइममा स्थापना गरिएको `better-sqlite3`** (`~/.omniroute/runtime/` मा)
   — पहिलो पटक चलाउँदा आवश्यकताअनुसार **वा** `scripts/build/postinstall.mjs → scripts/postinstall.mjs` द्वारा स्थापना गरिन्छ।
   लोड गर्नुअघि नेटिभ `.node` म्याजिक बाइटहरू (ELF / Mach-O / PE) प्रमाणित गर्छ,
   जसले बिग्रिएका वा गलत प्लेटफर्मका बाइनरीहरूबाट सुरक्षा दिन्छ।

3. **`node:sqlite`** (Node ≥22.5 stdlib) — नेटिभ बिल्ड आवश्यक पर्दैन; दुवै
   better-sqlite3 मार्ग असफल हुँदा प्रयोग गरिन्छ। सीमित सुविधा सेट।

4. **`sql.js`** (WASM) — अन्तिम फलब्याक। सबै ठाउँमा काम गर्छ तर सुस्त हुन्छ
   र डेटा समकालिक रूपमा नभई निश्चित अन्तरालमा लेख्छ।

## यो जटिलता किन?

- **Windows EBUSY**: यदि अघिल्लो संस्करणको `better_sqlite3.node` चलिरहेको
  प्रक्रियाले लक गरेको छ भने `npm install -g omniroute@latest` असफल हुन सक्छ। `~/.omniroute/runtime/`
  मा गरिएको रनटाइम स्थापनाले ग्लोबल npm क्यासलाई पन्छाउँछ।
- **बिल्ड उपकरणहरू छैनन्**: केही वातावरणहरू (VS Build Tools नभएको कर्पोरेट Windows,
  न्यूनतम Docker इमेजहरू) ले `better-sqlite3` कम्पाइल गर्न सक्दैनन्। रनटाइम
  इन्स्टलरले npm रजिस्ट्रीबाट पूर्वनिर्मित बाइनरी प्राप्त गर्छ; त्यो असफल भए पनि
  फलब्याक ड्राइभरहरूले OmniRoute सुरु हुने सुनिश्चित गर्छन्।
- **एयर-ग्याप्ड प्रणालीहरू**: npm रजिस्ट्री पहुँचयोग्य नभएमा `node:sqlite`
  वा `sql.js` ले आधारभूत कार्यक्षमता सुनिश्चित गर्छन्।

## म्याजिक-बाइट प्रमाणीकरण

रनटाइममा स्थापना गरिएको `.node` फाइल लोड गर्नुअघि OmniRoute ले पहिलो 8
बाइट पढ्छ र तिनलाई ज्ञात प्लेटफर्म म्याजिकहरूसँग मिलाउँछ:

| प्लेटफर्म             | बाइटहरू (hex) | लेबल        |
| --------------------- | ------------- | ----------- |
| Linux                 | `7F 45 4C 46` | `elf`       |
| macOS 64-bit BE       | `FE ED FA CF` | `macho`     |
| macOS 64-bit LE       | `CF FA ED FE` | `macho-le`  |
| macOS fat (universal) | `CA FE BA BE` | `macho-fat` |
| Windows               | `4D 5A` (MZ)  | `pe`        |

म्याजिक नमिलेमा → फाइल बेवास्ता गरिन्छ र फलब्याक अर्को चरणमा जारी रहन्छ।

## सक्रिय ड्राइभर जाँच गर्ने

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## म्यानुअल नियन्त्रण

```bash
# द्रुत CI स्थापनाका लागि postinstall वार्म-अप छोड्नुहोस्
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# रनटाइम better-sqlite3 लाई जबर्जस्ती पुनः स्थापना गर्नुहोस्
rm -rf ~/.omniroute/runtime
omniroute  # अर्को पटक सुरु हुँदा पुनः स्थापना हुनेछ

# कुन ड्राइभर सक्रिय छ जाँच गर्नुहोस्
omniroute config db-info  # (CLI कमान्ड उपलब्ध भएमा)
```

## सन्दर्भ

कार्यान्वयन:

- `bin/cli/runtime/magicBytes.mjs` — बाइनरी म्याजिक-बाइट प्रमाणीकरण सहायकहरू
- `bin/cli/runtime/sqliteRuntime.mjs` — 5-चरणको रनटाइम रिजल्भर + आवश्यकताअनुसार इन्स्टलर
- `bin/cli/runtime/index.mjs` — स्टार्टअप संयोजक (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — npm पोस्ट-इन्स्टल हुक (असफल भए पनि घातक नहुने वार्म-अप)
- `src/lib/db/core.ts` — `ensureDbInitialized()` / `getDriverInfo()` एक्सपोर्टहरू

## एकल-राइटर टोपोलोजी (HA असमर्थित)

माथिको ड्राइभर फलब्याक शृङ्खला अझै पनि **एउटै प्रक्रियामा** चल्छ। पूर्वनिर्धारित SQLite
OmniRoute **एकल राइटर** हो:

- एउटै `storage.sqlite` फाइलमा दुईवटा OmniRoute रेप्लिका नजोड्नुहोस्।
- कन्टेनर पुनः सुरु, Recreate डिप्लोय, OOM kill, वा HEALTHCHECK पुनः सुरु हुँदा
  प्रगतिमा रहेका सबै SSE सेसनहरू समाप्त हुन्छन्। स्टक मार्गमा सेसन ड्रेन छैन।
- ढिलो `/healthz` लाई मृत ठान्ने अर्केस्ट्रेटर लाइभनेसले एक मात्र
  रेप्लिकालाई समाप्त गर्नेछ। TCP लाइभनेस + HTTP `/healthz` रेडिनेसलाई प्राथमिकता दिनुहोस्। हेर्नुहोस्
  [Docker मार्गदर्शिका — उपलब्धता](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  र [Kubernetes प्रोब सिफारिसहरू](./MONITORING_GUIDE.md#kubernetes-probe-recommendations)।
