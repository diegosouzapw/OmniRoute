# Account-Ban / Banned-Keyword Detection (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../security/BAN_DETECTION.md) · 🇪🇹 [am](../../../am/docs/security/BAN_DETECTION.md) · 🇸🇦 [ar](../../../ar/docs/security/BAN_DETECTION.md) · 🇦🇿 [az](../../../az/docs/security/BAN_DETECTION.md) · 🇧🇬 [bg](../../../bg/docs/security/BAN_DETECTION.md) · 🇧🇩 [bn](../../../bn/docs/security/BAN_DETECTION.md) · 🇨🇿 [cs](../../../cs/docs/security/BAN_DETECTION.md) · 🇩🇰 [da](../../../da/docs/security/BAN_DETECTION.md) · 🇩🇪 [de](../../../de/docs/security/BAN_DETECTION.md) · 🇬🇷 [el](../../../el/docs/security/BAN_DETECTION.md) · 🇪🇸 [es](../../../es/docs/security/BAN_DETECTION.md) · 🇪🇪 [et](../../../et/docs/security/BAN_DETECTION.md) · 🇮🇷 [fa](../../../fa/docs/security/BAN_DETECTION.md) · 🇫🇮 [fi](../../../fi/docs/security/BAN_DETECTION.md) · 🇫🇷 [fr](../../../fr/docs/security/BAN_DETECTION.md) · 🇮🇪 [ga](../../../ga/docs/security/BAN_DETECTION.md) · 🇮🇳 [gu](../../../gu/docs/security/BAN_DETECTION.md) · 🇳🇬 [ha](../../../ha/docs/security/BAN_DETECTION.md) · 🇮🇱 [he](../../../he/docs/security/BAN_DETECTION.md) · 🇮🇳 [hi](../../../hi/docs/security/BAN_DETECTION.md) · 🇭🇷 [hr](../../../hr/docs/security/BAN_DETECTION.md) · 🇭🇺 [hu](../../../hu/docs/security/BAN_DETECTION.md) · 🇦🇲 [hy](../../../hy/docs/security/BAN_DETECTION.md) · 🇮🇩 [id](../../../id/docs/security/BAN_DETECTION.md) · 🇳🇬 [ig](../../../ig/docs/security/BAN_DETECTION.md) · 🇮🇹 [it](../../../it/docs/security/BAN_DETECTION.md) · 🇯🇵 [ja](../../../ja/docs/security/BAN_DETECTION.md) · 🇬🇪 [ka](../../../ka/docs/security/BAN_DETECTION.md) · 🇰🇭 [km](../../../km/docs/security/BAN_DETECTION.md) · 🇮🇳 [kn](../../../kn/docs/security/BAN_DETECTION.md) · 🇰🇷 [ko](../../../ko/docs/security/BAN_DETECTION.md) · 🇱🇹 [lt](../../../lt/docs/security/BAN_DETECTION.md) · 🇱🇻 [lv](../../../lv/docs/security/BAN_DETECTION.md) · 🇮🇳 [ml](../../../ml/docs/security/BAN_DETECTION.md) · 🇮🇳 [mr](../../../mr/docs/security/BAN_DETECTION.md) · 🇲🇾 [ms](../../../ms/docs/security/BAN_DETECTION.md) · 🇲🇲 [my](../../../my/docs/security/BAN_DETECTION.md) · 🇳🇵 [ne](../../../ne/docs/security/BAN_DETECTION.md) · 🇳🇱 [nl](../../../nl/docs/security/BAN_DETECTION.md) · 🇳🇴 [no](../../../no/docs/security/BAN_DETECTION.md) · 🇮🇳 [or](../../../or/docs/security/BAN_DETECTION.md) · 🇮🇳 [pa](../../../pa/docs/security/BAN_DETECTION.md) · 🇵🇭 [phi](../../../phi/docs/security/BAN_DETECTION.md) · 🇵🇱 [pl](../../../pl/docs/security/BAN_DETECTION.md) · 🇵🇹 [pt](../../../pt/docs/security/BAN_DETECTION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/BAN_DETECTION.md) · 🇷🇴 [ro](../../../ro/docs/security/BAN_DETECTION.md) · 🇷🇺 [ru](../../../ru/docs/security/BAN_DETECTION.md) · 🇱🇰 [si](../../../si/docs/security/BAN_DETECTION.md) · 🇸🇰 [sk](../../../sk/docs/security/BAN_DETECTION.md) · 🇸🇮 [sl](../../../sl/docs/security/BAN_DETECTION.md) · 🇷🇸 [sr](../../../sr/docs/security/BAN_DETECTION.md) · 🇸🇪 [sv](../../../sv/docs/security/BAN_DETECTION.md) · 🇰🇪 [sw](../../../sw/docs/security/BAN_DETECTION.md) · 🇮🇳 [ta](../../../ta/docs/security/BAN_DETECTION.md) · 🇮🇳 [te](../../../te/docs/security/BAN_DETECTION.md) · 🇹🇭 [th](../../../th/docs/security/BAN_DETECTION.md) · 🇹🇷 [tr](../../../tr/docs/security/BAN_DETECTION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/BAN_DETECTION.md) · 🇵🇰 [ur](../../../ur/docs/security/BAN_DETECTION.md) · 🇺🇿 [uz](../../../uz/docs/security/BAN_DETECTION.md) · 🇻🇳 [vi](../../../vi/docs/security/BAN_DETECTION.md) · 🇳🇬 [yo](../../../yo/docs/security/BAN_DETECTION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/BAN_DETECTION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/BAN_DETECTION.md)

