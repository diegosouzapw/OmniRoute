# Developer environment notes (മലയാളം)

🌐 **Languages:** 🇺🇸 [English](../../../DEVELOPER-ENVIRONMENT.md) · 🇪🇹 [am](../../am/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇦 [ar](../../ar/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇿 [az](../../az/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇬 [bg](../../bg/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇩 [bn](../../bn/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇿 [cs](../../cs/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇰 [da](../../da/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇪 [de](../../de/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇷 [el](../../el/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇸 [es](../../es/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇪 [et](../../et/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇷 [fa](../../fa/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇮 [fi](../../fi/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇷 [fr](../../fr/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇪 [ga](../../ga/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [gu](../../gu/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ha](../../ha/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇱 [he](../../he/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [hi](../../hi/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇷 [hr](../../hr/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇺 [hu](../../hu/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇲 [hy](../../hy/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇩 [id](../../id/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ig](../../ig/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇹 [it](../../it/docs/DEVELOPER-ENVIRONMENT.md) · 🇯🇵 [ja](../../ja/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇪 [ka](../../ka/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇭 [km](../../km/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [kn](../../kn/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇷 [ko](../../ko/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇹 [lt](../../lt/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇻 [lv](../../lv/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [mr](../../mr/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇾 [ms](../../ms/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇹 [mt](../../mt/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇲 [my](../../my/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇵 [ne](../../ne/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇱 [nl](../../nl/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇴 [no](../../no/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [or](../../or/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [pa](../../pa/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇭 [phi](../../phi/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇱 [pl](../../pl/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇹 [pt](../../pt/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇴 [ro](../../ro/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇺 [ru](../../ru/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇰 [si](../../si/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇰 [sk](../../sk/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇮 [sl](../../sl/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇸 [sr](../../sr/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇪 [sv](../../sv/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇪 [sw](../../sw/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ta](../../ta/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [te](../../te/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇭 [th](../../th/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇷 [tr](../../tr/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇰 [ur](../../ur/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇿 [uz](../../uz/docs/DEVELOPER-ENVIRONMENT.md) · 🇻🇳 [vi](../../vi/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [yo](../../yo/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇼 [zh-TW](../../zh-TW/docs/DEVELOPER-ENVIRONMENT.md)

---

OmniRoute വികസിപ്പിക്കുമ്പോൾ പ്രോജക്റ്റിന്റെ ലോക്കൽ `.env` പ്രവർത്തനരീതിയും എൻവയോൺമെന്റ് ഫയലുകളും രഹസ്യങ്ങളും എങ്ങനെ കൈകാര്യം ചെയ്യണമെന്നതും ഈ പേജ് വിശദീകരിക്കുന്നു.

## .env postinstall പ്രവർത്തനരീതി

ഡെവലപ്പർമാരുടെ സൗകര്യത്തിനായി `npm install` / `postinstall` സമയത്ത് പ്രോജക്റ്റ് ഒരു ലോക്കൽ `.env` ഫയൽ സൃഷ്ടിച്ചേക്കാം. ഈ ഫയൽ ലോക്കൽ ഡെവലപ്മെന്റിനും പരിശോധനയ്ക്കും മാത്രമുള്ളതാണ്; ഇത് ഒരിക്കലും വേർഷൻ കൺട്രോളിൽ കമ്മിറ്റ് ചെയ്യരുത്.

പ്രധാന കാര്യങ്ങൾ:

- റിപ്പോസിറ്ററിയിലെ `.gitignore` ഇതിനകം തന്നെ `.env*` ഫയലുകളെ അവഗണിക്കുന്നു (`.gitignore` എൻട്രി കാണുക). ഒരു നിർദിഷ്ട ഉദാഹരണ ഫയൽ കമ്മിറ്റ് ചെയ്യാൻ നിങ്ങൾ ബോധപൂർവം ഉദ്ദേശിക്കുകയും അതിനായി രേഖപ്പെടുത്തിയ ഒരു പ്രക്രിയ ഉണ്ടായിരിക്കുകയും ചെയ്യുന്നില്ലെങ്കിൽ, ആ നിയമം നീക്കം ചെയ്യുകയോ മാറ്റുകയോ ചെയ്യരുത്.
- ഒരു യഥാർഥ രഹസ്യം അബദ്ധത്തിൽ റിപ്പോയിലേക്ക് കമ്മിറ്റ് ചെയ്താൽ, ക്രെഡൻഷ്യൽ ഉടൻ റൊട്ടേറ്റ് ചെയ്യുകയോ റിവോക്ക് ചെയ്യുകയോ ചെയ്യുക; കൂടാതെ അത് റിപ്പോസിറ്ററി ചരിത്രത്തിൽനിന്ന് നീക്കം ചെയ്യുക (ഉദാഹരണത്തിന്, `git filter-repo` അല്ലെങ്കിൽ സമാനമായ പരിഹാര വർക്ക്ഫ്ലോ ഉപയോഗിച്ച്). സഹായം ആവശ്യമെങ്കിൽ സുരക്ഷാ/കോൺടാക്റ്റ് ഉടമയെ ബന്ധപ്പെടുക.
- CI-യ്ക്കും പ്രൊഡക്ഷനും വേണ്ടി, രഹസ്യങ്ങൾ ഫയലുകളിലേക്ക് കമ്മിറ്റ് ചെയ്യുന്നതിനുപകരം CI സീക്രെറ്റുകളോ സീക്രെറ്റ്സ് മാനേജറോ (GitHub Actions Secrets, Azure Key Vault, HashiCorp Vault മുതലായവ) ഉപയോഗിക്കുക.

## ശുപാർശ ചെയ്യുന്ന ലോക്കൽ വർക്ക്ഫ്ലോ

- `.env` നിങ്ങളുടെ ലോക്കൽ വർക്ക്സ്പേസിൽ മാത്രം സൂക്ഷിക്കുക. ആവശ്യമായ വേരിയബിളുകളും സ്വീകാര്യമായ ഉദാഹരണ മൂല്യങ്ങളും രേഖപ്പെടുത്താൻ `.env.example` (ഇതിനകം ട്രാക്ക് ചെയ്തിരിക്കുന്നത്) ഉപയോഗിക്കുക.
- രഹസ്യങ്ങളോട് സാമ്യമുള്ള മൂല്യങ്ങൾ ആവശ്യമായ ടെസ്റ്റുകൾ ലോക്കലായി പ്രവർത്തിപ്പിക്കുമ്പോൾ, യഥാർഥ ക്രെഡൻഷ്യലുകൾക്കുപകരം സിന്തറ്റിക് പ്ലേസ്ഹോൾഡറുകളോ റൺടൈമിൽ സൃഷ്ടിക്കുന്ന താൽക്കാലിക കീകളോ ഉപയോഗിക്കുക.
- പ്ലേസ്ഹോൾഡറുകൾ ഉപയോഗിക്കുന്ന ടെസ്റ്റുകളിൽ, ഫിക്ചർ സിന്തറ്റിക് ആണെന്ന് റിവ്യൂവർമാർക്ക് മനസ്സിലാകുന്നതിനായി ഒരു ചെറിയ കമന്റ് ചേർക്കുക.

## സ്കാനറിനെക്കുറിച്ചുള്ള കുറിപ്പുകൾ

- കംപൈൽ ചെയ്തതോ ബൈനറിയായതോ ആയ ചില അസറ്റുകളിൽ (ഉദാ., ഉൾച്ചേർത്ത base64 WASM ബ്ലോബുകൾ) ക്രെഡൻഷ്യലുകളായി തോന്നുന്ന ASCII സബ്സ്ട്രിങ്ങുകൾ ഉണ്ടായേക്കാം; അവ ടെക്സ്റ്റ് അധിഷ്ഠിത സീക്രെറ്റ് സ്കാനറുകളെ ട്രിഗർ ചെയ്തേക്കാം. ഈ അസറ്റുകൾ സാധുതയുള്ളവയാണെങ്കിൽ, അവയെ സ്കാനറിന്റെ അലൗലിസ്റ്റിൽ അടയാളപ്പെടുത്തുക അല്ലെങ്കിൽ സ്കാനർ കോൺഫിഗിൽ ബന്ധപ്പെട്ട ഡയറക്ടറികളെ ഒഴിവാക്കുക.

## ഒരു ചോർച്ച കണ്ടെത്തിയാൽ

1. കീ ഉടൻ റൊട്ടേറ്റ് ചെയ്യുകയോ റിവോക്ക് ചെയ്യുകയോ ചെയ്യുക.
2. ചരിത്രത്തിൽനിന്ന് രഹസ്യം നീക്കം ചെയ്യുക; ആവശ്യമെങ്കിൽ ശുദ്ധീകരിച്ച ബ്രാഞ്ച് ഫോഴ്സ്-പുഷ് ചെയ്യുക.
3. മെയിന്റെയ്നർമാരെ അറിയിക്കുകയും നിങ്ങളുടെ സ്ഥാപനത്തിന്റെ ഇൻസിഡന്റ് റെസ്പോൺസ് ചെക്ക്ലിസ്റ്റ് പിന്തുടരുകയും ചെയ്യുക.
