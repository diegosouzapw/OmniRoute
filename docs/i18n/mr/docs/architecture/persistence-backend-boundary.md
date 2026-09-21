# ADR: Pluggable persistence boundary (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/persistence-backend-boundary.md) · 🇪🇹 [am](../../../am/docs/architecture/persistence-backend-boundary.md) · 🇸🇦 [ar](../../../ar/docs/architecture/persistence-backend-boundary.md) · 🇦🇿 [az](../../../az/docs/architecture/persistence-backend-boundary.md) · 🇧🇬 [bg](../../../bg/docs/architecture/persistence-backend-boundary.md) · 🇧🇩 [bn](../../../bn/docs/architecture/persistence-backend-boundary.md) · 🇨🇿 [cs](../../../cs/docs/architecture/persistence-backend-boundary.md) · 🇩🇰 [da](../../../da/docs/architecture/persistence-backend-boundary.md) · 🇩🇪 [de](../../../de/docs/architecture/persistence-backend-boundary.md) · 🇬🇷 [el](../../../el/docs/architecture/persistence-backend-boundary.md) · 🇪🇸 [es](../../../es/docs/architecture/persistence-backend-boundary.md) · 🇪🇪 [et](../../../et/docs/architecture/persistence-backend-boundary.md) · 🇮🇷 [fa](../../../fa/docs/architecture/persistence-backend-boundary.md) · 🇫🇮 [fi](../../../fi/docs/architecture/persistence-backend-boundary.md) · 🇫🇷 [fr](../../../fr/docs/architecture/persistence-backend-boundary.md) · 🇮🇪 [ga](../../../ga/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [gu](../../../gu/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ha](../../../ha/docs/architecture/persistence-backend-boundary.md) · 🇮🇱 [he](../../../he/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [hi](../../../hi/docs/architecture/persistence-backend-boundary.md) · 🇭🇷 [hr](../../../hr/docs/architecture/persistence-backend-boundary.md) · 🇭🇺 [hu](../../../hu/docs/architecture/persistence-backend-boundary.md) · 🇦🇲 [hy](../../../hy/docs/architecture/persistence-backend-boundary.md) · 🇮🇩 [id](../../../id/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ig](../../../ig/docs/architecture/persistence-backend-boundary.md) · 🇮🇹 [it](../../../it/docs/architecture/persistence-backend-boundary.md) · 🇯🇵 [ja](../../../ja/docs/architecture/persistence-backend-boundary.md) · 🇬🇪 [ka](../../../ka/docs/architecture/persistence-backend-boundary.md) · 🇰🇭 [km](../../../km/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [kn](../../../kn/docs/architecture/persistence-backend-boundary.md) · 🇰🇷 [ko](../../../ko/docs/architecture/persistence-backend-boundary.md) · 🇱🇹 [lt](../../../lt/docs/architecture/persistence-backend-boundary.md) · 🇱🇻 [lv](../../../lv/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ml](../../../ml/docs/architecture/persistence-backend-boundary.md) · 🇲🇾 [ms](../../../ms/docs/architecture/persistence-backend-boundary.md) · 🇲🇹 [mt](../../../mt/docs/architecture/persistence-backend-boundary.md) · 🇲🇲 [my](../../../my/docs/architecture/persistence-backend-boundary.md) · 🇳🇵 [ne](../../../ne/docs/architecture/persistence-backend-boundary.md) · 🇳🇱 [nl](../../../nl/docs/architecture/persistence-backend-boundary.md) · 🇳🇴 [no](../../../no/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [or](../../../or/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [pa](../../../pa/docs/architecture/persistence-backend-boundary.md) · 🇵🇭 [phi](../../../phi/docs/architecture/persistence-backend-boundary.md) · 🇵🇱 [pl](../../../pl/docs/architecture/persistence-backend-boundary.md) · 🇵🇹 [pt](../../../pt/docs/architecture/persistence-backend-boundary.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/persistence-backend-boundary.md) · 🇷🇴 [ro](../../../ro/docs/architecture/persistence-backend-boundary.md) · 🇷🇺 [ru](../../../ru/docs/architecture/persistence-backend-boundary.md) · 🇱🇰 [si](../../../si/docs/architecture/persistence-backend-boundary.md) · 🇸🇰 [sk](../../../sk/docs/architecture/persistence-backend-boundary.md) · 🇸🇮 [sl](../../../sl/docs/architecture/persistence-backend-boundary.md) · 🇷🇸 [sr](../../../sr/docs/architecture/persistence-backend-boundary.md) · 🇸🇪 [sv](../../../sv/docs/architecture/persistence-backend-boundary.md) · 🇰🇪 [sw](../../../sw/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ta](../../../ta/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [te](../../../te/docs/architecture/persistence-backend-boundary.md) · 🇹🇭 [th](../../../th/docs/architecture/persistence-backend-boundary.md) · 🇹🇷 [tr](../../../tr/docs/architecture/persistence-backend-boundary.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/persistence-backend-boundary.md) · 🇵🇰 [ur](../../../ur/docs/architecture/persistence-backend-boundary.md) · 🇺🇿 [uz](../../../uz/docs/architecture/persistence-backend-boundary.md) · 🇻🇳 [vi](../../../vi/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [yo](../../../yo/docs/architecture/persistence-backend-boundary.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/persistence-backend-boundary.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/persistence-backend-boundary.md)

