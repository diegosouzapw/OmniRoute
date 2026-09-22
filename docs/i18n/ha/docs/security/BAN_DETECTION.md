# Account-Ban / Banned-Keyword Detection (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../security/BAN_DETECTION.md) · 🇪🇹 [am](../../../am/docs/security/BAN_DETECTION.md) · 🇸🇦 [ar](../../../ar/docs/security/BAN_DETECTION.md) · 🇦🇿 [az](../../../az/docs/security/BAN_DETECTION.md) · 🇧🇬 [bg](../../../bg/docs/security/BAN_DETECTION.md) · 🇧🇩 [bn](../../../bn/docs/security/BAN_DETECTION.md) · 🇨🇿 [cs](../../../cs/docs/security/BAN_DETECTION.md) · 🇩🇰 [da](../../../da/docs/security/BAN_DETECTION.md) · 🇩🇪 [de](../../../de/docs/security/BAN_DETECTION.md) · 🇬🇷 [el](../../../el/docs/security/BAN_DETECTION.md) · 🇪🇸 [es](../../../es/docs/security/BAN_DETECTION.md) · 🇪🇪 [et](../../../et/docs/security/BAN_DETECTION.md) · 🇮🇷 [fa](../../../fa/docs/security/BAN_DETECTION.md) · 🇫🇮 [fi](../../../fi/docs/security/BAN_DETECTION.md) · 🇫🇷 [fr](../../../fr/docs/security/BAN_DETECTION.md) · 🇮🇪 [ga](../../../ga/docs/security/BAN_DETECTION.md) · 🇮🇳 [gu](../../../gu/docs/security/BAN_DETECTION.md) · 🇮🇱 [he](../../../he/docs/security/BAN_DETECTION.md) · 🇮🇳 [hi](../../../hi/docs/security/BAN_DETECTION.md) · 🇭🇷 [hr](../../../hr/docs/security/BAN_DETECTION.md) · 🇭🇺 [hu](../../../hu/docs/security/BAN_DETECTION.md) · 🇦🇲 [hy](../../../hy/docs/security/BAN_DETECTION.md) · 🇮🇩 [id](../../../id/docs/security/BAN_DETECTION.md) · 🇳🇬 [ig](../../../ig/docs/security/BAN_DETECTION.md) · 🇮🇹 [it](../../../it/docs/security/BAN_DETECTION.md) · 🇯🇵 [ja](../../../ja/docs/security/BAN_DETECTION.md) · 🇬🇪 [ka](../../../ka/docs/security/BAN_DETECTION.md) · 🇰🇭 [km](../../../km/docs/security/BAN_DETECTION.md) · 🇮🇳 [kn](../../../kn/docs/security/BAN_DETECTION.md) · 🇰🇷 [ko](../../../ko/docs/security/BAN_DETECTION.md) · 🇱🇹 [lt](../../../lt/docs/security/BAN_DETECTION.md) · 🇱🇻 [lv](../../../lv/docs/security/BAN_DETECTION.md) · 🇮🇳 [ml](../../../ml/docs/security/BAN_DETECTION.md) · 🇮🇳 [mr](../../../mr/docs/security/BAN_DETECTION.md) · 🇲🇾 [ms](../../../ms/docs/security/BAN_DETECTION.md) · 🇲🇹 [mt](../../../mt/docs/security/BAN_DETECTION.md) · 🇲🇲 [my](../../../my/docs/security/BAN_DETECTION.md) · 🇳🇵 [ne](../../../ne/docs/security/BAN_DETECTION.md) · 🇳🇱 [nl](../../../nl/docs/security/BAN_DETECTION.md) · 🇳🇴 [no](../../../no/docs/security/BAN_DETECTION.md) · 🇮🇳 [or](../../../or/docs/security/BAN_DETECTION.md) · 🇮🇳 [pa](../../../pa/docs/security/BAN_DETECTION.md) · 🇵🇭 [phi](../../../phi/docs/security/BAN_DETECTION.md) · 🇵🇱 [pl](../../../pl/docs/security/BAN_DETECTION.md) · 🇵🇹 [pt](../../../pt/docs/security/BAN_DETECTION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/BAN_DETECTION.md) · 🇷🇴 [ro](../../../ro/docs/security/BAN_DETECTION.md) · 🇷🇺 [ru](../../../ru/docs/security/BAN_DETECTION.md) · 🇱🇰 [si](../../../si/docs/security/BAN_DETECTION.md) · 🇸🇰 [sk](../../../sk/docs/security/BAN_DETECTION.md) · 🇸🇮 [sl](../../../sl/docs/security/BAN_DETECTION.md) · 🇷🇸 [sr](../../../sr/docs/security/BAN_DETECTION.md) · 🇸🇪 [sv](../../../sv/docs/security/BAN_DETECTION.md) · 🇰🇪 [sw](../../../sw/docs/security/BAN_DETECTION.md) · 🇮🇳 [ta](../../../ta/docs/security/BAN_DETECTION.md) · 🇮🇳 [te](../../../te/docs/security/BAN_DETECTION.md) · 🇹🇭 [th](../../../th/docs/security/BAN_DETECTION.md) · 🇹🇷 [tr](../../../tr/docs/security/BAN_DETECTION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/BAN_DETECTION.md) · 🇵🇰 [ur](../../../ur/docs/security/BAN_DETECTION.md) · 🇺🇿 [uz](../../../uz/docs/security/BAN_DETECTION.md) · 🇻🇳 [vi](../../../vi/docs/security/BAN_DETECTION.md) · 🇳🇬 [yo](../../../yo/docs/security/BAN_DETECTION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/BAN_DETECTION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/BAN_DETECTION.md)

