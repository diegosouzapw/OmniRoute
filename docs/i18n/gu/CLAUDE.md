# CLAUDE.md (ગુજરાતી)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇮🇩 [in](../in/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md)

---

આ ફાઇલ claude.ai/code સાથે કોડ પર કામ કરતી વખતે માર્ગદર્શન પ્રદાન કરે છે.

## ઝડપી શરૂઆત

```bash
npm install                    # deps સ્થાપિત કરો (.auto-generates .env from .env.example)
npm run dev                    # ડેવ સર્વર http://localhost:20128 પર
npm run build                  # ઉત્પાદન બિલ્ડ (Next.js 16 standalone)
npm run lint                   # ESLint (0 ભૂલો અપેક્ષિત; ચેતવણીઓ પૂર્વ-અસ્તિત્વમાં છે)
npm run typecheck:core         # TypeScript ચેક (સફળ હોવું જોઈએ)
npm run typecheck:noimplicit:core  # કડક ચેક (કોઈ પણ નમ્ર નથી)
npm run test:coverage          # યુનિટ પરીક્ષાઓ + કવરેજ ગેટ (75/75/75/70 — નિવેદનો/લાઇનો/ફંક્શન/શાખાઓ)
npm run check                  # lint + પરીક્ષા સંયુક્ત
npm run check:cycles           # વર્તુળની નિર્ભરતા શોધો
```

### પરીક્ષાઓ ચલાવવી

```bash
# એકલ પરીક્ષા ફાઇલ (Node.js નેટિવ પરીક્ષા રનર — સૌથી વધુ પરીક્ષાઓ)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Vitest (MCP સર્વર, autoCombo, કેશ)
npm run test:vitest

# તમામ સૂટ
npm run test:all
```

પૂર્ણ પરીક્ષા મેટ્રિક્સ માટે, `CONTRIBUTING.md` → "પરીક્ષાઓ ચલાવવી" જુઓ. ઊંડા આર્કિટેક્ચર માટે, `AGENTS.md` જુઓ.

---

## પ્રોજેક્ટ એક નજરમાં

**OmniRoute** — એકીકૃત AI પ્રોક્સી/રાઉટર. એક એન્ડપોઈન્ટ, 160+ LLM પ્રદાતાઓ, ઓટો-ફોલબેક.

| સ્તર          | સ્થાન                   | ઉદ્દેશ્ય                                                        |
| ------------- | ----------------------- | --------------------------------------------------------------- |
| API Routes    | `src/app/api/v1/`       | Next.js એપ્લિકેશન રાઉટર — પ્રવેશ બિંદુઓ                         |
| Handlers      | `open-sse/handlers/`    | વિનંતી પ્રક્રિયા (ચેટ, એમ્બેડિંગ્સ, વગેરે)                      |
| Executors     | `open-sse/executors/`   | પ્રદાતા-વિશિષ્ટ HTTP વિતરણ                                      |
| Translators   | `open-sse/translator/`  | ફોર્મેટ રૂપાંતરણ (OpenAI↔Claude↔Gemini)                         |
| Transformer   | `open-sse/transformer/` | પ્રતિસાદ API ↔ ચેટ પૂર્ણતાઓ                                     |
| Services      | `open-sse/services/`    | કોમ્બો રાઉટિંગ, દર મર્યાદાઓ, કેશિંગ, વગેરે                      |
| Database      | `src/lib/db/`           | SQLite ડોમેન મોડ્યુલ (45+ ફાઇલો, 55 માઇગ્રેશન)                  |
| Domain/Policy | `src/domain/`           | નીતિ એન્જિન, ખર્ચના નિયમો, ફોલબેક લોજિક                         |
| MCP Server    | `open-sse/mcp-server/`  | 37 સાધનો (30 આધાર + 3 મેમરી + 4 કુશળતાઓ), 3 પરિવહન, ~13 સ્કોપ્સ |
| A2A Server    | `src/lib/a2a/`          | JSON-RPC 2.0 એજન્ટ પ્રોટોકોલ                                    |
| Skills        | `src/lib/skills/`       | વિસ્તરણશીલ કુશળતા ફ્રેમવર્ક                                     |
| Memory        | `src/lib/memory/`       | સતત સંવાદ મેમરી                                                 |

મોનોરેપો: `src/` (Next.js 16 એપ્લિકેશન), `open-sse/` (સ્ટ્રીમિંગ એન્જિન કાર્યસ્થળ), `electron/` (ડેસ્કટોપ એપ્લિકેશન), `tests/`, `bin/` (CLI પ્રવેશ બિંદુ).

## વિનંતી પાઇપલાઇન

```
Client → /v1/chat/completions (Next.js માર્ગ)
  → CORS → Zod માન્યતા → auth? → નીતિ ચકાસણી → પ્રોમ્પ્ટ ઇન્જેક્શન ગાર્ડ
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → કેશ ચકાસણી → દર મર્યાદા → કોમ્બો રૂટિંગ?
      → resolveComboTargets() → handleSingleModel() પ્રતિ લક્ષ્ય
    → translateRequest() → getExecutor() → executor.execute()
      → fetch() upstream → retry w/ backoff
    → પ્રતિસાદ અનુવાદ → SSE સ્ટ્રીમ અથવા JSON
    → જો Responses API: responsesTransformer.ts TransformStream
```

