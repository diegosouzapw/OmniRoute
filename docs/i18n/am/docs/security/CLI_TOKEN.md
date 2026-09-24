# CLI Machine-ID Token (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CLI_TOKEN.md) · 🇸🇦 [ar](../../../ar/docs/security/CLI_TOKEN.md) · 🇦🇿 [az](../../../az/docs/security/CLI_TOKEN.md) · 🇧🇬 [bg](../../../bg/docs/security/CLI_TOKEN.md) · 🇧🇩 [bn](../../../bn/docs/security/CLI_TOKEN.md) · 🇧🇦 [bs](../../../bs/docs/security/CLI_TOKEN.md) · 🇨🇿 [cs](../../../cs/docs/security/CLI_TOKEN.md) · 🇩🇰 [da](../../../da/docs/security/CLI_TOKEN.md) · 🇩🇪 [de](../../../de/docs/security/CLI_TOKEN.md) · 🇬🇷 [el](../../../el/docs/security/CLI_TOKEN.md) · 🇪🇸 [es](../../../es/docs/security/CLI_TOKEN.md) · 🇪🇪 [et](../../../et/docs/security/CLI_TOKEN.md) · 🇮🇷 [fa](../../../fa/docs/security/CLI_TOKEN.md) · 🇫🇮 [fi](../../../fi/docs/security/CLI_TOKEN.md) · 🇫🇷 [fr](../../../fr/docs/security/CLI_TOKEN.md) · 🇮🇪 [ga](../../../ga/docs/security/CLI_TOKEN.md) · 🇮🇳 [gu](../../../gu/docs/security/CLI_TOKEN.md) · 🇳🇬 [ha](../../../ha/docs/security/CLI_TOKEN.md) · 🇮🇱 [he](../../../he/docs/security/CLI_TOKEN.md) · 🇮🇳 [hi](../../../hi/docs/security/CLI_TOKEN.md) · 🇭🇷 [hr](../../../hr/docs/security/CLI_TOKEN.md) · 🇭🇺 [hu](../../../hu/docs/security/CLI_TOKEN.md) · 🇦🇲 [hy](../../../hy/docs/security/CLI_TOKEN.md) · 🇮🇩 [id](../../../id/docs/security/CLI_TOKEN.md) · 🇳🇬 [ig](../../../ig/docs/security/CLI_TOKEN.md) · 🇮🇹 [it](../../../it/docs/security/CLI_TOKEN.md) · 🇯🇵 [ja](../../../ja/docs/security/CLI_TOKEN.md) · 🇬🇪 [ka](../../../ka/docs/security/CLI_TOKEN.md) · 🇰🇭 [km](../../../km/docs/security/CLI_TOKEN.md) · 🇮🇳 [kn](../../../kn/docs/security/CLI_TOKEN.md) · 🇰🇷 [ko](../../../ko/docs/security/CLI_TOKEN.md) · 🇱🇹 [lt](../../../lt/docs/security/CLI_TOKEN.md) · 🇱🇻 [lv](../../../lv/docs/security/CLI_TOKEN.md) · 🇮🇳 [ml](../../../ml/docs/security/CLI_TOKEN.md) · 🇮🇳 [mr](../../../mr/docs/security/CLI_TOKEN.md) · 🇲🇾 [ms](../../../ms/docs/security/CLI_TOKEN.md) · 🇲🇹 [mt](../../../mt/docs/security/CLI_TOKEN.md) · 🇲🇲 [my](../../../my/docs/security/CLI_TOKEN.md) · 🇳🇵 [ne](../../../ne/docs/security/CLI_TOKEN.md) · 🇳🇱 [nl](../../../nl/docs/security/CLI_TOKEN.md) · 🇳🇴 [no](../../../no/docs/security/CLI_TOKEN.md) · 🇮🇳 [or](../../../or/docs/security/CLI_TOKEN.md) · 🇮🇳 [pa](../../../pa/docs/security/CLI_TOKEN.md) · 🇵🇭 [phi](../../../phi/docs/security/CLI_TOKEN.md) · 🇵🇱 [pl](../../../pl/docs/security/CLI_TOKEN.md) · 🇵🇹 [pt](../../../pt/docs/security/CLI_TOKEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CLI_TOKEN.md) · 🇷🇴 [ro](../../../ro/docs/security/CLI_TOKEN.md) · 🇷🇺 [ru](../../../ru/docs/security/CLI_TOKEN.md) · 🇱🇰 [si](../../../si/docs/security/CLI_TOKEN.md) · 🇸🇰 [sk](../../../sk/docs/security/CLI_TOKEN.md) · 🇸🇮 [sl](../../../sl/docs/security/CLI_TOKEN.md) · 🇷🇸 [sr](../../../sr/docs/security/CLI_TOKEN.md) · 🇸🇪 [sv](../../../sv/docs/security/CLI_TOKEN.md) · 🇰🇪 [sw](../../../sw/docs/security/CLI_TOKEN.md) · 🇮🇳 [ta](../../../ta/docs/security/CLI_TOKEN.md) · 🇮🇳 [te](../../../te/docs/security/CLI_TOKEN.md) · 🇹🇭 [th](../../../th/docs/security/CLI_TOKEN.md) · 🇹🇷 [tr](../../../tr/docs/security/CLI_TOKEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CLI_TOKEN.md) · 🇵🇰 [ur](../../../ur/docs/security/CLI_TOKEN.md) · 🇺🇿 [uz](../../../uz/docs/security/CLI_TOKEN.md) · 🇻🇳 [vi](../../../vi/docs/security/CLI_TOKEN.md) · 🇳🇬 [yo](../../../yo/docs/security/CLI_TOKEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CLI_TOKEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CLI_TOKEN.md)

