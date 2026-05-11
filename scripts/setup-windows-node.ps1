param(
  [int]$Port = 20128,
  [string]$RepoUrl = "https://github.com/VusalAbdurahmanovX/OmniRoute.git",
  [string]$InstallDir = (Join-Path $env:USERPROFILE "OmniRoute-node"),
  [switch]$InstallNode,
  [switch]$NoStart,
  [switch]$Stop,
  [switch]$Logs
)

$ErrorActionPreference = "Stop"

function Write-Step {
  param([string]$Message)
  Write-Host "==> $Message" -ForegroundColor Cyan
}

function Test-IsWindows {
  $env:OS -eq "Windows_NT" -or $PSVersionTable.Platform -eq "Win32NT"
}

function Add-CommonToolsToPath {
  if (-not (Test-IsWindows)) {
    return
  }

  $paths = @(
    (Join-Path $env:ProgramFiles "nodejs"),
    (Join-Path $env:ProgramFiles "Git\cmd"),
    (Join-Path $env:ProgramFiles "Git\bin")
  )

  foreach ($path in $paths) {
    if ((Test-Path -LiteralPath $path) -and ($env:Path -notlike "*$path*")) {
      $env:Path = "$path;$env:Path"
    }
  }
}

function Install-WithWinget {
  param(
    [string]$PackageId,
    [string]$DisplayName
  )

  if (-not (Get-Command winget -ErrorAction SilentlyContinue)) {
    throw "$DisplayName is required, but winget is unavailable. Install it manually and rerun this script."
  }

  Write-Step "Installing $DisplayName with winget"
  winget install --exact --id $PackageId --accept-source-agreements --accept-package-agreements
  if ($LASTEXITCODE -ne 0) {
    throw "$DisplayName installation failed. Install it manually and rerun this script."
  }
}

function Get-NodeVersion {
  if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    return $null
  }

  try {
    [version](node --version).TrimStart("v")
  } catch {
    $null
  }
}

function Test-NodeVersionSupported {
  param([version]$Version)

  if (-not $Version) {
    return $false
  }

  (($Version -ge [version]"20.20.2") -and ($Version -lt [version]"21.0.0")) -or
    (($Version -ge [version]"22.22.2") -and ($Version -lt [version]"23.0.0")) -or
    (($Version -ge [version]"24.0.0") -and ($Version -lt [version]"27.0.0"))
}

function Ensure-Node {
  Add-CommonToolsToPath
  $version = Get-NodeVersion
  if (Test-NodeVersionSupported -Version $version) {
    return
  }

  if (-not (Test-IsWindows)) {
    throw "Node.js 20.20.2+, 22.22.2+, or 24+ is required. Install Node.js first: https://nodejs.org/"
  }

  if (-not $InstallNode) {
    $answer = Read-Host "Node.js is missing or unsupported. Install Node.js LTS with winget? [y/N]"
    if ($answer -notmatch "^(y|yes)$") {
      throw "Node.js 20.20.2+, 22.22.2+, or 24+ is required. Install Node.js from https://nodejs.org/ and rerun this script."
    }
  }

  Install-WithWinget -PackageId "OpenJS.NodeJS.LTS" -DisplayName "Node.js LTS"
  Add-CommonToolsToPath

  if (-not (Test-NodeVersionSupported -Version (Get-NodeVersion))) {
    throw "Node.js was installed, but this PowerShell session cannot see it yet. Close PowerShell, open it again, and rerun this script."
  }
}

