# Chaos Mode (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **Hallintapaneeli:** **Chaos Mode** (sivupalkki) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (hallintapaneelin istunto) · `POST /api/skills/collect/chaos` (API-avain)  
> **Lähdekoodi:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Chaos Mode lähettää **yhden tehtävän useille palveluntarjoajille samanaikaisesti** — jokainen osallistuva palveluntarjoaja
tarjoaa yhden malli-instanssin, ja saat kaikki vastaukset rinnakkain (tai ketjutettuina). Se on
usean mallin suoritusympäristö, ei reititysstrategia: se ei koskaan vaikuta tavalliseen
`/v1/chat/completions`-liikenteeseesi.

**Selvennys — kolme eri asiaa toimitetaan nimellä "chaos":**

| Asia                       | Mikä se on                                                                                                                                      | Dokumentaation sijainti                      |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Chaos Mode**             | Tässä kuvattu hallintapaneelin sivu ja API: yhden tehtävän jakaminen useille palveluntarjoajille (rinnakkain tai yhteistyössä).                 | Tämä opas                                    |
| `auto/chaos`               | Vikasietoisuuden testaamiseen tarkoitettu Auto-Combo-mallitunnus, jossa on vikojen injektointiin perustuvat pisteytyspainot. Ei määritettävää.  | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Chaos-yhdistelmän määritys | Pysyvästi tallennettu yhdistelmä, jossa `config.chaos.enabled` jakaa tehtävän paneelille, jolla voi olla valinnainen arviointimalli (vain API). | `open-sse/services/autoCombo/chaosEngine.ts` |

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
