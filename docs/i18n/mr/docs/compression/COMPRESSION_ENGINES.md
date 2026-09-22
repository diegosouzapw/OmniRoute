# Compression Engines (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_ENGINES.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_ENGINES.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_ENGINES.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_ENGINES.md)

---

OmniRoute कॉम्प्रेशन हे इंजिन करारांभोवती बांधलेले आहे. एखादा मोड एक इंजिन थेट
(`caveman` किंवा `rtk`) चालवू शकतो किंवा क्रमाने अनेक इंजिने कार्यान्वित करणारी निर्धारक स्टॅक्ड पाइपलाइन चालवू शकतो.

## मोड

| मोड          | इंजिन मार्ग                        | अपेक्षित इनपुट                                     |
| ------------ | ---------------------------------- | -------------------------------------------------- |
| `off`        | कोणतेही नाही                       | प्रॉम्प्टचे अचूक जतन                               |
| `lite`       | Caveman lite सहाय्यके              | कमी-जोखमीची नेहमी-सक्रिय साफसफाई                   |
| `standard`   | Caveman                            | नैसर्गिक-भाषेतील प्रॉम्प्टचे संक्षिप्तीकरण         |
| `aggressive` | Caveman + इतिहास/टूल सारांशक       | दीर्घ चॅट सत्रे                                    |
| `ultra`      | Caveman + छाटणी सहाय्यके           | संदर्भ-मर्यादेतून पुनर्प्राप्ती                    |
| `rtk`        | RTK                                | टर्मिनल, शेल, बिल्ड, चाचणी आणि git आउटपुट          |
| `omniglyph`  | OmniGlyph                          | मूळ प्रदात्याच्या वायरवर प्रतिमा-स्वरूपातील संदर्भ |
| `stacked`    | पाइपलाइन, डीफॉल्ट `rtk -> caveman` | मिश्र टूल लॉग आणि गद्य, कमाल बचत                   |

### OmniGlyph कॉम्प्रेशन प्रोफाइल

`omniglyph` इंजिन (`omniglyph` पॅकेज, 1.4.0+) नामित अर्थविषयक प्रोफाइल स्वीकारते, जे
कॉम्प्रेशन सेटिंग्जमधील `omniglyph.profile` द्वारे जागतिक स्तरावर किंवा स्टॅक्ड पाइपलाइनच्या
स्टेप कॉन्फिगद्वारे प्रत्येक स्टेपसाठी सेट केले जाते:

| प्रोफाइल      | सीमा                                                                                                                 |
| ------------- | -------------------------------------------------------------------------------------------------------------------- |
| `aggressive`  | डीफॉल्ट. प्रकाशित मोजमाप नोंदींमध्ये मोजलेले धोरण — सिस्टम, टूल दस्तऐवज आणि सघन इतिहासाचे प्रतिमांमध्ये रूपांतर करते |
| `balanced`    | सक्रिय स्थिती मूळ स्वरूपात ठेवते, शेवटच्या 8 टर्नचे संरक्षण करते, जुना पूर्ण झालेला इतिहास संकुचित करते              |
| `coding-safe` | अधिकार, टूल स्कीमा आणि सक्रिय टूल आउटपुट मूळ स्वरूपात ठेवते, शेवटच्या 12 टर्नचे संरक्षण करते                         |
| `passthrough` | रूपांतरण न करता रूट करते; इंजिन वगळले जाते                                                                           |

प्रोफाइल ही **कमाल मर्यादा आहे, किमान मर्यादा नाही**: पॅकेजमधील `mergeCompressionProfileOptions`
कॉलरच्या ओव्हरराइडला प्रोफाइलने बंद केलेला हानीकारक लेन पुन्हा उघडू देत नाही, त्यामुळे प्रत्येक-स्टेपवरील
`preserveSystemPrompt: false` हे `coding-safe` अंतर्गत सिस्टम कॉम्प्रेशन पुन्हा सक्षम करू शकत नाही.

या कोडबेसवर केलेल्या मोजमापानुसार: `coding-safe` आणि `balanced` हे `minCompressChars` ला त्याच्या
कमाल मूल्यापर्यंत वाढवतात आणि सिस्टम, टूल स्कीमा व टूल परिणाम मूळ स्वरूपात ठेवतात, त्यामुळे अद्याप
इतिहास जमा न झालेले सत्र `below_min_chars` येथे थांबते आणि इंजिन कोणतेही रूपांतरण करत नाही. म्हणूनच
सर्वात सुरक्षित प्रोफाइलऐवजी `aggressive` हे डीफॉल्ट आहे.

पॅकेज स्वतःचे मॉडेल कार्यक्षेत्र आणि प्रोफाइल त्याच्या पर्यावरण कॉन्फिगरेशनमधून निर्धारित करते.
OmniRoute हा निर्णय कधीही सोपवत नाही: अडॅप्टर मॉडेल गेटला पॅकेजच्या सर्वाधिक प्रतिबंधात्मक
कार्यक्षेत्रावर स्थिर करतो, त्यामुळे होस्ट पर्यावरण सेटिंग्ज केवळ अनुमतीसूची अधिक मर्यादित करू शकतात,
OmniRoute च्या मोजमाप नोंदींपलीकडे ती कधीही विस्तृत करू शकत नाहीत.

