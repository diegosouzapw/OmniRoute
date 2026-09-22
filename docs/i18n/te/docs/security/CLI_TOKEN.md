# CLI Machine-ID Token (తెలుగు)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CLI_TOKEN.md) · 🇪🇹 [am](../../../am/docs/security/CLI_TOKEN.md) · 🇸🇦 [ar](../../../ar/docs/security/CLI_TOKEN.md) · 🇦🇿 [az](../../../az/docs/security/CLI_TOKEN.md) · 🇧🇬 [bg](../../../bg/docs/security/CLI_TOKEN.md) · 🇧🇩 [bn](../../../bn/docs/security/CLI_TOKEN.md) · 🇧🇦 [bs](../../../bs/docs/security/CLI_TOKEN.md) · 🇨🇿 [cs](../../../cs/docs/security/CLI_TOKEN.md) · 🇩🇰 [da](../../../da/docs/security/CLI_TOKEN.md) · 🇩🇪 [de](../../../de/docs/security/CLI_TOKEN.md) · 🇬🇷 [el](../../../el/docs/security/CLI_TOKEN.md) · 🇪🇸 [es](../../../es/docs/security/CLI_TOKEN.md) · 🇪🇪 [et](../../../et/docs/security/CLI_TOKEN.md) · 🇮🇷 [fa](../../../fa/docs/security/CLI_TOKEN.md) · 🇫🇮 [fi](../../../fi/docs/security/CLI_TOKEN.md) · 🇫🇷 [fr](../../../fr/docs/security/CLI_TOKEN.md) · 🇮🇪 [ga](../../../ga/docs/security/CLI_TOKEN.md) · 🇮🇳 [gu](../../../gu/docs/security/CLI_TOKEN.md) · 🇳🇬 [ha](../../../ha/docs/security/CLI_TOKEN.md) · 🇮🇱 [he](../../../he/docs/security/CLI_TOKEN.md) · 🇮🇳 [hi](../../../hi/docs/security/CLI_TOKEN.md) · 🇭🇷 [hr](../../../hr/docs/security/CLI_TOKEN.md) · 🇭🇺 [hu](../../../hu/docs/security/CLI_TOKEN.md) · 🇦🇲 [hy](../../../hy/docs/security/CLI_TOKEN.md) · 🇮🇩 [id](../../../id/docs/security/CLI_TOKEN.md) · 🇳🇬 [ig](../../../ig/docs/security/CLI_TOKEN.md) · 🇮🇹 [it](../../../it/docs/security/CLI_TOKEN.md) · 🇯🇵 [ja](../../../ja/docs/security/CLI_TOKEN.md) · 🇬🇪 [ka](../../../ka/docs/security/CLI_TOKEN.md) · 🇰🇭 [km](../../../km/docs/security/CLI_TOKEN.md) · 🇮🇳 [kn](../../../kn/docs/security/CLI_TOKEN.md) · 🇰🇷 [ko](../../../ko/docs/security/CLI_TOKEN.md) · 🇱🇹 [lt](../../../lt/docs/security/CLI_TOKEN.md) · 🇱🇻 [lv](../../../lv/docs/security/CLI_TOKEN.md) · 🇮🇳 [ml](../../../ml/docs/security/CLI_TOKEN.md) · 🇮🇳 [mr](../../../mr/docs/security/CLI_TOKEN.md) · 🇲🇾 [ms](../../../ms/docs/security/CLI_TOKEN.md) · 🇲🇹 [mt](../../../mt/docs/security/CLI_TOKEN.md) · 🇲🇲 [my](../../../my/docs/security/CLI_TOKEN.md) · 🇳🇵 [ne](../../../ne/docs/security/CLI_TOKEN.md) · 🇳🇱 [nl](../../../nl/docs/security/CLI_TOKEN.md) · 🇳🇴 [no](../../../no/docs/security/CLI_TOKEN.md) · 🇮🇳 [or](../../../or/docs/security/CLI_TOKEN.md) · 🇮🇳 [pa](../../../pa/docs/security/CLI_TOKEN.md) · 🇵🇭 [phi](../../../phi/docs/security/CLI_TOKEN.md) · 🇵🇱 [pl](../../../pl/docs/security/CLI_TOKEN.md) · 🇵🇹 [pt](../../../pt/docs/security/CLI_TOKEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CLI_TOKEN.md) · 🇷🇴 [ro](../../../ro/docs/security/CLI_TOKEN.md) · 🇷🇺 [ru](../../../ru/docs/security/CLI_TOKEN.md) · 🇱🇰 [si](../../../si/docs/security/CLI_TOKEN.md) · 🇸🇰 [sk](../../../sk/docs/security/CLI_TOKEN.md) · 🇸🇮 [sl](../../../sl/docs/security/CLI_TOKEN.md) · 🇷🇸 [sr](../../../sr/docs/security/CLI_TOKEN.md) · 🇸🇪 [sv](../../../sv/docs/security/CLI_TOKEN.md) · 🇰🇪 [sw](../../../sw/docs/security/CLI_TOKEN.md) · 🇮🇳 [ta](../../../ta/docs/security/CLI_TOKEN.md) · 🇹🇭 [th](../../../th/docs/security/CLI_TOKEN.md) · 🇹🇷 [tr](../../../tr/docs/security/CLI_TOKEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CLI_TOKEN.md) · 🇵🇰 [ur](../../../ur/docs/security/CLI_TOKEN.md) · 🇺🇿 [uz](../../../uz/docs/security/CLI_TOKEN.md) · 🇻🇳 [vi](../../../vi/docs/security/CLI_TOKEN.md) · 🇳🇬 [yo](../../../yo/docs/security/CLI_TOKEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CLI_TOKEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CLI_TOKEN.md)

