# CLI Machine-ID Token (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CLI_TOKEN.md) · 🇪🇹 [am](../../../am/docs/security/CLI_TOKEN.md) · 🇸🇦 [ar](../../../ar/docs/security/CLI_TOKEN.md) · 🇦🇿 [az](../../../az/docs/security/CLI_TOKEN.md) · 🇧🇬 [bg](../../../bg/docs/security/CLI_TOKEN.md) · 🇧🇩 [bn](../../../bn/docs/security/CLI_TOKEN.md) · 🇨🇿 [cs](../../../cs/docs/security/CLI_TOKEN.md) · 🇩🇰 [da](../../../da/docs/security/CLI_TOKEN.md) · 🇩🇪 [de](../../../de/docs/security/CLI_TOKEN.md) · 🇬🇷 [el](../../../el/docs/security/CLI_TOKEN.md) · 🇪🇸 [es](../../../es/docs/security/CLI_TOKEN.md) · 🇪🇪 [et](../../../et/docs/security/CLI_TOKEN.md) · 🇮🇷 [fa](../../../fa/docs/security/CLI_TOKEN.md) · 🇫🇮 [fi](../../../fi/docs/security/CLI_TOKEN.md) · 🇫🇷 [fr](../../../fr/docs/security/CLI_TOKEN.md) · 🇮🇪 [ga](../../../ga/docs/security/CLI_TOKEN.md) · 🇮🇳 [gu](../../../gu/docs/security/CLI_TOKEN.md) · 🇳🇬 [ha](../../../ha/docs/security/CLI_TOKEN.md) · 🇮🇱 [he](../../../he/docs/security/CLI_TOKEN.md) · 🇮🇳 [hi](../../../hi/docs/security/CLI_TOKEN.md) · 🇭🇷 [hr](../../../hr/docs/security/CLI_TOKEN.md) · 🇭🇺 [hu](../../../hu/docs/security/CLI_TOKEN.md) · 🇦🇲 [hy](../../../hy/docs/security/CLI_TOKEN.md) · 🇮🇩 [id](../../../id/docs/security/CLI_TOKEN.md) · 🇳🇬 [ig](../../../ig/docs/security/CLI_TOKEN.md) · 🇮🇹 [it](../../../it/docs/security/CLI_TOKEN.md) · 🇯🇵 [ja](../../../ja/docs/security/CLI_TOKEN.md) · 🇬🇪 [ka](../../../ka/docs/security/CLI_TOKEN.md) · 🇰🇭 [km](../../../km/docs/security/CLI_TOKEN.md) · 🇮🇳 [kn](../../../kn/docs/security/CLI_TOKEN.md) · 🇰🇷 [ko](../../../ko/docs/security/CLI_TOKEN.md) · 🇱🇹 [lt](../../../lt/docs/security/CLI_TOKEN.md) · 🇱🇻 [lv](../../../lv/docs/security/CLI_TOKEN.md) · 🇮🇳 [ml](../../../ml/docs/security/CLI_TOKEN.md) · 🇮🇳 [mr](../../../mr/docs/security/CLI_TOKEN.md) · 🇲🇾 [ms](../../../ms/docs/security/CLI_TOKEN.md) · 🇲🇲 [my](../../../my/docs/security/CLI_TOKEN.md) · 🇳🇵 [ne](../../../ne/docs/security/CLI_TOKEN.md) · 🇳🇱 [nl](../../../nl/docs/security/CLI_TOKEN.md) · 🇳🇴 [no](../../../no/docs/security/CLI_TOKEN.md) · 🇮🇳 [or](../../../or/docs/security/CLI_TOKEN.md) · 🇮🇳 [pa](../../../pa/docs/security/CLI_TOKEN.md) · 🇵🇭 [phi](../../../phi/docs/security/CLI_TOKEN.md) · 🇵🇱 [pl](../../../pl/docs/security/CLI_TOKEN.md) · 🇵🇹 [pt](../../../pt/docs/security/CLI_TOKEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CLI_TOKEN.md) · 🇷🇴 [ro](../../../ro/docs/security/CLI_TOKEN.md) · 🇷🇺 [ru](../../../ru/docs/security/CLI_TOKEN.md) · 🇱🇰 [si](../../../si/docs/security/CLI_TOKEN.md) · 🇸🇰 [sk](../../../sk/docs/security/CLI_TOKEN.md) · 🇸🇮 [sl](../../../sl/docs/security/CLI_TOKEN.md) · 🇷🇸 [sr](../../../sr/docs/security/CLI_TOKEN.md) · 🇸🇪 [sv](../../../sv/docs/security/CLI_TOKEN.md) · 🇰🇪 [sw](../../../sw/docs/security/CLI_TOKEN.md) · 🇮🇳 [ta](../../../ta/docs/security/CLI_TOKEN.md) · 🇮🇳 [te](../../../te/docs/security/CLI_TOKEN.md) · 🇹🇭 [th](../../../th/docs/security/CLI_TOKEN.md) · 🇹🇷 [tr](../../../tr/docs/security/CLI_TOKEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CLI_TOKEN.md) · 🇵🇰 [ur](../../../ur/docs/security/CLI_TOKEN.md) · 🇺🇿 [uz](../../../uz/docs/security/CLI_TOKEN.md) · 🇻🇳 [vi](../../../vi/docs/security/CLI_TOKEN.md) · 🇳🇬 [yo](../../../yo/docs/security/CLI_TOKEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CLI_TOKEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CLI_TOKEN.md)

