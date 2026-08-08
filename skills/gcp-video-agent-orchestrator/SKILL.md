---
name: GcpVideoAgentOrchestrator
description: Orchestrates Full HD cinematic 25 fps video generation via Google Veo 3.1 (Vertex AI us-central1). Uses google.genai SDK for pure Text-to-Video generation without static freeze-frame conditioning. Assembles clips via FFmpeg and exports DaVinci Resolve FCPXML timelines.
version: "2.0"
author: huivrotiki/serpentos
tags: [gcp, veo3, vertex-ai, text-to-video, cinematic, 25fps, ffmpeg, fcpxml]
---

# GCP Video Agent Orchestrator (Clean Text-to-Video 25 fps & Cinema-OS MCP)

Orchestrates professional cinematic video production using Google Cloud Vertex AI (**Veo 3.1**) in strict **Text-to-Video** mode at **25 fps continuous motion**, integrated with the unified MCP stack (`github-mcp`, `gcp-video-mcp`, `davinci-mcp`, `memory-mcp`).

---

## 🎬 Основной системный промт (Cinema-OS Agent Prompt)

> Ты — автономный профессиональный видео-агент уровня кино-продакшена.  
> Твоя архитектура строится на MCP-серверах и инструментах:
> - `github-mcp` — управление репозиториями, сценариями, пайплайнами рендера, версионирование шоурилов.  
> - `gcp-video-mcp` — генерация видео через Veo (Vertex AI / Google GenAI) строго в режиме **text-to-video** (без image-conditioning), с поддержкой 25 fps, динамики камеры и света.  
> - `davinci-mcp` — импорт клипов, сборка таймлайнов, рендер финальных версий, экспорт XML/DRP проектов.  
> - `memory-mcp` — долговременная память о проектах, референсах, предпочтениях стиля и технических настройках.  
> 
> Задачи:
> - При каждом запросе пользователя сначала синхронизируйся с `memory-mcp`: прочитай контекст по проекту, референсы и прошлые версии шоурила.  
> - Проверяй конфигурацию `.mcp.json` и состояние всех MCP-серверов: при ошибке авторизации или health-чеке — explicitly сообщи и предложи шаги фикса.  
> - Для генерации видео:
>   - Формируй структурированный текстовый промт (блоки: `STYLE`, `MOTION`, `LIGHTING`, `COLOR`, `TECH`) и вызывай только `gcp-video-mcp.generate_veo_clip(...)`.  
>   - Жёстко соблюдай: **никаких статичных кадров**, **никаких freeze-frames**, видео не менее 25 кадров в секунду, каждую секунду должен быть визуальный motion (движение объектов, камеры или света).  
> - После генерации клипов:
>   - Отправляй их в `davinci-mcp` для сборки таймлайна и финального монтажа.  
>   - Коммить готовые сценарии и метаданные пайплайна в `github-mcp` (отдельная ветка `showreel-auto/<project>`).  
>   - Обновляй `memory-mcp` записями о проекте: какие референсы использованы, какие настройки fps/стиля дали лучший результат.  
> 
> Всегда действуй как главный режиссёр-системный архитектор: минимизируй ручные шаги, опирайся на MCP-tools и обеспечивай воспроизводимый пайплайн кино-качества для шоурилов.

---

## 1. Technical Specification & Rules

- **Strict Text-to-Video**: Do not pass `image` or storyboard reference frames to `GenerateVideosConfig`.
- **Frame Rate**: Strictly **25 fps** for PAL/European broadcast and smooth motion picture standard.
- **Resolution**: 1080p Full HD (`16:9`).
- **QA Verification**: Automated `ffprobe` stream validation before assembling clips.
- **MCP Execution Chain**: `text prompt → gcp-video-mcp → github-mcp → davinci-mcp → memory-mcp`.

---

## 2. Production Python Code (google.genai SDK)

```python
import os
import time
import json
import subprocess
from pathlib import Path
from google import genai
from google.genai import types

PROJECT_ID = os.getenv("GOOGLE_CLOUD_PROJECT", "project-f91a723f-af1b-4dd2-ba3")
LOCATION = os.getenv("GOOGLE_CLOUD_LOCATION", "us-central1")
MODEL = "veo-3.1-generate-001"
FPS = 25

client = genai.Client(vertexai=True, project=PROJECT_ID, location=LOCATION)

def generate_cinematic_clip(shot_id: str, prompt: str, duration: int = 8) -> Path:
    output_path = Path(f"./output/shots/{shot_id}.mp4")
    output_path.parent.mkdir(parents=True, exist_ok=True)
    
    full_prompt = (
        f"Cinematic master shot, professional 35mm motion picture film quality, "
        f"continuous camera movement, dynamic lighting. {prompt} "
        f"Exactly 25 fps temporal consistency. NO static freeze frames."
    )
    
    config = types.GenerateVideosConfig(
        aspect_ratio="16:9",
        resolution="1080p",
        duration_seconds=duration,
        generate_audio=False,
        negative_prompt="blurry, static, freeze frame, watermark, text",
        number_of_videos=1,
    )
    
    operation = client.models.generate_videos(
        model=MODEL,
        prompt=full_prompt,
        config=config,
    )
    
    while not operation.done:
        time.sleep(15)
        operation = client.operations.get(operation)
        
    if operation.response and operation.response.generated_videos:
        video_obj = operation.response.generated_videos[0]
        video_obj.video.save(str(output_path))
        return output_path
    raise RuntimeError(f"Failed to generate {shot_id}")
```

---

## 3. CLI Execution (Autonomous Cinematic Agent)

Run the fully autonomous agent script with Ralph Loop (R→A→L→P→H) and automated QA:

```bash
# Dry run verification
python3 packages/video-pipeline/scripts/autonomous_cinematic_agent.py --dry-run

# Production run (Full HD 25 fps)
python3 packages/video-pipeline/scripts/autonomous_cinematic_agent.py --output-dir ./output/showreel
```

---

## 4. Definition of Done (DoD)

- [ ] All clips generated in `output/shots/*.mp4` at **1080p / 25 fps**.
- [ ] Visual verification confirms continuous camera movement with **zero static freeze frames**.
- [ ] Master showreel stitched via FFmpeg (`master_cinematic_showreel.mp4`).
- [ ] DaVinci Resolve FCPXML timeline exported (`master_cinematic_timeline.fcpxml`).
