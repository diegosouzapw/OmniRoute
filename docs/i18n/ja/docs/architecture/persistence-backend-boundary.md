# ADR: Pluggable persistence boundary (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/persistence-backend-boundary.md) · 🇪🇹 [am](../../../am/docs/architecture/persistence-backend-boundary.md) · 🇸🇦 [ar](../../../ar/docs/architecture/persistence-backend-boundary.md) · 🇦🇿 [az](../../../az/docs/architecture/persistence-backend-boundary.md) · 🇧🇬 [bg](../../../bg/docs/architecture/persistence-backend-boundary.md) · 🇧🇩 [bn](../../../bn/docs/architecture/persistence-backend-boundary.md) · 🇨🇿 [cs](../../../cs/docs/architecture/persistence-backend-boundary.md) · 🇩🇰 [da](../../../da/docs/architecture/persistence-backend-boundary.md) · 🇩🇪 [de](../../../de/docs/architecture/persistence-backend-boundary.md) · 🇬🇷 [el](../../../el/docs/architecture/persistence-backend-boundary.md) · 🇪🇸 [es](../../../es/docs/architecture/persistence-backend-boundary.md) · 🇪🇪 [et](../../../et/docs/architecture/persistence-backend-boundary.md) · 🇮🇷 [fa](../../../fa/docs/architecture/persistence-backend-boundary.md) · 🇫🇮 [fi](../../../fi/docs/architecture/persistence-backend-boundary.md) · 🇫🇷 [fr](../../../fr/docs/architecture/persistence-backend-boundary.md) · 🇮🇪 [ga](../../../ga/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [gu](../../../gu/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ha](../../../ha/docs/architecture/persistence-backend-boundary.md) · 🇮🇱 [he](../../../he/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [hi](../../../hi/docs/architecture/persistence-backend-boundary.md) · 🇭🇷 [hr](../../../hr/docs/architecture/persistence-backend-boundary.md) · 🇭🇺 [hu](../../../hu/docs/architecture/persistence-backend-boundary.md) · 🇦🇲 [hy](../../../hy/docs/architecture/persistence-backend-boundary.md) · 🇮🇩 [id](../../../id/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [ig](../../../ig/docs/architecture/persistence-backend-boundary.md) · 🇮🇹 [it](../../../it/docs/architecture/persistence-backend-boundary.md) · 🇬🇪 [ka](../../../ka/docs/architecture/persistence-backend-boundary.md) · 🇰🇭 [km](../../../km/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [kn](../../../kn/docs/architecture/persistence-backend-boundary.md) · 🇰🇷 [ko](../../../ko/docs/architecture/persistence-backend-boundary.md) · 🇱🇹 [lt](../../../lt/docs/architecture/persistence-backend-boundary.md) · 🇱🇻 [lv](../../../lv/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ml](../../../ml/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [mr](../../../mr/docs/architecture/persistence-backend-boundary.md) · 🇲🇾 [ms](../../../ms/docs/architecture/persistence-backend-boundary.md) · 🇲🇹 [mt](../../../mt/docs/architecture/persistence-backend-boundary.md) · 🇲🇲 [my](../../../my/docs/architecture/persistence-backend-boundary.md) · 🇳🇵 [ne](../../../ne/docs/architecture/persistence-backend-boundary.md) · 🇳🇱 [nl](../../../nl/docs/architecture/persistence-backend-boundary.md) · 🇳🇴 [no](../../../no/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [or](../../../or/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [pa](../../../pa/docs/architecture/persistence-backend-boundary.md) · 🇵🇭 [phi](../../../phi/docs/architecture/persistence-backend-boundary.md) · 🇵🇱 [pl](../../../pl/docs/architecture/persistence-backend-boundary.md) · 🇵🇹 [pt](../../../pt/docs/architecture/persistence-backend-boundary.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/persistence-backend-boundary.md) · 🇷🇴 [ro](../../../ro/docs/architecture/persistence-backend-boundary.md) · 🇷🇺 [ru](../../../ru/docs/architecture/persistence-backend-boundary.md) · 🇱🇰 [si](../../../si/docs/architecture/persistence-backend-boundary.md) · 🇸🇰 [sk](../../../sk/docs/architecture/persistence-backend-boundary.md) · 🇸🇮 [sl](../../../sl/docs/architecture/persistence-backend-boundary.md) · 🇷🇸 [sr](../../../sr/docs/architecture/persistence-backend-boundary.md) · 🇸🇪 [sv](../../../sv/docs/architecture/persistence-backend-boundary.md) · 🇰🇪 [sw](../../../sw/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [ta](../../../ta/docs/architecture/persistence-backend-boundary.md) · 🇮🇳 [te](../../../te/docs/architecture/persistence-backend-boundary.md) · 🇹🇭 [th](../../../th/docs/architecture/persistence-backend-boundary.md) · 🇹🇷 [tr](../../../tr/docs/architecture/persistence-backend-boundary.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/persistence-backend-boundary.md) · 🇵🇰 [ur](../../../ur/docs/architecture/persistence-backend-boundary.md) · 🇺🇿 [uz](../../../uz/docs/architecture/persistence-backend-boundary.md) · 🇻🇳 [vi](../../../vi/docs/architecture/persistence-backend-boundary.md) · 🇳🇬 [yo](../../../yo/docs/architecture/persistence-backend-boundary.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/persistence-backend-boundary.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/persistence-backend-boundary.md)

