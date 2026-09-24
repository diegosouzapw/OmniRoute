# Account-Ban / Banned-Keyword Detection (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../security/BAN_DETECTION.md) · 🇪🇹 [am](../../../am/docs/security/BAN_DETECTION.md) · 🇸🇦 [ar](../../../ar/docs/security/BAN_DETECTION.md) · 🇦🇿 [az](../../../az/docs/security/BAN_DETECTION.md) · 🇧🇬 [bg](../../../bg/docs/security/BAN_DETECTION.md) · 🇧🇩 [bn](../../../bn/docs/security/BAN_DETECTION.md) · 🇧🇦 [bs](../../../bs/docs/security/BAN_DETECTION.md) · 🇨🇿 [cs](../../../cs/docs/security/BAN_DETECTION.md) · 🇩🇰 [da](../../../da/docs/security/BAN_DETECTION.md) · 🇩🇪 [de](../../../de/docs/security/BAN_DETECTION.md) · 🇬🇷 [el](../../../el/docs/security/BAN_DETECTION.md) · 🇪🇸 [es](../../../es/docs/security/BAN_DETECTION.md) · 🇪🇪 [et](../../../et/docs/security/BAN_DETECTION.md) · 🇮🇷 [fa](../../../fa/docs/security/BAN_DETECTION.md) · 🇫🇮 [fi](../../../fi/docs/security/BAN_DETECTION.md) · 🇫🇷 [fr](../../../fr/docs/security/BAN_DETECTION.md) · 🇮🇪 [ga](../../../ga/docs/security/BAN_DETECTION.md) · 🇮🇳 [gu](../../../gu/docs/security/BAN_DETECTION.md) · 🇳🇬 [ha](../../../ha/docs/security/BAN_DETECTION.md) · 🇮🇱 [he](../../../he/docs/security/BAN_DETECTION.md) · 🇮🇳 [hi](../../../hi/docs/security/BAN_DETECTION.md) · 🇭🇷 [hr](../../../hr/docs/security/BAN_DETECTION.md) · 🇭🇺 [hu](../../../hu/docs/security/BAN_DETECTION.md) · 🇦🇲 [hy](../../../hy/docs/security/BAN_DETECTION.md) · 🇮🇩 [id](../../../id/docs/security/BAN_DETECTION.md) · 🇳🇬 [ig](../../../ig/docs/security/BAN_DETECTION.md) · 🇮🇹 [it](../../../it/docs/security/BAN_DETECTION.md) · 🇯🇵 [ja](../../../ja/docs/security/BAN_DETECTION.md) · 🇬🇪 [ka](../../../ka/docs/security/BAN_DETECTION.md) · 🇰🇭 [km](../../../km/docs/security/BAN_DETECTION.md) · 🇮🇳 [kn](../../../kn/docs/security/BAN_DETECTION.md) · 🇰🇷 [ko](../../../ko/docs/security/BAN_DETECTION.md) · 🇱🇹 [lt](../../../lt/docs/security/BAN_DETECTION.md) · 🇱🇻 [lv](../../../lv/docs/security/BAN_DETECTION.md) · 🇮🇳 [ml](../../../ml/docs/security/BAN_DETECTION.md) · 🇮🇳 [mr](../../../mr/docs/security/BAN_DETECTION.md) · 🇲🇾 [ms](../../../ms/docs/security/BAN_DETECTION.md) · 🇲🇹 [mt](../../../mt/docs/security/BAN_DETECTION.md) · 🇲🇲 [my](../../../my/docs/security/BAN_DETECTION.md) · 🇳🇵 [ne](../../../ne/docs/security/BAN_DETECTION.md) · 🇳🇱 [nl](../../../nl/docs/security/BAN_DETECTION.md) · 🇳🇴 [no](../../../no/docs/security/BAN_DETECTION.md) · 🇮🇳 [or](../../../or/docs/security/BAN_DETECTION.md) · 🇮🇳 [pa](../../../pa/docs/security/BAN_DETECTION.md) · 🇵🇭 [phi](../../../phi/docs/security/BAN_DETECTION.md) · 🇵🇱 [pl](../../../pl/docs/security/BAN_DETECTION.md) · 🇵🇹 [pt](../../../pt/docs/security/BAN_DETECTION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/BAN_DETECTION.md) · 🇷🇴 [ro](../../../ro/docs/security/BAN_DETECTION.md) · 🇷🇺 [ru](../../../ru/docs/security/BAN_DETECTION.md) · 🇱🇰 [si](../../../si/docs/security/BAN_DETECTION.md) · 🇸🇰 [sk](../../../sk/docs/security/BAN_DETECTION.md) · 🇸🇮 [sl](../../../sl/docs/security/BAN_DETECTION.md) · 🇷🇸 [sr](../../../sr/docs/security/BAN_DETECTION.md) · 🇸🇪 [sv](../../../sv/docs/security/BAN_DETECTION.md) · 🇮🇳 [ta](../../../ta/docs/security/BAN_DETECTION.md) · 🇮🇳 [te](../../../te/docs/security/BAN_DETECTION.md) · 🇹🇭 [th](../../../th/docs/security/BAN_DETECTION.md) · 🇹🇷 [tr](../../../tr/docs/security/BAN_DETECTION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/BAN_DETECTION.md) · 🇵🇰 [ur](../../../ur/docs/security/BAN_DETECTION.md) · 🇺🇿 [uz](../../../uz/docs/security/BAN_DETECTION.md) · 🇻🇳 [vi](../../../vi/docs/security/BAN_DETECTION.md) · 🇳🇬 [yo](../../../yo/docs/security/BAN_DETECTION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/BAN_DETECTION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/BAN_DETECTION.md)

