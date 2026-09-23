# Subscription-first routing (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/SUBSCRIPTION_LADDER.md) · 🇪🇹 [am](../../../am/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇦 [ar](../../../ar/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇿 [az](../../../az/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇬 [bg](../../../bg/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇩 [bn](../../../bn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇦 [bs](../../../bs/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇿 [cs](../../../cs/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇰 [da](../../../da/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇪 [de](../../../de/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇷 [el](../../../el/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇸 [es](../../../es/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇪 [et](../../../et/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇷 [fa](../../../fa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇮 [fi](../../../fi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇷 [fr](../../../fr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇪 [ga](../../../ga/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [gu](../../../gu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ha](../../../ha/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇱 [he](../../../he/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [hi](../../../hi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇷 [hr](../../../hr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇺 [hu](../../../hu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇲 [hy](../../../hy/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇩 [id](../../../id/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ig](../../../ig/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇹 [it](../../../it/docs/routing/SUBSCRIPTION_LADDER.md) · 🇯🇵 [ja](../../../ja/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇪 [ka](../../../ka/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇭 [km](../../../km/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [kn](../../../kn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇷 [ko](../../../ko/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇹 [lt](../../../lt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇻 [lv](../../../lv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ml](../../../ml/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [mr](../../../mr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇾 [ms](../../../ms/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇹 [mt](../../../mt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇲 [my](../../../my/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇵 [ne](../../../ne/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇱 [nl](../../../nl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇴 [no](../../../no/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [or](../../../or/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [pa](../../../pa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇭 [phi](../../../phi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇱 [pl](../../../pl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇹 [pt](../../../pt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇴 [ro](../../../ro/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇺 [ru](../../../ru/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇰 [sk](../../../sk/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇮 [sl](../../../sl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇸 [sr](../../../sr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇪 [sv](../../../sv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇪 [sw](../../../sw/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ta](../../../ta/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [te](../../../te/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇭 [th](../../../th/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇷 [tr](../../../tr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇰 [ur](../../../ur/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇿 [uz](../../../uz/docs/routing/SUBSCRIPTION_LADDER.md) · 🇻🇳 [vi](../../../vi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [yo](../../../yo/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/SUBSCRIPTION_LADDER.md)

---

> නව `auto/*` ids දෙකක් — `auto/subscription` සහ `auto/thrifty`. ඉල්ලා සිටීමෙන් පමණක් දෙකම සක්රිය වේ:
> ඇමතුම්කරුවෙකු නමින් id එක ඉල්ලා නොසිටින තෙක් කිසිවක් ඒවා හරහා යොමු නොවන අතර,
> පවතින pool, strategy හෝ default කිසිවක් වෙනස් නොවේ.

## මෙය පවතින්නේ ඇයි

OmniRoute දැනටමත් පිරිවැය පිළිබඳ ප්රශ්න දෙකකට පිළිතුරු දෙන නමුත්, බොහෝ ක්රියාකරුවන් අසන ප්රශ්නය ඒ දෙකෙන් එකක්වත් නොවේ.

| පවතින යාන්ත්රණය                                          | පිළිතුරු දෙන ප්රශ්නය                             |
| -------------------------------------------------------- | ------------------------------------------------ |
| `hidePaidModels` (`autoCombo/paidModelFilter.ts`)        | "මෙම model එක නොමිලේ ලෙස ලැයිස්තුගත කර තිබේද?"   |
| `freeAccessPolicy: "strict"` (`strictZeroCostFilter.ts`) | "මෙම connection එකෙන් කවදා හෝ මට බිල් කළ හැකිද?" |
| `quotaPreflight` (`combo/quotaExhaustionCutoff.ts`)      | "මෙම connection එක එහි සීමාවට ආසන්නද?"           |
| `budgetCap` / `budgetFallback` (`autoCombo/engine.ts`)   | "වියදම සීමා කර, අඩුම මිල විකල්පයට පහත හෙළන්න"    |

නොමිලේ පමණක් භාවිත කරන සෑම යාන්ත්රණයක්ම **අසාර්ථක වූ විට වසා දමයි** — අවසන් වූ free pool එකක්
හිස් pool එකක් වන අතර, එය කිසිවිටෙක ගෙවිය යුතු විකල්පයකට ඉහළ නොයයි — එමෙන්ම ගෙවීම් පැත්තේ
සෑම යාන්ත්රණයක්ම tier පිළිබඳ සැලකිල්ලක් නොදක්වයි. ඒ දෙකෙන් එකක්වත් මෙයට පිළිතුරු නොදේ:

