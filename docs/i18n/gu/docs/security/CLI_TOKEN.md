# CLI Machine-ID Token (ગુજરાતી)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CLI_TOKEN.md) · 🇪🇹 [am](../../../am/docs/security/CLI_TOKEN.md) · 🇸🇦 [ar](../../../ar/docs/security/CLI_TOKEN.md) · 🇦🇿 [az](../../../az/docs/security/CLI_TOKEN.md) · 🇧🇬 [bg](../../../bg/docs/security/CLI_TOKEN.md) · 🇧🇩 [bn](../../../bn/docs/security/CLI_TOKEN.md) · 🇧🇦 [bs](../../../bs/docs/security/CLI_TOKEN.md) · 🇨🇿 [cs](../../../cs/docs/security/CLI_TOKEN.md) · 🇩🇰 [da](../../../da/docs/security/CLI_TOKEN.md) · 🇩🇪 [de](../../../de/docs/security/CLI_TOKEN.md) · 🇬🇷 [el](../../../el/docs/security/CLI_TOKEN.md) · 🇪🇸 [es](../../../es/docs/security/CLI_TOKEN.md) · 🇪🇪 [et](../../../et/docs/security/CLI_TOKEN.md) · 🇮🇷 [fa](../../../fa/docs/security/CLI_TOKEN.md) · 🇫🇮 [fi](../../../fi/docs/security/CLI_TOKEN.md) · 🇫🇷 [fr](../../../fr/docs/security/CLI_TOKEN.md) · 🇮🇪 [ga](../../../ga/docs/security/CLI_TOKEN.md) · 🇳🇬 [ha](../../../ha/docs/security/CLI_TOKEN.md) · 🇮🇱 [he](../../../he/docs/security/CLI_TOKEN.md) · 🇮🇳 [hi](../../../hi/docs/security/CLI_TOKEN.md) · 🇭🇷 [hr](../../../hr/docs/security/CLI_TOKEN.md) · 🇭🇺 [hu](../../../hu/docs/security/CLI_TOKEN.md) · 🇦🇲 [hy](../../../hy/docs/security/CLI_TOKEN.md) · 🇮🇩 [id](../../../id/docs/security/CLI_TOKEN.md) · 🇳🇬 [ig](../../../ig/docs/security/CLI_TOKEN.md) · 🇮🇹 [it](../../../it/docs/security/CLI_TOKEN.md) · 🇯🇵 [ja](../../../ja/docs/security/CLI_TOKEN.md) · 🇬🇪 [ka](../../../ka/docs/security/CLI_TOKEN.md) · 🇰🇭 [km](../../../km/docs/security/CLI_TOKEN.md) · 🇮🇳 [kn](../../../kn/docs/security/CLI_TOKEN.md) · 🇰🇷 [ko](../../../ko/docs/security/CLI_TOKEN.md) · 🇱🇹 [lt](../../../lt/docs/security/CLI_TOKEN.md) · 🇱🇻 [lv](../../../lv/docs/security/CLI_TOKEN.md) · 🇮🇳 [ml](../../../ml/docs/security/CLI_TOKEN.md) · 🇮🇳 [mr](../../../mr/docs/security/CLI_TOKEN.md) · 🇲🇾 [ms](../../../ms/docs/security/CLI_TOKEN.md) · 🇲🇹 [mt](../../../mt/docs/security/CLI_TOKEN.md) · 🇲🇲 [my](../../../my/docs/security/CLI_TOKEN.md) · 🇳🇵 [ne](../../../ne/docs/security/CLI_TOKEN.md) · 🇳🇱 [nl](../../../nl/docs/security/CLI_TOKEN.md) · 🇳🇴 [no](../../../no/docs/security/CLI_TOKEN.md) · 🇮🇳 [or](../../../or/docs/security/CLI_TOKEN.md) · 🇮🇳 [pa](../../../pa/docs/security/CLI_TOKEN.md) · 🇵🇭 [phi](../../../phi/docs/security/CLI_TOKEN.md) · 🇵🇱 [pl](../../../pl/docs/security/CLI_TOKEN.md) · 🇵🇹 [pt](../../../pt/docs/security/CLI_TOKEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CLI_TOKEN.md) · 🇷🇴 [ro](../../../ro/docs/security/CLI_TOKEN.md) · 🇷🇺 [ru](../../../ru/docs/security/CLI_TOKEN.md) · 🇱🇰 [si](../../../si/docs/security/CLI_TOKEN.md) · 🇸🇰 [sk](../../../sk/docs/security/CLI_TOKEN.md) · 🇸🇮 [sl](../../../sl/docs/security/CLI_TOKEN.md) · 🇷🇸 [sr](../../../sr/docs/security/CLI_TOKEN.md) · 🇸🇪 [sv](../../../sv/docs/security/CLI_TOKEN.md) · 🇰🇪 [sw](../../../sw/docs/security/CLI_TOKEN.md) · 🇮🇳 [ta](../../../ta/docs/security/CLI_TOKEN.md) · 🇮🇳 [te](../../../te/docs/security/CLI_TOKEN.md) · 🇹🇭 [th](../../../th/docs/security/CLI_TOKEN.md) · 🇹🇷 [tr](../../../tr/docs/security/CLI_TOKEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CLI_TOKEN.md) · 🇵🇰 [ur](../../../ur/docs/security/CLI_TOKEN.md) · 🇺🇿 [uz](../../../uz/docs/security/CLI_TOKEN.md) · 🇻🇳 [vi](../../../vi/docs/security/CLI_TOKEN.md) · 🇳🇬 [yo](../../../yo/docs/security/CLI_TOKEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CLI_TOKEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CLI_TOKEN.md)

