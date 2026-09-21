# CLI Machine-ID Token (Yorùbá)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CLI_TOKEN.md) · 🇪🇹 [am](../../../am/docs/security/CLI_TOKEN.md) · 🇸🇦 [ar](../../../ar/docs/security/CLI_TOKEN.md) · 🇦🇿 [az](../../../az/docs/security/CLI_TOKEN.md) · 🇧🇬 [bg](../../../bg/docs/security/CLI_TOKEN.md) · 🇧🇩 [bn](../../../bn/docs/security/CLI_TOKEN.md) · 🇨🇿 [cs](../../../cs/docs/security/CLI_TOKEN.md) · 🇩🇰 [da](../../../da/docs/security/CLI_TOKEN.md) · 🇩🇪 [de](../../../de/docs/security/CLI_TOKEN.md) · 🇬🇷 [el](../../../el/docs/security/CLI_TOKEN.md) · 🇪🇸 [es](../../../es/docs/security/CLI_TOKEN.md) · 🇪🇪 [et](../../../et/docs/security/CLI_TOKEN.md) · 🇮🇷 [fa](../../../fa/docs/security/CLI_TOKEN.md) · 🇫🇮 [fi](../../../fi/docs/security/CLI_TOKEN.md) · 🇫🇷 [fr](../../../fr/docs/security/CLI_TOKEN.md) · 🇮🇪 [ga](../../../ga/docs/security/CLI_TOKEN.md) · 🇮🇳 [gu](../../../gu/docs/security/CLI_TOKEN.md) · 🇳🇬 [ha](../../../ha/docs/security/CLI_TOKEN.md) · 🇮🇱 [he](../../../he/docs/security/CLI_TOKEN.md) · 🇮🇳 [hi](../../../hi/docs/security/CLI_TOKEN.md) · 🇭🇷 [hr](../../../hr/docs/security/CLI_TOKEN.md) · 🇭🇺 [hu](../../../hu/docs/security/CLI_TOKEN.md) · 🇦🇲 [hy](../../../hy/docs/security/CLI_TOKEN.md) · 🇮🇩 [id](../../../id/docs/security/CLI_TOKEN.md) · 🇳🇬 [ig](../../../ig/docs/security/CLI_TOKEN.md) · 🇮🇹 [it](../../../it/docs/security/CLI_TOKEN.md) · 🇯🇵 [ja](../../../ja/docs/security/CLI_TOKEN.md) · 🇬🇪 [ka](../../../ka/docs/security/CLI_TOKEN.md) · 🇰🇭 [km](../../../km/docs/security/CLI_TOKEN.md) · 🇮🇳 [kn](../../../kn/docs/security/CLI_TOKEN.md) · 🇰🇷 [ko](../../../ko/docs/security/CLI_TOKEN.md) · 🇱🇹 [lt](../../../lt/docs/security/CLI_TOKEN.md) · 🇱🇻 [lv](../../../lv/docs/security/CLI_TOKEN.md) · 🇮🇳 [ml](../../../ml/docs/security/CLI_TOKEN.md) · 🇮🇳 [mr](../../../mr/docs/security/CLI_TOKEN.md) · 🇲🇾 [ms](../../../ms/docs/security/CLI_TOKEN.md) · 🇲🇹 [mt](../../../mt/docs/security/CLI_TOKEN.md) · 🇲🇲 [my](../../../my/docs/security/CLI_TOKEN.md) · 🇳🇵 [ne](../../../ne/docs/security/CLI_TOKEN.md) · 🇳🇱 [nl](../../../nl/docs/security/CLI_TOKEN.md) · 🇳🇴 [no](../../../no/docs/security/CLI_TOKEN.md) · 🇮🇳 [or](../../../or/docs/security/CLI_TOKEN.md) · 🇮🇳 [pa](../../../pa/docs/security/CLI_TOKEN.md) · 🇵🇭 [phi](../../../phi/docs/security/CLI_TOKEN.md) · 🇵🇱 [pl](../../../pl/docs/security/CLI_TOKEN.md) · 🇵🇹 [pt](../../../pt/docs/security/CLI_TOKEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CLI_TOKEN.md) · 🇷🇴 [ro](../../../ro/docs/security/CLI_TOKEN.md) · 🇷🇺 [ru](../../../ru/docs/security/CLI_TOKEN.md) · 🇱🇰 [si](../../../si/docs/security/CLI_TOKEN.md) · 🇸🇰 [sk](../../../sk/docs/security/CLI_TOKEN.md) · 🇸🇮 [sl](../../../sl/docs/security/CLI_TOKEN.md) · 🇷🇸 [sr](../../../sr/docs/security/CLI_TOKEN.md) · 🇸🇪 [sv](../../../sv/docs/security/CLI_TOKEN.md) · 🇰🇪 [sw](../../../sw/docs/security/CLI_TOKEN.md) · 🇮🇳 [ta](../../../ta/docs/security/CLI_TOKEN.md) · 🇮🇳 [te](../../../te/docs/security/CLI_TOKEN.md) · 🇹🇭 [th](../../../th/docs/security/CLI_TOKEN.md) · 🇹🇷 [tr](../../../tr/docs/security/CLI_TOKEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CLI_TOKEN.md) · 🇵🇰 [ur](../../../ur/docs/security/CLI_TOKEN.md) · 🇺🇿 [uz](../../../uz/docs/security/CLI_TOKEN.md) · 🇻🇳 [vi](../../../vi/docs/security/CLI_TOKEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CLI_TOKEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CLI_TOKEN.md)