function Ensure-Npm {
  Add-CommonToolsToPath
  if (Get-Command npm -ErrorAction SilentlyContinue) {
    return
  }

  if (-not (Test-IsWindows)) {
    throw "npm is required. Reinstall Node.js from https://nodejs.org/ and rerun this script."
  }

  if (-not $InstallNode) {
    $answer = Read-Host "npm is missing. Reinstall Node.js LTS with winget? [y/N]"
    if ($answer -notmatch "^(y|yes)$") {
      throw "npm is required. Install Node.js LTS from https://nodejs.org/ and rerun this script."
    }
  }

  Install-WithWinget -PackageId "OpenJS.NodeJS.LTS" -DisplayName "Node.js LTS"
  Add-CommonToolsToPath

  if (-not (Get-Command npm -ErrorAction SilentlyContinue)) {
    throw "Node.js is installed, but npm is not visible in this PowerShell session. Close PowerShell, open it again, and rerun this script."
  }
}

function Ensure-Git {
  Add-CommonToolsToPath
  if (Get-Command git -ErrorAction SilentlyContinue) {
    return
  }

  if (-not (Test-IsWindows)) {
    throw "Git is required to download the source. Install Git first: https://git-scm.com/downloads"
  }

  Install-WithWinget -PackageId "Git.Git" -DisplayName "Git"
  Add-CommonToolsToPath

  if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    throw "Git was installed, but this PowerShell session cannot see it yet. Close PowerShell, open it again, and rerun this script."
  }
}

function Test-OmniRouteRepo {
  param([string]$Path)
  (Test-Path -LiteralPath (Join-Path $Path "package.json")) -and
    (Test-Path -LiteralPath (Join-Path $Path "scripts\run-next.mjs"))
}

function Resolve-RepoDir {
  if (Test-OmniRouteRepo -Path (Get-Location).Path) {
    return (Get-Location).Path
  }

  if (Test-OmniRouteRepo -Path $InstallDir) {
    return (Resolve-Path -LiteralPath $InstallDir).Path
  }

  if (Test-Path -LiteralPath $InstallDir) {
    throw "Install directory exists but is not an OmniRoute repo: $InstallDir"
  }

  Ensure-Git
  Write-Step "Cloning OmniRoute source"
  git clone $RepoUrl $InstallDir
  if ($LASTEXITCODE -ne 0) {
    throw "Git clone failed."
  }

  (Resolve-Path -LiteralPath $InstallDir).Path
}

function Get-Paths {
  param([string]$RepoDir)
  $logDir = Join-Path $RepoDir "logs"
  $logFile = Join-Path $logDir "node-dev.log"
  $pidFile = Join-Path $RepoDir ".omniroute-node.pid"
  [PSCustomObject]@{ LogDir = $logDir; LogFile = $logFile; PidFile = $pidFile }
}

function Get-ServerProcessFromPidFile {
  param([string]$RepoDir)
  $paths = Get-Paths -RepoDir $RepoDir
  if (-not (Test-Path -LiteralPath $paths.PidFile)) {
    return $null
  }

  $rawPid = (Get-Content -LiteralPath $paths.PidFile -Raw -ErrorAction SilentlyContinue).Trim()
  $serverPid = 0
  if (-not [int]::TryParse($rawPid, [ref]$serverPid)) {
    Remove-Item -LiteralPath $paths.PidFile -Force -ErrorAction SilentlyContinue
    return $null
  }

  $process = Get-Process -Id $serverPid -ErrorAction SilentlyContinue
  if (-not $process) {
    Remove-Item -LiteralPath $paths.PidFile -Force -ErrorAction SilentlyContinue
    return $null
  }

  $process
}

function Stop-ProcessTree {
  param([int]$ProcessId)

  $children = @(Get-CimInstance Win32_Process -Filter "ParentProcessId=$ProcessId" -ErrorAction SilentlyContinue)
  foreach ($child in $children) {
    Stop-ProcessTree -ProcessId ([int]$child.ProcessId)
  }

  $process = Get-Process -Id $ProcessId -ErrorAction SilentlyContinue
  if ($process) {
    Stop-Process -Id $ProcessId -Force -ErrorAction SilentlyContinue
  }
}

