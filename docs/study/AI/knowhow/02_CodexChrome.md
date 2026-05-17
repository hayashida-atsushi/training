---
tags: [AI-generated]
---

# Codex Chrome 拡張でローカルページを確認する

## なぜやるか

Codex はコード編集だけでなく、Chrome 拡張を使ってブラウザ上の表示確認もできる。<br/>
ローカルで起動した Docusaurus などのページを開き、表示状態を確認したり、スクリーンショットを保存したりできるため、フロントエンドの修正確認に使いやすい。<br/>
ここでは、`npm start` で起動したページを Chrome で開き、ダークモードのスクリーンショットを保存したときの流れを整理する。

## できること

1. `@chrome` を指定して、Codex から Chrome のタブを操作できる
2. ローカルで起動したページを Chrome で開ける
3. ページのテーマをダークモードにしてスクリーンショットを保存できる
4. 表示確認後、起動したサーバーや一時プロファイルを片付けられる

### 未検証なこと

1. ログインが必要なサイトでの安定した操作
2. Chrome 拡張が無効な環境での復旧手順
3. モバイル幅など、複数 viewport でのスクリーンショット取得

## 事前に準備するもの

Chrome 拡張を使うため、以下を事前に用意しておく。<br/>
拡張のインストールや有効化は環境依存なので、ここでは詳細な手順は省略する。

- Google Chrome
- Codex Chrome Extension
- `npm start` で起動できるプロジェクト
- スクリーンショットを保存するリポジトリ内のディレクトリ

## 実行例

Codex への依頼は、操作対象と保存先を明確にすると安定しやすい。

```text
@chrome npm startでこのリポジトリのページを開いた後、
ブラウザをダークモードにしてスクショをこのリポジトリに保存して
```

今回のリポジトリでは、Docusaurus の `baseUrl` が `/training/` になっているため、起動後の URL は以下になる。

```text
http://127.0.0.1:3000/training/
```

スクリーンショットは、リポジトリ内に保存する。例として、以下のようなパスを指定すると分かりやすい。

```text
screenshots/docusaurus-dark.png
```

## 作業の流れ

1. `package.json` を確認し、`npm start` の実体を確認する。
2. `npm start` を実行し、Docusaurus の開発サーバーを起動する。
3. 起動ログから、実際の URL を確認する。
4. Chrome で対象 URL を開く。
5. ページのテーマをダークモードに切り替える。
6. スクリーンショットを保存する。
7. 保存した画像を確認する。
8. 不要な一時ファイルや起動プロセスを片付ける。

## 詰まりどころ

### URL は `/` とは限らない

Docusaurus では `docusaurus.config.ts` の `baseUrl` によって、トップページのパスが変わる。<br/>
今回のように `baseUrl: "/training/"` の場合、`http://127.0.0.1:3000/` ではなく、`http://127.0.0.1:3000/training/` を開く。

### ダークモードは表示だけでなく属性も確認する

右上の月アイコンがダークモード切替ボタンになる。

スクリーンショットを撮るだけでなく、`html` 要素の `data-theme` が `dark` になっているか確認するとよい。<br/>
Docusaurus の場合、テーマ切り替え後に以下のような状態になっていれば、ダークモードとして扱われている。

```html
<html data-theme="dark" data-theme-choice="dark"></html>
```

### スクリーンショットはリポジトリ内に保存する

後で確認しやすいように、`screenshots/` などのディレクトリに保存する。<br/>
ただし、ドキュメント内で画像として表示したい場合は、`static/img/` 配下に置くことも検討する。

### ログファイルは残しすぎない

`npm start` をバックグラウンドで起動すると、`npm-start.out.log` や `docusaurus-start.err.log` のような一時ログを作ることがある。<br/>
検証後に不要であれば削除するか、ローカル専用にする。

## 今後の展望

- PC 幅とスマホ幅のスクリーンショットをまとめて取得する
- Light / Dark の差分を比較する
- PR 前の表示確認手順としてテンプレート化する
- `static/img/` に保存して、記事内に確認画像を掲載する

## 参考

- [Chrome for Developers](https://developer.chrome.com/)
- [Docusaurus configuration](https://docusaurus.io/docs/api/docusaurus-config)
