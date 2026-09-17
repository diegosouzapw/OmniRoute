#!/usr/bin/env python3
"""omni-swarm MCP server: dynamic specialist swarm over OmniRoute (v2).

CORE-aligned design (Hermes x OmniRoute constitution):
  - Hermes decides IF/WHEN (decomposition, waves, synthesis). This tool only
    executes: it never auto-delegates on its own.
  - Model selection follows OmniRoute evidence, never hardcoded preferences:
    per subtask it asks POST /v1/router/candidates (tiers + ranked pool) and
    takes primary, falling back to secondary, then to the local ledger.
  - Real workers (CORE §15): each subtask runs as a headless `hermes chat`
    worker with its own tools/files/workspace — NOT a bare API call.
  - Failure taxonomy (CORE §24): infra failures (rate limit, timeout,
    service unavailable) are recorded separately and never poison quality.
  - Outcome callback (CORE §17): every worker result is POSTed to
    /v1/router/outcomes so the fork's workflow memory learns.

Fair-use bounds (enforced, not advisory):
  MAX_PARALLEL = 4, MAX_SUBTASKS = 8, one attempt per slot, no refire loops.

Stdlib + mcp SDK only.
"""

from __future__ import annotations

import json
import os
import re
import shutil
import subprocess
import time
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

from mcp.server.mcpserver import MCPServer

OMNI_BASE = os.environ.get("OMNIROUTE_BASE_URL", "http://localhost:20128/v1")
HERMES_BIN = shutil.which("hermes") or os.path.expanduser("~/.local/bin/hermes")
HOME = Path.home()
LEDGER = HOME / ".hermes" / "omni-swarm" / "ledger.json"

MAX_PARALLEL = 4
MAX_SUBTASKS = 8
WORKER_TIMEOUT = 240

SKIP_PATTERNS = [
    r"image|flux|ideogram|recraft|seedream|wan2|krea|qwen-image|hidream|sungod",
    r"photon|zen-bear|lucid|kakarot|baryonyx|bloom|avalon|babylon|uni-1|blue-crab|ramen|banana",
    r"-search|grounding",
    r"claude-(sonnet|haiku)[\w.]*-(low|medium|high|xhigh)$",
]


def _read_api_key() -> str:
    key = os.environ.get("HERMES_CUSTOM_LOCALHOST_20128_API_KEY", "").strip()
    if key:
        return key
    try:
        for line in (HOME / ".hermes" / ".env").read_text().splitlines():
            if line.startswith("HERMES_CUSTOM_LOCALHOST_20128_API_KEY="):
                return line.split("=", 1)[1].strip()
    except Exception:
        pass
    return ""


def _api(method: str, path: str, body: dict | None = None, timeout: int = 30) -> dict:
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(
        f"{OMNI_BASE}{path}",
        data=data,
        method=method,
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {_read_api_key()}",
        },
    )
    with urllib.request.urlopen(req, timeout=timeout) as r:
        raw = r.read()
    return json.loads(raw) if raw else {}


def _live_models() -> list[str]:
    data = _api("GET", "/models")
    ids = [m.get("id", "") for m in data.get("data", []) if m.get("id")]
    skip = [re.compile(p, re.I) for p in SKIP_PATTERNS]
    return [i for i in ids if not any(p.search(i) for p in skip)]


def _tier_list(prompt: str, capability: str, live: set[str]) -> list[str]:
    """Ordered candidate IDs from the fork's evidence layer, filtered to the
    live catalog. Empty list when the layer is unreachable (caller falls back
    to the ledger)."""
    try:
        res = _api(
            "POST", "/router/candidates", {"prompt": prompt, "capability": capability, "top": 8}
        )
    except Exception:
        return []
    if not isinstance(res, dict):
        return []
    tiers = res.get("tiers") or {}
    ordered: list[str] = []
    for tier in ("primary", "secondary", "fallback"):
        for mid in tiers.get(tier) or []:
            if isinstance(mid, str) and mid in live and mid not in ordered:
                ordered.append(mid)
    for cand in res.get("candidates") or []:
        mid = cand.get("id") if isinstance(cand, dict) else None
        if isinstance(mid, str) and mid in live and mid not in ordered:
            ordered.append(mid)
    return ordered


# Prefixes that act as model hubs: provider identity is seg0/seg1, not seg0.
# e.g. nvidia/moonshotai/kimi-k3  → "nvidia/moonshotai"
#      nvidia/deepseek-ai/foo      → "nvidia/deepseek-ai"
#      kiro/claude-sonnet-4.5      → "kiro"          (not a hub)
#      lma/claude-haiku-4-5        → "lma"           (not a hub)
HUB_PREFIXES = {"nvidia", "hf", "huggingface", "together", "fireworks", "azure", "bedrock"}