---

OmniRoute jiskennja t-tweġibiet ta’ żball upstream għal sinjali li jindikaw li **kont
ta’ fornitur huwa mejjet permanentement** (sospiż / diżattivat / ipprojbit minħabba t-ToS) u, meta
jinstab qbil, imexxi dik il-konnessjoni għal **stat terminali `banned`** sabiex ma
tibqax tintgħażel għat-talbiet. Dan huwa dak li tikkonfigura l-kard tas-settings
**Security → Banned Keywords** ("Kliem ewlieni addizzjonali li jattiva l-iskoperta
ta’ projbizzjoni permanenti tal-kont. Il-kliem ewlieni inkorporat japplika dejjem.").

Din il-paġna tiddokumenta l-lista inkorporata, il-fluss tal-iskoperta, l-ambitu tagħha, kif iżżid
kliem ewlieni personalizzat b’mod sikur, u kif tirkupra konnessjoni mmarkata. L-istat
terminali nnifsu huwa parti mill-mudell ta’ reżiljenza — ara
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md) ("Stati terminali").

**Sors awtorevoli:** `open-sse/services/accountFallback.ts`
(`ACCOUNT_DEACTIVATED_SIGNALS`, `getMergedBannedSignals()`, `isAccountDeactivated()`).

## Kliem ewlieni inkorporat

Dawn it-8 sottostrings japplikaw dejjem (mingħajr ma titqies il-kapitalizzazzjoni), irrispettivament minn kwalunkwe lista personalizzata:

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

> Din il-lista tevolvi hekk kif il-fornituri jibdlu l-formulazzjoni tal-projbizzjonijiet tagħhom. Il-kopja
> awtorevoli hija `ACCOUNT_DEACTIVATED_SIGNALS` f’`open-sse/services/accountFallback.ts`;
> ikkunsidra l-blokka ta’ hawn fuq bħala snapshot.

Żewġ tabelli tas-sinjali biswit xulxin, iżda **separati**, jinsabu fl-istess fajl u _mhumiex_ parti
mill-iskoperta permezz tal-kliem ewlieni ta’ projbizzjoni:

- `CREDITS_EXHAUSTED_SIGNALS` — il-fatturazzjoni/kwota tkun eżawrita (`insufficient_quota`,
  `credit_balance_too_low`, `payment required`, …) → stat terminali `credits_exhausted`.
- `OAUTH_INVALID_TOKEN_SIGNALS` — **mhux terminali**; aġġornament tat-token jista’ jirkupra.

Nota: frażijiet tranżitorji komuni bħal **`rate limit`** / `429` jiġu ġestiti mill-mogħdija
tal-limitu tar-rata / cooldown tal-konnessjoni u **mhumiex** sinjali ta’ projbizzjoni.

