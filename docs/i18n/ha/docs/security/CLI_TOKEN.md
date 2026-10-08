# CLI Machine-ID Token (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CLI_TOKEN.md) · 🇪🇹 [am](../../../am/docs/security/CLI_TOKEN.md) · 🇸🇦 [ar](../../../ar/docs/security/CLI_TOKEN.md) · 🇦🇿 [az](../../../az/docs/security/CLI_TOKEN.md) · 🇧🇬 [bg](../../../bg/docs/security/CLI_TOKEN.md) · 🇧🇩 [bn](../../../bn/docs/security/CLI_TOKEN.md) · 🇧🇦 [bs](../../../bs/docs/security/CLI_TOKEN.md) · 🇨🇿 [cs](../../../cs/docs/security/CLI_TOKEN.md) · 🇩🇰 [da](../../../da/docs/security/CLI_TOKEN.md) · 🇩🇪 [de](../../../de/docs/security/CLI_TOKEN.md) · 🇬🇷 [el](../../../el/docs/security/CLI_TOKEN.md) · 🇪🇸 [es](../../../es/docs/security/CLI_TOKEN.md) · 🇪🇪 [et](../../../et/docs/security/CLI_TOKEN.md) · 🇮🇷 [fa](../../../fa/docs/security/CLI_TOKEN.md) · 🇫🇮 [fi](../../../fi/docs/security/CLI_TOKEN.md) · 🇫🇷 [fr](../../../fr/docs/security/CLI_TOKEN.md) · 🇮🇪 [ga](../../../ga/docs/security/CLI_TOKEN.md) · 🇮🇳 [gu](../../../gu/docs/security/CLI_TOKEN.md) · 🇮🇱 [he](../../../he/docs/security/CLI_TOKEN.md) · 🇮🇳 [hi](../../../hi/docs/security/CLI_TOKEN.md) · 🇭🇷 [hr](../../../hr/docs/security/CLI_TOKEN.md) · 🇭🇺 [hu](../../../hu/docs/security/CLI_TOKEN.md) · 🇦🇲 [hy](../../../hy/docs/security/CLI_TOKEN.md) · 🇮🇩 [id](../../../id/docs/security/CLI_TOKEN.md) · 🇳🇬 [ig](../../../ig/docs/security/CLI_TOKEN.md) · 🇮🇹 [it](../../../it/docs/security/CLI_TOKEN.md) · 🇯🇵 [ja](../../../ja/docs/security/CLI_TOKEN.md) · 🇬🇪 [ka](../../../ka/docs/security/CLI_TOKEN.md) · 🇰🇭 [km](../../../km/docs/security/CLI_TOKEN.md) · 🇮🇳 [kn](../../../kn/docs/security/CLI_TOKEN.md) · 🇰🇷 [ko](../../../ko/docs/security/CLI_TOKEN.md) · 🇱🇹 [lt](../../../lt/docs/security/CLI_TOKEN.md) · 🇱🇻 [lv](../../../lv/docs/security/CLI_TOKEN.md) · 🇮🇳 [ml](../../../ml/docs/security/CLI_TOKEN.md) · 🇮🇳 [mr](../../../mr/docs/security/CLI_TOKEN.md) · 🇲🇾 [ms](../../../ms/docs/security/CLI_TOKEN.md) · 🇲🇹 [mt](../../../mt/docs/security/CLI_TOKEN.md) · 🇲🇲 [my](../../../my/docs/security/CLI_TOKEN.md) · 🇳🇵 [ne](../../../ne/docs/security/CLI_TOKEN.md) · 🇳🇱 [nl](../../../nl/docs/security/CLI_TOKEN.md) · 🇳🇴 [no](../../../no/docs/security/CLI_TOKEN.md) · 🇮🇳 [or](../../../or/docs/security/CLI_TOKEN.md) · 🇮🇳 [pa](../../../pa/docs/security/CLI_TOKEN.md) · 🇵🇭 [phi](../../../phi/docs/security/CLI_TOKEN.md) · 🇵🇱 [pl](../../../pl/docs/security/CLI_TOKEN.md) · 🇵🇹 [pt](../../../pt/docs/security/CLI_TOKEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CLI_TOKEN.md) · 🇷🇴 [ro](../../../ro/docs/security/CLI_TOKEN.md) · 🇷🇺 [ru](../../../ru/docs/security/CLI_TOKEN.md) · 🇱🇰 [si](../../../si/docs/security/CLI_TOKEN.md) · 🇸🇰 [sk](../../../sk/docs/security/CLI_TOKEN.md) · 🇸🇮 [sl](../../../sl/docs/security/CLI_TOKEN.md) · 🇷🇸 [sr](../../../sr/docs/security/CLI_TOKEN.md) · 🇸🇪 [sv](../../../sv/docs/security/CLI_TOKEN.md) · 🇰🇪 [sw](../../../sw/docs/security/CLI_TOKEN.md) · 🇮🇳 [ta](../../../ta/docs/security/CLI_TOKEN.md) · 🇮🇳 [te](../../../te/docs/security/CLI_TOKEN.md) · 🇹🇭 [th](../../../th/docs/security/CLI_TOKEN.md) · 🇹🇷 [tr](../../../tr/docs/security/CLI_TOKEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CLI_TOKEN.md) · 🇵🇰 [ur](../../../ur/docs/security/CLI_TOKEN.md) · 🇺🇿 [uz](../../../uz/docs/security/CLI_TOKEN.md) · 🇻🇳 [vi](../../../vi/docs/security/CLI_TOKEN.md) · 🇳🇬 [yo](../../../yo/docs/security/CLI_TOKEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CLI_TOKEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CLI_TOKEN.md)

