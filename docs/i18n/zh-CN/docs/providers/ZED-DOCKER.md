# Zed IDE Integration in Docker Environments (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../providers/ZED-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/ZED-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/ZED-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/ZED-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/ZED-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/ZED-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/ZED-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/ZED-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/ZED-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/ZED-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/ZED-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/ZED-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/ZED-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/ZED-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/ZED-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/ZED-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/ZED-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/ZED-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/ZED-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/ZED-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/ZED-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/ZED-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/ZED-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/ZED-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/ZED-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/ZED-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/ZED-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/ZED-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/ZED-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/ZED-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/ZED-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/ZED-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/ZED-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/ZED-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/ZED-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/ZED-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/ZED-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/ZED-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/ZED-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/ZED-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/ZED-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/ZED-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/ZED-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/ZED-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/ZED-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/ZED-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/ZED-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/ZED-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/ZED-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/ZED-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/ZED-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/ZED-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/ZED-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/ZED-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/ZED-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/ZED-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/ZED-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/ZED-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/ZED-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/ZED-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/ZED-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/ZED-DOCKER.md)

---

当 OmniRoute 在 Docker 内运行时，标准的“从 Zed 钥匙串导入”流程会失败，
因为容器无法访问宿主操作系统的钥匙串守护进程（Linux 上的 libsecret、
macOS 上的 Keychain、Windows 上的 Credential Manager），并且默认情况下，
容器无法看到宿主文件系统中的 Zed 配置目录。

## 为什么钥匙串导入在 Docker 中会失败

容器内存在两个阻塞问题：

1. **文件系统隔离** — `isZedInstalled()` 会查找 `~/.config/zed`（Linux）、
   `~/Library/Application Support/Zed`（macOS）或 Windows 上的对应路径。这些路径
   位于宿主机上，除非显式挂载为卷，否则无法访问。
2. **IPC 隔离** — 即使挂载了配置目录，`keytar` 原生模块也需要通过 Unix 套接字
   或 D-Bus 会话与操作系统钥匙串服务通信。默认情况下，这两者都不会桥接到容器中，
   因此读取凭据始终会失败。

OmniRoute 通过以下两种启发式方法检测 Docker 环境：

- 存在 `/.dockerenv`（由 Docker 守护进程在容器启动时写入）。
- `/proc/1/cgroup` 中出现字符串 `docker`（Linux cgroup v1）。

当任一启发式检测触发时，导入路由会返回 HTTP 422，并包含
`zedDockerEnvironment: true`，以及一条指引您前往“手动令牌导入”选项卡的消息。

## 使用“手动令牌导入”选项卡

1. 打开**仪表板 → 提供者 → Zed**。
2. **手动令牌导入**面板会显示在钥匙串导入卡片下方。当
   OmniRoute 检测到 Docker 时，该面板会在第一次钥匙串导入尝试失败后自动展开。
3. 从下拉列表中选择提供者（OpenAI、Anthropic、Google、Mistral、xAI、
   OpenRouter 或 DeepSeek）。
4. 在密码字段中粘贴 API 密钥。
5. 单击**导入**。

该密钥将保存为新的提供者连接，名称为
`Zed Manual Import (<provider>)`。

## Zed 在宿主机上存储 API 密钥的位置

Zed 将 AI 提供者密钥存储在操作系统钥匙串中，使用的服务名称包括
`zed-openai`、`ai.zed.openai`、`zed-anthropic` 等。要获取这些密钥以便手动
导入，请查看：

**Linux**

```
~/.config/zed/settings.json
```

`language_models` 部分包含提供者配置。通过 Zed UI 保存到钥匙串中的密钥
不会以明文形式出现在 `settings.json` 中；请使用 GNOME Keyring / Seahorse
等钥匙串查看器获取，或运行：

```bash
secret-tool lookup service zed-openai account api-key
```

**macOS**

```
~/Library/Application Support/Zed/settings.json
```

可以在 **Keychain Access.app** 中搜索 `zed` 来找到钥匙串条目。

## 卷挂载选项（高级）

您可以选择将 Zed 配置目录以只读方式挂载到容器中。
这无法解决钥匙串问题，但对于将来读取非敏感 Zed 配置值
（例如模型偏好）的功能可能有用。

```yaml
# docker-compose.yml 片段
services:
  omniroute:
    image: omniroute:latest
    volumes:
      # Linux 宿主机
      - "${HOME}/.config/zed:/host-zed-config:ro"
      # macOS 宿主机（改为取消此项注释）
      # - "${HOME}/Library/Application Support/Zed:/host-zed-config:ro"
    environment:
      # 未来支持：ZED_CONFIG_PATH=/host-zed-config
      PORT: "20128"
```

注意：目前尚未实现 `ZED_CONFIG_PATH` 环境变量覆盖。此
代码片段仅作为添加该功能后的参考。

## 手动导入 API

也可以直接调用手动导入端点：

```
POST /api/providers/zed/manual-import
Content-Type: application/json
Authorization: Bearer <oma_live_or_manage_scoped_api_key>

{
  "provider": "openai",
  "token": "sk-...",
  "label": "我的 Zed OpenAI 密钥"   // 可选
}
```

成功时会返回：

```json
{ "success": true, "connectionId": "...", "provider": "openai" }
```

## 故障排除

| 症状                               | 原因                     | 解决方法                 |
| ---------------------------------- | ------------------------ | ------------------------ |
| 422 + `zedDockerEnvironment: true` | 在 Docker 内运行         | 使用“手动令牌导入”选项卡 |
| 404 + `zedInstalled: false`        | 宿主机上未安装 Zed       | 安装 Zed 或使用手动导入  |
| 403 + 钥匙串访问被拒绝             | 操作系统拒绝钥匙串访问   | 在操作系统提示中授予权限 |
| 404 + 钥匙串服务不可用             | Linux 上缺少 `libsecret` | 安装 `libsecret-1-dev`   |