API માર્ગો એક સંગ્રહિત પેટર્નનું પાલન કરે છે: `Route → CORS preflight → Zod body validation → વૈકલ્પિક auth (extractApiKey/isValidApiKey) → API કી નીતિ અમલ → Handler delegation (open-sse)` . કોઈ વૈશ્વિક Next.js માધ્યમ નથી — અવરોધન માર્ગ-વિશિષ્ટ છે.

**કોમ્બો રૂટિંગ** (`open-sse/services/combo.ts`): 14 વ્યૂહો (પ્રાથમિકતા, વજનદાર, ફીલ-ફર્સ્ટ, રાઉન્ડ-રોબિન, P2C, રેન્ડમ, ઓછા-વપરાયેલી, ખર્ચ-ઓપ્ટિમાઇઝ્ડ, રીસેટ-જાણકાર, કડક-રેન્ડમ, ઓટો, lkgp, સંદર્ભ-ઓપ્ટિમાઇઝ્ડ, સંદર્ભ-રિલે). દરેક લક્ષ્ય `handleSingleModel()` ને કૉલ કરે છે જે `handleChatCore()` ને પ્રતિ-લક્ષ્ય ભૂલ હેન્ડલિંગ અને સર્કિટ બ્રેકર ચકાસણીઓ સાથે લપેટે છે. 9-ફેક્ટ ઓટો-કોમ્બો સ્કોરિંગ માટે `docs/routing/AUTO-COMBO.md` જુઓ અને 3 રેસિલિયન્સ સ્તરો માટે `docs/architecture/RESILIENCE_GUIDE.md` જુઓ.

---

## રેસિલિયન્સ રનટાઇમ સ્ટેટ

OmniRoute પાસે ત્રણ સંબંધિત પરંતુ અલગ તાત્કાલિક-અસફળતા મિકેનિઝમ છે. રૂટિંગ વર્તન ડિબગ કરતી વખતે તેમના વ્યાપને અલગ રાખો. એક નજરમાં નકશો માટે [3-સ્તરીય રેસિલિયન્સ આકૃતિ](./docs/diagrams/exported/resilience-3layers.svg) જુઓ (સ્ત્રોત: [docs/diagrams/resilience-3layers.mmd](./docs/diagrams/resilience-3layers.mmd)).

### પ્રદાતા સર્કિટ બ્રેકર

**વ્યાપ**: સમગ્ર પ્રદાતા, ઉદાહરણ તરીકે `glm`, `openai`, `anthropic`.

**ઉદ્દેશ**: એક પ્રદાતા તરફ ટ્રાફિક મોકલવાનું રોકવું જે વારંવાર upstream/service સ્તરે નિષ્ફળ થઈ રહ્યું છે, જેથી એક અસ્વસ્થ પ્રદાતા દરેક વિનંતીને ધીમું ન કરે.

**અમલ**:

- કોર વર્ગ: `src/shared/utils/circuitBreaker.ts`
- ચેટ ગેટ/કાર્યકારી વાયરિંગ: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- રનટાઇમ સ્થિતિ API: `src/app/api/monitoring/health/route.ts`
- શેર કરેલ રેપર્સ: `open-sse/services/accountFallback.ts`
- પર્સિસ્ટેડ સ્ટેટ ટેબલ: `domain_circuit_breakers`

**સ્થિતિઓ**:

- `CLOSED`: સામાન્ય ટ્રાફિકની મંજૂરી છે.
- `OPEN`: પ્રદાતા તાત્કાલિક બ્લોક કરવામાં આવ્યો છે; કૉલર્સને પ્રદાતા-સર્કિટ-ઓપન પ્રતિસાદ મળે છે અથવા કોમ્બો રૂટિંગ બીજા લક્ષ્ય પર જતી રહે છે.
- `HALF_OPEN`: રીસેટ ટાઇમઆઉટ પસાર થઈ ગયો છે; એક પ્રોબ વિનંતીની મંજૂરી આપો. સફળતા બ્રેકર બંધ કરે છે, નિષ્ફળતા તેને ફરીથી ખોલે છે.

**ડિફોલ્ટ્સ** (`open-sse/config/constants.ts`):

- OAuth પ્રદાતા: થ્રેશોલ્ડ `3`, રીસેટ ટાઇમઆઉટ `60s`.
- API-કી પ્રદાતા: થ્રેશોલ્ડ `5`, રીસેટ ટાઇમઆઉટ `30s`.
- સ્થાનિક પ્રદાતા: થ્રેશોલ્ડ `2`, રીસેટ ટાઇમઆઉટ `15s`.

ફક્ત પ્રદાતા-સ્તરીય નિષ્ફળતા સ્થિતિઓ જ પ્રદાતા બ્રેકરને ટ્રિપ કરવી જોઈએ:

```ts
(408, 500, 502, 503, 504);
```

સામાન્ય ખાતા/કી/મોડલ ભૂલો જેવી કે મોટાભાગની `401`, `403`, અથવા `429` કેસો માટે સમગ્ર-પ્રદાતા બ્રેકર ટ્રિપ ન કરો. તે સામાન્ય રીતે કનેક્શન કૂલડાઉન અથવા મોડલ લોકઆઉટમાં આવે છે. એક સામાન્ય API-કી પ્રદાતા `403` પુનઃપ્રાપ્ય હોવું જોઈએ જો તે ટર્મિનલ પ્રદાતા/ખાતાની ભૂલ તરીકે વર્ગીકૃત ન કરવામાં આવે.