---

## አጠቃላይ እይታ

የOmniRoute CLI ትዕዛዞች በ`x-omniroute-cli-token` የጥያቄ ራስጌ በኩል የሚላክን
`HMAC-SHA256(machine-id, salt)` ቶከን በመጠቀም ከአካባቢያዊው የአስተዳደር API ጋር
ማንነታቸውን ያረጋግጣሉ።

ይህ CLI ንዑስ ትዕዛዞች (`omniroute status`፣ `omniroute providers`፣ ወዘተ)
ተጠቃሚው በእያንዳንዱ ጥሪ JWT ወይም የይለፍ ቃል እንዲያቀርብ ሳያስፈልግ
የአስተዳደር መገናኛዎችን እንዲጠሩ ያስችላል።

## እንዴት እንደሚሠራ

1. `getMachineTokenSync()` በ`node-machine-id` በኩል የሃርድዌር ማሽን መታወቂያውን
   ያነባል (ካልተሳካ ወደ ባዶ ሕብረቁምፊ ይመለሳል፣ ይህም የCLI ማንነት ማረጋገጫን ያሰናክላል)።
2. `HMAC-SHA256(machine_id, salt)` ያሰላል እና ሙሉውን ባለ64-ቁምፊ
   የሄክስ ዲጄስት ይመልሳል — ከዚህ ማሽን ጋር የተያያዘ የማይለዋወጥ እና የማይቀለበስ ቶከን።
3. CLI ቶከኑን እንደ `x-omniroute-cli-token` የሚልከው የተወሰነው
   መድረሻ ግልጽ የloopback URL (`localhost`፣ `127.0.0.0/8`፣ ወይም
   loopback IPv6) ሲሆን ብቻ ነው። ቶከኑን የያዙ ጥያቄዎች `redirect: error` ይጠቀማሉ፤ ስለዚህ አካባቢያዊ
   አቅጣጫ ለውጥ ቶከኑን ወደ ሌላ መነሻ ማስተላለፍ አይችልም። የርቀት አውዶች በምትኩ ወሰን የተደረገላቸውን
   የመዳረሻ ቶከኖች ይጠቀማሉ። ማመንጨት የማይቻል ከሆነ CLI ራስጌውን አያካትትም፣
   እና `omniroute doctor` ባዶ ቶከንን ትክክለኛ እንደሆነ ከመቁጠር ይልቅ ውድቀቱን ሪፖርት ያደርጋል።
