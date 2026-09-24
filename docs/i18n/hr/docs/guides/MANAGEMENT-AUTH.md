# Management Authentication (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute ima **četiri obitelji vjerodajnica** koje mogu autorizirati rute upravljanja.
Nisu međusobno zamjenjive. API ključevi za inferenciju (`sk-…`) **ne** upravljaju
poslužiteljem osim ako im nije eksplicitno dodijeljen `manage` ili `admin` opseg.

Kanonska implementacija: `src/lib/api/requireManagementAuth.ts`.

| Vjerodajnica              | Tipičan oblik                          | Stvoreno gdje                                           | Namjena                           | Mogućnost upravljanja                                                                                |
| :------------------------ | :------------------------------------- | :------------------------------------------------------ | :-------------------------------- | :--------------------------------------------------------------------------------------------------- |
| JWT sesija nadzorne ploče | `auth_token` kolačić                   | Prijava na nadzornu ploču                               | Korisničko sučelje preglednika    | Potpuno upravljanje nadzornom pločom, podložno CSRF-u, lokalitetu i pravilima uvijek zaštićenih ruta |
| CLI token ID-a stroja     | interni / lokalni                      | CLI pokretanje (`omniroute` na istom stroju)            | Lokalni CLI                       | Samo lokalno upravljanje                                                                             |
| Opsežni pristupni token   | `oma_live_…`                           | **Postavke → Pristupni tokeni** ili `omniroute connect` | Udaljeni CLI i API za upravljanje | Mora zadovoljiti zahtijevani `read`, `write` ili `admin` opseg rute                                  |
| API ključ za inferenciju  | `sk-…` (i drugi prefiksi API ključeva) | **API upravitelj / API ključevi**                       | `/v1/*` inferencija               | **Nijedno** osim ako metapodaci ključa ne uključuju `manage` ili `admin`                             |

`oma_` vjerodajnice su vjerodajnice za upravljanje/CLI. One **nisu** API ključevi za inferenciju.

Ako je prijava/autentifikacija API ključem onemogućena za poslužitelj, neke rute upravljanja mogu
prihvatiti neautentificirane pozive. Rute samo za lokalno i uvijek zaštićene rute i dalje primjenjuju
vlastita pravila. Predstavljanje jedne od ovih vjerodajnica stoga nije univerzalno
obvezno, a posjedovanje jedne nije univerzalno dovoljno bez potrebnog
opsega i lokaliteta rute.

Povezano: [Udaljeni način rada](./REMOTE-MODE.md) (kako se `oma_live_…` izdaje za udaljeni CLI).

---

## Matrice opsega

