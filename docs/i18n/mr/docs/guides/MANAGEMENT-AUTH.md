# Management Authentication (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute मध्ये **चार क्रेडेन्शियल फॅमिली** आहेत ज्या व्यवस्थापन मार्गांना अधिकृत करू शकतात.
त्या अदलाबदल करण्यायोग्य नाहीत. इन्फरन्स API कीज (`sk-…`) सर्व्हरचे व्यवस्थापन करत नाहीत
जोपर्यंत त्यांना स्पष्टपणे `manage` किंवा `admin` स्कोप दिला जात नाही.

प्रमाणभूत अंमलबजावणी: `src/lib/api/requireManagementAuth.ts`.

| क्रेडेन्शियल             | सामान्य स्वरूप                    | कोठे तयार केले जाते                                  | अपेक्षित वापर                | व्यवस्थापन क्षमता                                                                                |
| ------------------------ | --------------------------------- | ---------------------------------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------ |
| डॅशबोर्ड JWT सत्र        | `auth_token` कुकी                 | डॅशबोर्ड लॉगिन                                       | ब्राउझर UI                   | पूर्ण डॅशबोर्ड व्यवस्थापन, `CSRF`, स्थानिकता (locality) आणि नेहमी-संरक्षित-मार्ग नियमांच्या अधीन |
| CLI मशीन-आयडी टोकन       | अंतर्गत / स्थानिक                 | CLI बूटस्ट्रॅप (त्याच मशीनवर `omniroute`)            | स्थानिक CLI                  | केवळ स्थानिक व्यवस्थापन                                                                          |
| स्कोप केलेले ॲक्सेस टोकन | `oma_live_…`                      | **सेटिंग्ज → ॲक्सेस टोकन** किंवा `omniroute connect` | रिमोट CLI आणि व्यवस्थापन API | मार्गाच्या आवश्यक `read`, `write`, किंवा `admin` स्कोपची पूर्तता करणे आवश्यक आहे                 |
| इन्फरन्स API की          | `sk-…` (आणि इतर API-की प्रीफिक्स) | **API व्यवस्थापक / API कीज**                         | `/v1/*` इन्फरन्स             | **काहीही नाही** जोपर्यंत की मेटाडेटा मध्ये `manage` किंवा `admin` समाविष्ट नाही                  |

`oma_` क्रेडेन्शियल हे व्यवस्थापन/CLI क्रेडेन्शियल आहेत. त्या इन्फरन्स API कीज **नाहीत**.

जर सर्व्हरसाठी लॉगिन/API-की प्रमाणीकरण अक्षम केले असेल, तर काही व्यवस्थापन मार्ग
अप्रमाणित कॉल्स स्वीकारू शकतात. केवळ स्थानिक आणि नेहमी-संरक्षित मार्ग त्यांचे स्वतःचे नियम लागू करतात.
म्हणून, यापैकी एक क्रेडेन्शियल सादर करणे हे सार्वत्रिकरित्या अनिवार्य नाही,
आणि आवश्यक स्कोप आणि मार्ग स्थानिकता (route locality) शिवाय ते असणे सार्वत्रिकरित्या पुरेसे नाही.

संबंधित: [रिमोट मोड](./REMOTE-MODE.md) (`oma_live_…` रिमोट CLI साठी कसे तयार केले जाते).

---

## स्कोप मॅट्रिक्स

