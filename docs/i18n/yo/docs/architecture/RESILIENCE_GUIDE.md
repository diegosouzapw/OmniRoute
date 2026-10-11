# Resilience Guide (Yorùbá)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute ní àwọn ọ̀nà ìfaradà mẹ́ta tí ó yàtọ̀ ṣùgbọ́n tí wọ́n ní ìbáṣepọ̀. Ọ̀kọ̀ọ̀kan ní ààlà àti ète tirẹ̀. Má ṣe da wọ́n pọ̀ nígbà tí o bá ń ṣàtúnṣe ìṣòro ìhùwàsí ìdarí-ọ̀nà.

![àwòrán ìfaradà alápele mẹ́ta](../diagrams/exported/resilience-3layers.svg)

> Orísun: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Olùdáwọ́lé Àyíká Olùpèsè

**Ààlà:** gbogbo olùpèsè (fún àpẹẹrẹ, `glm`, `openai`, `anthropic`).

**Ète:** dá fífi ìrìnnà ránṣẹ́ sí olùpèsè kan tí ó ń kùnà léraléra ní ipele upstream/iṣẹ́ dúró.

**Ìmúṣẹ:**

- Kíláàsì pàtàkì: `src/shared/utils/circuitBreaker.ts`
- Ìsopọ̀: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API ipò: `GET /api/monitoring/health`
- API àtúntò: `POST /api/resilience/reset`
- Àwọn wrapper: `open-sse/services/accountFallback.ts`
- Tábìlì DB: `domain_circuit_breakers`

**Àwọn ipò:**

- `CLOSED` — ìrìnnà deede ní àṣẹ
- `DEGRADED` — ìrìnnà ṣì ní àṣẹ, ṣùgbọ́n àwọn ìkùnà olùpèsè tí ó pọ̀ sí i ni a ń tọ́pa
- `OPEN` — a ti dí olùpèsè náà fún ìgbà díẹ̀; ìdarí-ọ̀nà combo máa fo kọjá rẹ̀
- `HALF_OPEN` — àkókò ìdádúró àtúntò ti parí; ìbéèrè àyẹ̀wò ní àṣẹ

**Àwọn iye àkọ́kọ́ tí a lè ṣètò (`open-sse/config/constants.ts`, tí a ṣí síta nínú Dashboard → Settings → Resilience):**

| Kíláàsì | Di aláìlágbára ní | Ṣí ní    | Àkókò ìdádúró àtúntò |
| ------- | ----------------- | -------- | -------------------- |
| OAuth   | ìkùnà 5           | ìkùnà 8  | 60s                  |
| API-key | ìkùnà 7           | ìkùnà 12 | 30s                  |
| Agbègbè | ìṣirò láti inú rẹ̀ | ìkùnà 2  | 15s                  |

`degradationThreshold` ń darí ìgbà tí olùpèsè kan yóò wọ `DEGRADED`; `failureThreshold` ń darí ìgbà tí yóò ṣí tí a ó sì fo kọjá rẹ̀. Àwọn prófáìlì olùpèsè agbègbè kò tíì hàn lójú ojú-ìwé àwọn ètò Resilience.

**Àwọn kóòdù ìdásẹ́:** àwọn ipò ipele olùpèsè `[408, 500, 502, 503, 504]` nìkan. Má ṣe dá a ṣiṣẹ́ fún àwọn àṣìṣe ipele àkọọ́lẹ̀ (ọ̀pọ̀ jù lọ 401/403/429 — àwọn wọ̀nyẹn jẹ́ ti cooldown tàbí lockout).

**Ìmúpadàbọ̀ ọ̀lẹ:** nígbà tí `OPEN` bá parí, `getStatus()`, `canExecute()`, `getRetryAfterMs()` máa sọ ipò di tuntun sí `HALF_OPEN`. Kò nílò aago abẹ́lẹ̀.

---

### Cooldown Olùpèsè àgbáyé tí a yàn láti lo (ẹnu-ọ̀nà fèrèsé)

Pele kẹrin, tí a **yàn láti lo** (`PROVIDER_COOLDOWN_ENABLED`, tí ó jẹ́ **pípa** ní àkọ́kọ́), ń tọ́jú
ìrántí àwọn olùpèsè tí ń kùnà láàárín àwọn ìbéèrè nínú
`open-sse/services/providerCooldownTracker.ts`, èyí tí ìyanju ibi-afẹ́ combo
ń ṣàyẹ̀wò rẹ̀ kí àwọn ìbéèrè combo tí ó tẹ̀ lé ara wọn má bàa tún rìn kọjá olùpèsè kan tí ó ṣẹ̀ṣẹ̀
kùnà. Àwọn àkọsílẹ̀ ipele olùpèsè ń tẹ̀ lé ẹnu-ọ̀nà fèrèsé `PROVIDER_PROFILES`:

| Prófáìlì | ń dá ṣiṣẹ́ lẹ́yìn (`providerFailureThreshold`) | láàárín (`providerFailureWindowMs`) | ń tutu fún (`providerCooldownMs`) |
| -------- | -------------------------------------------: | ----------------------------------: | --------------------------------: |
| OAuth    |                                         `10` |                             `15min` |                            `5min` |
| API key  |                                         `15` |                             `30min` |                           `10min` |

Ní ìsàlẹ̀ ààlà náà, a **kò** ka olùpèsè náà sí ẹni tí ó ń tutu; àṣeyọrí kan máa pa
fèrèsé náà rẹ́. Àwọn àkọsílẹ̀ ipele àsopọ̀ (`provider:connectionId`) ń pa
ìpadàsẹ́yìn onílọ́po `minRetryCooldownMs → maxRetryCooldownMs` mọ́ dípò èyí. Àwọn ìkọlórí:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Olùṣọ́ ìdènà ìfàsẹ́yìn: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Àkókò Ìsinmi Asopọ̀

**Ìwọ̀n:** asopọ̀/àkọọ́lẹ̀/kókó olùpèsè kan ṣoṣo.

**Ète:** foju kọ kókó kan tí kò ṣiṣẹ́ dáadáa nígbà tí àwọn asopọ̀ mìíràn fún olùpèsè kan náà ń bá a lọ láti ṣiṣẹ́.

**Ìmúlò:**

- Sàmì sí i gẹ́gẹ́ bí èyí tí kò sí fún lílò: `src/sse/services/auth.ts::markAccountUnavailable()`
- Yíyan: `getProviderCredentials*` nínú fáìlì kan náà
- Ìṣirò àkókò ìsinmi: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Àwọn ààtò: `src/lib/resilience/settings.ts`

**Àwọn ààyè fún asopọ̀ kọ̀ọ̀kan:**

- `rateLimitedUntil` — àmì-àkókò títí tí àkókò ìsinmi yóò fi parí
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — òǹkà fún ìdádúró tó ń pọ̀ ní ìlọ́po méjì

**Àwọn àkókò ìsinmi àìpé:**

- Ìpìlẹ̀ OAuth: 5s
- Ìpìlẹ̀ API-key: 3s
- API-key 429: ó máa ń yan `Retry-After`/àwọn àkọlé ìtúnṣètò/ọ̀rọ̀ ìtúnṣètò tí a lè túmọ̀ láti ọ̀dọ̀ iṣẹ́ òkè
- Ìdádúró: `baseCooldownMs * 2 ** failureIndex`

**Ààbò lódì sí ìkójọpọ̀ ìbéèrè lẹ́ẹ̀kan náà:** ó dènà àwọn ìkùnà tó ṣẹlẹ̀ lẹ́ẹ̀kan náà láti fa àkókò ìsinmi gùn jù tàbí láti fi kún `backoffLevel` lẹ́ẹ̀mejì.

**Dídúró akoonu ṣiṣan kì í fi àkọọ́lẹ̀ náà sínú àkókò ìsinmi.** Nígbà tí olùṣọ́ dídúró-akoonu
(`open-sse/utils/streamHandler.ts`) bá jáwọ́ lórí ṣiṣan kan tí kò fi àbájáde awoṣe kankan ránṣẹ́ láàárín
àkókò, `markAccountUnavailable()` máa ń ṣe àkọsílẹ̀ àṣìṣe náà lórí asopọ̀ ṣùgbọ́n kì í ṣètò
àkókò ìsinmi: dídúró náà jẹ́ ti ìbéèrè yẹn, ó sì sábà máa ń jẹ́ ìgbà ìrònú gígùn tí kò tíì ní
àbájáde. Àwọn olùdarí lè yàn láti tún un ṣiṣẹ́ pẹ̀lú `resilienceSettings.streamStallCooldown.enabled`
(àìpé `false`).

**Àwọn férémù ìrònú máa ń tún ìnáwó àkókò dídúró-akoonu bẹ̀rẹ̀.** Awoṣe ìrònú kan lè ronú fún
ọ̀pọ̀ ìṣẹ́jú kí àmì tó ṣeé rí àkọ́kọ́ rẹ̀ tó dé: Claude máa ń ṣàn àwọn férémù `thinking_delta` tí
ọ̀rọ̀ ìrònú wọn lè ṣófo, àti Responses API máa ń ṣàn ohun ìrònú kan lẹ́yìn
òmíràn. `isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) máa ń dá
àwọn férémù wọ̀nyí mọ̀, olùṣọ́ náà sì máa ń tún ìnáwó àkókò rẹ̀ bẹ̀rẹ̀ lórí ọ̀kọ̀ọ̀kan dípò kíkansẹ́
ìyípo náà. Síbẹ̀, wọn kì í ṣe àbájáde awoṣe, nítorí náà ìyípo tí ó parí pẹ̀lú ìrònú nìkan ṣì máa ń jẹ́
ìjábọ̀ gẹ́gẹ́ bí èyí tó ṣófo, ìyípo tí ó sì dá ìrònú dúró tí ó sì ń fi àwọn ìlù-ọkàn nìkan ránṣẹ́ yóò ṣì mú
olùṣọ́ náà ṣiṣẹ́.

Àwọn férémù alákopọ̀ méjì `reasoningContentEvent` ti Kiro tí ó ní ìbuwọ́lù tí kò ṣófo máa ń pa
ìṣe ìrònú yìí mọ́ nípasẹ̀ olùṣiṣẹ́ gẹ́gẹ́ bí delta `reasoning_content` tó ṣófo. A kì í
fi ìbuwọ́lù náà ránṣẹ́ síwájú. Metadata, àwọn férémù tí kò pé àti àwọn ìbuwọ́lù tó ṣófo kì í tún
ìnáwó akoonu bẹ̀rẹ̀; àkókò-ipari ṣiṣan tó ń ṣiṣẹ́ olómìnira àti ìfagilé oníbàárà ṣì
wúlò (`open-sse/executors/kiro/reasoning.ts`).

**Àwọn ipò ìkẹyìn (KÌ Í ṣe àkókò ìsinmi):**

- `banned` — a máa ń ṣètò rẹ̀ nípasẹ̀ ìṣàwárí ọ̀rọ̀ ìfòfindè / ìfòfindè àkọọ́lẹ̀ (wo [BAN_DETECTION](../security/BAN_DETECTION.md)), àti nípasẹ̀ ìkọ̀sílẹ̀ ìbéèrè kọ̀ọ̀kan lẹ́ẹ̀mẹta léraléra láti ọ̀dọ̀ iṣẹ́ òkè (`request_rejected`, àpẹẹrẹ Anthropic OAuth 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`); ìkọ̀sílẹ̀ ẹyọ kan máa ń fi asopọ̀ náà sínú àkókò ìsinmi nìkan
- `expired` (ó máa ń yí padà sí ipò ìkẹyìn lẹ́yìn àwọn àtúndánwò tó ní ààlà — `EXPIRED_RETRY_MAX = 3` pẹ̀lú ìdádúró tó ń pọ̀ ní ìlọ́po méjì — kí àwọn àṣìṣe OAuth fún ìgbà díẹ̀ lè tún ara wọn ṣe kí àkọọ́lẹ̀ náà tó di aláìṣiṣẹ́ pátápátá)
- `credits_exhausted`

