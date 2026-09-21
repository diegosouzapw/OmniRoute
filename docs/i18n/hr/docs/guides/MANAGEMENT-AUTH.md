# Management Authentication (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute ima **četiri vrste vjerodajnica** koje mogu autorizirati upravljačke rute.
Nisu međusobno zamjenjive. API ključevi za inferenciju (`sk-…`) **ne** upravljaju
poslužiteljem osim ako im je izričito dodijeljen opseg `manage` ili `admin`.

Kanonska implementacija: `src/lib/api/requireManagementAuth.ts`.

| Vjerodajnica              | Uobičajeni oblik                       | Gdje se stvara                                          | Namjena                           | Mogućnosti upravljanja                                                                                  |
| ------------------------- | -------------------------------------- | ------------------------------------------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------- |
| JWT sesija nadzorne ploče | kolačić `auth_token`                   | Prijava na nadzornu ploču                               | Korisničko sučelje preglednika    | Potpuno upravljanje putem nadzorne ploče, podložno pravilima za CSRF, lokalnost i uvijek zaštićene rute |
| CLI token ID-a računala   | interno / lokalno                      | Pokretanje CLI-ja (`omniroute` na istom računalu)       | Lokalni CLI                       | Samo lokalno upravljanje                                                                                |
| Pristupni token s opsegom | `oma_live_…`                           | **Postavke → Pristupni tokeni** ili `omniroute connect` | Udaljeni CLI i API za upravljanje | Mora zadovoljiti opseg `read`, `write` ili `admin` koji ruta zahtijeva                                  |
| API ključ za inferenciju  | `sk-…` (i drugi prefiksi API ključeva) | **Upravitelj API-ja / API ključevi**                    | Inferencija putem `/v1/*`         | **Nema** osim ako metapodaci ključa uključuju `manage` ili `admin`                                      |

Vjerodajnice `oma_` namijenjene su upravljanju/CLI-ju. One **nisu** API ključevi za inferenciju.

Ako je autentifikacija prijavom/API ključem onemogućena za poslužitelj, neke upravljačke rute mogu
prihvaćati neautentificirane pozive. Rute koje su samo lokalne i uvijek zaštićene i dalje primjenjuju
vlastita pravila. Stoga predočavanje jedne od ovih vjerodajnica nije uvijek
obvezno, a samo njezino posjedovanje nije uvijek dovoljno bez potrebnog
opsega i lokalnosti rute.

Povezano: [Udaljeni način rada](./REMOTE-MODE.md) (kako se `oma_live_…` izdaje za udaljeni CLI).

---

## Matrice opsega

Ova dva skupa opsega su **različita**. Nemojte ih miješati.

### Opsezi pristupnih tokena (`oma_live_…`)

| Opseg   | Uobičajene operacije                                                                        |
| ------- | ------------------------------------------------------------------------------------------- |
| `read`  | GET zahtjevi za popise/status koje token smije vidjeti                                      |
| `write` | Izmjene (stvaranje/ažuriranje/brisanje) ispod administratorske razine                       |
| `admin` | Potpuni udaljeni CLI / token za povezivanje (pokretanje lozinkom zadano koristi ovaj opseg) |

Token s opsegom `read` ne može pozvati rutu s opsegom `write`. Oblik poruke tijekom izvođenja:
`Opseg pristupnog tokena '<have>' nije dovoljan; potreban je '<need>'.`

### Opsezi API ključeva za upravljanje

| Opseg    | Značenje                                                                          |
| -------- | --------------------------------------------------------------------------------- |
| (nema)   | Samo inferencija. Upravljačke rute vraćaju 403.                                   |
| `manage` | API za upravljanje (ista provjera kao grana API ključa u `requireManagementAuth`) |
| `admin`  | Također zadovoljava `hasManageScope` (smatra se prikladnim za upravljanje)        |

Omogućite `manage` za ključ u korisničkom sučelju API ključevi / Upravitelj API-ja. Nemojte ponovno upotrebljavati
ključ klijenta za razgovor za automatizaciju osim ako mu niste namjerno dodijelili taj opseg.

---

## Kako stvoriti i opozvati

### JWT sesija nadzorne ploče

1. Otvorite `/login` i prijavite se lozinkom za upravljanje (`INITIAL_PASSWORD` pri prvom pokretanju).
2. Kolačić `auth_token` ima svojstvo HttpOnly. Nadzorna ploča u pregledniku automatski ga upotrebljava.
3. Odjavite se putem `/api/auth/logout`. Nema dugotrajne tajne za kopiranje.

