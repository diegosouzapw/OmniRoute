# Chaos Mode (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **Töölaud:** **Kaoserežiim** (külgriba) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (töölaua seanss) · `POST /api/skills/collect/chaos` (API-võti)  
> **Lähtekood:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Kaoserežiim saadab **ühe ülesande korraga mitmele teenusepakkujale** — iga osalev teenusepakkuja
panustab ühe mudeli eksemplari ning kõik vastused kuvatakse kõrvuti (või ahelana). See on
mitme mudeli käitamise liides, mitte marsruutimisstrateegia: see ei mõjuta kunagi teie tavapärast
`/v1/chat/completions` liiklust.

**Täpsustus — nimega „chaos” on kaasas kolm erinevat asja:**

| Asi                                   | Mis see on                                                                                                                            | Kus dokumenteeritud                          |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Kaoserežiim**                       | Siin kirjeldatud töölaua leht ja API: ühe ülesande saatmine mitmele teenusepakkujale (paralleelselt või koostöös).                    | See juhend                                   |
| `auto/chaos`                          | Tõrkekindluse testimiseks mõeldud Auto-Combo mudeli ID koos tõrgete sisestamise hindamiskaaludega. Seadistamist pole vaja.            | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Chaose kombinatsiooni konfiguratsioon | Püsiv kombinatsioon, mille `config.chaos.enabled` saadab päringu mudelipaneelile koos valikulise hindamismudeliga (ainult API kaudu). | `open-sse/services/autoCombo/chaosEngine.ts` |

## Seadistamine

1. Avage **Töölaud → Kaoserežiim** (`/dashboard/chaos`).
2. Lülitage see **sisse** — Kaoserežiim on vaikimisi **keelatud** (`enabled: false` failis
   `src/lib/chaos/chaosConfig.ts`). Kui see on keelatud, vastab `POST /api/chaos/run`
   koodiga `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."`.
3. Valige osalejad ja vaikeväärtused (salvestatakse iga eksemplari kohta seadete hoidlas):

   | Väli                | Tähendus                                                                       | Vaikeväärtus / piirangud                       |
   | ------------------- | ------------------------------------------------------------------------------ | ---------------------------------------------- |
   | `enabled`           | Pealüliti                                                                      | `false`                                        |
   | `defaultMode`       | `parallel` või `collaborative` (vt allpool)                                    | `parallel`                                     |
   | `providerOverrides` | Teenusepakkujapõhine osalemine (`providerId`, valikuline `modelId`, `enabled`) | tühi = kõik aktiivsed teenusepakkujad, max 200 |
   | `systemPrompt`      | Sisseehitatud Chaose süsteemiviiba alistamine                                  | valikuline, max 10 000 märki                   |
   | `timeoutMs`         | Maksimaalne aeg ühe mudelikutse kohta                                          | `120000` (5 000–600 000)                       |
   | `maxTokens`         | `max_tokens` ühe mudelikutse kohta                                             | `4096` (256–128 000)                           |

4. Käivitage **test otse lehelt** — tulemuste paneel kuvab iga teenusepakkuja vastuse,
   oleku ja kestuse.

## Käitusrežiimid

- **`parallel`** — iga mudel saab sama ülesande korraga; kõik vastused tagastatakse
  üksteisest sõltumatult.
- **`collaborative`** — mudelid käivitatakse **ahelana**: igaüks näeb eelmise mudeli väljundit ning
  tal palutakse seda täiustada, laiendada, kritiseerida või pakkuda alternatiivi. Vastuse väli `summary`
  ühendab edukad väljundid ahela järjekorras (paralleelkäitustel `summary` puudub).

## API

### `POST /api/chaos/run` — töölaua seanss

Küpsistega autenditud (haldusseanss — vt
[MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md)); seda kasutab töölaua leht.

```jsonc
// päringu keha
{
  "task": "Compare approaches to X", // kohustuslik
  "providers": ["glm", "kimi"], // valikuline filter
  "mode": "parallel", // valikuline — alistab defaultMode
  "systemPrompt": "…", // valikuline alistus
  "maxTokens": 4096, // valikuline alistus
}
```

### `POST /api/skills/collect/chaos` — API-võti

Välistele kutsujatele mõeldud Bearer-loaga variant. Võtmel peab olema **Kaoserežiimi õigus**
(`chaosModeEnabled`), mis on **vaikimisi välja lülitatud** — lubage see iga võtme jaoks eraldi jaotises
**Töölaud → API-haldur → võtme muutmine → õigused → Kaoserežiim**. Päringu keha on sama mis eespool.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

Mõlemad lõpp-punktid tagastavad sama struktuuriga vastuse:

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
  "summary": "…", // ainult koostöörežiimis
}
```

## Tõrkeotsing

- **`400 Chaos Mode is not enabled`** — vt ülaltoodud 2. sammu: globaalne lüliti on välja lülitatud.
- **API-võti lükatakse lõpp-punktis `/api/skills/collect/chaos` tagasi** — võtmel puudub võtmepõhine
  õigus `chaosModeEnabled` (vaikimisi välja lülitatud; see on seadistus, mitte viga).
- **Oodatud teenusepakkuja puudub tulemustest** — kontrollige Kaoserežiimi lehel valikut
  `providerOverrides` (keelatud alistus välistab teenusepakkuja) ja seda, kas teenusepakkuja ühendus on
  aktiivne.