---

## Bayani

Umarnin OmniRoute CLI suna tantance sahihanci da API na gudanarwa na cikin gida ta amfani da
token na `HMAC-SHA256(machine-id, salt)` da ake aikawa ta cikin kan buƙata na
`x-omniroute-cli-token`.

Wannan yana ba ƙananan umarnin CLI (`omniroute status`, `omniroute providers`, da sauransu)
damar kiran wuraren ƙarshe na gudanarwa ba tare da buƙatar mai amfani ya samar da JWT ko
kalmar sirri a duk lokacin aiwatarwa ba.

## Yadda yake aiki

1. `getMachineTokenSync()` yana karanta ID na na'urar hardware ta hanyar `node-machine-id`
   (yana koma wa ga tsagwaron kirtani idan an gaza, wanda ke kashe tantance sahihancin CLI).
2. Yana lissafa `HMAC-SHA256(machine_id, salt)` sannan ya mayar da cikakken taƙaitaccen
   hex mai haruffa 64 — token da ake iya sake samarwa iri ɗaya, wanda ba za a iya juyawa ba kuma yake da alaƙa da wannan na'ura.
3. CLI yana aika token ɗin a matsayin `x-omniroute-cli-token` ne kawai idan wurin da aka
   tantance URL ne na loopback kai tsaye (`localhost`, `127.0.0.0/8`, ko
   loopback IPv6). Buƙatun da ke ɗauke da token ɗin suna amfani da `redirect: error`, don haka karkatarwa ta cikin gida
   ba za ta iya tura shi zuwa wani tushe ba. Mahallai na nesa suna amfani da
   token na samun dama mai iyakantaccen fage a maimakon haka. Idan ba za a iya samar da token ɗin ba, CLI yana barin kan buƙatar
   ba tare da shi ba, sannan `omniroute doctor` ya ba da rahoton gazawar maimakon ɗaukar tsagwaron token
   a matsayin ingantacce.
4. Sabar (`src/server/authz/policies/management.ts`) tana sake lissafa
   token ɗin da ake sa ran samu da salt iri ɗaya sannan ta kwatanta ta hanyar `timingSafeEqual` domin
   hana gano shi ta hanyar bambancin lokacin aiwatarwa.

## Siffofin tsaro

| Siffa                              | Bayani                                                                                                                                                                                                                                                                        |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Loopback kawai**                 | Ana karɓarsa ne kawai idan alamar kasancewar takwaran sabar a cikin gida da aka amince da ita (wadda aka samo daga ainihin adireshin takwaran TCP) ta nuna loopback. Ba a taɓa amincewa da kan `Host` da abokin ciniki ke sarrafawa wajen tantance kasancewa a cikin gida ba. |
| **Kwatantawa cikin lokaci ɗaya**   | `crypto.timingSafeEqual` yana hana hare-haren da suka dogara da bambancin lokaci.                                                                                                                                                                                             |
| **Ba za a iya juyawa ba**          | Ba za a iya dawo da machine-id daga sakamakon HMAC ba.                                                                                                                                                                                                                        |
| **Ba a kauce wa kariyar `always`** | Ana tantance `isAlwaysProtectedPath()` kafin duba token na CLI. `/api/shutdown` da `/api/settings/database` koyaushe suna buƙatar JWT.                                                                                                                                        |
| **Ba za a iya fitarwa ba**         | Ba a taɓa rubuta token ɗin zuwa faifai ko saka shi cikin rajista ba.                                                                                                                                                                                                          |

## Salt na asali (bazuwar ƙima ga kowace girkawa)

