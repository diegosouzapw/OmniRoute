# CLI Machine-ID Token (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CLI_TOKEN.md) · 🇪🇹 [am](../../../am/docs/security/CLI_TOKEN.md) · 🇸🇦 [ar](../../../ar/docs/security/CLI_TOKEN.md) · 🇦🇿 [az](../../../az/docs/security/CLI_TOKEN.md) · 🇧🇬 [bg](../../../bg/docs/security/CLI_TOKEN.md) · 🇧🇩 [bn](../../../bn/docs/security/CLI_TOKEN.md) · 🇧🇦 [bs](../../../bs/docs/security/CLI_TOKEN.md) · 🇨🇿 [cs](../../../cs/docs/security/CLI_TOKEN.md) · 🇩🇰 [da](../../../da/docs/security/CLI_TOKEN.md) · 🇩🇪 [de](../../../de/docs/security/CLI_TOKEN.md) · 🇬🇷 [el](../../../el/docs/security/CLI_TOKEN.md) · 🇪🇸 [es](../../../es/docs/security/CLI_TOKEN.md) · 🇪🇪 [et](../../../et/docs/security/CLI_TOKEN.md) · 🇮🇷 [fa](../../../fa/docs/security/CLI_TOKEN.md) · 🇫🇮 [fi](../../../fi/docs/security/CLI_TOKEN.md) · 🇫🇷 [fr](../../../fr/docs/security/CLI_TOKEN.md) · 🇮🇪 [ga](../../../ga/docs/security/CLI_TOKEN.md) · 🇮🇳 [gu](../../../gu/docs/security/CLI_TOKEN.md) · 🇳🇬 [ha](../../../ha/docs/security/CLI_TOKEN.md) · 🇮🇱 [he](../../../he/docs/security/CLI_TOKEN.md) · 🇮🇳 [hi](../../../hi/docs/security/CLI_TOKEN.md) · 🇭🇷 [hr](../../../hr/docs/security/CLI_TOKEN.md) · 🇭🇺 [hu](../../../hu/docs/security/CLI_TOKEN.md) · 🇦🇲 [hy](../../../hy/docs/security/CLI_TOKEN.md) · 🇮🇩 [id](../../../id/docs/security/CLI_TOKEN.md) · 🇳🇬 [ig](../../../ig/docs/security/CLI_TOKEN.md) · 🇮🇹 [it](../../../it/docs/security/CLI_TOKEN.md) · 🇯🇵 [ja](../../../ja/docs/security/CLI_TOKEN.md) · 🇬🇪 [ka](../../../ka/docs/security/CLI_TOKEN.md) · 🇰🇭 [km](../../../km/docs/security/CLI_TOKEN.md) · 🇮🇳 [kn](../../../kn/docs/security/CLI_TOKEN.md) · 🇰🇷 [ko](../../../ko/docs/security/CLI_TOKEN.md) · 🇱🇹 [lt](../../../lt/docs/security/CLI_TOKEN.md) · 🇱🇻 [lv](../../../lv/docs/security/CLI_TOKEN.md) · 🇮🇳 [ml](../../../ml/docs/security/CLI_TOKEN.md) · 🇮🇳 [mr](../../../mr/docs/security/CLI_TOKEN.md) · 🇲🇾 [ms](../../../ms/docs/security/CLI_TOKEN.md) · 🇲🇹 [mt](../../../mt/docs/security/CLI_TOKEN.md) · 🇲🇲 [my](../../../my/docs/security/CLI_TOKEN.md) · 🇳🇵 [ne](../../../ne/docs/security/CLI_TOKEN.md) · 🇳🇱 [nl](../../../nl/docs/security/CLI_TOKEN.md) · 🇳🇴 [no](../../../no/docs/security/CLI_TOKEN.md) · 🇮🇳 [or](../../../or/docs/security/CLI_TOKEN.md) · 🇮🇳 [pa](../../../pa/docs/security/CLI_TOKEN.md) · 🇵🇭 [phi](../../../phi/docs/security/CLI_TOKEN.md) · 🇵🇱 [pl](../../../pl/docs/security/CLI_TOKEN.md) · 🇵🇹 [pt](../../../pt/docs/security/CLI_TOKEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CLI_TOKEN.md) · 🇷🇴 [ro](../../../ro/docs/security/CLI_TOKEN.md) · 🇷🇺 [ru](../../../ru/docs/security/CLI_TOKEN.md) · 🇱🇰 [si](../../../si/docs/security/CLI_TOKEN.md) · 🇸🇰 [sk](../../../sk/docs/security/CLI_TOKEN.md) · 🇸🇮 [sl](../../../sl/docs/security/CLI_TOKEN.md) · 🇷🇸 [sr](../../../sr/docs/security/CLI_TOKEN.md) · 🇸🇪 [sv](../../../sv/docs/security/CLI_TOKEN.md) · 🇮🇳 [ta](../../../ta/docs/security/CLI_TOKEN.md) · 🇮🇳 [te](../../../te/docs/security/CLI_TOKEN.md) · 🇹🇭 [th](../../../th/docs/security/CLI_TOKEN.md) · 🇹🇷 [tr](../../../tr/docs/security/CLI_TOKEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CLI_TOKEN.md) · 🇵🇰 [ur](../../../ur/docs/security/CLI_TOKEN.md) · 🇺🇿 [uz](../../../uz/docs/security/CLI_TOKEN.md) · 🇻🇳 [vi](../../../vi/docs/security/CLI_TOKEN.md) · 🇳🇬 [yo](../../../yo/docs/security/CLI_TOKEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CLI_TOKEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CLI_TOKEN.md)

