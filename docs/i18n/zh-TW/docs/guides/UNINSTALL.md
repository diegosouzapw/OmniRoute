---
title: "OmniRoute — 解除安裝指南"
version: 3.8.40
lastUpdated: 2026-06-28
---

# OmniRoute — 解除安裝指南

🌐 **語言：** 🇺🇸 [English](./UNINSTALL.md) | 🇧🇷 [Português (Brasil)](../i18n/pt-BR/docs/guides/UNINSTALL.md) | 🇪🇸 [Español](../i18n/es/docs/guides/UNINSTALL.md) | 🇫🇷 [Français](../i18n/fr/docs/guides/UNINSTALL.md) | 🇮🇹 [Italiano](../i18n/it/docs/guides/UNINSTALL.md) | 🇷🇺 [Русский](../i18n/ru/docs/guides/UNINSTALL.md) | 🇨🇳 [中文 (简体)](../i18n/zh-CN/docs/guides/UNINSTALL.md) | 🇩🇪 [Deutsch](../i18n/de/docs/guides/UNINSTALL.md) | 🇮🇳 [हिन्दी](../i18n/in/docs/guides/UNINSTALL.md) | 🇹🇭 [ไทย](../i18n/th/docs/guides/UNINSTALL.md) | 🇺🇦 [Українська](../i18n/uk-UA/docs/guides/UNINSTALL.md) | 🇸🇦 [العربية](../i18n/ar/docs/guides/UNINSTALL.md) | 🇯🇵 [日本語](../i18n/ja/docs/guides/UNINSTALL.md) | 🇻🇳 [Tiếng Việt](../i18n/vi/docs/guides/UNINSTALL.md) | 🇧🇬 [Български](../i18n/bg/docs/guides/UNINSTALL.md) | 🇩🇰 [Dansk](../i18n/da/docs/guides/UNINSTALL.md) | 🇫🇮 [Suomi](../i18n/fi/docs/guides/UNINSTALL.md) | 🇮🇱 [עברית](../i18n/he/docs/guides/UNINSTALL.md) | 🇭🇺 [Magyar](../i18n/hu/docs/guides/UNINSTALL.md) | 🇮🇩 [Bahasa Indonesia](../i18n/id/docs/guides/UNINSTALL.md) | 🇰🇷 [한국어](../i18n/ko/docs/guides/UNINSTALL.md) | 🇲🇾 [Bahasa Melayu](../i18n/ms/docs/guides/UNINSTALL.md) | 🇳🇱 [Nederlands](../i18n/nl/docs/guides/UNINSTALL.md) | 🇳🇴 [Norsk](../i18n/no/docs/guides/UNINSTALL.md) | 🇵🇹 [Português (Portugal)](../i18n/pt/docs/guides/UNINSTALL.md) | 🇷🇴 [Română](../i18n/ro/docs/guides/UNINSTALL.md) | 🇵🇱 [Polski](../i18n/pl/docs/guides/UNINSTALL.md) | 🇸🇰 [Slovenčina](../i18n/sk/docs/guides/UNINSTALL.md) | 🇸🇪 [Svenska](../i18n/sv/docs/guides/UNINSTALL.md) | 🇵🇭 [Filipino](../i18n/phi/docs/guides/UNINSTALL.md) | 🇨🇿 [Čeština](../i18n/cs/docs/guides/UNINSTALL.md) | 🇹🇼 [繁體中文 (臺灣)](../i18n/zh-TW/docs/guides/UNINSTALL.md)

本指南說明如何從系統中徹底移除 OmniRoute。

---

## 快速解除安裝（v3.6.2+）

OmniRoute 提供兩個內建指令碼來進行乾淨的移除：

### 保留資料

```bash
npm run uninstall
```

此指令會移除 OmniRoute 應用程式，但**保留**您的資料庫、設定檔、API 金鑰及供應商設定於 `~/.omniroute/`。若您日後打算重新安裝並保留既有設定，請使用此方式。

### 完整移除

```bash
npm run uninstall:full
```

此指令會移除應用程式，**並永久刪除**所有資料：

- 資料庫（`storage.sqlite`）
- 供應商設定與 API 金鑰
- 備份檔案
- 日誌檔案
- `~/.omniroute/` 目錄中的所有檔案

> ⚠️ **警告：** `npm run uninstall:full` 為不可逆操作。所有供應商連線、組合設定、API 金鑰及使用記錄都將永久刪除。

---

## 手動解除安裝

### NPM 全域安裝

```bash
# 移除全域套件
npm uninstall -g omniroute

# （選擇性）移除資料目錄
rm -rf ~/.omniroute
```

### pnpm 全域安裝

```bash
pnpm uninstall -g omniroute
rm -rf ~/.omniroute
```

### Docker

```bash
# 停止並移除容器
docker stop omniroute
docker rm omniroute

# 移除資料卷（刪除所有資料）
docker volume rm omniroute-data

# （選擇性）移除映像檔
docker rmi diegosouzapw/omniroute:latest
```

### Docker Compose

```bash
# 停止並移除容器
docker compose down

# 一併移除資料卷（刪除所有資料）
docker compose down -v
```

### Electron 桌面應用程式

**Windows：**

- 開啟 `設定 → 應用程式 → OmniRoute → 解除安裝`
- 或從安裝目錄執行 NSIS 解除安裝程式

**macOS：**

- 將 `/Applications` 中的 `OmniRoute.app` 拖入垃圾桶
- 移除資料：`rm -rf ~/Library/Application Support/omniroute`

**Linux：**

- 刪除 AppImage 檔案
- 移除資料：`rm -rf ~/.omniroute`

### 原始碼安裝（git clone）

```bash
# 移除複製的目錄
rm -rf /path/to/omniroute

# （選擇性）移除資料目錄
rm -rf ~/.omniroute
```

---

## 資料目錄

OmniRoute 預設將資料存放於以下位置：

| 平台           | 預設路徑                       | 覆蓋方式                |
| -------------- | ------------------------------ | ----------------------- |
| Linux          | `~/.omniroute/`                | `DATA_DIR` 環境變數     |
| macOS          | `~/.omniroute/`                | `DATA_DIR` 環境變數     |
| Windows        | `%APPDATA%/omniroute/`         | `DATA_DIR` 環境變數     |
| Docker         | `/app/data/`（掛載資料卷）     | `DATA_DIR` 環境變數     |
| XDG 相容模式   | `$XDG_CONFIG_HOME/omniroute/`  | `XDG_CONFIG_HOME` 環境變數 |

### 資料目錄中的檔案

| 檔案/目錄             | 說明                                    |
| --------------------- | --------------------------------------- |
| `storage.sqlite`      | 主要資料庫（供應商、組合、設定、金鑰）  |
| `storage.sqlite-wal`  | SQLite 預寫式日誌（暫存）               |
| `storage.sqlite-shm`  | SQLite 共享記憶體（暫存）               |
| `call_logs/`          | 請求承載記錄封存                        |
| `backups/`            | 自動資料庫備份                          |
| `log.txt`             | 舊版請求日誌（選用）                    |

---

## 驗證是否完整移除

解除安裝後，請確認無殘留檔案：

```bash
# 檢查全域 npm 套件
npm list -g omniroute 2>/dev/null

# 檢查資料目錄
ls -la ~/.omniroute/ 2>/dev/null

# 檢查正在執行的程序
pgrep -f omniroute
```

若仍有程序在執行，請將其停止：

```bash
pkill -f omniroute
```
