# CLI Machine-ID Token (ಕನ್ನಡ)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CLI_TOKEN.md) · 🇪🇹 [am](../../../am/docs/security/CLI_TOKEN.md) · 🇸🇦 [ar](../../../ar/docs/security/CLI_TOKEN.md) · 🇦🇿 [az](../../../az/docs/security/CLI_TOKEN.md) · 🇧🇬 [bg](../../../bg/docs/security/CLI_TOKEN.md) · 🇧🇩 [bn](../../../bn/docs/security/CLI_TOKEN.md) · 🇨🇿 [cs](../../../cs/docs/security/CLI_TOKEN.md) · 🇩🇰 [da](../../../da/docs/security/CLI_TOKEN.md) · 🇩🇪 [de](../../../de/docs/security/CLI_TOKEN.md) · 🇬🇷 [el](../../../el/docs/security/CLI_TOKEN.md) · 🇪🇸 [es](../../../es/docs/security/CLI_TOKEN.md) · 🇪🇪 [et](../../../et/docs/security/CLI_TOKEN.md) · 🇮🇷 [fa](../../../fa/docs/security/CLI_TOKEN.md) · 🇫🇮 [fi](../../../fi/docs/security/CLI_TOKEN.md) · 🇫🇷 [fr](../../../fr/docs/security/CLI_TOKEN.md) · 🇮🇪 [ga](../../../ga/docs/security/CLI_TOKEN.md) · 🇮🇳 [gu](../../../gu/docs/security/CLI_TOKEN.md) · 🇳🇬 [ha](../../../ha/docs/security/CLI_TOKEN.md) · 🇮🇱 [he](../../../he/docs/security/CLI_TOKEN.md) · 🇮🇳 [hi](../../../hi/docs/security/CLI_TOKEN.md) · 🇭🇷 [hr](../../../hr/docs/security/CLI_TOKEN.md) · 🇭🇺 [hu](../../../hu/docs/security/CLI_TOKEN.md) · 🇦🇲 [hy](../../../hy/docs/security/CLI_TOKEN.md) · 🇮🇩 [id](../../../id/docs/security/CLI_TOKEN.md) · 🇳🇬 [ig](../../../ig/docs/security/CLI_TOKEN.md) · 🇮🇹 [it](../../../it/docs/security/CLI_TOKEN.md) · 🇯🇵 [ja](../../../ja/docs/security/CLI_TOKEN.md) · 🇬🇪 [ka](../../../ka/docs/security/CLI_TOKEN.md) · 🇰🇭 [km](../../../km/docs/security/CLI_TOKEN.md) · 🇰🇷 [ko](../../../ko/docs/security/CLI_TOKEN.md) · 🇱🇹 [lt](../../../lt/docs/security/CLI_TOKEN.md) · 🇱🇻 [lv](../../../lv/docs/security/CLI_TOKEN.md) · 🇮🇳 [ml](../../../ml/docs/security/CLI_TOKEN.md) · 🇮🇳 [mr](../../../mr/docs/security/CLI_TOKEN.md) · 🇲🇾 [ms](../../../ms/docs/security/CLI_TOKEN.md) · 🇲🇹 [mt](../../../mt/docs/security/CLI_TOKEN.md) · 🇲🇲 [my](../../../my/docs/security/CLI_TOKEN.md) · 🇳🇵 [ne](../../../ne/docs/security/CLI_TOKEN.md) · 🇳🇱 [nl](../../../nl/docs/security/CLI_TOKEN.md) · 🇳🇴 [no](../../../no/docs/security/CLI_TOKEN.md) · 🇮🇳 [or](../../../or/docs/security/CLI_TOKEN.md) · 🇮🇳 [pa](../../../pa/docs/security/CLI_TOKEN.md) · 🇵🇭 [phi](../../../phi/docs/security/CLI_TOKEN.md) · 🇵🇱 [pl](../../../pl/docs/security/CLI_TOKEN.md) · 🇵🇹 [pt](../../../pt/docs/security/CLI_TOKEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CLI_TOKEN.md) · 🇷🇴 [ro](../../../ro/docs/security/CLI_TOKEN.md) · 🇷🇺 [ru](../../../ru/docs/security/CLI_TOKEN.md) · 🇱🇰 [si](../../../si/docs/security/CLI_TOKEN.md) · 🇸🇰 [sk](../../../sk/docs/security/CLI_TOKEN.md) · 🇸🇮 [sl](../../../sl/docs/security/CLI_TOKEN.md) · 🇷🇸 [sr](../../../sr/docs/security/CLI_TOKEN.md) · 🇸🇪 [sv](../../../sv/docs/security/CLI_TOKEN.md) · 🇰🇪 [sw](../../../sw/docs/security/CLI_TOKEN.md) · 🇮🇳 [ta](../../../ta/docs/security/CLI_TOKEN.md) · 🇮🇳 [te](../../../te/docs/security/CLI_TOKEN.md) · 🇹🇭 [th](../../../th/docs/security/CLI_TOKEN.md) · 🇹🇷 [tr](../../../tr/docs/security/CLI_TOKEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CLI_TOKEN.md) · 🇵🇰 [ur](../../../ur/docs/security/CLI_TOKEN.md) · 🇺🇿 [uz](../../../uz/docs/security/CLI_TOKEN.md) · 🇻🇳 [vi](../../../vi/docs/security/CLI_TOKEN.md) · 🇳🇬 [yo](../../../yo/docs/security/CLI_TOKEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CLI_TOKEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CLI_TOKEN.md)