## इंजिन रजिस्ट्री

रजिस्ट्री `open-sse/services/compression/engines/registry.ts` मध्ये आहे. इंजिने एक सामायिक
करार उपलब्ध करून देतात:

- `id`: `caveman` किंवा `rtk` यांसारखा स्थिर इंजिन आयडी
- `apply(text, config)`: स्टॅक केलेल्या पाइपलाइनद्वारे वापरला जाणारा जुना अंमलबजावणी मार्ग
- `compress(input, config)`: मजकूर + आकडेवारी परत करणारा प्राथमिक अंमलबजावणी मार्ग
- `getConfigSchema()`: वैध कॉन्फिगरेशनचा JSON-Schema-सदृश आकार परत करतो
- `validateConfig(config)`: `{ valid, errors[] }` परत करतो

नोंदणीसाठी `registerCompressionEngine(engine)` (किंवा प्रगत प्रकरणांसाठी `registerEngine`) वापरले जाते,
जे स्वीकारण्यापूर्वी `assertValidEngine()` आणि `validateConfig(defaultConfig)` कॉल करते.
रनटाइममध्ये एखादे इंजिन काढून टाकण्यासाठी `unregisterCompressionEngine(id)` वापरा.

कॉम्प्रेशन चालण्यापूर्वी `strategySelector.ts` अंगभूत इंजिनांची नोंदणी करते. यामुळे पूर्वावलोकन,
रनटाइम कॉम्प्रेशन, स्टॅक केलेला मोड, चाचण्या आणि भविष्यातील इंजिने समान अंमलबजावणी मार्ग वापरू शकतात.

### MCP वर्णन कॉम्प्रेशन (संबंधित)

एक स्वतंत्र रजिस्ट्री, रजिस्ट्री स्तरावर MCP साधनांच्या वर्णनाचा मेटाडेटा कॉम्प्रेस करते — पाहा
`open-sse/mcp-server/descriptionCompressor.ts` आणि [MCP-SERVER.md](../frameworks/MCP-SERVER.md). ती Caveman
नियमांचा पुनर्वापर करते, परंतु विनंती पेलोडवर नव्हे, तर साधनांच्या मेटाडेटावर कार्य करते.

### अतिरिक्त अंगभूत इंजिने

Caveman, RTK आणि LLMLingua-2 व्यतिरिक्त, रजिस्ट्रीमध्ये अनेक विशेषीकृत दोषरहित /
संरचनात्मक इंजिने समाविष्ट आहेत (स्टॅक केलेल्या पाइपलाइन, प्लेग्राउंड आणि चाचण्यांद्वारे वापरली जाणारी):

| इंजिन         | आयडी            | ते काय करते                                                                                                                                                                                |
| ------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| CCR           | `ccr`           | Content-Compress-Retrieve (H4): मोठ्या सलग मजकूर ब्लॉक्सना सामग्री-पत्तायुक्त संदर्भांनी बदलते, ज्यामुळे पुनरावृत्त/मोठे ब्लॉक्स एकदाच पाठवले जातात आणि त्यानंतर त्यांचा संदर्भ दिला जातो. |
| headroom      | `headroom`      | SmartCrusher (H3 + N5): एकसमान JSON-अॅरे पेलोडचे स्तंभीय `[N rows]` स्वरूपात दोषरहित सारणीबद्ध संक्षिप्तीकरण.                                                                              |
| ionizer       | `ionizer`       | अतिशय मोठ्या एकसमान ब्लॉक्ससाठी सुरुवातीच्या/मधल्या/शेवटच्या पंक्तींचे नमुनीकरण करते आणि वगळलेला मधला भाग CCR सामग्री-पत्तायुक्त संदर्भ म्हणून साठवते.                                     |
| session-dedup | `session-dedup` | सामग्री-पत्तायुक्त, विविध टर्नमधील डीडुप्लिकेशन (TokenMizer-प्रेरित): त्याच सत्राच्या आधीच्या टर्नमध्ये आधीच दिसलेला मजकूर वगळते.                                                          |

