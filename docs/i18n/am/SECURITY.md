# Security Policy (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../SECURITY.md) · 🇸🇦 [ar](../ar/SECURITY.md) · 🇦🇿 [az](../az/SECURITY.md) · 🇧🇬 [bg](../bg/SECURITY.md) · 🇧🇩 [bn](../bn/SECURITY.md) · 🇧🇦 [bs](../bs/SECURITY.md) · 🇨🇿 [cs](../cs/SECURITY.md) · 🇩🇰 [da](../da/SECURITY.md) · 🇩🇪 [de](../de/SECURITY.md) · 🇬🇷 [el](../el/SECURITY.md) · 🇪🇸 [es](../es/SECURITY.md) · 🇪🇪 [et](../et/SECURITY.md) · 🇮🇷 [fa](../fa/SECURITY.md) · 🇫🇮 [fi](../fi/SECURITY.md) · 🇫🇷 [fr](../fr/SECURITY.md) · 🇮🇪 [ga](../ga/SECURITY.md) · 🇮🇳 [gu](../gu/SECURITY.md) · 🇳🇬 [ha](../ha/SECURITY.md) · 🇮🇱 [he](../he/SECURITY.md) · 🇮🇳 [hi](../hi/SECURITY.md) · 🇭🇷 [hr](../hr/SECURITY.md) · 🇭🇺 [hu](../hu/SECURITY.md) · 🇦🇲 [hy](../hy/SECURITY.md) · 🇮🇩 [id](../id/SECURITY.md) · 🇳🇬 [ig](../ig/SECURITY.md) · 🇮🇹 [it](../it/SECURITY.md) · 🇯🇵 [ja](../ja/SECURITY.md) · 🇬🇪 [ka](../ka/SECURITY.md) · 🇰🇭 [km](../km/SECURITY.md) · 🇮🇳 [kn](../kn/SECURITY.md) · 🇰🇷 [ko](../ko/SECURITY.md) · 🇱🇹 [lt](../lt/SECURITY.md) · 🇱🇻 [lv](../lv/SECURITY.md) · 🇮🇳 [ml](../ml/SECURITY.md) · 🇮🇳 [mr](../mr/SECURITY.md) · 🇲🇾 [ms](../ms/SECURITY.md) · 🇲🇹 [mt](../mt/SECURITY.md) · 🇲🇲 [my](../my/SECURITY.md) · 🇳🇵 [ne](../ne/SECURITY.md) · 🇳🇱 [nl](../nl/SECURITY.md) · 🇳🇴 [no](../no/SECURITY.md) · 🇮🇳 [or](../or/SECURITY.md) · 🇮🇳 [pa](../pa/SECURITY.md) · 🇵🇭 [phi](../phi/SECURITY.md) · 🇵🇱 [pl](../pl/SECURITY.md) · 🇵🇹 [pt](../pt/SECURITY.md) · 🇧🇷 [pt-BR](../pt-BR/SECURITY.md) · 🇷🇴 [ro](../ro/SECURITY.md) · 🇷🇺 [ru](../ru/SECURITY.md) · 🇱🇰 [si](../si/SECURITY.md) · 🇸🇰 [sk](../sk/SECURITY.md) · 🇸🇮 [sl](../sl/SECURITY.md) · 🇷🇸 [sr](../sr/SECURITY.md) · 🇸🇪 [sv](../sv/SECURITY.md) · 🇰🇪 [sw](../sw/SECURITY.md) · 🇮🇳 [ta](../ta/SECURITY.md) · 🇮🇳 [te](../te/SECURITY.md) · 🇹🇭 [th](../th/SECURITY.md) · 🇹🇷 [tr](../tr/SECURITY.md) · 🇺🇦 [uk-UA](../uk-UA/SECURITY.md) · 🇵🇰 [ur](../ur/SECURITY.md) · 🇺🇿 [uz](../uz/SECURITY.md) · 🇻🇳 [vi](../vi/SECURITY.md) · 🇳🇬 [yo](../yo/SECURITY.md) · 🇨🇳 [zh-CN](../zh-CN/SECURITY.md) · 🇹🇼 [zh-TW](../zh-TW/SECURITY.md)

---

## የደህንነት ተጋላጭነቶችን ሪፖርት ማድረግ