---

## ಅವಲೋಕನ

OmniRoute CLI ಕಮಾಂಡ್ಗಳು ಸ್ಥಳೀಯ ನಿರ್ವಹಣಾ API ಜೊತೆಗೆ ದೃಢೀಕರಣ ಮಾಡಲು
`x-omniroute-cli-token` ವಿನಂತಿ ಹೆಡರ್ ಮೂಲಕ ಕಳುಹಿಸಲಾದ
`HMAC-SHA256(machine-id, salt)` ಟೋಕನ್ ಅನ್ನು ಬಳಸುತ್ತವೆ.

ಇದರಿಂದ CLI ಉಪಕಮಾಂಡ್ಗಳು (`omniroute status`, `omniroute providers`, ಇತ್ಯಾದಿ)
ಪ್ರತಿ ಬಾರಿ ಚಾಲನೆ ಮಾಡುವಾಗ ಬಳಕೆದಾರರು JWT ಅಥವಾ ಪಾಸ್ವರ್ಡ್ ಒದಗಿಸುವ ಅಗತ್ಯವಿಲ್ಲದೆ
ನಿರ್ವಹಣಾ ಎಂಡ್ಪಾಯಿಂಟ್ಗಳನ್ನು ಕರೆ ಮಾಡಲು ಸಾಧ್ಯವಾಗುತ್ತದೆ.

## ಇದು ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ

1. `getMachineTokenSync()` ಹಾರ್ಡ್ವೇರ್ ಯಂತ್ರ ID ಅನ್ನು `node-machine-id` ಮೂಲಕ
   ಓದುತ್ತದೆ (ವಿಫಲವಾದರೆ ಖಾಲಿ ಸ್ಟ್ರಿಂಗ್ಗೆ ಹಿಂತಿರುಗಿ, CLI ದೃಢೀಕರಣವನ್ನು ನಿಷ್ಕ್ರಿಯಗೊಳಿಸುತ್ತದೆ).
2. ಇದು `HMAC-SHA256(machine_id, salt)` ಅನ್ನು ಲೆಕ್ಕಾಚಾರ ಮಾಡಿ, ಸಂಪೂರ್ಣ 64-ಅಕ್ಷರಗಳ
   ಹೆಕ್ಸ್ ಡೈಜೆಸ್ಟ್ ಅನ್ನು ಹಿಂದಿರುಗಿಸುತ್ತದೆ — ಈ ಯಂತ್ರಕ್ಕೆ ಸಂಬಂಧಿಸಿದ ನಿರ್ಣಾಯಕವಾದ,
   ಹಿಮ್ಮುಖಗೊಳಿಸಲಾಗದ ಟೋಕನ್.
