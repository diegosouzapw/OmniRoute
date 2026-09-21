# Release-Green: keeping the queue and release branch green (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

## हे कोणती समस्या सोडवते

**पूर्ण गेट** (`.github/workflows/ci.yml` — युनिट शार्ड्स, vitest, रॅचेट्स,
`package-artifact`, SonarQube, E2E) **फक्त रिलीज PR वरच** (PR → `main`) चालते. `release/**` ला लक्ष्य करणाऱ्या PR ना
**फास्ट-गेट्स** (`quality.yml`: TIA-प्रभावित चाचण्या + टाइपचेक + लिंट)
मिळतात आणि, कोडमधील बदलांसाठी, एक **सल्लात्मक** प्रॉडक्शन बिल्ड मिळतो. परिणाम: केवळ-रिलीजवेळी दिसणाऱ्या त्रुटी
रिलीज ब्रँचवर शांतपणे साचत राहू शकतात आणि रिलीजच्या वेळी **~40 मिनिटांच्या स्तरांमध्ये स्फोटकपणे समोर येऊ शकतात**,
एकावेळी एक.

"release-green फॅमिली" अशा त्रुटींचा **आधीच अंदाज घेण्यासाठी** अस्तित्वात आहे — रिलीजच्या बाहेर / स्थानिकरीत्या,
कधीही पूर्ण गेटच्या समतुल्य प्रमाणीकरण करा, जेणेकरून रिलीज PR त्याच्या पहिल्याच CI रनमध्ये
ग्रीन असेल.

> **तडजोड न करता पाळायचे तत्त्व:** यातील काहीही योगदानकर्त्याला अडवत नाही. त्यांच्या PR ला अपयशी ठरवणारी
> आवश्यक तपासणी आम्ही जोडत नाही. **ड्रिफ्ट** (रॅचेट्स) रिलीजच्या वेळी मेंटेनरने रीबेसलाइन करण्यासाठी आहे —
> ती कधीही योगदानकर्त्याची चिंता नाही. कोणताही भाग PR **बंद करत नाही** (श्रेयाची चोरी) किंवा
> उत्तीर्ण होण्यासाठी चाचणी **कमकुवत करत नाही**.

## ही फॅमिली (4 भाग) — आणि प्रत्येक भाग स्वतंत्रपणे कसा चालतो

| भाग                                                                    | तो काय आहे                                                                 | कधी चालवायचा                                                             | व्याप्ती                       |
| ---------------------------------------------------------------------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ | ------------------------------ |
| **`/green-prs`** (उपाय A)                                              | मेंटेनरद्वारे **उघड्या PR च्या रांगेचे** मागणीनुसार स्कॅन                  | **स्वतंत्रपणे, वेळोवेळी** — आणि विशेषतः `/generate-release` च्या **आधी** | संपूर्ण PR रांग → `release/**` |
| **`/validate-release-green`** (उपाय C — `npm run check:release-green`) | प्रमाणीकरण इंजिन: ब्रँच किंवा मर्ज उमेदवारावर पूर्ण गेटची पुनरावृत्ती करते | स्वतंत्रपणे, कधीही                                                       | विशिष्ट ब्रँच किंवा मर्ज-PR    |
| **`/babysit <PR#>`**                                                   | **एका** PR चे **लाइव्ह CI** ग्रीन होईपर्यंत चालवते                         | स्वतंत्रपणे, प्रत्येक PR साठी                                            | एकच PR                         |
| **`nightly-release-green.yml`** (उपाय D)                               | स्वयंचलित रात्रीचे वर्कफ्लो; HARD रेड असल्यास इश्यू उघडते                  | स्वयंचलित (cron)                                                         | सक्रिय रिलीज ब्रँच             |

**"हे फक्त रिलीजसाठी आहे का?" याचे थोडक्यात उत्तर:** **नाही.** `/green-prs` हे
**वेळोवेळी, रिलीजच्या दरम्यान** चालवण्यासाठी डिझाइन केले आहे. स्वतंत्रपणे चालवणे हाच सामान्य वापर आहे — रिलीज हा फक्त
तो क्षण आहे, जेव्हा ते चालवल्याने सर्वाधिक मूल्य मिळते.

## PR-ते-रिलीज सल्लागार बिल्ड

`quality.yml` मध्ये आता नॉन-ड्राफ्ट कोड PRs आणि Mergify क्यू शाखांसाठी `Build (advisory)` समाविष्ट आहे.
ते `ci.yml` मधील प्रॉडक्शन बिल्ड कृतीची प्रतिकृती आहे: Node 24, `npm-ci-retry`,
`check:node-runtime`, आणि `OMNIROUTE_USE_TURBOPACK=1` सह `npm run build`. ते जाणूनबुजून
बिल्ड आर्टिफॅक्ट अपलोड करत नाही, कारण या वर्कफ्लोमध्ये कोणतेही डाउनस्ट्रीम गुणवत्ता जॉब ते वापरत नाही.
एका आठवड्याच्या स्थिर रिलीज-PR रननंतर `continue-on-error` काढून टाका, जेणेकरून हा संकेत
ब्लॉकिंग PR-ते-रिलीज गेट बनेल.

