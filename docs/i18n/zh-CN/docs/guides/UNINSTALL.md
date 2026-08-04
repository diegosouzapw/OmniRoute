---
title: "OmniRoute — 卸载指南"
version: 3.8.40
lastUpdated: 2026-06-28
---

# OmniRoute — 卸载指南

🌐 **Languages:** 🇺🇸 [English](../../../../docs/guides/UNINSTALL.md) | 🇧🇷 [Português (Brasil)](../../pt-BR/docs/guides/UNINSTALL.md) | 🇪🇸 [Español](../../es/docs/guides/UNINSTALL.md) | 🇫🇷 [Français](../../fr/docs/guides/UNINSTALL.md) | 🇮🇹 [Italiano](../../it/docs/guides/UNINSTALL.md) | 🇷🇺 [Русский](../../ru/docs/guides/UNINSTALL.md) | 🇨🇳 [中文 (简体)](../../zh-CN/docs/guides/UNINSTALL.md) | 🇩🇪 [Deutsch](../../de/docs/guides/UNINSTALL.md) | 🇮🇳 [हिन्दी](../../in/docs/guides/UNINSTALL.md) | 🇹🇭 [ไทย](../../th/docs/guides/UNINSTALL.md) | 🇺🇦 [Українська](../../uk-UA/docs/guides/UNINSTALL.md) | 🇸🇦 [العربية](../../ar/docs/guides/UNINSTALL.md) | 🇯🇵 [日本語](../../ja/docs/guides/UNINSTALL.md) | 🇻🇳 [Tiếng Việt](../../vi/docs/guides/UNINSTALL.md) | 🇧🇬 [Български](../../bg/docs/guides/UNINSTALL.md) | 🇩🇰 [Dansk](../../da/docs/guides/UNINSTALL.md) | 🇫🇮 [Suomi](../../fi/docs/guides/UNINSTALL.md) | 🇮🇱 [עברית](../../he/docs/guides/UNINSTALL.md) | 🇭🇺 [Magyar](../../hu/docs/guides/UNINSTALL.md) | 🇮🇩 [Bahasa Indonesia](../../id/docs/guides/UNINSTALL.md) | 🇰🇷 [한국어](../../ko/docs/guides/UNINSTALL.md) | 🇲🇾 [Bahasa Melayu](../../ms/docs/guides/UNINSTALL.md) | 🇳🇱 [Nederlands](../../nl/docs/guides/UNINSTALL.md) | 🇳🇴 [Norsk](../../no/docs/guides/UNINSTALL.md) | 🇵🇹 [Português (Portugal)](../../pt/docs/guides/UNINSTALL.md) | 🇷🇴 [Română](../../ro/docs/guides/UNINSTALL.md) | 🇵🇱 [Polski](../../pl/docs/guides/UNINSTALL.md) | 🇸🇰 [Slovenčina](../../sk/docs/guides/UNINSTALL.md) | 🇸🇪 [Svenska](../../sv/docs/guides/UNINSTALL.md) | 🇵🇭 [Filipino](../../phi/docs/guides/UNINSTALL.md) | 🇨🇿 [Čeština](../../cs/docs/guides/UNINSTALL.md)

本指南介绍如何从系统中彻底移除 OmniRoute。

---

## 快速卸载（v3.6.2+）

OmniRoute 提供两个内置脚本用于干净移除：

### 保留数据

```bash
npm run uninstall
```

此命令移除 OmniRoute 应用程序，但**保留** `~/.omniroute/` 中的数据库、配置、API Key 和服务商设置。如果你计划稍后重装并希望保留现有配置，请使用此方式。

### 完全移除

```bash
npm run uninstall:full
```

此命令移除应用程序并**永久删除**所有数据：

- 数据库（`storage.sqlite`）
- 服务商配置和 API Key
- 备份文件
- 日志文件
- `~/.omniroute/` 目录下的所有文件

> ⚠️ **警告：** `npm run uninstall:full` 不可逆。所有服务商连接、Combo、API Key 和用量历史将被永久删除。

---

## 手动卸载

### npm 全局安装

```bash
# 移除全局包
npm uninstall -g omniroute

# （可选）删除数据目录
rm -rf ~/.omniroute
```

### pnpm 全局安装

```bash
pnpm uninstall -g omniroute
rm -rf ~/.omniroute
```

### Docker

```bash
# 停止并移除容器
docker stop omniroute
docker rm omniroute

# 移除卷（删除所有数据）
docker volume rm omniroute-data

# （可选）移除镜像
docker rmi diegosouzapw/omniroute:latest
```

### Docker Compose

```bash
# 停止并移除容器
docker compose down

# 同时移除卷（删除所有数据）
docker compose down -v
```

### Electron 桌面应用

**Windows：**

- 打开 `设置 → 应用 → OmniRoute → 卸载`
- 或从安装目录运行 NSIS 卸载程序

**macOS：**

- 将 `OmniRoute.app` 从 `/Applications` 拖入废纸篓
- 删除数据：`rm -rf ~/Library/Application Support/omniroute`

**Linux：**

- 删除 AppImage 文件
- 删除数据：`rm -rf ~/.omniroute`

### 源码安装（git clone）

```bash
# 删除克隆目录
rm -rf /path/to/omniroute

# （可选）删除数据目录
rm -rf ~/.omniroute
```

---

## 数据目录

OmniRoute 默认将数据存储在以下位置：

| 平台          | 默认路径                      | 覆盖方式                   |
| ------------- | ----------------------------- | ------------------------- |
| Linux         | `~/.omniroute/`               | `DATA_DIR` 环境变量        |
| macOS         | `~/.omniroute/`               | `DATA_DIR` 环境变量        |
| Windows       | `%APPDATA%/omniroute/`        | `DATA_DIR` 环境变量        |
| Docker        | `/app/data/`（挂载卷）         | `DATA_DIR` 环境变量        |
| XDG 兼容      | `$XDG_CONFIG_HOME/omniroute/` | `XDG_CONFIG_HOME` 环境变量 |

### 数据目录中的文件

| 文件/目录             | 说明                                               |
| --------------------- | -------------------------------------------------- |
| `storage.sqlite`      | 主数据库（服务商、Combo、设置、Key）               |
| `storage.sqlite-wal`  | SQLite 预写日志（临时文件）                            |
| `storage.sqlite-shm`  | SQLite 共享内存（临时文件）                         |
| `call_logs/`          | 请求载荷归档                                       |
| `backups/`            | 自动数据库备份                                      |
| `log.txt`             | 旧版请求日志（可选）                               |

---

## 验证完全移除

卸载后，确认没有残留文件：

```bash
# 检查全局 npm 包
npm list -g omniroute 2>/dev/null

# 检查数据目录
ls -la ~/.omniroute/ 2>/dev/null

# 检查运行中的进程
pgrep -f omniroute
```

如果有进程仍在运行，停止它：

```bash
pkill -f omniroute
```
