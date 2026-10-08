# ACP registry and registered CLI launchers (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

OmniRoute は、**CLI 検出**、**ネイティブ Agent Client Protocol**、および
**レガシー stdio アダプター**を分離しています。インストール済みのバイナリが見つかっても、
その認証、モデル互換性、またはプロンプトを処理する準備が整っていることを証明するものではありません。

ダッシュボードは、インベントリとカスタムエージェントの登録に `GET /api/acp/agents` と
`POST /api/acp/agents` を使用します。これらはローカル専用の管理ルートであり、
プロセスの起動やプロンプトの送信に使用する公開 API ではありません。内部の
`AcpManager` が自動的に HTTP プロバイダーのフォールバックになることはありません。

## 登録済みコントラクト

`config/cli-tools-manifest.json` は、組み込みの起動バイナリ、引数、およびバックエンドモードに
関する信頼できる唯一の情報源です。レジストリは、このマニフェストから定義を導出します。
検出結果は 60 秒間キャッシュされます。

- `acp`: Gemini コントラクトは `gemini --experimental-acp` を起動し、
  公式 TypeScript SDK を介して改行区切りの ACP JSON-RPC で通信します。
- `stdio-adapter`: その他の登録済みコントラクトは、改行入力と
  stdout 出力を使用するレガシーアダプターを維持します。出力が 2 秒間アイドル状態になると、
  応答を終了します。このアダプターは、それらの CLI がネイティブ ACP をサポートすることを
  **保証しません**。

Gemini は、その [CLI リファレンス](https://geminicli.com/docs/cli/cli-reference/)で起動フラグを説明しています。
クライアントは、初期化、セッション作成、プロンプト要求、通知、およびキャンセルに
[公式 ACP SDK](https://github.com/agentclientprotocol/typescript-sdk)を使用します。

カスタムエージェント定義は、引き続き管理者が制御する起動コントラクトです。
バイナリと引数を登録すると、そのプロセスにサーバーユーザーのローカル実行権限が付与されます。
登録はサンドボックスではありません。バージョンプローブでは、登録済みの実行可能ファイルと
認識されたバージョンフラグのみを受け付けます。

## 内部起動 API

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("gemini", {
  cwd: process.cwd(),
  // このエージェントに意図的に割り当てたプロバイダー変数のみを渡します。
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
});

try {
  const response = await acpManager.sendPrompt(session.id, "Explain this project", 120_000);
  // 呼び出し元アプリケーションで応答を処理します。
} finally {
  acpManager.kill(session.id);
}
```

`spawn(agentId, options)` は、登録済みの定義から実行可能ファイルと引数を解決します。
呼び出し元が指定できるオプションは `cwd` と `env` のみです。旧形式の
`spawn(agentId, binary, args, env)` シグネチャと実行可能ファイルのオーバーライドは
拒否されます。このマネージャーは HTTP 起動コントラクトをサポートしていません。

子プロセスは、CLI ランチャーと同じオペレーティングシステム、ターミナル、ロケール、および
証明書の許可リストを継承します。サーバー／プロバイダーのシークレットは親環境から
コピーされません。選択した CLI に必要な認証情報は、明示的に渡すか、
その CLI 独自のローカル認証を通じて提供する必要があります。子プロセスは引き続き
ローカルユーザーのファイルシステム権限を持ち、自身の設定を読み取ることができます。

## ネイティブのライフサイクルと制限

1. 登録済みバイナリを起動し、ACP を初期化して、選択した作業ディレクトリをルートとする
   セッションを作成します。初期化の制限時間は 10 秒です。
2. プロンプトを送信し、そのセッションのみを対象とするテキスト通知を収集します。
   完了を示すのはプロンプト RPC 応答であり、stdout が一定期間無出力になることではありません。
3. 未完了の初期化時間も含めて、プロンプトには単一の期限を使用します。デフォルトは
   120 秒です。同一プロセス内でのプロンプトの同時実行は拒否されます。
4. ネイティブ処理がタイムアウトした場合は、`session/cancel` を試行してプロセスを終了します。
   終了前に通知をフラッシュできるよう、100 ms の制限付き猶予期間を設けます。
5. 初期化が失敗した場合、接続が閉じられた場合、プロセスが終了した場合、または呼び出し元が
   プロセスを強制終了した場合は、トランスポート状態を閉じてセッションを削除します。

ツールの権限要求は拒否されます。ファイルシステムまたはターミナルのクライアント機能は
通知されません。これらの制限は、子バイナリ自体をサンドボックス化するものでも、
CLI 独自の認可設定を置き換えるものでもありません。

ネイティブテキストとレガシー stdout/stderr はどちらも、最大 1 MiB の文字を保持し、
切り捨て通知を付けて最新の出力を維持します。個々のネイティブワイヤーフレームは、
SDK で解析される前の時点で 2 MiB のバイト数に制限されます。バッファーはプロンプトごとに
リセットされます。

`kill(sessionId)` は SIGTERM を送信し、5 秒後もプロセスが終了していない場合は
SIGKILL を送信します。レガシープロンプトのタイムアウトでは、リスナーとタイマーを解放しますが、
別のプロンプトに使用できるようセッションは維持されます。処理完了時に `kill()` または
`killAll()` を呼び出す責任は、引き続き呼び出し元にあります。

## イベントと検査

マネージャーは `stdout`、`stderr`、および `exit` を発行し、それぞれに `sessionId` が
含まれます。`sessionError` は、サニタイズされたトランスポートエラーを報告します。
互換性用の `error` イベントは、サブスクライバーが存在する場合にのみ発行されるため、
バイナリが見つからなくても未処理の EventEmitter エラーは発生しません。

- `getSession(sessionId)` は、管理対象のセッションまたは `undefined` を返します。
- `getActiveSessions()` は、停止済みまたは停止中のセッションを除外します。
- `sendInput(sessionId, input)` は、稼働中のレガシーアダプターでのみ使用できます。
  ネイティブ ACP は、その JSON-RPC ストリームを保護するために生の入力を拒否します。
- `killAll()` は、そのインスタンスが管理するすべてのセッションを終了します。

## 検証範囲

決定論的フィクスチャーは、ネイティブハンドシェイク、テキスト出力、拒否された権限、
キャンセル、並行プロンプト、初期化失敗、プロセス終了、出力制限、およびシークレット分離を
網羅します。既存のレガシーバッファー／リスナーのリグレッションも引き続き網羅されます。
これらのテストは、実際の Gemini ログインやプロバイダー推論の成功を実証するものではありません。
それらには、対象環境で個別に認可されたスモークテストが必要です。

## 関連ドキュメント

- [エージェントプロトコル](./AGENT_PROTOCOLS_GUIDE.md)
- [CLI 起動コントラクト](../guides/CLI-LAUNCH-CONTRACTS.md)
- [CLI ツール](../reference/CLI-TOOLS.md)
- [A2A サーバー](./A2A-SERVER.md)
- [クラウドエージェント](./CLOUD_AGENT.md)
