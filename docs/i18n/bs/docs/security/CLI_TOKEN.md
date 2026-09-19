# CLI_TOKEN (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CLI_TOKEN.md) · 🇪🇹 [am](../../../am/docs/security/CLI_TOKEN.md) · 🇸🇦 [ar](../../../ar/docs/security/CLI_TOKEN.md) · 🇦🇿 [az](../../../az/docs/security/CLI_TOKEN.md) · 🇧🇬 [bg](../../../bg/docs/security/CLI_TOKEN.md) · 🇧🇩 [bn](../../../bn/docs/security/CLI_TOKEN.md) · 🇨🇿 [cs](../../../cs/docs/security/CLI_TOKEN.md) · 🇩🇰 [da](../../../da/docs/security/CLI_TOKEN.md) · 🇩🇪 [de](../../../de/docs/security/CLI_TOKEN.md) · 🇬🇷 [el](../../../el/docs/security/CLI_TOKEN.md) · 🇪🇸 [es](../../../es/docs/security/CLI_TOKEN.md) · 🇪🇪 [et](../../../et/docs/security/CLI_TOKEN.md) · 🇮🇷 [fa](../../../fa/docs/security/CLI_TOKEN.md) · 🇫🇮 [fi](../../../fi/docs/security/CLI_TOKEN.md) · 🇫🇷 [fr](../../../fr/docs/security/CLI_TOKEN.md) · 🇮🇪 [ga](../../../ga/docs/security/CLI_TOKEN.md) · 🇮🇳 [gu](../../../gu/docs/security/CLI_TOKEN.md) · 🇳🇬 [ha](../../../ha/docs/security/CLI_TOKEN.md) · 🇮🇱 [he](../../../he/docs/security/CLI_TOKEN.md) · 🇮🇳 [hi](../../../hi/docs/security/CLI_TOKEN.md) · 🇭🇷 [hr](../../../hr/docs/security/CLI_TOKEN.md) · 🇭🇺 [hu](../../../hu/docs/security/CLI_TOKEN.md) · 🇦🇲 [hy](../../../hy/docs/security/CLI_TOKEN.md) · 🇮🇩 [id](../../../id/docs/security/CLI_TOKEN.md) · 🇳🇬 [ig](../../../ig/docs/security/CLI_TOKEN.md) · 🇮🇹 [it](../../../it/docs/security/CLI_TOKEN.md) · 🇯🇵 [ja](../../../ja/docs/security/CLI_TOKEN.md) · 🇬🇪 [ka](../../../ka/docs/security/CLI_TOKEN.md) · 🇰🇭 [km](../../../km/docs/security/CLI_TOKEN.md) · 🇮🇳 [kn](../../../kn/docs/security/CLI_TOKEN.md) · 🇰🇷 [ko](../../../ko/docs/security/CLI_TOKEN.md) · 🇱🇹 [lt](../../../lt/docs/security/CLI_TOKEN.md) · 🇱🇻 [lv](../../../lv/docs/security/CLI_TOKEN.md) · 🇮🇳 [ml](../../../ml/docs/security/CLI_TOKEN.md) · 🇮🇳 [mr](../../../mr/docs/security/CLI_TOKEN.md) · 🇲🇾 [ms](../../../ms/docs/security/CLI_TOKEN.md) · 🇲🇹 [mt](../../../mt/docs/security/CLI_TOKEN.md) · 🇲🇲 [my](../../../my/docs/security/CLI_TOKEN.md) · 🇳🇵 [ne](../../../ne/docs/security/CLI_TOKEN.md) · 🇳🇱 [nl](../../../nl/docs/security/CLI_TOKEN.md) · 🇳🇴 [no](../../../no/docs/security/CLI_TOKEN.md) · 🇮🇳 [or](../../../or/docs/security/CLI_TOKEN.md) · 🇮🇳 [pa](../../../pa/docs/security/CLI_TOKEN.md) · 🇵🇭 [phi](../../../phi/docs/security/CLI_TOKEN.md) · 🇵🇱 [pl](../../../pl/docs/security/CLI_TOKEN.md) · 🇵🇹 [pt](../../../pt/docs/security/CLI_TOKEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CLI_TOKEN.md) · 🇷🇴 [ro](../../../ro/docs/security/CLI_TOKEN.md) · 🇷🇺 [ru](../../../ru/docs/security/CLI_TOKEN.md) · 🇱🇰 [si](../../../si/docs/security/CLI_TOKEN.md) · 🇸🇰 [sk](../../../sk/docs/security/CLI_TOKEN.md) · 🇸🇮 [sl](../../../sl/docs/security/CLI_TOKEN.md) · 🇷🇸 [sr](../../../sr/docs/security/CLI_TOKEN.md) · 🇸🇪 [sv](../../../sv/docs/security/CLI_TOKEN.md) · 🇰🇪 [sw](../../../sw/docs/security/CLI_TOKEN.md) · 🇮🇳 [ta](../../../ta/docs/security/CLI_TOKEN.md) · 🇮🇳 [te](../../../te/docs/security/CLI_TOKEN.md) · 🇹🇭 [th](../../../th/docs/security/CLI_TOKEN.md) · 🇹🇷 [tr](../../../tr/docs/security/CLI_TOKEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CLI_TOKEN.md) · 🇵🇰 [ur](../../../ur/docs/security/CLI_TOKEN.md) · 🇺🇿 [uz](../../../uz/docs/security/CLI_TOKEN.md) · 🇻🇳 [vi](../../../vi/docs/security/CLI_TOKEN.md) · 🇳🇬 [yo](../../../yo/docs/security/CLI_TOKEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CLI_TOKEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CLI_TOKEN.md)

