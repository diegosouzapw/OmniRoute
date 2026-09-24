# CLI Machine-ID Token (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CLI_TOKEN.md) · 🇪🇹 [am](../../../am/docs/security/CLI_TOKEN.md) · 🇸🇦 [ar](../../../ar/docs/security/CLI_TOKEN.md) · 🇦🇿 [az](../../../az/docs/security/CLI_TOKEN.md) · 🇧🇬 [bg](../../../bg/docs/security/CLI_TOKEN.md) · 🇧🇩 [bn](../../../bn/docs/security/CLI_TOKEN.md) · 🇧🇦 [bs](../../../bs/docs/security/CLI_TOKEN.md) · 🇨🇿 [cs](../../../cs/docs/security/CLI_TOKEN.md) · 🇩🇰 [da](../../../da/docs/security/CLI_TOKEN.md) · 🇩🇪 [de](../../../de/docs/security/CLI_TOKEN.md) · 🇬🇷 [el](../../../el/docs/security/CLI_TOKEN.md) · 🇪🇸 [es](../../../es/docs/security/CLI_TOKEN.md) · 🇪🇪 [et](../../../et/docs/security/CLI_TOKEN.md) · 🇮🇷 [fa](../../../fa/docs/security/CLI_TOKEN.md) · 🇫🇮 [fi](../../../fi/docs/security/CLI_TOKEN.md) · 🇫🇷 [fr](../../../fr/docs/security/CLI_TOKEN.md) · 🇮🇪 [ga](../../../ga/docs/security/CLI_TOKEN.md) · 🇮🇳 [gu](../../../gu/docs/security/CLI_TOKEN.md) · 🇳🇬 [ha](../../../ha/docs/security/CLI_TOKEN.md) · 🇮🇱 [he](../../../he/docs/security/CLI_TOKEN.md) · 🇮🇳 [hi](../../../hi/docs/security/CLI_TOKEN.md) · 🇭🇷 [hr](../../../hr/docs/security/CLI_TOKEN.md) · 🇭🇺 [hu](../../../hu/docs/security/CLI_TOKEN.md) · 🇦🇲 [hy](../../../hy/docs/security/CLI_TOKEN.md) · 🇮🇩 [id](../../../id/docs/security/CLI_TOKEN.md) · 🇮🇹 [it](../../../it/docs/security/CLI_TOKEN.md) · 🇯🇵 [ja](../../../ja/docs/security/CLI_TOKEN.md) · 🇬🇪 [ka](../../../ka/docs/security/CLI_TOKEN.md) · 🇰🇭 [km](../../../km/docs/security/CLI_TOKEN.md) · 🇮🇳 [kn](../../../kn/docs/security/CLI_TOKEN.md) · 🇰🇷 [ko](../../../ko/docs/security/CLI_TOKEN.md) · 🇱🇹 [lt](../../../lt/docs/security/CLI_TOKEN.md) · 🇱🇻 [lv](../../../lv/docs/security/CLI_TOKEN.md) · 🇮🇳 [ml](../../../ml/docs/security/CLI_TOKEN.md) · 🇮🇳 [mr](../../../mr/docs/security/CLI_TOKEN.md) · 🇲🇾 [ms](../../../ms/docs/security/CLI_TOKEN.md) · 🇲🇹 [mt](../../../mt/docs/security/CLI_TOKEN.md) · 🇲🇲 [my](../../../my/docs/security/CLI_TOKEN.md) · 🇳🇵 [ne](../../../ne/docs/security/CLI_TOKEN.md) · 🇳🇱 [nl](../../../nl/docs/security/CLI_TOKEN.md) · 🇳🇴 [no](../../../no/docs/security/CLI_TOKEN.md) · 🇮🇳 [or](../../../or/docs/security/CLI_TOKEN.md) · 🇮🇳 [pa](../../../pa/docs/security/CLI_TOKEN.md) · 🇵🇭 [phi](../../../phi/docs/security/CLI_TOKEN.md) · 🇵🇱 [pl](../../../pl/docs/security/CLI_TOKEN.md) · 🇵🇹 [pt](../../../pt/docs/security/CLI_TOKEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CLI_TOKEN.md) · 🇷🇴 [ro](../../../ro/docs/security/CLI_TOKEN.md) · 🇷🇺 [ru](../../../ru/docs/security/CLI_TOKEN.md) · 🇱🇰 [si](../../../si/docs/security/CLI_TOKEN.md) · 🇸🇰 [sk](../../../sk/docs/security/CLI_TOKEN.md) · 🇸🇮 [sl](../../../sl/docs/security/CLI_TOKEN.md) · 🇷🇸 [sr](../../../sr/docs/security/CLI_TOKEN.md) · 🇸🇪 [sv](../../../sv/docs/security/CLI_TOKEN.md) · 🇰🇪 [sw](../../../sw/docs/security/CLI_TOKEN.md) · 🇮🇳 [ta](../../../ta/docs/security/CLI_TOKEN.md) · 🇮🇳 [te](../../../te/docs/security/CLI_TOKEN.md) · 🇹🇭 [th](../../../th/docs/security/CLI_TOKEN.md) · 🇹🇷 [tr](../../../tr/docs/security/CLI_TOKEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CLI_TOKEN.md) · 🇵🇰 [ur](../../../ur/docs/security/CLI_TOKEN.md) · 🇺🇿 [uz](../../../uz/docs/security/CLI_TOKEN.md) · 🇻🇳 [vi](../../../vi/docs/security/CLI_TOKEN.md) · 🇳🇬 [yo](../../../yo/docs/security/CLI_TOKEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CLI_TOKEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CLI_TOKEN.md)

