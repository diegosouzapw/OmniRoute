param(
  [int]$Port = 20128,
  [string]$ContainerName = "omniroute",
  [string]$Image = "diegosouzapw/omniroute:latest",
  [string]$VolumeName = "omniroute-data",
  [string]$InitialPassword = $env:OMNIROUTE_INITIAL_PASSWORD,
  [switch]$RequirePassword,
  [switch]$InstallDocker,
  [switch]$NoPull,
  [switch]$Stop,
  [switch]$Logs
)

$ErrorActionPreference = "Stop"

function Write-Step {
  param([string]$Message)
  Write-Host "==> $Message" -ForegroundColor Cyan
}

function ConvertTo-PlainText {
  param([System.Security.SecureString]$SecureString)

  $ptr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($SecureString)
  try {
    [Runtime.InteropServices.Marshal]::PtrToStringBSTR($ptr)
  } finally {
    [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ptr)
  }
}

function Read-InitialPassword {
  if ($InitialPassword) {
    if ($InitialPassword.Length -lt 8) {
      throw "INITIAL_PASSWORD must be at least 8 characters."
    }

    return $InitialPassword
  }

  if (-not $RequirePassword) {
    return ""
  }

  while ($true) {
    $first = Read-Host "Create dashboard password" -AsSecureString
    $second = Read-Host "Confirm dashboard password" -AsSecureString

    $firstPlain = ConvertTo-PlainText $first
    $secondPlain = ConvertTo-PlainText $second

    if ($firstPlain.Length -lt 8) {
      Write-Host "Password must be at least 8 characters." -ForegroundColor Yellow
      continue
    }

    if ($firstPlain -ne $secondPlain) {
      Write-Host "Passwords do not match. Try again." -ForegroundColor Yellow
      continue
    }

    return $firstPlain
  }
}

function Invoke-OmniRouteJson {
  param(
    [string]$Path,
    [string]$Method,
    [hashtable]$Body
  )

  $params = @{
    Uri = "http://localhost:$Port$Path"
    Method = $Method
    TimeoutSec = 15
    ErrorAction = "Stop"
  }

  if ($Body) {
    $params.ContentType = "application/json"
    $params.Body = ($Body | ConvertTo-Json -Compress)
  }

  Invoke-RestMethod @params | Out-Null
}

function Wait-OmniRouteHttp {
  Write-Step "Waiting for OmniRoute HTTP server"
  for ($i = 0; $i -lt 90; $i++) {
    try {
      Invoke-WebRequest -UseBasicParsing -Uri "http://localhost:$Port" -TimeoutSec 3 | Out-Null
      return
    } catch {
      Start-Sleep -Seconds 2
    }
  }

  throw "OmniRoute did not become reachable at http://localhost:$Port in time. Check logs with: .\setup-windows.ps1 -Logs"
}

function Complete-NoPasswordSetup {
  Wait-OmniRouteHttp

  try {
    Write-Step "Disabling dashboard login"
    Invoke-OmniRouteJson -Path "/api/settings/require-login" -Method "POST" -Body @{ requireLogin = $false }

    Write-Step "Skipping onboarding wizard"
    Invoke-OmniRouteJson -Path "/api/settings" -Method "PATCH" -Body @{ setupComplete = $true }
  } catch {
    Write-Host "Could not auto-skip onboarding. Open the dashboard and choose skip on the security step." -ForegroundColor Yellow
    Write-Host $_.Exception.Message -ForegroundColor DarkYellow
  }
}

function Test-DockerDaemon {
  docker info *> $null
  return $LASTEXITCODE -eq 0
}

function Test-IsWindows {
  $env:OS -eq "Windows_NT" -or $PSVersionTable.Platform -eq "Win32NT"
}

function Add-DockerCliToPathIfPresent {
  if (-not (Test-IsWindows)) {
    return
  }

  $dockerBin = Join-Path $env:ProgramFiles "Docker\Docker\resources\bin"
  if ((Test-Path -LiteralPath $dockerBin) -and ($env:Path -notlike "*$dockerBin*")) {
    $env:Path = "$dockerBin;$env:Path"
  }
}

function Install-DockerDesktop {
  if (-not (Get-Command winget -ErrorAction SilentlyContinue)) {
    throw "Docker CLI was not found and winget is unavailable. Install Docker Desktop first: https://www.docker.com/products/docker-desktop/"
  }

  Write-Step "Installing Docker Desktop with winget"
  winget install --exact --id Docker.DockerDesktop --accept-source-agreements --accept-package-agreements

  if ($LASTEXITCODE -ne 0) {
    throw "Docker Desktop installation failed. Install it manually: https://www.docker.com/products/docker-desktop/"
  }
}

