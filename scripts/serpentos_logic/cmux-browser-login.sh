#!/usr/bin/env bash
# cmux-browser-login.sh — Автоматический запуск и вход в Shotdeck через cmux browser по умолчанию
# Профиль: misha (orelmisha666@gmail.com)
# Также предоставляет помощник импорта авторизаций из Chrome в cmux

set -euo pipefail

URL="https://shotdeck.com/welcome/login"
EMAIL="orelmisha666@gmail.com"

echo "🌐 [cmux browser] Открываем $URL в профиле по умолчанию (misha)..."
cmux browser open "$URL" --focus true || true

echo "📧 [cmux browser] Автозаполнение email: $EMAIL..."
cmux browser fill --selector 'input[type="email"], input[name*="email" i], input[placeholder*="email" i]' --text "$EMAIL" 2>/dev/null || \
cmux eval --script "
  const el = document.querySelector('input[type=email], input[name*=email i], input[placeholder*=email i]');
  if (el) {
    el.value = '$EMAIL';
    el.dispatchEvent(new Event('input', {bubbles: true}));
    el.dispatchEvent(new Event('change', {bubbles: true}));
  }
" 2>/dev/null || true

echo "✅ [cmux browser] Форма входа Shotdeck открыта с email $EMAIL."
echo "💡 Для импорта паролей и сессий из Chrome в cmux:"
echo "   1. Войдите в Shotdeck или используйте менеджер паролей / Keychain в cmux WebView."
echo "   2. Профиль cmux 'slava' сохраняет сессии в ~/Library/Containers/com.cmuxterm.app/Data/Library/WebKit/WebsiteData/."
