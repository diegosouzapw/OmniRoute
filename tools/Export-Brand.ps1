<#
.SYNOPSIS
    Export the AI-coded AgilePlus SVG brand mark to PNG/JPG/ICO raster assets.

.DESCRIPTION
    AI-CODED brand pipeline: the source of truth is a hand-authored SVG
    (assets/brand/logo.svg). No image-generation model is involved. This
    script rasterizes that vector base into the formats consumers need:
      - logo-<size>.png  for 16/32/48/128/256/512
      - logo.png         (canonical 512 copy)
      - logo.jpg         (512, white matte)
      - app.ico          multi-resolution Windows icon (16/32/48/256)
                         feeds the Start-Menu / desktop shortcut.

    Renderer preference (matches the Civis pure-Rust SVG convention,
    RND-016: resvg + string-templated SVG):
      1. resvg        (cargo install resvg) - canonical, pure Rust, deterministic
      2. rsvg-convert (librsvg)             - fallback
      3. magick       (ImageMagick)         - fallback
      4. cairosvg/PIL (Python)              - fallback
    ICO + JPG assembly uses ImageMagick when present, else Python/Pillow.

.PARAMETER Svg
    Path to the source SVG. Defaults to assets/brand/logo.svg.

.PARAMETER OutDir
    Output directory. Defaults to assets/brand.
#>
[CmdletBinding()]
param(
    [string]$Svg    = (Join-Path $PSScriptRoot '..\assets\brand\logo.svg'),
    [string]$OutDir = (Join-Path $PSScriptRoot '..\assets\brand')
)

$ErrorActionPreference = 'Stop'
$Svg    = (Resolve-Path $Svg).Path
$OutDir = (Resolve-Path $OutDir).Path
$sizes  = @(16, 32, 48, 128, 256, 512)

function Find-Tool([string]$name) {
    $c = Get-Command $name -ErrorAction SilentlyContinue
    if ($c) { return $c.Source }
    $cargoBin = Join-Path $HOME ".cargo\bin\$name.exe"
    if (Test-Path $cargoBin) { return $cargoBin }
    return $null
}

$resvg = Find-Tool 'resvg'
$rsvg  = Find-Tool 'rsvg-convert'
$magick= Find-Tool 'magick'
$python= Find-Tool 'python'

function Convert-SvgToPng([string]$src, [string]$dst, [int]$w, [int]$h) {
    if ($resvg)  { & $resvg  -w $w -h $h $src $dst; return }
    if ($rsvg)   { & $rsvg   -w $w -h $h $src -o $dst; return }
    if ($magick) { & $magick -background none -density 384 $src -resize "${w}x${h}" $dst; return }
    if ($python) {
        & $python -c "import cairosvg; cairosvg.svg2png(url=r'$src', write_to=r'$dst', output_width=$w, output_height=$h)"
        return
    }
    throw "No SVG renderer found (resvg / rsvg-convert / magick / python+cairosvg)."
}

$activeRenderer = @($resvg, $rsvg, $magick) | Where-Object { $_ } | Select-Object -First 1
Write-Host "Renderer: $activeRenderer"
Write-Host "Source  : $Svg"

# 1) PNGs at every size
$pngBySize = @{}
foreach ($s in $sizes) {
    $dst = Join-Path $OutDir "logo-$s.png"
    Convert-SvgToPng $Svg $dst $s $s
    $pngBySize[$s] = $dst
    Write-Host "  PNG  $s`tx$s -> $(Split-Path $dst -Leaf)"
}
Copy-Item $pngBySize[512] (Join-Path $OutDir 'logo.png') -Force

# 2) JPG (white matte, 512)
$jpg = Join-Path $OutDir 'logo.jpg'
if ($magick) {
    & $magick $pngBySize[512] -background white -flatten -quality 92 $jpg
} elseif ($python) {
    & $python -c "from PIL import Image; im=Image.open(r'$($pngBySize[512])').convert('RGBA'); bg=Image.new('RGB',im.size,(255,255,255)); bg.paste(im,mask=im.split()[3]); bg.save(r'$jpg',quality=92)"
} else { throw 'No tool to build JPG (need magick or python+PIL).' }
Write-Host "  JPG  -> logo.jpg"

# 3) Multi-resolution ICO (16/32/48/256) for Windows shortcuts
$ico = Join-Path $OutDir 'app.ico'
$icoSizes = @(16, 32, 48, 256)
if ($magick) {
    $inputs = $icoSizes | ForEach-Object { $pngBySize[$_] }
    & $magick $inputs $ico
} elseif ($python) {
    $list = ($icoSizes | ForEach-Object { "($_,$_)" }) -join ','
    & $python -c "from PIL import Image; Image.open(r'$($pngBySize[256])').save(r'$ico', sizes=[$list])"
} else { throw 'No tool to build ICO (need magick or python+PIL).' }
Write-Host "  ICO  -> app.ico ($([string]::Join('/', $icoSizes)))"

Write-Host "`nDone. Assets in $OutDir"
