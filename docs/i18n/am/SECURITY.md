# Security Policy (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../SECURITY.md) · 🇸🇦 [ar](../ar/SECURITY.md) · 🇦🇿 [az](../az/SECURITY.md) · 🇧🇬 [bg](../bg/SECURITY.md) · 🇧🇩 [bn](../bn/SECURITY.md) · 🇧🇦 [bs](../bs/SECURITY.md) · 🇨🇿 [cs](../cs/SECURITY.md) · 🇩🇰 [da](../da/SECURITY.md) · 🇩🇪 [de](../de/SECURITY.md) · 🇬🇷 [el](../el/SECURITY.md) · 🇪🇸 [es](../es/SECURITY.md) · 🇪🇪 [et](../et/SECURITY.md) · 🇮🇷 [fa](../fa/SECURITY.md) · 🇫🇮 [fi](../fi/SECURITY.md) · 🇫🇷 [fr](../fr/SECURITY.md) · 🇮🇪 [ga](../ga/SECURITY.md) · 🇮🇳 [gu](../gu/SECURITY.md) · 🇳🇬 [ha](../ha/SECURITY.md) · 🇮🇱 [he](../he/SECURITY.md) · 🇮🇳 [hi](../hi/SECURITY.md) · 🇭🇷 [hr](../hr/SECURITY.md) · 🇭🇺 [hu](../hu/SECURITY.md) · 🇦🇲 [hy](../hy/SECURITY.md) · 🇮🇩 [id](../id/SECURITY.md) · 🇳🇬 [ig](../ig/SECURITY.md) · 🇮🇹 [it](../it/SECURITY.md) · 🇯🇵 [ja](../ja/SECURITY.md) · 🇬🇪 [ka](../ka/SECURITY.md) · 🇰🇭 [km](../km/SECURITY.md) · 🇮🇳 [kn](../kn/SECURITY.md) · 🇰🇷 [ko](../ko/SECURITY.md) · 🇱🇹 [lt](../lt/SECURITY.md) · 🇱🇻 [lv](../lv/SECURITY.md) · 🇮🇳 [ml](../ml/SECURITY.md) · 🇮🇳 [mr](../mr/SECURITY.md) · 🇲🇾 [ms](../ms/SECURITY.md) · 🇲🇹 [mt](../mt/SECURITY.md) · 🇲🇲 [my](../my/SECURITY.md) · 🇳🇵 [ne](../ne/SECURITY.md) · 🇳🇱 [nl](../nl/SECURITY.md) · 🇳🇴 [no](../no/SECURITY.md) · 🇮🇳 [or](../or/SECURITY.md) · 🇮🇳 [pa](../pa/SECURITY.md) · 🇵🇭 [phi](../phi/SECURITY.md) · 🇵🇱 [pl](../pl/SECURITY.md) · 🇵🇹 [pt](../pt/SECURITY.md) · 🇧🇷 [pt-BR](../pt-BR/SECURITY.md) · 🇷🇴 [ro](../ro/SECURITY.md) · 🇷🇺 [ru](../ru/SECURITY.md) · 🇱🇰 [si](../si/SECURITY.md) · 🇸🇰 [sk](../sk/SECURITY.md) · 🇸🇮 [sl](../sl/SECURITY.md) · 🇷🇸 [sr](../sr/SECURITY.md) · 🇸🇪 [sv](../sv/SECURITY.md) · 🇰🇪 [sw](../sw/SECURITY.md) · 🇮🇳 [ta](../ta/SECURITY.md) · 🇮🇳 [te](../te/SECURITY.md) · 🇹🇭 [th](../th/SECURITY.md) · 🇹🇷 [tr](../tr/SECURITY.md) · 🇺🇦 [uk-UA](../uk-UA/SECURITY.md) · 🇵🇰 [ur](../ur/SECURITY.md) · 🇺🇿 [uz](../uz/SECURITY.md) · 🇻🇳 [vi](../vi/SECURITY.md) · 🇳🇬 [yo](../yo/SECURITY.md) · 🇨🇳 [zh-CN](../zh-CN/SECURITY.md) · 🇹🇼 [zh-TW](../zh-TW/SECURITY.md)

