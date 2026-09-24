# Account-Ban / Banned-Keyword Detection (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../security/BAN_DETECTION.md) · 🇪🇹 [am](../../../am/docs/security/BAN_DETECTION.md) · 🇸🇦 [ar](../../../ar/docs/security/BAN_DETECTION.md) · 🇦🇿 [az](../../../az/docs/security/BAN_DETECTION.md) · 🇧🇬 [bg](../../../bg/docs/security/BAN_DETECTION.md) · 🇧🇩 [bn](../../../bn/docs/security/BAN_DETECTION.md) · 🇧🇦 [bs](../../../bs/docs/security/BAN_DETECTION.md) · 🇨🇿 [cs](../../../cs/docs/security/BAN_DETECTION.md) · 🇩🇰 [da](../../../da/docs/security/BAN_DETECTION.md) · 🇩🇪 [de](../../../de/docs/security/BAN_DETECTION.md) · 🇬🇷 [el](../../../el/docs/security/BAN_DETECTION.md) · 🇪🇸 [es](../../../es/docs/security/BAN_DETECTION.md) · 🇪🇪 [et](../../../et/docs/security/BAN_DETECTION.md) · 🇮🇷 [fa](../../../fa/docs/security/BAN_DETECTION.md) · 🇫🇮 [fi](../../../fi/docs/security/BAN_DETECTION.md) · 🇫🇷 [fr](../../../fr/docs/security/BAN_DETECTION.md) · 🇮🇪 [ga](../../../ga/docs/security/BAN_DETECTION.md) · 🇮🇳 [gu](../../../gu/docs/security/BAN_DETECTION.md) · 🇳🇬 [ha](../../../ha/docs/security/BAN_DETECTION.md) · 🇮🇱 [he](../../../he/docs/security/BAN_DETECTION.md) · 🇮🇳 [hi](../../../hi/docs/security/BAN_DETECTION.md) · 🇭🇷 [hr](../../../hr/docs/security/BAN_DETECTION.md) · 🇭🇺 [hu](../../../hu/docs/security/BAN_DETECTION.md) · 🇦🇲 [hy](../../../hy/docs/security/BAN_DETECTION.md) · 🇮🇩 [id](../../../id/docs/security/BAN_DETECTION.md) · 🇳🇬 [ig](../../../ig/docs/security/BAN_DETECTION.md) · 🇮🇹 [it](../../../it/docs/security/BAN_DETECTION.md) · 🇯🇵 [ja](../../../ja/docs/security/BAN_DETECTION.md) · 🇬🇪 [ka](../../../ka/docs/security/BAN_DETECTION.md) · 🇰🇭 [km](../../../km/docs/security/BAN_DETECTION.md) · 🇮🇳 [kn](../../../kn/docs/security/BAN_DETECTION.md) · 🇰🇷 [ko](../../../ko/docs/security/BAN_DETECTION.md) · 🇱🇹 [lt](../../../lt/docs/security/BAN_DETECTION.md) · 🇱🇻 [lv](../../../lv/docs/security/BAN_DETECTION.md) · 🇮🇳 [ml](../../../ml/docs/security/BAN_DETECTION.md) · 🇮🇳 [mr](../../../mr/docs/security/BAN_DETECTION.md) · 🇲🇾 [ms](../../../ms/docs/security/BAN_DETECTION.md) · 🇲🇹 [mt](../../../mt/docs/security/BAN_DETECTION.md) · 🇲🇲 [my](../../../my/docs/security/BAN_DETECTION.md) · 🇳🇵 [ne](../../../ne/docs/security/BAN_DETECTION.md) · 🇳🇱 [nl](../../../nl/docs/security/BAN_DETECTION.md) · 🇳🇴 [no](../../../no/docs/security/BAN_DETECTION.md) · 🇮🇳 [or](../../../or/docs/security/BAN_DETECTION.md) · 🇮🇳 [pa](../../../pa/docs/security/BAN_DETECTION.md) · 🇵🇱 [pl](../../../pl/docs/security/BAN_DETECTION.md) · 🇵🇹 [pt](../../../pt/docs/security/BAN_DETECTION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/BAN_DETECTION.md) · 🇷🇴 [ro](../../../ro/docs/security/BAN_DETECTION.md) · 🇷🇺 [ru](../../../ru/docs/security/BAN_DETECTION.md) · 🇱🇰 [si](../../../si/docs/security/BAN_DETECTION.md) · 🇸🇰 [sk](../../../sk/docs/security/BAN_DETECTION.md) · 🇸🇮 [sl](../../../sl/docs/security/BAN_DETECTION.md) · 🇷🇸 [sr](../../../sr/docs/security/BAN_DETECTION.md) · 🇸🇪 [sv](../../../sv/docs/security/BAN_DETECTION.md) · 🇰🇪 [sw](../../../sw/docs/security/BAN_DETECTION.md) · 🇮🇳 [ta](../../../ta/docs/security/BAN_DETECTION.md) · 🇮🇳 [te](../../../te/docs/security/BAN_DETECTION.md) · 🇹🇭 [th](../../../th/docs/security/BAN_DETECTION.md) · 🇹🇷 [tr](../../../tr/docs/security/BAN_DETECTION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/BAN_DETECTION.md) · 🇵🇰 [ur](../../../ur/docs/security/BAN_DETECTION.md) · 🇺🇿 [uz](../../../uz/docs/security/BAN_DETECTION.md) · 🇻🇳 [vi](../../../vi/docs/security/BAN_DETECTION.md) · 🇳🇬 [yo](../../../yo/docs/security/BAN_DETECTION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/BAN_DETECTION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/BAN_DETECTION.md)

