# AgentRouter Setup Guide (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/AGENTROUTER.md) · 🇪🇹 [am](../../../am/docs/providers/AGENTROUTER.md) · 🇸🇦 [ar](../../../ar/docs/providers/AGENTROUTER.md) · 🇦🇿 [az](../../../az/docs/providers/AGENTROUTER.md) · 🇧🇬 [bg](../../../bg/docs/providers/AGENTROUTER.md) · 🇧🇩 [bn](../../../bn/docs/providers/AGENTROUTER.md) · 🇨🇿 [cs](../../../cs/docs/providers/AGENTROUTER.md) · 🇩🇰 [da](../../../da/docs/providers/AGENTROUTER.md) · 🇩🇪 [de](../../../de/docs/providers/AGENTROUTER.md) · 🇬🇷 [el](../../../el/docs/providers/AGENTROUTER.md) · 🇪🇸 [es](../../../es/docs/providers/AGENTROUTER.md) · 🇪🇪 [et](../../../et/docs/providers/AGENTROUTER.md) · 🇮🇷 [fa](../../../fa/docs/providers/AGENTROUTER.md) · 🇫🇷 [fr](../../../fr/docs/providers/AGENTROUTER.md) · 🇮🇪 [ga](../../../ga/docs/providers/AGENTROUTER.md) · 🇮🇳 [gu](../../../gu/docs/providers/AGENTROUTER.md) · 🇳🇬 [ha](../../../ha/docs/providers/AGENTROUTER.md) · 🇮🇱 [he](../../../he/docs/providers/AGENTROUTER.md) · 🇮🇳 [hi](../../../hi/docs/providers/AGENTROUTER.md) · 🇭🇷 [hr](../../../hr/docs/providers/AGENTROUTER.md) · 🇭🇺 [hu](../../../hu/docs/providers/AGENTROUTER.md) · 🇦🇲 [hy](../../../hy/docs/providers/AGENTROUTER.md) · 🇮🇩 [id](../../../id/docs/providers/AGENTROUTER.md) · 🇳🇬 [ig](../../../ig/docs/providers/AGENTROUTER.md) · 🇮🇹 [it](../../../it/docs/providers/AGENTROUTER.md) · 🇯🇵 [ja](../../../ja/docs/providers/AGENTROUTER.md) · 🇬🇪 [ka](../../../ka/docs/providers/AGENTROUTER.md) · 🇰🇭 [km](../../../km/docs/providers/AGENTROUTER.md) · 🇮🇳 [kn](../../../kn/docs/providers/AGENTROUTER.md) · 🇰🇷 [ko](../../../ko/docs/providers/AGENTROUTER.md) · 🇱🇹 [lt](../../../lt/docs/providers/AGENTROUTER.md) · 🇱🇻 [lv](../../../lv/docs/providers/AGENTROUTER.md) · 🇮🇳 [ml](../../../ml/docs/providers/AGENTROUTER.md) · 🇮🇳 [mr](../../../mr/docs/providers/AGENTROUTER.md) · 🇲🇾 [ms](../../../ms/docs/providers/AGENTROUTER.md) · 🇲🇹 [mt](../../../mt/docs/providers/AGENTROUTER.md) · 🇲🇲 [my](../../../my/docs/providers/AGENTROUTER.md) · 🇳🇵 [ne](../../../ne/docs/providers/AGENTROUTER.md) · 🇳🇱 [nl](../../../nl/docs/providers/AGENTROUTER.md) · 🇳🇴 [no](../../../no/docs/providers/AGENTROUTER.md) · 🇮🇳 [or](../../../or/docs/providers/AGENTROUTER.md) · 🇮🇳 [pa](../../../pa/docs/providers/AGENTROUTER.md) · 🇵🇭 [phi](../../../phi/docs/providers/AGENTROUTER.md) · 🇵🇱 [pl](../../../pl/docs/providers/AGENTROUTER.md) · 🇵🇹 [pt](../../../pt/docs/providers/AGENTROUTER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/AGENTROUTER.md) · 🇷🇴 [ro](../../../ro/docs/providers/AGENTROUTER.md) · 🇷🇺 [ru](../../../ru/docs/providers/AGENTROUTER.md) · 🇱🇰 [si](../../../si/docs/providers/AGENTROUTER.md) · 🇸🇰 [sk](../../../sk/docs/providers/AGENTROUTER.md) · 🇸🇮 [sl](../../../sl/docs/providers/AGENTROUTER.md) · 🇷🇸 [sr](../../../sr/docs/providers/AGENTROUTER.md) · 🇸🇪 [sv](../../../sv/docs/providers/AGENTROUTER.md) · 🇰🇪 [sw](../../../sw/docs/providers/AGENTROUTER.md) · 🇮🇳 [ta](../../../ta/docs/providers/AGENTROUTER.md) · 🇮🇳 [te](../../../te/docs/providers/AGENTROUTER.md) · 🇹🇭 [th](../../../th/docs/providers/AGENTROUTER.md) · 🇹🇷 [tr](../../../tr/docs/providers/AGENTROUTER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/AGENTROUTER.md) · 🇵🇰 [ur](../../../ur/docs/providers/AGENTROUTER.md) · 🇺🇿 [uz](../../../uz/docs/providers/AGENTROUTER.md) · 🇻🇳 [vi](../../../vi/docs/providers/AGENTROUTER.md) · 🇳🇬 [yo](../../../yo/docs/providers/AGENTROUTER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/AGENTROUTER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/AGENTROUTER.md)

