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

**Ààlà:** asopọ̀/àkọọ́lẹ̀/kọ́kọ́rọ́ olupèsè kan ṣoṣo.

**Ète:** fo kọ́kọ́rọ́ kan tí kò dára, nígbà tí àwọn asopọ̀ mìíràn fún olupèsè kan náà ń tẹ̀síwájú láti pèsè iṣẹ́.

**Ìmúṣẹ:**

- Samì sí gẹ́gẹ́ bí èyí tí kò sí fún lílò: `src/sse/services/auth.ts::markAccountUnavailable()`
- Yíyan: `getProviderCredentials*` nínú fáìlì kan náà
- Ìṣírò àkókò ìsinmi: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Àwọn ààtò: `src/lib/resilience/settings.ts`

**Àwọn pápá fún asopọ̀ kọ̀ọ̀kan:**

- `rateLimitedUntil` — àmì-àkókò títí àkókò ìsinmi yóò fi parí
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — ẹ̀rọ-kíkà ìfàsẹ́yìn tó ń pọ̀ sí ní ìlọ́po

**Àwọn àkókò ìsinmi àkọ́kọ́:**

- Ìpìlẹ̀ OAuth: 5s
- Ìpìlẹ̀ API-key: 3s
- API-key 429: ó fi `Retry-After`/àwọn àkọlé ìtúntò/ọ̀rọ̀ ìtúntò tó ṣeé túmọ̀ láti upstream síwájú
- Ìfàsẹ́yìn: `baseCooldownMs * 2 ** failureIndex`

**Ìdábòbo lòdì sí ogunlọ́gọ̀-ìbéèrè-lójijì:** ń dènà àwọn ìkùnà tó ṣẹlẹ̀ lẹ́ẹ̀kan náà láti fa àkókò ìsinmi gùn jù tàbí láti mú `backoffLevel` pọ̀ lẹ́ẹ̀mejì.

**Àwọn ipò òpin (KÌ Í ṣe àkókò ìsinmi):**

- `banned` — a ṣètò rẹ̀ nípasẹ̀ ìṣàwárí ọ̀rọ̀-tí-a-kọ̀ / ìfòfindè-àkọọ́lẹ̀ (wo [BAN_DETECTION](../security/BAN_DETECTION.md)), àti nípasẹ̀ ìkọ̀sílẹ̀ ìbéèrè-kọ̀ọ̀kan mẹ́ta léraléra láti upstream (`request_rejected`, àpẹẹrẹ Anthropic OAuth 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`); ìkọ̀sílẹ̀ ẹyọ kan nìkan yóò fi asopọ̀ náà sínú àkókò ìsinmi
- `expired` (ó yí padà sí ipò òpin lẹ́yìn iye ìgbìyànjú-àtúnṣe tó ní ààlà — `EXPIRED_RETRY_MAX = 3` pẹ̀lú ìfàsẹ́yìn tó ń pọ̀ sí ní ìlọ́po — kí àwọn àṣìṣe OAuth fún ìgbà díẹ̀ lè tún ara wọn ṣe kí àkọọ́lẹ̀ náà tó di pípa títí láé)
- `credits_exhausted`

Àwọn wọ̀nyí máa wà títí àwọn ìjẹ́rìí yóò fi yí padà tàbí olùdarí kan yóò fi tún wọn tò. Má ṣe fi ipò àkókò ìsinmi fún ìgbà díẹ̀ kọ lórí àwọn ipò òpin.

**Ìgbàpadà nígbà tí a bá nílò rẹ̀:** nígbà tí `rateLimitedUntil` bá ti kọjá, asopọ̀ náà tún yẹ fún lílò. Nígbà tí lílò bá ṣàṣeyọrí, `clearAccountError()` máa pa gbogbo àwọn pápá àṣìṣe rẹ́.

### Ìbámu ìpàdé (#7274)

**Ààlà:** ìpàdé oníbàárà kan (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` header) tí a so mọ́ asopọ̀ kan, fún olupèsè **èyíkéyìí**.