બ્રેકર આલસ્ય પુનઃપ્રાપ્તિનો ઉપયોગ કરે છે, પૃષ્ઠભૂમિ ટાઇમર નથી. જ્યારે `OPEN` સમાપ્ત થાય છે, ત્યારે `getStatus()`, `canExecute()`, અને `getRetryAfterMs()` જેવી વાંચનોએ રાજ્યને `HALF_OPEN` માં રિફ્રેશ કરે છે, જેથી ડેશબોર્ડ અને કોમ્બો ઉમેદવાર બિલ્ડર્સ એક સમાપ્ત પ્રદાતા ને સદાય માટે બહાર ન રાખે.

### કનેક્શન કૂલડાઉન

**વ્યાપ**: એક પ્રદાતા કનેક્શન/ખાતું/કી.

**ઉદ્દેશ**: એક ખરાબ કી/ખાતાને તાત્કાલિક છોડી દેવું જ્યારે સમાન પ્રદાતા માટે અન્ય કનેક્શનને વિનંતીઓ સેવા આપવા માટે ચાલુ રહેવા દેવું.

**અમલ**:

- લખવા/અપડેટ પાથ: `src/sse/services/auth.ts::markAccountUnavailable()`
- ખાતા પસંદગી/ફિલ્ટરિંગ: `src/sse/services/auth.ts::getProviderCredentials...`
- કૂલડાઉન ગણતરી: `open-sse/services/accountFallback.ts::checkFallbackError()`
- સેટિંગ્સ: `src/lib/resilience/settings.ts`

પ્રદાતા કનેક્શનો પર મહત્વપૂર્ણ ક્ષેત્રો:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

ખાતા પસંદગી દરમિયાન, એક કનેક્શન છોડી દેવામાં આવે છે જ્યારે:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

કૂલડાઉન પણ આલસ્ય છે: જ્યારે `rateLimitedUntil` ભૂતકાળમાં હોય છે, ત્યારે કનેક્શન ફરીથી યોગ્ય બની જાય છે. સફળ ઉપયોગ પર, `clearAccountError()` `testStatus`, `rateLimitedUntil`, ભૂલ ક્ષેત્રો, અને `backoffLevel`ને સાફ કરે છે.

ડિફોલ્ટ કનેક્શન કૂલડાઉન વર્તન:

- OAuth આધાર કૂલડાઉન: `5s`.
- API-કી આધાર કૂલડાઉન: `3s`.
- API-કી `429` ઉપલબ્ધ હોય ત્યારે upstream પુનઃપ્રાપ્તિ સૂચનો (`Retry-After`, રીસેટ હેડર્સ, અથવા પાર્સેબલ રીસેટ ટેક્સ્ટ) પસંદ કરવું જોઈએ.
- પુનરાવર્તિત પુનઃપ્રાપ્ય નિષ્ફળતાઓ એક્સપોનેન્શિયલ બેકઓફનો ઉપયોગ કરે છે:

```ts
baseCooldownMs * 2 ** failureIndex;
```

એન્ટી-થન્ડરિંગ-હર્ડ ગાર્ડ સમાન કનેક્શન પર સમાન નિષ્ફળતાઓને પુનરાવર્તિત રીતે કૂલડાઉન વધારવા અથવા `backoffLevel`ને ડબલ-ઇન્ક્રિમેન્ટ કરવા રોકે છે.

ટર્મિનલ સ્થિતિઓ કૂલડાઉન નથી. `banned`, `expired`, અને `credits_exhausted`ને પ્રમાણપત્રો/સેટિંગ્સ બદલાય ત્યાં સુધી ઉપલબ્ધ રહેવું જોઈએ અથવા એક ઓપરેટર તેમને ફરીથી સેટ કરે છે. ટર્મિનલ સ્થિતિઓને તાત્કાલિક કૂલડાઉન સ્થિતિ સાથેOverwrite ન કરો.

### મોડલ લોકઆઉટ

**વ્યાપ**: પ્રદાતા + કનેક્શન + મોડલ.

**ઉદ્દેશ**: જ્યારે માત્ર એક મોડલ ઉપલબ્ધ નથી અથવા તે ક્વોટા-મર્યાદિત છે ત્યારે સમગ્ર કનેક્શનને બંધ કરવાનું ટાળવું.

ઉદાહરણો:

- પ્રતિ-મોડલ ક્વોટા પ્રદાતા `429` પાછા આપે છે.
- સ્થાનિક પ્રદાતા એક ગુમ થયેલ મોડલ માટે `404` પાછા આપે છે.
- પ્રદાતા-વિશિષ્ટ મોડ/મોડલ પરવાનગીની નિષ્ફળતાઓ જેમ કે પસંદ કરેલ ગ્રોક મોડ્સ.

મોડલ લોકઆઉટ `open-sse/services/accountFallback.ts` માં રહે છે અને સમાન કનેક્શનને અન્ય મોડલ સેવા આપવા દે છે.

