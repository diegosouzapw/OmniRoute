# Import providers from a CSV or JSON file (తెలుగు)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CSV-IMPORT.md) · 🇪🇹 [am](../../../am/docs/providers/CSV-IMPORT.md) · 🇸🇦 [ar](../../../ar/docs/providers/CSV-IMPORT.md) · 🇦🇿 [az](../../../az/docs/providers/CSV-IMPORT.md) · 🇧🇬 [bg](../../../bg/docs/providers/CSV-IMPORT.md) · 🇧🇩 [bn](../../../bn/docs/providers/CSV-IMPORT.md) · 🇨🇿 [cs](../../../cs/docs/providers/CSV-IMPORT.md) · 🇩🇰 [da](../../../da/docs/providers/CSV-IMPORT.md) · 🇩🇪 [de](../../../de/docs/providers/CSV-IMPORT.md) · 🇬🇷 [el](../../../el/docs/providers/CSV-IMPORT.md) · 🇪🇸 [es](../../../es/docs/providers/CSV-IMPORT.md) · 🇪🇪 [et](../../../et/docs/providers/CSV-IMPORT.md) · 🇮🇷 [fa](../../../fa/docs/providers/CSV-IMPORT.md) · 🇫🇮 [fi](../../../fi/docs/providers/CSV-IMPORT.md) · 🇫🇷 [fr](../../../fr/docs/providers/CSV-IMPORT.md) · 🇮🇪 [ga](../../../ga/docs/providers/CSV-IMPORT.md) · 🇮🇳 [gu](../../../gu/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ha](../../../ha/docs/providers/CSV-IMPORT.md) · 🇮🇱 [he](../../../he/docs/providers/CSV-IMPORT.md) · 🇮🇳 [hi](../../../hi/docs/providers/CSV-IMPORT.md) · 🇭🇷 [hr](../../../hr/docs/providers/CSV-IMPORT.md) · 🇭🇺 [hu](../../../hu/docs/providers/CSV-IMPORT.md) · 🇦🇲 [hy](../../../hy/docs/providers/CSV-IMPORT.md) · 🇮🇩 [id](../../../id/docs/providers/CSV-IMPORT.md) · 🇳🇬 [ig](../../../ig/docs/providers/CSV-IMPORT.md) · 🇮🇹 [it](../../../it/docs/providers/CSV-IMPORT.md) · 🇯🇵 [ja](../../../ja/docs/providers/CSV-IMPORT.md) · 🇬🇪 [ka](../../../ka/docs/providers/CSV-IMPORT.md) · 🇰🇭 [km](../../../km/docs/providers/CSV-IMPORT.md) · 🇮🇳 [kn](../../../kn/docs/providers/CSV-IMPORT.md) · 🇰🇷 [ko](../../../ko/docs/providers/CSV-IMPORT.md) · 🇱🇹 [lt](../../../lt/docs/providers/CSV-IMPORT.md) · 🇱🇻 [lv](../../../lv/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ml](../../../ml/docs/providers/CSV-IMPORT.md) · 🇮🇳 [mr](../../../mr/docs/providers/CSV-IMPORT.md) · 🇲🇾 [ms](../../../ms/docs/providers/CSV-IMPORT.md) · 🇲🇹 [mt](../../../mt/docs/providers/CSV-IMPORT.md) · 🇲🇲 [my](../../../my/docs/providers/CSV-IMPORT.md) · 🇳🇵 [ne](../../../ne/docs/providers/CSV-IMPORT.md) · 🇳🇱 [nl](../../../nl/docs/providers/CSV-IMPORT.md) · 🇳🇴 [no](../../../no/docs/providers/CSV-IMPORT.md) · 🇮🇳 [or](../../../or/docs/providers/CSV-IMPORT.md) · 🇮🇳 [pa](../../../pa/docs/providers/CSV-IMPORT.md) · 🇵🇭 [phi](../../../phi/docs/providers/CSV-IMPORT.md) · 🇵🇱 [pl](../../../pl/docs/providers/CSV-IMPORT.md) · 🇵🇹 [pt](../../../pt/docs/providers/CSV-IMPORT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CSV-IMPORT.md) · 🇷🇴 [ro](../../../ro/docs/providers/CSV-IMPORT.md) · 🇷🇺 [ru](../../../ru/docs/providers/CSV-IMPORT.md) · 🇱🇰 [si](../../../si/docs/providers/CSV-IMPORT.md) · 🇸🇰 [sk](../../../sk/docs/providers/CSV-IMPORT.md) · 🇸🇮 [sl](../../../sl/docs/providers/CSV-IMPORT.md) · 🇷🇸 [sr](../../../sr/docs/providers/CSV-IMPORT.md) · 🇸🇪 [sv](../../../sv/docs/providers/CSV-IMPORT.md) · 🇰🇪 [sw](../../../sw/docs/providers/CSV-IMPORT.md) · 🇮🇳 [ta](../../../ta/docs/providers/CSV-IMPORT.md) · 🇹🇭 [th](../../../th/docs/providers/CSV-IMPORT.md) · 🇹🇷 [tr](../../../tr/docs/providers/CSV-IMPORT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CSV-IMPORT.md) · 🇵🇰 [ur](../../../ur/docs/providers/CSV-IMPORT.md) · 🇺🇿 [uz](../../../uz/docs/providers/CSV-IMPORT.md) · 🇻🇳 [vi](../../../vi/docs/providers/CSV-IMPORT.md) · 🇳🇬 [yo](../../../yo/docs/providers/CSV-IMPORT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CSV-IMPORT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CSV-IMPORT.md)

