#!/usr/bin/env bash
# scripts/interactive-debate.sh
# Интерактивная связка агентов (Consilium/Debate) через hcom

set -euo pipefail

TOPIC="${1:-"Архитектурное решение для Serpent OS"}"

echo "🔄 Запуск интерактивного консилиума агентов..."
echo "Тема: $TOPIC"
echo "--------------------------------------------------------"

# 1. Запускаем ресёрчера (Gemini 2.5 Flash через TokenSaver)
echo "[1] Запуск Исследователя (Gemini)..."
hcom f gemini-researcher --tag research --model "tokensaver/gemini-2.5-flash"

# 2. Запускаем критика (NVIDIA NIM Llama-3.3-70B через TokenSaver)
echo "[2] Запуск Критика (Llama-3.3-70B)..."
hcom f llama-critic --tag critic --model "tokensaver/llama-3.3-70b"

# 3. Запускаем Архитектора-Судью (Antigravity Proxy: Claude Sonnet 4.6)
echo "[3] Запуск Судьи (Claude Sonnet 4.6)..."
hcom f claude-judge --tag judge --model "antigravity/claude-sonnet-4-6"

echo "--------------------------------------------------------"
echo "📡 Агенты запущены в фоне. Отправляем начальный промт..."

# Инициируем дебаты
hcom send -b @research "RESEARCH TASK: $TOPIC. Дай 3 варианта решения с плюсами и минусами."

echo "💬 Интерактивный режим запущен. Для мониторинга диалога используйте:"
echo "   hcom tail @research @critic @judge"
echo ""
echo "Когда Исследователь закончит, перекиньте его вывод Критику:"
echo "   hcom send -b @critic \"Критикуй это: \$(hcom read @research)\""