---

OmniRoute hukagua majibu ya hitilafu kutoka kwa watoa huduma wa juu ili kutafuta ishara zinazoonyesha kwamba
**akaunti ya mtoa huduma imekufa kabisa** (imesimamishwa / imezimwa / imepigwa marufuku kwa kukiuka ToS) na, inapopata
ulinganifu, huhamisha muunganisho huo hadi katika **hali ya mwisho ya `banned`** ili usiwe
unachaguliwa tena kwa maombi. Hiki ndicho kinachosanidiwa na kadi ya mipangilio ya **Security → Banned Keywords**
("Maneno muhimu ya ziada yanayoanzisha utambuzi wa kupigwa marufuku kwa kudumu kwa
akaunti. Maneno muhimu yaliyopachikwa hutumika kila wakati.").

Ukurasa huu unaelezea orodha iliyopachikwa, mtiririko wa utambuzi, upeo wake, jinsi ya kuongeza
maneno muhimu maalum kwa usalama, na jinsi ya kurejesha muunganisho uliotiwa alama. Hali ya
mwisho yenyewe ni sehemu ya modeli ya ustahimilivu — angalia
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md) ("Hali za mwisho").

**Chanzo cha ukweli:** `open-sse/services/accountFallback.ts`
(`ACCOUNT_DEACTIVATED_SIGNALS`, `getMergedBannedSignals()`, `isAccountDeactivated()`).

## Maneno muhimu yaliyopachikwa

Vijisehemu hivi 8 vya maandishi hutumika kila wakati (bila kujali herufi kubwa au ndogo), bila kujali orodha yoyote maalum:

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

> Orodha hii hubadilika kadiri watoa huduma wanavyobadilisha maneno wanayotumia kuelezea marufuku. Nakala
> yenye mamlaka ni `ACCOUNT_DEACTIVATED_SIGNALS` katika `open-sse/services/accountFallback.ts`;
> chukulia sehemu iliyo hapo juu kama taswira ya wakati fulani.

Majedwali mawili yanayofuatana, lakini **yaliyo tofauti**, ya ishara yanapatikana katika faili hiyo hiyo na _si_ sehemu
ya utambuzi wa maneno muhimu ya marufuku:

- `CREDITS_EXHAUSTED_SIGNALS` — malipo/kikomo kimeisha (`insufficient_quota`,
  `credit_balance_too_low`, `payment required`, …) → hali ya mwisho `credits_exhausted`.
- `OAUTH_INVALID_TOKEN_SIGNALS` — **si ya mwisho**; kuonyesha upya tokeni kunaweza kurejesha hali.

