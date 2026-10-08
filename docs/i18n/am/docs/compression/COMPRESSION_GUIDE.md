# 🗜️ Prompt Compression Guide — OmniRoute (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> ብቁ በሆነ ኮንቴክስት ላይ 15-95% በራስ-ሰር ይቆጥቡ። ለፈጣን አጠቃላይ እይታ፣ [README Compression ክፍልን](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically) ይመልከቱ።

## አጠቃላይ እይታ

OmniRoute ጥያቄዎች ወደ ውጫዊ አቅራቢዎች ከመድረሳቸው **በፊት** በቅድሚያ የሚሠራ ሞዱላር የፕሮምፕት ማመቂያ ፓይፕላይን ይተገብራል። ይህ ማለት የቶክን ቁጠባዎ በማይታይ ሁኔታ ይከናወናል — በየሥራ ፍሰትዎ ላይ ምንም ለውጥ አያስፈልግም።

```
የደንበኛ ጥያቄ
  → የማመቂያ ስትራቴጂ መራጭ
    → የኮምቦ ቅድሚያ መስጫ አለ? → የኮምቦ ቅንብሩን ይጠቀሙ
    → የራስ-ሰር ማስጀመሪያ ገደብ? → ራስ-ሰር ሁነታን ይጠቀሙ
    → ነባሪ ሁነታ? → ዓለም አቀፍ ቅንብሩን ይጠቀሙ
    → ጠፍቷል? → ማመቂያውን ዝለሉ
  → የተመረጠው የማመቂያ ሁነታ
    → ጠፍቷል፦ ምንም ማመቂያ የለም
    → ቀላል፦ ደህንነቱ የተጠበቀ የክፍተት/ቅርጸት ማጽዳት (~15%)
    → መደበኛ፦ የዋሻ-ሰው ንግግር የትርፍ ቃላት ማስወገድ (~30%)
    → ኃይለኛ፦ የታሪክ ማርጀት + ማጠቃለያ (~50%)
    → እጅግ ከፍተኛ፦ በሂዩሪስቲክ መቀነስ + የኮድ ብሎክ ማቅጠን (~75%)
    → RTK፦ ትዕዛዝን የሚያውቅ የተርሚናል/የመሣሪያ ውጤት ማጣሪያ (60-90% የውጫዊ አቅራቢ ክልል)
    → የተደራረበ፦ በቅደም ተከተል የሚሠራ ባለብዙ-ኤንጂን ፓይፕላይን፣ ብዙውን ጊዜ RTK ከዚያ Caveman (78-95% የብቁነት ክልል)
  → የታመቀ ጥያቄ → አቅራቢ
```

---

## የማመቂያ ሁነታዎች

### ጠፍቷል

ምንም ማመቂያ አይተገበርም። ሁሉም መልዕክቶች ሳይለወጡ ያልፋሉ።

### ቀላል ሁነታ (~15% ቁጠባ፣ <1ms መዘግየት)

ከሁሉም የተሻለ ደህንነት ያለው ሁነታ — ምንም የትርጉም ለውጥ የለም፤ የቅርጸት ማጽዳት ብቻ ይከናወናል፦

| ቴክኒክ                     | መግለጫ                                 |
| ------------------------ | ------------------------------------ |
| `collapseWhitespace`     | ተከታታይ ባዶ መስመሮችን እና የመጨረሻ ክፍተቶችን አዋህድ |
| `dedupSystemPrompt`      | የተባዙ የሥርዓት መልዕክቶችን አስወግድ             |
| `compressToolResults`    | ረዣዥም የመሣሪያ/የፋንክሽን ውጤቶችን አመቅ          |
| `removeRedundantContent` | የተደጋገሙ መመሪያዎችን አስወግድ                 |
| `replaceImageUrls`       | የbase64 ምስል ውሂብ URIዎችን አሳጥር          |

**ምርጥ የሚሆነው፦** ሁልጊዜ እንዲሠራ ለማድረግ፣ ደህንነት-ወሳኝ ለሆኑ የሥራ ፍሰቶች።

### መደበኛ ሁነታ (~30% ቁጠባ)