Àwọn wọ̀nyí máa ń wà títí tí àwọn ẹ̀rí ìdánimọ̀ yóò fi yí padà tàbí tí olùdarí yóò fi tún wọn ṣètò. Má ṣe fi ipò àkókò ìsinmi fún ìgbà díẹ̀ kọ lórí àwọn ipò ìkẹyìn.

**Ìmúpadàbọ̀ díẹ̀díẹ̀:** nígbà tí `rateLimitedUntil` bá ti kọjá, asopọ̀ náà tún lè yẹ fún lílò. Nígbà tí lílò bá ṣàṣeyọrí, `clearAccountError()` máa ń pa gbogbo àwọn ààyè àṣìṣe rẹ́.

### Ògiri lílò Claude OAuth: ipa-ọ̀nà aláṣàyàn-kékeré + ìtúnṣètò ààlà sáà

**Ìwọ̀n:** asopọ̀ ìforúkọsílẹ̀ Claude (OAuth) kan. Àwọn ẹ̀ya méjèèjì jẹ́ **èyí tí a gbọ́dọ̀ yàn fún
asopọ̀ kọ̀ọ̀kan** (Ṣàtúnṣe asopọ̀ → abala Claude → `lowPriorityMode` / `autoLimitReset` nínú
`providerSpecificData`, àwọn méjèèjì kò ṣiṣẹ́ ní àìpé) wọ́n sì fara wé àwọn àṣẹ `/low-priority` àti
`/limit-reset` ti Claude Code (àdéhùn waya tí a gba láti Claude Code 2.1.263).

**Ìmúlò:**

- Ẹ̀rọ-ipò + ìsọ̀rí ìdáhùn: `open-sse/services/claudeLowPriority.ts`
- Oníbàárà ipò/ìbéèrè ìtúnṣètò: `open-sse/services/claudeLimitReset.ts`
- Ìkọ́ olùṣiṣẹ́ (fífún àkọlé + àtúndánwò àkọọ́lẹ̀ kan náà): `open-sse/executors/base.ts::execute()`
- Ìfipamọ́ ìyàn: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Ohun tó máa ń mú un ṣiṣẹ́:** ògiri lílò wákàtí 5 — `429` kan tí àwọn àkọlé rẹ̀ ní
`anthropic-ratelimit-unified-status: rejected` àti, nígbà tí àkọọ́lẹ̀ bá yẹ,
`anthropic-ratelimit-unified-slow-offer: treatment`. A kì í fi ohunkóhun ránṣẹ́ ṣáájú 429 ògiri àkọ́kọ́
yẹn; 429 ìbúrẹ́sẹ̀ kan tí kò ní àwọn àkọlé ìṣọ̀kan máa ń gba ipa-ọ̀nà àkókò ìsinmi déédéé.

**Ipa-ọ̀nà aláṣàyàn-kékeré** (`lowPriorityMode`):

- Lórí ògiri 429, olùṣiṣẹ́ gba ìfilọ́ náà, ó sì tún gbìyànjú àkọọ́lẹ̀ **kan náà**
  lẹ́sẹ̀kẹsẹ̀ pẹ̀lú `anthropic-usage-limit: slow`; ọ̀nà náà máa ń ṣiṣẹ́ títí di
  `anthropic-ratelimit-unified-reset` tí a kéde (+60s àkókò àfikún), gbogbo ìbéèrè
  nínú àkókò yẹn sì máa ń ní header náà. 429 tí a dá dúró kò dé `handleChatCore`,
  nítorí náà a **kò** fi ìsopọ̀ náà sínú cooldown, a kò sì yí i kúrò.
- `anthropic-ratelimit-unified-slow-status` lórí àwọn èsì tó tẹ̀lé e: `active` / `not_needed`
  máa ń jẹ́ kí ọ̀nà náà wà; `slot_busy` (429) tàbí `529` máa ń dúró fún
  `anthropic-ratelimit-unified-slow-retry-after` ti server náà (àìyípadà jẹ́ 20s,
  ààlà 5–600s, ±30% jitter), wọ́n á sì tún gbìyànjú, lábẹ́ ààlà
  `anthropic-ratelimit-unified-slow-max-wait` (àìyípadà jẹ́ 20 min, ààlà
  1 min–6 h) — lẹ́yìn ìyẹn, ọ̀nà náà máa parí, àkókò ìsinmi ìṣẹ́jú mẹ́wàá yóò sì
  dí ìtẹ́wọ́gbà tuntun. Àkókò ìdúró náà tún ní ààlà gẹ́gẹ́ bí iye tó kù nínú
  upstream-start timeout ti ìbéèrè náà fúnra rẹ̀ (`resolveFetchStartTimeout`,
  10 min gẹ́gẹ́ bí àìyípadà), pẹ̀lú yíyọ àlàfo 5 s kúrò: láìsí ààlà yẹn,
  max-wait àìyípadà 20 min yóò kọjá iye ìgbésí-ayé ìbéèrè náà, ìsun náà yóò sì
  dáwọ́ dúró ní àárín ìdúró, tí yóò fi `TimeoutError` hàn dípò ìparí `max_wait`
  tó rọrùn + àkókò ìsinmi.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, yíyípadà window 5h, tàbí
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (èyí tó máa parí rẹ̀
  gẹ́gẹ́ bí `extra_usage` lórí ipò èyíkéyìí, nítorí overage tí a sanwó fún ti ń bo
  ògiri náà báyìí) máa parí ọ̀nà náà; èsì náà yóò sì lọ sí ọ̀nà cooldown déédéé.
  `budget_exhausted` ni a máa rántí títí di àtúntò budget tí a kéde (≤ 8 days).
- Àyẹ̀wò ògiri náà máa ń ṣiṣẹ́ lẹ́yìn àwọn ìtún-gbìyànjú inú ìgbìyànjú tí 400 ń
  mú ṣiṣẹ́ fún executor náà fúnra rẹ̀ (àtúnṣe context, àwọn ààlà thinking/effort,
  param auto-learn), nítorí náà, 429 ògiri tí ó ṣẹ̀ṣẹ̀ hàn lórí ọ̀kan nínú àwọn
  ìtún-gbìyànjú wọ̀nyẹn ni a ṣì máa dá dúró dípò kó dé ọ̀nà cooldown.
- State wà nínú memory fún ìsopọ̀ kọ̀ọ̀kan (ìtunbẹ̀rẹ̀ máa ń ná àfikún 429 ògiri
  kan láti tún gba).

**Àtúntò ààlà session** (`autoLimitReset`, a máa kọ́kọ́ gbìyànjú rẹ̀ ṣáájú ọ̀nà náà nígbà tí àwọn méjèèjì bá wà ní títàn):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → block `juniper_tide`;
  nígbà tí `arm: "reset"` àti `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` pẹ̀lú
  `{ "program": "juniper_tide" }` (UUID organization láti
  `providerSpecificData.organizationUUID`, bootstrap gẹ́gẹ́ bí fallback).
- `result: reset|not_limited` → a tún gbìyànjú ìbéèrè náà ní iyára kíkún (kò sí slow header).
  `already_used` / `not_offered` máa ń fi `next_available_at` sí ìrántí (àìyípadà jẹ́
  ọ̀sẹ̀ kan); ìkùnà èyíkéyìí máa ń ṣe backoff fún ìṣẹ́jú 15. Àtúntò náà máa ń ṣẹlẹ̀
  lẹ́ẹ̀kan lọ́sẹ̀, ó sì ṣì ka mọ́ ààlà ọ̀sẹ̀.

