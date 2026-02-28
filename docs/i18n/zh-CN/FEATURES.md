# OmniRoute — 仪表板功能库

🌐 **Languages:** 🇺🇸 [English](../../FEATURES.md) | 🇧🇷 [Português (Brasil)](../pt-BR/FEATURES.md) | 🇪🇸 [Español](../es/FEATURES.md) | 🇫🇷 [Français](../fr/FEATURES.md) | 🇮🇹 [Italiano](../it/FEATURES.md) | 🇷🇺 [Русский](../ru/FEATURES.md) | 🇨🇳 [中文 (简体)](../zh-CN/FEATURES.md) | 🇩🇪 [Deutsch](../de/FEATURES.md) | 🇮🇳 [हिन्दी](../in/FEATURES.md) | 🇹🇭 [ไทย](../th/FEATURES.md) | 🇺🇦 [Українська](../uk-UA/FEATURES.md) | 🇸🇦 [العربية](../ar/FEATURES.md) | 🇯🇵 [日本語](../ja/FEATURES.md) | 🇻🇳 [Tiếng Việt](../vi/FEATURES.md) | 🇧🇬 [Български](../bg/FEATURES.md) | 🇩🇰 [Dansk](../da/FEATURES.md) | 🇫🇮 [Suomi](../fi/FEATURES.md) | 🇮🇱 [עברית](../he/FEATURES.md) | 🇭🇺 [Magyar](../hu/FEATURES.md) | 🇮🇩 [Bahasa Indonesia](../id/FEATURES.md) | 🇰🇷 [한국어](../ko/FEATURES.md) | 🇲🇾 [Bahasa Melayu](../ms/FEATURES.md) | 🇳🇱 [Nederlands](../nl/FEATURES.md) | 🇳🇴 [Norsk](../no/FEATURES.md) | 🇵🇹 [Português (Portugal)](../pt/FEATURES.md) | 🇷🇴 [Română](../ro/FEATURES.md) | 🇵🇱 [Polski](../pl/FEATURES.md) | 🇸🇰 [Slovenčina](../sk/FEATURES.md) | 🇸🇪 [Svenska](../sv/FEATURES.md) | 🇵🇭 [Filipino](../phi/FEATURES.md)

OmniRoute 仪表板每个部分的视觉指南。

---

## 🔌 提供商

管理 AI 提供商连接：OAuth 提供商（Claude Code、Codex、Gemini CLI）、API 密钥提供商（Groq、DeepSeek、OpenRouter）和免费提供商（iFlow、Qwen、Kiro）。

![Providers Dashboard](screenshots/01-providers.png)

---

## 🎨 组合

使用 6 种策略创建模型路由组合：填充优先、循环、二选一、随机、最少使用和成本优化。每个组合都会链接多个模型并自动回退。

![Combos Dashboard](screenshots/02-combos.png)

---

## 📊 分析

全面的使用分析，包括代币消耗、成本估算、活动热图、每周分布图和每个提供商的细分。

![Analytics Dashboard](screenshots/03-analytics.png)

---

## 🏥 系统健康状况

实时监控：正常运行时间、内存、版本、延迟百分位数 (p50/p95/p99)、缓存统计数据和提供商断路器状态。

![Health Dashboard](screenshots/04-health.png)

---

## 🔧 翻译游乐场

用于调试 API 翻译的四种模式：**Playground**（格式转换器）、**Chat Tester**（实时请求）、**Test Bench**（批量测试）和 **Live Monitor**（实时流）。

![Translator Playground](screenshots/05-translator.png)

---

## ⚙️ 设置

常规设置、系统存储、备份管理（导出/导入数据库）、外观（深色/浅色模式）、安全性（包括 API 端点保护和自定义提供程序阻止）、路由、弹性和高级配置。

![Settings Dashboard](screenshots/06-settings.png)

---

## 🔧 CLI 工具

一键配置AI编码工具：Claude Code、Codex CLI、Gemini CLI、OpenClaw、Kilo Code、Antigravity。

![CLI Tools Dashboard](screenshots/07-cli-tools.png)

---

## 📝 请求日志

实时请求记录，并按提供商、模型、帐户和 API 密钥进行过滤。显示状态代码、令牌使用情况、延迟和响应详细信息。

![Usage Logs](screenshots/08-usage.png)

---

## 🌐 API 端点

您的统一 API 端点具有功能细分：聊天完成、嵌入、图像生成、重新排名、音频转录和注册 API 密钥。

![Endpoint Dashboard](screenshots/09-endpoint.png)