## Fluss tal-iskoperta

```
tweġiba ta’ żball upstream
  → il-body jinbidel fi string + f’ittri żgħar
  → isAccountDeactivated(body): getMergedBannedSignals().some(sig => body.includes(sig))   [qbil ta’ substring]
  → hemm qbil?
      → testStatus tal-konnessjoni = "banned"      (permanenti — cooldown ta’ sena, qatt ma jirkupra awtomatikament)
      → jekk is-setting `autoDisableBannedAccounts` ikun mixgħul u `autoDisableBannedScope`
        jinkludi din il-konnessjoni (`all`, jew `subscription` għal OAuth/cookie/session)
        → anki isActive = false. Iċ-ċwievet API mħallsa minn qabel jibqgħu attivi meta l-ambitu jkun
        `subscription`.
      → il-konnessjoni tinqabeż waqt l-għażla tal-kont (statuses combo QUOTA_BLOCKING)
```

- Il-qbil huwa tfittxija ta’ **substring mingħajr ma titqies il-kapitalizzazzjoni** fil-**body**
  tat-tweġiba (`isAccountDeactivated`, `accountFallback.ts`).
- It-terminalizzazzjoni permanenti `banned` tiskatta meta l-body ikun fih sinjal ta’ projbizzjoni fi **kwalunkwe
  status HTTP** (permezz ta’ `markAccountUnavailable` → `checkFallbackError`). It-tikketta
  aktar speċifika **`deactivated`** (`isActive=false` meta l-konnessjoni ma jkollhiex
  ċwievet API żejda) tinkiteb mill-mogħdija inline ta’ `chatCore.ts` fuq **HTTP 401 / 403**
  (ikklassifikata permezz ta’ `classifyProviderError` → `ACCOUNT_DEACTIVATED`). Innota li
  l-mogħdija `markAccountUnavailable()` tikteb status terminali _differenti_ —
  **`expired`** — għall-istess sinjal `ACCOUNT_DEACTIVATED` (permezz ta’
  `resolveTerminalConnectionStatus`), għalhekk l-istess projbizzjoni tista’ tidher jew bħala
  `deactivated` jew bħala `expired`, skont liema mogħdija tkun ittrattat it-tweġiba. (Il-
  kumment eqdem fil-kodiċi jgħid "meta body ta’ 401 ikun fih dawn l-strings" — dan
  inaqqas mill-firxa tal-imġiba attwali.)
- Konnessjoni `banned` tiġi eskluża mill-għażla kull fejn jiġu ffiltrati l-istatuses
  terminali (`isTerminalConnectionStatus`, il-combo `QUOTA_BLOCKING_CONNECTION_STATUSES`).

## Ambitu — liema fornituri jiġu skennjati

**Il-fornituri kollha.** Il-kontroll jitħaddem fil-pipeline ġeneriku għall-immaniġġjar tal-iżbalji li
minnu tgħaddi kull talba upstream li tfalli — **mhuwiex** limitat għal
scrapers OAuth/abbonament. L-istat terminali li jirriżulta japplika għal kull **konnessjoni**,
mhux għal kull fornitur.

Madankollu, l-_strings_ integrati huma orjentati lejn fornituri ta’
abbonament/OAuth b’riskju reali ta’ projbizzjoni (ChatGPT Web Codex, Claude Web, Codex, Muse Spark,
Antigravity). Fornitur b’API key jattiva d-detector biss jekk il-body tal-iżball tiegħu
jkun fih litteralment waħda mis-substrings.

`autoDisableBannedScope` (`all` | `subscription`, default `all`) jikkontrolla jekk
qbil ibiddilx ukoll `isActive=false`. `subscription` tfisser postijiet tat-tip login
(abbonamenti mħallsa u kontijiet bla ħlas, inklużi sessjonijiet bil-web cookies). Xorta
jirreġistra `testStatus=banned` għal API keys imħallsa minn qabel, iżda jħallihom fil-pool
tar-routing. Id-disinn permanenti huwa override għal kull fornitur u għal kull kont; l-enum
globali huwa l-ewwel verżjoni.