**Ète:** láti jẹ́ kí aṣojú ìbánisọ̀rọ̀-ọpọ̀-ìpele kan (Claude Code, aider, àwọn aṣojú àdáni) máa lo àkọọ́lẹ̀ kan náà lórí ọ̀pọ̀ ìbéèrè, kí ó dín ìpàdánù àyíká-ọ̀rọ̀ láàárín àwọn àkọọ́lẹ̀ àti àwọn 429 ìbẹ̀rẹ̀-tútù léraléra kù lórí àwọn olupèsè tó ní ipò ìpàdé fún àkọọ́lẹ̀ kọ̀ọ̀kan.

**Ìmúṣẹ:**

- Ìpinnu TTL: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Yíyan/ṣíṣẹ̀dá ìsopọ̀: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Yíyọ header jáde (gbogbogbò, olupèsè èyíkéyìí): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Tábìlì ìsopọ̀ tí a tọ́jú: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Ààtò: `sessionAffinityTtlMs` (TTL àgbáyé ní ms, `0` máa pa á) — `src/lib/db/settings.ts`. A tún orúkọ rẹ̀ sọ láti `codexSessionAffinityTtlMs` tó jẹ́ ti Codex nìkan nípasẹ̀ ìṣíkiri `124_generic_session_affinity_ttl.sql`, èyí tó gbé TTL Codex èyíkéyìí tí a ti ṣètò tẹ́lẹ̀ wá gẹ́gẹ́ bí iye àkọ́kọ́ tuntun.

Ṣáájú #7274, `resolveSessionAffinityTtlMs()` máa dáwọ́ dúró lẹ́sẹ̀kẹsẹ̀ pẹ̀lú `0` fún gbogbo olupèsè àfi `codex`, nítorí náà ààtò TTL (àti àwọn session headers) kò ní ipa ní ibòmíràn bó tilẹ̀ jẹ́ pé ètò ìsopọ̀ àti yíyọ header jáde kò dá lórí olupèsè kankan tẹ́lẹ̀. Àtúnṣe náà yọ ìpadà-kúrò kutukutu yẹn; TTL ń kan gbogbo olupèsè bákan náà ní báyìí lẹ́yìn tí a bá ṣètò rẹ̀ ní àgbáyé sí iye tó ju `0` lọ.

A kì í fi àwọn session-affinity headers mẹ́tẹ̀ẹ̀ta ránṣẹ́ sí upstream láé — àwọn executors ń kọ àwọn upstream headers tiwọn láti ìbẹ̀rẹ̀ dípò kí wọ́n kọjá àwọn client headers lọ, nítorí náà èyí wà gẹ́gẹ́ bí correlation id inú ètò nìkan.

### Àwọn àdéhùn-lílò asopọ̀ ìpàdé tí a ń ṣàkóso ní àdáṣe

**Ààlà:** HTTP client/ìpàdé tí a ń ṣàkóso tó ń ṣiṣẹ́ kan ni ó ní asopọ̀ OmniRoute kan tó yẹ fún lílò.

**Ète:** láti pèsè ìní asopọ̀ àdáṣe tó lágbára fún àwọn oníbàárà tó nílò ààlà ìdarí líle
lórí ọ̀pọ̀ ìbéèrè. Èyí yàtọ̀ sí ìbámu ìpàdé, èyí tó jẹ́ ààyò ìtẹ̀síwájú asọ:
àdéhùn-lílò àdáṣe ń tọ́jú ipò ìgbésí-ayé sínú SQLite, ó ń mú kí ìní-olùní tó ń ṣiṣẹ́ àti
àìlẹ́mẹ̀ẹ́jì asopọ̀ tó ń ṣiṣẹ́ jẹ́ ti àgbáyé, ó sì ń kọ generation tó ti di àtijọ́ ṣáájú fífi ránṣẹ́ sí olupèsè.

Lílò ẹ̀yà yìí jẹ́ àṣàyàn fún API key kọ̀ọ̀kan. Kọ́kọ́rọ́ tí a ń ṣàkóso gbọ́dọ̀ ní scope `lease:exclusive` àti
àtòjọ `allowedConnections` tó ṣe kedere tí kò sì ṣófo. HTTP client èyíkéyìí lè lo lifecycle endpoint; kò sí
client name, user-agent, provider, OAuth method, tàbí model tí a nílò. Àdéhùn-lílò náà ní asopọ̀ kan,
kì í ṣe model, nítorí náà yíyí model padà máa pa ìsopọ̀ náà mọ́ níwọ̀n ìgbà tí asopọ̀ náà bá ṣì
yẹ fún lílò lọ́nà àdáyébá. Àwọn òfin model, quota, health, cooldown, àti allowlist deede ṣì jẹ́ aláṣẹ, wọ́n sì lè
yí generation kan náà padà sí asopọ̀ òmìnira mìíràn tó yẹ.

