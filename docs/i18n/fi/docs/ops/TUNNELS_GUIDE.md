# Tunnels Guide (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/TUNNELS_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/TUNNELS_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/TUNNELS_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/TUNNELS_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/TUNNELS_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/TUNNELS_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/TUNNELS_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/TUNNELS_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/TUNNELS_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/TUNNELS_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/TUNNELS_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/TUNNELS_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/TUNNELS_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/TUNNELS_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/TUNNELS_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/TUNNELS_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/TUNNELS_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/TUNNELS_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/TUNNELS_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/TUNNELS_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/TUNNELS_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/TUNNELS_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/TUNNELS_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/TUNNELS_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/TUNNELS_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/TUNNELS_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/TUNNELS_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/TUNNELS_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/TUNNELS_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/TUNNELS_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/TUNNELS_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/TUNNELS_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/TUNNELS_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/TUNNELS_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/TUNNELS_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/TUNNELS_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/TUNNELS_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/TUNNELS_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/TUNNELS_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/TUNNELS_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/TUNNELS_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/TUNNELS_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/TUNNELS_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/TUNNELS_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/TUNNELS_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/TUNNELS_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/TUNNELS_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/TUNNELS_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/TUNNELS_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/TUNNELS_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/TUNNELS_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/TUNNELS_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/TUNNELS_GUIDE.md)

---

> **Totuuden lähde:** `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`, `src/app/api/tunnels/`
> **Viimeksi päivitetty:** 2026-06-28 — v3.8.40

OmniRoute voi julkaista paikallisen palvelimensa (`http://localhost:20128`) julkiseen
internetiin kolmen tunnelitaustajärjestelmän kautta. Tästä on hyötyä seuraavissa tilanteissa:

- Pilvipalveluntarjoajien (Antigravity, Gemini, Cursor) OAuth-takaisinkutsut, jotka tarvitsevat
  julkisesti saavutettavan uudelleenohjaus-URL-osoitteen.
- Paikallisen instanssin jakaminen tiimin jäsenille ilman virtuaalikoneen käyttöönottoa.
- Mobiili-, etä- tai verkkojen välinen testaus.

Kaikkia kolmea taustajärjestelmää hallitaan prosessin sisällä — OmniRoute käynnistää ja pysäyttää
taustalla olevan binääritiedoston tai SDK:n hallintapaneelista tai REST API:n kautta. Käänteisen välityspalvelimen tai systemd:n
määritystä ei tarvita.

## Taustajärjestelmät lyhyesti

| Taustajärjestelmä           | Pysyvyys                                                             | Hinta                               | Määritys                                                         |
| --------------------------- | -------------------------------------------------------------------- | ----------------------------------- | ---------------------------------------------------------------- |
| **Cloudflare Quick Tunnel** | Tilapäinen (URL muuttuu jokaisella uudelleenkäynnistyksellä)         | Maksuton                            | Ei vaadi toimia — asentaa `cloudflared`-ohjelman automaattisesti |
| **ngrok**                   | Vakaa, kun maksullinen tilaus tai kiinteä verkkotunnus on määritetty | Maksuton taso + maksullinen         | Vaatii ngrok-tilin ja authtoken-tunnuksen                        |
| **Tailscale Funnel**        | Vakaa solmukohtaisesti omassa tailnet-verkossasi                     | Maksuton henkilökohtaiseen käyttöön | Vaatii Tailscale-asennuksen, kirjautumisen ja Funnel ACL:n       |

Toteutukset sijaitsevat tiedostoissa `src/lib/cloudflaredTunnel.ts`,
`src/lib/ngrokTunnel.ts` ja `src/lib/tailscaleTunnel.ts`. Kaikki kolme palauttavat
yhtenäisen `status`-objektin, joka sisältää kentät `phase`, `running`, `publicUrl`,
`apiUrl`, `targetUrl` ja `lastError`, joten hallintapaneeli voi esittää ne yhdenmukaisesti.

## 1. Cloudflare Tunnel (Quick Tunnel + Named Tunnel)

`src/lib/cloudflaredTunnel.ts` suorittaa `cloudflared`-ohjelman aliprosessina. Se tukee
kahta tilaa, jotka valitaan sen perusteella, onko nimetyn tunnelin määritys annettu:

