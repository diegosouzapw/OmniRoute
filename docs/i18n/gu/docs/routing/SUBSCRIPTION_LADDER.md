# Subscription-first routing (ગુજરાતી)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/SUBSCRIPTION_LADDER.md) · 🇪🇹 [am](../../../am/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇦 [ar](../../../ar/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇿 [az](../../../az/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇬 [bg](../../../bg/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇩 [bn](../../../bn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇦 [bs](../../../bs/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇿 [cs](../../../cs/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇰 [da](../../../da/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇪 [de](../../../de/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇷 [el](../../../el/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇸 [es](../../../es/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇪 [et](../../../et/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇷 [fa](../../../fa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇮 [fi](../../../fi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇷 [fr](../../../fr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇪 [ga](../../../ga/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ha](../../../ha/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇱 [he](../../../he/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [hi](../../../hi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇷 [hr](../../../hr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇺 [hu](../../../hu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇲 [hy](../../../hy/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇩 [id](../../../id/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ig](../../../ig/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇹 [it](../../../it/docs/routing/SUBSCRIPTION_LADDER.md) · 🇯🇵 [ja](../../../ja/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇪 [ka](../../../ka/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇭 [km](../../../km/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [kn](../../../kn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇷 [ko](../../../ko/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇹 [lt](../../../lt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇻 [lv](../../../lv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ml](../../../ml/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [mr](../../../mr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇾 [ms](../../../ms/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇹 [mt](../../../mt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇲 [my](../../../my/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇵 [ne](../../../ne/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇱 [nl](../../../nl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇴 [no](../../../no/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [or](../../../or/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [pa](../../../pa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇭 [phi](../../../phi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇱 [pl](../../../pl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇹 [pt](../../../pt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇴 [ro](../../../ro/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇺 [ru](../../../ru/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇰 [si](../../../si/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇰 [sk](../../../sk/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇮 [sl](../../../sl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇸 [sr](../../../sr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇪 [sv](../../../sv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇪 [sw](../../../sw/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ta](../../../ta/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [te](../../../te/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇭 [th](../../../th/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇷 [tr](../../../tr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇰 [ur](../../../ur/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇿 [uz](../../../uz/docs/routing/SUBSCRIPTION_LADDER.md) · 🇻🇳 [vi](../../../vi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [yo](../../../yo/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/SUBSCRIPTION_LADDER.md)

---

> બે નવા `auto/*` ids — `auto/subscription` અને `auto/thrifty`. બંનેને વિનંતી કરીને opt-in કરવામાં આવે છે:
> જ્યાં સુધી કોઈ caller નામ દ્વારા id ન માગે ત્યાં સુધી કોઈ પણ વસ્તુ તેમના મારફતે route થતી નથી, અને કોઈ
> હાલના pool, strategy અથવા default માં ફેરફાર થતો નથી.

## આ શા માટે અસ્તિત્વમાં છે

OmniRoute પહેલેથી ખર્ચ સંબંધિત બે પ્રશ્નોના જવાબ આપે છે, પરંતુ તેમાંથી એક પણ એવો નથી જે મોટાભાગના operators પૂછે છે.

| હાલની પદ્ધતિ                                             | જેનો જવાબ આપે છે                                    |
| -------------------------------------------------------- | --------------------------------------------------- |
| `hidePaidModels` (`autoCombo/paidModelFilter.ts`)        | "શું આ model catalog માં free તરીકે નોંધાયેલું છે?" |
| `freeAccessPolicy: "strict"` (`strictZeroCostFilter.ts`) | "શું આ connection મને ક્યારેય bill કરી શકે છે?"     |
| `quotaPreflight` (`combo/quotaExhaustionCutoff.ts`)      | "શું આ connection તેની મર્યાદાની નજીક છે?"          |
| `budgetCap` / `budgetFallback` (`autoCombo/engine.ts`)   | "ખર્ચ મર્યાદિત કરો, સૌથી સસ્તા વિકલ્પ પર જાઓ"       |

દરેક free-only પદ્ધતિ **fails closed** — સમાપ્ત થયેલું free pool એટલે ખાલી pool, paid વિકલ્પ તરફ
આગળ વધવું નહીં — અને દરેક paid-side પદ્ધતિ tier-agnostic છે. કોઈ પણ આનો જવાબ આપતી નથી:

