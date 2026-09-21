# Subscription-first routing (தமிழ்)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/SUBSCRIPTION_LADDER.md) · 🇪🇹 [am](../../../am/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇦 [ar](../../../ar/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇿 [az](../../../az/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇬 [bg](../../../bg/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇩 [bn](../../../bn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇿 [cs](../../../cs/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇰 [da](../../../da/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇪 [de](../../../de/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇷 [el](../../../el/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇸 [es](../../../es/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇪 [et](../../../et/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇷 [fa](../../../fa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇮 [fi](../../../fi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇷 [fr](../../../fr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇪 [ga](../../../ga/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [gu](../../../gu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ha](../../../ha/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇱 [he](../../../he/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [hi](../../../hi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇷 [hr](../../../hr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇺 [hu](../../../hu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇲 [hy](../../../hy/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇩 [id](../../../id/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ig](../../../ig/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇹 [it](../../../it/docs/routing/SUBSCRIPTION_LADDER.md) · 🇯🇵 [ja](../../../ja/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇪 [ka](../../../ka/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇭 [km](../../../km/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [kn](../../../kn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇷 [ko](../../../ko/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇹 [lt](../../../lt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇻 [lv](../../../lv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ml](../../../ml/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [mr](../../../mr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇾 [ms](../../../ms/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇹 [mt](../../../mt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇲 [my](../../../my/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇵 [ne](../../../ne/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇱 [nl](../../../nl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇴 [no](../../../no/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [or](../../../or/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [pa](../../../pa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇭 [phi](../../../phi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇱 [pl](../../../pl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇹 [pt](../../../pt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇴 [ro](../../../ro/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇺 [ru](../../../ru/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇰 [si](../../../si/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇰 [sk](../../../sk/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇮 [sl](../../../sl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇸 [sr](../../../sr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇪 [sv](../../../sv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇪 [sw](../../../sw/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [te](../../../te/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇭 [th](../../../th/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇷 [tr](../../../tr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇰 [ur](../../../ur/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇿 [uz](../../../uz/docs/routing/SUBSCRIPTION_LADDER.md) · 🇻🇳 [vi](../../../vi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [yo](../../../yo/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/SUBSCRIPTION_LADDER.md)

---

> இரண்டு புதிய `auto/*` id-கள் — `auto/subscription` மற்றும் `auto/thrifty`. இரண்டுமே கோரப்படுவதன் மூலம்
> விருப்பத் தேர்வாகச் செயல்படும்: அழைப்பாளர் பெயரைக் கொண்டு அந்த id-ஐக் கேட்காத வரை எதுவும்
> அவற்றின் வழியாக route செய்யப்படாது; ஏற்கனவே உள்ள எந்த pool, strategy அல்லது default-உம் மாறாது.

## இது ஏன் உள்ளது

OmniRoute ஏற்கனவே இரண்டு செலவுக் கேள்விகளுக்குப் பதிலளிக்கிறது; ஆனால் பெரும்பாலான operators கேட்பது அவற்றில் எதுவுமல்ல.

| ஏற்கனவே உள்ள mechanism                                   | பதிலளிக்கும் கேள்வி                                       |
| -------------------------------------------------------- | --------------------------------------------------------- |
| `hidePaidModels` (`autoCombo/paidModelFilter.ts`)        | "இந்த model இலவசமானதாக catalog செய்யப்பட்டுள்ளதா?"        |
| `freeAccessPolicy: "strict"` (`strictZeroCostFilter.ts`) | "இந்த connection எப்போதாவது எனக்குக் கட்டணம் விதிக்குமா?" |
| `quotaPreflight` (`combo/quotaExhaustionCutoff.ts`)      | "இந்த connection அதன் வரம்பை நெருங்கிவிட்டதா?"            |
| `budgetCap` / `budgetFallback` (`autoCombo/engine.ts`)   | "செலவைக் கட்டுப்படுத்து; மிக மலிவானதற்கு தரமிறக்கு"       |

