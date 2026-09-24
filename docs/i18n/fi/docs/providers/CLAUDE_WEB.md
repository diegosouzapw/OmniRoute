# Providers — Claude Web (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CLAUDE_WEB.md) · 🇪🇹 [am](../../../am/docs/providers/CLAUDE_WEB.md) · 🇸🇦 [ar](../../../ar/docs/providers/CLAUDE_WEB.md) · 🇦🇿 [az](../../../az/docs/providers/CLAUDE_WEB.md) · 🇧🇬 [bg](../../../bg/docs/providers/CLAUDE_WEB.md) · 🇧🇩 [bn](../../../bn/docs/providers/CLAUDE_WEB.md) · 🇧🇦 [bs](../../../bs/docs/providers/CLAUDE_WEB.md) · 🇨🇿 [cs](../../../cs/docs/providers/CLAUDE_WEB.md) · 🇩🇰 [da](../../../da/docs/providers/CLAUDE_WEB.md) · 🇩🇪 [de](../../../de/docs/providers/CLAUDE_WEB.md) · 🇬🇷 [el](../../../el/docs/providers/CLAUDE_WEB.md) · 🇪🇸 [es](../../../es/docs/providers/CLAUDE_WEB.md) · 🇪🇪 [et](../../../et/docs/providers/CLAUDE_WEB.md) · 🇮🇷 [fa](../../../fa/docs/providers/CLAUDE_WEB.md) · 🇫🇷 [fr](../../../fr/docs/providers/CLAUDE_WEB.md) · 🇮🇪 [ga](../../../ga/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [gu](../../../gu/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ha](../../../ha/docs/providers/CLAUDE_WEB.md) · 🇮🇱 [he](../../../he/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [hi](../../../hi/docs/providers/CLAUDE_WEB.md) · 🇭🇷 [hr](../../../hr/docs/providers/CLAUDE_WEB.md) · 🇭🇺 [hu](../../../hu/docs/providers/CLAUDE_WEB.md) · 🇦🇲 [hy](../../../hy/docs/providers/CLAUDE_WEB.md) · 🇮🇩 [id](../../../id/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ig](../../../ig/docs/providers/CLAUDE_WEB.md) · 🇮🇹 [it](../../../it/docs/providers/CLAUDE_WEB.md) · 🇯🇵 [ja](../../../ja/docs/providers/CLAUDE_WEB.md) · 🇬🇪 [ka](../../../ka/docs/providers/CLAUDE_WEB.md) · 🇰🇭 [km](../../../km/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [kn](../../../kn/docs/providers/CLAUDE_WEB.md) · 🇰🇷 [ko](../../../ko/docs/providers/CLAUDE_WEB.md) · 🇱🇹 [lt](../../../lt/docs/providers/CLAUDE_WEB.md) · 🇱🇻 [lv](../../../lv/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ml](../../../ml/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [mr](../../../mr/docs/providers/CLAUDE_WEB.md) · 🇲🇾 [ms](../../../ms/docs/providers/CLAUDE_WEB.md) · 🇲🇹 [mt](../../../mt/docs/providers/CLAUDE_WEB.md) · 🇲🇲 [my](../../../my/docs/providers/CLAUDE_WEB.md) · 🇳🇵 [ne](../../../ne/docs/providers/CLAUDE_WEB.md) · 🇳🇱 [nl](../../../nl/docs/providers/CLAUDE_WEB.md) · 🇳🇴 [no](../../../no/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [or](../../../or/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [pa](../../../pa/docs/providers/CLAUDE_WEB.md) · 🇵🇭 [phi](../../../phi/docs/providers/CLAUDE_WEB.md) · 🇵🇱 [pl](../../../pl/docs/providers/CLAUDE_WEB.md) · 🇵🇹 [pt](../../../pt/docs/providers/CLAUDE_WEB.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CLAUDE_WEB.md) · 🇷🇴 [ro](../../../ro/docs/providers/CLAUDE_WEB.md) · 🇷🇺 [ru](../../../ru/docs/providers/CLAUDE_WEB.md) · 🇱🇰 [si](../../../si/docs/providers/CLAUDE_WEB.md) · 🇸🇰 [sk](../../../sk/docs/providers/CLAUDE_WEB.md) · 🇸🇮 [sl](../../../sl/docs/providers/CLAUDE_WEB.md) · 🇷🇸 [sr](../../../sr/docs/providers/CLAUDE_WEB.md) · 🇸🇪 [sv](../../../sv/docs/providers/CLAUDE_WEB.md) · 🇰🇪 [sw](../../../sw/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ta](../../../ta/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [te](../../../te/docs/providers/CLAUDE_WEB.md) · 🇹🇭 [th](../../../th/docs/providers/CLAUDE_WEB.md) · 🇹🇷 [tr](../../../tr/docs/providers/CLAUDE_WEB.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CLAUDE_WEB.md) · 🇵🇰 [ur](../../../ur/docs/providers/CLAUDE_WEB.md) · 🇺🇿 [uz](../../../uz/docs/providers/CLAUDE_WEB.md) · 🇻🇳 [vi](../../../vi/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [yo](../../../yo/docs/providers/CLAUDE_WEB.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CLAUDE_WEB.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CLAUDE_WEB.md)