4. አገልጋዩ (`src/server/authz/policies/management.ts`) በተመሳሳይ salt የሚጠበቀውን
   ቶከን እንደገና ያሰላል እና በጊዜ ልዩነት ላይ የተመሠረተ ማውጣትን
   ለመከላከል `timingSafeEqual` በመጠቀም ያነጻጽራል።

## የደኅንነት ባህሪያት

| ባህሪ                               | ዝርዝር                                                                                                                                                    |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Loopback ብቻ**                   | ተቀባይነት የሚኖረው የአገልጋዩ የታመነ የpeer-locality ምልክት (ከእውነተኛው TCP peer አድራሻ የሚመነጭ) loopback መሆኑን ሲያመለክት ብቻ ነው። በደንበኛው የሚቆጣጠረው `Host` ራስጌ ለአካባቢያዊነት በፍጹም አይታመንም። |
| **ቋሚ-ጊዜ ንጽጽር**                    | `crypto.timingSafeEqual` የጊዜ ልዩነት ጥቃቶችን ይከላከላል።                                                                                                         |
| **የማይቀለበስ**                       | ከHMAC ውጤት የማሽን መታወቂያውን መልሶ ማግኘት አይቻልም።                                                                                                                  |
| **በ`always` የተጠበቀን የማለፊያ ዘዴ የለም** | `isAlwaysProtectedPath()` ከCLI ቶከን ፍተሻው በፊት ይገመገማል። `/api/shutdown` እና `/api/settings/database` ሁልጊዜ JWT ይፈልጋሉ።                                         |
| **ወደ ውጭ የማይላክ**                   | ቶከኑ በፍጹም ወደ ዲስክ አይጻፍም ወይም በምዝግብ ውስጥ አይመዘገብም።                                                                                                            |

## ነባሪ salt (በእያንዳንዱ ጭነት በዘፈቀደ)

`OMNIROUTE_CLI_SALT` ካልተዋቀረ፣ salt አንድ ጊዜ የሚመነጭ በዘፈቀደ ባለ64-ቁምፊ የሄክስ ሕብረቁምፊ
ሲሆን በ`<DATA_DIR>/cli-token-salt.json` (ሁነታ `0600`) ላይ በቋሚነት ይቀመጣል —
በማከማቻው ውስጥ የተካተተው ቀጥተኛ እሴት `omniroute-cli-auth-v1` አይደለም። በ
`src/lib/machineToken.ts` ውስጥ ያለው `getActiveSalt()` እና በ`bin/cli/utils/cliToken.mjs` ውስጥ ያለው ተመሳሳይ ቅጂ
አንድ ዓይነት ፋይል ያነባሉ፤ ስለዚህ አገልጋዩ እና በዚህ ጭነት ላይ ያለ እያንዳንዱ የCLI ጥሪ
ወደ አንድ እሴት ይደርሳሉ። በማከማቻው ውስጥ የተካተተው ቀጥተኛ እሴት የሚጠቀመው
በቋሚነት የተቀመጠ ወይም የenv salt ገና ማዘጋጀት በማይቻልበት ጊዜ እንደ የመጨረሻ አማራጭ ብቻ ነው
(ለምሳሌ፣ አገልጋዩ ከመጀመሪያውም ከመሥራቱ በፊት የተደረገ አዲስ CLI-ብቻ ጭነት)።
ይህ የቀድሞውን ቋሚ ቀጥተኛ ነባሪ ድክመት ይዘጋል፦ `/etc/machine-id` በተለምዶ
ለሁሉም የሚነበብ ስለሆነ፣ ያለበለዚያ ማንኛውም የአካባቢ ተጠቃሚ
`OMNIROUTE_CLI_SALT` ባላዋቀረ እያንዳንዱ ጭነት ላይ ተመሳሳዩን ቶከን ማመንጨት ይችላል።

## ሳልት ማዞር

