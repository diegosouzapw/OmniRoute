# Security Policy (ગુજરાતી)

🌐 **Languages:** 🇺🇸 [English](../../../SECURITY.md) · 🇪🇹 [am](../am/SECURITY.md) · 🇸🇦 [ar](../ar/SECURITY.md) · 🇦🇿 [az](../az/SECURITY.md) · 🇧🇬 [bg](../bg/SECURITY.md) · 🇧🇩 [bn](../bn/SECURITY.md) · 🇧🇦 [bs](../bs/SECURITY.md) · 🇨🇿 [cs](../cs/SECURITY.md) · 🇩🇰 [da](../da/SECURITY.md) · 🇩🇪 [de](../de/SECURITY.md) · 🇬🇷 [el](../el/SECURITY.md) · 🇪🇸 [es](../es/SECURITY.md) · 🇪🇪 [et](../et/SECURITY.md) · 🇮🇷 [fa](../fa/SECURITY.md) · 🇫🇮 [fi](../fi/SECURITY.md) · 🇫🇷 [fr](../fr/SECURITY.md) · 🇮🇪 [ga](../ga/SECURITY.md) · 🇳🇬 [ha](../ha/SECURITY.md) · 🇮🇱 [he](../he/SECURITY.md) · 🇮🇳 [hi](../hi/SECURITY.md) · 🇭🇷 [hr](../hr/SECURITY.md) · 🇭🇺 [hu](../hu/SECURITY.md) · 🇦🇲 [hy](../hy/SECURITY.md) · 🇮🇩 [id](../id/SECURITY.md) · 🇳🇬 [ig](../ig/SECURITY.md) · 🇮🇹 [it](../it/SECURITY.md) · 🇯🇵 [ja](../ja/SECURITY.md) · 🇬🇪 [ka](../ka/SECURITY.md) · 🇰🇭 [km](../km/SECURITY.md) · 🇮🇳 [kn](../kn/SECURITY.md) · 🇰🇷 [ko](../ko/SECURITY.md) · 🇱🇹 [lt](../lt/SECURITY.md) · 🇱🇻 [lv](../lv/SECURITY.md) · 🇮🇳 [ml](../ml/SECURITY.md) · 🇮🇳 [mr](../mr/SECURITY.md) · 🇲🇾 [ms](../ms/SECURITY.md) · 🇲🇹 [mt](../mt/SECURITY.md) · 🇲🇲 [my](../my/SECURITY.md) · 🇳🇵 [ne](../ne/SECURITY.md) · 🇳🇱 [nl](../nl/SECURITY.md) · 🇳🇴 [no](../no/SECURITY.md) · 🇮🇳 [or](../or/SECURITY.md) · 🇮🇳 [pa](../pa/SECURITY.md) · 🇵🇭 [phi](../phi/SECURITY.md) · 🇵🇱 [pl](../pl/SECURITY.md) · 🇵🇹 [pt](../pt/SECURITY.md) · 🇧🇷 [pt-BR](../pt-BR/SECURITY.md) · 🇷🇴 [ro](../ro/SECURITY.md) · 🇷🇺 [ru](../ru/SECURITY.md) · 🇱🇰 [si](../si/SECURITY.md) · 🇸🇰 [sk](../sk/SECURITY.md) · 🇸🇮 [sl](../sl/SECURITY.md) · 🇷🇸 [sr](../sr/SECURITY.md) · 🇸🇪 [sv](../sv/SECURITY.md) · 🇰🇪 [sw](../sw/SECURITY.md) · 🇮🇳 [ta](../ta/SECURITY.md) · 🇮🇳 [te](../te/SECURITY.md) · 🇹🇭 [th](../th/SECURITY.md) · 🇹🇷 [tr](../tr/SECURITY.md) · 🇺🇦 [uk-UA](../uk-UA/SECURITY.md) · 🇵🇰 [ur](../ur/SECURITY.md) · 🇺🇿 [uz](../uz/SECURITY.md) · 🇻🇳 [vi](../vi/SECURITY.md) · 🇳🇬 [yo](../yo/SECURITY.md) · 🇨🇳 [zh-CN](../zh-CN/SECURITY.md) · 🇹🇼 [zh-TW](../zh-TW/SECURITY.md)

---

## નબળાઈઓની જાણ કરવી