---

Sinusuri ng OmniRoute ang mga tugon ng error mula sa upstream para sa mga senyales na nagsasaad na ang isang **account ng provider ay permanenteng hindi na magagamit** (sinuspinde / dineactivate / pinagbawalan dahil sa ToS) at, kapag may tumugma, inililipat ang koneksiyong iyon sa isang **terminal na estadong `banned`** upang hindi na ito mapili para sa mga kahilingan. Ito ang kino-configure ng card ng mga setting na **Seguridad → Mga Ipinagbabawal na Keyword** ("Mga karagdagang keyword na nagti-trigger sa pagtukoy ng permanenteng pagbabawal sa account. Palaging nalalapat ang mga built-in na keyword.").

Idinodokumento ng pahinang ito ang built-in na listahan, ang daloy ng pagtukoy, ang saklaw nito, kung paano ligtas na magdagdag ng mga custom na keyword, at kung paano ibalik ang isang na-flag na koneksiyon. Ang terminal na estado mismo ay bahagi ng modelo ng katatagan — tingnan ang
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md) ("Mga terminal na estado").

**Pinagmumulan ng katotohanan:** `open-sse/services/accountFallback.ts`
(`ACCOUNT_DEACTIVATED_SIGNALS`, `getMergedBannedSignals()`, `isAccountDeactivated()`).

## Mga built-in na keyword

Palaging nalalapat ang 8 substring na ito (hindi case-sensitive), anuman ang anumang custom na listahan:

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

> Nagbabago ang listahang ito habang binabago ng mga provider ang pananalita ng kanilang pagbabawal. Ang awtoritatibong
> kopya ay `ACCOUNT_DEACTIVATED_SIGNALS` sa `open-sse/services/accountFallback.ts`;
> ituring ang block sa itaas bilang isang snapshot.

May dalawang magkatabing, **magkahiwalay** na talahanayan ng signal sa parehong file at _hindi_ bahagi
ng pagtukoy gamit ang mga ipinagbabawal na keyword:

- `CREDITS_EXHAUSTED_SIGNALS` — naubos ang billing/quota (`insufficient_quota`,
  `credit_balance_too_low`, `payment required`, …) → terminal na `credits_exhausted`.
