# OmniRoute Deployment & Infrastructure

> **Date**: 2026-07-31
> **Scope**: Local Mac dev instance + Proxmox/LXC production layout. Context for anyone resuming work.

## Topology

```
┌─────────────────────────────────────────────────────────┐
│ HOST Proxmox 100.73.44.17 (pve-n150.tailad1b81.ts.net)   │
│                                                           │
│  tailscaled → holds :443 (Funnel)                         │
│    ├─ /         → http://192.168.3.101:80/   (Forgejo)    │
│    └─ /omniroute → http://192.168.3.106:20128/ (OmniRoute)│
│                                                           │
│  Docker:                                                  │
│    ├─ openhands  :3000  (host-network, --privileged)      │
│    └─ amnezia-awg2 :48243/udp (WireGuard, do NOT touch)   │
└───────┬───────────────────────────────────────────────────┘
        │ LXC (lxc-attach -n <id>)
┌───────┴──────────┐  ┌────────────────────────────────────┐
│ LXC 101           │  │ LXC 106 (agent-node, 192.168.3.106)│
│ Forgejo :80       │  │  Docker:                           │
│ (git-repositories)│  │   ├─ omniroute :20128 (data→/opt/  │
└───────────────────┘  │  │        omniroute/data)          │
                       │  │   └─ openhands :8000/18000/8002 │
                       │  │      (OLD duplicate — DELETE)   │
                       │  ├─ systemd project-history :43128 │
                       │  ├─ component-vault :43133 (old)   │
                       │  └─ iptables: INPUT DROP + ACCEPT  │
                       │     for 22,20128,43128,43133,...   │
                       └────────────────────────────────────┘
```

## Components

| Component | Where | Details |
|---|---|---|
| **Tailscale** | host | `tailscale serve` with Funnel; certs `/var/lib/tailscale/certs/pve-n150.*` |
| **Caddy** | — | **not installed** (no package, no Caddyfile) — HTTPS handled by Tailscale Serve |
| **OpenHands** | host, docker | image `openhands:fixed` (`4e631813f208`), host-network, privileged; DB in `/opt/openhands/workspace/.openhands-state`; created via `docker run -e LLM_MODEL=ds/deepseek-v4-flash -e LLM_BASE_URL=http://192.168.3.106:20128/v1 -e LLM_API_KEY=sk-d146...` (backup: `/opt/openhands/container-config-backup.txt`) |
| **OmniRoute** | LXC 106, docker | image `diegosouzapw/omniroute`, mount `/opt/omniroute/data→/app/data`, cmd `node dev/run-standalone.mjs`; sources/build: `/opt/omniroute-build` (git + Dockerfile + compose) |
| **Forgejo** | LXC 101 | git server, `http://192.168.3.101`, external `https://pve-n150.tailad1b81.ts.net/` (path prefix `/git/`; Gitea 15.0.1) |
| **project-history** | LXC 106, systemd | Rust, `/opt/project-history` (src + binary + data), port 43128 |

## Pushing changes

**1. To Forgejo (any session):** remote `http://192.168.3.101/egorich/<repo>.git`.
   From Mac: `https://egorich:<token>@pve-n150.tailad1b81.ts.net/git/egorich/<repo>.git`
   ⚠️ URL-encode `@` in the password as `%40`.

**2. To OpenHands (code/fixes):** image built via `docker commit`, so change = edit inside container + commit image:
```bash
docker exec -it openhands bash          # edit /app/openhands/...
docker commit openhands openhands:fixed  # fix patch into image
docker restart openhands                 # apply
```
Env config (model, key, CORS): recreate container with same command from `/opt/openhands/container-config-backup.txt` + new `-e`.

**3. To OmniRoute (LXC 106):**
```bash
lxc-attach -n 106 -- bash
cd /opt/omniroute-build            # git pull / checkout pr/fix-pack
docker compose -f docker-compose.prod.yml build
docker compose -f docker-compose.prod.yml up -d
```
Data (providers, keys) in `/opt/omniroute/data` — survives rebuild (volume).

**4. To project-history (LXC 106):**
```bash
lxc-attach -n 106 -- bash
cd /opt/project-history            # or git clone from Forgejo (no .git there!)
# edit src/, then:
cargo build --release
systemctl restart project-history
curl http://127.0.0.1:43128/api/health
```

## Exposing a new path over HTTPS
```bash
tailscale serve --bg --set-path /history http://192.168.3.106:43128/
```

## Do NOT touch
- iptables in LXC 106 (INPUT DROP, persistent rules)
- `omniroute` (needed by OpenHands)
- `amnezia-awg2`
- DB `data/project_history.sqlite3`

## Access notes (Mac)

- SSH to Proxmox/LXC **does not work** from this Mac (Tailscale is stopped here; ports time out).
- Forgejo API works over `https://pve-n150.tailad1b81.ts.net/git/api/v1/` (Basic auth `egorich`).
- Everything else reachable only from the Proxmox host / LXC sessions.

## Forgejo repo (created 2026-07-31)

- `egorich/OmniRoute` — branches `pr/fix-pack` (PR-ready), `feat/personal-build` (full history)
- GitHub PR: https://github.com/diegosouzapw/OmniRoute/pull/9058