## Kliem ewlieni personalizzat għall-projbizzjoni

Żid jew neħħi kliem ewlieni minn **Sigurtà → Kliem Ewlieni għall-Projbizzjoni** (ippersistit bħala s-setting globali
`customBannedSignals` permezz ta’ `PATCH /api/settings`). Dan **jiżdied ma’**
mal-lista integrata — qatt ma jissostitwiha — u jerġa’ jitgħabba minnufih meta jiġi ssejvjat (u waqt l-istartjar)
permezz ta’ `setCustomBannedSignals()`. Kull kelma ewlenija hija limitata għal 200 karattru; ma hemm
ebda limitu fuq it-tul tal-array.

**⚠ Riskju ta’ pożittivi foloz — agħżel frażijiet speċifiċi.** Id-detezzjoni hija qbil mhux ipproċessat ta’
substring fuq il-body kollu tar-risposta, u qbil huwa **permanenti** (cooldown ta’ sena,
irkupru manwali). Kelma ewlenija ġenerika tista’ tipprojbixxi konnessjoni li tkun perfettament tajba:

- **Ħażin:** `quota`, `limit`, `error`, `denied` — jidhru f’ħafna żbalji temporanji.
- **Tajjeb:** sentenzi sħaħ ta’ projbizzjoni, eż. `your account has been suspended for`,
  `account permanently banned`, `violation of our terms`.

Ippreferi l-itwal frażi mhux ambigwa li jirritorna l-fornitur għal projbizzjoni reali. Meta jkollok
dubju, osserva l-`lastError` tal-konnessjoni l-ewwel, imbagħad żid il-kliem eżatt.

## Irkupru ta’ konnessjoni mmarkata

L-istati terminali `banned` / `deactivated` **qatt ma jirkupraw awtomatikament** (huma esklużi
mit-tick tal-irkupru proattiv — il-cooldowns `unavailable` biss jirkupraw
waħedhom). Operatur irid ineħħihom b’mod espliċitu:

1. **Erġa’ ttestja l-konnessjoni** — l-azzjoni **Test** fid-dashboard
   (`POST /api/providers/{id}/test`); probe li jirnexxi jerġa’ jissettja `testStatus` għal
   `active` u jħassar il-fields tal-iżball.
2. **Erġa’ awtentika / editja l-kredenzjali** — għall-fornituri OAuth, erġa’ ħaddem il-flow tal-login
   / refresh; ir-routes għall-ħolqien/importazzjoni tal-fornitur jissettjaw `isActive = true`.
3. **Erġa’ attiva l-konnessjoni** — jekk l-awto-diżattivazzjoni ssettjat `isActive = false`
   (scope `all`, jew `subscription` għal konnessjoni OAuth/cookie/session),
   erġa’ attivaha wara li tirranġa l-kont.

Ma hemm ebda buttuna separata biex “jitneħħa l-flag tal-projbizzjoni” — l-irkupru jsir b’test mill-ġdid, awtentikazzjoni mill-ġdid, jew
attivazzjoni mill-ġdid, skont ir-regola ġenerali tal-istat terminali f’
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md).

## Iżolament tal-probe (ittestja l-mudelli kollha)

