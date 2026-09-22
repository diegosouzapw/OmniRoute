# Public Credentials Handling (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../security/PUBLIC_CREDS.md) · 🇪🇹 [am](../../../am/docs/security/PUBLIC_CREDS.md) · 🇸🇦 [ar](../../../ar/docs/security/PUBLIC_CREDS.md) · 🇦🇿 [az](../../../az/docs/security/PUBLIC_CREDS.md) · 🇧🇬 [bg](../../../bg/docs/security/PUBLIC_CREDS.md) · 🇧🇩 [bn](../../../bn/docs/security/PUBLIC_CREDS.md) · 🇧🇦 [bs](../../../bs/docs/security/PUBLIC_CREDS.md) · 🇨🇿 [cs](../../../cs/docs/security/PUBLIC_CREDS.md) · 🇩🇰 [da](../../../da/docs/security/PUBLIC_CREDS.md) · 🇩🇪 [de](../../../de/docs/security/PUBLIC_CREDS.md) · 🇬🇷 [el](../../../el/docs/security/PUBLIC_CREDS.md) · 🇪🇸 [es](../../../es/docs/security/PUBLIC_CREDS.md) · 🇪🇪 [et](../../../et/docs/security/PUBLIC_CREDS.md) · 🇮🇷 [fa](../../../fa/docs/security/PUBLIC_CREDS.md) · 🇫🇮 [fi](../../../fi/docs/security/PUBLIC_CREDS.md) · 🇫🇷 [fr](../../../fr/docs/security/PUBLIC_CREDS.md) · 🇮🇪 [ga](../../../ga/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [gu](../../../gu/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ha](../../../ha/docs/security/PUBLIC_CREDS.md) · 🇮🇱 [he](../../../he/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [hi](../../../hi/docs/security/PUBLIC_CREDS.md) · 🇭🇷 [hr](../../../hr/docs/security/PUBLIC_CREDS.md) · 🇭🇺 [hu](../../../hu/docs/security/PUBLIC_CREDS.md) · 🇦🇲 [hy](../../../hy/docs/security/PUBLIC_CREDS.md) · 🇮🇩 [id](../../../id/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ig](../../../ig/docs/security/PUBLIC_CREDS.md) · 🇮🇹 [it](../../../it/docs/security/PUBLIC_CREDS.md) · 🇯🇵 [ja](../../../ja/docs/security/PUBLIC_CREDS.md) · 🇬🇪 [ka](../../../ka/docs/security/PUBLIC_CREDS.md) · 🇰🇭 [km](../../../km/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [kn](../../../kn/docs/security/PUBLIC_CREDS.md) · 🇰🇷 [ko](../../../ko/docs/security/PUBLIC_CREDS.md) · 🇱🇹 [lt](../../../lt/docs/security/PUBLIC_CREDS.md) · 🇱🇻 [lv](../../../lv/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ml](../../../ml/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [mr](../../../mr/docs/security/PUBLIC_CREDS.md) · 🇲🇾 [ms](../../../ms/docs/security/PUBLIC_CREDS.md) · 🇲🇹 [mt](../../../mt/docs/security/PUBLIC_CREDS.md) · 🇲🇲 [my](../../../my/docs/security/PUBLIC_CREDS.md) · 🇳🇵 [ne](../../../ne/docs/security/PUBLIC_CREDS.md) · 🇳🇱 [nl](../../../nl/docs/security/PUBLIC_CREDS.md) · 🇳🇴 [no](../../../no/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [or](../../../or/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [pa](../../../pa/docs/security/PUBLIC_CREDS.md) · 🇵🇭 [phi](../../../phi/docs/security/PUBLIC_CREDS.md) · 🇵🇱 [pl](../../../pl/docs/security/PUBLIC_CREDS.md) · 🇵🇹 [pt](../../../pt/docs/security/PUBLIC_CREDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/PUBLIC_CREDS.md) · 🇷🇴 [ro](../../../ro/docs/security/PUBLIC_CREDS.md) · 🇷🇺 [ru](../../../ru/docs/security/PUBLIC_CREDS.md) · 🇱🇰 [si](../../../si/docs/security/PUBLIC_CREDS.md) · 🇸🇰 [sk](../../../sk/docs/security/PUBLIC_CREDS.md) · 🇸🇮 [sl](../../../sl/docs/security/PUBLIC_CREDS.md) · 🇷🇸 [sr](../../../sr/docs/security/PUBLIC_CREDS.md) · 🇸🇪 [sv](../../../sv/docs/security/PUBLIC_CREDS.md) · 🇰🇪 [sw](../../../sw/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ta](../../../ta/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [te](../../../te/docs/security/PUBLIC_CREDS.md) · 🇹🇭 [th](../../../th/docs/security/PUBLIC_CREDS.md) · 🇹🇷 [tr](../../../tr/docs/security/PUBLIC_CREDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/PUBLIC_CREDS.md) · 🇵🇰 [ur](../../../ur/docs/security/PUBLIC_CREDS.md) · 🇺🇿 [uz](../../../uz/docs/security/PUBLIC_CREDS.md) · 🇻🇳 [vi](../../../vi/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [yo](../../../yo/docs/security/PUBLIC_CREDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/PUBLIC_CREDS.md)

