# Kiro Setup Guide (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/KIRO_SETUP.md) · 🇪🇹 [am](../../../am/docs/guides/KIRO_SETUP.md) · 🇸🇦 [ar](../../../ar/docs/guides/KIRO_SETUP.md) · 🇦🇿 [az](../../../az/docs/guides/KIRO_SETUP.md) · 🇧🇬 [bg](../../../bg/docs/guides/KIRO_SETUP.md) · 🇧🇩 [bn](../../../bn/docs/guides/KIRO_SETUP.md) · 🇨🇿 [cs](../../../cs/docs/guides/KIRO_SETUP.md) · 🇩🇰 [da](../../../da/docs/guides/KIRO_SETUP.md) · 🇩🇪 [de](../../../de/docs/guides/KIRO_SETUP.md) · 🇬🇷 [el](../../../el/docs/guides/KIRO_SETUP.md) · 🇪🇸 [es](../../../es/docs/guides/KIRO_SETUP.md) · 🇪🇪 [et](../../../et/docs/guides/KIRO_SETUP.md) · 🇮🇷 [fa](../../../fa/docs/guides/KIRO_SETUP.md) · 🇫🇷 [fr](../../../fr/docs/guides/KIRO_SETUP.md) · 🇮🇪 [ga](../../../ga/docs/guides/KIRO_SETUP.md) · 🇮🇳 [gu](../../../gu/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ha](../../../ha/docs/guides/KIRO_SETUP.md) · 🇮🇱 [he](../../../he/docs/guides/KIRO_SETUP.md) · 🇮🇳 [hi](../../../hi/docs/guides/KIRO_SETUP.md) · 🇭🇷 [hr](../../../hr/docs/guides/KIRO_SETUP.md) · 🇭🇺 [hu](../../../hu/docs/guides/KIRO_SETUP.md) · 🇦🇲 [hy](../../../hy/docs/guides/KIRO_SETUP.md) · 🇮🇩 [id](../../../id/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ig](../../../ig/docs/guides/KIRO_SETUP.md) · 🇮🇹 [it](../../../it/docs/guides/KIRO_SETUP.md) · 🇯🇵 [ja](../../../ja/docs/guides/KIRO_SETUP.md) · 🇬🇪 [ka](../../../ka/docs/guides/KIRO_SETUP.md) · 🇰🇭 [km](../../../km/docs/guides/KIRO_SETUP.md) · 🇮🇳 [kn](../../../kn/docs/guides/KIRO_SETUP.md) · 🇰🇷 [ko](../../../ko/docs/guides/KIRO_SETUP.md) · 🇱🇹 [lt](../../../lt/docs/guides/KIRO_SETUP.md) · 🇱🇻 [lv](../../../lv/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ml](../../../ml/docs/guides/KIRO_SETUP.md) · 🇮🇳 [mr](../../../mr/docs/guides/KIRO_SETUP.md) · 🇲🇾 [ms](../../../ms/docs/guides/KIRO_SETUP.md) · 🇲🇹 [mt](../../../mt/docs/guides/KIRO_SETUP.md) · 🇲🇲 [my](../../../my/docs/guides/KIRO_SETUP.md) · 🇳🇵 [ne](../../../ne/docs/guides/KIRO_SETUP.md) · 🇳🇱 [nl](../../../nl/docs/guides/KIRO_SETUP.md) · 🇳🇴 [no](../../../no/docs/guides/KIRO_SETUP.md) · 🇮🇳 [or](../../../or/docs/guides/KIRO_SETUP.md) · 🇮🇳 [pa](../../../pa/docs/guides/KIRO_SETUP.md) · 🇵🇭 [phi](../../../phi/docs/guides/KIRO_SETUP.md) · 🇵🇱 [pl](../../../pl/docs/guides/KIRO_SETUP.md) · 🇵🇹 [pt](../../../pt/docs/guides/KIRO_SETUP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/KIRO_SETUP.md) · 🇷🇴 [ro](../../../ro/docs/guides/KIRO_SETUP.md) · 🇷🇺 [ru](../../../ru/docs/guides/KIRO_SETUP.md) · 🇱🇰 [si](../../../si/docs/guides/KIRO_SETUP.md) · 🇸🇰 [sk](../../../sk/docs/guides/KIRO_SETUP.md) · 🇸🇮 [sl](../../../sl/docs/guides/KIRO_SETUP.md) · 🇷🇸 [sr](../../../sr/docs/guides/KIRO_SETUP.md) · 🇸🇪 [sv](../../../sv/docs/guides/KIRO_SETUP.md) · 🇰🇪 [sw](../../../sw/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ta](../../../ta/docs/guides/KIRO_SETUP.md) · 🇮🇳 [te](../../../te/docs/guides/KIRO_SETUP.md) · 🇹🇭 [th](../../../th/docs/guides/KIRO_SETUP.md) · 🇹🇷 [tr](../../../tr/docs/guides/KIRO_SETUP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/KIRO_SETUP.md) · 🇵🇰 [ur](../../../ur/docs/guides/KIRO_SETUP.md) · 🇺🇿 [uz](../../../uz/docs/guides/KIRO_SETUP.md) · 🇻🇳 [vi](../../../vi/docs/guides/KIRO_SETUP.md) · 🇳🇬 [yo](../../../yo/docs/guides/KIRO_SETUP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/KIRO_SETUP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/KIRO_SETUP.md)

