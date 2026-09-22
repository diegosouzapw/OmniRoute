# Cursor Provider in Docker Environments (ಕನ್ನಡ)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR-DOCKER.md)

---

OmniRoute ಅನ್ನು Docker ಒಳಗೆ ಚಲಾಯಿಸಿದಾಗ, ಕಂಟೇನರ್ಗೆ ಹೋಸ್ಟ್ನ Cursor
ಸ್ಥಾಪನೆ ಕಾಣಿಸದ ಕಾರಣ ಹಳೆಯ **Cursor IDE ನಿಂದ ಆಮದು ಮಾಡಿ** /
`cursor-agent` ಹರಿವುಗಳು ವಿಫಲವಾಗುತ್ತವೆ. ಬದಲಿಗೆ **Cursor ಮೂಲಕ ಲಾಗಿನ್ ಮಾಡಿ** (deep-control PKCE) ಬಳಸಿ.

## Docker ನಲ್ಲಿ IDE / CLI ಆಮದು ಏಕೆ ವಿಫಲವಾಗುತ್ತದೆ

1. **ಫೈಲ್ಸಿಸ್ಟಮ್ ಪ್ರತ್ಯೇಕತೆ** — ಸ್ವಯಂ-ಆಮದು ಕಂಟೇನರ್ನ _ಒಳಗೆ_
   `~/.config/Cursor/User/globalStorage/state.vscdb` ನಂತಹ Linux ಪಥಗಳನ್ನು ಹುಡುಕುತ್ತದೆ.
   macOS ಗಾಗಿನ Docker Desktop ನಲ್ಲಿ ಹೋಸ್ಟ್ IDE DB ಪೂರ್ವನಿಯೋಜಿತವಾಗಿ ಮೌಂಟ್ ಆಗಿರುವುದಿಲ್ಲ, ಮತ್ತು
   ಹೋಸ್ಟ್ Darwin ಆಗಿದ್ದರೂ ಕಂಟೇನರ್ OS Linux ಆಗಿರುತ್ತದೆ.
2. **`cursor-agent` ಬೈನರಿ ಇಲ್ಲ** — ಅಧಿಕೃತ OmniRoute ಇಮೇಜ್ಗಳು
   `cursor-agent` ಅನ್ನು ಒಳಗೊಂಡಿರುವುದಿಲ್ಲ. ಈ ಹಿಂದೆ ಲಭ್ಯವಿರುವ ಮಾದರಿಗಳಿಗಾಗಿ
   `cursor-agent --list-models` ಅನ್ನು ಶೆಲ್ ಮೂಲಕ ಚಲಾಯಿಸಿ, ಅದು ವಿಫಲವಾದರೆ ಸ್ಥಿರ ಕ್ಯಾಟಲಾಗ್ಗೆ ಹಿಂತಿರುಗಲಾಗುತ್ತಿತ್ತು.
3. **ತಪ್ಪಾದ ಬೈನರಿ** — macOS `cursor-agent` ಅನ್ನು Linux
   ಕಂಟೇನರ್ಗೆ bind-mount **ಮಾಡಬೇಡಿ**. ಅದು ಕಾರ್ಯಗತಗೊಳ್ಳುವುದಿಲ್ಲ.

## ಶಿಫಾರಸು: Cursor ಮೂಲಕ ಲಾಗಿನ್ ಮಾಡಿ

1. **ಡ್ಯಾಶ್ಬೋರ್ಡ್ → ಪೂರೈಕೆದಾರರು → Cursor** ತೆರೆಯಿರಿ.
2. **Cursor ಮೂಲಕ ಲಾಗಿನ್ ಮಾಡಿ** ಟ್ಯಾಬ್ ಆಯ್ಕೆಮಾಡಿ.
3. **Cursor ಮೂಲಕ ಲಾಗಿನ್ ಮಾಡಿ** ಕ್ಲಿಕ್ ಮಾಡಿ — OmniRoute ನಿಮ್ಮ **ಹೋಸ್ಟ್** ಬ್ರೌಸರ್ನಲ್ಲಿ
   `https://cursor.com/loginDeepControl?…` ತೆರೆಯುತ್ತದೆ.
