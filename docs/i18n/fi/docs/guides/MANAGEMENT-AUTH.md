# Management Authentication (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute-järjestelmässä on **neljä tunnistetietoperhettä**, jotka voivat valtuuttaa hallintareittejä.
Ne eivät ole keskenään vaihdettavissa. Päättely-API-avaimet (`sk-…`) eivät **hallinnoi** palvelinta, ellei niille ole erikseen myönnetty `manage`- tai `admin`-laajuutta.

Kanoninen toteutus: `src/lib/api/requireManagementAuth.ts`.

| Tunnistetieto                 | Tyypillinen muoto                         | Luotu missä                                                   | Tarkoitettu käyttö      | Hallintakyky                                                                                         |
| ----------------------------- | ----------------------------------------- | ------------------------------------------------------------- | ----------------------- | ---------------------------------------------------------------------------------------------------- |
| Hallintapaneelin JWT-istunto  | `auth_token`-eväste                       | Hallintapaneelin kirjautuminen                                | Selaimen käyttöliittymä | Täysi hallintapaneelin hallinta, CSRF-, paikallisuus- ja aina suojattujen reittien sääntöjen alainen |
| CLI-koneen tunnisteen tunnus  | sisäinen / paikallinen                    | CLI-käynnistys (`omniroute` samalla koneella)                 | Paikallinen CLI         | Vain paikallinen hallinta                                                                            |
| Rajoitettu käyttöoikeustunnus | `oma_live_…`                              | **Asetukset → Käyttöoikeustunnukset** tai `omniroute connect` | Etä-CLI ja hallinta-API | Täytyy täyttää reitin vaadittu `read`-, `write`- tai `admin`-laajuus                                 |
| Päättely-API-avain            | `sk-…` (ja muut API-avainten etuliitteet) | **API-hallinta / API-avaimet**                                | `/v1/*`-päättely        | **Ei mitään**, ellei avaimen metatiedot sisällä `manage`- tai `admin`-laajuutta                      |

`oma_`-tunnistetiedot ovat hallinta-/CLI-tunnistetietoja. Ne eivät ole päättely-API-avaimia.

Jos kirjautuminen/API-avainten todennus on poistettu käytöstä palvelimella, jotkin hallintareitit saattavat hyväksyä todentamattomia kutsuja. Vain paikalliset ja aina suojatut reitit soveltavat edelleen omia sääntöjään. Yhden näistä tunnistetiedoista esittäminen ei siis ole yleisesti pakollista, eikä yhden hallussapito ole yleisesti riittävää ilman vaadittua laajuutta ja reitin paikallisuutta.

Aiheeseen liittyvää: [Etätila](./REMOTE-MODE.md) (miten `oma_live_…` luodaan etä-CLI:lle).

---

## Laajuusmatriisit