---

## የተጋላጭነት ሪፖርት ማድረግ

በOmniRoute ውስጥ የደህንነት ተጋላጭነት ካገኙ፣ እባክዎ በኃላፊነት ሪፖርት ያድርጉት፦

1. ይፋዊ የGitHub ጉዳይ **አይክፈቱ**
2. [GitHub Security Advisories](https://github.com/diegosouzapw/OmniRoute/security/advisories/new)ን ይጠቀሙ
3. የሚከተሉትን ያካትቱ፦ መግለጫ፣ እንደገና ለማሳየት የሚያስችሉ ደረጃዎች እና ሊኖር የሚችል ተፅዕኖ

## የምላሽ ጊዜ ሰሌዳ

| ደረጃ         | ዒላማ              |
| ----------- | ---------------- |
| ማረጋገጫ       | 48 ሰዓታት          |
| ምደባ እና ግምገማ | 5 የሥራ ቀናት        |
| የማስተካከያ ልቀት | 14 የሥራ ቀናት (ወሳኝ) |

## የሚደገፉ ስሪቶች

| ስሪት     | የድጋፍ ሁኔታ                                    |
| ------- | ------------------------------------------- |
| 3.9.x   | 🗓️ የታቀደ — LTS መስመር (`stable/v3`)፣ ከታች ይመልከቱ |
| 3.8.x   | ✅ ንቁ                                       |
| 3.7.x   | ✅ የደህንነት                                   |
| < 3.7.0 | ❌ የማይደገፍ                                   |

## የLTS ድጋፍ ጊዜ መስኮት (v3.9.x)

ከ3.8.59 በኋላ ቀጣዩ ስሪት **3.9.0** ሲሆን፣ ይህም በ
`stable/v3` ቅርንጫፍ ላይ የረጅም ጊዜ ድጋፍ መስመሩን ይከፍታል ([`ROADMAP.md`](ROADMAP.md) → "ደረጃ 3 — v3.9.0 LTS"ን ይመልከቱ)።

- **`stable/v3` የሚቀበለው፦** የሳንካ ማስተካከያዎች፣ የደህንነት ማስተካከያዎች እና የአቅራቢ ዝማኔዎች። አዳዲስ
  ባህሪያት ወደ v4 ቻናል ይሄዳሉ፤ የLTS መስመሩ ለመረጋጋት ቅድሚያ ይሰጣል። `npm install omniroute`
  (የ`latest` dist-tag) በጠቅላላው የv4 ዑደት ውስጥ በv3 ላይ ይቆያል።
- **የጊዜ መስኮቱ ቆይታ፦** `<T-GAP-3: የባለቤቱ ውሳኔ በመጠባበቅ ላይ — ROADMAP.mdን ይመልከቱ>`። ከv4.0 GA በኋላ
  (`latest` ወደ v4 ሲቀየር) ያለው የጊዜ መስኮት ርዝመት **እስካሁን አልተወሰነም**፤ ጠባቂው
  ሲያሳውቀው ይህ ክፍል ይዘምናል። እስከዚያ ድረስ የማብቂያ ቀን አለው ብለው አያስቡ።
- **በLTS መስመር ውስጥ ተጋላጭነትን ሪፖርት ማድረግ፦** እንደማንኛውም ሌላ ስሪት ተመሳሳይ ቻናል —
  የግል [GitHub Security Advisory](https://github.com/diegosouzapw/OmniRoute/security/advisories/new)ን ይጠቀሙ፣
  ይፋዊ ጉዳይን ፈጽሞ አይጠቀሙ። የትኛውን ስሪት እንደፈተኑ ይግለጹ (ለምሳሌ `3.9.2`)፤ ማስተካከያዎች በ
  `stable/v3` ላይ ይገባሉ እና ወደ v4 ይተላለፋሉ።
- **በLTS መቁረጫ ጊዜ ያለው የደህንነት መነሻ መስፈርት፦** የተለካው የስካነር ሁኔታ፣ የመስመር ጠባቂ እና
  የይፋዊ ማረጋገጫ መረጃ ማስረጃዎች በ
  [`docs/security/LTS_SECURITY_BASELINE.md`](docs/security/LTS_SECURITY_BASELINE.md) ውስጥ ተመዝግበዋል።

---

## የደህንነት አርክቴክቸር

OmniRoute ባለብዙ ንብርብር የደህንነት ሞዴልን ተግባራዊ ያደርጋል፦

```
ጥያቄ → CORS → የAuthz ሂደት (መመደብ → ፖሊሲዎች → ማስፈጸም)
       → መከላከያዎች (የPII ሸፋኝ፣ የፕሮምፕት ጣልቃ ገብነት፣ የምስል ድልድይ)
       → የፍጥነት ገዳቢ → የወረዳ ቆራጭ → የማቀዝቀዣ ጊዜ → የሞዴል እገዳ → አቅራቢ
```

### 🔐 ማንነት ማረጋገጥ እና ፈቃድ መስጠት

| ባህሪ                    | አተገባበር                                                                                                                              |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **የዳሽቦርድ መግቢያ**        | የይለፍ ቃልን መሠረት ያደረገ ማንነት ማረጋገጫ ከJWT ቶከኖች (HttpOnly ኩኪዎች) ጋር                                                                          |
| **የAPI ቁልፍ ማረጋገጫ**     | በHMAC የተፈረሙ ቁልፎች ከCRC ማረጋገጫ ጋር                                                                                                      |
| **OAuth 2.0 + PKCE**   | ለአቅራቢ የተለየ የአሳሽ/መሣሪያ OAuth፣ በሚደገፍበት ቦታ PKCEን ይጠቀማል፤ ለማስመጣት ብቻ የሚያገለግሉ የDevin ማረጋገጫዎች ለየብቻ ይስተናገዳሉ።                                  |
| **ቶከን ማደስ**            | ከማብቂያው በፊት ራስ-ሰር የOAuth ቶከን ማደስ                                                                                                     |
| **ደህንነታቸው የተጠበቁ ኩኪዎች** | ለHTTPS አካባቢዎች `AUTH_COOKIE_SECURE=true`                                                                                             |
| **የAuthz ሂደት**         | የመስመር ምደባ (PUBLIC / CLIENT_API / MANAGEMENT) — `docs/architecture/AUTHZ_GUIDE.md`ን ይመልከቱ                                            |
| **የመስመር ጠባቂ ደረጃዎች**    | ለአስተዳደር መስመሮች ባለ3-ደረጃ ሞዴል (LOCAL_ONLY / ALWAYS_PROTECTED / MANAGEMENT) — `docs/security/ROUTE_GUARD_TIERS.md`ን ይመልከቱ                |
| **የManage-Scope MCP**  | የርቀት `/api/mcp/*` መዳረሻ `manage` ወሰን ባላቸው የAPI ቁልፎች የተገደበ ነው፤ `/api/cli-tools/runtime/*` በጥብቅ ሉፕባክ ላይ ይቆያል። ROUTE_GUARD_TIERSን ይመልከቱ |
| **የMCP ወሰኖች**          | 32 ዝርዝር ወሰኖች (read:health, write:combos, execute:completions, ወዘተ) — `docs/frameworks/MCP-SERVER.md`ን ይመልከቱ                         |

### 🛡️ በማከማቻ ጊዜ ምስጠራ

በSQLite ውስጥ የተከማቸው ሁሉም ስሱ ውሂብ፣ ከscrypt ቁልፍ ማመንጫ ጋር **AES-256-GCM**ን በመጠቀም ይመሰጠራል፦

- የAPI ቁልፎች፣ የመዳረሻ ቶከኖች፣ የማደሻ ቶከኖች እና የመታወቂያ ቶከኖች
- ስሪት ያለው ቅርጸት፦ `enc:v1:<iv>:<ciphertext>:<authTag>`
- `STORAGE_ENCRYPTION_KEY` ካልተዋቀረ የማለፊያ ሁነታ (ያልተመሰጠረ ጽሑፍ)

```bash
# የምስጠራ ቁልፍ ይፍጠሩ፦
STORAGE_ENCRYPTION_KEY=$(openssl rand -hex 32)
```

### 🛡️ የመከላከያዎች ማዕቀፍ

OmniRoute በቅድሚያ የተደረደሩ 3 አብረው የተካተቱ መከላከያዎች ያሉት፣ በቀጥታ ዳግም ሊጫን የሚችል **የመከላከያዎች መዝገብ** (`src/lib/guardrails/`) ይዞ ይመጣል፦

| መከላከያ              | ቅድሚያ | ዓላማ                                                                   |
| ------------------ | ---- | --------------------------------------------------------------------- |
| `vision-bridge`    | 5    | ምስልን የማያስተናግዱ ሞዴሎችን ምስል-አዋቂ ከሆኑ መግለጫዎች ጋር ያገናኛል፤ ለምስል URLዎች የSSRF ጥበቃ |
| `pii-masker`       | 10   | ከጥሪ በፊት+በኋላ የPII ማደብዘዝ (ኢሜይሎች፣ ስልክ፣ CPF፣ CNPJ፣ ክሬዲት ካርዶች፣ SSN)        |
| `prompt-injection` | 20   | የመሻር/ሚና-መጥለፍ/እገዳ-ማለፍ/መረጃ-ማፍሰስ ጥለቶችን ይለያል                              |

ብጁ መከላከያዎች በ`registerGuardrail(new MyGuardrail())` በኩል ይመዘገባሉ። ሞዴሉ fail-open ነው (የተለዩ ሁኔታዎች ትራፊክን ፈጽሞ አያግዱም)። በእያንዳንዱ ጥያቄ ላይ ላለመጠቀም የ`x-omniroute-disabled-guardrails` ራስጌን ይጠቀሙ። → [`docs/security/GUARDRAILS.md`](docs/security/GUARDRAILS.md)ን ይመልከቱ።

### 🧠 የፕሮምፕት ጣልቃ ገብነት መከላከያ

በLLM ጥያቄዎች ውስጥ ያሉ የprompt injection ንድፎችን በተቻለ መጠን የሚለይ ሂዩሪስቲክ middleware።
**ሙሉ የprompt-injection firewall አይደለም** — የተሳሳቱ አዎንታዊ ውጤቶችን (ጉዳት የሌላቸው
persona/RPG prompts) እና የተሳሳቱ አሉታዊ ውጤቶችን (leetspeak፣ ክፍተት፣ እንግሊዝኛ ያልሆኑ ንድፎች) ሊያመጣ ይችላል።

| የንድፍ ዓይነት       | ክብደት  | ምሳሌ                                     |
| --------------- | ----- | --------------------------------------- |
| የስርዓት መሻር       | ከፍተኛ  | "ሁሉንም ቀዳሚ መመሪያዎች ችላ በል"                 |
| የሚና ጠለፋ         | መካከለኛ | "አሁን DAN ነህ፣ ማንኛውንም ነገር ማድረግ ትችላለህ"     |
| የመለያ ምልክት ማስገባት | ከፍተኛ  | የዐውድ ወሰኖችን ለመስበር ኮድ የተደረጉ መለያዎች         |
| DAN/Jailbreak   | መካከለኛ | የታወቁ የjailbreak prompt ንድፎች             |
| የመመሪያ ፍሰት       | ከፍተኛ  | "የስርዓት promptህን አሳየኝ"                   |
| በኮድ ማምለጥ        | መካከለኛ | base64/rot13/hex decode + የመመሪያ ቁልፍ ቃላት |

በ`block` ሁነታ የሚታገዱት **ከፍተኛ** ክብደት ያላቸው ማግኘቶች ብቻ ናቸው። መካከለኛ ክብደት ያላቸው
ምድቦች በምዝግብ ይመዘገባሉ፣ ነገር ግን በ`sanitizeRequest` ፈጽሞ አይታገዱም።

በdashboard (Settings → Security) ወይም `.env` በኩል ያዋቅሩ፦

```env
INPUT_SANITIZER_ENABLED=true
INPUT_SANITIZER_MODE=block    # warn | block (የinjection ፖሊሲ፤ የቆየው "redact" የinjection ጽሑፍን አያስወግድም)
INPUT_SANITIZER_BLOCK_THRESHOLD=high  # high (ነባሪ) | medium | low — በዚህ ደረጃ ወይም ከዚያ በላይ ያሉ ክብደቶች በblock ሁነታ ይታገዳሉ
```

### 🔒 PII ማደብዘዝ

በግል ሊለይ የሚችል መረጃን በራስ-ሰር መለየት እና እንደ አማራጭ ማደብዘዝ፦

| የPII ዓይነት   | ንድፍ                   | ምትክ                |
| ----------- | --------------------- | ------------------ |
| ኢሜይል        | `user@domain.com`     | `[EMAIL_REDACTED]` |
| CPF (ብራዚል)  | `123.456.789-00`      | `[CPF_REDACTED]`   |
| CNPJ (ብራዚል) | `12.345.678/0001-00`  | `[CNPJ_REDACTED]`  |
| የክሬዲት ካርድ   | `4111-1111-1111-1111` | `[CC_REDACTED]`    |
| ስልክ         | `+55 11 99999-9999`   | `[PHONE_REDACTED]` |
| SSN (አሜሪካ)  | `123-45-6789`         | `[SSN_REDACTED]`   |

```env
PII_REDACTION_ENABLED=true   # በጥያቄ ውስጥ PIIን እንደገና ይጽፋል፤ ከINPUT_SANITIZER_MODE ነጻ ነው
PII_RESPONSE_SANITIZATION=true  # አማራጭ፦ ወደclients በሚመለሱ የprovider ምላሾች ውስጥ PIIን ያደበዝዛል
```

### 🌐 የኔትወርክ ደህንነት

| ባህሪ                           | መግለጫ                                                                    |
| ----------------------------- | ----------------------------------------------------------------------- |
| **CORS**                      | ግልጽ የcross-origin የፈቃድ ዝርዝር (`CORS_ALLOWED_ORIGINS`፤ የቆየ `CORS_ORIGIN`) |
| **IP ማጣሪያ**                   | በdashboard ውስጥ የፈቃድ ዝርዝር/የእገዳ ዝርዝር IP ክልሎች                              |
| **የጥያቄ መጠን ገደብ**              | ለእያንዳንዱ provider የጥያቄ መጠን ገደቦች፣ ከራስ-ሰር backoff ጋር                       |
| **የAnti-Thundering Herd ጥበቃ** | Mutex + ለእያንዳንዱ connection መቆለፍ ተከታታይ 502 ስህተቶችን ይከላከላል                 |
| **TLS Fingerprint**           | የbot ልየታን ለመቀነስ አሳሽ መሰል TLS fingerprint spoofing                        |
| **CLI Fingerprint**           | ከnative CLI signatures ጋር ለማዛመድ ለእያንዳንዱ provider የheader/body ቅደም ተከተል  |

### 🔌 የመቋቋም አቅም እና ተደራሽነት

| ባህሪ                     | መግለጫ                                                        |
| ----------------------- | ----------------------------------------------------------- |
| **Circuit Breaker**     | ለእያንዳንዱ provider ባለ3-ሁኔታ (ዝግ → ክፍት → ግማሽ-ክፍት)፣ በSQLite የሚቆይ |
| **የጥያቄ Idempotency**    | ለተደጋጋሚ ጥያቄዎች የ5 ሰከንድ የብዜት ማስወገጃ መስኮት                        |
| **Exponential Backoff** | እየጨመረ በሚሄድ መዘግየት ራስ-ሰር ዳግም ሙከራ                              |
| **የጤና Dashboard**       | የprovider ጤናን በቅጽበት መከታተል                                   |

### 📋 ተገዢነት

| ባህሪ              | መግለጫ                                                   |
| ---------------- | ------------------------------------------------------ |
| **የምዝግብ ማቆያ**    | ከ`CALL_LOG_RETENTION_DAYS` በኋላ ራስ-ሰር ማጽዳት              |
| **ምዝግብ-አልባ መውጫ** | ለእያንዳንዱ API key ያለው `noLog` flag የጥያቄ ምዝገባን ያሰናክላል     |
| **የኦዲት ምዝግብ**    | አስተዳደራዊ ድርጊቶች በ`audit_log` table ውስጥ ይከታተላሉ            |
| **MCP ኦዲት**      | ለሁሉም MCP tool calls በSQLite የተደገፈ የኦዲት ምዝገባ            |
| **Zod ማረጋገጫ**    | ሁሉም የAPI ግብዓቶች module በሚጫንበት ጊዜ በZod v4 schemas ይረጋገጣሉ |

---

## አስፈላጊ የአካባቢ ተለዋዋጮች

ሰርቨሩን ከማስጀመርዎ በፊት ሁሉም ሚስጥራዊ እሴቶች መዘጋጀት አለባቸው። ከጎደሉ ወይም ደካማ ከሆኑ ሰርቨሩ **ወዲያውኑ አይሰራም**።

```bash
# አስፈላጊ — እነዚህ ከሌሉ ሰርቨሩ አይጀምርም፦
JWT_SECRET=$(openssl rand -base64 48)     # ቢያንስ 32 ቁምፊዎች
API_KEY_SECRET=$(openssl rand -hex 32)    # ቢያንስ 16 ቁምፊዎች

# የሚመከር — የተከማቸ ውሂብ ምስጠራን ያነቃል፦
STORAGE_ENCRYPTION_KEY=$(openssl rand -hex 32)
```

ሰርቨሩ እንደ `changeme`፣ `secret` ወይም `password` ያሉ ደካማ መሆናቸው የሚታወቅ እሴቶችን በቀጥታ ውድቅ ያደርጋል።

---

## የDocker ደህንነት

- በምርት አካባቢ non-root ተጠቃሚን ይጠቀሙ
- ሚስጥራዊ እሴቶችን ለንባብ ብቻ እንደሚፈቀድ ቮልዩም ያገናኙ
- `.env` ፋይሎችን ወደ Docker ምስሎች በፍጹም አይቅዱ
- ሚስጥራዊ ፋይሎችን ለማግለል `.dockerignore`ን ይጠቀሙ
- ከHTTPS በስተጀርባ ሲጠቀሙ `AUTH_COOKIE_SECURE=true`ን ያዘጋጁ

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --read-only \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e JWT_SECRET="$(openssl rand -base64 48)" \
  -e API_KEY_SECRET="$(openssl rand -hex 32)" \
  -e STORAGE_ENCRYPTION_KEY="$(openssl rand -hex 32)" \
  diegosouzapw/omniroute:latest
```

---

## ጥገኞች

- `npm audit`ን በመደበኛነት ያሂዱ (`npm run audit:deps` ዋናውን + electronን ይሸፍናል)
- ጥገኞችን ወቅታዊ አድርገው ይያዙ
- ፕሮጀክቱ ለቅድመ-commit ማረጋገጫዎች `husky` + `lint-staged`ን ይጠቀማል (lint-staged + check-docs-sync + check:any-budget:t11)
- የCI ሂደቱ በእያንዳንዱ push ላይ የESLint ደህንነት ደንቦችን ያስኬዳል (`no-eval`፣ `no-implied-eval`፣ `no-new-func` = ስህተት)
- የአቅራቢ ቋሚ እሴቶች ሞጁሉ ሲጫን በZod በኩል ይረጋገጣሉ (`src/shared/validation/schemas.ts`)
- በነባሪነት ደህንነታቸው የተጠበቀ ቤተ-መጻሕፍት ጥቅም ላይ ይውላሉ፦ `dompurify` / `isomorphic-dompurify` (XSS)፣ `jose` (JWT)፣ `better-sqlite3` (በመለኪያ የተደረጉ ጥያቄዎች ስለሚጠቀሙ የSQLi ስጋት የለም)፣ `bcryptjs` (የይለፍ ቃል hashing)

## ጥብቅ የደህንነት ደንቦች

እነዚህ ደንቦች በመሳሪያዎችና በገምጋሚዎች ይተገበራሉ፦

1. **ሚስጥራዊ እሴቶችን በፍጹም commit አያድርጉ** — `.env` በgitignore ውስጥ ተካትቷል፤ `.env.example` አብነቱ ነው (ቀጥተኛ እሴቶች የሉትም፣ አስተያየቶች ብቻ — ከታች PUBLIC_CREDS.mdን ይመልከቱ)
2. **`eval()`፣ `new Function()` ወይም implied evalን በፍጹም አይጠቀሙ** — ESLint ያስገድዳል
3. **ያለግልጽ የኦፕሬተር ፈቃድ የHusky hooksን በፍጹም አያልፉ** (`--no-verify`፣ `--no-gpg-sign`)
4. **በroutes ውስጥ raw SQL በፍጹም አይጻፉ** — ሁልጊዜ በ`src/lib/db/` በኩል ያሳልፉ (በመለኪያ የተደረገ)
5. **ግብዓቶችን ሁልጊዜ በZod ያረጋግጡ** — `src/shared/validation/schemas.ts`
6. **የupstream headersን ሁልጊዜ ያጽዱ** — denylist በ`src/shared/constants/upstreamHeaders.ts`
7. **የተከማቹ የማረጋገጫ መረጃዎችን ያመስጥሩ** — AES-256-GCM በ`src/lib/db/encryption.ts` በኩል
8. **ይፋዊ upstream OAuth መለያዎችን በ`resolvePublicCred()` በኩል ይጠቀሙ** — `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` የሚሉ ቀጥተኛ እሴቶችን በምንጭ ኮድ ውስጥ በፍጹም አያካትቱ። [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)ን ይመልከቱ።
9. **የስህተት ምላሾችን በ`buildErrorBody()` / `sanitizeErrorMessage()` በኩል ያሳልፉ** — raw `err.stack` / `err.message`ን በHTTP / SSE / executor / MCP የምላሽ bodyዎች ውስጥ በፍጹም አያስገቡ። [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md)ን ይመልከቱ።
10. **የ`exec()` / `spawn()` runtime እሴቶችን በ`env` አማራጭ በኩል ያስተላልፉ** — ውጫዊ paths ወይም የማይታመኑ እሴቶችን ወደ shell በሚላኩ scripts ውስጥ በstring interpolation በፍጹም አያስገቡ። ማጣቀሻ፦ `src/mitm/cert/install.ts::updateNssDatabases`።
11. **በነባሪነት ደህንነታቸው የተጠበቀ ቤተ-መጻሕፍትን ይምረጡ** — [tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults)ን ይመልከቱ (Helmet.js፣ DOMPurify፣ ssrf-req-filter፣ safe-regex፣ Google Tink)። የራስዎን መፍትሔ ከመፍጠርዎ በፊት እነዚህን ይጠቀሙ።

## የአቅርቦት ሰንሰለት ስካነር ግኝቶች (Socket.dev / Snyk / ተመሳሳይ)

> **የወሰን ማስታወሻ፦** በማከማቻው ሥር ያለው `socket.yml` የሚያዋቅረው የSocket.dev ከህትመት በኋላ በሬጅስትሪው በኩል ለሚደረገው የታተመው npm አርቲፋክት ቅኝት `projectIgnorePaths`ን ብቻ ነው፤ ይህ በግዴታ የሚፈጸም የCI/PR ውህደት መግቢያ መቆጣጠሪያ አይደለም። በ`.github/workflows` ውስጥ ያለ ምንም የሥራ ፍሰት፣ ምንም የ`package.json` ስክሪፕት እና ምንም የ`Makefile` ዒላማ Socket.devን አይጠራም።

የታተመው `omniroute` npm አርቲፋክት የNext.js `output: "standalone"`
ግንባታን ይጠቀልላል፤ ይህም ማለት ሁሉም የመስመር ጥያቄ አስተናጋጆች—በሰነድ የተገለጹ ልዩ መብት
የሚጠይቁ ባህሪያትን (MITM፣ Zed import፣ Cloud Sync፣ ውስጠ-ገብ የአገልግሎት ተቆጣጣሪ) ጨምሮ—
በተቀነሱ `.next/server/*.js` ቁርጥራጮች ውስጥ ይገባሉ። በግምታዊ ዘዴ የሚሰሩ የአቅርቦት ሰንሰለት ስካነሮች
እነዚያን ቁርጥራጮች ከማልዌር ፊርማዎች ጋር በተደጋጋሚ በስርዓተ-ጥለት ያዛምዳሉ።

የምንጠቀመው የስካነር ውቅር በማከማቻው ሥር ባለው [`socket.yml`](socket.yml) ውስጥ ይገኛል
(Socket.dev GitHub App format v2 — ይመልከቱ
<https://docs.socket.dev/docs/socket-yml>)። ስካነሩ ለታተሙ ተጠቃሚዎች በእውነት
በሚደርሱ የኮድ መንገዶች ላይ ብቻ ሪፖርት እንዲያደርግ፣ የማይላኩ ማውጫዎችን
(`tests/`፣ `_tasks/`፣ `_references/`፣ `_ideia/`፣
`_mono_repo/`፣ `docs/`፣ ወዘተ) በግልጽ ሁኔታ ያስወግዳል፤ ቅኝቱ ራሱ
በዚህ ማከማቻ ውስጥ ባለ የሥራ ፍሰት ሳይሆን፣ ያንን ፋይል በሚያነበው Socket
GitHub App ነው የሚካሄደው።

ለእያንዳንዱ የግኝት ምድብ፣ የእያንዳንዱን ግኝት የጥገና ኃላፊ ማረጋገጫ እንይዛለን፦

- **[`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md)** —
  የእያንዳንዱ ግኝት ካርታ፦ የምንጭ ፋይል ↔ ምልክት የተደረገበት ቁርጥራጭ ↔ ባህሪ ↔ በv3.8.6
  የተተገበረ የአደጋ ቅነሳ።
- ምልክት በተደረገበት እያንዳንዱ ፋንክሽን ላይ ያሉ በምንጭ ውስጥ የሚገኙ `SECURITY-AUDITOR-NOTE:` ብሎኮች
  ወደዚያው ሰነድ ይመልሳሉ።

የሥራ ፍሰታቸው ማንቂያውን ማላላት ለማይችል ተጠቃሚዎች፦
`OMNIROUTE_BUILD_PROFILE=minimal npm run build`ን በመጠቀም ይገንቡ። ይህ አራቱን
ስሱ ሞጁሎች በማስኬጃ ጊዜ HTTP 503 `feature-disabled` በሚመልሱ ምትክ ባዶ ትግበራዎች
ይተካቸዋል፤ ስለዚህ ልዩ መብት የሚጠይቁት የኮድ መንገዶች በአካል ከቅርቅቡ ውስጥ አይኖሩም።
የህትመት ዘዴውን ለማየት [`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md)ን
ይመልከቱ።

## ማጣቀሻዎች

- [`docs/architecture/AUTHZ_GUIDE.md`](docs/architecture/AUTHZ_GUIDE.md) — የፈቃድ አሰጣጥ የሥራ ፍሰት
- [`docs/security/GUARDRAILS.md`](docs/security/GUARDRAILS.md) — የመከላከያ ገደቦች ማዕቀፍ
- [`docs/security/COMPLIANCE.md`](docs/security/COMPLIANCE.md) — የኦዲት መዝገብ እና የመያዣ ጊዜ
- [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md) — ለይፋዊ የላይኛው ምንጭ ማረጋገጫዎች **አስገዳጅ** ስርዓተ-ጥለት
- [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md) — ለስህተት ምላሾች **አስገዳጅ** ስርዓተ-ጥለት
- [`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md) — ለአቅርቦት ሰንሰለት ስካነር ግኝቶች የጥገና ኃላፊ ማረጋገጫ
- [`docs/architecture/RESILIENCE_GUIDE.md`](docs/architecture/RESILIENCE_GUIDE.md) — circuit breaker + cooldown + lockout
- [`docs/security/STEALTH_GUIDE.md`](docs/security/STEALTH_GUIDE.md) — TLS fingerprinting (የሕግ/ሥነ-ምግባር ማስታወቂያ)
- [`CLAUDE.md`](CLAUDE.md) — ለAI ወኪሎች ጥብቅ ደንቦች
- [tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults) — በነባሪ ደህንነታቸው የተጠበቀ በጥንቃቄ የተመረጡ ላይብረሪዎች
