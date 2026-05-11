# Windows Quick Start

This guide is designed for a clean Windows machine and a video tutorial flow.

## What viewers need

- Windows 10 or Windows 11
- PowerShell
- Internet connection

Docker Desktop is the main install path. The setup script can install it with `winget` if it is not already installed.

## Option A. Docker install

Use this when you want the shortest tutorial command and do not need the full source code:

```powershell
Set-ExecutionPolicy -Scope Process Bypass
irm https://raw.githubusercontent.com/VusalAbdurahmanovX/OmniRoute/main/scripts/setup-windows.ps1 -OutFile setup-windows.ps1
.\setup-windows.ps1 -InstallDocker
```

The script skips onboarding and disables dashboard login for local setup. There is no default password.

If Docker Desktop was just installed and Windows asks you to restart or accept Docker Desktop's first-run setup, do that once and rerun the same command.

If you want a password-protected dashboard, run:

```powershell
.\setup-windows.ps1 -RequirePassword
```

If Docker Desktop is already installed, this also works:

```powershell
.\setup-windows.ps1
```

## Option B. NPM install

Use this as an alternative when the viewer already has Node.js installed and does not want Docker:

```powershell
npm install -g omniroute
omniroute setup --non-interactive
omniroute
```

`omniroute setup --non-interactive` marks setup complete and leaves dashboard login disabled. Use `omniroute setup` if you want the interactive provider/password wizard.

From a source checkout, you can run the Docker wizard through npm too:

```powershell
npm install
npm run setup:windows
```

## Option C. Source-code install

Use this when you want to show the GitHub repo and keep the source code locally. This option requires Git.

```powershell
cd $env:USERPROFILE
git clone https://github.com/VusalAbdurahmanovX/OmniRoute.git
cd OmniRoute
```

Run the Windows setup wizard:

```powershell
Set-ExecutionPolicy -Scope Process Bypass
.\scripts\setup-windows.ps1 -InstallDocker
```

The wizard starts Docker Desktop if it can, waits for Docker, pulls the Docker image, creates a persistent Docker volume, starts OmniRoute, skips onboarding, and disables dashboard login for local setup.

No default password is used. To require a dashboard password, run `./scripts/setup-windows.ps1 -RequirePassword`.

## Open OmniRoute

```text
Dashboard: http://localhost:20128
API:       http://localhost:20128/v1
```

The setup script also prints a LAN URL when Windows exposes one. Use that URL for another phone or computer on the same Wi-Fi.

## 4. Connect a provider

1. Open Dashboard -> Providers.
2. Add at least one provider account or API key.
3. Open Dashboard -> Endpoints.
4. Create an API key.
5. Use this base URL in any OpenAI-compatible app:

```text
http://localhost:20128/v1
```

## 5. Show it publicly for a demo

For a temporary public URL, open Dashboard -> Endpoints -> Cloudflare Quick Tunnel.

Cloudflare Quick Tunnel gives a temporary `https://*.trycloudflare.com` URL. Use the `/v1` endpoint for API clients.

Do not expose OmniRoute publicly until your dashboard password is strong.

## Common commands

Start an existing container:

```powershell
.\scripts\setup-windows.ps1
```

Show logs:

```powershell
.\scripts\setup-windows.ps1 -Logs
```

Stop and remove only the container:

```powershell
.\scripts\setup-windows.ps1 -Stop
```

Run on another port:

```powershell
.\scripts\setup-windows.ps1 -Port 3000
```

Require a password, useful for private deployments. Do not hard-code this in public videos or scripts:

```powershell
$env:OMNIROUTE_INITIAL_PASSWORD = Read-Host "Create dashboard password"
.\scripts\setup-windows.ps1 -RequirePassword
```

## Docker Compose alternative

The Compose file uses profiles, so this command has no default service:

```powershell
docker compose up -d
```

Use a profile instead:

```powershell
docker compose --profile base up -d
```

Or with built-in CLI tools:

```powershell
docker compose --profile cli up -d
```

## Troubleshooting

| Problem                               | Fix                                                |
| ------------------------------------- | -------------------------------------------------- |
| `docker compse`                       | Use `docker compose`                               |
| `no service selected`                 | Use `docker compose --profile base up -d`          |
| `unknown shorthand flag: 's' in -s`   | Use `docker compose ps`                            |
| `failed to connect to the docker API` | Start Docker Desktop and wait until it is running  |
| Docker Desktop is not installed       | Run `./setup-windows.ps1 -InstallDocker` or install Docker Desktop manually |
| `--name` / `-p` PowerShell errors     | Use PowerShell backticks or use `setup-windows.ps1` |

## Video script outline

1. "Open PowerShell."
2. "Run the command; it can install Docker Desktop if it is missing."
3. "Run the GitHub download command with `-InstallDocker`."
4. "If Docker Desktop asks for first-run setup or restart, finish that and rerun the same command."
5. "The script skips onboarding and does not ask for a password."
6. "Open `http://localhost:20128`."
7. "Connect a provider from the Providers page."
8. "Create an API key from Endpoints."
9. "Use `http://localhost:20128/v1` in any OpenAI-compatible tool."
10. "For a public demo, enable Cloudflare Quick Tunnel from Endpoints."
