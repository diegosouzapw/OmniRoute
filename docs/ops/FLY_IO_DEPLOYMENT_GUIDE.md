---
title: "OmniRoute Fly.io Deployment Guide"
version: 3.8.40
lastUpdated: 2026-06-28
---

# OmniRoute Fly.io Deployment Guide

This document describes the actual deployment process for OmniRoute on Fly.io, covering two scenarios:

- Deploying the current project to Fly.io for the first time
- Publishing subsequent code updates
- New projects following the same deployment workflow

This guide is based on a verified working configuration for the current project. The application name is `omniroute`.

---

## 1. Deployment Goals

- Platform: Fly.io
- Deployment method: Local `flyctl` direct publish
- Runtime: Using the existing `Dockerfile` and `fly.toml` in the repository
- Data persistence: Fly Volume mounted to `/data`
- Access URL: `https://omniroute.fly.dev/`

---

## 2. Current Project Key Configuration

The `fly.toml` in the current repository has been confirmed to contain the following key items:

```toml
app = 'omniroute'
primary_region = 'sin'

[[mounts]]
  source = 'data'
  destination = '/data'

[processes]
  app = 'node run-standalone.mjs'

[http_service]
  internal_port = 20128

[env]
  TZ = "Asia/Shanghai"
  HOST = "0.0.0.0"
  HOSTNAME = "0.0.0.0"
  BIND = "0.0.0.0"
```

Notes:

- `app = 'omniroute'` determines which Fly application the deployment targets
- `destination = '/data'` determines the persistent volume mount directory
- This project must set `DATA_DIR=/data`, otherwise the database and keys will be written to the container's temporary directory

---

## 3. Prerequisites

### 3.1 Installing the Fly CLI

Windows PowerShell:

```powershell
pwsh -Command "iwr https://fly.io/install.ps1 -useb | iex"
```

If the install script fails in your environment, you can also manually download the `flyctl` binary and add it to your `PATH`.

### 3.2 Logging in to Your Fly Account

```powershell
flyctl auth login
```

### 3.3 Verifying Login Status

```powershell
flyctl auth whoami
flyctl version
```

---

## 4. First-Time Deployment of the Current Project

### 4.1 Clone the Code and Enter the Directory

```powershell
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
```

### 4.2 Confirm the Application Name

Open `fly.toml` and verify the following line:

```toml
app = 'omniroute'
```

If you are deploying to your own new application, you can change it to a globally unique name, for example:

```toml
app = 'omniroute-yourname'
```

Note:

- Make sure the application you see in the console matches the `app` value in `fly.toml`
- If you previously used a different name, such as `oroute`, do not confuse it with `omniroute`

### 4.3 Create the Application

If the application does not yet exist:

```powershell
flyctl apps create omniroute
```

If you changed the application name, replace `omniroute` with your chosen name.

### 4.4 First Deploy

```powershell
flyctl deploy
```

---

## 5. Required Parameters

This project recommends configuring at least the following parameters on Fly.io.

### 5.1 Verified Parameters

These parameters have been used in actual deployments on the current `omniroute` application:

- `API_KEY_SECRET`
- `DATA_DIR`
- `JWT_SECRET`
- `MACHINE_ID_SALT`
- `NEXT_PUBLIC_BASE_URL`
- `OMNIROUTE_WS_BRIDGE_SECRET` (required in production — used for WebSocket bridge authentication)
- `STORAGE_ENCRYPTION_KEY`

### 5.2 About `INITIAL_PASSWORD`

The current project does not set `INITIAL_PASSWORD` because this deployment does not require it.

If it is not set:

- The startup log will indicate the default password is `CHANGEME`
- You should change the login password in system settings as soon as possible after deployment

If you want to initialize the backend password unattended, you can add it later:

- `INITIAL_PASSWORD`

---

## 6. Recommended Parameters

### 6.1 Secrets Configuration

The following variables are recommended for Fly Secrets:

| Variable                      | Recommendation         | Description                                           |
| ----------------------------- | ---------------------- | ----------------------------------------------------- |
| `API_KEY_SECRET`              | Required               | Used for API Key generation and validation            |
| `JWT_SECRET`                  | Required               | Used for login sessions and JWT signing               |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Required in production | WebSocket bridge authentication secret                |
| `STORAGE_ENCRYPTION_KEY`      | Strongly recommended   | Encrypts sensitive connection information at rest     |
| `MACHINE_ID_SALT`             | Recommended            | Generates a stable machine identifier                 |
| `INITIAL_PASSWORD`            | Optional               | Sets the initial backend password at first deployment |
| OAuth/API private credentials | As needed              | External platform authentication configuration        |

