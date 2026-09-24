# Subscription-first routing (മലയാളം)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/SUBSCRIPTION_LADDER.md) · 🇪🇹 [am](../../../am/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇦 [ar](../../../ar/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇿 [az](../../../az/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇬 [bg](../../../bg/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇩 [bn](../../../bn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇦 [bs](../../../bs/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇿 [cs](../../../cs/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇰 [da](../../../da/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇪 [de](../../../de/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇷 [el](../../../el/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇸 [es](../../../es/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇪 [et](../../../et/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇷 [fa](../../../fa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇮 [fi](../../../fi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇷 [fr](../../../fr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇪 [ga](../../../ga/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [gu](../../../gu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ha](../../../ha/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇱 [he](../../../he/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [hi](../../../hi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇷 [hr](../../../hr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇺 [hu](../../../hu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇲 [hy](../../../hy/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇩 [id](../../../id/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ig](../../../ig/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇹 [it](../../../it/docs/routing/SUBSCRIPTION_LADDER.md) · 🇯🇵 [ja](../../../ja/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇪 [ka](../../../ka/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇭 [km](../../../km/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [kn](../../../kn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇷 [ko](../../../ko/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇹 [lt](../../../lt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇻 [lv](../../../lv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [mr](../../../mr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇾 [ms](../../../ms/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇹 [mt](../../../mt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇲 [my](../../../my/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇵 [ne](../../../ne/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇱 [nl](../../../nl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇴 [no](../../../no/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [or](../../../or/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [pa](../../../pa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇭 [phi](../../../phi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇱 [pl](../../../pl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇹 [pt](../../../pt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇴 [ro](../../../ro/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇺 [ru](../../../ru/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇰 [si](../../../si/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇰 [sk](../../../sk/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇮 [sl](../../../sl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇸 [sr](../../../sr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇪 [sv](../../../sv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇪 [sw](../../../sw/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ta](../../../ta/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [te](../../../te/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇭 [th](../../../th/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇷 [tr](../../../tr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇰 [ur](../../../ur/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇿 [uz](../../../uz/docs/routing/SUBSCRIPTION_LADDER.md) · 🇻🇳 [vi](../../../vi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [yo](../../../yo/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/SUBSCRIPTION_LADDER.md)

---

> രണ്ട് പുതിയ `auto/*` ഐഡികൾ — `auto/subscription`, `auto/thrifty`. അഭ്യർത്ഥിക്കുന്നതിലൂടെ മാത്രമാണ് രണ്ടും opt-in ആകുന്നത്:
> ഒരു caller പേര് ഉപയോഗിച്ച് ഐഡി ആവശ്യപ്പെടാത്തിടത്തോളം ഒന്നും അവയിലൂടെ route ചെയ്യപ്പെടില്ല, കൂടാതെ
> നിലവിലുള്ള pool, strategy, അല്ലെങ്കിൽ default ഒന്നും മാറുന്നില്ല.

## ഇത് എന്തിനാണ് നിലനിൽക്കുന്നത്

OmniRoute ഇതിനകം രണ്ട് ചെലവ്-സംബന്ധമായ ചോദ്യങ്ങൾക്ക് ഉത്തരം നൽകുന്നുണ്ട്, എന്നാൽ മിക്ക operators-ഉം ചോദിക്കുന്ന ചോദ്യമല്ല അവയിലൊന്നും.

| നിലവിലുള്ള സംവിധാനം                                      | ഉത്തരം നൽകുന്നത്                                               |
| -------------------------------------------------------- | -------------------------------------------------------------- |
| `hidePaidModels` (`autoCombo/paidModelFilter.ts`)        | "ഈ model സൗജന്യമെന്ന് catalog ചെയ്തിട്ടുണ്ടോ?"                 |
| `freeAccessPolicy: "strict"` (`strictZeroCostFilter.ts`) | "ഈ connection എപ്പോഴെങ്കിലും എന്നിൽ നിന്ന് നിരക്ക് ഈടാക്കുമോ?" |
| `quotaPreflight` (`combo/quotaExhaustionCutoff.ts`)      | "ഈ connection അതിന്റെ പരിധിക്കടുത്താണോ?"                       |
| `budgetCap` / `budgetFallback` (`autoCombo/engine.ts`)   | "ചെലവ് പരിമിതപ്പെടുത്തി ഏറ്റവും വിലകുറഞ്ഞതിലേക്ക് താഴ്ത്തുക"   |