> "જે quota માટે હું પહેલેથી ચૂકવણી કરું છું તેનો ઉપયોગ કરો. જ્યારે તે સમાપ્ત થાય, ત્યારે કાં તો બંધ કરો,
> અથવા સૌથી સસ્તા paid વિકલ્પોમાંથી એક સમયે એક rung ઉપર જાઓ — અને તે reset થાય તે ક્ષણે પાછા આવો."

## Billing એ connection સંબંધિત હકીકત છે, model સંબંધિત નહીં

`classifyTier()` (`open-sse/services/tierResolver.ts`) `(provider, model)` પર આધારિત છે અને
catalog pricing માંથી `free | cheap | premium` પરત કરે છે. પરંતુ કોઈ request માટે વધારાનો ખર્ચ
થાય છે કે નહીં તે **કયું connection તેને serve કરે છે** તેના પર નિર્ભર છે: એ જ model Claude Code
OAuth connection મારફતે plan માં included હોય છે અને API-key connection મારફતે પ્રતિ token bill થાય છે.

`provider_connections.auth_type` કોઈ પણ દિશામાં સુરક્ષિત proxy નથી — metered OAuth
connections અસ્તિત્વમાં છે, અને plan-included API-key connections પણ અસ્તિત્વમાં છે (Copilot seat token
એ metered API key નથી). તેથી billing class એક **curated catalog**,
`open-sse/config/connectionBillingCatalog.ts`, માંથી આવે છે, જેને દરેક provider ની પ્રકાશિત terms પરથી
હાથેથી સેટ કરવામાં આવે છે — free models માટે `FreeModelBudget.hardStopGuaranteed` એ પહેલેથી સ્થાપિત કરેલી એ જ રીત.

```ts
type ConnectionBillingClass = "subscription" | "metered" | "keyless" | "unknown";
type ConnectionOverageBehavior = "hard-stop" | "meters-to-paid" | "unknown";
```

Resolution order (`autoCombo/connectionBilling.ts`): synthetic no-auth sentinel →
`keyless`; provider **અને** `authType` સાથે મેળ ખાતી catalog entry; provider-wide entry;
અન્યથા `unknown`. **Uncurated એટલે free નહીં** — દરેક જગ્યાએ `unknown` ને `metered`
તરીકે વાપરવામાં આવે છે, તેથી આવતીકાલે ઉમેરાયેલ provider subscription rung ની બહારથી શરૂ થાય છે અને
તેને ઇરાદાપૂર્વક curate કરવું પડે છે.

## Rung model

Escalation ના ક્રમમાં પાંચ rungs. તેઓ માત્ર કિંમતમાં જ અલગ નથી — દરેક પાસે તેનું **પોતાનું**
exhaustion signal છે, અને તેથી આ માત્ર sort નથી.

| #   | Rung           | સભ્યપદ                                             | ક્યારે સમાપ્ત માનવામાં આવે છે      |
| --- | -------------- | -------------------------------------------------- | ---------------------------------- |
| 0   | `subscription` | curated `billing: "subscription"`                  | quota window cutoff પર/તેનાથી નીચે |
| 1   | `keyless`      | synthetic no-auth path                             | connection cooldown / breaker      |
| 2   | `free`         | metered connection, `classifyTier() === "free"`    | free allowance સમાપ્ત              |
| 3   | `cheap`        | metered connection, `classifyTier() === "cheap"`   | પ્રતિ-rung budget વપરાઈ ગયું       |
| 4   | `premium`      | metered connection, `classifyTier() === "premium"` | પ્રતિ-rung budget વપરાઈ ગયું       |

Rungs 0-2 **quota** પર સમાપ્ત થાય છે, જે observable છે અને પહેલેથી track થાય છે. Rungs 3-4 પાસે કોઈ
quota નથી — paid connection હંમેશાં serve કરતું રહે છે — તેથી તેમનું એકમાત્ર સમજદાર exhaustion signal પ્રતિ-rung
**budget** છે. તેના વિના, "cheap સમાપ્ત થાય ત્યારે escalate કરો" માટે કોઈ trigger નથી.

