# Management Authentication (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute ima **četiri porodice vjerodajnica** koje mogu autorizirati upravljačke rute.
One nisu međusobno zamjenjive. API ključevi za inferenciju (`sk-…`) **ne** upravljaju
serverom osim ako im je izričito dodijeljen opseg `manage` ili `admin`.

Kanonska implementacija: `src/lib/api/requireManagementAuth.ts`.

| Vjerodajnica             | Tipični oblik                          | Gdje se kreira                                           | Namjena                           | Mogućnost upravljanja                                                                       |
| ------------------------ | -------------------------------------- | -------------------------------------------------------- | --------------------------------- | ------------------------------------------------------------------------------------------- |
| Dashboard JWT sesija     | `auth_token` kolačić                   | Prijava na dashboard                                     | Korisničko sučelje preglednika    | Potpuno upravljanje putem dashboarda, uz pravila za CSRF, lokalnost i uvijek zaštićene rute |
| CLI machine-id token     | interno / lokalno                      | CLI bootstrap (`omniroute` na istom računaru)            | Lokalni CLI                       | Samo lokalno upravljanje                                                                    |
| Token s opsegom pristupa | `oma_live_…`                           | **Postavke → Tokeni za pristup** ili `omniroute connect` | Udaljeni CLI i API za upravljanje | Mora zadovoljavati opseg `read`, `write` ili `admin` koji ruta zahtijeva                    |
| API ključ za inferenciju | `sk-…` (i drugi prefiksi API ključeva) | **Upravitelj API-ja / API ključevi**                     | `/v1/*` inferencija               | **Nema** osim ako metapodaci ključa uključuju `manage` ili `admin`                          |

Vjerodajnice `oma_` su vjerodajnice za upravljanje/CLI. One **nisu** API ključevi za inferenciju.

Ako je autentifikacija prijavom/API ključem onemogućena za server, neke upravljačke rute mogu
prihvatati neautentificirane pozive. Rute koje su samo lokalne i uvijek zaštićene i dalje primjenjuju
vlastita pravila. Stoga predstavljanje jedne od ovih vjerodajnica nije univerzalno
obavezno, a njeno posjedovanje nije univerzalno dovoljno bez zahtijevanog
opsega i lokalnosti rute.

Povezano: [Udaljeni način rada](./REMOTE-MODE.md) (kako se `oma_live_…` izdaje za udaljeni CLI).

---

## Matrice opsega