---

Tämä opas käsittelee Kiro-tilien (AWS:n ylläpitämä tekoälypohjainen koodausavustaja) lisäämistä OmniRouteen. Painopisteenä on useiden tilien käyttäminen samanaikaisesti ilman istuntoristiriitoja.

---

## Tausta: Miksi Kiro-tilit voivat aiheuttaa ristiriitoja

Kiron taustajärjestelmä käyttää AWS SSO OIDC -asiakasrekisteröintejä aktiivisten istuntojen seurantaan. Keskeinen rajoite on, että **kukin OIDC-asiakasrekisteröinti tukee vain yhtä aktiivista istuntoa kerrallaan**. Kun toinen laite tai käyttäjä tunnistautuu samalla rekisteröidyllä asiakkaalla, taustajärjestelmä mitätöi ensimmäisen tilin päivitystunnuksen.

Sama mekanismi aiheuttaa ongelmia, kun `kiro-cli login` suoritetaan koneella, jolla toinen Kiro-tili on jo kirjautuneena sisään — uusi kirjautuminen kumoaa ensimmäisen tilin tunnuksen.

---

## Miten OmniRoute ratkaisee tämän (v3.8.0+)

Versiosta v3.8.0 alkaen OmniRoute kutsuu `registerClient()`-toimintoa (AWS SSO OIDC) jokaisen Kiro-yhteyden tuonnin aikana. Näin jokainen OmniRoute-yhteys saa oman OIDC-asiakasrekisteröintinsä. Koska jokainen asiakasrekisteröinti on itsenäinen, yhden tilin päivittäminen tai uudelleentodentaminen ei vaikuta minkään muun tilin päivitystunnukseen.

Eristys koskee päivitystunnusta käyttäviä tuontimenetelmiä, ja API-avaintodennus välttää OIDC-päivitysistunnot kokonaan:

| Tuontimenetelmä                                              | Eristyksen tila                                                                                                  |
| ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| AWS Builder ID / IDC -laitekoodimenettely                    | Eristetty laitekoodimenettelyn käyttöönotosta lähtien                                                            |
| **Tuo tunnus** (päivitystunnuksen liittäminen manuaalisesti) | Eristetty versiosta v3.8.0                                                                                       |
| **Google-/GitHub-kirjautuminen**                             | Eristetty versiosta v3.8.0                                                                                       |
| **Automaattinen tuonti** (kiro-cli SQLite)                   | Eristetty versiosta v3.8.0 (SQLite-polku oli jo eristetty; myös SSO-välimuistin varavaihtoehto on nyt eristetty) |
| **API-avain** (pitkäikäinen CodeWhisperer-avain)             | Ei päivitysistuntoa; avain vahvistetaan ja tallennetaan bearer-tunnistetietona                                   |

---

## Siirtohuomautus ennen versiota v3.8.0 luoduille yhteyksille