## उपाय C — `npm run check:release-green` (इंजिन)

सध्याच्या वर्किंग ट्रीवर रिलीज-समतुल्य प्रमाणीकरणाची पुनरावृत्ती करते आणि प्रत्येक रेडचे वर्गीकरण करते:

- **HARD** (टाइपचेक, लिंट त्रुटी, युनिट, vitest, db-rules, public-creds, पर्यायी
  `package-artifact`) → **वास्तविक दोष**; `exit 1`. स्रोत शाखेवर दुरुस्त केला जातो (TDD, नियम #18).
- **DRIFT** (eslint **इशारे**, कॉग्निटिव्ह-कॉम्प्लेक्सिटी, फाइल-साइज) → सायकलमध्ये साचलेला रॅचेट ड्रिफ्ट,
  **योगदानकर्त्याची चूक नाही**; तो केवळ नोंदवला जातो आणि **रिलीजच्या वेळी मेंटेनरद्वारे
  पुनर्बेसलाइन केला जातो**. ड्रिफ्टमुळे एक्झिट कोड **कधीही** बदलत नाही — त्यामुळे तो कोणालाही कधीही ब्लॉक करत नाही.

```bash
npm run check:release-green                 # सध्याची शाखा (वर्किंग ट्री)
node scripts/quality/validate-release-green.mjs --json   # संरचित आउटपुट
node scripts/quality/validate-release-green.mjs --quick  # unit+vitest वगळते (फक्त drift+typecheck+lint)
node scripts/quality/validate-release-green.mjs --with-build  # package-artifact समाविष्ट करते (संथ)
```

फक्त निदान करते आणि **अहवाल देते** (ऑटो-फिक्स नाही). फिक्स-टू-ग्रीन ऑर्केस्ट्रेशन
`/green-prs` आणि `/review-prs` मध्ये आहे.

## उपाय A — `/green-prs` (क्यू स्कॅन)

प्रक्रिया (सारांश — तपशीलांसाठी `green-prs` कौशल्य पाहा):

1. सक्रिय रिलीज शाखेच्या तुलनेत खुल्या PRs च्या क्यूची **यादी तयार करा**.
2. प्रत्येक PR चे **ट्रायेज करा** (व्यवहार्य / नाकारण्यायोग्य / लेखकाची-गरज) — नाकारणे/लेखकाची-गरज
   **नोंदवले जातात, बंद केले जात नाहीत** (लेखक निर्णय घेतो).
3. प्रत्येक व्यवहार्य PR साठी, **वेगळ्या worktree** मध्ये (नियम #19), PR ला रिलीज टिपपर्यंत आणा आणि
   `npm run check:release-green` चालवा:
   - **HARD** → सह-लेखकत्वाद्वारे **योगदानकर्त्याच्या शाखेवर** दुरुस्त करा (लेखकाची "Merged" स्थिती जपते),
     सर्व HARDs दूर होईपर्यंत पुन्हा चालवा.
   - **DRIFT** → तसेच सोडा; रिलीजच्या वेळी ते पुनर्बेसलाइन केले जाईल.
4. PR × (निकाल, HARD रेड्स, दुरुस्त केले?, DRIFT, आता release-green?) असा तक्ता **सादर करा**.

विलीन न करता क्यू **तयार** करू शकते; केवळ स्पष्टपणे विनंती केल्यावरच विलीन करते — आणि PR कधीही बंद करत नाही.

## शिफारस केलेली वारंवारता

- **`/green-prs` नियतकालिकपणे चालवा** (उदा., साप्ताहिक) आणि
  **`/generate-release` पूर्वी नेहमी चालवा**.
- सतत संकेत म्हणून **`nightly-release-green.yml`** (उपाय D) कायम ठेवा: ते HARD रेड इश्यू उघडते तेव्हा
  स्कॅन करण्याची वेळ आलेली असते.
- शाखा किंवा विशिष्ट मर्ज उमेदवार तपासण्यासाठी गरजेनुसार **`/validate-release-green`** वापरा.
- विशिष्ट PR ला लाइव्ह CI वर ग्रीन स्थितीत आणण्याची गरज असताना **`/babysit <PR#>`** वापरा.

## रिलीजशी संबंध

- `/generate-release` **फेज 0 (प्री-फ्लाइट)** मध्ये प्रमाणीकरण कॉल करते: रिलीज PR उघडण्यापूर्वी DRIFT
  पुनर्बेसलाइन करते आणि HARD दुरुस्त करते.
- `/review-prs` मर्ज निर्णयाच्या टप्प्यावर release-green गेट वापरते (मर्जपूर्वी-ग्रीन).

सर्व घटकांचे उद्दिष्ट समान आहे: रिलीजच्या दिवशी 40-मिनिटांच्या स्तरांमध्ये रेड्सचा पाठलाग करण्याऐवजी,
**पहिल्याच CI रनमध्ये ग्रीन रिलीज PR**.
