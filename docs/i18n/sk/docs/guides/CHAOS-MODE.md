# Chaos Mode (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **Ovládací panel:** **Chaos Mode** (bočný panel) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (relácia ovládacieho panela) · `POST /api/skills/collect/chaos` (kľúč API)  
> **Zdroj:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Chaos Mode odošle **jednu úlohu viacerým poskytovateľom naraz** — každý zapojený poskytovateľ
prispeje jednou inštanciou modelu a všetky odpovede dostanete vedľa seba (alebo zreťazené). Ide
o rozhranie na vykonávanie pomocou viacerých modelov, nie o stratégiu smerovania: vašu bežnú
prevádzku `/v1/chat/completions` nikdy neovplyvní.

**Vysvetlenie rozdielov — súčasťou produktu sú tri rôzne veci s názvom „chaos“:**

| Vec                           | Čo to je                                                                                                                                                                                       | Kde je zdokumentovaná                        |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Chaos Mode**                | Tu opísaná stránka ovládacieho panela a API: rozvetví jednu úlohu medzi viacerých poskytovateľov (paralelne alebo spolupracujúcim spôsobom).                                                   | Táto príručka                                |
| `auto/chaos`                  | ID modelu Auto-Combo: paralelné rozvetvenie, jeden model na poskytovateľa, každému sa odošle jedno upstreamové volanie. Nejde o vkladanie porúch ([podrobnosti](#autochaos-parallel-fan-out)). | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Konfigurácia kombinácie Chaos | Trvalo uložená kombinácia s `config.chaos.enabled` vykonáva rovnaké rozvetvenie (iba cez API); `judgeModel` iba vyberá konečnú odpoveď, bez volania na syntézu.                                | `open-sse/services/autoCombo/chaosEngine.ts` |

### `auto/chaos`: paralelné rozvetvenie

`auto/chaos` **nie je** prepínač na vkladanie porúch ani testovanie odolnosti. Požiadavka
s `model: "auto/chaos"` na `/v1/chat/completions`:

1. Zostaví panel s **jedným modelom od každého poskytovateľa**: prvým kandidátom každého
   pripojeného poskytovateľa v poradí fondu kandidátov, najviac však 5 členov
   (`OMNIROUTE_CHAOS_MAX_PANEL`, s horným limitom 10)
   (`open-sse/services/autoCombo/virtualFactory.ts`). Balík váh `chaos-mode`
   nastavuje iba hodnotu `weight` každého člena; mechanizmus rozvetvenia ju nečíta.
2. Odošle rovnakú požiadavku každému členovi panela **paralelne**, takže jedna požiadavka
   stojí jedno upstreamové volanie na každého člena panela
   (`open-sse/services/autoCombo/chaosEngine.ts`, odoslané z
   `open-sse/services/combo.ts`).
3. Pri doručení výsledku streamuje jeden stavový riadok pre každého člena panela: predvolene
   komentár SSE (`: chaos <index> ok|fail <model>`) a navyše udalosť `omni-chaos-part`
   (`model`, `index`, `ok`, `error`), ak požiadavka nastaví
   `stream_options.include_chaos_parts: true`. Tieto správy neobsahujú text odpovede.
4. Odošle **jednu** odpoveď panela ako konečný blok v štýle OpenAI: odpoveď prvého člena
   panela (`auto/chaos` ho nastaví ako `judgeModel`), ak bol úspešný, inak odpoveď
   posledného úspešného člena. Ostatné odpovede panela sa nevrátia, takže zaplatíte
   za N volaní a dostanete jedno dokončenie.

## Nastavenie

1. Otvorte **Ovládací panel → Chaos Mode** (`/dashboard/chaos`).
2. **Zapnite ho** — Chaos Mode sa dodáva **predvolene vypnutý** (`enabled: false` v
   `src/lib/chaos/chaosConfig.ts`). Kým je vypnutý, `POST /api/chaos/run` odpovedá
   `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."`.
3. Vyberte účastníkov a predvolené hodnoty (ukladajú sa pre každú inštanciu prostredníctvom úložiska nastavení):

   | Pole                | Význam                                                                           | Predvolená hodnota/limity                      |
   | ------------------- | -------------------------------------------------------------------------------- | ---------------------------------------------- |
   | `enabled`           | Hlavný prepínač                                                                  | `false`                                        |
   | `defaultMode`       | `parallel` alebo `collaborative` (pozri nižšie)                                  | `parallel`                                     |
   | `providerOverrides` | Účasť jednotlivých poskytovateľov (`providerId`, voliteľné `modelId`, `enabled`) | prázdne = každý aktívny poskytovateľ, max. 200 |
   | `systemPrompt`      | Nahradenie vstavaného systémového promptu režimu Chaos                           | voliteľné, max. 10 000 znakov                  |
   | `timeoutMs`         | Maximálny čas jedného volania modelu                                             | `120000` (5 000–600 000)                       |
   | `maxTokens`         | `max_tokens` pre jedno volanie modelu                                            | `4096` (256–128 000)                           |

4. Spustite **test priamo zo stránky** — panel výsledkov zobrazí odpoveď, stav a trvanie
   každého poskytovateľa.

## Režimy vykonávania

- **`parallel`** — každý model dostane rovnakú úlohu súčasne; všetky odpovede dostanete
  nezávisle.
- **`collaborative`** — modely sa spúšťajú **v reťazci**: každý z nich vidí výstup predchádzajúceho modelu a
  dostane pokyn, aby ho vylepšil, rozšíril, kriticky posúdil alebo ponúkol alternatívu. Pole `summary`
  v odpovedi spája úspešné výstupy v poradí reťazca (paralelné spustenia nemajú `summary`).

## API

### `POST /api/chaos/run` — relácia ovládacieho panela

Overenie pomocou súborov cookie (relácia správy — pozri
[MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md)); používa ho stránka ovládacieho panela.

```jsonc
// telo
{
  "task": "Compare approaches to X", // povinné
  "providers": ["glm", "kimi"], // voliteľný filter
  "mode": "parallel", // voliteľné — prepíše defaultMode
  "systemPrompt": "…", // voliteľné prepísanie
  "maxTokens": 4096, // voliteľné prepísanie
}
```

### `POST /api/skills/collect/chaos` — API kľúč

Variant s nosným tokenom pre externých volajúcich. Kľúč musí mať **oprávnenie pre Chaos Mode**
(`chaosModeEnabled`), ktoré je **predvolene vypnuté** — zapnite ho pre každý kľúč v časti
**Ovládací panel → Správca API → upraviť kľúč → oprávnenia → Chaos Mode**. Telo je rovnaké ako vyššie.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

Oba koncové body vracajú rovnakú štruktúru:

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
  "summary": "…", // iba v režime spolupráce
}
```

## Riešenie problémov

- **`400 Chaos Mode is not enabled`** — pozrite krok 2 vyššie: globálny prepínač je vypnutý.
- **API kľúč je na `/api/skills/collect/chaos` odmietnutý** — kľúču chýba oprávnenie
  `chaosModeEnabled` pre daný kľúč (predvolene je vypnuté; ide o nastavenie, nie o chybu).
- **Poskytovateľ, ktorého ste očakávali, vo výsledkoch chýba** — skontrolujte `providerOverrides` na
  stránke Chaos Mode (vypnuté prepísanie ho vylúči) a overte, či je pripojenie poskytovateľa
  aktívne.
