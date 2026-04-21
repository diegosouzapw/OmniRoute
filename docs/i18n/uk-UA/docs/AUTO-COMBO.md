# Двигун Auto-Combo OmniRoute

🌐 **Languages:** 🇺🇸 [English](../../../../docs/AUTO-COMBO.md) · 🇪🇸 [es](../../es/docs/AUTO-COMBO.md) · 🇫🇷 [fr](../../fr/docs/AUTO-COMBO.md) · 🇩🇪 [de](../../de/docs/AUTO-COMBO.md) · 🇮🇹 [it](../../it/docs/AUTO-COMBO.md) · 🇷🇺 [ru](../../ru/docs/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/AUTO-COMBO.md) · 🇯🇵 [ja](../../ja/docs/AUTO-COMBO.md) · 🇰🇷 [ko](../../ko/docs/AUTO-COMBO.md) · 🇸🇦 [ar](../../ar/docs/AUTO-COMBO.md) · 🇮🇳 [hi](../../hi/docs/AUTO-COMBO.md) · 🇮🇳 [in](../../in/docs/AUTO-COMBO.md) · 🇹🇭 [th](../../th/docs/AUTO-COMBO.md) · 🇻🇳 [vi](../../vi/docs/AUTO-COMBO.md) · 🇮🇩 [id](../../id/docs/AUTO-COMBO.md) · 🇲🇾 [ms](../../ms/docs/AUTO-COMBO.md) · 🇳🇱 [nl](../../nl/docs/AUTO-COMBO.md) · 🇵🇱 [pl](../../pl/docs/AUTO-COMBO.md) · 🇸🇪 [sv](../../sv/docs/AUTO-COMBO.md) · 🇳🇴 [no](../../no/docs/AUTO-COMBO.md) · 🇩🇰 [da](../../da/docs/AUTO-COMBO.md) · 🇫🇮 [fi](../../fi/docs/AUTO-COMBO.md) · 🇵🇹 [pt](../../pt/docs/AUTO-COMBO.md) · 🇷🇴 [ro](../../ro/docs/AUTO-COMBO.md) · 🇭🇺 [hu](../../hu/docs/AUTO-COMBO.md) · 🇧🇬 [bg](../../bg/docs/AUTO-COMBO.md) · 🇸🇰 [sk](../../sk/docs/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/AUTO-COMBO.md) · 🇮🇱 [he](../../he/docs/AUTO-COMBO.md) · 🇵🇭 [phi](../../phi/docs/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/AUTO-COMBO.md) · 🇨🇿 [cs](../../cs/docs/AUTO-COMBO.md) · 🇹🇷 [tr](../../tr/docs/AUTO-COMBO.md)

---

> Самокеровані ланцюги моделей з адаптивним оцінюванням

## Як це працює

Двигун Auto-Combo динамічно вибирає найкращого провайдера/модель для кожного запиту, використовуючи **6-факторну функцію оцінювання**:

| Фактор     | Вага | Опис                                            |
| :--------- | :--- | :---------------------------------------------- |
| Quota      | 0.20 | Залишкова ємність [0..1]                        |
| Health     | 0.25 | Circuit breaker: CLOSED=1.0, HALF=0.5, OPEN=0.0 |
| CostInv    | 0.20 | Обернена вартість (дешевше = вищий бал)         |
| LatencyInv | 0.15 | Обернена p95 затримка (швидше = вище)           |
| TaskFit    | 0.10 | Оцінка відповідності модель × тип завдання      |
| Stability  | 0.10 | Низька варіація затримки/помилок                |

## Пакети режимів

| Пакет                   | Фокус        | Ключова вага     |
| :---------------------- | :----------- | :--------------- |
| 🚀 **Ship Fast**        | Швидкість    | latencyInv: 0.35 |
| 💰 **Cost Saver**       | Економія     | costInv: 0.40    |
| 🎯 **Quality First**    | Краща модель | taskFit: 0.40    |
| 📡 **Offline Friendly** | Доступність  | quota: 0.40      |

## Самовідновлення

- **Тимчасове виключення**: Оцінка < 0.2 → виключено на 5 хв (прогресивний відкат, макс 30 хв)
- **Усвідомлення circuit breaker**: OPEN → авто-виключено; HALF_OPEN → пробні запити
- **Режим інциденту**: >50% OPEN → вимкнути дослідження, максимізувати стабільність
- **Відновлення після охолодження**: Після виключення перший запит є "пробним" зі зменшеним таймаутом

## Bandit дослідження

5% запитів (налаштовується) маршрутизуються до випадкових провайдерів для дослідження. Вимкнено в режимі інциденту.

## API

```bash
# Створити auto-combo
curl -X POST http://localhost:20128/api/combos/auto \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","candidatePool":["anthropic","google","openai"],"modePack":"ship-fast"}'

# Список auto-combos
curl http://localhost:20128/api/combos/auto
```

## Відповідність завданню

30+ моделей оцінено за 6 типами завдань (`coding`, `review`, `planning`, `analysis`, `debugging`, `documentation`). Підтримує шаблони з підстановкою (наприклад, `*-coder` → високий бал кодування).

## Файли

| Файл                                         | Призначення                              |
| :------------------------------------------- | :--------------------------------------- |
| `open-sse/services/autoCombo/scoring.ts`     | Функція оцінювання та нормалізація пулу  |
| `open-sse/services/autoCombo/taskFitness.ts` | Пошук відповідності модель × завдання    |
| `open-sse/services/autoCombo/engine.ts`      | Логіка вибору, bandit, обмеження бюджету |
| `open-sse/services/autoCombo/selfHealing.ts` | Виключення, проби, режим інциденту       |
| `open-sse/services/autoCombo/modePacks.ts`   | 4 профілі ваг                            |
| `src/app/api/combos/auto/route.ts`           | REST API                                 |