> "මා දැනටමත් ගෙවන quota එක භාවිත කරන්න. එය අවසන් වූ විට, නවත්වන්න; නැතිනම් අඩුම මිල
> ගෙවිය යුතු විකල්ප ඔස්සේ වරකට එක් rung එක බැගින් ඉහළ යන්න — එය reset වූ සැණින් නැවත පැමිණෙන්න."

## බිල්කරණය යනු connection එකක කරුණක් මිස model එකක කරුණක් නොවේ

`classifyTier()` (`open-sse/services/tierResolver.ts`) `(provider, model)` මත key කර ඇති අතර,
catalog මිලකරණයෙන් `free | cheap | premium` ලබා දෙයි. නමුත් request එකකට අමතර මුදලක් වැය වේද
යන්න රඳා පවතින්නේ **එයට සේවය සපයන connection එක මතය**: එකම model එක Claude Code OAuth
connection එකක් හරහා plan එකට ඇතුළත් වන අතර API-key connection එකක් හරහා token එකකට බැගින්
බිල් කෙරේ.

`provider_connections.auth_type` කිසිදු දිශාවකට ආරක්ෂිත proxy එකක් නොවේ — metered OAuth
connections පවතින අතර, plan එකට ඇතුළත් API-key connections ද පවතී (Copilot seat token එකක්
metered API key එකක් නොවේ). එබැවින් billing class එක ලැබෙන්නේ **අතින් තෝරා සැකසූ catalog එකකින්**,
`open-sse/config/connectionBillingCatalog.ts`, එක් එක් providerගේ ප්රකාශිත කොන්දේසි අනුව අතින්
සකසා ඇත — free models සඳහා `FreeModelBudget.hardStopGuaranteed` දැනටමත් ස්ථාපිත කළ රටාවම වේ.

```ts
type ConnectionBillingClass = "subscription" | "metered" | "keyless" | "unknown";
type ConnectionOverageBehavior = "hard-stop" | "meters-to-paid" | "unknown";
```

විසඳීමේ අනුපිළිවෙළ (`autoCombo/connectionBilling.ts`): synthetic no-auth sentinel →
`keyless`; provider **සහ** `authType` යන දෙකටම ගැළපෙන catalog entry එකක්; provider පුරාම අදාළ වන
entry එකක්; එසේ නොමැති නම් `unknown`. **Curate කර නොතිබීම නොමිලේ වීමක් නොවේ** — සෑම තැනකම
`unknown` යන්න `metered` ලෙස භාවිත කරයි. එබැවින් හෙට එක් කරන provider කෙනෙකු subscription rung
එකෙන් පිටත ආරම්භ වන අතර, හිතාමතාම curate කළ යුතුය.

## Rung ආකෘතිය

ඉහළ යන අනුපිළිවෙළට rungs පහක් ඇත. ඒවා මිලෙන් පමණක් වෙනස් නොවේ — එක් එක් rung එකට
**තමන්ගේම** exhaustion signal එකක් ඇත; මෙය හුදෙක් sort කිරීමක් නොවන්නේ එබැවිනි.

| #   | Rung           | සාමාජිකත්වය                                        | අවසන් වූ ලෙස සැලකෙන්නේ                      |
| --- | -------------- | -------------------------------------------------- | ------------------------------------------- |
| 0   | `subscription` | curate කළ `billing: "subscription"`                | quota window එක cutoff මට්ටමේ/ඊට පහළ වූ විට |
| 1   | `keyless`      | synthetic no-auth මාර්ගය                           | connection cooldown / breaker               |
| 2   | `free`         | metered connection, `classifyTier() === "free"`    | free allowance එක අවසන් වූ විට              |
| 3   | `cheap`        | metered connection, `classifyTier() === "cheap"`   | එක් rung එකකට වූ budget එක වැය වූ විට       |
| 4   | `premium`      | metered connection, `classifyTier() === "premium"` | එක් rung එකකට වූ budget එක වැය වූ විට       |

