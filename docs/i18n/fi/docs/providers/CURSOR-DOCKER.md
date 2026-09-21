# Cursor Provider in Docker Environments (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR-DOCKER.md)

---

Kun OmniRoute suoritetaan Dockerissa, vanhat **Tuo Cursor IDE:stä**- /
`cursor-agent`-työnkulut epäonnistuvat, koska säilö ei näe isäntäkoneen Cursor-
asennusta. Käytä sen sijaan **Kirjaudu Cursorilla** -toimintoa (deep-control PKCE).

## Miksi IDE-/CLI-tuonti epäonnistuu Dockerissa

1. **Tiedostojärjestelmän eristys** — Automaattinen tuonti etsii Linux-polkuja, kuten
   `~/.config/Cursor/User/globalStorage/state.vscdb`, säilön _sisältä_.
   Docker Desktop for macOS ei liitä isäntäkoneen IDE-tietokantaa oletusarvoisesti, ja
   säilön käyttöjärjestelmä on Linux, vaikka isäntäkone olisi Darwin.
2. **Ei `cursor-agent`-binääriä** — Viralliset OmniRoute-levykuvat eivät sisällä
   `cursor-agent`-binääriä. Saatavilla olevat mallit suoritti aiemmin
   `cursor-agent --list-models` -komennon ja käytti epäonnistumisen yhteydessä staattista luetteloa.
3. **Väärä binääri** — **Älä** liitä macOS:n `cursor-agent`-binääriä bind mount
   -liitoksella Linux-säilöön. Sitä ei voi suorittaa siellä.

## Suositus: Kirjaudu Cursorilla

1. Avaa **Hallintapaneeli → Palveluntarjoajat → Cursor**.
2. Valitse **Kirjaudu Cursorilla** -välilehti.
3. Napsauta **Kirjaudu Cursorilla** — OmniRoute avaa osoitteen
   `https://cursor.com/loginDeepControl?…` **isäntäkoneen** selaimessa.
4. Hyväksy kirjautuminen selaimessa ja palaa sitten hallintapaneeliin. OmniRoute
   kyselee `api2.cursor.sh/auth/poll`-rajapintaa, kunnes tunnukset saapuvat.
5. OmniRoute tallentaa **käyttö- ja päivitystunnukset** ja päivittää ne osoitteen
   `https://api2.cursor.sh/auth/exchange_user_api_key` kautta.

Tämä menetelmä ei vaadi Cursor IDE:tä tai `cursor-agent`-binääriä säilön sisällä.

## Mallien tunnistus

Kun yhteys on kirjautuneena, **Saatavilla olevat mallit / Automaattinen synkronointi** suosii Cursorin
HTTP `AiService/AvailableModels` -luetteloa ja käyttää yhteyden Bearer-tunnusta.
Jos tämä epäonnistuu, OmniRoute yrittää edelleen käyttää isäntäkoneen `cursor-agent`-binääriä
(jos se on käytettävissä) ja sen jälkeen staattista rekisterin alkuaineistoa.

OmniRoute näyttää luettelossa aina mallin **`auto`** (näyttönimi ”Auto”) sekä
OpenCodex-tyyliset reititystilat **`auto-cost`**, **`auto-balance`** ja
**`auto-intelligence`**. Siirtoyhteydessä nämä vastaavat Cursorin `default`-mallia
(ja kolmessa muunnelmassa käytetään `optimization`-ModelParameter-parametria). Suosi
mallia `cu/auto`, kun premium-mallien käyttöoikeus on loppunut — Auto-mallilla on usein vielä käyttökiintiötä.

### Reaaliaikainen luettelo on yksinomainen synkronoinnin jälkeen

Onnistuneen Cursor-mallisynkronoinnin jälkeen (`cursor-agent --list-models` → tallennettu
synkronoitu luettelo tai yllä kuvattu Bearer-todennettu `AvailableModels`-haku)
**hallintapaneeli**, **`/v1/models`** ja **Testaa kaikki** näyttävät:

1. Reaaliaikaisen synkronoinnin palauttamat mallit
2. Lisätyt automaattisen reitittimen tunnisteet: `auto`, `auto-cost`, `auto-balance`, `auto-intelligence`
3. Operaattorin **mukautetut** mallit (tuodut / manuaaliset) — niitä ei koskaan poisteta synkronoinnin yhteydessä

Hakemiston
`open-sse/config/providers/registry/cursor/` laaja staattinen rekisteri on tarkoitettu **vain offline-varajärjestelmäksi**. Kun
synkronoitu luettelo on tyhjä (tai tunnistus epäonnistuu), listaus käyttää varana kyseistä rekisteriä.

