# Chaos Mode (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **Dashibodi:** **Hali ya Chaos** (upau wa pembeni) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (kipindi cha dashibodi) · `POST /api/skills/collect/chaos` (ufunguo wa API)  
> **Msimbo chanzo:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Hali ya Chaos hutuma **jukumu moja kwa watoa huduma kadhaa kwa wakati mmoja** — kila mtoa huduma anayeshiriki
huchangia nakala moja ya modeli, na unapata majibu yote sambamba (au kwa mfuatano). Hii ni
sehemu ya utekelezaji wa modeli nyingi, si mkakati wa uelekezaji: trafiki yako ya kawaida ya `/v1/chat/completions`
haiathiriwi nayo kamwe.

**Ufafanuzi — vitu vitatu tofauti hutolewa vikiwa na "chaos" katika jina:**

| Kitu                             | Maelezo yake                                                                                                                                   | Kilipoandikwa katika nyaraka                 |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Hali ya Chaos**                | Ukurasa wa dashibodi + API iliyoelezwa hapa: sambaza jukumu moja kwa watoa huduma wengi (sambamba au kwa ushirikiano).                         | Mwongozo huu                                 |
| `auto/chaos`                     | Kitambulisho cha modeli ya Auto-Combo chenye uzani wa alama za kuingiza hitilafu, kwa ajili ya majaribio ya ustahimilivu. Hakuna cha kusanidi. | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Usanidi wa mchanganyiko wa Chaos | Mchanganyiko uliohifadhiwa wenye `config.chaos.enabled` husambaza jukumu kwa jopo lenye modeli ya hiari ya kuhukumu (API pekee).               | `open-sse/services/autoCombo/chaosEngine.ts` |

## Usanidi

1. Fungua **Dashibodi → Hali ya Chaos** (`/dashboard/chaos`).
2. **Iwashe** — Hali ya Chaos hutolewa ikiwa **imezimwa kwa chaguo-msingi** (`enabled: false` katika
   `src/lib/chaos/chaosConfig.ts`). Ikiwa imezimwa, `POST /api/chaos/run` hujibu
   `400 — "Hali ya Chaos haijawashwa. Iwashe katika Dashibodi → Hali ya Chaos."`.
3. Chagua washiriki na chaguo-msingi (huhifadhiwa kwa kila instansi kupitia hifadhi ya mipangilio):

   | Sehemu              | Maana                                                                       | Chaguo-msingi / vikomo                                   |
   | ------------------- | --------------------------------------------------------------------------- | -------------------------------------------------------- |
   | `enabled`           | Swichi kuu                                                                  | `false`                                                  |
   | `defaultMode`       | `parallel` au `collaborative` (tazama hapa chini)                           | `parallel`                                               |
   | `providerOverrides` | Ushiriki kwa kila mtoa huduma (`providerId`, `modelId` ya hiari, `enabled`) | tupu = kila mtoa huduma anayetumika, kiwango cha juu 200 |
   | `systemPrompt`      | Ubatilishaji wa kidokezo cha mfumo cha Chaos kilichojengewa ndani           | hiari, kiwango cha juu herufi 10 000                     |
   | `timeoutMs`         | Muda wa juu zaidi kwa kila mwito wa modeli                                  | `120000` (5 000–600 000)                                 |
   | `maxTokens`         | `max_tokens` kwa kila mwito wa modeli                                       | `4096` (256–128 000)                                     |

4. Tekeleza **jaribio kutoka kwenye ukurasa wenyewe** — paneli ya matokeo huonyesha jibu,
   hali na muda wa kila mtoa huduma.

## Hali za utekelezaji

- **`parallel`** — kila modeli hupokea jukumu lilelile kwa wakati mmoja; unapokea majibu yote
  kwa kujitegemea.
- **`collaborative`** — modeli hutekelezwa **kwa mfuatano**: kila moja huona matokeo ya modeli iliyotangulia na
  huombwa kuyaboresha, kuyapanua, kuyakosoa au kutoa mbadala. Sehemu ya `summary` ya jibu
  huunganisha matokeo yaliyofaulu kwa mpangilio wa mfuatano (utekelezaji sambamba hauna `summary`).

## API

### `POST /api/chaos/run` — kipindi cha dashibodi

Huthibitishwa kwa kuki (kipindi cha usimamizi — tazama
[MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md)); hutumiwa na ukurasa wa dashibodi.

```jsonc
// mwili
{
  "task": "Linganisha mbinu za X", // inahitajika
  "providers": ["glm", "kimi"], // kichujio cha hiari
  "mode": "parallel", // hiari — hubatilisha defaultMode
  "systemPrompt": "…", // ubatilishaji wa hiari
  "maxTokens": 4096, // ubatilishaji wa hiari
}
```

### `POST /api/skills/collect/chaos` — ufunguo wa API

Toleo la tokeni ya Bearer kwa wapigaji wa nje. Ufunguo lazima uwe na **ruhusa ya Hali ya Chaos**
(`chaosModeEnabled`), ambayo **imezimwa kwa chaguo-msingi** — iwashe kwa kila ufunguo katika
**Dashibodi → Kidhibiti cha API → hariri ufunguo → ruhusa → Hali ya Chaos**. Mwili ni sawa na ulio hapo juu.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Linganisha mbinu za X","mode":"parallel"}'
```

Njia zote mbili hurudisha muundo uleule:

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
  "summary": "…", // hali ya collaborative pekee
}
```

## Utatuzi wa matatizo

- **`400 Chaos Mode is not enabled`** — hatua ya 2 hapo juu: swichi ya kimataifa imezimwa.
- **Ufunguo wa API unakataliwa kwenye `/api/skills/collect/chaos`** — ufunguo hauna ruhusa ya
  `chaosModeEnabled` ya ufunguo huo (imezimwa kwa chaguo-msingi; huu ni mpangilio, si hitilafu).
- **Mtoa huduma uliyemtarajia hayupo katika matokeo** — angalia `providerOverrides` kwenye
  ukurasa wa Hali ya Chaos (ubatilishaji uliozimwa humwondoa) na kama muunganisho wa mtoa huduma
  unatumika.
