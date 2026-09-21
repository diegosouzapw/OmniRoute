# Reasoning Routing (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_ROUTING.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_ROUTING.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_ROUTING.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_ROUTING.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_ROUTING.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_ROUTING.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_ROUTING.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_ROUTING.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_ROUTING.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_ROUTING.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_ROUTING.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_ROUTING.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_ROUTING.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_ROUTING.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_ROUTING.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_ROUTING.md)

---

तर्काधारित रूटिंग नियम विद्यमान मॉडेल आणि कॉम्बो रूटिंगचा विस्तार करतात. कोणताही सक्रिय नियम जुळत नसल्यास,
विद्यमान थिंकिंग, सफिक्स, कनेक्शन-डीफॉल्ट आणि प्रोव्हायडर-ट्रान्सलेशन वर्तन
अपरिवर्तित राहते.

## व्यवस्थापन

नियम व्यवस्थापन **Settings → Global Routing** अंतर्गत उपलब्ध आहे. API-की एडिटरमध्ये
निवडलेल्या कीनुसार फिल्टर केलेला समान व्यवस्थापन UI उपलब्ध आहे.

व्यवस्थापन API खालील रूट्सद्वारे उपलब्ध केला आहे:

- `/api/settings/reasoning-routing-rules` येथे `GET` आणि `POST`
- `/api/settings/reasoning-routing-rules/[id]` येथे `GET`, `PATCH` आणि `DELETE`
- `/api/settings/reasoning-routing-rules/simulate` येथे `POST`

सर्व रूट्स `requireManagementAuth` वापरतात. इनपुट्सचे प्रमाणीकरण
`src/shared/validation/schemas/reasoningRouting.ts` मधील स्कीमांद्वारे केले जाते. सिम्युलेटर कधीही अपस्ट्रीम कॉल करत नाही.

## नियम निराकरण

सुरुवातीचे मूल्यमापन नेमका एक नियम निवडते. स्कोप्स खालील क्रमाने तपासले जातात:

1. `apiKey`
2. `combo`
3. `model`
4. `global`

एखाद्या स्कोपमध्ये, आधी अधिक `priority` असलेला नियम निवडला जातो, त्यानंतर ग्लॉब पॅटर्नपेक्षा अचूक मॉडेल जुळणीला प्राधान्य दिले जाते,
आणि मग स्थिर `createdAt` व `id` क्रम वापरला जातो. `requestTags` केवळ `metadata.tags` मधून वाचले जातात
आणि `any` किंवा `all` जुळणीला समर्थन देतात.

`connection` नियमाचे मूल्यमापन केवळ तेव्हाच केले जाते, जेव्हा कोणताही सुरुवातीचा नियम निवडला गेलेला नसतो आणि विशिष्ट प्रोव्हायडर कनेक्शनची
आधीच निवड झालेली असते. हा नियम फक्त प्रयत्न-पातळी आणि बजेट बदलू शकतो.

## प्रयत्न-पातळी आणि बजेट

`sourceEffort` मध्ये `any`, `missing`, `none`, `low`, `medium`, `high`, `xhigh`, `max` आणि
`ultra` ही मूल्ये स्वीकारली जातात. `missing` म्हणजे विनंतीमध्ये स्वतंत्र प्रयत्न-पातळी, थिंकिंग टॉगल
किंवा थिंकिंग बजेट यांपैकी काहीही नाही. त्यामुळे केवळ बजेट असलेला सिग्नल फक्त `any` शी जुळतो.

`effortMode` चे तीन प्रकार आहेत:

- `inherit` क्लायंटची प्रयत्न-पातळी कायम ठेवतो आणि तरीही मॉडेल किंवा कॉम्बो बदलण्यास अनुमती देतो.
- `default` कोणताही स्पष्ट रीझनिंग सिग्नल नसल्यासच `targetEffort` सेट करतो.
- `force` स्वतंत्र प्रयत्न-पातळी `targetEffort` ने बदलतो.

स्वतंत्रपणे, `budgetAction` हे `preserve`, `remove` किंवा `set` असू शकते. `none` सह `force` वापरल्यास
सर्व ओळखली गेलेली प्रयत्न-पातळी आणि बजेट फील्ड्स काढून टाकली जातात. `set` सोबत `none` वापरणे अवैध आहे.

ज्ञात-असुसंगत मॉडेल्सना लक्ष्य करणाऱ्या विनंत्या अपस्ट्रीम कॉलपूर्वी नाकारल्या जातात. कॉम्बो
लक्ष्यांसाठी, असुसंगत नोंदी काढून टाकल्या जातात; कोणतीही नोंद शिल्लक न राहिल्यास विनंती `400` स्थिती परत करते.
अज्ञात क्षमता डेटामुळे इशारा दिला जातो आणि नियम सक्रिय ठेवला जातो.

## सुरक्षा आणि ट्रान्सपोर्ट्स

स्रोत आणि लक्ष्य मॉडेल किंवा स्रोत आणि लक्ष्य कॉम्बो यांच्यावर विद्यमान API-की
धोरण लागू राहते. रीझनिंग नियम कधीही मॉडेल, कॉम्बो किंवा कोटा परवानग्या विस्तारित करत नाही.

हे इंजिन Chat Completions, Responses, Anthropic Messages आणि अंतर्गत
Codex WebSocket पाथमध्ये एकात्मिक केले आहे. WebSocket पाथ केवळ Codex लक्ष्य मॉडेल्स स्वीकारतो; तेथे कॉम्बो लक्ष्ये
कार्यान्वित करता येत नाहीत. नियमाचा निर्णय विद्यमान रूट ट्रेसमध्ये कोणत्याही गुपितांशिवाय साठवला जातो.

## सातत्यपूर्ण संचयन

`src/lib/db/migrations/126_reasoning_routing_rules.sql` हे मायग्रेशन
`reasoning_routing_rules` टेबल तयार करते. नियम संग्रहित API कीज, कॉम्बोज आणि प्रोव्हायडर कनेक्शन्सचा संदर्भ घेतात.
हटवण्याच्या क्रियांमुळे संबंधित नियम साफ केले जातात. `src/lib/db/reasoningRoutingRules.ts` मधील
डेटाबेस अॅक्सेस स्तर विनंती पाथसाठी अमान्य करता येणारी कॅश सांभाळतो.

नियम SQLite बॅकअप्स, संपूर्ण डेटाबेस एक्सपोर्ट आणि config-sync बंडलमध्ये समाविष्ट केले जातात.
`reconcileReasoningRulesForSync` गहाळ संदर्भ असलेले आयात केलेले नियम अक्षम करते आणि त्या
विसंगतींचा अहवाल देते.