---

Dashboard → Providers → **ఫైల్ నుండి దిగుమతి చేయండి** ఎంపిక CSV లేదా JSON జాబితా నుండి API-key కనెక్షన్లను సృష్టిస్తుంది. ప్రతి వరుస వేరే ప్రొవైడర్ను లక్ష్యంగా చేసుకోవచ్చు. పాక్షిక వైఫల్యం ఈ ప్రక్రియలో భాగం: కొన్ని వరుసలు విఫలమైనప్పటికీ చెల్లుబాటు అయ్యే వరుసలు దిగుమతి అవుతాయి, అలాగే విఫలమైన వరుసలు ఎందుకు తిరస్కరించబడ్డాయో మోడల్ చూపిస్తుంది.

ఈ దిగుమతి కొత్త OpenAI/Anthropic-అనుకూల ఎండ్పాయింట్ నోడ్లను సృష్టించదు. ముందుగా వాటిని సృష్టించండి (Dashboard → Providers → Add OpenAI-Compatible, లేదా `omniroute nodes add`), ఆ తర్వాత `provider` కాలమ్లో ఆ నోడ్ id ఉన్న వరుసలను దిగుమతి చేయండి. ప్రతి వరుసలోని `baseUrl` ఇప్పటికీ నోడ్ URLను భర్తీ చేయగలదు.

## CSV (స్థాన ఆధారితం)

కాలమ్ పేర్లు కేవలం ప్రదర్శన కోసం మాత్రమే. పార్సర్ ప్రతి వరుసను విభజించి, సూచిక ఆధారంగా విలువలను విడదీస్తుంది:

| సూచిక | ఫీల్డ్     | తప్పనిసరి | గమనికలు                                                                                                                          |
| ----- | ---------- | --------- | -------------------------------------------------------------------------------------------------------------------------------- |
| 0     | `provider` | అవును     | ఇప్పటికే ఉన్న నిర్వహిత ప్రొవైడర్ id (`openai`, `anthropic`, …) **లేదా** ఇప్పటికే నమోదు చేసిన OpenAI/Anthropic-అనుకూల **నోడ్** id |
| 1     | `name`     | అవును     | కనెక్షన్ ప్రదర్శన పేరు                                                                                                           |
| 2     | `apiKey`   | అవును     | API key                                                                                                                          |
| 3     | `baseUrl`  | కాదు      | ప్రతి వరుసకు URL భర్తీ                                                                                                           |
| 4     | `priority` | కాదు      | 1–100 మధ్య పూర్ణ సంఖ్య                                                                                                           |

మొదటి పంక్తిలోని మొదటి కాలమ్ అక్షరాల కేసుతో సంబంధం లేకుండా `provider` అనే పదమే అయితే, అది హెడర్గా పరిగణించబడి దాటవేయబడుతుంది. ఖాళీ పంక్తులు మరియు `#` వ్యాఖ్యలు కూడా దాటవేయబడతాయి.

దిగుమతి మోడల్లోని (**CSV టెంప్లేట్ను డౌన్లోడ్ చేయండి**) ఎంపిక ద్వారా ప్రారంభ ఫైల్ను డౌన్లోడ్ చేయండి. ఉదాహరణ:

```csv
# OmniRoute ప్రొవైడర్ దిగుమతి (స్థాన ఆధారిత కాలమ్లు)
provider,name,apiKey,baseUrl,priority
openai,Prod OpenAI,sk-your-openai-key,,1
```

`openai-compatible-chat-001` వంటి కల్పిత id ఒక నోడ్ కాదు. ఆ వరుస కోసం API `Unknown or unsupported provider`ను తిరిగి ఇస్తుంది; మోడల్ దాన్ని వరుస పేరు పక్కన చూపిస్తుంది.

## JSON

అదే ఫీల్డ్లతో (`provider`, `name`, `apiKey`, `baseUrl?`, `priority?`) కూడిన ఆబ్జెక్ట్ల JSON అరే. CSVకు భిన్నంగా, JSONలో కీలు పేర్లతో ఉంటాయి.

```json
[
  {
    "provider": "openai",
    "name": "Prod OpenAI",
    "apiKey": "sk-your-openai-key",
    "priority": 1
  }
]
```
