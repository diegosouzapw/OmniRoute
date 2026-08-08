#!/usr/bin/env python3
"""
🌐 GEMINI ENTERPRISE AGENT PLATFORM - INTERACTIVE PLAYGROUND SERVER
Serves an ultra-modern Web UI on http://localhost:8088 supporting:
1. Live Model & Infrastructure Status (Vertex AI ADC, 9Router Proxy :20128, TokenSaver :4000)
2. Director's Veo 3 / Gemini Prompt Studio with Anti-Hallucination & Consistency Locks
3. 9Router 3-Stage Multi-Agent Orchestration Sandbox
4. SATC Reference vs. 777Ladies Title Sequence Comparison Player
"""

import http.server
import json
import os
import socketserver
import urllib.request
from pathlib import Path

PORT = int(os.environ.get("PLAYGROUND_PORT", "8088"))
ROOT_DIR = Path(__file__).resolve().parent.parent
PLAYGROUND_DIR = ROOT_DIR / "packages" / "agent-platform-playground"
PLAYGROUND_DIR.mkdir(parents=True, exist_ok=True)


def check_port(host="localhost", port=8088, timeout=1.0):
    import socket
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.settimeout(timeout)
        return s.connect_ex((host, port)) == 0


class PlaygroundHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(PLAYGROUND_DIR), **kwargs)

    def do_GET(self):
        if self.path == "/api/status":
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()

            ts_ok = check_port("localhost", 4000)
            router_ok = check_port("localhost", 20128)

            status = {
                "project_id": "project-f91a723f-af1b-4dd2-ba3",
                "region": "europe-west3",
                "adc_mode": "Vertex AI ADC (CLAUDE_CODE_USE_VERTEX=1)",
                "tokensaver_active": ts_ok,
                "nine_router_active": router_ok,
                "models_available": [
                    {"id": "veo-3.1-fast-generate-001", "tier": "Vertex AI / Agent Platform"},
                    {"id": "gemini-3.1-pro-preview", "tier": "9Router / Vertex"},
                    {"id": "free-reasoning", "tier": "9Router Planning"},
                    {"id": "free-coder", "tier": "9Router Coding"},
                    {"id": "free-agent", "tier": "9Router Reviewing"}
                ]
            }
            self.wfile.write(json.dumps(status).encode("utf-8"))
            return

        elif self.path == "/api/presets":
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()

            presets = [
                {
                    "title": "SATC 1998 HBO Opening Hero Shot (Scene 01)",
                    "prompt": "[ANTI-TEXT] No titles, no overlays, no letters. [CHARACTER LOCK] Late 30s iconic Manhattan fashion columnist, blonde hair with platinum highlights, pink bubblegum tank top, white tulle tutu skirt. [CINEMATOGRAPHY] 35mm Kodak Vision3 500T grain, soft golden hour rim light, 24fps smooth slow dolly back on Fifth Avenue.",
                    "seed": 42001,
                    "model": "veo-3.1-fast-generate-001"
                },
                {
                    "title": "777Ladies Casino Neon Glamour B-Roll",
                    "prompt": "[ANTI-TEXT] No text, clean cinematic shot. [SETTING] Luxurious velvet casino lounge, gleaming gold chandelier reflections, emerald felt roulette table in soft out-of-focus background. [CINEMATOGRAPHY] 35mm anamorphic lens flare, slow tracking push-in at 24fps.",
                    "seed": 77701,
                    "model": "veo-3.1-fast-generate-001"
                }
            ]
            self.wfile.write(json.dumps(presets).encode("utf-8"))
            return

        super().do_GET()

    def do_POST(self):
        content_len = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(content_len).decode("utf-8")
        data = json.loads(body) if body else {}

        if self.path == "/api/orchestrate":
            from delegate_via_9router import delegate_task
            task_desc = data.get("task", "Verify Veo 3 video generation parameters")

            # Execute fast single or 3-stage proxy orchestration
            res = delegate_task(
                role=data.get("role", "planning"),
                prompt=task_desc,
                system_prompt="You are an expert AI Architect on Google Agent Platform. Provide actionable, concise engineering recommendations."
            )

            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps(res).encode("utf-8"))
            return

        self.send_response(404)
        self.end_headers()


def run():
    print("======================================================================")
    print("🌐 GEMINI ENTERPRISE AGENT PLATFORM - INTERACTIVE PLAYGROUND")
    print("======================================================================")
    print(f"🚀 Serving Web UI & API on: http://localhost:{PORT}/")
    print(f"📁 Static Assets Directory: {PLAYGROUND_DIR}")
    print("======================================================================")

    with socketserver.TCPServer(("0.0.0.0", PORT), PlaygroundHandler) as httpd:
        httpd.allow_reuse_address = True
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down playground server...")


if __name__ == "__main__":
    run()