---

# CLI Machine-ID token

## Pregled

OmniRoute CLI komande se autentifikuju prema lokalnom upravljačkom API-ju koristeći `HMAC-SHA256(machine-id, salt)` token poslat putem `x-omniroute-cli-token` zaglavlja zahtjeva.

Ovo omogućava CLI podkomandama (`omniroute status`, `omniroute providers`, itd.) da pozivaju upravljačke krajnje tačke bez potrebe da korisnik unosi JWT ili lozinku pri svakom pozivu.

## Kako to radi

1. `getMachineTokenSync()` čita hardverski machine ID putem `node-machine-id` (vraća prazan string u slučaju neuspjeha, čime se onemogućava CLI autentifikacija).
2. Izračunava `HMAC-SHA256(machine_id, salt)` i vraća puni 64-karakterni heksadecimalni sažetak — deterministički, nepovratni token vezan za ovu mašinu.
3. CLI šalje token kao `x-omniroute-cli-token` samo kada je razriješeno odredište eksplicitni loopback URL (`localhost`, `127.0.0.0/8` ili loopback IPv6). Zahtjevi koji nose token koriste `redirect: error`, tako da lokalno preusmjeravanje ne može proslijediti token na drugo porijeklo. Udaljeni konteksti umjesto toga koriste pristupne tokene sa ograničenim opsegom. Ako izvođenje nije dostupno, CLI izostavlja zaglavlje, a `omniroute doctor` prijavljuje grešku umjesto da tretira prazan token kao validan.
4. Server (`src/server/authz/policies/management.ts`) ponovo izračunava očekivani token sa istim salt-om i upoređuje ga putem `timingSafeEqual` kako bi spriječio ekstrakciju zasnovanu na vremenu.

## Sigurnosna svojstva

| Svojstvo                                 | Detalj                                                                                                                                                                                                      |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Samo loopback**                        | Prihvaćeno samo kada oznaka pouzdane peer-lokalnosti servera (izvedena iz stvarne TCP peer adrese) ukazuje na loopback. `Host` zaglavlje pod kontrolom klijenta se nikada ne smatra pouzdanim za lokalnost. |
| **Poređenje u konstantnom vremenu**      | `crypto.timingSafeEqual` sprječava napade zasnovane na vremenu.                                                                                                                                             |
| **Nepovratno**                           | HMAC izlaz ne može povratiti machine-id.                                                                                                                                                                    |
| **Nema zaobilaženja `always`-protected** | `isAlwaysProtectedPath()` se procjenjuje prije provjere CLI tokena. `/api/shutdown` i `/api/settings/database` uvijek zahtijevaju JWT.                                                                      |
| **Neizvozivo**                           | Token se nikada ne zapisuje na disk niti loguje.                                                                                                                                                            |