### ડિબગિંગ માર્ગદર્શન

- જો પ્રદાતા માટે તમામ કી છોડી દેવામાં આવે છે, તો પ્રદાતા બ્રેકર સ્થિતિ અને દરેક કનેક્શનના `rateLimitedUntil`/`testStatus`ને તપાસો.
- જો એક પ્રદાતા પુનઃસેટ વિન્ડો પછી કાયમીExcluded લાગે છે, તો તપાસો કે શું કોડ કાચા `state`ને વાંચી રહ્યું છે તેના બદલે `getStatus()`/`canExecute()` નો ઉપયોગ કરી રહ્યું છે.
- જો એક પ્રદાતા કી નિષ્ફળ જાય પરંતુ અન્ય કાર્ય કરવા જોઈએ, તો પ્રદાતા બ્રેકર કરતાં કનેક્શન કૂલડાઉનને પસંદ કરો.
- જો માત્ર એક મોડલ નિષ્ફળ જાય, તો કનેક્શન કૂલડાઉન કરતાં મોડલ લોકઆઉટને પસંદ કરો.
- જો એક રાજ્ય સ્વયં-પુનઃપ્રાપ્તિ કરવું જોઈએ, તો તેમાં ભવિષ્યની ટાઇમસ્ટેમ્પ/રીસેટ ટાઇમઆઉટ અને એક વાંચન પાથ હોવો જોઈએ જે સમાપ્ત રાજ્યને રિફ્રેશ કરે. કાયમી સ્થિતિઓ માટે મેન્યુઅલ પ્રમાણપત્ર અથવા કન્ફિગ ફેરફારોની જરૂર છે.

## મુખ્ય પરંપરાઓ

### કોડ શૈલી

- **2 જગ્યા**, સેમિકોલન, ડબલ કોટ્સ, 100 અક્ષર પહોળાઈ, es5 ટ્રેઇલિંગ કોમ્મા (lint-staged દ્વારા Prettier દ્વારા અમલમાં)
- **આયાતો**: બાહ્ય → આંતરિક (`@/`, `@omniroute/open-sse`) → સંબંધિત
- **નામકરણ**: ફાઇલો=camelCase/kebab, ઘટકો=PascalCase, સ્થિરતા=UPPER_SNAKE
- **ESLint**: `no-eval`, `no-implied-eval`, `no-new-func` = દરેક જગ્યાએ ભૂલ; `no-explicit-any` = `open-sse/` અને `tests/` માં ચેતવણી
- **TypeScript**: `strict: false`, લક્ષ્ય ES2022, મોડ્યુલ esnext, રિઝોલ્યુશન bundler. સ્પષ્ટ પ્રકારોને પ્રાથમિકતા આપો.

### ડેટાબેસ

- **હંમેશા** `src/lib/db/` ડોમેન મોડ્યુલ્સ દ્વારા જાઓ — **ક્યારેય** રૂા SQL રાઉટ્સ અથવા હેન્ડલર્સમાં ન લખો
- **ક્યારેય** `src/lib/localDb.ts` માં લોજિક ઉમેરશો નહીં (ફક્ત પુનઃ-નિકાસ સ્તર)
- **ક્યારેય** `localDb.ts` માં બેરલ-આયાત ન કરો — તેના બદલે ચોક્કસ `db/` મોડ્યુલ્સ આયાત કરો
- DB સિંગલટન: `getDbInstance()` `src/lib/db/core.ts` માંથી (WAL જર્નલિંગ)
- માઇગ્રેશન: `src/lib/db/migrations/` — સંસ્કરણવાળા SQL ફાઇલો, આઇડેમ્પોટન્ટ, ટ્રાન્ઝેક્શનમાં ચલાવો

### ભૂલ સંભાળવું

- ચોક્કસ ભૂલ પ્રકારો સાથે try/catch, pino સંદર્ભ સાથે લોગ કરો
- SSE સ્ટ્રીમમાં ભૂલો ક્યારેય ન છુપાવો — સફાઈ માટે abort સંકેતોનો ઉપયોગ કરો
- યોગ્ય HTTP સ્થિતિ કોડ્સ પરત કરો (4xx/5xx)

### સુરક્ષા

