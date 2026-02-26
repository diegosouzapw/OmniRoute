# Vianetsintä

🌐 **Languages:** 🇺🇸 [English](../../TROUBLESHOOTING.md) | 🇧🇷 [Português (Brasil)](../pt-BR/TROUBLESHOOTING.md) | 🇪🇸 [Español](../es/TROUBLESHOOTING.md) | 🇫🇷 [Français](../fr/TROUBLESHOOTING.md) | 🇮🇹 [Italiano](../it/TROUBLESHOOTING.md) | 🇷🇺 [Русский](../ru/TROUBLESHOOTING.md) | 🇨🇳 [中文 (简体)](../zh-CN/TROUBLESHOOTING.md) | 🇩🇪 [Deutsch](../de/TROUBLESHOOTING.md) | 🇮🇳 [हिन्दी](../in/TROUBLESHOOTING.md) | 🇹🇭 [ไทย](../th/TROUBLESHOOTING.md) | 🇺🇦 [Українська](../uk-UA/TROUBLESHOOTING.md) | 🇸🇦 [العربية](../ar/TROUBLESHOOTING.md) | 🇯🇵 [日本語](../ja/TROUBLESHOOTING.md) | 🇻🇳 [Tiếng Việt](../vi/TROUBLESHOOTING.md) | 🇧🇬 [Български](../bg/TROUBLESHOOTING.md) | 🇩🇰 [Dansk](../da/TROUBLESHOOTING.md) | 🇫🇮 [Suomi](../fi/TROUBLESHOOTING.md) | 🇮🇱 [עברית](../he/TROUBLESHOOTING.md) | 🇭🇺 [Magyar](../hu/TROUBLESHOOTING.md) | 🇮🇩 [Bahasa Indonesia](../id/TROUBLESHOOTING.md) | 🇰🇷 [한국어](../ko/TROUBLESHOOTING.md) | 🇲🇾 [Bahasa Melayu](../ms/TROUBLESHOOTING.md) | 🇳🇱 [Nederlands](../nl/TROUBLESHOOTING.md) | 🇳🇴 [Norsk](../no/TROUBLESHOOTING.md) | 🇵🇹 [Português (Portugal)](../pt/TROUBLESHOOTING.md) | 🇷🇴 [Română](../ro/TROUBLESHOOTING.md) | 🇵🇱 [Polski](../pl/TROUBLESHOOTING.md) | 🇸🇰 [Slovenčina](../sk/TROUBLESHOOTING.md) | 🇸🇪 [Svenska](../sv/TROUBLESHOOTING.md) | 🇵🇭 [Filipino](../phi/TROUBLESHOOTING.md)

OmniRouten yleisiä ongelmia ja ratkaisuja.

---

## Pikakorjauksia

| Ongelma                            | Ratkaisu                                                                    |
| ---------------------------------- | --------------------------------------------------------------------------- |
| Ensimmäinen kirjautuminen ei toimi | Tarkista `INITIAL_PASSWORD` kohteessa `.env` (oletus: `123456`)             |
| Kojelauta avautuu väärään porttiin | Aseta `PORT=20128` ja `NEXT_PUBLIC_BASE_URL=http://localhost:20128`         |
| Ei pyyntölokeja alle `logs/`       | Aseta `ENABLE_REQUEST_LOGS=true`                                            |
| EACCES: lupa evätty                | Aseta `DATA_DIR=/path/to/writable/dir` ohittamaan `~/.omniroute`            |
| Reititysstrategia ei tallennu      | Päivitys versioon 1.4.11+ (Zod-skeeman korjaus asetusten pysyvyyttä varten) |

---

## Palveluntarjoajan ongelmat

### "Kielimalli ei antanut viestejä"

**Syy:** Palveluntarjoajan kiintiö käytetty.

**Korjaa:**

1. Tarkista kojelaudan kiintiöiden seuranta
2. Käytä yhdistelmää varatasoilla
3. Vaihda halvempaan/ilmaiseen tasoon

### Hintarajoitus

**Syy:** Tilauskiintiö käytetty.

**Korjaa:**

- Lisää vara: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`
- Käytä GLM/MiniMaxia halvana varmuuskopiona

### OAuth-tunnus vanhentunut

OmniRoute päivittää tunnukset automaattisesti. Jos ongelmat jatkuvat:

1. Kojelauta → Palveluntarjoaja → Yhdistä uudelleen
2. Poista ja lisää palveluntarjoajan yhteys uudelleen

---

## Pilviongelmat

### Pilven synkronointivirheet

1. Vahvista `BASE_URL` pistettä käynnissä olevaan esiintymääsi (esim. `http://localhost:20128`)
2. Vahvista `CLOUD_URL` pistettä pilvipäätepisteeseesi (esim. `https://omniroute.dev`)
3. Pidä `NEXT_PUBLIC_*`-arvot kohdakkain palvelinpuolen arvojen kanssa