## `auto/subscription` — નિષ્ફળતા પર બંધ

પૂલ = માત્ર rung 0, અને તે પણ એવા કનેક્શન્સ સુધી મર્યાદિત કે જેમનો overage દસ્તાવેજીકૃત `hard-stop` હોય તથા દરેકમાં પૂરતી quota ઉપલબ્ધ હોવાનું લાઇવ ચકાસાયેલું હોય. અસ્પષ્ટ હોય તેવી દરેક વસ્તુ બાકાત રાખવામાં આવે છે: ક્યુરેટ ન કરાયેલ provider, ચકાસી ન શકાય તેવું quota રીડિંગ, જૂનું રીડિંગ, અથવા ચૂકવવાપાત્ર તરીકે મીટર થતો overage.

ખાલી પૂલ એ ખામી નહીં, પરંતુ **ઇચ્છિત** જવાબ છે — callerનો હાલનો empty-pool પાથ તેને શાંત રીતે billable fallbackમાં ફેરવવાને બદલે સ્પષ્ટ errorમાં ફેરવે છે. આ idની સંપૂર્ણ ખાતરી આ જ છે.

`keyless` ઇરાદાપૂર્વક લાયક **નથી** ઠરતું: આ groupingનો અર્થ “જે plan માટે હું ચૂકવણી કરું છું” એવો છે, તેથી no-auth backend તેમાં આવતું નથી. તેના માટે `auto/thrifty` (અથવા `auto/best-free`) વાપરો.

### કનેક્શન સુરક્ષા

candidate હંમેશા માત્ર એક કનેક્શન સાથે જોડાયેલો હોતો નથી — logical candidateમાં `allowedConnectionIds` allowlist હોય છે અને ખરેખર વપરાતું account પછીથી, dispatch સમયે, `open-sse/services/combo/autoStrategy.ts` દ્વારા પસંદ કરવામાં આવે છે. તેથી બંને groupings **દરેક કનેક્શનને અલગથી** ચકાસે છે અને `allowedConnectionIds`ને ફરી લખીને તેમાં ચોક્કસપણે માત્ર બચેલો subset જ રાખે છે — ક્યારેય સંપૂર્ણ મૂળ list નહીં અને ક્યારેય મનસ્વી રીતે પસંદ કરાયેલો એક member નહીં. કારણ કે `autoStrategy.ts` પહેલેથી જ આ arrayને hard allowlist તરીકે અમલમાં મૂકે છે, તેને અહીં ફરી લખવાથી રચનાત્મક રીતે “ચકાસાયેલું” અને “ખરેખર વપરાયેલું” એક જ set બને છે. આ એ જ invariant અને એ જ તર્ક છે જે [STRICT_ZERO_COST](./STRICT_ZERO_COST.md)માં છે.

## `auto/thrifty` — એક સમયે એક rung આગળ વધો

પૂલ = બધા rungs, rung index પ્રમાણે ક્રમબદ્ધ, જેમાં exhausted candidatesને બાકાત રાખવામાં આવે છે. `auto` engine હજી પણ બચેલા પૂલની **અંદર** score કરે છે: ladder નક્કી કરે છે કે કયા rungs કાર્યક્ષેત્રમાં છે, જ્યારે scoring તેમની અંદર કયો candidate જીતે છે તે નક્કી કરે છે. એક rungની અંદર ordering સ્થિર રહે છે, તેથી આ overlay scorerની પોતાની rankingને ક્યારેય ફરી ગોઠવતું નથી.

આ ordering + gating overlay છે, નવું dispatcher **નથી**: `combo.ts`નો speculative loop પહેલેથી જ targetsને ક્રમમાં તપાસે છે અને નિષ્ફળતા આવે ત્યારે આગળના target પર જાય છે, તેથી preflightમાં ન પકડાયેલ runtime exhaustion પણ એ જ requestની અંદર આગળના rung પર લઈ જાય છે.