function Ensure-DockerCli {
  if (Get-Command docker -ErrorAction SilentlyContinue) {
    return
  }

  if (-not (Test-IsWindows)) {
    throw "Docker CLI was not found. Install Docker first: https://docs.docker.com/get-docker/"
  }

  if (-not $InstallDocker) {
    $answer = Read-Host "Docker Desktop is not installed. Install it now with winget? [y/N]"
    if ($answer -notmatch "^(y|yes)$") {
      throw "Docker Desktop is required for Docker setup. Install it from https://www.docker.com/products/docker-desktop/ and run this script again."
    }
  }

  Install-DockerDesktop
  Add-DockerCliToPathIfPresent

  if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    throw "Docker was installed, but the Docker CLI is not available in this PowerShell session yet. Close PowerShell, open it again, then rerun this script."
  }
}

function Start-DockerDesktopIfAvailable {
  if (-not $env:ProgramFiles) {
    return
  }

  $dockerDesktop = Join-Path $env:ProgramFiles "Docker\Docker\Docker Desktop.exe"
  if (Test-Path -LiteralPath $dockerDesktop) {
    Write-Step "Starting Docker Desktop"
    Start-Process -FilePath $dockerDesktop -WindowStyle Hidden
  }
}

function Wait-DockerDaemon {
  if (Test-DockerDaemon) {
    return
  }

  Start-DockerDesktopIfAvailable
  Write-Step "Waiting for Docker daemon"

  for ($i = 0; $i -lt 60; $i++) {
    Start-Sleep -Seconds 2
    if (Test-DockerDaemon) {
      return
    }
  }

  throw "Docker is not running. Open Docker Desktop, wait until it says 'Docker Desktop is running', then run this script again."
}

function Get-ContainerId {
  docker ps -a --filter "name=^/$ContainerName$" --format "{{.ID}}"
}

function Get-RunningContainerId {
  docker ps --filter "name=^/$ContainerName$" --filter "status=running" --format "{{.ID}}"
}

function Get-LanIp {
  try {
    Get-NetIPConfiguration |
      Where-Object { $_.IPv4DefaultGateway -and $_.IPv4Address.IPAddress -notlike "169.254.*" } |
      Select-Object -First 1 -ExpandProperty IPv4Address |
      Select-Object -First 1 -ExpandProperty IPAddress
  } catch {
    $null
  }
}

function Write-AccessInfo {
  Write-Host ""
  Write-Host "OmniRoute is ready:" -ForegroundColor Green
  Write-Host "  Dashboard: http://localhost:$Port"
  Write-Host "  API:       http://localhost:$Port/v1"

  $lanIp = Get-LanIp
  if ($lanIp) {
    Write-Host "  LAN:       http://$lanIp`:$Port"
  }

  Write-Host ""
  if ($RequirePassword -or $InitialPassword) {
    Write-Host "Next: log in with your dashboard password, then open Dashboard -> Providers."
  } else {
    Write-Host "Next: open Dashboard -> Providers. Login and onboarding are disabled for quick local setup."
  }
  Write-Host "Logs: powershell -NoProfile -ExecutionPolicy Bypass -File .\setup-windows.ps1 -Logs"
  Write-Host "Stop: powershell -NoProfile -ExecutionPolicy Bypass -File .\setup-windows.ps1 -Stop"
  Write-Host "Public demo: set a strong password in Settings -> Security before enabling Cloudflare Quick Tunnel."
}

Ensure-DockerCli

Wait-DockerDaemon

if ($Stop) {
  Write-Step "Stopping and removing $ContainerName"
  docker rm -f $ContainerName
  exit $LASTEXITCODE
}

if ($Logs) {
  docker logs -f $ContainerName
  exit $LASTEXITCODE
}

$runningContainerId = Get-RunningContainerId
if ($runningContainerId) {
  Write-Step "$ContainerName is already running"
  if (-not $RequirePassword -and -not $InitialPassword) {
    Complete-NoPasswordSetup
  }
  Write-AccessInfo
  exit 0
}

$containerId = Get-ContainerId
if ($containerId) {
  Write-Step "Starting existing $ContainerName container"
  docker start $ContainerName | Out-Null
  if (-not $RequirePassword -and -not $InitialPassword) {
    Complete-NoPasswordSetup
  }
  Write-AccessInfo
  exit 0
}

$password = Read-InitialPassword

if (-not $NoPull) {
  Write-Step "Pulling $Image"
  docker pull $Image
}

Write-Step "Creating persistent Docker volume $VolumeName"
docker volume create $VolumeName | Out-Null

Write-Step "Starting $ContainerName on port $Port"
$dockerArgs = @(
  "run",
  "-d",
  "--name", $ContainerName,
  "--restart", "unless-stopped",
  "--stop-timeout", "40",
  "-p", "${Port}:20128",
  "-v", "${VolumeName}:/app/data",
  $Image
)

if ($password) {
  $imageArg = $dockerArgs[$dockerArgs.Count - 1]
  $dockerArgs = $dockerArgs[0..($dockerArgs.Count - 2)] + @("-e", "INITIAL_PASSWORD=$password", $imageArg)
}

docker @dockerArgs | Out-Null
if (-not $password) {
  Complete-NoPasswordSetup
}
Write-AccessInfo
