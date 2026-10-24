# Resilience Guide (Yorùbá)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute ní àwọn ètò ìfaradà mẹ́ta tí ó yàtọ̀ sí ara wọn ṣùgbọ́n tí wọ́n ní í ṣe pẹ̀lú ara wọn. Ọ̀kọ̀ọ̀kan wọn ní àyíká àti ète rẹ̀ pàtò. Máa ya wọn sọ́tọ̀ nígbà tí o bá ń ṣe ìtúpalẹ̀ àṣìṣe lórí ìwà routing.

![àpẹẹrẹ ìfaradà ipele mẹ́ta](../diagrams/exported/resilience-3layers.svg)

> Orísun: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Circuit Breaker Olùpèsè

**Àyíká:** gbogbo olùpèsè (f.i., `glm`, `openai`, `anthropic`).

**Ète:** dáwọ́ rírán ìrìnàjò sí olùpèsè kan tí ó ń kùnà lẹ́ẹ̀kẹẹsì ní ipele upstream/iṣẹ́.

**Ìmúṣẹ̀:**

- Kíláàsì mọ́lẹ̀: `src/shared/utils/circuitBreaker.ts`
- Ìsopọ̀: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API ipò: `GET /api/monitoring/health`
- API àtúnṣètò: `POST /api/resilience/reset`
- Àwọn akópọ̀ (wrappers): `open-sse/services/accountFallback.ts`
- Tábìlì DB: `domain_circuit_breakers`

**Àwọn ipò:**

- `CLOSED` — ìrìnàjò déédéé jẹ́ gígàyọ̀
- `DEGRADED` — ìrìnàjò ṣì jẹ́ gígàyọ̀, ṣùgbọ́n a ń tọ́pa àwọn ikùnà olùpèsè tó ti pọ̀ sí i; ó máa padà sí `CLOSED` lẹ́yìn àwọn àṣeyọrí tó tó, lórí ìdánwò ìsopọ̀ tó péye, tàbí lẹ́yìn ìdídí `OPEN` tí ó pẹ́ jù lọ fún irú ikùnà gbèyìn (iye `cooldownByKind` rẹ̀, tàbí `resetTimeout` bí kò bá sí, × `maxBackoffMultiplier`, ó kéré jù cooldown kan) láìsí ikùnà tuntun
- `OPEN` — a ti dí olùpèsè lọ́wọ́ fún ìgbà díẹ̀; combo routing máa ń fò ó kọjá
- `HALF_OPEN` — àkókò àtúnṣètò ti lọ; ìbéèrè ìṣàkóso (probe) jẹ́ gígàyọ̀

**Àwọn àtòlábẹ̀rẹ̀ tí a lè ṣàtúnṣe (`open-sse/config/constants.ts`, tí a fi hàn ní Dashboard → Settings → Resilience):**

| Kíláàsì | Ó di DEGRADED ní | Ó ṣí OPEN ní | Àkókò àtúnṣètò |
| ------- | ---------------- | ------------ | -------------- |
| OAuth   | ikùnà 5          | ikùnà 8      | 60s            |
| API-key | ikùnà 7          | ikùnà 12     | 30s            |
| Local   | tí a yọ jáde     | ikùnà 2      | 15s            |

`degradationThreshold` ló ń darí àkókò tí olùpèsè yóò wọ `DEGRADED`; `failureThreshold` ló ń darí àkókò tí yóò ṣí OPEN tí a sì máa fò ó kọjá. A kò tíì fi àwọn profaili olùpèsè Local hàn lórí ojú-ìwé àwọn àtò Resilience ní báyìí.

**Àwọn kóòdù trip:** àwọn ipò ipele-olùpèsè nìkan `[408, 500, 502, 503, 504]`. MÁ ṢE dá trip fún àwọn àṣìṣe ipele-àkáǹtì (ọ̀pọ̀ jù lọ 401/403/429 — àwọn yẹn jẹ́ ti cooldown tàbí lockout).

**Ìmúpadàsẹ̀ lazy:** nígbà tí `OPEN` bá parí, `getStatus()`, `canExecute()`, `getRetryAfterMs()` máa ń ṣe àtúnjíṣe ipò náà sí `HALF_OPEN`. Àwọn ìkàwò kanna náà (àti ikùnà tó tẹ̀le) máa ń dín `DEGRADED` tí ó ti pẹ́ padà sí `CLOSED`. Kò sí ìnílò fún timer abẹ́lẹ̀.

---

### Provider Cooldown àgbáyé tí ó jẹ́ ìyàn (opt-in) (window gate)

Ipele kẹrin kan, tí ó jẹ́ **ìyàn** (`PROVIDER_COOLDOWN_ENABLED`, àtòlábẹ̀rẹ̀ rẹ̀ jẹ́ **off**), ń tọ́jú ìrántí kọjá-ìbéèrè ti àwọn olùpèsè tí ń kùnà nínú `open-sse/services/providerCooldownTracker.ts`, èyí tí ìyanju àfojúsùn combo ń gbèrò lọ́wọ́, kí àwọn ìbéèrè combo tó tẹ̀le ara wọn lè dáwọ́ rínrìn padà lórí olùpèsè kan tó ṣẹ̀ṣẹ̀ kùnà. Àwọn ẹ̀yọ ipele-olùpèsè ń tẹ̀lé window gate ti `PROVIDER_PROFILES`:

| Profaili | dá trip lẹ́yìn (`providerFailureThreshold`) | nínú (`providerFailureWindowMs`) | ń tutù fún (`providerCooldownMs`) |
| -------- | -----------------------------------------: | -------------------------------: | --------------------------------: |
| OAuth    |                                       `10` |                          `15min` |                            `5min` |
| API key  |                                       `15` |                          `30min` |                           `10min` |

Lábẹ́ ààlà náà, a **kò** ka olùpèsè náà sí ẹni tó ń tutù; àṣeyọrí kan máa ń pa window náà rẹ́. Àwọn ẹ̀yọ ipele-ìsopọ̀ (`provider:connectionId`) máa ń lo backoff exponential ti `minRetryCooldownMs → maxRetryCooldownMs` dípò èyí. Àwọn ìbófinró (overrides): `OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`. Àbò àtúnbòwò (regression guard): `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Àkókò Ìdádúró Ìsopọ̀ (Connection Cooldown)

**Àyíká:** ẹ̀yọ ìsopọ̀/àkáǹtì/kókó olùpèsè kan ṣoṣo.

**Ète:** láti fò kókó kan tó burú jáde níwọ̀n ìgbà tí àwọn ìsopọ̀ mìíràn fún olùpèsè kannáá bá ń tẹ̀síwájú ní sísìn.

**Ìmúṣe:**

- Sí samisi pé kò sí: `src/sse/services/auth.ts::markAccountUnavailable()`
- Yíyàn: `getProviderCredentials*` nínú fáìlì kannáá
- Ìṣirò àkókò ìdádúró: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Àwọn ètò: `src/lib/resilience/settings.ts`

**Àwọn ọ̀rọ̀ fún ìsopọ̀ kọ̀ọ̀kan:**

- `rateLimitedUntil` — àkókò tí ìdádúró yóò parí
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — àkáwọ̀ ìdákẹ́jẹ exponential

**Àwọn àkókò ìdádúró àtẹ́lẹ̀mọ́lẹ̀:**

- Ìpìlẹ̀ OAuth: 5s
- Ìpìlẹ̀ kókó API: 3s
- API-key 429: ó fẹ́ràn àwọn àkọlé `Retry-After`/reset ti upstream tàbí ọ̀rọ̀ reset tí a lè ṣàyẹ̀wò
- Ìdákẹ́jẹ: `baseCooldownMs * 2 ** failureIndex`

**Ààbò lódì sí àjàkálẹ̀ àwọn ìbáṣepọ̀ ẹjọ́ (anti-thundering-herd):** ó dí àwọn àìsí àpapọ̀ lọ́wọ́ láti fa gbígburú ìdádúró àti láti ṣe ìfikún ẹ̀mejì sí `backoffLevel`.

**Àwọn 429 ìdíwọ́ ìpapọ̀ kò gun ọnà ìdákẹ́jẹ.** `429` kan tí ara rẹ̀ bá ń járì pé òpin ìpapọ̀ ni
("too many concurrent requests", "concurrency limit", "parallel request
limit", GLM `并发数过高`) túmọ̀ sí pé àkáǹtì náà wà láyè ṣùgbọ́n ó ń ṣiṣẹ́ lọ́pọ̀.
`checkFallbackError()` ń dá ìdí `concurrency_limited` padà: yí padà sí ìsopọ̀ tó tẹ̀le ní
lẹ́sẹ̀kẹsẹ̀, dá èyí dúró fún `CONCURRENCY_LIMIT_COOLDOWN_MS` tó dúró (1s) tàbí àbá
ìtúnṣe ti upstream, fi `backoffLevel` sílẹ̀ láìyí padà, kí o sì ṣètò `skipProviderBreaker`.
Ara ìkéde quota tó kedere ṣì ní àṣẹ, nítorí náà ara tí ó bá tún bá ìlànà quota mu ń dúró
gẹ́gẹ́ bí ìdájọ́ quota. Ẹ̀wárí: `looksLikeConcurrencyLimit()` nínú `src/shared/utils/classify429.ts`;
ìdájọ́: `open-sse/services/accountFallback/concurrencyLimit429.ts`. `classify429()` (`FailureKind` ti
breaker) kò yí padà ó sì ṣì ń ka `rate_limit` fún àwọn ara wọ̀nyí.

**Àìsí ìtàn inú ẹ̀rọ̀ kò dá àkáǹtì dúró.** Nígbà tí adáwọ́lé àìtàn inú ẹ̀rọ̀
(`open-sse/utils/streamHandler.ts`) bá faradà lórí ẹ̀rọ̀ tí kò rán èsì àtiṣẹ́ awoṣe ní
àkókò tó yẹ, `markAccountUnavailable()` ń gbé àṣìṣe náà kalẹ̀ lórí ìsopọ̀ náà ṣùgbọ́n kò
ṣètò ìdádúró kankan: àìtàn náà jẹ́ ti ìbéèrè yẹn, ó jẹ́ ìyípadà ẹ̀rọ́ (reasoning) gígùn láìsí èsì
kankan ní ọ̀pọ̀ ìgbà. Àwọn aláṣàáṣíṣẹ́ lè tún ṣí i padà pẹ̀lú `resilienceSettings.streamStallCooldown.enabled`
(àtẹ́lẹ̀mọ́lẹ̀ `false`).

**Àwọn fireemu reasoning ń tún ìṣirò àìtàn inú ẹ̀rọ̀ bẹ̀rẹ̀ tuntun.** Awoṣe reasoning lè rọ́
fún ọ̀pọ̀ ìṣẹ́jú kó tó rán àmi àkọ́kọ́ tó hàn: Claude ń ṣíwọ̀n àwọn fireemu `thinking_delta` tí ọ̀rọ̀
ẹ̀rọ́ wọn lè ṣòfo, Responses API sì ń ṣíwọ̀n ohun èlò reasoning lẹ́yìn òmíràn.
`isReasoningProgressFrame()` (`open-sse/utils/streamReadiness.ts`) ń mọ̀ àwọn fireemu
wọ̀nyí, adáwọ́lé sì ń tún ìṣirò rẹ̀ bẹ̀rẹ̀ lórí ọ̀kọ̀ọ̀kan wọn dípò dídá ìyípadà náà dúró. Wọn kò
ṣì jẹ́ èsì awoṣe, nítorí náà ìyípadà tí ó bá parí pẹ̀lú reasoning nìkan ṣì ń jàrì bí òfo, àti
ìyípadà tí ó bá dáwọ́ reasoning dúró tí ó sì ń rán àwọn heartbeat nìkan ṣì ń fa adáwọ́lé.

Àwọn fireemu ìkọ̀sẹ̀dáyé `reasoningContentEvent` ti Kiro pẹ̀lú ìfọwọ́sí tí kò ṣòfo ń pa
ìṣẹ̀ṣe reasoning yìí mọ́lẹ̀ nípasẹ aláṣàáṣe gẹ́gẹ́ bí delta `reasoning_content` òfo. A kò rán
ìfọwọ́sí náà lọ síwájú. Metadata, àwọn fireemu àìpé àti àwọn ìfọwọ́sí òfo kò tún ìṣirò inú
ẹ̀rọ̀ bẹ̀rẹ̀; àkókò ìparí ẹ̀rọ̀-aláṣiṣẹ́ ọmọlúwàbí àti ìfagi lé ẹ̀bá sì ń ṣiṣẹ́
(`open-sse/executors/kiro/reasoning.ts`).

**Àwọn ipò ìparí (KÌ Í ṢE àwọn ìdádúró):**

- `banned` — ṣètò nípasẹ ẹ̀wárí ọ̀rọ̀-àkọlé àdínkù / dílílí àkáǹtì (wò [BAN_DETECTION](../security/BAN_DETECTION.md)), àti nípasẹ àwọn ìkọ̀ sílẹ̀ ìbéèrè-lẹ́ẹ̀kọ̀ọ̀kan mẹ́ta lẹ́sẹ̀kẹsẹ̀lẹ́sẹ̀kẹsẹ̀ (`request_rejected`, bí i Anthropic OAuth 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`); ìkọ̀ kan ṣoṣo ń dá ìsopọ̀ náà dúró nìkan
- `expired` (ó ń yí padà sí ìparí lẹ́yìn àwọn ìtúnṣe tó ní ààlà — `EXPIRED_RETRY_MAX = 3` pẹ̀lú ìdákẹ́jẹ exponential — nítorí náà àwọn àṣìṣe OAuth ìgbà díẹ̀ lè wọ́ tiwọn kí àkáǹtì tó dí lẹ́múlẹ̀ pátápátá)
- `credits_exhausted`

Àwọn wọ̀nyí ń dúró títí tí àwọn ẹ̀rí-ìdánimọ̀ yóò fi yí padà tàbí tí aláṣàáṣíṣẹ́ bá tún wọ́n ṣe. Má ṣe kọ àwọn ipò ìparí lẹ́kọ̀ọ́ pẹ̀lú ipò ìdádúró ìgbà díẹ̀.

**Ìmúpadàbọ̀ aláìníní (lazy):** nígbà tí `rateLimitedUntil` bá ti kọjá, ìsopọ̀ ń di ẹlẹ́bẹ̀rẹ̀ lẹ́ẹ̀kejì. Nígbà lílò aṣeyọrí, `clearAccountError()` ń pa gbogbo àwọn ọ̀rọ̀ àṣìṣe rẹ́.

### Odi ìlòmìnú Claude OAuth: ọ̀nà pàtàkì-díẹ̀ + àtúnṣètò ìwọ̀ntúnwọ̀nsì ìgbà

**Àyíká:** ẹ̀yọ ìforúkọsílẹ̀ Claude (OAuth) kan. Àwọn ẹ̀yà méjèèjì jẹ́ **ìyàn-lórí-ìsopọ̀-kọ̀ọ̀kan**
(Ṣàtúnṣe ìsopọ̀ → abala Claude → `lowPriorityMode` / `autoLimitReset` nínú
`providerSpecificData`, àtẹ́lẹ̀mọ́lẹ̀ méjèèjì pa) wọ́n sì dá àwọn àṣẹ `/low-priority` àti
`/limit-reset` ti Claude Code lẹ́bọ̀ (àdéhùn wire tí a mú kúrò lára Claude Code 2.1.263).

