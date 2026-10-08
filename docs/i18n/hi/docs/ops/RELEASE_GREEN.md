# Release-Green: keeping the queue and release branch green (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

## यह जिस समस्या का समाधान करता है

**पूर्ण गेट** (`.github/workflows/ci.yml` — यूनिट शार्ड्स, vitest, रैचेट्स,
`package-artifact`, SonarQube, E2E) **केवल रिलीज़ PR** (PR → `main`) पर चलता है। `release/**`
को लक्षित करने वाले PR को **फ़ास्ट-गेट्स** (`quality.yml`: TIA-प्रभावित टेस्ट + टाइपचेक + लिंट)
और, कोड परिवर्तनों के लिए, एक **परामर्शात्मक** प्रोडक्शन बिल्ड मिलता है। परिणाम: केवल-रिलीज़ वाले रेड अभी भी
रिलीज़ ब्रांच पर चुपचाप जमा हो सकते हैं और रिलीज़ के समय **~40 मिनट की परतों में विस्फोट कर सकते हैं**,
एक बार में एक।

"release-green फ़ैमिली" उन रेड्स का **पूर्वानुमान लगाने** के लिए मौजूद है — पूर्ण गेट के समकक्ष सत्यापन
**स्थानीय रूप से / रिलीज़ के बाहर**, किसी भी समय करना, ताकि रिलीज़ PR अपने पहले CI रन में ही
ग्रीन हो।

> **अपरिवर्तनीय सिद्धांत:** इसमें से कुछ भी योगदानकर्ता को ब्लॉक नहीं करता। हम ऐसा कोई आवश्यक
> चेक नहीं जोड़ते जो उनके PR को विफल करे। **ड्रिफ्ट** (रैचेट्स) रिलीज़ के समय मेंटेनर द्वारा रीबेसलाइन करने के लिए है —
> यह कभी भी योगदानकर्ता की चिंता नहीं है। कोई भी हिस्सा किसी PR को **बंद** नहीं करता (श्रेय की चोरी) और न ही
> पास होने के लिए किसी टेस्ट को **कमज़ोर** करता है।

## फ़ैमिली (4 हिस्से) — और प्रत्येक स्वतंत्र रूप से कैसे चलता है

| हिस्सा                                                                   | यह क्या है                                                                                | कब चलाना है                                                                       | दायरा                          |
| ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | ------------------------------ |
| **`/green-prs`** (समाधान A)                                              | मेंटेनर द्वारा **खुले PR की कतार** का ऑन-डिमांड स्कैन                                     | **स्वतंत्र रूप से, समय-समय पर** — और विशेष रूप से `/generate-release` से **पहले** | संपूर्ण PR कतार → `release/**` |
| **`/validate-release-green`** (समाधान C — `npm run check:release-green`) | सत्यापन इंजन: किसी ब्रांच या मर्ज उम्मीदवार के विरुद्ध पूर्ण गेट को पुनः प्रस्तुत करता है | स्वतंत्र रूप से, किसी भी समय                                                      | एक विशिष्ट ब्रांच या मर्ज-PR   |
| **`/babysit <PR#>`**                                                     | **एक** PR की **लाइव CI** को ग्रीन होने तक संचालित करता है                                 | स्वतंत्र रूप से, प्रत्येक PR के लिए                                               | एकल PR                         |
| **`nightly-release-green.yml`** (समाधान D)                               | स्वचालित नाइटली वर्कफ़्लो; HARD रेड होने पर इश्यू खोलता है                                | स्वचालित (cron)                                                                   | सक्रिय रिलीज़ ब्रांच           |

**"क्या यह केवल रिलीज़ के लिए है?" का संक्षिप्त उत्तर:** **नहीं।** `/green-prs` को
**रिलीज़ के बीच, समय-समय पर** चलाने के लिए डिज़ाइन किया गया था। स्वतंत्र रूप से चलाना ही सामान्य उपयोग है —
रिलीज़ केवल वह क्षण है जब इसे चलाने से सबसे अधिक मूल्य मिलता है।

## PR-से-रिलीज़ परामर्शी बिल्ड

`quality.yml` में अब गैर-ड्राफ़्ट कोड PRs और Mergify क्यू शाखाओं के लिए `Build (advisory)` शामिल है।
यह `ci.yml` की प्रोडक्शन बिल्ड विधि को प्रतिबिंबित करता है: Node 24, `npm-ci-retry`,
`check:node-runtime`, और `OMNIROUTE_USE_TURBOPACK=1` के साथ `npm run build`। यह जानबूझकर
बिल्ड आर्टिफ़ैक्ट अपलोड नहीं करता, क्योंकि इस वर्कफ़्लो में कोई डाउनस्ट्रीम क्वालिटी जॉब उसका उपयोग नहीं करता।
स्थिर रिलीज़-PR रन के एक सप्ताह बाद `continue-on-error` हटा दें, ताकि यह संकेत एक
अवरोधक PR-से-रिलीज़ गेट बन जाए।

