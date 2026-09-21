# Subscription-first routing (తెలుగు)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/SUBSCRIPTION_LADDER.md) · 🇪🇹 [am](../../../am/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇦 [ar](../../../ar/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇿 [az](../../../az/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇬 [bg](../../../bg/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇩 [bn](../../../bn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇿 [cs](../../../cs/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇰 [da](../../../da/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇪 [de](../../../de/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇷 [el](../../../el/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇸 [es](../../../es/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇪 [et](../../../et/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇷 [fa](../../../fa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇮 [fi](../../../fi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇷 [fr](../../../fr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇪 [ga](../../../ga/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [gu](../../../gu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ha](../../../ha/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇱 [he](../../../he/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [hi](../../../hi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇷 [hr](../../../hr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇺 [hu](../../../hu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇲 [hy](../../../hy/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇩 [id](../../../id/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ig](../../../ig/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇹 [it](../../../it/docs/routing/SUBSCRIPTION_LADDER.md) · 🇯🇵 [ja](../../../ja/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇪 [ka](../../../ka/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇭 [km](../../../km/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [kn](../../../kn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇷 [ko](../../../ko/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇹 [lt](../../../lt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇻 [lv](../../../lv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ml](../../../ml/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [mr](../../../mr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇾 [ms](../../../ms/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇹 [mt](../../../mt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇲 [my](../../../my/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇵 [ne](../../../ne/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇱 [nl](../../../nl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇴 [no](../../../no/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [or](../../../or/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [pa](../../../pa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇭 [phi](../../../phi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇱 [pl](../../../pl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇹 [pt](../../../pt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇴 [ro](../../../ro/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇺 [ru](../../../ru/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇰 [si](../../../si/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇰 [sk](../../../sk/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇮 [sl](../../../sl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇸 [sr](../../../sr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇪 [sv](../../../sv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇪 [sw](../../../sw/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ta](../../../ta/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇭 [th](../../../th/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇷 [tr](../../../tr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇰 [ur](../../../ur/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇿 [uz](../../../uz/docs/routing/SUBSCRIPTION_LADDER.md) · 🇻🇳 [vi](../../../vi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [yo](../../../yo/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/SUBSCRIPTION_LADDER.md)

---

> రెండు కొత్త `auto/*` IDలు — `auto/subscription` మరియు `auto/thrifty`. ఈ రెండింటినీ
> అభ్యర్థించడం ద్వారానే ఎంపిక చేసుకోవాలి: కాలర్ పేరు ద్వారా IDని అడగనంత వరకు వాటి గుండా ఏదీ
> రూట్ చేయబడదు, అలాగే ఇప్పటికే ఉన్న ఏ పూల్, వ్యూహం లేదా డిఫాల్ట్ మారదు.

## ఇది ఎందుకు ఉంది

OmniRoute ఇప్పటికే రెండు వ్యయ ప్రశ్నలకు సమాధానం ఇస్తుంది, కానీ వాటిలో ఏదీ చాలా మంది ఆపరేటర్లు అడిగేది కాదు.

| ఇప్పటికే ఉన్న యంత్రాంగం                                  | సమాధానం ఇచ్చే ప్రశ్న                              |
| -------------------------------------------------------- | ------------------------------------------------- |
| `hidePaidModels` (`autoCombo/paidModelFilter.ts`)        | "ఈ మోడల్ ఉచితంగా కేటలాగ్ చేయబడిందా?"              |
| `freeAccessPolicy: "strict"` (`strictZeroCostFilter.ts`) | "ఈ కనెక్షన్ నాకు ఎప్పుడైనా బిల్లు విధించగలదా?"    |
| `quotaPreflight` (`combo/quotaExhaustionCutoff.ts`)      | "ఈ కనెక్షన్ దాని పరిమితికి దగ్గరగా ఉందా?"         |
| `budgetCap` / `budgetFallback` (`autoCombo/engine.ts`)   | "ఖర్చును పరిమితం చేసి, అత్యంత చౌకదానికి తగ్గించు" |