സൗജന്യം-മാത്രം അനുവദിക്കുന്ന ഓരോ സംവിധാനവും **fails closed** — തീർന്നുപോയ ഒരു free pool എന്നത് ശൂന്യമായ pool ആണ്, ഒരിക്കലും
പണം നൽകേണ്ട option-ലേക്കുള്ള ഒരു മുന്നേറ്റമല്ല — കൂടാതെ paid-side സംവിധാനങ്ങളെല്ലാം tier-agnostic ആണ്. ഇവയിലൊന്നും ഇതിന് ഉത്തരം നൽകുന്നില്ല:

> "ഞാൻ ഇതിനകം പണം നൽകുന്ന quota ഉപയോഗിക്കുക. അത് തീർന്നാൽ, ഒന്നുകിൽ നിർത്തുക, അല്ലെങ്കിൽ ഏറ്റവും
> വിലകുറഞ്ഞ paid options-ലൂടെ ഓരോ പടിയായി മുകളിലേക്ക് നീങ്ങുക — അത് reset ആകുന്ന നിമിഷം തിരികെ വരിക."

## Billing എന്നത് connection-ന്റെ സവിശേഷതയാണ്, model-ന്റെതല്ല

`classifyTier()` (`open-sse/services/tierResolver.ts`) `(provider, model)` അടിസ്ഥാനമാക്കി key ചെയ്യുകയും
catalog pricing-ൽ നിന്ന് `free | cheap | premium` മടക്കിനൽകുകയും ചെയ്യുന്നു. എന്നാൽ ഒരു request-ന് അധിക പണം
ചെലവാകുമോ എന്നത് **ഏത് connection അതിനെ serve ചെയ്യുന്നു** എന്നതിനെ ആശ്രയിച്ചിരിക്കുന്നു: ഒരേ model ഒരു Claude Code
OAuth connection വഴി plan-ൽ ഉൾപ്പെട്ടതായിരിക്കാം, എന്നാൽ API-key connection വഴി ഓരോ token-നും നിരക്ക് ഈടാക്കപ്പെടാം.

`provider_connections.auth_type` ഇരു ദിശകളിലും സുരക്ഷിതമായ proxy അല്ല — metered OAuth
connections നിലവിലുണ്ട്, അതുപോലെ plan-ൽ ഉൾപ്പെട്ട API-key connections-ഉം നിലവിലുണ്ട് (ഒരു Copilot seat token എന്നത്
metered API key അല്ല). അതിനാൽ billing class ലഭിക്കുന്നത് **curated catalog** ആയ
`open-sse/config/connectionBillingCatalog.ts`-ൽ നിന്നാണ്; ഓരോ provider-ന്റെയും പ്രസിദ്ധീകരിച്ച terms അനുസരിച്ച് കൈമുറയായി സജ്ജീകരിച്ചതാണ് ഇത് —
free models-ക്കായി `FreeModelBudget.hardStopGuaranteed` ഇതിനകം സ്ഥാപിച്ച അതേ pattern.

```ts
type ConnectionBillingClass = "subscription" | "metered" | "keyless" | "unknown";
type ConnectionOverageBehavior = "hard-stop" | "meters-to-paid" | "unknown";
```