---

## Àkópò

Àwọn àṣẹ OmniRoute CLI ń ṣe ìfàṣẹsí sí API ìṣàkóso abẹ́lé nípa lílo àmì
`HMAC-SHA256(machine-id, salt)` tí a fi ránṣẹ́ nípasẹ̀ àkọlé ìbéèrè
`x-omniroute-cli-token`.

Èyí ń jẹ́ kí àwọn àṣẹ abẹ́lẹ̀ CLI (`omniroute status`, `omniroute providers`, àti bẹ́ẹ̀ bẹ́ẹ̀ lọ)
pe àwọn endpoint ìṣàkóso láìjẹ́ pé onílò ní láti pèsè JWT tàbí
ọ̀rọ̀ aṣínà ní gbogbo ìgbà tí a bá pè é.

## Bí ó ṣe ń ṣiṣẹ́

1. `getMachineTokenSync()` ń ka ID ẹ̀rọ hardware nípasẹ̀ `node-machine-id`
   (ó máa lo okun òfo bí èyí bá kùnà, èyí tí yóò mú ìfàṣẹsí CLI ṣiṣẹ́ mọ́).
2. Ó ń ṣírò `HMAC-SHA256(machine_id, salt)`, ó sì ń dá digest hex oní-lẹ́tà-64
   padà — àmì tí ó ṣeé tún ṣe ní ọ̀nà kan náà, tí kò ṣeé yí padà, tí a sì so mọ́ ẹ̀rọ yìí.
3. CLI máa ń fi àmì náà ránṣẹ́ gẹ́gẹ́ bí `x-omniroute-cli-token` kìkì nígbà tí ibi
   àfojúsùn tí a ti yanjú bá jẹ́ URL loopback tí a sọ ní kedere (`localhost`, `127.0.0.0/8`, tàbí
   loopback IPv6). Àwọn ìbéèrè tí ó gbé àmì náà máa ń lo `redirect: error`, nítorí náà
   ìdarípadà abẹ́lé kò lè fi í ránṣẹ́ sí origin mìíràn. Àwọn context jíjìn máa ń lo
   àwọn access token tí a fi scope sí dípò rẹ̀. Tí kò bá ṣeé ṣe láti ṣe ìdásílẹ̀ náà, CLI kì í fi àkọlé náà sí,
   `omniroute doctor` sì máa ń jabo ìkùnà náà dípò kí ó ka àmì òfo
   sí èyí tí ó fẹsẹ̀ múlẹ̀.
