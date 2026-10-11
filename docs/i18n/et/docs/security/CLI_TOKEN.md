# CLI Machine-ID Token (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CLI_TOKEN.md) · 🇪🇹 [am](../../../am/docs/security/CLI_TOKEN.md) · 🇸🇦 [ar](../../../ar/docs/security/CLI_TOKEN.md) · 🇦🇿 [az](../../../az/docs/security/CLI_TOKEN.md) · 🇧🇬 [bg](../../../bg/docs/security/CLI_TOKEN.md) · 🇧🇩 [bn](../../../bn/docs/security/CLI_TOKEN.md) · 🇧🇦 [bs](../../../bs/docs/security/CLI_TOKEN.md) · 🇨🇿 [cs](../../../cs/docs/security/CLI_TOKEN.md) · 🇩🇰 [da](../../../da/docs/security/CLI_TOKEN.md) · 🇩🇪 [de](../../../de/docs/security/CLI_TOKEN.md) · 🇬🇷 [el](../../../el/docs/security/CLI_TOKEN.md) · 🇪🇸 [es](../../../es/docs/security/CLI_TOKEN.md) · 🇮🇷 [fa](../../../fa/docs/security/CLI_TOKEN.md) · 🇫🇮 [fi](../../../fi/docs/security/CLI_TOKEN.md) · 🇫🇷 [fr](../../../fr/docs/security/CLI_TOKEN.md) · 🇮🇪 [ga](../../../ga/docs/security/CLI_TOKEN.md) · 🇮🇳 [gu](../../../gu/docs/security/CLI_TOKEN.md) · 🇳🇬 [ha](../../../ha/docs/security/CLI_TOKEN.md) · 🇮🇱 [he](../../../he/docs/security/CLI_TOKEN.md) · 🇮🇳 [hi](../../../hi/docs/security/CLI_TOKEN.md) · 🇭🇷 [hr](../../../hr/docs/security/CLI_TOKEN.md) · 🇭🇺 [hu](../../../hu/docs/security/CLI_TOKEN.md) · 🇦🇲 [hy](../../../hy/docs/security/CLI_TOKEN.md) · 🇮🇩 [id](../../../id/docs/security/CLI_TOKEN.md) · 🇳🇬 [ig](../../../ig/docs/security/CLI_TOKEN.md) · 🇮🇹 [it](../../../it/docs/security/CLI_TOKEN.md) · 🇯🇵 [ja](../../../ja/docs/security/CLI_TOKEN.md) · 🇬🇪 [ka](../../../ka/docs/security/CLI_TOKEN.md) · 🇰🇭 [km](../../../km/docs/security/CLI_TOKEN.md) · 🇮🇳 [kn](../../../kn/docs/security/CLI_TOKEN.md) · 🇰🇷 [ko](../../../ko/docs/security/CLI_TOKEN.md) · 🇱🇹 [lt](../../../lt/docs/security/CLI_TOKEN.md) · 🇱🇻 [lv](../../../lv/docs/security/CLI_TOKEN.md) · 🇮🇳 [ml](../../../ml/docs/security/CLI_TOKEN.md) · 🇮🇳 [mr](../../../mr/docs/security/CLI_TOKEN.md) · 🇲🇾 [ms](../../../ms/docs/security/CLI_TOKEN.md) · 🇲🇹 [mt](../../../mt/docs/security/CLI_TOKEN.md) · 🇲🇲 [my](../../../my/docs/security/CLI_TOKEN.md) · 🇳🇵 [ne](../../../ne/docs/security/CLI_TOKEN.md) · 🇳🇱 [nl](../../../nl/docs/security/CLI_TOKEN.md) · 🇳🇴 [no](../../../no/docs/security/CLI_TOKEN.md) · 🇮🇳 [or](../../../or/docs/security/CLI_TOKEN.md) · 🇮🇳 [pa](../../../pa/docs/security/CLI_TOKEN.md) · 🇵🇭 [phi](../../../phi/docs/security/CLI_TOKEN.md) · 🇵🇱 [pl](../../../pl/docs/security/CLI_TOKEN.md) · 🇵🇹 [pt](../../../pt/docs/security/CLI_TOKEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CLI_TOKEN.md) · 🇷🇴 [ro](../../../ro/docs/security/CLI_TOKEN.md) · 🇷🇺 [ru](../../../ru/docs/security/CLI_TOKEN.md) · 🇱🇰 [si](../../../si/docs/security/CLI_TOKEN.md) · 🇸🇰 [sk](../../../sk/docs/security/CLI_TOKEN.md) · 🇸🇮 [sl](../../../sl/docs/security/CLI_TOKEN.md) · 🇷🇸 [sr](../../../sr/docs/security/CLI_TOKEN.md) · 🇸🇪 [sv](../../../sv/docs/security/CLI_TOKEN.md) · 🇰🇪 [sw](../../../sw/docs/security/CLI_TOKEN.md) · 🇮🇳 [ta](../../../ta/docs/security/CLI_TOKEN.md) · 🇮🇳 [te](../../../te/docs/security/CLI_TOKEN.md) · 🇹🇭 [th](../../../th/docs/security/CLI_TOKEN.md) · 🇹🇷 [tr](../../../tr/docs/security/CLI_TOKEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CLI_TOKEN.md) · 🇵🇰 [ur](../../../ur/docs/security/CLI_TOKEN.md) · 🇺🇿 [uz](../../../uz/docs/security/CLI_TOKEN.md) · 🇻🇳 [vi](../../../vi/docs/security/CLI_TOKEN.md) · 🇳🇬 [yo](../../../yo/docs/security/CLI_TOKEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CLI_TOKEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CLI_TOKEN.md)