በ[Caveman](https://github.com/JuliusBrussee/caveman) የተነሳሳ — ትርጉሙን እየጠበቀ የትርፍ ቃላትን እና ረዣዥም አገላለጾችን ያስወግዳል፦

- የትርፍ ቃላትን ያስወግዳል ("እባክዎ", "እኔ እንደማስበው", "በመሠረቱ", "በእውነቱ")
- ረዣዥም ሐረጎችን ያሳጥራል ("ለማድረግ በሚል ዓላማ" → "ለማድረግ"፣ "በ... ምክንያት" → "ስለ")
- በትሕትና የተሞላ ማመንታትን ያስወግዳል ("እባክዎ ቢያደርጉ...", "ከቻሉ እባክዎ...")
- ለኮዲንግ ፕሮምፕቶች የተስተካከሉ 30+ regex ደንቦች

**ምርጥ የሚሆነው፦** ለዕለታዊ የኮዲንግ የሥራ ፍሰቶች፣ ወጪን ለሚያገናዝቡ ቡድኖች።

### ኃይለኛ ሁነታ (~50% ቁጠባ)

ለረጅም ክፍለ ጊዜዎች ብልህ የታሪክ አስተዳደር፦

- **የመልዕክት ማርጀት** — የቆዩ መልዕክቶች በደረጃ እየታመቁ ይሄዳሉ
- **የመሣሪያ ውጤት ማመቂያ** — ረዣዥም የመሣሪያ ውጤቶች ይቆረጣሉ ወይም ይተዋሉ (የመጀመሪያ/የመጨረሻ መስመሮች፣
  ተዛማጅ-መስመር ማጣሪያ፣ የJSON ቁልፍ ማጠቃለል)
- **የመዋቅር ታማኝነት ጥበቃዎች** — የ`tool_use` + `tool_result` ጥንዶች ወጥነታቸውን እንዲጠብቁ ያረጋግጣል
- **የኮንቴክስት መስኮት ግንዛቤ** — የእያንዳንዱን ሞዴል የቶክን ገደብ ያከብራል

**ምርጥ የሚሆነው፦** ለረዥም የማረም ክፍለ ጊዜዎች፣ ለትላልቅ የኮድ ማከማቻዎች።

### እጅግ ከፍተኛ ሁነታ (~75% ቁጠባ)

የቶክን ቁጥር ወሳኝ ለሆነባቸው ሁኔታዎች ከፍተኛው ማመቂያ፦

- **በሂዩሪስቲክ መቀነስ** — ነጥብን መሠረት ያደረገ የጽሑፍ ቶክኖችን መቀነስ
- **መዋቅርን መጠበቅ** — በአጥር የተከበቡ የኮድ ብሎኮች፣ የመስመር ውስጥ ኮድ፣ URLዎች እና መለያዎች
  በጊዜያዊ ምልክቶች ተተክተው ከዚያ ሳይለወጡ እንደገና ይያያዛሉ፤ ፈጽሞ አይቀነሱም
- **አማራጭ SLM ደረጃ** — ሲዋቀር አነስተኛ የአካባቢ ሞዴል ቅነሳውን የበለጠ ሊያሻሽል ይችላል
- ከኃይለኛ ሁነታ ነጻ ነው፦ የመልዕክት ማርጀትን፣ የመሣሪያ-ውጤት ማመቂያን
  ወይም የመጠባበቂያ ማጠቃለያ ሰጪውን አያስኬድም (የSLM-ደረጃ ውድቀት ብቻ የመጠባበቂያ ሂደትን
  በኃይለኛ ሁነታ ሊያስኬድ ይችላል)

**ምርጥ የሚሆነው፦** በተደጋጋሚ የኮንቴክስት ገደቦች ላይ ሲደርሱ።

### RTK ሁነታ (60-90% የውጫዊ አቅራቢ ክልል)

RTK ሁነታ በኮዲንግ ወኪል ክፍለ ጊዜዎች ውስጥ ለሚታዩ ረዣዥም የመሣሪያ ውጤቶች የተመቻቸ ነው፦

- እንደ `git status`፣ `git diff`፣ `git log`፣ የሙከራ አስኪያጆች፣
  TypeScript/Vite/Webpack ግንባታዎች፣ ESLint/Biome/Prettier፣ npm ኦዲት/ጭነቶች፣ Docker ሎጎች፣ የመሠረተ ልማት
  ውጤት እና አጠቃላይ የሼል ውጤት ያሉ የትዕዛዝ/ውጤት ምድቦችን ይለያል
- ከ`open-sse/services/compression/engines/rtk/filters/` የJSON ማጣሪያ ጥቅሎችን ይተገብራል
- የRTK TOML schema v1 ማጣሪያዎችን ከፕሮጀክት ወይም ከዓለም አቀፍ `filters.toml` ፋይሎች ያስመጣል፤ የመስመር-ውስጥ ሙከራ
  ማረጋገጫ እና ለፕሮጀክት ፋይሎች በእምነት የሚቆጣጠር መዳረሻ አለው
- 55 አብሮገነብ ማጣሪያዎችን ከመስመር-ውስጥ የማረጋገጫ ናሙናዎች ጋር ይዟል
- የANSI መቆጣጠሪያ ቅደም ተከተሎችን፣ የሂደት አሞሌዎችን፣ የተደጋገሙ መስመሮችን እና እርምጃ የማያስፈልገውን ጫጫታ ያስወግዳል
- ውድቀቶችን፣ ስህተቶችን፣ ማስጠንቀቂያዎችን፣ የተለወጡ ፋይሎችን፣ ማጠቃለያዎችን እና የረዥም ውጤት መጨረሻን ይጠብቃል
- በእምነት የሚቆጣጠሩ የፕሮጀክት ማጣሪያዎችን፣ ዓለም አቀፍ ማጣሪያዎችን እና አማራጭ የተሸፈነ ጥሬ-ውጤት መልሶ ማግኘትን ይደግፋል

**ምርጥ የሚሆነው፦** ሼል፣ ግንባታ፣ ሙከራ፣ git፣ grep እና የፋይል-ውጤት ቅጂዎች ላሏቸው የወኪል ክፍለ ጊዜዎች።

### የተደራረበ ሁነታ (78-95% የብቁነት ክልል)

የተደራረበ ሁነታ ብዙ የማመቂያ ኤንጂኖችን በወሰነ ቅደም ተከተል ያስኬዳል። ነባሪው ፓይፕላይን፦

```txt
RTK -> Caveman
```

ይህ ቅደም ተከተል በመጀመሪያ የተርሚናል/የመሣሪያ ውጤትን አጠቃሎ ይይዛል፤ ከዚያም ቀሪው ተፈጥሯዊ-ቋንቋ ፕሮምፕት ላይ የCaveman የትርጉም ማሳጠሪያን ይተገብራል። የተደራረቡ ፓይፕላይኖች በዓለም አቀፍ ደረጃ ወይም ለራውቲንግ ኮምቦዎች በተመደቡ የማመቂያ ኮምቦዎች በኩል ሊዋቀሩ ይችላሉ።

**ምርጥ የሚሆነው፦** ትላልቅ የመሣሪያ ሎጎችን ከሰው መመሪያዎች ወይም ከረዳት ማጠቃለያዎች ጋር ለያዘ ድብልቅ ኮንቴክስት።

---

## የUpstream ቁጠባ ስሌት

OmniRoute የመጭመቅ ቁጠባዎችን ከሁለት ምንጮች ይመዘግባል፦ የupstream ፕሮጀክት የአፈጻጸም መለኪያዎች እና
የOmniRoute የራሱ የኤንጂን ውህደት።

| ምንጭ     | እዚህ ላይ ጥቅም ላይ የዋለው የUpstream README ቁጥር                                                         |
| ------- | ----------------------------------------------------------------------------------------------- |
| Caveman | `~75%` ያነሱ የውጤት ቶከኖች፣ `65%` የአፈጻጸም መለኪያ አማካይ የውጤት ቁጠባ፣ `22-87%` ክልል፣ እና `~46%` የግብዓት መጭመቂያ መሣሪያ |
| RTK     | `60-90%` የትዕዛዝ ውጤት ቁጠባ፤ የናሙና ክፍለ ጊዜ `~118,000 -> ~23,900` ቶከኖች፣ ወይም `79.7%` ተቆጥቧል (`~80%`)      |

ለተደራራቢ የመሣሪያ/አውድ የውሂብ ጥቅሎች፣ ነባሪው የOmniRoute ጥምረት ኤንጂኖቹን በተከታታይ ያዋህዳል፦

```txt
RTK -> Caveman
```

የተዋሃደው ቁጠባ በማባዛት የሚሰላ እንጂ በመደመር አይደለም፦

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

ያ `78-95%` ቁጥር RTK እና Caveman ሁለቱም ተመሳሳዩን የግብዓት/አውድ የውሂብ ጥቅል መቀነስ ሲችሉ ይሠራል።
የCaveman ምላሽ ውጤት ሁነታ የተለየ ነው፦ ሲነቃ የCavemanን የራሱን የውጤት ቁጠባ (`65%`
አማካይ፣ `~75%` ዋና አኃዝ፣ `22-87%` ክልል) ይጠቀሙ። አጠቃላይ የክፍያ ቁጠባው በprompt/ውጤት ድብልቅዎ ላይ ይወሰናል።

### በእርግጥ "ብቁ" ማለት ምንድን ነው

የ15-95% ዋና የክልል አኃዝ ትክክለኛ ነው፣ ነገር ግን **ተደጋጋሚ ወይም ከመጠን በላይ ዝርዝር** ለሆነ ይዘት ብቻ ይሠራል — ተደጋጋሚ
የስህተት መስመሮች፣ ተመሳሳዩን ማስጠንቀቂያ ደጋግሞ የሚያሳይ build log፣ ወይም ከመጠን በላይ የሆነ `grep`/የፋይል-ንባብ ውጤት። ይህ
**እያንዳንዱ** ጥያቄ ያን ያህል ቁጠባ ያስገኛል ማለት አይደለም።

በተግባር ተረጋግጧል (`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`)፦ 300 ተመሳሳይ
የስህተት መስመሮችን በያዘ የAnthropic ቅርጽ `tool_result` ብሎክ ላይ የተካሄደ `stacked` (RTK + Caveman) ሙከራ
**95.93% የቶከን ቁጠባ / 96.26% የቁምፊ ቁጠባ** አስገኝቷል — ይህም በማስታወቂያው ክልል ውስጥ በትክክል
ይገኛል። ነገር ግን ተመሳሳዩ pipeline በመደበኛ፣ ተደጋጋሚ ባልሆነ የመሣሪያ ውጤት (ንጹሕ የ`grep` ተዛማጅ ዝርዝር፣
አጭር የፋይል ንባብ፣ መደበኛ የውይይት ጽሑፍ) ላይ ሲሠራ **ወደ ዜሮ የቀረበ ቁጠባ** በትክክል ያስገኛል፤ ምክንያቱም
የሚወገድ ተደጋጋሚ ነገር የለም፣ እንዲሁም `validateCompression()` (`validation.ts`) የኮድ ብሎኮችን፣ URLsን፣ ርዕሶችን፣ ስሪቶችን ወይም ALL-CAPS የቋሚ መለያዎችን
የሚጥል ወይም የሚቀይር ዳግም ጽሑፍ እንዲላክ አይፈቅድም።

ይህ የሚጠበቅ፣ ደህንነቱ የተጠበቀ ባህሪ እንጂ bug አይደለም፦ በአብዛኛው ንጹሕ ፋይሎችን የሚያነብ/በgrep የሚፈልግ የኮድ ክፍለ ጊዜ
መጭመቅ ሙሉ በሙሉ ቢነቃም መጠነኛ አጠቃላይ ቁጠባ ያሳያል፤ ያልተሳካ የድግግሞሽ
ሂደት ወይም ከመጠን በላይ መልዕክት የሚያወጣ linter ያጋጠመው ክፍለ ጊዜ ግን በዚያ ትራፊክ ላይ ሙሉውን የ78-95% ክልል ያሳያል። የአንድን ክፍለ ጊዜ
ዝቅተኛ የጥቅል ቁጠባ መቶኛ መጭመቁ በተሳሳተ ሁኔታ እንደተዋቀረ ማስረጃ አድርገው አይጠቀሙ — መጀመሪያ መሠረታዊው
የመሣሪያ ውጤት በእርግጥ ተደጋጋሚ እንደነበር ያረጋግጡ።

---

## የቶከን ቁጠባ ምስላዊ ማሳያ

```
ያለ መጭመቅ፦        47K ቶከኖች ወደ LLM ተልከዋል
በLite፦              40K ቶከኖች ተልከዋል          (15% ተቆጥቧል — ደህንነቱ የተጠበቀ፣ ሁልጊዜ የነቃ)
በStandard፦          33K ቶከኖች ተልከዋል          (30% ተቆጥቧል — የcaveman-speak ደንቦች)
በAggressive፦        24K ቶከኖች ተልከዋል          (50% ተቆጥቧል — ማርጀት + ማጠቃለል)
በUltra፦             12K ቶከኖች ተልከዋል          (75% ተቆጥቧል — በግምታዊ ዘዴ መቀነስ)
በRTK፦               19K-5K ቶከኖች ተልከዋል       (በትዕዛዝ/መሣሪያ ውጤት ላይ 60-90% ተቆጥቧል)
በStacked፦           10K-2.5K ቶከኖች ተልከዋል     (ብቁ የሆነ የRTK+Caveman ክልል 78-95%)
```

---

## ውቅር

### ዳሽቦርድ

ወደ `Dashboard → Context & Cache` ይሂዱ፦

- **Caveman** — የሁነታ ምርጫ፣ የቋንቋ ጥቅሎች፣ ቅድመ-እይታ እና ዓለም አቀፍ ነባሪዎች
- **RTK** — የትዕዛዝ ማጣሪያ ቅድመ-እይታ፣ የRTK ደህንነት ቅንብሮች እና የማጣሪያ ካታሎግ
- **Compression Combos** — ለማዘዋወሪያ ጥምረቶች የተመደቡ በስም የሚታወቁ የሞተር ፓይፕላይኖች
- **Auto-Trigger Threshold** — የቶከን ብዛት ከገደቡ ሲበልጥ መጭመቅን በራስ-ሰር ያስጀምራል

### በየጥምረቱ መሻር

በ`Dashboard → Context & Cache → Compression Combos` ውስጥ ለአንድ የማዘዋወሪያ
ጥምረት የመጭመቂያ ጥምረት ይመድቡ፦

```txt
ጥምረት፦ "free-tier-fallback"
  የመጭመቂያ ጥምረት፦ "coding-agent-stack"
  ፓይፕላይን፦ RTK -> Caveman
  ዒላማዎች፦
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

ይህ በክፍያ/ኮዲንግ አቅራቢዎች ላይ የተደራረበ መጭመቅ እንዲጠቀሙ፣ በሚከፈልባቸው
የደንበኝነት ምዝገባዎች ላይ ደግሞ ቀላል ሁነታን እንዲያቆዩ ያስችልዎታል።

ይህ የ"በየጥምረቱ መሻር" ምደባ ከ**የማዘዋወሪያ-ጥምረት መጭመቂያ
ሁነታ** መሻር (Default/Off/Lite/Standard/Aggressive/Ultra/Codex Responses — የመስኩ
ስኪማ `rtk`፣ `stacked` እና `omniglyph`ንም ይቀበላል) የተለየ መቆጣጠሪያ ነው — ያ መሻር በስም
የሚታወቅ የመጭመቂያ-ጥምረት ፓይፕላይን አይመርጥም፤ በ`resolveCompressionPlan`
የሚመረመረውን `compressionMode` መስክ ብቻ ያዘጋጃል። በጥምረት ካርዱ (`Dashboard → Combos`) ላይ ወይም፣ ከ
#6760 ጀምሮ፣ ከላይ ከተመዘገበው የፓይፕላይን-ምደባ ምልክት ሳጥን አጠገብ በ
`Dashboard → Context & Cache → Compression Combos` ውስጥ ባለው የ"Assign to routing" ዝርዝር ላይ ለእያንዳንዱ የማዘዋወሪያ ጥምረት
ሊዘጋጅ ይችላል። ሁለቱም በይነገጾች በተመሳሳዩ `PUT /api/combos/{id}` የመጨረሻ ነጥብ በኩል ያስቀምጣሉ።

### በየጥያቄው መሻር

ለአንድ ጥያቄ የመጭመቂያ ዕቅዱን ለመሻር የ`x-omniroute-compression` የጥያቄ ራስጌን
ይላኩ። ከሁሉ ከፍተኛው ቅድሚያ አለው — የማዘዋወሪያ-ጥምረት መሻርን፣ ንቁውን መገለጫ፣
ራስ-ሰር ማስጀመሪያውን እና የፓነሉን Default ይበልጣል። ያልታወቁ እሴቶች ችላ ይባላሉ (ጥያቄው በፍጹም ውድቅ አይደረግም)፣
እና ዓለም አቀፉ ዋና መቀየሪያ አሁንም ሁሉንም ነገር ይቆጣጠራል፦ መጭመቅ በዓለም አቀፍ ደረጃ ጠፍቶ ሲሆን ራስጌው
ሊያበራው አይችልም። እሴቶች፦

| እሴት           | ውጤት                                                                     |
| ------------- | ----------------------------------------------------------------------- |
| `off`         | ለዚህ ጥያቄ ምንም መጭመቅ አይደረግም።                                                |
| `default`     | ከፓነሉ የሚመነጨው Default መገለጫ (ንቁውን መገለጫ ችላ ይላል)። መረጃ የሚያጡ ሞተሮች እንደጠፉ ይቆያሉ።  |
| `safe`        | ራስጌውን ካለመጨመር ጋር ተመሳሳይ፦ የተደጋጋሚ ይዘት ማስወገድ እና የነጭ ቦታ ማጠፍ ብቻ።               |
| `allow-lossy` | ማጠቃለያዎችን፣ የአግባብነት ማጣሪያዎችን እና የቅጥ ዳግም ጽሑፎችን ጨምሮ የዚህን ጥያቄ ኦፕሬተር ዕቅድ ያቆያል። |
| `engine:<id>` | ከነቃ አንድ ሞተር፣ ለምሳሌ `engine:rtk`። ይህ ለዚያ ሞተር በየጥያቄው የሚደረግ መርጦ መግባት ነው።    |
| `<combo>`     | በመጀመሪያ በስም (የፊደል መጠንን ሳይለይ)፣ ከዚያም በመለያ የሚዛመድ በስም የሚታወቅ ጥምረት።            |

ያለ`allow-lossy`፣ `engine:<id>` ወይም በስም የሚታወቅ ጥምረት፣ መረጃ የሚያጡ ሞተሮች አይተገበሩም።
መጭመቅ በርቶ ሲሆን ጥያቄው አሁንም የክፍለ-ጊዜ ተደጋጋሚ ይዘት ማስወገድ እና የነጭ ቦታ ማጠፍን ያገኛል።

የተተገበረው ዕቅድ በ`X-OmniRoute-Compression: <mode>; source=<source>` የምላሽ
ራስጌ ውስጥ ተመልሶ ይታያል፤ በዚያም `<source>` ከ`request-header`፣ `routing-override`፣ `active-profile`፣
`auto-trigger`፣ `default` ወይም `off` አንዱ ነው።

### API

```bash
# የመጭመቂያ ቅንብሮችን ያግኙ
curl http://localhost:20128/api/settings/compression

# የመጭመቂያ ቅንብሮችን ያዘምኑ
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# አንድን የተወሰነ RTK/stacked ፔይሎድ በቅድሚያ ይመልከቱ
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# የRTK ማጣሪያ ጥቅሎችን ይዘርዝሩ
curl http://localhost:20128/api/context/rtk/filters

# RTKን ከአማራጭ የትዕዛዝ ሜታዳታ ጋር በቀጥታ ይሞክሩ
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## ምን ጥበቃ ይደረግለታል

የማመቂያ ሞተሩ **ሁልጊዜ የሚከተሉትን እንዳሉ ይጠብቃል፦**

- ✅ የኮድ ብሎኮች (በአጥር የተከበቡ እና በመስመር ውስጥ ያሉ)
- ✅ URLs እና የፋይል ዱካዎች
- ✅ JSON መዋቅሮች እና የተዋቀረ ውሂብ
- ✅ መለያዎች እና ጥበቃ የተደረገላቸው ቴክኒካዊ ቶከኖች
- ✅ የሒሳብ አገላለጾች
- ✅ የመሣሪያ/ተግባር ጥሪ ትርጓሜዎች
- ✅ የስርዓት ፕሮምፕቶች (በ lite ሁነታ)

የRTK ጥሬ-ውጤት መልሶ ማግኛ፣ ማንኛውም ነገር ከመቀመጡ በፊት የተለመዱ API ቁልፎችን፣ bearer ቶከኖችን፣ Slack ቶከኖችን፣ AWS የመዳረሻ ቁልፎችን፣
የይለፍ ቃላትን፣ ቶከኖችን እና ሚስጥሮችን ይሰውራል።

---

## የማመቂያ ስታቲስቲክስ

እያንዳንዱ የታመቀ ጥያቄ በአገልጋይ ምዝግቦች ውስጥ ስታቲስቲክስን ያካትታል፦

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

## የደረጃዎች ፍኖተ ካርታ

| ደረጃ    | ሁነታዎች                                                                                                                    | ሁኔታ     |
| ------ | ------------------------------------------------------------------------------------------------------------------------ | ------- |
| ደረጃ 1  | Off, Lite                                                                                                                | ✅ ተለቋል |
| ደረጃ 2  | Standard, Aggressive, Ultra                                                                                              | ✅ ተለቋል |
| ደረጃ 3  | RTK, Stacked, Compression Combos                                                                                         | ✅ ተለቋል |
| ደረጃ 4  | Output Styles, SLM-tier Ultra, eval harness                                                                              | ✅ ተለቋል |
| ደረጃ 4C | አውድ-በጀትን የሚላመድ ("dial") — የስሌት ሞተር + API (`contextBudget` በ`PUT /api/settings/compression` ላይ) + የዳሽቦርድ ሁነታ/ፖሊሲ መቆጣጠሪያዎች | ✅ ተለቋል |

---

## ምስጋናዎች

የStandard ሁነታ የማመቂያ ደንቦች በ**[JuliusBrussee](https://github.com/JuliusBrussee)** ከተፈጠረው **[Caveman](https://github.com/JuliusBrussee/caveman)** (⭐ 51K+) — በፍጥነት ታዋቂ ከሆነው "ጥቂት ቶከኖች ሥራውን ሲሠሩ ለምን ብዙ ቶከኖችን መጠቀም ያስፈልጋል" ፕሮጀክት — የተነሱ ናቸው። Caveman `~75%` ያነሱ የውጤት ቶከኖች፣ በቤንችማርክ አማካይ `65%` የውጤት ቁጠባ፣ `22-87%` የውጤት ክልል እና `~46%` የግብዓት-ማመቂያ መሣሪያ እንዳሉት ዘግቧል።

የRTK ሁነታ በ**[RTK AI](https://github.com/rtk-ai)** ከተፈጠረው **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)** — ለተርሚናል፣ build፣ test፣ git እና የመሣሪያ-ውጤት ማጣሪያ የተዘጋጀው ከፍተኛ-አፈጻጸም ያለው የትዕዛዝ-ውጤት ማመቂያ ፕሮጀክት — የተነሳ ነው። RTK `60-90%` ቁጠባ እንዳለው ዘግቧል፤ የREADME ናሙና ክፍለ ጊዜውም `~80%` መቆጠቡን ያሳያል።

---

## የላቁ የማመቂያ ስርዓቶች

ከላይ ከተገለጹት 7 ሁነታዎች ባሻገር (ምንጩ `codex-responses` እና
`omniglyph` ሁነታዎችንም ይቀበላል፣ ሆኖም ይህ መመሪያ አይሸፍናቸውም)፣ ከታች ያሉት ክፍሎች
በእነዚያ ሁነታዎች ውስጥ ወይም ከእነሱ ጎን ለጎን የሚሠሩ ባህሪያትን ይሸፍናሉ፦ Tool Result Compression እና Progressive Aging
የaggressive ሞተር ደረጃ 1 እና 2 ናቸው (Aggressive ሁነታ እና በተደራራቢ የሂደት መስመር ውስጥ ያለ `aggressive` ደረጃ)፣ Stacked Pipeline ደግሞ Stacked ሁነታ የሚሠራበት መንገድ ነው፤ Cache-Aware Compression
ማመቂያው እንደበራ ሆኖ ለመሸጎጫ አቅራቢዎች `aggressive` እና `ultra`ን ወደ `standard` ዝቅ ያደርጋል፣ Caveman Output Mode እና Output Styles ደግሞ በነባሪ የጠፉ፣ ጥያቄውን ከማመቅ ይልቅ የሞዴሉን ውጤት ቅርጽ የሚያስይዙ፣ በምርጫ የሚነቁ የስርዓት-ፕሮምፕት መመሪያዎች ናቸው።

### መሸጎጫን የሚያገናዝብ ማመቂያ

አንዳንድ አቅራቢዎች (እንደ Anthropic ከፕሮምፕት መሸጎጫ ጋር) **የፕሮምፕት መሸጎጥን** ይደግፋሉ፣
ይህም ወጪን እና መዘግየትን ለመቀነስ የፕሮምፕቱን ክፍሎች እንዲያከማቹ ያስችላቸዋል።
መሸጎጥ በርቶ ሳለ፣ ኃይለኛ ማመቂያ የተሸጎጡትን ቶከኖች በመቀየር
መሸጎጫውን ዋጋ አልባ ስለሚያደርግ፣ አፈጻጸምን በተጨባጭ **ሊጎዳ** ይችላል።

የ`cachingAware.ts` ሞጁል **የመሸጎጫ አውድን በመለየት** እና
በዚያ መሠረት **የማመቂያ ስትራቴጂውን በማስተካከል** ይህንን ችግር ይፈታል።

#### እንዴት እንደሚሠራ

1. **የመሸጎጫ አውድን ይለያል** — የጥያቄውን body ለ`cache_control` ምልክቶች ይቃኛል
2. **የመሸጎጫ አቅራቢዎችን ይለያል** — ዒላማው አቅራቢ መሸጎጥን የሚደግፍ መሆኑን ይፈትሻል
3. **ስትራቴጂውን ያስተካክላል** — ለመሸጎጫ አቅራቢዎች `aggressive`/`ultra`ን ወደ `standard` ዝቅ ያደርጋል
4. **የስርዓት ፕሮምፕትን ይዘላል** — የስርዓት ፕሮምፕቶች በተለምዶ ይሸጎጣሉ፣ ስለዚህ አያምቃቸውም

የስትራቴጂው አጋዥ `deterministicOnly` ጠቋሚንም ይመልሳል፣ ነገር ግን የዕቅድ ገንቢው
ስትራቴጂውን ብቻ ነው የሚጠቀመው — በአሁኑ ጊዜ ከእሱ በኋላ ያለ ምንም ነገር ጠቋሚውን አያነብም።

#### የኮድ ምሳሌ

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← የመሸጎጫ ምልክት
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", targetFormat: null, isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### መቼ መጠቀም እንደሚገባ

መሸጎጫን የሚያገናዝብ ማመቂያ **ሁልጊዜ በርቷል** — ምንም ውቅር አያስፈልግም። ማመቂያው በርቶ እና
ዒላማው አቅራቢ የፕሮምፕት መሸጎጥን (Anthropic፣ OpenAI፣
ወዘተ) በሚደግፍበት ጊዜ ሁሉ ይሠራል፤ ግልጽ የ`cache_control` ምልክቶች አያስፈልጉም — መሸጎጥን የሚደግፍ አቅራቢ ብቻውን
ወደ ዝቅተኛ ደረጃ መቀየሩን ያስጀምራል፣ ምልክቶች ብቻቸውን ግን በጭራሽ አያስጀምሩትም (የምልክት ማወቂያው ለመሸጎጫ
ቴሌሜትሪ ውሂብ ያቀርባል እንጂ የስትራቴጂውን ውሳኔ አይወስንም)።

### ተራማጅ እርጅና

ረጅም ውይይቶች ብዙ የመልዕክት ተራዎችን ያከማቻሉ፣ ነገር ግን የቆዩ ተራዎች ተዛማጅነታቸው
እየቀነሰ ይሄዳል። የ`progressiveAging.ts` ሞጁል **መልዕክቶችን እንደ ተራ ርቀታቸው ደረጃቸውን ይቀንሳል**
(ርቀቱ የሚለካው ከውይይቱ መጨረሻ ጀምሮ ነው)። ከተለቀቁት ነባሪዎች ጋር
(`verbatim: 2, light: 2, moderate: 3`)፦

- **የመጨረሻዎቹ 2 ተራዎች (ርቀት ≤ 2)**፦ ምንም ሳይቀየሩ ይቀመጣሉ
- **ርቀት 3**፦ Caveman ማመቅ (ትርፍ ቃላትን ማስወገድ)
- **ርቀት 4+**፦ የረዳት መልዕክቶች ይጠቃለላሉ፤ የተጠቃሚ መልዕክቶች እስከ 120 ቁምፊዎች በሚወሰነው የመጀመሪያ መስመራቸው ብቻ ይቀነሳሉ፤ ሌሎች ሚናዎች ሳይነኩ ይቀራሉ። የስርዓት መመሪያዎች፣ ቀደም ሲል ያረጁ
  መልዕክቶች እና የቅርብ ጊዜው የተጠቃሚ መልዕክት ርቀታቸው ምንም ቢሆን ሁልጊዜ ምንም ሳይቀየሩ ይቀመጣሉ።
  ምንም ነገር ሙሉ በሙሉ አይጣልም፣ እና በቀረቡት ነባሪ ቅንብሮች የ`light`
  ደረጃ ላይ መድረስ አይቻልም (`light` ከ`verbatim` ጋር እኩል ነው)።

#### የኮድ ምሳሌ

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 50 ተጨማሪ ተራዎች ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // የመጨረሻዎቹ 3 ተራዎች፦ ምንም ሳይቀየሩ
  light: 8, // ርቀት <= 8፦ ቀላል ማመቅ
  moderate: 20, // ርቀት <= 20፦ caveman ማመቅ
  fullSummary: 5, // በዓይነቱ የሚጠየቅ፣ ነገር ግን በደረጃ መመደቢያ ኮዱ የማይነበብ
  // ርቀት > 20፦ ይጠቃለላል (ረዳት) / የመጀመሪያው መስመር ይቀመጣል (ተጠቃሚ)
});

// saved = የተቆጠቡ ቶከኖች ብዛት
```

#### መቼ መጠቀም እንደሚገባ

ደረጃ በደረጃ ማርጀት ለ`aggressive` ሁነታ **ሁልጊዜ ክፍት ነው** — ይህ የ
`compressAggressive()` ደረጃ 2 ነው። Ultra ሁነታ ይህን አያስኬድም። በተለይ
ለሚከተሉት ውጤታማ ነው፦

- ረጅም ጊዜ የሚቆዩ የኮድ ስራ ክፍለ ጊዜዎች
- ለብዙ ቀናት የሚቆዩ ውይይቶች
- ብዙ የመሣሪያ ጥሪዎች ያሏቸው ወኪላዊ የስራ ፍሰቶች

### Caveman የውጤት ሁነታ

Caveman የውጤት ሁነታ ሞዴሉን ራሱ አጭር ውጤት እንዲሰጥ የሚጠይቁ
**የስርዓት መመሪያዎችን** ያክላል — የ`lite` ደረጃ ሙሉ ዓረፍተ ነገሮችን የሚያቆዩ አጭር መልሶችን ይጠይቃል፣ `full`
«እንደ ብልህ caveman በአጭሩ እንዲመልስ» ይጠይቀዋል፣ እና `ultra` የቴሌግራፍ ዓይነት ውጤት ይጠይቃል፤
መመሪያዎቹ የሚጠይቁ ብቻ ናቸው፣ ዋስትና ሊሰጡ አይችሉም። ጥያቄዎች እነዚህን በ
`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) በኩል ይቀበላሉ፦
`open-sse/handlers/chatCore.ts` በመጀመሪያ ምርጫውን ከኋላ-ተኳኋኝነት አስማሚው ጋር
(`resolveOutputStyleSelection()` በ
`open-sse/services/compression/outputStyles/backCompat.ts`) ይወስናል፤ ይህም `outputStyles`
ባዶ እስከሆነ ድረስ፣ የነቃ `cavemanOutputMode`ን በ
`cavemanOutputMode.intensity` ወደ `terse-prose` የውጤት ቅጥ ይመድባል (ከታች ያለውን ከኋላ-ተኳኋኝነት ይመልከቱ)፤ ባዶ ያልሆነ `outputStyles`
ምርጫ እንዳለ ይጠቀማል፣ እና ከዚያ `cavemanOutputMode.enabled` እና `intensity`
ምንም ተጽዕኖ አይኖራቸውም፣ የእሱ `autoClarity` መቀያየሪያ ግን አሁንም ተግባራዊ ይሆናል። `outputMode.ts`
የመመሪያ ጽሑፎቹን (`CAVEMAN_INSTRUCTION_BY_LANGUAGE`)፣ የይዘት ማለፊያውን እና
መክተቱ የሚጠቀምበትን የአቀማመጥ ረዳት ይዟል፤ የራሱ `applyCavemanOutputMode()` መክተቻ በምርት ላይ
የሚጠራው የለም።