Kumbuka: vifungu vya kawaida vya muda mfupi kama **`rate limit`** / `429` hushughulikiwa na
njia ya kikomo cha kasi / kipindi cha kusubiri cha muunganisho na **si** ishara za marufuku.

## Mtiririko wa utambuzi

```
jibu la hitilafu kutoka kwa mtoa huduma wa juu
  → mwili unabadilishwa kuwa mfuatano wa herufi + herufi zote zinabadilishwa kuwa ndogo
  → isAccountDeactivated(body): getMergedBannedSignals().some(sig => body.includes(sig))   [ulinganishaji wa kijisehemu cha maandishi]
  → kuna ulinganifu?
      → testStatus ya muunganisho = "banned"      (ya kudumu — kipindi cha kusubiri cha mwaka 1, hairejei kiotomatiki)
      → ikiwa mpangilio `autoDisableBannedAccounts` umewashwa na `autoDisableBannedScope`
        unajumuisha muunganisho huu (`all`, au `subscription` kwa OAuth/kuki/kikao)
        → pia isActive = false. Funguo za API zinazolipiwa mapema hubaki amilifu wakati upeo ni
        `subscription`.
      → muunganisho unarukwa wakati wa kuchagua akaunti (hali za combo QUOTA_BLOCKING)
```

- Ulinganishaji ni utafutaji wa **kijisehemu cha maandishi bila kujali herufi kubwa au ndogo** katika **mwili**
  wa jibu (`isAccountDeactivated`, `accountFallback.ts`).
- Uwekaji wa kudumu katika hali ya mwisho ya `banned` hutokea mwili unapokuwa na ishara ya marufuku katika **hali
  yoyote ya HTTP** (kupitia `markAccountUnavailable` → `checkFallbackError`). Lebo yenye upeo
  finyu zaidi ya **`deactivated`** (`isActive=false` wakati muunganisho hauna
  funguo za API za ziada) huandikwa na njia ya ndani ya `chatCore.ts` kwenye **HTTP 401 / 403**
  (ikiainishwa kupitia `classifyProviderError` → `ACCOUNT_DEACTIVATED`). Kumbuka kwamba njia ya
  `markAccountUnavailable()` huandika hali ya mwisho _tofauti_ —
  **`expired`** — kwa ishara hiyo hiyo ya `ACCOUNT_DEACTIVATED` (kupitia
  `resolveTerminalConnectionStatus`), kwa hivyo marufuku hiyo hiyo inaweza kuonekana kama
  `deactivated` au `expired` kulingana na njia iliyoshughulikia jibu. (Maoni ya
  msimbo wa zamani yanasema "wakati mwili wa 401 una mifuatano hii ya herufi" — kauli hiyo
  haitoshelezi kuelezea tabia ya sasa.)
- Muunganisho wa `banned` huondolewa kwenye uteuzi kila mahali ambapo hali za mwisho
  huchujwa (`isTerminalConnectionStatus`, combo `QUOTA_BLOCKING_CONNECTION_STATUSES`).

## Wigo — ni watoa huduma gani wanaochanganuliwa

**Watoa huduma wote.** Ukaguzi huendeshwa katika mkondo wa jumla wa kushughulikia hitilafu ambao
kila ombi lililoshindwa la upstream hupitia — **haujawekewa** kikomo cha
vichanganuzi vya OAuth/usajili. Hali ya mwisho inayotokana ni ya kila **muunganisho**,
si ya kila mtoa huduma.

Hata hivyo, _strings_ zilizojengewa ndani zimeelekezwa kwa watoa huduma wa
usajili/OAuth walio na hatari halisi ya kupigwa marufuku (ChatGPT Web Codex,
Claude Web, Codex, Muse Spark, Antigravity). Mtoa huduma wa API key atawasha
kitambuzi tu ikiwa mwili wa hitilafu yake una moja ya substrings hizo kihalisi.

`autoDisableBannedScope` (`all` | `subscription`, chaguo-msingi `all`) hudhibiti ikiwa
ulinganifu pia huweka `isActive=false`. `subscription` humaanisha nafasi za mtindo
wa kuingia (usajili wa kulipia na akaunti za bure, ikiwa ni pamoja na vipindi vya
web-cookie). Bado hurekodi `testStatus=banned` kwa API keys za kulipia mapema lakini
huziacha katika hifadhi ya uelekezaji. Muundo wa kudumu ni ubatilishaji wa kila
mtoa huduma na kila akaunti; enum ya kimataifa ni hatua ya kwanza.

