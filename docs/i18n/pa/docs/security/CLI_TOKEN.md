# CLI Machine-ID Token (ਪੰਜਾਬੀ)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CLI_TOKEN.md) · 🇪🇹 [am](../../../am/docs/security/CLI_TOKEN.md) · 🇸🇦 [ar](../../../ar/docs/security/CLI_TOKEN.md) · 🇦🇿 [az](../../../az/docs/security/CLI_TOKEN.md) · 🇧🇬 [bg](../../../bg/docs/security/CLI_TOKEN.md) · 🇧🇩 [bn](../../../bn/docs/security/CLI_TOKEN.md) · 🇧🇦 [bs](../../../bs/docs/security/CLI_TOKEN.md) · 🇨🇿 [cs](../../../cs/docs/security/CLI_TOKEN.md) · 🇩🇰 [da](../../../da/docs/security/CLI_TOKEN.md) · 🇩🇪 [de](../../../de/docs/security/CLI_TOKEN.md) · 🇬🇷 [el](../../../el/docs/security/CLI_TOKEN.md) · 🇪🇸 [es](../../../es/docs/security/CLI_TOKEN.md) · 🇪🇪 [et](../../../et/docs/security/CLI_TOKEN.md) · 🇮🇷 [fa](../../../fa/docs/security/CLI_TOKEN.md) · 🇫🇮 [fi](../../../fi/docs/security/CLI_TOKEN.md) · 🇫🇷 [fr](../../../fr/docs/security/CLI_TOKEN.md) · 🇮🇪 [ga](../../../ga/docs/security/CLI_TOKEN.md) · 🇮🇳 [gu](../../../gu/docs/security/CLI_TOKEN.md) · 🇳🇬 [ha](../../../ha/docs/security/CLI_TOKEN.md) · 🇮🇱 [he](../../../he/docs/security/CLI_TOKEN.md) · 🇮🇳 [hi](../../../hi/docs/security/CLI_TOKEN.md) · 🇭🇷 [hr](../../../hr/docs/security/CLI_TOKEN.md) · 🇭🇺 [hu](../../../hu/docs/security/CLI_TOKEN.md) · 🇦🇲 [hy](../../../hy/docs/security/CLI_TOKEN.md) · 🇮🇩 [id](../../../id/docs/security/CLI_TOKEN.md) · 🇳🇬 [ig](../../../ig/docs/security/CLI_TOKEN.md) · 🇮🇹 [it](../../../it/docs/security/CLI_TOKEN.md) · 🇯🇵 [ja](../../../ja/docs/security/CLI_TOKEN.md) · 🇬🇪 [ka](../../../ka/docs/security/CLI_TOKEN.md) · 🇰🇭 [km](../../../km/docs/security/CLI_TOKEN.md) · 🇮🇳 [kn](../../../kn/docs/security/CLI_TOKEN.md) · 🇰🇷 [ko](../../../ko/docs/security/CLI_TOKEN.md) · 🇱🇹 [lt](../../../lt/docs/security/CLI_TOKEN.md) · 🇱🇻 [lv](../../../lv/docs/security/CLI_TOKEN.md) · 🇮🇳 [ml](../../../ml/docs/security/CLI_TOKEN.md) · 🇮🇳 [mr](../../../mr/docs/security/CLI_TOKEN.md) · 🇲🇾 [ms](../../../ms/docs/security/CLI_TOKEN.md) · 🇲🇹 [mt](../../../mt/docs/security/CLI_TOKEN.md) · 🇲🇲 [my](../../../my/docs/security/CLI_TOKEN.md) · 🇳🇵 [ne](../../../ne/docs/security/CLI_TOKEN.md) · 🇳🇱 [nl](../../../nl/docs/security/CLI_TOKEN.md) · 🇳🇴 [no](../../../no/docs/security/CLI_TOKEN.md) · 🇮🇳 [or](../../../or/docs/security/CLI_TOKEN.md) · 🇵🇭 [phi](../../../phi/docs/security/CLI_TOKEN.md) · 🇵🇱 [pl](../../../pl/docs/security/CLI_TOKEN.md) · 🇵🇹 [pt](../../../pt/docs/security/CLI_TOKEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CLI_TOKEN.md) · 🇷🇴 [ro](../../../ro/docs/security/CLI_TOKEN.md) · 🇷🇺 [ru](../../../ru/docs/security/CLI_TOKEN.md) · 🇱🇰 [si](../../../si/docs/security/CLI_TOKEN.md) · 🇸🇰 [sk](../../../sk/docs/security/CLI_TOKEN.md) · 🇸🇮 [sl](../../../sl/docs/security/CLI_TOKEN.md) · 🇷🇸 [sr](../../../sr/docs/security/CLI_TOKEN.md) · 🇸🇪 [sv](../../../sv/docs/security/CLI_TOKEN.md) · 🇰🇪 [sw](../../../sw/docs/security/CLI_TOKEN.md) · 🇮🇳 [ta](../../../ta/docs/security/CLI_TOKEN.md) · 🇮🇳 [te](../../../te/docs/security/CLI_TOKEN.md) · 🇹🇭 [th](../../../th/docs/security/CLI_TOKEN.md) · 🇹🇷 [tr](../../../tr/docs/security/CLI_TOKEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CLI_TOKEN.md) · 🇵🇰 [ur](../../../ur/docs/security/CLI_TOKEN.md) · 🇺🇿 [uz](../../../uz/docs/security/CLI_TOKEN.md) · 🇻🇳 [vi](../../../vi/docs/security/CLI_TOKEN.md) · 🇳🇬 [yo](../../../yo/docs/security/CLI_TOKEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CLI_TOKEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CLI_TOKEN.md)

