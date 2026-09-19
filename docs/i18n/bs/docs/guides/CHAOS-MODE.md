# CHAOS-MODE (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

# Chaos Mode

> **Kontrolna tabla:** **Chaos Mode** (bočna traka) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (sesija kontrolne table) · `POST /api/skills/collect/chaos` (API ključ)  
> **Izvor:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Chaos Mode šalje **jedan zadatak na nekoliko provajdera odjednom** — svaki provajder koji učestvuje doprinosi jednom instancom modela, a vi dobijate sve odgovore jedan pored drugog (ili u lancu). To je površina za izvršavanje više modela, a ne strategija rutiranja: vaš normalni `/v1/chat/completions` saobraćaj nikada nije pogođen ovim.

**Razjašnjenje — tri različite stvari dolaze sa "chaos" u nazivu:**

| Stavka             | Šta je to                                                                                                                    | Gdje je dokumentovano                        |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Chaos Mode**     | Stranica kontrolne table + API opisan ovdje: distribucija jednog zadatka na mnogo provajdera (paralelno ili kolaborativno).  | Ovaj vodič                                   |
| `auto/chaos`       | ID Auto-Combo modela sa težinama bodovanja za ubrizgavanje grešaka, za testiranje otpornosti. Nema ničega za konfigurisanje. | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Chaos combo config | Trajna kombinacija sa `config.chaos.enabled` koja se distribuira na panel sa opcionim modelom sudijom (samo API).            | `open-sse/services/autoCombo/chaosEngine.ts` |

## Podešavanje

1. Otvorite **Kontrolna tabla → Chaos Mode** (`/dashboard/chaos`).
2. Uključite ga (**on**) — Chaos Mode dolazi **onemogućen po podrazumijevanoj vrijednosti** (`enabled: false` u `src/lib/chaos/chaosConfig.ts`). Dok je onemogućen, `POST /api/chaos/run` odgovara sa `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."`.
3. Odaberite učesnike i podrazumijevane vrijednosti (trajno sačuvano po instanci putem skladišta postavki):

   | Polje               | Značenje                                                          | Podrazumijevano / ograničenja              |
   | ------------------- | ----------------------------------------------------------------- | ------------------------------------------ |
   | `enabled`           | Glavni prekidač                                                   | `false`                                    |
   | `defaultMode`       | `parallel` ili `collaborative` (pogledajte ispod)                 | `parallel`                                 |
   | `providerOverrides` | Učešće po provajderu (`providerId`, opcioni `modelId`, `enabled`) | prazno = svaki aktivni provajder, maks 200 |
   | `systemPrompt`      | Zamjena za ugrađeni Chaos sistemski prompt                        | opciono, maks 10 000 znakova               |
   | `timeoutMs`         | Maksimalno vrijeme po pozivu modela                               | `120000` (5 000–600 000)                   |
   | `maxTokens`         | `max_tokens` po pozivu modela                                     | `4096` (256–128 000)                       |

4. Pokrenite **test sa same stranice** — panel sa rezultatima prikazuje odgovor, status i trajanje svakog provajdera.

## Načini izvršavanja

- **`parallel`** — svaki model dobija isti zadatak istovremeno; primate sve odgovore nezavisno.
- **`collaborative`** — modeli se pokreću **u lancu**: svaki vidi izlaz prethodnog modela i od njega se traži da ga pročisti, proširi, kritikuje ili ponudi alternativu. Polje `summary` u odgovoru spaja uspješne izlaze redoslijedom lanca (paralelna pokretanja nemaju `summary`).

## API

### `POST /api/chaos/run` — sesija kontrolne table

Autentifikovano putem kolačića (sesija upravljanja — pogledajte [MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md)); koristi se na stranici kontrolne table.

```jsonc
// tijelo
{
  "task": "Compare approaches to X", // obavezno
  "providers": ["glm", "kimi"], // opcioni filter
  "mode": "parallel", // opciono — zamjenjuje defaultMode
  "systemPrompt": "…", // opciona zamjena
  "maxTokens": 4096, // opciona zamjena
}
```

### `POST /api/skills/collect/chaos` — API ključ

Varijanta sa Bearer tokenom za eksterne pozivaoce. Ključ mora imati **Chaos Mode dozvolu** (`chaosModeEnabled`), koja je **isključena po podrazumijevanoj vrijednosti** — omogućite je po ključu u **Kontrolna tabla → API Manager → uredi ključ → dozvole → Chaos Mode**. Isto tijelo kao iznad.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

Oba endpointa vraćaju isti oblik:

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
  "summary": "…", // samo za kolaborativni način rada
}
```

## Rješavanje problema

- **`400 Chaos Mode is not enabled`** — korak 2 iznad: globalni prekidač je isključen.
- **API ključ biva odbijen na `/api/skills/collect/chaos`** — ključu nedostaje `chaosModeEnabled` dozvola po ključu (isključena po podrazumijevanoj vrijednosti; ovo je postavka, a ne greška).
- **Provajder kojeg ste očekivali nedostaje u rezultatima** — provjerite `providerOverrides` na stranici Chaos Mode (onemogućena zamjena ga isključuje) i da li je veza sa provajderom aktivna.