Opsezi upravljanja API ključevima i opsezi pristupnih tokena su različiti vokabulari.
Opsezi MCP alata su treći vokabular, provjereni s `scopeMatches` umjesto
bilo koje funkcije u donjim tablicama. Usporedno:
[Tri imenska prostora opsega](../frameworks/MCP-SERVER.md#three-scope-namespaces).

### Opsezi pristupnog tokena (`oma_live_…`)

| Opseg   | Tipične operacije                                                                            |
| :------ | :------------------------------------------------------------------------------------------- |
| `read`  | GET zahtjevi za popis/status koje token smije vidjeti                                        |
| `write` | Mutacije (stvaranje/ažuriranje/brisanje) ispod administratora                                |
| `admin` | Potpuni udaljeni CLI / token za povezivanje (ovdje su zadane postavke za pokretanje lozinke) |

Token s `read` ne može pozvati `write` rutu. Oblik poruke tijekom izvođenja:
`Opseg pristupnog tokena '<have>' je nedovoljan; '<need>' je potreban.`

### Opsezi upravljanja API ključevima

| Opseg     | Značenje                                                                          |
| :-------- | :-------------------------------------------------------------------------------- |
| (nijedan) | Samo inferencija. Rute upravljanja vraćaju 403.                                   |
| `manage`  | API za upravljanje (ista provjera kao i `requireManagementAuth` grana API ključa) |
| `admin`   | Također zadovoljava `hasManageScope` (tretira se kao sposoban za upravljanje)     |

Omogućite `manage` na ključu u korisničkom sučelju API ključevi / API upravitelj. Nemojte ponovno koristiti
ključ klijenta za chat za automatizaciju osim ako niste namjerno dodijelili taj opseg.

---

## Kako stvoriti i opozvati

### JWT sesija nadzorne ploče

1.  Otvorite `/login`, prijavite se s administratorskom lozinkom (`INITIAL_PASSWORD` pri prvom pokretanju).
2.  Kolačić `auth_token` je HttpOnly. Nadzorna ploča preglednika ga automatski koristi.
3.  Odjavite se putem `/api/auth/logout`. Ne postoji dugotrajna tajna za kopiranje.

### CLI machine-id token

1.  Pokrenite `omniroute` na **istom hostu** kao i poslužitelj (loopback).
2.  CLI pokreće machine-id token pod `~/.omniroute/` (chmod 600).
3.  Ovo **ne** radi s drugog stroja. Koristite pristupni token (Access Token) za udaljeni CLI.

### Scoped Access Token (`oma_live_…`)

1.  Nadzorna ploča: **Postavke → Pristupni tokeni** → stvori (ime + opseg). **Tajna se prikazuje samo jednom.**
2.  Ili CLI: `omniroute connect <host>` (lozinka → token). Pogledajte [Udaljeni način rada](./REMOTE-MODE.md).
3.  Zaglavlje: `Authorization: Bearer oma_live_…`
4.  Opozovite s iste stranice Pristupnih tokena (ili izbrišite CLI kontekst).
5.  Poslužitelj pohranjuje samo hash. Postupajte s običnim tekstom kao s lozinkom.

### API ključ s opsegom upravljanja (manage-scoped)

1.  Nadzorna ploča: **Upravitelj API-ja / API ključevi** → stvori ili uredi ključ → omogući `manage` (ili `admin`).
2.  Zaglavlje: `Authorization: Bearer sk-…` (stvarni prefiks ključa).
3.  Opozovite ili uklonite `manage` u istom korisničkom sučelju.
4.  Najmanja privilegija za automatizaciju koja nije CLI: preferirajte `read` pristupni token za poslove samo za čitanje (GET-only); koristite `manage` na API ključu samo kada pozivatelj mora komunicirati i s `/v1` i s upravljanjem.

---

## Format zaglavlja

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

Ne stavljajte administratorske vjerodajnice u URL putanju ili niz upita. Autentifikacija za upravljanje je samo putem zaglavlja/kolačića.

---

## Primjeri za kopiranje i lijepljenje

Samo za čitanje (popis pružatelja). Koristite `read` pristupni token:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

Izmjena (stvaranje veze pružatelja). Koristite `write`/`admin` pristupni token ili API ključ s opsegom upravljanja:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

Zaključivanje (nije upravljanje). Običan API ključ, nije potreban `manage`:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## Trenutne pogreške tijekom izvođenja (ne ispisujte tajne)

| Situacija                                     | Tipičan status | Poruka (sanitizirana)                                                |
| :-------------------------------------------- | :------------- | :------------------------------------------------------------------- |
| Nema vjerodajnice                             | 401            | `Authentication required`                                            |
| Nevažeći/istekli `oma_live_…`                 | 401            | `Invalid or expired access token`                                    |
| Važeći API ključ bez `manage`/`admin`         | 403            | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| Nevažeći obični API ključ na ruti upravljanja | 403            | `Invalid management token`                                           |
| Opseg pristupnog tokena prenizak              | 403            | `Access token scope '<have>' is insufficient; '<need>' required.`    |

"Invalid management token" znači da nositelj **nije** prihvaćen kao vjerodajnica za upravljanje. To **ne** govori koju obitelj tokena trebate generirati. Koristite gornju tablicu: ključevi za zaključivanje trebaju `manage` opseg; udaljeni CLI treba `oma_live_…`; nadzorna ploča koristi kolačić sesije.

## Preporučeni izbor s najmanjim privilegijama

| Pozivatelj                                                            | Upotreba                                          |
| :-------------------------------------------------------------------- | :------------------------------------------------ |
| Preglednik                                                            | Sesija nadzorne ploče                             |
| CLI na poslužiteljskom hostu                                          | Strojni token                                     |
| CLI na prijenosnom računalu koji komunicira s udaljenim poslužiteljem | `oma_live_…` iz `omniroute connect`               |
| CI / skripte (samo za upravljanje)                                    | `oma_live_…` s najmanjim opsegom koji funkcionira |
| CI koji mora pozivati i `/v1` i `/api`                                | API ključ s `manage` **ili** dvije vjerodajnice   |
