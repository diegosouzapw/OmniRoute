# SQLite Runtime Resolution (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇧🇦 [bs](../../../bs/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute स्टार्टअप के समय 5-चरणीय फ़ॉलबैक शृंखला के माध्यम से अपने SQLite ड्राइवर को निर्धारित करता है:

1. **बंडल किया गया `better-sqlite3`** (`package.json` में `dependencies` के माध्यम से)
   — सबसे तेज़, नेटिव बाइनरी, बिल्ड टूल उपलब्ध होने पर `npm install` द्वारा इंस्टॉल किया जाता है।

2. **रनटाइम पर इंस्टॉल किया गया `better-sqlite3`** (`~/.omniroute/runtime/` में)
   — पहली बार चलाने पर आवश्यकता के अनुसार **या** `scripts/build/postinstall.mjs → scripts/postinstall.mjs` द्वारा इंस्टॉल किया जाता है।
   दूषित या गलत प्लेटफ़ॉर्म की बाइनरी से बचाव के लिए, लोड करने से पहले
   नेटिव `.node` मैजिक बाइट्स (ELF / Mach-O / PE) को सत्यापित करता है।

3. **`node:sqlite`** (Node ≥22.5 stdlib) — नेटिव बिल्ड की आवश्यकता नहीं; इसका उपयोग तब किया जाता है जब
   better-sqlite3 के दोनों पथ विफल हो जाते हैं। सुविधाओं का सीमित सेट।

4. **`sql.js`** (WASM) — अंतिम फ़ॉलबैक। हर जगह काम करता है, लेकिन धीमा है
   और डेटा को समकालिक रूप से लिखने के बजाय एक अंतराल पर लिखता है।

## यह जटिलता क्यों है?

- **Windows EBUSY**: यदि पिछले संस्करण की `better_sqlite3.node` फ़ाइल किसी चल रही प्रक्रिया द्वारा
  लॉक की गई है, तो `npm install -g omniroute@latest` विफल हो सकता है। `~/.omniroute/runtime/`
  में रनटाइम इंस्टॉलेशन ग्लोबल npm कैश से बचकर निकलता है।
- **बिल्ड टूल उपलब्ध नहीं**: कुछ परिवेश (`VS Build Tools` के बिना कॉर्पोरेट Windows,
  न्यूनतम Docker इमेज) `better-sqlite3` को कंपाइल नहीं कर सकते। रनटाइम
  इंस्टॉलर npm रजिस्ट्री से पहले से बिल्ड की गई बाइनरी प्राप्त करता है; फ़ॉलबैक
  ड्राइवर सुनिश्चित करते हैं कि इसके विफल होने पर भी OmniRoute प्रारंभ हो सके।
- **एयर-गैप्ड सिस्टम**: यदि npm रजिस्ट्री तक नहीं पहुँचा जा सकता, तो `node:sqlite`
  या `sql.js` आधारभूत कार्यक्षमता सुनिश्चित करते हैं।

## मैजिक-बाइट सत्यापन

रनटाइम पर इंस्टॉल की गई `.node` फ़ाइल को लोड करने से पहले, OmniRoute शुरुआती 8
बाइट्स पढ़ता है और ज्ञात प्लेटफ़ॉर्म मैजिक से उनका मिलान करता है:

| प्लेटफ़ॉर्म            | बाइट्स (हेक्स) | लेबल        |
| ---------------------- | -------------- | ----------- |
| Linux                  | `7F 45 4C 46`  | `elf`       |
| macOS 64-बिट BE        | `FE ED FA CF`  | `macho`     |
| macOS 64-बिट LE        | `CF FA ED FE`  | `macho-le`  |
| macOS फ़ैट (यूनिवर्सल) | `CA FE BA BE`  | `macho-fat` |
| Windows                | `4D 5A` (MZ)   | `pe`        |

मैजिक मेल न खाने पर → फ़ाइल को अनदेखा कर दिया जाता है और फ़ॉलबैक अगले चरण पर जारी रहता है।

## सक्रिय ड्राइवर की जाँच करना

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { स्रोत: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   प्रकार: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## मैन्युअल नियंत्रण

```bash
# तेज़ CI इंस्टॉलेशन के लिए postinstall वार्म-अप छोड़ें
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# रनटाइम better-sqlite3 को बलपूर्वक पुनः इंस्टॉल करें
rm -rf ~/.omniroute/runtime
omniroute  # अगले स्टार्ट पर पुनः इंस्टॉल होगा

# जाँचें कि कौन-सा ड्राइवर सक्रिय है
omniroute config db-info  # (यदि CLI कमांड मौजूद है)
```

## संदर्भ

कार्यान्वयन:

- `bin/cli/runtime/magicBytes.mjs` — बाइनरी मैजिक-बाइट सत्यापन सहायक
- `bin/cli/runtime/sqliteRuntime.mjs` — 5-चरणीय रनटाइम रिज़ॉल्वर + आवश्यकतानुसार इंस्टॉलर
- `bin/cli/runtime/index.mjs` — स्टार्टअप ऑर्केस्ट्रेटर (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — npm पोस्ट-इंस्टॉल हुक (गैर-घातक वार्म-अप)
- `src/lib/db/core.ts` — `ensureDbInitialized()` / `getDriverInfo()` एक्सपोर्ट

## एकल-राइटर टोपोलॉजी (HA असमर्थित)

ऊपर दी गई ड्राइवर फ़ॉलबैक शृंखला अब भी **एक प्रक्रिया** में चलती है। डिफ़ॉल्ट SQLite
के साथ OmniRoute एक **एकल राइटर** है:

- दो OmniRoute रेप्लिका को एक ही `storage.sqlite` फ़ाइल से न जोड़ें।
- कंटेनर रीस्टार्ट, Recreate डिप्लॉय, OOM किल या HEALTHCHECK रीस्टार्ट से
  प्रत्येक चालू SSE सत्र समाप्त हो जाता है। मानक पथ पर कोई सत्र ड्रेन नहीं होता।
- धीमे `/healthz` को निष्क्रिय मानने वाली ऑर्केस्ट्रेटर लाइवनेस एकमात्र
  रेप्लिका को समाप्त कर देगी। TCP लाइवनेस + HTTP `/healthz` रेडीनेस को प्राथमिकता दें। देखें
  [Docker गाइड — उपलब्धता](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  और [Kubernetes प्रोब अनुशंसाएँ](./MONITORING_GUIDE.md#kubernetes-probe-recommendations)।