- **Pikatunneli (oletus).** Suorittaa komennon `cloudflared tunnel --url
http://localhost:<apiPort>` ja jäsentää määritetyn `*.trycloudflare.com`-URL-osoitteen
  vakiotulosteesta. URL-osoitteet ovat tilapäisiä ja muuttuvat jokaisella uudelleenkäynnistyksellä.
- **Nimetty tunneli (valinnainen).** Kun `CLOUDFLARED_CONFIG` osoittaa paikallisesti hallittuun
  cloudflared-ohjelman `config.yml`-tiedostoon, OmniRoute suorittaa komennon `cloudflared tunnel --no-autoupdate
--config <path> run`, jolloin saat **vakaan, nimetyn isäntänimen**. Määritys
  sisältää tunnelin UUID:n, `credentials-file`-tiedoston ja `ingress`-reitityksen, joten
  `--url`-valitsinta ei välitetä eikä Zero Trust -hallintapaneelin tunnusta tarvita. `run` lukee
  tunnistetiedot määrityksen absoluuttisesta `credentials-file`-polusta — `cert.pem`-tiedostoa
  ei tarvita (sitä käytetään vain tunnelin elinkaaren hallintaan).

Keskeiset toimintatavat:

- **Automaattinen asennus.** Ensimmäisellä käyttökerralla OmniRoute lataa uusimman `cloudflared`-
  binääritiedoston virallisista GitHub-julkaisuista (hallittu asennus sijaitsee hakemistossa
  `DATA_DIR/cloudflared/`). Ladatun resurssin SHA256-tarkistussumma vahvistetaan
  julkaisuluetteloa vasten ennen suorittamista.
- **Prosessin valvonta.** cloudflared-ohjelman PID ja selvitetty URL tallennetaan
  `quick-tunnel-state.json`-tiedostoon, jotta hallintapaneeli voi jatkaa tilan näyttämistä sivun uudelleenlatausten jälkeen.

### Nimetyn tunnelin määritys (vakaa isäntänimi)

1. Luo paikallisesti hallittu tunneli cloudflared CLI:llä (vain kerran):

   ```bash
   cloudflared tunnel login
   cloudflared tunnel create omniroute
   cloudflared tunnel route dns omniroute ai.example.com
   ```

2. Luo `~/.cloudflared/config.yml`, joka reitittää isäntänimesi OmniRouten paikalliseen
   API-porttiin (oletusarvoisesti 20128):

   ```yaml
   tunnel: <UUID-from-create>
   credentials-file: /home/you/.cloudflared/<UUID>.json
   ingress:
     - hostname: ai.example.com
       service: http://127.0.0.1:20128
     - service: http_status:404
   ```

3. Osoita OmniRoute käyttämään määritystä ja käynnistä tunneli (uudelleen):

   ```bash
   export CLOUDFLARED_CONFIG="/home/you/.cloudflared/config.yml"
   # valinnainen — korvaa OmniRouten ilmoittaman isäntänimen; muutoin se luetaan
   # määrityksen ensimmäisestä ingress-säännöstä:
   # export CLOUDFLARED_HOSTNAME="ai.example.com"
   ```

   Ota tunneli käyttöön samalla tavalla kuin pikatunneli (REST / hallintapaneeli / CLI
   alla). Nimetty tunneli ei tulosta poimittavaa julkista URL-osoitetta, joten valmius tunnistetaan
   cloudflared-ohjelman rekisteröidystä reunaverkkoyhteydestä, ja `publicUrl`/`apiUrl` ilmoitetaan
   `CLOUDFLARED_HOSTNAME`-muuttujan perusteella (tai määrityksen ensimmäisen ingress-isäntänimen perusteella).

### Käyttöönotto / käytöstä poistaminen RESTin kautta

Päätepiste käyttää runkoa `{action: "enable" | "disable"}`, ei erillisiä
`start`/`stop`-polkuja. Hallinnan todennus (järjestelmänvalvojan istunto tai järjestelmänvalvojan API-avain)
vaaditaan.