---

## અવલોકન

OmniRoute CLI કમાન્ડ્સ સ્થાનિક મેનેજમેન્ટ API સામે પ્રમાણીકરણ કરવા માટે
`x-omniroute-cli-token` રિક્વેસ્ટ હેડર મારફતે મોકલવામાં આવતા
`HMAC-SHA256(machine-id, salt)` ટોકનનો ઉપયોગ કરે છે.

આનાથી CLI સબકમાન્ડ્સ (`omniroute status`, `omniroute providers`, વગેરે)
દરેક આહ્વાન વખતે વપરાશકર્તા પાસેથી JWT અથવા પાસવર્ડ માંગ્યા વિના મેનેજમેન્ટ
એન્ડપોઇન્ટ્સને કૉલ કરી શકે છે.

## તે કેવી રીતે કાર્ય કરે છે

1. `getMachineTokenSync()` હાર્ડવેર મશીન IDને `node-machine-id` મારફતે વાંચે છે
   (નિષ્ફળતા થાય તો ખાલી સ્ટ્રિંગનો ઉપયોગ કરે છે, જેનાથી CLI પ્રમાણીકરણ અક્ષમ થાય છે).
2. તે `HMAC-SHA256(machine_id, salt)`ની ગણતરી કરે છે અને સંપૂર્ણ 64-અક્ષરનો
   હેક્સ ડાઇજેસ્ટ પરત કરે છે — આ મશીન સાથે જોડાયેલું નિર્ધારિત અને અપ્રતિવર્તનીય ટોકન.
3. ઉકેલાયેલ ગંતવ્ય સ્પષ્ટ લૂપબૅક URL (`localhost`, `127.0.0.0/8`, અથવા
   લૂપબૅક IPv6) હોય ત્યારે જ CLI ટોકનને `x-omniroute-cli-token` તરીકે મોકલે છે.
   ટોકન ધરાવતી રિક્વેસ્ટ્સ `redirect: error`નો ઉપયોગ કરે છે, જેથી સ્થાનિક
   રીડાયરેક્ટ તેને અન્ય ઑરિજિન પર ફોરવર્ડ ન કરી શકે. રિમોટ કોન્ટેક્સ્ટ્સ તેના બદલે
   મર્યાદિત-સ્કોપવાળા ઍક્સેસ ટોકન્સનો ઉપયોગ કરે છે. જો ટોકન વ્યુત્પન્ન કરવું શક્ય ન હોય,
   તો CLI હેડર મોકલતું નથી અને ખાલી ટોકનને માન્ય ગણવાને બદલે `omniroute doctor`
   નિષ્ફળતાની જાણ કરે છે.
