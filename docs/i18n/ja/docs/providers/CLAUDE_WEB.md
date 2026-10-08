# Providers — Claude Web (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CLAUDE_WEB.md) · 🇪🇹 [am](../../../am/docs/providers/CLAUDE_WEB.md) · 🇸🇦 [ar](../../../ar/docs/providers/CLAUDE_WEB.md) · 🇦🇿 [az](../../../az/docs/providers/CLAUDE_WEB.md) · 🇧🇬 [bg](../../../bg/docs/providers/CLAUDE_WEB.md) · 🇧🇩 [bn](../../../bn/docs/providers/CLAUDE_WEB.md) · 🇧🇦 [bs](../../../bs/docs/providers/CLAUDE_WEB.md) · 🇨🇿 [cs](../../../cs/docs/providers/CLAUDE_WEB.md) · 🇩🇰 [da](../../../da/docs/providers/CLAUDE_WEB.md) · 🇩🇪 [de](../../../de/docs/providers/CLAUDE_WEB.md) · 🇬🇷 [el](../../../el/docs/providers/CLAUDE_WEB.md) · 🇪🇸 [es](../../../es/docs/providers/CLAUDE_WEB.md) · 🇪🇪 [et](../../../et/docs/providers/CLAUDE_WEB.md) · 🇮🇷 [fa](../../../fa/docs/providers/CLAUDE_WEB.md) · 🇫🇮 [fi](../../../fi/docs/providers/CLAUDE_WEB.md) · 🇫🇷 [fr](../../../fr/docs/providers/CLAUDE_WEB.md) · 🇮🇪 [ga](../../../ga/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [gu](../../../gu/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ha](../../../ha/docs/providers/CLAUDE_WEB.md) · 🇮🇱 [he](../../../he/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [hi](../../../hi/docs/providers/CLAUDE_WEB.md) · 🇭🇷 [hr](../../../hr/docs/providers/CLAUDE_WEB.md) · 🇭🇺 [hu](../../../hu/docs/providers/CLAUDE_WEB.md) · 🇦🇲 [hy](../../../hy/docs/providers/CLAUDE_WEB.md) · 🇮🇩 [id](../../../id/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ig](../../../ig/docs/providers/CLAUDE_WEB.md) · 🇮🇹 [it](../../../it/docs/providers/CLAUDE_WEB.md) · 🇬🇪 [ka](../../../ka/docs/providers/CLAUDE_WEB.md) · 🇰🇭 [km](../../../km/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [kn](../../../kn/docs/providers/CLAUDE_WEB.md) · 🇰🇷 [ko](../../../ko/docs/providers/CLAUDE_WEB.md) · 🇱🇹 [lt](../../../lt/docs/providers/CLAUDE_WEB.md) · 🇱🇻 [lv](../../../lv/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ml](../../../ml/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [mr](../../../mr/docs/providers/CLAUDE_WEB.md) · 🇲🇾 [ms](../../../ms/docs/providers/CLAUDE_WEB.md) · 🇲🇹 [mt](../../../mt/docs/providers/CLAUDE_WEB.md) · 🇲🇲 [my](../../../my/docs/providers/CLAUDE_WEB.md) · 🇳🇵 [ne](../../../ne/docs/providers/CLAUDE_WEB.md) · 🇳🇱 [nl](../../../nl/docs/providers/CLAUDE_WEB.md) · 🇳🇴 [no](../../../no/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [or](../../../or/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [pa](../../../pa/docs/providers/CLAUDE_WEB.md) · 🇵🇭 [phi](../../../phi/docs/providers/CLAUDE_WEB.md) · 🇵🇱 [pl](../../../pl/docs/providers/CLAUDE_WEB.md) · 🇵🇹 [pt](../../../pt/docs/providers/CLAUDE_WEB.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CLAUDE_WEB.md) · 🇷🇴 [ro](../../../ro/docs/providers/CLAUDE_WEB.md) · 🇷🇺 [ru](../../../ru/docs/providers/CLAUDE_WEB.md) · 🇱🇰 [si](../../../si/docs/providers/CLAUDE_WEB.md) · 🇸🇰 [sk](../../../sk/docs/providers/CLAUDE_WEB.md) · 🇸🇮 [sl](../../../sl/docs/providers/CLAUDE_WEB.md) · 🇷🇸 [sr](../../../sr/docs/providers/CLAUDE_WEB.md) · 🇸🇪 [sv](../../../sv/docs/providers/CLAUDE_WEB.md) · 🇰🇪 [sw](../../../sw/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ta](../../../ta/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [te](../../../te/docs/providers/CLAUDE_WEB.md) · 🇹🇭 [th](../../../th/docs/providers/CLAUDE_WEB.md) · 🇹🇷 [tr](../../../tr/docs/providers/CLAUDE_WEB.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CLAUDE_WEB.md) · 🇵🇰 [ur](../../../ur/docs/providers/CLAUDE_WEB.md) · 🇺🇿 [uz](../../../uz/docs/providers/CLAUDE_WEB.md) · 🇻🇳 [vi](../../../vi/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [yo](../../../yo/docs/providers/CLAUDE_WEB.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CLAUDE_WEB.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CLAUDE_WEB.md)