#### እንዴት እንደሚሰራ

ይህ ሁነታ ግብዓቱን አያምቅም። በስርዓት መመሪያው ላይ የመመሪያ ብሎክ ያክላል
(ከታች ያለውን መክተት እንዴት እንደሚሰራ ይመልከቱ)፣ እና ለጥያቄው የተመረጠ ማንኛውም የግብዓት ማመቂያ ሁነታ
ከዚያ በኋላ ብሎኩን አሁን በያዘው አካል ላይ መስራቱን ይቀጥላል። እያንዳንዱ ደረጃ ከሚያበቃበት የጋራ
የወሰኖች ሐረግ በፊት፣ የእንግሊዝኛው `full` ደረጃ እንዲህ ይላል፦

> "እንደ ብልህ caveman በአጭሩ መልስ። መስተዋድዶችን (a/an/the)፣ ትርፍ ቃላትን (just/really/basically/actually/simply)፣ የጨዋነት ንግግሮችን፣ አሻሚ አገላለጾችን አስወግድ። ያልተሟሉ ዓረፍተ ነገሮች ይፈቀዳሉ። አጫጭር ተመሳሳይ ቃላትን ተጠቀም (ከextensive ይልቅ big፣ ከimplement ይልቅ fix)። ሁሉንም ቴክኒካዊ ይዘት፣ ኮድ፣ ስህተቶች፣ URLs፣ መለያዎች በትክክል እንዳሉ አቆይ።"

