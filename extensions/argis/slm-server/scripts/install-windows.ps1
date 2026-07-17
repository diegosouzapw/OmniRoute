# PowerShell script to install slm-server on Windows
# Run as: .\scripts\install-windows.ps1
#
# This will:
# 1. Download the latest release
# 2. Install to C:\slm-server
# 3. Create a scheduled task to run on startup

param(
    [string]$InstallDir = "C:\slm-server",
    [string]$VllmUrl = "http://localhost:8000",
    [switch]$NoStartupTask
)

$ErrorActionPreference = "Stop"

Write-Host "=== SLM Server Windows Installer ===" -ForegroundColor Cyan
Write-Host ""

# Get latest release from GitHub
$repo = "kooshapari/bifrost-extensions"
$apiUrl = "https://api.github.com/repos/$repo/releases/latest"

Write-Host "Fetching latest release..."
try {
    $release = Invoke-RestMethod -Uri $apiUrl -Headers @{"User-Agent"="PowerShell"}
    $version = $release.tag_name
    Write-Host "Latest version: $version" -ForegroundColor Green
} catch {
    Write-Host "Failed to fetch release info. Using manual download." -ForegroundColor Yellow
    Write-Host "Download from: https://github.com/$repo/releases/latest"
    exit 1
}

# Find Windows amd64 asset
$asset = $release.assets | Where-Object { $_.name -like "*windows_amd64.zip" } | Select-Object -First 1
if (-not $asset) {
    Write-Host "Error: Windows release not found" -ForegroundColor Red
    exit 1
}

# Create install directory
Write-Host ""
Write-Host "Installing to: $InstallDir"
if (-not (Test-Path $InstallDir)) {
    New-Item -ItemType Directory -Path $InstallDir -Force | Out-Null
}

# Download and extract
$zipPath = Join-Path $env:TEMP "slm-server.zip"
Write-Host "Downloading $($asset.name)..."
Invoke-WebRequest -Uri $asset.browser_download_url -OutFile $zipPath

Write-Host "Extracting..."
Expand-Archive -Path $zipPath -DestinationPath $InstallDir -Force
Remove-Item $zipPath

# Create config file
$configPath = Join-Path $InstallDir "config.txt"
@"
# SLM Server Configuration
# Edit this file to change settings

VLLM_URL=$VllmUrl
PORT=8081
"@ | Out-File -FilePath $configPath -Encoding UTF8

# Create start script
$startScript = Join-Path $InstallDir "start.bat"
@"
@echo off
cd /d "$InstallDir"
slm-server.exe -vllm-url $VllmUrl -addr :8081
pause
"@ | Out-File -FilePath $startScript -Encoding ASCII

Write-Host ""
Write-Host "=== Installation Complete ===" -ForegroundColor Green
Write-Host ""
Write-Host "Files installed to: $InstallDir"
Write-Host ""
Write-Host "To start manually:"
Write-Host "  $startScript" -ForegroundColor Yellow
Write-Host ""
Write-Host "Or run directly:"
Write-Host "  $InstallDir\slm-server.exe -vllm-url $VllmUrl" -ForegroundColor Yellow
Write-Host ""
Write-Host "Update UI available at: http://localhost:8081/update"
Write-Host ""

# Create startup task (optional)
if (-not $NoStartupTask) {
    Write-Host "Creating startup task..."
    $taskName = "SLM-Server"
    $exePath = Join-Path $InstallDir "slm-server.exe"
    $action = New-ScheduledTaskAction -Execute $exePath -Argument "-vllm-url $VllmUrl -addr :8081" -WorkingDirectory $InstallDir
    $trigger = New-ScheduledTaskTrigger -AtLogon
    $settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries
    
    # Remove existing task if present
    Unregister-ScheduledTask -TaskName $taskName -Confirm:$false -ErrorAction SilentlyContinue
    
    Register-ScheduledTask -TaskName $taskName -Action $action -Trigger $trigger -Settings $settings -Description "SLM Server for Bifrost" | Out-Null
    Write-Host "Startup task '$taskName' created." -ForegroundColor Green
    Write-Host "The server will start automatically when you log in."
}

Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Start vLLM in WSL2: wsl ~/start-vllm.sh"
Write-Host "2. Start slm-server: $startScript"
Write-Host "3. Open update UI: http://localhost:8081/update"

