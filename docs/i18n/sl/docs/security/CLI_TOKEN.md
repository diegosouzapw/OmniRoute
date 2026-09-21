# CLI Machine-ID Token (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CLI_TOKEN.md) · 🇪🇹 [am](../../../am/docs/security/CLI_TOKEN.md) · 🇸🇦 [ar](../../../ar/docs/security/CLI_TOKEN.md) · 🇦🇿 [az](../../../az/docs/security/CLI_TOKEN.md) · 🇧🇬 [bg](../../../bg/docs/security/CLI_TOKEN.md) · 🇧🇩 [bn](../../../bn/docs/security/CLI_TOKEN.md) · 🇨🇿 [cs](../../../cs/docs/security/CLI_TOKEN.md) · 🇩🇰 [da](../../../da/docs/security/CLI_TOKEN.md) · 🇩🇪 [de](../../../de/docs/security/CLI_TOKEN.md) · 🇬🇷 [el](../../../el/docs/security/CLI_TOKEN.md) · 🇪🇸 [es](../../../es/docs/security/CLI_TOKEN.md) · 🇪🇪 [et](../../../et/docs/security/CLI_TOKEN.md) · 🇮🇷 [fa](../../../fa/docs/security/CLI_TOKEN.md) · 🇫🇮 [fi](../../../fi/docs/security/CLI_TOKEN.md) · 🇫🇷 [fr](../../../fr/docs/security/CLI_TOKEN.md) · 🇮🇪 [ga](../../../ga/docs/security/CLI_TOKEN.md) · 🇮🇳 [gu](../../../gu/docs/security/CLI_TOKEN.md) · 🇳🇬 [ha](../../../ha/docs/security/CLI_TOKEN.md) · 🇮🇱 [he](../../../he/docs/security/CLI_TOKEN.md) · 🇮🇳 [hi](../../../hi/docs/security/CLI_TOKEN.md) · 🇭🇷 [hr](../../../hr/docs/security/CLI_TOKEN.md) · 🇭🇺 [hu](../../../hu/docs/security/CLI_TOKEN.md) · 🇦🇲 [hy](../../../hy/docs/security/CLI_TOKEN.md) · 🇮🇩 [id](../../../id/docs/security/CLI_TOKEN.md) · 🇳🇬 [ig](../../../ig/docs/security/CLI_TOKEN.md) · 🇮🇹 [it](../../../it/docs/security/CLI_TOKEN.md) · 🇯🇵 [ja](../../../ja/docs/security/CLI_TOKEN.md) · 🇬🇪 [ka](../../../ka/docs/security/CLI_TOKEN.md) · 🇰🇭 [km](../../../km/docs/security/CLI_TOKEN.md) · 🇮🇳 [kn](../../../kn/docs/security/CLI_TOKEN.md) · 🇰🇷 [ko](../../../ko/docs/security/CLI_TOKEN.md) · 🇱🇹 [lt](../../../lt/docs/security/CLI_TOKEN.md) · 🇱🇻 [lv](../../../lv/docs/security/CLI_TOKEN.md) · 🇮🇳 [ml](../../../ml/docs/security/CLI_TOKEN.md) · 🇮🇳 [mr](../../../mr/docs/security/CLI_TOKEN.md) · 🇲🇾 [ms](../../../ms/docs/security/CLI_TOKEN.md) · 🇲🇹 [mt](../../../mt/docs/security/CLI_TOKEN.md) · 🇲🇲 [my](../../../my/docs/security/CLI_TOKEN.md) · 🇳🇵 [ne](../../../ne/docs/security/CLI_TOKEN.md) · 🇳🇱 [nl](../../../nl/docs/security/CLI_TOKEN.md) · 🇳🇴 [no](../../../no/docs/security/CLI_TOKEN.md) · 🇮🇳 [or](../../../or/docs/security/CLI_TOKEN.md) · 🇮🇳 [pa](../../../pa/docs/security/CLI_TOKEN.md) · 🇵🇭 [phi](../../../phi/docs/security/CLI_TOKEN.md) · 🇵🇱 [pl](../../../pl/docs/security/CLI_TOKEN.md) · 🇵🇹 [pt](../../../pt/docs/security/CLI_TOKEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CLI_TOKEN.md) · 🇷🇴 [ro](../../../ro/docs/security/CLI_TOKEN.md) · 🇷🇺 [ru](../../../ru/docs/security/CLI_TOKEN.md) · 🇱🇰 [si](../../../si/docs/security/CLI_TOKEN.md) · 🇸🇰 [sk](../../../sk/docs/security/CLI_TOKEN.md) · 🇷🇸 [sr](../../../sr/docs/security/CLI_TOKEN.md) · 🇸🇪 [sv](../../../sv/docs/security/CLI_TOKEN.md) · 🇰🇪 [sw](../../../sw/docs/security/CLI_TOKEN.md) · 🇮🇳 [ta](../../../ta/docs/security/CLI_TOKEN.md) · 🇮🇳 [te](../../../te/docs/security/CLI_TOKEN.md) · 🇹🇭 [th](../../../th/docs/security/CLI_TOKEN.md) · 🇹🇷 [tr](../../../tr/docs/security/CLI_TOKEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CLI_TOKEN.md) · 🇵🇰 [ur](../../../ur/docs/security/CLI_TOKEN.md) · 🇺🇿 [uz](../../../uz/docs/security/CLI_TOKEN.md) · 🇻🇳 [vi](../../../vi/docs/security/CLI_TOKEN.md) · 🇳🇬 [yo](../../../yo/docs/security/CLI_TOKEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CLI_TOKEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CLI_TOKEN.md)