---

- **स्थिती:** प्रस्तावित — रनटाइमवरील काम सुरू होण्यापूर्वी देखभालकर्त्याची मंजुरी आवश्यक
- **ट्रॅकिंग इश्यू:** [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)
- **व्याप्ती:** केवळ पर्सिस्टन्स आर्किटेक्चर; हा निर्णय कोणताही बाह्य डेटाबेस जोडत किंवा निवडत नाही

## संदर्भ

OmniRoute सध्या `src/lib/db/` मधून डोमेन-केंद्रित पर्सिस्टन्स फंक्शन्स उपलब्ध करून देते, तर
`src/lib/db/core.ts` द्वारे परत केलेले सामायिक कनेक्शन `src/lib/db/adapters/types.ts` मधील सिंक्रोनस `SqliteAdapter`
कॉन्ट्रॅक्ट अंमलात आणते. हा अॅडॅप्टर अनेक SQLite रनटाइम्सना समर्थन देतो, परंतु त्याचा
पृष्ठभाग SQLite-सदृशच राहतो: सिंक्रोनस प्रिपेअर्ड स्टेटमेंट्स, `pragma`, डिफर्ड आणि इमिजिएट
ट्रान्झॅक्शन्स, नेटिव्ह/फाइल-कॉपी बॅकअप, चेकपॉइंट आणि स्थानिक डेटाबेस हँडल.

सध्याचा स्टार्टअप आणि रिकव्हरी मार्ग SQLite फाइलचे जीवनचक्रही हाताळतो. `src/lib/db/core.ts`
`storage.sqlite` चे स्थान निश्चित करते, संपूर्ण प्रोसेससाठी एकच ग्लोबल अॅडॅप्टर राखते, WAL चे चेकपॉइंट करते, रिकव्हरीदरम्यान निवडक
टेबल्स जतन करते आणि डेटाबेस पुन्हा तयार करताना SQLite च्या संबंधित फाइल्स काढून टाकते. `src/lib/db/adapters/driverFactory.ts` मधील ड्रायव्हर
निवड समर्थित SQLite रनटाइम्सपैकी एक निवडते; ती बाह्य-बॅकएंड अॅब्स्ट्रॅक्शन
नाही.

स्कीमा उत्क्रांतीदेखील अशाच प्रकारे घट्ट जोडलेली आहे. `src/lib/db/migrationRunner.ts` क्रमांकित SQL फाइल्स लागू करते,
`sqlite_master` आणि `PRAGMA table_info` तपासते, पर्यायी FTS5 समर्थन शोधते आणि मायग्रेशनचे
काम SQLite ट्रान्झॅक्शन्समध्ये चालवते. `src/lib/db/backup.ts` आणि
`src/lib/db/optimizationSettings.ts` यांसारखी ऑपरेशनल मॉड्यूल्स बॅकअप, `PRAGMA`, WAL, पेज-साइज, ऑटो-व्हॅक्यूम आणि `VACUUM`
सिमॅंटिक्स थेट वापरतात.

ही एम्बेडेड SQLite डिप्लॉयमेंटची वैध वैशिष्ट्ये आहेत. PostgreSQL किंवा MySQL ला SQLite API चे अनुकरण करण्यास
भाग न पाडता ती उपलब्ध राहिली पाहिजेत.

