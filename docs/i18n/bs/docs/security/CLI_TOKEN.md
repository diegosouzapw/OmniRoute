# CLI Machine-ID Token (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CLI_TOKEN.md) · 🇪🇹 [am](../../../am/docs/security/CLI_TOKEN.md) · 🇸🇦 [ar](../../../ar/docs/security/CLI_TOKEN.md) · 🇦🇿 [az](../../../az/docs/security/CLI_TOKEN.md) · 🇧🇬 [bg](../../../bg/docs/security/CLI_TOKEN.md) · 🇧🇩 [bn](../../../bn/docs/security/CLI_TOKEN.md) · 🇨🇿 [cs](../../../cs/docs/security/CLI_TOKEN.md) · 🇩🇰 [da](../../../da/docs/security/CLI_TOKEN.md) · 🇩🇪 [de](../../../de/docs/security/CLI_TOKEN.md) · 🇬🇷 [el](../../../el/docs/security/CLI_TOKEN.md) · 🇪🇸 [es](../../../es/docs/security/CLI_TOKEN.md) · 🇪🇪 [et](../../../et/docs/security/CLI_TOKEN.md) · 🇮🇷 [fa](../../../fa/docs/security/CLI_TOKEN.md) · 🇫🇮 [fi](../../../fi/docs/security/CLI_TOKEN.md) · 🇫🇷 [fr](../../../fr/docs/security/CLI_TOKEN.md) · 🇮🇪 [ga](../../../ga/docs/security/CLI_TOKEN.md) · 🇮🇳 [gu](../../../gu/docs/security/CLI_TOKEN.md) · 🇳🇬 [ha](../../../ha/docs/security/CLI_TOKEN.md) · 🇮🇱 [he](../../../he/docs/security/CLI_TOKEN.md) · 🇮🇳 [hi](../../../hi/docs/security/CLI_TOKEN.md) · 🇭🇷 [hr](../../../hr/docs/security/CLI_TOKEN.md) · 🇭🇺 [hu](../../../hu/docs/security/CLI_TOKEN.md) · 🇦🇲 [hy](../../../hy/docs/security/CLI_TOKEN.md) · 🇮🇩 [id](../../../id/docs/security/CLI_TOKEN.md) · 🇳🇬 [ig](../../../ig/docs/security/CLI_TOKEN.md) · 🇮🇹 [it](../../../it/docs/security/CLI_TOKEN.md) · 🇯🇵 [ja](../../../ja/docs/security/CLI_TOKEN.md) · 🇬🇪 [ka](../../../ka/docs/security/CLI_TOKEN.md) · 🇰🇭 [km](../../../km/docs/security/CLI_TOKEN.md) · 🇮🇳 [kn](../../../kn/docs/security/CLI_TOKEN.md) · 🇰🇷 [ko](../../../ko/docs/security/CLI_TOKEN.md) · 🇱🇹 [lt](../../../lt/docs/security/CLI_TOKEN.md) · 🇱🇻 [lv](../../../lv/docs/security/CLI_TOKEN.md) · 🇮🇳 [ml](../../../ml/docs/security/CLI_TOKEN.md) · 🇮🇳 [mr](../../../mr/docs/security/CLI_TOKEN.md) · 🇲🇾 [ms](../../../ms/docs/security/CLI_TOKEN.md) · 🇲🇹 [mt](../../../mt/docs/security/CLI_TOKEN.md) · 🇲🇲 [my](../../../my/docs/security/CLI_TOKEN.md) · 🇳🇵 [ne](../../../ne/docs/security/CLI_TOKEN.md) · 🇳🇱 [nl](../../../nl/docs/security/CLI_TOKEN.md) · 🇳🇴 [no](../../../no/docs/security/CLI_TOKEN.md) · 🇮🇳 [or](../../../or/docs/security/CLI_TOKEN.md) · 🇮🇳 [pa](../../../pa/docs/security/CLI_TOKEN.md) · 🇵🇭 [phi](../../../phi/docs/security/CLI_TOKEN.md) · 🇵🇱 [pl](../../../pl/docs/security/CLI_TOKEN.md) · 🇵🇹 [pt](../../../pt/docs/security/CLI_TOKEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CLI_TOKEN.md) · 🇷🇴 [ro](../../../ro/docs/security/CLI_TOKEN.md) · 🇷🇺 [ru](../../../ru/docs/security/CLI_TOKEN.md) · 🇱🇰 [si](../../../si/docs/security/CLI_TOKEN.md) · 🇸🇰 [sk](../../../sk/docs/security/CLI_TOKEN.md) · 🇸🇮 [sl](../../../sl/docs/security/CLI_TOKEN.md) · 🇷🇸 [sr](../../../sr/docs/security/CLI_TOKEN.md) · 🇸🇪 [sv](../../../sv/docs/security/CLI_TOKEN.md) · 🇰🇪 [sw](../../../sw/docs/security/CLI_TOKEN.md) · 🇮🇳 [ta](../../../ta/docs/security/CLI_TOKEN.md) · 🇮🇳 [te](../../../te/docs/security/CLI_TOKEN.md) · 🇹🇭 [th](../../../th/docs/security/CLI_TOKEN.md) · 🇹🇷 [tr](../../../tr/docs/security/CLI_TOKEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CLI_TOKEN.md) · 🇵🇰 [ur](../../../ur/docs/security/CLI_TOKEN.md) · 🇺🇿 [uz](../../../uz/docs/security/CLI_TOKEN.md) · 🇻🇳 [vi](../../../vi/docs/security/CLI_TOKEN.md) · 🇳🇬 [yo](../../../yo/docs/security/CLI_TOKEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CLI_TOKEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CLI_TOKEN.md)