4. ಬ್ರೌಸರ್ನಲ್ಲಿ ಲಾಗಿನ್ ಅನ್ನು ಅನುಮೋದಿಸಿ, ನಂತರ ಡ್ಯಾಶ್ಬೋರ್ಡ್ಗೆ ಹಿಂತಿರುಗಿ. ಟೋಕನ್ಗಳು ಬರುವವರೆಗೆ OmniRoute
   `api2.cursor.sh/auth/poll` ಅನ್ನು ಪೋಲ್ ಮಾಡುತ್ತದೆ.
5. OmniRoute **ಪ್ರವೇಶ + ರಿಫ್ರೆಶ್** ಟೋಕನ್ಗಳನ್ನು ಸಂಗ್ರಹಿಸುತ್ತದೆ ಮತ್ತು
   `https://api2.cursor.sh/auth/exchange_user_api_key` ಮೂಲಕ ಅವುಗಳನ್ನು ರಿಫ್ರೆಶ್ ಮಾಡುತ್ತದೆ.

ಈ ಮಾರ್ಗಕ್ಕೆ ಕಂಟೇನರ್ ಒಳಗೆ Cursor IDE ಅಥವಾ `cursor-agent` ಅಗತ್ಯವಿಲ್ಲ.

## ಮಾದರಿ ಪತ್ತೆ

ಲಾಗಿನ್ ಆಗಿರುವ ಸಂಪರ್ಕವಿದ್ದಾಗ, **ಲಭ್ಯವಿರುವ ಮಾದರಿಗಳು / ಸ್ವಯಂ-ಸಿಂಕ್** ಸಂಪರ್ಕದ bearer ಟೋಕನ್ ಬಳಸಿ Cursor ನ
HTTP `AiService/AvailableModels` ಕ್ಯಾಟಲಾಗ್ಗೆ ಆದ್ಯತೆ ನೀಡುತ್ತದೆ.
ಅದು ವಿಫಲವಾದರೆ, OmniRoute ಹೋಸ್ಟ್ನ `cursor-agent` ಅನ್ನು (ಅದು ಇದ್ದಾಗ) ಪ್ರಯತ್ನಿಸುತ್ತದೆ, ನಂತರ
ಸ್ಥಿರ ರಿಜಿಸ್ಟ್ರಿ seed ಅನ್ನು ಬಳಸುತ್ತದೆ.

OmniRoute ಯಾವಾಗಲೂ ಕ್ಯಾಟಲಾಗ್ನಲ್ಲಿ **`auto`** ಅನ್ನು (ಪ್ರದರ್ಶನ ಹೆಸರು “Auto”), ಜೊತೆಗೆ
OpenCodex-ಶೈಲಿಯ ರೂಟರ್ ಮೋಡ್ಗಳಾದ **`auto-cost`**, **`auto-balance`**, ಮತ್ತು
**`auto-intelligence`** ಅನ್ನು ಒದಗಿಸುತ್ತದೆ. ವೈರ್ನಲ್ಲಿ ಇವು Cursor ನ `default` ಮಾದರಿಗೆ
(ಮೂರು ರೂಪಾಂತರಗಳಿಗೆ `optimization` ModelParameter ಜೊತೆಗೆ) ಮ್ಯಾಪ್ ಆಗುತ್ತವೆ. ಪ್ರೀಮಿಯಂ ಮಾದರಿಗಳ ಬಳಕೆ
ಮುಗಿದಿರುವಾಗ `cu/auto` ಗೆ ಆದ್ಯತೆ ನೀಡಿ — Auto ನಲ್ಲಿ ಸಾಮಾನ್ಯವಾಗಿ ಇನ್ನೂ ಬಜೆಟ್ ಇರಬಹುದು.

### ಸಿಂಕ್ ಆದಾಗ ಲೈವ್ ಕ್ಯಾಟಲಾಗ್ ಮಾತ್ರ ಬಳಸಲಾಗುತ್ತದೆ