---

[AgentRouter](https://agentrouter.org) on Anthropic-yhteensopiva välityspalvelu, joka jälleenmyy
Claudea ja muita malleja usein suoraa Anthropic APIa edullisemmin. Se on
suunniteltu virallisen Claude Code -asiakasohjelman suoraan korvaavaksi
`ANTHROPIC_BASE_URL`-osoitteeksi, joten se hyväksyy vain Claude Coden
verkkoliikenneprofiilia vastaavan liikenteen (tietty User-Agent, `anthropic-beta`-liput,
Stainless SDK -otsakkeet jne.).

## Pika-aloitus — käytä natiivia `agentrouter`-palveluntarjoajaa (suositus)

Useimmat käyttäjät **eivät tarvitse erityisiä määrityksiä**. OmniRoute sisältää
sisäänrakennetun `agentrouter`-palveluntarjoajan, johon Claude Coden täydellinen
verkkoliikenneprofiili on jo sisällytetty (katso
`open-sse/config/providerRegistry.ts` → `agentrouter`). Sen käyttäminen:

1. Avaa **Hallintapaneeli → Palveluntarjoajat → Lisää palveluntarjoaja**.
2. Valitse luettelosta **AgentRouter**.
3. Liitä `sk-...`-API-avaimesi ja tallenna.

Siinä kaikki — ympäristömuuttujia tai mukautettua palveluntarjoajatyyppiä ei tarvita.
Sisäänrakennettuihin malleihin kuuluvat `claude-opus-4-6`,
`claude-haiku-4-5-20251001`, `glm-5.1` ja `deepseek-v3.2`.

Tämän oppaan loppuosa käsittelee **edistynyttä tapaa** eli
`anthropic-compatible-cc-*`-palveluntarjoajatyypin käyttämistä. Käytä sitä, kun
tarvitset enemmän hallintaa verkkoliikenneprofiiliin — esimerkiksi yhdistäessäsi
muihin AgentRouterin kaltaisiin välityspalveluihin, joita ei vielä ole natiivissa
palveluntarjoajarekisterissä, tai kun haluat ohittaa perus-URL-osoitteen,
keskustelupolun tai otsakejoukon.

---

## Edistynyt: yhdistäminen Claude Code -yhteensopivan palveluntarjoajatyypin kautta

OmniRoute tukee AgentRouteria (ja vastaavia välityspalveluita) myös **Claude Code
-yhteensopivan** palveluntarjoajatyypin (`anthropic-compatible-cc-*`) kautta. Se
käyttää Anthropic Messages APIa oikealla verkkoliikenneprofiililla. Yleinen
`openai-compatible-chat`-palveluntarjoaja, joka osoittaa osoitteeseen
`https://agentrouter.org`, **ei** toimi — ylävirran WAF hylkää pyynnöt, jotka eivät
näytä Claude Coden lähettämiltä.

---

## Esivaatimukset

- AgentRouter-tili ja API-avain. Uudet rekisteröityjät saavat ilmaista saldoa
  projektin [README](../README.md)-tiedostossa olevan kumppanuuslinkin kautta.
- OmniRoute on käynnissä siten, että `ENABLE_CC_COMPATIBLE_PROVIDER`-ominaisuuslippu
  on käytössä (katso alta).

## 1. Ota CC-yhteensopiva palveluntarjoajatyyppi käyttöön

Claude Code -yhteensopiva palveluntarjoajatyyppi on ominaisuuslipun takana, koska se
lähettää liikennettä, joka jäljittelee tarkasti virallista Claude Code
-asiakasohjelmaa. Ota se käyttöön määrittämällä ympäristömuuttuja ennen OmniRouten
käynnistämistä:

```bash
ENABLE_CC_COMPATIBLE_PROVIDER=true
```

Docker-esimerkki:

```bash
docker run -d --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e ENABLE_CC_COMPATIBLE_PROVIDER=true \
  diegosouzapw/omniroute:latest
```

Uudelleenkäynnistyksen jälkeen hallintapaneelissa näkyy **Lisää Claude Code
-yhteensopiva** -vaihtoehto nykyisten OpenAI-yhteensopivien ja
Anthropic-yhteensopivien vaihtoehtojen lisäksi.

## 2. Luo palveluntarjoaja hallintapaneelissa

1. Avaa **Hallintapaneeli → Palveluntarjoajat → Lisää palveluntarjoaja**.
2. Valitse **Lisää Claude Code -yhteensopiva** (näkyy vain, kun yllä oleva lippu on asetettu).
3. Täytä kentät:

| Kenttä          | Arvo                                                                         |
| --------------- | ---------------------------------------------------------------------------- |
| Nimi            | `AgentRouter` (tai mikä tahansa tunniste)                                    |
| Etuliite        | `agentrouter` (lokeissa ja hallintapaneelissa näkyvä helppokäyttöinen alias) |
| Perus-URL       | `https://agentrouter.org`                                                    |
| Keskustelupolku | `/v1/messages?beta=true` (oletus — jätä ennalleen)                           |

> Kanoninen mallitunniste käyttää edelleen palveluntarjoajasolmun täydellistä tunnusta
> (`anthropic-compatible-cc-{uuid}/{model}`). **Etuliite** on vain näyttöalias,
> jonka `src/lib/usage/callLogs.ts` selvittää luettavampaa lokitulostetta varten.

4. (Valinnainen) Liitä API-avaimesi **Vahvista**-kenttään ja vahvista yhteys ennen
   tallentamista napsauttamalla **Tarkista**.
5. Napsauta **Lisää**.

Kun palveluntarjoaja on luotu, avaa se ja lisää **Yhteys** AgentRouter-API-avaimellasi
(`sk-...`). Yhteyden `test_status`-arvon pitäisi muuttua arvoon `active`.

## 3. Käytä sitä yhdistelmän kautta tai suoraan

Viittaa malliin käyttämällä palveluntarjoajasi etuliitettä nimiavaruutena:

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agentrouter/claude-opus-4-6",
    "messages": [{"role": "user", "content": "hello"}],
    "max_tokens": 100
  }'