4. સર્વર (`src/server/authz/policies/management.ts`) એ જ salt વડે અપેક્ષિત
   ટોકનની ફરી ગણતરી કરે છે અને સમય-આધારિત નિષ્કર્ષણ અટકાવવા માટે `timingSafeEqual`
   મારફતે તેની સરખામણી કરે છે.

## સુરક્ષા ગુણધર્મો

| ગુણધર્મ                           | વિગત                                                                                                                                                                                                           |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **માત્ર લૂપબૅક**                  | સર્વરની વિશ્વસનીય પિયર-લોકાલિટી સ્ટૅમ્પ (વાસ્તવિક TCP પિયર ઍડ્રેસમાંથી મેળવેલી) લૂપબૅક દર્શાવે ત્યારે જ સ્વીકારવામાં આવે છે. લોકાલિટી માટે ક્લાયન્ટ-નિયંત્રિત `Host` હેડર પર ક્યારેય વિશ્વાસ કરવામાં આવતો નથી. |
| **નિયત-સમય સરખામણી**              | `crypto.timingSafeEqual` ટાઇમિંગ હુમલાઓને અટકાવે છે.                                                                                                                                                           |
| **અપ્રતિવર્તનીય**                 | HMAC આઉટપુટમાંથી machine-id પાછું મેળવી શકાતું નથી.                                                                                                                                                            |
| **`always`-સંરક્ષિત બાયપાસ નહીં** | CLI ટોકનની તપાસ પહેલાં `isAlwaysProtectedPath()`નું મૂલ્યાંકન કરવામાં આવે છે. `/api/shutdown` અને `/api/settings/database` માટે હંમેશાં JWT જરૂરી છે.                                                          |
| **નિકાસ ન કરી શકાય તેવું**        | ટોકન ક્યારેય ડિસ્ક પર લખવામાં કે લૉગ કરવામાં આવતું નથી.                                                                                                                                                        |

## ડિફૉલ્ટ salt (દરેક ઇન્સ્ટોલ માટે રૅન્ડમ)

જ્યારે `OMNIROUTE_CLI_SALT` સેટ ન હોય, ત્યારે salt એક રૅન્ડમ 64-અક્ષરનો હેક્સ
સ્ટ્રિંગ હોય છે, જે એક વખત જનરેટ થાય છે અને `<DATA_DIR>/cli-token-salt.json`
(mode `0600`) ખાતે સંગ્રહાય છે — તે રિપોઝિટરીમાં સામેલ કરાયેલ સ્થિર મૂલ્ય
`omniroute-cli-auth-v1` નથી. `src/lib/machineToken.ts`માંનું `getActiveSalt()`
અને `bin/cli/utils/cliToken.mjs`માં તેનું પ્રતિરૂપ, બંને એ જ ફાઇલ વાંચે છે, તેથી
સર્વર અને આ ઇન્સ્ટોલ પરનું દરેક CLI આહ્વાન એક જ મૂલ્ય પર સંમત થાય છે; જ્યારે
હજી સુધી કોઈ સંગ્રહિત અથવા env salt સ્થાપિત ન થઈ શકે ત્યારે જ રિપોઝિટરીમાં સામેલ
કરાયેલ સ્થિર મૂલ્યનો અંતિમ વિકલ્પ તરીકે ઉપયોગ થાય છે (ઉદાહરણ તરીકે, સર્વર ક્યારેય
ચાલ્યું હોય તે પહેલાંનું નવું માત્ર-CLI ઇન્સ્ટોલ). આ જૂના સ્થિર ડિફૉલ્ટની નબળાઈને
દૂર કરે છે: `/etc/machine-id` સામાન્ય રીતે બધા વપરાશકર્તાઓ માટે વાંચી શકાય તેવું
હોય છે, તેથી અન્યથા કોઈપણ સ્થાનિક વપરાશકર્તા ક્યારેય `OMNIROUTE_CLI_SALT`
સેટ ન કરનાર દરેક ઇન્સ્ટોલ માટે સમાન ટોકન વ્યુત્પન્ન કરી શકતો હતો.

## સૉલ્ટ રોટેશન