- **ક્યારેય** `eval()`, `new Function()`, અથવા IMPLIED eval નો ઉપયોગ ન કરો
- Zod સ્કીમા સાથે તમામ ઇનપુટને માન્ય બનાવો
- આરામ પર ક્રેડેંશિયલ્સને એન્ક્રિપ્ટ કરો (AES-256-GCM)
- અપસ્ટ્રીમ હેડર ડિનાયલિસ્ટ: `src/shared/constants/upstreamHeaders.ts` — સંપાદન કરતી વખતે સાફ, Zod સ્કીમા, અને યુનિટ ટેસ્ટને સમન્વયિત રાખો
- **જાહેર અપસ્ટ્રીમ ક્રેડેંશિયલ્સ** (Gemini/Antigravity/Windsurf-શૈલી OAuth client_id/secret + Firebase વેબ કી જાહેર CLIsમાંથી કાઢી લેવામાં આવી): **જરૂરી** છે `resolvePublicCred()` દ્વારા એમ્બેડ કરવું `open-sse/utils/publicCreds.ts` માં — **ક્યારેય** સ્ટ્રિંગ લિટરલ તરીકે નહીં. ફરજિયાત પેટર્ન માટે `docs/security/PUBLIC_CREDS.md` જુઓ.
- **ભૂલ પ્રતિસાદ** (HTTP / SSE / executor / MCP હેન્ડલર): **જરૂરી** છે `buildErrorBody()` અથવા `sanitizeErrorMessage()` દ્વારા માર્ગદર્શન આપવું `open-sse/utils/error.ts` માં — **ક્યારેય** કાચા `err.stack` અથવા `err.message` ને પ્રતિસાદના શરીરમાં ન મૂકો. `docs/security/ERROR_SANITIZATION.md` જુઓ.
- **ચલનશીલ કમાન્ડ્સ જે ચર સાથે બનાવવામાં આવે છે**: જ્યારે `exec()`/`spawn()` ને સ્ક્રિપ્ટ સાથે કૉલ કરો જે રનટાઇમ મૂલ્યોની જરૂર છે, ત્યારે તેમને `env` વિકલ્પ દ્વારા પસાર કરો (સ્વચાલિત રીતે શેલ-એસ્કેપ્ડ) — **ક્યારેય** વિશ્વાસ ન કરાતા/બાહ્ય પાથને સ્ક્રિપ્ટના શરીરમાં સ્ટ્રિંગ-ઇન્ટરપોલેટ ન કરો. સંદર્ભ: `src/mitm/cert/install.ts::updateNssDatabases`.
- **સુરક્ષિત-દ્વારા-ડિફોલ્ટ લાઇબ્રેરીઝ** ([tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults)): નવા સુરક્ષા-સંવેદનશીલ સપાટી ઉમેરતી વખતે કસ્ટમ અમલના બદલે Helmet.js, DOMPurify, ssrf-req-filter, safe-regex, Google Tinkને પ્રાથમિકતા આપો.

---

## સામાન્ય ફેરફાર પરિસ્થિતિઓ

### નવા પ્રદાતા ઉમેરવો

1. `src/shared/constants/providers.ts` માં નોંધણી કરો (લોડ પર Zod-માન્ય)
2. જો કસ્ટમ લોજિકની જરૂર હોય તો `open-sse/executors/` માં એક્ઝિક્યુટર ઉમેરો ( `BaseExecutor` ને વિસ્તૃત કરો)
3. જો નોન-ઓપનએઆઈ ફોર્મેટ હોય તો `open-sse/translator/` માં અનુવાદક ઉમેરો
4. જો OAuth આધારિત હોય તો `src/lib/oauth/constants/oauth.ts` માં OAuth કન્ફિગ ઉમેરો — જો અપસ્ટ્રીમ CLI જાહેર client_id/secret મોકલે, તો `resolvePublicCred()` દ્વારા એમ્બેડ કરો (જુઓ `docs/security/PUBLIC_CREDS.md`), **ક્યારેય** લિટરલ તરીકે નહીં
5. `open-sse/config/providerRegistry.ts` માં મોડલ્સ નોંધણી કરો
6. `tests/unit/` માં ટેસ્ટ લખો (જો તમે નવા એમ્બેડેડ ડિફોલ્ટ ઉમેર્યા હોય તો જાહેરCreds આકારની પુષ્ટિનો સમાવેશ કરો)

### નવા API માર્ગ ઉમેરવો

1. `src/app/api/v1/your-route/` હેઠળ ડિરેક્ટરી બનાવો
2. `GET`/`POST` હેન્ડલર્સ સાથે `route.ts` બનાવો
3. પેટર્ન અનુસરો: CORS → Zod શરીર માન્યતા → વૈકલ્પિક ઓથ → હેન્ડલર ડેલિગેશન
4. હેન્ડલર `open-sse/handlers/` માં જાય છે (ત્યાંથી આયાત કરો, ઇનલાઇન નહીં)
5. ભૂલ પ્રતિસાદો `buildErrorBody()` / `errorResponse()` નો ઉપયોગ કરે છે `open-sse/utils/error.ts` માં (સ્વચાલિત રીતે સાફ — ક્યારેય `err.stack` અથવા `err.message` કાચા શરીરમાં ન મૂકો). `docs/security/ERROR_SANITIZATION.md` જુઓ.
6. ટેસ્ટ ઉમેરો — જેમાં ઓછામાં ઓછું એક પુષ્ટિ છે કે ભૂલ પ્રતિસાદ સ્ટેક ટ્રેસને લીક નથી કરતી (`!body.error.message.includes("at /")`)

### નવા DB મોડ્યુલ ઉમેરવો

1. `src/lib/db/yourModule.ts` બનાવો — `./core.ts` માંથી `getDbInstance` આયાત કરો
2. તમારા ડોમેન ટેબલ માટે CRUD ફંક્શન નિકાસ કરો
3. જો નવી ટેબલની જરૂર હોય તો `src/lib/db/migrations/` માં માઇગ્રેશન ઉમેરો
4. `src/lib/localDb.ts` માંથી પુનઃ-નિકાસ કરો (ફક્ત પુનઃ-નિકાસ યાદીમાં ઉમેરો)
5. ટેસ્ટ લખો

