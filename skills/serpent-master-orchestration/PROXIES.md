# PROXIES & MODEL ROUTING — SerpentOS

> Полная инструкция интеграции:
> OmniRoute :20128 | TokenSaver :4000 (Claude proxy) | Antigravity :8045 | Qwen / Alibaba DashScope

---

## 1. OmniRoute (:20128) — 179+ провайдеров

### Что это

Опенсорс-роутер, дающий единый OpenAI-совместимый endpoint для 179+ провайдеров, включая Qwen, Kimi, DeepSeek, Claude, GPT, Gemini.

### Установка

```bash
# Уже есть в Doppler — проверка:
doppler secrets get OMNIROUTE_API_KEY --project serpent --config prd

# Если нет — добавить:
doppler secrets set OMNIROUTE_API_KEY="sk-omni-..." --project serpent --config prd

# Рабочий URL (Cloud Run):
export OMNIROUTE_URL="https://omniroute-160140204348.europe-west3.run.app"
# или локальный (если запущен Docker):
export OMNIROUTE_URL="http://localhost:20128"
```

### Проверка работы

```bash
curl -s \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  "$OMNIROUTE_URL/v1/models" | jq '.data[].id' | head -20
```

### Переключение режимов

```bash
./scripts/serpent-router.sh omni       # форс OmniRoute
./scripts/serpent-router.sh cascade    # водопад (рекомендуется)
./scripts/serpent-router.sh status     # здоровье всех
```

### Использование API (прямой запрос)

```python
import openai

client = openai.OpenAI(
    base_url="http://localhost:20128/v1",
    api_key=os.environ["OMNIROUTE_API_KEY"]
)

# Через OmniRoute можно вызвать любой модель:
response = client.chat.completions.create(
    model="qwen/qwen3-235b-a22b-fp8",   # или любой из 179+
    messages=[{"role": "user", "content": "Write SCENE_06"}]
)
```

### Топ-модели через OmniRoute (бесплатно)

| Модель        | ID                                     | Использование                |
| ------------- | -------------------------------------- | ---------------------------- |
| Kimi K2.6     | `openrouter/moonshotai/kimi-k2.6:free` | код, логика                  |
| Qwen3-235B    | `qwen/qwen3-235b-a22b-fp8`             | мультилинг, длинный контекст |
| DeepSeek V4   | `deepseek/deepseek-v4-flash-free`      | код, reasoning               |
| GPT-OSS 120B  | `openrouter/openai/gpt-oss-120b:free`  | общие задачи                 |
| Gemini Flash  | `google/gemini-2.5-flash:free`         | ресёрч                       |
| Llama 3.3 70B | `meta-llama/llama-3.3-70b:free`        | оффлайн фоллбек              |

---

## 2. TokenSaver (:4000) — Claude Proxy

### Что это

LiteLLM-совместимый прокси из `huivrotiki/token-saver`, перенаправляющий `claude-*` запросы через бесплатные провайдеры (экономия 95-98%).

### Установка

```bash
# Клон репо (1 раз)
cd ~ && git clone https://github.com/huivrotiki/token-saver.git
cd token-saver && pip install -r requirements.txt
```

### Запуск

```bash
# Запуск прокси (фоном)
python3 ~/token-saver/tokensaver.py --server &

# Проверка
curl http://localhost:4000/health

# Перенаправить Claude Code через TokenSaver
export ANTHROPIC_BASE_URL=http://localhost:4000
```

### Использование API

```python
import anthropic

client = anthropic.Anthropic(
    base_url="http://localhost:4000",   # ← TokenSaver proxy
    api_key="dummy"                      # ключ не нужен
)

response = client.messages.create(
    model="claude-opus-4-8",
    max_tokens=4096,
    messages=[{"role": "user", "content": "Plan SCENE_06"}]
)
```

### Роутинг иннутри TokenSaver

```
routine tasks  →  NVIDIA NIM llama-3.1-8b (FREE)
complex tasks  →  Gemini 2.5 Pro / claude-sonnet-4-5 (с кэшем Redis L2)
claude-opus-*  →  Antigravity OAuth :8045 (отдельная квота)
```