Rungs 0-2 අවසන් වන්නේ **quota** මතය; එය නිරීක්ෂණය කළ හැකි අතර දැනටමත් track කර ඇත. Rungs 3-4 සඳහා
quota එකක් නැත — ගෙවිය යුතු connection එකක් සදාකාලිකව සේවය සපයයි — එබැවින් ඒවා සඳහා ඇති එකම
සාධාරණ exhaustion signal එක එක් rung එකකට වූ **budget** එකකි. එවැන්නක් නොමැතිව,
"cheap අවසන් වූ විට ඉහළ යන්න" යන්නට trigger එකක් නොමැත.

## `auto/subscription` — අසාර්ථක වූ විට වසා දමන්න

Pool = rung 0 පමණි; overage එක ලේඛනගත `hard-stop` එකක් වන සහ quota headroom ඇති බව සජීවීව තහවුරු කළ connections වලට සීමා වේ. අපැහැදිලි සියල්ල බැහැර කෙරේ: සකස් කර නොමැති provider එකක්, තහවුරු කළ නොහැකි quota reading එකක්, කල් ඉකුත් වූ reading එකක්, හෝ ගෙවීම් සඳහා මනිනු ලබන overage එකක්.

හිස් pool එකක් යනු දෝෂයක් නොව, **අපේක්ෂිත** පිළිතුරයි — caller සතුව දැනටමත් පවතින empty-pool path එක, එය නිහඬ සහ අයකිරීමට යටත් fallback එකක් බවට පත් කරනවා වෙනුවට පැහැදිලි error එකක් බවට පත් කරයි. මෙම id එකේ සම්පූර්ණ පොරොන්දුව එයයි.

`keyless` හිතාමතාම සුදුසුකම් **නොලබයි**: මෙම grouping එකේ අර්ථය "මා ගෙවන plan එක" වන බැවින්, authentication අවශ්ය නොවන backend එකක් එයට අයත් නොවේ. ඒ සඳහා `auto/thrifty` (හෝ `auto/best-free`) භාවිත කරන්න.

### Connection ආරක්ෂාව

Candidate එකක් සැමවිටම එක් connection එකකට බැඳී නොපවතී — logical candidate එකක් `allowedConnectionIds` allowlist එකක් රැගෙන යන අතර, සැබවින්ම භාවිත කරන account එක පසුව dispatch අවස්ථාවේදී `open-sse/services/combo/autoStrategy.ts` මඟින් තෝරාගනු ලැබේ. එබැවින් groupings දෙකම **සෑම connection එකක්ම වෙන වෙනම** තහවුරු කර, `allowedConnectionIds` හරියටම ඉතිරි වූ subset එකට නැවත ලියයි — කිසිවිටෙක සම්පූර්ණ මුල් list එකටවත්, අහඹු ලෙස තෝරාගත් එක් member කෙනෙකුටවත් නොවේ. `autoStrategy.ts` දැනටමත් එම array එක hard allowlist එකක් ලෙස බලාත්මක කරන බැවින්, එය මෙහි නැවත ලිවීමෙන් "තහවුරු කළ" සහ "සැබවින්ම භාවිත කළ" යන කුලක දෙක නිර්මාණය අනුවම එකම කුලකය බවට පත් වේ. මෙය [STRICT_ZERO_COST](./STRICT_ZERO_COST.md) හි ඇති invariant එකම වන අතර, එම තර්කයම මෙහිද අදාළ වේ.

## `auto/thrifty` — වරකට එක් rung එක බැගින් ඉහළට යන්න

Pool = සියලුම rungs; rung index අනුව පිළිවෙළට තබා, අවසන් වූ candidates බැහැර කර ඇත. `auto` engine එක තවමත් ඉතිරි වූ pool එක **තුළ** score කරයි: භාවිතයට පැමිණෙන්නේ කුමන rungs ද යන්න ladder එක තීරණය කරන අතර, ඒවා තුළ ජයගන්නේ කුමන candidate එකද යන්න scoring මඟින් තීරණය කරයි. එක් rung එකක් තුළ අනුපිළිවෙළ ස්ථාවර බැවින්, scorer සතු ranking එක මෙම overlay එක මඟින් කිසිවිටෙක නැවත පෙළගස්වන්නේ නැත.