---

## `claude-web`

`claude-web` lähettää OpenAI-muotoisia keskustelupyyntöjä todennetun `claude.ai`-selainistunnon kautta. Suorittaja normalisoi annetun evästeen, selvittää yhden todennetun organisaation, valmistelee keskustelun tilan, valitsee suoran tai selainpohjaisen siirtotavan ja muuntaa ylävirran SSE-vastauksen tarkasti. Orkestrointi sijaitsee tiedostossa
`open-sse/executors/claude-web.ts:320`.

> **Ovatko Web Cookie -palveluntarjoajat sinulle uusia?**
>
> Lue yleinen määritysprosessi, todennusohjeet, rajoitukset ja vianmääritys tiedostosta **`docs/getting-started/WEB-COOKIE-GUIDE.md`** ennen tämän palveluntarjoajakohtaisen oppaan noudattamista.

### Malliluettelo

Palveluntarjoajarekisteri tarjoaa tällä hetkellä täsmälleen nämä seitsemän staattista mallitunnusta
(`open-sse/config/providers/registry/claude/web/index.ts:11`):

| Mallitunnus                 | Näyttönimi              |
| --------------------------- | ----------------------- |
| `claude-fable-5`            | Claude Fable 5 (web)    |
| `claude-opus-4-8`           | Claude Opus 4.8 (web)   |
| `claude-sonnet-5`           | Claude Sonnet 5 (web)   |
| `claude-haiku-4-5-20251001` | Claude Haiku 4.5 (web)  |
| `claude-opus-4-7`           | Claude Opus 4.7 (web)   |
| `claude-opus-4-6`           | Claude Opus 4.6 (web)   |
| `claude-sonnet-4-6`         | Claude Sonnet 4.6 (web) |

Dynaamista mallien hakua ei ole toteutettu tälle palveluntarjoajalle. Yllä oleva luettelo on
ajonaikainen malliluettelo.

### Tunnistetiedot ja organisaation selvittäminen

Anna joko täydellinen `claude.ai`-palvelun Cookie-otsake tai pelkkä istuntoarvo. Pelkät arvot
normalisoidaan `sessionKey`-arvoksi; muut evästeet säilytetään, jos ne on annettu. Suorittaja hyväksyy
evästeen `cookie`- tai `apiKey`-kentän kautta ja
lukee valinnaiset `deviceId`- ja `orgId`-arvot yhteystiedoista
(`open-sse/executors/claude-web.ts:72`).