def _provider_of(model_id: str) -> str:
    """Return the provider token for diversity enforcement.

    Hub prefixes (nvidia, hf, …) use two path segments so that
    nvidia/moonshotai/* and nvidia/deepseek-ai/* are treated as
    distinct providers despite sharing the 'nvidia' gateway.
    All other prefixes use only the first segment, so
    kiro/claude-haiku-4.5 and kr/claude-haiku-4.5 are correctly
    treated as different providers even though both route to Anthropic
    upstream.
    """
    parts = model_id.split("/")
    if parts[0].lower() in HUB_PREFIXES and len(parts) >= 2:
        return f"{parts[0]}/{parts[1]}"
    return parts[0]


def _assign_model(
    ordered: list[str], live: list[str], ledger: dict, used_providers: set[str]
) -> tuple[str, str]:
    """Discovery order from router evidence; exploitation order from the
    ledger: proven-green first, unknowns only when no green remains unused,
    known-bad last.

    Diversity is enforced at the *provider* level (see _provider_of): once a
    model from a given provider has been assigned, no other model from that
    same provider is eligible — preventing two nvidia/moonshotai/* models
    from being picked together while still allowing kiro/* and kr/* to
    coexist (they are different providers to us, even if both proxy Anthropic).

    Returns (model_id, basis).
    """

    def green(mid: str) -> bool:
        h = ledger.get(mid, {})
        return isinstance(h, dict) and h.get("ok", 0) > 0 and h.get("fail", 0) == 0

    def bad(mid: str) -> bool:
        h = ledger.get(mid, {})
        if not isinstance(h, dict):
            return False
        return h.get("fail", 0) + h.get("infra_fail", 0) >= 2 and h.get("ok", 0) == 0

    def provider_free(mid: str) -> bool:
        return _provider_of(mid) not in used_providers

    pool = ordered or [m for m in live if not bad(m)] or live
    for mid in pool:
        if provider_free(mid) and green(mid):
            return mid, "ledger-green"
    for mid in pool:
        if provider_free(mid) and not bad(mid):
            return mid, "router-discover"
    for mid in pool:
        if provider_free(mid):
            return mid, "router-retry"
    # All providers already used — fall back to any unused model, then reuse.
    for mid in pool:
        if mid not in used_providers:  # model-level dedup as last resort
            return mid, "ledger-reuse"
    first = pool[0] if pool else (live[0] if live else "")
    return first, "ledger-reuse"


def _load_ledger() -> dict:
    try:
        data = json.loads(LEDGER.read_text())
        return data if isinstance(data, dict) else {}
    except Exception:
        return {}


def _save_ledger(ledger: dict) -> None:
    LEDGER.parent.mkdir(parents=True, exist_ok=True)
    tmp = LEDGER.with_suffix(".tmp")
    tmp.write_text(json.dumps(ledger, indent=1))
    os.replace(tmp, LEDGER)


def _classify_failure(text: str) -> str:
    t = text.lower()
    if "429" in t or "rate" in t and "limit" in t or "quota" in t or "reset after" in t:
        return "RATE_LIMIT"
    if "504" in t or "timeout" in t or "timed out" in t:
        return "PROVIDER_TIMEOUT"
    if "400" in t or "invalid" in t:
        return "INVALID_REQUEST"
    if "502" in t or "503" in t or "unavailable" in t or "bad gateway" in t:
        return "SERVICE_UNAVAILABLE"
    return "MODEL_QUALITY_FAILURE"


def _strip_session_chrome(stdout: str) -> str:
    lines = stdout.splitlines()
    cut = next(
        (i for i, ln in enumerate(lines) if ln.strip().startswith("Resume this session")),
        len(lines),
    )
    body = [ln for ln in lines[:cut] if not (ln.startswith("╭─") or ln.startswith("╰─"))]
    text = "\n".join(body).strip()
    return text


def _run_worker(model: str, prompt: str) -> tuple[bool, str, int, str]:
    """A real worker: headless hermes with its own tools/files/workspace.
    Returns (ok, text, latency_ms, failure_category). Single attempt."""
    t0 = time.time()
    try:
        proc = subprocess.run(
            [HERMES_BIN, "chat", "--oneshot", "--yolo", "-m", model, "-q", prompt],
            capture_output=True,
            text=True,
            timeout=WORKER_TIMEOUT,
        )
        ms = int((time.time() - t0) * 1000)
        text = _strip_session_chrome(proc.stdout or "")
        if proc.returncode == 0 and text:
            return True, text, ms, ""
        err = (proc.stderr or "")[-500:] or f"exit={proc.returncode}"
        return False, err, ms, _classify_failure(err + " " + text)
    except subprocess.TimeoutExpired:
        ms = int((time.time() - t0) * 1000)
        return False, f"worker timeout after {WORKER_TIMEOUT}s", ms, "PROVIDER_TIMEOUT"
    except Exception as e:
        ms = int((time.time() - t0) * 1000)
        return False, f"{type(e).__name__}: {e}", ms, _classify_failure(str(e))


def _post_outcome(capability: str, model: str, ok: bool, ms: int, category: str) -> None:
    try:
        _api(
            "POST",
            "/router/outcomes",
            {
                "workflow": f"swarm-{capability}",
                "model": model,
                "tools": [],
                "success": bool(ok),
                "latency_ms": ms,
                "quality_score": 1.0 if ok else 0.0,
            },
            timeout=15,
        )
    except Exception:
        pass