### 6.2 Recommended Values for the Current Project

| Variable               | Recommended Value           |
| ---------------------- | --------------------------- |
| `DATA_DIR`             | `/data`                     |
| `NEXT_PUBLIC_BASE_URL` | `https://omniroute.fly.dev` |

Notes:

- `DATA_DIR=/data` is critical and must match the Fly Volume mount point
- `NEXT_PUBLIC_BASE_URL` is used by the scheduler, frontend callbacks, and similar scenarios

### 6.3 OAuth Callback URL Configuration

If you need to enable OAuth-based providers (e.g. Antigravity, Gemini, Cursor) on the Fly.io deployment, make sure of the following two points:

1. **Set `NEXT_PUBLIC_BASE_URL` to your public HTTPS domain**

   ```powershell
   flyctl secrets set NEXT_PUBLIC_BASE_URL=https://omniroute.fly.dev -a omniroute
   ```

   If you are using a custom domain, replace it with the corresponding domain (e.g. `https://omniroute.yourdomain.com`).

2. **Configure the callback URL on the provider console**

   All OAuth providers share the single callback path `/callback` — there is NO per-provider callback route:

   ```text
   <NEXT_PUBLIC_BASE_URL>/callback
   ```

   For example, regardless of Gemini, Antigravity, Cursor, or GitLab Duo:
   - `https://omniroute.fly.dev/callback`

   If `NEXT_PUBLIC_BASE_URL` does not match the callback URL registered with the provider, the OAuth flow will fail at the browser redirect step.

---

## 7. One-Command Secret Setup

The following commands generate secure random values and write all required parameters for the current project to Fly Secrets in one step.

Notes:

- Does not include `INITIAL_PASSWORD`
- Intended for the current project `omniroute`

```powershell
$apiKeySecret = [Convert]::ToHexString((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 })).ToLower()
$jwtSecret = [Convert]::ToHexString((1..64 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 })).ToLower()
$machineIdSalt = [Convert]::ToHexString((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 })).ToLower()
$storageKey = [Convert]::ToHexString((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 })).ToLower()
$wsBridgeSecret = [Convert]::ToHexString((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 })).ToLower()

flyctl secrets set `
  API_KEY_SECRET=$apiKeySecret `
  JWT_SECRET=$jwtSecret `
  MACHINE_ID_SALT=$machineIdSalt `
  STORAGE_ENCRYPTION_KEY=$storageKey `
  OMNIROUTE_WS_BRIDGE_SECRET=$wsBridgeSecret `
  DATA_DIR=/data `
  NEXT_PUBLIC_BASE_URL=https://omniroute.fly.dev `
  -a omniroute
```

On Linux / macOS, you can also use `openssl rand -hex 32`:

```bash
flyctl secrets set OMNIROUTE_WS_BRIDGE_SECRET=$(openssl rand -hex 32) -a omniroute
```

Notes:

- `OMNIROUTE_WS_BRIDGE_SECRET` is required in production; missing it will break the WebSocket bridge handshake

If you also want to set an initial password:

```powershell
flyctl secrets set INITIAL_PASSWORD=your-strong-password -a omniroute
```

---

## 8. Viewing Current Parameters

```powershell
flyctl secrets list -a omniroute
```

If the `Secrets` page in the console does not show the expected variables, check:

- That you are viewing the `omniroute` application
- That the `app` value in `fly.toml` matches the application in the console

---

## 9. Subsequent Updates and Releases

After code updates, the release process is straightforward:

```powershell
git pull
flyctl deploy
```

If you only need to update parameters without changing code:

```powershell
flyctl secrets set KEY=value -a omniroute
```

Fly will automatically perform a rolling update of machines.

### 9.1 Tracking Upstream Repository Updates While Preserving Your Fork's `fly.toml`

If the current repository is a fork and you want to sync updates from the upstream `https://github.com/diegosouzapw/OmniRoute`, follow the workflow below.

First, verify your remotes:

```powershell
git remote -v
```

You should see at least:

- `origin` pointing to your own fork
- `upstream` pointing to the original repository

If `upstream` is not configured, add it:

```powershell
git remote add upstream https://github.com/diegosouzapw/OmniRoute.git
```

Before syncing with upstream, fetch the latest commits and tags:

```powershell
git fetch upstream --tags
```

Check the current version and upstream tags:

```powershell
git describe --tags --always
git show --no-patch --oneline v3.4.7
```

> Note: The current project version is `v3.8.0`. The `v3.4.7` references below are kept as historical examples only. For actual releases, use `:latest` or the current version tag (e.g. `:v3.8.0`).