Cursor ಮಾದರಿ ಸಿಂಕ್ ಯಶಸ್ವಿಯಾದ ನಂತರ (`cursor-agent --list-models` → ಉಳಿಸಲಾದ
ಸಿಂಕ್ ಕ್ಯಾಟಲಾಗ್, ಅಥವಾ ಮೇಲಿನ bearer-ದೃಢೀಕೃತ `AvailableModels` ಪಡೆಯುವಿಕೆ),
**ಡ್ಯಾಶ್ಬೋರ್ಡ್**, **`/v1/models`**, ಮತ್ತು **ಎಲ್ಲವನ್ನೂ ಪರೀಕ್ಷಿಸಿ** ಇವುಗಳನ್ನು ಪಟ್ಟಿ ಮಾಡುತ್ತವೆ:

1. ಲೈವ್ ಸಿಂಕ್ ಹಿಂದಿರುಗಿಸಿದ ಮಾದರಿಗಳು
2. ಸೇರಿಸಲಾದ auto-router idಗಳು: `auto`, `auto-cost`, `auto-balance`, `auto-intelligence`
3. ಆಪರೇಟರ್ನ **ಕಸ್ಟಮ್** ಮಾದರಿಗಳು (ಆಮದು / ಕೈಯಾರೆ) — ಸಿಂಕ್ ಮೂಲಕ ಎಂದಿಗೂ ತೆಗೆದುಹಾಕಲಾಗುವುದಿಲ್ಲ

`open-sse/config/providers/registry/cursor/` ಅಡಿಯಲ್ಲಿರುವ ದೊಡ್ಡ ಸ್ಥಿರ ರಿಜಿಸ್ಟ್ರಿಯು
**ಆಫ್ಲೈನ್ ಫಾಲ್ಬ್ಯಾಕ್ಗಾಗಿ ಮಾತ್ರ**. ಸಿಂಕ್ ಖಾಲಿಯಾಗಿದ್ದರೆ (ಅಥವಾ ಪತ್ತೆ ವಿಫಲವಾದರೆ), ಪಟ್ಟಿಯು
ಆ ರಿಜಿಸ್ಟ್ರಿಗೆ ಹಿಂತಿರುಗುತ್ತದೆ.

ಪ್ರಯತ್ನ-ಪ್ರತ್ಯಯ ಹೊಂದಿರುವ idಗಳನ್ನು (ಉದಾಹರಣೆಗೆ `claude-4.6-sonnet-high`) ರನ್ಟೈಮ್ನಲ್ಲಿ ಇನ್ನೂ
**ವಿನಂತಿಸಬಹುದು**: `resolveRequestedModel` ಪ್ರತ್ಯಯವನ್ನು ತೆಗೆದುಹಾಕಿ ವೈರ್
`ModelParameter` ಆಗಿ ಪರಿವರ್ತಿಸುತ್ತದೆ. Cursor ನಿಜವಾಗಿ ಲಭ್ಯವೆಂದು ಹಿಂದಿರುಗಿಸುವುದಕ್ಕೆ ಪ್ರೋಬ್ಗಳು ಹೊಂದಿಕೆಯಾಗುವಂತೆ,
ವಿಶೇಷ ಪಟ್ಟಿಯು ಉದ್ದೇಶಪೂರ್ವಕವಾಗಿ ಆ ಸ್ಥಿರ ರೂಪಾಂತರಗಳನ್ನು ಎಲ್ಲವನ್ನೂ ಪರೀಕ್ಷಿಸುವುದರಿಂದ ಮರೆಮಾಡುತ್ತದೆ.

### ಸಹಾಯಕಗಳು

- `providerUsesExclusiveSyncedListing("cursor"|"cu")` —
  `src/lib/providers/modelListingCapability.ts`
- `mergeProviderModelListing` — ಡ್ಯಾಶ್ಬೋರ್ಡ್ ವಿಲೀನ
- `ensureCursorAutoCatalogEntry` — ಪತ್ತೆ + ಪಟ್ಟಿಮಾಡುವಿಕೆಯಲ್ಲಿ auto* ಸೇರಿಸುವಿಕೆ
- `shouldSuppressStaticModelForExclusiveListing` — `/v1/models` ಸ್ಥಿರ ಲೂಪ್

## ಪೂರೈಕೆದಾರರ ಮಿತಿಗಳು (ಕೋಟಾ)

