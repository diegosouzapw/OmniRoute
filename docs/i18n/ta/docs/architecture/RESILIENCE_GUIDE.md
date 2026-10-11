# Resilience Guide (தமிழ்)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute மூன்று தனித்துவமான, ஆனால் ஒன்றோடொன்று தொடர்புடைய மீள்திறன் வழிமுறைகளைக் கொண்டுள்ளது. ஒவ்வொன்றுக்கும் வெவ்வேறு செயல்பாட்டு எல்லையும் நோக்கமும் உள்ளது. வழித்தட நடத்தையைப் பிழைத்திருத்தும்போது அவற்றைத் தனித்தனியாக வைத்திருங்கள்.

![3-அடுக்கு மீள்திறன் மாதிரி](../diagrams/exported/resilience-3layers.svg)

> மூலம்: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. வழங்குநர் சர்க்யூட் பிரேக்கர்

**செயல்பாட்டு எல்லை:** முழு வழங்குநர் (எ.கா., `glm`, `openai`, `anthropic`).

**நோக்கம்:** அப்ஸ்ட்ரீம்/சேவை மட்டத்தில் தொடர்ந்து தோல்வியடையும் ஒரு வழங்குநருக்குப் போக்குவரத்தை அனுப்புவதை நிறுத்துதல்.

**செயலாக்கம்:**

- மைய வகுப்பு: `src/shared/utils/circuitBreaker.ts`
- இணைப்பு அமைப்பு: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- நிலை API: `GET /api/monitoring/health`
- மீட்டமைப்பு API: `POST /api/resilience/reset`
- ரேப்பர்கள்: `open-sse/services/accountFallback.ts`
- DB அட்டவணை: `domain_circuit_breakers`

**நிலைகள்:**

- `CLOSED` — இயல்பான போக்குவரத்து அனுமதிக்கப்படுகிறது
- `DEGRADED` — போக்குவரத்து இன்னும் அனுமதிக்கப்படுகிறது, ஆனால் அதிகரித்த வழங்குநர் தோல்விகள் கண்காணிக்கப்படுகின்றன
- `OPEN` — வழங்குநர் தற்காலிகமாகத் தடுக்கப்பட்டுள்ளார்; combo வழித்தடம் அதைத் தவிர்க்கிறது
- `HALF_OPEN` — மீட்டமைப்பு நேரக்கெடு முடிந்தது; சோதனைக் கோரிக்கை அனுமதிக்கப்படுகிறது

**உள்ளமைக்கக்கூடிய இயல்புநிலைகள் (`open-sse/config/constants.ts`, Dashboard → Settings → Resilience என்பதில் வெளிப்படுத்தப்பட்டுள்ளன):**

| வகை     | தரம் குறைவது | திறக்கப்படுவது | மீட்டமைப்பு நேரக்கெடு |
| ------- | ------------ | -------------- | --------------------- |
| OAuth   | 5 தோல்விகள்  | 8 தோல்விகள்    | 60s                   |
| API-key | 7 தோல்விகள்  | 12 தோல்விகள்   | 30s                   |
| உள்ளூர் | பெறப்பட்டது  | 2 தோல்விகள்    | 15s                   |

ஒரு வழங்குநர் எப்போது `DEGRADED` நிலைக்குச் செல்கிறார் என்பதை `degradationThreshold` கட்டுப்படுத்துகிறது; அது எப்போது திறக்கப்பட்டு தவிர்க்கப்படுகிறது என்பதை `failureThreshold` கட்டுப்படுத்துகிறது. உள்ளூர் வழங்குநர் சுயவிவரங்கள் இன்னும் Resilience அமைப்புகள் பக்கத்தில் வெளிப்படுத்தப்படவில்லை.

**செயல்படுத்தும் குறியீடுகள்:** வழங்குநர்-மட்ட நிலைகளான `[408, 500, 502, 503, 504]` மட்டும். கணக்கு-மட்டப் பிழைகளுக்கு (பெரும்பாலான 401/403/429 — அவை cooldown அல்லது lockout-க்கு உரியவை) சர்க்யூட் பிரேக்கரைச் செயல்படுத்த வேண்டாம்.

**சோம்பேறி மீட்பு:** `OPEN` காலாவதியாகும்போது, `getStatus()`, `canExecute()`, `getRetryAfterMs()` ஆகியவை நிலையை `HALF_OPEN` ஆகப் புதுப்பிக்கின்றன. பின்னணிக் காலக்கணிப்பான் தேவையில்லை.

---

### தேர்வுக்குரிய உலகளாவிய வழங்குநர் Cooldown (சாளர வாயில்)

நான்காவது, **தேர்வுக்குரிய** அடுக்கு (`PROVIDER_COOLDOWN_ENABLED`, இயல்பாக **முடக்கப்பட்டுள்ளது`)
தோல்வியடையும் வழங்குநர்களின் கோரிக்கைகளுக்கு இடையிலான நினைவகத்தை
`open-sse/services/providerCooldownTracker.ts`-இல் வைத்திருக்கிறது; அடுத்தடுத்த combo கோரிக்கைகள் சற்றுமுன்
தோல்வியடைந்த வழங்குநரை மீண்டும் மீண்டும் அணுகுவதை நிறுத்தும் வகையில், combo இலக்கு
தீர்மானத்தின்போது இது பயன்படுத்தப்படுகிறது. வழங்குநர்-மட்டப் பதிவுகள் `PROVIDER_PROFILES` சாளர வாயிலைப் பின்பற்றுகின்றன:

| சுயவிவரம் | இதற்குப் பிறகு செயல்படும் (`providerFailureThreshold`) | இதற்குள் (`providerFailureWindowMs`) | இவ்வளவு நேரம் cooldown (`providerCooldownMs`) |
| --------- | -----------------------------------------------------: | -----------------------------------: | --------------------------------------------: |
| OAuth     |                                                   `10` |                              `15min` |                                        `5min` |
| API key   |                                                   `15` |                              `30min` |                                       `10min` |

வரம்புக்குக் கீழே வழங்குநர் cooldown நிலையில் இருப்பதாகக் கருதப்படாது; ஒரு வெற்றி
சாளரத்தை அழிக்கிறது. இணைப்பு-மட்டப் பதிவுகள் (`provider:connectionId`) அதற்குப் பதிலாக
அடுக்குக்குறி வளர்ச்சியுடைய `minRetryCooldownMs → maxRetryCooldownMs` பின்னடைவைத் தக்கவைத்துக்கொள்கின்றன. மேலெழுதல்கள்:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
பின்னடைவு பாதுகாப்பு: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. இணைப்பு கூல்டவுன்

**வரம்பு:** ஒற்றை வழங்குநர் இணைப்பு/கணக்கு/விசை.

**நோக்கம்:** அதே வழங்குநரின் மற்ற இணைப்புகள் தொடர்ந்து சேவையளிக்கும்போது, ஒரு செயலிழந்த விசையைத் தவிர்த்தல்.

**செயலாக்கம்:**

- கிடைக்காததாகக் குறித்தல்: `src/sse/services/auth.ts::markAccountUnavailable()`
- தேர்வு: அதே கோப்பிலுள்ள `getProviderCredentials*`
- கூல்டவுன் கணக்கீடு: `open-sse/services/accountFallback.ts::checkFallbackError()`
- அமைப்புகள்: `src/lib/resilience/settings.ts`

**ஒவ்வொரு இணைப்பிற்குமான புலங்கள்:**

- `rateLimitedUntil` — கூல்டவுன் காலாவதியாகும் வரையிலான நேரமுத்திரை
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — அதிவேகப் பின்னடைவு எண்ணி

**இயல்புநிலை கூல்டவுன்கள்:**

- OAuth அடிப்படை: 5s
- API-key அடிப்படை: 3s
- API-key 429: மேல்நிலைச் சேவையின் `Retry-After`/மீட்டமைப்பு தலைப்புகள்/பகுக்கக்கூடிய மீட்டமைப்பு உரைக்கு முன்னுரிமை அளிக்கிறது
- பின்னடைவு: `baseCooldownMs * 2 ** failureIndex`

**ஒரே நேரத்தில் திரளாக மீண்டும் முயல்வதைத் தடுக்கும் பாதுகாப்பு:** ஒரே நேரத்தில் ஏற்படும் தோல்விகள் கூல்டவுனை அளவுக்கு மீறி நீட்டிப்பதையோ `backoffLevel`-ஐ இருமுறை அதிகரிப்பதையோ தடுக்கிறது.

**ஸ்ட்ரீம் உள்ளடக்கத் தேக்கங்கள் கணக்கை கூல்டவுனில் வைக்காது.** குறிப்பிட்ட நேரத்திற்குள் எந்த மாதிரி வெளியீட்டையும் அனுப்பாத ஸ்ட்ரீமை உள்ளடக்கத் தேக்க கண்காணிப்பான்
(`open-sse/utils/streamHandler.ts`) கைவிடும்போது, `markAccountUnavailable()` அந்தப் பிழையை இணைப்பில் பதிவுசெய்யும்; ஆனால் எந்தக் கூல்டவுனையும் அமைக்காது:
அந்தத் தேக்கம் அந்தக் கோரிக்கைக்கே உரியது; பெரும்பாலும் இன்னும் வெளியீடு இல்லாத நீண்ட தர்க்கச் செயல்முறையாக இருக்கும்.
இயக்குநர்கள் `resilienceSettings.streamStallCooldown.enabled` மூலம் இதை மீண்டும் இயக்கலாம்
(இயல்புநிலை `false`).

**தர்க்க ஃபிரேம்கள் உள்ளடக்கத் தேக்க நேர ஒதுக்கீட்டை மீண்டும் தொடங்குகின்றன.** ஒரு தர்க்க மாதிரி அதன் முதல் புலப்படும் டோக்கனை அனுப்புவதற்கு முன்
பல நிமிடங்கள் சிந்திக்கலாம்: Claude, சிந்தனை உரை காலியாக இருக்கக்கூடிய `thinking_delta` ஃபிரேம்களை ஸ்ட்ரீம் செய்கிறது;
Responses API ஒன்றன் பின் ஒன்றாகத் தர்க்க உருப்படிகளை ஸ்ட்ரீம் செய்கிறது.
`isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) இந்த ஃபிரேம்களை அடையாளம் கண்டு,
திருப்பத்தை ரத்து செய்வதற்குப் பதிலாக ஒவ்வொரு ஃபிரேமிலும் கண்காணிப்பானின் நேர ஒதுக்கீட்டை மீண்டும் தொடங்குகிறது.
அவை இன்னும் மாதிரி வெளியீடுகள் அல்ல; ஆகவே தர்க்கத்துடன் மட்டும் முடியும் ஒரு திருப்பம் இன்னும்
காலியானதாகப் பதிவாகும். மேலும், தர்க்கத்தை நிறுத்திவிட்டு இதயத் துடிப்பு சிக்னல்களை மட்டும் அனுப்பும் திருப்பம்
இன்னும் கண்காணிப்பானைத் தூண்டும்.

காலியாக இல்லாத கையொப்பத்தைக் கொண்ட Kiro-வின் பைனரி `reasoningContentEvent` ஃபிரேம்கள், இந்தத் தர்க்கச் செயல்பாட்டை
செயலாக்கி வழியாக காலியான `reasoning_content` டெல்டாவாகப் பாதுகாக்கின்றன. கையொப்பம்
அனுப்பப்படுவதில்லை. மெட்டாடேட்டா, முழுமையற்ற ஃபிரேம்கள் மற்றும் காலியான கையொப்பங்கள்
உள்ளடக்க நேர ஒதுக்கீட்டை மீண்டும் தொடங்காது; தனித்தியங்கும் செயலில் உள்ள ஸ்ட்ரீம் காலக்கெடுவும் கிளையன்ட் ரத்துசெய்தலும் தொடர்ந்து
பொருந்தும் (`open-sse/executors/kiro/reasoning.ts`).

**முடிவுநிலைகள் (கூல்டவுன்கள் அல்ல):**

