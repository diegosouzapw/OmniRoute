# Chaos Mode (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **Контролна табла:** **Chaos Mode** (бочна трака) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (сесија контролне табле) · `POST /api/skills/collect/chaos` (API кључ)  
> **Извор:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Chaos Mode шаље **један задатак већем броју добављача истовремено** — сваки добављач који учествује
доприноси једном инстанцом модела, а ви добијате све одговоре један поред другог (или у ланцу). То је
површина за извршавање са више модела, а не стратегија усмеравања: она никада не утиче на ваш уобичајени
саобраћај ка `/v1/chat/completions`.

**Појашњење — испоручују се три различите ствари које у називу имају „chaos“:**

| Ствар                           | Шта представља                                                                                                                         | Где је документовано                         |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Chaos Mode**                  | Страница контролне табле + API описан овде: прослеђивање једног задатка већем броју добављача (паралелно или сараднички).              | Овај водич                                   |
| `auto/chaos`                    | ID Auto-Combo модела са тежинама за оцењивање убризгавања грешака, намењен тестирању отпорности. Нема подешавања.                      | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Конфигурација Chaos комбинације | Трајно сачувана комбинација са `config.chaos.enabled` која прослеђује захтев панелу уз опциони модел за оцењивање (само преко API-ја). | `open-sse/services/autoCombo/chaosEngine.ts` |

## Подешавање

1. Отворите **Контролна табла → Chaos Mode** (`/dashboard/chaos`).
2. **Укључите** га — Chaos Mode се испоручује **подразумевано онемогућен** (`enabled: false` у
   `src/lib/chaos/chaosConfig.ts`). Док је онемогућен, `POST /api/chaos/run` враћа
   `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."`.
3. Изаберите учеснике и подразумеване вредности (трајно се чувају по инстанци путем складишта подешавања):

   | Поље                | Значење                                                          | Подразумевано / ограничења                   |
   | ------------------- | ---------------------------------------------------------------- | -------------------------------------------- |
   | `enabled`           | Главни прекидач                                                  | `false`                                      |
   | `defaultMode`       | `parallel` или `collaborative` (погледајте испод)                | `parallel`                                   |
   | `providerOverrides` | Учешће по добављачу (`providerId`, опциони `modelId`, `enabled`) | празно = сваки активни добављач, највише 200 |
   | `systemPrompt`      | Замена уграђеног Chaos системског упита                          | опционо, највише 10 000 знакова              |
   | `timeoutMs`         | Максимално време по позиву модела                                | `120000` (5 000–600 000)                     |
   | `maxTokens`         | `max_tokens` по позиву модела                                    | `4096` (256–128 000)                         |

4. Покрените **тест са саме странице** — панел са резултатима приказује одговор,
   статус и трајање за сваког добављача.

## Режими извршавања

- **`parallel`** — сваки модел истовремено добија исти задатак; добијате све одговоре
  независно.
- **`collaborative`** — модели се извршавају **у ланцу**: сваки види излаз претходног модела и
  од њега се тражи да га побољша, прошири, критикује или понуди алтернативу. Поље `summary` у одговору
  спаја успешне излазе редоследом у ланцу (паралелна извршавања немају `summary`).

## API

### `POST /api/chaos/run` — сесија контролне табле

Аутентификација помоћу колачића (управљачка сесија — погледајте
[MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md)); користи је страница контролне табле.

```jsonc
// тело
{
  "task": "Упореди приступе проблему X", // обавезно
  "providers": ["glm", "kimi"], // опциони филтер
  "mode": "parallel", // опционо — замењује defaultMode
  "systemPrompt": "…", // опциона замена
  "maxTokens": 4096, // опциона замена
}
```

### `POST /api/skills/collect/chaos` — API кључ

Варијанта са Bearer токеном за спољне позиваоце. Кључ мора имати **дозволу за Chaos Mode**
(`chaosModeEnabled`), која је **подразумевано искључена** — омогућите је за сваки кључ у
**Контролна табла → API Manager → уређивање кључа → дозволе → Chaos Mode**. Тело је исто као изнад.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

Обе крајње тачке враћају исти облик:

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
  "summary": "…", // само у collaborative режиму
}
```

## Решавање проблема

- **`400 Chaos Mode is not enabled`** — погледајте корак 2 изнад: глобални прекидач је искључен.
- **API кључ се одбија на `/api/skills/collect/chaos`** — кључу недостаје дозвола
  `chaosModeEnabled` за тај кључ (подразумевано је искључена; ово је подешавање, а не грешка).
- **Добављач којег сте очекивали недостаје у резултатима** — проверите `providerOverrides` на
  страници Chaos Mode (онемогућена замена га искључује), као и да ли је веза са добављачем
  активна.