ఉచితం-మాత్రమే యంత్రాంగాలన్నీ **ఫెయిల్-క్లోజ్డ్** అవుతాయి — అయిపోయిన ఉచిత పూల్ ఖాళీ పూల్గానే
ఉంటుంది, చెల్లింపు ఎంపికకు ఎప్పుడూ పైకి వెళ్లదు — అలాగే చెల్లింపు వైపు ఉన్న ప్రతి యంత్రాంగం
టియర్తో సంబంధం లేకుండా పనిచేస్తుంది. వీటిలో ఏదీ దీనికి సమాధానం ఇవ్వదు:

> "నేను ఇప్పటికే చెల్లిస్తున్న కోటాను ఉపయోగించు. అది అయిపోయినప్పుడు, ఆపు లేదా అత్యంత చౌకైన
> చెల్లింపు ఎంపికల ద్వారా ఒక్కో మెట్టు పైకి వెళ్లు — అది రీసెట్ అయిన వెంటనే తిరిగి రా."

## బిల్లింగ్ అనేది కనెక్షన్కు సంబంధించిన వాస్తవం, మోడల్కు సంబంధించినది కాదు

`classifyTier()` (`open-sse/services/tierResolver.ts`) `(provider, model)` ఆధారంగా కీ చేసి,
కేటలాగ్ ధరల నుండి `free | cheap | premium`ను అందిస్తుంది. కానీ ఒక అభ్యర్థనకు అదనపు ఖర్చు
అవుతుందా అనేది **దానిని ఏ కనెక్షన్ అందిస్తుందనే** దానిపై ఆధారపడి ఉంటుంది: అదే మోడల్ Claude Code
OAuth కనెక్షన్ ద్వారా ప్లాన్లో చేర్చబడి ఉండవచ్చు, API-key కనెక్షన్ ద్వారా అయితే ప్రతి టోకెన్కు
బిల్లు విధించబడుతుంది.

`provider_connections.auth_type` ఏ దిశలోనూ సురక్షితమైన ప్రాక్సీ కాదు — మీటర్ చేయబడే OAuth
కనెక్షన్లు ఉన్నాయి, అలాగే ప్లాన్లో చేర్చబడిన API-key కనెక్షన్లు కూడా ఉన్నాయి (Copilot సీట్ టోకెన్
మీటర్ చేయబడే API కీ కాదు). కాబట్టి బిల్లింగ్ తరగతి **ఎంచి నిర్వహించే కేటలాగ్** అయిన
`open-sse/config/connectionBillingCatalog.ts` నుండి వస్తుంది, ప్రతి ప్రొవైడర్ ప్రచురించిన నిబంధనల
ఆధారంగా చేతితో సెట్ చేయబడుతుంది — ఉచిత మోడళ్ల కోసం `FreeModelBudget.hardStopGuaranteed`
ఇప్పటికే స్థాపించిన అదే నమూనా ఇది.

```ts
type ConnectionBillingClass = "subscription" | "metered" | "keyless" | "unknown";
type ConnectionOverageBehavior = "hard-stop" | "meters-to-paid" | "unknown";
```

రిజల్యూషన్ క్రమం (`autoCombo/connectionBilling.ts`): సింథటిక్ no-auth సెంటినల్ →
`keyless`; ప్రొవైడర్ **మరియు** `authType` రెండింటికీ సరిపోలే కేటలాగ్ ఎంట్రీ; ప్రొవైడర్-వ్యాప్త
ఎంట్రీ; లేకపోతే `unknown`. **క్యూరేట్ చేయనిది ఉచితం కాదు** — `unknown` ప్రతిచోటా
`metered`గా పరిగణించబడుతుంది, కాబట్టి రేపు జోడించబడే ప్రొవైడర్ subscription మెట్టు బయట నుంచే
ప్రారంభమవుతుంది మరియు దానిని ఉద్దేశపూర్వకంగా క్యూరేట్ చేయాలి.

## మెట్ల నమూనా

ఎస్కలేషన్ క్రమంలో ఐదు మెట్లు. అవి ధరలో మాత్రమే భిన్నంగా ఉండవు — ప్రతిదానికి దాని **సొంత**
అయిపోయిన స్థితి సంకేతం ఉంటుంది, అందుకే ఇది కేవలం సార్టింగ్ మాత్రమే కాదు.

