# Cluster Decisions — Optional Sidecar Profiles (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/cluster-decisions.md) · 🇪🇹 [am](../../../am/docs/architecture/cluster-decisions.md) · 🇸🇦 [ar](../../../ar/docs/architecture/cluster-decisions.md) · 🇦🇿 [az](../../../az/docs/architecture/cluster-decisions.md) · 🇧🇬 [bg](../../../bg/docs/architecture/cluster-decisions.md) · 🇧🇩 [bn](../../../bn/docs/architecture/cluster-decisions.md) · 🇨🇿 [cs](../../../cs/docs/architecture/cluster-decisions.md) · 🇩🇰 [da](../../../da/docs/architecture/cluster-decisions.md) · 🇩🇪 [de](../../../de/docs/architecture/cluster-decisions.md) · 🇬🇷 [el](../../../el/docs/architecture/cluster-decisions.md) · 🇪🇸 [es](../../../es/docs/architecture/cluster-decisions.md) · 🇪🇪 [et](../../../et/docs/architecture/cluster-decisions.md) · 🇮🇷 [fa](../../../fa/docs/architecture/cluster-decisions.md) · 🇫🇷 [fr](../../../fr/docs/architecture/cluster-decisions.md) · 🇮🇪 [ga](../../../ga/docs/architecture/cluster-decisions.md) · 🇮🇳 [gu](../../../gu/docs/architecture/cluster-decisions.md) · 🇳🇬 [ha](../../../ha/docs/architecture/cluster-decisions.md) · 🇮🇱 [he](../../../he/docs/architecture/cluster-decisions.md) · 🇮🇳 [hi](../../../hi/docs/architecture/cluster-decisions.md) · 🇭🇷 [hr](../../../hr/docs/architecture/cluster-decisions.md) · 🇭🇺 [hu](../../../hu/docs/architecture/cluster-decisions.md) · 🇦🇲 [hy](../../../hy/docs/architecture/cluster-decisions.md) · 🇮🇩 [id](../../../id/docs/architecture/cluster-decisions.md) · 🇳🇬 [ig](../../../ig/docs/architecture/cluster-decisions.md) · 🇮🇹 [it](../../../it/docs/architecture/cluster-decisions.md) · 🇯🇵 [ja](../../../ja/docs/architecture/cluster-decisions.md) · 🇬🇪 [ka](../../../ka/docs/architecture/cluster-decisions.md) · 🇰🇭 [km](../../../km/docs/architecture/cluster-decisions.md) · 🇮🇳 [kn](../../../kn/docs/architecture/cluster-decisions.md) · 🇰🇷 [ko](../../../ko/docs/architecture/cluster-decisions.md) · 🇱🇹 [lt](../../../lt/docs/architecture/cluster-decisions.md) · 🇱🇻 [lv](../../../lv/docs/architecture/cluster-decisions.md) · 🇮🇳 [ml](../../../ml/docs/architecture/cluster-decisions.md) · 🇮🇳 [mr](../../../mr/docs/architecture/cluster-decisions.md) · 🇲🇾 [ms](../../../ms/docs/architecture/cluster-decisions.md) · 🇲🇹 [mt](../../../mt/docs/architecture/cluster-decisions.md) · 🇲🇲 [my](../../../my/docs/architecture/cluster-decisions.md) · 🇳🇵 [ne](../../../ne/docs/architecture/cluster-decisions.md) · 🇳🇱 [nl](../../../nl/docs/architecture/cluster-decisions.md) · 🇳🇴 [no](../../../no/docs/architecture/cluster-decisions.md) · 🇮🇳 [or](../../../or/docs/architecture/cluster-decisions.md) · 🇮🇳 [pa](../../../pa/docs/architecture/cluster-decisions.md) · 🇵🇭 [phi](../../../phi/docs/architecture/cluster-decisions.md) · 🇵🇱 [pl](../../../pl/docs/architecture/cluster-decisions.md) · 🇵🇹 [pt](../../../pt/docs/architecture/cluster-decisions.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/cluster-decisions.md) · 🇷🇴 [ro](../../../ro/docs/architecture/cluster-decisions.md) · 🇷🇺 [ru](../../../ru/docs/architecture/cluster-decisions.md) · 🇱🇰 [si](../../../si/docs/architecture/cluster-decisions.md) · 🇸🇰 [sk](../../../sk/docs/architecture/cluster-decisions.md) · 🇸🇮 [sl](../../../sl/docs/architecture/cluster-decisions.md) · 🇷🇸 [sr](../../../sr/docs/architecture/cluster-decisions.md) · 🇸🇪 [sv](../../../sv/docs/architecture/cluster-decisions.md) · 🇰🇪 [sw](../../../sw/docs/architecture/cluster-decisions.md) · 🇮🇳 [ta](../../../ta/docs/architecture/cluster-decisions.md) · 🇮🇳 [te](../../../te/docs/architecture/cluster-decisions.md) · 🇹🇭 [th](../../../th/docs/architecture/cluster-decisions.md) · 🇹🇷 [tr](../../../tr/docs/architecture/cluster-decisions.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/cluster-decisions.md) · 🇵🇰 [ur](../../../ur/docs/architecture/cluster-decisions.md) · 🇺🇿 [uz](../../../uz/docs/architecture/cluster-decisions.md) · 🇻🇳 [vi](../../../vi/docs/architecture/cluster-decisions.md) · 🇳🇬 [yo](../../../yo/docs/architecture/cluster-decisions.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/cluster-decisions.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/cluster-decisions.md)