**Ìmúṣe:**

- Ẹ̀rọ ipò + ìṣàtúláì èsì: `open-sse/services/claudeLowPriority.ts`
- Ọ̀nàdúrà ipò/ìfìsílẹ̀ àtúnṣètò: `open-sse/services/claudeLimitReset.ts`
- Ọ̀nà aláṣàáṣe (ìfikún àkọlé + ìtúnṣe àkáǹtì kannáá): `open-sse/executors/base.ts::execute()`
- Ìtọ́jú ìyàn: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Ohun tó ń fa a:** odi ìlòmìnú wákàtí márùn-ún — `429` kan tí àwọn àkọlé rẹ̀ ń gbé
`anthropic-ratelimit-unified-status: rejected` àti, nígbà tí àkáǹtì bá ṣe é ṣe,
`anthropic-ratelimit-unified-slow-offer: treatment`. A kò rán nǹkan kankan ṣáájú odi 429 àkọ́kọ́ yẹn;
ìbáwí 429 kan láìsí àwọn àkọlé unified ń lọ nípasẹ ọ̀nà ìdádúró deédéé.

**Ọ̀nà pàtàkì-díẹ̀** (`lowPriorityMode`):

- Ní òdí 429, olùmúṣe náà gba ìfilọ́lẹ̀ náà kí ó sì tún gbìyànjú lẹ́sẹ̀kẹsẹ̀ lórí account **kannáà** pẹ̀lú `anthropic-usage-limit: slow`; ọ̀nà náà máa ṣì ṣiṣẹ́ títí dé `anthropic-ratelimit-unified-reset` tí wọ́n kéde (+60s àkókò àfikún), gbogbo ìbéèrè sì máa ru àkòrí náà nínú fèrèsé yẹn. 429 tí wọ́n dí lọ́wọ́ kò dé `handleChatCore` rárá, nítorí náà kò sí bí wọ́n ṣe fi ìsopọ̀ náà sínú ìtúlẹ̀ **rárá**, bẹ́ẹ̀ ni a kò yí í padà kúrò.
- `anthropic-ratelimit-unified-slow-status` lórí àwọn ìdáhùn tó tẹ̀le: `active` / `not_needed` máa pa ọ̀nà náà mọ́; `slot_busy` (429) tàbí `529` kan máa dúró fún `anthropic-ratelimit-unified-slow-retry-after` ti server (àtòwọ́dá 20s, ààlà 5–600s, ±30% ìyípadà lọ́jìnì) kí ó sì tún gbìyànjú, tí ààlà rẹ̀ jẹ́ `anthropic-ratelimit-unified-slow-max-wait` (àtòwọ́dá ìṣẹ́jú ogún, ààlà ìṣẹ́jú kan–wákàtí mẹ́fà) — lẹ́yìn èyí, ọ̀nà náà máa parí, ìtúlẹ̀ ìṣẹ́jú mẹ́wàá sì máa dì àtúngba lẹ́ẹ̀kejì. A tún fi ààlà kún ìdúró náà pẹ̀lú ohun tó kù nínú àkókò ìbẹ̀rẹ̀ òdò-oke ti ìbéèrè náà fúnra rẹ̀ (`resolveFetchStartTimeout`, ìṣẹ́jú mẹ́wàá lọ́nà àtòwọ́dá) yó sì kù àyè 5 s: láìsí ààlà yẹn, ìdúró-jùlọ àtòwọ́dá ìṣẹ́jú ogún lè pẹ́ ju ìbéèrè náà lọ, wọ́n sì lè dáwọ́ ìsùn náà dúró láàrin ìdúró, èyí sì lè fi `TimeoutError` han dípò ìparí `max_wait` tó rọrùn + ìtúlẹ̀.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, ìyípo fèrèsé wákàtí márùn-ún kan, tàbí `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (tó parí í gẹ́gẹ́ bí `extra_usage` lórí ipò èyíkéyìí, níwọ̀n ìgbà tí ìlò-àfikún oní-sànán bá ti bo òdí náà) máa parí ọ̀nà náà; ìdáhùn náà sì máa ṣàn sí ọ̀nà ìtúlẹ̀ déédéé lẹ́yìn náà. A máa rántí `budget_exhausted` títí dé àtúntò ìsúná tí wọ́n kéde (≤ ọjọ́ mẹ́jọ).
- Àyẹ̀wò òdí náà máa ṣiṣẹ́ lẹ́yìn àwọn àtúngbìyànjú inú-ìgbìyànjú tó ní 400 múlẹ̀ ti olùmúṣe fúnra rẹ̀ (àtúnṣe context, ààlà ìrònú/ìsapá, ìkẹ̀kọ̀ọ́-ara-ẹ̀rọ param), nítorí náà òdí 429 tí ó bá fara han nìkan lórí ọ̀kan lára àwọn àtúngbìyànjú wọ̀nyí, wọ́n á ṣì dí í lọ́wọ́ dípò kí ó dé ọ̀nà ìtúlẹ̀.
- Ipò wà nínú ìrántí fún ìsopọ̀ kọ̀ọ̀kan (àtúnbẹ̀rẹ̀ kan máa ná ọ̀kan òdí 429 àfikún láti tún gba àdéhùn náà).

**Àtúntò ààlà ìjòkóó** (`autoLimitReset`, tí a gbìyànjú ṣáájú ọ̀nà náà nígbà tí méjèèjì bá ṣiṣẹ́):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → àkópọ̀ `juniper_tide`; nígbà tí `arm: "reset"` àti `available: true` bá wà,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` pẹ̀lú
  `{ "program": "juniper_tide" }` (UUID agbájọ́ láti
  `providerSpecificData.organizationUUID`, àtìpadàsẹ́yìn bootstrap).
- `result: reset|not_limited` → a tún ìbéèrè náà gbìyànjú ní ìyára kíkún (láìsí àkòrí slow).
  `already_used` / `not_offered` máa rántí `next_available_at` (àtòwọ́dá ọ̀sẹ̀ kan); ikùnà kankan máa dáàbò padà fún ìṣẹ́jú mẹ́ẹ̀ẹ́dógún. Àtúntò náà jẹ́ ẹ̀ẹ̀kan ní ọ̀sẹ̀ kan, ó sì ṣì kó ka sínú ààlà ọ̀sẹ̀ náà.

