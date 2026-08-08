#!/usr/bin/env python3
"""
Gemini Context Cache Manager — Serpent OS
Кэширует AGENTS.md + GEMINI.md + OS-NOTES.md через бесплатный Gemini API
Экономит токены при повторных обращениях к большим файлам.

Usage: doppler run --project serpent --config prd -- python3 scripts/gemini-cache-refresh.py
"""

import os, sys, json, time, hashlib, ssl
from pathlib import Path
from datetime import datetime, timezone

# Fix SSL certs on macOS Python 3.14
try:
    import certifi
    os.environ['SSL_CERT_FILE'] = certifi.where()
    os.environ['REQUESTS_CA_BUNDLE'] = certifi.where()
except ImportError:
    pass

REPO_ROOT = Path(__file__).parent.parent
STATE_FILE = REPO_ROOT / ".state" / "gemini-cache.json"

# Файлы для кэширования (приоритет = самые часто читаемые)
CACHE_FILES = [
    "AGENTS.md",
    "GEMINI.md", 
    "CLAUDE.md",
    "OS-NOTES.md",
    "AI-NOTES.md",
    "WORKFLOW.md",
    "OPERATIONS.md",
]

def load_state():
    if STATE_FILE.exists():
        try:
            return json.loads(STATE_FILE.read_text())
        except:
            pass
    return {}

def save_state(state):
    STATE_FILE.parent.mkdir(parents=True, exist_ok=True)
    STATE_FILE.write_text(json.dumps(state, indent=2))

def compute_hash(content: str) -> str:
    return hashlib.sha256(content.encode()).hexdigest()[:16]

def create_gemini_cache(content: str, display_name: str, api_key: str, model: str = "gemini-2.0-flash") -> dict | None:
    """Create context cache via Gemini API"""
    try:
        import urllib.request
        import urllib.error
        
        url = f"https://generativelanguage.googleapis.com/v1beta/cachedContents?key={api_key}"
        
        payload = {
            "model": f"models/{model}",
            "displayName": display_name,
            "contents": [{
                "role": "user",
                "parts": [{"text": content}]
            }],
            "ttl": "7200s"  # 2 hours cache
        }
        
        data = json.dumps(payload).encode()
        req = urllib.request.Request(url, data=data, headers={"Content-Type": "application/json"}, method="POST")
        
        with urllib.request.urlopen(req, timeout=30) as resp:
            return json.loads(resp.read())
    except Exception as e:
        print(f"   ⚠️  Cache API error: {e}")
        return None

def main():
    print("🔮 Gemini Context Cache Manager — Serpent OS")
    print(f"   Time: {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M UTC')}")
    
    api_key = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_AI_KEY")
    if not api_key:
        print("   ⚠️  No GEMINI_API_KEY in env — using Vertex AI ADC mode (no explicit cache)")
        print("   ℹ️  Content will be included inline in each request (no cache savings)")
        print()
        print("   📋 Files that SHOULD be cached (for context):")
        total_size = 0
        for fname in CACHE_FILES:
            fp = REPO_ROOT / fname
            if fp.exists():
                sz = fp.stat().st_size
                total_size += sz
                print(f"      {fname}: {sz//1024}KB")
        print(f"   Total: {total_size//1024}KB across {len(CACHE_FILES)} files")
        print()
        print("   💡 To enable caching: set GEMINI_API_KEY in Doppler serpent/prd")
        print("      Or use Vertex AI with context caching enabled for the project")
        return

    state = load_state()
    cached = 0
    skipped = 0
    
    print()
    for fname in CACHE_FILES:
        fp = REPO_ROOT / fname
        if not fp.exists():
            print(f"   ⚠️  {fname}: not found")
            continue
        
        content = fp.read_text(encoding="utf-8", errors="ignore")
        content_hash = compute_hash(content)
        
        cached_entry = state.get(fname, {})
        if cached_entry.get("hash") == content_hash:
            cache_name = cached_entry.get("cache_name", "N/A")
            print(f"   ✅ {fname}: cached (unchanged) [{cache_name[:30]}...]")
            skipped += 1
            continue
        
        print(f"   🔄 {fname}: caching {len(content)//1024}KB...")
        
        result = create_gemini_cache(content, f"serpentos/{fname}", api_key)
        
        if result:
            cache_name = result.get("name", "N/A")
            state[fname] = {
                "hash": content_hash,
                "cache_name": cache_name,
                "cached_at": datetime.now(timezone.utc).isoformat(),
                "size_bytes": len(content),
                "expire_time": result.get("expireTime", "")
            }
            save_state(state)
            print(f"   ✅ {fname}: cached as {cache_name}")
            cached += 1
            time.sleep(0.5)  # avoid rate limit
        else:
            print(f"   ❌ {fname}: cache failed")
    
    print()
    print(f"   Cached: {cached} | Skipped (unchanged): {skipped}")
    print(f"   State saved: {STATE_FILE}")
    print()
    print("💡 Usage in agents:")
    print(f"   State file: {STATE_FILE}")
    print("   Gemini SDK: use cached_content=cache_name in generate_content()")

if __name__ == "__main__":
    main()
