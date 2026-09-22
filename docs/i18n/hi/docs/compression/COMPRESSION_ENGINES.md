# Compression Engines (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_ENGINES.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_ENGINES.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_ENGINES.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_ENGINES.md)

---

OmniRoute संपीड़न इंजन अनुबंधों पर आधारित है। कोई मोड सीधे एक इंजन
(`caveman` या `rtk`) चला सकता है या एक नियतात्मक स्टैक्ड पाइपलाइन चला सकता है, जो क्रम से कई इंजनों को निष्पादित करती है।

## मोड

| मोड          | इंजन पथ                             | लक्षित इनपुट                               |
| ------------ | ----------------------------------- | ------------------------------------------ |
| `off`        | कोई नहीं                            | प्रॉम्प्ट का यथावत संरक्षण                 |
| `lite`       | Caveman lite सहायक                  | कम-जोखिम वाला हमेशा-सक्रिय क्लीनअप         |
| `standard`   | Caveman                             | प्राकृतिक-भाषा प्रॉम्प्ट का संक्षेपण       |
| `aggressive` | Caveman + इतिहास/टूल सारांशकर्ता    | लंबे चैट सत्र                              |
| `ultra`      | Caveman + प्रूनिंग सहायक            | संदर्भ-सीमा से पुनर्प्राप्ति               |
| `rtk`        | RTK                                 | टर्मिनल, शेल, बिल्ड, परीक्षण और git आउटपुट |
| `omniglyph`  | OmniGlyph                           | मूल प्रदाता वायर पर छवि के रूप में संदर्भ  |
| `stacked`    | पाइपलाइन, डिफ़ॉल्ट `rtk -> caveman` | मिश्रित टूल लॉग और गद्य, अधिकतम बचत        |

### OmniGlyph संपीड़न प्रोफ़ाइल

`omniglyph` इंजन (पैकेज `omniglyph`, 1.4.0+) एक नामित सिमेंटिक प्रोफ़ाइल स्वीकार करता है, जिसे
संपीड़न सेटिंग्स में `omniglyph.profile` के माध्यम से वैश्विक रूप से या स्टैक्ड पाइपलाइन के चरण कॉन्फ़िगरेशन के माध्यम से प्रत्येक चरण के लिए सेट किया जाता है:

| प्रोफ़ाइल     | सीमा                                                                                                      |
| ------------- | --------------------------------------------------------------------------------------------------------- |
| `aggressive`  | डिफ़ॉल्ट। प्रकाशित रसीदों द्वारा मापी गई नीति — सिस्टम, टूल दस्तावेज़ों और सघन इतिहास की छवियाँ बनाती है  |
| `balanced`    | लाइव स्थिति को मूल रूप में रखती है, अंतिम 8 टर्न सुरक्षित करती है, पुराने बंद इतिहास को संक्षिप्त करती है |
| `coding-safe` | प्राधिकार, टूल स्कीमा और लाइव टूल आउटपुट को मूल रूप में रखती है, अंतिम 12 टर्न सुरक्षित करती है           |
| `passthrough` | रूपांतरण किए बिना रूट करती है; इंजन को छोड़ दिया जाता है                                                  |

प्रोफ़ाइल एक **अधिकतम सीमा है, न्यूनतम सीमा नहीं**: पैकेज में `mergeCompressionProfileOptions`
कॉल करने वाले के ओवरराइड को प्रोफ़ाइल द्वारा बंद की गई हानिपूर्ण लेन को फिर से खोलने की अनुमति नहीं देता, इसलिए प्रत्येक चरण का
`preserveSystemPrompt: false`, `coding-safe` के अंतर्गत सिस्टम संपीड़न को फिर से सक्षम नहीं कर सकता।

इस कोडबेस पर किए गए मापन में: `coding-safe` और `balanced`, `minCompressChars` को उसके
अधिकतम मान तक बढ़ाते हैं और सिस्टम, टूल स्कीमा तथा टूल परिणामों को मूल रूप में रखते हैं, इसलिए जिस सत्र में
अभी तक इतिहास संचित नहीं हुआ है, वह `below_min_chars` पर रुक जाता है और इंजन कुछ भी रूपांतरित नहीं करता। यही
कारण है कि डिफ़ॉल्ट सबसे सुरक्षित प्रोफ़ाइल के बजाय `aggressive` है।

पैकेज अपने पर्यावरण कॉन्फ़िगरेशन से स्वयं अपना मॉडल दायरा और प्रोफ़ाइल निर्धारित करता है।
OmniRoute यह निर्णय कभी प्रत्यायोजित नहीं करता: अडैप्टर मॉडल गेट को पैकेज के
सबसे प्रतिबंधात्मक दायरे पर स्थिर करता है, इसलिए होस्ट पर्यावरण सेटिंग्स अनुमति-सूची को केवल संकीर्ण कर सकती हैं, उसे
OmniRoute की मापी गई रसीदों से आगे कभी विस्तृत नहीं कर सकतीं।