Ennen versiota v3.8.0 tuoduilla yhteyksillä ei ole erillistä OIDC-asiakasrekisteröintiä tallennettuna `providerSpecificData`-kenttään. Nämä yhteydet toimivat edelleen, mutta käyttävät jaettua sosiaalisen tunnistautumisen päivityspäätepistettä, minkä vuoksi kaksi tällaista yhteyttä voi edelleen mitätöidä toistensa tunnukset.

**Eristyksen käyttöönotto:** poista vanha yhteys kohdasta **Hallintapaneeli → Palveluntarjoajat** ja tuo se uudelleen millä tahansa tuetulla tuontimenettelyllä. Kaikki uudet yhteydet saavat automaattisesti oman asiakasrekisteröintinsä.

---

## Kahden Kiro-tilin lisääminen rinnakkain

### Edellytykset

- OmniRoute v3.8.0 tai uudempi.
- Toimiva Kiro-tili (sähköposti ja salasana tai Google-/GitHub-kirjautuminen).
- Valinnaisesti toinen Kiro-tili.

### Vaihe 1: Tuo ensimmäinen tili

1. Avaa **Hallintapaneeli → Palveluntarjoajat → Lisää palveluntarjoaja → Kiro**.
2. Valitse jokin seuraavista:
   - **Tuo tunnus** — liitä merkkijonolla `aorAAAAAG` alkava päivitystunnus.
   - **API-avain** — liitä pitkäikäinen Kiro-/CodeWhisperer-API-avain.
   - **Google-/GitHub-kirjautuminen** — suorita OAuth-menettely loppuun selaimessa.
   - **Automaattinen tuonti** — napsauta painiketta; OmniRoute lukee tunnistetiedot paikallisesta kiro-cli-tietokannasta tai polusta `~/.aws/sso/cache`.
3. Yhteys tallennetaan. Päivitystunnusta käyttävät menettelyt rekisteröivät automaattisesti erillisen OIDC-asiakkaan. API-avainta käyttävät menettelyt vahvistavat avaimen AWS:n avulla eivätkä tallenna päivitystunnusta.

### Vaihe 2: Tuo toinen tili

Toista vaihe 1 toiselle tilille. Koska jokainen tuonti luo erillisen OIDC-asiakasrekisteröinnin, yhteydet ovat täysin eristettyjä toisistaan.

### Vaihe 3: Varmista, että molemmat yhteydet ovat aktiivisia

1. **Hallintapaneeli → Palveluntarjoajat** — molempien Kiro-yhteyksien tilana pitäisi näkyä **Aktiivinen**.
2. **Hallintapaneeli → Kunto** — molempien yhteyksien pitäisi läpäistä tunnusten kuntotarkistus.

### Vaihe 4: Käytä yhdistelmää tilien väliseen reititykseen

Luo yhdistelmä, jossa molemmat yhteydet ovat kohteina, jotta kuormaa voidaan tasata niiden välillä tai toinen voi toimia varayhteytenä:

```
kiro/kiro-dev → kiro/kiro-pro
```

Katso yhdistelmien määritysohjeet tiedostosta [FEATURES.md](./FEATURES.md) ja reititysdokumentaatiosta.

---

## Yritys- / IDC-käyttäjät

Käytä AWS IAM Identity Center (IDC) -tileillä **AWS Builder ID / IDC -laitekoodi**
-kulkua kohdassa **Hallintapaneeli → Palveluntarjoajat → Kiro → Laitekoodi**. Laitekoodikulku on
aina ollut täysin eristetty. Näitä yhteyksiä ei tarvitse tuoda uudelleen.

Yrityskäyttäjät, jotka toimivat muulla kuin AWS:n oletusalueella, voivat määrittää alueen
tuodessaan yhteyden Import Token API -rajapinnan kautta:

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/import \
  -H "Content-Type: application/json" \
  -d '{"refreshToken": "aorAAAAAG...", "region": "eu-west-1"}'