### Pilvi `stream=false` Palauttaa 500

**Oire:** `Unexpected token 'd'...` pilvipäätepisteessä muille kuin suoratoistopuheluille.

**Syy:** Upstream palauttaa SSE-hyötykuorman, kun asiakas odottaa JSONia.

**Ratkaisu:** Käytä `stream=true` pilvisuorapuheluihin. Paikallinen suoritusaika sisältää SSE→JSON-varavaihtoehdon.

### Cloud sanoo Yhdistetty, mutta "Virheellinen API-avain"

1. Luo uusi avain paikallisesta hallintapaneelista (`/api/keys`)
2. Suorita pilvisynkronointi: Ota pilvi käyttöön → Synkronoi nyt
3. Vanhat/synkronoimattomat avaimet voivat edelleen palauttaa `401` pilvessä

---

## Docker-ongelmat

### CLI-työkalu näyttää, ettei sitä ole asennettu

1. Tarkista suoritusaikakentät: `curl http://localhost:20128/api/cli-tools/runtime/codex | jq`
2. Kannettava tila: käytä kuvakohdetta `runner-cli` (yhdistetyt CLI:t)
3. Isäntäliitostila: aseta `CLI_EXTRA_PATHS` ja liitä isäntälokerohakemisto vain luku -muotoiseksi
4. Jos `installed=true` ja `runnable=false`: binaari löytyi, mutta kuntotarkastus epäonnistui

### Nopea ajonaikainen validointi

```bash
curl -s http://localhost:20128/api/cli-tools/codex-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/claude-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/openclaw-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
```

---

## Kustannusongelmat

### Korkeat kustannukset

1. Tarkista käyttötilastot kohdassa Dashboard → Usage
2. Vaihda ensisijaiseksi malliksi GLM/MiniMax
3. Käytä ilmaista tasoa (Gemini CLI, iFlow) ei-kriittisiin tehtäviin
4. Aseta kustannusbudjetit API-avainta kohti: Dashboard → API Keys → Budget

---

## Virheenkorjaus

### Ota pyyntölokit käyttöön

Aseta `ENABLE_REQUEST_LOGS=true` tiedostossasi `.env`. Lokit näkyvät hakemistossa `logs/`.

### Tarkista palveluntarjoajan kunto

```bash
# Health dashboard
http://localhost:20128/dashboard/health

# API health check
curl http://localhost:20128/api/monitoring/health
```

### Ajonaikainen tallennus

- Päätila: `${DATA_DIR}/db.json` (palveluntarjoajat, yhdistelmät, aliakset, avaimet, asetukset)
- Käyttö: `${DATA_DIR}/usage.json`, `${DATA_DIR}/log.txt`, `${DATA_DIR}/call_logs/`
- Pyyntölokit: `<repo>/logs/...` (kun `ENABLE_REQUEST_LOGS=true`)

---

## Virtakatkaisijaongelmat

### Palveluntarjoaja jumissa OPEN-tilassa

Kun palveluntarjoajan katkaisija on AUKI, pyynnöt estetään, kunnes jäähdytys päättyy.

**Korjaa:**

1. Siirry kohtaan **Käyttöpaneeli → Asetukset → Resilience**
2. Tarkista asianomaisen palveluntarjoajan katkaisijakortti
3. Napsauta **Nollaa kaikki** tyhjentääksesi kaikki katkaisijat tai odota jäähdytysajan päättymistä
4. Varmista, että palveluntarjoaja on todella saatavilla, ennen kuin nollaat

### Palveluntarjoaja laukeaa jatkuvasti katkaisijan

Jos palveluntarjoaja siirtyy toistuvasti OPEN-tilaan:

1. Tarkista vikakuvio kohdasta **Dashboard → Health → Provider Health**
2. Siirry kohtaan **Settings → Resilience → Provider Profiles** ja nosta vikakynnystä.
3. Tarkista, onko palveluntarjoaja muuttanut API-rajoja tai vaatiiko todennuksen uudelleen
4. Tarkista viiveen telemetria — korkea latenssi voi aiheuttaa aikakatkaisuun perustuvia virheitä

---

## Äänen transkriptioongelmat

### "Ei tuettu malli" -virhe

- Varmista, että käytät oikeaa etuliitettä: `deepgram/nova-3` tai `assemblyai/best`
- Varmista, että palveluntarjoaja on yhdistetty kohdassa **Dashboard → Providers**

