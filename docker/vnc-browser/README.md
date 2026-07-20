# VNC login browser containers

This directory supports the **persistent web-login** feature (`/api/vnc-session`).
When a cookie/token web provider (ChatGPT Web, Gemini Web, Claude Web, …) needs an
interactive browser login, OmniRoute starts a containerized browser that exposes a
**noVNC web UI**. The operator logs in through that UI, and OmniRoute harvests the
resulting cookies / localStorage back into the provider's `provider_connections`
row over the browser's DevTools Protocol (CDP).

## Default image: Firefox (recommended)

The default image is [`jlesage/firefox`](https://hub.docker.com/r/jlesage/firefox).
It is used because Firefox's remote-debugging port binds `0.0.0.0` inside the
container, so a plain published port is enough to harvest cookies.

No build step is required — the image is pulled on first use:

```bash
docker pull jlesage/firefox:latest
```

Ports (per session, allocated from `vncBasePort`):

| Purpose        | Container | Host (example) |
| -------------- | --------- | -------------- |
| noVNC web UI   | `5800`    | `6080`         |
| DevTools (CDP) | `9222`    | `6081`         |

## Optional image: Chromium + CDP bridge

Chrome/Chromium ≥130 **force** the DevTools debugger to bind `127.0.0.1` and
ignore `--remote-debugging-address=0.0.0.0`. To harvest cookies from a Chromium
container you therefore need a tiny in-container TCP bridge that republishes the
loopback CDP port on `0.0.0.0`. The `chromium/` subdirectory contains such an
image (based on `linuxserver/chromium`). Build and select it with:

```bash
docker build -t omniroute-vnc-chromium:local docker/vnc-browser/chromium
OMNIROUTE_VNC_IMAGE=omniroute-vnc-chromium:local \
OMNIROUTE_VNC_CONTAINER_VNC_PORT=3000 \
OMNIROUTE_VNC_CONTAINER_CDP_PORT=9223 \
  omniroute serve
```

## Configuration (env)

| Variable                              | Default                     | Meaning                                  |
| ------------------------------------- | --------------------------- | ---------------------------------------- |
| `OMNIROUTE_VNC_IMAGE`                 | `jlesage/firefox:latest`    | Container image                          |
| `OMNIROUTE_VNC_CONTAINER_VNC_PORT`    | `5800`                      | noVNC port inside the container          |
| `OMNIROUTE_VNC_CONTAINER_CDP_PORT`    | `9222`                      | CDP port inside the container            |
| `OMNIROUTE_VNC_CONTAINER_PROFILE_DIR` | `/config`                   | Persistent profile mount point           |
| `OMNIROUTE_VNC_PROFILE_DIR`           | `~/.omniroute/vnc-profiles` | Host profile storage root                |
| `OMNIROUTE_VNC_IDLE_MS`               | `600000`                    | Idle auto-stop (ms)                      |
| `OMNIROUTE_VNC_MAX_MS`                | `0`                         | Hard session lifetime cap (0 = none)     |
| `OMNIROUTE_VNC_MAX_SESSIONS`          | `12`                        | Max concurrent sessions                  |
| `OMNIROUTE_DOCKER_BIN`                | `docker`                    | Docker CLI binary                        |