3. ಪರಿಹರಿಸಲಾದ ಗಮ್ಯಸ್ಥಾನವು ಸ್ಪಷ್ಟವಾದ ಲೂಪ್ಬ್ಯಾಕ್ URL (`localhost`,
   `127.0.0.0/8`, ಅಥವಾ ಲೂಪ್ಬ್ಯಾಕ್ IPv6) ಆಗಿರುವಾಗ ಮಾತ್ರ CLI ಟೋಕನ್ ಅನ್ನು
   `x-omniroute-cli-token` ಆಗಿ ಕಳುಹಿಸುತ್ತದೆ. ಟೋಕನ್ ಹೊಂದಿರುವ ವಿನಂತಿಗಳು
   `redirect: error` ಅನ್ನು ಬಳಸುತ್ತವೆ, ಆದ್ದರಿಂದ ಸ್ಥಳೀಯ ಮರುನಿರ್ದೇಶನವು ಅದನ್ನು ಮತ್ತೊಂದು
   ಮೂಲಕ್ಕೆ ಫಾರ್ವರ್ಡ್ ಮಾಡಲು ಸಾಧ್ಯವಿಲ್ಲ. ರಿಮೋಟ್ ಸಂದರ್ಭಗಳು ಬದಲಿಗೆ ವ್ಯಾಪ್ತಿ-ನಿರ್ದಿಷ್ಟ
   ಪ್ರವೇಶ ಟೋಕನ್ಗಳನ್ನು ಬಳಸುತ್ತವೆ. ವ್ಯುತ್ಪತ್ತಿ ಲಭ್ಯವಿಲ್ಲದಿದ್ದರೆ, CLI ಹೆಡರ್ ಅನ್ನು
   ಬಿಟ್ಟುಬಿಡುತ್ತದೆ ಮತ್ತು ಖಾಲಿ ಟೋಕನ್ ಅನ್ನು ಮಾನ್ಯವೆಂದು ಪರಿಗಣಿಸುವ ಬದಲು
   `omniroute doctor` ವೈಫಲ್ಯವನ್ನು ವರದಿ ಮಾಡುತ್ತದೆ.
4. ಸರ್ವರ್ (`src/server/authz/policies/management.ts`) ಅದೇ ಸಾಲ್ಟ್ ಬಳಸಿ ನಿರೀಕ್ಷಿತ
   ಟೋಕನ್ ಅನ್ನು ಮರುಲೆಕ್ಕಾಚಾರ ಮಾಡುತ್ತದೆ ಮತ್ತು ಸಮಯ-ಆಧಾರಿತ ಹೊರತೆಗೆಯುವಿಕೆಯನ್ನು
   ತಡೆಯಲು `timingSafeEqual` ಮೂಲಕ ಹೋಲಿಸುತ್ತದೆ.

## ಭದ್ರತಾ ಗುಣಲಕ್ಷಣಗಳು

| ಗುಣಲಕ್ಷಣ                        | ವಿವರ                                                                                                                                                                                                                    |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ಲೂಪ್ಬ್ಯಾಕ್ಗೆ ಮಾತ್ರ**          | ಸರ್ವರ್ನ ವಿಶ್ವಾಸಾರ್ಹ ಪೀರ್-ಸ್ಥಳೀಯತಾ ಗುರುತು (ನಿಜವಾದ TCP ಪೀರ್ ವಿಳಾಸದಿಂದ ಪಡೆಯಲಾಗಿದೆ) ಲೂಪ್ಬ್ಯಾಕ್ ಎಂದು ಸೂಚಿಸಿದಾಗ ಮಾತ್ರ ಸ್ವೀಕರಿಸಲಾಗುತ್ತದೆ. ಸ್ಥಳೀಯತೆಯನ್ನು ನಿರ್ಧರಿಸಲು ಕ್ಲೈಂಟ್-ನಿಯಂತ್ರಿತ `Host` ಹೆಡರ್ ಅನ್ನು ಎಂದಿಗೂ ನಂಬಲಾಗುವುದಿಲ್ಲ. |
| **ಸ್ಥಿರ-ಸಮಯದ ಹೋಲಿಕೆ**           | `crypto.timingSafeEqual` ಸಮಯ-ಆಧಾರಿತ ದಾಳಿಗಳನ್ನು ತಡೆಯುತ್ತದೆ.                                                                                                                                                              |
| **ಹಿಮ್ಮುಖಗೊಳಿಸಲಾಗದು**           | HMAC ಔಟ್ಪುಟ್ನಿಂದ ಯಂತ್ರ ID ಅನ್ನು ಮರುಪಡೆಯಲು ಸಾಧ್ಯವಿಲ್ಲ.                                                                                                                                                                   |
| **`always`-ರಕ್ಷಿತ ಬೈಪಾಸ್ ಇಲ್ಲ** | CLI ಟೋಕನ್ ಪರಿಶೀಲನೆಗೆ ಮೊದಲು `isAlwaysProtectedPath()` ಅನ್ನು ಮೌಲ್ಯಮಾಪನ ಮಾಡಲಾಗುತ್ತದೆ. `/api/shutdown` ಮತ್ತು `/api/settings/database` ಗೆ ಯಾವಾಗಲೂ JWT ಅಗತ್ಯವಿರುತ್ತದೆ.                                                        |
| **ರಫ್ತು ಮಾಡಲಾಗದು**              | ಟೋಕನ್ ಅನ್ನು ಎಂದಿಗೂ ಡಿಸ್ಕ್ಗೆ ಬರೆಯಲಾಗುವುದಿಲ್ಲ ಅಥವಾ ಲಾಗ್ ಮಾಡಲಾಗುವುದಿಲ್ಲ.                                                                                                                                                   |