---

## Ħarsa ġenerali

Il-kmandi tal-CLI ta’ OmniRoute jawtentikaw mal-API lokali tal-ġestjoni permezz ta’
token `HMAC-SHA256(machine-id, salt)` mibgħut permezz tal-header tat-talba
`x-omniroute-cli-token`.

Dan jippermetti lis-subkmandi tal-CLI (`omniroute status`, `omniroute providers`, eċċ.)
isejħu endpoints tal-ġestjoni mingħajr ma jeħtieġu li l-utent jipprovdi JWT jew
password ma’ kull invokazzjoni.

## Kif jaħdem

1. `getMachineTokenSync()` jaqra l-ID tal-magna tal-hardware permezz ta’ `node-machine-id`
   (jekk ifalli, juża string vojta, u b’hekk jiddiżattiva l-awtentikazzjoni tal-CLI).
2. Jikkalkula `HMAC-SHA256(machine_id, salt)` u jirritorna d-diġest hex sħiħ ta’
   64 karattru — token deterministiku u mhux riversibbli marbut ma’ din il-magna.
3. Il-CLI jibgħat it-token bħala `x-omniroute-cli-token` biss meta d-destinazzjoni
   riżolta tkun URL loopback espliċitu (`localhost`, `127.0.0.0/8`, jew IPv6
   loopback). Talbiet li jġorru t-token jużaw `redirect: error`, sabiex ridirezzjoni
   lokali ma tkunx tista’ tibagħtu lil oriġini oħra. Kuntesti remoti jużaw tokens
   ta’ aċċess b’ambitu minflok. Jekk id-derivazzjoni ma tkunx disponibbli, il-CLI
   iħalli barra l-header u `omniroute doctor` jirrapporta l-falliment minflok ma
   jqis token vojt bħala validu.
4. Is-server (`src/server/authz/policies/management.ts`) jerġa’ jikkalkula t-token
   mistenni bl-istess salt u jqabblu permezz ta’ `timingSafeEqual` sabiex
   jipprevjeni l-estrazzjoni bbażata fuq il-ħin.

## Karatteristiċi tas-sigurtà

| Karatteristika                         | Dettall                                                                                                                                                                                                                                         |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Loopback biss**                      | Jiġi aċċettat biss meta l-marka affidabbli tas-server dwar il-lokalità tal-peer (derivata mill-indirizz reali tal-peer TCP) tindika loopback. Il-header `Host`, ikkontrollat mill-klijent, qatt ma jiġi fdat biex tiġi ddeterminata l-lokalità. |
| **Tqabbil b’ħin kostanti**             | `crypto.timingSafeEqual` jipprevjeni attakki bbażati fuq il-ħin.                                                                                                                                                                                |
| **Mhux riversibbli**                   | L-output tal-HMAC ma jistax jintuża biex tiġi rkuprata l-ID tal-magna.                                                                                                                                                                          |
| **Ebda qbiż tal-protezzjoni `always`** | `isAlwaysProtectedPath()` jiġi evalwat qabel il-verifika tat-token tal-CLI. `/api/shutdown` u `/api/settings/database` dejjem jeħtieġu JWT.                                                                                                     |
| **Mhux esportabbli**                   | It-token qatt ma jinkiteb fuq id-diska jew fir-reġistri.                                                                                                                                                                                        |

## Salt predefinit (aleatorju għal kull installazzjoni)