જ્યાં `auto/subscription` નિષ્ફળતા પર **બંધ** રહે છે, ત્યાં `auto/thrifty` નિષ્ફળતા પર **ખુલ્લું** રહે છે: usable quota રીડિંગ ન હોય તો પણ planમાં સામેલ કનેક્શનને પહેલાં અજમાવવામાં આવે છે. તેને અજમાવવાનો કોઈ ખર્ચ નથી, અને જો તે exhausted હોવાનું બહાર આવે તો fall-through કોઈ પણ સંજોગોમાં આગળના rung સુધી પહોંચે છે — જ્યારે તેને અજમાવવાનો ઇનકાર કરવાથી telemetry ન હોય ત્યારે request paid rung પર મોકલાઈ જશે, અને આ ચોક્કસપણે એ જ પરિણામ છે જેને ટાળવા માટે આ grouping અસ્તિત્વમાં છે.

## reset પછી plan પર પાછા ફરવું

routing rung 0 પર પાછું ફરે તે પહેલાં ત્રણ સ્વતંત્ર બાબતો expire થવી આવશ્યક છે. માત્ર એકને સુધારવાથી plan ફરી ભરાઈ ગયા પછી પણ ladder લાંબા સમય સુધી paid rungs પર અટવાયેલી રહે છે.

1. **quota-state cache** — `freeAccessQuota.ts`, `(provider, connection)` દીઠ 180s TTL સાથે cache કરે છે. જે cached entryનું પોતાનું `resetAt` પહેલેથી જ પસાર થઈ ચૂક્યું હોય તે હવે અસ્તિત્વમાં ન રહેલી windowનું વર્ણન કરે છે, તેથી હવે તેની ઉંમરને **ધ્યાનમાં લીધા વિના** તેને stale ગણવામાં આવે છે અને refresh ફરજિયાત બને છે. આ વિના, મધરાતે ફરી ભરાયેલો plan, TTL યોગાનુયોગ lapse ન થાય ત્યાં સુધી exhausted તરીકે વાંચાતો રહે છે.
2. **ladderની પોતાની state** — ડિઝાઇન મુજબ એવી કોઈ state નથી. દરેક pool build વખતે live quota state પરથી rung eligibilityની ફરી ગણતરી થાય છે; reset કરતાં વધુ સમય ટકી શકે અને routingને wedge કરી શકે એવો persisted “હાલમાં rung 3 પર” record અસ્તિત્વમાં નથી.
3. **connection cooldown** — exhaustion લાવનાર 429, exponential backoff પરથી `rateLimitedUntil` સેટ કરે છે, જે plan connection માટે વાસ્તવિક reset સમયને વટાવી શકે છે. `clampCooldownToReset()` (`subscriptionLadder.ts`) cooldownને upstreamના પોતાના resetના ચોક્કસ સમય સુધી ટૂંકું કરે છે અને તેને ક્યારેય લંબાવી શકતું નથી. **તે implement અને test કરવામાં આવ્યું છે, પરંતુ હજી wire કરવામાં આવ્યું નથી**: કોઈ cooldown લખાય તે _પહેલાં_ `src/sse/services/auth.ts`માં quota cache invalidate થાય છે, તેથી એ functionમાં `resetAt`ને વધુ વહેલું capture કરવું આવશ્યક છે — આ resilience hot pathમાં થતો ફેરફાર છે, જે પોતાના અલગ reviewed PRમાં હોવો જોઈએ. ત્યાં સુધી re-entry, connection cooldown પૂરો થવાની રાહ જુએ છે (જે provider દ્વારા મોકલવામાં આવે ત્યારે પહેલેથી જ upstream `Retry-After` hintsને પ્રાથમિકતા આપે છે).

### વારંવારના ફેરફાર સામે રક્ષણ