## ಡೀಫಾಲ್ಟ್ ಸಾಲ್ಟ್ (ಪ್ರತಿ ಸ್ಥಾಪನೆಗೆ ಯಾದೃಚ್ಛಿಕ)

`OMNIROUTE_CLI_SALT` ಹೊಂದಿಸದಿದ್ದಾಗ, ಸಾಲ್ಟ್ ಒಮ್ಮೆ ರಚಿಸಲಾದ ಯಾದೃಚ್ಛಿಕ 64-ಅಕ್ಷರಗಳ
ಹೆಕ್ಸ್ ಸ್ಟ್ರಿಂಗ್ ಆಗಿದ್ದು, ಅದನ್ನು `<DATA_DIR>/cli-token-salt.json` ನಲ್ಲಿ (`0600`
ಮೋಡ್) ಶಾಶ್ವತವಾಗಿ ಉಳಿಸಲಾಗುತ್ತದೆ — ರೆಪೊಸಿಟರಿಯಲ್ಲಿ ಸೇರಿಸಲಾದ
`omniroute-cli-auth-v1` ಲಿಟರಲ್ ಅಲ್ಲ. `src/lib/machineToken.ts` ನಲ್ಲಿರುವ
`getActiveSalt()` ಮತ್ತು `bin/cli/utils/cliToken.mjs` ನಲ್ಲಿರುವ ಅದರ ಪ್ರತಿರೂಪ ಎರಡೂ
ಒಂದೇ ಫೈಲ್ ಅನ್ನು ಓದುತ್ತವೆ, ಆದ್ದರಿಂದ ಈ ಸ್ಥಾಪನೆಯಲ್ಲಿರುವ ಸರ್ವರ್ ಮತ್ತು ಪ್ರತಿ CLI
ಚಾಲನೆಯೂ ಒಂದೇ ಮೌಲ್ಯವನ್ನು ಬಳಸುತ್ತವೆ; ಶಾಶ್ವತವಾಗಿ ಉಳಿಸಲಾದ ಅಥವಾ env ಸಾಲ್ಟ್ ಅನ್ನು ಇನ್ನೂ
ಸ್ಥಾಪಿಸಲು ಸಾಧ್ಯವಾಗದಿದ್ದಾಗ ಮಾತ್ರ (ಉದಾಹರಣೆಗೆ, ಸರ್ವರ್ ಎಂದಿಗೂ ಚಾಲನೆಯಾಗದ ಹೊಸ CLI-ಮಾತ್ರದ
ಸ್ಥಾಪನೆ) ರೆಪೊಸಿಟರಿಯಲ್ಲಿ ಸೇರಿಸಲಾದ ಲಿಟರಲ್ ಅನ್ನು ಕೊನೆಯ ಆಯ್ಕೆಯ ಫಾಲ್ಬ್ಯಾಕ್ ಆಗಿ
ಬಳಸಲಾಗುತ್ತದೆ. ಇದು ಹಳೆಯ ಸ್ಥಿರ ಲಿಟರಲ್ ಡೀಫಾಲ್ಟ್ನ ದೌರ್ಬಲ್ಯವನ್ನು ನಿವಾರಿಸುತ್ತದೆ:
`/etc/machine-id` ಸಾಮಾನ್ಯವಾಗಿ ಎಲ್ಲರಿಗೂ ಓದಲು ಸಾಧ್ಯವಾಗುವುದರಿಂದ,
`OMNIROUTE_CLI_SALT` ಅನ್ನು ಎಂದಿಗೂ ಹೊಂದಿಸದ ಪ್ರತಿಯೊಂದು ಸ್ಥಾಪನೆಗೂ ಯಾವುದೇ ಸ್ಥಳೀಯ
ಬಳಕೆದಾರರು ಅದೇ ಟೋಕನ್ ಅನ್ನು ವ್ಯುತ್ಪನ್ನಗೊಳಿಸಲು ಸಾಧ್ಯವಾಗುತ್ತಿತ್ತು.

