# CLI Machine-ID Token (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CLI_TOKEN.md) · 🇪🇹 [am](../../../am/docs/security/CLI_TOKEN.md) · 🇸🇦 [ar](../../../ar/docs/security/CLI_TOKEN.md) · 🇦🇿 [az](../../../az/docs/security/CLI_TOKEN.md) · 🇧🇬 [bg](../../../bg/docs/security/CLI_TOKEN.md) · 🇧🇩 [bn](../../../bn/docs/security/CLI_TOKEN.md) · 🇧🇦 [bs](../../../bs/docs/security/CLI_TOKEN.md) · 🇨🇿 [cs](../../../cs/docs/security/CLI_TOKEN.md) · 🇩🇰 [da](../../../da/docs/security/CLI_TOKEN.md) · 🇩🇪 [de](../../../de/docs/security/CLI_TOKEN.md) · 🇬🇷 [el](../../../el/docs/security/CLI_TOKEN.md) · 🇪🇸 [es](../../../es/docs/security/CLI_TOKEN.md) · 🇪🇪 [et](../../../et/docs/security/CLI_TOKEN.md) · 🇮🇷 [fa](../../../fa/docs/security/CLI_TOKEN.md) · 🇫🇮 [fi](../../../fi/docs/security/CLI_TOKEN.md) · 🇫🇷 [fr](../../../fr/docs/security/CLI_TOKEN.md) · 🇮🇪 [ga](../../../ga/docs/security/CLI_TOKEN.md) · 🇮🇳 [gu](../../../gu/docs/security/CLI_TOKEN.md) · 🇳🇬 [ha](../../../ha/docs/security/CLI_TOKEN.md) · 🇮🇱 [he](../../../he/docs/security/CLI_TOKEN.md) · 🇮🇳 [hi](../../../hi/docs/security/CLI_TOKEN.md) · 🇭🇺 [hu](../../../hu/docs/security/CLI_TOKEN.md) · 🇦🇲 [hy](../../../hy/docs/security/CLI_TOKEN.md) · 🇮🇩 [id](../../../id/docs/security/CLI_TOKEN.md) · 🇳🇬 [ig](../../../ig/docs/security/CLI_TOKEN.md) · 🇮🇹 [it](../../../it/docs/security/CLI_TOKEN.md) · 🇯🇵 [ja](../../../ja/docs/security/CLI_TOKEN.md) · 🇬🇪 [ka](../../../ka/docs/security/CLI_TOKEN.md) · 🇰🇭 [km](../../../km/docs/security/CLI_TOKEN.md) · 🇮🇳 [kn](../../../kn/docs/security/CLI_TOKEN.md) · 🇰🇷 [ko](../../../ko/docs/security/CLI_TOKEN.md) · 🇱🇹 [lt](../../../lt/docs/security/CLI_TOKEN.md) · 🇱🇻 [lv](../../../lv/docs/security/CLI_TOKEN.md) · 🇮🇳 [ml](../../../ml/docs/security/CLI_TOKEN.md) · 🇮🇳 [mr](../../../mr/docs/security/CLI_TOKEN.md) · 🇲🇾 [ms](../../../ms/docs/security/CLI_TOKEN.md) · 🇲🇹 [mt](../../../mt/docs/security/CLI_TOKEN.md) · 🇲🇲 [my](../../../my/docs/security/CLI_TOKEN.md) · 🇳🇵 [ne](../../../ne/docs/security/CLI_TOKEN.md) · 🇳🇱 [nl](../../../nl/docs/security/CLI_TOKEN.md) · 🇳🇴 [no](../../../no/docs/security/CLI_TOKEN.md) · 🇮🇳 [or](../../../or/docs/security/CLI_TOKEN.md) · 🇮🇳 [pa](../../../pa/docs/security/CLI_TOKEN.md) · 🇵🇭 [phi](../../../phi/docs/security/CLI_TOKEN.md) · 🇵🇱 [pl](../../../pl/docs/security/CLI_TOKEN.md) · 🇵🇹 [pt](../../../pt/docs/security/CLI_TOKEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CLI_TOKEN.md) · 🇷🇴 [ro](../../../ro/docs/security/CLI_TOKEN.md) · 🇷🇺 [ru](../../../ru/docs/security/CLI_TOKEN.md) · 🇱🇰 [si](../../../si/docs/security/CLI_TOKEN.md) · 🇸🇰 [sk](../../../sk/docs/security/CLI_TOKEN.md) · 🇸🇮 [sl](../../../sl/docs/security/CLI_TOKEN.md) · 🇷🇸 [sr](../../../sr/docs/security/CLI_TOKEN.md) · 🇸🇪 [sv](../../../sv/docs/security/CLI_TOKEN.md) · 🇰🇪 [sw](../../../sw/docs/security/CLI_TOKEN.md) · 🇮🇳 [ta](../../../ta/docs/security/CLI_TOKEN.md) · 🇮🇳 [te](../../../te/docs/security/CLI_TOKEN.md) · 🇹🇭 [th](../../../th/docs/security/CLI_TOKEN.md) · 🇹🇷 [tr](../../../tr/docs/security/CLI_TOKEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CLI_TOKEN.md) · 🇵🇰 [ur](../../../ur/docs/security/CLI_TOKEN.md) · 🇺🇿 [uz](../../../uz/docs/security/CLI_TOKEN.md) · 🇻🇳 [vi](../../../vi/docs/security/CLI_TOKEN.md) · 🇳🇬 [yo](../../../yo/docs/security/CLI_TOKEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CLI_TOKEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CLI_TOKEN.md)