4. Server (`src/server/authz/policies/management.ts`) tún ń ṣírò
   àmì tí a retí pẹ̀lú salt kan náà, ó sì ń fi wé e nípasẹ̀ `timingSafeEqual` láti
   dènà ìyọjáde tí ó dá lórí àkókò.

## Àwọn àbùdá ààbò

| Àbùdá                             | Àlàyé                                                                                                                                                                                                      |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Loopback nìkan**                | A máa gba á kìkì nígbà tí àmì ìjẹ́rìísí àdúgbò peer tí server gbẹ́kẹ̀ lé (tí a yọ láti inú àdírẹ́sì peer TCP gidi) bá sọ pé ó jẹ́ loopback. A kì í gbẹ́kẹ̀ lé àkọlé `Host` tí client lè ṣàkóso láti pinnu àdúgbò. |
| **Ìfiwéra àkókò-àìyípadà**        | `crypto.timingSafeEqual` ń dènà àwọn ìkọlù àkókò.                                                                                                                                                          |
| **Kò ṣeé yí padà**                | Àbájáde HMAC kò lè gba machine-id padà.                                                                                                                                                                    |
| **Kò sí yíyọ ààbò `always` kọjá** | A máa ń ṣe àyẹ̀wò `isAlwaysProtectedPath()` ṣáájú àyẹ̀wò àmì CLI. `/api/shutdown` àti `/api/settings/database` máa ń nílò JWT nígbà gbogbo.                                                                  |
| **Kò ṣeé kó jáde**                | A kì í kọ àmì náà sí disk, bẹ́ẹ̀ ni a kì í ṣe log rẹ̀.                                                                                                                                                        |

## Salt àìyípadà (àìròtẹ́lẹ̀ fún ìfisórí kọ̀ọ̀kan)

Nígbà tí a kò bá ṣètò `OMNIROUTE_CLI_SALT`, salt náà jẹ́ okun hex oní-lẹ́tà-64
àìròtẹ́lẹ̀ tí a dá lẹ́ẹ̀kan, tí a sì pa mọ́ sí `<DATA_DIR>/cli-token-salt.json` (mode `0600`) —
kì í ṣe literal `omniroute-cli-auth-v1` tí a fi sínú repository. Mejeeji `getActiveSalt()` nínú
`src/lib/machineToken.ts` àti ẹ̀dà àfihàn rẹ̀ nínú `bin/cli/utils/cliToken.mjs` ń ka
fáìlì kan náà, nítorí náà server àti gbogbo ìpè CLI lórí ìfisórí yìí máa ń dé orí
iye kan náà; literal tí a fi sínú repository ni a máa ń lò gẹ́gẹ́ bí fallback ìkẹyìn nìkan nígbà tí kò bá tíì ṣeé dá
salt tí a pa mọ́ tàbí salt env kan múlẹ̀ (fún àpẹẹrẹ, ìfisórí tuntun tí ó ní CLI nìkan
ṣáájú kí server tó ṣiṣẹ́ rí). Èyí ń dí àìlera default literal àtijọ́ tí kò yí padà:
`/etc/machine-id` sábà máa ń ṣeé kà fún gbogbo ènìyàn, nítorí náà onílò abẹ́lé èyíkéyìí lè
ṣe ìdásílẹ̀ àmì kan náà fún gbogbo ìfisórí tí kò ṣètò
`OMNIROUTE_CLI_SALT` rí.

## Yíyí salt padà