```

Kanoninen mallitunnus `anthropic-compatible-cc-{uuid}/claude-opus-4-6` toimii myös,
ja se näkyy tietokannassa ja yhdistelmän määrityksissä.

Voit myös lisätä sen yhdistelmään reititystä, varajärjestelyä ja kiintiöiden hallintaa varten muiden
palveluntarjoajien tapaan.

---

## Wire image -tiedot

Viitteeksi cc-yhteensopiva silta lähettää seuraavat tiedot jokaisessa ylävirran
pyynnössä (katso `open-sse/services/claudeCodeCompatible.ts`):

| Otsake                                       | Arvo                                                                                                                  |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `Authorization`                              | `Bearer <api-key>`                                                                                                    |
| `User-Agent`                                 | `claude-cli/2.1.258 (external, sdk-cli)`                                                                              |
| `anthropic-version`                          | `2023-06-01`                                                                                                          |
| `anthropic-beta`                             | `claude-code-20250219,interleaved-thinking-2025-05-14,effort-2025-11-24`                                              |
| Yhteyskohtainen redact-thinking-beeta-asetus | Lisää arvon `redact-thinking-2026-02-12` ylävirroille, jotka nimenomaisesti edellyttävät sensuroituja päättelyvirtoja |
| Yhteyskohtainen tiivistetyn päättelyn asetus | Lisää asetuksen `display: "summarized"` CC Compatible -päättelypyyntöihin, joissa näyttötilaa ei ole vielä asetettu   |
| `anthropic-dangerous-direct-browser-access`  | `true`                                                                                                                |
| `x-app`                                      | `cli`                                                                                                                 |
| `X-Stainless-*`                              | Erilaisia Stainless SDK -otsakkeita (kieli, pakettiversio, käyttöjärjestelmä, arkkitehtuuri jne.)                     |

Tämän ansiosta pyynnöt läpäisevät ylävirran WAF:n / asiakasohjelmien sallittujen luettelon.

---

## Vianmääritys

**`{"error":{"message":"unauthorized client detected, ..."}}`** — Pyyntösi ei
vastannut Claude Code -wire imagea. Näin käy, kun palveluntarjoajan määrityksenä on
`openai-compatible-chat` eikä `anthropic-compatible-cc`, tai kun
`ENABLE_CC_COMPATIBLE_PROVIDER=true`-lippua ei asetettu käynnistyksen yhteydessä.

**`{"error":{"message":"无效的令牌","type":"new_api_error"}}` (HTTP 401)** —
"Virheellinen tunniste". Wire image on oikea, mutta API-avain hylätään. Luo
uusi avain AgentRouter-hallintapaneelissa ja päivitä yhteys.

**`{"error":{"code":"content-blocked","type":"agent_router_api_error"}}`
(HTTP 400)** — AgentRouterin moderointikoukku hylkäsi pyynnön sisällön, tai
avaimen tilaus ei salli pyydettyä mallia. Kokeile toista kehotetta tai mallia;
ota yhteyttä AgentRouter-tukeen, jos harmiton kehote estetään jatkuvasti.

**`[400]: content-blocked` vain tietyillä malleilla** — Useimmat AgentRouter-tilaukset
sallivat vain osan malleista (esim. `claude-opus-4-6`). Muut mallitunnukset palauttavat
`unauthorized_client_error`-virheen, vaikka avain olisi kelvollinen. Tarkista AgentRouter-hallintapaneelista,
mitkä mallit tilauksesi kattaa.

**`Invalid JSON response from provider (reset after Ns)` omniroute-lokeissa** —
Ylävirta palautti muun kuin JSON-muotoisen rungon (yleensä WAF:n HTML-virhesivun).
Tämä tarkoittaa tavallisesti, ettei pyyntö koskaan saavuttanut AgentRouter-taustapalvelua — tarkista uudelleen, että
palveluntarjoajan tunnus alkaa merkkijonolla `anthropic-compatible-cc-` (huomaa lopussa oleva yhdysmerkki —
katso `CLAUDE_CODE_COMPATIBLE_PREFIX` tiedostossa `open-sse/services/claudeCodeCompatible.ts`)
ja että ominaisuuslippu on käytössä.

**`unauthorized client detected` / HTML-virhesivu, vaikka AgentRouter-
palveluntarjoaja on jo olemassa** — sinulla on todennäköisesti **useampi kuin yksi** AgentRouter-palveluntarjoaja,
ja pyyntösi osuu väärään. Jos jäljelle jäänyt, käsin tehty
`anthropic-compatible-*`-palveluntarjoaja (muu kuin `cc`) tai `openai-compatible-chat-*`-palveluntarjoaja on
luotu `agentrouter`-etuliitteellä, se voi omistaa `agentrouter/<model>`-mallitunnukset
(ja yhdistelmät saattavat viitata siihen solmutunnuksella), jolloin liikenne reititetään kyseiselle palveluntarjoajalle —
joka lähettää yleisen User-Agent-arvon ja tulee hylätyksi — eikä sisäänrakennetulle
`agentrouter`-palveluntarjoajalle, joka sisältää jo oikean wire imagen. Tarkista omniroute-lokeista,
mihin malli todellisuudessa ratkeaa (`ROUTING`-tunniste näyttää
`agentrouter/<model> → <providerId>/<model>`); jos `<providerId>` ei ole
`agentrouter`, keskitä käyttö natiiviin palveluntarjoajaan: osoita yhdistelmät kohteeseen
`agentrouter/<model>` (providerId `agentrouter`) ja poista päällekkäiset
yhteensopivat palveluntarjoajat. Natiivi palveluntarjoaja ei tarvitse wire image -määritystä eikä
`customUserAgent`-asetusta.

---

## Katso myös

- [`docs/providers/CLAUDE_WEB.md`](./CLAUDE_WEB.md) — Claude Web -palveluntarjoajan integraatiohuomiot
- [`docs/reference/FREE_TIERS.md`](../reference/FREE_TIERS.md) — Maksuttoman tason palveluntarjoajien
  luettelo
- [`open-sse/services/claudeCodeCompatible.ts`](../../open-sse/services/claudeCodeCompatible.ts)
  — Wire-kuvan toteutus
