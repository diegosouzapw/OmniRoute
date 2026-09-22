# Chaos Mode (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **Nadzorna plošča:** **Chaos Mode** (stranska vrstica) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (seja nadzorne plošče) · `POST /api/skills/collect/chaos` (ključ API)  
> **Izvorna koda:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Chaos Mode pošlje **eno nalogo več ponudnikom hkrati** — vsak sodelujoči ponudnik
prispeva en primerek modela, vse odgovore pa prejmete drugega ob drugem (ali povezane v verigo). To je
vmesnik za izvajanje z več modeli in ne strategija usmerjanja: na vaš običajni promet
`/v1/chat/completions` nikoli ne vpliva.

**Pojasnilo — z imenom »chaos« so na voljo tri različne stvari:**

| Stvar                           | Kaj je                                                                                                                                  | Kje je dokumentirana                         |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Chaos Mode**                  | Tukaj opisana stran nadzorne plošče in API: razpošiljanje ene naloge več ponudnikom (vzporedno ali sodelovalno).                        | Ta vodnik                                    |
| `auto/chaos`                    | ID modela Auto-Combo z utežmi ocenjevanja za vbrizgavanje napak, namenjen preizkušanju odpornosti. Konfiguracija ni potrebna.           | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Konfiguracija kombinacije Chaos | Shranjena kombinacija z `config.chaos.enabled`, ki nalogo razpošlje skupini modelov z izbirnim ocenjevalnim modelom (samo prek API-ja). | `open-sse/services/autoCombo/chaosEngine.ts` |

## Nastavitev

1. Odprite **Nadzorna plošča → Chaos Mode** (`/dashboard/chaos`).
2. Funkcijo **vklopite** — Chaos Mode je ob namestitvi **privzeto onemogočen** (`enabled: false` v
   `src/lib/chaos/chaosConfig.ts`). Ko je onemogočen, `POST /api/chaos/run` vrne
   `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."`.
3. Izberite sodelujoče ponudnike in privzete nastavitve (shranjene za posamezen primerek prek shrambe nastavitev):

   | Polje               | Pomen                                                                          | Privzeto / omejitve                        |
   | ------------------- | ------------------------------------------------------------------------------ | ------------------------------------------ |
   | `enabled`           | Glavno stikalo                                                                 | `false`                                    |
   | `defaultMode`       | `parallel` ali `collaborative` (glejte spodaj)                                 | `parallel`                                 |
   | `providerOverrides` | Sodelovanje posameznega ponudnika (`providerId`, izbirni `modelId`, `enabled`) | prazno = vsak aktiven ponudnik, največ 200 |
   | `systemPrompt`      | Nadomestitev vgrajenega sistemskega poziva Chaos                               | izbirno, največ 10.000 znakov              |
   | `timeoutMs`         | Najdaljši čas posameznega klica modela                                         | `120000` (5.000–600.000)                   |
   | `maxTokens`         | `max_tokens` za posamezen klic modela                                          | `4096` (256–128.000)                       |

4. Zaženite **preskus neposredno na strani** — podokno z rezultati prikaže odgovor,
   stanje in trajanje za vsakega ponudnika.

## Načini izvajanja

- **`parallel`** — vsak model sočasno prejme isto nalogo; vse odgovore prejmete
  neodvisno.
- **`collaborative`** — modeli se izvajajo **v verigi**: vsak vidi rezultat prejšnjega modela in
  dobi navodilo, naj ga izboljša, razširi, kritično oceni ali ponudi alternativo. Polje `summary`
  v odgovoru združi uspešne rezultate v vrstnem redu verige (vzporedna izvajanja nimajo polja `summary`).

## API

### `POST /api/chaos/run` — seja nadzorne plošče

Preverjanje pristnosti s piškotkom (upravljavska seja — glejte
[MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md)); uporablja ga stran nadzorne plošče.

```jsonc
// telo
{
  "task": "Compare approaches to X", // obvezno
  "providers": ["glm", "kimi"], // izbirni filter
  "mode": "parallel", // izbirno — preglasi defaultMode
  "systemPrompt": "…", // izbirna nadomestitev
  "maxTokens": 4096, // izbirna nadomestitev
}
```

### `POST /api/skills/collect/chaos` — ključ API

Različica z žetonom Bearer za zunanje klicatelje. Ključ mora imeti **dovoljenje za Chaos Mode**
(`chaosModeEnabled`), ki je **privzeto izklopljeno** — omogočite ga za posamezen ključ v
**Nadzorna plošča → Upravitelj API-jev → urejanje ključa → dovoljenja → Chaos Mode**. Telo je enako kot zgoraj.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

Obe končni točki vrneta enako strukturo:

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
  "summary": "…", // samo v sodelovalnem načinu
}
```

## Odpravljanje težav

- **`400 Chaos Mode is not enabled`** — glejte 2. korak zgoraj: globalno stikalo je izklopljeno.
- **Ključ API je zavrnjen pri `/api/skills/collect/chaos`** — ključ nima dovoljenja
  `chaosModeEnabled` za posamezni ključ (privzeto je izklopljeno; to je nastavitev in ne napaka).
- **Pričakovani ponudnik manjka v rezultatih** — preverite `providerOverrides` na strani
  Chaos Mode (onemogočena preglasitev ga izključi) in ali je povezava s ponudnikom
  aktivna.
