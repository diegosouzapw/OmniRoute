#!/usr/bin/env python3
"""Republish Chromium's loopback CDP (127.0.0.1:9222) onto 0.0.0.0:9223.

Chrome binds DevTools to 127.0.0.1 only and ignores --remote-debugging-address
on recent versions, so the host can't reach it via `docker -p 9222:9222`. This
tiny TCP bridge (run inside the container) exposes the same CDP on all
interfaces so the OmniRoute server's VNC harvester can connect from the host.
"""
import socket, threading, sys

SRC_HOST, SRC_PORT = "127.0.0.1", 9222
PUB_HOST, PUB_PORT = "0.0.0.0", 9223


def bridge(client, target_addr):
    try:
        upstream = socket.create_connection(target_addr, timeout=10)
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
