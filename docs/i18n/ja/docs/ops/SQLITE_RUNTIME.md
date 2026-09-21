# SQLite Runtime Resolution (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/SQLITE_RUNTIME.md) · 🇪🇹 [am](../../../am/docs/ops/SQLITE_RUNTIME.md) · 🇸🇦 [ar](../../../ar/docs/ops/SQLITE_RUNTIME.md) · 🇦🇿 [az](../../../az/docs/ops/SQLITE_RUNTIME.md) · 🇧🇬 [bg](../../../bg/docs/ops/SQLITE_RUNTIME.md) · 🇧🇩 [bn](../../../bn/docs/ops/SQLITE_RUNTIME.md) · 🇨🇿 [cs](../../../cs/docs/ops/SQLITE_RUNTIME.md) · 🇩🇰 [da](../../../da/docs/ops/SQLITE_RUNTIME.md) · 🇩🇪 [de](../../../de/docs/ops/SQLITE_RUNTIME.md) · 🇬🇷 [el](../../../el/docs/ops/SQLITE_RUNTIME.md) · 🇪🇸 [es](../../../es/docs/ops/SQLITE_RUNTIME.md) · 🇪🇪 [et](../../../et/docs/ops/SQLITE_RUNTIME.md) · 🇮🇷 [fa](../../../fa/docs/ops/SQLITE_RUNTIME.md) · 🇫🇮 [fi](../../../fi/docs/ops/SQLITE_RUNTIME.md) · 🇫🇷 [fr](../../../fr/docs/ops/SQLITE_RUNTIME.md) · 🇮🇪 [ga](../../../ga/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [gu](../../../gu/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ha](../../../ha/docs/ops/SQLITE_RUNTIME.md) · 🇮🇱 [he](../../../he/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [hi](../../../hi/docs/ops/SQLITE_RUNTIME.md) · 🇭🇷 [hr](../../../hr/docs/ops/SQLITE_RUNTIME.md) · 🇭🇺 [hu](../../../hu/docs/ops/SQLITE_RUNTIME.md) · 🇦🇲 [hy](../../../hy/docs/ops/SQLITE_RUNTIME.md) · 🇮🇩 [id](../../../id/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [ig](../../../ig/docs/ops/SQLITE_RUNTIME.md) · 🇮🇹 [it](../../../it/docs/ops/SQLITE_RUNTIME.md) · 🇬🇪 [ka](../../../ka/docs/ops/SQLITE_RUNTIME.md) · 🇰🇭 [km](../../../km/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [kn](../../../kn/docs/ops/SQLITE_RUNTIME.md) · 🇰🇷 [ko](../../../ko/docs/ops/SQLITE_RUNTIME.md) · 🇱🇹 [lt](../../../lt/docs/ops/SQLITE_RUNTIME.md) · 🇱🇻 [lv](../../../lv/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ml](../../../ml/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [mr](../../../mr/docs/ops/SQLITE_RUNTIME.md) · 🇲🇾 [ms](../../../ms/docs/ops/SQLITE_RUNTIME.md) · 🇲🇹 [mt](../../../mt/docs/ops/SQLITE_RUNTIME.md) · 🇲🇲 [my](../../../my/docs/ops/SQLITE_RUNTIME.md) · 🇳🇵 [ne](../../../ne/docs/ops/SQLITE_RUNTIME.md) · 🇳🇱 [nl](../../../nl/docs/ops/SQLITE_RUNTIME.md) · 🇳🇴 [no](../../../no/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [or](../../../or/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [pa](../../../pa/docs/ops/SQLITE_RUNTIME.md) · 🇵🇭 [phi](../../../phi/docs/ops/SQLITE_RUNTIME.md) · 🇵🇱 [pl](../../../pl/docs/ops/SQLITE_RUNTIME.md) · 🇵🇹 [pt](../../../pt/docs/ops/SQLITE_RUNTIME.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/SQLITE_RUNTIME.md) · 🇷🇴 [ro](../../../ro/docs/ops/SQLITE_RUNTIME.md) · 🇷🇺 [ru](../../../ru/docs/ops/SQLITE_RUNTIME.md) · 🇱🇰 [si](../../../si/docs/ops/SQLITE_RUNTIME.md) · 🇸🇰 [sk](../../../sk/docs/ops/SQLITE_RUNTIME.md) · 🇸🇮 [sl](../../../sl/docs/ops/SQLITE_RUNTIME.md) · 🇷🇸 [sr](../../../sr/docs/ops/SQLITE_RUNTIME.md) · 🇸🇪 [sv](../../../sv/docs/ops/SQLITE_RUNTIME.md) · 🇰🇪 [sw](../../../sw/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [ta](../../../ta/docs/ops/SQLITE_RUNTIME.md) · 🇮🇳 [te](../../../te/docs/ops/SQLITE_RUNTIME.md) · 🇹🇭 [th](../../../th/docs/ops/SQLITE_RUNTIME.md) · 🇹🇷 [tr](../../../tr/docs/ops/SQLITE_RUNTIME.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/SQLITE_RUNTIME.md) · 🇵🇰 [ur](../../../ur/docs/ops/SQLITE_RUNTIME.md) · 🇺🇿 [uz](../../../uz/docs/ops/SQLITE_RUNTIME.md) · 🇻🇳 [vi](../../../vi/docs/ops/SQLITE_RUNTIME.md) · 🇳🇬 [yo](../../../yo/docs/ops/SQLITE_RUNTIME.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/SQLITE_RUNTIME.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/SQLITE_RUNTIME.md)