### CLI token ID-a računala

1. Pokrenite `omniroute` na **istom računalu** kao i poslužitelj (povratna petlja).
2. CLI pokretanjem stvara token ID-a računala u `~/.omniroute/` (chmod 600).
3. Ovo **ne** funkcionira s drugog računala. Za udaljeni CLI upotrijebite pristupni token.

### Pristupni token s opsegom (`oma_live_…`)

1. Nadzorna ploča: **Postavke → Pristupni tokeni** → stvorite (naziv + opseg). **Tajna se prikazuje samo jednom.**
2. Ili CLI: `omniroute connect <host>` (lozinka → token). Pogledajte [Udaljeni način rada](./REMOTE-MODE.md).
3. Zaglavlje: `Authorization: Bearer oma_live_…`
4. Opozovite ga na istoj stranici Pristupni tokeni (ili izbrišite kontekst CLI-ja).
5. Poslužitelj pohranjuje samo sažetak. S tekstualnim oblikom postupajte kao s lozinkom.

### API ključ s opsegom za upravljanje

1. Nadzorna ploča: **Upravitelj API-ja / API ključevi** → stvorite ili uredite ključ → omogućite `manage` (ili `admin`).
2. Zaglavlje: `Authorization: Bearer sk-…` (stvarni prefiks ključa).
3. Opozovite ključ ili uklonite `manage` u istom korisničkom sučelju.
4. Najmanje ovlasti za automatizaciju koja nije CLI: za zadatke samo s GET zahtjevima dajte prednost pristupnom tokenu s opsegom `read`; upotrijebite `manage` na API ključu samo kada pozivatelj mora komunicirati i s `/v1` i s upravljačkim rutama.

---

## Format zaglavlja

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

Nemojte stavljati vjerodajnice za upravljanje u putanju URL-a ili niz upita. Autentifikacija za upravljanje dopuštena je samo putem zaglavlja/kolačića.

---

## Primjeri za kopiranje i lijepljenje

Samo za čitanje (popis pružatelja usluga). Upotrijebite pristupni token s opsegom `read`:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

Izmjena (stvaranje veze s pružateljem usluga). Upotrijebite pristupni token s opsegom `write`/`admin` ili API ključ s opsegom `manage`:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

Izvođenje zaključivanja (nije upravljanje). Običan API ključ; opseg `manage` nije potreban:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## Trenutačne pogreške tijekom izvođenja (nemojte prikazivati tajne)

| Situacija                                        | Uobičajeni status | Poruka (bez osjetljivih podataka)                                    |
| ------------------------------------------------ | ----------------- | -------------------------------------------------------------------- |
| Nema vjerodajnice                                | 401               | `Authentication required`                                            |
| Nevažeći/istekli `oma_live_…`                    | 401               | `Invalid or expired access token`                                    |
| Valjani API ključ bez opsega `manage`/`admin`    | 403               | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| Nevažeći obični API ključ na ruti za upravljanje | 403               | `Invalid management token`                                           |
| Nedovoljan opseg pristupnog tokena               | 403               | `Access token scope '<have>' is insufficient; '<need>' required.`    |

"Invalid management token" znači da token nositelja **nije** prihvaćen kao vjerodajnica za upravljanje. Poruka vam **ne** govori koju vrstu vjerodajnice trebate izdati. Upotrijebite prethodnu tablicu: ključevi za izvođenje zaključivanja trebaju opseg `manage`; udaljeni CLI treba `oma_live_…`; nadzorna ploča upotrebljava kolačić sesije.

---

## Preporučeni odabir s najmanjim ovlastima

| Pozivatelj                                                            | Upotrijebite                                            |
| --------------------------------------------------------------------- | ------------------------------------------------------- |
| Preglednik                                                            | Sesiju nadzorne ploče                                   |
| CLI na računalu na kojem je poslužitelj                               | Strojni token                                           |
| CLI na prijenosnom računalu koji komunicira s udaljenim poslužiteljem | `oma_live_…` iz naredbe `omniroute connect`             |
| CI / skripte (samo upravljanje)                                       | `oma_live_…` s najmanjim dovoljnim opsegom              |
| CI koji mora pozivati i `/v1` i `/api`                                | API ključ s opsegom `manage` **ili** dvije vjerodajnice |
