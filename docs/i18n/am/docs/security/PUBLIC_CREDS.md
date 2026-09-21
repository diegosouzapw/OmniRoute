# Public Credentials Handling (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../security/PUBLIC_CREDS.md) · 🇸🇦 [ar](../../../ar/docs/security/PUBLIC_CREDS.md) · 🇦🇿 [az](../../../az/docs/security/PUBLIC_CREDS.md) · 🇧🇬 [bg](../../../bg/docs/security/PUBLIC_CREDS.md) · 🇧🇩 [bn](../../../bn/docs/security/PUBLIC_CREDS.md) · 🇨🇿 [cs](../../../cs/docs/security/PUBLIC_CREDS.md) · 🇩🇰 [da](../../../da/docs/security/PUBLIC_CREDS.md) · 🇩🇪 [de](../../../de/docs/security/PUBLIC_CREDS.md) · 🇬🇷 [el](../../../el/docs/security/PUBLIC_CREDS.md) · 🇪🇸 [es](../../../es/docs/security/PUBLIC_CREDS.md) · 🇪🇪 [et](../../../et/docs/security/PUBLIC_CREDS.md) · 🇮🇷 [fa](../../../fa/docs/security/PUBLIC_CREDS.md) · 🇫🇮 [fi](../../../fi/docs/security/PUBLIC_CREDS.md) · 🇫🇷 [fr](../../../fr/docs/security/PUBLIC_CREDS.md) · 🇮🇪 [ga](../../../ga/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [gu](../../../gu/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ha](../../../ha/docs/security/PUBLIC_CREDS.md) · 🇮🇱 [he](../../../he/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [hi](../../../hi/docs/security/PUBLIC_CREDS.md) · 🇭🇷 [hr](../../../hr/docs/security/PUBLIC_CREDS.md) · 🇭🇺 [hu](../../../hu/docs/security/PUBLIC_CREDS.md) · 🇦🇲 [hy](../../../hy/docs/security/PUBLIC_CREDS.md) · 🇮🇩 [id](../../../id/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ig](../../../ig/docs/security/PUBLIC_CREDS.md) · 🇮🇹 [it](../../../it/docs/security/PUBLIC_CREDS.md) · 🇯🇵 [ja](../../../ja/docs/security/PUBLIC_CREDS.md) · 🇬🇪 [ka](../../../ka/docs/security/PUBLIC_CREDS.md) · 🇰🇭 [km](../../../km/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [kn](../../../kn/docs/security/PUBLIC_CREDS.md) · 🇰🇷 [ko](../../../ko/docs/security/PUBLIC_CREDS.md) · 🇱🇹 [lt](../../../lt/docs/security/PUBLIC_CREDS.md) · 🇱🇻 [lv](../../../lv/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ml](../../../ml/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [mr](../../../mr/docs/security/PUBLIC_CREDS.md) · 🇲🇾 [ms](../../../ms/docs/security/PUBLIC_CREDS.md) · 🇲🇹 [mt](../../../mt/docs/security/PUBLIC_CREDS.md) · 🇲🇲 [my](../../../my/docs/security/PUBLIC_CREDS.md) · 🇳🇵 [ne](../../../ne/docs/security/PUBLIC_CREDS.md) · 🇳🇱 [nl](../../../nl/docs/security/PUBLIC_CREDS.md) · 🇳🇴 [no](../../../no/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [or](../../../or/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [pa](../../../pa/docs/security/PUBLIC_CREDS.md) · 🇵🇭 [phi](../../../phi/docs/security/PUBLIC_CREDS.md) · 🇵🇱 [pl](../../../pl/docs/security/PUBLIC_CREDS.md) · 🇵🇹 [pt](../../../pt/docs/security/PUBLIC_CREDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/PUBLIC_CREDS.md) · 🇷🇴 [ro](../../../ro/docs/security/PUBLIC_CREDS.md) · 🇷🇺 [ru](../../../ru/docs/security/PUBLIC_CREDS.md) · 🇱🇰 [si](../../../si/docs/security/PUBLIC_CREDS.md) · 🇸🇰 [sk](../../../sk/docs/security/PUBLIC_CREDS.md) · 🇸🇮 [sl](../../../sl/docs/security/PUBLIC_CREDS.md) · 🇷🇸 [sr](../../../sr/docs/security/PUBLIC_CREDS.md) · 🇸🇪 [sv](../../../sv/docs/security/PUBLIC_CREDS.md) · 🇰🇪 [sw](../../../sw/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ta](../../../ta/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [te](../../../te/docs/security/PUBLIC_CREDS.md) · 🇹🇭 [th](../../../th/docs/security/PUBLIC_CREDS.md) · 🇹🇷 [tr](../../../tr/docs/security/PUBLIC_CREDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/PUBLIC_CREDS.md) · 🇵🇰 [ur](../../../ur/docs/security/PUBLIC_CREDS.md) · 🇺🇿 [uz](../../../uz/docs/security/PUBLIC_CREDS.md) · 🇻🇳 [vi](../../../vi/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [yo](../../../yo/docs/security/PUBLIC_CREDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/PUBLIC_CREDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/PUBLIC_CREDS.md)