በOmniRoute ውስጥ የደህንነት ተጋላጭነት ካገኙ፣ እባክዎ ኃላፊነት በተሞላበት መንገድ ሪፖርት ያድርጉት፦

1. ይፋዊ የGitHub ጉዳይ **አይክፈቱ**
2. [GitHub Security Advisories](https://github.com/diegosouzapw/OmniRoute/security/advisories/new)ን ይጠቀሙ
3. መግለጫ፣ የመድገሚያ ደረጃዎች እና ሊያስከትል የሚችለውን ተጽዕኖ ያካትቱ

## የምላሽ የጊዜ ሰሌዳ

| ደረጃ         | ዒላማ              |
| ----------- | ---------------- |
| ደረሰኝ ማረጋገጫ  | 48 ሰዓታት          |
| ምደባ እና ግምገማ | 5 የሥራ ቀናት        |
| የማስተካከያ ልቀት | 14 የሥራ ቀናት (ወሳኝ) |

## የሚደገፉ ስሪቶች

| ስሪት     | የድጋፍ ሁኔታ  |
| ------- | --------- |
| 3.8.x   | ✅ ንቁ     |
| 3.7.x   | ✅ የደህንነት |
| < 3.7.0 | ❌ የማይደገፍ |

---

## የደህንነት አርክቴክቸር

OmniRoute ባለብዙ ንብርብር የደህንነት ሞዴልን ተግባራዊ ያደርጋል፦

```
ጥያቄ → CORS → የAuthz ቧንቧ መስመር (መመደብ → ፖሊሲዎች → ማስፈጸም)
       → መከላከያዎች (የPII ደባቂ፣ የጥያቄ መርፌ፣ የእይታ ድልድይ)
       → የመጠን ገዳቢ → የወረዳ ሰባሪ → የማቀዝቀዣ ጊዜ → የሞዴል መቆለፊያ → አቅራቢ
```

### 🔐 ማንነትን ማረጋገጥ እና ፈቃድ መስጠት

| ባህሪ                    | አተገባበር                                                                                                                                     |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **የዳሽቦርድ መግቢያ**        | JWT ቶከኖችን (HttpOnly ኩኪዎች) የሚጠቀም በይለፍ ቃል ላይ የተመሠረተ የማንነት ማረጋገጫ                                                                              |
| **የAPI ቁልፍ ማረጋገጫ**     | CRC ማረጋገጫ ያላቸው በHMAC የተፈረሙ ቁልፎች                                                                                                            |
| **OAuth 2.0 + PKCE**   | የአቅራቢ-ተኮር የአሳሽ/መሣሪያ OAuth፣ በሚደገፍበት ቦታ PKCEን ይጠቀማል፤ ለማስመጣት ብቻ የሚያገለግሉ የDevin ምስክርነቶች በተናጠል ይከናወናሉ።                                          |
| **ቶከን ማደስ**            | OAuth ቶከን ከማብቃቱ በፊት በራስ-ሰር ማደስ                                                                                                             |
| **ደህንነታቸው የተጠበቁ ኩኪዎች** | ለHTTPS አካባቢዎች `AUTH_COOKIE_SECURE=true`                                                                                                    |
| **የAuthz ቧንቧ መስመር**    | የመንገድ ምደባ (PUBLIC / CLIENT_API / MANAGEMENT) — `docs/architecture/AUTHZ_GUIDE.md`ን ይመልከቱ                                                   |
| **የመንገድ ጥበቃ ደረጃዎች**    | ለአስተዳደር መንገዶች ባለ3-ደረጃ ሞዴል (LOCAL_ONLY / ALWAYS_PROTECTED / MANAGEMENT) — `docs/security/ROUTE_GUARD_TIERS.md`ን ይመልከቱ                       |
| **የManage-Scope MCP**  | የርቀት `/api/mcp/*` መዳረሻ `manage` scope ባላቸው API ቁልፎች ይገደባል፤ `/api/cli-tools/runtime/*` በጥብቅ የloopback ገደብ ላይ ይቆያል። ROUTE_GUARD_TIERSን ይመልከቱ |
| **የMCP ወሰኖች**          | 32 ዝርዝር ወሰኖች (read:health፣ write:combos፣ execute:completions፣ ወዘተ) — `docs/frameworks/MCP-SERVER.md`ን ይመልከቱ                                |

### 🛡️ የተከማቸ ውሂብ ምስጠራ

በSQLite ውስጥ የሚከማች ሁሉም ሚስጥራዊ ውሂብ ከscrypt ቁልፍ ማመንጨት ጋር **AES-256-GCM**ን በመጠቀም ይመሰጠራል፦

- API ቁልፎች፣ የመዳረሻ ቶከኖች፣ የማደሻ ቶከኖች እና ID ቶከኖች
- ስሪት ያለው ቅርጸት፦ `enc:v1:<iv>:<ciphertext>:<authTag>`
- `STORAGE_ENCRYPTION_KEY` ካልተዋቀረ የቀጥታ ማሳለፊያ ሁነታ (ግልጽ ጽሑፍ)

```bash
# የምስጠራ ቁልፍ ያመንጩ፦
STORAGE_ENCRYPTION_KEY=$(openssl rand -hex 32)
```

### 🛡️ የመከላከያዎች ማዕቀፍ

OmniRoute በቅድሚያ ቅደም ተከተል የተደረደሩ 3 አብሮገነብ መከላከያዎች ያሉት፣ ዳግም ሳይጀመር ሊጫን የሚችል **የመከላከያዎች መዝገብ** (`src/lib/guardrails/`) ይዞ ይመጣል፦

| መከላከያ              | ቅድሚያ | ዓላማ                                                                  |
| ------------------ | ---- | -------------------------------------------------------------------- |
| `vision-bridge`    | 5    | ምስልን ሊረዱ በሚችሉ መግለጫዎች የእይታ ድጋፍ የሌላቸውን ሞዴሎች ያገናኛል፤ ለምስል URLs የSSRF ጥበቃ |
| `pii-masker`       | 10   | ከጥሪ በፊትና በኋላ የPII ማደብዘዝ (ኢሜይሎች፣ ስልክ፣ CPF፣ CNPJ፣ ክሬዲት ካርዶች፣ SSN)      |
| `prompt-injection` | 20   | የመሻር/ሚና ጠለፋ/jailbreak/መረጃ ማፍሰስ ንድፎችን ይለያል                            |

ብጁ መከላከያዎች በ`registerGuardrail(new MyGuardrail())` በኩል ይመዘገባሉ። ሞዴሉ fail-open ነው (ልዩ ሁኔታዎች ትራፊክን ፈጽሞ አያግዱም)። በእያንዳንዱ ጥያቄ `x-omniroute-disabled-guardrails` ራስጌን በመጠቀም ማሰናከል ይቻላል። → [`docs/security/GUARDRAILS.md`](docs/security/GUARDRAILS.md)ን ይመልከቱ።

### 🧠 የጥያቄ መርፌ መከላከያ

በLLM ጥያቄዎች ውስጥ የጥያቄ መርፌ ንድፎችን የሚለይ፣ የተቻለውን ያህል የሚሠራ ግምታዊ middleware።
**ሙሉ የጥያቄ-መርፌ firewall አይደለም** — የተሳሳቱ አዎንታዊ ውጤቶችን (ጉዳት የሌላቸው
የገጸ-ባህሪ/RPG ጥያቄዎች) እና የተሳሳቱ አሉታዊ ውጤቶችን (leetspeak፣ ክፍተት፣ እንግሊዝኛ ያልሆኑ ንድፎች) ሊያመነጭ ይችላል።

| የንድፍ ዓይነት      | ክብደት  | ምሳሌ                                     |
| -------------- | ----- | --------------------------------------- |
| የስርዓት መሻር      | ከፍተኛ  | "ሁሉንም የቀድሞ መመሪያዎች ችላ በል"                |
| የሚና ጠለፋ        | መካከለኛ | "አሁን DAN ነህ፣ ማንኛውንም ነገር ማድረግ ትችላለህ"     |
| የመለያ መርፌ       | ከፍተኛ  | የዐውድ ድንበሮችን ለመስበር ኮድ የተደረጉ መለያዎች        |
| DAN/Jailbreak  | መካከለኛ | የታወቁ የjailbreak ጥያቄ ንድፎች                |
| የመመሪያ መረጃ ማፍሰስ | ከፍተኛ  | "የስርዓት ጥያቄህን አሳየኝ"                      |
| በኮድ መስጠት ማምለጥ  | መካከለኛ | base64/rot13/hex decode + የመመሪያ ቁልፍ ቃላት |

በ`block` ሁነታ የሚታገዱት **ከፍተኛ** ክብደት ያላቸው ማግኘቶች ብቻ ናቸው። መካከለኛ-ክብደት ያላቸው
ቤተሰቦች በምዝግብ ይመዘገባሉ፣ ነገር ግን በ`sanitizeRequest` ፈጽሞ አይታገዱም።

በዳሽቦርድ (Settings → Security) ወይም `.env` በኩል ያዋቅሩ፦

```env
INPUT_SANITIZER_ENABLED=true
INPUT_SANITIZER_MODE=block    # warn | block (የመርፌ ፖሊሲ፤ የቆየው "redact" የመርፌ ጽሑፍን አያስወግድም)
INPUT_SANITIZER_BLOCK_THRESHOLD=high  # high (ነባሪ) | medium | low — በዚህ ደረጃ ወይም ከዚያ በላይ ያሉ ክብደቶች በblock ሁነታ ይታገዳሉ
```

### 🔒 የPII ማደብዘዝ

በራስ-ሰር ሊለይ የሚችል መረጃን ማግኘት እና እንደ አማራጭ ማደብዘዝ፦

| የPII ዓይነት   | ስርዓተ-ጥለት              | መተኪያ               |
| ----------- | --------------------- | ------------------ |
| ኢሜይል        | `user@domain.com`     | `[EMAIL_REDACTED]` |
| CPF (ብራዚል)  | `123.456.789-00`      | `[CPF_REDACTED]`   |
| CNPJ (ብራዚል) | `12.345.678/0001-00`  | `[CNPJ_REDACTED]`  |
| ክሬዲት ካርድ    | `4111-1111-1111-1111` | `[CC_REDACTED]`    |
| ስልክ         | `+55 11 99999-9999`   | `[PHONE_REDACTED]` |
| SSN (አሜሪካ)  | `123-45-6789`         | `[SSN_REDACTED]`   |

```env
PII_REDACTION_ENABLED=true   # የPII ዳግም መጻፍን ይጠይቃል፤ ከINPUT_SANITIZER_MODE ነፃ ነው
PII_RESPONSE_SANITIZATION=true  # አማራጭ፦ ለደንበኞች በሚመለሱ የአቅራቢ ምላሾች ውስጥ PIIን ይደብቃል
```

### 🌐 የአውታረ መረብ ደህንነት

| ባህሪ                  | መግለጫ                                                                      |
| -------------------- | ------------------------------------------------------------------------- |
| **CORS**             | ግልጽ የcross-origin የተፈቀዱ ዝርዝር (`CORS_ALLOWED_ORIGINS`፤ የቆየው `CORS_ORIGIN`) |
| **የIP ማጣሪያ**         | በዳሽቦርድ ውስጥ የተፈቀዱ/የታገዱ የIP ክልሎች                                            |
| **የፍጥነት ገደብ**        | ለእያንዳንዱ አቅራቢ የፍጥነት ገደቦች ከራስ-ሰር የኋላ ማፈግፈግ ጋር                               |
| **የተጨናነቀ ጥያቄ መከላከያ** | Mutex + በእያንዳንዱ ግንኙነት መቆለፍ ተከታታይ የ502 ስህተቶችን ይከላከላል                       |
| **TLS አሻራ**          | የቦት ማወቂያን ለመቀነስ አሳሽ-መሰል የTLS አሻራን ማስመሰል                                   |
| **CLI አሻራ**          | ከተፈጥሯዊ CLI ፊርማዎች ጋር እንዲዛመድ ለእያንዳንዱ አቅራቢ የራስጌ/የይዘት ቅደም ተከተል                |

### 🔌 የመቋቋም ብቃት እና ተገኝነት

| ባህሪ                | መግለጫ                                                         |
| ------------------ | ------------------------------------------------------------ |
| **የወረዳ መቆራረጫ**     | ለእያንዳንዱ አቅራቢ ባለ3-ሁኔታ (ዝግ → ክፍት → ከፊል-ክፍት)፣ በSQLite ውስጥ የሚቀመጥ |
| **የጥያቄ ኢድምፖተንሲ**   | ለተደጋጋሚ ጥያቄዎች የ5-ሰከንድ የተመሳሳይነት ማስወገጃ ጊዜ                       |
| **ኤክስፖነንሻል ማፈግፈግ** | እየጨመረ በሚሄድ መዘግየት ራስ-ሰር ዳግም መሞከር                              |
| **የጤንነት ዳሽቦርድ**    | ቅጽበታዊ የአቅራቢ ጤንነት ክትትል                                        |

### 📋 ተገዢነት

| ባህሪ            | መግለጫ                                              |
| -------------- | ------------------------------------------------- |
| **የምዝግብ ማቆያ**  | ከ`CALL_LOG_RETENTION_DAYS` በኋላ ራስ-ሰር ማጽዳት         |
| **ከምዝግብ መውጣት** | ለእያንዳንዱ API ቁልፍ ያለው `noLog` ጠቋሚ የጥያቄ ምዝገባን ያሰናክላል |
| **የኦዲት ምዝግብ**  | የአስተዳደር ድርጊቶች በ`audit_log` ሰንጠረዥ ውስጥ ይከታተላሉ       |
| **MCP ኦዲት**    | ለሁሉም የMCP መሣሪያ ጥሪዎች በSQLite የተደገፈ የኦዲት ምዝገባ       |
| **Zod ማረጋገጫ**  | ሁሉም የAPI ግብዓቶች ሞጁሉ ሲጫን በZod v4 ንድፎች ይረጋገጣሉ        |

---

## አስፈላጊ የአካባቢ ተለዋዋጮች

ሰርቨሩን ከማስጀመርዎ በፊት ሁሉም ሚስጥሮች መዋቀር አለባቸው። ከጎደሉ ወይም ደካማ ከሆኑ ሰርቨሩ **ወዲያውኑ ይቋረጣል**።

```bash
# አስፈላጊ — ያለእነዚህ ሰርቨሩ አይጀምርም፦
JWT_SECRET=$(openssl rand -base64 48)     # ቢያንስ 32 ቁምፊዎች
API_KEY_SECRET=$(openssl rand -hex 32)    # ቢያንስ 16 ቁምፊዎች

# የሚመከር — የተከማቸ ውሂብ ምስጠራን ያነቃል፦
STORAGE_ENCRYPTION_KEY=$(openssl rand -hex 32)
```

ሰርቨሩ እንደ `changeme`፣ `secret` ወይም `password` ያሉ ደካማ መሆናቸው የታወቁ እሴቶችን በንቃት ውድቅ ያደርጋል።

---

## የDocker ደህንነት

- በምርት አካባቢ non-root ተጠቃሚ ይጠቀሙ
- ሚስጥሮችን ለንባብ-ብቻ እንደተፈቀዱ volumes ያያይዙ
- የ`.env` ፋይሎችን ወደ Docker images በፍጹም አይቅዱ
- ስሱ ፋይሎችን ለማስቀረት `.dockerignore` ይጠቀሙ
- ከHTTPS በስተጀርባ ሲሆኑ `AUTH_COOKIE_SECURE=true` ያዘጋጁ

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

## ጥገኛ ጥቅሎች

- `npm audit`ን በመደበኛነት ያስኪዱ (`npm run audit:deps` ዋናውን + electronን ይሸፍናል)
- ጥገኛ ጥቅሎችን የተዘመኑ አድርገው ያቆዩ
- ፕሮጀክቱ ከcommit በፊት ለሚደረጉ ማረጋገጫዎች `husky` + `lint-staged`ን ይጠቀማል (lint-staged + check-docs-sync + check:any-budget:t11)
- የCI pipeline በእያንዳንዱ push ላይ የESLint ደህንነት ደንቦችን ያስኬዳል (`no-eval`፣ `no-implied-eval`፣ `no-new-func` = ስህተት)
- የProvider constants ሞጁሉ ሲጫን በZod ይረጋገጣሉ (`src/shared/validation/schemas.ts`)
- በነባሪነት ደህንነታቸው የተጠበቀ ላይብረሪዎች ጥቅም ላይ ውለዋል፦ `dompurify` / `isomorphic-dompurify` (XSS)፣ `jose` (JWT)፣ `better-sqlite3` (በparameterized queries ምክንያት የSQLi ስጋት የለም)፣ `bcryptjs` (የይለፍ ቃል hashing)

## ጥብቅ የደህንነት ደንቦች

እነዚህ ደንቦች በመሳሪያዎችና በገምጋሚዎች ተግባራዊ ይደረጋሉ፦

1. **ሚስጥሮችን በፍጹም commit አያድርጉ** — `.env` በgitignore ውስጥ ተካትቷል፤ `.env.example` አብነቱ ነው (ቀጥተኛ እሴቶች የሉም፣ አስተያየቶች ብቻ — ከታች PUBLIC_CREDS.mdን ይመልከቱ)
2. **`eval()`፣ `new Function()` ወይም implied evalን በፍጹም አይጠቀሙ** — ESLint ይህን ያስፈጽማል
3. የኦፕሬተሩ ግልጽ ፈቃድ ሳይኖር **የHusky hooksን በፍጹም አያልፉ** (`--no-verify`፣ `--no-gpg-sign`)
4. **በroutes ውስጥ raw SQLን በፍጹም አይጻፉ** — ሁልጊዜ በ`src/lib/db/` በኩል ያሳልፉ (parameterized)
5. **ግብዓቶችን ሁልጊዜ በZod ያረጋግጡ** — `src/shared/validation/schemas.ts`
6. **የupstream headersን ሁልጊዜ ያጽዱ** — denylist በ`src/shared/constants/upstreamHeaders.ts`
7. **የተከማቹ ማረጋገጫዎችን ያመስጥሩ** — AES-256-GCM በ`src/lib/db/encryption.ts` በኩል
8. **ይፋዊ የupstream OAuth መለያዎችን በ`resolvePublicCred()` በኩል ይጠቀሙ** — `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` ቀጥተኛ እሴቶችን በsource ውስጥ በፍጹም አያካትቱ። [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)ን ይመልከቱ።
9. **የስህተት ምላሾችን በ`buildErrorBody()` / `sanitizeErrorMessage()` በኩል ያቅርቡ** — raw `err.stack` / `err.message`ን በHTTP / SSE / executor / MCP የምላሽ bodies ውስጥ በፍጹም አያስገቡ። [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md)ን ይመልከቱ።
10. **የ`exec()` / `spawn()` runtime እሴቶችን በ`env` option በኩል ያስተላልፉ** — ውጫዊ pathsን ወይም የማይታመኑ እሴቶችን ወደ shell በሚላኩ scripts ውስጥ በstring-interpolation በፍጹም አያስገቡ። ማጣቀሻ፦ `src/mitm/cert/install.ts::updateNssDatabases`።
11. **በነባሪነት ደህንነታቸው የተጠበቀ ላይብረሪዎችን ይምረጡ** — [tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults)ን ይመልከቱ (Helmet.js፣ DOMPurify፣ ssrf-req-filter፣ safe-regex፣ Google Tink)። የራስዎን ከመፍጠርዎ በፊት እነዚህን ይጠቀሙ።

## የሶፍትዌር አቅርቦት ሰንሰለት ስካነር ግኝቶች (Socket.dev / Snyk / ተመሳሳይ)

> **የወሰን ማስታወሻ፦** በማከማቻው ሥር ያለው `socket.yml`፣ ለታተመው npm አርቲፋክት በSocket.dev ሬጂስትሪ በኩል ከህትመት በኋላ በሚደረገው ቅኝት ውስጥ `projectIgnorePaths`ን ብቻ ይቀርጻል — በCI/PR ውህደት ላይ ተፈጻሚ የሆነ መግቢያ በር አይደለም። በ`.github/workflows` ውስጥ ያለ ምንም የሥራ ፍሰት፣ ምንም የ`package.json` ስክሪፕት፣ እና ምንም የ`Makefile` ዒላማ Socket.devን አይጠራም።

የታተመው `omniroute` npm አርቲፋክት የNext.js `output: "standalone"`
ግንባታን አቅፎ ይዟል፤ ይህም እያንዳንዱ የመንገድ መቆጣጠሪያ — በሰነድ የተገለጹ ልዩ ፈቃድ የሚጠይቁ
ባህሪያትን (MITM፣ Zed import፣ Cloud Sync፣ የተካተተ የአገልግሎት ተቆጣጣሪ) ጨምሮ — በመጨረሻ
በ`.next/server/*.js` ውስጥ ወደሚገኙ የተጨመቁ ቁርጥራጮች ይገባል ማለት ነው። በሂዩሪስቲክ ላይ የተመሠረቱ የሶፍትዌር አቅርቦት ሰንሰለት ስካነሮች
እነዚያን ቁርጥራጮች ከማልዌር ፊርማዎች ጋር በተደጋጋሚ በስርዓተ-ጥለት ያዛምዳሉ።

የምንጠቀመው የስካነር ውቅር በማከማቻው ሥር ባለው
[`socket.yml`](socket.yml) ውስጥ ይገኛል (የSocket.dev GitHub App ቅርጸት v2 — ይመልከቱ
<https://docs.socket.dev/docs/socket-yml>)። ስካነሩ በትክክል ወደታተሙ ተጠቃሚዎች
የሚደርሱ የኮድ መንገዶችን ብቻ እንዲዘግብ፣ ያልተላኩ ማውጫዎችን (`tests/`፣ `_tasks/`፣ `_references/`፣ `_ideia/`፣
`_mono_repo/`፣ `docs/`፣ ወዘተ) በግልጽ ያገላል — ቅኝቱ ራሱ በዚህ ማከማቻ ውስጥ ባለ
የሥራ ፍሰት ሳይሆን ፋይሉን በሚያነበው Socket
GitHub App ይከናወናል።

ለእያንዳንዱ የግኝት ምድብ፣ በግኝት ደረጃ የተዘጋጀ የጥገና ኃላፊ ማረጋገጫ እናቆያለን፦

- **[`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md)** —
  የእያንዳንዱ ግኝት ካርታ፦ ምንጭ ፋይል ↔ ምልክት የተደረገበት ቁርጥራጭ ↔ ባህሪ ↔ በv3.8.6 ውስጥ
  የተተገበረ የአደጋ ቅነሳ።
- በምንጭ ኮዱ ውስጥ በእያንዳንዱ ምልክት በተደረገበት ፈንክሽን ላይ ያሉ `SECURITY-AUDITOR-NOTE:` ብሎኮች
  ወደዚያው ሰነድ ይጠቁማሉ።

የሥራ ፍሰታቸው ማንቂያውን ማላላት ለማይችል ተጠቃሚዎች፦
`OMNIROUTE_BUILD_PROFILE=minimal npm run build`ን በመጠቀም ይገንቡ። ይህም አራቱን
ስሱ ሞጁሎች በአሂድ ጊዜ HTTP 503 `feature-disabled`ን በሚመልሱ
ተተኪዎች ይተካቸዋል፤ በዚህም ልዩ ፈቃድ የሚጠይቁ የኮድ መንገዶች በቁሳዊ ሁኔታ ከጥቅሉ ውስጥ አይኖሩም።
የህትመት አሠራሩን ለማየት [`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md)ን
ይመልከቱ።

## ማጣቀሻዎች

- [`docs/architecture/AUTHZ_GUIDE.md`](docs/architecture/AUTHZ_GUIDE.md) — የፈቃድ ማረጋገጫ ሂደት
- [`docs/security/GUARDRAILS.md`](docs/security/GUARDRAILS.md) — የመከላከያ ድንበሮች ማዕቀፍ
- [`docs/security/COMPLIANCE.md`](docs/security/COMPLIANCE.md) — የኦዲት ምዝግብ እና ማቆያ
- [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md) — ለይፋዊ የወደላይ አገልግሎት ምስክርነቶች **አስገዳጅ** ስርዓተ-ጥለት
- [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md) — ለስህተት ምላሾች **አስገዳጅ** ስርዓተ-ጥለት
- [`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md) — ለአቅርቦት ሰንሰለት ስካነር ግኝቶች የአስተዳዳሪ ማረጋገጫ
- [`docs/architecture/RESILIENCE_GUIDE.md`](docs/architecture/RESILIENCE_GUIDE.md) — ሰርኪውት ብሬከር + የማቀዝቀዣ ጊዜ + መቆለፍ
- [`docs/security/STEALTH_GUIDE.md`](docs/security/STEALTH_GUIDE.md) — TLS የጣት አሻራ መለየት (ሕጋዊ/ሥነ-ምግባራዊ ማስታወቂያ)
- [`CLAUDE.md`](CLAUDE.md) — ለAI ወኪሎች ጥብቅ ደንቦች
- [tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults) — በነባሪነት ደህንነታቸው የተጠበቀ የተመረጡ ላይብረሪዎች