- `banned` — தடைசெய்யப்பட்ட முக்கியச்சொல் / கணக்குத் தடை கண்டறிதலால் அமைக்கப்படுகிறது ([BAN_DETECTION](../security/BAN_DETECTION.md) பார்க்கவும்); மேலும், தொடர்ந்து நிகழும் மூன்று மேல்நிலை ஒவ்வொரு-கோரிக்கை மறுப்புகளாலும் அமைக்கப்படுகிறது (`request_rejected`, எ.கா. Anthropic OAuth 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`); ஒரு தனி மறுப்பு இணைப்பை மட்டும் கூல்டவுனில் வைக்கும்
- `expired` (வரையறுக்கப்பட்ட மறுமுயற்சிகளுக்குப் பிறகு முடிவுநிலைக்கு மாறும் — அதிவேகப் பின்னடைவுடன் `EXPIRED_RETRY_MAX = 3` — இதனால் தற்காலிக OAuth பிழைகள், கணக்கு நிரந்தரமாகச் செயலிழக்கச் செய்யப்படுவதற்கு முன் தாமாகவே சரியாகலாம்)
- `credits_exhausted`

நற்சான்றுகள் மாறும் வரை அல்லது இயக்குநர் அவற்றை மீட்டமைக்கும் வரை இவை நீடிக்கும். முடிவுநிலைகளைத் தற்காலிக கூல்டவுன் நிலையால் மேலெழுத வேண்டாம்.

**சோம்பேறி மீட்பு:** `rateLimitedUntil` கடந்தவுடன், இணைப்பு மீண்டும் தேர்வுக்குத் தகுதிபெறும். வெற்றிகரமாகப் பயன்படுத்தப்பட்டதும், `clearAccountError()` அனைத்து பிழைப் புலங்களையும் அழிக்கும்.

### Claude OAuth பயன்பாட்டு வரம்புச் சுவர்: குறைந்த முன்னுரிமை வழித்தடம் + அமர்வு வரம்பு மீட்டமைப்பு

**வரம்பு:** ஒரு Claude சந்தா (OAuth) இணைப்பு. இரண்டு அம்சங்களும் **ஒவ்வொரு இணைப்பிற்கும் தனித்தனியாக விருப்பத்தேர்வு செய்ய வேண்டியவை**
(Edit connection → Claude section → `providerSpecificData`-இல் `lowPriorityMode` / `autoLimitReset`,
இரண்டும் இயல்பாக முடக்கப்பட்டிருக்கும்); மேலும் Claude Code-இன் `/low-priority` மற்றும்
`/limit-reset` கட்டளைகளைப் பிரதிபலிக்கின்றன (Claude Code 2.1.263-இலிருந்து பெறப்பட்ட வயர் ஒப்பந்தம்).

**செயலாக்கம்:**

- நிலை இயந்திரம் + பதில் வகைப்படுத்தல்: `open-sse/services/claudeLowPriority.ts`
- மீட்டமைப்பு நிலை/உரிமைகோரல் கிளையன்ட்: `open-sse/services/claudeLimitReset.ts`
- செயலாக்கி ஹுக் (தலைப்பு உட்செலுத்தல் + அதே-கணக்கு மறுமுயற்சி): `open-sse/executors/base.ts::execute()`
- விருப்பத்தேர்வு நிலைத்தன்மை: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**தூண்டுதல்:** 5 மணிநேர பயன்பாட்டு வரம்புச் சுவர் — தலைப்புகளில்
`anthropic-ratelimit-unified-status: rejected` இடம்பெறும் ஒரு `429`; மேலும், கணக்கு தகுதியுடையதாக இருக்கும்போது,
`anthropic-ratelimit-unified-slow-offer: treatment` இடம்பெறும். அந்த முதல் வரம்புச் சுவர்
429-க்கு முன் எதுவும் அனுப்பப்படாது; ஒருங்கிணைந்த தலைப்புகள் இல்லாத திடீர் 429, வழக்கமான கூல்டவுன் பாதை வழியாகச் செல்லும்.

**குறைந்த முன்னுரிமை வழித்தடம்** (`lowPriorityMode`):

- சுவர் 429 ஏற்பட்டால், executor சலுகையை ஏற்று உடனடியாக **அதே**
  கணக்கை `anthropic-usage-limit: slow` உடன் மீண்டும் முயற்சிக்கும்; அறிவிக்கப்பட்ட
  `anthropic-ratelimit-unified-reset` (+60s சலுகை நேரம்) வரை lane செயலில் இருக்கும்,
  மேலும் அந்தச் சாளரத்திலுள்ள ஒவ்வொரு கோரிக்கையும் அந்த header-ஐக் கொண்டிருக்கும்.
  இடைமறிக்கப்பட்ட 429 ஒருபோதும் `handleChatCore`-ஐ அடையாது; எனவே connection
  cooldown-இல் வைக்கப்படுவதும் இல்லை, வேறொன்றுக்கு மாற்றப்படுவதும் இல்லை.
- பிந்தைய responses-இல் `anthropic-ratelimit-unified-slow-status`: `active` / `not_needed`
  lane-ஐத் தக்கவைக்கும்; `slot_busy` (429) அல்லது `529`, server-இன்
  `anthropic-ratelimit-unified-slow-retry-after` நேரம் வரை காத்திருந்து (இயல்புநிலை 20s,
  5–600s வரம்பிற்குள் கட்டுப்படுத்தப்படும், ±30% jitter) மீண்டும் முயற்சிக்கும்; இது
  `anthropic-ratelimit-unified-slow-max-wait` மூலம் வரம்பிடப்படும் (இயல்புநிலை 20 min,
  1 min–6 h வரம்பிற்குள் கட்டுப்படுத்தப்படும்) — அதைத் தாண்டினால் lane முடிவடையும்,
  மேலும் 10 நிமிட cool-off மீண்டும் ஏற்றுக்கொள்வதைத் தடுக்கும். காத்திருப்பு நேரம்,
  கோரிக்கையின் சொந்த upstream-start timeout-இல் மீதமுள்ள நேரத்திலிருந்து
  (`resolveFetchStartTimeout`, இயல்புநிலையாக 10 min) 5 s பாதுகாப்பு இடைவெளியைக் கழித்த
  அளவாலும் கூடுதலாக வரம்பிடப்படும்: அந்த வரம்பு இல்லையெனில், இயல்புநிலை 20 நிமிட
  max-wait கோரிக்கையின் ஆயுளைத் தாண்டி நீடிக்கும்; மேலும் காத்திருப்பின் நடுவே sleep
  நிறுத்தப்பட்டு, சீரான `max_wait` முடிவு + cool-off என்பதற்குப் பதிலாக `TimeoutError`
  வெளிப்படும்.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, 5h-window rollover, அல்லது
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (கட்டண overage இப்போது
  சுவரை ஈடுசெய்வதால், எந்த status-இலும் இது `extra_usage` ஆக முடிவடையும்) lane-ஐ
  முடிவுக்குக் கொண்டுவரும்; அதன் பின்னர் response வழக்கமான cooldown பாதையில் செல்லும்.
  அறிவிக்கப்பட்ட budget reset வரை (≤ 8 days) `budget_exhausted` நினைவில் வைக்கப்படும்.
- சுவர் சரிபார்ப்பு, executor-இன் சொந்த 400-ஆல் தூண்டப்படும் intra-attempt மீள்முயற்சிகளுக்குப்
  பிறகு (context editing, thinking/effort clamps, param auto-learn) இயங்கும்; எனவே அந்த
  மீள்முயற்சிகளில் ஒன்றில் மட்டுமே வெளிப்படும் சுவர் 429 கூட cooldown பாதையை அடைவதற்குப்
  பதிலாக இடைமறிக்கப்படும்.
- நிலை ஒவ்வொரு connection-க்கும் memory-இல் இருக்கும் (restart செய்தால் மீண்டும்
  ஏற்றுக்கொள்ள ஒரு கூடுதல் சுவர் 429 தேவைப்படும்).

**Session-limit reset** (`autoLimitReset`, இரண்டும் இயக்கத்தில் இருக்கும்போது lane-க்கு முன் முயற்சிக்கப்படும்):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide`
  block; `arm: "reset"` மற்றும் `available: true` ஆக இருக்கும்போது,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` உடன்
  `{ "program": "juniper_tide" }` (`providerSpecificData.organizationUUID`-இலிருந்து
  organization UUID, bootstrap fallback).
- `result: reset|not_limited` → கோரிக்கை முழு வேகத்தில் மீண்டும் முயற்சிக்கப்படும் (slow
  header இல்லை). `already_used` / `not_offered`, `next_available_at`-ஐ நினைவில் வைக்கும்
  (இயல்புநிலை ஒரு வாரம்); எந்தத் தோல்வியும் 15 நிமிடங்கள் backoff செய்யும். reset
  வாரத்திற்கு ஒருமுறை மட்டுமே; அது இன்னும் weekly limit-இல் கணக்கிடப்படும்.

Regression பாதுகாப்புகள்: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Session affinity (#7274)

**செயற்பரப்பு:** ஒரு client session (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` header), **எந்த** provider-ஆக இருந்தாலும், ஒரு connection-உடன் பிணைக்கப்படும்.

**நோக்கம்:** பல turn-களைக் கொண்ட agent-ஐ (Claude Code, aider, தனிப்பயன் agents) கோரிக்கைகள்
முழுவதும் அதே account-இல் வைத்திருந்து, account-களுக்கு இடையேயான context இழப்பையும்,
ஒவ்வொரு account-க்கும் தனித்த session state உள்ள provider-களில் மீண்டும் மீண்டும் ஏற்படும்
cold-start 429-களையும் குறைப்பது.

**செயலாக்கம்:**

- TTL தீர்மானம்: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Pin தேர்வு/உருவாக்கம்: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Header பிரித்தெடுத்தல் (பொதுவானது, எந்த provider-க்கும்): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Persist செய்யப்பட்ட pin அட்டவணை: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- அமைப்பு: `sessionAffinityTtlMs` (ms-இல் global TTL, `0` முடக்கும்) — `src/lib/db/settings.ts`. Codex-க்கு மட்டுமான `codexSessionAffinityTtlMs` என்பது `124_generic_session_affinity_ttl.sql` migration மூலம் மறுபெயரிடப்பட்டது; இது முன்பு அமைக்கப்பட்ட எந்த Codex TTL-ஐயும் புதிய இயல்புநிலையாக எடுத்துச் செல்கிறது.

#7274-க்கு முன்பு, `codex` தவிர மற்ற எல்லா provider-களுக்கும் `resolveSessionAffinityTtlMs()` நேரடியாக
`0`-ஐத் திருப்பி நிறுத்தியது; எனவே pinning mechanism மற்றும் header extraction ஏற்கனவே provider-ஐச்
சாராதவையாக இருந்தபோதிலும், TTL அமைப்பும் (மற்றும் session headers-உம்) வேறு எங்கும் எந்த
விளைவையும் ஏற்படுத்தவில்லை. இந்தத் திருத்தம் அந்த early-return-ஐ அகற்றியது; இப்போது TTL
உலகளவில் `0`-க்கு மேல் அமைக்கப்பட்டதும் ஒவ்வொரு provider-க்கும் ஒரே மாதிரியாகப் பொருந்தும்.

மூன்று session-affinity headers-உம் upstream-க்கு ஒருபோதும் forward செய்யப்படாது — client
headers-ஐ அப்படியே அனுப்புவதற்குப் பதிலாக executors தங்களுடைய upstream headers-ஐப் புதிதாக
உருவாக்குகின்றன; எனவே இது உள் correlation id-ஆக மட்டுமே இருக்கும்.

### பிரத்யேக managed session connection leases

**செயற்பரப்பு:** செயலில் உள்ள ஒரு managed HTTP client/session, தகுதியான ஒரு OmniRoute
connection-ஐச் சொந்தமாகக் கொண்டிருக்கும்.

**நோக்கம்:** கோரிக்கைகள் முழுவதும் கடுமையான routing fence தேவைப்படும் client-களுக்கு
நீடித்த பிரத்யேக connection உரிமையை வழங்குவது. இது session affinity-இலிருந்து வேறுபடுகிறது;
session affinity என்பது மென்மையான தொடர்ச்சி விருப்பமாகும்: ஒரு exclusive lease, lifecycle
state-ஐ SQLite-இல் நிலைநிறுத்தி, உலகளாவிய active-owner மற்றும் active-connection தனித்துவத்தைக்
கட்டாயப்படுத்தி, provider dispatch-க்கு முன்பே பழைய generation-ஐ நிராகரிக்கும்.

இந்த அம்சம் ஒவ்வொரு API key-க்கும் opt-in ஆகும். ஒரு managed key-க்கு `lease:exclusive` scope
மற்றும் வெளிப்படையாகக் குறிப்பிடப்பட்ட, காலியாக இல்லாத `allowedConnections` பட்டியல் இருக்க
வேண்டும். எந்த HTTP client-உம் lifecycle endpoint-ஐப் பயன்படுத்தலாம்; client name, user-agent,
provider, OAuth method அல்லது model எதுவும் தேவையில்லை. lease ஒரு connection-ஐச் சொந்தமாகக்
கொள்கிறது, model-ஐ அல்ல; எனவே connection வழக்கமான முறையில் தகுதியுடன் இருக்கும் வரை model
மாற்றப்பட்டாலும் binding தொடரும். வழக்கமான model, quota, health, cooldown மற்றும் allowlist
விதிகள் தொடர்ந்து அதிகாரப்பூர்வமானவையாக இருக்கும்; மேலும் அவை அதே generation-ஐ வேறொரு
காலியாகவும் தகுதியுடனும் உள்ள connection-க்கு மாற்றக்கூடும்.