### Transkriptio palautetaan tyhjänä tai epäonnistuu

- Tarkista tuetut äänimuodot: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`
- Varmista, että tiedostokoko on palveluntarjoajan rajoissa (yleensä < 25 Mt)
- Tarkista palveluntarjoajan API-avaimen voimassaolo toimittajakortista

---

## Kääntäjän virheenkorjaus

Käytä **Käyttöpaneeli → Kääntäjä** muotojen käännösongelmien korjaamiseen:

| Tila                      | Milloin käyttää                                                                                         |
| ------------------------- | ------------------------------------------------------------------------------------------------------- |
| **Leikkikenttä**          | Vertaa syöttö-/tulostusmuotoja rinnakkain – liitä epäonnistunut pyyntö nähdäksesi, miten se käännetään  |
| **Pikaviestien testaaja** | Lähetä reaaliaikaisia ​​viestejä ja tarkasta koko pyynnön/vastauksen hyötykuorma, mukaan lukien otsikot |
| **Testipenkki**           | Suorita erätestejä muotoyhdistelmille selvittääksesi, mitkä käännökset ovat rikki                       |
| **Live Monitor**          | Tarkkaile reaaliaikaista pyyntövirtaa havaitaksesi ajoittaiset käännösongelmat                          |

### Yleisiä muotoongelmia

- **Ajattelevat tunnisteet eivät näy** — Tarkista, tukeeko kohdetoimittaja ajattelua ja ajattelun budjettiasetusta
- **Työkalukutsujen pudottaminen** — Jotkin muotokäännökset voivat poistaa ei-tuetut kentät. vahvista leikkikenttätilassa
- **Järjestelmäkehote puuttuu** — Claude ja Gemini kahvajärjestelmä kehottaa eri tavalla; tarkista käännöstulos
- **SDK palauttaa raakamerkkijonon objektin sijaan** — Korjattu versiossa 1.1.0: vastauspuhdistin poistaa nyt epästandardit kentät (`x_groq`, `usage_breakdown` jne.), jotka aiheuttavat OpenAI SDK Pydantic -tarkistusvirheitä
- **GLM/ERNIE hylkää roolin `system`** — Korjattu versiossa 1.1.0: roolin normalisoija yhdistää automaattisesti järjestelmäviestit käyttäjän viesteiksi yhteensopimattomissa malleissa
- **`developer` roolia ei tunnistettu** - Korjattu versiossa 1.1.0: muunnetaan automaattisesti muotoon `system` muille kuin OpenAI-palveluntarjoajille
- **`json_schema` ei toimi Geminin kanssa** — Korjattu versiossa 1.1.0: `response_format` muunnetaan nyt Geminin `responseMimeType` + `responseSchema`

---

## Kestävyysasetukset

### Automaattinen nopeusrajoitus ei laukea

- Automaattinen nopeusrajoitus koskee vain API-avainten toimittajia (ei OAuth-tilausta)
- Varmista, että **Asetukset → Resilienssi → Palveluntarjoajan profiilit** on automaattinen rajoitus käytössä
- Tarkista, palauttaako palveluntarjoaja `429`-tilakoodit tai `Retry-After`-otsikot

### Viritys eksponentiaalisesti

Palveluntarjoajan profiilit tukevat näitä asetuksia:

- **Perusviive** — Ensimmäinen odotusaika ensimmäisen epäonnistumisen jälkeen (oletus: 1 s)
- **Maksimiviive** - Odotusajan enimmäisraja (oletus: 30 s)
- **Kerroin** — Kuinka paljon viivettä lisätään peräkkäistä vikaa kohti (oletus: 2x)

### Ukkosta estävä lauma

Kun monet samanaikaiset pyynnöt osuvat nopeusrajoitettuun palveluntarjoajaan, OmniRoute käyttää mutex + automaattista nopeuden rajoitusta sarjoittamaan pyynnöt ja estämään peräkkäiset epäonnistumiset. Tämä on automaattinen API-avainten tarjoajille.

---

## Vieläkö jumissa?

- **GitHub-ongelmat**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **Arkkitehtuuri**: Katso sisäiset tiedot kohdasta [**OMNI_TOKEN_55**](ARCHITECTURE.md)
- **API-viite**: Katso kaikki päätepisteet kohdasta [**OMNI_TOKEN_56**](API_REFERENCE.md)
- **Health Dashboard**: Tarkista järjestelmän reaaliaikainen tila kohdasta **Dashboard → Health**
- **Kääntäjä**: Käytä **Käyttöpaneeli → Kääntäjä** muotoongelmien korjaamiseen