- `OAUTH_INVALID_TOKEN_SIGNALS` — **hindi terminal**; maaari itong mabawi sa pamamagitan ng pag-refresh ng token.

Tandaan: ang mga karaniwang pansamantalang parirala tulad ng **`rate limit`** / `429` ay pinangangasiwaan ng
path para sa rate limit / cooldown ng koneksiyon at **hindi** mga signal ng pagbabawal.

## Daloy ng pagtukoy

```
tugon ng error mula sa upstream
  → ginawang string + ginawang lowercase ang body
  → isAccountDeactivated(body): getMergedBannedSignals().some(sig => body.includes(sig))   [pagtutugma ng substring]
  → may tugma?
      → testStatus ng koneksiyon = "banned"      (permanente — 1 taong cooldown, hindi kailanman awtomatikong nababawi)
      → kung naka-on ang setting na `autoDisableBannedAccounts` at ang `autoDisableBannedScope`
        ay kinabibilangan ng koneksiyong ito (`all`, o `subscription` para sa OAuth/cookie/session)
        → magiging isActive = false din. Mananatiling aktibo ang mga prepaid API key kapag ang scope ay
        `subscription`.
      → nilalaktawan ang koneksiyon habang pumipili ng account (mga combo na estadong QUOTA_BLOCKING)
```

- Ang pagtutugma ay isang **case-insensitive na paghahanap ng substring** sa **body** ng tugon
  (`isAccountDeactivated`, `accountFallback.ts`).
- Nati-trigger ang permanenteng terminalisasyon na `banned` kapag may body na may signal ng pagbabawal sa **anumang
  HTTP status** (sa pamamagitan ng `markAccountUnavailable` → `checkFallbackError`). Ang
  mas limitadong label na **`deactivated`** (`isActive=false` kapag walang
  ekstrang API key ang koneksiyon) ay isinusulat ng inline na path ng `chatCore.ts` sa **HTTP 401 / 403**
  (inuuri sa pamamagitan ng `classifyProviderError` → `ACCOUNT_DEACTIVATED`). Tandaan na ang
  path na `markAccountUnavailable()` ay nagsusulat ng _ibang_ terminal na status —
  **`expired`** — para sa parehong signal na `ACCOUNT_DEACTIVATED` (sa pamamagitan ng
  `resolveTerminalConnectionStatus`), kaya maaaring lumitaw ang parehong pagbabawal bilang
  `deactivated` o `expired` depende sa kung aling path ang nangasiwa sa tugon. (Sinasabi ng
  mas lumang komento sa code na "kapag naglalaman ang isang 401 body ng mga string na ito" — hindi nito
  ganap na inilalarawan ang kasalukuyang gawi.)
- Ang isang koneksiyong `banned` ay hindi isinasama sa pagpili sa lahat ng lugar kung saan
  sinasala ang mga terminal na status (`isTerminalConnectionStatus`, combo `QUOTA_BLOCKING_CONNECTION_STATUSES`).

## Saklaw — aling mga provider ang ini-scan

**Lahat ng provider.** Tumatakbo ang pagsusuri sa generic na pipeline ng paghawak
ng error na dinaraanan ng bawat nabigong upstream request — **hindi** ito
nakalaan lamang sa mga OAuth/subscription scraper. Ang nagreresultang terminal
state ay para sa bawat **connection**, hindi sa bawat provider.

Gayunpaman, ang mga built-in na _string_ ay nakatuon sa mga
subscription/OAuth provider na may tunay na panganib na ma-ban (ChatGPT Web
Codex, Claude Web, Codex, Muse Spark, Antigravity). Mati-trigger lamang ng isang
API-key provider ang detector kung literal na naglalaman ang error body nito ng
isa sa mga substring.