Opsezi za upravljanje API ključevima i opsezi pristupnih tokena koriste različite terminologije.
Opsezi MCP alata predstavljaju treću terminologiju i provjeravaju se pomoću `scopeMatches`, a ne
funkcijama navedenim u tabelama ispod. Uporedni prikaz:
[Tri prostora imena opsega](../frameworks/MCP-SERVER.md#three-scope-namespaces).

### Opsezi pristupnih tokena (`oma_live_…`)

| Opseg   | Tipične operacije                                                                           |
| ------- | ------------------------------------------------------------------------------------------- |
| `read`  | GET zahtjevi za prikaz liste/statusa koje token smije vidjeti                               |
| `write` | Izmjene (kreiranje/ažuriranje/brisanje) ispod administratorskog nivoa                       |
| `admin` | Potpuni udaljeni CLI / token za povezivanje (početno postavljanje lozinkom ovdje je zadano) |

Token s opsegom `read` ne može pozvati rutu s opsegom `write`. Format poruke tokom izvršavanja:
`Opseg pristupnog tokena '<have>' nije dovoljan; potreban je '<need>'.`

### Opsezi za upravljanje API ključevima

| Opseg    | Značenje                                                                        |
| -------- | ------------------------------------------------------------------------------- |
| (nema)   | Samo zaključivanje. Rute za upravljanje vraćaju 403.                            |
| `manage` | API za upravljanje (ista provjera kao grana API ključa `requireManagementAuth`) |
| `admin`  | Također zadovoljava `hasManageScope` (tretira se kao sposoban za upravljanje)   |

Omogućite `manage` na ključu u korisničkom interfejsu API Keys / API Manager. Nemojte ponovo koristiti
ključ klijenta za razgovor za automatizaciju osim ako mu niste namjerno dodijelili taj opseg.

---

## Kako kreirati i opozvati

### Dashboard JWT sesija

1. Otvorite `/login`, prijavite se sa upravljačkom lozinkom (`INITIAL_PASSWORD` pri prvom pokretanju).
2. Kolačić `auth_token` je HttpOnly. Dashboard preglednika ga koristi automatski.
3. Odjavite se putem `/api/auth/logout`. Ne postoji dugovječna tajna za kopiranje.

### CLI machine-id token

1. Pokrenite `omniroute` na **istom hostu** kao i server (loopback).
2. CLI kreira machine-id token pod `~/.omniroute/` (chmod 600).
3. Ovo **ne** radi sa druge mašine. Koristite Access Token za udaljeni CLI.

### Scoped Access Token (`oma_live_…`)

1. Dashboard: **Postavke → Pristupni tokeni** → kreirajte (ime + opseg). **Tajna se prikazuje samo jednom.**
2. Ili CLI: `omniroute connect <host>` (lozinka → token). Pogledajte [Remote Mode](./REMOTE-MODE.md).
3. Zaglavlje: `Authorization: Bearer oma_live_…`
4. Opozovite sa iste stranice Pristupni tokeni (ili izbrišite CLI kontekst).
5. Server pohranjuje samo hash. Tretirajte običan tekst kao lozinku.

### API ključ sa upravljačkim opsegom

1. Dashboard: **API Manager / API ključevi** → kreirajte ili uredite ključ → omogućite `manage` (ili `admin`).
2. Zaglavlje: `Authorization: Bearer sk-…` (stvarni prefiks ključa).
3. Opozovite ili uklonite `manage` u istom UI-u.
4. Najmanje privilegije za automatizaciju koja nije CLI: preferirajte `read` Access Token za GET-only poslove; koristite `manage` na API ključu samo kada pozivatelj mora također komunicirati sa `/v1` i upravljanjem.

## Format zaglavlja

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

Nemojte stavljati upravljačke vjerodajnice u putanju URL-a ili niz upita (query string). Upravljačka autentifikacija je samo putem zaglavlja/kolačića.

---

## Primjeri za kopiranje i lijepljenje

Samo za čitanje (listanje provajdera). Koristite `read` pristupni token:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

Izmjena (kreiranje veze s provajderom). Koristite `write`/`admin` pristupni token ili API ključ s `manage` opsegom:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

Inferencija (nije upravljanje). Običan API ključ, nije potreban `manage`:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## Trenutne greške tokom izvršavanja (ne prikazujte tajne podatke)

| Situacija                                        | Tipični status | Poruka (bez osjetljivih podataka)                                    |
| ------------------------------------------------ | -------------- | -------------------------------------------------------------------- |
| Nema vjerodajnice                                | 401            | `Authentication required`                                            |
| Nevažeći/istekli `oma_live_…`                    | 401            | `Invalid or expired access token`                                    |
| Važeći API ključ bez opsega `manage`/`admin`     | 403            | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| Nevažeći obični API ključ na ruti za upravljanje | 403            | `Invalid management token`                                           |
| Opseg pristupnog tokena je prenizak              | 403            | `Access token scope '<have>' is insufficient; '<need>' required.`    |

„Invalid management token“ znači da nosilac tokena **nije** prihvaćen kao vjerodajnica
za upravljanje. Poruka vam **ne** govori koju vrstu vjerodajnice trebate generisati. Koristite gornju tabelu:
ključevi za inferenciju zahtijevaju opseg `manage`; udaljeni CLI zahtijeva `oma_live_…`; kontrolna tabla
koristi kolačić sesije.

---

## Preporučeni izbor s najmanjim privilegijama

| Pozivalac                                           | Koristite                                         |
| --------------------------------------------------- | ------------------------------------------------- |
| Preglednik                                          | Sesija kontrolne ploče                            |
| CLI na hostu servera                                | Token mašine                                      |
| CLI na laptopu koji komunicira s udaljenim serverom | `oma_live_…` iz `omniroute connect`               |
| CI / skripte (samo upravljanje)                     | `oma_live_…` s najmanjim opsegom koji funkcionira |
| CI koji mora pozivati i `/v1` i `/api`              | API ključ s `manage` **ili** dvije vjerodajnice   |