---

## Ülevaade

OmniRoute CLI käsud autendivad kohaliku haldus-API vastu
`HMAC-SHA256(machine-id, salt)` loaga, mis saadetakse päringu päises
`x-omniroute-cli-token`.

See võimaldab CLI alamkäskudel (`omniroute status`, `omniroute providers` jne)
kutsuda halduse lõpp-punkte, ilma et kasutaja peaks igal käivitamisel JWT-d või
parooli sisestama.

## Kuidas see töötab

1. `getMachineTokenSync()` loeb riistvara masina ID paketi `node-machine-id`
   kaudu (tõrke korral kasutatakse tühja stringi, mis keelab CLI autentimise).
2. See arvutab `HMAC-SHA256(machine_id, salt)` ja tagastab täieliku 64-märgilise
   kuueteistkümnendsüsteemi räsi — deterministliku, pöördumatu ja selle masinaga seotud loa.
3. CLI saadab loa päisena `x-omniroute-cli-token` ainult siis, kui lahendatud
   sihtkoht on otsene loopback-URL (`localhost`, `127.0.0.0/8` või
   loopback-IPv6). Luba sisaldavad päringud kasutavad sätet `redirect: error`, et kohalik
   ümbersuunamine ei saaks seda teisele päritolule edastada. Kaugkontekstid kasutavad selle
   asemel piiritletud juurdepääsulube. Kui tuletamine pole võimalik, jätab CLI päise ära
   ning `omniroute doctor` teatab tõrkest, selle asemel et käsitleda tühja luba
   kehtivana.
4. Server (`src/server/authz/policies/management.ts`) arvutab oodatava
   loa sama soolaga uuesti ja võrdleb seda funktsiooniga `timingSafeEqual`, et
   vältida ajastuspõhist tuletamist.

## Turbeomadused

| Omadus                               | Üksikasjad                                                                                                                                                                                                                           |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Ainult loopback**                  | Aktsepteeritakse ainult siis, kui serveri usaldusväärne partneri lokaalsuse märge (tuletatud tegelikust TCP-partneri aadressist) näitab loopback-aadressi. Kliendi juhitavat päist `Host` ei usaldata kunagi lokaalsuse määramiseks. |
| **Konstantse ajaga võrdlus**         | `crypto.timingSafeEqual` takistab ajastusründeid.                                                                                                                                                                                    |
| **Pöördumatu**                       | HMAC-i väljundist ei saa masina ID-d taastada.                                                                                                                                                                                       |
| **`always`-kaitse möödaviik puudub** | `isAlwaysProtectedPath()` käivitatakse enne CLI loa kontrolli. `/api/shutdown` ja `/api/settings/database` nõuavad alati JWT-d.                                                                                                      |
| **Mitteeksporditav**                 | Luba ei kirjutata kunagi kettale ega logita.                                                                                                                                                                                         |

## Vaikimisi sool (iga installi puhul juhuslik)