---

## Muhtasari

Amri za OmniRoute CLI huthibitisha utambulisho dhidi ya API ya usimamizi ya ndani kwa kutumia
tokeni ya `HMAC-SHA256(machine-id, salt)` inayotumwa kupitia kichwa cha ombi cha
`x-omniroute-cli-token`.

Hii huruhusu amri ndogo za CLI (`omniroute status`, `omniroute providers`, n.k.)
kuita sehemu za mwisho za usimamizi bila kumhitaji mtumiaji kutoa JWT au
nenosiri kila zinapoendeshwa.

## Jinsi inavyofanya kazi

1. `getMachineTokenSync()` husoma kitambulisho cha maunzi cha mashine kupitia `node-machine-id`
   (hutumia tungo tupu ikishindwa, hali inayozima uthibitishaji wa CLI).
2. Hukokotoa `HMAC-SHA256(machine_id, salt)` na kurejesha muhtasari kamili wa heksadesimali
   wenye vibambo 64 — tokeni thabiti, isiyoweza kurejeshwa nyuma, iliyofungamanishwa na mashine hii.
3. CLI hutuma tokeni kama `x-omniroute-cli-token` ikiwa tu lengwa lililotambuliwa
   ni URL bayana ya loopback (`localhost`, `127.0.0.0/8`, au
   IPv6 ya loopback). Maombi yaliyo na tokeni hutumia `redirect: error`, ili uelekezaji
   wa ndani usiweze kuipeleka kwa asili nyingine. Miktadha ya mbali hutumia tokeni za
   ufikiaji zenye upeo badala yake. Ikiwa uzalishaji wa tokeni haupatikani, CLI huacha kichwa hicho
   na `omniroute doctor` huripoti hitilafu badala ya kuchukulia tokeni tupu
   kuwa halali.
4. Seva (`src/server/authz/policies/management.ts`) hukokotoa upya
   tokeni inayotarajiwa kwa chumvi ileile na kuilinganisha kupitia `timingSafeEqual` ili
   kuzuia uchunguzi wa tokeni unaotegemea muda.

## Sifa za usalama

| Sifa                                          | Maelezo                                                                                                                                                                                                             |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Loopback pekee**                            | Hukubaliwa tu ikiwa muhuri unaoaminika wa seva kuhusu eneo la rika (unaotokana na anwani halisi ya rika la TCP) unaonyesha loopback. Kichwa cha `Host` kinachodhibitiwa na mteja hakiaminiki kamwe kubainisha eneo. |
| **Ulinganishaji wa muda thabiti**             | `crypto.timingSafeEqual` huzuia mashambulizi ya muda.                                                                                                                                                               |
| **Haiwezi kurejeshwa nyuma**                  | Tokeo la HMAC haliwezi kutumika kurejesha kitambulisho cha mashine.                                                                                                                                                 |
| **Hakuna njia ya kukwepa ulinzi wa `always`** | `isAlwaysProtectedPath()` hutathminiwa kabla ya ukaguzi wa tokeni ya CLI. `/api/shutdown` na `/api/settings/database` huhitaji JWT kila wakati.                                                                     |
| **Haiwezi kuhamishwa**                        | Tokeni haiandikwi kamwe kwenye diski wala kurekodiwa kwenye kumbukumbu.                                                                                                                                             |

## Chumvi chaguomsingi (nasibu kwa kila usakinishaji)