હમણાં જ reset થયેલો rung માત્ર ત્યારે જ ફરી સામેલ થાય છે જ્યારે તે `reentryMinRemainingPercent` (default 5) કરતાં ઉપર હોય, જ્યારે પહેલેથી કાર્યરત connectionને માત્ર `exitCutoffPercent` (default 2, જે `quotaPreflight.defaultThresholdPercent` સાથે મેળ ખાય છે) કરતાં ઉપર રહેવું જરૂરી છે. આ તફાવત hysteresis band છે — તેના વિના cutoffની આસપાસ રહેલું connection સતત આવતી requests પર rungs વચ્ચે દોલન કરે છે.

## રૂપરેખાંકન

ફક્ત ટ્યુનિંગ માટે. ઇરાદાપૂર્વક **કોઈ** `enabled` ફ્લૅગ નથી: આને બંધ કરી શકે એવું ટૉગલ
`auto/subscription`ને તેના નામથી અપાતી વિપરીત ખાતરી છતાં, ચૂકવેલ મોડલ સહિતનો આખો પૂલ
ચૂપચાપ ઉપલબ્ધ કરાવતું રાખશે.

```jsonc
{
  "subscriptionLadder": {
    "exitCutoffPercent": 2,
    "reentryMinRemainingPercent": 5,
    "rungBudgetUsd": { "cheap": 5.0, "premium": 0 }, // 0 કોઈ પગથિયાને સંપૂર્ણપણે અક્ષમ કરે છે
  },
}
```

ખર્ચ રિઝોલ્વર જોડાય ત્યાં સુધી બજેટ ગેટિંગ નિષ્ક્રિય રહે છે: કોઈ હિસાબ ઉપલબ્ધ ન હોય ત્યારે ચૂકવેલ
પગથિયું ક્રમમાં ગોઠવાય છે, પરંતુ ક્યારેય ગેટ થતું નથી. v3.8.51 મુજબ `rungBudgetUsd` સેટિંગને
સ્કીમા સ્વીકારે છે, પરંતુ હજી તેનો અમલ થતો નથી — તેને સક્રિય ખર્ચ મર્યાદા નહીં, પરંતુ આરક્ષિત રૂપરેખાંકન માનો. પગથિયાંનો ક્રમ, ક્વોટા-આધારિત સમાપ્તિ અને રીસેટ પછીનું પુનઃપ્રવેશ
તેના વિના પણ કાર્ય કરે છે.

## સંયોજન

`subscription` અને `thrifty`, `AutoTier` મૂલ્યો છે, તેથી તેઓ દરેક કેટેગરી સાથે સંયોજિત થાય છે:
`auto/coding:thrifty`, `auto/reasoning:subscription`, વગેરે. બંને ફ્લૅટ ids
(`/auto/subscription`, `/auto/thrifty`)ને `/v1/models` અને ડૅશબોર્ડમાં પ્રદર્શિત કરવામાં આવે છે.

બંનેમાંથી કોઈપણ id ચૂકવેલ-ટિયર નથી, તેથી `isPaidTierAutoId()` બંને માટે `false` પરત કરે છે અને
`auto/subscription`, `hidePaidModels` પછી પણ ઉપલબ્ધ રહે છે.

## કોડ ક્યાં આવેલો છે

| વિષય                              | ફાઇલ                                                |
| --------------------------------- | --------------------------------------------------- |
| ક્યુરેટ કરેલી બિલિંગ વિગતો        | `open-sse/config/connectionBillingCatalog.ts`       |
| ક્લાસિફાયર                        | `open-sse/services/autoCombo/connectionBilling.ts`  |
| પગથિયાં, બંને જૂથીકરણ, પુનઃપ્રવેશ | `open-sse/services/autoCombo/subscriptionLadder.ts` |
| ઉમેદવાર પૂલમાં વાયરિંગ            | `open-sse/services/autoCombo/virtualFactory.ts`     |
| રીસેટથી વાકેફ કૅશ સ્ટેલનેસ        | `open-sse/services/autoCombo/freeAccessQuota.ts`    |
| ટિયર સપાટી                        | `open-sse/services/autoCombo/suffixComposition.ts`  |
| પ્રદર્શિત ids                     | `open-sse/services/autoCombo/builtinCatalog.ts`     |
| પરીક્ષણો                          | `tests/unit/autoCombo/subscription-ladder.test.ts`  |
