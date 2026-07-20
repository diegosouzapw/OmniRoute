# Browser-login container

OmniRoute can open an isolated browser for provider connections that require an interactive web login. The operator signs in through the browser UI, then OmniRoute reads only the credential fields declared for that provider through the Chrome DevTools Protocol (CDP) and writes them to the selected `provider_connections` row.

The feature is exposed through the management-authenticated `/api/vnc-session` routes. Browser and CDP ports are published on `127.0.0.1` only; they are not intended to be exposed directly to a network.

## Build the required image

The current implementation uses the Chromium image in this directory. Build it before starting a browser-login session:

```bash
docker build -t omniroute-vnc-chromium:local docker/vnc-browser/chromium
```

`omniroute-vnc-chromium:local` is the default image. Set `OMNIROUTE_VNC_IMAGE` only when using a compatible image that provides:

- a browser UI on the configured container VNC port;
- a reachable CDP endpoint on the configured container CDP port;
- support for the `CHROME_CLI` environment variable used to pass the provider login URL and Chromium arguments;
- persistent browser data under the configured profile directory.

The container image includes a local bridge because modern Chromium binds its debugger to loopback inside the container.

## Ports and access

Docker assigns ephemeral host ports and binds them to loopback:

| Purpose | Default container port | Host exposure |
| --- | ---: | --- |
| Browser web UI | `3000` | `127.0.0.1:<ephemeral>` |
| DevTools/CDP bridge | `9223` | `127.0.0.1:<ephemeral>` |

Remote operators must access the browser UI through an authenticated application proxy or an SSH tunnel. Do not publish either port on `0.0.0.0`.

## Configuration

| Variable | Default | Purpose |
| --- | --- | --- |
| `OMNIROUTE_VNC_IMAGE` | `omniroute-vnc-chromium:local` | Compatible browser image |
| `OMNIROUTE_VNC_CONTAINER_VNC_PORT` | `3000` | Browser UI port inside the container |
| `OMNIROUTE_VNC_CONTAINER_CDP_PORT` | `9223` | CDP bridge port inside the container |
| `OMNIROUTE_VNC_CONTAINER_PROFILE_DIR` | `/config` | Profile mount point inside the container |
| `OMNIROUTE_VNC_PROFILE_DIR` | `$HOME/.omniroute/browser-login-profiles` | Host profile root |
| `OMNIROUTE_VNC_PERSIST_PROFILES` | `false` | Reuse a connection profile across sessions |
| `OMNIROUTE_VNC_IDLE_MS` | `600000` | Idle-session timeout in milliseconds |
| `OMNIROUTE_VNC_MAX_MS` | `1800000` | Maximum session lifetime in milliseconds |
| `OMNIROUTE_VNC_MAX_SESSIONS` | `4` | Maximum concurrent sessions |
| `OMNIROUTE_VNC_READY_MS` | `45000` | Browser/CDP startup timeout in milliseconds |
| `OMNIROUTE_VNC_HARVEST_MS` | `20000` | Credential-harvest timeout in milliseconds |
| `OMNIROUTE_VNC_CHROMIUM_ARGS` | see `manifest.ts` | Chromium command-line arguments |
| `OMNIROUTE_DOCKER_BIN` | `docker` | Docker-compatible CLI executable |

## Security and lifecycle

- Sessions are scoped to a specific provider connection and use random session IDs.
- Container names and persistent-profile path segments are sanitized.
- Only declared cookie or storage keys are retained; arbitrary local or session storage is not copied into the database.
- Startup failures remove the in-memory session, container, and non-persistent profile.
- Concurrent stop requests are idempotent, and shutdown removes managed containers.
- Harvest and CDP commands have bounded timeouts.
- API responses must sanitize internal Docker, filesystem, CDP, and database errors.

## Basic verification

```bash
npm test -- tests/unit/vnc-session.test.ts
npm run typecheck
```

For an end-to-end check, build the image, start OmniRoute, create or select a supported web-provider connection, start a browser-login session through the management API, complete login through the returned UI URL, harvest credentials, and verify that the selected connection—not another account for the same provider—was updated.