வாழ்க்கைச் சுழற்சி என்பது `acquire`, `renew`, மற்றும் `release` ஆகிய JSON செயல்களுடன் கூடிய `POST /api/v1/session-leases` ஆகும்.
நிர்வகிக்கப்படும் அனுமானக் கோரிக்கைகள் ஒளிபுகாத `X-OmniRoute-Lease-Owner` மதிப்பையும் துல்லியமான
`X-OmniRoute-Lease-Generation` மதிப்பையும் வழங்குகின்றன. உரிமையாளர் மதிப்பு `vlo_` என்பதைத் தொடர்ந்து 43 base64url எழுத்துகளைக் கொண்டிருக்கும்; அதன்
SHA-256 ஹாஷ் மட்டுமே சேமிக்கப்படுகிறது. ஒவ்வொரு இறுதி அனுப்பல் தடுப்பும் அங்கீகரிக்கப்பட்ட API விசை ID மற்றும்
செயலில் உள்ள இணைப்பு ID ஆகியவற்றுடன் பிணைக்கப்படுகிறது. குத்தகைக் கட்டுப்பாட்டுத் தலைப்புகள் பதிவுகள், தக்கவைக்கப்பட்ட கோரிக்கைத் தற்காட்சிகள் மற்றும்
மேல்நிலைச் செயலாக்கி தலைப்புகளிலிருந்து அகற்றப்படுகின்றன.

வழக்கமான வழிப்படுத்தலில் தகுதியான நிர்வகிக்கப்பட்ட தேர்வுகள் இருந்தும், கிடைக்கக்கூடிய ஒவ்வொரு தேர்வும் வேறொருவரின்
செயலில் உள்ள குத்தகையால் ஆக்கிரமிக்கப்பட்டிருந்தால், OmniRoute ஆனது HTTP `429`, lease-capacity-unavailable குறியீடு,
திறனுக்காகக் காத்திருக்கும் நிலை மற்றும் தொடர்புடைய மிக முந்தைய காலாவதியிலிருந்து பெறப்பட்ட வரம்பிடப்பட்ட `Retry-After` ஆகியவற்றை வழங்கும்.
வழக்கமான காலியான தகுதிநிலை குத்தகைப் போட்டி அல்ல; அது ஏற்கனவே உள்ள வழிப்படுத்தல் பிழை அர்த்தவியலைத் தொடர்ந்து வைத்திருக்கும்.

தொடர்புடைய செயல்முறைகள் தனித்தனியாகவே இருக்கும்:

- OAuth அமர்வு ஆக்கிரமிப்பு என்பது OAuth கணக்குகளுக்கான செயல்முறை-உள்ளக மென்மையான பகிர்வாகும்.
- கணக்கு செமாஃபோர்கள் கோரிக்கை-ஒருங்குநிகழ்வு அனுமதிகளை வழங்குகின்றன; ஒரு கோரிக்கை முடிவடையும்போது அவையும் முடிவடைகின்றன.
- பிரத்தியேக நிர்வகிக்கப்பட்ட அமர்வுக் குத்தகைகள் என்பது தலைமுறைத் தடுப்புடன் கூடிய நீடித்த வாழ்க்கைச் சுழற்சி உரிமையாகும்.

---

## 3. மாடல் பூட்டல்

**வரம்பு:** வழங்குநர் + இணைப்பு + மாடல் மும்மை.

**நிலையின் அடிப்படையிலான விசை வரம்பு:** தோல்வியடையும் நிலை, பூட்டல் எந்த விசையில் எழுதப்பட வேண்டும் என்பதைத் தீர்மானிக்கிறது
(`open-sse/services/accountFallback/exactModelLock.ts`-இல் உள்ள `resolveLockoutScope()`):

- `429` / `403` / `402` — ஒதுக்கீடு அல்லது உரிமைச் சிக்னல் — **ஒதுக்கீட்டுக் குடும்பத்தைப்** பூட்டும்:
  codex-க்கு முழு `codex` / `spark` வரம்பும் (இணைப்பின் ஒவ்வொரு `gpt-5*` மாடலும்),
  மற்ற வழங்குநர்களுக்கு `getQuotaScopedModelForProvider()`.
- `404` அடிப்படை மாடலைப் பூட்டும் (`getModelLockKey()` ஆனது `not_found`-ஐக் குறுக்குகிறது).
- வேறு எந்த நிலையும் — `5xx` போக்குவரத்து/சேவையகத் தோல்விகள் மற்றும் தரச் சரிபார்ப்பிலிருந்து
  OmniRoute தானாக உருவாக்கிய `502` — சரியான
  வழங்குநர்/இணைப்பு/மாடல் மும்மையை மட்டும் பூட்டும். ஒரு மாடலில் உள்ள மோசமான ஸ்ட்ரீம்,
  கணக்கின் ஒதுக்கீடு குறித்த ஆதாரம் அல்ல; இந்த விதிக்கு முன்பு,
  `codex/gpt-5.6-luna`-இல் கிடைத்த ஒரு வெற்று பதில், அந்த இணைப்பின் ஒவ்வொரு `gpt-5*`
  மாடலையும் அதன் ஒதுக்கீடு பாதிக்கப்படாமல் இருந்தபோதும், 2–30 நிமிடங்களுக்கு
  (படிப்படியாக அதிகரிக்கும் வகையில்) வழித்தடத் தேர்விலிருந்து அகற்றியது.
- அழைப்பவரின் வெளிப்படையான `scope` விருப்பத்துக்கே எப்போதும் முன்னுரிமை வழங்கப்படும் (Antigravity `"exact"`-ஐ அனுப்புகிறது).

**நோக்கம்:** ஒரே ஒரு மாடல் கிடைக்காதபோது அல்லது ஒதுக்கீட்டால் வரையறுக்கப்பட்டிருக்கும்போது, முழு இணைப்பையும் முடக்குவதைத் தவிர்ப்பது.

**எடுத்துக்காட்டுகள்:**

- ஒவ்வொரு மாடலுக்கும் தனித்தனி ஒதுக்கீடு கொண்ட வழங்குநர்கள் `429`-ஐத் திருப்புதல்
- விடுபட்ட ஒரு மாடலுக்காக உள்ளக வழங்குநர்கள் `404`-ஐத் திருப்புதல்
- வழங்குநர்-குறிப்பிட்ட பயன்முறை/மாடல் அனுமதித் தோல்விகள் (எ.கா., Grok பயன்முறைகள்)

**செயலாக்கம்:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### மாடல் கூல்டவுன்கள் டாஷ்போர்டு (v3.8.0)

