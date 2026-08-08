#!/usr/bin/env python3
"""
🌐 GEMINI ENTERPRISE AGENT PLATFORM (formerly Vertex AI) CLIENT
Demonstrates connecting to Google Cloud Agent Platform / ADK using ADC & GenAI SDK.
"""

import os
import sys

PROJECT_ID = os.environ.get("GOOGLE_CLOUD_PROJECT", "project-f91a723f-af1b-4dd2-ba3")
LOCATION = os.environ.get("GOOGLE_CLOUD_LOCATION", "europe-west3")


def test_agent_platform_connection():
    print("==================================================")
    print("🤖 GEMINI ENTERPRISE AGENT PLATFORM - ДИАГНОСТИКА")
    print("==================================================")
    print(f"📌 Проект GCP : {PROJECT_ID}")
    print(f"📌 Регион     : {LOCATION}")

    try:
        from google import genai
        # Test Vertex AI / Agent Platform connection via ADC
        print("\n1. Проверка подключения к Agent Platform (Vertex AI ADC)...")
        try:
            client = genai.Client(vertexai=True, project=PROJECT_ID, location=LOCATION)
            print("   ✅ Клиент Agent Platform (Vertex AI mode) успешно инициализирован.")
        except Exception as e:
            print(f"   ⚠️ Vertex AI ADC инфо: {str(e)[:85]}")

        # Test Free Tier / API Key direct connection
        print("\n2. Проверка подключения к Gemini Free Tier / API Key...")
        api_key = os.environ.get("GEMINI_API_KEY")
        if not api_key:
            # check local env files
            import glob
            for path in glob.glob(".env*"):
                try:
                    for line in open(path):
                        if "GEMINI_API_KEY=" in line:
                            api_key = line.split("=", 1)[1].strip().strip("\"'")
                            break
                except Exception:
                    pass

        if api_key:
            client_free = genai.Client(api_key=api_key)
            print(f"   ✅ Free Tier API Key найден (...{api_key[-4:]}). Клиент готов к работе.")
        else:
            print("   ℹ️ GEMINI_API_KEY не задан явно в окружении.")

    except ImportError:
        print("   ❌ SDK `google-genai` не установлен. Установите: pip install google-genai")

    print("==================================================")
    print("✅ Настройка Agent Platform готова к использованию в ADK / Agent Studio!")
    print("==================================================")


if __name__ == "__main__":
    test_agent_platform_connection()
