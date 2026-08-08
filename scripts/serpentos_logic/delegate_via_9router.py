#!/usr/bin/env python3
"""
🌐 9Router Proxy Delegation & Multi-Agent Orchestrator
Routes specialized subagent tasks (Planning, Coding, Reviewing, Fast-Check)
through the unified 9Router endpoint (http://localhost:20128/v1).
"""

import argparse
import json
import os
import sys
import urllib.request

ROUTER_URL = os.environ.get("ROUTER_ENDPOINT", "http://localhost:20128/v1")
ROUTER_API_KEY = os.environ.get("ROUTER_API_KEY", "sk-523ef2ad1a864503-ztw5q3-ade7c58a")
CHAT_ENDPOINT = f"{ROUTER_URL}/chat/completions"

ROLE_TO_MODEL = {
    "planning": "free-reasoning",
    "coding": "free-coder",
    "reviewing": "free-agent",
    "fast": "fast-small",
    "default": "free-agent"
}


def delegate_task(role: str, prompt: str, system_prompt: str = "") -> dict:
    model = ROLE_TO_MODEL.get(role.lower(), ROLE_TO_MODEL["default"])
    messages = []
    if system_prompt:
        messages.append({"role": "system", "content": system_prompt})
    messages.append({"role": "user", "content": prompt})

    payload = {
        "model": model,
        "messages": messages,
        "temperature": 0.3,
        "stream": False
    }

    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {ROUTER_API_KEY}"
    }

    req = urllib.request.Request(
        CHAT_ENDPOINT,
        data=json.dumps(payload).encode("utf-8"),
        headers=headers
    )

    try:
        with urllib.request.urlopen(req, timeout=45) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            content = data["choices"][0]["message"]["content"]
            return {
                "status": "success",
                "role": role,
                "model": model,
                "response": content
            }
    except Exception as e:
        return {
            "status": "error",
            "role": role,
            "model": model,
            "error": str(e)
        }


def main():
    parser = argparse.ArgumentParser(description="9Router Proxy Delegation Client")
    parser.add_argument("--role", choices=["planning", "coding", "reviewing", "fast"], default="planning",
                        help="Subagent role for delegation")
    parser.add_argument("--prompt", type=str, required=True, help="Task prompt for the delegate model")
    parser.add_argument("--system", type=str, default="", help="Optional system instruction")
    args = parser.parse_args()

    print(f"📡 Delegating task to 9Router [{args.role.upper()} -> {ROLE_TO_MODEL.get(args.role)}]...")
    result = delegate_task(args.role, args.prompt, system_prompt=args.system)

    print("\n" + "=" * 60)
    if result["status"] == "success":
        print(f"✅ Delegation Result ({result['model']}):")
        print(result["response"])
    else:
        print(f"❌ Delegation Failed ({result['model']}): {result['error']}", file=sys.stderr)
    print("=" * 60)


if __name__ == "__main__":
    main()