| #   | మెట్టు         | సభ్యత్వం                                             | అయిపోయినట్లు పరిగణించేది              |
| --- | -------------- | ---------------------------------------------------- | ------------------------------------- |
| 0   | `subscription` | క్యూరేట్ చేసిన `billing: "subscription"`             | కోటా విండో కటాఫ్ వద్ద/కింద ఉన్నప్పుడు |
| 1   | `keyless`      | సింథటిక్ no-auth మార్గం                              | కనెక్షన్ కూల్డౌన్ / బ్రేకర్           |
| 2   | `free`         | మీటర్ చేసిన కనెక్షన్, `classifyTier() === "free"`    | ఉచిత కేటాయింపు అయిపోయినప్పుడు         |
| 3   | `cheap`        | మీటర్ చేసిన కనెక్షన్, `classifyTier() === "cheap"`   | ఒక్కో-మెట్టు బడ్జెట్ వినియోగమైనప్పుడు |
| 4   | `premium`      | మీటర్ చేసిన కనెక్షన్, `classifyTier() === "premium"` | ఒక్కో-మెట్టు బడ్జెట్ వినియోగమైనప్పుడు |

0-2 మెట్లు **కోటా** ఆధారంగా అయిపోతాయి, ఇది గమనించదగినది మరియు ఇప్పటికే ట్రాక్ చేయబడుతోంది.
3-4 మెట్లకు కోటా లేదు — చెల్లింపు కనెక్షన్ నిరవధికంగా సేవ అందిస్తుంది — కాబట్టి వాటికి
సహేతుకమైన ఏకైక అయిపోయిన స్థితి సంకేతం ఒక్కో-మెట్టు **బడ్జెట్**. అది లేకుండా, "cheap అయిపోయినప్పుడు
ఎస్కలేట్ చేయి" అనేదానికి ట్రిగ్గర్ ఉండదు.

## `auto/subscription` — విఫలమైతే మూసివేయడం

పూల్ = మెట్టు 0 మాత్రమే; అదనపు వినియోగం డాక్యుమెంట్ చేయబడిన `hard-stop`గా ఉన్న కనెక్షన్లకే
ఇది పరిమితం చేయబడుతుంది, అలాగే ప్రతిదానికీ తగినంత కోటా మిగిలి ఉందని ప్రత్యక్షంగా ధృవీకరించబడుతుంది.
సందిగ్ధంగా ఉన్న ప్రతిదీ మినహాయించబడుతుంది: క్యూరేట్ చేయని ప్రొవైడర్, ధృవీకరించలేని కోటా రీడింగ్,
కాలం చెల్లిన రీడింగ్ లేదా చెల్లింపు కిందకు వచ్చే అదనపు వినియోగం.

ఖాళీ పూల్ అనేది **ఉద్దేశించిన** సమాధానం, లోపం కాదు — కాలర్లో ఇప్పటికే ఉన్న ఖాళీ-పూల్ మార్గం
దాన్ని నిశ్శబ్దమైన, బిల్లు విధించదగిన ఫాల్బ్యాక్గా మార్చకుండా స్పష్టమైన ఎర్రర్గా మారుస్తుంది.
ఈ ఐడి ఇచ్చే హామీ మొత్తం అదే.

`keyless` ఉద్దేశపూర్వకంగానే అర్హత పొందదు: ఈ గ్రూపింగ్ అర్థం "నేను చెల్లించే ప్లాన్", కాబట్టి
ప్రామాణీకరణ అవసరం లేని బ్యాకెండ్ ఇందులోకి చెందదు. దాని కోసం `auto/thrifty` (లేదా `auto/best-free`)ని ఉపయోగించండి.

### కనెక్షన్ భద్రత