UI: அமைப்புகள் → மாடல் கூல்டவுன்கள் (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

செயலில் உள்ள பூட்டல்களை வழங்குநர், இணைப்பு, மாடல், காரணம், expiresAt ஆகியவற்றுடன் பட்டியலிடுகிறது. இயக்குநர்கள் கார்டிலிருந்து ஒரு மாடலைக் கைமுறையாக மீண்டும் இயக்கலாம்.

**REST API:**

- `GET /api/resilience/model-cooldowns` — செயலில் உள்ள பூட்டல்களைப் பட்டியலிடும்
- `DELETE /api/resilience/model-cooldowns` — கைமுறையாக மீண்டும் இயக்கும். உடல்: `{provider, connection, model}`. அங்கீகாரம்: மேலாண்மை.

### கூல்டவுன் மேலாளர்

UI: கண்காணிப்பு → கூல்டவுன் மேலாளர் (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

ஒவ்வொரு வழங்குநர் பக்கத்தையும் திறப்பதற்குப் பதிலாக, தற்காலிகக் காரணத்தால் வழித்தடத் தேர்விலிருந்து நீக்கப்பட்டுள்ள ஒவ்வொரு இணைப்பிற்குமான ஒரே பக்கம். இது இணைப்புக் கூல்டவுன்கள், மாடல் பூட்டல்கள் மற்றும் இறுதி நிலைகளைப் பட்டியலிடுகிறது; ஒவ்வொரு இணைப்பிற்கும், தேர்ந்தெடுக்கப்பட்டவற்றுக்கும் அல்லது ஒரு வழங்குநரின் அனைத்து இணைப்புகளுக்கும் அவற்றை நீக்குகிறது; மேலும் மிக நுணுக்கமாகச் சரிசெய்யப்பட்ட கூல்டவுன் விதிகளான `streamStallCooldown.enabled` மற்றும் OAuth / API-key `connectionCooldown` அடிப்படைக் கூல்டவுன் மற்றும் அதிகபட்ச பின்னடைவு படிகளைத் திருத்துகிறது (`PATCH /api/resilience` மூலம் சேமிக்கப்படும்). இறுதி நிலைகள் (`banned`, `expired`, `credits_exhausted`) பட்டியலிடப்படும், ஆனால் இங்கே ஒருபோதும் நீக்கப்படாது.

**REST API** (`src/lib/resilience/cooldownManager.ts`, அங்கீகாரம்: மேலாண்மை):

- `GET /api/resilience/cooldowns[?provider=]` — நிலை, மீதமுள்ள கூல்டவுன்,
  பின்னடைவு நிலை, கடைசிப் பிழை வகை மற்றும் மாடல் பூட்டல்களுடன் இணைப்புகள் (நற்சான்றுகள் இல்லை)
- `POST /api/resilience/cooldowns` — உடல் `{connectionIds: string[]}` அல்லது
  `{all: true, provider?}`; `{cleared, unchanged, skippedTerminal, lockoutsCleared}`-ஐத் திருப்பும்

### பூட்டல் அமைப்புகள் UI + வெற்றி-தேய்வு மீட்பு (v3.8.23)

மாடல் பூட்டல், எப்போதும் இயக்கத்தில் இருக்கும் நிலையான குறியீட்டு நடத்தையிலிருந்து, தனக்கென ஒரு அமைப்புக் கார்டும் தானாகச் சீரடையும் மீட்புப் பாதையும் கொண்ட, முழுமையாக உள்ளமைக்கக்கூடிய, விருப்பத்தேர்வு அம்சமாக மாறியது.

**அமைப்புக் கார்டு:** அமைப்புகள் → மாடல் பூட்டல்
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
இது மேலே உள்ள வாசிக்க மட்டும் கூடிய `ModelCooldownsCard`-இலிருந்து **வேறுபட்டது** (அது செயலில் உள்ள பூட்டல்களை மட்டும்
_பட்டியலிடுகிறது_) — புதிய கார்டு _அளவுருக்களை உள்ளமைக்கிறது_. இயல்புநிலைகள்
`DEFAULT_MODEL_LOCKOUT_SETTINGS`-இல் உள்ளன
(`src/lib/resilience/modelLockoutSettings.ts`):

| அமைப்பு                 | இயல்புநிலை                       | பொருள்                                                                                  |
| ----------------------- | -------------------------------- | --------------------------------------------------------------------------------------- |
| `enabled`               | `false`                          | முதன்மை மாற்றி — மாடல் பூட்டல் **இயல்பாக முடக்கப்பட்டுள்ளது**.                          |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | மாடல்-வரம்பிலான தோல்வியாகக் கணக்கிடப்படும் மேல்நிலை நிலைக் குறியீடுகள்.                 |
| `baseCooldownMs`        | `120_000` (120 வி)               | முதல் தோல்விக்கான தொடக்கப் பூட்டல் காலம்.                                               |
| `maxCooldownMs`         | `1_800_000` (30 நிமி)            | படிப்படியாக அதிகரிக்கப்பட்ட கூல்டவுனுக்கான உச்ச வரம்பு.                                 |
| `maxBackoffSteps`       | `10`                             | அதிகபட்ச அடுக்குக்-குறி பின்னடைவு அதிகரிப்புப் படிகள்.                                  |
| `useExponentialBackoff` | `true`                           | மீண்டும் நிகழும் தோல்விகள் கூல்டவுனை அடுக்குக்-குறி முறையில் அதிகரிக்க வேண்டுமா என்பது. |

அமைப்புகள் வழக்கமான அமைப்புச் சேமிப்பகத்தின் மூலம் நிலைத்திருக்கும் மற்றும் மீட்சித்திறன் அமைப்புத் திட்டவடிவம் மூலம் சரிபார்க்கப்படும்; கார்டு `baseCooldownMs`/`maxCooldownMs`
(`maxCooldownMs ≥ baseCooldownMs` உடன்) மற்றும் `maxBackoffSteps` ஆகியவற்றை வரம்பிற்குள் கட்டுப்படுத்துகிறது.

**வெற்றி-தேய்வு மீட்பு:** மீட்பு என்பது வெறும் நேரக்கெடு முடிவடைவதை மட்டும் சார்ந்ததல்ல. ஒரு ஆரோக்கியமான
பதில் மாடலின் தோல்வி எண்ணிக்கையைப் படிப்படியாகக் குறைக்கிறது; எனவே, இடைப்பட்ட காலத்திலேயே மீண்ட ஒரு மாடல்,
அதன் நேரக்கெடு முடிவதற்கு முன்பே அதிகரிப்பதை நிறுத்தி (மற்றும் பூட்டலை நீக்கி) விடுகிறது. வெற்றிகரமான
combo இலக்கில், `open-sse/services/combo.ts` ஆனது `decayModelFailureCount()`-ஐ
(`open-sse/services/accountFallback.ts`) அழைக்கிறது; இது சேமிக்கப்பட்ட
`failureCount`-ஐ **பாதியாகக் குறைக்கிறது** (`Math.floor(failureCount / 2)`); அது `0`-ஐ அடையும்போது பூட்டல்
உள்ளீடு முழுமையாக நீக்கப்படுகிறது. இதன் இணையான `recordModelLockoutFailure()`,
அதிகரிப்பு சாளரத்திற்குள் தோல்விகள் ஏற்படும்போது எண்ணிக்கையை அதிகரிக்கிறது (மேலும் கூல்டவுனையும் அதிகரிக்கிறது).
இந்த வெற்றி-தேய்வு, சாதாரண நேரக்கெடு முடிவிற்கு கூடுதலானது — இந்த இரு பாதைகளில் ஏதேனும் ஒன்று மாடலை மீண்டும் இயக்கலாம்.

**நிலை:** பூட்டல்கள் DB-இல் நிலைத்திருக்காமல், **நினைவகத்தில்** (`provider:connectionId:model` விசையால் குறியிடப்பட்ட `ModelLockoutEntry`-இன் ஒவ்வொரு செயல்முறைக்குமான `Map`-கள், `provider:connectionId:exact:model` விசையால் குறியிடப்பட்ட சரியான-வரம்புப் பூட்டல்கள்) வைக்கப்படுகின்றன — மறுதொடக்கத்தில் அவை இழக்கப்படும். _அமைப்புகள்_ நிலைத்திருக்கும்; செயலில் உள்ள பூட்டல் _நிலை_ தற்காலிகமானது.

---

## 4. Quota-Share ஒரேநேரச் செயல்பாட்டுக் கட்டுப்பாடு (v3.8.36)

சந்தா கணக்குகள் (GLM, MiniMax போன்றவை) பெரும்பாலும் ஒரே நேரத்தில் ~1–3
கோரிக்கைகளை மட்டுமே ஏற்கின்றன; அதை மீறுவது 429 பிழைகளையும் cooldown-களையும் தூண்டும். பல API விசைகள் ஒரே upstream
கணக்கைப் பகிரும் **quota-share** (`qtSd/…`) combo-களில் இது தீவிரமாக இருக்கும்.
மூன்று அடுக்குகள் பகிரப்பட்ட கணக்கிற்குக் கோரிக்கைகள் அளவுக்கு அதிகமாக அனுப்பப்படுவதைத் தடுக்கின்றன.

### ஒவ்வொரு இணைப்புக்குமான ஒரேநேரச் செயல்பாட்டு உச்சவரம்பு (`max_concurrent`)

ஒவ்வொரு provider இணைப்பும் ஒரு `max_concurrent` உச்சவரம்பை அறிவிக்கலாம்
(`provider_connections.max_concurrent`, இணைப்பு modal / API / DB-இல் அமைக்கப்படும்).
வரம்பு வேண்டாம் என்றால் அதைக் காலியாக விடவும். கீழேயுள்ள serialization
அடுக்கை இயக்கும் ஒற்றை அமைப்பு இதுதான் — கணக்கின் உண்மையான ஒரேநேரச் செயல்பாட்டு அளவுக்கு இதை அமைக்கவும் (எ.கா. GLM ~1, MiniMax ~2).

### ஒவ்வொரு model-க்குமான ஒரேநேரச் செயல்பாட்டு உச்சவரம்புகள் (`modelConcurrency`)

ஒரு இணைப்பு, தனது `rateLimitOverrides` map-க்குள் ஒவ்வொரு model-க்கும் துல்லியமான ஒரேநேரச் செயல்பாட்டு உச்சவரம்புகளைக்
கூடுதலாக அறிவிக்கலாம்:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

இணைப்பு modal-இல் (**Rate limit overrides → ஒவ்வொரு model-க்குமான
ஒரேநேரச் செயல்பாட்டு உச்சவரம்புகள்**, ஒரு வரிக்கு ஒரு `model=cap`) அல்லது அதே JSON வடிவத்துடன்
`PATCH /api/providers/[id]` வழியாக இதை அமைக்கவும். முக்கிய அர்த்தவியல்:

- **இணைப்பு முழுவதற்குமானது மற்றும் model-க்கு உரியது:** `maxConcurrent` என்பது பகிரப்பட்ட
  இணைப்பு முழுவதற்குமான உச்சவரம்பாகவே இருக்கும். இரண்டும் பொருந்தும்போது, ஒரே composite gate-இல்
  இரு gate-களும் அணுக்கமாகப் பெறப்படும்
  (`global → provider → account → model`); பொருந்தும் வரம்புகளில் கடுமையானதே
  நடைமுறை நடத்தையை நிர்ணயிக்கும்.
- **துல்லியமான model-key பொருத்தம்:** routing resolution-க்குப் பிறகு executor-க்கு அனுப்பப்படும்
  model string-தான் key ஆகும் — பொதுவாக வெறும் upstream model id
  (`glm-5`), client-side `provider/model` alias அல்ல (`zai/glm-5` என்பது
  `glm-5`-உடன் பொருந்தாது). மதிப்புகள் நேர்ம முழு எண்ணாகக் குறிப்பிடப்படும் ஒரேநேரக் கோரிக்கை உச்சவரம்புகள்.
- **உள்ளக queueing, கண்டறிதல் இல்லை:** கூடுதல் கோரிக்கைகள் ஏற்கெனவே உள்ள
  queue/timeout அர்த்தவியலுடன் உள்ளகமாக வரிசைப்படுத்தப்படும் (வகையிடப்பட்ட `SEMAPHORE_TIMEOUT` /
  `SEMAPHORE_QUEUE_FULL` அனுமதிப் பிழைகள்). OmniRoute upstream கொள்கையைக் கண்டறியவோ
  அனுமானிக்கவோ செய்யாது — operator கட்டமைத்த துல்லியமான உச்சவரம்புகளையே அது
  அமல்படுத்தும். நிரம்பிய model gate ஒருபோதும் provider-ஐ முடக்காது; மேலும்
  நிரந்தரமான model lockout-ஐ உருவாக்காது; upstream 429/cooldown/fallback நடத்தை
  பிழைகளுக்கான இறுதிப் பாதுகாப்பாகத் தொடரும்.
- **ஒவ்வொரு இணைப்புக்கும், ஒவ்வொரு process-க்கும் தனித்த வரம்பு:** உச்சவரம்புகள் ஒவ்வொரு database இணைப்புக்கும்
  உரியவை மற்றும் நினைவகத்தில் வைத்திருக்கப்படுகின்றன; எனவே ஒரே upstream API key-ஐ மீண்டும் பயன்படுத்தும் இரண்டு இணைப்புகள்
  ஒன்றுடன் ஒன்று ஒருங்கிணையாது.
- **கட்டமைக்கப்படாதது என்றால் மாற்றமில்லை:** map-ஐத் தவிர்ப்பது (அல்லது
  dashboard புலத்தைக் காலியாக விடுவது) எந்த model gate-ஐயும் சேர்க்காது. எந்தவொரு பொதுவான provider வரம்பையும்
  உறுதிப்படுத்தாமல் அமைக்கப்படும் எடுத்துக்காட்டு கட்டமைப்பு:

```text
glm-5=1
glm-4.7=3
```

### Quota-share கோரிக்கை serialization

Quota-share dispatch ஒன்று நேர்ம `max_concurrent` மதிப்பை அறிவிக்கும் இணைப்பை இலக்காகக் கொள்ளும்போது,
அந்த **கணக்கிற்கான** ஒரேநேரக் கோரிக்கைகள் ஒவ்வொரு இணைப்புக்குமான semaphore வழியாக
வரிசைப்படுத்தப்படுகின்றன (key `qsconn:<connectionId>`): கூடுதல் கோரிக்கைகள் கணக்கை நிரப்புவதற்குப் பதிலாக
**queue-இல் காத்திருக்கும்**. இது **fail-open** — நிரம்பிய
queue அல்லது timeout, dispatch செய்யக்கூடிய கோரிக்கையை நிராகரிப்பதற்குப் பதிலாக slot இல்லாமலேயே தொடரும்.
**Settings → Resilience → Quota-share per-connection
concurrency** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, இயல்புநிலையில்
இயக்கப்பட்டிருக்கும்) என்பதில் இதை மாற்றலாம். `max_concurrent` உச்சவரம்பு இல்லையெனில் நடத்தை மாறாது.

> Quota-share routing gate (`selectQuotaShareTarget`, DRR + P2C) தானும்
> fail-open ஆகும்; மேலும் உச்சவரம்பை எட்டிய இணைப்பை _குறைந்த முன்னுரிமைக்கு_ மட்டுமே மாற்றும் —
> ஒற்றை-இணைப்பு pool-இல் அது கடுமையான வரம்பைச் செயல்படுத்த முடியாது; எனவே இந்த semaphore-தான் உண்மையில்
> அதிகப்படியான கோரிக்கைகளை கட்டுப்படுத்துகிறது.

### Combo cooldown-ஐக் கருத்தில் கொள்ளும் retry

ஒவ்வொரு combo strategy-க்கும் (இயக்கப்பட்டிருக்கும்போது), குறுகிய கால transient cooldown-க்கான 429 பிழையை
உறுதிப்படுத்தக்கூடிய கோரிக்கை, 429-ஐத் திருப்பி அனுப்புவதற்குப் பதிலாக cooldown முடியும் வரை காத்திருந்து
மீண்டும் dispatch செய்யப்படும் — இது multi-model combo-களில் Gemini-வகை TPM/RPM window-களை
(~60s retry-after) உள்ளடக்கும்; எ.கா. 2-model combo-வின் இரு இலக்குகளும் ஒவ்வொரு model-க்குமான
rate limit-ஐ எட்டுவது. இது **Settings → Resilience** என்பதிலுள்ள
`comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`,
`budgetMs`) மூலம் வரம்பிடப்படுகிறது. `quota_exhausted` (நள்ளிரவு வரை பூட்டப்பட்டிருக்கும்)
அல்லது auth/not-found காரணங்களுக்காக இது ஒருபோதும் காத்திருக்காது.

---

## 5. கோரிக்கை வரிசை அனுமதிக் கட்டுப்பாடு (v3.8.49 · issue #6593)

**வரம்பு**: மேலே உள்ள மூன்று வழிமுறைகளுக்கும் ஒரு அடுக்கு கீழே அமைந்துள்ள, உள்ளூர் provider+connection-க்கான வீத-வரம்பு வரிசை (`open-sse/services/rateLimitManager.ts`,
Bottleneck-ஐ அடிப்படையாகக் கொண்டது).

**`maxWaitMs` வரிசைக் காத்திருப்பைக் கட்டுப்படுத்துகிறது; `executionMaxWaitMs` செயல்பாட்டைக் கட்டுப்படுத்துகிறது.**
இவை இரண்டும் திட்டமிட்டே தனித்தனியாக வைக்கப்பட்டுள்ளன; ஒன்று மற்றொன்றின் மீது தாக்கம் செலுத்தாது.