---

## Pregled

Ukazi OmniRoute CLI se overjajo pri lokalnem upravljalnem API-ju z uporabo žetona
`HMAC-SHA256(machine-id, salt)`, poslanega prek glave zahteve
`x-omniroute-cli-token`.

To podukazom CLI (`omniroute status`, `omniroute providers` itd.) omogoča
klicanje upravljalnih končnih točk, ne da bi moral uporabnik ob vsakem klicu
vnesti JWT ali geslo.

## Kako deluje

1. `getMachineTokenSync()` prebere strojni ID naprave prek `node-machine-id`
   (ob napaki uporabi prazen niz, s čimer onemogoči overjanje CLI).
2. Izračuna `HMAC-SHA256(machine_id, salt)` in vrne celoten 64-mestni
   šestnajstiški izvleček — determinističen, nepovraten žeton, vezan na to napravo.
3. CLI pošlje žeton kot `x-omniroute-cli-token` samo, kadar je razrešeni cilj
   izrecni povratnozančni URL (`localhost`, `127.0.0.0/8` ali povratnozančni
   IPv6). Zahteve, ki vsebujejo žeton, uporabljajo `redirect: error`, zato ga
   lokalna preusmeritev ne more posredovati drugemu izvoru. Oddaljeni konteksti
   namesto tega uporabljajo žetone za dostop z omejenim obsegom. Če izpeljava ni
   na voljo, CLI izpusti glavo, `omniroute doctor` pa sporoči napako, namesto da
   bi prazen žeton obravnaval kot veljaven.
4. Strežnik (`src/server/authz/policies/management.ts`) z isto soljo znova
   izračuna pričakovani žeton in ga primerja z uporabo `timingSafeEqual`, da
   prepreči pridobivanje na podlagi časovnih razlik.

## Varnostne lastnosti

| Lastnost                          | Podrobnosti                                                                                                                                                                                                                          |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Samo povratna zanka**           | Sprejeto samo, kadar strežnikov zaupanja vreden zaznamek lokalnosti vrstnika (izpeljan iz dejanskega naslova vrstnika TCP) kaže povratno zanko. Glavi `Host`, ki jo nadzoruje odjemalec, se za določanje lokalnosti nikoli ne zaupa. |
| **Primerjava v konstantnem času** | `crypto.timingSafeEqual` preprečuje časovne napade.                                                                                                                                                                                  |
| **Nepovratno**                    | Iz izhoda HMAC ni mogoče pridobiti ID-ja naprave.                                                                                                                                                                                    |
| **Brez obhoda zaščite `always`**  | `isAlwaysProtectedPath()` se ovrednoti pred preverjanjem žetona CLI. `/api/shutdown` in `/api/settings/database` vedno zahtevata JWT.                                                                                                |
| **Ni mogoče izvoziti**            | Žeton se nikoli ne zapiše na disk ali v dnevnike.                                                                                                                                                                                    |

## Privzeta sol (naključna za vsako namestitev)

