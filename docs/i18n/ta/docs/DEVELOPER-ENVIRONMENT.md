# Developer environment notes (தமிழ்)

🌐 **Languages:** 🇺🇸 [English](../../../DEVELOPER-ENVIRONMENT.md) · 🇪🇹 [am](../../am/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇦 [ar](../../ar/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇿 [az](../../az/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇬 [bg](../../bg/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇩 [bn](../../bn/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇦 [bs](../../bs/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇿 [cs](../../cs/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇰 [da](../../da/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇪 [de](../../de/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇷 [el](../../el/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇸 [es](../../es/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇪 [et](../../et/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇷 [fa](../../fa/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇮 [fi](../../fi/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇷 [fr](../../fr/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇪 [ga](../../ga/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [gu](../../gu/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ha](../../ha/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇱 [he](../../he/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [hi](../../hi/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇷 [hr](../../hr/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇺 [hu](../../hu/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇲 [hy](../../hy/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇩 [id](../../id/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ig](../../ig/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇹 [it](../../it/docs/DEVELOPER-ENVIRONMENT.md) · 🇯🇵 [ja](../../ja/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇪 [ka](../../ka/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇭 [km](../../km/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [kn](../../kn/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇷 [ko](../../ko/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇹 [lt](../../lt/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇻 [lv](../../lv/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ml](../../ml/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [mr](../../mr/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇾 [ms](../../ms/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇹 [mt](../../mt/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇲 [my](../../my/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇵 [ne](../../ne/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇱 [nl](../../nl/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇴 [no](../../no/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [or](../../or/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [pa](../../pa/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇭 [phi](../../phi/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇱 [pl](../../pl/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇹 [pt](../../pt/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇴 [ro](../../ro/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇺 [ru](../../ru/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇰 [si](../../si/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇰 [sk](../../sk/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇮 [sl](../../sl/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇸 [sr](../../sr/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇪 [sv](../../sv/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇪 [sw](../../sw/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [te](../../te/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇭 [th](../../th/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇷 [tr](../../tr/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇰 [ur](../../ur/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇿 [uz](../../uz/docs/DEVELOPER-ENVIRONMENT.md) · 🇻🇳 [vi](../../vi/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [yo](../../yo/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇼 [zh-TW](../../zh-TW/docs/DEVELOPER-ENVIRONMENT.md)

---

OmniRoute-ஐ உருவாக்கும்போது, திட்டத்தின் உள்ளூர் `.env` செயல்பாடு மற்றும் சூழல் கோப்புகளையும் ரகசியங்களையும் எவ்வாறு கையாள வேண்டும் என்பதையும் இந்தப் பக்கம் விளக்குகிறது.

## .env postinstall செயல்பாடு

உருவாக்குநர்களின் வசதிக்காக, `npm install` / `postinstall` செயல்பாட்டின்போது திட்டம் உள்ளூர் `.env` கோப்பை உருவாக்கக்கூடும். இந்தக் கோப்பு உள்ளூர் உருவாக்கம் மற்றும் சோதனைக்கு மட்டுமே பயன்படுத்தப்பட வேண்டும்; பதிப்புக் கட்டுப்பாட்டில் ஒருபோதும் commit செய்யப்படக்கூடாது.

முக்கியக் குறிப்புகள்:

- களஞ்சியத்தின் `.gitignore` ஏற்கனவே `.env*` கோப்புகளைப் புறக்கணிக்கிறது (`.gitignore` பதிவைப் பார்க்கவும்). ஒரு குறிப்பிட்ட எடுத்துக்காட்டுக் கோப்பை commit செய்ய நீங்கள் திட்டமிட்டு, அதற்கான ஆவணப்படுத்தப்பட்ட செயல்முறையை வைத்திருந்தால் தவிர, அந்த விதியை நீக்கவோ மாற்றவோ வேண்டாம்.
- உண்மையான ரகசியம் தவறுதலாக repo-வில் commit செய்யப்பட்டால், அந்த நற்சான்றை உடனடியாகச் சுழற்றவும்/திரும்பப் பெறவும்; மேலும், அதை களஞ்சிய வரலாற்றிலிருந்து அகற்றவும் (எடுத்துக்காட்டாக, `git filter-repo` அல்லது அதற்கு இணையான சரிசெய்தல் பணிப்பாய்வைப் பயன்படுத்தி). உதவி தேவைப்பட்டால் பாதுகாப்பு/தொடர்பு உரிமையாளரைத் தொடர்புகொள்ளவும்.
- CI மற்றும் உற்பத்திச் சூழலுக்கு, ரகசியங்களைக் கோப்புகளில் commit செய்வதற்குப் பதிலாக CI ரகசியங்கள் அல்லது ரகசிய மேலாளரைப் பயன்படுத்தவும் (GitHub Actions Secrets, Azure Key Vault, HashiCorp Vault போன்றவை).

## பரிந்துரைக்கப்படும் உள்ளூர் பணிப்பாய்வு

- `.env` கோப்பை உங்கள் உள்ளூர் பணியிடத்தில் மட்டுமே வைத்திருக்கவும். தேவையான மாறிகள் மற்றும் ஏற்கத்தக்க எடுத்துக்காட்டு மதிப்புகளை ஆவணப்படுத்த, ஏற்கனவே கண்காணிக்கப்படும் `.env.example` கோப்பைப் பயன்படுத்தவும்.
- ரகசியம் போன்ற மதிப்புகள் தேவைப்படும் சோதனைகளை உள்ளூரில் இயக்கும்போது, உண்மையான நற்சான்றுகளுக்குப் பதிலாக செயற்கையான இடநிரப்பிகள் அல்லது இயக்க நேரத்தில் உருவாக்கப்படும் தற்காலிக விசைகளைப் பயன்படுத்த விரும்பவும்.
- இடநிரப்பிகளைப் பயன்படுத்தும் சோதனைகளில் ஒரு சுருக்கமான கருத்தைச் சேர்க்கவும்; இதனால் அந்தச் சோதனைத் தரவு செயற்கையானது என்பதை மதிப்பாய்வாளர்கள் புரிந்துகொள்ள முடியும்.

## ஸ்கேனர் குறிப்புகள்

- சில தொகுக்கப்பட்ட அல்லது இருமச் சொத்துகளில் (எ.கா., உட்பொதிக்கப்பட்ட base64 WASM blobs) நற்சான்றுகளைப் போலத் தோன்றும் ASCII துணைச்சரங்கள் இருக்கலாம்; அவை உரை அடிப்படையிலான ரகசிய ஸ்கேனர்களைத் தூண்டக்கூடும். இந்தச் சொத்துகள் முறையானவை என்றால், அவற்றை ஸ்கேனரின் அனுமதிப் பட்டியலில் குறிக்கவும் அல்லது ஸ்கேனர் உள்ளமைவில் அந்தக் கோப்பகங்களை விலக்கவும்.

## கசிவைக் கண்டறிந்தால்

1. விசையை உடனடியாகச் சுழற்றவும்/திரும்பப் பெறவும்.
2. வரலாற்றிலிருந்து ரகசியத்தை அகற்றி, தேவைப்பட்டால் சுத்தப்படுத்தப்பட்ட கிளையை force-push செய்யவும்.
3. பராமரிப்பாளர்களுக்கு அறிவித்து, உங்கள் நிறுவனத்தின் சம்பவ மறுமொழிச் சரிபார்ப்புப் பட்டியலைப் பின்பற்றவும்.