## ಸಾಲ್ಟ್ ರೊಟೇಶನ್

ಕೋಡ್ ಬದಲಾವಣೆಗಳಿಲ್ಲದೆ ಉತ್ಪನ್ನಗೊಂಡ ಟೋಕನ್ ಅನ್ನು ರೊಟೇಟ್ ಮಾಡಲು `OMNIROUTE_CLI_SALT` ಅನ್ನು ಹೊಂದಿಸಿ — ಇದು
ಯಾವಾಗಲೂ ಪ್ರತಿ-ಇನ್ಸ್ಟಾಲ್ಗೆ ಸ್ಥಿರವಾಗಿ ಸಂಗ್ರಹಿಸಲಾದ ಸಾಲ್ಟ್ಗಿಂತ ಆದ್ಯತೆ ಪಡೆಯುತ್ತದೆ. ರೊಟೇಶನ್ ನಂತರ, ಈ ಯಂತ್ರದಲ್ಲಿರುವ ಎಲ್ಲಾ CLI
ಪ್ರಕ್ರಿಯೆಗಳು ಹೊಸ ಟೋಕನ್ ಅನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಬಳಸುತ್ತವೆ. ಹಿಂದಿನ ಉತ್ಪನ್ನಗೊಂಡ ಮೌಲ್ಯವನ್ನು ಬಹಿರಂಗಪಡಿಸಿರಬಹುದಾದ
ಪ್ರಕ್ರಿಯೆ-ಪಟ್ಟಿ ಸೋರಿಕೆಯ ನಂತರ ಇದು ಉಪಯುಕ್ತವಾಗಿದೆ.

```bash
# ಶಾಶ್ವತ ರೊಟೇಶನ್ (ಶೆಲ್ ಪ್ರೊಫೈಲ್ಗೆ ಸೇರಿಸಿ)
export OMNIROUTE_CLI_SALT="my-secret-salt-2026"

# ಹೊಸ ಟೋಕನ್ ಬಳಕೆಯಲ್ಲಿದೆ ಎಂಬುದನ್ನು ಪರಿಶೀಲಿಸಿ
omniroute status
```

## ಲೆಗಸಿ ಸ್ವರೂಪ (SHA-256, 32-ಅಕ್ಷರ) — ಇನ್ನೂ ಸ್ವೀಕರಿಸಲಾಗುತ್ತದೆ

ಮೇಲಿನ HMAC ಸ್ವರೂಪಕ್ಕೂ ಮೊದಲು, CLI ತನ್ನ ಟೋಕನ್ ಅನ್ನು
`SHA-256(machineId + salt).hex[0..32]` (32-ಅಕ್ಷರದ ಪ್ರಿಫಿಕ್ಸ್) ರೂಪದಲ್ಲಿ
`bin/cli/utils/cliToken.mjs` ನಲ್ಲಿ (`src/lib/machineToken.ts` ನಲ್ಲಿನ `getLegacyCliTokenSync`) ಉತ್ಪನ್ನಗೊಳಿಸುತ್ತಿತ್ತು.