function Stop-ExistingServer {
  param([string]$RepoDir)
  $paths = Get-Paths -RepoDir $RepoDir
  $process = Get-ServerProcessFromPidFile -RepoDir $RepoDir
  if (-not $process) {
    Write-Host "No OmniRoute Node server PID file found."
    Remove-Item -LiteralPath $paths.PidFile -Force -ErrorAction SilentlyContinue
    return
  }

  Write-Step "Stopping OmniRoute Node server"
  Stop-ProcessTree -ProcessId $process.Id

  Remove-Item -LiteralPath $paths.PidFile -Force -ErrorAction SilentlyContinue
}

function Show-Logs {
  param([string]$RepoDir)
  $paths = Get-Paths -RepoDir $RepoDir
  if (-not (Test-Path -LiteralPath $paths.LogFile)) {
    Write-Host "No log file yet: $($paths.LogFile)"
    return
  }

  Get-Content -LiteralPath $paths.LogFile -Tail 120 -Wait
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
  for ($i = 0; $i -lt 120; $i++) {
    try {
      Invoke-WebRequest -UseBasicParsing -Uri "http://localhost:$Port" -TimeoutSec 3 | Out-Null
      return
    } catch {
      Start-Sleep -Seconds 2
    }
  }

  throw "OmniRoute did not become reachable at http://localhost:$Port in time. Check logs with: .\setup-windows-node.ps1 -Logs"
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

function Install-Dependencies {
  param([string]$RepoDir)
  Write-Step "Installing Node dependencies"
  Push-Location $RepoDir
  try {
    npm install
    if ($LASTEXITCODE -ne 0) {
      throw "npm install failed."
    }
  } finally {
    Pop-Location
  }
}

function Start-NodeServer {
  param([string]$RepoDir)
  $paths = Get-Paths -RepoDir $RepoDir
  New-Item -ItemType Directory -Force -Path $paths.LogDir | Out-Null

  $existingProcess = Get-ServerProcessFromPidFile -RepoDir $RepoDir
  if ($existingProcess) {
    Write-Step "OmniRoute Node server is already running (PID $($existingProcess.Id))"
    return
  }

  $escapedRepo = $RepoDir.Replace("'", "''")
  $escapedLog = $paths.LogFile.Replace("'", "''")
  $command = @"
Set-Location -LiteralPath '$escapedRepo'
`$env:PORT = '$Port'
`$env:DASHBOARD_PORT = '$Port'
`$env:OMNIROUTE_USE_TURBOPACK = '1'
npm run dev *>> '$escapedLog'
"@

  $encoded = [Convert]::ToBase64String([Text.Encoding]::Unicode.GetBytes($command))
  Write-Step "Starting OmniRoute without Docker"
  $process = Start-Process -FilePath "powershell.exe" -ArgumentList @(
    "-NoProfile",
    "-ExecutionPolicy",
    "Bypass",
    "-EncodedCommand",
    $encoded
  ) -WindowStyle Hidden -PassThru

  Set-Content -LiteralPath $paths.PidFile -Value $process.Id
}

$repoForCommand = Resolve-RepoDir

if ($Stop) {
  Stop-ExistingServer -RepoDir $repoForCommand
  exit 0
}

if ($Logs) {
  Show-Logs -RepoDir $repoForCommand
  exit 0
}

Ensure-Node
Ensure-Npm
Install-Dependencies -RepoDir $repoForCommand

if (-not $NoStart) {
  Start-NodeServer -RepoDir $repoForCommand
  Complete-NoPasswordSetup
}

Write-Host ""
Write-Host "OmniRoute is ready without Docker:" -ForegroundColor Green
Write-Host "  Dashboard: http://localhost:$Port"
Write-Host "  API:       http://localhost:$Port/v1"
Write-Host "  Source:    $repoForCommand"
Write-Host ""
Write-Host "Logs: powershell -NoProfile -ExecutionPolicy Bypass -File .\setup-windows-node.ps1 -Logs"
Write-Host "Stop: powershell -NoProfile -ExecutionPolicy Bypass -File .\setup-windows-node.ps1 -Stop"