Jos `orgId` puuttuu, suorittaja kutsuu osoitetta `GET https://claude.ai/api/organizations` ja käyttää ensimmäistä
todennetun Claude Web -istunnon palauttamaa organisaatiota
(`open-sse/executors/claude-web.ts:141`). Se estää toiminnan turvallisesti, jos kelvollista organisaatiota ei
palauteta, ilmoittaa hylätystä istunnon valtuutuksesta tilakoodilla 401 ja erottaa Cloudflare-
haasteen todennusvirheestä.

### Keskustelutoiminnot

Valinnainen ylätason `claude_web`-objekti on tiukasti määritelty. Tuntemattomat kentät hylätään. Sen
hyväksymät kentät määritellään tiedostossa `open-sse/executors/claude-web/session.ts:50`:

| Kenttä                | Merkitys                                                          |
| --------------------- | ----------------------------------------------------------------- |
| `operation`           | Oletuksena `completion`; käytä uusintavuoroon arvoa `retry`       |
| `conversation_id`     | Olemassa olevan keskustelun eksplisiittinen UUID                  |
| `parent_message_uuid` | Ylemmän avustajaviestin eksplisiittinen UUID                      |
| `timezone`            | Kelvollinen IANA-aikavyöhykkeen nimi                              |
| `locale`              | Rakenteellisesti kelvollinen alueasetus                           |
| `tool_states`         | Valinnainen tilin työkalutilojen taulukko, enintään 128 merkintää |

Valmistellut pyynnöt käyttävät jompaakumpaa kahdesta ylävirran päätepisteestä
(`open-sse/executors/claude-web.ts:203`):

- Uusi vuoro tai jatkovuoro lähetetään osoitteeseen
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/completion`.
- Uusintayritys lähetetään osoitteeseen
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/retry_completion`.

Uusi vuoro sisältää `create_conversation_params`-kentän. Välimuistissa oleva tai eksplisiittisesti linkitetty jatkovuoro
sisältää `parent_message_uuid`-kentän ja jättää `create_conversation_params`-kentän pois. Uusintayritys edellyttää sekä
keskustelun että ylemmän viestin tilaa eikä lähetä kehotetta
(`open-sse/executors/claude-web/session.ts:254`). Uudet keskustelut avaavat todennetun
käyttöliittymän polussa `/new`; välimuistissa olevat tai eksplisiittisesti linkitetyt jatkovuorot avaavat kyseisen keskustelusivun
(`open-sse/executors/claude-web/session.ts:324`).

Keskustelun tila on muistissa oleva välimuisti, jonka avaimena käytetään SHA-256-pohjaista tilirajausta ja kutsujan
kanonista transkriptiota. Merkinnät vanhenevat 30 minuutin kuluttua, ja välimuisti on rajoitettu 5 000 merkintään
(`open-sse/executors/claude-web/session.ts:12`). Tila vahvistetaan vasta, kun tiukka
suoratoistojäsennin havaitsee `message_stop`-tapahtuman; prosessin uudelleenkäynnistys hävittää tilan. Jos välimuistiosumaa ei ole,
useita viestejä sisältävä pyyntö sarjallistetaan yhdeksi palautuskehotteeksi sen sijaan, että aiemmat viestit
jätettäisiin hiljaisesti pois.

Alueasetus ja aikavyöhyke käyttävät seuraavaa ensisijaisuusjärjestystä: pyynnön `claude_web`-arvo, yhteyden arvo,
ajonaikainen arvo ja lopuksi alueasetukselle `en-US` tai aikavyöhykkeelle `UTC`
(`open-sse/executors/claude-web/session.ts:218`).

### Työkalut ja pyyntöjen hyötykuormat

Suorat pyynnöt muuntavat vain kutsujan antamat rakenteellisesti kelvolliset OpenAI-funktiotyökalut.
Keksittyä staattista oletustyökaluluetteloa ei ole
(`open-sse/executors/claude-web/payload.ts:102`).