API-की व्यवस्थापन स्कोप आणि ॲक्सेस-टोकन स्कोप हे भिन्न शब्दसंग्रह आहेत.
MCP टूल स्कोप हा तिसरा शब्दसंग्रह आहे, जो खालील तक्त्यांमधील कोणत्याही फंक्शनऐवजी `scopeMatches` वापरून तपासला जातो.
बाजूला-बाजूला: [तीन स्कोप नेमस्पेस](../frameworks/MCP-SERVER.md#three-scope-namespaces).

### ॲक्सेस टोकन स्कोप (`oma_live_…`)

| स्कोप   | सामान्य ऑपरेशन्स                                                |
| ------- | --------------------------------------------------------------- |
| `read`  | टोकनला दिसण्याची परवानगी असलेले लिस्ट/स्टेटस GETs               |
| `write` | ॲडमिनच्या खालील बदल (तयार करणे/अद्यतनित करणे/हटवणे)             |
| `admin` | पूर्ण रिमोट CLI / कनेक्ट टोकन (पासवर्ड बूटस्ट्रॅप डीफॉल्ट येथे) |

`read` स्कोप असलेले टोकन `write` रूटला कॉल करू शकत नाही. रनटाइम मेसेजचा आकार:
`Access token scope '<have>' is insufficient; '<need>' required.`

### API-की व्यवस्थापन स्कोप

| स्कोप         | अर्थ                                                               |
| ------------- | ------------------------------------------------------------------ |
| (काहीही नाही) | केवळ अनुमान. व्यवस्थापन रूट्स 403 परत करतात.                       |
| `manage`      | व्यवस्थापन API (`requireManagementAuth` API-की शाखेसारखेच गेट)     |
| `admin`       | `hasManageScope` ला देखील पूर्ण करते (व्यवस्थापन-सक्षम मानले जाते) |

API कीज / API मॅनेजर UI मध्ये की वर `manage` सक्षम करा. जोपर्यंत तुम्ही हेतुपुरस्सर तो स्कोप दिला नसेल, तोपर्यंत ऑटोमेशनसाठी चॅट क्लायंट कीचा पुन्हा वापर करू नका.

---

## तयार करणे आणि रद्द करणे

### डॅशबोर्ड JWT सेशन

1. `/login` उघडा आणि व्यवस्थापन पासवर्डने साइन इन करा (पहिल्या बूटवेळी `INITIAL_PASSWORD`).
2. `auth_token` कुकी HttpOnly आहे. ब्राउझर डॅशबोर्ड ती आपोआप वापरतो.
3. `/api/auth/logout` द्वारे लॉग आउट करा. कॉपी करण्यासाठी दीर्घकाळ टिकणारे कोणतेही सीक्रेट नाही.

### CLI machine-id टोकन

1. सर्व्हर असलेल्या **त्याच होस्टवर** `omniroute` चालवा (लूपबॅक).
2. CLI, `~/.omniroute/` अंतर्गत machine-id टोकन बूटस्ट्रॅप करते (chmod 600).
3. हे दुसऱ्या मशीनवरून **कार्य करत नाही**. रिमोट CLI साठी Access Token वापरा.

### स्कोप असलेले Access Token (`oma_live_…`)

1. डॅशबोर्ड: **Settings → Access Tokens** → तयार करा (नाव + स्कोप). **सीक्रेट फक्त एकदाच दाखवले जाते.**
2. किंवा CLI: `omniroute connect <host>` (पासवर्ड → टोकन). [रिमोट मोड](./REMOTE-MODE.md) पहा.
3. हेडर: `Authorization: Bearer oma_live_…`
4. त्याच Access Tokens पृष्ठावरून रद्द करा (किंवा CLI कॉन्टेक्स्ट हटवा).
5. सर्व्हर फक्त हॅश साठवतो. प्लेनटेक्स्टला पासवर्डप्रमाणे हाताळा.

### `manage` स्कोप असलेली API की

1. डॅशबोर्ड: **API Manager / API Keys** → की तयार किंवा संपादित करा → `manage` (किंवा `admin`) सक्षम करा.
2. हेडर: `Authorization: Bearer sk-…` (कीचा प्रत्यक्ष प्रीफिक्स).
3. त्याच UI मध्ये की रद्द करा किंवा `manage` काढून टाका.
4. CLI नसलेल्या ऑटोमेशनसाठी किमान विशेषाधिकार वापरा: केवळ GET जॉब्ससाठी `read` Access Token ला प्राधान्य द्या; कॉलरला `/v1` आणि व्यवस्थापन या दोन्हींशी संवाद साधणे आवश्यक असेल, तेव्हाच API कीवर `manage` वापरा.

---

## हेडर स्वरूप

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

व्यवस्थापन क्रेडेन्शियल्स URL पाथ किंवा क्वेरी स्ट्रिंगमध्ये ठेवू नका. व्यवस्थापन
प्रमाणीकरण केवळ हेडर/कुकीद्वारे केले जाते.

---

## कॉपी-पेस्ट उदाहरणे

केवळ-वाचन (प्रोव्हायडर्सची सूची). `read` Access Token वापरा:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

बदल करणे (प्रोव्हायडर कनेक्शन तयार करणे). `write`/`admin` Access Token किंवा
manage-स्कोप असलेली API की वापरा:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

इन्फरन्स (व्यवस्थापन नाही). सामान्य API की, `manage` आवश्यक नाही:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## सध्याच्या रनटाइम त्रुटी (गुपिते प्रतिध्वनित करू नका)

| परिस्थिती                               | विशिष्ट स्थिती | संदेश (स्वच्छ केलेला)                                                   |
| --------------------------------------- | -------------- | ----------------------------------------------------------------------- |
| कोणतेही क्रेडेन्शियल नाही               | 401            | `प्रमाणीकरण आवश्यक आहे`                                                 |
| अवैध/कालबाह्य `oma_live_…`              | 401            | `अवैध किंवा कालबाह्य ॲक्सेस टोकन`                                       |
| `manage`/`admin` शिवाय वैध API की       | 403            | `API की मध्ये 'manage' स्कोप नाही. API कीज डॅशबोर्डमध्ये तो सक्षम करा.` |
| व्यवस्थापन मार्गावर अवैध सामान्य API की | 403            | `अवैध व्यवस्थापन टोकन`                                                  |
| ॲक्सेस टोकन स्कोप खूप कमी आहे           | 403            | `ॲक्सेस टोकन स्कोप '<have>' अपुरा आहे; '<need>' आवश्यक आहे.`            |

"`अवैध व्यवस्थापन टोकन`" याचा अर्थ धारक व्यवस्थापन क्रेडेन्शियल म्हणून **स्वीकारला गेला नाही**. ते तुम्हाला कोणत्या फॅमिलीचे टोकन तयार करायचे हे **सांगत नाही**. वरील सारणी वापरा: अनुमान कीजला `manage` स्कोप आवश्यक आहे; रिमोट CLI ला `oma_live_…` आवश्यक आहे; डॅशबोर्ड सेशन कुकी वापरतो.

---

## शिफारस केलेला कमी-विशेषाधिकार पर्याय

| कॉलर                                                    | वापर                                            |
| :------------------------------------------------------ | :---------------------------------------------- |
| ब्राउझर                                                 | डॅशबोर्ड सत्र                                   |
| सर्व्हर होस्टवरील CLI                                   | मशीन टोकन                                       |
| रिमोट सर्व्हरशी संवाद साधणारा लॅपटॉपवरील CLI            | `omniroute connect` मधून `oma_live_…`           |
| CI / स्क्रिप्ट्स (केवळ व्यवस्थापन)                      | कार्य करणाऱ्या सर्वात लहान स्कोपसह `oma_live_…` |
| CI ज्याला `/v1` आणि `/api` दोन्हीला कॉल करणे आवश्यक आहे | `manage` सह API की **किंवा** दोन क्रेडेन्शियल्स |