ಹಿಂದಿನ ಆವೃತ್ತಿಗಳೊಂದಿಗಿನ ಹೊಂದಾಣಿಕೆಗಾಗಿ ಸರ್ವರ್ **ಎರಡೂ** ಸ್ವರೂಪಗಳನ್ನು ಸ್ವೀಕರಿಸುತ್ತದೆ: ಪರಿಶೀಲಕವು
`expectedTokens = [getMachineTokenSync(), getLegacyCliTokenSync()]` ಅನ್ನು ರಚಿಸಿ, ಒಳಬರುವ
ಹೆಡರ್ ಅನ್ನು ಪ್ರತಿಯೊಂದರೊಂದಿಗೆ `timingSafeEqual` ಬಳಸಿ ಹೋಲಿಸುತ್ತದೆ
(`src/server/authz/policies/management.ts` ಮತ್ತು `src/lib/middleware/cliTokenAuth.ts`).
ಆದ್ದರಿಂದ, ಒಂದು ಟೋಕನ್ 64-ಅಕ್ಷರದ HMAC ಡೈಜೆಸ್ಟ್ ಅಥವಾ 32-ಅಕ್ಷರದ
ಲೆಗಸಿ SHA-256 ಪ್ರಿಫಿಕ್ಸ್ಗಳಲ್ಲಿ **ಯಾವುದಾದರೂ ಒಂದಕ್ಕೆ** ಹೊಂದಿಕೆಯಾದರೆ ಅದು ಮಾನ್ಯವಾಗಿರುತ್ತದೆ.

**ಆಯ್ಕೆಯಿಂದ ಹೊರಗುಳಿಯುವಿಕೆ:** CLI ಟೋಕನ್ ಕಾರ್ಯವಿಧಾನವನ್ನು ಸಂಪೂರ್ಣವಾಗಿ ನಿಷ್ಕ್ರಿಯಗೊಳಿಸಲು `OMNIROUTE_DISABLE_CLI_TOKEN=true` ಅನ್ನು (env ಅಥವಾ `.env`) ಹೊಂದಿಸಿ;
ಆಗ ಎಲ್ಲಾ ಪ್ರವೇಶಕ್ಕೂ ಸ್ಪಷ್ಟವಾದ API ಕೀ ಅಗತ್ಯವಿರುತ್ತದೆ. ಬಹು-ಬಳಕೆದಾರ
ಹೋಸ್ಟ್ಗಳಲ್ಲಿ ಇದನ್ನು ಶಿಫಾರಸು ಮಾಡಲಾಗುತ್ತದೆ, ಏಕೆಂದರೆ `machine-id` ಪ್ರತಿ-ಸಾಧನಕ್ಕೆ ಸಂಬಂಧಿಸಿದ್ದು (ಪ್ರತಿ-ಬಳಕೆದಾರನಿಗಲ್ಲ), ಮತ್ತು ಅದೇ
ಹೋಸ್ಟ್ನಲ್ಲಿರುವ ಇನ್ನೊಬ್ಬ ಬಳಕೆದಾರ ಅದೇ ಟೋಕನ್ ಅನ್ನು ಲೆಕ್ಕಹಾಕಬಹುದು.

## ಫೈಲ್ಗಳು

| ಫೈಲ್                                      | ಉದ್ದೇಶ                                                 |
| ----------------------------------------- | ------------------------------------------------------ |
| `src/lib/machineToken.ts`                 | ಟೋಕನ್ ಉತ್ಪನ್ನಗೊಳಿಸುವಿಕೆ (`getMachineTokenSync`)        |
| `bin/cli/utils/cliToken.mjs`              | ಅದೇ ಉತ್ಪನ್ನಗೊಳಿಸುವಿಕೆಯ CLI-ಬದಿಯ ಪ್ರತಿರೂಪ               |
| `<DATA_DIR>/cli-token-salt.json`          | ಸ್ಥಿರವಾಗಿ ಸಂಗ್ರಹಿಸಲಾದ ಯಾದೃಚ್ಛಿಕ ಪ್ರತಿ-ಇನ್ಸ್ಟಾಲ್ ಸಾಲ್ಟ್ |
| `src/server/authz/headers.ts`             | `CLI_TOKEN_HEADER` ಸ್ಥಿರಾಂಕ                            |
| `src/server/authz/policies/management.ts` | ಸರ್ವರ್-ಬದಿಯ ಪರಿಶೀಲನೆ                                   |
| `src/server/authz/routeGuard.ts`          | ಲೂಪ್ಬ್ಯಾಕ್ ಹೋಸ್ಟ್ ಪರಿಶೀಲನೆ (`isLoopbackHost`)          |

## ಇದನ್ನೂ ನೋಡಿ

- `docs/security/ROUTE_GUARD_TIERS.md` — ರೂಟ್ ರಕ್ಷಣಾ ಹಂತಗಳು
- `docs/architecture/AUTHZ_GUIDE.md` — ಸಂಪೂರ್ಣ ದೃಢೀಕರಣ ಪೈಪ್ಲೈನ್