`resilienceSettings.requestQueue.maxWaitMs` என்பது **வரிசைக் காத்திருப்பு ஒதுக்கீடு**: இது
provider slot-க்காகக் காத்திருப்பதையும், பின்னர் QUEUED நிலையில் இருப்பதையும்
உள்ளடக்குகிறது; job QUEUED நிலையிலிருந்து வெளியேறிச் செயல்படத் தொடங்கும்
தருணத்திலேயே அதன் timer அழிக்கப்படுகிறது
(`rateLimitManager.ts`, `wrappedFn`). இந்த வரம்பை மீறும் கோரிக்கை
upstream-ஐ ஒருபோதும் சென்றடையாது. இயல்புநிலை 30000ms; இது
`src/lib/resilience/settings.ts`-இல் உள்ள `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`
மூலம் வழங்கப்பட்டு,
`tests/unit/ratelimit-admission-control-6593.test.ts` மூலம் நிலைநிறுத்தப்பட்டுள்ளது.
எனவே, இதை மாற்றினால் இந்தப் பத்தி கவனிக்கப்படாமல் காலாவதியாக விடப்படுவதற்குப்
பதிலாக அந்த test தோல்வியடையும்.

`resilienceSettings.requestQueue.executionMaxWaitMs` என்பதே Bottleneck-க்கு
job `expiration` ஆக வழங்கப்படுகிறது; அதன் timer dispatch செய்யப்பட்ட பிறகே
தொடங்குகிறது. தனக்கென upstream timeout இல்லாத executor-களுக்கான இறுதிப்
பாதுகாப்பாக இது செயல்படுகிறது. executor-ன் சொந்த fetch-start timeout இதைவிட
நீளமாக இருந்தால், இது அந்த timeout அளவுக்கு உயர்த்தப்படும்; இதனால்
ஆரோக்கியமாகச் செயல்பட்டுக்கொண்டிருக்கும் response இடையில் துண்டிக்கப்படாது.
இயல்புநிலை 600000ms (10 நிமிடம்).

வரிசை ஒதுக்கீட்டை `expiration`-க்குள் செலுத்தியதுதான் முன்பு non-incremental
gateway-களைச் செயல்பாட்டின் நடுவில் நிறுத்தியது — அவை முதல் bytes-ஐ அனுப்புவதற்கு
முன்பு சட்டபூர்வமாகவே பல நிமிடங்கள் இயங்கக்கூடும் — அதனால்தான் expiration,
`code: "RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) என வெளிப்படுத்தப்படுகிறது;
அதேவேளை வரிசை ஒதுக்கீடு queue-timeout code-ஐக் கொண்டிருக்கும்.
`RATE_LIMIT_MAX_WAIT_MS` / `RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) அல்லது
dashboard (**Settings → Resilience**) மூலம் ஏதேனும் ஒன்றை override செய்யலாம்.
normalise செய்யப்படும்போது இரண்டும் 1ms–24h வரம்பிற்குள் கட்டுப்படுத்தப்படும்.

**இரண்டிற்குமான முன்னுரிமை:** env var ஆனது _இயல்புநிலையை_ மட்டுமே வழங்குகிறது.
`resilienceSettings.requestQueue`-இல் நிலையாகச் சேமிக்கப்பட்ட மதிப்பு
(dashboard / API patch, `key_value`-இல் சேமிக்கப்பட்டது) அதைவிட முன்னுரிமை
பெறும்; ஒவ்வொரு connection-க்கும் உரிய `rateLimitOverrides.maxWaitMs` /
`.executionMaxWaitMs` அதைவிடவும் முன்னுரிமை பெறும். எனவே ஏற்கனவே நிலையாகச்
சேமிக்கப்பட்ட மதிப்பைக் கொண்ட deployment-இல் env var-ஐ அமைப்பது எதையும்
மாற்றாது — அதற்குப் பதிலாக நிலையாகச் சேமிக்கப்பட்ட setting-ஐ அழிக்கவும்
அல்லது புதுப்பிக்கவும்.

வரிசையில் இருக்கும் காலம் `maxWaitMs` மூலம் கட்டுப்படுத்தப்படுகிறது; கீழே உள்ள
`maxQueueDepth`, ஒரே நேரத்தில் எத்தனை caller-கள் வரிசையில் இருக்கலாம் என்பதைக்
கட்டுப்படுத்துகிறது.

**`maxQueueDepth` — விருப்பத் தேர்வான அனுமதி உச்சவரம்பு (புதியது).** `resilienceSettings.requestQueue.maxQueueDepth`
என்பது ஒரே provider+connection-க்காக ஒரே நேரத்தில் வரிசையில் (இன்னும் dispatch
செய்யப்படாமல்) இருக்கக்கூடிய கோரிக்கைகளின் எண்ணிக்கையைக் கட்டுப்படுத்துகிறது.
வரிசையில் ஏற்கனவே `maxQueueDepth` கோரிக்கைகள் இருந்தால், புதிய கோரிக்கை
`limiter.schedule()`-ஐ அடைவதற்கு **முன்பே**, வகைப்படுத்தப்பட்ட
`code: "RATE_LIMIT_QUEUE_FULL"` பிழையுடன் உடனடியாக நிராகரிக்கப்படும்
— எனவே நிராகரிப்பு செலவு குறைந்தது; மேலும் அந்தக் கோரிக்கைக்கான downstream
prompt-compression / translation வேலைகள் தொடங்குவதற்கு முன்பே அது நிகழும்.
இயல்புநிலை `0` = முடக்கப்பட்டது; இது ஏற்கனவே உள்ள வரம்பற்ற-வரிசை நடத்தையைப்
பாதுகாக்கிறது; அனுமதிக்கப்பட்ட வரம்பு 0–100000.
`RATE_LIMIT_MAX_QUEUE_DEPTH` (env) அல்லது
`resilienceSettings.requestQueue.maxQueueDepth` (dashboard/API patch) மூலம்
override செய்யலாம்.

அனுமதிச் சரிபார்ப்பு தானே ஒரு pure function ஆகும்
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`);
எனவே உண்மையான Bottleneck limiter இல்லாமலேயே அதை unit-test செய்யலாம்.

> #6593-ஐத் தொடங்கிய RFC, `bypassCompressionOnRateLimit`
> flag ஒன்றையும் முன்மொழிந்தது. இந்த repo-வின்
> `open-sse/services/compression/` pipeline என்பது outbound LLM கோரிக்கையின்
> prompt/context compression (`chatCore.ts`-இல்,
> `resolveCompressionSettings`/`selectCompressionStrategy` block-ஐச் சுற்றி)
> ஆகும்; synthesized 429 body-களுக்கான HTTP response compression அல்ல —
> நேரடியான bypass flag-க்கு இணையான code path எதுவும் இல்லை. அந்த
> prompt-compression படிநிலையும் தற்போது request pipeline-இல்
> `withRateLimit()`-க்கு _முன்பே_ இயங்குகிறது. எனவே queue-full நிராகரிப்பின்போது
> அதைத் தவிர்ப்பதற்காக வரிசையை மாற்றுவது, இந்த issue-ன் வரம்பைவிடத் தனியானதும்
> பெரியதுமான மாற்றமாகும்; இது திட்டமிட்டே இங்கு செயல்படுத்தப்படவில்லை. CPU
> சேமிப்பின் பலன், வரிசைமாற்ற ஆபத்துக்குத் தகுந்ததாக இருந்தால், follow-up ஆக
> மேற்கொள்ள விடப்பட்டுள்ளது.

---

## 6. மெதுவான ஸ்ட்ரீம் செயல்திறன் கண்காணிப்பான் (#9709)

விருப்பத்திற்குரிய `resilienceSettings.streamRecovery.throughputWatchdog` பாதுகாப்பு,
தொடர்ந்து chunks-ஐ அனுப்பிக்கொண்டிருந்தாலும் கட்டமைக்கப்பட்ட பயனுள்ள வெளியீட்டு
விகிதத்திற்குக் கீழே assistant வெளியீட்டை உருவாக்கும் upstream-ஐக் கண்டறிகிறது.
இது idle timeout-இலிருந்து வேண்டுமென்றே தனித்ததாக வைக்கப்பட்டுள்ளது: heartbeats
மற்றும் metadata ஆகியவை எந்த timer-ஐயும் மீட்டமைப்பதில்லை, மேலும் அவை
முன்னேற்றமாகவும் கணக்கிடப்படுவதில்லை. இது hard attempt deadline (#9153)-இலிருந்தும்
தனித்ததாகும்; வெளியீட்டுத் தரத்தைப் பொருட்படுத்தாமல் அது முழுமையான பாதுகாப்பு
உச்சவரம்பாகத் தொடர்கிறது.

கண்காணிப்பான் abort செய்யக்கூடிய நிலையை அடைவதற்கு முன், ஒரு warm-up காலமும் அதைத்
தொடர்ந்து ஒரு முழுமையான rolling window-வும் தேவைப்படும். இது Chat Completions
மற்றும் Responses API வெளியீட்டு events-இலிருந்து வரும் text deltas-ஐ
(பழமைவாதமான UTF-8 byte proxy) கணக்கிடுகிறது; usage-only மற்றும் காலியான events-ஐப்
புறக்கணிக்கிறது; மேலும் tool-call அல்லது reasoning events செயல்பாட்டில் இருக்கும்போது
மதிப்பீட்டை இடைநிறுத்துகிறது. இது இயல்பாக முடக்கப்பட்டிருக்கும்; இதை
`STREAM_THROUGHPUT_WATCHDOG_ENABLED=true` மூலம் இயக்கலாம். window, warm-up,
குறைந்தபட்ச விகிதம் மற்றும் அளவிடக்கூடிய குறைந்தபட்ச வெளியீடு ஆகியவை வழக்கமான
resilience-settings normalization layer மூலம் வரம்புபடுத்தப்படுகின்றன.

இயக்கப்பட்டிருக்கும்போது, watchdog abort செயலில் உள்ள upstream attempt-க்கு மட்டுமே
பயன்படுத்தப்படும். client-க்குத் தெரியும் bytes ஏதேனும் அனுப்பப்படுவதற்கு முன்,
ஏற்கெனவே உள்ள same-account early-recovery பாதை attempt-ஐ மீண்டும் திறக்கக்கூடும்.
Commit செய்யப்பட்ட பிறகு, stream கண்மூடித்தனமாக மீண்டும் இயக்கப்படாது; ஏற்கெனவே
உள்ள பாதுகாப்பான mid-stream continuation ஒப்பந்தம் மட்டுமே ஒரு suffix-ஐ
இணைக்க முடியும். Finalization தொடர்ந்து ஒரே முறை மட்டுமே நிகழ்வதால், usage
accounting மற்றும் semaphore release நகலெடுக்கப்படுவதில்லை.

---

## 7. Upstream நிலை மறுவரையறை (தவறாகக் குறிப்பிடப்பட்ட quota பிழைகள்)

**வரம்பு:** தற்காலிக quota தீர்வைத் தவறான HTTP status மூலம் தெரிவிக்கும் ஓர் upstream gateway.

**நோக்கம்:** classification-க்கு முன்பாகவே தவறாக வழிநடத்தும் status-ஐத் திருத்தி, downstream நுகர்வோர் (fallback engine, combo aggregation, client-ஐ எதிர்நோக்கும் response) தோல்வியின் உண்மையான retryable தன்மையைப் பார்க்கச் செய்வது.

சில gateways, TEMPORARY quota தீர்வை retry செய்ய முடியாத HTTP status மூலம்
குறிக்கின்றன. `agentrouter.org`, வழக்கமான `429`-க்குப் பதிலாக சீன மொழி body-உடன்
(`用户额度不足` / `额度不足`) `403`-ஐ (சில நேரங்களில் `400`) வழங்குகிறது. Claude
Code போன்ற clients, `403`-ஐ நிரந்தரமானதாகக் கருதி session-ஐ abort செய்கின்றன;
திருத்தம் இல்லாவிட்டால் fallback engine அதை quota event-ஆக அல்லாமல்
`AUTH_ERROR`-ஆக classify செய்யும்.

**செயலாக்கம்:**

- Registry + matcher: `open-sse/config/upstreamStatusRestatement.ts` — ஒவ்வொரு
  provider-க்குமான விதிகளின் பட்டியல் (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), `applyStatusRestatement()` வழியாகப்
  பொருத்தப்படுகிறது.
- அழைப்பு இடம்: `open-sse/handlers/chatCore.ts`-இல் உள்ள `providerFailure:` block
  (வரி 3654-ஐச் சுற்றி), பிழையான HTTP status (`!providerResponse.ok`) கொண்ட ஓர்
  upstream response-ஐ `parseUpstreamError()` parse செய்த உடனேயும், எந்த
  classification-ம் இயங்குவதற்கு முன்பாகவும் இது அமைந்துள்ளது; இதனால் ஒவ்வொரு
  downstream நுகர்வோரும் திருத்தப்பட்ட status-ஐப் பார்க்கின்றனர். `200` SSE
  stream-க்குள் உட்பொதிக்கப்பட்ட பிழைகள் தனியான, பின்னர் நிகழும் stream-parsing
  பாதையைப் பின்பற்றுகின்றன; அவை இன்று இந்த hook-ஆல் **கையாளப்படுவதில்லை** — இது
  அறியப்பட்ட வரம்பாகும், மேலும் agentrouter-இன் தவறான status-க்கு இது இன்னும்
  தேவையில்லை (அது பிழையான HTTP status-ஆகவே வெளிப்படுகிறது).
- Retry தகுதி: `429`, `RETRY_AFTER_ELIGIBLE_STATUSES`-இல் உள்ளது
  (`open-sse/services/combo/unavailableRetryGate.ts`); எனவே மறுவரையறை செய்யப்பட்ட
  பிழை, செயலற்ற `403`-ஆக வெளிப்படுவதற்குப் பதிலாக உண்மையான retry window-ஐக்
  கொண்டிருக்கும்.
- செயற்கையான `60s` `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`) என்பது
  மறுவரையறை செய்யப்பட்ட response **client**-க்கு தெரிவிப்பது மட்டுமே; அதுவே
  connection-இன் உள்புற cooldown/lockout காலம் அல்ல — மறுவரையறை செய்யப்பட்ட
  பிழையை உண்மையில் கையாளும் mechanism எதுவோ அதனால் அது தனியாக நிர்வகிக்கப்படுகிறது
  (Connection Cooldown-இன் அதிகரிக்கும் backoff, §2, API-key providers-க்கு அடிப்படை
  `3s`; அல்லது agentrouter போன்ற per-model-quota providers-க்கு Model Lockout, §3).
  Client-க்கு அறிவிக்கும் 60s window-க்கு முன்னதாகவே router உள்புறமாக retry
  செய்வதற்குத் தகுதி பெறலாம் — இது நோக்கமுள்ள கூடுதல் இடைவெளி, bug அல்ல.

நிரந்தரமான பிழைகள் (agentrouter-இன் `无权访问模型` — இந்த model-ஐ அணுக அனுமதி இல்லை)
ஒருபோதும் மறுவரையறை செய்யப்படுவதில்லை: `textMarkers` பொருந்தினாலும்
`excludeMarkers` விதியைத் தடுக்கிறது; எனவே பிழை தனது அசல் status-ஐத் தக்கவைத்துக்
கொள்கிறது, எதுவும் அதை முடிவில்லாமல் retry செய்வதில்லை. பொருந்தும் provider
classification விதியான
(`open-sse/config/providerErrorRules.ts`-இல் உள்ள `agentrouter-model-access-denied`:
`reason: "auth_error"`, `scope: "model"`, அறிவிக்கப்பட்ட `6h` அடிப்படை cooldown),
பொதுவான apikey-category `FORBIDDEN` early-return-க்கு _முன்பாக_
`checkFallbackError` (`open-sse/services/accountFallback.ts`) மூலம்
ஆலோசிக்கப்படுகிறது; இது `honorsRuleLockScope(provider)` மூலம் கட்டுப்படுத்தப்படுகிறது
(#10334 — தற்போது `providerErrorRules.ts`-இல் உள்ள
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` allowlist வழியாக agentrouter-க்கு மட்டுமே).
விதி அறிவித்த 6h cooldown, `fallbackResult.baseCooldownMs`-ஆகப் பாய்ந்துசென்றாலும்,
அது ஏற்கெனவே உள்ள per-model-quota lockout பாதைக்கே
(`lockModelIfPerModelQuota()` / `recordModelLockoutFailure()`, cooldown மூலத்தைத்
தவிர #10334 மூலம் மாற்றப்படாதது) தொடர்ந்து வழங்கப்படுகிறது: மற்ற அனைத்து model
lockout-களைப் போலவே, இது operator-இன் `mlSettings.maxCooldownMs` மதிப்புக்கு
(இயல்புநிலை `1_800_000ms` / 30min) கீழாகக் கட்டுப்படுத்தப்படுகிறது; மேலும்
_persist செய்யப்பட்ட lockout காரணம்_ விதியின் `"auth_error"` அல்ல, ஏற்கெனவே உள்ள
hardcoded `"forbidden"` ஆகவே தொடர்கிறது — காரண string அல்ல, cooldown கால அளவு
மட்டுமே தொடக்கம் முதல் முடிவு வரை மதிக்கப்படுகிறது. Connection தொடர்ந்து
செயலில் இருக்கும்; அதே connection-இல் உள்ள sibling models பாதிக்கப்படுவதில்லை.

மறுவடிவமைக்கப்பட்ட ஒதுக்கீட்டுப் பிழைகள் (`额度不足`) உற்பத்திச் சூழலில் ஒரு வழங்குநர் விதியை அடைகின்றன
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, தனக்கென அறிவிக்கப்பட்ட cooldown எதுவும் இல்லை — நிலைத்தன்மை அடுக்கின்
அளவீடு செய்யப்பட்ட backoff இயல்புநிலை பயன்படுத்தப்படுகிறது). #10334 முதல்,
`ProviderErrorRuleMatch`-இல் உள்ள `scope` முழுமையாகப் பயன்படுத்தப்படுகிறது, ஆனால்
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` அனுமதிப்பட்டியலில் உள்ள வழங்குநர்களுக்கு
**மட்டுமே** (`providerErrorRules.ts` — தற்போது `"agentrouter"` மட்டும்,
`honorsRuleLockScope()` வழியாகக் கட்டுப்படுத்தப்படுகிறது). மற்ற ஒவ்வொரு
வழங்குநருக்கும் `scope`, #10334-க்கு முன்பு இருந்ததைப் போலவே, தகவலுக்காக மட்டுமே
உள்ளது. `checkFallbackError`, பொருந்திய விதியின் scope-ஐ
`fallbackResult.ruleScope` ஆக வெளிப்படுத்துகிறது;
`isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) என்பது ஒரு `ruleScope`-ஐ இணைப்பு முழுவதற்குமான,
தானாக மீளக்கூடிய signal ஆகப் பின்பற்றுவது உண்மையிலேயே பாதுகாப்பானதா என்பதை
உறுதிப்படுத்தும் பகிரப்பட்ட guard ஆகும் (scope `"connection"`, reason
`quota_exhausted`, ஒருபோதும் `permanent` அல்ல, ஒருபோதும் `creditsExhausted`
அல்ல — எதிர்காலத்தில் scope `"connection"`-ஐ ஒரு நிரந்தரக் கணக்கு நிலையுடன்
இணைக்கும் விதிக்கு எதிரான பாதுகாப்பு). இரண்டு consumers இதை அழைக்கின்றன:

- **நிலைத்தன்மை** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  passthrough-provider-இன் **ஒவ்வொரு model-க்குமான** lockout கிளைக்குள்
  செல்வதற்குப் பதிலாக (agentrouter என்பது `passthroughModels: true` →
  `hasPerModelQuota()` ஆனது `true`-ஐ வழங்குகிறது), இது ஒரு **தற்காலிக இணைப்பு
  cooldown**-ஐப் பயன்படுத்துகிறது — `testStatus: "unavailable"` +
  `rateLimitedUntil`, ஒருபோதும் terminal status
  (`credits_exhausted`/`banned`/`expired`) அல்ல — இதனால் cooldown முடிந்ததும்
  இணைப்பு தானாக மீள்கிறது; கைமுறையான credential reset தேவையில்லை.
  `disableCooling: true` கொண்ட இணைப்புகளுக்கு இது தவிர்க்கப்படுகிறது (#2997):
  அந்த opt-out அதற்குப் பதிலாக ஒவ்வொரு model-க்குமான lockout-க்குச் செல்கிறது
  (ஆவணப்படுத்தப்பட்ட ஒரு சமரசம் — கிளைக்கு மேலுள்ள code comment-ஐப் பார்க்கவும்).
- **அதே-request combo routing** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): அதே guard, இணைப்பை
  `${provider}:${connectionId}` என்ற key-ஐக் கொண்ட in-memory
  `exhaustedConnections` set-இல் குறிக்கிறது. இது மீதமுள்ள ஒரு SAME-REQUEST
  target-ஐ, அதன் சொந்த target object-இல் _அதே `connectionId` ஏற்கனவே இருந்தால்
  மட்டுமே_ தவிர்க்கிறது (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `exhaustedConnections`
  lookup-க்கு முன் `if (provider &&
connectionId)`) — sibling targets தங்களுக்கென pinned `connectionId`-ஐக்
  கொண்டிருக்காத, response-இன் `X-OmniRoute-Selected-Connection-Id` header-இலிருந்து
  ஒவ்வொரு dispatch-க்கும் ஒன்று மட்டும் தீர்மானிக்கப்படும் சாதாரண
  model-list combo, அந்த key பொருத்தத்தை ஒருபோதும் அடையாது. அந்தப் பொதுவான
  நிலையில், மீதமுள்ள leg ஒன்று இப்போது ஒதுக்கீடு தீர்ந்த கணக்கை மீண்டும்
  பயன்படுத்துவதிலிருந்து வழங்கப்படும் உண்மையான பாதுகாப்பு இந்த Set **அல்ல** —
  மேலுள்ள நிலைத்தன்மை அடுக்கு (இணைப்பின் `rateLimitedUntil` இப்போது
  எதிர்காலத்தில் உள்ளது) மற்றும் தோல்விக்கான
  `transientRateLimitedProviders`-ஐ அடக்கும் இதே guard ஆகியவற்றின்
  சேர்க்கையே அது ("இரண்டு-கட்ட வடிவமைப்பு" மற்றும்
  `targetExhaustion.ts`-இல் உள்ள `isAgentrouterConnectionQuotaScope`
  கிளையின் code comment-ஐப் பார்க்கவும்): அந்த Set குறிக்கப்படாமல்
  விடப்பட்டுள்ளதால், `combo.ts`-இன் `allowRateLimitedConnection` force-allow
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) வழங்குநரின் மீதமுள்ள
  legs-க்கு செயல்படாது; எனவே credential selection-இன் `rateLimitedUntil`
  filter (`src/sse/services/auth.ts:1238`) வழக்கம்போல் மதிக்கப்படுகிறது, மேலும்
  மீதமுள்ள leg வேறொரு, இன்னும் தகுதியுள்ள agentrouter இணைப்பைத் தேர்ந்தெடுக்கிறது
  அல்லது கிடைக்கக்கூடிய credentials எதுவும் இல்லாமல் தோல்வியடைகிறது — இந்தக் கிளை
  இப்போது cooldown செய்த இணைப்புக்குள் தன்னைக் கட்டாயப்படுத்தி மீண்டும் நுழையாது.

### இரண்டு-கட்ட வடிவமைப்பு: status மறுவடிவமைப்பு, பின்னர் வகைப்பாடு

Status மறுவடிவமைப்பு (`upstreamStatusRestatement.ts`) மற்றும் வழங்குநர்
வகைப்பாட்டு விதிகள் (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) ஆகியவை வழங்குநர் id மற்றும் text markers ஆகியவற்றை
key ஆகக் கொண்ட தனித்தனி registries; ஆனால் அவை வெவ்வேறு இடங்களில் இயங்கி,
வெவ்வேறு நோக்கங்களை நிறைவேற்றுகின்றன: மறுவடிவமைப்பு `chatCore.ts`-இல் HTTP
status-ஐ ஆரம்பத்திலேயே மீண்டும் எழுதுகிறது; வகைப்பாட்டு விதிகள்
`checkFallbackError()`-க்குள் fallback `reason` மற்றும் lock `scope`
(`model` / `provider` / `connection`) ஆகியவற்றைத் தேர்ந்தெடுக்கின்றன
(`open-sse/services/accountFallback.ts`).