## Maneno maalum ya marufuku

Ongeza au ondoa maneno katika **Security → Banned Keywords** (yanahifadhiwa kama
mpangilio wa kimataifa wa `customBannedSignals` kupitia `PATCH /api/settings`).
Haya **huongezwa kwenye** orodha iliyojengewa ndani — kamwe hayabadilishi orodha
hiyo — na hupakiwa upya papo hapo yanapohifadhiwa (na wakati wa kuanza) kupitia
`setCustomBannedSignals()`. Kila neno lina kikomo cha herufi 200; hakuna kikomo
cha urefu wa array.

**⚠ Hatari ya matokeo chanya ya uongo — chagua vifungu mahususi.** Utambuzi ni
ulinganishaji wa substring ghafi kwenye mwili mzima wa jibu, na ulinganifu ni wa
**kudumu** (kipindi cha kusubiri cha mwaka 1, urejeshaji wa mwenyewe). Neno pana
linaweza kupiga marufuku muunganisho ulio salama kabisa:

- **Mbaya:** `quota`, `limit`, `error`, `denied` — huonekana katika hitilafu nyingi za muda.
- **Nzuri:** sentensi kamili za marufuku, kwa mfano `your account has been suspended for`,
  `account permanently banned`, `violation of our terms`.

Pendelea kifungu kirefu zaidi kisicho na utata ambacho mtoa huduma hurejesha wakati
wa marufuku halisi. Ukiwa na shaka, angalia kwanza `lastError` ya muunganisho,
kisha uongeze maneno halisi.

## Kurejesha muunganisho uliotiwa alama

Hali za mwisho za `banned` / `deactivated` **hazijirejeshi kamwe kiotomatiki**
(zimeondolewa kwenye mzunguko wa urejeshaji wa mapema — ni vipindi vya kusubiri
vya `unavailable` pekee vinavyojirejesha). Opereta lazima azifute waziwazi:

1. **Jaribu tena muunganisho** — kitendo cha **Test** kwenye dashibodi
   (`POST /api/providers/{id}/test`); uchunguzi uliofanikiwa hurejesha `testStatus`
   kuwa `active` na kufuta sehemu za hitilafu.
2. **Thibitisha utambulisho upya / hariri vitambulisho** — kwa watoa huduma wa
   OAuth, endesha tena mtiririko wa kuingia / kuonyesha upya; njia za kuunda/kuleta
   mtoa huduma huweka `isActive = true`.
3. **Washa tena muunganisho** — ikiwa uzimaji wa kiotomatiki uliweka
   `isActive = false` (wigo `all`, au `subscription` kwa muunganisho wa
   OAuth/cookie/session), uwashe tena baada ya kurekebisha akaunti.

Hakuna kitufe tofauti cha "clear ban flag" — urejeshaji ni kujaribu tena,
kuthibitisha utambulisho upya, au kuwasha tena, kulingana na kanuni ya jumla ya
hali ya mwisho katika
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md).

## Utengaji wa uchunguzi (model test-all)

**Kushindwa kunakotokana na uchunguzi** (model test-all / utumaji wa ukaguzi wa
afya unaotekelezwa ndani ya `runAsProbe`) hakuondoi kamwe muunganisho kwenye
hifadhi (#9817): **hurekodiwa ili kuonekana** (`last_error`, `last_error_type`,
`error_code`, `last_error_at`) lakini huruka **kila** mabadiliko ya uelekezaji —
vipindi vya kusubiri, hali ya mwisho (`banned` / `deactivated` /
`credits_exhausted`), uzuiaji wa kila modeli, kivunja mzunguko cha mtoa huduma,
akiba ya quota ya dakika 5, uonyeshaji upya wa token ya OAuth na uzimaji wa
kiotomatiki. Ni kushindwa katika njia halisi ya ombi pekee kunakolemaza. Hitilafu
iliyorekodiwa ndiyo inayofanya akaunti iliyotiwa alama ionekane kwenye dashibodi
huku ikiendelea kuhudumia trafiki.

