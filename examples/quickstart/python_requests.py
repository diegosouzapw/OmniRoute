"""
OmniRoute Quickstart — Python (requests library)
================================================
Run:  pip install requests  (if not already installed)
      python python_requests.py
"""

import requests

# Your local OmniRoute server — started with: npx omniroute
API_URL = "http://localhost:20128/v1/chat/completions"

headers = {
    "Content-Type": "application/json",
    "Authorization": "Bearer dummy-key",  # Any string works for free/keyless providers
}

data = {
    "model": "auto",  # Zero-config routing, works out of the box — no sign-up needed
    "stream": False,
    "messages": [
        {"role": "user", "content": "Hello! What can you do?"}
    ],
}

response = requests.post(API_URL, headers=headers, json=data)
response.raise_for_status()
print(response.json()["choices"][0]["message"]["content"])

# Fresh install, zero credentials — `auto` already works:
# curl http://localhost:20128/v1/chat/completions \
#   -H "Content-Type: application/json" \
#   -d '{"model":"auto","messages":[{"role":"user","content":"Hello!"}]}'