---

## అవలోకనం

OmniRoute CLI కమాండ్లు స్థానిక నిర్వహణ APIతో ప్రామాణీకరించడానికి
`x-omniroute-cli-token` అభ్యర్థన హెడర్ ద్వారా పంపబడే
`HMAC-SHA256(machine-id, salt)` టోకెన్ను ఉపయోగిస్తాయి.

దీనివల్ల CLI ఉపకమాండ్లు (`omniroute status`, `omniroute providers` మొదలైనవి)
ప్రతి అమలులోనూ వినియోగదారు JWT లేదా పాస్వర్డ్ను అందించాల్సిన అవసరం లేకుండా
నిర్వహణ ఎండ్పాయింట్లను కాల్ చేయగలవు.

## ఇది ఎలా పనిచేస్తుంది

1. `getMachineTokenSync()` అనేది `node-machine-id` ద్వారా హార్డ్వేర్ మెషీన్ IDని
   చదువుతుంది (విఫలమైతే ఖాళీ స్ట్రింగ్ను ఉపయోగిస్తుంది, తద్వారా CLI ప్రమాణీకరణ నిలిపివేయబడుతుంది).
2. ఇది `HMAC-SHA256(machine_id, salt)`ను గణించి, పూర్తి 64-అక్షరాల
   హెక్స్ డైజెస్ట్ను తిరిగి ఇస్తుంది — ఇది ఈ మెషీన్కు అనుసంధానమైన, నిర్ధారితమైన,
   తిరిగి మూల విలువను పొందలేని టోకెన్.
3. పరిష్కరించబడిన గమ్యస్థానం స్పష్టమైన లూప్బ్యాక్ URL (`localhost`, `127.0.0.0/8`, లేదా
   లూప్బ్యాక్ IPv6) అయినప్పుడు మాత్రమే CLI టోకెన్ను `x-omniroute-cli-token`గా పంపుతుంది.
   టోకెన్ను కలిగి ఉన్న అభ్యర్థనలు `redirect: error`ను ఉపయోగిస్తాయి, కాబట్టి స్థానిక
   రీడైరెక్ట్ దానిని మరొక మూలానికి ఫార్వర్డ్ చేయలేదు. రిమోట్ సందర్భాలు బదులుగా
   స్కోప్ చేసిన యాక్సెస్ టోకెన్లను ఉపయోగిస్తాయి. ఉత్పాదన అందుబాటులో లేకపోతే, CLI హెడర్ను
   వదిలివేస్తుంది మరియు ఖాళీ టోకెన్ను చెల్లుబాటైనదిగా పరిగణించకుండా `omniroute doctor`
   వైఫల్యాన్ని నివేదిస్తుంది.
4. సర్వర్ (`src/server/authz/policies/management.ts`) అదే saltతో ఆశించిన
   టోకెన్ను మళ్లీ గణించి, టైమింగ్ ఆధారిత సంగ్రహణను నిరోధించడానికి `timingSafeEqual`
   ద్వారా పోల్చుతుంది.