If you want to merge the latest upstream `main` while forcefully keeping your fork's `fly.toml`, follow this workflow:

```powershell
git merge upstream/main
git checkout HEAD~1 -- fly.toml
git add -- fly.toml
git commit -m "chore(deploy): keep fork fly.toml"
git push origin main
```

Notes:

- `git merge upstream/main` syncs the latest code from the original repository
- `git checkout HEAD~1 -- fly.toml` restores your fork's own `fly.toml` from before the merge
- If upstream did not modify `fly.toml`, this step will not introduce any differences
- If upstream did modify `fly.toml`, this step ensures your Fly application name, volume mount, region, and other fork-specific deployment configuration are not overwritten

If you want to align with a specific release tag (e.g. `v3.4.7`), first verify that the tag is already included in `upstream/main`:

```powershell
git merge-base --is-ancestor v3.4.7 upstream/main
```

A successful return means `upstream/main` already contains that version; you can simply merge `upstream/main`.

### 9.2 Standard Release Sequence After Syncing Upstream

After syncing with the original repository, follow this recommended release order:

1. `git fetch upstream --tags`
2. `git merge upstream/main`
3. Restore the fork's `fly.toml`
4. `git push origin main`
5. `flyctl deploy`
6. `flyctl status -a omniroute`
7. `flyctl logs --no-tail -a omniroute`

This is the actual workflow used when upgrading the current project to `v3.4.7` (the example refers to a historical version; the current actual version is `v3.8.0`).

---

## 10. Post-Deployment Checks

### 10.1 Check Application Status

```powershell
flyctl status -a omniroute
```

### 10.2 View Startup Logs

```powershell
flyctl logs --no-tail -a omniroute
```

### 10.3 Verify Site Accessibility

```powershell
try {
  (Invoke-WebRequest -Uri "https://omniroute.fly.dev" -MaximumRedirection 5 -UseBasicParsing).StatusCode
} catch {
  if ($_.Exception.Response) {
    $_.Exception.Response.StatusCode.value__
  } else {
    throw
  }
}
```

A return value of `200` indicates the site is responding normally.

---

## 11. Success Indicators

After a successful deployment, the logs should show content similar to:

```text
[bootstrap] Secrets persisted to: /data/server.env
[DB] SQLite database ready: /data/storage.sqlite
```

These two points are critical:

- `/data/server.env` confirms the runtime secrets are written to the persistent volume
- `/data/storage.sqlite` confirms the database is written to the persistent volume

If you see `/app/data/...` instead, `DATA_DIR` is misconfigured and must be corrected immediately.

---

## 12. Common Issues

### 12.1 `Secrets` Page Is Empty

There are usually two reasons:

- You have not yet run `flyctl secrets set`
- You are viewing a different application (e.g. `oroute` instead of `omniroute`)

### 12.2 `flyctl deploy` Reports `app not found`

Create the application first:

```powershell
flyctl apps create omniroute
```

### 12.3 `fly.toml` Parsing Fails

Check the following:

- Whether there are garbled characters in comments
- Whether TOML quoting and indentation are correct

### 12.4 Data Is Not Persisting

Verify both of the following:

- `fly.toml` contains `destination = '/data'`
- `DATA_DIR` is set to `/data`

### 12.5 Can It Run Without `INITIAL_PASSWORD`?

Yes, it can run. It will fall back to the default `CHANGEME` password. It is recommended to change the backend password as soon as possible in production.

---

## 13. Reusing for New Projects

If you are deploying a new project following this document, you only need to change these items:

1. Change the `app` value in `fly.toml`
2. Change `NEXT_PUBLIC_BASE_URL`
3. Keep `DATA_DIR=/data`
4. Regenerate `API_KEY_SECRET`, `JWT_SECRET`, `MACHINE_ID_SALT`, and `STORAGE_ENCRYPTION_KEY`
5. After the first deployment, verify that logs are written to `/data`

Do not reuse keys from a previous project.

---

## 14. Minimal Release Checklist for the Current Project

The most commonly used commands for subsequent releases are:

```powershell
flyctl auth whoami
flyctl status -a omniroute
flyctl secrets list -a omniroute
flyctl deploy
flyctl logs --no-tail -a omniroute
```

For a normal release, the core command is simply:

```powershell
flyctl deploy
```

For a first-time deployment in a new environment, the core steps are:

1. `flyctl auth login`
2. `flyctl apps create omniroute`
3. `flyctl secrets set ... -a omniroute`
4. `flyctl deploy`
5. `flyctl logs --no-tail -a omniroute`