Käyttöpanostustason päätteellä varustettuja tunnisteita (esimerkiksi `claude-4.6-sonnet-high`) voidaan silti
**pyytää** suorituksen aikana: `resolveRequestedModel` irrottaa päätteen siirrettäväksi
`ModelParameter`-parametriksi. Yksinomainen listaus piilottaa tarkoituksella nämä staattiset muunnelmat
Testaa kaikki -toiminnosta, jotta testipyynnöt vastaavat Cursorin tosiasiassa saatavilla oleviksi ilmoittamia malleja.

### Apufunktiot

- `providerUsesExclusiveSyncedListing("cursor"|"cu")` —
  `src/lib/providers/modelListingCapability.ts`
- `mergeProviderModelListing` — hallintapaneelin yhdistäminen
- `ensureCursorAutoCatalogEntry` — auto*-tunnisteiden lisäys tunnistuksen ja listauksen yhteydessä
- `shouldSuppressStaticModelForExclusiveListing` — `/v1/models`-staattinen silmukka

## Palveluntarjoajan rajat (kiintiö)

Cursorin **Käyttö → Palveluntarjoajan rajat** käyttää Bearer-rajapintoja palvelussa `api2.cursor.sh`
(`GetCurrentPeriodUsage` → käytön yhteenveto → auth/usage) PKCE:n tai tunnuksen
tuonnin jälkeen. Vanha evästeisiin ja `cursor.com`-hallintapaneeliin perustuva polku säilyy viimeisenä varavaihtoehtona
vanhemmille IDE:stä tuoduille istunnoille.

Ikkunoihin sisältyvät yleensä **Yhteensä**, **Auto + Composer** ja **API**. Jos
rajat näyttävät tyhjiltä, suorita **Kirjaudu Cursorilla** uudelleen tai tuo tunnukset uudelleen (pelkkää IDE-tuontia
ei enää vaadita).

## Tyhjät vuorot / käyttökiintiö loppunut

Kun Cursor hyväksyy Run-pyynnön mutta ei palauta avustajan tekstiä (yleistä, kun premium-
käyttökiintiö on loppunut), OmniRoute näyttää toimintaohjeita sisältävän **429**-virheen (kiintiöviitteet) tai
**502**-virheen ohjeineen — ei pelkkää ”Palveluntarjoaja palautti tyhjää sisältöä” -viestiä. Suoratoiston
virheet, kuten `not_found: AI Model Not Found` (käyttöjakson kiintiö on loppunut), luokitellaan
**Cursorin nopeusraja / käyttökiintiö ylitetty** -virheiksi, ja viesti säilytetään
SSE-putken läpi (jaettu tyhjän suoratoiston suojaus ei korvaa jo lähetettyä
virhettä). Tarkista Palveluntarjoajan rajat, kokeile mallia **`auto`** tai korota
Cursor-tilauksen rajoja.

## Asiakasversio (headless)

Ilman paikallista `cursor-agent`-asennusta OmniRoute selvittää
`x-cursor-client-version`-arvon ensin ympäristömuuttujasta `CURSOR_AGENT_CLI_VERSION`, sitten levylle välimuistiin tallennetusta
Cursorin asennusskriptin tietojen poiminnasta ja lopuksi kiinnitetystä koontitunnisteesta. Ohita arvo tarvittaessa
ympäristömuuttujalla `CURSOR_AGENT_CLI_VERSION`.

## Varavaihtoehto: manuaalinen tunnuksen tuonti

Jos selainkirjautumista ei voi suorittaa loppuun:

1. Poimi tunnukset isäntäkoneella Cursorin `state.vscdb`-tiedostosta:

   ```bash
   sqlite3 "$HOME/Library/Application Support/Cursor/User/globalStorage/state.vscdb" \
     "SELECT key, value FROM ItemTable WHERE key IN ('cursorAuth/accessToken','cursorAuth/refreshToken','storage.serviceMachineId');"
   ```

2. Avaa Cursorin todennusikkunassa **Tuo tunnus**.
3. Liitä **käyttötunnus** ja, jos saatavilla, **päivitystunnus** (vaaditaan
   automaattiseen päivitykseen). Konetunnus on valinnainen.

Pelkästään käyttötunnuksen sisältävät tuonnit toimivat edelleen, mutta vanhenevat ilman päivitystunnusta —
tuo tunnus uudelleen, kun keskustelu palauttaa todennusvirheitä.

## Aiheeseen liittyvää

- Zedin Docker-ohjeistus: [`docs/providers/ZED-DOCKER.md`](./ZED-DOCKER.md)
- OpenCodexin Cursor-kirjautumisen viite (ulkoinen):
  https://github.com/lidge-jun/opencodex/blob/main/src/oauth/cursor.ts