server = MCPServer("omni-swarm")


@server.tool(
    description=(
        "Run subtasks as a real specialist team: each subtask executes as a "
        "headless Hermes worker (own tools/files/workspace) on an OmniRoute "
        "model chosen by router evidence. Independent subtasks run "
        "simultaneously (max 4 parallel); dependent ones wait in sequential "
        "waves. Returns per-worker results for the caller to judge and "
        "synthesize. Bounds: max 8 subtasks, one attempt per slot, no "
        "retries. Subtask shape: "
        '{"id": "t1", "prompt": "...", "capability": "code|reasoning|vision|chat", '
        '"depends_on": ["t0"]}. Prompts must be self-contained; workers share '
        "no context except what upstream waves return."
    )
)
def swarm(goal: str, subtasks: list) -> dict:
    started = time.time()
    if not isinstance(subtasks, list) or not subtasks:
        return {"ok": False, "error": "subtasks must be a non-empty array", "results": []}
    if len(subtasks) > MAX_SUBTASKS:
        return {
            "ok": False,
            "error": f"max {MAX_SUBTASKS} subtasks per swarm (got {len(subtasks)})",
            "results": [],
        }
    tasks: dict[str, dict] = {}
    for i, t in enumerate(subtasks):
        if not isinstance(t, dict) or not t.get("id") or not t.get("prompt"):
            return {"ok": False, "error": f"subtasks[{i}] needs id + prompt", "results": []}
        tid = str(t["id"])
        if tid in tasks:
            return {"ok": False, "error": f"duplicate subtask id '{tid}'", "results": []}
        cap = str(t.get("capability") or "chat").lower()
        tasks[tid] = {
            "prompt": str(t["prompt"]),
            "capability": cap if cap in ("code", "reasoning", "vision", "chat") else "chat",
            "depends_on": [str(d) for d in (t.get("depends_on") or [])],
        }
    for tid, t in tasks.items():
        for d in t["depends_on"]:
            if d not in tasks:
                return {"ok": False, "error": f"'{tid}' depends on unknown '{d}'", "results": []}

    try:
        live = _live_models()
    except Exception as e:
        return {"ok": False, "error": f"OmniRoute unreachable: {e}", "results": []}
    if not live:
        return {"ok": False, "error": "OmniRoute returned no models", "results": []}

    ledger = _load_ledger()
    live_set = set(live)
    assignment: dict[str, tuple[str, str]] = {}
    used_providers: set[str] = set()  # provider tokens, not raw model IDs
    for tid, t in tasks.items():
        ordered = _tier_list(t["prompt"], t["capability"], live_set)
        model, basis = _assign_model(ordered, live, ledger, used_providers)
        assignment[tid] = (model, basis)
        used_providers.add(_provider_of(model))

    results: dict[str, dict] = {}
    done: set[str] = set()
    remaining = set(tasks)

    def run_one(tid: str) -> dict:
        t = tasks[tid]
        model, basis = assignment[tid]
        ups = (
            "\n\nUpstream outputs:\n"
            + "\n".join(f"[{d}]: {results[d].get('text', '')[:1500]}" for d in t["depends_on"])
            if t["depends_on"]
            else ""
        )
        ok, text, ms, category = _run_worker(model, t["prompt"] + ups)
        return {
            "id": tid,
            "model": model,
            "assignment_basis": basis,
            "ok": ok,
            "text": text[:4000],
            "latency_ms": ms,
            "failure_category": category,
        }

    with ThreadPoolExecutor(max_workers=MAX_PARALLEL) as pool:
        while remaining:
            wave = sorted(t for t in remaining if all(d in done for d in tasks[t]["depends_on"]))
            if not wave:
                return {"ok": False, "error": "dependency cycle", "results": list(results.values())}
            for res in pool.map(run_one, wave):
                results[res["id"]] = res
                done.add(res["id"])
                e = ledger.setdefault(
                    res["model"], {"ok": 0, "fail": 0, "infra_fail": 0, "ema_ms": 8000}
                )
                if res["ok"]:
                    e["ok"] += 1
                elif res.get("failure_category") in (
                    "RATE_LIMIT",
                    "PROVIDER_TIMEOUT",
                    "SERVICE_UNAVAILABLE",
                ):
                    e["infra_fail"] = e.get("infra_fail", 0) + 1
                else:
                    e["fail"] += 1
                e["ema_ms"] = round(0.7 * e["ema_ms"] + 0.3 * res["latency_ms"])
                e["last"] = int(time.time())
                _post_outcome(
                    tasks[res["id"]]["capability"],
                    res["model"],
                    res["ok"],
                    res["latency_ms"],
                    res.get("failure_category", ""),
                )
            remaining -= set(wave)
    _save_ledger(ledger)
    return {
        "ok": True,
        "goal": goal,
        "results": [results[tid] for tid in tasks],
        "elapsed_ms": int((time.time() - started) * 1000),
    }


if __name__ == "__main__":
    server.run()