ஒவ்வொரு இலவசம்-மட்டும் mechanism-உம் **பாதுகாப்பாக மூடப்பட்ட நிலையில் தோல்வியடைகிறது** — தீர்ந்துவிட்ட இலவச pool என்பது காலியான pool மட்டுமே; அது ஒருபோதும்
கட்டண விருப்பத்திற்கான அடுத்த படியாக மாறாது — மேலும் ஒவ்வொரு கட்டணப் பக்க mechanism-உம் tier குறித்து சார்பற்றது. இவற்றில் எதுவும் இதற்குப் பதிலளிப்பதில்லை:

> "நான் ஏற்கனவே செலுத்தும் quota-ஐப் பயன்படுத்து. அது தீர்ந்தவுடன் நிறுத்து, அல்லது மிக மலிவான
> கட்டண விருப்பங்கள் வழியாக ஒவ்வொரு படியாக அடுத்த rung-க்கு உயர்த்து — அது reset ஆன உடனேயே மீண்டும் திரும்பிவா."

## Billing என்பது connection சார்ந்த உண்மை; model சார்ந்த உண்மை அல்ல

`classifyTier()` (`open-sse/services/tierResolver.ts`) ஆனது `(provider, model)`-ஐ key-ஆகக் கொண்டு,
catalog pricing-இலிருந்து `free | cheap | premium` என்பதைத் திருப்பியளிக்கிறது. ஆனால் ஒரு request கூடுதல் பணம் செலவாக்குமா என்பது
**எந்த connection அதைச் சேவையளிக்கிறது** என்பதைப் பொறுத்தது: அதே model, Claude Code
OAuth connection வழியாக plan-இல் சேர்க்கப்பட்டதாகவும், API-key connection வழியாக ஒவ்வொரு token-க்கும் கட்டணம் விதிக்கப்படுவதாகவும் இருக்கலாம்.

`provider_connections.auth_type` எந்தத் திசையிலும் பாதுகாப்பான proxy அல்ல — metered OAuth
connections உள்ளன; அதேபோல் plan-இல் சேர்க்கப்பட்ட API-key connections-உம் உள்ளன (Copilot seat token என்பது
metered API key அல்ல). எனவே billing class என்பது
`open-sse/config/connectionBillingCatalog.ts` என்ற **கவனமாகத் தொகுக்கப்பட்ட catalog**-இலிருந்து வருகிறது; ஒவ்வொரு provider-இன் வெளியிடப்பட்ட விதிமுறைகளின் அடிப்படையில் கைமுறையாக அமைக்கப்படுகிறது —
இலவச models-க்காக `FreeModelBudget.hardStopGuaranteed` ஏற்கனவே நிறுவிய அதே முறை இது.

```ts
type ConnectionBillingClass = "subscription" | "metered" | "keyless" | "unknown";
type ConnectionOverageBehavior = "hard-stop" | "meters-to-paid" | "unknown";
```

தீர்மானிக்கும் வரிசை (`autoCombo/connectionBilling.ts`): செயற்கையான no-auth sentinel →
`keyless`; provider **மற்றும்** `authType` இரண்டுக்கும் பொருந்தும் catalog entry; provider முழுவதற்குமான entry;
இல்லையெனில் `unknown`. **Catalog-இல் தொகுக்கப்படாதது இலவசம் அல்ல** — `unknown` எல்லா இடங்களிலும் `metered` ஆகப் பயன்படுத்தப்படுகிறது;
எனவே நாளைச் சேர்க்கப்படும் provider ஒன்று subscription rung-க்கு வெளியிலிருந்தே தொடங்கும், மேலும் அதைத் திட்டமிட்டு
catalog-இல் சேர்க்க வேண்டும்.

## Rung மாதிரி

உயர்த்தும் வரிசையில் ஐந்து rungs. அவை விலையில் மட்டுமல்லாமல் வேறுபடுகின்றன — ஒவ்வொன்றுக்கும் அதற்கெனத் தனியான
**exhaustion signal** உள்ளது; அதனால்தான் இது வெறும் sort அல்ல.