ఒక అభ్యర్థి ఎల్లప్పుడూ ఒకే కనెక్షన్కు అనుసంధానమై ఉండదు — లాజికల్ అభ్యర్థి ఒక
`allowedConnectionIds` అనుమతి జాబితాను కలిగి ఉంటుంది; వాస్తవంగా ఉపయోగించే ఖాతాను తర్వాత డిస్పాచ్ సమయంలో
`open-sse/services/combo/autoStrategy.ts` ఎంచుకుంటుంది. అందువల్ల రెండు గ్రూపింగ్లూ **ప్రతి కనెక్షన్ను
విడివిడిగా** ధృవీకరిస్తాయి మరియు `allowedConnectionIds`ను మిగిలిన ఉపసమితికి ఖచ్చితంగా సరిపోయేలా తిరిగి
రాస్తాయి — పూర్తి అసలు జాబితాకు కాదు, ఏకపక్షంగా ఎంచుకున్న ఒక సభ్యునికి కూడా కాదు. `autoStrategy.ts` ఇప్పటికే
ఆ అర్రేను కఠినమైన అనుమతి జాబితాగా అమలు చేస్తుంది కాబట్టి, దాన్ని ఇక్కడ తిరిగి రాయడం ద్వారా "ధృవీకరించబడినవి"
మరియు "వాస్తవంగా ఉపయోగించబడినవి" నిర్మాణపరంగానే ఒకే సమితిగా మారతాయి. ఇది
[STRICT_ZERO_COST](./STRICT_ZERO_COST.md)లో ఉన్నదే అయిన ఇన్వేరియంట్ మరియు అదే తార్కికత.

## `auto/thrifty` — ఒకసారి ఒక మెట్టు చొప్పున పైకి వెళ్లడం

పూల్ = అన్ని మెట్లు; మెట్టు సూచిక క్రమంలో అమర్చబడి, కోటా అయిపోయిన అభ్యర్థులు గేట్ చేయబడతారు. `auto` ఇంజిన్
మిగిలిన పూల్ **లోపల** ఇప్పటికీ స్కోరింగ్ చేస్తుంది: ఏ మెట్లు పరిగణనలో ఉండాలో ల్యాడర్ నిర్ణయిస్తుంది,
వాటి లోపల ఏ అభ్యర్థి గెలుస్తాడో స్కోరింగ్ నిర్ణయిస్తుంది. ఒక మెట్టు లోపల క్రమం స్థిరంగా ఉంటుంది, కాబట్టి
ఈ ఓవర్లే కారణంగా స్కోరర్ స్వంత ర్యాంకింగ్ ఎప్పుడూ తిరిగి అమర్చబడదు.

ఇది క్రమబద్ధీకరణ + గేటింగ్ ఓవర్లే, కొత్త డిస్పాచర్ **కాదు**: `combo.ts`లోని స్పెక్యులేటివ్ లూప్
ఇప్పటికే లక్ష్యాలను క్రమంలో పరిశీలిస్తూ, విఫలమైతే తర్వాతిదానికి వెళుతుంది; కాబట్టి ప్రీఫ్లైట్ గుర్తించని
రన్టైమ్ కోటా ముగింపు సంభవించినా, అదే రిక్వెస్ట్లో తదుపరి మెట్టుకు వెళుతుంది.

`auto/subscription` విఫలమైతే **మూసివేస్తుంది**, కానీ `auto/thrifty` విఫలమైతే **తెరిచి ఉంచుతుంది**:
ఉపయోగించదగిన కోటా రీడింగ్ లేని, ప్లాన్లో చేర్చబడిన కనెక్షన్ను అయినప్పటికీ ముందుగా ప్రయత్నిస్తుంది.
దాన్ని ప్రయత్నించడానికి ఖర్చేమీ ఉండదు; దాని కోటా అయిపోయిందని తేలితే, ఫాల్-త్రూ ఏమైనా తదుపరి మెట్టుకు
చేరుతుంది — కానీ దాన్ని ప్రయత్నించడానికి నిరాకరిస్తే, టెలిమెట్రీ లేనప్పుడు రిక్వెస్ట్ను చెల్లింపు మెట్టుకు
పంపుతుంది; ఈ గ్రూపింగ్ నివారించడానికి ఉద్దేశించిన ఖచ్చితమైన ఫలితం అదే.

## రీసెట్ తర్వాత ప్లాన్కు తిరిగి రావడం

రూటింగ్ తిరిగి మెట్టు 0కు రావడానికి ముందు మూడు స్వతంత్ర అంశాల గడువు ముగియాలి. వాటిలో ఒక్కదాన్ని మాత్రమే
సరిచేస్తే, ప్లాన్ మళ్లీ నిండిన చాలా కాలం తర్వాత కూడా ల్యాడర్ చెల్లింపు మెట్లపైనే నిలిచిపోతుంది.