Idan ba a saita `OMNIROUTE_CLI_SALT` ba, salt ɗin zai kasance bazuwar kirtanin hex mai haruffa 64
wanda ake samarwa sau ɗaya kuma a adana shi a `<DATA_DIR>/cli-token-salt.json` (yanayin `0600`) —
ba ƙayyadadden `omniroute-cli-auth-v1` da ke cikin ma'ajiyar lamba ba. Dukansu `getActiveSalt()` da ke cikin
`src/lib/machineToken.ts` da kwafinsa da ke cikin `bin/cli/utils/cliToken.mjs` suna karanta
fayil iri ɗaya, don haka sabar da duk wani kiran CLI a wannan girkawa za su yi amfani da
ƙima iri ɗaya; ana amfani da ƙayyadadden ƙimar da ke cikin ma'ajiyar lamba ne kawai a matsayin mafita ta ƙarshe idan ba a samu
salt da aka adana ko na muhalli ba tukuna (misali, sabuwar girkawar CLI kaɗai
kafin a taɓa kunna sabar). Wannan yana rufe raunin tsohuwar ƙayyadadden ƙimar asali:
galibi kowane mai amfani na iya karanta `/etc/machine-id`, don haka in ba haka ba kowane mai amfani na cikin gida zai iya
samar da token iri ɗaya ga duk girkawar da ba su taɓa saita
`OMNIROUTE_CLI_SALT` ba.

## Sauya salt

Saita `OMNIROUTE_CLI_SALT` don sauya token ɗin da aka samar ba tare da sauya lamba ba — koyaushe yana da fifiko a kan salt na kowace shigarwa da aka adana. Bayan sauyawar, dukkan matakan CLI a wannan na’ura za su yi amfani da sabon token ta atomatik. Wannan yana da amfani bayan zubewar jerin matakai wanda wataƙila ya fallasa ƙimar da aka samar a baya.

```bash
# Sauyawa mai ɗorewa (ƙara zuwa bayanin martabar shell)
export OMNIROUTE_CLI_SALT="my-secret-salt-2026"

# Tabbatar cewa ana amfani da sabon token
omniroute status
```

## Tsohon tsari (SHA-256, haruffa 32) — har yanzu ana karɓarsa

Kafin tsarin HMAC da ke sama, CLI yana samar da token ɗinsa a matsayin
`SHA-256(machineId + salt).hex[0..32]` (farkon haruffa 32) a cikin
`bin/cli/utils/cliToken.mjs` (`getLegacyCliTokenSync` a cikin `src/lib/machineToken.ts`).

Don dacewa da tsoffin nau’ikan, sabar tana karɓar tsarin **biyu**: mai tabbatarwa yana gina
`expectedTokens = [getMachineTokenSync(), getLegacyCliTokenSync()]` sannan ya kwatanta
header mai shigowa da kowannensu ta amfani da `timingSafeEqual`
(`src/server/authz/policies/management.ts` da `src/lib/middleware/cliTokenAuth.ts`).
Saboda haka, token yana aiki idan ya yi daidai da **ɗaya daga cikin** HMAC digest mai haruffa 64 ko kuma farkon SHA-256 na tsohon tsari mai haruffa 32.

**Kashewa:** saita `OMNIROUTE_DISABLE_CLI_TOKEN=true` (env ko `.env`) don kashe tsarin
token na CLI gaba ɗaya; daga nan duk wata dama za ta buƙaci maɓallin API a bayyane. A kan
hosts masu amfani da yawa ana ba da shawarar wannan, domin `machine-id` na kowace na’ura ne
(ba na kowane mai amfani ba), kuma wani mai amfani a host ɗin zai iya ƙirga token iri ɗaya.

## Fayiloli

| Fayil                                     | Manufa                                      |
| ----------------------------------------- | ------------------------------------------- |
| `src/lib/machineToken.ts`                 | Samar da token (`getMachineTokenSync`)      |
| `bin/cli/utils/cliToken.mjs`              | Kwafin wannan hanyar samarwa a ɓangaren CLI |
| `<DATA_DIR>/cli-token-salt.json`          | Salt bazuwar kowace shigarwa da aka adana   |
| `src/server/authz/headers.ts`             | Konstant ɗin `CLI_TOKEN_HEADER`             |
| `src/server/authz/policies/management.ts` | Tabbatarwa a ɓangaren saba                  |
| `src/server/authz/routeGuard.ts`          | Duba loopback host (`isLoopbackHost`)       |

## Duba kuma

- `docs/security/ROUTE_GUARD_TIERS.md` — matakan kariyar route
- `docs/architecture/AUTHZ_GUIDE.md` — cikakken tsarin ba da izini
