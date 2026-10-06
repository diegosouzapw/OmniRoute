# SQLite Runtime Resolution (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇧🇦 [bs](../../../bs/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇯🇵 [ja](../../../ja/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute स्टार्टअपच्या वेळी 5-चरणांच्या फॉलबॅक साखळीद्वारे त्याचा SQLite ड्रायव्हर निर्धारित करते:

1. **बंडल केलेले `better-sqlite3`** (`package.json` मधील `dependencies` द्वारे)
   — सर्वांत जलद, नेटिव्ह बायनरी, बिल्ड साधने उपलब्ध असताना `npm install` द्वारे स्थापित केले जाते.

2. **रनटाइममध्ये स्थापित केलेले `better-sqlite3`** (`~/.omniroute/runtime/` मध्ये)
   — पहिल्यांदा चालवताना गरजेनुसार **किंवा** `scripts/build/postinstall.mjs → scripts/postinstall.mjs` द्वारे स्थापित केले जाते.
   दूषित किंवा चुकीच्या प्लॅटफॉर्मसाठी असलेल्या बायनरींपासून संरक्षण करण्यासाठी, लोड करण्यापूर्वी नेटिव्ह `.node` मॅजिक बाइट्सची (ELF / Mach-O / PE) पडताळणी करते.

3. **`node:sqlite`** (Node ≥22.5 stdlib) — नेटिव्ह बिल्डची आवश्यकता नाही; दोन्ही better-sqlite3 मार्ग अयशस्वी झाल्यास वापरले जाते. मर्यादित वैशिष्ट्य-संच.

4. **`sql.js`** (WASM) — अंतिम फॉलबॅक. सर्वत्र कार्य करते, परंतु अधिक धीमे आहे
   आणि डेटा समकालिकपणे लिहिण्याऐवजी ठरावीक अंतराने लिहिते.

## ही गुंतागुंत का?

- **Windows EBUSY**: मागील आवृत्तीचे `better_sqlite3.node` एखाद्या चालू प्रक्रियेमुळे लॉक झाले असल्यास `npm install -g omniroute@latest` अयशस्वी होऊ शकते. `~/.omniroute/runtime/` मधील रनटाइम स्थापना ग्लोबल npm कॅशला बगल देते.
- **बिल्ड साधने नाहीत**: काही वातावरणे (VS Build Tools नसलेले कॉर्पोरेट Windows, किमान घटक असलेल्या Docker इमेजेस) `better-sqlite3` संकलित करू शकत नाहीत. रनटाइम इंस्टॉलर npm रजिस्ट्रीमधून आधीच बिल्ड केलेली बायनरी मिळवतो; ते अयशस्वी झाले तरी फॉलबॅक ड्रायव्हर्समुळे OmniRoute सुरू होण्याची खात्री होते.
- **एअर-गॅप्ड प्रणाली**: npm रजिस्ट्रीपर्यंत पोहोचता येत नसल्यास, `node:sqlite`
  किंवा `sql.js` मूलभूत कार्यक्षमता सुनिश्चित करतात.

## मॅजिक-बाइट पडताळणी

रनटाइममध्ये स्थापित केलेली `.node` फाइल लोड करण्यापूर्वी, OmniRoute पहिले 8
बाइट्स वाचते आणि ज्ञात प्लॅटफॉर्म मॅजिकशी त्यांची जुळवणी करते:

| प्लॅटफॉर्म            | बाइट्स (hex)  | लेबल        |
| --------------------- | ------------- | ----------- |
| Linux                 | `7F 45 4C 46` | `elf`       |
| macOS 64-bit BE       | `FE ED FA CF` | `macho`     |
| macOS 64-bit LE       | `CF FA ED FE` | `macho-le`  |
| macOS fat (universal) | `CA FE BA BE` | `macho-fat` |
| Windows               | `4D 5A` (MZ)  | `pe`        |

मॅजिक जुळले नाही → फाइल दुर्लक्षित केली जाते आणि फॉलबॅक पुढील चरणाकडे सुरू राहतो.

## सक्रिय ड्रायव्हर तपासणे

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## मॅन्युअल नियंत्रण

```bash
# जलद CI स्थापनांसाठी postinstall वॉर्म-अप वगळा
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# रनटाइम better-sqlite3 सक्तीने पुन्हा स्थापित करा
rm -rf ~/.omniroute/runtime
omniroute  # पुढील प्रारंभाच्या वेळी पुन्हा स्थापित होईल

# कोणता ड्रायव्हर सक्रिय आहे ते तपासा
omniroute config db-info  # (CLI कमांड अस्तित्वात असल्यास)
```

## संदर्भ

अंमलबजावणी:

- `bin/cli/runtime/magicBytes.mjs` — बायनरी मॅजिक-बाइट पडताळणीसाठी सहाय्यक
- `bin/cli/runtime/sqliteRuntime.mjs` — 5-चरणांचा रनटाइम रिझॉल्वर + गरजेनुसार इंस्टॉलर
- `bin/cli/runtime/index.mjs` — स्टार्टअप ऑर्केस्ट्रेटर (`warmUpRuntimes()`)
- `scripts/postinstall.mjs` — npm पोस्ट-इंस्टॉल हुक (अपयश झाल्यास प्रक्रिया थांबवत नसलेला वॉर्म-अप)
- `src/lib/db/core.ts` — `ensureDbInitialized()` / `getDriverInfo()` एक्सपोर्ट्स

## एकल-रायटर टोपोलॉजी (HA असमर्थित)

वरील ड्रायव्हर फॉलबॅक साखळी तरीही **एका प्रक्रियेत** चालते. डीफॉल्ट SQLite
OmniRoute हे **एकल रायटर** आहे:

- एकाच `storage.sqlite` फाइलला दोन OmniRoute प्रतिकृती जोडू नका.
- कंटेनर रीस्टार्ट, Recreate डिप्लॉय, OOM kill किंवा HEALTHCHECK रीस्टार्टमुळे
  प्रगतीपथावरील प्रत्येक SSE सत्र खंडित होते. मानक मार्गावर सत्रे पूर्ण होण्याची प्रतीक्षा केली जात नाही.
- धीम्या `/healthz` ला निष्क्रिय मानणारी ऑर्केस्ट्रेटर लाइव्हनेस तपासणी एकमेव
  प्रतिकृती बंद करेल. TCP लाइव्हनेस + HTTP `/healthz` रेडीनेसला प्राधान्य द्या. पहा:
  [Docker मार्गदर्शक — उपलब्धता](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  आणि [Kubernetes प्रोब शिफारसी](./MONITORING_GUIDE.md#kubernetes-probe-recommendations).