```

Jos `region`-kenttä jätetään pois, sen oletusarvo on `us-east-1`.

---

## API-avaimen tuontikulku

API-avainpohjainen todennus on tarkoitettu pitkäikäisille Kiro- / AWS CodeWhisperer -haltijatunnuksille. Se
ei käytä OAuth-päivitystä, joten sillä vältetään jaetun OIDC-istunnon mitätöityminen.

### Hallintapaneeli

1. Avaa **Hallintapaneeli -> Palveluntarjoajat -> Kiro**.
2. Valitse **API-avain**.
3. Liitä API-avain ja valinnainen AWS-alue (oletuksena `us-east-1`).
4. OmniRoute vahvistaa avaimen ja tallentaa yhteyden.

### API

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/api-key \
  -H "Content-Type: application/json" \
  -d '{"apiKey": "kiro_or_codewhisperer_key", "region": "us-east-1"}'
```

### Sisäinen sopimus

API-reitti vahvistaa avaimen kutsumalla `KiroService.validateApiKey()`-funktiota, joka
käyttää `ListAvailableProfiles`-kutsua aluetta vastaavassa CodeWhisperer/Amazon Q
-päätepisteessä ja selvittää `profileArn`-arvon.

Tallennettu yhteys käyttää seuraavia tietoja:

```json
{
  "authType": "apikey",
  "providerSpecificData": {
    "authMethod": "api_key",
    "region": "us-east-1",
    "profileArn": "arn:aws:codewhisperer:..."
  }
}
```

Suorituksen aikana `KiroExecutor.buildHeaders()` lähettää avaimen muodossa
`Authorization: Bearer <key>` ja lisää merkinnän `tokentype: API_KEY`. Kiintiö- ja profiilikutsut
käyttävät samaa merkintää, jotta AWS käsittelee haltijatunnusta pitkäikäisenä API-avaimena eikä
OIDC- tai sosiaalisen kirjautumisen käyttöoikeustunnuksena.

---

## OIDC-asiakasohjelman vanheneminen

AWS SSO OIDC:n julkiset asiakasohjelmat vanhenevat yleensä 90 päivän kuluttua
(`clientSecretExpiresAt`). OmniRoute tallentaa tämän aikaleiman `providerSpecificData`-tietoihin
havaittavuutta varten. Jos yhteyden päivittäminen lakkaa toimimasta noin 90 päivän kuluttua, tuo
yhteys uudelleen saadaksesi uuden OIDC-asiakasohjelman rekisteröinnin. Automaattinen uudelleenrekisteröinti
vanhenemisen yhteydessä on kirjattu tulevaksi parannukseksi.

API-avainyhteyksillä ei ole OIDC-asiakasohjelman vanhenemisaikaa, koska niitä ei päivitetä
AWS SSO OIDC:n kautta.

---

## Vianmääritys

### Toinen tili kirjataan jatkuvasti ulos

- Tarkista molemmat yhteydet kohdassa **Hallintapaneeli → Palveluntarjoajat** ja varmista, että kummankin
  käsittelemättömässä JSON-muodossa näkyy `clientId`, jonka arvo ei ole null (nähtävissä tietokuvakkeen kautta). Jos jommastakummasta yhteydestä puuttuu
  `clientId`, se on tuotu ennen versiota v3.8.0 — tuo se uudelleen.

### Tuonti epäonnistuu virheellä "Tunnuksen vahvistaminen epäonnistui"

- Varmista, että päivitystunnus alkaa merkkijonolla `aorAAAAAG`.
- Varmista, että OmniRoute saa yhteyden osoitteeseen `https://oidc.us-east-1.amazonaws.com` (tai määritettyyn
  alueeseen). Jos käytät yrityksen välityspalvelinta, määritä palveluntarjoajakohtainen välityspalvelin kohdassa
  **Hallintapaneeli → Asetukset → Välityspalvelimet**.

### API-avaimen tuonti epäonnistuu

- Varmista, että avain on Kiro- / CodeWhisperer-API-avain eikä päivitystunnus.
- Varmista, että AWS-alue vastaa avainta/tiliä. Oletusarvo on `us-east-1`.
- Avaimella on voitava kutsua `ListAvailableProfiles`-toimintoa, sillä muuten OmniRoute ei pysty
  selvittämään vaadittua `profileArn`-arvoa.

Katso muut ongelmat pääasiallisesta [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)-tiedostosta.