## इंजन रजिस्ट्री

रजिस्ट्री `open-sse/services/compression/engines/registry.ts` में स्थित है। इंजन एक साझा
कॉन्ट्रैक्ट प्रस्तुत करते हैं:

- `id`: स्थिर इंजन आईडी, जैसे `caveman` या `rtk`
- `apply(text, config)`: स्टैक्ड पाइपलाइनों द्वारा उपयोग किया जाने वाला लीगेसी निष्पादन पथ
- `compress(input, config)`: टेक्स्ट + आँकड़े लौटाने वाला प्राथमिक निष्पादन पथ
- `getConfigSchema()`: मान्य कॉन्फ़िगरेशन की JSON-Schema-जैसी संरचना लौटाता है
- `validateConfig(config)`: `{ valid, errors[] }` लौटाता है

पंजीकरण में `registerCompressionEngine(engine)` (या उन्नत मामलों के लिए `registerEngine`) का उपयोग होता है,
जो स्वीकार करने से पहले `assertValidEngine()` और `validateConfig(defaultConfig)` को कॉल करता है।
रनटाइम पर किसी इंजन को हटाने के लिए `unregisterCompressionEngine(id)` का उपयोग करें।

कम्प्रेशन चलने से पहले `strategySelector.ts` बिल्ट-इन इंजनों को पंजीकृत करता है। इससे प्रीव्यू,
रनटाइम कम्प्रेशन, स्टैक्ड मोड, परीक्षण और भविष्य के इंजन समान निष्पादन पथ का उपयोग कर सकते हैं।

### MCP विवरण कम्प्रेशन (संबंधित)

एक अलग रजिस्ट्री, रजिस्ट्री-स्तर पर MCP टूल विवरण मेटाडेटा को कम्प्रेस करती है — देखें
`open-sse/mcp-server/descriptionCompressor.ts` और [MCP-SERVER.md](../frameworks/MCP-SERVER.md)। यह
Caveman नियमों का पुनः उपयोग करती है, लेकिन अनुरोध पेलोड के बजाय टूल मेटाडेटा पर काम करती है।

### अतिरिक्त बिल्ट-इन इंजन

Caveman, RTK और LLMLingua-2 के अतिरिक्त, रजिस्ट्री कई विशिष्ट लॉसलेस /
स्ट्रक्चरल इंजनों के साथ आती है (जिनका उपयोग स्टैक्ड पाइपलाइनों, प्लेग्राउंड और परीक्षणों द्वारा किया जाता है):

| इंजन          | आईडी            | यह क्या करता है                                                                                                                                                                       |
| ------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CCR           | `ccr`           | Content-Compress-Retrieve (H4): बड़े संलग्न टेक्स्ट ब्लॉकों को कंटेंट-एड्रेस्ड संदर्भों से बदलता है, ताकि दोहराए गए/बड़े ब्लॉक एक बार भेजे जाएँ और उसके बाद उन्हें संदर्भित किया जाए। |
| headroom      | `headroom`      | SmartCrusher (H3 + N5): समरूप JSON-array पेलोड का कॉलमनार `[N rows]` रूप में लॉसलेस सारणीबद्ध संघनन।                                                                                  |
| ionizer       | `ionizer`       | बहुत बड़े समरूप ब्लॉकों के लिए आरंभिक/मध्य/अंतिम पंक्ति सैंपलिंग, जिसमें हटाए गए मध्य भाग को CCR कंटेंट-एड्रेस्ड संदर्भ के रूप में संग्रहीत किया जाता है।                             |
| session-dedup | `session-dedup` | कंटेंट-एड्रेस्ड क्रॉस-टर्न डीडुप्लिकेशन (TokenMizer से प्रेरित): उसी सत्र के पिछले टर्न में पहले से देखे गए टेक्स्ट को हटा देता है।                                                   |