```bash
# Ota käyttöön
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Tila
curl http://localhost:20128/api/tunnels/cloudflared \
  -H "Cookie: auth_token=..."

# Poista käytöstä
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Tai hallintapaneelin kautta: **Asetukset → Tunnelit → Cloudflare**.

### Valinnaiset ympäristömuuttujat

| Muuttuja                                             | Tarkoitus                                                                                                                                                                                   |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLOUDFLARED_BIN`                                    | Ohittaa binäärin polun. Jos se on asetettu ja kelvollinen, OmniRoute käyttää sitä lataamisen sijaan.                                                                                        |
| `CLOUDFLARED_PROTOCOL` / `TUNNEL_TRANSPORT_PROTOCOL` | Siirtoprotokolla (oletus `http2`; myös `quic`, `auto`).                                                                                                                                     |
| `CLOUDFLARED_CONFIG`                                 | Paikallisesti hallitun cloudflared-`config.yml`-tiedoston polku. Kun tämä on asetettu, OmniRoute suorittaa pikatunnelin sijaan **nimetyn/pysyvän** tunnelin (`tunnel --config <path> run`). |
| `CLOUDFLARED_HOSTNAME`                               | Ohittaa nimetyn tunnelin ilmoittaman julkisen isäntänimen (esim. `ai.example.com`). Jos arvoa ei ole asetettu, se luetaan määrityksen ensimmäisestä `ingress`-isäntänimestä.                |

## 2. ngrok

`src/lib/ngrokTunnel.ts` käyttää **`@ngrok/ngrok` SDK:ta** (prosessin sisäisesti, ilman CLI-aliprosessia). Natiivimoduuli tuodaan laiskasti ensimmäisen käynnistyksen yhteydessä, jotta sovellus ei kaadu käynnistyessään alustoilla, joille ei ole saatavilla valmiiksi käännettyjä binääritiedostoja.

### Edellytykset

1. Rekisteröidy osoitteessa <https://ngrok.com>.
2. Kopioi authtoken-tunnuksesi ngrok-hallintapaneelista.
3. Anna se jollakin seuraavista tavoista:
   - `.env`: `NGROK_AUTHTOKEN=<token>`, tai
   - Hallintapaneeli: **Settings → Tunnels → ngrok**, tai
   - REST-pyynnön runko (kertaluonteinen): `{"action":"enable","authToken":"<token>"}`.

Jos kumpaakaan ei ole määritetty, tila palauttaa arvon `phase: "needs_auth"`.

### Käyttöönotto / käytöstäpoisto REST-rajapinnan kautta

```bash
# Ota käyttöön (käyttää ympäristön NGROK_AUTHTOKEN-muuttujaa)
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Ota käyttöön suoraan annetulla tunnuksella
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable","authToken":"2abc..."}'

# Tila
curl http://localhost:20128/api/tunnels/ngrok \
  -H "Cookie: auth_token=..."

# Poista käytöstä
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Vastaus sisältää määritetyn `publicUrl`-osoitteen (esim.
`https://abcd-1234.ngrok-free.app`). Mukautetut verkkotunnukset, alueet ja käytäntösäännöt
on määritettävä ngrok-hallintapaneelissa — OmniRoute välittää itse vain
paikallisen kohde-URL-osoitteen SDK:lle.

## 3. Tailscale Funnel

`src/lib/tailscaleTunnel.ts` hallinnoi järjestelmän `tailscale` CLI:tä tuodakseen
paikallisen API-portin julkisesti saataville **Funnel**-toiminnon kautta (Tailscalen julkisen internetin ulostulokanava serve-toiminnolle).
Se tukee koko elinkaarta: asennusta, kirjautumista, taustapalvelun käynnistämistä, käyttöönottoa ja käytöstäpoistoa.

Toteutus suorittaa komennon `tailscale funnel --bg <port>` (taustatila). Julkisen
URL-osoitteen muoto on `https://<machine>.<tailnet>.ts.net/`.

### Edellytykset

1. Asenna Tailscale (tai anna OmniRouten tehdä se — katso alla oleva `install`-päätepiste).
2. Kirjaudu sisään (`tailscale login` tai OmniRouten `login`-päätepisteen kautta).
3. Ota Funnel käyttöön tailnet-verkollesi Tailscalen hallintakonsolissa:
   <https://login.tailscale.com/admin/settings/features>.

Linuxissa ja macOS:ssä taustapalvelun (`tailscaled`) hallinta vaatii `sudo`-oikeudet.
POST-päätepisteet hyväksyvät valinnaisen `sudoPassword`-kentän, joka välitetään
OmniRouten MITM-salasanavälimuistiin (`getCachedPassword` / `setCachedPassword`)
kutsun ajaksi. Windows käyttää oletusarvoista palveluasennusta polussa
`C:\Program Files\Tailscale\tailscale.exe`.