Àwọn olùṣọ́ regression: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Ìbámu session (#7274)

**Ìwọ̀n:** session client kan (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` header) tí a so mọ́ ìsopọ̀ kan, fún provider **èyíkéyìí**.

**Ète:** jẹ́ kí agent oní-turn púpọ̀ (Claude Code, aider, àwọn agent àdáni) wà lórí
àkọọ́lẹ̀ kan náà káàkiri àwọn ìbéèrè, láti dín ìpàdánù context láàárín àwọn àkọọ́lẹ̀
àti àwọn 429 cold-start tó ń tún ara wọn ṣe kù lórí àwọn provider tí wọ́n ní state
session fún àkọọ́lẹ̀ kọ̀ọ̀kan.

**Ìmúṣẹ:**

- Ìpinnu TTL: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Yíyan/ṣíṣẹ̀dá pin: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Yíyọ header jáde (gbogbogbò, provider èyíkéyìí): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Tábìlì pin tí a tọ́jú: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Ètò: `sessionAffinityTtlMs` (TTL àgbáyé ní ms, `0` máa ń pa á) — `src/lib/db/settings.ts`.
  A tún orúkọ rẹ̀ sọ láti `codexSessionAffinityTtlMs` tó jẹ́ ti Codex nìkan nípasẹ̀ migration
  `124_generic_session_affinity_ttl.sql`, èyí tó gbé Codex TTL èyíkéyìí tí a ti ṣètò
  tẹ́lẹ̀ lọ gẹ́gẹ́ bí àìyípadà tuntun.

Ṣáájú #7274, `resolveSessionAffinityTtlMs()` máa ń dáwọ́ dúró sí `0` fún gbogbo provider
yàtọ̀ sí `codex`, nítorí náà ètò TTL (àti àwọn session header) kò ní ipa níbòmíràn,
bó tilẹ̀ jẹ́ pé ọ̀nà pinning àti yíyọ header jáde ti jẹ́ aláìdá lórí provider tẹ́lẹ̀.
Àtúnṣe náà yọ early-return yẹn kúrò; TTL ti ń kan gbogbo provider bákan náà ní kété tí
a bá ṣètò rẹ̀ ní àgbáyé sí iye tó ga ju `0` lọ.

A kì í forward àwọn session-affinity header mẹ́tẹ̀ẹ̀ta náà sí upstream láé — àwọn
executor máa ń kọ upstream header tiwọn láti ìbẹ̀rẹ̀ dípò kí wọ́n gba client header
kọjá, nítorí náà èyí dúró gẹ́gẹ́ bí correlation id abẹ́nú nìkan.

### Àwọn lease ìsopọ̀ session tí a ṣàkóso ní ọ̀nà àdádó

**Ìwọ̀n:** HTTP client/session kan ṣoṣo tí a ṣàkóso, tí ó ń ṣiṣẹ́, ló ni ìsopọ̀ OmniRoute
kan tí ó yẹ.

**Ète:** pèsè ìní ìsopọ̀ àdádó tó dúró ṣinṣin fún àwọn client tí wọ́n nílò ààlà routing
tó le káàkiri àwọn ìbéèrè. Èyí yàtọ̀ sí ìbámu session, èyí tó jẹ́ ààyò ìtẹ̀síwájú
rírọ̀: lease àdádó máa ń tọ́jú state lifecycle sínú SQLite, ó ń fipá mú àìlẹ́ẹ̀mejì
active-owner àti active-connection ní àgbáyé, ó sì kọ generation àtijọ́ ṣáájú
provider dispatch.

Ẹ̀ya náà jẹ́ opt-in fún API key kọ̀ọ̀kan. Managed key gbọ́dọ̀ ní scope `lease:exclusive`
àti àtòjọ `allowedConnections` tí a sọ ní kedere tí kò ṣófo. HTTP client èyíkéyìí lè
lo lifecycle endpoint; a kò nílò orúkọ client, user-agent, provider, OAuth method,
tàbí model. Lease náà ni ìsopọ̀, kì í ṣe model, nítorí náà yíyí model padà máa ń pa
binding náà mọ́ níwọ̀n ìgbà tí ìsopọ̀ náà ṣì yẹ gẹ́gẹ́ bí ìṣe déédéé. Àwọn òfin model,
quota, health, cooldown, àti allowlist déédéé ṣì jẹ́ aláṣẹ, wọ́n sì lè yí generation
kan náà lọ sí ìsopọ̀ òmìnira míràn tó yẹ.

Ìgbésí-ayé náà jẹ́ `POST /api/v1/session-leases` pẹ̀lú àwọn ìṣe JSON `acquire`, `renew`, àti `release`.
Àwọn ìbéèrè ìfàsẹ́yìn tí a ń ṣàkóso máa ń fi iye `X-OmniRoute-Lease-Owner` tí kò ṣeé túmọ̀ hàn àti
`X-OmniRoute-Lease-Generation` gangan. Olóhun náà máa ń lo `vlo_` tí àwọn àmì base64url 43 tẹ̀ lé; hash
SHA-256 rẹ̀ nìkan ni a ń tọ́jú. Gbogbo ọgbà ìdènà ìfiránṣẹ́ ìkẹyìn tún máa ń so ID kọ́kọ́rọ́ API tí a ti jẹ́rìí sí àti
ID ìsopọ̀ tó ń ṣiṣẹ́ mọ́ ọn. A máa ń yọ àwọn àkọlé ìṣàkóso lease kúrò nínú àwọn àkọsílẹ̀, àwọn àwòrán-ipò ìbéèrè tí a tọ́jú, àti
àwọn àkọlé olùṣiṣẹ́ ìpele òkè.

Tí ìdarí ọ̀nà déédé bá ní àwọn olùdíje tí a ń ṣàkóso tó yẹ, ṣùgbọ́n tí gbogbo olùdíje tó ṣófo bá wà lábẹ́
lease alágbára ti ẹlòmíràn, OmniRoute yóò dá HTTP `429` padà, pẹ̀lú kóòdù lease-capacity-unavailable, ipò
waiting-for-capacity, àti `Retry-After` tí a fi ààlà sí, tí a sì ṣírò rẹ̀ láti àkókò ìparí tó yẹ jù lọ tó kọ́kọ́ dé.
Àìsí ẹni tó yẹ nínú ìdarí ọ̀nà déédé kì í ṣe ìjàkadì lease, ó sì ń pa ìtumọ̀ àṣìṣe ìdarí ọ̀nà tó ti wà tẹ́lẹ̀ mọ́.

Àwọn ọ̀nà ìṣiṣẹ́ tó jọmọ́ èyí ṣì wà lọ́tọ̀ọ̀tọ̀:

- Ìmúlò session OAuth jẹ́ ìpínkiri rírọ̀ tó wà láàrín process fún àwọn account OAuth.
- Àwọn semaphore account máa ń fúnni ní àwọn àṣẹ ìṣiṣẹ́-ìbéèrè-lẹ́ẹ̀kan-náà, wọ́n sì máa ń parí nígbà tí ìbéèrè bá parí.
- Àwọn lease session tí a ń ṣàkóso tí ó jẹ́ ti ẹnìkan ṣoṣo jẹ́ ohun-ìní ìgbésí-ayé tó dúró pẹ́, pẹ̀lú ọgbà ìdènà generation.

---

## 3. Ìdènà Àwòṣe

**Ààlà:** àkójọpọ̀ mẹ́ta ti olùpèsè + ìsopọ̀ + àwòṣe.

**Ààlà kọ́kọ́rọ́ gẹ́gẹ́ bí ipò:** ipò ìkùnà ló pinnu kọ́kọ́rọ́ tí ìdènà yóò kọ
sí (`resolveLockoutScope()` nínú `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — àmì ìwọ̀n-lílo tàbí ẹ̀tọ́ — dènà **ẹbí ìwọ̀n-lílo**:
  fún codex, gbogbo ààlà `codex` / `spark` (gbogbo àwòṣe `gpt-5*` ti
  ìsopọ̀ náà), fún àwọn olùpèsè mìíràn `getQuotaScopedModelForProvider()`.
- `404` máa ń dènà àwòṣe náà nìkan (`getModelLockKey()` máa ń dín `not_found` kù).
- Ipò èyíkéyìí mìíràn — àwọn ìkùnà ìrìnàjò/asẹ́vá `5xx` àti `502` tí OmniRoute
  fúnra rẹ̀ ṣẹ̀dá láti inú ìfọwọ́sí ànímọ́ — máa ń dènà **ìṣọ̀kan pàtó**
  olùpèsè/ìsopọ̀/àwòṣe náà nìkan. Sísàn búburú lórí àwòṣe kan kì í ṣe ẹ̀rí
  nípa ìwọ̀n-lílo àkọọ́lẹ̀ náà; ṣáájú òfin yìí, èsì òfìfo kan lórí
  `codex/gpt-5.6-luna` máa ń yọ gbogbo àwòṣe `gpt-5*` ti ìsopọ̀ yẹn kúrò
  nínú ìdarí fún ìṣẹ́jú 2–30 (tí ó ń pọ̀ sí i) nígbà tí ìwọ̀n-lílo rẹ̀ kò yí padà.
- Àṣàyàn `scope` tí olùpè bá sọ ní kedere máa ń borí ní gbogbo ìgbà (Antigravity máa ń fi `"exact"` ránṣẹ́).

**Ète:** láti yẹra fún pípa gbogbo ìsopọ̀ kan nígbà tí àwòṣe kan ṣoṣo ni kò sí tàbí tí ìwọ̀n-lílo rẹ̀ ní ààlà.

**Àwọn àpẹẹrẹ:**

- Àwọn olùpèsè tí ìwọ̀n-lílo wọn dá lórí àwòṣe kọ̀ọ̀kan, tí wọ́n ń dá `429` padà
- Àwọn olùpèsè abẹ́lé tí wọ́n ń dá `404` padà fún àwòṣe kan tí kò sí
- Àwọn ìkùnà igbaniláyè fún ìpo/àwòṣe tí ó jẹ́ ti olùpèsè kan pàtó (fún àpẹẹrẹ, àwọn ìpo Grok)

**Ìmúṣẹ:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Pánẹ́ẹ̀lì Àkókò Ìsinmi Àwòṣe (v3.8.0)

UI: Àwọn Ètò → Àwọn Àkókò Ìsinmi Àwòṣe (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Ó ṣe àtòjọ àwọn ìdènà tó ń ṣiṣẹ́ pẹ̀lú: olùpèsè, ìsopọ̀, àwòṣe, ìdí, expiresAt. Àwọn alámójútó lè tún àwòṣe kan ṣiṣẹ́ pẹ̀lú ọwọ́ láti inú káàdì náà.

**REST API:**

- `GET /api/resilience/model-cooldowns` — ṣe àtòjọ àwọn ìdènà tó ń ṣiṣẹ́
- `DELETE /api/resilience/model-cooldowns` — tún un ṣiṣẹ́ pẹ̀lú ọwọ́. Ara: `{provider, connection, model}`. Ìfàṣẹsí: ìṣàkóso.

### Olùṣàkóso Àkókò Ìsinmi

UI: Àbójútó → Olùṣàkóso Àkókò Ìsinmi (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Ojú-ìwé kan fún gbogbo ìsopọ̀ tí a yọ kúrò nínú ìdarí fún ìdí àkókò díẹ̀, dípò
ṣíṣí ojú-ìwé olùpèsè kọ̀ọ̀kan. Ó ṣe àtòjọ àwọn àkókò ìsinmi ìsopọ̀, àwọn ìdènà àwòṣe àti àwọn
ipò òpin, ó sì máa ń mú wọn kúrò fún ìsopọ̀ kọ̀ọ̀kan, fún àṣàyàn kan, tàbí fún gbogbo àwọn ìsopọ̀ olùpèsè kan,
ó sì ń ṣàtúnṣe àwọn òfin àkókò ìsinmi tí a ti túnṣe jù lọ: `streamStallCooldown.enabled` àti àkókò ìsinmi ìpìlẹ̀ OAuth / API-key
`connectionCooldown` àti iye ìgbésẹ̀ ìfàsẹ́yìn tó pọ̀ jù (tí a fi pamọ́ nípasẹ̀
`PATCH /api/resilience`). Àwọn ipò òpin (`banned`, `expired`, `credits_exhausted`) wà
nínú àtòjọ ṣùgbọ́n a kì í mú wọn kúrò níbí.

**REST API** (`src/lib/resilience/cooldownManager.ts`, ìfàṣẹsí: ìṣàkóso):

- `GET /api/resilience/cooldowns[?provider=]` — àwọn ìsopọ̀ pẹ̀lú ipò, àkókò ìsinmi tó kù,
  ipele ìfàsẹ́yìn, irú àṣìṣe tó ṣẹ̀ṣẹ̀ wáyé àti àwọn ìdènà àwòṣe (kò ní ìwé-ẹ̀rí ìwọlé)
- `POST /api/resilience/cooldowns` — ara `{connectionIds: string[]}` tàbí
  `{all: true, provider?}`; ó dá `{cleared, unchanged, skippedTerminal, lockoutsCleared}` padà

### UI àwọn ètò ìdènà + ìmúpadàbọ̀ ìdínkù-lórí-àṣeyọrí (v3.8.23)

Ìdènà àwòṣe yí padà láti ìhùwàsí tí a kọ sínú kóòdù, tí ó sì máa ń ṣiṣẹ́ ní gbogbo ìgbà, sí ẹ̀yà tí a lè
ṣètò ní kíkún, tí a gbọ́dọ̀ yàn láti lò, pẹ̀lú káàdì ètò tirẹ̀ àti ọ̀nà ìmúpadàbọ̀ tó lè wo ara rẹ̀ sàn.

**Káàdì ètò:** Àwọn Ètò → Ìdènà Àwòṣe
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Èyí **yàtọ̀** sí `ModelCooldownsCard` kíkà-nìkan tó wà lókè (èyí tí ó kàn
_ṣe àtòjọ_ àwọn ìdènà tó ń ṣiṣẹ́) — káàdì tuntun náà _ń ṣètò àwọn pàrámítà_. Àwọn iye àkọ́kọ́
wà nínú `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Ètò                     | Iye àkọ́kọ́                        | Ìtumọ̀                                                                 |
| ----------------------- | -------------------------------- | --------------------------------------------------------------------- |
| `enabled`               | `false`                          | Yíyípadà àgbà — ìdènà àwòṣe **wà ní pípa ní àkọ́kọ́**.                  |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Àwọn ipò láti ọ̀dọ̀ olùpèsè òkè tí a kà sí ìkùnà tó dá lórí àwòṣe.      |
| `baseCooldownMs`        | `120_000` (120 s)                | Gígùn ìdènà àkọ́kọ́ fún ìkùnà àkọ́kọ́.                                    |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Òpin gíga fún àkókò ìsinmi tí ó ń pọ̀ sí i.                            |
| `maxBackoffSteps`       | `10`                             | Iye ìgbésẹ̀ ìfàsẹ́yìn onítẹ̀lé tó pọ̀ jù.                                 |
| `useExponentialBackoff` | `true`                           | Bóyá àwọn ìkùnà àsọtúnṣe máa mú kí àkókò ìsinmi pọ̀ sí i lọ́nà onítẹ̀lé. |

Àwọn ètò máa ń dúró nípasẹ̀ ibi ìpamọ́ ètò àkànṣe, a sì máa ń fọwọ́sí wọn nípasẹ̀
àwòrán ètò ìfaradà; káàdì náà máa ń fi òpin sí `baseCooldownMs`/`maxCooldownMs`
(pẹ̀lú `maxCooldownMs ≥ baseCooldownMs`) àti `maxBackoffSteps`.

**Ìmúpadàbọ̀ ìdínkù-lórí-àṣeyọrí:** ìmúpadàbọ̀ **kì í ṣe** bí aago ṣe parí nìkan. Èsì tó dára
máa ń dín iye ìkùnà àwòṣe náà kù ní ìpele kọ̀ọ̀kan, kí àwòṣe tó ti padà bọ̀ sípò
láàárín àkókò náà lè dáwọ́ pípọ̀ sí i dúró (kí ó sì mú ìdènà kúrò) kí aago rẹ̀ tó parí. Lórí
àfojúsùn àkójọpọ̀ tó ṣàṣeyọrí, `open-sse/services/combo.ts` máa ń pe `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), èyí tí ó máa ń **pín** `failureCount` tó wà ní ìpamọ́
**sí ìdajì** (`Math.floor(failureCount / 2)`); nígbà tí ó bá dé `0`, a máa ń pa àkọsílẹ̀ ìdènà náà
rẹ́ pátápátá. Ẹgbẹ́ kejì rẹ̀, `recordModelLockoutFailure()`,
máa ń fi ọ̀kan kún iye náà (ó sì ń mú àkókò ìsinmi pọ̀ sí i) fún àwọn ìkùnà tó ṣẹlẹ̀ láàárín
àkókò ìpòkè. Ìdínkù-lórí-àṣeyọrí yìí jẹ́ àfikún sí píparí aago lásán —
èyíkéyìí nínú àwọn ọ̀nà méjèèjì lè tún àwòṣe kan ṣiṣẹ́.

**Ipò:** a pa àwọn ìdènà mọ́ **nínú ìrántí** (àwọn `Map` ti ìlànà kọ̀ọ̀kan fún
`ModelLockoutEntry` tí `provider:connectionId:model` jẹ́ kọ́kọ́rọ́ wọn, àwọn ìdènà ààlà-pàtó sì ní
`provider:connectionId:exact:model`), a kò fi wọ́n pamọ́ sínú
DB — wọ́n máa ń sọnù nígbà ìtún-bẹ̀rẹ̀. Àwọn _ètò_ ni a fi pamọ́; _ipò_ ìdènà tó ń ṣiṣẹ́
jẹ́ ti ìgbà díẹ̀.

---

## 4. Ìṣàkóso Ìṣiṣẹ́-Pọ̀ nípasẹ̀ Quota-Share (v3.8.36)

Àwọn àkọọ́lẹ̀ ìforúkọsílẹ̀ (GLM, MiniMax, àti bẹ́ẹ̀ bẹ́ẹ̀ lọ) sábà máa ń gba kìkì ~1–3 ìbéèrè
tó ń ṣiṣẹ́ pọ̀ lẹ́ẹ̀kan náà; fífi ju ìwọ̀n yẹn lọ máa ń fa 429 àti àkókò ìsinmi. Èyí le gan-an lábẹ́
àwọn àkópọ̀ **quota-share** (`qtSd/…`), níbi tí ọ̀pọ̀ kọ́kọ́rọ́ API ti ń pín àkọọ́lẹ̀
upstream kan náà. Ìpele mẹ́ta ló ń dáàbò bo àkọọ́lẹ̀ tí a pín kí ọ̀pọ̀ ìbéèrè má bàa bo ó mọ́lẹ̀.

### Òpin ìṣiṣẹ́-pọ̀ fún asopọ̀ kọ̀ọ̀kan (`max_concurrent`)

Asopọ̀ olùpèsè kọ̀ọ̀kan lè ṣàlàyé òpin `max_concurrent`
(`provider_connections.max_concurrent`, tí a ṣètò nínú modal asopọ̀ / API / DB).
Fi sílẹ̀ ní òfo tí o kò bá fẹ́ òpin. Èyí ni ìṣàkóso kan ṣoṣo tó ń darí ìpele ìtẹ̀lé-lẹ́sẹẹsẹ
ní ìsàlẹ̀ — ṣètò rẹ̀ sí ìwọ̀n ìṣiṣẹ́-pọ̀ gidi ti àkọọ́lẹ̀ náà (fún àpẹẹrẹ GLM ~1, MiniMax ~2).

### Àwọn òpin ìṣiṣẹ́-pọ̀ fún model kọ̀ọ̀kan (`modelConcurrency`)

Asopọ̀ kan tún lè ṣàlàyé àwọn òpin ìṣiṣẹ́-pọ̀ pàtó fún model kọ̀ọ̀kan
ní inú àwòrán `rateLimitOverrides` rẹ̀:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Ṣètò rẹ̀ nínú modal asopọ̀ (**Àwọn ìyípadà òpin oṣùwọ̀n → Àwọn òpin
ìṣiṣẹ́-pọ̀ fún model kọ̀ọ̀kan**, `model=cap` kan fún ìlà kọ̀ọ̀kan) tàbí nípasẹ̀
`PATCH /api/providers/[id]` pẹ̀lú ìrísí JSON kan náà. Ìtumọ̀ àwọn kọ́kọ́rọ́:

- **Gbogbo asopọ̀ ní ìfiwéra pẹ̀lú model pàtó:** `maxConcurrent` ṣì jẹ́ òpin
  gbogbo asopọ̀ tí a pín. Nígbà tí àwọn méjèèjì bá kan, a máa gba àwọn ẹnubodè méjèèjì
  lẹ́ẹ̀kan náà nínú ẹnubodè àkópọ̀ kan náà
  (`global → provider → account → model`); òpin tó le jù lára àwọn tó kan ni yóò
  pinnu ìhùwàsí tó nípa.
- **Ìbámu kọ́kọ́rọ́ model gangan:** kọ́kọ́rọ́ náà ni ọ̀rọ̀ model tí a fi ránṣẹ́ sí
  executor lẹ́yìn tí routing bá ti yanjú — ní gbogbo ìgbà, ó jẹ́ id model upstream lásán
  (`glm-5`), kì í ṣe alias `provider/model` ti ẹgbẹ́ oníbàárà (`zai/glm-5` kò
  bá `glm-5` mu). Àwọn iye jẹ́ òpin ìbéèrè tó ń ṣiṣẹ́ pọ̀ tí ó jẹ́ odidi rere.
- **Ìtòlẹ́sẹẹsẹ abẹ́nú, kò sí ìṣàwárí:** àwọn ìbéèrè tó kọjá òpin máa dúró ní ìtòlẹ́sẹẹsẹ abẹ́nú pẹ̀lú
  ìlànà queue/timeout tó ti wà tẹ́lẹ̀ (àwọn àṣìṣe gbígbàwọlé tó ní irú `SEMAPHORE_TIMEOUT` /
  `SEMAPHORE_QUEUE_FULL`). OmniRoute kì í ṣàwárí tàbí fojú díwọ̀n ìlànà upstream —
  ó máa ń fipá mú àwọn òpin gangan tí olùṣàkóso ṣètò. Ẹnubodè model tó ti kún kì í
  pa olùpèsè náà, bẹ́ẹ̀ ni kì í ṣẹ̀dá ìdènà model tó máa wà títí láé; ìhùwàsí
  upstream 429/cooldown/fallback ṣì jẹ́ ààbò ìkẹyìn fún àṣìṣe.
- **Ìwọ̀n fún asopọ̀ kọ̀ọ̀kan, fún process kọ̀ọ̀kan:** àwọn òpin wà fún asopọ̀ database
  kọ̀ọ̀kan, a sì ń tọ́jú wọn sínú memory, nítorí náà asopọ̀ méjì tó ń tún kọ́kọ́rọ́ API upstream
  kan náà lò kì í ṣètò ara wọn pọ̀.
- **Àìṣètò túmọ̀ sí pé kò sí ìyípadà:** fífi àwòrán náà sílẹ̀ (tàbí fífi
  ààyè dashboard sílẹ̀ ní òfo) kò fi ẹnubodè model kankan kún un. Àpẹẹrẹ àtòjọ láì
  sọ pé òpin gbogbo-gbòò kan wà fún olùpèsè:

```text
glm-5=1
glm-4.7=3
```

### Ìtẹ̀lé-lẹ́sẹẹsẹ ìbéèrè Quota-share

Nígbà tí dispatch quota-share kan bá dojú kọ asopọ̀ tó ṣàlàyé
`max_concurrent` rere, àwọn ìbéèrè tó ń ṣiṣẹ́ pọ̀ sí **àkọọ́lẹ̀** yẹn ni a máa ṣètò ní tẹ̀lé-lẹ́sẹẹsẹ nípasẹ̀
semaphore kan fún asopọ̀ kọ̀ọ̀kan (kọ́kọ́rọ́ `qsconn:<connectionId>`): àwọn ìbéèrè tó pọ̀ ju máa **dúró nínú
queue** dípò kí wọ́n bo àkọọ́lẹ̀ náà mọ́lẹ̀. Ó jẹ́ **fail-open** — queue tó ti kún
tàbí timeout máa tẹ̀síwájú láìgba slot dípò kí ó kọ ìbéèrè tí a lè dispatch
nígbàkigbà. Tan-an tàbí pa á ní **Ètò → Ìfaradà → Ìṣiṣẹ́-pọ̀ fún asopọ̀ kọ̀ọ̀kan ti Quota-share**
(`resilienceSettings.quotaShareConcurrencyLimit.enabled`, ó máa ń wà ní titan
láti ìbẹ̀rẹ̀). Láìsí òpin `max_concurrent`, ìhùwàsí náà kò ní yípadà.

> Ẹnubodè routing quota-share (`selectQuotaShareTarget`, DRR + P2C) fúnra rẹ̀ jẹ́
> fail-open, ó sì máa ń _dín ààyè àkọ́kọ́_ asopọ̀ tó ti dé òpin kù nìkan — pẹ̀lú
> pool asopọ̀ kan ṣoṣo, kò lè fi òpin líle múlẹ̀, nítorí náà semaphore yìí gan-an
> ló ń dá ìṣàn ìbéèrè tó pọ̀ dúró.

### Àtúnṣe ìgbìyànjú combo tó mọ ipò cooldown

Fún gbogbo ìlànà combo (nígbà tí a bá mú un ṣiṣẹ́), ìbéèrè kan tí ì bá sọ 429 di
àbájáde fún cooldown alákòókò KÚKÚRÚ máa dúró kí ó parí, yóò sì tún dispatch dípò
kí ó dá 429 padà — èyí bo àwọn àkókò TPM/RPM irú Gemini (~60s retry-after)
lórí àwọn combo model púpọ̀, fún àpẹẹrẹ nígbà tí àwọn ibi-afẹ́ méjèèjì ti combo model méjì bá
dé òpin oṣùwọ̀n fún model kọ̀ọ̀kan. `comboCooldownWait` ló fi ààlà sí i (`enabled`, `maxWaitMs`, `maxAttempts`,
`budgetMs`) ní **Ètò → Ìfaradà**. Kì í dúró lórí `quota_exhausted`
(tí a ti tì pa títí di ọ̀gànjọ́ òru) tàbí àwọn ìdí auth/not-found.

---

## 5. Ìṣàkóso Gbigba Sórí Ìlà Ìbéèrè (v3.8.49 · issue #6593)

**Ààlà iṣẹ́**: ìlà ìdádúró ìwọ̀n-ìyára ti agbègbè fún provider+connection kọ̀ọ̀kan (`open-sse/services/rateLimitManager.ts`,
tí Bottleneck ń ṣètìlẹ́yìn fún), ìpele kan ní ìsàlẹ̀ àwọn ọ̀nà mẹ́ta tó wà lókè.

**`maxWaitMs` ṣe ààlà àkókò dídúró nínú ìlà; `executionMaxWaitMs` ṣe ààlà àkókò ìmúṣẹ.**
A mọ̀ọ́mọ̀ ya àwọn méjèèjì sọ́tọ̀, kò sì sí èyíkéyìí tó ń fi iye rẹ̀ sínú èkejì.

`resilienceSettings.requestQueue.maxWaitMs` ni **ìnáwó-àkókò dídúró nínú ìlà**: ó
bo àkókò dídúró fún ààyè provider, àti dídúró ní ipò QUEUED lẹ́yìn náà, a sì
máa pa aago rẹ̀ ní kété tí iṣẹ́ náà bá kúrò ní QUEUED tí ó sì bẹ̀rẹ̀ ìmúṣẹ
(`rateLimitManager.ts`, `wrappedFn`). Ìbéèrè tó bá kọjá ààlà yìí kì í dé
upstream rárá. Àìyípadà rẹ̀ ni 30000ms, tí
`DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` pèsè nínú
`src/lib/resilience/settings.ts`, tí
`tests/unit/ratelimit-admission-control-6593.test.ts` sì fìdí rẹ̀ múlẹ̀, nítorí náà, yíyí
i padà yóò mú kí ìdánwò yẹn kùnà dípò kí ìpínrọ̀ yìí wà láìṣe àkíyèsí pé ó ti di ti àtijọ́.

`resilienceSettings.requestQueue.executionMaxWaitMs` ni ohun tí Bottleneck
gbà gẹ́gẹ́ bí `expiration` iṣẹ́ náà, tí aago rẹ̀ bẹ̀rẹ̀ kìkì lẹ́yìn tí a bá fi iṣẹ́ náà ránṣẹ́. Ó jẹ́
ààbò ìkẹyìn fún àwọn executor tí kò ní upstream timeout tiwọn, a sì
máa gbé e sókè sí fetch-start timeout ti executor fúnra rẹ̀ nígbà tí ìyẹn bá gùn jù, kí ó
má bàa dá ìdáhùn in-flight tó ń ṣiṣẹ́ dáadáa dúró. Àìyípadà rẹ̀ ni 600000ms (10 min).

Fífún `expiration` ní ìnáwó-àkókò ìlà ni ohun tó máa ń pa àwọn gateway tí kì í ṣe incremental
ní àárín iṣẹ́ tẹ́lẹ̀ — ó bófin mu kí wọ́n ṣiṣẹ́ fún ọ̀pọ̀ ìṣẹ́jú kí bytes àkọ́kọ́ tó dé —
èyí sì ni ìdí tí a fi ń fi expiration hàn gẹ́gẹ́ bí `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504), nígbà tí ìnáwó-àkókò ìlà ń lo
kóòdù queue-timeout. Ṣàtúnṣe èyíkéyìí pẹ̀lú `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) tàbí dashboard
(**Settings → Resilience**). A máa ń fi ààlà 1ms–24h sí àwọn méjèèjì nígbà tí a bá sọ wọ́n di ìwọ̀n déédéé.

**Ìtẹ̀síwájú àṣẹ, fún àwọn méjèèjì:** env var ń pèsè _àìyípadà_ nìkan. Iye tí a
ti tọ́jú sínú `resilienceSettings.requestQueue` (dashboard / API patch, tí a tọ́jú
nínú `key_value`) ní agbára lórí rẹ̀, `rateLimitOverrides.maxWaitMs` /
`.executionMaxWaitMs` ti connection kọ̀ọ̀kan sì ní agbára lórí ìyẹn. Nítorí náà, ṣíṣètò
env var lórí deployment tó ti ní iye tí a tọ́jú tẹ́lẹ̀ kò ní yí ohunkóhun padà —
pa ètò tí a tọ́jú náà rẹ́ tàbí ṣe ìmúdójúìwọ̀n rẹ̀ dípò bẹ́ẹ̀.

`maxWaitMs` ṣe ààlà àkókò tí ìbéèrè lè lò nínú ìlà; `maxQueueDepth` tó wà nísàlẹ̀ ṣe ààlà iye
àwọn olùpè tó lè wà ní ìlà ní ẹ̀ẹ̀kan.

**`maxQueueDepth` — ààlà gbigba tí a gbọ́dọ̀ yàn láti lò (tuntun).** `resilienceSettings.requestQueue.maxQueueDepth`
ṣe ààlà iye àwọn ìbéèrè tó lè jókòó nínú ìlà (tí a kò tíì fi ránṣẹ́) fún
provider+connection kan ní ẹ̀ẹ̀kan. Nígbà tí ìlà náà bá ti ní `maxQueueDepth`
ìbéèrè, a máa kọ ìbéèrè tuntun sílẹ̀ lẹ́sẹ̀kẹsẹ̀ pẹ̀lú àṣìṣe tó ní irú pàtó
`code: "RATE_LIMIT_QUEUE_FULL"` **ṣáájú** kí ó tó dé `limiter.schedule()`
rárá — nítorí náà, ìkọ̀sílẹ̀ náà kò ná ohun púpọ̀, ó sì ṣẹlẹ̀ ṣáájú iṣẹ́
prompt-compression / translation èyíkéyìí ní downstream fún ìbéèrè náà. Àìyípadà `0` =
a pa á, èyí tó ń pa ìhùwàsí ìlà aláìláàlà tó wà tẹ́lẹ̀ mọ́; ààlà rẹ̀ jẹ́ 0–100000.
Ṣàtúnṣe rẹ̀ pẹ̀lú `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) tàbí
`resilienceSettings.requestQueue.maxQueueDepth` (dashboard/API patch).

Àyẹ̀wò gbigba náà fúnra rẹ̀ jẹ́ pure function
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), nítorí náà
a lè ṣe unit test rẹ̀ láìní limiter Bottleneck gidi kan.

> RFC tó ṣí #6593 tún dábàá flag `bypassCompressionOnRateLimit`
> kan. Pipeline `open-sse/services/compression/` inú repo yìí jẹ́
> prompt/context compression lórí ìbéèrè LLM outbound (`chatCore.ts`,
> ní àyíká block `resolveCompressionSettings`/`selectCompressionStrategy`),
> kì í ṣe HTTP response compression lórí ara ìdáhùn 429 tí a dá — kò sí
> code path tó bá flag bypass gangan mu. Ìgbésẹ̀ prompt-compression yẹn
> tún ń ṣiṣẹ́ _ṣáájú_ `withRateLimit()` nínú pipeline ìbéèrè lọ́wọ́lọ́wọ́, nítorí náà
> àtúntò láti fo ó nígbà ìkọ̀sílẹ̀ queue-full jẹ́ ìyípadà tó yàtọ̀, tó sì tóbi
> ju ààlà issue yìí lọ; a mọ̀ọ́mọ̀ **kò** ṣe é
> níbí, a sì fi í sílẹ̀ gẹ́gẹ́ bí iṣẹ́ atẹ̀lé bí èrè ìfipamọ́ CPU bá tó
> ewu àtúntò náà.

---

## 6. Olùṣọ́ ìṣàn lọ́ra fún ìwọ̀n-àbájáde (#9709)

Olùṣọ́ àṣàyàn `resilienceSettings.streamRecovery.throughputWatchdog` máa ń ṣàwárí
orisun òkè tí ó ṣì ń fi àwọn ìpín ránṣẹ́ ṣùgbọ́n tí ó ń ṣe àbájáde olùrànlọ́wọ́ ní ìwọ̀n
tó kéré ju ìwọ̀n àbájáde tó wúlò tí a ṣètò lọ. A mọ̀ọ́mọ̀ yà á sọ́tọ̀ sí àkókò ìdákẹ́jẹ:
àwọn heartbeat àti metadata kì í tún èyíkéyìí nínú àwọn aago náà bẹ̀rẹ̀, wọn kò sì ka sí ìlọsíwájú. Ó tún
yàtọ̀ sí àkókò ìparí ìgbìyànjú líle (#9153), èyí tí ó ṣì jẹ́ ààlà ààbò
tí kò ṣeé ré kọjá láìka dídára àbájáde sí.

Olùṣọ́ náà nílò àkókò ìmúra, lẹ́yìn náà fèrèsé yíyí tó pé kí
ó tó lè fòpin sí ìgbìyànjú. Ó máa ń ka àwọn ìyípadà ọ̀rọ̀ láti inú àwọn ìṣẹ̀lẹ̀ àbájáde Chat Completions àti Responses API
(gẹ́gẹ́ bí aṣojú oníwọ̀ntúnwọ̀nsì fún iye byte UTF-8), ó máa ń foju kọ àwọn ìṣẹ̀lẹ̀ tó ní usage nìkan àti àwọn ìṣẹ̀lẹ̀ òfo, ó sì
máa ń dá ìdájọ́ dúró nígbà tí àwọn ìṣẹ̀lẹ̀ tool-call tàbí reasoning bá ń lọ lọ́wọ́. Ó jẹ́ pípa
ní ìbẹ̀rẹ̀, a sì lè mú un ṣiṣẹ́ pẹ̀lú `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`;
fèrèsé, àkókò ìmúra, ìwọ̀n tó kéré jù, àti àbájáde tó ṣeé wọ̀n tó kéré jù ni a fi ààlà sí nípasẹ̀
ìpele ìṣètò-ìfaradà deede.

Nígbà tí a bá mú un ṣiṣẹ́, fífi olùṣọ́ fòpin sí ìgbìyànjú kan ìgbìyànjú orisun òkè tó ń ṣiṣẹ́ nìkan. Ṣáájú
byte èyíkéyìí tí oníbàárà lè rí, ọ̀nà ìmúpadàbọ̀sípò kutukutu tó ti wà fún àkọọ́lẹ̀ kan náà lè tún
ìgbìyànjú náà ṣí. Lẹ́yìn commit, a kì í tún ìṣàn náà ṣe láìní ìdánilójú; àdéhùn
ìtẹ̀síwájú àárín-ìṣàn tó ní ààbò tí ó ti wà nìkan ló lè so apá ìparí pọ̀. Ìparí iṣẹ́ ṣì
máa ń ṣẹlẹ̀ lẹ́ẹ̀kan ṣoṣo, nítorí náà a kì í ṣe àdáwòkọ ìṣírò usage àti ìtúsílẹ̀ semaphore.

---

## 7. Àtúnsọ Ipò Orisun Òkè (àwọn àṣìṣe quota tí a ṣàlàyé ní àìtọ́)

**Ààlà iṣẹ́:** gateway orisun òkè kan tí ó ń jábọ̀ pé quota ti tán fún ìgbà díẹ̀ pẹ̀lú ipò HTTP tí kò tọ́.

**Ète:** ṣàtúnṣe ipò tó ń ṣi ni lọ́nà **ṢÁÁJÚ** ìsọ̀rí, kí àwọn olùlò abẹ́lẹ̀ (ẹ́ńjìnnì fallback, àkójọpọ̀ combo, ìdáhùn tí a fi hàn oníbàárà) lè rí pé ìkùnà náà lè ṣe àtún-ìgbìyànjú ní tòótọ́.

Àwọn gateway kan máa ń fi hàn pé quota **FÚN ÌGBÀ DÍẸ̀** ti tán pẹ̀lú ipò HTTP
tí kò gba àtún-ìgbìyànjú. `agentrouter.org` máa ń dá `403` padà (nígbà míì `400`) pẹ̀lú ara ìdáhùn ní èdè Ṣáínà
(`用户额度不足` / `额度不足`) dípò `429` tó jẹ́ boṣewa. Àwọn oníbàárà bíi Claude
Code máa ń ka `403` sí ìkùnà tó wà pẹ́ títí, wọ́n á sì fòpin sí session náà; láìsí àtúnṣe,
ẹ́ńjìnnì fallback yóò sọ ọ́ di `AUTH_ERROR` dípò ìṣẹ̀lẹ̀
quota.

**Ìmúṣẹ:**

- Registry + matcher: `open-sse/config/upstreamStatusRestatement.ts` — àkójọ
  àwọn òfin fún provider kọ̀ọ̀kan (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), tí a fi `applyStatusRestatement()` bá mu.
- Ibi ìpè: ìdí `providerFailure:` nínú `open-sse/handlers/chatCore.ts`
  (ní àyíká ìlà 3654), lẹ́sẹ̀kẹsẹ̀ lẹ́yìn tí `parseUpstreamError()` bá túmọ̀ ìdáhùn
  orisun òkè kan tó ní ipò HTTP àṣìṣe (`!providerResponse.ok`), àti ṣáájú kí
  ìsọ̀rí èyíkéyìí tó ṣiṣẹ́, kí gbogbo olùlò abẹ́lẹ̀ lè rí ipò tí a ṣàtúnṣe.
  Àwọn àṣìṣe tí a fi sínú ìṣàn SSE `200` máa ń tẹ̀lé ọ̀nà míràn fún
  títúmọ̀ ìṣàn nígbà tó bá yá, **kò** sì sí lábẹ́ hook yìí lónìí — èyí jẹ́
  ààlà tí a mọ̀, tí a kò tíì nílò fún ipò-àìtọ́ agentrouter (èyí tí
  ó máa ń farahàn gẹ́gẹ́ bí ipò HTTP àṣìṣe).
- Yíyẹ fún àtún-ìgbìyànjú: `429` wà nínú `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), nítorí náà àṣìṣe tí a tún ipò rẹ̀ sọ
  máa ń ní fèrèsé àtún-ìgbìyànjú gidi dípò kí ó farahàn gẹ́gẹ́ bí `403` tí kò ṣiṣẹ́.
- `60s` àfọwọ̀ṣe `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  jẹ́ ohun tí ìdáhùn tí a tún ipò rẹ̀ sọ ń sọ fún **oníbàárà** nìkan; kì í ṣe
  iye àkókò cooldown/lockout abẹ́nú connection fúnra rẹ̀ — èyí ni
  ohun èlò tó bá ń bójú tó àṣìṣe tí a tún ipò rẹ̀ sọ yóò ṣàkóso lọ́tọ̀
  (ìfàsẹ́yìn tó ń pọ̀ sí i ti Connection Cooldown, §2, pẹ̀lú ìpìlẹ̀ `3s` fún àwọn provider
  API-key; tàbí Model Lockout, §3, fún àwọn provider quota-fún-model-kọ̀ọ̀kan bíi
  agentrouter). Router lè tún yẹ fún àtún-ìgbìyànjú ní abẹ́nú ṣáájú
  fèrèsé 60s tí ó polówó fún oníbàárà — àyè àfikún tí a mọ̀ọ́mọ̀ fi sílẹ̀ ni,
  kì í ṣe bug.

A **KÒ GBỌ́DỌ̀** tún ipò àwọn àṣìṣe tó wà pẹ́ títí sọ (ti agentrouter `无权访问模型` — kò ní àṣẹ sí model yìí):
`excludeMarkers` máa ń fagilé òfin náà àní nígbà tí `textMarkers` bá baramu,
nítorí náà àṣìṣe náà máa ń pa ipò ìpilẹ̀ rẹ̀ mọ́, kò sì sí ohun tó máa tún un gbìyànjú títí láé. Òfin ìsọ̀rí provider
tó bá a mu
(`agentrouter-model-access-denied` nínú `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, cooldown ìpìlẹ̀ `6h` tí a kéde) ni
`checkFallbackError` (`open-sse/services/accountFallback.ts`) máa ń ṣàyẹ̀wò
_ṣáájú_ ìpadà-kutukutu `FORBIDDEN` gbogbogbò ti ẹ̀ka apikey, tí
`honorsRuleLockScope(provider)` ń ṣàkóso (#10334 — agentrouter nìkan ló ní ààyè lọ́wọ́lọ́wọ́ nípasẹ̀
allowlist `HONORS_RULE_LOCK_SCOPE_PROVIDERS` nínú
`providerErrorRules.ts`). Cooldown 6h tí òfin náà kéde máa ń kọjá gẹ́gẹ́ bí
`fallbackResult.baseCooldownMs`, ṣùgbọ́n ó ṣì ń wọ ọ̀nà lockout
quota-fún-model-kọ̀ọ̀kan tó ti wà tẹ́lẹ̀ (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, tí #10334 kò yí padà àfi orisun cooldown):
a máa ń dín in kù sí `mlSettings.maxCooldownMs` ti olùdarí
(àìyípadà `1_800_000ms` / 30min), bí gbogbo model lockout mìíràn, àti
_ìdí lockout tí a fi pamọ́_ ṣì jẹ́ `"forbidden"` tí a kọ sínú kóòdù tẹ́lẹ̀,
kì í ṣe `"auth_error"` ti òfin náà — iye àkókò cooldown nìkan ni a bọ̀wọ̀ fún
láti ìbẹ̀rẹ̀ dé òpin, kì í ṣe ọ̀rọ̀ ìdí náà. Connection náà fúnra rẹ̀ ṣì ń ṣiṣẹ́;
àwọn model ẹlẹgbẹ́ lórí connection kan náà kò ní kan.

Àwọn àṣìṣe kótà tí a tún sọ (`额度不足`) dé òfin olùpèsè kan ní production
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, kò ní cooldown tirẹ̀ tí a kéde — àìpé cooldown tí a dín sílẹ̀ ti
persistence layer ni yóò kan). Láti #10334, `scope` lórí
`ProviderErrorRuleMatch` NI a ń lò láti ìbẹ̀rẹ̀ dé òpin, ṣùgbọ́n **kìkì** fún àwọn olùpèsè inú
àkójọ-àṣẹ `HONORS_RULE_LOCK_SCOPE_PROVIDERS` (`providerErrorRules.ts` —
lónìí `"agentrouter"` nìkan, tí `honorsRuleLockScope()` ń ṣàkóso). Fún gbogbo
olùpèsè mìíràn, `scope` ṣì jẹ́ ti ìfitonilétí nìkan, gẹ́gẹ́ bí ó ti rí ṣáájú #10334.
`checkFallbackError` ń ṣàfihàn scope òfin tí ó bá mu gẹ́gẹ́ bí
`fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) ni guard àjọpín tí ó jẹ́rìí pé
`ruleScope` dájú pé ó ní ààbò láti bọ̀wọ̀ fún gẹ́gẹ́ bí àmì tó kan gbogbo connection, tí ó sì lè
padà bọ̀ sípò fúnra rẹ̀ (scope `"connection"`, reason `quota_exhausted`, kì í ṣe `permanent`,
kì í sì jẹ́ `creditsExhausted` — ìdáàbòbò lòdì sí òfin ọjọ́ iwájú kan tí ó lè so scope
`"connection"` pọ̀ mọ́ ipò account tí ó wà títí láé). Àwọn consumer méjì ló ń pè é:

- **Persistence** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  dípò kí ó wọ ẹ̀ka lockout **per-model** ti passthrough-provider
  (agentrouter jẹ́ `passthroughModels: true` → `hasPerModelQuota()`
  dá `true` padà), ó ń lo **cooldown connection fún ìgbà díẹ̀** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, kì í lo terminal status
  (`credits_exhausted`/`banned`/`expired`) — kí connection náà lè padà bọ̀ sípò
  fúnra rẹ̀ lẹ́yìn tí cooldown bá parí, dípò kí ó nílò credential reset pẹ̀lú ọwọ́.
  A máa fò ó kọjá fún àwọn connection tí ó ní `disableCooling: true` (#2997): opt-out yẹn
  yóò tẹ̀síwájú sínú lockout per-model dípò rẹ̀ (trade-off tí a ti ṣàkọsílẹ̀ —
  wo àlàyé code tó wà lókè ẹ̀ka náà).
- **Combo routing inú request kan náà** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): guard kan náà ń fi
  connection náà sínú set `exhaustedConnections` inú memory, pẹ̀lú key
  `${provider}:${connectionId}`. Èyí kàn ń fò target SAME-REQUEST tó kù kọjá
  tí _òun fúnra rẹ̀ ti ní `connectionId` gangan yẹn_ lórí object target tirẹ̀
  (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` ṣáájú lookup `exhaustedConnections`) — combo model-list lasan,
  níbi tí àwọn target ẹlẹgbẹ́ kò ti ní `connectionId` tí a pin mọ́ wọn fúnra wọn,
  tí a sì ń resolve ọ̀kan fún dispatch kọ̀ọ̀kan láti header
  `X-OmniRoute-Selected-Connection-Id` ti response, kò lè bá key yẹn mu láéláé. Fún
  ìṣẹ̀lẹ̀ tó wọ́pọ̀ yẹn, ìdáàbòbò gidi lòdì sí kí leg tó kù tún lo account
  tí kótà rẹ̀ ṣẹ̀ṣẹ̀ parí KÌ Í ṢE Set yìí — persistence layer tó wà lókè ni
  (`rateLimitedUntil` ti connection náà ti wà ní ọjọ́ iwájú báyìí) pẹ̀lú
  guard kan náà tó ń dí `transientRateLimitedProviders` mọ́ fún
  failure náà (wo "Àpẹrẹ onípele méjì" àti àlàyé code lórí ẹ̀ka
  `isAgentrouterConnectionQuotaScope` nínú `targetExhaustion.ts`): nígbà tí
  a kò bá samisi Set yẹn, force-allow `allowRateLimitedConnection` ti `combo.ts`
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) KÒ ní ṣiṣẹ́ fún
  àwọn leg olùpèsè tó kù, nítorí náà a bọ̀wọ̀ fún filter `rateLimitedUntil`
  ti credential selection (`src/sse/services/auth.ts:1238`) bí ó ṣe yẹ,
  leg tó kù yóò sì yàn connection agentrouter mìíràn tí ó ṣì yẹ, tàbí yóò
  kùnà pé kò sí credentials tó wà — kì yóò fi ipá padà sí connection tí ẹ̀ka
  yìí ṣẹ̀ṣẹ̀ fi sínú cooldown.