Kinokontrol ng `autoDisableBannedScope` (`all` | `subscription`, default na `all`)
kung ang isang match ay magtatakda rin sa `isActive=false`. Ang `subscription`
ay tumutukoy sa mga seat na gumagamit ng login (mga bayad na subscription at
libreng account, kabilang ang mga web-cookie session). Itinatala pa rin nito ang
`testStatus=banned` para sa mga prepaid API key ngunit iniiwan ang mga ito sa
routing pool. Ang pangmatagalang disenyo ay isang override para sa bawat
provider at bawat account; ang global enum ang unang bersyon.

## Mga custom na banned keyword

Magdagdag o mag-alis ng mga keyword sa **Security → Banned Keywords** (pine-persist
bilang global na setting na `customBannedSignals` sa pamamagitan ng
`PATCH /api/settings`). **Idinaragdag ang mga ito sa** built-in na listahan —
hindi kailanman pamalit — at nagho-hot-reload kapag sine-save (at sa startup) sa
pamamagitan ng `setCustomBannedSignals()`. Nililimitahan ang bawat keyword sa 200
character; walang limitasyon sa haba ng array.

**⚠ Panganib ng false positive — pumili ng mga partikular na parirala.** Ang
detection ay isang raw substring match sa buong response body, at ang isang
match ay **permanente** (1-taong cooldown, manu-manong pagbawi). Maaaring ma-ban
ng isang masyadong malawak na keyword ang isang ganap na maayos na connection:

- **Masama:** `quota`, `limit`, `error`, `denied` — lumalabas sa maraming
  pansamantalang error.
- **Mabuti:** mga kumpletong pangungusap tungkol sa ban, hal.
  `your account has been suspended for`, `account permanently banned`,
  `violation of our terms`.

Piliin ang pinakamahabang pariralang hindi malabo na ibinabalik ng provider sa
isang tunay na ban. Kapag hindi sigurado, obserbahan muna ang `lastError` ng
connection, pagkatapos ay idagdag ang eksaktong pagkakasulat.

## Pagbawi ng na-flag na connection

Ang mga terminal state na `banned` / `deactivated` ay **hindi kailanman
awtomatikong nare-recover** (hindi sila kasama sa proactive-recovery tick —
tanging mga `unavailable` cooldown ang kusang nare-recover). Dapat tahasang
i-clear ng isang operator ang mga ito:

1. **Subukang muli ang connection** — ang aksyong **Test** sa dashboard
   (`POST /api/providers/{id}/test`); nire-reset ng matagumpay na probe ang
   `testStatus` sa `active` at kini-clear ang mga field ng error.
2. **Muling mag-authenticate / i-edit ang mga credential** — para sa mga OAuth
   provider, patakbuhing muli ang login / refresh flow; itinatakda ng mga route
   para sa paggawa/pag-import ng provider ang `isActive = true`.
3. **Muling i-enable ang connection** — kung itinakda ng auto-disable ang
   `isActive = false` (saklaw na `all`, o `subscription` para sa isang
   OAuth/cookie/session connection), i-toggle itong muli pagkatapos ayusin ang
   account.

Walang hiwalay na button na "clear ban flag" — ang pagbawi ay sa pamamagitan ng
muling pagsubok, muling pag-authenticate, o muling pag-enable, alinsunod sa
pangkalahatang panuntunan sa terminal state sa
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md).

## Paghihiwalay ng probe (model test-all)