**Falliment li joriġina minn probe** (dispaċċi ta’ test-all tal-mudelli / health-check eżegwiti
ġewwa `runAsProbe`) qatt ma jneħħi konnessjoni mill-pool (#9817): jiġi
**rreġistrat għall-viżibbiltà** (`last_error`, `last_error_type`, `error_code`,
`last_error_at`) iżda jaqbeż **kull** mutazzjoni tar-routing — cooldowns, status
terminali (`banned` / `deactivated` / `credits_exhausted`), lockouts għal kull mudell,
is-circuit breaker tal-fornitur, il-cache tal-kwota ta’ 5 minuti, l-aġġornament tat-token OAuth
u l-awto-diżattivazzjoni. Falliment fuq path ta’ talba reali biss jiddiżattiva. L-iżball
irreġistrat huwa dak li jagħmel kont immarkat viżibbli fid-dashboard waqt li jibqa’
jservi t-traffiku.

Il-punt uniku tad-deċiżjoni huwa `shouldIsolateProbeFailures()`
(`src/shared/utils/probeOrigin.ts`), ikkonsultat minn **kull** post li jista’
jibdel l-istat tar-routing minn falliment li joriġina minn probe:

- `markAccountUnavailable` (`auth.ts`) — reġistrazzjoni biss (test mhux ipproċessat f’`lastError`,
  `lastErrorType`, `errorCode`, `lastErrorAt`; deliberatament **mingħajr**
  `backoffLevel`, li kieku jattiva l-auto-decay waqt l-għażla u jħassar
  ir-rekord)
- `maybeAutoDisableBannedAccount` — ebda awto-diżattivazzjoni
- `chatCore` — FORBIDDEN, ACCOUNT_DEACTIVATED, QUOTA_EXHAUSTED (reġistrazzjoni biss,
  ebda `credits_exhausted` terminali), GEO_BLOCKED (ebda esklużjoni ta’ 24 siegħa),
  MODEL_NOT_FOUND (ebda `lockModel`), il-failover tar-rotazzjoni tal-kontijiet codex 429
  (ebda `markCodexScopeRateLimited`, ebda `rate_limited_until` ippersistit, ebda
  tħassir tal-affinità tas-sessjoni), `persistCodexQuotaState` (ebda kitba tal-istat tal-kwota,
  ebda invalidazzjoni tal-cache), `recordKeyHealthStatus` (ir-rotatur tas-saħħa tal-key
  jibqa’ mhux mittiefes)
- Refresh OAuth — kemm ir-refresh proattiv fil-bażi tal-executor
  (`base.ts` `execute()`, mingħajr ma tiġi kkunsmata rotazzjoni tar-refresh-token) kif ukoll il-
  path reattiv 401/403 f’`chatCore` (ebda diżattivazzjoni `expired`)
- `chat.ts` — is-circuit breaker tal-fornitur u l-cache tal-kwota ta’ 5 minuti
  (`markAccountExhaustedFrom429`) qatt ma jiġu ddegradati

L-iżball irreġistrat huwa dak li jagħmel kont immarkat viżibbli fid-dashboard
waqt li jibqa’ jservi t-traffiku. Nota: ir-rekord tal-probe jaħżen it-test **mhux ipproċessat**
(mhux imqassar) tal-iżball, għall-kuntrarju tat-tronkament `slice(0,100)` tal-path reali.

Operaturi li jużaw test-all bħala għodda ta’ manutenzjoni jistgħu jirrestawraw l-imġiba
storika (il-probe jgħodd bħala ġenerazzjoni reali) permezz ta’ wieħed minn dawn:

- is-setting `probeCanDisable` (`POST /api/settings` b’
  `{"probeCanDisable": true}`, jew edit dirett tad-DB `key_value`), jew
- feature flag **`PROBE_CAN_DISABLE=true`** (override tal-env jew tad-DB; jieħu preċedenza fuq is-
  setting).

Fail-safe: jekk it-tiftix tal-flag jew tas-settings jagħti żball, l-iżolament jibqa’ MIXGĦUL.

## Fajls tas-sors

| Aspett                                                      | Fajl                                                                                                          |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Tabelli tas-sinjali + tqabbil                               | `open-sse/services/accountFallback.ts`                                                                        |
| Finalizzazzjoni / persistenza                               | `src/sse/services/auth.ts` (`markAccountUnavailable`, `resolveTerminalConnectionStatus`, `clearAccountError`) |
| Ambitu tad-diżattivazzjoni awtomatika                       | `src/shared/utils/autoDisableBanned.ts`, `src/sse/services/autoDisableBannedAccount.ts`                       |
| Klassifikazzjoni inline                                     | `open-sse/handlers/chatCore.ts`, `open-sse/services/errorClassifier.ts`                                       |
| Esklużjoni mill-irkupru tal-istat terminali                 | `src/lib/quota/connectionRecovery.ts`                                                                         |
| Tagħbija waqt l-eżekuzzjoni tal-kliem ewlieni personalizzat | `src/lib/config/runtimeSettings.ts` (`setCustomBannedSignals`)                                                |
| UI tas-settings                                             | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`                                           |