### REST-päätepisteet

Tailscalen rajapinta on muita taustajärjestelmiä laajempi, koska asennus,
kirjautuminen, taustapalvelu ja tunneli ovat erillisiä kokonaisuuksia.

| Päätepiste                            | Menetelmä | Tarkoitus                                                                 |
| ------------------------------------- | --------- | ------------------------------------------------------------------------- |
| `/api/tunnels/tailscale`              | `GET`     | Koostettu tunnelin tila (`phase`, `tunnelUrl`, `apiUrl` jne.)             |
| `/api/tunnels/tailscale/check`        | `GET`     | Alemman tason tarkistus: asennettu? kirjautunut? taustapalvelu käynnissä? |
| `/api/tunnels/tailscale/install`      | `POST`    | Asenna Tailscale (SSE-suoratoistetut edistymistapahtumat) — Linux/macOS   |
| `/api/tunnels/tailscale/start-daemon` | `POST`    | Käynnistä `tailscaled` Linuxissa/macOS:ssä                                |
| `/api/tunnels/tailscale/login`        | `POST`    | Aloita kirjautuminen; palauttaa selaimessa avattavan `authUrl`-osoitteen  |
| `/api/tunnels/tailscale/enable`       | `POST`    | Käynnistä Funnel API-portille                                             |
| `/api/tunnels/tailscale/disable`      | `POST`    | Pysäytä Funnel                                                            |

Kaikki Tailscale-päätepisteet vaativat hallintatodennuksen (katso `routeUtils.ts ::
requireTailscaleAuth`).

Esimerkki käyttöönotosta:

```bash
curl -X POST http://localhost:20128/api/tunnels/tailscale/enable \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"sudoPassword":"<linux-pwd>","port":20128}'
```

Jos Funnel ei ole käytössä hallintakonsolissa, vastaus sisältää arvon
`funnelNotEnabled: true` sekä selaimessa avattavan `enableUrl`-osoitteen.

### Valinnaiset ympäristömuuttujat

| Muuttuja        | Tarkoitus                                |
| --------------- | ---------------------------------------- |
| `TAILSCALE_BIN` | Ohita `tailscale`-binääritiedoston polku |

## Päätepisteiden yhteenveto

| Päätepiste                            | Menetelmä | Runko                               | Todennus |
| ------------------------------------- | --------- | ----------------------------------- | -------- |
| `/api/tunnels/cloudflared`            | `GET`     | —                                   | hallinta |
| `/api/tunnels/cloudflared`            | `POST`    | `{action: "enable" \| "disable"}`   | hallinta |
| `/api/tunnels/ngrok`                  | `GET`     | —                                   | hallinta |
| `/api/tunnels/ngrok`                  | `POST`    | `{action, authToken?}`              | hallinta |
| `/api/tunnels/tailscale`              | `GET`     | —                                   | hallinta |
| `/api/tunnels/tailscale/check`        | `GET`     | —                                   | hallinta |
| `/api/tunnels/tailscale/install`      | `POST`    | `{sudoPassword?}` (SSE)             | hallinta |
| `/api/tunnels/tailscale/start-daemon` | `POST`    | `{sudoPassword?}`                   | hallinta |
| `/api/tunnels/tailscale/login`        | `POST`    | `{hostname?}`                       | hallinta |
| `/api/tunnels/tailscale/enable`       | `POST`    | `{sudoPassword?, hostname?, port?}` | hallinta |
| `/api/tunnels/tailscale/disable`      | `POST`    | `{sudoPassword?}`                   | hallinta |

Keskitettyä `/api/settings/tunnels`-päätepistettä ei ole — jokainen taustajärjestelmä on
itsenäinen.

## OAuth-takaisinkutsuihin liittyvät huomioitavat asiat

Kun julkaiset OmniRouten tunnelin kautta, hallintapaneelin ja OAuth-kulkujen on
muodostettava takaisinkutsu-URL-osoitteet **julkisen** isäntänimen eikä `localhost`-osoitteen
perusteella. Muussa tapauksessa OAuth-palveluntarjoaja ohjaa käyttäjän takaisin URL-osoitteeseen,
jota sen palvelimet eivät voi tavoittaa, jolloin kättely epäonnistuu.