---

## Pregled

Naredbe OmniRoute CLI-ja autentificiraju se na lokalnom API-ju za upravljanje s pomoću tokena
`HMAC-SHA256(machine-id, salt)` poslanog putem zaglavlja zahtjeva
`x-omniroute-cli-token`.

To omogućuje podnaredbama CLI-ja (`omniroute status`, `omniroute providers` itd.)
pozivanje krajnjih točaka za upravljanje bez potrebe da korisnik pri svakom pokretanju
navede JWT ili lozinku.

## Kako funkcionira

1. `getMachineTokenSync()` čita hardverski identifikator računala putem paketa `node-machine-id`
   (u slučaju neuspjeha vraća prazan niz, čime se onemogućuje autentifikacija CLI-ja).
2. Izračunava `HMAC-SHA256(machine_id, salt)` i vraća potpuni heksadecimalni sažetak od
   64 znaka — deterministički, nepovratni token povezan s ovim računalom.
3. CLI šalje token kao `x-omniroute-cli-token` samo kada je razriješeno odredište
   eksplicitni URL povratne petlje (`localhost`, `127.0.0.0/8` ili IPv6 adresa
   povratne petlje). Zahtjevi koji sadržavaju token upotrebljavaju `redirect: error`,
   tako da ga lokalno preusmjeravanje ne može proslijediti drugom izvorištu. Udaljeni
   konteksti umjesto toga upotrebljavaju pristupne tokene ograničenog opsega. Ako
   izvođenje tokena nije dostupno, CLI izostavlja zaglavlje, a `omniroute doctor`
   prijavljuje neuspjeh umjesto da prazan token smatra valjanim.
4. Poslužitelj (`src/server/authz/policies/management.ts`) ponovno izračunava
   očekivani token s istom soli i uspoređuje ga putem funkcije `timingSafeEqual`
   kako bi spriječio njegovo otkrivanje na temelju vremena izvođenja.

## Sigurnosna svojstva

| Svojstvo                               | Pojedinosti                                                                                                                                                                                                                                           |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Samo povratna petlja**               | Prihvaća se samo kada poslužiteljeva pouzdana oznaka lokalnosti ravnopravnog čvora (izvedena iz stvarne TCP adrese čvora) označava povratnu petlju. Klijentski kontrolirano zaglavlje `Host` nikada se ne smatra pouzdanim za određivanje lokalnosti. |
| **Usporedba u konstantnom vremenu**    | `crypto.timingSafeEqual` sprječava napade mjerenjem vremena.                                                                                                                                                                                          |
| **Nepovratno**                         | Iz HMAC izlaza nije moguće dobiti identifikator računala.                                                                                                                                                                                             |
| **Nema zaobilaženja zaštite `always`** | `isAlwaysProtectedPath()` procjenjuje se prije provjere tokena CLI-ja. `/api/shutdown` i `/api/settings/database` uvijek zahtijevaju JWT.                                                                                                             |
| **Ne može se izvesti**                 | Token se nikada ne zapisuje na disk niti u zapisnike.                                                                                                                                                                                                 |

## Zadana sol (nasumična za svaku instalaciju)