## निर्णय

पोर्टेबल टिकाऊ स्थितीसाठी दोन-स्तरीय पर्सिस्टन्स सीमा स्वीकारा:

1. **डोमेन रिपॉझिटरी कॉन्ट्रॅक्ट्स** व्यवसाय आणि राउटिंग
   कोडला आवश्यक असलेल्या पर्सिस्टन्स ऑपरेशन्सची व्याख्या करतात. कॉलर्स SQL मजकूर, प्रिपेअर्ड स्टेटमेंट्स,
   डेटाबेस फाइल्स किंवा डायलेक्ट ऑब्जेक्ट्सवर नव्हे, तर डोमेन वर्तन आणि डोमेन डेटावर अवलंबून राहतात.
2. **अंतर्गत असिंक्रोनस बॅकएंड कॉन्ट्रॅक्ट** रिपॉझिटरी अंमलबजावण्यांना
   ट्रान्झॅक्शन कॉन्टेक्स्ट्स, आरोग्य/तत्परता, मायग्रेशन समन्वय, बॅकएंड क्षमता आणि
   वर्गीकृत त्रुटींसह समर्थन देते. अचूक TypeScript पृष्ठभाग पहिल्या अंमलबजावणी
   PR सोबत प्रस्तावित केला जाईल आणि अनुरूपता चाचण्यांद्वारे सिद्ध केला जाईल; हा ADR जाणूनबुजून एखादा काल्पनिक API गोठवत नाही.

SQLite ही डीफॉल्ट अंमलबजावणी राहते. डोमेन्सचे
लहान उभ्या भागांमध्ये मायग्रेशन होत असताना विद्यमान SQLite ड्रायव्हर कॅस्केड आणि सिंक्रोनस
`SqliteAdapter` हे SQLite रिपॉझिटरी अंमलबजावणीच्या मागेच राहतील. कोणत्याही वापरकर्त्याला बाह्य सेवा कॉन्फिगर करणे आवश्यक नाही.

रिपॉझिटरी सीमा SQLite च्या संदर्भात सिद्ध झाल्यानंतर PostgreSQL ही पहिली प्रस्तावित
बाह्य अंमलबजावणी असेल. MySQL दुसरी बिझनेस-लॉजिक शाखा म्हणून नव्हे, तर त्याच अनुरूपता संचाविरुद्ध समकक्ष अंमलबजावणी म्हणून
त्यानंतर येईल.

## सीमा नियम

### पोर्टेबल रिपॉझिटरी पृष्ठभाग

पोर्टेबल रिपॉझिटरी पुढील गोष्टी उघड करू शकते:

- डोमेन रीड्स आणि राइट्स;
- स्पष्ट अॅटोमिक ऑपरेशन्स आणि ट्रान्झॅक्शन-स्कोप्ड रिपॉझिटरी प्रवेश;
- जिथे कॉन्करन्सी सिमॅंटिक्स डोमेनचा भाग आहेत तिथे compare/update किंवा lease ऑपरेशन्स;
- बॅकएंड-न्यूट्रल पेजिनेशन, क्रमवारी आणि कन्स्ट्रेंट त्रुटी.

बॅकएंडचे आरोग्य, तत्परता आणि मायग्रेशन समन्वय हे स्वतंत्र डोमेन रिपॉझिटरीजऐवजी अंतर्गत बॅकएंड/ऑपरेशनल
कॉन्ट्रॅक्टमध्ये मोडतात.

पोर्टेबल रिपॉझिटरीने पुढील गोष्टी उघड करू नयेत:

- `prepare`, `get`, `all`, `run` किंवा रॉ ड्रायव्हर हँडल्स;
- `PRAGMA`, WAL चेकपॉइंट मोड्स, `VACUUM` किंवा पेज/कॅश ट्यूनिंग;
- SQLite फाइल पाथ्स, संबंधित फाइल्स किंवा फाइल-कॉपी बॅकअप;
- क्रॉस-बॅकएंड डोमेन कॉन्ट्रॅक्ट म्हणून `lastInsertRowid`;
- FTS5 किंवा `sqlite-vec` सिंटॅक्स;
- सामान्य बिझनेस कोडद्वारे वापरला जाणारा सर्वसाधारण डायलेक्ट एस्केप हॅच.

