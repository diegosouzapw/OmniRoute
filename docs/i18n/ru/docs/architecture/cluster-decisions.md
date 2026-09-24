# Cluster Decisions — Optional Sidecar Profiles (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/cluster-decisions.md) · 🇪🇹 [am](../../../am/docs/architecture/cluster-decisions.md) · 🇸🇦 [ar](../../../ar/docs/architecture/cluster-decisions.md) · 🇦🇿 [az](../../../az/docs/architecture/cluster-decisions.md) · 🇧🇬 [bg](../../../bg/docs/architecture/cluster-decisions.md) · 🇧🇩 [bn](../../../bn/docs/architecture/cluster-decisions.md) · 🇧🇦 [bs](../../../bs/docs/architecture/cluster-decisions.md) · 🇨🇿 [cs](../../../cs/docs/architecture/cluster-decisions.md) · 🇩🇰 [da](../../../da/docs/architecture/cluster-decisions.md) · 🇩🇪 [de](../../../de/docs/architecture/cluster-decisions.md) · 🇬🇷 [el](../../../el/docs/architecture/cluster-decisions.md) · 🇪🇸 [es](../../../es/docs/architecture/cluster-decisions.md) · 🇪🇪 [et](../../../et/docs/architecture/cluster-decisions.md) · 🇮🇷 [fa](../../../fa/docs/architecture/cluster-decisions.md) · 🇫🇮 [fi](../../../fi/docs/architecture/cluster-decisions.md) · 🇫🇷 [fr](../../../fr/docs/architecture/cluster-decisions.md) · 🇮🇪 [ga](../../../ga/docs/architecture/cluster-decisions.md) · 🇮🇳 [gu](../../../gu/docs/architecture/cluster-decisions.md) · 🇳🇬 [ha](../../../ha/docs/architecture/cluster-decisions.md) · 🇮🇱 [he](../../../he/docs/architecture/cluster-decisions.md) · 🇮🇳 [hi](../../../hi/docs/architecture/cluster-decisions.md) · 🇭🇷 [hr](../../../hr/docs/architecture/cluster-decisions.md) · 🇭🇺 [hu](../../../hu/docs/architecture/cluster-decisions.md) · 🇦🇲 [hy](../../../hy/docs/architecture/cluster-decisions.md) · 🇮🇩 [id](../../../id/docs/architecture/cluster-decisions.md) · 🇳🇬 [ig](../../../ig/docs/architecture/cluster-decisions.md) · 🇮🇹 [it](../../../it/docs/architecture/cluster-decisions.md) · 🇯🇵 [ja](../../../ja/docs/architecture/cluster-decisions.md) · 🇬🇪 [ka](../../../ka/docs/architecture/cluster-decisions.md) · 🇰🇭 [km](../../../km/docs/architecture/cluster-decisions.md) · 🇮🇳 [kn](../../../kn/docs/architecture/cluster-decisions.md) · 🇰🇷 [ko](../../../ko/docs/architecture/cluster-decisions.md) · 🇱🇹 [lt](../../../lt/docs/architecture/cluster-decisions.md) · 🇱🇻 [lv](../../../lv/docs/architecture/cluster-decisions.md) · 🇮🇳 [ml](../../../ml/docs/architecture/cluster-decisions.md) · 🇮🇳 [mr](../../../mr/docs/architecture/cluster-decisions.md) · 🇲🇾 [ms](../../../ms/docs/architecture/cluster-decisions.md) · 🇲🇹 [mt](../../../mt/docs/architecture/cluster-decisions.md) · 🇲🇲 [my](../../../my/docs/architecture/cluster-decisions.md) · 🇳🇵 [ne](../../../ne/docs/architecture/cluster-decisions.md) · 🇳🇱 [nl](../../../nl/docs/architecture/cluster-decisions.md) · 🇳🇴 [no](../../../no/docs/architecture/cluster-decisions.md) · 🇮🇳 [or](../../../or/docs/architecture/cluster-decisions.md) · 🇮🇳 [pa](../../../pa/docs/architecture/cluster-decisions.md) · 🇵🇭 [phi](../../../phi/docs/architecture/cluster-decisions.md) · 🇵🇱 [pl](../../../pl/docs/architecture/cluster-decisions.md) · 🇵🇹 [pt](../../../pt/docs/architecture/cluster-decisions.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/cluster-decisions.md) · 🇷🇴 [ro](../../../ro/docs/architecture/cluster-decisions.md) · 🇱🇰 [si](../../../si/docs/architecture/cluster-decisions.md) · 🇸🇰 [sk](../../../sk/docs/architecture/cluster-decisions.md) · 🇸🇮 [sl](../../../sl/docs/architecture/cluster-decisions.md) · 🇷🇸 [sr](../../../sr/docs/architecture/cluster-decisions.md) · 🇸🇪 [sv](../../../sv/docs/architecture/cluster-decisions.md) · 🇰🇪 [sw](../../../sw/docs/architecture/cluster-decisions.md) · 🇮🇳 [ta](../../../ta/docs/architecture/cluster-decisions.md) · 🇮🇳 [te](../../../te/docs/architecture/cluster-decisions.md) · 🇹🇭 [th](../../../th/docs/architecture/cluster-decisions.md) · 🇹🇷 [tr](../../../tr/docs/architecture/cluster-decisions.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/cluster-decisions.md) · 🇵🇰 [ur](../../../ur/docs/architecture/cluster-decisions.md) · 🇺🇿 [uz](../../../uz/docs/architecture/cluster-decisions.md) · 🇻🇳 [vi](../../../vi/docs/architecture/cluster-decisions.md) · 🇳🇬 [yo](../../../yo/docs/architecture/cluster-decisions.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/cluster-decisions.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/cluster-decisions.md)