PKCE ಅಥವಾ ಟೋಕನ್ ಆಮದಿನ ನಂತರ Cursor ಗಾಗಿ **ಬಳಕೆ → ಪೂರೈಕೆದಾರರ ಮಿತಿಗಳು**,
`api2.cursor.sh` ನಲ್ಲಿನ Bearer APIಗಳನ್ನು
(`GetCurrentPeriodUsage` → ಬಳಕೆಯ ಸಾರಾಂಶ → auth/usage) ಬಳಸುತ್ತದೆ. ಹಳೆಯ IDE ಮೂಲಕ ಆಮದುಮಾಡಿದ
ಸೆಷನ್ಗಳಿಗಾಗಿ ಹಿಂದಿನ cookie/`cursor.com` ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಮಾರ್ಗವು ಕೊನೆಯ ಫಾಲ್ಬ್ಯಾಕ್ ಆಗಿ ಉಳಿಯುತ್ತದೆ.

ವಿಂಡೋಗಳು ಸಾಮಾನ್ಯವಾಗಿ **ಒಟ್ಟು**, **Auto + Composer**, ಮತ್ತು **API** ಅನ್ನು ಒಳಗೊಂಡಿರುತ್ತವೆ. ಮಿತಿಗಳು
ಖಾಲಿಯಾಗಿ ಕಂಡರೆ, **Cursor ಮೂಲಕ ಲಾಗಿನ್ ಮಾಡಿ** ಅನ್ನು ಮರುಚಲಾಯಿಸಿ ಅಥವಾ ಟೋಕನ್ಗಳನ್ನು ಮರು-ಆಮದು ಮಾಡಿ (IDE ಆಮದು
ಮಾತ್ರ ಈಗ ಅಗತ್ಯವಿಲ್ಲ).

## ಖಾಲಿ ಟರ್ನ್ಗಳು / ಬಳಕೆ ಮುಗಿದಿದೆ

Cursor ಒಂದು Run ಅನ್ನು ಸ್ವೀಕರಿಸಿದರೂ ಸಹಾಯಕ ಪಠ್ಯವನ್ನು ಹಿಂದಿರುಗಿಸದಿದ್ದಾಗ (ಪ್ರೀಮಿಯಂ
ಬಳಕೆ ಮುಗಿದಾಗ ಇದು ಸಾಮಾನ್ಯ), OmniRoute ಕೇವಲ “ಪೂರೈಕೆದಾರರು ಖಾಲಿ ವಿಷಯವನ್ನು ಹಿಂದಿರುಗಿಸಿದ್ದಾರೆ” ಎಂಬ ಸಂದೇಶದ ಬದಲು,
ಕ್ರಮ ಕೈಗೊಳ್ಳಬಹುದಾದ **429** (ಕೋಟಾ ಸೂಚನೆಗಳು) ಅಥವಾ ಮಾರ್ಗದರ್ಶನದೊಂದಿಗೆ **502** ಅನ್ನು ತೋರಿಸುತ್ತದೆ. `not_found: AI Model Not Found`
(ಬಳಕೆಯ ವಿಂಡೋ ಮುಗಿದಿದೆ) ನಂತಹ ಸ್ಟ್ರೀಮಿಂಗ್ ವೈಫಲ್ಯಗಳನ್ನು **Cursor ದರ ಮಿತಿ / ಬಳಕೆ ಮೀರಿದೆ** ಎಂದು
ವರ್ಗೀಕರಿಸಲಾಗುತ್ತದೆ ಮತ್ತು SSE ಪೈಪ್ಲೈನ್ನಾದ್ಯಂತ ಆ ಸಂದೇಶವನ್ನು ಉಳಿಸಿಕೊಳ್ಳಲಾಗುತ್ತದೆ (ಹಂಚಿಕೆಯ ಖಾಲಿ-ಸ್ಟ್ರೀಮ್ ರಕ್ಷಕವು
ಈಗಾಗಲೇ ಹೊರಸೂಸಿದ ದೋಷವನ್ನು ಮೇಲ್ಬರೆಯುವುದಿಲ್ಲ). ಪೂರೈಕೆದಾರರ ಮಿತಿಗಳನ್ನು ಪರಿಶೀಲಿಸಿ, **`auto`** ಮಾದರಿಯನ್ನು ಪ್ರಯತ್ನಿಸಿ,
ಅಥವಾ Cursor ಪ್ಲ್ಯಾನ್ ಮಿತಿಗಳನ್ನು ಹೆಚ್ಚಿಸಿ.