Kadar `OMNIROUTE_CLI_SALT` ni nastavljen, je sol naključni 64-mestni
šestnajstiški niz, ustvarjen enkrat in trajno shranjen v
`<DATA_DIR>/cli-token-salt.json` (način `0600`) — in ne v repozitorij vključeni
literal `omniroute-cli-auth-v1`. Tako `getActiveSalt()` v
`src/lib/machineToken.ts` kot njegova zrcalna implementacija v
`bin/cli/utils/cliToken.mjs` bereta isto datoteko, zato strežnik in vsak klic CLI
v tej namestitvi uporabljata isto vrednost; v repozitorij vključeni literal se
uporabi le kot skrajna rezerva, kadar še ni mogoče določiti trajno shranjene soli
ali soli iz okolja (na primer pri sveži namestitvi samo za CLI, preden je bil
strežnik sploh kdaj zagnan). S tem je odpravljena šibkost stare privzete fiksne
literalne vrednosti: `/etc/machine-id` je pogosto berljiv vsem uporabnikom, zato
bi lahko sicer kateri koli lokalni uporabnik izpeljal isti žeton za vsako
namestitev, v kateri `OMNIROUTE_CLI_SALT` ni bil nikoli nastavljen.

## Rotacija soli

Nastavite `OMNIROUTE_CLI_SALT`, da spremenite izpeljani žeton brez sprememb kode — ta
ima vedno prednost pred shranjeno soljo posamezne namestitve. Po rotaciji bodo vsi procesi
CLI v tem računalniku samodejno uporabljali novi žeton. To je uporabno po razkritju seznama
procesov, ki je morda razkril prejšnjo izpeljano vrednost.

```bash
# Trajna rotacija (dodajte v profil lupine)
export OMNIROUTE_CLI_SALT="my-secret-salt-2026"

# Preverite, ali se uporablja novi žeton
omniroute status
```

## Podedovana oblika (SHA-256, 32 znakov) — še vedno sprejeta

Pred zgornjo obliko HMAC je CLI svoj žeton izpeljal kot
`SHA-256(machineId + salt).hex[0..32]` (32-znakovna predpona) v
`bin/cli/utils/cliToken.mjs` (`getLegacyCliTokenSync` v `src/lib/machineToken.ts`).

Zaradi združljivosti za nazaj strežnik sprejema **obe** obliki: preverjevalnik ustvari
`expectedTokens = [getMachineTokenSync(), getLegacyCliTokenSync()]` in primerja
prejeto glavo z vsako vrednostjo s funkcijo `timingSafeEqual`
(`src/server/authz/policies/management.ts` in `src/lib/middleware/cliTokenAuth.ts`).
Žeton je torej veljaven, če se ujema **bodisi** s 64-znakovnim izvlečkom HMAC bodisi z
32-znakovno podedovano predpono SHA-256.

**Onemogočanje:** nastavite `OMNIROUTE_DISABLE_CLI_TOKEN=true` (v okolju ali datoteki `.env`),
da v celoti onemogočite mehanizem žetonov CLI; ves dostop nato zahteva izrecni ključ API.
To je priporočljivo na gostiteljih z več uporabniki, saj je `machine-id` vezan na napravo
(in ne na uporabnika), zato bi lahko drug uporabnik na istem gostitelju izračunal isti žeton.

## Datoteke

| Datoteka                                  | Namen                                                    |
| ----------------------------------------- | -------------------------------------------------------- |
| `src/lib/machineToken.ts`                 | Izpeljava žetona (`getMachineTokenSync`)                 |
| `bin/cli/utils/cliToken.mjs`              | Zrcalna izvedba iste izpeljave na strani CLI             |
| `<DATA_DIR>/cli-token-salt.json`          | Shranjena naključna sol posamezne namestitve             |
| `src/server/authz/headers.ts`             | Konstanta `CLI_TOKEN_HEADER`                             |
| `src/server/authz/policies/management.ts` | Preverjanje na strani strežnika                          |
| `src/server/authz/routeGuard.ts`          | Preverjanje gostitelja povratne zanke (`isLoopbackHost`) |

## Glejte tudi

- `docs/security/ROUTE_GUARD_TIERS.md` — ravni zaščite poti
- `docs/architecture/AUTHZ_GUIDE.md` — celoten postopek avtorizacije