### बॅकएंड क्षमता पृष्ठभाग

बॅकएंड-विशिष्ट वर्तन स्पष्ट आणि शोधण्यायोग्य राहते. केवळ SQLite-साठीची देखभाल तिच्या
स्वतःच्या अंमलबजावणी आणि ऑपरेशनल इंटरफेसच्या मागे राहते, ज्यामध्ये पुढील गोष्टी समाविष्ट आहेत:

- रनटाइम ड्रायव्हर निवड;
- WAL चेकपॉइंट आणि SQLite शटडाउन वर्तन;
- पेज-साइज, कॅश-साइज आणि ऑटो-व्हॅक्यूम सेटिंग्ज;
- डेटाबेस-फाइल बॅकअप, रिस्टोअर आणि रिकव्हरी;
- SQLite स्कीमा इंट्रोस्पेक्शन;
- FTS5 आणि `sqlite-vec` इंटिग्रेशन.

बाह्य बॅकएंडला त्या वैशिष्ट्यांचे अनुकरण करणे आवश्यक नाही. रिपॉझिटरीजनी एकतर
पोर्टेबल क्षमता वापरावी, दस्तऐवजीकृत वर्तनासह बॅकएंड-विशिष्ट अंमलबजावणी द्यावी किंवा
एखादी क्षमता उपलब्ध नसल्याचे कळवावे.

## व्यवहार आणि स्थलांतर मॉडेल

Repository API अणूस्तरीय व्यवसाय ऑपरेशन परिभाषित करतात; कॉलर SQL व्यवहार मोड निवडत नाहीत.
प्रत्येक ऑपरेशनने त्याच्या निरीक्षणयोग्य समवर्तीतेच्या हमी परिभाषित करणे आवश्यक आहे: संरक्षित अपरिवर्तनीयता, संघर्ष
शोध, पुनःप्रयत्न वर्गीकरण, आयडेम्पोटन्सीच्या अपेक्षा आणि व्यवहार-संदर्भ प्रसार.
त्या निरीक्षणयोग्य हमी समतुल्य राहतात तेव्हाच अंमलबजावण्यांमध्ये वेगवेगळ्या व्यवहार आणि विलगीकरण यंत्रणा
वापरल्या जाऊ शकतात. ऑपरेशनचा करार पूर्ण होत असेल तेथे SQLite त्याचे सध्याचे deferred किंवा immediate
व्यवहार वर्तन अंतर्गतरीत्या वापरणे सुरू ठेवू शकते.

बाह्य backend साठी स्पष्ट स्थलांतर मालकी आवश्यक आहे, जेणेकरून एकाधिक अनुप्रयोग replicas मध्ये
एकाच schema बदलासाठी स्पर्धा होणार नाही. Backend स्थलांतर इतिहास तार्किक टप्पे सामायिक करू शकतात, परंतु SQLite SQL
फायली दुसऱ्या dialect साठी पोर्टेबल किंवा पुनर्वापरयोग्य आहेत असे गृहीत धरले जात नाही.

## विविध backend मधील अनुरूपता अर्थव्यवस्था

अनुरूपता चाचण्यांनी केवळ repository पद्धतींच्या स्वाक्षऱ्याच नव्हे, तर वर्तनही समाविष्ट केले पाहिजे. प्रत्येक स्थलांतरित domain ने
पुढील बाबी परिभाषित आणि सत्यापित केल्या पाहिजेत:

- timestamp चा timezone, precision आणि serialization;
- `NULL` क्रमवारी, collation आणि case-sensitivity च्या अपेक्षा;
- JSON प्रतिनिधित्व आणि तुलना वर्तन;
- integer, decimal आणि monetary precision;
- pagination साठी स्थिर क्रमवारी आणि निर्धारक tie-breakers;
- SQLite row ID वर अवलंबून न राहता ID निर्मिती;
- uniqueness आणि foreign-key उल्लंघनांचे वर्गीकरण;
- no-op, compare/update आणि delete ऑपरेशन्ससाठी प्रभावित rows चे वर्तन;
- समवर्ती लेखनाचे परिणाम, पुनःप्रयत्नयोग्य संघर्ष आणि आयडेम्पोटंट पुनःप्रयत्न.

