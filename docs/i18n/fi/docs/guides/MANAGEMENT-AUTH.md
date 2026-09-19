# Management Authentication (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoutessa on **neljä tunnistetietoperhettä**, joilla hallintareittejä voidaan käyttää.
Ne eivät ole keskenään vaihtokelpoisia. Päättelyrajapinnan API-avaimet (`sk-…`) **eivät** hallitse
palvelinta, ellei niille ole nimenomaisesti myönnetty `manage`- tai `admin`-käyttöaluetta.

Kanoninen toteutus: `src/lib/api/requireManagementAuth.ts`.

| Tunnistetieto                        | Tyypillinen muoto                         | Luontipaikka                                                  | Käyttötarkoitus              | Hallintaoikeudet                                                                                                |
| ------------------------------------ | ----------------------------------------- | ------------------------------------------------------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Hallintapaneelin JWT-istunto         | `auth_token`-eväste                       | Kirjautuminen hallintapaneeliin                               | Selainkäyttöliittymä         | Täydet hallintapaneelin hallintaoikeudet CSRF-, paikallisuus- ja aina suojattujen reittien sääntöjen mukaisesti |
| CLI:n konetunnustunnus               | sisäinen / paikallinen                    | CLI:n alustaminen (`omniroute` samalla koneella)              | Paikallinen CLI              | Vain paikallinen hallinta                                                                                       |
| Käyttöalueellinen käyttöoikeustunnus | `oma_live_…`                              | **Asetukset → Käyttöoikeustunnukset** tai `omniroute connect` | Etä-CLI ja hallintarajapinta | Tunnuksen on täytettävä reitin vaatima `read`-, `write`- tai `admin`-käyttöalue                                 |
| Päättelyrajapinnan API-avain         | `sk-…` (ja muut API-avainten etuliitteet) | **API Manager / API Keys**                                    | `/v1/*`-päättely             | **Ei mitään**, elleivät avaimen metatiedot sisällä `manage`- tai `admin`-käyttöaluetta                          |

`oma_`-tunnistetiedot ovat hallinnan/CLI:n tunnistetietoja. Ne **eivät** ole päättelyrajapinnan API-avaimia.

Jos kirjautumis- tai API-avainautentikointi on poistettu käytöstä palvelimessa, jotkin hallintareitit voivat
hyväksyä todentamattomia kutsuja. Vain paikalliset ja aina suojatut reitit noudattavat silti
omia sääntöjään. Näiden tunnistetietojen esittäminen ei siis ole yleisesti
pakollista, eikä tunnistetiedon hallussapito ole yleisesti riittävää ilman vaadittua
käyttöaluetta ja reitin paikallisuusvaatimuksen täyttymistä.

Aiheeseen liittyvää: [Etätila](./REMOTE-MODE.md) (`oma_live_…`-tunnuksen luominen etä-CLI:tä varten).

---

## Käyttöaluematriisit

Nämä kaksi käyttöaluesanastoa ovat **erilaisia**. Älä sekoita niitä keskenään.

### Käyttöoikeustunnuksen käyttöalueet (`oma_live_…`)

| Käyttöalue | Tyypilliset toiminnot                                                                            |
| ---------- | ------------------------------------------------------------------------------------------------ |
| `read`     | Luettelointi- ja tilatietojen GET-pyynnöt, jotka tunnus saa nähdä                                |
| `write`    | Ylläpitäjätason alapuoliset muutokset (luonti/päivitys/poisto)                                   |
| `admin`    | Täydet etä-CLI:n oikeudet / yhdistämistunnus (salasanalla tehty alustus käyttää tätä oletuksena) |

`read`-käyttöalueen tunnuksella ei voi kutsua `write`-reittiä. Suorituksenaikaisen viestin muoto:
`Access token scope '<have>' is insufficient; '<need>' required.`

### API-avaimen hallintakäyttöalueet

| Käyttöalue  | Merkitys                                                                                  |
| ----------- | ----------------------------------------------------------------------------------------- |
| (ei mitään) | Vain päättely. Hallintareitit palauttavat 403-virheen.                                    |
| `manage`    | Hallintarajapinta (sama tarkistus kuin kohteen `requireManagementAuth` API-avainhaarassa) |
| `admin`     | Täyttää myös `hasManageScope`-ehdon (käsitellään hallintakykyisenä)                       |

Ota avaimen `manage`-käyttöalue käyttöön API Keys / API Manager -käyttöliittymässä. Älä käytä
keskusteluasiakkaan avainta automaatioon, ellet ole tarkoituksella myöntänyt sille kyseistä käyttöaluetta.

---

## Luominen ja kumoaminen

### Hallintapaneelin JWT-istunto