### Àpẹrẹ onípele méjì: títún status sọ, lẹ́yìn náà classification

Títún status sọ (`upstreamStatusRestatement.ts`) àti àwọn òfin classification
olùpèsè (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) jẹ́ registry ọ̀tọ̀ọ̀tọ̀ tí àwọn méjèèjì ń lo provider id
àti àwọn text marker gẹ́gẹ́ bí key, ṣùgbọ́n wọ́n ń ṣiṣẹ́ ní ibi ọ̀tọ̀ọ̀tọ̀, wọ́n sì ní
ìdí ọ̀tọ̀ọ̀tọ̀: restatement ń tún HTTP status kọ ní kùtùkùtù nínú `chatCore.ts`;
àwọn òfin classification ń yan `reason` fallback àti `scope` lock
(`model` / `provider` / `connection`) nínú `checkFallbackError()`
(`open-sse/services/accountFallback.ts`).

Àwọn òfin classification kàn lè rí **text** àṣìṣe kíkún (èyí tí a nílò láti bá
body marker bí `额度不足` mu) fún àwọn olùpèsè tí a tò sínú àkójọ-àṣẹ
`FULL_TEXT_RULE_PROVIDERS` nínú `providerErrorRules.ts` — lọ́wọ́lọ́wọ́,
`"agentrouter"` nìkan. Fún gbogbo olùpèsè **built-in catalog** mìíràn,
`checkFallbackError` ń fún `getProviderErrorRuleMatch` ní structured error
nìkan (`{code, type}`), èyí tó tó fún àwọn òfin tó dá lórí header/status/code
ṣùgbọ́n tí kò lè rí àwọn body-text marker. Helper `resolveRuleMatchBody()`
ló ń ṣe àṣàyàn yìí: text àṣìṣe kíkún fún àwọn olùpèsè inú àkójọ-àṣẹ, structured
error sì ni fún àwọn yòókù. Fífí olùpèsè **built-in** kan kún
`FULL_TEXT_RULE_PROVIDERS` jẹ́ opt-in gbangba fún olùpèsè kọ̀ọ̀kan —
ó wà kí default path fún gbogbo olùpèsè tí kò sí lórí àkójọ náà lè dúró
láìyípadà byte-for-byte.