Ìgbésí-ayé náà ni `POST /api/v1/session-leases` pẹ̀lú àwọn ìṣe JSON `acquire`, `renew`, àti `release`.
Àwọn managed inference requests máa fi iye `X-OmniRoute-Lease-Owner` tí kò ṣeé túmọ̀ àti
`X-OmniRoute-Lease-Generation` tó péye hàn. Owner náà ń lo `vlo_` tí àwọn ẹyọ base64url 43 tẹ̀ lé; hash SHA-256
rẹ̀ nìkan ni a ń tọ́jú. Gbogbo final dispatch fence tún so authenticated API key ID àti
active connection ID pọ̀. A máa yọ àwọn lease control headers kúrò nínú logs, àwọn request snapshots tí a tọ́jú, àti
àwọn upstream executor headers.

Bí ìdarí deede bá ní àwọn managed candidates tó yẹ ṣùgbọ́n gbogbo free candidate bá ti wà lábẹ́
foreign active lease, OmniRoute máa dá HTTP `429` padà, lease-capacity-unavailable code, ipò
waiting-for-capacity, àti `Retry-After` tó ní ààlà tí a yọ láti expiry tó yẹ jù lọ tó kọ́kọ́ dé.
Àìsí ẹni tó yẹ ní ọ̀nà deede kì í ṣe lease contention, ó sì máa pa routing error semantics tó ti wà tẹ́lẹ̀ mọ́.

Àwọn ètò tó jọmọ́ rẹ̀ ṣì wà lọ́tọ̀:

- OAuth session occupancy jẹ́ pínpín asọ inú process fún àwọn OAuth accounts.
- Account semaphores ń fúnni ní request-concurrency permits, wọ́n sì máa parí nígbà tí request bá parí.
- Exclusive managed session leases jẹ́ ìní lifecycle tó pẹ́ pẹ̀lú generation fence.

---

## 3. Ìdènà Módẹ́lì

**Ìwọ̀n:** àkójọpọ̀ olùpèsè + àsopọ̀ + módẹ́lì.

