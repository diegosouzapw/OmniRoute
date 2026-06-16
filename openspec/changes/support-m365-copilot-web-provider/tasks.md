## 1. Protocol fixtures and helper tests

- [ ] 1.1 `tests/unit/copilot-m365-web-executor.test.ts` を追加し、M365 JWT fixture から bare JWT、`access_token=...`、`Authorization: Bearer ...`、WebSocket URL の token 抽出を検証する red tests を作る。
- [ ] 1.2 `tests/unit/copilot-m365-web-executor.test.ts` に `aud` 不一致、期限切れ `exp`、user claim 欠落、tenant claim 欠落を拒否する red tests を作る。
- [ ] 1.3 `tests/unit/copilot-m365-web-executor.test.ts` に Chathub URL builder が required query keys を持ち、報告用 URL が `access_token` を redact する red tests を作る。
- [ ] 1.4 `tests/fixtures/` または `tests/unit/copilot-m365-web-executor.test.ts` 内に最小 BizChat send/response fixture を追加し、text、done、error frame parser の red tests を作る。

## 2. Provider registration and validation

- [ ] 2.1 `src/shared/constants/providers.ts` に `copilot-m365-web` を追加し、alias が personal `copilot` と衝突しないこと、`providerAllowsOptionalApiKey()` には追加しないことを `tests/unit/provider-route-schemas.test.ts` または関連 unit test で確認する。
- [ ] 2.2 `open-sse/config/providerRegistry.ts` に `copilot-m365-web` の registry entry を追加し、executor ID、alias、model list を定義して alias uniqueness の既存 gate を通す。
- [ ] 2.3 `open-sse/executors/index.ts` に `CopilotM365WebExecutor` の import、dispatch、export を追加する。
- [ ] 2.4 `src/lib/providers/validation.ts` に `validateCopilotM365WebProvider()` を追加し、`tests/unit/provider-validation-specialty.test.ts` で valid token、wrong audience、expired token、missing claim、personal endpoint 非使用を検証する。
- [ ] 2.5 `src/shared/providers/webSessionCredentials.ts` に `copilot-m365-web` の M365 access token credential metadata を追加し、`tests/unit/web-session-credentials.test.ts` に非回帰 expectations を追加する。
- [ ] 2.6 `open-sse/services/tokenExtractionConfig.ts` は実ブラウザ観測済み surface がある場合だけ `copilot-m365-web` extraction config を追加し、未確認の場合は automatic extraction entry を追加しないことを `tests/unit/tokenExtractionConfig.test.ts` で検証する。

## 3. Executor implementation

- [ ] 3.1 `open-sse/executors/copilot-m365-web.ts` を追加し、`extractM365CopilotAccessToken()`、`parseM365CopilotJwt()`、`isM365CopilotTokenPayload()` を実装して、初期対応 claim は `oid` と `tid` に限定する。
- [ ] 3.2 `open-sse/executors/copilot-m365-web.ts` に Chathub WebSocket URL builder と reported URL redaction helper を実装し、実接続 URL と loggable URL を分離する。
- [ ] 3.3 `open-sse/executors/copilot-m365-web.ts` に OpenAI `messages` から最小 BizChat send frame への serializer を実装し、usable user message がない場合は client error にする。
- [ ] 3.4 `open-sse/executors/copilot-m365-web.ts` に BizChat response frame parser と OpenAI-compatible SSE chunk conversion を実装する。
- [ ] 3.5 `CopilotM365WebExecutor.execute()` を実装し、streaming と non-streaming の両方で M365 Chathub/BizChat protocol を使う。
- [ ] 3.6 missing prompt、expired token、WebSocket transport failure、upstream error frame を standard sanitized error response に変換し、raw JWT を response body、`url`、`headers`、`transformedBody` に含めない。

## 4. Personal Copilot non-regression

- [ ] 4.1 `tests/unit/copilot-web-executor.test.ts` で personal `copilot-web` が `POST https://copilot.microsoft.com/c/api/start` と personal WebSocket protocol を使い続けることを確認する。
- [ ] 4.2 `tests/unit/provider-validation-specialty.test.ts` で personal `copilot-web` validator が M365 `aud` checks を適用せず、既存 personal validation endpoint を使い続けることを確認する。
- [ ] 4.3 `tests/unit/web-session-credentials.test.ts` で personal `copilot-web` の credential metadata が変更されていないことを確認する。
- [ ] 4.4 `tests/unit/provider-route-schemas.test.ts` または関連 unit test で `copilot-web` は既存どおり optional API key provider、`copilot-m365-web` は required credential provider であることを確認する。

## 5. Verification

- [ ] 5.1 `node --import tsx/esm --test tests/unit/copilot-m365-web-executor.test.ts` を実行する。
- [ ] 5.2 `node --import tsx/esm --test tests/unit/provider-validation-specialty.test.ts tests/unit/web-session-credentials.test.ts tests/unit/tokenExtractionConfig.test.ts tests/unit/copilot-web-executor.test.ts` を実行する。
- [ ] 5.3 `npm run typecheck:core` を実行する。
- [ ] 5.4 `openspec validate "support-m365-copilot-web-provider" --type change --strict --json` を実行する。
