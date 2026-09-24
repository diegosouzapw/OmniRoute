# 🐳 Docker Guide — OmniRoute (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Täydellinen Docker-käyttöönoton viiteopas. Katso pikaohje [README-tiedoston Docker-osiosta](../README.md#-docker).

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
- [Cloudflaren pikatunneli](#cloudflare-quick-tunnel)
- [Levykuvatunnisteet](#image-tags)
- [Saatavuus: SQLite-oletuskokoonpano tukee vain yhtä replikaa](#availability-default-sqlite-is-single-replica)
- [Tärkeitä huomautuksia](#important-notes)

---

## Pikakäynnistys

> **Itse ylläpidetty yhdellä komennolla?** Katso
> [itseylläpito-opas](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (julkaistu levykuva +
> Redis, vain loopback-yhteydet, ei profiilin valintaa). Alla oleva pikakäynnistys on
> yhden säilön vaihtoehto käyttäjille, joilla Redis on jo käytössä muualla.

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
# Kopioi ja muokkaa ensin .env-tiedostoa
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

# CLI-profiili (Claude Code, Codex ja OpenClaw sisäänrakennettuina)
docker compose --profile cli up -d

# Isäntäprofiili (ensisijaisesti Linuxille; liittää isännän CLI-binäärit vain luku -tilassa)
docker compose --profile host up -d

# Verkkoprofiili (Chromium/Playwright verkkoistuntopalveluntarjoajia varten)
docker compose --profile web up -d

# Yhdistä CLI ja CLIProxyAPI-sivuvaunupalvelu
docker compose --profile cli --profile cliproxyapi up -d
```

## Saatavilla olevat profiilit

OmniRoute sisältää Compose-profiilit yleisimpiä käyttöönottomalleja varten. Valitse ympäristöösi sopiva profiili.

| Profiili        | Palvelu          | Milloin käytetään                                                                                                                                                                         | Komento                                      |
| --------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (oletus) | `omniroute-base` | Käyttöliittymätön palvelin / minimaalinen ajoympäristö ilman mukana toimitettuja palveluntarjoajien komentorivityökaluja                                                                  | `docker compose --profile base up -d`        |
| `cli`           | `omniroute-cli`  | Agenttipohjaiset työnkulut, jotka kutsuvat komentoja `omniroute providers/setup/doctor` ja mukana toimitettuja komentorivityökaluja (Codex, Claude Code, Droid, OpenClaw)                 | `docker compose --profile cli up -d`         |
| `host`          | `omniroute-host` | Linux-isännät, jotka tarvitsevat `network_mode`-tyyppisen pääsyn isännän komentorivityökaluihin liittämällä `~/.local/bin`-, `~/.codex`-, `~/.claude`- jne. hakemistot vain luku -tilassa | `docker compose --profile host up -d`        |
| `cliproxyapi`   | `cliproxyapi`    | Suorita [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI)-sivupalvelu portissa `8317` ylävirran komentoriviliikenteen välittämistä varten                                       | `docker compose --profile cliproxyapi up -d` |
| `web`           | `omniroute-web`  | Selaimen vaativat verkkoistuntopalveluntarjoajat: `gemini-web`, `claude-web`, `claude-turnstile` (koostaa `runner-web`-ympäristön, Chromium mukana)                                       | `docker compose --profile web up -d`         |

> Useita profiileja voidaan yhdistää: `docker compose --profile cli --profile cliproxyapi up -d`.

## Isäntäkoneen CLI-työkalujen määrittäminen, kun OmniRoute toimii Dockerissa

`omniroute setup-codex`, `setup-claude`, `config set <tool>` ja hallintapaneelin
**Tallenna määritykset** -painike kirjoittavat kaikki tiedostoja, kuten `~/.codex/*.config.toml`. Näillä poluilla
on merkitystä vain siinä koneessa, jossa CLI:tä todella suoritetaan. Jos komennot suoritetaan
säilön sisällä, tiedostot kirjoitetaan säilön omaan kotihakemistoon (`/home/node` —
levykuva käyttää asetusta `USER node`), josta mikään isäntäkoneen CLI ei niitä koskaan lue ja jossa ne
hävitetään heti, kun säilö luodaan uudelleen.

OmniRoute tunnistaa tämän ja kieltäytyy kirjoittamasta antaen sen sijaan ohjeet,
eikä ilmoita onnistumisesta, jota et voi hyödyntää: CLI päättyy koodilla `2`, ja API vastaa koodilla `422`
sekä arvolla `containerEphemeralTarget: true`.

### Suositus: suorita CLI isäntäkoneessa ja OmniRoute Dockerissa

Säilö tarjoaa API:n; CLI määrittää isäntäkoneesi työkalut.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # kohdista CLI säilöön
omniroute setup-codex                      # kirjoittaa isäntäkoneesi todelliseen ~/.codex-hakemistoon
```

Tämä on oikea valinta, kun Codex, Claude Code, Cursor tai vastaava toimii
kannettavassasi — kuten tavallisesti.

### Vaihtoehto: liitä isäntäkoneen määrityshakemistot bind-liitoksina (`host`-profiili)

Jos haluat säilön itsensä kirjoittavan isäntäkoneesi määrityksiin, liitä
hakemistot säilöön ja aseta `CLI_CONFIG_HOME` osoittamaan liitoksen juureen. `host`-profiili
tekee tämän jo valmiiksi:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Bind-liitos tekee polusta luotettavan: OmniRoute lukee tiedoston
`/proc/self/mountinfo` ja sallii kirjoittamisen liitettyihin polkuihin (sekä hakemistoihin,
joiden alihakemistot ovat liitoksia, mikä vastaa täsmälleen yllä olevaa `/host-home`-rakennetta), mutta
kieltäytyy edelleen kirjoittamasta liittämättömiin polkuihin.

### Poikkeusratkaisu: määritä säilön omat CLI:t (käytä harkiten)

Kun CLI:t todella sijaitsevat säilön sisällä (`cli`-profiili), kirjoittaminen
on tarkoituksellista. Anna `--allow-container-write` mille tahansa `setup-*`-komennolle tai aseta
palvelimelle `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true`. Kirjoittaminen suoritetaan,
mutta samalla annetaan varoitus siitä, etteivät muutokset säily säilön poistamisen jälkeen.

> **Tietoturvavaroitus — `cli`-profiili + `docker.sock`-liitos.**
> `cli`-profiili liittää `/var/run/docker.sock`-tiedoston bind-liitoksena, jotta säilön sisäinen
> automaattinen päivittäjä voi luoda pinon uudelleen isäntäkoneen daemonin kautta
> (`src/lib/system/autoUpdate.ts` tarkistaa kyseisen socketin olemassaolon ja ohittaa
> Docker-polun, kun sitä ei ole). Tämä socket on **isäntäkoneen root-tason luottamusraja**:
> kaikki, mikä pääsee käyttämään sitä, voi hallita isäntäkoneen Docker-daemonia
> root-oikeuksin — se voi luoda, tarkastella, pysäyttää ja poistaa minkä tahansa isäntäkoneen säilön.
> Seuraukset:
>
> 1. **Älä koskaan avaa `cli`-profiilin porttia verkkoon.** Julkaise
>    se osoitteessa `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — lähiverkosta saavutettava `cli`-profiili muuttaa minkä tahansa hallintapaneelitason RCE-haavoittuvuuden
>    isäntäkoneen täydelliseksi vaarantumiseksi.
> 2. **Älä liitä mitään ylimääräisiä isäntäkoneen hakemistoja `cli`-profiiliin.**
>    Docker-socket yhdessä minkä tahansa lisäliitoksen kanssa antaa säilölle täydet
>    luku- ja kirjoitusoikeudet tiedostojärjestelmääsi ja isäntäkoneesi määrityksiin. Jos työkalun on
>    nähtävä projekti, suorita se paikallisesti CLI-binäärillä — älä liitä projektia
>    `cli`-säilöön.
>
> Jos et tarvitse säilön sisäistä automaattista päivitystä, jätä `cli`-profiili pois käytöstä
> (`COMPOSE_PROFILES=core,redis` tai lyhyempi). Muut profiilit eivät
> liitä Docker-socketia.
>
> Katso `docs/security/MITM-TPROXY-DECRYPT.md` (gitissä; sitä ei koota `/docs`-hakemistoon), jossa kuvataan aiheeseen liittyvä
> MITM-uhkamalli, sekä `docs/security/SUPPLY_CHAIN.md`, jossa kuvataan
> `codex`/`claude-code`/`droid`/`openclaw`-binäärien alkuperäketju.

## Redis-sivuvaunu

OmniRoute käyttää Redisiä hajautetun nopeusrajoittimen ja jaetun välimuistin taustajärjestelmänä. `redis`-palvelu on **aina määritetty** tiedostossa `docker-compose.yml` (sillä ei ole profiilirajoitusta), ja se käynnistyy minkä tahansa muun profiilin rinnalla.

| Tieto                  | Arvo                                       |
| ---------------------- | ------------------------------------------ |
| Levykuva               | `redis:7-alpine`                           |
| Kontin nimi            | `omniroute-redis`                          |
| Sisäinen portti        | `6379`                                     |
| Isäntäportti (ohitus)  | `REDIS_PORT` (oletuksena `6379`)           |
| Isäntäsidonta (ohitus) | `REDIS_BIND_HOST` (oletuksena `127.0.0.1`) |
| Taltio                 | `omniroute-redis-data` → `/data`           |
| Terveystarkistus       | `redis-cli ping` (10 s:n välein)           |

Liittyvät ympäristömuuttujat:

- `REDIS_URL` — sovellukseen syötettävä yhteysmerkkijono (oletuksena `redis://redis:6379`).
- `REDIS_PORT` — Redis-kontin isäntäpuolen porttimääritys.
- `REDIS_BIND_HOST` — isäntäverkkoliitäntä, jossa portti julkaistaan. Oletuksena `127.0.0.1`.

> **Miksi oletuksena loopback:** sivuvaunu suoritetaan ilman `requirepass`-asetusta, ja sovellus-
> kontit käyttävät sitä Compose-verkon kautta (`redis:6379`) — julkaistu portti on
> tarkoitettu vain isäntäpuolen työkaluille (`redis-cli`, paikallinen `npm run dev`). Julkaiseminen
> osoitteessa `0.0.0.0` paljastaisi todentamattoman Redis-palvelun kaikille lähiverkkosi laitteille. Jos asetat
> `REDIS_BIND_HOST=0.0.0.0`, lisää myös `--requirepass` palvelun `command:`-määritykseen.

**Redisin poistamista käytöstä** ei suositella (nopeusrajoitin siirtyy heikompaan muistinsisäiseen varajärjestelmään). Jos se on välttämätöntä, poista `redis:`-palvelulohko tiedostosta `docker-compose.yml`, kommentoi se pois tai skaalaa palvelu nollaan:

```bash
docker compose up -d --scale redis=0
```

## Tuotantokäytön Compose

Käytä tiedostoa `docker-compose.prod.yml`, kun haluat suorittaa eristetyn tuotantovedoksen kehitysympäristön rinnalla.

| Tieto                         | Arvo                                                                                         |
| ----------------------------- | -------------------------------------------------------------------------------------------- |
| Tiedosto                      | `docker-compose.prod.yml`                                                                    |
| Hallintapaneelin oletusportti | `PROD_DASHBOARD_PORT=20130` (yhdistetty sisäiseen `${DASHBOARD_PORT:-20128}`-porttiin)       |
| API:n oletusportti            | `PROD_API_PORT=20131`                                                                        |
| Levykuva                      | `omniroute:prod` (koostettu `runner-cli`-kohteesta)                                          |
| Redis-kontti                  | `omniroute-redis-prod` (`redis:8.6.2`, erillinen `redis-prod-data`-taltio)                   |
| Datataltio                    | `omniroute-prod-data` (nimetty ja säilyy uudelleenkoostamisten välillä)                      |
| Terveystarkistukset           | `node healthcheck.mjs` + `redis-cli ping`; `depends_on` on ehdollistettu Redisin terveydelle |

Käyttö:

```bash
# Koosta ja käynnistä tuotantopino
docker compose -f docker-compose.prod.yml up -d --build

# Seuraa lokeja
docker compose -f docker-compose.prod.yml logs -f

# Pysäytä ja poista pino (säilytä taltiot)
docker compose -f docker-compose.prod.yml down
```

Tuotantopino toimii rinnakkain kehitysympäristön Compose-pinon kanssa (eri konttien nimet, portit ja taltiot), joten voit jatkaa paikallista kehitystä tuotantoympäristön pysyessä käynnissä.

## Dockerfile-vaiheet

Tietovaraston mukana toimitetaan monivaiheinen Dockerfile (`Dockerfile`). Käytettävissä on neljä vaihetta; valitse käyttötapaukseesi sopiva `target`.

| Vaihe         | Peruslevykuva         | Tarkoitus                                                                                                                                                                                                                                                                                                                  |
| ------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Asentaa riippuvuudet (`npm ci --legacy-peer-deps`) ja suorittaa komennon `npm run build` (oletuksena Turbopack — katso alta Koontiaikaiset resurssit)                                                                                                                                                                      |
| `runner-base` | `node:26-trixie-slim` | Tuotantoajoympäristö, joka sisältää itsenäisen Next.js-tulosteen. **Palveluntarjoajien CLI-työkaluja ei sisällytetä.**                                                                                                                                                                                                     |
| `runner-cli`  | `runner-base`         | Lisää paketit `git`, `docker.io`, `docker-compose` sekä globaalit CLI-työkalut: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Valitse tämä agenttipohjaisiin työnkulkuihin.**                                                                                                                       |
| `runner-web`  | `runner-base`         | Lisää Playwrightin ja Chromium-selaimen (`--with-deps`) verkkoistuntopalveluntarjoajia varten: `gemini-web`, `claude-web`, `claude-turnstile`. **Valitse tämä käyttäessäsi kyseisiä palveluntarjoajia** — tavallinen levykuva epäonnistuu pyyntöä käsiteltäessä ilman sitä (katso Julkaisukanavat-osion `-web`-huomautus). |

Koosta tietty kohde manuaalisesti:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Koontiaikaiset resurssit

Kolme koontiargumenttia hallitsee `builder`-vaiheen resurssien kulutusta. Ne vaikuttavat vain koontiaikana —
`OMNIROUTE_MEMORY_MB` (alla) on erillinen ajonaikainen asetus.

| Koontiargumentti            | Oletus | Vaikutus                                                                                                        |
| --------------------------- | ------ | --------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `1`    | Arvo `0` koostaa webpackilla. Pienempi muistin huippukulutus, mutta hitaampi.                                   |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144` | V8-keon yläraja (`--max-old-space-size`) käynnistetylle `next build` -prosessille.                              |
| `OMNIROUTE_BUILD_WORKERS`   | `2`    | Välitetään muuttujalle `CIRCLE_NODE_TOTAL`; Next johtaa siitä sivutietojen keräämiseen arvon `workers = N - 1`. |

`OMNIROUTE_BUILD_WORKERS` on asetus, jota kannattaa kasvattaa tehokkaassa koontiympäristössä ja
epäillä, kun rajallisilla resursseilla suoritettava koonti keskeytyy **vaiheen** `✓ Compiled successfully` **jälkeen**. Jokainen
sivutietojen käsittelijä on oma prosessinsa, samoin kuin ylätason `next build`;
VPS-ympäristössä tehdyssä toistossa (ongelma #7518) kunkin prosessin RSS-muistin
huippukulutukseksi mitattiin noin 4,5 Gt riippumatta `NODE_OPTIONS`-kekolipusta
(Turbopack kääntää V8-keon ulkopuolisessa natiivissa/Rust-muistissa). Oletusarvo
`2` (→ 1 käsittelijä, yhteensä 2 prosessia) on mitoitettu julkaisuprosessin
käyttämille GitHubin ylläpitämille ympäristöille, joissa on 16 Gt muistia ja
4 vCPU:ta. Arvolla `8` (→ 7 käsittelijää) ympäristön muisti loppui ja buildkit
keskeytti vaiheen virheellä `ResourceExhausted: ... cannot allocate memory`;
myöskään arvo `3` (→ 2 käsittelijää) ei mahtunut muistiin, kun prosessikohtainen
RSS mitattiin suoraan arvioinnin sijaan. `tests/unit/docker-build-memory-budget.test.ts`
suorittaa laskutoimitukset mitatun arvon perusteella ja epäonnistuu, jos jompikumpi
asetus ylittää ympäristön kapasiteetin.

Turbopack kääntää natiivissa Rust-muistissa, joka sijaitsee **V8-keon ulkopuolella**, joten
`OMNIROUTE_BUILD_MEMORY_MB` ei rajoita sitä. Muistirajoitetulla isäntäkoneella OOM-tappaja
keskeyttää tällöin koonnin SIGKILL-signaalilla ilman mitään virhetekstiä — koonti vain
pysähtyy kesken vaiheen `Creating an optimized production build`, mikä vaikuttaa
jumittumiselta muistin loppumisen sijaan. Jos koonti-isännän resurssit ovat rajalliset,
vaihda paketoijaa:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=0 \
  -t omniroute:base .
```

`webpackBuildWorker` on käytössä, joten `next build` suorittaa ylätason prosessin **ja**
käsittelijäprosessin, ja kumpikin noudattaa `OMNIROUTE_BUILD_MEMORY_MB`-arvoa erikseen.
Mitoita säilön raja hieman yli kaksinkertaiseksi kyseiseen arvoon nähden, älä vain sen
suuruiseksi.

Tässä lähdekoodipuussa mitatut tulokset (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Paketoija | Säilön muistiraja | Tulos                                               |
| --------- | ----------------- | --------------------------------------------------- |
| Turbopack | 8 GiB / 16 GiB    | OOM-tappaja keskeytti molemmilla, hiljaisesti       |
| webpack   | 8 GiB             | koontikäsittelijä keskeytettiin SIGKILL-signaalilla |
| webpack   | 12 GiB            | onnistui, huippukulutus 11,1 GiB                    |

### Ajonaikaiset oletusarvot

`runner-base`-vaiheen viemät oletusarvot: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Muistin toiminta Dockerissa:

- Levykuva asettaa arvon `OMNIROUTE_MEMORY_MB=1024` ja johtaa siitä arvon `NODE_OPTIONS=--max-old-space-size=1024`.
- Varsinaisen palvelinprosessin käynnistää erillinen käynnistysohjelma, joka lukee muuttujan `OMNIROUTE_MEMORY_MB` ja lisää valitsimen `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node käyttää viimeistä toistettua `--max-old-space-size`-arvoa, joten `OMNIROUTE_MEMORY_MB` määrittää Dockerin todellisen keon rajan.
- Koska levykuva asettaa sen aina, käynnistysohjelman oma RAM-muistin mukaan kalibroitu varavaihtoehto ei koskaan tule käyttöön Dockerissa. Kasvata arvoa erikseen työkuormaa varten (katso alla oleva taulukko). `2048` on edelleen liian pieni koodausagenttien `/v1/responses`-pyynnöille.

### Koodausagenttien ajonaikainen RAM-muisti

Dockerin 1 GiB:n oletusarvo on vähimmäistaso hallintapaneelille ja kevyelle keskustelulle, ei tuotantokäyttöön sopiva mitoitus. Pitkät `POST /v1/responses` -pyyntörungot (satoja viestejä, kymmeniä työkaluja) säilyttävät pakkauksen aikana muistissa useita graafeja. Kaksi päällekkäistä noin 3 MiB:n / noin 750 000 tokenin pyyntöä ovat keskeyttäneet V8:n **12 GiB:n** old-space-tilassa (`FATAL ERROR: Reached heap limit`) ja aiheuttaneet myös 16 GiB:n cgroup-OOM-tilanteen. Katso [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Mitoita **cgroupin `--memory` keon kokoa suuremmaksi** — natiivipuskurit, SQLite ja pakkauksen välitulokset sijaitsevat V8:n ulkopuolella.

| Työkuorma                                          | `OMNIROUTE_MEMORY_MB`           | Säilö / cgroup               | Huomautukset                                                                                                                      |
| -------------------------------------------------- | ------------------------------- | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Hallintapaneeli, yksi kevyt keskustelu             | `1024` (levykuvan oletus)       | ≥2 GiB                       |                                                                                                                                   |
| Yksi koodausagentti (Claude/Codex/Grok)            | `8192`                          | ≥10 GiB                      | Tyypillinen yhden istunnon `/v1/responses`                                                                                        |
| Kaksi samanaikaista pitkää `/v1/responses`-pyyntöä | `10240`–`12288`                 | ≥12–16 GiB                   | V8:n mitattu keskeytys noin 12 GiB:n keolla                                                                                       |
| Vähintään kolme samanaikaista pitkää kontekstia    | älä suorita yhdessä prosessissa | sarjoita / lisää RAM-muistia | Raskaiden pyyntöjen oletusraja on yksi käsiteltävä pyyntö; rajan kasvattaminen ilman lisämuistia aiheuttaa keskeytyksen uudelleen |

`omniroute serve` kalibroi paljaalla raudalla käyttöön noin 35 % RAM-muistista (rajattuna välille `[512, 4096]`), kun `OMNIROUTE_MEMORY_MB` on **asettamatta**. Docker asettaa aina arvon `1024`, joten tätä kalibrointia ei koskaan suoriteta virallisessa levykuvassa.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Kriittiset ympäristömuuttujat

Tiedostossa [ENVIRONMENT.md](../reference/ENVIRONMENT.md) dokumentoitujen oletusarvojen lisäksi seuraavat muuttujat ovat tärkeimpiä Docker-ympäristössä:

| Muuttuja                      | Tarkoitus                                                                                                                                                                                                                                                                                                                      | Oletusarvo                 |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | WebSocket-sillan jaettu salaisuus. **Pakollinen tuotannossa** — aseta arvoksi vahva satunnainen merkkijono.                                                                                                                                                                                                                    | ei asetettu (on annettava) |
| `REDIS_URL`                   | Nopeusrajoittimen ja välimuistin taustajärjestelmän yhteysmerkkijono                                                                                                                                                                                                                                                           | `redis://redis:6379`       |
| `REDIS_PORT`                  | Isäntäpuolen portti mukana toimitetulle Redis-säilölle                                                                                                                                                                                                                                                                         | `6379`                     |
| `REDIS_BIND_HOST`             | Isännän verkkoliitäntä, jossa mukana toimitetun Redis-säilön portti julkaistaan (loopback, ellet lisää AUTH-todennusta)                                                                                                                                                                                                        | `127.0.0.1`                |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Isäntäpolku, joka liitetään `cli`-profiilissa polkuun `/workspace/omniroute` automaattisia päivitystyönkulkuja varten                                                                                                                                                                                                          | `.` (nykyinen hakemisto)   |
| `OMNIROUTE_MEMORY_MB`         | Dockerin itsenäisen palvelimen Node-keon enimmäiskoko suorituksen aikana; ohittaa yllä olevan levykuvan oletusarvon. Koodausagentit: `8192`+ (katso [suorituksenaikainen RAM](#runtime-ram-for-coding-agents)).                                                                                                                | `1024`                     |
| `DASHBOARD_PORT` / `API_PORT` | Ohita hallintapaneelin (20128) ja API:n (20129) julkaistut portit                                                                                                                                                                                                                                                              | `20128` / `20129`          |
| `APP_BIND_HOST`               | Isännän verkkoliitäntä, jossa docker-compose julkaisee hallintapaneelin, API:n ja reaaliaikaisen WebSocketin portit. Kun `REQUIRE_API_KEY=false` (oletus), `0.0.0.0` altistaa anonyymin `/v1`-välityspalvelimen lähiverkolle — laajenna saatavuutta vain, jos `REQUIRE_API_KEY=true` tai edessä on käänteinen välityspalvelin. | `127.0.0.1`                |
| `CLIPROXY_BIND_HOST`          | Isännän verkkoliitäntä, jossa docker-compose julkaisee `cliproxyapi`-sivuvaunun — sen tietotaltio sisältää palveluntarjoajan tunnistetiedot.                                                                                                                                                                                   | `127.0.0.1`                |
| `OMNIROUTE_PLUGINS_DIR`       | Hakemisto, jota suorituksenaikainen liitännäisskanneri lukee ja johon se asentaa liitännäiset. Aseta tämä, kun liitännäiset on liitetty bind mount -liitoksella: oletusarvo määräytyy `HOME`-muuttujan mukaan, jota levykuvan ei tarvitse viedä ympäristöön.                                                                   | `~/.omniroute/plugins`     |
| `OMNIROUTE_BASE_PATH`         | URL-alipolku, kun sovellus julkaistaan käänteisen välityspalvelimen takana (esim. `/omniroute`)                                                                                                                                                                                                                                | _(tyhjä = juuri)_          |
| `NEXT_PUBLIC_BASE_URL`        | Julkinen selainlähtöosoite alipolkuineen (esim. `https://host/omniroute`)                                                                                                                                                                                                                                                      | ei asetettu                |
| `PROD_DASHBOARD_PORT`         | Isäntäpuolen hallintapaneeliportti tiedostolle `docker-compose.prod.yml`                                                                                                                                                                                                                                                       | `20130`                    |
| `CLIPROXYAPI_PORT`            | Isäntäpuolen portti `cliproxyapi`-sivuvaunulle                                                                                                                                                                                                                                                                                 | `8317`                     |

## Käänteinen välityspalvelin alipolussa (Traefik / nginx)

Next.jsin `basePath` käännetään osaksi standalone-pakettia. OmniRoute tallentaa kiinteästi
määritetyn arvon sovelluksen juuressa olevaan sentinel-tiedostoon (kirjoitetaan komennon
`npm run build` aikana ja luetaan tiedostossa
`scripts/docker/ensure-docker-base-path.mjs`) ja vertaa sitä arvoon
`OMNIROUTE_BASE_PATH`, kun säilö käynnistyy. Kun arvot poikkeavat toisistaan ja levykuva
on rakennettu toimialueen juurta varten, käynnistyspiste kirjoittaa uudelleen standalone-manifestit,
sisällytetyt `basePath`-/`assetPrefix`-literaalit (Next 16 muodostaa SSR-resurssien URL-osoitteet
pelkästään `assetPrefix`-arvosta — korjaustyökalu kopioi alipolun siihen), kiinteästi
määritetyt `/_next/static`-resurssien URL-osoitteet (asiakasviitemanifestit, mediatiedostojen
tuonnit ja esirenderöidyt virhesivut) sekä asiakkaan `process.env`-sovitteen ennen kuin
`node dev/run-standalone.mjs` suoritetaan.

### Rakentaminen Composella (suositus)

Määritä molemmat muuttujat `.env`-tiedostossa ja rakenna sitten uudelleen, jotta levykuvan
ja suoritusympäristön asetukset vastaavat toisiaan:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` välittää `OMNIROUTE_BASE_PATH`-arvon Dockerin rakennusargumenttina
ja suoritusympäristön ympäristömuuttujana.

### Valmiiksi rakennettu juurilevykuva + suorituksenaikainen alipolku

Julkaistut `diegosouzapw/omniroute:*`-levykuvat on rakennettu toimialueen juurta varten.
Voit silti määrittää `OMNIROUTE_BASE_PATH`-arvon suorituksen aikana; säilö korjaa paketin
kerran käynnistyksen yhteydessä. Käytä sen kanssa vastaavaa julkista alkuperää:

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
`StripPrefix`-toimintoa, jotta Next.js vastaanottaa polun `/omniroute/...` ja tarjoaa
resurssit polusta `/omniroute/_next/...`.

Dockerin kuntotarkistus käyttää kevyttä elinkaaren `/healthz`-päätepistettä, jonka
etuliitteenä on aktiivinen `OMNIROUTE_BASE_PATH`. `/api/monitoring/health` on edelleen
käytettävissä ihmisten ja koontinäyttöjen diagnostiikkaan. Jos haluat ohjata säilön
HEALTHCHECK-tarkistuksen takaisin siihen (esimerkiksi perusteellisen kuntotarkistuksen
käyttöönottoa varten), määritä
`OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. Kyseinen polku suorittaa
**perusteellisen** tarkistuksen (tietokanta + valvonnan yhteenveto) — se soveltuu
Dockerin harvakseltaan suoritettavaan `HEALTHCHECK`-tarkistukseen, jos päätät ottaa sen
uudelleen käyttöön, mutta **ei** Kubernetesin `livenessProbe`-tarkistusten aikaväleille.

Orkestrointijärjestelmille (Kubernetes, Nomad jne.):

| Tarkistus                 | Suosi                                                          | Vältä                                                                             |
| ------------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Elossaolo                 | HTTP `GET /livez` tai TCP pääportissa (`PORT`, oletus `20128`) | `/api/monitoring/health` elossaolotarkistuksena                                   |
| Valmius                   | HTTP `GET /healthz`                                            | Tiukkoja aikakatkaisuja, jotka tulkitsevat kiireisen tapahtumasilmukan kuolleeksi |
| Perusteellinen / blackbox | `/api/monitoring/health`                                       | —                                                                                 |

`/healthz` ilmoittaa prosessin elinkaaren tilan (`ok` / `starting` / `stopping`).
`/livez` tarkistaa vain, että prosessi on elossa (palauttaa arvon 200 aina, kun käsittelijä
voidaan suorittaa; se ei odota valmiutta). Molemmat suoritetaan edelleen samassa Noden
tapahtumasilmukassa kuin pyyntöjen käsittely, joten suoritinaikaa vaativa luettelo- tai
pakkaustyö voi viivästyttää niitä — kiireinen ≠ kuollut. Suosi TCP-elossaolotarkistusta,
jos HTTP-tarkistukset aikakatkaistaan. Täydelliset tarkistusohjeet:
[Valvontaopas — Kubernetes-tarkistusten suositukset](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose Caddyn kanssa (HTTPS Auto-TLS)

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
      # Selaimelle näkyvä origin OAuth-palautuskutsuja, hallintapaneelin linkkejä ja luotuja julkisia URL-osoitteita varten.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Sisäinen palvelimien välinen URL-osoite ajastettuja töitä ja itseensä kohdistuvia hakuja varten.
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

Caddy asettaa standardit välitysotsakkeet taustalla olevalle säilölle. OmniRoute käyttää
`NEXT_PUBLIC_BASE_URL`-arvoa OAuth-palautuskutsujen ja luotujen julkisten linkkien ensisijaisena julkisena originina;
todennetut hallintapaneelin kirjoituspyynnöt käyttävät saman originin pyyntöjä sekä istuntoon sidottua CSRF-suojausta.
Ota `OMNIROUTE_TRUST_PROXY` käyttöön vain edistyneissä käyttöönotoissa, joissa haluat tarkoituksellisesti
OmniRouten johtavan julkisen originin luotetuista välitetyistä otsakkeista eksplisiittisen
määrityksen sijaan.

## Cloudflare Quick Tunnel

Docker-käyttöönottojen hallintapaneelituki sisältää yhdellä napsautuksella käyttöönotettavan **Cloudflare Quick Tunnel** -toiminnon kohdassa `Dashboard → Endpoints`. Ensimmäisellä käyttöönotolla `cloudflared` ladataan vain tarvittaessa, nykyiseen `/v1`-päätepisteeseesi käynnistetään väliaikainen tunneli ja luotu `https://*.trycloudflare.com/v1`-URL-osoite näytetään suoraan tavallisen julkisen URL-osoitteesi alapuolella.

Päätepisteiden tunnelipaneelit (Cloudflare, Tailscale, ngrok) voidaan näyttää tai piilottaa kohdassa `Settings → Appearance` muuttamatta aktiivisen tunnelin tilaa.

### Tunnelia koskevat huomautukset

- Quick Tunnel -URL-osoitteet ovat väliaikaisia ja vaihtuvat jokaisen uudelleenkäynnistyksen jälkeen.
- Quick Tunnel -tunneleita ei palauteta automaattisesti OmniRouten tai säilön uudelleenkäynnistyksen jälkeen. Ota ne tarvittaessa uudelleen käyttöön hallintapaneelista.
- Hallittu asennus tukee tällä hetkellä Linuxia, macOS:ää ja Windowsia `x64`- ja `arm64`-arkkitehtuureilla.
- Hallitut Quick Tunnel -tunnelit käyttävät oletusarvoisesti HTTP/2-siirtoprotokollaa, jotta rajoitetuissa säilöympäristöissä vältetään häiritsevät QUIC UDP -puskurivaroitukset. Aseta `CLOUDFLARED_PROTOCOL=quic` tai `auto`, jos haluat käyttää toista siirtoprotokollaa.
- Docker-kuvat sisältävät järjestelmän CA-juurivarmenteet ja välittävät ne hallitulle `cloudflared`-prosessille, mikä estää TLS-luottamusvirheet tunnelin käynnistyessä säilön sisällä.
- Aseta `CLOUDFLARED_BIN=/absolute/path/to/cloudflared`, jos haluat OmniRouten käyttävän olemassa olevaa binääritiedostoa uuden lataamisen sijaan.

## Levykuvatunnisteet

| Levykuva                 | Tunniste | Koko   | Kuvaus                                                    |
| ------------------------ | -------- | ------ | --------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | Korkein **julkaistu** vakaa SemVer-versio (ei git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | Kiinnitä tämän tyyppinen tunniste GitOps-käyttöä varten   |

Monialustainen manifesti: natiivit `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). Docker valitsee vastaavan arkkitehtuurin automaattisesti; anna `--platform linux/amd64`, jos AMD64-emulointi on pakotettava ARM-isännillä.

### Julkaisukanavat

OmniRoute julkaisee erilliset Docker-kanavat vakaille julkaisuille, aktiivisen julkaisuhaaran testaukseen ja kehitysversioille.

| Kanava                          | Lähde                                      | Muuttuvuus                  | Suositeltu käyttö                                                                                                               |
| ------------------------------- | ------------------------------------------ | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Allekirjoitettu/versioitu julkaisu         | Muuttumaton                 | Tuotantokäyttöönotot, joissa kiinnitetään tarkka julkaisu                                                                       |
| `:latest` / `:latest-web`       | Korkein **julkaistu** vakaa SemVer         | Muuttuva vakaa osoitin      | Seuraa vakaita julkaisuja **SemVer-julkaisutyön jälkeen** — ei seuraa `main`-haaraa tai julkaisemattomia `release/v*`-muutoksia |
| `:next` / `:next-web`           | Nykyinen oletusarvoinen `release/v*`-haara | Muuttuva esijulkaisuosoitin | Aktiiviseen julkaisuhaaraan lisättyjen mutta vielä vakaasta julkaisusta puuttuvien korjausten testaaminen                       |
| `:main` / `:main-web`           | `main`-haara                               | Muuttuva kehitysosoitin     | Vain kehitys- ja integraatiotestaukseen                                                                                         |

#### Verkkoistunnon tarjoajat: `-web`-levykuvat

Jokaisesta yllä olevasta kanavasta on myös `-web`-tunniste (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), joka rakennetaan `runner-web`-vaiheesta — sama levykuva, johon on lisätty Playwright ja Chromium-selain. Tavallinen levykuva toimitetaan **ilman** Chromiumia; `gemini-web`, `claude-web` ja `claude-turnstile` tarvitsevat sitä.

Virhe ilmenee viiveellä, ei käynnistyksen aikana: nämä tarjoajat näyttävät mallinsa ja näkyvät hallintapaneelissa yhdistettyinä, ja vasta ensimmäinen pyyntö epäonnistuu seuraavalla virheellä:

```
[500]: Ulkoisen playwright-moduulin lataaminen epäonnistui: Virhe: Moduulia ei löydy
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Jos käytät näitä tarjoajia, vedä jo käyttämäsi kanavan `-web`-tunniste — mikään muu ei muutu. npm/CLI-asennuksessa (ei Docker-levykuvaa) vastaava puuttuva osa on selaimen binääritiedosto: suorita isännällä `npx playwright install chromium`.

#### Esijulkaisukanavan käyttäminen

`next`-kanava rakennetaan uudelleen jokaisella työnnöllä nykyiseen oletusarvoiseen `release/v*`-haaraan, ja se julkaistaan sekä AMD64- että ARM64-arkkitehtuurille. Vanhemmat ylläpitohaarat eivät voi korvata sitä. Kanava tarjoaa vedettävän levykuvan korjauksille, jotka on yhdistetty aktiiviseen julkaisuhaaraan ennen seuraavan vakaan tunnisteen luomista.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Korvaa Docker Composessa valitun profiilin käyttämä levykuvatunniste ja vedä sekä luo palvelu sitten uudelleen:

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

`next` on vaihtuva esijulkaisukanava. Se voi muuttua jokaisella aktiiviseen julkaisuhaaraan tehdyllä työnnöllä, eikä sitä **tueta tuotantokäytössä**. Kiinnitä levykuvan tiiviste arvioidessasi tiettyä koontiversiota:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Varmuuskopioi OmniRouten tietotaltio tai bind-liitetty tietohakemisto ennen testaamista. Palauta aiemmin käytetty vakaa versio tai tiiviste ja luo säilö uudelleen, jos haluat palata aiempaan versioon:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Julkaisuhaaran koontiversio ei voi koskaan siirtää `latest`-osoitinta; vain ehdot täyttävä vakaa semanttinen versio voi päivittää vakaan osoittimen. `next`-levykuvissa säilyvät julkaisuun kuuluvat levykuvan tarkastus ja estävä CRITICAL-haavoittuvuustarkistus.

**`latest` ei takaa git-sisällön ajantasaisuutta.** `main`-haaraan tai aktiiviseen `release/v*`-haaraan yhdistetyt korjaukset **eivät** sisälly `:latest`-levykuvaan, ennen kuin vakaa SemVer-levykuva julkaistaan ja julkaisutyö päivittää `:latest`-osoittimen (sama tiiviste kuin kyseisellä SemVer-versiolla). Jos `latest` vaikuttaa jumiutuneelta, vaikka korjaus näkyy jo GitHubissa, vedä `:next` julkaisuhaaran testaamista varten tai odota SemVer-tunnistetta.

| Tavoite                                                                                              | Käytä                                      |
| ---------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| GitOps/tuotanto, joka ei saa muuttua                                                                 | Kiinnitä `:X.Y.Z` (tai levykuvan tiiviste) |
| Julkaistujen vakaiden versioiden seuraaminen ja uudelleenluonnin hyväksyminen jokaisella julkaisulla | `:latest`                                  |
| Julkaisemattomien `release/v*`-muutosten testaaminen                                                 | `:next` (ei tuotantoon)                    |
| `main`-haaran testaaminen                                                                            | `:main` (ei tuotantoon)                    |

## Saatavuus: oletusarvoinen SQLite tukee vain yhtä replikaa

Vakioasennuksen Docker-/Kubernetes-OmniRoute koostuu **yhdestä Node-prosessista ja yhdestä SQLite-kirjoittajasta**. Tämä topologia **ei tue** korkeaa käytettävyyttä.

| Rajoite                                                     | Seuraus                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ----------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Yksi kirjoittaja                                            | **Älä** suorita useita replikoita samaa SQLite-tiedostoa vasten. Se vioittaa tietokannan.                                                                                                                                                                                                                                                                                                                                   |
| Uudelleenluonti / uudelleenkäynnistys / HEALTHCHECK-lopetus | Käynnissä oleviin SSE-yhteyksiin, hallintapaneeli-istuntoihin ja muistissa olevaan tilaan tulee **täydellinen käyttökatko**. Jokaisen yhdistetyn asiakkaan yhteys katkeaa. Tyhjän päätepisteikkunan aikana uudet pyynnöt saavat käänteiseltä välityspalvelimelta virheen **`502 Bad Gateway: Unknown error`**, eivät OmniRoute-JSON-vastausta — asiakkaat eivät pysty erottamaan tätä palveluntarjoajan virheestä (#11015). |
| Sama tapahtumasilmukka kuin `/healthz`                      | Kuormitettu luettelo- tai pakkausjakso voi viivästyttää tarkistuksia; lyhyt aikakatkaisu käynnistää tällöin **ainoan** replikan uudelleen.                                                                                                                                                                                                                                                                                  |

**Tarkistusmatriisi** (katso myös [Kubernetes-tarkistusten suositukset](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Tarkistus        | Kohde                                                            | Älä käytä                                                                           |
| ---------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Elossaolo        | TCP portissa `PORT` (oletus `20128`) tai salliva HTTP `/healthz` | `/api/monitoring/health`                                                            |
| Valmius          | HTTP `GET /healthz`                                              | Tiukkoja aikakatkaisuja, jotka tulkitsevat kuormitetun tapahtumasilmukan kuolleeksi |
| Syvä / ihmisille | `/api/monitoring/health`                                         | Automatisoituna kubeletin elossaolotarkistuksena                                    |

**Päivitykset:** varaudu siihen, että jokainen istunto katkeaa. Tyhjennä asiakasyhteydet hallitusti, jos mahdollista; oletusarvoisella SQLite-kokoonpanolla ei voi tehdä vaiheittaista päivitystä. Composen `restart: unless-stopped` yhdessä Dockerin `HEALTHCHECK`-tarkistuksen kanssa korvaa myös ainoan prosessin, kun säilön tila on Unhealthy — vaikutusalue on sama.

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

`preStop`-viive antaa kubelle aikaa poistaa Service-päätepisteet ennen SIGTERM-signaalia, jotta **uusi** liikenne ei enää päädy sammutettavaan prosessiin. Käynnissä olevia `/v1/responses`-SSE-yhteyksiä tyhjennetään enintään ajan `SHUTDOWN_TIMEOUT_MS` verran (oletus 30 s) raskaiden pääsynhallintavarausten avulla (#11015). Prosessiin edelleen päätyvät uudet pyynnöt saavat vastauksen `503` + `Retry-After: 5`. Recreate-toiminnon tyhjän päätepisteen jakso korvaavan replikan Ready-tilaan asti on edelleen täydellinen käyttökatko — tämä johtuu SQLite-topologiasta, ei tarkistusten virheellisestä määrityksestä.

Ulkoinen Postgres / usean kirjoittajan HA **ei** ole dokumentoitu vakiokokoonpano. Jos tarvitset korkeaa käytettävyyttä, käytä yhtä replikaa tai topologiaa, jonka projekti on testannut ja dokumentoinut erikseen. Postgres-/MySQL-työtä seurataan kohteessa [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Ennen sen valmistumista ainoa tuettu tapa kasvattaa **suurten** `/v1/responses`-pyyntöjen kapasiteettia on käyttää N:ää itsenäistä prosessia (seuraava osio), ei asetusta `replicas > 1` yhdellä taltiolla.

## Skaalaus ulospäin: N itsenäistä prosessia

Yksi Node-prosessi tarkoittaa **yhtä V8-kekoa**. Kaksi päällekkäistä noin 3 MiB:n / noin 750 000 tokenin koodausagentin `POST /v1/responses` -pyyntöä (RTK + Caveman) keskeyttää kyseisen keon noin 12 GiB:n kohdalla (`FATAL ERROR: Reached heap limit`) ja voi aiheuttaa OOM-tilanteen 16 GiB:n cgroupissa. Katso [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Tämä mittaustulos on **muistibudjettia** koskeva varoitus, ei tuotteen kiinteä enimmäisraja kahdelle samanaikaiselle pitkälle `/v1/responses`-pyynnölle. Raskaiden keskustelupyyntöjen hyväksyntää rajoittaa automaattisesti johdettu vastaanotettavien tavujen budjetti (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`), joka mitoitetaan saman V8-/cgroup-rajan perusteella — sen kasvattaminen ohituksella (tai vanhan pyyntömäärään perustuvan `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`-rajan asettaminen) jo mitoitetussa prosessissa aiheuttaa keskeytyksen uudelleen. Pienet keskustelut, `/healthz`, `/v1/models` ja MCP **eivät** kuulu tämän rajan piiriin.

### Yksi prosessi: enemmän kuin kaksi pitkää `/v1/responses`-pyyntöä

**Terve** prosessi (keko alle `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`-rajan, oletusarvo `0.75`) **voi** suorittaa enemmän kuin kaksi samanaikaista pitkää `POST /v1/responses` -pyyntöä, kun prosessinlaajuisessa käsiteltävien tavujen budjetissa (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) on vielä tilaa. Rungot, joiden koko on vähintään `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (oletusarvo 256 KiB), käyttävät samaa raskaan kuorman varausta kuin rakenteellisesti raskaat pyynnöt sekä samaa [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437)-muutoksen `tryAcquireHealthyHeadroom`-poikkeusreittiä (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Kymmenet samanaikaiset pitkät SSE-asiakkaat (ylläpitäjät tarvitsevat usein 40–50) ovat **muistibudjettikysymys** — mitoita keko, ensisijaiset/lisäkapasiteetin paikat ja `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — eivät tuotteen kiinteä ”enintään 2” -rajoitus. Kuormittunut keko hylkää edelleen pyyntöjä uudelleenyrityksen sallivalla `503`-vastauksella, jotta #7849 ei toistu.

**Kekojen moninkertaistaminen** (itsenäiset V8:n old space -muistialueet) **tällä hetkellä**:

| Tee                                                                                                                                                                                                   | Älä tee                                                          |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Suorita **N säilöä/podia**, joista jokaisella on **oma** `DATA_DIR` / taltio                                                                                                                          | Aseta `replicas > 1` käyttämään yhtä SQLite-tiedostoa            |
| Mitoita raskas käsittelykapasiteetti + terveen tilan lisäkapasiteetti keon / käsiteltävien tavujen budjetin perusteella; 1–2 on #7849:n konservatiivinen oletusarvo, ei tuotteen kiinteä enimmäisraja | Anna yhdelle prosessille 8× RAM-määrä ja rajoittamaton määräraja |
| Valinnainen: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` **jaettuja kiintiölaskureita** varten                                                                                               | Käsittele Redisiä jaettuna SQLitenä — sitä se ei ole             |
| Kopioi palveluntarjoajien salaisuudet jokaiseen instanssiin (tai hyväksy erilliset koontinäytöt)                                                                                                      | Oleta yksi koontinäyttö / yksi kutsuloki kaikille instansseille  |
| Käytä edessä mitä tahansa kuormantasaajaa; API-avaimeen tai istuntoon perustuva pysyvyys riittää                                                                                                      | Edellytä toimittajakohtaista, koon huomioivaa väliohjelmistoa    |

Laitteisto: instanssikohtaisten samanaikaisten pitkien `/v1/responses`-pyyntöjen määrä on **muistibudjettikysymys** (keko + käsiteltävien tavujen budjetti / #10110). `N` itsenäistä `DATA_DIR`-hakemistoa moninkertaistaa silti kekojen määrän: isäntäkoneen RAM-muistin on riitettävä määrälle `N × cgroup`, eikä kyse ole ”yhdestä 16 GiB:n podista, jossa N=8”. Älä koskaan käytä asetusta `replicas > 1` yhden SQLite-tiedoston kanssa.

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

Prosessinsisäistä tiheyttä (pakkaus pois HTTP-isolaatista) käsitellään kohdassa [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Yhtä loogista klusteria jaetun pysyvän tilan päällä käsitellään kohdassa [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Tärkeitä huomioita

- **SQLite WAL -tila:** Komennon `docker stop` suorittamisen on annettava päättyä, jotta OmniRoute voi kirjoittaa viimeisimmät muutokset takaisin `storage.sqlite`-tiedostoon tarkistuspisteen avulla. Mukana toimitetuissa Compose-tiedostoissa pysäytyksen lisäajaksi on jo asetettu 40 sekuntia. Jos suoritat levykuvan suoraan, säilytä asetus `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Aseta arvoksi `true`, jos säännöllisiä ja kirjoitusta edeltäviä varmuuskopioita hallitaan ulkoisesti. Olemassa olevan tietokannan migraatiot edellyttävät silti omaa pysyvää turvatilannevedosta ja joukkomigraation suojausta.
- **Tietojen säilyvyys:** Liitä aina taltio polkuun `/app/data`, jotta tietokanta, avaimet ja määritykset säilyvät säilön uudelleenkäynnistysten välillä.
- **Portin määritys:** Voit vaihtaa oletusportin `20128` ohittamalla `PORT`-ympäristömuuttujan arvon.

## Katso myös

- [Virtuaalikoneen käyttöönotto-opas](../ops/VM_DEPLOYMENT_GUIDE.md) — Virtuaalikoneen, nginxin ja Cloudflaren määritys
- [Fly.io-käyttöönotto-opas](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Käyttöönotto Fly.io-palvelussa
- [Ympäristömääritykset](../reference/ENVIRONMENT.md) — Täydellinen `.env`-viite
