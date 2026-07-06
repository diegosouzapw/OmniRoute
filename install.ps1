#!/usr/bin/env pwsh
# install.ps1 — Install ArgisMonitor (formerly omniroute) on Windows / PowerShell
#
# Usage:
#   # Local install (default):
#   iwr -useb https://argismonitor.phenotype.space/install.ps1 | iex
#
#   # Pin a specific version:
#   iwr -useb https://argismonitor.phenotype.space/install.ps1 | iex - -Version 1.2.3
#
#   # Local install (no download):
#   pwsh ./install.ps1 -Local
#
# This script:
#   1. Installs the ArgisMonitor CLI (npm package `argismonitor`) globally via npm.
#   2. Optionally registers the legacy `omniroute` alias (symlink) so old commands
#      keep working during the deprecation window.
#   3. Verifies the install by running `argismonitor --version`.
#
# Requires: Node.js 20+ on PATH, npm 10+ on PATH.

[CmdletBinding()]
param(
    [string]$Version,
    [switch]$Local,
    [switch]$SkipOmnirouteAlias,
    [switch]$SkipUpdateCheck
)

$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"   # Faster, cleaner output

function Write-Step($msg) { Write-Host "  → $msg" -ForegroundColor Cyan }
function Write-OK($msg)   { Write-Host "  ✓ $msg" -ForegroundColor Green }
function Write-Warn($msg) { Write-Host "  ⚠ $msg" -ForegroundColor Yellow }
function Write-Err($msg)  { Write-Host "  ✖ $msg" -ForegroundColor Red }

# 1) Node + npm sanity
try {
    $nodeVersion = node -v
    $npmVersion  = npm -v
} catch {
    Write-Err "Node.js / npm not found on PATH."
    Write-Host "    Install Node.js 20+ first: https://nodejs.org/"
    exit 1
}
Write-OK "node $nodeVersion, npm $npmVersion"

# 2) Install ArgisMonitor globally
$pkg = if ($Version) { "argismonitor@$Version" } else { "argismonitor@latest" }
Write-Step "Installing $pkg globally..."
if ($Local) {
    # Local install: cwd has the cloned repo; link the bin instead of pulling from npm.
    if (-not (Test-Path "package.json")) {
        Write-Err "Local install requires running from the repo root (no package.json here)."
        exit 1
    }
    npm link
} else {
    npm install -g $pkg --no-audit --no-fund
}
Write-OK "Installed $pkg"

# 3) Optional: register legacy `omniroute` alias
#    The npm package already ships bin/omniroute.mjs as a shim, so npm installs
#    both bins. This step is a no-op on a clean install; it's here for users
#    who have an old `omniroute` install they want to keep working.
if (-not $SkipOmnirouteAlias) {
    $argisBin  = (Get-Command argismonitor -ErrorAction SilentlyContinue).Source
    $omniBin   = (Get-Command omniroute -ErrorAction SilentlyContinue).Source
    if ($argisBin -and -not $omniBin) {
        Write-Warn "`omniroute` not on PATH — creating a compatibility symlink."
        $omniPath = Join-Path (Split-Path $argisBin) "omniroute.cmd"
        Copy-Item $argisBin $omniPath -Force
        Write-OK "Created $omniPath"
    } else {
        Write-OK "`omniroute` alias already present."
    }
}

# 4) Verify
$ver = & argismonitor --version 2>&1 | Select-Object -First 1
if ($LASTEXITCODE -ne 0) {
    Write-Err "argismonitor --version failed."
    exit 1
}
Write-OK "argismonitor reports version: $ver"

# 5) Optional: notify about update channel
if (-not $SkipUpdateCheck -and -not $Local) {
    $latest = (npm view argismonitor version 2>$null) | Out-String
    if ($latest -and $latest.Trim() -ne $Version) {
        Write-Host "  ℹ latest npm version is $latest (you have $ver)" -ForegroundColor Magenta
    }
}

Write-Host ""
Write-Host "  🎉 ArgisMonitor installed." -ForegroundColor Green
Write-Host "     Try:  argismonitor --help" -ForegroundColor Green
Write-Host "     Docs: https://argismonitor.phenotype.space" -ForegroundColor Green
Write-Host "     Old command still works: omniroute --help   (deprecated, will be removed)" -ForegroundColor DarkGray