`providerErrorRules.ts`-இல் உள்ள `FULL_TEXT_RULE_PROVIDERS` அனுமதிப்பட்டியலில்
உள்ள வழங்குநர்களுக்கு மட்டுமே வகைப்பாட்டு விதிகள் முழுமையான error **text**-ஐப்
பார்க்கின்றன (`额度不足` போன்ற body markers-ஐப் பொருத்த இது தேவைப்படுகிறது) —
தற்போது `"agentrouter"` மட்டும். மற்ற ஒவ்வொரு **உள்ளமைந்த catalog**
வழங்குநருக்கும், `checkFallbackError` ஆனது `getProviderErrorRuleMatch`-க்கு
structured error (`{code, type}`) மட்டுமே வழங்குகிறது; அது
header/status/code-அடிப்படையிலான விதிகளுக்குப் போதுமானது, ஆனால் body-text
markers-ஐக் காணாது. `resolveRuleMatchBody()` helper இந்தத் தேர்வைச் செய்கிறது:
அனுமதிப்பட்டியலில் உள்ள வழங்குநர்களுக்கு முழுமையான error text, மற்றவர்களுக்கு
structured error. ஒரு **உள்ளமைந்த** வழங்குநரை `FULL_TEXT_RULE_PROVIDERS`-இல்
சேர்ப்பது வெளிப்படையான ஒவ்வொரு-வழங்குநருக்குமான opt-in ஆகும் — பட்டியலில்
இல்லாத ஒவ்வொரு வழங்குநருக்குமான இயல்புநிலைப் பாதை byte-for-byte மாறாமல்
இருப்பதை உறுதிப்படுத்தவே இது உள்ளது.