---

## 3. Antigravity Tools (:8045) — Claude OAuth

### Что это

Antigravity IDE даёт **отдельную квоту Claude** через OAuth без Anthropic ключа. Ротация 3+ аккаунтов, прокси `http://127.0.0.1:8045/v1`.

### Установка

```bash
# 1. Скачай Antigravity IDE: https://antigravity.tools
# 2. Settings → API Proxy → Start Local Proxy → Port 8045
# 3. Settings → Accounts → Add ≥ 3 Google аккаунта
# 4. Скопируй API Key

doppler secrets set \
  ANTIGRAVITY_API_KEY="sk-7c0ce1..." \
  ANTIGRAVITY_BASE_URL="http://127.0.0.1:8045/v1" \
  --project serpent --config prd
```

### Проверка

```bash
curl -s \
  -H "Authorization: Bearer $ANTIGRAVITY_API_KEY" \
  http://127.0.0.1:8045/v1/models | jq '.data[].id'
```

### Использование API

```python
import openai

client = openai.OpenAI(
    base_url="http://127.0.0.1:8045/v1",
    api_key=os.environ["ANTIGRAVITY_API_KEY"]
)

response = client.chat.completions.create(
    model="claude-opus-4-6",       # или claude-sonnet-4-6
    messages=[{"role": "user", "content": "Plan SCENE_06"}]
)
```

### Авто-маппинг моделей (Custom Mappings)

```
gemini-2.5-flash    → claude-sonnet-4-6   (основной)
gemini-2.5-pro      → claude-opus-4-6     (сложные задачи)
gemini-3-flash      → gpt-oss-120b-medium  (параллельная работа)
Фоновые CLI    → gemini-2.5-flash     (по умолчанию)
```

### Переключение режима

```bash
./scripts/serpent-router.sh antigravity
# или
./scripts/serpent-router.sh anti
```

---

## 4. Qwen и Alibaba DashScope

### Что доступно

| Модель            | Назначение                 | Контекст             |
| ----------------- | -------------------------- | -------------------- |
| Qwen3-235B-A22B   | мультилинг, планирование   | 1M токенов           |
| Qwen3-32B         | быстрый код                | 128K                 |
| Qwen2.5-Coder-32B | кодогенерация              | 128K                 |
| Wan2.1-T2V        | видео T2V (ключ DashScope) | видео 5-10с          |
| Wan2.1-I2V        | видео image-to-video       | видео из изображения |

### Секрет Doppler

```bash
doppler secrets set \
  DASHSCOPE_API_KEY="sk-..." \
  --project serpent --config prd

# Проверка:
curl -s https://dashscope.aliyuncs.com/compatible-mode/v1/models \
  -H "Authorization: Bearer $DASHSCOPE_API_KEY" | jq '.data[].id' | grep -i qwen
```

### Qwen через OmniRoute (OpenAI-compatible, без ключа DashScope)

```bash
# Через OmniRoute — Qwen уже настроен:
curl -s http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "qwen/qwen3-235b-a22b-fp8",
    "messages": [{"role": "user", "content": "Write SCENE_06 prompt"}]
  }' | jq '.choices[0].message.content'
```

### Wan2.1 видео через DashScope API