**Ìwọ̀n kọ́kọ́rọ́ gẹ́gẹ́ bí ipò:** ipò tó kùnà ló pinnu kọ́kọ́rọ́ tí ìdènà yóò kọ sí
(`resolveLockoutScope()` nínú `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — àmì ìpín ìlò tàbí ẹ̀tọ́ — dènà **ẹbí ìpín ìlò**:
  fún codex, gbogbo ìwọ̀n `codex` / `spark` (gbogbo módẹ́lì `gpt-5*` ti
  àsopọ̀ náà), fún àwọn olùpèsè mìíràn `getQuotaScopedModelForProvider()`.
- `404` máa ń dènà módẹ́lì náà gan-an (`getModelLockKey()` máa ń dín `not_found` kù).
- Ipò èyíkéyìí mìíràn — àwọn ìkùnà ìgbékalẹ̀/asẹ́vá `5xx` àti `502` tí OmniRoute
  fúnra rẹ̀ dá sílẹ̀ láti inú ìfọwọ́sí dídára — máa ń dènà àkójọpọ̀ **gan-an**
  ti olùpèsè/àsopọ̀/módẹ́lì nìkan. Ìṣàn búburú lórí módẹ́lì kan kì í ṣe ẹ̀rí
  nípa ìpín ìlò àkọọ́lẹ̀ náà; ṣáájú òfin yìí, ìdáhùn òfo kan lórí
  `codex/gpt-5.6-luna` máa ń yọ gbogbo módẹ́lì `gpt-5*` ti àsopọ̀ náà kúrò
  nínú ìdarí fún ìṣẹ́jú 2–30 (tó ń pọ̀ sí i), bó tilẹ̀ jẹ́ pé ìpín ìlò rẹ̀ kò yí padà.
- Àṣàyàn `scope` tí olùpè kan sọ ní kedere máa ń borí ní gbogbo ìgbà (Antigravity máa ń fi `"exact"` ránṣẹ́).

**Ète:** láti yẹra fún pípa gbogbo àsopọ̀ kan, nígbà tí módẹ́lì kan ṣoṣo ni kò sí tàbí tí ìpín ìlò rẹ̀ ti ní ààlà.

**Àwọn àpẹẹrẹ:**

- Àwọn olùpèsè ìpín ìlò fún módẹ́lì kọ̀ọ̀kan tí ń dá `429` padà
- Àwọn olùpèsè abẹ́lẹ̀ tí ń dá `404` padà fún módẹ́lì kan tí kò sí
- Àwọn ìkùnà ìgbaniláyè tó jẹ́ pàtó sí ipò/módẹ́lì olùpèsè (fún àpẹẹrẹ, àwọn ipò Grok)

**Ìmúṣẹ:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Pátákó Ìṣàkóso Àkókò Ìsinmi Módẹ́lì (v3.8.0)

UI: Settings → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Ó ṣàkójọ àwọn ìdènà tó ń ṣiṣẹ́ pẹ̀lú: olùpèsè, àsopọ̀, módẹ́lì, ìdí, expiresAt. Àwọn olùṣàkóso lè tún módẹ́lì kan ṣiṣẹ́ pẹ̀lú ọwọ́ láti inú káàdì náà.

**REST API:**

- `GET /api/resilience/model-cooldowns` — ṣàkójọ àwọn ìdènà tó ń ṣiṣẹ́
- `DELETE /api/resilience/model-cooldowns` — tún ṣiṣẹ́ pẹ̀lú ọwọ́. Ara: `{provider, connection, model}`. Ìfàṣẹsí: ìṣàkóso.

### UI ètò ìdènà + ìmúláradá ìdínkù nígbà àṣeyọrí (v3.8.23)

Ìdènà módẹ́lì yí padà láti ìhùwàsí tí a kọ sínú kóòdù tí ó sì máa ń ṣiṣẹ́ nígbà gbogbo sí ẹ̀yà
tí a lè ṣètò ní kíkún, tí a sì gbọ́dọ̀ yàn láti ṣiṣẹ́, pẹ̀lú káàdì ètò tirẹ̀ àti ọ̀nà ìmúláradá tó ń tún ara rẹ̀ ṣe.

**Káàdì ètò:** Settings → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Èyí **yàtọ̀** sí `ModelCooldownsCard` ti kíkà-nìkan tó wà lókè (èyí tó kan
_ṣàkójọ_ àwọn ìdènà tó ń ṣiṣẹ́) — káàdì tuntun náà _ń ṣètò àwọn pàrámítà_. Àwọn iye àkọ́kọ́
wà nínú `DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`):

| Ètò                     | Iye àkọ́kọ́                        | Ìtumọ̀                                                                            |
| ----------------------- | -------------------------------- | -------------------------------------------------------------------------------- |
| `enabled`               | `false`                          | Yíyí àgbà — ìdènà módẹ́lì **wà ní pípa ní iye àkọ́kọ́**.                            |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Àwọn ipò orísun òkè tí a kà sí ìkùnà tó ní ìwọ̀n módẹ́lì.                          |
| `baseCooldownMs`        | `120_000` (120 s)                | Gígùn ìdènà àkọ́kọ́ fún ìkùnà àkọ́kọ́.                                               |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Òpin àkókò ìsinmi tó ti pọ̀ sí i.                                                 |
| `maxBackoffSteps`       | `10`                             | Iye ìgbésẹ̀ gíga jù lọ fún ìlọsíwájú ìdádúró olùkùnsìn.                           |
| `useExponentialBackoff` | `true`                           | Bóyá àwọn ìkùnà tó ń ṣẹlẹ̀ léraléra yóò mú àkókò ìsinmi pọ̀ sí i ní ọ̀nà olùkùnsìn. |

Àwọn ètò máa ń wà pẹ́ nípasẹ̀ ibi ìpamọ́ ètò déédéé, wọ́n sì máa ń jẹ́rìí nípasẹ̀
àwòrán ètò ìfaradà; káàdì náà máa ń fi ààlà sí `baseCooldownMs`/`maxCooldownMs`
(pẹ̀lú `maxCooldownMs ≥ baseCooldownMs`) àti `maxBackoffSteps`.

**Ìmúláradá ìdínkù nígbà àṣeyọrí:** ìmúláradá **kì í ṣe** ìparí aago nìkan. Ìdáhùn
tó ní ìlera máa ń dín iye ìkùnà módẹ́lì náà kù, kí módẹ́lì tó ti bọ̀ sípò
láàárín àkókò má bàa tẹ̀síwájú ní pípọ̀ sí i (kí ó sì tú ìdènà) ṣáájú kí aago rẹ̀ tó parí. Lórí ibi àfojúsùn
àpapọ̀ tó ṣàṣeyọrí, `open-sse/services/combo.ts` máa ń pe `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), èyí tó máa ń **pín** `failureCount`
tí a fipamọ́ sí ìdajì (`Math.floor(failureCount / 2)`); nígbà tó bá dé `0`, a ó pa
àkọsílẹ̀ ìdènà náà rẹ́ pátápátá. Ẹgbẹ́ kejì rẹ̀, `recordModelLockoutFailure()`,
máa ń fi ọ̀kan kún iye náà (ó sì máa ń mú àkókò ìsinmi pọ̀ sí i) fún àwọn ìkùnà láàárín
àkókò ìlọsíwájú. Ìdínkù nígbà àṣeyọrí yìí wà ní àfikún sí ìparí aago lásán —
ọ̀nà méjèèjì lè tún módẹ́lì kan ṣiṣẹ́.