---

## ਸੰਖੇਪ ਜਾਣਕਾਰੀ

OmniRoute CLI ਕਮਾਂਡਾਂ ਸਥਾਨਕ ਪ੍ਰਬੰਧਨ API ਨਾਲ ਪ੍ਰਮਾਣੀਕਰਨ ਕਰਨ ਲਈ
`HMAC-SHA256(machine-id, salt)` ਟੋਕਨ ਵਰਤਦੀਆਂ ਹਨ, ਜਿਸ ਨੂੰ
`x-omniroute-cli-token` ਬੇਨਤੀ ਹੈਡਰ ਰਾਹੀਂ ਭੇਜਿਆ ਜਾਂਦਾ ਹੈ।

ਇਸ ਨਾਲ CLI ਉਪ-ਕਮਾਂਡਾਂ (`omniroute status`, `omniroute providers`, ਆਦਿ)
ਹਰ ਵਾਰ ਚਲਾਉਣ ਸਮੇਂ ਵਰਤੋਂਕਾਰ ਤੋਂ JWT ਜਾਂ ਪਾਸਵਰਡ ਮੁਹੱਈਆ ਕਰਵਾਏ ਬਿਨਾਂ
ਪ੍ਰਬੰਧਨ ਐਂਡਪੌਇੰਟਾਂ ਨੂੰ ਕਾਲ ਕਰ ਸਕਦੀਆਂ ਹਨ।

## ਇਹ ਕਿਵੇਂ ਕੰਮ ਕਰਦਾ ਹੈ