የተዋቀረውን ቶከን ያለ ኮድ ለውጥ ለማዞር `OMNIROUTE_CLI_SALT`ን ያዘጋጁ — ይህ
ሁልጊዜ በእያንዳንዱ ጭነት ከተከማቸው ሳልት የበለጠ ቅድሚያ ያገኛል። ከማዞሩ በኋላ በዚህ ማሽን
ላይ ያሉ ሁሉም የCLI ሂደቶች አዲሱን ቶከን በራስ-ሰር ይጠቀማሉ። ቀዳሚውን የተዋቀረ እሴት
አጋልጦ ሊሆን ከሚችል የሂደት ዝርዝር መረጃ ፍሰት በኋላ ጠቃሚ ነው።

```bash
# ቋሚ ማዞር (ወደ shell መገለጫ ያክሉ)
export OMNIROUTE_CLI_SALT="my-secret-salt-2026"

# አዲሱ ቶከን ጥቅም ላይ መዋሉን ያረጋግጡ
omniroute status
```

## የቀድሞ ቅርጸት (SHA-256፣ 32-ቁምፊ) — አሁንም ተቀባይነት አለው

ከላይ ካለው የHMAC ቅርጸት በፊት፣ CLI ቶከኑን
በ`bin/cli/utils/cliToken.mjs` ውስጥ እንደ `SHA-256(machineId + salt).hex[0..32]`
(ባለ 32-ቁምፊ ቅድመ ቅጥያ) ያዋቅር ነበር (`getLegacyCliTokenSync` በ
`src/lib/machineToken.ts` ውስጥ)።

ከቀድሞ ስሪቶች ጋር ለመጣጣም ሰርቨሩ **ሁለቱንም** ቅርጸቶች ይቀበላል፦ አረጋጋጩ
`expectedTokens = [getMachineTokenSync(), getLegacyCliTokenSync()]`ን ይገነባል እና የገባውን
ርዕስ ከእያንዳንዳቸው ጋር `timingSafeEqual`ን በመጠቀም ያነጻጽራል
(`src/server/authz/policies/management.ts` እና `src/lib/middleware/cliTokenAuth.ts`)።
ስለዚህ አንድ ቶከን ከ64-ቁምፊው የHMAC ዲጀስት **ወይም** ከ32-ቁምፊው
የቀድሞ SHA-256 ቅድመ ቅጥያ ከአንዳቸው ጋር ከተዛመደ ትክክለኛ ነው።

**ላለመጠቀም፦** የCLI ቶከን ስልቱን ሙሉ በሙሉ ለማሰናከል
`OMNIROUTE_DISABLE_CLI_TOKEN=true`ን (በenv ወይም `.env`) ያዘጋጁ፤ ከዚያ በኋላ ሁሉም
መዳረሻ ግልጽ የAPI ቁልፍ ይፈልጋል። በብዙ ተጠቃሚ አስተናጋጆች ላይ `machine-id`
ለእያንዳንዱ መሣሪያ (ለእያንዳንዱ ተጠቃሚ ሳይሆን) የተለየ ስለሆነ እና በዚያው
አስተናጋጅ ላይ ያለ ሌላ ተጠቃሚ ተመሳሳዩን ቶከን ሊያሰላ ስለሚችል ይህ ይመከራል።

## ፋይሎች

| ፋይል                                       | ዓላማ                                       |
| ----------------------------------------- | ----------------------------------------- |
| `src/lib/machineToken.ts`                 | የቶከን ማዋቀር (`getMachineTokenSync`)         |
| `bin/cli/utils/cliToken.mjs`              | የዚያው ማዋቀር የCLI-ወገን ቅጂ                     |
| `<DATA_DIR>/cli-token-salt.json`          | የተከማቸ የዘፈቀደ በየጭነቱ ሳልት                     |
| `src/server/authz/headers.ts`             | `CLI_TOKEN_HEADER` ቋሚ እሴት                 |
| `src/server/authz/policies/management.ts` | የሰርቨር-ወገን ማረጋገጥ                           |
| `src/server/authz/routeGuard.ts`          | የloopback አስተናጋጅ ማረጋገጫ (`isLoopbackHost`) |

## እንዲሁም ይመልከቱ

- `docs/security/ROUTE_GUARD_TIERS.md` — የመስመር ጥበቃ ደረጃዎች
- `docs/architecture/AUTHZ_GUIDE.md` — ሙሉ የፈቃድ አሰጣጥ ሂደት