ஒரு விதியின் `scope` (`model` / `provider` / `connection`) என்பது
`FULL_TEXT_RULE_PROVIDERS`-இலிருந்து தனியான opt-in ஆகும்:
`checkFallbackError` அதை `fallbackResult.ruleScope` ஆக மட்டுமே
வெளிப்படுத்துகிறது; மேலும் அதே கோப்பில் உள்ள
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` அனுமதிப்பட்டியலில் உள்ள வழங்குநர்களுக்கு
மட்டுமே downstream consumers அதை தகவல் label அல்லாத ஒன்றாகப் பின்பற்றுகின்றன
(`honorsRuleLockScope()` வழியாகக் கட்டுப்படுத்தப்படுகிறது — தற்போது
`"agentrouter"` மட்டும்). ஒரு வழங்குநர் அந்த அனுமதிப்பட்டியலில் சேர்ந்தவுடன்
`scope: "connection"` பொருத்தம் உண்மையில் என்ன செய்கிறது என்பதை அறிய மேலுள்ள
"மறுவடிவமைக்கப்பட்ட ஒதுக்கீட்டுப் பிழைகள்" பகுதியைப் பார்க்கவும்.

**#11104 — ஆபரேட்டர் அறிவிக்கும் விதிகள் இரண்டு அனுமதிப் பட்டியல்களையும் கடந்து செல்கின்றன.** இந்தக் கோப்பைத் திருத்தாமலேயே, ஓர் ஆபரேட்டர் இயக்க நேரத்தில் `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
வழியாக ஒவ்வொரு வழங்குநருக்குமான விதியை அறிவிக்க முடியும். உள்ளமைந்த பட்டியல் விதிகளின் **இயல்புநிலை** நடத்தையைப் பாதுகாப்பதற்காக உருவாக்கப்பட்ட
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` அனுமதிப் பட்டியல்களின் பின்னால் ஓர் ஆபரேட்டர் விதியை நுழைவுக் கட்டுப்பாட்டுக்கு உட்படுத்துவது,
அந்த விதியை அறிவிப்பதே ஆபரேட்டரின் வெளிப்படையான ஒப்புதல் என்பதால், ஏற்கனவே அங்கு பட்டியலிடப்பட்டுள்ள வழங்குநர்களைத் தவிர மற்ற அனைத்து வழங்குநர்களுக்கும்
அமைப்புகள் பொறிமுறையைச் செயலற்றதாக்கிவிடும். `resolveRuleMatchBody()` மற்றும் `honorsRuleLockScope()` இரண்டும் முதலில்
`hasOperatorRuleForProvider()`-ஐச் சரிபார்க்கின்றன: ஓர் ஆபரேட்டர் விதியைக் கொண்ட வழங்குநருக்கு,
அது ஏதேனும் ஓர் அனுமதிப் பட்டியலில் இடம்பெற்றுள்ளதா என்பதைப் பொருட்படுத்தாமல், மூலப் பிழை உரை கிடைப்பதுடன் அது அறிவித்துள்ள `scope`-உம் மதிக்கப்படும்.

**அறியப்பட்ட குறைபாடு — HTTP 400-க்கு `providerRuleRegistry` ஒருபோதும் பரிசீலிக்கப்படுவதில்லை.**
`checkFallbackError`-இன் `BAD_REQUEST` கிளை, நிலை 400-ஐ முழுமையாகத் தனது சொந்த வடிவமைப்பு வரிசைகள்
(`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` போன்ற `accountFallback.ts`-இல் உள்ளவை) வழியாக வகைப்படுத்தி,
அதற்கு மேலுள்ள `configuredRule`/`getProviderErrorRuleMatch` கிளையை அடைவதற்கு முன்பே திரும்புகிறது.
`status: 400` கொண்ட உள்ளமைந்த பட்டியல் விதி (அல்லது ஆபரேட்டர் விதி) தொடரியல் ரீதியாகச் செல்லுபடியாகும், ஆனால் அது ஒருபோதும் செயல்படாது.
இன்று எந்த நடப்பு விதியும் 400-ஐ இலக்காகக் கொள்ளவில்லை; எனவே உற்பத்திச் சூழலில் எதுவும் பாதிக்கப்படவில்லை — ஆனால் எதிர்கால 400 விதிக்கு முதலில் இந்தக் கிளையில் மாற்றம் தேவைப்படும்.
இது ஒரு விதியைச் சேர்ப்பதைவிடப் பெரிய மாற்றமாகும் (வடிவமைப்பு-வரிசை நடத்தையை ஏற்கனவே சார்ந்துள்ள ஒவ்வொரு வழங்குநருக்கும் 400-ஐ இது மறுவகைப்படுத்தும்);
மேலும், ஒற்றை வழங்குநருக்கான விதிச் சேர்ப்பின் வரம்பிற்கு இது அப்பாற்பட்டது.

### தவறான ஒதுக்கீட்டைத் தெரிவிக்கும் புதிய நுழைவாயிலைச் சேர்த்தல்

1. `statusRestatementRegistry`-இல்
   (`open-sse/config/upstreamStatusRestatement.ts`) ஒரு விதி வரிசையைப் பதிவுசெய்யவும். `textMarkers`-ஐ
   வழங்குநருக்கே உரியதாக வைத்திருக்கவும்; `CREDITS_EXHAUSTED_SIGNALS`
   (`open-sse/services/accountFallback.ts`) உடன் மோதும் பொதுவான ஆங்கிலச் சொற்றொடர்களை ஒருபோதும் மறுபயன்படுத்த வேண்டாம்.
2. சரியான பூட்டு வரம்பைத் தேர்ந்தெடுக்க, விருப்பத்திற்கேற்ப
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`)-இல் வகைப்பாட்டு விதிகளைப் பதிவுசெய்யவும்
   (கணக்கு முழுவதற்குமான ஒதுக்கீட்டுக்கு `connection`, ஒவ்வொரு மாதிரிக்குமான பிழைகளுக்கு `model`). முழுப் பிழை உரை தேவைப்படும் விதிகளைக் கொண்ட வழங்குநர்களுக்கு மட்டுமே இந்தப் படிநிலை உற்பத்திச் சூழலில் செயல்படும்
   (உடல் குறிப்பான்கள்): அதே கோப்பிலுள்ள `FULL_TEXT_RULE_PROVIDERS`-இல் வழங்குநர் id-ஐச் சேர்க்கவும் — இல்லையெனில்,
   `checkFallbackError` விதிக்கு கட்டமைக்கப்பட்ட `{code, type}` பிழையை மட்டுமே வழங்கும்; உடல்-உரை விதி நேரடிப் போக்குவரத்துடன் ஒருபோதும் பொருந்தாது.
   முழுக்க `status`/`headers` அடிப்படையில் பொருந்தும் விதிகளுக்கு (Opencode அல்லது Minimax விதிகளைப் போல) இந்த ஒப்புதல் தேவையில்லை.
   தனியாக, விதி `scope: "connection"` என அறிவித்து, வெறும் தகவல் குறிப்புக்குப் பதிலாக உண்மையான இணைப்பு-முழுமைக்குமான குளிர்வுக் காலம் மற்றும் அதே கோரிக்கைக்கான சேர்க்கை தவிர்ப்பே நோக்கமாக இருந்தால்,
   அதே கோப்பிலுள்ள `HONORS_RULE_LOCK_SCOPE_PROVIDERS`-இல் வழங்குநர் id-ஐச் சேர்க்கவும் — இதுவே
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) மற்றும்
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`) ஆகியவற்றில் `isAgentrouterConnectionQuotaScope()` பாணியிலான நுகர்வைக் கட்டுப்படுத்துகிறது; இது இல்லையெனில்,
   `scope` தொடர்ந்து `fallbackResult.ruleScope` வழியாகப் பாயும், ஆனால் எதுவும் அதன்படி செயல்படாது.
3. `tests/unit/upstream-status-restatement.test.ts`
   மற்றும் `tests/unit/agentrouter-error-rules.test.ts` ஆகியவற்றைப் பிரதிபலிக்கும் அலகுச் சோதனைகளைச் சேர்க்கவும்
   (not-permanent / not-creditsExhausted பாதுகாப்புச் சோதனைகள் உட்பட; மேலும் — வழங்குநருக்கு அனுமதிப் பட்டியல் தேவைப்பட்டால் —
   அந்த வழங்குநருக்கு மட்டுமே `resolveRuleMatchBody()` முழு உரையைத் திருப்பித் தருகிறது என்பதை உறுதிப்படுத்தும் சோதனையையும் சேர்க்கவும்).

`chatCore.ts`, `classifyError`, அல்லது combo-வில் எந்த மாற்றமும் தேவையில்லை.

#### வெளியேற்றத் தொகுதி அடிப்படையிலான பூட்டு (#10880)

`EGRESS_BUCKETED_LOCK_PROVIDERS`-இல் உள்ள வழங்குநர்கள் (opencode குடும்பம்) IP-தொகுதி அடிப்படையிலான மேல்நிலைச் சேவையாகக் கருதப்படுகின்றனர்
(opencode இலவச அடுக்கு கணக்கு-தொகுதி அடிப்படையிலானது அல்ல, IP-தொகுதி அடிப்படையிலானது — #9611-ஐப் பார்க்கவும்): `quota_exhausted`
**அல்லது** `rate_limit_exceeded` என வகைப்படுத்தப்பட்ட நிலை-429, சுழற்சி அவற்றை முயற்சிப்பதற்கு முன்பே, தோல்வியடைந்த இணைப்பின் கடைசியாக அறியப்பட்ட வெளியேற்ற IP-உடன் பொருந்தும்
அனுமதிப் பட்டியல் குடும்பத்தைச் சேர்ந்த ஒவ்வோர் இணைப்புக்கும் குளிர்வுக் காலத்தை அமல்படுத்தும்
— இதனால் உறுதியாகத் தோல்வியடையும் N-1 மேல்நிலை அழைப்புகள் தவிர்க்கப்படுகின்றன (#10460/#10525 போன்ற அதே வடிவம்).
`rate_limit_exceeded` திட்டமிட்டே சேர்க்கப்பட்டுள்ளது: `markAccountUnavailable`
பாதையில் opencode-க்கே உரிய விதிகள் ஒருபோதும் பொருந்துவதில்லை (`checkFallbackError`-க்கு headers/body எதுவும் வழங்கப்படுவதில்லை;
opencode, `FULL_TEXT_RULE_PROVIDERS`-இல் இல்லை). எனவே, சந்தா ஒதுக்கீட்டு உரையை ("monthly usage limit
reached") உடலில் கொண்ட 429, `status_429` விதியை அடைவதற்கு முன்பே, ஒதுக்கீட்டு-உரை மாற்றுப்பாதையால்
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; 1h குளிர்வுக் காலம்) `quota_exhausted` என வகைப்படுத்தப்படுகிறது — அதேவேளை, ஒதுக்கீட்டு உரையற்ற 429 (வெறும்
விகிதக் கட்டுப்பாடு) `status_429` விதி வழியாக `rate_limit_exceeded` என வகைப்படுத்தப்பட்டு,
IP குடும்பத்திற்குத் தொடர்ந்து குளிர்வுக் காலத்தை அமல்படுத்துகிறது. அனுமதிப் பட்டியலிலுள்ள வழங்குநருக்கு, IP-தொகுதி அடிப்படையிலான
விகித வரம்பு என்பது ஒதுக்கீடு தீர்ந்ததற்குச் சமமான அறிகுறியாகும். நேர்மையான வரம்புகள்:

- **முடிந்தவரையிலான முயற்சி**: இந்தப் பூட்டு, இணைப்பின் கடைசியாக அறியப்பட்ட `egress_ip`-ஐ
  `proxy_logs`-இலிருந்து கண்டறிகிறது (24h காலச்சாளரம், synchronous, cache இல்லை). Cold cache (egress
  IP ஒருபோதும் probe செய்யப்படவில்லை) அல்லது row இல்லாத நிலை → தோல்வியடைந்த இணைப்பு இன்னமும் இந்த
  branch மூலம் cooldown செய்யப்படும் (தற்போது போலவே பதிவுசெய்யப்படும்); எந்த sibling-உம் மட்டும் பூட்டப்படாது.
- **ஒருபோதும் terminal அல்ல**: cooldown என்பது புதுப்பிக்கப்படும் quota காலச்சாளரம்
  (`testStatus: "unavailable"`); IP-நிலை signal-இலிருந்து permanent state ஒருபோதும் பெறப்படாது.
  `disableCooling` இணைப்புகள் இந்த branch-ஐ முழுமையாகத் தவிர்க்கின்றன.
- **Allowlist செய்யப்பட்ட family-க்கான lock granularity மாறுகிறது**: இது வெறும் sibling optimization
  அல்ல; scope மாற்றம். opencode என்பது ஒரு `passthroughModels` provider, எனவே இந்த branch-க்கு முன்பு
  429 ஒன்று per-MODEL lockout-ஐ உருவாக்கியது; இப்போது அது connection cooldown-ஐ உருவாக்குகிறது —
  sibling ஏதுமின்றி ஒரே ஒரு connection-ஐ இயக்கும் operator-க்கும் இது பொருந்தும். opencode rule
  table ஏற்கெனவே சரியானது என்று அறிவிக்கும் granularity இதுதான் (`scope: "connection"`,
  `providerErrorRules.ts`); opencode, `HONORS_RULE_LOCK_SCOPE_PROVIDERS`-இல் இல்லாததால் இதுவரை
  அது பின்பற்றப்படவில்லை. connection-scoped agentrouter branch-ஐப் பிரதிபலிக்கும் வகையில், இந்த branch
  தோல்வியடைந்த connection-ன் cooldown + `backoffLevel`-ஐத் தானே எழுதி, பின்னர் return செய்கிறது —
  கீழுள்ள per-model block மற்றும் generic path ஒருபோதும் அடையப்படுவதில்லை.
- **Combo சேர்க்கப்பட்டுள்ளது**: agentrouter branch போலவே, combo caller ஒன்று 429-க்கு பயன்படுத்தும்
  `persistUnavailableState`/`isCombo` downgrade-ஐ இந்த scope திட்டமிட்டே புறக்கணிக்கிறது. per-model
  lockout என்பது இந்த scope-இன் பலவீனமான வடிவம் அல்ல; அது தவறான unit: exhausted IP குறித்து அது
  எதுவும் கூறுவதில்லை, எனவே combo rotation ஒவ்வொரு sibling-க்கும் உறுதியாகத் தோல்வியடையும் ஒரு
  call-ஐத் தொடர்ந்து வீணாக்கும்.
- **Sibling பாதுகாப்பு**: ஏற்கெனவே terminal நிலையில் உள்ள (banned/credits_exhausted) அல்லது ஏற்கெனவே
  நீண்ட cooldown-இல் உள்ள sibling ஒருபோதும் overwrite செய்யப்படாது.
- **பிரத்தியேக allowlist**: `EGRESS_BUCKETED_LOCK_PROVIDERS`-ஐ விரிவுபடுத்துவது வெளிப்படையான owner
  முடிவாகும்; generic wiring இல்லை (pattern #10334/#10419). sibling query, அதே allowlist-ஐ SQL
  literal ஆக மீண்டும் எழுதாமல் bind செய்கிறது; எனவே அதை விரிவுபடுத்துவது one-line change ஆகவே இருக்கும்.
- **Egress IP rotation, இரு திசைகளிலும்**: lookup காலச்சாளரம் (24h), egress-IP cache TTL-ஐவிட
  (5 min) மிகவும் அகலமானது; எனவே "கடைசியாக அறியப்பட்ட IP" என்பது வரலாறு, தற்போதைய நிலை அல்ல.
  ஒரு connection-ன் proxy அந்தக் காலச்சாளரத்திற்குள் rotate ஆகியிருந்தால், உண்மையில் பகிரப்பட்ட IP-ஐ
  lock **தவறவிடலாம்** (பதிவுசெய்யப்பட்ட IP என்பது புதிய, exhausted ஆகாத IP) — அதேபோல் exhausted
  IP-இலிருந்து அதன் proxy பின்னர் rotate ஆகியிருந்த sibling ஒன்றை **cooldown செய்யக்கூடும்**.
  இரண்டாவது நிலை அந்த sibling-க்கு ஒரு cooldown காலச்சாளரத்தைச் செலவாக்கும்; இவை இரண்டும் வரலாற்றை
  அடிப்படையாகக் கொண்ட lookup-இன் ஏற்றுக்கொள்ளப்பட்ட best-effort வரம்புகள்.
- **செலவு**: `proxy_logs` மீது இரண்டு வரம்புள்ள scans (`idx_pl_timestamp` வழியாக
  window-filtered), 429 நிகழ்வுகளின்போது மட்டும். புதிய index இல்லை (migration 134
  YAGNI). மிதமான அளவுடைய உண்மையான traffic DB copy ஒன்றில் அளவிடப்பட்டது; high-throughput instance
  ஒன்று அதே காலச்சாளரத்தில் விகிதாசாரமாக அதிக rows-ஐ வைத்திருக்கும்.

---

## பிற மீள்திறன் அம்சங்கள்

- **19 வழித்தடத் தேர்வு உத்திகள்** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — [AUTO-COMBO.md](../routing/AUTO-COMBO.md)-ஐப் பார்க்கவும்.
- **மீட்டமைப்பை உணரும் வழித்தடத் தேர்வு** (v3.8.0) — ஒதுக்கீட்டு வரம்பு மீட்டமைக்கப்படும் நேரத்தின் அடிப்படையில் இணைப்புகளுக்கு முன்னுரிமை அளிக்கிறது.
- **பின்னணிப் பயன்முறை தரக்குறைப்பு** — Responses API `background: true`, எச்சரிக்கையுடன் ஒத்திசைவு பயன்முறைக்குத் தரக்குறைக்கப்படுகிறது.
- **மாறும் கருவி வரம்பைக் கண்டறிதல்** — கருவிகளின் எண்ணிக்கை வரம்பை எட்டும்போது வழங்குநர்களிடமிருந்து பின்வாங்குகிறது.
- **அவசரநிலை மாற்றுவழி** — `OMNIROUTE_EMERGENCY_FALLBACK` மூலம் கட்டுப்படுத்தப்படுகிறது; மறுதொடக்கம் செய்யாமல் Feature Flags பக்கத்திலிருந்து இயக்குநர்கள் இதை மேலெழுதலாம்.

---

## பிழைத்திருத்தம்

- எடையிடப்பட்ட combo பதில்கள் `503 all_targets_cooling_down` (`Retry-After` அமைக்கப்பட்டிருக்கும், மேலும் `diagnostics.excluded` ஒவ்வொரு இலக்கையும் `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable` உடன் பட்டியலிடும்) → pool உள்ளமைக்கப்பட்டு இணைக்கப்பட்டுள்ளது; ஒவ்வொரு இலக்கும் resilience timer ஒன்றால் மட்டும் விலக்கப்பட்டுள்ளது; `[COMBO] Weighted selection: every target excluded before dispatch — …` எச்சரிக்கை காரணங்களையும் மீதமுள்ள விநாடிகளையும் குறிப்பிடுகிறது. அதே combo-இலிருந்து வரும் `404 no_executable_targets` என்பது எந்த resilience timer-உம் சம்பந்தப்படவில்லை என்பதைக் குறிக்கிறது (இயக்குவதற்கு எதுவும் இல்லை அல்லது ஒவ்வொரு account-உம் availability probe-இல் தோல்வியடைந்தது). `targetResolution.ts`-இல் சேகரிக்கப்பட்ட விலக்கல்களிலிருந்து `open-sse/services/combo/pinRecovery.ts`-இல் உருவாக்கப்பட்டுள்ளது.
- ஒரு provider-க்கான அனைத்து keys-உம் தவிர்க்கப்பட்டால் → circuit breaker நிலை மற்றும் ஒவ்வொரு connection-இன் `rateLimitedUntil`/`testStatus` ஆகிய இரண்டையும் சரிபார்க்கவும்.
- reset window-க்குப் பிறகும் provider நிரந்தரமாக விலக்கப்பட்டிருந்தால் → `getStatus()`/`canExecute()` என்பவற்றுக்குப் பதிலாக raw `state`-ஐ வாசிக்கும் code-ஐச் சரிபார்க்கவும்.
- ஒரு key தோல்வியடைந்தாலும் மற்றவை செயல்பட வேண்டும் → circuit breaker-ஐ விட connection cooldown-ஐ முன்னுரிமைப்படுத்தவும்.
- ஒரே ஒரு model மட்டும் தோல்வியடைந்தால் → connection cooldown-ஐ விட model lockout-ஐ முன்னுரிமைப்படுத்தவும்.
- நிலை தானாக மீள வேண்டும், ஆனால் மீளவில்லை என்றால் → எதிர்கால timestamp மற்றும் காலாவதியான நிலையைப் புதுப்பிக்கும் read path உள்ளதா எனச் சரிபார்க்கவும். நிரந்தர statuses-க்கு கைமுறை மாற்றங்கள் தேவை.

---

## TLS கைரேகையிடல் & மறைமுகத்தன்மை

வழங்குநருக்கே உரிய மறைமுகத்தன்மை (JA3/JA4, CCH, மறைப்பாக்கம்) தனியாக ஆவணப்படுத்தப்பட்டுள்ளது — `docs/security/STEALTH_GUIDE.md`-ஐப் பார்க்கவும் (git; `/docs`-க்குள் தொகுக்கப்படவில்லை).

---

## மீள்திறன் சோதனை (கட்டம் 8 · தொகுதி C)

மீள்திறன் தர்க்கத்திற்கான அலகுச் சோதனைகளுக்கு அப்பால், மூன்று சோதனைகள் உண்மையான அழுத்தம்/தோல்விச் சூழல்களில் இயக்கநேரத்தைச் சோதிக்கின்றன (அனைத்தும் ஒருங்கிணைப்பு/இரவுநேரச் சோதனைகள் — எதுவும் PR-களைத் தடுக்காது):

| சோதனை            | சோதிக்கப்படுவது                                                                                                                                                                                                       | இயக்குதல்                                  |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| குழப்பம்         | போலியான upstream node உண்மையான தாமதம்/reset/timeout/503 ஆகியவற்றை உட்செலுத்துகிறது; சுற்றுத் துண்டிப்பான் திறந்து/மீள்வதையும், `checkFallbackError` 503-ஐ மீளக்கூடிய மாற்றுவழியாக வகைப்படுத்துவதையும் சரிபார்க்கிறது. | `RUN_CHAOS_INT=1 npm run test:chaos`       |
| Heap வளர்ச்சி    | `--expose-gc`-இன் கீழ் ஒவ்வொரு `createSSEStream`-க்கும் ~500 ஸ்ட்ரீம்கள்; heap உச்சவரம்பைத் தாண்டி வளர்ந்தால் தோல்வியடைகிறது (OOM பாதுகாப்பு #3069).                                                                  | `npm run test:heap`                        |
| k6 நீடித்த சோதனை | `/api/monitoring/health` மீது தொடர்ச்சியான சுமை; p95/பிழை வரம்புகள்.                                                                                                                                                  | `k6 run tests/load/k6-soak.js` (இரவுநேரம்) |

`.github/workflows/nightly-resilience.yml` (cron + dispatch) மூலம் ஒருங்கிணைக்கப்படுகிறது. இயல்புநிலை
`test:integration`-இல், chaos மற்றும் heap ஆகியவை (`RUN_CHAOS_INT`/`--expose-gc` இல்லாமல்) தாமாகவே தவிர்க்கப்படுகின்றன.

---

## மேலும் காண்க

- [கட்டமைப்பு வழிகாட்டி](./ARCHITECTURE.md) — கணினிக் கட்டமைப்பும் உள் செயல்பாடுகளும்
- [பயனர் வழிகாட்டி](../guides/USER_GUIDE.md) — வழங்குநர்கள், சேர்க்கைகள், CLI ஒருங்கிணைப்பு
- [தானியங்கு-சேர்க்கை இயந்திரம்](../routing/AUTO-COMBO.md) — 16-காரணி மதிப்பீடு, பயன்முறைத் தொகுப்புகள்