**CCR पुनर्प्राप्ति-प्रोटोकॉल निर्देश (#8033):** पहली बार जब CCR किसी
अनुरोध में ≥1 ब्लॉक को बदलता है, तो इंजन एक एकल, आइडेम्पोटेंट `system` संदेश शुरुआत में जोड़ता है (जो
`[CCR protocol]` सेंटिनल से शुरू होता है), ताकि कॉलर को मार्कर → टूल कॉन्ट्रैक्ट समझाया जा सके: एक
`[CCR retrieve hash=<24hex> chars=N]` मार्कर का क्या अर्थ है, हैश को शब्दशः कॉपी करना अनिवार्य है
(सभी 24 हेक्स वर्ण — गलत कॉपी किए गए हैश संभवतः "block not found"
त्रुटियों का कारण हैं), और `[dedup:ref sha=...]` मार्कर का अर्थ "इतिहास में पीछे देखें" है, न कि "टूल को
कॉल करें"। यह नोट **केवल तभी इंजेक्ट किया जाता है, जब कॉलर के घोषित `tools[]` से प्रमाणित हो कि वह
वास्तव में `omniroute_ccr_retrieve` तक पहुँच सकता है** (`callerSupportsCcrRetrieve()` को
`open-sse/services/compression/engines/ccr/protocolInstruction.ts` में देखें) — उस टूल के बिना एक सामान्य
OpenAI-संगत कॉलर को किसी ऐसी चीज़ को कॉल करने का निर्देश कभी नहीं मिलता, जिस तक वह पहुँच ही नहीं
सकता। इंजेक्ट करने से पहले संदेश इतिहास में सेंटिनल को स्कैन करके आइडेम्पोटेंसी लागू की जाती है,
ताकि मल्टी-टर्न अनुरोध (जो पिछले संदेशों को पुनः चलाते हैं) प्रत्येक टर्न पर नोट को बार-बार न जोड़ें।

## Caveman

Caveman मोड सामान्य गद्य के अर्थगत संक्षेपण पर केंद्रित है:

- कोड ब्लॉक, URLs, JSON, पाथ और संरचित डेटा को सुरक्षित रखता है
- अनावश्यक सामग्री, अनिश्चितता दर्शाने वाले शब्द, दोहराया गया संदर्भ और अत्यधिक विस्तृत संयोजक वाक्यांश हटाता है
- `open-sse/services/compression/rules/` में भाषा-जागरूक फ़ाइल नियम पैक का समर्थन करता है
- पुराने `standard`, `aggressive` और `ultra` मोड के माध्यम से उपलब्ध रहता है

डैशबोर्ड में इसका स्थान `Dashboard -> Context & Cache -> Caveman` है।

Caveman अपस्ट्रीम लगभग `~75%` कम आउटपुट टोकन, बेंचमार्क में औसतन `65%` आउटपुट बचत
(`22-87%` सीमा के साथ) और एक `~46%` इनपुट-संपीड़न टूल की रिपोर्ट करता है। OmniRoute संयुक्त प्रॉम्प्ट/कॉन्टेक्स्ट बचत का दस्तावेज़ीकरण करते समय Caveman के इनपुट-साइड
आँकड़े का उपयोग करता है; Caveman आउटपुट मोड एक अलग
प्रतिक्रिया-व्यवहार सुविधा बना रहता है।

## RTK

RTK मोड कमांड और टूल आउटपुट पर केंद्रित है:

- `git status`, `git branch`, `git diff`, Vitest/Jest/Pytest,
  Cargo/Go परीक्षण, TypeScript/Vite/Webpack बिल्ड, ESLint, npm ऑडिट/इंस्टॉल, Docker लॉग,
  शेल `find`/`grep`, स्टैक ट्रेस और सामान्य लॉग जैसे आउटपुट वर्गों का पता लगाता है
- `open-sse/services/compression/engines/rtk/filters/` से 49 JSON फ़िल्टर लागू करता है
- RTK-शैली की घोषणात्मक पाइपलाइन का समर्थन करता है: ANSI हटाना, प्रतिस्थापन, match-output शॉर्ट-सर्किट,
  पंक्तियाँ हटाना/रखना, प्रति-पंक्ति ट्रंकेशन, head/tail/max-line ट्रंकेशन और खाली होने पर फ़ॉलबैक
- `.rtk/filters.json` में विश्वास-नियंत्रित प्रोजेक्ट फ़िल्टर और
  `DATA_DIR/rtk/filters.json` में वैश्विक फ़िल्टर का समर्थन करता है
- ANSI अनुक्रम, प्रगति संबंधी शोर, दोहराई गई पंक्तियाँ और अनुपयोगी मानक सामग्री हटाता है
- कार्रवाई योग्य विफलताओं, चेतावनियों, सारांशों, बदली गई फ़ाइलों और अंतिम संदर्भ को सुरक्षित रखता है
- प्रमाणीकृत प्रबंधन रूटों के माध्यम से पुनर्प्राप्ति/डीबगिंग के लिए वैकल्पिक रूप से संपादित कच्चे आउटपुट को बनाए रख सकता है

डैशबोर्ड में इसका स्थान `Dashboard -> Context & Cache -> RTK` है।

कस्टम फ़िल्टर, विश्वास, सत्यापन और कच्चे-आउटपुट की पुनर्प्राप्ति से संबंधित परिचालन विवरण
[`RTK_COMPRESSION.md`](./RTK_COMPRESSION.md) में उपलब्ध हैं।

RTK अपस्ट्रीम कमांड-आउटपुट संपीड़न के लिए `60-90%` बचत की रिपोर्ट करता है। इसके README उदाहरण में
30 मिनट का Claude Code सत्र `~118,000` टोकन से घटकर `~23,900` टोकन हो जाता है, अर्थात `79.7%` बचत।

## LLMLingua-2 (अर्थगत छँटाई)

LLMLingua-2 मोड एक छोटे ONNX टोकन
वर्गीकारक का उपयोग करके गद्य पर **अर्थगत टोकन छँटाई** करता है और नियम-आधारित Caveman तथा RTK इंजनों का पूरक बनता है:

- केवल गैर-सिस्टम संदेशों के गद्य को संपीड़ित करता है; फ़ेंस किए गए कोड ब्लॉक और अन्य संरक्षित
  संरचनाएँ कभी नहीं बदली जातीं
- एक वर्कर थ्रेड में `@atjsh/llmlingua-2` बैकएंड (`@huggingface/transformers` के माध्यम से ONNX) चलाता है,
  इसलिए मॉडल अनुमान कभी भी अनुरोध इवेंट लूप को अवरुद्ध नहीं करता
- **स्टैक किया जा सकता है** (`stackPriority` 35): स्टैक्ड पाइपलाइन में यह
  संरचनात्मक इंजनों (CCR, session-dedup, headroom, Caveman) के बाद, लेकिन `ultra` से पहले चलता है, क्योंकि
  अर्थगत छँटाई पहले से संरचनात्मक रूप से संपीड़ित टेक्स्ट पर सर्वाधिक प्रभावी होती है — उदाहरण के लिए
  `rtk -> caveman -> llmlingua`
- **किसी भी त्रुटि पर विफलता को अनदेखा करता है** (वैकल्पिक निर्भरताएँ न मिलना, वर्कर आरंभ होना, मॉडल लोड होना, अनुमान
  या टाइमआउट) → मूल टेक्स्ट बिना किसी बदलाव के लौटाया जाता है, त्रुटि कभी नहीं

इंजन का स्थान: `open-sse/services/compression/engines/llmlingua/`। डैशबोर्ड में इसका स्थान
`Dashboard -> Context & Cache -> LLMLingua` है।

### मॉडल

डिफ़ॉल्ट मॉडल **TinyBERT** (`atjsh/llmlingua-2-js-tinybert-meetingbank`, ~57 MB,
तेज़) है। अधिक सटीकता वाला **BERT-base** मॉडल (`Arcoldd/llmlingua4j-bert-base-onnx`,
~710 MB) इंजन कॉन्फ़िगरेशन के `model` फ़ील्ड के माध्यम से उपलब्ध है। `@huggingface/transformers`
पहली कॉल पर चयनित मॉडल को HuggingFace Hub से
`${DATA_DIR}/models/llmlingua` में लेज़ी तरीके से डाउनलोड करता है (`modelStore.ts`); इसके बजाय `modelPath` कॉन्फ़िगरेशन
ओवरराइड इसे स्थानीय प्रति की ओर इंगित करता है (ऑफ़लाइन / एयर-गैप्ड इंस्टॉलेशन)।

### वैकल्पिक निर्भरताएँ और माँग पर इंस्टॉलेशन

छँटाई योग्य LLMLingua रनटाइम पीयर स्टैक **वैकल्पिक** है। दो पैकेज
`package.json` में `optionalDependencies` के रूप में घोषित हैं और प्रोडक्शन बिल्ड द्वारा **बाहरी** रखे जाते हैं
(`scripts/build/prepublish.ts` उन्हें बंडल नहीं करता):

| पैकेज                | संस्करण (पिन) | टिप्पणियाँ                                          |
| -------------------- | ------------- | --------------------------------------------------- |
| `@atjsh/llmlingua-2` | `2.0.5`       | प्रवेश पैकेज; अन्य को पीयर के रूप में घोषित करता है |
| `js-tiktoken`        | `^1.0.20`     | टोकनाइज़र                                           |

`@huggingface/transformers` को `^4.2.0` पर पिन किया गया है (इसे स्थानीय एम्बेडिंग पाथ के साथ साझा किया जाता है और
स्टैंडअलोन बंडल में भी ट्रेस किया जाता है); `@atjsh/llmlingua-2@2.0.5` इसके साथ
`"^3.5.2 || ^4.0.0"` के माध्यम से पीयर करता है, इसलिए Transformers.js v3 और v4 दोनों समर्थित हैं। 2.0.4 से,
`@atjsh/llmlingua-2` को अब `@tensorflow/tfjs` की आवश्यकता नहीं है, जिससे SLM स्टैक में सबसे बड़ा एकल
योगदानकर्ता (TensorFlow.js) हट गया। केवल ऊपर दिए गए दो पैकेज ही छँटाई योग्य SLM
पीयर हैं। मानक `npm install` (डेवलपमेंट) वैकल्पिक स्टैक को स्वतः इंस्टॉल करता है, बशर्ते वैकल्पिक
निर्भरताएँ छोड़ी न गई हों।

**माँग पर क्यों:** npm पर प्रकाशित पैकेज, स्टैंडअलोन बंडल और Docker इमेज को
छोटा रखने के लिए इन निर्भरताओं के **बिना** वितरित किया जाता है। इनके अनुपस्थित होने पर वर्कर का निर्भरता
गेट (`worker.ts` में एक `@atjsh/llmlingua-2` रिज़ॉल्व जाँच) विफल हो जाता है और इंजन
**चुपचाप विफलता को अनदेखा करता है** — LLMLingua चुनने पर कोई कार्रवाई नहीं होती (टेक्स्ट बिना बदलाव के लौटाया जाता है और कोई
त्रुटि लॉग नहीं होती)। छँटाई किए गए परिवेश में इसे सक्रिय करने के लिए वैकल्पिक स्टैक इंस्टॉल करें:

```bash
# package.json optionalDependencies में घोषित संस्करणों पर पिन करें
npm install @atjsh/llmlingua-2@2.0.5 js-tiktoken
```

`@tensorflow/tfjs` को हटाने (2.0.4+) से पहले का प्रमुख ~800 MB
योगदानकर्ता समाप्त हो जाता है — शेष फ़ुटप्रिंट में transformers.js + onnxruntime-node रनटाइम
और पहली बार उपयोग के समय डाउनलोड होने वाला TinyBERT मॉडल (~57 MB) शामिल हैं (npm के माध्यम से नहीं)।

प्रति परिवेश:

- **Dev / `npm install`** — स्वचालित रूप से इंस्टॉल हो जाता है, जब तक कि आपने `--omit=optional`
  (या `--no-optional`) पास न किया हो। किसी कार्रवाई की आवश्यकता नहीं है।
- **Global npm (`npm i -g omniroute`) / standalone** — इंस्टॉल किए गए पैकेज की डायरेक्टरी के अंदर
  ऊपर दिया गया इंस्टॉल कमांड चलाएँ, या वैकल्पिक निर्भरताओं को छोड़े बिना दोबारा इंस्टॉल करें।
- **Docker** — व्युत्पन्न इमेज लेयर में इंस्टॉल कमांड जोड़ें; प्रकाशित इमेज को
  जानबूझकर हल्का रखा गया है।
- **VPS (PM2)** — ऐप के `node_modules` में इंस्टॉल करें, फिर प्रोसेस को रीस्टार्ट करें ताकि
  वर्कर गेट की दोबारा जाँच कर सके।
- **Raw Next standalone (`npm run build` → `.build/next/standalone/server.js`)** — इस
  स्टैंडअलोन ट्रेस में न तो वर्कर और न ही वैकल्पिक निर्भरताएँ शामिल होती हैं, इसलिए इंजन बिना सूचना के
  फ़ेल-ओपन हो जाता है। `scripts/build/colocate-standalone.mjs` दोनों को फिर से लागू करता है (वर्कर esbuild +
  वैकल्पिक निर्भरता क्लोज़र को स्टैंडअलोन ट्री में); यह प्रत्येक बिल्ड के बाद
  `postbuild` npm हुक के माध्यम से स्वचालित रूप से चलता है। यह आइडेम्पोटेंट है और निर्भरताएँ अनुपस्थित होने पर फ़ेल-सॉफ़्ट होता है।

**सत्यापित करें कि यह सक्रिय है:** LLMLingua चयनित होने पर वास्तविक गद्य सचमुच संक्षिप्त हो जाता है (इंजन
फ़ेल-ओपन होना बंद कर देता है), और पहला अनुरोध मॉडल को
`${DATA_DIR}/models/llmlingua` में डाउनलोड करता है। गेट जानबूझकर केवल `@atjsh/llmlingua-2` की जाँच करता है —
अन्य पीयर केवल ESM हैं और मौजूद होने पर भी `require.resolve` उन पर त्रुटि देता है — इसलिए
यदि `import()` के समय कोई पीयर वास्तव में अनुपस्थित हो, तो वर्कर फिर भी फ़ेल-ओपन हो जाता है।

## स्टैक्ड पाइपलाइन

स्टैक्ड मोड पाइपलाइन चरणों को क्रम से चलाता है। डिफ़ॉल्ट है:

```txt
rtk -> caveman
```

इसे उन कोडिंग-एजेंट सत्रों के लिए उपयोग करें जहाँ कोई प्रॉम्प्ट कमांड आउटपुट को मानव या सहायक के
गद्य के साथ संयोजित करता है। RTK पहले शोरयुक्त टूल लॉग कम करता है, फिर Caveman शेष प्राकृतिक भाषा को संपीड़ित करता है।

पाइपलाइन चरणों को संपीड़न सेटिंग्स में `stackedPipeline` से या संपीड़न
कॉम्बो के माध्यम से कॉन्फ़िगर किया जाता है।

जब दोनों इंजन एक ही योग्य पेलोड को कम करते हैं, तो बचत चक्रवृद्धि होती है:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## MCP एक्सेसिबिलिटी ट्री फ़िल्टर

MCP एक्सेसिबिलिटी-ट्री स्मार्ट फ़िल्टर निष्पादन के बाद की एक संपीड़न परत है, जो MCP
**टूल परिणामों** पर चलती है, प्रॉम्प्ट या कॉन्टेक्स्ट पर नहीं। यह Playwright, computer-use और browser-automation MCP
सर्वर जैसे टूल द्वारा लौटाए गए विस्तृत एक्सेसिबिलिटी-ट्री और ब्राउज़र
स्नैपशॉट पेलोड को लक्षित करती है।

### यह क्या करता है

1. **शोर हटाना** — खाली generic/text प्रविष्टियाँ (`- generic:`, `- text: ""`) हटाता है
2. **सिबलिंग संक्षिप्तीकरण** — जब ≥ `collapseThreshold` (डिफ़ॉल्ट 30) लगातार पंक्तियाँ संरचनात्मक
   दोहराव हों, तो उन्हें पहली `collapseKeepHead` (डिफ़ॉल्ट 10) पंक्तियों + संख्या सारांश +
   अंतिम `collapseKeepTail` (डिफ़ॉल्ट 5) पंक्तियों में संक्षिप्त कर देता है
3. **रेफ़ संरक्षण** — Playwright/computer-use के लिए आवश्यक `[ref=eXX]` एंकर को कभी नहीं छुआ जाता
4. **हार्ड ट्रंकेशन** — यदि संक्षिप्तीकरण के बाद भी टेक्स्ट `maxTextChars` (डिफ़ॉल्ट 50,000) से अधिक हो,
   तो उसे नेविगेशन संकेत के साथ ट्रंकेट करता है, ताकि एजेंट काम जारी रख सके

### इंजन का स्थान

```txt
open-sse/services/compression/engines/mcpAccessibility/
  index.ts            ← smartFilterText() प्रवेश बिंदु
  collapseRepeated.ts ← सिबलिंग-संक्षिप्तीकरण एल्गोरिदम
  constants.ts        ← DEFAULT_MCP_ACCESSIBILITY_CONFIG
```

### कॉन्फ़िगरेशन

ग्लोबल सेटिंग्स (माइग्रेशन 056) में `compression.mcpAccessibility` द्वारा नियंत्रित। डिफ़ॉल्ट कॉन्फ़िगरेशन:

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

फ़िल्टर केवल उन टूल-रिज़ल्ट पेलोड पर लागू होता है जिनका `type` `"text"` है और जिनकी लंबाई
`minLengthToProcess` से अधिक है। यह प्रॉम्प्ट संपीड़न या अनुरोध पेलोड को प्रभावित नहीं करता।

### अपेक्षित बचत

पेज की जटिलता के आधार पर, ब्राउज़र स्नैपशॉट टूल परिणामों पर 60–80%। संक्षिप्तीकरण एल्गोरिदम
पंक्तियों की संख्या के संदर्भ में O(n) है और नगण्य विलंबता जोड़ता है।

### यह फ़िल्टर बनाम ऊपर दिए गए संपीड़न इंजन

| पहलू      | Caveman / RTK / Stacked        | MCP एक्सेसिबिलिटी फ़िल्टर              |
| --------- | ------------------------------ | -------------------------------------- |
| लक्ष्य    | अनुरोध प्रॉम्प्ट / कॉन्टेक्स्ट | MCP टूल परिणाम                         |
| ट्रिगर    | संपीड़न मोड सेटिंग             | `compression.mcpAccessibility.enabled` |
| दायरा     | सभी SSE संदेश                  | केवल टूल परिणाम                        |
| रेफ़ एंकर | लागू नहीं                      | बिना किसी शर्त के संरक्षित             |

---

## कम्प्रेशन कॉम्बो

कम्प्रेशन कॉम्बो नामित कम्प्रेशन प्रोफ़ाइल हैं, जिन्हें रूटिंग कॉम्बो को असाइन किया जा सकता है:

- `compression_combos`: मोड, पाइपलाइन, RTK कॉन्फ़िगरेशन, भाषा कॉन्फ़िगरेशन और डिफ़ॉल्ट मार्कर संग्रहीत करता है
- `compression_combo_assignments`: किसी कम्प्रेशन कॉम्बो को रूटिंग कॉम्बो से मैप करता है
- रनटाइम इंटीग्रेशन सामान्य कॉम्बो ओवरराइड से पहले असाइन किए गए कम्प्रेशन कॉम्बो को रिज़ॉल्व करता है
- एनालिटिक्स में `compression_combo_id` और `engine` शामिल होते हैं

डैशबोर्ड स्थान: `Dashboard -> Context & Cache -> Compression Combos`।

## API इंटरफ़ेस

| रूट                                    | उद्देश्य                                                          |
| -------------------------------------- | ----------------------------------------------------------------- |
| `/api/settings/compression`            | वैश्विक कम्प्रेशन सेटिंग्स (`mcpAccessibility` कॉन्फ़िगरेशन सहित) |
| `/api/compression/preview`             | किसी भी कम्प्रेशन मोड का पूर्वावलोकन                              |
| `/api/compression/language-packs`      | उपलब्ध Caveman भाषा पैक सूचीबद्ध करना                             |
| `/api/context/caveman/config`          | Caveman सेटिंग्स का उपनाम                                         |
| `/api/context/rtk/config`              | RTK डिफ़ॉल्ट और सेटिंग्स                                          |
| `/api/context/rtk/filters`             | RTK फ़िल्टर कैटलॉग                                                |
| `/api/context/rtk/test`                | RTK पूर्वावलोकन/परीक्षण एंडपॉइंट                                  |
| `/api/context/rtk/raw-output/[id]`     | प्रमाणीकृत, संशोधित रॉ-आउटपुट पुनर्प्राप्ति                       |
| `/api/context/combos`                  | कम्प्रेशन कॉम्बो CRUD                                             |
| `/api/context/combos/[id]/assignments` | रूटिंग-कॉम्बो असाइनमेंट CRUD                                      |
| `/api/context/analytics`               | कम्प्रेशन एनालिटिक्स का उपनाम                                     |

प्रबंधन रूट के लिए प्रबंधन प्रमाणीकरण या API-कुंजी नीति जाँच आवश्यक है।

## MCP टूल

कम्प्रेशन पाँच MCP टूल उपलब्ध कराता है:

| टूल                                 | स्कोप               | उद्देश्य                          |
| ----------------------------------- | ------------------- | --------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | सेटिंग्स, एनालिटिक्स, कैश आँकड़े  |
| `omniroute_compression_configure`   | `write:compression` | वैश्विक सेटिंग्स अपडेट करना       |
| `omniroute_set_compression_engine`  | `write:compression` | मोड और वैकल्पिक पाइपलाइन सेट करना |
| `omniroute_list_compression_combos` | `read:compression`  | कम्प्रेशन कॉम्बो सूचीबद्ध करना    |
| `omniroute_compression_combo_stats` | `read:compression`  | कॉम्बो/इंजन एनालिटिक्स पढ़ना      |

## दायरा और अपवर्जन

**एम्बेडिंग्स को कभी कम्प्रेस नहीं किया जाता।** `open-sse/handlers/embeddings.ts` कभी भी किसी
कम्प्रेशन इंजन को कॉल नहीं करता — अनुरोध/प्रतिक्रिया बॉडी बिना किसी बदलाव के सीधे एक्ज़ीक्यूटर
तक पहुँचती हैं। वर्तमान में यह संरचनात्मक है (एम्बेडिंग्स और चैट कम्प्लीशन अलग-अलग हैंडलर हैं),
रनटाइम जाँच नहीं, लेकिन इसका अर्थ है कि #8034 में वेक्टर-विरूपण संबंधी चिंता के लिए एम्बेडिंग्स
पथ में कोई एक्सपोज़र सतह नहीं है।

**प्रति-मॉडल/एंडपॉइंट अपवर्जन फ़िल्टर (#8034)।** चैट कम्प्लीशन के लिए, ऑपरेटर उन मॉडल आईडी /
`provider/model` लक्ष्यों को निर्दिष्ट कर सकता है जिन्हें कभी कम्प्रेस नहीं किया जाना चाहिए — यह
एक उपयोगी सुरक्षा-व्यवस्था है, यदि भविष्य में कम्प्रेशन को एम्बेडिंग्स से जुड़े किसी पथ के अधिक
निकट जोड़ा जाता है, और सामान्यतः ऐसे किसी भी मॉडल के लिए उपयोगी है जिसके प्रॉम्प्ट का सटीक
बाइट-दर-बाइट रूप मायने रखता है (नियतात्मक मूल्यांकन, कैश-संवेदनशील प्रीफ़िक्स आदि)।

- सेटिंग्स फ़ील्ड: वैश्विक कम्प्रेशन कॉन्फ़िगरेशन पर `exclusions?: string[]`
  (`GET`/`PUT /api/settings/compression`), जिसे मौजूदा `key_value` कम्प्रेशन नेमस्पेस
  (`src/lib/db/compression.ts`) के माध्यम से स्थायी किया जाता है — कोई नई तालिका नहीं।
- डैशबोर्ड टैब: **Dashboard → Compression → Exclusions**
  (`/dashboard/compression/exclusions`)।
- पैटर्न सिंटैक्स: `*` एकमात्र वाइल्डकार्ड है। पैटर्न में प्रत्येक अन्य रेगुलर एक्सप्रेशन
  मेटाकैरेक्टर को मिलान से पहले एस्केप किया जाता है, इसलिए `gpt-5.6` केवल शाब्दिक स्ट्रिंग से
  मेल खाता है, `gpt-5x6` से कभी नहीं (ReDoS-सुरक्षित, सीमित, कोई नेस्टेड क्वांटिफ़ायर नहीं)।
  पैटर्न केस की अनदेखी करते हुए मूल मॉडल आईडी और `provider/model` कम्पोज़िट, दोनों से मेल खाते
  हैं — `gpt-5-6`, `openai/gpt-5-6`, और `openai/*` सभी काम करते हैं, और अकेला `*` प्रत्येक
  मॉडल को अपवर्जित करता है।
- मिलान: `open-sse/services/compression/exclusions.ts` में `isCompressionExcluded()` /
  `normalizeCompressionExclusions()`। `chatCore.ts` कम्प्रेशन सेटिंग्स रिज़ॉल्व करने के तुरंत
  बाद, **किसी भी इंजन के चलने से पहले**, अपवर्जित लक्ष्य की जाँच करता है और मिलान को ठीक वैसे
  ही मानता है जैसे कम्प्रेशन वैश्विक रूप से अक्षम हो — अनुरोध बॉडी प्रमाणित रूप से बाइट-समान
  रहती है। एनालिटिक्स में दृश्यता के लिए स्किप को `writeCompressionSkip(..., "excluded")` के
  माध्यम से रिकॉर्ड किया जाता है।
- डिफ़ॉल्ट (खाली/अनुपस्थित सूची): #8034 से पहले के व्यवहार के समान — कुछ भी अपवर्जित नहीं होता।

## ज्ञात सीमाएँ

- **LLMLingua-2 (SLM) को एक ही स्थान पर मौजूद वैकल्पिक निर्भरताएँ चाहिए।** वर्कर
  production build में केवल तभी चलता है, जब `@atjsh/llmlingua-2` + उसकी peer निर्भरताएँ
  `dist/node_modules` में एक ही स्थान पर रखी गई हों (`scripts/build/colocateOptionals.mjs`,
  #4286 देखें)। इनके बिना इंजन fail-open होता है (मूल टेक्स्ट लौटाता है)। वर्कर रिज़ॉल्यूशन
  अब `import.meta.url` पर निर्भर नहीं है (यह standalone bundle में विफल हो जाता है) — यह
  runtime cwd / `argv[1]` को आधार बनाता है।
- **Caveman भाषा पैक `de` / `fr` / `ja` आंशिक हैं।** इनमें `context` + `filler` +
  `structural` नियम शामिल हैं, लेकिन `dedup` / `ultra` पैक नहीं हैं, इसलिए उन भाषाओं के लिए
  `ultra` तीव्रता `full` से अधिक प्रभावी नहीं है (वे केवल अपने नियमों का उपयोग करती हैं —
  English `dedup`/`ultra` नियमों पर कोई मौन fall-back नहीं होता, क्योंकि इससे विदेशी टेक्स्ट
  विकृत हो सकता है)। `en` / `es` / `id` / `pt-BR` पूर्ण हैं। आंशिक पैकों के लिए
  `dedup.json` + `ultra.json` के योगदानों का स्वागत है।
- **स्टैक्ड टेलीमेट्री केवल उन इंजनों को सूचीबद्ध करती है जिन्होंने संपीड़न किया।** स्टैक्ड-पाइपलाइन
  का ऐसा चरण, जिसका इंजन चला लेकिन 0 % बचत हुई, `stats:null` लौटाता है और इसलिए
  `engineBreakdown` में दिखाई नहीं देता — इसे छोड़े गए चरण से अलग नहीं पहचाना जा सकता।
  "चला, 0 %" और "छोड़ा गया" के बीच अंतर करने के लिए breakdown-model में बदलाव आवश्यक होगा
  और इसे स्थगित किया गया है।

## सत्यापन

इस क्षेत्र के लिए केंद्रित जाँचें हैं:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-*.test.ts tests/unit/compression/pipeline-integration.test.ts tests/unit/compression/context-compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/*.test.ts tests/golden-set/*.test.ts tests/integration/compression-pipeline.test.ts tests/unit/api/compression/compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/mcpAccessibility*.test.ts
npm run typecheck:core
```