ይህ በተለይ ለሚከተሉት በጥሩ ሁኔታ ይሰራል፦

- ኮድ ማመንጨት (ይበልጥ አጭር ውጤት = ያነሱ ቶከኖች)
- ፈጣን ጥያቄና መልስ (ዝርዝር ማብራሪያዎች አያስፈልጉም)
- የቡድን ሂደት (የማስኬጃ አቅምን ከፍተኛ ማድረግ)

#### መቼ መጠቀም እንደሚገባ

Caveman የውጤት ሁነታ **በምርጫ የሚነቃ** ነው። ማመቅ እንደበራ (`enabled: true`፣ በCompression Settings ገጽ ላይ ያለው ዋና መቀያየሪያ
እንደበራ)፣ በ`cavemanOutputMode.enabled` ያብሩት፤ `intensity`
`lite`፣ `full` ወይም `ultra`ን ይመርጣል፦

```json
{
  "enabled": true,
  "cavemanOutputMode": {
    "enabled": true,
    "intensity": "full"
  }
}
```

የማመቅ ጥምረት **Output Mode** መቀያየሪያ (`outputMode`፣ ደረጃው በ`outputModeIntensity`)
ያ ጥምረት ለሚተገበርባቸው ጥያቄዎች ተመሳሳይ መቀያየሪያውን ያዘጋጃል፣ እና
የ`omniroute_set_compression_engine` MCP መሣሪያ በቡሊያን `outputMode`
ነጋሪ እሴቱ በኩል ይጽፈዋል። ባዶ ያልሆነ `outputStyles` ምርጫ ከዚህ መቀያየሪያ ቅድሚያ ይኖረዋል። በ
ዳሽቦርዱ ውስጥ፣ **Terse prose** የውጤት ቅጥን ማንቃት ተመሳሳይ ብሎኩን ያስገባል (ከታች ያሉትን Output
Styles ይመልከቱ)።