---

## `claude-web`

`claude-web` は、認証済みの `claude.ai` ブラウザーセッションを介して、OpenAI 形式のチャットリクエストを送信します。エグゼキューターは、指定された Cookie を正規化し、認証済み組織を1つ解決し、会話状態を準備して、直接またはブラウザートランスポートを選択し、アップストリームの SSE レスポンスを厳密に変換します。オーケストレーションは `open-sse/executors/claude-web.ts:320` にあります。

> **Web Cookie プロバイダーを初めて使用しますか？**
>
> このプロバイダー固有のガイドに進む前に、一般的なセットアップ手順、認証に関するガイダンス、制限事項、トラブルシューティングについて、**`docs/getting-started/WEB-COOKIE-GUIDE.md`** を参照してください。

### モデルカタログ

現在、プロバイダーレジストリでは、次の7つの静的モデル ID のみが公開されています（`open-sse/config/providers/registry/claude/web/index.ts:11`）。

| モデル ID                   | 表示名                  |
| --------------------------- | ----------------------- |
| `claude-fable-5`            | Claude Fable 5 (web)    |
| `claude-opus-4-8`           | Claude Opus 4.8 (web)   |
| `claude-sonnet-5`           | Claude Sonnet 5 (web)   |
| `claude-haiku-4-5-20251001` | Claude Haiku 4.5 (web)  |
| `claude-opus-4-7`           | Claude Opus 4.7 (web)   |
| `claude-opus-4-6`           | Claude Opus 4.6 (web)   |
| `claude-sonnet-4-6`         | Claude Sonnet 4.6 (web) |

このプロバイダーには、動的モデル検出は実装されていません。上記のリストがランタイムカタログです。

### 認証情報と組織の解決

完全な `claude.ai` Cookie ヘッダー、またはセッション値のみを指定してください。セッション値のみの場合は `sessionKey` に正規化されます。ほかの Cookie が指定されている場合、それらは保持されます。エグゼキューターは `cookie` または `apiKey` を介して Cookie を受け取り、接続データからオプションの `deviceId` および `orgId` の値を読み取ります（`open-sse/executors/claude-web.ts:72`）。

`orgId` がない場合、エグゼキューターは `GET https://claude.ai/api/organizations` を呼び出し、認証済み Claude Web セッションによって返された最初の組織を使用します（`open-sse/executors/claude-web.ts:141`）。有効な組織が返されなかった場合は安全側に倒して失敗し、拒否されたセッション認証を 401 として報告し、Cloudflare チャレンジと認証エラーを区別します。

### 会話操作

オプションのトップレベル `claude_web` オブジェクトは厳密です。不明なフィールドは拒否されます。受け付けるフィールドは `open-sse/executors/claude-web/session.ts:50` で定義されています。

| フィールド            | 意味                                                       |
| --------------------- | ---------------------------------------------------------- |
| `operation`           | デフォルトは `completion`。再試行ターンには `retry` を使用 |
| `conversation_id`     | 既存の会話に対する明示的な UUID                            |
| `parent_message_uuid` | 親アシスタントメッセージに対する明示的な UUID              |
| `timezone`            | 有効な IANA タイムゾーン名                                 |
| `locale`              | 構造的に有効なロケール                                     |
| `tool_states`         | オプションのアカウントツール状態配列。最大128エントリ      |

準備されたリクエストは、2つのアップストリームエンドポイントのいずれかを使用します（`open-sse/executors/claude-web.ts:203`）。