Kada `OMNIROUTE_CLI_SALT` nije postavljen, sol je nasumični heksadecimalni niz od
64 znaka koji se generira jednom i trajno sprema u `<DATA_DIR>/cli-token-salt.json`
(način rada `0600`) — nije riječ o vrijednosti `omniroute-cli-auth-v1` uključenoj
u repozitorij. I `getActiveSalt()` u `src/lib/machineToken.ts` i njegova zrcalna
implementacija u `bin/cli/utils/cliToken.mjs` čitaju istu datoteku, tako da poslužitelj
i svako pokretanje CLI-ja u ovoj instalaciji koriste istu vrijednost; literal uključen
u repozitorij upotrebljava se samo kao krajnja pričuvna vrijednost kada još nije moguće
uspostaviti trajno spremljenu sol ili sol iz varijable okruženja (primjerice u svježoj
instalaciji koja sadržava samo CLI, prije prvog pokretanja poslužitelja). Time se uklanja
slabost starog fiksnog zadanog literala: `/etc/machine-id` obično je dostupan za čitanje
svim korisnicima, pa bi svaki lokalni korisnik inače mogao izvesti isti token za svaku
instalaciju u kojoj `OMNIROUTE_CLI_SALT` nikada nije postavljen.

## Rotacija soli

Postavite `OMNIROUTE_CLI_SALT` kako biste rotirali izvedeni token bez promjena koda — ta
vrijednost uvijek ima prednost nad trajno spremljenom soli pojedinačne instalacije. Nakon rotacije svi CLI
procesi na ovom računalu automatski će upotrebljavati novi token. Korisno nakon
curenja popisa procesa koje je možda otkrilo prethodnu izvedenu vrijednost.

```bash
# Trajna rotacija (dodajte u profil ljuske)
export OMNIROUTE_CLI_SALT="my-secret-salt-2026"

# Provjerite upotrebljava li se novi token
omniroute status
```

## Naslijeđeni format (SHA-256, 32 znaka) — i dalje je prihvaćen

Prije prethodno opisanog HMAC formata CLI je izvodio svoj token kao
`SHA-256(machineId + salt).hex[0..32]` (prefiks od 32 znaka) u
`bin/cli/utils/cliToken.mjs` (`getLegacyCliTokenSync` u `src/lib/machineToken.ts`).

Radi kompatibilnosti sa starijim verzijama poslužitelj prihvaća **oba** formata: provjera izrađuje
`expectedTokens = [getMachineTokenSync(), getLegacyCliTokenSync()]` i uspoređuje
dolazno zaglavlje sa svakim od njih pomoću `timingSafeEqual`
(`src/server/authz/policies/management.ts` i `src/lib/middleware/cliTokenAuth.ts`).
Stoga je token valjan ako odgovara **ili** HMAC sažetku od 64 znaka ili naslijeđenom
SHA-256 prefiksu od 32 znaka.

**Isključivanje:** postavite `OMNIROUTE_DISABLE_CLI_TOKEN=true` (u okruženju ili datoteci `.env`) kako biste potpuno onemogućili CLI
mehanizam tokena; sav pristup tada zahtijeva izričit API ključ. To se preporučuje na računalima
s više korisnika jer je `machine-id` specifičan za uređaj (ne za korisnika), pa bi drugi
korisnik na istom računalu mogao izračunati isti token.

## Datoteke

| Datoteka                                  | Svrha                                                   |
| ----------------------------------------- | ------------------------------------------------------- |
| `src/lib/machineToken.ts`                 | Izvođenje tokena (`getMachineTokenSync`)                |
| `bin/cli/utils/cliToken.mjs`              | CLI preslika istog postupka izvođenja                   |
| `<DATA_DIR>/cli-token-salt.json`          | Trajno spremljena nasumična sol pojedinačne instalacije |
| `src/server/authz/headers.ts`             | Konstanta `CLI_TOKEN_HEADER`                            |
| `src/server/authz/policies/management.ts` | Provjera na strani poslužitelja                         |
| `src/server/authz/routeGuard.ts`          | Provjera lokalnog hosta (`isLoopbackHost`)              |

## Vidi također

- `docs/security/ROUTE_GUARD_TIERS.md` — razine zaštite ruta
- `docs/architecture/AUTHZ_GUIDE.md` — cjelovit proces autorizacije