1. Avaa `/login` ja kirjaudu sisään hallintasalasanalla (`INITIAL_PASSWORD` ensimmäisellä käynnistyskerralla).
2. `auth_token`-eväste on HttpOnly. Selaimen hallintapaneeli käyttää sitä automaattisesti.
3. Kirjaudu ulos osoitteessa `/api/auth/logout`. Kopioitavaa pitkäikäistä salaisuutta ei ole.

### CLI:n konetunnustunnus

1. Suorita `omniroute` palvelimen kanssa **samalla isäntäkoneella** (loopback).
2. CLI alustaa konetunnustunnuksen hakemistoon `~/.omniroute/` (chmod 600).
3. Tämä **ei** toimi toiselta koneelta. Käytä etä-CLI:ssä käyttöoikeustunnusta.

### Käyttöalueellinen käyttöoikeustunnus (`oma_live_…`)

1. Hallintapaneeli: **Asetukset → Käyttöoikeustunnukset** → luo (nimi + käyttöalue). **Salaisuus näytetään vain kerran.**
2. Tai CLI: `omniroute connect <host>` (salasana → tunnus). Katso [Etätila](./REMOTE-MODE.md).
3. Otsake: `Authorization: Bearer oma_live_…`
4. Kumoa tunnus samalla Käyttöoikeustunnukset-sivulla (tai poista CLI-konteksti).
5. Palvelin tallentaa vain tiivisteen. Käsittele selväkielistä arvoa salasanan tavoin.

### `manage`-käyttöalueen API-avain

1. Hallintapaneeli: **API Manager / API Keys** → luo avain tai muokkaa sitä → ota `manage` (tai `admin`) käyttöön.
2. Otsake: `Authorization: Bearer sk-…` (avaimen todellinen etuliite).
3. Kumoa avain tai poista sen `manage`-käyttöalue samassa käyttöliittymässä.
4. Vähimmät tarvittavat oikeudet muulle automaatiolle kuin CLI:lle: suosi `read`-käyttöoikeustunnusta vain GET-pyyntöjä tekeviin töihin; käytä API-avaimen `manage`-käyttöaluetta vain, kun kutsujan on käytettävä sekä `/v1`-rajapintaa että hallintaa.

---

## Otsakemuoto

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

Älä sijoita hallintatunnuksia URL-polkuun tai kyselymerkkijonoon. Hallinnan
todennus tapahtuu vain otsakkeen tai evästeen kautta.

---

## Kopioitavat esimerkit

Vain luku (palveluntarjoajien luettelointi). Käytä `read`-käyttöoikeustunnusta:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

Muokkaava pyyntö (palveluntarjoajayhteyden luominen). Käytä `write`-/`admin`-käyttöoikeustunnusta tai
`manage`-oikeusalueen API-avainta:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

Päättely (ei hallintaa). Tavallinen API-avain, `manage`-oikeusaluetta ei vaadita:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## Nykyiset ajonaikaiset virheet (älä tulosta salaisuuksia)

| Tilanne                                                     | Tyypillinen tilakoodi | Viesti (puhdistettu)                                                 |
| ----------------------------------------------------------- | --------------------- | -------------------------------------------------------------------- |
| Ei tunnusta                                                 | 401                   | `Authentication required`                                            |
| Virheellinen/vanhentunut `oma_live_…`                       | 401                   | `Invalid or expired access token`                                    |
| Kelvollinen API-avain ilman `manage`-/`admin`-oikeusaluetta | 403                   | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| Virheellinen tavallinen API-avain hallintareitillä          | 403                   | `Invalid management token`                                           |
| Käyttöoikeustunnuksen oikeusalue on liian suppea            | 403                   | `Access token scope '<have>' is insufficient; '<need>' required.`    |

"Invalid management token" tarkoittaa, että bearer-tunnusta **ei** hyväksytty hallintatunnukseksi.
Se **ei** kerro, minkä tyyppinen tunnus pitäisi luoda. Käytä yllä olevaa taulukkoa:
päättelyavaimet tarvitsevat `manage`-oikeusalueen, etäkäytössä oleva CLI tarvitsee `oma_live_…`-tunnuksen ja hallintapaneeli
käyttää istuntoevästettä.

---

## Suositeltu vähimpien oikeuksien valinta

| Kutsuja                                                                 | Käytä                                                    |
| ----------------------------------------------------------------------- | -------------------------------------------------------- |
| Selain                                                                  | Hallintapaneelin istunto                                 |
| CLI palvelinisännässä                                                   | Konetunnus                                               |
| CLI kannettavassa tietokoneessa, joka muodostaa yhteyden etäpalvelimeen | `oma_live_…` komennolla `omniroute connect`              |
| CI / komentosarjat (vain hallinta)                                      | `oma_live_…` pienimmällä toimivalla oikeusalueella       |
| CI, jonka on kutsuttava sekä `/v1`- että `/api`-rajapintaa              | API-avain `manage`-oikeusalueella **tai** kaksi tunnusta |
