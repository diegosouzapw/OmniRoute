# Termux Headless Setup (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/TERMUX_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/TERMUX_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/TERMUX_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/TERMUX_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/TERMUX_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/TERMUX_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/TERMUX_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/TERMUX_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/TERMUX_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/TERMUX_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/TERMUX_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/TERMUX_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/TERMUX_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/TERMUX_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/TERMUX_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/TERMUX_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/TERMUX_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/TERMUX_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/TERMUX_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/TERMUX_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/TERMUX_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/TERMUX_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/TERMUX_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/TERMUX_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/TERMUX_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/TERMUX_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/TERMUX_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/TERMUX_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/TERMUX_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/TERMUX_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/TERMUX_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/TERMUX_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/TERMUX_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/TERMUX_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/TERMUX_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/TERMUX_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/TERMUX_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/TERMUX_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/TERMUX_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/TERMUX_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/TERMUX_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/TERMUX_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/TERMUX_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/TERMUX_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/TERMUX_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/TERMUX_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/TERMUX_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/TERMUX_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/TERMUX_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/TERMUX_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/TERMUX_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/TERMUX_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/TERMUX_GUIDE.md)

---

OmniRoute 可以通过 Termux 在 Android 上作为无头服务器运行。Termux 不支持 Electron 桌面应用，但可以通过本地浏览器或同一网络中的其他设备使用 Web 仪表盘和 OpenAI 兼容 API。

## 前置条件

从 F-Droid 或 GitHub Releases 安装 Termux，然后更新软件包，并安装 `better-sqlite3` 等原生依赖项所需的构建工具。

```bash
pkg update
pkg upgrade
pkg install nodejs python build-essential git
```

> **Node.js 版本：**OmniRoute 要求 Node `>=22.22.2 <23 || >=24.0.0 <27`（与 `package.json` 中的 `engines` / `SUPPORTED_NODE_RANGE` 一致）。Termux 的 `nodejs-lts` 通常提供 Node 20 LTS，该版本**已不再受支持**——请改为安装 `pkg install nodejs`（当前版本），并确认 `node --version` 输出的是 22.x/24.x+ 版本。

如果原生软件包编译失败，请重新运行上面的 `pkg install` 命令，然后再次尝试安装 OmniRoute。

## 安装

直接运行最新发布的软件包：

```bash
npx -y omniroute@latest
```

也可以进行全局安装：

```bash
npm install -g omniroute
omniroute
```

## 运行

以无头服务器模式启动 OmniRoute：

```bash
omniroute
```

或者：

```bash
npx omniroute
```

仪表盘监听地址为：

```text
http://localhost:20128
```

在 Android 浏览器中打开该 URL。如果在 Termux 内运行客户端，请使用相同的主机和端口作为 OpenAI 兼容 API 的基础 URL。

## 后台运行

要作为简单的后台进程运行：

```bash
nohup omniroute > omniroute.log 2>&1 &
```

要停止它：

```bash
pkill -f omniroute
```

要在设备启动后自动运行，请安装 Termux:Boot 附加组件并创建启动脚本：

```bash
mkdir -p ~/.termux/boot
cat > ~/.termux/boot/omniroute.sh <<'EOF'
#!/data/data/com.termux/files/usr/bin/sh
cd "$HOME"
nohup omniroute > "$HOME/omniroute.log" 2>&1 &
EOF
chmod +x ~/.termux/boot/omniroute.sh
```

Android 电池优化可能会停止长时间运行的后台进程。如果服务器需要持续在线，请为 Termux 禁用电池优化。

## 从其他设备访问

查找手机在 WiFi 网络中的 IP 地址：

```bash
ip addr show wlan0
```

然后从另一台设备打开仪表盘：

```text
http://PHONE_IP:20128
```

例如：

```text
http://192.168.1.50:20128
```

请确保手机和客户端位于同一个受信任的网络中。如果将 OmniRoute 暴露到手机外部，请启用 API 密钥和仪表盘身份验证。

## 数据目录

默认情况下，OmniRoute 将数据存储在 Termux 主目录下，其行为与 Linux 上使用的服务器端数据路径相同。要将数据库存放在明确指定的位置：

```bash
export DATA_DIR="$HOME/.omniroute"
omniroute
```

## 限制

- Electron 无法在 Termux 中运行。
- 不支持系统托盘或桌面集成。
- 此设置仅用于服务器模式：请使用浏览器仪表盘。
- 原生依赖项可能需要在本地编译。
- 内存较小的 Android 设备可能需要减少并发请求数。
- MITM/系统证书功能可能需要在 Termux 之外对 Android 级别的信任存储进行配置。

## 故障排除

### 不受支持的平台：android（所有请求均返回 HTTP 500）

**症状：**`omniroute` / `omniroute serve` 输出 `✔ OmniRoute is running!`，但每个仪表盘或 API 请求都返回简单的 `500 Internal Server Error`。`~/.omniroute/logs/application/app.log` 始终为空，`APP_LOG_LEVEL=debug` 也不会输出任何有用信息，并且响应正文是没有 JSON 详情的纯文本（`Internal Server Error`）。

**原因：**某些 Termux/Node 构建会报告 `process.platform === "android"`。Next.js 的 `getCacheDirectory()` 不支持该平台：它要求 `~/.cache`（或通用临时目录）_已经_存在，否则在加载 instrumentation hook 时会失败并显示：

```text
Error: An error occurred while loading instrumentation hook: Unsupported platform: android
```

由于 hook 从未加载，日志记录也不会启动，因此这个 500 错误看起来完全无法诊断。OmniRoute 会在 Next.js 启动前通过 CLI 入口点创建 `~/.cache`（并在未设置时设置 `XDG_CACHE_HOME`），从而使此探测在 Android/Termux 上成功完成。

**受支持的解决方案（无需修补软件包）：**

```bash
mkdir -p ~/.cache
omniroute serve
```

在当前的 OmniRoute 构建中，CLI 会在 Android/Termux 上自动执行此操作——全新运行 `npx -y omniroute@latest` / 全局安装后，通常不需要手动执行该步骤。如果升级后仍然出现此错误，请按上述方式创建一次 `~/.cache`，然后重新启动。

**请勿**修补 `dist/server.js` 以强制设置 `process.platform = "linux"`。每次重新安装或升级时，这类软件包修补都会被覆盖，而且缓存目录存在后也无需进行此修补。

### better-sqlite3 构建错误

安装 Termux 构建工具链：

```bash
pkg install nodejs python build-essential
```

然后重新运行：

```bash
npx -y omniroute@latest
```

### 端口已被占用

检查正在监听默认端口的进程：

```bash
ss -ltnp | grep 20128
```

停止旧进程：

```bash
pkill -f omniroute
```

### 无法从其他设备访问仪表盘

确认两台设备都连接到同一个 WiFi 网络，然后从 Termux 进行测试：

```bash
curl http://localhost:20128
```

如果本地访问正常，但无法通过局域网访问，请检查 Android 热点/WiFi 隔离设置，以及手机上的所有防火墙或 VPN 配置。