**Ipò:** àwọn ìdènà wà **nínú ìrántí** (`Map` ti ìlànà kọ̀ọ̀kan fún
`ModelLockoutEntry` tí `provider:connectionId:model` jẹ́ kọ́kọ́rọ́ rẹ̀, àwọn ìdènà ìwọ̀n gan-an ní
`provider:connectionId:exact:model`), a kò fi wọ́n pamọ́ sínú
DB — wọ́n máa ń sọnù nígbà àtúnrẹ̀rẹ̀. A fi àwọn _ètò_ pamọ́; _ipò_ ìdènà tó ń ṣiṣẹ́
jẹ́ ti ìgbà díẹ̀.

---

## 4. Ìṣàkóso Ìṣiṣẹ́pọ̀ Nípasẹ̀ Pínpín Ìpín (v3.8.36)

Àwọn àkọọ́lẹ̀ ìforúkọsílẹ̀ (GLM, MiniMax, àti bẹ́ẹ̀ bẹ́ẹ̀ lọ) sábà máa ń gba kìkì
ìbéèrè ~1–3 ní ìgbà kan náà; ríré kọjá ìyẹn máa ń fa 429 àti àkókò ìsinmi. Èyí le gan-an lábẹ́
àwọn àkójọpọ̀ **quota-share** (`qtSd/…`), níbi tí ọ̀pọ̀ kọ́kọ́rọ́ API ti ń pín àkọọ́lẹ̀
upstream kan náà. Ìpele mẹ́ta ló ń dáàbò bo àkọọ́lẹ̀ tí a pín kí ìbéèrè má bà á kún.

### Òpin ìṣiṣẹ́pọ̀ fún ìsopọ̀ kọ̀ọ̀kan (`max_concurrent`)

Ìsopọ̀ olùpèsè kọ̀ọ̀kan lè ṣètò òpin `max_concurrent`
(`provider_connections.max_concurrent`, tí a ṣètò nínú modal ìsopọ̀ / API / DB).
Fi í sílẹ̀ ní òfo bí kò bá sí òpin. Èyí ni ìṣàkóso kan ṣoṣo tó ń darí ìpele ìtẹ̀léra
ní ìsàlẹ̀ — ṣètò rẹ̀ sí iye ìṣiṣẹ́pọ̀ gidi ti àkọọ́lẹ̀ náà (fún àpẹẹrẹ GLM ~1, MiniMax ~2).

### Ìtẹ̀léra àwọn ìbéèrè quota-share