एखादा domain समतुल्य निरीक्षणयोग्य अर्थव्यवस्था स्पष्ट करू शकत नसेल, तर तो अद्याप पोर्टेबल नाही आणि तो करार
तयार होईपर्यंत backend-विशिष्ट राहिला पाहिजे.

## सुसंगतता आवश्यकता

या ADR चे पालन करणाऱ्या कोणत्याही अंमलबजावणीने हे गुणधर्म कायम राखले पाहिजेत:

- SQLite हा शून्य-कॉन्फिगरेशन डीफॉल्ट राहतो.
- विद्यमान SQLite फायली आणि स्थलांतर इतिहास वाचनीय राहतात.
- npm, Electron, Docker आणि restricted-runtime SQLite fallback त्यांचा सध्याचा startup path कायम ठेवतात.
- संग्रहित provider credentials विद्यमान अनुप्रयोग encryption वर्तन वापरणे सुरू ठेवतात.
- Repository स्थलांतर routing, quota, API-key किंवा audit अर्थव्यवस्था गुप्तपणे बदलत नाही.
- Backup आणि recovery वर्तन सार्वत्रिक म्हणून सादर करण्याऐवजी प्रत्येक backend साठी दस्तऐवजीकरण केले जाते.
- स्वच्छ SQLite-केवळ installation कोणताही बाह्य database driver लोड करत नाही किंवा त्याची आवश्यकता भासत नाही.

## वितरण क्रम

1. स्वतंत्र पुनरावलोकन artifact म्हणून पुनरुत्पादनीय SQLite coupling inventory प्रकाशित करा.
2. पहिले domain repository करार आणि अनुरूपता चाचण्या सादर करा.
3. डीफॉल्ट न बदलता विद्यमान SQLite अंमलबजावणी त्या करारांमागे अनुकूलित करा.
4. Maintainer च्या मंजुरीच्या अधीन राहून, एका
   मर्यादित control-plane भागासाठी प्रथम बाह्य अंमलबजावणी म्हणून PostgreSQL जोडा.
5. समवर्ती-लेखन आणि स्थलांतर-मालकी चाचण्या अस्तित्वात आल्यानंतरच सामायिक state विस्तारित करा.
6. Database switching ची जाहिरात करण्यापूर्वी offline, प्रमाणित SQLite-to-external स्थलांतर path जोडा.
7. सिद्ध repository आणि backend करारांच्या आधारे MySQL जोडा.

प्रत्येक runtime टप्पा हा स्वतंत्र, पुनरावलोकनयोग्य PR आहे. नंतरच्या टप्प्याचा वापर आधीच्या टप्प्यातील
अप्रमाणित abstraction merge करण्याचे समर्थन करण्यासाठी केला जाऊ नये.

## पहिला अंमलबजावणी भाग

कपलिंग इन्व्हेंटरीचे पुनरावलोकन झाल्यानंतर पहिला रनटाइम भाग निवडला पाहिजे. Provider
कनेक्शन्स, API keys, combos आणि राउटिंग कॉन्फिगरेशन हे संभाव्य उमेदवार आहेत, कारण त्यांची मूलभूत टेबल्स
`src/lib/db/core.ts` मध्ये दिसतात; परंतु हा ADR टेबल्सची यादी किंवा migration PR मंजूर करत नाही.
या भागामध्ये पुढील गोष्टींचा समावेश असणे आवश्यक आहे:

- SQLite चे वर्तन जतन करणाऱ्या चाचण्या;
- repository अनुरूपता चाचण्या;
- स्पष्ट transaction सीमा;
- संग्रहित credentials साठी encryption आणि redaction ची पडताळणी;
- डीफॉल्ट startup configuration मध्ये कोणताही बदल नाही.

## विचारात घेतलेले पर्याय

### `SqliteAdapter` अंतर्गत PostgreSQL जोडणे

नामंजूर. `SqliteAdapter` हा SQLite runtimes साठी compatibility layer आहे आणि SQLite-विशिष्ट
operations उपलब्ध करून देतो. त्या पृष्ठभागाचे emulation केल्यास synchronous आणि dialect-विशिष्ट गृहीतके
नवीन backend मध्ये लीक होतील.

### सर्व domains साठी generic query/execute API उपलब्ध करणे