Resolution ക്രമം (`autoCombo/connectionBilling.ts`): synthetic no-auth sentinel →
`keyless`; provider-നും `authType`-നും **ഒരുപോലെ** പൊരുത്തപ്പെടുന്ന catalog entry; provider-wide entry;
അല്ലെങ്കിൽ `unknown`. **Curate ചെയ്യാത്തത് സൗജന്യമല്ല** — എല്ലായിടത്തും `unknown` എന്നത് `metered` ആയി
പരിഗണിക്കപ്പെടുന്നു, അതിനാൽ നാളെ ചേർക്കുന്ന provider subscription rung-ന് പുറത്താണ് ആരംഭിക്കുക, കൂടാതെ
ഉദ്ദേശ്യപൂർവം curate ചെയ്താൽ മാത്രമേ അതിൽ ഉൾപ്പെടുകയുള്ളൂ.

## Rung model

Escalation ക്രമത്തിൽ അഞ്ച് rungs. വിലയിൽ മാത്രമല്ല അവ തമ്മിൽ വ്യത്യാസമുള്ളത് — ഓരോന്നിനും അതിന്റേതായ
**exhaustion signal** ഉണ്ട്, അതുകൊണ്ടാണ് ഇത് വെറുമൊരു sort മാത്രമല്ലാത്തത്.

| #   | Rung           | അംഗത്വം                                            | Exhausted ആകുന്ന സമയം                       |
| --- | -------------- | -------------------------------------------------- | ------------------------------------------- |
| 0   | `subscription` | curated `billing: "subscription"`                  | quota window cutoff-ലോ അതിന് താഴെയോ         |
| 1   | `keyless`      | synthetic no-auth path                             | connection cooldown / breaker               |
| 2   | `free`         | metered connection, `classifyTier() === "free"`    | free allowance തീരുമ്പോൾ                    |
| 3   | `cheap`        | metered connection, `classifyTier() === "cheap"`   | ഓരോ rung-ന്റെയും budget ഉപയോഗിച്ചുതീരുമ്പോൾ |
| 4   | `premium`      | metered connection, `classifyTier() === "premium"` | ഓരോ rung-ന്റെയും budget ഉപയോഗിച്ചുതീരുമ്പോൾ |

Rungs 0-2 **quota** അടിസ്ഥാനമാക്കി exhaust ആകുന്നു; അത് നിരീക്ഷിക്കാവുന്നതും ഇതിനകം track ചെയ്യപ്പെടുന്നതുമാണ്. Rungs 3-4-ന്
quota ഇല്ല — ഒരു paid connection എന്നേക്കുമായി serve ചെയ്യും — അതിനാൽ അവയുടെ യുക്തിസഹമായ ഏക exhaustion signal ഓരോ rung-ന്റെയും
**budget** ആണ്. അതില്ലെങ്കിൽ, "cheap തീരുമ്പോൾ escalate ചെയ്യുക" എന്നതിന് trigger ഒന്നുമില്ല.

## `auto/subscription` — പരാജയപ്പെട്ടാൽ അടച്ച നിലയിൽ തുടരുക

പൂൾ = rung 0 മാത്രം; അധിക ഉപയോഗം രേഖപ്പെടുത്തിയിട്ടുള്ള `hard-stop` ആയ കണക്ഷനുകളിലേക്ക് പരിമിതപ്പെടുത്തിയിരിക്കുന്നു, കൂടാതെ ഓരോന്നിനും മതിയായ ക്വോട്ട ശേഷിയുണ്ടെന്ന് തത്സമയം സ്ഥിരീകരിച്ചിരിക്കുന്നു. അവ്യക്തമായതെല്ലാം ഒഴിവാക്കപ്പെടുന്നു: ക്രമീകരിച്ചിട്ടില്ലാത്ത പ്രൊവൈഡർ, സ്ഥിരീകരിക്കാനാകാത്ത ക്വോട്ട റീഡിങ്, കാലഹരണപ്പെട്ട റീഡിങ്, അല്ലെങ്കിൽ പണമടയ്ക്കേണ്ട ഉപയോഗമായി കണക്കാക്കുന്ന അധിക ഉപയോഗം.