---

**Tila:** ehdotus (odottaa käyttäjän @diegosouzapw katselmointia)
**Päivämäärä:** 2026-06-20
**Viitteet:** [#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932), PR #4381

## Tiivistelmä

Kaksi vapaaehtoista Compose-profiilia (`memory`, `bifrost`) olemassa olevaan kahdeksan palvelun käyttöönottoon tiedostossa [`docker-compose.yml`](../../docker-compose.yml). Oletusarvoisen käynnistyksen toiminta säilyy **muuttumattomana**: 3 × `omniroute`-replikaa + Caddy + Redis + CliproxyAPI. Kaksi uutta profiilia lisäävät Qdrantin ja Bifrostin valinnaisina sivuvaunuina, jotka otetaan käyttöön komennolla `docker compose --profile <name> up`. **Mitään olemassa olevaa palvelua ei poisteta tai korvata.**

## Miksi tämä on varovainen lähestymistapa

OmniRouten nykyinen käyttöönottoarkkitehtuuri on jo kevyt ja hyväksi todettu:

- **`redis:7-alpine`** käsittelee tuotantomittakaavan nopeusrajoitus- ja välimuistikuorman.
- **SQLite + sqlite-vec + FTS5** kattavat paikallisen muistin sekä vektori- ja tekstihaun (katso [`src/lib/memory/vectorStore.ts:108`](../../src/lib/memory/vectorStore.ts)).
- **Caddy** toimii jo kuormantasaajana ja TLS-päätepisteenä ([`docker-compose.yml`](../../docker-compose.yml)).
- **Bifrost** on jo integroitu ensisijaiseksi reitittimeksi tiedostossa [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (sivuvaunuvälityspalvelin, jossa on `BIFROST_ENABLED`-ympäristömuuttujalla ohjattava hätäpysäytys — aseta arvoksi `=0`, jos haluat ohittaa sivuvaunun ja palata TS-polulle).

Nämä kaksi profiilia ovat **skaalausvaihtoehtoja käyttöönotoille, jotka saavuttavat SQLiten kapasiteettirajan** — eivät migraatioita. Molemmat ovat oletusarvoisesti poissa käytöstä.

## Kaksi profiilia

### `memory` — Qdrant-vektorimuistin sivuvaunu

**Milloin ottaa käyttöön:**

- Yli 1 miljoona upotetta käyttöönottoa kohden (sqlite-vec alkaa hidastua suuressa mittakaavassa).
- Usean replikan käyttöönotto, joka tarvitsee jaetun vektoritilan instanssien `omniroute-1/2/3` välillä.
- Sinulla on jo ulkoinen Qdrant-klusteri (Qdrant Cloud tai paikallinen ympäristö).

**Mitä se lisää:**

| Palvelu  | Levykuva                | Portit      | Huomautukset                                        |
| -------- | ----------------------- | ----------- | --------------------------------------------------- |
| `qdrant` | `qdrant/qdrant:v1.12.4` | `6333` HTTP | HNSW-indeksi; pysyvä taltio `omniroute_qdrant_data` |

**Aktivointi:** aseta `qdrantEnabled = true` Asetukset-käyttöliittymässä **tai** määritä ympäristömuuttuja `QDRANT_HOST=qdrant`. Katso prioriteettisäännöt tiedostosta [`src/lib/memory/qdrant.ts:60`](../../src/lib/memory/qdrant.ts) (asetustaulu → ympäristömuuttuja → oletusarvo).

**Ympäristömuuttujat:** `QDRANT_HOST`, `QDRANT_PORT`, `QDRANT_API_KEY`, `QDRANT_COLLECTION`, `QDRANT_VECTOR_SIZE`, `QDRANT_HNSW_EF_CONSTRUCT` (katso `.env.example`, rivit 1672-1683).

### `bifrost` — Bifrostin ensisijaisen tason reitittimen sivuvaunu

**Milloin ottaa käyttöön:**

- Käytössäsi on vähintään 3 `omniroute`-replikaa ja haluat keskittää palveluntarjoajien kierron yhteen Go-prosessiin.
- Haluat yhden yhteisen auditointi- ja lokitusrajapinnan kaikkien replikoiden palveluntarjoajapyynnöille.
- Haluat skaalata ensisijaisen tason reitityskerrosta vaakasuunnassa OmniRoute-replikoista riippumatta.

**Mitä se lisää:**

| Palvelu   | Levykuva                          | Portit | Huomautukset                                                                         |
| --------- | --------------------------------- | ------ | ------------------------------------------------------------------------------------ |
| `bifrost` | `ghcr.io/maximhq/bifrost:v1.6.11` | `8080` | Go-pohjainen ensisijaisen tason reititin; pysyvä lokitaltio `omniroute_bifrost_logs` |

**Aktivointi:** aseta `BIFROST_BASE_URL=http://bifrost:8080` tiedostossa `.env.example`. Olemassa oleva sivuvaunuvälityksen reitti tiedostossa [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (lisätty PR:ssä #4381) ottaa tämän käyttöön automaattisesti.

**Ympäristömuuttujat:** `BIFROST_BASE_URL`, `BIFROST_API_KEY`, `BIFROST_STREAMING_ENABLED`, `BIFROST_TIMEOUT_MS` (katso `.env.example`, rivit 1685-1695).

## Mitä tämä PR nimenomaisesti EI tee

Alkuperäisessä issue-ketjussa ehdotettiin laajempaa klusterin uudelleenkirjoitusta. Todellisen kuormitusprofiilin auditoinnin jälkeen seuraavat vaihtoehdot on **hylätty** annetuista syistä:

| Komponentti                          | Päätös       | Syy                                                                                                                    |
| ------------------------------------ | ------------ | ---------------------------------------------------------------------------------------------------------------------- |
| **Dragonfly**                        | **HYLÄTÄÄN** | `redis:7-alpine` riittää jo nopeusrajoituksen tuotantotason kuormitukseen; kapasiteettirajaa ei ole ylitettävänä.      |
| **NATS**                             | **HYLÄTÄÄN** | Jokainen `omniroute`-replika on yksi Node.js-prosessi; moniprosessista pub/sub-kuormitusta ei ole.                     |
| **PostgreSQL**                       | **HYLÄTÄÄN** | SQLite + sqlite-vec + FTS5 kattavat kaikki 3 käyttötapausta; 97 migraatiota + Electron-paketointi estävät siirtymisen. |
| **Neo4j**                            | **HYLÄTÄÄN** | Reititys on viiden taulun liitos; rekursiivinen CTE SQLite-tietokannassa riittää.                                      |
| **MinIO**                            | **HYLÄTÄÄN** | Useiden megatavujen blob-kuormitusta ei ole; kuvat ja ääni välitetään sellaisinaan välityspalvelinten kautta.          |
| **pgvector / pg_ai / pg_textsearch** | **HYLÄTÄÄN** | Sama SQLite-kapasiteettirajaan liittyvä syy kuin PostgreSQL:n kohdalla; pgvector-ekosysteemi on pirstaloitunut.        |
| **HAProxy / Envoy**                  | **HYLÄTÄÄN** | Caddy hoitaa jo kuormantasauksen + TLS:n; molemmat hylättiin nimenomaisesti Tier-1-reitittiminä (katso `AGENTS.md`).   |

Jos jokin tuleva käyttötapaus osoittaa jonkin näistä tarpeelliseksi, tätä dokumenttia tulee muuttaa.

## Neljän viikon käyttöönotto (jos hyväksytään)

1. **Vko 1** — Yhdistä tämä PR + varmista valinnaiset profiilit kolmen replikan compose-pinolla.
2. **Vko 2** — Bifrostin täysi aktivointi OpenAI:lle/Claudelle/Geminille/Ollamalle (4 palveluntarjoajaa yli 14:stä) käyttäen sidecar-välityspalvelimen reittiä [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (`BIFROST_ENABLED`-muuttujan ohjaama, voidaan poistaa käytöstä ajon aikana).
3. **Vko 3** — Qdrant-muistiprofiili käyttöön yhdessä testikäyttöönotossa; mittaa latenssiero sqlite-veciin verrattuna.
4. **Vko 4** — Valvonnan kuntotarkistukset (`docker compose ps` -poistumiskoodit + `wget`-savutestit); 71 pilarin päivitys ADR-041:n mukaisesti.

## Tässä PR:ssä muutetut tiedostot

| Tiedosto                                                 | Muutos                                                                                                                                                                                                                               |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `docker-compose.yml`                                     | +30 riviä: `memory`-profiili (Qdrant), `bifrost`-profiili (Bifrost), pysyvät taltiot, kuntotarkistukset.                                                                                                                             |
| `.env.example`                                           | +24 riviä: `QDRANT_*` (6 muuttujaa), `BIFROST_*` (4 muuttujaa).                                                                                                                                                                      |
| `docs/reference/ENVIRONMENT.md`                          | +6 riviä osioon 25 `QDRANT_*`-ympäristömuuttujille.                                                                                                                                                                                  |
| `src/lib/memory/qdrant.ts`                               | +33 riviä: ympäristömuuttujien varaketju (asetukset → ympäristö → oletusarvo) muuttujille `QDRANT_HOST`/`QDRANT_PORT`/`QDRANT_API_KEY`/`QDRANT_COLLECTION`/`QDRANT_VECTOR_SIZE`/`QDRANT_HNSW_EF_CONSTRUCT`/`QDRANT_EMBEDDING_MODEL`. |
| `src/lib/memory/__tests__/qdrant-wiring.test.ts`         | +88 riviä: 9 uutta testitapausta, jotka varmistavat ympäristömuuttujien varaketjun prioriteettijärjestyksen.                                                                                                                         |
| `docs/architecture/cluster-decisions.md` (tämä tiedosto) | UUSI — valinnaisten profiilien päätöstietue.                                                                                                                                                                                         |
| `AGENTS.md`                                              | +1 rivi: viittaus tähän dokumenttiin viitedokumentaatiotaulukossa.                                                                                                                                                                   |

**Muokatun koodin yhteismäärä:** 4 tuotantotiedostoa (`docker-compose.yml`, `qdrant.ts`, `.env.example`, `ENVIRONMENT.md`), 1 testitiedosto (`qdrant-wiring.test.ts`), 2 dokumentaatiotiedostoa (`cluster-decisions.md`, `AGENTS.md`).
