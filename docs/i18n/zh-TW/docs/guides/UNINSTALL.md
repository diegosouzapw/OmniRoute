---
title: "OmniRoute — 解除安裝指南"
version: 3.8.40
lastUpdated: 2026-06-28
---

# OmniRoute — 解除安裝指南

🌐 **Languages:** 🇺🇸 [English](../../../../guides/UNINSTALL.md) · 🇸🇦 [ar](../../../ar/docs/guides/UNINSTALL.md) · 🇦🇿 [az](../../../az/docs/guides/UNINSTALL.md) · 🇧🇬 [bg](../../../bg/docs/guides/UNINSTALL.md) · 🇧🇩 [bn](../../../bn/docs/guides/UNINSTALL.md) · 🇨🇿 [cs](../../../cs/docs/guides/UNINSTALL.md) · 🇩🇰 [da](../../../da/docs/guides/UNINSTALL.md) · 🇩🇪 [de](../../../de/docs/guides/UNINSTALL.md) · 🇪🇸 [es](../../../es/docs/guides/UNINSTALL.md) · 🇮🇷 [fa](../../../fa/docs/guides/UNINSTALL.md) · 🇫🇮 [fi](../../../fi/docs/guides/UNINSTALL.md) · 🇫🇷 [fr](../../../fr/docs/guides/UNINSTALL.md) · 🇮🇳 [gu](../../../gu/docs/guides/UNINSTALL.md) · 🇮🇱 [he](../../../he/docs/guides/UNINSTALL.md) · 🇮🇳 [hi](../../../hi/docs/guides/UNINSTALL.md) · 🇭🇺 [hu](../../../hu/docs/guides/UNINSTALL.md) · 🇮🇩 [id](../../../id/docs/guides/UNINSTALL.md) · 🇮🇹 [it](../../../it/docs/guides/UNINSTALL.md) · 🇯🇵 [ja](../../../ja/docs/guides/UNINSTALL.md) · 🇰🇷 [ko](../../../ko/docs/guides/UNINSTALL.md) · 🇮🇳 [mr](../../../mr/docs/guides/UNINSTALL.md) · 🇲🇾 [ms](../../../ms/docs/guides/UNINSTALL.md) · 🇳🇱 [nl](../../../nl/docs/guides/UNINSTALL.md) · 🇳🇴 [no](../../../no/docs/guides/UNINSTALL.md) · 🇵🇭 [phi](../../../phi/docs/guides/UNINSTALL.md) · 🇵🇱 [pl](../../../pl/docs/guides/UNINSTALL.md) · 🇵🇹 [pt](../../../pt/docs/guides/UNINSTALL.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/UNINSTALL.md) · 🇷🇴 [ro](../../../ro/docs/guides/UNINSTALL.md) · 🇷🇺 [ru](../../../ru/docs/guides/UNINSTALL.md) · 🇸🇰 [sk](../../../sk/docs/guides/UNINSTALL.md) · 🇸🇪 [sv](../../../sv/docs/guides/UNINSTALL.md) · 🇰🇪 [sw](../../../sw/docs/guides/UNINSTALL.md) · 🇮🇳 [ta](../../../ta/docs/guides/UNINSTALL.md) · 🇮🇳 [te](../../../te/docs/guides/UNINSTALL.md) · 🇹🇭 [th](../../../th/docs/guides/UNINSTALL.md) · 🇹🇷 [tr](../../../tr/docs/guides/UNINSTALL.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/UNINSTALL.md) · 🇵🇰 [ur](../../../ur/docs/guides/UNINSTALL.md) · 🇻🇳 [vi](../../../vi/docs/guides/UNINSTALL.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/UNINSTALL.md)

本指南說明如何從系統中徹底移除 OmniRoute。

---

## 快速解除安裝（v3.6.2+）

OmniRoute 提供兩個內建指令碼來進行乾淨的移除：

### 保留資料

```bash
npm run uninstall
```

此指令會移除 OmniRoute 應用程式，但**保留**您的資料庫、設定檔、API 金鑰及提供者設定於 `~/.omniroute/`。若您日後打算重新安裝並保留既有設定，請使用此方式。

### 完整移除

```bash
npm run uninstall:full
```

此指令會移除應用程式，**並永久刪除**所有資料：

- 資料庫（`storage.sqlite`）
- 提供者設定與 API 金鑰
- 備份檔案
- 日誌檔案
- `~/.omniroute/` 目錄中的所有檔案

> ⚠️ **警告：** `npm run uninstall:full` 為不可逆操作。所有提供者連線、組合設定、API 金鑰及使用記錄都將永久刪除。

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

| 平台         | 預設路徑                      | 覆蓋方式                   |
| ------------ | ----------------------------- | -------------------------- |
| Linux        | `~/.omniroute/`               | `DATA_DIR` 環境變數        |
| macOS        | `~/.omniroute/`               | `DATA_DIR` 環境變數        |
| Windows      | `%APPDATA%/omniroute/`        | `DATA_DIR` 環境變數        |
| Docker       | `/app/data/`（掛載資料卷）    | `DATA_DIR` 環境變數        |
| XDG 相容模式 | `$XDG_CONFIG_HOME/omniroute/` | `XDG_CONFIG_HOME` 環境變數 |

### 資料目錄中的檔案

| 檔案/目錄            | 說明                                   |
| -------------------- | -------------------------------------- |
| `storage.sqlite`     | 主要資料庫（提供者、組合、設定、金鑰） |
| `storage.sqlite-wal` | SQLite 預寫式日誌（暫存）              |
| `storage.sqlite-shm` | SQLite 共享記憶體（暫存）              |
| `call_logs/`         | 請求承載記錄封存                       |
| `backups/`           | 自動資料庫備份                         |
| `log.txt`            | 舊版請求日誌（選用）                   |

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