**CCR पुनर्प्राप्ती-प्रोटोकॉल सूचना (#8033):** CCR एखाद्या
विनंतीमध्ये पहिल्यांदा ≥1 ब्लॉक बदलते तेव्हा, इंजिन एकच, आयडेम्पोटंट `system` संदेश सुरुवातीला जोडते (`[CCR protocol]`
सेंटिनेलने सुरू होणारा), जो कॉलरला मार्कर → साधन करार शिकवतो: `[CCR retrieve hash=<24hex> chars=N]`
मार्करचा अर्थ काय आहे, हॅश जसाच्या तसा कॉपी करणे आवश्यक आहे
(सर्व 24 हेक्स वर्ण — चुकीच्या पद्धतीने कॉपी केलेले हॅश हे "block not found"
त्रुटींचे संभाव्य कारण आहेत), आणि `[dedup:ref sha=...]` मार्करचा अर्थ "इतिहासात मागे पाहा" असा आहे,
"साधनाला कॉल करा" असा नाही. ही नोंद **कॉलरने जाहीर केलेले `tools[]` तो प्रत्यक्षात
`omniroute_ccr_retrieve` पर्यंत पोहोचू शकतो हे सिद्ध करत असेल तरच** अंतःक्षेपित केली जाते
(`open-sse/services/compression/engines/ccr/protocolInstruction.ts` मधील
`callerSupportsCcrRetrieve()`) — त्या साधनाशिवाय असलेल्या साध्या OpenAI-सुसंगत कॉलरला,
ज्या गोष्टीपर्यंत तो पोहोचू शकत नाही तिला कॉल करण्याची सूचना कधीही मिळत नाही.
अंतःक्षेपणापूर्वी सेंटिनेलसाठी संदेश इतिहास स्कॅन करून आयडेम्पोटन्सी सुनिश्चित केली जाते,
त्यामुळे अनेक टर्नच्या विनंत्या (ज्या आधीचे संदेश पुन्हा प्ले करतात) प्रत्येक टर्नला
नोंदीचा आणखी एक थर जोडत नाहीत.

## Caveman

Caveman मोड सामान्य गद्याच्या अर्थपूर्ण संक्षेपणावर लक्ष केंद्रित करतो:

- कोड ब्लॉक्स, URLs, JSON, पथ आणि संरचित डेटा जतन करतो
- अनावश्यक मजकूर, संदिग्ध भाषा, पुनरावृत्ती झालेला संदर्भ आणि अतिशय लांबलचक जोड-वाक्यरचना काढून टाकतो
- `open-sse/services/compression/rules/` मधील भाषेनुसार फाइल नियम-संचांना समर्थन देतो
- लेगसी `standard`, `aggressive` आणि `ultra` मोड्सद्वारे उपलब्ध राहतो

डॅशबोर्डमधील स्थान `Dashboard -> Context & Cache -> Caveman` आहे.

Caveman अपस्ट्रीम अहवालांनुसार आउटपुट टोकन्स `~75%` कमी होतात, बेंचमार्कमध्ये आउटपुटची सरासरी `65%` बचत होते आणि तिची व्याप्ती `22-87%` असते, तसेच इनपुट-संक्षेपण साधनाची बचत `~46%` असते. स्टॅक केलेल्या प्रॉम्प्ट/कॉन्टेक्स्ट बचतीचे दस्तऐवजीकरण करताना OmniRoute इनपुट-साइड Caveman आकडा वापरते; Caveman आउटपुट मोड हे स्वतंत्र प्रतिसाद-वर्तन वैशिष्ट्य राहते.

## RTK

RTK मोड कमांड आणि साधनांच्या आउटपुटवर लक्ष केंद्रित करतो:

- `git status`, `git branch`, `git diff`, Vitest/Jest/Pytest, Cargo/Go चाचण्या, TypeScript/Vite/Webpack बिल्ड्स, ESLint, npm ऑडिट्स/इंस्टॉल्स, Docker लॉग्स, शेल `find`/`grep`, स्टॅक ट्रेसेस आणि सामान्य लॉग्स यांसारखे आउटपुट वर्ग ओळखतो
- `open-sse/services/compression/engines/rtk/filters/` मधील 49 JSON फिल्टर्स लागू करतो
- RTK-शैलीतील डिक्लेरेटिव्ह पाइपलाइनला समर्थन देतो: ANSI काढणे, बदलणे, match-output शॉर्ट-सर्किट, ओळी काढणे/ठेवणे, प्रत्येक ओळीचे संक्षेपण, head/tail/max-line संक्षेपण आणि आउटपुट रिकामे असल्यास फॉलबॅक
- `.rtk/filters.json` मधील विश्वास-नियंत्रित प्रकल्प फिल्टर्स आणि `DATA_DIR/rtk/filters.json` मधील ग्लोबल फिल्टर्सना समर्थन देतो
- ANSI सिक्वेन्सेस, प्रगतीचा अनावश्यक मजकूर, पुनरावृत्ती झालेल्या ओळी आणि अनुपयोगी ठरावीक मजकूर काढून टाकतो
- कृती करता येण्याजोगे अपयश, इशारे, सारांश, बदललेल्या फाइल्स आणि शेवटचा संदर्भ जतन करतो
- प्रमाणीकरण केलेल्या व्यवस्थापन रूट्सद्वारे पुनर्प्राप्ती/डीबगिंगसाठी लपवलेले कच्चे आउटपुट वैकल्पिकरीत्या जतन करू शकतो

डॅशबोर्डमधील स्थान `Dashboard -> Context & Cache -> RTK` आहे.

सानुकूल फिल्टर्स, विश्वास, पडताळणी आणि कच्चे आउटपुट पुनर्प्राप्ती यांचे कार्यान्वयनविषयक तपशील [`RTK_COMPRESSION.md`](./RTK_COMPRESSION.md) मध्ये आहेत.

RTK अपस्ट्रीम अहवालांनुसार कमांड-आउटपुट संक्षेपणामुळे `60-90%` बचत होते. त्याच्या README मधील उदाहरणात 30 मिनिटांचे Claude Code सत्र `~118,000` टोकन्सवरून `~23,900` टोकन्सवर येते, म्हणजे `79.7%` बचत होते.

## LLMLingua-2 (अर्थपूर्ण छाटणी)

LLMLingua-2 मोड लहान ONNX टोकन क्लासिफायरचा वापर करून गद्यावर **अर्थपूर्ण टोकन छाटणी** करतो आणि नियम-आधारित Caveman व RTK इंजिनांना पूरक ठरतो:

- केवळ non-system संदेशांमधील गद्य संक्षिप्त करतो; fenced code blocks आणि इतर जतन केलेल्या रचनांमध्ये कधीही बदल केला जात नाही
- worker thread मध्ये `@atjsh/llmlingua-2` बॅकएंड (`@huggingface/transformers` द्वारे ONNX) चालवतो, त्यामुळे मॉडेल अनुमान request event loop ला कधीही ब्लॉक करत नाही
- **स्टॅक करता येण्याजोगा** आहे (`stackPriority` 35): स्टॅक केलेल्या पाइपलाइनमध्ये तो संरचनात्मक इंजिनांनंतर (CCR, session-dedup, headroom, Caveman), पण `ultra` पूर्वी चालतो, कारण आधीच संरचनात्मकरीत्या संक्षिप्त केलेल्या मजकुरावर अर्थपूर्ण छाटणी सर्वाधिक प्रभावी असते — उदा. `rtk -> caveman -> llmlingua`
- **कोणतीही त्रुटी आल्यास fail-open होतो** (गहाळ वैकल्पिक dependencies, worker spawn, मॉडेल लोड, अनुमान किंवा timeout) → त्रुटी न देता मूळ मजकूर कोणताही बदल न करता परत केला जातो

इंजिनचे स्थान: `open-sse/services/compression/engines/llmlingua/`. डॅशबोर्डमधील स्थान `Dashboard -> Context & Cache -> LLMLingua` आहे.

### मॉडेल्स

डीफॉल्ट मॉडेल **TinyBERT** (`atjsh/llmlingua-2-js-tinybert-meetingbank`, ~57 MB, जलद) आहे. अधिक अचूक **BERT-base** मॉडेल (`Arcoldd/llmlingua4j-bert-base-onnx`, ~710 MB) इंजिन कॉन्फिगमधील `model` फील्डद्वारे उपलब्ध आहे. पहिल्या कॉलच्या वेळी (`modelStore.ts`) `@huggingface/transformers` निवडलेले मॉडेल HuggingFace Hub वरून `${DATA_DIR}/models/llmlingua` मध्ये आवश्यकतेनुसार डाउनलोड करते; त्याऐवजी `modelPath` कॉन्फिग ओव्हरराइडद्वारे स्थानिक प्रत वापरता येते (ऑफलाइन/एअर-गॅप्ड इंस्टॉल्स).

### वैकल्पिक dependencies आणि आवश्यकतेनुसार इंस्टॉल

छाटणी करता येण्याजोगा LLMLingua runtime peer stack **वैकल्पिक** आहे. दोन पॅकेजेस `package.json` मध्ये `optionalDependencies` म्हणून घोषित केलेली आहेत आणि प्रॉडक्शन बिल्डद्वारे **बाह्य** ठेवली जातात (`scripts/build/prepublish.ts` त्यांना बंडल करत नाही):

| पॅकेज                | आवृत्ती (पिन) | नोंदी                                         |
| -------------------- | ------------- | --------------------------------------------- |
| `@atjsh/llmlingua-2` | `2.0.5`       | प्रवेश पॅकेज; इतरांना peers म्हणून घोषित करते |
| `js-tiktoken`        | `^1.0.20`     | टोकनायझर                                      |

`@huggingface/transformers` हे `^4.2.0` वर पिन केलेले आहे (स्थानिक embeddings पथासह सामायिक केलेले आणि standalone बंडलमध्येही ट्रेस केलेले); `@atjsh/llmlingua-2@2.0.5` हे त्यावर `"^3.5.2 || ^4.0.0"` सह peer dependency ठेवते, त्यामुळे Transformers.js v3 आणि v4 दोन्ही समर्थित आहेत. 2.0.4 पासून `@atjsh/llmlingua-2` ला यापुढे `@tensorflow/tfjs` ची आवश्यकता नाही, ज्यामुळे SLM स्टॅकमधून सर्वात मोठा एकल घटक (TensorFlow.js) काढून टाकला गेला. केवळ वरील दोन पॅकेजेस छाटणी करता येण्याजोगे SLM peers आहेत. वैकल्पिक dependencies वगळल्या नसल्यास मानक `npm install` (dev) वैकल्पिक स्टॅक आपोआप इंस्टॉल करते.

**आवश्यकतेनुसारच का:** आकार लहान ठेवण्यासाठी npm वर प्रकाशित केलेले पॅकेज, standalone बंडल आणि Docker इमेज या dependencies शिवाय वितरित केले जातात. त्या उपलब्ध नसताना worker चे dependency gate (`worker.ts` मधील `@atjsh/llmlingua-2` resolve probe) अयशस्वी होते आणि इंजिन **कोणताही संदेश न देता fail-open होते** — LLMLingua निवडणे no-op बनते (मजकूर न बदलता परत केला जातो आणि कोणतीही त्रुटी लॉग केली जात नाही). छाटणी केलेल्या वातावरणात ते सक्रिय करण्यासाठी वैकल्पिक स्टॅक इंस्टॉल करा:

```bash
# package.json optionalDependencies मध्ये घोषित केलेल्या आवृत्त्यांवर पिन करा
npm install @atjsh/llmlingua-2@2.0.5 js-tiktoken
```

`@tensorflow/tfjs` काढून टाकल्यामुळे (2.0.4+) पूर्वीचा प्रमुख ~800 MB घटक नाहीसा होतो — उर्वरित आकार transformers.js + onnxruntime-node runtimes आणि प्रथम वापराच्या वेळी डाउनलोड होणारे TinyBERT मॉडेल (~57 MB) यांचा आहे (npm द्वारे नाही).

प्रत्येक वातावरणासाठी:

- **Dev / `npm install`** — तुम्ही `--omit=optional`
  (किंवा `--no-optional`) दिले नसल्यास स्वयंचलितपणे स्थापित होते. कोणतीही कृती आवश्यक नाही.
- **Global npm (`npm i -g omniroute`) / standalone** — स्थापित केलेल्या package directory मध्ये वरील install command चालवा,
  किंवा optional deps वगळल्याशिवाय पुन्हा स्थापित करा.
- **Docker** — derived image layer मध्ये install command जोडा; प्रकाशित image
  जाणीवपूर्वक slim ठेवलेली आहे.
- **VPS (PM2)** — app च्या `node_modules` मध्ये स्थापित करा, त्यानंतर process restart करा, जेणेकरून
  worker gate ची पुन्हा तपासणी करेल.
- **Raw Next standalone (`npm run build` → `.build/next/standalone/server.js`)** — या
  standalone trace मध्ये worker किंवा optional deps यांपैकी काहीही समाविष्ट नसते, त्यामुळे engine कोणतीही सूचना न देता
  fail-open होते. `scripts/build/colocate-standalone.mjs` हे दोन्ही पुन्हा लागू करते (worker esbuild +
  standalone tree मध्ये optional-dep closure); प्रत्येक build नंतर ते
  `postbuild` npm hook द्वारे स्वयंचलितपणे चालते. हे idempotent आहे आणि deps अनुपस्थित असल्यास fail-soft होते.

**ते सक्रिय असल्याची खात्री करा:** LLMLingua निवडलेले असताना, वास्तविक गद्य मजकूर खरोखर संक्षिप्त होतो (engine
fail-open होणे थांबवते), आणि पहिली request model download सुरू करून तो
`${DATA_DIR}/models/llmlingua` मध्ये ठेवते. gate जाणीवपूर्वक केवळ `@atjsh/llmlingua-2` चीच तपासणी करते —
इतर peers केवळ ESM आहेत आणि ते उपलब्ध असतानाही `require.resolve` त्यांच्यावर error throw करते — त्यामुळे
`import()` च्या वेळी कोणताही peer खरोखरच अनुपस्थित असल्यास worker तरीही fail-open होते.

## स्टॅक केलेल्या पाइपलाइन्स

स्टॅक केलेला मोड पाइपलाइनच्या पायऱ्या क्रमाने चालवतो. डीफॉल्ट क्रम असा आहे:

```txt
rtk -> caveman
```

ज्या कोडिंग-एजंट सत्रांमध्ये प्रॉम्प्टमध्ये कमांड आउटपुटसोबत मानवी किंवा सहाय्यकाचा मजकूर एकत्रित केला जातो, त्यांच्यासाठी हे वापरा. RTK प्रथम अनावश्यक गोंगाट असलेले टूल लॉग कमी करते, त्यानंतर Caveman उर्वरित नैसर्गिक भाषा संक्षिप्त करते.

पाइपलाइनच्या पायऱ्या कॉम्प्रेशन सेटिंग्जमधील `stackedPipeline` वापरून किंवा कॉम्प्रेशन कॉम्बोद्वारे कॉन्फिगर केल्या जातात.

दोन्ही इंजिने समान पात्र पेलोड कमी करतात तेव्हा बचतीचा एकत्रित परिणाम होतो:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## MCP अॅक्सेसिबिलिटी ट्री फिल्टर

MCP अॅक्सेसिबिलिटी-ट्री स्मार्ट फिल्टर हा कार्यान्वयनानंतरचा कॉम्प्रेशन स्तर आहे, जो प्रॉम्प्ट किंवा संदर्भावर नव्हे, तर MCP **टूल परिणामांवर** चालतो. तो Playwright, computer-use आणि browser-automation MCP सर्व्हर यांसारख्या टूल्सकडून परत केलेल्या विस्तृत अॅक्सेसिबिलिटी-ट्री आणि ब्राउझर स्नॅपशॉट पेलोडना लक्ष्य करतो.

### तो काय करतो

1. **अनावश्यक नोंदी काढणे** — रिकाम्या generic/text नोंदी (`- generic:`, `- text: ""`) काढून टाकतो
2. **समान स्तरावरील नोंदी संक्षिप्त करणे** — जेव्हा ≥ `collapseThreshold` (डीफॉल्ट 30) सलग ओळी संरचनात्मक पुनरावृत्ती असतात, तेव्हा त्या पहिल्या `collapseKeepHead` (डीफॉल्ट 10) ओळी + संख्येचा सारांश + शेवटच्या `collapseKeepTail` (डीफॉल्ट 5) ओळींमध्ये संक्षिप्त केल्या जातात
3. **रेफ जतन करणे** — Playwright/computer-use साठी आवश्यक असलेल्या `[ref=eXX]` अँकर्सना कधीही बदलले जात नाही
4. **कठोर छाटणी** — संक्षिप्त केल्यानंतरही मजकूर `maxTextChars` (डीफॉल्ट 50,000) पेक्षा मोठा असल्यास, एजंटला काम सुरू ठेवता यावे यासाठी नेव्हिगेशन सूचनेसह त्याची छाटणी केली जाते

### इंजिनचे स्थान

```txt
open-sse/services/compression/engines/mcpAccessibility/
  index.ts            ← smartFilterText() प्रवेश बिंदू
  collapseRepeated.ts ← समान स्तरावरील नोंदी संक्षिप्त करण्याचा अल्गोरिदम
  constants.ts        ← DEFAULT_MCP_ACCESSIBILITY_CONFIG
```

### कॉन्फिगरेशन

जागतिक सेटिंग्जमधील `compression.mcpAccessibility` द्वारे नियंत्रित केले जाते (मायग्रेशन 056). डीफॉल्ट कॉन्फिगरेशन:

```json
{
  "enabled": true,
  "maxTextChars": 50000,
  "collapseThreshold": 30,
  "collapseKeepHead": 10,
  "collapseKeepTail": 5,
  "minLengthToProcess": 2000
}
```

फिल्टर केवळ अशा टूल-रिझल्ट पेलोडवर लागू केला जातो ज्यांचा `type` `"text"` आहे आणि ज्यांची लांबी `minLengthToProcess` पेक्षा जास्त आहे. त्याचा प्रॉम्प्ट कॉम्प्रेशन किंवा विनंती पेलोडवर परिणाम होत नाही.

### अपेक्षित बचत

पृष्ठाच्या जटिलतेनुसार, ब्राउझर स्नॅपशॉट टूल परिणामांवर 60–80% बचत होते. संक्षिप्तीकरण अल्गोरिदमची ओळींच्या संख्येतील जटिलता O(n) आहे आणि त्यामुळे नगण्य विलंब वाढतो.

### हा फिल्टर विरुद्ध वरील कॉम्प्रेशन इंजिने

| पैलू       | Caveman / RTK / Stacked   | MCP अॅक्सेसिबिलिटी फिल्टर              |
| ---------- | ------------------------- | -------------------------------------- |
| लक्ष्य     | विनंती प्रॉम्प्ट / संदर्भ | MCP टूल परिणाम                         |
| ट्रिगर     | कॉम्प्रेशन मोड सेटिंग     | `compression.mcpAccessibility.enabled` |
| व्याप्ती   | सर्व SSE संदेश            | केवळ टूल परिणाम                        |
| रेफ अँकर्स | लागू नाही                 | कोणत्याही अटीशिवाय जतन केले जातात      |

---

## कॉम्प्रेशन कॉम्बोज

कॉम्प्रेशन कॉम्बोज ही नाव दिलेली कॉम्प्रेशन प्रोफाइल्स आहेत, जी राउटिंग कॉम्बोजना नियुक्त केली जाऊ शकतात:

- `compression_combos`: मोड, पाइपलाइन, RTK कॉन्फिग, भाषा कॉन्फिग आणि डीफॉल्ट मार्कर संग्रहित करते
- `compression_combo_assignments`: कॉम्प्रेशन कॉम्बोचे राउटिंग कॉम्बोशी मॅपिंग करते
- रनटाइम इंटिग्रेशन जेनेरिक कॉम्बो ओव्हरराइड्सपूर्वी नियुक्त केलेला कॉम्प्रेशन कॉम्बो रिझॉल्व्ह करते
- अॅनालिटिक्समध्ये `compression_combo_id` आणि `engine` समाविष्ट असतात

डॅशबोर्ड स्थान: `Dashboard -> Context & Cache -> Compression Combos`.

## API पृष्ठभाग

| रूट                                    | उद्देश                                                              |
| -------------------------------------- | ------------------------------------------------------------------- |
| `/api/settings/compression`            | जागतिक कॉम्प्रेशन सेटिंग्ज (`mcpAccessibility` कॉन्फिगसह)           |
| `/api/compression/preview`             | कोणत्याही कॉम्प्रेशन मोडचे पूर्वावलोकन                              |
| `/api/compression/language-packs`      | उपलब्ध Caveman भाषा पॅक्सची यादी                                    |
| `/api/context/caveman/config`          | Caveman सेटिंग्जसाठी पर्यायी नाव                                    |
| `/api/context/rtk/config`              | RTK डीफॉल्ट्स आणि सेटिंग्ज                                          |
| `/api/context/rtk/filters`             | RTK फिल्टर कॅटलॉग                                                   |
| `/api/context/rtk/test`                | RTK पूर्वावलोकन/चाचणी एंडपॉइंट                                      |
| `/api/context/rtk/raw-output/[id]`     | प्रमाणीकरण केलेली, संवेदनशील माहिती काढलेली रॉ-आउटपुट पुनर्प्राप्ती |
| `/api/context/combos`                  | कॉम्प्रेशन कॉम्बो CRUD                                              |
| `/api/context/combos/[id]/assignments` | राउटिंग-कॉम्बो नियुक्ती CRUD                                        |
| `/api/context/analytics`               | कॉम्प्रेशन अॅनालिटिक्ससाठी पर्यायी नाव                              |

व्यवस्थापन रूट्सना व्यवस्थापन प्रमाणीकरण किंवा API-की धोरण तपासण्या आवश्यक असतात.

## MCP साधने

कॉम्प्रेशन पाच MCP साधने उपलब्ध करून देते:

| साधन                                | व्याप्ती            | उद्देश                              |
| ----------------------------------- | ------------------- | ----------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | सेटिंग्ज, अॅनालिटिक्स, कॅश आकडेवारी |
| `omniroute_compression_configure`   | `write:compression` | जागतिक सेटिंग्ज अद्ययावत करणे       |
| `omniroute_set_compression_engine`  | `write:compression` | मोड आणि पर्यायी पाइपलाइन सेट करणे   |
| `omniroute_list_compression_combos` | `read:compression`  | कॉम्प्रेशन कॉम्बोजची यादी           |
| `omniroute_compression_combo_stats` | `read:compression`  | कॉम्बो/इंजिन अॅनालिटिक्स वाचणे      |

## व्याप्ती आणि वगळणे

**एम्बेडिंग्ज कधीही कॉम्प्रेस केली जात नाहीत.** `open-sse/handlers/embeddings.ts` कधीही कोणत्याही
कॉम्प्रेशन इंजिनला कॉल करत नाही — विनंती/प्रतिसाद बॉडी कोणताही बदल न होता थेट एक्झिक्युटरकडे जाते.
आज हे संरचनात्मक आहे (एम्बेडिंग्ज आणि चॅट कम्प्लिशन्सचे हँडलर्स वेगळे आहेत), रनटाइम
तपासणी नाही; परंतु याचा अर्थ #8034 मधील व्हेक्टर-विरूपणाच्या चिंतेसाठी एम्बेडिंग्ज पाथमध्ये
कोणताही संभाव्य परिणाम-भाग उपलब्ध नाही.

**प्रति-मॉडेल/एंडपॉइंट वगळण्याचा फिल्टर (#8034).** चॅट कम्प्लिशन्ससाठी, ऑपरेटर अशी
मॉडेल ids / `provider/model` लक्ष्ये नमूद करू शकतो ज्यांना कधीही कॉम्प्रेस केले जाऊ नये — भविष्यात
कॉम्प्रेशन एम्बेडिंग्ज-समीप पाथच्या अधिक जवळ जोडले गेले, तर उपयुक्त ठरणारे हे एक संरक्षण आहे; तसेच
ज्या कोणत्याही मॉडेलसाठी बाइट-टू-बाइट तंतोतंत प्रॉम्प्ट महत्त्वाचा आहे (निश्चयात्मक मूल्यमापन,
कॅश-संवेदनशील प्रिफिक्सेस इ.) त्यासाठीही हे सर्वसाधारणपणे उपयुक्त आहे.

- सेटिंग्ज फील्ड: जागतिक कॉम्प्रेशन कॉन्फिगवरील `exclusions?: string[]`
  (`GET`/`PUT /api/settings/compression`), विद्यमान `key_value` कॉम्प्रेशन
  नेमस्पेसद्वारे (`src/lib/db/compression.ts`) कायमस्वरूपी साठवले जाते — कोणतेही नवीन टेबल नाही.
- डॅशबोर्ड टॅब: **Dashboard → Compression → Exclusions**
  (`/dashboard/compression/exclusions`).
- पॅटर्न सिंटॅक्स: `*` हे एकमेव वाइल्डकार्ड आहे. पॅटर्नमधील प्रत्येक इतर regex मेटाकॅरेक्टर
  जुळवणीपूर्वी एस्केप केला जातो, त्यामुळे `gpt-5.6` फक्त लिटरल स्ट्रिंगशी जुळते, `gpt-5x6` शी
  कधीही नाही (ReDoS-सुरक्षित, मर्यादित, नेस्टेड क्वांटिफायर्स नाहीत). पॅटर्न्स केस-इनसेन्सिटिव्ह
  पद्धतीने स्वतंत्र मॉडेल id आणि `provider/model` संमिश्र मूल्य या दोन्हींशी जुळवले जातात —
  `gpt-5-6`, `openai/gpt-5-6` आणि `openai/*` हे सर्व कार्य करतात, तसेच फक्त `*` वापरल्यास
  प्रत्येक मॉडेल वगळले जाते.
- जुळवणी: `open-sse/services/compression/exclusions.ts` मधील `isCompressionExcluded()` /
  `normalizeCompressionExclusions()`. `chatCore.ts` कॉम्प्रेशन सेटिंग्ज रिझॉल्व्ह केल्यानंतर लगेच,
  **कोणतेही इंजिन चालण्यापूर्वी**, वगळलेले लक्ष्य तपासते आणि जुळवणी झाल्यास जागतिक पातळीवर
  कॉम्प्रेशन अक्षम असल्याप्रमाणेच वागते — विनंती बॉडी सिद्ध करता येईल अशा प्रकारे
  बाइट-आयडेंटिकल राहते. अॅनालिटिक्स दृश्यमानतेसाठी स्किपची नोंद
  `writeCompressionSkip(..., "excluded")` द्वारे केली जाते.
- डीफॉल्ट (रिकामी/अनुपस्थित यादी): #8034-पूर्वीच्या वर्तनासारखेच — काहीही वगळले जात नाही.

## ज्ञात मर्यादा

- **LLMLingua-2 (SLM) साठी पर्यायी अवलंबने एकाच ठिकाणी असणे आवश्यक आहे.** `@atjsh/llmlingua-2` + त्याची peer अवलंबने
  `dist/node_modules` मध्ये एकत्र ठेवली असतील, तरच worker
  production build मध्ये चालतो (`scripts/build/colocateOptionals.mjs`, #4286 पाहा). ती नसल्यास
  engine अपयशाच्या वेळी मूळ मजकूर परत करतो. Worker resolution आता
  `import.meta.url` वर अवलंबून नाही (standalone bundle मध्ये ते अयशस्वी होते) — त्याऐवजी ते runtime
  cwd / `argv[1]` चा आधार घेते.
- **Caveman चे `de` / `fr` / `ja` language packs अपूर्ण आहेत.** त्यांच्यासोबत `context` +
  `filler` + `structural` नियम दिलेले असतात, परंतु `dedup` / `ultra` packs नसतात, त्यामुळे त्या
  भाषांसाठी `ultra` intensity ही `full` पेक्षा अधिक प्रभावी नसते (ते फक्त स्वतःचेच नियम वापरतात —
  English मधील `dedup`/`ultra` नियमांकडे कोणतेही मूक fall-back केले जात नाही, कारण त्यामुळे परभाषेतील
  मजकूर बिघडू शकतो). `en` / `es` / `id` / `pt-BR` पूर्ण आहेत. अपूर्ण packs साठी
  `dedup.json` + `ultra.json` चे योगदान स्वागतार्ह आहे.
- **Stacked telemetry मध्ये फक्त compression केलेले engines सूचीबद्ध होतात.** ज्या
  stacked-pipeline टप्प्याचा engine चालला, परंतु 0 % बचत झाली, तो `stats:null` परत करतो आणि त्यामुळे
  `engineBreakdown` मध्ये दिसत नाही — त्यामुळे तो वगळलेल्या टप्प्यापासून वेगळा ओळखता येत नाही.
  "चालला, 0 %" आणि "वगळला" यांतील फरक ओळखण्यासाठी breakdown-model मध्ये बदल करावा लागेल आणि तो
  पुढे ढकलण्यात आला आहे.

## पडताळणी

या क्षेत्रासाठीचे केंद्रित तपासणी टप्पे पुढीलप्रमाणे आहेत:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-*.test.ts tests/unit/compression/pipeline-integration.test.ts tests/unit/compression/context-compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/*.test.ts tests/golden-set/*.test.ts tests/integration/compression-pipeline.test.ts tests/unit/api/compression/compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/mcpAccessibility*.test.ts
npm run typecheck:core
```