Kui `OMNIROUTE_CLI_SALT` pole määratud, on sool juhuslik 64-märgiline kuueteistkümnendsüsteemi string, mis genereeritakse üks kord ja salvestatakse püsivalt faili `<DATA_DIR>/cli-token-salt.json` (režiim `0600`) — see ei ole koodihoidlasse lisatud literaal `omniroute-cli-auth-v1`. Nii funktsioon `getActiveSalt()` failis `src/lib/machineToken.ts` kui ka selle vaste failis `bin/cli/utils/cliToken.mjs` loevad sama faili, mistõttu kasutavad server ja selle installi iga CLI-käivitus sama väärtust; koodihoidlasse lisatud literaali kasutatakse viimase abinõuna ainult siis, kui püsivalt salvestatud või keskkonnamuutuja kaudu määratud soola pole veel võimalik kasutada (näiteks värske, ainult CLI-d sisaldava installi korral enne serveri esmakordset käivitamist). See kõrvaldab vana fikseeritud vaikeliteraali nõrkuse: `/etc/machine-id` on sageli kõigile kasutajatele loetav, mistõttu saaks iga kohalik kasutaja muidu tuletada sama tõendi iga installi jaoks, milles pole kunagi muutujat `OMNIROUTE_CLI_SALT` määratud.

Kui soola ei saa lugeda ega luua, väljastavad nii server kui ka CLI enne selle ühilduvuse tagamiseks mõeldud varuvariandi kasutamist ühe hoiatuse protsessi kohta. Hoiatus ei sisalda soola, tõendit, failisüsteemi teed ega töötlemata veateadet. Taastage juurdepääs kataloogile `DATA_DIR` või määrake `OMNIROUTE_CLI_SALT` ja seejärel taaskäivitage mõjutatud protsess. Hoiatus muudab tõrke nähtavaks; see ei muuda avalikku varusoola privaatseks ega keela CLI autentimist. Olemasolevad kehtivad püsivalt salvestatud soolad ja sõnaselged keskkonnamuutuja alistused säilitavad oma varasemad tõendiväärtused.

## Soola rotatsioon

Määra `OMNIROUTE_CLI_SALT`, et tuletatud tokenit ilma koodimuudatusteta roteerida — sellel on alati prioriteet installipõhiselt püsivalt salvestatud soola ees. Pärast rotatsiooni kasutavad kõik selle masina CLI-protsessid automaatselt uut tokenit. Kasulik pärast protsessiloendi leket, mis võis paljastada eelmise tuletatud väärtuse.

```bash
# Püsiv rotatsioon (lisa shelli profiili)
export OMNIROUTE_CLI_SALT="my-secret-salt-2026"

# Kontrolli, et uus token on kasutusel
omniroute status
```

## Pärandvorming (SHA-256, 32 märki) — endiselt aktsepteeritud

Enne ülaltoodud HMAC-vormingut tuletas CLI oma tokeni kujul
`SHA-256(machineId + salt).hex[0..32]` (32-märgiline prefiks) failis
`bin/cli/utils/cliToken.mjs` (`getLegacyCliTokenSync` failis `src/lib/machineToken.ts`).

Tagasiühilduvuse tagamiseks aktsepteerib server **mõlemat** vormingut: kontrollija koostab
`expectedTokens = [getMachineTokenSync(), getLegacyCliTokenSync()]` ja võrdleb
sissetulevat päist iga väärtusega funktsiooni `timingSafeEqual` abil
(`src/server/authz/policies/management.ts` ja `src/lib/middleware/cliTokenAuth.ts`).
Seega on token kehtiv, kui see vastab **kas** 64-märgilisele HMAC-räsile või 32-märgilisele
SHA-256 pärandprefiksile.

**Loobumine:** määra `OMNIROUTE_DISABLE_CLI_TOKEN=true` (keskkonnas või failis `.env`), et CLI
tokenimehhanism täielikult keelata; sel juhul nõuab kogu juurdepääs otsest API-võtit. Mitme kasutajaga
hostides on see soovitatav, kuna `machine-id` on seadmepõhine (mitte kasutajapõhine) ja teine
sama hosti kasutaja võib arvutada sama tokeni.

## Failid

| Fail                                      | Otstarve                                          |
| ----------------------------------------- | ------------------------------------------------- |
| `src/lib/machineToken.ts`                 | Tokeni tuletamine (`getMachineTokenSync`)         |
| `bin/cli/utils/cliToken.mjs`              | Sama tuletus CLI poolel                           |
| `<DATA_DIR>/cli-token-salt.json`          | Püsivalt salvestatud juhuslik installipõhine sool |
| `src/server/authz/headers.ts`             | Konstant `CLI_TOKEN_HEADER`                       |
| `src/server/authz/policies/management.ts` | Serveripoolne kontroll                            |
| `src/server/authz/routeGuard.ts`          | Tagasisideahela hosti kontroll (`isLoopbackHost`) |

## Vaata ka

- `docs/security/ROUTE_GUARD_TIERS.md` — marsruutide kaitsetasemed
- `docs/architecture/AUTHZ_GUIDE.md` — täielik autoriseerimiskonveier