### የውጤት ቅጦች (ካታሎግ)

ከላይ ያለው Caveman የውጤት ሁነታ **የቀድሞው ባለአንድ-ቅጥ መንገድ** ነው። ደረጃ 4 ይህን
ወደ ሊጣመሩ የሚችሉ የውጤት ቅጦች ካታሎግ አጠቃለለው፦ `OUTPUT_STYLE_CATALOG` በ
`open-sse/services/compression/outputStyles/catalog.ts`። እያንዳንዱ ቅጥ ሞዴሉን ራሱ በአነስተኛ ወጪ ውጤት እንዲሰጥ የሚጠይቅ የስርዓት-መመሪያ
ነው፤ ቅጦች አብረው ሊነቁ ይችላሉ እና በካታሎግ ቅደም ተከተል ይከተታሉ።

| ቅጥ                      | `id`          | የሚያደርገው                                                                                                                                                                                | የመመሪያ ቋንቋዎች                                   |
| ----------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| አጭር ስድ ንባብ              | `terse-prose` | ትርፍ ቃላትን/መስተዋድዶችን/ማወላወልን ያስወግዳል፤ ቴክኒካዊ ይዘቱን ትክክለኛ አድርጎ ይጠብቃል። ከቀድሞው caveman የውጤት ሁነታ ጋር ተመሳሳይ ጽሑፍ ነው (ተጠቅሷል፣ እንደገና አልተጻፈም)።                                                            | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| አነስተኛ ኮድ                | `less-code`   | የYAGNI ደረጃ፦ አነስተኛው የሚሠራ ለውጥ፣ ያልተጠየቁ ረቂቅ አወቃቀሮች የሉም።                                                                                                                                    | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| Ponytail (ሰነፍ ከፍተኛ dev) | `ponytail`    | "ምርጡ ኮድ ፈጽሞ ያልተጻፈው ኮድ ነው"፦ ዳግም መጠቀም > ዳግም መጻፍ፣ መሠረታዊ ምክንያት > ምልክት፣ አጭሩ የሚሠራ diff።                                                                                                      | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| ADHD አለብኝ (እርምጃ-ቀዳሚ)    | `i-have-adhd` | መጀመሪያ እርምጃ (ከስድ ንባብ በፊት command/path/snippet)፣ በቁጥር የተደረደሩ ውስን ደረጃዎች፣ አንድ ተጨባጭ ቀጣይ ደረጃ፣ መግቢያ/ማጠቃለያ/መዝጊያ የለም። ከ[ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT) የተወሰደ። | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi |
| አጭር CJK (文言)          | `terse-cjk`   | `full`/`ultra` መልስ በጥንታዊ ቻይንኛ (文言)፤ `lite` የተግባር ቃላት፣ የትህትና አገላለጾች ወይም ጌጣጌጥ የሌላቸው አጭር መልሶችን ብቻ ይጠይቃል።                                                                                | zh (በlocale የተገደበ፣ ከታች ይመልከቱ)                 |

እያንዳንዱ ቅጥ ሦስት የጥንካሬ ደረጃዎችን — `lite`፣ `full`፣ `ultra` — ይዞ ይቀርባል፤ እያንዳንዱ ደረጃም
በጋራ የወሰኖች አንቀጽ (`SHARED_BOUNDARIES` በ`outputMode.ts`) ያበቃል፣ ይህም
የኮድ ብሎኮችን፣ የፋይል መንገዶችን፣ ትዕዛዞችን፣ ስህተቶችን እና URLsን በትክክል ይጠብቃል። የ`terse-prose` እና
`terse-cjk` የደረጃ ጽሑፎች መለያዎችንም ወደዚያ ዝርዝር ይጨምራሉ።