---

- **ステータス:** 提案中 — ランタイムに関する作業を開始する前にメンテナーの承認が必要
- **トラッキング issue:** [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075)
- **スコープ:** 永続化アーキテクチャのみ。この決定では外部データベースの追加または選定は行わない

## コンテキスト

OmniRoute は現在、`src/lib/db/` からドメイン指向の永続化関数を提供しており、
`src/lib/db/core.ts` が返す共有接続は、`src/lib/db/adapters/types.ts` の同期的な `SqliteAdapter`
コントラクトを実装しています。このアダプターは複数の SQLite ランタイムをサポートしますが、
そのインターフェースは依然として SQLite 固有の形をしています。具体的には、同期的なプリペアドステートメント、`pragma`、遅延および即時
トランザクション、ネイティブ／ファイルコピーによるバックアップ、チェックポイント、ローカルデータベースハンドルです。

現在の起動およびリカバリーパスも、SQLite ファイルのライフサイクルを担っています。`src/lib/db/core.ts`
は `storage.sqlite` を解決し、プロセス全体で単一のアダプターを維持し、WAL のチェックポイントを実行し、リカバリー時に選択された
テーブルを保持し、データベースの再構築時に SQLite の付随ファイルを削除します。
`src/lib/db/adapters/driverFactory.ts` におけるドライバー選択は、サポート対象の SQLite ランタイムから選択するものであり、
外部バックエンドの抽象化ではありません。

スキーマの進化も同様に密結合しています。`src/lib/db/migrationRunner.ts` は番号付き SQL ファイルを適用し、
`sqlite_master` と `PRAGMA table_info` を調査し、オプションの FTS5 サポートを検出し、SQLite トランザクション内で
マイグレーション処理を実行します。`src/lib/db/backup.ts` や
`src/lib/db/optimizationSettings.ts` などの運用モジュールは、バックアップ、`PRAGMA`、WAL、ページサイズ、自動バキューム、`VACUUM`
のセマンティクスを直接使用します。

これらは組み込み SQLite デプロイメントの妥当な特性です。PostgreSQL や MySQL に SQLite API の模倣を
強制することなく、引き続き利用可能であるべきです。

## 決定

移植可能な永続状態のために、2 層の永続化境界を採用します。

1. **ドメインリポジトリのコントラクト**は、ビジネスおよびルーティング
   コードが必要とする永続化操作を定義します。呼び出し側は、SQL テキスト、プリペアドステートメント、
   データベースファイル、方言オブジェクトではなく、ドメインの振る舞いとドメインデータに依存します。
2. **内部の非同期バックエンドコントラクト**は、トランザクションコンテキスト、ヘルス／準備状態、マイグレーションの調整、バックエンド機能、
   および分類されたエラーによってリポジトリ実装をサポートします。正確な TypeScript インターフェースは最初の実装
   PR で提案し、適合性テストによって実証します。この ADR では、推測に基づく API を意図的に固定しません。

SQLite はデフォルト実装のまま維持します。既存の SQLite ドライバーカスケードと同期的な
`SqliteAdapter` は、各ドメインを小さな垂直スライス単位で移行する間、SQLite リポジトリ実装の背後に残します。
外部サービスの設定をユーザーに要求することはありません。

PostgreSQL は、SQLite に対してリポジトリ境界が実証された後に提案する最初の外部実装です。
MySQL は、第 2 のビジネスロジックのフォークとしてではなく、同じ適合性テストスイートに対する同等の実装として
その後に続きます。

## 境界のルール

### 移植可能なリポジトリインターフェース

移植可能なリポジトリは、以下を公開できます。

- ドメインの読み取りおよび書き込み。
- 明示的なアトミック操作およびトランザクションスコープのリポジトリアクセス。
- 同時実行セマンティクスがドメインの一部である場合の、比較／更新操作またはリース操作。
- バックエンドに依存しないページネーション、順序付け、および制約エラー。

バックエンドのヘルス、準備状態、およびマイグレーションの調整は、個々のドメインリポジトリではなく、
内部のバックエンド／運用コントラクトに属します。

移植可能なリポジトリは、以下を公開してはなりません。

