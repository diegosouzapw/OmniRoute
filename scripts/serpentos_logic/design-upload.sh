#!/usr/bin/env bash
# design-upload.sh — Загрузка дизайн-файлов в serpent-design-system GCS бакет
# Использование:
#   ./scripts/design-upload.sh                    — загрузить все новые файлы с Desktop
#   ./scripts/design-upload.sh /path/to/file.png  — загрузить конкретный файл
#   ./scripts/design-upload.sh --config           — обновить animation-config.json
#
# Структура бакета:
#   gs://serpent-design-system/
#   ├── references/   ← скриншоты femalefaces, grid9, ectic (дизайн-референсы)
#   ├── assets/       ← логотипы, медиа-файлы проекта
#   └── configs/      ← animation-config.json (параметры GSAP, тема)

set -euo pipefail

BUCKET="gs://serpent-design-system"
GCLOUD="/Users/work/google-cloud-sdk/bin/gcloud"

# Цвета
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}🪣 serpent-design-system GCS uploader${NC}"
echo ""

# --- Режим: конкретный файл ---
if [[ $# -ge 1 && "$1" != "--"* ]]; then
  FILE="$1"
  FOLDER="${2:-references}"
  FILENAME=$(basename "$FILE")
  echo -e "${YELLOW}↑ Uploading: $FILENAME → $BUCKET/$FOLDER/${NC}"
  $GCLOUD storage cp "$FILE" "$BUCKET/$FOLDER/$FILENAME"
  echo -e "${GREEN}✅ Done: gs://serpent-design-system/$FOLDER/$FILENAME${NC}"
  echo ""
  echo "🔗 Ссылка для Vertex AI:"
  echo "   gs://serpent-design-system/$FOLDER/$FILENAME"
  exit 0
fi

# --- Режим: обновить config ---
if [[ $# -ge 1 && "$1" == "--config" ]]; then
  CONFIG_FILE="/tmp/animation-config.json"
  cat > "$CONFIG_FILE" << 'EOF'
{
  "project": "ectic",
  "theme": "brutalist-bw",
  "goldenRatio": 1.618,
  "menuBorderWidth": 4,
  "menuFontSize": 56,
  "menuPaddingY": 32,
  "menuUppercase": true,
  "menuLetterSpacing": "0.12em",
  "animDuration": 0.4,
  "animStagger": 0.04,
  "animEase": "power3.out",
  "splashDuration": 2.2,
  "splashLogoScale": [0.7, 1.0],
  "splashCurtainEase": "power3.inOut",
  "invertTheme": false,
  "invertCanvasFilter": "invert(1)"
}
EOF
  echo -e "${YELLOW}↑ Updating animation-config.json...${NC}"
  $GCLOUD storage cp "$CONFIG_FILE" "$BUCKET/configs/animation-config.json"
  echo -e "${GREEN}✅ Config updated: gs://serpent-design-system/configs/animation-config.json${NC}"
  exit 0
fi

# --- Режим: все свежие файлы с Desktop ---
DESKTOP="/Users/work/Desktop"
UPLOADED=0

echo -e "${YELLOW}📂 Сканирую Desktop на дизайн-файлы...${NC}"
echo ""

# Загружаем PNG и JPG за последние 7 дней
while IFS= read -r -d '' file; do
  filename=$(basename "$file")
  ext="${filename##*.}"
  
  # Пропускаем системные файлы
  if [[ "$filename" == .* ]]; then continue; fi
  
  # Определяем папку по контексту имени
  if [[ "$filename" == *"femalefaces"* ]] || [[ "$filename" == *"grid9"* ]] || [[ "$filename" == *"ref"* ]]; then
    folder="references"
  elif [[ "$filename" == *"ectic"* ]] || [[ "$filename" == *"logo"* ]]; then
    folder="assets"
  else
    folder="references"
  fi
  
  echo -e "  ${BLUE}↑${NC} $filename → $folder/"
  $GCLOUD storage cp "$file" "$BUCKET/$folder/$filename" 2>/dev/null && UPLOADED=$((UPLOADED + 1))

done < <(find "$DESKTOP" -maxdepth 1 \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" \) -newer "$DESKTOP/../Library" -print0 2>/dev/null)

echo ""
echo -e "${GREEN}✅ Загружено файлов: $UPLOADED${NC}"
echo ""
echo "📋 Содержимое бакета:"
$GCLOUD storage ls "$BUCKET" --recursive 2>/dev/null | head -30