මෙය ordering + gating overlay එකක් මිස, නව dispatcher එකක් **නොවේ**: `combo.ts` හි speculative loop එක දැනටමත් targets අනුපිළිවෙළින් පසුකර යන අතර failure එකකදී ඊළඟ එකට යයි. එබැවින් preflight එකෙන් හඳුනා නොගත් runtime exhaustion එකක් වුවද, එම request එක තුළම ඊළඟ rung එකට යාමට තවමත් හේතු වේ.

`auto/subscription` අසාර්ථක වූ විට වසා දැමුවද, `auto/thrifty` අසාර්ථක වූ විට **විවෘතව** පවතී: භාවිත කළ හැකි quota reading එකක් නොමැති plan එකට ඇතුළත් connection එකක් වුවද පළමුව උත්සාහ කරනු ලැබේ. එය උත්සාහ කිරීමට කිසිදු වියදමක් නොමැති අතර, එය අවසන් වී ඇති බව පෙනී ගියහොත් fall-through එක කෙසේ වෙතත් ඊළඟ rung එක වෙත ළඟා වේ — අනෙක් අතට, එය උත්සාහ කිරීම ප්රතික්ෂේප කළහොත් telemetry නොමැති විට request එක paid rung එකකට යවනු ඇත; එයම මෙම grouping එක වළක්වා ගැනීමට නිර්මාණය කර ඇති ප්රතිඵලයයි.

## Reset එකකින් පසු plan එකට නැවත පැමිණීම

Routing එක rung 0 වෙත නැවත පැමිණීමට පෙර ස්වාධීන කරුණු තුනක් expire විය යුතුය. ඒවායින් එකක් පමණක් නිවැරදි කළහොත්, plan එක නැවත පිරවී බොහෝ වේලාවක් ගත වූ පසුවත් ladder එක paid rungs මත සිරවී පවතී.

1. **Quota-state cache එක** — `freeAccessQuota.ts`, එක් එක් `(provider, connection)` සඳහා 180s TTL එකක් සමඟ cache කරයි. තමන්ගේම `resetAt` දැනටමත් පසුකර ඇති cached entry එකක් තවදුරටත් නොපවතින window එකක් විස්තර කරන බැවින්, දැන් එය එහි වයස **නොසලකා** stale ලෙස සලකා refresh එකක් බල කරයි. මෙය නොමැති නම්, මධ්යම රාත්රියේ නැවත පිරුණු plan එකක් TTL එක අහම්බෙන් අවසන් වන තෙක් exhausted ලෙසම කියවෙයි.
2. **Ladder එකේම state එක** — සැලසුම අනුව එවැන්නක් නොමැත. සෑම pool build එකකදීම live quota state එකෙන් rung eligibility නැවත ගණනය කෙරේ; reset එකකින් පසුවත් පැවතිය හැකි සහ routing එක සිර කළ හැකි persisted "currently on rung 3" record එකක් නොපවතී.
3. **Connection cooldown එක** — exhaustion ඇති කළ 429 එක exponential backoff එකෙන් `rateLimitedUntil` සකසන අතර, plan connection එකක් සඳහා එය සැබෑ reset එක ඉක්මවා යා හැක. `clampCooldownToReset()` (`subscriptionLadder.ts`) cooldown එකක් upstream හිම reset instant එක දක්වා සීමා කරන අතර, කිසිවිටෙක එය දිගු කළ නොහැක. **එය implement කර test කර ඇතත් තවම wire කර නොමැත**: කිසියම් cooldown එකක් ලිවීමට _පෙර_ `src/sse/services/auth.ts` තුළ quota cache එක invalidate කරන බැවින්, `resetAt` එම function එකේ මීට කලින් capture කළ යුතුය — මෙය resilience hot path එකට කරන වෙනසක් වන අතර, එය වෙනම review කළ PR එකකට අයත් වේ. එතෙක්, නැවත ඇතුළු වීම connection cooldown එක අවසන් වන තෙක් බලා සිටියි (provider විසින් එවන විට, එය දැනටමත් upstream `Retry-After` hints සඳහා ප්රමුඛතාව ලබා දෙයි).

### නිතර මාරුවීම වැළැක්වීම

මේ දැන් reset වූ rung එකක් නැවත ඇතුළත් කරන්නේ `reentryMinRemainingPercent` ට (default 5) ඉහළින් පමණක් වන අතර, දැනටමත් භාවිතයේ ඇති connection එකක් `exitCutoffPercent` ට (default 2, `quotaPreflight.defaultThresholdPercent` ට සමාන) ඉහළින් පැවතීම පමණක් අවශ්ය වේ. මෙම පරතරය hysteresis band එකයි — එය නොමැති නම්, cutoff එක ආසන්නයේ පවතින connection එකක් අඛණ්ඩ requests අතර rungs මාරු කරමින් දෝලනය වේ.

