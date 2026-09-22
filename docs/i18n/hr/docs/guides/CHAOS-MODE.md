# Chaos Mode (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **Nadzorna ploča:** **Chaos Mode** (bočna traka) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (sesija nadzorne ploče) · `POST /api/skills/collect/chaos` (API ključ)  
> **Izvor:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Chaos Mode šalje **jedan zadatak većem broju pružatelja istodobno** — svaki uključeni pružatelj
doprinosi jednom instancom modela, a sve odgovore dobivate jedan uz drugi (ili ulančane). To je
sučelje za izvršavanje s više modela, a ne strategija usmjeravanja: ono nikada ne utječe na vaš
uobičajeni promet prema `/v1/chat/completions`.

**Pojašnjenje — isporučuju se tri različite stvari koje u nazivu imaju "chaos":**

| Stvar                           | Što je to                                                                                                                        | Gdje je dokumentirano                        |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Chaos Mode**                  | Ovdje opisana stranica nadzorne ploče i API: šalje jedan zadatak većem broju pružatelja (paralelno ili suradnički).              | Ovaj vodič                                   |
| `auto/chaos`                    | ID modela Auto-Combo s ponderima bodovanja za umetanje kvarova, namijenjen testiranju otpornosti. Nije potrebna konfiguracija.   | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Konfiguracija kombinacije Chaos | Trajno spremljena kombinacija s `config.chaos.enabled` šalje zadatak panelu uz opcionalni model ocjenjivača (samo putem API-ja). | `open-sse/services/autoCombo/chaosEngine.ts` |

## Postavljanje

1. Otvorite **Nadzorna ploča → Chaos Mode** (`/dashboard/chaos`).
2. **Uključite ga** — Chaos Mode isporučuje se **onemogućen prema zadanim postavkama** (`enabled: false` u
   `src/lib/chaos/chaosConfig.ts`). Dok je onemogućen, `POST /api/chaos/run` odgovara s
   `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."`.
3. Odaberite sudionike i zadane postavke (trajno se spremaju po instanci putem spremišta postavki):

   | Polje               | Značenje                                                                   | Zadano / ograničenja                          |
   | ------------------- | -------------------------------------------------------------------------- | --------------------------------------------- |
   | `enabled`           | Glavni prekidač                                                            | `false`                                       |
   | `defaultMode`       | `parallel` ili `collaborative` (pogledajte u nastavku)                     | `parallel`                                    |
   | `providerOverrides` | Sudjelovanje po pružatelju (`providerId`, opcionalni `modelId`, `enabled`) | prazno = svaki aktivni pružatelj, najviše 200 |
   | `systemPrompt`      | Zamjena ugrađenog sistemskog upita za Chaos                                | opcionalno, najviše 10 000 znakova            |
   | `timeoutMs`         | Najdulje vrijeme po pozivu modela                                          | `120000` (5 000–600 000)                      |
   | `maxTokens`         | `max_tokens` po pozivu modela                                              | `4096` (256–128 000)                          |

4. Pokrenite **test sa same stranice** — ploča s rezultatima prikazuje odgovor,
   status i trajanje za svakog pružatelja.

## Načini izvršavanja

- **`parallel`** — svaki model istodobno dobiva isti zadatak; sve odgovore primate
  neovisno.
- **`collaborative`** — modeli se izvršavaju **ulančano**: svaki vidi izlaz prethodnog modela i
  od njega se traži da ga poboljša, proširi, kritizira ili ponudi alternativu. Polje `summary`
  odgovora spaja uspješne izlaze redoslijedom lanca (paralelna izvršavanja nemaju `summary`).

## API

### `POST /api/chaos/run` — sesija nadzorne ploče

Autentificirano kolačićem (upravljačka sesija — pogledajte
[MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md)); upotrebljava ga stranica nadzorne ploče.

```jsonc
// tijelo zahtjeva
{
  "task": "Usporedi pristupe problemu X", // obavezno
  "providers": ["glm", "kimi"], // opcionalni filtar
  "mode": "parallel", // opcionalno — nadjačava defaultMode
  "systemPrompt": "…", // opcionalna zamjena
  "maxTokens": 4096, // opcionalna zamjena
}
```

### `POST /api/skills/collect/chaos` — API ključ

Varijanta s tokenom Bearer za vanjske pozivatelje. Ključ mora imati **dopuštenje za Chaos Mode**
(`chaosModeEnabled`), koje je **isključeno prema zadanim postavkama** — omogućite ga za svaki ključ u
**Nadzorna ploča → API Manager → uređivanje ključa → dopuštenja → Chaos Mode**. Tijelo je jednako kao iznad.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

Obje krajnje točke vraćaju isti oblik:

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
  "summary": "…", // samo za način collaborative
}
```

## Rješavanje problema

- **`400 Chaos Mode is not enabled`** — pogledajte prethodni 2. korak: globalni prekidač je isključen.
- **API ključ odbijen je na `/api/skills/collect/chaos`** — ključ nema dopuštenje
  `chaosModeEnabled` za pojedinačni ključ (isključeno prema zadanim postavkama; ovo je postavka, a ne pogreška).
- **Očekivani pružatelj nedostaje u rezultatima** — provjerite `providerOverrides` na stranici
  Chaos Mode (onemogućena zamjena isključuje ga) te je li veza s pružateljem
  aktivna.