## Zadani salt (nasumičan po instalaciji)

Kada `OMNIROUTE_CLI_SALT` nije postavljen, salt je nasumični 64-karakterni heksadecimalni string generisan jednom i sačuvan na `<DATA_DIR>/cli-token-salt.json` (režim `0600`) — a ne hardkodirani literal `omniroute-cli-auth-v1`. I `getActiveSalt()` u `src/lib/machineToken.ts` i njegov ekvivalent u `bin/cli/utils/cliToken.mjs` čitaju isti fajl, tako da server i svaka CLI invokacija na ovoj instalaciji konvergiraju na istu vrijednost; hardkodirani literal se koristi samo kao krajnja mjera kada se još ne može uspostaviti sačuvani ili env salt (na primjer, svježa CLI-only instalacija prije nego što je server ikada pokrenut). Ovo otklanja slabost starog fiksnog zadanog literala: `/etc/machine-id` je obično čitljiv za sve korisnike, pa bi svaki lokalni korisnik inače mogao izvesti isti token za svaku instalaciju koja nikada nije postavila `OMNIROUTE_CLI_SALT`.

## Rotacija soli

Postavite `OMNIROUTE_CLI_SALT` za rotaciju izvedenog tokena bez izmjena koda — on uvijek ima prioritet nad sačuvanom soli po instalaciji. Nakon rotacije, svi CLI procesi na ovoj mašini će automatski koristiti novi token. Korisno nakon curenja liste procesa koje je možda otkrilo prethodnu izvedenu vrijednost.

```bash
# Trajna rotacija (dodajte u shell profil)
export OMNIROUTE_CLI_SALT="my-secret-salt-2026"

# Provjerite da li se koristi novi token
omniroute status
```

## Naslijeđeni format (SHA-256, 32-znakovni) — i dalje prihvaćen

Prije HMAC formata iznad, CLI je izvodio svoj token kao `SHA-256(machineId + salt).hex[0..32]` (prefiks od 32 znaka) u `bin/cli/utils/cliToken.mjs` (`getLegacyCliTokenSync` u `src/lib/machineToken.ts`).

Radi kompatibilnosti unazad, server prihvata **oba** formata: verifikator gradi `expectedTokens = [getMachineTokenSync(), getLegacyCliTokenSync()]` i poredi dolazno zaglavlje sa svakim koristeći `timingSafeEqual` (`src/server/authz/policies/management.ts` i `src/lib/middleware/cliTokenAuth.ts`). Dakle, token je validan ako se podudara **ili** sa 64-znakovnim HMAC sažetkom **ili** sa 32-znakovnim naslijeđenim SHA-256 prefiksom.

**Isključivanje:** postavite `OMNIROUTE_DISABLE_CLI_TOKEN=true` (env ili `.env`) da potpuno onemogućite mehanizam CLI tokena; sav pristup tada zahtijeva eksplicitni API ključ. Na hostovima sa više korisnika ovo se preporučuje, jer je `machine-id` po uređaju (ne po korisniku), pa bi drugi korisnik na istom hostu mogao izračunati isti token.

## Datoteke

| Datoteka                                  | Namjena                                    |
| ----------------------------------------- | ------------------------------------------ |
| `src/lib/machineToken.ts`                 | Izvođenje tokena (`getMachineTokenSync`)   |
| `bin/cli/utils/cliToken.mjs`              | CLI-strana kopija istog izvođenja          |
| `<DATA_DIR>/cli-token-salt.json`          | Sačuvana nasumična sol po instalaciji      |
| `src/server/authz/headers.ts`             | `CLI_TOKEN_HEADER` konstanta               |
| `src/server/authz/policies/management.ts` | Verifikacija na strani servera             |
| `src/server/authz/routeGuard.ts`          | Provjera loopback hosta (`isLoopbackHost`) |

## Vidi također

- `docs/security/ROUTE_GUARD_TIERS.md` — nivoi zaštite ruta
- `docs/architecture/AUTHZ_GUIDE.md` — kompletan proces autorizacije