| #   | Rung           | உறுப்பினர் தகுதி                                   | தீர்ந்ததாகக் கருதப்படும் நிலை                  |
| --- | -------------- | -------------------------------------------------- | ---------------------------------------------- |
| 0   | `subscription` | தொகுக்கப்பட்ட `billing: "subscription"`            | quota window cutoff-இல் அல்லது அதற்குக் கீழே   |
| 1   | `keyless`      | செயற்கையான no-auth பாதை                            | connection cooldown / breaker                  |
| 2   | `free`         | metered connection, `classifyTier() === "free"`    | இலவச allowance தீர்ந்துவிட்டது                 |
| 3   | `cheap`        | metered connection, `classifyTier() === "cheap"`   | ஒவ்வொரு rung-க்குமான budget பயன்படுத்தப்பட்டது |
| 4   | `premium`      | metered connection, `classifyTier() === "premium"` | ஒவ்வொரு rung-க்குமான budget பயன்படுத்தப்பட்டது |

Rungs 0-2, கவனிக்கக்கூடியதும் ஏற்கனவே கண்காணிக்கப்படுவதுமான **quota** அடிப்படையில் தீர்கின்றன. Rungs 3-4-க்கு
quota இல்லை — கட்டண connection எப்போதும் தொடர்ந்து சேவையளிக்கும் — எனவே அவற்றுக்கான ஒரே நியாயமான exhaustion signal என்பது ஒவ்வொரு rung-க்குமான
**budget** ஆகும். அது இல்லாமல், "cheap தீர்ந்தவுடன் உயர்த்து" என்பதற்குத் தூண்டுதல் எதுவும் இல்லை.

## `auto/subscription` — மூடப்பட்ட நிலையில் தோல்வியுறுதல்

தொகுப்பு = படிநிலை 0 மட்டும்; மீறல் ஒரு ஆவணப்படுத்தப்பட்ட `hard-stop` ஆக உள்ள இணைப்புகளுக்கு மட்டுமே வரையறுக்கப்பட்டு, ஒவ்வொன்றிலும் போதுமான ஒதுக்கீடு இருப்பது நேரடியாகச் சரிபார்க்கப்படுகிறது. தெளிவற்ற அனைத்தும் விலக்கப்படும்: பராமரிக்கப்படாத provider, சரிபார்க்க முடியாத ஒதுக்கீட்டு அளவீடு, காலாவதியான அளவீடு, அல்லது கட்டணமாக அளவிடப்படும் மீறல்.

காலியான தொகுப்பு என்பது **எதிர்பார்க்கப்பட்ட** பதிலே அன்றி, குறைபாடு அல்ல — அழைப்பவரின் ஏற்கனவே உள்ள காலி-தொகுப்பு பாதை, அமைதியான கட்டண fallback-க்குப் பதிலாக அதைத் தெளிவான பிழையாக மாற்றுகிறது. இந்த id-யின் முழு உத்தரவாதமும் அதுவே.

`keyless` வேண்டுமென்றே தகுதி பெறாது: இந்தக் குழுவாக்கம் என்பது "நான் பணம் செலுத்தும் திட்டம்" என்பதைக் குறிக்கிறது; எனவே auth இல்லாத backend இதில் இடம்பெறாது. அதற்கு `auto/thrifty` (அல்லது `auto/best-free`) பயன்படுத்தவும்.

### இணைப்புப் பாதுகாப்பு