`scope` òfin kan (`model` / `provider` / `connection`) jẹ́ opt-in mìíràn tó
yàtọ̀ sí `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` kàn ń ṣàfihàn rẹ̀
gẹ́gẹ́ bí `fallbackResult.ruleScope`, àwọn downstream consumer sì kàn ń bọ̀wọ̀
fún un gẹ́gẹ́ bí ohun tó ju àmì ìfitonilétí lọ, fún àwọn olùpèsè inú
àkójọ-àṣẹ `HONORS_RULE_LOCK_SCOPE_PROVIDERS` nínú file kan náà (`gated via
honorsRuleLockScope()` — lọ́wọ́lọ́wọ́ `"agentrouter"` nìkan). Wo "Àwọn àṣìṣe
kótà tí a tún sọ" lókè fún ohun tí match `scope: "connection"` ń ṣe gan-an
nígbà tí olùpèsè kan bá ti wà nínú àkójọ-àṣẹ yẹn.

**#11104 — àwọn òfin tí olùṣàkóso kéde máa ńforí gbogbo àtòjọ ìyọ̀ǹda méjèèjì kọjá.** Olùṣàkóso lè
kéde òfin kan fún olùpèsè kọ̀ọ̀kan ní àkókò ìṣiṣẹ́ nípasẹ̀ `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
láìṣàtúnṣe fáìlì yìí. Ṣíṣàkóso òfin olùṣàkóso lẹ́yìn
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — àwọn àtòjọ
ìyọ̀ǹda tí a pète láti dáàbò bo ìhùwàsí **àìyípadà** ti àwọn òfin àkójọ tí a kọ sínú ètò — yóò
mú kí ọ̀nà ìṣètò náà má ṣiṣẹ́ fún gbogbo olùpèsè àyàfi àwọn tí a ti
ṣàkọsílẹ̀ níbẹ̀ tẹ́lẹ̀, nítorí pé kíkéde òfin náà fúnra rẹ̀ ti jẹ́ ìfọwọ́sí
kedere láti ọ̀dọ̀ olùṣàkóso. `resolveRuleMatchBody()` àti `honorsRuleLockScope()` méjèèjì máa ńṣàyẹ̀wò
`hasOperatorRuleForProvider()` lákọ̀ọ́kọ́: olùpèsè tó ní òfin olùṣàkóso yóò gba
ọ̀rọ̀ àṣìṣe gẹ́gẹ́ bí ó ṣe rí, a ó sì bọ̀wọ̀ fún `scope` tí ó kéde, láìka
bóyá ó tún wà nínú èyíkéyìí lára àwọn àtòjọ ìyọ̀ǹda náà.

**Àlàfo tí a mọ̀ — a kì í ṣàyẹ̀wò `providerRuleRegistry` rárá fún HTTP 400.**
Ẹ̀ka `BAD_REQUEST` ti `checkFallbackError` máa ńṣe ìsọ̀rí ipò 400 pátápátá
nípasẹ̀ àwọn àkójọpọ̀ àpẹẹrẹ tirẹ̀ (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS`, àti bẹ́ẹ̀ bẹ́ẹ̀ lọ nínú `accountFallback.ts`) ó sì máa ńdáhùn padà kí
a tó dé ẹ̀ka `configuredRule`/`getProviderErrorRuleMatch` tó wà lókè rẹ̀.
Òfin àkójọ tí a kọ sínú ètò (tàbí òfin olùṣàkóso) tó ní `status: 400` jẹ́
ẹ̀tọ́ ní ti gírámà ṣùgbọ́n kò ní ṣiṣẹ́ láé. Kò sí òfin tó wà báyìí tó ńfojúsùn 400,
nítorí náà kò sí ohun tó kan ní production — ṣùgbọ́n òfin 400 lọ́jọ́ iwájú yóò nílò kí a
kọ́kọ́ fọwọ́ kan ẹ̀ka yìí, èyí tó jẹ́ àyípadà tó tóbi ju fífi òfin kan kún un lọ (ó
máa tún 400 ṣe ìsọ̀rí fún gbogbo olùpèsè tó ti ńgbẹ́kẹ̀ lé ìhùwàsí
àkójọpọ̀-àpẹẹrẹ náà) ó sì kọjá ààlà fífi òfin olùpèsè kan ṣoṣo kún un.