1. **కోటా-స్థితి క్యాష్** — `freeAccessQuota.ts` ప్రతి `(provider, connection)` కోసం
   180s TTLతో క్యాష్ చేస్తుంది. దానిలోని `resetAt` ఇప్పటికే దాటిపోయిన క్యాష్ ఎంట్రీ ఇప్పుడు ఉనికిలో లేని
   విండోను వివరిస్తుంది; కాబట్టి వయస్సుతో **సంబంధం లేకుండా** దాన్ని ఇప్పుడు కాలం చెల్లినదిగా పరిగణించి,
   రిఫ్రెష్ను బలవంతం చేస్తుంది. ఇది లేకపోతే, అర్ధరాత్రికి మళ్లీ నిండిన ప్లాన్ TTL యాదృచ్ఛికంగా ముగిసే వరకు
   కోటా అయిపోయినట్లుగానే చూపిస్తుంది.
2. **ల్యాడర్ స్వంత స్థితి** — రూపకల్పన ప్రకారమే అలాంటిదేమీ లేదు. ప్రతి పూల్ నిర్మాణ సమయంలో ప్రత్యక్ష
   కోటా స్థితి ఆధారంగా మెట్టు అర్హతను మళ్లీ లెక్కిస్తారు; రీసెట్ తర్వాత కూడా కొనసాగి రూటింగ్ను ఇరుక్కుపోయేలా
   చేయగల, నిల్వ చేసిన "ప్రస్తుతం మెట్టు 3లో ఉంది" అనే రికార్డు ఏదీ ఉండదు.
3. **కనెక్షన్ కూల్డౌన్** — కోటా ముగిసినప్పుడు వచ్చే 429, ఎక్స్పోనెన్షియల్ బ్యాక్ఆఫ్ ఆధారంగా
   `rateLimitedUntil`ను సెట్ చేస్తుంది; ఇది ప్లాన్ కనెక్షన్కు నిజమైన రీసెట్ సమయాన్ని మించవచ్చు.
   `clampCooldownToReset()` (`subscriptionLadder.ts`) కూల్డౌన్ను అప్స్ట్రీమ్ స్వంత రీసెట్ సమయానికి
   కుదించగలదు మరియు దాన్ని ఎప్పటికీ పొడిగించదు. **ఇది అమలు చేయబడి, పరీక్షించబడింది కానీ ఇంకా వైర్ చేయబడలేదు**:
   ఏదైనా కూల్డౌన్ రాయబడటానికి _ముందే_ `src/sse/services/auth.ts`లో కోటా క్యాష్ ఇన్వాలిడేట్ చేయబడుతుంది,
   కాబట్టి ఆ ఫంక్షన్లో `resetAt`ను ఇంకా ముందుగానే సంగ్రహించాలి — ఇది రెసిలియెన్స్ హాట్ పాత్లో చేయాల్సిన
   మార్పు కాబట్టి, విడిగా సమీక్షించబడే PRలో ఉండాలి. అప్పటివరకు, తిరిగి ప్రవేశించడం కనెక్షన్ కూల్డౌన్
   ముగిసే వరకు వేచి ఉంటుంది (ప్రొవైడర్ పంపినప్పుడు ఇది ఇప్పటికే అప్స్ట్రీమ్ `Retry-After` సూచనలకు
   ప్రాధాన్యం ఇస్తుంది).

### ఊగిసలాట నిరోధం

ఇప్పుడే రీసెట్ అయిన మెట్టు `reentryMinRemainingPercent` (డిఫాల్ట్ 5) కంటే ఎక్కువగా ఉన్నప్పుడే తిరిగి
అనుమతించబడుతుంది; ఇప్పటికే వినియోగంలో ఉన్న కనెక్షన్ మాత్రం `exitCutoffPercent` (డిఫాల్ట్ 2,
`quotaPreflight.defaultThresholdPercent`కు సరిపోతుంది) కంటే ఎక్కువగా ఉంటే సరిపోతుంది. ఈ రెండింటి మధ్య
వ్యత్యాసమే హిస్టెరిసిస్ బ్యాండ్ — ఇది లేకపోతే, కటాఫ్ వద్ద అటూ ఇటూ మారే కనెక్షన్ వరుస రిక్వెస్ట్లలో
మెట్ల మధ్య ఊగిసలాడుతుంది.