- 新規ターンまたは後続ターンは、
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/completion` に送信されます。
- 再試行は、
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/retry_completion` に送信されます。

新規ターンには `create_conversation_params` が含まれます。キャッシュされた、または明示的にリンクされた後続ターンには `parent_message_uuid` が含まれ、`create_conversation_params` は省略されます。再試行には会話状態と親メッセージ状態の両方が必要で、プロンプトは送信されません（`open-sse/executors/claude-web/session.ts:254`）。新規会話では認証済み UI の `/new` が開かれ、キャッシュされた、または明示的にリンクされた後続ターンでは、該当する会話ページが開かれます（`open-sse/executors/claude-web/session.ts:324`）。

会話状態は、SHA-256 のアカウントスコープと呼び出し元の正規化されたトランスクリプトをキーとするインメモリキャッシュです。エントリは30分後に期限切れとなり、キャッシュの上限は5,000エントリです（`open-sse/executors/claude-web/session.ts:12`）。状態は、厳密なストリームパーサーが `message_stop` を検出した後にのみコミットされます。プロセスを再起動すると破棄されます。キャッシュミス時には、以前のメッセージを暗黙的に破棄するのではなく、複数メッセージのリクエストが1つの復元プロンプトにシリアライズされます。

ロケールとタイムゾーンには、リクエストの `claude_web` 値、接続値、ランタイム値、最後にロケールの場合は `en-US`、タイムゾーンの場合は `UTC`、という優先順位が適用されます（`open-sse/executors/claude-web/session.ts:218`）。

### ツールとリクエストペイロード

直接リクエストでは、呼び出し元から提供された、構造的に有効な OpenAI 関数ツールのみが変換されます。架空の静的なデフォルトツールリストはありません（`open-sse/executors/claude-web/payload.ts:102`）。

一方、ブラウザーリクエストでは、認証済み UI リクエストをキャプチャし、そのアカウントツール、ツール状態、およびパーソナライズされたスタイルを保持します。準備された会話、モデル、推論、プロンプト、およびメッセージ UUID の各フィールドは、引き続きキャプチャされたリクエストを上書きします（`open-sse/executors/claude-web/browserTransport.ts:175`）。ブラウザーテンプレートは、アカウント、組織、Cookie、ロケール、およびタイムゾーンのハッシュによってスコープされ、30分後に期限切れになります（`open-sse/executors/claude-web/browserTransport.ts:11`、`open-sse/executors/claude-web/browserTransport.ts:158`）。直接リクエストに呼び出し元のツールがない場合は、そのスコープされたテンプレートを再利用できます。呼び出し元が明示的に指定したツールが優先されます（`open-sse/executors/claude-web/browserTransport.ts:214`）。

### トランスポートの選択

デフォルトのパスは `sendClaudeWebDirect()` です。これは、設定済みの Chrome 146 プロファイルと指定された Cookie を使用して `tlsFetchClaude()` を呼び出します（`open-sse/services/claudeTlsClient.ts:23`）。ソルバーを起動したり、代替 Cookie を生成したりすることはありません。

アカウントスコープのブラウザーアダプターをプライマリトランスポートにするには、`WEB_COOKIE_USE_BROWSER` を `1`、`true`、または `on` に設定します。認識された Cloudflare 403 チャレンジが発生した際に、直接トランスポートからブラウザーアダプターへフォールバックできるようにするには、`OMNIROUTE_BROWSER_POOL` を同じ値のいずれかに設定します（`open-sse/executors/claude-web.ts:195`）。その他の HTTP エラーでは、このフォールバックはトリガーされません。

ブラウザーアダプターは、同じプール済み Playwright コンテキスト内に Cookie を保持し、前述のスコープ付きハッシュキーを使用して、そのコンテキストから補完結果を送信します（`open-sse/executors/claude-web/browserTransport.ts:444`）。ブラウザーで解決した Cookie を直接 TLS クライアントへエクスポートすることはありません。ブラウザーでの再試行には、同じ実際の Playwright コンテキストに紐付けられた、有効期限内の UI テンプレートが必要です（`open-sse/executors/claude-web/browserTransport.ts:467`）。ブラウザーでのレスポンス読み取りは、認証済みページ内でインクリメンタルに実行され、リクエストのキャンセルに従い、16 MiB を超えると直ちにアップストリームのボディーをキャンセルします（`open-sse/executors/claude-web/browserTransport.ts:259`）。

