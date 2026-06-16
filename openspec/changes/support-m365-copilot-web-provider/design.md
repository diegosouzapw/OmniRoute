## Context

現在の `copilot-web` は personal Microsoft Copilot 専用の web-session provider である。
`open-sse/executors/copilot-web.ts` は `POST https://copilot.microsoft.com/c/api/start`
で `conversationId` を作り、`wss://copilot.microsoft.com/c/api/chat?api-version=2`
へ接続し、`{ event: "send", conversationId, content, mode }` 形式のイベントを送る。
`src/lib/providers/validation.ts` も
`https://copilot.microsoft.com/c/api/conversations?language=en` を Bearer token で
probe する前提になっている。

Issue #3897 の対象である Microsoft 365 Enterprise Copilot は、M365/Entra ID
アカウントの Substrate token audience を使い、`wss://substrate.svc.cloud.microsoft`
配下の Chathub/BizChat protocol に接続する。personal `copilot-web` と endpoint、
token audience、auth placement、session lifecycle、message frame が異なるため、
同じ provider の分岐として扱うと validation、UI credential、optional-key behavior、
executor dispatch の意味が曖昧になる。

この変更は web-session provider の追加であり、公式公開 API への統合ではない。
BizChat frame はブラウザ内部 protocol の観測に依存するため、実装は fixtures と
明示的な parser/serializer 境界を持つ必要がある。

## Goals / Non-Goals

**Goals:**

- `copilot-m365-web` を `copilot-web` とは別の provider として登録する。
- M365 Copilot の `access_token` JWT を受け取り、少なくとも `aud`、`exp`、
  user/tenant を表す claim を検証してから upstream に使う。
- OpenAI chat-completion request を M365 BizChat send frame に変換し、upstream の
  streamed response を OmniRoute の SSE / JSON response shape に戻す。
- `access_token` が WebSocket URL query に入る制約を前提に、executor の戻り値、
  error body、log、`transformedBody` へ token を露出させない。
- personal `copilot-web` の endpoint、validator、credential guide、optional-key
  behavior、既存 tests を変えない。

**Non-Goals:**

- M365 OAuth login/device-code flow や refresh-token 管理は扱わない。
- Microsoft Graph や公開 Copilot API としての汎用統合は扱わない。
- Playwright/browser automation によるログイン代行は扱わない。
- personal `copilot-web` を M365 互換に拡張することはしない。
- BizChat protocol の未観測機能、画像生成、multi-turn resume、tenant policy
  bypass は初期スコープ外とする。

## Decisions

### 1. 新 provider として `copilot-m365-web` を追加する

`src/shared/constants/providers.ts`、`open-sse/config/providerRegistry.ts`、
`open-sse/executors/index.ts` に `copilot-m365-web` を追加する。alias は
`copilot-m365` など personal `copilot` と衝突しない名前にする。

`providerAllowsOptionalApiKey()` には追加しない。M365 側は enterprise JWT が必須で、
anonymous/limited access の意味がないためである。

代替案は既存 `copilot-web` に `providerSpecificData.mode = "m365"` のような分岐を
足すことだが、personal と enterprise で validation endpoint と auth method が
根本的に違うため、UI と tests の責務が混ざる。新 provider の方が non-regression を
証明しやすい。

### 2. JWT validation は構造検証を先に行い、network probe は補助にする

`src/lib/providers/validation.ts` に `validateCopilotM365WebProvider()` を追加する。
初期実装では safe かつ副作用なしと確認できた Substrate probe がない限り、network probe は
必須にしない。まず JWT 構造を検証し、personal `copilot.microsoft.com` endpoint へは
絶対に送らない。executor 側には testable helper として次を置く。

- `extractM365CopilotAccessToken(input)`
- `parseM365CopilotJwt(token)`
- `isM365CopilotTokenPayload(payload)`

入力は bare JWT、`access_token=...`、`Authorization: Bearer ...`、および DevTools で
コピーした WebSocket URL から抽出できるようにする。JWT payload は `base64url`
decode し、`aud` が `https://substrate.office.com/sydney` と一致すること、`exp` が
現在時刻より未来であること、Chathub path に必要な user/tenant claim が存在することを
確認する。初期対応の Chathub path identity は `oid` を user identity、`tid` を tenant
identity として扱い、未確認 claim 名へ広げない。

JWT 署名検証は初期スコープに含めない。OmniRoute は upstream に bearer を渡す proxy
であり、公開鍵取得と issuer matrix の維持はこの変更の目的を超える。署名の正当性は
upstream 接続で最終確認される。

### 3. Executor は protocol 境界を helper 化する

`open-sse/executors/copilot-m365-web.ts` に `CopilotM365WebExecutor` を追加する。
責務は次に分ける。