Àwọn ààbò àyẹ̀wò ìpadàbọ̀sẹ̀lẹ̀: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Ìfẹ́sowọ́pọ̀ ìjòkóó (#7274)

**Àyíká:** ìjòkóó aláàbàáṣiṣẹ́ kan (àkòrí `X-Session-Id` / `x-codex-session-id` / `x-omniroute-session`) tí a fì mọ́ ìsopọ̀ kan, fún olùpèsè **èyíkéyìí**.

**Ète:** láti pa aṣojú ọ̀pọ̀-ìyí (Claude Code, aider, àwọn aṣojú àṣàwárí) lórí account kannáà kọjá àwọn ìbéèrè, dídínkù ìpòadanù context kọjá-account àti àwọn 429 ìbẹ̀rẹ̀-tútu àtúntúnṣe lórí àwọn olùpèsè pẹ̀lú ipò ìjòkóó oní-account.

**Ìmúṣe:**

- Ìyànúsọ TTL: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Ìyàn/ìṣẹ̀dá fìlẹ̀: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Ìyọ àkòrí (gbogbogbò, olùpèsè èyíkéyìí): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Tábìlì fìlẹ̀ tí a pamọ́ sílẹ̀: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Ètò: `sessionAffinityTtlMs` (TTL gbogbo nínú ms, `0` máa pa á rárá) — `src/lib/db/settings.ts`. Tí a sọ ọ́ padà láti `codexSessionAffinityTtlMs` tí ó jẹ́ ti Codex-nìkan nípasẹ̀ ìrìn `124_generic_session_affinity_ttl.sql`, tó gbé TTL Codex kankan tí wọ́n ti ṣètò tẹ́lẹ̀ kalẹ̀ gẹ́gẹ́ bí àtòwọ́dá tuntun.

Ṣáájú #7274, `resolveSessionAffinityTtlMs()` máa dáwọ́ dúró tàbítàbí sí `0` fún gbogbo olùpèsè àyàfi `codex`, nítorí náà ètò TTL náà (àti àwọn àkòrí ìjòkóó) kò ní ipa ní ibi mìíràn bíotilẹ̀jọ pé èròjà fìlẹ̀ àti ìyọ àkòrí ti jẹ́ aláìfarapa-olùpèsè tẹ́lẹ̀. Àtúnṣe náà yọ ìpadà-tété yẹn kúrò; TTL sì máa lo ní bákan náà sí gbogbo olùpèsè lẹ́yìn tí a bá ṣètò ọ́ lóde gbogbo lòke `0`.

A kò rán àwọn àkòrí ìfẹ́sowọ́pọ̀-ìjòkóó mẹ́ta wọ̀nyí lọ sí òdò-oke rárá — àwọn olùmúṣe máa kọ àwọn àkòrí òdò-oke tiwọn láti ìbẹ̀rẹ̀ dípò lílò àwọn àkòrí aláàbàáṣiṣẹ́ bí wọ́n ṣe wá, nítorí náà èyí ṣì máa dúró gẹ́gẹ́ bí id ìbáṣepọ̀ inú nìkan.

### Àwọn àdéhùn-ìlò ìsopọ̀ ìjòkóó aláṣàkóso pàtọ̀

**Àyíká:** aláàbàáṣiṣẹ́/ìjòkóó HTTP aláṣàkóso kan ṣóṣó tó ń ṣiṣẹ́ ni ó ní ìsopọ̀ OmniRoute kan ṣóṣó tó yẹ.

**Ète:** láti pèsè ìní ìsopọ̀ pàtọ̀ tó lágbára fún àwọn aláàbàáṣiṣẹ́ tí wọ́n nílò ọ̀gbà ìtọ́sọ́nà lile
kọjá àwọn ìbéèrè. Èyí yàtọ̀ sí ìfẹ́sowọ́pọ̀ ìjòkóó, tó jẹ́ àyàn ìtẹ̀síwájú rọ̀rọ̀:
àdéhùn-ìlò pàtọ̀ máa pa ipò ìyípo-ìgbésí-ayé mọ́ nínú SQLite, ó máa múni ẹyọtọ oníní-nṣiṣẹ́ àti
ìsopọ̀-nṣiṣẹ́ lóde gbogbo, ó sì máa kọ̀ ìran àtijọ́ ṣáájú ìfiránṣẹ́ olùpèsè.

Ẹ̀yà ẹrọ yìí jẹ́ àyàn-wọlẹ̀ fún API key kọ̀ọ̀kan. Kòkòrọ́ aláṣàkóso gbọdọ̀ ní àyíká `lease:exclusive` àti
àkójọ `allowedConnections` kedere tí kò ṣófo. Aláàbàáṣiṣẹ́ HTTP èyíkéyìí lè lo opin ìyípo-ìgbésí-ayé náà; kò sí
orúkọ aláàbàáṣiṣẹ́, aṣojú-olùlò, olùpèsè, ọ̀nà OAuth, tàbí àpẹẹrẹ tí a nílò. Àdéhùn-ìlò náà ní ìsopọ̀ ni,
kì í ṣe àpẹẹrẹ, nítorí náà ìyípadà àpẹẹrẹ máa pa ìdè náà mọ́ níwọ̀n ìgbà tí ìsopọ̀ náà bá ṣì yẹ ní
deédéé. Àwọn òfin àpẹẹrẹ, ipin, ìlera, ìtúlẹ̀, àti àkójọ-ààyè deédéé ṣì jẹ́ aláṣẹ, wọ́n sì lè
yí ìran kannáà lọ sí ìsopọ̀ mìíràn tó yẹ tó sì wà lọ́fẹ̀ẹ́.

Ìtẹ̀síwájú ìgbésí ayé rẹ̀ ni `POST /api/v1/session-leases` pẹ̀lú àwọn ìṣe JSON `acquire`, `renew`, àti `release`.
Àwọn ìbéèrè inference tí a ń darí máa ń fi iye `X-OmniRoute-Lease-Owner` tí kò ṣe kedere àti
`X-OmniRoute-Lease-Generation` tó pé gan-an hàn. Olùní lowó náà ń lo `vlo_` tí àwọn lẹ́tà base64url mẹ́rìnlélógójì (43) ń tẹ̀le; hash SHA-256 rẹ̀ nìkan ni a máa ń pamọ́ sílẹ̀. Gbogbo ààlà dispatch ìkẹyìn tún so ID kọ́kọ́rọ́ API tí a fìdí rẹ̀ múlẹ̀ àti
ID ìsopọ̀ tó ń ṣiṣẹ́ pọ̀. A yọ àwọn àkọlé ìṣàkóso lease kúrò nínú àwọn àkọsílẹ̀, àwọn àwòrán ìbéèrè tí a dáàbò bo, àti
àwọn àkọlé executor òdò ìwájú.

Tí ìtọ́nisònà déédéé bá ní àwọn olùdíje managed tí ó yẹ, ṣùgbọ́n gbogbo olùdíje òfìn bá wà lábẹ́
lease àjèjì tó ń ṣiṣẹ́, OmniRoute máa dá HTTP `429` padà, kóòdù lease-capacity-unavailable,
ipò waiting-for-capacity, àti `Retry-After` tó ní ààlà tí wọ́n gba láti ìparí tó jọ́kọ́tọ́ síwájú.
Ìkòdúró olùdíje déédéé kì í ṣe ariyanjiyan lease, ó sì tẹ̀síwájú pẹ̀lú ìtumọ̀ àṣìṣe ìtọ́nisònà tó ti wà tẹ́lẹ̀.

Àwọn èròjà tó jọra ṣì wà lọ́tọ̀:

- Ìlò ilé ìjoko OAuth ni pínpín rọ̀rọ̀ inú ilànà fún àwọn àkàntì OAuth.
- Àwọn semaphore àkàntì máa ń fúnni láàyè ṣíṣe àwọn ìbéèrè lọ́papọ̀, wọ́n sì máa ń parí nígbà tí ìbéèrè bá parí.
- Àwọn lease ilé ìjoko managed ẹyọ kan ṣoṣo ni níní ìgbésí ayé tó lágbára pẹ̀lú ààlà ìran.

---

## 3. Ìdènà Àwòṣe

**Ìbúgbòòrò:** olùpèsè + ìsopọ̀ + àwòṣe mẹ́ta.

**Ìbúgbòòrò kọ́kọ́rọ́ gẹ́gẹ́ bí ipò:** ipò tó kùnà ló pinnu kọ́kọ́rọ́ tí ìdènà yóò kọ sí
(`resolveLockoutScope()` nínú `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — àmì ìpín tàbí ẹ̀tọ́ lílò — dí **ẹbí ìpín**:
  fún codex, gbogbo ìbúgbòòrò `codex` / `spark` (gbogbo àwòṣe `gpt-5*` ti
  ìsopọ̀ náà), fún àwọn olùpèsè míì `getQuotaScopedModelForProvider()`.
- `404` máa ń dí àwòṣe náà nìkan (`getModelLockKey()` dín `not_found` kù).
- Ipò míì èyíkéyìí — àwọn ìkùnà ìgbékarí/olùpèsè `5xx` àti `502` tí OmniRoute
  fúnra rẹ̀ ṣẹ̀dá láti inú ìmúdájú dídára — máa ń dí ìṣùpọ̀
  olùpèsè/ìsopọ̀/àwòṣe **gẹ́lẹ́** nìkan. Ìṣàn búburú lórí àwòṣe kan kì í ṣe ẹ̀rí
  nípa ìpín àkọọ́lẹ̀ náà; ṣáájú òfin yìí, ìdáhùn òfo kan lórí
  `codex/gpt-5.6-luna` máa ń yọ gbogbo àwòṣe `gpt-5*` ti ìsopọ̀ náà kúrò nínú
  ìtọ́sọ́nà fún ìṣẹ́jú 2–30 (tí ó ń pọ̀ sí i), nígbà tí ìpín rẹ̀ kò ní ìyípadà.
- Àṣàyàn `scope` tí olùpè bá sọ ní kedere máa ń borí nígbà gbogbo (Antigravity ń fi `"exact"` ránṣẹ́).

**Ète:** láti yàgò fún pípa gbogbo ìsopọ̀ kan nígbà tí àwòṣe kan ṣoṣo ni kò sí tàbí tí ìpín rẹ̀ ti ní ààlà.

**Àwọn àpẹẹrẹ:**

- Àwọn olùpèsè ìpín-fún-àwòṣe tí ń dá `429` padà
- Àwọn olùpèsè agbègbè tí ń dá `404` padà fún àwòṣe kan tí kò sí
- Àwọn ìkùnà àṣẹ fún ipò/àwòṣe pàtó sí olùpèsè (fún àpẹẹrẹ, àwọn ipò Grok)

**Ìmúṣẹ:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Pátákó Ìṣàkóso Àkókò Ìsinmi Àwòṣe (v3.8.0)

UI: Ètò → Àwọn Àkókò Ìsinmi Àwòṣe (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Ó ṣe àtòjọ àwọn ìdènà tó ń ṣiṣẹ́ pẹ̀lú: olùpèsè, ìsopọ̀, àwòṣe, ìdí, expiresAt. Àwọn olùṣàkóso lè tún àwòṣe kan mú ṣiṣẹ́ pẹ̀lú ọwọ́ láti inú káàdì náà.

**REST API:**

- `GET /api/resilience/model-cooldowns` — ṣe àtòjọ àwọn ìdènà tó ń ṣiṣẹ́
- `DELETE /api/resilience/model-cooldowns` — tún un mú ṣiṣẹ́ pẹ̀lú ọwọ́. Ara: `{provider, connection, model}`. Ìfàṣẹsí: ìṣàkóso.

### Olùṣàkóso Àkókò Ìsinmi

UI: Àbójútó → Olùṣàkóso Àkókò Ìsinmi (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

Ojú-ewé kan fún gbogbo ìsopọ̀ tí a yọ kúrò nínú ìtọ́sọ́nà fún ìdí ìgbà díẹ̀, dípò
ṣíṣí ojú-ewé olùpèsè kọ̀ọ̀kan. Ó ṣe àtòjọ àwọn àkókò ìsinmi ìsopọ̀, àwọn ìdènà àwòṣe àti
àwọn ipò ìgbẹ̀yìn, ó sì ń pa wọ́n rẹ́ fún ìsopọ̀ kọ̀ọ̀kan, fún àṣàyàn kan, tàbí fún gbogbo ìsopọ̀ olùpèsè kan,
ó tún ń ṣàtúnṣe àwọn òfin àkókò ìsinmi tí a máa ń ṣàtúnṣe jù lọ: `streamStallCooldown.enabled` àti àkókò ìsinmi ìpìlẹ̀
`connectionCooldown` fún OAuth / kọ́kọ́rọ́ API àti iye ìgbésẹ̀ ìfàsẹ́yìn tó pọ̀ jù (tí a ń fi pamọ́ nípasẹ̀
`PATCH /api/resilience`). Àwọn ipò ìgbẹ̀yìn (`banned`, `expired`, `credits_exhausted`) wà nínú
àtòjọ ṣùgbọ́n a kì í pa wọ́n rẹ́ níbí.

**REST API** (`src/lib/resilience/cooldownManager.ts`, ìfàṣẹsí: ìṣàkóso):

- `GET /api/resilience/cooldowns[?provider=]` — àwọn ìsopọ̀ pẹ̀lú ipò, àkókò ìsinmi tó kù,
  ìpele ìfàsẹ́yìn, irú àṣìṣe tó ṣẹ̀yìn jù àti àwọn ìdènà àwòṣe (láìsí ẹ̀rí ìdánimọ̀)
- `POST /api/resilience/cooldowns` — ara `{connectionIds: string[]}` tàbí
  `{all: true, provider?}`; ó dá `{cleared, unchanged, skippedTerminal, lockoutsCleared}` padà

### UI ètò ìdènà + ìmúpadàbọ̀ ìdínkù-lẹ́yìn-àṣeyọrí (v3.8.23)

Ìdènà àwòṣe yí padà láti ìhùwàsí aláìyípadà tó máa ń ṣiṣẹ́ nígbà gbogbo sí ẹya tí a lè
tò ní kíkún, tí a gbọ́dọ̀ yàn láti mú ṣiṣẹ́, pẹ̀lú káàdì ètò tirẹ̀ àti ọ̀nà ìmúpadàbọ̀ tó ń tún ara rẹ̀ ṣe.

**Káàdì ètò:** Ètò → Ìdènà Àwòṣe
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Èyí **yàtọ̀** sí `ModelCooldownsCard` kíkà-nìkan tó wà lókè (èyí tí ó kan
_ṣe àtòjọ_ àwọn ìdènà tó ń ṣiṣẹ́) — káàdì tuntun náà _ń ṣètò àwọn àlàyé ìṣàkóso_. Àwọn iye àìyípadà
wà nínú `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Ètò                     | Iye àìyípadà                     | Ìtumọ̀                                                                        |
| ----------------------- | -------------------------------- | ---------------------------------------------------------------------------- |
| `enabled`               | `false`                          | Yíyàn àgbà — ìdènà àwòṣe **wà ní pípa nípa àìyípadà**.                       |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Àwọn ipò láti orísun òkè tí a kà sí ìkùnà tó ní ìbúgbòòrò àwòṣe.             |
| `baseCooldownMs`        | `120_000` (120 s)                | Gígùn ìdènà àkọ́kọ́ fún ìkùnà àkọ́kọ́.                                           |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Ààlà tó ga jù fún àkókò ìsinmi tó ń pọ̀ sí i.                                 |
| `maxBackoffSteps`       | `10`                             | Iye ìgbésẹ̀ ìfàsẹ́yìn onírúpo tó pọ̀ jù.                                        |
| `useExponentialBackoff` | `true`                           | Bóyá àwọn ìkùnà tó ń tún ṣẹlẹ̀ yóò mú kí àkókò ìsinmi pọ̀ sí i ní ọ̀nà onírúpo. |

Àwọn ètò máa ń dúró nípasẹ̀ ibi ìpamọ́ ètò déédéé, wọ́n sì ń jẹ́rìí nípasẹ̀
àwòrán ètò ìfaradà; káàdì náà ń fi ààlà sí `baseCooldownMs`/`maxCooldownMs`
(pẹ̀lú `maxCooldownMs ≥ baseCooldownMs`) àti `maxBackoffSteps`.

**Ìmúpadàbọ̀ ìdínkù-lẹ́yìn-àṣeyọrí:** ìmúpadàbọ̀ **kì í ṣe** pípé àkókò nìkan. Ìdáhùn
tó ní ìlera máa ń dín iye ìkùnà àwòṣe náà kù díẹ̀díẹ̀, kí àwòṣe kan tó bọ̀ sípò
láàárín àkókò má bàa tẹ̀síwájú láti pọ̀ sí i (kí ó sì yọ ìdènà náà) ṣáájú kí aago rẹ̀ tó pé. Lórí ibi àfojúsùn
àpapọ̀ tó ṣàṣeyọrí, `open-sse/services/combo.ts` máa ń pe `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), èyí tí ó **pín** `failureCount` tí a fi pamọ́
**sí ìdajì** (`Math.floor(failureCount / 2)`); nígbà tí ó bá dé `0`, a pa àkọsílẹ̀ ìdènà náà
rẹ́ pátápátá. Ẹlẹgbẹ́ rẹ̀ `recordModelLockoutFailure()`
ń fi kún iye náà (ó sì ń mú àkókò ìsinmi pọ̀ sí i) nígbà àwọn ìkùnà tó wáyé láàárín
àkókò ìmúpọ̀sí. Ìdínkù-lẹ́yìn-àṣeyọrí yìí jẹ́ àfikún sí pípé àkókò lásán —
ọ̀nà méjèèjì lè tún àwòṣe kan mú ṣiṣẹ́.

**Ipò:** a ń pa àwọn ìdènà mọ́ **nínú ìrántí** (àwọn `Map` ti iṣẹ́-ọ̀nà kọ̀ọ̀kan fún
`ModelLockoutEntry` tí `provider:connectionId:model` jẹ́ kọ́kọ́rọ́ wọn, àwọn ìdènà ìbúgbòòrò-gẹ́lẹ́ sì ní
`provider:connectionId:exact:model`), a kò fi wọ́n pamọ́ sínú
DB — wọ́n máa ń sọnù nígbà àtúnbẹ̀rẹ̀. A ń fi _àwọn ètò_ pamọ́; _ipò_ ìdènà
tó ń ṣiṣẹ́ jẹ́ ti ìgbà díẹ̀.

---

## 4. Ìṣàkóso Ìṣiṣẹ́pọ̀ Quota-Share (v3.8.36)

Àwọn àkọọ́lẹ̀ ìforúkọsílẹ̀ (GLM, MiniMax, abbl.) sábà máa ń gba nǹkan bí ìbéèrè
~1–3 péré ní àkókò kan náà; fífi ju bẹ́ẹ̀ lọ ń fa 429 àti àwọn àkókò ìdádúró.
Èyí le gan-an lábẹ́ àwọn àkójọpọ̀ **quota-share** (`qtSd/…`), níbi tí ọ̀pọ̀
kọ́kọ́rọ́ API ti ń pín àkọọ́lẹ̀ iṣẹ́ òkè kan náà. Ìpele mẹ́ta ló ń dáàbò bo
àkọọ́lẹ̀ tí a jọ ń lò kí ìbéèrè má bàa kún inú rẹ̀ kọjá ààlà.

### Ààlà ìṣiṣẹ́pọ̀ fún asopọ̀ kọ̀ọ̀kan (`max_concurrent`)

Asopọ̀ olùpèsè kọ̀ọ̀kan lè sọ ààlà `max_concurrent` kan
(`provider_connections.max_concurrent`, tí a ṣètò nínú fèrèsé asopọ̀ / API / DB).
Fi í sílẹ̀ ní òfo tí o kò bá fẹ́ ààlà. Èyí ni ìṣàkóso kan ṣoṣo tó ń darí ìpele
títẹ̀lé-lẹ́sẹẹsẹ ní ìsàlẹ̀ — ṣètò rẹ̀ sí iye ìṣiṣẹ́pọ̀ gidi ti àkọọ́lẹ̀ náà
(fún àpẹẹrẹ, GLM ~1, MiniMax ~2).

### Àwọn ààlà ìṣiṣẹ́pọ̀ fún awoṣe kọ̀ọ̀kan (`modelConcurrency`)

Asopọ̀ kan tún lè sọ àwọn ààlà ìṣiṣẹ́pọ̀ pàtó fún awoṣe kọ̀ọ̀kan
nínú máàpù `rateLimitOverrides` rẹ̀:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Ṣètò rẹ̀ nínú fèrèsé asopọ̀ (**Àwọn àtúnṣe ààlà oṣùwọ̀n → Àwọn ààlà
ìṣiṣẹ́pọ̀ fún awoṣe kọ̀ọ̀kan**, `model=cap` kan lórí ìlà kọ̀ọ̀kan) tàbí nípasẹ̀
`PATCH /api/providers/[id]` pẹ̀lú ìrísí JSON kan náà. Ìtumọ̀ àwọn kọ́kọ́rọ́:

- **Gbogbo asopọ̀ ní ìfiwéra pẹ̀lú awoṣe pàtó:** `maxConcurrent` ṣì jẹ́ ààlà
  tí gbogbo asopọ̀ ń pín. Nígbà tí àwọn méjèèjì bá wúlò, a máa gba àwọn ẹnu-ọ̀nà
  méjèèjì lẹ́ẹ̀kan náà nínú ẹnu-ọ̀nà àpapọ̀ kan
  (`global → provider → account → model`); ààlà tó le jù lára àwọn tó wúlò
  ni yóò ní ipa.
- **Ìbámu pípé ti kọ́kọ́rọ́ awoṣe:** kọ́kọ́rọ́ náà ni ọ̀rọ̀ awoṣe tí a fi ránṣẹ́
  sí olùṣiṣẹ́ lẹ́yìn tí a bá ti pinnu ipa-ọ̀nà — nígbà gbogbo, ó jẹ́ id awoṣe
  òkè lásán (`glm-5`), kì í ṣe orúkọ àpèjúwe `provider/model` láti ọ̀dọ̀
  oníbàárà (`zai/glm-5` kò bá `glm-5` mu). Àwọn iye gbọdọ̀ jẹ́ odidi rere
  tó ń ṣàlàyé ààlà iye ìbéèrè tó lè ṣiṣẹ́ ní àkókò kan náà.
- **Ìtòlẹ́sẹẹsẹ agbègbè, kò sí ìṣàwárí:** àwọn ìbéèrè tó kọjá ààlà máa dúró
  nínú ìtòlẹ́sẹẹsẹ agbègbè pẹ̀lú ìlànà ìtòlẹ́sẹẹsẹ/àkókò-ìparí tó ti wà
  (àwọn àṣìṣe ìgbàwọlé onírúurú `SEMAPHORE_TIMEOUT` /
  `SEMAPHORE_QUEUE_FULL`). OmniRoute kì í ṣàwárí tàbí fojú díwọ̀n ìlànà
  iṣẹ́ òkè — ó ń fi àwọn ààlà pàtó tí olùdarí ṣètò múlẹ̀. Ẹnu-ọ̀nà awoṣe
  tó ti kún kì í pa olùpèsè, bẹ́ẹ̀ ni kì í dá ìdènà awoṣe títí láé sílẹ̀;
  ìhùwàsí 429/àkókò ìdádúró/ìyípadà sí omiì ti iṣẹ́ òkè ṣì jẹ́ ààbò ìkẹyìn
  fún àṣìṣe.
- **Ìpín fún asopọ̀ kọ̀ọ̀kan, fún ìlànà-iṣẹ́ kọ̀ọ̀kan:** àwọn ààlà jẹ́ ti
  asopọ̀ ibi ìpamọ́ dátà kọ̀ọ̀kan, a sì ń pa wọ́n mọ́ sínú ìrántí; nítorí náà,
  asopọ̀ méjì tó tún ń lo kọ́kọ́rọ́ API iṣẹ́ òkè kan náà kì í ṣọ̀kan pẹ̀lú
  ara wọn.
- **Àìṣètò túmọ̀ sí pé kò sí ìyípadà:** fífi máàpù náà sílẹ̀ (tàbí fífi
  ààyè inú pánẹ́ẹ̀lì sílẹ̀ ní òfo) kò fi ẹnu-ọ̀nà awoṣe kankan kún un.
  Àpẹẹrẹ ìṣètò láì sọ pé ààlà olùpèsè àgbáyé kankan wà:

```text
glm-5=1
glm-4.7=3
```

### Títẹ̀lé-lẹ́sẹẹsẹ àwọn ìbéèrè quota-share

Nígbà tí ìfiranṣẹ́ quota-share bá dojú kọ asopọ̀ kan tó sọ `max_concurrent`
rere, a máa tẹ àwọn ìbéèrè tó ń lọ sí **àkọọ́lẹ̀** náà ní àkókò kan náà
lẹ́sẹẹsẹ nípasẹ̀ semaphore fún asopọ̀ kọ̀ọ̀kan (kọ́kọ́rọ́
`qsconn:<connectionId>`): àwọn ìbéèrè tó kọjá ààlà **máa dúró nínú
ìtòlẹ́sẹẹsẹ** dípò kí wọ́n kún inú àkọọ́lẹ̀ náà. Ó jẹ́ **ṣí-sílẹ̀ nígbà
ìkùnà** — ìtòlẹ́sẹẹsẹ tó ti kún tàbí àkókò tó parí máa tẹ̀síwájú láì gba
àyè kan dípò kí ó kọ ìbéèrè tó ṣeé firánṣẹ́ sílẹ̀ láéláé. Tan-an tàbí pa á
nínú **Àwọn ìṣètò → Ìfaradà → Ìṣiṣẹ́pọ̀ fún asopọ̀ quota-share kọ̀ọ̀kan**
(`resilienceSettings.quotaShareConcurrencyLimit.enabled`, ó máa ń wà ní títàn
ní ìbẹ̀rẹ̀). Láìsí ààlà `max_concurrent`, ìhùwàsí náà kò ní yí padà.

> Ẹnu-ọ̀nà ìdarí ipa-ọ̀nà quota-share (`selectQuotaShareTarget`, DRR + P2C)
> fúnra rẹ̀ jẹ́ èyí tó ṣí-sílẹ̀ nígbà ìkùnà, ó sì kàn ń _dín ààyè àṣàyàn_
> asopọ̀ tó ti dé ààlà kù — pẹ̀lú àkójọpọ̀ asopọ̀ kan ṣoṣo, kò lè fi ààlà
> líle múlẹ̀, nítorí náà semaphore yìí gan-an ló ń ṣàkóso ìṣàn ìbéèrè tó pọ̀.

### Àtúngbìyànjú tó mọ àkókò ìdádúró àkójọpọ̀

Fún gbogbo ọgbọ́n àkójọpọ̀ (nígbà tí ó bá ṣiṣẹ́), ìbéèrè kan tó máa mú 429
kẹyìn wá nítorí àkókò ìdádúró alágbàákò KÚKÚRÚ máa dúró de òpin rẹ̀, yóò sì
tún fi ìbéèrè náà ránṣẹ́ dípò pípadà 429 — èyí bo àwọn àkókò TPM/RPM irú ti
Gemini (~60s retry-after) lórí àwọn àkójọpọ̀ awoṣe-púpọ̀, fún àpẹẹrẹ, nígbà
tí àwọn ibi-afẹ́ méjèèjì nínú àkójọpọ̀ awoṣe méjì bá dé ààlà oṣùwọ̀n fún
awoṣe kọ̀ọ̀kan. `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`,
`budgetMs`) nínú **Àwọn ìṣètò → Ìfaradà** ló fi ààlà sí i. Kò dúró láéláé
lórí `quota_exhausted` (tí a ti tì pa títí di ọ̀gànjọ́ òru) tàbí àwọn ìdí
ìfàṣẹsí/àìrí.

Ẹnu-ọ̀nà kan náà tún bo ipò ṣáájú ìfiranṣẹ́ (#16319): nígbà tí a bá foju kọ
gbogbo ibi-afẹ́ àkójọpọ̀ kan kí ìgbìyànjú kankan tó bẹ̀rẹ̀ nítorí pé awoṣe
wọn wà lábẹ́ ìdènà alágbàákò kúkúrú, ipa-ọ̀nà aláìní-ìgbìyànjú náà máa dúró
de òpin ìdènà lábẹ́ àwọn ààlà kan náà, yóò sì tún fi ìbéèrè náà ránṣẹ́, dípò
dídi èsì `503 ALL_TARGETS_SKIPPED` tí kò ní ìtọ́kasí. Nígbà tí a kò bá gba
ìdúró láàyè (ààlà ti dé, iye ìgbìyànjú tàbí ìnáwó ti parí, tàbí àǹfààní náà
wà ní pípà), èsì ìkẹyìn máa yí sí `429 rate_limit_error` tó ní `retry_after` /
`reset_at` láti àkókò ìparí ìdènà alágbàákò tó kọ́kọ́ dé; àwọn ìdènà kótà,
ìfàṣẹsí àti àìrí máa pa 503 tí kò ní ìtọ́kasí mọ́.

```text
#16319 · comboCooldownWait · pre-dispatch (attempts = 0)
all targets skipped + transient model lockout:
  enabled ∧ 0 < waitMs ≤ maxWaitMs ∧ attempt < maxAttempts ∧ budgetLeftMs ≥ waitMs
    → wait → re-dispatch
  wait = false → HTTP 429 rate_limit_error
  retry_after / reset_at ← earliest transient lock expiry
quota_exhausted / auth_error / not_found / not_found_local:
  no transient hint → HTTP 503 ALL_TARGETS_SKIPPED
```

---

## 5. Ìṣàkóso Ìgbàwọlé Sísọ̀wọ́ Ìbéèrè (v3.8.49 · ọ̀rọ̀ #6593)

**Ìwọ̀n-ìgbà**: sísọ̀wọ́ ìwọ̀n-ààlà ìgbà tí ó wà níbílẹ̀ fún olùpèsè+ìsopọ̀ kọ̀ọ̀kan (`open-sse/services/rateLimitManager.ts`,
tí Bottleneck ń ṣe àtìlẹ́yìn fún), ìpele kan ní ìsàlẹ̀ àwọn ọ̀nà mẹ́ta tí ó wà lókè.

**`maxWaitMs` ń dín ìdúró sísọ̀wọ́ kù; `executionMaxWaitMs` ń dín ìṣiṣẹ́ kù.**
Àwọn méjèèjì yàtọ̀ mọ́ra pátápátá, kò sì sí ọ̀kan nínú wọn tí ó ń gba èkejì.

`resilienceSettings.requestQueue.maxWaitMs` ni **ìsúná-ìdúró sísọ̀wọ́**: ó ń bo
ìdúró de ààyè olùpèsè àti lẹ́yìn náà jíjókòó ní ipò QUEUED, a sì ń pa aago rẹ̀
ní àkókò tí iṣẹ́ náà bá fi QUEUED sílẹ̀ tí ó sì bẹ̀rẹ̀ ìṣiṣẹ́
(`rateLimitManager.ts`, `wrappedFn`). Ìbéèrè tí ó bá kọjá rẹ̀ kò ní dé
ọ̀dọ̀ ẹ̀rọ ìpèsè rárá. Ìpínlẹ̀ àkọ́kọ́ 30000ms, tí `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`
ń pèsè ní `src/lib/resilience/settings.ts` tí
`tests/unit/ratelimit-admission-control-6593.test.ts` sì ń dì í mú, kí ìyípadà kan
sí i lè sọ ìdánwò yẹn di pupa dípò kí ó fi ìpín yìí sílẹ̀ ní àìfọ̀kànbalẹ̀.

`resilienceSettings.requestQueue.executionMaxWaitMs` ni ohun tí Bottleneck ń gbà
gẹ́gẹ́ bí `expiration` iṣẹ́, tí aago rẹ̀ ń bẹ̀rẹ̀ nìkan lẹ́yìn ìfiránṣẹ́. Ó jẹ́
ààbò fún àwọn olùṣiṣẹ́ tí kò ní àkókò-ààlà ìpèsè tì ara wọn, a sì ń gbé e
ga sí àkókò-ààlà ìbẹ̀rẹ̀ gbígbé-ìpèsè tì olùṣiṣẹ́ fúnra rẹ̀ nígbà tí èyí bá gùn
jù, kí ó má baà lè gé ìdáhùn aláyọ̀ tí ń lọ lọ́wọ́ kù. Ìpínlẹ̀ àkọ́kọ́ 600000ms (ìṣẹ́jú 10).

Fífi ìsúná sísọ̀wọ́ sínú `expiration` ni ohun tí ó máa ń pa àwọn ẹ̀rọ-àbáwọlé
tí kì í ṣe ìdí-ìdí-ìdí (non-incremental) ní àárín ìgbà ìṣiṣẹ́ — wọ́n máa ń ṣiṣẹ́
fún ìṣẹ́jú púpọ̀ lẹ́gítímétì kí àwọn báìtì àkọ́kọ́ dé — ìdí nìyẹn tí a fi
ń ṣe àfihàn ìparí-àkókò gẹ́gẹ́ bí `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504) nígbà tí ìsúná sísọ̀wọ́ ń gbé kóòdù
ìparí-àkókò àkókò-sísọ̀wọ́. Yí ọ̀kan nínú wọn padà nípasẹ̀ `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) tàbí pátákó ìṣàkóso
(**Settings → Resilience**). A ń dín àwọn méjèèjì kù sí 1ms–wákàtí 24 nígbà tí a bá ń ṣe ìtúnṣe wọn.

**Ìpinnu-ẹ̀tọ́, fún àwọn méjèèjì:** oníṣẹ́-ààyí env ń pèsè _ìpínlẹ̀ àkọ́kọ́_ nìkan. Ìye tí a
fipamọ́ sínú `resilienceSettings.requestQueue` (pátákó ìṣàkóso / àtúnṣe API, tí a tọ́jú
sínú `key_value`) ń borí rẹ̀, ìye `rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs`
tí ìsopọ̀ kọ̀ọ̀kan sì ń borí èyí. Nítorí náà síṣe ìtọ́jú oníṣẹ́-ààyí env lórí ìgbékalẹ̀
tí ó ti ní ìye tí a fipamọ́ tẹ́lẹ̀ kò yí nǹkan kankan padà — yọ ìtọ́jú tí ó wà tẹ́lẹ̀ kúrò tàbí
ṣe àtúnṣe rẹ̀ dípò.

Jíjókòó sísọ̀wọ́ ní ààlà nípasẹ̀ `maxWaitMs`; `maxQueueDepth` tí ó wà ní ìsàlẹ̀ ń dín iye
àwọn olùpè tí ó lè wà ní ìsọ̀wọ́ lẹ́ẹ̀kan kù.

**Àwọn àtúnṣe tí a sọ nínú ara: ìṣàkóso ààyè vs títìpa.** Ara 429 lè dárúkọ ìdúró tirẹ̀
(Gemini `RetryInfo.retryDelay`, ọ̀rọ̀ "retry after Ns"), tí
`updateFromResponseBody` ń kà. Ìdúró tí ó bá `maxWaitMs` ti ìsopọ̀ náà mu jẹ́ ìṣàkóso ààyè:
limiter ń sọ omi-ìpamọ́ rẹ̀ di òfìfo fún ìgbà yẹn, àwọn ìpè tí ó wà ní ìsọ̀wọ́ sì ń
firánṣẹ́ nígbà tí ó bá kún àkún. Ìdúró tí ó gùn ju `maxWaitMs` lọ kì í ṣe ohun tí
ìsọ̀wọ́ lè dúró dè — Gemini ń dáhùn ààyè ojoojúmọ́ tí ó ti tán pẹ̀lú
`retryDelay: "86399s"`. `Retry-After` tí a gbé kalẹ̀ lórí 429 tí a tún kọ́ (#16528)
ti ń mú kí ẹ̀rọ àfẹ̀yìntì tìpa àwòkọ́ náà fún àkókò yẹn, ṣùgbọ́n pípa limiter dúró fún
un pẹ̀lú yóò ṣì dá ìpè èyíkéyìí tí ó bá dé kókó náà ní kùtùkùtù dúró (lẹ́yìn àtúntò àfẹ̀yìntì,
fún àpẹẹrẹ) fún gbogbo `maxWaitMs`. Nígbà tí irú ìdúró bẹ́ẹ̀ bá wá láti inú
àlàyé Google `RetryInfo` tí a tẹ̀wé (ìlà-ìpín `google_rpc_retry_info`) tí limiter kókó náà sì ti
wà ní ààlà sí àwòkọ́ náà (wo `getLimiterKey`), 429 náà di títìpa àwòkọ́ lórí ìsopọ̀ yẹn
dípò (`lockModelForLongBodyRetry` nínú
`open-sse/services/rateLimitManager/bodyRetryPause.ts`, tí a dín kù sí wákàtí 24), a sì fi limiter náà
sílẹ̀ láìpá. Yíyan àkọọ́lẹ̀ ń fò ó lórí títìpa yẹn nípasẹ̀
`isModelLocked()`, bẹ́ẹ̀ sì ni ẹnubodè àkọ́kọ́-ìfiránṣẹ́ àpapọ̀ fún àwọn àfojúsùn tí a so mọ́
ìsopọ̀ náà. Lórí antigravity, tí limiter rẹ̀ wà fún ẹbí ààyè, títìpa náà wà
lórí àwòkọ́ gbòógì náà, gẹ́gẹ́ bí àwọn títìpa ààyè rẹ̀ yòókù. Orúkọ tí alábàáṣepọ̀ náà béèrè fún
ni a tún tìpa nígbà tí àlìásì kan bá yàn án sí àwòkọ́ yẹn, nítorí àwọn àyẹ̀wò yẹn ń lo
orúkọ tí a béèrè; a ń tìpa rẹ̀ gbòógì (`lockExactModel`), kí àlìásì tí ó bá ń rékọjá
ẹbí ààyè antigravity tàbí ààlà codex má baà tìpa tirẹ̀ rárá. Ìtọ́nà ọ̀rọ̀-ìmọ̀ràn, `retryDelay`
tí kò ní ìtẹ̀wé, tàbí limiter tí gbogbo ìsopọ̀ náà ń pín ń jẹ́ kí pípa dúró wà.
Nígbà tí limiter tí ọ̀nà 429 ṣẹ̀ṣẹ̀ tún kọ́ bá pa dúró, olùpè kan tí àkókò sísọ̀wọ́ tí ó kù
parí kí pípa dúró náà tó parí ni a gbá padà lẹ́sẹ̀kẹsẹ̀ pẹ̀lú kóòdù ìparí-àkókò àkókò-sísọ̀wọ́
(`checkLimiterPause`) dípò kí ó dúró dè àkókò yẹn; ìparí tí a kọ sílẹ̀ ni a gbé kalẹ̀
kí a tó kọ́ limiter náà, níbi tí Bottleneck ti ń bẹ̀rẹ̀ aago ìsọdọ̀tun rẹ̀, ìyípadà èyíkéyìí tí ó bá sì
wáyé lẹ́yìn náà sí omi-ìpamọ́ ń gbàgbé rẹ̀. Àwọn ìdánwò
`tests/unit/rate-limit-long-body-retry-lockout.test.ts` àti
`tests/unit/rate-limit-body-retry-pause.test.ts` ń bo rẹ̀.

**`maxQueueDepth` — ààlà ìgbàwọlé tí a yàn fúnra ẹni (tuntun).** `resilienceSettings.requestQueue.maxQueueDepth`
ń dín iye àwọn ìbéèrè tí ó lè jókòó ní ìsọ̀wọ́ (tí a kò tíì firánṣẹ́) fún olùpèsè+ìsopọ̀
kan lẹ́ẹ̀kan kù. Nígbà tí ìsọ̀wọ́ náà bá ti ní `maxQueueDepth`
àwọn ìbéèrè, a ń kọ ìbéèrè tuntun sílẹ̀ kíákíá pẹ̀lú
`code: "RATE_LIMIT_QUEUE_FULL"` tí a tẹ̀wé **kí ó tó dé ìgbà èyíkéyìí ní `limiter.schedule()`**
— nítorí náà ìkọ̀sílẹ̀ náà kò ní iye ówó, ó sì ń ṣẹlẹ̀ ṣáájú iṣẹ́ ìfúnpọ̀ ìtọ́nà-ọ̀rọ̀ /
ìtumọ̀ èyíkéyìí tí ó wà ní ìsàlẹ̀ fún ìbéèrè yẹn. Ìpínlẹ̀ àkọ́kọ́ `0` =
àìṣiṣẹ́, tí ó ń pa ìhùwàsí ìsọ̀wọ́ tí kò ní ààlà tí ó wà tẹ́lẹ̀ mọ́; ààlà 0–100000.
Yí padà nípasẹ̀ `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) tàbí
`resilienceSettings.requestQueue.maxQueueDepth` (pátákó ìṣàkóso/àtúnṣe API).