Nígbà tí ìfiranṣẹ́ quota-share bá ń tọ́ka sí ìsopọ̀ kan tó ní
`max_concurrent` tó jẹ́ nọ́ńbà rere, àwọn ìbéèrè tó ń lọ ní ìgbà kan náà sí **àkọọ́lẹ̀** yẹn ni a máa tò lẹ́sẹẹsẹ nípasẹ̀
semaphore kan fún ìsopọ̀ kọ̀ọ̀kan (kọ́kọ́rọ́ `qsconn:<connectionId>`): àwọn ìbéèrè tó pọ̀ ju **máa ń dúró nínú
ìlà** dípò kí wọ́n kún àkọọ́lẹ̀ náà. Ó jẹ́ **ìkùnà-síṣí** — bí ìlà bá ti kún tàbí àkókò bá parí,
yóò tẹ̀ síwájú láìgba àyè dípò kí ó kọ ìbéèrè tó ṣeé firánṣẹ́ láéláé.
Tan tàbí pa á ní **Àwọn Ààtò → Ìfaradà → Ìṣiṣẹ́pọ̀ quota-share fún ìsopọ̀ kọ̀ọ̀kan**
(`resilienceSettings.quotaShareConcurrencyLimit.enabled`, ó máa ń wà ní títàn
láti ìbẹ̀rẹ̀). Láìsí òpin `max_concurrent`, ìhùwàsí náà kò yí padà.

> Ẹnu-ọ̀nà ìtọ́sọ́nà quota-share (`selectQuotaShareTarget`, DRR + P2C) fúnra rẹ̀
> jẹ́ ìkùnà-síṣí, ó sì kàn ń _dín ààyò_ ìsopọ̀ tó ti dé òpin kù — pẹ̀lú
> àkójọpọ̀ ìsopọ̀ kan ṣoṣo, kò lè fi òpin líle mú un, nítorí náà semaphore yìí ni ohun tó ń
> dá ìkúnwọ̀lé náà dúró ní ti gidi.

### Ìtúnṣe ìgbìyànjú tó mọ àkókò ìsinmi combo

Fún gbogbo ọgbọ́n combo (nígbà tí a bá mú un ṣiṣẹ́), ìbéèrè kan tí ì bá mú 429
dájú nítorí àkókò ìsinmi kúkúrú tó jẹ́ ti ìgbà díẹ̀ máa ń dúró de òpin rẹ̀, yóò sì tún firánṣẹ́ dípò
dídá 429 padà — èyí bo àwọn fèrèsé TPM/RPM irú Gemini (~60s retry-after)
lórí combo ọ̀pọ̀ model, fún àpẹẹrẹ nígbà tí àwọn ibi-afẹ́ méjèèjì nínú combo model méjì bá dé òpin
oṣùwọ̀n fún model kọ̀ọ̀kan. `comboCooldownWait` (`enabled`, `maxWaitMs`, `maxAttempts`,
`budgetMs`) ní **Àwọn Ààtò → Ìfaradà** ló fi ààlà sí i. Kò dúró fún `quota_exhausted`
(títìpa títí di ọ̀gànjọ́ òru) tàbí àwọn ìdí ìfàṣẹsí/àìrí-nǹkan.

---

## 5. Ìṣàkóso Gbigba Ìbéèrè Sínú Ìlà (v3.8.49 · ọ̀ràn #6593)

**Ààlà iṣẹ́**: ìlà òṣùwọ̀n fún olùpèsè+ìsopọ̀ kọ̀ọ̀kan ní agbègbè (`open-sse/services/rateLimitManager.ts`,
tí Bottleneck ń ṣe àtìlẹ́yìn fún), ìpele kan ní ìsàlẹ̀ àwọn ọ̀nà mẹ́ta tó wà lókè.

