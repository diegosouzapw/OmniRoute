#!/usr/bin/env python3
"""
Antigravity Tools Automatic Provider Switcher -> Google Cloud Vertex AI
Configures Antigravity tools, subagents, and LLM routes to use Google Cloud Vertex AI
(project-f91a723f-af1b-4dd2-ba3, europe-west3) as the primary upstream provider.
"""

import os
import json
from pathlib import Path
from datetime import datetime, timezone

REPO_ROOT = Path(__file__).resolve().parent.parent
STATE_DIR = REPO_ROOT / ".state"
STATE_DIR.mkdir(parents=True, exist_ok=True)

ANTIGRAVITY_CONFIG_DIR = Path("/Users/work/.gemini/antigravity-cli")
ANTIGRAVITY_CONFIG_DIR.mkdir(parents=True, exist_ok=True)

CANONICAL_PROJECT_ID = "project-f91a723f-af1b-4dd2-ba3"
CANONICAL_REGION = "europe-west3"

VERTEX_PROVIDER_CONFIG = {
    "provider_name": "Google Cloud Vertex AI Primary Provider",
    "status": "ACTIVE_PRIMARY",
    "activated_at": datetime.now(timezone.utc).isoformat(),
    "gcloud_auth": {
        "auth_type": "ADC (Application Default Credentials)",
        "project_id": CANONICAL_PROJECT_ID,
        "region": CANONICAL_REGION,
        "api_endpoint": f"{CANONICAL_REGION}-aiplatform.googleapis.com"
    },
    "env_overrides": {
        "GOOGLE_CLOUD_PROJECT": CANONICAL_PROJECT_ID,
        "GCLOUD_PROJECT": CANONICAL_PROJECT_ID,
        "VERTEX_AI_PROJECT": CANONICAL_PROJECT_ID,
        "VERTEX_AI_LOCATION": CANONICAL_REGION,
        "CLOUD_ML_REGION": CANONICAL_REGION,
        "CLAUDE_CODE_USE_VERTEX": "1",
        "ANTHROPIC_VERTEX_PROJECT_ID": CANONICAL_PROJECT_ID
    },
    "model_routing_table": {
        "default_fast": "projects/project-f91a723f-af1b-4dd2-ba3/locations/europe-west3/publishers/google/models/gemini-2.5-flash",
        "default_reasoning": "projects/project-f91a723f-af1b-4dd2-ba3/locations/europe-west3/publishers/google/models/gemini-2.5-pro",
        "video_generation": "projects/project-f91a723f-af1b-4dd2-ba3/locations/europe-west3/publishers/google/models/veo-3.1-generate-001",
        "image_generation": "projects/project-f91a723f-af1b-4dd2-ba3/locations/europe-west3/publishers/google/models/imagen-3.0-generate-002",
        "fallback_lane": "http://localhost:4000 (TokenSaver L2 Gateway)"
    },
    "subagent_mesh_integration": {
        "auto_switch_enabled": True,
        "subbots_use_vertex": True,
        "verification_loop": "7x_ralph_loop_enabled"
    }
}

def switch_to_vertex():
    print("==============================================================================")
    print("🌐 SWITCHING ANTIGRAVITY TOOLS TO GOOGLE CLOUD VERTEX AI PROVIDER")
    print("==============================================================================")
    print(f"  • Target Project ID : {CANONICAL_PROJECT_ID}")
    print(f"  • Target Region     : {CANONICAL_REGION}")
    print(f"  • ADC Auth Mode     : ACTIVE")
    print("==============================================================================\n")

    # 1. Save config to project state
    state_file = STATE_DIR / "antigravity_vertex_provider.json"
    with open(state_file, "w", encoding="utf-8") as f:
        json.dump(VERTEX_PROVIDER_CONFIG, f, indent=2, ensure_ascii=False)
    print(f"✅ Saved project Vertex Provider config: {state_file}")

    # 2. Save config to global Antigravity CLI config dir (~/.gemini/antigravity-cli/)
    global_file = ANTIGRAVITY_CONFIG_DIR / "vertex_primary_provider.json"
    with open(global_file, "w", encoding="utf-8") as f:
        json.dump(VERTEX_PROVIDER_CONFIG, f, indent=2, ensure_ascii=False)
    print(f"✅ Saved global Antigravity Vertex Provider config: {global_file}")

    # 3. Generate sourceable shell helper script scripts/use-vertex-provider.sh
    shell_script = REPO_ROOT / "scripts" / "use-vertex-provider.sh"
    with open(shell_script, "w", encoding="utf-8") as f:
        f.write("#!/usr/bin/env bash\n")
        f.write("# Source this script to instantly point Antigravity / Claude / OpenCode to Google Cloud Vertex AI\n")
        for k, v in VERTEX_PROVIDER_CONFIG["env_overrides"].items():
            f.write(f"export {k}=\"{v}\"\n")
        f.write("echo \"✅ Antigravity environment switched to Google Cloud Vertex AI ($GOOGLE_CLOUD_PROJECT @ $CLOUD_ML_REGION)\"\n")
    os.chmod(shell_script, 0o755)
    print(f"✅ Created shell environment switcher: {shell_script}")

    # 4. Generate report markdown
    report_file = REPO_ROOT / "output" / "mesh" / "ANTIGRAVITY_VERTEX_PROVIDER_SWITCH_REPORT.md"
    report_file.parent.mkdir(parents=True, exist_ok=True)
    with open(report_file, "w", encoding="utf-8") as f:
        f.write("# 🌐 Отчет о переключении Antigravity Tools на Google Cloud Vertex AI\n\n")
        f.write(f"**Дата:** `{datetime.now(timezone.utc).isoformat()}`  \n")
        f.write(f"**Провайдер:** `Google Cloud Vertex AI Primary Provider`  \n")
        f.write(f"**Проект GCP:** `{CANONICAL_PROJECT_ID}`  \n")
        f.write(f"**Регион:** `{CANONICAL_REGION}`  \n\n")
        f.write("## 1. Таблица маршрутизации моделей (Model Routing Table)\n\n")
        f.write("| Назначение | Модель Vertex AI / Эндпоинт |\n")
        f.write("|---|---|\n")
        f.write(f"| **Быстрый анализ / Рутина** | `gemini-2.5-flash` (`{CANONICAL_REGION}`) |\n")
        f.write(f"| **Архитектура / Рассуждения** | `gemini-2.5-pro` (`{CANONICAL_REGION}`) |\n")
        f.write(f"| **Генерация видео 1080p 24fps** | `veo-3.1-generate-001` (`{CANONICAL_REGION}`) |\n")
        f.write(f"| **Генерация статики / Сториборд** | `imagen-3.0-generate-002` (`{CANONICAL_REGION}`) |\n")
        f.write(f"| **Резервный шлюз (L2 Gateway)** | `http://localhost:4000` (TokenSaver) |\n\n")
        f.write("## 2. Активированные переменные окружения\n\n")
        f.write("```bash\n")
        for k, v in VERTEX_PROVIDER_CONFIG["env_overrides"].items():
            f.write(f"export {k}=\"{v}\"\n")
        f.write("```\n")

    print(f"✅ Generated Markdown report: {report_file}")
    print("\n🎉 Antigravity Tools successfully configured to use Google Cloud Vertex AI as Primary Provider!")

if __name__ == "__main__":
    switch_to_vertex()