- credential extraction と JWT payload parsing
- `chatsessionid`、`clientrequestid`、`ConversationId`、`X-SessionId` の生成
- Chathub WebSocket URL 構築
- OpenAI messages から BizChat send frame への変換
- BizChat response frame から text / reasoning / citation / terminal event への変換
- streaming SSE と non-streaming JSON の組み立て

既存 `CopilotWebExecutor` の `getCopilotMode()` や session pool を共有しない。
personal provider は `/c/api/start` の `remainingTurns` と `conversationId` に依存するが、
M365 は direct WebSocket connect が前提で lifecycle が異なるためである。

### 4. Token redaction を protocol 境界で固定する

M365 Chathub は `access_token` を WebSocket query parameter に入れる必要がある可能性が
高い。この URL をそのまま `url`、error message、debug output、`transformedBody` に
返すと credential leak になる。

Executor は実接続用の URL と報告用の redacted URL を分ける。戻り値の `url` は
`access_token=<redacted>` に置換済みの値だけにする。error response は
`makeExecutorErrorResult()` または `buildErrorBody()` / `sanitizeErrorMessage()` 経由にし、
raw upstream frame や raw exception を Response body に入れない。

### 5. In-app extraction と dashboard credential metadata は M365 専用にする

`src/shared/providers/webSessionCredentials.ts` へ `copilot-m365-web` の token metadata を
追加する。`storageKeys` は `token`、`access_token`、`accessToken` に加え、必要なら
`m365AccessToken` を許容する。

`open-sse/services/tokenExtractionConfig.ts` は personal `copilot-web` とは別に扱う。
対象 origin は M365 Copilot が実際に token を使う browser surface に限定し、source は
query/header/localStorage のうち実装時に観測できたものだけを書く。観測できていない抽出元は
docs や config に書かない。verified surface がない場合、初期実装は dashboard の manual paste
credential metadata だけを提供し、automatic extraction config は追加しない。

### 6. Tests は protocol helpers と non-regression に寄せる

初期 tests は live M365 tenant に依存しない。unit tests で以下を固定する。

- provider metadata と registry entry が存在すること
- `copilot-m365-web` が optional API key provider ではないこと
- `validateCopilotM365WebProvider()` が wrong audience、expired token、missing user/tenant
  claim を拒否すること
- Chathub URL builder が required query keys を持ち、報告用 URL が token を redacts すること
- BizChat parser が fixture frame から SSE chunk に必要な text/done/error を抽出すること
- `copilot-web` の validator と credential metadata が既存期待値のまま残ること

Live smoke は手元に M365 Business/Enterprise license と valid token がある環境でのみ
手動検証として扱う。

## Risks / Trade-offs

- [Risk] BizChat frame schema が不完全、または Microsoft 側で変わる。
  Mitigation: serializer/parser を小さな helper に閉じ込め、fixtures を追加し、unknown frame は
  failure ではなく ignored/diagnostic event として扱う。

- [Risk] `access_token` query parameter が logs や response に漏れる。
  Mitigation: connect URL と reported URL を分離し、redaction test を必須にする。

- [Risk] JWT claim 名が tenant/account 種別で揺れる。
  Mitigation: parser は候補 claim を限定的に扱い、missing claim は明示的な再抽出/unsupported
  message にする。未確認 claim 名は実装しない。

- [Risk] M365 token は短命で refresh できない。
  Mitigation: `exp` を validation と execute 前に確認し、expired/near-expired の場合は
  re-authentication message を返す。

- [Risk] personal `copilot-web` の behavior が巻き添えで変わる。
  Mitigation: provider ID、validator、executor、token extraction config を分離し、既存
  `copilot-web` tests を非回帰 gate にする。

## Migration Plan

1. `copilot-m365-web` を provider catalog と executor registry に追加する。
2. M365 JWT helper と validation を追加し、wrong-audience/expired/missing-claim tests を先に通す。
3. Chathub URL builder、redaction、BizChat serializer/parser を fixture-driven tests で追加する。
4. Executor wiring を追加し、streaming/non-streaming response shape の unit tests を通す。
5. Verified surface がある場合だけ in-app token extraction config を追加し、dashboard credential metadata は常に追加する。
6. `node --import tsx/esm --test` で関連 unit tests を実行し、必要なら `npm run typecheck:core` を実行する。

Rollback は `copilot-m365-web` の registry/metadata/executor wiring を外すだけでよい。
既存 `copilot-web` は別 provider として残るため、personal Copilot 利用者への migration は不要。

## Open Questions

- BizChat send frame と response frame の最小確定 schema はどの captured fixture を正とするか。
- Validation の network probe はどの Substrate endpoint が最小かつ副作用なしで使えるか。
- Token extraction config に書ける origin/source は、実ブラウザ観測でどこまで確認できるか。