---

OmniRoute yana binciken amsoshin kuskure na upstream don gano alamomin da ke nuna cewa
**asusun mai samarwa ya mutu na dindindin** (an dakatar / an kashe / an haramta saboda ToS), kuma idan
an sami daidaito, yana mayar da wannan haɗin zuwa **matsayin ƙarshe na `banned`** domin kada
a sake zaɓarsa don buƙatu. Wannan shi ne abin da katin saitunan **Security → Banned Keywords**
yake daidaitawa ("Ƙarin kalmomin da ke jawo gano haramcin asusu na dindindin.
Kalmomin da aka gina a ciki suna aiki koyaushe.").

Wannan shafin yana bayyana jerin da aka gina a ciki, tsarin ganowa, iyakarsa, yadda ake ƙara
kalmomi na musamman cikin aminci, da yadda ake dawo da haɗin da aka yi wa alama. Matsayin
ƙarshe kansa wani ɓangare ne na tsarin juriya — duba
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md) ("Matsayin ƙarshe").

**Tushen gaskiya:** `open-sse/services/accountFallback.ts`
(`ACCOUNT_DEACTIVATED_SIGNALS`, `getMergedBannedSignals()`, `isAccountDeactivated()`).

## Kalmomin da aka gina a ciki

Waɗannan ƙananan jimloli 8 suna aiki koyaushe (ba tare da la'akari da manyan ko ƙananan haruffa ba), ko da kuwa akwai jerin na musamman:

```
account_deactivated
account has been deactivated
account has been disabled
your account has been suspended
this account is deactivated
verify your account to continue                                 (Antigravity / Google Cloud Code)
this service has been disabled in this account for violation    (Antigravity)
this service has been disabled in this account                  (Antigravity)
```

> Wannan jeri yana canzawa yayin da masu samarwa suke sauya lafazin haramcinsu. Kwafin
> hukuma shi ne `ACCOUNT_DEACTIVATED_SIGNALS` a cikin `open-sse/services/accountFallback.ts`;
> ɗauki tubalin da ke sama a matsayin hoton halin yanzu.

Teburan sigina guda biyu masu maƙwabtaka, amma **dabam**, suna cikin fayil ɗin guda kuma _ba_ sa cikin
ganowa ta kalmomin haramci:

- `CREDITS_EXHAUSTED_SIGNALS` — kuɗin biyan sabis/ƙayyadadden amfani sun ƙare (`insufficient_quota`,
  `credit_balance_too_low`, `payment required`, …) → matsayin ƙarshe na `credits_exhausted`.
- `OAUTH_INVALID_TOKEN_SIGNALS` — **ba na ƙarshe ba**; sabunta token zai iya dawo da shi.

Lura: jimlolin matsala na wucin gadi da aka saba gani kamar **`rate limit`** / `429` ana sarrafa su ta
hanyar iyakar amfani / lokacin sanyaya haɗi kuma **ba** siginar haramci ba ne.

## Tsarin ganowa

```
amsar kuskuren upstream
  → an mayar da body zuwa string + ƙananan haruffa
  → isAccountDeactivated(body): getMergedBannedSignals().some(sig => body.includes(sig))   [daidaita ƙaramin sashe]
  → an sami daidaito?
      → connection testStatus = "banned"      (na dindindin — lokacin sanyaya na shekara 1, ba ya taɓa dawowa ta atomatik)
      → idan saitin `autoDisableBannedAccounts` yana kunne kuma `autoDisableBannedScope`
        ya haɗa da wannan haɗin (`all`, ko `subscription` don OAuth/cookie/session)
        → haka kuma isActive = false. Maɓallan API da aka riga aka biya suna ci gaba da aiki idan scope ya kasance
        `subscription`.
      → ana tsallake haɗin yayin zaɓen asusu (matsayin combo QUOTA_BLOCKING)
```

- Daidaitawar ita ce binciken **ƙaramin sashe ba tare da la'akari da manyan ko ƙananan haruffa ba** a cikin **body**
  na amsar (`isAccountDeactivated`, `accountFallback.ts`).
- Mayarwa zuwa matsayin ƙarshe na dindindin `banned` yana faruwa idan body yana ɗauke da siginar haramci a **kowane
  matsayin HTTP** (ta `markAccountUnavailable` → `checkFallbackError`). Alamar
  **`deactivated`** mafi ƙuntatawa (`isActive=false` idan haɗin ba shi da
  sauran maɓallan API) hanyar `chatCore.ts` ta cikin layi ce ke rubuta ta a **HTTP 401 / 403**
  (an rarraba ta hanyar `classifyProviderError` → `ACCOUNT_DEACTIVATED`). Lura cewa
  hanyar `markAccountUnavailable()` tana rubuta matsayin ƙarshe _na daban_ —
  **`expired`** — don siginar `ACCOUNT_DEACTIVATED` iri ɗaya (ta
  `resolveTerminalConnectionStatus`), don haka haramci iri ɗaya zai iya bayyana a matsayin
  `deactivated` ko `expired` gwargwadon hanyar da ta sarrafa amsar. (Tsohon
  sharhin lamba yana cewa "lokacin da body na 401 ya ƙunshi waɗannan strings" — wannan
  bai bayyana cikakken halin yanzu ba.)
- Ana cire haɗin `banned` daga zaɓe a duk inda ake tace matsayin ƙarshe
  (`isTerminalConnectionStatus`, combo `QUOTA_BLOCKING_CONNECTION_STATUSES`).

## Iyaka — waɗanne providers ake bincikawa

**Duk providers.** Binciken yana gudana a cikin tsarin gama-gari na sarrafa kurakurai wanda
duk wata buƙatar upstream da ta gaza ke bi — **ba** a keɓance shi ga
OAuth/subscription scrapers ba. Matsayin terminal da ya haifar na kowane **connection** ne,
ba na kowane provider ba.

Duk da haka, ginannun _strings_ an tsara su ne musamman don subscription/OAuth
providers masu ainihin haɗarin dakatarwa (ChatGPT Web Codex, Claude Web, Codex, Muse Spark,
Antigravity). Provider mai amfani da API-key zai kunna detector ne kawai idan jikin kuskurensa
ya ƙunshi ɗaya daga cikin substrings ɗin a zahiri.

`autoDisableBannedScope` (`all` | `subscription`, tsoho `all`) yana sarrafa ko
dacewa da alama zai kuma saita `isActive=false`. `subscription` na nufin kujeru irin na shiga
(biyan kuɗin subscriptions da asusun kyauta, ciki har da zaman web-cookie). Har yanzu yana
rikodin `testStatus=banned` ga prepaid API keys amma yana barinsu a cikin routing
pool. Tsari mai ɗorewa shi ne override na kowane provider da kowane account; global
enum shi ne matakin farko.

## Kalmomin dakatarwa na musamman

Ƙara ko cire keywords a **Security → Banned Keywords** (ana adana su a matsayin global
setting na `customBannedSignals` ta hanyar `PATCH /api/settings`). Ana **ƙara su ga**
ginanniyar jerin — ba sa taɓa maye gurbinta — kuma suna yin hot-reload lokacin adanawa (da lokacin farawa)
ta hanyar `setCustomBannedSignals()`. An iyakance kowace keyword zuwa haruffa 200; babu
iyaka ga tsawon array.

**⚠ Haɗarin false-positive — zaɓi takamaiman jimloli.** Detection yana amfani da raw substring
match a kan dukan jikin response, kuma match ɗin **na dindindin** ne (cooldown na shekara 1,
farfadowa da hannu). Keyword mai faɗin ma’ana na iya dakatar da connection mai cikakkiyar lafiya:

- **Mara kyau:** `quota`, `limit`, `error`, `denied` — suna bayyana a kurakurai masu wucewa da yawa.
- **Mai kyau:** cikakkun jimlolin dakatarwa, misali `your account has been suspended for`,
  `account permanently banned`, `violation of our terms`.

Fi son jimla mafi tsawo marar shakku da provider ke mayarwa idan an yi dakatarwa ta gaske. Idan
kana shakka, fara lura da `lastError` na connection, sannan ƙara ainihin kalmomin.

## Maido da connection da aka yi wa alama

Matsayin terminal na `banned` / `deactivated` **ba sa taɓa farfaɗowa ta atomatik** (an cire su
daga proactive-recovery tick — `unavailable` cooldowns ne kawai suke farfaɗowa da kansu).
Dole ne operator ya share su a sarari:

1. **Sake gwada connection** — aikin **Test** na dashboard
   (`POST /api/providers/{id}/test`); probe mai nasara yana sake saita `testStatus` zuwa
   `active` kuma yana share filayen kuskure.
2. **Sake tabbatar da izini / gyara credentials** — ga OAuth providers, sake gudanar da tsarin login
   / refresh; hanyoyin ƙirƙira/shigo da provider suna saita `isActive = true`.
3. **Sake kunna connection** — idan auto-disable ya saita `isActive = false`
   (scope `all`, ko `subscription` ga OAuth/cookie/session connection),
   sake kunna shi bayan gyara account.

Babu maɓallin "clear ban flag" na daban — farfadowa yana faruwa ne ta hanyar sake gwadawa, sake auth, ko
sake kunnawa, daidai da dokar terminal-state ta gama-gari a cikin
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md).