ஒரு candidate எப்போதும் ஒரே இணைப்புடன் பிணைக்கப்பட்டிருக்காது — ஒரு தருக்கரீதியான candidate, `allowedConnectionIds` allowlist-ஐக் கொண்டிருக்கும்; உண்மையில் பயன்படுத்தப்படும் account, பின்னர் dispatch நேரத்தில் `open-sse/services/combo/autoStrategy.ts` மூலம் தேர்ந்தெடுக்கப்படும். எனவே இரு குழுவாக்கங்களும் **ஒவ்வொரு இணைப்பையும் தனித்தனியாக** சரிபார்த்து, `allowedConnectionIds`-ஐ தப்பிப் பிழைத்த துணைத்தொகுப்பிற்கு மட்டும் துல்லியமாக மீண்டும் எழுதுகின்றன — முழுமையான அசல் பட்டியலாக ஒருபோதும் இல்லை; தன்னிச்சையாகத் தேர்ந்தெடுக்கப்பட்ட ஓர் உறுப்பினராகவும் ஒருபோதும் இல்லை. `autoStrategy.ts` ஏற்கனவே அந்த array-ஐ ஒரு கடுமையான allowlist ஆக அமல்படுத்துவதால், அதை இங்கே மீண்டும் எழுதுவது, உருவாக்கத்திலேயே "சரிபார்க்கப்பட்டது" மற்றும் "உண்மையில் பயன்படுத்தப்பட்டது" ஆகியவற்றை ஒரே தொகுப்பாக்குகிறது. இது [STRICT_ZERO_COST](./STRICT_ZERO_COST.md) இல் உள்ள அதே invariant மற்றும் அதே தர்க்கமாகும்.

## `auto/thrifty` — ஒரு நேரத்தில் ஒரு படிநிலையாக உயர்த்துதல்

தொகுப்பு = அனைத்து படிநிலைகளும், படிநிலைக் குறியீட்டின்படி வரிசைப்படுத்தப்பட்டு, தீர்ந்துபோன candidate-கள் தடுக்கப்பட்ட நிலையில். மீதமுள்ள தொகுப்பிற்குள் `auto` engine இன்னும் மதிப்பெண் வழங்குகிறது: எந்தப் படிநிலைகள் செயல்பாட்டில் இருக்க வேண்டும் என்பதை ladder தீர்மானிக்கிறது; அவற்றுக்குள் எந்த candidate வெற்றி பெறுகிறது என்பதை scoring தீர்மானிக்கிறது. ஒரு படிநிலைக்குள் வரிசை நிலையானது; எனவே scorer-இன் சொந்தத் தரவரிசை இந்த overlay மூலம் ஒருபோதும் மறுவரிசைப்படுத்தப்படாது.

இது ஒரு வரிசைப்படுத்தல் + gating overlay, புதிய dispatcher **அல்ல**: `combo.ts`-இன் speculative loop ஏற்கனவே target-களை வரிசையாகக் கடந்து, தோல்வியின்போது அடுத்ததிற்குச் செல்கிறது; எனவே preflight கண்டறியாத runtime exhaustion ஏற்பட்டாலும், அதே request-க்குள் அடுத்த படிநிலைக்கு இன்னும் உயர்த்தப்படும்.

`auto/subscription` மூடப்பட்ட நிலையில் தோல்வியுறும் இடத்தில், `auto/thrifty` **திறந்த** நிலையில் தோல்வியுறும்: பயன்படுத்தக்கூடிய ஒதுக்கீட்டு அளவீடு இல்லாத, திட்டத்தில் சேர்க்கப்பட்ட இணைப்பு இருந்தாலும் அது முதலில் முயற்சிக்கப்படும். அதை முயற்சிப்பதற்குச் செலவில்லை; அது தீர்ந்துவிட்டதாகத் தெரியவந்தால், fall-through எப்படியும் அடுத்த படிநிலையை அடையும் — ஆனால் அதை முயற்சிக்க மறுப்பது, telemetry இல்லாதபோது request-ஐக் கட்டணப் படிநிலைக்கு அனுப்பிவிடும்; துல்லியமாக அந்த விளைவைத் தவிர்ப்பதற்காகவே இந்தக் குழுவாக்கம் உள்ளது.

## reset-க்குப் பிறகு திட்டத்திற்குத் திரும்புதல்

routing மீண்டும் படிநிலை 0-க்குத் திரும்புவதற்கு முன், ஒன்றுக்கொன்று சாராத மூன்று விஷயங்கள் காலாவதியாக வேண்டும். ஒன்றை மட்டும் சரிசெய்தால், திட்டம் மீண்டும் நிரம்பிய பின்னரும் ladder கட்டணப் படிநிலைகளிலேயே நீண்ட நேரம் சிக்கிக்கொள்ளும்.