### Fífi gateway tuntun kan tó ńṣàlàyé quota lọ́nà àìtọ́ kún un

1. Forúkọsílẹ̀ àkójọpọ̀ òfin kan nínú `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Jẹ́ kí `textMarkers`
   jẹ́ ti olùpèsè náà ní pàtó; má ṣe tún àwọn gbólóhùn Gẹ̀ẹ́sì gbogbogbòò tó lè kọlu
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`) lò.
2. Bí ó bá yẹ, forúkọsílẹ̀ àwọn òfin ìsọ̀rí nínú
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) láti yan
   ààlà ìtìpa tó tọ́ (`connection` fún quota gbogbo àkọọ́lẹ̀, `model` fún
   àwọn àṣìṣe awoṣe kọ̀ọ̀kan). Ìgbésẹ̀ yìí máa ní ipa ní production nìkan fún
   àwọn olùpèsè tí òfin wọn nílò gbogbo ọ̀rọ̀ àṣìṣe (àwọn àmì ara ìdáhùn): fi
   provider id náà kún `FULL_TEXT_RULE_PROVIDERS` nínú fáìlì kan náà — bí kò ṣe bẹ́ẹ̀,
   `checkFallbackError` yóò fún òfin náà ní àṣìṣe tó ní ìṣètò
   `{code, type}` nìkan, òfin tó dá lórí ọ̀rọ̀ ara ìdáhùn kò sì ní bá traffic gidi mu láé.
   Àwọn òfin tó bá mu lórí `status`/`headers` nìkan (gẹ́gẹ́ bí ti Opencode tàbí
   Minimax) kò nílò ìfọwọ́sí yìí. Lọ́tọ̀ sí èyí, bí òfin náà bá kéde
   `scope: "connection"` tí ète náà sì jẹ́ cooldown gidi fún gbogbo connection
   pẹ̀lú fífo combo kọjá nínú request kan náà (kì í ṣe àmì ìsọfúnni lásán), fi
   provider id náà kún `HONORS_RULE_LOCK_SCOPE_PROVIDERS` nínú fáìlì kan náà — èyí
   ló ńṣàkóso lílo tó dà bí `isAgentrouterConnectionQuotaScope()` nínú
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) àti
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); láìsí èyí, `scope`
   ṣì máa ńṣàn gba `fallbackResult.ruleScope`, ṣùgbọ́n kò sí ohun tó máa ṣe ìgbésẹ̀ lórí rẹ̀.