## समाधान C — `npm run check:release-green` (इंजन)

वर्तमान वर्किंग ट्री के विरुद्ध रिलीज़-समतुल्य सत्यापन दोहराता है और प्रत्येक रेड को वर्गीकृत करता है:

- **HARD** (typecheck, lint त्रुटियाँ, unit, vitest, db-rules, public-creds, वैकल्पिक
  `package-artifact`) → **वास्तविक दोष**; `exit 1`। स्रोत शाखा पर ठीक किया जाता है (TDD, नियम #18)।
- **DRIFT** (eslint **चेतावनियाँ**, cognitive-complexity, file-size) → चक्र में संचित रैचेट ड्रिफ़्ट,
  **योगदानकर्ता की गलती नहीं**; इसकी केवल रिपोर्ट की जाती है और **रिलीज़ के समय मेंटेनर द्वारा
  पुनः बेसलाइन किया जाता है**। ड्रिफ़्ट निकास कोड को **कभी नहीं** बदलता — इसलिए यह कभी किसी को अवरुद्ध नहीं करता।

```bash
npm run check:release-green                 # वर्तमान शाखा (वर्किंग ट्री)
node scripts/quality/validate-release-green.mjs --json   # संरचित आउटपुट
node scripts/quality/validate-release-green.mjs --quick  # unit+vitest छोड़ता है (केवल drift+typecheck+lint)
node scripts/quality/validate-release-green.mjs --with-build  # package-artifact शामिल करता है (धीमा)
```

केवल निदान और **रिपोर्ट** करता है (कोई ऑटो-फ़िक्स नहीं)। फ़िक्स-टू-ग्रीन ऑर्केस्ट्रेशन
`/green-prs` और `/review-prs` में मौजूद है।

## समाधान A — `/green-prs` (क्यू स्कैन)

प्रक्रिया (सारांश — विवरण के लिए `green-prs` स्किल देखें):

1. सक्रिय रिलीज़ शाखा के विरुद्ध खुले PRs की क्यू की **इन्वेंटरी** बनाएँ।
2. प्रत्येक PR को **ट्राइएज** करें (व्यवहार्य / अस्वीकार करने योग्य / लेखक की आवश्यकता) — अस्वीकार/लेखक की आवश्यकता वाले
   PRs की **रिपोर्ट की जाती है, उन्हें बंद नहीं किया जाता** (लेखक निर्णय लेता है)।
3. प्रत्येक व्यवहार्य PR के लिए, एक **पृथक वर्कट्री** (नियम #19) में, PR को रिलीज़ टिप तक लाएँ और
   `npm run check:release-green` चलाएँ:
   - **HARD** → सह-लेखन के माध्यम से **योगदानकर्ता की शाखा पर** ठीक करें (लेखक की "Merged" स्थिति सुरक्षित रहती है),
     सभी HARD साफ़ होने तक पुनः चलाएँ।
   - **DRIFT** → इसे रहने दें; रिलीज़ के समय इसे पुनः बेसलाइन किया जाएगा।
4. PR × (निर्णय, HARD रेड्स, ठीक किया गया?, DRIFT, अभी release-green?) तालिका की **रिपोर्ट** करें।

क्यू को मर्ज किए बिना **तैयार** कर सकता है; केवल स्पष्ट अनुरोध किए जाने पर मर्ज करता है — और किसी PR को कभी बंद नहीं करता।

## अनुशंसित आवृत्ति

- **`/green-prs` समय-समय पर चलाएँ** (उदा., साप्ताहिक) और **`/generate-release` से
  हमेशा पहले**।
- **`nightly-release-green.yml`** (समाधान D) को सतत संकेत के रूप में बनाए रखें: जब यह कोई
  HARD रेड इश्यू खोलता है, तब स्कैन करने का समय है।
- किसी शाखा या विशिष्ट मर्ज उम्मीदवार की जाँच के लिए आवश्यकतानुसार **`/validate-release-green`** का उपयोग करें।
- जब किसी विशिष्ट PR को लाइव CI पर ग्रीन तक पहुँचाने की आवश्यकता हो, तब **`/babysit <PR#>`** का उपयोग करें।

## रिलीज़ से संबंध

- `/generate-release`, **चरण 0 (प्री-फ़्लाइट)** में सत्यापन को कॉल करता है: रिलीज़ PR खोलने से पहले DRIFT को पुनः बेसलाइन और
  HARD को ठीक करता है।
- `/review-prs`, मर्ज निर्णय चरण पर release-green गेट का उपयोग करता है (मर्ज-से-पहले-ग्रीन)।

सभी घटकों का लक्ष्य एक ही है: रिलीज़ के दिन 40-मिनट की परतों में रेड्स पर सर्फ़ करने के बजाय,
**पहले CI रन में ही एक ग्रीन रिलीज़ PR**।