### નવા MCP ટૂલ ઉમેરવો

1. Zod ઇનપુટ સ્કીમા + અસિંક હેન્ડલર સાથે `open-sse/mcp-server/tools/` માં ટૂલ વ્યાખ્યા ઉમેરો
2. ટૂલ સેટમાં નોંધણી કરો ( `createMcpServer()` દ્વારા વાયરડ)
3. યોગ્ય સ્કોપ(ઓ)ને સોંપો
4. ટેસ્ટ લખો (ટૂલ કૉલને `mcp_audit` ટેબલમાં લોગ કરવામાં આવે છે)

### નવા A2A સ્કિલ ઉમેરવો

1. `src/lib/a2a/skills/` માં સ્કિલ બનાવો (5 પહેલાથી જ છે: સ્માર્ટ-રાઉટિંગ, ક્વોટા-મૅનેજમેન્ટ, પ્રદાતા-ખોજ, ખર્ચ-વિશ્લેષણ, આરોગ્ય-રિપોર્ટ)
2. સ્કિલ કાર્ય સંદર્ભ (સંદેશા, મેટાડેટા) પ્રાપ્ત કરે છે → રચિત પરિણામ પરત કરે છે
3. `src/lib/a2a/taskExecution.ts` માં `A2A_SKILL_HANDLERS` માં નોંધણી કરો
4. `src/app/.well-known/agent.json/route.ts` માં બહાર પાડો (એજન્ટ કાર્ડ)
5. `tests/unit/` માં ટેસ્ટ લખો
6. `docs/frameworks/A2A-SERVER.md` સ્કિલ ટેબલમાં દસ્તાવેજ કરો

### નવા ક્લાઉડ એજન્ટ ઉમેરવો

1. `src/lib/cloudAgent/agents/` માં `CloudAgentBase` ને વિસ્તૃત કરતી એજન્ટ ક્લાસ બનાવો (3 પહેલાથી જ છે: codex-cloud, devin, jules)
2. `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources` અમલમાં લાવો
3. `src/lib/cloudAgent/registry.ts` માં નોંધણી કરો
4. જો જરૂર હોય તો OAuth/ક્રેડેંશિયલ્સ સંભાળવું (`src/lib/oauth/providers/`)
5. ટેસ્ટ + `docs/frameworks/CLOUD_AGENT.md` માં દસ્તાવેજ

### નવા ગાર્ડરેલ / ઇવલ / સ્કિલ / વેબહૂક ઇવેન્ટ ઉમેરવો

- ગાર્ડરેલ: `src/lib/guardrails/` → દસ્તાવેજ: `docs/security/GUARDRAILS.md`
- ઇવલ સ્યુટ: `src/lib/evals/` → દસ્તાવેજ: `docs/frameworks/EVALS.md`
- સ્કિલ (સેન્ડબોક્સ): `src/lib/skills/` → દસ્તાવેજ: `docs/frameworks/SKILLS.md`
- વેબહૂક ઇવેન્ટ: `src/lib/webhookDispatcher.ts` → દસ્તાવેજ: `docs/frameworks/WEBHOOKS.md`

## સંદર્ભ દસ્તાવેજ

કોઈપણ નોન-ટ્રિવિયલ ફેરફાર માટે, પહેલા મેળ ખાતા ડીપ-ડાઈવ વાંચો:

| વિસ્તાર                                      | દસ્તાવેજ                                                          |
| -------------------------------------------- | ----------------------------------------------------------------- |
| રેપો નેવિગેશન                                | `docs/architecture/REPOSITORY_MAP.md`                             |
| આર્કિટેક્ચર                                  | `docs/architecture/ARCHITECTURE.md`                               |
| એન્જિનિયરિંગ સંદર્ભ                          | `docs/architecture/CODEBASE_DOCUMENTATION.md`                     |
| ઓટો-કોમ્બો (9-ફેક્ટર સ્કોરિંગ, 14 વ્યૂહો)    | `docs/routing/AUTO-COMBO.md`                                      |
| રેઝિલિયન્સ (3 મિકેનિઝમ)                      | `docs/architecture/RESILIENCE_GUIDE.md`                           |
| રીઝનિંગ રિપ્લે                               | `docs/routing/REASONING_REPLAY.md`                                |
| સ્કિલ્સ ફ્રેમવર્ક                            | `docs/frameworks/SKILLS.md`                                       |
| મેમરી સિસ્ટમ (FTS5 + Qdrant)                 | `docs/frameworks/MEMORY.md`                                       |
| ક્લાઉડ એજન્ટ્સ                               | `docs/frameworks/CLOUD_AGENT.md`                                  |
| ગાર્ડરેલ્સ (PII / ઇન્જેક્શન / વિઝન)          | `docs/security/GUARDRAILS.md`                                     |
| જાહેર અપસ્ટ્રીમ ક્રેડેન્શિયલ્સ (Gemini/etc.) | `docs/security/PUBLIC_CREDS.md`                                   |
| ભૂલ સંદેશા સાફ કરવા                          | `docs/security/ERROR_SANITIZATION.md`                             |
| ઇવલ્સ                                        | `docs/frameworks/EVALS.md`                                        |
| અનુરૂપતા / ઓડિટ                              | `docs/security/COMPLIANCE.md`                                     |
| વેબહૂક્સ                                     | `docs/frameworks/WEBHOOKS.md`                                     |
| અધિકૃતતા પાઇપલાઇન                            | `docs/architecture/AUTHZ_GUIDE.md`                                |
| સ્ટેલ્થ (TLS / ફિંગરપ્રિન્ટ)                 | `docs/security/STEALTH_GUIDE.md`                                  |
| એજન્ટ પ્રોટોકોલ્સ (A2A / ACP / ક્લાઉડ)       | `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`                        |
| MCP સર્વર                                    | `docs/frameworks/MCP-SERVER.md`                                   |
| A2A સર્વર                                    | `docs/frameworks/A2A-SERVER.md`                                   |
| API સંદર્ભ + OpenAPI                         | `docs/reference/API_REFERENCE.md` + `docs/reference/openapi.yaml` |
| પ્રદાતા કૅટલોગ (ઓટો-જનરેટેડ)                 | `docs/reference/PROVIDER_REFERENCE.md`                            |
| રિલીઝ પ્રવાહ                                 | `docs/ops/RELEASE_CHECKLIST.md`                                   |