## Keɓe probe (model test-all)

**Gazawar da ta samo asali daga probe** (model test-all / health-check dispatches da aka aiwatar
a cikin `runAsProbe`) ba ta taɓa cire connection daga pool (#9817): ana
**rikodin ta don a iya gani** (`last_error`, `last_error_type`, `error_code`,
`last_error_at`) amma tana tsallake **duk wani** sauyin routing — cooldowns, matsayin
terminal (`banned` / `deactivated` / `credits_exhausted`), per-model lockouts,
provider circuit breaker, quota cache na mintuna 5, OAuth token refresh
da auto-disable. Gazawar real request-path ce kawai take deactivating. Kuskuren da aka rikoda
shi ne yake sa account da aka yi wa alama ya bayyana a dashboard yayin da yake ci gaba da
samar da traffic.

Wurin yanke shawara guda ɗaya shi ne `shouldIsolateProbeFailures()`
(`src/shared/utils/probeOrigin.ts`), wanda **kowane** wuri da zai iya
canza routing state saboda gazawar da ta samo asali daga probe ke tuntuɓa:

- `markAccountUnavailable` (`auth.ts`) — record-only (`lastError` raw text,
  `lastErrorType`, `errorCode`, `lastErrorAt`; da gangan **babu**
  `backoffLevel`, wanda zai kunna selection-time auto-decay ya kuma goge
  record ɗin)
- `maybeAutoDisableBannedAccount` — babu auto-disable
- `chatCore` — FORBIDDEN, ACCOUNT_DEACTIVATED, QUOTA_EXHAUSTED (record-only,
  babu terminal `credits_exhausted`), GEO_BLOCKED (babu warewa na 24h),
  MODEL_NOT_FOUND (babu `lockModel`), codex 429 account-rotation failover
  (babu `markCodexScopeRateLimited`, babu `rate_limited_until` da aka adana, babu
  share session-affinity), `persistCodexQuotaState` (babu rubuta quota-state,
  babu cache invalidation), `recordKeyHealthStatus` (ba a taɓa key-health rotator
  ba)
- OAuth refresh — duka proactive refresh a executor base
  (`base.ts` `execute()`, ba a cinye refresh-token rotation ba) da
  reactive 401/403 path a cikin `chatCore` (babu `expired` deactivation)
- `chat.ts` — provider circuit breaker da quota cache na mintuna 5
  (`markAccountExhaustedFrom429`) ba sa taɓa lalacewa

Kuskuren da aka rikoda shi ne yake sa account da aka yi wa alama ya bayyana a dashboard
yayin da yake ci gaba da samar da traffic. Lura: probe record yana adana **raw**
(unsliced) error text, sabanin truncation na `slice(0,100)` a real path.

Operators da ke amfani da test-all a matsayin maintenance tool za su iya maido da
halayyar da aka saba da ita a baya (probe yana ƙidayuwa a matsayin real generation) ta ɗaya daga cikin:

- setting na `probeCanDisable` (`POST /api/settings` tare da
  `{"probeCanDisable": true}`, ko gyaran DB na `key_value` kai tsaye), ko
- feature flag **`PROBE_CAN_DISABLE=true`** (env ko DB override; yana rinjayar
  setting).

Fail-safe: idan binciken flag ko settings ya jefa kuskure, isolation zai ci gaba da kasancewa ON.

## Fayilolin tushe

| Abin da ya shafa                  | Fayil                                                                                                         |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Jadawalan sigina + daidaitawa     | `open-sse/services/accountFallback.ts`                                                                        |
| Ƙarewa / adanawa                  | `src/sse/services/auth.ts` (`markAccountUnavailable`, `resolveTerminalConnectionStatus`, `clearAccountError`) |
| Iyakar kashewa ta atomatik        | `src/shared/utils/autoDisableBanned.ts`, `src/sse/services/autoDisableBannedAccount.ts`                       |
| Rarrabewa a cikin layi            | `open-sse/handlers/chatCore.ts`, `open-sse/services/errorClassifier.ts`                                       |
| Keɓance dawo da yanayin ƙarshe    | `src/lib/quota/connectionRecovery.ts`                                                                         |
| Loda kalmomin musamman yayin aiki | `src/lib/config/runtimeSettings.ts` (`setCustomBannedSignals`)                                                |
| UI na saituna                     | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`                                           |