---

> **የእውነት ዋና ምንጭ:** `open-sse/utils/publicCreds.ts`
> **ሙከራዎች:** `tests/unit/publicCreds.test.ts`
> **ለመጨረሻ ጊዜ የተዘመነው:** 2026-08-07 — v3.8.50
> **ታዳሚዎች:** በይፋዊ CLIs ውስጥ ይፋዊ OAuth client_id / client_secret / Firebase Web API ቁልፎችን የሚያቀርቡ አቅራቢዎችን የሚያዋህዱ መሐንዲሶች።
> **ሁኔታ:** የውጭ ምንጭ መለያዎችን ለሚክት አዲስ ኮድ ሁሉ **ግዴታ** ነው።

## ይህ ለምን አለ

- [OAuth 2.0 ለአገር በቀል መተግበሪያዎች (PKCE)](https://developers.google.com/identity/protocols/oauth2/native-app) — ለተጫኑ መተግበሪያዎች የOAuth client_id / client_secret ይፋዊ ናቸው፤ ትክክለኛውን ደህንነት PKCE ያቀርባል።
- [Firebase API ቁልፎች](https://firebase.google.com/docs/projects/api-keys) — Web ደንበኛ መለያዎች በንድፍ ይፋዊ ናቸው።

`.env` ያላዋቀሩ ተጠቃሚዎችም ያለተጨማሪ ውቅር የሚሠራ OAuth ፍሰት እንዲያገኙ OmniRoute እነዚህን እሴቶች በውስጡ ማካተት አለበት። በውስጡ የተካተተ ተተኪ እሴት ከሌለ፣ “clone ብቻ አድርገው ያስኪዱ” የሚለውን መንገድ ለሚከተሉ ተጠቃሚዎች ሁሉ Gemini / Antigravity አቅራቢዎች መሥራት ያቆማሉ።

ሆኖም፣ እንደ `AIzaSy…`፣ `GOCSPX-…`፣ `…apps.googleusercontent.com` ያሉ ቀጥተኛ እሴቶች በ**GitHub Secret Scanning**፣ **Semgrep** እና ተመሳሳይ የስርዓተ ጥለት ስካነሮች ይዛመዳሉ። እያንዳንዱ ልቀት ብዙ የሐሰት አዎንታዊ ማንቂያዎች ያሉበት የሚያውክ ፍሰት ይሆናል፣ push protection ሕጋዊ commitsን ያግዳል፣ እና ኦፕሬተሮች የማንቂያ ፍሰቱን ማመን ያቆማሉ።

የ`open-sse/utils/publicCreds.ts` ረዳት ሁለቱንም ገደቦች በአንድ ጊዜ ይፈታል፦

- ይፋዊ መለያውን እንደ **XOR የተሸፈነ የባይት ቅደም ተከተል** በውስጡ ያካትታል (በምንጭ ኮድ ውስጥ የስካነር ስርዓተ ጥለት አይኖርም)።
- በሂደት ጊዜ `decodePublicCred` / `resolvePublicCred` በመጠቀም ዲኮድ ያደርጋል።
- ታዋቂ ቅድመ ቅጥያዎችን (`AIza`፣ `GOCSPX-`፣ `<digits>-<32hex>.apps.googleusercontent.com`፣ `Iv1.<hex>`) አስቀድመው የሚከተሉ ጥሬ እሴቶችን ይለያል እና ሳይለውጣቸው ያስተላልፋል፤ በዚህም በነባር `.env` ውስጥ ጥሬ እሴቶች ያሏቸው ተጠቃሚዎች **ምንም ፍልሰት ሳያስፈልጋቸው** መጠቀማቸውን ይቀጥላሉ።

ይህ **ማደብዘዝ እንጂ ምስጠራ አይደለም።** ምንጩን የሚያነብ ማንኛውም ሰው እሴቱን መልሶ ማግኘት ይችላል — እሴቱ በንድፍ ይፋዊ ስለሆነ ይህ ችግር የለውም። ብቸኛው ግብ ከስካነር regex ማዛመጃዎች መራቅ ነው።

## ግዴታዊው ስርዓተ ጥለት

### 1. አዲስ ይፋዊ ማረጋገጫ ማከል

የሚከተሉትን የሚያሟላ አዲስ በውጭ ምንጭ የቀረበ እሴት በውስጥ ማካተት ሲያስፈልግዎት፦

- ከይፋዊ CLI / ዴስክቶፕ መተግበሪያ / የአሳሽ bundle የመጣ፣ **እና**
- የውጭ ምንጩ አቅራቢ እንደ ይፋዊ ደንበኛ መለያ የሚመዘግበው (ወይም የሚቆጥረው)፣ **እና**
- ያለበለዚያ የስርዓተ ጥለት ስካነር የሚያዛምደው (`AIza…`፣ `GOCSPX-…`፣ `<digits>-…apps.googleusercontent.com`፣ ወዘተ)፣

…ይህን የማረጋገጫ ዝርዝር ይከተሉ፦

1. የተሸፈነውን የባይት ቅደም ተከተል ይፍጠሩ፦

   ```bash
   node --import tsx/esm -e \
     'import("./open-sse/utils/publicCreds.ts").then(m =>
        console.log(JSON.stringify(Array.from(
          Buffer.from(m.encodePublicCred("THE_PUBLIC_VALUE"), "base64")
        ))))'
   ```

2. በ`open-sse/utils/publicCreds.ts` ውስጥ ወደ `EMBEDDED_DEFAULTS` **ገለልተኛ የቁልፍ ስም** (`<provider>_id`፣ `<provider>_alt`፣ `<provider>_fb`፣ ወዘተ) ያለው አዲስ ግቤት ያክሉ። በረዳቱ ውስጥ እንደ `client_secret` ወይም `api_key` ያሉ ስሞችን **አይጠቀሙ** — እነዚህ ቃላት የSemgrep generic-secret ደንቦችን ያስነሳሉ።

3. `keyof typeof EMBEDDED_DEFAULTS` ወደ ይፋዊው type union ያክሉ (ይህ በራስ-ሰር ይገመታል)።

4. በተጠቃሚው ኮድ ውስጥ ጠንካራ ኮድ የተደረገውን ቀጥተኛ እሴት በሚከተለው ይተኩ፦

   ```ts
   // ነጠላ የenv ተተኪ እሴት
   clientSecret: resolvePublicCred("provider_alt", "PROVIDER_OAUTH_CLIENT_SECRET"),

   // በርካታ የenv ተለዋጭ ስሞች (የመጀመሪያው ባዶ ያልሆነ ያሸንፋል)
   clientId: resolvePublicCredMulti("provider_id", [
     "PROVIDER_CLI_OAUTH_CLIENT_ID",
     "PROVIDER_OAUTH_CLIENT_ID",
   ]),

   // የenv ተተኪ እሴት የለም (ሁልጊዜ በውስጡ የተካተተው ነባሪ)
   firebaseApiKey: resolvePublicCred("provider_fb"),
   ```

5. ቀጥተኛውን እሴት ከ`.env.example` ያስወግዱ (አንባቢዎችን ወደዚህ በሚመራ አስተያየት-ብቻ ሰነድ ይተኩት)፦

   ```dotenv
   # ── አቅራቢ (Google / Firebase / ወዘተ) ──
   # ይፋዊ OAuth ማረጋገጫዎች በ
   # open-sse/utils/publicCreds.ts በኩል በኮዱ ውስጥ ተካተዋል። የራስዎን ለመጠቀም ብቻ እነዚህን vars ያዋቅሩ።
   # PROVIDER_OAUTH_CLIENT_ID=
   # PROVIDER_OAUTH_CLIENT_SECRET=
   ```

6. ለአዲሱ ቁልፍ የቅርጽ ማረጋገጫ ለመጨመር `tests/unit/publicCreds.test.ts`ን ያዘምኑ (ቀጥተኛውን እሴት ሳይሆን ቅርጸቱን ያረጋግጡ — ለስርዓተ ጥለቱ ነባር ሙከራዎችን ይመልከቱ)።

7. የ`AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` ቀጥተኛ እሴቶችን ወደ ሙከራ ፋይሎች **በፍጹም** አይጨምሩ። ከ`.join("")` ቁርጥራጮች የተገነቡትን `FAKE_*` constants ይጠቀሙ (ነባር ሙከራዎችን ይመልከቱ)።

### 2. ተጠቃሚዎች

- **ከ`resolvePublicCred()` / `resolvePublicCredMulti()` ብቻ ያንብቡ** — ከረዳቱ ውጭ `decodePublicCredBytes()`ን በቀጥታ በፍጹም አይጥሩ።
- ረዳቱ ሆን ተብሎ ቀላል ነው (ቀጥተኛ የባይት XOR) እና በmodule-load ጊዜ ለመጥራት ደህንነቱ የተጠበቀ ነው፤ ነባሪ እሴቶች አንድ ጊዜ ይሰላሉ።
- የenv ተተኪ እሴት ሁልጊዜ ቅድሚያ ያገኛል። አንድ ተጠቃሚ `PROVIDER_OAUTH_CLIENT_SECRET=GOCSPX-myown` ካዋቀረ፣ ረዳቱ ያንን ጥሬ እሴት ሳይለውጠው ያስተላልፋል።

### 3. የተከለከሉ ስርዓተ ጥለቶች

❌ በምርት ኮድ (`src/`፣ `open-sse/`፣ `electron/`፣ `bin/`) ውስጥ ከሚከተሉት **አንዱንም በፍጹም** አያድርጉ፦

```ts
// መጥፎ፦ ቀጥተኛ እሴት Secret Scanning + Semgrepን ያስነሳል
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET || "GOCSPX-realvalue",

// መጥፎ፦ የቀጥተኛው እሴት base64 — GitHub ከFeb/2025 ጀምሮ አሁንም ያገኘዋል
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET ||
  Buffer.from("R09DU1BYLXJlYWx2YWx1ZQ==", "base64").toString(),

// መጥፎ፦ በሂደት ጊዜ ስርዓተ ጥለቱን እንደገና የሚገጣጥም የሕብረቁምፊ ማጣመር
clientSecret: "GO" + "CS" + "PX-" + "realvalue",

// መጥፎ፦ hex/ROT13 encoding — የተለየ ማደብዘዝ፣ ተመሳሳይ የመገኘት አደጋ
clientSecret: hexDecode("474f4353..."),
```

እነዚህ ሁሉ በመጨረሻ ስካነርን ያስነሳሉ። `resolvePublicCred()`ን ይጠቀሙ።

❌ ቀጥተኛ ማረጋገጫዎችን ወደ `.env.example` **በፍጹም** አይጨምሩ። እውነተኛ የውጭ ምንጭ እሴቶች የሚያስፈልጓቸው ተጠቃሚዎች ከይፋዊው CLI ራሳቸው ማውጣት ወይም የራሳቸውን OAuth ምዝገባ መጠቀም ይችላሉ።

❌ ማረጋገጫው ወደዚህ ረዳት መዛወር እንዳለበት መጀመሪያ ሳያረጋግጡ አዲስ የsecret-scanning ማንቂያን **በፍጹም** ችላ አይበሉ።

## ተዛማጅ መቆጣጠሪያዎች

- በ`publicCreds.ts` ውስጥ ያለው `RAW_VALUE_PATTERN` ያለ ለውጥ እንዲያልፉ የሚያደርጉ ቅድመ ቅጥያዎችን ይዘረዝራል (ከቀድሞ ስሪቶች ጋር ለተኳኋኝነት)። ለሰነድ የቀረቡ የይፋ ማረጋገጫ መረጃ ቅርጸቶች ብቻ ያስፋፉት፤ ለባለቤትነት ሚስጥሮች ፈጽሞ አያስፋፉት።
- `.env.example` በCI `check-env-doc-sync` ስክሪፕት ውስጥ ይገኛል — ከዚህ አንድ ተለዋዋጭ ሲያስወግዱ፣ ሰነዶቹ ከለውጡ ጋር መዛመዳቸውን ያረጋግጡ።
- የ`npm run test:vitest` እና `node --import tsx/esm --test tests/unit/publicCreds.test.ts` የሙከራ ስብስቦች ሁለቱም ማለፋቸውን መቀጠል አለባቸው።

## ይህን ረዳት መጠቀም የሌለብዎት ጊዜ

ይህ ረዳት **ብቻ** የሚከተሉትን መስፈርቶች ለሚያሟሉ የማረጋገጫ መረጃዎች ነው፦

1. በዋናው አቅራቢ በይፋ የሚሰራጩ (CLI ባይነሪ፣ የአሳሽ ቅንብር፣ ይፋዊ ሰነዶች)።
2. ሚስጥራዊ እንዳልሆኑ በሰነድ የተገለጹ ወይም በጠንካራ ሁኔታ የተመለከቱ (በPKCE የተጠበቁ፣ Firebase Web key፣ ወይም ተመሳሳይ)።

ለሌሎች ሁሉ — በኦፕሬተር የሚሰጡ ቶከኖች፣ የእያንዳንዱ ተከራይ ሚስጥሮች፣ የራስዎ OAuth መተግበሪያ `client_secret`፣ የምስጠራ ቁልፎች፣ JWT ሚስጥሮች፣ የውሂብ ጎታ የይለፍ ቃላት — **የአካባቢ ተለዋዋጮችን ብቻ** ይጠቀሙ (`process.env.FOO`፣ `||` ወደ ባዶ እሴት መመለስ / ግልጽ ስህተት)። እነዚህ በምንጭ ኮድ ውስጥ ሳይሆን በ`.env` እና በ[የተመሰጠረ የማረጋገጫ መረጃ ማከማቻ](./COMPLIANCE.md) ውስጥ መቀመጥ አለባቸው።

## ማጣቀሻዎች

- [Google፦ OAuth 2.0 ለኔቲቭ መተግበሪያዎች](https://developers.google.com/identity/protocols/oauth2/native-app)
- [Firebase፦ ለደንበኛ መለያ API ቁልፎች](https://firebase.google.com/docs/projects/api-keys)
- [በGitHub Secret Scanning የሚደገፉ ሚስጥሮች](https://docs.github.com/en/code-security/secret-scanning/introduction/supported-secret-scanning-patterns)
- [GitHub፦ ለቶከኖች base64 ማወቂያ (የካቲት 2025)](https://github.blog/changelog/2025-02-14-secret-scanning-detects-base64-encoded-github-tokens/)
- ይህን ረዳት ያስተዋወቀው commit፦ `1a39c31f` — _fix(security): ይፋዊ የዋና አቅራቢ ማረጋገጫ መረጃዎችን ደብቅ + የስህተት ማጽዳትን ማዕከላዊ አድርግ_
