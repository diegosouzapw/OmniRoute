# MANAGEMENT-AUTH (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

# Upravljačka autentifikacija

OmniRoute ima **četiri porodice vjerodajnica** koje mogu autorizirati upravljačke rute.
One nisu zamjenjive. Inference API ključevi (`sk-…`) **ne** upravljaju
serverom osim ako im nije eksplicitno dodijeljen `manage` ili `admin` opseg.

Kanonska implementacija: `src/lib/api/requireManagementAuth.ts`.

| Vjerodajnica         | Tipičan oblik                          | Kreirano gdje                                           | Namjena                        | Upravljačka sposobnost                                                                        |
| -------------------- | -------------------------------------- | ------------------------------------------------------- | ------------------------------ | --------------------------------------------------------------------------------------------- |
| Dashboard JWT sesija | `auth_token` kolačić                   | Prijava na dashboard                                    | Preglednik UI                  | Potpuno upravljanje dashboardom, podložno CSRF, lokalitetu i pravilima uvijek zaštićenih ruta |
| CLI machine-id token | interno / lokalno                      | CLI bootstrap (`omniroute` na istoj mašini)             | Lokalni CLI                    | Samo lokalno upravljanje                                                                      |
| Scoped Access Token  | `oma_live_…`                           | **Postavke → Pristupni tokeni** ili `omniroute connect` | Udaljeni CLI i upravljački API | Mora zadovoljiti traženi `read`, `write` ili `admin` opseg rute                               |
| Inference API ključ  | `sk-…` (i drugi prefiksi API ključeva) | **API Manager / API ključevi**                          | `/v1/*` inference              | **Nijedna** osim ako metapodaci ključa uključuju `manage` ili `admin`                         |

`oma_` vjerodajnice su upravljačke/CLI vjerodajnice. One **nisu** inference API ključevi.

Ako je prijava/API-ključ autentifikacija onemogućena za server, neke upravljačke rute mogu
prihvatiti neautentificirane pozive. Rute koje su samo lokalne i uvijek zaštićene i dalje primjenjuju
svoja pravila. Predočavanje jedne od ovih vjerodajnica stoga nije univerzalno obavezno,
a posjedovanje jedne nije univerzalno dovoljno bez potrebnog opsega i lokaliteta rute.

Povezano: [Remote Mode](./REMOTE-MODE.md) (kako se `oma_live_…` kreira za udaljeni CLI).

---

## Matrice opsega

Ova dva vokabulara opsega su **različita**. Nemojte ih miješati.

### Opsezi pristupnih tokena (`oma_live_…`)

| Opseg   | Tipične operacije                                                                 |
| ------- | --------------------------------------------------------------------------------- |
| `read`  | List/status GET zahtjevi koje token smije vidjeti                                 |
| `write` | Mutacije (kreiranje/ažuriranje/brisanje) ispod admin nivoa                        |
| `admin` | Potpuni udaljeni CLI / connect token (password bootstrap ovdje podrazumijeva ovo) |

Token sa `read` opsegom ne može pozvati `write` rutu. Oblik poruke tokom izvršavanja:
`Access token scope '<have>' is insufficient; '<need>' required.`

### Opsezi upravljanja API ključevima

| Opseg     | Značenje                                                                      |
| --------- | ----------------------------------------------------------------------------- |
| (nijedan) | Samo inference. Upravljačke rute vraćaju 403.                                 |
| `manage`  | Upravljački API (ista kapija kao `requireManagementAuth` API-ključ grana)     |
| `admin`   | Također zadovoljava `hasManageScope` (tretira se kao sposoban za upravljanje) |

Omogućite `manage` na ključu u API Keys / API Manager UI-u. Nemojte ponovo koristiti
ključ chat klijenta za automatizaciju osim ako niste namjerno dodijelili taj opseg.

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

## Trenutne greške tokom izvršavanja (ne ispisujte tajne)

| Situacija                                        | Tipičan status | Poruka (sanitizirana)                                                |
| ------------------------------------------------ | -------------- | -------------------------------------------------------------------- |
| Nema vjerodajnica                                | 401            | `Authentication required`                                            |
| Neispravan/istekao `oma_live_…`                  | 401            | `Invalid or expired access token`                                    |
| Ispravan API ključ bez `manage`/`admin`          | 403            | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| Neispravan običan API ključ na upravljačkoj ruti | 403            | `Invalid management token`                                           |
| Opseg pristupnog tokena je prenizak              | 403            | `Access token scope '<have>' is insufficient; '<need>' required.`    |

"Invalid management token" znači da nosilac **nije** prihvaćen kao upravljačka vjerodajnica. To vam **ne** govori koju porodicu (vrstu) trebate izdati. Koristite gornju tabelu: ključevi za inferenciju trebaju `manage` opseg; udaljeni CLI treba `oma_live_…`; kontrolna tabla koristi sesijski kolačić.

---

## Preporučeni izbor s najmanjim privilegijama

| Pozivalac                                           | Upotreba                                        |
| --------------------------------------------------- | ----------------------------------------------- |
| Preglednik                                          | Sesija kontrolne table                          |
| CLI na hostu servera                                | Mašinski token                                  |
| CLI na laptopu koji komunicira s udaljenim serverom | `oma_live_…` iz `omniroute connect`             |
| CI / skripte (samo upravljanje)                     | `oma_live_…` s najmanjim opsegom koji radi      |
| CI koji mora pozivati i `/v1` i `/api`              | API ključ s `manage` **ili** dvije vjerodajnice |
