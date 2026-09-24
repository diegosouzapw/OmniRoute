# Chaos Mode (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **Табло:** **Chaos Mode** (странична лента) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (сесия на таблото) · `POST /api/skills/collect/chaos` (API ключ)  
> **Изходен код:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Chaos Mode изпраща **една задача едновременно до няколко доставчика** — всеки участващ доставчик
предоставя една инстанция на модел, а вие получавате всички отговори един до друг (или във верига). Това е
интерфейс за изпълнение с множество модели, а не стратегия за маршрутизиране: обичайният ви трафик към
`/v1/chat/completions` никога не се влияе от него.

**Уточнение — има три различни неща с „chaos“ в името:**

| Нещо                             | Какво представлява                                                                                                                            | Къде е документирано                         |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Chaos Mode**                   | Описаните тук страница на таблото и API: разпределят една задача към много доставчици (паралелно или съвместно).                              | Това ръководство                             |
| `auto/chaos`                     | Идентификатор на Auto-Combo модел с тегла за оценяване чрез инжектиране на грешки, предназначен за тестове за устойчивост. Не се конфигурира. | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Конфигурация на Chaos комбинация | Запазена комбинация, при която `config.chaos.enabled` разпределя заявката към панел с незадължителен модел-съдия (само чрез API).             | `open-sse/services/autoCombo/chaosEngine.ts` |

## Настройване

1. Отворете **Табло → Chaos Mode** (`/dashboard/chaos`).
2. **Включете го** — Chaos Mode се предоставя **изключен по подразбиране** (`enabled: false` в
   `src/lib/chaos/chaosConfig.ts`). Докато е изключен, `POST /api/chaos/run` връща
   `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."`.
3. Изберете участниците и стойностите по подразбиране (запазват се за всяка инстанция чрез хранилището за настройки):

   | Поле                | Значение                                                                  | По подразбиране / ограничения                  |
   | ------------------- | ------------------------------------------------------------------------- | ---------------------------------------------- |
   | `enabled`           | Главен превключвател                                                      | `false`                                        |
   | `defaultMode`       | `parallel` или `collaborative` (вижте по-долу)                            | `parallel`                                     |
   | `providerOverrides` | Участие по доставчици (`providerId`, незадължителен `modelId`, `enabled`) | празно = всеки активен доставчик, максимум 200 |
   | `systemPrompt`      | Замяна на вградената системна подкана на Chaos                            | незадължително, максимум 10 000 знака          |
   | `timeoutMs`         | Максимално време за всяко извикване на модел                              | `120000` (5 000–600 000)                       |
   | `maxTokens`         | `max_tokens` за всяко извикване на модел                                  | `4096` (256–128 000)                           |

4. Изпълнете **тест от самата страница** — панелът с резултати показва отговора,
   състоянието и продължителността за всеки доставчик.

## Режими на изпълнение

- **`parallel`** — всеки модел получава една и съща задача едновременно; получавате всички отговори
  независимо един от друг.
- **`collaborative`** — моделите се изпълняват **във верига**: всеки вижда резултата от предишния модел и
  получава указание да го прецизира, разшири, критикува или да предложи алтернатива. Полето `summary` в отговора
  обединява успешните резултати по реда на веригата (паралелните изпълнения нямат `summary`).

## API

### `POST /api/chaos/run` — сесия на таблото

Удостоверяване чрез бисквитка (сесията за управление — вижте
[MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md)); използва се от страницата на таблото.

```jsonc
// тяло
{
  "task": "Compare approaches to X", // задължително
  "providers": ["glm", "kimi"], // незадължителен филтър
  "mode": "parallel", // незадължително — заменя defaultMode
  "systemPrompt": "…", // незадължителна замяна
  "maxTokens": 4096, // незадължителна замяна
}
```

### `POST /api/skills/collect/chaos` — API ключ

Вариант с Bearer токен за външни клиенти. Ключът трябва да има **разрешение за Chaos Mode**
(`chaosModeEnabled`), което е **изключено по подразбиране** — включете го поотделно за всеки ключ от
**Табло → API Manager → редактиране на ключ → разрешения → Chaos Mode**. Тялото е същото като по-горе.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

И двете крайни точки връщат една и съща структура:

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
  "summary": "…", // само за режим collaborative
}
```

## Отстраняване на проблеми

- **`400 Chaos Mode is not enabled`** — вижте стъпка 2 по-горе: глобалният превключвател е изключен.
- **API ключът е отхвърлен при `/api/skills/collect/chaos`** — ключът няма индивидуалното
  разрешение `chaosModeEnabled` (изключено е по подразбиране; това е настройка, а не грешка).
- **Очакван доставчик липсва в резултатите** — проверете `providerOverrides` на страницата
  Chaos Mode (изключена замяна го изключва), както и дали връзката с доставчика е
  активна.