API-avainten hallintalaajuudet ja käyttöoikeustunnusten laajuudet ovat eri sanastoja.
MCP-työkalujen laajuudet ovat kolmas sanasto, joka tarkistetaan `scopeMatches`-funktiolla pikemminkin kuin kummallakaan alla olevien taulukoiden funktiosta. Vertailu:
[Kolme laajuusnimiavaruutta](../frameworks/MCP-SERVER.md#three-scope-namespaces).

### Käyttöoikeustunnuksen laajuudet (`oma_live_…`)

| Laajuus | Tyypilliset toiminnot                                                |
| ------- | -------------------------------------------------------------------- |
| `read`  | Listaus/tila GET-pyynnöt, jotka tunnus saa nähdä                     |
| `write` | Muutokset (luonti/päivitys/poisto) alle admin-tason                  |
| `admin` | Täysi etä-CLI / yhteystunnus (salasanan käynnistys oletuksena tässä) |

Tunnus, jolla on `read`-laajuus, ei voi kutsua `write`-reittiä. Suoritusajan viestin muoto:
`Käyttöoikeustunnuksen laajuus '<have>' on riittämätön; '<need>' vaaditaan.`

### API-avaimen hallintalaajuudet

| Laajuus     | Merkitys                                                                  |
| ----------- | ------------------------------------------------------------------------- |
| (ei mitään) | Vain päättely. Hallintareitit palauttavat 403.                            |
| `manage`    | Hallinta-API (sama portti kuin `requireManagementAuth`-API-avainhaarassa) |
| `admin`     | Täyttää myös `hasManageScope`-vaatimuksen (käsitellään hallintakykyisenä) |

Ota `manage`-laajuus käyttöön avaimelle API Keys / API Manager -käyttöliittymässä. Älä käytä chat-asiakkaan avainta uudelleen automaatioon, ellet ole tarkoituksella myöntänyt kyseistä laajuutta.

---

## Kuinka luoda ja kumota

### Kojelaudan JWT-istunto

1.  Avaa `/login`, kirjaudu sisään hallintasalasanoilla (`INITIAL_PASSWORD` ensimmäisellä käynnistyksellä).
2.  Eväste `auth_token` on HttpOnly. Selaimen kojelauta käyttää sitä automaattisesti.
3.  Kirjaudu ulos `/api/auth/logout` kautta. Kopioitavaa pitkäikäistä salaisuutta ei ole.

### CLI:n kone-ID-tunnus

1.  Suorita `omniroute` **samalla isännällä** kuin palvelin (loopback).
2.  CLI käynnistää kone-ID-tunnuksen `~/.omniroute/` alle (chmod 600).
3.  Tämä **ei** toimi toisesta koneesta. Käytä pääsytunnusta etä-CLI:lle.

### Rajoitetun käyttöoikeuden tunnus (`oma_live_…`)

1.  Kojelauta: **Asetukset → Pääsytunnukset** → luo (nimi + laajuus). **Salaisuus näytetään vain kerran.**
2.  Tai CLI: `omniroute connect <host>` (salasana → tunnus). Katso [Etätila](./REMOTE-MODE.md).
3.  Otsake: `Authorization: Bearer oma_live_…`
4.  Kumoa samalta Pääsytunnukset-sivulta (tai poista CLI-konteksti).
5.  Palvelin tallentaa vain hajautuksen. Käsittele selväkielistä tekstiä kuin salasanaa.

### Hallintalaajuinen API-avain

1.  Kojelauta: **API-hallinta / API-avaimet** → luo tai muokkaa avainta → ota käyttöön `manage` (tai `admin`).
2.  Otsake: `Authorization: Bearer sk-…` (avaimen todellinen etuliite).
3.  Kumoa tai poista `manage` samassa käyttöliittymässä.
4.  Vähiten oikeuksia automaatiolle, joka ei ole CLI: mieluummin `read`-pääsytunnus vain GET-tehtäviin; käytä `manage`-oikeutta API-avaimessa vain, kun kutsujan on myös puhuttava `/v1`:tä ja hallintaa.

---

## Otsakkeen muoto

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

Älä laita hallintatunnuksia URL-polkuun tai kyselymerkkijonoon. Hallinnan todennus tapahtuu vain otsakkeen/evästeen kautta.

---

## Kopioi-liitä-esimerkkejä

Vain luku (listaa palveluntarjoajat). Käytä `read`-pääsytunnusta:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

Muokkaaminen (luo palveluntarjoajayhteys). Käytä `write`/`admin`-pääsytunnusta tai hallintalaajuista API-avainta:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

Päättely (ei hallinta). Tavallinen API-avain, `manage`-oikeutta ei vaadita:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## Nykyiset ajonaikaiset virheet (älä toista salaisuuksia)

| Tilanne                                               | Tyypillinen tila | Viesti (puhdistettu)                                                 |
| :---------------------------------------------------- | :--------------- | :------------------------------------------------------------------- |
| Ei tunnistetietoja                                    | 401              | `Authentication required`                                            |
| Virheellinen tai vanhentunut `oma_live_…`             | 401              | `Invalid or expired access token`                                    |
| Kelvollinen API-avain ilman `manage`/`admin`-oikeutta | 403              | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| Virheellinen tavallinen API-avain hallintareitillä    | 403              | `Invalid management token`                                           |
| Pääsytunnuksen laajuus liian alhainen                 | 403              | `Access token scope '<have>' is insufficient; '<need>' required.`    |

”Virheellinen hallintatunnus” tarkoittaa, että kantajaa **ei** hyväksytty hallintatunnukseksi. Se **ei** kerro, minkä tyyppinen tunnus tulisi luoda. Käytä yllä olevaa taulukkoa: päättelyavaimet tarvitsevat `manage`-laajuuden; etä-CLI tarvitsee `oma_live_…`; kojelauta käyttää istuntoevästettä.

## Suositeltu vähiten etuoikeutettu valinta

| Kutsuja                                                               | Käyttötarkoitus                                         |
| :-------------------------------------------------------------------- | :------------------------------------------------------ |
| Selain                                                                | Hallintapaneelin istunto                                |
| CLI palvelimen isännässä                                              | Konetunnus                                              |
| CLI kannettavalla tietokoneella, joka kommunikoi etäpalvelimen kanssa | `oma_live_…` komennosta `omniroute connect`             |
| CI / skriptit (vain hallinta)                                         | `oma_live_…` pienimmällä toimivalla laajuudella         |
| CI, jonka on kutsuttava sekä `/v1` että `/api`                        | API-avain `manage`-oikeudella **tai** kaksi tunnistetta |