---

## Nchịkọta

Iwu OmniRoute CLI na-eme nkwenye njirimara megide API njikwa mpaghara site na iji
token `HMAC-SHA256(machine-id, salt)` nke a na-eziga site na nkụnye isi arịrịọ
`x-omniroute-cli-token`.

Nke a na-enye obere iwu CLI (`omniroute status`, `omniroute providers`, wdg.)
ohere ịkpọ endpoint njikwa na-achọghị ka onye ọrụ nye JWT ma ọ bụ
okwuntughe mgbe ọ bụla a kpọrọ iwu.

## Otu o si arụ ọrụ

1. `getMachineTokenSync()` na-agụ ID ngwaike nke igwe site na `node-machine-id`
   (ọ bụrụ na nke a daa, ọ na-eji eriri efu, nke na-eme ka nkwenye njirimara CLI kwụsị ịrụ ọrụ).
2. Ọ na-agbakọ `HMAC-SHA256(machine_id, salt)` ma weghachite hex digest zuru ezu
   nwere mkpụrụedemede 64 — token a na-agbanwe agbanweghị, nke a na-apụghị iweghachi azụ ma jikọta ya na igwe a.
3. CLI na-eziga token ahụ dị ka `x-omniroute-cli-token` naanị mgbe ebe
   njedebe a chọpụtara bụ URL loopback akọwapụtara kpọmkwem (`localhost`, `127.0.0.0/8`, ma ọ bụ
   loopback IPv6). Arịrịọ ndị bu token ahụ na-eji `redirect: error`, ka ntụgharị
   mpaghara ghara ibuga ya na origin ọzọ. Context ndị dị anya na-eji token
   nnweta nwere oke kama. Ọ bụrụ na enweghị ike ịmepụta token ahụ, CLI na-ahapụ nkụnye isi ahụ,
   `omniroute doctor` na-akọkwa ọdịda ahụ kama ile token efu anya dị ka nke ziri ezi.
4. Sava ahụ (`src/server/authz/policies/management.ts`) na-eji otu salt ahụ gbakọọ
   token a tụrụ anya ya ọzọ ma jiri `timingSafeEqual` tụnyere ha iji
   gbochie iwepụta token dabere na oge.

## Njirimara nchekwa

| Njirimara                             | Nkọwa                                                                                                                                                                                                                                 |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Naanị loopback**                    | A na-anabata ya naanị mgbe akara ọnọdụ peer mpaghara nke sava tụkwasịrị obi (nke e si na adreesị ezigbo TCP peer nweta) gosiri loopback. A naghị atụkwasị nkụnye isi `Host` nke klayịntị na-achịkwa obi maka ịchọpụta ọnọdụ mpaghara. |
| **Ntụnyere nwere oge na-agbanweghi**  | `crypto.timingSafeEqual` na-egbochi mwakpo dabere na oge.                                                                                                                                                                             |
| **A pụghị iweghachi ya azụ**          | Enweghị ike iji mmepụta HMAC nwetaghachi machine-id.                                                                                                                                                                                  |
| **Enweghị ụzọ ịgafe nchedo `always`** | A na-enyocha `isAlwaysProtectedPath()` tupu nyocha token CLI. `/api/shutdown` na `/api/settings/database` na-achọ JWT mgbe niile.                                                                                                     |
| **A pụghị ibupụ ya**                  | A naghị ede token ahụ na diski ma ọ bụ tinye ya na ndekọ.                                                                                                                                                                             |

## Salt ndabara (nke a na-emepụta na-enweghị usoro maka nrụnye ọ bụla)