Àyẹ̀wò ìgbàwọlé fúnra rẹ̀ jẹ́ iṣẹ́ mímọ́
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`) kí a lè dán an wò ní ẹ̀yọ̀ kan
láìsí limiter Bottleneck gidi kan.

> RFC tí ó ṣí #6593 tún dábàá aṣíá `bypassCompressionOnRateLimit` kan. Pipeline `open-sse/services/compression/` ti repo yìí jẹ́ ìkanjọ prompt/context lórí ìbéèrè LLM tó ń jáde (`chatCore.ts`, ní ayíká ìdìnà kóòdù `resolveCompressionSettings`/`selectCompressionStrategy`), kì í ṣe ìkanjọ HTTP response lórí àwọn 429 bodies tí wọ́n dá sílẹ̀ — kò sí ọ̀nà kóòdù kankan tó bá aṣíá bypass gangan mu. Ìgbésẹ̀ ìkanjọ prompt náà tún ń ṣiṣẹ́ _ṣáájú_ `withRateLimit()` nínú pipeline ìbéèrè lọ́wọ́lọ́wọ́, nítorí náà àtúnṣètò láti fò ọn lórí ìkọ̀sílẹ̀ queue-full jẹ́ ìyípadà tó yàtọ̀, tó sì tóbi jù àyíká issue yìí lọ; wọ́n **kò** ṣe é níbí ní pàtàpàtà, wọ́n sì fi sílẹ̀ gẹ́gẹ́ bí ìṣẹ́ ìtẹ̀lé tí aǹfààní ìfipamọ́ CPU bá tó ewu àtúnṣètò náà.

### Nẹ́tì Ààbò Auto-Enable Rate-Limit & Ààbò Ìsopọ̀ (`rateLimitProtection`)

**Nẹ́tì ààbò auto-enable** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, àtọ́kànwá `true`):
Ní àtọ́kànwá, OmniRoute máa ń ṣí ààbò ìlànilẹnu rate-limit fún gbogbo àwọn ìsopọ̀ olùpèsè API-key tó ń ṣiṣẹ́ (`getProviderCategory(provider) === "apikey"`). Èyí jẹ́ àìdíí pé àwọn ìbéèrè tó ń wọlé sórí àwọn kìí API upstream tó ní ìfura sí rate ni wọ́n yóò wà nínú ìlànilẹnu, a sì yóò dín wọ́n ku nípasẹ̀ Bottleneck dípò kí wọ́n má bà a já sí àwọn àṣìṣe 429 upstream lójijì. A lè ṣe àtẹ̀yínwá nẹ́tì ààbò náà nípasẹ̀ oníyípadà àyíká `RATE_LIMIT_AUTO_ENABLE` (`false`/`0`/`off` máa pa á, `true`/`1`/`on` máa fipá mú ọn ṣiṣẹ́), èyí sì ní agbára jù ìtò Dashboard tó wà nínú ìpamọ́ lọ (**Ìṣètò → Ìfaradà** / `PATCH /api/resilience`).

**Ìtumọ̀ `rateLimitProtection` ti ìsopọ̀-kúlẹ̀kúlẹ̀:**
Ìtẹ̀lé ààbò rate-limit ti ìsopọ̀-kúlẹ̀kúlẹ̀ ni wọ́n ń ṣe nípasẹ̀ ààyè boolean `rateLimitProtection` lórí àwọn ìsopọ̀ olùpèsè (tí a fi pamọ́ sínú SQLite gẹ́gẹ́ bí `rate_limit_protection`):

- **Ṣí kedere (`rateLimitProtection === true`)**: Ààbò rate-limit wà ní ṣíṣí kedere fún ìsopọ̀ yìí, láìka ibi tí ẹ̀yà olùpèsè bá wà tàbí bóyá a ṣí nẹ́tì ààbò auto-enable tàbí kò.
- **Pa kedere (`rateLimitProtection === false`)**: Ó máa pa ààbò kedere, ṣùgbọ́n **kò** yọ ìsopọ̀ API-key tó ń ṣiṣẹ́ kúrò nínú nẹ́tì ààbò auto-enable gbogbogbò. Nínú `reconcileEnabledConnections` (`open-sse/services/rateLimitManager.ts`), `false` àti `undefined` jẹ́ ẹni kan náà: `rateLimitProtection === true` nìkan ni wọ́n ka sí àtẹ̀yínwá kedere. Bí `rateLimitProtection` bá jẹ́ `false` (tàbí tí a kò ṣètò ọn), ìsopọ̀ API-key tó ń ṣiṣẹ́ ṣì bá ìpèné auto-enable mu, ó sì ṣì wà lábẹ́ ààbò rate-limit.
- **Kò sí yíyọ kúrò ti ìsopọ̀-kúlẹ̀kúlẹ̀**: Olùṣàkóso kò lè sọ lọ́wọ́lọ́wọ́ pé "ìsopọ̀ API-key tó ń ṣiṣẹ́ yìí pàtó gbọdọ̀ ṣiṣẹ́ láìsí ààbò ìlànilẹnu rate-limit" nígbà tí auto-enable ṣì ń ṣiṣẹ́ fún àwọn òmíràn. Láti ṣiṣẹ́ àwọn ìsopọ̀ API-key láìsí àwọn ìlànilẹnu rate-limit pátápátá, a gbọdọ̀ pa nẹ́tì ààbò náà ní gbogbogbò (`RATE_LIMIT_AUTO_ENABLE=false` tàbí `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**Àwọn ọ̀nà kíkọ tí a ṣe àtìlẹ́yìn fún:**