ശൂന്യമായ പൂൾ ഒരു തകരാറല്ല, മറിച്ച് **ഉദ്ദേശിച്ചിട്ടുള്ള** ഉത്തരമാണ് — കോളറിന്റെ നിലവിലുള്ള empty-pool പാത അതിനെ നിശ്ശബ്ദവും പണം ഈടാക്കാവുന്നതുമായ fallback ആക്കുന്നതിനുപകരം വ്യക്തമായ ഒരു പിശകാക്കി മാറ്റുന്നു. ഈ id നൽകുന്ന മുഴുവൻ ഉറപ്പും അതാണ്.

`keyless` മനഃപൂർവം യോഗ്യത നേടുന്നില്ല: ഈ ഗ്രൂപ്പിങ്ങിന്റെ അർത്ഥം "ഞാൻ പണമടയ്ക്കുന്ന പ്ലാൻ" എന്നാണ്, അതിനാൽ authentication ആവശ്യമില്ലാത്ത backend ഇതിൽ ഉൾപ്പെടുന്നില്ല. അതിനായി `auto/thrifty` (അല്ലെങ്കിൽ `auto/best-free`) ഉപയോഗിക്കുക.

### കണക്ഷൻ സുരക്ഷ

ഒരു candidate എല്ലായ്പ്പോഴും ഒരൊറ്റ കണക്ഷനുമായി ബന്ധിപ്പിക്കപ്പെട്ടിരിക്കണമെന്നില്ല — ഒരു logical candidate-ൽ `allowedConnectionIds` allowlist ഉണ്ടായിരിക്കും, യഥാർത്ഥത്തിൽ ഉപയോഗിക്കുന്ന അക്കൗണ്ട് പിന്നീട് dispatch സമയത്ത് `open-sse/services/combo/autoStrategy.ts` തിരഞ്ഞെടുക്കുന്നു. അതിനാൽ, രണ്ട് ഗ്രൂപ്പിങ്ങുകളും **ഓരോ കണക്ഷനും പ്രത്യേകം** പരിശോധിക്കുകയും `allowedConnectionIds`-നെ നിലനിൽക്കുന്ന ഉപസമുച്ചയം മാത്രമായി പുനഃരചിക്കുകയും ചെയ്യുന്നു — ഒരിക്കലും പൂർണ്ണമായ യഥാർത്ഥ പട്ടികയിലേക്കല്ല, ഏകപക്ഷീയമായി തിരഞ്ഞെടുത്ത ഒരു അംഗത്തിലേക്കുമല്ല. `autoStrategy.ts` ഇതിനകം ആ array-യെ കർശനമായ allowlist ആയി നിർബന്ധിക്കുന്നതിനാൽ, ഇവിടെ അത് പുനഃരചിക്കുന്നത് "സ്ഥിരീകരിച്ചത്", "യഥാർത്ഥത്തിൽ ഉപയോഗിച്ചത്" എന്നിവ നിർമാണപരമായി ഒരേ സെറ്റാക്കി മാറ്റുന്നു. ഇത് [STRICT_ZERO_COST](./STRICT_ZERO_COST.md)-ലെ അതേ invariant-ഉം അതേ യുക്തിയുമാണ്.

## `auto/thrifty` — ഓരോ തവണയും ഒരു rung വീതം ഉയരുക

പൂൾ = എല്ലാ rung-കളും, rung index അനുസരിച്ച് ക്രമപ്പെടുത്തിയവ; തീർന്ന candidate-കളെ പുറത്താക്കിയിരിക്കുന്നു. ശേഷിക്കുന്ന പൂളിനുള്ളിൽ `auto` engine ഇപ്പോഴും **സ്കോർ ചെയ്യുന്നു**: ഏത് rung-കൾ പരിഗണനയിലുണ്ടെന്ന് ladder തീരുമാനിക്കുന്നു, അവയ്ക്കുള്ളിൽ ഏത് candidate വിജയിക്കണമെന്ന് scoring തീരുമാനിക്കുന്നു. ഒരു rung-നുള്ളിലെ ക്രമം സ്ഥിരമാണ്, അതിനാൽ scorer-ന്റെ സ്വന്തം ranking ഈ overlay ഒരിക്കലും പുനഃക്രമീകരിക്കില്ല.