## కాన్ఫిగరేషన్

ట్యూనింగ్ కోసం మాత్రమే. ఉద్దేశపూర్వకంగానే `enabled` ఫ్లాగ్ **లేదు**: వీటిని ఆఫ్ చేయగల టాగుల్ ఉంటే,
పూర్తి పూల్ను — చెల్లింపు మోడళ్లతో సహా — దానికి విరుద్ధమైన అర్థాన్ని సూచించే పేరుతో
`auto/subscription` నిశ్శబ్దంగా అందించే పరిస్థితి ఏర్పడుతుంది.

```jsonc
{
  "subscriptionLadder": {
    "exitCutoffPercent": 2,
    "reentryMinRemainingPercent": 5,
    "rungBudgetUsd": { "cheap": 5.0, "premium": 0 }, // 0 ఒక మెట్టును పూర్తిగా నిలిపివేస్తుంది
  },
}
```

ఖర్చును పరిష్కరించే వ్యవస్థను అనుసంధానించే వరకు బడ్జెట్ గేటింగ్ నిష్క్రియంగా ఉంటుంది: అకౌంటింగ్ అందుబాటులో లేకపోతే చెల్లింపు
మెట్టు క్రమంలో ఉంచబడుతుంది, కానీ ఎప్పటికీ గేట్ చేయబడదు. v3.8.51 నాటికి `rungBudgetUsd` సెట్టింగ్ను
స్కీమా అంగీకరిస్తుంది, కానీ ఇంకా అమలు చేయదు — దాన్ని సక్రియ ఖర్చు పరిమితిగా కాకుండా రిజర్వ్ చేసిన కాన్ఫిగరేషన్గా పరిగణించండి. మెట్ల క్రమం, కోటా ఆధారిత ఎగ్జాషన్, రీసెట్ తర్వాత తిరిగి ప్రవేశించడం అన్నీ
అది లేకుండానే పనిచేస్తాయి.

## కూర్పు

`subscription` మరియు `thrifty` అనేవి `AutoTier` విలువలు, కాబట్టి అవి ప్రతి కేటగిరీతో కూర్పు చెందుతాయి:
`auto/coding:thrifty`, `auto/reasoning:subscription`, తదితరాలు. ఈ రెండు ఫ్లాట్ idలు
(`auto/subscription`, `auto/thrifty`) `/v1/models` మరియు డ్యాష్బోర్డ్లో ప్రకటించబడతాయి.

ఈ రెండు idలలో ఏదీ paid-tier కాదు, కాబట్టి రెండింటికీ `isPaidTierAutoId()` అనేది `false`ను తిరిగి ఇస్తుంది మరియు
`auto/subscription` అనేది `hidePaidModels` తర్వాత కూడా అందుబాటులో ఉంటుంది.

## కోడ్ ఎక్కడ ఉంది

| అంశం                                      | ఫైల్                                                |
| ----------------------------------------- | --------------------------------------------------- |
| ఎంపిక చేసిన బిల్లింగ్ వాస్తవాలు           | `open-sse/config/connectionBillingCatalog.ts`       |
| వర్గీకరణ సాధనం                            | `open-sse/services/autoCombo/connectionBilling.ts`  |
| మెట్లు, రెండు గ్రూపింగ్లు, తిరిగి ప్రవేశం | `open-sse/services/autoCombo/subscriptionLadder.ts` |
| అభ్యర్థి పూల్లోకి అనుసంధానం               | `open-sse/services/autoCombo/virtualFactory.ts`     |
| రీసెట్ను పరిగణించే క్యాష్ పాతబడటం         | `open-sse/services/autoCombo/freeAccessQuota.ts`    |
| టైర్ ఉపరితలం                              | `open-sse/services/autoCombo/suffixComposition.ts`  |
| ప్రకటించిన idలు                           | `open-sse/services/autoCombo/builtinCatalog.ts`     |
| పరీక్షలు                                  | `tests/unit/autoCombo/subscription-ladder.test.ts`  |
