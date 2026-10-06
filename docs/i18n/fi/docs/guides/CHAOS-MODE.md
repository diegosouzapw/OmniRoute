# Chaos Mode (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **Hallintapaneeli:** **Chaos Mode** (sivupalkki) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (hallintapaneeli-istunto) · `POST /api/skills/collect/chaos` (API-avain)  
> **Lähdekoodi:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Chaos Mode lähettää **yhden tehtävän useille palveluntarjoajille samanaikaisesti** — jokainen osallistuva palveluntarjoaja
tarjoaa yhden malliesiintymän, ja saat kaikki vastaukset rinnakkain (tai ketjutettuina). Se on
usean mallin suoritusympäristö, ei reititysstrategia: se ei koskaan vaikuta tavalliseen
`/v1/chat/completions`-liikenteeseesi.

**Selvennys — kolme eri asiaa toimitetaan nimellä "chaos":**

| Asia                       | Mikä se on                                                                                                                                                                                      | Dokumentaation sijainti                      |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Chaos Mode**             | Tässä kuvattu hallintapaneelin sivu ja API: yhden tehtävän hajautus useille palveluntarjoajille (rinnakkain tai yhteistyössä).                                                                  | Tämä opas                                    |
| `auto/chaos`               | Auto-Combo-mallitunnus: rinnakkainen hajautus, yksi malli palveluntarjoajaa kohti ja yksi kutsu kuhunkin taustapalveluun. Ei vikojen injektointia ([lisätietoja](#autochaos-parallel-fan-out)). | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Chaos-yhdistelmän määritys | Tallennettu yhdistelmä, jossa `config.chaos.enabled` hajauttaa pyynnön samalla tavalla (vain API); `judgeModel` valitsee vain lopullisen vastauksen, eikä synteesikutsua tehdä.                 | `open-sse/services/autoCombo/chaosEngine.ts` |

### `auto/chaos`: rinnakkainen hajautus

`auto/chaos` **ei ole** vikojen injektointiin tai vikasietoisuuden testaamiseen tarkoitettu asetus. Kun
`model: "auto/chaos"` pyydetään `/v1/chat/completions`-rajapinnassa:

1. Muodostetaan paneeli, jossa on **yksi malli palveluntarjoajaa kohti**: kunkin
   yhdistetyn palveluntarjoajan ensimmäinen ehdokas ehdokasjoukon järjestyksessä, enintään 5 jäsentä
   (`OMNIROUTE_CHAOS_MAX_PANEL`, yläraja 10)
   (`open-sse/services/autoCombo/virtualFactory.ts`). `chaos-mode`-painopaketti
   asettaa vain kunkin jäsenen `weight`-arvon; hajautus ei lue sitä.
2. Sama pyyntö lähetetään jokaiselle paneelin jäsenelle **rinnakkain**, joten yksi pyyntö
   maksaa yhden taustapalvelukutsun kutakin paneelin jäsentä kohti
   (`open-sse/services/autoCombo/chaosEngine.ts`, lähetys tiedostosta
   `open-sse/services/combo.ts`).
3. Kustakin paneelin jäsenestä suoratoistetaan yksi tilarivi sen valmistuessa: oletuksena
   SSE-kommentti (`: chaos <index> ok|fail <model>`) sekä `omni-chaos-part`-tapahtuma
   (`model`, `index`, `ok`, `error`), kun pyynnössä on asetettu
   `stream_options.include_chaos_parts: true`. Nämä eivät sisällä vastaustekstiä.
4. **Yksi** paneelin vastaus lähetetään lopullisena OpenAI-tyylisenä osana: ensimmäisen paneelin
   jäsenen vastaus (`auto/chaos` asettaa sen `judgeModel`-arvoksi), jos kutsu onnistuu, muussa tapauksessa
   viimeisen onnistuneen jäsenen vastaus. Muiden paneelin jäsenten vastauksia ei palauteta, joten
   maksat N kutsusta ja saat yhden vastauksen.

## Määritys

1. Avaa **Hallintapaneeli → Chaos Mode** (`/dashboard/chaos`).
2. Kytke se **päälle** — Chaos Mode toimitetaan **oletusarvoisesti poistettuna käytöstä** (`enabled: false` tiedostossa
   `src/lib/chaos/chaosConfig.ts`). Kun se on poistettu käytöstä, `POST /api/chaos/run` vastaa
   `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."`.
3. Valitse osallistujat ja oletusasetukset (tallennetaan instanssikohtaisesti asetustietovarastoon):

   | Kenttä              | Merkitys                                                                                  | Oletusarvo / rajat                                         |
   | ------------------- | ----------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
   | `enabled`           | Pääkytkin                                                                                 | `false`                                                    |
   | `defaultMode`       | `parallel` tai `collaborative` (katso alta)                                               | `parallel`                                                 |
   | `providerOverrides` | Palveluntarjoajakohtainen osallistuminen (`providerId`, valinnainen `modelId`, `enabled`) | tyhjä = jokainen aktiivinen palveluntarjoaja, enintään 200 |
   | `systemPrompt`      | Sisäänrakennetun Chaos-järjestelmäkehotteen korvaava kehote                               | valinnainen, enintään 10 000 merkkiä                       |
   | `timeoutMs`         | Mallikutsun enimmäiskesto                                                                 | `120000` (5 000–600 000)                                   |
   | `maxTokens`         | `max_tokens` mallikutsua kohden                                                           | `4096` (256–128 000)                                       |

4. Suorita **testi suoraan sivulta** — tulospaneeli näyttää kunkin palveluntarjoajan vastauksen,
   tilan ja keston.

## Suoritustilat

- **`parallel`** — jokainen malli saa saman tehtävän samanaikaisesti; saat kaikki vastaukset
  toisistaan riippumattomina.
- **`collaborative`** — mallit suoritetaan **ketjuna**: kukin näkee edellisen mallin tulosteen, ja
  sitä pyydetään hiomaan, laajentamaan tai kritisoimaan sitä tai tarjoamaan vaihtoehto. Vastauksen `summary`-kenttä
  yhdistää onnistuneet tulosteet ketjun järjestyksessä (`parallel`-suorituksissa ei ole `summary`-kenttää).

## API

### `POST /api/chaos/run` — hallintapaneelin istunto

Evästeellä todennettu (hallintaistunto — katso
[MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md)); hallintapaneelin sivu käyttää tätä.

```jsonc
// pyyntörunko
{
  "task": "Compare approaches to X", // pakollinen
  "providers": ["glm", "kimi"], // valinnainen suodatin
  "mode": "parallel", // valinnainen — ohittaa defaultMode-asetuksen
  "systemPrompt": "…", // valinnainen ohitus
  "maxTokens": 4096, // valinnainen ohitus
}
```

### `POST /api/skills/collect/chaos` — API-avain

Bearer-tunnisteversio ulkoisille kutsujille. Avaimella on oltava **Chaos Mode -oikeus**
(`chaosModeEnabled`), joka on **oletusarvoisesti pois käytöstä** — ota se käyttöön avainkohtaisesti kohdassa
**Hallintapaneeli → API-hallinta → muokkaa avainta → oikeudet → Chaos Mode**. Pyyntörunko on sama kuin yllä.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

Molemmat päätepisteet palauttavat saman rakenteen:

```jsonc
{
  "task": "…",
  "mode": "parallel",
  "startedAt": "2026-09-01T00:00:00.000Z",
  "totalProviders": 3,
  "totalResults": 3,
  "models": [
    {
      "providerId": "glm",
      "providerName": "GLM",
      "modelId": "glm-4.7",
      "status": "success",
      "content": "…",
      "durationMs": 3210,
    },
  ],
  "summary": "…", // vain collaborative-tilassa
}
```

## Vianmääritys

- **`400 Chaos Mode is not enabled`** — katso vaihe 2 yllä: yleinen kytkin on pois päältä.
- **API-avain hylätään päätepisteessä `/api/skills/collect/chaos`** — avaimelta puuttuu avainkohtainen
  `chaosModeEnabled`-oikeus (oletusarvoisesti pois käytöstä; tämä on asetus, ei virhe).
- **Odottamasi palveluntarjoaja puuttuu tuloksista** — tarkista Chaos Mode -sivun `providerOverrides`-asetukset
  (käytöstä poistettu ohitus sulkee palveluntarjoajan pois) sekä se, onko palveluntarjoajan yhteys
  aktiivinen.