---

OmniRoute は起動時に、5 段階のフォールバックチェーンを通じて SQLite ドライバーを解決します。

1. **同梱の `better-sqlite3`**（`package.json` の `dependencies` 経由）
   — 最速のネイティブバイナリで、ビルドツールが存在する場合に `npm install` によってインストールされます。

2. **実行時にインストールされる `better-sqlite3`**（`~/.omniroute/runtime/` 内）
   — 初回実行時に遅延インストールされるか、**または** `scripts/build/postinstall.mjs → scripts/postinstall.mjs` によってインストールされます。
   読み込み前にネイティブ `.node` のマジックバイト（ELF / Mach-O / PE）を検証し、
   破損したバイナリや異なるプラットフォーム向けのバイナリが読み込まれるのを防ぎます。

3. **`node:sqlite`**（Node ≥22.5 の標準ライブラリ）— ネイティブビルドは不要です。両方の
   better-sqlite3 パスが失敗した場合に使用されます。機能セットは限定されています。

4. **`sql.js`**（WASM）— 最終フォールバックです。あらゆる環境で動作しますが、速度が遅く、
   データは同期的ではなく一定間隔で書き込まれます。

## なぜこのように複雑なのか？

- **Windows の EBUSY**: 以前のバージョンの `better_sqlite3.node` が実行中のプロセスによって
  ロックされている場合、`npm install -g omniroute@latest` が失敗することがあります。
  `~/.omniroute/runtime/` への実行時インストールにより、グローバル npm キャッシュを回避できます。
- **ビルドツールがない環境**: 一部の環境（VS Build Tools がない企業向け Windows 環境や、
  最小構成の Docker イメージ）では、`better-sqlite3` をコンパイルできません。実行時
  インストーラーは npm レジストリからビルド済みバイナリを取得します。それに失敗した場合でも、
  フォールバックドライバーによって OmniRoute を起動できます。
- **エアギャップ環境**: npm レジストリに到達できない場合でも、`node:sqlite`
  または `sql.js` によって基本機能が保証されます。

## マジックバイトの検証

実行時にインストールされた `.node` ファイルを読み込む前に、OmniRoute は先頭 8
バイトを読み取り、既知のプラットフォームのマジック値と照合します。

| プラットフォーム       | バイト（16 進数） | ラベル      |
| ---------------------- | ----------------- | ----------- |
| Linux                  | `7F 45 4C 46`     | `elf`       |
| macOS 64-bit BE        | `FE ED FA CF`     | `macho`     |
| macOS 64-bit LE        | `CF FA ED FE`     | `macho-le`  |
| macOS fat（universal） | `CA FE BA BE`     | `macho-fat` |
| Windows                | `4D 5A` (MZ)      | `pe`        |

マジック値が一致しない場合 → ファイルは無視され、次のステップへのフォールバックが続行されます。

## アクティブなドライバーの確認

```typescript
import { getDriverInfo } from "@/lib/db/core";

const info = getDriverInfo();
// { source: "bundled" | "runtime" | "runtime-installed-now" | "node-sqlite" | "sql-js",
//   kind: "better-sqlite3" | "node-sqlite" | "sql-js" }
```

## 手動制御

```bash
# postinstall のウォームアップをスキップ（高速な CI インストール向け）
OMNIROUTE_SKIP_POSTINSTALL=1 npm install -g omniroute

# 実行時の better-sqlite3 を強制的に再インストール
rm -rf ~/.omniroute/runtime
omniroute  # 次回起動時に再インストールされます

# アクティブなドライバーを確認
omniroute config db-info  # （CLI コマンドが存在する場合）
```

## リファレンス

実装:

- `bin/cli/runtime/magicBytes.mjs` — バイナリのマジックバイト検証ヘルパー
- `bin/cli/runtime/sqliteRuntime.mjs` — 5 段階の実行時リゾルバー + 遅延インストーラー
- `bin/cli/runtime/index.mjs` — 起動オーケストレーター（`warmUpRuntimes()`）
- `scripts/postinstall.mjs` — npm のインストール後フック（失敗しても致命的ではないウォームアップ）
- `src/lib/db/core.ts` — `ensureDbInitialized()` / `getDriverInfo()` のエクスポート

## シングルライター構成（HA 非対応）

上記のドライバーフォールバックチェーンも、引き続き **1 つのプロセス** 内で実行されます。デフォルトの SQLite
を使用する OmniRoute は **シングルライター** です。

- 2 つの OmniRoute レプリカを同じ `storage.sqlite` ファイルに接続しないでください。
- コンテナの再起動、Recreate デプロイ、OOM kill、または HEALTHCHECK による再起動が発生すると、
  処理中のすべての SSE セッションが切断されます。標準構成にはセッションドレインがありません。
- 遅い `/healthz` を停止状態と見なすオーケストレーターの liveness チェックは、唯一の
  レプリカを終了させます。liveness には TCP を、readiness には HTTP `/healthz` を使用することを推奨します。
  [Docker ガイド — 可用性](../guides/DOCKER_GUIDE.md#availability-default-sqlite-is-single-replica)
  および [Kubernetes プローブの推奨事項](./MONITORING_GUIDE.md#kubernetes-probe-recommendations)を参照してください。