ഇത് ഒരു ordering + gating overlay ആണ്, ഒരു പുതിയ dispatcher **അല്ല**: `combo.ts`-ന്റെ speculative loop ഇതിനകം target-കളിലൂടെ ക്രമത്തിൽ സഞ്ചരിക്കുകയും പരാജയപ്പെട്ടാൽ അടുത്തതിലേക്ക് നീങ്ങുകയും ചെയ്യുന്നു. അതിനാൽ preflight കണ്ടെത്താതിരുന്ന runtime exhaustion സംഭവിച്ചാലും, അതേ request-നുള്ളിൽ തന്നെ അടുത്ത rung-ലേക്ക് ഉയരും.

`auto/subscription` പരാജയപ്പെട്ടാൽ **അടച്ച** നിലയിൽ തുടരുമ്പോൾ, `auto/thrifty` പരാജയപ്പെട്ടാൽ **തുറന്ന** നിലയിൽ തുടരുന്നു: ഉപയോഗിക്കാവുന്ന quota reading ഇല്ലാത്ത plan-included കണക്ഷൻ പോലും ആദ്യം പരീക്ഷിക്കും. അത് പരീക്ഷിക്കുന്നതിന് ചെലവില്ല; അത് തീർന്നതായി കണ്ടെത്തിയാൽ fall-through ഏതായാലും അടുത്ത rung-ലേക്ക് എത്തും — എന്നാൽ അത് പരീക്ഷിക്കാൻ വിസമ്മതിക്കുന്നത് telemetry ലഭ്യമല്ലാത്തപ്പോൾ request-നെ പണമടയ്ക്കേണ്ട rung-ലേക്ക് അയയ്ക്കും; ഈ grouping ഒഴിവാക്കാൻ ഉദ്ദേശിക്കുന്ന കൃത്യമായ ഫലം അതാണ്.

## reset കഴിഞ്ഞ് പ്ലാനിലേക്ക് മടങ്ങൽ

routing rung 0-ലേക്ക് മടങ്ങുന്നതിനുമുമ്പ് സ്വതന്ത്രമായ മൂന്ന് കാര്യങ്ങൾ expire ആകണം. അവയിൽ ഒന്ന് മാത്രം ശരിയാക്കിയാൽ, പ്ലാൻ വീണ്ടും നിറഞ്ഞ് ഏറെ സമയത്തിനുശേഷവും ladder പണമടയ്ക്കേണ്ട rung-കളിൽ കുടുങ്ങിക്കിടക്കും.