---

## Pregled

OmniRoute CLI komande autentificiraju se prema lokalnom API-ju za upravljanje pomoću
`HMAC-SHA256(machine-id, salt)` tokena poslanog putem zaglavlja zahtjeva
`x-omniroute-cli-token`.

Ovo omogućava CLI potkomandama (`omniroute status`, `omniroute providers` itd.)
da pozivaju krajnje tačke za upravljanje bez potrebe da korisnik pri svakom
pozivu navodi JWT ili lozinku.

## Kako funkcioniše

1. `getMachineTokenSync()` čita hardverski ID uređaja putem paketa `node-machine-id`
   (u slučaju neuspjeha koristi prazan niz, čime se onemogućava CLI autentifikacija).
2. Izračunava `HMAC-SHA256(machine_id, salt)` i vraća puni heksadecimalni sažetak
   od 64 znaka — deterministički, nepovratni token vezan za ovaj uređaj.
3. CLI šalje token kao `x-omniroute-cli-token` samo kada je razrijeđeno
   odredište eksplicitni loopback URL (`localhost`, `127.0.0.0/8` ili
   loopback IPv6). Zahtjevi koji sadrže token koriste `redirect: error`, tako da ga
   lokalno preusmjeravanje ne može proslijediti drugom izvoru. Udaljeni konteksti
   umjesto toga koriste pristupne tokene ograničenog opsega. Ako izvođenje tokena
   nije dostupno, CLI izostavlja zaglavlje, a `omniroute doctor` prijavljuje
   neuspjeh umjesto da prazan token smatra važećim.
4. Server (`src/server/authz/policies/management.ts`) ponovo izračunava
   očekivani token koristeći istu vrijednost soli i poredi ga pomoću
   `timingSafeEqual` kako bi spriječio izdvajanje zasnovano na vremenu izvršavanja.

## Sigurnosna svojstva

| Svojstvo                               | Detalj                                                                                                                                                                                                                                                   |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Samo loopback**                      | Prihvata se samo kada serverova pouzdana oznaka lokalnosti ravnopravnog čvora (izvedena iz stvarne TCP adrese ravnopravnog čvora) ukazuje na loopback. Klijentski kontrolirano zaglavlje `Host` nikada se ne smatra pouzdanim za određivanje lokalnosti. |
| **Poređenje u konstantnom vremenu**    | `crypto.timingSafeEqual` sprječava napade zasnovane na vremenu izvršavanja.                                                                                                                                                                              |
| **Nepovratno**                         | Izlaz HMAC-a ne omogućava vraćanje machine-id-a.                                                                                                                                                                                                         |
| **Nema zaobilaženja zaštite `always`** | `isAlwaysProtectedPath()` se izvršava prije provjere CLI tokena. `/api/shutdown` i `/api/settings/database` uvijek zahtijevaju JWT.                                                                                                                      |
| **Nije moguće izvesti**                | Token se nikada ne zapisuje na disk niti evidentira u zapisnicima.                                                                                                                                                                                       |