---

**Статус:** предложение (ожидает ревью от @diegosouzapw)
**Дата:** 2026-06-20
**Ссылки:** [#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932), PR #4381

## Кратко

Два опциональных профиля Compose (`memory`, `bifrost`) для существующего развёртывания из 8 сервисов в [`docker-compose.yml`](../../docker-compose.yml). Поведение при запуске по умолчанию **не изменяется**: 3 реплики `omniroute` + Caddy + Redis + CliproxyAPI. Два новых профиля добавляют Qdrant и Bifrost в качестве опциональных сайдкаров, включаемых через `docker compose --profile <name> up`. **Ни один существующий сервис не удаляется и не заменяется.**

## Почему это консервативный подход

Существующая архитектура развёртывания OmniRoute уже компактна и проверена:

- **`redis:7-alpine`** обрабатывает ограничение частоты запросов и кеширование в производственном масштабе.
- **SQLite + sqlite-vec + FTS5** обеспечивают локальную память, векторный и текстовый поиск (см. [`src/lib/memory/vectorStore.ts:108`](../../src/lib/memory/vectorStore.ts)).
- **Caddy** уже используется как балансировщик нагрузки и точка завершения TLS ([`docker-compose.yml`](../../docker-compose.yml)).
- **Bifrost** уже интегрирован как маршрутизатор уровня Tier-1 в [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (сайдкар-прокси с аварийным выключателем через переменную окружения `BIFROST_ENABLED` — установите `=0`, чтобы обойти сайдкар и перейти к маршруту TS).

Эти два профиля являются **вариантами масштабирования для развёртываний, достигших пределов SQLite**, а не миграциями. Оба по умолчанию отключены.

## Два профиля

### `memory` — сайдкар векторной памяти Qdrant

**Когда включать:**

- Более 1 млн эмбеддингов на одно развёртывание (sqlite-vec начинает замедляться при масштабировании).
- Развёртывание с несколькими репликами, которым требуется общее векторное состояние между `omniroute-1/2/3`.
- У вас уже есть внешний кластер Qdrant (Qdrant Cloud или локально развёрнутый).

**Что он добавляет:**

| Сервис   | Образ                   | Порты       | Примечания                                          |
| -------- | ----------------------- | ----------- | --------------------------------------------------- |
| `qdrant` | `qdrant/qdrant:v1.12.4` | `6333` HTTP | Индекс HNSW; постоянный том `omniroute_qdrant_data` |

**Активация:** включите `qdrantEnabled = true` в интерфейсе настроек **или** задайте переменную окружения `QDRANT_HOST=qdrant`. Правила приоритетов (таблица настроек → переменная окружения → значение по умолчанию) описаны в [`src/lib/memory/qdrant.ts:60`](../../src/lib/memory/qdrant.ts).

**Переменные окружения:** `QDRANT_HOST`, `QDRANT_PORT`, `QDRANT_API_KEY`, `QDRANT_COLLECTION`, `QDRANT_VECTOR_SIZE`, `QDRANT_HNSW_EF_CONSTRUCT` (см. строки 1672-1683 в `.env.example`).

### `bifrost` — сайдкар маршрутизатора Bifrost уровня Tier-1

**Когда включать:**

- Вы используете ≥3 реплик `omniroute` и хотите централизовать ротацию провайдеров в едином процессе Go.
- Вам нужен единый интерфейс аудита и журналирования запросов к вышестоящим провайдерам для всех реплик.
- Вы хотите масштабировать уровень маршрутизации Tier-1 горизонтально и независимо от реплик OmniRoute.

**Что он добавляет:**

| Сервис    | Образ                             | Порты  | Примечания                                                                        |
| --------- | --------------------------------- | ------ | --------------------------------------------------------------------------------- |
| `bifrost` | `ghcr.io/maximhq/bifrost:v1.6.11` | `8080` | Маршрутизатор Tier-1 на базе Go; постоянный том журналов `omniroute_bifrost_logs` |

**Активация:** задайте `BIFROST_BASE_URL=http://bifrost:8080` в `.env.example`. Существующий маршрут сайдкар-прокси в [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (добавленный в PR #4381) автоматически использует это значение.

**Переменные окружения:** `BIFROST_BASE_URL`, `BIFROST_API_KEY`, `BIFROST_STREAMING_ENABLED`, `BIFROST_TIMEOUT_MS` (см. строки 1685-1695 в `.env.example`).

## Что этот PR явно НЕ делает

В исходном обсуждении issue предлагалась более масштабная переработка кластера. После анализа фактического характера нагрузки следующие компоненты были **отклонены** по указанным причинам:

| Компонент                            | Решение       | Причина                                                                                                                          |
| ------------------------------------ | ------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Dragonfly**                        | **ИСКЛЮЧИТЬ** | `redis:7-alpine` уже подходит для ограничения частоты запросов при производственной нагрузке; упираться в лимиты не приходится.  |
| **NATS**                             | **ИСКЛЮЧИТЬ** | Каждая реплика `omniroute` представляет собой один процесс Node.js; многопроцессной нагрузки pub/sub нет.                        |
| **PostgreSQL**                       | **ИСКЛЮЧИТЬ** | SQLite + sqlite-vec + FTS5 покрывают все 3 сценария использования; миграции 97 + упаковка Electron препятствуют переходу.        |
| **Neo4j**                            | **ИСКЛЮЧИТЬ** | Маршрутизация представляет собой соединение 5 таблиц; рекурсивного CTE в SQLite достаточно.                                      |
| **MinIO**                            | **ИСКЛЮЧИТЬ** | Нагрузки с многомегабайтными blob-объектами нет; изображения и аудио передаются через прокси без обработки.                      |
| **pgvector / pg_ai / pg_textsearch** | **ИСКЛЮЧИТЬ** | Та же причина, связанная с отсутствием ограничений SQLite, что и для PostgreSQL; экосистема pgvector фрагментирована.            |
| **HAProxy / Envoy**                  | **ИСКЛЮЧИТЬ** | Caddy уже обеспечивает балансировку нагрузки + TLS; оба решения были явно отклонены как маршрутизаторы Tier-1 (см. `AGENTS.md`). |

Если будущий сценарий использования подтвердит необходимость одного из этих компонентов, изменения следует внести в этот документ.

## 4-недельное развертывание (в случае одобрения)

1. **Нед. 1** — Влить этот PR + проверить профили с явным включением в стеке compose из 3 реплик.
2. **Нед. 2** — Полностью активировать Bifrost для OpenAI/Claude/Gemini/Ollama (4 из 14+ провайдеров) с использованием маршрута прокси-sidecar в [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (управляется `BIFROST_ENABLED`, поддерживает аварийное отключение во время выполнения).
3. **Нед. 3** — Включить профиль памяти Qdrant в одном тестовом развертывании; измерить разницу в задержке по сравнению с sqlite-vec.
4. **Нед. 4** — Проверки работоспособности наблюдаемости (коды завершения `docker compose ps` + smoke-тесты `wget`); обновление 71 компонента согласно ADR-041.

## Файлы, измененные в этом PR

| Файл                                                 | Изменение                                                                                                                                                                                                                                                      |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docker-compose.yml`                                 | +30 строк: профиль `memory` (Qdrant), профиль `bifrost` (Bifrost), постоянные тома, проверки работоспособности.                                                                                                                                                |
| `.env.example`                                       | +24 строки: `QDRANT_*` (6 переменных), `BIFROST_*` (4 переменные).                                                                                                                                                                                             |
| `docs/reference/ENVIRONMENT.md`                      | +6 строк в разделе 25 для переменных окружения `QDRANT_*`.                                                                                                                                                                                                     |
| `src/lib/memory/qdrant.ts`                           | +33 строки: цепочка резервных значений для переменных окружения (настройки → окружение → значение по умолчанию) для `QDRANT_HOST`/`QDRANT_PORT`/`QDRANT_API_KEY`/`QDRANT_COLLECTION`/`QDRANT_VECTOR_SIZE`/`QDRANT_HNSW_EF_CONSTRUCT`/`QDRANT_EMBEDDING_MODEL`. |
| `src/lib/memory/__tests__/qdrant-wiring.test.ts`     | +88 строк: 9 новых тестовых случаев, фиксирующих приоритет резервных значений переменных окружения.                                                                                                                                                            |
| `docs/architecture/cluster-decisions.md` (этот файл) | НОВЫЙ — запись о решениях по профилям с явным включением.                                                                                                                                                                                                      |
| `AGENTS.md`                                          | +1 строка: ссылка на этот документ в таблице справочной документации.                                                                                                                                                                                          |

**Итого затронутого кода:** 4 производственных файла (`docker-compose.yml`, `qdrant.ts`, `.env.example`, `ENVIRONMENT.md`), 1 тестовый файл (`qdrant-wiring.test.ts`), 2 файла документации (`cluster-decisions.md`, `AGENTS.md`).