1. **quota-state cache** — `freeAccessQuota.ts`, `(provider, connection)` ഒന്നിന് എന്ന രീതിയിൽ 180s TTL ഉപയോഗിച്ച് cache ചെയ്യുന്നു. സ്വന്തം `resetAt` ഇതിനകം കഴിഞ്ഞ cached entry ഇനി നിലവിലില്ലാത്ത ഒരു window-യെ വിവരിക്കുന്നതിനാൽ, പ്രായം പരിഗണിക്കാതെ തന്നെ അത് ഇപ്പോൾ stale ആയി കണക്കാക്കുകയും refresh നിർബന്ധിതമാക്കുകയും ചെയ്യുന്നു. ഇതില്ലെങ്കിൽ, അർധരാത്രിയിൽ വീണ്ടും നിറഞ്ഞ പ്ലാൻ TTL യാദൃച്ഛികമായി തീരുന്നതുവരെ exhausted എന്നുതന്നെ വായിക്കപ്പെടും.
2. **ladder-ന്റെ സ്വന്തം state** — രൂപകൽപ്പനപ്രകാരം അത്തരമൊന്നില്ല. ഓരോ pool build-ലും live quota state-ൽ നിന്ന് rung eligibility വീണ്ടും കണക്കാക്കുന്നു; reset-നെക്കാൾ കൂടുതൽ നിലനിന്ന് routing തടസ്സപ്പെടുത്താൻ സാധ്യതയുള്ള persisted "നിലവിൽ rung 3-ൽ" എന്ന record ഒന്നുമില്ല.
3. **connection cooldown** — exhaustion ഉണ്ടാക്കുന്ന 429, exponential backoff-ൽ നിന്ന് `rateLimitedUntil` സജ്ജമാക്കുന്നു; ഒരു plan connection-ന്റെ കാര്യത്തിൽ ഇത് യഥാർത്ഥ reset-നെ മറികടക്കാം. `clampCooldownToReset()` (`subscriptionLadder.ts`) cooldown-നെ upstream-ന്റെ സ്വന്തം reset സമയത്തേക്ക് ചുരുക്കുന്നു, ഒരിക്കലും അത് നീട്ടാൻ കഴിയില്ല. **ഇത് നടപ്പിലാക്കിയതും പരിശോധിച്ചതുമാണ്, പക്ഷേ ഇതുവരെ wire ചെയ്തിട്ടില്ല**: ഏതെങ്കിലും cooldown എഴുതുന്നതിനുമുമ്പ് `src/sse/services/auth.ts`-ൽ quota cache invalidate ചെയ്യപ്പെടുന്നതിനാൽ, ആ function-ൽ അതിന് മുമ്പുതന്നെ `resetAt` capture ചെയ്യണം — ഇത് resilience hot path-ലേക്കുള്ള മാറ്റമായതിനാൽ പ്രത്യേകം review ചെയ്യുന്ന PR-ലാണ് ഉൾപ്പെടേണ്ടത്. അതുവരെ, വീണ്ടും പ്രവേശിക്കാൻ connection cooldown തീരുന്നതുവരെ കാത്തിരിക്കണം (provider നൽകുമ്പോൾ, ഇത് ഇതിനകം upstream `Retry-After` സൂചനകൾക്ക് മുൻഗണന നൽകുന്നു).

### Anti-flap

ഇപ്പോൾ മാത്രം reset ആയ rung, `reentryMinRemainingPercent`-നേക്കാൾ മുകളിൽ എത്തിയാൽ മാത്രമേ വീണ്ടും പ്രവേശിപ്പിക്കൂ (default 5); അതേസമയം, ഇതിനകം ഉപയോഗത്തിലുള്ള connection `exitCutoffPercent`-നേക്കാൾ മുകളിൽ നിലനിൽക്കുക മാത്രം മതി (default 2, `quotaPreflight.defaultThresholdPercent`-മായി പൊരുത്തപ്പെടുന്നു). ഇവയ്ക്കിടയിലെ വിടവാണ് hysteresis band — അതില്ലെങ്കിൽ, cutoff-ന് സമീപം തുടരുന്ന connection തുടർച്ചയായ request-കളിൽ rung-കൾക്കിടയിൽ ആന്ദോളനം ചെയ്യും.

## കോൺഫിഗറേഷൻ

ട്യൂണിംഗിന് മാത്രം. മനഃപൂർവം `enabled` ഫ്ലാഗ് **ഇല്ല**: ഇവ ഓഫ് ചെയ്യാൻ കഴിയുന്ന ഒരു ടോഗിൾ,
വിപരീതമായ കാര്യം വാഗ്ദാനം ചെയ്യുന്ന പേരിന് കീഴിൽ, പണമടച്ചുള്ള മോഡലുകൾ ഉൾപ്പെടെ, മുഴുവൻ പൂളും
`auto/subscription` നിശ്ശബ്ദമായി നൽകുന്ന അവസ്ഥയുണ്ടാക്കും.

```jsonc
{
  "subscriptionLadder": {
    "exitCutoffPercent": 2,
    "reentryMinRemainingPercent": 5,
    "rungBudgetUsd": { "cheap": 5.0, "premium": 0 }, // 0 ഒരു പടി പൂർണ്ണമായും പ്രവർത്തനരഹിതമാക്കുന്നു
  },
}
```