- `prepare`、`get`、`all`、`run`、または生のドライバーハンドル。
- `PRAGMA`、WAL チェックポイントモード、`VACUUM`、またはページ／キャッシュのチューニング。
- SQLite ファイルパス、付随ファイル、またはファイルコピーによるバックアップ。
- クロスバックエンドのドメインコントラクトとしての `lastInsertRowid`。
- FTS5 または `sqlite-vec` の構文。
- 通常のビジネスコードから使用される、汎用的な方言依存のエスケープハッチ。

### バックエンド機能のインターフェース

バックエンド固有の振る舞いは、明示的かつ検出可能な状態に保ちます。SQLite 専用のメンテナンスは、
以下を含め、それ自身の実装および運用インターフェースの背後に置きます。

- ランタイムドライバーの選択。
- WAL チェックポイントおよび SQLite のシャットダウン動作。
- ページサイズ、キャッシュサイズ、および自動バキュームの設定。
- データベースファイルのバックアップ、復元、およびリカバリー。
- SQLite スキーマのイントロスペクション。
- FTS5 および `sqlite-vec` の統合。

外部バックエンドに、これらの機能の模倣を要求することはありません。リポジトリは、移植可能な
機能を使用するか、動作が文書化されたバックエンド固有の実装を提供するか、または
機能が利用できないことを報告しなければなりません。

## トランザクションおよびマイグレーションモデル

リポジトリ API がアトミックなビジネス操作を定義し、呼び出し元は SQL トランザクションモードを選択しません。
各操作では、保護される不変条件、競合検出、再試行の分類、冪等性に関する要件、およびトランザクションコンテキストの伝播を含む、外部から観測可能な並行性保証を定義する必要があります。
実装では、これらの外部から観測可能な保証が同等に保たれる場合に限り、異なるトランザクションおよび分離メカニズムを使用できます。SQLite では、操作の契約を満たす場合、現在の遅延トランザクションまたは即時トランザクションの動作を内部的に引き続き使用できます。

外部バックエンドでは、複数のアプリケーションレプリカが同じスキーマ変更を巡って競合しないように、マイグレーションの所有権を明示する必要があります。バックエンドのマイグレーション履歴で論理的なマイルストーンを共有することはできますが、SQLite の SQL ファイルが別の方言へ移植可能または再利用可能であるとは想定しません。

## バックエンド間の適合性セマンティクス

適合性テストでは、リポジトリメソッドのシグネチャだけでなく、動作も対象とする必要があります。マイグレーションされる各ドメインでは、以下を定義し、検証する必要があります。

- タイムスタンプのタイムゾーン、精度、およびシリアライズ形式；
- `NULL` の順序付け、照合順序、および大文字と小文字の区別に関する要件；
- JSON の表現および比較動作；
- 整数、小数、および金額の精度；
- ページネーションにおける安定した順序付けと決定論的な同順位の解消方法；
- SQLite の行 ID に依存しない ID 生成；
- 一意性制約違反および外部キー制約違反の分類；
- no-op、比較／更新、および削除操作における影響行数の動作；
- 並行書き込みの結果、再試行可能な競合、および冪等な再試行。

あるドメインで外部から観測可能な同等のセマンティクスを明示できない場合、そのドメインはまだ移植可能ではなく、その契約が設計されるまでバックエンド固有のままとする必要があります。

## 互換性要件

この ADR に従うすべての実装は、以下の特性を維持する必要があります。

- SQLite は、引き続き設定不要のデフォルトです。
- 既存の SQLite ファイルとマイグレーション履歴は、引き続き読み取り可能です。
- npm、Electron、Docker、および制限付きランタイム向けの SQLite フォールバックは、現在の起動パスを維持します。
- 保存されたプロバイダー認証情報では、既存のアプリケーション暗号化動作を引き続き使用します。
- リポジトリのマイグレーションによって、ルーティング、クォータ、API キー、または監査のセマンティクスが暗黙的に変更されることはありません。
- バックアップおよび復旧の動作は、普遍的なものとして提示するのではなく、バックエンドごとに文書化します。
- SQLite のみを使用するクリーンインストールでは、外部データベースドライバーをロードしたり必須としたりしません。

## 提供手順

1. 再現可能な SQLite 依存関係の一覧を、個別のレビュー成果物として公開します。
2. 最初のドメインリポジトリ契約と適合性テストを導入します。
3. デフォルトを変更せずに、既存の SQLite 実装をそれらの契約に適合させます。
4. メンテナーの承認を条件として、限定されたコントロールプレーン領域の最初の外部実装として PostgreSQL を追加します。
5. 並行書き込みおよびマイグレーション所有権のテストが用意された後にのみ、共有状態を拡張します。
6. データベース切り替えを告知する前に、オフラインで検証済みの SQLite から外部バックエンドへのマイグレーションパスを追加します。
7. 実証済みのリポジトリ契約およびバックエンド契約に基づいて MySQL を追加します。

