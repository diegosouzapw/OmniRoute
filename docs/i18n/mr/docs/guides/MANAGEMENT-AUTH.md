# Management Authentication (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute मध्ये व्यवस्थापन मार्गांना अधिकृत करू शकणारी **चार क्रेडेन्शियल कुटुंबे** आहेत.
ती एकमेकांच्या जागी वापरता येत नाहीत. इन्फरन्स API की (`sk-…`) ला स्पष्टपणे `manage` किंवा `admin` व्याप्ती दिलेली नसल्यास, ती सर्व्हरचे व्यवस्थापन **करू शकत नाही**.

अधिकृत अंमलबजावणी: `src/lib/api/requireManagementAuth.ts`.

| क्रेडेन्शियल             | सामान्य स्वरूप                 | कुठे तयार केले जाते                                    | अपेक्षित वापर                 | व्यवस्थापन क्षमता                                                                          |
| ------------------------ | ------------------------------ | ------------------------------------------------------ | ----------------------------- | ------------------------------------------------------------------------------------------ |
| डॅशबोर्ड JWT सत्र        | `auth_token` कुकी              | डॅशबोर्ड लॉगिन                                         | ब्राउझर UI                    | CSRF, स्थानिकता आणि नेहमी-संरक्षित-मार्ग नियमांच्या अधीन राहून संपूर्ण डॅशबोर्ड व्यवस्थापन |
| CLI मशीन-ID टोकन         | अंतर्गत / स्थानिक              | CLI बूटस्ट्रॅप (त्याच मशीनवरील `omniroute`)            | स्थानिक CLI                   | केवळ स्थानिक व्यवस्थापन                                                                    |
| व्याप्तीबद्ध ॲक्सेस टोकन | `oma_live_…`                   | **सेटिंग्ज → ॲक्सेस टोकन्स** किंवा `omniroute connect` | दूरस्थ CLI आणि व्यवस्थापन API | मार्गासाठी आवश्यक असलेली `read`, `write` किंवा `admin` व्याप्ती पूर्ण करणे आवश्यक          |
| इन्फरन्स API की          | `sk-…` (आणि इतर API-की उपसर्ग) | **API व्यवस्थापक / API कीज**                           | `/v1/*` इन्फरन्स              | कीच्या मेटाडेटामध्ये `manage` किंवा `admin` समाविष्ट नसल्यास **काहीही नाही**               |

`oma_` क्रेडेन्शियल्स ही व्यवस्थापन/CLI क्रेडेन्शियल्स आहेत. ती इन्फरन्स API कीज **नाहीत**.

सर्व्हरसाठी लॉगिन/API-की प्रमाणीकरण अक्षम केले असल्यास, काही व्यवस्थापन मार्ग अप्रमाणित कॉल स्वीकारू शकतात. केवळ-स्थानिक आणि नेहमी-संरक्षित मार्गांवर त्यांचे स्वतःचे नियम अद्याप लागू होतात. त्यामुळे यांपैकी एखादे क्रेडेन्शियल सादर करणे सार्वत्रिकपणे अनिवार्य नाही आणि आवश्यक व्याप्ती व मार्गाची स्थानिकता नसताना एखादे क्रेडेन्शियल असणेही सार्वत्रिकपणे पुरेसे नाही.

संबंधित: [दूरस्थ मोड](./REMOTE-MODE.md) (दूरस्थ CLI साठी `oma_live_…` कसे तयार केले जाते).

---

## व्याप्ती मॅट्रिक्स