---

> **權威來源：** `open-sse/utils/publicCreds.ts`
> **測試：** `tests/unit/publicCreds.test.ts`
> **最後更新：** 2026-08-07 — v3.8.50
> **適用對象：** 整合提供者的工程師；這些提供者會在其公開 CLI 中隨附公開的 OAuth client_id / client_secret / Firebase Web API 金鑰。
> **狀態：** 所有嵌入上游識別碼的新程式碼都**必須**遵守。

## 為何需要此機制

- [原生應用程式的 OAuth 2.0（PKCE）](https://developers.google.com/identity/protocols/oauth2/native-app) — 已安裝應用程式的 OAuth client_id / client_secret 是公開的；實際安全性由 PKCE 提供。
- [Firebase API 金鑰](https://firebase.google.com/docs/projects/api-keys) — Web 用戶端識別碼依設計即為公開資訊。

OmniRoute 必須嵌入這些值，讓未設定 `.env` 的使用者仍能立即獲得可正常運作的 OAuth 流程。如果沒有嵌入的備援值，任何遵循「直接複製並執行」流程的使用者都無法使用 Gemini / Antigravity 提供者。

然而，像 `AIzaSy…`、`GOCSPX-…`、`…apps.googleusercontent.com` 這類常值會被 **GitHub Secret Scanning**、**Semgrep** 及類似的模式掃描器比對到。每次發行都會產生大量擾人的誤報，推送保護會封鎖合法的提交，而維運人員也會逐漸不再信任警示資訊流。

`open-sse/utils/publicCreds.ts` 輔助工具可同時滿足這兩項限制：

- 將公開識別碼嵌入為**經 XOR 遮罩的位元組序列**（原始碼中不存在可供掃描器比對的模式）。
- 透過 `decodePublicCred` / `resolvePublicCred` 在執行階段解碼。
- 偵測已符合已知前綴的原始值（`AIza`、`GOCSPX-`、`<digits>-<32hex>.apps.googleusercontent.com`、`Iv1.<hex>`），並原封不動地傳遞這些值，因此現有 `.env` 中使用原始值的使用者可以繼續正常運作，**完全不必遷移**。

這是**混淆，而非加密。**任何閱讀原始碼的人都可以復原該值——這沒有問題，因為依設計該值本來就是公開的。唯一目的只是避免符合掃描器的正規表示式。

## 強制模式

### 1. 新增公開憑證

當您需要嵌入符合以下條件、由上游提供的新值時：

- 來自公開的 CLI / 桌面應用程式 / 瀏覽器套件，**且**
- 上游提供者記載（或視）其為公開的用戶端識別碼，**且**
- 模式掃描器原本會比對到該值（`AIza…`、`GOCSPX-…`、`<digits>-…apps.googleusercontent.com` 等），

……請遵循以下檢查清單：

1. 產生經遮罩的位元組序列：

   ```bash
   node --import tsx/esm -e \
     'import("./open-sse/utils/publicCreds.ts").then(m =>
        console.log(JSON.stringify(Array.from(
          Buffer.from(m.encodePublicCred("THE_PUBLIC_VALUE"), "base64")
        ))))'
   ```

2. 在 `open-sse/utils/publicCreds.ts` 的 `EMBEDDED_DEFAULTS` 中新增項目，並使用**中性的鍵名**（`<provider>_id`、`<provider>_alt`、`<provider>_fb` 等）。請**勿**在輔助工具中使用 `client_secret` 或 `api_key` 之類的名稱——這些詞會觸發 Semgrep 的通用密鑰規則。

3. 將 `keyof typeof EMBEDDED_DEFAULTS` 新增至公開類型聯集（此類型會自動推斷）。

4. 在使用端程式碼中，將硬編碼常值替換為：

   ```ts
   // 單一環境變數覆寫
   clientSecret: resolvePublicCred("provider_alt", "PROVIDER_OAUTH_CLIENT_SECRET"),

   // 多個環境變數別名（採用第一個非空值）
   clientId: resolvePublicCredMulti("provider_id", [
     "PROVIDER_CLI_OAUTH_CLIENT_ID",
     "PROVIDER_OAUTH_CLIENT_ID",
   ]),

   // 不允許環境變數覆寫（永遠使用嵌入的預設值）
   firebaseApiKey: resolvePublicCred("provider_fb"),
   ```

5. 從 `.env.example` 移除該常值（改用僅含註解的說明，將讀者引導至此處）：

   ```dotenv
   # ── 提供者（Google / Firebase / 等）──
   # 公開 OAuth 憑證已透過 open-sse/utils/publicCreds.ts
   # 內建於程式碼中。只有在使用您自己的憑證時才設定這些變數。
   # PROVIDER_OAUTH_CLIENT_ID=
   # PROVIDER_OAUTH_CLIENT_SECRET=
   ```

6. 更新 `tests/unit/publicCreds.test.ts`，為新鍵新增外形判斷提示（驗證格式，而非常值——請參閱現有測試中的模式）。

7. **絕對不要**將 `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` 常值新增至測試檔案。請使用以 `.join("")` 片段組成的 `FAKE_*` 常數（請參閱現有測試）。

### 2. 使用端

- **只能透過 `resolvePublicCred()` / `resolvePublicCredMulti()` 讀取**——切勿在輔助工具之外直接呼叫 `decodePublicCredBytes()`。
- 此輔助工具刻意設計得非常輕量（線性位元組 XOR），可安全地在模組載入時呼叫；預設值只會計算一次。
- 環境變數覆寫一律優先。如果使用者設定 `PROVIDER_OAUTH_CLIENT_SECRET=GOCSPX-myown`，輔助工具會直接傳遞該原始值。

### 3. 禁止的模式

❌ **絕對不要**在正式環境程式碼（`src/`、`open-sse/`、`electron/`、`bin/`）中進行以下任何操作：

```ts
// 錯誤：常值會觸發 Secret Scanning + Semgrep
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET || "GOCSPX-realvalue",

// 錯誤：常值的 base64——自 2025 年 2 月起，GitHub 仍可偵測
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET ||
  Buffer.from("R09DU1BYLXJlYWx2YWx1ZQ==", "base64").toString(),

// 錯誤：在執行階段重新組合該模式的字串串接
clientSecret: "GO" + "CS" + "PX-" + "realvalue",

// 錯誤：hex/ROT13 編碼——不同的混淆方式，但被偵測的風險相同
clientSecret: hexDecode("474f4353..."),
```

這些做法最終都會觸發掃描器。請使用 `resolvePublicCred()`。

❌ **絕對不要**將憑證常值新增至 `.env.example`。需要真實上游值的使用者可以自行從公開 CLI 擷取，或使用自己的 OAuth 註冊資訊。

❌ **絕對不要**在尚未檢查憑證是否應移至此輔助工具之前，就直接忽略新的密鑰掃描警示。

## 相關控制措施

- `publicCreds.ts` 中的 `RAW_VALUE_PATTERN` 列舉了會觸發直接傳遞的前綴（向後相容）。僅針對已有文件記載的公開憑證格式擴充此模式，絕不可用於專有機密。
- `.env.example` 由 CI 的 `check-env-doc-sync` 指令碼管理——當您從此處移除變數時，請確保文件內容同步更新。
- `npm run test:vitest` 與 `node --import tsx/esm --test tests/unit/publicCreds.test.ts` 兩套測試都必須持續通過。

## 何時不應使用此輔助工具

此輔助工具**僅**適用於符合以下條件的憑證：

1. 由上游提供者公開散布（CLI 二進位檔、瀏覽器套件、官方文件）。
2. 已有文件記載或可強烈推定為非機密資訊（受 PKCE 保護、Firebase Web 金鑰或類似項目）。

對於其他所有內容——由營運人員核發的權杖、個別租戶的機密、您自己的 OAuth 應用程式 `client_secret`、加密金鑰、JWT 機密、資料庫密碼——請**僅使用環境變數**（`process.env.FOO`，使用 `||` 後援為空值／明確錯誤）。這些內容應存放於 `.env` 與[加密憑證儲存區](./COMPLIANCE.md)，而非原始碼中。

## 參考資料

- [Google：原生應用程式的 OAuth 2.0](https://developers.google.com/identity/protocols/oauth2/native-app)
- [Firebase：用於識別用戶端的 API 金鑰](https://firebase.google.com/docs/projects/api-keys)
- [GitHub 機密掃描支援的機密](https://docs.github.com/en/code-security/secret-scanning/introduction/supported-secret-scanning-patterns)
- [GitHub：權杖的 base64 偵測（2025 年 2 月）](https://github.blog/changelog/2025-02-14-secret-scanning-detects-base64-encoded-github-tokens/)
- 引入此輔助工具的提交：`1a39c31f` — _fix(security)：遮蔽公開的上游憑證並集中處理錯誤清理_