Sehemu pekee ya uamuzi ni `shouldIsolateProbeFailures()`
(`src/shared/utils/probeOrigin.ts`), ambayo hurejelewa na **kila** sehemu inayoweza
kubadilisha hali ya uelekezaji kutokana na kushindwa kunakotokana na uchunguzi:

- `markAccountUnavailable` (`auth.ts`) — kurekodi pekee (`lastError` maandishi
  ghafi, `lastErrorType`, `errorCode`, `lastErrorAt`; kwa makusudi **hakuna**
  `backoffLevel`, ambayo ingewasha upunguzaji wa kiotomatiki wakati wa uteuzi na
  kufuta rekodi)
- `maybeAutoDisableBannedAccount` — hakuna uzimaji wa kiotomatiki
- `chatCore` — FORBIDDEN, ACCOUNT_DEACTIVATED, QUOTA_EXHAUSTED (kurekodi pekee,
  hakuna hali ya mwisho ya `credits_exhausted`), GEO_BLOCKED (hakuna kutengwa kwa
  saa 24), MODEL_NOT_FOUND (hakuna `lockModel`), failover ya kubadilisha akaunti
  ya codex 429 (hakuna `markCodexScopeRateLimited`, hakuna
  `rate_limited_until` iliyohifadhiwa, hakuna kufuta session-affinity),
  `persistCodexQuotaState` (hakuna kuandika hali ya quota, hakuna kubatilisha
  akiba), `recordKeyHealthStatus` (kibadilishaji cha key-health hakiguswi)
- Uonyeshaji upya wa OAuth — uonyeshaji upya wa mapema katika msingi wa executor
  (`base.ts` `execute()`, hakuna mzunguko wa refresh-token unaotumika) na njia
  tendaji ya 401/403 katika `chatCore` (hakuna kulemazwa kwa `expired`)
- `chat.ts` — kivunja mzunguko cha mtoa huduma na akiba ya quota ya dakika 5
  (`markAccountExhaustedFrom429`) hazidhoofishwi kamwe

Hitilafu iliyorekodiwa ndiyo inayofanya akaunti iliyotiwa alama ionekane kwenye
dashibodi huku ikiendelea kuhudumia trafiki. Kumbuka: rekodi ya uchunguzi huhifadhi
maandishi **ghafi** (yasiyokatwa) ya hitilafu, tofauti na ukataji wa
`slice(0,100)` wa njia halisi.

Waendeshaji wanaotumia test-all kama zana ya matengenezo wanaweza kurejesha
tabia ya awali (uchunguzi huhesabiwa kama uzalishaji halisi) kupitia mojawapo ya
hizi:

- mpangilio wa `probeCanDisable` (`POST /api/settings` ukiwa na
  `{"probeCanDisable": true}`, au uhariri wa moja kwa moja wa DB wa `key_value`), au
- feature flag **`PROBE_CAN_DISABLE=true`** (ubatilishaji wa env au DB; hupewa
  kipaumbele kuliko mpangilio).

Usalama wa hitilafu: ikiwa utafutaji wa flag au mipangilio utasababisha hitilafu,
utengaji hubaki UMEWASHWA.

## Faili chanzo

| Jambo                                              | Faili                                                                                                         |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Majedwali ya ishara + ulinganishaji                | `open-sse/services/accountFallback.ts`                                                                        |
| Uhitimishaji / uhifadhi                            | `src/sse/services/auth.ts` (`markAccountUnavailable`, `resolveTerminalConnectionStatus`, `clearAccountError`) |
| Upeo wa kuzima kiotomatiki                         | `src/shared/utils/autoDisableBanned.ts`, `src/sse/services/autoDisableBannedAccount.ts`                       |
| Uainishaji wa ndani                                | `open-sse/handlers/chatCore.ts`, `open-sse/services/errorClassifier.ts`                                       |
| Kutengwa katika urejeshaji wa hali ya mwisho       | `src/lib/quota/connectionRecovery.ts`                                                                         |
| Upakiaji wa wakati wa utekelezaji wa maneno maalum | `src/lib/config/runtimeSettings.ts` (`setCustomBannedSignals`)                                                |
| Kiolesura cha mipangilio                           | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`                                           |