प्राथमिक सीमा म्हणून नामंजूर. यामुळे connection handling केंद्रीकृत होईल, परंतु SQL dialect,
transaction आणि table coupling हे business modules मध्येच राहतील. निम्न-स्तरीय backend primitive
repository implementations च्या अंतर्गत असू शकतो, परंतु application-facing persistence API म्हणून नाही.

### एका भागाची पडताळणी करण्यापूर्वी संपूर्ण persistence पुन्हा लिहिणे

नामंजूर. सध्याचा persistence पृष्ठभाग व्यापक आहे आणि त्यामध्ये file lifecycle, recovery, search
आणि operational settings समाविष्ट आहेत. Vertical slices पुनरावलोकन करण्यायोग्य वर्तन आणि rollback सीमा प्रदान करतात.

### SQLite ला डीफॉल्ट म्हणून बदलणे

नामंजूर. Embedded आणि desktop deployments सध्याच्या zero-service startup model वर अवलंबून आहेत.
बाह्य backend हा opt-in आहे.

### Redis चा टिकाऊ प्राधिकृत स्रोत म्हणून वापर करणे

नामंजूर. Redis स्पष्टपणे ephemeral coordination, cache किंवा counters यांना समर्थन देऊ शकतो, परंतु तो
येथे वर्णन केलेल्या durable repository contract ची जागा घेत नाही.

## परिणाम

### सकारात्मक

- Business code ला database dialect पासून स्वतंत्र असा स्थिर persistence seam मिळतो.
- बाह्य backend ने abstraction परिभाषित करण्यापूर्वी SQLite च्या वर्तनाची चाचणी केली जाते.
- PostgreSQL आणि MySQL हे domain logic ची पुनरावृत्ती करण्याऐवजी contracts आणि tests सामायिक करतात.
- SQLite-पुरत्या capabilities या leaky compatibility shims होण्याऐवजी first-class राहतात.
- Multi-replica migration आणि transaction वर्तन हा स्पष्ट design concern बनतो.

### खर्च आणि जोखीम

- Repository extraction साठी call sites चे टप्प्याटप्प्याने migration करणे आवश्यक आहे.
- Async सीमा सध्या synchronous असलेल्या service code मध्ये पसरू शकतात.
- Cross-backend semantics साठी SQL syntax compatibility च्या पलीकडील conformance tests आवश्यक आहेत.
- Backup, search, vector storage आणि maintenance हे capability-विशिष्टच राहतात.
- एकापेक्षा अधिक persistence implementations चालवल्याने CI आणि operational support चा खर्च वाढतो.

## उद्दिष्टांमध्ये समाविष्ट नसलेल्या गोष्टी

हा ADR पुढील गोष्टी करत नाही:

- database dependency, environment variable, schema किंवा migration जोडणे;
- कार्यरत SQLite singleton किंवा driver cascade बदलणे;
- विशिष्ट release मध्ये PostgreSQL किंवा MySQL support देण्याचे आश्वासन देणे;
- FTS5, `sqlite-vec`, backup files किंवा SQLite maintenance portable बनवणे;
- shared-state आणि coordination tests उपलब्ध होण्यापूर्वी active-active readiness परिभाषित करणे;
- `src/lib/db/` चे एकाच टप्प्यात पुनर्लेखन मंजूर करणे.

## देखभालकर्त्याच्या मंजुरीसाठी खुले प्रश्न

1. रिपॉझिटरी आणि अंतर्गत async बॅकएंड सीमा ही प्राधान्याची दिशा आहे का, की
   बाह्य सातत्य स्वतंत्र control-plane सेवेमागे असावे?
2. SQLite अनुरूपतेनंतरचे पहिले बाह्य अंमलबजावणी माध्यम म्हणून PostgreSQL स्वीकार्य आहे का?
3. पहिला मर्यादित रिपॉझिटरी भाग कोणत्या डोमेनचा असावा?
4. पहिल्या multi-replica टप्प्यासाठी कोणती स्थिती सामायिक केली पाहिजे आणि कोणती node-local राहील?
5. खंडित किंवा मागे घेतलेल्या रिपॉझिटरी स्थलांतरासाठी कोणती सुसंगतता कालमर्यादा आवश्यक आहे?

या प्रश्नांचे निराकरण होईपर्यंत, हा दस्तऐवज एक प्रस्ताव आहे आणि यात कोणतेही runtime रिफॅक्टरिंग अभिप्रेत नाही.