જો તમને OmniRoute માં સુરક્ષા નબળાઈ મળી આવે, તો કૃપા કરીને જવાબદારીપૂર્વક તેની જાણ કરો:

1. સાર્વજનિક GitHub issue **ખોલશો નહીં**
2. [GitHub Security Advisories](https://github.com/diegosouzapw/OmniRoute/security/advisories/new) નો ઉપયોગ કરો
3. આ વિગતો સામેલ કરો: વર્ણન, પુનઃઉત્પાદનનાં પગલાં અને સંભવિત અસર

## પ્રતિસાદ સમયરેખા

| તબક્કો                      | લક્ષ્ય                    |
| --------------------------- | ------------------------- |
| સ્વીકૃતિ                    | 48 કલાક                   |
| પ્રાથમિક છટણી અને મૂલ્યાંકન | 5 કાર્યકારી દિવસ          |
| પેચ રિલીઝ                   | 14 કાર્યકારી દિવસ (ગંભીર) |

## સમર્થિત વર્ઝન

| વર્ઝન   | સમર્થનની સ્થિતિ |
| ------- | --------------- |
| 3.8.x   | ✅ સક્રિય       |
| 3.7.x   | ✅ સુરક્ષા      |
| < 3.7.0 | ❌ અસમર્થિત     |

---

## સુરક્ષા આર્કિટેક્ચર

OmniRoute બહુ-સ્તરીય સુરક્ષા મોડેલ અમલમાં મૂકે છે:

```
વિનંતી → CORS → Authz પાઇપલાઇન (વર્ગીકરણ → નીતિઓ → અમલીકરણ)
       → સુરક્ષા નિયંત્રણો (PII માસ્કર, પ્રોમ્પ્ટ ઇન્જેક્શન, વિઝન બ્રિજ)
       → દર મર્યાદક → સર્કિટ બ્રેકર → કૂલડાઉન → મોડેલ લૉકઆઉટ → પ્રદાતા
```

### 🔐 પ્રમાણીકરણ અને અધિકૃતતા

| સુવિધા                | અમલીકરણ                                                                                                                                                                      |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ડૅશબોર્ડ લૉગિન**    | JWT ટોકન્સ (HttpOnly કુકીઝ) સાથે પાસવર્ડ-આધારિત પ્રમાણીકરણ                                                                                                                   |
| **API કી પ્રમાણીકરણ** | CRC માન્યતા સાથે HMAC-હસ્તાક્ષરિત કીઓ                                                                                                                                        |
| **OAuth 2.0 + PKCE**  | પ્રદાતા-વિશિષ્ટ બ્રાઉઝર/ઉપકરણ OAuth જ્યાં સમર્થિત હોય ત્યાં PKCE નો ઉપયોગ કરે છે; માત્ર આયાત માટેનાં Devin ઓળખપત્રો અલગથી સંભાળવામાં આવે છે.                                 |
| **ટોકન રિફ્રેશ**      | સમયસમાપ્તિ પહેલાં સ્વચાલિત OAuth ટોકન રિફ્રેશ                                                                                                                                |
| **સુરક્ષિત કુકીઝ**    | HTTPS પર્યાવરણો માટે `AUTH_COOKIE_SECURE=true`                                                                                                                               |
| **Authz પાઇપલાઇન**    | રૂટ વર્ગીકરણ (PUBLIC / CLIENT_API / MANAGEMENT) — `docs/architecture/AUTHZ_GUIDE.md` જુઓ                                                                                     |
| **રૂટ ગાર્ડ સ્તરો**   | મેનેજમેન્ટ રૂટ્સ માટે 3-સ્તરીય મોડેલ (LOCAL_ONLY / ALWAYS_PROTECTED / MANAGEMENT) — `docs/security/ROUTE_GUARD_TIERS.md` જુઓ                                                 |
| **મેનેજ-સ્કોપ MCP**   | રિમોટ `/api/mcp/*` ઍક્સેસને `manage` સ્કોપ ધરાવતી API કીઓ દ્વારા નિયંત્રિત કરવામાં આવે છે; `/api/cli-tools/runtime/*` કડક લૂપબૅક સુધી મર્યાદિત રહે છે. ROUTE_GUARD_TIERS જુઓ |
| **MCP સ્કોપ્સ**       | 32 સૂક્ષ્મ સ્કોપ્સ (read:health, write:combos, execute:completions વગેરે) — `docs/frameworks/MCP-SERVER.md` જુઓ                                                              |

### 🛡️ સંગ્રહિત ડેટાનું એન્ક્રિપ્શન

SQLite માં સંગ્રહિત તમામ સંવેદનશીલ ડેટાને scrypt કી ડેરિવેશન સાથે **AES-256-GCM** નો ઉપયોગ કરીને એન્ક્રિપ્ટ કરવામાં આવે છે:

- API કીઓ, ઍક્સેસ ટોકન્સ, રિફ્રેશ ટોકન્સ અને ID ટોકન્સ
- વર્ઝનયુક્ત ફોર્મેટ: `enc:v1:<iv>:<ciphertext>:<authTag>`
- જ્યારે `STORAGE_ENCRYPTION_KEY` સેટ ન હોય ત્યારે પાસથ્રૂ મોડ (પ્લેનટેક્સ્ટ)

```bash
# એન્ક્રિપ્શન કી જનરેટ કરો:
STORAGE_ENCRYPTION_KEY=$(openssl rand -hex 32)
```

### 🛡️ સુરક્ષા નિયંત્રણોનું ફ્રેમવર્ક

OmniRoute પ્રાથમિકતા અનુસાર ક્રમબદ્ધ 3 બિલ્ટ-ઇન સુરક્ષા નિયંત્રણો સાથે હૉટ-રીલોડ કરી શકાય તેવી **સુરક્ષા નિયંત્રણોની રજિસ્ટ્રી** (`src/lib/guardrails/`) પ્રદાન કરે છે:

| સુરક્ષા નિયંત્રણ   | પ્રાથમિકતા | હેતુ                                                                           |
| ------------------ | ---------- | ------------------------------------------------------------------------------ |
| `vision-bridge`    | 5          | છબી-જાગૃત વર્ણનો સાથે નોન-વિઝન મોડેલોને જોડે છે; છબી URL માટે SSRF સુરક્ષા     |
| `pii-masker`       | 10         | કૉલ પહેલાં અને પછી PII ને છુપાવવું (ઇમેઇલ, ફોન, CPF, CNPJ, ક્રેડિટ કાર્ડ, SSN) |
| `prompt-injection` | 20         | ઓવરરાઇડ/રોલ-હાઇજેક/જેલબ્રેક/લીક પેટર્ન શોધે છે                                 |

કસ્ટમ સુરક્ષા નિયંત્રણો `registerGuardrail(new MyGuardrail())` દ્વારા નોંધાય છે. મોડેલ ફેઇલ-ઓપન છે (અપવાદો ક્યારેય ટ્રાફિકને અવરોધતા નથી). `x-omniroute-disabled-guardrails` હેડર દ્વારા દરેક વિનંતી માટે નાપસંદગીનો વિકલ્પ ઉપલબ્ધ છે. → [`docs/security/GUARDRAILS.md`](docs/security/GUARDRAILS.md) જુઓ.

### 🧠 પ્રોમ્પ્ટ ઇન્જેક્શન ગાર્ડ

LLM વિનંતીઓમાં પ્રોમ્પ્ટ ઇન્જેક્શન પેટર્ન શોધતું શ્રેષ્ઠ-પ્રયાસ આધારિત હ્યુરિસ્ટિક મિડલવેર.
**આ સંપૂર્ણ પ્રોમ્પ્ટ-ઇન્જેક્શન ફાયરવૉલ નથી** — તે ખોટા પૉઝિટિવ (નિર્દોષ
પર્સોના/RPG પ્રોમ્પ્ટ) અને ખોટા નેગેટિવ (લીટસ્પીક, સ્પેસિંગ, બિન-અંગ્રેજી પેટર્ન) આપી શકે છે.

| પેટર્નનો પ્રકાર       | ગંભીરતા | ઉદાહરણ                                         |
| --------------------- | ------- | ---------------------------------------------- |
| સિસ્ટમ ઓવરરાઇડ        | ઊંચી    | "અગાઉની બધી સૂચનાઓ અવગણો"                      |
| રોલ હાઇજેક            | મધ્યમ   | "તમે હવે DAN છો, તમે કંઈપણ કરી શકો છો"         |
| ડિલિમિટર ઇન્જેક્શન    | ઊંચી    | સંદર્ભની સીમાઓ તોડવા માટે એન્કોડ કરેલા વિભાજકો |
| DAN/જેલબ્રેક          | મધ્યમ   | જાણીતા જેલબ્રેક પ્રોમ્પ્ટ પેટર્ન               |
| સૂચના લીક             | ઊંચી    | "મને તમારો સિસ્ટમ પ્રોમ્પ્ટ બતાવો"             |
| એન્કોડિંગ દ્વારા બચાવ | મધ્યમ   | base64/rot13/hex ડીકોડ + સૂચના કીવર્ડ્સ        |

`block` મોડમાં ફક્ત **ઊંચી** ગંભીરતાવાળી શોધોને અવરોધવામાં આવે છે. મધ્યમ-ગંભીરતાવાળા
સમૂહો લૉગ કરવામાં આવે છે, પરંતુ `sanitizeRequest` દ્વારા ક્યારેય અવરોધવામાં આવતા નથી.

ડૅશબોર્ડ (સેટિંગ્સ → સુરક્ષા) અથવા `.env` દ્વારા ગોઠવો:

```env
INPUT_SANITIZER_ENABLED=true
INPUT_SANITIZER_MODE=block    # warn | block (ઇન્જેક્શન નીતિ; લેગસી "redact" ઇન્જેક્શન ટેક્સ્ટને દૂર કરતું નથી)
INPUT_SANITIZER_BLOCK_THRESHOLD=high  # high (ડિફૉલ્ટ) | medium | low — આ સ્તરે અથવા તેનાથી વધુ ગંભીરતાવાળી શોધોને block મોડમાં અવરોધવામાં આવે છે
```

### 🔒 PII રેડેક્શન

વ્યક્તિગત રીતે ઓળખી શકાય તેવી માહિતીની સ્વચાલિત શોધ અને વૈકલ્પિક રેડેક્શન:

| PII પ્રકાર     | પેટર્ન                | બદલી               |
| -------------- | --------------------- | ------------------ |
| ઇમેઇલ          | `user@domain.com`     | `[EMAIL_REDACTED]` |
| CPF (બ્રાઝિલ)  | `123.456.789-00`      | `[CPF_REDACTED]`   |
| CNPJ (બ્રાઝિલ) | `12.345.678/0001-00`  | `[CNPJ_REDACTED]`  |
| ક્રેડિટ કાર્ડ  | `4111-1111-1111-1111` | `[CC_REDACTED]`    |
| ફોન            | `+55 11 99999-9999`   | `[PHONE_REDACTED]` |
| SSN (યુએસ)     | `123-45-6789`         | `[SSN_REDACTED]`   |

```env
PII_REDACTION_ENABLED=true   # PII પુનર્લેખનની વિનંતી કરો; INPUT_SANITIZER_MODEથી સ્વતંત્ર
PII_RESPONSE_SANITIZATION=true  # વૈકલ્પિક: ક્લાયન્ટને પરત કરાયેલા પ્રદાતાના પ્રતિસાદોમાંથી PII છુપાવો
```

### 🌐 નેટવર્ક સુરક્ષા

| સુવિધા                  | વર્ણન                                                                        |
| ----------------------- | ---------------------------------------------------------------------------- |
| **CORS**                | સ્પષ્ટ ક્રોસ-ઓરિજિન મંજૂરીસૂચિ (`CORS_ALLOWED_ORIGINS`; લેગસી `CORS_ORIGIN`) |
| **IP ફિલ્ટરિંગ**        | ડેશબોર્ડમાં મંજૂરીસૂચિ/અવરોધસૂચિ IP રેન્જ                                    |
| **દર મર્યાદા**          | સ્વચાલિત બેકઓફ સાથે પ્રદાતા-દીઠ દર મર્યાદાઓ                                  |
| **એન્ટિ-થન્ડરિંગ હર્ડ** | મ્યુટેક્સ + કનેક્શન-દીઠ લોકિંગ કાસ્કેડિંગ 502ને અટકાવે છે                    |
| **TLS ફિંગરપ્રિન્ટ**    | બોટ શોધ ઘટાડવા માટે બ્રાઉઝર જેવા TLS ફિંગરપ્રિન્ટનું સ્પૂફિંગ                |
| **CLI ફિંગરપ્રિન્ટ**    | નેટિવ CLI સિગ્નેચર સાથે મેળ ખાતો પ્રદાતા-દીઠ હેડર/બોડી ક્રમ                  |

### 🔌 સ્થિતિસ્થાપકતા અને ઉપલબ્ધતા

| સુવિધા                    | વર્ણન                                                                  |
| ------------------------- | ---------------------------------------------------------------------- |
| **સર્કિટ બ્રેકર**         | પ્રદાતા-દીઠ 3-સ્ટેટ (બંધ → ખુલ્લું → અર્ધ-ખુલ્લું), SQLiteમાં સંગ્રહિત |
| **વિનંતી આઇડેમ્પોટેન્સી** | ડુપ્લિકેટ વિનંતીઓ માટે 5-સેકન્ડની ડીડુપ વિન્ડો                         |
| **એક્સ્પોનેન્શિયલ બેકઓફ** | વધતા વિલંબ સાથે સ્વચાલિત પુનઃપ્રયાસ                                    |
| **હેલ્થ ડેશબોર્ડ**        | પ્રદાતાની સ્થિતિનું રીઅલ-ટાઇમ મોનિટરિંગ                                |

### 📋 અનુપાલન

| સુવિધા              | વર્ણન                                                                  |
| ------------------- | ---------------------------------------------------------------------- |
| **લૉગ રિટેન્શન**    | `CALL_LOG_RETENTION_DAYS` પછી સ્વચાલિત સફાઈ                            |
| **નો-લૉગ ઑપ્ટ-આઉટ** | API કી-દીઠ `noLog` ફ્લેગ વિનંતી લૉગિંગને અક્ષમ કરે છે                  |
| **ઑડિટ લૉગ**        | `audit_log` કોષ્ટકમાં વહીવટી ક્રિયાઓ ટ્રૅક કરવામાં આવે છે              |
| **MCP ઑડિટ**        | તમામ MCP ટૂલ કૉલ માટે SQLite-આધારિત ઑડિટ લૉગિંગ                        |
| **Zod માન્યતા**     | મોડ્યુલ લોડ સમયે તમામ API ઇનપુટ્સ Zod v4 સ્કીમાથી માન્ય કરવામાં આવે છે |

---

## આવશ્યક પર્યાવરણ વેરિએબલ્સ

સર્વર શરૂ કરતાં પહેલાં તમામ રહસ્યો સેટ કરેલા હોવા આવશ્યક છે. જો તે ઉપલબ્ધ ન હોય અથવા નબળા હોય, તો સર્વર **તરત નિષ્ફળ થશે**.

```bash
# આવશ્યક — આના વિના સર્વર શરૂ થશે નહીં:
JWT_SECRET=$(openssl rand -base64 48)     # ઓછામાં ઓછા 32 અક્ષરો
API_KEY_SECRET=$(openssl rand -hex 32)    # ઓછામાં ઓછા 16 અક્ષરો

# ભલામણ કરેલ — સંગ્રહિત ડેટા માટે એન્ક્રિપ્શન સક્ષમ કરે છે:
STORAGE_ENCRYPTION_KEY=$(openssl rand -hex 32)
```

સર્વર `changeme`, `secret` અથવા `password` જેવા જાણીતા નબળા મૂલ્યોને સક્રિયપણે નકારે છે.

---

## Docker સુરક્ષા

- પ્રોડક્શનમાં non-root વપરાશકર્તાનો ઉપયોગ કરો
- રહસ્યોને read-only વોલ્યુમ તરીકે માઉન્ટ કરો
- `.env` ફાઇલોને ક્યારેય Docker ઇમેજમાં કૉપિ ન કરો
- સંવેદનશીલ ફાઇલોને બાકાત રાખવા માટે `.dockerignore` નો ઉપયોગ કરો
- HTTPS પાછળ હોય ત્યારે `AUTH_COOKIE_SECURE=true` સેટ કરો

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

## નિર્ભરતાઓ

- નિયમિતપણે `npm audit` ચલાવો (`npm run audit:deps` મુખ્ય + electron બંનેને આવરી લે છે)
- નિર્ભરતાઓને અપડેટ રાખો
- આ પ્રોજેક્ટ pre-commit તપાસો માટે `husky` + `lint-staged` નો ઉપયોગ કરે છે (lint-staged + check-docs-sync + check:any-budget:t11)
- CI પાઇપલાઇન દરેક push પર ESLint સુરક્ષા નિયમો ચલાવે છે (`no-eval`, `no-implied-eval`, `no-new-func` = ભૂલ)
- Zod દ્વારા મોડ્યુલ લોડ થતી વખતે પ્રોવાઇડર કોન્સ્ટન્ટ્સને માન્ય કરવામાં આવે છે (`src/shared/validation/schemas.ts`)
- સુરક્ષિત-બાય-ડિફૉલ્ટ લાઇબ્રેરીઓનો ઉપયોગ થાય છે: `dompurify` / `isomorphic-dompurify` (XSS), `jose` (JWT), `better-sqlite3` (પેરામીટરાઇઝ્ડ ક્વેરીઓને કારણે SQLiનું જોખમ નથી), `bcryptjs` (પાસવર્ડ હેશિંગ)

## કડક સુરક્ષા નિયમો

આ નિયમો ટૂલિંગ અને સમીક્ષકો દ્વારા લાગુ કરવામાં આવે છે:

1. **રહસ્યો ક્યારેય commit ન કરો** — `.env` gitignore કરેલ છે; `.env.example` ટેમ્પલેટ છે (કોઈ લિટરલ્સ નહીં, માત્ર ટિપ્પણીઓ — નીચે PUBLIC_CREDS.md જુઓ)
2. **`eval()`, `new Function()` અથવા implied eval નો ક્યારેય ઉપયોગ ન કરો** — ESLint આ નિયમ લાગુ કરે છે
3. **સ્પષ્ટ ઓપરેટર મંજૂરી વિના Husky hooks ને ક્યારેય બાયપાસ ન કરો** (`--no-verify`, `--no-gpg-sign`)
4. **routes માં ક્યારેય raw SQL ન લખો** — હંમેશાં `src/lib/db/` મારફતે જાઓ (પેરામીટરાઇઝ્ડ)
5. **હંમેશાં Zod વડે ઇનપુટ્સને માન્ય કરો** — `src/shared/validation/schemas.ts`
6. **હંમેશાં upstream હેડર્સને સેનિટાઇઝ કરો** — `src/shared/constants/upstreamHeaders.ts` માં denylist
7. **સંગ્રહિત credentials ને એન્ક્રિપ્ટ કરો** — `src/lib/db/encryption.ts` મારફતે AES-256-GCM
8. **`resolvePublicCred()` મારફતે સાર્વજનિક upstream OAuth ઓળખકર્તાઓ** — સોર્સમાં `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` લિટરલ્સ ક્યારેય એમ્બેડ ન કરો. [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md) જુઓ.
9. **`buildErrorBody()` / `sanitizeErrorMessage()` મારફતે ભૂલ પ્રતિસાદો** — HTTP / SSE / executor / MCP પ્રતિસાદ બૉડીમાં raw `err.stack` / `err.message` ક્યારેય મૂકશો નહીં. [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md) જુઓ.
10. **`env` વિકલ્પ મારફતે `exec()` / `spawn()` runtime મૂલ્યો** — બાહ્ય પાથ અથવા અવિશ્વસનીય મૂલ્યોને shell મારફતે પસાર થતી સ્ક્રિપ્ટ્સમાં ક્યારેય string-interpolate ન કરો. સંદર્ભ: `src/mitm/cert/install.ts::updateNssDatabases`.
11. **સુરક્ષિત-બાય-ડિફૉલ્ટ લાઇબ્રેરીઓને પ્રાધાન્ય આપો** — [tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults) જુઓ (Helmet.js, DOMPurify, ssrf-req-filter, safe-regex, Google Tink). પોતાનું સોલ્યુશન બનાવતાં પહેલાં તેમનો ઉપયોગ કરો.

## સપ્લાય-ચેઇન સ્કેનરનાં તારણો (Socket.dev / Snyk / સમાન)

> **કાર્યક્ષેત્ર નોંધ:** રિપોઝિટરીના રૂટ પરની `socket.yml` ફક્ત પ્રકાશિત npm આર્ટિફેક્ટના Socket.devના રજિસ્ટ્રી-સાઇડ પોસ્ટ-પબ્લિશ સ્કેન માટે `projectIgnorePaths`ને આકાર આપે છે — તે અમલમાં મૂકાયેલ CI/PR મર્જ ગેટ નથી. `.github/workflows`માં કોઈ workflow, `package.json`માં કોઈ script અને કોઈ `Makefile` target Socket.devને ચલાવતું નથી.

પ્રકાશિત `omniroute` npm આર્ટિફેક્ટ Next.jsનું `output: "standalone"`
બિલ્ડ બંડલ કરે છે, જેનો અર્થ એ છે કે દરેક route handler — દસ્તાવેજીકૃત વિશેષાધિકૃત
સુવિધાઓ (MITM, Zed import, Cloud Sync, એમ્બેડેડ service supervisor) સહિત —
`.next/server/*.js`ની minified chunksમાં સમાવિષ્ટ થાય છે. હ્યુરિસ્ટિક સપ્લાય-ચેઇન સ્કેનર્સ
વારંવાર તે chunksને માલવેર signatures સાથે pattern-match કરે છે.

અમે ઉપયોગ કરીએ છીએ તે સ્કેનર configuration રિપોઝિટરીના રૂટમાં
[`socket.yml`](socket.yml) ખાતે છે (Socket.dev GitHub App format v2 — જુઓ
<https://docs.socket.dev/docs/socket-yml>). તે સ્પષ્ટપણે વિતરણ ન થતી
directories (`tests/`, `_tasks/`, `_references/`, `_ideia/`,
`_mono_repo/`, `docs/`, વગેરે)ને બાકાત રાખે છે, જેથી સ્કેનર માત્ર એવા code paths અંગે
રિપોર્ટ કરે જે ખરેખર પ્રકાશિત વપરાશકર્તાઓ સુધી પહોંચે છે — સ્કેન પોતે આ રિપોઝિટરીમાંના
workflow દ્વારા નહીં, પરંતુ તે ફાઇલ વાંચતી Socket GitHub App દ્વારા ચલાવવામાં આવે છે.

દરેક તારણની શ્રેણી માટે અમે તારણ-દીઠ maintainer attestation જાળવીએ છીએ:

- **[`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md)** —
  તારણ-દીઠ નકશો: source file ↔ ધ્વજાંકિત chunk ↔ વર્તણૂક ↔ v3.8.6માં
  લાગુ કરાયેલ mitigation.
- દરેક ધ્વજાંકિત function પરના in-source `SECURITY-AUDITOR-NOTE:` blocks
  એ જ દસ્તાવેજ તરફ સંદર્ભ આપે છે.

જે વપરાશકર્તાઓની pipeline alertને શિથિલ કરી શકતી નથી તેમના માટે:
`OMNIROUTE_BUILD_PROFILE=minimal npm run build` વડે build કરો. આ ચાર
સંવેદનશીલ modulesને એવા stubsથી બદલે છે જે runtime પર HTTP 503
`feature-disabled` પરત કરે છે, જેથી વિશેષાધિકૃત code paths bundleમાંથી ભૌતિક રીતે
ગેરહાજર રહે છે. પ્રકાશન પ્રક્રિયા માટે
[`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md)
જુઓ.

## સંદર્ભો

- [`docs/architecture/AUTHZ_GUIDE.md`](docs/architecture/AUTHZ_GUIDE.md) — અધિકૃતતા પાઇપલાઇન
- [`docs/security/GUARDRAILS.md`](docs/security/GUARDRAILS.md) — ગાર્ડરેલ્સ ફ્રેમવર્ક
- [`docs/security/COMPLIANCE.md`](docs/security/COMPLIANCE.md) — ઑડિટ લૉગ અને જાળવણી
- [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md) — સાર્વજનિક અપસ્ટ્રીમ ક્રેડેન્શિયલ્સ માટેની **ફરજિયાત** પેટર્ન
- [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md) — એરર રિસ્પોન્સ માટેની **ફરજિયાત** પેટર્ન
- [`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md) — સપ્લાય-ચેઇન સ્કેનરના તારણો માટે મેઇન્ટેનર પ્રમાણન
- [`docs/architecture/RESILIENCE_GUIDE.md`](docs/architecture/RESILIENCE_GUIDE.md) — સર્કિટ બ્રેકર + કૂલડાઉન + લૉકઆઉટ
- [`docs/security/STEALTH_GUIDE.md`](docs/security/STEALTH_GUIDE.md) — TLS ફિંગરપ્રિન્ટિંગ (કાનૂની/નૈતિક સૂચના)
- [`CLAUDE.md`](CLAUDE.md) — AI એજન્ટ્સ માટેના કડક નિયમો
- [tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults) — ક્યુરેટ કરેલી સિક્યોર-બાય-ડિફૉલ્ટ લાઇબ્રેરીઓ