## భద్రతా లక్షణాలు

| లక్షణం                            | వివరం                                                                                                                                                                                                                         |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **లూప్బ్యాక్కు మాత్రమే**          | సర్వర్కు చెందిన విశ్వసనీయ పీర్-లోకాలిటీ స్టాంప్ (వాస్తవ TCP పీర్ చిరునామా నుంచి ఉత్పన్నమైనది) లూప్బ్యాక్ అని సూచించినప్పుడు మాత్రమే అంగీకరించబడుతుంది. క్లయింట్ నియంత్రించే `Host` హెడర్ను లోకాలిటీ కోసం ఎప్పుడూ విశ్వసించరు. |
| **స్థిర-సమయ పోలిక**               | `crypto.timingSafeEqual` టైమింగ్ దాడులను నిరోధిస్తుంది.                                                                                                                                                                       |
| **తిరిగి మూల విలువను పొందలేనిది** | HMAC అవుట్పుట్ నుంచి మెషీన్ IDని తిరిగి పొందడం సాధ్యం కాదు.                                                                                                                                                                   |
| **`always`-రక్షిత బైపాస్ లేదు**   | CLI టోకెన్ తనిఖీకి ముందే `isAlwaysProtectedPath()` మూల్యాంకనం చేయబడుతుంది. `/api/shutdown` మరియు `/api/settings/database`కు ఎల్లప్పుడూ JWT అవసరం.                                                                             |
| **ఎగుమతి చేయలేనిది**              | టోకెన్ ఎప్పుడూ డిస్క్కు వ్రాయబడదు లేదా లాగ్ చేయబడదు.                                                                                                                                                                          |

## డిఫాల్ట్ salt (ప్రతి ఇన్స్టాలేషన్కు యాదృచ్ఛికం)

`OMNIROUTE_CLI_SALT` సెట్ చేయబడనప్పుడు, salt అనేది ఒకసారి రూపొందించబడి
`<DATA_DIR>/cli-token-salt.json` వద్ద (`0600` మోడ్తో) నిల్వ చేయబడే యాదృచ్ఛిక 64-అక్షరాల
హెక్స్ స్ట్రింగ్ — రిపోజిటరీలో చేర్చబడిన `omniroute-cli-auth-v1` లిటరల్ కాదు.
`src/lib/machineToken.ts`లోని `getActiveSalt()` మరియు
`bin/cli/utils/cliToken.mjs`లోని దాని ప్రతిరూపం రెండూ ఒకే ఫైల్ను చదువుతాయి, కాబట్టి
ఈ ఇన్స్టాలేషన్లోని సర్వర్ మరియు ప్రతి CLI అమలు ఒకే విలువను ఉపయోగిస్తాయి;
నిల్వ చేసిన లేదా పర్యావరణ salt ఇంకా ఏర్పాటు చేయలేనప్పుడు మాత్రమే రిపోజిటరీలో చేర్చబడిన
లిటరల్ చివరి ప్రత్యామ్నాయంగా ఉపయోగించబడుతుంది (ఉదాహరణకు, సర్వర్ ఎప్పుడూ అమలు కాకముందు
కొత్తగా చేసిన CLI-మాత్రమే ఇన్స్టాలేషన్లో). ఇది పాత స్థిర లిటరల్ డిఫాల్ట్లోని
బలహీనతను పరిష్కరిస్తుంది: `/etc/machine-id` సాధారణంగా అందరూ చదవగలిగేలా ఉంటుంది,
కాబట్టి లేనిపక్షంలో `OMNIROUTE_CLI_SALT`ను ఎప్పుడూ సెట్ చేయని ప్రతి ఇన్స్టాలేషన్కు
ఏ స్థానిక వినియోగదారైనా అదే టోకెన్ను ఉత్పాదించగలరు.

## సాల్ట్ రొటేషన్