Selainpyynnöt sen sijaan kaappaavat todennetun käyttöliittymäpyynnön ja säilyttävät sen tilityökalut,
työkalutilat ja mukautetut tyylit. Valmistellut keskustelu-, malli-, päättely-, kehote- ja
viestin UUID-kentät ohittavat edelleen kaapatun pyynnön arvot
(`open-sse/executors/claude-web/browserTransport.ts:175`). Selainmallipohjat rajataan
tilin, organisaation, evästeen, alueasetuksen ja aikavyöhykkeen tiivisteen perusteella, ja ne vanhenevat 30 minuutin kuluttua
(`open-sse/executors/claude-web/browserTransport.ts:11`,
`open-sse/executors/claude-web/browserTransport.ts:158`). Kun suorassa pyynnössä ei ole kutsujan
työkaluja, se voi käyttää kyseistä rajattua mallipohjaa uudelleen; kutsujan eksplisiittiset työkalut ovat ensisijaisia
(`open-sse/executors/claude-web/browserTransport.ts:214`).

### Siirtotavan valinta

Oletuspolku on `sendClaudeWebDirect()`, joka kutsuu `tlsFetchClaude()`-funktiota määritetyllä
Chrome 146 -profiililla ja annetulla evästeellä (`open-sse/services/claudeTlsClient.ts:23`). Se ei
käynnistä haasteenratkaisijaa eikä luo korvaavaa evästettä.

Aseta `WEB_COOKIE_USE_BROWSER` arvoon `1`, `true` tai `on`, jotta tilikohtainen selainsovitin toimii ensisijaisena siirtotapana. Aseta `OMNIROUTE_BROWSER_POOL` johonkin samoista arvoista, jotta tunnistetun Cloudflare 403 -haasteen yhteydessä voidaan siirtyä suorasta siirtotavasta selainsovittimeen (`open-sse/executors/claude-web.ts:195`). Muut HTTP-virheet eivät käynnistä tätä varamenettelyä.

Selainsovitin säilyttää evästeet samassa poolatussa Playwright-kontekstissa, käyttää edellä kuvattua rajattua hajautettua avainta ja lähettää vastauksen kyseisestä kontekstista (`open-sse/executors/claude-web/browserTransport.ts:444`). Se ei koskaan vie selaimen ratkaisemaa evästettä suoraan TLS-asiakasohjelmaan. Selainuudelleenyritykset edellyttävät vanhentumatonta käyttöliittymämallia, joka on sidottu samaan todelliseen Playwright-kontekstiin (`open-sse/executors/claude-web/browserTransport.ts:467`). Selainvastaukset luetaan inkrementaalisesti todennetulla sivulla, pyyntöjen peruutuksia noudatetaan ja ylävirran runko peruutetaan heti, kun sen koko ylittää 16 MiB (`open-sse/executors/claude-web/browserTransport.ts:259`).

Suorittaja palauttaa jaetulle pyyntölokittajalle peitetyn auditointiprojektion: organisaation, keskustelun ja viestien UUID-tunnisteet, kehote, työkalumääritykset, evästeet ja laitetunnisteet jätetään pois (`open-sse/executors/claude-web.ts:237`,
`open-sse/executors/claude-web.ts:252`). Myös siirtopoikkeukset palauttavat yleisen yhteysvirheen poikkeuksen viestin sijaan.

### SSE:n toiminta

`createClaudeWebResponse()` käsittelee LF- tai CRLF-kehystyksen ja moniriviset `data:`-kentät. Se muuntaa tekstin deltat `content`-kenttään, päättelyn deltat `reasoning_content`-kenttään ja tunnetut metatietotapahtumat vastauksen `claude_web`-laajennukseen. Kukin metatietotapahtuma projisoidaan oman sallittujen kenttien luettelonsa kautta (`open-sse/executors/claude-web/stream.ts:37`). Keskustelun, ylätason viestin, avustajan viestin ja toiminnon metatiedot palautetaan myös `X-OmniRoute-Claude-Web-*`-otsakkeissa (`open-sse/executors/claude-web/stream.ts:364`).

