# Developer environment notes (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../DEVELOPER-ENVIRONMENT.md) · 🇸🇦 [ar](../../ar/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇿 [az](../../az/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇬 [bg](../../bg/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇩 [bn](../../bn/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇿 [cs](../../cs/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇰 [da](../../da/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇪 [de](../../de/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇷 [el](../../el/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇸 [es](../../es/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇪 [et](../../et/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇷 [fa](../../fa/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇮 [fi](../../fi/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇷 [fr](../../fr/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇪 [ga](../../ga/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [gu](../../gu/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ha](../../ha/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇱 [he](../../he/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [hi](../../hi/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇷 [hr](../../hr/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇺 [hu](../../hu/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇲 [hy](../../hy/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇩 [id](../../id/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ig](../../ig/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇹 [it](../../it/docs/DEVELOPER-ENVIRONMENT.md) · 🇯🇵 [ja](../../ja/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇪 [ka](../../ka/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇭 [km](../../km/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [kn](../../kn/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇷 [ko](../../ko/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇹 [lt](../../lt/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇻 [lv](../../lv/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ml](../../ml/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [mr](../../mr/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇾 [ms](../../ms/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇹 [mt](../../mt/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇲 [my](../../my/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇵 [ne](../../ne/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇱 [nl](../../nl/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇴 [no](../../no/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [or](../../or/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [pa](../../pa/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇭 [phi](../../phi/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇱 [pl](../../pl/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇹 [pt](../../pt/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇴 [ro](../../ro/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇺 [ru](../../ru/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇰 [si](../../si/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇰 [sk](../../sk/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇮 [sl](../../sl/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇸 [sr](../../sr/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇪 [sv](../../sv/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇪 [sw](../../sw/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ta](../../ta/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [te](../../te/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇭 [th](../../th/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇷 [tr](../../tr/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇰 [ur](../../ur/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇿 [uz](../../uz/docs/DEVELOPER-ENVIRONMENT.md) · 🇻🇳 [vi](../../vi/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [yo](../../yo/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇼 [zh-TW](../../zh-TW/docs/DEVELOPER-ENVIRONMENT.md)

---

ይህ ገጽ የፕሮጀክቱን የአካባቢ `.env` ባህሪ እና OmniRouteን በማበልጸግ ጊዜ የአካባቢ ፋይሎችንና ሚስጥሮችን እንዴት መያዝ እንደሚገባ ያብራራል።

## የ.env postinstall ባህሪ

ፕሮጀክቱ ለገንቢዎች ምቾት በ`npm install` / `postinstall` ወቅት የአካባቢ `.env` ፋይል ሊፈጥር ይችላል። ይህ ፋይል ለአካባቢያዊ ልማትና ሙከራ ብቻ የታሰበ ሲሆን በፍጹም ወደ ስሪት ቁጥጥር መጨመር የለበትም።

ቁልፍ ነጥቦች፦

- የማከማቻ ስፍራው `.gitignore` አስቀድሞ `.env*` ፋይሎችን ችላ ይላል (`.gitignore` ግቤቱን ይመልከቱ)። አንድ የተወሰነ የምሳሌ ፋይል ለመጨመር ሆን ብለው ካላሰቡ እና ለዚህም በሰነድ የተደገፈ ሂደት ከሌለዎት፣ ያንን ደንብ አያስወግዱ ወይም አይቀይሩ።
- እውነተኛ ሚስጥር በአጋጣሚ ወደ repo ከተጨመረ፣ ማረጋገጫውን ወዲያውኑ ያድሱ/ይሰርዙ እና ከማከማቻ ስፍራው ታሪክ ያስወግዱት (ለምሳሌ፣ `git filter-repo`ን ወይም ተመጣጣኝ የማስተካከያ የሥራ ሂደት በመጠቀም)። እርዳታ ከፈለጉ የደህንነት/የዕውቂያ ኃላፊውን ያነጋግሩ።
- ለCI እና ለምርት አካባቢ፣ ሚስጥሮችን ወደ ፋይሎች ከመጨመር ይልቅ የCI ሚስጥሮችን ወይም የሚስጥር አስተዳዳሪን (GitHub Actions Secrets፣ Azure Key Vault፣ HashiCorp Vault፣ ወዘተ) ይጠቀሙ።

## የሚመከር የአካባቢ የሥራ ሂደት

- `.env`ን በአካባቢያዊ የሥራ ቦታዎ ውስጥ ብቻ ያቆዩ። የሚያስፈልጉ ተለዋዋጮችን እና ተቀባይነት ያላቸውን የምሳሌ እሴቶች ለመመዝገብ `.env.example`ን (አስቀድሞ በክትትል ላይ ያለ) ይጠቀሙ።
- ሚስጥር መሰል እሴቶችን የሚፈልጉ ሙከራዎችን በአካባቢዎ ሲያስኬዱ፣ ከእውነተኛ ማረጋገጫዎች ይልቅ ሰው ሠራሽ ቦታ ያዢዎችን ወይም በአሂድ ጊዜ የሚፈጠሩ ጊዜያዊ ቁልፎችን ይምረጡ።
- ገምጋሚዎች የሙከራ ውሂቡ ሰው ሠራሽ መሆኑን እንዲረዱ፣ ቦታ ያዢዎችን በሚጠቀሙ ሙከራዎች ውስጥ አጭር አስተያየት ያክሉ።

## የስካነር ማስታወሻዎች

- አንዳንድ የተቀናበሩ ወይም ሁለትዮሽ ሀብቶች (ለምሳሌ፣ የተካተቱ base64 WASM የውሂብ ስብስቦች) ማረጋገጫዎችን የሚመስሉ የASCII ንዑስ ሕብረቁምፊዎችን ሊይዙ እና በጽሑፍ ላይ የተመሠረቱ የሚስጥር ስካነሮችን ሊቀሰቅሱ ይችላሉ። እነዚህ ሀብቶች ሕጋዊ ከሆኑ፣ በስካነሩ የተፈቀዱ ዝርዝር ውስጥ ምልክት ያድርጉባቸው ወይም ማውጫዎቹን በስካነሩ ውቅር ውስጥ አያካትቱ።

## ፍንጣቂ ካገኙ

1. ቁልፉን ወዲያውኑ ያድሱ/ይሰርዙ።
2. ሚስጥሩን ከታሪኩ ያስወግዱ እና አስፈላጊ ከሆነ የጸዳውን branch በግዳጅ ይግፉ።
3. ጠባቂዎችን ያሳውቁ እና የድርጅትዎን የክስተት ምላሽ ማረጋገጫ ዝርዝር ይከተሉ።