కోడ్లో మార్పులు చేయకుండా ఉత్పన్నమైన టోకెన్ను మార్చడానికి `OMNIROUTE_CLI_SALT`ను సెట్ చేయండి — ఇది ఎల్లప్పుడూ ప్రతి ఇన్స్టాలేషన్కు నిల్వ చేయబడిన సాల్ట్ కంటే ప్రాధాన్యత పొందుతుంది. రొటేషన్ తర్వాత, ఈ మెషీన్లోని అన్ని CLI ప్రాసెస్లు స్వయంచాలకంగా కొత్త టోకెన్ను ఉపయోగిస్తాయి. మునుపటి ఉత్పన్న విలువ బహిర్గతమై ఉండగల ప్రాసెస్-లిస్ట్ లీక్ తర్వాత ఇది ఉపయోగకరంగా ఉంటుంది.

```bash
# శాశ్వత రొటేషన్ (షెల్ ప్రొఫైల్కు జోడించండి)
export OMNIROUTE_CLI_SALT="my-secret-salt-2026"

# కొత్త టోకెన్ ఉపయోగంలో ఉందని ధృవీకరించండి
omniroute status
```

## లెగసీ ఫార్మాట్ (SHA-256, 32-అక్షరాలు) — ఇప్పటికీ ఆమోదించబడుతుంది

పైన పేర్కొన్న HMAC ఫార్మాట్కు ముందు, CLI తన టోకెన్ను
`SHA-256(machineId + salt).hex[0..32]` (32-అక్షరాల ప్రిఫిక్స్)గా
`bin/cli/utils/cliToken.mjs`లో (`src/lib/machineToken.ts`లోని `getLegacyCliTokenSync`) ఉత్పన్నం చేసేది.

వెనుకబడిన అనుకూలత కోసం సర్వర్ **రెండు** ఫార్మాట్లనూ ఆమోదిస్తుంది: వెరిఫైయర్
`expectedTokens = [getMachineTokenSync(), getLegacyCliTokenSync()]`ను నిర్మించి, ఇన్కమింగ్ హెడర్ను ప్రతి దానితో `timingSafeEqual` ఉపయోగించి పోలుస్తుంది
(`src/server/authz/policies/management.ts` మరియు `src/lib/middleware/cliTokenAuth.ts`).
కాబట్టి, ఒక టోకెన్ 64-అక్షరాల HMAC డైజెస్ట్తో లేదా 32-అక్షరాల లెగసీ SHA-256 ప్రిఫిక్స్తో **ఏదో ఒకదానికి** సరిపోలితే అది చెల్లుబాటు అవుతుంది.

**నిలిపివేత:** CLI టోకెన్ విధానాన్ని పూర్తిగా నిలిపివేయడానికి `OMNIROUTE_DISABLE_CLI_TOKEN=true` (`env` లేదా `.env`)ను సెట్ చేయండి; ఆ తర్వాత అన్ని యాక్సెస్లకు స్పష్టమైన API కీ అవసరం. బహుళ-వినియోగదారు హోస్ట్లలో ఇది సిఫార్సు చేయబడుతుంది, ఎందుకంటే `machine-id` ప్రతి పరికరానికి సంబంధించినది (ప్రతి వినియోగదారుకు కాదు), అలాగే అదే హోస్ట్లోని మరొక వినియోగదారు అదే టోకెన్ను లెక్కించగలరు.

## ఫైళ్లు

| ఫైల్                                      | ఉద్దేశ్యం                                           |
| ----------------------------------------- | --------------------------------------------------- |
| `src/lib/machineToken.ts`                 | టోకెన్ ఉత్పన్నం (`getMachineTokenSync`)             |
| `bin/cli/utils/cliToken.mjs`              | అదే ఉత్పన్నానికి CLI-వైపు ప్రతిరూపం                 |
| `<DATA_DIR>/cli-token-salt.json`          | ప్రతి ఇన్స్టాలేషన్కు నిల్వ చేయబడిన యాదృచ్ఛిక సాల్ట్ |
| `src/server/authz/headers.ts`             | `CLI_TOKEN_HEADER` స్థిరాంకం                        |
| `src/server/authz/policies/management.ts` | సర్వర్-వైపు ధృవీకరణ                                 |
| `src/server/authz/routeGuard.ts`          | లూప్బ్యాక్ హోస్ట్ తనిఖీ (`isLoopbackHost`)          |

## ఇవి కూడా చూడండి

- `docs/security/ROUTE_GUARD_TIERS.md` — రూట్ రక్షణ స్థాయిలు
- `docs/architecture/AUTHZ_GUIDE.md` — పూర్తి అధికారీకరణ పైప్లైన్