各ランタイム手順は、個別にレビュー可能な PR とします。後続の手順を、先行する手順で未検証の抽象化をマージする根拠として使用してはなりません。

## 最初の実装スライス

最初のランタイムスライスは、結合関係の棚卸しをレビューした後に選定する必要があります。プロバイダー接続、API キー、コンボ、ルーティング設定は、その基盤テーブルが `src/lib/db/core.ts` で確認できるため候補となりますが、この ADR はテーブル一覧やマイグレーション PR を承認するものではありません。
このスライスには、以下を含める必要があります。

- SQLite の動作保持テスト
- リポジトリ適合性テスト
- 明示的なトランザクション境界
- 保存された認証情報に対する暗号化および秘匿化の検証
- デフォルトの起動設定を変更しないこと

## 検討した代替案

### `SqliteAdapter` の下層に PostgreSQL を追加する

却下しました。`SqliteAdapter` は SQLite ランタイム向けの互換性レイヤーであり、SQLite 固有の操作を公開しています。そのインターフェースをエミュレートすると、同期処理および方言固有の前提が新しいバックエンドに漏れ出すことになります。

### すべてのドメインに汎用のクエリ／実行 API を公開する

主要な境界としては却下しました。これにより接続処理は一元化されますが、SQL 方言、トランザクション、テーブルへの結合はビジネスモジュール内に残ります。低レベルのバックエンドプリミティブは、アプリケーション向けの永続化 API としてではなく、リポジトリ実装の内部に存在する場合があります。

### 1 つのスライスを検証する前に、すべての永続化処理を書き換える

却下しました。現在の永続化領域は広範であり、ファイルのライフサイクル、復旧、検索、運用設定が含まれています。垂直スライスにより、レビュー可能な動作単位とロールバック境界を確保できます。

### デフォルトとして SQLite を置き換える

却下しました。組み込み環境およびデスクトップ環境へのデプロイは、現在の外部サービス不要の起動モデルに依存しています。外部バックエンドはオプトインです。

### Redis を永続データの信頼できる情報源として使用する

却下しました。Redis は、明示的に一時的な調整、キャッシュ、カウンターをサポートする場合がありますが、ここで説明する永続リポジトリ契約を置き換えるものではありません。

## 影響

### 利点

- ビジネスコードは、データベース方言に依存しない安定した永続化境界を得られます。
- 外部バックエンドによって抽象化を定義する前に、SQLite の動作がテストされます。
- PostgreSQL と MySQL は、ドメインロジックを重複させるのではなく、契約とテストを共有します。
- SQLite 固有の機能は、抽象化から漏れ出す互換性シムになることなく、第一級の機能として維持されます。
- 複数レプリカ環境でのマイグレーションおよびトランザクションの動作が、明示的な設計上の考慮事項になります。

### コストとリスク

- リポジトリの抽出には、呼び出し箇所の段階的な移行が必要です。
- 非同期境界が、現在は同期的なサービスコード全体に波及する可能性があります。
- バックエンド間で意味論を統一するには、SQL 構文の互換性を超えた適合性テストが必要です。
- バックアップ、検索、ベクトルストレージ、メンテナンスは、引き続き機能固有です。
- 複数の永続化実装を運用すると、CI および運用サポートのコストが増加します。

## 非目標

この ADR では、以下を行いません。

- データベース依存関係、環境変数、スキーマ、マイグレーションの追加
- 稼働中の SQLite シングルトンまたはドライバーカスケードの変更
- 特定のリリースにおける PostgreSQL または MySQL のサポート保証
- FTS5、`sqlite-vec`、バックアップファイル、SQLite メンテナンスのポータブル化
- 共有状態および調整に関するテストが存在する前の、アクティブ／アクティブ対応の定義
- `src/lib/db/` の一括書き換えの承認

## メンテナー承認に向けた未解決事項

1. リポジトリと内部非同期バックエンド境界を組み合わせる方針が望ましいですか。それとも、
   外部永続化は別個のコントロールプレーンサービスの背後に配置すべきですか。
2. SQLite への準拠後、最初の外部実装として PostgreSQL を採用しても問題ありませんか。
3. 最初に境界付けされたリポジトリスライスとすべきドメインはどれですか。
4. 最初のマルチレプリカのマイルストーンでは、どの状態を共有し、どの状態をノードローカルのままにすべきですか。
5. リポジトリ移行が中断またはロールバックされた場合、どの程度の互換性維持期間が必要ですか。

これらの問題が解決されるまで、この文書は提案段階であり、ランタイムのリファクタリングを行うことを意味するものではありません。