---

## પરીક્ષણ

| શું                      | આદેશ                                                              |
| ------------------------ | ----------------------------------------------------------------- |
| યુનિટ પરીક્ષણ            | `npm run test:unit`                                               |
| એકલ ફાઇલ                 | `node --import tsx/esm --test tests/unit/file.test.ts`            |
| વિટેસ્ટ (MCP, autoCombo) | `npm run test:vitest`                                             |
| E2E (પ્લેવિરાઇટ)         | `npm run test:e2e`                                                |
| પ્રોટોકોલ E2E (MCP+A2A)  | `npm run test:protocols:e2e`                                      |
| ઇકોસિસ્ટમ                | `npm run test:ecosystem`                                          |
| કવરેજ ગેટ                | `npm run test:coverage` (75/75/75/70 — નિવેદનો/લાઇન/ફંક્શન/શાખાઓ) |
| કવરેજ રિપોર્ટ            | `npm run coverage:report`                                         |

**PR નિયમ**: જો તમે `src/`, `open-sse/`, `electron/`, અથવા `bin/` માં ઉત્પાદન કોડ બદલો છો, તો તમારે તે જ PR માં પરીક્ષણો સામેલ કરવા અથવા અપડેટ કરવા જોઈએ.

**પરીક્ષણ સ્તર પ્રાથમિકતા**: યુનિટ પહેલા → ઇન્ટિગ્રેશન (મલ્ટી-મોડ્યુલ અથવા DB રાજ્ય) → E2E (UI/વર્કફ્લો માત્ર). બગ પુનરાવૃત્તિઓને સ્વચાલિત પરીક્ષણો તરીકે કોડ કરો પહેલા અથવા સુધારણા સાથે.

**કોપાઇલોટ કવરેજ નીતિ**: જ્યારે PR ઉત્પાદન કોડને બદલે છે અને કવરેજ 75% (નિવેદનો/લાઇન/ફંક્શન) અથવા 70% (શાખાઓ) ની નીચે છે, તો ફક્ત રિપોર્ટ ન કરો — પરીક્ષણો ઉમેરો અથવા અપડેટ કરો, કવરેજ ગેટ ફરી ચલાવો, પછી પુષ્ટિ માટે પૂછો. PR રિપોર્ટમાં ચલાવેલ આદેશો, બદલાયેલ પરીક્ષણ ફાઇલો, અને અંતિમ કવરેજ પરિણામ સામેલ કરો.

---

## Git વર્કફ્લો

```bash
# ક્યારેય સીધા મુખ્યમાં કમિટ ન કરો
git checkout -b feat/your-feature
git commit -m "feat: તમારા ફેરફારનું વર્ણન કરો"
git push -u origin feat/your-feature
```

**બ્રાંચ પ્રિફિક્સ**: `feat/`, `fix/`, `refactor/`, `docs/`, `test/`, `chore/`

**કમિટ ફોર્મેટ** (પરંપરાગત કમિટ્સ): `feat(db): સર્કિટ બ્રેકર ઉમેરો` — સ્કોપ્સ: `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`

**હસ્કી હૂક્સ**:

- **પ્રિ-કમિટ**: lint-staged + `check-docs-sync` + `check:any-budget:t11`
- **પ્રિ-પુશ**: `npm run test:unit`

---

## પર્યાવરણ

- **રનટાઇમ**: Node.js ≥20.20.2 <21 || ≥22.22.2 <23 || ≥24 <25, ES Modules
- **ટાઇપસ્ક્રિપ્ટ**: 5.9+, લક્ષ્ય ES2022, મોડ્યુલ esnext, રિઝોલ્યુશન બંડલર
- **પાથ એલિયાસ**: `@/*` → `src/`, `@omniroute/open-sse` → `open-sse/`, `@omniroute/open-sse/*` → `open-sse/*`
- **ડિફોલ્ટ પોર્ટ**: 20128 (API + ડેશબોર્ડ એક જ પોર્ટ પર)
- **ડેટા ડિરેક્ટરી**: `DATA_DIR` env var, ડિફોલ્ટ `~/.omniroute/`
- **કી env vars**: `PORT`, `JWT_SECRET`, `API_KEY_SECRET`, `INITIAL_PASSWORD`, `REQUIRE_API_KEY`, `APP_LOG_LEVEL`
- સેટઅપ: `cp .env.example .env` પછી `JWT_SECRET` (`openssl rand -base64 48`) અને `API_KEY_SECRET` (`openssl rand -hex 32`) જનરેટ કરો

