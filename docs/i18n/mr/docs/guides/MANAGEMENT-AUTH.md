# Management Authentication (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute मध्ये व्यवस्थापन रूट्सना अधिकृत करण्यासाठी **क्रेडेन्शियल्सचे चार प्रकार** आहेत.
ते परस्पर अदलाबदल करण्यायोग्य नाहीत. इन्फरन्स API की (`sk-…`) ना स्पष्टपणे
`manage` किंवा `admin` स्कोप दिलेला नसल्यास त्या सर्व्हरचे व्यवस्थापन **करत नाहीत**.

अधिकृत अंमलबजावणी: `src/lib/api/requireManagementAuth.ts`.

| क्रेडेन्शियल              | सामान्य स्वरूप                     | कुठे तयार केले जाते                                    | अपेक्षित वापर                | व्यवस्थापन क्षमता                                                                        |
| ------------------------- | ---------------------------------- | ------------------------------------------------------ | ---------------------------- | ---------------------------------------------------------------------------------------- |
| डॅशबोर्ड JWT सेशन         | `auth_token` कुकी                  | डॅशबोर्ड लॉगिन                                         | ब्राउझर UI                   | CSRF, स्थानिकता आणि नेहमी-संरक्षित-रूट नियमांच्या अधीन राहून संपूर्ण डॅशबोर्ड व्यवस्थापन |
| CLI machine-id टोकन       | अंतर्गत / स्थानिक                  | CLI बूटस्ट्रॅप (त्याच मशीनवरील `omniroute`)            | स्थानिक CLI                  | केवळ स्थानिक व्यवस्थापन                                                                  |
| स्कोप असलेले Access Token | `oma_live_…`                       | **Settings → Access Tokens** किंवा `omniroute connect` | रिमोट CLI आणि व्यवस्थापन API | रूटसाठी आवश्यक असलेला `read`, `write` किंवा `admin` स्कोप पूर्ण करणे आवश्यक              |
| इन्फरन्स API की           | `sk-…` (आणि इतर API-key प्रीफिक्स) | **API Manager / API Keys**                             | `/v1/*` इन्फरन्स             | कीच्या मेटाडेटामध्ये `manage` किंवा `admin` समाविष्ट नसल्यास **काहीही नाही**             |

`oma_` क्रेडेन्शियल्स ही व्यवस्थापन/CLI क्रेडेन्शियल्स आहेत. ती इन्फरन्स API की **नाहीत**.

सर्व्हरसाठी लॉगिन/API-key प्रमाणीकरण अक्षम केलेले असल्यास, काही व्यवस्थापन रूट्स
प्रमाणीकरण नसलेल्या कॉल्सचा स्वीकार करू शकतात. केवळ-स्थानिक आणि नेहमी-संरक्षित रूट्सवर
त्यांचे स्वतःचे नियम तरीही लागू होतात. त्यामुळे यापैकी एखादे क्रेडेन्शियल सादर करणे
सर्व परिस्थितींमध्ये अनिवार्य नाही आणि आवश्यक स्कोप व रूट स्थानिकतेशिवाय ते असणेही
सर्व परिस्थितींमध्ये पुरेसे नाही.

संबंधित: [रिमोट मोड](./REMOTE-MODE.md) (रिमोट CLI साठी `oma_live_…` कसे जारी केले जाते).

---

## स्कोप मॅट्रिक्स

या दोन स्कोप शब्दसंग्रहांमध्ये **फरक आहे**. ते एकत्र मिसळू नका.

### Access Token स्कोप्स (`oma_live_…`)

| स्कोप   | सामान्य ऑपरेशन्स                                                        |
| ------- | ----------------------------------------------------------------------- |
| `read`  | टोकनला पाहण्याची अनुमती असलेल्या सूची/स्थिती GET विनंत्या               |
| `write` | अॅडमिनपेक्षा कमी पातळीवरील बदल (तयार करणे/अपडेट करणे/हटवणे)             |
| `admin` | संपूर्ण रिमोट CLI / कनेक्ट टोकन (पासवर्ड बूटस्ट्रॅपसाठी हा डीफॉल्ट आहे) |

`read` असलेले टोकन `write` रूटला कॉल करू शकत नाही. रनटाइम संदेशाचे स्वरूप:
`Access token scope '<have>' is insufficient; '<need>' required.`

### API-key व्यवस्थापन स्कोप्स

| स्कोप         | अर्थ                                                                 |
| ------------- | -------------------------------------------------------------------- |
| (काहीही नाही) | केवळ इन्फरन्स. व्यवस्थापन रूट्स 403 परत करतात.                       |
| `manage`      | व्यवस्थापन API (`requireManagementAuth` च्या API-key शाखेसारखेच गेट) |
| `admin`       | `hasManageScope` सुद्धा पूर्ण करते (व्यवस्थापन-सक्षम मानले जाते)     |

API Keys / API Manager UI मध्ये कीसाठी `manage` सक्षम करा. तुम्ही तो स्कोप
जाणीवपूर्वक दिलेला नसल्यास, ऑटोमेशनसाठी चॅट क्लायंटची की पुन्हा वापरू नका.

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

## सध्याच्या रनटाइम त्रुटी (गुपिते प्रदर्शित करू नका)

| परिस्थिती                            | नेहमीचा स्टेटस | संदेश (संवेदनशील माहिती काढलेली)                                     |
| ------------------------------------ | -------------- | -------------------------------------------------------------------- |
| क्रेडेन्शियल नाही                    | 401            | `Authentication required`                                            |
| अवैध/कालबाह्य `oma_live_…`           | 401            | `Invalid or expired access token`                                    |
| `manage`/`admin` नसलेली वैध API की   | 403            | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| व्यवस्थापन रूटवर अवैध सामान्य API की | 403            | `Invalid management token`                                           |
| Access Token स्कोप अपुरा             | 403            | `Access token scope '<have>' is insufficient; '<need>' required.`    |

"Invalid management token" म्हणजे बेअरर व्यवस्थापन क्रेडेन्शियल म्हणून **स्वीकारला गेला नाही**.
यावरून कोणत्या प्रकारचे क्रेडेन्शियल तयार करायचे हे **समजत नाही**. वरील तक्ता वापरा:
इन्फरन्स कीजना `manage` स्कोप आवश्यक आहे; रिमोट CLI ला `oma_live_…` आवश्यक आहे; डॅशबोर्ड
सेशन कुकी वापरतो.

---

## शिफारस केलेला किमान-विशेषाधिकार पर्याय

| कॉलर                                                 | वापर                                                               |
| ---------------------------------------------------- | ------------------------------------------------------------------ |
| ब्राउझर                                              | डॅशबोर्ड सेशन                                                      |
| सर्व्हर होस्टवरील CLI                                | मशीन टोकन                                                          |
| रिमोट सर्व्हरशी संवाद साधणाऱ्या लॅपटॉपवरील CLI       | `omniroute connect` मधून मिळणारे `oma_live_…`                      |
| CI / स्क्रिप्ट्स (केवळ व्यवस्थापन)                   | कार्य करण्यासाठी आवश्यक असलेल्या सर्वांत लहान स्कोपसह `oma_live_…` |
| `/v1` आणि `/api` दोन्हींना कॉल करणे आवश्यक असलेला CI | `manage` असलेली API की **किंवा** दोन क्रेडेन्शियल्स                |