```python
# packages/video-pipeline/wan_client.py
import os, requests, time

API_KEY = os.environ["DASHSCOPE_API_KEY"]
BASE_URL = "https://dashscope.aliyuncs.com/api/v1/services/aigc/video-generation"

def wan_t2v(prompt: str, duration: int = 5) -> str:
    """Text-to-Video через Wan2.1. Возвращает URL видео."""
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
        "X-DashScope-Async": "enable"
    }
    payload = {
        "model": "wanx2.1-t2v-turbo",  # или wanx2.1-t2v-plus
        "input": {"prompt": prompt},
        "parameters": {"size": "1280*720", "duration": duration}
    }
    # Запуск async-задачи
    r = requests.post(f"{BASE_URL}/video-synthesis", json=payload, headers=headers)
    task_id = r.json()["output"]["task_id"]

    # Поллинг результата
    while True:
        time.sleep(10)
        result = requests.get(
            f"{BASE_URL}/fetch?task_id={task_id}",
            headers={"Authorization": f"Bearer {API_KEY}"}
        ).json()
        status = result["output"]["task_status"]
        if status == "SUCCEEDED":
            return result["output"]["video_url"]
        elif status == "FAILED":
            raise Exception(f"Wan2.1 failed: {result}")


def wan_i2v(image_url: str, prompt: str) -> str:
    """Image-to-Video через Wan2.1."""
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
        "X-DashScope-Async": "enable"
    }
    payload = {
        "model": "wanx2.1-i2v-turbo",
        "input": {"image_url": image_url, "prompt": prompt},
        "parameters": {"size": "1280*720", "duration": 5}
    }
    r = requests.post(f"{BASE_URL}/video-synthesis", json=payload, headers=headers)
    task_id = r.json()["output"]["task_id"]
    while True:
        time.sleep(10)
        result = requests.get(
            f"{BASE_URL}/fetch?task_id={task_id}",
            headers={"Authorization": f"Bearer {API_KEY}"}
        ).json()
        if result["output"]["task_status"] == "SUCCEEDED":
            return result["output"]["video_url"]
```

### Qwen Text через DashScope (OpenAI-compatible mode)

```python
import openai, os

client = openai.OpenAI(
    api_key=os.environ["DASHSCOPE_API_KEY"],
    base_url="https://dashscope.aliyuncs.com/compatible-mode/v1"
)

response = client.chat.completions.create(
    model="qwen3-235b-a22b",  # или qwen3-32b, qwen2.5-coder-32b
    messages=[
        {"role": "system", "content": "You are a cinematic prompt writer."},
        {"role": "user", "content": "Write a Kling prompt for SCENE_06"}
    ],
    stream=False
)
print(response.choices[0].message.content)
```

---

## 5. Сводная таблица: когда что использовать

| Задача             | Прокси / Модель                  | Причина                |
| ------------------ | -------------------------------- | ---------------------- |
| Архитектура / план | TokenSaver :4000 → Claude Opus   | лучшее качество        |
| Код / PR           | OmniRoute → Kimi K2.6 / Qwen3    | бесплатно              |
| Ресёрч             | OmniRoute → Gemini Flash / Qwen3 | 1M+ context            |
| Claude вычерпан    | Antigravity :8045                | отдельная квота        |
| Видео T2V          | Wan2.1 DashScope                 | специализированный API |
| Видео I2V          | Kling / Wan2.1 / Flow            | выбор по типу          |
| Локально фоном     | Ollama qwen2.5:7b                | zero cost              |
| Ночь / offline     | Ollama llama3.2:3b               | zero cost              |

---

## 6. Полная проверка всех прокси

```bash
bash scripts/check-proxies.sh
# или
./scripts/serpent-router.sh status
```

## 7. Secrets Doppler — полный список

```bash
doppler secrets set \
  OMNIROUTE_API_KEY="sk-omni-..." \
  ANTIGRAVITY_API_KEY="sk-7c0ce1..." \
  ANTIGRAVITY_BASE_URL="http://127.0.0.1:8045/v1" \
  DASHSCOPE_API_KEY="sk-..." \
  WAN2_API_KEY="sk-..." \
  OPENROUTER_API_KEY="sk-or-..." \
  TELEGRAM_BOT_TOKEN="..." \
  TELEGRAM_CHAT_ID="..." \
  KLING_KEY_1="..." \
  KLING_KEY_2="..." \
  KLING_KEY_3="..." \
  FLOW_GOOGLE_COOKIES="__Secure-1PSID=..." \
  --project serpent --config prd
```

---

_Last updated: 2026-07-14 | Skills: serpent-master-orchestration | AGENTS.md §6.1_
