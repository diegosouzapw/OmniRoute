---
title: "Docker Release Channels"
version: 3.8.50
lastUpdated: 2026-08-06
---

# Docker Release Channels

OmniRoute publishes separate Docker channels for stable releases, active release-branch testing, and development builds.

## Channel summary

| Channel | Source | Mutability | Recommended use |
| --- | --- | --- | --- |
| `:<version>` / `:<version>-web` | Signed/versioned release | Immutable | Production deployments that pin an exact release |
| `:latest` / `:latest-web` | Highest stable release | Mutable stable pointer | Production deployments that intentionally follow stable releases |
| `:next` / `:next-web` | Current default `release/v*` branch | Mutable pre-release pointer | Testing fixes that have landed on the active release branch but are not yet in a stable release |
| `:main` / `:main-web` | `main` branch | Mutable development pointer | Development and integration testing only |

## Using the pre-release channel

The `next` channel is rebuilt on every push to the current default `release/v*` branch and is published for both AMD64 and ARM64. Older maintenance branches cannot overwrite it. The channel provides a pullable image for fixes that have merged into the active release branch before the next stable tag is cut.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

For Docker Compose, override the image tag used by the selected profile, then pull and recreate the service:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

## Safety and rollback

`next` is a floating pre-release channel. It may change on any push to the active release branch and is **not supported for production use**. Pin the image digest while evaluating a specific build:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Before testing, back up the OmniRoute data volume or bind-mounted data directory. To roll back, restore the previously used stable version or digest and recreate the container:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

A release-branch build can never move `latest`; only an eligible stable semantic version may promote the stable pointer. The `next` images retain the release image inspection and blocking CRITICAL-vulnerability gate.