1. **ஒதுக்கீட்டு நிலை cache** — `freeAccessQuota.ts`, ஒவ்வொரு `(provider, connection)`-க்கும் 180s TTL உடன் cache செய்கிறது. சொந்த `resetAt` ஏற்கனவே கடந்துவிட்ட ஒரு cached entry, இனி இல்லாத window ஒன்றை விவரிக்கிறது; எனவே இப்போது அது வயதைப் **பொருட்படுத்தாமல்** stale ஆகக் கருதப்பட்டு refresh-ஐக் கட்டாயப்படுத்துகிறது. இது இல்லாவிட்டால், நள்ளிரவில் மீண்டும் நிரம்பிய திட்டம், TTL தற்செயலாகக் காலாவதியாகும் வரை தீர்ந்துவிட்டதாகவே வாசிக்கப்படும்.
2. **ladder-இன் சொந்த நிலை** — வடிவமைப்பின்படி அப்படி எதுவும் இல்லை. ஒவ்வொரு pool build-இலும் live quota state-இலிருந்து படிநிலைத் தகுதி மீண்டும் கணக்கிடப்படுகிறது; reset-ஐத் தாண்டியும் நிலைத்து routing-ஐ முடக்கக்கூடிய, சேமிக்கப்பட்ட "தற்போது படிநிலை 3-இல் உள்ளது" என்ற பதிவு எதுவும் இல்லை.
3. **இணைப்பின் cooldown** — ஒதுக்கீடு தீர்ந்தபோது கிடைக்கும் 429, exponential backoff-இலிருந்து `rateLimitedUntil`-ஐ அமைக்கிறது; இது ஒரு திட்ட இணைப்பில் உண்மையான reset நேரத்தைத் தாண்டிச் செல்லக்கூடும். `clampCooldownToReset()` (`subscriptionLadder.ts`) ஒரு cooldown-ஐ upstream-இன் சொந்த reset நேரத்திற்குச் சுருக்குகிறது; அதை ஒருபோதும் நீட்டிக்க முடியாது. **இது செயல்படுத்தப்பட்டு சோதிக்கப்பட்டுள்ளது, ஆனால் இன்னும் இணைக்கப்படவில்லை**: எந்த cooldown-ம் எழுதப்படுவதற்கு _முன்பே_ `src/sse/services/auth.ts` இல் quota cache செல்லாததாக்கப்படுகிறது; எனவே `resetAt` அந்த function-இல் அதற்கு முன்பே கைப்பற்றப்பட வேண்டும் — இது resilience hot path-இல் செய்ய வேண்டிய மாற்றம் என்பதால், தனியாக மதிப்பாய்வு செய்யப்படும் PR-இல் இடம்பெற வேண்டும். அதுவரை, மீள் நுழைவு connection cooldown முடியும் வரை காத்திருக்கும் (provider அனுப்பும்போது, அது ஏற்கனவே upstream `Retry-After` குறிப்புகளுக்கு முன்னுரிமை அளிக்கிறது).

### அலைவுத் தடுப்பு

இப்போது reset ஆன ஒரு படிநிலை, `reentryMinRemainingPercent`-ஐ (இயல்புநிலை 5) தாண்டிய பின்னரே மீண்டும் அனுமதிக்கப்படும்; அதே நேரத்தில் ஏற்கனவே செயல்பாட்டில் உள்ள இணைப்பு, `exitCutoffPercent`-ஐ (இயல்புநிலை 2, `quotaPreflight.defaultThresholdPercent` உடன் பொருந்துகிறது) விட மேலே நிலைத்திருந்தால் போதும். இவற்றிற்கிடையிலான இடைவெளியே hysteresis band — இது இல்லாவிட்டால், cutoff அருகே மிதக்கும் ஓர் இணைப்பு தொடர்ச்சியான request-களில் படிநிலைகளுக்கு இடையே ஊசலாடும்.

## கட்டமைப்பு