---

## કઠોર નિયમો

1. ક્યારેય ગુપ્તતા અથવા પ્રમાણપત્રો કમિટ ન કરો
2. ક્યારેય `localDb.ts` માં લોજિક ઉમેરો ન કરો
3. ક્યારેય `eval()` / `new Function()` / સૂચિત eval નો ઉપયોગ ન કરો
4. ક્યારેય સીધા `main` માં કમિટ ન કરો
5. ક્યારેય રૂટમાં કાચા SQL ન લખો — `src/lib/db/` મોડ્યુલનો ઉપયોગ કરો
6. ક્યારેય SSE સ્ટ્રીમમાં ભૂલને મૌન રીતે નાશ ન કરો
7. હંમેશા Zod સ્કીમા સાથે ઇનપુટને માન્ય બનાવો
8. ઉત્પાદન કોડ બદલતા સમયે હંમેશા પરીક્ષણો સામેલ કરો
9. કવરેજ ≥75% (નિવેદનો, લાઇન, ફંક્શન) / ≥70% (શાખાઓ) રહેવું જોઈએ. વર્તમાન માપવામાં આવેલ: ~82%.
10. સ્પષ્ટ ઓપરેટર મંજૂરી વિના હસ્કી હૂક્સ (`--no-verify`, `--no-gpg-sign`) ને ક્યારેય બાયપાસ ન કરો.
11. ક્યારેય જાહેર અપસ્ટ્રીમ OAuth client_id/secret અથવા Firebase વેબ કી ને સ્ટ્રિંગ લિટરલ તરીકે એમ્બેડ ન કરો — હંમેશા `resolvePublicCred()` (`open-sse/utils/publicCreds.ts`) દ્વારા જાઓ. જુઓ `docs/security/PUBLIC_CREDS.md`.
12. ક્યારેય HTTP / SSE / એક્ઝિક્યુટર પ્રતિસાદોમાં કાચા `err.stack` / `err.message` પાછા ન કરો — હંમેશા `buildErrorBody()` અથવા `sanitizeErrorMessage()` (`open-sse/utils/error.ts`) મારફતે રૂટ કરો. જુઓ `docs/security/ERROR_SANITIZATION.md`.
13. ક્યારેય બાહ્ય પાથ અથવા રનટાઇમ મૂલ્યોને `exec()`/`spawn()` ને પસાર કરવામાં આવેલા શેલ સ્ક્રિપ્ટોમાં સ્ટ્રિંગ-ઇન્ટરપોલેટ ન કરો — તેના બદલે `env` વિકલ્પ મારફતે પસાર કરો. સંદર્ભ: `src/mitm/cert/install.ts::updateNssDatabases`.
14. ક્યારેય CodeQL / Secret-Scanning એલર્ટને (a) પ્રથમ ઉપર દર્શાવેલ પેટર્ન દસ્તાવેજો તપાસ્યા વિના નકારી નાંખો કે શું સહાયક લાગુ પડે છે, અને (b) નકારી નાખવાના ટિપ્પણમાં ટેકનિકલ ન્યાયને નોંધો. નમૂનો: `js/stack-trace-exposure` જે કૉલસાઇટ્સ પર ઉઠાવવામાં આવ્યું છે જે પહેલાથી જ `sanitizeErrorMessage()` મારફતે રૂટ કરે છે તે એક જાણીતી CodeQL મર્યાદા છે (કસ્ટમ સેનિટાઇઝર્સ માન્ય નથી) — `docs/security/ERROR_SANITIZATION.md` ને સંદર્ભિત કરીને `false positive` તરીકે નકારી નાખો.
15. ક્યારેય બાળકોની પ્રક્રિયાઓને શરૂ કરતી રૂટ્સને ( `/api/mcp/`, `/api/cli-tools/runtime/`) `src/server/authz/routeGuard.ts` માં `isLocalOnlyPath()` વર્ગીકરણ વિના સામેલ ન કરો. લૂપબેક અમલમાં કોઈપણ ઓથ ચેક પહેલાં શરત વિના થાય છે — ટનલ દ્વારા લીક થયેલ JWT પ્રક્રિયા શરૂ કરવા માટે પ્રેરણા આપી શકતું નથી. જુઓ `docs/security/ROUTE_GUARD_TIERS.md`.
16. ક્યારેય કમિટ સંદેશાઓમાં `Co-Authored-By` ટ્રેલર્સને સામેલ ન કરો. કમિટ્સને ફક્ત રિપોઝિટરીના માલિકના Git ઓળખ હેઠળ દેખાવા જોઈએ (`diegosouzapw`). `Co-Authored-By: Claude …` લાઇન GitHub ને કમિટ્સને `claude` એન્થ્રોપિક ખાતા સાથે સંકળાવવા માટે કારણ બને છે, PR ઇતિહાસમાં વાસ્તવિક લેખકને છુપાવે છે.
