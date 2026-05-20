# OmniRoute tray icon for Windows using NotifyIcon (zero binary, AV-safe)
# IPC: stdin JSON commands, stdout JSON events
param([string]$IconPath, [string]$Tooltip)

Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

$ErrorActionPreference = "Stop"
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
[Console]::InputEncoding = [System.Text.Encoding]::UTF8
$OutputEncoding = [System.Text.Encoding]::UTF8

$script:notifyIcon = New-Object System.Windows.Forms.NotifyIcon
if ($IconPath -and (Test-Path $IconPath)) {
  if ($IconPath.ToLower().EndsWith('.ico')) {
    $script:notifyIcon.Icon = New-Object System.Drawing.Icon($IconPath)
  } else {
    # Accepts .png and other bitmap formats via GDI+ handle conversion
    $bitmap = New-Object System.Drawing.Bitmap($IconPath)
    $handle = $bitmap.GetHicon()
    $script:notifyIcon.Icon = [System.Drawing.Icon]::FromHandle($handle)
    $bitmap.Dispose()
  }
} else {
  $script:notifyIcon.Icon = [System.Drawing.SystemIcons]::Application
}
$script:notifyIcon.Text = $Tooltip
$script:notifyIcon.Visible = $true

$script:menu = New-Object System.Windows.Forms.ContextMenuStrip
$script:notifyIcon.ContextMenuStrip = $script:menu
$script:items = @()

function Write-Event($obj) {
  $json = $obj | ConvertTo-Json -Compress
  [Console]::Out.WriteLine($json)
  [Console]::Out.Flush()
}

function Add-MenuItem($index, $title, $enabled) {
  $item = New-Object System.Windows.Forms.ToolStripMenuItem
  $item.Text = $title
  $item.Enabled = $enabled
  $idx = $index
  $item.Add_Click({ Write-Event @{ type = "click"; index = $idx } }.GetNewClosure())
  $script:menu.Items.Add($item) | Out-Null
  $script:items += $item
}

function Update-MenuItem($index, $title, $enabled) {
  if ($index -lt $script:items.Count) {
    $script:items[$index].Text = $title
    $script:items[$index].Enabled = $enabled
  }
}

function Set-Tooltip($text) {
  if ($text.Length -gt 63) { $text = $text.Substring(0, 63) }
  $script:notifyIcon.Text = $text
}

# Read commands from stdin on a timer to keep the Windows message loop alive
$reader = [Console]::In
$script:running = $true
$timer = New-Object System.Windows.Forms.Timer
$timer.Interval = 100
$timer.Add_Tick({
  while ($reader.Peek() -ge 0) {
    $line = $reader.ReadLine()
    if ($null -eq $line) {
      $script:notifyIcon.Visible = $false
      [System.Windows.Forms.Application]::Exit()
      return
    }
    try {
      $cmd = $line | ConvertFrom-Json
      switch ($cmd.type) {
        "setMenu" {
          $script:menu.Items.Clear()
          $script:items = @()
          for ($i = 0; $i -lt $cmd.items.Count; $i++) {
            $it = $cmd.items[$i]
            Add-MenuItem $i $it.title $it.enabled
          }
        }
        "updateItem" { Update-MenuItem $cmd.index $cmd.title $cmd.enabled }
        "setTooltip" { Set-Tooltip $cmd.text }
        "quit" {
          $script:notifyIcon.Visible = $false
          [System.Windows.Forms.Application]::Exit()
        }
      }
    } catch {}
  }
})
$timer.Start()

Write-Event @{ type = "ready" }
[System.Windows.Forms.Application]::Run()
