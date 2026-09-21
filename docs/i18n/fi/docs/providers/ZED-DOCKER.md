# Zed IDE Integration in Docker Environments (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/ZED-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/ZED-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/ZED-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/ZED-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/ZED-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/ZED-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/ZED-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/ZED-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/ZED-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/ZED-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/ZED-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/ZED-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/ZED-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/ZED-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/ZED-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/ZED-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/ZED-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/ZED-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/ZED-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/ZED-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/ZED-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/ZED-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/ZED-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/ZED-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/ZED-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/ZED-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/ZED-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/ZED-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/ZED-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/ZED-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/ZED-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/ZED-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/ZED-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/ZED-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/ZED-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/ZED-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/ZED-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/ZED-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/ZED-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/ZED-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/ZED-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/ZED-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/ZED-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/ZED-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/ZED-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/ZED-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/ZED-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/ZED-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/ZED-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/ZED-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/ZED-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/ZED-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/ZED-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/ZED-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/ZED-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/ZED-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/ZED-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/ZED-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/ZED-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/ZED-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/ZED-DOCKER.md)

---

Kun OmniRoute toimii Dockerissa, tavallinen "Tuo Zedin avainnipusta" -toiminto epäonnistuu,
koska säilö ei voi käyttää isäntäkäyttöjärjestelmän avainnippupalvelua (Linuxissa libsecret,
macOS:ssä Avainnippu ja Windowsissa Tunnistetietojen hallinta), eivätkä isäntätiedostojärjestelmän
Zed-määrityshakemistot oletusarvoisesti näy säilön sisällä.

## Miksi avainnipusta tuonti epäonnistuu Dockerissa

Säilön sisällä ilmenee kaksi estävää ongelmaa:

1. **Tiedostojärjestelmän eristys** — `isZedInstalled()` etsii hakemistoa `~/.config/zed` (Linux),
   `~/Library/Application Support/Zed` (macOS) tai vastaavaa Windows-hakemistoa. Nämä polut
   sijaitsevat isäntäkoneella, eivätkä ne ole käytettävissä, ellei niitä liitetä erikseen taltiona.
2. **IPC-eristys** — Vaikka määrityshakemisto olisi liitetty, natiivi `keytar`-moduuli
   kommunikoi käyttöjärjestelmän avainnippupalvelun kanssa Unix-pistokkeen tai D-Bus-istunnon kautta.
   Kumpaakaan ei oletusarvoisesti välitetä säilöön, joten tunnistetietojen lukeminen epäonnistuu aina.

OmniRoute tunnistaa Docker-ympäristön kahden heuristiikan avulla:

- Tiedoston `/.dockerenv` olemassaolo (Docker-daemon kirjoittaa sen säilön käynnistyessä).
- Merkkijonon `docker` esiintyminen tiedostossa `/proc/1/cgroup` (Linux cgroup v1).

Kun jompikumpi heuristiikka täsmää, tuontireitti palauttaa HTTP 422 -vastauksen, jossa on
`zedDockerEnvironment: true`, sekä viestin, joka ohjaa Manuaalinen tunnuksen tuonti -välilehdelle.

## Manuaalinen tunnuksen tuonti -välilehden käyttäminen

1. Avaa **Hallintapaneeli → Palveluntarjoajat → Zed**.
2. **Manuaalinen tunnuksen tuonti** -paneeli näkyy avainnipusta tuonnin kortin alapuolella. Kun
   OmniRoute tunnistaa Dockerin, tämä paneeli laajenee automaattisesti ensimmäisen epäonnistuneen
   avainnipusta tuonnin jälkeen.
3. Valitse palveluntarjoaja avattavasta valikosta (OpenAI, Anthropic, Google, Mistral, xAI,
   OpenRouter tai DeepSeek).
4. Liitä API-avain salasanakenttään.
5. Napsauta **Tuo**.

Avain tallennetaan uutena palveluntarjoajayhteytenä nimellä
`Zed Manual Import (<provider>)`.

## Minne Zed tallentaa API-avaimet isäntäkoneella

Zed tallentaa tekoälypalveluntarjoajien avaimet käyttöjärjestelmän avainnippuun palvelunimillä, kuten
`zed-openai`, `ai.zed.openai`, `zed-anthropic` jne. Voit noutaa ne manuaalista
tuontia varten seuraavista paikoista:

**Linux**

```
~/.config/zed/settings.json
```

`language_models`-osio sisältää palveluntarjoajien määritykset. Zedin käyttöliittymän kautta
avainnippuun tallennetut avaimet eivät ole selväkielisinä tiedostossa `settings.json`; nouda ne
avainnipun katseluohjelmalla, kuten GNOME Keyring / Seahorse, tai suorittamalla:

```bash
secret-tool lookup service zed-openai account api-key
```

**macOS**

```
~/Library/Application Support/Zed/settings.json
```

Avainnipun tietueet löytyvät **Keychain Access.app** -sovelluksesta hakemalla merkkijonoa `zed`.

## Taltiointivaihtoehto (edistynyt)

Voit halutessasi liittää Zedin määrityshakemiston vain luku -tilassa säilöön.
Tämä ei korjaa avainnippuongelmaa, mutta siitä voi olla hyötyä tuleville ominaisuuksille, jotka lukevat
Zedin muita kuin salaisia määritysarvoja (esimerkiksi malliasetuksia).

```yaml
# docker-compose.yml-katkelma
services:
  omniroute:
    image: omniroute:latest
    volumes:
      # Linux-isäntäkone
      - "${HOME}/.config/zed:/host-zed-config:ro"
      # macOS-isäntäkone (poista sen sijaan kommentointi)
      # - "${HOME}/Library/Application Support/Zed:/host-zed-config:ro"
    environment:
      # Tulevaisuudessa: ZED_CONFIG_PATH=/host-zed-config
      PORT: "20128"
```

Huomautus: `ZED_CONFIG_PATH`-ympäristömuuttujan ohitusta ei ole vielä toteutettu. Tämä
katkelma toimii viitteenä, kun kyseinen ominaisuus lisätään.

## Manuaalisen tuonnin API

Manuaalisen tuonnin päätepistettä voi kutsua myös suoraan:

```
POST /api/providers/zed/manual-import
Content-Type: application/json
Authorization: Bearer <oma_live_or_manage_scoped_api_key>

{
  "provider": "openai",
  "token": "sk-...",
  "label": "Oma Zed OpenAI -avaimeni"   // valinnainen
}
```

Onnistuessaan se palauttaa:

```json
{ "success": true, "connectionId": "...", "provider": "openai" }
```

## Vianmääritys

| Oire                                         | Syy                                        | Korjaus                                            |
| -------------------------------------------- | ------------------------------------------ | -------------------------------------------------- |
| 422 + `zedDockerEnvironment: true`           | Suoritetaan Dockerissa                     | Käytä Manuaalinen tunnuksen tuonti -välilehteä     |
| 404 + `zedInstalled: false`                  | Zediä ei ole asennettu isäntäkoneelle      | Asenna Zed tai käytä manuaalista tuontia           |
| 403 + pääsy avainnippuun estetty             | Käyttöjärjestelmä esti pääsyn avainnippuun | Myönnä käyttöoikeus käyttöjärjestelmän kehotteessa |
| 404 + avainnippupalvelu ei ole käytettävissä | `libsecret` puuttuu Linuxista              | Asenna `libsecret-1-dev`                           |