Jäsennin keskeyttää turvallisesti virheellisesti muotoillun JSON-datan, ylävirran `error`-tapahtumien, tuntemattomien tapahtumatyyppien, virheellisen järjestyksen, sisältölohkojen ristiriitojen tai ennen `message_stop`-tapahtumaa saapuvan tiedoston lopun yhteydessä. Suoratoistotuloste tuottaa yhden lopetuslohkon ja yhden `[DONE]`-merkinnän; puskuroitu tuloste käyttää samaa jäsennintä. Jäsennin käsittelee `message_stop`-tapahtumaa välittömästi päättävänä, peruuttaa jäljellä olevan ylävirran datan ja välittää alavirran peruutuksen ylävirran lukijalle (`open-sse/executors/claude-web/stream.ts:461`,
`open-sse/executors/claude-web/stream.ts:563`). Päättämättömien SSE-rivien ja kertyneiden tapahtumien enimmäiskoko on 1 MiB (`open-sse/executors/claude-web/stream.ts:17`,
`open-sse/executors/claude-web/stream.ts:62`).

### Tiedostot

| Tiedosto                                                 | Tarkoitus                                   |
| -------------------------------------------------------- | ------------------------------------------- |
| `open-sse/config/providers/registry/claude/web/index.ts` | Staattinen palveluntarjoajan mallirekisteri |
| `open-sse/executors/claude-web.ts`                       | Suorittajan orkestrointi                    |
| `open-sse/executors/claude-web/payload.ts`               | Hyötykuorman ja työkalujen muunnos          |
| `open-sse/executors/claude-web/session.ts`               | Vuoron tila ja keskusteluvälimuisti         |
| `open-sse/executors/claude-web/transport.ts`             | Suoran siirtotavan sovitin                  |
| `open-sse/executors/claude-web/browserTransport.ts`      | Tilikohtainen selainsovitin                 |
| `open-sse/executors/claude-web/stream.ts`                | Tiukka SSE-muunnos                          |
| `open-sse/services/claudeTlsClient.ts`                   | Natiivi TLS-siirtotapa                      |
| `open-sse/services/browserPool.ts`                       | Poolatut Playwright-kontekstit              |

### Testaus

Suorita deterministinen Claude Web -testikokonaisuus ilman oikeita tunnistetietoja:

```powershell
node --import tsx/esm --test tests/unit/claude-web-auto-refresh.test.ts tests/unit/claude-web-browser-transport.test.ts tests/unit/claude-web-executor-split.test.ts tests/unit/claude-web-live-alignment.test.ts tests/unit/claude-web-payload-runtime.test.ts tests/unit/claude-web-session.test.ts tests/unit/claude-web-sonnet5-registry-6209.test.ts tests/unit/claude-web-stream.test.ts tests/unit/claude-web-transport.test.ts tests/unit/claude-web.test.ts tests/unit/issue-6662-repro.test.ts
```

Playwrightista riippuvat testit tiedostossa `tests/unit/claude-web-auto-refresh.test.ts` ohitetaan nimenomaisesti. Tässä tietovarastossa ei tällä hetkellä ole määritetty tunnistetietoja käyttävää Claude Webin live-testikomentosarjaa, joten nämä ohitetut testit eivät ole todiste toimivuudesta ajonaikaisessa ympäristössä.

### Määritys

1. Käynnistä OmniRoute komennolla `npm run dev` tai valmiiksi käännetystä asennuksesta.
2. Avaa Hallintapaneeli → Palveluntarjoajat → Lisää palveluntarjoaja.
3. Valitse Web Cookie -luokka ja Claude Web.
4. Liitä todennetusta `claude.ai`-pyynnöstä kopioitu Cookie-otsake kokonaisuudessaan.
