# Chaos Mode (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **Panou de control:** **Chaos Mode** (bara laterală) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (sesiunea panoului de control) · `POST /api/skills/collect/chaos` (cheie API)  
> **Sursă:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Chaos Mode trimite **o sarcină mai multor furnizori simultan** — fiecare furnizor participant
contribuie cu o instanță de model, iar toate răspunsurile sunt afișate unul lângă altul (sau înlănțuite). Este o
suprafață de execuție cu mai multe modele, nu o strategie de rutare: traficul obișnuit
`/v1/chat/completions` nu este niciodată afectat de aceasta.

**Clarificare — sunt livrate trei lucruri diferite care conțin „chaos” în nume:**

| Element                     | Ce reprezintă                                                                                                                        | Unde este documentat                         |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| **Chaos Mode**              | Pagina panoului de control + API-ul descris aici: distribuie o sarcină către mai mulți furnizori (în paralel sau colaborativ).       | Acest ghid                                   |
| `auto/chaos`                | Un ID de model Auto-Combo cu ponderi de evaluare pentru injectarea erorilor, destinat testării rezilienței. Nu necesită configurare. | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Configurație de combo Chaos | Un combo persistent cu `config.chaos.enabled` distribuie sarcina unui grup, cu un model evaluator opțional (doar prin API).          | `open-sse/services/autoCombo/chaosEngine.ts` |

## Configurare

1. Deschideți **Panou de control → Chaos Mode** (`/dashboard/chaos`).
2. **Activați-l** — Chaos Mode este livrat **dezactivat în mod implicit** (`enabled: false` în
   `src/lib/chaos/chaosConfig.ts`). Cât timp este dezactivat, `POST /api/chaos/run` răspunde cu
   `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."`.
3. Alegeți participanții și valorile implicite (salvate pentru fiecare instanță prin intermediul magazinului de setări):

   | Câmp                | Semnificație                                                           | Valoare implicită / limite                |
   | ------------------- | ---------------------------------------------------------------------- | ----------------------------------------- |
   | `enabled`           | Comutator principal                                                    | `false`                                   |
   | `defaultMode`       | `parallel` sau `collaborative` (vedeți mai jos)                        | `parallel`                                |
   | `providerOverrides` | Participare per furnizor (`providerId`, `modelId` opțional, `enabled`) | gol = fiecare furnizor activ, maximum 200 |
   | `systemPrompt`      | Suprascriere pentru promptul de sistem Chaos încorporat                | opțional, maximum 10 000 de caractere     |
   | `timeoutMs`         | Durata maximă pentru fiecare apel de model                             | `120000` (5 000–600 000)                  |
   | `maxTokens`         | `max_tokens` pentru fiecare apel de model                              | `4096` (256–128 000)                      |

4. Rulați un **test direct din pagină** — panoul de rezultate afișează răspunsul,
   starea și durata fiecărui furnizor.

## Moduri de execuție

- **`parallel`** — fiecare model primește aceeași sarcină simultan; primiți toate răspunsurile
  în mod independent.
- **`collaborative`** — modelele rulează **într-un lanț**: fiecare vede rezultatul modelului anterior și
  primește instrucțiunea de a-l rafina, extinde, critica sau de a oferi o alternativă. Câmpul `summary` al răspunsului
  concatenează rezultatele reușite în ordinea lanțului (rulările paralele nu au câmpul `summary`).

## API

### `POST /api/chaos/run` — sesiunea panoului de control

Autentificat prin cookie (sesiunea de administrare — consultați
[MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md)); utilizat de pagina panoului de control.

```jsonc
// corpul cererii
{
  "task": "Compare approaches to X", // obligatoriu
  "providers": ["glm", "kimi"], // filtru opțional
  "mode": "parallel", // opțional — suprascrie defaultMode
  "systemPrompt": "…", // suprascriere opțională
  "maxTokens": 4096, // suprascriere opțională
}
```

### `POST /api/skills/collect/chaos` — cheie API

Variantă cu token Bearer pentru apelanți externi. Cheia trebuie să includă **permisiunea Chaos Mode**
(`chaosModeEnabled`), care este **dezactivată în mod implicit** — activați-o pentru fiecare cheie în
**Panou de control → API Manager → editați cheia → permisiuni → Chaos Mode**. Același corp al cererii ca mai sus.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

Ambele endpoint-uri returnează aceeași structură:

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
  "summary": "…", // doar în modul colaborativ
}
```

## Depanare

- **`400 Chaos Mode is not enabled`** — consultați pasul 2 de mai sus: comutatorul global este dezactivat.
- **Cheia API este respinsă pentru `/api/skills/collect/chaos`** — cheia nu are permisiunea individuală
  `chaosModeEnabled` (dezactivată în mod implicit; aceasta este o setare, nu o eroare).
- **Un furnizor pe care îl așteptați lipsește din rezultate** — verificați `providerOverrides` pe pagina
  Chaos Mode (o suprascriere dezactivată îl exclude) și dacă conexiunea furnizorului este
  activă.
