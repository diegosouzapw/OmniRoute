# Developer environment notes (ਪੰਜਾਬੀ)

🌐 **Languages:** 🇺🇸 [English](../../../DEVELOPER-ENVIRONMENT.md) · 🇪🇹 [am](../../am/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇦 [ar](../../ar/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇿 [az](../../az/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇬 [bg](../../bg/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇩 [bn](../../bn/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇦 [bs](../../bs/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇿 [cs](../../cs/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇰 [da](../../da/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇪 [de](../../de/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇷 [el](../../el/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇸 [es](../../es/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇪 [et](../../et/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇷 [fa](../../fa/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇮 [fi](../../fi/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇷 [fr](../../fr/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇪 [ga](../../ga/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [gu](../../gu/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ha](../../ha/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇱 [he](../../he/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [hi](../../hi/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇷 [hr](../../hr/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇺 [hu](../../hu/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇲 [hy](../../hy/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇩 [id](../../id/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ig](../../ig/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇹 [it](../../it/docs/DEVELOPER-ENVIRONMENT.md) · 🇯🇵 [ja](../../ja/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇪 [ka](../../ka/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇭 [km](../../km/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [kn](../../kn/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇷 [ko](../../ko/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇹 [lt](../../lt/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇻 [lv](../../lv/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ml](../../ml/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [mr](../../mr/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇾 [ms](../../ms/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇹 [mt](../../mt/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇲 [my](../../my/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇵 [ne](../../ne/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇱 [nl](../../nl/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇴 [no](../../no/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [or](../../or/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇭 [phi](../../phi/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇱 [pl](../../pl/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇹 [pt](../../pt/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇴 [ro](../../ro/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇺 [ru](../../ru/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇰 [si](../../si/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇰 [sk](../../sk/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇮 [sl](../../sl/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇸 [sr](../../sr/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇪 [sv](../../sv/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇪 [sw](../../sw/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ta](../../ta/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [te](../../te/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇭 [th](../../th/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇷 [tr](../../tr/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇰 [ur](../../ur/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇿 [uz](../../uz/docs/DEVELOPER-ENVIRONMENT.md) · 🇻🇳 [vi](../../vi/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [yo](../../yo/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇼 [zh-TW](../../zh-TW/docs/DEVELOPER-ENVIRONMENT.md)

---

ਇਹ ਪੰਨਾ ਪ੍ਰੋਜੈਕਟ ਦੇ ਸਥਾਨਕ `.env` ਵਿਹਾਰ ਅਤੇ OmniRoute ਨੂੰ ਡਿਵੈਲਪ ਕਰਦੇ ਸਮੇਂ environment ਫ਼ਾਈਲਾਂ ਅਤੇ secrets ਨੂੰ ਸੰਭਾਲਣ ਦੇ ਤਰੀਕੇ ਬਾਰੇ ਦੱਸਦਾ ਹੈ।

## .env postinstall ਵਿਹਾਰ

ਡਿਵੈਲਪਰਾਂ ਦੀ ਸਹੂਲਤ ਲਈ ਪ੍ਰੋਜੈਕਟ `npm install` / `postinstall` ਦੌਰਾਨ ਇੱਕ ਸਥਾਨਕ `.env` ਫ਼ਾਈਲ ਤਿਆਰ ਕਰ ਸਕਦਾ ਹੈ। ਇਹ ਫ਼ਾਈਲ ਸਿਰਫ਼ ਸਥਾਨਕ ਡਿਵੈਲਪਮੈਂਟ ਅਤੇ ਟੈਸਟਿੰਗ ਲਈ ਹੈ ਅਤੇ ਇਸਨੂੰ ਕਦੇ ਵੀ version control ਵਿੱਚ commit ਨਹੀਂ ਕਰਨਾ ਚਾਹੀਦਾ।

ਮੁੱਖ ਨੁਕਤੇ:

- ਰਿਪੋਜ਼ਟਰੀ ਦੀ `.gitignore` ਪਹਿਲਾਂ ਹੀ `.env*` ਫ਼ਾਈਲਾਂ ਨੂੰ ਅਣਡਿੱਠਾ ਕਰਦੀ ਹੈ (`.gitignore` ਐਂਟਰੀ ਵੇਖੋ)। ਇਸ ਨਿਯਮ ਨੂੰ ਨਾ ਹਟਾਓ ਜਾਂ ਨਾ ਬਦਲੋ, ਜਦੋਂ ਤੱਕ ਤੁਸੀਂ ਜਾਣ-ਬੁੱਝ ਕੇ ਕਿਸੇ ਖ਼ਾਸ ਉਦਾਹਰਨ ਫ਼ਾਈਲ ਨੂੰ commit ਨਹੀਂ ਕਰਨਾ ਚਾਹੁੰਦੇ ਅਤੇ ਇਸ ਲਈ ਤੁਹਾਡੇ ਕੋਲ ਇੱਕ ਦਸਤਾਵੇਜ਼ਬੱਧ ਪ੍ਰਕਿਰਿਆ ਨਹੀਂ ਹੈ।
- ਜੇ ਕੋਈ ਅਸਲੀ secret ਗ਼ਲਤੀ ਨਾਲ repo ਵਿੱਚ commit ਹੋ ਜਾਂਦਾ ਹੈ, ਤਾਂ credential ਨੂੰ ਤੁਰੰਤ rotate/revoke ਕਰੋ ਅਤੇ ਇਸਨੂੰ ਰਿਪੋਜ਼ਟਰੀ ਦੇ ਇਤਿਹਾਸ ਵਿੱਚੋਂ ਹਟਾਓ (ਉਦਾਹਰਨ ਵਜੋਂ, `git filter-repo` ਜਾਂ ਕਿਸੇ ਸਮਾਨ ਸੁਧਾਰਾਤਮਕ workflow ਦੀ ਵਰਤੋਂ ਕਰਕੇ)। ਜੇ ਤੁਹਾਨੂੰ ਮਦਦ ਦੀ ਲੋੜ ਹੈ, ਤਾਂ security/contact ਮਾਲਕ ਨਾਲ ਸੰਪਰਕ ਕਰੋ।
- CI ਅਤੇ production ਲਈ, secrets ਨੂੰ ਫ਼ਾਈਲਾਂ ਵਿੱਚ commit ਕਰਨ ਦੀ ਬਜਾਏ CI secrets ਜਾਂ ਕਿਸੇ secrets manager (GitHub Actions Secrets, Azure Key Vault, HashiCorp Vault, ਆਦਿ) ਦੀ ਵਰਤੋਂ ਕਰੋ।

## ਸਿਫ਼ਾਰਸ਼ੀ ਸਥਾਨਕ workflow

- `.env` ਨੂੰ ਸਿਰਫ਼ ਆਪਣੇ ਸਥਾਨਕ workspace ਵਿੱਚ ਰੱਖੋ। ਲੋੜੀਂਦੇ variables ਅਤੇ ਸਵੀਕਾਰਯੋਗ ਉਦਾਹਰਨ values ਦਾ ਦਸਤਾਵੇਜ਼ੀਕਰਨ ਕਰਨ ਲਈ `.env.example` (ਜੋ ਪਹਿਲਾਂ ਹੀ track ਕੀਤੀ ਹੋਈ ਹੈ) ਦੀ ਵਰਤੋਂ ਕਰੋ।
- ਜਦੋਂ ਸਥਾਨਕ ਤੌਰ 'ਤੇ ਅਜਿਹੇ tests ਚਲਾਏ ਜਾਣ ਜਿਨ੍ਹਾਂ ਲਈ secret ਵਰਗੀਆਂ values ਦੀ ਲੋੜ ਹੁੰਦੀ ਹੈ, ਤਾਂ ਅਸਲੀ credentials ਦੀ ਬਜਾਏ synthetic placeholders ਜਾਂ runtime 'ਤੇ ਤਿਆਰ ਕੀਤੀਆਂ ephemeral keys ਨੂੰ ਤਰਜੀਹ ਦਿਓ।
- placeholders ਦੀ ਵਰਤੋਂ ਕਰਨ ਵਾਲੇ tests ਵਿੱਚ ਇੱਕ ਛੋਟੀ comment ਸ਼ਾਮਲ ਕਰੋ, ਤਾਂ ਜੋ reviewers ਸਮਝ ਸਕਣ ਕਿ fixture synthetic ਹੈ।

## Scanner ਸੰਬੰਧੀ ਨੋਟਸ

- ਕੁਝ compiled ਜਾਂ binary assets (ਉਦਾਹਰਨ ਵਜੋਂ, embedded base64 WASM blobs) ਵਿੱਚ ਅਜਿਹੀਆਂ ASCII substrings ਹੋ ਸਕਦੀਆਂ ਹਨ ਜੋ credentials ਵਰਗੀਆਂ ਦਿਸਦੀਆਂ ਹਨ ਅਤੇ text-based secret scanners ਨੂੰ trigger ਕਰ ਸਕਦੀਆਂ ਹਨ। ਜੇ ਇਹ assets ਵੈਧ ਹਨ, ਤਾਂ ਜਾਂ ਤਾਂ ਇਨ੍ਹਾਂ ਨੂੰ scanner ਦੀ allowlist ਵਿੱਚ ਦਰਜ ਕਰੋ ਜਾਂ scanner config ਵਿੱਚ ਸੰਬੰਧਿਤ directories ਨੂੰ exclude ਕਰੋ।

## ਜੇ ਤੁਹਾਨੂੰ ਕੋਈ leak ਮਿਲੇ

1. key ਨੂੰ ਤੁਰੰਤ rotate/revoke ਕਰੋ।
2. secret ਨੂੰ ਇਤਿਹਾਸ ਵਿੱਚੋਂ ਹਟਾਓ ਅਤੇ ਜੇ ਲੋੜ ਹੋਵੇ ਤਾਂ ਸਾਫ਼ ਕੀਤੀ branch ਨੂੰ force-push ਕਰੋ।
3. maintainers ਨੂੰ ਸੂਚਿਤ ਕਰੋ ਅਤੇ ਆਪਣੀ org ਦੀ incident response checklist ਦੀ ਪਾਲਣਾ ਕਰੋ।