ഒരു ചെലവ് റിസോൾവർ ബന്ധിപ്പിക്കുന്നതുവരെ ബജറ്റ് ഗേറ്റിംഗ് നിഷ്ക്രിയമാണ്: അക്കൗണ്ടിംഗ് ലഭ്യമല്ലെങ്കിൽ,
പണമടച്ചുള്ള ഒരു പടി ക്രമത്തിൽ ഉൾപ്പെടുത്തുമെങ്കിലും ഒരിക്കലും ഗേറ്റ് ചെയ്യില്ല. v3.8.51 മുതൽ
`rungBudgetUsd` ക്രമീകരണം സ്കീമ സ്വീകരിക്കുന്നുണ്ടെങ്കിലും ഇതുവരെ നടപ്പാക്കിയിട്ടില്ല — ഇത് സജീവമായ
ചെലവ് പരിധിയായി കാണാതെ, കരുതിവെച്ചിരിക്കുന്ന കോൺഫിഗറേഷനായി പരിഗണിക്കുക. പടികളുടെ ക്രമീകരണം,
ക്വാട്ടയെ അടിസ്ഥാനമാക്കിയുള്ള തീർന്നുപോകൽ, റീസെറ്റിന് ശേഷമുള്ള പുനഃപ്രവേശനം എന്നിവയെല്ലാം ഇതില്ലാതെയും
പ്രവർത്തിക്കും.

## സംയോജനം

`subscription`, `thrifty` എന്നിവ `AutoTier` മൂല്യങ്ങളാണ്, അതിനാൽ അവ എല്ലാ വിഭാഗങ്ങളുമായും സംയോജിക്കും:
`auto/coding:thrifty`, `auto/reasoning:subscription` തുടങ്ങിയവ. രണ്ട് ഫ്ലാറ്റ് ഐഡികളും
(`auto/subscription`, `auto/thrifty`) `/v1/models`-ലും ഡാഷ്ബോർഡിലും പ്രദർശിപ്പിക്കുന്നു.

രണ്ട് ഐഡികളും പണമടച്ചുള്ള ടിയറിലുള്ളവയല്ല, അതിനാൽ രണ്ടിനും `isPaidTierAutoId()` `false` മടക്കിനൽകുകയും
`auto/subscription`, `hidePaidModels`-നെ അതിജീവിക്കുകയും ചെയ്യുന്നു.

## കോഡ് എവിടെയാണ് സ്ഥിതിചെയ്യുന്നത്

| പരിഗണന                                   | ഫയൽ                                                 |
| ---------------------------------------- | --------------------------------------------------- |
| ക്യൂറേറ്റ് ചെയ്ത ബില്ലിംഗ് വസ്തുതകൾ      | `open-sse/config/connectionBillingCatalog.ts`       |
| ക്ലാസിഫയർ                                | `open-sse/services/autoCombo/connectionBilling.ts`  |
| പടികൾ, രണ്ട് ഗ്രൂപ്പിംഗുകൾ, പുനഃപ്രവേശനം | `open-sse/services/autoCombo/subscriptionLadder.ts` |
| കാൻഡിഡേറ്റ് പൂളിലേക്കുള്ള വയറിംഗ്        | `open-sse/services/autoCombo/virtualFactory.ts`     |
| റീസെറ്റ് പരിഗണിക്കുന്ന കാഷ് പഴക്കം       | `open-sse/services/autoCombo/freeAccessQuota.ts`    |
| ടിയർ ഉപരിതലം                             | `open-sse/services/autoCombo/suffixComposition.ts`  |
| പ്രദർശിപ്പിക്കുന്ന ഐഡികൾ                 | `open-sse/services/autoCombo/builtinCatalog.ts`     |
| ടെസ്റ്റുകൾ                               | `tests/unit/autoCombo/subscription-ladder.test.ts`  |