API-की व्यवस्थापन व्याप्ती आणि ॲक्सेस-टोकन व्याप्ती यांची शब्दसंग्रह वेगवेगळी आहेत.
MCP साधन व्याप्ती हा तिसरा शब्दसंग्रह आहे; तो खालील तक्त्यांमधील कोणत्याही फंक्शनऐवजी `scopeMatches` वापरून तपासला जातो. बाजूबाजूने तुलना:
[तीन व्याप्ती नेमस्पेसेस](../frameworks/MCP-SERVER.md#three-scope-namespaces).

### ॲक्सेस टोकन व्याप्ती (`oma_live_…`)

| व्याप्ती | सामान्य ऑपरेशन्स                                                        |
| -------- | ----------------------------------------------------------------------- |
| `read`   | टोकनला पाहण्याची परवानगी असलेल्या सूची/स्थिती GET विनंत्या              |
| `write`  | ॲडमिनपेक्षा कमी स्तरावरील बदल (तयार करणे/अपडेट करणे/हटवणे)              |
| `admin`  | संपूर्ण दूरस्थ CLI / कनेक्ट टोकन (पासवर्ड बूटस्ट्रॅप येथे डीफॉल्ट होते) |

`read` असलेले टोकन `write` मार्गाला कॉल करू शकत नाही. रनटाइम संदेशाचे स्वरूप:
`Access token scope '<have>' is insufficient; '<need>' required.`

### API-की व्यवस्थापन व्याप्ती

| व्याप्ती      | अर्थ                                                                  |
| ------------- | --------------------------------------------------------------------- |
| (काहीही नाही) | केवळ इन्फरन्स. व्यवस्थापन मार्ग 403 परत करतात.                        |
| `manage`      | व्यवस्थापन API (`requireManagementAuth` च्या API-की शाखेप्रमाणेच गेट) |
| `admin`       | `hasManageScope` देखील पूर्ण करते (व्यवस्थापन-सक्षम मानले जाते)       |

API कीज / API व्यवस्थापक UI मध्ये कीसाठी `manage` सक्षम करा. तुम्ही ती व्याप्ती जाणीवपूर्वक दिलेली नसल्यास, स्वयंचलनासाठी चॅट क्लायंट कीचा पुनर्वापर करू नका.

---

## कसे तयार करावे आणि रद्द करावे

### डॅशबोर्ड JWT सत्र

1. `/login` उघडा आणि व्यवस्थापन पासवर्डने साइन इन करा (पहिल्यांदा सुरू करताना `INITIAL_PASSWORD`).
2. `auth_token` कुकी HttpOnly आहे. ब्राउझर डॅशबोर्ड ती स्वयंचलितपणे वापरतो.
3. `/api/auth/logout` द्वारे लॉग आउट करा. कॉपी करण्यासाठी कोणतेही दीर्घकालीन गुपित नाही.

### CLI machine-id टोकन

1. सर्व्हरच्या **त्याच होस्टवर** `omniroute` चालवा (loopback).
2. CLI `~/.omniroute/` अंतर्गत machine-id टोकन प्रारंभिकरित्या तयार करतो (chmod 600).
3. हे दुसऱ्या मशीनवरून कार्य करत **नाही**. दूरस्थ CLI साठी Access Token वापरा.

### व्याप्ती असलेले Access Token (`oma_live_…`)

1. डॅशबोर्ड: **Settings → Access Tokens** → तयार करा (नाव + व्याप्ती). **गुपित फक्त एकदाच दाखवले जाते.**
2. किंवा CLI: `omniroute connect <host>` (पासवर्ड → टोकन). [Remote Mode](./REMOTE-MODE.md) पहा.
3. हेडर: `Authorization: Bearer oma_live_…`
4. त्याच Access Tokens पृष्ठावरून रद्द करा (किंवा CLI संदर्भ हटवा).
5. सर्व्हर फक्त hash साठवतो. साध्या मजकुरातील मूल्याला पासवर्डप्रमाणे हाताळा.

### `manage` व्याप्ती असलेली API key

1. डॅशबोर्ड: **API Manager / API Keys** → key तयार करा किंवा संपादित करा → `manage` (किंवा `admin`) सक्षम करा.
2. हेडर: `Authorization: Bearer sk-…` (key चा प्रत्यक्ष prefix).
3. त्याच UI मध्ये key रद्द करा किंवा त्यातून `manage` काढून टाका.
4. CLI नसलेल्या स्वयंचलनासाठी किमान विशेषाधिकार वापरा: केवळ GET कार्यांसाठी `read` Access Token ला प्राधान्य द्या; कॉल करणाऱ्या घटकाला `/v1` आणि व्यवस्थापन या दोन्हींशी संवाद साधणे आवश्यक असेल तेव्हाच API key वर `manage` वापरा.

---

## हेडर स्वरूप

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

व्यवस्थापन क्रेडेन्शियल्स URL path किंवा query string मध्ये ठेवू नका. व्यवस्थापन
प्रमाणीकरण फक्त header/cookie द्वारेच केले जाते.

---

## कॉपी-पेस्ट उदाहरणे

फक्त-वाचन (providers ची यादी). `read` Access Token वापरा:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

बदल करणे (provider connection तयार करणे). `write`/`admin` Access Token किंवा
`manage` व्याप्ती असलेली API key वापरा:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

Inference (व्यवस्थापन नाही). सामान्य API key; `manage` आवश्यक नाही:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## सध्याच्या runtime त्रुटी (गुपिते प्रतिसादात दाखवू नका)

| परिस्थिती                                  | नेहमीचा status | संदेश (संवेदनशील तपशील काढलेला)                                      |
| ------------------------------------------ | -------------- | -------------------------------------------------------------------- |
| क्रेडेन्शियल नाही                          | 401            | `Authentication required`                                            |
| अवैध/कालबाह्य `oma_live_…`                 | 401            | `Invalid or expired access token`                                    |
| `manage`/`admin` नसलेली वैध API key        | 403            | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| व्यवस्थापन route वरील अवैध सामान्य API key | 403            | `Invalid management token`                                           |
| Access Token ची व्याप्ती अपुरी             | 403            | `Access token scope '<have>' is insufficient; '<need>' required.`    |

`Invalid management token` याचा अर्थ bearer हे व्यवस्थापन क्रेडेन्शियल म्हणून
स्वीकारले गेले **नाही**. यावरून कोणत्या प्रकारचे क्रेडेन्शियल तयार करायचे हे समजत
**नाही**. वरील तक्ता वापरा: inference keys साठी `manage` व्याप्ती आवश्यक आहे;
दूरस्थ CLI साठी `oma_live_…` आवश्यक आहे; डॅशबोर्ड session cookie वापरतो.

---

## शिफारस केलेला किमान-विशेषाधिकार पर्याय

| कॉलर                                                 | वापर                                                       |
| ---------------------------------------------------- | ---------------------------------------------------------- |
| ब्राउझर                                              | डॅशबोर्ड सत्र                                              |
| सर्व्हर होस्टवरील CLI                                | मशीन टोकन                                                  |
| रिमोट सर्व्हरशी संवाद साधणाऱ्या लॅपटॉपवरील CLI       | `omniroute connect` मधील `oma_live_…`                      |
| CI / स्क्रिप्ट्स (केवळ व्यवस्थापनासाठी)              | कार्य करणाऱ्या सर्वात लहान व्याप्तीसह `oma_live_…`         |
| `/v1` आणि `/api` दोन्हींना कॉल करणे आवश्यक असलेले CI | `manage` सह API की **किंवा** दोन प्रमाणीकरण क्रेडेन्शियल्स |