3. Ṣàfikún àwọn ìdánwò unit tó fara wé `tests/unit/upstream-status-restatement.test.ts`
   àti `tests/unit/agentrouter-error-rules.test.ts` (pẹ̀lú àwọn ìdènà
   not-permanent / not-creditsExhausted, àti — bí olùpèsè náà bá nílò
   àtòjọ ìyọ̀ǹda — ìdánwò tó fi ìdí rẹ̀ múlẹ̀ pé `resolveRuleMatchBody()` ńdá
   gbogbo ọ̀rọ̀ náà padà fún olùpèsè yẹn nìkan).

Kò nílò àyípadà sí `chatCore.ts`, `classifyError`, tàbí combo.

#### Ìtìpa tí a pín sí bucket gẹ́gẹ́ bí egress (#10880)

A máa ńka àwọn olùpèsè inú `EGRESS_BUCKETED_LOCK_PROVIDERS` (ìdílé opencode)
sí upstream tí a pín sí bucket gẹ́gẹ́ bí IP (free tier opencode jẹ́ ti
IP-bucketed, kì í ṣe account-bucketed — wo #9611): status-429 tí a ṣe ìsọ̀rí rẹ̀ sí `quota_exhausted`
**tàbí** `rate_limit_exceeded` máa ńfi gbogbo connection ìdílé inú àtòjọ ìyọ̀ǹda
tí IP egress tí a mọ̀ kẹ́yìn bá IP connection tó kùnà mu sínú cooldown,
kí rotation tó lè dán wọn wò
— èyí ńyẹra fún àwọn upstream call N-1 tí a mọ̀ dájú pé yóò kùnà (ìrísí kan náà bí #10460/#10525).
A mọ̀ọ́mọ̀ fi `rate_limit_exceeded` kún un: lórí ipa ọ̀nà `markAccountUnavailable`,
àwọn òfin pàtó fún opencode kì í bá a mu láé (a kò fi headers/body fún
`checkFallbackError`, opencode kò sí nínú `FULL_TEXT_RULE_PROVIDERS`), nítorí náà 429 kan
tí body rẹ̀ ní ọ̀rọ̀ quota subscription ("monthly usage limit
reached") ni quota-text fallback máa ńsọ̀rí sí `quota_exhausted`
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; cooldown 1h) kí
a tó dé òfin `status_429` rárá — nígbà tí 429 tí kò ní quota-text (rate
limiting lásán) máa ńgba òfin `status_429` ṣe ìsọ̀rí sí `rate_limit_exceeded`
tó sì ṣì máa ńfi ìdílé IP náà sínú cooldown. Fún olùpèsè inú àtòjọ ìyọ̀ǹda, rate limit
tí a pín sí bucket gẹ́gẹ́ bí IP jẹ́ àmì kan náà bí quota tó ti tán. Àwọn ààlà tòótọ́:

- **Ìsapá-tó-dára-jù**: lock náà máa ńwá `egress_ip` tí a mọ̀ gbẹ̀yìn fún connection náà
  láti inú `proxy_logs` (àkókò 24h, synchronous, kò sí cache). Cold cache (a kò tíì
  ṣe probe IP egress rí) tàbí kò sí row → ẹ̀ka náà ṣì máa ńfi connection tó kùnà
  sínú cooldown (a ó sì ṣe àkọsílẹ̀ rẹ̀ bí ti òní), àmọ́ kò ní lock sibling kankan.
- **Kì í di òpin láéláé**: cooldown náà jẹ́ quota window tí ńsọ ara rẹ̀ di tuntun
  (`testStatus: "unavailable"`); a kì í ṣe ìpinnu permanent state láti inú
  àmì ipele-IP. Àwọn connection `disableCooling` máa ńfo ẹ̀ka náà kọjá pátápátá.
- **Granularity lock yí padà fún family tó wà nínú allowlist**: èyí jẹ́ ìyípadà scope,
  kì í ṣe sibling optimization nìkan. opencode jẹ́ provider `passthroughModels`,
  nítorí náà ṣáájú ẹ̀ka yìí, 429 máa ńfa lockout fún MODEL kọ̀ọ̀kan; ní báyìí ó máa
  ńfa cooldown connection — títí kan fún operator tó ńṣiṣẹ́ connection kan ṣoṣo
  láìní sibling rárá. Ìyẹn ni granularity tí table rule opencode ti sọ tẹ́lẹ̀ pé
  ó tọ́ (`scope: "connection"`, `providerErrorRules.ts`), ṣùgbọ́n tí a kò tíì
  tẹ̀lé rí nítorí opencode kò sí nínú `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Ẹ̀ka náà
  fúnra rẹ̀ máa ńkọ cooldown + `backoffLevel` connection tó kùnà, ní ṣíṣe àfarawé
  ẹ̀ka agentrouter tó ní scope connection, yóò sì return — a kì í dé block
  per-model àti generic path tó wà nísàlẹ̀ rárá.
- **Combo wà nínú rẹ̀**: bí ẹ̀ka agentrouter, scope náà mọ̀ọ́mọ̀ fo downgrade
  `persistUnavailableState`/`isCombo` tí combo caller kan máa ńlò fún 429 kọjá.
  Lockout per-model kì í ṣe irú scope yìí tó rọrùn sí i; unit tí kò tọ́ ni:
  kò sọ ohunkóhun nípa IP tí quota rẹ̀ ti tán, nítorí náà rotation combo náà
  yóò máa bá a lọ láti fi call kan tí ó dájú pé yóò kùnà ṣòfò fún sibling kọ̀ọ̀kan.
- **Ààbò sibling**: a kì í kọ lórí sibling tó ti wà ní terminal state
  (banned/credits_exhausted) tàbí tó ti wà nínú cooldown tó gùn ju.
- **Allowlist aládàáṣe**: fífẹ̀ `EGRESS_BUCKETED_LOCK_PROVIDERS` sí i jẹ́
  ìpinnu owner tó ṣe kedere; kò sí generic wiring (pattern #10334/#10419).
  Query sibling náà lo allowlist kan náà dípò kí ó tún un ṣe gẹ́gẹ́ bí SQL
  literal, nítorí náà fífẹ̀ rẹ̀ sí i ṣì jẹ́ ìyípadà laini kan ṣoṣo.
- **Rotation IP egress, ní ọ̀nà méjèèjì**: window lookup náà (24h) fẹ̀ ju
  TTL cache IP egress (5 min) lọ gan-an, nítorí náà “IP tí a mọ̀ gbẹ̀yìn” jẹ́
  ìtàn, kì í ṣe current state. Bí proxy connection kan bá ti rotate láàárín
  window náà, lock lè **má rí** IP tí wọ́n ńpín ní tòótọ́ (IP tí a gbasilẹ ni
  tuntun, tí kò tíì tán) — bákan náà, ó lè **fi sibling kan tí ó ti rotate kúrò**
  ní IP tí ó ti tán sínú cooldown. Ọ̀ràn kejì máa ná sibling náà cooldown window
  kan; a gba àwọn méjèèjì gẹ́gẹ́ bí ààlà best-effort ti lookup tó dá lórí ìtàn.
- **Iye owó iṣẹ́**: scan méjì tó ní ààlà lórí `proxy_logs` (tí a fi window ṣe
  filter nípasẹ̀ `idx_pl_timestamp`), nígbà tí 429 bá ṣẹlẹ̀ nìkan. Kò sí index
  tuntun (migration 134 YAGNI). A wọn un lórí ẹ̀dà DB real-traffic tó ní ìwọ̀n
  àárín; instance high-throughput máa ńdi rows púpọ̀ sí i ní ìbámu pẹ̀lú ìwọ̀n
  rẹ̀ láàárín window kan náà.

---

## Àwọn Ẹ̀yà Ìfaradà Mìíràn

- **Àwọn ọ̀nà ìdarí 19** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — wo [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Ìdarí tó mọ ìgbà àtúntò** (v3.8.0) — ń fi àwọn ìsopọ̀ sípò àkọ́kọ́ ní ìbámu pẹ̀lú àkókò àtúntò ìpín.
- **Ìdínkù agbára ipò abẹ́lẹ̀** — Responses API `background: true` yí padà sí ìṣiṣẹ́ sync pẹ̀lú ìkìlọ̀.
- **Ìṣàwárí ààlà irinṣẹ́ aláyípadà** — ń dín lílo àwọn olùpèsè kù nígbà tí iye irinṣẹ́ bá dé ààlà.
- **Ọ̀nà àfẹ́yìntì pàjáwìrì** — `OMNIROUTE_EMERGENCY_FALLBACK` ló ń ṣàkóso rẹ̀; àwọn alákóso lè yí i padà láti ojú-ewé Feature Flags láì tún iṣẹ́ náà bẹ̀rẹ̀.

---

## Ṣíṣe àwárí àti àtúnṣe àṣìṣe

- Àwọn ìdáhùn àkójọpọ̀ oníwọ̀n `503 all_targets_cooling_down` (`Retry-After` ti ṣètò, `diagnostics.excluded` sì ṣe àkójọ gbogbo ibi-àfojúsùn pẹ̀lú `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → a ti ṣètò pool náà, ó sì ti sopọ̀; gbogbo ibi-àfojúsùn ni a kàn yọ kúrò nítorí aago resilience kan; ìkìlọ̀ `[COMBO] Weighted selection: every target excluded before dispatch — …` ń sọ àwọn ìdí àti iye ìṣẹ́jú-àáyá tó kù. `404 no_executable_targets` láti inú àkójọpọ̀ kan náà túmọ̀ sí pé kò sí aago resilience kankan tó kópa (kò sí ohun tó lè ṣiṣẹ́, tàbí gbogbo account ló kùnà nígbà àyẹ̀wò availability). A kọ́ ọ sínú `open-sse/services/combo/pinRecovery.ts` láti inú àwọn ìyọkúrò tí a kójọ sínú `targetResolution.ts`.
- Gbogbo key fún provider kan ni a fo kọjá → ṣàyẹ̀wò ipò circuit breaker àti `rateLimitedUntil`/`testStatus` ti connection kọ̀ọ̀kan.
- A yọ provider kúrò títí láé lẹ́yìn àkókò reset → code ń ka `state` tààrà dípò `getStatus()`/`canExecute()`.
- Key kan kùnà, àwọn yòókù sì yẹ kí wọ́n ṣiṣẹ́ → yan connection cooldown dípò circuit breaker.
- Model kan ṣoṣo ló kùnà → yan model lockout dípò connection cooldown.
- Ó yẹ kí state padà bọ̀ sípò fúnra rẹ̀ ṣùgbọ́n kò ṣe bẹ́ẹ̀ → ṣàyẹ̀wò timestamp ọjọ́ iwájú àti read path tó ń sọ state tó ti parí di tuntun. Àwọn status tí kò lè yí padà nílò àtúnṣe pẹ̀lú ọwọ́.

---

## Ìdánimọ̀ TLS & Ìfarapamọ́

Ìfarapamọ́ tó jẹ́ ti olùpèsè kan pàtó (JA3/JA4, CCH, obfuscation) ní àkọsílẹ̀ lọ́tọ̀ — wo `docs/security/STEALTH_GUIDE.md` (git; a kò kó o sínú `/docs`).

---

## Ìdánwò ìfaradà (Ìpele 8 · Àkójọpọ̀ C)

Lẹ́yìn àwọn ìdánwò ẹyọ fún ọgbọ́n ìfaradà, ìdánwò mẹ́ta ń dán runtime wò lábẹ́
àwọn ipò másùnmáwo/ìkùnà gidi (gbogbo wọn jẹ́ ti integration/nightly — kò sí èyí tó ń dí àwọn PR lọ́wọ́):

| Ìdánwò      | Ohun tó ń ṣe                                                                                                                                                                          | Ìṣiṣẹ́                                    |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Chaos       | Node fake-upstream ń fi latency/reset/timeout/503 gidi sí i; ó ń fìdí rẹ̀ múlẹ̀ pé circuit breaker ṣí/gbọ́ padà bọ̀ sípò àti pé `checkFallbackError` ń pín 503 sí fallback tó lè bọ̀ sípò. | `RUN_CHAOS_INT=1 npm run test:chaos`     |
| Heap-growth | ~500 streams fún `createSSEStream` kọ̀ọ̀kan lábẹ́ `--expose-gc`; ó máa kuna bí heap bá dàgbà kọjá òrùlé ààlà (ààbò OOM #3069).                                                           | `npm run test:heap`                      |
| k6 soak     | Ẹrù tó ń bá a lọ lórí `/api/monitoring/health`; àwọn ààlà p95/àṣìṣe.                                                                                                                  | `k6 run tests/load/k6-soak.js` (nightly) |

`.github/workflows/nightly-resilience.yml` ló ń ṣètò rẹ̀ (cron + dispatch). Nínú
`test:integration` àìròtẹ́lẹ̀, chaos àti heap máa ń fo ara wọn (láìsí `RUN_CHAOS_INT`/`--expose-gc`).

---

## Wo Pẹ̀lú

- [Ìtọ́sọ́nà Fáájì Ètò](./ARCHITECTURE.md) — Fáájì ètò àti àwọn apá inú rẹ̀
- [Ìtọ́sọ́nà Olùlò](../guides/USER_GUIDE.md) — Àwọn olùpèsè, àwọn àkójọpọ̀, ìṣọ̀kan CLI
- [Ẹ́ńjìnnì Àkójọpọ̀ Aládàáṣe](../routing/AUTO-COMBO.md) — Ìṣirò olókùnfà 16, àwọn àkójọpọ̀ ipò
