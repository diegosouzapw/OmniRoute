# Public Credentials Handling (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../security/PUBLIC_CREDS.md) · 🇪🇹 [am](../../../am/docs/security/PUBLIC_CREDS.md) · 🇸🇦 [ar](../../../ar/docs/security/PUBLIC_CREDS.md) · 🇦🇿 [az](../../../az/docs/security/PUBLIC_CREDS.md) · 🇧🇬 [bg](../../../bg/docs/security/PUBLIC_CREDS.md) · 🇧🇩 [bn](../../../bn/docs/security/PUBLIC_CREDS.md) · 🇨🇿 [cs](../../../cs/docs/security/PUBLIC_CREDS.md) · 🇩🇰 [da](../../../da/docs/security/PUBLIC_CREDS.md) · 🇩🇪 [de](../../../de/docs/security/PUBLIC_CREDS.md) · 🇬🇷 [el](../../../el/docs/security/PUBLIC_CREDS.md) · 🇪🇸 [es](../../../es/docs/security/PUBLIC_CREDS.md) · 🇪🇪 [et](../../../et/docs/security/PUBLIC_CREDS.md) · 🇮🇷 [fa](../../../fa/docs/security/PUBLIC_CREDS.md) · 🇫🇮 [fi](../../../fi/docs/security/PUBLIC_CREDS.md) · 🇫🇷 [fr](../../../fr/docs/security/PUBLIC_CREDS.md) · 🇮🇪 [ga](../../../ga/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [gu](../../../gu/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ha](../../../ha/docs/security/PUBLIC_CREDS.md) · 🇮🇱 [he](../../../he/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [hi](../../../hi/docs/security/PUBLIC_CREDS.md) · 🇭🇷 [hr](../../../hr/docs/security/PUBLIC_CREDS.md) · 🇭🇺 [hu](../../../hu/docs/security/PUBLIC_CREDS.md) · 🇦🇲 [hy](../../../hy/docs/security/PUBLIC_CREDS.md) · 🇮🇩 [id](../../../id/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ig](../../../ig/docs/security/PUBLIC_CREDS.md) · 🇮🇹 [it](../../../it/docs/security/PUBLIC_CREDS.md) · 🇯🇵 [ja](../../../ja/docs/security/PUBLIC_CREDS.md) · 🇬🇪 [ka](../../../ka/docs/security/PUBLIC_CREDS.md) · 🇰🇭 [km](../../../km/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [kn](../../../kn/docs/security/PUBLIC_CREDS.md) · 🇰🇷 [ko](../../../ko/docs/security/PUBLIC_CREDS.md) · 🇱🇹 [lt](../../../lt/docs/security/PUBLIC_CREDS.md) · 🇱🇻 [lv](../../../lv/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ml](../../../ml/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [mr](../../../mr/docs/security/PUBLIC_CREDS.md) · 🇲🇾 [ms](../../../ms/docs/security/PUBLIC_CREDS.md) · 🇲🇹 [mt](../../../mt/docs/security/PUBLIC_CREDS.md) · 🇲🇲 [my](../../../my/docs/security/PUBLIC_CREDS.md) · 🇳🇵 [ne](../../../ne/docs/security/PUBLIC_CREDS.md) · 🇳🇱 [nl](../../../nl/docs/security/PUBLIC_CREDS.md) · 🇳🇴 [no](../../../no/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [or](../../../or/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [pa](../../../pa/docs/security/PUBLIC_CREDS.md) · 🇵🇭 [phi](../../../phi/docs/security/PUBLIC_CREDS.md) · 🇵🇱 [pl](../../../pl/docs/security/PUBLIC_CREDS.md) · 🇵🇹 [pt](../../../pt/docs/security/PUBLIC_CREDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/PUBLIC_CREDS.md) · 🇷🇴 [ro](../../../ro/docs/security/PUBLIC_CREDS.md) · 🇷🇺 [ru](../../../ru/docs/security/PUBLIC_CREDS.md) · 🇱🇰 [si](../../../si/docs/security/PUBLIC_CREDS.md) · 🇸🇰 [sk](../../../sk/docs/security/PUBLIC_CREDS.md) · 🇸🇮 [sl](../../../sl/docs/security/PUBLIC_CREDS.md) · 🇷🇸 [sr](../../../sr/docs/security/PUBLIC_CREDS.md) · 🇸🇪 [sv](../../../sv/docs/security/PUBLIC_CREDS.md) · 🇰🇪 [sw](../../../sw/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ta](../../../ta/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [te](../../../te/docs/security/PUBLIC_CREDS.md) · 🇹🇭 [th](../../../th/docs/security/PUBLIC_CREDS.md) · 🇹🇷 [tr](../../../tr/docs/security/PUBLIC_CREDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/PUBLIC_CREDS.md) · 🇵🇰 [ur](../../../ur/docs/security/PUBLIC_CREDS.md) · 🇺🇿 [uz](../../../uz/docs/security/PUBLIC_CREDS.md) · 🇻🇳 [vi](../../../vi/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [yo](../../../yo/docs/security/PUBLIC_CREDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/PUBLIC_CREDS.md)