Ṣètò `OMNIROUTE_CLI_SALT` láti yí token tí a ṣẹ̀dá padà láì ṣe àyípadà sí kóòdù — ó máa ń ní ààyò nígbà gbogbo ju salt fún ìfiṣelẹ̀ kọ̀ọ̀kan tí a ti tọ́jú lọ. Lẹ́yìn yíyí padà, gbogbo àwọn process CLI lórí ẹ̀rọ yìí yóò lo token tuntun náà láìfọwọ́yí. Ó wúlò lẹ́yìn ìtújáde àtòjọ process kan tí ó ṣeé ṣe kí ó ti ṣí iye tí a ṣẹ̀dá tẹ́lẹ̀ payá.

```bash
# Yíyí padà tí yóò wà pẹ́ (ṣàfikún-un sí shell profile)
export OMNIROUTE_CLI_SALT="my-secret-salt-2026"

# Ṣàyẹ̀wò pé token tuntun ń ṣiṣẹ́
omniroute status
```

## Fọ́ọ̀mù àtijọ́ (SHA-256, àmì 32) — a ṣì ń gbà á

Ṣáájú fọ́ọ̀mù HMAC tó wà lókè, CLI ṣẹ̀dá token rẹ̀ gẹ́gẹ́ bí
`SHA-256(machineId + salt).hex[0..32]` (ìbẹ̀rẹ̀ oníàmì 32) nínú
`bin/cli/utils/cliToken.mjs` (`getLegacyCliTokenSync` nínú `src/lib/machineToken.ts`).

Fún ìbámu sẹ́yìn, server ń gba **àwọn fọ́ọ̀mù méjèèjì**: olùṣàyẹ̀wò náà kọ
`expectedTokens = [getMachineTokenSync(), getLegacyCliTokenSync()]` ó sì fi header
tí ń wọlé wé ọ̀kọ̀ọ̀kan pẹ̀lú `timingSafeEqual`
(`src/server/authz/policies/management.ts` àti `src/lib/middleware/cliTokenAuth.ts`).
Nítorí náà, token kan wúlò bí ó bá bá **èyíkéyìí** nínú digest HMAC oníàmì 64 tàbí
ìbẹ̀rẹ̀ SHA-256 àtijọ́ oníàmì 32 mu.

**Kíkọ̀ láti lò ó:** ṣètò `OMNIROUTE_DISABLE_CLI_TOKEN=true` (env tàbí `.env`) láti pa ètò
token CLI náà pátápátá; lẹ́yìn náà, gbogbo ààyè ìwọlé yóò nílò kọ́kọ́rọ́ API tí a sọ ní kedere. Lórí àwọn
host tí ọ̀pọ̀ olùlò ń lò, a dámọ̀ràn èyí, nítorí `machine-id` jẹ́ ti ẹ̀rọ kọ̀ọ̀kan (kì í ṣe ti olùlò kọ̀ọ̀kan), olùlò
mìíràn lórí host kan náà sì lè ṣírò token kan náà.

## Àwọn fáìlì

| Fáìlì                                     | Ète                                        |
| ----------------------------------------- | ------------------------------------------ |
| `src/lib/machineToken.ts`                 | Ṣíṣẹ̀dá token (`getMachineTokenSync`)       |
| `bin/cli/utils/cliToken.mjs`              | Ẹ̀dà ìṣirò kan náà ní ẹ̀gbẹ́ CLI              |
| `<DATA_DIR>/cli-token-salt.json`          | Salt aláìlétò fún ìfiṣelẹ̀ kọ̀ọ̀kan tí a tọ́jú |
| `src/server/authz/headers.ts`             | Àìyípadà `CLI_TOKEN_HEADER`                |
| `src/server/authz/policies/management.ts` | Ìfàṣẹ̀sí ní ẹ̀gbẹ́ server                     |
| `src/server/authz/routeGuard.ts`          | Àyẹ̀wò host loopback (`isLoopbackHost`)     |

## Tún wo

- `docs/security/ROUTE_GUARD_TIERS.md` — àwọn ipele ààbò route
- `docs/architecture/AUTHZ_GUIDE.md` — gbogbo ìlànà ìfúnni-láṣẹ
