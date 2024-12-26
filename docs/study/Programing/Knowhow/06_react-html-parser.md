# ReactにHTMLをそのまま表示する

## なぜ書いているか

PJでHTML、CSS、JavaScript(以降JS)で作成された資産(他社作成)をReact(自社管理)に表示したいという要望があった。<br/>この要望に対する解と検討したことをまとめておくため。

## 条件と検討したこと

### 必要だった条件

* 他社作成の資産のレイアウト崩れが起こらないこと。
* きちんと画面遷移とフォーム送信(入力フォームはないが、フラグの送信は行う)が行えること。(機能観点)
* 自社作成のヘッダー・フッターのレイアウトや挙動が壊れないこと。
* セキュリティ的にも問題が少なそうであること。
* いくつかある画面に対してなるべく低コストで実装する(できれば追加実装をほとんどしない)ということ。
* 使えればReactのルーティングなどが使えること。

### 検討したこと

以上の条件から以下4つを候補として検討を行った。
1. HTMLのべた書き
2. /public配下に資産を格納
3. iframeによる埋め込み
4. サードパーティライブラリの使用

これらの4つと条件の対応関係は下の表であった。
| | 他社資産のレイアウト | 機能観点 | 自社作成部分のレイアウト | セキュリティ | コスト | Reactのルーティングの使用 |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| 1. HTMLべた書き | ×<br/>そもそも非対応 | - | - | - | - | - |
| 2./public配下に資産を格納 | 〇 | 〇 | ×<br/>ヘッダー・フッターの表示が不可 | △<br/>DevToolからソースコードが見えてしまう |　〇 |　△<br/>Reactから該当HTML、該当HTMLからReactへとそれぞれ別の方法で画面遷移を実現しないといけない |
| 3. iframeによる埋め込み | 〇 |　〇 | △<br/>ヘッダー・フッターが画面に常に表示されてしまう | 〇 |　〇 | △同上 |
| 4. サードパーティライブラリ([html-react-parse](https://www.npmjs.com/package/html-react-parser))の使用 |　〇 |　〇 | 〇 | 〇<br/>XSSの対策は保証されていないが、他社資産に入力フォームがないため、許容 | △<br/>ライブラリに合わせた追加実装が必要 | 〇 |

キャンペーン用のページでレイアウトに力を入れていることもあり、最終的にはサードパーティライブラリ([html-react-parse](https://www.npmjs.com/package/html-react-parser))を用いて実装することになった。このライブラリの特徴は次で詳細に説明する。

## html-react-parser

[html-react-parse](https://www.npmjs.com/package/html-react-parser)はその名の通り、HTMLをReactに変換してくれるライブラリである。
:::warning 似てる名前のライブラリに注意
[react-html-parser](https://www.npmjs.com/package/react-html-parser)という別のライブラリがあるが、別物かつ更新もされていなさそうなので注意。
:::

### 使い方

非常に簡単で`parse`メソッドの第一引数に文字列にしたHTMLを渡すだけ。
```ts title="example.tsx"
import parse from 'html-react-parser';
export const AAA: React.FC = () => {
    ...省略
    return <>{parse(stringHtml)}<>
};
const stringHtml = `ここには表示したいHTMLをそのままコピペする`
```
Reactで定義されたコンポーネント(`<Button>`など)を渡したい場合は、次のように第2引数に渡してあげることで利用できる

```ts title="example.tsx"
import parse, {DOMNode} from 'html-react-parser';
import {Button} from '@material-ui/core';
export const AAA: React.FC = () => {
    const options = {
        replace: (domNode:DOMNode) => {
            // 例えばaタグの特定クラスに対してButtonとして置き換えする
            // memo：domNodeの型処理は割とめんどくさい
            if ((domNode as unknown as Element).tagName === 'a') {
                const className = Array.from((domNode as unknown as Element).attributes).find(
                (attr) => attr.name === 'class')?.value;
            if (className === '_a') {
                return (
                <Button onClick={() => mutation.mutate()} className={className}>
                    置き換え後のボタン
                </Button>
                );
            }
        }
    }

    return <>{parse(stringHtml, options)}<>
};
const stringHtml = `ここには表示したいHTMLをそのままコピペする`
```

`options`は`element`を始めとする様々なものが渡せる。詳しくは公式を参照。

:::warning scriptについて
[issue](https://github.com/remarkablemark/html-react-parser/issues/98)によると`<script></script>`タグの読み込みは行われないとのことなのでReact側でuseEffectを使うなどして、自身で追加する実装をする必要がある。
:::

以下のようにしてuseEffectでscriptタグを追加する。

```ts title="example.tsx"
import parse, {DOMNode} from 'html-react-parser';
import {Button} from '@material-ui/core';
export const AAA: React.FC = () => {
    //scriptタグの生成
    useEffect(() => {
        const addScript = (src: string) => {
        return new Promise<void>((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            script.onload = () => resolve();
            script.onerror = () => reject(new Error(`Script load error for ${src}`));
            document.body.appendChild(script);
        });
        };

        const loadExternalScripts = async () => {
        try {
            await addScript('https://file1.js');
            await addScript('/js/file2.js');
            ...省略
            // Inline スクリプトの初期化
            initializeInlineFunctions();
        } catch (error) {
            console.error(error);
        }
        };

        // inlineScriptを読み込む
        // 中身はhtmlから取得し、そのままコピペする。
        const initializeInlineFunctions = () => {
        ...htmlに記載してある<script>タグないを記載
        };

        void loadExternalScripts(); // スクリプトを読み込む

        return () => {
        // スクリプトをクリーンアップ
        const scripts = document.querySelectorAll(
            'script[src="[file1.js](https://file1.js)"], script[src="/js/file2.js"]'
        );
        scripts.forEach((script) => document.body.removeChild(script));
        };
    }, []);

    const options = {
        replace: (domNode:DOMNode) => {
            // 例えばaタグの特定クラスに対してButtonとして置き換えする
            // memo：domNodeの型処理は割とめんどくさい
            if ((domNode as unknown as Element).tagName === 'a') {
                const className = Array.from((domNode as unknown as Element).attributes).find(
                (attr) => attr.name === 'class')?.value;
            if (className === '_a') {
                return (
                <Button onClick={() => mutation.mutate()} className={className}>
                    置き換え後のボタン
                </Button>
                );
            }
        }
    }

    return <>{parse(stringHtml, options)}<>
};
const stringHtml = `ここには表示したいHTMLをそのままコピペする`
```

## 参考

* https://www.npmjs.com/package/html-react-parser
