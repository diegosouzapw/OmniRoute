# 🐳 Docker Guide — OmniRoute (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Täydellinen Docker-käyttöönoton viiteopas. Katso pika-aloitusohjeet [README-tiedoston Docker-osiosta](../README.md#-docker).

## Sisällysluettelo

- [Pikakäynnistys](#quick-run)
- [Ympäristötiedoston käyttäminen](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Käytettävissä olevat profiilit](#available-profiles)
- [Isäntäjärjestelmän CLI-työkalujen määrittäminen, kun OmniRoute suoritetaan Dockerissa](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Redis-sivukontti](#redis-sidecar)
- [Tuotantokäyttöön tarkoitettu Compose](#production-compose)
- [Dockerfile-vaiheet](#dockerfile-stages)
- [Kriittiset ympäristömuuttujat](#critical-environment-variables)
- [Docker Compose ja Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Cloudflare Quick Tunnel](#cloudflare-quick-tunnel)
- [Näköistiedostotunnisteet](#image-tags)
- [Saatavuus: oletusarvoinen SQLite tukee vain yhtä replikaa](#availability-default-sqlite-is-single-replica)
- [Geminin alueelliset virheet Dockerissa](#gemini-regional-errors-inside-docker)
- [Tärkeitä huomautuksia](#important-notes)

---

## Pikakäynnistys

> **Haluatko itseisännöidä yhdellä komennolla?** Katso
> [itseisännöintiopas](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (julkaistu näköistiedosto +
> Redis, vain loopback-yhteys, ei profiilin valintaa). Alla oleva pikakäynnistys on
> yhden kontin vaihtoehto käyttäjille, jotka suorittavat Redisiä jo muualla.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Ympäristötiedoston käyttäminen

```bash
# Kopioi .env ja muokkaa sitä ensin
cp .env.example .env

docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  --env-file .env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Docker Compose

```bash
# Perusprofiili (ei CLI-työkaluja)
docker compose --profile base up -d

# CLI-profiili (sisäänrakennetut Claude Code, Codex ja OpenClaw)
docker compose --profile cli up -d

# Isäntäprofiili (ensisijaisesti Linuxille; liittää isäntäjärjestelmän CLI-binäärit vain luku -tilassa)
docker compose --profile host up -d

# Verkkoprofiili (Chromium/Playwright verkkoistuntojen palveluntarjoajia varten)
docker compose --profile web up -d

# Yhdistä CLI ja CLIProxyAPI-sivukontti
docker compose --profile cli --profile cliproxyapi up -d
```

## Käytettävissä olevat profiilit

OmniRoute sisältää Compose-profiilit tärkeimpiä käyttöönottotapoja varten. Valitse ympäristöösi sopiva profiili.

| Profiili        | Palvelu          | Käyttötarkoitus                                                                                                                                                                            | Komento                                      |
| --------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| `base` (oletus) | `omniroute-base` | Käyttöliittymätön palvelin / minimaalinen suoritusympäristö, ei mukana toimitettuja palveluntarjoajien CLI-työkaluja                                                                       | `docker compose --profile base up -d`        |
| `cli`           | `omniroute-cli`  | Agenttipohjaiset työnkulut, jotka kutsuvat komentoja `omniroute providers/setup/doctor` ja mukana toimitettuja CLI-työkaluja (Codex, Claude Code, Droid, OpenClaw)                         | `docker compose --profile cli up -d`         |
| `host`          | `omniroute-host` | Linux-isännät, jotka haluavat `network_mode`-tyyppisen pääsyn isäntäjärjestelmän CLI-työkaluihin liittämällä `~/.local/bin`-, `~/.codex`-, `~/.claude`- jne. hakemistot vain luku -tilassa | `docker compose --profile host up -d`        |
| `cliproxyapi`   | `cliproxyapi`    | Suorita [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI)-sivukontti portissa `8317` ylävirran CLI-välitystä varten                                                              | `docker compose --profile cliproxyapi up -d` |
| `web`           | `omniroute-web`  | Selainta tarvitsevat verkkoistuntojen palveluntarjoajat: `gemini-web`, `claude-web`, `claude-turnstile` (koostaa `runner-web`-kohteen, Chromium sisältyy)                                  | `docker compose --profile web up -d`         |

> Useita profiileja voidaan yhdistää: `docker compose --profile cli --profile cliproxyapi up -d`.

## Isännän CLI-työkalujen määrittäminen, kun OmniRoute toimii Dockerissa

`omniroute setup-codex`, `setup-claude`, `config set <tool>` ja hallintapaneelin
**Tallenna määritykset** -painike kirjoittavat kaikki tiedostoja, kuten `~/.codex/*.config.toml`. Näillä poluilla
on merkitystä vain siinä koneessa, jossa CLI:tä tosiasiassa suoritetaan. Jos komennot suoritetaan
säilön sisällä, tiedostot kirjoitetaan säilön omaan kotihakemistoon (`/home/node` —
levykuva käyttää asetusta `USER node`), josta mikään isäntäkoneen CLI ei koskaan lue niitä ja jossa ne
poistetaan heti, kun säilö luodaan uudelleen.

OmniRoute tunnistaa tämän ja kieltäytyy kirjoittamisesta sekä näyttää ohjeet sen sijaan, että
se ilmoittaisi onnistumisesta, josta ei ole hyötyä: CLI päättyy koodilla `2`, ja API vastaa koodilla `422`
sekä arvolla `containerEphemeralTarget: true`.

### Suositus: suorita CLI isäntäkoneessa ja OmniRoute Dockerissa

Säilö tarjoaa API:n; CLI määrittää isäntäkoneesi työkalut.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # osoita CLI käyttämään säilöä
omniroute setup-codex                      # kirjoittaa isäntäkoneesi todelliseen ~/.codex-hakemistoon
```

Tämä on oikea valinta, kun Codex, Claude Code, Cursor tai vastaava toimii
kannettavallasi — kuten tavallisessa kokoonpanossa.

### Vaihtoehto: liitä isännän määrityshakemistot bind-liitoksina (`host`-profiili)

Jos haluat säilön itsensä kirjoittavan isäntäkoneesi määritykset, liitä
hakemistot säilöön ja määritä `CLI_CONFIG_HOME` osoittamaan liitoksen juureen. `host`-profiili
tekee tämän jo valmiiksi:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Bind-liitos tekee polusta luotettavan: OmniRoute lukee
`/proc/self/mountinfo`-tiedostoa ja sallii kirjoittamisen liitettyihin polkuihin (sekä hakemistoihin,
joiden alihakemistot ovat liitoksia, kuten yllä oleva `/host-home`) mutta
kieltäytyy edelleen kirjoittamasta liittämättömiin polkuihin.

### Poikkeuskeino: määritä säilön omat CLI:t (käytä harkiten)

Kun CLI:t todella sijaitsevat säilön sisällä (`cli`-profiili), kirjoittaminen
on tarkoituksellista. Anna valitsin `--allow-container-write` mille tahansa `setup-*`-komennolle tai aseta
palvelimelle `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true`. Kirjoittaminen suoritetaan,
mutta samalla näytetään varoitus siitä, etteivät muutokset säily säilön poistamisen jälkeen.

> **Tietoturvavaroitus — `cli`-profiili + `docker.sock`-liitos.**
> `cli`-profiili liittää `/var/run/docker.sock`-tiedoston bind-liitoksena, jotta säilön sisäinen
> automaattinen päivitystoiminto voi luoda pinon uudelleen isännän daemonin kautta
> (`src/lib/system/autoUpdate.ts` tarkistaa kyseisen socketin ja ohittaa
> Docker-polun, kun sitä ei löydy). Kyseinen socket on **isäntäkoneen root-tason luottamusraja**:
> kaikki siihen pääsevät voivat ohjata isännän Docker-daemonia
> root-käyttäjänä — ne voivat luoda, tarkastella, pysäyttää ja poistaa minkä tahansa isäntäkoneen säilön.
> Seuraukset:
>
> 1. **Älä koskaan altista `cli`-profiilin porttia verkolle.** Julkaise
>    se osoitteessa `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — lähiverkosta saavutettava `cli`-profiili muuttaa minkä tahansa hallintapaneelitason RCE-haavoittuvuuden
>    isäntäkoneen täydelliseksi vaarantumiseksi.
> 2. **Älä liitä mitään ylimääräisiä isäntäkoneen hakemistoja `cli`-profiiliin.**
>    Docker-socket ja mikä tahansa lisäliitos yhdessä antavat säilölle täydet
>    luku- ja kirjoitusoikeudet tiedostojärjestelmääsi ja isäntäkoneen määrityksiin. Jos työkalun on
>    päästävä projektiin, suorita se paikallisesti CLI-binäärillä — älä liitä projektia
>    `cli`-säilöön.
>
> Jos et tarvitse säilön sisäistä automaattista päivitystä, pidä `cli`-profiili poissa käytöstä
> (`COMPOSE_PROFILES=core,redis` tai lyhyempi). Muut profiilit eivät
> liitä Docker-socketia.
>
> Katso `docs/security/MITM-TPROXY-DECRYPT.md` (gitissä; ei käännetä `/docs`-hakemistoon) saadaksesi lisätietoja MITM:ään liittyvästä uhkamallista
> sekä `docs/security/SUPPLY_CHAIN.md` saadaksesi lisätietoja
> `codex`/`claude-code`/`droid`/`openclaw`-binäärien alkuperäketjusta.

## Redis-sivukontti

OmniRoute käyttää Redisiä hajautetun nopeusrajoittimen ja jaetun välimuistin taustajärjestelmänä. `redis`-palvelu on **aina määritetty** tiedostossa `docker-compose.yml` (sillä ei ole profiilirajoitusta), ja se käynnistyy kaikkien muiden profiilien rinnalla.

| Tieto                    | Arvo                                       |
| ------------------------ | ------------------------------------------ |
| Levykuva                 | `redis:7-alpine`                           |
| Kontin nimi              | `omniroute-redis`                          |
| Sisäinen portti          | `6379`                                     |
| Isännän portti (ohitus)  | `REDIS_PORT` (oletusarvo `6379`)           |
| Isännän sidonta (ohitus) | `REDIS_BIND_HOST` (oletusarvo `127.0.0.1`) |
| Taltio                   | `omniroute-redis-data` → `/data`           |
| Kuntotarkistus           | `redis-cli ping` (10 s:n välein)           |

Liittyvät ympäristömuuttujat:

- `REDIS_URL` — sovellukseen välitettävä yhteysmerkkijono (oletusarvoisesti `redis://redis:6379`).
- `REDIS_PORT` — Redis-kontin isäntäpuolen porttimääritys.
- `REDIS_BIND_HOST` — isäntäverkkoliitäntä, jossa portti julkaistaan. Oletusarvo on `127.0.0.1`.

> **Miksi oletusarvona on loopback-osoite:** sivukontti toimii ilman `requirepass`-määritystä, ja sovellus-
> kontit käyttävät sitä Compose-verkon kautta (`redis:6379`) — julkaistu portti on
> tarkoitettu vain isäntäpuolen työkaluille (`redis-cli`, paikallinen `npm run dev`). Julkaiseminen
> osoitteessa `0.0.0.0` altistaisi todentamattoman Redis-palvelun kaikille lähiverkkosi laitteille. Jos asetat
> `REDIS_BIND_HOST=0.0.0.0`, lisää myös `--requirepass` palvelun `command:`-määritykseen.

**Redisin poistamista käytöstä** ei suositella (nopeusrajoitin siirtyy heikompaan muistipohjaiseen vararatkaisuun). Jos se on välttämätöntä, poista `redis:`-palvelulohko tiedostosta `docker-compose.yml`, kommentoi se pois tai skaalaa palvelu nollaan:

```bash
docker compose up -d --scale redis=0
```

## Tuotantokäytön Compose

Jos haluat käyttää kehitysympäristön rinnalla eristettyä tuotantovedosta, käytä tiedostoa `docker-compose.prod.yml`.

| Tieto                         | Arvo                                                                                    |
| ----------------------------- | --------------------------------------------------------------------------------------- |
| Tiedosto                      | `docker-compose.prod.yml`                                                               |
| Hallintapaneelin oletusportti | `PROD_DASHBOARD_PORT=20130` (yhdistetty sisäiseen porttiin `${DASHBOARD_PORT:-20128}`)  |
| API:n oletusportti            | `PROD_API_PORT=20131`                                                                   |
| Levykuva                      | `omniroute:prod` (koostettu `runner-cli`-kohteesta)                                     |
| Redis-kontti                  | `omniroute-redis-prod` (`redis:8.6.2`, erillinen `redis-prod-data`-taltio)              |
| Datataltio                    | `omniroute-prod-data` (nimetty, säilyy uudelleenkoostamisten välillä)                   |
| Kuntotarkistukset             | `node healthcheck.mjs` + `redis-cli ping`, ja `depends_on` odottaa Redisin kunnossaoloa |

Käyttö:

```bash
# Koosta ja käynnistä tuotantopino
docker compose -f docker-compose.prod.yml up -d --build

# Seuraa lokeja
docker compose -f docker-compose.prod.yml logs -f

# Pysäytä ja poista pino (säilytä taltiot)
docker compose -f docker-compose.prod.yml down
```

Tuotantopino toimii rinnakkain kehitysympäristön Compose-pinon kanssa (konttien nimet, portit ja taltiot ovat erilliset), joten voit jatkaa paikallista kehitystä tuotantoympäristön pysyessä käynnissä.

## Dockerfile-vaiheet

Tietovarasto sisältää monivaiheisen Dockerfile-tiedoston (`Dockerfile`). Käytettävissä on neljä vaihetta; valitse käyttötapaukseesi sopiva `target`.

| Vaihe         | Peruslevykuva         | Tarkoitus                                                                                                                                                                                                                                                                                                                  |
| ------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Asentaa riippuvuudet (`npm ci --legacy-peer-deps`) ja suorittaa komennon `npm run build` (oletuksena Turbopack — katso alta Koontiaikaiset resurssit)                                                                                                                                                                      |
| `runner-base` | `node:26-trixie-slim` | Tuotantoajoympäristö, joka sisältää Next.js:n itsenäisen tulosteen. **Palveluntarjoajien CLI-työkaluja ei sisälly.**                                                                                                                                                                                                       |
| `runner-cli`  | `runner-base`         | Lisää työkalut `git`, `docker.io`, `docker-compose` sekä globaalit CLI-työkalut: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Valitse tämä agenttipohjaisiin työnkulkuihin.**                                                                                                                      |
| `runner-web`  | `runner-base`         | Lisää Playwrightin ja Chromium-selaimen (`--with-deps`) verkkoistuntopalveluntarjoajia varten: `gemini-web`, `claude-web`, `claude-turnstile`. **Valitse tämä käyttäessäsi näitä palveluntarjoajia** — tavallinen levykuva epäonnistuu pyyntöä käsiteltäessä ilman sitä (katso `-web`-huomautus Julkaisukanavat-kohdasta). |

Koosta tietty kohde manuaalisesti:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Koontiaikaiset resurssit

Kolme koontiargumenttia säätelee `builder`-vaiheen resurssikustannuksia. Ne vaikuttavat vain koonnin aikana —
`OMNIROUTE_MEMORY_MB` (alla) on erillinen ajonaikainen säätö.

| Koontiargumentti            | Oletus | Vaikutus                                                                                                                |
| --------------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`    | `0` koostaa webpackilla: pienempi muistihuippu, mutta hitaampi. `1` ottaa Turbopackin käyttöön.                         |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144` | Käynnistetyn `next build` -prosessin V8-keon yläraja (`--max-old-space-size`).                                          |
| `OMNIROUTE_BUILD_WORKERS`   | `2`    | Määrittää arvon `CIRCLE_NODE_TOTAL`; Next johtaa siitä sivutietojen keruun työntekijämäärän kaavalla `workers = N - 1`. |

`OMNIROUTE_BUILD_WORKERS` on asetus, jota kannattaa kasvattaa tehokkaalla koostokoneella ja
epäillä silloin, kun rajoitetuilla resursseilla suoritettava koonti päättyy **sen jälkeen**, kun `✓ Compiled successfully` on näytetty. Jokainen
sivutietojen työntekijä on oma prosessinsa, samoin kuin ylätason `next build`;
VPS-ympäristössä tehty toisto (ongelma #7518) mittasi jokaisen prosessin RSS-muistin huipuksi
~4,5 Gt riippumatta `NODE_OPTIONS`-kekolipusta (Turbopack koostaa
natiivissa/Rust-muistissa V8-keon ulkopuolella). Oletusarvo `2` (→ 1 työntekijä, yhteensä 2
prosessia) on mitoitettu julkaisuprosessin käyttämiä GitHubin ylläpitämiä
16 Gt:n / 4 vCPU:n suorittimia varten. Arvolla `8` (→ 7 työntekijää) kyseisen suorittimen muisti loppui ja
buildkit keskeytti vaiheen virheeseen `ResourceExhausted: ... cannot allocate memory`;
edes `3` (→ 2 työntekijää) ei mahtunut muistiin, kun prosessikohtainen RSS mitattiin
suoraan päättelemisen sijaan. `tests/unit/docker-build-memory-budget.test.ts`
tekee laskutoimitukset mitatun luvun perusteella ja epäonnistuu, jos jompikumpi asetus
ylittää suorittimen kapasiteetin.

Turbopack koostaa natiivissa Rust-muistissa, joka sijaitsee **V8-keon ulkopuolella**, joten
`OMNIROUTE_BUILD_MEMORY_MB` ei rajoita sitä. Muistirajoitetulla isäntäkoneella
OOM-tappaja lähettää koonnille SIGKILL-signaalin ilman minkäänlaista virhetekstiä — koonti yksinkertaisesti
pysähtyy kesken `Creating an optimized production build` -vaiheen, mikä näyttää jumittumiselta
muistin loppumisen sijaan. Siksi `Dockerfile` käyttää oletuksena webpackia
(`OMNIROUTE_USE_TURBOPACK=0`), toisin kuin `npm run dev` / `npm run build`, joissa
Turbopack on koodin oletusasetus: pelkkä `docker build .` ilman koontiargumentteja (jonka
Railway ja muut yhden napsautuksen isännöintipalvelut suorittavat) ei saa päättyä hiljaisesti muistirajoitetulla
koostokoneella. Julkaistuille levykuville välitetään jo eksplisiittisesti `OMNIROUTE_USE_TURBOPACK=0`
tiedostossa `docker-publish.yml`. Koostokoneella, jossa on runsaasti RAM-muistia, voit ottaa
Turbopackin käyttöön nopeampaa koontia varten:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` on käytössä, joten `next build` suorittaa sekä ylätason **että** työntekijäprosessin,
ja kumpikin noudattaa `OMNIROUTE_BUILD_MEMORY_MB`-arvoa erikseen. Mitoita säilön
muistiraja noin kaksinkertaiseksi tähän arvoon nähden, älä samansuuruiseksi.

Tällä lähdekoodipuulla mitatut tulokset (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Paketoija | Säilön muistiraja | Tulos                                          |
| --------- | ----------------- | ---------------------------------------------- |
| Turbopack | 8 GiB / 16 GiB    | OOM-tapettu molemmilla, ilman ilmoitusta       |
| webpack   | 8 GiB             | koontityöntekijä tapettiin SIGKILL-signaalilla |
| webpack   | 12 GiB            | onnistui, huippukulutus 11,1 GiB               |

### Ajonaikaiset oletukset

`runner-base`-vaiheen viemät oletusarvot: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Muistin toiminta Dockerissa:

- Näköistiedosto asettaa arvon `OMNIROUTE_MEMORY_MB=1024` ja johtaa siitä arvon `NODE_OPTIONS=--max-old-space-size=1024`.
- Varsinaisen palvelinprosessin käynnistää erillinen käynnistin, joka lukee muuttujan `OMNIROUTE_MEMORY_MB` ja lisää valitsimen `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node käyttää viimeistä toistettua `--max-old-space-size`-arvoa, joten `OMNIROUTE_MEMORY_MB` määrittää Dockerin tosiasiallisen keon enimmäiskoon.
- Koska näköistiedosto asettaa sen aina, käynnistimen oma RAM-muistin mukaan kalibroitu vara-asetus ei koskaan tule käyttöön Dockerissa. Suurenna arvoa kuormitusta varten erikseen (katso alla oleva taulukko). `2048` on edelleen liian pieni koodausagentin `/v1/responses`-pyynnöille.

### Koodausagenttien käytönaikainen RAM-muisti

Dockerin 1 GiB:n oletusarvo on hallintapaneelin ja kevyen keskustelun vähimmäistaso, ei tuotantokäyttöön sopiva koko. Pitkät `POST /v1/responses` -pyyntöjen rungot (satoja viestejä, kymmeniä työkaluja) säilyttävät pakkauksen aikana muistissa useita graafeja. Kaksi päällekkäistä, kooltaan noin 3 MiB:n / 750 000 tokenin pyyntöä on kaatanut V8:n **12 GiB:n** old-space-muistilla (`FATAL ERROR: Reached heap limit`) ja aiheuttanut myös 16 GiB:n cgroup OOM -virheen. Katso [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Mitoita **cgroupin `--memory` keon yläpuolelle** — natiivipuskurit, SQLite ja pakkauksen välitulokset sijaitsevat V8:n ulkopuolella.

| Kuormitus                                          | `OMNIROUTE_MEMORY_MB`               | Säilö / cgroup                  | Huomautukset                                                                                                                              |
| -------------------------------------------------- | ----------------------------------- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Hallintapaneeli, yksi kevyt keskustelu             | `1024` (näköistiedoston oletusarvo) | ≥2 GiB                          |                                                                                                                                           |
| Yksi koodausagentti (Claude/Codex/Grok)            | `8192`                              | ≥10 GiB                         | Tyypillinen yhden istunnon `/v1/responses`                                                                                                |
| Kaksi samanaikaista pitkää `/v1/responses`-pyyntöä | `10240`–`12288`                     | ≥12–16 GiB                      | Mitattu V8:n kaatuminen noin 12 GiB:n keolla                                                                                              |
| Vähintään kolme samanaikaista pitkää kontekstia    | älä suorita yhdessä prosessissa     | sarjallista / lisää RAM-muistia | Raskaiden pyyntöjen oletusarvoinen pääsyraja on 1 käynnissä oleva pyyntö; sen nostaminen ilman lisämuistia aiheuttaa kaatumisen uudelleen |

Paljaalla raudalla `omniroute serve` kalibroi arvoksi noin 35 % RAM-muistista (rajattuna välille `[512, 4096]`), kun `OMNIROUTE_MEMORY_MB` on **asettamatta**. Docker asettaa arvoksi aina `1024`, joten tätä kalibrointia ei koskaan suoriteta virallisessa näköistiedostossa.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Kriittiset ympäristömuuttujat

Tiedostossa [ENVIRONMENT.md](../reference/ENVIRONMENT.md) dokumentoitujen oletusten lisäksi seuraavat muuttujat ovat tärkeimpiä Docker-ympäristössä:

| Muuttuja                      | Tarkoitus                                                                                                                                                                                                                                                                                                                                       | Oletusarvo                 |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | WebSocket-sillan jaettu salaisuus. **Pakollinen tuotannossa** — aseta arvoksi vahva satunnainen merkkijono.                                                                                                                                                                                                                                     | ei asetettu (on annettava) |
| `REDIS_URL`                   | Nopeusrajoittimen ja välimuistitaustajärjestelmän yhteysmerkkijono                                                                                                                                                                                                                                                                              | `redis://redis:6379`       |
| `REDIS_PORT`                  | Mukana toimitetun Redis-säilön isäntäpuolen portti                                                                                                                                                                                                                                                                                              | `6379`                     |
| `REDIS_BIND_HOST`             | Isäntäverkkoliitäntä, jossa mukana toimitetun Redisin portti julkaistaan (loopback-liitäntä, ellet lisää AUTH-todennusta)                                                                                                                                                                                                                       | `127.0.0.1`                |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Isäntäpolku, joka liitetään `cli`-profiilissa polkuun `/workspace/omniroute` itse päivittyviä työnkulkuja varten                                                                                                                                                                                                                                | `.` (nykyinen hakemisto)   |
| `OMNIROUTE_MEMORY_MB`         | Dockerin erillispalvelimen Node-keon enimmäiskoko suorituksen aikana; ohittaa yllä olevan levykuvan oletusarvon. Koodausagentit: `8192`+ (katso [suorituksenaikainen RAM](#runtime-ram-for-coding-agents)).                                                                                                                                     | `1024`                     |
| `DASHBOARD_PORT` / `API_PORT` | Ohita hallintapaneelin (20128) ja API:n (20129) julkaistut portit                                                                                                                                                                                                                                                                               | `20128` / `20129`          |
| `APP_BIND_HOST`               | Isäntäverkkoliitäntä, jossa docker-compose julkaisee hallintapaneelin, API:n ja reaaliaikaisen WebSocketin portit. Kun `REQUIRE_API_KEY=false` (oletus), `0.0.0.0` julkaisee anonyymin `/v1`-välityspalvelimen lähiverkkoon — laajenna saatavuutta vain asetuksella `REQUIRE_API_KEY=true` tai käyttämällä edessä käänteistä välityspalvelinta. | `127.0.0.1`                |
| `CLIPROXY_BIND_HOST`          | Isäntäverkkoliitäntä, jossa docker-compose julkaisee `cliproxyapi`-sivukontin — sen datataltiolla säilytetään palveluntarjoajan tunnistetietoja.                                                                                                                                                                                                | `127.0.0.1`                |
| `OMNIROUTE_PLUGINS_DIR`       | Hakemisto, jota suorituksenaikainen liitännäisskanneri lukee ja johon se asentaa liitännäiset. Aseta tämä, kun liitännäiset liitetään bind mount -liitoksella: oletusarvo perustuu muuttujaan `HOME`, jota levykuvan ei tarvitse viedä.                                                                                                         | `~/.omniroute/plugins`     |
| `OMNIROUTE_BASE_PATH`         | URL-alipolku, kun sovellus julkaistaan käänteisen välityspalvelimen takana (esim. `/omniroute`)                                                                                                                                                                                                                                                 | _(tyhjä = juuripolku)_     |
| `NEXT_PUBLIC_BASE_URL`        | Julkinen selainlähtöosoite alipolkuineen (esim. `https://host/omniroute`)                                                                                                                                                                                                                                                                       | ei asetettu                |
| `PROD_DASHBOARD_PORT`         | Hallintapaneelin isäntäpuolen portti tiedostolle `docker-compose.prod.yml`                                                                                                                                                                                                                                                                      | `20130`                    |
| `CLIPROXYAPI_PORT`            | `cliproxyapi`-sivukontin isäntäpuolen portti                                                                                                                                                                                                                                                                                                    | `8317`                     |

## Käänteinen välityspalvelin alipolussa (Traefik / nginx)

Next.jsin `basePath` käännetään osaksi erillistä pakettia. OmniRoute tallentaa käännetyn
arvon sovelluksen juuressa olevaan sentinel-tiedostoon (kirjoitetaan komennon `npm run build`
aikana; luetaan tiedostossa `scripts/docker/ensure-docker-base-path.mjs`) ja vertaa sitä
`OMNIROUTE_BASE_PATH`-arvoon säilön käynnistyessä. Kun arvot eroavat toisistaan ja näköistiedosto
on koottu toimialueen juurelle, käynnistyspiste kirjoittaa uudelleen erillisen paketin manifestit,
upotetut `basePath`/`assetPrefix`-literaalit (Next 16 muodostaa SSR-resurssien URL-osoitteet
pelkästään `assetPrefix`-arvosta — korjaaja peilaa alipolun siihen), käännetyt
`/_next/static`-resurssien URL-osoitteet (asiakasviittausten manifestit, mediatuonnit, esirenderöidyt
virhesivut) sekä asiakkaan `process.env`-sovitteen ennen kuin `node dev/run-standalone.mjs`
suoritetaan.

### Koostaminen Composella (suositeltu)

Aseta molemmat muuttujat `.env`-tiedostossa ja koosta sitten uudelleen, jotta näköistiedosto ja
ajonaikainen ympäristö käyttävät samoja arvoja:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` välittää `OMNIROUTE_BASE_PATH`-arvon Dockerin koostamisargumenttina ja
ajonaikaisena ympäristömuuttujana.

### Valmiiksi koostettu juurinäköistiedosto + ajonaikainen alipolku

Julkaistut `diegosouzapw/omniroute:*`-näköistiedostot on koostettu toimialueen juurelle. Voit silti
asettaa `OMNIROUTE_BASE_PATH`-arvon ajon aikana; säilö korjaa paketin kerran käynnistyksen yhteydessä.
Käytä sen kanssa vastaavaa julkista alkuperää:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Määritä käänteinen välityspalvelin välittämään **koko** ulkoinen polku (älä poista
etuliitettä). Traefikin tulee reitittää `PathPrefix(`/omniroute`)` säilöön ilman
`StripPrefix`-toimintoa, jotta Next.js vastaanottaa polun `/omniroute/...` ja tarjoaa resurssit
polusta `/omniroute/_next/...`.

Dockerin kuntotarkistus tutkii kevyen `/healthz`-elinkaaripäätepisteen, jonka eteen lisätään
aktiivinen `OMNIROUTE_BASE_PATH`. `/api/monitoring/health` on edelleen käytettävissä
ihmisten ja hallintapaneelien diagnostiikkaan; jos haluat ohjata säilön HEALTHCHECK-tarkistuksen
takaisin siihen (esimerkiksi perusteellisen kuntotarkistuksen pakottamiseksi), aseta
`OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. Kyseinen polku suorittaa **perusteellisen**
tarkistuksen (tietokanta + valvonnan yhteenveto) — se sopii Dockerin harvoin suoritettavaan
`HEALTHCHECK`-tarkistukseen, jos otat sen uudelleen käyttöön, mutta **ei** Kubernetesin
`livenessProbe`-tarkistusväleihin.

Orkestrointijärjestelmille (Kubernetes, Nomad jne.):

| Tarkistus       | Suosi                                                          | Vältä                                                                           |
| --------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Elossaolo       | HTTP `GET /livez` tai TCP pääportissa (`PORT`, oletus `20128`) | `/api/monitoring/health` elossaolotarkistuksena                                 |
| Valmius         | HTTP `GET /healthz`                                            | Tiukkoja aikakatkaisuja, jotka tulkitsevat varatun tapahtumasilmukan kuolleeksi |
| Syvä / blackbox | `/api/monitoring/health`                                       | —                                                                               |

`/healthz` ilmoittaa prosessin elinkaaren tilan (`ok` / `starting` / `stopping`). `/livez`
tarkistaa vain, että prosessi on elossa (200 aina, kun käsittelijä voidaan suorittaa; se ei odota
valmiutta). Molemmat toimivat silti samassa Noden tapahtumasilmukassa kuin pyyntöjen käsittely, joten
suoritinta kuormittava luettelo- tai pakkaustyö voi viivästyttää niitä — varattu ≠ kuollut. Suosi
TCP-elossaolotarkistusta, jos HTTP-tarkistukset aikakatkaistaan. Täydelliset tarkistusohjeet:
[Valvontaopas — Kubernetes-tarkistusten suositukset](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose Caddyn kanssa (automaattinen HTTPS/TLS)

OmniRoute voidaan julkaista turvallisesti Caddyn automaattisen SSL-varmenteiden käyttöönoton avulla. Varmista, että verkkotunnuksesi DNS:n A-tietue osoittaa palvelimesi IP-osoitteeseen.

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    container_name: omniroute
    restart: unless-stopped
    volumes:
      - omniroute-data:/app/data
    environment:
      - PORT=20128
      # Selaimelle näkyvä alkuperä OAuth-palautuksia, hallintapaneelin linkkejä ja luotuja julkisia URL-osoitteita varten.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Sisäinen palvelinten välinen URL-osoite ajoitettuja töitä ja itseensä kohdistuvia pyyntöjä varten.
      - BASE_URL=http://omniroute:20128
      - AUTH_COOKIE_SECURE=true

  caddy:
    image: caddy:latest
    container_name: caddy
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    command: caddy reverse-proxy --from https://your-domain.com --to http://omniroute:20128

volumes:
  omniroute-data:
```

Caddy asettaa vakiomuotoiset välitysotsakkeet ylävirran säilölle. OmniRoute käyttää
`NEXT_PUBLIC_BASE_URL`-arvoa OAuth-palautusten ja luotujen julkisten linkkien ensisijaisena julkisena
alkuperänä. Todennettujen hallintapaneelikirjoitusten yhteydessä käytetään saman alkuperän pyyntöjä sekä istuntoon sidottua CSRF-suojausta.
Ota `OMNIROUTE_TRUST_PROXY` käyttöön vain edistyneissä käyttöönotoissa, joissa haluat tarkoituksellisesti
OmniRouten johtavan julkisen alkuperän luotetuista välitetyistä otsakkeista eksplisiittisen
määrityksen sijaan.

## Cloudflare Quick Tunnel

Docker-käyttöönottojen hallintapaneelitukeen sisältyy yhdellä napsautuksella käytettävä **Cloudflare Quick Tunnel** kohdassa `Dashboard → Endpoints`. Ensimmäisellä käyttöönotolla `cloudflared` ladataan vain tarvittaessa, tilapäinen tunneli käynnistetään nykyiseen `/v1`-päätepisteeseesi ja luotu `https://*.trycloudflare.com/v1`-URL-osoite näytetään suoraan tavallisen julkisen URL-osoitteesi alla.

Päätepisteiden tunnelipaneelit (Cloudflare, Tailscale, ngrok) voidaan näyttää tai piilottaa kohdasta `Settings → Appearance` muuttamatta aktiivisen tunnelin tilaa.

### Tunnelia koskevat huomautukset

- Quick Tunnel -URL-osoitteet ovat tilapäisiä ja muuttuvat jokaisen uudelleenkäynnistyksen jälkeen.
- Quick Tunnel -tunneleita ei palauteta automaattisesti OmniRouten tai säilön uudelleenkäynnistyksen jälkeen. Ota ne tarvittaessa uudelleen käyttöön hallintapaneelista.
- Hallittu asennus tukee tällä hetkellä Linuxia, macOS:ää ja Windowsia `x64`- ja `arm64`-arkkitehtuureilla.
- Hallitut Quick Tunnel -tunnelit käyttävät oletusarvoisesti HTTP/2-siirtotapaa, jotta rajoitetuissa säilöympäristöissä vältetään häiritsevät QUIC UDP -puskurivaroitukset. Aseta `CLOUDFLARED_PROTOCOL=quic` tai `auto`, jos haluat käyttää toista siirtotapaa.
- Docker-levykuvat sisältävät järjestelmän CA-juurivarmenteet ja välittävät ne hallitulle `cloudflared`-ohjelmalle, mikä estää TLS-luottamusvirheet, kun tunneli alustetaan säilön sisällä.
- Aseta `CLOUDFLARED_BIN=/absolute/path/to/cloudflared`, jos haluat OmniRouten käyttävän olemassa olevaa binääritiedostoa uuden lataamisen sijaan.

## Levykuvatunnisteet

| Levykuva                 | Tunniste | Koko   | Kuvaus                                                  |
| ------------------------ | -------- | ------ | ------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | Uusin **julkaistu** vakaa SemVer-versio (ei git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | Kiinnitä tämä tunnisteluokka GitOpsia varten            |

Usean alustan manifesti: natiivit `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). Docker valitsee vastaavan arkkitehtuurin automaattisesti. Anna `--platform linux/amd64`, jos AMD64-emulointi on pakotettava ARM-isännillä.

### Julkaisukanavat

OmniRoute julkaisee erilliset Docker-kanavat vakaille julkaisuille, aktiivisen julkaisuhaaran testaukselle ja kehityskoontiversioille.

| Kanava                          | Lähde                              | Muuttuvuus                  | Suositeltu käyttö                                                                                                                |
| ------------------------------- | ---------------------------------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Allekirjoitettu/versioitu julkaisu | Muuttumaton                 | Tuotantokäyttöönotot, jotka on kiinnitetty tarkkaan julkaisuun                                                                   |
| `:latest` / `:latest-web`       | Uusin **julkaistu** vakaa SemVer   | Muuttuva vakaa osoitin      | Seuraa vakaita julkaisuja **SemVer-julkaisutyön jälkeen** — ei seuraa `main`-haaraa eikä julkaisemattomia `release/v*`-muutoksia |
| `:next` / `:next-web`           | Nykyinen oletushaara `release/v*`  | Muuttuva esijulkaisuosoitin | Aktiiviseen julkaisuhaaraan lisättyjen, mutta vakaasta julkaisusta vielä puuttuvien korjausten testaaminen                       |
| `:main` / `:main-web`           | `main`-haara                       | Muuttuva kehitysosoitin     | Vain kehitys- ja integraatiotestaus                                                                                              |

#### Verkkoistuntopalveluntarjoajat: `-web`-levykuvat

Jokaisesta yllä olevasta kanavasta on myös `-web`-tunniste (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), joka on koottu `runner-web`-vaiheesta — sama levykuva sekä Playwright ja Chromium-selain. Tavallinen levykuva toimitetaan **ilman** Chromiumia; `gemini-web`, `claude-web` ja `claude-turnstile` tarvitsevat sitä.

Virhe ilmenee vasta myöhemmin, ei käynnistyksen yhteydessä: nämä palveluntarjoajat luettelevat mallinsa ja näkyvät hallintapaneelissa yhdistettyinä, ja vasta ensimmäinen pyyntö epäonnistuu seuraavalla virheellä:

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Jos käytät näitä palveluntarjoajia, lataa käyttämäsi kanavan `-web`-tunniste — mikään muu ei muutu. npm/CLI-asennuksessa (ei Docker-levykuvaa) vastaava puuttuva osa on selainbinääri: suorita isännällä `npx playwright install chromium`.

#### Esijulkaisukanavan käyttäminen

`next`-kanava rakennetaan uudelleen jokaisella työnnöllä nykyiseen oletusarvoiseen `release/v*`-haaraan, ja se julkaistaan sekä AMD64- että ARM64-arkkitehtuurille. Vanhemmat ylläpitohaarat eivät voi korvata sitä. Kanava tarjoaa ladattavan levykuvan korjauksille, jotka on yhdistetty aktiiviseen julkaisuhaaraan ennen seuraavan vakaan tunnisteen luomista.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Docker Composessa korvaa valitun profiilin käyttämä levykuvatunniste, lataa levykuva ja luo palvelu sitten uudelleen:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Turvallisuus ja palautus

`next` on muuttuva esijulkaisukanava. Se voi muuttua jokaisella aktiiviseen julkaisuhaaraan tehtävällä työnnöllä, eikä sitä **tueta tuotantokäytössä**. Kiinnitä levykuvan tiiviste arvioidessasi tiettyä koontiversiota:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Varmuuskopioi OmniRouten datataltio tai liitospisteeseen sidottu datahakemisto ennen testaamista. Palauta aiemmin käytetty vakaa versio tai tiiviste ja luo säilö uudelleen:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Julkaisuhaaran koontiversio ei voi koskaan siirtää `latest`-tunnistetta; vakaan osoittimen voi päivittää vain kelvollinen vakaa semanttinen versio. `next`-levykuville tehdään edelleen julkaisu-levykuvan tarkastus ja estävä CRITICAL-tason haavoittuvuustarkistus.

**`latest` ei takaa git-version ajantasaisuutta.** `main`-haaraan tai aktiiviseen `release/v*`-haaraan yhdistetyt korjaukset **eivät** sisälly `:latest`-levykuvaan, ennen kuin vakaa SemVer-levykuva on julkaistu ja julkaisutyö päivittää `:latest`-tunnisteen (sama tiiviste kuin kyseisellä SemVer-versiolla). Jos `latest` vaikuttaa jumiutuneelta, vaikka korjaus näkyy jo GitHubissa, testaa julkaisuhaaraa lataamalla `:next` tai odota SemVer-tunnistetta.

| Tavoite                                                                                | Käytä                                      |
| -------------------------------------------------------------------------------------- | ------------------------------------------ |
| GitOps/tuotanto, joka ei saa muuttua itsestään                                         | Kiinnitä `:X.Y.Z` (tai levykuvan tiiviste) |
| Seuraa julkaistuja vakaita versioita ja hyväksy uudelleenluonti jokaisella julkaisulla | `:latest`                                  |
| Testaa julkaisemattomia `release/v*`-muutoksia                                         | `:next` (ei tuotantoon)                    |
| Testaa `main`-haaraa                                                                   | `:main` (ei tuotantoon)                    |

## Saatavuus: SQLite-oletuskokoonpano tukee vain yhtä replikointia

OmniRouten Docker-/Kubernetes-vakiokokoonpano on **yksi Node-prosessi + yksi SQLite-kirjoittaja**. Korkeaa käytettävyyttä **ei tueta** tässä topologiassa.

| Rajoite                                                     | Seuraus                                                                                                                                                                                                                                                                                                                                                                                                                       |
| ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Yksi kirjoittaja                                            | **Älä** suorita useita replikoita samaa SQLite-tiedostoa vasten. Se vioittaa tietokannan.                                                                                                                                                                                                                                                                                                                                     |
| Uudelleenluonti / uudelleenkäynnistys / HEALTHCHECK-lopetus | Käynnissä oleviin SSE-yhteyksiin, hallintapaneeli-istuntoihin ja muistissa olevaan tilaan kohdistuu **täydellinen käyttökatko**. Jokaisen yhdistetyn asiakkaan yhteys katkeaa. Tyhjän päätepisteikkunan aikana uudet pyynnöt saavat käänteiseltä välityspalvelimelta vastauksen **`502 Bad Gateway: Unknown error`**, eivät OmniRoute-JSON-vastausta — asiakkaat eivät voi erottaa tätä palveluntarjoajan virheestä (#11015). |
| Sama tapahtumasilmukka kuin `/healthz`                      | Kuormitettu luettelo- tai pakkausjakso voi viivästyttää tarkistuksia, jolloin lyhyt aikakatkaisu käynnistää **ainoan** replikan uudelleen.                                                                                                                                                                                                                                                                                    |

**Tarkistusmatriisi** (katso myös [Kubernetes-tarkistusten suositukset](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Tarkistus        | Kohde                                                            | Älä käytä                                                                       |
| ---------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Toimivuus        | TCP portissa `PORT` (oletus `20128`) tai salliva HTTP `/healthz` | `/api/monitoring/health`                                                        |
| Valmius          | HTTP `GET /healthz`                                              | Tiukkoja aikakatkaisuja, jotka tulkitsevat varatun tapahtumasilmukan kuolleeksi |
| Syvä / ihmisille | `/api/monitoring/health`                                         | Automatisoituna kubeletin toimivuustarkistuksena                                |

**Päivitykset:** varaudu kaikkien istuntojen katkeamiseen. Tyhjennä asiakkaat hallitusti, jos mahdollista; SQLite-oletuskokoonpanossa ei ole rullaavaa päivitystä. Composen `restart: unless-stopped` yhdessä Dockerin `HEALTHCHECK`-tarkistuksen kanssa korvaa myös ainoan prosessin, kun säilön tila on Unhealthy — vaikutusalue on sama.

Kubernetes-katkelma **yhdelle replikalle** (Recreate vaaditaan; älä kasvata `replicas`-arvoa yhtä SQLite-tiedostoa vasten):

```yaml
spec:
  replicas: 1
  strategy:
    type: Recreate
  template:
    spec:
      terminationGracePeriodSeconds: 90
      containers:
        - name: omniroute
          lifecycle:
            preStop:
              exec:
                command: ["/bin/sleep", "15"]
          readinessProbe:
            httpGet:
              path: /healthz
              port: 20128
            periodSeconds: 5
          livenessProbe:
            tcpSocket:
              port: 20128
            periodSeconds: 20
```

`preStop`-viive antaa Kubernetesille aikaa poistaa Servicen päätepisteet ennen SIGTERM-signaalia, jotta **uusi** liikenne ei enää päädy sammutettavaan prosessiin. Käynnissä olevia `/v1/responses`-SSE-yhteyksiä tyhjennetään enintään `SHUTDOWN_TIMEOUT_MS`-ajan (oletus 30 s) raskaan käsittelylupamekanismin kautta (#11015). Prosessiin edelleen saapuvat uudet pyynnöt saavat vastauksen `503` + `Retry-After: 5`. Recreate-toiminnon aiheuttama tyhjän päätepisteen jakso korvaavan replikan Ready-tilaan asti on edelleen täysi käyttökatko — tämä johtuu SQLite-topologiasta, ei tarkistusten virheellisestä määrityksestä.

Ulkoinen Postgres / usean kirjoittajan HA **ei ole** dokumentoitu vakiototeutus. Jos tarvitset korkeaa käytettävyyttä, käytä yhtä replikaa tai topologiaa, jonka projekti on testannut ja dokumentoinut erikseen. Postgres-/MySQL-työtä seurataan kohdassa [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Ennen sen valmistumista ainoa tuettu tapa kasvattaa **suurten** `/v1/responses`-pyyntöjen kapasiteettia on käyttää N:ää toisistaan riippumatonta prosessia (seuraava osio), ei arvoa `replicas > 1` yhdellä taltiolla.

## Ulosskaalaus: N itsenäistä prosessia

Yksi Node-prosessi tarkoittaa **yhtä V8-kekoa**. Kaksi päällekkäistä, noin 3 MiB:n / noin 750k tokenin koodausagentin `POST /v1/responses` -pyyntöä (RTK + Caveman) kaataa kyseisen keon noin 12 Gi:n kohdalla (`FATAL ERROR: Reached heap limit`) ja voi aiheuttaa 16 Gi:n cgroupissa OOM-tilanteen. Katso [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Tämä mittaustulos on **muistibudjettia** koskeva varoitus, ei tuotteen kiinteä kahden samanaikaisen pitkän `/v1/responses`-pyynnön enimmäisraja. Raskaiden keskustelupyyntöjen hyväksyntää rajoittaa automaattisesti johdettu saapuvien tavujen budjetti (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`), joka mitoitetaan saman V8-/cgroup-rajan perusteella — sen korottaminen ohituksella (tai vanhan pyyntömääriin perustuvan `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`-rajan asettaminen) valmiiksi mitoitetussa prosessissa aiheuttaa kaatumisriskin uudelleen. Pienet keskustelupyynnöt, `/healthz`, `/v1/models` ja MCP **eivät** kuulu tämän rajoituksen piiriin.

### Yksi prosessi: enemmän kuin kaksi pitkää `/v1/responses`-pyyntöä

**Hyväkuntoinen** prosessi (keko alle `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`-rajan, oletusarvo `0.75`) **voi** suorittaa enemmän kuin kaksi samanaikaista pitkää `POST /v1/responses`-pyyntöä, kun prosessinlaajuisessa keskeneräisten tavujen budjetissa (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) on vielä tilaa. Rungot, joiden koko on vähintään `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (oletusarvo 256 KiB), varaavat saman raskaan käsittelyn resurssin kuin rakenteeltaan raskaat pyynnöt ja käyttävät samaa [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437)-muutoksen `tryAcquireHealthyHeadroom`-poikkeusta (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Kymmenet samanaikaiset pitkät SSE-asiakkaat (ylläpitäjät tarvitsevat usein 40–50) ovat **muistibudjettia** koskeva kysymys — mitoita keko + ensisijaiset/lisäkapasiteettipaikat + `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — eivät tuotteen kiinteä ”enintään 2” -rajoitus. Paineen alainen keko torjuu edelleen pyyntöjä uudelleenyrityksen sallivalla `503`-vastauksella, jotta #7849 ei toistu.

Voit **moninkertaistaa keot** (itsenäiset V8:n old space -muistialueet) **tänään** seuraavasti:

| Tee                                                                                                                                                                                                        | Älä tee                                                                |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| Suorita **N säilöä/podia**, joista jokaisella on **oma** `DATA_DIR` / taltio                                                                                                                               | Aseta `replicas > 1` käyttämään yhtä SQLite-tiedostoa                  |
| Mitoita raskaat keskeneräiset pyynnöt + hyväkuntoisen keon lisäkapasiteetti keon / keskeneräisten tavujen budjetin perusteella; 1–2 on konservatiivinen #7849-oletusarvo, ei tuotteen kiinteä enimmäisraja | Anna yhdelle prosessille 8× RAM-määrä ja rajoittamaton pyyntömääräraja |
| Valinnainen: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` **jaettuja kiintiölaskureita** varten                                                                                                    | Käsittele Redisiä jaettuna SQLitena — sitä se ei ole                   |
| Kopioi palveluntarjoajien salaisuudet jokaiseen instanssiin (tai hyväksy erilliset koontinäytöt)                                                                                                           | Oleta yhtä koontinäyttöä / yhtä kutsulokia kaikille instansseille      |
| Käytä edessä mitä tahansa kuormantasaajaa; API-avaimeen tai istuntoon perustuva pysyvyys riittää                                                                                                           | Edellytä toimittajakohtaista, koon huomioivaa väliohjelmistoa          |

Laitteisto: instanssikohtaisten samanaikaisten pitkien `/v1/responses`-pyyntöjen määrä on **muistibudjettia** koskeva kysymys (keko + keskeneräisten tavujen budjetti / #10110). N itsenäistä `DATA_DIR`-hakemistoa moninkertaistaa edelleen keot: isäntäkoneen RAM-muistin on katettava `N × cgroup`, ei ”yksi 16 Gi:n podi, jossa N=8”. Älä koskaan käytä asetusta `replicas > 1` yhdelle SQLite-tiedostolle.

Compose-luonnos (kaksi kekoa, kaksi taltiota — ei `deploy.replicas: 2`):

```yaml
services:
  omniroute-a:
    image: diegosouzapw/omniroute:3.8.49
    environment:
      DATA_DIR: /app/data
      OMNIROUTE_MEMORY_MB: "12288"
      QUOTA_STORE_DRIVER: redis
      QUOTA_STORE_REDIS_URL: redis://redis:6379
    volumes: [omniroute-a-data:/app/data]
    ports: ["20128:20128"]
  omniroute-b:
    image: diegosouzapw/omniroute:3.8.49
    environment:
      DATA_DIR: /app/data
      OMNIROUTE_MEMORY_MB: "12288"
      QUOTA_STORE_DRIVER: redis
      QUOTA_STORE_REDIS_URL: redis://redis:6379
    volumes: [omniroute-b-data:/app/data]
    ports: ["20138:20128"]
volumes:
  omniroute-a-data:
  omniroute-b-data:
```

Prosessin sisäinen tiheys (pakkaus pois HTTP-isolaatista) on [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Yksi looginen klusteri jaetun pysyvän tilan päällä on [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Geminin alueelliset virheet Dockerissa

Google AI Studio / Gemini API voi palauttaa HTTP 400 -virheen, jonka tunniste on FAILED_PRECONDITION ja viesti
`User location is not supported for the API use.` Onnistunut pyyntö isäntäkoneessa
ei osoita, että kontti käyttää samaa ulospäin suuntautuvaa reittiä. DNS-järjestys,
IPv4-/IPv6-yhteydet, VPN-reititys ja määritetyt välityspalvelimet voivat poiketa toisistaan. Tarkista
[Googlen tukemat alueet](https://ai.google.dev/gemini-api/docs/available-regions)
sekä yhteyden todellinen reitti; tämä virhe yksinään ei tarkoita virheellistä API-avainta.

### Suosi yhteyskohtaista välityspalvelinta

Käytä OmniRouten [yhteyskohtaista välityspalvelinmääritystä](../ops/PROXY_GUIDE.md#4-level-proxy-system)
Gemini-yhteydelle, jota ongelma koskee, ja suorita sitten **Test Connection** sekä pieni pyyntö
uudelleen samalla mallilla. Näin reititysmuutos rajataan kyseiseen yhteyteen. Varmista,
että välityspalvelin on tavoitettavissa kontista ja että yhteys todella käyttää
sitä. Reitin muuttaminen ei takaa, että ylävirran palvelun alueelliset käyttöehdot täyttyvät.

### Vertaa isäntäkoneen ja kontin verkkoasetuksia

Pidä avain, malli ja pyyntö samoina, kun vertaat todennettuja tuloksia; älä koskaan
liitä tunnistetietoja, välityspalvelimen salasanoja tai täydellisiä valtuutusotsakkeita ongelmaraporttiin.
Tarkista ensin, mitä osoiteperheitä käyttöjärjestelmän nimenselvitys tarjoaa, käyttämällä samaa komentoa
isäntäkoneessa ja kontin sisällä:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Korvaa `omniroute` käyttämälläsi palvelulla (esimerkiksi `omniroute-web`). Nämä
komennot tulostavat osoiteperheet ilman tunnistetietoja tai IP-osoitteita. Palautettu `6`
osoittaa vain IPv6-DNS-tuloksen: se **ei** todista, että IPv6-reitti tai API-yhteys toimii.
Jos `curl` on asennettu, vertaa komentoja `curl -4 -I https://generativelanguage.googleapis.com`
ja `curl -6 -I https://generativelanguage.googleapis.com` kummassakin ympäristössä.
HTTP-vastaus todistaa kyseisen testiyhteyden toimivuuden, vaikka vastaus olisi todentamattomasta
pyynnöstä johtuva virhe; vain todennettu mallipyyntö testaa Geminin käyttökelpoisuuden.

### Isäntätason vaihtoehto: toimiva IPv6 ja nimenselvityskäytäntö

Ongelman [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) ilmoittaja palautti
yhteyden omassa ympäristössään ottamalla kontin IPv6-tuen käyttöön ja muuttamalla glibcin
osoitteenvalintaa. Käsittele tätä ympäristökohtaisena vaihtoehtona. Varmista isäntäkoneen
IPv6-yhteyden, kontin ulospäin suuntautuvan liikenteen ja reitityksen sekä palomuurisääntöjen toimivuus ennen nimenselvityksen asetusten muuttamista.
Pelkkä yksityinen ULA-osoite ei osoita, että julkinen IPv6-yhteys toimii.

Palveluille, jotka on jo liitetty Composen oletusverkkoon, tämä katkelma ottaa
IPv6:n käyttöön kyseisessä verkossa; säilytä muut palvelu-, portti-, taltio- ja määritysasetuksesi:

```yaml
networks:
  default:
    enable_ipv6: true
```

Jos käytössä on nimetty verkko, ota IPv6 käyttöön siinä verkossa, johon palvelu todella liittyy. Docker voi
varata ULA-aliverkon; valitse erikseen määritetty, muiden kanssa päällekkäisyyksiä välttävä aliverkko vain, jos verkkosi
edellyttää sitä. Katso [Dockerin IPv6-verkotus](https://docs.docker.com/engine/daemon/ipv6/)
ja [Composen verkkoasetukset](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

**glibc-pohjaisessa näköistiedostossa** `/etc/gai.conf` voi muuttaa osoitteenvalintaa. Nykyisen
tietovaraston Dockerfile käyttää Debiania; mukautetut musl-pohjaiset näköistiedostot eivät käytä tätä mekanismia.
Raportoitu muutos vaihtaa ULA-tunnisteen arvosta `label fc00::/7 6` arvoon
`label fc00::/7 1`. Käytä lähtökohtana näköistiedoston täydellistä käytäntötaulukkoa ja säilytä sen muut
merkinnät: `label`- tai `precedence`-merkinnän lisääminen korvaa oletustaulukon, joten pelkän
muutetun rivin sisältävä tiedosto ei riitä.
[glibcin määritysviite](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
dokumentoi tämän toiminnan. Liitä tarkistettu tiedosto vain luku -tilassa polkuun `/etc/gai.conf`
ja luo palvelu uudelleen, jotta muutos tulee käyttöön.

Tämä muuttaa käyttöjärjestelmän osoitteenvalintaa **kaikelle kyseisestä kontista lähtevälle liikenteelle**.
Se ei pakota kaikkia sovelluksia valitsemaan IPv6:ta: myös Noden DNS-järjestys ja yhteyden
valinta vaikuttavat. Erityisesti `--dns-result-order=ipv4first` suosii IPv4:ää eikä
korjaa vain IPv4:ää koskevaa toimintahäiriötä. Katso [Noden DNS-järjestys](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Testaa Gemini ja muut palveluntarjoajasi uudelleen isäntätason muutosten jälkeen. Jos haluat peruuttaa muutokset,
poista mukautetun `gai.conf`-tiedoston liitos, palauta aiempi verkkomääritys ja
luo ongelmaan liittyvä palvelu tai verkko uudelleen huoltoikkunan aikana. Verkon luominen uudelleen
voi katkaista yhteyden muilta siihen liitetyiltä konteiltä; älä poista pysyvää datataltiota.

## Tärkeitä huomioita

- **SQLite WAL -tila:** `docker stop` -komennon suorittamisen tulisi antaa päättyä normaalisti, jotta OmniRoute voi kirjata viimeisimmät muutokset takaisin `storage.sqlite`-tiedostoon tarkistuspisteen avulla. Mukana toimitetuissa Compose-tiedostoissa pysäytyksen lisäajaksi on jo asetettu 40 sekuntia. Jos suoritat näköistiedoston suoraan, säilytä asetus `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Aseta arvoksi `true`, jos säännöllisiä ja kirjoitusta edeltäviä varmuuskopioita hallitaan ulkoisesti. Olemassa olevien tietokantojen siirrot edellyttävät silti omaa pysyvää turvatilannevedostaan ja suojausta massasiirtoja vastaan.
- **Tietojen säilyvyys:** Liitä aina taltio polkuun `/app/data`, jotta tietokanta, avaimet ja määritykset säilyvät säilön uudelleenkäynnistysten välillä.
- **Portin määritys:** Voit vaihtaa oletusportin `20128` määrittämällä `PORT`-ympäristömuuttujalle uuden arvon.

## Katso myös

- [Virtuaalikoneen käyttöönotto-opas](../ops/VM_DEPLOYMENT_GUIDE.md) — Virtuaalikoneen, nginxin ja Cloudflaren määritys
- [Fly.io-käyttöönotto-opas](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Käyttöönotto Fly.io-palvelussa
- [Ympäristömääritykset](../reference/ENVIRONMENT.md) — Täydellinen `.env`-viiteopas