エグゼキューターは、秘匿化された監査用プロジェクションを共有リクエストロガーへ返します。組織、会話およびメッセージの UUID、プロンプトテキスト、ツール定義、Cookie、デバイス識別子は除外されます（`open-sse/executors/claude-web.ts:237`、`open-sse/executors/claude-web.ts:252`）。トランスポート例外の場合も、スローされたメッセージではなく、汎用的な接続エラーが返されます。

### SSE の動作

`createClaudeWebResponse()` は、LF または CRLF のフレーミングと、複数行の `data:` フィールドを処理します。テキスト差分を `content`、思考差分を `reasoning_content`、既知のメタデータイベントを `claude_web` レスポンス拡張へマッピングします。各メタデータイベントは、それぞれ固有のフィールド許可リストを通じてプロジェクションされます（`open-sse/executors/claude-web/stream.ts:37`）。会話、親メッセージ、アシスタントメッセージ、操作の各メタデータも、`X-OmniRoute-Claude-Web-*` ヘッダーで返されます（`open-sse/executors/claude-web/stream.ts:364`）。

不正な JSON、アップストリームの `error` イベント、不明なイベントタイプ、無効な順序、コンテンツブロックの不一致、または `message_stop` より前の EOF が発生した場合、パーサーはフェイルクローズします。ストリーミング出力は完了チャンクを 1 つと `[DONE]` を 1 つ送出し、バッファリング出力も同じパーサーを使用します。パーサーは `message_stop` を直ちに終端として扱い、後続のアップストリームデータをキャンセルし、ダウンストリームのキャンセルをアップストリームのリーダーへ伝播します（`open-sse/executors/claude-web/stream.ts:461`、`open-sse/executors/claude-web/stream.ts:563`）。終端されていない SSE 行と蓄積されたイベントは、1 MiB に制限されます（`open-sse/executors/claude-web/stream.ts:17`、`open-sse/executors/claude-web/stream.ts:62`）。

### ファイル

| ファイル                                                 | 目的                                     |
| -------------------------------------------------------- | ---------------------------------------- |
| `open-sse/config/providers/registry/claude/web/index.ts` | 静的プロバイダーモデルレジストリ         |
| `open-sse/executors/claude-web.ts`                       | エグゼキューターのオーケストレーション   |
| `open-sse/executors/claude-web/payload.ts`               | ペイロードとツールの変換                 |
| `open-sse/executors/claude-web/session.ts`               | ターン状態とトランスクリプトキャッシュ   |
| `open-sse/executors/claude-web/transport.ts`             | 直接トランスポートアダプター             |
| `open-sse/executors/claude-web/browserTransport.ts`      | アカウントスコープのブラウザーアダプター |
| `open-sse/executors/claude-web/stream.ts`                | 厳密な SSE 変換                          |
| `open-sse/services/claudeTlsClient.ts`                   | ネイティブ TLS トランスポート            |
| `open-sse/services/browserPool.ts`                       | プールされた Playwright コンテキスト     |

### テスト

実際の認証情報を使用せずに、決定論的な Claude Web テストスイートを実行します。

```powershell
node --import tsx/esm --test tests/unit/claude-web-auto-refresh.test.ts tests/unit/claude-web-browser-transport.test.ts tests/unit/claude-web-executor-split.test.ts tests/unit/claude-web-live-alignment.test.ts tests/unit/claude-web-payload-runtime.test.ts tests/unit/claude-web-session.test.ts tests/unit/claude-web-sonnet5-registry-6209.test.ts tests/unit/claude-web-stream.test.ts tests/unit/claude-web-transport.test.ts tests/unit/claude-web.test.ts tests/unit/issue-6662-repro.test.ts
```

`tests/unit/claude-web-auto-refresh.test.ts` 内の Playwright に依存するケースは、明示的にスキップされます。このリポジトリでは現在、認証情報を使用する Claude Web ライブテストスクリプトが定義されていないため、これらのスキップされたケースは実行時の動作を証明するものではありません。

### セットアップ

1. `npm run dev` またはビルド済みのインストール環境で OmniRoute を起動します。
2. Dashboard → Providers → Add Provider を開きます。
3. Web Cookie カテゴリーと Claude Web を選択します。
4. 認証済みの `claude.ai` リクエストからコピーした完全な Cookie ヘッダーを貼り付けます。
