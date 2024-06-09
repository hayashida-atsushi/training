# プログラムを読む

## はじめに

基礎的な文法を一通り学習した前提で書いています。  
文法を一通り学習したからと言って、急にプログラムが書けるようになるわけではありません。  
個人的には書くという前に、プログラムを**読む**(**読めるようになる**)ことが必要だと思います。  

## 読む練習

既存のソースコード1行1行にコメントを書くことが、読む練習になると思います。  
例として[React Quick Start](https://ja.react.dev/learn)を用います。

```jsx
// productsの配列を定義。中にはプロパティが3つあるオブジェクトが含まれる。
const products = [
  { title: 'Cabbage', isFruit: false, id: 1 },
  { title: 'Garlic', isFruit: false, id: 2 },
  { title: 'Apple', isFruit: true, id: 3 },
];

// 配列の要素に対しスタイルを適応し、リスト表示するコンポーネント
export default function ShoppingList() {
    // 配列の各オブジェクトをmap関数を用いて、<li>要素へと変換。
  const listItems = products.map(product =>
    <li
      key={product.id}
      // styleの指定は色のみ。三項演算子を用いてFruitである(=isFruitがtrue)の時は
      // 'magenta'、そうでない時は'darkgreen'を指定する。
      style={{
        color: product.isFruit ? 'magenta' : 'darkgreen'
      }}
    >
    {/* タイトルを表示 */}
      {product.title}
    </li>
  );

  return (
    <ul>{listItems}</ul>
  );
}

```

<!-- TODO: styleの変更 -->
<details>
<summary>上記コードの出力結果はこちら</summary>

<ul>
<font color="darkgreen">
<li>Cabbage</li>
<li>Garlic</li>
</font>
<font color="magenta">
<li>Apple</li>
</font>
</ul>
</details>

上記のような感じで様々なコードにコメント書いていくと、理解をする上での助けとなると思います。  
※成果物として提出するときは、このような自分向けのコメントは削除しましょう。あくまで学習時向けです。

## 参考

* [React Quick Start](https://ja.react.dev/learn)