## ಕ್ಲೈಂಟ್ ಆವೃತ್ತಿ (headless)

ಸ್ಥಳೀಯ `cursor-agent` ಸ್ಥಾಪನೆ ಇಲ್ಲದೆ, OmniRoute ಮೊದಲು env `CURSOR_AGENT_CLI_VERSION` ಮೂಲಕ,
ನಂತರ Cursor ಇನ್ಸ್ಟಾಲರ್ ಸ್ಕ್ರಿಪ್ಟ್ನ ಡಿಸ್ಕ್ನಲ್ಲಿ ಕ್ಯಾಶ್ ಮಾಡಿದ scrape ಮೂಲಕ, ನಂತರ pinned build id ಮೂಲಕ
`x-cursor-client-version` ಅನ್ನು ನಿರ್ಧರಿಸುತ್ತದೆ. ಅಗತ್ಯವಿದ್ದಾಗ
`CURSOR_AGENT_CLI_VERSION` ಮೂಲಕ ಅತಿಕ್ರಮಿಸಿ.

## ಫಾಲ್ಬ್ಯಾಕ್: ಕೈಯಾರೆ ಟೋಕನ್ ಆಮದು

ಬ್ರೌಸರ್ ಲಾಗಿನ್ ಪೂರ್ಣಗೊಳಿಸಲು ಸಾಧ್ಯವಾಗದಿದ್ದರೆ:

1. ಹೋಸ್ಟ್ನಲ್ಲಿ, Cursor ನ `state.vscdb` ನಿಂದ ಟೋಕನ್ಗಳನ್ನು ಹೊರತೆಗೆಯಿರಿ:

   ```bash
   sqlite3 "$HOME/Library/Application Support/Cursor/User/globalStorage/state.vscdb" \
     "SELECT key, value FROM ItemTable WHERE key IN ('cursorAuth/accessToken','cursorAuth/refreshToken','storage.serviceMachineId');"
   ```

2. Cursor ದೃಢೀಕರಣ ಮಾದರಿಯಲ್ಲಿ **ಟೋಕನ್ ಆಮದು ಮಾಡಿ** ತೆರೆಯಿರಿ.
3. **ಪ್ರವೇಶ ಟೋಕನ್** ಮತ್ತು, ಲಭ್ಯವಿದ್ದಾಗ, **ರಿಫ್ರೆಶ್ ಟೋಕನ್** ಅನ್ನು ಅಂಟಿಸಿ (ಸ್ವಯಂಚಾಲಿತ
   ರಿಫ್ರೆಶ್ಗೆ ಅಗತ್ಯವಿದೆ). ಯಂತ್ರ ID ಐಚ್ಛಿಕವಾಗಿದೆ.

ಪ್ರವೇಶ-ಟೋಕನ್-ಮಾತ್ರದ ಆಮದುಗಳು ಇನ್ನೂ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತವೆ, ಆದರೆ ರಿಫ್ರೆಶ್ ಟೋಕನ್ ಇಲ್ಲದೆ ಅವಧಿ ಮುಗಿಯುತ್ತದೆ —
ಚಾಟ್ ದೃಢೀಕರಣ ದೋಷಗಳನ್ನು ಹಿಂದಿರುಗಿಸಿದಾಗ ಮರು-ಆಮದು ಮಾಡಿ.

## ಸಂಬಂಧಿತ

- Zed Docker ಮಾರ್ಗದರ್ಶನ: [`docs/providers/ZED-DOCKER.md`](./ZED-DOCKER.md)
- OpenCodex Cursor ಲಾಗಿನ್ ಉಲ್ಲೇಖ (ಬಾಹ್ಯ):
  https://github.com/lidge-jun/opencodex/blob/main/src/oauth/cursor.ts
