# Developer environment notes (ಕನ್ನಡ)

🌐 **Languages:** 🇺🇸 [English](../../../DEVELOPER-ENVIRONMENT.md) · 🇪🇹 [am](../../am/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇦 [ar](../../ar/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇿 [az](../../az/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇬 [bg](../../bg/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇩 [bn](../../bn/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇦 [bs](../../bs/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇿 [cs](../../cs/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇰 [da](../../da/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇪 [de](../../de/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇷 [el](../../el/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇸 [es](../../es/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇪 [et](../../et/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇷 [fa](../../fa/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇮 [fi](../../fi/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇷 [fr](../../fr/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇪 [ga](../../ga/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [gu](../../gu/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ha](../../ha/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇱 [he](../../he/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [hi](../../hi/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇷 [hr](../../hr/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇺 [hu](../../hu/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇲 [hy](../../hy/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇩 [id](../../id/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ig](../../ig/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇹 [it](../../it/docs/DEVELOPER-ENVIRONMENT.md) · 🇯🇵 [ja](../../ja/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇪 [ka](../../ka/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇭 [km](../../km/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇷 [ko](../../ko/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇹 [lt](../../lt/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇻 [lv](../../lv/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ml](../../ml/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [mr](../../mr/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇾 [ms](../../ms/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇹 [mt](../../mt/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇲 [my](../../my/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇵 [ne](../../ne/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇱 [nl](../../nl/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇴 [no](../../no/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [or](../../or/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [pa](../../pa/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇭 [phi](../../phi/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇱 [pl](../../pl/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇹 [pt](../../pt/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇴 [ro](../../ro/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇺 [ru](../../ru/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇰 [si](../../si/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇰 [sk](../../sk/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇮 [sl](../../sl/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇸 [sr](../../sr/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇪 [sv](../../sv/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇪 [sw](../../sw/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ta](../../ta/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [te](../../te/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇭 [th](../../th/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇷 [tr](../../tr/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇰 [ur](../../ur/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇿 [uz](../../uz/docs/DEVELOPER-ENVIRONMENT.md) · 🇻🇳 [vi](../../vi/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [yo](../../yo/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇼 [zh-TW](../../zh-TW/docs/DEVELOPER-ENVIRONMENT.md)

---

OmniRoute ಅನ್ನು ಅಭಿವೃದ್ಧಿಪಡಿಸುವಾಗ ಪ್ರಾಜೆಕ್ಟ್ನ ಸ್ಥಳೀಯ `.env` ನಡವಳಿಕೆ ಹಾಗೂ ಪರಿಸರ ಫೈಲ್ಗಳು ಮತ್ತು ರಹಸ್ಯಗಳನ್ನು ಹೇಗೆ ನಿರ್ವಹಿಸಬೇಕು ಎಂಬುದನ್ನು ಈ ಪುಟ ವಿವರಿಸುತ್ತದೆ.

## .env postinstall ನಡವಳಿಕೆ

ಡೆವಲಪರ್ಗಳ ಅನುಕೂಲಕ್ಕಾಗಿ ಪ್ರಾಜೆಕ್ಟ್ `npm install` / `postinstall` ಸಮಯದಲ್ಲಿ ಸ್ಥಳೀಯ `.env` ಫೈಲ್ ಅನ್ನು ರಚಿಸಬಹುದು. ಈ ಫೈಲ್ ಸ್ಥಳೀಯ ಅಭಿವೃದ್ಧಿ ಮತ್ತು ಪರೀಕ್ಷೆಗೆ ಮಾತ್ರ ಉದ್ದೇಶಿತವಾಗಿದ್ದು, ಇದನ್ನು ಎಂದಿಗೂ ಆವೃತ್ತಿ ನಿಯಂತ್ರಣಕ್ಕೆ ಕಮಿಟ್ ಮಾಡಬಾರದು.

ಪ್ರಮುಖ ಅಂಶಗಳು:

- ರೆಪೊಸಿಟರಿಯ `.gitignore` ಈಗಾಗಲೇ `.env*` ಫೈಲ್ಗಳನ್ನು ನಿರ್ಲಕ್ಷಿಸುತ್ತದೆ (`.gitignore` ನಮೂದನ್ನು ನೋಡಿ). ನಿರ್ದಿಷ್ಟ ಉದಾಹರಣೆ ಫೈಲ್ ಅನ್ನು ಕಮಿಟ್ ಮಾಡುವ ಉದ್ದೇಶವನ್ನು ನೀವು ಹೊಂದಿದ್ದು, ಅದಕ್ಕಾಗಿ ದಾಖಲಿತ ಪ್ರಕ್ರಿಯೆ ಇಲ್ಲದ ಹೊರತು ಆ ನಿಯಮವನ್ನು ತೆಗೆದುಹಾಕಬೇಡಿ ಅಥವಾ ಬದಲಾಯಿಸಬೇಡಿ.
- ನೈಜ ರಹಸ್ಯವನ್ನು ಆಕಸ್ಮಿಕವಾಗಿ ರೆಪೊಗೆ ಕಮಿಟ್ ಮಾಡಿದರೆ, ಆ ರುಜುವಾತನ್ನು ತಕ್ಷಣವೇ ಬದಲಾಯಿಸಿ/ಹಿಂಪಡೆಯಿರಿ ಮತ್ತು ಅದನ್ನು ರೆಪೊಸಿಟರಿ ಇತಿಹಾಸದಿಂದ ತೆಗೆದುಹಾಕಿ (ಉದಾಹರಣೆಗೆ, `git filter-repo` ಅಥವಾ ಸಮಾನ ಪರಿಹಾರ ಕಾರ್ಯಪ್ರವಾಹವನ್ನು ಬಳಸಿ). ನಿಮಗೆ ಸಹಾಯ ಬೇಕಾದರೆ ಭದ್ರತಾ/ಸಂಪರ್ಕ ಜವಾಬ್ದಾರರನ್ನು ಸಂಪರ್ಕಿಸಿ.
- CI ಮತ್ತು ಪ್ರೊಡಕ್ಷನ್ಗಾಗಿ, ರಹಸ್ಯಗಳನ್ನು ಫೈಲ್ಗಳಿಗೆ ಕಮಿಟ್ ಮಾಡುವ ಬದಲು CI ರಹಸ್ಯಗಳು ಅಥವಾ ರಹಸ್ಯಗಳ ನಿರ್ವಾಹಕವನ್ನು (GitHub Actions Secrets, Azure Key Vault, HashiCorp Vault, ಇತ್ಯಾದಿ) ಬಳಸಿ.

## ಶಿಫಾರಸು ಮಾಡಲಾದ ಸ್ಥಳೀಯ ಕಾರ್ಯಪ್ರವಾಹ

- `.env` ಅನ್ನು ನಿಮ್ಮ ಸ್ಥಳೀಯ ಕಾರ್ಯಕ್ಷೇತ್ರದಲ್ಲಿ ಮಾತ್ರ ಇರಿಸಿ. ಅಗತ್ಯವಿರುವ ವೇರಿಯಬಲ್ಗಳು ಮತ್ತು ಸ್ವೀಕಾರಾರ್ಹ ಉದಾಹರಣೆ ಮೌಲ್ಯಗಳನ್ನು ದಾಖಲಿಸಲು `.env.example` ಅನ್ನು (ಈಗಾಗಲೇ ಟ್ರ್ಯಾಕ್ ಮಾಡಲಾಗಿದೆ) ಬಳಸಿ.
- ರಹಸ್ಯದಂತಹ ಮೌಲ್ಯಗಳು ಅಗತ್ಯವಿರುವ ಪರೀಕ್ಷೆಗಳನ್ನು ಸ್ಥಳೀಯವಾಗಿ ಚಲಾಯಿಸುವಾಗ, ನೈಜ ರುಜುವಾತುಗಳ ಬದಲು ಕೃತಕ ಪ್ಲೇಸ್ಹೋಲ್ಡರ್ಗಳು ಅಥವಾ ರನ್ಟೈಮ್ನಲ್ಲಿ ರಚಿಸಲಾದ ಅಲ್ಪಕಾಲಿಕ ಕೀಲಿಗಳನ್ನು ಬಳಸಲು ಆದ್ಯತೆ ನೀಡಿ.
- ಪ್ಲೇಸ್ಹೋಲ್ಡರ್ಗಳನ್ನು ಬಳಸುವ ಪರೀಕ್ಷೆಗಳಲ್ಲಿ ಒಂದು ಚಿಕ್ಕ ಕಾಮೆಂಟ್ ಸೇರಿಸಿ, ಇದರಿಂದ ಫಿಕ್ಸ್ಚರ್ ಕೃತಕವಾಗಿದೆ ಎಂಬುದು ಪರಿಶೀಲಕರಿಗೆ ಅರ್ಥವಾಗುತ್ತದೆ.

## ಸ್ಕ್ಯಾನರ್ ಟಿಪ್ಪಣಿಗಳು

- ಕೆಲವು ಕಂಪೈಲ್ ಮಾಡಿದ ಅಥವಾ ಬೈನರಿ ಅಸೆಟ್ಗಳು (ಉದಾ., ಎಂಬೆಡ್ ಮಾಡಿದ base64 WASM ಬ್ಲಾಬ್ಗಳು) ರುಜುವಾತುಗಳಂತೆ ಕಾಣುವ ASCII ಉಪಸ್ಟ್ರಿಂಗ್ಗಳನ್ನು ಹೊಂದಿರಬಹುದು ಮತ್ತು ಪಠ್ಯ-ಆಧಾರಿತ ರಹಸ್ಯ ಸ್ಕ್ಯಾನರ್ಗಳನ್ನು ಪ್ರಚೋದಿಸಬಹುದು. ಈ ಅಸೆಟ್ಗಳು ನ್ಯಾಯಸಮ್ಮತವಾಗಿದ್ದರೆ, ಅವುಗಳನ್ನು ಸ್ಕ್ಯಾನರ್ನ ಅನುಮತಿಪಟ್ಟಿಯಲ್ಲಿ ಗುರುತಿಸಿ ಅಥವಾ ಸ್ಕ್ಯಾನರ್ ಕಾನ್ಫಿಗ್ನಲ್ಲಿ ಆ ಡೈರೆಕ್ಟರಿಗಳನ್ನು ಹೊರತುಪಡಿಸಿ.

## ಸೋರಿಕೆ ಕಂಡುಬಂದರೆ

1. ಕೀಲಿಯನ್ನು ತಕ್ಷಣವೇ ಬದಲಾಯಿಸಿ/ಹಿಂಪಡೆಯಿರಿ.
2. ಇತಿಹಾಸದಿಂದ ರಹಸ್ಯವನ್ನು ತೆಗೆದುಹಾಕಿ ಮತ್ತು ಅಗತ್ಯವಿದ್ದರೆ ಸ್ವಚ್ಛಗೊಳಿಸಿದ ಬ್ರಾಂಚ್ ಅನ್ನು ಬಲವಂತವಾಗಿ ಪುಶ್ ಮಾಡಿ.
3. ನಿರ್ವಹಕರಿಗೆ ತಿಳಿಸಿ ಮತ್ತು ನಿಮ್ಮ ಸಂಸ್ಥೆಯ ಘಟನೆ ಪ್ರತಿಕ್ರಿಯೆ ಪರಿಶೀಲನಾಪಟ್ಟಿಯನ್ನು ಅನುಸರಿಸಿ.