Wakati `OMNIROUTE_CLI_SALT` haijawekwa, chumvi huwa tungo nasibu ya heksadesimali yenye vibambo 64
inayozalishwa mara moja na kuhifadhiwa katika `<DATA_DIR>/cli-token-salt.json` (hali `0600`) —
si thamani halisi `omniroute-cli-auth-v1` iliyohifadhiwa kwenye msimbo. `getActiveSalt()` katika
`src/lib/machineToken.ts` na nakala yake katika `bin/cli/utils/cliToken.mjs` husoma
faili lilelile, ili seva na kila uendeshaji wa CLI katika usakinishaji huu zitumie
thamani ileile; thamani halisi iliyohifadhiwa kwenye msimbo hutumiwa tu kama mbadala wa mwisho wakati hakuna
chumvi iliyohifadhiwa au ya mazingira inayoweza kupatikana bado (kwa mfano usakinishaji mpya wa CLI pekee
kabla ya seva kuwahi kuendeshwa). Hii hufunga udhaifu wa thamani ya zamani chaguomsingi isiyobadilika:
`/etc/machine-id` kwa kawaida inaweza kusomwa na watumiaji wote, kwa hivyo mtumiaji yeyote wa ndani angeweza
vinginevyo kuzalisha tokeni ileile kwa kila usakinishaji ambao haujawahi kuweka
`OMNIROUTE_CLI_SALT`.

## Ubadilishaji wa salt

Weka `OMNIROUTE_CLI_SALT` ili kubadilisha tokeni inayozalishwa bila kubadilisha msimbo — kila
wakati hupewa kipaumbele dhidi ya salt iliyohifadhiwa ya kila usakinishaji. Baada ya kubadilisha,
michakato yote ya CLI kwenye mashine hii itatumia tokeni mpya kiotomatiki. Hii ni muhimu baada ya
kuvuja kwa orodha ya michakato ambako huenda kulifichua thamani ya awali iliyozalishwa.

```bash
# Ubadilishaji wa kudumu (ongeza kwenye wasifu wa shell)
export OMNIROUTE_CLI_SALT="my-secret-salt-2026"

# Thibitisha kuwa tokeni mpya inatumika
omniroute status
```

## Umbizo la zamani (SHA-256, herufi 32) — bado linakubalika

Kabla ya umbizo la HMAC lililo hapo juu, CLI ilizalisha tokeni yake kama
`SHA-256(machineId + salt).hex[0..32]` (kiambishi awali cha herufi 32) katika
`bin/cli/utils/cliToken.mjs` (`getLegacyCliTokenSync` katika `src/lib/machineToken.ts`).

Kwa uoanifu wa nyuma, seva inakubali miundo **yote miwili**: kithibitishaji huunda
`expectedTokens = [getMachineTokenSync(), getLegacyCliTokenSync()]` na kulinganisha
kichwa kinachoingia dhidi ya kila moja kwa kutumia `timingSafeEqual`
(`src/server/authz/policies/management.ts` na `src/lib/middleware/cliTokenAuth.ts`).
Kwa hivyo, tokeni ni halali ikiwa inalingana na **ama** muhtasari wa HMAC wa herufi 64 au
kiambishi awali cha zamani cha SHA-256 cha herufi 32.

**Kujiondoa:** weka `OMNIROUTE_DISABLE_CLI_TOKEN=true` (katika mazingira au `.env`) ili kulemaza
kabisa utaratibu wa tokeni ya CLI; ufikiaji wote kisha utahitaji ufunguo bayana wa API. Kwenye seva
zenye watumiaji wengi, hili linapendekezwa, kwa kuwa `machine-id` ni ya kila kifaa (si ya kila mtumiaji)
na mtumiaji mwingine kwenye seva hiyo hiyo anaweza kukokotoa tokeni hiyo hiyo.

## Faili

| Faili                                     | Madhumuni                                        |
| ----------------------------------------- | ------------------------------------------------ |
| `src/lib/machineToken.ts`                 | Uzalishaji wa tokeni (`getMachineTokenSync`)     |
| `bin/cli/utils/cliToken.mjs`              | Nakala ya upande wa CLI ya uzalishaji huo huo    |
| `<DATA_DIR>/cli-token-salt.json`          | Salt nasibu iliyohifadhiwa kwa kila usakinishaji |
| `src/server/authz/headers.ts`             | Konstanti ya `CLI_TOKEN_HEADER`                  |
| `src/server/authz/policies/management.ts` | Uthibitishaji wa upande wa seva                  |
| `src/server/authz/routeGuard.ts`          | Ukaguzi wa seva ya loopback (`isLoopbackHost`)   |

## Tazama pia

- `docs/security/ROUTE_GUARD_TIERS.md` — viwango vya ulinzi wa njia
- `docs/architecture/AUTHZ_GUIDE.md` — mchakato kamili wa uidhinishaji