`terse-cjk` በሁለት ቦታዎች ለ`zh` በlocale የተገደበ ነው። የCompression Settings ገጽ
የእሱን ረድፍ የሚያሳየው የdashboard UI ቋንቋ ቻይንኛ (`zh-CN` ወይም `zh-TW`) ሲሆን ብቻ ነው፣ እና
`applyOutputStyles()` የሚያስገባው የጥያቄው የተፈታ ቋንቋ (ከታች ያለውን የቋንቋ
ምርጫ ይመልከቱ) `zh` ሲሆን ብቻ ነው። ረድፉን መደበቅ የተቀመጠ `terse-cjk` ምርጫን አያጸዳም፦
የsettings API ማንኛውንም style id ይቀበላል፣ እና በገጹ ላይ ሌሎች ቅጦችን ማስቀመጥ ምርጫውን እንዳለ ያቆየዋል። በ
ጥያቄ ጊዜ የ`applyOutputStyles()` የቋንቋ ማረጋገጫ ብቸኛው የlocale ገደብ ነው።

#### ማስገባቱ እንዴት እንደሚሠራ

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`) ምርጫውን
ከcatalog ጋር ያመሳክራል (ያልታወቁ ids እና ከlocale ጋር የማይዛመዱ ቅጦች
ይወገዳሉ፣ ፈጽሞ ስህተት አይሆኑም፤ ወደ ምንም ቅጥ የማይፈታ ምርጫ bodyውን
ሳይለውጥ ይተወዋል፣ እንደ `no_styles` ይዘለላል)፣ የተመረጡትን መመሪያዎች በcatalog
ቅደም ተከተል ያጣምራል፣
የወሰኖችን አንቀጽ **አንድ ጊዜ** ያክላል (በተጨማሪም `less-code` ወይም `ponytail` ከተመረጠ የደህንነት አንቀጹን፣ `SAFETY_BOUNDARIES` ወይም
ትርጉሙን)፣ እና ብሎኩን በአንድ idempotency marker (`[OmniRoute Output Styles]`) ይጀምራል፤ ስለዚህ
ዳግም መተግበሩ ምንም ለውጥ አያመጣም። የተፈታው ቋንቋ (ከታች ያለውን የቋንቋ ምርጫ ይመልከቱ) ትርጉም
ሲኖረው፣ ከእንግሊዝኛው ይልቅ አካባቢያዊ መመሪያው ይገባል።

ባዶ ያልሆነ `messages` array ባለው body ላይ፣ የidempotency ማረጋገጫው ከ
content bypass በፊት ይሠራል፦ የ`[OmniRoute Output Styles]` marker ቀድሞውኑ በtop-level
`system` field (string ወይም content-block array) ውስጥ ወይም string
content ባለው system message ውስጥ ካለ፣ bodyው እንደ `already_applied` ሳይለወጥ ይቀራል፣ እና ምንም keyword ማረጋገጫ አይካሄድም።
ካልሆነ፣ content bypass (`shouldBypassCavemanOutputMode()` በ
`open-sse/services/compression/outputMode.ts`) የመጨረሻዎቹን ሦስት
messages ጽሑፍ፣ roleቸው ምንም ይሁን፣ ይመረምራል፤ እና ያ ጽሑፍ የደህንነት፣ የማይቀለበስ እርምጃ ወይም የማብራሪያ keywordsን፣ ወይም
ቅደም ተከተልን የሚጠብቅ sequenceን ሲያዛምድ ለሙሉ turn ቅጦቹን ይዘላል፦ `first`፣ `then`፣ `after that`፣ `before`፣ `rollback` ወይም
`backup`፣ እና በ240 characters ውስጥ በ`delete`፣ `drop`፣ `migrate`፣ `deploy` ወይም
`release` የተከተለ። የbypass ሂደቱ **Auto-Clarity Bypass** toggle
(`cavemanOutputMode.autoClarity`፣ በነባሪ የበራ) እስከበራ ድረስ ይሠራል፤ toggleውን ማጥፋት
የkeyword ማረጋገጫውን ይዘላል።

bypassው turnውን ሲያሳልፍ፣ `placeSystemInstruction()` (በዚያው ፋይል)፣
አዲስ `messages[0]` ፈጽሞ የማይፈጥረው፣ ብሎኩን ከሚከተሉት ውስጥ በመጀመሪያ ባገኘው ቦታ ያስቀምጣል፦

1. string content ያለው ቀዳሚ system message፦ ብሎኩ ከጽሑፉ በኋላ ይታከላል።
2. top-level `system` field፦ ብሎኩ ከstring ጽሑፍ በኋላ ይታከላል፣ ወይም
   ወደ content-block array እንደ አዲስ text block ይጨመራል።
3. string content ያለው የመጀመሪያው በኋላ የሚገኝ system message፦ ብሎኩ ከ
   ጽሑፉ በኋላ ይታከላል።
4. ከላይ ካሉት አንዳቸውም ካልተገኙ፦ ብሎኩ በ`messages` መጨረሻ ወደሚፈጠር አዲስ system message ይገባል።

`messages` array በሌለው body (ወይም ባዶ በሆነ) ላይ ምንም content bypass አይሠራም፣ እና
top-level `system` field አይመረመርም። ብሎኩ ከstring `instructions` field ጽሑፍ በኋላ ይታከላል፣ ያ field ቀድሞውኑ
የ`[OmniRoute Output Styles]` markerን ካልያዘ በስተቀር፤ ከያዘው bodyው እንደ
`already_applied` ሳይለወጥ ይቀራል። bodyው string `instructions` field ባይኖረውም `input`
(string ወይም array) ካለው፣ ብሎኩ `instructions` ይሆናል፣ ያ field ይዞት የነበረውን ማንኛውንም non-string value
ይተካል። string `instructions` fieldም ሆነ string ወይም array
`input` የሌለው body ሳይለወጥ ይቀራል፣ እና እንደ `no_messages` ይዘለላል።

#### እንዴት ማንቃት እንደሚቻል

በዳሽቦርዱ ውስጥ፦ **የማመቂያ አውድ → የማመቂያ ቅንብሮች**
(`/dashboard/context/settings`)፣ በውጤት ቅጦች ክፍል ውስጥ፦ ለእያንዳንዱ ቅጥ አንድ ረድፍ፣ የማብሪያ/ማጥፊያ
መቀያየሪያ እና የደረጃ መምረጫ አለ። ማመቂያው ራሱ በርቶ ሳለ (የገጹ
ዋና መቀያየሪያ፣ `enabled`) ቅጦቹ ይገባሉ። የ**ራስ-ሰር ግልጽነት ማለፊያ** መቀያየሪያ በ**Caveman**
ገጽ (`/dashboard/context/caveman`) ላይ፣ በ**የውጤት ሁነታ** ካርዱ ውስጥ ይገኛል። በፕሮግራም ደረጃ፣
የማመቂያ ውቅሩ ምርጫውን እንደሚከተለው ያስቀምጣል፦

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

የኋላ-ተኳኋኝነት፦ `outputStyles` ባዶ እስከሆነ ድረስ፣ የቆየው `cavemanOutputMode.enabled`
ቅንብር በ`cavemanOutputMode.intensity` ላይ ወዳለው `terse-prose` ይመደባል። ከዚያ ብሎኩ
በ`[OmniRoute Output Styles]` ምልክት ይጀምራል፤ የቆየው `applyCavemanOutputMode()`
አስገቢ ግን `[OmniRoute Caveman Output Mode]` ይጽፍ ነበር። ከምልክቱ በታች ያለው ጽሑፍ በ
en፣ pt-BR፣ es፣ de፣ fr፣ it፣ ru፣ id እና vi ከቆየው ገቢ ጽሑፍ ጋር ይዛመዳል፤ በja እና zh ውስጥ ግን
ከወሰኖች አንቀጽ በፊት አንድ ተጨማሪ ክፍተት አለው። `terse-prose` ወደ pt-BR፣ es፣ de፣
fr፣ it፣ ru፣ zh፣ ja፣ id እና vi ይተረጎማል፤ ስለዚህ የተወሰነለት ቋንቋ `hu` የሆነ ጥያቄ
የቆየው አስገቢ የሃንጋሪኛ ጽሑፉን ይጠቀምበት በነበረበት ቦታ የእንግሊዝኛውን ጽሑፍ ያገኛል።

የውጤት-ቅጥ ቋንቋ ምርጫ (`resolveOutputStyleLanguage()` በ
`outputStyles/apply.ts` ውስጥ)፦ `languageConfig.enabled` በርቶ ሳለ፣ `autoDetect`
ጽሑፍ ያለውን የጥያቄው `messages` ድርድር ውስጥ የሚገኘውን የቅርብ ጊዜ የተጠቃሚ መልዕክት
(የሕብረቁምፊ ይዘት፣ ወይም የይዘት ክፍሎቹ `text`) ናሙና ወስዶ የCaveman ሞተርን ማወቂያ
(`detectCompressionLanguage()`) በእሱ ላይ ያስኬዳል። ማወቂያው የሃን ቁምፊዎች ያሉበት እና ካና
የሌለበት ጽሑፍ ከሆነ `zh` ይመልሳል፤ ካልሆነ ግን ከ`it`፣ `pt-BR`፣ `es`፣ `de`፣
`fr`፣ `ru`፣ `ja`፣ `hu` እና `id` መካከል ከፍተኛው የፍንጭ ተዛማጅነት ያለውን ይመልሳል፤
ምንም ተዛማጅነት ከሌለ ደግሞ `en` ይመልሳል — ሊመድበው የማይችለው ጽሑፍ
`defaultLanguage` ሳይሆን እንግሊዝኛ ያገኛል፣ እና ቅጦቹ የ`vi` ጽሑፍ ቢያካትቱም `vi`
ፈጽሞ አይታወቅም። የResponses API አካል ተራዎቹን በ`input` ውስጥ ያስቀምጣል፤ ይህም ናሙና
አይወሰድበትም፣ ስለዚህ መጀመሪያ `defaultLanguage`፣ ከዚያም እንግሊዝኛ ያገኛል። በ`messages`
ውስጥ ያለ የተጠቃሚ መልዕክት ምንም ጽሑፍ ከሌለው፣ ወይም `autoDetect` ጠፍቶ ከሆነ፣
`defaultLanguage` ይተገበራል፣ ከዚያም እንግሊዝኛ ይተገበራል። `languageConfig.enabled` ጠፍቶ
ሳለ ቋንቋው እንግሊዝኛ ነው — አንድ የማመቂያ ጥምር በጥያቄው ላይ ካልተተገበረ በስተቀር
(ለጥያቄው የማዞሪያ ጥምር የተመደበ ጥምር፣ ወይም chatCore ለአብሮገነብ የተደራረበ
የሂደት መስመር ወደ እሱ የሚመለስበት ነባሪ የማመቂያ ጥምር)፦ ጥምርን መተግበር
ለዚያ ጥያቄ `languageConfig.enabled`ን ያበራል እና `defaultLanguage`ን ከጥምሩ የቋንቋ
ጥቅሎች ያዘጋጃል (የተቀመጠው እሴት ከጥምሩ ጥቅሎች አንዱ ከሆነ እሱን፣ ካልሆነ የጥምሩን
የመጀመሪያ ጥቅል፣ ይህም በነባሪ `en` ነው)፣ በተቀመጠው `autoDetect` (በነባሪ የበራ)
ግን አሁንም ይተገበራል። የCaveman ግቤት ሞተር የደንብ-ጥቅል ቋንቋውን በተለየ መንገድ
ይመርጣል — ለእያንዳንዱ የጽሑፍ ክፍል ለየብቻ፣ እና ራስ-ሰር ማወቂያው ጠፍቶ ሳለ
በ`enabledPacks` የተገደበ ነው።

የቅጥ × ቋንቋ ማትሪክሱ በ
`tests/unit/compression/output-styles-i18n-matrix.test.ts` ተወስኗል፦ በካታሎጉ ውስጥ ያለ
እያንዳንዱ ቅጥ በፈተናው `BASELINE_LANGUAGES` ውስጥ ግቤት ሊኖረው ይገባል፤ በአካባቢያዊ
ቋንቋ ያልተገደበ ቅጥ pt-BR ትርጉም ማካተት አለበት (በአካባቢያዊ ቋንቋ የተገደበው
`terse-cjk` ከዚህ ደንብ ነፃ ነው)፣ አለበለዚያ በ`KNOWN_ENGLISH_ONLY` ውስጥ መዘርዘር
አለበት፤ ይህም ምንም ትርጉም የሌላቸውን ቅጦች ብቻ ሊይዝ ይችላል — የተዘረዘረ ቅጥ
ማንኛውም ትርጉም ካለው ፈተናውን ይወድቃል፤ እንዲሁም አንድ ቅጥ የ`BASELINE_LANGUAGES`
ግቤቱ ከዘረዘራቸው ቋንቋዎች አንዱን ካጣ ፈተናውን ይወድቃል። ቅጥ ለመጨመር፣
[EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style)ን ይመልከቱ።

### የመሣሪያ ውጤት ማመቂያ

በ`open-sse/services/compression/toolResultCompressor.ts` ውስጥ ያለው
`compressToolResult()` የመሣሪያ-ውጤት ጽሑፍን በ**5 ስልቶች** ያመቃል። በዚህ ቅደም ተከተል
ይሞክራቸዋል፣ እና ምርመራው ከይዘቱ ጋር የሚዛመድ የመጀመሪያው የነቃ ስልት ውጤቱን ይወስናል፦

1. **`fileContent`**፦ 3 ወይም ከዚያ በላይ መስመሮች ያሉት ይዘት፤ ቢያንስ አንድ መስመር የመጀመሪያውን
   የገባ ክፍተት ችላ ሲባል፣ በ`import `፣ `export `፣ `function `፣ `class `፣
   `const `፣ `let `፣ `var ` ወይም `return ` (ቁልፍ ቃሉ ከክፍተት ጋር)፣ ወይም
   በ`if`፣ `for` ወይም `while` ተከትሎ `(` ወይም ` (` የሚጀምር ከሆነ፣ የመጀመሪያዎቹን
   20 እና የመጨረሻዎቹን 5 መስመሮች ያስቀምጣል፣ የተዘለለውን መካከለኛ ክፍልም
   ምልክት ያደርጋል።
2. **`grepSearch`**፦ ቢያንስ አንድ `<path>:<digits>:` ቅርጽ ያለው መስመር የያዘ
   ይዘት፤ ከመጀመሪያው ኮለን በፊት ያለው ጽሑፍ ምንም ነጭ ቦታ የሌለው ሲሆን፣
   እነዚያን መስመሮች ብቻ እስከ 30 ድረስ ያስቀምጣል፣ ከዚያም የተጨማሪ ተዛማጆችን
   ብዛትና የተዛመዱ ፋይሎችን ዝርዝር ያክላል፤ ሌሎች መስመሮች በሙሉ ይጣላሉ።
   ስልቱን ለማስነሳት አንድ እንዲህ ያለ መስመር በቂ ነው፤ ስለዚህ `12:30:45`
   በሚመስል የጊዜ ማህተም የሚጀምር የምዝግብ መስመርም እንደ ተዛማጅ ይቆጠራል።
3. **`shellOutput`**፦ የANSI CSI ቅደም ተከተል (`ESC[` ከዚያም አሃዞች ወይም
   ሴሚኮለኖች እና ከዚያ ፊደል፣ እንደ ቀለም ኮዶች) ወይም በጽሑፉ ውስጥ
   በማንኛውም ቦታ `$` ተከትሎ ነጭ ቦታ የያዘ ውጤት፣ እነዚያን ቅደም ተከተሎች
   ያስወግዳል (እንደ `ESC[?25l` ወይም የOSC መስኮት-ርዕስ ቅደም ተከተል ያሉ
   ሌሎች escape ቅደም ተከተሎች ግን ይቀመጣሉ)፣ እንዲሁም ተከታታይ የተደጋገሙ
   መስመሮችን በማጠቃለል የመጨረሻዎቹን 50 መስመሮች ያስቀምጣል። ይህ ፍተሻ
   ከ`json` እና `errorMessage` በፊት ስለሚከናወን፣ እንዲህ ያለ `$` የያዘ
   JSON ወይም የስህተት ውጤት `shellOutput` በርቶ ሳለ ወደ እነርሱ ፈጽሞ አይደርስም።
4. **`json`**፦ ከ2,000 ቁምፊዎች በላይ የሆነ፣ በ`{` ወይም `[` (ከአማራጭ
   ነጭ ቦታ በኋላ) የሚጀምር እና በትክክል የሚተነተን JSON ይዘት ይጠቃለላል፦
   ከ7 በላይ ንጥሎች ያሉት ድርድር የመጀመሪያዎቹን 5 እና የመጨረሻዎቹን 2 ንጥሎች
   ከጠቅላላ ብዛቱ ጋር ያስቀምጣል፤ አንድ ኦብጀክት ደግሞ የመጀመሪያዎቹን 20
   ቁልፎች ያስቀምጣል፣ እያንዳንዱን የተዋቀረ ኦብጀክት ወይም የድርድር እሴት
   በ`{…N keys}` ቦታ ያዥ (ለድርድር፣ N ርዝመቱ ነው) ይተካል፣ እንዲሁም
   ከመጀመሪያዎቹ 20 በኋላ የተጣሉትን ቁልፎች የሚቆጥር `_remaining_<N>_keys`
   ምልክት ያክላል። ስኬላር እሴቶች ሙሉ በሙሉ ይቀዳሉ፤ ስለዚህ 20 ወይም
   ከዚያ ያነሱ ቁልፎች ያሉትና የተዋቀሩ እሴቶች የሌሉት ኦብጀክት እንደገና
   የገባ ክፍተት ብቻ ይደረግለታል — የታመቀ ከሆነ ቁምፊዎች ይጨምርበታል
   እና ሳይቀየር ይቀራል።
5. **`errorMessage`**፦ በማንኛውም ቦታና በማንኛውም የፊደል አጻጻፍ `error:`፣
   `error ` (ቃሉ በክፍተት የተከተለ፣ እንደ `no error found`)፣ `[error]`፣
   `exception:`፣ `exception `፣ `[exception]` ወይም `traceback` የያዘ ውጤት
   የመጀመሪያውን መስመር፣ ቀጣዮቹን 10 መስመሮች እና የመጨረሻዎቹን 3
   ያስቀምጣል፣ በመካከላቸው ባሉት መስመሮች ቦታ `… [N frames elided] …`
   ምልክት ያስገባል። ምልክቱ የሚታየው ከመጀመሪያው መስመር በኋላ ከ13
   በላይ መስመሮች ሲኖሩ ብቻ ነው፤ ስለዚህ 14 ወይም ከዚያ ያነሱ መስመሮች
   ያሉት የስህተት ውጤት አይ缩短ም (12 ወይም 13 መስመሮች ሲኖሩ፣ የመጨረሻዎቹ
   3 ቀድሞ የተቀመጡ መስመሮችን ይደግማሉ)።

አንድ ስልት ከተዛመደ በኋላ፣ ምንም ቁጠባ ባያስገኝም እንኳ፣ ቀጣዮቹ ስልቶች
አይሞከሩም። የተዛመደው ስልት ምንም የተገመተ ቶከን ቁጠባ ካላስገኘ
(ርዝመት ÷ 4፣ ወደ ላይ የተጠጋጋ) — ለምሳሌ፣ 25 ወይም ከዚያ ያነሱ
መስመሮች ያሉት ኮድ-መሰል ፋይል፣ ወይም ከ2,000 ቁምፊዎች በላይ ሆኖ 7
ወይም ከዚያ ያነሱ ንጥሎች ያሉት JSON ድርድር — aggressive ሞተሩ የመጀመሪያውን
የመሣሪያ ውጤት ያስቀምጣል፦ ሁለቱም ጠሪዎች (`compressAggressive()` እና
`compressAnthropicToolResultBlock()`) `saved` 0 ወይም ከዚያ በታች ሲሆን
የመጀመሪያውን ያስቀምጣሉ፣ `compressToolResult()` ራሱ ግን የዚያን ስልት ውጤት
አሁንም ይመልሳል። የመሣሪያ-ውጤት ደረጃው የመጨረሻው ውሳኔ አይደለም፦
የሞተሩ fallback ማጠቃለያ አዘጋጅ ከ8,192 ቁምፊዎች በላይ የሆነ `tool`
ወይም `function` መልዕክትን አሁንም ሊያሳጥር ይችላል (`maxTokensPerMessage`፣
2,048፣ በ4 ተባዝቶ)።

#### መቼ እንደሚጠቀሙበት

የመሣሪያ ውጤት መጭመቅ የaggressive ሞተር ደረጃ 1 ነው (`compressAggressive()`
በ`open-sse/services/compression/aggressive.ts`)፤ ስለዚህ በAggressive ሁነታ እና
በተደራረበ pipeline ውስጥ ባለ `aggressive` ደረጃ ላይ ይሠራል። የOpenAI ቅርጽ
ያላቸውን `tool` እና `function` መልዕክቶች፣ እንዲሁም በAnthropic `tool_result`
ብሎኮች ውስጥ ያለውን ጽሑፍ ይጨምቃል። እያንዳንዱ ስልት በ
`aggressive.toolStrategies` ስር የራሱ መቀየሪያ አለው፣ ሁሉም በነባሪነት በርተዋል።
በdashboard ውስጥ፣ መጭመቅ በርቶ እና ነባሪ ሁነታው Aggressive በሆነ ጊዜ፣
መቀየሪያዎቹ በCaveman ገጽ **Advanced** እይታ ውስጥ ይገኛሉ።

### የተደራረበ Pipeline

የተደራረበው ሁነታ **ብዙ ሞተሮችን በቅደም ተከተል** ያስኬዳል — በተለምዶ
መጀመሪያ RTK (በመሣሪያ ውጤት ላይ 60-90% ቁጠባ)፣ ከዚያም በቀረው ጽሑፍ
ላይ Caveman (~46% የግብዓት ቁጠባ)። ሲጣመሩ፣ ይህ **78-95% ብቁ ክልል**
ነው (ከላይ ያለውን Upstream Savings Math ይመልከቱ)፦
`1 - (1 - 0.60..0.90) × (1 - 0.46)` አማካዩ ≈89% ነው።

#### እንዴት እንደሚሠራ

```
ግብዓት (1000 ቶከኖች)
  → RTK (ትዕዛዝን የሚያውቅ ማጣሪያ) → 200 ቶከኖች
    → Caveman (ሙያዥ ጽሑፍን ማስወገድ) → 108 ቶከኖች
  → ውጤት (108 ቶከኖች፣ ~89% ቁጠባ)
```

#### መቼ እንደሚጠቀሙበት

የተደራረበ ሁነታን ለሚከተሉት ይጠቀሙ፦

- ብዙ መሣሪያ የሚጠቀሙ የሥራ ፍሰቶች (በወኪል የሚከናወን ኮድ መጻፍ፣ ምርምር)
- ለወጪ ትኩረት የሚሰጥ የቡድን ሂደት
- ከፍተኛውን የቶከን ቁጠባ ሲፈልጉ

የተደራረቡ pipelines የሚዋቀሩት በዓለም አቀፉ `stackedPipeline` የመጭመቅ
ቅንብር በኩል፣ ወይም ለrouting combo በተመደበ ስም ባለው compression combo
በኩል ነው (ከላይ Per-Combo Overrideን ይመልከቱ) — በauto-combo `modePack`
በኩል አይደለም (ያ መስክ የauto-combo ሞዴል ምርጫን ክብደት እንደገና
ያስተካክላል ብቻ፣ እና `stacked` ትክክለኛ የpack ስም አይደለም)።

---

## የኮምፕሬሽን Combo ልዩ ማስተካከያዎች

ለተለያዩ የአጠቃቀም ሁኔታዎች ባህሪውን በዝርዝር ለማስተካከል፣ አጠቃላይ የኮምፕሬሽን ሁነታውን **ለእያንዳንዱ combo** በተናጠል መተካት ይችላሉ፦

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "weights": { "taskFit": 0.5 },
    "modePack": "quality-first"
  },
  "compressionOverride": "aggressive"
}
```

ይህ ለሚከተሉት ጠቃሚ ነው፦

- **የኮዲንግ combo-ዎች**፦ ለረጅም ክፍለ ጊዜዎች `aggressive` ሁነታን ይጠቀሙ
- **ፈጣን የጥያቄና መልስ combo-ዎች**፦ ለፈጣን ምላሾች `lite` ሁነታን ይጠቀሙ
- **ብዙ መሣሪያዎችን የሚጠቀሙ combo-ዎች**፦ ከፍተኛውን ቁጠባ ለማግኘት `stacked` ሁነታን ይጠቀሙ
- **የፕሮዳክሽን combo-ዎች**፦ መሸጎጫን ለሚጠቀሙ አቅራቢዎች ልዩ ማስተካከያውን ያጥፉት — ሁልጊዜ የነቃው
  መሸጎጫን ከግምት ውስጥ የሚያስገባ ማስተካከያ `aggressive`/`ultra`ን በራስ-ሰር ወደ `standard` ዝቅ ያደርጋል
  (ሊመረጥ የሚችል `cache-aware` ሁነታ የለም)

---

## በተጨማሪ ይመልከቱ

- [የአካባቢ ውቅር](../reference/ENVIRONMENT.md) — የኮምፕሬሽን የአካባቢ ተለዋዋጮች
- [የሥነ ሕንፃ መመሪያ](../architecture/ARCHITECTURE.md) — የኮምፕሬሽን ቧንቧ መስመር ውስጣዊ አሠራር
- [የተጠቃሚ መመሪያ](../guides/USER_GUIDE.md) — ኮምፕሬሽንን መጠቀም ለመጀመር
- [RTK ኮምፕሬሽን](./RTK_COMPRESSION.md) — የRTK ማጣሪያዎች፣ የእምነት ሞዴል፣ የማረጋገጫ በር፣ ያልተቀነባበረ ውጤት መልሶ ማግኘት
- [የኮምፕሬሽን ሞተሮች](./COMPRESSION_ENGINES.md) — Caveman፣ RTK፣ stacked፣ APIs፣ MCP፣ ዳሽቦርድ
- [የኮምፕሬሽን ደንቦች ቅርጸት](./COMPRESSION_RULES_FORMAT.md) — የJSON rule-pack ቅርጸት
- [የኮምፕሬሽን ቋንቋ ጥቅሎች](./COMPRESSION_LANGUAGE_PACKS.md) — ለቋንቋ የተለዩ የCaveman ደንቦች