1. `getMachineTokenSync()` ਹਾਰਡਵੇਅਰ ਮਸ਼ੀਨ ID ਨੂੰ `node-machine-id` ਰਾਹੀਂ ਪੜ੍ਹਦਾ ਹੈ
   (ਅਸਫਲ ਹੋਣ 'ਤੇ ਖਾਲੀ ਸਤਰ ਵਰਤਦਾ ਹੈ, ਜਿਸ ਨਾਲ CLI ਪ੍ਰਮਾਣੀਕਰਨ ਅਯੋਗ ਹੋ ਜਾਂਦਾ ਹੈ)।
2. ਇਹ `HMAC-SHA256(machine_id, salt)` ਦੀ ਗਣਨਾ ਕਰਦਾ ਹੈ ਅਤੇ ਪੂਰਾ 64-ਅੱਖਰੀ
   ਹੈਕਸ ਡਾਈਜੈਸਟ ਵਾਪਸ ਕਰਦਾ ਹੈ — ਇਸ ਮਸ਼ੀਨ ਨਾਲ ਜੁੜਿਆ ਇੱਕ ਨਿਰਧਾਰਤ ਅਤੇ ਨਾ-ਉਲਟਾਇਆ ਜਾ ਸਕਣ ਵਾਲਾ ਟੋਕਨ।
3. CLI ਟੋਕਨ ਨੂੰ `x-omniroute-cli-token` ਵਜੋਂ ਸਿਰਫ਼ ਉਦੋਂ ਭੇਜਦਾ ਹੈ, ਜਦੋਂ ਨਿਰਧਾਰਤ
   ਮੰਜ਼ਿਲ ਇੱਕ ਸਪਸ਼ਟ ਲੂਪਬੈਕ URL (`localhost`, `127.0.0.0/8`, ਜਾਂ
   ਲੂਪਬੈਕ IPv6) ਹੋਵੇ। ਟੋਕਨ ਵਾਲੀਆਂ ਬੇਨਤੀਆਂ `redirect: error` ਵਰਤਦੀਆਂ ਹਨ, ਤਾਂ ਜੋ ਕੋਈ ਸਥਾਨਕ
   ਰੀਡਾਇਰੈਕਟ ਇਸ ਨੂੰ ਕਿਸੇ ਹੋਰ ਮੂਲ ਵੱਲ ਅੱਗੇ ਨਾ ਭੇਜ ਸਕੇ। ਰਿਮੋਟ ਸੰਦਰਭ ਇਸ ਦੀ ਬਜਾਏ ਸੀਮਿਤ-ਦਾਇਰੇ ਵਾਲੇ
   ਐਕਸੈੱਸ ਟੋਕਨ ਵਰਤਦੇ ਹਨ। ਜੇ ਟੋਕਨ ਬਣਾਉਣਾ ਸੰਭਵ ਨਾ ਹੋਵੇ, ਤਾਂ CLI ਹੈਡਰ ਨੂੰ ਛੱਡ ਦਿੰਦਾ ਹੈ
   ਅਤੇ `omniroute doctor` ਖਾਲੀ ਟੋਕਨ ਨੂੰ ਵੈਧ ਮੰਨਣ ਦੀ ਬਜਾਏ
   ਅਸਫਲਤਾ ਦੀ ਰਿਪੋਰਟ ਕਰਦਾ ਹੈ।
4. ਸਰਵਰ (`src/server/authz/policies/management.ts`) ਉਸੇ salt ਨਾਲ
   ਉਮੀਦ ਕੀਤੇ ਟੋਕਨ ਦੀ ਮੁੜ ਗਣਨਾ ਕਰਦਾ ਹੈ ਅਤੇ ਸਮੇਂ-ਆਧਾਰਿਤ ਨਿਕਾਸ ਨੂੰ ਰੋਕਣ ਲਈ
   `timingSafeEqual` ਰਾਹੀਂ ਤੁਲਨਾ ਕਰਦਾ ਹੈ।

## ਸੁਰੱਖਿਆ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ

| ਵਿਸ਼ੇਸ਼ਤਾ                         | ਵੇਰਵਾ                                                                                                                                                                                        |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **ਸਿਰਫ਼ ਲੂਪਬੈਕ**                  | ਸਿਰਫ਼ ਉਦੋਂ ਸਵੀਕਾਰਿਆ ਜਾਂਦਾ ਹੈ ਜਦੋਂ ਸਰਵਰ ਦੀ ਭਰੋਸੇਯੋਗ ਪੀਅਰ-ਸਥਾਨਕਤਾ ਮੋਹਰ (ਅਸਲ TCP ਪੀਅਰ ਪਤੇ ਤੋਂ ਪ੍ਰਾਪਤ) ਲੂਪਬੈਕ ਦਰਸਾਉਂਦੀ ਹੈ। ਸਥਾਨਕਤਾ ਲਈ ਕਲਾਇੰਟ-ਨਿਯੰਤਰਿਤ `Host` ਹੈਡਰ 'ਤੇ ਕਦੇ ਭਰੋਸਾ ਨਹੀਂ ਕੀਤਾ ਜਾਂਦਾ। |
| **ਸਥਿਰ-ਸਮਾਂ ਤੁਲਨਾ**               | `crypto.timingSafeEqual` ਸਮਾਂ-ਆਧਾਰਿਤ ਹਮਲਿਆਂ ਨੂੰ ਰੋਕਦਾ ਹੈ।                                                                                                                                    |
| **ਨਾ-ਉਲਟਾਇਆ ਜਾ ਸਕਣ ਵਾਲਾ**         | HMAC ਆਉਟਪੁੱਟ ਤੋਂ machine-id ਮੁੜ ਪ੍ਰਾਪਤ ਨਹੀਂ ਕੀਤਾ ਜਾ ਸਕਦਾ।                                                                                                                                    |
| **`always`-ਸੁਰੱਖਿਅਤ ਬਾਈਪਾਸ ਨਹੀਂ** | CLI ਟੋਕਨ ਜਾਂਚ ਤੋਂ ਪਹਿਲਾਂ `isAlwaysProtectedPath()` ਦਾ ਮੁਲਾਂਕਣ ਕੀਤਾ ਜਾਂਦਾ ਹੈ। `/api/shutdown` ਅਤੇ `/api/settings/database` ਲਈ ਹਮੇਸ਼ਾ JWT ਲੋੜੀਂਦਾ ਹੈ।                                          |
| **ਨਿਰਯਾਤ ਨਾ ਕੀਤਾ ਜਾ ਸਕਣ ਵਾਲਾ**    | ਟੋਕਨ ਨੂੰ ਕਦੇ ਵੀ ਡਿਸਕ 'ਤੇ ਨਹੀਂ ਲਿਖਿਆ ਜਾਂਦਾ ਅਤੇ ਨਾ ਹੀ ਲੌਗ ਕੀਤਾ ਜਾਂਦਾ ਹੈ।                                                                                                                       |

## ਡਿਫਾਲਟ salt (ਹਰ ਇੰਸਟਾਲੇਸ਼ਨ ਲਈ ਬੇਤਰਤੀਬ)

ਜਦੋਂ `OMNIROUTE_CLI_SALT` ਸੈੱਟ ਨਹੀਂ ਹੁੰਦਾ, ਤਾਂ salt ਇੱਕ ਬੇਤਰਤੀਬ 64-ਅੱਖਰੀ ਹੈਕਸ ਸਤਰ ਹੁੰਦਾ ਹੈ,
ਜੋ ਇੱਕ ਵਾਰ ਬਣਾਇਆ ਜਾਂਦਾ ਹੈ ਅਤੇ `<DATA_DIR>/cli-token-salt.json` (`0600` ਮੋਡ) 'ਤੇ ਸਥਾਈ ਤੌਰ 'ਤੇ ਸੰਭਾਲਿਆ ਜਾਂਦਾ ਹੈ —
ਨਾ ਕਿ ਰਿਪੋਜ਼ਟਰੀ ਵਿੱਚ ਸ਼ਾਮਲ ਸਥਿਰ ਮੁੱਲ `omniroute-cli-auth-v1`। `src/lib/machineToken.ts` ਵਿਚਲਾ
`getActiveSalt()` ਅਤੇ `bin/cli/utils/cliToken.mjs` ਵਿਚਲਾ ਇਸ ਦਾ ਸਮਕੱਖ ਦੋਵੇਂ ਇੱਕੋ
ਫ਼ਾਈਲ ਪੜ੍ਹਦੇ ਹਨ, ਇਸ ਲਈ ਇਸ ਇੰਸਟਾਲੇਸ਼ਨ 'ਤੇ ਸਰਵਰ ਅਤੇ ਹਰ CLI ਚਲਾਉਣਾ ਇੱਕੋ
ਮੁੱਲ 'ਤੇ ਇਕਸਾਰ ਹੋ ਜਾਂਦੇ ਹਨ; ਰਿਪੋਜ਼ਟਰੀ ਵਿੱਚ ਸ਼ਾਮਲ ਸਥਿਰ ਮੁੱਲ ਸਿਰਫ਼ ਆਖਰੀ ਵਿਕਲਪ ਵਜੋਂ ਵਰਤਿਆ ਜਾਂਦਾ ਹੈ, ਜਦੋਂ ਅਜੇ ਤੱਕ ਕੋਈ
ਸਥਾਈ ਜਾਂ env salt ਸਥਾਪਤ ਨਾ ਕੀਤਾ ਜਾ ਸਕੇ (ਉਦਾਹਰਨ ਵਜੋਂ, ਸਰਵਰ ਦੇ ਕਦੇ ਵੀ ਚੱਲਣ ਤੋਂ ਪਹਿਲਾਂ
ਇੱਕ ਨਵੀਂ ਸਿਰਫ਼-CLI ਇੰਸਟਾਲੇਸ਼ਨ)। ਇਹ ਪੁਰਾਣੇ ਸਥਿਰ ਡਿਫਾਲਟ ਦੀ ਇੱਕ ਕਮਜ਼ੋਰੀ ਨੂੰ ਦੂਰ ਕਰਦਾ ਹੈ:
`/etc/machine-id` ਆਮ ਤੌਰ 'ਤੇ ਹਰ ਕਿਸੇ ਵੱਲੋਂ ਪੜ੍ਹਨਯੋਗ ਹੁੰਦਾ ਹੈ, ਇਸ ਲਈ ਨਹੀਂ ਤਾਂ ਕੋਈ ਵੀ ਸਥਾਨਕ ਵਰਤੋਂਕਾਰ
ਹਰ ਉਸ ਇੰਸਟਾਲੇਸ਼ਨ ਲਈ ਉਹੀ ਟੋਕਨ ਬਣਾ ਸਕਦਾ ਸੀ ਜਿਸ ਨੇ ਕਦੇ ਵੀ
`OMNIROUTE_CLI_SALT` ਸੈੱਟ ਨਹੀਂ ਕੀਤਾ।

## ਸਾਲਟ ਰੋਟੇਸ਼ਨ

ਕੋਡ ਵਿੱਚ ਬਦਲਾਅ ਕੀਤੇ ਬਿਨਾਂ ਪ੍ਰਾਪਤ ਟੋਕਨ ਨੂੰ ਰੋਟੇਟ ਕਰਨ ਲਈ `OMNIROUTE_CLI_SALT` ਸੈੱਟ ਕਰੋ — ਇਹ
ਹਮੇਸ਼ਾ ਹਰ ਇੰਸਟਾਲੇਸ਼ਨ ਲਈ ਸਥਾਈ ਤੌਰ 'ਤੇ ਸੰਭਾਲੇ ਸਾਲਟ ਨਾਲੋਂ ਪਹਿਲ ਲੈਂਦਾ ਹੈ। ਰੋਟੇਸ਼ਨ ਤੋਂ ਬਾਅਦ, ਇਸ ਮਸ਼ੀਨ ਉੱਤੇ ਸਾਰੀਆਂ CLI
ਪ੍ਰਕਿਰਿਆਵਾਂ ਆਪਣੇ ਆਪ ਨਵੇਂ ਟੋਕਨ ਦੀ ਵਰਤੋਂ ਕਰਨਗੀਆਂ। ਇਹ ਉਸ ਪ੍ਰਕਿਰਿਆ-ਸੂਚੀ ਲੀਕ ਤੋਂ ਬਾਅਦ ਲਾਭਦਾਇਕ ਹੈ
ਜਿਸ ਨਾਲ ਪਿਛਲਾ ਪ੍ਰਾਪਤ ਮੁੱਲ ਸਾਹਮਣੇ ਆਇਆ ਹੋ ਸਕਦਾ ਹੈ।

```bash
# ਸਥਾਈ ਰੋਟੇਸ਼ਨ (ਸ਼ੈੱਲ ਪ੍ਰੋਫਾਈਲ ਵਿੱਚ ਸ਼ਾਮਲ ਕਰੋ)
export OMNIROUTE_CLI_SALT="my-secret-salt-2026"

# ਪੁਸ਼ਟੀ ਕਰੋ ਕਿ ਨਵਾਂ ਟੋਕਨ ਵਰਤੋਂ ਵਿੱਚ ਹੈ
omniroute status
```

## ਪੁਰਾਤਨ ਫਾਰਮੈਟ (SHA-256, 32-ਅੱਖਰ) — ਅਜੇ ਵੀ ਸਵੀਕਾਰਿਆ ਜਾਂਦਾ ਹੈ

ਉਪਰੋਕਤ HMAC ਫਾਰਮੈਟ ਤੋਂ ਪਹਿਲਾਂ, CLI ਆਪਣੇ ਟੋਕਨ ਨੂੰ
`SHA-256(machineId + salt).hex[0..32]` (ਇੱਕ 32-ਅੱਖਰੀ ਅਗੇਤਰ) ਵਜੋਂ
`bin/cli/utils/cliToken.mjs` ਵਿੱਚ ਪ੍ਰਾਪਤ ਕਰਦਾ ਸੀ (`src/lib/machineToken.ts` ਵਿੱਚ `getLegacyCliTokenSync`)।

ਪਿਛਲੀ ਅਨੁਕੂਲਤਾ ਲਈ ਸਰਵਰ **ਦੋਵੇਂ** ਫਾਰਮੈਟ ਸਵੀਕਾਰਦਾ ਹੈ: ਤਸਦੀਕਕਾਰ
`expectedTokens = [getMachineTokenSync(), getLegacyCliTokenSync()]` ਬਣਾਉਂਦਾ ਹੈ ਅਤੇ
ਆਉਣ ਵਾਲੇ ਹੈਡਰ ਦੀ ਹਰੇਕ ਨਾਲ `timingSafeEqual` ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਤੁਲਨਾ ਕਰਦਾ ਹੈ
(`src/server/authz/policies/management.ts` ਅਤੇ `src/lib/middleware/cliTokenAuth.ts`)।
ਇਸ ਲਈ ਟੋਕਨ ਵੈਧ ਹੈ ਜੇਕਰ ਇਹ 64-ਅੱਖਰੀ HMAC ਡਾਈਜੈਸਟ ਜਾਂ 32-ਅੱਖਰੀ
ਪੁਰਾਤਨ SHA-256 ਅਗੇਤਰ ਵਿੱਚੋਂ **ਕਿਸੇ ਇੱਕ** ਨਾਲ ਮੇਲ ਖਾਂਦਾ ਹੈ।

**ਬਾਹਰ ਰਹਿਣ ਦੀ ਚੋਣ:** CLI ਟੋਕਨ ਵਿਧੀ ਨੂੰ ਪੂਰੀ ਤਰ੍ਹਾਂ ਅਯੋਗ ਕਰਨ ਲਈ `OMNIROUTE_DISABLE_CLI_TOKEN=true` (`env` ਜਾਂ `.env`) ਸੈੱਟ ਕਰੋ;
ਫਿਰ ਸਾਰੀ ਪਹੁੰਚ ਲਈ ਇੱਕ ਸਪਸ਼ਟ API ਕੁੰਜੀ ਦੀ ਲੋੜ ਹੋਵੇਗੀ। ਬਹੁ-ਉਪਭੋਗਤਾ
ਹੋਸਟਾਂ ਉੱਤੇ ਇਸ ਦੀ ਸਿਫ਼ਾਰਸ਼ ਕੀਤੀ ਜਾਂਦੀ ਹੈ, ਕਿਉਂਕਿ `machine-id` ਪ੍ਰਤੀ-ਡਿਵਾਈਸ ਹੁੰਦਾ ਹੈ (ਪ੍ਰਤੀ-ਉਪਭੋਗਤਾ ਨਹੀਂ) ਅਤੇ ਉਸੇ
ਹੋਸਟ ਉੱਤੇ ਕੋਈ ਹੋਰ ਉਪਭੋਗਤਾ ਵੀ ਉਹੀ ਟੋਕਨ ਗਣਨਾ ਕਰ ਸਕਦਾ ਹੈ।

## ਫਾਈਲਾਂ

| ਫਾਈਲ                                      | ਉਦੇਸ਼                                              |
| ----------------------------------------- | -------------------------------------------------- |
| `src/lib/machineToken.ts`                 | ਟੋਕਨ ਪ੍ਰਾਪਤੀ (`getMachineTokenSync`)               |
| `bin/cli/utils/cliToken.mjs`              | ਉਸੇ ਪ੍ਰਾਪਤੀ ਦਾ CLI-ਪਾਸੇ ਦਾ ਪ੍ਰਤੀਰੂਪ                |
| `<DATA_DIR>/cli-token-salt.json`          | ਹਰ ਇੰਸਟਾਲੇਸ਼ਨ ਲਈ ਸਥਾਈ ਤੌਰ 'ਤੇ ਸੰਭਾਲਿਆ ਬੇਤਰਤੀਬ ਸਾਲਟ |
| `src/server/authz/headers.ts`             | `CLI_TOKEN_HEADER` ਸਥਿਰਾਂਕ                         |
| `src/server/authz/policies/management.ts` | ਸਰਵਰ-ਪਾਸੇ ਦੀ ਤਸਦੀਕ                                 |
| `src/server/authz/routeGuard.ts`          | ਲੂਪਬੈਕ ਹੋਸਟ ਜਾਂਚ (`isLoopbackHost`)                |

## ਇਹ ਵੀ ਵੇਖੋ

- `docs/security/ROUTE_GUARD_TIERS.md` — ਰੂਟ ਸੁਰੱਖਿਆ ਪੱਧਰ
- `docs/architecture/AUTHZ_GUIDE.md` — ਪੂਰੀ ਅਧਿਕਾਰਤਾ ਪਾਈਪਲਾਈਨ
