import urllib.request
import json
import time

MODELS = [
    "gpt-4o-mini",
    "claude-3-5-haiku-latest",
    "gemini-2.5-flash",
    "llama-3.3-70b-versatile",
    "qwen-max",
    "deepseek-chat",
    "mistral-large-latest",
    "god-mode"
]

url = "http://localhost:20128/v1/chat/completions"

working_models = []
failed_models = []

print("Starting model health check against OmniRoute...\n")

for model in MODELS:
    print(f"Testing {model}...", end=" ", flush=True)
    
    data = json.dumps({
        "model": model,
        "messages": [{"role": "user", "content": "Reply exactly with 'pong'."}],
        "max_tokens": 10
    }).encode('utf-8')
    
    req = urllib.request.Request(url, data=data, headers={"Content-Type": "application/json"})
    
    try:
        start_time = time.time()
        with urllib.request.urlopen(req, timeout=15) as response:
            res_body = response.read()
            res_json = json.loads(res_body)
            content = res_json.get("choices", [{}])[0].get("message", {}).get("content", "").strip()
            elapsed = time.time() - start_time
            print(f"✅ OK ({elapsed:.2f}s) -> '{content}'")
            working_models.append(model)
    except Exception as e:
        print(f"❌ FAILED: {e}")
        failed_models.append(model)

print("\n--- RESULTS ---")
print(f"Working ({len(working_models)}): {', '.join(working_models)}")
print(f"Failed ({len(failed_models)}): {', '.join(failed_models)}")