## Zadana vrijednost soli (nasumična za svaku instalaciju)

Kada `OMNIROUTE_CLI_SALT` nije postavljen, vrijednost soli je nasumični
heksadecimalni niz od 64 znaka koji se generira jednom i trajno pohranjuje u
`<DATA_DIR>/cli-token-salt.json` (način rada `0600`) — a ne doslovna vrijednost
`omniroute-cli-auth-v1` uključena u repozitorij. I `getActiveSalt()` u
`src/lib/machineToken.ts` i njegova odgovarajuća implementacija u
`bin/cli/utils/cliToken.mjs` čitaju istu datoteku, tako da server i svako
pokretanje CLI-ja u ovoj instalaciji koriste istu vrijednost; doslovna vrijednost
uključena u repozitorij koristi se samo kao krajnja rezervna opcija kada još nije
moguće uspostaviti trajno pohranjenu vrijednost soli ili onu iz okruženja
(na primjer, kod nove instalacije samo s CLI-jem prije prvog pokretanja servera).
Ovo otklanja slabost stare fiksne zadane doslovne vrijednosti: `/etc/machine-id`
je obično čitljiv svim korisnicima, pa bi u suprotnom svaki lokalni korisnik mogao
izvesti isti token za svaku instalaciju u kojoj `OMNIROUTE_CLI_SALT` nikada nije
postavljen.

## Rotacija salta

Postavite `OMNIROUTE_CLI_SALT` kako biste rotirali izvedeni token bez izmjena koda — on
uvijek ima prednost nad sačuvanim saltom za pojedinačnu instalaciju. Nakon rotacije, svi CLI
procesi na ovom računaru automatski će koristiti novi token. Korisno nakon curenja liste
procesa koje je možda otkrilo prethodnu izvedenu vrijednost.

```bash
# Trajna rotacija (dodajte u profil ljuske)
export OMNIROUTE_CLI_SALT="my-secret-salt-2026"

# Provjerite koristi li se novi token
omniroute status
```

## Naslijeđeni format (SHA-256, 32 znaka) — i dalje je prihvaćen

Prije prethodno navedenog HMAC formata, CLI je izvodio svoj token kao
`SHA-256(machineId + salt).hex[0..32]` (prefiks od 32 znaka) u
`bin/cli/utils/cliToken.mjs` (`getLegacyCliTokenSync` u `src/lib/machineToken.ts`).

Radi kompatibilnosti unazad, server prihvata **oba** formata: verifikator formira
`expectedTokens = [getMachineTokenSync(), getLegacyCliTokenSync()]` i poredi
dolazno zaglavlje sa svakim od njih pomoću `timingSafeEqual`
(`src/server/authz/policies/management.ts` i `src/lib/middleware/cliTokenAuth.ts`).
Prema tome, token je važeći ako se podudara s **bilo kojim** od njih: HMAC sažetkom od 64 znaka
ili naslijeđenim SHA-256 prefiksom od 32 znaka.

**Isključivanje:** postavite `OMNIROUTE_DISABLE_CLI_TOKEN=true` (u okruženju ili `.env` datoteci)
kako biste potpuno onemogućili mehanizam CLI tokena; tada je za svaki pristup potreban
eksplicitan API ključ. Ovo se preporučuje na računarima s više korisnika jer je `machine-id`
vezan za uređaj (ne za korisnika), pa bi drugi korisnik na istom računaru mogao izračunati
isti token.

## Datoteke

| Datoteka                                  | Namjena                                     |
| ----------------------------------------- | ------------------------------------------- |
| `src/lib/machineToken.ts`                 | Izvođenje tokena (`getMachineTokenSync`)    |
| `bin/cli/utils/cliToken.mjs`              | CLI kopija istog postupka izvođenja         |
| `<DATA_DIR>/cli-token-salt.json`          | Sačuvani nasumični salt po instalaciji      |
| `src/server/authz/headers.ts`             | Konstanta `CLI_TOKEN_HEADER`                |
| `src/server/authz/policies/management.ts` | Verifikacija na strani servera              |
| `src/server/authz/routeGuard.ts`          | Provjera povratnog hosta (`isLoopbackHost`) |

## Pogledajte i

- `docs/security/ROUTE_GUARD_TIERS.md` — nivoi zaštite ruta
- `docs/architecture/AUTHZ_GUIDE.md` — cjelokupan tok autorizacije
