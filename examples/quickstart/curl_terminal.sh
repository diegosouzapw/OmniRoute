#!/usr/bin/env bash
# OmniRoute Quickstart — cURL (Bash / Terminal)
# ==============================================
# Run:  chmod +x curl_terminal.sh && ./curl_terminal.sh
# Requires: curl (pre-installed on Mac/Linux; use Git Bash on Windows)

# Your local OmniRoute server — started with: npx omniroute
API_URL="http://localhost:20128/v1/chat/completions"

curl "$API_URL" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer dummy-key" \
  -d '{
    "model": "auto",
    "stream": false,
    "messages": [
      { "role": "user", "content": "Hello! What can you do?" }
    ]
  }' | python3 -c "import sys,json; print(json.load(sys.stdin)['choices'][0]['message']['content'])"