## වින්යාසය

සුසර කිරීම සඳහා පමණි. හිතාමතාම `enabled` ධජයක් **නොමැත**: මේවා අක්රිය කළ හැකි ටොගලයක් තිබුණහොත්, එය ප්රතිවිරුද්ධ දේ පොරොන්දු වන නමක් යටතේ, ගෙවීම් සහිත ආකෘතිද ඇතුළුව සම්පූර්ණ සංචිතය `auto/subscription` මඟින් නිහඬව සපයනු ඇත.

```jsonc
{
  "subscriptionLadder": {
    "exitCutoffPercent": 2,
    "reentryMinRemainingPercent": 5,
    "rungBudgetUsd": { "cheap": 5.0, "premium": 0 }, // 0 මඟින් පියවරක් සම්පූර්ණයෙන්ම අක්රිය කරයි
  },
}
```

වියදම් විසඳුම්කාරකයක් සම්බන්ධ කරන තෙක් අයවැය සීමාකරණය අක්රියව පවතී: ගිණුම්කරණය නොමැති විට ගෙවීම් සහිත පියවරක් අනුපිළිවෙළට ඇතුළත් වන නමුත් කිසිවිටෙක සීමා නොකෙරේ. v3.8.51 අනුව `rungBudgetUsd` සැකසුම schema එක මඟින් පිළිගන්නා නමුත් එය තවමත් බලාත්මක **නොවේ** — එය ක්රියාකාරී වියදම් සීමාවක් ලෙස නොව, වෙන්කර ඇති වින්යාසයක් ලෙස සලකන්න. පියවර අනුපිළිවෙළ, කෝටා මත පදනම් වූ අවසන් වීම සහ යළි පිහිටුවීමෙන් පසු නැවත ඇතුළත් වීම යන සියල්ල එය නොමැතිව ක්රියා කරයි.

## සංයෝජනය

`subscription` සහ `thrifty` යනු `AutoTier` අගයන් වන බැවින්, ඒවා සෑම ප්රවර්ගයක් සමඟම සංයෝජනය වේ:
`auto/coding:thrifty`, `auto/reasoning:subscription`, සහ එවැනි අනෙකුත් ඒවා. සමතල ids දෙක
(`auto/subscription`, `auto/thrifty`) `/v1/models` සහ උපකරණ පුවරුවෙහි ප්රචාරය කෙරේ.

කිසිදු id එකක් ගෙවීම් ස්තරයට අයත් නොවන බැවින්, දෙක සඳහාම `isPaidTierAutoId()` විසින් `false` ආපසු ලබා දෙන අතර
`auto/subscription`, `hidePaidModels` වෙතින් ඉතිරි වේ.

## කේතය පිහිටා ඇති ස්ථාන

| සැලකිල්ල                                           | ගොනුව                                               |
| -------------------------------------------------- | --------------------------------------------------- |
| තෝරා සකස් කළ බිල්පත් කරුණු                         | `open-sse/config/connectionBillingCatalog.ts`       |
| වර්ගීකාරකය                                         | `open-sse/services/autoCombo/connectionBilling.ts`  |
| පියවර, කාණ්ඩකරණ දෙකම, නැවත ඇතුළත් වීම              | `open-sse/services/autoCombo/subscriptionLadder.ts` |
| අපේක්ෂක සංචිතයට සම්බන්ධ කිරීම                      | `open-sse/services/autoCombo/virtualFactory.ts`     |
| යළි පිහිටුවීම්-සැලකිල්ලට ගන්නා cache කල් ඉකුත් වීම | `open-sse/services/autoCombo/freeAccessQuota.ts`    |
| ස්තර අතුරුමුහුණත                                   | `open-sse/services/autoCombo/suffixComposition.ts`  |
| ප්රචාරය කළ ids                                     | `open-sse/services/autoCombo/builtinCatalog.ts`     |
| පරීක්ෂණ                                            | `tests/unit/autoCombo/subscription-ladder.test.ts`  |