Hallintapaneelissa tehtävät muokkaukset ja asetusten tallennukset eivät edellytä tunnelin
isäntänimen kiinnittämistä `NEXT_PUBLIC_BASE_URL`-muuttujaan. Todennettu hallintapaneeli
lähettää saman alkuperän suojaamattomat pyynnöt istuntoon sidotulla CSRF-tunnuksella,
joten lyhytikäisiä Cloudflare Quick Tunnel -isäntänimiä voidaan edelleen käyttää
käyttöliittymän normaaliin hallintaan kirjautumisen jälkeen.

Aseta:

```bash
NEXT_PUBLIC_BASE_URL=https://<your-tunnel-host>
```

ja käynnistä OmniRoute uudelleen ennen OAuth-prosessin aloittamista. Lyhytikäisten
Cloudflare Quick Tunnel -tunneleiden URL-osoite muuttuu jokaisen uudelleenkäynnistyksen
jälkeen, joten tuotantoympäristön OAuth-käytössä kannattaa suosia ngrokia varatulla
verkkotunnuksella tai Tailscale Funnelia.

## Kunto ja valvonta

Hallintapaneeli näyttää tunnelin tilan kohdassa **Asetukset → Tunnelit**:

- Aktiiviset taustajärjestelmät ja nykyinen `phase` (`stopped`, `starting`, `running`,
  `needs_auth`, `error`).
- Nykyinen julkinen URL-osoite ja siitä johdettu API-osoite (`<publicUrl>/v1`).
- Paikallinen kohde-URL-osoite, johon tunneli välittää liikenteen.
- Viimeisin virheilmoitus, jos sellainen on.

Ohjelmallista valvontaa varten kysy taustajärjestelmäkohtaisia `GET`-päätepisteitä
säännöllisesti. Useiden taustajärjestelmien käyttäminen samanaikaisesti on sallittua;
OmniRoute seuraa kutakin niistä itsenäisesti.

## Vianmääritys

### "cloudflared-binääritiedostoa ei löytynyt"

OmniRoute yrittää asentaa sen automaattisesti ensimmäisellä käyttökerralla. Jos asennus
on estetty (rajoitettu verkko, ei pääsyä GitHubiin), lataa `cloudflared` manuaalisesti
osoitteesta <https://github.com/cloudflare/cloudflared/releases> ja aseta
`CLOUDFLARED_BIN=/path/to/cloudflared`.

### "ngrok: authtoken vaaditaan"

`phase: "needs_auth"` tarkoittaa, ettei authtokenia löytynyt. Aseta `NGROK_AUTHTOKEN`
`.env`-tiedostossa, määritä se hallintapaneelin kautta tai välitä `authToken`
käyttöönoton POST-pyynnön rungossa.

### "tailscale: funnel ei ole käytössä"

Kun käyttöönoton vastaus sisältää arvon `funnelNotEnabled: true`, Funnel on poistettu
käytöstä tailnetissäsi. Avaa palautettu `enableUrl` (tai hallintakonsolin
ominaisuussivu) ja ota Funnel käyttöön.

### Tunnelin URL-osoitteen muutokset rikkovat OAuthin

Käytä ngrokia varatulla verkkotunnuksella tai Tailscale Funnelia (molemmat ovat
solmukohtaisesti vakaita). Cloudflare Quick Tunnel -tunnelit ovat tarkoituksellisesti
lyhytikäisiä, eikä niitä suositella pitkäaikaisiin OAuth-takaisinkutsuihin.

### Käyttöoikeus evätty Linuxissa/macOS:ssä Tailscalea käytettäessä

`tailscaled` tarvitsee pääkäyttäjän oikeudet. Anna `sudoPassword` asianmukaiselle
POST-päätepisteelle tai käynnistä daemon itse (`sudo systemctl start tailscaled`).

## Katso myös

- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — lähtevä välityspalvelin (1proxy, SOCKS5, HTTP)
  ulospäin suuntautuvalle liikenteelle.
- [ENVIRONMENT.md](../reference/ENVIRONMENT.md) — täydellinen luettelo ympäristömuuttujista, mukaan lukien
  `NEXT_PUBLIC_BASE_URL`.
- [FLY_IO_DEPLOYMENT_GUIDE.md](./FLY_IO_DEPLOYMENT_GUIDE.md),
  [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md) — tunneloinnin vaihtoehdot vakaaseen
  julkiseen isännöintiin.
- Lähdekoodi: `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`,
  `src/app/api/tunnels/`.