કોડમાં ફેરફાર કર્યા વિના ડિરાઇવ કરાયેલ ટોકનને રોટેટ કરવા માટે `OMNIROUTE_CLI_SALT` સેટ કરો — તે
દરેક ઇન્સ્ટોલેશન માટે સંગ્રહિત સૉલ્ટ કરતાં હંમેશાં પ્રાથમિકતા લે છે. રોટેશન પછી, આ મશીન પરની તમામ CLI
પ્રક્રિયાઓ આપમેળે નવા ટોકનનો ઉપયોગ કરશે. અગાઉનું ડિરાઇવ કરાયેલ મૂલ્ય ઉજાગર થયું હોઈ શકે એવા
પ્રોસેસ-લિસ્ટ લીક પછી આ ઉપયોગી છે.

```bash
# કાયમી રોટેશન (શેલ પ્રોફાઇલમાં ઉમેરો)
export OMNIROUTE_CLI_SALT="my-secret-salt-2026"

# નવું ટોકન ઉપયોગમાં છે તેની ચકાસણી કરો
omniroute status
```

## લેગસી ફોર્મેટ (SHA-256, 32-અક્ષર) — હજી પણ સ્વીકાર્ય

ઉપરના HMAC ફોર્મેટ પહેલાં, CLI તેનું ટોકન
`bin/cli/utils/cliToken.mjs`માં `SHA-256(machineId + salt).hex[0..32]` (32-અક્ષરનો પ્રીફિક્સ) તરીકે
ડિરાઇવ કરતું હતું (`src/lib/machineToken.ts`માં `getLegacyCliTokenSync`).

પાછલી સુસંગતતા માટે સર્વર **બંને** ફોર્મેટ સ્વીકારે છે: વેરિફાયર
`expectedTokens = [getMachineTokenSync(), getLegacyCliTokenSync()]` બનાવે છે અને આવનારા
હેડરને `timingSafeEqual` વડે દરેક સાથે સરખાવે છે
(`src/server/authz/policies/management.ts` અને `src/lib/middleware/cliTokenAuth.ts`).
આથી, જો ટોકન 64-અક્ષરના HMAC ડાઇજેસ્ટ અથવા 32-અક્ષરના લેગસી SHA-256 પ્રીફિક્સમાંથી
**કોઈ એક** સાથે મેળ ખાતું હોય, તો તે માન્ય છે.

**ઑપ્ટ-આઉટ:** CLI ટોકન મિકેનિઝમને સંપૂર્ણપણે અક્ષમ કરવા માટે `OMNIROUTE_DISABLE_CLI_TOKEN=true`
(env અથવા `.env`) સેટ કરો; ત્યારબાદ તમામ ઍક્સેસ માટે સ્પષ્ટ API કી જરૂરી રહેશે. બહુ-વપરાશકર્તા
હોસ્ટ પર આ કરવાની ભલામણ કરવામાં આવે છે, કારણ કે `machine-id` દરેક ડિવાઇસ માટે હોય છે
(દરેક વપરાશકર્તા માટે નહીં) અને એ જ હોસ્ટ પરનો અન્ય વપરાશકર્તા સમાન ટોકનની ગણતરી કરી શકે છે.

## ફાઇલો

| ફાઇલ                                      | હેતુ                                        |
| ----------------------------------------- | ------------------------------------------- |
| `src/lib/machineToken.ts`                 | ટોકન ડિરાઇવેશન (`getMachineTokenSync`)      |
| `bin/cli/utils/cliToken.mjs`              | સમાન ડિરાઇવેશનનું CLI-તરફનું પ્રતિબિંબ      |
| `<DATA_DIR>/cli-token-salt.json`          | દરેક ઇન્સ્ટોલેશન માટે સંગ્રહિત રેન્ડમ સૉલ્ટ |
| `src/server/authz/headers.ts`             | `CLI_TOKEN_HEADER` અચળાંક                   |
| `src/server/authz/policies/management.ts` | સર્વર-તરફનું ચકાસણું                        |
| `src/server/authz/routeGuard.ts`          | લૂપબૅક હોસ્ટ ચકાસણી (`isLoopbackHost`)      |

## આ પણ જુઓ

- `docs/security/ROUTE_GUARD_TIERS.md` — રૂટ સુરક્ષાના સ્તરો
- `docs/architecture/AUTHZ_GUIDE.md` — સંપૂર્ણ અધિકૃતતા પાઇપલાઇન