Mgbe edoghị `OMNIROUTE_CLI_SALT`, salt ahụ bụ eriri hex mkpụrụedemede 64
a na-emepụta otu ugboro na-enweghị usoro ma chekwaa na `<DATA_DIR>/cli-token-salt.json` (mode `0600`) —
ọ bụghị literal `omniroute-cli-auth-v1` echekwara n'ime repository. Ma `getActiveSalt()` dị na
`src/lib/machineToken.ts` na oyiri ya dị na `bin/cli/utils/cliToken.mjs` na-agụ otu
faịlụ ahụ, ya mere sava na oku CLI ọ bụla na nrụnye a na-eji otu
uru ahụ; a na-eji literal dị na repository naanị dịka nhọrọ ikpeazụ mgbe enweghị
salt echekwara ma ọ bụ nke env a pụrụ ịmepụta n'oge ahụ (dịka ọmụmaatụ, nrụnye ọhụrụ
nwere naanị CLI tupu sava ahụ agba ọsọ ọbụna otu ugboro). Nke a na-emechi adịghị ike dị na literal
ndabara ochie nke anaghị agbanwe agbanwe: `/etc/machine-id` na-abụkarị faịlụ onye ọ bụla nwere ike ịgụ, ya mere onye ọrụ mpaghara ọ bụla
gaara enwe ike ịmepụta otu token ahụ maka nrụnye ọ bụla na-edobeghị
`OMNIROUTE_CLI_SALT`.

## Mgbanwe salt

Tọọ `OMNIROUTE_CLI_SALT` iji gbanwee token ewepụtara na-enweghị mgbanwe koodu — ọ
na-ebute ụzọ mgbe niile karịa salt nke echekwara maka nrụnye ọ bụla. Mgbe mgbanwe ahụ gasịrị, usoro CLI
niile dị na kọmputa a ga-eji token ọhụrụ ahụ na-akpaghị aka. Ọ bara uru mgbe
ndepụta usoro pụrụ ikpughe uru ewepụtara na mbụ.

```bash
# Mgbanwe na-adịgide adịgide (tinye na profaịlụ shell)
export OMNIROUTE_CLI_SALT="my-secret-salt-2026"

# Nyochaa na a na-eji token ọhụrụ ahụ
omniroute status
```

## Usoro ochie (SHA-256, mkpụrụedemede 32) — a ka na-anabata ya

Tupu usoro HMAC dị n'elu, CLI na-ewepụta token ya dịka
`SHA-256(machineId + salt).hex[0..32]` (nganiihu nwere mkpụrụedemede 32) n'ime
`bin/cli/utils/cliToken.mjs` (`getLegacyCliTokenSync` n'ime `src/lib/machineToken.ts`).

Maka ndakọrịta na ụdị ochie, sava na-anabata usoro **abụọ ahụ**: onye nyocha na-emepụta
`expectedTokens = [getMachineTokenSync(), getLegacyCliTokenSync()]` ma jiri `timingSafeEqual`
tụnyere header batara na nke ọ bụla
(`src/server/authz/policies/management.ts` na `src/lib/middleware/cliTokenAuth.ts`).
Ya mere, token bara uru ma ọ bụrụ na ọ dabara na **otu n'ime** digest HMAC nwere mkpụrụedemede 64 ma ọ bụ
nganiihu SHA-256 ochie nwere mkpụrụedemede 32.

**Ịkwụsị iji ya:** tọọ `OMNIROUTE_DISABLE_CLI_TOKEN=true` (env ma ọ bụ `.env`) iji gbanyụọ usoro
token CLI kpamkpam; mgbe ahụ, ohere niile ga-achọ API key e nyere n'ụzọ doro anya. N'igwe
ndị ọtụtụ mmadụ na-eji, a na-atụ aro nke a, ebe ọ bụ na `machine-id` bụ nke ngwaọrụ ọ bụla (ọ bụghị nke onye ọrụ ọ bụla), onye ọrụ ọzọ
n'otu igwe ahụ nwekwara ike ịgbakọ otu token ahụ.

## Faịlụ

| Faịlụ                                     | Ebumnuche                                       |
| ----------------------------------------- | ----------------------------------------------- |
| `src/lib/machineToken.ts`                 | Iwepụta token (`getMachineTokenSync`)           |
| `bin/cli/utils/cliToken.mjs`              | Oyiri nke otu usoro iwepụta ahụ n'akụkụ CLI     |
| `<DATA_DIR>/cli-token-salt.json`          | Salt enweghị usoro echekwara maka nrụnye ọ bụla |
| `src/server/authz/headers.ts`             | Konstan `CLI_TOKEN_HEADER`                      |
| `src/server/authz/policies/management.ts` | Nnyocha n'akụkụ sava                            |
| `src/server/authz/routeGuard.ts`          | Nnyocha host loopback (`isLoopbackHost`)        |

## Hụkwa

- `docs/security/ROUTE_GUARD_TIERS.md` — ọkwa nchekwa route
- `docs/architecture/AUTHZ_GUIDE.md` — usoro authorization zuru ezu
