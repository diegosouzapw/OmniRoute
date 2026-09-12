#!/usr/bin/env python3
"""Republish Chromium's loopback CDP (127.0.0.1:9222) onto 0.0.0.0:9223.

Chrome binds DevTools to 127.0.0.1 only and ignores --remote-debugging-address
on recent versions, so the host can't reach it via `docker -p 9222:9222`. This
tiny TCP bridge (run inside the container) exposes the same CDP on all
interfaces so the OmniRoute server's VNC harvester can connect from the host.

SECURITY (#12571): 9223 is reachable by any sibling container on the same
Docker bridge network, not just the host, and CDP grants full control over a
live, credential-bearing browser session (Runtime.evaluate, cookie theft,
etc). Every connection MUST present the shared secret in CDP_BRIDGE_TOKEN
(env, injected per-session by src/lib/vncSession/service.ts) as an
`X-Omni-Cdp-Token: <token>` header on its first HTTP request/WS-upgrade
before a single byte is forwarded upstream. A missing/invalid token gets the
connection closed immediately with no response, so probing gives no signal.
"""
import os, socket, threading, sys

SRC_HOST, SRC_PORT = "127.0.0.1", 9222
PUB_HOST, PUB_PORT = "0.0.0.0", 9223
TOKEN = os.environ.get("CDP_BRIDGE_TOKEN", "")
TOKEN_HEADER = f"x-omni-cdp-token: {TOKEN}".lower()
PEEK_TIMEOUT_S = 5
MAX_PEEK_BYTES = 8192


def has_valid_token(initial_chunk: bytes) -> bool:
    """Check whether the client's first bytes carry the configured secret.

    A missing/empty TOKEN always fails closed (no caller can present a valid
    empty header line the way this check is written).
    """
    if not TOKEN:
        return False
    try:
        text = initial_chunk.decode("latin-1", errors="ignore").lower()
    except (UnicodeDecodeError, LookupError):
        return False
    return TOKEN_HEADER in text


def read_initial_chunk(client):
    client.settimeout(PEEK_TIMEOUT_S)
    try:
        return client.recv(MAX_PEEK_BYTES)
    except OSError:
        return b""
    finally:
        client.settimeout(None)


def bridge(client, target_addr):
    initial = read_initial_chunk(client)
    if not has_valid_token(initial):
        client.close()
        return

    try:
        upstream = socket.create_connection(target_addr, timeout=10)
        upstream.sendall(initial)
    except OSError:
        client.close()
        return

    a = threading.Thread(target=pipe, args=(client, upstream), daemon=True)
    b = threading.Thread(target=pipe, args=(upstream, client), daemon=True)
    a.start(); b.start()


def pipe(src, dst):
    try:
        while True:
            data = src.recv(65536)
            if not data:
                break
            dst.sendall(data)
    except OSError:
        pass
    finally:
        for s in (src, dst):
            try:
                s.close()
            except OSError:
                pass


def main():
    listen = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    listen.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    listen.bind((PUB_HOST, PUB_PORT))
    listen.listen(64)
    print(f"[cdp-bridge] forwarding 0.0.0.0:{PUB_PORT} -> {SRC_HOST}:{SRC_PORT}", file=sys.stderr)
    while True:
        conn, _ = listen.accept()
        threading.Thread(target=bridge, args=(conn, (SRC_HOST, SRC_PORT)), daemon=True).start()


if __name__ == "__main__":
    main()