நுண்சீரமைப்புக்கு மட்டும். திட்டமிட்டே `enabled` கொடி **இல்லை**: இவற்றை முடக்கக்கூடிய நிலைமாற்றி,
முழுத் தொகுப்பையும் — கட்டண மாதிரிகள் உட்பட — அதற்கு நேர்மாறான பொருளை உறுதியளிக்கும் பெயரின் கீழ்
`auto/subscription` அமைதியாக வழங்கும் நிலையை ஏற்படுத்தும்.

```jsonc
{
  "subscriptionLadder": {
    "exitCutoffPercent": 2,
    "reentryMinRemainingPercent": 5,
    "rungBudgetUsd": { "cheap": 5.0, "premium": 0 }, // 0 ஒரு படிநிலையை முழுமையாக முடக்குகிறது
  },
}
```

செலவுத் தீர்மானிப்பான் இணைக்கப்படும் வரை பட்ஜெட் கட்டுப்பாடு செயலற்றதாக இருக்கும்: கணக்கியல்
கிடைக்காதபோது, கட்டணப் படிநிலை வரிசைப்படுத்தப்படும், ஆனால் ஒருபோதும் கட்டுப்படுத்தப்படாது. v3.8.51 முதல்,
`rungBudgetUsd` அமைப்பை ஸ்கீமா ஏற்றுக்கொள்கிறது, ஆனால் அது இன்னும் அமல்படுத்தப்படவில்லை — இதைச் செயலில்
உள்ள செலவு உச்சவரம்பாக அல்லாமல், ஒதுக்கப்பட்ட கட்டமைப்பாகக் கருதுங்கள். படிநிலை வரிசைப்படுத்தல்,
ஒதுக்கீடு சார்ந்த தீர்வு, மீட்டமைப்புக்குப் பிந்தைய மறு நுழைவு ஆகிய அனைத்தும் இது இல்லாமலேயே செயல்படும்.

## ஒருங்கிணைப்பு

`subscription` மற்றும் `thrifty` ஆகியவை `AutoTier` மதிப்புகள் என்பதால், அவை ஒவ்வொரு வகையுடனும்
ஒருங்கிணைகின்றன: `auto/coding:thrifty`, `auto/reasoning:subscription` போன்றவை. இரண்டு தட்டையான
அடையாளங்களும் (`auto/subscription`, `auto/thrifty`) `/v1/models` மற்றும் கட்டுப்பாட்டுப் பலகையில்
விளம்பரப்படுத்தப்படுகின்றன.

இரண்டு அடையாளங்களுமே கட்டண அடுக்கு அல்ல; எனவே இரண்டிற்கும் `isPaidTierAutoId()` என்பது `false`
எனத் திருப்பி வழங்குகிறது, மேலும் `auto/subscription` என்பது `hidePaidModels`-இலிருந்து தப்பிக்கிறது.

## குறியீடு அமைந்துள்ள இடம்

| அம்சம்                                         | கோப்பு                                              |
| ---------------------------------------------- | --------------------------------------------------- |
| தேர்ந்தெடுக்கப்பட்ட பில்லிங் விவரங்கள்         | `open-sse/config/connectionBillingCatalog.ts`       |
| வகைப்படுத்தி                                   | `open-sse/services/autoCombo/connectionBilling.ts`  |
| படிநிலைகள், இரு குழுவாக்கங்கள், மறு நுழைவு     | `open-sse/services/autoCombo/subscriptionLadder.ts` |
| வேட்பாளர் தொகுப்பில் இணைத்தல்                  | `open-sse/services/autoCombo/virtualFactory.ts`     |
| மீட்டமைப்பை உணரும் தற்காலிகச் சேமிப்பகப் பழைமை | `open-sse/services/autoCombo/freeAccessQuota.ts`    |
| அடுக்கு இடைமுகம்                               | `open-sse/services/autoCombo/suffixComposition.ts`  |
| விளம்பரப்படுத்தப்பட்ட அடையாளங்கள்              | `open-sse/services/autoCombo/builtinCatalog.ts`     |
| சோதனைகள்                                       | `tests/unit/autoCombo/subscription-ladder.test.ts`  |