---

> **权威来源：** `open-sse/utils/publicCreds.ts`
> **测试：** `tests/unit/publicCreds.test.ts`
> **最后更新：** 2026-08-07 — v3.8.50
> **受众：** 集成相关提供者的工程师；这些提供者会在其公共 CLI 中分发公开的 OAuth client_id / client_secret / Firebase Web API 密钥。
> **状态：** 对所有嵌入上游标识符的新代码均为**强制要求**。

## 为什么需要它

- [原生应用的 OAuth 2.0（PKCE）](https://developers.google.com/identity/protocols/oauth2/native-app) — 已安装应用的 OAuth client_id / client_secret 是公开的；实际安全性由 PKCE 提供。
- [Firebase API 密钥](https://firebase.google.com/docs/projects/api-keys) — Web 客户端标识符在设计上就是公开的。

OmniRoute 必须嵌入这些值，以便未配置 `.env` 的用户仍能直接获得可用的 OAuth 流程。如果没有嵌入式回退值，任何遵循“只需克隆并运行”路径的用户都将无法使用 Gemini / Antigravity 提供者。

但是，`AIzaSy…`、`GOCSPX-…`、`…apps.googleusercontent.com` 之类的字面值会被 **GitHub Secret Scanning**、**Semgrep** 以及类似的模式扫描器匹配。每次发布都会产生大量误报，推送保护会阻止合法提交，运维人员也会逐渐不再信任告警信息流。

`open-sse/utils/publicCreds.ts` 辅助工具同时解决了这两个约束：

- 将公开标识符嵌入为**经过 XOR 掩码处理的字节序列**（源代码中不存在可被扫描器匹配的模式）。
- 在运行时通过 `decodePublicCred` / `resolvePublicCred` 解码。
- 检测已经符合常见前缀格式的原始值（`AIza`、`GOCSPX-`、`<digits>-<32hex>.apps.googleusercontent.com`、`Iv1.<hex>`），并保持原样传递，因此在现有 `.env` 中使用原始值的用户可以继续正常使用，**无需任何迁移**。

这是**混淆，而非加密。**任何阅读源代码的人都可以还原该值——这完全没有问题，因为该值在设计上就是公开的。唯一目标是避免匹配扫描器的正则表达式。

## 强制模式

### 1. 添加新的公开凭据

当你需要嵌入一个由上游提供的值，并且该值：

- 来自公共 CLI / 桌面应用 / 浏览器包，**并且**
- 上游提供者已将其记录为（或视为）公开客户端标识符，**并且**
- 否则会被模式扫描器匹配（`AIza…`、`GOCSPX-…`、`<digits>-…apps.googleusercontent.com` 等），

……请遵循此检查清单：

1. 生成经过掩码处理的字节序列：

   ```bash
   node --import tsx/esm -e \
     'import("./open-sse/utils/publicCreds.ts").then(m =>
        console.log(JSON.stringify(Array.from(
          Buffer.from(m.encodePublicCred("THE_PUBLIC_VALUE"), "base64")
        ))))'
   ```

2. 在 `open-sse/utils/publicCreds.ts` 的 `EMBEDDED_DEFAULTS` 中添加新条目，并使用**中性的键名**（`<provider>_id`、`<provider>_alt`、`<provider>_fb` 等）。不要在辅助工具中使用 `client_secret` 或 `api_key` 之类的名称——这些词会触发 Semgrep 的通用密钥规则。

3. 将 `keyof typeof EMBEDDED_DEFAULTS` 添加到公开类型联合中（它会自动推断）。

4. 在使用方代码中，将硬编码字面值替换为：

   ```ts
   // 单个环境变量覆盖值
   clientSecret: resolvePublicCred("provider_alt", "PROVIDER_OAUTH_CLIENT_SECRET"),

   // 多个环境变量别名（第一个非空值优先）
   clientId: resolvePublicCredMulti("provider_id", [
     "PROVIDER_CLI_OAUTH_CLIENT_ID",
     "PROVIDER_OAUTH_CLIENT_ID",
   ]),

   // 无环境变量覆盖值（始终使用嵌入式默认值）
   firebaseApiKey: resolvePublicCred("provider_fb"),
   ```

5. 从 `.env.example` 中移除该字面值（替换为仅含注释的文档，并引导读者查看此处）：

   ```dotenv
   # ── 提供者（Google / Firebase / 等）──
   # 公开 OAuth 凭据已通过以下文件内置到代码中：
   # open-sse/utils/publicCreds.ts。仅当需要使用自己的凭据时才设置这些变量。
   # PROVIDER_OAUTH_CLIENT_ID=
   # PROVIDER_OAUTH_CLIENT_SECRET=
   ```

6. 更新 `tests/unit/publicCreds.test.ts`，为新键添加形状断言（验证格式，而非字面值——具体模式请参阅现有测试）。

7. **绝不要**将 `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` 字面值添加到测试文件中。请使用由 `.join("")` 片段构建的 `FAKE_*` 常量（参阅现有测试）。

### 2. 使用方

- **只能通过 `resolvePublicCred()` / `resolvePublicCredMulti()` 读取**——绝不要在辅助工具之外直接调用 `decodePublicCredBytes()`。
- 该辅助工具经过刻意设计，开销很低（线性字节 XOR），可以安全地在模块加载时调用；默认值只计算一次。
- 环境变量覆盖值始终优先。如果用户设置了 `PROVIDER_OAUTH_CLIENT_SECRET=GOCSPX-myown`，辅助工具会直接传递该原始值。

### 3. 禁止的模式

❌ **绝不要**在生产代码（`src/`、`open-sse/`、`electron/`、`bin/`）中执行以下任何操作：

```ts
// 错误：字面值会触发 Secret Scanning + Semgrep
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET || "GOCSPX-realvalue",

// 错误：对字面值进行 base64 编码——自 2025 年 2 月起，GitHub 仍能检测到
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET ||
  Buffer.from("R09DU1BYLXJlYWx2YWx1ZQ==", "base64").toString(),

// 错误：在运行时重新组装该模式的字符串拼接
clientSecret: "GO" + "CS" + "PX-" + "realvalue",

// 错误：十六进制/ROT13 编码——不同的混淆方式，同样存在被检测的风险
clientSecret: hexDecode("474f4353..."),
```

这些方式最终都会触发扫描器。请使用 `resolvePublicCred()`。

❌ **绝不要**向 `.env.example` 添加凭据字面值。需要真实上游值的用户可以自行从公共 CLI 中提取，或使用自己的 OAuth 注册信息。

❌ **绝不要**在未先检查凭据是否应移至此辅助工具的情况下忽略新的密钥扫描告警。

## 相关控制措施

- `publicCreds.ts` 中的 `RAW_VALUE_PATTERN` 枚举了会触发直通处理的前缀（用于向后兼容）。仅针对已有文档说明的公共凭据格式扩展该模式，绝不要将专有密钥加入其中。
- `.env.example` 由 CI 的 `check-env-doc-sync` 脚本检查——从这里移除变量时，请确保文档同步更新。
- `npm run test:vitest` 和 `node --import tsx/esm --test tests/unit/publicCreds.test.ts` 两套测试都必须保持通过。

## 不应使用此辅助工具的情况

此辅助工具**仅**适用于符合以下条件的凭据：

1. 由上游提供者公开分发（CLI 二进制文件、浏览器软件包、官方文档）。
2. 已明确说明或强烈暗示其不具备机密性（受 PKCE 保护、Firebase Web 密钥或类似凭据）。

对于其他所有凭据——运营方签发的令牌、每租户密钥、您自己的 OAuth 应用的 client_secret、加密密钥、JWT 密钥、数据库密码——请**仅使用环境变量**（`process.env.FOO`，使用 `||` 回退为空值或显式报错）。这些凭据应存放在 `.env` 和[加密凭据存储](./COMPLIANCE.md)中，而不是源代码中。

## 参考资料

- [Google：原生应用的 OAuth 2.0](https://developers.google.com/identity/protocols/oauth2/native-app)
- [Firebase：用于客户端标识的 API 密钥](https://firebase.google.com/docs/projects/api-keys)
- [GitHub Secret Scanning 支持的密钥](https://docs.github.com/en/code-security/secret-scanning/introduction/supported-secret-scanning-patterns)
- [GitHub：令牌的 base64 检测（2025 年 2 月）](https://github.blog/changelog/2025-02-14-secret-scanning-detects-base64-encoded-github-tokens/)
- 引入此辅助工具的提交：`1a39c31f` — _fix(security): 屏蔽公开的上游凭据并集中处理错误净化_