Ang isang **kabiguang nagmula sa probe** (mga model test-all / health-check
dispatch na isinasagawa sa loob ng `runAsProbe`) ay hindi kailanman nag-aalis ng
connection mula sa pool (#9817): **itinatala ito para makita**
(`last_error`, `last_error_type`, `error_code`, `last_error_at`) ngunit
nilalaktawan ang **bawat** pagbabago sa routing — mga cooldown, terminal status
(`banned` / `deactivated` / `credits_exhausted`), mga per-model lockout, ang
provider circuit breaker, ang 5-minutong quota cache, OAuth token refresh, at
auto-disable. Isang kabiguan lamang sa tunay na request path ang nagde-deactivate.
Dahil sa nakatalang error, makikita sa dashboard ang isang na-flag na account
habang patuloy itong nagsisilbi ng traffic.

Ang nag-iisang decision point ay `shouldIsolateProbeFailures()`
(`src/shared/utils/probeOrigin.ts`), na kinokonsulta ng **bawat** bahaging maaaring
magbago ng routing state mula sa kabiguang nagmula sa probe:

- `markAccountUnavailable` (`auth.ts`) — pagtatala lamang (`lastError` na raw na
  text, `lastErrorType`, `errorCode`, `lastErrorAt`; sadyang **walang**
  `backoffLevel`, na magti-trigger sa selection-time auto-decay at magbubura sa
  tala)
- `maybeAutoDisableBannedAccount` — walang auto-disable
- `chatCore` — FORBIDDEN, ACCOUNT_DEACTIVATED, QUOTA_EXHAUSTED (pagtatala lamang,
  walang terminal na `credits_exhausted`), GEO_BLOCKED (walang 24h exclusion),
  MODEL_NOT_FOUND (walang `lockModel`), ang codex 429 account-rotation failover
  (walang `markCodexScopeRateLimited`, walang pine-persist na
  `rate_limited_until`, walang pag-clear ng session affinity),
  `persistCodexQuotaState` (walang pagsusulat sa quota state, walang
  invalidation ng cache), `recordKeyHealthStatus` (hindi ginagalaw ang
  key-health rotator)
- OAuth refresh — kapwa ang proactive refresh sa executor base
  (`base.ts` `execute()`, walang nagagamit na refresh-token rotation) at ang
  reactive na 401/403 path sa `chatCore` (walang `expired` na deactivation)
- `chat.ts` — hindi kailanman nade-degrade ang provider circuit breaker at ang
  5-minutong quota cache (`markAccountExhaustedFrom429`)

Dahil sa nakatalang error, makikita sa dashboard ang isang na-flag na account
habang patuloy itong nagsisilbi ng traffic. Tandaan: iniimbak ng tala ng probe
ang **raw** (hindi na-slice) na text ng error, hindi tulad ng truncation na
`slice(0,100)` sa tunay na path.

Maaaring ibalik ng mga operator na gumagamit ng test-all bilang maintenance tool
ang dating behavior (binibilang ang probe bilang isang tunay na generation) sa
pamamagitan ng alinman sa:

- setting na `probeCanDisable` (`POST /api/settings` na may
  `{"probeCanDisable": true}`, o direktang pag-edit sa `key_value` DB), o
- feature flag na **`PROBE_CAN_DISABLE=true`** (env o DB override; mas
  nangingibabaw kaysa sa setting).

Fail-safe: kung mag-throw ang flag o settings lookup, mananatiling NAKA-ON ang
isolation.

## Mga source file

| Paksa                                            | File                                                                                                          |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| Mga talahanayan ng signal + pagtutugma           | `open-sse/services/accountFallback.ts`                                                                        |
| Paglalagay sa terminal na estado / pagpapanatili | `src/sse/services/auth.ts` (`markAccountUnavailable`, `resolveTerminalConnectionStatus`, `clearAccountError`) |
| Saklaw ng awtomatikong pag-disable               | `src/shared/utils/autoDisableBanned.ts`, `src/sse/services/autoDisableBannedAccount.ts`                       |
| Inline na pag-uuri                               | `open-sse/handlers/chatCore.ts`, `open-sse/services/errorClassifier.ts`                                       |
| Pagbubukod sa pagbawi ng terminal na estado      | `src/lib/quota/connectionRecovery.ts`                                                                         |
| Runtime na pag-load ng custom na keyword         | `src/lib/config/runtimeSettings.ts` (`setCustomBannedSignals`)                                                |
| UI ng mga setting                                | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`                                           |