- **`POST /api/rate-limits`**: Ọ̀nà kíkọ ìṣàkóso tí a ṣe àtìlẹ́yìn fún láti yí `rateLimitProtection` padà fún ìsopọ̀ kan (`{ connectionId: string, enabled: boolean }`). Lílò èyí pẹ̀lú `enabled: true` máa ṣí ààbò kedere; lílò rẹ̀ pẹ̀lú `enabled: false` máa yọ ààbò kedere kúrò (bí ó tilẹ̀ jẹ́ pé àwọn ìsopọ̀ API-key tó ń ṣiṣẹ́ ṣì wà lábẹ́ nẹ́tì ààbò gbogbogbò tí auto-enable bá ṣí).
- **`PUT /api/providers/[id]`**: Ní pàtàpàtà **kò** gba tàbí yí `rateLimitProtection` padà (#11278). Ìmúdójúìwọ̀n metadata ìsopọ̀ olùpèsè nípasẹ̀ `PUT /api/providers/[id]` kò ní yí ipò ààbò rate-limit tó wà nínú ìpamọ́ padà rárá.

---

## 6. Olùsọ́ ààyò sisan-aláìyára (#9709)

Ààbò aṣayan `resilienceSettings.streamRecovery.throughputWatchdog` ń ṣàwárí
orísun-òkè kan tí ó ṣì ń fi àwọn àkọ́sọ́láàrẹ ránṣẹ́ ṣùgbọ́n tí ó ń ṣẹ̀dá àbájáde
olùrànlọ́wọ́ ní ìsàlẹ̀ oṣùwọn àbájáde-tó-wúlò tí a ṣètò. Ó yàtọ̀ lọ́nà pàtápàtá sí
àkókò parí aìṣiṣẹ́: àwọn ìlù-ọkàn àti metadata kò tún àago méjèèjì kankan ṣe àtòpò,
wọn kò sì ka sí ìlọsíwájú. Ó tún yàtọ̀ sí òpin ìgbìyànjú líle (#9153), èyí tó ṣì
jẹ́ àjàlá ààbò pátápátá láìka sí didára àbájáde.

Olùsọ́ náà nílò àsìkò ìgbọ́násí tí ìtẹ̀le yóò sì jẹ́ fèrèsé yíyí tó pé kí ó tó lè
dáwọ́ dúró. Ó ń ka àwọn ìyípadà ọ̀rọ̀ láti àwọn ìṣẹ̀lẹ̀ àbájáde Chat Completions àti
Responses API (àṣojú báìtì UTF-8 tó ṣọ́ra), ó ń fọ́wọ́ rí àwọn ìṣẹ̀lẹ̀ lílò-nìkan àti
àwọn ẹ̀yí òfo, ó sì ń dáwọ́ ìdájọ́ rẹ̀ dúró nígbà tí àwọn ìṣẹ̀lẹ̀ ìpè-irinṣẹ́ tàbí
ìròyìn bá ń lọ lọ́wọ́. A ti pa á rẹ́rẹ́ láti ìbẹ̀rẹ̀, a sì lè mú ú ṣiṣẹ́ pẹ̀lú
`STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`; fèrèsé náà, ìgbọ́násí, oṣùwọn kéréjù,
àti àbájáde kéréjù tí a lè wọn, gbogbo wọn ni ìlà ìwọ̀ntúnwọ̀nsì àwọn àtòpò
ààbò-ìfaradà deéde ń ṣàkóso wọn.

Nígbà tí a bá mú ú ṣiṣẹ́, ìdáwọ́dúró olùsọ́ náà máa ń kan ìgbìyànjú orísun-òkè tó
ń ṣiṣẹ́ lọ́wọ́lọ́wọ́ nìkan. Ṣáájú àwọn báìtì kankan tí oníbàárà lè rí, ọ̀nà
ìmúpadàbọ̀sípọ̀ tẹ́lẹ̀ lórí àkáǹtì kannáà tó wà tẹ́lẹ̀ lè tún ìgbìyànjú náà ṣí.
Lẹ́yìn ìfipamọ́, a kò tún sisan náà ṣe láìsí ìṣọ́ra rárá; àdéhùn ìtẹ̀síwájú ààbò
láàrin sisan tó wà tẹ́lẹ̀ nìkan ló lè so ìfikún-ìparí pọ̀. Ìparí ṣì jẹ́
ìṣe-lẹ́ẹ̀kan-ṣoṣo, nítorí náà a kò ṣe ìṣirò lílò àti ìtúpalẹ̀ semaphore lẹ́mejì.

---

## 7. Àtúnsọ Ìpò Upstream (àwọn àṣìṣe iye-ààyè tí a ṣàlàyé lọ́nà tí kò tọ́)

**Ààlà:** ẹnubodè upstream kan tí ó ń jabo pé iye-ààyè ti parí fún ìgbà díẹ̀ pẹ̀lú ipò HTTP tí kò tọ́.

**Ète:** ṣàtúnṣe ipò tí ń ṣini lọ́nà ṢÁÁJÚ ìsọ̀rí, kí àwọn olùlò downstream (ẹ̀rọ àfidípò, àkójọpọ̀ combo, ìdáhùn tí a fi hàn sí oníbàárà) lè rí pé a lè tún ìkùnà náà gbìyànjú ní tòótọ́.

Àwọn ẹnubodè kan ń fi hàn pé iye-ààyè ti parí fún ÌGBÀ DÍẸ̀ pẹ̀lú ipò HTTP
tí kò ṣeé tún gbìyànjú. `agentrouter.org` ń dá `403` padà (nígbà míì `400`) pẹ̀lú àkóónú Ṣáínà
(`用户额度不足` / `额度不足`) dípò `429` boṣewa. Àwọn oníbàárà bíi Claude
Code ka `403` sí ohun tí ó wà pẹ́ títí, wọ́n sì fòpin sí session náà, àti pé láìsí àtúnṣe,
ẹ̀rọ àfidípò yóò ṣe ìsọ̀rí rẹ̀ gẹ́gẹ́ bí `AUTH_ERROR` dípò ìṣẹ̀lẹ̀
iye-ààyè.

**Ìmúṣẹ:**

- Registry + matcher: `open-sse/config/upstreamStatusRestatement.ts` — àtòjọ
  àwọn òfin fún provider kọ̀ọ̀kan (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), tí a ń bá mu nípasẹ̀ `applyStatusRestatement()`.
- Ibi ìpè: block `providerFailure:` inú `open-sse/handlers/chatCore.ts`
  (ní àyíká ìlà 3654), lẹ́sẹ̀kẹsẹ̀ lẹ́yìn tí `parseUpstreamError()` bá ṣe àtúpalẹ̀ ìdáhùn
  upstream kan tí ó ní ipò HTTP àṣìṣe (`!providerResponse.ok`), àti ṣáájú kí
  ìsọ̀rí èyíkéyìí tó bẹ̀rẹ̀, kí gbogbo olùlò downstream lè rí ipò tí a
  ṣàtúnṣe. Àwọn àṣìṣe tí a fi sínú stream SSE `200` ń tẹ̀lé ọ̀nà mìíràn,
  tí ó wà lẹ́yìn, fún ṣíṣe àtúpalẹ̀ stream, wọn kò sì wà lábẹ́ hook yìí lónìí — èyí jẹ́
  ààlà tí a mọ̀, tí a kò tíì nílò fún ipò àṣìṣe agentrouter (èyí tí
  ó ń farahàn gẹ́gẹ́ bí ipò HTTP àṣìṣe).
- Yíyẹ fún àtúngbìyànjú: `429` wà nínú `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), nítorí náà àṣìṣe tí a tún ipò rẹ̀ sọ
  ní àkókò àtúngbìyànjú gidi dípò kí ó farahàn gẹ́gẹ́ bí `403` tí kò lè ṣiṣẹ́ mọ́.
- `60s` àdáṣe `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  jẹ́ ohun tí ìdáhùn tí a tún ipò rẹ̀ sọ ń sọ fún **oníbàárà** nìkan; kì í ṣe
  iye àkókò cooldown/lockout abẹ́nú ti connection náà — èyí ni
  mechanism èyíkéyìí tí ó bá ń bójú tó àṣìṣe tí a tún ipò rẹ̀ sọ ń ṣàkóso
  lọ́tọ̀ (backoff tí ń pọ̀ sí i ti Connection Cooldown, §2, pẹ̀lú ìpilẹ̀ `3s` fún àwọn
  provider API-key; tàbí Model Lockout, §3, fún àwọn provider iye-ààyè-àkọ́ṣe-bákannáà bíi
  agentrouter). Router lè tún yẹ láti gbìyànjú ní abẹ́nú kí
  window 60s tí ó kéde fún oníbàárà tó pé — headroom tí a mọ̀ọ́mọ̀ ṣe ni,
  kì í ṣe bug.

Àwọn àṣìṣe tí ó wà pẹ́ títí (ti agentrouter `无权访问模型` — kò ní àṣẹ láti wọ model yìí) kì í
ṣeé tún ipò wọn sọ LÁÉ: `excludeMarkers` ń fagilé òfin náà kódà nígbà tí `textMarkers` bá bá mu,
nítorí náà àṣìṣe náà máa pa ipò ìbẹ̀rẹ̀ rẹ̀ mọ́, kò sì sí ohun tí yóò máa tún un gbìyànjú títí láé. Òfin
ìsọ̀rí provider tí ó bá a mu
(`agentrouter-model-access-denied` inú `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, cooldown ìpilẹ̀ `6h` tí a kéde) ni
`checkFallbackError` (`open-sse/services/accountFallback.ts`) ń ṣàyẹ̀wò
_ṣáájú_ early-return `FORBIDDEN` àkópọ̀ apikey gbogbogbò, tí a fi
`honorsRuleLockScope(provider)` ṣe gate rẹ̀ (#10334 — lọ́wọ́lọ́wọ́ agentrouter nìkan nípasẹ̀
allowlist `HONORS_RULE_LOCK_SCOPE_PROVIDERS` inú
`providerErrorRules.ts`). Cooldown 6h tí òfin náà kéde ń gba ọ̀nà kọjá gẹ́gẹ́ bí
`fallbackResult.baseCooldownMs`, ṣùgbọ́n ó ṣì ń wọ ọ̀nà lockout iye-ààyè-àkọ́ṣe-bákannáà
tí ó ti wà tẹ́lẹ̀ (`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, tí #10334 kò yí padà àyàfi orísun cooldown):
a dín in kù sí `mlSettings.maxCooldownMs` ti operator
(àdáṣe `1_800_000ms` / 30min), bí gbogbo model lockout mìíràn, àti pé
_ìdí lockout tí a fi pamọ́_ ṣì jẹ́ `"forbidden"` tí a ti hardcode tẹ́lẹ̀,
kì í ṣe `"auth_error"` ti òfin náà — iye àkókò cooldown nìkan ni a bọ̀wọ̀ fún
láti ìbẹ̀rẹ̀ dé òpin, kì í ṣe reason string. Connection fúnra rẹ̀ ṣì ṣiṣẹ́;
àwọn model arákùnrin-lábọ̀ rẹ̀ lórí connection kan náà kò ní ipa kankan.

Àwọn àṣìṣe iye-ààyè tí a tún ipò wọn sọ (`额度不足`) dé òfin provider kan ní production
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, kò ní cooldown tí a kéde fúnra rẹ̀ — àdáṣe scaled backoff ti persistence layer
ni ó kan). Láti #10334, `scope` lórí
`ProviderErrorRuleMatch` NI a ń lò láti ìbẹ̀rẹ̀ dé òpin, ṣùgbọ́n **nìkan** fún àwọn provider tó wà nínú
allowlist `HONORS_RULE_LOCK_SCOPE_PROVIDERS` (`providerErrorRules.ts` —
lónìí `"agentrouter"` nìkan, tí a fi `honorsRuleLockScope()` ṣe gate rẹ̀). Fún gbogbo
provider mìíràn `scope` ṣì jẹ́ àlàyé nìkan, gan-an bí ó ti rí ṣáájú #10334.
`checkFallbackError` ń fi scope òfin tí ó bá mu hàn gẹ́gẹ́ bí
`fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) ni guard tí a jọ ń lò láti jẹ́rìí pé
`ruleScope` kan dájú pé ó léwu-kéré tó láti bọ̀wọ̀ fún gẹ́gẹ́ bí àmì jakejado connection tí ó lè padà bọ̀ sípò fúnra rẹ̀
(scope `"connection"`, reason `quota_exhausted`, kì í jẹ́ `permanent` láé,
kì í jẹ́ `creditsExhausted` láé — ìdáàbòbò sí òfin ọjọ́ iwájú tí ó lè so scope
`"connection"` pọ̀ mọ́ ipò account tí ó wà pẹ́ títí). Àwọn olùlò méjì ń pè é:

- **Ìtọ́jú** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  dípò kí ó wọlé sínú ẹ̀ka ìdèwọ́n **fun-gbogbo-àwoṣe** ti olùpèsè passthrough
  (agentrouter jẹ́ `passthroughModels: true` → `hasPerModelQuota()`
  ń dá `true` padà), ó ń lo **ìsinmi ìsopọ̀ fún ìgbà díẹ̀** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, kì í ṣe ipò ìparí
  (`credits_exhausted`/`banned`/`expired`) — nítorí náà ìsopọ̀ náà máa tún
  ara rẹ̀ ṣe nígbà tí ìsinmi náà bá parí dípò kí ó nílò àtúntò ẹ̀rí
  ìbáṣepọ̀ pẹ̀lú ọwọ́. A ó rẹ̀ sílẹ̀ fún àwọn ìsopọ̀ tí ó ní
  `disableCooling: true` (#2997): ìyọ-ara-kúrò yìí máa rílù wọlé sínú
  ìdèwọ́n fun-gbogbo-àwoṣe dípò (ìdíẹ̀kèdíẹ̀ kan tí a ṣe àkọsílẹ̀ — wo
  àríwísí kóòdù tó wà lókè ẹ̀ka náà).
- **Ìdarípo combo ìbéèrè-kannáá** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): ààbò kannáá máa fi ìsopọ̀
  náà sínú ìkójọpọ̀ `exhaustedConnections` inú ìrántí, pẹ̀lú kòkòrò
  `${provider}:${connectionId}`. Èyí ń kọjá àfojúsùn ÌBÉÈRÈ-KANNÁÁ tó kù
  tí _ó ti ní `connectionId` yẹn gan-an lórí ohun èlò àfojúsùn tirẹ̀_
  nìkan (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` ṣáájú wíwá `exhaustedConnections`) — combo àtòjọ-àwoṣe
  lásán, ibi tí àwọn àfojúsùn arákùnrin kò ní `connectionId` kankan tí a
  kánlẹ̀ fúnra wọn tí ọ̀kan sì jẹ́ yíyán nígbà-ìránṣẹ́-kọ̀ọ̀kan nìkan látinú
  àkópọ̀ `X-OmniRoute-Selected-Connection-Id` ti èsì náà, kò ní kọlu
  ìbáṣọ̀rọ̀ kòkòrò yẹn rárá. Fún ọ̀rọ̀ tó wọ́pọ̀ yẹn, ààbò gidi lòdì sí kí
  ẹsẹ̀ tó kù tún àpamọ́wọ́ tó ṣẹ̀ṣẹ̀ parí náà lo KÌ Í ṢÈ Set yìí — ẹ̀yí
  ìtọ́jú tó wà lókè ni (`rateLimitedUntil` ti ìsopọ̀ náà ti wà láwájọ́)
  tí a pọ̀ mọ́ ààbò kannáá yìí tó ń dín `transientRateLimitedProviders` kù
  fún ìkùnà náà (wo "Ìpèsè ìpele-méjì" àti àríwísí kóòdù lórí ẹ̀ka
  `isAgentrouterConnectionQuotaScope` nínú `targetExhaustion.ts`): pẹ̀lú
  Set yẹn tí a kò fi àmì sílẹ̀, ìgba-àyè-lógbára `allowRateLimitedConnection`
  ti `combo.ts` (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) KÒ
  ní bẹ̀rẹ̀ iṣẹ́ fún àwọn ẹsẹ̀ tó kù ti olùpèsè náà, nítorí náà a ó bọ̀wọ́
  fún ìyọ̀ `rateLimitedUntil` ti ìyàn ẹ̀rí ìbáṣepọ̀
  (`src/sse/services/auth.ts:1238`) ní deédéé, tí ẹsẹ̀ tó kù sì tàbí yàn
  ìsopọ̀ agentrouter mìíràn tí ó ṣì yẹ, tàbí kùnà pẹ̀lú kí kò sí ẹ̀rí
  ìbáṣepọ̀ kankan rárá — kò fi agbára dá àárà rẹ̀ padà sórí ìsopọ̀ tí ẹ̀ka
  yìí ṣẹ̀ṣẹ̀ fi sinmi.

### Ìpèsè ìpele-méjì: àtúntún sọ ipò, lẹ́yìn náà ìsọtò

Àtúntún sọ ipò (`upstreamStatusRestatement.ts`) àti àwọn òfin ìsọtò
olùpèsè (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) jẹ́ àwọn ìforúkọsílẹ̀ ọtọọtọ̀ tí ẹ̀mejì ń lo
kòkòrò lórí id olùpèsè àti àwọn àmì ọ̀rọ̀, ṣùgbọ́n wọ́n ń ṣiṣẹ́ ní àwọn ibi
tí ó yàtọ̀ wọ́n sì ń ṣe ìleré tí ó yàtọ̀: àtúntún sọ ipò ń tún ipò HTTP kọ
ní kutukutu nínú `chatCore.ts`; àwọn òfin ìsọtò ń yàn `reason` ìpàrọ́
àti tìítí `scope` (`model` / `provider` / `connection`) nínú
`checkFallbackError()` (`open-sse/services/accountFallback.ts`).

Àwọn òfin ìsọtò máa rí **ọ̀rọ̀** aṣìṣe kíkún ṣoṣo (tí a nílò láti bá àwọn
àmì ara bíi `额度不足` mu) fún àwọn olùpèsè tí a kọ sínú àkójọ-àṣẹ
`FULL_TEXT_RULE_PROVIDERS` nínú `providerErrorRules.ts` — `"agentrouter"`
nìkan ló wà ní báyìí. Fún gbogbo olùpèsè **ìkàtálógù inú-ètò** mìíràn,
`checkFallbackError` máa fún `getProviderErrorRuleMatch` ní aṣìṣe tí a
ṣètò (`{code, type}`) nìkan, èyí tó tó fún àwọn òfin tí ó dá lórí
àkópọ̀/ipò/kóòdù ṣùgbọ́n tó foójù fún àwọn àmì ọ̀rọ̀-ara. Olùrànlọ́wọ́
`resolveRuleMatchBody()` ló ń ṣe ìyàn yìí: ọ̀rọ̀ aṣìṣe kíkún fún àwọn
olùpèsè tí ó wà nínú àkójọ-àṣẹ, aṣìṣe tí a ṣètò ní bí kò bá ṣe bẹ́ẹ̀.
Ìfikún olùpèsè **inú-ètò** kan sí `FULL_TEXT_RULE_PROVIDERS` jẹ́ ìforúkọ
wọlé tí ó kedere fún olùpèsè-kọ̀ọ̀kan — ó wà nítorí kí ọ̀nà àtìbàjọ́ fún
gbogbo olùpèsè tí kò sí lórí àtòjọ náà máa dúró bí kò bá yí padà
báìtì-fún-báìtì.

`scope` òfin kan (`model` / `provider` / `connection`) jẹ́ ìforúkọ wọlé
tí ó yàtọ̀ sí `FULL_TEXT_RULE_PROVIDERS`: `checkFallbackError` máa fara
rẹ̀ gẹ́gẹ́ bí `fallbackResult.ruleScope` nìkan, àwọn olùlo ìsàlẹ̀ sì máa
bọ̀wọ́ fún un gẹ́gẹ́ bí ohunkóhun mìíràn ju àmì ìsọfúnni lọ, fún àwọn
olùpèsè nìkan tí ó wà nínú àkójọ-àṣẹ `HONORS_RULE_LOCK_SCOPE_PROVIDERS`
nínú fáìlì kannáá (tí a dè àyè lọ́nà `honorsRuleLockScope()` — òní
`"agentrouter"` nìkan). Wo "Àwọn aṣìṣe àwò tí a tún sọ" lókè fún ohun
tí ìbáṣọ̀rọ̀ `scope: "connection"` kan ṣe ní tòótọ́ nígbà tí olùpèsè kan
bá ti wà lórí àkójọ-àṣẹ yẹn.

**#11104 — àwọn òfin tí olùṣàkóso kéde máa kọjá àkójọ-àṣẹ méjèèjì.**
Olùṣàkóso lè kéde òfin fún olùpèsè-kọ̀ọ̀kan nígbà ṣíṣe lọ́nà
`settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
láì tún fáìlì yìí ṣe. Ìdè òfin olùṣàkóso kan sí ẹ̀yìn
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — àwọn
àkójọ-àṣẹ tí wọ́n ṣe láti dáàbò bo ìwà **àtìbàjọ́** ti àwọn òfin ìkàtálógù
inú-ètò — yóò jẹ́ kí ẹ̀rọ ìṣètò náà di àìṣiṣẹ́ fún gbogbo olùpèsè àyàfi
àwọn tí a ti kọ síbẹ̀ rẹ́, níwọ̀n ìgbà tí ìkéde òfin náà ti jẹ́ ìforúkọ
wọlé tí ó kedere ti olùṣàkóso. `resolveRuleMatchBody()` àti
`honorsRuleLockScope()` méjèèjì máa kọ́kọ́ ṣàyẹ̀wò
`hasOperatorRuleForProvider()`: olùpèsè tí ó ní òfin olùṣàkóso máa gba
ọ̀rọ̀ aṣìṣe gidi, a ó sì bọ̀wọ́ fún `scope` tí ó kéde, láìka bóyá ó tún
fara nínú èyíkéyìí àkójọ-àṣẹ.

**Àlàfo tí a mọ̀ — kò sí gbogbo ìbéèrè lọ́dọ̀ `providerRuleRegistry` fún
HTTP 400 rárá.** Ẹ̀ka `BAD_REQUEST` ti `checkFallbackError` ń ṣe ìsọtò
ipò 400 ní kíkún nípasẹ̀ àwọn àkópọ̀ ìlànà tirẹ̀
(`MODEL_ACCESS_DENIED_PATTERNS`, `CONTEXT_OVERFLOW_PATTERNS`,
bẹ́ẹ̀bẹ́ẹ̀ lọ nínú `accountFallback.ts`) ó sì ń padà ṣáájú kí ẹ̀ka
`configuredRule`/`getProviderErrorRuleMatch` tó wà lókè rẹ̀ tó dé. Òfin
ìkàtálógù inú-ètò (tàbí òfin olùṣàkóso) tí ó ní `status: 400` wúlò ní
ọ̀nà gírámà ṣùgbọ́n kò ní tan rárá. Kò sí òfin tó wà lónìí tí ó ń
fojúsìn 400, nítorí náà kò sí ohunkóhun nínú iṣẹ́ gidi tó níkanjá —
ṣùgbọ́n òfin 400 ọjọ́ iwájú nílò kí a kọ́kọ́ kan ẹ̀ka yìí, èyí tí ó jẹ́
àyípadà tó tóbi ju ìfikún òfin kan lọ (ó máa tún ìsọtò 400 ṣe fún gbogbo
olùpèsè tí ó ti gbára lé ìwà àkópọ̀-ìlànà náà) ó sì kọjá ààlà ìleré fún
ìfikún òfin olùpèsè-ọ̀kan.

### Ṣí àfikún gateway tuntun tó ń sọ quota ẹ̀kúnrẹ̀rẹ̀

1. Forúkọsílẹ̀ rule array kan nínú `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Jẹ́ kí `textMarkers` jẹ́
   ti-olúpèsè-nìkan; má ṣe tún àwọn gbólóhùn Gẹ̀ẹ́sì gbogbogbò lo tí wọ́n bá
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`) kọlu.
2. Bí o bá fẹ́, forúkọsílẹ̀ àwọn òfin ìṣọ̀wọ́pọ̀ nínú
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) láti yan
   lock scope tó tọ́ (`connection` fún quota tó ká gbogbo account, `model`
   fún àwọn àṣìṣe lójú-model-nìkan). Ìgbésẹ̀ yìí ń ṣiṣẹ́ ní production nìkan
   fún àwọn olúpèsè tí àwọn òfin wọn nílò gbogbo ọ̀rọ̀ àṣìṣe náà (body
   markers): ṣàfikún provider id sí `FULL_TEXT_RULE_PROVIDERS` nínú fáìlì
   kannáà — bí kò bẹ́ẹ̀, `checkFallbackError` yóò ma fi àṣìṣe `{code, type}`
   tó jẹ́ structured nìkan lé òfin náà lọ́wọ́, òfin body-text sì kò ní bá
   live traffic mu rárá. Àwọn òfin tó ń mu lórí `status`/`headers` lásán
   (bí ti Opencode tàbí ti Minimax) kò nílò opt-in yìí. Lọ́dàlọ́dà, bí òfin
   náà bá kéde `scope: "connection"` tí èròjà rẹ̀ sì jẹ́ cooldown tó ká
   gbogbo connection ní ti-òótọ́ pẹ̀lú combo skip lórí ìbèèrè kannáà (kì í
   ṣe àmì-ìsọfúnni lásán), ṣàfikún provider id sí
   `HONORS_RULE_LOCK_SCOPE_PROVIDERS` nínú fáìlì kannáà — èyí ni ó ń ṣàkóso
   lílò àwòrán `isAgentrouterConnectionQuotaScope()` nínú
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) àti
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); láìsí rẹ̀, `scope` ṣì máa
   ń kọja lọ́nà `fallbackResult.ruleScope` ṣùgbọ́n kò sí ohun tó ń ṣe iṣẹ́
   pẹ̀lú rẹ̀.
3. Ṣàfikún àwọn unit tests tó dá lórí
   `tests/unit/upstream-status-restatement.test.ts` àti
   `tests/unit/agentrouter-error-rules.test.ts` (pẹ̀lú àwọn ààbò
   not-permanent / not-creditsExhausted, àti — bí olúpèsè náà bá nílò
   allowlist — test kan tó ń fìdí múlẹ̀ pé `resolveRuleMatchBody()` ń dá
   gbogbo ọ̀rọ̀ náà padà fún olúpèsè yẹn nìkan).

Kò sí àyípadà kankan tó yẹ sí `chatCore.ts`, `classifyError`, tàbí combo.

#### Lock tó dá lórí ìpín-egress (#10880)

Àwọn olúpèsè nínú `EGRESS_BUCKETED_LOCK_PROVIDERS` (ẹbí opencode) ni wọ́n ń
gẹ́ bí upstream tí wọ́n ṣọ́ ní ìpín-IP (free tier ti opencode jẹ́ ìpín-IP, kì
í ṣe ìpín-account — wo #9611): status-429 tí a ṣọ̀wọ́pọ̀ gẹ́gẹ́ bí
`quota_exhausted` **tàbí** `rate_limit_exceeded` máa ń dá gbogbo connection
ẹbí-allowlist tí egress IP tó gbẹ̀yìn rẹ̀ bá ti connection tó kùnà mu dúró,
kí rotation tó gbìyànjú láti lo wọ́n
— èyí dènà àwọn ìpè sí upstream tó dájú pé yóò kùnà N-1 (bó ṣe rí gẹ́gẹ́ bí
#10460/#10525).
`rate_limit_exceeded` wà nínú rẹ̀ lábẹ́rò: lọ́nà `markAccountUnavailable`,
àwọn òfin opencode-nìkan kò ní mu rárá (kò sí headers/body tí wọ́n lé
`checkFallbackError` lọ́wọ́, opencode kò sì wà nínú
`FULL_TEXT_RULE_PROVIDERS`), nítorí náà 429 kan tí ara rẹ̀ ru ọ̀rọ̀
subscription-quota ("monthly usage limit reached") ni wọ́n ṣọ̀wọ́pọ̀ gẹ́gẹ́ bí
`quota_exhausted` nípasẹ̀ quota-text fallback
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; cooldown wákàtí kan)
kí wọ́n tó dé òfin `status_429` rárá — nígbà tí 429 tó gbẹ́ láìsí ọ̀rọ̀ quota
(rate limiting lásán) ń ṣọ̀wọ́pọ̀ nípasẹ̀ òfin `status_429` gẹ́gẹ́ bí
`rate_limit_exceeded`, ó sì ṣì dá ẹbí IP náà dúró. Fún olúpèsè kan nínú
allowlist, rate limit tí wọ́n ṣọ́ ní ìpín-IP jẹ́ àmì kannáà bí quota tó gbẹ́.
Àwọn òpin òdodo:

- **Ìgbìyànjú tó dára jù (Best-effort)**: àtìpadà náà ṣàtúlọ ètò asopọ̀ tó gbẹ̀yìn
  mọ̀ `egress_ip` láti inú `proxy_logs` (fèrèsé wákàtí 24, alámuṣọre, láìsí cache). Cache tútù
  (wọn kò tíì ṣèwádìí IP egress rárá) tàbí kò sí ilà kankan → a ṣì máa dàá isopọ̀ tó kùnà
  dúró ní ẹ̀yìn ipò ìdánimọ̀ (wọ́n á ṣàkọ sílẹ̀ bó ṣe wà lónìí), ṣùgbọ́n kò sí arákùnrin
  tó máa jẹ́ àtìpadà.
- **Kò lè di òpin ayérayé**: ìdánimọ̀ náà jẹ́ fèrèsé àpòye tó ń tún ara rẹ̀ ṣe
  (`testStatus: "unavailable"`); a kò gbọdọ̀ yọ ipò ayérayé kankan láti ara àmì
  ìpele IP. Àwọn isopọ̀ `disableCooling` máa kọjá ẹ̀yìn ipò náà ní kíkún.
- **Ìyípadà iwọn àtìpadà fún ẹbí tó wà nínú àtòkọ àfiyèsí**: èyí jẹ́ ìyípadà àyíká,
  kì í ṣe ìmúdára arákùnrin nìkan. opencode jẹ́ olùpèsède `passthroughModels`,
  nítorí náà ṣáájú ẹ̀yìn ipò yìí, àṣìṣe 429 máa mú kí àtìpadà kan ṣẹlẹ̀ fún MODEL kọ̀ọ̀kan;
  báyìí ó ń mú kí ìdánimọ̀ isopọ̀ ṣẹlẹ̀ — títí fi kan olùlò tó ń ṣiṣẹ́ pẹ̀lú isopọ̀ ẹyọ kan ṣoṣo
  láìsí arákùnrin kankan rárá. Ìyẹn ni iwọn tí tábìlì òfin opencode ti kàlẹ̀ pé ó tọ́
  (`scope: "connection"`, `providerErrorRules.ts`), èyí tí a kò tíì mú ṣẹlẹ̀ rí nítorí pé opencode
  kò sí nínú `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Ẹ̀yìn ipò náà kọ ìdánimọ̀ isopọ̀ tó kùnà +
  `backoffLevel` fúnra rẹ̀, ó tẹ̀lé àpẹẹrẹ ẹ̀yìn ipò agentrouter tí wọ́n lò ìwọ̀n isopọ̀, kí ó sì padà
  — a kò lè dé ìdíwọ́ fún-model kọ̀ọ̀kan àti ọ̀nà gbòòrò tó wà ní ìsàlẹ̀ rárá.
- **Combo wà nínú rẹ̀**: bí ẹ̀yìn ipò agentrouter ṣe ṣe é, àyíká náà faramọ́ láìgbàgbọ́
  ìsókalẹ̀ `persistUnavailableState`/`isCombo` tí olùpè combo kan lò sórí àṣìṣe 429. Àtìpadà
  fún-model kọ̀ọ̀kan kì í ṣe ọ̀nà tó péyìn sí i fún àyíká yìí, ó jẹ́ ẹyọ àwòn tó ṣì tọ́: kò sọ ohunkohun
  nípa IP tó parẹ̀, nítorí náà ìyípadà combo náà máa tẹ̀síwájú láti ń dán àpè èyọ kan tó dájú pé
  á kùnà lójì fún arákùnrin kọ̀ọ̀kan.
- **Ààbò arákùnrin**: a kò gbọdọ̀ ṣe àtúnṣe lórí arákùnrin tó ti dé òpin (banned/credits_exhausted)
  tàbí tó ti wà nínú ìdánimọ̀ tó gùn ju rárá.
- **Àtòkọ àfiyèsí tó yà sọ́tọ̀**: fífi `EGRESS_BUCKETED_LOCK_PROVIDERS` fẹ̀ jẹ́ ìpinnu tó ṣe kedere
  ti oníwọ̀n; kò sí ìsopọ̀ gbòòrò kankan (àpẹẹrẹ #10334/#10419). Ìbéèrè arákùnrin náà so àtòkọ
  àfiyèsí kan náà mọ́ ibi tí wọ́n sì tún un tún kọ sílẹ̀ gẹ́gẹ́ bí òkè SQL, nítorí náà fífi un fẹ̀
  máa jẹ́ àtúnṣe ilà kan ṣoṣo.
- **Ìyípadà IP egress, ní ìtọsọ́nà méjèèjì**: fèrèsé ìwádìí náà (wákàtí 24) fẹ̀rẹ̀ jù àkókò TTL
  ti cache IP egress (ìṣẹ́jú 5) lọ, nítorí náà "IP tó gbẹ̀yìn mọ̀" jẹ́ ìtàn, kì í ṣe ipò lọwọlọwọ.
  Bí proxy isopọ̀ kan bá ti yí padà láàrin fèrèsé náà, àtìpadà lè **padánù** IP tó wà ní kíkàjọ
  ní tòótọ́ (IP tí wọ́n ṣàkọ sílẹ̀ ni èyí tuntun, èyí tí kò tíì parẹ̀) — àti ní bákan náà ó lè
  **dàá arákùnrin tó ti yí kúrò dúró** lọ́dọ̀ IP tó parẹ̀. Ọ̀rọ̀ kejì náà máa ná arákùnrin náà fèrèsé
  ìdánimọ̀ kan; a gba àwọn méjèèjì gẹ́gẹ́ bí ààlà ìgbìyànjú tó dára jù ti ìwádìí tó dá lórí ìtàn.
- **Èròjà**: ìwádìí méjì tó ni ààlà nínú `proxy_logs` (tí wọ́n ṣe àṣàyàn fèrèsé rẹ̀ nípasẹ̀
  `idx_pl_timestamp`), ní ìgbà tí àṣìṣe 429 ṣe ń ṣẹlẹ̀ nìkan. Kò sí àtòkọ tuntun kankan (ìyípadà 134
  YAGNI). Wọ́n wọn ọn lórí àwòrán DB ìwọ̀n ọkùnrùn tó ní ìwọ̀n àárín; àpẹrẹ kan tó ní ìwọ̀n iṣẹ́ gíga
  máa ní àwọn ilà tó bá i mu nínú fèrèsé kan náà.

---

## Àwọn Ẹ̀ya Ìfaradà Mìíràn

- **Àwọn ilana ìtọ́sọ́nà mọ́kànlélógún** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, expiry-first, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — wo [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Ìtọ́sọ́nà reset-aware** (v3.8.0) — ó fi àwọn ìsopọ̀ síwájú gẹ́gẹ́ bí àkókò atúntò quota ṣe rí.
- **Ìrẹ̀lẹ̀ ipò background** — Responses API `background: true` ti rẹ̀lẹ̀ sí sync pẹ̀lú ìkìlọ̀.
- **Ìwárí ààlà irinṣẹ́ láìdúró** — ó fa àwọn olupese sẹ́yìn nígbà tí ààlà iye irinṣẹ́ bá ti de.
- **Fallback pajawiri** — `OMNIROUTE_EMERGENCY_FALLBACK` ni ó ṣàkóso rẹ̀; àwọn aláṣiṣẹ́ lè bori rẹ̀ láti ojú-ìwé Feature Flags láìní àtúnbẹ̀rẹ̀.

---

## Ìwádìí Àṣìṣe

- Weighted combo dáhùn `503 all_targets_cooling_down` (`Retry-After` ti ṣètò, `diagnostics.excluded` kó gbogbo target jọ pẹ̀lú `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → a ti ṣètò pool náà ó sì ti sopọ̀, resilience timer kan ni ó yọ gbogbo target kúrò; ìkìlọ̀ `[COMBO] Weighted selection: every target excluded before dispatch — …` náà darúko àwọn ìdí àti àwọn ìṣẹ́jú-àáyà tó kù. `404 no_executable_targets` láti combo kannáà túmọ̀ sí pé kò sí resilience timer kankan tó wà nínú ọ̀rọ̀ náà (kò sí ohun láti ṣe, tàbí gbogbo àkáùntì kùnà ìdánwò ìwàlààyè náà). A kọ́ ọ́ nínú `open-sse/services/combo/pinRecovery.ts` láti àwọn ìyọkúrò tí a kójọpọ̀ nínú `targetResolution.ts`.
- Gbogbo kókó olupese kan tí a fò → ṣàyẹ̀wò ipò circuit breaker ÀTI `rateLimitedUntil`/`testStatus` ti ìsopọ̀ kọ̀ọ̀kan.
- Olupese tí a yọ kúrò ní pátápátá lẹ́yìn window atúntò → kóòdù ń kà `state` gangan dípò `getStatus()`/`canExecute()`.
- Kókó kan kùnà, àwọn yòókú yẹ kí wọ́n ṣiṣẹ́ → fẹ̀yìntí connection cooldown kí o tó circuit breaker.
- Awoṣe kan ṣoṣo ló kùnà → fẹ̀yìntí model lockout kí o tó connection cooldown.
- Ipò yẹ kí ó tún ara rẹ̀ dà bí i ṣùgbọ́n kò ṣe é → ṣàyẹ̀wò ami-àkókò ọjọ́ iwájú + ọ̀nà kíkà tó ń tún ipò tó ti parí ṣe. Àwọn ipò pátápátá nílò àyípadà láfọwọ́ṣe.

---

## Ipò ìgbàṣiṣe — ìtọ́kasí kíákíá fún agent

> A gbe e kúrò gẹ́gẹ́ bó ṣe rí láti inú `AGENTS.md` → "Resilience Runtime State" (PR #12743) kí
> ìtọ́nisọ́nà agent lè wà lábẹ́ ìwọ̀n context 40k. Ìwòye kíkéékeré tó kan agent ni ẹ̀yí jẹ́ fún
> àwọn abala tó wà lókè; àwọn abala onínọ́ńbà ṣì dúró gẹ́gẹ́ bí ìtọ́kasí kíkún.

OmniRoute ní ọ̀nà mẹ́ta fún àṣìṣe-ìgbàdíẹ̀ tó jọ ara wọn ṣùgbọ́n tó yàtọ̀. Pa àyíká wọn
lọ́tọ̀ nígbà tí o bá ń ṣe ìwádìí àṣìṣe ìwà ìtọ́sọ́nà. Wo
[àwòrán ìfaradà ipele mẹ́ta](../diagrams/exported/resilience-3layers.svg)
(orísun: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))
fún máàpù rírí lẹ́sẹ̀kẹsẹ̀.

### Circuit Breaker Olupese

**Àyíká**: gbogbo olupese, f.a. `glm`, `openai`, `anthropic`.

**Ète**: dí ṣíṣe traffic ránṣẹ́ sí olupese tó ń kùnà lẹ́ẹ̀mejì ní ipele
upstream/iṣẹ́, kí olupese kan ṣoṣo tí kò bàjẹ́ má di gbogbo ìbéèrè lọ́ra.

**Ìmúṣẹ**:

- Kiláàsì mọlẹ̀: `src/shared/utils/circuitBreaker.ts`
- Ìsopọ̀ okun ẹ̀nù-ọ̀nà chat/ìgbéṣẹ̀: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- API ipò ìgbàṣiṣe: `src/app/api/monitoring/health/route.ts`
- Àwọn wrapper àpapọ̀: `open-sse/services/accountFallback.ts`
- Tábìlì ipò tí wọ́n pamọ́: `domain_circuit_breakers`

**Àwọn ipò** (4 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: a gba traffic deédéé láàyè.
- `DEGRADED`: ààlà ìkìlọ̀-kákákí — àwọn àṣìṣe ti kọja ààlà ìrẹ̀lẹ̀ ṣùgbọ́n kò tíì dé
  ààlà breaker; traffic ṣì ń rè, àwọn dashboard ń fi ìkìlọ̀ náà hàn. Ìdánwò ìsopọ̀
  tó péye tàbí window dídákẹ́ láìsí àṣìṣe tuntun máa dá a padà sí `CLOSED`
  (`docs/architecture/RESILIENCE_GUIDE.md` ló ní window náà).
- `OPEN`: a dí olupese lọ́wọ́ fún ìgbà díẹ̀; àwọn olùpè máa gba èsì
  provider-circuit-open tàbí ìtọ́sọ́nà combo á fò sí target mìíràn.
- `HALF_OPEN`: àkókò reset timeout ti lọ kọja; gba ìbéèrè probe láàyè. Àṣeyọrí máa
  pa breaker náà, àṣìṣe sì tún ṣí í.

**Àwọn àtòwáábáṣe** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, tí a ń lo nípasẹ̀
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker` nínú `src/lib/resilience/settings.ts` →
`getCircuitBreaker(provider, …)` nínú `src/sse/handlers/chatHelpers.ts`). Breaker
gbogbo-olupese ń ṣiṣẹ́ lórí `circuitBreakerThreshold` / `circuitBreakerReset`:

| Profaili |             ń rẹ̀lẹ̀ ní | ń ṣí ní (`circuitBreakerThreshold`) | atúntò (`circuitBreakerReset`) |
| -------- | --------------------: | ----------------------------------: | -----------------------------: |
| OAuth    |                   `5` |                                 `8` |                          `60s` |
| API key  |                   `7` |                                `12` |                          `30s` |
| Local    | (tí a yọ̀ láti inú rẹ̀) |                                 `2` |                          `15s` |

`PROVIDER_PROFILES` tún ṣàlàyé `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 ìṣẹ́jú) àti `providerCooldownMs` (5/10/1 ìṣẹ́jú): àwọn
wọ̀nyí ni wọ́n ń mú **ẹ̀nù-ọ̀nà window ti Provider Cooldown gbogbogbo tó jẹ́ aṣayan
(opt-in)** ṣiṣẹ́ (`PROVIDER_COOLDOWN_ENABLED`, ó pa gẹ́gẹ́ bí àtòwáábáṣe) — ẹ̀kọ́
ipele-olupese nínú `open-sse/services/providerCooldownTracker.ts` máa kà sí cooling lẹ́yìn
àṣìṣe `providerFailureThreshold` nínú `providerFailureWindowMs`, lẹ́yìn náà ó máa
cool fún `providerCooldownMs`. Wọn KÒ ṣe ààlà breaker tó ń ṣiṣẹ́ lọ́wọ́lọ́wọ́ — má ṣe
ṣàtúnṣe wọn pẹ̀lú retí ìwà breaker. Gbogbo àtòwáábáṣe lè bori nípasẹ̀
àwọn env var `OMNIROUTE_PROVIDER_BREAKER_*` àti `OMNIROUTE_CIRCUIT_BREAKER_*`;
tábìlì ìtọ́kasí tó péye fún ìgbàṣiṣe wà nínú `docs/architecture/RESILIENCE_GUIDE.md`.

Àwọn ipò àṣìṣe ipele-olupese nìkan ni ó yẹ kí ó mu breaker olupese ṣiṣẹ́:

```ts
(408, 500, 502, 503, 504);
```

Má ṣe mu breaker gbogbo-olupese ṣiṣẹ́ fún àwọn àṣìṣe àkáùntì/kókó/awoṣe deédéé bí ọ̀pọ̀
jùlọ irú `401`, `403`, tàbí `429`. Àwọn irú náà sábà máa ń jẹ́ ti connection cooldown tàbí
model lockout. `403` olupese API-key gbogbogbo yẹ kí ó lè gba ìmúpadà àyàfi tí a bá
ka á sí àṣìṣe olupese/àkáùntì terminal.

Breaker náà ń lo ìmúpadàbọ̀ lẹ́ṣẹ̀ṣẹ̀ (lazy recovery), kì í ṣe àkókò-ìṣẹ́ abẹ́lẹ̀ (background timer). Nígbà tí `OPEN` bá parí, àwọn kíkà bíi `getStatus()`, `canExecute()`, àti `getRetryAfterMs()` máa ń tún ipò náà ṣe sí `HALF_OPEN`, nítorí náà àwọn dashboard àti àwọn ohun-èlò kíkọ́ àfojúsùn combo kì yíò máa yọ olùpèsè tí ìgbà rẹ̀ ti parí kúrò láé.

### Ìdáàrà Ìsopọ̀

**Ìwọ̀n**: ìsopọ̀/àkáǹtì/kọ́kọ́rọ́ olùpèsè kan ṣoṣo.

**Ète**: láti fò kọ́kọ́rọ́/àkáǹtì kan tí kò dára fún ìgbà díẹ̀, nígbà tí àwọn ìsopọ̀ mìíràn fún olùpèsè kannáá ń tẹ̀síwájú láti ń gbé àwọn ìbéèrè jáde.

**Ìmúṣẹ̀ṣe**:

- Ọ̀nà kíkọ/ìmúdójúìwọ̀n: `src/sse/services/auth.ts::markAccountUnavailable()`
- Ìyàn/ìṣẹ̀ àkáǹtì: `src/sse/services/auth.ts::getProviderCredentials...`
- Ìṣirò ìdáàrà: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Àwọn ìsòro: `src/lib/resilience/settings.ts`

Àwọn aya pàtàkì lórí àwọn ìsopọ̀ olùpèsè:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Nígbà ìyàn àkáǹtì, a máa fò ìsopọ̀ kan nígbà tí:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Àwọn ìdáàrà náà jẹ́ lẹ́ṣẹ̀ṣẹ̀ pẹ̀lú: nígbà tí `rateLimitedUntil` bá ti kọjá, ìsopọ̀ náà máa di ẹlẹ́báṣepọ̀ sí i. Nígbà lílò rere, `clearAccountError()` máa pa `testStatus`, `rateLimitedUntil`, àwọn aya àṣìṣe, àti `backoffLevel` rẹ́.

Iwà ìdáàrà ìsopọ̀ àtẹ̀ṣe:

- Ìdáàrà ìpìlẹ̀ OAuth: `5s`.
- Ìdáàrà ìpìlẹ̀ API-key: `3s`.
- API-key `429` gbọdọ̀ fẹ́ àwọn àmì ìtọ́nisọ̀nà ìtúnjìdé láti ọ̀dọ̀ upstream (`Retry-After`, àwọn header àtúntò, tàbí ọ̀rọ̀ àtúntò tí a lè ṣàtúnjọ) nígbà tí wọ́n bá wà.
- Àwọn ìkùnà tó tẹ̀le ara wọn tí a lè padàsì ń lo exponential backoff:

```ts
baseCooldownMs * 2 ** failureIndex;
```

Ààbò anti-thundering-herd ń dí àwọn ìkùnà tó ń ṣẹlẹ̀ lọ́jọ̀pọ̀ lórí ìsopọ̀ kannáá kí wọ́n má mú ìdáàrà gùn lẹ́ẹ̀ẹ̀kansi tàbí kí wọ́n ṣe ìfikún `backoffLevel` lẹ́mẹjì.

Àwọn ipò ìparí kì í ṣe ìdáàrà. `banned`, `expired` (tó máa di ìparí lẹ́yìn àwọn ìtúnjìdé N tó ní ààlà nípasẹ̀ `EXPIRED_RETRY_MAX` nìkan), àti `credits_exhausted` ni wọ́n gbéra kí wọ́n má bàá sí ní àìrílò títí tí àwọn ìfàwẹ̀hàn/ìsòro yóò fi yí padà tàbí tí olùṣàkóso kan yóò tún wọ́n ṣe. Má ṣe kọ ipò ìdáàrà ìgbà díẹ̀ sórí àwọn ipò ìparí.

### Ìdíwọ́ Àwòsẹ

**Ìwọ̀n**: olùpèsè + ìsopọ̀ + àwòsẹ.

**Ète**: láti yàgò fún dídáálàgbára gbogbo ìsopọ̀ kan nígbà tí àwòsẹ kan ṣoṣo nìkan ni kò sí tàbí quota ti dí í lọ́wọ́ fún ìsopọ̀ náà.

Àwọn àpẹẹrẹ:

- Àwọn olùpèsè quota àwòsẹ-kọ̀ọ̀kan tó ń dá `429` padà.
- Àwọn olùpèsè abílé tó ń dá `404` padà fún àwòsẹ kan tó sọnù.
- Àwọn ìkùnà àṣẹ ipò/àwòsẹ olùpèsè-kan bíi àwọn ipò Grok tí a yàn.

Ìdíwọ́ àwòsẹ wà nínú `open-sse/services/accountFallback.ts` ó sì jọ̀wọ́ ìsopọ̀ kannáá láti tẹ̀síwájú láti ń sin àwọn àwòsẹ mìíràn.

### Ìtọ́nisọ̀nà Ìwádìí Àṣìṣe

- Tí gbogbo àwọn kọ́kọ́rọ́ fún olùpèsè kan bá fò, ṣàyẹ̀wò ipò breaker olùpèsè àti `rateLimitedUntil`/`testStatus` ti ìsopọ̀ kọ̀ọ̀kan.
- Tí olùpèsè kan bá hàn bí ẹni pé a ti yọ ọ́ kúrò láé lẹ́yìn gbòǹgàn àtúntò, ṣàyẹ̀wò bóyá kóòdù ń ka `state` rárá dípò lílò `getStatus()`/`canExecute()`.
- Tí kọ́kọ́rọ́ olùpèsè kan bá kùnà ṣùgbọ́n àwọn mìíràn yẹ kí wọ́n ṣiṣẹ́, fẹ́ ìdáàrà ìsopọ̀ ju breaker olùpèsè lọ.
- Tí àwòsẹ kan ṣoṣo nìkan bá kùnà, fẹ́ ìdíwọ́ àwòsẹ ju ìdáàrà ìsopọ̀ lọ.
- Tí ipò kan bá yẹ kí ó máa mú ara ẹni padà, ó gbọdọ̀ ní àmì-àkókò ọ̀la/ìparí àkókò àtúntò àti ọ̀nà kíkà tí ń tún ipò tó ti parí ṣe. Àwọn ipò tó dúró láé nílò ìyípadà ìfàwẹ̀hàn tàbí ìtòlẹ́sẹ̀ẹsẹ̀ ọwọ́.

---

## Ṣíṣe àmì ọwọ́ TLS & Ìbòmọ́lẹ̀

Ìbòmọ́lẹ̀ pàtó olùpèsè (JA3/JA4, CCH, ìṣúbọ̀) jẹ́ kíkọ àkọsílẹ̀ lọ́tọ̀ — wo `docs/security/STEALTH_GUIDE.md` (git; kò tíì ṣe àkópọ̀ sínú `/docs`).

---

## Ìdánwò ìfaradà (Phase 8 · Block C)

Lẹ́yìn àwọn ìdánwò ẹyọ fún ọ̀nà ìfaradà, àwọn ìdánwò mẹ́ta ń lo àyíká ìṣiṣẹ́ lábẹ́
àwọn ipò ìfúnni/ìkùnà gidi (gbogbo wọn jẹ́ integration/nightly — kò sí ẹyọ̀kan tó dí àwọn PR lọ́wọ́):

| Ìdánwò      | Ohun tó ṣe                                                                                                                                                             | Ṣíṣe                                     |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| Chaos       | Node fake-upstream ń fi latency/reset/timeout/503 gidi sínú; ó ń ṣàyẹ̀wò pé circuit breaker ṣí/padà àti pé `checkFallbackError` pín 503 sí fallback tí ó lè gba àtúnṣe. | `RUN_CHAOS_INT=1 npm run test:chaos`     |
| Heap-growth | Àwọn streams ~500 fún `createSSEStream` kọ̀ọ̀kan lábẹ́ `--expose-gc`; ó ń kùnà tí heap bá pọ̀ ju aàlà òkè lọ (ààbò OOM #3069).                                             | `npm run test:heap`                      |
| k6 soak     | Èrù tẹ̀síwájú lórí `/api/monitoring/health`; àwọn aàlà p95/àṣìṣe.                                                                                                       | `k6 run tests/load/k6-soak.js` (nightly) |

`.github/workflows/nightly-resilience.yml` ni ó ń darí wọn (cron + dispatch). Nínú
`test:integration` tẹ́lẹ̀tẹ̀lẹ̀, chaos àti heap máa ń fò fúnra wọn (láìsí `RUN_CHAOS_INT`/`--expose-gc`).

---

## Wo tún

- [Ìtọ́nisọ́nà Àpẹ̀rẹ](./ARCHITECTURE.md) — Àpẹ̀rẹ ètò àti àwọn ohun inú rẹ̀
- [Ìtọ́nisọ́nà Olùlò](../guides/USER_GUIDE.md) — Àwọn olùpèsè, àwọn àkópọ̀, ìsopọ̀ CLI
- [Ẹ̀rọ̀ Auto-Combo](../routing/AUTO-COMBO.md) — Kíkà àmì 16-factor, àwọn pack ipò