Meta `OMNIROUTE_CLI_SALT` ma jkunx issettjat, is-salt ikun string hex aleatorja ta’
64 karattru, iġġenerata darba u ppersistita f’`<DATA_DIR>/cli-token-salt.json` (modalità `0600`) —
mhux il-literal inkluż fir-repożitorju `omniroute-cli-auth-v1`. Kemm `getActiveSalt()` f’
`src/lib/machineToken.ts` kif ukoll il-kopja tiegħu f’`bin/cli/utils/cliToken.mjs` jaqraw
l-istess fajl, sabiex is-server u kull invokazzjoni tal-CLI f’din l-installazzjoni jikkonverġu
fuq l-istess valur; il-literal inkluż fir-repożitorju jintuża biss bħala fallback tal-aħħar
għażla meta jkun għadu ma jistax jiġi stabbilit salt ippersistit jew mill-ambjent (pereżempju,
installazzjoni ġdida tas-CLI biss qabel ma s-server ikun qatt tħaddem). Dan jagħlaq dgħufija
tal-valur predefinit fiss antik: `/etc/machine-id` normalment jista’ jinqara minn kulħadd, u
għalhekk kwalunkwe utent lokali seta’ inkella jidderiva l-istess token għal kull installazzjoni
li qatt ma ssettjat `OMNIROUTE_CLI_SALT`.

## Rotazzjoni tas-salt

Issettja `OMNIROUTE_CLI_SALT` biex iddawwar it-token derivat mingħajr bidliet fil-kodiċi — dan
dejjem jieħu prijorità fuq is-salt għal kull installazzjoni li jkun ġie ppersistit. Wara r-rotazzjoni, il-proċessi kollha tas-CLI
fuq din il-magna se jużaw it-token il-ġdid awtomatikament. Utli wara tnixxija tal-lista tal-proċessi
li setgħet esponiet il-valur derivat preċedenti.

```bash
# Rotazzjoni persistenti (żidha mal-profil tax-shell)
export OMNIROUTE_CLI_SALT="my-secret-salt-2026"

# Ivverifika li qed jintuża t-token il-ġdid
omniroute status
```

## Format preċedenti (SHA-256, 32 karattru) — għadu aċċettat

Qabel il-format HMAC ta’ hawn fuq, is-CLI kien jidderiva t-token tiegħu bħala
`SHA-256(machineId + salt).hex[0..32]` (prefiss ta’ 32 karattru) f’
`bin/cli/utils/cliToken.mjs` (`getLegacyCliTokenSync` f’`src/lib/machineToken.ts`).

Għall-kompatibbiltà b’lura, is-server jaċċetta **ż-żewġ** formati: il-verifikatur jibni
`expectedTokens = [getMachineTokenSync(), getLegacyCliTokenSync()]` u jqabbel l-header
li jkun dieħel ma’ kull wieħed permezz ta’ `timingSafeEqual`
(`src/server/authz/policies/management.ts` u `src/lib/middleware/cliTokenAuth.ts`).
Għalhekk, token ikun validu jekk jaqbel **jew** mad-diġest HMAC ta’ 64 karattru jew mal-prefiss
preċedenti SHA-256 ta’ 32 karattru.

**Diżattivazzjoni:** issettja `OMNIROUTE_DISABLE_CLI_TOKEN=true` (fl-ambjent jew f’`.env`) biex tiddiżattiva kompletament
il-mekkaniżmu tat-token tas-CLI; imbagħad kull aċċess ikun jeħtieġ API key espliċita. Fuq hosts b’diversi utenti
dan huwa rakkomandat, billi `machine-id` huwa għal kull apparat (mhux għal kull utent) u utent ieħor
fuq l-istess host jista’ jikkalkula l-istess token.

## Fajls

| Fajl                                      | Għan                                               |
| ----------------------------------------- | -------------------------------------------------- |
| `src/lib/machineToken.ts`                 | Derivazzjoni tat-token (`getMachineTokenSync`)     |
| `bin/cli/utils/cliToken.mjs`              | Kopja fuq in-naħa tas-CLI tal-istess derivazzjoni  |
| `<DATA_DIR>/cli-token-salt.json`          | Salt aleatorju ppersistit għal kull installazzjoni |
| `src/server/authz/headers.ts`             | Kostanti `CLI_TOKEN_HEADER`                        |
| `src/server/authz/policies/management.ts` | Verifika fuq in-naħa tas-server                    |
| `src/server/authz/routeGuard.ts`          | Kontroll tal-host loopback (`isLoopbackHost`)      |

## Ara wkoll

- `docs/security/ROUTE_GUARD_TIERS.md` — livelli ta’ protezzjoni tar-rotot
- `docs/architecture/AUTHZ_GUIDE.md` — pipeline sħiħ tal-awtorizzazzjoni