**`maxWaitMs` jẹ́ orúkọ àtijọ́ tí a fi pamọ́ fún ìparí àkókò ìṣiṣẹ́.**
A ń fi `resilienceSettings.requestQueue.maxWaitMs` ránṣẹ́ sí Bottleneck gẹ́gẹ́ bí
`expiration` iṣẹ́ kan, tí aago rẹ̀ kì í bẹ̀rẹ̀ títí lẹ́yìn ìfiranṣẹ́. Nítorí náà, ó fi ààlà sí
ìṣiṣẹ́ tí limiter ń ṣàkóso, kì í ṣe àkókò tí a lò nínú ìlà agbègbè. Ìparí àkókò
máa ń farahàn gẹ́gẹ́ bí `code: "RATE_LIMIT_EXECUTION_TIMEOUT"` agbègbè tó ṣeé gbẹ́kẹ̀lé (HTTP 504);
orúkọ code ìparí-àkókò-ìlà àtijọ́ ni a gba fún ìbámu-pẹ̀yìn inú ètò tó ṣeé gbẹ́kẹ̀lé
nìkan. Ìyẹn jẹ́ 15000ms ní àkọ́kọ́; yí i padà nípasẹ̀
`RATE_LIMIT_MAX_WAIT_MS` (env) tàbí dashboard (**Àwọn Ààtò → Ìfaradà**,
òpin UI 1–30000ms). Àkókò tí ìbéèrè fi ń gbé inú ìlà kò ní òpin àkókò; lo
`maxQueueDepth` ní ìsàlẹ̀ láti fi ààlà sí àwọn olùpè tó wà ní ìlà.

**`maxQueueDepth` — òpin gbigba tí a lè yàn láti mú ṣiṣẹ́ (tuntun).** `resilienceSettings.requestQueue.maxQueueDepth`
fi ààlà sí iye àwọn ìbéèrè tó lè jókòó nínú ìlà (tí a kò tíì firánṣẹ́) fún
olùpèsè+ìsopọ̀ kan ní ìgbà kan náà. Nígbà tí ìlà bá ti ní `maxQueueDepth`
ìbéèrè, a máa kọ ìbéèrè tuntun lẹ́sẹ̀kẹsẹ̀ pẹ̀lú àṣìṣe olóríṣi
`code: "RATE_LIMIT_QUEUE_FULL"` **ṣáájú** kó tó dé `limiter.schedule()`
rárá — nítorí náà, ìkọ̀sílẹ̀ náà kò ná nǹkan púpọ̀, ó sì ṣẹlẹ̀ ṣáájú iṣẹ́
ìpọ́npọ̀ prompt / ìtumọ̀ èdè downstream èyíkéyìí fún ìbéèrè yẹn. `0` ní àkọ́kọ́ =
pípa, tó ń pa ìhùwàsí ìlà aláìlópin tó ti wà mọ́; ààlà jẹ́ 0–100000.
Yí i padà nípasẹ̀ `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) tàbí
`resilienceSettings.requestQueue.maxQueueDepth` (dashboard/API patch).

Àyẹ̀wò gbigba náà fúnra rẹ̀ jẹ́ function mímọ́
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), nítorí náà
a lè ṣe unit test rẹ̀ láìní limiter Bottleneck gidi kan.

> RFC tó ṣí #6593 tún dábàá flag `bypassCompressionOnRateLimit`
> kan. Pipeline `open-sse/services/compression/` inú repo yìí jẹ́
> ìpọ́npọ̀ prompt/context lórí ìbéèrè LLM tó ń jáde (`chatCore.ts`,
> ní àyíká block `resolveCompressionSettings`/`selectCompressionStrategy`),
> kì í ṣe ìpọ́npọ̀ ìdáhùn HTTP lórí àwọn body 429 tí a dá — kò sí
> ọ̀nà code tó bá flag bypass gangan mu. Ìgbésẹ̀ ìpọ́npọ̀-prompt yẹn
> tún ń ṣiṣẹ́ _ṣáájú_ `withRateLimit()` lọ́wọ́lọ́wọ́ nínú pipeline ìbéèrè, nítorí náà
> àtúntò rẹ̀ láti fo ó nígbà ìkọ̀sílẹ̀ queue-full jẹ́ ìyípadà mìíràn tó tóbi ju
> ààlà iṣẹ́ ọ̀ràn yìí lọ; a mọ̀ọ́mọ̀ **kò** ṣe é níbí, a sì fi í sílẹ̀ gẹ́gẹ́ bí iṣẹ́
> tó lè tẹ̀lé bí èrè fífi CPU pamọ́ bá tó ewu àtúntò náà.

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
